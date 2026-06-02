# Balencia Visualization — Consistency Contract

**`VIZ-KIT.md` says *which* primitive; this file says *with exactly which numbers, every time*.** It exists so 55 screens authored across many sessions don't drift (one screen's GaugeRing differing from another's, sparklines with different point counts, stat tiles with different count-ups). Every `## Visualization` section ends with *"Conform to `viz-audit/CONSISTENCY.md`."* **A drift from a locked value here is a Medium Kit-consistency finding** (RUBRIC dim 8) — the contract is audit-enforced.

Tokens marked **(mint)** do not yet exist in `globals.css` — they are logged as `VK-017` and minted in the viz-build program; specs reference them by name now.

---

## 1 · Locked per-primitive parameters

### Living Line (`VK-016`) — the spine of Sparkline / TrendChart / MomentumBar
| Param | Locked value |
|---|---|
| Path | curved (monotone/Catmull-Rom), `stroke-linecap/linejoin: round` |
| Colour | `--grad-progress` **(mint)** = orange `#FF5E00` (effort) → green `#34A853` (arrival); pure orange if no arrival |
| Stroke width | `--stroke-base` 4px (hero) · `--stroke-thin` 2px (sparkline/inline) **(mint)** |
| Milestones | green `#34A853` dots, r=3px, on the line |
| Projection | **dashed purple `#7F24FF`** tail (§11), dash 4·2, continues the same path |
| Motion | draws itself — `stroke-draw` / `--dur-flow` 1200ms `--ease-flow`; **never opacity-fade** |
| Reduced-motion | completed stroke at rest + green end dot |

### GaugeRing
| Param | Locked value |
|---|---|
| Sizes | inline 36px · card 48px · hero 96px · billboard 120px+ (extends `ProgressRing` 36/48/96) |
| Stroke | 4px (36/48) · 8px (96) · 10px (120) — `--stroke-base`/`--stroke-bold` |
| Track | `--color-alpha-white-10` over `--track-inset` `rgba(0,0,0,0.28)` **(mint)** inset ring |
| Fill | arc-following `--grad-orange` **(mint)** (conic-mask — not a flat SVG linearGradient); `domain`-coloured in domain mode; green at 100%/in-range |
| Glow | hero 96px+ = `--glow-orange` (32px) · 48px = `--glow-orange-md` (~20px, mint) · 36px = `--glow-orange-sm` (~12px, mint) · inline = none |
| Ticks | `ticks` prop, **hero score gauges only**; 12 ticks, 6px long, `--color-alpha-white-25` |
| Cap / center | `stroke-linecap: round`; center value `text-h2`, count-up 520ms `--ease-flow` |

### Sparkline
| Param | Locked value |
|---|---|
| Points | **exactly 7** (canonical; reconciles the old "5–14" range) |
| Size | inline 48×16 · in MetricCard 64×24 |
| Stroke | `--stroke-thin` 2px orange; **no axes, no grid, no glow** |
| End | green dot when latest point is a milestone/arrival |
| Motion | draw-on-scroll-into-view, `--dur-slow` 520ms `--ease-flow` |

### MetricCard
| Param | Locked value |
|---|---|
| Anatomy | domain icon (14px) · **status sign** · value `text-h2` white · unit `white/40` · `Sparkline` 64×24 |
| Status | in-range = green `#34A853` dot **+ a visible glyph/label** (✓ / "in range") — never colour alone |
| Surface | `ink-brown-800` + top-edge highlight; height fixed per row |

### KPIStatTile
| Param | Locked value |
|---|---|
| Anatomy | label (uppercase `white/40`, +0.12em) · number `text-h2` · delta arrow |
| Delta | ▲ `--color-forest-green` / ▼ `--color-alpha-white-40`; **fixed/disclosed window**, never cherry-picked |
| Motion | count-up `--dur-base` 280ms `--ease-out-soft` |

### MomentumBar
| Param | Locked value |
|---|---|
| Form | **single continuous** rounded bar (radius-pill), **not** segments |
| Fill | `--grad-progress` orange→green; arrival end green |
| Height | 8px; track `--color-alpha-white-08` |

### ConstellationRadar
| Param | Locked value |
|---|---|
| Fill | radial orange gradient 25%→8% (`fillOpacity` 0.25 inner → 0.08 outer) over faint radial backplate |
| Stroke | `--color-brand-orange` + `--glow-orange`; **draws itself** (replace `radar-grow` scale) |
| Dots | `--color-domain-*` star dots + faint glow; stagger-in `radar-dot` 420+index·40ms |
| Hub | Life Power value centered, `text-display` + `--glow-orange` ("sun") |
| Rings | 5 rings at 20/40/60/80/99 (99 = domain-stat max, intentional, not a bug) |
| Sizes | card ~160px · hero 220–280px (current component is 280px) |

### TrendChart
| Param | Locked value |
|---|---|
| Actual | solid orange Living Line, 2px, curved |
| Projected | **dashed purple `#7F24FF`** (§11), 2px |
| Area | `--grad-orange` **(mint)** vertical fade, ≤25% top |
| Compare | this-week orange / last-week green (§11) |
| Scale | zero baseline; shared y-scale across compared periods; no-data ghosted ≠ zero |
| Selector | W/M/Y (or 7d/14d/30d) pill, active = orange-on-`--glow-orange-bg`, inactive `white/50` |

### Donut / Pie
| Param | Locked value |
|---|---|
| Slices | primary/largest = orange; rest = domain/neutral tints; never purple unless SIA; **sum to a true whole** |
| Gap / radius | 2px gap, rounded slice caps; consistent inner-radius across the app |

### CalendarHeatmap (deployed — reuse as-is)
5 intensity steps (`--color-alpha-white-05` → full domain colour); today = dashed border; tap = `scale-110`.

### MacroBar / XPBar
Track `--color-alpha-white-08`; fill domain or orange; XPBar 2px pill; value-vs-target labelled.

---

## 2 · Brand & 60/30/10 invariants (checkable)

- **Orange `#FF5E00` (60%)** dominates data ink: fills, primary series, gauges, the Living Line's effort segment.
- **Green `#34A853` (30%)** only for completion / in-range / arrival / positive delta / milestone dots.
- **Purple `#7F24FF` (10%)** only for SIA-originated elements — **including the brand-sanctioned dashed-purple projection/forecast** (§11). This is correct, not a violation.
- **AI-Mode purple-dominant exception:** *only* AI-Mode screens (e.g. Intelligence [48]) may run purple-dominant, and the section must cite `_shared-patterns.md`. Every other screen stays orange-dominant.
- **Domain colours** for identity only (radar dots, domain series, domain headers) — never decorative palette.
- **Two-shades-of-blue** allowed only for wellbeing/water modules (§11).
- **Glow** uses the calibrated `--glow-*` scale by element size — never raised to neon.

---

## 3 · Motion vocabulary (the only allowed values)

| Motion | Token | Use |
|---|---|---|
| Line/stroke draw | `stroke-draw` · `--dur-flow` 1200ms · `--ease-flow` | Living Line, radar polygon, sparkline — **draw, never fade** (§8) |
| Ring fill | `ring-animate` · `--dur-slow` 520ms · `--ease-flow` | gauges/rings 0→value |
| Bar rise | `--dur-slow` 520ms · `--ease-flow` | bar charts, momentum |
| Count-up | `--dur-base` 280ms · `--ease-out-soft` | KPI numbers, stat tiles |
| Dot stagger | `radar-dot` 420 + index·40ms · `--ease-out-soft` | radar/constellation dots |
| Micro / tap | `--dur-fast` 160ms · `--ease-out-soft` | chips, taps, drill affordances |

- **Cross-element choreography:** hero draws first → supporting metric cards → momentum/footer. One line motif per surface (§8).
- **Scroll-into-view** for any chart below the fold.
- **Micro-interaction** (drill/scrub/expand) where data rewards it.
- **`prefers-reduced-motion`** → every chart renders at final state instantly; signature static forms preserved.

---

## 4 · Accessibility invariants

- Text/`aria-label` equivalent on every chart conveying the same value.
- Never colour-alone: a **visible** glyph/label/sign accompanies every colour-coded status/series.
- Text/value contrast ≥ **4.5:1** on `#0A0A0F` / `#211008`.
- **WCAG 1.4.11:** load-bearing strokes/arcs/dots/boundaries ≥ **3:1** vs background (white/5 grid is decorative-only).
- Interactive chart targets ≥ **44×44pt**.

---

## 5 · Domain & tier colour table (single source — mirrors `globals.css`)

**Domains (12):** fitness `#EF4444` · sleep `#818CF8` · career `#6366F1` · nutrition `#84CC16` · finance `#10B981` · faith `#A855F7` · productivity `#F97316` · relationships `#EC4899` · wellbeing `#14B8A6` · meditation `#A78BFA` · creativity `#F59E0B` · learning `#06B6D4`. (Each has a `-subtle` 15% variant for chip backgrounds.)

**Podium:** gold `#FFD700` · silver `#C0C0C0` · bronze `#CD7F32`.
**Mission tiers:** gold `#D4A017` · silver `#A8A9AD` · bronze `#CD7F32` · steel `#5B7FA5` · sage `#6B8E6B` · copper `#B87333`.
**Rarity:** common `#FFFFFF` · uncommon `#14B8A6` · rare `#7F24FF` · epic `#FF5E00` · legendary `#FFD700`.

---

## 6 · `## Visualization` section templates (copy-paste skeletons)

Every section opens with the banner, a resolution map, numbered `S{NN}-V##` subsections, then a states/brand/a11y block, and closes with the conformance line.

**Banner (all screens):**
```
> Source: <companion file if any>; Audited in viz-audit/ — Batch N; primitives from VIZ-KIT.md
  at CONSISTENCY.md parameters. Current grade <X> → specced-target <Y>.
```

### A · Domain-Dashboard (26, 28, 30, 32–36, 58, 63)
```
### Visualized-vs-text map   (Datum | Today | Specced visual | Primitive)
### 1 · KPI strip — S{NN}-V01        → KPIStatTile ×3 (headline + honest delta)
### 2 · Hero score/metric — S{NN}-V02 → GaugeRing or hero MetricCard
### 3 · Part-of-whole — S{NN}-V03     → Donut / MacroBar group
### 4 · Trend — S{NN}-V04             → TrendChart (Living Line, actual solid + projected dashed-purple)
### 5 · Consistency — S{NN}-V05       → CalendarHeatmap
### States, brand & 60·30·10, accessibility
Conform to viz-audit/CONSISTENCY.md.
```

### B · Tracker (27, 29, 31, 38, 41, 44, 45, 52–55, 60, 61)
```
### Visualized-vs-text map
### 1 · Single-metric hero — V01  → GaugeRing / ArcGauge / MetricCard
### 2 · This-period bars — V02     → BarChart / MacroBar
### 3 · Consistency grid — V03      → CalendarHeatmap
### 4 · Micro-trend (opt) — V04     → Sparkline
### States, brand, a11y · Conform to CONSISTENCY.md.
```

### C · Progress/Awards (13, 14, 59, 71)
```
### Visualized-vs-text map
### 1 · Hero progress — V01     → hero GaugeRing
### 2 · Momentum/streak — V02   → MomentumBar + CalendarHeatmap
### 3 · Timeline/chain — V03    → TimelineAgenda / chain
### 4 · Awards grid — V04       → BadgeTierGrid (rarity glow)
### States, brand, a11y · Conform to CONSISTENCY.md.
```

### D · Social/Leaderboard (39, 47)
```
### Visualized-vs-text map
### 1 · Rank hero — V01           → PodiumRank / KPIStatTile (rank + Δ)
### 2 · Member bars — V02         → BarChart / StatBars
### 3 · Rank/XP progression — V03 → TrendChart
### 4 · Competition progress — V04 → GaugeRing / MomentumBar
### States, brand, a11y (non-shaming: no toxic comparison) · Conform to CONSISTENCY.md.
```

### E · Insights/Correlation (48, 09, 64, 78)
```
### Visualized-vs-text map
### 1 · Score hero — V01          → GaugeRing (AI-Mode purple exception — cite _shared-patterns.md)
### 2 · Correlation — V02         → CorrelationMatrix (VK-009) / strength bars
### 3 · Trend — V03               → TrendChart
### 4 · Pillar sparklines — V04   → Sparkline row
### States, brand (note AI-Mode purple), a11y · Conform to CONSISTENCY.md.
```

### Thin variants
- **Differentiator/Profile (16, 19, 72):** hero = ConstellationRadar (+ Life-Power hub) + domain stat bars; 72 = NetworkGraph (VK-010). Banner + map shape as E.
- **Lightweight-MEDIUM (15, 17, 18, 20, 23, 24, 43, 46, 49–51, 56, 62, 70, 73, 84):** a 2-subsection mini-section — map + the one/two visuals the screen supports (e.g. 17 Profile = XPBar + skill stats; 43 Paywall = tier-comparison bars; 84 Data Sources = sync-status signs).
