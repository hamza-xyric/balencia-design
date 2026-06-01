---
name: balencia-creative-production
description: Use when producing Balencia visual assets in batched sessions from creative-opportunities.md, writing briefs, generating images/video via Higgsfield MCP, and QA-ing assets before integration into balencia-screens. Applies to balencia-creatives-production workspace.
---

# Balencia Creative Production

Produce premium visuals in **sessions of up to 6 asset briefs**. This is production work, not the UX audit in `balencia-screens-reviewed`.

## Required sources

- Opportunities: `registry/opportunities.json`
- Matrix: `../balencia-screens-reviewed/findings/creative-opportunities.md`
- Active batch: `batches/CP-XX-*.md`
- Brand: `../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md`
- Decisions: `decisions/creative-decisions.md`
- QA: `qa/creative-rubric.md`, `qa/brand-gates.md`

## Workflow

1. Read `commands/start-session.md` and open the active CP batch.
2. Resolve blocking CQ gates in `decisions/creative-decisions.md`.
3. Write briefs from `briefs/_brief-template.md` — see `commands/write-briefs.md`.
4. Run `commands/higgsfield-preflight.md` before first generation.
5. Generate with `commands/higgsfield-generate.md`; log jobs in `ledger/generation-ledger.md`.
6. QA each variant; accept into `ledger/accepted-assets.md` when passing.
7. Close with `commands/close-session.md`.

## Higgsfield MCP

- `generate_image`, `generate_video`, `job_status`, `media_upload`, `media_confirm`
- Prompts: `prompts/prompt-style-guide.md`, `prompts/model-routing.md`
- Never generate official provider logos (CP-09)

## Rules

- Do not exceed 6 briefs per session unless the user expands scope.
- Do not train Soul Character without explicit user request and reference photos.
- Do not integrate into `balencia-screens` until asset is `accepted` and logged.
- Do not mark `session-closed` without batch completion gate.

## References

- `references/session-workflow.md`
- `references/higgsfield-workflow.md`
- `references/package-definitions.md`
