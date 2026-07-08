# Forgeflow Runbook: Upgrade Framework

Use this when a project already runs Forgeflow and wants to bring in a newer copied `framework/` folder. Upgrade the method and shipped starter/template improvements without overwriting project-local truth.

## Required Context

- Local `framework/VERSION` and `framework/CHANGELOG.md`.
- Upstream Forgeflow `VERSION`, `CHANGELOG.md`, and changed files.
- Current root `AGENTS.md`, `CLAUDE.md`, `memory/`, `plans/`, ledgers, lane guides, and project-specific commands/skills.
- Current repo state from `git status --short` and `rg --files`.
- Any legacy `.claude/plans/next-session-handoff.md`.

## Steps

1. Confirm upgrade scope. Compare local `framework/VERSION` to upstream `VERSION`, read all intervening changelog entries, and list changed files before editing.
2. Classify changes:
   - Framework-owned: `framework/FRAMEWORK.md`, `framework/START-HERE.md`, `framework/README.md`, `framework/templates/`, `framework/starter/`, `framework/verify/`, `framework/VERSION`, and `framework/CHANGELOG.md`.
   - Project-local: root `AGENTS.md`, root `CLAUDE.md`, `memory/`, `plans/`, ledgers, filled artifacts, lane guides, app code, project commands, and project skills.
3. Preserve project-local truth. Do not overwrite `memory/`, `plans/`, ledgers, root guidance, filled templates, or lane guides. Merge only the new Forgeflow sections that the project lacks.
4. Replace or merge framework-owned files from upstream. Keep `templates/` blank and `starter/` working. Do not turn Forgeflow into a package dependency.
5. Apply starter improvements selectively to activated projects:
   - Add missing workflow wrappers and runbooks.
   - Merge root `AGENTS.md` / `CLAUDE.md` additions without deleting project rules.
   - Add new memory schema conventions without changing live facts unless each fact is reverified.
   - Add new templates under the project only when the project needs them; otherwise leave them in `framework/templates/`.
6. Migrate legacy handoff path. If `.claude/plans/next-session-handoff.md` exists and `plans/next-session-handoff.md` does not, copy the live handoff to `plans/next-session-handoff.md`. After migration, all workflows write the canonical path and read the legacy path only as fallback.
7. Run verification:
   - `node framework/verify/portability-check.mjs framework/starter`
   - `node framework/verify/portability-check.mjs .`
   - project-specific lint/type/test/build commands from root guidance.
8. Record the upgrade. Update handoff/progress with old version, new version, changed framework files, activated starter changes, verification evidence, waivers, and remaining drift.

## Expected Output

- Updated `framework/` folder at the chosen upstream version.
- Project-local `memory/`, `plans/`, ledgers, root guidance, lane guides, and filled artifacts preserved.
- Missing starter workflows added or merged into the activated project.
- Canonical `plans/next-session-handoff.md` in place.
- Verification evidence recorded.

## Quality Bar

- The upgrade is explainable from the version diff and changelog.
- Project-specific guidance keeps authority over generic starter text.
- Framework-owned improvements are brought forward without breaking copy-the-folder portability.
- Legacy `.claude/plans/next-session-handoff.md` is not treated as the active write path after migration.

## Persistence / Closeout

- Record local version, upstream version, changed files, commands run, results, and any waivers.
- Add durable upgrade lessons to memory only when they apply to future upgrades.
- Leave the worktree with no accidental deletion of project-local guidance.

## Stop Conditions

- Stop if upstream and local versions cannot be identified.
- Stop before overwriting project-local `memory/`, `plans/`, ledgers, root `AGENTS.md`, root `CLAUDE.md`, or lane guides.
- Stop if the changed-file list contains files outside expected framework-owned paths.
- Stop if verification fails and no owner-approved waiver exists.
