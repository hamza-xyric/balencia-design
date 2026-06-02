# Balencia Visualization Audit — Rubric

**Canonical scoring authority for the visualization premiumness of every screen.** Every grade in `REPORT.md` and every finding in `findings-ledger.md` traces back to a dimension and check defined here. The bar is **premium / A+++ — a screen whose data reads as a crafted, *calm* dashboard (gradient gauges, one clear focal hero, depth, honest charts), indistinguishable in polish from best-in-class apps (per the cluster benchmark below), while staying unmistakably *Balencia* — not a recognizable clone of any of them.**

This rubric is intentionally hard, but premium ≠ maximal. A screen earns A+++ by resolving every metric *intentionally* (visualized, deferred, or deliberately textual) with editorial restraint — **not** by cramming a chart onto every number.

> **Read-only contract.** Auditing never edits the prototype or Figma. Findings carry a `fix-pointer` (the exact remedy + kit primitive) so a *separate* remediation step can act. In this program, remediation is **spec-first**: the visualization design is written into `app_design 3/NN-screen.md`. Prototype + Figma builds are a later "viz-build" program.

---

## Source of truth (what each screen is graded *against*)

| Layer | Authority |
|---|---|
| Screen purpose, IA, data points shown | `app_design 3/NN-screen.md` |
| What the screen actually renders today | `balencia-screens/` route + `get_screenshot` (prototype/Figma) |
| The shared visualization vocabulary | `viz-audit/VIZ-KIT.md` |
| **Locked per-primitive parameters (depth, motion, a11y)** | `viz-audit/CONSISTENCY.md` |
| Design tokens (colour, glow, gradient, radius, motion) | `balencia-screens/src/app/globals.css` |
| The brand's own data-viz law ("every chart is the line") | `Balencia/Design-System-Overview.md` §8 (Continuous Stroke) + §11 (Data visualization) |
| Canonical pattern / interaction / a11y spec | `app_design 3/_shared-patterns.md` |
| Brand 60/30/10 + domain colour system | `CLAUDE.md` + `globals.css` |

### Premium reference — per-cluster benchmark matrix (replaces the single-Bevel bar)

A screen is graded against the **right** best-in-class app for its kind, not against a wearable-vitals home screen. Always-on baselines apply to every screen.

| Cluster | Screens | Primary benchmark | Why |
|---|---|---|---|
| Cross-domain identity / RPG | 12, 16, 19 | **Finch + Habitica** | Life-stats done *warmly*; this is Balencia's owned space — grade on warmth + legibility, not clone fidelity |
| Recovery / Sleep / Energy / Stress | 58, 63, 52, 45 | **Oura + WHOOP** | Sleep-stage donuts, recovery gauges, consistency clouds, readiness |
| Fitness / Workouts | 26, 27, 70 | **Strava + WHOOP** | Activity trends, weekly volume, PR/segment treatments |
| Nutrition / Diet | 28, 29, 56, 57 | **MyFitnessPal premium / Cronometer + Bevel** | Macro rings/donuts, dense food-logs done cleanly |
| Finance / Money | 30, 31 | **Copilot Money + Monarch** | KPI tiles with deltas, category donuts, spend trends, budget bars |
| Streaks / Habits / Gamification | 38, 59, 71, 42 | **Duolingo + Finch + Gentler Streak** | Streak graphs, badge/rarity grids — *and* non-shaming framing (Gentler Streak's thesis) |
| Journaling / Reflection / Mood | 37, 45, 73, 34 | **Reflectly + Stoic + Daylio** | Mood trends, reflection heatmaps, warm editorial restraint |
| Trends / Reports / Intelligence | 48, 64, 78, 84 | **Gentler Streak + Welltory + Apple Health trends** | Correlation surfacing, period-over-period, insight without overwhelm |
| Knowledge Graph / Memory | 72, 20 | **Obsidian / Roam graph view + Reflect** | Legible force-directed life-connection network |
| Leaderboard / Social / Competitions | 39, 47, 83 | **Strava segments + Duolingo leagues** | Podium, rank bars, league tiers — without toxic comparison pressure |
| Calendar / Schedule | 41, 60, 61 | **Fantastical + Things** | Agenda density, adherence calendars |
| Voice / Call summary | 79, 51 | **Granola / Otter + Bevel topic splits** | Topic donut, sentiment gauge, key-moment timeline |
| **Always-on baselines (every screen)** | — | **Apple Health** (honest, accessible, restrained) · **Linear / Things** (editorial restraint, motion craft) | The calm/honest floor under everything |

When the spec describes a visualization the prototype doesn't render, that gap **is the finding** (Data resolution / Hero). When the spec *claims a component capability* (a size, a center hub), the auditor must **diff the claim against the actual component** before scoring — an unbuildable claim is itself a finding.

---

## The ten dimensions (weighted to 100)

Each dimension is scored **0–100**, converted to a letter (see bands), and contributes its weight to the screen's overall numeric score.

| # | Dimension | Weight | One-line bar |
|---|---|---:|---|
| 1 | Data resolution | 14 | Every metric is *resolved* — visualized, deferred to a tap, or deliberately textual — with a clear hierarchy, not maximal coverage |
| 2 | Hero / focal visualization | 14 | Screen opens with one clear premium focal viz, not a flat list and not five competing foci |
| 3 | Visual depth & premiumness | 13 | Gradient strokes, calibrated glow, inset/beveled tracks, layered warm surfaces |
| 4 | Signature ownability | 10 | Advances the Balencia signature (Living Line + Constellation Radar, warm glow) — not a recognizable competitor clone |
| 5 | Chart appropriateness & honesty | 11 | Right chart for the data, readable at 390px, honest scales, no-data ≠ zero |
| 6 | Brand, 60/30/10 & non-shaming framing | 9 | Orange-dominant; green=arrival; purple=SIA; domain colour for identity; data framed as coaching, never a verdict |
| 7 | State craft | 7 | Cold-start, loading, empty, partial, and error states are all designed — not deferred |
| 8 | Kit consistency / reuse | 7 | Composes from `VIZ-KIT.md` primitives at `CONSISTENCY.md` parameters, not bespoke one-offs |
| 9 | Motion & micro-interaction | 7 | Entrance choreography (draw, not fade) + scrub/drill/expand + reduced-motion fallback |
| 10 | Accessibility | 8 | Text equivalent per chart; never colour-alone; AA text + WCAG 1.4.11 3:1 on load-bearing graphics |

---

### 1 · Data resolution — weight 14 (reframed from "coverage": premium ≠ maximal)

The separator between a "list of numbers" and a premium dashboard is **intentional resolution**, not maximal coverage. Every metric the screen shows must be *resolved* one of three ways, and the choice must read as deliberate:
- **Visualized** — a ring/gauge/bar/line/donut/heatmap/radar, when the datum benefits from a visual.
- **Deferred** — surfaced as a headline with the detail behind a tap/drill (premium apps hide depth, not data).
- **Deliberately textual** — a one-off scalar with no useful visual form (a date, a name, a single status word) stays clean text.

Checks (each failure deducts):
- [ ] Every scalar *with a target/range* that anchors the screen is a ring/gauge/bar — not bare text (sleep score, recovery %, calories vs target).
- [ ] Every time-series the screen leans on is a sparkline/line/area/heatmap — not omitted or reduced to "▲ 4%".
- [ ] Every part-of-whole the screen leans on (macros, spending, sleep stages) is a donut/stacked bar.
- [ ] Every multi-axis profile (domain stats, RPG sub-stats) is a radar/bar group.
- [ ] **Editorial hierarchy is legible:** there is a clear primary visual and clearly secondary ones — the screen is not a wall of equally-weighted charts (that is *over*-resolution and is penalised here and in Hero).

Scoring: 100 = every metric intentionally resolved *with* a legible hierarchy. −8 per primary datum still rendered as undifferentiated text where a visual clearly belongs. −6 per screen that over-resolves into chart-noise (the calm-vs-clutter tie-break: a calm, hierarchical screen scores **above** a maximalist one).

### 2 · Hero / focal visualization — weight 14

- [ ] The screen opens (above the fold) with **one** clear focal visualization that anchors the eye (our Constellation Radar; a sleep-score gauge; a finance trend hero).
- [ ] The hero communicates the screen's single most important number/state in <2 seconds.
- [ ] The hero is sized as a hero (not a 36px ring lost in a card).
- [ ] There is exactly one hero — multiple competing focal points score the same as none.
- [ ] Flat screens that open on text/eyebrow/list with no focal viz score low regardless of what's lower down.

### 3 · Visual depth & premiumness — weight 13

Compare against the cluster benchmark's "carved instrument" feel — but **warm**, not cold neon.
- [ ] Gauge/ring strokes use a **gradient**, not flat single-tone.
- [ ] Focal visualizations carry a **soft outer glow** (`--glow-orange/green/purple`), at the size-calibrated radius in `CONSISTENCY.md` — never neon, never a 32px glow swamping a 36px ring.
- [ ] Rings/gauges have an **inset/beveled track** (recessed depth), not a flat 2-tone circle.
- [ ] Chart surfaces feel **layered** (subtle backplate/gradient/top-edge highlight on warm `ink-brown-800`), not boxy flat.
- [ ] Big numbers have typographic weight + optional accent glow; the screen looks *crafted*, not default.

### 4 · Signature ownability — weight 10 (NEW — the anti-clone gate)

Does the screen advance Balencia's **own** visual language, or does it borrow a competitor's signature device?
- [ ] Time-series use the **Living Line** (one continuous, curved, round-capped stroke that *draws itself*; runs orange→green effort→arrival; green milestone dots; dashed-**purple** SIA projection) — per `Design-System-Overview.md` §8/§11, not a generic library line or a segmented Bevel "equalizer".
- [ ] Cross-domain profiles use the **Constellation Radar** (drawn polygon, star dots, Life-Power hub) — not a flat default radar.
- [ ] Depth reads as **warm glow** on ink-brown, not cold neon on slate — the ownable surface signature.
- [ ] The screen would **not** be mistaken for a screenshot of its benchmark app. Borrowing a competitor's signature device 1:1 (ring-trio, equalizer) caps this dimension at **B**.

### 5 · Chart appropriateness & honesty — weight 11

- [ ] Chart type fits the data shape (trend→line/area; part-of-whole→donut; profile→radar; consistency→heatmap; comparison→bars; correlation→matrix; relationships→graph).
- [ ] Readable at 390px width: labels, axis ticks, units present and legible; no cramped/overlapping text; data density appropriate for mobile.
- [ ] **Honest scales:** bars use a zero baseline; compared periods (this-week vs last-week) share one scale; no truncated/dual axis that exaggerates; donut slices sum to a true whole.
- [ ] **No-data ≠ zero:** a missing/un-synced value is visually distinct (ghosted/dashed) from a real zero — a partial radar must not read as "you scored 0".
- [ ] No decorative chart that doesn't represent real data (`Design-System-Overview.md` §11).

### 6 · Brand, 60/30/10 & non-shaming framing — weight 9

- [ ] Orange (`#FF5E00`) dominates data ink (progress, fills, primary series); green (`#34A853`) only for completion / in-range / arrival; **purple (`#7F24FF`) only for SIA-originated elements** — including the brand-sanctioned **dashed-purple projection** (§11), which is correct, *not* a violation.
- [ ] Purple-dominant surfaces are allowed **only** on AI-Mode screens (e.g. Intelligence [48]) and must cite `_shared-patterns.md`.
- [ ] Domain colours used **only** for domain identity (radar dots, domain series), not arbitrary palette; the two-shades-of-blue exception is wellbeing/water only.
- [ ] Glow intensity matches the calibrated `--glow-*` tokens (premium depth, not a neon casino).
- [ ] **Non-shaming framing (ethical gate):** Life Power / domain stats are framed as state, never a verdict on worth; the weakest domain is framed constructively (a coaching prompt, not "you're failing at X"); streaks/momentum don't weaponise loss-aversion; deltas use an honest window (no cherry-picked flattering range); no manufactured scarcity/urgency in tiers. A shaming or dark-pattern framing is a **Critical** finding (see caps).

### 7 · State craft — weight 7 (NEW)

The most-seen state for a new user is the *empty* one. Each must be designed, not deferred to a generic error table.
- [ ] **Cold-start / Day-1:** a "calibrating / needs N days" state, not a degenerate collapsed chart (a radar shrunk to a point, an empty ring).
- [ ] **Loading:** a skeleton that preserves layout and depth (rings/spokes/axes visible), with a specified shimmer direction and a skeleton→data transition (morph, not swap).
- [ ] **Empty / partial:** distinct from loading and from error; partial-sync states show what's present and ghost what's missing.
- [ ] **Error:** chart-specific honesty (which series failed), with a recovery affordance.

### 8 · Kit consistency / reuse — weight 7

- [ ] Visualizations are instances of `VIZ-KIT.md` primitives at the **exact** `CONSISTENCY.md` parameters (stroke widths, gradient stops, point counts, glow-by-size, motion timings) — not screen-bespoke one-offs.
- [ ] The same data shape uses the same primitive across screens (a sleep score and an energy score both use GaugeRing).
- [ ] Any new viz the screen needs is added to the kit as a `VK-###` first, not invented locally. A drift from a locked parameter is a Medium Kit finding.

### 9 · Motion & micro-interaction — weight 7

- [ ] **Entrance:** lines/strokes **draw themselves** (stroke-dashoffset), never opacity-fade (`Design-System-Overview.md` §8); rings fill, bars rise, numbers count up; a defined cross-element choreography (hero first, then supporting).
- [ ] Charts animate on scroll-into-view where below the fold.
- [ ] **Micro-interaction:** charts support drill/scrub/expand where the data rewards it (tap an axis, long-press a sparkline to scrub, expand a card in place) — entrance animation alone is not full marks.
- [ ] `prefers-reduced-motion`: charts render at final state instantly with the signature's *static* form preserved (completed stroke + end dot), no essential info lost.

### 10 · Accessibility — weight 8

- [ ] Every chart has a text/`aria-label` equivalent conveying the same value.
- [ ] Status/series never conveyed by colour alone — a **visible** icon/label/sign is present (an aria-label alone does not satisfy this for sighted colour-blind users).
- [ ] Contrast of labels/values ≥ **4.5:1** on `#0A0A0F` / `#211008`.
- [ ] **WCAG 1.4.11:** load-bearing graphical objects (chart strokes, gauge arcs, the filled/unfilled boundary, status dots) meet **≥ 3:1** against their background. Sub-threshold grid/axis alphas (e.g. white/5) are allowed only for purely decorative structure a user need not perceive.
- [ ] Interactive chart targets ≥ 44×44pt.

---

## Grade bands

| Band | Score | Meaning |
|---|---|---|
| **A+++** | 98–100 | Flawless premium. Every metric resolved with restraint, depth everywhere, ownable, honest, accessible, all states crafted. |
| **A++** | 95–97 | Excellent; one trivial nit. |
| **A+** | 92–94 | Strong; a couple of minor findings. |
| **A** | 88–91 | Solid premium with a noticeable gap. |
| **A−** | 84–87 | Good, but a real visualization weakness. |
| **B+** | 80–83 | Competent; multiple findings or one missing focal viz. |
| **B** | 74–79 | Acceptable but visibly below premium (or a recognizable clone). |
| **C** | 60–73 | Functional but list-heavy; significant viz rework needed. |
| **D / F** | < 60 | Subpar — data rendered as text where charts belong; no hero. |
| **N/A** | — | LOW-class screen (auth/chat/settings/modal) — visualization not applicable. Logged, not failed. |

**Screen-set overall grade** = weighted mean of all HIGH+MEDIUM screens' overall scores (N/A screens excluded). The executive summary states the overall, the **band distribution** (count per band, so a few A− screens dragging the mean are visible), the count below B, and the single highest-leverage gap.

---

## Severity mapping (for the findings ledger)

| Severity | Trigger |
|---|---|
| **Critical** | Wrong brand colour in a chart; a misleading/**dishonest** chart (truncated axis, no-data shown as zero); a **shaming / dark-pattern** framing; a core dashboard with zero visualization of its primary data. |
| **High** | No hero/focal viz on a HIGH screen; a primary dataset rendered as text; a **recognizable competitor clone** (ownability < B); an undefined/degenerate cold-start state on a HIGH screen; a bespoke one-off where a kit primitive exists. |
| **Medium** | A secondary dataset un-visualized; flat depth (no gradient/glow) on a focal viz; a drift from a `CONSISTENCY.md` locked parameter; missing entrance choreography; a non-text 1.4.11 contrast miss. |
| **Low** | Cosmetic; missing tap-to-drill; minor legibility nit; optional sparkline absent. |

### Grade caps (premium means no known serious defect)

- No grade above **A−** with any open **High**.
- No grade above **B+** with any open **Critical**.
- **No A+++** with an undefined/degenerate cold-start state, or with **Signature ownability < B** (a clone cannot be flawless-premium).
- **Data-honesty and non-shaming Criticals cap harder than motion/Highs:** an open dishonest-chart or shaming-framing finding caps the screen at **B** until resolved (a beautiful, dishonest, or shaming screen is not premium).
