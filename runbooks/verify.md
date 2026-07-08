# Forgeflow Runbook: Verify

## Required Context

- Root and lane verification commands.
- `hard-gates.md`, `rubric.md`, active batch file, and source hierarchy.
- The project's filled verification matrix, or `framework/templates/verification-matrix.md` as the scaffold for choosing gates.
- Pre-development gate result, if implementation has not started yet.
- Current worktree state.

## Steps

1. Select gates from the verification matrix for each touched change type:
   pre-development docs/readiness, backend/API, frontend/UI, DB migration,
   docs/framework, worker delegation/task packet, saved Claude workflow,
   gateway/router evaluation, AI/data provenance, auth/security, and
   health/safety.
2. Run deterministic checks first: lint, typecheck, tests, contract checks, route checks, migration checks, provenance/eval checks, security scans, doc checks, or project-specific gates.
3. Run framework portability checks when foundation files changed: `node framework/verify/portability-check.mjs .`.
4. Check actual hard gates where possible: active root consistency, no archived-source references, one active next step, required story/work-item links, placeholders, missing evidence, missing handoff sections, stale/conflicting docs, and critical memory contradictions.
5. Record exact command, result, date, relevant output summary, manual review lens, evidence location, and stop-condition status in the active batch, progress, and handoff.
6. If known drift remains, mark status `READY WITH WAIVERS` or `BLOCKED`; a passing command alone is not enough.

## Expected Output

- A verification log with commands, results, failures, waivers, and next action.

## Quality Bar

- Verification is deterministic where possible.
- Manual review is named as manual review, not presented as automated proof.
- Failures block closeout until fixed, deferred with owner, or explicitly waived.

## Persistence / Closeout

- Update batch closeout, `_progress.md`, and `plans/next-session-handoff.md`.
- Add durable verification lessons to memory only if they should guide future sessions.

## Stop Conditions

- Stop on failed hard gates.
- Stop if verify commands are missing from root guidance.
- Stop if the verifier and known live state disagree.
