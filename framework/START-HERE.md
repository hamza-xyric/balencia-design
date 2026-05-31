# START HERE

The **Production Framework** — a reusable, domain-agnostic method for getting high-quality output from AI models on serious work, plus the working tools to run it. Pick your situation:

| You are… | Do this |
|----------|---------|
| **Starting a new project** | `cp -r framework <project>/`, then from the project root `cp -R framework/starter/. .` to activate the payload, then run **`/onboard`**. It walks you through the on-ramp (`FRAMEWORK.md` §C1) and writes your `CLAUDE.md`, founding brief, capability layer, and ledgers. |
| **Returning to a project** | Run **`/start-handoff`** — it resumes from `.claude/plans/next-session-handoff.md`, the kickoff your last session left. (No handoff? Read `memory/MEMORY.md` and the latest commits.) |
| **Wanting to learn the method** | Read **`FRAMEWORK.md` Part A** (the 8 moves + 13 principles). Skim Part B (the Balencia case study) for a worked example; keep Part C as the working reference. |
| **Building a capability** (skill/command/team/hook/MCP) | Use the blank scaffolds in **`templates/capabilities/`** and the build loop in `FRAMEWORK.md` §C11. |
| **Mid-session, need to stop** | Run **`/handoff`** to distill state into a kickoff prompt for the next session, then `/clear`. |

> **The model:** the framework is *copy-the-folder, self-contained.* One folder carries the guide, the blank templates, a working starter payload, and a self-check. See `FRAMEWORK.md` → *"What this folder assumes, ships, and expects you to build."*

## The spine (say it out loud)
**Ground → Capture → Equip → Reference → Plan & Slice → Build → Verify → Persist.**
Large undivided tasks break; small, gated, ledgered slices compound — and the tools you build once make every future task start higher.

## File map — every file and when to use it

| Path | What it is | Reach for it when |
|------|------------|-------------------|
| `FRAMEWORK.md` | The master guide: Part A (method) · Part B (Balencia case study) · Part C (mechanics, §C1 on-ramp, §C11 capability engineering). | You want the *why* and the *how* — the canonical reference. |
| `README.md` | Quickstart: the spine, the on-ramp commands, the eight non-negotiables. | You want the short version. |
| `START-HERE.md` | This file — one-screen router + file map. | You just opened the folder. |
| `CLAUDE.md` | Orients an agent that opens **the framework folder itself** (vs. a project using it). | Auto-loads when working inside `framework/`. |
| `VERSION` | The framework version that seeded a project. | Recording or checking provenance. |
| `CHANGELOG.md` | What changed between framework versions. | Upgrading; auditing what method produced a build. |
| `templates/` | **Blank** `<PLACEHOLDER>` scaffolds for every artifact (CLAUDE.md, founding brief, ledgers, rubric, teams, verify scripts…). | Standing up a new artifact in your project — fill a *copy*, never the template. |
| `templates/capabilities/` | Blank Claude Code syntax for the Equip layer (`SKILL.md`, `slash-command.md`, `subagent.md`, `hooks.settings.json`, `.mcp.json`, `plugin.json`). | Building a *new* skill/command/subagent/hook/MCP/plugin. |
| `templates/teams/` | The six reviewer-persona briefs (blank) for the multi-role audit. | Setting up your verify lane (A6). |
| `starter/` | The **working** payload — copy its contents to your project root to activate. | New project on-ramp (the `cp -R framework/starter/. .` step). |
| `starter/CLAUDE.md` | Self-activating project root: tells a fresh session to read the method and run `/onboard`; imports `@memory/MEMORY.md`. | Becomes your project's root `CLAUDE.md`. |
| `starter/.claude/skills/research-first/SKILL.md` | The **A0 grounding skill** (Query→Execute→Synthesize→Apply, source rubric). | Any strategic/architectural decision. |
| `starter/.claude/commands/{handoff,start-handoff}.md` | The **survivability loop** — write/resume the next-session kickoff. | End of session / start of next. |
| `starter/.claude/commands/onboard.md` | The **one-time on-ramp** — runs §C1 interactively. | First session of a new project. |
| `starter/memory/` | Committed memory scaffold: `MEMORY.md` index + frontmatter schema + four worked examples. | Persisting durable facts that travel with the repo. |
| `verify/portability-check.mjs` | Self-check: scans a project for any skill/command/memory file the framework names but doesn't carry, a missing `CLAUDE.md`, or unfilled placeholders. | Before trusting a copy; after `/onboard`; in CI. |

## The eight non-negotiables
1. One self-contained **founding brief** before producing anything.
2. **Declare which source wins** when two disagree.
3. **Slice the work** — never "do it all at once."
4. **Gate everything** — automated checks + multi-role review; nothing is done on assertion.
5. **Plan-then-apply** for anything hard to reverse.
6. **Persist state** in git + metadata + ledgers/handoffs/memory — never only in chat.
7. **Truth is the deliverable** — never inflate a grade to show progress.
8. **Build your tooling** — on the 3rd repetition (or when a proven practice is missing), turn it into a skill/command/team.
