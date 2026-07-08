---
type: story
id: S13.2.1
title: Reputation Score Computation & History
epic: E13
epic_name: Social Growth OS
feature: F13.2
feature_name: Reputation System
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.2.1: Reputation Score Computation & History

## User Story

**As an** Optimization Enthusiast,
**I want** my reputation score computed from real behavioral signals — not likes or vanity metrics — and recorded daily so I can see a real trend,
**So that** I can trust that my standing (and everyone else's) reflects genuine consistency and follow-through.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Score model** (`server/src/services/reputation.service.ts`):
```
SCORE_WEIGHTS = { consistency: 2, improvement: 1, pledgeAdherence: 20, mentorship: 10, kudosReceived: 0.5, kudosGiven: 0.25 }
MAX_ACCOUNTABILITY_SCORE = 999.99  (clamp)

Signals (30-day window):
  consistency      = active days in last 30 (from daily_user_scores)
  improvement      = week-over-week total_score delta, floored at 0
  pledgeRatio       = completion ratio from daily_pledges over 30 days
  mentorRoles       = count of growth_group_members rows (role='mentor', left_at IS NULL)
  kudosReceived/Given = from user_reputation (fed by activity_feed_reactions)

STATUS_TIERS: Novice(0) → Rising(40) → Committed(120) → Champion(250) → Legend(400)
eliteTier = min(5, floor(score / 200))
```

**Dual-DDL tables** — both `user_reputation` and the standalone `reputation_score_history` table follow the platform's dual-DDL pattern: the migration file (`20260605120000_social_growth_os.sql` base table, `20260707000000_reputation_score_history.sql` history) is the version-tracked source of truth, and `reputation.service.ts`'s `ensureTable()` / `ensureHistoryTable()` self-heal the byte-identical DDL at runtime.

```sql
reputation_score_history (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  accountability_score NUMERIC(6,2) DEFAULT 0,
  status_title VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, date)
)
```

Recomputed and appended to daily by `server/src/jobs/reputation-recompute.job.ts`.

**Daily recompute algorithm:**
```
1. Gather raw signals (30-day window) per user
2. unclampedScore = consistency*2 + improvement*1 + pledgeRatio*20
                    + mentorRoles*10 + kudosReceived*0.5 + kudosGiven*0.25
3. score = MIN(unclampedScore, 999.99)
   statusTitle = tier lookup; eliteTier = MIN(5, FLOOR(score / 200))
   mentorStatus = mentorRoles > 0 ? 'active'
                : (score >= 250 AND consistency >= 20) ? 'eligible'
                : 'none'
4. UPSERT user_reputation; INSERT reputation_score_history
5. mentorStatus='eligible' feeds identifyEmergingMentors() (S13.5.1)
   score feeds leaderboard ranking (with anti-cheat exclusion, S13.6.1)
```

---

## Acceptance Criteria

```gherkin
Scenario: Daily recompute writes score and history
  Given a user has activity in the last 30 days
  When reputation-recompute.job.ts runs for that user
  Then user_reputation is upserted with the new score, statusTitle, eliteTier, mentorStatus
  And exactly one reputation_score_history row is inserted for that user/date

Scenario: Score is clamped
  Given a user's raw weighted sum exceeds 999.99
  When the score is computed
  Then the persisted score is exactly 999.99, never higher

Scenario: Status tier is derived, never hand-set
  Given a user's score crosses a tier threshold (e.g. 250)
  When recompute runs
  Then statusTitle updates to the corresponding tier ("Champion") automatically
  And no code path allows statusTitle to be set independently of score

Scenario: Mentor eligibility gate
  Given a user has score >= 250 and consistency >= 20, with zero current mentorRoles
  When recompute runs
  Then mentorStatus is set to 'eligible'

Scenario: Zero signals
  Given a brand-new user with no activity, pledges, or kudos
  When recompute runs
  Then the score is 0 and statusTitle is "Novice"

Scenario: Recompute job failure for one user
  Given the recompute job throws for a specific user in a batch
  Then that user is skipped and logged
  And the rest of the batch continues processing
  And the user's stale score from the prior day remains visible (not blanked)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Tier progression | 30% of active users advance at least one status tier within 60 days | `status_title` transition tracking |
| Recompute completeness | 100% of active users recomputed within the nightly window | Job instrumentation |
| History continuity | 0 gaps in `reputation_score_history` for users active on a given day | Automated integrity check |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Daily batch recompute completes within nightly window, all active users | Score computation is server-only, no client-side scoring | Signals derive only from the user's own activity | N/A (background job) | NUMERIC(6,2) for score storage — never a float |
| `reputation_score_history` PK `(user_id, date)` prevents duplicate rows | `ensureTable()`/`ensureHistoryTable()` DDL is byte-identical to the migration file | | | |

---

## Dependencies

- **Prerequisite Stories:** None (foundational scoring layer)
- **Related Stories:** S13.2.2 (surfaces this data), S13.5.1 (consumes `mentorStatus`), S13.6.1 (leaderboard consumer)
- **External Dependencies:** `daily_user_scores` (E5/E6/E7 pillars), `daily_pledges`, `growth_group_members`, `activity_feed_reactions`

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| New user, no history yet | `reputation_score_history` empty for user | Show current score only | "Your trend chart will fill in as you build a track record." |
| All signals at zero | `unclampedScore = 0` | Show Novice tier with encouragement copy, not an error state | "Everyone starts here. Complete a pledge or join a pod to start earning reputation." |
| Recompute job failure | `reputation-recompute.job.ts` throws for a batch | Log, skip user for that day, retry next cycle | Silent — score simply doesn't update that day |
| Improvement signal would go negative (week-over-week regression) | `improvement = MAX(0, delta)` | Floored at 0, never subtracts from the score | N/A — score simply doesn't get a boost that week |
| Duplicate recompute triggered same day (e.g. job retry) | `reputation_score_history` PK conflict | Upsert semantics — history row for that date is updated, not duplicated | N/A |

---

## Open Questions

- None outstanding — score computation and history are fully shipped and always-on (no flag).

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Score clamping, tier derivation, and mentor-eligibility gate unit tested
- [x] Dual-DDL self-heal (`ensureTable`/`ensureHistoryTable`) verified byte-identical to migration
- [x] Recompute job failure isolation tested (one user's failure doesn't block the batch)
- [x] Integration test: recompute → history append → breakdown API consistency
- [x] Unit + integration tests green (server suite)

---

*Story S13.2.1 | Epic E13 | Product: Balencia Platform*
