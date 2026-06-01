# Update Batch U04 - Mission support, Me entry, identity, settings, integrations, and billing

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files
- Prototype scope: implemented in `balencia-screens` during the U04 prototype pass
- Audit sources: `batch-07.md`, `batch-08.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 73 | Mission journal | `73-mission-journal.md` | `/tabs/goals/journal` | 2 (0 critical, 2 major, 0 minor) | B07 | integrated |
| 85 | Obstacle coach | `85-obstacle-coach.md` | `/tabs/goals/obstacles` | 2 (1 critical, 1 major, 0 minor) | B07 | integrated |
| 16 | Life areas overview | `16-life-areas-overview.md` | `/tabs/me/life-areas` | 3 (0 critical, 3 major, 0 minor) | B07 | integrated |
| 17 | Me main | `17-me-main.md` | `/tabs/me` | 1 (0 critical, 0 major, 1 minor) | B07 | integrated |
| 18 | Explore section | `18-explore-section.md` | `/tabs/me/explore` | 3 (0 critical, 3 major, 0 minor) | B07 | integrated |
| 19 | RPG character | `19-rpg-character-screen.md` | `/tabs/me/rpg` | 3 (0 critical, 2 major, 1 minor) | B08 | integrated |
| 20 | Personal wiki | `20-personal-wiki-sia-memory.md` | `/tabs/me/personal-wiki` | 3 (1 critical, 2 major, 0 minor) | B08 | integrated |
| 21 | Settings | `21-settings.md` | `/tabs/me/settings` | 3 (1 critical, 2 major, 0 minor) | B08 | integrated |
| 22 | Connected services | `22-connected-services.md` | `/tabs/me/connected-services` | 4 (1 critical, 3 major, 0 minor) | B08 | integrated |
| 23 | Subscription & billing | `23-subscription-billing.md` | `/tabs/me/subscription` | 3 (1 critical, 2 major, 0 minor) | B08 | integrated |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `73-mission-journal.md`
- `85-obstacle-coach.md`
- `16-life-areas-overview.md`
- `17-me-main.md`
- `18-explore-section.md`
- `19-rpg-character-screen.md`
- `20-personal-wiki-sia-memory.md`
- `21-settings.md`
- `22-connected-services.md`
- `23-subscription-billing.md`

## Accepted Recommendation Themes

- accessibility
- billing
- information-architecture
- integration-control
- mobile-ergonomics
- monetization
- navigation
- retention
- settings-control
- trust-privacy

## Resolved Decisions Applied

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Prototype implementation completed for the U04 route set.
- Critical retention, trust/privacy, settings-control, integration-control, and billing findings were prioritized before visual polish.
- Browser QA covered primary actions, disabled/enabled states, touch-target-oriented controls, privacy/consent copy, modal/sheet states, and route transitions on the affected routes.

## Prototype Implementation Summary

### Changed Prototype Routes / Files

- `balencia-screens/src/app/tabs/goals/journal/page.tsx`
- `balencia-screens/src/app/tabs/goals/obstacles/page.tsx`
- `balencia-screens/src/app/tabs/me/life-areas/page.tsx`
- `balencia-screens/src/app/tabs/me/page.tsx`
- `balencia-screens/src/app/tabs/me/explore/page.tsx`
- `balencia-screens/src/app/tabs/me/rpg/page.tsx`
- `balencia-screens/src/app/tabs/me/personal-wiki/page.tsx`
- `balencia-screens/src/app/tabs/me/settings/page.tsx`
- `balencia-screens/src/app/tabs/me/connected-services/page.tsx`
- `balencia-screens/src/app/tabs/me/subscription/page.tsx`
- `balencia-screens/src/components/design-system/SearchBar.tsx`
- `balencia-screens/src/components/screens/SettingsRow.tsx`
- `balencia-screens/src/components/screens/TierCard.tsx`

### Findings Addressed

- B07-F01, B07-F02: Mission journal filters, sub-filters, mission detail links, photo viewer behavior, and semantic back coverage via shared header.
- B07-F03, B07-F04: Obstacle coach blocker detail, accept/dismiss actions, timing adjustment, disabled start state, loading, and reconnection success state.
- B07-F05, B07-F06, B07-F07: Life Areas radar dashboard tap zones, SIA chat link, comparison state, Plus-history explanation, deltas, and semantic back coverage.
- B07-F08: Me main "See all" touch target expanded with focus-visible styling.
- B07-F09, B07-F10, B07-F11: Explore controlled search, clear/no-results states, hidden suggestions during search, Plus lock handling, Pro paywall routing, and semantic back coverage.
- B08-F01, B08-F02, B08-F03: RPG domain cards open sub-stats and dashboard actions with expanded tap targets.
- B08-F04, B08-F05, B08-F06: Personal Wiki real search, chapter state, edit flow, delete/review flow, and accessible memory controls.
- B08-F07, B08-F08, B08-F09: Settings rows now open pickers/sheets/confirmations/routes, disabled unavailable row, and toggles persist for the session.
- B08-F10, B08-F11, B08-F12, B08-F13: Connected Services OAuth preview/loading, force sync, disconnect confirmation, status updates, scope/storage/deletion copy, and 44px action controls.
- B08-F14, B08-F15, B08-F16: Subscription billing period state, disabled current-plan CTA, upgrade/downgrade/cancel/restore/payment/history modals, and expanded segmented-control hit area.

### Findings Deferred

- None for U04.

### Verification Results

- `npx eslint` on the U04-touched route/component files: passed.
- `npm run check` inside `balencia-screens`: superseded by P00 foundation verification on 2026-05-26; full repo check now passes.
- `npm run build`: superseded by P00 foundation verification on 2026-05-26; production build now passes.
- Browser QA with Playwright on `http://localhost:3005`: passed for Explore search, Personal Wiki search/edit/review, Obstacle Coach accept/start/success, Settings sheet, Connected Services OAuth preview/allow, Subscription annual/current/restore states, Mission Journal filters/photos, RPG sub-stats, and Life Areas comparison explanation.
