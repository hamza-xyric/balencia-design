---
type: story
id: S16.5.1
title: Consent-Gated SOS Two-Stage Wellness-Check
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.5
feature_name: Consent-Gated SOS Wellness-Check
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.5.1: Consent-Gated SOS Two-Stage Wellness-Check

## User Story

**As a** user who has gone quiet for an unusual stretch of time,
**I want to** have SIA check in on me gently first, and only reach out to my emergency contact if I genuinely don't respond,
**So that** a normal quiet week never skips straight to alarming someone I care about.

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

**Remediates:** R-3 (SOS safety net can never fire)

**Problem (pre-remediation):** The "SOS safety net" advertised in the product was entirely dead code — the audit called this worse than not offering the feature at all, because a user might believe it would fire and rely on it.

**What shipped:** `server/src/jobs/sos-wellness-check.job.ts`, a two-stage, explicitly consent-gated safety-net job:

- **Stage 1 (checkin):** reach out to the user themselves ("we haven't seen you, are you OK?"). No third party is contacted at this stage — delivered through SIA's own conversational voice.
- **Stage 2 (escalate):** only if the user is still silent an escalation-grace period later, alert their SOS-consented, accepted emergency contacts. Deliberately conservative — false-alarming a person's emergency contact is treated as a real harm to avoid.
- The stage decision is a pure, deterministic function `sosStage()` (lines 39-54) — not an LLM judgment call, which matters for a safety-critical path: the same inputs always produce the same stage.
- `SOS_ESCALATION_GRACE_DAYS = 2` by default. Inactivity computed as no login **and** no tracked streak activity: `GREATEST(last_login, last_activity_date, created_at)` against `sos_inactivity_days`.
- Episode dedup handled via the existing `accountability_consent_audit` log (no new schema needed) so the same inactivity episode doesn't re-trigger Stage 1 repeatedly.
- Job runs daily (`JOB_INTERVAL_MS = 24h`) with a 15-minute startup delay and an advisory lock to prevent double-execution across worker instances. Registered in `server/src/index.ts` via `schedulerRegistry.registerJob({ name: 'sos-wellness-check', ... staggerMs: 2640_000 })`.
- `getSosCandidates()` in `accountability-consent.service.ts` supplies the query surface finding eligible users (SOS enabled, inactivity threshold crossed, at least one accepted `is_emergency_contact`).

**Note on scope vs. the original audit doc:** the 2026-06-10 audit's remediation notes described scheduler registration as still deferred pending an unrelated in-flight WhatsApp-job import cleanup in `index.ts`. That blocker has since been cleared, and the job is confirmed registered and scheduled — this item is shipped, not deferred.

---

## Acceptance Criteria

```gherkin
Scenario: SOS is opt-in and off by default
  Given a user who has never configured accountability consent
  When their SOS eligibility is checked
  Then allow_sos_alerts defaults to false and the job never considers them a candidate

Scenario: Stage 1 never contacts a third party
  Given a user crosses their configured sos_inactivity_days threshold
  When the SOS job fires Stage 1
  Then only the user themselves receives the check-in message, via SIA
  And no accountability contact or emergency contact is notified

Scenario: Stage 2 only fires after the escalation grace and continued silence
  Given Stage 1 was sent and SOS_ESCALATION_GRACE_DAYS have elapsed
  And the user remains inactive
  When the job runs
  Then Stage 2 escalates to accepted, SOS-consented emergency contacts

Scenario: User responding during grace window closes the episode quietly
  Given Stage 1 was sent
  When the user logs in or records activity before the escalation grace elapses
  Then the episode is closed with no Stage 2 escalation

Scenario: sosStage is deterministic
  Given identical inputs (daysInactive, priorStage, escalationGraceElapsed)
  When sosStage is called multiple times
  Then it always returns the same stage decision

Scenario: Job prevents double execution
  Given the SOS job is already running under its advisory lock
  When a second invocation attempts to start (retry/restart)
  Then it exits immediately without sending duplicate check-ins
```

---

## Success Metrics

- Stage 2 escalations without prior Stage 1 attempt: 0 (job logic guarantees sequential stage progression)
- Stage 2 escalations to a non-accepted or non-consented contact: 0 (`getSosCandidates()` filters on acceptance + `allow_sos_alerts`)
- Duplicate Stage 1 check-ins for the same inactivity episode: 0 (audit-log dedup check)
- Job execution reliability (daily run completes): 100% with advisory lock preventing double-run

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Completes within its 24h window, advisory-locked; low volume, safety-critical correctness over speed | Stage 2 only targets contacts with `is_emergency_contact = true`, `accepted_at IS NOT NULL`, and per-contact `allow_sos_alerts` consent | Stage 1 message delivered privately to the user only | Check-in delivered in SIA's conversational voice, same accessible channel as normal chat | Reuses `accountability_consent_audit` log — no new schema |

---

## Dependencies

- **Prerequisite Stories:** S16.4.1 (shared contact/consent infrastructure — SOS emergency contacts go through the identical accept flow)
- **Related Stories:** S16.6.2 (Stage 1 delivered through SIA's own conversational voice, consistent with "support before punishment")
- **External Dependencies:** Epic 11 (SIA Cognitive OS) — Stage 1 delivery channel; Epic 07 (Wellbeing Pillar) — architecturally distinct, SOS is inactivity-triggered not sentiment-triggered
- **Remediates:** R-3

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| User responds during the escalation grace window | Login/activity detected before Stage 2 fires | Episode closed, no escalation | None further — quiet resolution |
| No emergency contact configured/accepted when Stage 2 would fire | `getSosCandidates()` finds no eligible contact | Stage 2 skipped, logged for visibility, no crash | None sent (nothing to send) |
| Job overlaps a prior run (retry/restart) | Advisory lock held | Second invocation exits immediately | No duplicate check-ins |
| User has SOS disabled mid-episode | Consent check on each stage transition | Episode aborted, no further stages | None — respects the opt-out immediately |
| Stage 2 over-triggers on a user who is simply on vacation | Deterministic, conservative thresholds (`SOS_ESCALATION_GRACE_DAYS = 2`, inactivity requires both no login AND no tracked activity) | User-configurable `sos_inactivity_days` reduces false-positive rate | User can raise their own threshold in Deep Mode |

---

## Open Questions

None — the two-stage design and its conservatism is a deliberate, documented product decision, not an open item.

---

## Definition of Done

- [x] SOS is disabled by default; requires explicit user opt-in (`ConsentSettings.allow_sos_alerts = true`)
- [x] Stage 1 never contacts a third party — only the user themselves, via SIA
- [x] Stage 2 fires only after `SOS_ESCALATION_GRACE_DAYS` of continued silence following Stage 1
- [x] Stage 2 only targets accepted, SOS-consented emergency contacts
- [x] `sosStage()` is a pure deterministic function
- [x] Job registered in the scheduler registry, running on a real daily cadence with startup delay and advisory locking
- [x] Episode dedup prevents repeated Stage 1 messages for the same continuous inactivity window
- [x] SOS episode history visible in the accountability audit log (Deep Mode)
- [x] Integration test: inactivity trigger → Stage 1 → escalation-grace elapse → Stage 2, with dedup verified across job re-runs

---

*Story S16.5.1 | Epic E16 | Product: Balencia Platform*
