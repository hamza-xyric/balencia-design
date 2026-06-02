# Sleep Tracking — Premium Visualization Recommendations

> Companion to `58-sleep-tracking.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (54) → specced-target A− (86)** under the revised 10-dimension rubric.
> **This screen MINTS `VK-011` ScatterPlot / ConsistencyCloud** — the consistency primitive Sleep and Energy both consume. Its full kit spec is in the "VK-011 primitive" section below; the orchestrator folds it into `VIZ-KIT.md`.

## Context — how Sleep reads premium *the Balencia way* (vs Oura/WHOOP)

Sleep is the canonical **Recovery / Sleep / Energy / Stress** cluster screen; its benchmark is **Oura + WHOOP**. Those apps set the bar for sleep-stage donuts, recovery gauges, consistency clouds, and readiness — but they read as *clinical instruments on cold slate*. Balencia's job is to deliver the same analytic depth as a **calm, warm coach**: the data is at least as rich (Oura shows stages + a consistency band; we show stages **and** a true bedtime/wake consistency *cloud* **and** a 30-day calendar **and** a duration Living Line **and** a non-shaming SIA read across all of it), but it must read as *ours* — warm glow on `ink-brown-800`, the Living Line as the duration trend, and an honest, never-shaming frame.

Three things make this screen Balencia and not an Oura screenshot:

1. **The duration trend is the Living Line, not Oura's bar histogram.** Oura/WHOOP draw a bar-per-night sleep histogram. We draw the **continuous, curved, self-drawing Living Line** (`VK-016`) running orange (effort) → green (arrival at/above the 7.5h target), with the SIA forecast as a **dashed-purple** tail. No competitor structurally has this. The spec today calls for a teal bar chart — that is the single biggest "we look like everyone else" gap, and R4 reverses it.
2. **The hero is a warm GaugeRing, not a recovery dial on slate.** Oura opens on a readiness score in a cold ring. We open on a **sleep-score GaugeRing** with an arc-following orange→green gradient, a size-calibrated warm glow, a beveled inset track, and recovery as a second small reading — the "carved instrument" feel, warm not neon.
3. **Consistency is a *cloud*, framed as a coach, not a verdict.** Oura's bedtime consistency is a tidy band. Ours is `VK-011` — a real x/y **ConsistencyCloud** where **cluster tightness *is* the signal**: tight cluster = consistent, scattered = variable, and the SIA read frames a wide cloud as "your body likes a rhythm — let's find one," never "your sleep is bad."

**Determinism & non-shaming are locked in.** Every depth value is token-backed (table below). The recovery indicator, quality, and consistency never read as a verdict on the user's worth; weekend drift is surfaced as a *pattern to coach*, not a failure; a missed night is "one night doesn't break a streak."

### Sleep-accent reconciliation (a spec-vs-canonical conflict this audit resolves)

The spec header says **Register = Wellbeing Mode (wellbeing-teal `#14B8A6`)** and its Color Map paints every chart teal. But the screen's own Audit Feedback Integration (B15-F15 / Q49) resolves the **canonical sleep accent to `sleep-indigo` `#818CF8`**, and the prototype route already renders `text-domain-sleep` (sleep-indigo) for eyebrows, badge, bars, and dots. **This audit treats `sleep-indigo #818CF8` as the screen's domain-identity colour** (it is the registered `--color-domain-sleep` in `globals.css`). All "domain" references below mean sleep-indigo. Teal is retired from this screen except where a broader wellbeing surface genuinely owns it. This is logged as finding **S58-V07** so the spec's Color Map and Register line get reconciled in the same pass.

---

## What reads premium — and how we do it *our* way (not Oura's)

| Premium quality | Oura/WHOOP device | **Balencia's ownable equivalent** |
|---|---|---|
| A clear focal score on landing | Readiness/recovery dial on slate | **Sleep-score `GaugeRing`** (arc-gradient orange→green, warm `--glow-orange`, inset track) — warm, not clinical |
| Sleep architecture | Stage donut (light/deep/REM) on cold neutrals | **`Donut` (VK-007)**, true whole, sleep-indigo family + orange primary slice, warm depth |
| Schedule regularity | Tidy consistency band | **`VK-011` ConsistencyCloud** — a real x/y cloud where *tightness is the signal*; SIA frames it, never shames it |
| Long-range adherence | Month grid | **`CalendarHeatmap`** (deployed primitive, reused as-is) |
| Duration over time | Bar histogram | **`TrendChart` = the Living Line** (curved, draws itself, orange→green, dashed-purple SIA projection) |
| Layered depth | Cold neon glow / inner shadow | **Warm** `--glow-orange/-md/-sm` on `ink-brown-800` + `--track-inset` |

**Root cause of today's flatness:** we own the raw materials but don't deploy them, and the depth tokens are absent. Concretely, in `src/app/features/sleep/page.tsx` today: the sleep score is bare text and recovery is a green number; there is **no stage donut**; the trend is a hand-rolled `<div>` bar stack with `shadow-[var(--glow-purple)]` on each bar (**purple glow on a non-SIA chart = a 60/30/10 violation**, and a 32px neon glow on a ~22px bar = a depth failure); the quality "trend" is a straight-segment `<polyline>` (no curve, no draw, not a Living Line); the consistency "dots" are hand-placed `left:%` literals, not derived from real bedtime variance; and there is no calendar heatmap. The upgrade is composition + a depth pass + minting tokens — plus **one net-new primitive (`VK-011`)** — not new charting infra.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex:

| Token | Intended value | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient (named once) |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | gauge/ring/area/donut depth |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | the Living Line effort→arrival |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed ring/track/cloud-plate |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | size-stepped glow (hero ring / dots) |
| `--stroke-thin/base/bold` | `2 / 4 / 8px` (§8) | stroke widths |

Existing tokens reused as-is: `--color-domain-sleep #818CF8`, `--color-brand-orange #FF5E00`, `--color-forest-green #34A853`, `--glow-orange (32px)`, `--color-alpha-white-10/08/05`.

---

## The six recommendations

Ordered by leverage. R1 is the hero; R6 mints the shared consistency primitive.

### R1 — `GaugeRing`: the sleep-score hero (the focal viz the screen lacks today)

Today the Last Night card opens on a 36pt **bare number** ("7.2 hrs") + orange stars + a green recovery percentage — no focal visualization. Add a **hero `GaugeRing`** (96px) as the card's left anchor, encoding the **sleep score** (a 0–100 composite the data already implies via quality + duration + recovery), with the hours number kept *inside or beside* the ring as the readout, and **recovery as a second 48px `GaugeRing`** to its right.

```
┌─────────────────────────────────────────┐
│ LAST NIGHT                 ◷ Synced·Oura │
│        ╭───────╮                         │
│       ╱   84    ╲     ★★★★☆  quality      │  ← 96px sleep-score GaugeRing
│      │  7.2 hrs  │    ╭────╮              │    arc orange→green, warm glow,
│       ╲  score  ╱     │ 78 │ recovery     │    inset track; 48px recovery ring
│        ╰───────╯      ╰────╯              │
│   bedtime 11:15p  →  wake 6:28a          │
└─────────────────────────────────────────┘
```

- **Depth (token-backed):** arc-following stroke = `--grad-orange` **(mint)** via a **conic-gradient behind a circular mask** (an SVG `linearGradient` cannot sweep along an arc — specify the conic approach); 8px stroke (`--stroke-bold`) on the 96px ring, 4px (`--stroke-base`) on the 48px recovery ring; track = `--color-alpha-white-10` over `--track-inset` **(mint)** for a beveled recess; glow = `--glow-orange` (32px) on the 96px hero, `--glow-orange-md` (~20px, mint) on the 48px recovery ring — **never** the full 32px on the 48px ring (that swamps it). Green at in-range (recovery > 70%, score ≥ target band).
- **Component reality:** `ProgressRing.tsx` is **locked to `36 | 48 | 96`, flat 2-tone, single-tone arc, no glow, no inset, no domain mode** — the 96px hero needs the `GaugeRing` upgrade (arc gradient + glow + inset). Tracked under VK-002 + VK-017.
- **Recovery — non-shaming + a11y:** keep recovery as a `GaugeRing` whose colour follows the existing band (green > 70%, amber 40–70%, red < 40%) **but pair every band with a visible glyph/word** ("recovering" / "building" / "low") so it is never colour-alone, and frame the low band constructively in the SIA read.
- **Motion:** the hero ring fills 0→value (`ring-animate`, `--dur-slow` 520ms `--ease-flow`); the score counts up 520ms; recovery ring fills after. Hero ring is the **first** thing that animates on this screen.
- **Data:** `sleep_logs` (duration, quality) + `daily_health_metrics` (recovery_score) → `sleepTracking.lastNight` (`mock.ts`).

### R2 — `Donut` (VK-007): the sleep-stage breakdown (true whole)

The spec surfaces sleep stages only in high-motivation ("sleep stage breakdown if wearable provides it") and the prototype has **no donut at all**. Add a **stage `Donut`** to the Last Night card (or directly below it when stages are available): **light / deep / REM** as a true whole summing to total time asleep.

```
        ╭─────────╮      ● Light   3h 50m   53%
       │   ◜‾‾◝    │      ● Deep    1h 20m   18%
       │  │ 7.2h │ │      ● REM     2h 05m   29%
       │   ◟__◞    │      ───────────────────────
        ╰─────────╯      total asleep  7h 15m
```

- **Encoding (honest whole):** the three arcs **sum to total time asleep** (not to 100% of time-in-bed unless awake-in-bed is shown as a fourth muted slice). **Primary/largest slice = orange `#FF5E00`**; the other two = **sleep-indigo `#818CF8`** and a desaturated sleep-indigo tint (identity family, distinct, never purple — purple is SIA-only). 2px gap, rounded slice caps, consistent inner-radius per `CONSISTENCY.md`.
- **Depth:** slice fills carry a subtle `--grad-orange`/domain-tint depth; the donut sits on a faint radial backplate; center label = total asleep (`text-h2`).
- **a11y:** each slice has a **legend row with a visible dot + label + value** (never colour-alone); the `aria-label` reads "light 3h 50m, deep 1h 20m, REM 2h 05m, total 7h 15m."
- **States:** **manual-entry / no wearable → the donut is hidden** (stages are wearable-only) and replaced by the hours readout — *not* a fake zero donut. Loading → ghost ring that fills into the arcs.
- **Data:** `daily_health_metrics` stage fields when `provider` present; needs `stages: { light, deep, rem }` added to `sleepTracking.lastNight` in `mock.ts`.

### R3 — `CalendarHeatmap`: the 30-day adherence grid (deployed primitive, reused)

The spec's "missed last night → gap visible but not alarming" and the 30-day period selector both imply a **month-scale adherence view** that neither the spec nor prototype renders as a grid today. Add a **`CalendarHeatmap`** (the already-deployed `components/charts/CalendarHeatmap.tsx`, reused as-is) showing the **last 30 nights**, cell intensity = duration vs the 7.5h target.

```
BEDTIME CONSISTENCY ↑ now also: 30-NIGHT CALENDAR
M  T  W  T  F  S  S
▓  ▓  ░  ▓  ▒  █  █     ← intensity = hours vs target
▒  ▓  ▓  ░  ▓  ▒  ▓        today = dashed border
█  ▓  ▒  ▓  ▓  █  ░        missing night = ghosted cell (≠ a real 0)
```

- **Encoding:** 5 intensity steps `--color-alpha-white-05` → full **sleep-indigo `#818CF8`** (the deployed step scale, re-pointed to the sleep domain colour); **today = dashed border**; **a missing/un-logged night = a ghosted cell, visually distinct from a 0-hour night** (no-data ≠ zero — the honesty rule); tap = `scale-110` → that night's tooltip.
- **Non-shaming:** a sparse month reads as "room to build a rhythm," and the SIA read never tallies missed nights as failures.
- **Data:** `sleep_logs.duration_hours` over 30 days → needs `sleepTracking.calendar: { date, hours | null }[]` in `mock.ts`.

### R4 — `TrendChart` = the Living Line: duration over time (the signature, replacing the teal bars)

This is the **ownability** move. The spec calls for a **teal bar chart** for the duration trend and the prototype hand-rolls indigo `<div>` bars with a purple glow. Replace it with the **`TrendChart`** — a full **Living Line** (`VK-016`): one continuous, **curved**, round-capped stroke that **draws itself**, running **orange (effort) → green (arrival at/above 7.5h)**, with **green milestone dots** on target-hit nights, a `--grad-orange` area fade beneath, and the **SIA forecast as a dashed-purple `#7F24FF` tail** (§11 — this purple is brand-correct, the only sanctioned purple on a non-SIA chart).

```
SLEEP TREND                          [ 7 · 14 · 30 ]
 9h ┤                          ●╮ ╭● ← green milestone (hit target)
7.5h┤- - - - - - - -◜‾◝- - -◜‾  ╰╯  ‧‧‧╲ ← dashed-purple SIA projection
 6h ┤   ◜‾◝╮___╭◝‾◜            target 7.5h
    └──M───T───W───T───F───S───S──→
            avg 7.1h · goal 7.5h
```

- **Locked params (`CONSISTENCY.md`):** actual = solid orange Living Line, 2px, curved; **projected = dashed purple `#7F24FF`, 2px**; area = `--grad-orange` **(mint)** vertical fade ≤25% top; the **7.5h target line is data-derived** (a real horizontal at the target value, dashed `--color-alpha-white-25`), not a faked 41% position as in the prototype today; **zero baseline / shared y-scale** across 7/14/30 so periods are honestly comparable; W/M/Y-style selector pill active = orange.
- **Component reality:** `LineChart.tsx` exists but is **unused** and has **no projection, no gradient, no curve, no draw** — this needs the `TrendChart` wire-up (VK-006) + the Living Line (VK-016). The prototype's current quality `<polyline>` is straight-segment and flat; the **Quality Trend** (1–5 scale) becomes a **second, smaller Living Line** sharing the same primitive (orange, 7 points, draws itself), so duration and quality read as one family.
- **Motion:** the line **draws itself** via `stroke-dashoffset` (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`) — **never opacity-fades** (§8); milestone dots pop after the draw; projection tail draws last. One line motif per surface.
- **Data:** `sleep_logs.duration_hours` and `.quality` → `sleepTracking.durationTrend`, `.qualityTrend` (`mock.ts`); projection from the SIA engine.

### R5 — Depth + 60/30/10 cleanup pass (fixes a live violation)

A small but load-bearing pass that fixes a real defect and lifts every surface:
- **Remove `shadow-[var(--glow-purple)]` from the trend bars** (now retired in favour of R4's Living Line) — purple glow on a non-SIA chart is a **60/30/10 Critical** and is removed by replacing the bars entirely.
- Cards get the warm layered treatment (faint top-edge highlight + soft warm shadow on `ink-brown-800`), not flat boxes.
- Glow everywhere uses the **size-stepped** scale (`--glow-orange` 32px on the 96px hero ring only; `--glow-orange-md` on 48px; `--glow-orange-sm` on dots) — no 32px neon on small elements.

### R6 — `VK-011` ScatterPlot / ConsistencyCloud: bedtime/wake consistency (this screen MINTS it)

The spec's Bedtime Consistency card describes "tight clustering = good consistency, outliers visually stand out" — that is **exactly a scatter cloud**, and it does not exist as a kit primitive. Mint **`VK-011` ConsistencyCloud** and consume it here. Today the prototype fakes it with hand-placed `left:%` dots on a 1-D band; the real primitive plots each night as a point in a **2-D time field** and lets **cluster tightness be the consistency signal**.

```
BEDTIME CONSISTENCY                 consistency 82%  ✓ tight
        bedtime →                         wake →
 late ┊        · ·                  ┊        ·· ·
      ┊      ·●·· ·   ← tight        ┊      ··●· ·  ← tight cluster
      ┊       ·· ·       cluster     ┊       · ··
 early┊  ·                  (good)   ┊   ·            · ← weekend outlier
      └──────────────────            └──────────────────
   each dot = one night · ● = median anchor · ring = ±1σ spread
```

- **Encoding:** **x = night index (last 14 nights, left→right)**, **y = clock-time** (bedtime in the left field, wake in the right field), so each dot is one night. A **median anchor** (`●`, sleep-indigo, with `--glow-orange-sm`) sits at the cluster center; a faint **±1σ spread ring/band** around it makes tightness literally visible. **Cluster tightness = the consistency signal:** the 0–100% consistency score is `100 − normalized(σ)`, shown as a number **plus a visible "tight / variable" word** (never colour-alone).
- **Weekend drift** is naturally visible (weekend dots fall outside the band) — surfaced, never annotated as a failure.
- **Brand:** dots = sleep-indigo `#818CF8` (domain identity); median anchor carries the warm `--glow-orange-sm`; band = `--color-domain-sleep` at 15% over `--track-inset`; **no purple** (not SIA). 60% orange ink is honored via the warm glow accents and the orange consistency-score figure; sleep-indigo is identity-only.
- **a11y / honesty:** text-equivalent reads "bedtime clusters around 11:08pm ±18 min — tight; wake around 6:34am ±22 min"; **no-data ≠ zero** — fewer than 5 nights renders a "log a few more nights" state, not an empty/0 cloud; ≥44pt dot hit targets; load-bearing dots/anchor meet WCAG 1.4.11 ≥3:1.
- **Motion:** dots **scale-in 0.5→1, 30ms stagger** (the existing consistency motion), the ±1σ band fades in after, the median anchor settles last; reduced-motion → all dots at final position instantly. **No live physics jitter.**
- **Consumers:** Sleep [58] (here) and **Energy [63]** (energy vs time-of-day) — which is why it is a kit primitive, not a one-off.

> The full kit spec block for VK-011 (purpose / encoding / brand / a11y / states / motion / consumers) is reproduced at the end of this file for folding into `VIZ-KIT.md`.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 GaugeRing hero | `ProgressRing` (36/48/96) | `src/components/screens/ProgressRing.tsx` | 96px hero size + arc gradient (conic) + glow-by-size + inset (VK-002, VK-017) |
| R2 Stage Donut | **NEW** Donut | — | SVG arc donut, true whole (VK-007); `stages` field in `mock.ts` |
| R3 CalendarHeatmap | `CalendarHeatmap` (deployed) | `src/components/charts/CalendarHeatmap.tsx` | re-point step scale to sleep-indigo; `calendar` field in `mock.ts` |
| R4 TrendChart (Living Line) | `LineChart` (built, unused) | `src/components/charts/LineChart.tsx` | curve + draw + orange→green + dashed-purple projection (VK-006, VK-016) |
| R5 Depth/60·30·10 pass | trend bars, all cards | `src/app/features/sleep/page.tsx`, `globals.css` | remove purple glow; mint depth tokens (VK-017) |
| R6 ConsistencyCloud | **NEW** ScatterPlot | — | **mint VK-011**; real σ from `bedtime`/`wake_time` in `mock.ts` |
| Depth tokens | `--grad-*`, `--track-inset`, `--glow-*-sm/md`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates data ink: the sleep-score hero ring fill/glow, the donut primary slice, the Living-Line effort segment, the consistency-score figure, the data-derived target line, CTAs, quality stars.
- **Green (30%)** for arrival only: recovery-good band, Living-Line arrival + green milestone dots on target-hit nights, in-range states.
- **Purple (10%)** stays SIA-only: the SIA coaching-note dot + "ask SIA" link, **and** the brand-sanctioned **dashed-purple projection** on the duration Living Line (§11 — correct, not a violation). **The current trend-bar `--glow-purple` is removed** (it was a real violation).
- **Sleep-indigo `#818CF8`** is **domain identity only** — donut secondary slices, calendar steps, consistency dots, eyebrows, accent line, RPG badge — never on CTAs or UI chrome (those stay orange). (Resolves the spec's teal Color Map — see S58-V07.)
- **Glow** uses the size-stepped scale — warm depth, never neon.
- **Accessibility:** text/aria equivalents on every chart; visible status signs (recovery word, "tight/variable", donut legend); WCAG 1.4.11 ≥3:1 on load-bearing strokes/arcs/dots; reduced-motion → final state with the Living-Line static form (completed stroke + green end dot) preserved.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint the depth tokens first (everything depends on them).
2. **VK-011 ConsistencyCloud** — mint the net-new shared primitive (gates Sleep + Energy).
3. **R1 GaugeRing hero** — the focal viz; biggest perceived-quality jump.
4. **R4 TrendChart (Living Line)** — the signature + removes the purple-glow bars (kills the 60/30/10 violation).
5. **R2 Donut + R3 CalendarHeatmap** — round out the dashboard.
6. **R5 depth/60·30·10 pass** — warm-surface polish app-wide.

Each is independently shippable and verifiable.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/features/sleep`, screenshot before/after; verify: the hero is a **GaugeRing** (arc gradient, warm glow, inset), the duration trend **draws** as a curved Living Line (not teal bars), the stage donut sums to a **true whole**, the consistency view is a **2-D cloud where tightness is visible**, and the calendar distinguishes a **missing night from a 0-hour night**.
- Confirm **no `--glow-purple` remains on any non-SIA chart**; `npm run check` — **`verify:brand` must stay green**.
- Confirm cold-start (calibrating), manual-entry (donut hidden, not faked), loading, partial-sync, and error states render per spec — not degenerate collapsed charts.
- Confirm the sleep accent is **sleep-indigo `#818CF8`** end-to-end (spec Color Map + Register reconciled per S58-V07).

---

## VK-011 primitive — full kit spec (for folding into `VIZ-KIT.md`)

### `VK-011` · ScatterPlot / ConsistencyCloud · maps-to: **NEW** (Recharts `Scatter` or SVG)
- **Purpose:** plot an x/y relationship as a point field and use **cluster tightness as a consistency signal** — the premium way to show schedule regularity, time-of-day patterns, or any "X vs Y" correlation, without a verdict.
- **When to use:** bedtime/wake consistency (tightness = consistency), energy vs time-of-day, any two-axis relationship where the *spread* is as meaningful as the position.
- **Encoding:**
  - **x** = the independent axis (night index / day-of-week / time-of-day); **y** = the measured value (clock-time, energy level).
  - Each datum = one **dot** (domain-coloured, `--color-domain-*`).
  - A **median/centroid anchor** (larger dot, `--glow-orange-sm`) marks the cluster center; a faint **±1σ spread band/ring** (`--color-domain-*` at 15% over `--track-inset`) makes tightness literally visible.
  - **Consistency score** = `100 − normalized(σ)`, surfaced as a number **plus a visible word** ("tight" / "variable") — never colour-alone. Outliers (e.g. weekend drift) fall outside the band and are self-evident.
- **Brand:** dots = `--color-domain-*` (identity); centroid anchor + score figure carry warm `--glow-orange-sm` / orange ink (60/30/10 honored via the orange accents); band = domain colour at 15% over `--track-inset`; **never purple** unless the field is SIA-originated. Sits on `ink-brown-800` with a faint radial backplate.
- **Depth (token-backed):** band over `--track-inset` **(mint)**; centroid `--glow-orange-sm` **(mint)**; dots r=4–5px round; layered warm backplate, not a flat box.
- **a11y (text-equivalent):** `aria-label` states the cluster summary — "bedtime clusters around 11:08pm ±18 min — tight; wake around 6:34am ±22 min." Status word ("tight/variable") is visible, not colour-alone. Dot hit targets ≥44×44pt. Load-bearing dots + centroid meet WCAG 1.4.11 ≥3:1 on `#0A0A0F`/`#211008`.
- **States:** **cold-start / <5 points** → a "log a few more nights to see your pattern" state with the empty field + axes (no fake 0 cloud — no-data ≠ zero); **loading** → axes + band skeleton, dots scale in on data; **partial** → ghosted dots for un-synced nights, distinct from real points; **error** → names the field that failed + retry.
- **Motion:** dots **scale-in 0.5→1, 30ms stagger** (`--ease-out-soft`); ±1σ band fades in after; centroid settles last. **No live physics jitter.** Reduced-motion → all dots at final positions instantly, band + centroid static. Below-fold → animate on scroll-into-view.
- **Consumers:** Sleep [58] (bedtime/wake consistency), Energy [63] (energy vs time-of-day).
