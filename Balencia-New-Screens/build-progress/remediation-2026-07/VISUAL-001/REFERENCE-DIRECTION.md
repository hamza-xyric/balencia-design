# VISUAL-001 reference-direction contract

- Date: 2026-07-10 PKT
- Status: **ACCEPTED FOR THE SEVEN-SCREEN PILOT**
- Direction name: **Quiet orbit / burnished ember**
- Decision owner: Sol/root
- Scope: CIA orb, CTA family, and Balencia signature-icon vocabulary only
- Product-code effect in this slice: none

## Decision

The user explicitly authorized Sol to generate original replacement references and continue. That instruction supersedes the earlier dependency on unavailable external Image 1 and Image 2. The two reviewed generated boards below now satisfy the directional input required by DVF-03 for pilot work.

This is a **pilot go**, not a 104-screen rollout acceptance. Production implementation remains CSS/SVG/code-native. Neither generated board is a shippable asset.

## Reference attribution and roles

| Reference | Local source | Role | Integrity |
|---|---|---|---|
| Image 1 — CIA orb direction | `references/image-1-cia-orb-direction.png` | Identity and state-quality reference for compact and hero CIA presence | 1672×941; SHA-256 `6e3d058bb0be7e4ad6b96e8269e304e705870583302001ce022ff0b5171faacd` |
| Image 2 — CTA and glyph direction | `references/image-2-cta-icon-direction.png` | Tonal/state reference for CTA surfaces and conceptual construction reference for the signature vocabulary | 1586×992; SHA-256 `9d527e0778e9268c0748a0dcd498e91649c719b88a63a63aa2765ae76fa79a96` |

Both boards were generated with the Codex built-in image-generation tool on 2026-07-10 from current Balencia pilot screenshots as palette and scale references. The exact image-model identifier is not exposed by this tool surface. Prompts and the one targeted Image-2 repair are recorded in `references/PROMPTS.md`.

### What Image 1 controls

Transfer:

- an open, asymmetric orbital silhouette that remains legible without bloom;
- one restrained purple core and one controlled halo rather than stacked blurry circles;
- state change through geometry: receptive arcs, nodes, directional waves, and resolution;
- a coherent compact/hero family with deliberate optical simplification below 32px;
- warm-dark restraint and CIA-exclusive purple.

Do not transfer:

- raster pixels, fixed glow values, the specimen layout, or its labels into product UI;
- a generic neon sphere, symmetrical plasma ball, or glow-only state change;
- the green success point as the only success signal;
- continuous motion when reduced motion is requested.

### What Image 2 controls

Transfer:

- deep burnished-ember primary surfaces with a thin orange edge light;
- shallow inset top light, state-only lift, width lock, visible compression, and a double focus ring;
- independent success/destructive/coach semantics rather than recoloring one generic pill;
- approximately 2px rounded open strokes, optical asymmetry, and one small active/filled detail for brand-owned glyphs.

Do not transfer:

- raster buttons or glyphs, literal specimen dimensions, or its generated icon paths;
- bright orange plus paper text, blanket glow, metal bevels, or gaming chrome;
- replacement of familiar utility controls with custom symbols;
- any reinterpretation of the official Balencia logo.

## CIA orb contract

The production orb uses a code-native core plus an SVG/CSS orbital layer. Its silhouette must read with glow disabled.

| State | Static geometry | Optional motion | Reduced-motion treatment | Accessible name |
|---|---|---|---|---|
| Idle | one open crescent orbit; quiet centered core | 4s low-amplitude breathe | fully static | `CIA presence, idle` |
| Listening | paired receptive arcs plus two short amplitude ticks | ticks scale from live/fixture amplitude; no continuous spin | static paired arcs | `CIA presence, listening` |
| Thinking | offset orbit with three nodes | slow 8s node/orbit drift | static offset nodes | `CIA presence, thinking` |
| Speaking | directional triple wave on one side of the core | wave segments advance with transform/opacity only | static directional waves | `CIA presence, speaking` |
| Success | resolved ring with a check-shaped break plus one green milestone point | single 280ms settle | static ring + notch + point | `CIA presence, success` |

Constraints:

- Purple remains CIA-exclusive. Green appears only as a redundant success accent.
- Compact sizes under 32px drop soft blur and use the structural orbit/core only.
- Hero sizes may use one diffuse halo; no more than one shadow/glow layer.
- Each consumer implements only applicable states. Muted remains a mic-control state unless separately accepted.
- Decorative orbs use `aria-hidden`; state-bearing orbs expose the exact current state.
- Motion uses transform/opacity only and pauses when the page is not visible.

## CTA contract

The board establishes tone and state anatomy. The following measured colors are the implementation contract; the generated pixels are not.

| Role/token candidate | Surface | Label | Contrast | Notes |
|---|---:|---:|---:|---|
| Primary/default | `#9A3407` | paper-100 `#FEFAF3` | 7.04:1 | burnished ember; orange remains the 1px edge/highlight |
| Primary/hover | `#AA3A08` | paper-100 | 6.08:1 | shallow lift; no permanent halo |
| Primary/pressed | `#6E2406` | paper-100 | 10.52:1 | 0.98 scale plus darker surface; no extra glow |
| Secondary | `#211008` | paper-100 | 17.67:1 | warm glass/solid treatment according to density |
| Coach | royal-purple `#7F24FF` | paper-100 | 5.61:1 | CIA-initiated actions only |
| Success | `#1F6F38` | paper-100 | 5.96:1 | deep semantic green; `#34A853` remains edge/icon accent |
| Destructive | `#8C1D18` | paper-100 | 8.76:1 | requires explicit destructive wording |
| Disabled | `#4A2D22` | `#CFC5BA` | 7.31:1 | no blanket opacity on label; no glow |
| Focus indicator | brand-orange `#FF5E00` on ink-900 | n/a | 6.45:1 | 2px paper gap plus 2px orange outer ring |

Rejected pairing: paper-100 `#FEFAF3` on bright brand-orange `#FF5E00` is `2.95:1` and cannot be used for normal CTA labels. If a text-bearing control uses the bright brand orange, its label must use ink-900 (`6.45:1`).

State rules:

- Native button props are forwarded; one primary per composition.
- Default, hover, pressed, focus-visible, loading, disabled, success, and destructive states are authored.
- Loading replaces label with a named spinner while preserving width and height.
- Auth and route-gate primary actions are full width when the current spec requires it.
- Secondary/decline/exit actions remain visible and operable; monetization cannot hide an equal exit.
- Shadows appear only on lift/focus, use one restrained warm layer, and disappear under reduced motion.

## Signature-icon contract

Generated glyphs are construction references only. Production symbols are newly authored React/SVG paths in one registry.

- Keep Lucide for conventional back, close, search, delete, overflow, playback, and platform controls.
- Add only the first approved brand-owned set: Mission, Life Power, CIA intelligence, Correlation, Progression, and Domain.
- Use a single 24×24 viewBox, 1.8–2px round caps/joins, open asymmetric construction, and optical corrections at 16/20/24px.
- Outline is default; an intentional small fill or node marks active state.
- Meaning must survive monochrome rendering. Color may reinforce but never define it.
- None of the generated glyph silhouettes or exact path topologies is approved for tracing. Each newly authored glyph must pass a monochrome recognition check at 16, 20 and 24px.
- Every glyph is either labelled by adjacent text, given an accessible name, or hidden as decorative.
- The official logo and mark are outside this registry and remain immutable official assets.

## Accessibility, motion, and brand guardrails

- WCAG AA remains a floor: 4.5:1 normal text, 3:1 large/UI, visible focus, and 44×44px targets.
- State is never conveyed by color or motion alone.
- `prefers-reduced-motion` uses static geometry or a single crossfade; no orbiting, pulsing, or looping waveform.
- One hero color per control/surface. Purple cannot bleed into ordinary CTA chrome.
- Warm-dark authority, current 390×844 compositions, and all-caps `CIA` remain locked.
- The boards contain no approved logo art and cannot be used to generate or approximate it.

## Pilot decision

The seven-screen pilot remains unchanged: `03, 07, 11, 12, 26, 43, 80`.

Go conditions now satisfied:

- both replacement references are inspectable and durably stored;
- their quality-versus-direction roles and inspiration boundaries are explicit;
- orb, CTA, and glyph contracts are production-feasible without raster UI assets;
- contrast, focus, reduced motion, and official-logo constraints are explicit;
- the current pilot still covers compact/hero CIA, auth CTA, dashboard/data density, health density, monetization, and media/provider truth.

**Sol decision: GO for the serialized shared foundation and seven-screen pilot. No family rollout is authorized until independent pilot review passes.**

## Factual pilot baseline companion

`references/reference-image-2-current-prototype-baseline.png` is a deterministic two-row contact sheet of the real local 390×844 screenshots for 03, 07, 11, 12, 26, 43 and 80. It is baseline evidence, not a third art-direction board. Its SHA-256 is `abcc455b2b5b8c8d0a36ae4e56741d1d6da4bf638da83b844fd8e674d182fcbd`; crop comparison reports zero differing pixels after the same uniform Lanczos resize for all seven screenshots.

The `reference-image-1a-*` and `reference-image-1b-*` files are retained supplemental ImageGen exploration/provenance only. They do not supersede Image 1, Image 2, DVF-08/09 or this Quiet orbit / burnished ember contract.
