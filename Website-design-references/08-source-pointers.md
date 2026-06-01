# 08 — Source Pointers

A map of where the canonical data, copy, and reference imagery still live in the existing repo, so the new website effort can pull from source if it wants more detail than these docs carry. All paths are relative to the repo root (`/Users/hamza/Desktop/balencia-city-v3/`). Nothing here has been copied into this folder — these are references.

## Data & content (framework-agnostic)

| What | Path | Contains |
|------|------|----------|
| District profiles | `apps/balencia/src/lib/district-metadata.ts` | `DISTRICT_PROFILES` — label, place, motif, motif color, mood/activity, and the status/insight/signal preview for all 12 domains. |
| Scene definitions & copy | `apps/balencia/src/lib/scroll-scenes.ts` | `SCROLL_SCENES` — all 17 scenes with titles, body lines, the climax `bodySequence`, mode, scroll position, duration. (Also camera data, which is 3D-only.) |
| Brand colors | `apps/balencia/src/lib/materials.ts` | `BRAND_COLORS` palette (the verbatim hex tokens). The rest of the file is 3D material logic. |
| Asset registry | `apps/balencia/src/lib/asset-manifest.json` | Per-structure ids, labels, hex colors, and model paths. |
| City layout | `shared/city-layout-v2.json` | Authoritative spatial positions + ring topology (1 core + 11 outer). Spatial relationships, if the site wants a map view. |
| Cross-domain insights | `energy-system/cross-connections/SPEC.md` | The 6 cross-pillar connection pairs + insight strings. Also mirrored in `energy-system/SHADER-PARAMS.md`. |

## Narrative & vision docs

| What | Path | Contains |
|------|------|----------|
| Master context | `MASTER-CONTEXT.md` | Vision, central message, aesthetic guardrails, the 12-structure table, typography, atmosphere, city-layout diagram. The richest single prose source. |
| Scroll journey | `SCROLL-JOURNEY.md` | The 17-scene journey written out as a narrative. |
| Project guide | `CLAUDE.md` / `README.md` | High-level project overview and app architecture summary. |

## Framework-agnostic code (DOM/state/scroll — not 3D)

These pieces don't depend on Three.js and describe interaction patterns the experience used:

| What | Path | Notes |
|------|------|-------|
| Scroll state store | `apps/balencia/src/store/useScrollStore.ts` | Zustand store: `sceneIndex`, `progress`, `sceneLocalProgress`, `activeDistrict`, overlay text, interior open/close state. Pure state machine. |
| Scroll timeline hook | `apps/balencia/src/hooks/useBalenciaScrollTimeline.ts` | Lenis smooth-scroll + GSAP timeline mapping scroll position → scene. The scroll architecture, independent of rendering. |
| Scene overlay UI | `apps/balencia/src/components/ui/SceneOverlay.tsx` | The HTML/CSS overlay (title, body, district preview panel, scene navigation) — DOM, not 3D. Uses Framer Motion. |
| Today-screen UI | `apps/balencia/src/components/ui/ProductRealityOverlay.tsx` | The product mockup (see `06-product-mockup.md`) — pure DOM/CSS. |
| Styles | `apps/balencia/src/styles.css` | All overlay/UI styling and color tokens; the `.canvas-layer` rules are the only 3D-specific part. |

## Reference imagery (for art direction)

These show what each scene/building actually looked like — useful as mood reference for a 2D rebuild.

| What | Path |
|------|------|
| Latest final renders | `assembly/screenshots/session-89-final-phase-10-qa/` (see `overview-lod/`, `after/`, `app-hero-cameras/` subfolders) — newest, highest-quality city + per-building shots. |
| Earlier render waves | `assembly/screenshots/session-85…88-*` and `assembly/scroll-verification/session-70`, `…/session-76` |
| Per-domain shots | `modules/{00-11}/screenshots/` (each module also has `exterior/`, `interior/`, `SPEC.md`, `REVIEW.md`) |
| Iteration snapshots | Repo root: ~38 images — `phaseA-*`, `phaseB-*`, `phaseC-*`, `session21-*`, `session90-*`, `baseline-scene*`, `enclosure-*` (`.jpeg`/`.png`). |

## 3D assets (likely not needed for a website, listed for completeness)

| What | Path |
|------|------|
| Compiled GLB models | `apps/balencia/public/models/structures/` (12 districts × overview/hero/interior) and `apps/balencia/public/models/energy/` (7 energy assets). |
| Blender source | `modules/{00-11}/.../*.blend`, `assembly/drafts/full-city-assembly.blend`, `shared/*.py` (lighting, materials, export pipeline). |

> The `modules/` directory is the original Blender source-of-truth. This handoff package intentionally lives outside it; nothing here was written into `modules/`.
