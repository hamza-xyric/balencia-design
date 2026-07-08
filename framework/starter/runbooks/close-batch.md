# Forgeflow Runbook: Close Batch

## Required Context

- Active batch file.
- `_progress.md`, `findings-ledger.md`, `deferred-decisions.md`, and `accepted-improvements.md`.
- Worker task packet and output path, if any.
- Active orchestrator: Codex when running through Codex, Claude when running
  through Claude Code.
- Verification commands from root and lane guidance.
- Current `git status --short`.

## Steps

1. Review every item in the batch file. Confirm each item has notes, evidence, decision, and status.
2. Update ledgers:
   - Findings: ID, status, severity, evidence/source, owner, blocked work, next action, closure condition.
   - Deferred decisions: ID, decision needed, owner, blocked work, required source of truth, next action.
   - Accepted improvements: ID, improvement, source, value, affected files, follow-up.
3. Run the required verify commands and record exact command/result.
4. If a worker was used, confirm the packet path, output path, verify result,
   and orchestrator review decision are recorded before accepting any worker
   finding or edit.
5. Update `_progress.md` totals, current phase, current blockers, completed batch, next batch, and stale-doc warnings.
6. Set batch status to `closed`, `blocked`, or `closed with waivers`.
7. Write or refresh `plans/next-session-handoff.md`.

## Expected Output

- A batch closeout that is independently auditable from files, evidence, ledgers, and verification logs.

## Quality Bar

- No item closes on assertion. Every closure has evidence and verification.
- Worker output is evidence only until orchestrator verification is recorded.
- Known drift means `closed with waivers` or `blocked`, not clean `closed`.
- Open blockers name severity, owner, blocked work, and next action.

## Persistence / Closeout

- Persist ledger, progress, memory, and handoff changes.
- Commit by explicit path only when asked to commit.

## Stop Conditions

- Stop if verification fails.
- Stop if a critical or major finding lacks owner and next action.
- Stop if the worktree includes unrelated dirty files that could be overwritten.
