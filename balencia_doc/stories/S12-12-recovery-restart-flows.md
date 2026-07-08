---
type: story
id: S12.7.2
title: Recovery/Restart Flows & Live Obstacle Plan Access via SIA
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.7
feature_name: AI Coach Career Tools (LangGraph Domain)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.7.2: Recovery/Restart Flows & Live Obstacle Plan Access via SIA

## User Story

**As a** Busy Professional (P2) whose career goal has stalled,
**I want to** ask SIA "restart my stalled portfolio goal" and get a scaled-down, achievable re-entry point,
**So that** I can get moving again without the intimidation of picking back up a full weekly plan cold.

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

**User Experience:**
- For goals flagged `at_risk` or with no progress in N days, SIA can offer a "restart" flow — a scaled-down, single-task re-entry point rather than expecting the user to pick back up a full weekly plan cold
- SIA can read and help populate a goal's Obstacle Plan mid-conversation, sharing the exact `risk_status` contract with F12.6 — no drift between what SIA says and what the `/obstacles` page shows
- Deep mode surfaces this as structured action cards with deep links into `/obstacles` or the relevant `/career` screen

**Recovery/Restart Flow Contract:**

| Trigger | Condition |
|---------|-----------|
| Goal flagged `at_risk` | Live `risk_status` recomputed at offer-time, not from a stale cached flag |
| No progress in N days | Same `no_progress` risk-taxonomy category shared with F12.6 |

**Obstacle Plan Access via SIA:**
- Same root-cause taxonomy as F12.6 (`time`, `confidence`, `unclear_next_step`, `external_dependency`, `skill_gap`, `overcommitment`, `deadline_pressure`)
- SIA can populate an obstacle entry mid-conversation using the identical service layer the `/obstacles` UI uses — not a parallel "AI view" of the data

**Explicitly OFF in this phase:** the proactive nudge engine (`career.proactive.generate_nudge`, `career.proactive.schedule_scan` — trigger types: no_progress, deadline_near, streak_risk, level_near_complete, weekly_review, task_due, application_followup, interview_tomorrow, high_momentum, risk_detected) is implemented at the tool level but **flag-gated OFF**. SIA does not currently reach out proactively about career goals; all career coaching in this phase is reactive (user-initiated). This mirrors the platform's broader pattern of shipping proactive-messaging infrastructure behind a flag before enabling it.

---

## Acceptance Criteria

```gherkin
Scenario: Recovery/Restart offered for an at-risk goal
  Given a goal's risk_status is 'at_risk'
  When the user engages SIA about that goal
  Then SIA can offer a Recovery/Restart flow with a single scaled-down re-entry task

Scenario: Restart offer re-validates risk_status live
  Given a goal was 'at_risk' when the conversation started
  When the user later engages the restart flow
  Then risk_status is recomputed live at offer-time — if the goal is no longer at_risk, the offer does not render

Scenario: Obstacle Plan editable mid-conversation
  Given a user tells SIA "I'm stuck on my portfolio goal because I don't know what to build next"
  When SIA processes this
  Then it can populate an obstacle entry with root-cause category 'unclear_next_step', using the same service layer as the /obstacles page

Scenario: risk_status contract shared between SIA and /obstacles
  Given SIA reads risk_status via career.ai.review_progress for a goal
  When the user then opens /obstacles for the same goal
  Then both surfaces show an identical risk_status value

Scenario: Recovery/Restart flow completion tracked
  Given a user accepts a Recovery/Restart offer
  When they complete the scaled-down re-entry task within 7 days
  Then this is tracked as a successful flow completion for the 30%+ re-engagement metric

Scenario: Proactive nudge tool is a defensive no-op while flag is OFF
  Given ENABLE_CAREER_PROACTIVE_NUDGES (or equivalent flag) is OFF
  When career.proactive.generate_nudge is invoked directly (e.g., in testing)
  Then the call short-circuits and returns a no-op result — no message is sent to any user
```

---

## Success Metrics

- Recovery/Restart flow completion (user re-engages within 7 days of offer): 30%+
- Obstacle Plan → resumed activity (task completed within 7 days of plan creation): 45%+ (shared metric with S12.6.1)
- "Why am I behind?" / progress-review query tool accuracy: 95%+ match live data

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| SIA career tool call (read/analyze) <2s | `career.proactive.*` tools verified true no-ops while the feature flag is OFF (defense against accidental invocation) | Recovery/Restart offers reference only the user's own goal data | Recovery/Restart action cards are screen-reader accessible, deep links have descriptive labels | Shares the `risk_status` contract and root-cause taxonomy exactly with F12.6 — the one place in the Career pillar where UI and AI-tool output are contractually required to match |

---

## Dependencies

- **Prerequisite Stories:** S12.6.1 (Obstacle Plan — shares risk taxonomy and `risk_status` contract), S12.7.1 (base CRUD tool domain and confirmation gating)
- **Related Stories:** S12.5.2 (momentum "slipping" state and no-progress signals feed the at-risk determination)
- **External Dependencies:** Feature flag infrastructure (`ENABLE_CAREER_PROACTIVE_NUDGES` or equivalent) — proactive nudges remain OFF pending a dedicated enablement decision

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Recovery/Restart offered on a goal that isn't actually stalled | Risk classifier false positive | `risk_status` recomputed live at offer-time, not from a stale cached flag | Silent — offer only renders if risk_status is still `at_risk` at message-send time |
| Proactive nudge tool called directly despite feature flag OFF | `career.proactive.generate_nudge` invoked while flag is off | Tool call short-circuits, returns a no-op result, does not send anything to the user | Silent — no user-facing message; this is a defensive guard, not a user-facing error |
| SIA references stale risk_status from earlier in a long conversation | Multi-turn conversation with cached entity state | Re-fetch live state before acting | "Let me check your current status first..." (re-fetch, then respond) |

---

## Open Questions

- Enabling the proactive nudge engine (flag flip + rollout plan) is explicitly out of scope for this story — infrastructure exists per this feature but is a deliberate follow-up decision, not part of Must-Have launch readiness.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Obstacle Plan readable and editable by SIA mid-conversation, sharing risk_status contract with F12.6
- [x] Recovery/Restart flow available for goals flagged at_risk or stalled
- [x] Recovery/Restart offer re-validates risk_status live at offer-time (no stale-flag false positives)
- [x] `career.proactive.*` tools verified to be true no-ops while the feature flag is OFF
- [x] AI tool safety tests cover the proactive-flag defensive-guard behavior
- [x] Contract test enforces risk_status agreement between SIA and `/obstacles`

---

*Story S12.7.2 | Epic E12 | Product: Balencia Platform*
