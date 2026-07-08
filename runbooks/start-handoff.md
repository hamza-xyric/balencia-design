# Forgeflow Runbook: Start Handoff

## Required Context

- `plans/next-session-handoff.md`.
- Legacy fallback only if needed: `.claude/plans/next-session-handoff.md`.
- Root `AGENTS.md`, root `CLAUDE.md`, and relevant lane `AGENTS.md`.

## Steps

1. Read `plans/next-session-handoff.md`. If absent, read `.claude/plans/next-session-handoff.md` only as a legacy fallback.
2. Run the handoff's START BY verification commands before editing.
3. Read files in the handoff's read-first order.
4. Honor all blockers, waivers, do-not-do-yet constraints, and stop conditions.
5. Execute only the exact next recommended slice unless the user redirects.
6. When finished, update ledgers, memory if durable facts changed, progress, verification evidence, and the next handoff.

## Expected Output

- The next slice completed or a clear blocked report with evidence.

## Quality Bar

- Do not rely on chat history. Rehydrate from repo files.
- Do not mark a blocked handoff as ready without resolving or waiving the blocker.
- Do not skip verification because a previous session claimed it passed.

## Persistence / Closeout

- Update `plans/next-session-handoff.md` at closeout.
- If using the legacy fallback path, migrate the next handoff to `plans/next-session-handoff.md`.

## Stop Conditions

- Stop if the handoff is missing and the next slice cannot be inferred from durable artifacts.
- Stop if START BY verification contradicts the handoff.
- Stop before writes if required sources cannot be found.
