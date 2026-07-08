---
type: story
id: S11.7.1
title: Executive Daily Briefing & Life Operating Map APIs
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.7
feature_name: Intelligence API Suite
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.7.1: Executive Daily Briefing & Life Operating Map APIs

## User Story

**As an** Optimization Enthusiast,
**I want to** directly query my daily cross-pillar report and a curated map of my whole life-domain graph as first-class, always-available screens,
**So that** the platform's sophisticated reasoning is something I actually experience, not something buried inside a chat transcript I'd have to ask the right question to surface.

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

**What shipped:** two of the six Intelligence API Suite endpoints — the always-on, cross-pillar surfaces.

| API | Endpoint | Purpose |
|---|---|---|
| **Executive Daily Briefing** | `GET /api/v1/intelligence/briefing` | Cross-pillar daily report: energy forecast, top risk/opportunity, accountability, workout readiness, recovery outlook, goal drift, prediction reliability, recommended actions |
| **Life Operating Map** | `GET /api/v1/intelligence/life-map` | Curated view of all LCM life-domain nodes, current signals, strongest relationships, leverage points |

**Executive Daily Briefing** (`server/src/services/intelligence/executive-daily-briefing.service.ts`) — shipped shape:
```typescript
export interface ExecutiveDailyBriefing {
  energyForecast: ExecutiveBriefingItem;
  topRisk: ExecutiveBriefingItem | null;
  topOpportunity: ExecutiveBriefingItem | null;
  accountability: ExecutiveBriefingItem | null;
  workoutReadiness: ExecutiveBriefingItem;
  recoveryOutlook: ExecutiveBriefingItem;
  goalDrift: ExecutiveBriefingItem | null;
  predictionReliability: ExecutiveBriefingItem;
  recommendedActions: ExecutiveBriefingAction[];
}
```
Every nullable field (`topRisk`, `topOpportunity`, `accountability`, `goalDrift`) is genuinely `null` — not a fabricated placeholder — when the user has no signal for it. `workoutReadiness`/`recoveryOutlook` fall back to `severity: 'neutral'`, `confidence: 'low'` framing when recovery data is missing. The same contract is reused verbatim for the proactive WhatsApp daily-briefing surface — one source of truth, two delivery channels.

**Life Operating Map** (`server/src/services/intelligence/life-operating-map.service.ts`) exports a `build*()` pure function plus a `get*(userId)` async wrapper, surfacing LCM nodes, current signals, strongest relationships, and leverage points.

**Auth-scoping:** both endpoints are user-scoped by the authenticated session; no domain/user parameter can be used to read another user's intelligence (IDOR-checked in the 3-reviewer pass at Wave 2 integration — `intelligence-premium-routes.integration.test.ts`).

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Executive Daily Briefing surfaces automatically as a proactive WhatsApp daily message (reusing the same briefing-building contract) — no need to open the app or query an API directly. |
| Deep | Both APIs directly queryable and rendered in the Client Cognitive OS Dashboard (F11.8). |

---

## Acceptance Criteria

```gherkin
Scenario: Executive briefing computes all sections
  Given a user requests GET /api/v1/intelligence/briefing
  When the request is authenticated
  Then the response includes energy forecast, top risk/opportunity, accountability, workout readiness, recovery outlook, goal drift, prediction reliability, and recommended actions

Scenario: Nullable briefing fields are genuinely null, never fabricated
  Given a user has no daily-analysis report finding for "top risk"
  When the briefing is built
  Then topRisk is null and omitted from the rendered briefing, not filled with a placeholder

Scenario: Recovery data missing falls back to honest neutral framing
  Given a user has no recovery/training data
  When workoutReadiness and recoveryOutlook are built
  Then they return severity: 'neutral', confidence: 'low' with explicit "data missing" detail text

Scenario: Executive briefing is reused verbatim for WhatsApp
  Given the same underlying ExecutiveDailyBriefing contract
  When it is delivered via GET /briefing and via the proactive WhatsApp daily message
  Then both channels render from the identical contract with no drift

Scenario: Life Operating Map surfaces the LCM graph
  Given a user requests GET /api/v1/intelligence/life-map
  When the request is authenticated
  Then the response includes LCM nodes, current signals, strongest relationships, and leverage points

Scenario: No cross-user data leakage
  Given user A requests either endpoint
  When the request is processed
  Then only user A's own intelligence is returned, never another user's data

Scenario: Upstream service failure returns an honest unavailable contract
  Given the upstream report/profile/LCM service throws
  When either endpoint is called
  Then a typed "unavailable" contract is returned, never a bare 500 or fabricated data
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Honest-null rate | 100% of nullable briefing fields are genuinely null when their underlying signal is absent | `intelligence.controller.test.ts` + service unit tests |
| IDOR safety | 0 cross-user data leakage across both endpoints | Integration test suite, 3-reviewer pass (Wave 2) |
| Degradation honesty | 0 bare 500s on upstream failure; typed unavailable contracts returned | `intelligence-premium-routes.integration.test.ts` |
| WhatsApp reuse fidelity | Executive Briefing WhatsApp message and `GET /briefing` response share the identical underlying contract | Unit test comparing both call sites |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Responsive dashboard load (existing E10 latency budget); user-initiated, not hot-path chat | Auth-scoped to requesting user; IDOR-checked | No cross-user data exposure | JSON API, client renders accessibly | Dashboard + proactive WhatsApp channel |

---

## Dependencies

- **Prerequisite Stories:** S11.1.1 (whole-life scope), S11.4.1/S11.4.2 (accountability risk, contradictions, baselines feeding the briefing), S11.2.1 (honest-null / labeling discipline this suite follows)
- **Related Stories:** S11.7.2 (sibling APIs in the same suite), S11.8.1 (client consumer)
- **External Dependencies:** LCM / Epic 14 (Life Operating Map graph source), Proactive Messaging (E08 F8.6) for WhatsApp reuse

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| No daily-analysis report exists for `topRisk` | Field returns `null`, omitted from rendered briefing |
| User has no accountability contracts due | `accountability` field returns `null` |
| Recovery/training data entirely missing | `severity: 'neutral'`, `confidence: 'low'`, explicit "data missing" detail text |
| Upstream LCM/memory service throws | Caught, typed unavailable contract returned |
| `totalScore === 0` treated as a real zero rather than no-signal | Not yet fixed — tracked follow-up `B-m1` against `executive-daily-briefing.service.ts:110` |

---

## Open Questions

- `totalScore === 0` in the Executive Daily Briefing is not yet distinguished from "no signal" — tracked follow-up `B-m1`.

---

## Definition of Done

- [x] Both endpoints implemented, auth-scoped to the requesting user, unit + integration tested
- [x] Executive Daily Briefing computes energy forecast, top risk/opportunity, accountability, workout readiness, recovery outlook, goal drift, prediction reliability, and recommended actions
- [x] Nullable briefing fields genuinely null when unsupported by real data, never fabricated
- [x] Executive Briefing reused verbatim for the proactive WhatsApp daily-briefing surface (single contract, two channels)
- [x] Life Operating Map surfaces LCM nodes, current signals, strongest relationships, and leverage points
- [x] Both services separate pure `build*()` logic from IO `get*()` wrappers for testability
- [x] Degradation tested: upstream report/profile/LCM failures return typed unavailable contracts, not 500s
- [ ] `totalScore === 0` honest-null polish (tracked follow-up `B-m1`, not yet applied)

---

*Story S11.7.1 | Epic E11 | Product: Balencia Platform*
