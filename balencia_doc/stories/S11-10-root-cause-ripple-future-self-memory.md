---
type: story
id: S11.7.2
title: Root Cause Explorer, Ripple Simulator, Future Self Timeline & Memory Explorer APIs
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.7
feature_name: Intelligence API Suite
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.7.2: Root Cause Explorer, Ripple Simulator, Future Self Timeline & Memory Explorer APIs

## User Story

**As an** Optimization Enthusiast,
**I want to** directly query root causes, "what-if" ripple effects, my future-self trajectory, and what SIA remembers about me,
**So that** I can drill into the platform's deepest reasoning as first-class, interactive screens, not something buried behind the right chat prompt.

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

**What shipped:** the remaining four of the six Intelligence API Suite endpoints — the drill-down/interactive surfaces.

| API | Endpoint | Purpose |
|---|---|---|
| **Root Cause Explorer** | `GET /api/v1/intelligence/root-cause/:domain` | Per-domain upstream root-causes + downstream ripple forecast, walking LCM graph paths |
| **Ripple Simulator** | `GET /api/v1/intelligence/ripple/:domain?delta=` | "What-if" simulator projecting ranked downstream effects of a hypothetical delta on one domain |
| **Future Self Timeline** | `GET /api/v1/intelligence/future-self` | 7 / 30 / 90 / 365-day trajectory projections per metric |
| **Memory Explorer** | `GET /api/v1/intelligence/memory-explorer` | Inspectable, editable view of SIA's memories / profile facts / report intelligence with confidence + provenance per item |

**Services** (`server/src/services/intelligence/{root-cause-explorer,ripple-simulator,future-self-timeline,memory-explorer}.service.ts`) each export a `build*()` pure function plus a `get*(userId)` (or `get*(userId, domain[, delta])`) async wrapper — the same pure-builder + IO-wrapper separation used across the full API suite, enabling unit tests against fixture data independent of the database.

**Auth-scoping:** all four endpoints are user-scoped by the authenticated session; no domain/user parameter can be used to read another user's intelligence (IDOR-checked in the 3-reviewer pass at Wave 2 integration).

**Degradation contract:** `intelligence-premium-routes.integration.test.ts` proves upstream report/profile/LCM/memory service failures return an honest "unavailable" contract, never a bare 500.

**Review outcome:** a "confidence/predictive/life-correlation orphan" decorative-logic suspicion was explicitly refuted by 3 parallel reviewers — all 9 underlying services confirmed wired (2 transitively via root-cause).

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | These four surfaces are opt-in — a user only sees them when they explicitly open the relevant dashboard section. |
| Deep | Root Cause Explorer and Ripple Simulator support per-domain drill-down and hypothetical "what-if" parameters; Future Self Timeline and Memory Explorer render fully on the Client Cognitive OS Dashboard (F11.8). |

---

## Acceptance Criteria

```gherkin
Scenario: Root Cause Explorer walks the LCM graph per domain
  Given a user requests GET /api/v1/intelligence/root-cause/:domain for a valid domain
  When the request is authenticated
  Then the response includes upstream root-causes and a downstream ripple forecast for that domain

Scenario: Ripple Simulator projects a hypothetical delta
  Given a user requests GET /api/v1/intelligence/ripple/:domain?delta=X
  When the request is processed
  Then the response returns ranked, projected downstream effects of that delta

Scenario: Ripple Simulator rejects an invalid domain
  Given a domain not in the known LCM node set
  When GET /api/v1/intelligence/ripple/:domain is called
  Then a 400-class validation error is returned, not a silent empty result

Scenario: Future Self Timeline projects all four horizons
  Given a user requests GET /api/v1/intelligence/future-self
  When the request is authenticated
  Then the response includes 7/30/90/365-day trajectory projections per tracked metric

Scenario: Memory Explorer exposes confidence and provenance per item
  Given a user requests GET /api/v1/intelligence/memory-explorer
  When the request is authenticated
  Then each memory/profile-fact/report item includes its own confidence and provenance, and is marked editable

Scenario: No cross-user data leakage
  Given user A requests any of the four endpoints
  When the request is processed
  Then only user A's own intelligence is returned, never another user's data

Scenario: Upstream service failure returns an honest unavailable contract
  Given the upstream LCM/memory service throws
  When any of the four endpoints is called
  Then a typed "unavailable" contract is returned — "This section is temporarily unavailable" — never a raw error or fabricated data

Scenario: Decorative-logic suspicion refuted
  Given a review flagged possible orphaned confidence/predictive/life-correlation logic
  When 3 parallel reviewers investigated
  Then all 9 underlying services were confirmed wired (2 transitively via root-cause)
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Honest-null rate | 100% of nullable explorer/map/timeline fields are genuinely null when their underlying signal is absent | Service unit tests |
| IDOR safety | 0 cross-user data leakage across all four endpoints | Integration test suite, 3-reviewer pass (Wave 2) |
| Degradation honesty | 0 bare 500s on upstream failure; all return typed unavailable contracts | `intelligence-premium-routes.integration.test.ts` |
| Domain validation | 100% of invalid-domain requests to Ripple Simulator return a 400-class error, never a silent empty result | Integration test |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Responsive dashboard load (existing E10 latency budget); user-initiated, not hot-path chat | Auth-scoped to requesting user; IDOR-checked | No cross-user data exposure; Memory Explorer items editable only by their owner | JSON API, client renders accessibly | Client Cognitive OS Dashboard (F11.8) |

---

## Dependencies

- **Prerequisite Stories:** S11.1.1 (whole-life scope), S11.2.1 (honest-null / labeling discipline this suite follows), S11.5.1 (shares confidence/provenance data model with Memory Explorer)
- **Related Stories:** S11.7.1 (sibling APIs in the same suite), S11.8.1 (client consumer)
- **External Dependencies:** LCM / Epic 14 (Root Cause Explorer, Ripple Simulator graph source), E08 F8.2 (Predictive Insights — Future Self Timeline source)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| Upstream LCM/memory service throws | Caught, typed unavailable contract returned |
| Ripple Simulator called with an invalid domain | 400-class validation error, not a silent empty result |
| Memory Explorer item has no provenance data | Item still renders with an explicit "provenance unavailable" tag |

---

## Open Questions

None outstanding beyond the shared `B-m1` follow-up tracked against the Executive Briefing (S11.7.1).

---

## Definition of Done

- [x] All four endpoints implemented, auth-scoped to the requesting user, unit + integration tested
- [x] Root Cause Explorer walks LCM graph paths for per-domain upstream causes + downstream ripple forecast
- [x] Ripple Simulator accepts a `delta` query parameter and returns ranked, projected downstream effects
- [x] Future Self Timeline projects 7/30/90/365-day horizons per tracked metric
- [x] Memory Explorer exposes memories/profile facts/report intelligence with per-item confidence + provenance, and marked editable
- [x] All four services separate pure `build*()` logic from IO `get*()` wrappers for testability
- [x] Reviewed by 3 parallel reviewers; "confidence/predictive/life-correlation orphan" decorative-logic suspicion explicitly refuted
- [x] Degradation tested: upstream report/profile/LCM/memory failures return typed unavailable contracts, not 500s

---

*Story S11.7.2 | Epic E11 | Product: Balencia Platform*
