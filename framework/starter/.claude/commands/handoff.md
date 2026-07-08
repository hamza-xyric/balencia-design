---
description: Write a complete Forgeflow next-session handoff at plans/next-session-handoff.md
argument-hint: "[next-slice hint]"
---

Read `runbooks/handoff.md` and execute it exactly. The canonical output is `plans/next-session-handoff.md`; `.claude/plans/next-session-handoff.md` is legacy fallback only.

When done, print:

```text
Handoff saved to plans/next-session-handoff.md

Next steps:
  1. /clear
  2. /start-handoff
```

User hint (may be empty): $ARGUMENTS
