# CLAUDE.md — this project runs on the Production Framework

**These instructions override default behavior. Read them at session start.**

This project was bootstrapped with the **Production Framework** — a reusable, domain-agnostic method for getting high-quality output from AI models on serious work. The full method lives in `framework/FRAMEWORK.md`.

## On session start
1. **Read `framework/FRAMEWORK.md` Part A** (the 8-move method) — it is the operating method for all work here. Keep Part C open as the working reference.
2. **If the on-ramp isn't done yet, run `/onboard`.** You can tell it isn't done if the "Project specifics" section at the bottom of this file still says *(run `/onboard` to populate)*. `/onboard` walks `FRAMEWORK.md` §C1 interactively and fills in the workspace map, the source-of-truth hierarchy, the founding brief, the capability layer, and the ledgers.
3. **If the on-ramp is done,** honor the workspace map + source hierarchy below and the non-negotiables, then resume from `.claude/plans/next-session-handoff.md` if one exists (`/start-handoff`).

## The non-negotiables (from FRAMEWORK.md)
1. **One self-contained founding brief** before producing anything.
2. **Declare which source wins** when two disagree (source hierarchy + explicit tie-breaker).
3. **Slice the work** — never "do it all at once."
4. **Gate everything** — automated checks + multi-role review; nothing is done on assertion.
5. **Plan-then-apply** for anything hard to reverse.
6. **Persist state** in git + machine-readable metadata + ledgers/handoffs/memory — never only in chat.
7. **Truth is the deliverable** — never inflate a grade to show progress.
8. **Build your tooling** — on the 3rd repetition (or when a proven practice is missing), turn it into a skill/command/team instead of hand-crafting it again.

## Equipped capabilities (shipped with the starter)
- **`research-first` skill** — ground decisions in 3+ cited sources before deciding (move A0).
- **`/handoff` + `/start-handoff`** — the survivability loop: distill state to `.claude/plans/next-session-handoff.md`, `/clear`, then resume cold and correct.
- **`/onboard`** — the one-time new-project on-ramp (`FRAMEWORK.md` §C1).

## Memory (committed, travels with the repo)
@memory/MEMORY.md

Memory facts are point-in-time. **When memory contradicts the live code/state, trust the live state and log the drift.** Add facts using the schema and `[[name]]` linking convention documented in `memory/MEMORY.md`.

---

## Project specifics

> _(run `/onboard` to populate — workspace map, source-of-truth hierarchy + explicit tie-breaker, key documents, the verify command, and project-specific agent rules. Until the on-ramp runs, this section is intentionally empty.)_
