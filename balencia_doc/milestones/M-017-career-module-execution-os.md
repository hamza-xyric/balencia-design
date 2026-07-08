---
type: milestone
id: M-017
title: Career Module & Execution OS
product: yhealth-platform
status: completed
completed: 2026-07-03
milestone_type: development
---

# [M-017] Career Module & Execution OS

## Summary
Net-new Career pillar — schema, services, AI tools, background jobs, API, and UI (`/career`) — shipped 2026-06-23 through 2026-07-03. Adds a Weekly Execution Engine (scheduling, scoring, accountability), per-level task editor, focus areas (per-goal scoped trackers), analytics consistency heatmap, badges, and resource links. Only the Must-Have MVP tier is confirmed built; Should-Have (resume review, skill gap analysis, application tracker) and Advanced-Later (interview simulation, job matching, mentor matching) tiers from the master spec remain unconfirmed or not built.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Career treated as a full pillar, not a goal category | Matches product thesis — pillars feed the coach, need their own data model |
| 5-level career progression system | Mirrors fitness/nutrition pillar structure for consistency |
| Weekly Execution Engine over ad-hoc task lists | Gives the coach a stable cadence to reason about progress |
| MVP scope tiered (Must-Have / Should-Have / Advanced-Later) | Ship core loop first; defer resume/interview/job-matching tooling |
| `normalizeCadence` clamp added post-launch | LLM-generated cadence values overflowed the `cadence VARCHAR(20)` column — fixed via migration 030000 |

## Artifacts Created

### Backend Services
- `career.service.ts`, `career-execution.service.ts`, `career-week.service.ts`, `career-score.service.ts` / `career-scores.service.ts`
- `career-accountability.service.ts`, `career-obstacle-plan.service.ts`, `career-proactive.service.ts`
- `career-profile.service.ts`, `career-progress.service.ts`, `career-resources.service.ts`, `career-schedule.service.ts`, `career-skill.service.ts`, `career-badges.service.ts`, `career-application.service.ts`, `career-evidence.service.ts`, `career-ai.service.ts`

### Controllers & Routes
- `career.controller.ts`, `career-ai.controller.ts`, `career-execution.controller.ts`, `career-extras.controller.ts`

### Frontend
- `/career` page — `CareerPageContent`, `CareerTabs`, `CareerLevelPath`, `CareerLevelTaskEditor`, `CareerAnalyticsDash`, `CareerCalendarView`, `CareerJourneyStatCards`, `CareerMyPlans`, `CareerResourceLinks`, `CareerReminders`, `CareerUpgradeBanner`, `CreateGoalModal`

### Database
- Career schema tables + migration 030000 (`normalizeCadence` clamp fix)

## Context

Career module foundation shipped 2026-06-23, Execution OS backend 2026-06-24, and resource links/execution metadata/chat tools/label sync 2026-07-03. The master spec (`docs/career-module.md`, §22 "MVP Scope") splits scope into three tiers — only Must-Have is confirmed built. See `AUDIT-FINDINGS-AND-GAPS.md §5` for the full Should-Have/Advanced-Later gap list and named unconfirmed tools (`career.resume.review`, `career.interview.*`, `career.application.*`).

## Session Reference

| Field | Value |
|-------|-------|
| **Session Date** | 2026-06-23 to 2026-07-03 |
| **Participants** | Hamza |
| **Related Milestones** | M-009 (Wellbeing Pillar — structural precedent) |

---
*Created: 2026-07-08 | Product: yhealth-platform | Milestone: M-017*
