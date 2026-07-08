---
type: story
id: S12.6.1
title: Obstacle Plan & Root-Cause Capture
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.6
feature_name: Career Obstacle Plan + Resources
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.6.1: Obstacle Plan & Root-Cause Capture

## User Story

**As a** Holistic Health Seeker (P1) whose career goal has stalled for over a week,
**I want to** get help identifying what's actually blocking me — not just be nagged to "do more" — and get pointed to a specific next step or resource,
**So that** a stall doesn't quietly turn into an abandoned goal.

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
- Light mode: single "What's blocking you?" prompt with 3-4 tap-to-select common blockers (time, confidence, unclear next step, external dependency), producing one suggested micro-action
- Deep mode: full Obstacle Plan editor on `/obstacles` — structured root-cause entry, linked resources, a mini-action-plan with its own checklist, and historical obstacle log ("you've hit this blocker type twice before")

**Technical Foundation:**
- Obstacle entries link to a specific `goal_id` (and optionally `task_id`/`level_id`) so the plan is always scoped to a concrete blocker, not a vague "career is hard" note
- Root-cause categories draw from the same risk-signal taxonomy the AI Coach Career Tools use for risk detection: `time`, `confidence`, `unclear_next_step`, `external_dependency`, `skill_gap`, `overcommitment`, `deadline_pressure` — no signal divergence between UI and SIA reasoning
- **Resources:** curated links tied to obstacle category and, where available, the goal's target role/focus areas (e.g., a "confidence" blocker on an interview-prep goal surfaces interview-prep resources, not generic productivity articles)
- The `/obstacles` page reads the same `risk_status` field (`on_track | slightly_behind | at_risk`) that SIA's `career.ai.review_progress` tool returns — the UI and AI coach never disagree about whether a goal is at risk

**Trigger Detection:**

| Trigger | Source |
|---------|--------|
| Momentum "slipping" for 2+ consecutive weeks | F12.5 Momentum Chart |
| No task completed in N days (risk taxonomy: `no_progress`) | Weekly scan |
| User self-initiates via "What's blocking you?" prompt | Direct user action |

**Obstacle Plan Lifecycle (High-Level):**
```
1. Trigger Detection (momentum/no-progress/self-initiated)
2. Root-Cause Capture: user selects blocker category, links to goal_id (+ optional task_id/level_id)
3. Resource + Action Matching: lookup curated resources for (blocker_category, focus_areas, target_role);
   generate a micro-action suggestion (smallest next step, not a full re-plan)
4. Plan Persistence: save obstacle entry with resources + suggested action; risk_status recalculated
   and synced with career.ai.review_progress
5. Resolution Tracking: task completed within 7 days → mark "resolved", log for recurring-pattern
   analysis; else surface again at next weekly review
```

---

## Acceptance Criteria

```gherkin
Scenario: Obstacle Plan reachable and goal-scoped
  Given a user navigates to /obstacles for a specific goal
  When the page loads
  Then it is scoped to that goal_id and shows the current risk_status

Scenario: Root-cause capture in Light mode
  Given a user taps "What's blocking you?"
  When they select "unclear_next_step"
  Then a single suggested micro-action is produced, scoped to that blocker category

Scenario: Curated resources matched to blocker + goal context
  Given a user selects "confidence" as the blocker on an interview-prep goal
  When resources are matched
  Then interview-prep-specific resources are surfaced, not generic productivity content

Scenario: risk_status matches SIA's live tool output
  Given a goal's risk_status is "at_risk" per career.ai.review_progress
  When the /obstacles page loads for that goal
  Then it displays "at_risk", matching the live tool response exactly (cache invalidated on load)

Scenario: No curated resources available yet
  Given a blocker category has no curated resources
  When the resource panel is requested
  Then a generic action prompt is shown instead of an empty resources panel: "No curated resources yet for this — here's a quick next step to try instead."

Scenario: Obstacle resolution tracked
  Given an obstacle plan was created 3 days ago
  When a task is completed within 7 days of plan creation
  Then the obstacle plan is marked "resolved" and logged for recurring-pattern analysis

Scenario: Obstacle Plan retained after goal archival
  Given a goal with an open obstacle plan transitions to status='archived'
  When the obstacle plan is viewed
  Then it is retained read-only for history, not deleted: "This goal is archived — the obstacle history is kept for reference."
```

---

## Success Metrics

- Obstacle Plan engagement among "slipping" momentum users: 50%+ visit `/obstacles` within 7 days
- Obstacle Plan → resumed activity (task completed within 7 days of plan creation): 45%+
- Resource click-through rate: 25%+
- Recurring-blocker detection accuracy (user agrees "yes, this again"): 70%+

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `/obstacles` page risk_status always live-refetched on load, never stale-cached | Obstacle entries scoped to authenticated `user_id` + goal ownership | Blocker descriptions/root-cause notes are sensitive career/emotional context, encrypted at rest | Blocker selection chips are tap-targets ≥44x44pt with text labels, not icon-only | Shares risk taxonomy and `risk_status` contract exactly with F12.7 SIA tools — no parallel definitions |

---

## Dependencies

- **Prerequisite Stories:** S12.2.1/S12.2.2 (no-progress/stale-task signals originate here), S12.5.2 (momentum state is the primary automated trigger)
- **Related Stories:** S12.6.2 (badge evaluation runs alongside obstacle resolution), S12.7.1/S12.7.2 (SIA shares the risk taxonomy and `risk_status` contract)
- **External Dependencies:** None beyond existing goal/task/progress tables

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Obstacle created with no linked goal | Validation at obstacle-creation boundary | Reject — every obstacle must scope to a goal | "Select which goal this is blocking before saving." |
| User selects a blocker category with no curated resources yet | Resource lookup returns empty set | Fall back to a generic action prompt | "No curated resources yet for this — here's a quick next step to try instead." |
| Risk status disagreement between UI cache and live SIA read | Stale client cache vs. fresh `career.ai.review_progress` call | Always defer to the live tool response; invalidate cache on page load | Silent — page refetches risk status on load |
| Obstacle Plan created but goal is later archived | Goal status transitions to `archived` while an open obstacle plan exists | Obstacle plan retained (read-only) for history, not deleted | "This goal is archived — the obstacle history is kept for reference." |

---

## Open Questions

- Recurring-blocker pattern detection *across multiple goals* (cross-goal obstacle history) is **not verified built** — single-goal obstacle history exists and is confirmed; cross-goal pattern surfacing is unconfirmed and out of this story's scope.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] `/obstacles` page reachable and scoped to a specific goal
- [x] Obstacle entries link to goal_id and optionally task_id/level_id
- [x] Root-cause categories align with the risk-detection taxonomy used by AI Coach tools
- [x] Curated resources tied to obstacle category + goal focus areas, not shown generically
- [x] `risk_status` shown on the Obstacle Plan page matches what `career.ai.review_progress` returns to SIA
- [x] Contract test enforces UI/SIA risk_status agreement
- [x] Integration tests cover the full trigger → capture → resource-match → persistence → resolution lifecycle

---

*Story S12.6.1 | Epic E12 | Product: Balencia Platform*
