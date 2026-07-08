# AGENTS.md — this project runs on Forgeflow

These instructions are for Codex. They complement `CLAUDE.md`; both files describe the same Forgeflow operating system for different agent harnesses. When a project is running in Codex, Codex is the active orchestrator and uses the same runbooks, templates, ledgers, memory, verification matrix, worker packets, and handoff artifacts as Claude.

## On Session Start

1. Read `framework/FRAMEWORK.md` Part A for the 8-move method. Keep Part C available as the mechanics reference.
2. Read `memory/MEMORY.md` and any indexed facts relevant to the request. Treat memory as point-in-time context, not live truth.
3. If the "Project specifics" section below is still empty, run the onboarding workflow by using the `forgeflow-onboard` skill and `runbooks/onboard.md`.
4. If the on-ramp is done, honor the workspace map, source hierarchy, active root, verification command, lane rules, and non-negotiables below.
5. If `plans/next-session-handoff.md` exists, read it before work. If it does not exist but `.claude/plans/next-session-handoff.md` exists, treat that as a legacy fallback and migrate the next handoff to `plans/next-session-handoff.md`.
6. Before editing inside a sub-workspace, read the nearest lane `AGENTS.md`.

## Codex Surfaces

- Repo guidance lives in `AGENTS.md` files. Closer lane files override broader root guidance.
- Repo skills live in `.agents/skills/<name>/SKILL.md`. Use the `forgeflow-*` skills for shared workflows.
- Claude slash commands live in `.claude/commands/` and point to the same `runbooks/` files; they are the Claude wrapper, not a higher-priority source than Codex skills.
- Project-local Codex config or hooks, if added later, should live under `.codex/` and must be documented in the source hierarchy.

## Non-Negotiables

1. One self-contained founding brief before producing anything.
2. Declare which source wins when two disagree.
3. Slice the work; never do all items in one pass.
4. Gate everything with deterministic checks plus review; nothing is done on assertion.
5. Plan-then-apply for anything hard to reverse.
6. Persist state in git, machine-readable metadata, ledgers, handoffs, and memory; never only in chat.
7. Truth is the deliverable. Do not inflate status, grades, or readiness.
8. Build reusable tooling on the third repetition, or sooner when a proven practice is missing.

## Equipped Workflows

- `research-first` — ground strategic, architectural, product, and market decisions in cited sources.
- `forgeflow-onboard` — run the one-time project foundation setup.
- `forgeflow-adopt-existing-project` — merge Forgeflow into a mature project without overwriting local rules.
- `forgeflow-upgrade-framework` — upgrade the copied framework while preserving project-local truth.
- `forgeflow-start-batch` / `forgeflow-close-batch` — open and close bounded work batches.
- `forgeflow-pre-development-check` — verify docs, traceability, selected gates, loop/runtime intake, and worker readiness before implementation begins.
- `forgeflow-runtime-profiles` — choose the batch loop primitive and runtime profile, including Codex-native, Claude-native, GLM, DeepSeek, local Qwen MLX, and future gateway routing.
- `forgeflow-worker-task-packet` — create and review bounded worker task packets so worker output remains evidence until orchestrator verification.
- Optional worker/runtime policy runbooks: `runbooks/opencode-worker.md`, `runbooks/saved-workflows.md`, and `runbooks/gateway-router.md`. Use them for evaluation and templates only; they are not defaults.
- `forgeflow-audit-docs` — find stale, conflicting, or weak project docs.
- `forgeflow-plan-story` / `forgeflow-create-work-items` — turn intent into traceable, verifiable slices.
- `forgeflow-verify` — run and record the project's verification gates.
- `forgeflow-handoff` / `forgeflow-start-handoff` — write and resume from `plans/next-session-handoff.md`.
- `knowledge-wiki` skill + `forgeflow-wiki-ingest` / `forgeflow-wiki-query` / `forgeflow-wiki-lint` — maintain a persistent, compounding markdown wiki from your sources (distinct from `memory/`: memory is small always-on facts; the wiki is large, on-demand knowledge).

## Project Specifics

> _(run the Forgeflow onboarding workflow to populate: workspace map, source hierarchy with explicit tie-breaker, active root, key documents, verification commands, lane rules, closeout rules, and handoff rules.)_
