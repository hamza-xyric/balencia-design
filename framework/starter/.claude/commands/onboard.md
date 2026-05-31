---
description: Bootstrap a new project on the Production Framework — interactively walk the §C1 on-ramp (workspace map → research → founding brief → equip → domain models → ledgers → batch plan), writing each artifact from framework/templates/. Use once, when starting a new project.
argument-hint: "[project-name]"
disable-model-invocation: true
---

# /onboard — New-Project On-Ramp

Goal: stand up a new project on the Production Framework by running **`framework/FRAMEWORK.md` §C1 in order**, gating each decision with `AskUserQuestion` and writing each artifact from `framework/templates/`. Do the steps **in order** — later steps depend on earlier ones. Announce each step as you go.

## Before you start
- Read `framework/FRAMEWORK.md` Part A (the method) and §C1 (the canonical on-ramp sequence). This command operationalizes §C1; if the two ever disagree, **§C1 wins**.
- **Detect resume state:** check which artifacts already exist (`CLAUDE.md`, a founding brief, `memory/MEMORY.md`, the ledgers). Skip completed steps and pick up at the first incomplete one. Tell the user where you're resuming.
- Project name: use `$1` if provided, otherwise ask.

## The on-ramp — each step: confirm intent (`AskUserQuestion`) → write artifact from a template → verify the file exists

1. **Workspace map first — `CLAUDE.md` at the repo root.** From `framework/templates/CLAUDE.md`. The two sections that matter most: the **Source-of-Truth Hierarchy** (ordered authorities + the explicit tie-breaker — decide *now* which file is "reality") and the **Agent Workflow Rules**. Ask the user for the directory map, the top authority, and the tie-breaker. Fill every `<PLACEHOLDER>`; delete the template comment.

2. **Ground (A0).** Run the `research-first` skill for the strategic/architectural questions this project turns on; produce a cited findings doc. Don't skip "obvious" calls. Ask the user to confirm which questions are worth grounding.

3. **Capture (A1) — the founding brief.** From `framework/templates/FOUNDING-BRIEF.md`, driven by `framework/templates/VISION-QUESTIONNAIRE.md`. Walk the questionnaire with `AskUserQuestion`; mark **every** decision **FINAL** (locked, do not re-litigate) or **OPEN** (uncertain, enumerated as a risk). The brief must be self-contained: scope (what this IS / is NOT), vocabulary, every token/constant value, reusable patterns, the batch plan, the anti-patterns, and the acceptance checklist.

4. **Audit capability gaps & Equip (A2).** Ask: *what will this project do repeatedly, and which proven practices do we lack?* Produce a short capability-gaps list (Skills / Commands / Teams / Hooks / MCP). Build the highest-leverage ones *before* production — don't start with an empty `.claude/`. At minimum: a research skill (**already shipped — `research-first`**), the per-item method skill, the reviewer-team personas (`framework/templates/teams/`), and `/handoff` (**already shipped**). Use the build loop (research → extract → templatize → test → wire) and `framework/templates/capabilities/`.

5. **Build the foundational domain models** that downstream work depends on, and name them in the source hierarchy. Ask the user to enumerate them.

6. **Stand up empty infrastructure.** Create the empty ledgers (`_progress.md`, `findings-ledger.md`), the per-lane `AGENTS.md` files, the rubric and hard-gates, and the batch plan/index — all from `framework/templates/`.

7. **Define the lanes and their order** (`framework/FRAMEWORK.md` §C5). Only now begin production (Stage 1).

## Exit gate — the Discovery → first-build handoff contract
Production may not begin until the handoff payload is complete:
(a) the self-contained founding brief · (b) the list of FINAL decisions · (c) the source hierarchy with tie-breaker · (d) the initial batch table (which items in which batch) · (e) the anti-pattern list.

**Acceptance check:** every decision that blocks the first build is FINAL; all OPEN decisions are enumerated as explicit risks.

## When done
- **Seed memory:** write the first facts into `memory/` (see `memory/MEMORY.md` for the schema and the `[[name]]` linking convention) — at minimum the FINAL decisions and the source hierarchy.
- **Self-verify:** run `node framework/verify/portability-check.mjs .` to confirm nothing the framework names is left dangling and no `<PLACEHOLDER>` remains in the filled artifacts.
- Print a short summary of what was created and the first batch to run.
