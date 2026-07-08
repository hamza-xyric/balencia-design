# Forgeflow Runbook: Plan Story

## Required Context

- Founding brief, active source hierarchy, product/domain non-negotiables, and active root.
- Relevant specs, code, docs, issues, user requests, and prior findings.
- Verification commands and traceability requirements.

## Steps

1. Define the story goal, audience, user value, and non-goals.
2. Trace the story to active sources and mark any missing or conflicting sources.
3. Split into implementation slices with owners, dependencies, blocked work, verification, and acceptance criteria.
4. Name required docs, code paths, registries, tests, migrations, and ledgers.
5. Identify decisions that must be made before writes and record them in `deferred-decisions.md`.

## Expected Output

- A story plan that an implementer can execute without inventing scope or acceptance criteria.

## Quality Bar

- Each slice is independently verifiable.
- Acceptance criteria are observable, not vibes.
- The plan includes "do not do yet" boundaries.

## Persistence / Closeout

- Save the story plan where the project stores active planning docs.
- Add work items or progress rows only when the story is approved as active.

## Stop Conditions

- Stop if the story depends on an unresolved product/domain decision.
- Stop if active and archived sources conflict.
