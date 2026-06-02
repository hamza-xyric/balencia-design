# Visualization Audit → Viz-Build Handoff

The spec-first audit is **complete and QA-hardened**: all 54 HIGH+MEDIUM screens carry a `## Visualization` section **genuinely ≥ A−** (honest re-grade — the prior "all A−" was partly aspirational; 10 tail screens were really C+/B and have been deepened), every internal **Color-Map / Components / Interaction / Motion contradiction is reconciled** (each spec is now self-consistent), the kit is **19 primitives** (`VK-019` CompareGrid added), and there are zero open viz findings. This note is the input contract for the **viz-build** program (the `figma-build-fixer` analogue to this auditor). The screen specs are now internally consistent, so a builder reads one coherent design per screen.

## Build order (dependencies first)

1. **Mint the `VK-017` depth tokens in `balencia-screens/src/app/globals.css`** — everything else references them by name:
   - `--orange-light: #FF8A3D`
   - `--grad-orange: linear-gradient(180deg, var(--color-brand-orange) 0%, var(--orange-light) 100%)`
   - `--grad-progress: linear-gradient(90deg, var(--color-brand-orange) 0%, var(--color-forest-green) 100%)`
   - `--track-inset: rgba(0,0,0,0.28)`
   - `--glow-orange-md: 0 0 20px rgba(255,94,0,0.40)` · `--glow-orange-sm: 0 0 12px rgba(255,94,0,0.35)` (+ green/purple `-md/-sm` siblings for AI-Mode)
   - `--stroke-thin: 2px` · `--stroke-base: 4px` · `--stroke-bold: 8px` · `--stroke-poster: 12px`
   - *(Resolve the arc-following gradient via a `conic-gradient` behind a circular mask — an SVG `linearGradient` cannot sweep along a ring arc.)*

2. **Build/upgrade the kit primitives** (per `VIZ-KIT.md` + `CONSISTENCY.md` locked params), highest-leverage first:
   - **Living Line (VK-016)** — re-bases Sparkline / TrendChart / MomentumBar; the signature.
   - **GaugeRing** (upgrade `ProgressRing`), **ConstellationRadar** (upgrade `RadarChart`: hub + draw-not-scale), **MetricCard** (upgrade `HealthMetricsStrip`).
   - **TrendChart / BarChart** (wire up the unused `LineChart`/`BarChart`; projection = dashed **purple**).
   - **Donut (VK-007)**, **CorrelationMatrix (VK-009)**, **NetworkGraph (VK-010)**, **ScatterPlot (VK-011)**, **PodiumRank (VK-012)**, **BadgeTierGrid (VK-013)**, **TimelineAgenda (VK-014)**, **ArcGauge (VK-015)**, **KPIStatTile (VK-008)**, **CompareGrid (VK-019 — feature×tier glyph matrix; Paywall [43] + Subscription [23])**.

3. **Compose per screen** from the screen's `## Visualization` section. Add the named mock data each section calls for (e.g. `*.lastWeek`, `*Trend`+projection, `streakHistory`, `spendByCategory`, `edges[].inferred`, sentiment series).

## Must-fix live defects (now reconciled in-spec by the QA pass — the build must implement the corrected spec, not the legacy prototype)

Each of these is **already corrected in the screen spec** (Visualization + Color-Map + Components + Interaction + Motion now agree). The viz-build program must implement the spec's corrected treatment — the legacy prototype still carries the defect.

- **Alarm-red on a bounded level/score → calm orange + number + glyph + word:** Stress [52] (retired a green→teal→orange→**red** stress gauge **and** an 8-colour rainbow trigger donut), Energy [63], recovery/sentiment dials. A level is never a danger verdict.
- **Domain-colour-as-primary-data-ink → orange data ink (domain colour = identity + the own-consistency heatmap only):** Sleep [58] (wellbeing-teal → **sleep-indigo** identity; teal retired), Energy [63] (teal→orange), Nutrition [28] (lime), Learning [35] (cyan — was an open Critical), Medication [60] (teal), Creativity [36] (amber — harmonized to the Fitness [26] orange-gauge rule).
- **Alarm-red on people / proximity / difficulty → calm orange + glyph + word:** Relationships [33] (no red on a person/date), mission difficulty [13]/[14] (red "hard" → neutral tier glyph+word), deadlines [32] (red kept only for a genuine operational <3d work deadline, glyph+word paired).
- **Decorative / dishonest charts → real data-bound viz:** Sleep [58] purple-neon trend bars → Living Line; Energy [63] hardcoded SVG trend; Mission Board [13] aria-hidden MiniRadar; Spirituality [34] fixed 6-cell streak grid; Workout [27] hardcoded `progress=0.62` aria-hidden rest ring → GaugeRing; Plan Summary [08] `w-0` invisible XP bar → honest "ready" MomentumBar.
- **Register / palette / motion:** Intelligence [48] pillar sparklines fixed 0–99 shared scale (no autoscale); Achievements [71] dropped the Product-Mode "Ask SIA" purple + "locked"/padlock → "to discover"/rarity silhouette; Reports [78] mislabel AI-Mode → **Product-Mode orange** CorrelationMatrix; SIA Chat [09] inline line draws (§8, not fade); Voice [51] sentiment line solid purple (§1.4.11, not 40%).
- **Colour-alone status → visible glyph + label** across budget bars, difficulty, competition/source/WHOOP status, podium rank, medication doses.

## Guardrails
- Conform to `CONSISTENCY.md` locked parameters (a drift is an auditor finding).
- 60/30/10: orange data-ink dominant; green = arrival; purple = SIA only (incl. the sanctioned dashed-purple projection); domain/podium/rarity/mission colours = identity only; the only purple-dominant screens are AI-Mode (09, 20, 48, 51 partial, 72) — each cites `_shared-patterns.md`.
- **Consolidated rules set during the QA pass (apply uniformly in build):**
  1. **Calibrated red = genuine operational / danger / destructive status only** (sync failure, SOS, account/entry delete, medical safety alert, a genuine operational <3d work deadline), always glyph + word paired — **never** on a person, feeling, difficulty tier, score, level, spend-down, or budget-alone.
  2. **A domain dashboard's own progress gauge/bar/timeline = orange data ink** (green at arrival); the **domain colour is identity** (header/badge) + its **own-consistency `CalendarHeatmap`** (the lone domain-colour-on-data exception). Domain-coloured gauges/dots are only for **multi-domain comparison** (RPG [19] stat gauges, Life-Areas [16] / Home [12] radar) — do not "fix" those to orange.
  3. **Rainbow category palettes → orange-primary + warm neutral tints.** No-data ≠ zero (ghosted, never a real 0/`w-0`). Motion **draws** (§8), never fades. Restraint scores up — do not over-chart a calm screen.
- Non-shaming + no-dark-patterns hold (esp. streaks, leaderboards, paywall).
- `npm run check` must stay green — **`verify:brand` especially** — and add `verify:visual` snapshots where useful.
- After building, re-run `/viz-auditor` (or this methodology) to advance each finding `specced → built → resolved` and re-grade toward A+++ (the residual gap from A− is build-verified depth + working scrub/drill micro-interactions).

## Inputs
`viz-audit/REPORT.md` (scorecard + grades) · `viz-audit/findings-ledger.md` (every finding + fix-pointer) · `viz-audit/VIZ-KIT.md` + `viz-audit/CONSISTENCY.md` (what + exact params) · `app_design 3/NN-*.md` `## Visualization` sections (per-screen spec) · 9 `…-visualization-recommendations.md` companions (Home + exemplars).
