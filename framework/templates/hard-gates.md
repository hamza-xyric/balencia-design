<!-- TEMPLATE — How to use:
  Hard-fail gates (FRAMEWORK.md move Verify (A6)). These are pass/FAIL binary checks that OVERRIDE rubric averages:
  any single fail forces iterate/reject no matter how good the average. Use them for non-negotiables —
  brand integrity, legal/safety, trust, authenticity. Generalized from a brand-gates list. Delete this
  comment when done. -->

# <PROJECT_NAME> — Hard Gates (binary fails)

Any **fail** forces `iterate` or `reject` regardless of rubric averages. These are the non-negotiables.

## <Category 1 — e.g. Authenticity / brand>

| Gate | FAIL if |
|------|---------|
| <gate name> | <the exact failing condition> |
| <gate name> | <…> |

## <Category 2 — e.g. Legal / safety / trust>

| Gate | FAIL if |
|------|---------|
| <gate name> | <…> |
| <gate name> | <…> |

## <Category 3 — e.g. Correctness / data integrity>

| Gate | FAIL if |
|------|---------|
| <gate name> | <…> |

## Honesty gate (applies everywhere)

| Gate | FAIL if |
|------|---------|
| Element honesty | A visible control/element does nothing, fakes a result, or misrepresents state (must work, be honestly disabled, be clearly decorative, or have documented behavior). |
