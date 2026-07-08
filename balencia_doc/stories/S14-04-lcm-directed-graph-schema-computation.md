---
type: story
id: S14.2.1
title: LCM Directed Graph Schema & Nightly Computation
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.2
feature_name: Life Correlation Matrix (LCM)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S14.2.1: LCM Directed Graph Schema & Nightly Computation

## User Story

**As an** Optimization Enthusiast,
**I want** the AI to understand not just that my career stress and sleep are related, but which one tends to drive the other,
**So that** when I'm coached on a problem, the AI addresses the actual root cause instead of the symptom that happened to be logged most recently.

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

**Graph Model (PostgreSQL, directed):**
- 10 domain nodes: `fitness`, `nutrition`, `wellbeing`, `career`, `finance`, `relationships`, `spirituality`, `growth`, `creativity`, `sleep_recovery`
- Directed edges stored with source domain, target domain, edge weight/strength, and supporting evidence pointers
- Unlike Epic 08's flat correlation records (symmetric `variable_1` <-> `variable_2`), LCM edges are **asymmetric**: `career -> sleep_recovery` is a distinct graph object from `sleep_recovery -> career`, and both may coexist with different weights

**Data Model (PostgreSQL):**

| Table | Purpose |
|-------|---------|
| `lcm_base_correlations` | Base symmetric correlation signal per domain pair before directionality is asserted |
| `life_correlation_edges` | Directed edge records: source domain, target domain, weight, lag, directionality confidence, evidence pointers, status |
| `lcm_temporal_modifiers` | Temporal lag modifiers used in the directionality computation per domain pair |

**Directed-Edge Record Shape:**
```json
{
  "edge_id": "uuid",
  "user_id": "uuid",
  "source_domain": "career",
  "target_domain": "sleep_recovery",
  "weight": 0.61,
  "lag_days": 2,
  "directionality_confidence": "high|medium|low",
  "evidence_pointers": ["activity_id_1", "activity_id_2"],
  "last_computed_date": "2026-07-01",
  "status": "active|dormant|pruned"
}
```

**Nightly Computation Pipeline:**
```
1. Domain Signal Aggregation (nightly, per user):
   - Pull daily aggregate signal for all 10 domains from source pillars
   - Fitness/Nutrition/Wellbeing/Sleep-Recovery: existing pillar data
   - Relationships: F14.1 connection-health signal (S14.1.3)
   - Career, Finance, Spirituality, Growth, Creativity: respective module signal

2. Temporal Lag Analysis (per ordered domain pair A != B):
   a. Test whether movement in A at time T predicts movement in B at T+lag, lag in [0,1,2,3] days
   b. Compute lagged correlation strength per lag offset
   c. If strongest signal at lag > 0 AND exceeds direction-confidence threshold:
        assert directed edge A -> B with that lag and strength
   d. If strongest signal at lag == 0 (simultaneous): store as weak bidirectional
      edge, no directionality asserted

3. Edge Weight & Evidence:
   - Weight = normalized lagged-correlation strength
   - Evidence pointer = specific data points/date ranges justifying the edge
   - Store edge with source, target, weight, lag, evidence pointer, last-computed date

4. Graph Assembly:
   - Assemble all 10 nodes + computed directed edges into the user's Life Matrix
   - Nodes with insufficient data render in "learning" or "dormant" state
   - Prune edges decayed below minimum weight threshold on recompute
```

**Known Gotcha Fixed During Wave 0:**
- Persona-shadow bug: edge weights were being computed against a stale/shadow persona snapshot instead of live domain signal. Identified and corrected before ship - edge computation now forces recompute against live signal.

---

## Acceptance Criteria

```gherkin
Scenario: 10-node directed schema implemented
  Given the LCM schema
  When domain nodes are enumerated
  Then all 10 domains exist: fitness, nutrition, wellbeing, career, finance,
    relationships, spirituality, growth, creativity, sleep_recovery

Scenario: Edges are directed, not flat pairwise correlations
  Given sufficient signal for domains A and B
  When the nightly computation runs
  Then edge A->B and edge B->A are stored as distinct records with independent weights

Scenario: Directionality only asserted above confidence threshold
  Given a domain pair with strongest lag signal at lag == 0
  When the nightly computation runs
  Then the pair is stored as a weak bidirectional edge with no asserted direction

Scenario: Insufficient data for a domain node
  Given a domain with fewer than 14 days of signal
  When the nightly computation runs
  Then that node renders in "learning" state
  And no edges are computed from it yet

Scenario: Persona-shadow drift corrected
  Given a user's persona snapshot is stale relative to live domain signal
  When nightly edge computation runs
  Then weights are computed against live signal, not the stale snapshot
  And the correction is silent (no user-facing disruption)

Scenario: Edge pruning on recompute
  Given an existing edge whose recomputed weight falls below the minimum threshold
  When the nightly recompute runs
  Then the edge status transitions to "pruned"
```

---

## Success Metrics

- Matrix population time: 10-node graph populated with at least 1 directed edge within 30 days of active multi-pillar logging
- Directed-edge accuracy: 70%+ of high-confidence directed edges validated by user as "that direction feels right" (post-insight feedback)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Nightly recomputation completes within the nightly batch window | Edge records scoped strictly to `user_id` | Evidence pointers internal-only, not exposed as raw IDs to end users | N/A (backend computation) | PostgreSQL, existing nightly job scheduler |
| Temporal lag analysis bounded to [0,1,2,3] day window per pair (no unbounded scan) | No cross-user signal ever mixed into a user's edge computation | | | |

---

## Dependencies

- **Prerequisite Stories:** S14.1.3 (Relationships domain-signal source), Fitness/Nutrition/Wellbeing pillars (E5, E6, E7), Career module, Finance module
- **Related Stories:** S14.2.2 (dashboard rendering of this graph), S14.2.3 (downstream evidence/consumption)
- **External Dependencies:** F8.1 Pattern Correlation Engine (conceptual/statistical foundation LCM extends), nightly batch job scheduler

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Insufficient data for a domain node | Domain has <14 days of signal | Node renders "learning" state, no edges computed from it | "Still learning your [domain] patterns." |
| Ambiguous directionality | Temporal lag analysis inconclusive | Store as undirected/bidirectional weak edge, no direction asserted | Coach falls back to correlational language |
| Persona-shadow / stale-snapshot drift | Edge weights computed against out-of-date snapshot | Force recompute against live signal (Wave 0 fix) | Silent correction, no user-facing disruption |
| Domain node with zero signal | No data logged for a pillar at all | Node renders inactive/dormant, excluded from edge computation | Node shown greyed-out, "not connected yet" |

---

## Open Questions

- Multi-hop causal chain reasoning ("A drives B drives C") is explicitly out of scope for Wave 0 and flagged as a post-Wave-0 follow-up (LCM Wave 1).

---

## Definition of Done

- [x] 10-node directed graph schema implemented in PostgreSQL (`lcm_base_correlations`, `life_correlation_edges`, `lcm_temporal_modifiers`)
- [x] Edges stored as directed/asymmetric records, not flat pairwise correlations
- [x] Temporal lag analysis with confidence thresholding implemented
- [x] Persona-shadow edge-weight bug identified and fixed prior to Wave 0 ship
- [x] Edge pruning on recompute implemented
- [x] Unit tests for temporal lag analysis and confidence thresholding
- [ ] Multi-hop causal chains (flagged follow-up, LCM Wave 1)

---

*Story S14.2.1 | Epic E14 | Product: Balencia Platform*
