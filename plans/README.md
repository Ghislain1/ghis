# Animation Plans

Audit of the lesson app at commit `d08f2b5`, generated with the
`improve-animations` skill. Each plan is self-contained: exact file paths,
current-code excerpts, target values, boundaries, and a feel check. Execute
them in order; later plans consume tokens and edits from earlier ones.

## Plans

| # | Title | Severity | Status | Depends on |
| --- | --- | --- | --- | --- |
| 001 | Add shared motion tokens and normalize completion motion | LOW | TODO | — |
| 002 | Answer card hover and press feedback | HIGH | TODO | 001 |
| 003 | Respect prefers-reduced-motion | MEDIUM | TODO | 001, 002 |
| 004 | Feedback panel entrance and icon | MEDIUM | TODO | 001 |
| 005 | Crossfade rapid-navigation flash | MEDIUM | TODO | 001 |

## Recommended execution order

1. **001** — creates the tokens every other plan references.
2. **002** — removes the highest-frequency motion problem (answer cards).
3. **004** — normalizes the feedback response (independent of 002).
4. **003** — reduced-motion pass over the components changed by 001–002.
5. **005** — crossfade interruptibility, last because it is a newer surface and
   carries the most regression risk.

003 and 004 touch disjoint files and may run in either order after 001 and 002.
Do not run 002 and 003 in parallel: both edit `AnswerCard.tsx`, and 003 assumes
002's `&:active` block exists.

## Not planned (from the audit)

- The completion screen runs three overlapping entrances (parent crossfade,
  inner `frameIn`, icon `popIn`). Redundant but rare and within the celebration
  budget; 001 tokenizes its timing only.
- The sticky footer unmounts instantly on completion while content crossfades.
  Additive polish, not scheduled.
- Staggering answer options is deliberately not proposed: the quiz flow is too
  frequent for decorative entrance delay.

## Working with these plans

- Hand a single plan file to any agent; no context from the audit is needed.
- Every plan ends with `npm run build` and `npm test`, plus a manual feel check.
- If a plan's excerpt no longer matches the code, the executor must stop and
  report rather than improvise.
