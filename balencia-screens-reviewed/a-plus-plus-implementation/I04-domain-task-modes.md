# I04 - Domain Task Modes

- Status: `completed`
- Build gate: required
- Source synthesis: `../a-plus-plus-review/consolidated-cross-check.md`
- Primary source of truth: `../a-plus-plus-review/final-rollup.md`

## Goal

Clarify mixed utility modes so users can browse, log, create, enter active sessions, complete sessions, and review summaries without mode collisions.

## Finding Scope

| Area | Findings |
| --- | --- |
| Workout and active-session modes | R10-F07, R15-F02, R15-F03 |
| Meal and exercise source context | R11-F04, R12-F08 |
| Meditation/yoga/recipes/shopping depth | R15-F04, R15-F05, R15-F06, R15-F07 |
| Sleep logging and chart semantics | R15-F08, R15-F09 |
| Medication/reminders task depth | R16-F02, R16-F05 |
| Mission/domain task completion | R06-F04, R12-F09 |

## Phase Work Plan

Complete the full I04 scope under this phase owner:

1. Workout active, pause/end, and summary mode architecture.
2. Meal view versus food logging route/mode split.
3. Meditation and yoga focused session isolation.
4. Recipes create/filter and Shopping List overflow/FAB behavior.
5. Sleep manual logging, period tabs, and chart/accessibility cleanup.
6. Medication/reminders distinct sheets and task creation.

## Required Reading

- `../a-plus-plus-review/R06-call-summary-missions.md`
- `../a-plus-plus-review/R10-data-first-domains.md`
- `../a-plus-plus-review/R11-core-domain-details.md`
- `../a-plus-plus-review/R12-more-domains-journal.md`
- `../a-plus-plus-review/R15-mindfulness-food-shopping-sleep.md`
- `../a-plus-plus-review/R16-health-utilities-reporting.md`
- Relevant source specs under `../../app_design 3/` only for the touched screens.

## Acceptance Gates

- Active modes hide or inert background browse controls.
- Summary modes look complete and are not visually trapped under active headers.
- Logging forms contain required fields, validation, save/cancel, and visible success/error states.
- Source context is preserved where the resolved decisions require it.
- `npm run check` passes.
- `npm run build` passes because this phase is mode/routing-heavy and includes P15-class build-gate routes.
- Browser evidence covers entry, active/edit state, completion, and dismissal for each touched mode.

## Closeout

Use the handoff template from `index.md`.

## Closeout - 2026-05-27 - Medication Sheet Depth

### Phase Work

- Phase: I04.
- Phase work completed: Medication tracking distinct add/list/detail sheet states.
- Findings addressed: R16-F05.
- Routes touched: `/features/medication`.

### Changed Files

- `../../balencia-screens/src/app/features/medication/page.tsx`
- `I04-domain-task-modes.md`
- `index.md`

### Evidence

- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/01-initial.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/02-add-empty-disabled.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/03-add-filled-enabled.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/04-saved-detail.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/05-all-medications-list.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/06-existing-medication-detail.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/07-reminder-paused.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/medication-sheet-depth/medication-sheet-depth-evidence.json`

### Verification

- Browser QA: passed via local Playwright against `http://localhost:3000` after the in-app Browser reported `iab` unavailable. Reviewed initial route, add empty/disabled, add filled/enabled, saved detail success, all-medications list, existing medication detail, and reminder paused states. Evidence JSON recorded `0` browser console/page errors.
- `npm run check`: passed from `balencia-screens` on 2026-05-27. Lint, typecheck, route, asset, copy, and brand verification passed.
- `npm run build`: passed from `balencia-screens` on 2026-05-27. Build generated 96 static pages; emitted the existing non-failing Node `[DEP0205] module.register()` deprecation warning.

### Deferred

- Finding or question: none within the completed medication work.
- Reason: R16-F05 had enough resolved product guidance from Q04 and did not require a new privacy/product decision.
- Recommended owner/phase: continue I04 with the remaining route work.

### Open Phase Work

- R16-F02 on `/features/reminders`: replace the Add status-only feedback with a real task/reminder creation sheet and synchronize reminder toggle copy.

## Closeout - 2026-05-27 - Domain Task Modes Completion

### Phase Work

- Phase: I04 - Domain Task Modes.
- Phase work completed: clarified browse, log, create, active-session, completion, and summary modes across workout, meal, exercise library, journal, meditation, yoga, recipes, shopping list, sleep, reminders, and mission creation/detail flows.
- Findings addressed: R06-F04, R10-F07, R11-F04, R12-F08, R12-F09, R15-F02, R15-F03, R15-F04, R15-F05, R15-F06, R15-F07, R15-F08, R15-F09, R16-F02. R16-F05 was already addressed in the prior medication closeout above and remains covered by the I04 phase.
- Routes touched: `/domains/workout`, `/domains/meal`, `/domains/exercise-library`, `/features/journal`, `/features/meditation`, `/features/yoga`, `/features/recipes`, `/features/shopping-list`, `/features/sleep`, `/features/reminders`, `/tabs/goals/create`, `/tabs/goals/detail`.

### Changed Files

- `../../balencia-screens/src/app/domains/workout/page.tsx`
- `../../balencia-screens/src/app/domains/meal/page.tsx`
- `../../balencia-screens/src/app/domains/exercise-library/page.tsx`
- `../../balencia-screens/src/app/features/journal/page.tsx`
- `../../balencia-screens/src/app/features/meditation/page.tsx`
- `../../balencia-screens/src/app/features/yoga/page.tsx`
- `../../balencia-screens/src/app/features/recipes/page.tsx`
- `../../balencia-screens/src/app/features/shopping-list/page.tsx`
- `../../balencia-screens/src/app/features/sleep/page.tsx`
- `../../balencia-screens/src/app/features/reminders/page.tsx`
- `../../balencia-screens/src/app/tabs/goals/detail/page.tsx`
- `../../balencia-screens/src/app/tabs/me/knowledge-graph/page.tsx`
- `../../balencia-screens/src/app/tabs/sia/voice-fullscreen/page.tsx`
- `../../balencia-screens/src/app/features/report-block/page.tsx`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/capture-i04-domain-task-modes.mjs`
- `I04-domain-task-modes.md`
- `index.md`

### Evidence

- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/i04-domain-task-modes-evidence.json`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/01-workout-active.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/02-workout-paused.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/04-workout-summary.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/05-meal-view.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/10-exercise-workout-context.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/15-journal-edited.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/19-meditation-complete.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/24-yoga-see-all.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/29-recipes-created.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/32-shopping-fab-focus.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/35-sleep-saved.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/38-reminders-toggle-sync.png`
- `../../balencia-screens/output/a-plus-plus-review/I04/domain-task-modes/40-mission-created-detail.png`

### Verification

- `npm run check`: passed from `balencia-screens` on 2026-05-27. Lint, typecheck, routes, assets, copy, and brand verification passed.
- `npm run build`: passed from `balencia-screens` on 2026-05-27. Build generated 96 static pages and emitted the existing non-failing Node `[DEP0205] module.register()` deprecation warning.
- Browser QA: passed via local Playwright fallback against production `http://localhost:3005` because the in-app Browser `iab` runtime was unavailable and the local dev server hit `.next/dev` cache/runtime errors. Captured 40 route/state screenshots with `0` console errors and `0` page errors, covering entry, active, edit/create, completion, and dismissal states for all touched I04 modes.

### Deferred

- Finding or question: none.
- Reason: all remaining I04 findings had enough resolved guidance to implement without a new product, scope, or privacy decision.
- Recommended owner/phase: none.

### Open Phase Work

- Finding: none.
- Recommended next action: run the later A++ re-review flow to reassess grades; do not update `a-plus-plus-review/index.md` during this implementation phase.

### Cross-Agent Overlap

- Built on the prior I04 medication closeout for R16-F05 and left that evidence intact.
- `/features/reminders`, `/tabs/goals/detail`, and `/features/journal` already contained concurrent route/query and creation-flow work; this pass preserved those changes, completed the I04 task-mode behavior around them, and browser-reviewed the resulting states.
- `../../balencia-screens/src/app/tabs/me/knowledge-graph/page.tsx`, `../../balencia-screens/src/app/tabs/sia/voice-fullscreen/page.tsx`, and `../../balencia-screens/src/app/features/report-block/page.tsx` received lint/type-only stabilization so `npm run check` could pass with concurrent phase edits present.
