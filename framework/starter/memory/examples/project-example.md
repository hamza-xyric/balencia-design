---
name: project-example
description: Example of a `project` fact — an ongoing goal/constraint not derivable from the code
metadata:
  type: project
---

The project is mid-migration from the legacy module to the new one; both run in parallel until the cutover, scheduled after the audit lane closes.

**Why:** New contributors keep "fixing" the legacy module, which is being retired — wasted effort and merge noise.
**How to apply:** Make changes in the new module; touch the legacy one only for critical bugs until cutover. Record dates as absolute, not "next week."

_(Worked example showing the shape of a `project` fact. Replace it with real project state, or delete it. Related: [[reference-example]].)_
