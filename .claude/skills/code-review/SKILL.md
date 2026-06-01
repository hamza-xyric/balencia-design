---
name: code-review
description: Systematic code review using the CLEAR framework (Correctness, Logic, Efficiency, Architecture, Readability). Use when reviewing code, checking PRs, or evaluating implementations before merge.
---

# DEV-01: Code Review Assistant

**Version**: 2.1

---

## Purpose

Systematic code reviews using the CLEAR framework. Ensures quality, catches bugs, enforces standards, and provides constructive feedback.

---

## When to Activate

**Triggers**:
- "Review this code"
- "Check this PR"
- "What do you think of this implementation?"
- Before merging significant code changes

---

## The CLEAR Review Method

| Aspect | Focus | Questions |
|--------|-------|-----------|
| **C**orrectness | Does it work? | Solves the problem? Edge cases? |
| **L**ogic | Is it sound? | Bugs? Race conditions? Off-by-one? |
| **E**fficiency | Is it performant? | Complexity? Unnecessary operations? |
| **A**rchitecture | Is it well-designed? | Separation of concerns? SOLID? |
| **R**eadability | Is it maintainable? | Clear naming? Good comments? |

---

## Review Priorities

### Critical (Must Fix)
- Security vulnerabilities (OWASP Top 10)
- Breaking changes without migration
- Missing error handling in user flows
- Accessibility violations (WCAG AA)

### Important (Should Fix)
- Performance issues
- Missing tests for new code
- Inconsistent with codebase patterns
- Hard-coded values that should be configurable

### Minor (Consider)
- Style improvements
- Additional documentation
- Alternative approaches

---

## Review Output Format

```markdown
## Code Review: [File/PR Name]

### Summary
[One-paragraph overview]

### Overall Assessment
🟢 **Approve** | 🟡 **Approve with Comments** | 🔴 **Request Changes**

---

### Critical Issues (Must Fix)
1. **[Issue]** - Line [X]
   - Problem: [Description]
   - Impact: [Why this matters]
   - Suggestion: [How to fix]

### Important Suggestions (Should Fix)
1. **[Issue]** - Line [X]
   - Current: [What's there]
   - Suggested: [What should be there]

### Minor Improvements (Consider)
1. [Improvement]

### Positive Observations
1. [Good practice noted]
```

---

## Review Rules

1. **Understand before reviewing** - read PR description, check context
2. **Be specific and actionable** - "Line 32 needs null check" not "fix bugs"
3. **Be constructive** - explain WHY, suggest alternatives
4. **Acknowledge good work** - note well-done patterns
5. **Focus on what matters** - don't nitpick style when logic is broken

---

## Integration

| Skill | Integration |
|-------|-------------|
| DEV-02 | After review, identify tests needed |
| DEV-03 | If bugs found, assist with debugging |
| EXPERT-04 | Follows QA coverage standards |

---

## Anti-Patterns

- Nitpicking style when substance needs work
- Approving to avoid conflict
- Reviewing without understanding context
- Making style preferences into requirements
- Being condescending or dismissive

---

*Skill DEV-01 v2.1 | Adapted for Balencia*
