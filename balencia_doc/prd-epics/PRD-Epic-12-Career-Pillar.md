# Balencia Platform - Epic 12: Career Pillar & Execution OS

## EPIC OVERVIEW

### Epic Statement
Career Pillar & Execution OS elevates career growth to a **full life pillar** — structurally equal to Fitness, Nutrition, and Wellbeing — instead of burying it as a generic "goal category." Career becomes a first-class sensor domain that SIA (the AI coach) reasons against: levels, weekly execution, focus-area tracking, obstacle plans, and consistency analytics all feed the same cross-domain intelligence engine that already powers the rest of Balencia.

### Epic Goal
Turn "I want to grow my career" into a guided, measurable, AI-coached operating system — the same way the Fitness pillar turns "I want to get fit" into workouts, recovery scores, and streaks. Users define a career goal, progress through 5 structured levels, execute a weekly cadence of tasks scoped to trackers that matter to *their* goal, and get SIA in the loop for obstacle-clearing, recovery from stalls, and live coaching — without SIA ever losing the plot on what "Level 3, Week 6, Focus Area: Portfolio" actually means for that user.

### Core Philosophy
**"Career trains the future, the way Fitness trains the body."**

1. **Structural Parity, Not a Bolt-On** — Career mirrors the exact level/progression grammar users already learned in Fitness/Nutrition. No new mental model to teach.
2. **Execution Over Aspiration** — A roadmap without a weekly cadence is a wish list. The Weekly Execution Engine is the load-bearing loop; everything else (levels, focus areas, analytics) exists to make that loop smarter.
3. **Scoped, Not Generic, Tracking** — A user chasing a promotion and a user chasing a freelance client should NOT see the same five trackers. Focus Areas let each goal define what "progress" even means for it.
4. **Honest About Stalls** — Careers stall. The system is built to detect it (Obstacle Plan, Recovery/Restart flows) rather than silently let a goal rot in the goals list.
5. **AI Coach as Operator, Not Just Advisor** — SIA doesn't just talk about career goals, it can see level names, pull the Obstacle Plan, and route into Recovery/Restart flows live in conversation (proactive nudges reserved for a follow-up phase, currently flag-gated OFF).

### Strategic Importance
> "Fitness trains the body. Career trains the future."

Without a Career pillar, Balencia's cross-domain intelligence has a blind spot: professional stress, career stagnation, and work-driven burnout are among the biggest real-world drivers of the mood/energy/sleep patterns the platform already tracks — but the platform had no first-party signal to explain *why*. Epic 12 closes that gap and gives Cross-Domain Intelligence (E08) a fourth pillar's worth of correlatable signal ("your sleep quality drops the week before a Level 4 deadline") without inventing a parallel product.

### Build Timeline
Shipped 2026-06-23 through 2026-07-03: schema (10 tables), services, AI coach tools, background jobs, REST API, and the `/career` UI (9-tab shell: Goals, AI Plan, Weekly, Calendar, Skills, Portfolio, Applications, Analytics, Coach — tab shells exist per the source design; only the tabs backing Must-Have features carry real data end-to-end, see §MVP Scope below).

### Career Pillar Scope (7 Features, Must-Have Tier)

| Feature | Description | MVP Status |
|---------|-------------|------------|
| **F12.1** | 5-Level Career Progression System | Core (Built) |
| **F12.2** | Weekly Execution Engine | Core (Built) |
| **F12.3** | Per-Level Task Editor | Core (Built) |
| **F12.4** | Focus Areas (Per-Goal Scoped Trackers) | Core (Built) |
| **F12.5** | Career Analytics (Consistency Heatmap + Momentum Chart) | Core (Built) |
| **F12.6** | Career Obstacle Plan + Resources | Core (Built) |
| **F12.7** | AI Coach Career Tools (LangGraph Domain) | Core (Built, proactive nudges OFF) |

> **Scope note:** This PRD documents F12.1–F12.7 as **shipped**. Section "MVP Scope & Build Status" below lists the Should-Have and Advanced-Later tiers from the original design (`docs/career-module.md`) that are named in the design doc but are **not verified built** — they are called out explicitly rather than folded silently into this feature list, per this platform's documentation standard of being honest about gaps.

---

## F12.1: 5-LEVEL CAREER PROGRESSION SYSTEM

### Description
A structural mirror of the Fitness/Nutrition pillar level system: every career goal is decomposed into exactly 5 levels — Clarity → Foundation → Practice → Execution → Outcome/Mastery — each with its own required tasks, XP reward, and unlock rule. This gives users the same "I'm on Level 3 of 5" sense of advancement they already have in the fitness pillar, applied to career growth, without inventing a new progression grammar.

### User Story
As an **Optimization Enthusiast** (P3), I want my career goal broken into clear, sequential levels with defined milestones so that I always know where I am in the journey and what "done" looks like for my current stage, instead of facing an open-ended goal with no sense of progress.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Single progress bar + current level badge on the goal card: "Level 3/5 — Practice and Projects, 52%." No per-task weighting shown. |
| **Deep** | Full level breakdown: per-level task list, XP reward, unlock rule, completion criteria, and a level-by-level timeline showing when each level was entered/completed. |

### Technical Foundation

**Default Level Template (applied per goal at creation):**

| Level | Name | Purpose | Progress Weight | XP Reward |
|---|---|---|---|---|
| 1 | Clarity | Define goal, target role, and roadmap | 20% | 200 |
| 2 | Foundation | Learn baseline skills, prepare resources | 20% | 400 |
| 3 | Practice | Build projects, practice, improve quality | 20% | 600 |
| 4 | Execution | Apply skills in real-world career actions | 20% | 800 |
| 5 | Outcome / Mastery | Achieve the result, plan next growth cycle | 20% | 1,000 |

- Levels are stored per-goal in `career_goal_levels` (`level_number`, `progress_weight`, `xp_reward`, `unlock_status`, `completion_status`).
- **Unlock rule:** Level *N+1* unlocks only when Level *N*'s `completion_status = 'completed'`. No skipping.
- **Completion source tracking:** a level completes via `task_progress` (all required tasks done), `ai_review` (SIA judges evidence sufficient), or `manual_override` (user/coach forces it) — the completion source is retained for audit and for SIA to explain *why* a level closed.
- AI-generated goals (via `career.ai.generate_roadmap`) populate custom level titles/descriptions instead of the generic template (e.g., "Product Management Foundation" instead of "Foundation") while preserving the 5-level/20%-weight skeleton.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Level 1 completion within 7 days of goal creation | 70%+ | Level completion event timestamps |
| Level completion within first month | 25%+ | Cohort analysis on `career_goal_levels.completed_at` |
| Users who understand their current level without asking SIA | 80%+ | Post-launch UX survey |
| Level-unlock celebration engagement (badge view/interaction) | 50%+ | Client event tracking |

### Acceptance Criteria

- [x] Every career goal is created with exactly 5 levels, default-weighted 20% each
- [x] AI-generated goals populate custom level titles/descriptions while preserving the 5-level structure
- [x] Level *N+1* stays locked until Level *N* is marked `completed`
- [x] Level completion source (`task_progress` / `ai_review` / `manual_override`) is recorded
- [x] XP reward is granted exactly once per level, on first transition into `completed`
- [x] Level progress bar and badge render on the goal card (Light mode) and full level list (Deep mode)
- [x] Levels are user-editable post-creation (see F12.3) without breaking unlock ordering
- [ ] AI-generated *custom* level counts (not exactly 5) — deferred; the system is hard-coded to 5 levels per goal for structural parity with Fitness/Nutrition, by design

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Level marked complete with unmet required tasks** | `career.level.complete` called with incomplete required tasks | Require explicit confirmation, log `completion_source: manual_override` | "Some required tasks aren't done yet. Complete anyway?" |
| **XP double-award on level re-completion** | Level transitions `completed → completed` (e.g., via reopened task workflow) | Idempotency guard on `progress_events` insert per (goal_id, level_id, event_type) | Silent: no duplicate XP, no user-facing error |
| **Level weight sum ≠ 100%** | Post-edit validation on `career_goal_levels.progress_weight` | Reject edit, keep prior weights | "Level weights must add up to 100%. Adjust and try again." |
| **AI roadmap returns fewer/more than 5 levels** | Roadmap generator output validation | Normalize/pad to 5 levels before persisting | Silent: user sees a standard 5-level goal regardless of LLM output shape |

### Level Progression Algorithm (High-Level)

```
Level Transition Process:

1. Task Completion Event:
   - career.task.complete fires → progress_events row inserted
   - Recalculate level task-completion ratio for the task's level_id

2. Level Completion Check:
   - IF all required tasks for level_id are 'completed'
     AND level.completion_status != 'completed'
   THEN:
     a. Set completion_status = 'completed', completed_at = now()
     b. Award xp_reward (idempotent per level_id)
     c. Unlock next level_number (unlock_status = 'unlocked')
     d. Emit celebration event (badge, confetti, SIA message)

3. Progress Recalculation:
   - Goal-level progress_percentage = SUM(level.progress_weight
     WHERE completion_status = 'completed')
     + partial credit for in-progress current level
       (current_level_task_ratio * current_level.progress_weight)

4. Level 5 Completion = Goal Completion:
   - Triggers +2,000 XP goal-completion bonus
   - Prompts "Create next 90-day growth plan" via SIA
```

### Cross-Pillar Connections

**To Fitness Pillar (E5):**
- Shares the identical level/progression data shape (level_number, progress_weight, xp_reward, unlock_status) — no new UI pattern for users to learn.

**To Cross-Domain Intelligence (E08):**
- Level transitions are a discrete, timestamped event stream — ideal input for correlation ("mood dips in the week a user enters Level 4 — the highest-effort level").

**To AI Coach Career Tools (F12.7):**
- SIA's `career.progress.goal` tool surfaces `current_level` and `level_title` directly in conversation ("You're on Level 3/5 — Practice and Projects").

### Dependencies
- **E5 (Fitness Pillar):** Source of the level/XP/progression pattern being mirrored
- **F12.2 (Weekly Execution Engine):** Task completion inside a level drives level completion
- **F12.7 (AI Coach Career Tools):** Level names and completion status surfaced live in chat

### MVP Status
[X] MVP Core (Built)

---

## F12.2: WEEKLY EXECUTION ENGINE

### Description
The core loop of the Career pillar: weekly scheduling, scoring, and accountability cadence for career tasks. Every career goal runs on a week-over-week rhythm — tasks are scheduled into a week, completion is scored, and the week closes out with a review that feeds directly into SIA's reasoning ("You completed 5/7 tasks this week, up from 3/7 last week"). This is the loop the AI coach reasons against; without it, levels and focus areas are just static structure with no pulse.

### User Story
As a **Busy Professional** (P2), I want my career goal broken into a manageable weekly plan of specific tasks so that I know exactly what to do this week without re-planning from scratch every Monday, and so my consistency (not just my aspiration) is what gets tracked.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | This week's task list with a single completion counter: "3/5 this week." One-tap complete. |
| **Deep** | Full weekly plan editor: reorder/reschedule tasks, adjust cadence, view carryover from prior weeks, see per-task time estimates vs. actual logged focus time. |

### Technical Foundation

**Cadence Model:**
- Each `career_tasks` row carries a `cadence` (e.g., `daily`, `weekly`, `biweekly`, `one_time`) alongside `due_date`, `estimated_minutes`, and `status` (`todo | in_progress | completed | skipped`).
- Weekly plans are generated (manually or via `career.ai.generate_weekly_plan`) against a `week_start` anchor and an `available_hours` budget, with `include_carryover_tasks` pulling forward anything left `todo` from the prior week rather than silently dropping it.
- Weekly scoring reads `progress_events` for the week's date range and computes `tasks_completed / tasks_total` plus `focus_minutes_this_week` (from `career.progress.log_focus_time` entries) — the same numbers SIA reports back in conversation.

**Known production gotcha — cadence column overflow:**
LLM-generated weekly plans (via `career.ai.generate_weekly_plan` / `career.ai.generate_roadmap`) occasionally returned verbose cadence strings (e.g., `"twice per week, mostly weekday evenings"`) instead of a short enum token. These overflowed the `cadence VARCHAR(20)` column and caused insert failures. **Fixed** via a `normalizeCadence()` clamp in the task-persistence path that maps free-text LLM output to the fixed cadence enum (falling back to `weekly` when unrecognized) plus migration `030000` to widen/backfill the column safely. This is the canonical example of why AI-generated structured data still needs a normalization boundary before it touches a fixed-width column — see also the `notification_type` enum drift pattern for the same class of bug elsewhere in the platform.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Weekly task completion rate | 60%+ average across active goals | `tasks_completed / tasks_total` per week |
| Weekly active career users (returns to `/career` weekly) | 35%+ | Client analytics |
| Carryover task resolution (not left stale 2+ weeks) | 70%+ | `progress_events` age analysis |
| Weekly plan acceptance (AI-generated plan saved as-is or with minor edits) | 40%+ | `career.ai.generate_weekly_plan` → save conversion |

### Acceptance Criteria

- [x] Career tasks carry `cadence`, `due_date`, `estimated_minutes`, `actual_minutes`, and `status`
- [x] Weekly plan generation accepts `week_start` + `available_hours` and optionally carries over incomplete prior-week tasks
- [x] `career.progress.weekly` and `career.progress.overview` return real completion counts, not placeholders
- [x] Focus time logging (`career.progress.log_focus_time`) attributes minutes to `activity_type` (learning/project/application/interview/networking/resume/portfolio)
- [x] LLM-generated cadence values are normalized (`normalizeCadence`) before persistence — overflow bug fixed via migration `030000`
- [x] Task completion recalculates goal progress and level progress in the same transaction (no partial-write drift)
- [x] Task reopen (`career.task.reopen`) is supported and reverses XP/progress deltas cleanly
- [ ] AI weekly review (automated end-of-week summary + next-week auto-draft) — **not verified built**; see Should-Have tier

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Cadence value exceeds VARCHAR(20)** | Insert/update on `career_tasks.cadence` | `normalizeCadence()` clamps to nearest enum value before write; migration `030000` backfills prior overflow rows | Silent: task saves with a normalized cadence, no user-visible error |
| **Weekly plan generated with zero available hours** | `available_hours <= 0` in `career.ai.generate_weekly_plan` input | Reject generation, request valid hours | "Add your available hours this week so I can build a realistic plan." |
| **Task completed twice (double-submit)** | Duplicate `career.task.complete` call for same `task_id` within short window | Idempotency check on task `status` transition | Silent: second call is a no-op, no duplicate XP |
| **Carryover task never resolved (2+ weeks stale)** | `progress_events`/task age check during weekly scan | Flag for Obstacle Plan (F12.6) surfacing instead of silently re-carrying forever | "This task has carried over 3 weeks. Want to break it down or drop it?" |
| **Focus time logged against completed/archived task** | `career.progress.log_focus_time` targets non-active task | Reject with typed error | "This task is already complete — log time against your current task instead." |

### Weekly Execution Process (High-Level)

```
Weekly Execution Loop:

1. Week Open (Monday, or user-defined week_start):
   - Pull carryover tasks (status='todo' from prior week, if include_carryover_tasks)
   - Merge with newly scheduled tasks for the week
   - Compute weekly available_minutes budget from weekly_available_hours

2. Daily Execution:
   - User completes tasks via UI or SIA ("Mark resume task done")
   - career.task.complete → progress_events insert → XP delta
   - career.progress.log_focus_time → actual_minutes accumulate per task/goal

3. Mid-Week Signal:
   - career.progress.weekly recomputed on read (not cached) for live accuracy
   - Streak counters updated (daily career streak, weekly career streak)

4. Week Close:
   - Compute completion ratio: tasks_completed / tasks_total
   - Compare to prior week (momentum direction: up/down/flat) — feeds F12.5 analytics
   - Unresolved tasks either carry forward or flag for Obstacle Plan review

5. Level/Goal Rollup:
   - Weekly completion feeds level task-completion ratio (F12.1)
   - Level completion feeds goal progress_percentage
```

### Cross-Pillar Connections

**To Fitness Pillar (E5):**
- Same weekly-cadence mental model as workout scheduling; users transfer intuition from one pillar to the other.

**To Cross-Domain Intelligence (E08):**
- Weekly completion ratio is a clean weekly-granularity signal for correlation with mood/stress/sleep trends (e.g., "low career-task completion weeks correlate with your stress spikes").

**To Career Analytics (F12.5):**
- Weekly completion history is the raw series behind the consistency heatmap and momentum chart.

**To AI Coach Career Tools (F12.7):**
- `career.ai.generate_weekly_plan` and `career.progress.log_focus_time` are the two most-invoked tools in live coaching sessions.

### Dependencies
- **F12.1 (5-Level Progression):** Weekly task completion rolls up into level completion
- **F12.3 (Per-Level Task Editor):** Source of the tasks the weekly engine schedules
- **E9 (Data Integrations):** Calendar/reminder scheduling infrastructure reused for career deadlines (Should-Have tier, not yet wired)

### MVP Status
[X] MVP Core (Built)

---

## F12.3: PER-LEVEL TASK EDITOR

### Description
Lets users create and edit tasks scoped to their current career level — both during initial goal creation (accepting or editing the AI-drafted roadmap before saving) and later, in-plan, as circumstances change. Tasks are never a flat, goal-wide to-do list; every task belongs to a specific level, which is what makes level-completion math (F12.1) and weekly scheduling (F12.2) coherent.

### User Story
As a **Holistic Health Seeker** (P1) working a career goal alongside their health goals, I want to edit the AI-generated tasks for my current level — rename them, adjust time estimates, add or remove tasks — so that the plan actually matches my real life instead of a generic template I have to follow verbatim.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Inline edit on the goal card: tap a task to rename, change due date, or mark it optional. No level-reassignment UI. |
| **Deep** | Full task editor: reassign a task to a different level, set `requires_evidence`, bulk-create multiple tasks at once (`career.task.bulk_create`), adjust XP reward, set task type (research/project/application/etc.). |

### Technical Foundation

- Tasks live in `career_tasks` with a required `level_id` foreign key — a task cannot exist without belonging to exactly one level of exactly one goal.
- **Creation-time editing:** when a goal is AI-generated (`career.ai.generate_roadmap`), the returned task list is held as a *draft* in the client until the user explicitly saves (`career.goal.create` with the edited `levels`/`tasks` payload) — nothing persists until confirmed, consistent with the platform-wide AI-action-confirmation model.
- **In-plan editing:** `career.task.update` supports partial updates (title, due_date, estimated_minutes, priority, status); `career.task.create` adds a single task to an existing level; `career.task.bulk_create` adds many at once (used by weekly-plan generation and roadmap regeneration).
- Editing a task after completion (`career.task.reopen`) reverses its `progress_events` contribution before allowing further edits, so progress math never drifts out of sync with the visible task list.
- `requires_evidence` flag on a task ties it to the Evidence system (`career.evidence.upload`) — tasks that require proof cannot auto-complete without an attached evidence record.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| AI-drafted tasks edited before first save | 45%+ of goals | Diff between AI draft and saved payload |
| Task edit success rate (no progress-math drift after edit) | 100% | Integration test assertion + prod error-rate monitoring |
| Users who add a custom task within first 2 weeks | 30%+ | `career.task.create` with `created_by != 'ai'` |
| Bulk-create usage (vs. one-at-a-time) | 50%+ of task creation volume | Tool invocation counts |

### Acceptance Criteria

- [x] Tasks require a `level_id` and cannot be created without one
- [x] AI-drafted roadmap tasks are editable client-side before the goal is saved (nothing persists prematurely)
- [x] `career.task.update` supports partial field updates without requiring the full task payload
- [x] `career.task.bulk_create` accepts multiple tasks scoped to one or more levels in a single call
- [x] `career.task.reopen` reverses XP/progress deltas before allowing further edits
- [x] `requires_evidence` tasks block auto-completion until evidence is attached
- [x] Editing a task's `level_id` (reassigning to a different level) recalculates both the source and destination level's progress
- [ ] Drag-and-drop task reordering across levels in the Deep-mode editor — UI affordance not confirmed built; task ordering exists in data model but reorder UX not verified

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Task created with no `level_id`** | Zod validation at the `career.task.create` boundary | Reject with typed 4xx before hitting the service layer | "Every task needs a level. Choose one to continue." |
| **Task reassigned to a level in a different goal** | Cross-goal `level_id` check on update | Reject — tasks cannot move between goals | "Tasks can only move between levels within the same goal." |
| **Bulk-create partially fails mid-batch** | Transaction wraps the full `career.task.bulk_create` batch | Roll back entire batch on any single-task validation failure — no half-created batches | "Couldn't save this task list — nothing was created. Please check the details and retry." |
| **Evidence-required task marked complete without evidence** | `requires_evidence=true` + no linked `career_evidence` row | Block completion, surface the evidence upload prompt | "Attach proof (resume, link, or file) to complete this task." |
| **Task edited while a bulk weekly-plan generation is in flight** | Optimistic concurrency check on task `updated_at` | Last-write-wins with conflict surfaced to user for review | "This task changed while your weekly plan was generating — review before confirming." |

### Task Editing Flow (High-Level)

```
Per-Level Task Editing Process:

1. Draft Phase (AI-Generated Goal Creation):
   - career.ai.generate_roadmap returns levels[] with nested tasks[]
   - Client renders as an editable draft (no DB writes yet)
   - User edits: rename, re-estimate, delete, add tasks per level
   - User confirms → career.goal.create persists levels + tasks together

2. In-Plan Editing (Existing Goal):
   - Single task: career.task.update (partial payload)
   - Multiple tasks: career.task.bulk_create (e.g., from a regenerated weekly plan)
   - Level reassignment: update level_id → recompute both levels' progress

3. Evidence-Gated Completion:
   - IF task.requires_evidence AND no linked evidence
   THEN block career.task.complete, prompt career.evidence.upload

4. Reopen & Re-Edit:
   - career.task.reopen → reverse progress_events delta → status back to
     'in_progress' or 'todo' → task becomes editable again
```

### Cross-Pillar Connections

**To Weekly Execution Engine (F12.2):**
- Every task the weekly engine schedules or carries over is a row this editor manages; the two features share the same `career_tasks` table.

**To 5-Level Progression (F12.1):**
- Task-level completion ratios roll directly into level completion — editing tasks is effectively editing what "Level 3 done" means.

**To Career Evidence / Obstacle Plan (F12.6):**
- `requires_evidence` tasks connect the task editor to the evidence system; stalled/edited-repeatedly tasks are a signal the Obstacle Plan surfaces.

**To AI Coach Career Tools (F12.7):**
- SIA's `career.task.create` / `.update` / `.complete` / `.bulk_create` tools are this feature's programmatic front door — "editing" via chat uses the identical service layer as the UI.

### Dependencies
- **F12.1 (5-Level Progression):** Tasks must resolve to a valid level
- **F12.2 (Weekly Execution Engine):** Consumes and schedules the tasks this editor produces
- **F12.6 (Obstacle Plan):** Reads stale/edited task signals for risk detection

### MVP Status
[X] MVP Core (Built)

---

## F12.4: FOCUS AREAS (PER-GOAL SCOPED TRACKERS)

### Description
Rather than forcing every career goal through one fixed set of metrics, users select the specific trackers relevant to *this* goal. A job-search goal might track applications, interviews, and resume iterations; a freelance-income goal might track client outreach, proposals sent, and revenue; a promotion goal might track visibility projects and manager check-ins. Focus Areas are the mechanism that keeps the Career pillar generic at the schema level but personalized at the goal level.

### User Story
As an **Optimization Enthusiast** (P3) pursuing a freelance-income goal, I want to choose the specific metrics that matter for freelancing (proposals sent, client calls, revenue) instead of being stuck with generic "career progress" trackers designed for a 9-to-5 job search, so that my dashboard reflects what actually moves *my* goal forward.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | One or two focus-area chips shown on the goal card with a single running count each ("Applications: 12"). |
| **Deep** | Full focus-area picker at goal creation/edit time, per-focus-area trend mini-chart, and the ability to add/remove focus areas mid-goal without losing prior history on removed trackers. |

### Technical Foundation

- Focus Areas are selected per goal at creation time (manual or AI-assisted) and stored as a scoped set rather than a global fixed schema — this is what lets a job-search goal and a certification goal coexist without either forcing irrelevant fields on the other.
- Each Focus Area maps to a specific `activity_type` / evidence category already present in the data model (e.g., `application`, `interview`, `networking`, `resume`, `portfolio`, `learning`) so that focus-area counts are simply filtered aggregates over `progress_events`, `career_applications`, and `career_evidence` — no duplicate counting system.
- Removing a Focus Area from a goal does not delete its historical events; it only stops surfacing that tracker going forward, preserving analytics continuity (F12.5) if the user re-adds it later.
- Focus Area selection informs which SIA tools are most relevant in coaching context for that goal — e.g., a goal with the "Applications" focus area primes `career.application.*` tool suggestions over `career.interview.*`.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Goals with 2+ focus areas selected | 70%+ | `career_goals` → focus-area-selection join |
| Focus-area edit rate (added/removed mid-goal) | 20%+ of goals within first month | Edit event tracking |
| Dashboard relevance rating ("this matches what I care about") | 75%+ agree | Post-launch survey |
| Focus-area-driven SIA tool suggestion acceptance | 40%+ | Tool-suggestion → tool-invocation conversion |

### Acceptance Criteria

- [x] Focus Areas are selectable per goal at creation (manual and AI-assisted flows)
- [x] Focus Areas can be added or removed post-creation without deleting historical event data
- [x] Focus-area counts are computed as filtered aggregates over existing event/evidence/application tables (no parallel tracking system)
- [x] Goal card (Light mode) surfaces the top 1-2 focus areas by recency/relevance
- [x] Deep mode shows all selected focus areas with individual trend mini-charts
- [x] Focus-area selection is available both in the manual goal-creation form and the AI-roadmap wizard
- [ ] Custom (user-defined, non-catalog) focus areas beyond the fixed activity-type set — **not built**; focus areas are drawn from the existing activity-type catalog, not free-form user-defined metrics

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Goal created with zero focus areas** | Validation at `career.goal.create` | Default to a minimal starter set based on `goal_type` (e.g., job_search → applications + interviews) | "We've pre-selected trackers based on your goal type — customize anytime." |
| **Focus area removed while events are mid-week** | Removal request during active week | Preserve historical rows, exclude from *new* dashboard aggregation only | Silent: past data stays intact, just stops appearing going forward |
| **Focus area re-added after removal** | Re-selection of a previously removed focus area | Re-surface full historical series immediately (data was never deleted) | Silent: trend chart repopulates with full history, no re-onboarding needed |
| **Conflicting focus areas for goal type** | e.g., "Revenue" selected on a job_search goal | Allow it (no hard restriction) but flag as unusual in Deep mode | "Heads up — 'Revenue' isn't typical for a job-search goal. Keep it anyway?" |

### Focus Area Resolution Process (High-Level)

```
Focus Area Aggregation (per dashboard render):

1. Load goal's selected focus_area set (from career_goals metadata)

2. For each focus area:
   - Resolve to its underlying data source:
     "applications" → COUNT(career_applications WHERE goal_id=X)
     "interviews"   → COUNT(career_applications WHERE status IN
                       ('interviewing','offer') AND goal_id=X)
     "resume"       → COUNT(career_evidence WHERE evidence_type='resume'
                       AND goal_id=X)
     "networking"   → SUM(progress_events.minutes WHERE
                       activity_type='networking' AND goal_id=X)
     "learning"     → SUM(progress_events.minutes WHERE
                       activity_type='learning' AND goal_id=X)

3. Compute trend (this week vs. last week) per focus area

4. Rank by recency + goal relevance for Light-mode top-2 selection

5. Render: chips (Light) or full grid with mini-charts (Deep)
```

### Cross-Pillar Connections

**To Career Analytics (F12.5):**
- Focus-area trend data is a direct input to the momentum chart — momentum is computed per-focus-area, not just goal-wide.

**To AI Coach Career Tools (F12.7):**
- SIA prioritizes tool suggestions and Obstacle Plan framing around a goal's selected focus areas rather than a generic career vocabulary.

**To Cross-Domain Intelligence (E08):**
- Because focus areas are user-chosen, they're a stronger correlation candidate than generic career activity — "your mood improves on weeks with 3+ networking-focus-area events" is more specific than a flat career-activity signal.

### Dependencies
- **F12.2 (Weekly Execution Engine):** Focus-area counts derive from the same `progress_events` stream the weekly engine writes
- **F12.6 (Evidence System):** Resume/portfolio-scoped focus areas read from `career_evidence`
- **F12.9 Application Tracker (Should-Have, unconfirmed):** "Applications"/"Interviews" focus areas depend on `career_applications` data quality, which is itself in the Should-Have tier — see gap note below

### MVP Status
[X] MVP Core (Built) — note: focus areas that key off `career_applications` (applications/interviews) are functionally gated by the Application Tracker feature, which is Should-Have/unconfirmed (see MVP Scope tiers). Focus areas keyed off tasks/evidence/focus-time are fully live.

---

## F12.5: CAREER ANALYTICS

### Description
Two visualizations that turn raw weekly execution data into a legible pattern: a **consistency heatmap** (day-by-day activity density, the career-pillar equivalent of a GitHub contribution graph) and a **momentum chart** (week-over-week trend line showing whether execution is accelerating, flat, or decaying). Together they answer the question a raw task list can't: "Am I actually building a habit here, or just occasionally completing tasks?"

### User Story
As a **Busy Professional** (P2), I want to see at a glance whether I'm being consistent with my career goal over time — not just today's task count — so that I can catch a slump early and course-correct before I've lost weeks of momentum.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Compact heatmap strip (last 8 weeks) + a single momentum arrow (↑ building / → steady / ↓ slipping) on the Analytics tab. |
| **Deep** | Full-year heatmap, momentum chart with selectable time ranges (4/12/26 weeks), per-focus-area momentum breakdown, and drill-down into any heatmap cell to see that day's completed tasks. |

### Technical Foundation

- **Consistency Heatmap:** built from `progress_events` grouped by day, bucketed into intensity tiers (none / light / moderate / heavy activity) based on completed-task count and logged focus minutes for that day — rendered client-side as a pure-SVG clay-styled grid (matching the visualization approach already established on the Reputation page rebuild) rather than a heavyweight charting library.
- **Momentum Chart:** computed as a rolling week-over-week completion-ratio series (`tasks_completed / tasks_total` per ISO week), with a simple trend classification (linear slope over the trailing N weeks: positive → "building," near-zero → "steady," negative → "slipping").
- Both visualizations read from already-existing event tables (`progress_events`, `career_tasks`) — no separate analytics-specific write path, avoiding a second source of truth for the same activity.
- Timezone handling follows the platform-wide rule: day-bucketing for the heatmap uses the user's `user_preferences.timezone` (not `users.timezone`, which can be stale) to avoid the day-boundary drift bug class already fixed elsewhere in the platform.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Analytics tab weekly view rate | 40%+ of active career users | Client analytics |
| Users who take a corrective action within 48h of seeing a "slipping" momentum state | 35%+ | Momentum-state → next-task-completion correlation |
| Heatmap render performance (full year) | <500ms | Client performance monitoring |
| Consistency-to-goal-completion correlation | Positive, r > 0.3 | Backend analysis (feeds E08 Cross-Domain Intelligence) |

### Acceptance Criteria

- [x] Consistency heatmap renders daily activity density for the last 8 weeks (Light) and full year (Deep)
- [x] Heatmap day-bucketing uses `user_preferences.timezone`, not stale `users.timezone`
- [x] Momentum chart computes week-over-week completion-ratio trend with a 3-state classification (building/steady/slipping)
- [x] Both visualizations are pure-SVG, matching the platform's clay-styled chart approach (no heavyweight chart library pulled in for this)
- [x] Drill-down on a heatmap cell (Deep mode) shows that day's completed tasks
- [x] Analytics reads exclusively from existing event tables — no duplicate write path
- [ ] Per-focus-area momentum breakdown in Deep mode — **not verified built**; goal-wide momentum is live, focus-area-scoped momentum sub-charts are part of the Advanced Analytics Should-Have item
- [ ] Application funnel / interview conversion charts — **not built**; depends on Application Tracker (Should-Have)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **No activity yet (new goal)** | Zero `progress_events` rows for the goal | Render empty-state heatmap (all cells "none") + momentum "not enough data yet" | "Your consistency map starts filling in once you complete your first task." |
| **Timezone missing/null on user record** | `user_preferences.timezone` unset | Fall back to UTC with a visible disclaimer, avoid silent misattribution | "Set your timezone in settings for a more accurate activity map." |
| **Momentum trend flips on a single outlier week** | e.g., one heavy catch-up week after several stale weeks | Use a smoothed trailing slope (not point-to-point) to avoid noisy flip-flopping | Silent: momentum state changes only on a sustained trend, not one data point |
| **Heatmap requested for a goal with 365+ days of history** | Large date range query | Paginate/aggregate at week granularity beyond 1 year rather than rendering every raw day cell | Silent: older history collapses to weekly summary cells past 12 months |

### Analytics Computation Process (High-Level)

```
Career Analytics Render Process:

1. Fetch Raw Events:
   - progress_events for goal_id, bucketed by user-local day
   - career_tasks status/completed_at for the same range

2. Consistency Heatmap:
   - FOR each day in range:
       intensity = classify(completed_tasks_count, focus_minutes)
       # none | light | moderate | heavy
   - Render as SVG grid (7 rows x N week-columns), clay color scale

3. Momentum Chart:
   - GROUP progress_events by ISO week
   - completion_ratio[week] = tasks_completed[week] / tasks_total[week]
   - trend = linear_regression_slope(completion_ratio, trailing_N_weeks)
   - classify: slope > +0.05 → "building"
               -0.05 <= slope <= +0.05 → "steady"
               slope < -0.05 → "slipping"

4. Drill-Down (Deep mode):
   - On cell click: fetch that day's completed career_tasks list

5. Feed Downstream:
   - Momentum state surfaced to SIA context for Obstacle Plan triggers (F12.6)
   - Weekly completion series available to E08 correlation engine
```

### Cross-Pillar Connections

**To Weekly Execution Engine (F12.2):**
- The heatmap and momentum chart are, literally, the visual layer over F12.2's event stream — no independent data source.

**To Career Obstacle Plan (F12.6):**
- A sustained "slipping" momentum state is one of the primary triggers that surfaces an Obstacle Plan prompt.

**To Cross-Domain Intelligence (E08):**
- Weekly career completion ratio is a candidate variable for cross-pillar correlation ("your sleep quality and your career consistency move together").

**To Reputation Page Rebuild (prior work):**
- Reuses the same pure-SVG clay-chart rendering pattern established there, avoiding a third charting approach in the codebase.

### Dependencies
- **F12.2 (Weekly Execution Engine):** Sole data source for both visualizations
- **F12.6 (Obstacle Plan):** Consumes momentum state as a risk-detection input
- **E08 (Cross-Domain Intelligence):** Downstream consumer of the weekly completion series

### MVP Status
[X] MVP Core (Built)

---

## F12.6: CAREER OBSTACLE PLAN + RESOURCES

### Description
Root-cause obstacle planning, surfaced via the `/obstacles` page, plus curated resource links tied to a user's career goal — and milestone badges. Where the Weekly Execution Engine and Analytics tell a user *that* they've stalled, the Obstacle Plan is where SIA (or the user, self-directed) diagnoses *why* and produces a concrete unstick plan, backed by resources relevant to that specific blocker rather than generic career advice.

### User Story
As a **Holistic Health Seeker** (P1) whose career goal has stalled for over a week, I want the app to help me identify what's actually blocking me — not just nag me to "do more" — and point me to a specific next step or resource, so that a stall doesn't quietly turn into an abandoned goal.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Single "What's blocking you?" prompt with 3-4 tap-to-select common blockers (time, confidence, unclear next step, external dependency), producing one suggested micro-action. |
| **Deep** | Full Obstacle Plan editor on `/obstacles`: structured root-cause entry, linked resources, a mini-action-plan with its own checklist, and historical obstacle log ("you've hit this blocker type twice before"). |

### Technical Foundation

- Obstacle entries are linked to a specific `goal_id` (and optionally `task_id`/`level_id`) so the plan is always scoped to a concrete blocker, not a vague "career is hard" note.
- Root-cause categories draw from the same risk-signal taxonomy the AI Coach Career Tools use for risk detection (no progress for N days, deadline too close, low resume/portfolio readiness, too many active goals, overcommitment) — the Obstacle Plan is the user-facing surface for the same signals SIA reasons about internally.
- **Resources:** curated links tied to the obstacle category and, where available, the goal's target role/focus areas (e.g., a "confidence" blocker on an interview-prep goal surfaces interview-prep resources, not generic productivity articles).
- **Badges:** milestone badges (Career Starter, Resume Ready, Portfolio Builder, etc.) are awarded on level/goal completion events already emitted by F12.1/F12.2 — the badge catalog is code-seeded via upsert (matching the platform's existing achievements-catalog pattern) rather than hand-inserted rows, so it can be extended without a data migration per badge.
- The Obstacle Plan page reads the same `risk_status` field (`on_track | slightly_behind | at_risk`) that SIA's `career.ai.review_progress` tool returns, so the UI and the AI coach never disagree about whether a goal is at risk.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Obstacle Plan engagement among "slipping" momentum users | 50%+ visit `/obstacles` within 7 days | Funnel from momentum-state change to page visit |
| Obstacle Plan → resumed activity (task completed within 7 days of plan creation) | 45%+ | Obstacle-plan-created → next-task-completed conversion |
| Resource click-through rate | 25%+ | Resource link click tracking |
| Badge unlock engagement (view/share) | 50%+ | Client event tracking |
| Recurring-blocker detection accuracy (user agrees "yes, this again") | 70%+ | Post-detection feedback |

### Acceptance Criteria

- [x] `/obstacles` page is reachable and scoped to a specific goal
- [x] Obstacle entries link to `goal_id` and optionally `task_id`/`level_id`
- [x] Root-cause categories align with the risk-detection taxonomy used by AI Coach tools (no silent divergence between UI and SIA reasoning)
- [x] Curated resources are tied to obstacle category + goal focus areas, not shown generically
- [x] `risk_status` shown on the Obstacle Plan page matches what `career.ai.review_progress` returns to SIA
- [x] Badges are code-seeded via upsert (never hand-inserted), consistent with the existing achievements-catalog pattern
- [x] Badge catalog sync-prunes phantom entries rather than accumulating dead rows over time
- [ ] Recurring-blocker pattern detection across multiple goals (cross-goal obstacle history) — **not verified built**; single-goal obstacle history exists, cross-goal pattern surfacing is not confirmed

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Obstacle created with no linked goal** | Validation at obstacle-creation boundary | Reject — every obstacle must scope to a goal | "Select which goal this is blocking before saving." |
| **User selects a blocker category with no curated resources yet** | Resource lookup returns empty set | Fall back to a generic action prompt instead of an empty resources panel | "No curated resources yet for this — here's a quick next step to try instead." |
| **Risk status disagreement between UI cache and live SIA read** | Stale client cache vs. fresh `career.ai.review_progress` call | Always defer to the live tool response; invalidate cache on obstacle-plan page load | Silent: page refetches risk status on load, no stale-state exposure |
| **Badge catalog upsert removes a badge the user already earned** | Sync-prune runs against catalog that dropped a previously valid badge type | Prune only removes *unearned, no-data* catalog rows — never revokes an already-awarded badge from a user's history | Silent: user keeps earned badges regardless of catalog changes |
| **Obstacle Plan created but goal is later archived** | Goal status transitions to `archived` while an open obstacle plan exists | Obstacle plan is retained (read-only) for history, not deleted | "This goal is archived — the obstacle history is kept for reference." |

### Obstacle Plan Process (High-Level)

```
Obstacle Plan Lifecycle:

1. Trigger Detection:
   - Momentum state = "slipping" for 2+ consecutive weeks, OR
   - No task completed in N days (risk taxonomy: no_progress), OR
   - User self-initiates via "What's blocking you?" prompt

2. Root-Cause Capture:
   - User selects/describes blocker category:
     time | confidence | unclear_next_step | external_dependency |
     skill_gap | overcommitment | deadline_pressure
   - Link to specific goal_id (+ optional task_id/level_id)

3. Resource + Action Matching:
   - Look up curated resources for (blocker_category, goal.focus_areas,
     goal.target_role)
   - Generate a micro-action suggestion (smallest next step, not a
     full re-plan)

4. Plan Persistence:
   - Save obstacle entry with resources + suggested action
   - risk_status recalculated and synced with career.ai.review_progress

5. Resolution Tracking:
   - IF task completed within 7 days of obstacle plan creation
   THEN mark obstacle "resolved", log for recurring-pattern analysis
   ELSE surface again at next weekly review (F12.2 week close)

6. Badge Evaluation (parallel, on every level/goal completion event):
   - Check badge catalog for newly-qualifying badges
   - Award + celebrate; sync-prune catalog nightly for removed/no-data
     badge types (never revoking already-earned badges)
```

### Cross-Pillar Connections

**To Career Analytics (F12.5):**
- "Slipping" momentum is a primary Obstacle Plan trigger; resolution is measured against the same weekly completion series.

**To AI Coach Career Tools (F12.7):**
- Shares its risk taxonomy and `risk_status` value directly with `career.ai.review_progress` — this is the one feature where UI and AI-tool output are contractually required to agree.

**To Achievements System (prior work):**
- Reuses the code-seeded-catalog + sync-prune pattern already built for the platform-wide achievements/badges system, rather than inventing a parallel badge mechanism.

**To Cross-Domain Intelligence (E08):**
- Obstacle-plan creation events are a strong candidate signal for correlation with stress/mood dips elsewhere in the platform.

### Dependencies
- **F12.2 (Weekly Execution Engine):** No-progress/stale-task signals originate here
- **F12.5 (Career Analytics):** Momentum state is the primary automated trigger
- **F12.7 (AI Coach Career Tools):** Shares risk taxonomy and `risk_status` contract
- **Achievements/Badges system (platform-wide, prior work):** Badge catalog seeding + sync-prune pattern reused as-is

### MVP Status
[X] MVP Core (Built)

---

## F12.7: AI COACH CAREER TOOLS

### Description
The LangGraph tool domain that gives SIA live-coach extras on top of the standard career CRUD: reading level names in plain conversation, pulling up a goal's Obstacle Plan, and running Recovery/Restart flows for stalled goals. This is what makes career management something a user can *talk through* with SIA rather than a form they fill out — "Why am I behind?" resolves to a real tool call against real data, not a canned response.

### User Story
As a **Busy Professional** (P2), I want to ask SIA about my career goals in plain language — "what should I do today," "why am I behind," "restart my stalled portfolio goal" — and get an answer grounded in my actual tasks, levels, and progress, so that career coaching feels like talking to someone who has actually looked at my plan.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | SIA answers career questions conversationally with minimal structure — a sentence or two plus one suggested next action. |
| **Deep** | SIA responses include structured action cards (goal cards, progress cards, confirmation cards) with tappable deep links into the relevant `/career` screen, matching the platform's existing chat-artifact pattern. |

### Technical Foundation

**Tool domain naming convention:** `career.<resource>.<action>` (e.g., `career.goal.create`, `career.progress.overview`, `career.task.complete`), consistent with the platform's existing LangGraph tool-naming style used across other domains.

**Live-coach extras shipped in this phase (beyond baseline CRUD):**
- **Level names in conversation:** `career.progress.goal` and `career.goal.get` return `current_level` + `level_title` so SIA can say "Level 3/5 — Practice and Projects" instead of a bare number.
- **Obstacle Plan access:** SIA can read and help populate a goal's obstacle plan mid-conversation, sharing the exact `risk_status` contract with F12.6 (no drift between what SIA says and what the `/obstacles` page shows).
- **Recovery/Restart flows:** for goals flagged `at_risk` or with no progress in N days, SIA can offer a "restart" flow — a scaled-down, single-task re-entry point rather than expecting the user to pick back up a full weekly plan cold.
- **Confirmation gating:** matches the platform-wide permission model — read/analyze/draft actions execute immediately; create/update/delete/bulk actions require explicit user confirmation via a structured confirmation card before persisting. Archive is preferred over hard delete.
- **Tool execution flow:** message → intent detection → entity extraction → permission check → tool selection → execute-or-confirm → DB update → progress recalculation → gamification update → SIA response with action card, matching the platform's standard LangGraph tool-execution pipeline.

**Explicitly OFF in this phase:** the **proactive nudge engine** (`career.proactive.generate_nudge`, `career.proactive.schedule_scan` — trigger types: no_progress, deadline_near, streak_risk, level_near_complete, weekly_review, task_due, application_followup, interview_tomorrow, high_momentum, risk_detected) is implemented at the tool level but **flag-gated OFF**. SIA does not currently reach out proactively about career goals; all career coaching in this phase is reactive (user-initiated). This mirrors the platform's broader pattern of shipping proactive-messaging infrastructure behind a flag before enabling it (see: idle job-fleet storm postmortem, activity-gated background jobs) — proactive career nudges are a deliberate follow-up decision, not an oversight.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Career-intent chat messages resolved via tool call (not generic text) | 80%+ | Intent-detection → tool-invocation rate |
| Confirmation card acceptance rate (create/update/delete) | 60%+ | Confirmation shown → confirmed conversion |
| "Why am I behind?" / progress-review query tool accuracy | 95%+ match live data | Manual QA against `career.ai.review_progress` output |
| Level-name accuracy in SIA responses (matches `career_goal_levels`) | 100% | Contract test between chat response and DB state |
| Recovery/Restart flow completion (user re-engages within 7 days of offer) | 30%+ | Flow-offered → task-completed conversion |

### Acceptance Criteria

- [x] Full CRUD tool set implemented for profile, goals, levels, tasks, progress, evidence: `career.profile.get/update`, `career.goal.create/list/get/update/archive/delete`, `career.level.create/update/complete`, `career.task.create/update/complete/reopen/bulk_create`, `career.progress.overview/goal/weekly/log_focus_time`, `career.evidence.upload/review`
- [x] Confirmation required before: saving a new AI-generated goal, major goal-field updates, bulk task updates, delete/archive, any external send action
- [x] Read/analyze/draft actions (list, get, progress view, roadmap draft) execute without confirmation
- [x] Level names/titles surfaced directly in SIA's progress responses
- [x] Obstacle Plan readable and editable by SIA mid-conversation, sharing `risk_status` contract with F12.6
- [x] Recovery/Restart flow available for goals flagged `at_risk` or stalled
- [x] All AI career actions logged (tool name, input/output payload, confirmation status) for audit
- [x] "Archive over delete" is the default recommendation SIA gives, matching the system-prompt rule
- [ ] Proactive nudge generation (`career.proactive.generate_nudge`, `.schedule_scan`) — **built but flag-gated OFF**; SIA does not proactively message users about career goals in this phase
- [ ] Voice-mode career actions ("log 45 minutes of resume work" via voice) — **not verified built**; text-chat tool routing is confirmed, voice-specific routing is unconfirmed

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Ambiguous goal reference** ("delete my old goal" with 3 goals matching "old") | Entity extraction returns multiple candidate `goal_id`s | List candidates, ask user to disambiguate before any tool executes | "Which one? Frontend Developer, Freelance Designer, or Product Manager?" |
| **User rejects a confirmation card** | `career.ai.confirm-action` → reject path | No DB write occurs; action logged as `rejected` | "No problem — I won't make that change." |
| **Tool call fails mid-execution (DB error)** | Tool execution throws | Roll back any partial writes (transactional), surface generic failure without leaking internals | "Something went wrong saving that — please try again." |
| **SIA references a level/task that was deleted since the conversation started** | Stale entity reference in multi-turn conversation | Re-fetch live state before acting, not the conversation's cached snapshot | "That task isn't on your plan anymore — want me to check what's current?" |
| **Recovery/Restart offered on a goal that isn't actually stalled** | Risk classifier false positive | `risk_status` is recomputed live at offer-time, not from a stale cached flag | Silent: offer only renders if risk_status is still `at_risk` at message-send time |
| **Proactive nudge tool called directly despite feature flag OFF** | `career.proactive.generate_nudge` invoked while `ENABLE_CAREER_PROACTIVE_NUDGES` (or equivalent) is off | Tool call short-circuits, returns a no-op result, does not send anything to the user | Silent: no user-facing message; this is a defensive guard, not a user-facing error |

### SIA Career Tool Execution Flow (High-Level)

```
Career Chat Message Handling:

1. User message → Intent detection
   ("what should I do today" → next_best_action intent)

2. Entity extraction
   (which goal_id, task_id, level_id is this about?)
   - IF ambiguous → ask user to disambiguate, stop here

3. Permission check
   (read/analyze/draft = immediate; create/update/delete/bulk = confirm)

4. Tool selection
   (map intent → career.* tool, per the platform's Intent Map)

5a. Immediate-execution path (read/analyze/draft):
   - Execute tool → format response → return with action cards

5b. Confirmation-required path (create/update/delete/bulk):
   - Execute in "preview" mode → render confirmation card
   - WAIT for user confirm/cancel
   - IF confirmed → execute for real → log to ai_career_actions
   - IF rejected → log as rejected, no DB write

6. Post-execution:
   - Database update
   - Progress recalculation (level/goal rollup)
   - Gamification update (XP/streak/badge check)
   - SIA response assembled with structured action card + deep link
```

### Cross-Pillar Connections

**To 5-Level Progression (F12.1) & Weekly Execution Engine (F12.2):**
- Every read/write tool in this domain operates directly on the same tables those features own — SIA has no separate "AI view" of career data, only the live data.

**To Career Obstacle Plan (F12.6):**
- Shares the `risk_status` contract and root-cause taxonomy exactly; this is the one place in the Career pillar where UI and AI-tool output are contractually required to match.

**To Cross-Domain Intelligence (E08) / Coach's LangGraph tool routing:**
- Registers into the same LangGraph tool-routing system that already serves Fitness, Nutrition, and Wellbeing tools — career intents flow through the identical intent-detection → tool-selection pipeline, not a bespoke career-only router.

**To Data Integrations (E09):**
- Calendar/reminder tools (`career.calendar.create_event`, `career.reminder.create/cancel`) are designed against the same integration surface as other pillar reminders, though calendar sync itself is Should-Have/unconfirmed (see MVP Scope).

### Dependencies
- **F12.1–F12.6 (all Career features):** This tool domain is the conversational front door to every other feature in this epic
- **E08 (Cross-Domain Intelligence):** Shares the coach's LangGraph tool routing infrastructure
- **AI Coach hot path (`rag-chatbot.controller` → `langGraphChatbotService`):** Career tools are one domain among the coach's full tool registry, not a separate service

### MVP Status
[X] MVP Core (Built) — proactive nudge sub-feature implemented but flag-gated OFF; voice-mode routing unconfirmed

---

## MVP SCOPE & BUILD STATUS

Per this platform's documentation standard, build status is stated explicitly rather than implied. This section reproduces and confirms the tiering from the original design document (`docs/career-module.md` §22) against what F12.1–F12.7 above actually document as shipped.

### Must-Have (✅ Built — documented as F12.1–F12.7 above)

- Career dashboard (`/career`, 9-tab shell)
- Manual career goal creation
- AI goal generator (roadmap wizard, draft-then-confirm)
- 5-level goal structure (F12.1)
- Tasks and progress, per-level task editor (F12.2, F12.3)
- Weekly progress / Weekly Execution Engine (F12.2)
- Focus Areas — per-goal scoped trackers (F12.4)
- Career Analytics — consistency heatmap + momentum chart (F12.5)
- Career Obstacle Plan + curated resources (F12.6)
- Badges (milestone-tier, code-seeded catalog) (F12.6)
- SIA goal view/create/update/delete tools, progress view, confirmation cards (F12.7)
- AI action logging (`ai_career_actions`)
- XP and streaks
- Basic career score
- Premium gates (goal-count limits, gated AI features — gating mechanism built; the gated *features themselves* below are largely Should-Have/unconfirmed)

### Should-Have (🟡 Named in design, NOT verified built — treat as a gap list, not a feature list)

These appear in the source design doc's tool catalog and Phase 7/8 roadmap but are **not confirmed implemented** as of this PRD. They should not be assumed available in the current `/career` build without direct verification:

| Capability | Named Tool(s) | Status |
|---|---|---|
| Skill gap analysis | `career.ai.skill_gap_analysis` | Unconfirmed |
| Resume review | `career.resume.review` | Unconfirmed |
| Portfolio tracker / review | `career.portfolio.review` | Unconfirmed |
| Application tracker | `career.application.create/update/list` | Unconfirmed (Focus Areas F12.4 partially depend on this) |
| Calendar integration | `career.calendar.create_event` | Unconfirmed |
| AI weekly review (automated end-of-week summary) | — (extension of `career.ai.review_progress`) | Unconfirmed |
| Badges (advanced tier — Interview Warrior, Networking Pro, First Client, etc.) | — | Unconfirmed beyond milestone-tier badges |
| Advanced analytics (application funnel, interview conversion, per-focus-area momentum breakdown) | — | Unconfirmed |
| AI interview practice | `career.interview.start_practice`, `career.interview.evaluate_answer` | Unconfirmed |

**Why this matters:** several Should-Have items are load-bearing for parts of the Must-Have feature set as documented above — most notably, Focus Areas (F12.4) that key off applications/interviews are functionally inert until the Application Tracker exists. This is flagged in F12.4's own MVP Status line rather than hidden.

### Advanced Later (❌ Not built)

- AI interview simulation (full multi-turn mock interview, beyond `evaluate_answer` scoring)
- Job matching
- LinkedIn optimization
- Salary negotiation coach
- Mentor matching
- Community leaderboard (career-specific)
- Career templates marketplace
- Freelance client tracker
- Certification tracker

### Unconfirmed "Improvements" Layer (named in design §3, status unverified)

The original design's "improvements added to the original feature set" section names several cross-cutting capabilities whose build status is **not confirmed** and should be treated as open items, not assumed shipped:

- **Career Risk Detection** — the risk taxonomy exists conceptually (shared between F12.6 Obstacle Plan and F12.7 `risk_status`), but a standalone, always-on risk-detection *service* (as distinct from on-demand `career.ai.review_progress` calls) is unconfirmed.
- **Undo and Activity Log** — `ai_career_actions` logging is built (F12.7); a user-facing **undo** capability ("undo changes," "restore previous roadmap") is unconfirmed.
- **Deep Links from AI Chat** — action cards with deep links are part of the Deep-mode chat experience per F12.7's Flexibility Modes, but full deep-link coverage across every action type (Upload Resume, Practice Interview, Open Weekly Plan, View Analytics) is unconfirmed.
- **Voice Mode Support** — career-specific voice commands ("Create a career goal for becoming a product manager," "Log 45 minutes of resume work") are unconfirmed; the platform's general voice-coaching channel (E02) exists, but career-tool routing through it specifically is not verified.

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (Must-Have Tier)

- [x] Career treated as a structural pillar (schema, services, UI) parallel to Fitness/Nutrition/Wellbeing, not a goal sub-category
- [x] Every career goal decomposes into exactly 5 levels with working unlock/completion logic
- [x] Weekly Execution Engine schedules, scores, and carries over tasks correctly, including the `cadence` overflow fix (migration `030000`)
- [x] Per-level task editing works both at goal-creation (draft) time and in-plan
- [x] Focus Areas are selectable, editable, and drive dashboard relevance per goal
- [x] Consistency heatmap and momentum chart render from real event data with correct timezone handling
- [x] Obstacle Plan (`/obstacles`) surfaces root-cause blockers with matched resources and shares a `risk_status` contract with SIA
- [x] SIA can view, create (with confirmation), update (with confirmation), archive/delete (with confirmation), and analyze career goals conversationally
- [x] AI actions are logged for audit
- [ ] Proactive career nudges — **intentionally not launched**; flag OFF pending a dedicated enablement decision
- [ ] Should-Have tier (resume/portfolio review, skill gap, application tracker, calendar, interview practice) — **not required for Must-Have launch readiness**, explicitly out of scope for this epic's closure

### Quality Gates

| Gate | Criteria | Measurement |
|------|----------|-------------|
| **Progress Math Integrity** | Task completion always rolls up correctly to level and goal progress, no drift after edits/reopens | Integration tests + prod error-rate monitoring |
| **Cadence Data Integrity** | Zero `cadence` column overflow errors post-fix | Prod error log monitoring on `career_tasks` writes |
| **SIA/UI Risk-Status Agreement** | `/obstacles` page and `career.ai.review_progress` never disagree on `risk_status` for the same goal | Contract test |
| **Confirmation Discipline** | 100% of create/update/delete/bulk career tool calls pass through the confirmation gate | Audit log review (`ai_career_actions.requires_confirmation`) |
| **Timezone Correctness** | Heatmap day-bucketing matches user-local day boundaries, not UTC | Manual QA across DST-adjacent timezones |
| **Badge Non-Regression** | Catalog sync-prune never revokes an already-earned badge | Regression test on prune logic |

### User Experience Validation

| Persona | Key Experience | Success Indicator |
|---------|---------------|-------------------|
| **P3: Optimization Enthusiast** | Tracks level-by-level progress and consistency analytics with real precision | Uses Analytics tab weekly, references specific level names unprompted |
| **P2: Busy Professional** | Gets a realistic weekly task list without re-planning from scratch, talks to SIA for quick answers | 60%+ weekly task completion, resolves "what should I do today" via SIA in under 2 turns |
| **P1: Holistic Health Seeker** | Catches a career stall before it becomes abandonment, via Obstacle Plan | Obstacle Plan → resumed activity within 7 days |

---

## CROSS-EPIC DEPENDENCIES

### E05: Fitness Pillar
- Source of the level/XP/progression grammar Career structurally mirrors (F12.1)
- Shared UI/UX pattern language so users transfer intuition between pillars without relearning

### E07: Wellbeing Pillar
- Career stress/stall signals are exactly the kind of professional-life driver that explains otherwise-unexplained mood/stress patterns already tracked in Wellbeing

### E08: Cross-Domain Intelligence
- Career becomes a fourth correlatable sensor domain: weekly completion ratio, level transitions, and obstacle-plan events are all candidate variables for pattern correlation, predictive insights, and the Holistic Health Score
- SIA Career Tools (F12.7) register into the same LangGraph tool-routing and intent-detection pipeline E08's coaching features already use

### E09: Data Integrations
- Calendar/reminder infrastructure (`career.calendar.create_event`, `career.reminder.*`) is designed against the same integration surface as other pillar reminders — calendar sync itself remains Should-Have/unconfirmed
- Evidence file storage (resumes, portfolio links, certificates) reuses the platform's existing object-storage integration pattern

### E10: Analytics & Insights Dashboard
- Career Analytics (F12.5) reuses the pure-SVG clay-chart rendering approach established for cross-pillar analytics elsewhere on the platform
- Career score is a candidate input to any future platform-wide "life score" rollup, consistent with how other pillar scores already feed holistic scoring

### AI Coach LangGraph Tool Routing (Platform Infrastructure)
- Career tools (F12.7) are one domain among the coach's full tool registry served by `rag-chatbot.controller` → `langGraphChatbotService`, not a standalone career-only chat surface

---

## TECHNICAL CONSIDERATIONS

### Data Models (Career Pillar)

**Career Goal Record:**
```json
{
  "goal_id": "uuid",
  "user_id": "uuid",
  "title": "Become a Junior Frontend Developer",
  "description": "Build skills, portfolio, and apply for junior frontend roles.",
  "goal_type": "job_search",
  "target_role": "Junior Frontend Developer",
  "status": "active",
  "priority": "high",
  "current_level": 3,
  "progress_percentage": 52,
  "deadline": "2026-08-15",
  "weekly_available_hours": 8,
  "created_by": "ai",
  "ai_generated": true,
  "focus_areas": ["applications", "portfolio", "resume"],
  "risk_status": "on_track",
  "created_at": "2026-06-23T09:00:00Z",
  "updated_at": "2026-07-01T14:22:00Z"
}
```

**Career Goal Level Record:**
```json
{
  "level_id": "uuid",
  "goal_id": "uuid",
  "level_number": 3,
  "title": "Practice and Projects",
  "description": "Build portfolio, practice, improve quality.",
  "progress_weight": 20,
  "xp_reward": 600,
  "unlock_status": "unlocked",
  "completion_status": "in_progress",
  "completed_at": null
}
```

**Career Task Record:**
```json
{
  "task_id": "uuid",
  "user_id": "uuid",
  "goal_id": "uuid",
  "level_id": "uuid",
  "title": "Build portfolio homepage",
  "task_type": "project",
  "status": "todo",
  "priority": "medium",
  "cadence": "weekly",
  "due_date": "2026-07-06",
  "estimated_minutes": 90,
  "actual_minutes": 0,
  "xp_reward": 50,
  "requires_evidence": true,
  "completed_at": null
}
```

**Progress Event Record:**
```json
{
  "event_id": "uuid",
  "user_id": "uuid",
  "goal_id": "uuid",
  "level_id": "uuid",
  "task_id": "uuid",
  "event_type": "task_completed",
  "progress_delta": 4,
  "xp_delta": 50,
  "created_at": "2026-07-01T18:05:00Z"
}
```

**AI Career Action (Audit) Record:**
```json
{
  "action_id": "uuid",
  "user_id": "uuid",
  "action_type": "goal_update",
  "tool_name": "career.goal.update",
  "input_payload": { "goal_id": "goal_123", "updates": { "deadline": "2026-08-15" } },
  "output_payload": { "status": "confirmed" },
  "status": "confirmed",
  "requires_confirmation": true,
  "confirmed_at": "2026-07-01T18:06:10Z",
  "rejected_at": null,
  "created_at": "2026-07-01T18:05:50Z"
}
```

**Career Schema Tables (10, shipped):**
`career_profiles`, `career_goals`, `career_goal_levels`, `career_tasks`, `progress_events`, `career_evidence`, `career_applications`, `ai_career_actions`, `proactive_messages`, `career_user_preferences`.

> **Note:** `career_applications` exists in the schema per the source design, but the Application Tracker *feature* built on top of it (F12.4's dependency) is Should-Have/unconfirmed — the table's presence does not imply the tracker UI/tool surface is complete. Similarly, `proactive_messages` exists but the generation/scan tools writing to it (`career.proactive.*`) are flag-gated OFF.

### API Endpoints (Career Pillar — Must-Have surface)

```
# Goals
POST   /career/goals
GET    /career/goals
GET    /career/goals/:goalId
PATCH  /career/goals/:goalId
DELETE /career/goals/:goalId
POST   /career/goals/:goalId/archive
POST   /career/goals/:goalId/pause
POST   /career/goals/:goalId/resume

# Levels
GET    /career/goals/:goalId/levels
POST   /career/goals/:goalId/levels
PATCH  /career/goals/:goalId/levels/:levelId
POST   /career/goals/:goalId/levels/:levelId/complete

# Tasks
POST   /career/tasks
GET    /career/tasks
GET    /career/tasks/:taskId
PATCH  /career/tasks/:taskId
POST   /career/tasks/:taskId/complete
POST   /career/tasks/:taskId/reopen
POST   /career/tasks/bulk

# Progress
GET    /career/progress/overview
GET    /career/progress/weekly
GET    /career/progress/goals/:goalId
POST   /career/progress/focus-time

# Obstacles / Analytics
GET    /career/obstacles/:goalId
POST   /career/obstacles
GET    /career/analytics/overview
GET    /career/analytics/score
GET    /career/analytics/weekly

# AI Career Coach
POST   /career/ai/generate-roadmap
POST   /career/ai/generate-weekly-plan
POST   /career/ai/review-progress
POST   /career/ai/next-best-action
POST   /career/ai/execute-tool
POST   /career/ai/confirm-action
POST   /career/ai/reject-action
```

> Endpoints under `/career/ai/resume-review`, `/career/ai/portfolio-review`, `/career/ai/skill-gap`, `/career/ai/interview/*`, `/career/applications/*`, and `/career/notifications/proactive-scan` are named in the source design but fall under the Should-Have tier documented above — not included here as confirmed-live Must-Have surface.

### Performance Requirements

| Operation | Target Latency | Rationale |
|-----------|---------------|-----------|
| Task completion → progress/level recalculation | <500ms | Feels instant in both UI and chat confirmation flow |
| Weekly plan generation (AI) | <8 seconds | Acceptable wait during an explicit "plan my week" request |
| Consistency heatmap render (full year) | <500ms | Client-side pure-SVG render, no server round-trip after initial fetch |
| Momentum chart computation | <300ms | Server-side rolling-window calculation on existing indexed event data |
| SIA career tool call (read/analyze) | <2 seconds | Matches platform-wide chat responsiveness bar |
| SIA career tool call (create/update, pre-confirmation preview) | <3 seconds | Includes progress-impact preview computation before rendering confirmation card |

### Known Bug Class & Fix

**Cadence VARCHAR(20) overflow:**
- **Symptom:** LLM-generated weekly plans occasionally produced verbose cadence descriptions instead of a short enum token, overflowing the `cadence VARCHAR(20)` column on `career_tasks` and failing the insert.
- **Fix:** `normalizeCadence()` clamp applied at the task-persistence boundary, mapping free-text LLM output to the fixed cadence enum (default fallback: `weekly`), plus migration `030000` to widen/backfill affected rows.
- **Pattern relevance:** this is the same class of bug documented elsewhere on this platform for `notification_type` enum drift and PG enum-array handling — AI-generated structured output must pass through an explicit normalization boundary before touching any fixed-width or enum-constrained column. Any future LLM-writable field on the Career schema (e.g., `task_type`, `goal_type`, `activity_type`) should apply the same clamp-before-persist discipline.

### Security & Privacy

- Career data is treated as sensitive per the source design (resume content, salary expectations, employment history, interview notes, company names, application history) — encryption at rest/in transit, role-based access control, and audit logging (`ai_career_actions`) are part of the Must-Have build.
- Evidence files (resumes, portfolio links, certificates) follow the platform's existing object-storage access pattern with expiring file access, consistent with the fix already applied elsewhere on the platform for expiring-presigned-URL issues.
- AI actions on career data require explicit confirmation for create/update/delete/bulk operations; archive is preferred over hard delete by default in SIA's behavior rules.

---

## TESTING STRATEGY

### Unit Testing
- Level unlock/completion transition logic (F12.1)
- `normalizeCadence()` clamp behavior across malformed LLM output shapes (F12.2)
- Progress-percentage rollup math (task → level → goal) including reopen/reverse paths (F12.2, F12.3)
- Focus-area aggregate resolution against underlying event/evidence/application tables (F12.4)
- Momentum trend classification (building/steady/slipping) including outlier-week smoothing (F12.5)
- Risk-status computation shared between Obstacle Plan and `career.ai.review_progress` (F12.6, F12.7)

### Integration Testing
- Real route ↔ real Postgres for full goal-creation flow: draft (AI or manual) → edit → confirm → persisted goal+levels+tasks in one transaction
- Task completion → level completion → goal completion → XP award chain, asserting no double-award on edge cases (reopen-then-recomplete)
- SIA tool call → confirmation card → confirm/reject → DB state, asserting rejected actions never write
- Timezone-correct heatmap bucketing across DST boundaries using `user_preferences.timezone`

### AI Tool Safety Testing
- Confirmation gating is enforced server-side, not just client-side (a client bypass attempt must still require server confirmation)
- Ambiguous entity resolution (multiple goals matching a fuzzy reference) always asks for disambiguation rather than guessing
- `career.proactive.*` tools verified to be true no-ops while the feature flag is OFF (defense against accidental invocation)

### User Acceptance Testing
- Level-by-level progression feels equivalent in clarity to the Fitness pillar's level system (cross-pillar consistency check)
- Weekly task list is realistic against stated `weekly_available_hours` (no plan that assumes more time than the user has)
- Obstacle Plan resolution actually correlates with resumed activity, not just plan creation

### Performance Testing
- Heatmap render time at full-year history scale
- Weekly plan generation latency under concurrent load
- Progress-rollup recalculation performance for goals with large task counts (50+ tasks across 5 levels)

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Focus Areas relying on unbuilt Application Tracker feel broken** | Medium | Confirmed (documented) | F12.4's MVP Status explicitly flags the dependency; UI should degrade gracefully (hide, not error, when application data is absent) |
| **Cadence overflow recurrence on new LLM-writable fields** | Medium | Medium | Apply the same normalize-before-persist discipline to any future free-text-adjacent enum column (`goal_type`, `task_type`, `activity_type`) |
| **UI/SIA risk-status drift** | High | Low (mitigated by shared contract) | F12.6/F12.7 explicitly share the same `risk_status` computation path; contract test enforces this |
| **Proactive nudges silently expected by users who read the original design doc** | Medium | Medium | This PRD explicitly documents the flag as OFF in both F12.7 and the MVP Scope tiers, so it isn't silently assumed shipped |
| **Badge catalog prune revoking earned badges** | Medium | Low | Prune logic scoped to unearned/no-data catalog rows only, matching the pattern already proven safe in the platform's achievements system |
| **5-level structure feels rigid for non-linear career paths** (e.g., ongoing freelance income, not a "completable" goal) | Medium | Medium | Not yet mitigated in this build; flagged as a product question for a future phase rather than solved here |
| **Should-Have tier scope creep during future work mistaken for "just finishing what's there"** | Medium | Medium | This PRD's explicit tiering (Must-Have/Should-Have/Advanced-Later) is the guardrail — any Should-Have work should re-enter through PLAN → CONTRACT → BUILD, not be assumed a small addition |

---

## ROADMAP & FUTURE ENHANCEMENTS

### Current Scope (This PRD)
F12.1–F12.7, Must-Have tier, as documented above

### Next Phase Candidates (Should-Have tier — requires explicit scoping before build)
- Resume review, Portfolio review, Skill gap analysis (premium AI review tools)
- Application Tracker (unblocks the full Focus Areas experience for job-search goals)
- Calendar integration for interviews/deadlines
- AI weekly review (automated end-of-week summary + next-week auto-draft)
- Advanced analytics: application funnel, interview conversion, per-focus-area momentum breakdown
- Enabling the proactive nudge engine (flag flip + rollout plan, not new build — infrastructure already exists per F12.7)

### Later Phase Candidates (Advanced Later tier)
- AI interview simulation (full multi-turn mock interview)
- Job matching, LinkedIn optimization, salary negotiation coach
- Mentor matching, community leaderboard (career-specific)
- Career templates marketplace
- Freelance client tracker, certification tracker

### Open Product Question (not a build item)
Whether the fixed 5-level structure should remain mandatory for all `goal_type`s, or whether ongoing/non-completable goal types (freelance income, personal brand) warrant a non-linear progression model — flagged in Risks above, intentionally left unresolved here rather than guessed at.

---

## DOCUMENT GOVERNANCE

**Review Schedule:** Re-verify Should-Have tier build status before any future PRD or roadmap references those capabilities as shipped.
**Update Triggers:** Proactive nudge flag flip, Application Tracker completion (unblocks F12.4 dependency), any change to the 5-level structural mandate.
**Version Control:** All feature changes require version increment with rationale.
**Ownership:** Product Team + AI/ML Team (career tool domain shares ownership with the platform-wide LangGraph tool routing system).
**Source Design Doc:** `docs/career-module.md` (Balencia Career Module + SIA AI Coach Integration Plan, v1.0) — this PRD reflects the Must-Have subset of that design as actually shipped 2026-06-23 through 2026-07-03; the source doc's Should-Have/Advanced-Later sections remain the reference for future scoping but are not build commitments.

---

*Balencia Platform - E12: Career Pillar & Execution OS PRD v1.0*
*"Fitness trains the body. Career trains the future."*
*A Fourth Pillar for Cross-Domain Intelligence — Structural Parity with Fitness/Nutrition/Wellbeing*

---

*Document Classification: INTERNAL USE - Product Foundation*
*Created: 2026-07-08 | Epic Specification Reflecting Shipped Must-Have Scope*
*Total Features: 7 (F12.1-F12.7) | All Must-Have Core (Built) | Should-Have and Advanced-Later Tiers Explicitly Unconfirmed*
