# Forgeflow Runbook: Create Work Items

## Required Context

- Approved story plan or founding brief section.
- Source hierarchy, active root, batch plan, progress ledger, and open blockers.
- Required issue tracker or local work-item format.

## Steps

1. Convert approved scope into small work items with stable IDs.
2. For each item, record source link, owner, affected files/areas, blocked work, next action, verify command, and closure condition.
3. Group work items into batches sized for one bounded session.
4. Update `_progress.md` and the batch plan.
5. Cross-link findings, deferred decisions, and accepted improvements that created the item.

## Expected Output

- A traceable set of work items that connects product intent to implementation and verification.

## Quality Bar

- No orphan work item: every item traces to a source, finding, decision, or accepted improvement.
- No vague item names like "fix stuff" or "clean up"; each item has a closure condition.
- Exactly one next active item or batch is marked.

## Persistence / Closeout

- Update progress and any external issue tracker if one is active.
- Refresh the handoff if the next slice changed.

## Stop Conditions

- Stop if a proposed item lacks a source of truth.
- Stop if the item list is too large to batch safely.
