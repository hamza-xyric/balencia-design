# Balencia Platform - Epic 16: Accountability Contract Hardening, Witness Verification & Analytics Engine

## EPIC OVERVIEW

### Epic Statement
Accountability Contracts are Balencia's **trust-critical enforcement layer** — the one system on the platform where SIA's promises stop being conversational and start touching the real world. A signed contract can notify a friend that the user broke a commitment, forfeit XP, burn a donation pledge, or — in the SOS wellness-check path — reach out to a person's emergency contact. A system with this blast radius cannot be "mostly working." Epic 16 is the hardening pass that took Accountability Contracts from **"architecturally well-conceived but functionally hollow"** (the verdict of the 2026-06-10 commitment-contract system audit) to a system that is safe to give real consequences to real people, plus the co-shipped **Analytics Engine** — a new ECharts-powered, ad-hoc cross-domain analytics capability exposed directly to SIA as coach tools.

### Epic Goal
Close every Critical, Risk/Ethics, and Architectural finding from the 2026-06-10 audit (8 + 7 + 5 = 20 findings) so that: (1) every enforcement verdict is backed by real, canonical behavior data — never a silent always-pass, never a fabricated failure; (2) no social or safety-net consequence reaches a third party who has not explicitly consented and accepted; (3) SIA supports the user through their first slip before any penalty or enforcer notification fires; and (4) every audit record, notification, and settlement the system produces is honest — no "penalty applied" message when nothing happened. Alongside this, ship a new Analytics Engine that lets SIA answer ad-hoc, cross-domain analytics questions ("how does my sleep affect my mood two days later?") with real statistical backing and inline charts, independent of the existing same-day correlation engine (Epic 08) and the Life Correlation Matrix (Epic 14).

### Core Philosophy
**"Honest Enforcement" Framework (from the 2026-06-10 audit's remediation mandate):**
1. **Real Data or No Verdict** — every evaluator reads the canonical table the rest of the product actually writes to (`workout_logs`, `daily_health_metrics`, `meal_logs`), never a near-empty shadow table. Missing data is never silently scored as failure or silently scored as pass — it is honestly flagged and skipped.
2. **Consent Before Consequence** — no enforcer, witness, or emergency contact is ever notified without first accepting an explicit handshake. A contact who never responded is invisible to the enforcement pipeline, by construction, not by convention.
3. **Support Before Punishment** — the very first slip on any contract routes to a supportive, in-chat outreach from SIA (`ai_intervene_first`) before any punitive penalty or third-party notification fires. Escalation is earned by a pattern, not triggered by a single bad day.
4. **Audit Trail You Can Trust** — every notification, settlement record, and "fulfilled" celebration reflects what actually happened. A penalty is never described as applied unless it executed; `enforcers_notified` is never `true` unless someone was actually notified.

### Strategic Importance
> "A commitment feature that fabricates its own enforcement is worse than no commitment feature at all — it teaches the user the app lies to them, and it exposes real third parties to consequences they never agreed to."

This is not a growth feature; it is a **trust liability that had to be paid down before Accountability Contracts could be marketed as real**. The 2026-06-10 audit found that three of five condition evaluators always resolved "pass" regardless of actual behavior, that the AI coach had zero awareness contracts existed (making SIA's "I'll hold you accountable" promise structurally false), and that the social-consequence and SOS safety-net paths were entirely dead code paths that could not have fired for any user, ever. Epic 16 is the full remediation of that audit, resolving all 20 findings, plus the net-new Analytics Engine capability that was built and shipped alongside it in the same delivery window.

### Epic Scope (9 Features)

| Feature | Description | MVP Status |
|---------|-------------|------------|
| **F16.1** | Contract Lifecycle State Machine | Core (Hardening — Shipped) |
| **F16.2** | Objective Metric Resolution | Core (Hardening — Shipped) |
| **F16.3** | Missing-Data Fairness | Core (Hardening — Shipped) |
| **F16.4** | Enforcer Acceptance Handshake | Core (Hardening — Shipped) |
| **F16.5** | Consent-Gated SOS Wellness-Check | Core (Hardening — Shipped) |
| **F16.6** | Coach Contract Awareness | Core (Hardening — Shipped) |
| **F16.7** | Grace Periods & Honest Audit Trail | Core (Hardening — Shipped) |
| **F16.8** | Witness / Peer-Verification | Post-MVP (Flag-Gated OFF) |
| **F16.9** | Analytics Engine | Core (New Capability — Shipped) |

---

## F16.1: CONTRACT LIFECYCLE STATE MACHINE

### Description
A complete, closed lifecycle for accountability contracts with no dead-end or exploitable states. Prior to this epic, `violated` was a terminal dead end with no path forward, `at_risk` never recovered back to `active`, paused contracts could orphan past their `end_date`, and auto-renew silently created inert unsigned drafts that dropped the original `condition_details`. All four of those architectural defects (Arch-4 in the audit) are closed. During remediation, an insecure-reference bug in the enforcer-notification path was also found and closed: the system was passing a `accountability_contacts` row ID into a code path that required a `users` row ID, causing silent notification-insert failures (Postgres `23503` FK violation) that were masked because the code still recorded `enforcers_notified=true` — a false audit record on top of a broken reference. This is documented here alongside the lifecycle work because it was discovered during the same lifecycle/ownership review; it is a wrong-ID-space bug in the notification path, not a cross-user access hole — the audit separately confirmed contract ownership scoping was already airtight (every controller handler derives `userId` from the authenticated session and every service query filters `WHERE user_id = $2`).

### User Story
As a user who has signed a binding contract with real stakes (social alerts, XP, streak freezes), I want the contract's status to always accurately reflect reality — never stuck, never silently wrong, never deletable to dodge a live penalty — so that I can trust the system's verdicts and the people I've looped in can trust what they're told about me.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Simple contracts (single condition, one penalty type, no witnesses). Status shown as a plain badge: Draft / Active / At Risk / Violated / Completed / Paused / Cancelled. One-tap sign, pause, cancel. |
| **Deep** | Full lifecycle visibility: violation history per contract, dispute flow on individual violations, pause-budget tracking (max 2 pauses/contract), witness-gated completion (F16.8, if enabled), bulk contract management, and settlement timing configured to the user's local timezone. |

### Technical Foundation

**Canonical status enum** (`server/shared/types/domain/accountability.ts`):
```ts
export type ContractStatus =
  | 'draft' | 'active' | 'at_risk' | 'violated'
  | 'completed' | 'cancelled' | 'paused';

export type ContractConditionType =
  | 'missed_activity' | 'calorie_exceeded' | 'streak_break'
  | 'missed_goal' | 'sleep_deficit' | 'custom';

export type ContractPenaltyType =
  | 'donation' | 'xp_loss' | 'social_alert' | 'streak_freeze_loss' | 'custom';
```
> **Known gap flagged by this epic:** the witness-verification feature (F16.8) introduced three additional service-level statuses — `pending_witnesses`, `pending_verification`, `witness_rejected` — referenced in `accountability-contract.service.ts` sort/query logic but not yet reflected in the shared `ContractStatus` union above. This is tracked as a follow-up type-definition cleanup, not a runtime risk (the database column is a free-text/enum column, not TypeScript-checked at the query boundary).

**Transition rules enforced server-side** (`accountability-contract.service.ts`):

| Action | Precondition | Resulting State |
|---|---|---|
| `sign` | `status = 'draft'` | `active` |
| `pause` | `status = 'active'` AND `pause_count < 2` | `paused` |
| `resume` | `status = 'paused'` | `active` |
| `cancel` | `status IN ('draft','active','paused','at_risk','violated')` | `cancelled` |
| `recordCheck` (clean day, 3 in a row) | `status = 'at_risk'` | `active` (recovery) |
| `recordViolation` (violation_count ≥ 3) | `status IN ('active','at_risk')` | `violated` |
| `checkExpiredContracts` sweep | `status IN ('active','at_risk','violated')` AND `end_date` reached | `completed` |
| `checkExpiredContracts` sweep | `status = 'paused'` AND `end_date` reached | `cancelled` |
| `deleteContract` / `bulkDeleteContracts` | `status IN ('draft','cancelled','completed')` ONLY | hard-deleted |

Note that `cancel` deliberately accepts `violated` as a source state — a user is allowed to close out a "zombie" violated contract rather than have it sit unresolved forever, closing the original dead-end. Hard delete is deliberately **blocked** on any live state (`active`, `at_risk`, `paused`, `violated`) so a contract cannot be deleted to erase a violation history mid-flight.

**The ID-space fix** (`accountability-contract.service.ts:1330-1335`), inside `notifyEnforcers`:
```ts
const contactRow = await query<{ contact_user_id: string | null }>(
  `SELECT contact_user_id FROM accountability_contacts
   WHERE id = $1 AND user_id = $2 AND is_active = true AND accepted_at IS NOT NULL`,
  [enforcerContactId, userId]
);
// notification is only created once a REAL, accepted users.id is resolved
```
The `accepted_at IS NOT NULL` predicate is also the enforcement point for F16.4 (Enforcer Acceptance Handshake) — the same query closes both the ID-space bug and the consent gate in one place.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Contracts stuck outside the defined lifecycle | 0 | Nightly sweep audit query (any contract not in a valid state transition history) |
| Hard-delete attempts on live contracts | 100% rejected | Controller/service test coverage + prod error-rate monitoring on `deleteContract` |
| Enforcer notifications with unresolved/invalid `users.id` | 0 (down from silent 100% failure pre-fix) | `23503` FK-violation rate on `notifications` insert from the accountability path |
| `at_risk → active` recovery rate | Tracked, no target (informational) | Contracts recovering after 3 clean days vs. escalating to `violated` |

### Acceptance Criteria

- [ ] `ContractStatus` transitions are enforced exclusively server-side via `WHERE status = ...` guards — no client-trusted state changes
- [ ] `violated` is not a dead end — user can `cancel` a violated contract to close it out
- [ ] `at_risk` contracts recover to `active` after 3 consecutive clean checks
- [ ] Paused contracts past `end_date` are swept to `cancelled`, never left orphaned
- [ ] `deleteContract` / `bulkDeleteContracts` reject any contract not in `draft`, `cancelled`, or `completed`
- [ ] `notifyEnforcers` resolves a verified `users.id` via `accountability_contacts.contact_user_id` before any notification insert — never passes a contact-row ID directly
- [ ] Auto-renew (where applicable) carries forward `condition_details` into the new draft rather than dropping them
- [ ] Every controller endpoint under `/contracts` re-derives `userId` from the authenticated session and filters every query by it (ownership scoping verified, not assumed)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Enforcer notification targets an unaccepted/invalid contact** | `contact_user_id` resolves to `NULL` or row not found | Notification silently skipped, no FK violation, no false `enforcers_notified=true` | None sent to invitee; contract owner sees accurate enforcer-notified count in Deep Mode |
| **User tries to delete an active contract** | `deleteContract` precondition fails | 409/422 rejection, contract untouched | "This contract is still active. Cancel it first if you want to close it out." |
| **Contract straddles `end_date` while paused** | Nightly sweep finds `paused` + `end_date < now` | Auto-transition to `cancelled` | "Your paused contract expired without being resumed and was closed." |
| **Auto-renew fires on a contract with rich `condition_details`** | Renewal job invoked | New draft copies `condition_details` verbatim, requires re-sign | "Your contract is up for renewal — review and re-sign to continue." |

### Contract Lifecycle State Machine (High-Level)

```
                         ┌────────┐
                         │ draft  │  (proposeContract tool or manual create)
                         └───┬────┘
                              │ sign
                              ▼
                        ┌───────────┐   3 consecutive
                 ┌─────►│  active   │◄──── clean checks
                 │      └─────┬─────┘
        resume   │            │ violation detected           pause (max 2x)
                 │            ▼                                     │
                 │      ┌───────────┐   violation_count ≥ 3         │
                 │      │ at_risk   │──────────────────┐            │
                 │      └───────────┘                  ▼            ▼
                 │                                ┌───────────┐  ┌────────┐
                 └────────────────────────────────┤ paused    │  │violated│
                                                    └─────┬─────┘  └───┬────┘
                                                          │ end_date    │ cancel (user-closed)
                                                          ▼             ▼
                                                     ┌──────────┐  ┌───────────┐
                                                     │cancelled │  │ cancelled │
                                                     └──────────┘  └───────────┘

              end_date reached from active/at_risk/violated
                                  │
                                  ▼
                            ┌───────────┐
                            │ completed │──► deleteContract now permitted
                            └───────────┘
```

### Cross-Pillar Connections

**To Objective Metric Resolution (F16.2):**
- Every state transition on this machine is driven by the evaluator's `passed`/`insufficientData` verdict — the lifecycle is only as trustworthy as the resolver feeding it.

**To Enforcer Acceptance Handshake (F16.4):**
- The `violated` transition is the trigger point for `notifyEnforcers`; the same query that fixed the ID-space bug enforces the consent gate.

**To Grace Periods & Honest Audit Trail (F16.7):**
- `violated` contracts can carry an open grace window before penalty execution; the sweep in F16.7 reads this same state machine.

**To Witness / Peer-Verification (F16.8):**
- Layers three additional states (`pending_witnesses`, `pending_verification`, `witness_rejected`) on top of this machine when the flag is enabled — see F16.8 for the extended diagram.

**To Epic 13 (Social Growth OS):**
- Shares the same trust/consent architectural pattern (accept-before-notify) used across pod/buddy features.

### Dependencies
- **Epic 11 (SIA Cognitive OS):** contract state is injected into SIA's live coaching context (see F16.6)
- **Epic 13 (Social Growth OS):** shared consent/handshake conventions
- **F16.2, F16.7:** state transitions are driven by evaluator verdicts and settlement sweeps

### MVP Status
[X] Shipped — production hardening complete (commit range `e4304d3c…c7319a8b`)

---

## F16.2: OBJECTIVE METRIC RESOLUTION

### Description
A single, shared source-of-truth resolver connecting contract conditions to real, canonical behavior data. Before this epic, three of five condition evaluators always resolved "pass" regardless of actual user behavior — a critical correctness bug (audit finding C-1): sleep evaluation queried the wrong JSON column (`data->>'duration_hours'` instead of the real `value` field), calorie evaluation averaged per-meal rather than per-day, "missed goal" conditions were never falsifiable by construction, and non-gym-session activity types were cast against the wrong enum. On top of that, the enforcement path read from `activity_events` — a near-empty table whose only writer was a manual leaderboard form — while the actual workout-logging flow wrote to `workout_logs` (audit finding C-2), meaning users who logged workouts through the normal product flow could still be falsely violated. Both defects are closed by a new shared `metric-resolver.service.ts` and a rewritten `evaluateMissedActivity` that reads both canonical sources. A separate defect — one bad day producing a new violation and re-executing its penalty every 2 hours because the evaluation job re-scanned the same rolling window on every cycle (audit finding C-3) — is closed with atomic per-day dedup.

### User Story
As a user with a signed contract, I want a violation to only ever be recorded if I actually failed the condition — using the same data the rest of the app already tracks about me — so that a single missed morning doesn't spiral into five violations by dinner and a workout I actually logged doesn't get treated as a no-show.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Evaluation happens silently in the background; user just sees an accurate status badge and, if violated, one violation record per bad day — not a stack of duplicates. |
| **Deep** | Full evaluation transparency: `getContractDetails` and the Deep Mode contract view show the evaluator's `evidence` object (which table/metric resolved the verdict, confidence, and reason if skipped) for every check, not just violations. |

### Technical Foundation

**Shared resolver** — `server/src/services/metric-resolver.service.ts`, exported singleton `metricResolver`, with methods `avgSleepHours`, `latestRecovery`, `avgDailyCalories`. Each returns:
```ts
{ value: number | null; source: 'daily_health_metrics' | 'health_data_records' | 'meal_logs' | 'none' }
```
Resolution order is **rollup-first**: the deterministic `daily_health_metrics` analytics rollup, falling back to raw `health_data_records` / `meal_logs`, falling back to `none`. The resolver deliberately never reads `daily_analysis_reports` — that table is LLM-derived narrative, and deterministic enforcement must never be backed by an LLM's summary of the day.

**`evaluateMissedActivity` fix** (`accountability-contract.service.ts:737-789`) — now sums completed workouts from **both** the canonical `workout_logs` table (`status = 'completed'`) and the manual `activity_events` stream, rather than `activity_events` alone:
```
// count completed workouts from the CANONICAL workout_logs table AND the
// manual activity_events stream, so users who log via either path are
// never falsely violated.
```

**Per-day dedup** (`recordViolation`, `accountability-contract.service.ts:920-954`) — an atomic, race-safe insert guarded by `NOT EXISTS`:
```sql
INSERT INTO accountability_contract_violations (...)
SELECT ...
WHERE NOT EXISTS (
  SELECT 1 FROM accountability_contract_violations
  WHERE contract_id = $1
    AND [same user-local calendar day, timezone-aware via $7]
)
```
This closes C-3 directly. The evaluation job (`contract-evaluation.job.ts`) still runs every 2 hours (`JOB_INTERVAL_MS = 2 * 60 * 60 * 1000`), but a companion **day-settlement gate** (`getUserTimezone` + `getLocalHour` + `isDaySettled`, default settlement threshold 21:00 local) means checks are still written intra-day for visibility, but a violation only becomes final once the user's local day has settled — so an early-morning miss can't lock in a penalty before the user has had the whole day to correct course.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Evaluators that always resolve "pass" regardless of input | 0 (down from 3 of 5) | Evaluator unit-test matrix: fail case must produce `passed: false` |
| Violations per bad day per contract | ≤ 1 (down from up to ~12 in a 24h cycle at 2h intervals) | `recordViolation` dedup constraint test + prod violation-rate monitoring |
| False violations for users logging via the canonical workout flow | 0 (down from systematic false positives) | Regression test: log via `workout_logs` only, contract must evaluate `passed: true` |
| Evaluation source correctly attributed in `evidence` | 100% | Every evaluator result includes `source` field from `metric-resolver` |

### Acceptance Criteria

- [ ] All five condition evaluators (`missed_activity`, `calorie_exceeded`, `streak_break`, `missed_goal`, `sleep_deficit`) produce a real `passed: false` on a genuine failure case in tests, not just on success cases
- [ ] Sleep evaluation reads the correct value field, not a nonexistent JSON key
- [ ] Calorie evaluation averages per calendar day, not per meal
- [ ] `missed_activity` sums both `workout_logs` (canonical) and `activity_events` (manual leaderboard stream)
- [ ] `metric-resolver.service.ts` is the single call path for sleep/recovery/calorie data in both the contract evaluator and the trigger service (no divergent parallel resolution)
- [ ] `recordViolation` is idempotent per user-local calendar day per contract (atomic `NOT EXISTS` guard)
- [ ] Day-settlement gate delays violation finalization until the user's local day has settled (default 21:00 local), while still recording visible intra-day checks
- [ ] Evaluator never reads `daily_analysis_reports` (LLM-derived) as a source of deterministic enforcement truth

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Evaluator throws mid-evaluation** | try/catch around evaluator call | `evidence: { error: 'evaluation_failed' }`, `passed: true` (fail-safe, never penalize on a system error) | None — silent fail-safe, logged for engineering |
| **Unknown/unsupported condition type reaches evaluator** | Switch/dispatch falls through | `evidence: { reason: 'unknown_condition_type' }`, no violation recorded | None — contract remains in current state |
| **Condition window hasn't elapsed since signing ("ramp-in")** | Elapsed time check | `evidence: { reason: 'ramp_in' }`, skipped | None — contract not yet evaluable |
| **Same-day re-evaluation on the 2h cycle** | `NOT EXISTS` dedup guard | Insert no-ops, no duplicate violation, no repeat penalty execution | None — user already notified once for that day |

### Objective Metric Resolution Process (High-Level)

```
Contract Evaluation Cycle (every 2 hours, per active/at_risk contract):

1. Load contract + condition_type + condition_details
2. Dispatch to the matching evaluator (missed_activity, calorie_exceeded,
   streak_break, missed_goal, sleep_deficit)
3. Evaluator calls metricResolver for the relevant metric:
   a. Query daily_health_metrics (deterministic rollup) first
   b. Fall back to raw health_data_records / meal_logs
   c. Fall back to { value: null, source: 'none' }
4. If value is null → insufficientData path (see F16.3), SKIP, no verdict
5. If value present → compare against condition_details threshold
   a. missed_activity sums workout_logs (canonical) + activity_events (manual)
   b. sleep_deficit / calorie_exceeded average per LOCAL calendar day
6. Result: { passed, confidence, insufficientData, evidence: { source, reason? } }
7. Day-settlement gate: is the user's local day settled (>= 21:00 local)?
   - NO  → recordCheck only (visible, non-final)
   - YES → recordCheck AND, if failed, recordViolation
             (atomic NOT EXISTS per contract_id + local calendar day)
8. On successful violation insert: escalate lifecycle state (F16.1),
   evaluate first-slip vs. repeat (F16.6), execute or grace penalty (F16.7)
```

### Cross-Pillar Connections

**To Contract Lifecycle (F16.1):**
- Evaluator verdicts are the sole driver of `active → at_risk → violated` transitions.

**To Missing-Data Fairness (F16.3):**
- `metric-resolver`'s honest-null (`value: null, source: 'none'`) is the shared mechanism both features depend on.

**To Analytics Engine (F16.9):**
- Both systems query the same canonical health/behavior tables, but `metric-resolver` is enforcement-grade (deterministic, penalty-triggering) while the Analytics Engine's `MetricRegistry` is exploratory/read-only — the two are intentionally not merged so an analytics query can never accidentally back a penalty.

### Dependencies
- **Epic 05 (Fitness Pillar):** `workout_logs` as canonical activity source
- **Epic 09 (Data Integrations):** WHOOP/wearable data into `daily_health_metrics`
- **F16.3:** shares the resolver's honest-null contract

### MVP Status
[X] Shipped — production hardening complete

---

## F16.3: MISSING-DATA FAIRNESS

### Description
Missing wearable or behavior data used to be treated as a verdict rather than an absence of information — in some evaluator paths it silently scored as `0` and triggered a penalty (fail-closed), and in others it fell through the C-1 bug and silently passed regardless (fail-open). Neither is fair: a user who forgot to charge their WHOOP overnight is not the same as a user who skipped their workout. This feature is the explicit, honest-null contract that runs through every evaluator: **no data means no verdict**, never a substitute for one.

### User Story
As a user whose wearable didn't sync last night, I want the system to recognize it doesn't actually know what happened, rather than either penalizing me for "failing" a condition it can't verify or falsely congratulating me for "passing" one it never checked.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Missing-data days are simply invisible to enforcement — no penalty, no false pass shown, contract state unaffected. |
| **Deep** | Deep Mode's check history shows an explicit "Insufficient data" entry (not a pass or fail) for any day the resolver couldn't source a value, with the reason (`no_data`, `unsupported_metric`, `ramp_in`, `low_recovery_rest`). |

### Technical Foundation

**Honest-null contract** — every evaluator result carries an `insufficientData: boolean` and, when true, `passed: true, confidence: 0` with a structured `evidence.reason` — never a bare pass and never a penalty. Concrete instances in `accountability-contract.service.ts`:

| Path | `evidence.reason` | Meaning |
|---|---|---|
| Ramp-in guard | `ramp_in` | Condition window hasn't fully elapsed since signing |
| Unknown condition type | `unknown_condition_type` | Evaluator dispatch found nothing to check |
| Evaluator exception | `evaluation_failed` (via `error`) | System error, never a silent pass-through disguised as success |
| Unsupported metric on `missed_activity` | `unsupported_metric` | Metric requested isn't wired to this condition type |
| **Safety guardrail** | `low_recovery_rest` | WHOOP recovery `< 34` → missed-activity evaluator explicitly SKIPS rather than penalizes a rest day the body needed |

The `low_recovery_rest` guardrail (audit finding R-1) is a deliberate ethics decision, not just a data-completeness one: *"if the user's most recent recovery is critically low… never penalise a missed workout."* It prevents the contract system from pressuring a user to train through fatigue the platform's own recovery data says they shouldn't.

`metric-resolver.service.ts` itself returns `{ value: null, source: 'none' }` on no data in every method — documented in its own header as existing *"so callers can skip rather than penalise missing data."* This is the shared mechanism powering both the resolver-level fix (F16.2) and this fairness guarantee.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Missing-data days scored as a penalty | 0 (down from a fail-closed subset pre-fix) | Regression test: no wearable sync → no violation |
| Missing-data days silently scored as a pass with no evidence trail | 0 (down from a fail-open subset pre-fix via C-1) | Every check row has non-null `evidence` JSON |
| Missed-activity violations recorded during critically low recovery (`<34`) | 0 | `low_recovery_rest` guardrail regression test |
| Deep Mode check-history entries correctly labeled "Insufficient data" vs pass/fail | 100% | UI/data contract test on `insufficientData` flag rendering |

### Acceptance Criteria

- [ ] Every evaluator result includes `insufficientData: boolean` and, when true, never sets `passed: false`
- [ ] `metric-resolver` methods return `{ value: null, source: 'none' }` (never throw, never fabricate a value) when no data exists
- [ ] `missed_activity` evaluator skips (does not penalize) when the user's latest WHOOP recovery is `< 34`
- [ ] Every skip/insufficient-data path writes a structured `evidence.reason`, never an empty or generic evidence object
- [ ] Deep Mode check-history UI renders "Insufficient data" distinctly from both "Passed" and "Violated"
- [ ] Insufficient-data days do not count toward `at_risk` escalation or the 3-clean-day recovery counter (neither helps nor hurts — truly neutral)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Wearable never synced for the evaluation window** | `metric-resolver` returns `value: null` | Evaluator returns `insufficientData: true`, no verdict recorded | None — contract state unaffected |
| **User's recovery is critically low (<34) on a missed-activity check** | Latest recovery query | Evaluator skips, `evidence.reason: 'low_recovery_rest'` | None — no penalty message sent |
| **Resolver's primary rollup table has a gap but raw data exists** | `daily_health_metrics` empty for the window | Falls back to `health_data_records`/`meal_logs` before declaring `none` | None — resolved transparently |
| **User disputes a violation, claiming missing data caused it** | `disputeViolation` flow | Dispute reviewer can inspect `evidence.source`/`reason` on the original check to verify | Dispute response references the actual evidence trail, not a guess |

### Missing-Data Fairness Decision Process (High-Level)

```
For each evaluator invocation:

1. Call metricResolver.<method>(userId, window)
2. IF value === null:
     RETURN { passed: true, confidence: 0, insufficientData: true,
              evidence: { reason: 'no_data', source: 'none' } }
     → no penalty, no false pass badge, day excluded from streak math
3. IF condition is missed_activity AND latestRecovery.value < 34:
     RETURN { passed: true, confidence: 0, insufficientData: true,
              evidence: { reason: 'low_recovery_rest', recoveryScore } }
     → rest is honored, not punished
4. ELSE evaluate condition normally against real value
     RETURN { passed: <real result>, confidence: 1, insufficientData: false,
              evidence: { source: metricResolver.source, value } }
```

### Cross-Pillar Connections

**To Objective Metric Resolution (F16.2):**
- Shares the exact same resolver and the exact same honest-null return contract — this feature is F16.2's fairness guarantee made explicit.

**To Coach Contract Awareness (F16.6):**
- SIA's context injection reads `insufficientData` history so it never coaches around a "violation" that was actually a data gap.

**To Epic 09 (Data Integrations):**
- Wearable sync reliability directly determines how often the honest-null path fires; sync gaps are visible, not punished.

### Dependencies
- **F16.2 (Objective Metric Resolution):** shares the resolver
- **Epic 09 (Data Integrations):** WHOOP/wearable data completeness

### MVP Status
[X] Shipped — production hardening complete

---

## F16.4: ENFORCER ACCEPTANCE HANDSHAKE

### Description
A consent-gated system for social accountability enforcers — the people who get notified when a user violates a contract. Before this epic, social consequences were structurally impossible to fire safely: consent defaults (`allow_failure_alerts`, `allow_sos_alerts`, per-contact `allow_failure`, `is_emergency_contact`) all defaulted to `false` with no UI path to turn them on, contacts could be added unilaterally with no acceptance step, trigger messages were sent in the user's own first-person voice (misrepresenting authorship to the recipient), and — as covered in F16.1 — an ID-space bug meant even a would-be notification silently failed against a foreign-key constraint. This feature closes the loop end-to-end: **no enforcer receives an alert without first accepting an explicit handshake AND having per-contact consent configured**, and alerts are now guaranteed to reach the enforcer's real, verified account.

### User Story
As someone a friend has added as their accountability enforcer, I want to be asked and to explicitly accept before I start receiving alerts about their contract violations, so that I'm never surprised by a role I never agreed to play.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Add a contact, they get one invitation notification, they accept or decline once. No further configuration needed — sensible defaults apply once accepted. |
| **Deep** | Per-contact consent granularity: `allow_failure`, `is_emergency_contact` flags configurable independently per accepted contact; global settings (`allow_motivation_reminders`, `allow_failure_alerts`, `allow_sos_alerts`, `global_cooldown_hours`) tunable in the contract owner's Settings; pending-invitation list with resend/cancel. |

### Technical Foundation

**Consent service** — `server/src/services/accountability-consent.service.ts`, managing `ConsentSettings` (`enabled`, `allow_motivation_reminders`, `allow_failure_alerts`, `allow_sos_alerts`, `sos_inactivity_days`, `sos_message`, `ai_intervene_first`, `global_cooldown_hours`) and `AccountabilityContact` (now including `accepted_at: Date | null`).

**Handshake flow:**
1. `addContact(userId, contact)` (line ~292) creates the contact row with `accepted_at = NULL` and fires an invitation notification to the invitee.
2. `getPendingInvitations(invoteeId)` (line ~435) surfaces outstanding invitations to the invited person.
3. `respondToInvitation(userId, contactId, accept)` (line ~467) — the invitee explicitly accepts or declines; only on accept does `accepted_at` get set.

Pre-existing active contacts at the time of this migration were grandfathered in (not silently dropped), but any **new** contact added after the fix requires a real handshake.

**Enforcement point — `notifyEnforcers`:** requires `accepted_at IS NOT NULL` before any contact can be targeted:
```sql
SELECT contact_user_id FROM accountability_contacts
WHERE id = $1 AND user_id = $2 AND is_active = true AND accepted_at IS NOT NULL
```
A contact who never responded — or who declined — is invisible to this query by construction. This is the same query that fixed the ID-space bug in F16.1: the consent gate and the correct-recipient-resolution fix are the same line of code, which means it is architecturally impossible to notify an unaccepted contact even by a future regression that reintroduces the ID-space mistake.

**Related but distinct system:** `accountability-partner.service.ts` is a separate accountability-*partner* matchmaking/discovery feature (opt-in via `buddy_discovery_consent`, using a shared-pillar/goal/timezone "lift kernel" recommender) — it is not part of the enforcer handshake and has no bearing on alert delivery.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Alerts delivered to a contact with `accepted_at IS NULL` | 0 | `notifyEnforcers` query-level guarantee + integration test |
| Contacts added without a subsequent invitation notification | 0 | `addContact` → notification-fired assertion |
| FK-violation (`23503`) rate on enforcer notification inserts | 0 (down from silent failures pre-fix) | Prod error monitoring on the notifications insert path |
| `enforcers_notified=true` records where zero enforcers were actually notified | 0 | Cross-check `enforcers_notified` flag against actual notification row count (see F16.7) |

### Acceptance Criteria

- [ ] `addContact` always creates the contact with `accepted_at = NULL` and sends an invitation notification
- [ ] `respondToInvitation` is the only code path that sets `accepted_at`
- [ ] `notifyEnforcers` filters on `accepted_at IS NOT NULL AND is_active = true` before resolving any recipient
- [ ] Notification recipient is always resolved via `accountability_contacts.contact_user_id`, never the contact row's own `id`
- [ ] Declined invitations remain queryable (for the inviter's transparency) but are permanently excluded from notification targeting
- [ ] Per-contact `allow_failure` / `is_emergency_contact` flags are independently configurable post-acceptance
- [ ] Grandfathered pre-migration contacts are not silently dropped from the system, but any newly added contact requires the full handshake

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Contact never responds to invitation** | `accepted_at` stays `NULL` indefinitely | Contact remains permanently excluded from notifications | Inviter sees "Pending" status in their contact list |
| **Contact declines invitation** | `respondToInvitation(accept=false)` | Contact marked declined, excluded from notifications | Inviter is not alerted per-decline (avoids pressuring the invitee) |
| **Contract violated with zero accepted enforcers** | `notifyEnforcers` query returns empty set | No notification sent, `enforcers_notified` correctly left `false` | Contract owner sees violation recorded but no social alert claim |
| **Invitee accepts, then later revokes** | `revoke-all` consent endpoint | Future notifications immediately stop targeting them | Contact removed from active enforcer set on next lookup |

### Enforcer Acceptance Handshake Process (High-Level)

```
1. Contract owner adds a contact via /accountability/contacts:
   INSERT accountability_contacts (accepted_at = NULL, ...)
   → invitation notification sent to invitee

2. Invitee sees pending invitation (GET /accountability/invitations)
   → responds via POST .../invitations/:id/respond { accept: true|false }

3. IF accept:
     UPDATE accountability_contacts SET accepted_at = NOW() WHERE id = ...
   ELSE:
     contact remains permanently excluded (accepted_at stays NULL)

4. On contract violation (F16.1 → violated transition):
     notifyEnforcers(contractId):
       SELECT contact_user_id FROM accountability_contacts
       WHERE user_id = owner AND is_active = true AND accepted_at IS NOT NULL
         AND allow_failure = true
       → for each resolved contact_user_id:
           notificationService.create({ userId: contact_user_id, ... })
           pushNotificationService.deliverForUser(contact_user_id, ...)
       → enforcers_notified = (count of successful sends > 0)   [never assumed true]
```

### Cross-Pillar Connections

**To Contract Lifecycle (F16.1):**
- Shares the identical ID-resolution query that also fixed the ID-space bug.

**To Consent-Gated SOS (F16.5):**
- The `is_emergency_contact` flag and acceptance handshake are the same underlying contact records the SOS escalation stage reads from.

**To Epic 13 (Social Growth OS):**
- Same accept-before-notify architectural pattern used for pod invitations and buddy matching — this feature is the accountability-domain instance of a platform-wide consent convention.

### Dependencies
- **Epic 13 (Social Growth OS):** shared consent/handshake conventions
- **F16.1:** shares the ID-resolution/notification query

### MVP Status
[X] Shipped — production hardening complete

---

## F16.5: CONSENT-GATED SOS WELLNESS-CHECK

### Description
A two-stage, explicitly consent-gated safety-net feature for at-risk or isolated users. Before this epic, the "SOS safety net" advertised in the product was entirely dead code — the audit called this worse than not offering the feature at all, because a user might believe it would fire and rely on it. This feature revives it with real consent gating and a deliberately conservative design: **Stage 1** is a gentle, AI-initiated check-in that reaches out to the user themselves — no third party is contacted at this stage. **Stage 2**, only if Stage 1 gets no response after an escalation-grace window, escalates to a designated, SOS-consented, accepted emergency contact.

### User Story
As a user who has gone quiet for an unusual stretch of time, I want SIA to check in on me gently first, and only reach out to my emergency contact if I genuinely don't respond — never skip straight to alarming someone I care about over a normal quiet week.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | SOS is opt-in and off by default; once enabled with an emergency contact designated and accepted, the two-stage flow runs automatically with sensible defaults (`sos_inactivity_days`, 2-day escalation grace). |
| **Deep** | User can customize `sos_inactivity_days` (the inactivity threshold that triggers Stage 1) and `sos_message` (a custom note included if Stage 2 escalates), and can view SOS episode history in the audit log. |

### Technical Foundation

**File:** `server/src/jobs/sos-wellness-check.job.ts`. Header docblock states the design intent directly:
> Stage 1 (checkin) — reach out to the USER first ("we haven't seen you, are you OK?"). No third party is contacted.
> Stage 2 (escalate) — only if the user is STILL silent an escalation-grace later, alert their SOS-consented, accepted emergency contacts. Conservative on purpose: false-alarming a person's emergency contact is a real harm.

The stage decision is a pure, deterministic function `sosStage()` (lines 39-54) — not an LLM judgment call, which matters for a safety-critical path: the same inputs always produce the same stage. `SOS_ESCALATION_GRACE_DAYS = 2` by default. Inactivity is computed as no login **and** no tracked streak activity: `GREATEST(last_login, last_activity_date, created_at)` against `sos_inactivity_days`. Episode dedup is handled via the existing `accountability_consent_audit` log (no new schema needed) so the same inactivity episode doesn't re-trigger Stage 1 repeatedly.

**Scheduling:** the job runs daily (`JOB_INTERVAL_MS = 24h`) with a 15-minute startup delay and an advisory lock to prevent double-execution across worker instances. It is registered in `server/src/index.ts`:
```ts
import { startSosWellnessCheckJob, stopSosWellnessCheckJob } from "./jobs/sos-wellness-check.job.js";
...
schedulerRegistry.registerJob({
  name: 'sos-wellness-check',
  start: () => startSosWellnessCheckJob(),
  stop: () => stopSosWellnessCheckJob(),
  staggerMs: 2640_000,
});
```
**Note on scope vs. the original audit doc:** the 2026-06-10 audit's remediation notes described scheduler registration as still deferred pending an unrelated in-flight WhatsApp-job import cleanup in `index.ts`. That blocker has since been cleared in a follow-up platform-wiring commit, and the job is confirmed registered and scheduled as of this epic's close — this item is **shipped**, not deferred.

`getSosCandidates()` in `accountability-consent.service.ts` supplies the query surface the job uses to find eligible users (SOS enabled, inactivity threshold crossed, at least one accepted `is_emergency_contact`).

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Stage 2 escalations without prior Stage 1 attempt | 0 | Job logic guarantees sequential stage progression |
| Stage 2 escalations to a non-accepted or non-consented contact | 0 | `getSosCandidates()` query filters on acceptance + `allow_sos_alerts` |
| Duplicate Stage 1 check-ins for the same inactivity episode | 0 | Audit-log dedup check |
| Job execution reliability (daily run completes) | 100% (with advisory lock preventing double-run) | Scheduler registry health monitoring |

### Acceptance Criteria

- [ ] SOS is disabled by default; requires explicit user opt-in (`ConsentSettings.allow_sos_alerts = true`)
- [ ] Stage 1 never contacts a third party — only the user themselves, via SIA
- [ ] Stage 2 fires only after `SOS_ESCALATION_GRACE_DAYS` of continued silence following Stage 1
- [ ] Stage 2 only targets contacts with `is_emergency_contact = true`, `accepted_at IS NOT NULL`, and per-contact `allow_sos_alerts` consent
- [ ] `sosStage()` is a pure deterministic function — same inputs always produce the same stage decision
- [ ] Job is registered in the scheduler registry and runs on a real daily cadence with startup delay and advisory locking
- [ ] Episode dedup prevents repeated Stage 1 messages for the same continuous inactivity window
- [ ] SOS episode history is visible in the accountability audit log (Deep Mode)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **User responds during the escalation grace window** | Login/activity detected before Stage 2 fires | Episode closed, no escalation | None further — quiet resolution |
| **No emergency contact configured/accepted when Stage 2 would fire** | `getSosCandidates()` finds no eligible contact | Stage 2 skipped, logged for visibility, no crash | None sent (nothing to send) |
| **Job overlaps a prior run (retry/restart)** | Advisory lock held | Second invocation exits immediately | No duplicate check-ins |
| **User has SOS disabled mid-episode** | Consent check on each stage transition | Episode aborted, no further stages | None — respects the opt-out immediately |

### Two-Stage SOS Process (High-Level)

```
Daily SOS Job (advisory-locked, 24h cadence):

1. getSosCandidates():
   SELECT users WHERE allow_sos_alerts = true
     AND GREATEST(last_login, last_activity_date, created_at) < NOW() - sos_inactivity_days
     AND EXISTS (accepted, is_emergency_contact accountability_contacts row)

2. FOR each candidate:
   a. Look up prior SOS episode state from accountability_consent_audit
   b. stage = sosStage(daysInactive, priorStage, escalationGraceElapsed)

3. IF stage === 'checkin' (Stage 1) AND not already sent for this episode:
     SIA sends a gentle, first-person check-in message to the USER
     Log episode start to accountability_consent_audit

4. IF stage === 'escalate' (Stage 2) AND Stage 1 sent AND grace elapsed AND still silent:
     FOR each accepted, SOS-consented emergency contact:
       Send escalation notification (includes user's custom sos_message if set)
     Log escalation to accountability_consent_audit

5. IF user becomes active at any point:
     Episode closed, no further stages, logged as resolved
```

### Cross-Pillar Connections

**To Enforcer Acceptance Handshake (F16.4):**
- Reuses the exact same `accountability_contacts` acceptance handshake — an emergency contact must go through the identical accept flow as a violation-alert enforcer.

**To Coach Contract Awareness (F16.6):**
- Stage 1's check-in is delivered through SIA's own conversational voice, not a generic push notification, consistent with the "support before punishment" philosophy.

**To Epic 07 (Wellbeing Pillar):**
- SOS sits alongside — but is architecturally distinct from — any crisis-detection flows in the wellbeing pillar; SOS is inactivity-triggered, not sentiment-triggered.

### Dependencies
- **F16.4 (Enforcer Acceptance Handshake):** shared contact/consent infrastructure
- **Epic 11 (SIA Cognitive OS):** Stage 1 delivery channel

### MVP Status
[X] Shipped — production hardening complete (job built, registered, and scheduled)

---

## F16.6: COACH CONTRACT AWARENESS

### Description
Before this epic, SIA had **zero** contract-awareness tools — a critical gap, because the product's core promise ("SIA enforces your commitments") was structurally false: the coach could not see, reference, propose, or react to a single contract anywhere in its ~25 tool domains or its live coaching context. Worse, a separate commitment-tracking path (`commitment-tracker.service.ts`) was scripted to deliver escalating "tough love" messaging about commitments the coach had no way of verifying were actually broken — described in the audit as active gaslighting, since the underlying evaluators were frequently wrong (F16.2/F16.3). This feature closes both problems: SIA now has a full contract-aware toolset, active contracts are injected into its live coaching context with an explicit directive never to congratulate around a live breach, and — critically — on a user's **first** slip on any contract, SIA reaches out supportively **before** any penalty or enforcer notification fires.

### User Story
As a user talking to SIA day-to-day, I want it to actually know about the commitments I've made — able to draft a contract from our conversation, aware of ones I'm currently at risk on, and supportive rather than punitive the first time I slip — so that "SIA holds me accountable" is something it can actually do, not just say.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | SIA mentions active contracts naturally in conversation when relevant; first-slip outreach happens automatically with a warm, non-judgmental default message. |
| **Deep** | User can explicitly ask SIA "what contracts am I on?" / "propose a contract for X" and get full detail (condition, penalty, violation count); Deep Mode surfaces the full commitment ladder (chat commitment → pledge → binding contract) and SIA's reasoning for suggesting escalation between rungs. |

### Technical Foundation

**Tool domain:** `server/src/services/langgraph-tools/domains/accountability.ts` registers: `getMyContracts`, `getContractDetails`, `getAccountabilitySummary`, `proposeContract`, `createPledge`, `getMyCommitments`, `resolveCommitment`, and a cancel-commitment tool. This is the unified toolset across all three previously-disconnected commitment layers (chat commitments, soft pledges, binding contracts) — resolving the audit's architectural finding that these three layers shared no suggestion signal and no common coach toolset.

**`proposeContract`** always creates a **draft**, never an active/binding contract — enforcement only starts once the user explicitly signs it in the Contracts tab. This is a deliberate safety boundary: SIA can suggest stakes but cannot unilaterally impose them.

**Escalation ladder built into tool descriptions:**
- `createPledge`: *"A pledge is the soft rung below a binding contract... If they keep breaking pledges in a category, escalate to `proposeContract`."*
- `resolveCommitment`: *"Repeated unfulfilled commitments in a category are a strong signal to suggest a binding contract."*

**Context injection** — `server/src/services/comprehensive-user-context.service.ts` (lines ~3355-3366) injects an `ACCOUNTABILITY CONTRACTS` section whenever the user has any contracts, listing title/condition/status/violation count per contract, at **priority 70** ("core coaching data" tier — never dropped ahead of gamification/competition content when the context window is trimmed). The injected directive is explicit:
> "The coach must not congratulate or coach around a commitment the user is currently breaching (audit C-5)."

When any contract is `at_risk` or `violated`, an additional directive is appended:
> "Coaching directive: a contract is at risk or in breach. Do NOT congratulate the user around it or gloss over it; acknowledge the commitment honestly..."

**`ai_intervene_first` pattern** — a first-slip detector in `accountability-contract.service.ts` (lines ~970-1038): when `violation_count === 1` on a contract (the user's very first slip), the violation is flagged `firstSlip` and routed through a supportive `contractViolationNotice()` message rather than the standard punitive one. The violation row is updated with `ai_intervened=true, ai_intervention_message=...`, and — this is the part that matters — the message is delivered **through the coach chat itself** via `proactiveMessagingService.sendProactiveMessage(userId, notice.message, 'contract_breach')`, not merely as a bell/push notification:
> "Speak the supportive reach-out in the AI-coach chat — not just a bell toast."

Only repeat violations (2nd+) escalate to the standard punitive-notice + enforcer-notification path.

Note: a separate, unrelated file, `server/src/services/intelligence/accountability-prompt-controller.service.ts`, exists for adaptive-planning "blocker-oriented" recovery coaching on stalled goals — it does not perform the contract-context injection described above (that lives in `comprehensive-user-context.service.ts`); the two should not be confused when extending either.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Coach tool domains with zero contract awareness | 0 (down from 25 of 25) | Tool registry audit |
| First violations that trigger a supportive coach message before any penalty/enforcer notification | 100% | `firstSlip` branch coverage in violation-recording tests |
| Coach responses that congratulate/gloss over an active `violated`/`at_risk` contract | 0 | Prompt-injection regression test with a violated-contract fixture |
| `proposeContract` calls that create anything other than a `draft` | 0 | Tool schema/contract test |

### Acceptance Criteria

- [ ] `getMyContracts`, `getContractDetails`, `getAccountabilitySummary` expose real, current contract state to SIA
- [ ] `proposeContract` always creates `status: 'draft'` — never active
- [ ] `createPledge` and `resolveCommitment` tool descriptions encode the escalation ladder (commitment → pledge → contract)
- [ ] `ACCOUNTABILITY CONTRACTS` context section is injected whenever the user has any contract, at core-tier priority (70) so it survives context trimming
- [ ] An explicit "do not congratulate around a breach" directive is present whenever any contract is `at_risk`/`violated`
- [ ] First violation on any contract (`violation_count === 1`) routes to a supportive coach-chat message before enforcer notification or penalty execution
- [ ] Second and later violations on the same contract escalate to the standard punitive notice + enforcer path (per F16.4)
- [ ] `ai_intervened` / `ai_intervention_message` fields are actually written on the violation row (previously dead schema fields, per audit finding Arch-5)

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **User asks SIA about a contract mid-conversation before context was refreshed** | Tool call `getContractDetails` | Always queries live DB state, not a stale cached context snapshot | Accurate, current answer |
| **`proposeContract` invoked with an underspecified condition** | Validator rejects incomplete `condition_details` | Tool returns a structured error; SIA asks a clarifying follow-up rather than creating a malformed draft | "I need a bit more detail before I can draft that — how should we measure it?" |
| **Context window trimming under token pressure** | Priority-scored context assembly | `ACCOUNTABILITY CONTRACTS` section (priority 70) survives ahead of lower-priority gamification/competition sections | Coach remains contract-aware even in long conversations |
| **First-slip supportive message fails to send (delivery error)** | `sendProactiveMessage` error | Logged, does not block the underlying violation record or lifecycle transition | Violation still correctly recorded; message retried on next delivery cycle |

### Coach Contract Awareness Process (High-Level)

```
On every violation recorded (F16.2 → recordViolation):

1. Read current violation_count for this contract (post-increment)
2. IF violation_count === 1 (first slip):
     notice = contractViolationNotice(firstSlip=true, contract)
     UPDATE violation SET ai_intervened=true, ai_intervention_message=notice.message
     proactiveMessagingService.sendProactiveMessage(userId, notice.message, 'contract_breach')
     → delivered IN the coach chat thread, supportive tone, no enforcer notification, no penalty execution yet (grace applies, F16.7)
3. IF violation_count >= 2 (repeat):
     Standard punitive notice + notifyEnforcers() (F16.4) + executePenalty()/grace sweep (F16.7)

Independently, on every coach turn:

4. comprehensive-user-context.service assembles context:
   a. Query active contracts for user
   b. IF any exist: inject ACCOUNTABILITY CONTRACTS section (priority 70)
   c. IF any at_risk/violated: append "do not congratulate around a breach" directive
5. SIA's response generation reads this section like any other core-tier context —
   cannot celebrate a workout streak while ignoring a violated sleep contract
```

### Cross-Pillar Connections

**To Contract Lifecycle (F16.1) & Grace Periods (F16.7):**
- First-slip detection reads `violation_count`, which is the same counter driving `at_risk`/`violated` transitions and grace-window eligibility.

**To Analytics Engine (F16.9):**
- Both are new SIA tool-surface additions shipped in the same window; `runAnalyticsQuery` can be asked about contract-adjacent behavior trends, while contract tools handle the commitment layer itself — deliberately separate toolsets, no overlap.

**To Epic 11 (SIA Cognitive OS):**
- This is the accountability-domain instance of Epic 11's broader "AI Coach Contract-Awareness" integration point; the `accountability-prompt-controller.service.ts` (Epic 11's adaptive-planning layer) is a distinct, adjacent subsystem for stalled-goal recovery coaching.

### Dependencies
- **Epic 11 (SIA Cognitive OS):** `comprehensive-user-context.service.ts` and the langgraph tool registry are Epic 11 infrastructure this feature extends
- **F16.1, F16.2, F16.7:** context and first-slip logic read lifecycle state and violation counters

### MVP Status
[X] Shipped — production hardening complete

---

## F16.7: GRACE PERIODS & HONEST AUDIT TRAIL

### Description
Before this epic, grace-period penalties never actually executed — `grace_expires_at` was written to the violation row but never read by anything, so a user could be told a grace period had lapsed and a penalty applied when, in reality, nothing happened (audit finding C-8). Compounding this, several audit/messaging paths generated false-success records: `enforcers_notified` was set to `true` even when zero enforcers were actually notified (a symptom of the F16.1/F16.4 ID-space bug), `grace_used` was never set, violation notifications unconditionally claimed a penalty had fired regardless of whether it had, and `checkExpiredContracts` sent a blanket "You fulfilled your contract!" celebration to every contract reaching `end_date` — including ones that had accumulated violations. This feature makes grace periods real and makes every audit record the system produces honest.

### User Story
As a user in a grace period after a violation, I want to actually be able to use that window to get back on track — and if I don't, I want to be told plainly what actually happened, not a message that assumes a penalty fired when it silently didn't (or a celebration that pretends I finished clean when I didn't).

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Grace window shown as a simple countdown; honest end-of-contract message ("You finished with N slip(s)") replaces blanket celebration when applicable. |
| **Deep** | Full settlement transparency: grace-sweep outcome (waived vs. executed) recorded per violation, dispute history references the real evidence trail, and contract-completion summaries break down violation count against final XP awarded. |

### Technical Foundation

**Grace-expiry sweep now real** (`accountability-contract.service.ts`, `sweepExpiredGrace`, ~lines 1250-1300): queries violations `WHERE grace_expires_at IS NOT NULL AND grace_expires_at < NOW()`, and for each:
- If the user got back on track during the grace window → `penalty_status = 'waived', grace_used = true, resolved_at = NOW()`
- Otherwise → `executePenalty()` runs for real, then `grace_used = true` is set

`executePenalty` (line ~1168) has multiple call sites now: immediate execution when no grace window applies, the grace sweeper above, and the dispute-reversal path. This closes C-8 directly — the sweep is invoked from `contract-evaluation.job.ts` on every cycle (`const grace = await accountabilityContractService.sweepExpiredGrace();`).

**Audit-honesty fixes (finding R-7):**
- `enforcers_notified` is set **only** when the actual notified-count is `> 0` — never assumed true. If every accepted enforcer declined `allow_failure` consent, or every send threw, the flag correctly reads `false`.
- `grace_used` is now set on **both** the waive and execute outcomes (previously never set at all).
- `contractViolationNotice()` (lines ~972-989) branches honestly on real state: *"You have Xh to get back on track before the penalty applies"* when grace is open, versus the concrete, already-executed penalty clause when it has fired. It no longer unconditionally states the penalty applied.
- `checkExpiredContracts` no longer sends a blanket completion celebration to every contract reaching `end_date`. It calls `contractCompletionOutcome(violationCount, title)`, which produces an honest "Contract Ended — you finished with N slip(s)" message (not a celebration) for contracts with violations, and reduces the XP award proportionally for contracts that didn't finish clean.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Grace-expired violations with no recorded outcome (never waived, never executed) | 0 (down from 100% pre-fix) | `sweepExpiredGrace` coverage: every expired-grace violation reaches a terminal `penalty_status` |
| `enforcers_notified=true` with zero actual notifications sent | 0 | Cross-check against notification insert count |
| Violation-notice copy claiming a penalty fired when it hadn't | 0 | `contractViolationNotice` branch test against grace-open vs. grace-expired fixtures |
| Blanket "fulfilled" celebrations sent to contracts with `violation_count > 0` | 0 (down from 100% pre-fix) | `checkExpiredContracts` completion-message regression test |

### Acceptance Criteria

- [ ] `sweepExpiredGrace` runs every evaluation cycle and resolves every violation with an expired `grace_expires_at` to a terminal state (`waived` or `executed`)
- [ ] `grace_used` is set to `true` on both waive and execute outcomes, never left `null`
- [ ] `enforcers_notified` reflects the real count of successful notification sends, never assumed
- [ ] Violation notification copy accurately distinguishes "grace open" from "penalty already executed"
- [ ] `checkExpiredContracts` uses `contractCompletionOutcome()` to produce an honest completion message and XP award proportional to actual violation history
- [ ] Dispute review (`disputeViolation`) can act on `executed` penalties, not just `pending` ones (closing audit finding R-5's original gap where disputes on already-executed penalties were silently dropped)
- [ ] No code path anywhere in the contract system writes a "success"/"fulfilled"/"notified" audit field without a corresponding real side effect

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Grace window expires while user is offline** | `sweepExpiredGrace` cron pass | Resolves to waived/executed based on last-known compliance state, no manual trigger needed | User sees resolved outcome next time they open the app |
| **User disputes an already-executed penalty** | `disputeViolation` on `executed` status | Dispute now accepted for review (previously silently dropped) | "Your dispute has been logged for review" instead of a swallowed no-op |
| **Contract ends with violations but user expects a celebration** | `checkExpiredContracts` completion path | Honest "Contract Ended — N slip(s)" message with reduced XP, never a blanket celebration | Accurate summary, not a false positive |
| **Notification send throws for one enforcer but succeeds for another** | Per-recipient try/catch in `notifyEnforcers` | `enforcers_notified` reflects partial success accurately (count > 0 from the successful ones) | Owner's audit view shows accurate notified-count, not all-or-nothing |

### Grace Period & Audit Honesty Process (High-Level)

```
On violation recorded with a configured grace period:

1. RECORD violation, SET grace_expires_at = NOW() + grace_hours
2. Notify user: "You have {X}h to get back on track before the penalty applies"
   (honest — no penalty has fired yet)
3. Penalty is NOT executed at this point.

Every evaluation cycle (2h), sweepExpiredGrace():

4. SELECT violations WHERE grace_expires_at < NOW() AND penalty_status = 'pending'
5. FOR each:
   a. Re-check compliance since the violation (via metricResolver, F16.2)
   b. IF back on track: penalty_status='waived', grace_used=true, resolved_at=NOW()
      → user notified: "Grace period honored — no penalty applied"
   c. ELSE: executePenalty() [real donation/XP-loss/social_alert/streak_freeze_loss]
      penalty_status='executed', grace_used=true
      → user notified: "Grace period ended — {penalty} applied" (only NOW is this claim true)

On contract reaching end_date, checkExpiredContracts():

6. outcome = contractCompletionOutcome(violation_count, title)
7. IF violation_count === 0: genuine completion celebration + full XP
8. ELSE: honest "Contract Ended — you finished with N slip(s)" + proportionally reduced XP
```

### Cross-Pillar Connections

**To Contract Lifecycle (F16.1):**
- The grace sweep is the mechanism that finally resolves a `violated` contract's outstanding penalty state.

**To Enforcer Acceptance Handshake (F16.4):**
- `enforcers_notified` honesty depends directly on F16.4's accept-gated notification query.

**To Coach Contract Awareness (F16.6):**
- First-slip supportive outreach (F16.6) and grace periods are complementary — a first slip gets both a supportive message AND, if configured, a grace window before any penalty.

### Dependencies
- **F16.1 (Contract Lifecycle):** shares violation/settlement state
- **F16.4 (Enforcer Acceptance Handshake):** notification-count honesty

### MVP Status
[X] Shipped — production hardening complete

---

## F16.8: WITNESS / PEER-VERIFICATION (FLAG-GATED, OFF)

### Description
A newer, separate feature layered on top of the now-hardened contract system (F16.1-F16.7): a third party ("witness") can peer-verify whether a contract condition was actually met, adding an independent verification layer beyond self-report and automated metric resolution. Shipped 2026-07-07 — one day before this epic's documentation close — and deliberately flag-gated **OFF**, pending further rollout planning. This sequencing is intentional: witness verification was built and merged only after F16.1-F16.7 had proven the underlying contract system stable, since witness verdicts plug directly into the same `executePenalty`/violation machinery those fixes hardened.

### User Story
As a user whose contract doesn't rely on wearable-verifiable data (e.g. a subjective or self-reported goal), I want to be able to invite a trusted witness who can independently confirm whether I actually did what I committed to, so that completion isn't purely self-attested when the stakes matter to me.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | (Not yet exposed — flag OFF.) When enabled: invite up to 5 witnesses at contract creation; if the contract ends clean (no violations), witnesses are never invoked at all. |
| **Deep** | (Not yet exposed — flag OFF.) When enabled: witnesses only activate when the contract does NOT end clean (`violation_count > 0`); all accepted witnesses must confirm for verified completion; a single rejection forces the contract's configured penalty; a 3-day verdict timeout auto-closes to completed with no penalty ("innocent until proven"). |

### Technical Foundation

**Schema** — `server/src/database/tables/140-contract-witnesses.sql` (also `migrations/20260707120000_contract_witnesses.sql`):

```sql
-- contract_witnesses
id, contract_id (FK → accountability_contracts), witness_user_id (FK → users),
status ENUM('invited','accepted','declined') DEFAULT 'invited',
source ENUM('contact','buddy'), invited_at, responded_at, reminded_at,
UNIQUE(contract_id, witness_user_id)

-- contract_witness_verdicts
id, contract_id, witness_user_id,
verdict ENUM('confirmed','rejected'), note, evidence JSONB,
UNIQUE(contract_id, witness_user_id)
```

**Service:** `server/src/services/contract-witness.service.ts` (`contractWitnessService`). A witness is a trusted accountability contact or buddy who (1) accepts an invitation handshake — reusing the same accept-before-participate pattern as F16.4 — and (2) at `end_date`, **only if the contract did not end cleanly**, confirms or rejects that the owner actually completed it. Quorum is strict: **all** accepted witnesses must confirm for verified completion; a single `rejected` verdict forces the contract's configured penalty via `accountabilityContractService.applyWitnessRejection`, which reuses the existing violation/`executePenalty` path from F16.7 rather than duplicating penalty logic. `WITNESS_VERDICT_TIMEOUT_DAYS = 3` auto-closes to `completed` with no penalty if verdicts never arrive — a deliberate "innocent until proven" default that avoids indefinitely stalling a contract on an unresponsive witness. `MAX_WITNESSES = 5` per contract.

**Extended lifecycle states** (layered on top of F16.1's state machine, service-query level only — see the F16.1 note on the pending `ContractStatus` type update): `pending_witnesses` (post-sign, awaiting all invited witnesses to accept) → `active` (all accepted) → `pending_verification` (reached a non-clean `end_date`) → `completed` (all confirmed, or timeout) / `witness_rejected` (any reject).

**Feature flag:** `ENABLE_WITNESS_VERIFICATION`, defined in `server/src/config/env.config.ts:317`:
```ts
witnessVerification: process.env['ENABLE_WITNESS_VERIFICATION'] === 'true'
```
Default **OFF** — the variable is not set in `.env.example`, so it is off unless an operator explicitly enables it. Config comment: *"OFF by default — when off, contracts behave exactly as before (no witness requirement, auto-completion at end_date)."* Confirmed via `git log`: commit `07728331`, dated 2026-07-07, `feat(witness): contract peer-verification lifecycle (flag-gated, OFF by default)` — the most recent accountability-related feature commit in the repo at the time of this epic's documentation.

**Client surface:** premium-modal rebuild of `WitnessVerdictModal.tsx` and related accountability-tab components (in-progress on branch `feature/witness-verification-premium-rebuild` / `feature/premium-modals-friend-picker`) provides the invite/accept/verdict UI, gated behind the same flag.

### Success Metrics (post-enablement targets, not yet live)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Witness verdicts on contracts that ended clean | 0 (witnesses should never be invoked) | Query: witness verdict rows joined against `violation_count = 0` contracts |
| Contracts stuck in `pending_witnesses`/`pending_verification` past timeout | 0 | Timeout sweep coverage |
| Witness rejections that bypass `executePenalty` | 0 | `applyWitnessRejection` must always route through the existing penalty path |
| Witnesses per contract | ≤ 5 (hard cap) | `MAX_WITNESSES` enforcement test |

### Acceptance Criteria

- [x] Schema, service, controller endpoints (`POST/GET /contracts/:id/witnesses`, `POST /contracts/:id/witnesses/respond`, `POST /contracts/:id/witnesses/verdict`) shipped and tested
- [x] Witnesses only activate on non-clean contract completion — never invoked on a clean finish
- [x] Quorum requires unanimous `confirmed` verdicts; a single `rejected` forces the existing penalty path
- [x] 3-day verdict timeout defaults to completion, not penalty (innocent-until-proven default)
- [x] `MAX_WITNESSES = 5` enforced server-side
- [x] Feature is fully inert when `ENABLE_WITNESS_VERIFICATION` is unset/false — contracts behave exactly as pre-F16.8
- [ ] **Deferred to rollout planning:** production enablement, gradual flag rollout strategy, `ContractStatus` shared-type union updated to include the three new states, premium client UI finalized and merged to main

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **Witness never responds to invitation** | `status` stays `invited` past a reasonable window | Contract remains `pending_witnesses`; owner can remove/replace the unresponsive witness | "Waiting on {witness} to accept" |
| **All witnesses accept, contract later ends clean** | `violation_count = 0` at `end_date` | Witnesses never invoked; standard completion path (F16.1/F16.7) runs | No witness-related message at all |
| **One witness rejects, others confirm** | Quorum check fails (not unanimous) | `applyWitnessRejection` triggers, existing penalty executes | Owner notified penalty applied due to witness rejection |
| **No witness responds to a verification request within 3 days** | Timeout sweep | Auto-completes with no penalty | "Verification window closed — contract marked complete" |

### Witness Verification Process (High-Level)

```
(Applies only when ENABLE_WITNESS_VERIFICATION=true)

1. On sign: IF witnesses invited → status = 'pending_witnesses'
2. Each invited witness responds (accept/decline), reusing F16.4's handshake pattern
3. ALL accepted → status = 'active' (normal contract lifecycle, F16.1, resumes)
4. At end_date:
   IF violation_count === 0:
     → standard clean completion (witnesses never invoked)
   ELSE:
     → status = 'pending_verification'
     → all accepted witnesses asked to confirm/reject completion
5. Verdict collection (up to WITNESS_VERDICT_TIMEOUT_DAYS = 3):
   IF any verdict === 'rejected':
     → status = 'witness_rejected'
     → applyWitnessRejection() → reuses F16.7's executePenalty()
   ELSE IF all verdicts === 'confirmed':
     → status = 'completed'
   ELSE IF timeout elapsed with incomplete verdicts:
     → status = 'completed' (innocent-until-proven default, no penalty)
```

### Cross-Pillar Connections

**To Contract Lifecycle (F16.1):**
- Extends the state machine with three new states; reuses the existing machine for everything before `end_date`.

**To Enforcer Acceptance Handshake (F16.4):**
- Witness invitation/acceptance is a direct reuse of the same accept-before-participate handshake pattern.

**To Grace Periods & Honest Audit Trail (F16.7):**
- Witness rejection routes through the exact same `executePenalty` path — no parallel penalty logic was introduced.

**To Epic 13 (Social Growth OS):**
- `source: 'buddy'` witnesses draw from the same buddy-matching pool Epic 13 maintains.

### Dependencies
- **F16.1, F16.4, F16.7:** witness verification is built entirely on top of these hardened primitives, not alongside them
- **Epic 13 (Social Growth OS):** buddy-sourced witnesses

### MVP Status
[ ] Post-MVP — shipped to codebase, flag-gated OFF pending rollout planning

---

## F16.9: ANALYTICS ENGINE

### Description
A new, ECharts-based, ad-hoc cross-domain analytics system exposed directly to SIA as coach tools — co-shipped in the same delivery window as the accountability hardening but architecturally independent from it. Where Epic 08's Pattern Correlation Engine surfaces proactive, pre-computed same-day correlations and Epic 14's Life Correlation Matrix (LCM) maintains a persistent, Bayesian-updated directed graph of domain relationships, the Analytics Engine answers **reactive, ad-hoc, lag-aware** questions a user or SIA poses in the moment — "how does my sleep affect my mood two days later?" — with real statistical backing and an inline chart rendered directly in the chat.

### User Story
As a user chatting with SIA, I want to be able to ask a specific analytics question about my own data — across any domain, over any time range, including time-lagged effects — and get back a real answer with a chart, not a hand-wavy summary, so that I can actually interrogate my own patterns instead of waiting for a pre-scheduled insight.

### Flexibility Modes

| Mode | Experience |
|------|------------|
| **Light** | Ask SIA a plain-language question ("does my spending go up when I'm stressed?"); SIA infers domain/metrics/time range automatically and replies with a short narrative + one inline chart. |
| **Deep** | Explicit control over `domain`, `metrics`, `timeRange`, and `analysisTypes` parameters; access to `getBehavioralProfile` (trend/decay/consistency/loop detection per metric) and `getLifestyleBalanceRadar` (8-axis lifestyle balance snapshot) as standalone, structured queries. |

### Technical Foundation

**Orchestrator** — `server/src/services/analytics/analytics-engine.service.ts` (`analyticsEngineService`). Single public entry point `runQuery(userId, queryInput: AnalyticalQuery): Promise<AnalyticsResponse>`:
1. Validates requested metrics against `MetricRegistry`
2. Fetches time-series data in parallel via `metricRegistry.fetchTimeSeries`
3. Dispatches per `analysisType` (`trend_detection`, `behavioral`, `correlation_analysis`, `comparison`) to `BehavioralIntelligenceService` and `CrossDomainCorrelator`
4. Generates LLM-written insights, with a deterministic fallback
5. Calls `OutputFormatter.selectCharts()` then `assembleResponse()`

**LLM fallback logic:** before calling the LLM, checks `llmCircuitBreaker.isCallAllowed()` — if open, skips straight to `fallbackInsights()`. Otherwise calls a light-tier model (`temperature: 0.3, maxTokens: 1024, responseFormat: json_object`) for 3-7 insights + root-cause + recommendation. If the response fails to parse, or `totalPoints === 0`, falls back to templated, deterministic insight sentences derived directly from trend results (e.g. `"sleep_hours is increasing at +0.34 per week"`) rather than surfacing a broken or empty response.

**`CrossDomainCorrelator`** — `server/src/services/analytics/cross-domain-correlator.ts` — genuinely **lag-based**: `correlatePair` iterates lag from 0 up to a configured `maxLag`, computes Pearson r for each lag-shifted alignment, and keeps whichever lag produces the strongest correlation, reporting `lagDays` in the result (e.g. *"…with sleep_hours leading by 1 day(s)"*). This is confirmed distinct from two pre-existing systems: `cross-domain-correlator.service.ts` (Epic 08's same-day rule-based `DailyCorrelation` engine — 8 hardcoded boolean rules, no lag, no Pearson r) and `life-correlation-matrix.service.ts` (Epic 14's LCM — a persistent, Bayesian-updated directed graph in `life_correlation_edges`, not a per-query computation). All three coexist deliberately; the Analytics Engine's correlator is the only one built for ad-hoc, lag-aware, per-query analysis.

**`BehavioralIntelligenceService`** — `server/src/services/analytics/behavioral-intelligence.service.ts` — detects, per metric time-series:
- **Trend** (linear regression slope, `changePerWeek`, direction `improving`/`declining`/`stable`/`volatile`)
- **Consistency** (coefficient-of-variation converted to a 0-100 score)
- **Decay** (`detectHabitDecay` — first-half vs second-half mean comparison, `decayRate`, naive `projectedDaysToZero`)
- **Behavioral loops** (`detectBehavioralLoops` — normalized autocorrelation at lags 3-14 days; lag 7 labeled "weekend warrior," lag 14 "biweekly cycle")
- **Period comparison** (`comparePeriods` — previous vs. current half stats, `deltaPercent`, `baselineDeviation`)

**`MetricRegistry`** — `server/src/services/analytics/metric-registry.ts` — registers queryable metrics across all seven requested domains:

| Domain | Sample metrics |
|---|---|
| `biometrics` | `sleep_hours`, `resting_hr`, `hrv`, `recovery_score`, `strain_score`, `daily_steps` |
| `fitness` | `fitness.workout_volume`, `fitness.workout_frequency` |
| `nutrition` | `nutrition.calorie_adherence`, `nutrition.protein_intake`, `nutrition.meal_consistency` |
| `habits` | `habits.completion_rate`, `habits.streak_length`, `habits.consistency_score` |
| `wellbeing` | `wellbeing.mood_score`, `wellbeing.stress_level`, `wellbeing.energy_level`, `wellbeing.journal_sentiment` |
| `finance` | `finance.daily_spending`, `finance.savings_rate` |
| `goals` | `goals.progress_velocity` |

Each metric definition wraps a parameterized SQL query, executed via `query(sql, [userId, days])`, fail-safe to `[]` on error.

**`OutputFormatter`** — `server/src/services/analytics/output-formatter.ts` — chart-selection rules, always `engine: 'echarts'`: `trend_detection → line` (with trend reference line), `anomaly_detection → line` (mean ±2σ reference lines), `correlation_analysis → scatter`, `comparison → bar`, `forecasting → area` (actual + 14-day linear projection). `assembleResponse` derives `metadata.confidenceLevel` purely from data volume (`high` ≥30 points, `medium` ≥14, else `low`).

**AI coach tools** (`server/src/services/langgraph-tools/domains/analytics.ts`): `runAnalyticsQuery` (free-text `question` + optional `domain`/`metrics`/`timeRange`/`analysisTypes`, with domain-inference and a cross-domain retry fallback if the first guess returns no data), `getBehavioralProfile` (per-domain trend/consistency/decay/loop analysis across up to 5 metrics), `getLifestyleBalanceRadar` (fixed 8-axis lifestyle snapshot: Fitness, Sleep, Recovery, Nutrition, Mood, Energy, Habits, Finance, each normalized 0-100 against its metric's value range). **Note:** the radar tool's artifact does not set `engine: 'echarts'` and instead renders through the client's Recharts fallback path — worth flagging as a minor engine-consistency gap for future cleanup, not a defect (both engines are supported today).

**Client rendering** — `client/app/(pages)/ai-coach/components/ArtifactCard.tsx` dispatches on `artifact.engine === "echarts"`: ECharts artifacts render via `EChartsChart` → `client/components/charts/EChartsRenderer.tsx`; everything else falls back to the existing Recharts-based renderer. The Balencia dark theme is applied inline in `EChartsRenderer.tsx` (transparent background, low-opacity axis/split lines, brand-orange `#FF5E00` series accents with gradient/glow "premium 3D" enhancement) rather than via a registered ECharts theme file. The renderer includes an explicit security layer (`sanitizeTooltip`, `isSafeFormatter`, a `SAFE_SERIES_KEYS` whitelist) that strips any LLM-supplied chart config down to style-safe fields before merge — preventing prompt-injection-style CSS/XSS via a model-controlled tooltip or formatter.

**Important scope boundary:** six other analytics tools in the same file (`analyzeCorrelation`, `analyzeTrend`, `compareTimePeriods`, `detectAnomalies`, `analyzeMultiFactor`, `analyzeGoalProgress`) call a separate, pre-existing `deepAnalysisEngineService` — a parallel, older analytics pathway this epic does not touch or replace.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| `runAnalyticsQuery` calls returning `hasData: false` after full cross-domain retry fallback | Tracked, minimize over time | Query success-rate monitoring |
| LLM insight-generation failures silently surfaced as broken responses | 0 (deterministic fallback always available) | `fallbackInsights` coverage on parse-failure and circuit-open paths |
| Chart type mismatched to `analysisType` | 0 | `OutputFormatter.selectCharts` unit coverage (line/scatter/bar/area mapping) |
| LLM-supplied chart config reaching the DOM unsanitized | 0 | `EChartsRenderer` security-layer regression tests |

### Acceptance Criteria

- [ ] `runAnalyticsQuery`, `getBehavioralProfile`, `getLifestyleBalanceRadar` are registered and callable as SIA tools
- [ ] `CrossDomainCorrelator` supports multi-day lag correlation, distinct from the same-day Epic 08 engine and the persistent Epic 14 LCM graph
- [ ] `BehavioralIntelligenceService` correctly classifies trend direction, consistency score, decay, behavioral loops (including "weekend warrior" 7-day and "biweekly" 14-day labels), and period-over-period comparison
- [ ] `MetricRegistry` covers all seven domains (biometrics, fitness, nutrition, habits, wellbeing, finance, goals) with working `fetchTimeSeries` for each
- [ ] `OutputFormatter` selects the correct ECharts chart type per `analysisType` and never crashes on empty series
- [ ] LLM insight generation has a working, tested deterministic fallback for both circuit-open and parse-failure cases
- [ ] `runAnalyticsQuery`'s domain-inference retries a cross-domain sweep before returning `hasData: false`
- [ ] Client `ArtifactCard` correctly dispatches ECharts vs. Recharts based on `artifact.engine`
- [ ] `EChartsRenderer` sanitizes any model-supplied tooltip/formatter config before rendering

### Error Handling Scenarios

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| **User has zero data points for the requested domain** | `totalPoints === 0` in `runQuery` | Skips LLM call entirely, returns "Insufficient data to generate insights." | "I don't have enough data yet for that — keep logging and ask again soon." |
| **LLM insight generation fails to parse or circuit breaker is open** | `parseLlmJson` throws / `isCallAllowed()` false | `fallbackInsights()` produces deterministic, trend-derived sentences | User still receives a real (if simpler) answer, never an error |
| **Requested domain returns no data but a related domain has data** | First-guess domain query empty | Retries `inferDomainFromQuestion()` domain, then a full cross-domain sweep before giving up | SIA may answer from a different domain than literally asked, with a note |
| **Metric's `fetchTimeSeries` SQL throws** | try/catch in `MetricRegistry` | Returns `[]` for that metric rather than failing the whole query | Query proceeds with remaining valid metrics; degraded, not broken |
| **Model attempts to inject unsafe tooltip/formatter CSS via chart config** | `isSafeFormatter`/`sanitizeTooltip` whitelist check | Unsafe fields stripped before render | Chart renders normally with default-safe styling |

### Analytics Query Process (High-Level)

```
runAnalyticsQuery(question, domain?, metrics?, timeRange?, analysisTypes?):

1. IF domain/metrics not given: inferDomainFromQuestion(question) via keyword regex
2. metricRegistry.fetchTimeSeries(userId, metric, days) for each resolved metric (parallel)
3. IF totalPoints === 0:
     retry with inferDomainFromQuestion's domain
     IF still 0: retry full cross-domain sweep (ALL_DOMAIN_METRICS)
     IF still 0: return { success: true, hasData: false }

4. FOR each analysisType requested (default: trend_detection + behavioral):
   - trend_detection / behavioral → behavioralIntelligenceService.analyze(series)
   - correlation_analysis → crossDomainCorrelator.correlatePair(seriesA, seriesB, maxLag)
   - comparison → behavioralIntelligenceService.comparePeriods(series, splitDay)

5. generateInsights(rawAnalysis):
     IF circuit breaker open OR totalPoints === 0: fallbackInsights(rawAnalysis)
     ELSE: call light-tier LLM (json_object mode) → parseLlmJson()
           ON parse failure: fallbackInsights(rawAnalysis)

6. outputFormatter.selectCharts(analysisTypes, series, trends, correlations, behavioral)
   → one ChartSpec per analysis type, always engine: 'echarts'

7. outputFormatter.assembleResponse(...) →
   { query, summaryInsights, rootCauseAnalysis, recommendation, charts, metadata }
   metadata.confidenceLevel = high(≥30pts) | medium(≥14pts) | low

8. artifactGenerationService.saveInlineArtifact(charts) → returned to client,
   rendered by ArtifactCard → EChartsRenderer (dark theme, sanitized config)
```

### Cross-Pillar Connections

**To Epic 08 (Cross-Domain Intelligence):**
- Deliberately non-overlapping with the Pattern Correlation Engine (same-day, proactive, scheduled) — the Analytics Engine is reactive, ad-hoc, and lag-aware. Both may report a correlation between the same two metrics with different framing (same-day vs. lagged) without conflict.

**To Epic 14 (Life Correlation Matrix):**
- LCM is a persistent, evolving directed graph updated by detector signals over time; the Analytics Engine computes a fresh, one-off correlation per query. Neither reads from nor writes to the other's tables.

**To Objective Metric Resolution (F16.2):**
- Both read canonical behavior tables, but intentionally through separate code paths (`MetricRegistry` vs. `metric-resolver.service`) so an analytics query can never accidentally back an enforcement penalty.

**To Epic 11 (SIA Cognitive OS):**
- Ships as three new SIA tools alongside F16.6's contract-awareness tools, in the same langgraph tool-registry expansion.

### Dependencies
- **Epic 08 (Cross-Domain Intelligence):** conceptual precedent, non-overlapping implementation
- **Epic 14 (Life Correlation Matrix):** conceptual precedent, non-overlapping implementation
- **Epic 11 (SIA Cognitive OS):** tool registry, chat delivery, artifact rendering pipeline
- **Epic 09 (Data Integrations):** underlying biometric/behavioral data completeness

### MVP Status
[X] Shipped — new capability, production-ready

---

## EPIC SUCCESS CRITERIA

### Launch Readiness (F16.1-F16.7, F16.9 — Core)

- [ ] All 8 Critical findings from the 2026-06-10 audit verified resolved in code (not just marked resolved in the doc)
- [ ] All 7 Risk/Ethics findings verified resolved
- [ ] All 5 Architectural findings verified resolved
- [ ] Contract lifecycle has zero dead-end or exploitable states
- [ ] Zero evaluators can produce a verdict without reading canonical data
- [ ] Zero enforcer/witness/emergency-contact notifications can reach an unaccepted recipient
- [ ] SOS wellness-check job is registered, scheduled, and running (confirmed — this superseded the audit doc's "deferred" note)
- [ ] SIA has full contract-awareness tooling and injects live contract state into coaching context
- [ ] First-slip-before-penalty (`ai_intervene_first`) is enforced on every contract, not opt-in
- [ ] Grace periods execute for real; no audit record claims a penalty/notification that didn't happen
- [ ] Analytics Engine's five core services (orchestrator, correlator, behavioral intelligence, metric registry, output formatter) are independently unit-tested and pass
- [ ] Analytics Engine's three coach tools are registered and return correct `engine: 'echarts'` artifacts (except the known radar exception, tracked as follow-up)

### Deferred / Post-MVP Items (explicit, not oversights)

| Item | Status | Rationale |
|---|---|---|
| Witness/peer-verification (F16.8) production rollout | Flag OFF (`ENABLE_WITNESS_VERIFICATION`) | Deliberately sequenced after core hardening proved stable; needs a gradual-rollout plan |
| Email delivery channel for accountability notifications | Not built | Push + in-app shipped; email is incremental, not yet prioritized |
| Intra-window day-boundary sliver (evaluation windows still UTC-rolling, not user-local calendar days) | Known, unfixed | Lower-harm than the settled Critical items; resolver windows (`NOW() - N days`) need a rework to user-local calendar boundaries |
| AG-8 "pause to dodge enforcement" exploit | Declined | Fixing (delay pause to next local day) was judged a regression risk for legitimate sick-day pausers versus a marginal correctness gain |
| DDL triplication (Arch-1) — inline `ensureTables()` DDL kept alongside canonical migration | Declined | Removing it would reintroduce a hard boot-time dependency on auto-migrate having run; kept byte-aligned with canonical instead |
| Contract-suggestion path's independent analytics SQL (Arch-3) | Declined | Heuristic/lower-stakes, not enforcement-critical; left as-is |
| `ContractStatus` shared TypeScript union missing the three witness-introduced states | Known gap | Tracked as a type-definition cleanup for F16.8's eventual rollout, not a runtime risk |

---

## CROSS-EPIC DEPENDENCIES

### Epic 08: Cross-Domain Intelligence
- Analytics Engine (F16.9) is deliberately non-overlapping with Epic 08's same-day Pattern Correlation Engine — see F16.9's Cross-Pillar Connections for the explicit distinction.

### Epic 09: Data Integrations
- Objective Metric Resolution (F16.2) and Missing-Data Fairness (F16.3) both depend on wearable/behavior data completeness flowing into `daily_health_metrics`.
- Analytics Engine's `MetricRegistry` reads the same underlying integration data for its `biometrics` domain.

### Epic 11: SIA Cognitive OS
- Coach Contract Awareness (F16.6) extends Epic 11's langgraph tool registry and `comprehensive-user-context.service.ts` context-assembly pipeline.
- Analytics Engine (F16.9) ships three new tools into the same registry.
- `accountability-prompt-controller.service.ts` (a distinct Epic 11 adaptive-planning subsystem) integrates with, but is architecturally separate from, F16.6's contract-context injection.

### Epic 13: Social Growth OS
- Enforcer Acceptance Handshake (F16.4) and Witness/Peer-Verification (F16.8) both reuse the accept-before-notify consent pattern established across Epic 13's pod/buddy features.
- Accountability-partner matchmaking (`accountability-partner.service.ts`) is a distinct, Epic-13-adjacent feature, not part of the enforcer/witness handshake.

### Epic 14: Life Correlation Matrix
- Analytics Engine's `CrossDomainCorrelator` (F16.9) is confirmed architecturally distinct from Epic 14's persistent, Bayesian-updated directed graph — see F16.9 for the full comparison.

---

## TECHNICAL CONSIDERATIONS

### Data Models (Accountability)

**Contract Status/Condition/Penalty Enums** (`server/shared/types/domain/accountability.ts`):
```ts
export type ContractStatus =
  | 'draft' | 'active' | 'at_risk' | 'violated'
  | 'completed' | 'cancelled' | 'paused';
  // + service-level (not yet in this union): 'pending_witnesses' | 'pending_verification' | 'witness_rejected'

export type ContractConditionType =
  | 'missed_activity' | 'calorie_exceeded' | 'streak_break'
  | 'missed_goal' | 'sleep_deficit' | 'custom';

export type ContractPenaltyType =
  | 'donation' | 'xp_loss' | 'social_alert' | 'streak_freeze_loss' | 'custom';
```

**Evaluator Result Contract:**
```ts
interface EvaluationResult {
  passed: boolean;
  confidence: number;           // 0 when insufficientData
  insufficientData: boolean;
  evidence: {
    source?: 'daily_health_metrics' | 'health_data_records' | 'meal_logs' | 'none';
    reason?: 'ramp_in' | 'unknown_condition_type' | 'unsupported_metric'
           | 'low_recovery_rest' | 'no_data';
    error?: 'evaluation_failed';
    value?: number;
  };
}
```

**Consent Settings** (`accountability-consent.service.ts`):
```ts
interface ConsentSettings {
  enabled: boolean;
  allow_motivation_reminders: boolean;
  allow_failure_alerts: boolean;
  allow_sos_alerts: boolean;
  sos_inactivity_days: number;
  sos_message: string | null;
  ai_intervene_first: boolean;
  global_cooldown_hours: number;
}

interface AccountabilityContact {
  id: string;
  contact_user_id: string;
  accepted_at: Date | null;
  allow_failure: boolean;
  is_emergency_contact: boolean;
  is_active: boolean;
}
```

**Contract Witness Schema:**
```sql
-- contract_witnesses
id UUID, contract_id UUID REFERENCES accountability_contracts,
witness_user_id UUID REFERENCES users,
status TEXT CHECK (status IN ('invited','accepted','declined')) DEFAULT 'invited',
source TEXT CHECK (source IN ('contact','buddy')),
invited_at TIMESTAMPTZ, responded_at TIMESTAMPTZ, reminded_at TIMESTAMPTZ,
UNIQUE(contract_id, witness_user_id)

-- contract_witness_verdicts
id UUID, contract_id UUID, witness_user_id UUID,
verdict TEXT CHECK (verdict IN ('confirmed','rejected')),
note TEXT, evidence JSONB,
UNIQUE(contract_id, witness_user_id)
```

### Data Models (Analytics Engine)

**Analytics Query / Response:**
```ts
interface AnalyticalQuery {
  question?: string;
  domain?: AnalyticsDomain;   // 'fitness'|'nutrition'|'sleep'|'recovery'|'wellbeing'
                               // |'habits'|'finance'|'goals'|'productivity'|'biometrics'|'multi'
  metrics?: string[];
  timeRange?: 'last_7_days' | 'last_30_days' | 'last_90_days' | 'this_month' | 'last_month';
  analysisTypes?: Array<'trend_detection' | 'behavioral' | 'correlation_analysis'
    | 'comparison' | 'anomaly_detection' | 'forecasting'>;
}

interface AnalyticsResponse {
  query: AnalyticalQuery;
  summaryInsights: string[];
  rootCauseAnalysis: string | null;
  recommendation: string;
  charts: ChartSpec[];          // engine: 'echarts', config, type
  rawAnalysis: unknown;
  metadata: { confidenceLevel: 'high' | 'medium' | 'low'; dataPoints: number };
}

interface CrossDomainCorrelation {
  metricA: string; metricB: string;
  r: number; lagDays: number; n: number;
  narrative: string;   // e.g. "...with sleep_hours leading by 1 day(s)"
}

interface BehavioralAnalysis {
  trend: { direction: 'improving'|'declining'|'stable'|'volatile'; slope: number; changePerWeek: number; r: number };
  consistency: { score: number };            // 0-100
  decay: { isDecaying: boolean; decayRate: number; projectedDaysToZero: number | null;
            lastPeakDate: string; lastPeakValue: number };
  loops: Array<{ lagDays: number; strength: number; label: string }>;  // e.g. "weekend warrior"
  improvementVelocity: number;
  periodComparison?: { deltaPercent: number; baselineDeviation: number; direction: 'improved'|'declined'|'stable' };
}
```

### API Surface (Accountability — real, mounted routes)

```
# Mounted at {API_PREFIX}/contracts (server/src/routes/accountability-contract.routes.ts)
POST   /contracts                          - Create contract (draft)
GET    /contracts                          - List contracts
GET    /contracts/stats                    - Contract stats
GET    /contracts/suggestions              - Rule-based contract suggestions
GET    /contracts/suggestions/ai           - AI-generated contract suggestion
POST   /contracts/bulk-delete              - Bulk delete (draft/cancelled/completed only)
GET    /contracts/witness-pending          - Contracts awaiting this user's witness response
GET    /contracts/:id                      - Contract detail
PUT    /contracts/:id                      - Update contract
DELETE /contracts/:id                      - Delete (draft/cancelled/completed only)
POST   /contracts/:id/sign                 - draft -> active
POST   /contracts/:id/pause                - active -> paused (max 2x)
POST   /contracts/:id/resume               - paused -> active
POST   /contracts/:id/cancel               - -> cancelled
GET    /contracts/:id/violations           - Violation history
GET    /contracts/:id/checks               - Check history (incl. insufficient-data entries)
POST   /contracts/violations/:vid/dispute  - Dispute a violation (pending OR executed)
POST   /contracts/:id/witnesses            - Invite witnesses (flag-gated)
GET    /contracts/:id/witnesses            - List witnesses (flag-gated)
POST   /contracts/:id/witnesses/respond    - Witness accepts/declines (flag-gated)
POST   /contracts/:id/witnesses/verdict    - Witness confirms/rejects (flag-gated)

# Mounted at {API_PREFIX}/accountability (server/src/routes/accountability.routes.ts)
GET    /accountability/consent             - Get consent settings
PUT    /accountability/consent             - Update consent settings
POST   /accountability/consent/revoke-all  - Revoke all consent
GET    /accountability/contacts            - List contacts
POST   /accountability/contacts            - Add contact (creates handshake invitation)
DELETE /accountability/contacts/:contactId - Remove contact
PUT    /accountability/contacts/:contactId - Update per-contact consent
GET    /accountability/invitations         - Pending invitations for the current user
POST   /accountability/invitations/:id/... - Accept/decline invitation
GET    /accountability/groups              - Accountability groups (pods)
GET    /accountability/triggers            - Configured triggers
GET    /accountability/logs                - Trigger logs
GET    /accountability/audit               - Consent/notification audit log
GET    /accountability/emergency-contacts  - Emergency contacts (SOS)
```

The Analytics Engine (F16.9) is **not** exposed as REST endpoints — it is surfaced exclusively as SIA coach tools (`runAnalyticsQuery`, `getBehavioralProfile`, `getLifestyleBalanceRadar`) invoked through the langgraph tool-calling pipeline, consistent with its design as a conversational, ad-hoc capability rather than a dashboard feature.

### Performance Requirements

| Operation | Target Latency | Rationale |
|-----------|---------------|-----------|
| Contract evaluation cycle (per active contract) | Complete within the 2h job window for the full active-contract set | `contract-evaluation.job.ts` runs every 2h; must not overrun its own interval |
| `sweepExpiredGrace` per cycle | <5 seconds for typical grace-violation volume | Runs inline within the same 2h evaluation cycle |
| SOS wellness-check daily job | Complete within its 24h window, advisory-locked | Single daily pass, low volume, safety-critical correctness over speed |
| `runAnalyticsQuery` (AI coach tool call) | <5 seconds end-to-end including LLM insight generation | Must fit within a conversational turn's latency budget |
| `metricRegistry.fetchTimeSeries` per metric | <500ms | Parallelized across requested metrics in `runQuery` |
| Enforcer notification delivery (`notifyEnforcers`) | <2 seconds per accepted contact | Push + in-app dual delivery |

### Security & Privacy

- **Ownership scoping:** every accountability controller endpoint derives `userId` from the authenticated session and filters every query by it — confirmed airtight by the 2026-06-10 audit; no cross-user contract access path exists.
- **Consent-first delivery:** no notification of any kind (violation alert, SOS escalation, witness invitation) can target a user who has not explicitly accepted a handshake — enforced at the query level (`accepted_at IS NOT NULL`), not just in application logic, so a future regression cannot silently bypass it.
- **Fail-safe on error:** evaluator exceptions never produce a penalty (`passed: true` on system error) — the system fails toward inaction, never toward false punishment.
- **LLM isolation from enforcement:** `metric-resolver.service.ts` explicitly never reads `daily_analysis_reports` (LLM-derived narrative) as an enforcement input; deterministic penalties are never backed by an LLM's summary.
- **Chart-config sanitization:** `EChartsRenderer.tsx` whitelists safe style fields from any LLM-supplied chart configuration before rendering, preventing prompt-injection-driven CSS/XSS in inline chat charts.
- **SOS conservatism:** Stage 2 escalation is deliberately slow and consent-gated — the audit explicitly weighed "false-alarming a person's emergency contact" as a real harm to avoid, not just an edge case to handle.

---

## TESTING STRATEGY

### Unit Testing
- Evaluator matrix: every condition type × real-failure-case × real-pass-case × insufficient-data-case (F16.2, F16.3)
- Lifecycle transition guards: every valid and invalid state transition (F16.1)
- Grace sweep: waived vs. executed outcome branches (F16.7)
- Consent gate: `notifyEnforcers` query with accepted/declined/pending/inactive contact fixtures (F16.4)
- SOS `sosStage()` pure-function determinism across the full input space (F16.5)
- `CrossDomainCorrelator.correlatePair` lag-detection accuracy (F16.9) — 5 tests, passing
- `BehavioralIntelligenceService.analyze` full detection suite — 13 tests, passing
- `MetricRegistry` domain coverage and `fetchTimeSeries` failure isolation — passing
- `OutputFormatter.selectCharts` per-analysisType chart-type mapping — 4 tests, passing
- `AnalyticsEngineService.runQuery` empty-data and LLM-fallback paths — 3 tests, passing

### Integration Testing
- Full contract lifecycle: create → sign → violate → grace → penalty/waive → complete/cancel, against real Postgres (`server/tests/integration/accountability-contract.integration.test.ts`)
- Witness flow end-to-end: invite → accept → non-clean completion → verdict collection → resolution (`server/tests/integration/contract-witness.integration.test.ts`)
- Enforcer notification: contact accept → violation → notification delivery with FK integrity verified
- SOS two-stage: inactivity trigger → Stage 1 → escalation-grace elapse → Stage 2, with dedup verified across job re-runs

### Test Command Reference
```
npx jest tests/unit/services/analytics          # Analytics Engine unit suite
npx jest tests/unit/services/accountability-*    # Accountability unit suite
npx jest tests/integration/accountability-contract.integration.test.ts
npx jest tests/integration/contract-witness.integration.test.ts
```
(Project test runner is Jest, not Vitest — Vitest-style imports fail under this repo's config.)

### User Acceptance Testing
- Simulate a full "bad morning" scenario: verify exactly one violation is recorded across a full day of 2h evaluation cycles, not one per cycle
- Simulate a wearable-sync gap: verify no penalty and no false pass, with visible "insufficient data" entry
- Simulate a first-slip: verify the supportive coach-chat message arrives before any enforcer notification or penalty
- Simulate an enforcer who never accepts: verify zero notifications ever reach them, indefinitely

---

## RISKS & MITIGATIONS

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Regression reintroduces a silent-pass evaluator** | Critical | Low | Evaluator matrix tests require a real fail case per condition type, not just a pass case |
| **Regression reopens the ID-space bug in a new notification path** | Critical | Low | Consent-gate and ID-resolution are the same query — a bypass requires deliberately duplicating the vulnerable pattern, not just an oversight |
| **Witness rollout enabled before `ContractStatus` type gap is closed** | Medium | Medium | Explicitly tracked as a pre-rollout blocker in this document's deferred-items table |
| **SOS Stage 2 over-triggers on a user who is simply on vacation** | Medium | Low | Deterministic, conservative thresholds (`SOS_ESCALATION_GRACE_DAYS = 2`, inactivity requires both no login AND no tracked activity); user-configurable `sos_inactivity_days` |
| **Analytics Engine LLM cost/latency spikes under heavy ad-hoc query volume** | Medium | Medium | Circuit breaker (`llmCircuitBreaker`) + deterministic fallback ensures the feature degrades gracefully rather than failing or stalling |
| **Grace-period sweep misses a violation due to job downtime** | Medium | Low | Sweep is a stateless query re-run every cycle (`grace_expires_at < NOW()`), self-healing on next successful run — no state is lost by a missed cycle |
| **AG-8 pause-to-dodge exploit is used at scale** | Low-Medium | Low | Deliberately deferred (documented above) after weighing against legitimate sick-day pause harm; monitor pause-immediately-before-violation pattern if abuse signal emerges |

---

## ROADMAP & FUTURE ENHANCEMENTS

### Completed This Epic (F16.1-F16.7, F16.9)
All Critical/Risk-Ethics/Architectural remediation from the 2026-06-10 audit, plus the net-new Analytics Engine.

### Immediate Follow-Up (pre-F16.8 rollout)
- Update `ContractStatus` shared TypeScript union to include `pending_witnesses`, `pending_verification`, `witness_rejected`
- Define a gradual `ENABLE_WITNESS_VERIFICATION` rollout plan (cohort flag, monitoring plan for false-rejection rate)
- Fix `getLifestyleBalanceRadar` artifact to set `engine: 'echarts'` for rendering consistency (currently Recharts fallback)

### Post-MVP v1.1 (+3 months)
- Email delivery channel for accountability notifications (E-12, currently push + in-app only)
- Rework `metric-resolver.service.ts` evaluation windows from UTC-rolling to user-local calendar-day boundaries (closes the remaining intra-window sliver)
- Revisit AG-8 (deferred-pause) if abuse monitoring surfaces real exploitation

### Post-MVP v1.2 (+6 months)
- §9 Advanced Agentic Enhancements from the original audit (forward roadmap, not remediation): conversational contract negotiation, pre-lapse behavioral-risk forecasting, dynamic contract evolution, multi-agent accountability council, social accountability pods, reputation/identity layer, real donation-payment stakes
- Analytics Engine: forecasting/anomaly-detection chart types already scaffolded in `OutputFormatter`, extend coach-tool exposure to surface them directly

---

## DOCUMENT GOVERNANCE

**Review Schedule:** Before F16.8 (Witness Verification) production flag enablement; after any regression touching evaluator, consent, or notification code paths.
**Update Triggers:** Witness rollout decision, email-channel prioritization, any reopening of a remediated audit finding.
**Version Control:** All feature changes require version increment with rationale.
**Ownership:** Product Team + Backend/Trust & Safety + AI/Coaching Team (for F16.6/F16.9 coach-tool surface).
**Source Audit:** `docs/2026-06-10-commitment-contract-system-audit.md` (remediation status embedded inline, dated 2026-06-14; superseded on the SOS-scheduler-registration point by commit `c7319a8b`, confirmed shipped as of this document's writing).

---

## APPENDIX A: AUDIT FINDING → FEATURE CROSS-REFERENCE

| Audit Finding | Title | Resolved By |
|---|---|---|
| C-1 | Evaluators silently pass regardless of behavior | F16.2 |
| C-2 | Enforcement reads near-empty `activity_events`, not canonical `workout_logs` | F16.2 |
| C-3 | No per-day dedup — repeat violations/penalties every 2h | F16.2 |
| C-4 | Missing data scored as failure or masked as pass | F16.3 |
| C-5 | AI coach has zero contract awareness | F16.6 |
| C-6 | Commitment tracker gaslighting via unfollowed-up scripted escalation | F16.6 |
| C-7 | Social consequences structurally impossible (consent defaults off, ID-space bug) | F16.4, F16.1 |
| C-8 | Grace-period penalties never execute; false "penalty applied" messaging | F16.7 |
| R-1 | Vulnerable-user harm vectors (training through fatigue, etc.) | F16.3 (`low_recovery_rest` guardrail) |
| R-2 | Coach scripted to gaslight, violating its own stated ethic | F16.6 |
| R-3 | SOS safety net can never fire | F16.5 |
| R-4 | Weak informed consent at signing | F16.1 (contract owner UX, out of this doc's backend-primary scope) |
| R-5 | No functioning dispute recourse | F16.7 |
| R-6 | Recipients of alerts never consented | F16.4 |
| R-7 | False audit records (penalties/notifications claimed but not real) | F16.7 |
| Arch-1 | Three divergent DDL sources for contract tables | Declined (cosmetic, boot-resilience tradeoff) |
| Arch-2 | Three disconnected commitment layers | F16.6 |
| Arch-3 | No shared objective-first metric-resolution module | F16.2 |
| Arch-4 | Lifecycle state machine incomplete (dead ends, orphans) | F16.1 |
| Arch-5 | Dead schema fields never used at runtime | F16.1, F16.6 (`ai_intervened`/`ai_intervention_message` now written) |

---

*Balencia Platform - E16: Accountability Contract Hardening, Witness Verification & Analytics Engine PRD v1.0*
*"A commitment feature that fabricates its own enforcement is worse than no commitment feature at all."*
*THE TRUST-CRITICAL HARDENING PASS — Full Remediation of the 2026-06-10 Commitment-Contract System Audit*

---

*Document Classification: INTERNAL USE - Product Foundation (Trust & Safety)*
*Created: 2026-07-08 | Epic Specification — Retrospective/Remediation PRD*
*Total Features: 9 | 8 Core (Shipped), 1 Post-MVP (Flag-Gated OFF)*
