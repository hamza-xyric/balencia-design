---
type: story
id: S12.2.2
title: Weekly Progress Scoring & Focus Time Logging
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.2
feature_name: Weekly Execution Engine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.2.2: Weekly Progress Scoring & Focus Time Logging

## User Story

**As a** Busy Professional (P2),
**I want to** see my weekly completion score and log focus time against my career tasks,
**So that** I can see whether I'm actually being consistent this week compared to last week, not just whether I "felt busy."

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**User Experience:**
- Weekly scoring reads `progress_events` for the week's date range and computes `tasks_completed / tasks_total`, live on read (not cached), so the number is never stale mid-week
- `focus_minutes_this_week` is computed from `career.progress.log_focus_time` entries and attributed to an `activity_type` (learning, project, application, interview, networking, resume, portfolio)
- Streak counters (daily career streak, weekly career streak) update alongside the weekly score
- These are the exact numbers SIA reports back in conversation ("You completed 5/7 tasks this week, up from 3/7 last week")

**API Surface:**

| Endpoint | Purpose |
|----------|---------|
| `GET /career/progress/overview` | Cross-goal progress overview |
| `GET /career/progress/weekly` | Current week's completion + focus-time breakdown |
| `GET /career/progress/goals/:goalId` | Per-goal progress detail |
| `POST /career/progress/focus-time` | Logs focus minutes against a task/activity_type |

**Focus Time Logging Rules:**
- Minutes attribute to exactly one `activity_type` per log entry
- Cannot be logged against a `completed` or `archived` task — must target an active task
- Accumulates into `career_tasks.actual_minutes` for comparison against `estimated_minutes`

**Weekly Close Behavior:**
- Completion ratio compared to prior week to derive momentum direction (up/down/flat) — feeds F12.5 Career Analytics
- Unresolved tasks either carry forward (S12.2.1) or flag for Obstacle Plan review (F12.6)

---

## Acceptance Criteria

```gherkin
Scenario: Weekly progress computed live, not cached
  Given a user completes a task mid-week
  When they immediately request career.progress.weekly
  Then the returned completion ratio reflects the just-completed task without requiring a cache refresh

Scenario: Focus time attributed to activity_type
  Given a user logs 45 minutes against a "resume" task
  When career.progress.log_focus_time is called with activity_type='resume'
  Then actual_minutes accumulates on the task and the 45 minutes appear under the "resume" activity_type in the weekly breakdown

Scenario: Focus time rejected against completed task
  Given a task's status is 'completed'
  When a user attempts to log focus time against it
  Then the request is rejected with "This task is already complete — log time against your current task instead."

Scenario: Weekly completion feeds momentum direction
  Given last week's completion ratio was 3/7 and this week's is 5/7
  When the week closes
  Then the momentum direction is computed as "up" and made available to F12.5 Career Analytics

Scenario: Task completion recalculates goal and level progress in one transaction
  Given a task belonging to Level 2 of a goal is marked complete
  When the completion is processed
  Then progress_events insert, Level 2's task-completion ratio, and the goal's progress_percentage all update atomically — no partial-write drift
```

---

## Success Metrics

- Weekly task completion rate: 60%+ average across active goals
- Weekly active career users: 35%+
- Weekly plan acceptance (AI-generated plan saved as-is or with minor edits): 40%+
- Focus-time logging adoption among active goals: tracked via `career.progress.log_focus_time` invocation rate (no fixed target set in source PRD)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Task completion → progress/level recalculation <500ms | Progress reads/writes scoped to authenticated `user_id` | Focus-time activity types are career-context data, not shared cross-user | Weekly counter announced via `aria-live` on update | Weekly-granularity signal designed for direct correlation input to E08 Cross-Domain Intelligence |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1 (5-Level Progression — level rollup target), S12.2.1 (source of the tasks being scored)
- **Related Stories:** S12.5.1/S12.5.2 (consistency heatmap and momentum chart consume this weekly series), S12.7.1 (SIA reports these exact numbers)
- **External Dependencies:** None beyond existing `progress_events` infrastructure

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Focus time logged against completed/archived task | `career.progress.log_focus_time` targets non-active task | Reject with typed error | "This task is already complete — log time against your current task instead." |
| Task completed twice (double-submit) | Duplicate `career.task.complete` call for same task_id within short window | Idempotency check on task status transition | Silent — second call is a no-op, no duplicate XP |
| Week has zero activity | Zero `progress_events` rows for the week | Weekly score renders as 0/total, not an error state | "No activity logged yet this week." |

---

## Open Questions

- None outstanding for the Must-Have build. Automated AI weekly review (end-of-week summary + next-week auto-draft) is explicitly **not verified built** and is tracked separately as a Should-Have roadmap candidate (extension of `career.ai.review_progress`), not part of this story's scope.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] `career.progress.weekly` and `career.progress.overview` return real completion counts, not placeholders
- [x] Focus time logging attributes minutes to `activity_type` (learning/project/application/interview/networking/resume/portfolio)
- [x] Task completion recalculates goal progress and level progress in the same transaction
- [x] Task reopen supported and reverses XP/progress deltas cleanly
- [x] Unit tests cover progress-percentage rollup math including reopen/reverse paths
- [x] Integration tests assert no double-award on edge cases (reopen-then-recomplete)

---

*Story S12.2.2 | Epic E12 | Product: Balencia Platform*
