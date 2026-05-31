<!-- TEMPLATE — How to use:
  Capture requirements as QUESTIONS, not declarations (FRAMEWORK.md move A1). For each decision, record
  the answer and mark it FINAL (locked — do not re-debate) or OPEN (uncertain — an explicit risk). This
  is the discovery → first-build handoff contract: the build may not start until every build-blocking
  decision is FINAL. Delete this comment when done. -->

# <PROJECT_NAME> — Vision Questionnaire

Legend: **FINAL** = locked, do not re-litigate · **OPEN** = uncertain, carried as a risk.

## Product / scope

| # | Question | Answer | Status | Rationale (research / user / constraint) |
|---|----------|--------|--------|------------------------------------------|
| Q01 | <question> | <answer> | FINAL | <why — cite source where possible> |
| Q02 | <question> | <answer> | OPEN | <what makes it uncertain> |

## Audience / users

| # | Question | Answer | Status | Rationale |
|---|----------|--------|--------|-----------|
| Q-- | <question> | <answer> | <FINAL/OPEN> | <why> |

## Technical / constraints

| # | Question | Answer | Status | Rationale |
|---|----------|--------|--------|-----------|
| Q-- | <question> | <answer> | <FINAL/OPEN> | <why> |

## Brand / tone / quality bar

| # | Question | Answer | Status | Rationale |
|---|----------|--------|--------|-----------|
| Q-- | <question> | <answer> | <FINAL/OPEN> | <why> |

## Open risks (all OPEN items, consolidated)

- **Q--** <open question> — *impact if wrong:* <impact> · *decide by:* <milestone>.

## Handoff acceptance check (gate to start the build)

- [ ] Every decision that blocks the first build is **FINAL**.
- [ ] All **OPEN** decisions are listed under "Open risks".
- [ ] Source hierarchy + tie-breaker decided (see `CLAUDE.md`).
- [ ] Founding brief is self-contained.
