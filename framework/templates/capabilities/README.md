# Capability templates (the Equip layer)

Real, copy-pasteable **Claude Code** starter files for move **A2 · Equip** (FRAMEWORK.md §C11). The *principles* are platform-agnostic; these *files* use Claude Code syntax so they drop straight into a live `.claude/`.

## Which one do I build? (decision table — FRAMEWORK.md §C11.1)

| Capability | Use for | When | Template |
|------------|---------|------|----------|
| **CLAUDE.md memory** | always-on facts (commands, conventions, source hierarchy) | every session must know it | `../CLAUDE.md` |
| **Skill** | a multi-step method/expertise loaded on demand | a procedure recurs / encode a best practice | `SKILL.md` |
| **Slash command** | a quick single action | like a skill, no bundled files | `slash-command.md` |
| **Subagent** | an isolated pass with restricted tools | would pollute the main thread / must be constrained | `subagent.md` |
| **Hook** | automatic-on-event automation | "always do X on event Y" | `hooks.settings.json` |
| **MCP server** | reach an external system | must read/write Figma, GitHub, a DB… | `.mcp.json` |
| **Plugin** | ship the whole bundle | reuse across projects/teams | `plugin.json` |

*memory = always-on facts · skill = a method · command = a quick action · subagent = an isolated pass · hook = automatic-on-event · MCP = reach outside · plugin = ship the bundle.*

## The loop for building any of them (§C11.2)
**Research → Extract → Templatize → Test → Wire.** The `description` IS the trigger — write *when* to invoke it and the words users actually say. Track each build with `capability-build-checklist.md`.

> Note: `SKILL.md`, `slash-command.md`, and `subagent.md` are Markdown with YAML frontmatter. `hooks.settings.json`, `.mcp.json`, and `plugin.json` are real JSON with a `_comment`/`_layout` key you delete after copying (they're docs, not schema). Validate with `python3 -c "import json;json.load(open('<file>'))"`.
