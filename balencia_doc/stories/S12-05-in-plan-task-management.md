---
type: story
id: S12.3.2
title: In-Plan Task Management & Evidence Gating
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.3
feature_name: Per-Level Task Editor
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.3.2: In-Plan Task Management & Evidence Gating

## User Story

**As a** Holistic Health Seeker (P1),
**I want to** edit, add, remove, and reopen tasks on an already-saved career goal as circumstances change,
**So that** my plan stays accurate over time instead of drifting away from what I'm actually doing.

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
- Tasks live in `career_tasks` with a required `level_id` foreign key — a task cannot exist without belonging to exactly one level of exactly one goal
- `career.task.update` supports partial updates (title, due_date, estimated_minutes, priority, status)
- `career.task.create` adds a single task to an existing level; `career.task.bulk_create` adds many at once (used by weekly-plan generation and roadmap regeneration)
- Editing a task after completion (`career.task.reopen`) reverses its `progress_events` contribution before allowing further edits, so progress math never drifts out of sync with the visible task list
- `requires_evidence` flag ties a task to the Evidence system (`career.evidence.upload`) — tasks requiring proof cannot auto-complete without an attached evidence record

**Tool Surface:**

| Tool | Behavior |
|------|----------|
| `career.task.create` | Adds a single task to an existing level |
| `career.task.update` | Partial field update (no full payload required) |
| `career.task.bulk_create` | Adds many tasks in one transactional batch |
| `career.task.complete` | Marks complete, blocked if `requires_evidence` and no linked evidence |
| `career.task.reopen` | Reverses XP/progress deltas, returns task to `in_progress`/`todo` and editable |
| `career.evidence.upload` | Attaches proof (resume, link, file) to a `requires_evidence` task |

**Level Reassignment:**
Reassigning a task's `level_id` to a different level within the same goal recalculates both the source and destination level's progress. Cross-goal reassignment is rejected outright — tasks cannot move between goals.

---

## Acceptance Criteria

```gherkin
Scenario: Partial task update
  Given an existing task with title "Draft cover letter"
  When career.task.update is called with only { due_date: "2026-07-15" }
  Then only the due_date field changes; all other fields remain untouched

Scenario: Bulk create scoped to multiple levels
  Given a regenerated weekly plan produces 6 new tasks across Level 2 and Level 3
  When career.task.bulk_create is called with all 6 tasks
  Then all 6 persist in a single transaction, correctly scoped to their respective levels

Scenario: Evidence-required task blocks completion
  Given a task has requires_evidence=true and no linked career_evidence row
  When career.task.complete is called
  Then completion is blocked and the evidence upload prompt is surfaced: "Attach proof (resume, link, or file) to complete this task."

Scenario: Reopen reverses progress before allowing edits
  Given a completed task contributed +50 XP and a level progress delta
  When career.task.reopen is called
  Then the XP and progress deltas are reversed, the task returns to 'in_progress' or 'todo', and it becomes editable again

Scenario: Level reassignment recalculates both levels
  Given a task currently assigned to Level 2 is reassigned to Level 3 via career.task.update
  When the update is processed
  Then Level 2's progress recalculates (task removed) and Level 3's progress recalculates (task added)

Scenario: Cross-goal reassignment rejected
  Given a task belongs to Goal A
  When an update attempts to set level_id to a level belonging to Goal B
  Then the request is rejected: "Tasks can only move between levels within the same goal."
```

---

## Success Metrics

- Task edit success rate (no progress-math drift after edit): 100% (integration test assertion + prod error-rate monitoring)
- Users who add a custom task within first 2 weeks: 30%+ (`career.task.create` with `created_by != 'ai'`)
- Bulk-create usage (vs. one-at-a-time): 50%+ of task creation volume

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Task completion → progress/level recalculation <500ms | `level_id` cross-goal checks enforced server-side, not just client-side | Evidence files (resumes, links, certificates) follow the platform's expiring-presigned-URL object-storage pattern | Task list supports keyboard reordering/editing where UI is present | `requires_evidence` reuses the existing evidence/object-storage integration pattern, no new storage system |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1 (5-Level Progression — tasks must resolve to a valid level), S12.3.1 (creation-time draft is the source of most initial tasks)
- **Related Stories:** S12.2.1/S12.2.2 (weekly engine schedules and scores these same tasks), S12.6.1 (Obstacle Plan reads stale/edited-task signals)
- **External Dependencies:** Object storage integration for evidence files (resumes, portfolio links, certificates)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Task created with no level_id | Zod validation at `career.task.create` boundary | Reject with typed 4xx before hitting the service layer | "Every task needs a level. Choose one to continue." |
| Task reassigned to a level in a different goal | Cross-goal level_id check on update | Reject — tasks cannot move between goals | "Tasks can only move between levels within the same goal." |
| Bulk-create partially fails mid-batch | Transaction wraps the full batch | Roll back entire batch on any single-task validation failure | "Couldn't save this task list — nothing was created. Please check the details and retry." |
| Evidence-required task marked complete without evidence | `requires_evidence=true` + no linked `career_evidence` row | Block completion, surface evidence upload prompt | "Attach proof (resume, link, or file) to complete this task." |
| Task edited while a bulk weekly-plan generation is in flight | Optimistic concurrency check on task `updated_at` | Last-write-wins with conflict surfaced to user for review | "This task changed while your weekly plan was generating — review before confirming." |

---

## Open Questions

- Drag-and-drop task reordering across levels in the Deep-mode editor: task ordering exists in the data model, but the reorder UX affordance is **not confirmed built** — needs a direct UI audit before being counted as shipped. Not treated as a blocker for this story's "Done" status since the underlying CRUD/evidence-gating behavior (the story's core scope) is verified.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Tasks require a level_id and cannot be created without one
- [x] `career.task.update` supports partial field updates without requiring the full task payload
- [x] `career.task.bulk_create` accepts multiple tasks scoped to one or more levels in a single call
- [x] `career.task.reopen` reverses XP/progress deltas before allowing further edits
- [x] `requires_evidence` tasks block auto-completion until evidence is attached
- [x] Editing a task's level_id recalculates both source and destination level's progress
- [ ] Drag-and-drop cross-level reordering UX — not verified built, tracked as open question above
- [x] Integration tests cover bulk-create batch rollback on partial failure

---

*Story S12.3.2 | Epic E12 | Product: Balencia Platform*
