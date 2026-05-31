# Production Framework

A reusable, **domain-agnostic** method for getting the most out of AI models on serious work — extracted from the Balencia design build, generalized so it works for design, backend, research, content, or infra.

> **The spine:** Ground → Capture → **Equip** → Reference → Plan & Slice → Build → Verify → Persist.
> **The core lesson:** large undivided tasks break; small, gated, ledgered slices compound quality — and the tools you build once (skills, commands, teams) make every future task start at a higher floor.

## What's here

| Path | What it is |
|------|------------|
| `FRAMEWORK.md` | **The master document.** Part A = the 8-move method (project-agnostic). Part B = the Balencia pipeline (worked case study with real paths). Part C = on-ramp, **Capability Engineering** (§C11 — build skills/commands/teams/subagents/hooks/MCP), feedback loops, failure-mode playbook, batch-sizing, ownership, quality mechanics, templates index. |
| `templates/` | Copy-paste starter files for every artifact the method uses. Project-agnostic, with `<PLACEHOLDER>` tokens. |
| `templates/capabilities/` | **Real Claude Code syntax** for the Equip layer: `SKILL.md`, `slash-command.md`, `subagent.md`, `hooks.settings.json`, `.mcp.json`, `capability-build-checklist.md`, `plugin.json`. |

## How to use it

**Reading it:** start with `FRAMEWORK.md` Part A (the method), skim Part B (how Balencia did it), keep Part C open as the working reference.

**Starting a new project (the on-ramp — see `FRAMEWORK.md` §C1):**

```bash
# 1. Copy the templates into your new project
cp -r framework/templates <new-project>/

# 2. In order:
#    a. Fill CLAUDE.md            → workspace map + source hierarchy + tie-breaker
#    b. Research-first            → a cited findings doc (don't skip "obvious" calls)
#    c. FOUNDING-BRIEF.md         → all intent, via VISION-QUESTIONNAIRE.md (mark each decision FINAL/OPEN)
#    d. Equip (capability gaps)   → build the skills/commands/teams you'll reuse (templates/capabilities/)
#    e. Foundational domain models → build the things downstream work depends on, FIRST
#    f. Stand up empty ledgers    → _progress.md, findings-ledger.md, AGENTS.md, rubric.md
#    g. Plan + slice              → batch the work (see §C4 sizing), then build
```

**Per session (the survivability loop — see §C11):** do *one bounded batch* → run the verify gate → commit by explicit path → append to the ledger → ✋ checkpoint → `/handoff`.

## The non-negotiables

1. **One self-contained founding brief** before producing anything.
2. **Declare which source wins** when two disagree.
3. **Slice the work** — never "do it all at once."
4. **Gate everything** — automated checks + multi-role review; nothing is done on assertion.
5. **Plan-then-apply** for anything hard to reverse.
6. **Persist state** in git + metadata + ledgers/handoffs — never in chat history.
7. **Truth is the deliverable** — never inflate a grade to show progress.
8. **Build your tooling** — on the 3rd repetition (or when a proven practice is missing), turn it into a skill/command/team instead of hand-crafting it again.

## Making it yours

Everything in `FRAMEWORK.md` that mentions Balencia (SIA, RPG, 60/30/10, specific file keys) is a *swappable instance*. Keep the structure and the gates; replace the nouns. See `FRAMEWORK.md` §C12 for the swap checklist.
