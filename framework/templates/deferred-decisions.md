<!-- TEMPLATE — How to use:
  Decisions that are real but not ready. Use this instead of leaving open questions in chat or burying
  them in a handoff. Delete this comment when done. -->

# <PROJECT_NAME> — Deferred Decisions

- Last updated: <YYYY-MM-DD>
- Status enum: `open` | `blocked` | `decided` | `superseded`

| ID | Status | Decision needed | Owner | Blocked work | Required source of truth | Next action | Closure condition |
|----|--------|-----------------|-------|--------------|--------------------------|-------------|-------------------|
| Q-001 | open | <question to decide> | <role/person> | <work blocked> | `<doc/system/person>` | <concrete next step> | <what makes it decided> |
| Q-002 | blocked | <question> | <role/person> | <work blocked> | `<source>` | <unblocking action> | <observable condition> |

## Rules

- Every open decision must name blocked work, even if the answer is "none yet."
- Move decided items into the founding brief or source hierarchy when they become durable.
- If a decision blocks the next slice, the handoff status cannot be `READY`.
