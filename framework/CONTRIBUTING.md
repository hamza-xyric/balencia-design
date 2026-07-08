# Contributing to Forgeflow

Forgeflow is a **method that travels as one self-contained folder**. Changes should keep it portable, honest, and copy-paste-ready. Read `CLAUDE.md` and `START-HERE.md` before proposing changes.

## How the repo is laid out (the one structural rule)

- **`templates/` stays blank.** Every artifact scaffold uses `<PLACEHOLDER>` / `<UPPER_CASE>` tokens — never real content. These are what a project copies and fills.
- **`starter/` holds working files.** The ready-to-drop payload (self-activating `CLAUDE.md`, `research-first` skill, `/handoff` · `/start-handoff` · `/onboard` commands, committed `memory/` scaffold). These ship as-is and must contain **no placeholders**.
- **`FRAMEWORK.md`** is the master guide: Part A (method, project-agnostic), Part B (illustrative case study), Part C (mechanics/playbooks).
- **`docs/meta/`** holds internal records — not part of the usable surface.

If you add or move a file the framework references, update `START-HERE.md`'s file map and `verify/portability-check.mjs` so nothing dangles.

## Making a change

1. Branch off `main` (`git checkout -b your-change`).
2. Make the change. Keep paths project-relative (assume the framework lives at `framework/`). No machine-specific or personal paths (`/Users/...`), no secrets.
3. **Self-check before opening a PR:**
   ```bash
   # no placeholders leaked into shipped files, no local paths
   grep -rn "<PLACEHOLDER>" starter/ && echo "FAIL: placeholder in starter" || echo "ok"
   grep -rn "/Users/" . && echo "FAIL: local path" || echo "ok"
   ```
4. Open a PR with a short rationale. Describe *why* the method changes, not just what.

## Versioning

Forgeflow follows [SemVer](https://semver.org) in `VERSION`, recorded so any project can trace which version seeded it:

- **MAJOR** — a breaking change to the method or the artifact layout.
- **MINOR** — new capabilities/sections.
- **PATCH** — fixes and clarifications.

Bump `VERSION` and add a dated entry to `CHANGELOG.md` in the same PR.
