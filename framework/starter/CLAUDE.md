# CLAUDE.md — this project runs on Forgeflow

**These instructions override default behavior. Read them at session start.**

This project was bootstrapped with the **Forgeflow** — a reusable, domain-agnostic method for getting high-quality output from AI models on serious work. The full method lives in `framework/FRAMEWORK.md`.

## On session start
1. **Read `framework/FRAMEWORK.md` Part A** (the 8-move method) — it is the operating method for all work here. Keep Part C open as the working reference.
2. **If the on-ramp isn't done yet, run `/onboard`.** You can tell it isn't done if the "Project specifics" section at the bottom of this file still says *(run `/onboard` to populate)*. `/onboard` follows `runbooks/onboard.md` and fills in the workspace map, the source-of-truth hierarchy, the founding brief, the capability layer, the ledgers, and the matching Codex `AGENTS.md`.
3. **If the on-ramp is done,** honor the workspace map + source hierarchy below and the non-negotiables, then resume from `plans/next-session-handoff.md` if one exists (`/start-handoff`). Use `.claude/plans/next-session-handoff.md` only as a legacy fallback.
4. **If working in Codex instead,** use `AGENTS.md` plus the `.agents/skills/forgeflow-*` skills. The same `runbooks/` files are the shared workflow source of truth.

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
- **`/handoff` + `/start-handoff`** — the survivability loop: distill state to `plans/next-session-handoff.md`, `/clear`, then resume cold and correct.
- **`/onboard`** — the one-time new-project on-ramp (`runbooks/onboard.md`, based on `FRAMEWORK.md` §C1).
- **`/adopt-existing-project`** — merge Forgeflow into a mature project without overwriting existing project guidance.
- **`/upgrade-framework`** — bring in newer framework/starter/template improvements while preserving project-local truth.
- **`/start-batch`, `/pre-development-check`, `/runtime-profiles`, `/worker-task-packet`, `/close-batch`, `/audit-docs`, `/plan-story`, `/create-work-items`, `/verify`** — operational runbooks for bounded work, pre-development documentation readiness, loop/runtime selection, explicit worker task packets, doc drift, planning, traceability, and gates.
- **Optional worker/runtime policy runbooks** — `runbooks/opencode-worker.md`, `runbooks/saved-workflows.md`, and `runbooks/gateway-router.md` document optional OpenCode worker evaluation, bounded saved Claude workflows, and future gateway/router policy. They are not defaults.
- **`knowledge-wiki` skill + `/wiki-ingest`, `/wiki-query`, `/wiki-lint`** — maintain a persistent, compounding markdown wiki from your sources so knowledge accumulates instead of being re-derived (extends A3 Reference + A7 Persist). Distinct from `memory/`: memory is small always-on facts; the wiki is a large, on-demand, navigable knowledge base.

## Memory (committed, travels with the repo)
@memory/MEMORY.md

Memory facts are point-in-time. **When memory contradicts the live code/state, trust the live state and log the drift.** Add facts using the schema and `[[name]]` linking convention documented in `memory/MEMORY.md`.

---

## Project specifics

> _(run `/onboard` to populate — workspace map, source-of-truth hierarchy + explicit tie-breaker, active implementation root, key documents, the verify command, lane rules, closeout rules, and project-specific agent rules. Until the on-ramp runs, this section is intentionally empty.)_
