<!-- TEMPLATE — How to use (FRAMEWORK.md §C11.4):
  A subagent runs an ISOLATED task with its own context window + a restricted tool-set.
  Use it when a pass would pollute the main thread (heavy search) or must be constrained
  (e.g. a READ-ONLY auditor that can never write). Place at:
    .claude/agents/<name>.md     (project)   OR   ~/.claude/agents/<name>.md (personal)
  The `description` drives automatic delegation; `tools` whitelists what it may call.
  Replace <PLACEHOLDER>s and delete this comment. -->
---
name: <subagent-name>
description: <What this agent specializes in>. Use when <when to delegate to it>.
tools: Read Grep Glob Bash(grep -r:*)        # whitelist ONLY what it needs (omit Write/Edit for read-only agents)
model: inherit                                # or a specific model id
# skills: <skill-a> <skill-b>                 # preload skills the agent can reference
# disable-auto-delegation: true               # require explicit invocation
---

You are <role>. Your job is <single, well-scoped responsibility>.

## Operating rules
- <hard boundary — e.g. "READ-ONLY: never call Write/Edit or any create_* tool.">
- Work from <the source of truth>; when a doc disagrees with live state, trust live state.

## Method
1. <step>
2. <step>

## Output contract
Return <exactly what the caller needs> — e.g. a findings list (id · severity · evidence · recommendation),
NOT a narrative. Your final message IS the result handed back to the caller.
