---
type: story
id: S16.9.2
title: SIA Analytics Tools & Chart Rendering
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.9
feature_name: Analytics Engine
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.9.2: SIA Analytics Tools & Chart Rendering

## User Story

**As a** user chatting with SIA,
**I want to** ask a plain-language analytics question and get back a short narrative plus an inline chart rendered directly in the chat, safely,
**So that** I get a real, visual answer without leaving the conversation and without any risk of a malicious or malformed chart config touching my screen.

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

**New capability** — the coach-facing surface and rendering pipeline for the Analytics Engine core (S16.9.1).

**What shipped:**

**AI coach tools** (`server/src/services/langgraph-tools/domains/analytics.ts`):
- `runAnalyticsQuery` — free-text `question` + optional `domain`/`metrics`/`timeRange`/`analysisTypes`, with domain-inference (`inferDomainFromQuestion()` via keyword regex) and a cross-domain retry fallback if the first guess returns no data.
- `getBehavioralProfile` — per-domain trend/consistency/decay/loop analysis across up to 5 metrics.
- `getLifestyleBalanceRadar` — fixed 8-axis lifestyle snapshot: Fitness, Sleep, Recovery, Nutrition, Mood, Energy, Habits, Finance, each normalized 0-100 against its metric's value range. **Known gap:** this tool's artifact does not set `engine: 'echarts'` and instead renders through the client's Recharts fallback path — a minor engine-consistency gap flagged for future cleanup, not a defect (both engines are supported today).

**Client rendering** — `client/app/(pages)/ai-coach/components/ArtifactCard.tsx` dispatches on `artifact.engine === "echarts"`: ECharts artifacts render via `EChartsChart` → `client/components/charts/EChartsRenderer.tsx`; everything else falls back to the existing Recharts-based renderer.

- Balencia dark theme applied inline in `EChartsRenderer.tsx` (transparent background, low-opacity axis/split lines, brand-orange `#FF5E00` series accents with gradient/glow "premium 3D" enhancement) rather than via a registered ECharts theme file.
- **Security layer:** `sanitizeTooltip`, `isSafeFormatter`, and a `SAFE_SERIES_KEYS` whitelist strip any LLM-supplied chart config down to style-safe fields before merge — preventing prompt-injection-style CSS/XSS via a model-controlled tooltip or formatter.

**Scope boundary:** six other analytics tools in the same file (`analyzeCorrelation`, `analyzeTrend`, `compareTimePeriods`, `detectAnomalies`, `analyzeMultiFactor`, `analyzeGoalProgress`) call a separate, pre-existing `deepAnalysisEngineService` — a parallel, older analytics pathway this story does not touch or replace.

The Analytics Engine is **not** exposed as REST endpoints — it is surfaced exclusively as SIA coach tools invoked through the langgraph tool-calling pipeline, consistent with its design as a conversational, ad-hoc capability rather than a dashboard feature.

---

## Acceptance Criteria

```gherkin
Scenario: runAnalyticsQuery infers domain from a plain-language question
  Given a user asks "does my spending go up when I'm stressed?" with no explicit domain
  When runAnalyticsQuery executes
  Then inferDomainFromQuestion resolves an appropriate domain
  And the query proceeds without requiring the user to specify parameters

Scenario: Cross-domain retry fallback recovers from an empty first guess
  Given the first-guess domain query returns zero data points
  When runAnalyticsQuery detects hasData: false
  Then it retries with inferDomainFromQuestion's domain
  And if still empty, retries a full cross-domain sweep before returning hasData: false

Scenario: getBehavioralProfile returns structured per-metric analysis
  Given a domain and up to 5 metrics
  When getBehavioralProfile executes
  Then it returns trend/consistency/decay/loop analysis for each requested metric

Scenario: getLifestyleBalanceRadar returns a normalized 8-axis snapshot
  Given a user with data across multiple pillars
  When getLifestyleBalanceRadar executes
  Then it returns Fitness, Sleep, Recovery, Nutrition, Mood, Energy, Habits, Finance each normalized 0-100

Scenario: ArtifactCard dispatches ECharts vs Recharts correctly
  Given an artifact with engine: "echarts"
  When ArtifactCard renders it
  Then it renders via EChartsChart -> EChartsRenderer
  Given an artifact without engine: "echarts" (e.g. the radar tool's current output)
  When ArtifactCard renders it
  Then it falls back to the existing Recharts-based renderer

Scenario: Model-supplied chart config is sanitized before render
  Given an LLM-generated chart config containing an unsafe tooltip formatter
  When EChartsRenderer processes the config
  Then isSafeFormatter/sanitizeTooltip strip the unsafe fields
  And only SAFE_SERIES_KEYS-whitelisted fields reach the DOM

Scenario: runAnalyticsQuery completes within the conversational latency budget
  Given a typical query with LLM insight generation enabled
  When the tool executes end-to-end
  Then it completes in under 5 seconds
```

---

## Success Metrics

- `runAnalyticsQuery` calls returning `hasData: false` after full cross-domain retry fallback: tracked, minimize over time
- LLM insight-generation failures silently surfaced as broken responses: 0 (deterministic fallback always available)
- LLM-supplied chart config reaching the DOM unsanitized: 0 (`EChartsRenderer` security-layer regression tests)
- `runAnalyticsQuery` (AI coach tool call) latency: <5 seconds end-to-end including LLM insight generation

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| `runAnalyticsQuery` <5s end-to-end including LLM insight generation | `EChartsRenderer` whitelists safe style fields from any LLM-supplied chart configuration before rendering | Charts render only the authenticated user's own data | Dark theme maintains contrast AA+ on axis/tooltip text | `ArtifactCard` dispatch is additive — does not remove the existing Recharts fallback path |

---

## Dependencies

- **Prerequisite Stories:** S16.9.1 (this story is the tool/rendering surface on top of that core)
- **Related Stories:** S16.6.1 (both are new SIA tool-surface additions shipped in the same langgraph tool-registry expansion window)
- **External Dependencies:** Epic 11 (SIA Cognitive OS) tool registry, chat delivery, artifact rendering pipeline
- **Remediates:** N/A (net-new capability)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Requested domain returns no data but a related domain has data | First-guess domain query empty | Retries `inferDomainFromQuestion()` domain, then a full cross-domain sweep before giving up | SIA may answer from a different domain than literally asked, with a note |
| Model attempts to inject unsafe tooltip/formatter CSS via chart config | `isSafeFormatter`/`sanitizeTooltip` whitelist check | Unsafe fields stripped before render | Chart renders normally with default-safe styling |
| `getLifestyleBalanceRadar` artifact lacks `engine: 'echarts'` | Known, tracked gap | Renders correctly today via the Recharts fallback path — not broken, just inconsistent | Chart still renders correctly to the user |
| User asks a question that legitimately has no data anywhere | Full cross-domain sweep still returns 0 | Returns `{ success: true, hasData: false }`, no LLM call attempted | "I don't have enough data yet for that — keep logging and ask again soon." |

---

## Open Questions

- Fix `getLifestyleBalanceRadar` artifact to set `engine: 'echarts'` for rendering consistency — tracked as an immediate follow-up (Post-MVP, pre-F16.8-rollout item), not blocking this story's Definition of Done since the Recharts fallback renders correctly today.

---

## Definition of Done

- [x] `runAnalyticsQuery`, `getBehavioralProfile`, `getLifestyleBalanceRadar` are registered and callable as SIA tools
- [x] `runAnalyticsQuery`'s domain-inference retries a cross-domain sweep before returning `hasData: false`
- [x] Client `ArtifactCard` correctly dispatches ECharts vs. Recharts based on `artifact.engine`
- [x] `EChartsRenderer` sanitizes any model-supplied tooltip/formatter config before rendering
- [x] Security-layer regression tests passing (`sanitizeTooltip`, `isSafeFormatter`, `SAFE_SERIES_KEYS`)
- [x] Latency budget (<5s end-to-end) verified
- [ ] `getLifestyleBalanceRadar` `engine: 'echarts'` consistency fix (tracked follow-up, non-blocking)

---

*Story S16.9.2 | Epic E16 | Product: Balencia Platform*
