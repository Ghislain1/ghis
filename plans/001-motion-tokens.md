# 001 — Add shared motion tokens and normalize completion motion

- **Status**: TODO
- **Commit**: d08f2b5
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files, small

## Problem

Easings and durations are typed ad hoc in every component, and the values are
inconsistent and weak:

- `src/components/AnswerCard.tsx:105-106` — `.18s ease` for five properties
- `src/components/AnswerCard.tsx:134` — `.18s ease`
- `src/components/ProgressHexagons.tsx:89` — `.16s ease, .2s ease`
- `src/components/FeedbackPanel.tsx:27` — `.3s ease`
- `src/components/FeedbackPanel.tsx:41` — `.35s ease`
- `src/components/CompletionFrame.tsx:38` — `.4s ease`
- `src/components/CompletionFrame.tsx:53` — `.5s cubic-bezier(.2, .8, .3, 1)`
- `src/components/Crossfade.tsx:50,63` — `200ms ease-out`

Built-in `ease` is too weak for deliberate UI motion and every component invents
its own numbers. The completion screen is the first consumer normalized here:

```tsx
// src/components/CompletionFrame.tsx:32-40 — current
    <Box
      sx={{
        maxWidth: 620,
        mx: 'auto',
        textAlign: 'center',
        py: { xs: 2, sm: 4 },
        animation: 'frameIn .4s ease both',
      }}
    >
```

```tsx
// src/components/CompletionFrame.tsx:41-54 — current
      <Box
        sx={{
          width: 96,
          height: 108,
          mx: 'auto',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          bgcolor: 'secondary.main',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'popIn .5s cubic-bezier(.2, .8, .3, 1) both',
        }}
      >
```

## Target

Add a token block at the top of `src/index.css`, before the `html, body, #root`
rule:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-celebrate: cubic-bezier(0.2, 0.8, 0.3, 1);
  --duration-fast: 160ms;
  --duration-hover: 180ms;
  --duration-enter: 200ms;
  --duration-celebration: 500ms;
}
```

Normalize the completion screen to those tokens:

```tsx
// src/components/CompletionFrame.tsx — target
        animation: 'frameIn var(--duration-enter) var(--ease-out) both',
```

```tsx
// src/components/CompletionFrame.tsx — target
          animation: 'popIn var(--duration-celebration) var(--ease-celebrate) both',
```

`--ease-celebrate` keeps the curve the codebase already uses
(`cubic-bezier(.2, .8, .3, 1)`); it is renamed, not changed.

## Repo conventions to follow

- Keyframes live in `src/index.css` and are referenced from MUI `sx` as plain CSS
  strings — see `src/components/Crossfade.tsx:50`:
  ``animation: `frameFadeOut ${FADE_MS}ms ease-out both` ``
- MUI `sx` accepts raw CSS values, including `var(--…)`, so no theme changes are
  needed. Do not move these values into `src/theme.ts`.

## Steps

1. In `src/index.css`, insert the `:root` token block shown in **Target** as the
   first rule in the file, before `html,`.
2. In `src/components/CompletionFrame.tsx`, replace the outer box animation
   (currently line 38) with
   `animation: 'frameIn var(--duration-enter) var(--ease-out) both',`.
3. In the same file, replace the icon box animation (currently line 53) with
   `animation: 'popIn var(--duration-celebration) var(--ease-celebrate) both',`.

## Boundaries

- Do NOT touch any other component; later plans consume these tokens.
- Do NOT remove or rename the existing keyframes `frameIn`, `frameFadeIn`,
  `frameFadeOut`, `popIn`.
- Do NOT edit `src/theme.ts` or MUI component overrides.
- Do NOT add dependencies.
- If the cited code does not match what you find (drift since commit `d08f2b5`),
  STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm test` passes (11 tests).
- **Feel check**: finish the last lesson screen and confirm the completion fade
  and icon pop still play, now over 200ms / 500ms respectively, with no visible
  change in the curve shape.
- In DevTools, inspect `:root` and confirm the six custom properties resolve.
- **Done when**: no component in the targeted files contains a raw `ease` or a
  hardcoded duration where a token exists, and the completion screen is
  unchanged to the eye apart from timing.
