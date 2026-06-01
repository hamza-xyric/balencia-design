# Update Batch U09 - System overlays, search/rating, reports, media, accountability contracts, and social buddy

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens`; slower polish continues in P17/P18
- Audit sources: `batch-17.md`, `batch-18.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 65 | Force update | `65-force-update.md` | `/features/force-update` | 1 (1 critical, 0 major, 0 minor) | B17 | integrated |
| 66 | Notification permission | `66-notification-permission.md` | `/features/notification-permission` | 2 (1 critical, 1 major, 0 minor) | B17 | integrated |
| 67 | Image viewer | `67-image-viewer.md` | `/features/image-viewer` | 3 (2 critical, 1 major, 0 minor) | B17 | integrated |
| 68 | Universal search | `68-universal-search.md` | `/features/universal-search` | 3 (1 critical, 2 major, 0 minor) | B17 | integrated |
| 69 | App rating | `69-app-rating.md` | `/features/app-rating` | 3 (1 critical, 2 major, 0 minor) | B17 | integrated |
| 78 | Reports center | `78-reports-center.md` | `/features/reports` | 3 (2 critical, 1 major, 0 minor) | B18 | integrated |
| 80 | Music coach | `80-music-coach.md` | `/features/music` | 3 (1 critical, 2 major, 0 minor) | B18 | integrated |
| 81 | Video library | `81-video-library.md` | `/features/videos` | 3 (1 critical, 2 major, 0 minor) | B18 | integrated |
| 82 | Accountability contract | `82-accountability-contract.md` | `/features/accountability-contract` | 3 (1 critical, 2 major, 0 minor) | B18 | integrated |
| 83 | Social buddy profile | `83-social-buddy-profile.md` | `/features/social-buddy` | 3 (1 critical, 2 major, 0 minor) | B18 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `65-force-update.md`
- `66-notification-permission.md`
- `67-image-viewer.md`
- `68-universal-search.md`
- `69-app-rating.md`
- `78-reports-center.md`
- `80-music-coach.md`
- `81-video-library.md`
- `82-accountability-contract.md`
- `83-social-buddy-profile.md`

## Accepted Recommendation Themes

- accessibility
- conversion
- design-system-consistency
- information-architecture
- integration-control
- mobile-ergonomics
- navigation
- product-sense
- retention
- trust-privacy

## Resolved Decisions Applied

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Prototype implementation completed in `balencia-screens` for all U09 routes.
- Prioritized critical conversion, navigation, retention, trust/privacy, integration-control, accessibility, and mobile ergonomics findings before visual polish.
- Verification was run against the updated specs. P00 foundation verification on 2026-05-26 now passes full `npm run check`, production build, and visual audit; the previous image-viewer `<img>` warning was removed by converting to `next/image` while preserving accessible media output.

## Prototype Implementation Update (2026-05-26)

### Changed Prototype Routes / Files

- `balencia-screens/src/app/features/force-update/page.tsx`
- `balencia-screens/src/app/features/notification-permission/page.tsx`
- `balencia-screens/src/app/features/image-viewer/page.tsx`
- `balencia-screens/src/app/features/universal-search/page.tsx`
- `balencia-screens/src/app/features/app-rating/page.tsx`
- `balencia-screens/src/app/features/reports/page.tsx`
- `balencia-screens/src/app/features/music/page.tsx`
- `balencia-screens/src/app/features/videos/page.tsx`
- `balencia-screens/src/app/features/accountability-contract/page.tsx`
- `balencia-screens/src/app/features/social-buddy/page.tsx`

### Findings Addressed

- B17-F01: Force update CTA now enters store handoff, returned, unavailable-store, and retry states.
- B17-F02 / B17-F03: Notification permission now includes pre-permission, native allow/deny fixture, skipped, already-enabled, denied, and Settings recovery states.
- B17-F04 / B17-F05 / B17-F06: Image viewer now renders an actual image, supports close, previous/next, zoom, and V1-disabled progress-photo sharing with privacy warning.
- B17-F07 / B17-F08 / B17-F09: Universal search now uses an auto-focused controlled input, taxonomy-aligned filters, semantic recent/result buttons, clear/cancel behavior, empty-query recents, filtered results, and no-results state.
- B17-F10 / B17-F11 / B17-F12: App rating now starts unselected, branches positive ratings to native-review CTA, branches low ratings to feedback, supports cooldown and two-step suppression, and labels star controls.
- B18-F01 / B18-F02 / B18-F03: Reports center no longer promises PDF/data export, adds screenshot-only sharing guidance, report preview, and included-data review with private notes excluded by default.
- B18-F04 / B18-F05 / B18-F06: Music coach now includes play/pause, next-track, playlist selection, SIA rationale, honest demo/provider-ready copy, Spotify connect/manage/disconnect, and token/status states.
- B18-F07 / B18-F08 / B18-F09: Video library now includes a real labeled search input, filtered results, playable modal state, watched copy, no-results state, and YouTube query review/privacy handoff.
- B18-F10 / B18-F11 / B18-F12: Accountability contract now disables signing when no terms changed, adds pending-update review/signing, proof detail, partner permissions, SIA consent copy, and audit trail.
- B18-F13 / B18-F14 / B18-F15: Social buddy profile now wires privacy, message, invite, avatar preview, shared mission detail, report/block entry, semantic mission buttons, progressbar labels, and SIA-read consent controls.

### Findings Deferred

- None for this batch.

### Verification Results

- `./node_modules/.bin/eslint` against the ten U09 route files: passed historically; P00 removed the former image-viewer `<img>` warning with `next/image`.
- `npm run check`: superseded by P00 foundation verification on 2026-05-26; full repo check now passes.
- `npm run build`: superseded by P00 foundation verification on 2026-05-26; production build now passes.
- Browser QA: historical U09 route-load and interaction checks passed for store handoff, notification permission fixture states, image-viewer privacy warning, and updated privacy/provider/no-export copy. Full focused QA is scheduled for P17/P18.
