<!-- TEMPLATE — How to use:
  The progress ledger (FRAMEWORK.md move Persist (A7), artifact taxonomy C10). One row per item. This is durable
  memory: a fresh session reconstructs "where we are" from this file alone. Keep the running totals
  current. Status enum: not-started → in-progress → done → (updated). Delete this comment when done. -->

# <PROJECT_NAME> — Progress Ledger

Last updated: <YYYY-MM-DD>
Completed: <X> / <N>
Current batch: <name or "—">

| # | Item | File | Status | Batch | Date Completed |
|---|------|------|--------|-------|----------------|
| 01 | <item name> | `<path>` | not-started | 1 | — |
| 02 | <item name> | `<path>` | in-progress | 1 | — |
| 03 | <item name> | `<path>` | done | 1 | <YYYY-MM-DD> |
| 04 | <item name> | `<path>` | updated | gap-audit | <YYYY-MM-DD> |

## Batch reference

| Batch | Items | Theme |
|-------|-------|-------|
| 1 | <range> | <theme> |
| 2 | <range> | <theme> |

## Gap-audit / remediation log

- **<YYYY-MM-DD> — <audit name>**: compared <impl/source> against specs; found <N> gaps; <created/updated> items <list>. See `<PATH/_inconsistency-report.md>`.
