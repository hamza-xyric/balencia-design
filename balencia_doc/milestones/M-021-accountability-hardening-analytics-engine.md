---
type: milestone
id: M-021
title: Accountability Contract Hardening & Analytics Engine
product: yhealth-platform
status: completed
completed: 2026-06-15
milestone_type: development
---

# [M-021] Accountability Contract Hardening & Analytics Engine

## Summary
Two workstreams: (1) **Accountability Contract Hardening** — full remediation of the 2026-06-10 commitment-contract audit (8 Critical, 7 Risk/Ethics, 5 Architectural findings — all resolved), covering the contract lifecycle state machine, enforcer acceptance handshake, consent-gated SOS wellness-check, and variable-reward wiring; (2) **Analytics Engine** — an ECharts-based cross-domain analytics system (`AnalyticsEngine` orchestrator, `CrossDomainCorrelator`, `BehavioralIntelligenceService`, `MetricRegistry`, `OutputFormatter`) exposing `runAnalyticsQuery` / `getBehavioralProfile` / `getLifestyleBalanceRadar` as AI coach tools.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Contract enforcement reads canonical workout table, not `activity_events` | Audit (C-2) found `activity_events` was near-empty — enforcement was silently scoring against no data |
| Per-day dedup on contract violations | Audit (C-3) found no dedup caused a single bad day to trigger penalties every 2 hours |
| Enforcer alerts require an acceptance handshake + per-contact consent | Audit (C-7/R-6) found alerts could reach non-consenting recipients — closed as a hard consent gate, not a soft warning |
| SOS wellness-check revived as two-stage, consent-gated | Audit (R-3) found the safety net was dead; two-stage design avoids false-alarm fatigue while keeping a real escalation path |
| Coach given contract-awareness tools (`proposeContract`, context injection) | Audit (C-5) found "AI enforces" was false — the coach had zero contract tools; this closes that gap |
| Analytics Engine built on ECharts (Balencia dark theme), not the existing Recharts/Chart.js stack | Needed a renderer capable of the chart-selection-rule + artifact-dispatch pattern the coach's `ArtifactCard` requires |
| SOS cron registration and 2 minor items explicitly declined | Job built but not wired (SOS cron); Arch-1/Arch-3 cosmetic DDL dedupe declined by design — tracked as intentional deferrals, not gaps |

## Artifacts Created

### Backend Services — Accountability Hardening
- Contract lifecycle state machine (closed IDOR — Arch-4)
- Enforcer acceptance handshake service (C-7/R-6)
- SOS wellness-check service, two-stage consent-gated (R-3)
- `proposeContract` coach tool, active-contract context injection (C-5)
- Shared objective-metric resolver (Arch-3)
- Variable-reward engine wired into pledge completion

### Backend Services — Analytics Engine
- `AnalyticsEngine` orchestrator (LLM insight generation + fallback)
- `CrossDomainCorrelator` (lag-based correlation analysis)
- `BehavioralIntelligenceService` (trend, decay, loop, consistency detection)
- `MetricRegistry` (WHOOP/biometrics/nutrition/habits/wellbeing/finance/fitness/goals)
- `OutputFormatter` (chart-selection rules + response assembly)

### Frontend
- ECharts renderer component (Balencia dark theme)
- `ArtifactCard` ECharts engine dispatch
- `AnalyticsDashboard` tab component
- `ContractDetailModal`, `CreateContractModal`, `TriggerConfigModal`, `SocialAccountabilitySection` (accountability tab)

### Database
- Contract lifecycle schema fixes (day-boundary + settlement gate — E-17)

## Context

The commitment-contract audit (`docs/2026-06-10-commitment-contract-system-audit.md`, 83KB) is one of the most thoroughly remediated audits in the platform's history — every Critical, Risk/Ethics, and Architectural finding is marked resolved in the doc's own 2026-06-14 remediation-status section. A small number of items were explicitly deferred (email delivery channel, SOS cron wiring, intra-window timing sliver) rather than silently dropped. See `AUDIT-FINDINGS-AND-GAPS.md §1` for the full finding-ID-to-resolution table.

## Session Reference

| Field | Value |
|-------|-------|
| **Session Date** | 2026-05-21 (Analytics Engine) / 2026-06-11 to 2026-06-14 (Accountability Hardening) |
| **Participants** | Hamza |
| **Related Milestones** | M-020 (Witness peer-verification extends this contract system) |

---
*Created: 2026-07-08 | Product: yhealth-platform | Milestone: M-021*
