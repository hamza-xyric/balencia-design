---
type: story
id: S11.8.1
title: Client Cognitive OS Dashboard
epic: E11
epic_name: SIA Cognitive OS & Provenance
feature: F11.8
feature_name: Client Cognitive OS Dashboard
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S11.8.1: Client Cognitive OS Dashboard

## User Story

**As a** Holistic Health Seeker,
**I want to** see my executive briefing, life operating map, root causes, ripple simulations, future-self trajectory, and what SIA remembers about me all on one screen, with each section resilient to the others failing,
**So that** the platform's deepest reasoning is something I actually experience, not something buried behind the right chat prompt.

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

**What shipped:** `CognitiveOperatingSystem`, the first-screen client tab that unifies all six Intelligence API Suite (F11.7) endpoints into one console, mounted as the first sub-tab inside the existing Intelligence tab alongside the pre-existing insight/correlation/prediction/report/health-score tabs (which remain intact). Built on `Promise.allSettled` graceful degradation, so a failure in any single endpoint never hides or breaks the rest of the console.

**Client contract** (`client/src/shared/services/intelligence.service.ts`, types in `client/shared/types/domain/intelligence.ts`):
```
getExecutiveBriefing()               -> /v1/intelligence/briefing
getLifeOperatingMap()                -> /v1/intelligence/life-map
getFutureSelfTimeline()              -> /v1/intelligence/future-self
getMemoryExplorer()                  -> /v1/intelligence/memory-explorer
getRootCauseExplorer(domain)         -> /v1/intelligence/root-cause/:domain
getRippleSimulation(domain, delta)   -> /v1/intelligence/ripple/:domain?delta=...
```
Shared domain types live in one file so future client surfaces reuse one contract instead of each screen inventing its own local payload shape.

**Component:** `client/app/(pages)/dashboard/components/tabs/intelligence/CognitiveOperatingSystem.tsx`, mounted from `IntelligenceTab.tsx` as the first sub-tab. Each of the six endpoints is fetched **independently** via `Promise.allSettled` — not a single combined request — so one failed call surfaces a per-section error state without hiding successfully-loaded sections.

**Review-driven fixes applied before landing:**
- Surfaced 4 briefing items that were initially dropped from the render (C1)
- Split the initial single combined fetch into independent per-endpoint fetches (I1)
- Added per-section error states instead of one tab-wide failure state (I2)
- Added a `NaN` guard on numeric rendering paths

**Flexibility modes:**

| Mode | Experience |
|------|------------|
| Light | Executive briefing and top recommended actions surface prominently at the top of the tab; deeper sections (Root Cause Explorer, Ripple Simulator) are collapsed/secondary until explicitly opened. |
| Deep | Full console: life operating map with leverage points, per-domain root-cause drill-down, interactive ripple "what-if" simulation, 7/30/90/365-day future-self timeline, and the memory explorer review queue — all live on one screen. |

---

## Acceptance Criteria

```gherkin
Scenario: CognitiveOperatingSystem mounts as the first sub-tab
  Given a user opens the Intelligence tab
  When the tab renders
  Then CognitiveOperatingSystem is the first sub-tab, with existing insight/correlation/prediction/report/health-score tabs still present and unaffected

Scenario: All six endpoints fetched independently
  Given the dashboard mounts
  When it fetches briefing, life map, future-self, and memory explorer
  Then each call runs independently via Promise.allSettled, not one combined request

Scenario: One failed endpoint does not hide the others
  Given the Ripple Simulator call fails or times out
  When the dashboard renders
  Then that section shows its own error state while the other five sections render normally

Scenario: All endpoints failing shows one consolidated state
  Given all six endpoints reject (e.g., auth session expired)
  When the dashboard renders
  Then a single full-tab error/reconnect state is shown, not six duplicate error cards

Scenario: Numeric fields never render literal NaN
  Given a numeric field is NaN or undefined
  When it is rendered
  Then a dash/placeholder ("—") is shown instead

Scenario: Root Cause Explorer and Ripple Simulator support interaction
  Given a user selects a domain in Root Cause Explorer or adjusts a delta in Ripple Simulator
  When the sub-fetch resolves
  Then that card updates independently with its own loading/error state

Scenario: Memory Explorer item missing provenance still renders
  Given a Memory Explorer item has no source/confidence field
  When it is rendered
  Then it still displays with an explicit "provenance unavailable" tag
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Graceful degradation | 1 failed endpoint out of 6 never hides the other 5 sections | `CognitiveOperatingSystem.test.tsx` degraded-state coverage |
| Render coverage | All 6 briefing sub-items + map + explorer + simulator + timeline + memory render correctly with real API shapes | `CognitiveOperatingSystem.test.tsx` render coverage |
| Load resilience | Independent per-section loading states (not one blocking spinner for all 6) | Component test on `Promise.allSettled` fan-out |
| Numeric safety | 0 `NaN` renders across all numeric displays (scores, deltas, percentages) | Regression test added post-review |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Independent per-section fetch, no single blocking request | Client calls the same auth-scoped endpoints as S11.7.1/S11.7.2 | No cross-user data exposure (server-enforced) | Responsive rendering across supported breakpoints | Coexists with existing E10 Analytics/Intelligence tabs |

---

## Dependencies

- **Prerequisite Stories:** S11.7.1, S11.7.2 (all 6 data sources)
- **Related Stories:** None downstream
- **External Dependencies:** E10 (Analytics & Insights Dashboard — existing dashboard shell/tab infrastructure this mounts into), E4 (Mobile App — responsive rendering)

---

## Edge Cases & Errors

| Scenario | Expected Behavior |
|----------|-------------------|
| One endpoint (e.g., Ripple Simulator) times out or errors | That section shows its own error state; other 5 sections render normally |
| All 6 endpoints fail (e.g., auth session expired) | Full-tab error/empty state, not 6 duplicate error cards |
| Numeric field is `NaN` or `undefined` | Falls back to a dash/placeholder, never renders literal "NaN" |
| Memory Explorer item has no provenance data | Item still renders with an explicit "provenance unavailable" tag |

---

## Open Questions

None outstanding — this feature is fully shipped with all quality gates green.

---

## Definition of Done

- [x] `CognitiveOperatingSystem` mounted as the first sub-tab inside `IntelligenceTab.tsx`
- [x] Existing insight/correlation/prediction/report/health-score tabs remain fully intact and unaffected
- [x] All 6 intelligence endpoints fetched independently via `Promise.allSettled`
- [x] Executive briefing renders energy forecast + all recommended actions (previously-dropped 4 items now surfaced)
- [x] Per-section error state on individual endpoint failure (not one tab-wide error)
- [x] Life operating map renders nodes, signals, relationships, and leverage points
- [x] Root Cause Explorer and Ripple Simulator support per-domain interaction
- [x] Future Self Timeline renders all 4 horizons (7/30/90/365 days)
- [x] Memory Explorer renders the review queue with confidence + provenance per item
- [x] Shared domain types used (no locally-invented payload shapes)
- [x] `NaN` guard applied to all numeric render paths
- [x] Client Jest, lint, typecheck, and production build all green post-landing

---

*Story S11.8.1 | Epic E11 | Product: Balencia Platform*
