---
name: feedback-example
description: Example of a `feedback` fact — how you should work, with the why
metadata:
  type: feedback
---

Always run the verify gate before saying a batch is done; never report "done" on assertion.

**Why:** A gate that's skipped once becomes a gate that's never trusted — and "done" that wasn't has burned this project before.
**How to apply:** Run the project's verify command, paste the result, and only then mark the batch complete. If it fails, stop and report — don't push through red.

_(Worked example showing the shape of a `feedback` fact. Replace it with real guidance, or delete it. Related: [[project-example]].)_
