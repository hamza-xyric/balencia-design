---
type: story
id: S14.6.2
title: Wiki-Synthesizer Concurrency Safety & Orphaned-Link Cleanup
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.6
feature_name: Cross-System Data Integrity (Wiki Synthesizer Reliability)
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.6.2: Wiki-Synthesizer Concurrency Safety & Orphaned-Link Cleanup

## User Story

**As a** Holistic Health Seeker using the Wiki Neural Graph,
**I want** concurrent activity to never produce duplicate or conflicting wiki links, and links whose source data was deleted to disappear rather than linger as stale edges,
**So that** my "second brain" graph stays an honest, current reflection of my actual data over time.

---

## Story Type

- [ ] Feature
- [ ] Enhancement
- [x] Technical
- [x] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

**Gaps Repaired by This Story:**

| Gap | Problem | Fix |
|-----|---------|-----|
| #4 Duplicate/race handling | Concurrent activity events targeting the same page produced duplicate or conflicting synthesis passes | Synthesis passes targeting the same page are locked/serialized |
| #5 Orphaned-link cleanup | Links whose underlying evidence had since been deleted/edited persisted as stale, unverifiable edges | Periodic cleanup pass removes now-unverifiable edges |

**Pipeline Stages Covered:**
```
3. Concurrency Safety:
   - Lock/serialize synthesis passes targeting the same page to prevent
     duplicate or conflicting writes from concurrent activity events (Gap #4 fix)

5. Evidence Lifecycle Maintenance:
   - Periodic cleanup pass identifies links whose evidence source has since
     been deleted or edited, and removes the now-unverifiable edge (Gap #5 fix)

6. Downstream Exposure:
   - GET /api/v1/wiki/graph reads the maintained, evidence-backed page/link
     state - this is the data F14.5's canvas renderer consumes
```

**Why This Matters:**
- Race conditions and orphaned links are exactly the class of defect that produces a graph that *looks* real but silently drifts from truth - the specific failure mode the platform's honest-null discipline is designed to prevent, applied here to a pipeline rather than a dashboard metric.

---

## Acceptance Criteria

```gherkin
Scenario: Concurrent synthesis on the same page is serialized
  Given two activity events targeting the same wiki page fire near-simultaneously
  When both trigger synthesis passes
  Then the passes are locked/serialized
  And the result is a single consistent page state, not duplicate or conflicting writes

Scenario: Orphaned link cleanup after evidence deletion
  Given a synthesized link whose underlying activity/data entry is later deleted
  When the periodic cleanup pass runs
  Then the now-unverifiable edge is removed from the graph

Scenario: Orphaned link cleanup after evidence edit
  Given a synthesized link whose underlying activity/data entry is edited such that
    it no longer justifies the link
  When the periodic cleanup pass runs
  Then the edge is removed

Scenario: GET /api/v1/wiki/graph reflects maintained state
  Given the synthesizer has completed its concurrency-safe passes and cleanup cycle
  When GET /api/v1/wiki/graph is requested
  Then it returns the maintained, evidence-backed page/link state only
```

---

## Success Metrics

- Orphaned edges: 0 links persisting after their evidence is deleted/edited (cleanup job verification)
- Concurrency correctness: 0 duplicate/conflicting page states observed under concurrent activity events (pipeline monitoring)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Lock/serialization adds bounded latency, still within the <2s per-event synthesis budget | Cleanup pass scoped strictly per-user, no cross-user edge inspection | Deleted/edited evidence is fully honored - no link survives its source's removal | N/A (backend pipeline) | Cleanup pass runs as a scheduled job alongside other nightly/periodic intelligence jobs |

---

## Dependencies

- **Prerequisite Stories:** S14.6.1 (evidence tracking and handler coverage must exist before concurrency/cleanup logic has evidence pointers to act on)
- **Related Stories:** S14.5.1 (Wiki Neural Graph, the primary consumer that benefits from a race-free, orphan-free graph)
- **External Dependencies:** Scheduled job infrastructure for the periodic cleanup pass

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Concurrent synthesis race on same page | Two activity events target the same page near-simultaneously | Serialized/locked synthesis pass, last-consistent-write wins | Silent to user; no duplicate/conflicting page state |
| Evidence source deleted after synthesis | Underlying activity entry later deleted/edited | Orphaned-link cleanup removes the now-unverifiable edge | Link silently disappears from graph on next sync |
| Cleanup pass encounters a page with all links orphaned | Every link on a page loses its evidence | Page renders as an isolated node with zero edges, not deleted outright | Page remains navigable, simply shows no connections |
| Lock contention under high concurrent activity | Multiple events queue for the same page lock | Events processed in order, none dropped | Slight processing delay, no data loss |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] Duplicate/race conditions in concurrent synthesis resolved
- [x] Orphaned links (evidence deleted/edited) are cleaned up rather than persisting
- [x] `GET /api/v1/wiki/graph` verified to read only maintained, evidence-backed state
- [x] Cleanup job verification confirms 0 orphaned edges under test scenarios
- [x] Integration tests for concurrent-event race scenarios

---

*Story S14.6.2 | Epic E14 | Product: Balencia Platform*
