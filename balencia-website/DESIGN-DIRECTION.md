# Balencia Website — Design Direction (Phase 1)

The art direction, the build-level token/motion mapping, and the state of the design-first proof-of-concept. Reads alongside [`brief/WEBSITE-VISION.md`](./brief/WEBSITE-VISION.md) (scope/storyboard) and [`brief/BRAND-AND-CONTEXT.md`](./brief/BRAND-AND-CONTEXT.md) (truth).

---

## 1. Art direction

**Warm darkness.** Orange/amber light emerging from a deep blue-black field — Blade Runner 2049 warmth, Apple-spatial cleanliness, UE5 cinematic framing. Never cold cyberpunk, never daytime, never toy-like.

- **Canvas:** `ink-900 #0A0A0F`. Surfaces: `ink-brown-800 #211008` glass (1px white @6% border, 28px radius, warm-brown shadow). Text in paper tones — never pure white.
- **Light is the subject.** Cinematic frames carry the imagery; the UI layer is restrained glass + type + one continuous-stroke motif per surface. Lines draw themselves (never fade in).
- **60/30/10 per surface.** Orange = energy/CTA/user. Green = growth/milestones. Purple = SIA/AI (sparingly). Cross-domain connection lines = **gold** (`#F59E0B`), drawn as an orange→gold gradient.
- **Domain accents identify, never command** — radar vertices, graph nodes, chips. CTAs are always orange. Finance/Wellbeing (emerald/teal) are disambiguated by label + node size, not color.

## 2. Token / motion mapping (build)

| Concern | Source token | Where used |
|---|---|---|
| Display type | `--text-display-2xl/xl/l/m` (fluid clamp) | hero headline, revelation lines, section heads |
| Body/lead | `--text-lead`, Sora 400/600 | sub-copy, captions |
| Surfaces | `.glass-card`, `--radius-xl`, `--shadow-1` | readout panel, insight cards, story |
| Narrative motion | `--ease-flow` (1200ms) | line draw-in (graph edges, story chart, energy lines) |
| UI motion | `--ease-out-soft` (160/280/520ms) | hovers, reveals, fades |
| Glow | `--glow-orange/purple`, gold drop-shadows | CTAs, selected node, highlighted edges, personal edge |
| Data-viz | solid orange = base/user · dashed purple = AI/personal · green dots = milestones | the correlation graph + the example-story chart |

Reduced motion: a `@media (prefers-reduced-motion: reduce)` block (new — the app prototype lacked one) + a hydration-safe `useReducedMotionSafe()` hook gate every scroll/draw/count animation to a static key state.

## 3. The cinematic mechanism

`SequenceCanvas` is the production scroll-scrub: a `<canvas>` painting `frames[round(progress·(n-1))]` cover-fit, driven by Framer Motion `useScroll` over a sticky stage, smoothed by Lenis. The PoC feeds it **one placeholder still** (`/public/hero/arrival.jpg`, a Gemini concept render) and the cinematic motion comes from a progress-driven zoom/pan + drawn energy lines + copy parallax. **Phase 2 swaps `frames` for the per-beat AVIF sequence — no code change.** All load-bearing copy is real DOM over the canvas (SEO + a11y); nothing is baked into frames.

## 4. What the PoC proves (and its acceptance criteria)

Routes: `/` and `/poc` (identical). Run `npm run dev` → open `/poc`.

| Greenlight criterion | Status |
|---|---|
| Hero reads as premium cinematic (not AI-generic), strong first paint | ✅ billboard headline + concept frame + drawn energy + parallax |
| Canonical tokens only; glass surfaces; no pure black/white | ✅ |
| Resting graph shows 3 clusters + visibly-largest Wellbeing hub; weight legible (thickness/opacity/glow/distance) | ✅ |
| Hover/focus a node → web highlights, others dim, readout shows correct sorted weights | ✅ (e.g. Wellbeing → Sleep 80, Meditation 80, Fitness 75…) |
| Cluster filter + Base→Personal dashed-purple morph (meditation↔finance 0.20→0.55) | ✅ |
| Example insight framed as one of thousands (counter + "one of thousands" + "see five more") | ✅ |
| Animated 10-axis radar, shares the graph's selection | ✅ |
| Full keyboard nav (Tab/Arrows/Enter/Escape) + text-equivalent 45-pair table | ✅ |
| `prefers-reduced-motion` → static; no-JS/no-WebGL safe (SVG, real DOM) | ✅ |
| 60fps-class scrub; clean typecheck / lint / static build; zero console + hydration errors | ✅ |

**Intentionally out of scope for the PoC:** the other 11 beats, the offline Cinematic render pipeline, `/pricing` `/how-sia-works` `/privacy`, the PhoneFrame "Today" beat, R3F depth layer (the graph is SVG-first behind a renderer-agnostic interface — R3F can be added later without reworking interaction/data).

## 5. Next (Phase 2, post-greenlight)
1. Offline-render the 10-domain city in Blender/Cycles (sources: `balencia-city-v3/{modules,assembly,shared}`; rig: `Website-design-references/Balencia-City-Premium-Rebuild-Plan.md`) → AVIF beat sequences into `public/sequences/`.
2. Build all 12 beats (`brief/WEBSITE-VISION §3`) + the standalone routes.
3. Mobile poster tier, CDN frame delivery, JSON-LD/OG, `design-auditor` WCAG AA pass, cross-device perf.

## 6. Known placeholders / to-replace
- Hero still is a Gemini concept render with a corner watermark → replace with a Phase-2 Cycles render.
- Wordmark is typeset "Balencia." (Sora) → replace with the official asset / Monda.
- Radar values + the example chart numbers are illustrative (carry the "not product claims" footnote).
- CTAs default to waitlist framing → swap to app-store badges when live.
