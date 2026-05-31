<!-- TEMPLATE — How to use:
  The weighted scoring rubric (FRAMEWORK.md move Verify (A6), quality mechanics C8). This is the canonical scoring
  authority — every grade and finding traces to a dimension here. Make the bar intentionally hard. Set
  weights to sum to 100, define concrete per-failure deductions (so grades are reproducible, not vibes),
  and define grade caps so an open high-severity finding can't be hidden behind a good average.
  Delete this comment when done. -->

# <PROJECT_NAME> — <LANE> Rubric

**Canonical scoring authority.** Every grade in the report and every finding in the ledger traces to a dimension and check defined here. The bar is **<YOUR_PREMIUM_BAR — e.g. "A+++: shippable, nothing left to improve">**.

> **Read-only contract:** auditing never edits. Findings carry a `fix-pointer` (the exact remedy) so a *separate* session acts. Grade and point; don't fix.

## Source of truth (what each item is graded *against*)

| Layer | Authority |
|-------|-----------|
| <behavior / contract> | `<the canonical source>` |
| <tokens / constants> | `<the canonical source>` |
| **Live truth (wins ties)** | `<the running/deployed/live artifact>` |

## Dimensions (weighted to 100)

| # | Dimension | Weight | One-line bar |
|---|-----------|-------:|--------------|
| 1 | <dimension> | <w> | <the premium bar for this dimension> |
| 2 | <dimension> | <w> | <…> |
| 3 | <dimension> | <w> | <…> |
| … | … | … | … |
| | **Total** | **100** | |

### Per-dimension checks (each failure deducts)
**1 · <dimension> — weight <w>**
- [ ] <check>
- [ ] <check>

Scoring: 100 = <perfect>. **−<X> per <distinct failure type>**. (Concrete deductions keep grades reproducible.)

## Letter bands

| Band | Range | Meaning |
|------|-------|---------|
| A+++ | <range> | <nothing left to improve> |
| … | … | … |
| F | <range> | <…> |

## Grade caps (anti-inflation)

- No `<high band>` while any **<high-severity>** finding is open.
- Nothing above `<mid band>` while any **<critical-severity>** finding is open.
- Top grade only when **all dimensions max** + fresh evidence + every element justified + no finding above the smallest severity.
- **Never inflate a grade to show progress — truth is the deliverable.**

## Distribution smell-test
Expect a spread (~20–30% top, a band of near-misses, a majority mid, 0–2 failing). If it skews, suspect rubric mis-calibration or a systemic foundation defect → consolidate blocker themes and fix shared foundations once, before per-item polish.
