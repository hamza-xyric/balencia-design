---
type: story
id: S12.7.1
title: AI Coach Career CRUD Tools & Confirmation Gating
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.7
feature_name: AI Coach Career Tools (LangGraph Domain)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.7.1: AI Coach Career CRUD Tools & Confirmation Gating

## User Story

**As a** Busy Professional (P2),
**I want to** ask SIA about my career goals in plain language — "what should I do today," "why am I behind" — and get an answer grounded in my actual tasks, levels, and progress,
**So that** career coaching feels like talking to someone who has actually looked at my plan, not a form I fill out.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**User Experience:**
- Light mode: SIA answers career questions conversationally with minimal structure — a sentence or two plus one suggested next action
- Deep mode: SIA responses include structured action cards (goal cards, progress cards, confirmation cards) with tappable deep links into the relevant `/career` screen, matching the platform's existing chat-artifact pattern

**Tool Domain Naming Convention:** `career.<resource>.<action>` (e.g., `career.goal.create`, `career.progress.overview`, `career.task.complete`), consistent with the platform's existing LangGraph tool-naming style used across other domains.

**Full CRUD Tool Set:**

| Resource | Tools |
|----------|-------|
| Profile | `career.profile.get`, `career.profile.update` |
| Goals | `career.goal.create`, `career.goal.list`, `career.goal.get`, `career.goal.update`, `career.goal.archive`, `career.goal.delete` |
| Levels | `career.level.create`, `career.level.update`, `career.level.complete` |
| Tasks | `career.task.create`, `career.task.update`, `career.task.complete`, `career.task.reopen`, `career.task.bulk_create` |
| Progress | `career.progress.overview`, `career.progress.goal`, `career.progress.weekly`, `career.progress.log_focus_time` |
| Evidence | `career.evidence.upload`, `career.evidence.review` |

**Confirmation Gating (matches platform-wide permission model):**

| Action Class | Behavior |
|--------------|----------|
| Read / analyze / draft (list, get, progress view, roadmap draft) | Execute immediately, no confirmation |
| Create / update / delete / bulk actions | Require explicit user confirmation via a structured confirmation card before persisting |
| Any external send action | Requires confirmation |
| Delete | Archive preferred over hard delete by default |

**Tool Execution Flow (High-Level):**
```
1. User message → Intent detection
2. Entity extraction (which goal_id/task_id/level_id) — ambiguous → ask user to disambiguate, stop here
3. Permission check (read/analyze/draft = immediate; create/update/delete/bulk = confirm)
4. Tool selection (intent → career.* tool)
5a. Immediate path: execute → format response → return with action cards
5b. Confirmation path: execute in "preview" mode → render confirmation card → wait for confirm/cancel
    → confirmed: execute for real → log to ai_career_actions
    → rejected: log as rejected, no DB write
6. Post-execution: DB update → progress recalculation → gamification update → SIA response w/ action card + deep link
```

**Audit:** all AI career actions (tool name, input/output payload, confirmation status) are logged to `ai_career_actions` for audit.

---

## Acceptance Criteria

```gherkin
Scenario: Read action executes without confirmation
  Given a user asks "what should I do today"
  When intent resolves to career.progress.overview or career.ai.next-best-action
  Then the tool executes immediately, no confirmation card is shown

Scenario: Create action requires confirmation
  Given a user asks SIA to create a new career goal via chat
  When career.goal.create would persist a new goal
  Then a confirmation card is rendered first, and no DB write occurs until the user confirms

Scenario: Rejected confirmation writes nothing
  Given a confirmation card is shown for a goal update
  When the user rejects it
  Then no DB write occurs and the action is logged as 'rejected' in ai_career_actions

Scenario: Ambiguous goal reference triggers disambiguation
  Given a user says "delete my old goal" and 3 goals match "old"
  When entity extraction resolves multiple candidate goal_ids
  Then SIA lists the candidates and asks the user to disambiguate before any tool executes

Scenario: Level names surfaced in conversation
  Given a user asks about their progress on a goal currently at Level 3
  When career.progress.goal or career.goal.get is called
  Then the response includes current_level and level_title, matching career_goal_levels exactly

Scenario: Tool call failure rolls back partial writes
  Given a tool call throws a DB error mid-execution
  When the failure is caught
  Then any partial writes are rolled back transactionally and a generic failure message is shown, without leaking internals

Scenario: Archive preferred over delete
  Given a user asks SIA to delete a career goal
  When SIA responds
  Then SIA recommends archiving over hard delete by default, per the system-prompt rule

Scenario: All AI career actions logged
  Given any career.* tool executes (read or write)
  When execution completes
  Then tool name, input/output payload, and confirmation status are logged to ai_career_actions
```

---

## Success Metrics

- Career-intent chat messages resolved via tool call (not generic text): 80%+
- Confirmation card acceptance rate (create/update/delete): 60%+
- "Why am I behind?" / progress-review query tool accuracy: 95%+ match live data (manual QA against `career.ai.review_progress`)
- Level-name accuracy in SIA responses (matches `career_goal_levels`): 100% (contract test)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| SIA career tool call (read/analyze) <2s; create/update pre-confirmation preview <3s | Confirmation gating enforced **server-side**, not just client-side — a client bypass attempt must still require server confirmation | Career data (resume content, salary expectations, employment history) treated as sensitive; encrypted at rest/in transit, RBAC, audit logging | Confirmation cards and action cards are screen-reader accessible with clear action labels | Registers into the same LangGraph tool-routing system already serving Fitness, Nutrition, and Wellbeing — no bespoke career-only router |

---

## Dependencies

- **Prerequisite Stories:** S12.1.1–S12.6.2 (this tool domain is the conversational front door to every other Career feature)
- **Related Stories:** S12.7.2 (Recovery/Restart flows extend this same tool domain)
- **External Dependencies:** AI Coach hot path (`rag-chatbot.controller` → `langGraphChatbotService`) — career tools are one domain among the coach's full tool registry, not a separate service

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| Ambiguous goal reference | Entity extraction returns multiple candidate goal_ids | List candidates, ask user to disambiguate before any tool executes | "Which one? Frontend Developer, Freelance Designer, or Product Manager?" |
| User rejects a confirmation card | `career.ai.confirm-action` → reject path | No DB write occurs; action logged as 'rejected' | "No problem — I won't make that change." |
| Tool call fails mid-execution (DB error) | Tool execution throws | Roll back any partial writes (transactional), surface generic failure without leaking internals | "Something went wrong saving that — please try again." |
| SIA references a level/task deleted since the conversation started | Stale entity reference in multi-turn conversation | Re-fetch live state before acting, not the conversation's cached snapshot | "That task isn't on your plan anymore — want me to check what's current?" |

---

## Open Questions

- Voice-mode career actions ("log 45 minutes of resume work" via voice) are **not verified built** — text-chat tool routing is confirmed; voice-specific routing through the platform's general voice-coaching channel (E02) is unconfirmed. Out of this story's scope.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Full CRUD tool set implemented for profile, goals, levels, tasks, progress, evidence
- [x] Confirmation required before: saving a new AI-generated goal, major goal-field updates, bulk task updates, delete/archive, any external send action
- [x] Read/analyze/draft actions execute without confirmation
- [x] Level names/titles surfaced directly in SIA's progress responses
- [x] All AI career actions logged (tool name, input/output payload, confirmation status) for audit
- [x] "Archive over delete" is the default recommendation SIA gives
- [x] AI tool safety tests confirm confirmation gating is enforced server-side (not client-bypassable)
- [x] Contract test enforces level-name accuracy between chat response and DB state

---

*Story S12.7.1 | Epic E12 | Product: Balencia Platform*
