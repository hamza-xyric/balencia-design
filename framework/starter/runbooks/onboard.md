# Forgeflow Runbook: Onboard

## Required Context

- `framework/FRAMEWORK.md` Part A and §C1.
- `framework/templates/CLAUDE.md` and `framework/templates/AGENTS.md`.
- `framework/templates/FOUNDING-BRIEF.md` and `framework/templates/VISION-QUESTIONNAIRE.md`.
- `framework/templates/_progress.md`, `findings-ledger.md`, `deferred-decisions.md`, `accepted-improvements.md`, `rubric.md`, `hard-gates.md`, `batch-template.md`, and `next-session-handoff.md`.
- `framework/templates/verification-matrix.md`.
- Skill Bank registry and `OPS-04 Skill Finder`, when the source repo or team library has them.
- Current repo layout from `git status --short`, `rg --files`, and any existing project docs.

## Steps

1. Detect resume state. List which foundation artifacts already exist and which are incomplete.
2. Establish the project name, active implementation root, active vs archived sources, and the source hierarchy with an explicit tie-breaker.
3. Fill the root agent entrypoints: `CLAUDE.md` for Claude and `AGENTS.md` for Codex. Both must name the same active root, source hierarchy, verify commands, closeout rules, and lane rules.
4. Run the `research-first` workflow for build-shaping decisions. Persist findings in a cited doc and link it from the founding brief.
5. Fill the founding brief from the questionnaire. Mark every build-blocking decision `FINAL` or `OPEN`; every `OPEN` item must name risk, owner, blocked work, and next action.
6. Audit capability gaps. If a Skill Bank is available, run `OPS-04 Skill Finder` first and capture a readiness brief: required skills, useful optional skills, already-installed skills, missing gaps, and install commands. Decide which skills, commands, teams, hooks, MCP servers, or plugins are needed before production only after that pass.
7. Create lane guides, ledgers, rubric, hard gates, verification matrix, batch plan, and first `plans/next-session-handoff.md` from templates.
8. Seed `memory/` with the source hierarchy, durable decisions, active root, verify commands, critical invariants, and known "do not assume" warnings.

## Expected Output

- Root `CLAUDE.md` and `AGENTS.md`.
- A self-contained founding brief.
- Progress, findings, deferred-decision, accepted-improvement, rubric, hard-gate, verification-matrix, batch, and handoff artifacts.
- A capability readiness brief that records selected Skill Bank skills and any missing gaps.
- Project-specific lane `AGENTS.md` files where specialized work happens.
- Memory facts for source hierarchy, durable decisions, active root, and verification.

## Quality Bar

- The foundation is project-specific, not generic. It names real paths, owners, commands, and active sources.
- Stage 1 cannot start until every build-blocking decision is either `FINAL` or listed as an explicit blocker.
- The root agent entrypoints agree with each other.
- The source hierarchy answers: "If two sources disagree, which one is reality?"
- Critical invariants in memory identify facts agents must not violate and explain how to verify them.

## Persistence / Closeout

- Run `node framework/verify/portability-check.mjs .`.
- Record the verify result in `plans/next-session-handoff.md`.
- Commit foundation files by explicit path when the user asks to commit.

## Stop Conditions

- Stop before writing if the active implementation root cannot be identified.
- Stop before production if the founding brief, source hierarchy, or first batch plan is incomplete.
- Stop and ask if multiple sources plausibly claim top authority.
