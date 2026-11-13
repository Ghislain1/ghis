# 002 — Answer card hover and press feedback

- **Status**: TODO
- **Commit**: d08f2b5
- **Severity**: HIGH
- **Category**: Purpose & frequency / Accessibility / Performance
- **Estimated scope**: 1 file, small

## Problem

Answer option cards are used 100+ times per course. Each card currently lifts
1px and tweens a large shadow on hover, and the hover is not gated to
hover-capable pointers. On touch devices a tap produces a sticky hover state
(the card stays lifted), and the shadow tween repaints on every pointer pass.
There is also no press feedback, so the card does not respond physically when
selected.

```tsx
// src/components/AnswerCard.tsx:103-118 — current
        cursor: locked ? 'default' : 'pointer',
        opacity: checked && !isCorrectOption && !isWrongSelected ? 0.62 : 1,
        transition:
          'border-color .18s ease, background-color .18s ease, transform .18s ease, box-shadow .18s ease, opacity .18s ease',
        '&:hover': locked
          ? undefined
          : {
              borderColor: palette.hoverBorder,
              bgcolor: palette.hoverBg,
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 22px rgba(53, 9, 44, 0.08)',
            },
        '&:focus-visible': {
          outline: '3px solid rgba(77, 122, 255, 0.35)',
          outlineOffset: 2,
        },
```

The badge has the same hardcoded timing:

```tsx
// src/components/AnswerCard.tsx:134 — current
          transition: 'background-color .18s ease, color .18s ease',
```

## Target

```tsx
// src/components/AnswerCard.tsx — target for lines 103-118
        cursor: locked ? 'default' : 'pointer',
        opacity: checked && !isCorrectOption && !isWrongSelected ? 0.62 : 1,
        transition:
          'border-color var(--duration-hover) ease, background-color var(--duration-hover) ease, opacity var(--duration-hover) ease, transform var(--duration-fast) var(--ease-out)',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': locked
            ? undefined
            : {
                borderColor: palette.hoverBorder,
                bgcolor: palette.hoverBg,
              },
        },
        '&:active': locked
          ? undefined
          : {
              transform: 'scale(0.99)',
            },
        '&:focus-visible': {
          outline: '3px solid rgba(77, 122, 255, 0.35)',
          outlineOffset: 2,
        },
```

```tsx
// src/components/AnswerCard.tsx — target for line 134
          transition:
            'background-color var(--duration-hover) ease, color var(--duration-hover) ease',
```

Rationale for the exact values: hover/color feedback uses the built-in `ease`
(the audit's rule for color changes); the only transform left is press feedback,
which uses `var(--duration-fast)` (160ms) with the strong `--ease-out` curve.
The shadow tween and 1px lift are removed entirely — hover is communicated by
border and background color alone.

## Repo conventions to follow

- `sx` media queries are written as sibling keys in the object (Emotion nested
  selectors), see `src/components/Crossfade.tsx:51`:
  `'@media (prefers-reduced-motion: reduce)': { … }`.
- Color transitions already use the palette object (`palette.hoverBorder`,
  `palette.hoverBg`); keep that pattern.
- Motion tokens come from `src/index.css` (see plan 001).

## Steps

1. Replace the card `sx` block excerpted above (lines 103-118) with the target
   block. Keep the surrounding `position`, `display`, `alignItems`, `gap`,
   `p`, `pr`, border and background properties unchanged.
2. Replace the badge `transition` (line 134) with the target two-line string.
3. Do not change `handleSelect`, the keyboard handler, ARIA attributes, the
   badge markup, or the icons.

## Boundaries

- Prerequisite: plan `001-motion-tokens.md` must be applied first. If
  `--ease-out`, `--duration-fast` or `--duration-hover` are missing from
  `src/index.css`, STOP and report.
- Do NOT touch any file other than `src/components/AnswerCard.tsx`.
- Do NOT change markup, structure, colors, or the `TONES` map.
- Do NOT add dependencies.
- If the code does not match the excerpt (drift since commit `d08f2b5`), STOP
  and report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm test` passes (11 tests).
- **Feel check** (desktop, real pointer):
  - Hovering an option changes border and background color only — no lift, no
    shadow, no movement.
  - Pressing and holding an option shrinks it to 99% within ~160ms, and it
    springs back on release.
  - Selecting an option still updates the badge and check icon instantly.
  - In DevTools Animations panel at 10% playback, confirm the color transition
    is 180ms and the press scale is 160ms.
- **Feel check** (phone or DevTools device mode with touch emulation):
  - Tapping an option does not leave it visually lifted or shadowed after the
    tap ends.
- **Done when**: no `translateY(-1px)`, no `box-shadow` transition, and no
  `.18s` literals remain in `AnswerCard.tsx`.
