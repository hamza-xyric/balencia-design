# I06 - A+ Polish Sprint

- Status: `complete`
- Build gate: required
- Source synthesis: `../a-plus-plus-review/consolidated-cross-check.md`
- Primary source of truth: `../a-plus-plus-review/final-rollup.md`

## Goal

Close the minor-only A+ blockers and prepare screens for a dedicated A++ re-review.

This phase may run concurrently with I01-I05. Prefer route-local polish; if a fix depends on shared foundation work still moving in another phase, record the dependency and continue with the remaining I06 findings.

## Finding Scope

| Area | Findings |
| --- | --- |
| Auth and recovery polish | R01-F01, R02-F01 |
| Conversation polish | R05-F01, R05-F02 |
| Mission/Me polish | R06-F03, R07-F02, R07-F03 |
| Memory/provider/identity polish | R08-F02, R08-F04, R09-F04 |
| Domain minor targets | R10-F08, R11-F05, R11-F07, R11-F09, R11-F12, R12-F06, R12-F10 |
| Habit/paywall/breathing polish | R13-F01, R13-F06, R14-F07 |
| Health/media/social minor polish | R16-F03, R16-F05, R17-F02, R17-F05, R18-F01, R18-F03, R18-F04 |

## Phase Work Plan

Complete the full I06 scope under this phase owner:

1. Auth and conversation A+ screens.
2. Mission/Me A+ screens.
3. Domain minor target and stale-toast pass.
4. Habit/paywall/breathing handoff pass.
5. Media/social tiny-target pass.
6. Final A+ evidence sweep.

## Required Reading

- All R docs for the active phase.
- `../a-plus-plus-review/index.md`
- `../a-plus-plus-review/final-rollup.md`
- `../skills/balencia-screen-audit/references/rubric.md`
- `../skills/balencia-screen-audit/references/brand-ux-gates.md`

## Acceptance Gates

- Every addressed minor finding has fresh evidence.
- No new major/minor finding is introduced by the polish.
- `npm run check` passes.
- `npm run build` passes because this phase prepares final A++ re-review readiness.
- Do not change grades in `index.md`; record "ready for A++ re-review" candidates in this file.

## Closeout

Use the handoff template from `index.md`.

## Closeout - 2026-05-27

### Phase Work

- Phase: I06.
- Phase work completed: Reports preview close-target polish.
- Findings addressed: R18-F01.
- Routes touched: `/features/reports`.

### Changed Files

- `balencia-screens/src/app/features/reports/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/capture-reports-preview.mjs`
- `balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-preview-close-target.json`
- `balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-initial.png`
- `balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-preview-close-target.png`

### Evidence

- `../../balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-preview-close-target.json`
- `../../balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-initial.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/reports-preview-close-target/reports-preview-close-target.png`

### Verification

- Browser QA: pass via local Playwright fallback against `http://localhost:3000`; in-app Browser backend was unavailable. Reviewed `/features/reports` initial state and weekly report preview state. `Close report preview` measured `44x44`, remained visible in the phone-frame screenshot, dismissed the preview, and produced no page errors. Console output was limited to React DevTools/HMR dev info.
- `npm run check`: pass; lint, typecheck, routes, assets, copy, and brand checks passed.
- `npm run build`: pass; required I06 build gate completed with the existing non-failing Node `DEP0205` deprecation warning.

### Deferred

- Finding: R18-F04 on `/features/social-buddy`.
- Reason: while selecting the first tiny-target work, the same Social Buddy `Invite buddy` / `Report` controls changed underneath this session to add `min-h-11`, indicating overlapping active work on the same route/finding. This session paused that finding rather than racing the concurrent edit.
- Recommended owner/phase: keep R18-F04 with the current Social Buddy owner; next verifier should recapture `/features/social-buddy` after that edit settles.

### Open Phase Work

- R18-F03 Video library clear-search and player-close target polish on `/features/videos`, which is route-isolated from the reports work and avoids the current Social Buddy overlap.

## Closeout - 2026-05-27

### Phase Work

- Phase: I06.
- Phase work completed: Video library target polish.
- Findings addressed: R18-F03.
- Routes touched: `/features/videos`.

### Changed Files

- `balencia-screens/src/app/features/videos/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/capture-video-targets.mjs`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/video-library-target-polish.json`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-initial.png`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-search-focus-clear-target.png`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-after-clear.png`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-player-close-target.png`
- `balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-after-player-close.png`

### Evidence

- `../../balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/video-library-target-polish.json`
- `../../balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-search-focus-clear-target.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/video-library-target-polish/videos-player-close-target.png`

### Verification

- Browser QA: pass via local Playwright fallback against `http://localhost:3000`; in-app Browser backend was unavailable. Reviewed `/features/videos` initial, search-with-clear, after-clear, player, and after-player-close states. `Clear video search` measured `44x44`, `Close video player` measured `44x44`, both controls worked, and no page errors were captured.
- `npm run check`: pass; lint, typecheck, routes, assets, copy, and brand checks passed. ESLint emitted one unrelated existing warning in `balencia-screens/output/a-plus-plus-review/I02/r14-breathing-filter-honesty/capture-filter-qa.js`.
- `npm run build`: pass; required I06 build gate completed with the existing non-failing Node `DEP0205` deprecation warning.

### Deferred

- None for this phase pass.

### Open Phase Work

- R17-F02 Image viewer media/date metadata and share-warning `Got it` target polish on `/features/image-viewer`; route-isolated from the completed reports/video work and avoids the current Social Buddy overlap noted above.

## Closeout - 2026-05-27

### Phase Work

- Phase: I06.
- Phase work completed: Full A+ polish sweep for the remaining route-local minor findings, plus fresh evidence for all touched I06 routes and states.
- Findings addressed in this pass: R01-F01, R02-F01, R05-F01, R05-F02, R06-F03, R07-F02, R07-F03, R08-F02, R09-F04, R10-F08, R11-F05, R11-F07, R11-F09, R11-F12, R12-F06, R12-F10, R13-F01, R13-F06, R14-F07, R17-F02.
- Findings already closed or verified by overlapping phase work: R08-F04, R16-F03, R16-F05, R17-F05, R18-F01, R18-F03, R18-F04.
- Routes reviewed: `/auth/sign-up`, `/auth/whatsapp`, `/tabs/sia/voice-history`, `/tabs/sia/conversations`, `/tabs/goals/detail`, `/tabs/goals/obstacles`, `/tabs/me/life-areas`, `/tabs/me/personal-wiki`, `/tabs/me/profile-edit`, `/domains/nutrition`, `/domains/meal`, `/domains/finance`, `/domains/career`, `/domains/relationships`, `/domains/learning`, `/features/journal`, `/features/habits`, `/features/paywall`, `/features/breathing`, `/features/image-viewer`.

### Changed Files

- `balencia-screens/src/app/auth/sign-up/page.tsx`
- `balencia-screens/src/app/auth/whatsapp/page.tsx`
- `balencia-screens/src/app/tabs/sia/voice-history/page.tsx`
- `balencia-screens/src/app/tabs/sia/conversations/page.tsx`
- `balencia-screens/src/app/tabs/goals/detail/page.tsx`
- `balencia-screens/src/app/tabs/goals/obstacles/page.tsx`
- `balencia-screens/src/app/tabs/me/life-areas/page.tsx`
- `balencia-screens/src/app/tabs/me/personal-wiki/page.tsx`
- `balencia-screens/src/app/tabs/me/profile-edit/page.tsx`
- `balencia-screens/src/app/domains/nutrition/page.tsx`
- `balencia-screens/src/app/domains/meal/page.tsx`
- `balencia-screens/src/app/domains/finance/page.tsx`
- `balencia-screens/src/app/domains/career/page.tsx`
- `balencia-screens/src/app/domains/relationships/page.tsx`
- `balencia-screens/src/app/domains/learning/page.tsx`
- `balencia-screens/src/app/features/journal/page.tsx`
- `balencia-screens/src/app/features/habits/page.tsx`
- `balencia-screens/src/app/features/paywall/page.tsx`
- `balencia-screens/src/app/features/breathing/page.tsx`
- `balencia-screens/src/app/features/image-viewer/page.tsx`
- `balencia-screens/src/app/domains/budget/page.tsx`
- `balencia-screens/src/app/domains/exercise-library/page.tsx`
- `balencia-screens/src/app/tabs/me/knowledge-graph/page.tsx`
- `balencia-screens/src/app/tabs/sia/voice-fullscreen/page.tsx`
- `balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/capture-i06-polish.mjs`
- `balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/i06-a-plus-polish-sweep.json`
- `balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/*.png`

### Evidence

- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/i06-a-plus-polish-sweep.json`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/01-sign-up-legal-contrast.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/02-whatsapp-resend-disabled.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/05-voice-history-action-pressed.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/05-conversations-search-clear.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/06-goal-detail-next-up-visible.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/07-obstacles-dismiss-undo.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/07-life-areas-week-comparison.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/08-personal-wiki-preferences-empty.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/09-profile-edit-photo-picker.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/09-profile-edit-gender-picker.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/09-profile-edit-country-picker.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/09-profile-edit-timezone-picker.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/10-nutrition-targets.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/11-meal-logger-secondary-targets.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/11-finance-targets.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/11-career-targets.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/11-relationships-settings-no-stale-toast.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/12-learning-reflect-target.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/12-journal-write-target.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/13-habits-custom-added-feedback.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/13-paywall-all-plans-safe-area.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/14-breathing-rating-sheet.png`
- `../../balencia-screens/output/a-plus-plus-review/I06/a-plus-polish-sweep/17-image-viewer-next-share-target.png`

### Verification

- Browser QA: pass via local Playwright fallback against `http://localhost:3005`; in-app Browser backend was unavailable. The capture reviewed every touched I06 route/state listed above, measured target sizes and state changes, and produced `pass: true` with no console errors in `i06-a-plus-polish-sweep.json`.
- `npm run check`: pass; lint, typecheck, routes, assets, copy, and brand checks passed.
- `npm run build`: pass; required I06 build gate completed with the existing non-failing Node `DEP0205` deprecation warning.

### Deferred

- None for I06-owned work. The phase is ready for A++ re-review without updating grades in `a-plus-plus-review/index.md`.

### Cross-Agent Overlap

- I05 already closed or overlapped R08-F04, R18-F02, and R18-F04; I01/I03/I04 covered R16-F03, R17-F05, and R16-F05 respectively. This closeout records those as overlapping phase resolutions rather than reassigning ownership.
- Some routes in the I06 sweep already had concurrent or earlier edits in place before this pass settled, especially `/domains/nutrition`, `/domains/meal`, `/features/paywall`, and `/features/journal`; this pass inspected current state, made only the remaining route-local target/state fixes, and verified the final behavior.
- Minimal hook-rule timing cleanups were applied where `npm run check` would otherwise remain blocked in shared/overlap routes: `/domains/budget`, `/domains/exercise-library`, `/tabs/me/knowledge-graph`, and `/tabs/sia/voice-fullscreen`.
