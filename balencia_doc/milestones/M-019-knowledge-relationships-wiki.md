---
type: milestone
id: M-019
title: Relationships CRM, Life Correlation Matrix, Knowledge Graph & Wiki Neural Graph
product: yhealth-platform
status: completed
completed: 2026-07-07
milestone_type: development
---

# [M-019] Relationships CRM, Life Correlation Matrix, Knowledge Graph & Wiki Neural Graph

## Summary
Four related knowledge/intelligence surfaces shipped 2026-06-05 through 2026-07-07: (1) **Relationships CRM** — a personal-relationship pillar (Social Health) with a connection graph, follow, and personal contacts; (2) **Life Correlation Matrix (LCM)** — a cross-pillar directed PostgreSQL graph (10 nodes) powering buddy-suggestion and health-correlation refinements; (3) **Knowledge Graph** — a graph builder with typed nodes, filters, and D3 force-graph visualization at `/knowledge-graph`; (4) **Wiki Neural Graph** — a 4th "Graph" tab on the existing Wiki module rendering a living-brain canvas visualization of the user's own wiki pages and links.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Relationships modeled as its own pillar, not a Contacts feature | Matches product thesis — relationship health is a coaching signal, not just a rolodex |
| LCM as a directed graph over 10 life-domain nodes | Enables root-cause/ripple-effect reasoning the coach can traverse, not just flat correlation pairs |
| Knowledge Graph and Wiki Graph as separate surfaces | Knowledge Graph = platform-wide typed-entity graph; Wiki Graph = personal wiki-page link graph — different data models, different purposes |
| D3 force-graph for Knowledge Graph, custom canvas engine for Wiki Graph | Wiki Graph needed a lighter, app-consistent "living-brain" aesthetic; D3 force-graph fit the more data-dense Knowledge Graph use case |
| LCM feeds both LCM tab UI and SIA's Life Correlation Controller | Single source of truth — no duplicate correlation computation between the dashboard tab and the coach's reasoning layer |

## Artifacts Created

### Backend Services
- LCM cross-pillar directed graph engine + buddy-suggestion refinements
- Knowledge Graph builder service (typed nodes, filters)
- Wiki synthesizer wired into all activity-tool handlers (6 pipeline gaps repaired)
- Relationships CRM services — connection graph, follow, personal contacts

### API Routes
- `knowledge-graph.controller.ts` — Knowledge Graph CRUD + query
- `GET /api/v1/wiki/graph` — Wiki Neural Graph data
- `personal-contacts.controller.ts`, `follow.controller.ts`

### Frontend
- `/knowledge-graph` page — `KnowledgeGraphTab` + D3 force-graph components, filters, node/entry detail modals
- Wiki 4th tab — pure canvas engine + glass panel renderer for the living-brain visualization
- `LifeMatrixTab` (dashboard) — LCM visualization
- Relationships Hub — animated network energy, honest empty state (dashboard `overview/`)

### Database
- LCM graph tables (10-node directed schema)
- Knowledge Graph node/edge tables
- Relationships/connections tables

## Context

Knowledge Graph and Wiki Graph reached UI parity on 2026-07-06/07 as part of the same documentation/knowledge push that also shipped Reputation and Document Intelligence trends pagination. LCM originated 2026-06-05 as the "Life Correlation Matrix cross-pillar engine" and was refined through 2026-07-06 (health correlation + buddy-suggestion refinements). See `MODULES-AND-FEATURES.md §3` and `§6` for current feature status.

## Session Reference

| Field | Value |
|-------|-------|
| **Session Date** | 2026-06-05 to 2026-07-07 |
| **Participants** | Hamza |
| **Related Milestones** | M-016 (SIA vNext — LCM feeds Life Correlation Controller), M-018 (Social Growth OS — buddy suggestions) |

---
*Created: 2026-07-08 | Product: yhealth-platform | Milestone: M-019*
