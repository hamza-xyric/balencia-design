# Balencia Screen Review Workspace

This folder is the durable workspace for the Balencia 90-screen UX audit.

The goal is to review every implemented screen in `balencia-screens` against the written design source in `app_design 3`, the live prototype, and Balencia's brand/product vision. We will work in small batches so each screen gets serious attention before any redesign work begins.

## Goal

Produce a grade A mobile user experience while staying true to Balencia's identity:

- premium, cinematic, dark-first visual system
- SIA as a trusted AI coach, not a noisy feature
- RPG progress and life-domain intelligence used with restraint
- low-friction onboarding and daily return flows
- clear trust, privacy, accessibility, and mobile ergonomics

## Audit Method

Each session covers up to 12 screens. Smaller batches are still valid when the screens need deeper review.

1. Start the prototype server from `balencia-screens`.
2. Open each screen route in product-flow order.
3. Compare the live screen against its source spec and shared design patterns.
4. Question whether the screen makes product sense before judging visual polish.
5. Score the screen with the shared rubric.
6. Capture findings in `findings/findings-ledger.md`.
7. Compile the full screen notes directly inside the active `batches/batch-XX.md` file.
8. End the batch with decisions, open questions, and improvement candidates.

## Compiled Audit Standard

The active batch file is the durable audit artifact. `batches/batch-01.md` is the canonical example. A completed batch is not acceptable if it only has a status table and a short summary.

Every reviewed screen in a batch must include:

- five-second read
- primary action clarity
- emotional tone
- screenshot or visual evidence path
- full rubric table across all eight dimensions
- findings table with severity, category, evidence, user impact, recommendation, and status
- decision line: ship-ready, must-fix, redesign candidate, or needs user decision

Separate files under `findings/` may exist for convenience, but they do not replace compiled notes in the batch file.

## Quality Bar

A screen is not considered audit-ready unless it answers these questions:

- Does this screen need to exist at this point in the user journey?
- Is the primary action obvious and worth doing?
- Is the user being asked for only the information needed now?
- Does the screen feel premium, warm, and emotionally safe?
- Does the design preserve Balencia's brand hierarchy?
- Are touch targets, spacing, scrolling, and safe areas mobile-native?
- Are trust, privacy, and consent handled at the right moment?
- Would a user understand the screen in under five seconds?

## Source Of Truth

- Screen specs: `../app_design 3/`
- Live visual prototype: `../balencia-screens/`
- Canonical screen registry: `../balencia-screens/src/data/screens.ts`
- Shared patterns: `../app_design 3/_shared-patterns.md`
- Design direction: `../app_design 3/Balencia-Design-Direction.md`

## Creative production

Visual asset production (Higgsfield sessions, briefs, QA) lives in the sibling workspace [../balencia-creatives-production/](../balencia-creatives-production/). Start at [batches/index.md](../balencia-creatives-production/batches/index.md). Product rules synced from answered [questions-for-user.md](questions-for-user.md) (2026-05-26).

## Folder Map

- `batches/` - batch plan and per-batch review workspaces.
- `screen-iteration-batches/` - slow post-remediation polish batches, P00 through P18.
- `a-plus-plus-review/` - Figma-ready re-review batches, R01 through R18, with A++ grades and final rollup.
- `findings/` - cross-batch findings, accepted improvements, deferred decisions, and screen-note template.
- `commands/` - exact commands and review runbooks.
- `prompts/` - reusable prompts that preserve the compiled audit standard.
- `teams/` - role briefs for focused review passes.
- `skills/balencia-screen-audit/` - reusable local skill for future audit sessions.
- `skills/balencia-screen-polish/` - reusable local skill for P-batch implementation and verification.
- `initial-observations.md` - seed hypotheses to validate during the audit.

## Operating Rule

Do not redesign during the first audit pass. Record the finding, evidence, severity, recommendation, and decision status. Improvements happen after the batch review has made the problem clear.
