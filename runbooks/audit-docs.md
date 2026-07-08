# Forgeflow Runbook: Audit Docs

## Required Context

- Root `AGENTS.md`, `CLAUDE.md`, founding brief, source hierarchy, and active vs archived source list.
- Progress, findings, deferred decisions, accepted improvements, and handoff.
- Current file map from `rg --files`.
- `framework/templates/verification-matrix.md` or the project's filled verification matrix, if present.

## Steps

1. Require an active-vs-historical declaration. The project must name active operational docs, archived/historical docs, and the tie-breaker source that wins when docs disagree.
2. Identify dated plans, logs, prompts, research notes, and handoffs. Treat them as historical unless the source hierarchy explicitly marks them active.
3. Check for contradictions across source hierarchy, active root, current phase, verification commands, lane rules, critical memory invariants, and next step.
4. Search for stale references to archived sources, old handoff paths, missing evidence, placeholders, generic instructions, multiple active next steps, and copied starter text that was never project-specific.
5. Check whether dated plans/logs are being accidentally treated as active truth by root guidance, lane guides, README files, memory, or current handoff.
6. Record findings with owner, severity, blocked work, next action, closure condition, and the source that wins.
7. Recommend doc updates only after naming the source of truth that wins.

## Expected Output

- A docs audit report or ledger update that distinguishes stale docs from live truth.
- An explicit active docs list, archived docs list, and tie-breaker source, or a blocker saying they are missing.

## Quality Bar

- Findings cite exact files and lines or sections.
- The audit does not treat historical prompts as active truth unless explicitly marked active.
- The report separates deterministic failures from recommended improvements.
- Dated plans/logs/prompts can provide context, but they cannot override active root guidance, live code, or the declared tie-breaker.

## Persistence / Closeout

- Append findings and deferred decisions to the correct ledgers.
- Update `plans/next-session-handoff.md` if doc drift changes next-session safety.

## Stop Conditions

- Stop before editing if the source hierarchy cannot decide which doc wins.
- Stop if the project has not declared active docs, archived docs, and a tie-breaker source.
- Stop if a doc appears active but contradicts live implementation and no owner can resolve it.
