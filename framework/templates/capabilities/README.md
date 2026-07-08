# Capability Templates (Equip Layer)

Forgeflow's principles are agent-harness agnostic, but the files land in different places depending on the tool. The shared runbook is the source of the workflow; Claude commands and Codex skills are equal wrappers around it.

## Which One Do I Build?

| Capability | Use for | Claude Code location | Codex location |
|------------|---------|----------------------|----------------|
| Always-on repo guidance | Rules every session must load | `CLAUDE.md` | `AGENTS.md` |
| Skill | Multi-step method/expertise loaded on demand | `.claude/skills/<name>/SKILL.md` | `.agents/skills/<name>/SKILL.md` |
| Slash command / workflow shortcut | Quick repeatable action | `.claude/commands/<name>.md` pointing to a shared runbook | `.agents/skills/forgeflow-<name>/SKILL.md` pointing to the same shared runbook; Codex slash commands are built-ins |
| Worker task packet | Bounded worker delegation with evidence-only output | `/worker-task-packet` plus `templates/worker-task-packet.md` | `forgeflow-worker-task-packet` plus `templates/worker-task-packet.md` |
| Saved Claude workflow | Bounded workflow or `ultracode:` template after a small first run | `claude-saved-workflow.md` copied into project capability docs | Record as project capability docs, not hidden config |
| OpenCode worker example | Optional worker harness evaluation with local/provider placeholders | `opencode-worker.example.jsonc` copied only into a governed sandbox project | Same example; keep it out of active repo root config until adopted |
| Subagent / reviewer | Isolated pass with constrained scope | `.claude/agents/<name>.md` | Codex subagent workflow or skill-backed reviewer prompt |
| Hook | Automatic-on-event automation | `.claude/settings.json` hooks | `.codex/hooks.json` or `.codex/config.toml` hooks |
| MCP server | External system access | `.mcp.json` / Claude MCP config | `.codex/config.toml` MCP or installed plugin |
| Plugin | Ship a bundle | `.claude-plugin/plugin.json` | `.codex-plugin/plugin.json` plus marketplace entry |

One-liner: guidance = always-on rules; skill = reusable method; command/runbook = repeatable operation; packet = bounded worker contract; saved workflow = proven bounded automation; subagent = isolated pass; hook = automatic-on-event; MCP = external reach; plugin = distribution.

## Build Loop

Use **Research → Extract → Templatize → Test → Wire**.

- Research the best practice or recurring workflow.
- Extract the minimum stable method.
- Templatize the trigger, context, steps, output, quality bar, persistence, and stop conditions.
- Test on a real task.
- Wire it into the right harness surface.

The `description` is the trigger. Write when to invoke it and the words users actually say.

## Shared Runbook Pattern

For workflows that must work in both Claude and Codex, put the canonical instructions in `runbooks/<workflow>.md`.

- Claude command: small `.claude/commands/<workflow>.md` wrapper that says to read the runbook.
- Codex skill: small `.agents/skills/forgeflow-<workflow>/SKILL.md` wrapper that says to read the runbook.
- Verifier: require both wrappers and the runbook so the two harnesses cannot drift silently.

## Validation

JSON templates (`hooks.settings.json`, `.mcp.json`, `plugin.json`) contain `_comment`/`_layout` keys for documentation. Delete those keys after copying and validate with:

```bash
python3 -c "import json;json.load(open('<file>'))"
```

`opencode-worker.example.jsonc` is an example, not active config. Copy it only
into a project that has chosen OpenCode as a governed worker harness.
