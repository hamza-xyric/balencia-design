---
type: story
id: S12.4.1
title: Focus Areas — Per-Goal Scoped Trackers
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.4
feature_name: Focus Areas (Per-Goal Scoped Trackers)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.4.1: Focus Areas — Per-Goal Scoped Trackers

## User Story

**As an** Optimization Enthusiast (P3) pursuing a freelance-income goal,
**I want to** choose the specific metrics that matter for freelancing (proposals sent, client calls, revenue) instead of being stuck with generic "career progress" trackers designed for a 9-to-5 job search,
**So that** my dashboard reflects what actually moves *my* goal forward.

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
- Light mode: one or two focus-area chips on the goal card with a single running count each (e.g., "Applications: 12")
- Deep mode: full focus-area picker at goal creation/edit time, per-focus-area trend mini-chart, and the ability to add/remove focus areas mid-goal without losing prior history on removed trackers
- Focus Areas are selected per goal at creation (manual and AI-assisted flows) and stored as a scoped set rather than a global fixed schema

**Focus Area → Data Source Mapping:**

| Focus Area | Underlying Source |
|------------|--------------------|
| `applications` | `COUNT(career_applications WHERE goal_id=X)` |
| `interviews` | `COUNT(career_applications WHERE status IN ('interviewing','offer') AND goal_id=X)` |
| `resume` | `COUNT(career_evidence WHERE evidence_type='resume' AND goal_id=X)` |
| `networking` | `SUM(progress_events.minutes WHERE activity_type='networking' AND goal_id=X)` |
| `learning` | `SUM(progress_events.minutes WHERE activity_type='learning' AND goal_id=X)` |
| `portfolio` | `career_evidence` filtered by evidence_type='portfolio' |

**Behaviors:**
- Removing a Focus Area does not delete historical events — it only stops surfacing that tracker going forward, preserving analytics continuity (F12.5) if re-added later
- Focus Area selection primes which SIA tools are most relevant in coaching context for that goal (e.g., an "Applications" focus area primes `career.application.*` tool suggestions over `career.interview.*`)
- Focus-area counts are computed as filtered aggregates over already-existing tables — no parallel tracking system

**Known Functional Gap:** Focus areas keyed off `career_applications` (`applications`, `interviews`) are functionally gated by the Application Tracker feature (F12.9), which is Should-Have/unconfirmed — see S12.9.1. Focus areas keyed off tasks/evidence/focus-time (`resume`, `portfolio`, `networking`, `learning`) are fully live regardless.

---

## Acceptance Criteria

```gherkin
Scenario: Focus areas selected at goal creation
  Given a user creates a goal via the manual form or the AI-roadmap wizard
  When they reach the focus-area step
  Then they can select from the activity-type catalog (applications, interviews, resume, portfolio, networking, learning)

Scenario: Focus area removed preserves history
  Given a goal has the "networking" focus area with 6 weeks of history
  When the user removes "networking" from the goal
  Then the historical progress_events rows remain intact, but the tracker stops appearing on the dashboard

Scenario: Focus area re-added repopulates full history
  Given "networking" was previously removed from a goal
  When the user re-adds "networking"
  Then the trend chart immediately repopulates with the full prior history, no re-onboarding needed

Scenario: Goal created with zero focus areas defaults sensibly
  Given a user completes goal creation without selecting any focus area
  When the goal is saved
  Then the system defaults to a minimal starter set based on goal_type (e.g., job_search → applications + interviews)

Scenario: Unusual focus-area combination flagged, not blocked
  Given a user selects "Revenue" on a job_search-type goal
  When they save
  Then the system allows it but flags it in Deep mode: "Heads up — 'Revenue' isn't typical for a job-search goal. Keep it anyway?"

Scenario: Light mode surfaces top 2 focus areas
  Given a goal has 4 selected focus areas
  When the goal card renders in Light mode
  Then only the top 1-2 focus areas by recency/relevance are shown as chips
```

---

## Success Metrics

- Goals with 2+ focus areas selected: 70%+
- Focus-area edit rate (added/removed mid-goal): 20%+ of goals within first month
- Dashboard relevance rating ("this matches what I care about"): 75%+ agree (post-launch survey)
- Focus-area-driven SIA tool suggestion acceptance: 40%+

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Dashboard aggregate computation reuses existing indexed event tables — no new hot-path query | Focus-area aggregates scoped to authenticated `user_id` + goal ownership | Focus-area removal is a display-layer no-op on data, not a deletion — historical career data retained per platform retention rules | Focus-area chips carry accessible labels with the numeric count, not color-only signal | Focus areas drawn from the existing activity-type catalog — no separate schema per goal type |

---

## Dependencies

- **Prerequisite Stories:** S12.2.1/S12.2.2 (focus-area counts derive from the same `progress_events` stream the weekly engine writes)
- **Related Stories:** S12.5.1/S12.5.2 (focus-area trend data feeds the momentum chart), S12.9.1 (Application Tracker — unblocks applications/interviews focus areas)
- **External Dependencies:** `career_evidence` (resume/portfolio-scoped focus areas), `career_applications` (applications/interviews focus areas — Should-Have dependency, see S12.9.1)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Goal created with zero focus areas | Validation at `career.goal.create` | Default to a minimal starter set based on `goal_type` | "We've pre-selected trackers based on your goal type — customize anytime." |
| Focus area removed while events are mid-week | Removal request during active week | Preserve historical rows, exclude from new dashboard aggregation only | Silent — past data stays intact, just stops appearing going forward |
| Focus area re-added after removal | Re-selection of a previously removed focus area | Re-surface full historical series immediately | Silent — trend chart repopulates with full history |
| Conflicting focus area for goal type | e.g., "Revenue" on a job_search goal | Allow it, flag as unusual in Deep mode | "Heads up — 'Revenue' isn't typical for a job-search goal. Keep it anyway?" |
| Applications/interviews focus area selected but Application Tracker data is absent | Focus area resolves to `career_applications` with zero/unconfirmed rows | Degrade gracefully — hide the tracker chip rather than show a broken/empty state | Silent — tracker simply doesn't render until application data exists |

---

## Open Questions

- None outstanding for the Must-Have build itself. The dependency on Application Tracker (F12.9/S12.9.1) for applications/interviews focus areas is a known, documented gap — not a build defect in this story.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Focus Areas are selectable per goal at creation (manual and AI-assisted flows)
- [x] Focus Areas can be added or removed post-creation without deleting historical event data
- [x] Focus-area counts computed as filtered aggregates over existing event/evidence/application tables (no parallel tracking system)
- [x] Goal card (Light mode) surfaces top 1-2 focus areas by recency/relevance
- [x] Deep mode shows all selected focus areas with individual trend mini-charts
- [x] Focus-area selection available in both manual and AI-roadmap creation flows
- [x] UI degrades gracefully (hides, doesn't error) when application-tracker-dependent data is absent

---

*Story S12.4.1 | Epic E12 | Product: Balencia Platform*
