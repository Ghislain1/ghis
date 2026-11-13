# 003 — Respect prefers-reduced-motion

- **Status**: TODO
- **Commit**: d08f2b5
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 4 files, small

## Problem

Only `src/components/Crossfade.tsx` handles reduced motion. Every other moving
surface ignores it:

1. `src/components/LessonPage.tsx:47-49` smooth-scrolls the page on every screen
   change, including hexagon jumps:

```tsx
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])
```

2. `src/components/ProgressHexagons.tsx:89-97` grows each hexagon to 1.1 on
   hover with no pointer gating and no reduced-motion fallback:

```tsx
                      clipPath: HEX_CLIP,
                      transition: 'transform .16s ease, background-color .2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        bgcolor: complete
                          ? 'secondary.dark'
                          : active
                            ? 'primary.dark'
                            : 'rgba(53, 9, 44, 0.16)',
                      },
                      '&:focus-visible': { outline: 'none' },
```

3. `src/components/CompletionFrame.tsx:38,53` animates position (`frameIn`
   translateY 12px) and scale (`popIn`) with no fallback. After plan 001 these
   lines read:

```tsx
        animation: 'frameIn var(--duration-enter) var(--ease-out) both',
```

```tsx
          animation: 'popIn var(--duration-celebration) var(--ease-celebrate) both',
```

4. `src/components/AnswerCard.tsx` gains a press `scale(0.99)` from plan 002
   with no reduced-motion fallback.

## Target

Reduced motion keeps opacity feedback and drops movement — it is not "no
animation".

```tsx
// src/components/LessonPage.tsx — target
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [index])
```

```tsx
// src/components/ProgressHexagons.tsx — target for lines 89-98
                      clipPath: HEX_CLIP,
                      transition:
                        'background-color var(--duration-enter) ease, transform var(--duration-fast) var(--ease-out)',
                      '@media (hover: hover) and (pointer: fine)': {
                        '&:hover': {
                          transform: 'scale(1.04)',
                          bgcolor: complete
                            ? 'secondary.dark'
                            : active
                              ? 'primary.dark'
                              : 'rgba(53, 9, 44, 0.16)',
                        },
                      },
                      '@media (prefers-reduced-motion: reduce)': {
                        '&:hover': { transform: 'none' },
                      },
                      '&:focus-visible': { outline: 'none' },
```

```tsx
// src/components/CompletionFrame.tsx — target for the outer box (line 38 area)
        animation: 'frameIn var(--duration-enter) var(--ease-out) both',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'frameFadeIn var(--duration-enter) var(--ease-out) both',
        },
```

```tsx
// src/components/CompletionFrame.tsx — target for the icon box (line 53 area)
          animation: 'popIn var(--duration-celebration) var(--ease-celebrate) both',
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'frameFadeIn var(--duration-enter) var(--ease-out) both',
          },
```

```tsx
// src/components/AnswerCard.tsx — target, placed AFTER the '&:active' block
        '@media (prefers-reduced-motion: reduce)': {
          '&:active': { transform: 'none' },
        },
```

## Repo conventions to follow

- `Crossfade.tsx:51,64` already uses the exact nested `@media` pattern inside
  `sx`; imitate it.
- Motion tokens live in `src/index.css` (`--duration-fast: 160ms`,
  `--duration-enter: 200ms`, `--ease-out`, `--ease-celebrate`) — see plan 001.
- Reuse the existing `frameFadeIn` keyframe (`src/index.css:33`) for the
  opacity-only fallback; do not add a new keyframe.

## Steps

1. In `src/components/LessonPage.tsx`, replace the effect at lines 47-49 with the
   target effect.
2. In `src/components/ProgressHexagons.tsx`, replace the `clipPath` /
   `transition` / `'&:hover'` / `'&:focus-visible'` block (lines 88-98) with the
   target block. Keep the rest of the button styles unchanged.
3. In `src/components/CompletionFrame.tsx`, add the reduced-motion media query
   after each of the two `animation` declarations, exactly as shown.
4. In `src/components/AnswerCard.tsx`, add the reduced-motion block after the
   `'&:active'` block added by plan 002.

## Boundaries

- Prerequisites, in order: `001-motion-tokens.md`, then `002-answer-card-hover-press.md`.
  If the tokens are missing or `AnswerCard.tsx` has no `'&:active'` block, STOP
  and report.
- Do NOT change `Crossfade.tsx` — it already handles reduced motion.
- Do NOT remove hover feedback entirely; only the transform is dropped under
  reduced motion, colors remain.
- Do NOT add dependencies.
- If the cited code does not match (drift since commit `d08f2b5`), STOP and
  report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm test` passes (11 tests).
- **Feel check** with DevTools Rendering panel → `prefers-reduced-motion: reduce`:
  - Changing screens scrolls instantly to the top (no smooth glide).
  - Hovering a hexagon changes its background color but does not scale it.
  - The completion screen fades in without upward travel; the icon fades in
    instead of popping.
  - Pressing an answer card does not scale it.
- **Feel check** with reduced motion off: all the movement above returns, and
  hexagons scale only to 1.04.
- **Feel check** in device mode with touch emulation: hovering via tap does not
  scale hexagons.
- **Done when**: none of the four files animates position or scale under
  reduced motion, and no ungated `&:hover` transform remains.
