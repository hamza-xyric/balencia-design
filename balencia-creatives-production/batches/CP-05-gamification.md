# CP-05 — Gamification and reward

- Status: `not started`
- Package: `gamification`
- Session cap: 6 asset briefs
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-05`

## Screens in scope

| ID | Screen | Route | Priority |
| --- | --- | --- | --- |
| 42 | Celebration overlay | `/features/celebration` | P0 |
| 59 | Streak details | `/tabs/goals/streaks` | P1 |
| 71 | Achievement gallery | `/tabs/me/achievements` | P1 |

## Decision gates

- [x] **CQ10** resolved: earned + near-next badges; hide most locked trophies for low-motivation users

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-42-celebration-badge | 42 | `/features/celebration` | badge | not_started |
| CRE-42-xp-burst | 42 | `/features/celebration` | motion-still | not_started |
| CRE-59-streak-flame | 59 | `/tabs/goals/streaks` | illustration | not_started |
| CRE-71-badge-earned | 71 | `/tabs/me/achievements` | badge | not_started |
| CRE-71-badge-near-next | 71 | `/tabs/me/achievements` | badge | not_started |
| CRE-71-badge-hidden-locked | 71 | `/tabs/me/achievements` | badge | not_started |

## Session summary

- Accepted:
- Iterate:
- Deferred:
- Credit preflight (session total):

## Brief notes

_Add per-brief sections when the session starts._

## Completion gate

- [ ] Celebration feels premium and earned, not generic particles only
- [ ] Status → `session-closed`
