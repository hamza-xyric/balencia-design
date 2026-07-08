---
type: story
id: S12.2.1
title: Weekly Task Scheduling, Cadence & Carryover
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.2
feature_name: Weekly Execution Engine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.2.1: Weekly Task Scheduling, Cadence & Carryover

## User Story

**As a** Busy Professional (P2),
**I want to** have my career goal broken into a manageable weekly plan of specific tasks,
**So that** I know exactly what to do this week without re-planning from scratch every Monday, and my consistency — not just my aspiration — is what gets tracked.

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
- Light mode: this week's task list with a single completion counter ("3/5 this week") and one-tap complete
- Deep mode: full weekly plan editor — reorder/reschedule tasks, adjust cadence, view carryover from prior weeks, see per-task time estimates vs. actual logged focus time
- Weekly plans generate manually or via `career.ai.generate_weekly_plan`, anchored to a `week_start` date and an `available_hours` budget
- `include_carryover_tasks` pulls forward anything left `todo` from the prior week rather than silently dropping it

**Data Model (`career_tasks`):**

| Field | Type/Values | Notes |
|-------|-------------|-------|
| `cadence` | `VARCHAR(20)`: `daily` \| `weekly` \| `biweekly` \| `one_time` | See known-bug note below |
| `due_date` | date | |
| `estimated_minutes` | integer | |
| `actual_minutes` | integer | accumulates via focus-time logging (S12.2.2) |
| `status` | `todo` \| `in_progress` \| `completed` \| `skipped` | |

**Known Production Gotcha — Cadence Column Overflow:**
LLM-generated weekly plans (`career.ai.generate_weekly_plan` / `career.ai.generate_roadmap`) occasionally returned verbose cadence strings (e.g., `"twice per week, mostly weekday evenings"`) instead of a short enum token, overflowing `career_tasks.cadence VARCHAR(20)` and failing the insert. **Fixed** via a `normalizeCadence()` clamp in the task-persistence path that maps free-text LLM output to the fixed cadence enum (falling back to `weekly` when unrecognized), plus migration `030000` to widen/backfill the column safely. This is the canonical example on this platform of AI-generated structured data needing a normalization boundary before touching a fixed-width column — same bug class as the `notification_type` enum drift fix elsewhere in the platform.

**Weekly Plan Generation Inputs:**

| Input | Required | Behavior if invalid |
|-------|----------|---------------------|
| `week_start` | Yes | Anchors the plan window |
| `available_hours` | Yes, must be > 0 | Rejected with "Add your available hours this week so I can build a realistic plan." |
| `include_carryover_tasks` | No (default true) | Pulls forward `todo` tasks from prior week |

---

## Acceptance Criteria

```gherkin
Scenario: Career tasks carry full scheduling metadata
  Given a career task is created
  When it is persisted
  Then it carries cadence, due_date, estimated_minutes, actual_minutes, and status

Scenario: Weekly plan generation with carryover
  Given a user has 2 incomplete 'todo' tasks from the prior week
  When a new weekly plan is generated with include_carryover_tasks=true
  Then those 2 tasks are merged into the new week's plan rather than dropped

Scenario: LLM cadence overflow is normalized
  Given career.ai.generate_weekly_plan returns cadence="twice per week, mostly weekday evenings"
  When the task is persisted
  Then normalizeCadence() clamps the value to a valid enum token (falling back to 'weekly' if unrecognized) and the insert succeeds

Scenario: Weekly plan rejected with zero available hours
  Given a user requests weekly plan generation with available_hours=0
  When the request is submitted
  Then generation is rejected with "Add your available hours this week so I can build a realistic plan."

Scenario: Task completion is idempotent
  Given a task is already status='completed'
  When career.task.complete is called again for the same task_id within a short window
  Then the second call is a no-op — no duplicate XP, no error surfaced to the user

Scenario: Stale carryover task flagged
  Given a task has carried over for 3+ consecutive weeks unresolved
  When the weekly scan runs
  Then the task is flagged for Obstacle Plan surfacing instead of silently re-carrying forever
```

---

## Success Metrics

- Weekly task completion rate: 60%+ average across active goals (`tasks_completed / tasks_total` per week)
- Weekly active career users (return to `/career` weekly): 35%+
- Carryover task resolution (not left stale 2+ weeks): 70%+
- Weekly plan acceptance (AI-generated plan saved as-is or with minor edits): 40%+

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Weekly plan generation (AI) <8s | Task writes scoped to authenticated `user_id` + goal ownership check | Task titles/descriptions treated as sensitive career data | Weekly task list keyboard-navigable, one-tap complete has 44x44pt target | Reuses the same weekly-cadence mental model as E5 Fitness workout scheduling |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1 (5-Level Progression — tasks resolve to a level)
- **Related Stories:** S12.2.2 (weekly scoring reads this story's task data), S12.3.2 (task editor manages the same `career_tasks` rows)
- **External Dependencies:** Migration `030000` (cadence column widen/backfill); E9 Data Integrations calendar/reminder infrastructure (Should-Have, not yet wired)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Cadence value exceeds VARCHAR(20) | Insert/update on `career_tasks.cadence` | `normalizeCadence()` clamps before write; migration `030000` backfills prior overflow rows | Silent — task saves with normalized cadence, no visible error |
| Weekly plan generated with zero available hours | `available_hours <= 0` in generation input | Reject generation, request valid hours | "Add your available hours this week so I can build a realistic plan." |
| Task completed twice (double-submit) | Duplicate `career.task.complete` call within short window | Idempotency check on task status transition | Silent — no duplicate XP |
| Carryover task never resolved (2+ weeks stale) | Age check during weekly scan | Flag for Obstacle Plan (F12.6) surfacing instead of endless re-carry | "This task has carried over 3 weeks. Want to break it down or drop it?" |

---

## Open Questions

- None outstanding for the Must-Have build.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Career tasks carry cadence, due_date, estimated_minutes, actual_minutes, and status
- [x] Weekly plan generation accepts week_start + available_hours and optionally carries over incomplete prior-week tasks
- [x] LLM-generated cadence values are normalized before persistence — overflow bug fixed via migration 030000
- [x] Task completion recalculates goal and level progress in the same transaction (no partial-write drift)
- [x] Task reopen (`career.task.reopen`) reverses XP/progress deltas cleanly
- [x] Unit tests cover `normalizeCadence()` across malformed LLM output shapes
- [x] Integration tests cover full weekly-plan generation with carryover

---

*Story S12.2.1 | Epic E12 | Product: Balencia Platform*
