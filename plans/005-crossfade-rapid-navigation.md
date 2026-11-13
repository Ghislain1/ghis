# 005 — Crossfade rapid-navigation flash

- **Status**: TODO
- **Commit**: d08f2b5
- **Severity**: MEDIUM
- **Category**: Interruptibility
- **Estimated scope**: 1 file, small

## Problem

`Crossfade` renders the incoming frame with a `key`, so every `activeKey` change
remounts it and restarts `frameFadeIn` from opacity 0. When the user navigates
again before the 200ms fade ends (rapid hexagon clicks, or back/continue in quick
succession), the previous incoming frame was mid-fade — but it is captured as a
React node and remounted as the outgoing layer, which starts `frameFadeOut` at
opacity 1. The result is a visible flash: content jumps to full opacity, fades
out, while the new frame starts again from 0. Rapidly flipping through screens
never reaches full opacity and looks like strobing.

```tsx
// src/components/Crossfade.tsx:19-41 — current
export function Crossfade({ activeKey, children }: CrossfadeProps) {
  const lastKey = useRef(activeKey)
  const lastNode = useRef(children)
  const [outgoing, setOutgoing] = useState<Layer | null>(null)

  if (lastKey.current === activeKey) {
    lastNode.current = children
  }

  useLayoutEffect(() => {
    if (lastKey.current === activeKey) {
      lastNode.current = children
      return
    }

    const previous = { key: lastKey.current, node: lastNode.current }
    lastKey.current = activeKey
    lastNode.current = children

    setOutgoing(previous)
    const timer = window.setTimeout(() => setOutgoing(null), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [activeKey])
```

## Target

Navigation that interrupts an in-flight crossfade should swap instantly instead
of starting a second fade. A normal, isolated change keeps the existing 200ms
crossfade.

```tsx
// src/components/Crossfade.tsx:19-47 — target
export function Crossfade({ activeKey, children }: CrossfadeProps) {
  const lastKey = useRef(activeKey)
  const lastNode = useRef(children)
  const inFlight = useRef(false)
  const [outgoing, setOutgoing] = useState<Layer | null>(null)
  const [skipIn, setSkipIn] = useState(false)

  if (lastKey.current === activeKey) {
    lastNode.current = children
  }

  useLayoutEffect(() => {
    if (lastKey.current === activeKey) {
      lastNode.current = children
      return
    }

    const previous = { key: lastKey.current, node: lastNode.current }
    lastKey.current = activeKey
    lastNode.current = children

    if (inFlight.current) {
      inFlight.current = false
      setOutgoing(null)
      setSkipIn(true)
      return
    }

    inFlight.current = true
    setSkipIn(false)
    setOutgoing(previous)

    const timer = window.setTimeout(() => {
      inFlight.current = false
      setOutgoing(null)
    }, FADE_MS)

    return () => window.clearTimeout(timer)
  }, [activeKey])
```

Change the incoming layer's animation to honor `skipIn` (currently lines 60-66):

```tsx
// src/components/Crossfade.tsx — current
      <Box
        key={`in:${activeKey}`}
        sx={{
          gridArea: '1 / 1',
          animation: `frameFadeIn ${FADE_MS}ms ease-out both`,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
```

```tsx
// src/components/Crossfade.tsx — target
      <Box
        key={`in:${activeKey}`}
        sx={{
          gridArea: '1 / 1',
          animation: skipIn ? 'none' : `frameFadeIn ${FADE_MS}ms var(--ease-out) both`,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
```

Why this works: on an interrupting change, React runs the previous effect
cleanup (clearing the old timer) before the new effect. `inFlight.current` is
still `true`, so the effect drops the outgoing layer and sets `skipIn`, which is
committed by `useLayoutEffect` before paint. The next isolated navigation sets
`skipIn` back to `false` and crossfades normally again.

## Repo conventions to follow

- The component already keeps snapshots of the previous node in refs
  (`lastKey`, `lastNode`); continue that pattern rather than introducing state
  for the node itself.
- Reduced-motion handling stays exactly as it is in `Crossfade.tsx:51-53,64-66`.
- Use the shared `--ease-out` token from `src/index.css` (plan 001) instead of
  the bare `ease-out` keyword.

## Steps

1. In `src/components/Crossfade.tsx`, add the `inFlight` ref and `skipIn` state
   as shown.
2. Replace the body of the `useLayoutEffect` with the target version, including
   the interrupting-change branch and the timer that resets `inFlight`.
3. Update the incoming layer's `animation` value to the `skipIn` conditional.
4. Do not change `FADE_MS`, the outgoing layer, the grid stacking, the
   `aria-hidden`, or the reduced-motion blocks.

## Boundaries

- Prerequisite: plan `001-motion-tokens.md` must be applied first. If
  `--ease-out` is missing from `src/index.css`, STOP and report.
- Do NOT try to fix the 200ms height settle when the outgoing frame is taller
  than the incoming one — that requires layout animation and is explicitly out
  of scope for this plan.
- Do NOT change `LessonPage.tsx` or reduce the crossfade frequency.
- Do NOT add dependencies.
- If the code does not match the excerpt (drift since commit `d08f2b5`), STOP
  and report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm test` passes (11 tests).
- **Feel check**:
  - Click hexagons as fast as possible across five or more screens: the content
    never flashes back to full opacity between frames, and there is no strobing.
  - Navigate once, wait for the fade to finish, then navigate again: a normal
    200ms crossfade still plays.
  - Use Back and Continue alternated quickly; no frame jumps from partial
    opacity to full and back.
  - In DevTools Animations panel at 10% playback, confirm a single swipe leaves
    the fade at 200ms and an interrupting click produces an instant swap.
  - Toggle `prefers-reduced-motion: reduce`: swaps remain instant as before.
- **Done when**: no second `frameFadeIn` starts while an outgoing layer is still
  mounted, and isolated navigations still crossfade.
