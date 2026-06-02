# Energy Tracking — Premium Visualization Recommendations

> Companion to `63-energy-tracking.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (54) → specced-target A− (87)** under the revised 10-dimension rubric. This screen **mints `VK-015 ArcGauge`** (the new energy hero) and **reuses `VK-011 ScatterPlot`** (the time-of-day cloud minted on Sleep [58]).

## Context — how Energy reads premium *the Balencia way* (vs Oura / Gentler Streak)

The benchmark for this cluster is **Oura + WHOOP** (recovery gauges, readiness arcs, time-of-day patterns) plus **Gentler Streak's** non-shaming thesis. Energy Tracking is, today, an *observatory written as a list*: the screen's single most important fact — "your energy is 7 right now" — is a bare 48pt number in a flat card, with a segmented `polyline` timeline, a **decorative non-data SVG path** for the trend, and text bars for peaks/correlations. It reads functional, not crafted, and it opens on a SIA note + a number, with **no focal hero**.

The Balencia move is *not* to clone Oura's readiness ring. Oura's signature is a cool full-donut score; ours is the **ArcGauge** — an open 240° instrument arc that reads as a fuel/charge dial (energy *is* a battery metaphor, reinforced by the existing `BatteryCharging` icon), carved with **warm orange depth** on `ink-brown-800`, and — uniquely — every time-series on the screen is the **Living Line**, not a generic chart. The differentiators no wearable shows:

| Premium quality | Oura / WHOOP device | **Balencia's ownable equivalent** |
|---|---|---|
| A focal "how am I" score | Cool full readiness donut | **`ArcGauge`** — an open 240° warm orange arc (0–10), charge-dial metaphor, glow + ticks |
| Time-of-day energy shape | Heatmap band / clock-dial | **`ScatterPlot` cloud** (VK-011) — every log as a star dot, x=hour y=energy, tight cluster = a reliable rhythm |
| Multi-day pattern | Generic trend line | **`TrendChart` Living Line** — orange effort→green arrival, **dashed-purple SIA projected** optimal curve |
| "What drives it" | Tag chips / factor list | **Correlation strength bars** with a **visible +/− sign**, reinforcing vs draining paired with direction, never colour-alone |
| Today's arc | — | **`Sparkline`** Living Line micro-trend in the timeline card |

**The teal correction (a brand finding, not a clone risk):** the current spec colours its *data ink* — slider fill, sparkline, trend line, peak circles, correlation bars — in **wellbeing-teal `#14B8A6`**. Under kit law (`CONSISTENCY.md` §2) **orange dominates data ink (60%); domain colour is for identity only**. So in the specced design the **ArcGauge fill, the Living Lines, the ScatterPlot dots, and the positive correlation bars are orange**; teal stays the screen's *identity* accent (header line, eyebrows, RPG badge, chronotype icon, the "best window" label). This is `S63-V07` and it is what makes Energy read as one family with Sleep [58] and Home [12] rather than a teal one-off.

Decisions honored: **distinct Balencia signature** (ArcGauge + Living Line, not an Oura donut); **spec-first** (read-only); premium depth inside 60/30/10; **non-shaming** (a low energy reading is framed as state + a coaching lever, never a verdict — Gentler Streak's bar).

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex. Verified against `globals.css`: `--glow-orange/green/purple` exist **only at 32px** (the `-md`/`-sm` steps are absent → mint); `--color-domain-wellbeing` `#14B8A6`, `--color-stalled-amber` `#F59E0B`, `--forest-green` exist; all gradient/inset/stroke tokens are **absent** → mint.

| Token | Intended value | Use on this screen |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the ArcGauge/area gradient |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | ArcGauge arc fill, TrendChart area fade |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | Living Line effort→arrival (timeline + trend) |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed ArcGauge track (carved depth) |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | ArcGauge value/needle glow; ScatterPlot "now" dot |
| `--stroke-thin/base/bold` | `2 / 4 / 8px` (§8) | sparkline / trend / ArcGauge arc widths |

---

## The recommendations

Ordered by leverage. R1 is the hero (mints the primitive); R2 is the cluster's signature differentiator; R3–R6 establish the Living Line + honest correlation + states.

### R1 — `ArcGauge` (VK-015, MINTED HERE): the energy hero

The Current Energy Display card is replaced by the **ArcGauge** — an open arc (not a full ring) sweeping **240°** from the 7-o'clock to the 5-o'clock position, 0 at the left foot, 10 at the right foot, with the current value as the dominant center number. Energy is a *charge level*, so an open dial (a fuel/battery arc) reads more honestly than a full progress ring (which implies a completable 100%).

```
        ┌─────────────────────────────────┐
        │            ENERGY NOW           │
        │        ·  ·  ·  ·  ·  ·          │  ← 12 ticks, white/25, behind arc
        │     ╭───────────────────╮        │
        │    ╱        ┏━━━┓        ╲       │  ← arc fill orange→ (warm), 8px
        │   │         ┃ 7 ┃         │      │  ← center value text-display, glow
        │   │         ┗━━━┛         │      │     "afternoon" teal tag under
        │    ╲      feeling good   ╱       │
        │  0  ╰─ ─ ─ ─ ─ ─ ─ ─ ─╯  10     │  ← unfilled tail = track (inset)
        │        ▲ +1 vs morning           │  ← honest intra-day delta (KPI-style)
        └─────────────────────────────────┘
   filled 0°→168° (7/10 of 240°) orange · tail 168°→240° track
```

- **Geometry:** 240° sweep, gap centered at the bottom (a "broken" foot, so it never reads as a closed ring). Hero size 160px outer, **8px arc** (`--stroke-bold`). Value maps `0→10` linearly across the 240°; the filled portion is `(value/10)·240°`.
- **Depth (token-backed):** arc fill = arc-following `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep *along* an arc (the angular-gradient trap); the spec must say conic. Track = `--color-alpha-white-10` over `--track-inset` **(mint)** inset for carved recess. Glow = `--glow-orange-md` (~20px, mint — **not** the full 32px `--glow-orange`, which would bloom past a 160px gauge). 12 radial ticks (6px, `--color-alpha-white-25`) behind the arc for instrument precision. Center value `text-display` white + faint `--glow-orange-sm`.
- **Non-shaming colour band (honesty over alarm):** the arc is **always orange** (brand data ink). A *low* reading is **not** recoloured red — the screen's prior "low=red glow" implies a verdict. Instead, low energy (1–3) shows a small **moon/rest glyph** + a constructive micro-copy ("low right now — a short walk or water often lifts this"), high (8–10) a **spark glyph**. Status is carried by the **number + glyph + label**, never by an alarm colour. (This resolves the spec's red/amber/teal glow into one calm orange instrument — `S63-V07`.)
- **Motion:** arc fills `0→value` (`ring-animate`, `--dur-slow` 520ms `--ease-flow`); center value counts up 520ms; ticks are static. On a fresh log, the arc **re-sweeps** to the new value and the center number count-ups.
- **States:** no-log-today → arc at rest at a **ghosted** 0-position foot (a faint full track, **not** a filled 0 that reads as "your energy is zero"), center shows "—" with "no energy logged today"; loading → track + ticks visible, arc shimmer sweeps, morphs into the fill.
- **Data:** `energyTracking.current.value/context/note` (`mock.ts`).

### R2 — `ScatterPlot` time-of-day cloud (VK-011, reuse 58's mint): the differentiator

Inside the **Energy Trend** section, *below* the multi-day Living Line, add the **ScatterPlot / ConsistencyCloud** — **x = hour of day (6am→11pm), y = energy (1–10)**, one **orange star dot per log** across the selected window. This is the view Oura's clock-dial gestures at but no app renders as a true scatter: a **tight vertical cluster** at a given hour = a reliable rhythm; a **wide scatter** = volatile energy. SIA's detected peak window is a faint vertical orange band behind the cluster.

```
 10 ┤            ✦ ✦                          ENERGY × TIME OF DAY
  8 ┤        ✦ ✦✦✦✦         ✦                 ▓ = peak window (9–11am)
  6 ┤   ✦ ✦  ▓▓▓▓  ✦ ✦  ✦ ✦ ✦   ✦ ✦
  4 ┤ ✦       ▓▓▓▓      ✦   ✦  ✦   ✦ ✦
  2 ┤                              ✦   ✦
    └──6a───9a───12───3p───6p───9p──────→
        tight cluster = reliable    wide = volatile
```

- **Encoding:** dots = `--color-brand-orange` star dots, r=3px, faint `--glow-orange-sm` on the most recent ("now") dot; peak band = `--color-brand-orange` at ~8% behind the cluster (identity teal label "best: 9–11am" sits beside it). A mean line per hour-bucket is **not** drawn here (that's R3's job) — this is the *spread*, deliberately.
- **Honesty:** x and y are zero-anchored at their true range (6am, energy 1); sparse data (<7 logs) shows the dots **without** the peak band and a "more logs sharpen your pattern" note — no inferred cluster from thin data.
- **Reuse:** this is the **same `VK-011` primitive minted on Sleep [58]** (bedtime/wake consistency cloud) — identical dot/cluster/glow parameters, just different axes. Cross-screen reuse is the kit's whole point.
- **Motion:** dots stagger-in (`radar-dot` 420+index·40ms) after the trend line draws; reduced-motion → all dots at final position.
- **Micro-interaction:** tap a dot → tooltip (exact energy + time + context tag); tap the peak band → SIA Chat with scheduling context.
- **Data:** aggregated `energy_logs` over the selected 7/14/30d window.

### R3 — `TrendChart` Living Line: the multi-day pattern (replaces the decorative path)

The Energy Trend area chart today is a **hardcoded decorative SVG path** (`M0 112 C38 90 …`) that represents *no real data* — a `Design-System-Overview.md` §11 violation (no decorative chart). Replace it with the **`TrendChart` Living Line**: average energy by time-of-day across the window, as one continuous **curved, round-capped** stroke running **orange (effort) → green (arrival)**, with the **SIA "ideal energy" curve as a dashed-purple `#7F24FF` projection** — which is exactly the brand-sanctioned projection colour (§11), and which the current spec *already* gestures at ("AI-projected trend, dashed purple"). This makes Energy's projection correct-by-default.

```
 ENERGY TREND   [7d][14d][30d]
 ^10
  8 ┤        ╭─────╮              ╭╴╴╴╴ ← dashed purple = SIA ideal
  6 ┤    ╭───╯     ╰──╮      ╭────╯       (projection, §11)
  4 ┤ ───╯           ╰──────╯  ●          ← solid orange→green Living Line
    └─6a───9a──12──3p──6p──9p─→  ● green arrival dot
    avg: 6.4                 best: 9–11am
```

- **Locked params (CONSISTENCY TrendChart):** actual = solid orange Living Line 2px curved; projected = dashed purple `#7F24FF` 2px; area = `--grad-orange` **(mint)** vertical fade ≤25%; zero-baselined y (1–10), **shared scale across 7/14/30d** so switching windows is honest; green milestone dot at the day's peak.
- **States:** sparse (<7 points) → dots only, no connecting line, "more data needed for trends" (no fabricated curve); loading → skeleton axis + a flat line that draws into shape.
- **Motion:** the line **draws itself** (`stroke-draw`, `--dur-flow` 1200ms) on enter / segment change — **not** a fade; horizontal scrub shows the value at the finger.
- **Data:** aggregated `energy_logs` grouped by time-of-day bucket.

### R4 — `Sparkline` today's-arc micro-trend (Living Line)

The Today's Energy Timeline card's `polyline` (straight segments, the "equalizer" anti-pattern) becomes a **`Sparkline`** — a tiny Living Line: **exactly 7 points** (the day's logs resampled to 7), `--stroke-thin` 2px **curved** orange, no axes/grid, **green end dot** when the latest log is the day's high. The "now" dot keeps its `--glow-orange-sm`. The avg + log-count caption stays.

- Single log → one dot, no line; no logs → flat **ghosted** dashed line at y=5 (no-data ≠ a real 5), "log your first energy reading."
- **Data:** `energyTracking.timeline` (today's logs).

### R5 — Correlation strength bars: honest + non-shaming, sign never colour-alone

The Correlations card keeps its horizontal-bar form but adopts kit honesty:
- **Direction by sign, not colour:** reinforcing factors (sleep +1.8, meals +1.2, workout +0.9) = **orange** bars with a leading **`+`** and an **up-arrow glyph**; draining factors (stress −1.4) = a **desaturated cool tint** with a leading **`−`** and a **down-arrow glyph** — `CorrelationMatrix` (VK-009) encoding law: *always paired with a sign/arrow, never colour-alone*. This swaps the current teal/amber pair (two domain colours doing semantic work) for **orange-dominant + signed**, satisfying both 60/30/10 and 1.4.11.
- **Honest scale:** bars normalize to the strongest |impact| = full width, shared across all rows (one scale), zero-anchored; rows sorted by |impact|.
- **Non-shaming framing:** "stress drains your energy" is a *lever* ("manage stress → reclaim ~1.4 energy points"), not a failure — the row drills to the relevant domain (Stress [52] / Sleep / Nutrition [28] / Fitness [26]).
- **Data:** `energyTracking.correlations` (already carries `positive` + `impact` + `width`).

### R6 — Peak Hours intensity = `MomentumBar` mini-fills (depth pass)

The Peak Hours rows' four discrete circles become small **continuous** `MomentumBar`-style fills (orange `--grad-progress`, radius-pill) so "intensity" reads as a filled level rather than a dotted gauge — and matches the Living-Line family. Low-energy windows keep a distinct **rest glyph** (not an alarm colour). Minor, but it removes the last "dotted equalizer" on the screen.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 ArcGauge **(MINT VK-015)** | — (new) | `src/components/charts/ArcGauge.tsx` (new) | conic-mask arc, ticks, glow-by-size, inset track (VK-015, VK-017) |
| R2 ScatterPlot (VK-011) | **58's mint** | `src/components/charts/ScatterPlot.tsx` (new, shared) | star dots, peak band, cluster (VK-011) |
| R3 TrendChart | unused `LineChart` | `src/components/charts/LineChart.tsx`, `mock.ts` | wrap as Living Line + dashed-purple projection (VK-006, VK-016, VK-018) |
| R4 Sparkline (VK-001) | timeline `polyline` | energy `page.tsx`, `mock.ts` | curved 7-pt Living Line (VK-001, VK-016) |
| R5 Correlation bars | existing bars | `mock.ts` `correlations` | signed direction, orange-dominant (VK-009 encoding) |
| R6 Peak fills | circles | `mock.ts` `peakHours` | MomentumBar mini-fill (VK-004) |
| Depth tokens | `--grad-*`, `--track-inset`, `--glow-*-sm/md`, `--stroke-*` | `globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates **data ink**: ArcGauge arc, both Living Lines, ScatterPlot dots, positive correlation bars, peak fills, the Log CTA + segmented-active control. This is the screen's biggest correction — data ink moves teal→orange.
- **Green (30%)** for arrival/milestone only: the Living Line's arrival segment + green end/milestone dots + the log-success flash.
- **Purple (10%)** stays SIA-only — the SIA coaching note dot, the SIA insight border/dot, **and the brand-sanctioned dashed-purple projection** on the TrendChart (§11 — correct, not a violation; the only chart-purple on the screen).
- **Wellbeing-teal** is now **identity only**: header accent line, domain eyebrows, RPG skill badge, "best: 9–11am" label, chronotype icon. It no longer carries primary data ink.
- **Amber** retires from data semantics (was negative-correlation + low-energy): replaced by signed-direction (cool desaturated + `−`) and rest-glyph framing.
- **Glow** uses the calibrated size-stepped scale (`--glow-orange-md` on the 160px gauge, `-sm` on small dots) — warm depth, never neon.
- **Accessibility:** text/aria equivalent on every chart (the spec's VoiceOver summaries already cover this); visible status signs (glyphs + signs, never colour alone); WCAG 1.4.11 ≥3:1 on the arc, Living Lines, dots, and the filled/track boundary; reduced-motion → final state with the Living Line's static form (completed stroke + green end dot) and the arc at rest.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint depth tokens first (everything depends on them).
2. **R1 ArcGauge (VK-015)** — the hero + the new primitive; biggest perceived-quality jump.
3. **R3 TrendChart** — kills the decorative non-data path (a §11 honesty fix).
4. **R2 ScatterPlot (VK-011)** — the differentiator cloud (shared with Sleep [58]).
5. **R4 Sparkline + R5 correlation signs + R6 peak fills** — Living-Line family + honesty pass.

Each is independently shippable and verifiable. **Blocking kit dependencies:** R1 ⇒ `VK-015` (minted here); R2 ⇒ `VK-011` (shared, Sleep batch); R3 ⇒ `VK-006`/`VK-018`. Without VK-015 the screen cannot reach A− (no hero) — so the mint is the gating item.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/features/energy`, screenshot before/after; verify the **ArcGauge is an open 240° arc** (not a full ring, not a flat number), the trend is a **real data-driven Living Line** (not the hardcoded path), the timeline is a **curved 7-pt sparkline** (not segmented polyline), the scatter cluster renders, and correlations carry a **visible +/− sign** (not colour-alone).
- `npm run check` — **`verify:brand` must stay green**; confirm **orange now dominates data ink** (teal demoted to identity).
- Confirm cold-start (no-log ArcGauge ghosted foot, sparse-data scatter/trend), loading, and error states render per spec — never a filled 0 or a fabricated curve.
