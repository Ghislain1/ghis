# 004 — Feedback panel entrance and icon

- **Status**: TODO
- **Commit**: d08f2b5
- **Severity**: MEDIUM
- **Category**: Easing & duration / Purpose & frequency
- **Estimated scope**: 2 files, small

## Problem

The answer feedback appears on every check — tens of times per session — but
uses a weak symmetric `ease` curve and a 350ms overshooting bounce on the icon.
The entrance travels 12px (`frameIn`) and the bounce peaks at `scale(1.06)`,
which makes a repeated, functional state change feel toy-like and delays the
explanation the user just asked for by checking their answer.

```tsx
// src/components/FeedbackPanel.tsx:14-28 — current
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        bgcolor: correct ? 'success.light' : 'error.light',
        border: '1px solid',
        borderColor: correct ? 'rgba(13, 181, 55, 0.35)' : 'rgba(231, 56, 77, 0.3)',
        animation: 'frameIn .3s ease both',
      }}
    >
```

```tsx
// src/components/FeedbackPanel.tsx:30-42 — current
      <Box
        sx={{
          width: 32,
          height: 32,
          flex: '0 0 auto',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          bgcolor: correct ? 'success.main' : 'error.main',
          animation: 'popIn .35s ease both',
        }}
      >
```

## Target

Add one keyframe to `src/index.css`, directly after the existing `popIn`
keyframe block:

```css
@keyframes feedbackPop {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

```tsx
// src/components/FeedbackPanel.tsx — target for line 27
        animation: 'frameIn var(--duration-enter) var(--ease-out) both',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'frameFadeIn var(--duration-enter) var(--ease-out) both',
        },
```

```tsx
// src/components/FeedbackPanel.tsx — target for line 41
          animation: 'feedbackPop var(--duration-fast) var(--ease-out) both',
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'frameFadeIn var(--duration-fast) var(--ease-out) both',
          },
```

The entrance keeps the existing 12px travel (`frameIn`) but runs 200ms on the
strong `ease-out` curve. The icon starts at `scale(0.9)`, never below the
0.9–0.97 entrance range, and settles without overshoot in 160ms.

## Repo conventions to follow

- Keyframes live in `src/index.css` and are consumed from `sx` as CSS strings —
  see `src/components/Crossfade.tsx:50,63`.
- Reduced-motion fallbacks use the existing `frameFadeIn` keyframe
  (`src/index.css:33`), as in `Crossfade.tsx:64-66`.
- Motion tokens come from plan 001: `--duration-enter`, `--duration-fast`,
  `--ease-out`.

## Steps

1. In `src/index.css`, add the `feedbackPop` keyframe after the closing brace of
   `@keyframes popIn`.
2. In `src/components/FeedbackPanel.tsx`, replace the panel `animation` line
   (line 27) with the two target declarations.
3. In the same file, replace the icon `animation` line (line 41) with the two
   target declarations.
4. Leave `role`, `aria-live`, colors, spacing, and copy untouched.

## Boundaries

- Prerequisite: plan `001-motion-tokens.md` must be applied first. If the tokens
  are missing from `src/index.css`, STOP and report.
- Do NOT change `QuestionFrame.tsx` or `LessonPage.tsx`; the panel renders as
  soon as `result` is set and needs no JS changes.
- Do NOT modify the existing `popIn` keyframe — `CompletionFrame.tsx` still uses
  it for the rare completion celebration.
- Do NOT add dependencies.
- If the code does not match the excerpt (drift since commit `d08f2b5`), STOP
  and report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm test` passes (11 tests).
- **Feel check**:
  - Check a wrong answer: the panel fades in with a short upward settle, fully
    readable in ~200ms; the icon appears from 90% with no bounce past its final
    size.
  - Check several answers in a row: the entrance feels snappy, not celebratory.
  - In DevTools Animations panel at 10% playback, confirm the panel is 200ms and
    the icon is 160ms on a fast-out curve.
  - Toggle `prefers-reduced-motion: reduce`: both fade only, no travel, no
    scaling.
- **Done when**: `FeedbackPanel.tsx` contains no `.3s`, `.35s`, bare `ease`, or
  `popIn` reference, and the completion celebration still uses `popIn`.
