---
type: story
id: S13.7.2
title: Bot/Sybil Trust Scoring
epic: E13
epic_name: Social Growth OS
feature: F13.7
feature_name: Trust & Safety
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S13.7.2: Bot/Sybil Trust Scoring

## User Story

**As a** Holistic Health Seeker joining a pod of strangers,
**I want** the platform to actively filter out bots and fake accounts from matching, pods, mentors, and leaderboards,
**So that** the people I'm matched with are real, without any AI layer having the unchecked power to auto-block a real account.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [x] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

Two layers, admin-review-only by construction:

**Deterministic base** (`bot-signal.service.ts`): 5 weighted signals — `reports 0.3, velocity 0.25, emptyShell 0.2, email 0.15, age 0.1` — blended into `bot_risk_score`, thresholded `FLAG_AT=0.5`, `BLOCK_AT=0.8` → `status IN (ok|flagged|blocked)` on `user_trust_signals`. Migration comment: *"Conservative by design — only the 'blocked' status gates social surfaces; 'flagged' is a review signal, not a punishment."*

**ML overlay** (`trust-model.service.ts`, flag `ENABLE_TRUST_ML`, default off): trained only on `manual_override=true` **admin-blocked** accounts as the positive label (`trust_training_samples`). Serving path, verified in `bot-signal.service.ts`:
```ts
if (ENABLE_TRUST_ML && status === 'ok') {
  p = trustModelService.predict(signals)
  if (p !== null && p >= 0.6) status = 'flagged'   // never 'blocked'
}
```
This only ever moves `ok → flagged`; there is no code path from the ML model to `blocked`.

**Admin review surface:** `GET /moderation/trust-flags`, `PATCH /moderation/trust-flags/:userId` (human sets `blocked`), `POST /moderation/trust-flags/recompute`, plus `POST /moderation/trust-model/{build,train}` and `GET /moderation/trust-model`.

**Trust evaluation process (high-level):**
```
On-Demand / Nightly Sweep (trust-sweep.job.ts):

1. Compute Deterministic Signals (each normalized 0-1):
   reports_signal, velocity_signal, empty_shell_signal, email_signal, age_signal

2. Blend:
   bot_risk_score = reports*0.3 + velocity*0.25 + emptyShell*0.2 + email*0.15 + age*0.1

3. Threshold:
   status = bot_risk_score >= 0.8 ? 'blocked'
          : bot_risk_score >= 0.5 ? 'flagged'
          : 'ok'

4. IF ENABLE_TRUST_ML AND status == 'ok':
     p = trustModelService.predict(signals)
     IF p >= 0.6: status = 'flagged'   // ceiling: can only add scrutiny, never block

5. UPSERT user_trust_signals (unless manual_override = true, which is sticky)

6. Downstream Effects (status = 'blocked' only):
   - Excluded from all leaderboard rankings (S13.6.1)
   - Excluded from buddy/pod matching candidate pools (S13.1.1, S13.6.1)
   - Excluded from mentor discovery (S13.5.2)
   - Excluded from outbound follow suggestions

7. status = 'flagged' Effects:
   - Surfaces in /admin/trust review queue only
   - No functional restriction on the account itself (review signal, not punishment)
```

---

## Acceptance Criteria

```gherkin
Scenario: Deterministic blend and thresholds
  Given a user's 5 weighted signals blend to bot_risk_score >= 0.8
  When the trust sweep runs
  Then user_trust_signals.status is set to 'blocked'

Scenario: Flagged status is a review signal, not a punishment
  Given a user's bot_risk_score is between 0.5 and 0.8
  When status is set to 'flagged'
  Then no functional restriction is applied to the account
  And the user surfaces only in /admin/trust review queue

Scenario: ML overlay can only raise ok to flagged
  Given ENABLE_TRUST_ML is true and a user's deterministic status is 'ok'
  When trustModelService.predict() returns p >= 0.6
  Then status becomes 'flagged'
  And a dedicated test asserts no code path exists from the ML prediction to 'blocked'

Scenario: Only admin-confirmed blocks train the model
  Given the trust_training_samples table
  Then only accounts with manual_override=true (admin-blocked) are used as positive labels
  So there is no self-reinforcing loop from unreviewed automated flags

Scenario: Manual override is sticky
  Given an admin has set manual_override=true on a user's trust signal
  When the nightly sweep recomputes deterministic signals
  Then the manual_override status is NOT overwritten by the recompute

Scenario: Trust model unavailable during predict()
  Given trustModelService.predict() throws or is unavailable
  Then p is treated as null
  And the deterministic status stands unchanged, no user-facing impact

Scenario: Blocked users excluded downstream
  Given a user's status is 'blocked'
  Then they are excluded from leaderboards, matching/pod candidate pools, mentor discovery, and outbound follow suggestions
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| False-block rate (trust scorer) | 0 auto-blocks ever originate from the ML layer | Code-level invariant, verified by test |
| Bot-account leaderboard leakage | 0 blocked accounts visible in any ranking surface | Shared with S13.6.1 integrity check |
| Trust sweep throughput | Nightly sweep of 1,000 users/batch completes within nightly window | Job instrumentation |

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Nightly trust sweep, 1,000 users/batch, advisory-locked single-instance | Trust ML overlay is architecturally incapable of setting `status='blocked'` — verified by dedicated test | Trust signals visible only to admins, never to the flagged user or other users | Admin trust panel meets standard a11y bar | N/A |
| | `manual_override=true` accounts are the only positive training label | | | |

---

## Dependencies

- **Prerequisite Stories:** None (foundational trust substrate)
- **Related Stories:** S13.1.1 (candidate pool exclusion), S13.6.1 (leaderboard exclusion), S13.5.2 (mentor discovery exclusion)
- **External Dependencies:** `trust-sweep.job.ts`, admin dashboard infrastructure (`/admin/trust`)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|---------------------|
| Trust model unavailable/errors during predict() | Exception in `trustModelService.predict()` | `p = null`, deterministic status stands unchanged | No user-facing impact |
| Legitimate new user has thin signal history (looks bot-like early on) | `age_signal` weighted only 0.1 — low weight specifically to avoid over-penalizing new accounts | Score stays below FLAG_AT in typical cases; if flagged, it's review-only with no functional restriction | No user-facing impact unless independently blocked by an admin after review |
| Admin overrides a false-positive block | `PATCH /moderation/trust-flags/:userId` sets status back to 'ok' with `manual_override=true` | Override is sticky — future sweeps do not re-flag automatically | User regains full access to social surfaces |
| Trust ML overlay code modified in a future change to add a blocked path | Architectural test asserting the only writers to `status='blocked'` are the deterministic threshold and admin `setStatus()` | CI failure blocks merge | N/A — caught before ship |

---

## Open Questions

- None outstanding for the deterministic base scorer — fully shipped and always-on (no flag).
- **Rollout Status:** `ENABLE_TRUST_ML` defaults `false`. The ML overlay is architecturally incapable of auto-blocking regardless of flag state (ceiling is `ok → flagged` only), so enabling it carries no safety risk — the flag exists to gather flagging-accuracy data before broader trust in its output, per the PRD's staged-rollout rationale.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Dedicated architectural test asserting only 2 write paths to `status='blocked'` exist (deterministic threshold, admin `setStatus()`)
- [x] ML overlay ceiling (`ok → flagged` only) verified by test
- [x] `manual_override` stickiness verified against nightly recompute
- [x] Training-data isolation (`manual_override=true` only) verified
- [x] Unit + integration tests green (server suite)

---

*Story S13.7.2 | Epic E13 | Product: Balencia Platform*
