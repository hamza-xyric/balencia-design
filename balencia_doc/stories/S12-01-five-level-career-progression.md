---
type: story
id: S12.1.1
title: 5-Level Career Progression System
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.1
feature_name: 5-Level Career Progression System
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.1.1: 5-Level Career Progression System

## User Story

**As an** Optimization Enthusiast (P3) working a structured career goal,
**I want to** have my career goal broken into clear, sequential levels with defined milestones,
**So that** I always know where I am in the journey and what "done" looks like for my current stage, instead of facing an open-ended goal with no sense of progress.

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

**User Experience:**
- Every career goal, whether manually created or AI-generated (`career.ai.generate_roadmap`), is decomposed into exactly 5 sequential levels: Clarity → Foundation → Practice → Execution → Outcome/Mastery
- Level *N+1* stays locked (`unlock_status = 'locked'`) until Level *N* reaches `completion_status = 'completed'` — no skipping ahead
- Light mode shows a single progress bar + current level badge on the goal card (e.g., "Level 3/5 — Practice and Projects, 52%")
- Deep mode shows the full level breakdown: per-level task list, XP reward, unlock rule, completion criteria, and a level-by-level timeline of entry/completion dates
- Level completion triggers a celebration event (badge, confetti, SIA message) and unlocks the next level
- AI-generated goals populate custom level titles/descriptions (e.g., "Product Management Foundation" instead of generic "Foundation") while preserving the 5-level / 20%-weight skeleton

**Default Level Template (applied per goal at creation):**

| Level | Name | Purpose | Progress Weight | XP Reward |
|---|---|---|---|---|
| 1 | Clarity | Define goal, target role, and roadmap | 20% | 200 |
| 2 | Foundation | Learn baseline skills, prepare resources | 20% | 400 |
| 3 | Practice | Build projects, practice, improve quality | 20% | 600 |
| 4 | Execution | Apply skills in real-world career actions | 20% | 800 |
| 5 | Outcome / Mastery | Achieve the result, plan next growth cycle | 20% | 1,000 |

**Data Model:**

| Field | Table | Notes |
|-------|-------|-------|
| `level_number` | `career_goal_levels` | 1-5, fixed sequence |
| `progress_weight` | `career_goal_levels` | Sums to 100% per goal; edit rejected if it wouldn't |
| `xp_reward` | `career_goal_levels` | Awarded exactly once, on first `completed` transition |
| `unlock_status` | `career_goal_levels` | `locked` \| `unlocked` |
| `completion_status` | `career_goal_levels` | `not_started` \| `in_progress` \| `completed` |
| `completion_source` | `career_goal_levels` | `task_progress` \| `ai_review` \| `manual_override` — retained for audit + SIA explanation |

**Behaviors:**
- Level 5 completion = goal completion, triggers a +2,000 XP goal-completion bonus and prompts "Create next 90-day growth plan" via SIA
- Levels are user-editable post-creation (F12.3) without breaking unlock ordering
- Idempotency guard on `progress_events` prevents duplicate XP if a level transitions `completed → completed` (e.g., via a reopened-task workflow)

---

## Acceptance Criteria

```gherkin
Scenario: Goal created with default 5-level structure
  Given a user creates a career goal manually
  When the goal is saved
  Then exactly 5 levels are created, each weighted 20%, matching the default template

Scenario: AI-generated goal preserves 5-level skeleton with custom titles
  Given a user completes the AI roadmap wizard
  When career.ai.generate_roadmap returns levels
  Then the saved goal has exactly 5 levels with custom titles/descriptions and the 20%-weight skeleton intact

Scenario: Level unlock ordering enforced
  Given a goal where Level 2's completion_status is not 'completed'
  When the system evaluates Level 3
  Then Level 3's unlock_status remains 'locked'

Scenario: Level completion via task progress
  Given all required tasks for a level are marked 'completed'
  When the last required task completes
  Then the level's completion_status becomes 'completed', completed_at is set, xp_reward is granted once, and the next level unlocks

Scenario: XP not double-awarded on re-completion
  Given a level is already 'completed'
  When a reopened-then-recompleted task re-triggers the level-completion check
  Then no duplicate xp_reward is granted (idempotency guard on progress_events)

Scenario: Level weight sum validation
  Given a user edits level progress_weight values
  When the new weights do not sum to 100%
  Then the edit is rejected and prior weights are retained

Scenario: Manual override with incomplete required tasks
  Given a level has incomplete required tasks
  When a user or coach attempts to mark it complete via manual override
  Then the system requires explicit confirmation and logs completion_source: manual_override

Scenario: Level 5 completion triggers goal completion
  Given Level 5's completion_status transitions to 'completed'
  When the transition is processed
  Then the goal is marked complete, a +2,000 XP bonus is granted, and SIA prompts a next-90-day growth plan
```

---

## Success Metrics

- Level 1 completion within 7 days of goal creation: 70%+ (measured via `career_goal_levels.completed_at` timestamps)
- Level completion within first month: 25%+ (cohort analysis)
- Users who understand their current level without asking SIA: 80%+ (post-launch UX survey)
- Level-unlock celebration engagement (badge view/interaction): 50%+ (client event tracking)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Task completion → level recalculation <500ms | Progress writes scoped to authenticated `user_id`, ownership-checked per goal | Career data (target role, employment context) treated as sensitive; encrypted at rest/in transit | Level badges/progress bars carry `aria-label` with numeric progress | Mirrors E5 Fitness level/XP/progression data shape — no new client pattern |

---

## Dependencies

- **Prerequisite Stories:** None (structural entry point for the Career pillar)
- **Related Stories:** S12.2.1 (task completion drives level completion), S12.3.1/S12.3.2 (levels are user-editable), S12.7.1 (level names surfaced in SIA chat)
- **External Dependencies:** E5 Fitness Pillar (source of the level/XP/progression pattern being mirrored)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Level marked complete with unmet required tasks | Require explicit confirmation, log `completion_source: manual_override`; message: "Some required tasks aren't done yet. Complete anyway?" |
| XP double-award on level re-completion | Idempotency guard on `progress_events` insert per (goal_id, level_id, event_type); silent no-op, no duplicate XP |
| Level weight sum ≠ 100% | Reject edit, keep prior weights; message: "Level weights must add up to 100%. Adjust and try again." |
| AI roadmap returns fewer/more than 5 levels | Normalize/pad to 5 levels before persisting; silent — user always sees a standard 5-level goal |

---

## Open Questions

- None outstanding for the Must-Have build. One deliberate scope boundary carried forward from the PRD: AI-generated *custom* level counts (not exactly 5) are explicitly deferred — the system is hard-coded to 5 levels per goal for structural parity with Fitness/Nutrition, by design, not an oversight.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Error scenarios handled gracefully
- [x] Every career goal created with exactly 5 levels, default-weighted 20% each
- [x] AI-generated goals populate custom level titles/descriptions while preserving the 5-level structure
- [x] Level N+1 stays locked until Level N is marked completed
- [x] Level completion source (`task_progress` / `ai_review` / `manual_override`) is recorded
- [x] XP reward granted exactly once per level, on first transition into `completed`
- [x] Level progress bar/badge render in Light mode; full level list renders in Deep mode
- [x] Levels are user-editable post-creation without breaking unlock ordering
- [x] Unit tests cover level unlock/completion transition logic
- [x] Integration tests cover goal-creation → level persistence in one transaction

---

*Story S12.1.1 | Epic E12 | Product: Balencia Platform*
