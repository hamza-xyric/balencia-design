# Changelog

All notable changes to Forgeflow are recorded here. Versioning follows [SemVer](https://semver.org): **MAJOR** = a breaking change to the method or the artifact layout · **MINOR** = new capabilities/sections · **PATCH** = fixes and clarifications. A project records the version that seeded it (see `VERSION`) so its build is traceable to a method.

## 1.5.0 — 2026-07-01

GLM workflow-worker bridge: GLM can now act as a cheap sub-worker *inside* a
`Workflow` script's `agent()` calls, with Claude remaining the orchestrator —
distinct from the `glm-coding-backend` runtime profile, which routes the
whole session to GLM.

### Added
- `starter/scripts/glm-worker.sh` — calls the GLM Coding Plan API directly
  (Anthropic Messages format against `api.z.ai/api/anthropic`), reusing
  `ZAI_API_KEY` from `~/.xyric/framework.env`. Supports `--ping` health check.
- `starter/runbooks/glm-workflow-worker.md` — the `glm()` Workflow-script
  helper snippet, cost model (when GLM pays off vs. keep on Claude), and
  non-negotiable guardrails (evidence-only output, no sensitive data, no
  committed secrets).
- `verify/portability-check.mjs` now requires both new files and checks
  `START-HERE.md` references `glm-workflow-worker`.

### Notes
- Supersedes an unreviewed, uncommitted scratch note (`PLAYGROUND/glm-in-workflows.md`)
  that referenced a script that didn't exist and a macOS-Keychain key
  convention inconsistent with `scripts/use-profile.sh`'s `~/.xyric/framework.env`.
  That note is removed; this is the real, tested implementation.

## 1.4.0 — 2026-07-01

Runtime-profile + credential-setup upgrade: Forgeflow now has first-class loop/runtime-profile selection, bounded worker delegation, and a one-time global API-key mechanism so provider keys don't need re-setup on every project this framework is copied into.

### Added
- `starter/runbooks/runtime-profiles.md`, `/runtime-profiles`, and `forgeflow-runtime-profiles` for selecting a batch's loop primitive and runtime profile as a first-class Forgeflow mechanism.
- `starter/runbooks/pre-development-check.md`, `/pre-development-check`, and `forgeflow-pre-development-check` for proving docs, traceability, verification gates, and worker readiness before implementation begins.
- Runtime profiles for `claude-native`, Z.ai Coding Plan-backed `glm-coding-backend`, direct DeepSeek API `deepseek-coding-backend`, `local-qwen-mlx` / future local LLM workers, and future `gateway-router` routing.
- `starter/runbooks/worker-task-packets.md`, `/worker-task-packet`, `forgeflow-worker-task-packet`, and `templates/worker-task-packet.md` for bounded worker delegation with evidence-only output until orchestrator verification.
- `starter/runbooks/opencode-worker.md` plus `templates/capabilities/opencode-worker.example.jsonc` for optional OpenCode worker-harness evaluation, including Ollama/local Qwen placeholders without committing active user config.
- `starter/runbooks/saved-workflows.md` plus `templates/capabilities/claude-saved-workflow.md` for bounded saved Claude workflow and `ultracode:` templates.
- `starter/runbooks/gateway-router.md` for future-only gateway/router policy covering LiteLLM, Portkey, OpenCode server, custom router, and local-only routing.
- `starter/scripts/framework.env.example` and `starter/scripts/use-profile.sh` — a global, per-machine provider-key file (`~/.xyric/framework.env`) plus a sourced loader (`source scripts/use-profile.sh native|glm|deepseek`) so GLM/DeepSeek keys are set up once and reused across every project, instead of re-typed per copy.
- `starter/.gitignore` so a project that adopts Forgeflow ignores a stray local `.env` at the project root (the repo-root `.gitignore` doesn't travel with `cp -R starter/. .`).

### Changed
- `start-batch` now records the pre-development gate result plus loop primitive, runtime profile, orchestrator role, worker backend, verify command, evidence path, usage/quota guard, and closeout writes before work begins.
- The batch and Blueprint segment templates now carry loop/runtime intake fields and require worker evidence verification when a worker backend is used.
- The verification matrix now includes pre-development, worker delegation, saved workflow, and gateway/router rows for active-source checks, traceability, runtime intake, packet evidence, small first runs, and stop conditions.
- Loop overlays are now part of Forgeflow's own mechanics instead of a Skill Bank dependency.
- `runtime-profiles.md`'s `glm-coding-backend`, `deepseek-coding-backend`, and `claude-native` setup notes now lead with the `scripts/use-profile.sh` one-liner, keeping the manual `export` blocks as a documented fallback.
- `README.md` / `START-HERE.md` on-ramp now includes the one-time global env-file setup step.
- `verify/portability-check.mjs` now requires `scripts/framework.env.example` and `scripts/use-profile.sh`.

## 1.3.0 — 2026-06-20

Knowledge Wiki capability: Forgeflow can now build and maintain a persistent, compounding markdown wiki from your sources — interlinked pages the agent writes and keeps current — so knowledge accumulates instead of being re-derived on every query. It complements `memory/` (small always-on facts) with a large, on-demand, navigable knowledge base, and applies equally to mapping a codebase you are working in.

### Added
- `knowledge-wiki` skill (mirrored under `starter/.claude/skills/` and `starter/.agents/skills/`) — the discipline: three layers (raw sources / wiki / schema), the `wiki/index.md` + `wiki/log.md` conventions, the `memory/` vs `wiki/` boundary, an honesty rule (the live source wins; lint catches drift), and a repo-mapping lens.
- `starter/runbooks/wiki-ingest.md`, `/wiki-ingest`, and `forgeflow-wiki-ingest` — read a source, summarize it, propagate page updates, refresh the index, and log it.
- `starter/runbooks/wiki-query.md`, `/wiki-query`, and `forgeflow-wiki-query` — index-first, cited answers that can be filed back into the wiki.
- `starter/runbooks/wiki-lint.md`, `/wiki-lint`, and `forgeflow-wiki-lint` — health-check contradictions, stale claims, orphans, and gaps.

### Changed
- `START-HERE.md` router and file map, and the starter `CLAUDE.md` / `AGENTS.md` capability lists, now reference the knowledge-wiki skill and the three wiki operations.
- `verify/portability-check.mjs` now includes the three wiki workflows and the knowledge-wiki skill files in its required-file and `START-HERE.md` coverage checks.

## 1.2.0 — 2026-06-07

Existing-project adoption upgrade: Forgeflow now handles mature repos that already have project-specific Claude/Codex guidance, and adds explicit upgrade, verification, memory, domain-review, and docs-drift mechanics.

### Added
- `starter/runbooks/adopt-existing-project.md`, `/adopt-existing-project`, and `forgeflow-adopt-existing-project` for merging Forgeflow into mature projects without overwriting existing root `AGENTS.md` / `CLAUDE.md`.
- `starter/runbooks/upgrade-framework.md`, `/upgrade-framework`, and `forgeflow-upgrade-framework` for comparing versions, preserving project-local truth, and migrating framework/starter/template improvements.
- `templates/verification-matrix.md` with change-type rows for backend/API, frontend/UI, DB migration, docs/framework, AI/data provenance, auth/security, and health/safety.
- Optional domain reviewer packs under `templates/teams/packs/`.

### Changed
- Memory schema now includes `risk_level` and `critical_invariant` conventions for facts future agents must not violate.
- Docs audit guidance now requires active docs, archived docs, and the tie-breaker source, with stronger checks for dated plans/logs being mistaken for live truth.
- Verification runbook now starts from the verification matrix and records manual-review lens, evidence location, and stop-condition status.
- `START-HERE.md`, `README.md`, and team docs now reference the new workflows, matrix, and packs.
- `verify/portability-check.mjs` now includes the new shipped workflows, checks `START-HERE.md` coverage, and scans shipped starter files for placeholders from activated project roots.

## 1.1.0 — 2026-06-07

Dual-harness operations upgrade: Forgeflow now ships useful foundations for both Claude Code and Codex, and the operational artifacts force stronger handoffs, ledgers, verification, and multi-agent review.

### Added
- `starter/AGENTS.md` for Codex repo guidance.
- Codex-native repo skills under `starter/.agents/skills/`, including `research-first` and `forgeflow-*` workflow wrappers.
- Shared `starter/runbooks/` for onboarding, handoff, start-handoff, start-batch, close-batch, docs audit, story planning, work-item creation, and verification.
- Claude command wrappers for the new operational workflows.
- `templates/deferred-decisions.md` and `templates/accepted-improvements.md`.

### Changed
- Canonical handoff path is now `plans/next-session-handoff.md`; `.claude/plans/next-session-handoff.md` is legacy fallback only.
- Handoff, progress, findings, memory, lane, and team templates now require owner, blocked work, next action, closure condition, verification evidence, drift/waiver status, dirty-worktree cautions, and one exact next slice.
- Capability docs now distinguish Claude `.claude/*` from Codex `AGENTS.md`, `.agents/skills/*`, `.codex/hooks.json`, `.codex/config.toml`, and `.codex-plugin/plugin.json`.
- `verify/portability-check.mjs` now checks required dual-harness files, runbooks, handoff sections, stale handoff path references, and placeholders.

## 1.0.1 — 2026-06-04

First **public release**, named **Forgeflow**. Shareability pass — no method changes.

### Changed
- Named the framework **Forgeflow** (was the working title "Production Framework") throughout.
- Moved the internal meta-docs to `docs/meta/` (`IMPLEMENTATION-PROMPT.md`, `REVIEW-AND-RECOMMENDATIONS.md`) and sanitized all machine-specific paths to `<PROJECT_ROOT>` / `<USER_HOME>`.
- Renamed the starter workspace file to the generic `project.code-workspace`.
- `README.md`: on-ramp updated for the standalone-repo flow (`git clone … framework`) and a "For teams" section added.

### Added
- `LICENSE` (MIT), `CONTRIBUTING.md`, and a `.gitignore`.

## 1.0.0 — 2026-05-31

First **portable, self-contained** release. The framework now travels as one folder and activates itself in a fresh project with no dependency on the origin repo's memories, plans, or external `~/.claude/` files.

### Added
- **`starter/` working payload** — copy its contents into a new project's root to activate:
  - `research-first` skill (move A0, generalized from the Balencia `research-first-workflow`).
  - `/handoff` + `/start-handoff` commands (the survivability loop), de-user-pathed to a repo-relative `.claude/plans/next-session-handoff.md` path at the time; newer projects use canonical `plans/next-session-handoff.md`.
  - `/onboard` command — walks the §C1 on-ramp interactively (workspace map → research → founding brief → equip → domain models → ledgers → batch plan).
  - Self-activating `starter/CLAUDE.md` (imports `@memory/MEMORY.md`).
  - Committed `memory/` scaffold — `MEMORY.md` index + frontmatter schema + the `[[name]]` linking convention + four worked example facts.
- **`framework/CLAUDE.md`** — orients an agent that opens the framework folder itself.
- **`START-HERE.md`** — one-screen router + full file-map.
- **`VERSION` + `CHANGELOG.md`** — provenance for a seeded project.
- **`verify/portability-check.mjs`** — dogfoods the verify discipline: scans a project for dangling references the framework names, a missing `CLAUDE.md`, or unfilled placeholders. Exit 0/1. Expanded in 1.1.0 for dual-harness checks.
- `FRAMEWORK.md`: new *"What this folder assumes, ships, and expects you to build"* section.

### Changed
- `FRAMEWORK.md`: repointed the dangling `~/.claude/...`, `/handoff`, and `research-first-workflow` references to the shipped `starter/` copies; labeled Part B's real paths illustrative; updated the §C11.7 memory note and the §C11.1 capability table to the committed-`memory/` + `@import` pattern.
- `README.md`: on-ramp updated to the single-copy `cp -r framework <project>/` + activate + `/onboard` flow.

### Notes
- Model: **copy-the-folder, self-contained** (not a plugin). A deferred plugin-packaging appendix remains optional — see `FRAMEWORK.md` §C11.6.
- The blank `templates/` are unchanged in purpose: they stay scaffolds for building *new* artifacts; `starter/` holds the *working* files. Keep the two separate.

---

_Baseline (pre-1.0.0): the `FRAMEWORK.md` guide + `templates/` were extracted from the Balencia build but referenced capabilities that lived outside the folder. See `docs/meta/REVIEW-AND-RECOMMENDATIONS.md` for the audit that motivated 1.0.0._
