---
name: feedback-agent-workflow-rules
description: Hard rules for agent behavior in this repo — prototype is visual-only, audits are read-only, never approximate the logo
metadata:
  type: feedback
  risk_level: critical
  critical_invariant: true
---

- `balencia-screens/` is visual-only: no API calls, auth logic, backend state, or state-management libraries.
- Screen reviews are audit-only: do not edit `balencia-screens/` or `app_design 3/` during audit sessions unless the user explicitly asks.
- Never AI-generate or approximate the Balencia logo — use official assets from `Balencia/Balencia-Creatives-Reference/logos/` only.
- Batch discipline: review/implement screens in batches (typically 3–12), always reading the screen spec and `_shared-patterns.md` first.

**Why:** these were set as explicit CLAUDE.md rules after real drift risk (audit sessions accidentally editing source specs; logo approximation being a brand-integrity issue).
**How to apply:** treat these as hard stop conditions, not preferences — if a task seems to require violating one, stop and ask rather than proceeding.
