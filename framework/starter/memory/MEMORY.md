# MEMORY.md — committed project memory (index)

This file is the **memory index**. It is imported into `CLAUDE.md` via `@memory/MEMORY.md`, and Codex is instructed from `AGENTS.md` to read it at session start. Unlike machine-local Claude or Codex memories, this `memory/` folder is committed to git and travels with the project.

Keep this index to **one line per fact**:

`- [Title](file.md) — one-line hook`

## How Memory Works

- **One fact per file.** Each file under `memory/` holds a single durable fact with frontmatter.
- **Frontmatter schema:**
  ```yaml
  ---
  name: short-kebab-case-slug
  description: one-line summary
  metadata:
    type: user | feedback | project | reference
    status: active | stale | historical
    risk_level: normal | high | critical
    critical_invariant: false
    last_verified: YYYY-MM-DD
  ---
  ```
- Set `risk_level: critical` or `critical_invariant: true` for facts future agents must not violate: auth identity fields, tenant boundaries, provenance boundaries, canonical verification commands, security constraints, DB migration rules, health/safety boundaries, or other production non-negotiables.
- **Body:** state the fact plainly. For `feedback` and `project` facts, include **Why**, **How to apply**, and **Verify before relying** lines.
- **Linking:** link related facts with `[[their-name]]`.
- **Naming convention:** prefix the filename with the type, e.g. `project_source-hierarchy.md`, `feedback_verify-before-done.md`.

## Fact Types

- `user` — who the user is: role, expertise, preferences, approval style.
- `feedback` — how agents should work: corrections, recurring preferences, confirmed approaches.
- `project` — durable decisions, active app/root, source hierarchy, current phase constraints, migration/cutover facts, or "do not assume" warnings not derivable from live code.
- `reference` — pointers to external resources, dashboards, tickets, docs, or systems.

## What Belongs Here

Save:
- Durable decisions and their source of authority.
- Current phase, active app/root, and source hierarchy when they are stable enough to guide future sessions.
- Verification lessons that future agents must repeat.
- Critical invariants that would cause auth, provenance, data integrity, security, privacy, safety, or production-readiness harm if violated.
- Known blockers, stale-doc warnings, and "future agents must not assume" facts when they will recur.

Do not save:
- Old prompts or legacy workflow instructions as active truth.
- Git history, code structure, or one-off fixes already recorded elsewhere.
- Chat-only speculation or unresolved ideas without owner/next action.

## The Honesty Rule

Facts are **point-in-time**. When memory contradicts live code, live docs, git, or the current source hierarchy, trust the live state and log the drift in the relevant ledger or handoff. Then mark the memory `stale` or update it with fresh verification evidence.

Critical memory is not magic. Even a `critical_invariant` loses to verified live code and the declared source hierarchy, but contradictions must be treated as drift: record what disagreed, which source won, who owns the update, and what verification proved the new truth.

## Index

_Worked examples live in `examples/` — they show the shape of each fact type. Delete them once you have real facts._

- [User example](examples/user-example.md) — the shape of a `user` fact
- [Feedback example](examples/feedback-example.md) — the shape of a `feedback` fact
- [Project example](examples/project-example.md) — the shape of a `project` fact
- [Reference example](examples/reference-example.md) — the shape of a `reference` fact

<!-- Real facts go above this line, one per row, e.g.:
- [Source hierarchy](project_source-hierarchy.md) — live schema wins ties over generated docs
- [Active implementation root](project_active-root.md) — production work happens in apps/web, not archived prototypes
- [Verify before done](feedback_verify-before-done.md) — never report done without gate evidence
-->
