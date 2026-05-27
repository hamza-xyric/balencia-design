<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Balencia Prototype Rules

- Use the installed `$balencia-visual-prototype` skill for screen, component, and QA work in this repo.
- Treat `/Users/hamza/yHealth/Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` and the screen specs in `/Users/hamza/yHealth/app_design 3/` as the source of truth.
- Keep the prototype visual-only: no API calls, auth logic, backend state, or new state libraries.
- Run `npm run check` before marking a batch complete.

## Figma artifacts

This codebase is paired with two Figma files (created 2026-05-28):

- **Balencia DS** — design system library (tokens, components, foundations docs). [Open](https://www.figma.com/design/XF2diepp3IfcWuDWHwL4ez) · fileKey `XF2diepp3IfcWuDWHwL4ez`
- **Balencia Screens** — 97 iPhone screens composed of Balencia DS instances. [Open](https://www.figma.com/design/jxoChLrvjIdHQh9Q95SHpi) · fileKey `jxoChLrvjIdHQh9Q95SHpi`

Source-of-truth files in this repo:

- `../figma-mapping.json` (repo root) — fileKeys, page IDs, component IDs, subscribed libraries.
- `scripts/figma-tokens-map.json` — every CSS variable in `globals.css` mapped to its Figma variable name + scope + code syntax. Drives Phase 1.
- `scripts/figma-components-map.json` — 68-component inventory with build phase, variant axes, properties. Drives Phase 3.
- `figma.config.json` — Code Connect parser config.

### Code Connect

Every Balencia component has a colocated `.figma.tsx` file (e.g., `src/components/design-system/Button.tsx` ↔ `Button.figma.tsx`). These map Figma component properties to React props so Dev Mode shows the real JSX.

```bash
npm run figma:check       # Parse and validate Code Connect files
npm run figma:publish     # Publish mappings to Figma
npm run figma:unpublish   # Remove mappings
```

Authenticate once via `figma connect auth` before publishing.

### Workflow rule

Token values are authored in `src/app/globals.css` and propagated to Figma via the agent workflow described in `/Users/hamza/.claude/plans/we-have-completed-the-velvety-charm.md`. **Never hand-edit Figma variable values** — change `globals.css` first, regenerate `figma-tokens-map.json`, then re-run the Figma-side update.
