# Update Batch U05 - Me utilities, data trust, achievements, and first domain dashboards

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens` for the U05 routes
- Audit sources: `batch-09.md`, `batch-10.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 24 | Notification history | `24-notification-history.md` | `/tabs/me/notifications` | 3 (1 critical, 2 major, 0 minor) | B09 | integrated |
| 25 | Help center | `25-help-center.md` | `/tabs/me/help` | 3 (0 critical, 3 major, 0 minor) | B09 | integrated |
| 49 | Progress photos | `49-progress-photos.md` | `/tabs/me/progress-photos` | 3 (1 critical, 2 major, 0 minor) | B09 | integrated |
| 50 | Profile edit | `50-profile-edit.md` | `/tabs/me/profile-edit` | 3 (1 critical, 2 major, 0 minor) | B09 | integrated |
| 71 | Achievement gallery | `71-achievement-gallery.md` | `/tabs/me/achievements` | 3 (1 critical, 2 major, 0 minor) | B09 | integrated |
| 72 | Knowledge graph | `72-knowledge-graph.md` | `/tabs/me/knowledge-graph` | 3 (1 critical, 2 major, 0 minor) | B10 | integrated |
| 84 | Data sources | `84-data-sources.md` | `/tabs/me/data-sources` | 2 (1 critical, 1 major, 0 minor) | B10 | integrated |
| 26 | Fitness dashboard | `26-fitness-workouts-dashboard.md` | `/domains/fitness` | 3 (0 critical, 2 major, 1 minor) | B10 | integrated |
| 27 | Workout detail | `27-workout-detail-active-workout.md` | `/domains/workout` | 3 (1 critical, 2 major, 0 minor) | B10 | integrated |
| 28 | Nutrition dashboard | `28-nutrition-diet-dashboard.md` | `/domains/nutrition` | 3 (0 critical, 2 major, 1 minor) | B10 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `24-notification-history.md`
- `25-help-center.md`
- `49-progress-photos.md`
- `50-profile-edit.md`
- `71-achievement-gallery.md`
- `72-knowledge-graph.md`
- `84-data-sources.md`
- `26-fitness-workouts-dashboard.md`
- `27-workout-detail-active-workout.md`
- `28-nutrition-diet-dashboard.md`

Implemented the matching prototype route updates for this batch.

### Changed Prototype Routes / Files

- `balencia-screens/src/app/tabs/me/notifications/page.tsx`
- `balencia-screens/src/app/tabs/me/help/page.tsx`
- `balencia-screens/src/app/tabs/me/progress-photos/page.tsx`
- `balencia-screens/src/app/tabs/me/profile-edit/page.tsx`
- `balencia-screens/src/app/tabs/me/achievements/page.tsx`
- `balencia-screens/src/app/tabs/me/knowledge-graph/page.tsx`
- `balencia-screens/src/app/tabs/me/data-sources/page.tsx`
- `balencia-screens/src/app/domains/fitness/page.tsx`
- `balencia-screens/src/app/domains/workout/page.tsx`
- `balencia-screens/src/app/domains/nutrition/page.tsx`
- Shared support files: `balencia-screens/src/components/layout/Header.tsx`, `balencia-screens/src/components/design-system/FAB.tsx`, `balencia-screens/src/components/screens/NotificationRow.tsx`
- Minimal verification unblocker: removed a stray syntax fragment at the end of `balencia-screens/src/app/tabs/goals/page.tsx`.

### Findings Addressed

- B09-F01 through B09-F15: Notification deep links/read state, Help search/FAQ/support, Progress Photos add/compare/photo/privacy states, Profile controlled fields/save/delete confirmation, and Achievement filters/card detail/selected semantics.
- B10-F01 through B10-F14: Knowledge Graph node selection/legend/zoom/detail links, Data Sources provider/detail/demo OAuth states, Fitness SIA context/manual-vs-planned workout entry, Workout active/rest/pause/end/summary state, and Nutrition water increment/undo plus SIA context routing.

### Findings Deferred

- None for this batch. Production-grade native camera capture, live OAuth, persistence, and real workout timers remain beyond this visual prototype pass but the requested prototype states and transitions are present.

## Accepted Recommendation Themes

- accessibility
- design-system-consistency
- information-architecture
- mobile-ergonomics
- navigation
- product-sense
- retention
- trust-privacy
- visual-polish

## Resolved Decisions Applied

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Prototype routes were updated for this implementation pass.
- Critical conversion, navigation, retention, trust/privacy, accessibility, and mobile ergonomics findings were prioritized before visual polish.
- Verification performed:
  - Targeted ESLint on changed U05 files passed.
  - `npm run check` did not complete because the wider worktree still has unrelated lint/type errors outside U05, including generated `dev/types/routes.d.ts`, `auth/initial-plan`, `domains/learning`, `tabs/goals/create`, and `tabs/goals/detail`.
  - Browser QA via Playwright against the existing dev server on `http://localhost:3000` loaded all ten U05 routes and exercised representative interactions: Help search, Progress Photos Add Progress sheet, Workout Complete Set/rest feedback, and Nutrition Add Water/undo feedback.
