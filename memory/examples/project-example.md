---
name: project-example
description: Example of a `project` fact — an ongoing goal/constraint not derivable from the code
metadata:
  type: project
  status: active
  last_verified: 2026-01-15
---

The active implementation root is `apps/new-module`; `apps/legacy-module` remains read-only except for critical production bugs until the cutover decision is marked `FINAL`.

**Why:** New contributors keep "fixing" the legacy module, which is being retired — wasted effort and merge noise.
**How to apply:** Make changes in the active root; touch the legacy root only for critical bugs until cutover.
**Verify before relying:** Check `AGENTS.md`, `_progress.md`, and the latest `plans/next-session-handoff.md` for active-root drift.
**Future agents must not assume:** Do not treat archived or legacy folders as active just because they still build.

_(Worked example showing the shape of a `project` fact. Replace it with real project state, or delete it. Related: [[reference-example]].)_
