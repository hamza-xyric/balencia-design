# P03 - Guest, SIA Onboarding, Today Entry

- Status: `implemented-with-verification-blocker`
- Screens: `06`, `07`, `08`, `12`, `41`
- Routes: `/auth/guest-preview`, `/auth/sia-onboarding`, `/auth/initial-plan`, `/tabs/today`, `/tabs/today/schedule`
- Sources: `../batches/batch-03.md`, `../update-batches/batch-u02.md`
- Build gate: required

## Focus

Verify the first value moment: preview, first SIA interaction, initial plan, Today entry, and schedule.

## Review Checklist

- Confirm guest preview is honest demo/preview, not overpromised.
- Confirm SIA onboarding reaches the plan without pretending to be a full AI simulation.
- Confirm initial plan reflects selected domains and Today has clear daily action hierarchy.
- Confirm calendar controls are readable, reachable, and mobile-safe.

## Required Close Evidence

- Browser QA for Guest -> SIA -> Initial Plan -> Today.
- `npm run check` and `npm run build` results.

## Implementation Summary

- Updated guest preview back behavior so the entry screen returns to sign-up, while preserving the honest preview/demo continuation.
- Tightened Today interaction behavior by keeping health metric targets at 44px, wiring metric taps, making the insight card navigable, and preserving mood/action feedback.
- Reworked Schedule controls so header add, sync status, day/week/month switching, date movement, task placement, and add-event modal all have visible behavior and accessible labels.

## Changed Files

- `balencia-screens/src/app/auth/guest-preview/page.tsx`
- `balencia-screens/src/app/tabs/today/page.tsx`
- `balencia-screens/src/app/tabs/today/schedule/page.tsx`
- `balencia-screens/src/components/screens/HealthMetricsStrip.tsx`
- `balencia-screens/output/playwright/p03/*.png` (QA evidence)
- `balencia-screens-reviewed/screen-iteration-batches/P03-guest-sia-today.md`
- `balencia-screens-reviewed/screen-iteration-batches/index.md`

## Findings Addressed

- B03-F01, B03-F02: Guest preview starts empty, requires name plus selected domains, exposes selected-state feedback, opens a clearly labeled preview dialog, and continues to Today demo.
- B03-F03, B03-F04: SIA onboarding browser QA confirmed real composer behavior, suggestion-chip progression, SIA follow-up feedback, premium visual area, and transition to Initial Plan.
- B03-F05, B03-F06: Initial plan browser QA confirmed customize panel, mission edit/save behavior, plan consistency copy for fitness/finance/wellbeing, and Start Journey navigation to Today.
- B03-F07, B03-F08: Today browser QA confirmed mood capture, action completion, action expansion, quick action navigation, and a 44px health metric hit target.
- B03-F09, B03-F10: Schedule now has functional day/week/month switching, readable date movement, task placement with count updates, add-event modal from header/FAB, disambiguated add labels, and a sync control with a connected-services path.

## Findings Deferred

- None for P03 route scope.
- Verification blocker outside P03: `npm run check` currently fails `verify:brand` on `balencia-screens/src/app/tabs/sia/group/page.tsx` (Screen 76) for pairing SIA copy with `brand-orange`. This belongs to a later conversation/social batch and was not changed here.

## Browser QA Evidence

- Browser target: `http://localhost:3005`
- Method: Playwright browser QA fallback; the in-app browser target list was empty in this session.
- Console errors in final scoped P03 pass: none.
- Evidence directory: `balencia-screens/output/playwright/p03/`

Route evidence:

- `/auth/guest-preview`: heading visible, Explore starts disabled, name/domain selection updates status, preview dialog opens, Continue to demo Today navigates to `/tabs/today`.
- `/auth/sia-onboarding`: SIA first message and real composer visible, suggestion chips add messages, SIA follow-up appears, second response transitions to `/auth/initial-plan`.
- `/auth/initial-plan`: Customize opens, mission edit dialog saves a renamed mission, Start your journey navigates to `/tabs/today`.
- `/tabs/today`: mood capture toast, action completion toast, action expansion, 44px metric target, and Breathe quick action navigation verified.
- `/tabs/today/schedule`: day label, week view, month view, task placement, unscheduled count update, add modal/create flow, and sync control navigation verified.

Screenshots:

- `balencia-screens/output/playwright/p03/01-guest-preview-dialog.png`
- `balencia-screens/output/playwright/p03/02-sia-onboarding-initial.png`
- `balencia-screens/output/playwright/p03/03-initial-plan-customize.png`
- `balencia-screens/output/playwright/p03/04-today-action-feedback.png`
- `balencia-screens/output/playwright/p03/05-schedule-week-view.png`
- `balencia-screens/output/playwright/p03/06-schedule-month-view.png`
- `balencia-screens/output/playwright/p03/07-schedule-day-after-add.png`

## Verification Results

- Targeted browser QA: passed against `http://localhost:3005`.
- `VISUAL_AUDIT_BASE_URL=http://localhost:3005 npm run verify:visual`: passed, 41 routes audited.
- `npm run build`: passed; production build generated 96 static pages including all P03 routes.
- `npm run check`: failed due out-of-scope brand verification.
  - `lint`: passed.
  - `typecheck`: passed.
  - `verify:routes`: passed, 90 screens / 90 specs.
  - `verify:assets`: passed, 14 logo assets.
  - `verify:copy`: passed, 170 files scanned.
  - `verify:brand`: failed on `src/app/tabs/sia/group/page.tsx`, which is outside P03.

## Final Audit Follow-up - 2026-05-26

- Final cross-batch audit found the old P03 verification blocker is no longer current: final `npm run check` now passes, including `verify:brand`.
- Final implementation polish made non-interactive chips render as static elements instead of semantic buttons, expanded shared segmented-control inner targets, and expanded Today secondary links to practical 44px targets.
- Final browser load evidence: `/auth/guest-preview`, `/auth/sia-onboarding`, `/auth/initial-plan`, `/tabs/today`, and `/tabs/today/schedule` loaded with zero console errors, zero practical sub-44 targets, zero nested controls, and no bottom/home-indicator overlap in `balencia-screens/output/final-audit/route-load-results.json`.
