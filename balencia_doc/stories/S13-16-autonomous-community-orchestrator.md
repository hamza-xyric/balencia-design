---
type: story
id: S13.8.1
title: Autonomous Community Orchestrator
epic: E13
epic_name: Social Growth OS
feature: F13.8
feature_name: Autonomous Community Orchestrator
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S13.8.1: Autonomous Community Orchestrator

## User Story

**As a** Product/Community Operations stakeholder,
**I want** the platform's daily pod-health cycle to make smarter, context-aware decisions about which at-risk pods most need intervention right now,
**So that** community health scales without either manual triage or unbounded AI autonomy — the LLM can never take an irreversible or unscoped action.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

A schema-bounded, flag-gated LLM layer sitting on top of the deterministic community-health engine (S13.1.3/S13.5.1's `community-intelligence.service.ts`). It introduces no new capability — it only decides, per daily cycle, *which* at-risk pods to remediate, whether to archive collapsed pods, and whether to promote eligible mentors, dispatching exclusively into three pre-existing, already-safe primitives.

**Two independent, composable flags** (not nested — confirmed in code):
- `ENABLE_COMMUNITY_AGENT` — gates the lower-level single action inside `community-intelligence.service.ts:generateAnchorGuidance()` (private method): `if (process.env['ENABLE_COMMUNITY_AGENT'] !== 'true') return fallback;`. Only changes wording of a notification sent to a pod's anchor.
- `ENABLE_COMMUNITY_ORCHESTRATOR` — gates the higher-level sequencing layer, checked in `group-health.job.ts`. Both default `false`. Either can be on independently; both can be on simultaneously.

**"Schema-bounded" plan validation** (`community-orchestrator.service.ts:parseAndValidate()`):
- LLM asked for JSON; markdown fences stripped, first `{...}` blob extracted, `JSON.parse`d, then manually coerced to a fixed 4-key shape: `{ remediateGroupIds: string[], archiveCollapsed: boolean, promoteMentors: boolean, reasoning: string }`
- `remediateGroupIds` filtered against a pre-computed `Set` of actually-at-risk pod IDs — hallucinated/arbitrary IDs are silently dropped, never executed
- Hard cap: `MAX_REMEDIATE = 30` per run
- Boolean coercion is strict `=== true` only
- `reasoning` truncated to 300 characters (logged, not shown to end users)

**Guardrails:**
- **Allowlist-only dispatch** (`executePlan()`): can only call `remediateGroup()`, `archiveCollapsedPods()`, `promoteEligibleMentors()` — no generic tool-call mechanism exists, no capability to delete users, ban accounts, or broadcast free text
- **Volume cap:** 30 remediations/run, plus the job itself runs at most once daily
- **Shared circuit breaker:** `llm-circuit-breaker.service.ts` (CLOSED/OPEN/HALF_OPEN with cooldown/backoff, shared across all LLM calls platform-wide)
- **Fail-safe fallback everywhere:** any parse failure, LLM error, or breaker-block routes `orchestrate()` to `runDeterministic()` — byte-identical to the always-on fixed sequence
- **No human-approval gate:** unlike the trust ML model (S13.7.2), which can only ever *flag* for human review, this feature *does* execute automatically once its flag is on — its safety model is scope/allowlist-based (bounded action set), not approval-gated
- **Logging, not a dedicated audit table:** every executed plan and fallback is logged via the standard application logger — flagged as a known gap, not a blocker

**Orchestration process (high-level):**
```
Daily Group Health Job (group-health.job.ts):

1. Deterministic Pre-Computation (always runs, both flags off or on):
   atRiskGroups = detectAtRiskPods()
   collapsedGroups = detectCollapsedPods()
   emergingMentors = identifyEmergingMentors()

2. IF ENABLE_COMMUNITY_ORCHESTRATOR:
   IF llmCircuitBreaker.isCallAllowed():
     rawPlan = planWithLLM({ atRiskGroups, collapsedGroups, emergingMentors })
     plan = parseAndValidate(rawPlan, atRiskIds=Set(atRiskGroups.map(id)))
     IF plan is valid:
       executePlan(plan)   // ONLY remediateGroup/archiveCollapsedPods/promoteEligibleMentors
       log('Executed LLM plan', plan.reasoning)
       RETURN
   // any failure above falls through to:
   runDeterministic()
   log('Ran deterministic sequence (fallback)')
ELSE:
   runDeterministic()

3. runDeterministic():
   FOR EACH pod IN atRiskGroups: remediateGroup(pod.id)
   IF collapsedGroups.length > 0: archiveCollapsedPods(collapsedGroups)
   IF emergingMentors.length > 0: promoteEligibleMentors()

4. remediateGroup(groupId) [same primitive, either path]:
   anchor = getAnchor(groupId)
   IF ENABLE_COMMUNITY_AGENT AND llmCircuitBreaker.isCallAllowed():
     text = generateAnchorGuidance(groupId, metrics)  // 20-600 char validated
   ELSE:
     text = staticFallbackGuidance(groupId)
   notify(anchor.userId, text)   // anchor-only, never a broadcast
```

---

## Acceptance Criteria

```gherkin
Scenario: Fabricated group ID is dropped
  Given the LLM plan returns a group ID not in the pre-computed at-risk Set
  When parseAndValidate() runs
  Then that ID is silently dropped from remediateGroupIds
  And the rest of the plan proceeds unaffected

Scenario: Remediation volume cap enforced
  Given the LLM proposes more than 30 valid at-risk group IDs
  Then remediateGroupIds is capped at MAX_REMEDIATE (30)
  And the remainder are not queued for next run — they wait for the next cycle's own computation

Scenario: Boolean fields require strict true
  Given the LLM plan returns archiveCollapsed: "yes" (a truthy string, not boolean true)
  When parseAndValidate() coerces booleans
  Then archiveCollapsed is treated as false

Scenario: Malformed/non-JSON LLM output falls back
  Given the LLM returns non-JSON or unparseable output
  When orchestrate() processes the response
  Then runDeterministic() executes the full fixed sequence instead
  With no visible difference to end users vs. flag-off behavior

Scenario: Circuit breaker open skips the LLM call entirely
  Given llmCircuitBreaker.isCallAllowed() returns false
  When orchestrate() runs
  Then the LLM call is skipped entirely and runDeterministic() executes

Scenario: executePlan() cannot call anything outside the allowlist
  Given a valid parsed plan
  Then executePlan() can only invoke remediateGroup(), archiveCollapsedPods(), or promoteEligibleMentors()
  And no dynamic dispatch or generic tool-call mechanism exists in the code path

Scenario: Anchor guidance implausible length falls back
  Given generateAnchorGuidance() produces text shorter than 20 or longer than 600 characters
  Then the static fallback guidance string is used instead

Scenario: Flags are independently toggleable
  Given all 4 combinations of ENABLE_COMMUNITY_AGENT and ENABLE_COMMUNITY_ORCHESTRATOR (off/off, on/off, off/on, on/on)
  Then each combination is covered by a distinct test verifying correct behavior
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Plan validity rate | ≥95% of LLM outputs parse and validate without falling back | `parseAndValidate()` success/failure instrumentation |
| Fallback rate | Deterministic fallback rate stays a visible, monitored number, not silently masked | Log-based dashboard |
| Zero unsafe actions | 0 instances of an ID outside the at-risk set being remediated, ever | Automated test + production log audit |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Job runs at most once daily | Allowlist-only dispatch — no dynamic tool invocation exists in the code path | `reasoning` (up to 300 chars) is logged, never shown to end users | N/A (background job, anchor-only notification reuses existing accessible notification copy) | Requires the shared platform-wide LLM circuit breaker |
| `MAX_REMEDIATE = 30` per run | Notification is always anchor-only, never an open broadcast | | | |

---

## Dependencies

- **Prerequisite Stories:** S13.1.3 (`remediateGroup()`, `archiveCollapsedPods()` primitives), S13.5.1 (`promoteEligibleMentors()` primitive)
- **Related Stories:** S13.7.2 (contrasts intentionally with the trust ML model's stricter "never auto-act" posture — a documented design choice)
- **External Dependencies:** Shared LLM circuit breaker infrastructure (`llm-circuit-breaker.service.ts`), `group-health.job.ts` (the only caller — no other entry point exists)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| LLM returns valid JSON with a fabricated group ID | ID not in the pre-computed at-risk `Set` | ID silently dropped from `remediateGroupIds`, rest of plan proceeds | No user-facing impact — that pod simply isn't remediated this cycle |
| LLM returns malformed/non-JSON output | `JSON.parse` throws or no `{...}` blob found | `runDeterministic()` fallback, full fixed sequence executes instead | No visible difference to end users vs. flag-off behavior |
| Circuit breaker open (LLM provider degraded) | `isCallAllowed()` returns false | Skip LLM call entirely, `runDeterministic()` fallback | No visible difference |
| LLM proposes >30 remediation targets | `remediateGroupIds.length > MAX_REMEDIATE` | `.slice(0, 30)`, remainder ignored (not queued for next run) | Silent — excess targets simply wait for the next daily cycle's own at-risk computation |
| Anchor guidance text is implausible (too short/long) | Length check outside 20-600 chars | Fall back to static guidance string | Anchor sees standard, non-personalized copy instead |

---

## Open Questions

- **Rollout Status:** Both `ENABLE_COMMUNITY_AGENT` and `ENABLE_COMMUNITY_ORCHESTRATOR` default `false` in every environment. This is the highest-autonomy layer in the Epic and, per the PRD's recommended sequencing, is scheduled to flip **last**, after `ENABLE_FEED_CACHE`, `ENABLE_EMBEDDING_MATCHING`, `ENABLE_MATCH_WEIGHT_TUNING`, and `ENABLE_CHURN_NUDGES` have each validated their respective learning loops on real production data.
- **Known gap (documented, not a blocker):** no dedicated audit table exists yet for orchestrator actions — only structured application logging. Promoting this to a `community_agent_log` table (parity with the AI-coach's `tool_audit_log`) is tracked as a Post-MVP v1.1 enhancement in the PRD roadmap, not a condition of this story's completion.
- No open build questions — code for both flag states, and all 4 combinations of the two flags, is complete and tested.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Fabricated-ID filtering against the true at-risk set verified — no exceptions
- [x] `MAX_REMEDIATE` cap enforcement tested even when the LLM proposes more than 30 valid IDs
- [x] Strict boolean coercion (`=== true` only) tested against truthy-string inputs
- [x] All four fallback paths tested: circuit breaker open, LLM throw, unparseable JSON, validation failure
- [x] `executePlan()` verified to have no dynamic dispatch — only the 3 hardcoded allowlisted calls exist
- [x] All 4 flag-combination tests pass (`ENABLE_COMMUNITY_AGENT` × `ENABLE_COMMUNITY_ORCHESTRATOR`)
- [x] `generateAnchorGuidance()` length validation (20-600 chars) tested
- [x] Every orchestrated run and fallback run logged with reconstructable context
- [x] Unit + integration tests green (server suite)
- [ ] Flags flipped in production (pending staged rollout — operational, not a build task)

---

*Story S13.8.1 | Epic E13 | Product: Balencia Platform*
