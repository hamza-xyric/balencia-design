---
type: story
id: S14.1.3
title: Relationship Health Signal & Coach Context Integration
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.1
feature_name: Relationships CRM (Social Health Pillar)
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.1.3: Relationship Health Signal & Coach Context Integration

## User Story

**As a** Holistic Health Seeker,
**I want** SIA to recognize when relationship strain or isolation is affecting my energy, mood, or motivation,
**So that** the AI coach treats "who matters to me and how that's going" as answerable in conversation the same way "how did you sleep" is.

---

## Story Type

- [ ] Feature
- [x] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

**User Experience:**
- Relationship-health signal (connection frequency, logged relationship strain/warmth) is derived from `contact_interactions` and `contact_notes` and exposed to the coach without any dedicated UI of its own
- SIA can reference relationship signal conversationally, e.g. acknowledging drifting connections or citing warmth as a positive input
- This is the mechanism that promotes Relationships to a peer pillar alongside Fitness, Nutrition, and Wellbeing rather than a bolted-on contacts feature

**Technical Foundation:**
- Relationship-health signal is aggregated from: connection frequency (derived from `contact_interactions` timestamps), logged strain/warmth (derived from `closeness_signal` on `personal_contacts` and free-text sentiment on `contact_notes` where available)
- Aggregation is exposed to the AI coach's context assembler as a first-class Social Health pillar input, architecturally identical to how Fitness/Nutrition/Wellbeing pillar signal is assembled
- Signal export step (final stage of the Relationship Hub render process): aggregate relationship-health signal and expose to context assembler

**Architectural Boundary (Important):**
- This signal is distinct from Epic 13's Social Growth OS (buddy matching, accountability pods, activity feed): F14.1 is the user's own real-world relationship graph; Epic 13 is in-app social features with other Balencia users
- Epic 08's Pattern Correlation Engine can include relationship signal as a correlation variable once sufficient longitudinal data exists (cross-reference, not built in this story)
- Epic 14's own Life Correlation Matrix (F14.2) consumes this same signal as the data source for its `relationships` domain node (see S14.2.1)

---

## Acceptance Criteria

```gherkin
Scenario: Relationship signal exposed to context assembler
  Given a user with logged contacts, interactions, and notes
  When the AI coach's context assembler runs for that user
  Then relationship-health signal (connection frequency, strain/warmth) is included
  As a Social Health pillar input alongside Fitness/Nutrition/Wellbeing

Scenario: Coach references relationship signal when relevant
  Given a user whose logged interactions show a drifting connection pattern
  When the user has a coaching conversation touching on mood or energy
  Then the coach can reference the relationship signal as relevant context

Scenario: No fabricated signal for unlogged users
  Given a user with zero logged contacts
  When the context assembler runs
  Then relationship-health signal is honestly absent/null, not fabricated or defaulted

Scenario: Architectural separation from Epic 13 preserved
  Given the shared connection-graph tables used by both F14.1 and Epic 13
  When relationship-health signal is aggregated for the coach
  Then only F14.1's real-world relationship data feeds this signal
  And Epic 13's buddy-matching/pod/feed data is not conflated into it
```

---

## Success Metrics

- Coach relevance: relationship signal referenced in coaching responses when relevant (isolation, strain patterns) - manual QA sampling
- Relationship-signal availability: signal present for 100% of users with at least 1 logged interaction, honestly null otherwise

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Signal aggregation adds no perceptible latency to context assembly | Signal scoped strictly to `user_id` | Relationship signal used only within the user's own coaching context, never exposed to other users | N/A (backend signal, no direct UI) | N/A |

---

## Dependencies

- **Prerequisite Stories:** S14.1.1 (contacts/notes/interactions must exist), S14.1.2 (Relationship Hub render process defines the signal-export step)
- **Related Stories:** S14.2.1 (LCM `relationships` node consumes this same signal)
- **External Dependencies:** Epic 11 AI context assembler (consumer), Epic 08 Pattern Correlation Engine (future correlation-variable consumer, not built here)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Zero relationship data logged | Contact/interaction count = 0 | Signal honestly absent from context assembler payload, no fabricated default | Coach does not reference relationship signal; no error surfaced |
| Sparse/low-confidence signal | Interaction count too low for a reliable strain read | Signal marked low-confidence, coach avoids over-asserting | Coach uses tentative framing if referenced at all |
| Signal aggregation failure | Exception during aggregation step | Fail closed on that pillar's signal only; other pillars unaffected | No user-facing disruption; internal logging |

---

## Open Questions

- Relationship-strain-driven **proactive** coaching interventions (wiring this signal into Epic 08's F8.6 Proactive Interventions) are explicitly flagged as a follow-up, not yet built. This story covers signal availability in reactive coaching context only.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Relationship-health signal exposed to context assembler as Social Health pillar input
- [x] Honest-null behavior verified for users with no logged relationship data
- [x] Architectural separation from Epic 13 Social Growth OS preserved and documented
- [x] Manual QA sampling confirms coach references signal when relevant
- [ ] Proactive-intervention wiring (flagged follow-up, tracked in Epic 14 index)

---

*Story S14.1.3 | Epic E14 | Product: Balencia Platform*
