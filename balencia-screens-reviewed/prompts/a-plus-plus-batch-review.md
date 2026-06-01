# A++ Batch Review Prompt

Use this prompt for every Balencia A++ re-review batch. Replace `RXX` with the active batch, for example `R02`.

````md
We are starting Balencia A++ re-review batch: `RXX`.

Use the audit workspace at `balencia-screens-reviewed/` and follow:
- `balencia-screens-reviewed/AGENTS.md`
- `balencia-screens-reviewed/a-plus-plus-review/index.md`
- `balencia-screens-reviewed/a-plus-plus-review/RXX-*.md`
- `balencia-screens-reviewed/a-plus-plus-review/final-rollup.md`
- `balencia-screens-reviewed/skills/balencia-screen-audit/SKILL.md`
- `balencia-screens-reviewed/skills/balencia-screen-audit/references/rubric.md`
- `balencia-screens-reviewed/skills/balencia-screen-audit/references/brand-ux-gates.md`
- `balencia-screens-reviewed/commands/start-a-plus-plus-review-batch.md`

Important: this is audit-only.
- Do not edit `balencia-screens`.
- Do not edit `app_design 3`.
- Do not implement fixes.
- Record findings, evidence, grades, and recommendations only.

## Goal

Review every screen in `RXX` against the strict Figma-ready A++ bar:
- Every screen must have a clear purpose.
- Every visible control must have an intended user value.
- Every button/link/chip/field/toggle/card CTA must either work, be honestly disabled, be clearly decorative/static, or have documented Figma behavior.
- A++ requires all eight rubric dimensions to score `5`, fresh evidence, and no unresolved `critical`, `major`, or `minor` findings.

## Required Context

Before grading a screen, read:
- the active R batch file
- the matching original audit batch in `balencia-screens-reviewed/batches/`
- the matching update batch in `balencia-screens-reviewed/update-batches/`
- the matching P batch in `balencia-screens-reviewed/screen-iteration-batches/`
- the screen spec in `app_design 3/`
- relevant shared patterns in `app_design 3/_shared-patterns.md`
- `app_design 3/Balencia-Design-Direction.md` when product, brand, or tone is unclear
- current route evidence in `balencia-screens/output/a-plus-plus-review/RXX/`
- current route implementation only as evidence, not for editing

## Evidence

Start or use the local prototype and record the actual base URL.

Use existing baseline evidence when available:
- `balencia-screens/output/a-plus-plus-review/route-evidence-summary.md`
- `balencia-screens/output/a-plus-plus-review/route-evidence-results.json`
- `balencia-screens/output/a-plus-plus-review/RXX/`

If interaction-state evidence is missing for the active batch, capture it before grading. Save new evidence under:

```text
balencia-screens/output/a-plus-plus-review/RXX/
```

Evidence must cover:
- initial route state
- primary CTA behavior
- important secondary actions
- forms/validation/disabled states
- bottom sheets, dialogs, overlays, or active modes
- privacy/permission/provider/billing/SIA states where relevant
- console/runtime output
- touch-target, nesting, and overlap candidates

## Per-Screen Review Loop

Review one screen at a time. Do not move to the next screen until the active screen has a complete section in the R batch file.

For each screen, write:
- five-second read
- screen purpose and journey fit
- primary action clarity
- emotional tone
- screenshot/evidence paths
- visible control inventory with purpose and state
- full 8-dimension rubric table:
  - product sense
  - user friction
  - visual appeal
  - brand fit
  - mobile ergonomics
  - accessibility
  - trust/privacy
  - industry best practice
- A++ grade
- grade-cap reason if not A++
- findings table, or an explicit `No major findings` row
- decision line: `A++`, `needs polish`, `redesign candidate`, or `needs user decision`

## Grade Rules

- `A++`: all eight dimensions are `5`; fresh evidence exists; every visible control has a clear purpose; no unresolved findings above `nit`.
- `A+`: no unresolved `critical` or `major` findings, but one or more `minor` polish or handoff gaps remain.
- `A`: coherent and safe, but meaningful UX/UI/interaction/Figma work remains.
- Below A: critical task, trust, accessibility, mobile, brand, or product-sense risk remains.

Grade caps:
- Any unresolved `critical` finding caps the screen below `A`.
- Any unresolved `major` finding prevents `A+` or `A++`.
- Any unresolved `minor` finding prevents `A++`.
- Missing fresh evidence prevents `A++`.
- A visible control with no clear purpose is at least a `major` finding.

## Findings

Use fresh R-batch finding IDs only:
- Example: `R02-F01`, `R02-F02`
- Do not overwrite historical `Bxx` or `Pxx` findings.

Every finding must include:
- finding ID
- screen and route
- severity: `critical`, `major`, `minor`, or `nit`
- category
- evidence
- user impact
- recommendation
- status: usually `proposed`
- grade cap

Update:
- the active R batch file
- `balencia-screens-reviewed/a-plus-plus-review/index.md`
- `balencia-screens-reviewed/a-plus-plus-review/final-rollup.md`

Only add product/legal/scope questions to `findings/deferred-decisions.md` if they are genuinely unresolved and cannot be answered from existing decisions.

## Verification Before Close

Run from `balencia-screens`:

```bash
npm run check
```

Also run production build for R03, R06, R09, R12, R15, and R18:

```bash
npm run build
```

Before marking the batch reviewed, confirm:
- every screen has a complete compiled section
- every screen has a grade and grade-cap reason if applicable
- every finding is in the R batch and final rollup
- `a-plus-plus-review/index.md` has updated screen grades and batch status
- evidence paths are current
- command results are recorded

When finished, summarize:
- grade count for this batch
- screens that are A++
- screens capped below A++ and why
- new findings
- verification results
- next recommended batch
````

