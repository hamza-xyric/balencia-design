# balencia-website/brief — read me first

This folder is the **single authoritative source** for the Balencia marketing website. It ends the scattered/contradictory context that previously lived across the repo and the old 3D project.

| File | What it holds |
|---|---|
| [`BRAND-AND-CONTEXT.md`](./BRAND-AND-CONTEXT.md) | "What is true" — product positioning, the 10 domains, the full Life Correlation Matrix model + real 10×10 base matrix, canonical brand tokens, voice, data-viz language, asset inventory, a11y baseline. |
| [`WEBSITE-VISION.md`](./WEBSITE-VISION.md) | "What we're building" — the cinematic-scrollytelling thesis, the 12-beat storyboard, the LCM signature section, IA, tech architecture, the copy deck, the QA checklist. |
| [`lcm-matrix.json`](./lcm-matrix.json) | Machine-readable: 10 domains (key/label/token/accent/cluster/hubAvg) + 45 weighted base edges + the featured meditation↔finance example + insight cards. Drives the graph, the radar, and the a11y table. |

## Source hierarchy (when documents conflict)
1. `balencia-screens/src/app/globals.css` — canonical for **design tokens** (this brief mirrors them).
2. `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` + official logo files — canonical for the **logo/wordmark**.
3. **This brief** — canonical for **website scope, narrative, and the LCM section**.
4. `LIFE_CORRELATION_MATRIX.md` — canonical for the **matrix values** (mirrored verbatim here + in the JSON).

Deprecated / ignore: teal-primary or three-pillar palettes; "Chillax" as the wordmark font (now Monda); the 11-district / older-10-module domain sets (reconciled to the canonical 10 — see BRAND-AND-CONTEXT §2).

## Status
- **Phase 0 (this brief): done.**
- **Phase 1:** design-first `/poc` vertical slice (cinematic hero beat + the live interactive Life Correlation Matrix) for sign-off — see the app at the workspace root.
- **Phase 2 (post-sign-off):** offline Blender/Cycles render pipeline + the full 12-beat site. See `WEBSITE-VISION.md §6`.

Approved plan: `~/.claude/plans/users-hamza-desktop-balencia-design-web-wobbly-cat.md`.
