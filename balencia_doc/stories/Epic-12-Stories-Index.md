# Epic 12: Career Pillar & Execution OS - Story Index

> **Epic:** E12 - Career Pillar & Execution OS
> **Source:** `prd-epics/PRD-Epic-12-Career-Pillar.md`
> **Created:** 2026-07-08
> **Stories:** 14 (12 Must Have, 2 Should Have)
> **Build Window:** Shipped 2026-06-23 through 2026-07-03 (Must-Have tier)

---

## Story Index

| Story ID | Title | Feature | Priority | Status | File |
|----------|-------|---------|----------|--------|------|
| S12.1.1 | 5-Level Career Progression System | F12.1 | P0 | Done | [View](S12-01-five-level-career-progression.md) |
| S12.2.1 | Weekly Task Scheduling, Cadence & Carryover | F12.2 | P0 | Done | [View](S12-02-weekly-task-scheduling-cadence.md) |
| S12.2.2 | Weekly Progress Scoring & Focus Time Logging | F12.2 | P0 | Done | [View](S12-03-weekly-progress-scoring-focus-time.md) |
| S12.3.1 | AI-Drafted Roadmap Editing (Creation-Time) | F12.3 | P0 | Done | [View](S12-04-ai-drafted-roadmap-editing.md) |
| S12.3.2 | In-Plan Task Management & Evidence Gating | F12.3 | P0 | Done | [View](S12-05-in-plan-task-management.md) |
| S12.4.1 | Focus Areas — Per-Goal Scoped Trackers | F12.4 | P0 | Done | [View](S12-06-focus-areas-scoped-trackers.md) |
| S12.5.1 | Career Consistency Heatmap | F12.5 | P0 | Done | [View](S12-07-consistency-heatmap.md) |
| S12.5.2 | Momentum Chart & Trend Classification | F12.5 | P0 | Done | [View](S12-08-momentum-chart-trend-classification.md) |
| S12.6.1 | Obstacle Plan & Root-Cause Capture | F12.6 | P0 | Done | [View](S12-09-obstacle-plan-root-cause.md) |
| S12.6.2 | Career Badges & Milestone Rewards | F12.6 | P0 | Done | [View](S12-10-career-badges-milestones.md) |
| S12.7.1 | AI Coach Career CRUD Tools & Confirmation Gating | F12.7 | P0 | Done | [View](S12-11-ai-coach-career-crud-tools.md) |
| S12.7.2 | Recovery/Restart Flows & Live Obstacle Plan Access via SIA | F12.7 | P0 | Done | [View](S12-12-recovery-restart-flows.md) |
| S12.8.1 | AI Career Review Suite (Resume / Portfolio / Skill Gap) | F12.8 | P1 | Not Started | [View](S12-13-ai-career-review-suite.md) |
| S12.9.1 | Application Tracker | F12.9 | P1 | Not Started | [View](S12-14-application-tracker.md) |

**Status Summary:** Done: 12 | Not Started: 2
**Priority Summary:** P0 (Must Have): 12 | P1 (Should Have): 2

### Should-Have Verification Gap

Both P1 stories (S12.8.1, S12.9.1) are named in the source design doc (`docs/career-module.md`) and referenced in `PRD-Epic-12-Career-Pillar.md`'s "MVP Scope & Build Status" section, but their build status is **not confirmed** as of this PRD (2026-07-08). Treat "Not Started" as "unverified, assume not live" rather than a hard guarantee of zero code — a codebase audit is required before either is planned into a sprint. See each story's Open Questions.

| Story | Gap | Required Action |
|-------|-----|-----------------|
| S12.8.1 | `career.resume.review`, `career.portfolio.review`, `career.ai.skill_gap_analysis` tools named in design, unconfirmed built | Audit LangGraph career tool registry; confirm which (if any) tools exist before scoping |
| S12.9.1 | `career_applications` table exists in schema, but Application Tracker UI/tool surface (`career.application.*`) is unconfirmed | Audit `/career` Applications tab + `career.application.*` tool registry; this also unblocks F12.4's applications/interviews focus areas |

---

## Dependency Diagram

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                    EPIC 12 STORY DEPENDENCIES                                 │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  PHASE 1: PROGRESSION FOUNDATION                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.1.1 (5-Level Progression) ─── mirrors E5 Fitness level grammar   │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                   │                                           │
│                                   ▼                                           │
│  PHASE 2: WEEKLY EXECUTION LOOP                                               │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.2.1 (Weekly Scheduling/Cadence) ──▶ S12.2.2 (Scoring/Focus Time) │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                   │                                           │
│                                   ▼                                           │
│  PHASE 3: TASK EDITING                                                        │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.3.1 (AI Draft Editing) ──▶ S12.3.2 (In-Plan Task Mgmt)          │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                   │                                           │
│                    ┌──────────────┴──────────────┐                           │
│                    ▼                             ▼                           │
│  PHASE 4: PERSONALIZATION          PHASE 5: ANALYTICS                        │
│  ┌────────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │ S12.4.1 (Focus Areas)       │   │ S12.5.1 (Heatmap) ──▶ S12.5.2        │  │
│  │                              │   │                    (Momentum Chart)  │  │
│  └────────────────────────────┘   └──────────────────────────────────────┘  │
│                    │                             │                           │
│                    └──────────────┬──────────────┘                           │
│                                   ▼                                           │
│  PHASE 6: STALL RECOVERY                                                      │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.6.1 (Obstacle Plan) ──▶ S12.6.2 (Badges & Milestones)            │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                   │                                           │
│                                   ▼                                           │
│  PHASE 7: AI COACH INTEGRATION                                                │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.7.1 (CRUD Tools + Confirmation) ──▶ S12.7.2 (Recovery/Restart)   │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                   │                                           │
│                                   ▼  (unverified — Should-Have, not scheduled)│
│  PHASE 8: SHOULD-HAVE CANDIDATES (Not Started)                                │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  S12.8.1 (AI Review Suite)      S12.9.1 (Application Tracker)         │  │
│  │  (blocked on codebase audit)     (unblocks F12.4 app/interview trackers)│  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                                │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature → Story Coverage Matrix

| Epic Feature | Story ID(s) | Tier | Coverage |
|--------------|-------------|------|----------|
| F12.1: 5-Level Career Progression System | S12.1.1 | Must Have | 100% |
| F12.2: Weekly Execution Engine | S12.2.1, S12.2.2 | Must Have | 100% |
| F12.3: Per-Level Task Editor | S12.3.1, S12.3.2 | Must Have | 100% |
| F12.4: Focus Areas (Per-Goal Scoped Trackers) | S12.4.1 | Must Have | 100% |
| F12.5: Career Analytics (Heatmap + Momentum) | S12.5.1, S12.5.2 | Must Have | 100% |
| F12.6: Career Obstacle Plan + Resources | S12.6.1, S12.6.2 | Must Have | 100% |
| F12.7: AI Coach Career Tools (LangGraph) | S12.7.1, S12.7.2 | Must Have | 100% |
| F12.8: AI Career Review Suite (resume/portfolio/skill gap) | S12.8.1 | Should Have | Unverified — story exists to track the gap, not to certify build |
| F12.9: Application Tracker | S12.9.1 | Should Have | Unverified — story exists to track the gap, not to certify build |

**Completeness Verification:** All 7 Must-Have features (F12.1–F12.7) mapped to 12 stories at 100% coverage of documented, shipped acceptance criteria. The 2 Should-Have stories exist to make the gap explicit and trackable, not to imply completion.

---

## Implementation Sequence

### Sprint 1: Progression Foundation & Weekly Loop
| Order | Story | Rationale |
|-------|-------|-----------|
| 1 | S12.1.1 | 5-Level Progression — structural skeleton every other feature rolls up into |
| 2 | S12.2.1 | Weekly Task Scheduling & Cadence — the load-bearing execution loop |
| 3 | S12.2.2 | Weekly Progress Scoring & Focus Time Logging — closes the weekly loop |

### Sprint 2: Task Editing
| Order | Story | Rationale |
|-------|-------|-----------|
| 4 | S12.3.1 | AI-Drafted Roadmap Editing — draft-then-confirm at goal creation |
| 5 | S12.3.2 | In-Plan Task Management & Evidence Gating — ongoing plan maintenance |

### Sprint 3: Personalization & Analytics
| Order | Story | Rationale |
|-------|-------|-----------|
| 6 | S12.4.1 | Focus Areas — per-goal scoped trackers, feeds analytics relevance |
| 7 | S12.5.1 | Consistency Heatmap — visual layer over the weekly event stream |
| 8 | S12.5.2 | Momentum Chart & Trend Classification — trend detection, feeds Obstacle Plan trigger |

### Sprint 4: Stall Recovery & AI Coach Integration
| Order | Story | Rationale |
|-------|-------|-----------|
| 9 | S12.6.1 | Obstacle Plan & Root-Cause Capture — catches stalls before abandonment |
| 10 | S12.6.2 | Career Badges & Milestone Rewards — gamification layer, code-seeded catalog |
| 11 | S12.7.1 | AI Coach Career CRUD Tools & Confirmation Gating — conversational front door |
| 12 | S12.7.2 | Recovery/Restart Flows & Live Obstacle Plan Access via SIA — closes the loop between chat and `/obstacles` |

### Sprint 5 (Future — requires codebase audit before scheduling): Should-Have Candidates
| Order | Story | Rationale |
|-------|-------|-----------|
| 13 | S12.9.1 | Application Tracker — unblocks F12.4's applications/interviews focus areas |
| 14 | S12.8.1 | AI Career Review Suite — premium resume/portfolio/skill-gap review tools |

---

## Future Candidates (Advanced-Later Tier — not broken into stories)

Per `PRD-Epic-12-Career-Pillar.md`'s "Advanced Later (❌ Not built)" section, the following are named in the source design (`docs/career-module.md`) but are **not built, not scoped, and intentionally not broken into stories** at this time — listed here for traceability only, matching how `PROGRESS.md` tracks post-MVP deferred scope elsewhere in this doc system:

- AI interview simulation (full multi-turn mock interview, beyond `evaluate_answer` scoring)
- Job matching
- LinkedIn optimization
- Salary negotiation coach
- Mentor matching
- Community leaderboard (career-specific)
- Career templates marketplace
- Freelance client tracker
- Certification tracker
- Proactive nudge engine enablement (`career.proactive.generate_nudge`, `.schedule_scan` — infrastructure exists per F12.7, but is flag-gated OFF; this is a rollout/flag decision, not new build, so it is intentionally excluded from both the Must-Have and Should-Have story sets above)

These should re-enter the pipeline through PLAN → CONTRACT → BUILD (per the platform's Prime Directives), not be assumed a "small addition" onto the Should-Have stories above.

---

*Epic 12: Career Pillar & Execution OS Stories Index | Balencia Platform | 2026-07-08*
