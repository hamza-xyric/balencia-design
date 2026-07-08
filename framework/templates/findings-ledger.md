<!-- TEMPLATE — How to use:
  Append-only findings ledger (FRAMEWORK.md Verify/Persist). Never delete rows; mark them resolved.
  Every finding must include owner, blocked work, next action, and closure condition so it can re-enter
  planning instead of becoming a vague note. Delete this comment when done. -->

# <PROJECT_NAME> — Findings Ledger

Cross-batch source of truth for audit/review findings. Append-only; findings are marked resolved, rejected, deferred, or accepted, never removed.

- Last updated: <YYYY-MM-DD>
- ID scheme: `<BATCH>-F<NN>` for batch findings; `X-<NN>` for cross-cutting/integration findings.
- Severity: `critical` | `major` | `minor` | `nit`
- Status: `proposed` | `accepted` | `deferred` | `rejected` | `resolved`

| ID | Status | Severity | Finding | Evidence / source | Owner | Blocked work | Next action | Closure condition |
|----|--------|----------|---------|-------------------|-------|--------------|-------------|-------------------|
| B01-F01 | accepted | major | <what is wrong> | `<path/line/screenshot/command>` | <role/person> | <what cannot close> | <specific fix/review step> | <observable condition> |
| B01-F02 | deferred | minor | <decision or gap> | `<source>` | <role/person> | <work blocked or "none"> | <next question/action> | <when to revisit> |
| X-001 | resolved | critical | <systemic issue> | `<source>` | <role/person> | <work previously blocked> | <completed action> | <verification evidence> |

## Closure Rules

- `resolved` requires evidence and verification.
- `rejected` requires a reason and the source of authority.
- `deferred` requires owner, blocked work, next action, and revisit trigger.
- Critical or major accepted findings block clean batch closeout unless explicitly waived.
