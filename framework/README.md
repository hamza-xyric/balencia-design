# Production Framework

A reusable, **domain-agnostic** method for getting the most out of AI models on serious work — extracted from the Balencia design build, generalized so it works for design, backend, research, content, or infra. It travels as **one self-contained folder**: copy it into a project and it activates itself.

> **The spine:** Ground → Capture → **Equip** → Reference → Plan & Slice → Build → Verify → Persist.
> **The core lesson:** large undivided tasks break; small, gated, ledgered slices compound quality — and the tools you build once (skills, commands, teams) make every future task start at a higher floor.

## What's here

| Path | What it is |
|------|------------|
| `START-HERE.md` | **One-screen router + file map** — read this first. |
| `FRAMEWORK.md` | **The master document.** Part A = the 8-move method (project-agnostic). Part B = the Balencia pipeline (worked case study, illustrative paths). Part C = on-ramp (§C1), **Capability Engineering** (§C11 — build skills/commands/teams/subagents/hooks/MCP), feedback loops, failure-mode playbook, batch-sizing, ownership, quality mechanics. |
| `templates/` | **Blank** copy-paste scaffolds for every artifact the method uses, with `<PLACEHOLDER>` tokens. Build *new* artifacts from these. |
| `templates/capabilities/` | Blank Claude Code syntax for the Equip layer: `SKILL.md`, `slash-command.md`, `subagent.md`, `hooks.settings.json`, `.mcp.json`, `capability-build-checklist.md`, `plugin.json`. |
| `starter/` | **Working** ready-to-drop payload — copy its contents to a new project's root to activate: a self-activating `CLAUDE.md`, the `research-first` skill, the `/handoff` · `/start-handoff` · `/onboard` commands, and a committed `memory/` scaffold. |
| `verify/portability-check.mjs` | Self-check: scans a project for any file the framework names but doesn't carry, a missing `CLAUDE.md`, or unfilled placeholders. |
| `CLAUDE.md` | Orients an agent that opens the framework folder itself. |
| `VERSION` · `CHANGELOG.md` | Which framework version/method seeded a project. |

## How to use it

**New here?** Read `START-HERE.md` — a one-screen router + a map of every file.

**Reading the method:** start with `FRAMEWORK.md` Part A (the 8 moves), skim Part B (how Balencia did it — illustrative), keep Part C open as the working reference.

**Starting a new project (the on-ramp — see `FRAMEWORK.md` §C1):**

```bash
# 1. Copy the whole framework into your project (one unit: guide + templates + starter payload)
cp -r framework <new-project>/

# 2. Activate the working payload at the project root
cd <new-project> && cp -R framework/starter/. .

# 3. Run the guided on-ramp — it walks §C1 interactively and writes your artifacts:
#    CLAUDE.md → research-first findings → FOUNDING-BRIEF (via the questionnaire) →
#    equip capability gaps → domain models → empty ledgers → batch plan
/onboard

# 4. Sanity-check that nothing the framework names is left dangling
node framework/verify/portability-check.mjs .
```

**Returning to a project:** run `/start-handoff` — it resumes from `.claude/plans/next-session-handoff.md`, the kickoff your last session left.

**Per session (the survivability loop — see §C11):** do *one bounded batch* → run the verify gate → commit by explicit path → append to the ledger → ✋ checkpoint → `/handoff` → `/clear`.

## The non-negotiables

1. **One self-contained founding brief** before producing anything.
2. **Declare which source wins** when two disagree.
3. **Slice the work** — never "do it all at once."
4. **Gate everything** — automated checks + multi-role review; nothing is done on assertion.
5. **Plan-then-apply** for anything hard to reverse.
6. **Persist state** in git + metadata + ledgers/handoffs/memory — never in chat history.
7. **Truth is the deliverable** — never inflate a grade to show progress.
8. **Build your tooling** — on the 3rd repetition (or when a proven practice is missing), turn it into a skill/command/team instead of hand-crafting it again.

## Making it yours

Everything in `FRAMEWORK.md` that mentions Balencia (SIA, RPG, 60/30/10, specific file keys) is a *swappable instance*. Keep the structure and the gates; replace the nouns. See `FRAMEWORK.md` §C12 for the swap checklist, and *"What this folder assumes, ships, and expects you to build"* for what travels vs. what you build.
