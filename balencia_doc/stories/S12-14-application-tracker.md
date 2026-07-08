---
type: story
id: S12.9.1
title: Application Tracker
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.9
feature_name: Application Tracker (Should-Have, Unconfirmed)
product: yhealth-platform
priority: P1
status: Not Started
created: 2026-07-08
---

# S12.9.1: Application Tracker

## User Story

**As a** Busy Professional (P2) running a job search,
**I want to** log and track individual job applications (company, role, status, dates, interview stages) against my career goal,
**So that** my "Applications" and "Interviews" Focus Areas show real data instead of an empty or degraded tracker.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

> **Build status note:** This story documents a **named-but-unconfirmed** capability from `docs/career-module.md`, reproduced in `PRD-Epic-12-Career-Pillar.md`'s "MVP Scope & Build Status → Should-Have" table. The `career_applications` table exists in the shipped schema (one of the 10 Career Pillar tables), but the PRD is explicit that **the table's presence does not imply the tracker UI/tool surface is complete**. This story exists to make the gap trackable, not to imply the feature is live.

**Named Capabilities (per source design, unconfirmed build status):**

| Capability | Named Tool | API Endpoint (named, unconfirmed) |
|------------|------------|-------------------------------------|
| Application CRUD | `career.application.create`, `career.application.update`, `career.application.list` | `/career/applications/*` |

**Known-Existing Foundation (Must-Have, confirmed):**
- `career_applications` table exists in the schema (per `PRD-Epic-12-Career-Pillar.md`'s "Career Schema Tables" list)
- Focus Areas F12.4 (S12.4.1) already define the resolution logic that *would* read this table:
  - `applications` → `COUNT(career_applications WHERE goal_id=X)`
  - `interviews` → `COUNT(career_applications WHERE status IN ('interviewing','offer') AND goal_id=X)`
- S12.4.1's UI is already required to degrade gracefully (hide, not error) when this data is absent — so shipping this story does not require a Focus Areas UI change, only populating real data into the existing aggregate path

**Why This Matters (per PRD Risk register):** "Focus Areas relying on unbuilt Application Tracker feel broken" is a **confirmed, documented risk** in the PRD's Risks & Mitigations table — this story is the direct mitigation: building the tracker unblocks the applications/interviews Focus Areas for every job-search goal, not just this story's own scope.

**Intended Data Shape (per source design, not a confirmed spec):**

| Field | Notes |
|-------|-------|
| `application_id` | uuid |
| `goal_id` | FK, required |
| `company` | text |
| `role` | text |
| `status` | enum: e.g. `applied`, `interviewing`, `offer`, `rejected`, `withdrawn` |
| `applied_at` | date |
| `notes` | text, sensitive |

---

## Acceptance Criteria

```gherkin
Scenario: [UNVERIFIED] Application logged against a goal
  Given a user has a job_search-type career goal
  When they log a new application (company, role, status='applied')
  Then a career_applications row is created scoped to that goal_id
  # Status: not confirmed implemented — requires codebase audit

Scenario: [UNVERIFIED] Application status update
  Given an existing application with status='applied'
  When the user updates it to status='interviewing'
  Then the status transition is recorded
  # Status: not confirmed implemented

Scenario: [UNVERIFIED] Applications Focus Area reflects real data
  Given a goal has the "applications" Focus Area selected and 5 logged applications
  When the goal card renders (Light or Deep mode)
  Then the "Applications" tracker shows a real count of 5, not a hidden/degraded state
  # Status: depends on this story being built; Focus Areas' consuming logic (S12.4.1) already exists

Scenario: [UNVERIFIED] Interviews Focus Area derives from application status
  Given 2 of 5 applications have status IN ('interviewing', 'offer')
  When the "interviews" Focus Area renders
  Then it shows a count of 2
  # Status: not confirmed implemented; resolution formula is already specified in F12.4

Scenario: [UNVERIFIED] SIA can create/update applications conversationally
  Given a user tells SIA "I applied to the frontend role at Acme today"
  When SIA processes this via career.application.create
  Then a confirmation card is shown (per the platform-wide create/update confirmation gate) before persisting
  # Status: not confirmed implemented; assumes reuse of the existing F12.7 confirmation model, not a new one
```

---

## Success Metrics

- No confirmed success metrics exist for this capability in the current PRD. Metrics must be defined during the CONTRACT phase. Candidate metrics worth considering given adjacent Focus Areas targets (S12.4.1): applications-per-active-job-search-goal, application-to-interview conversion rate surfaced honestly (not fabricated).

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Not yet specified — should match existing career-tool latency bar if built to the F12.7 standard | Application notes/company names are named as sensitive career data in the PRD's Security & Privacy section | Employment/application history flagged sensitive; encryption at rest/in transit required per platform pattern | Not yet specified | Must reuse the existing `career_applications` table/schema as-is — do not create a parallel tracking table |

---

## Dependencies

- **Prerequisite Stories:** S12.4.1 (Focus Areas already define the aggregate-read contract this story must satisfy — `COUNT(career_applications WHERE goal_id=X)` etc.)
- **Related Stories:** S12.7.1 (would extend the `career.<resource>.<action>` tool-naming convention and confirmation-gating model to `career.application.*`)
- **External Dependencies:** `career_applications` table (already exists in schema, confirmed shipped)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Application logged with no company/role | Would need Zod validation at the creation boundary, matching the platform's validate-at-the-edge standard | Not yet specified | Not yet specified |
| Application status set to an invalid enum value | Would need DB-level CHECK constraint per platform's PostgreSQL principles (§5) | Not yet specified | Not yet specified |

*This table is intentionally sparse — error handling has not been designed for an unconfirmed feature. Full edge-case enumeration belongs in the CONTRACT phase, not retrofitted here.*

---

## Open Questions

1. **Build status verification is the primary open question.** Audit the LangGraph career tool registry for `career.application.create/update/list`; audit `/career/applications/*` route registration; audit the `/career` client's "Applications" tab (part of the shipped 9-tab shell per the PRD's Build Timeline — confirm whether it's a real tracker or a shell with no backing data).
2. If the `career_applications` table exists but is empty/unused in production, was any UI ever wired to write to it, or is this a fully greenfield build?
3. Does building this story require new premium-gating rules, or does it fall under the existing "goal-count limits, gated AI features" infrastructure already built in the Must-Have tier?
4. Should application status enum values be finalized against real job-search terminology before schema is treated as locked (the table already exists — changing its `status` enum later is a migration, not a first pass)?

---

## Definition of Done

- [ ] Acceptance criteria met
- [ ] Error scenarios handled gracefully
- [ ] Codebase audit completed confirming actual build status (see Open Question 1)
- [ ] `career.application.create/update/list` tools implemented with confirmation gating matching F12.7's model
- [ ] Applications and Interviews Focus Areas (S12.4.1) show real, non-degraded data once this ships
- [ ] `career_applications` status enum finalized and DB-constrained
- [ ] Unit + integration tests written and passing
- [ ] Security/privacy review completed given sensitivity of employment/application data

---

*Story S12.9.1 | Epic E12 | Product: Balencia Platform*
