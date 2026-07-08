---
type: story
id: S16.9.1
title: Analytics Engine Core Services
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.9
feature_name: Analytics Engine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.9.1: Analytics Engine Core Services

## User Story

**As a** user chatting with SIA,
**I want to** ask a specific, ad-hoc analytics question about my own data — across any domain, over any time range, including time-lagged effects — and get back a real, statistically-backed answer,
**So that** I can interrogate my own patterns instead of waiting for a pre-scheduled insight.

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

**New capability** — co-shipped in the same delivery window as the accountability hardening but architecturally independent from it. Where Epic 08's Pattern Correlation Engine surfaces proactive, pre-computed same-day correlations and Epic 14's Life Correlation Matrix (LCM) maintains a persistent, Bayesian-updated directed graph, the Analytics Engine answers **reactive, ad-hoc, lag-aware** questions.

**What shipped — five independently unit-tested core services:**

- **Orchestrator** — `server/src/services/analytics/analytics-engine.service.ts` (`analyticsEngineService`). Single public entry point `runQuery(userId, queryInput: AnalyticalQuery): Promise<AnalyticsResponse>`: validates requested metrics against `MetricRegistry` → fetches time-series data in parallel via `metricRegistry.fetchTimeSeries` → dispatches per `analysisType` (`trend_detection`, `behavioral`, `correlation_analysis`, `comparison`) to `BehavioralIntelligenceService` and `CrossDomainCorrelator` → generates LLM-written insights with a deterministic fallback → calls `OutputFormatter.selectCharts()` then `assembleResponse()`.
- **LLM fallback logic:** checks `llmCircuitBreaker.isCallAllowed()` before calling the LLM — if open, skips straight to `fallbackInsights()`. Otherwise calls a light-tier model (`temperature: 0.3, maxTokens: 1024, responseFormat: json_object`) for 3-7 insights + root-cause + recommendation. If the response fails to parse, or `totalPoints === 0`, falls back to templated, deterministic insight sentences derived directly from trend results.
- **`CrossDomainCorrelator`** — `server/src/services/analytics/cross-domain-correlator.ts` — genuinely lag-based: `correlatePair` iterates lag from 0 up to a configured `maxLag`, computes Pearson r for each lag-shifted alignment, keeps whichever lag produces the strongest correlation, and reports `lagDays` in the result. Confirmed distinct from `cross-domain-correlator.service.ts` (Epic 08's same-day, rule-based `DailyCorrelation` engine — 8 hardcoded boolean rules, no lag, no Pearson r) and `life-correlation-matrix.service.ts` (Epic 14's LCM — a persistent, Bayesian-updated directed graph, not a per-query computation).
- **`BehavioralIntelligenceService`** — `server/src/services/analytics/behavioral-intelligence.service.ts` — per-metric time-series detection: Trend (linear regression slope, `changePerWeek`, direction), Consistency (coefficient-of-variation → 0-100 score), Decay (`detectHabitDecay` — first-half vs second-half comparison, `decayRate`, `projectedDaysToZero`), Behavioral loops (`detectBehavioralLoops` — normalized autocorrelation at lags 3-14 days; lag 7 = "weekend warrior," lag 14 = "biweekly cycle"), Period comparison (`comparePeriods`).
- **`MetricRegistry`** — `server/src/services/analytics/metric-registry.ts` — registers queryable metrics across seven domains (`biometrics`, `fitness`, `nutrition`, `habits`, `wellbeing`, `finance`, `goals`), each metric wrapping a parameterized SQL query, executed via `query(sql, [userId, days])`, fail-safe to `[]` on error.
- **`OutputFormatter`** — `server/src/services/analytics/output-formatter.ts` — chart-selection rules, always `engine: 'echarts'`: `trend_detection → line`, `anomaly_detection → line` (mean ±2σ reference lines), `correlation_analysis → scatter`, `comparison → bar`, `forecasting → area`. `assembleResponse` derives `metadata.confidenceLevel` purely from data volume (`high` ≥30 points, `medium` ≥14, else `low`).

**Deliberate separation from enforcement:** both the Analytics Engine and `metric-resolver.service.ts` (S16.2.1) query the same canonical health/behavior tables, but through intentionally separate code paths (`MetricRegistry` vs. `metric-resolver`) so an analytics query can never accidentally back a penalty.

---

## Acceptance Criteria

```gherkin
Scenario: runQuery produces a full analytics response
  Given a valid AnalyticalQuery with domain, metrics, and timeRange
  When analyticsEngineService.runQuery executes
  Then it returns an AnalyticsResponse with summaryInsights, charts, and metadata.confidenceLevel

Scenario: Cross-domain correlator detects the correct lag
  Given two time series where metric A's effect on metric B is strongest at a 1-day lag
  When CrossDomainCorrelator.correlatePair runs with maxLag >= 1
  Then it reports lagDays: 1 and the corresponding strongest Pearson r

Scenario: Behavioral intelligence classifies trend direction correctly
  Given a metric time series with a clear upward linear trend
  When BehavioralIntelligenceService.analyze runs
  Then trend.direction is "improving" with a positive changePerWeek

Scenario: Weekend-warrior loop detected at 7-day lag
  Given a metric time series with strong autocorrelation at a 7-day lag
  When detectBehavioralLoops runs
  Then a loop entry is returned with lagDays: 7 and label "weekend warrior"

Scenario: MetricRegistry isolates per-metric SQL failures
  Given one metric's fetchTimeSeries SQL throws
  When runQuery fetches all requested metrics in parallel
  Then that metric returns [] rather than failing the whole query

Scenario: LLM circuit breaker open triggers deterministic fallback
  Given llmCircuitBreaker.isCallAllowed() returns false
  When generateInsights runs
  Then fallbackInsights() produces deterministic, trend-derived sentences without calling the LLM

Scenario: Output formatter selects the correct chart type per analysis type
  Given analysisTypes of trend_detection, correlation_analysis, and comparison
  When OutputFormatter.selectCharts runs
  Then it returns line, scatter, and bar chart specs respectively, all with engine: "echarts"

Scenario: Analytics Engine never backs an enforcement penalty
  Given both metric-resolver.service.ts and MetricRegistry read the same canonical table
  When either is invoked
  Then MetricRegistry's query path is never called from any contract-evaluation code path
```

---

## Success Metrics

- `CrossDomainCorrelator.correlatePair` lag-detection accuracy: 5 tests, passing
- `BehavioralIntelligenceService.analyze` full detection suite: 13 tests, passing
- `MetricRegistry` domain coverage and `fetchTimeSeries` failure isolation: passing
- `OutputFormatter.selectCharts` per-analysisType chart-type mapping: 4 tests, passing
- `AnalyticsEngineService.runQuery` empty-data and LLM-fallback paths: 3 tests, passing
- Chart type mismatched to `analysisType`: 0

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `metricRegistry.fetchTimeSeries` per metric <500ms, parallelized | LLM insight generation never used as enforcement input | Queries scoped strictly to the authenticated user's own data via `query(sql, [userId, days])` | N/A (backend service layer) | Zero table/write overlap with Epic 08 or Epic 14 correlation systems |

---

## Dependencies

- **Prerequisite Stories:** None (independent track — can build in parallel with the accountability hardening stories)
- **Related Stories:** S16.9.2 (SIA tool exposure and chart rendering built on this core), S16.2.1 (shares canonical source tables via a deliberately separate code path)
- **External Dependencies:** Epic 08 (Cross-Domain Intelligence) conceptual precedent, Epic 14 (Life Correlation Matrix) conceptual precedent, Epic 09 (Data Integrations) underlying biometric/behavioral data completeness
- **Remediates:** N/A (net-new capability, not an audit remediation)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| User has zero data points for the requested domain | `totalPoints === 0` in `runQuery` | Skips LLM call entirely, returns "Insufficient data to generate insights." | "I don't have enough data yet for that — keep logging and ask again soon." |
| LLM insight generation fails to parse or circuit breaker is open | `parseLlmJson` throws / `isCallAllowed()` false | `fallbackInsights()` produces deterministic, trend-derived sentences | User still receives a real (if simpler) answer, never an error |
| Metric's `fetchTimeSeries` SQL throws | try/catch in `MetricRegistry` | Returns `[]` for that metric rather than failing the whole query | Query proceeds with remaining valid metrics; degraded, not broken |
| Analytics Engine LLM cost/latency spikes under heavy ad-hoc query volume | `llmCircuitBreaker` state | Circuit breaker + deterministic fallback ensures graceful degradation, never a hang or hard failure | User receives a simpler but real answer instead of an error |

---

## Open Questions

None — the five core services and their separation from enforcement are fully specified and unit-tested.

---

## Definition of Done

- [x] `CrossDomainCorrelator` supports multi-day lag correlation, distinct from the same-day Epic 08 engine and the persistent Epic 14 LCM graph
- [x] `BehavioralIntelligenceService` correctly classifies trend direction, consistency score, decay, behavioral loops ("weekend warrior"/"biweekly"), and period-over-period comparison
- [x] `MetricRegistry` covers all seven domains with working `fetchTimeSeries` for each
- [x] `OutputFormatter` selects the correct ECharts chart type per `analysisType` and never crashes on empty series
- [x] LLM insight generation has a working, tested deterministic fallback for both circuit-open and parse-failure cases
- [x] All five core services independently unit-tested and passing
- [x] No overlap in tables or code paths with `metric-resolver.service.ts` (enforcement)

---

*Story S16.9.1 | Epic E16 | Product: Balencia Platform*
