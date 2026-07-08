<!-- TEMPLATE — How to use:
  The session-handoff skeleton (FRAMEWORK.md move Persist (A7)). Write this at the end of every
  meaningful session so the next Claude or Codex session can continue without chat history. The canonical
  path is plans/next-session-handoff.md. Legacy .claude/plans/next-session-handoff.md may be read only as a fallback.
  Delete this comment when done. -->

# <PROJECT_NAME> — Next-Session Handoff

- Last updated: <YYYY-MM-DD HH:MM TZ>
- Status: <READY | READY WITH WAIVERS | BLOCKED>
- Current lane: <lane name>
- Active implementation root: `<path>`
- Exact next recommended slice: <one bounded unit of work>

## Read-First Order

1. `<root AGENTS.md or CLAUDE.md>`
2. `<memory/MEMORY.md + relevant memory facts>`
3. `<founding brief / source hierarchy>`
4. `<active lane AGENTS.md>`
5. `<active batch / story / work item>`
6. `<progress + findings + deferred decisions + accepted improvements>`

## Start By

```bash
cd <repo>
git log --oneline -3
git status --short
<verify or state-inspection command>
```

Expected state:
- HEAD: `<sha>` — <message>
- Worktree: <clean | intentionally dirty; explain every dirty file below>
- Verification baseline: <last command and result>

## Current State

- Phase: <current phase>
- Active batch / story / work item: <ID + title>
- Source hierarchy status: <current / drift suspected / blocked>
- One active next step: <yes/no, explain if no>

## Completed Last Session

| ID | Work completed | Evidence/source | Files/areas touched |
|----|----------------|-----------------|---------------------|
| <ID> | <what changed> | `<path or command output summary>` | `<paths>` |

## Recently Touched Files / Dirty-Worktree Cautions

| File/area | State | Caution |
|-----------|-------|---------|
| `<path>` | <committed/dirty/generated/user-owned> | <keep/review/do not touch/verify before edit> |

## Open Blockers

| ID | Severity | Owner | Blocked work | Next action | Closure condition |
|----|----------|-------|--------------|-------------|-------------------|
| <B-001> | <critical/major/minor> | <person/role> | <what cannot proceed> | <concrete next step> | <how this is unblocked> |

## Known Drift

| ID | Drift | Source of truth | Action |
|----|-------|-----------------|--------|
| <D-001> | <doc/code/memory mismatch> | `<winning source>` | <fix/log/waive> |

## Waivers

| ID | Waiver | Owner | Expiry / revisit trigger |
|----|--------|-------|--------------------------|
| <W-001> | <what is allowed despite a gap> | <owner> | <date/event> |

## Verification Log

| Command / check | Result | Evidence | Notes |
|-----------------|--------|----------|-------|
| `<command>` | <pass/fail/skipped> | `<path or summary>` | <if skipped, why and owner> |

> Passing verification is not enough if known drift exists. Use `READY WITH WAIVERS` or `BLOCKED` when drift, unresolved blockers, or skipped hard gates remain.

## Do Not Do Yet

- <constraint: work that must not start until a source, decision, owner, or verification gap is resolved>
- <constraint>

## Next Slice

Goal: <single concrete work unit>.

Inputs:
- `<path/source>`
- `<path/source>`

Expected outputs:
- `<path/artifact>`
- `<path/artifact>`

Done when:
- <observable acceptance criterion>
- <verification command/result required>
- <ledger/progress/handoff updates complete>

## Maintenance Contract

- Update this handoff whenever the active lane, active root, next slice, blocker status, waiver status, or verification baseline changes.
- Keep exactly one active next slice. Move alternatives into deferred decisions.
- Do not preserve chat-only claims. Convert durable facts into memory, ledgers, metadata, or commits.
- If this file conflicts with live state, trust live state, log drift, and update the handoff before continuing.
