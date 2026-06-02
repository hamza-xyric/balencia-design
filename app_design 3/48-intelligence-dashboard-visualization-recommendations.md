# Intelligence Dashboard — Premium Visualization Recommendations

> Companion to `48-intelligence-dashboard.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (54) → specced-target A− (86)** under the revised 10-dimension rubric.
> **This screen MINTS `VK-009 CorrelationMatrix`** — its full primitive spec is folded into `VIZ-KIT.md`; the design rationale lives in R3 below.

## Context

The Intelligence Dashboard is SIA's analytical command center — by the spec's own words, *"the most data-rich screen in the app… a premium 'health intelligence briefing' rather than a spreadsheet."* It is also the **single AI-Mode screen** where royal-purple is the dominant accent, sanctioned in `_shared-patterns.md` because this is the AI's own space to show its work.

We grade it against the **Trends / Reports / Intelligence cluster benchmark: Gentler Streak + Welltory + Apple Health trends** — apps whose whole craft is *surfacing correlation and period-over-period insight without overwhelming, and without judgment.* Welltory is the closest comparable: it turns HRV + behavioral data into legible correlation cards and forecasts. The lesson we take from it is **legible correlation surfacing**; the lesson we explicitly *reject* is its clinical, cool, data-dense aesthetic. Balencia's way is the same intelligence rendered **warm** — purple on `ink-brown-800`, the Living Line as the trend signature, the correlation engine made into a *coaching* artifact, not a lab readout. Gentler Streak contributes the **non-shaming thesis**: a contradiction is transparency, not an accusation; a weak correlation is a prompt, not a failure.

**Where today's screen falls short of that bar:**

1. **The namesake is missing.** Balencia's core differentiator is the **Life Correlation Matrix** (`LIFE_CORRELATION_MATRIX.md`: *"domains are no longer a list — they are a connected graph with quantified relationships"*). On the screen that is supposed to *be* that engine, it renders as **two prose rows** with a colour-only strength bar. The matrix itself does not exist. This is the highest-leverage gap and the reason `VK-009` is minted here.
2. **A dishonest sparkline.** The prototype's `pointsFor()` **autoscales each pillar sparkline to its own min/max** — a near-flat pillar (nutrition: 78→85) is drawn with the *same dramatic amplitude* as a volatile one. That exaggerates change and is a chart-honesty violation (RUBRIC dim 5).
3. **A flat hero.** `ScoreRing` is a single-tone purple arc with a `blur-2xl` ambient haze — not a calibrated glow, no gradient, no inset track, no ticks. It is also **bespoke** (`ProgressRing` locks to 36/48/96; the 120px hero is hand-rolled).
4. **The forecast is absent.** The spec calls for a dashed projection into the future; the prototype's trend is a flat 3px `polyline` with no SIA forecast tail — the one place dashed-purple projection is unambiguously *correct* (§11).
5. **Straight lines everywhere.** Both the sparklines and the trend are straight `polyline`s, not the curved, round-capped, self-drawing **Living Line** the brand mandates ("every chart is the line").

Decisions honored: **distinct Balencia signature** (the Living Line + the minted matrix, not a Welltory clone); **spec-first** (read-only); premium depth inside the **AI-Mode purple-dominant** brand law. No new data — every visual derives from data the screen already shows (`intelligenceDashboard` in `src/data/mock.ts`).

---

## What reads premium — and how we do it *our* way (not Welltory's)

| Premium quality | Welltory / Apple Health device | **Balencia's ownable equivalent** |
|---|---|---|
| A confident focal score | Cool HRV "energy" gauge | **AI-Mode `GaugeRing`** — purple arc-gradient + ticks + warm `--glow-purple-md`, score as a calibrated instrument |
| Legible correlation surfacing | Dense correlation cards / lab table | **`CorrelationMatrix` (VK-009)** — domain×domain intensity, *warm*, with sign+arrow, paired with coaching rows |
| Honest trend + forecast | Forecast band / cone | **Living-Line `TrendChart`** — solid purple actual + **dashed-purple SIA forecast** (on-brand here) |
| Scannable pillar trends | Mini line tiles (autoscaled) | **Living-Line `Sparkline`s** — curved, draws itself, **honest fixed 0–99 scale** |
| Layered depth | Cold neon on slate | **Warm** purple glow on `ink-brown-800` + inset tracks |

**Root cause of today's flatness:** we own the raw materials but don't deploy them, the matrix doesn't exist, and the depth tokens to make any of it premium **don't exist yet**. `RadarChart`, `ProgressRing` (36/48/96), `LineChart`/`BarChart` (built, unused), and `CalendarHeatmap` (deployed — the cell engine `VK-009` extends) all exist; `--glow-purple` exists; but the **purple gradient, inset-track, stroke-width, and size-stepped purple-glow tokens are absent** (logged `VK-017`), and `CorrelationMatrix` is a net-new primitive (`VK-009`). The upgrade is composition + a depth pass + minting `VK-009` and those tokens — not new charting infra.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex. This screen adds the **purple** members of the depth family (the orange members are shared with Home):

| Token | Intended value | Use |
|---|---|---|
| `--purple-light` | `#A45CFF` | lighter stop of the AI-Mode purple gradient (named once) |
| `--grad-purple` | `linear-gradient(180deg, #7F24FF, var(--purple-light))` | AI-Mode gauge/ring/area depth (score hero, trend area) |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed ring/track (shared) |
| `--glow-purple-md` / `--glow-purple-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | size-stepped purple glow (120px hero / 48px mini-gauge) |
| `--stroke-thin/base/bold/poster` | `2 / 4 / 8 / 12px` (§8) | stroke widths (sparkline 2px, hero gauge 10px) |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | Best-Day `MomentumBar` effort→arrival (shared) |

> **Why purple gradient ink is allowed here and nowhere else.** `_shared-patterns.md` defines the AI-Mode exception: on the Intelligence Dashboard, royal-purple *replaces* orange as the data accent because every primary number is SIA-computed. `--grad-purple` therefore exists **only** for this screen's heroes; every other screen's depth gradient is `--grad-orange`. The dashed-purple forecast is the same colour used in the brand-sanctioned projection role (§11), so the screen reads as one purple system.

---

## The five recommendations

Ordered by leverage. R3 (the minted matrix) is the highest-leverage and the reason this batch exists; R1 is the hero; R2/R4 fix honesty defects; R5 is depth polish.

### R1 — Daily Score hero: AI-Mode `GaugeRing` (the focal instrument)

Replace the bespoke flat `ScoreRing` with a **hero `GaugeRing`** at **120px** (billboard, 10px stroke), in **AI-Mode purple**.

```
┌───────────────────────────────────────┐
│ DAILY SCORE                            │  ← purple eyebrow (SIA-computed)
│            · · ·  ticks  · · ·         │
│          ╱‾‾‾‾‾‾‾‾‾‾╲                  │
│         │   ┌─────┐  │                 │  ← 120px GaugeRing, purple arc-gradient
│         │   │ 82  │  │                 │    --grad-purple via conic-mask
│         │   │/100 │  │                 │    inset track + --glow-purple-md (calibrated)
│          ╲__________╱                  │    12 radial ticks (hero only)
│              ▲ +3 from yesterday       │  ← green up-arrow + visible word
└───────────────────────────────────────┘
```

- **Arc-following gradient stroke** — `--grad-purple` **(mint)**. ⚠️ An SVG `linearGradient` cannot sweep *along* the arc; use a **CSS `conic-gradient` behind a circular mask** (or a multi-stop SVG approximation). "Gradient stroke" is not a one-liner — specify the conic approach.
- **Calibrated glow, not a haze** — `--glow-purple-md` (~20px, mint), size-stepped to the 120px hero. The prototype's `bg-royal-purple/10 blur-2xl` is an *unbounded* CSS blur, not a token — it reads as a soft cloud, not a carved instrument. (A 32px glow is reserved for orange heroes; the purple equivalent steps identically by size.)
- **Inset/beveled track** — `--track-inset` `rgba(0,0,0,0.28)` under the `--color-alpha-white-10` track (the old 0.25 is invisible on `#211008`).
- **Ticks on** — 12 radial ticks, 6px, `--color-alpha-white-25`, behind the `ticks` prop. Hero score gauge is exactly the sanctioned use.
- **Component reality:** `ProgressRing` locks to `36 | 48 | 96`; `GaugeRing` adds the 120px billboard size + an `ai`/purple mode. Tracked under the GaugeRing depth-upgrade + `VK-017`.
- **Cold-start:** faint full purple **track** with `--` in the hub (not a 0% arc that reads as "you scored zero").

### R2 — Pillar Sparkline row: Living Lines on an honest scale (a correctness fix)

Replace the three autoscaled `polyline`s with true **Living-Line `Sparkline`s**, and fix the honesty defect.

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ╭‾◝◜╮_╭  │ │ ___╭──‾  │ │ ‾◝╮__╭◝  │  ← 7-pt Living Line, CURVED, draws itself
│ Fitness  │ │ Nutrition│ │Wellbeing │    purple (AI-Mode), 2px, no axes
│ 78  ▲    │ │ 85  —    │ │ 80  ▼    │  ← value + VISIBLE trend sign (never colour-alone)
└──────────┘ └──────────┘ └──────────┘
   shared 0–99 scale → a flat pillar LOOKS flat
```

- **Living Line:** exactly **7 points**, `--stroke-thin` 2px, **curved** (monotone), round-capped, **no axes/grid/glow**, 64×24. Tint = royal-purple (SIA-computed).
- **Honesty fix (the load-bearing change):** `pointsFor()` today does `((value - min) / (max - min))` **per sparkline** — every series fills the full 24px regardless of its true range. Re-scale all three to a **fixed 0–99 domain-stat domain** so nutrition's 78→85 reads as the gentle rise it is, not a cliff. No-data points ghost/dash.
- **Visible sign:** ▲ green / ▼ orange / — white-50 glyph beside the value — the prototype already renders an arrow, keep it; it satisfies "never colour alone."
- **Data:** `intelligenceDashboard.pillars[].points` (already 7 values), `.value`, `.trend`. No new data.

### R3 — `CorrelationMatrix` (VK-009): the minted primitive, the screen's reason to exist

This is the differentiator. The **Life Correlation Matrix** — the app's core IP — gets a real visualization for the first time. We mint `VK-009` by **extending the deployed `CalendarHeatmap` cell engine** (5 intensity steps already exist) into a square N×N grid, then pair it with readable coaching rows so the dense grid never overwhelms (the Welltory lesson, applied warmly).

```
CORRELATIONS                                  ← purple eyebrow
┌────────────────────────────────────────────┐
│        Fit Slp Nut Wel Fin Med  …           │  ← domain icons on row + column
│  Fit  [▦] +6  +3  +4  ·   +2                │   cell intensity = |strength|
│  Slp  +6 [▦] +2  +7  ·   +5                 │   + sign GLYPH in every cell (never colour-alone)
│  Nut  +3 +2 [▦] +4  +1  ·                   │   diagonal muted (self)
│  Wel  +4 +7 +4 [▦] ·   +8                   │   reinforcing = warm purple
│  Med  −4 +5  · +8  ·  [▦]                   │   competing = desaturated cool tint + "−"
│        … ghosted cell = not-yet-computed     │   (distinct from a true ~0)
│  ──────────────────────────────────────────  │
│  ↑ Meditation ↔ Stress    −40%  strong  ▲▼   │  ← ranked coaching rows (Tier 2)
│  [████████████░░░] 85%                        │    arrow + word + bar (triple-encoded)
│  ↑ Morning workout ↔ Energy +12% moderate ▲▼ │
│  [█████████░░░░░░] 72%        see all →       │
└────────────────────────────────────────────┘
```

**Why a matrix *and* rows (two tiers).** The matrix gives the at-a-glance *gestalt* of the user's life-as-a-graph — Balencia's whole thesis — but a raw N×N grid is hostile on a 390px phone. The ranked rows below translate the two or three strongest cells into plain-language coaching, so the screen is *legible* first and *explorable* second. This is the warm answer to Welltory's wall of cards.

**Encoding (locked in the VK-009 spec):**
- **Intensity = |strength|** via the `CalendarHeatmap` 5-step ramp, re-tinted.
- **Direction = sign, triple-encoded, never colour-alone:** a **`+`/`−` glyph in every cell**, *and* a directional tint (reinforcing = warm purple `--color-royal-purple`; competing/inverse = a **desaturated cool tint**, the sleep-blue family at low chroma), *and* — in the ranked rows — a **leading ↑/↓ arrow + the word** ("reinforcing"/"competing"). Any one of the three conveys direction alone, so colour-blind and grayscale users lose nothing.
- **Diagonal muted** (`--color-alpha-white-05`) — self-correlation is not information.
- **No-data ≠ zero:** an un-computed pair is a **ghosted cell**; a genuine near-zero correlation is a muted near-diagonal tone. They must look different.

**Depth:** 2px cell gap, `--r-xs` corners, today/hovered cell = dashed border (reuse heatmap `today`), card top-edge highlight on `ink-brown-800`.

**Micro-interaction:** tap a cell → tooltip pill (`ink-900`, `--r-sm`, 8px pad): "Meditation ↔ Stress: −40% (strong inverse) · ask SIA →" → SIA Chat [09] with context. Cell targets ≥ 44×44 — on a full 12×12 grid the cells pack tighter, so the **ranked rows beneath carry the 44pt tap target** and cells are tap-to-tooltip only.

**Reduced motion:** matrix renders at full intensity instantly (no row-by-row fade); rows static.

**Data:** `intelligenceDashboard.correlations[]` for the rows; the full grid from `GET /api/v1/intelligence/correlations` (domain×domain coefficient matrix). Direction = sign of the coefficient.

### R4 — Score Trend: Living-Line `TrendChart` + the dashed-purple SIA forecast

Route the score history through the **Living Line**, and add the **forecast the spec already asks for** — the one place dashed-purple projection is unambiguously correct.

```
SCORE TREND        [7d] [14d] [30d]
100│
 75│        ╭─●╮      ╭─●         · · ·●  ← solid purple Living Line (actual)
 50│   ╭─●─╯   ╰─●──╯      ╲· · ·       ← dashed-PURPLE SIA forecast → ~75
 25│ ●╯                              (§11: projection IS purple — on-brand here)
  0└────────────────────────────────────
    May 14                      May 20  +1
```

- **Living Line:** solid **purple** actual, 2px, curved, round-capped, green milestone dots; **draws itself** L→R (`stroke-draw`, `--dur-flow` 1200ms), never opacity-fade.
- **Dashed-purple forecast:** a `#7F24FF` dashed tail (dash 4·2, 2px) continues the same path 1–2 days forward to the predicted **~75**, visually tying the Predictions card to the trend. This is the §11 sanctioned projection — *correct here*, not a 60/30/10 violation.
- **Honest scale:** keep the prototype's fixed **0–100 y-axis** (0/25/50/75/100); compared ranges share the scale; a data gap is a **line break**, not a drop to zero.
- **Area fill:** `--grad-purple` **(mint)** vertical fade ≤25%.
- **Micro-interaction:** press-and-hold to **scrub** — tooltip follows finger, light-impact haptic on point change (the spec already specs this; wire it).
- **Component reality:** wrap the unused `LineChart` (`components/charts/LineChart.tsx`) as the Living-Line `TrendChart`; today the prototype hand-rolls a `polyline` with no projection.

### R5 — Best-Day momentum + Prediction depth (polish, non-shaming)

Two small depth passes so these cards aren't plain text:
- **Best-Day** → a **`MomentumBar`** (single **continuous** rounded fill, 8px, radius-pill) for "3/5 factors matched," graduated orange→purple-70→green per the spec — but framed as **forward momentum**: a low bar is "room to move today," never failure (Gentler Streak's non-shaming thesis). Keep the all-matched confetti.
- **Prediction** → a small **`GaugeRing`** (48px, `--glow-purple-sm` mint) behind the `~75` so the predicted score reads as a calibrated instrument; accuracy badge stays a green/orange word-pill (honest confidence — visible word, not colour alone).

**Optional R5b — depth polish:** faint top-edge highlight + soft warm shadow on `ink-brown-800` cards; `--glow-purple-md` on the score hub only. Subtle.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 Score `GaugeRing` | `ProgressRing` | `src/components/screens/ProgressRing.tsx` | 120px size + `ai`/purple mode, arc gradient (conic), `--glow-purple-md`, inset, ticks (VK-002, VK-017) |
| R2 Pillar `Sparkline`s | `pillars[].points`, a Living-Line `Sparkline` | `src/data/mock.ts` | Sparkline (VK-001/VK-016) + **honest fixed 0–99 scale** |
| R3 `CorrelationMatrix` | **`CalendarHeatmap` cell engine**, `correlations[]` | `src/components/charts/CalendarHeatmap.tsx`, `src/data/mock.ts` | **mint VK-009** (N×N grid, sign+arrow encoding) |
| R4 `TrendChart` | unused `LineChart`, `trendPoints[]`, `.prediction` | `src/components/charts/LineChart.tsx`, `src/data/mock.ts` | Living Line + dashed-purple forecast (VK-006, VK-016, VK-018) |
| R5 MomentumBar + mini gauge | `bestDay`, `.prediction` | `src/data/mock.ts` | MomentumBar (VK-004), GaugeRing 48px |
| Depth tokens | `--grad-purple`, `--purple-light`, `--track-inset`, `--glow-purple-sm/md`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails (AI-Mode exception)

- **AI-Mode purple is data ink — only here.** Per `_shared-patterns.md`, royal-purple `#7F24FF` carries the score gauge, pillar sparklines, matrix reinforcing direction, trend line, and the dashed-purple SIA forecast — *because every primary number is SIA-computed.* This exception applies to **no other screen**; `--grad-purple` exists for this screen alone.
- **Orange stays interactive (the 60% role, redirected):** links, "see all", "see full report", contradiction alert icons remain orange. Orange is *not* eliminated — it owns affordances.
- **Green = arrival/positive:** trend-up arrows, matched Best-Day factors, high-accuracy badge, milestone dots, in-range gauge.
- **Direction never by colour alone:** the matrix's competing/inverse cells use a **desaturated cool tint + a `−` glyph**; reinforcing use warm purple + `+`; ranked rows add a ↑/↓ arrow + the word. Triple-encoded.
- **Domain colours** appear only as matrix row/column identity icons and weekly-report pills — identity, not decoration.
- **Glow** uses the calibrated size-stepped purple scale (`--glow-purple-md/-sm`) — premium warm depth, never the prototype's unbounded `blur-2xl` haze.
- **Non-shaming (ethical gate):** the score is *state, not a verdict*; contradictions are transparency, not accusations; the weakest pillar/correlation is a coaching prompt; the Best-Day bar frames momentum; deltas use disclosed windows.
- **Accessibility:** text/aria equivalents on every chart (gauge, each sparkline, **each matrix cell**, trend); visible signs everywhere; WCAG 1.4.11 ≥3:1 on load-bearing purple strokes/arcs/cells/dots (purple `#7F24FF` clears 3:1 on `#0A0A0F`/`#211008`); 44×44 targets; reduced-motion → final state with the Living-Line static form preserved.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint the depth tokens first, including the purple family (`--grad-purple`, `--purple-light`, `--glow-purple-sm/md`).
2. **VK-009 `CorrelationMatrix`** — the minted primitive; the screen's reason to exist and the highest perceived-quality jump.
3. **R1 Score `GaugeRing`** — the focal instrument; replaces the flat bespoke ring.
4. **R2 Pillar Sparklines** — the honesty fix (fixed 0–99 scale) + Living Line.
5. **R4 `TrendChart`** — Living Line + dashed-purple forecast.
6. **R5 Momentum + prediction depth (+ R5b)** — polish.

Each is independently shippable and verifiable.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/features/intelligence`, screenshot before/after; verify: the score gauge has an arc-gradient + ticks + a *calibrated* glow (not `blur-2xl`); the pillar sparklines are **curved 7-pt Living Lines on a shared 0–99 scale** (a flat pillar looks flat); the **CorrelationMatrix renders** with a `+/−` glyph in every cell and the ranked coaching rows; the trend **draws** (not fades) and carries a **dashed-purple forecast tail** to ~75.
- `npm run check` — `verify:brand` must stay green **with the AI-Mode purple exception whitelisted for this route** (purple-as-data-ink is correct here and only here).
- Confirm cold-start (score "--", matrix "analyzing", sparklines hidden), partial-sync (ghosted cells/spokes), loading (depth-preserving skeletons), and error states render per spec — not a degenerate collapsed ring or empty grid.
- Confirm every matrix cell is operable/announced by VoiceOver with direction stated in words, and that no direction is conveyed by colour alone.
