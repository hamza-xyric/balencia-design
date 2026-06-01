# CP-07 — P1 domain credibility

- Status: `not started`
- Package: mixed (`onboarding-motion`, `sia-identity`, `domain-content`, `media-content`, `gamification`)
- Session cap: 6 asset briefs per session
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-07`

**Note:** 38 screens in registry. Split into themed sub-sessions (guest/plan, goals, me, domains, social, intelligence, paywall).

## Screens in scope

| ID | Screen | Route |
| --- | --- | --- |
| 06 | Guest preview | `/auth/guest-preview` |
| 08 | Initial plan | `/auth/initial-plan` |
| 15 | Create mission | `/tabs/goals/create` |
| 16 | Life areas overview | `/tabs/me/life-areas` |
| 17 | Me main | `/tabs/me` |
| 18 | Explore section | `/tabs/me/explore` |
| 19 | RPG character | `/tabs/me/rpg` |
| 20 | Personal wiki | `/tabs/me/personal-wiki` |
| 23 | Subscription and billing | `/tabs/me/subscription` |
| 26 | Fitness dashboard | `/domains/fitness` |
| 27 | Workout detail | `/domains/workout` |
| 28 | Nutrition dashboard | `/domains/nutrition` |
| 29 | Meal detail | `/domains/meal` |
| 30 | Finance dashboard | `/domains/finance` |
| 31 | Budget detail | `/domains/budget` |
| 33 | Relationships dashboard | `/domains/relationships` |
| 34 | Spirituality dashboard | `/domains/spirituality` |
| 35 | Learning dashboard | `/domains/learning` |
| 36 | Creativity dashboard | `/domains/creativity` |
| 39 | Leaderboard | `/features/leaderboard` |
| 40 | Community | `/features/community` |
| 43 | Paywall | `/features/paywall` |
| 46 | Accountability | `/features/accountability` |
| 47 | Competitions | `/features/competitions` |
| 48 | Intelligence dashboard | `/features/intelligence` |
| 53 | Breathing exercises | `/features/breathing` |
| 54 | Meditation | `/features/meditation` |
| 73 | Mission journal | `/tabs/goals/journal` |
| 74 | Conversations hub | `/tabs/sia/conversations` |
| 75 | Direct chat | `/tabs/sia/direct` |
| 76 | Group chat | `/tabs/sia/group` |
| 77 | Message actions | `/tabs/sia/message-actions` |
| 78 | Reports center | `/features/reports` |
| 79 | Call summary | `/tabs/sia/call-summary` |
| 82 | Accountability contract | `/features/accountability-contract` |
| 83 | Social buddy profile | `/features/social-buddy` |

## Decision gates

- [x] **CQ04** resolved: reports **in-app only** — no PDF/export visuals on 78
- [x] **CQ06** resolved: guest preview (06) = lightweight preview/demo only
- [x] **CQ07–CQ08** resolved: social (39, 40, 46, 47) = friends/private-first, locked previews, self-only/private challenges
- [x] **CQ11** resolved: spirituality (34) = belief-adaptive configured + unconfigured states
- [x] **CQ12** resolved: paywall (43) = IAP-adjacent visual states without live billing
- [x] **CQ03** photography source mix resolved: best asset wins by surface; sensitive people/body/trust requires real/licensed/owned or non-identifiable demo fixtures

## Suggested sub-sessions

| Session | Screen IDs | Theme |
| --- | --- | --- |
| CP-07a | 06, 08, 15, 43 | Guest (lightweight demo only), plan, paywall (IAP states) |
| CP-07b | 16, 17, 18, 19, 20, 23 | Me identity |
| CP-07c | 26, 27, 28, 29, 30, 31 | Fitness, nutrition, finance |
| CP-07d | 33, 34, 35, 36, 53, 54 | Relationships, spirituality, learning, creativity, mindfulness |
| CP-07e | 39, 40, 46, 47, 48 | Social (private-first) and intelligence |
| CP-07f | 73, 74, 75, 76, 77, 79, 82, 83 | Goals journal, chat suite, contracts |

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| _Add up to 6 per sub-session_ |  |  |  | not_started |

## Session summary

- Sub-session label:
- Accepted:
- Iterate:
- Deferred:
- Credit preflight (session total):

## Brief notes

_Add per-brief sections when a sub-session starts._

## Completion gate

- [ ] All P1 screens in scope have at least one accepted asset or documented deferral
- [ ] Status → `session-closed` per sub-session (batch may stay `in_progress` until all sub-sessions done)
