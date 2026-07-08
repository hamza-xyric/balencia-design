---
type: story
id: S12.3.1
title: AI-Drafted Roadmap Editing (Creation-Time)
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.3
feature_name: Per-Level Task Editor
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.3.1: AI-Drafted Roadmap Editing (Creation-Time)

## User Story

**As a** Holistic Health Seeker (P1) working a career goal alongside their health goals,
**I want to** edit the AI-generated tasks for my roadmap before it's saved — rename them, adjust time estimates, add or remove tasks,
**So that** the plan actually matches my real life instead of a generic template I have to follow verbatim.

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
- When a goal is AI-generated (`career.ai.generate_roadmap`), the returned `levels[]` with nested `tasks[]` is rendered as an editable **draft** in the client — nothing persists to the database until the user explicitly confirms
- Light mode: inline edit on the goal card — tap a task to rename, change due date, or mark it optional; no level-reassignment UI
- Deep mode: full task editor — reassign a task to a different level, set `requires_evidence`, bulk-create multiple tasks at once, adjust XP reward, set task type (research/project/application/etc.)
- Confirming the draft calls `career.goal.create` with the edited `levels`/`tasks` payload, persisting levels + tasks together in one transaction — consistent with the platform-wide AI-action-confirmation model

**Draft Lifecycle:**

| Phase | Action | Persistence |
|-------|--------|-------------|
| 1. Generate | `career.ai.generate_roadmap` returns levels + nested tasks | None — held client-side only |
| 2. Edit | User renames, re-estimates, deletes, adds tasks per level | None — still client-side draft |
| 3. Confirm | User taps save/confirm | `career.goal.create` persists levels + tasks together in one transaction |

**Field-Level Editing Available in Draft:**

| Field | Editable | Notes |
|-------|----------|-------|
| Task title | Yes | Both modes |
| Due date | Yes | Both modes |
| Optional flag | Yes | Light mode |
| Level assignment | Yes | Deep mode only |
| `requires_evidence` | Yes | Deep mode only |
| XP reward | Yes | Deep mode only |
| Task type | Yes | Deep mode only |

---

## Acceptance Criteria

```gherkin
Scenario: AI-drafted roadmap held client-side until confirmed
  Given a user completes the AI roadmap wizard
  When career.ai.generate_roadmap returns levels and tasks
  Then no database rows are created until the user explicitly confirms

Scenario: User edits a draft task before saving
  Given an AI-drafted task titled "Update LinkedIn profile"
  When the user renames it to "Update LinkedIn profile and add portfolio link" and changes the due date
  Then the edited values are reflected in the draft, still unpersisted

Scenario: Confirming the draft persists levels and tasks atomically
  Given a user has finished editing their AI-drafted roadmap
  When they confirm
  Then career.goal.create persists the goal, all 5 levels, and all tasks in a single transaction

Scenario: Level reassignment in Deep mode
  Given a draft task is initially assigned to Level 2
  When the user reassigns it to Level 3 in the Deep-mode editor
  Then the task's level_id updates in the draft before save, and both levels' projected progress reflect the change

Scenario: Evidence-required flag set at draft time
  Given a user marks a draft task as requires_evidence=true
  When the goal is confirmed and saved
  Then that task blocks auto-completion until evidence is attached (see S12.3.2)
```

---

## Success Metrics

- AI-drafted tasks edited before first save: 45%+ of goals (diff between AI draft and saved payload)
- Task edit success rate (no progress-math drift after edit): 100% (integration test assertion + prod error-rate monitoring)
- Bulk-create usage (vs. one-at-a-time) at goal-creation time: contributes to the 50%+ platform-wide bulk-create target (shared metric with S12.3.2)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Weekly plan / roadmap generation (AI) <8s | Draft payload validated server-side on confirm (client edits are not trusted blindly) | Draft data not persisted until confirm — no partial PII exposure window | Task edit controls keyboard-navigable, inline edit affordances have visible focus rings | Draft-then-confirm matches the platform-wide AI-action-confirmation model used across other domains |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1 (5-Level Progression — tasks must resolve to a valid level)
- **Related Stories:** S12.3.2 (in-plan editing continues after this draft is saved), S12.7.1 (SIA's `career.goal.create` confirmation card uses the identical service layer)
- **External Dependencies:** None

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Task created with no level_id | Zod validation at `career.task.create`/`career.goal.create` boundary | Reject with typed 4xx before hitting the service layer | "Every task needs a level. Choose one to continue." |
| Bulk-create partially fails mid-batch | Transaction wraps the full batch | Roll back entire batch on any single-task validation failure — no half-created batches | "Couldn't save this task list — nothing was created. Please check the details and retry." |
| AI roadmap returns malformed/incomplete task shape | Server-side validation on confirm payload | Reject confirm, surface which fields are invalid | "Some tasks in your plan need more detail before saving." |

---

## Open Questions

- None outstanding for the Must-Have build.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] AI-drafted roadmap tasks are editable client-side before the goal is saved (nothing persists prematurely)
- [x] Confirming the draft persists levels + tasks together in one transaction
- [x] `requires_evidence` flag settable at draft time and enforced post-save
- [x] Editing a task's level_id in the draft recalculates both source and destination level's projected progress
- [x] Integration tests cover the full draft → edit → confirm → persisted-goal flow

---

*Story S12.3.1 | Epic E12 | Product: Balencia Platform*
