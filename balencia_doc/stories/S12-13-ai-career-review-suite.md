---
type: story
id: S12.8.1
title: AI Career Review Suite (Resume / Portfolio / Skill Gap)
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.8
feature_name: AI Career Review Suite (Should-Have, Unconfirmed)
product: yhealth-platform
priority: P1
status: Not Started
created: 2026-07-08
---

# S12.8.1: AI Career Review Suite (Resume / Portfolio / Skill Gap)

## User Story

**As an** Optimization Enthusiast (P3) or Holistic Health Seeker (P1) with career evidence uploaded (resume, portfolio links),
**I want to** get AI-driven review and gap analysis against my target role,
**So that** I know concretely what to improve instead of guessing whether my resume/portfolio is actually competitive.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

> **Build status note:** This story documents a **named-but-unconfirmed** capability set from `docs/career-module.md`'s Phase 7/8 roadmap, reproduced in `PRD-Epic-12-Career-Pillar.md`'s "MVP Scope & Build Status → Should-Have" table. It is **not** verified implemented in the current `/career` build. This story exists to make the gap trackable and plannable, not to imply the feature is live. Treat every capability below as unverified until a direct codebase audit confirms otherwise.

**Named Capabilities (per source design, unconfirmed build status):**

| Capability | Named Tool | API Endpoint (named, unconfirmed) |
|------------|------------|-------------------------------------|
| Resume review | `career.resume.review` | `POST /career/ai/resume-review` |
| Portfolio review | `career.portfolio.review` | `POST /career/ai/portfolio-review` |
| Skill gap analysis | `career.ai.skill_gap_analysis` | `POST /career/ai/skill-gap` |

**Intended User Experience (per source design, not a confirmed spec):**
- User uploads a resume or portfolio link as `career_evidence` (evidence upload path already exists per F12.3/S12.3.2)
- SIA (or a direct UI action) triggers a review tool that analyzes the evidence against the goal's `target_role`
- Output would be structured feedback + a gap list, feeding back into task suggestions (e.g., "Add a metrics-driven bullet point to your resume" as a new `career_tasks` row)

**Relationship to Must-Have Scope:**
- `career_evidence` table and evidence-upload path (S12.3.2) already exist and are Must-Have/Done — this story's gap is specifically the *review/analysis* layer on top of already-uploaded evidence, not the upload mechanism itself
- Premium gating (goal-count limits, gated AI features) infrastructure is built per the Must-Have tier; this story's tools would be examples of the "gated *features themselves*" the PRD flags as largely Should-Have/unconfirmed

---

## Acceptance Criteria

```gherkin
Scenario: [UNVERIFIED] Resume review produces structured feedback
  Given a user has uploaded a resume as career_evidence
  When career.resume.review is invoked against a goal's target_role
  Then structured feedback (strengths, gaps, suggested edits) is returned
  # Status: not confirmed implemented — requires codebase audit before this can be marked verified

Scenario: [UNVERIFIED] Portfolio review produces structured feedback
  Given a user has linked a portfolio as career_evidence
  When career.portfolio.review is invoked
  Then structured feedback on the portfolio relative to the target_role is returned
  # Status: not confirmed implemented

Scenario: [UNVERIFIED] Skill gap analysis identifies missing skills
  Given a goal has a defined target_role and completed levels/tasks
  When career.ai.skill_gap_analysis is invoked
  Then a list of skill gaps relative to the target_role is returned, ideally feeding new task suggestions
  # Status: not confirmed implemented

Scenario: [UNVERIFIED] Review triggers confirmation-gated task creation
  Given a skill gap analysis suggests 3 new tasks
  When the user accepts the suggestion
  Then task creation follows the same confirmation-gating discipline as career.task.bulk_create (S12.3.2)
  # Status: not confirmed implemented; this scenario assumes the existing confirmation model would be reused, not a new one invented
```

---

## Success Metrics

- No confirmed success metrics exist for this capability set in the current PRD — the source design's Phase 7/8 roadmap does not carry target numbers into `PRD-Epic-12-Career-Pillar.md`. Metrics must be defined during the CONTRACT phase before this story is planned into a sprint.

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Not yet specified — would need to match the platform's SIA career tool call latency bar (<2s read, <3s create/update preview) if built to the same standard as F12.7 | Resume/portfolio content is explicitly named as sensitive career data in the PRD's Security & Privacy section — any review tool must go through the same encryption/RBAC/audit-logging discipline as existing evidence handling | Resume content, salary expectations, employment history are flagged sensitive per PRD §Security & Privacy | Not yet specified | Should reuse the existing evidence/object-storage integration pattern (F12.3/S12.3.2), not invent a parallel one |

---

## Dependencies

- **Prerequisite Stories:** S12.3.2 (In-Plan Task Management & Evidence Gating — evidence must already exist to review), S12.7.1 (would extend the same `career.<resource>.<action>` tool-naming convention and confirmation-gating model)
- **Related Stories:** S12.4.1 (Focus Areas — a "resume"/"portfolio" focus area would presumably surface review results)
- **External Dependencies:** None confirmed; likely reuses the platform's LLM provider infrastructure already used for `career.ai.generate_roadmap`

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Review requested with no uploaded evidence | No `career_evidence` row of the required type for the goal | Reject or prompt to upload first | Not yet specified — needs UX definition |
| Review tool returns malformed/incomplete LLM output | Server-side validation on tool output | Not yet specified | Not yet specified |

*This table is intentionally sparse — error handling has not been designed for an unconfirmed feature. Full edge-case enumeration belongs in the CONTRACT phase, not retrofitted here.*

---

## Open Questions

1. **Build status verification is the primary open question.** Before any planning work begins on this story: audit the LangGraph career tool registry for `career.resume.review`, `career.portfolio.review`, and `career.ai.skill_gap_analysis`; audit `/career/ai/resume-review`, `/career/ai/portfolio-review`, `/career/ai/skill-gap` route registration; audit the `/career` client for a Resume/Portfolio/Skill-Gap review UI surface (the 9-tab shell includes a Portfolio tab per the PRD's Build Timeline — confirm whether it has real review functionality or is a shell).
2. If confirmed partially built: which of the three capabilities (resume, portfolio, skill-gap) exist vs. are fully absent?
3. If confirmed unbuilt: should this re-enter as a single story or split into three, given they're independent LLM-review surfaces with potentially different premium-gating rules?
4. What premium tier gates access to this suite, per the Must-Have "premium gates" infrastructure already built?

---

## Definition of Done

- [ ] Acceptance criteria met
- [ ] Error scenarios handled gracefully
- [ ] Codebase audit completed confirming actual build status (see Open Question 1)
- [ ] Resume review produces structured, actionable feedback
- [ ] Portfolio review produces structured, actionable feedback
- [ ] Skill gap analysis identifies concrete gaps relative to target_role
- [ ] Review-triggered task suggestions follow existing confirmation-gating discipline
- [ ] Success metrics defined and agreed before build begins
- [ ] Unit + integration tests written and passing
- [ ] Security/privacy review completed given sensitivity of resume/salary/employment data

---

*Story S12.8.1 | Epic E12 | Product: Balencia Platform*
