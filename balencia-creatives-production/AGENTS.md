# Balencia Creative Production Agent Rules

Use this folder for **asset production and creative QA**, not UX screen auditing. Audits live in `../balencia-screens-reviewed/`.

## Required context

Before a production session, read:

- [findings/creative-opportunities.md](../balencia-screens-reviewed/findings/creative-opportunities.md)
- Active batch in `batches/CP-XX-*.md`
- [registry/opportunities.json](registry/opportunities.json) for the screens in scope
- [qa/brand-gates.md](qa/brand-gates.md) and [qa/creative-rubric.md](qa/creative-rubric.md)
- [Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md](../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md) as the current creative authority
- [Balencia/Balencia-Creatives-Reference/logos/](../Balencia/Balencia-Creatives-Reference/logos/) for locked official Balencia logo assets
- [decisions/creative-decisions.md](decisions/creative-decisions.md) and [registry/product-decisions.json](registry/product-decisions.json)
- `constraints[]` on each opportunity row in [registry/opportunities.json](registry/opportunities.json)

## Source hierarchy

1. `CREATIVE-REFERENCE.md`, official logo files, and the current `balencia-screens` app tokens are canonical.
2. Other design-system and design-reference files are supplemental.
3. If an older file describes a teal-primary or three-pillar health palette, do not let it override the current warm ink / burnt orange / forest green / royal purple Balencia system.

## Session discipline

- Cover **3–6 asset briefs** per session unless the user explicitly expands scope.
- Write or update a brief in `briefs/` before calling Higgsfield.
- Preflight credits with `get_cost: true` on `generate_image` / `generate_video` before submitting multiple jobs.
- Log every job in `ledger/generation-ledger.md`.
- Move only QA-passed assets to `ledger/accepted-assets.md` with export paths under `outputs/`.
- Update the active `batches/CP-XX-*.md` file as the durable session artifact (not only the ledger).

## Higgsfield MCP

- Image: `generate_image` — see [commands/higgsfield-generate.md](commands/higgsfield-generate.md)
- Video: `generate_video`
- Poll: `job_status`, `reveal_generation`
- References: `media_upload` → `media_confirm`
- Billing recovery: if `recovery_tool` is `show_plans_and_credits`, call it with `recovery_tool_args` before retrying generation.

## Brief format

Every asset uses [briefs/_brief-template.md](briefs/_brief-template.md). Required decision: `accepted`, `iterate`, `deferred`, or `rejected`.

## Boundaries

- Do not generate, redraw, or approximate the Balencia logo with AI. Use `Logo Mark.svg`, `Frame 2147239943.svg`, or the official PNG/JPG variants directly.
- Do not generate official OAuth or partner logos with AI (CP-09).
- For splash and brand moments, generate atmosphere, background, or reveal support only; the actual mark remains an official source asset.
- Do not train a Soul Character unless the user explicitly requests a reusable SIA identity and supplies 5–20 reference photos.
- Do not mark a batch `session-closed` until every worked brief has QA scores and a decision line in the batch file.
- Do not edit `balencia-screens` during production-only sessions unless the user asks to integrate accepted assets.

## Completion gate (per batch)

- All session briefs documented in the active CP batch file
- Generation ledger updated for every Higgsfield job
- Accepted assets listed with screen placement and file paths
- Deferred items and open decisions noted
- Batch status set to `session-closed` only when the above are true
