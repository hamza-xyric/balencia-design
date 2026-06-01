# Update Batch U07 - Habits, social surfaces, paywall, accountability, intelligence, and breathing

- Status: `prototype-implemented`
- Updated: 2026-05-26
- Scope: 10 `app_design 3` screen-spec files plus matching `balencia-screens` prototype routes
- Prototype scope: implemented for U07 routes
- Audit sources: `batch-13.md`, `batch-14.md` plus `findings-ledger.md` and `deferred-decisions.md`

## Screen Specs

| ID | Screen | Spec | Route | Findings | Audit refs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 38 | Habits | `38-habits.md` | `/features/habits` | 3 (1 critical, 2 major, 0 minor) | B13 | implemented |
| 39 | Leaderboard | `39-leaderboard.md` | `/features/leaderboard` | 3 (0 critical, 3 major, 0 minor) | B13 | implemented |
| 40 | Community | `40-community-chat-rooms.md` | `/features/community` | 3 (1 critical, 2 major, 0 minor) | B13 | implemented |
| 42 | Celebration overlay | `42-celebration-achievement-overlay.md` | `/features/celebration` | 2 (1 critical, 1 major, 0 minor) | B13 | implemented |
| 43 | Paywall | `43-paywall-upgrade-prompt.md` | `/features/paywall` | 3 (1 critical, 2 major, 0 minor) | B13 | implemented |
| 46 | Accountability | `46-accountability.md` | `/features/accountability` | 3 (1 critical, 2 major, 0 minor) | B14 | implemented |
| 47 | Competitions | `47-competitions.md` | `/features/competitions` | 3 (1 critical, 2 major, 0 minor) | B14 | implemented |
| 48 | Intelligence dashboard | `48-intelligence-dashboard.md` | `/features/intelligence` | 3 (0 critical, 3 major, 0 minor) | B14 | implemented |
| 52 | Stress management | `52-stress-management.md` | `/features/stress` | 3 (1 critical, 2 major, 0 minor) | B14 | implemented |
| 53 | Breathing exercises | `53-breathing-exercises.md` | `/features/breathing` | 3 (1 critical, 2 major, 0 minor) | B14 | implemented |

## Completion Note

Updated the following specs with an `Audit Feedback Integration (2026-05-26)` section that carries ledger findings, resolved product decisions, and prototype implications into the implementation contract.

- `38-habits.md`
- `39-leaderboard.md`
- `40-community-chat-rooms.md`
- `42-celebration-achievement-overlay.md`
- `43-paywall-upgrade-prompt.md`
- `46-accountability.md`
- `47-competitions.md`
- `48-intelligence-dashboard.md`
- `52-stress-management.md`
- `53-breathing-exercises.md`

## Accepted Recommendation Themes

- accessibility
- conversion
- information-architecture
- mobile-ergonomics
- monetization
- navigation
- retention
- trust-privacy

## Resolved Decisions Applied

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

## Deferred Questions

- None open for this batch. Previously deferred product decisions are resolved in `../findings/deferred-decisions.md`.

## Prototype Implications

- Prototype implementation completed for the U07 routes listed above.
- Critical retention/navigation/monetization/trust/accessibility findings were prioritized before polish.
- No U07 findings are deferred.

## Prototype Implementation Status

- Implemented local state, semantic controls, and visible feedback for habit completion, period selection, add-habit sheet, leaderboard filters/profile moderation, community room preview/create flows, celebration share/dismiss, paywall plan/purchase/restore/dismiss states, accountability consent/tabs/setup flows, competition filters/details/join/reminder flows, intelligence contradiction/time-range/report/feedback flows, stress slider/trigger/note logging, and breathing library-to-immersive-session flow.
- Breathing active sessions now use a focused mode with the tab bar hidden.
- Accountability partner actions are gated behind consent setup.
- Community and leaderboard social surfaces expose privacy/moderation boundaries.
- Paywall models IAP-adjacent processing/success/restore/all-plans states without live billing.

## Changed Prototype Files

- `balencia-screens/src/app/features/habits/page.tsx`
- `balencia-screens/src/app/features/leaderboard/page.tsx`
- `balencia-screens/src/app/features/community/page.tsx`
- `balencia-screens/src/app/features/celebration/page.tsx`
- `balencia-screens/src/app/features/paywall/page.tsx`
- `balencia-screens/src/app/features/accountability/page.tsx`
- `balencia-screens/src/app/features/competitions/page.tsx`
- `balencia-screens/src/app/features/intelligence/page.tsx`
- `balencia-screens/src/app/features/stress/page.tsx`
- `balencia-screens/src/app/features/breathing/page.tsx`
- `balencia-screens/src/components/design-system/SegmentedControl.tsx`
- `balencia-screens/src/components/domain/HabitRow.tsx`
- `balencia-screens/src/components/domain/LeaderboardRow.tsx`
- `balencia-screens/src/components/screens/CelebrationOverlay.tsx`

## Findings Addressed

- B13-F01 through B13-F14.
- B14-F01 through B14-F15.

## Findings Deferred

- None.

## Verification Results

- `npm run check` inside `balencia-screens`: superseded by P00 foundation verification on 2026-05-26; full repo check now passes.
- Targeted lint for all U07 changed prototype files: passed.
- `npm run build`: superseded by P00 foundation verification on 2026-05-26; production build now passes.
- Browser QA with Playwright CLI against `http://localhost:3000`: passed for route loading and primary interactions on `/features/habits`, `/features/leaderboard`, `/features/community`, `/features/celebration`, `/features/paywall`, `/features/accountability`, `/features/competitions`, `/features/intelligence`, `/features/stress`, and `/features/breathing`.
