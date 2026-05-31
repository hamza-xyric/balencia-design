<!-- TEMPLATE — How to use:
  Per-lane operating rules (FRAMEWORK.md move Build (A5), principle #5). One AGENTS.md per sub-workspace. Its job
  is to stop one lane's rules from leaking into another and to prevent the agent from improvising
  boundaries. Be explicit about what is in-scope, the deliverable standard, and the hard boundaries
  (e.g. "audit-only — never edit X"). Delete this comment when done. -->

# <LANE_NAME> — Agent Rules

Use this folder for **<lane purpose>** only.

## Required context
Before working on an item, read:
- the item's spec in `<path>`
- the shared canon `<path/_shared-canon.md>` (relevant sections)
- <other required source>

## Discipline
- Work in batches of up to <N> items (see FRAMEWORK.md §C4). Never do all items in one pass.
- One item at a time; the batch file is the primary deliverable (not a thin status table + external notes).
- Separate evidence from opinion. Treat user-provided observations as hypotheses to validate.
- Save findings before suggesting implementation work.
- <lane-specific discipline>

## Deliverable standard
Every completed batch file must include: <the required sections — summary, per-item notes, rubric table, findings table, decision line, evidence paths, verify result>.

## Finding format
Every finding needs: item id, locator, severity (`critical`/`major`/`minor`/`nit`), category, evidence, impact, recommendation, decision status (`proposed`/`accepted`/`deferred`/`rejected`).

## Boundaries (hard rules)
- <e.g. Do NOT edit `<other lane>` during this lane's sessions.>
- Do NOT mark an item done if it has unresolved critical or major findings.
- Do NOT close a batch if any item lacks a compiled notes section.
- <e.g. Auditors never mutate; fixers mutate only after a plan is approved.>

## Commands
```bash
<VERIFY_COMMAND>
<DEV_COMMAND>
```
