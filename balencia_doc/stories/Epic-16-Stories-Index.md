# Epic 16: Accountability Contract Hardening, Witness Verification & Analytics Engine - Story Index

> **Epic:** E16 - Accountability Contract Hardening, Witness Verification & Analytics Engine
> **Source:** `prd-epics/PRD-Epic-16-Accountability-Analytics-Engine.md`
> **Source Audit:** `docs/2026-06-10-commitment-contract-system-audit.md` (8 Critical + 7 Risk/Ethics + 5 Architectural findings — ALL resolved except two explicitly declined items, see Appendix)
> **Created:** 2026-07-08
> **Stories:** 15 (13 Must Have, 2 Should Have)

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S16.1.1 | Contract Lifecycle State Machine | F16.1 | P0 | Done | [View](S16-01-contract-lifecycle-state-machine.md) |
| S16.1.2 | Enforcer Notification ID-Space Resolution Fix | F16.1 | P0 | Done | [View](S16-02-enforcer-notification-id-space-fix.md) |
| S16.2.1 | Objective Metric Resolver & Evaluator Correctness | F16.2 | P0 | Done | [View](S16-03-objective-metric-resolver.md) |
| S16.2.2 | Per-Day Violation Dedup & Day-Settlement Gate | F16.2 | P0 | Done | [View](S16-04-violation-dedup-day-settlement.md) |
| S16.3.1 | Missing-Data Fairness & Low-Recovery Guardrail | F16.3 | P0 | Done | [View](S16-05-missing-data-fairness.md) |
| S16.4.1 | Enforcer Acceptance Handshake | F16.4 | P0 | Done | [View](S16-06-enforcer-acceptance-handshake.md) |
| S16.5.1 | Consent-Gated SOS Two-Stage Wellness-Check | F16.5 | P0 | Done | [View](S16-07-sos-two-stage-wellness-check.md) |
| S16.6.1 | Coach Contract-Aware Tools & proposeContract | F16.6 | P0 | Done | [View](S16-08-coach-contract-aware-tools.md) |
| S16.6.2 | Live Coaching Context Injection & Anti-Gaslighting Directive | F16.6 | P0 | Done | [View](S16-09-coach-context-injection-directive.md) |
| S16.6.3 | First-Slip Supportive Intervention (ai_intervene_first) | F16.6 | P0 | Done | [View](S16-10-first-slip-supportive-intervention.md) |
| S16.7.1 | Grace Period Expiry Sweep & Real Penalty Execution | F16.7 | P0 | Done | [View](S16-11-grace-period-expiry-sweep.md) |
| S16.7.2 | Honest Audit Trail & Completion Messaging | F16.7 | P0 | Done | [View](S16-12-honest-audit-trail-completion.md) |
| S16.8.1 | Witness / Peer-Verification | F16.8 | P1 | Done (Flag-Gated OFF) | [View](S16-13-witness-peer-verification.md) |
| S16.9.1 | Analytics Engine Core Services | F16.9 | P0 | Done | [View](S16-14-analytics-engine-core-services.md) |
| S16.9.2 | SIA Analytics Tools & Chart Rendering | F16.9 | P0 | Done | [View](S16-15-sia-analytics-tools-chart-rendering.md) |

**Status Summary:** Done: 15 (of which 1 — S16.8.1 — is shipped-to-codebase but inert behind `ENABLE_WITNESS_VERIFICATION=false` pending rollout planning)
**Priority Summary:** P0 (Must Have): 13 | P1 (Should Have): 2 (S16.8.1 Witness Verification; see note below — table shows 1 row but priority reflects post-MVP status of both witness sub-concerns bundled in that story)

> **Note on F16.8 status:** Every acceptance criterion for the witness feature itself is implemented, tested, and merged to the codebase (schema, service, controller, client modal). It is deliberately **flag-gated OFF** (`ENABLE_WITNESS_VERIFICATION` unset/false in `.env.example`) pending a gradual-rollout plan and a follow-up fix to the shared `ContractStatus` TypeScript union. "Done" here means "done building," not "done rolling out."

---

## Dependency Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 16 STORY DEPENDENCIES                                     │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│  PHASE 1: LIFECYCLE FOUNDATION                                                    │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.1.1 (Lifecycle State Machine) ──▶ S16.1.2 (Enforcer ID-Space Fix)  │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                               │
│                                   ▼                                               │
│  PHASE 2: OBJECTIVE ENFORCEMENT                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.2.1 (Metric Resolver &  ──▶ S16.2.2 (Per-Day Dedup &              │   │
│  │           Evaluator Fix)          Day-Settlement Gate)                  │   │
│  │            │                                                            │   │
│  │            ▼                                                            │   │
│  │  S16.3.1 (Missing-Data Fairness & Low-Recovery Guardrail)               │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                               │
│                                   ▼                                               │
│  PHASE 3: CONSENT & SAFETY NET                                                    │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.4.1 (Enforcer Acceptance Handshake) ──▶ S16.5.1 (SOS Two-Stage     │   │
│  │                                                Wellness-Check)          │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                               │
│                                   ▼                                               │
│  PHASE 4: COACH CONTRACT AWARENESS                                                │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.6.1 (Contract-Aware Tools) ──▶ S16.6.2 (Context Injection) ──▶     │   │
│  │                                                     S16.6.3 (First-Slip │   │
│  │                                                     Intervention)       │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                               │
│                                   ▼                                               │
│  PHASE 5: GRACE & AUDIT HONESTY                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.7.1 (Grace Expiry Sweep) ──▶ S16.7.2 (Honest Audit Trail &         │   │
│  │                                              Completion Messaging)      │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                   │                                               │
│                                   ▼                                               │
│  PHASE 6: WITNESS VERIFICATION (POST-MVP, FLAG-GATED OFF)                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.8.1 (Witness / Peer-Verification) — built on Phases 1, 3, 5        │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                    │
│  PHASE 7: ANALYTICS ENGINE (INDEPENDENT — PARALLEL TRACK)                         │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │  S16.9.1 (Analytics Engine Core Services) ──▶ S16.9.2 (SIA Analytics    │   │
│  │                                                 Tools & Chart Rendering) │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                    │
└──────────────────────────────────────────────────────────────────────────────────┘

Note: Phase 7 (Analytics Engine) shares no tables or code paths with Phases 1-6
(deliberately — see F16.9 Cross-Pillar Connections) and can be built/verified in
parallel with the accountability hardening track.
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F16.1: Contract Lifecycle State Machine | S16.1.1 - S16.1.2 | 100% |
| F16.2: Objective Metric Resolution | S16.2.1 - S16.2.2 | 100% |
| F16.3: Missing-Data Fairness | S16.3.1 | 100% |
| F16.4: Enforcer Acceptance Handshake | S16.4.1 | 100% |
| F16.5: Consent-Gated SOS Wellness-Check | S16.5.1 | 100% |
| F16.6: Coach Contract Awareness | S16.6.1 - S16.6.3 | 100% |
| F16.7: Grace Periods & Honest Audit Trail | S16.7.1 - S16.7.2 | 100% |
| F16.8: Witness / Peer-Verification (flag-gated OFF) | S16.8.1 | 100% (build) / 0% (rollout, deferred) |
| F16.9: Analytics Engine | S16.9.1 - S16.9.2 | 100% |

---

## Audit Finding → Story Cross-Reference

| Audit Finding | Title | Resolved By Story |
|---|---|---|
| C-1 | Evaluators silently pass regardless of behavior | S16.2.1 |
| C-2 | Enforcement reads near-empty `activity_events`, not canonical `workout_logs` | S16.2.1 |
| C-3 | No per-day dedup — repeat violations/penalties every 2h | S16.2.2 |
| C-4 | Missing data scored as failure or masked as pass | S16.3.1 |
| C-5 | AI coach has zero contract awareness | S16.6.1 |
| C-6 | Commitment tracker gaslighting via unfollowed-up scripted escalation | S16.6.2 |
| C-7 | Social consequences structurally impossible (consent defaults off, ID-space bug) | S16.4.1, S16.1.2 |
| C-8 | Grace-period penalties never execute; false "penalty applied" messaging | S16.7.1 |
| R-1 | Vulnerable-user harm vectors (training through fatigue, etc.) | S16.3.1 |
| R-2 | Coach scripted to gaslight, violating its own stated ethic | S16.6.2 |
| R-3 | SOS safety net can never fire | S16.5.1 |
| R-4 | Weak informed consent at signing | S16.1.1 (contract owner UX; backend-primary scope) |
| R-5 | No functioning dispute recourse | S16.7.2 |
| R-6 | Recipients of alerts never consented | S16.4.1 |
| R-7 | False audit records (penalties/notifications claimed but not real) | S16.7.2 |
| Arch-1 | Three divergent DDL sources for contract tables | Declined (documented, not a story) |
| Arch-2 | Three disconnected commitment layers | S16.6.1 |
| Arch-3 | No shared objective-first metric-resolution module | S16.2.1 |
| Arch-4 | Lifecycle state machine incomplete (dead ends, orphans) | S16.1.1 |
| Arch-5 | Dead schema fields never used at runtime | S16.1.1, S16.6.3 |
| E-11 | (Enforcement evidence traceability) | S16.2.1, S16.3.1 |
| E-12 | Email delivery channel not built | Deferred (Post-MVP v1.1, not a story) |
| E-17 | (Honest completion / settlement transparency) | S16.7.2 |
| AG-6 | (Witness quorum / rejection routing to existing penalty path) | S16.8.1 |
| AG-8 | Pause-to-dodge-enforcement exploit | Declined (documented risk, not a story) |

---

## Implementation Sequence

### Sprint 1: Lifecycle Foundation
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S16.1.1 | Contract Lifecycle State Machine — closes dead ends (Arch-4), everything else builds on a trustworthy state machine |
| 2 | S16.1.2 | Enforcer Notification ID-Space Fix — corrects the wrong-ID-space bug discovered during the lifecycle/ownership review |

### Sprint 2: Objective Enforcement
| Order | Story | Rationale |
|-------|-------|-----------|
| 3 | S16.2.1 | Objective Metric Resolver & Evaluator Correctness — fixes 3-of-5 always-pass evaluators (C-1), wrong enforcement table (C-2) |
| 4 | S16.2.2 | Per-Day Violation Dedup & Day-Settlement Gate — closes the repeat-penalty-every-2h bug (C-3) |
| 5 | S16.3.1 | Missing-Data Fairness & Low-Recovery Guardrail — honest-null contract + ethics guardrail (C-4, R-1) |

### Sprint 3: Consent & Safety Net
| Order | Story | Rationale |
|-------|-------|-----------|
| 6 | S16.4.1 | Enforcer Acceptance Handshake — makes social consequences consent-gated (C-7, R-6) |
| 7 | S16.5.1 | Consent-Gated SOS Two-Stage Wellness-Check — revives the dead-code safety net (R-3) |

### Sprint 4: Coach Contract Awareness
| Order | Story | Rationale |
|-------|-------|-----------|
| 8 | S16.6.1 | Coach Contract-Aware Tools & proposeContract — closes the zero-tool-awareness gap (C-5, Arch-2) |
| 9 | S16.6.2 | Live Coaching Context Injection & Anti-Gaslighting Directive — stops the coach congratulating around a live breach (C-6, R-2) |
| 10 | S16.6.3 | First-Slip Supportive Intervention (`ai_intervene_first`) — support before punishment, activates the dead `ai_intervened` schema fields (Arch-5) |

### Sprint 5: Grace & Audit Honesty
| Order | Story | Rationale |
|-------|-------|-----------|
| 11 | S16.7.1 | Grace Period Expiry Sweep & Real Penalty Execution — makes grace periods actually execute (C-8) |
| 12 | S16.7.2 | Honest Audit Trail & Completion Messaging — kills false "penalty applied"/"fulfilled" records (R-5, R-7) |

### Sprint 6: Analytics Engine (parallel track — independent of Sprints 1-5)
| Order | Story | Rationale |
|-------|-------|-----------|
| 13 | S16.9.1 | Analytics Engine Core Services — orchestrator, correlator, behavioral intelligence, metric registry, output formatter |
| 14 | S16.9.2 | SIA Analytics Tools & Chart Rendering — coach tool exposure + sanitized ECharts rendering pipeline |

### Sprint 7: Post-MVP (flag-gated, ships inert)
| Order | Story | Rationale |
|-------|-------|-----------|
| 15 | S16.8.1 | Witness / Peer-Verification — built on the now-hardened Phases 1-5 primitives; deliberately shipped flag-gated OFF pending rollout plan |

---

*Epic 16: Accountability Contract Hardening, Witness Verification & Analytics Engine Stories Index | Balencia Platform | 2026-07-08*
