# P17 - System Overlays And Search

- Status: `closed`
- Screens: `65`, `66`, `67`, `68`, `69`
- Routes: `/features/force-update`, `/features/notification-permission`, `/features/image-viewer`, `/features/universal-search`, `/features/app-rating`
- Sources: `../batches/batch-17.md`, `../update-batches/batch-u09.md`
- Build gate: no

## Focus

Verify system overlays and search/rating fixtures are production-honest, accessible, and non-manipulative.

## Review Checklist

- Confirm force update and notification permission model native states honestly.
- Confirm image viewer uses real accessible media and disables progress-photo sharing in V1.
- Confirm universal search uses taxonomy-aligned filters and app rating starts unselected with non-coercive branching.

## Required Close Evidence

- Browser QA for overlay state changes, image navigation/share warning, search, and rating branches.
- `npm run check` result.

## Close Summary (Wave 3, 2026-05-27)

R17-F01 through R17-F05 inspected against current source — all addressed in prior implementation passes:

- 65 Force update: confirmed A++ — store-handoff fixture, unavailable-store, retry states all present.
- 66 Notification permission (R17-F01): primary CTA is now state-mapped — `denied` shows `Open Settings`, `allowed/skipped/settings/enabled` show `Done`, and `done` removes the CTA entirely. No persistent "Enable notifications" re-ask after a resolved state.
- 67 Image viewer (R17-F02): gallery now has 7 distinct photo SVGs with unique `date` + `caption`; alt text composes both per index, so screen readers get distinct content. Share-warning `Got it` is `h-11 min-w-11` (44x44).
- 68 Universal search (R17-F03): filter list includes `Settings`, `Screens`, `Community`. Filter scopes the visible result sections via `filterSectionAliases` + filter check in `useMemo`. `updateQuery`, `updateFilter`, and `cancelSearch` all clear the `opened` banner so stale navigation feedback never persists.
- 69 App rating (R17-F04/F05): `Not now` → `cooldown`, suppression confirm → `suppressed`, backdrop/handle → `closed`, all swap the sheet for a `ResolvedRatingState` panel. Branch subtitles differ per state, no duplicate "Thank you", feedback has a `0/200` counter, and submit is gated by `feedback.trim().length >= 10`.

Verification: `npm run check` passed. Headless Playwright capture (`scripts/capture-p16-p18-states.mjs` + `scripts/capture-p16-p18-followups.mjs`, evidence at `balencia-screens/output/p16-p18-states/`) ran all five P17 routes with **0 page errors and 0 console warnings**. Targeted positive evidence: notification permission `denied-cta` reads `Open Settings` (R17-F01); image viewer counter goes `2 of 7 → 3 of 7` and the three captured photo alts are all distinct (`Side progress photo from May 24, 2026`, `Recovery posture photo from May 27, 2026`, `Baseline photo from May 18, 2026`), share-warning `Got it` size = 61.9 × 44 (R17-F02); universal-search Goals filter scopes results (Missions section visible, Recipes / Quick Notes sections hidden), stale `Opening … detail` banner cleared after filter change, Cancel returns to Recent searches with banner cleared, Settings chip present and selectable (R17-F03); app rating `Not now` swaps the sheet for `Paused for 30 days` (stars + Not now + Do not ask again all gone) and `Do not ask again → Confirm suppression` swaps to `Rating prompts suppressed` (R17-F04).
