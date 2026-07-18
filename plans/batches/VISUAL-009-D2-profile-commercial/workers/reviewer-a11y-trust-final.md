# D2 final independent review packet — accessibility/trust

- Packet: `D2-REVIEW-A11Y-TRUST-FINAL`
- Status: `issued`
- Role intent: fresh non-builder Terra accessibility/trust reviewer, high effort (`W-MODEL` applies)
- Execution: read-only; no edits, builds, browsers, servers, verifier execution, git operations, evidence writes, or acceptance authority
- Output channel: agent response only; Sol independently verifies every finding

## Objective

Audit the exact current D2 candidate for WCAG 2.2 AA browser-level semantics and Balencia trust/safety behavior. Identify every Critical, High, or Medium defect that would block visual-development handoff.

## Candidate binding

Use the exact hashes in `workers/reviewer-clear-final.md`. Recompute start/end hashes for all seven product files and report any drift separately.

## Required inputs

- D2 `BATCH.md`, `VERIFICATION-MATRIX.md`, recon/builder evidence, audit, seven specs, compact canon, component catalog
- Seven current product files, relevant shared dialog/paywall/navigation primitives, and the dedicated D2 verifier
- Current D2 evidence PNGs only if the set is complete; otherwise review code plus frozen before evidence and state that runtime evidence remains pending

## Review focus

- Heading/landmark/control semantics, accessible names/descriptions, native controls, labelled search/forms, progress/radar alternatives, table/list semantics
- Keyboard operation, focus visibility, modal inertness/trap/Escape/restoration, equal exits, target floor, editable-text floor, non-color cues, live-region behavior, and reduced motion
- Real 125% reflow risks, especially S19 avatar/level, S42 actions, S43 exits, S71 hero/ring, S83 sheets, and S92 paywall/safety panels
- Contrast/token use, disabled reasons, loading/empty/offline/error distinctions, and content not hidden behind fixed navigation
- Consent before personal media, audience/scope/retention/revoke/delete/export truth, no fabricated sync/purchase/account mutation, due process, non-coercive cancellation/destructive actions, and dark-pattern avoidance
- Verifier assertions that substantively cover these contracts without weakening or false-positive geometry

## Output contract

Return severity-ranked findings with absolute `file:line`, violated WCAG/trust rule, user impact, and smallest safe fix. State candidate drift and runtime-evidence gaps separately. Explicitly report `0 Critical / 0 High / 0 Medium` when appropriate; Low notes are non-blocking.

## Stop conditions

Stop and report if S43 changed, privacy/safety authority is ambiguous, required evidence is missing beyond a clearly stated runtime gap, or any write/runtime action would be needed.
