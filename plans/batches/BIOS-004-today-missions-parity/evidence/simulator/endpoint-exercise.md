# BIOS-004 endpoint exercise log (2026-07-09, local backend :9090)

QA user: john.doe@balancia.test (seeded). App: Expo Go on iPhone 17 Pro simulator,
Metro with `EXPO_PUBLIC_API_URL=http://127.0.0.1:9090/api`. All calls below were made
BY THE APP through the new BIOS-004 UI (verified server-side afterwards via curl with a
separate API session) — not simulated.

| # | Action (UI) | Endpoint exercised | Server-verified result |
|---|-------------|--------------------|------------------------|
| 1 | Sign-in flow (Maestro point-taps; secure-field flake worked around per BIOS-003 lesson) | `POST /api/auth/login` | 200; per-device session; app landed on onboarding → Today |
| 2 | Create mission "Read 12 books this year" (S15 modal, category personal_growth, Side mission) | `POST /api/v1/journal/goals` | Goal created; board refetch showed ACTIVE 1; unified list contains goal, source=life |
| 3 | Board summary + XP momentum | `GET /api/v1/goals/unified`, `GET /api/gamification/stats` | summary {total 1, active 1→0, completed 0→1}; levelProgress xpForNextLevel=500 rendered as "500 XP to next level" |
| 4 | Mark complete (S14 ActionCheckCard) | `PUT /api/v1/journal/goals/:id {status:'completed'}` + forced `GET /api/gamification/stats` refetch | unified goal status=completed (server-verified); optimistic flip + green done state |
| 5 | XP honesty check | pre-stats totalXP=0 → post-complete totalXP=0 (async ≤15-min achievement job) | UI correctly showed "XP confirms within about 15 minutes", NO celebration push, NO fabricated XP number — exactly ADR-4's null-delta branch |
| 6 | Celebration deep link `exp://…/--/celebration` (forged-link attack) | none (client gate) | Renders honest no-XP acknowledgment; in-memory single-use gate (Move F C-1) blocks param-forged XP |

## Gamification stats snapshots (server, curl)
- Pre-complete: `totalXP 0, currentLevel 1, xpForNextLevel 500`
- Post-complete (immediately): `totalXP 0, currentLevel 1` → delta null → no celebration (honest)

## Screenshots (this directory)
- 00-launch.png — sign-in (S04 parity, session-expired banner)
- 01-today.png — Today S12 parity vs hi-fi 12.png (hero coach card purple-only, honest-null vitals + provenance, DOMAIN_COLORS chips, gated FAB, GlassNavBar)
- 02-missions-board.png — S13 parity vs 13.png (summary band + provenance, radar honest ghost, segmented tabs)
- 03-create-mission.png — S15 modal (14 categories, Life/Side type picker post-Move-F)
- 04-board-after-create.png — board after real create (ACTIVE 1, bronze side-mission card)
- 05-mission-detail.png — S14 vs 14.png (hero ring, honest-null KPI row Actions/Streak/XP, gated Cia insight, tier badge, safe-area chrome)
- 06-after-complete.png — post-complete: green done state + "XP confirms within about 15 minutes" + 5 accordions (2 locked/gated per A1)
- 08-board-done-tab.png — done filter tab: ACTIVE 0 / DONE 1, green complete card
- 09-life-areas-push.png / 10-celebration-deeplink-defensive.png — root-push architecture + forged-deep-link defense
- 11-cia-tab.png / 12-me-tab.png — remaining tabs via GlassNavBar

## A4 empirical gate (Wave-1)
PASSED — Expo Go bundled and ran the full app (1924 modules) with react-native-svg,
expo-haptics, expo-linear-gradient in the bundle; no native-module errors; no dev-client
pivot needed.

## Notes / follow-ups
- Copy defect (minor): `mission.domain` renders raw server value `Personal_Growth`/`PERSONAL_GROWTH`
  (underscore) on board card, detail chip, and Today pinned rows — needs a humanize pass (BIOS-005 or
  in-batch if time allows).
- Pinned missions on Today include a completed mission (progress ring 0, server progress=0 for a
  completed goal) — honest but worth a selection-rule tweak (exclude status complete) later.
- Onboarding "Continue to Today" stays disabled until Cia replies (BIOS-002 surface, out of scope);
  "Skip for now" path used.
