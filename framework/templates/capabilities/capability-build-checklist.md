<!-- TEMPLATE — How to use (FRAMEWORK.md move A2 · Equip → §C11.2):
  Run this checklist whenever the "rule of three" fires (you're about to do something a 3rd time,
  or a proven external practice exists and you lack it). It ensures a capability is researched,
  templatized, tested, and WIRED before you rely on it — not a one-off prompt. Copy one per capability. -->

# Capability Build — <capability name>

- **Type**: Skill | Command | Subagent | Hook | MCP | Plugin   (smallest that solves it — see §C11.1 decision table)
- **Trigger that prompted it**: <"did X a 3rd time" | "best practice Y exists, we lack it">

## Build loop
- [ ] **Hunt** — 3+ independent best-practice sources gathered; agreements/disagreements noted.
- [ ] **Extract** — invariant steps, decision points, gates, and anti-patterns distilled.
- [ ] **Templatize** — written from `templates/capabilities/<type>` (under ~500 lines; detail pushed into bundled files).
- [ ] **Test** — run on a real scenario; worked example captured; under-specified spots fixed.
- [ ] **Wire** — `description` written as the trigger ("<does X>. Use when <situations + user phrases>"); added to the capability index / `/help`.

## Quality gate
- [ ] The `description` reliably auto-triggers (tested by phrasing a natural request, not `/name`).
- [ ] Tools are whitelisted to the minimum (esp. read-only agents have no write tools).
- [ ] Gotchas + guardrails documented (e.g. required IDs, rate-limit handling).
- [ ] **Reusable across projects?** If yes, note it for plugin packaging (§C11.6); if no, make it so or scope it clearly.

## Record
- Path: `<.claude/skills|commands|agents/...>`
- Memory fact written (capability learning): <link/id>
