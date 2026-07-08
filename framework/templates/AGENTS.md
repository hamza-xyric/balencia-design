<!-- TEMPLATE — How to use:
  Per-lane operating rules (FRAMEWORK.md Build (A5)). One AGENTS.md per sub-workspace.
  Its job is to define scope, source authority, deliverable standard, verification, and boundaries.
  Delete this comment when done. -->

# <LANE_NAME> — Agent Rules

Use this folder for **<lane purpose>** only.

## Required Context

Before working on an item, read in order:
1. `<root AGENTS.md or CLAUDE.md>` — cross-project rules.
2. `<source hierarchy / founding brief>` — intent and authority.
3. `<path/_shared-canon.md>` — reusable patterns and constraints.
4. `<active batch/story/work item>` — current scope.
5. `<this lane's progress/findings>` — open blockers and prior decisions.

## Lane Scope

- In scope: <work this lane owns>.
- Out of scope: <work this lane must not perform>.
- Active root: `<path>`.
- Archived or reference-only sources: `<paths>`.

## Discipline

- Work in batches of up to <N> items. Never do all items in one pass.
- One item at a time; the batch file is the primary deliverable.
- Separate evidence from opinion. Treat user observations as hypotheses to validate.
- Save findings before suggesting implementation work.
- Plan-then-apply for anything hard to reverse.
- Preserve unrelated dirty worktree changes.

## Deliverable Standard

Every completed batch file must include:
- Summary and decision line.
- Per-item notes with source links.
- Rubric or hard-gate result.
- Findings table with owner, blocked work, next action, and closure condition.
- Evidence paths or command output summaries.
- Verification command and result.
- Do-not-do-yet constraints and next recommended slice.

## Finding Format

Every finding needs: ID, status, severity (`critical`/`major`/`minor`/`nit`), finding, evidence/source, owner, blocked work, next action, closure condition.

## Boundaries

- Do not edit `<other lane>` during this lane's sessions.
- Do not mark an item done if it has unresolved critical or major findings.
- Do not close a batch if any item lacks evidence or verification.
- Auditors never mutate; fixers mutate only after an approved plan.
- If source hierarchy cannot resolve a conflict, stop and record a deferred decision.

## Commands

```bash
<VERIFY_COMMAND>
<DEV_COMMAND>
```
