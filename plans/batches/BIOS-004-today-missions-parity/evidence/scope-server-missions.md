# Server-Side Scope Trace: MISSIONS + XP Contracts

**Scope:** `yhealth-app/server` (read-only trace, no `.env` read). All paths below are relative to
`/Users/hamza/Desktop/balencia-design/yhealth-app/server/` unless stated otherwise.
**Mount root:** `app.use(env.api.prefix, routes)` — `src/app.ts:196`; `env.api.prefix` defaults to
`'/api'` (`src/config/env.config.ts:177`, overridable via `API_PREFIX`, not read here).

---

## 0. Executive summary (read this first)

1. **`/v1/goals/unified` is read-only aggregation.** It has no CREATE/UPDATE/COMPLETE/DELETE of its
   own — those verbs live on four separate per-domain surfaces (health `user_goals` via
   `/assessment/goals*`, life `life_goals` via `/v1/journal/goals*`, `/career/goals*`,
   `/finance/goals*`), each with its own auth/validation/DB shape. The aggregator just reads and
   merges them (`src/services/goals-aggregator/goals-aggregator.service.ts:105-121`).
2. **Mission-tier derivation (BIOS-002 ADR-4) is NOT computed server-side.** The unified goal object
   only carries `isPrimary: boolean` and `source: 'health'|'life'|'career'|'finance'` — no `tier`
   field exists on `UnifiedGoal` (`src/services/goals-aggregator/unified-goal.types.ts:9-26`). The
   client-side tier-derivation rule referenced by ADR-4 (`isPrimary && source==='life'` → `'life'`;
   `isPrimary` → `'main'`; else by `source`/`cadence`) lives in the **client mapping plan**, not this
   server: `plans/batches/BIOS-002-ios-simulator-contracts/evidence/architecture-plan.md:285`.
3. **XP is NOT awarded synchronously for most goal/mission completions.** Only **career** goals/
   levels/tasks award XP synchronously inside the same request
   (`src/services/career-progress.service.ts:107,132,196`). Health goals (`user_goals`, assessment
   surface), life goals (`life_goals`, journal surface), and finance goals award **zero** XP on
   create/update/complete anywhere in the codebase I could find (`awardXP` callers list below has no
   caller in `assessment.controller.ts`, `life-goals.service.ts`, or `finance.service.ts`). The only
   path by which a completed health/life goal can still earn XP is an **async, up-to-15-minute-late**
   background job that checks goal-linked `dynamic_achievements` and awards `'achievement'` XP on
   unlock (`src/jobs/achievement-check.job.ts:36-69`) — not a direct consequence of the COMPLETE call.
4. **Career COMPLETE responses do not surface the XP/level-up info the award produced.** `awardXP`
   returns an `XPResult` (`xpEarned`, `newLevel`, `leveledUp`, …) but every caller in
   `career-progress.service.ts` awaits it and discards the return value
   (`src/services/career-progress.service.ts:107,132,196` — no assignment); the controller response
   is `{ task/level/goal, levelCompleted, goalCompleted }`
   (`src/controllers/career.controller.ts:93-104,128-133`). A client must separately call
   `GET /api/gamification/stats` or `/xp-history` to learn what XP/level-up just happened.
5. **Streak side effects of completing a goal**: only **career** task/session completion calls
   `streakService.recordActivity(userId, 'career', …)` synchronously
   (`src/services/career-progress.service.ts:197,350,367`). Health, life, and finance goal
   completion never call `updateStreak`/`recordActivity`. The generic
   `gamificationService.updateStreak()` (`POST /api/gamification/streak/update`) is invoked only from
   workout/water logging (`src/services/workout-plan.service.ts:517`, `src/services/water-intake.service.ts:130,134`),
   not from any goal-completion path.
6. **No goal/XP-specific rate limiting or idempotency-key enforcement.** Goal CRUD and XP-award
   endpoints rely only on the app-wide `globalLimiter` (100 req/15 min per IP by default,
   `src/middlewares/rateLimiter.middleware.ts:44-52`, `src/config/env.config.ts:106-107`).
   `Idempotency-Key` is enforced only on **credit-metered AI** routes via `consumeCredits()`
   (`src/middlewares/entitlement.middleware.ts:330,340-348`) — e.g. `/v1/journal/goals/from-assessment`,
   `/v1/journal/goals/:goalId/decompose`, `/career/goals/execution|convert|regenerate` — never on
   plain goal create/update/complete/delete.
7. **Concurrency:** `assessment.controller.ts`'s `updateGoal` (health goals, incl. the "auto-complete
   at 100% progress" branch) does a plain read-then-write with **no transaction and no row lock**
   (`src/controllers/assessment.controller.ts:1074-1186`) — a real double-fire risk under concurrent
   PATCHes. `gamificationService.awardXP` also reads `total_xp` then writes it back inside a
   transaction but **without `SELECT … FOR UPDATE`** (`src/services/gamification.service.ts:176-211`)
   — concurrent awards for the same user can lose an increment (last-writer-wins). By contrast,
   career's `completeTask`/level-complete paths **do** use `SELECT … FOR UPDATE` inside a transaction
   (`src/services/career-progress.service.ts:182,198`) and finance's `contributeToGoal` uses an
   atomic SQL increment (`src/services/finance.service.ts:878-894`) — both race-safe.

---

## 1. GOALS / MISSIONS routes

### 1.1 `/v1/goals/unified` — the unified aggregation surface

| Method | Path | Middleware | Validation |
|---|---|---|---|
| GET | `/api/v1/goals/unified` | `authenticate` (`src/routes/goals.routes.ts:13`) → `validate(unifiedGoalsQuerySchema, 'query')` | `src/validators/goals.validator.ts:7-10` |

- Mount: `router.use('/v1/goals', goalsRoutes)` — `src/routes/index.ts:512`.
- Route file: `src/routes/goals.routes.ts:1-17` — **only one route exists**: `GET /unified`. There is
  no unified CREATE/UPDATE/COMPLETE/DELETE/progress-log endpoint.
- Zod query schema (`src/validators/goals.validator.ts:7-10`):
  ```ts
  status: z.enum(['active','in_progress','paused','completed']).optional()
  source: z.enum(['health','life','career','finance']).optional()
  ```
- Controller: `getUnified` (`src/controllers/goals-unified.controller.ts:12-18`) — auth-checks
  `req.user?.userId`, throws `ApiError.unauthorized()` if missing (`:14`), delegates to
  `getUnifiedGoals(userId, { status, source })` (`:16`), and returns
  `res.status(200).json({ success: true, data: result })` (`:17`) — note this bypasses the shared
  `ApiResponse.success` envelope used everywhere else (no `message`/`timestamp` fields).

**Aggregation logic** — `src/services/goals-aggregator/goals-aggregator.service.ts`:
- Runs 4 source queries in parallel via `Promise.all` (`:109-111`):
  - `healthGoals()` (`:28-45`) → `SELECT … FROM user_goals WHERE user_id = $1` (`:29-31`)
  - `lifeGoals()` (`:47-65`) → `SELECT … FROM life_goals WHERE user_id = $1` (`:48-50`)
  - `careerGoals()` (`:67-83`) → `SELECT … FROM career_goals WHERE user_id = $1` (`:68-69`)
  - `financeGoals()` (`:85-103`) → `SELECT … FROM finance_saving_goals WHERE user_id = $1` (`:86-87`)
- Each source is wrapped in `safeRows()` (`:14-26`): a missing relation/column (Postgres codes
  `42P01`/`42703`) degrades to `[]` with a `logger.warn` instead of throwing — a source table that
  hasn't migrated yet just silently disappears from the union.
- Per-row mapping produces a `UnifiedGoal` (`unified-goal.types.ts:9-26`) with fields:
  `id, source, domain, title, description, progress (0-100), status, isPrimary, target?|amount?|level?,
  cadence?, dueDate?, editable, deepLink, updatedAt`.
  - `editable: true` only for `health`; `false` for life/career/finance (`:42,62,80,100`).
  - `deepLink`: `null` (health), `/wellbeing` (life), `/career`, `/finance` (`:42,62,80,100`).
- Status normalization — `src/services/goals-aggregator/normalize.ts:7-20`: excludes
  `cancelled|canceled|archived` (returns `null`, row is dropped via `flatMap` — see
  `goals-aggregator.service.ts:35,54,73,91`); maps `achieved` (finance's terminal DB status) →
  `completed` (`normalize.ts:15`); unknown career status → `active` (`:17`); any other unknown,
  non-excluded status → `active` fallback (`:19`).
- Finance progress: `current/target * 100` clamped 0-100, divide-by-zero guarded
  (`normalize.ts:23-28`).
- **Sort / "primary" derivation** (`goals-aggregator.service.ts:115-119`): `isPrimary` goals sort
  first, then most-recently-updated, then `id` as a stable tiebreaker. **This is the entirety of the
  server-side ADR-4 signal** — the response gives the client `isPrimary` + `source` per goal and
  nothing else; there is no `tier: 'life'|'main'|'side'` field computed here. The
  life/main/side **tier mapping itself is a client-only concern**, documented in the architecture
  plan (not this server) as: `isPrimary && source==='life'` → `'life'`; `isPrimary` (any other
  source) → `'main'`; else derived from `source`/`cadence`
  (`plans/batches/BIOS-002-ios-simulator-contracts/evidence/architecture-plan.md:285`).
- `buildSummary()` (`normalize.ts:30-47`) returns `{ total, active, inProgress, paused, completed,
  avgProgress, bySource: {health,life,career,finance} }`.
- Full response shape: `{ success: true, data: { goals: UnifiedGoal[], summary: UnifiedGoalsSummary } }`.

### 1.2 Health goals — `/api/assessment/goals*` (backs `source: 'health'`, table `user_goals`)

Mount: `router.use('/assessment', assessmentRoutes)` — `src/routes/index.ts:194` (all routes behind
`router.use(authenticate)` — `src/routes/assessment.routes.ts:21`).

| Method | Path | Middleware (after `authenticate`) | Zod schema |
|---|---|---|---|
| POST | `/goals` (create custom) | `validate(goalSetupSchema)` | `src/validators/assessment.validator.ts:100-120` |
| POST | `/goals/accept-suggested` | `validate(acceptSuggestedGoalsSchema)` | `:130-147` |
| GET | `/goals` (list) | — | — |
| PATCH | `/goals/:goalId` (update / **status→completed**) | `validate(updateGoalSchema)` | `:150-158` |
| DELETE | `/goals/:goalId` (delete one) | — | — |
| DELETE | `/goals` (bulk delete) | `validate(deleteGoalsSchema)` | `:161-163` |
| POST | `/goals/:goalId/commit` | `validate(goalCommitmentSchema)` | `:123-127` |
| GET | `/goals/:goalId/actions` | — | (progress logging: daily actions) |
| POST | `/goals/:goalId/actions/:actionId/toggle` | — | (progress logging) |
| GET | `/goals/:goalId/auto-progress` | — | (progress logging: computed) |

Route wiring: `src/routes/assessment.routes.ts:117-172`.

**There is no dedicated `/complete` route for a health goal.** Completion happens two ways, both
inside `PATCH /goals/:goalId` → `updateGoal` (`src/controllers/assessment.controller.ts:1065-1187`):
1. Client explicitly sends `status: 'completed'` (allowed by `updateGoalSchema.status` enum
   `['active','in_progress','paused','completed','abandoned']`, `assessment.validator.ts:157`) →
   written straight through (`assessment.controller.ts:1098-1101`).
2. **Auto-complete**: if `currentValue` is patched and the recomputed `progress` crosses 100 while it
   wasn't already 100, the server force-sets `status='completed'` itself
   (`assessment.controller.ts:1172-1183`) — a *second*, unvalidated write path to `status` that
   bypasses the "editable" contract implied by the schema.

Zod schema field-by-field:
- `goalSetupSchema` (create) — **required**: `category` (`goalCategoryEnum`, 20 values incl. legacy
  health ones `weight_loss|muscle_building|sleep_improvement|stress_wellness|energy_productivity|
  event_training|health_condition|habit_building|overall_optimization` and Life-OS domain keys
  `nutrition|fitness|health|wellbeing|career|learning|productivity|finance|relationships|
  spirituality|creativity|custom` — `assessment.validator.ts:5-29`), `pillar`
  (`healthPillarEnum = z.enum(['fitness','nutrition','wellbeing'])`, `:32`), `title` (5-200 chars),
  `description` (10-1000 chars), `targetValue` (positive number), `targetUnit` (1-50 chars),
  `timeline.{startDate,targetDate,durationWeeks(1-52)}`, `motivation` (10-500 chars). **Optional
  with defaults**: `isPrimary` (`z.boolean().default(false)`, `:103`), `currentValue`.
  `.refine()` guard: `targetDate > startDate` (`:115-120`).
- `updateGoalSchema` (`:150-158`) — all optional: `title, description, targetValue, currentValue,
  targetDate, motivation, status`.
- `deleteGoalsSchema` (`:161-163`) — `goalIds: z.array(z.string().uuid()).min(1)`.
- `goalCommitmentSchema` (`:123-127`) — `goalId` (objectId), `confidenceLevel` (int 1-10),
  `acknowledgedSafetyWarnings` (bool, default false).

**CREATE trace** (`createGoal`, `assessment.controller.ts:712-843`):
- Hard cap: max 3 **active** goals per user, enforced by a `COUNT(*)` pre-check
  (`:719-727`, `throw ApiError.badRequest('Maximum 3 active goals allowed')`) — **not** DB-constrained,
  purely app-level (TOCTOU race possible under concurrent creates, no lock).
- Server-computed defaults not in the Zod schema: `milestones` (via `generateMilestones()`,
  `:730-735,1486-1511`), `safetyWarnings`/`requiresDoctorConsult` (via `runSafetyChecks()`,
  `:738-742,1513-1534` — flags e.g. >2 lbs/week weight-loss targets, or any `health_condition`
  category), `confidence_level` hardcoded to `7` (`:780`, comment "Default confidence"),
  `ai_suggested: false`, `is_safety_checked: true` (`:781-782`).
- `is_primary` is set true if the client asked OR this is the user's first goal
  (`existingGoalsCount === 0`) — `:768,807`.
- Insert wrapped in `transaction()` only to atomically unset other primary goals first
  (`:745-752`), then insert (`:755-786`).
- Side effects (all fire-and-forget / best-effort, not part of the transaction): embedding enqueue
  (`:793-800`), `notificationService.goalCreated` (`:802-808`, **awaited**, so a notification-service
  failure would 500 the request unless it swallows errors internally — not verified here), dynamic
  achievement generation (`:811-826`, `.catch()`'d), AI goal-decomposition into actions
  (`:830-836`, `.catch()`'d). **No XP award anywhere in this function.**
- Response: `ApiResponse.created(res, { goal: mapGoalRow(goal), safetyWarnings, requiresDoctorConsult
  }, 'Goal created successfully')` (`:838-842`) → HTTP 201, envelope `{ success:true, message,
  timestamp, data:{ goal, safetyWarnings, requiresDoctorConsult } }` (`src/utils/ApiResponse.ts:21-48,50-52`).

**UPDATE trace** (`updateGoal`, `:1065-1187`): dynamic `SET` clause built field-by-field
(`:1088-1141`) for `targetValue, targetDate, status, currentValue` (+ auto-recomputed `progress`,
`:1103-1115`) and regenerated `milestones` if target changed (`:1117-1139`). **Not wrapped in a
transaction**; read (`:1074-1077`) and write (`:1144-1146`) are two separate round-trips with no row
lock — see §0.7. Side effects: embedding update enqueue (`:1151-1158`, awaited), progress
notification if `currentValue` changed (`:1160-1170`), auto-complete branch (`:1172-1183`, discussed
above), `notificationService.goalCompleted` fired on either the auto-complete or the
already-100%-progress branch (`:1180,1182`). **No XP award.**
Response: `{ goal: mapGoalRow(updatedGoal) }`, message `'Goal updated successfully'` (`:1186`).

**DELETE trace**: single (`deleteGoal`, `:1193-1222`) — ownership-checked SELECT then embedding
delete-enqueue *before* the actual `DELETE FROM user_goals` (`:1201-1217`, comment "to preserve ID");
response `{ deleted: true, goalId }` (`:1221`). Bulk (`deleteGoals`, `:1228-` onward) — validates all
IDs belong to the user first (`:1239-1246`), silently drops any IDs the user doesn't own (no error for
partial ownership, just `validIds`, `:1248`).

**Progress logging** (`toggleGoalAction` / `getGoalAutoProgress`, `:1557-1575`):
- `POST /goals/:goalId/actions/:actionId/toggle` → `goalDecompositionService.toggleActionCompletion`
  (`src/services/goal-decomposition.service.ts:767-786`) — inserts/deletes a row in
  `goal_action_completions` keyed on `(action_id, user_id, completion_date=CURRENT_DATE)`; response
  is just `{ completed: boolean }` (`assessment.controller.ts:1564`). **No XP, no streak update.**
- `GET /goals/:goalId/auto-progress` → `autoProgressService.calculateForUserGoal` — response
  `{ progress }` (`:1567-1575`); not traced further (out of the awardXP call graph, confirmed by the
  `awardXP` caller grep in §2).

Response-row shape (`mapGoalRow`, `:1279-1317`): recomputes `progress` server-side from
`(currentValue - startValue) / (targetValue - startValue)` clamped 0-100 (`:1281-1286`) — this
**overrides** whatever `progress` column the DB might otherwise hold, so `progress` in the API
response is always derived, never a raw column passthrough. Full field list: `id, userId, category,
customGoalText, pillar, isPrimary, title, description, targetValue, targetUnit, currentValue,
startValue, startDate, targetDate, durationWeeks, milestones, motivation, confidenceLevel, status,
progress, isSafetyChecked, safetyWarnings, requiresDoctorConsult, aiSuggested, aiConfidenceScore,
createdAt, updatedAt`.

### 1.3 Life goals — `/api/v1/journal/goals*` (backs `source: 'life'`, table `life_goals`)

Mount: `router.use('/v1/journal', journalRoutes)` — `src/routes/index.ts:348` (all behind
`router.use(authenticate)` — `src/routes/journal.routes.ts:26`).

| Method | Path | Zod? |
|---|---|---|
| POST | `/goals` | **No** — manual checks only |
| POST | `/goals/from-assessment` | **No**; gated by `requireFeature`+`consumeCredits` (only if `ONBOARDING_CREDIT_USAGE`, `journal.routes.ts:125-130`) |
| GET | `/goals` | — |
| GET | `/goals/:id` | — |
| PUT | `/goals/:id` (update / **status→completed**) | **No** |
| DELETE | `/goals/:id` | — |
| GET | `/goals/:id/entries`, `/goals/:id/dashboard` | — |
| POST/GET/PUT/DELETE | `/goals/:goalId/milestones`, `/milestones/:milestoneId`, `/milestones/:milestoneId/complete` | **No** |
| POST/GET/GET | `/goals/:goalId/checkins`, `/checkins/streak` (progress logging) | **No** |
| POST | `/goals/:goalId/decompose` | **No**; `requireFeature('ai.goals.decompose')`+`consumeCredits(...)` (`journal.routes.ts:247-252`) |
| GET/POST/POST/PUT | `/goals/:goalId/actions`, `/actions/:actionId/respond`, `/actions/:actionId/complete`, `/actions/:actionId` | **No** |

Route wiring: `src/routes/journal.routes.ts:108-280`. **This entire surface has zero Zod schemas** —
validation is manual, ad hoc, and inconsistent between controller and service:
- Controller `createGoal` (`src/controllers/wellbeing/life-goals.controller.ts:22-45`) only checks
  `if (!category || !title) throw ApiError.badRequest(...)` (`:28-30`) — no type/length/enum checks
  at the HTTP boundary.
- Service `createGoal` (`src/services/wellbeing/life-goals.service.ts:118-195`) re-validates: title
  non-empty (`:119-121`), `category` must be in `VALID_CATEGORIES` — 14 values: `spiritual, social,
  productivity, happiness, anxiety_management, creative, personal_growth, financial, faith,
  relationships, education, career, health_wellness, custom` (`:102-107,123-125`). No length caps,
  no numeric-range validation on `targetValue`, no date validation — unlike `goalSetupSchema` for
  health goals, this path has no `.min()/.max()` bounds at all.
- **Defaults**: `trackingMethod ?? 'journal_mentions'`, `targetValue/targetUnit ?? null`,
  `detectionKeywords ?? []`, `isPrimary ?? false` (`life-goals.service.ts:164-168`); DB `status`
  default not read here (defer to `85-life-goals.sql` migration, not opened — out of stated scope of
  "server contracts" but flagged as unverified).
- **SMART auto-refinement**: if the goal "lacks specifics" (no target + short/absent description,
  `:130`), an AI service (`goalDecompositionService.refineToSmart`) may silently rewrite
  `title`/`description` before insert (`:132-149`) — a create can persist different text than what
  the client sent, with only a `logger.info` trail (`:144`), no field in the response flagging that a
  rewrite happened.
- **UPDATE** (`updateGoal`, `:233-288`): dynamic `SET` over `category, title, description, motivation,
  trackingMethod, targetValue, targetUnit, detectionKeywords, isPrimary, status, currentValue,
  progress` (`:251-264`) — **`status` and `progress` are client-settable directly, unvalidated**
  (no enum check on `status`, no 0-100 clamp on `progress` — contrast with the health-goal path's
  server-recomputed, clamped `progress`). No transaction/lock (`:238-287`, plain read then write, same
  race shape as §1.2's health-goal update). **No XP award, no streak update, no notification call
  anywhere in this file.**
- **DELETE** (`:290-299`): straight `DELETE … RETURNING id`, 404 if 0 rows.
- **Progress logging**: `POST /goals/:goalId/checkins` (`createCheckin`) and
  `GET /goals/:goalId/checkins/streak` (`getCheckinStreak`) exist as a **separate, goal-scoped streak
  concept** implemented entirely inside `life-goals.service.ts` (not traced line-by-line here; distinct
  from the account-level `streakService`/`gamificationService.updateStreak` used elsewhere) — confirmed
  by the `updateStreak`/`recordActivity` caller grep in §0.5 showing no caller in this file.

### 1.4 Career goals — `/api/career/goals*`, `/tasks*`, `/goals/:goalId/levels*` (backs `source: 'career'`)

Mount: `router.use('/career', careerRoutes)` — `src/routes/index.ts:482`. Every route declares
`authenticate` inline (not `router.use`) — `src/routes/career.routes.ts:18-63`.

| Method | Path | Middleware | Zod schema |
|---|---|---|---|
| POST | `/goals` (create) | `authenticate` | `createGoalSchema` (`career.validator.ts:60-75`) |
| POST | `/goals/execution` (AI v2 plan) | `authenticate` → `validate(createExecutionGoalSchema)` → `requireFeature('career.ai.roadmap')` → `consumeCredits('career.ai.roadmap')` | `createExecutionGoalSchema` — **body validated before credits are charged** (route comment, `career.routes.ts:23`) |
| POST | `/goals/:goalId/convert`, `/regenerate` | same credit-gated pattern | `goalIdParamSchema` (params) |
| GET | `/goals` | `authenticate` | — |
| GET/PATCH | `/goals/:goalId` | `authenticate` (+`validate(updateGoalSchema)` on PATCH) | `updateGoalSchema` (`:95-108`) |
| POST | `/goals/:goalId/archive`, `/pause`, `/resume` | `authenticate` | — |
| DELETE | `/goals/:goalId` | `authenticate` | — |
| GET | `/goals/:goalId/levels` | `authenticate` | — |
| PATCH | `/goals/:goalId/levels/:levelId` | `authenticate` → `validate(updateLevelSchema)` | `:111-116` |
| **POST** | **`/goals/:goalId/levels/:levelId/complete`** | `authenticate` → `validate(completeLevelSchema)` | `completeLevelSchema = z.object({ force: z.boolean().optional() })` (`:118`) |
| POST | `/tasks` | `authenticate` → `validate(createTaskSchema)` | — |
| PATCH | `/tasks/:taskId` | `authenticate` → `validate(taskIdParamSchema,'params')` → `validate(updateTaskSchema)` | — |
| **POST** | **`/tasks/:taskId/complete`** | `authenticate` → `validate(taskIdParamSchema,'params')` | — (no body schema; nothing to validate) |
| POST | `/tasks/:taskId/reopen` | `authenticate` | — |
| DELETE | `/tasks/:taskId` | `authenticate` | — |

Route wiring: `src/routes/career.routes.ts:17-57`.

`createGoalSchema` (`career.validator.ts:60-75`) — **required**: `title` (1-200 chars, `:56`),
`goalType` (`goalTypeEnum` = `VALID_GOAL_TYPES` set: `job_search, promotion, skill_growth, portfolio,
networking, freelancing, interview_prep, certification, career_change, personal_brand, business` —
`career.service.ts:344-347`). **Optional**: `description` (≤2000), `targetRole` (≤200), `priority`
(`low|medium|high`), `deadline`/`startDate` (`YYYY-MM-DD`), `weeklyAvailableHours` (0-168),
`experienceLevel` (≤50), `skillsRequired` (≤50 items, each ≤100 chars), `focusAreas`
(`focusAreaEnum` = `FOCUS_AREAS = ['skills','portfolio','applications']`, `career.service.ts:349`,
max `FOCUS_AREAS.length`), `successDefinition`/`notes` (≤2000), `createdBy` (`'manual'|'ai'`).
`updateGoalSchema` (`:95-108`) adds `status` (`statusEnum = ['active','paused','completed',
'archived']`, `:17`) and `difficulty` (`easy|medium|hard`) on top of the create fields, all optional.

**COMPLETE trace — task** (`completeTask`, `src/controllers/career.controller.ts:128-` calling
`careerProgressService.completeTask`, `src/services/career-progress.service.ts:180-204`):
- Whole operation inside `transaction()`; row-locked with `SELECT … FOR UPDATE`
  (`career-progress.service.ts:182`) — idempotent re-complete short-circuits and returns the existing
  state without re-awarding XP (`:184-188`, checks `existing.status === 'completed'`).
- `taskXp = task.xpReward || XP_VALUES.career_task` (20 XP default, `gamification.service.ts:102`) —
  `:191`.
- Writes an audit row to `career_progress_events` (`event_type:'task_completed', xp_delta:taskXp`,
  `:192-195`) **before** calling `gamificationService.awardXP(userId, 'career_task', taskXp, task.id,
  …)` (`:196`) — **the XPResult return value is discarded** (no `const xpResult =`).
- `streakService.recordActivity(userId, 'career', task.id)` fires synchronously right after
  (`:197`) — this is the one goal-completion path in the whole codebase that updates the streak.
- Then `this.recompute(client, task.goalId, userId)` (`:198`, defined `:80-135`) re-evaluates whether
  this task's level (and possibly the whole goal) is now complete — see below.
- Response: `{ task, goal, levelCompleted, goalCompleted }` — **no `xpEarned`/`newLevel`/`leveledUp`
  field anywhere in this shape**.

**COMPLETE trace — level** (inside `recompute`, `:93-134`, invoked both from `completeTask` and from
the direct `POST /goals/:goalId/levels/:levelId/complete` → `completeLevelManual`, not shown above but
same underlying `recompute`/award pattern):
- Per level, if newly complete: `career_goal_levels.completion_status='completed'` (`:102`), audit
  row `event_type:'level_completed', xp_delta:l.xpReward` (`:103-106`), then
  `gamificationService.awardXP(userId,'career_level', l.xpReward || XP_VALUES.career_level, …)`
  (`:107`, default 200 XP — `gamification.service.ts:103`) — **return value discarded again**.
- If it was the **last** level, `goalCompleted = true` (`:113-115`), and after the loop:
  `career_goals.status='completed'`, audit row `event_type:'goal_completed', xp_delta:
  XP_VALUES.career_goal_complete` (`:130-131`), then `awardXP(userId,'career_goal_complete',
  XP_VALUES.career_goal_complete, …)` (`:132`, 2000 XP — `gamification.service.ts:104`) — **discarded**.
- Return: `{ goal, levelCompleted, goalCompleted }` (`:134`) — again no XP/level payload surfaced.

**Career "session"/"recovery" XP** (not a CRUD verb, but part of the same execution engine):
`streakService.recordActivity` + `gamificationService.awardXP('career_session', XP_VALUES.career_session
=15, …)` fire together on a logged focus session (`career-progress.service.ts:350,353`), and
`awardXP('career_recovery', XP_VALUES.career_recovery=40, …)` fires when a user returns after a
missed day (`:367`) — both `.catch(() => {})`'d fire-and-forget, not part of the request's success
path.

### 1.5 Finance goals — `/api/finance/goals*` (backs `source: 'finance'`, table `finance_saving_goals`)

Mount: `router.use('/finance', financeRoutes)` — `src/routes/index.ts:473`.

| Method | Path | Zod schema |
|---|---|---|
| GET | `/goals` | — |
| POST | `/goals` | `createSavingGoalSchema` (`finance.validator.ts:71-77`) |
| PUT | `/goals/:id` | `idParamSchema`(params) + `updateSavingGoalSchema` (`:79-85`) |
| DELETE | `/goals/:id` | `idParamSchema` (params) |
| POST | `/goals/:id/contribute` (**progress logging**) | `idParamSchema`(params) + `contributeToGoalSchema` (`:87-89`) |
| GET | `/goals/:id/projection` | `idParamSchema` (params) |

Route wiring: `src/routes/finance.routes.ts:67-72`.

- `createSavingGoalSchema` (`:71-77`): required `title` (1-255), `targetAmount` (positive, ≤
  999,999,999.99); optional `deadline` (`YYYY-MM-DD`), `category` (`financeCategoryEnum`, not fully
  enumerated here — out of scope), `emoji` (≤10 chars).
- `updateSavingGoalSchema` (`:79-85`): all optional — `title, targetAmount, deadline (nullable),
  status (savingGoalStatusEnum), emoji`.
- `contributeToGoalSchema` (`:87-89`): `amount: z.number().positive().max(999999999.99)`.
- **Progress-logging / completion is one atomic SQL statement**
  (`contributeToGoal`, `src/services/finance.service.ts:878-894`):
  ```sql
  UPDATE finance_saving_goals
  SET current_amount = current_amount + $1,
      status = CASE WHEN current_amount + $1 >= target_amount THEN 'achieved' ELSE status END,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = $2 AND user_id = $3
  RETURNING *
  ```
  — no read-then-write race (the increment and the completion check both happen server-side, in one
  statement), unlike §1.2/§1.3's goal updates. **No XP award, no streak update, no notification call**
  — confirmed by the `awardXP` caller grep (§2) having zero hits in `finance.service.ts`.
- Controller response: `ApiResponse.success(res, goal, 'Contribution added')`
  (`src/controllers/finance.controller.ts:174-177`) — flat mapped goal object, not wrapped in a
  `{goal:...}` key (inconsistent with §1.2/§1.3's `{goal: ...}` envelopes).

---

## 2. XP / GAMIFICATION

### 2.1 Core award path — `gamificationService.awardXP`

`src/services/gamification.service.ts:160-277`. Signature:
`awardXP(userId, sourceType: XPSourceType, baseXP, sourceId?, description?): Promise<XPResult>`.

`XPSourceType` enum (`:15-32`): `activity | workout | meal | water | daily_complete | weekly_goal |
progress_photo | streak_bonus | synergy_bonus | achievement | reflection | bonus | career_task |
career_level | career_goal_complete | career_session | career_recovery`. **Note: there is no
`goal_complete`/`mission_complete`/`life_goal_complete`/`health_goal_complete` source type** — only
the `career_*` family exists for the goal domain specifically.

`XP_VALUES` constants (`:88-107`): `activity:10, workout:25, meal:5, water:10, daily_complete:50,
weekly_goal:100, progress_photo:15, reflection:12, streak_7:100, streak_14:200, streak_30:500,
streak_60:1000, streak_90:2000, career_task:20, career_level:200, career_goal_complete:2000,
career_session:15, career_recovery:40`.

Award transaction (`:170-277`):
1. Resolve a Life-Class talent multiplier (best-effort, `.catch()`'d to `{multiplier:1,...}`,
   `:167-169`).
2. `client.query('BEGIN')` (`:173`).
3. `SELECT total_xp, current_level, current_streak FROM users WHERE id=$1` (`:176-179`, **no
   `FOR UPDATE`** — see §0.7).
4. `multiplier = calculateStreakMultiplier(currentStreak)` — `1 + min(streak,30)*0.02`, capped at
   1.6× (`:132-135,191`).
5. Multiplier only applies to `['activity','workout','meal','water','daily_complete','career_task']`
   (`:194`) — **`career_level`/`career_goal_complete`/`career_session`/`career_recovery` and all
   goal-adjacent sources are excluded from the streak multiplier.**
6. `finalMultiplier = round(streakAdjustedMultiplier * lifeClassTalent.multiplier, 4dp)` (`:196`);
   `xpEarned = round(baseXP * finalMultiplier)` (`:198`); `lifeClassBonusXP = max(0, xpEarned -
   xpWithoutLifeClassTalent)` (`:199`).
7. `newTotal = max(0, previousXP + xpEarned)` (`:203`, clamp exists specifically so a negative
   `xpEarned` — e.g. an accountability-contract penalty, `accountability-contract.service.ts` — can't
   drive `total_xp` negative); `newLevel = calculateLevel(newTotal)` = `floor(totalXP/500)+1`
   (`:124-126,204`).
8. `UPDATE users SET total_xp=$1, current_level=$2, updated_at=NOW() WHERE id=$3` (`:206-211`).
9. `INSERT INTO user_xp_transactions (user_id, xp_amount, source_type, source_id, streak_day,
   multiplier, base_xp, description, total_after, level_after) VALUES (...)` (`:214-231`).
10. `COMMIT` (`:233`).
11. Fire-and-forget: `lifeClassGameplayService.recordXpTalentActivation` (`:252-263`, `.catch(()=>{})`)
    and `maybeAwardSynergyBonus` (`:267`, `.catch(()=>{})`) — the latter is flag-gated
    (`ENABLE_LCM_SYNERGY_XP`, `:291`) and only fires for `workout|meal|water` sources
    (`SYNERGY_SOURCE_DOMAIN`, `:40-44`) — **goal/mission completion is never a synergy trigger**.
12. Returns `XPResult = { xpEarned, baseXP, multiplier, lifeClassBonusXP?, lifeClassTalentMultiplier?,
    lifeClassTalentKeys?, newTotal, newLevel, leveledUp: newLevel > previousLevel, previousLevel }`
    (`:235-246`).

### 2.2 `awardXP` callers (grep of every call site, `src/**/*.ts`, excluding its own definition)

- `src/jobs/achievement-check.job.ts:60,142` — achievement unlocks (goal-linked and tree-based),
  **async, up to 15-min job interval** (`JOB_INTERVAL_MS`, `:17`).
- `src/jobs/micro-wins.job.ts:62,100` — not traced (out of goal-completion scope).
- `src/services/accountability-contract.service.ts:583,607,1175,1445,1677,1781,1831` — contract
  signing/violation/reversal bonuses (`'bonus'` source), not goal-CRUD-triggered.
- `src/services/career-execution.service.ts:298,317` — v2 execution-engine mirror of
  `career-progress.service.ts`'s `career_level`/`career_goal_complete` awards.
- `src/services/career-progress.service.ts:107,132,196,353,367` — see §1.4.
- `src/services/life-class-gameplay.service.ts:694` — talent-system XP, not goal-CRUD.
- `src/services/progress.service.ts:438` — progress-photo XP (15, hardcoded, not via `XP_VALUES`).
- `src/services/referral.service.ts:129-130` — referral bonus.
- `src/services/reflection/reflection-details.service.ts:243` — reflection XP.
- `src/services/reward-economy.service.ts:133,343` — lucky-drop / pledge bonus.
- `src/services/streak.service.ts:324` — streak-system-internal award (separate from
  `gamificationService.updateStreak`'s own milestone award at `gamification.service.ts:396-402`).
- `src/services/water-intake.service.ts:130` — `awardWaterGoalXP`.
- `src/services/workout-plan.service.ts:509` — `awardWorkoutXP`.
- **No caller in**: `assessment.controller.ts` (health goals), `life-goals.service.ts`/
  `life-goals.controller.ts` (life goals), `finance.service.ts`/`finance.controller.ts` (finance
  goals), `goal-decomposition.service.ts` (goal actions/toggle), `goals-aggregator.service.ts`.

### 2.3 Async achievement-driven XP for non-career goals (`src/jobs/achievement-check.job.ts`)

- Runs every 15 min (`JOB_INTERVAL_MS = 15*60*1000`, `:17`), with a 12-minute startup delay after the
  micro-wins job (`STARTUP_DELAY_MS`, `:18`), batches of 100 users (`BATCH_SIZE`, `:19`).
- Query: `SELECT DISTINCT user_id FROM dynamic_achievements WHERE unlocked=FALSE AND type='goal' AND
  source_goal_id IS NOT NULL LIMIT $1` (`:37-42`) — this is the **only** mechanism by which a
  completed health/life goal can eventually produce XP, and only if a `dynamic_achievements` row of
  `type='goal'` was generated for it (health-goal creation fire-and-forget-generates these via
  `dynamicAchievementsService.generateGoalAchievements`, `assessment.controller.ts:811-826`; not
  confirmed for life goals in this trace).
- Per unlock: `awardXP(userId, 'achievement', ach.xpReward, undefined, 'Achievement unlocked: …')`
  (`:60-66`, wrapped in a bare `try/catch{}` — non-fatal) → Socket.IO emit
  (`achievement:unlocked`, `:72-88`) → best-effort `notifications` insert (`:91-108`).

### 2.4 XP history / stats / leaderboard / streak endpoints (`/api/gamification/*`)

Mount: `router.use('/gamification', gamificationRoutes)` — `src/routes/index.ts:243`. All behind
`router.use(authenticate)` (`src/routes/gamification.routes.ts:15`).

| Method | Path | Handler | Response shape |
|---|---|---|---|
| GET | `/stats` | `gamificationService.getUserStats` (`gamification.routes.ts:21-33`) | `{ stats: UserGamificationStats }` — `totalXP, currentLevel, currentStreak, longestStreak, lastActivityDate, levelProgress` (`gamification.service.ts:74-81,434-468`) |
| GET | `/level-progress` | same service, `.levelProgress` only | `{ progress: LevelProgress }` — `currentLevel, currentXP, xpForCurrentLevel, xpForNextLevel, progressPercent` (`:66-72,140-155`) |
| GET | `/xp-values` | returns `XP_VALUES` constant | `{ xpValues }` |
| GET | `/xp-history` | `gamificationService.getXPHistory(userId, limit=50, offset=0)` (`gamification.routes.ts:72-89`) | `{ history: { transactions: [{id,xpAmount,sourceType,description,multiplier,totalAfter,createdAt}], total } }` (`gamification.service.ts:473-515`) |
| POST | `/streak/update` | `gamificationService.updateStreak` (`:95-107`) | `{ streak: StreakResult }` — `currentStreak, longestStreak, isNewRecord, bonusXP` (`:59-64,311-429`) |
| POST | `/daily-check` | `gamificationService.checkDailyCompletion` (`:113-125`) | `{ dailyCheck: {allComplete, bonusAwarded, workoutsDone, workoutsTotal, waterGoalAchieved} }` (`:595-646`) |
| GET | `/leaderboard` | `gamificationService.getLeaderboard(limit=10)` + `getUserRank` + `getUserStats` (`:131-154`) | `{ leaderboard: [{userId,displayName,totalXP,currentLevel,currentStreak,rank}], userRank, userStats }` (`:651-680,685-705`) |

**None of these routes accept a `goalId`/`missionId`** — this leaderboard/XP-history surface is
entirely account-level, not goal-scoped.

### 2.5 Other leaderboard/streak endpoints (list only, per scope)

`/api/v1/leaderboards/*` (also aliased at `/api/leaderboards/*`, `src/routes/index.ts:431-432`) —
`GET /daily`, `GET /daily/around-me`, `GET /daily/my-rank`, `GET/PATCH /me/country`,
`GET /daily/friends`, `GET /daily/consistency`, `GET /daily/improvement`, `GET /weekly`,
`GET /monthly`, `GET /all-time` (`src/routes/leaderboard.routes.ts:38-143`) — each individually
rate-limited 60/min per user via `createRateLimiter({windowMs:60000,max:60,keyGenerator:'user'})`
(one route, `PATCH /me/country`, is capped at 20/min, `:75-77`). This board is driven by
`daily_user_scores.component_scores` (`workout, nutrition, wellbeing, biometrics, engagement,
consistency`) — `src/services/leaderboard.service.ts:268-288` — a **separate scoring system from
XP**, not traced further (goal-completion effect on it unverified — no direct write to
`daily_user_scores` found from any goal controller/service in this trace).

`/api/streaks/*` (`src/routes/streak.routes.ts:19-48`) — reads: `GET /status`, `/history`,
`/calendar/:month`, `/leaderboard`, `/leaderboard/around-me`, `/rewards`, `/stats`,
`/compare/:friendId`; writes: `POST /freeze/purchase`, `/freeze/apply`. This is the **unified streak
system** fed by `streakService.recordActivity()` — separate from (but kept in sync with, fire-and-forget,
`gamification.service.ts:417-419`) the legacy `users.current_streak` column `updateStreak()` maintains.

`GET /api/achievements/leaderboard` (`src/routes/achievements.routes.ts:24`) — listed only.

---

## 3. Minimal CREATE requirements & COMPLETE response summary (by domain)

| Domain | Table | Min CREATE fields (Zod-enforced unless noted) | Category/domain enum | COMPLETE returns XP? | COMPLETE returns level-up info? |
|---|---|---|---|---|---|
| Health | `user_goals` | `category, pillar, title(5-200), description(10-1000), targetValue(+), targetUnit, timeline{startDate,targetDate,durationWeeks(1-52)}, motivation(10-500)` (`assessment.validator.ts:100-114`) | `goalCategoryEnum` (20 values, `:5-29`) × `healthPillarEnum` (`fitness\|nutrition\|wellbeing`, `:32`) | **No** — no `awardXP` call anywhere in `assessment.controller.ts` | No |
| Life | `life_goals` | `title` (non-empty, manual check), `category` (manual enum check, no length bounds) (`life-goals.controller.ts:28`, `life-goals.service.ts:119-125`) | `VALID_CATEGORIES` (14 values, `life-goals.service.ts:102-107`) — **not Zod, a plain array + `.includes()`** | **No** — no `awardXP` call anywhere in `life-goals.service.ts`/`.controller.ts` | No |
| Career | `career_goals` | `title(1-200), goalType` (`career.validator.ts:60-75`) | `goalTypeEnum` (11 values, `career.service.ts:344-347`) | **Yes** — `career_task`(20)/`career_level`(200)/`career_goal_complete`(2000) XP awarded synchronously (`career-progress.service.ts:107,132,196`), but **the XPResult is discarded** — response body is `{task/goal, levelCompleted, goalCompleted}` only, **no `xpEarned`/`newLevel` field** (`career.controller.ts:93-104,128-133`) | **No** (same reason) |
| Finance | `finance_saving_goals` | `title(1-255), targetAmount(+)` (`finance.validator.ts:71-77`) | `financeCategoryEnum` (optional; values not enumerated in this trace) | **No** — no `awardXP` call anywhere in `finance.service.ts` | No |

To learn the actual XP/level-up effect of any completion, a client must make a **separate** call to
`GET /api/gamification/stats` or `GET /api/gamification/xp-history` (§2.4) after the completion
request returns — none of the four domains' COMPLETE responses embed it.

---

## 4. Streak / daily-score side effects of completing a goal

- **Career** task/session completion: `streakService.recordActivity(userId, 'career', sourceId)`
  fires synchronously (`career-progress.service.ts:197,350,367`).
- **Health, Life, Finance** goal completion: **no** call to `streakService.recordActivity` or
  `gamificationService.updateStreak` anywhere in `assessment.controller.ts`, `life-goals.service.ts`,
  or `finance.service.ts` (confirmed via the full-codebase caller grep in §0.5 / §2.2's negative list).
- The generic `POST /api/gamification/streak/update` endpoint (`gamification.routes.ts:95-107`) is a
  client-invoked, source-agnostic streak bump — it is called by `workout-plan.service.ts:517` and
  `water-intake.service.ts:134` after logging a workout/water goal, **never** from any goal-completion
  code path. If a client wants a streak bump on mission completion for health/life/finance goals, it
  would have to call this endpoint itself (or the server would need a new call site).
- **Daily-score** (`daily_user_scores.component_scores`, feeding `/api/v1/leaderboards/daily*`):
  no write to this table was found from any goal controller/service traced in §1 — its
  population mechanism was not located within this trace's scope (likely a separate nightly/materialization
  job not covered by "goals/missions/XP" grep; flagged **UNKNOWN**, would need a dedicated trace of
  `daily_user_scores` writers if BIOS-004 needs this confirmed).

---

## 5. Rate limits / idempotency concerns

- **Global**: every route (including all of §1's goal CRUD and §2's XP endpoints) sits behind
  `app.use(globalLimiter)` (`src/app.ts:193`) → `rateLimit({windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max, ...})` (`src/middlewares/rateLimiter.middleware.ts:44-52`), defaulting to
  **100 requests / 15 minutes per IP** (`src/config/env.config.ts:106-107`, overridable via
  `RATE_LIMIT_WINDOW_MS`/`RATE_LIMIT_MAX` — not read here). Skipped entirely when `env.isTest`
  (`rateLimiter.middleware.ts:51`).
- **No goal/mission-specific or XP-specific rate limiter** exists anywhere in
  `src/routes/goals.routes.ts`, `assessment.routes.ts` (goal section), `journal.routes.ts` (goal
  section), `career.routes.ts`, `finance.routes.ts` (goal section), or `gamification.routes.ts` — all
  rely solely on the global limiter above. Contrast with `leaderboard.routes.ts`, which layers a
  per-route `createRateLimiter({windowMs:60000,max:60,keyGenerator:'user'})` on every endpoint
  (`leaderboard.routes.ts:40,51,62,72,77,88,98,108,118,129,140`) — the goal/XP surfaces have no
  equivalent per-user throttle.
- **Idempotency-Key** is enforced only inside `consumeCredits()` (`entitlement.middleware.ts:330-348`)
  — 400 `MISSING_IDEMPOTENCY_KEY` if the header is absent (`:340-348`, unless in "shadow mode",
  `:341-344`). This middleware is attached only to **AI-credit-metered** routes:
  `/v1/journal/goals/from-assessment` (conditionally, `journal.routes.ts:125-130`),
  `/v1/journal/goals/:goalId/decompose` (`:247-252`), `/career/goals/execution|:goalId/convert|
  :goalId/regenerate` (`career.routes.ts:24-27`). **Plain CREATE/UPDATE/COMPLETE/DELETE for a goal —
  in all four domains — has no idempotency protection.** A retried `POST /assessment/goals` (e.g.
  client timeout + retry) can create a duplicate goal (subject only to the 3-active-goal cap,
  `assessment.controller.ts:719-727`, which is itself a non-atomic pre-check, not a unique
  constraint). A retried `PATCH .../goals/:goalId {status:'completed'}` is naturally idempotent for
  health/life/finance (no XP side effect to double-fire), but for **career** completion the code
  explicitly special-cases "already completed" to avoid double-XP
  (`career-progress.service.ts:184-188`) — implying the team is aware duplicate completion calls are
  a real client behavior to guard against, but only did so for the one domain that has XP on the
  line.
- **Concurrency / double-XP risk** (restated from §0.7 with exact anchors):
  - `gamificationService.awardXP` reads `total_xp` (`gamification.service.ts:176-179`) then writes it
    back (`:206-211`) inside a transaction **without `SELECT … FOR UPDATE`** — two concurrent awards
    for the same user (e.g. two career task completions fired back-to-back) can both read the same
    `previousXP` and the second `UPDATE` clobbers the first's XP delta (classic lost-update).
  - `assessment.controller.ts` `updateGoal`'s auto-complete branch (`:1172-1183`) reads
    `previousProgress` from a row fetched at the top of the handler (`:1074-1077`, before the
    `UPDATE`) — two concurrent `PATCH .../goals/:goalId {currentValue:...}` requests that both cross
    100% could both see `previousProgress < 100` and both fire `notificationService.goalCompleted`
    (`:1180,1182`) — a duplicate-notification bug, though not a duplicate-XP bug since no XP is
    awarded on this path.
  - By contrast, `career-progress.service.ts`'s `completeTask` uses `SELECT … FOR UPDATE`
    (`:182`) and short-circuits on `existing.status === 'completed'` (`:184-188`) — this path is
    race-safe; `finance.service.ts`'s `contributeToGoal` is race-safe by construction (atomic SQL
    increment, `:878-894`).

---

## Appendix: files read (for reproducibility)

- `src/app.ts`, `src/routes/index.ts`, `src/routes/goals.routes.ts`, `src/routes/assessment.routes.ts`,
  `src/routes/journal.routes.ts`, `src/routes/career.routes.ts`, `src/routes/finance.routes.ts`,
  `src/routes/gamification.routes.ts`, `src/routes/leaderboard.routes.ts`, `src/routes/streak.routes.ts`,
  `src/routes/achievements.routes.ts`
- `src/validators/goals.validator.ts`, `src/validators/assessment.validator.ts`,
  `src/validators/career.validator.ts`, `src/validators/finance.validator.ts` (partial)
- `src/controllers/goals-unified.controller.ts`, `src/controllers/assessment.controller.ts`,
  `src/controllers/wellbeing/life-goals.controller.ts`, `src/controllers/career.controller.ts`
  (partial), `src/controllers/finance.controller.ts` (partial), `src/controllers/gamification.controller.ts`
  (referenced, not opened directly — logic lives in `gamification.routes.ts` inline handlers)
- `src/services/goals-aggregator/goals-aggregator.service.ts`, `.../normalize.ts`,
  `.../unified-goal.types.ts`
- `src/services/wellbeing/life-goals.service.ts`, `src/services/goal-decomposition.service.ts`
  (partial), `src/services/career.service.ts` (partial), `src/services/career-progress.service.ts`
  (partial), `src/services/finance.service.ts` (partial), `src/services/gamification.service.ts` (full),
  `src/services/leaderboard.service.ts` (partial)
- `src/jobs/achievement-check.job.ts` (partial)
- `src/middlewares/auth.middleware.ts` (partial), `src/middlewares/validate.middleware.ts` (partial),
  `src/middlewares/entitlement.middleware.ts` (partial), `src/middlewares/rateLimiter.middleware.ts`
  (partial)
- `src/utils/ApiResponse.ts` (partial), `src/utils/ApiError.ts` (partial)
- `src/database/tables/24-xp-transactions.sql`
- `src/config/env.config.ts` (partial, non-secret defaults only — no `.env` file was read)
- `plans/batches/BIOS-002-ios-simulator-contracts/evidence/architecture-plan.md` (external
  cross-reference for the ADR-4 client-side tier-derivation rule)

**Not opened / UNKNOWN** (flagged explicitly, not guessed): `src/database/tables/85-life-goals.sql`
(life_goals default `status`/`progress`), `financeCategoryEnum` full value list
(`src/validators/finance.validator.ts`, top of file not read), `dynamicAchievementsService.
generateGoalAchievements` / `checkGoalProgress` internals, `daily_user_scores` writer(s),
`career-execution.service.ts` (v2 engine) full trace (only its `awardXP` call sites were grepped),
`career.controller.ts` full file (only `completeLevel`/task section read), `finance.controller.ts`
full file (only goal-related handlers read).
