# Screen Design: Reports Center

**Screen**: 78 of 90
**File**: 78-reports-center.md
**Route**: `/features/reports`
**Register**: Product Mode — orange-dominant (SIA report-builder *voice* + privacy; SIA purple is confined to the builder hero, the "SIA summary" pill, and the dashed-purple SIA projection — **all charts render orange-dominant**, incl. the CorrelationMatrix in its product-mode ORANGE variant, per the Visualization section. Not an AI-Mode purple-dominant surface like Intelligence [48].)
**Primary action**: Build, review, share, and export structured life reports
**Tab**: Me
**Navigation**: Stack push from Me Main [17], Intelligence Dashboard [48], Data Sources [84], Help Center [25], or SIA deep-link. Back returns to origin.

---

## Purpose

Reports Center turns Balencia data into clean, shareable summaries without exposing private notes by default. It supports weekly life reports, doctor summaries, and mission progress exports, with SIA translating metrics into plain-language context. This is a review/export surface, not a raw data dump.

---

## Information Architecture

**Hierarchy**:
1. SIA report-builder hero
2. Recent report cards
3. This-week insight rows
4. Share and Export PDF bottom actions

**User flow**:
- **Arrives from**: Me Main [17], Intelligence Dashboard [48], Data Sources [84], SIA Chat [09].
- **Primary exit**: Export PDF or Share.
- **Secondary exits**: Tap report card -> report detail/preview, back to origin.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed dual bottom actions, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <          Reports          |
+-----------------------------+
| Report builder           *  |
| Turn your data into a clean |
| shareable summary.          |
| SIA prepares context...     |
| [SIA summary][Private][PDF] |
|                             |
| RECENT REPORTS              |
| [doc] Weekly life report    |
|       Fitness, sleep...Ready|
| [doc] Doctor summary   Draft|
| [doc] Mission progress Ready|
|                             |
| THIS WEEK                   |
| Sleep consistency       +18%|
| Workout adherence        72%|
| Stress load             -11%|
+-----------------------------+
| Share        Export PDF     |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Report Hero
- **Purpose**: Frame reports as SIA-assisted, private-by-default summaries.
- **Visual treatment**: rounded-xl, royal-purple/20 border, purple linear accent over ink-brown.
- **Content**: Eyebrow "Report builder", title, privacy explanation, SIA sparkles icon, signal pills.
- **Signal pills**: SIA summary, Private by default, PDF ready.

### Report Card
- **Purpose**: Resume a report or preview its status.
- **Visual treatment**: Small card, rounded-lg, 16pt padding, document icon tile.
- **Content**:
  - Title: Weekly life report, Doctor summary, Mission progress export.
  - Meta: included domains/data categories.
  - Status pill: Ready or Draft.
- **Gesture**: Tap opens report detail/preview.

### This Week Summary
- **Purpose**: Show a compact report preview and reinforce value.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding.
- **Rows**: Label left, value right. Positive values forest-green, neutral/action values brand-orange.

### Bottom Actions
- **Purpose**: Primary report outputs.
- **Visual treatment**: 2-column grid.
- **Actions**:
  - Share: ghost button.
  - Export PDF: orange primary button.

---

## Visualization

> Source: embedded section (no companion file — Batch 5 is embedded-only). Audited in `viz-audit/` — Batch 5 (Trends/Reports cluster, template E), findings `S78-V01..V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Product-Mode register → orange-dominant** (the spec header's "AI Mode" label is the SIA *report-builder voice*, not an AI-Mode purple-dominant surface like Intelligence [48] or Knowledge Graph [72]; SIA's purple is confined to the builder hero, "SIA summary" pill, and the brand-sanctioned dashed-purple projection — **all charts render orange-dominant**). Benchmark = **Gentler Streak + Welltory + Apple Health trends/reports** (period-over-period, correlation surfacing, insight without overwhelm) rendered **the Balencia way** (Living Line + warm glow + the orange CorrelationMatrix variant), not as a clone of any of them. **Mints nothing** — reuses `CorrelationMatrix` (`VK-009`, product-mode ORANGE variant — minted by Intelligence [48] this program), `TrendChart`/Living Line (`VK-006`/`VK-016`), `BarChart` (`VK-006`), `Donut` (`VK-007`), `KPIStatTile` (`VK-008`). **Current grade D (49) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions + a data-confidence layer wired to real sync state, owned by the later viz-build program.)*

This screen is a **review/export surface, not a raw data dump** — its visualization job is to make a *report preview* feel like a crafted Apple-Health-grade summary the user is proud to screenshot, **without** turning into a maximalist dashboard. Today it renders as a pure text list: three `ReportCard`s, and a three-row "This week" block where each metric is a **colour-only signed value** (`+18%` forest-green, `72%` orange, `-11%` forest-green) — a 1.4.11 + colour-alone miss, with deltas carrying **no disclosed window** (is `+18%` vs last week? last month? — currently undisclosed, an honesty gap on a *reports* surface where the window *is* the claim). There is **no chart of any kind** on a screen whose entire purpose is summarizing trends. This section resolves the "This week" block into an honest, premium **report preview**: headline `KPIStatTile`s with disclosed windows, a period-over-period `BarChart`, a Living-Line `TrendChart`, a category-split `Donut`, and a cross-domain `CorrelationMatrix` (orange product variant) — each carrying a **data-confidence** treatment so *no-data never reads as zero*.

> **Component reality (spec-vs-build diff — each gap is a finding):** the route `/features/reports` (`balencia-screens/src/app/features/reports/page.tsx`) renders **zero charts**. `insightRows` are hardcoded `{label, value, tone}` strings with `text-forest-green`/`text-brand-orange` as the *only* signal — no glyph, no window, no series (`S78-V01`). `BarChart.tsx` and `LineChart.tsx` exist but are **built-but-unused** and accept only `{data, xKey, yKey, height}` — **no compare-period series, no zero-baseline lock, no dashed-purple projection prop** (`S78-V03`/`S78-V04`). `CalendarHeatmap.tsx` is an `M×N` grid, **not** the square `N×N` `CorrelationMatrix` — `VK-009` is minted by Intelligence [48] this program; Reports consumes its **orange** product variant (`S78-V05`). Depth tokens `--grad-orange`, `--grad-progress`, `--glow-orange-md`/`-sm`, `--track-inset`, `--orange-light`, `--stroke-thin/base` are **absent from `globals.css`** (`VK-017`) — referenced here by intended name. No report-data mock exists (`grep reports src/data/mock.ts` → empty); each viz below names the `reports.*` mock slice it requires.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Sleep consistency `+18%` · Workout adherence `72%` · Stress load `−11%` | three text rows, **colour-only** signed values, **no window** | **headline KPI strip** — number + uppercase label + **disclosed-window** delta arrow + visible ▲/▼ glyph | `KPIStatTile` ×3 (`VK-008`) |
| This-period vs last-period per metric (the comparison the `+18%` *implies* but never shows) | not shown (only the delta %) | **period-over-period `BarChart`** — this-period orange vs last-period green, zero baseline, one shared scale | `BarChart` (`VK-006`) |
| Headline-metric trend over the report window + SIA forecast | not shown | **Living-Line `TrendChart`** — solid orange actual → **dashed-purple** SIA projection, green milestone dots | `TrendChart` (`VK-006` / `VK-016`) |
| Report composition — which domains/categories the report covers (e.g. time or contribution split across Fitness/Sleep/Nutrition/Finance) | implied by `ReportCard` meta text only | **category-split `Donut`** — primary slice orange, rest warm-neutral/domain-identity tints, honest whole | `Donut` (`VK-007`) |
| Cross-domain summary — how this report's domains relate (the report's "so what") | not shown | **`CorrelationMatrix` (orange product variant)** — N×N intensity grid + top-2 ranked plain-language rows | `CorrelationMatrix` (`VK-009`) |
| Report-card status (Ready / Draft) + meta (included domains) | text pill + meta string | **kept textual**, status pill gains a visible glyph (✓ Ready / ◷ Draft) — never colour-alone | — (deliberately textual) |
| Data-confidence per metric (synced vs missing days) | not shown — `+18%` reads as fully confident | a **confidence chip / ghosted treatment** ("based on 6 of 7 days") attached to each viz | confidence layer (cross-cutting, `S78-V06`) |
| Report title / privacy note / builder copy / SIA summary | text | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the **report-builder hero stays the screen's content anchor** (it is the call-to-create); the **KPI strip is the one viz hero** (the report's headline at a glance); the period bars + trend + donut + correlation matrix are clearly secondary and live inside the **expanded report-preview** (not all stacked above the fold on the index — they appear when a report card is opened/previewed, matching the "in-app report preview" contract from the audit-integration section). Five secondary visuals, one focal — a report, not a wall of charts.

### 1 · Headline KPI strip — `S78-V01` → `KPIStatTile` ×3

Resolve the colour-only `insightRows` into `KPIStatTile`s — the report's headline at a glance: uppercase label (`white/40`, +0.12em) · number `text-h2` white · **delta arrow** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) **with a visible glyph** (▲/▼ shape, never colour alone) over a **fixed, disclosed window** rendered *in situ* ("vs last week" caption under each tile — closing the current undisclosed-window honesty gap). Source: new `reports.thisWeek.kpis` (each `{label, value, prior, window}`) in `mock.ts` so the delta is computed from a real prior period, never a free-floating string.
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight (`--color-alpha-white-08` 1px inset); number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium; depth lives in the trend + correlation grid).
- **Honesty / non-shaming:** the window is **disclosed on every tile** (no cherry-picked flattering range — RUBRIC dim 6); a ▼ delta is a **neutral muted arrow** (`--color-alpha-white-40`), never red or "down" shaming language; "Stress load −11%" is framed as the *desirable* direction (lower stress = improvement) via a value-aware delta sign, not a naive "−=bad" colour rule — i.e. the arrow encodes *improvement*, with the metric's good-direction disclosed in copy.
- **Micro-interaction:** tap a tile → scrolls/links to that metric's `S78-V03` trend.
- **States:** **single-period user** (no prior week) → all tiles read the value with a `—` delta and "first report — no prior period to compare" (honest: **not** a fabricated ▲); **partial sync** → tile shows the value with a confidence chip ("6 of 7 days", per `S78-V06`); **loading** → label + skeleton number bar.

### 2 · Period-over-period bars — `S78-V02` → `BarChart` (this-period orange vs last-period green)

The comparison the `+18%` *claims* but never shows: a `BarChart` (wraps the built-but-unused `components/charts/BarChart.tsx`, extended with a compare-series) putting **this period beside last period** for the report's headline metrics (or a per-day breakdown of one metric): **this-period bars `--color-brand-orange`, last-period bars `--color-forest-green`** (§11 compare law), **zero baseline (locked)**, **one shared y-scale** across both periods (honest — no truncated/dual axis that would exaggerate the delta on a *reports* surface). Source: `reports.thisWeek.compare` (per-metric `{this, last}` or per-day series) in `mock.ts`.
- **Depth:** bars rise `--dur-slow` 520ms `--ease-flow`; rounded top caps; `ink-brown-800` backplate with top-edge highlight; **no glow** on bar fills (reserved for the trend).
- **Honesty:** a true-zero period is a **zero-height baseline tick**; an **un-synced / no-data** period is a **ghosted dashed bar** — the two must be visually distinct (no-data ≠ zero, the screen's core honesty contract); the period labels ("this week" / "last week") are explicit so the window backing every `KPIStatTile` delta is legible.
- **Micro-interaction:** tap a metric-pair → tooltip with both raw values + the computed delta; W/M selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`) so "this week" reports and "this month" reports share the primitive.
- **States:** first-report (no prior period) → last-period series **ghosted** with "no prior period yet," axes drawn (not a blank box); loading → axes + skeleton bars that rise into data.

### 3 · Headline trend (Living Line) — `S78-V03` → `TrendChart` (`VK-016`)

The signature, applied to the report's lead metric: a full **Living Line** across the report window — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on best-day/streak points, a `--grad-orange` **(mint)** area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour; this is SIA's *report-builder* forecast and is **correct, not a 60/30/10 violation**) continuing the same path to the next period's projected value. Curved monotone; `--stroke-base` 4px actual / 2px dashed projection.
- **Why the line, not a generic trend chart:** "every chart is the line" (§8) — Welltory/Apple-Health use library lines; the Living Line is the device they structurally don't have, making the Reports trend unmistakably Balencia and reusing the exact spine of the Home/Fitness sparklines so the whole app reads as one family.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; the dashed-purple projection draws **after** the solid actual line; scroll-into-view (below fold within the preview).
- **Micro-interaction:** long-press to scrub a crosshair across the window; W/M/Y selector pill shared with `S78-V02`.
- **States:** **cold-start / single report** (<2 periods) → "calibrating — building your trend" with a faint flat baseline, **never** a single dot; the **projection is hidden** until SIA has enough data (honest — no forecast from one point); **partial** → un-synced days ghosted on the line (not interpolated as real values); reduced-motion → completed stroke at rest + green end/milestone dots + static dashed-purple tail.
- **Data:** new `reports.thisWeek.trend` (window points + `projection`) in `mock.ts`.

### 4 · Category-split donut — `S78-V04` → `Donut` (`VK-007`)

The report's *composition* — which domains/categories it covers and in what share (e.g. contribution or time split across Fitness / Sleep / Nutrition / Finance, the very domains the `ReportCard` meta lists as text). A `Donut` (`VK-007`): **largest/primary slice = `--color-brand-orange`**; remaining slices = warm-neutral tints (`--color-alpha-white-40`, `--color-alpha-white-20`) **or**, where each slice *is* a domain, `--color-domain-*` identity tints (identity only, never rainbow, never purple) — 2px gap revealing `ink-brown-800` for carved separation, consistent inner-radius, a center **hub** value naming the whole ("4 domains" / "of 100% covered").
- **Honest whole (non-negotiable):** slices **sum to a true whole the user can name** (the report's covered domains / total tracked time) — never a padded total; a 0-contribution category is **omitted**, never a zero-width wedge; an "excluded private notes" gap is shown as **hub text** ("private notes excluded"), never a phantom slice that would misrepresent composition.
- **Depth:** `--glow-orange-sm` **(mint)** on the primary slice only at the ~96–140px card/hero size; faint radial backplate; `--track-inset` **(mint)** under the ring.
- **Motion:** arcs **draw themselves** clockwise from 12 o'clock (`stroke-draw`, largest→smallest, primary orange first); hub counts up 520ms; never opacity-fades.
- **A11y:** `aria-label` enumerates every slice's label + % + value; a **visible legend** (never colour-alone).
- **States:** **empty / no report selected** → ghosted full-ring outline + hub prompt ("Build a report to see what it covers"), never a collapsed disc or a misleading 100%-of-one-domain ring; **partial** → covered slices + a **ghosted remainder arc** for domains with no synced data; **loading** → ring skeleton that draws into the real arcs.
- **Data:** `reports.thisWeek.coverage` (per-domain share, summing to the named whole) in `mock.ts`.

### 5 · Cross-domain summary — `S78-V05` → `CorrelationMatrix` (`VK-009`, product-mode ORANGE variant)

The report's "so what": how the report's domains relate, reusing `CorrelationMatrix` (`VK-009` — minted by Intelligence [48] this program) in its **product-mode ORANGE variant** (the brief is explicit: Reports is **Product Mode**, *not* AI Mode — so **reinforcing ink renders in `--color-brand-orange`, not royal-purple**; the cool desaturated inverse tint is unchanged). Two-tier composition (locked): **Tier 1** = the N×N intensity grid (the gestalt, e.g. Sleep × Workout × Stress × Nutrition); **Tier 2** = the **top 2–3 correlations as plain-language ranked rows** beneath (description + strength bar + direction arrow + word) — the rows carry the legibility and the ≥44pt tap target; the grid carries the at-a-glance pattern.
- **Direction triple-encoded, never colour-alone:** a `+`/`−` glyph inside every cell; a directional tint (**reinforcing = orange** here, competing/inverse = a desaturated cool sleep-blue-family tint); and in the ranked rows a leading ↑/↓ arrow + the word ("reinforcing" / "competing"). Diagonal muted (`--color-alpha-white-05`).
- **No-data ≠ zero:** an un-computed pair = a **ghosted cell**; a genuine near-zero correlation = a muted near-diagonal tone — the two look distinct (the screen's honesty contract again, at the grid level).
- **Depth:** 2px cell gap, `--r-xs` corners; selected/hovered cell = dashed border (reuse `CalendarHeatmap` `today` treatment); ranked-row strength bars track `--color-alpha-white-08`, fill graduated by strength in orange.
- **Non-shaming:** a competing/inverse correlation is framed as a coaching observation ("late workouts compete with your sleep — try an earlier session"), **never** a verdict ("you're sabotaging your sleep"); the matrix surfaces patterns, not blame.
- **Motion:** cells fade/scale-in **row-by-row** on scroll-into-view (`--dur-base` 280ms, small stagger); ranked-row strength bars rise 0→target (`--dur-slow` 520ms); tap a cell → tooltip pill with the readable correlation.
- **States:** **analyzing / insufficient data** → "Correlations appear after 1–2 weeks of tracking" (no degenerate empty grid); **partial** → ghosted un-computed cells; **loading** → skeleton grid of pulsing cells; **error** → "couldn't load correlations" + retry.
- **Data:** `reports.correlation` (N×N matrix of `{strength, direction, computed}` + ranked rows) in `mock.ts`.

### 6 · Data-confidence layer — `S78-V06` → cross-cutting honesty treatment

The reports-specific honesty primitive (per the brief's "Data-confidence shown honestly (no-data ≠ zero)"): every viz on this screen carries a **visible confidence signal** so a sparsely-synced metric never masquerades as a confident headline. Concretely: each `KPIStatTile`/period-bar/donut-slice/trend-segment derived from incomplete data shows a **confidence chip** ("based on 6 of 7 days") **and** renders missing portions as **ghosted/dashed** rather than as a real zero. A metric with no data at all reads as **"not enough data yet"** (ghosted placeholder + copy), **never** a `0%` or a `0`-height bar — because on a *report*, a fabricated zero is a lie the user might forward to a doctor.
- **Brand/a11y:** the confidence chip is text + a small `◷` glyph (never colour-alone); ghosting is a visible dashed/desaturated treatment, distinct from a real low value.
- **Non-shaming:** low confidence is framed as "keep tracking to firm this up," never "you didn't log enough."
- **Data:** a `confidence` field on each `reports.*` slice (synced-day count / total) in `mock.ts`.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: the **report-preview hero draws first** — the **KPI strip counts up** (`--dur-base` 280ms `--ease-out-soft`, left→right stagger) → **then** the period-over-period **bars rise** (`--dur-slow` 520ms `--ease-flow`, this-period before last-period) → **then** the headline **Living Line draws itself** L→R (`stroke-draw` 1200ms `--ease-flow`, *never* fade), its dashed-purple SIA projection drawing **last** → **then** the **donut arcs draw** clockwise largest→smallest → **then** the **CorrelationMatrix cells fade/scale-in row-by-row** with its ranked-row strength bars rising last. One full Living Line per surface (the trend is the only one; KPI/bars/donut/matrix use numbers/bars/arcs/cells). Below-fold visuals (trend, donut, matrix) animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail), the donut's full arcs at the final hub value, and the matrix at final intensity are all preserved — no information lost.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / first report** — KPI deltas read `—` ("no prior period to compare"), period bars ghost the last-period series, the trend shows "calibrating" with axes drawn and the projection hidden, the donut shows a ghosted ring + "build a report to see what it covers," the correlation matrix shows "correlations appear after 1–2 weeks" — **never** a wall of zeros; **loading** — depth-preserving skeletons that *morph* into drawn data (axes / arcs / cells visible, L-to-R and radial shimmer — never blank discs or empty boxes); **empty (no reports)** — the existing "No reports yet → Create weekly report" empty card is kept; the preview visuals only render once a report exists/opens; **partial sync** — confidence chips + ghosted/dashed missing portions (per `S78-V06`), visually distinct from a real zero; **error** — chart-specific honesty (which series/correlation failed) + a visible "retry," consistent with the screen's Empty/Loading/Error and Error Handling contracts.
- **60/30/10 (Product Mode — orange-dominant):** **orange dominates** data ink (KPI accents, this-period bars, the Living-Line effort segment, the donut primary slice, the CorrelationMatrix reinforcing tint and ranked-row strength bars); **green** = arrival/improvement only (last-period compare bars per §11, milestone dots, ▲ improvement deltas, the desirable-direction sign on "stress −11%"); **purple stays SIA-only** and is **confined** to the report-builder hero, the "SIA summary" pill, and the **single sanctioned dashed-purple SIA projection** on the trend (§11 forecast — correct, *not* a violation). **Crucially, the CorrelationMatrix here is the ORANGE product variant, not the purple AI-Mode variant** — Reports is Product Mode, so reinforcing ink is orange; rendering it purple would be the brand defect this section explicitly avoids. Domain colours appear **only** as identity (donut domain slices, matrix row/column header icons) — never as decorative palette. Glow uses the size-stepped scale (donut primary slice = `--glow-orange-sm`; bars/KPI/sparklines = none) — warm depth, not neon.
- **Accessibility:** every KPI/bar/line/donut/matrix carries a text/`aria-label` equivalent conveying the same value and **window** ("Sleep consistency 78 percent, up 18 percent versus last week, based on 6 of 7 days"); every signed value uses a **visible ▲/▼ glyph plus** the colour — **never colour alone** (fixes the current `text-forest-green`/`text-brand-orange`-only insight rows); status pills gain a **visible glyph** (✓ Ready / ◷ Draft); confidence is shown as visible text + a `◷` glyph; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — bar fills, the Living-Line stroke, milestone dots, donut slice boundaries, the filled/unfilled gauge edge, and load-bearing matrix cells/strokes all meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets ≥ 44×44pt (the matrix's ranked rows carry the tap target when the grid packs cells tighter); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Gentler Streak + Welltory (CorrelationMatrix orange product-mode, report-focused warmth) — *stays Balencia via warm-glow report-hero surfaces, the orange-dominant CorrelationMatrix product variant (never purple), the non-shaming data-confidence layer, and the brand period in edge microcopy.*

**Pre-grade:** A− (84) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): The A− viz hero layer is strong (KPI strip, bars, Living Line, donut, correlation matrix all specced), but (1) the report-builder hero and card surfaces lack layered depth (no `--edge-highlight`, flat surfaces); (2) the surface glow on secondary elements is unspecified; (3) microcopy on the hero and throughout is partly generic ("Turn your data into a clean shareable summary" is boilerplate, not SIA report-builder voice); (4) type hierarchy is ad-hoc pixels, tracking/leading unspecified; (5) state-craft matrix is incomplete (loading/empty/partial states for the "This Week" section and report detail preview are textual, not designed); (6) the data-confidence layer (S78-V06) has no visual token definitions; (7) contrast pairs asserted, not tabulated; (8) there is no ownable moment unique to Reports (the Living Line and Donut are shared across the app).

### Focal hierarchy

One focal point: the **report-builder hero card** (the SIA report-builder voice, the call-to-create) — the screen's primary action and the first ≥96px glowing surface above the fold, positioned immediately below the sticky header. It anchors the screen's job: "turn your data into reports." Everything else is visibly secondary: the Recent Reports cards are mid-sized (72pt, secondary by weight and size), the "This Week" KPI strip is headline-metric summary (not the hero), the period-bars and trend and donut and correlation matrix sit below the fold within the expanded report-preview (a deliberate editorial choice: don't cramp all five visuals above the fold — they render when a report is opened/previewed). The squint test lands on the hero "SIA report-builder" eyebrow + "Build reports SIA helps you understand" title first, then the three signal pills (SIA summary · Private by default · Screenshot ready), then the report card row below.

### Surface & depth

Every surface adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. The report-builder hero card adds `--surface-backplate` (`CK-T02`, a faint warm radial glow on the hero backdrop to lift it off the field). Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px) on the ≥96px hero card only; `--glow-orange-sm` (~12px) on the 36px status pills (Ready / Draft) and the data-confidence chips if they are ≥36px; **no glow** on inline text. The report cards (72pt) receive `--glow-orange-sm` on the document icon when present, or no glow at rest. The "This Week" KPI strip tiles (each ~60–80pt) are `--color-ink-brown-800` with `--edge-highlight` + `--track-inset` on any progress rings, no glow (they are inline summary elements, not heroes). The period-bars and trend and donut and correlation matrix inherit the depth language from the viz section — bars have beveled tracks (`--track-inset`), the Living Line has the warm gradient (`--grad-progress`), the donut has the primary-slice glow (`--glow-orange-sm`), and the CorrelationMatrix carries `--track-inset` on its cell grid. No surface reads as a flat box.

### Typographic rhythm

Map all type to `CK-P3` locked tokens: report hero eyebrow ("Report builder") the `.eyebrow` recipe (`--text-eyebrow` 12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`); hero title ("Build reports SIA helps you understand") `--text-h2` (20pt) / 600 / `--leading-snug` (1.25); hero description ("Review your data with SIA, choose what to share") `--text-body` (16pt) / 400 / `--leading-normal` (1.4); signal pills ("SIA summary", "Private by default", "Screenshot ready") `--text-caption` (13pt) / 500 / `--leading-normal`; section eyebrows ("RECENT REPORTS", "THIS WEEK") the `.eyebrow` recipe; report card title (such as "Weekly life report") `--text-h3` (17pt) / 600 / white 100%; report card meta (such as "Fitness, sleep…✓ Ready") `--text-caption` (13pt) / 400 / white 50%; KPI labels ("Sleep consistency") `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow`; KPI value + delta `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / tabular-nums. Hierarchy by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the screen. No Chillax. Replaces ad-hoc line-heights with the `CK-T04` scale.

### Microcopy (before → after)

The hero narrative is generic; the rest is missing edge strings. Authored to `CK-P5` brand voice (SIA report-builder warmth, non-shaming, honest on data windows):

- **Hero title** — *before:* "Turn your data into a clean shareable summary" (boilerplate) → *after:* "Build reports SIA helps you understand." (SIA voice, clear intent; privacy note moves to signal pills)
- **Hero description** — *before:* "SIA prepares context…" (passive) → *after:* "Review your data with SIA, choose what to share." (cooperative)
- **Signal pills — Private** — *before:* "Private" → *after:* "Private by default" (explicit promise)
- **Signal pills — PDF** — *before:* "PDF ready" → *after:* "Screenshot ready" (V1 is in-app sharing per audit contract)
- **Report card status "Ready"** — *before:* bare colour → *after:* ✓ Ready (visible glyph + text, never colour-alone)
- **Report card status "Draft"** — *before:* muted, bare → *after:* ◷ Draft (visible glyph + text)
- **KPI tile, first-report** — *before:* "—" delta bare → *after:* "— vs last week" (disclose window; honest)
- **KPI tile, partial sync** — *before:* no confidence → *after:* "(6 of 7 days)" chip visible, text + glyph
- **Bottom action** — *before:* "Export PDF" → *after:* "Screenshot guide" (V1: modal shows "how to screenshot" + privacy review)
- **Error state** — *before:* no message → *after:* "Couldn't load correlations — try again" (specific, recovery action)
- **Empty state** — *before:* "No reports yet. Create weekly report." → *after:* "You haven't built a report yet. Ready to see your data in context? Start with a weekly summary." (warm, inviting)

No exclamation marks; brand period with intent; SIA copy specific to user data; privacy language warm.

### Motion choreography

Locked to `CK-P4` order (draw-first): the **report-builder hero fades in** (`--dur-base` 280ms `--ease-out-soft`) → the **KPI strip rows rise** (L-anchored, `--dur-slow` 520ms `--ease-flow`, ~60ms stagger) → the **report cards fade in** (staggered, 280ms each, 40ms stagger) → below-fold visuals on scroll-into-view: **bars rise** → **trend line draws** → **donut arcs draw** → **correlation matrix cells fade/scale row-by-row**. `prefers-reduced-motion` → all at final state instantly; Living-Line (completed stroke, green end dots), donut (at final fill), correlation (at final intensity) preserved.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start | Hero visible, Recent Reports empty card "You haven't built a report yet." with CTA, "This Week" hidden | "You haven't built a report yet. Ready to see your data in context? Start with a weekly summary." | hero `--surface-backplate`; no degenerate shapes; empty card uses `CK-P1` depth |
| Loading (list) | Hero stable, Recent Reports skeleton shimmer, "This Week" skeleton with visible number bars + label outlines | "SIA is reading your data — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer, morphs to data |
| Loading (preview) | Report tapped, preview slides with all five viz skeletons visible, layout preserved | "SIA is analyzing your report — one moment." | skeletons preserve depth; tracks, axes, grid cells visible |
| Empty/partial | KPI tiles show values + confidence chips ("5 of 7 days"), bars/donut show covered + ghosted un-synced, correlation shows ghosted cells | "Keep tracking to firm this up."; "Correlations appear after 1–2 weeks." | ghosted/dashed distinct from real 0; confidence text + glyph |
| Error (sync) | Report card warning icon + red border, "This Week" shows cached KPI (skeleton if none), network banner names failure | "Couldn't sync your latest data — pull to refresh." | `--color-error-red` only on genuine sync; red border + alert icon + text |
| Offline | Hero visible, Recent Reports + "This Week" show cached, pull-to-refresh dimmed | "You're offline — showing your last sync." | actions dimmed (50% opacity); cached data retained |
| Report preview, insufficient data | KPI delta "—" + "first report — no prior", bars ghost last-period, trend "Calibrating" + axes drawn, projection hidden | "Calibrating — building your trend."; "Correlations appear after 1–2 weeks." | structure visible; projection hidden until enough data |

### Signature & anti-generic

Ownable moments: the **report-builder hero** (SIA report-builder voice "understand your data with SIA," cooperative tone, never data dump); the **data-confidence layer** (confidence chips + ghosted-vs-real honesty throughout — reports surface that never masquerades gap as zero); the **warm-glow report surfaces** + **orange-dominant CorrelationMatrix** (product-mode, never purple, anchoring Reports as product). Anti-generic fixes: Recent Reports cards are not flat identical grid — each has document-icon thumbnail (varied by type) + status pill (now with glyph, not colour-alone). Report-preview (bars + trend + donut + matrix) deliberately below fold in card expansion, keeping hero screen calm and editorial. ASCII wireframe flagged for redraw.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

- Hero title: `--color-alpha-white-100` (≥12:1)
- Hero description: `--color-alpha-white-80` (≥8:1)
- Signal pills: `--color-alpha-white-70` (≥6:1)
- Section eyebrows: `--color-alpha-white-40` (≥4.5:1, label paired with position)
- Report card title: `--color-alpha-white-100` (≥12:1)
- KPI label: `--color-alpha-white-40` (≥4.5:1)
- KPI value: `--color-alpha-white-100` (≥12:1)
- KPI delta (▲/▼ + "vs last week"): `--color-forest-green` (≥3:1, WCAG 1.4.11) **+ visible glyph + text**
- Confidence chip: `--color-alpha-white-70` (text) + `◷` glyph (≥4.5:1, never colour-alone)
- Bar fills (this-period / last-period): `--color-brand-orange` / `--color-forest-green` (≥3:1 vs `--track-inset`)
- Living-Line: `--color-brand-orange` / `--color-forest-green` (≥3:1 vs `ink-brown-800`)
- Donut primary slice: `--color-brand-orange` (≥3:1)
- CorrelationMatrix reinforcing: `--color-brand-orange` (≥3:1)
- Status "Ready" glyph (✓): `--color-forest-green` (≥3:1) **+ text**
- Status "Draft" glyph (◷): `--color-alpha-white-50` (≥3:1) **+ text**

All signs (▲/▼, ✓/◷, ◷) paired with **text**. All interactive elements carry uniform `--focus-ring` (`CK-T03`). Targets ≥44×44pt. Reduced-motion: chart animations to final state instantly; Living-Line, donut, correlation at final state preserved.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content containers |
| Primary action | #FF5E00 | brand-orange | Export PDF, selected metrics |
| SIA summary | #7F24FF | royal-purple | Hero and summary pill |
| Positive trends | #34A853 | forest-green | Improvements |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |
| Borders | #FFFFFF at 6-8% | white/8 | Card outlines |

**60/30/10 verification**: Purple is SIA/report-builder signal only. Orange is export/action and attention values. Green is positive trend data.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Report card | Pressed | scale(0.98), border brand-orange/25 |
| Status pill | Draft | Muted white border/text |
| Status pill | Ready | forest-green/10 bg, forest-green text |
| Share | Pressed | ghost bg white/8 |
| Export PDF | Loading | Spinner replaces download icon |
| Export PDF | Success | Check icon, label "Exported" for 900ms |

---

## Motion

- Hero enters with fade-up.
- Report cards stagger by 70ms.
- Export uses progress spinner and completion check.
- Share sheet uses native presentation.

---

## Empty, Loading, Error

- **No reports**: Show hero and empty card "No reports yet" with "Create weekly report".
- **Draft only**: Recent reports section remains, ready actions disabled for drafts.
- **Export failed**: Inline toast "PDF export failed. Try again."
- **Share unavailable**: Fallback to export file first.
- **Loading**: Hero skeleton, three report skeleton rows, bottom actions disabled.

---

## Accessibility

- Report cards announce title, metadata, status, and "double tap to open".
- Trend rows include direction in text, not color only.
- Export button announces loading and success states.
- Share button uses native accessible share sheet.
- PDF privacy note is included in hero accessibility hint.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/reports/page.tsx`.
- This screen intentionally avoids broad raw data export. It exports structured, user-reviewed reports.
- Privacy defaults: private notes are excluded unless explicitly selected inside report detail.
- No runtime route/API changes are required for this docs addition.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/reports`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B18-F01 | critical | product-sense | Recast this as an in-app report preview with screenshot-level sharing guidance only; remove PDF/data-export promises for V1. |
| B18-F02 | critical | navigation | Wire report preview/detail, report creation/resume, in-app review states, screenshot guidance, and disabled/removed export states for V1. |
| B18-F03 | major | trust-privacy | Add an in-app review step listing included domains, excluded private notes, and edit/remove controls without promising external export. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

