---
type: story
id: S14.6.1
title: Wiki-Synthesizer Evidence Tracking & Handler Coverage
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.6
feature_name: Cross-System Data Integrity (Wiki Synthesizer Reliability)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.6.1: Wiki-Synthesizer Evidence Tracking & Handler Coverage

## User Story

**As a** Holistic Health Seeker using the Wiki Neural Graph,
**I want** every synthesized link between my wiki pages to trace back to the real activity that created it, and every activity type I log to actually update my wiki graph,
**So that** the connections I see are grounded in real data I logged, not a partial or fabricated-feeling approximation.

---

## Story Type

- [ ] Feature
- [ ] Enhancement
- [x] Technical
- [x] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Wiki-Synthesizer Service:**
- Central service converting platform activity (journal entries, goal updates, habit logs, and other activity-tool-driven events) into synthesized wiki page content and inter-page links
- Wired into **all** activity-tool handlers across the platform (not a subset) - any activity surface that can produce wiki-relevant content routes through the same synthesis entry point

**Gaps Repaired by This Story:**

| Gap | Problem | Fix |
|-----|---------|-----|
| #1 Evidence tracking completeness | Synthesized links existed without traceable provenance | Every synthesized link now carries a pointer back to the specific activity/data entry that justified it |
| #2 Page update reliability | Synthesized pages silently went stale after initial synthesis | Reliable update path ensures pages reflect the latest activity state |
| #3 Activity-tool handler coverage | Certain activity types bypassed synthesis entirely | Synthesis wired into all activity-tool handlers platform-wide |
| #6 Cross-handler consistency | Synthesis behavior varied subtly by code path | Synthesis behavior now consistent regardless of which handler triggered it |

**Pipeline Stages Covered:**
```
1. Activity Event Ingestion:
   - ALL activity-tool handlers (journal, goals, habits, and other activity
     surfaces) route through the shared wiki-synthesizer entry point
   - No handler-specific bypass paths (Gap #3, #6 fix)

2. Synthesis Pass:
   - Determine whether the activity event should create/update a wiki page,
     create/update a link, or both
   - Attach evidence pointer: which specific activity/data entry justifies
     this synthesized content or link (Gap #1 fix)

4. Page State Update:
   - Apply synthesized content/link changes to the page's canonical state
   - Reliable update path ensures pages do not silently go stale (Gap #2 fix)
```

---

## Acceptance Criteria

```gherkin
Scenario: Every synthesized link carries an evidence pointer
  Given any synthesized wiki link
  When the link is inspected
  Then it carries a valid pointer back to the specific activity/data entry that justified it

Scenario: All activity-tool handlers route through shared synthesis
  Given any activity-tool handler across the platform (journal, goals, habits, etc.)
  When an activity event is logged through that handler
  Then it routes through the same shared wiki-synthesizer entry point
  And no handler-specific bypass path exists

Scenario: Page updates stay in sync with activity
  Given a wiki page previously synthesized from earlier activity
  When new related activity is logged
  Then the page's canonical state is updated to reflect the latest activity
  And the page does not silently go stale

Scenario: Cross-handler consistency
  Given the same category of activity logged via two different activity-tool handlers
  When each triggers synthesis
  Then the resulting synthesized content/link behavior is consistent regardless of trigger path

Scenario: Activity event with no matching handler path
  Given an activity type not explicitly covered by synthesis wiring
  When the event fires
  Then it falls back to the shared default handler rather than being silently dropped
```

---

## Success Metrics

- Evidence traceability: 100% of synthesized links carry a valid evidence pointer (data integrity audit)
- Handler coverage: 100% of activity-tool handlers route through the shared synthesis path (code-path audit)
- Page staleness: 0 pages showing activity older than the last synthesis pass under normal operation (pipeline monitoring)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Synthesizer per-event pass <2s per activity event | Evidence pointers internal-only, not exposed as raw IDs to end users | Synthesis operates strictly within the originating user's own data | N/A (backend pipeline) | Wired into all existing and future activity-tool handlers via shared entry point |

---

## Dependencies

- **Prerequisite Stories:** None (foundational reliability work)
- **Related Stories:** S14.6.2 (concurrency safety and orphaned-link cleanup, built on this same pipeline), S14.5.1 (Wiki Neural Graph, the primary consumer and reason this work was prioritized)
- **External Dependencies:** Personal Wiki module's base page/link data model, all platform activity-tool handlers

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Activity event with no matching handler path | Activity type not covered by synthesis wiring | Falls back to shared default handler rather than silently dropping | Silent to user; internal logging for pipeline monitoring |
| Synthesizer failure mid-pipeline | Exception during synthesis pass | Fail closed on that page's update (no partial/corrupt state persisted) | Page graph reflects last-good synthesis; retried on next activity event |
| Evidence pointer target missing at synthesis time | Referenced activity/data entry not found | Synthesis pass aborts for that link rather than writing an unverifiable pointer | No link created; retried on next consistent activity event |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] Evidence tracking: every synthesized link traces to real activity data
- [x] Page updates reliably reflect current activity state (no silent staleness)
- [x] Synthesizer wired into all activity-tool handlers, not a subset
- [x] Cross-handler synthesis behavior is consistent regardless of trigger path
- [x] Data integrity audit confirms 100% evidence-pointer coverage
- [x] Code-path audit confirms 100% handler coverage

---

*Story S14.6.1 | Epic E14 | Product: Balencia Platform*
