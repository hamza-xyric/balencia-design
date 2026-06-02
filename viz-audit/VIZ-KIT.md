# Balencia Visualization Kit — Spec

The shared visualization vocabulary every screen composes from. **Specced first** (this program); built in a later viz-build program. Each primitive lists: purpose · when to use · consuming screens · maps-to (existing prototype component or **NEW**) · brand/token notes.

> Rule: a screen spec references primitives **by name** (e.g. "hero = `LifeBalanceCard` wrapping `ConstellationRadar`"). If a screen needs a visualization not in this kit, it is added here as a `VK-###` finding first — never invented per-screen. **Exact instance parameters (sizes, stroke widths, gradient stops, glow radii, motion timings) live in `CONSISTENCY.md`** — this file says *which* primitive; CONSISTENCY says *with which numbers*.

---

## The Balencia signature (what makes our charts *ours*, not a clone)

Balencia already owns a data-viz identity in the brand book (`Design-System-Overview.md` §8 "Continuous Stroke" + §11 "Every chart is the line"). Every primitive below expresses it. Two named devices carry the signature:

### `VK-016` · The Living Line  ·  maps-to: **NEW** (SVG path; `stroke-draw` keyframe already in `globals.css`)
The app's hero motif for **any time or progress dimension**. It is *the* thing competitors (Bevel/WHOOP/Oura) structurally do not have — use it instead of generic library lines or segmented "equalizer" bars.
- **Form:** one continuous, **curved** (monotone / Catmull-Rom), **round-capped, round-joined** stroke. One line motif per surface maximum (§8 rule).
- **Colour law (§8/§11):** runs **orange `#FF5E00` (past / user effort) → green `#34A853` (arrival / recovery)** via the path-of-progress gradient; pure orange when no arrival yet. **Milestones = green dots** on the line. **SIA projection = a dashed _purple_ `#7F24FF` tail** continuing the same stroke (this is the brand-correct projection colour — see the projection note below).
- **Motion:** **draws itself** via `stroke-dashoffset` (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) — **never opacity-fades** (§8 "Do not fade the line in").
- **Reduced-motion static form:** the completed stroke at rest + the green end/milestone dot — so the identity survives without motion.
- **Re-bases three primitives:** `Sparkline` (a tiny axis-less Living Line), `TrendChart` (a full Living Line with axes + projection), `MomentumBar` (a horizontal Living Line — a **continuous** orange→green fill, **not** Bevel segments).

### Constellation Radar (the cross-domain differentiator — upgrade of `RadarChart`, see `VK-005`)
The 10–12 life-domain profile rendered as a "life constellation," not a default radar: domain dots are **glowing stars** (`--color-domain-*` + faint glow), the connecting polygon is a **drawn stroke** (draws itself on entry — **not** the current `radar-grow` *scale* animation, which violates §8), over a gradient orange fill (25%→8%) on a faint radial backplate, with **Life Power as the central "sun" hub** number carrying `--glow-orange`. Same draw-on-enter motion as the Living Line, so radar and trends read as one family.

> **Warm-glow, not cold neon.** Our depth signature is calibrated orange glow on warm `ink-brown-800` surfaces — the ownable contrast to competitors' cold slate/neon. Naming it here so every batch grades against it (RUBRIC dim 4).

---

## Shared depth language (applies to all primitives)

All kit visualizations share the same "premium depth" so the app reads as one crafted system. **Token-only — no literals.** Several depth tokens do **not yet exist** in `globals.css`; they are logged as `VK-017` and must be minted in the viz-build program. Until then, specs reference them by their intended name (listed here), never as floating hex.

| Intended token | Value (to mint — `VK-017`) | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | the lighter stop of the orange depth gradient (named once here; never inline) |
| `--grad-orange` | `linear-gradient(180deg, var(--color-brand-orange) 0%, var(--orange-light) 100%)` | gauge/ring/area depth fills & strokes |
| `--grad-progress` | `linear-gradient(90deg, var(--color-brand-orange) 0%, var(--color-forest-green) 100%)` | the Living Line / path-of-progress (effort→arrival) |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed inner ring/track for carved depth (recalibrated up from 0.25 — invisible on `#211008`) |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | the size-stepped glow scale (see rule below) |
| `--stroke-thin/base/bold/poster` | `2 / 4 / 8 / 12px` (§8) | the brand stroke-width scale |

Depth rules every primitive obeys (parameters locked in `CONSISTENCY.md`):
- **Gradient strokes/fills** — never flat single-tone. Note the **angular-gradient trap:** an SVG `linearGradient` cannot sweep *along* a ring arc. For a gradient that follows the arc, GaugeRing uses a CSS `conic-gradient` behind a circular mask (or a multi-stop SVG approximation) — the spec must say which; "gradient stroke" is *not* a one-liner.
- **Soft outer glow, calibrated by element size** — `--glow-orange` (32px) on heroes ≥96px only; `--glow-orange-md` (~20px) at 48–96px; `--glow-orange-sm` (~12px) at 36px; **no glow** on sparklines/inline. A 32px glow on a 36px ring swamps it — that's a depth *failure*, not depth.
- **Inset/beveled track** — `--track-inset` recessed under the `--color-alpha-white-10` track.
- **Layered surface** — subtle backplate gradient + top-edge highlight on warm `ink-brown-800`, vs flat boxes.
- **Round caps/joins everywhere** — `stroke-linecap/linejoin: round` on every line/arc (§8).

### Projection colour — resolved (was a brand-book contradiction)
The brand book (`Design-System-Overview.md` §11) is explicit: **Projected = dashed _purple_; Coach/AI projection = purple.** Projection *is* SIA's forecast, so purple is **correct and on-brand** — it is not a 60/30/10 violation. The prior kit rule ("projected = orange dashed, NOT purple") was wrong and is reversed here (logged `VK-018`, Critical brand-consistency). All projected/forecast series are **dashed purple `#7F24FF`**; solid orange is reserved for actual/past.

---

## Primitives

### GaugeRing (`VK-002`)  ·  maps-to: upgrade `components/screens/ProgressRing.tsx`
- **Purpose:** circular progress / score with premium depth.
- **Adds over ProgressRing:** **arc-following gradient stroke** (conic-mask — see trap above), size-calibrated glow, `--track-inset` beveled track, optional radial **tick marks** behind a `ticks` prop (hero score gauges only), optional center value/label. **Note:** `ProgressRing` today is locked to sizes `36 | 48 | 96` (flat 2-tone, round cap) — GaugeRing adds larger hero sizes + a `domain` colour mode; water intake uses a *separate* `WaterIntakeRing`, not a 200px ProgressRing.
- **Use for:** mission progress, RPG level, sleep score, recovery %, achievement completion, water intake.
- **Consumers:** Home [12], RPG [19], Sleep [58], Energy [63], Fitness [26], Achievements [71], Goal Detail [14].
- **Brand:** orange default; green at 100% / in-range; domain-coloured when representing a domain.

### Sparkline  ·  maps-to: **NEW** (a tiny Living Line — `VK-016`)
- **Purpose:** tiny inline trend, no axes, inside a metric card. A miniature Living Line: curved, round-capped, draws on scroll-into-view.
- **Use for:** the 7-point trend under each health metric, micro-trends on KPI tiles.
- **Consumers:** Home [12], Fitness [26], Sleep [58], Energy [63], Finance [30].
- **Brand:** single orange stroke; green end dot when the latest point is a milestone/arrival; signed-delta tint only when it carries meaning. (Locked point-count + size in CONSISTENCY.)

### MetricCard  ·  maps-to: upgrade `components/screens/HealthMetricsStrip.tsx`
- **Purpose:** crafted metric tile — icon + status sign + big value + unit + `Sparkline`.
- **Use for:** the health-metric row and any dashboard's headline metric tiles.
- **Consumers:** Home [12], Fitness [26], Sleep [58], Nutrition [28], Energy [63].
- **Brand/a11y:** in-range = green dot **plus a visible sign/label** (never colour alone); value in white `text-h2`; unit `white/40`.

### MomentumBar  ·  maps-to: **NEW** (a horizontal Living Line)
- **Purpose:** today's-progress signature — a **continuous** orange→green fill bar (path-of-progress), **not** segmented (segments violate §8 "do not break the line into fragments").
- **Use for:** today's-actions completion, daily XP vs goal, streak momentum, habit completion.
- **Consumers:** Home [12], Habits [38], Streak Details [59].
- **Brand:** `--grad-progress` fill; arrival end = green. **Non-shaming:** frames momentum, never weaponises a broken streak (RUBRIC dim 6).

### ConstellationRadar (RadarChart)  ·  maps-to: existing `components/charts/RadarChart.tsx` (+ depth upgrade — `VK-005`)
- **Purpose:** multi-axis life profile — the cross-domain differentiator.
- **Adds:** gradient polygon fill (orange 25%→8%), glow on stroke, faint radial backplate, **center hub value** (Life Power), star-dot domains, **draw-on-enter** (replace `radar-grow` scale). Current component is hardcoded `280×280`, flat 15% orange, **no hub** — the upgrade adds the hub + a sizeable/hero variant.
- **Use for:** 10–12-domain life balance, RPG stat profile, any 5+ axis comparison.
- **Consumers:** Home [12] (`LifeBalanceCard`), Life Areas [16], RPG [19].

### TrendChart (Line / Area)  ·  maps-to: wrap existing `components/charts/LineChart.tsx` (currently unused) — a full Living Line
- **Purpose:** time-series over days/weeks/months, with solid (actual) + **dashed-purple (projected)** support.
- **Use for:** spending trend, weekly workout volume, sleep-duration trend, energy-over-time, XP/rank progression, leaderboard history.
- **Consumers:** Finance [30], Fitness [26], Sleep [58], Energy [63], Leaderboard [39], Reports [64/78].
- **Brand:** orange actual line (Living Line); **projected = dashed purple `#7F24FF`** (§11 — SIA forecast); area fill = `--grad-orange` fade; green milestone dots; curved.

### BarChart / StatBars  ·  maps-to: wrap existing `components/charts/BarChart.tsx` (currently unused)
- **Purpose:** discrete comparisons / weekly buckets.
- **Use for:** weekly workouts/minutes/calories, domain-stat bar group, leaderboard bars, macro days.
- **Consumers:** Fitness [26], RPG [19], Reports [64/78], Leaderboard [39].
- **Brand:** orange bars; **this-week vs last-week = orange vs green** (§11); zero baseline, shared scale across compared periods (honest scale).

### Donut / Pie (`VK-007`)  ·  maps-to: **NEW** (SVG arc `path`, or Recharts `Pie`)  — *minted in Batch 3 (Nutrition [28])*
- **Purpose:** part-of-whole composition — the one view parallel bars structurally cannot show (how a total *splits*).
- **When to use:** macro split (protein/carbs/fat by calorie share), spending by category, sleep stages (light/deep/REM), call-topic split. Use a **donut** (center hub) by default; solid **pie** only when no hub value is needed.
- **Encoding / arc:** SVG `path` arcs (or Recharts `Pie`); `stroke-linejoin/linecap: round`; **2px gap** between slices (reveals the `ink-brown-800` surface for carved separation); **consistent inner-radius across the app**; optional center **hub** value (`text-h2`) + a sub-label naming the whole (e.g. "of 2200").
- **Honest whole (non-negotiable, RUBRIC dim 5):** slices **must** sum to a *true* whole the user can name (logged calories, total spend, total sleep minutes) — never an arbitrary or padded total. A 0-value category is **omitted**, never a zero-width wedge. A "remaining vs target" gap is shown as **hub text**, never a phantom slice (which would lie about composition).
- **Brand slice colours (60/30/10-safe):** **largest / primary slice = `--color-brand-orange`**; remaining slices = warm neutral tints (`--color-alpha-white-40`, `--color-alpha-white-20`) or, where each slice *is* a domain (spend-by-category), `--color-domain-*` identity tints. **Never rainbow** (one-hue-per-macro is a competitor clone + a 60/30/10 violation); **never purple** unless the slice is SIA-originated.
- **Depth:** `--glow-orange-sm` **(mint, VK-017)** on the primary slice only at ≥48px (the full 32px `--glow-orange` swamps a small donut — a depth *failure*); **no glow** at micro (<48px) scale; faint radial backplate behind the ring; `--track-inset` **(mint)** under the ring on hero variants.
- **Sizes:** hero ~140px · card ~96px · micro (per-row, no hub/glow) 24px.
- **A11y:** an `aria-label` enumerating every slice's label + % + value (e.g. "Protein 24%, carbs 41%, fat 38% of 1305 calories"); a **visible** legend or in-situ labels (never colour-alone); load-bearing arcs / slice boundaries ≥ **3:1** vs background (WCAG 1.4.11); interactive slice hit-wedges ≥ **44×44pt**.
- **States:** **empty / cold-start** = a ghosted full-ring outline + hub prompt ("Log a meal to see your split") — **never** a collapsed disc or a misleading 100%-of-one-category ring; **partial** = logged slices + a ghosted remainder arc; **loading** = a ring skeleton that draws into the real arcs; **over / edge** = handled in hub text + colour, never by distorting slice shares.
- **Motion:** **draws itself** — arcs sweep clockwise from 12 o'clock via `stroke-dashoffset` (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`), **largest → smallest** (primary orange slice first); hub counts up 520ms; **never opacity-fades** (§8). `prefers-reduced-motion` → full arcs at rest with the hub at final value.
- **Consumers:** Nutrition [28] (macro split + meal micro-splits — minted here), Finance [30] (spend by category), Sleep [58] (light/deep/REM stages), Call Summary [79] (topic split).

### CalendarHeatmap  ·  maps-to: existing `components/charts/CalendarHeatmap.tsx`
- **Purpose:** consistency grid (GitHub-style intensity).
- **Use for:** streak history, habit consistency, sleep-consistency, activity calendar, meditation frequency.
- **Consumers:** Streak Details [59], Habits [38], Sleep [58], Creativity [36] (already), Meditation [54].

### MacroBar / ProgressBar / XPBar  ·  maps-to: existing `components/domain/MacroBar.tsx`, `components/screens/XPBar.tsx`
- **Purpose:** labelled value-vs-target horizontal bars.
- **Use for:** macros vs target, budget category vs limit, XP to next level, skill levels.
- **Consumers:** Nutrition [28], Finance [30], RPG [19], Profile [17], Career [32].

### KPIStatTile  ·  maps-to: **NEW / extract** (from existing dashboard stat tiles)
- **Purpose:** headline number + delta arrow (▲ green / ▼ muted) + label.
- **Use for:** dashboard summary rows (income/spent/saved, workouts/min/cal, avg stat + weekly delta).
- **Consumers:** Finance [30], Fitness [26], Home [12] (Life Balance footer), Reports [64/78].
- **Honest:** the delta window is fixed/disclosed, never cherry-picked (RUBRIC dim 6).

---

## New primitives for the full app (logged now; specced when their batch arrives)

### `VK-009` · CorrelationMatrix  ·  maps-to: **NEW** (extend `CalendarHeatmap` cell engine)  — *minted in Batch 2 (Intelligence [48])*
- **Purpose:** domain×domain (or pillar×pillar) correlation-strength heatmap — Balencia's Life Correlation Matrix (`LIFE_CORRELATION_MATRIX.md`) made legible. The cross-domain "life-as-a-connected-graph" gestalt, rendered *warm* — the differentiator no competitor surfaces this way.
- **When to use:** when a screen must show the strength **and direction** of relationships between a set of factors/domains at a glance (correlation surfacing), paired with a small set of ranked coaching rows so the grid is legible-first on mobile.
- **Two-tier composition (locked):** **Tier 1** = the N×N intensity grid (the gestalt). **Tier 2** = the top 2–3 correlations as plain-language ranked rows beneath (description + strength bar + direction arrow + word). The rows carry the legibility and the 44pt tap target; the grid carries the at-a-glance pattern.
- **Encoding (locked):**
  - **Intensity = |strength|** via the deployed `CalendarHeatmap` 5-step ramp (`--color-alpha-white-05` → full direction tint).
  - **Direction = triple-encoded, NEVER colour-alone:** (1) a **`+` / `−` glyph inside every cell**; (2) a **directional tint** — reinforcing = warm purple `--color-royal-purple`; competing/inverse = a **desaturated cool tint** (sleep-blue family at low chroma); (3) in the ranked rows, a **leading ↑/↓ arrow + the word** ("reinforcing"/"competing"). Any one conveys direction alone (grayscale/colour-blind safe).
  - **Diagonal muted** (`--color-alpha-white-05`) — self-correlation is not information.
  - **No-data ≠ zero:** an un-computed pair = a **ghosted cell**; a genuine near-zero correlation = a muted near-diagonal tone. They must look distinct.
- **Brand:** AI-Mode screens render reinforcing ink in **royal-purple** (SIA-computed — Intelligence [48]); product-mode consumers (Reports [78]) render reinforcing in **orange** with the same cool inverse tint. Competing/inverse tint is never purple-as-decoration; domain icons on row/column headers use `--color-domain-*` for identity only.
- **Depth:** 2px cell gap, `--r-xs` cell corners; today/hovered/selected cell = dashed border (reuse `CalendarHeatmap` `today` treatment); card surface `ink-brown-800` + top-edge highlight; ranked-row strength bars track `--color-alpha-white-08`, fill graduated by strength.
- **A11y:** every cell carries an `aria-label` "[Domain A] and [Domain B]: [+/−][N]%, [reinforcing/competing], [strong/moderate/weak]"; direction is announced **in words** and shown by the **visible `+/−` glyph + arrow** (1.4.11 ≥3:1 on load-bearing cells/strokes); ranked rows are the ≥44×44pt interactive targets (cells are tap-to-tooltip when a dense 12×12 grid packs cells tighter); text/value contrast ≥4.5:1.
- **States:** **none/analyzing** → "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of data." (no degenerate empty grid); **partial** → ghosted un-computed cells; **loading** → skeleton grid of pulsing cells; **error** → "couldn't load correlations" with retry.
- **Motion:** cells fade/scale-in **row-by-row** on scroll-into-view (`--dur-base` 280ms `--ease-out-soft`, small stagger); ranked-row strength bars rise 0→target (`--dur-slow` 520ms); tap a cell → tooltip pill (`ink-900`, `--r-sm`, 8px pad, `--dur-fast` 160ms) with the readable correlation + "ask SIA →" deep-link. `prefers-reduced-motion` → full grid at final intensity instantly, rows static.
- **Consumers:** Intelligence [48] (AI-Mode purple — minted here), Reports [78] (orange). **Maps-to:** extend `components/charts/CalendarHeatmap.tsx` into a square N×N grid.

### `VK-010` · NetworkGraph  ·  maps-to: **NEW** (SVG for the prototype; Canvas/Skia noted for production)  — *minted in Batch 2 (Knowledge Graph [72])*
- **Purpose:** force-directed node-link of insights/memories/domains and their correlations — the app's most novel viz, and the visible form of the Life Correlation system. **Mobile-legible, precomputed/settled** (no live physics jitter).
- **Layout strategy (390px):** positions **precomputed server-side** (force-directed once → frozen) to normalized `(x,y)` ∈ [0,1]; client renders to a **square logical canvas with aspect preserved** (replaces a distortion-prone `preserveAspectRatio="none"`), inside a pannable/zoomable viewport (0.3×–3.0×; double-tap = 1.5× at point / reset-fit). Same-domain nodes cluster (intra-domain attraction in the precompute); cross-domain edges bridge clusters. **No client-side force sim.** Legibility floors: max ~60 nodes, ~120 edges; edges <25% strength hidden by default (doubles as the WCAG-1.4.11 contrast floor).
- **Node encoding:** radius = **connection degree** (24pt @1–2 edges → 56pt @8+; most 32–40pt); fill = `--color-domain-*` @80% (identity); label `text-small` white below, shown at zoom >0.7×; **hub glow** (3+ edges ≥70%) = `--glow-orange-sm` **(mint)** radius in the node's own domain colour @12%; **selected** = scale 1.2× + 2pt white border + `--glow-purple` + glow→20%, non-connected nodes → 30% opacity + labels hidden.
- **Edge encoding:** stroke width = strength (`--stroke-thin` **(mint)** 2px @<40% → ~3px @>75%), round caps/joins (§8); colour `--color-royal-purple`, opacity 15%→60% by strength; **`inferred` edges = dashed (4·2), confirmed = solid** (the SIA-confidence signature — §11 forecast language applied to relationships); selected node's edges → 80% + 2s pulse (60→80→60%), unrelated edges → 5%.
- **Interaction:** tap node = select + detail panel + highlight; tap empty = deselect; pinch = zoom; single-finger pan; double-tap = zoom/reset; buttoned zoom/reset for non-gesture users; connection-row tap (in panel) re-selects that node.
- **A11y text-equivalent of the graph (load-bearing):** canvas `aria-label` "Health knowledge graph showing N metrics and M connections"; each node `role="button"`, label "[name], [domain], [N] connections, tap to explore". **VoiceOver / AT alternative view:** the graph renders as a **flat list of nodes sorted by connection count**, each expandable to its connection list — full data reachable with zero visual graph comprehension. Strength always shown as visible % + bar (never colour/width-alone); confirmed-vs-inferred is solid-vs-dashed (non-colour). Interactive targets ≥44×44pt (min-44 hit box around each node).
- **States:** **cold-start** (3–5 ghosted domain placeholder nodes @20% + "growing" copy + purple 3-dot pulse — never an empty canvas); **early/sparse** (real 5–15-node graph + "keep tracking" nudge); **partial** (available nodes/edges render; missing data simply absent — *not* an error); **loading** (3 purple dots pulse + "Loading your graph…" → 10s → error); **error** (centred glyph + message + orange retry; header/controls persist); **layout error** (server positions, no reveal, still interactive); **offline** (cached-graph banner, "ask SIA" disabled @40%).
- **Motion:** nodes fade in staggered (20ms/node, 280ms, `--ease-out-soft`) at precomputed positions → edges **draw themselves** outward (`stroke-draw`, ~520ms `--ease-flow`) — **draw, never opacity-fade** (§8); selection at `--dur-base` 280ms; selected-edge pulse 2s loop. **`prefers-reduced-motion` → settled final state instantly, edges fully drawn, pulse off** (the settled frame is the canonical frame).
- **Brand:** AI-Mode purple-dominant (sanctioned — cite `_shared-patterns.md`); orange only on the *navigation* action ("go to domain") + help + retry; domain colours on nodes/dots/legend only; dashed-purple inferred edge is the brand forecast signature; green absent (no arrival state — correct).
- **Consumers:** Knowledge Graph [72], Personal Wiki [20]. *(Highest-risk net-new primitive.)*

### `VK-011` · ScatterPlot / ConsistencyCloud  ·  maps-to: **NEW** (Recharts `Scatter` or SVG)  — *minted in Batch 3 (Sleep [58])*
- **Purpose:** plot an x/y relationship as a point field and use **cluster tightness as a consistency signal** — the premium way to show schedule regularity, time-of-day patterns, or any "X vs Y" correlation, without a verdict.
- **When to use:** bedtime/wake consistency (tightness = consistency), energy vs time-of-day, any two-axis relationship where the *spread* is as meaningful as the position.
- **Encoding:**
  - **x** = the independent axis (night index / day-of-week / time-of-day); **y** = the measured value (clock-time, energy level).
  - Each datum = one **dot** (domain-coloured, `--color-domain-*`).
  - A **median/centroid anchor** (larger dot, `--glow-orange-sm`) marks the cluster center; a faint **±1σ spread band/ring** (`--color-domain-*` at 15% over `--track-inset`) makes tightness literally visible.
  - **Consistency score** = `100 − normalized(σ)`, surfaced as a number **plus a visible word** ("tight" / "variable") — never colour-alone. Outliers (e.g. weekend drift) fall outside the band and are self-evident.
- **Brand:** dots = `--color-domain-*` (identity); centroid anchor + score figure carry warm `--glow-orange-sm` / orange ink (60/30/10 via the orange accents); band = domain colour at 15% over `--track-inset`; **never purple** unless the field is SIA-originated. Sits on `ink-brown-800` with a faint radial backplate.
- **Depth (token-backed):** band over `--track-inset` **(mint)**; centroid `--glow-orange-sm` **(mint)**; dots r=4–5px round; layered warm backplate.
- **A11y (text-equivalent):** `aria-label` states the cluster summary — "bedtime clusters around 11:08pm ±18 min — tight; wake around 6:34am ±22 min." Status word ("tight/variable") is visible, not colour-alone. Dot hit targets ≥44×44pt. Load-bearing dots + centroid meet WCAG 1.4.11 ≥3:1 on `#0A0A0F`/`#211008`.
- **States:** **cold-start / <5 points** → "log a few more nights to see your pattern" with the empty field + axes (no fake 0 cloud); **loading** → axes + band skeleton, dots scale in on data; **partial** → ghosted dots for un-synced nights; **error** → names the field that failed + retry.
- **Motion:** dots **scale-in 0.5→1, 30ms stagger** (`--ease-out-soft`); ±1σ band fades in after; centroid settles last. **No live physics jitter.** Reduced-motion → all dots at final positions instantly. Below-fold → animate on scroll-into-view.
- **Consumers:** Sleep [58] (bedtime/wake consistency — minted here), Energy [63] (energy vs time-of-day).

### `VK-015` · ArcGauge  ·  maps-to: **NEW** (`src/components/charts/ArcGauge.tsx`)  — *minted in Batch 3 (Energy [63])*
- **Purpose:** an **open arc gauge** (180–270°, *not* a full ring) for a single bounded level — the warm "instrument/charge dial" hero. Used where a full ring would falsely imply a completable 100% (energy, sentiment, stress are levels, not completions).
- **When to use:** energy 0–10 (hero, Energy [63]), call sentiment 0–100 (Call Summary [79]), stress level 0–10 (Stress [52]). One ArcGauge per surface (it is a hero). For mission/score progress that *does* complete, use `GaugeRing` (full ring) instead.
- **Geometry (locked):** default sweep **240°** with the gap centered at the bottom foot (must never close into a ring — the open foot is the signature). Min at the left foot, max at the right foot; filled angle = `(value/max)·sweep`. Hero outer **160px**; **8px arc** (`--stroke-bold`). Compact 120px variant uses 6px.
- **Gradient + glow (depth, token-only):** arc fill = arc-following `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep *along* an arc (the angular-gradient trap); ArcGauge **must** use the conic-mask. Glow = `--glow-orange-md` (~20px, **mint**) on the 120–160px hero — **never** the full 32px `--glow-orange`; domain mode tints the arc with `--color-domain-*` (identity), but the **default is orange** — a low value is **never** recoloured to an alarm red.
- **Track:** `--color-alpha-white-10` arc over `--track-inset` **(mint)** recessed ring; round caps on both filled and unfilled ends.
- **Ticks:** `ticks` prop (hero only) → 12 radial ticks, 6px, `--color-alpha-white-25`, behind the arc. Off by default on compact.
- **Center / value:** center value `text-display` white + faint `--glow-orange-sm`; optional unit/context label below in the domain identity colour; count-up `--dur-slow` 520ms `--ease-flow`.
- **Brand / non-shaming:** orange default fill (60% data ink); domain colour is *identity* only; green at max/in-range; purple never (carries no projection). **Status is carried by number + glyph + label, never by an alarm colour** — a low reading shows a rest/moon glyph + a constructive lever, not red.
- **Accessibility:** `aria-label` conveys "Value N of MAX" (e.g. "Current energy 7 of 10"); arc, filled/track boundary, and any status glyph meet **WCAG 1.4.11 ≥3:1** (decorative ticks at white/25 are perceptual, not load-bearing); interactive target ≥44×44pt.
- **States:** **cold-start / no-value** → arc at rest on a **ghosted** min-foot (faint full track, not a filled 0), center "—" + "no data yet"; **loading** → track + ticks visible, shimmer sweep that **morphs** into the fill; **partial** → ghosted; **error** → arc track only + retry.
- **Motion:** arc fills `0→value` (`ring-animate`, `--dur-slow` 520ms `--ease-flow`); center counts up 520ms; on a fresh value the arc re-sweeps. **`prefers-reduced-motion`** → arc at final fill instantly, no sweep.
- **Consumers:** Energy [63] (hero — minted here), Call Summary [79] (sentiment), Stress [52] (stress level).

### `VK-012` · PodiumRank  ·  maps-to: **NEW** (`src/components/charts/PodiumRank.tsx`; rows extend `components/domain/LeaderboardRow.tsx`)  — *minted in Batch 5 (Leaderboard [39])*
- **Purpose:** the social-standings hero — a top-3 **podium** + ranked **rows below**, the warm, **non-toxic** answer to Strava segments / Duolingo leagues. Encodes *who leads* and *where you stand* without ever shaming a low rank: the comparison is reframed toward **"your climb"** and the user's own row is **always anchored**.
- **When to use:** any ranked-standings surface — global/country/friends leaderboards, competition mini-leaderboards. One PodiumRank hero per surface. For pure personal progress with no ranking, use `TrendChart`/`GaugeRing`; for award/rarity grids use `BadgeTierGrid` (`VK-013`).
- **Two-tier composition (locked):** **Tier 1** = the **podium** — top-3 plinths in **2 · 1 · 3 stage order** (1st centre-tallest, 2nd left, 3rd right). **Tier 2** = **ranked rows** (#4+) beneath, each rank# + avatar + name + level badge + **XP `StatBar`** + honest delta chip. The user's **own row/card is a pinned anchor**, always visible.
- **Encoding (locked):** plinth fill/avatar ring/rank glyph = `--color-podium-gold/silver/bronze` (the **contained brand-sanctioned exception**, *identity only* on plinth/ring/glyph, **never** data ink). Plinth heights are **fixed ratios** (1st 100% · 2nd 78% · 3rd 64%), **not** scaled by XP (rank is ordinal — scaling would dishonestly imply magnitude). **Rank glyph never colour-alone:** crown (#1) · medal/laurel (#2/#3). **XP `StatBar`** (reuses `BarChart`/`StatBars` `VK-006`): orange fill over `--color-alpha-white-08` on `--track-inset`, width ∝ XP relative to the #1 leader on **one shared zero-baseline scale** (per-row re-normalisation forbidden as dishonest); the number is always shown beside the bar. **Delta chip (honest disclosed window):** ▲ green (climbed) · ▼ `--color-alpha-white-40` (slipped — a **neutral muted** arrow, **never** red) · — held; glyph + number always.
- **Brand / 60·30·10 / non-shaming (ethical core):** orange dominates data ink; green only for ▲ rank-up + arrival; purple never unless a sibling `TrendChart` carries a dashed-purple climb forecast. Podium metals are identity-only. **Non-shaming is the primitive's reason to exist:** no "you're behind #N", no greyed-as-failure low ranks, no loss-aversion demotion alarm / relegation countdown, no manufactured urgency; celebration is reserved for *climbing*; the own row is anchored and framed by *its* trajectory, not the gap to #1. A shaming/loss-aversion treatment is a **Critical**.
- **Depth (token-backed):** plinths on `ink-brown-800` + top-edge highlight + faint radial backplate; `--track-inset` **(mint)** recess under each plinth top and StatBar track; **only the #1 plinth** carries `--glow-orange-md` (~20px, **mint**) — the single leader cue (#2/#3 no glow; glow-on-all reads neon); avatar rings 2pt in the member's podium colour; row StatBars no glow.
- **Sizes:** hero plinths ~96–120px (centre tallest); avatars 56px (#1)/44px (#2–3)/36px rows; **compact competition mini-variant** plinths ~56px. Row height 72px (extends `LeaderboardRow`).
- **A11y:** podium announced in words + visible glyph — "First place, gold, [name], level [N], [XP] XP, [up/down N / held] this [period]"; rank movement = visible ▲/▼/— glyph + number, never colour-alone; XP always numeric beside its StatBar; podium edges/leader-glow boundary/StatBar fills/rank glyphs meet **WCAG 1.4.11 ≥3:1**; text ≥4.5:1; targets ≥44×44pt.
- **States:** **cold-start / community-of-one** → user on the #1 plinth at 0 XP / Lv. 1, #2/#3 **ghosted** + "invite friends to fill the podium" (never an empty stage or a fabricated rival); **early/partial** → real plinths + ghosted remainder, shared honest StatBar scale; **loading** → plinth skeletons that **rise** + bar/row skeletons; **empty** (friends-only) → invite copy, distinct from loading; **error** → "couldn't load rankings" + retry; own card "rank unavailable" (skeleton, never a fake #1); **offline** → cached banner.
- **Motion:** **hero draws first** — plinths **rise** 0→height (520ms `--ease-flow`, #1 → #2 → #3) with the leader glow blooming + glyphs settling → own-anchor delta chip slides + counts (280ms) → row XP StatBars rise L-anchored (520ms, 80ms stagger, scroll-into-view). A paired "your climb" `TrendChart` **draws itself** last. **`prefers-reduced-motion`** → plinths at full height, bars at final width, static.
- **Consumers:** Leaderboard [39] (minted here), Competitions [47] (compact mini-variant). Maps-to: new `PodiumRank.tsx`; rows extend `LeaderboardRow.tsx`; bars reuse `BarChart`/`StatBars` (`VK-006`); rank-history reuses `TrendChart` (`VK-016`).

### `VK-013` · BadgeTierGrid  ·  maps-to: **NEW** (`src/components/charts/BadgeTierGrid.tsx`; wraps `GaugeRing` micro-arcs + `MomentumBar` + rarity/mission/podium tokens)  — *minted in Batch 5 (Achievement Gallery [71])*
- **Purpose:** an achievement **rarity-graded badge wall** — a 2-column grid of tiles with earned / in-progress / **to-discover** states, where **RARITY is the new visual dimension** and progress toward the next unlock is honest. A trophy room without shaming the gaps.
- **When to use:** achievement galleries, milestone/streak-reward collections, any collectible badge set. One per screen (it is the body). Single score → `GaugeRing`; streak chain → `MomentumBar`.
- **Anatomy (locked):** each **tile** = `ink-brown-800`, `--r-xl` (28px), 1px state-border, ~180px tall, 2-col grid (12px gap): 56px **medallion** (artwork/domain-accent glyph) in an 80px centred area · name (14px Semibold) · domain tag + **rarity chip** · status chip · earned date.
- **Rarity encoding (identity, NOT data-ink — 60/30/10-safe like podium metals):** tile accent/glow = `--color-rarity-common/uncommon/rare/epic/legendary`; a **rarity chip** = rarity-colour text on `--color-rarity-*-subtle` 15% + the **word** ("Rare") — rarity is **never colour-alone**. The lone `rarity-rare` purple is *rarity identity* (always word-paired), **not** an SIA signal — it does not invoke the AI register.
- **Calibrated rarity glow (size-stepped, never neon):** earned tiles glow in the **rarity colour** at `--glow-orange-sm`-radius (~12px, **mint**) behind the medallion, alpha-stepped: common ~0% (flat) → uncommon ~18% → rare ~26% → epic ~32% → legendary ~40% (legendary brightest, well under neon); radius matches the 56px medallion; in-progress/to-discover carry **no glow**.
- **Per-badge progress arc (in-progress):** a thin **`GaugeRing` micro-arc** (≤24px, 2–3px, **no glow**) bottom-right of the desaturated (`white/30`) medallion, filled to the **honest `progress/target`**, orange on `--track-inset` + `--color-alpha-white-10`; "18/30" beside it → never arc-alone. 0/target shows a ghosted empty arc + "0/30" (distinct from a to-discover badge, which shows none).
- **States (per tile, non-shaming):** **earned** = full-colour medallion + rarity glow + green ✓ "earned" chip (glyph+word) + date, border rarity@20%; **in-progress** = desaturated medallion + micro-arc + orange "N/M", border `white/8`; **to-discover (locked)** = a **ghosted rarity-outlined silhouette** (rarity@15%, NOT a generic padlock) under **"to discover"** + a one-line "what unlocks this" teaser, border `white/5` — an *invitation*, never "locked"/"failed".
- **Detail facet (bottom sheet):** 96px hero medallion + a **tier ladder** (Bronze `--color-mission-bronze` → Silver → Gold: earned filled metal + ✓, current = pulsing rarity ring [the only sanctioned pulse — a "you are here" marker, not an alarm], locked ghosted) + in-progress `MomentumBar` + a constructive "To unlock" list + an orange "go to [domain]" CTA + an honest "12% of users have earned this" figure.
- **Sort:** earned (newest) → in-progress (highest %) → to-discover (closeness-to-unlock). **Low-motivation:** hide to-discover, promote >75% "almost there" badges (non-shaming by omission).
- **Brand / 60·30·10:** orange data-ink (arcs, momentum, CTA, active filter); green = arrival only; **purple absent — pure-gamification Product Mode, no SIA** (rarity-rare purple is identity, word-paired); rarity/mission/podium = identity accents only.
- **A11y:** tile `aria-label` "[name], [domain], [rarity], [earned / in-progress N of M / to discover]"; status & rarity never colour-alone (visible ✓+"earned", rarity chip+word, tier ✓/ring/ghost); load-bearing arcs/borders/tier-rings ≥ **1.4.11 3:1**; text ≥4.5:1; targets ≥44×44pt.
- **Motion:** tiles **stagger in** (40ms/tile, 280ms); in-progress micro-arcs fill (520ms) after landing; rarity glows **fade in 0→calibrated alpha** as each tile settles (glow *arrives*, never flashes); filter = 280ms crossfade; newly-earned (from Celebration [42]) = medallion scale 0.8→1.0 + rarity-coloured particle (600ms). **`prefers-reduced-motion`** → final state, arcs filled, glows at rest.
- **Consumers:** Achievement Gallery [71] (minted here), Streak milestones [59], RPG Character [19] (achievement badges), Celebration Overlay [42].

### `VK-014` · TimelineAgenda  ·  maps-to: **NEW** (`src/components/charts/TimelineAgenda.tsx`)  — *minted in Batch 5 (Streak Details [59])*
- **Purpose:** a **dated temporal track** of scheduled/sequenced events or milestones (reached / current / upcoming) along a single **drawn progress path** — the journey/agenda view, distinct from `CalendarHeatmap` (daily *density*, not a *checkpoint sequence*).
- **When to use:** milestone-reward timelines (Streak [59]), day agendas (Schedule [41]), adherence tracks (Medication [60]), call key-moment sequences (Call Summary [79]). Pure density → `CalendarHeatmap`; single bounded level → `GaugeRing`/`ArcGauge`.
- **Orientation (locked):** **vertical** by default (top→bottom, scales to many nodes); a **horizontal** variant for short fixed sequences (≤6 key moments) where time-as-x is the gestalt.
- **Node encoding (token-backed):** **reached/earned** = filled `--color-forest-green` + white check; **current/next** = `--color-brand-orange` 2px ring (no fill) + `--glow-orange-sm` (~12px **mint**) pulse — the single focal accent; **upcoming/locked** = `--color-alpha-white-10` fill + lock/dot glyph at `--color-alpha-white-30`. Diameter 20–24pt (min-44 hit box). Status always glyph + colour.
- **Path encoding (Living-Line family, token-backed):** a **drawn** `--stroke-base` 4px round-capped line (§8); the **reached segment** runs `--grad-progress` **(mint)** orange→green; the **unreached segment** is `--color-alpha-white-08`; the boundary sits at the current/next node — the eye traces a literal path of progress. Reuses the Living Line gradient so it reads as one family with `TrendChart`/`Sparkline`.
- **Row anatomy:** primary label (e.g. "30 days" / "9:00 AM") · temporal caption ("earned [date]" / "in N days" / "due 9:00") in `white/40` · optional trailing value (XP reward, domain tag, duration) green (earned) / `white/30` (locked), tabular-nums.
- **Depth / brand:** only glow is `--glow-orange-sm` on the single current/next node (never 32px on a 24pt node); `--track-inset` unused (the path *is* the depth cue). Orange = current node + reached-path effort segment; green = reached nodes + arrival segment + earned values; **purple absent** unless a node is SIA-scheduled (then that dot is purple); domain/podium/rarity/mission colours tint a node only as identity. **Never an alarm-red node** — overdue = glyph + muted treatment.
- **Non-shaming (ethical):** upcoming/locked nodes are **invitations** ("next: [reward] in N days"), never "you haven't reached…"; the path **never turns red or visibly breaks**; on a reset/lapse, **reached nodes stay reached** (past achievements are permanent) — only the unreached segment re-marks its current node; no loss-aversion countdown.
- **A11y:** timeline `aria-label` summary ("3 of 7 reached, next 60 days in N days"); each node `role="listitem"`/`button`, label "[primary], [status], [value], [temporal caption]"; status in words + visible glyph (✓/ring/lock); path stroke + node fills + reached/unreached boundary ≥ **1.4.11 3:1** (the `white/08` unreached track is decorative, exempt); text ≥4.5:1; nodes ≥44×44pt; linear AT reading order.
- **States:** **cold-start / none-reached** → first node pulses "next", rest locked, path fully `white/08` (aspirational, never empty/red); **partial** → split at current node; **all reached** → full orange→green path + calm completion cap; **loading** → node skeletons + path draws in; **error** → "couldn't load timeline" + retry, reached nodes from cache.
- **Motion:** path **draws itself** top→bottom (horizontal: L→R) via `stroke-draw` (`--dur-flow` `--ease-flow`), reached orange→green drawing before unreached; nodes settle (0.8→1, 280ms) as the path reaches each; current node `--glow-orange-sm` pulse loops 2s; never opacity-fades (§8). **`prefers-reduced-motion`** → full path + settled nodes instantly, pulse off.
- **Consumers:** Streak Details [59] (milestone-reward timeline — minted here), Schedule [41] (day agenda), Medication adherence [60], Call Summary [79] (key-moments). Maps-to: NEW SVG path + flexbox rows; reuses `stroke-draw` + the Living Line gradient.

### `VK-019` · CompareGrid  ·  maps-to: **NEW** (built on the deployed `TierCard.tsx` `Check`/`Minus` glyph pattern)  — *minted in the QA pass (Paywall [43])*
- **Purpose:** an honest **feature × tier comparison matrix** — the conversion-surface read a chart cannot give. Not a data chart; a glyph-paired comparison table promoted to a kit primitive so Paywall [43] and Subscription [23] share one honest pattern (and never borrow `BadgeTierGrid` `VK-013`, which is an achievement-rarity wall, not a comparison).
- **Encoding (never colour-alone):** rows = gated features (`_tier-matrix.md`), columns = the 2–3 relevant tiers (never all four — a modal would overwhelm); each cell = a **visible `Check` / `Minus` glyph + label**. Owned-✓ = `--color-forest-green` (arrival), unlock-✓ = `--color-brand-orange` (value to gain), absent = `--color-alpha-white-30` `Minus` — the glyph differs by meaning, so it is legible in greyscale and to colour-blind users.
- **Depth / single focal cue:** exactly **one** focal element — the recommended column on a 1px `--color-brand-orange` @30% border + a single `--glow-orange-md` **(mint, VK-017)** (~20px, never the 32px hero glow on a column edge); all other columns flat. 1px `--color-alpha-white-08` cell separators; faint radial backplate, not flat boxing. Prices ride as `KPIStatTile` (no delta arrow — price is not a trend).
- **Brand / non-shaming (ethical core):** orange = recommended column + unlock-✓ + CTA; green = arrival (owned-✓ + post-purchase success); **purple absent** (no SIA on a paywall); calibrated red only on genuine operational purchase-failure status (glyph-paired), never on the matrix, never as urgency. **No dark patterns** — no countdown, no fake scarcity, no pre-checked toggle; "maybe later" stays equally weighted.
- **A11y:** table/grid role + a text-summary `aria-label`; every ✓/— a visible glyph + accessible label; cells, recommended-column border, and the focal-glow boundary ≥ **WCAG 1.4.11 ≥3:1**; targets ≥44×44pt.
- **Motion:** structure→focal→support — headers/labels rise → cells settle top-to-bottom (cells *arrive*, never flash) → the recommended-column `--glow-orange-md` **blooms once and rests** (no loop) → prices count up. No urgency motion (a pulse would be a dark pattern). `prefers-reduced-motion` → final state, glow at rest, no count-up.
- **Consumers:** Paywall [43] (minted here), Subscription & Billing [23].

---

## Kit-level gaps (logged as `VK-###` in findings-ledger.md)

| Primitive | Status | Priority | Note |
|---|---|---|---|
| GaugeRing | depth-upgrade | High | extend `ProgressRing` (arc gradient/glow/inset/ticks); sizes 36/48/96 today |
| Sparkline (VK-001) | **NEW** | High | a tiny Living Line; none exists |
| MetricCard (VK-003) | upgrade | Medium | extend `HealthMetricsStrip`; visible in-range sign |
| MomentumBar (VK-004) | **NEW** | Medium | **continuous** orange→green fill, not segments |
| ConstellationRadar (VK-005) | depth-upgrade | Medium | gradient fill + glow + center hub + **draw** (not scale) |
| TrendChart (VK-006) | wire-up | Medium | wrap unused `LineChart`; dashed-**purple** projection. *Plumbing — reprioritised below.* |
| BarChart (VK-006) | wire-up | Medium | wrap unused `BarChart`; this-week orange / last-week green |
| Donut / Pie (VK-007) | **NEW** | Medium | **specced** (Batch 3, Nutrition [28]) |
| KPIStatTile (VK-008) | **NEW / extract** | Low | standardize scattered stat tiles |
| CorrelationMatrix (VK-009) | **NEW** | **High** | **specced** (Batch 2, Intelligence [48]) |
| NetworkGraph (VK-010) | **NEW** | **High** | **specced** (Batch 2, Knowledge Graph [72]) — the novel one |
| ScatterPlot (VK-011) | **NEW** | Medium | **specced** (Batch 3, Sleep [58]; reused Energy [63]) |
| ArcGauge (VK-015) | **NEW** | Medium | **specced** (Batch 3, Energy [63]) |
| PodiumRank (VK-012) | **NEW** | Medium | **specced** (Batch 5, Leaderboard [39]; reused Competitions [47]) |
| BadgeTierGrid (VK-013) | **NEW** | Medium | **specced** (Batch 5, Achievement Gallery [71]; wires rarity/mission tokens) |
| TimelineAgenda (VK-014) | **NEW** | Medium | **specced** (Batch 5, Streak Details [59]; reused Schedule/Medication/Call) |
| Living Line (VK-016) | **NEW** | **High** | the signature; re-bases Sparkline/TrendChart/MomentumBar |
| Depth tokens (VK-017) | **NEW (tokens)** | Medium | `--grad-orange/-progress`, `--orange-light`, `--track-inset`, `--glow-*-md/-sm`, `--stroke-*` absent from `globals.css`; mint in viz-build |
| Projection colour (VK-018) | **fix** | **Critical** | kit said "projected ≠ purple"; §11 says projection **is** dashed purple — reversed |
| CompareGrid (VK-019) | **NEW** | Medium | **specced** (QA pass, Paywall [43]); honest feature×tier matrix, glyph-paired ✓/— (never colour-alone), single recommended-column focal cue; Subscription [23] reuses. Built on deployed `TierCard.tsx` |
| CalendarHeatmap | ready | — | deployed; reuse |
| MacroBar / XPBar | ready / wire-up | — | MacroBar deployed; XPBar built-but-unused |

**Reprioritisation:** the old REPORT ranked `VK-006` (wire up unused line/bar charts) as the #1 cross-cutting gap. It is real but **plumbing**. The higher-leverage, higher-risk gaps are the **net-new, identity-defining** primitives — `VK-016` Living Line, `VK-010` NetworkGraph, `VK-009` CorrelationMatrix — which are missing entirely and gate Batch 2. These are specced first; VK-006 follows in Batch 3.
