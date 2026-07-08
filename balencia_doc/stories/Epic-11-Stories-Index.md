# Epic 11: SIA Cognitive OS & Provenance - Story Index

> **Epic:** E11 - SIA Cognitive OS & Provenance Overhaul
> **Source:** `prd-epics/PRD-Epic-11-SIA-Cognitive-OS.md`
> **Created:** 2026-07-08
> **Stories:** 11 (11 Must Have, 0 Should Have)
> **Note:** This index documents Milestone M-016 (completed 2026-07-03), Waves 0-2, retroactively.

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S11.1.1 | Whole-Life Scope & Rebrand (Cia → SIA) | F11.1 | P0 | Done | [View](S11-01-whole-life-scope-rebrand.md) |
| S11.2.1 | Provenance v2 (Honesty Layer) | F11.2 | P0 | Done | [View](S11-02-provenance-v2-honesty-layer.md) |
| S11.3.1 | Evidence & Answerability Gate (Cross-System Axes) | F11.3 | P0 | In Progress | [View](S11-03-evidence-answerability-gate.md) |
| S11.4.1 | Context Assembler: Accountability Risk & Contradictions | F11.4 | P0 | Done | [View](S11-04-context-assembler-risk-contradictions.md) |
| S11.4.2 | Context Assembler: Personal Baselines & Deviation Framing | F11.4 | P0 | Done | [View](S11-05-context-assembler-personal-baselines.md) |
| S11.5.1 | Turn Intelligence Contract | F11.5 | P0 | In Progress | [View](S11-06-turn-intelligence-contract.md) |
| S11.6.1 | Evidence-Driven Prompt Controllers (Confidence, Transparency, Answerability Recovery) | F11.6 | P0 | Done | [View](S11-07-evidence-driven-prompt-controllers.md) |
| S11.6.2 | Correlation & Accountability Prompt Controllers (Life Correlation, Predictive, Root-Cause, Accountability) | F11.6 | P0 | Done | [View](S11-08-correlation-accountability-controllers.md) |
| S11.7.1 | Executive Daily Briefing & Life Operating Map APIs | F11.7 | P0 | Done | [View](S11-09-executive-briefing-life-operating-map.md) |
| S11.7.2 | Root Cause Explorer, Ripple Simulator, Future Self Timeline & Memory Explorer APIs | F11.7 | P0 | Done | [View](S11-10-root-cause-ripple-future-self-memory.md) |
| S11.8.1 | Client Cognitive OS Dashboard | F11.8 | P0 | Done | [View](S11-11-client-cognitive-os-dashboard.md) |

**Status Summary:** Done: 9 | In Progress: 2
**Priority Summary:** P0 (Must Have): 11 | P1 (Should Have): 0

### Implementation Gaps (In Progress Stories)

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S11.3.1 | `ENABLE_GATE_CROSS_SYSTEM` defaults OFF — axes are computed every turn but do not yet gate/block live answers in production | Run live-PG E2E latency/mode validation (tracker item T9), then flip flag where appropriate |
| S11.5.1 | Live verifier (`npm run intelligence:verify-turn-contract`) not yet run with a real JWT in target deployment env; alert endpoint not yet wired to production on-call routing | Execute live verifier in target env; wire `/api/health/premium-intelligence/alerts` into on-call system |

### Tracked Rollout-Safety Gaps (Done Stories, Flagged Not Hidden)

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S11.6.1 | Confidence Controller and Transparency Prompt Controller ship unflagged — no runtime kill-switch; a regression requires a code deploy to roll back | Add feature flags with default-ON (to preserve current behavior) but runtime-toggleable |
| S11.6.2 | `ENABLE_LCM_ROOT_CAUSE` defaults ON against the reviewer's explicit recommendation of default-OFF for a dark first deploy | Flip default to OFF, or explicitly ratify the ON default with Product sign-off |
| S11.7.2 | `totalScore === 0` in the Executive Daily Briefing is not yet distinguished from "no signal" (`executive-daily-briefing.service.ts:110`) | Tracked follow-up `B-m1` — treat literal zero as honest-null where appropriate |

---

## Dependency Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 11 STORY DEPENDENCIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: FOUNDATION (WHOLE-LIFE IDENTITY)                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.1.1 (Whole-Life Scope & Rebrand)                               │  │
│  │  — unlocks every downstream feature's cross-domain reasoning        │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 2: HONESTY LAYER                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.2.1 (Provenance v2 — measured/derived/self-report labeling)   │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 3: EVIDENCE INFRASTRUCTURE (WAVE 0)                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.3.1 (Cross-System Axes) ◀──┬──▶ S11.4.1 (Risk & Contradictions)│  │
│  │                                  └──▶ S11.4.2 (Personal Baselines)  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 4: STRUCTURAL GUARANTEE                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.5.1 (Turn Intelligence Contract)                               │  │
│  │  — audits every stage produced by Phases 1-3 and Phase 5            │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 5: BEHAVIORAL CONTROLLERS (WAVE 2)                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.6.1 (Evidence-Driven Controllers) ──┬──▶ reports to S11.5.1   │  │
│  │  S11.6.2 (Correlation/Accountability) ───┘                          │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 6: INSPECTABLE SURFACES (INTELLIGENCE API SUITE)                     │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.7.1 (Briefing + Life Operating Map) ──┬──▶ shared domain types │  │
│  │  S11.7.2 (Root Cause/Ripple/Future/Memory) ─┘                       │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼                                         │
│  PHASE 7: CLIENT EXPERIENCE                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S11.8.1 (Client Cognitive OS Dashboard)                            │  │
│  │  — consumes all 6 endpoints from S11.7.1/S11.7.2 via allSettled     │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F11.1: Whole-Life Scope & Rebrand | S11.1.1 | 100% |
| F11.2: Provenance v2 (Honesty Layer) | S11.2.1 | 100% |
| F11.3: Evidence & Answerability Gate (Wave 0) | S11.3.1 | 100% (axis computation live; gate-feed dormant) |
| F11.4: Context Assembler (Wave 1) | S11.4.1 - S11.4.2 | 100% |
| F11.5: Turn Intelligence Contract | S11.5.1 | 100% (wired; ops follow-ups pending) |
| F11.6: Intelligence Prompt Controllers (Wave 2) | S11.6.1 - S11.6.2 | 100% |
| F11.7: Intelligence API Suite | S11.7.1 - S11.7.2 | 100% |
| F11.8: Client Cognitive OS Dashboard | S11.8.1 | 100% |

---

## Implementation Sequence

### Sprint 1: Foundation & Honesty Layer
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S11.1.1 | Whole-Life Scope & Rebrand — identity and domain-scope prerequisite for everything downstream |
| 2 | S11.2.1 | Provenance v2 — honesty layer other stages (baselines, controllers, APIs) build their labeling discipline on top of |

### Sprint 2: Evidence Infrastructure (Wave 0)
| Order | Story | Rationale |
|-------|-------|-----------|
| 3 | S11.3.1 | Cross-System Axes — single source of truth for confidence/answerability evidentiary strength |
| 4 | S11.4.1 | Context Assembler Slice 1 — disengagement risk + contradictions reach the live prompt |
| 5 | S11.4.2 | Context Assembler Slice 2 — personal 30-day baselines replace population-average framing |

### Sprint 3: Structural Guarantee
| Order | Story | Rationale |
|-------|-------|-----------|
| 6 | S11.5.1 | Turn Intelligence Contract — per-turn auditor that makes silent discarding provably impossible |

### Sprint 4: Behavioral Controllers (Wave 2)
| Order | Story | Rationale |
|-------|-------|-----------|
| 7 | S11.6.1 | Evidence-Driven Controllers — Confidence, Transparency, Answerability Recovery |
| 8 | S11.6.2 | Correlation & Accountability Controllers — Life Correlation, Predictive Response, Root-Cause composition, Accountability |

### Sprint 5: Intelligence API Suite
| Order | Story | Rationale |
|-------|-------|-----------|
| 9 | S11.7.1 | Executive Daily Briefing & Life Operating Map — the always-on, cross-pillar surfaces |
| 10 | S11.7.2 | Root Cause Explorer, Ripple Simulator, Future Self Timeline, Memory Explorer — drill-down/interactive surfaces |

### Sprint 6: Client Experience
| Order | Story | Rationale |
|-------|-------|-----------|
| 11 | S11.8.1 | Client Cognitive OS Dashboard — unifies all 6 API surfaces into one resilient console |

---

*Epic 11: SIA Cognitive OS & Provenance | Balencia Platform | 2026-07-08*
