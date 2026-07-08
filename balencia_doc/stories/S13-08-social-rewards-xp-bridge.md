---
type: story
id: S13.4.1
title: Social Rewards & XP Bridge
epic: E13
epic_name: Social Growth OS
feature: F13.4
feature_name: Rewards & Gamification Bridge
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.4.1: Social Rewards & XP Bridge

## User Story

**As a** Busy Professional,
**I want** completing a daily pledge or joining a pod to visibly and immediately reward me — XP, an occasional bonus drop, and a small moment of social recognition,
**So that** consistency feels good in the moment, not just in a monthly report.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

This story resurrects two tables the audit found sitting dead (`variable_rewards`, `daily_pledges`) into live mechanics with their first real triggers.

**Canonical XP ledger:** `gamification.service.ts` → `awardXP()` — every social-triggered reward funnels through this single path, writing to `user_xp_transactions` (`server/src/database/tables/24-xp-transactions.sql`). No parallel XP writers exist.

**Variable-reward engine:** `reward-economy.service.ts` (`RewardEconomyService`, "Wave 3 of the Social Growth OS — resurrects the dead `variable_rewards` and `daily_pledges` tables into working mechanics"). Weighted drop pool: `bonus_xp` 50%/25% split, `streak_freeze` 15%, `badge` 10%, at `DROP_PROBABILITY = 0.15`.

**Social trigger points (verified live callers):**

| Trigger | Service | XP | Social/Reward Effect |
|---|---|---|---|
| Pledge completed | `reward-economy.service.ts:completePledge()` | +10 XP (`bonus`) | Publishes `pledge` feed event + rolls variable reward (`rollVariableReward('pledge_completed')`) — its first real trigger, so `/rewards/drops` finally populates |
| Referral redeemed | `referral.service.ts:redeem()` | +100 XP both parties (`bonus`) | `referrals` table updated (`status`, `reward_granted`) |
| Pod joined | `group-formation.service.ts` | — | `join_pod` feed event (social proof) |
| Tier promotion | `community-intelligence.service.ts` | — | `tier_promotion` feed event |
| Streak milestone | `streak.service.ts` | XP via `awardXP` | `streak_tier` feed event |
| Achievement unlocked | `achievement-check.job.ts` | XP via `awardXP` | `achievement` feed event |
| Reflection/journal saved | `journal.controller.ts` | — | `rollVariableReward('reflection_saved')` |

**Tables:** `variable_rewards` (id, user_id, reward_type, reward_value JSONB, trigger_event, probability, created_at), `daily_pledges` (pledge CRUD), `referrals` (referrer_id, referee_id, status, reward_granted), `user_xp_transactions` (canonical ledger, `source_type` includes `bonus`/`streak`/`achievement`).

**Pledge completion process (high-level):**
```
1. Validate pledge belongs to requesting user and is not already completed
2. UPDATE daily_pledges SET status='completed', completed_at=NOW()
3. gamificationService.awardXP(userId, 'bonus', 10, pledgeId, 'Pledge completed')
4. socialFeedService.publish(userId, { eventType: 'pledge', visibility: 'friends', payload: { title } })
5. rewardEconomyService.rollVariableReward(userId, 'pledge_completed')
   -> weighted random draw at DROP_PROBABILITY
   -> IF hit: INSERT variable_rewards, apply effect
6. Return combined result to client for the completion toast
```

---

## Acceptance Criteria

```gherkin
Scenario: Pledge completion atomically rewards
  Given a user completes a daily pledge
  Then daily_pledges is updated to status='completed'
  And exactly one awardXP('bonus', 10) call is made through the canonical path
  And a 'pledge' feed event is published
  And rollVariableReward('pledge_completed') is invoked

Scenario: No parallel XP writers
  Given any social trigger point (pledge, referral, streak, achievement)
  Then XP is awarded exclusively through gamification.service.ts:awardXP()
  And no other code path writes directly to user_xp_transactions for a social trigger

Scenario: Referral redemption grants XP once
  Given a referral code is redeemed
  Then both referrer and referee receive +100 XP exactly once
  And a second redemption attempt of the same code is rejected

Scenario: Referral self-redemption blocked
  Given referrer_id equals referee_id
  When redemption is attempted
  Then it is rejected before any XP grant: "You can't refer yourself."

Scenario: Variable reward drops are queryable
  Given a user has received at least one variable reward drop
  When they view /rewards/drops
  Then the drop is listed with its trigger-event provenance visible

Scenario: No double-reward on retry
  Given a pledge-completion request is retried/replayed with the same triggering event id
  Then no second XP award or duplicate feed event occurs
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pledge completion rate | 60% of created daily pledges completed | `daily_pledges` completion ratio |
| Variable-reward drop engagement | 40% of users who receive a drop view `/rewards/drops` within 24h | Page-view correlation |
| Referral conversion | 15% of sent referral codes redeemed within 14 days | `referrals.status` funnel |
| Reward-to-social latency | Feed event published within 2s of triggering action | Job/service instrumentation |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Reward-to-social latency <2s | Referral redemption idempotent via unique constraint | XP/reward events visible only to the user and their pod/friends per feed visibility | Toast notifications respect reduced-motion | Drop probability/tier weights are configuration, documented in-code, not scattered magic numbers |
| No double-reward on retry (idempotent per triggering event id) | Self-redemption blocked server-side | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.3.1 (feed publish target for reward-bearing actions)
- **Related Stories:** S13.1.1 (pod-join trigger source), S13.2.1 (`pledgeRatio` reputation signal shares this completion data)
- **External Dependencies:** `gamification.service.ts` (pre-existing canonical XP ledger)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Pledge completion partially fails (XP awarded, feed publish fails) | Feed write throws after XP commit | XP stands (already committed), feed publish retried async, never silently rolled back | User still sees XP toast; feed item may appear with slight delay |
| Referral code redeemed twice | Unique constraint on `referrals` redemption | Second attempt no-ops, no double XP | "This invite has already been used." |
| Variable reward roll fails (RNG/DB error) | Exception in `rollVariableReward` | Log and skip — pledge completion itself still succeeds | No user-facing error; drop simply doesn't occur that time |
| Referral self-redemption attempt | `referrer_id === referee_id` check | Reject before XP grant | "You can't refer yourself." |

---

## Open Questions

- None outstanding — reward bridge is fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Single canonical XP path (`awardXP()`) verified — no parallel writers found across all social triggers
- [x] Pledge completion atomicity (XP + feed + variable reward) tested, including partial-failure recovery
- [x] Referral idempotency and self-redemption block tested
- [x] `/rewards/drops` provenance display verified
- [x] Unit + integration tests green (server suite)

---

*Story S13.4.1 | Epic E13 | Product: Balencia Platform*
