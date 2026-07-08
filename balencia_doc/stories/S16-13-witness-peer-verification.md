---
type: story
id: S16.8.1
title: Witness / Peer-Verification
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.8
feature_name: Witness / Peer-Verification (Flag-Gated, OFF)
product: yhealth-platform
priority: P1
status: Done (Flag-Gated OFF)
created: 2026-07-08
---

# S16.8.1: Witness / Peer-Verification

## User Story

**As a** user whose contract doesn't rely on wearable-verifiable data (e.g. a subjective or self-reported goal),
**I want to** invite a trusted witness who can independently confirm whether I actually did what I committed to,
**So that** completion isn't purely self-attested when the stakes matter to me.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1) — Post-MVP, flag-gated OFF pending rollout planning

---

## Scope Description

**Remediates:** AG-6 (witness quorum / rejection routing to the existing penalty path — new-feature design, not a remediation of a pre-existing finding)

**Context:** shipped 2026-07-07 — one day before the epic's documentation close — deliberately flag-gated OFF. Sequencing is intentional: witness verification was built and merged only after F16.1-F16.7 (S16.1.1-S16.7.2) had proven the underlying contract system stable, since witness verdicts plug directly into the same `executePenalty`/violation machinery those fixes hardened.

**What shipped:**
- Schema — `server/src/database/tables/140-contract-witnesses.sql` (also `migrations/20260707120000_contract_witnesses.sql`):
```sql
-- contract_witnesses
id, contract_id (FK -> accountability_contracts), witness_user_id (FK -> users),
status ENUM('invited','accepted','declined') DEFAULT 'invited',
source ENUM('contact','buddy'), invited_at, responded_at, reminded_at,
UNIQUE(contract_id, witness_user_id)

-- contract_witness_verdicts
id, contract_id, witness_user_id,
verdict ENUM('confirmed','rejected'), note, evidence JSONB,
UNIQUE(contract_id, witness_user_id)
```
- Service — `server/src/services/contract-witness.service.ts` (`contractWitnessService`). A witness is a trusted accountability contact or buddy who (1) accepts an invitation handshake — reusing the same accept-before-participate pattern as S16.4.1 — and (2) at `end_date`, **only if the contract did not end cleanly**, confirms or rejects that the owner actually completed it.
- Quorum is strict: **all** accepted witnesses must confirm for verified completion; a single `rejected` verdict forces the contract's configured penalty via `accountabilityContractService.applyWitnessRejection`, which reuses the existing violation/`executePenalty` path from S16.7.1 rather than duplicating penalty logic.
- `WITNESS_VERDICT_TIMEOUT_DAYS = 3` auto-closes to `completed` with no penalty if verdicts never arrive — a deliberate "innocent until proven" default that avoids indefinitely stalling a contract on an unresponsive witness.
- `MAX_WITNESSES = 5` per contract.
- Extended lifecycle states (service-query level only, not yet in the shared `ContractStatus` union — see S16.1.1's Open Questions): `pending_witnesses` → `active` → `pending_verification` → `completed` / `witness_rejected`.
- Feature flag `ENABLE_WITNESS_VERIFICATION` (`server/src/config/env.config.ts:317`), default **OFF** — not set in `.env.example`. Config comment: "OFF by default — when off, contracts behave exactly as before (no witness requirement, auto-completion at end_date)."
- Client surface: premium-modal rebuild of `WitnessVerdictModal.tsx` and related accountability-tab components, gated behind the same flag.

---

## Acceptance Criteria

```gherkin
Scenario: Witnesses never invoked on a clean finish
  Given a contract with witnesses accepted and violation_count === 0 at end_date
  When the contract reaches end_date
  Then witnesses are never asked to verify anything
  And standard clean-completion path runs

Scenario: Unanimous confirmation completes the contract
  Given a contract reaches a non-clean end_date and all witnesses have accepted
  When all accepted witnesses submit a "confirmed" verdict
  Then the contract transitions to completed

Scenario: A single rejection forces the existing penalty path
  Given a non-clean contract in pending_verification with multiple witnesses
  When at least one witness submits a "rejected" verdict
  Then the contract transitions to witness_rejected
  And applyWitnessRejection routes through the existing executePenalty path, not a duplicated one

Scenario: Verdict timeout defaults to completion, not penalty
  Given a contract in pending_verification for WITNESS_VERDICT_TIMEOUT_DAYS with incomplete verdicts
  When the timeout elapses
  Then the contract auto-completes with no penalty

Scenario: Feature is fully inert when the flag is off
  Given ENABLE_WITNESS_VERIFICATION is unset or false
  When any contract reaches end_date or is created with witnesses requested
  Then contracts behave exactly as they did before F16.8 shipped — no witness requirement, auto-completion at end_date

Scenario: Witness cap enforced
  Given a contract already has 5 invited witnesses
  When a 6th witness invitation is attempted
  Then the request is rejected server-side
```

---

## Success Metrics (post-enablement targets, not yet live)

- Witness verdicts on contracts that ended clean: 0 (witnesses should never be invoked)
- Contracts stuck in `pending_witnesses`/`pending_verification` past timeout: 0
- Witness rejections that bypass `executePenalty`: 0
- Witnesses per contract: ≤ 5 (hard cap)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Verdict collection window bounded at 3 days, auto-resolved | Witness invitation reuses the accept-before-participate handshake pattern (S16.4.1) — no unaccepted witness can submit a verdict | Witness sees only the completion question, not the owner's full contract detail | Client modal (`WitnessVerdictModal.tsx`) built to the same claymorphism/accessibility standard as other premium modals | Fully inert when `ENABLE_WITNESS_VERIFICATION` is false — zero behavior change to existing contracts |

---

## Dependencies

- **Prerequisite Stories:** S16.1.1 (lifecycle state machine extended by this feature), S16.4.1 (witness handshake reuses this pattern), S16.7.1 (witness rejection reuses `executePenalty`)
- **Related Stories:** Epic 13 (Social Growth OS) — `source: 'buddy'` witnesses draw from the same buddy-matching pool
- **External Dependencies:** `ENABLE_WITNESS_VERIFICATION` flag (off by default)
- **Remediates:** AG-6 (new-feature design point, not a pre-existing audit finding remediation)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| Witness never responds to invitation | `status` stays `invited` past a reasonable window | Contract remains `pending_witnesses`; owner can remove/replace the unresponsive witness | "Waiting on {witness} to accept" |
| All witnesses accept, contract later ends clean | `violation_count = 0` at `end_date` | Witnesses never invoked; standard completion path (S16.1.1/S16.7.2) runs | No witness-related message at all |
| One witness rejects, others confirm | Quorum check fails (not unanimous) | `applyWitnessRejection` triggers, existing penalty executes | Owner notified penalty applied due to witness rejection |
| No witness responds to a verification request within 3 days | Timeout sweep | Auto-completes with no penalty | "Verification window closed — contract marked complete" |

---

## Open Questions

1. **Rollout plan not yet defined:** production enablement and gradual `ENABLE_WITNESS_VERIFICATION` flag rollout strategy (cohort flag, monitoring plan for false-rejection rate) are explicitly deferred, not built.
2. **`ContractStatus` shared TypeScript union** does not yet include `pending_witnesses` | `pending_verification` | `witness_rejected` — tracked as a pre-rollout blocker, not a runtime risk today (DB column is free-text/enum, not TS-checked at the query boundary).
3. **Premium client UI** (`WitnessVerdictModal.tsx` and related accountability-tab components) is in-progress on branch `feature/witness-verification-premium-rebuild` / `feature/premium-modals-friend-picker` and not yet merged to main.

---

## Definition of Done

- [x] Schema, service, controller endpoints (`POST/GET /contracts/:id/witnesses`, `POST /contracts/:id/witnesses/respond`, `POST /contracts/:id/witnesses/verdict`) shipped and tested
- [x] Witnesses only activate on non-clean contract completion — never invoked on a clean finish
- [x] Quorum requires unanimous `confirmed` verdicts; a single `rejected` forces the existing penalty path
- [x] 3-day verdict timeout defaults to completion, not penalty (innocent-until-proven default)
- [x] `MAX_WITNESSES = 5` enforced server-side
- [x] Feature fully inert when `ENABLE_WITNESS_VERIFICATION` is unset/false
- [ ] Production enablement / gradual flag rollout strategy (deferred to rollout planning)
- [ ] `ContractStatus` shared-type union updated to include the three new states (deferred pre-rollout blocker)
- [ ] Premium client UI finalized and merged to main (in-progress on a separate branch)

---

*Story S16.8.1 | Epic E16 | Product: Balencia Platform*
