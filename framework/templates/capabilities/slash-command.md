<!-- TEMPLATE — How to use (FRAMEWORK.md §C11.1):
  A slash command is a quick, repeatable action. Like a skill but simpler (no bundled files).
  Place at:
    .claude/commands/<name>.md       (project, shared via git)  → invoked as /<name>
    ~/.claude/commands/<name>.md      (personal, all projects)
  Subdirectories namespace it: .claude/commands/release/ship.md → /release:ship
  Substitutions in the body: $ARGUMENTS (all args), $1 $2 $3 (positional), $name (from `arguments`).
  !`cmd` injects shell output before the model runs; @path injects a file's contents.
  Replace <PLACEHOLDER>s and delete this comment. -->
---
description: <What it does>. Use when <when to run it>.    # the trigger
argument-hint: "[<arg1>] [<arg2>]"
# arguments: [env, target]            # → $env, $target
# allowed-tools: Bash(npm run build) Bash(git push:*)
# disable-model-invocation: true      # user-only (recommended for deploys/commits/messages)
# model: inherit
---

# <Command Name>

Goal: <one line>.

## Context (optional — injected before the model acts)
- Current status: !`<fast read-only command>`
- Spec: @<path/to/relevant/file>

## Steps
1. <step using $1 / $ARGUMENTS>
2. <step>
3. Verify: <how to confirm success>; if it fails, <stop / report>.

## Output
<what the user should see when done>
