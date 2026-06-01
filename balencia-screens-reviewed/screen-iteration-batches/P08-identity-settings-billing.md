# P08 - Identity, Settings, Billing

- Status: `implemented-check-blocked`
- Screens: `19`, `20`, `21`, `22`, `23`
- Routes: `/tabs/me/rpg`, `/tabs/me/personal-wiki`, `/tabs/me/settings`, `/tabs/me/connected-services`, `/tabs/me/subscription`
- Sources: `../batches/batch-08.md`, `../update-batches/batch-u04.md`
- Build gate: no

## Focus

Verify identity, memory, settings, integrations, and billing respect trust and platform expectations.

## Review Checklist

- Confirm RPG stays clean and V1-scoped.
- Confirm SIA memory has review/edit/privacy controls.
- Confirm settings are dark-only for V1, integrations preview scopes honestly, and billing models IAP-adjacent states.

## Required Close Evidence

- Browser QA for memory controls, settings sheets, OAuth preview, restore/purchase states.
- `npm run check` result.

## Implementation Closeout - 2026-05-26

- Implementation status: P08 route fixes implemented and browser-reviewed.
- Local QA URL: `http://localhost:3005` (existing dev server).
- Build gate: not required for P08.

## Changed Files

- `balencia-screens/src/app/tabs/me/rpg/page.tsx`
- `balencia-screens/src/app/tabs/me/personal-wiki/page.tsx`
- `balencia-screens/src/app/tabs/me/settings/page.tsx`
- `balencia-screens/src/app/tabs/me/connected-services/page.tsx`
- `balencia-screens/src/app/tabs/me/subscription/page.tsx`
- `balencia-screens/src/components/layout/Header.tsx`
- `balencia-screens/src/components/design-system/SearchBar.tsx`
- `balencia-screens/src/components/design-system/SegmentedControl.tsx`
- `balencia-screens/src/components/screens/TierCard.tsx`

## Findings Addressed

- B08-F01, B08-F07, B08-F10, B08-F14: shared back control remains semantic and now supports a route fallback for directly loaded Me stack screens.
- B08-F02, B08-F03: RPG domain cards are semantic buttons, open a sub-stat sheet, include dashboard routing, and the rewards link hit area is expanded.
- B08-F04, B08-F05, B08-F06: Personal Wiki has real search across chapters, active chapter state, inline edit controls, delete confirmation, "This is wrong" review/removal, and 44px-oriented memory actions.
- B08-F08, B08-F09: Settings rows expose sheets/routes/confirmations, disabled dark-only theme state, and full-row session-persisted toggles.
- B08-F11, B08-F12, B08-F13: Connected Services shows provider-specific scope/storage copy, OAuth preview, sync state, disconnect confirmation, and 44px action controls.
- B08-F15, B08-F16: Subscription supports monthly/annual pricing with correct annual values, disabled current-plan CTA, upgrade/restore/downgrade/cancel/payment/history modals, and 44px billing controls.

## Findings Deferred

- None for P08 implementation.
- Verification blocker outside P08: `npm run check` currently fails in `verify:brand` because `src/app/tabs/sia/group/page.tsx` pairs SIA copy with `brand-orange`. That route belongs to the conversation suite, so it was not modified in this batch.

## Browser QA Evidence

- `/tabs/me/rpg`: fresh route load produced only React DevTools/HMR console messages; domain card opened `Fitness sub-stats` dialog with sub-stat rows and dashboard link (`.playwright-cli/page-2026-05-26T13-06-54-171Z.yml`, `.playwright-cli/console-2026-05-26T13-14-06-296Z.log`).
- `/tabs/me/personal-wiki`: fresh route load produced only React DevTools/HMR console messages; search for `sleep` returned a cross-chapter `Correlations` result; inline edit exposed Title/Memory/Save/Cancel/Delete; delete confirmation and "This is wrong" review sheet appeared (`.playwright-cli/page-2026-05-26T13-08-50-487Z.yml`, `.playwright-cli/page-2026-05-26T13-15-08-465Z.yml`).
- `/tabs/me/settings`: full-row Face ID toggle changed state; `Change password` opened a settings sheet; destructive rows expose confirmation flows (`.playwright-cli/page-2026-05-26T13-09-36-836Z.yml`).
- `/tabs/me/connected-services`: Apple Health `Connect` opened an OAuth preview with read-only scopes, storage, revoke/delete copy; WHOOP `Disconnect` opened a confirmation with future-sync and delete/revoke copy (`.playwright-cli/page-2026-05-26T13-10-04-722Z.yml`, `.playwright-cli/page-2026-05-26T13-10-34-202Z.yml`).
- `/tabs/me/subscription`: Annual toggle shows `$192/yr`, `$576/yr`, and Save 20%; current plan is disabled; `Upgrade to Pro` and `Restore purchases` open IAP-adjacent confirmation modals; touch-target eval returned no sub-44px controls after resizing (`.playwright-cli/page-2026-05-26T13-11-11-113Z.yml`, `.playwright-cli/page-2026-05-26T13-11-35-081Z.yml`).

## Verification Results

- `npm run check` inside `balencia-screens`: failed on unrelated `verify:brand` gate for `src/app/tabs/sia/group/page.tsx`.
- Passing portions before failure: `eslint`, `tsc --noEmit`, `verify:routes` (`90 screens, 90 specs`), `verify:assets`, and `verify:copy`.
- `npm run build`: not run because P08 build gate is `no`.

## Final Audit Follow-up - 2026-05-26

- Final cross-batch audit found the old P08 check blocker is no longer current: final `npm run check` now passes, including `verify:brand`.
- Final implementation polish replaced Settings toggle rows with a single row-level `role="switch"` control, expanded Personal Wiki search/edit targets, expanded shared SearchBar targets, and preserved RPG/dashboard access behavior.
- Final browser load evidence: `/tabs/me/rpg`, `/tabs/me/personal-wiki`, `/tabs/me/settings`, `/tabs/me/connected-services`, and `/tabs/me/subscription` loaded with zero console errors, zero practical sub-44 targets, zero nested controls, and no bottom/home-indicator overlap in `balencia-screens/output/final-audit/route-load-results.json`.
