<!-- TEMPLATE — How to use (FRAMEWORK.md move A2 · Equip → §C11.2):
  A Skill teaches the model a reusable METHOD it loads on demand. Place at:
    .claude/skills/<name>/SKILL.md   (project, shared via git)   OR
    ~/.claude/skills/<name>/SKILL.md (personal, all projects)
  The directory may also hold reference.md / examples.md / scripts/ that load ON DEMAND
  (progressive disclosure) — keep SKILL.md under ~500 lines.
  THE `description` IS THE TRIGGER: write WHEN to use it + the words users actually say.
  Replace <PLACEHOLDER>s and delete this comment. -->
---
name: <skill-name>                # kebab-case; defaults to the directory name
description: <What it does>. Use when <the situations + the exact phrases users say>.   # the trigger — be specific
# --- optional fields ---
# when_to_use: "Examples: <phrase>, <phrase>, <phrase>"     # extra trigger hints (description+when_to_use ≤ ~1500 chars)
# allowed-tools: Bash(npm run *) Bash(git status:*) Read Grep   # tools usable without a per-call prompt while active
# argument-hint: "[<arg>]"                                   # shown in the / autocomplete
# arguments: [target]                                        # named positional args → $target in the body
# disable-model-invocation: true                             # true = only the user can invoke via /<name> (use for side-effecting workflows)
# model: inherit                                             # or a specific model id
---

# <Skill Name>

<One line: the expertise/method this skill encodes, and the bar it holds.>

## When to use
- <trigger situation 1>
- <trigger situation 2>
(If none apply, do not invoke.)

## The method (announce each step as you go)
1. **<Step>** — <what to do / decide>.
2. **<Step>** — <…>.
3. **<Step>** — <…>.

## Decision points / variants
- If <condition> → <do X>. If <other condition> → <do Y>.

## Gotchas / anti-patterns
- <known failure mode + how to avoid it>.

## Self-check before finishing
- [ ] <gate from the rubric / hard-gates>
- [ ] <gate>

<!-- Progressive disclosure: push detail into bundled files that load only when referenced.
## Reference
See [reference.md](reference.md) for the full spec.
## Examples
See [examples.md](examples.md) for worked examples.

Dynamic context (runs BEFORE the model reads the skill; output replaces the placeholder):
## Current state
!`<a fast read-only command, e.g. git status --short>`
-->
