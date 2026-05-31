<!-- TEMPLATE — How to use:
  This is the workspace map + operating rules for your project root. It is the FIRST file you
  write (FRAMEWORK.md §C1, step 1). Replace every <PLACEHOLDER>. The two sections that matter most
  are "Source Hierarchy" (declare which source WINS when two disagree) and "Agent Workflow Rules".
  Delete this comment when done. -->

# CLAUDE.md

Guidance for AI agents (and humans) working in this repository. **These instructions override default behavior.**

## What This Repo Is

**<PROJECT_NAME>** is <ONE_SENTENCE_WHAT_IT_IS>. This repository is <DESIGN_WORKSPACE | PRODUCTION_CODEBASE | MONOREPO>: <ONE_LINE_PURPOSE>.

## Workspace Map

| Directory | Purpose | Has own AGENTS.md |
|-----------|---------|-------------------|
| `<dir-1>/` | <purpose> | <yes/no> |
| `<dir-2>/` | <purpose> | <yes/no> |
| `framework/` | The reusable production method + templates | — |

## Key Documents

- **Founding brief**: `<PATH/FOUNDING-BRIEF.md>` — all intent, self-contained.
- **Shared canon**: `<PATH/_shared-canon.md>` — the one place reusable patterns/tokens are defined.
- **Progress ledger**: `<PATH/_progress.md>` — every item's status.
- **Rubric + gates**: `<PATH/rubric.md>`, `<PATH/hard-gates.md>` — the quality bar.

## Source Hierarchy (when documents conflict)

Resolve conflicts in this order. **The tie-breaker is explicit:**

1. `<HIGHEST_AUTHORITY>` — canonical for <X>.
2. `<NEXT>` — canonical for <Y>.
3. `<NEXT>` — supplemental.
4. **Live truth always wins ties:** when any doc disagrees with `<THE_LIVE_SOURCE_OF_TRUTH — e.g. the running code / the deployed schema / the live design file>`, the live source is reality and the doc disagreement is itself a finding.

## Agent Workflow Rules

- **Slice the work**: review/implement in batches (see `framework/FRAMEWORK.md` §C4 for sizing). Never do all items in one pass.
- **Read before you write**: read the item's spec and the shared canon before working on it.
- **Lane discipline**: each sub-workspace has its own `AGENTS.md` — read it before working there.
- **Gate before done**: run `<VERIFY_COMMAND>` before marking any batch complete; nothing is "done" on assertion.
- **Plan-then-apply** for anything hard to reverse.
- **Persist state** in git commits + machine-readable metadata + ledgers/handoffs — never only in chat.
- <PROJECT_SPECIFIC_RULE>

## Commands

```bash
<VERIFY_COMMAND>      # the gate battery — run before marking a batch complete
<BUILD_COMMAND>       # full build — run on every 3rd batch + the foundation batch
<DEV_COMMAND>         # run locally for review/QA
```
