---
type: story
id: S16.6.3
title: First-Slip Supportive Intervention (ai_intervene_first)
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.6
feature_name: Coach Contract Awareness
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.6.3: First-Slip Supportive Intervention (ai_intervene_first)

## User Story

**As a** user on my very first slip on a contract,
**I want to** hear supportively from SIA in the coach chat before any penalty or enforcer notification fires,
**So that** escalation is earned by a pattern, not triggered by a single bad day.

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

**Remediates:** Arch-5 (dead schema fields never used at runtime — `ai_intervened`/`ai_intervention_message` now written)

**Problem (pre-remediation):** The `ai_intervened` and `ai_intervention_message` schema fields existed on the violation table but were never written at runtime — dead schema with no behavior behind it. Every violation, including a user's first ever slip, went straight to the standard punitive notice + enforcer notification path.

**What shipped:** the `ai_intervene_first` pattern, a first-slip detector in `accountability-contract.service.ts` (lines ~970-1038): when `violation_count === 1` on a contract (the user's very first slip), the violation is flagged `firstSlip` and routed through a supportive `contractViolationNotice()` message rather than the standard punitive one.

- The violation row is updated with `ai_intervened=true, ai_intervention_message=...` — activating the previously-dead schema fields.
- The message is delivered **through the coach chat itself** via `proactiveMessagingService.sendProactiveMessage(userId, notice.message, 'contract_breach')`, not merely as a bell/push notification — the design intent is explicit: "Speak the supportive reach-out in the AI-coach chat — not just a bell toast."
- Only repeat violations (2nd+) escalate to the standard punitive-notice + enforcer-notification path (S16.4.1).
- Complementary to grace periods (S16.7.1): a first slip gets both a supportive message AND, if configured, a grace window before any penalty.

---

## Acceptance Criteria

```gherkin
Scenario: First slip routes to supportive intervention
  Given a contract's violation_count becomes 1 for the first time
  When recordViolation processes this violation
  Then contractViolationNotice is generated with firstSlip: true
  And ai_intervened is set to true on the violation row
  And ai_intervention_message is persisted with the supportive text

Scenario: First-slip message is delivered in the coach chat, not just a push notification
  Given a first-slip violation has just been recorded
  When the intervention fires
  Then proactiveMessagingService.sendProactiveMessage delivers the message into the coach chat thread
  And no enforcer notification is sent for this first slip
  And no penalty is executed at this point (grace applies per S16.7.1)

Scenario: Second violation escalates to standard punitive path
  Given a contract's violation_count reaches 2 or more
  When recordViolation processes this violation
  Then the standard punitive notice fires
  And notifyEnforcers is invoked per the enforcer handshake (S16.4.1)
  And executePenalty/grace sweep applies per S16.7.1

Scenario: First-slip message delivery failure does not block the violation record
  Given sendProactiveMessage throws a delivery error
  When the first-slip intervention attempts to send
  Then the error is logged
  And the underlying violation record and lifecycle transition are unaffected
```

---

## Success Metrics

- First violations that trigger a supportive coach message before any penalty/enforcer notification: 100% (`firstSlip` branch coverage in violation-recording tests)
- `ai_intervened` / `ai_intervention_message` fields populated on first-slip violation rows: 100% (down from 0% dead-schema pre-fix)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Intervention message delivery does not block violation-record persistence | First-slip message never routes to a third party — user-only | Supportive message tone reviewed to avoid stigmatizing language | Delivered through the same accessible coach-chat channel as normal conversation | `ai_intervened`/`ai_intervention_message` are pre-existing schema columns, no migration required |

---

## Dependencies

- **Prerequisite Stories:** S16.2.1/S16.2.2 (violation_count must be trustworthy for first-slip detection to be meaningful), S16.6.1 (contract-aware tool layer)
- **Related Stories:** S16.4.1 (second+ violations escalate into the enforcer handshake), S16.7.1 (grace periods complement first-slip support)
- **External Dependencies:** Epic 11 (SIA Cognitive OS) `proactiveMessagingService`
- **Remediates:** Arch-5 (first-slip half; the second half of Arch-5 is closed by S16.1.1)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| First-slip supportive message fails to send (delivery error) | `sendProactiveMessage` error | Logged, does not block the underlying violation record or lifecycle transition | Violation still correctly recorded; message retried on next delivery cycle |
| User's very first violation ever occurs on a contract with no grace period configured | `violation_count === 1` check independent of grace config | Supportive message still fires; grace window absence only affects penalty timing, not the intervention itself | User receives the supportive message regardless of grace configuration |
| Contract already has `ai_intervene_first` disabled at the consent-settings level | `ConsentSettings.ai_intervene_first` check | Falls through directly to standard punitive path even on first slip, honoring the user's own preference | Standard violation notice sent instead |

---

## Open Questions

None — first-slip detection logic and delivery channel are fully specified and tested.

---

## Definition of Done

- [x] First violation on any contract (`violation_count === 1`) routes to a supportive coach-chat message before enforcer notification or penalty execution
- [x] Second and later violations on the same contract escalate to the standard punitive notice + enforcer path
- [x] `ai_intervened` / `ai_intervention_message` fields are actually written on the violation row
- [x] Message delivered through `proactiveMessagingService.sendProactiveMessage` into the coach chat thread, not just a push toast
- [x] Delivery failure does not block violation recording or lifecycle transition
- [x] `firstSlip` branch coverage in violation-recording tests passing
- [x] User Acceptance Testing: simulated first-slip scenario confirms supportive message arrives before any enforcer notification or penalty

---

*Story S16.6.3 | Epic E16 | Product: Balencia Platform*
