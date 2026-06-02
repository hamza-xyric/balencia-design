# Home Screen — Premium Visualization Recommendations

> Companion to `12-home-screen.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (52) → specced-target A− (87)** under the revised 10-dimension rubric.

## Context

We compared the Balencia Home/Today screen against Bevel's homepage. Our **information** is strong — arguably richer than Bevel's. The gap is **visual premiumness** *and* **ownability**: Bevel reads as a crafted dashboard, while our Home reads as a list. But the goal is **not to copy Bevel's devices** (ring-trio, segmented equalizer, vitals cards) — that would make us a recognizable clone in Bevel's own wearables language. The goal is to deploy **Balencia's own** visual signature, which the brand book already defines:

- **The Living Line** (`Design-System-Overview.md` §8/§11): "every chart is the line" — one continuous, curved, round-capped stroke that *draws itself*, runs **orange (effort) → green (arrival)**, marks **milestones with green dots**, and shows SIA's forecast as a **dashed purple** tail. This is the device Bevel/WHOOP/Oura structurally do not have.
- **The Constellation Radar**: our 12-domain life profile as a "constellation" (glowing star dots, a drawn polygon, Life Power as the central sun) — the cross-domain view no health app can show.
- **Warm-glow depth**: calibrated orange glow on warm `ink-brown-800`, vs competitors' cold neon on slate.

Decisions locked with the user: **distinct Balencia signature** (not Bevel-proximate); **spec-first** (read-only); premium depth inside 60/30/10. No new data — every visual derives from data the screen already shows.

---

## What reads premium — and how we do it *our* way (not Bevel's)

| Premium quality | Bevel's device | **Balencia's ownable equivalent** |
|---|---|---|
| A clear focal point on landing | Hero ring-trio (Strain/Recovery/Sleep) | **Constellation Radar** hero (Life Power sun + 12 domains) — whole-life, not vitals |
| A distinctive signature element | Segmented "equalizer" energy bar | **Living-Line Momentum** — a *continuous* orange→green fill, not segments |
| Scannable metric hierarchy | Health-Monitor cards | `MetricCard` + a **Living-Line sparkline** (curved, draws itself) |
| Layered depth | Cold neon glow / inner shadow | **Warm** `--glow-orange` on `ink-brown-800` + inset tracks |
| "Instrument" precision | Radial tick gauge | `GaugeRing` with arc-gradient + ticks (hero gauges only) |

**Root cause of today's flatness:** we own the raw materials but don't deploy them, and the depth tokens to make them premium **don't exist yet**. `RadarChart` (hardcoded 280×280, flat 15% orange, no hub), `ProgressRing` (flat 2-tone, sizes 36/48/96), `LineChart`/`BarChart` (built, unused) all exist; `--glow-orange/green/purple` exist; but **gradient, inset-track, stroke-width, and size-stepped-glow tokens are absent** (logged `VK-017`). The upgrade is composition + a depth pass + minting those tokens — not new charting infra.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex:

| Token | Intended value | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient (named once) |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | gauge/ring/area depth |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | Living Line effort→arrival |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed ring/track |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | size-stepped glow |
| `--stroke-thin/base/bold` | `2 / 4 / 8px` (§8) | stroke widths |

---

## The four recommendations

Ordered by leverage. R1 lifts the whole app; R2 is the hero; R3–R4 establish the signature.

### R1 — `GaugeRing`: a premium depth upgrade to `ProgressRing` (highest leverage)

`ProgressRing.tsx` today draws a flat 2-tone circle (sizes locked to 36/48/96, single orange arc, round cap). Upgrade to `GaugeRing`:
- **Arc-following gradient stroke** — `--grad-orange` **(mint)**. ⚠️ An SVG `linearGradient` cannot sweep *along* the arc; use a CSS `conic-gradient` behind a circular mask (or a multi-stop SVG approximation). "Gradient stroke" is not a one-liner — specify the conic approach.
- **Size-calibrated glow** — `--glow-orange-sm` (~12px) at 36px, `--glow-orange-md` (~20px) at 48–96px, full `--glow-orange` (32px) on hero 96px+ only. A 32px glow on a 36px ring swamps it (a depth *failure*).
- **Inset/beveled track** — `--track-inset` under the `--color-alpha-white-10` track (recalibrated from the old 0.25, which is invisible on `#211008`).
- **Optional ticks** — 12 radial ticks behind a `ticks` prop, hero score gauges only.

> **Correction:** the prior draft claimed this lifts "water intake 200px" — there is **no 200px `ProgressRing`** (max 96px); water uses a separate `WaterIntakeRing`. GaugeRing lifts mission rings, RPG rings, etc.; the water ring upgrades on its own screen [44].

### R2 — `LifeBalanceCard`: the Constellation Radar hero (the differentiator)

A **new card directly after the SIA greeting card**, composing the upgraded **Constellation Radar** with ranked domain stats and the Life Power sun.

```
┌───────────────────────────────────────┐
│ LIFE BALANCE                  Lv 14 →  │
│        ✦                               │
│     ✦  ◇  ✦      ● Fitness      72     │  ← ~160pt radar, draws itself
│   ◇  ╱☀487☀╲ ◇   ● Sleep        65     │    Life Power = central "sun" hub
│     ✦  ◇  ✦      ● Wellbeing    61     │    star dots = domains
│        ✦         ● Nutrition    58     │
│  12 domains      ─────────────────     │
│                  Avg 52   ▲ 4 this wk  │  ← KPIStatTile, honest window
│ ⌁ Balance is strongest in Fitness.     │  ← SIA read (warmth, non-shaming)
└───────────────────────────────────────┘
```

- **Radar (~160pt card variant):** ⚠️ the current `RadarChart` is hardcoded **280×280, flat 15% orange, no center hub** — this card needs the `VK-005` depth upgrade: a resized card variant, radial fill `fillOpacity 0.25→0.08`, stroke `--color-brand-orange` + `--glow-orange`, **star** domain dots (`--color-domain-*` + `--glow-orange-sm`), faint radial backplate, 5 rings (20/40/60/80/99), and a **center "sun" hub** showing Life Power (`487`, `text-display` + `--glow-orange`).
- **Motion — draws itself:** the polygon uses `stroke-draw` (`--dur-flow`/`--ease-flow`), **not** the current `radar-grow` *scale* (which violates §8 "draw the line, don't scale it in"). Dots stagger; hub counts up; radar draws **before** the metric cards.
- **Right column:** top 3–4 domains by `stat` (star dot + label + value `text-h2`). **Footer** `KPIStatTile`: average stat + weekly delta from `domainProgress[].weekDelta`, fixed/disclosed window (no cherry-picking).
- **Micro-interaction:** tap an axis → that domain; tap the hub → expand to the full 12-domain breakdown in place; card tap → Life Areas [16] / RPG [19].
- **States:** Day-1 → **"calibrating"** (faint full polygon + "Building your balance," never a collapsed point); partial sync → **ghosted/dashed spokes** for un-synced domains (no-data ≠ 0); loading → depth-preserving skeleton (rings/spokes visible) that morphs into the drawn fill.
- **Warmth / non-shaming:** the SIA read frames the weakest domain as a prompt, never "you're failing at X."
- **Data:** `domainStats`, `domainProgress`, `user.lifePower` (`mock.ts`).

**Why this over a Bevel-style vitals trio:** a ring-trio would make us a Bevel clone in Bevel's own language. The Constellation Radar makes "whole-life coaching" legible at a glance and is unmistakably Balencia.

### R3 — `MetricCard` row: metric cards with Living-Line sparklines

Replace the three flat text pills (`HealthMetricsStrip`) with `MetricCard`s: domain icon + **status sign** + big value + unit + a **Living-Line sparkline**.

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ♥  ✓ ●  │ │ 👟 ✓ ●  │ │ 🌙 ✓ ●  │  ← icon + VISIBLE in-range sign (✓) + green dot
│ 72       │ │ 8.2k     │ │ 7.5      │  ← value (text-h2)
│ bpm      │ │ steps    │ │ hrs      │  ← unit (white/40)
│ ◜‾◝╮_╭   │ │ ◜‾‾◝╮_   │ │ ╭‾◝◜_╮   │  ← 7-pt Living Line (curved, draws itself, 64×24)
└──────────┘ └──────────┘ └──────────┘
```

- **Sparkline:** a tiny Living Line — **exactly 7 points**, `--stroke-thin` 2px orange, **curved**, no axes/grid, green end dot on a milestone, draws on appear. Add `trend: number[]` (7 values) to each `healthMetric` in `mock.ts`.
- **Status:** in-range = `--color-forest-green` dot **plus a visible ✓ / "in range" glyph** — the old draft used a colour-only dot, which fails for colour-blind users (and its own a11y rule). Never colour alone.
- **States:** no wearable → a "Connect a device" affordance, not silently hidden. Keeps tap-through routes.

### R4 — `MomentumBar`: the Living-Line signature (ownable, not a Bevel clone)

Balencia's ownable element is the **continuous** path-of-progress line — **not** a segmented equalizer. A single rounded bar in the "Today's Actions" header, filling **orange → green** (`--grad-progress`) as actions complete:

```
TODAY'S MOMENTUM                3 of 6 · +90 XP
▰▰▰▰▰▰▰▰▰▰▰▰░░░░░░░░░░░░        52%   ← one continuous fill, orange→green
```

- One continuous rounded bar (radius-pill, 8px, track `--color-alpha-white-08`) — **segments would break §8's "do not break the line into fragments."**
- Derives from `todayActions` completion + `xp`.
- **Non-shaming:** frames forward momentum; a low bar reads as "room to move," never failure; no countdown weaponises a streak.

**Optional R4b — depth polish:** faint top-edge highlight + soft warm shadow on `ink-brown-800` surfaces; `--glow-orange` accent on the Life Power sun + level badge. Subtle.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 GaugeRing | `ProgressRing` | `src/components/screens/ProgressRing.tsx` | arc gradient (conic), glow-by-size, inset (VK-002, VK-017) |
| R2 LifeBalanceCard | `RadarChart`, `domainStats`, `domainProgress` | `src/components/charts/RadarChart.tsx`, `src/data/mock.ts` | hub + resize + draw (VK-005) |
| R3 MetricCard row | `HealthMetricsStrip`, a Living-Line Sparkline | `src/components/screens/HealthMetricsStrip.tsx` | Sparkline (VK-001), MetricCard (VK-003) |
| R4 MomentumBar | `todayActions`, XP | `src/data/mock.ts` | continuous Living-Line fill (VK-004, VK-016) |
| Depth tokens | `--grad-*`, `--track-inset`, `--glow-*-sm/md`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates: radar fill/stroke, gauges, momentum, sparklines.
- **Green (30%)** for completion / in-range / arrival / milestone dots only.
- **Purple (10%)** stays SIA-only. *Note:* the brand's **dashed-purple projection** (§11) is on-brand where a forecast appears — Home has no projection series today, so no purple is added to these visuals; the SIA card + one-line SIA read are the only purple touchpoints.
- **Domain colours** only on radar/ranked-domain star dots — identity, not decoration.
- **Glow** uses the calibrated size-stepped scale — premium warm depth, not neon.
- **Accessibility:** text/aria equivalents on every chart; visible status signs; WCAG 1.4.11 ≥3:1 on load-bearing strokes/arcs/dots; reduced-motion → final state with the Living-Line static form preserved.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint the depth tokens first (everything depends on them).
2. **R1 GaugeRing** — depth upgrade; instantly lifts all rings.
3. **R2 LifeBalanceCard** — the Constellation hero; biggest perceived-quality jump.
4. **R3 MetricCard row** — closes the obvious comparison point.
5. **R4 MomentumBar (+ R4b)** — the Living-Line signature + surface depth.

Each is independently shippable and verifiable.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/tabs/today`, screenshot before/after; verify the radar **draws** (not scales), the sparklines are curved 7-pt Living Lines, the momentum is one continuous fill, and the status carries a visible sign.
- `npm run check` — **`verify:brand` must stay green**.
- Confirm cold-start, partial-sync, loading, and error states render per spec — not a degenerate collapsed radar.
