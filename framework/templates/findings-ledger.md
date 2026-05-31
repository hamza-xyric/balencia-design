<!-- TEMPLATE — How to use:
  The append-only findings ledger (FRAMEWORK.md move Verify (A6) / Persist (A7), feedback loops C2). Cross-batch source of
  truth for everything review surfaces. NEVER delete a row — mark it resolved. Stable IDs let you do
  delta queries ("what's new since last pass?"). Pair with accepted-improvements.md and
  deferred-decisions.md (the approved / postponed subsets). Delete this comment when done. -->

# <PROJECT_NAME> — Findings Ledger

Cross-batch source of truth for audit/review findings. Append-only; findings are marked resolved, never removed.

**ID scheme:** `<BATCH>-F<NN>` for review findings (e.g. `B01-F01`, `R03-F02`); use a distinct prefix for cross-cutting/integration issues (e.g. `X-013`, `C-032`).

**Severity:** `critical` | `major` | `minor` | `nit`
**Status:** `proposed` | `accepted` | `deferred` | `rejected` | `resolved`

| ID | Batch | Item | Locator | Severity | Category | Finding (evidence) | Recommendation (fix-pointer) | Status |
|----|-------|------|---------|----------|----------|--------------------|------------------------------|--------|
| B01-F01 | 01 | <item> | `<route/path/node>` | major | <category> | <what's wrong + evidence> | <exact remedy> | accepted |
| B01-F02 | 01 | <item> | `<locator>` | minor | <category> | <…> | <…> | deferred |
| X-01 | — | <cross-cutting> | — | critical | integration | <systemic issue, e.g. a durable tooling gotcha> | <how to handle> | resolved |

<!-- Companion files (create alongside):
  accepted-improvements.md — findings approved for implementation, with where they were addressed
  deferred-decisions.md    — findings postponed / product decisions, each with a reason (Q-IDs)
-->
