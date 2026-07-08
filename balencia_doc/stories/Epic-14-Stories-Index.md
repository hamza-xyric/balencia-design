# Epic 14: Relationships CRM, Life Correlation Matrix & Knowledge Systems - Story Index

> **Epic:** E14 - Relationships CRM, Life Correlation Matrix & Knowledge Systems
> **Source:** `prd-epics/PRD-Epic-14-Relationships-Knowledge-Intelligence.md`
> **Created:** 2026-07-08
> **Stories:** 13 (6 Must Have, 7 Should Have)
> **Note:** F14.4 (Personal Wiki) is a cross-reference-only feature documented in its own module PRD and has no stories in this epic.

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S14.1.1 | Add & Manage Personal Contacts | F14.1 | P0 | Done | [View](S14-01-add-manage-personal-contacts.md) |
| S14.1.2 | Relationship Hub Network Visualization | F14.1 | P0 | Done | [View](S14-02-relationship-hub-network-visualization.md) |
| S14.1.3 | Relationship Health Signal & Coach Integration | F14.1 | P1 | Done | [View](S14-03-relationship-health-coach-integration.md) |
| S14.2.1 | LCM Directed Graph Schema & Nightly Computation | F14.2 | P0 | Done | [View](S14-04-lcm-directed-graph-schema-computation.md) |
| S14.2.2 | Life Matrix Dashboard Tab | F14.2 | P1 | Done | [View](S14-05-life-matrix-dashboard-tab.md) |
| S14.2.3 | LCM Evidence Drill-Down & Cross-System Exposure | F14.2 | P1 | Done | [View](S14-06-lcm-evidence-crosssystem-exposure.md) |
| S14.3.1 | Knowledge Graph Federated Fetch & D3 Rendering | F14.3 | P0 | Done | [View](S14-07-knowledge-graph-federated-rendering.md) |
| S14.3.2 | Knowledge Graph Filter Sidebar & Legend | F14.3 | P1 | Done | [View](S14-08-knowledge-graph-filters-legend.md) |
| S14.3.3 | Knowledge Graph Node/Entry Detail Drill-Down | F14.3 | P1 | Done | [View](S14-09-knowledge-graph-node-entry-detail.md) |
| S14.5.1 | Wiki Neural Graph Canvas Rendering & Navigation | F14.5 | P0 | Done | [View](S14-10-wiki-neural-graph-canvas-rendering.md) |
| S14.5.2 | Wiki Neural Graph Empty/Error States & Test Coverage | F14.5 | P1 | Done | [View](S14-11-wiki-neural-graph-states-testing.md) |
| S14.6.1 | Wiki-Synthesizer Evidence Tracking & Handler Coverage | F14.6 | P0 | Done | [View](S14-12-wiki-synthesizer-evidence-handler-coverage.md) |
| S14.6.2 | Wiki-Synthesizer Concurrency Safety & Orphaned-Link Cleanup | F14.6 | P1 | Done | [View](S14-13-wiki-synthesizer-concurrency-cleanup.md) |

**Status Summary:** Done: 13 | In Progress: 0
**Priority Summary:** P0 (Must Have): 6 | P1 (Should Have): 7

### Flagged Follow-Ups (Not Yet Built - Tracked, Not Silently Dropped)

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S14.1.3 | Relationship-strain signal not yet wired to proactive interventions | Wire F14.1 signal into Epic 08's F8.6 Proactive Interventions |
| S14.2.1 | Multi-hop causal chain reasoning ("A drives B drives C") not implemented | LCM Wave 1: extend beyond single-hop directed edges |
| S14.2.3 | Deep Mode "why this direction?" evidence drill-down UI partially implemented | Finish full evidence-explorer UI polish |
| S14.5.1 | WebGL rendering path, "reasoning mode" overlay, dedicated graph toolbar deferred | Explicitly punted at ship time; not scope creep |

---

## Dependency Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 14 STORY DEPENDENCIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: RELATIONSHIPS CRM FOUNDATION (F14.1)                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S14.1.1 (Add/Manage Contacts) ──▶ S14.1.2 (Relationship Hub)      │  │
│  │                                            │                        │  │
│  │                                            ▼                        │  │
│  │                                     S14.1.3 (Coach Integration)     │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼ (relationships domain-signal source)    │
│  PHASE 2: LIFE CORRELATION MATRIX (F14.2)                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S14.2.1 (Directed Graph Schema + Nightly Compute)                  │  │
│  │         │                                                            │  │
│  │         ├──▶ S14.2.2 (Life Matrix Dashboard Tab)                    │  │
│  │         └──▶ S14.2.3 (Evidence Drill-Down + Cross-System Exposure)  │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  PHASE 3: KNOWLEDGE GRAPH (F14.3) - independent of Phases 1-2               │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S14.3.1 (Federated Fetch + D3 Render) ──┬──▶ S14.3.2 (Filters)    │  │
│  │                                            └──▶ S14.3.3 (Detail)    │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  PHASE 4: WIKI SYNTHESIZER RELIABILITY (F14.6) - precondition for Phase 5   │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S14.6.1 (Evidence Tracking + Handler Coverage)                     │  │
│  │         └──▶ S14.6.2 (Concurrency Safety + Orphan Cleanup)          │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                   │                                         │
│                                   ▼ (trustworthy graph data precondition)   │
│  PHASE 5: WIKI NEURAL GRAPH (F14.5)                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  S14.5.1 (Canvas Rendering + Navigation) ──▶ S14.5.2 (States+Tests) │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Coverage |
|--------------|-------------|----------|
| F14.1: Relationships CRM (Social Health Pillar) | S14.1.1 - S14.1.3 | 100% |
| F14.2: Life Correlation Matrix (LCM) | S14.2.1 - S14.2.3 | 100% (Wave 0; multi-hop reasoning flagged as follow-up) |
| F14.3: Knowledge Graph | S14.3.1 - S14.3.3 | 100% |
| F14.4: Personal Wiki (cross-reference only) | N/A | Documented in Personal Wiki module PRD, not this epic |
| F14.5: Wiki Neural Graph | S14.5.1 - S14.5.2 | 100% (WebGL/reasoning-mode/toolbar explicitly deferred) |
| F14.6: Cross-System Data Integrity (Wiki Synthesizer Reliability) | S14.6.1 - S14.6.2 | 100% (all 6 reliability gaps repaired) |

---

## Implementation Sequence

### Sprint 1: Relationships CRM Foundation
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S14.1.1 | Add & Manage Personal Contacts - data entry point, `personal_contacts` table |
| 2 | S14.1.2 | Relationship Hub Network Visualization - dashboard surface, primary user-facing value |
| 3 | S14.1.3 | Relationship Health Signal & Coach Integration - feeds context assembler as a pillar |

### Sprint 2: Life Correlation Matrix
| Order | Story | Rationale |
|-------|-------|-----------|
| 4 | S14.2.1 | Directed Graph Schema & Nightly Computation - core engine, depends on Relationships CRM as a domain source |
| 5 | S14.2.2 | Life Matrix Dashboard Tab - Deep Mode visualization of the computed graph |
| 6 | S14.2.3 | Evidence Drill-Down & Cross-System Exposure - Epic 11/Epic 13 downstream consumption |

### Sprint 3: Knowledge Graph
| Order | Story | Rationale |
|-------|-------|-----------|
| 7 | S14.3.1 | Federated Fetch & D3 Rendering - read-time projection over platform data, core visualization |
| 8 | S14.3.2 | Filter Sidebar & Legend - narrows and self-documents the graph |
| 9 | S14.3.3 | Node/Entry Detail Drill-Down - discovery-to-source-of-truth click path |

### Sprint 4: Wiki Synthesizer Reliability
| Order | Story | Rationale |
|-------|-------|-----------|
| 10 | S14.6.1 | Evidence Tracking & Handler Coverage - closes provenance and coverage gaps first |
| 11 | S14.6.2 | Concurrency Safety & Orphaned-Link Cleanup - hardens the pipeline the Neural Graph depends on |

### Sprint 5: Wiki Neural Graph
| Order | Story | Rationale |
|-------|-------|-----------|
| 12 | S14.5.1 | Canvas Rendering & Navigation - 4th wiki tab, depends on a trustworthy synthesizer (Sprint 4) |
| 13 | S14.5.2 | Empty/Error States & Test Coverage - honest-null discipline + 37 unit + 31 component tests |

---

*Epic 14: Relationships CRM, Life Correlation Matrix & Knowledge Systems Stories Index | Balencia Platform | 2026-07-08*
