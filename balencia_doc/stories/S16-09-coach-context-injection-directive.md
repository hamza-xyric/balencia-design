---
type: story
id: S16.6.2
title: Live Coaching Context Injection & Anti-Gaslighting Directive
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.6
feature_name: Coach Contract Awareness
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.6.2: Live Coaching Context Injection & Anti-Gaslighting Directive

## User Story

**As a** user with a contract that is currently at risk or in breach,
**I want to** SIA to be honestly aware of that in every conversation, never congratulating me or glossing over it,
**So that** the coach's tone matches reality instead of contradicting a commitment it should know I'm breaking.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Remediates:** C-6 (commitment tracker gaslighting via unfollowed-up scripted escalation), R-2 (coach scripted to gaslight, violating its own stated ethic)

**Problem (pre-remediation):** A separate commitment-tracking path (`commitment-tracker.service.ts`) was scripted to deliver escalating "tough love" messaging about commitments the coach had no way of verifying were actually broken — described in the audit as active gaslighting, since the underlying evaluators were frequently wrong (pre-F16.2/F16.3 fix). SIA could also congratulate a user on unrelated wins while ignoring an active contract breach, since it had no visibility into contract state at all.

**What shipped:** context injection in `server/src/services/comprehensive-user-context.service.ts` (lines ~3355-3366) that injects an `ACCOUNTABILITY CONTRACTS` section whenever the user has any contracts, listing title/condition/status/violation count per contract, at **priority 70** ("core coaching data" tier — never dropped ahead of gamification/competition content when the context window is trimmed).

- The injected directive is explicit: "The coach must not congratulate or coach around a commitment the user is currently breaching (audit C-5)."
- When any contract is `at_risk` or `violated`, an additional directive is appended: "Coaching directive: a contract is at risk or in breach. Do NOT congratulate the user around it or gloss over it; acknowledge the commitment honestly..."
- Priority-70 placement means this section survives context-window trimming ahead of lower-priority gamification/competition sections, even in long conversations.
- Note: a separate, unrelated file, `server/src/services/intelligence/accountability-prompt-controller.service.ts`, exists for adaptive-planning "blocker-oriented" recovery coaching on stalled goals — it does not perform this contract-context injection (which lives entirely in `comprehensive-user-context.service.ts`); the two are distinct and should not be confused when extending either.

---

## Acceptance Criteria

```gherkin
Scenario: Contract section injected whenever any contract exists
  Given a user has at least one contract in any status
  When comprehensive-user-context.service assembles the coaching context
  Then an ACCOUNTABILITY CONTRACTS section is injected listing title/condition/status/violation count

Scenario: Anti-gaslighting directive present on at-risk/violated contracts
  Given a user has a contract in status at_risk or violated
  When the coaching context is assembled
  Then a directive is appended instructing the coach not to congratulate or gloss over the breach

Scenario: Context section survives trimming under token pressure
  Given a long conversation causing context-window trimming
  When lower-priority gamification/competition sections are dropped
  Then the ACCOUNTABILITY CONTRACTS section (priority 70) remains present

Scenario: Coach does not congratulate around an active breach
  Given a violated-contract fixture in a test conversation
  When SIA generates a response to an unrelated positive event (e.g. a workout streak)
  Then the response does not congratulate or gloss over the active contract breach
```

---

## Success Metrics

- Coach responses that congratulate/gloss over an active `violated`/`at_risk` contract: 0 (prompt-injection regression test with a violated-contract fixture)
- Context sections dropped ahead of the `ACCOUNTABILITY CONTRACTS` section under trimming: 0 for priority ≤70 content being retained incorrectly ahead of it

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Context assembly adds negligible latency to a coaching turn | Contract details injected only for the authenticated user's own contracts | Injected text contains no third-party (enforcer) personal data beyond what the owner already sees | N/A (backend/prompt layer) | Additive context section; does not restructure the existing priority-scored assembly pipeline |

---

## Dependencies

- **Prerequisite Stories:** S16.6.1 (tool layer this context injection complements), S16.1.1 (lifecycle state read for at_risk/violated detection)
- **Related Stories:** S16.3.1 (SIA's context reads `insufficientData` history so it never coaches around a data gap disguised as a violation)
- **External Dependencies:** Epic 11 (SIA Cognitive OS) `comprehensive-user-context.service.ts` priority-scored context-assembly pipeline
- **Remediates:** C-6, R-2

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Context window trimming under token pressure | Priority-scored context assembly | `ACCOUNTABILITY CONTRACTS` section (priority 70) survives ahead of lower-priority gamification/competition sections | Coach remains contract-aware even in long conversations |
| User has a contract with `insufficientData` history mixed with real violations | Section reads full check/violation history | Directive distinguishes genuine breaches from data-gap days, does not gaslight around a data gap | Coach acknowledges only genuine breaches honestly |
| `accountability-prompt-controller.service.ts` extended without realizing it's a separate subsystem | Code review / documentation note | This story's injection lives solely in `comprehensive-user-context.service.ts`; the prompt-controller handles stalled-goal recovery coaching, a distinct concern | N/A — documentation guard for future engineers |

---

## Open Questions

None — the priority-70 placement and directive wording are finalized and tested.

---

## Definition of Done

- [x] `ACCOUNTABILITY CONTRACTS` context section injected whenever the user has any contract, at core-tier priority (70)
- [x] Explicit "do not congratulate around a breach" directive present whenever any contract is `at_risk`/`violated`
- [x] Section survives context-window trimming ahead of lower-priority sections
- [x] Prompt-injection regression test with a violated-contract fixture passing
- [x] `commitment-tracker.service.ts` scripted escalation no longer fires ungrounded "tough love" messaging (superseded by evaluator-grounded context)
- [x] No dead code, no console logs

---

*Story S16.6.2 | Epic E16 | Product: Balencia Platform*
