# Fitness & Workouts Dashboard — Premium Visualization Recommendations

> Companion to `26-fitness-workouts-dashboard.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (53) → specced-target A− (86)** under the revised 10-dimension rubric.

## Context

Screen 26 is the **canonical Domain-Dashboard A template** — Nutrition, Finance, Career, Relationships, Spirituality, Learning, and Creativity all inherit its visualization slots. Getting this one right sets the bar for nine screens, so the discipline here is *template restraint*: a repeatable KPI strip → one viz hero → comparison bars → the Living-Line trend → a consistency heatmap, with the domain's primary *content* (here, SIA's AI workout plan) sitting above and untouched.

We benchmark against **Strava + WHOOP** — the activity-trend, weekly-volume, and recovery-gauge canon. But the goal is **not to copy their devices**. WHOOP's signature is the recovery donut + strain bars; Strava's is the segmented activity graph + relative-effort. If we rendered those 1:1 we'd be a recognizable clone in a wearables app's own language (ownability caps at B). Instead we read the *same data* through **Balencia's own** signature, which the brand book already defines:

- **The Living Line** (`Design-System-Overview.md` §8/§11): "every chart is the line" — one continuous, curved, round-capped stroke that *draws itself*, runs **orange (effort) → green (arrival)**, marks milestones with green dots, and shows SIA's forecast as a **dashed purple** tail. This is the activity-trend device Strava/WHOOP structurally do not have.
- **Warm-glow `GaugeRing`**: the *same bounded recovery score* WHOOP shows as a donut, rendered as our warm-glow instrument so recovery here, sleep score on [58], energy on [63], and every domain score read as **one family** — not a borrowed donut.
- **Warm depth**: calibrated orange glow on warm `ink-brown-800`, vs competitors' cold neon on slate.

The result reads premium **the Balencia way**: a coaching command-center where recovery is the single instrument hero, the week's volume is honestly compared, and the long arc is one self-drawing line — not a vitals-app dashboard.

**Decisions honored:** distinct Balencia signature (not Strava/WHOOP-proximate); spec-first (read-only); premium depth inside 60/30/10; fitness-red `#EF4444` is an **identity** accent only, never data ink (except where it *is* this domain's own consistency in the heatmap). This screen **mints no new primitive** — it composes from and retires existing kit backlog.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex:

| Token | Intended value | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient (named once) |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | gauge arc + area-fill depth |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | Living Line effort→arrival |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed gauge/bar track |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | size-stepped glow (48px / 36px) |
| `--stroke-thin/base/bold` | `2 / 4 / 8px` (§8) | stroke widths |

Existing tokens used as-is: `--color-brand-orange` `#FF5E00`, `--color-forest-green` `#34A853`, `--color-royal-purple` `#7F24FF`, `--glow-orange` (32px hero), `--color-alpha-white-10/08/05`, `--color-domain-fitness` `#EF4444`, `--stalled-amber` `#F59E0B`.

**New mock data this screen needs** (so every visual derives from real, honest data — not decoration): `week.lastWeek` (workouts/min/cal + daily series, for the WoW deltas and the compare bars), `activityTrend` (6 weekly points + a `projection` value, for the Living Line), and `streakHistory` (date→sessionLoad, for the heatmap). All added to `fitnessDashboard` in `src/data/mock.ts`.

---

## The six recommendations

Ordered by leverage. R1–R2 establish the template's KPI + hero; R3–R4 add honest comparison + the signature line; R5–R6 are ambient consistency + depth carry-over.

### R1 — `KPIStatTile` strip: headline numbers with honest deltas (template anchor)

The "This week" section today is three text `StatTile`s (3 / 135 / 850) — numbers with no movement, no context. Replace with `KPIStatTile`s carrying a **fixed, disclosed WoW delta**:

```
┌────────────┐ ┌────────────┐ ┌────────────┐
│ WORKOUTS   │ │ ACTIVE MIN │ │ CALORIES   │  ← uppercase label, white/40, +0.12em
│ 3          │ │ 135        │ │ 850        │  ← text-h2, count-up 280ms
│ ▲ 1 vs lw  │ │ ▲ 20 vs lw │ │ ▼ 40 vs lw │  ← ▲ green / ▼ muted, window disclosed
└────────────┘ └────────────┘ └────────────┘
```

- **Delta law (honest):** ▲ `--color-forest-green` / ▼ `--color-alpha-white-40`; the window is **fixed and labeled** ("vs last week"), never cherry-picked to flatter. A ▼ is a *neutral* muted arrow — no red, no "down" shaming.
- **Depth:** `ink-brown-800` + top-edge highlight; **no glow** (KPI tiles are flat-premium; depth lives in the gauge). Count-up `--dur-base` 280ms `--ease-out-soft`.
- **Day-1:** all read `0` with a `—` delta (no prior week exists — fabricating a ▲ would be dishonest).
- **Source:** `fitnessDashboard.week.stats` + new `week.lastWeek`.

### R2 — `GaugeRing`: the recovery hero (the one focal instrument)

WHOOP recovery (78%) is the screen's most decision-relevant number — "is today an intensity day?" — yet today it's a bare digit under a colour-only dot. Promote it to a **96px `GaugeRing`** as the screen's single viz hero:

```
        ╭───────────╮
      ╱   ┄┄┄ ticks   ╲           ● Sleep   85  ✓     ← 48px gauge + visible glyph
     │      ┌─────┐     │         ● HRV     68  ~     ← banded, glyph not colour alone
     │      │ 78  │     │  ◀ 96px hero, arc-gradient + 32px glow + inset track
     │      │recov│     │         ✓ in range (≥70)    ← visible band sign
      ╲     └─────┘    ╱
        ╰───────────╯
```

- **Depth (the carved instrument, warm):** arc-following `--grad-orange` **(mint)** stroke via **conic-gradient behind a circular mask** (⚠️ an SVG `linearGradient` cannot sweep *along* the arc — "gradient stroke" is not a one-liner; specify conic); full `--glow-orange` (32px, **hero 96px only**); `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess under the `--color-alpha-white-10` track; **12 radial `ticks`** (hero score gauge); center value `text-h2` count-up 520ms `--ease-flow`.
- **Banding + visible signs (fixes the a11y miss):** green `#34A853` ≥70 (✓), amber `#F59E0B` 40–70 (~), fitness-red `#EF4444` <40 (!). The glyph carries the meaning; colour reinforces. Today's `aria-hidden` colour-only dots fail both 1.4.11 and colour-blind users.
- **Sleep (85) + HRV (68)** become **48px `GaugeRing`s** (`--glow-orange-md` ~20px **(mint)**, 4px stroke) beside the hero. HRV has no fixed 0–100 goal → it's a **banded value gauge** (disclosed thresholds), not a false "% of target."
- **Why a gauge, not a WHOOP donut:** the gauge is our warm-glow instrument; recovery, sleep score [58], energy [63], and mission rings all share it → one family, unmistakably ours.
- **States:** not connected → **ghosted dashed arcs** + "Connect WHOOP" (no-data ≠ 0%); syncing → radial-shimmer skeleton that morphs into the drawn arc; error → ghosted arc + "retry".

### R3 — `BarChart`: weekly volume, this-week vs last-week (honest compare)

Today the screen shows *only* this-week totals — there's no sense of trajectory. Add a `BarChart` (wraps the **built-but-unused** `components/charts/BarChart.tsx`) comparing the two weeks day-by-day:

```
min                                  ▮ this week (orange)   ▯ last week (green)
60 ┤        ▮                          (§11 compare law)
40 ┤  ▮▯   ▮▯    ▮       ▮
20 ┤  ▮▯   ▮▯   ▮▯  ▯   ▮▯   ▯
 0 ┼──M────T────W────T───F────S────S──   ← zero baseline, ONE shared y-scale
```

- **Honesty (the gate):** **zero baseline**; **one shared y-scale** across both weeks (no truncated/dual axis that exaggerates); a no-workout day is a true **zero-height tick**, distinct from a **ghosted/dashed** un-logged day. This-week = `--color-brand-orange`, last-week = `--color-forest-green` (§11).
- **Depth:** rounded top caps; bars rise 520ms `--ease-flow`; `ink-brown-800` backplate + top-edge highlight; **no glow on bars** (reserved for the gauge hero).
- **Micro-interaction:** tap a day-pair → both values; W/M toggle pill (active orange, inactive `white/50`).
- **Source:** `week.days` minutes + new `week.lastWeek` daily series.

### R4 — `TrendChart`: the activity Living Line (the signature)

The ownable element: the long arc of activity as **one continuous, self-drawing Living Line** — the device Strava/WHOOP don't have.

```
min/wk                                              ⌁ SIA forecast
       ●(PR)                              ╭┄┄┄┄┄●  ← dashed PURPLE projection (§11)
   ╭─────╮      ╭──────╮         ╭───────╯
 ╭─╯      ╲   ╭─╯       ╲      ╭─╯  ← orange (effort) → green (arrival), curved, draws itself
─╯          ╲─╯           ╲───╯       green milestone dot on PR weeks
 W1    W2    W3    W4    W5    W6   │ next →
```

- **Form (§8/§11):** monotone-curved, round-capped, `--grad-progress` **(mint)** orange→green; green `#34A853` milestone dots on PR weeks; `--grad-orange` area fade ≤25% top; **dashed-purple `#7F24FF`** SIA projection tail continuing the *same* path (the brand-sanctioned forecast colour — correct, **not** a 60/30/10 violation; reverses the old kit error, `VK-018`).
- **Motion — draws itself:** `stroke-draw` `--dur-flow` 1200ms `--ease-flow`, **never opacity-fades**; projection draws after the actual; scroll-into-view. One line motif per surface — this is the *only* full Living Line on the screen (KPI/mission/bars are numbers/bars).
- **Micro-interaction:** long-press scrub crosshair; W/M/Y selector.
- **States:** <2 weeks → "calibrating — building your trend" faint baseline, **never** a lone dot; projection hidden until SIA has data; reduced-motion → completed stroke + green end dot + static dashed-purple tail.
- **Source:** new `activityTrend` (6 points + `projection`).

### R5 — `CalendarHeatmap`: streak consistency (ambient, non-shaming)

Reuse the **deployed** `CalendarHeatmap` for trailing-weeks consistency, below the existing 7-day dot row (dots = *this week's* status; heatmap = *long-run* consistency — complementary, not redundant):

```
      M T W T F S S
 wk-3 ▢ ▤ ▣ ▢ ▤ ▢ ▢      5 intensity steps:
 wk-2 ▣ ▣ ▤ ▢ ▣ ▤ ▢      white/05 → full fitness-red (this domain's identity)
 wk-1 ▤ ▣ ▣ ▤ ▢ ▢ ▢      today = dashed border; tap = scale-110
 wk-0 ▣ ▤ ▢ ⌗ . . .       ⌗ = today
```

- **Domain colour is legitimate here:** the heatmap encodes *fitness's own* consistency, so fitness-red `#EF4444` as the full-intensity step is identity, not arbitrary palette — the one sanctioned place domain colour touches data on this screen.
- **Non-shaming (Gentler-Streak thesis):** empty cells = "open days," never a guilt grid; no loss-aversion countdown on a break.
- **States:** Day-1 → empty grid, "your streak starts today" (today dashed) — not a wall of red-absence; loading → cells shimmer in place.
- **Source:** new `streakHistory` (date→sessionLoad).

### R6 — Mission depth + optional sparkline (deliberately *not* rings)

The two active-mission bars (0.68, 0.40) **stay flat horizontal bars** — promoting them to rings would mint a second focal point and fight the recovery-gauge hero (an over-resolution penalty, RUBRIC dim 1/2). They adopt only the depth pass: `--color-alpha-white-08` track over a `--track-inset` recess, `--color-brand-orange` fill, width count-up 0→% on mount. **High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, green end dot on a milestone, **no glow**) under the lead goal.

> **Decision note:** this is the calm-vs-clutter tie-break in action — the template deliberately leaves the secondary bars quiet so the hierarchy stays legible. A maximalist version (everything a ring) would score *lower*, not higher.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 KPIStatTile | `StatTile`, `week.stats` | `src/components/screens/StatTile.tsx`, `src/data/mock.ts` | extract `KPIStatTile` + delta (VK-008); add `week.lastWeek` |
| R2 GaugeRing | `ProgressRing`, `whoop` | `src/components/screens/ProgressRing.tsx`, `mock.ts` | arc-gradient (conic), glow-by-size, inset, ticks, banding (VK-002, VK-017) |
| R3 BarChart | **unused** `BarChart` | `src/components/charts/BarChart.tsx` | wire-up; orange/green compare; shared scale (VK-006); add `lastWeek` daily |
| R4 TrendChart | **unused** `LineChart` | `src/components/charts/LineChart.tsx` | wrap as Living Line; dashed-purple projection (VK-006, VK-016); add `activityTrend` |
| R5 CalendarHeatmap | **deployed** `CalendarHeatmap` | `src/components/charts/CalendarHeatmap.tsx` | reuse as-is; add `streakHistory` |
| R6 MacroBar + Sparkline | `activeMissions`, MacroBar | `src/components/domain/MacroBar.tsx`, `mock.ts` | depth pass; Sparkline (VK-001) |
| Depth tokens | `--grad-*`, `--track-inset`, `--glow-*-sm/md`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

**Component-reality flags (diffed against source):** `ProgressRing` is locked to sizes `36 / 48 / 96` flat 2-tone (the 96px hero variant + `domain`/banding mode is the `VK-002` upgrade). `BarChart` and `LineChart` exist but are **referenced nowhere** in `src/app` (`VK-006` wire-up). `CalendarHeatmap` is live (creativity + habits routes) — pure reuse. No 200px ring exists; the recovery hero is the 96px size — no unbuildable size claim.

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates data ink: recovery gauge fill, this-week bars, Living-Line effort, mission fills, KPI accents, sparkline.
- **Green (30%)** only for in-range / arrival: recovery ≥70 band, last-week compare bars (§11), milestone dots, ▲ deltas.
- **Purple (10%)** stays SIA-only. The **single sanctioned purple touchpoint on the data layer is the dashed-purple SIA projection** on the activity trend (§11 forecast — on-brand, *not* a violation); plus the existing SIA-note dot. No purple is added anywhere else.
- **Fitness-red `#EF4444`** is **identity only**: header accent line, RPG badge, domain tag chip, heatmap intensity (this domain's own consistency), and the <40 recovery danger band. **Never** a CTA, eyebrow, or generic data series.
- **Glow** uses the calibrated size-stepped scale: 96px hero = 32px `--glow-orange`; 48px gauges = `--glow-orange-md` ~20px; bars/sparklines/KPI = none. Warm depth, not neon.
- **Accessibility:** text/`aria` equivalent on every chart; **visible status glyphs** (✓ / ~ / !) on every WHOOP band — never colour alone (fixes today's `aria-hidden` dots); WCAG 1.4.11 ≥3:1 on gauge arcs, bar fills, the Living-Line stroke, milestone dots, filled/unfilled boundaries (white/5 grid is decorative-only); ≥44×44pt targets; reduced-motion → final state with the Living-Line static form preserved.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint the depth tokens first (everything depends on them).
2. **R2 GaugeRing** — the hero + the app-wide ring upgrade; biggest perceived-quality jump and reused by [58]/[63]/[26]/[19].
3. **R1 KPIStatTile** — the template's headline row (then inherited by all Domain-Dashboard A screens).
4. **R3 BarChart** — wire up the unused bar chart with the honest compare law.
5. **R4 TrendChart** — the Living-Line signature (wire up the unused line chart).
6. **R5 CalendarHeatmap + R6 mission depth/sparkline** — ambient consistency + the depth carry-over.

Each is independently shippable and verifiable. Because this is the canonical template, every primitive landed here is reused by the nine sibling dashboards — the highest-leverage place in the app to get depth right once.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/domains/fitness`, screenshot before/after; verify the recovery gauge has an **arc-following gradient + inset track + 32px glow + ticks**, the WHOOP bands carry a **visible glyph** (not a colour-only dot), the weekly bars share **one zero-based scale**, the activity trend **draws itself** (not fades) as a curved Living Line with a **dashed-purple** projection, and the heatmap reuses the deployed component.
- Confirm cold-start (WHOOP not connected → ghosted dashed arcs, KPI `—` deltas, "calibrating" trend, "streak starts today" heatmap), partial-sync, loading (morphing skeletons), and error (per-series) states render per spec — **never** a degenerate 0% ring or a single-dot trend.
- `npm run check` — **`verify:brand` must stay green** (no fitness-red on data ink beyond the heatmap/danger-band; the only purple is the sanctioned projection).
