# MEMORY.md — committed project memory (index)

This file is the **memory index**. It is imported into `CLAUDE.md` via `@memory/MEMORY.md`, so every session loads it at launch. Unlike machine-local auto-memory (`~/.claude/projects/<id>/memory/`, which does **not** travel with a repo), this `memory/` folder is committed to git and travels with the project — this is the antidote to "a copied project loses its memory."

Keep this index to **one line per fact** — no fact content here:

`- [Title](file.md) — one-line hook`

## How memory works
- **One fact per file.** Each file under `memory/` holds a single durable fact, with frontmatter.
- **Frontmatter schema:**
  ```yaml
  ---
  name: short-kebab-case-slug          # matches the filename stem
  description: one-line summary          # used to judge relevance on recall
  metadata:
    type: user | feedback | project | reference
  ---
  ```
- **Body:** state the fact plainly. For `feedback` and `project` facts, follow with **Why:** and **How to apply:** lines.
- **Linking:** link related facts with `[[their-name]]` (the other file's `name:` slug). Link liberally — a `[[name]]` with no file yet just marks one worth writing.
- **The four types:**
  - `user` — who the user is (role, expertise, preferences).
  - `feedback` — how you should work (corrections **and** confirmed approaches), with the why.
  - `project` — ongoing goals/constraints not derivable from the code or git history (convert relative dates to absolute).
  - `reference` — pointers to external resources (URLs, dashboards, tickets).
- **Naming convention:** prefix the filename with the type, e.g. `project_source-hierarchy.md`, `feedback_verify-before-done.md`.

## The one rule that keeps memory honest
Facts are **point-in-time**. **When a memory contradicts the live code/state, trust the live state and log the drift** — then fix the stale fact. If a fact names a file, function, or flag, verify it still exists before relying on it.

## What's worth persisting (and what isn't)
Save: decision facts ("we chose X over Y because Z; reversible? y/n"), integration gotchas ("tool Z does W under condition C; workaround is…"), capability learnings. Don't save what the repo already records (code structure, past fixes, git history) or what only matters to one conversation.

## Index

_Worked examples live in `examples/` — they show the shape of each fact type. Delete them once you have real facts._

- [User example](examples/user-example.md) — the shape of a `user` fact
- [Feedback example](examples/feedback-example.md) — the shape of a `feedback` fact (with Why / How to apply)
- [Project example](examples/project-example.md) — the shape of a `project` fact
- [Reference example](examples/reference-example.md) — the shape of a `reference` fact

<!-- Real facts go above this line, one per row, e.g.:
- [Source hierarchy](project_source-hierarchy.md) — the live deployed schema wins ties
- [Verify before done](feedback_verify-before-done.md) — never report "done" on assertion
-->
