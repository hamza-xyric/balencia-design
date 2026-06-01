# Update Batch U06 - Core domain details, remaining dashboards, exercise library, and journal

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens`
- Audit sources: `batch-11.md`, `batch-12.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 29 | Meal detail | `29-meal-detail-food-logger.md` | `/domains/meal` | 3 (1 critical, 2 major, 0 minor) | B11 | integrated |
| 30 | Finance dashboard | `30-finance-money-map-dashboard.md` | `/domains/finance` | 3 (0 critical, 3 major, 0 minor) | B11 | integrated |
| 31 | Budget detail | `31-transaction-budget-detail.md` | `/domains/budget` | 3 (1 critical, 2 major, 0 minor) | B11 | integrated |
| 32 | Career dashboard | `32-career-work-dashboard.md` | `/domains/career` | 3 (1 critical, 1 major, 1 minor) | B11 | integrated |
| 33 | Relationships dashboard | `33-relationships-dashboard.md` | `/domains/relationships` | 4 (1 critical, 2 major, 1 minor) | B11 | integrated |
| 34 | Spirituality dashboard | `34-spirituality-dashboard.md` | `/domains/spirituality` | 4 (1 critical, 2 major, 1 minor) | B12 | integrated |
| 35 | Learning dashboard | `35-learning-growth-dashboard.md` | `/domains/learning` | 3 (1 critical, 2 major, 0 minor) | B12 | integrated |
| 36 | Creativity dashboard | `36-creativity-dashboard.md` | `/domains/creativity` | 3 (1 critical, 2 major, 0 minor) | B12 | integrated |
| 70 | Exercise library | `70-exercise-library.md` | `/domains/exercise-library` | 4 (2 critical, 2 major, 0 minor) | B12 | integrated |
| 37 | Journal | `37-journal.md` | `/features/journal` | 4 (1 critical, 3 major, 0 minor) | B12 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `29-meal-detail-food-logger.md`
- `30-finance-money-map-dashboard.md`
- `31-transaction-budget-detail.md`
- `32-career-work-dashboard.md`
- `33-relationships-dashboard.md`
- `34-spirituality-dashboard.md`
- `35-learning-growth-dashboard.md`
- `36-creativity-dashboard.md`
- `70-exercise-library.md`
- `37-journal.md`

## Accepted Recommendation Themes

- accessibility
- design-system-consistency
- information-architecture
- mobile-ergonomics
- navigation
- retention
- trust-privacy

## Resolved Decisions Applied

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Implemented the U06 prototype routes for critical retention, navigation, trust/privacy, accessibility, and mobile-ergonomics findings before visual polish.
- Affected routes now expose stateful controls, contextual sheets/modals, validation, toast/undo or success feedback, route/query context, and semantic 44px actions where relevant.

## Prototype Implementation (2026-05-26)

### Changed Prototype Routes / Files

- `balencia-screens/src/app/domains/meal/page.tsx`
- `balencia-screens/src/app/domains/finance/page.tsx`
- `balencia-screens/src/app/domains/budget/page.tsx`
- `balencia-screens/src/app/domains/career/page.tsx`
- `balencia-screens/src/app/domains/relationships/page.tsx`
- `balencia-screens/src/app/domains/spirituality/page.tsx`
- `balencia-screens/src/app/domains/learning/page.tsx`
- `balencia-screens/src/app/domains/creativity/page.tsx`
- `balencia-screens/src/app/domains/exercise-library/page.tsx`
- `balencia-screens/src/app/features/journal/page.tsx`
- Shared/supporting verification fixes: `balencia-screens/eslint.config.mjs`, plus minor brand/copy verifier cleanups in existing non-U06 files.

### Findings Addressed

- B11-F01 through B11-F16 addressed across Meal, Finance, Budget, Career, and Relationships routes.
- B12-F01 through B12-F18 addressed across Spirituality, Learning, Creativity, Exercise Library, and Journal routes.
- Resolved decisions applied: Q19, Q27, Q28, Q29, Q30, and Q44.

### Findings Deferred

- None for U06. Remaining limitations are prototype-level only: demo data, in-session state, no persistence/backend sync, and no live scanner/camera/OAuth/billing integrations.

### Verification Results

- `npm run check` inside `balencia-screens`: passed.
  - Lint completed without the previous image-viewer `<img>` warning after P00.
  - Typecheck, route verification, asset verification, copy verification, and brand verification passed.
- Browser QA:
  - Verified all U06 routes render: `/domains/meal`, `/domains/finance`, `/domains/budget?type=transaction`, `/domains/career`, `/domains/relationships`, `/domains/spirituality`, `/domains/learning`, `/domains/creativity`, `/domains/exercise-library`, `/features/journal`.
  - Verified representative stateful flows: Exercise Library detail opens and Add to workout shows success; Journal writer opens, validates content, saves, and shows success.
