# Balencia Screen Review Agent Rules

Use this folder for UX audit work only. The audit should improve decision quality, not rush into redesign.

## Required Context

Before reviewing a screen, read:

- the screen's spec in `../app_design 3/`
- `../app_design 3/_shared-patterns.md` sections relevant to that screen
- `../app_design 3/Balencia-Design-Direction.md` when brand, navigation, or product intent is unclear
- the live route from `../balencia-screens/src/data/screens.ts`

## Review Discipline

- Review one screen at a time.
- Keep audit sessions to up to 12 screens unless the user explicitly changes the process.
- Treat `batches/batch-01.md` as the canonical quality bar for compiled batch audits.
- The active batch file is the primary deliverable. Do not leave a batch as a thin status table plus external notes.
- For every reviewed screen, add complete screen notes directly inside the active batch file before moving to the next screen.
- Save findings before suggesting implementation work.
- Separate evidence from opinion.
- Treat user-provided observations as hypotheses to validate, not automatic decisions.
- Preserve Balencia's brand identity unless a change is clearly better for users.
- Prefer lower-friction flows when the product does not need information immediately.

## Compiled Batch Deliverable

Every completed batch file must include:

- reviewed date, prototype URL, and screenshot/evidence path
- batch summary with ship-ready screens, must-fix screens, redesign candidates, and user questions
- `## Screen Notes`
- one section per reviewed screen, in product-flow order
- five-second read, primary action clarity, emotional tone, and screenshot path for each screen
- visible control inventory and purpose notes for A++ re-review batches
- full 8-dimension rubric table for each screen
- grade and grade-cap reason for A++ re-review batches
- evidence-backed findings table for each screen, or a deliberate `No major findings` row
- a clear decision line for each screen

Do not mark a batch `reviewed` until the active batch file is as concrete as Batch 01.

## Finding Format

Every finding needs:

- screen id and name
- route
- severity: `critical`, `major`, `minor`, or `nit`
- category
- evidence
- user impact
- recommendation
- decision status: `proposed`, `accepted`, `deferred`, or `rejected`

## Scoring Rubric

Score each screen from 1 to 5 on:

- product sense
- user friction
- visual appeal
- brand fit
- mobile ergonomics
- accessibility
- trust/privacy
- industry best practice

Use the score to guide discussion. Do not let the score replace written reasoning.

## Commands

Use the command docs in `commands/`. The core commands are:

```bash
cd balencia-screens
npm run dev
npm run verify:routes
npm run check
VISUAL_AUDIT_BASE_URL=http://localhost:3000 npm run verify:visual -- --screenshots
```

## Boundaries

- Do not edit `balencia-screens` during audit-only sessions.
- Do not edit `app_design 3` unless the user asks to update source specs.
- Do not mark a screen ship-ready if it has unresolved critical or major findings.
- Do not close a batch if any reviewed screen lacks a compiled notes section in the batch file.
- Do not batch-review all 90 screens in one pass.

## A++ Re-Review Rules

- Use `a-plus-plus-review/` for the Figma-ready re-review pass.
- Use fresh finding IDs like `R01-F01`; do not overwrite historical `Bxx` or `Pxx` evidence.
- Do not award `A++` unless all eight rubric dimensions score `5`, fresh evidence exists, every visible control has a clear purpose, and no unresolved finding above `nit` remains.
- A visible control passes only if it works in the prototype, is honestly disabled, is clearly decorative/static, or has documented Figma behavior.
- Keep the pass audit-only unless the user explicitly switches to implementation work.
