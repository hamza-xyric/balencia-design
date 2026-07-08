# Forgeflow Runbook: Handoff

## Required Context

- `git log --oneline -5` and `git status --short`.
- `memory/MEMORY.md` plus relevant memory fact files.
- `_progress.md`, `findings-ledger.md`, `deferred-decisions.md`, `accepted-improvements.md`, and the active batch file.
- The nearest lane `AGENTS.md`, root `AGENTS.md`, and root `CLAUDE.md`.
- Latest verification output and any known drift or waivers.

## Steps

1. Inspect current state. Identify committed work, dirty files, recently touched files, active lane, active implementation root, open blockers, known drift, and verification status.
2. Decide the exact next recommended slice. If multiple next slices are plausible, ask the user before writing the handoff.
3. Write `plans/next-session-handoff.md` from `framework/templates/next-session-handoff.md`.
4. Include status `READY`, `READY WITH WAIVERS`, or `BLOCKED`.
5. Include the read-first order, dirty-worktree cautions, open blockers with severity/owner/blocked work/next action, drift, waivers, verification commands/results, do-not-do-yet constraints, and maintenance contract.
6. If `.claude/plans/next-session-handoff.md` exists, leave it as legacy history unless the user asks to remove it. Do not make it the primary path.

## Expected Output

- A complete `plans/next-session-handoff.md` that a fresh Claude or Codex session can use without chat history.

## Quality Bar

- The handoff names one next slice, not a menu of vague possibilities.
- A new session can start by following the read-first order and verification block.
- Any known drift prevents `READY`; use `READY WITH WAIVERS` or `BLOCKED`.
- Dirty files are named explicitly with keep/review/do-not-touch guidance.

## Persistence / Closeout

- Save only the handoff unless the user explicitly asked for broader cleanup.
- Tell the user to start the next clean session with `/start-handoff` in Claude or the `forgeflow-start-handoff` skill in Codex.

## Stop Conditions

- Stop if there is no credible next slice.
- Stop if the repo state is too ambiguous to summarize safely.
- Stop if an irreversible decision is needed before the handoff can be truthful.
