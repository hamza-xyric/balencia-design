# Forgeflow Runbook: Start Batch

## Required Context

- Founding brief and source hierarchy.
- `_progress.md`, current batch plan, and previous batch closeout.
- Nearest lane `AGENTS.md` and relevant shared canon.
- Open findings, deferred decisions, accepted improvements, blockers, drift, and waivers.
- `runbooks/runtime-profiles.md` for the batch's loop primitive and runtime profile.
- `runbooks/pre-development-check.md` for the docs, traceability, gate, and worker-readiness check before implementation begins.
- `runbooks/worker-task-packets.md` when delegating a bounded slice to any worker.
- `runbooks/saved-workflows.md` before using `ultracode:` or saving a Claude workflow.

> **Inputs from Blueprint (if used).** When the docs were produced by the **Blueprint** method (`blueprint/`), its **Segment Plan** is a valid batch source: each `segment.md` is already batch-shaped (it mirrors `templates/batch-template.md`) and the **segment ID is the batch ID, 1:1** — do not renumber. A `<!-- BUILD_READY: <product> -->` marker in the Segment Plan signals the docs are locked and verified. Seed `_progress.md` from the ordered segment list, and verify each batch against Blueprint's `traceability-matrix.md` (the source of intent). Blueprint's handoff also seeds the rest of Forgeflow's inputs via its **input map** (`blueprint/BLUEPRINT.md` C6): vision → `FOUNDING-BRIEF.md`, architecture binding standards → `_shared-canon.md`, NFR targets → `hard-gates.md` candidates, traceability matrix → `verification-matrix.md`. If `/onboard` hasn't run, prefer those seeds over starting cold. Build segments in the order Blueprint's **Build order & parallelization** view sets — segments in the same parallel-safe group can run concurrently.

## Steps

1. Confirm active lane, active root, batch ID, batch scope, item list, and session cap.
2. Check prerequisites: required sources exist, blockers are resolved or waived, and the worktree cautions are understood.
3. Create or update the batch file from `framework/templates/batch-template.md`.
4. Record item locators, source links, owners, expected evidence, verify command, and closeout checklist.
5. Apply `runbooks/runtime-profiles.md` and record the loop/runtime intake block before work begins:
   - chosen loop primitive: `none`, `/goal`, `/loop`, or `ultracode:`
   - chosen runtime profile: `codex-native`, `claude-native`, `glm-coding-backend`, `deepseek-coding-backend`, `local-qwen-mlx`, or `gateway-router`
   - orchestrator role: Codex when running through Codex, Claude when running through Claude Code
   - worker backend, if any
   - provider, model, and endpoint class, if any
   - worker task packet path and worker output path, if any
   - saved workflow path, if any
   - verify command
   - evidence path
   - usage/quota guard
   - closeout writes
6. Run `runbooks/pre-development-check.md` and record the result: `READY`, `READY WITH WAIVERS`, or `BLOCKED`.
7. Infer execution-control decisions from Blueprint and Forgeflow evidence when
   the docs already determine them. Ask only for true personalization decisions,
   unavailable credentials/tokens, runtime access, safety-blocking choices, or
   approvals for destructive/irreversible work.
8. If a worker backend is selected, derive the worker task packet from the
   active Blueprint segment or Forgeflow batch, source hierarchy, traceability
   row, verification matrix, and current file map before implementation. The
   user should not need to supply the packet contents. Worker output remains
   evidence until orchestrator verification.
9. Stop before implementation unless the pre-development gate is `READY`, or `READY WITH WAIVERS` with owner, blocked work, next action, closure condition, and a clear reason development may begin.
10. Mark the batch `in progress` in `_progress.md`.
11. State the first item, pre-development gate result, loop primitive, runtime profile, worker packet status, and stop condition before implementation or review begins.

## Expected Output

- A concrete batch artifact with real item IDs, locators, owners, evidence targets, verify commands, and closeout criteria.
- A pre-development gate result proving docs, traceability, verification gates, and worker readiness were checked before implementation.
- The batch's loop primitive, runtime profile, orchestrator role, worker backend, usage guard, evidence path, and closeout writes recorded in the batch artifact.
- AI-derived worker task packet path and output path when any worker backend is used.

## Quality Bar

- The batch is small enough to finish and verify in one bounded session.
- Every item traces to an active source, not an archived or superseded doc.
- The pre-development gate is recorded before the batch is marked `in progress`.
- The runtime profile does not override the source hierarchy, safety rules, or verification gate.
- There is exactly one active next step.

## Persistence / Closeout

- Save the batch artifact and update `_progress.md`.
- Note any unresolved blocker in `findings-ledger.md` or `deferred-decisions.md`.

## Stop Conditions

- Stop if the batch crosses lanes or roots.
- Stop if required sources disagree and the source hierarchy does not resolve the conflict.
- Stop if the batch cannot be verified deterministically.
- Stop if the pre-development gate is `BLOCKED`.
- Stop if the loop primitive, runtime profile, usage/quota guard, worker packet, or worker smoke test cannot be named safely.
