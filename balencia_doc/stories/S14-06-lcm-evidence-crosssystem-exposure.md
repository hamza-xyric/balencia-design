---
type: story
id: S14.2.3
title: LCM Evidence Drill-Down & Cross-System Exposure
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.2
feature_name: Life Correlation Matrix (LCM)
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.2.3: LCM Evidence Drill-Down & Cross-System Exposure

## User Story

**As an** Optimization Enthusiast,
**I want to** see exactly which data points justify a directed edge in my Life Matrix, and have that same directional insight available to the AI coach and to buddy-matching,
**So that** I can trust the graph's causal claims and get consistent reasoning about my life across every surface that touches it.

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

**API:**

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v1/intelligence/lcm` | Full effective matrix (base ⊕ personal ⊕ temporal); client filters to edges originating from a given domain for the drill-down view |
| GET | `/api/v1/intelligence/root-cause/:domain` | Deterministic root-cause explorer — per-domain upstream causes ranked by directed-edge weight, the primary "why this direction?" source |

**Evidence Drill-Down (Deep Mode):**
- Given a specific directed edge (e.g. `career -> sleep_recovery`), the user can drill into the `evidence_pointers` backing it - the specific data points/date ranges that justified the directionality
- Evidence pointers are internal-use identifiers for integrity/traceability; the UI translates them into human-readable "why this direction?" explanations rather than exposing raw IDs

**Cross-System Exposure (Integration):**
- **Epic 11 - Life Correlation Controller:** reads LCM directed edges to decide causal framing in coaching responses ("X is driving Y" vs. "X and Y just happen to move together"). This is LCM's primary coaching-facing consumer.
- **Epic 13 - Buddy-suggestion refinement:** reads a user's LCM domain-strength profile (node weights) to suggest accountability partners with complementary domain patterns

**Cross-System Consumption Flow:**
```
5. Downstream Exposure:
   - Life Correlation Controller (Epic 11) queries directed edges for causal framing
   - Buddy-suggestion logic (Epic 13) queries domain-strength profile (node weights)
   - "Life Matrix" dashboard tab renders the full directed graph for Deep Mode users
```

---

## Acceptance Criteria

```gherkin
Scenario: Edge detail with evidence
  Given a computed directed edge career -> sleep_recovery
  When a client requests GET /api/v1/intelligence/root-cause/sleep_recovery
  Then the response includes weight, lag_days, directionality_confidence, and evidence_pointers

Scenario: Edges originating from a domain
  Given a domain with multiple outgoing directed edges
  When a client requests GET /api/v1/intelligence/lcm (client-filtered by domain)
  Then all directed edges originating from that domain are returned

Scenario: Life Correlation Controller consumes directed edges
  Given a high-confidence directed edge exists for a user
  When Epic 11's Life Correlation Controller assembles a coaching response touching that domain pair
  Then it can query the directed edge and apply causal framing rather than flat correlational language

Scenario: Buddy-suggestion refinement consumes domain-strength profile
  Given a user's LCM domain-strength profile
  When Epic 13's buddy-suggestion logic runs
  Then it can query the domain-strength profile to find complementary-domain candidates

Scenario: Evidence pointers not exposed raw
  Given a user drills into "why this direction?" for an edge
  When the evidence UI renders
  Then evidence is presented as human-readable context, not raw internal IDs
```

---

## Success Metrics

- Coach causal framing adoption: Life Correlation Controller cites directed edges in >50% of root-cause coaching responses where an edge exists (conversation sampling)
- Buddy-match relevance: suggested buddies backed by LCM complementary-domain signal rated more relevant than non-LCM baseline (A/B comparison)
- Directed-edge accuracy: 70%+ of high-confidence directed edges validated by user as "that direction feels right" (post-insight feedback)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Edge-detail fetch <300ms | Edge queries scoped strictly to `user_id` | Evidence pointers internal-only, never exposed as raw IDs beyond "why this link?" UI | Evidence explanations rendered as readable text, not icon-only | Epic 11 / Epic 13 internal service contracts |

---

## Dependencies

- **Prerequisite Stories:** S14.2.1 (edges must be computed and stored), S14.2.2 (Life Matrix tab is the primary UI surface for evidence drill-down)
- **Related Stories:** None further within this epic
- **External Dependencies:** Epic 11 Life Correlation Controller (primary downstream consumer), Epic 13 buddy-suggestion logic (secondary downstream consumer)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Edge requested for a domain pair with no computed edge | No matching row | Return honest empty/404, not a fabricated weak edge | "No directional relationship found yet between these domains." |
| Ambiguous directionality (weak bidirectional edge) | Edge stored without asserted direction | Evidence UI reflects correlational, not causal, framing | Coach falls back to correlational language; UI shows "related, direction unclear" |
| Life Correlation Controller queries a pruned edge | Edge status = "pruned" | Excluded from causal framing decisions | Coach does not cite pruned edges |
| Buddy-suggestion queries a user with no domain-strength profile yet | Insufficient LCM data | Buddy-suggestion falls back to non-LCM baseline matching | No error surfaced; matching proceeds without LCM refinement |

---

## Open Questions

- Full Deep Mode "why this direction?" evidence-drill-down UI is partially implemented; complete UI polish is a flagged post-Wave-0 follow-up.
- Multi-hop causal chain reasoning ("A drives B drives C") is not covered by this story - flagged as LCM Wave 1 follow-up (tracked against S14.2.1).

---

## Definition of Done

- [x] `GET /api/v1/intelligence/lcm` and `GET /api/v1/intelligence/root-cause/:domain` implemented
- [x] Evidence pointers returned and translated to human-readable UI, never raw IDs
- [x] LCM directed edges queryable by Epic 11's Life Correlation Controller
- [x] LCM domain-strength profile queryable by Epic 13's buddy-suggestion logic
- [x] Integration tests for both downstream consumption paths
- [ ] Full Deep Mode evidence-drill-down UI polish (flagged follow-up)

---

*Story S14.2.3 | Epic E14 | Product: Balencia Platform*
