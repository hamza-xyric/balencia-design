# Changelog

All notable changes to the Production Framework are recorded here. Versioning follows [SemVer](https://semver.org): **MAJOR** = a breaking change to the method or the artifact layout · **MINOR** = new capabilities/sections · **PATCH** = fixes and clarifications. A project records the version that seeded it (see `VERSION`) so its build is traceable to a method.

## 1.0.0 — 2026-05-31

First **portable, self-contained** release. The framework now travels as one folder and activates itself in a fresh project with no dependency on the origin repo's memories, plans, or external `~/.claude/` files.

### Added
- **`starter/` working payload** — copy its contents into a new project's root to activate:
  - `research-first` skill (move A0, generalized from the Balencia `research-first-workflow`).
  - `/handoff` + `/start-handoff` commands (the survivability loop), de-user-pathed to a repo-relative `.claude/plans/next-session-handoff.md`.
  - `/onboard` command — walks the §C1 on-ramp interactively (workspace map → research → founding brief → equip → domain models → ledgers → batch plan).
  - Self-activating `starter/CLAUDE.md` (imports `@memory/MEMORY.md`).
  - Committed `memory/` scaffold — `MEMORY.md` index + frontmatter schema + the `[[name]]` linking convention + four worked example facts.
- **`framework/CLAUDE.md`** — orients an agent that opens the framework folder itself.
- **`START-HERE.md`** — one-screen router + full file-map.
- **`VERSION` + `CHANGELOG.md`** — provenance for a seeded project.
- **`verify/portability-check.mjs`** — dogfoods the verify discipline: scans a project for dangling references the framework names, a missing `CLAUDE.md`, or unfilled placeholders. Exit 0/1.
- `FRAMEWORK.md`: new *"What this folder assumes, ships, and expects you to build"* section.

### Changed
- `FRAMEWORK.md`: repointed the dangling `~/.claude/...`, `/handoff`, and `research-first-workflow` references to the shipped `starter/` copies; labeled Part B's real paths illustrative; updated the §C11.7 memory note and the §C11.1 capability table to the committed-`memory/` + `@import` pattern.
- `README.md`: on-ramp updated to the single-copy `cp -r framework <project>/` + activate + `/onboard` flow.

### Notes
- Model: **copy-the-folder, self-contained** (not a plugin). A deferred plugin-packaging appendix remains optional — see `FRAMEWORK.md` §C11.6.
- The blank `templates/` are unchanged in purpose: they stay scaffolds for building *new* artifacts; `starter/` holds the *working* files. Keep the two separate.

---

_Baseline (pre-1.0.0): the `FRAMEWORK.md` guide + `templates/` were extracted from the Balencia build but referenced capabilities that lived outside the folder. See `REVIEW-AND-RECOMMENDATIONS.md` for the audit that motivated 1.0.0._
