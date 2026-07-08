# Forgeflow Runbook: Adopt Existing Project

Use this when Forgeflow is being activated in a repository that already has mature root guidance, commands, test patterns, auth conventions, database rules, or lane rules. This workflow merges Forgeflow into the project; it must not overwrite existing project truth.

## Required Context

- `framework/FRAMEWORK.md` Part A and §C1.
- Current root `AGENTS.md` and `CLAUDE.md`, if present.
- Existing command docs, lane guides, test docs, auth docs, DB/migration docs, deployment docs, and safety/compliance docs.
- Current repo layout from `git status --short`, `rg --files`, and nearest lane `AGENTS.md` files.
- `framework/starter/AGENTS.md`, `framework/starter/CLAUDE.md`, `framework/starter/runbooks/`, `framework/starter/.agents/`, `framework/starter/.claude/`, and `framework/starter/memory/`.
- `framework/templates/verification-matrix.md` for choosing gates by change type.
- Skill Bank registry and `OPS-04 Skill Finder`, when the source repo or team library has them.

## Steps

1. Snapshot first. Record whether root `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `runbooks/`, `memory/`, `plans/`, ledgers, and lane guides already exist. Do not edit until the existing guidance has been read.
2. Extract the project's living rules. Preserve existing commands, gotchas, test patterns, auth identity fields, DB rules, migration rules, environment conventions, deployment rules, lane rules, security constraints, and health/safety constraints.
3. Identify the source hierarchy. Declare active docs, archived docs, and the tie-breaker source. If two mature sources disagree and no tie-breaker exists, stop and ask for the owner decision before writing.
4. Activate missing starter directories only:
   - Copy missing `.agents/`, `.claude/`, `runbooks/`, and `memory/` content from `framework/starter/`.
   - If a target file already exists, merge the Forgeflow section into it instead of replacing it.
   - Keep existing project commands and skills. Add Forgeflow wrappers beside them.
5. Run a capability readiness pass. If a Skill Bank is available, use `OPS-04 Skill Finder` to identify required Skill Bank skills, useful optional skills, already-installed skills, and missing gaps. Preserve existing project skills unless the source hierarchy proves they are stale.
6. Merge root entrypoints:
   - Keep the existing `AGENTS.md` and `CLAUDE.md` project rules as primary project-specific guidance.
   - Add the Forgeflow session-start, memory, handoff, verification, and equipped-workflow sections.
   - Ensure both files agree on active root, source hierarchy, verify commands, closeout rules, lane rules, and the legacy handoff fallback.
   - Never delete project-specific gotchas unless the source hierarchy proves they are stale.
7. Seed memory facts from existing guidance. Add facts for durable project rules, especially:
   - active implementation root and lane map;
   - source hierarchy and tie-breaker source;
   - canonical verification commands;
   - auth identity fields and authorization boundaries;
   - database migration rules and rollback constraints;
   - AI/data provenance boundaries;
   - security, privacy, and health/safety constraints;
   - recurring "do not assume" gotchas.
8. Mark high-risk facts with `metadata.risk_level: critical` or `metadata.critical_invariant: true` where violating the fact could break auth, data integrity, provenance, safety, security, privacy, or production verification.
9. Create or update `plans/next-session-handoff.md`. If `.claude/plans/next-session-handoff.md` exists, migrate its live content to `plans/next-session-handoff.md` and leave the legacy path as fallback only.
10. Run the relevant verification gates. At minimum run `node framework/verify/portability-check.mjs .`; add project lint/type/test/build commands named by existing guidance.

## Expected Output

- Root `AGENTS.md` and `CLAUDE.md` that preserve existing project rules while adding Forgeflow's shared operating model.
- Activated or merged `.agents/`, `.claude/`, `runbooks/`, and `memory/` directories.
- Capability readiness brief recording selected Skill Bank skills, preserved project skills, and missing gaps.
- Memory facts seeded from existing project guidance, with critical invariants marked.
- A current `plans/next-session-handoff.md`.
- Verification evidence recorded in the handoff or active progress ledger.

## Quality Bar

- Existing project guidance is treated as evidence, not overwritten by starter defaults.
- The project keeps its own commands, gotchas, test patterns, auth conventions, DB rules, and lane rules.
- Forgeflow additions are recognizable and reusable, but the root files remain project-specific.
- Every critical invariant names how to verify it before relying on it.
- The source hierarchy answers: "If two sources disagree, which one is reality?"

## Persistence / Closeout

- Record changed files and verification evidence.
- Update memory only for facts that should guide future sessions.
- Run `node framework/verify/portability-check.mjs .`.
- If foundation files changed, update `plans/next-session-handoff.md` with current status, known drift, waivers, and next slice.

## Stop Conditions

- Stop before writing if existing root guidance cannot be read.
- Stop before merging if multiple active sources conflict and no tie-breaker exists.
- Stop before deleting or replacing project-specific instructions.
- Stop if critical auth, DB, security, privacy, provenance, or health/safety rules are unclear.
