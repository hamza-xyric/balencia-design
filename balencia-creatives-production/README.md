# Balencia Creative Production

Sibling workspace to [balencia-screens-reviewed](../balencia-screens-reviewed/) for producing premium visual assets mapped from [creative-opportunities.md](../balencia-screens-reviewed/findings/creative-opportunities.md).

## Goal

Review creative opportunities in **focused sessions** (3–6 asset briefs per session), generate assets with **Higgsfield MCP**, QA against Balencia brand standards, and record accepted exports for integration into [balencia-screens](../balencia-screens/).

## Source of truth

| Source | Use |
| --- | --- |
| [Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md](../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md) | **Canonical current creative authority** for palette, logo, photography, motion, data visualization, voice, and conflicts |
| [Balencia/Balencia-Creatives-Reference/logos/](../Balencia/Balencia-Creatives-Reference/logos/) | Locked official Balencia mark and wordmark assets; never approximate or regenerate |
| Current `balencia-screens` design tokens/components | Current in-app implementation truth for the orange/green/purple Balencia system |
| [findings/creative-opportunities.md](../balencia-screens-reviewed/findings/creative-opportunities.md) | Priority tiers, placement matrix, packages |
| [registry/opportunities.json](registry/opportunities.json) | Machine-readable screen → batch mapping |
| Other files in [Balencia/Balencia-Creatives-Reference/](../Balencia/Balencia-Creatives-Reference/) | Supplemental detail only; do not override `CREATIVE-REFERENCE.md` when conflicts appear |
| [balencia-screens/src/data/screens.ts](../balencia-screens/src/data/screens.ts) | Canonical routes |

### Conflict rule

When reference files conflict, use `CREATIVE-REFERENCE.md` and the current app tokens as the authority. In particular, older teal-primary or three-pillar health guidance is supplemental and must not override the current warm ink, burnt-orange, forest-green, and royal-purple Balencia system.

## Recommended first slice

**CP-00 → CP-01 → CP-01 controlled iteration → CP-02/CP-06/CP-03 as quality allows**.

Current priority is onboarding-first: finish the premium carousel flow, SIA onboarding canvas, and reusable domain visual language before leading with generated SIA avatar work. AI-generated avatar/identity assets remain deferred as a lead item unless the quality bar and reference/training direction are strong enough to build trust.

Resolved product rules (2026-05-26): [decisions/creative-decisions.md](decisions/creative-decisions.md), [registry/product-decisions.json](registry/product-decisions.json).  
Accepted CP-01 source asset: [outputs/onboarding-motion/CRE-02-domain-visual-kit/domain-visual-kit.svg](outputs/onboarding-motion/CRE-02-domain-visual-kit/domain-visual-kit.svg).  
UX answers: [../balencia-screens-reviewed/questions-for-user.md](../balencia-screens-reviewed/questions-for-user.md).

See [batches/index.md](batches/index.md) for the full CP session plan.

## Folder map

- `batches/` — production session workspaces (CP-00 … CP-10)
- `briefs/` — per-asset briefs from `_brief-template.md`
- `registry/` — opportunities and package definitions
- `ledger/` — Higgsfield jobs and accepted assets
- `decisions/` — product gates that block generation
- `qa/` — creative rubric and brand hard-fails
- `commands/` — session and Higgsfield runbooks
- `prompts/` — Balencia prompt style and model routing
- `outputs/` — exported binaries (gitignored)
- `skills/balencia-creative-production/` — agent skill for sessions

## Asset source policy

Most gates are resolved from the 2026-05-26 UX audit answers and follow-up guidance. Use the strongest source per surface:

- Progress photos, body, identity, and trust surfaces: real/licensed/owned or clearly non-identifiable demo fixtures.
- Exercise and yoga: real reference or professionally illustrated form assets; avoid fake bodies, fake hands, and misleading technique.
- Recipes, food, music artwork, and video posters: generated or licensed assets are allowed when warm, credible, non-generic, and QA-passed.
- Empty, system, gamification, and insight-map surfaces: custom illustration or motion graphics.
- Provider marks and Balencia marks: official files only.

## Operating rules

- Do not exceed **6 asset briefs** per session unless the user changes the process.
- Preflight Higgsfield credit cost (`get_cost: true`) before bulk generation.
- Do not generate, redraw, or approximate the Balencia logo or any official provider mark with AI; use official source files.
- Do not use Higgsfield for official provider marks (CP-09); use licensed assets only.
- Do not wire assets into the prototype until a brief is `accepted` and logged in `ledger/accepted-assets.md`.

## Agent entry

Read [AGENTS.md](AGENTS.md) and skill `skills/balencia-creative-production/SKILL.md`.
