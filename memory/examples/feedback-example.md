---
name: feedback-example
description: Example of a `feedback` fact — how you should work, with the why
metadata:
  type: feedback
  status: active
  last_verified: 2026-01-15
---

Always run the verify gate before saying a batch is done; never report "done" on assertion.

**Why:** A gate that's skipped once becomes a gate that's never trusted — and "done" that wasn't has burned this project before.
**How to apply:** Run the project's verify command, record the command/result in the batch, progress ledger, and handoff, and only then mark the batch complete.
**Verify before relying:** Confirm the current verify command in root `AGENTS.md`/`CLAUDE.md`; memory may name an old command.
**Future agents must not assume:** A passing verifier does not erase known drift; handoff status must still be `READY WITH WAIVERS` or `BLOCKED` when drift remains.

_(Worked example showing the shape of a `feedback` fact. Replace it with real guidance, or delete it. Related: [[project-example]].)_
