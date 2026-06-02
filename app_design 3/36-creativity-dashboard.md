# Screen Design: Creativity Dashboard

**Screen**: 36 of 73
**File**: 36-creativity-dashboard.md
**Register**: Product Mode
**Primary action**: log creative session
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Creativity). Entry from Explore [18] grid card or SIA deep-link [09]. Exit via back button to Explore, or forward to Goal Detail [14], SIA Chat [09].

---

## Purpose

This screen is the user's creative practice hub — tracking projects, logging sessions, capturing inspiration, and visualizing creative growth over time. It answers "what am I creating and how is my creative practice evolving?" SIA acts as a creative coach: noticing patterns in when the user does their best work, offering inspiration prompts, and connecting creative output to wellbeing across other domains. This screen uses the Domain Dashboard Template established by Screen 35.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with amber accent — immediate domain identification
2. SIA coaching note — personalized creative insight
3. Active creative projects — current work with milestone progress
4. SIA inspiration prompt — generative creative suggestion
5. Creative practice log — this week's heatmap showing session frequency and duration
6. Active goals — progress rings for creativity-related goals
7. Streak tracker — creative practice consistency
8. Portfolio timeline — visual progression of creative milestones over time
9. Recent activity log — session history

**User flow**:
- **Arrives from**: Explore [18] via "Creativity" module card (stack push), or SIA Chat [09] via deep-link when SIA references a creative insight
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: Goal Detail [14] via goal ring tap (stack push), SIA Chat [09] via coaching note tap (tab switch), Journal [37] via inspiration prompt "reflect on this" secondary chip (stack push with prompt pre-loaded)

---

## Layout

**Scroll behavior**: ScrollView (content ~1000-1200pt, always scrollable)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤ ← STICKY
│  ← [back]     "Creativity"    [...] │  ← Domain Header
│  ════════════════════════════════   │  ← 3pt amber accent line
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ ● SIA: "Three creative      │   │  ← SIA Coaching Note
│  │   sessions this week. Your   │   │     purple dot (●)
│  │   best work happens in the   │   │
│  │   morning."                  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ACTIVE PROJECTS                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  Short film script           │   │  ← Project rows
│  │  ▸ Recording demo tracks     │   │     with milestone
│  │  ▓▓▓▓▓▓▓░░░░░░░░  45%      │   │     + amber progress
│  │─────────────────────────────│   │
│  │  Photography portfolio       │   │
│  │  ▸ Editing final selections  │   │
│  │  ▓▓▓▓▓▓▓▓▓▓▓░░░  72%      │   │
│  │  see all →                   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐   │
│  │  ✦ "Try creating something  │   │  ← SIA Inspiration
│  │    using only materials      │   │     Prompt Card
│  │    within arm's reach."     │   │     (subtle amber
│  │         [start creating]    │   │      gradient top)
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘   │
│                                     │  ← 24pt gap
│  THIS WEEK                          │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  [░][▓][▓][░][▓][░][ ]     │   │  ← Practice Heatmap
│  │   M  T  W  T  F  S  S      │   │     (amber graduated)
│  │  4.5 hrs total  ↑ 20%      │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ACTIVE GOALS                       │  ← Eyebrow
│  ┌──────┐ ┌──────┐ ┌──────┐ →     │  ← Horizontal scroll
│  │ ◯55% │ │ ◯80% │ │ ◯30% │       │     Progress rings
│  │Film  │ │Photo │ │Write │       │     (amber fill)
│  └──────┘ └──────┘ └──────┘       │
│                                     │  ← 24pt gap
│  CONSISTENCY                        │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  🔥 8-day streak   best: 21│   │  ← Streak Tracker
│  │  [●][●][○][●][●][●][◐]    │   │     7-day dots
│  │   M  T  W  T  F  S  S     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  CREATIVE JOURNEY                   │  ← Eyebrow
│  ← ──●──────●──────●──────●── →   │  ← Portfolio Timeline
│     Jan    Feb    Apr    May       │     (horizontal scroll)
│   "first  "demo  "port- "short    │     amber connecting
│    draft"  rec'd"  folio" film"    │     line with dots
│                                     │  ← 24pt gap
│  RECENT ACTIVITY                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  today · 90 min writing     │   │  ← Activity Log
│  │  yesterday · 45 min sketch  │   │
│  │  May 18 · 120 min recording │   │
│  └─────────────────────────────┘   │
│                                     │
│                       ┌────────────┐│
│                       │+ log session││ ← FAB (orange pill)
│                       └────────────┘│
│                                     │  ← 48pt bottom breathing
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** — 88pt (identical to Screen 35, amber accent)
   - Purpose: Domain identification, back navigation
   - Content: "Creativity", 3pt amber (#F59E0B) accent line

2. **SIA Coaching Note Card** — ~100pt
   - Purpose: Creative practice insight from SIA
   - Content: Purple dot + SIA observation about creative patterns

3. **Active Projects Card** — ~160pt
   - Purpose: Show current creative work with milestone tracking
   - Content: Project name, current milestone, amber progress bar

4. **SIA Inspiration Prompt Card** — ~100pt
   - Purpose: Generative creative suggestion from SIA
   - Content: Creative prompt text + "start creating" action chip

5. **Practice Heatmap Card** — ~100pt
   - Purpose: Visualize this week's creative session frequency and duration
   - Content: 7-day graduated heatmap + total hours + trend comparison

6. **Active Goals Section** — ~140pt
   - Purpose: Creativity-related goal progress
   - Content: Horizontal scroll of amber progress rings

7. **Streak Tracker Card** — ~100pt
   - Purpose: Creative practice consistency
   - Content: Streak count + 7-day dot row (amber fill)

8. **Portfolio Timeline** — ~100pt
   - Purpose: Visual history of creative milestones over time
   - Content: Horizontal scrollable timeline with milestone markers

9. **Activity Log Card** — ~160pt
   - Purpose: Recent creative session history
   - Content: 3-5 rows with date, description, XP

10. **Floating Action Button** — 48pt (fixed)
    - Purpose: Log a creative session
    - Content: Plus icon + "log session"

---

## Components

### Domain Header (STICKY)
- **Purpose**: Identifies Creativity domain
- **Data source**: Static
- **Visual treatment**: Identical to Screen 35 Domain Header. Only differences: domain name is "Creativity", accent line color is amber (#F59E0B at 80%), large title dot is amber.
- **Size**: Full-width x 88pt (expanded)

### SIA Coaching Note Card
- **Purpose**: Creative practice insight
- **Data source**: AI-generated
- **Visual treatment**: Identical to Screen 35 SIA Coaching Note Card component
- **Example copy**: "Three creative sessions this week — your most productive creative week in a month. The pattern shows you do your best work in the morning."
- **Gestures**: Tap navigates to SIA Chat [09]
- **Size**: Full-width minus 32pt x auto-height

### Active Projects Card
- **Purpose**: Shows current creative work with milestone progress
- **Data source**: API — user's creative projects
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above: "ACTIVE PROJECTS" — standard eyebrow treatment
  - Each project row:
    - Project name: 16pt Sora Semibold, white
    - Current milestone: 13pt Sora Regular, white at 50%, preceded by "▸" indicator, 4pt below name
    - Progress bar: Full-width inside card, 6pt tall, --r-xs corners. Track: --color-alpha-white-08 over a --track-inset recess. Fill: brand-orange (#FF5E00) — progress data ink, green #34A853 at 100% (creativity-amber is identity only, never the progress fill; matches the orange-gauge rule on Fitness [26] / Learning [35]). Percentage right-aligned: 13pt Regular, white at 70%. 8pt below milestone.
    - Due date (if set): 12pt Sora Regular, white at 30%, right-aligned on name row
  - Rows separated by 1pt white at 5%, 16pt padding between sections
  - Max 3 visible. "see all" link: orange, center-aligned.
- **Variants**: Populated (1-10+ projects), Empty ("start your first creative project" + action chip)
- **Gestures**: Tap project row for detail (expand inline or push)
- **Size**: Full-width minus 32pt x ~160pt

### SIA Inspiration Prompt Card
- **Purpose**: Generative creative suggestion — distinct from the coaching note (which is observational)
- **Data source**: AI-generated, refreshed daily or on pull-to-refresh
- **Visual treatment**: ink-brown-800 card with subtle amber gradient at top edge — amber (#F59E0B) at 5% opacity, 48pt tall radial gradient from top-center, fading to transparent. 20pt radius. 24pt padding. This gradient is the one exception where domain color can bleed into a card background, extremely subtly.
- **Content**:
  - Small SIA indicator: "✦" glyph in purple (#7F24FF), 12pt, inline-left. This is the second purple element on the screen (the coaching note dot is the first). Combined, still within the 10% rule — two tiny indicators.
  - Prompt text: 16pt Sora Regular, white at 85%. Example: "Try creating something using only materials within arm's reach right now."
  - "start creating" chip: Amber bg at 15% opacity, amber text (#F59E0B), 13pt Sora Semibold, --r-pill, 32pt height, 16pt horizontal padding. 12pt below text.
  - "reflect on this" secondary chip: 8pt right of "start creating". ink-brown-800 bg, 1pt white 10% border, 13pt Sora Semibold, white at 60%, --r-pill, 32pt height. Tapping navigates to Journal [37] with this creative prompt pre-loaded as the journaling prompt.
- **Variants**: With prompt (default), Dismissed (user swiped away, hidden for the day)
- **Gestures**: Tap "start creating" opens session logging modal pre-tagged with the prompt context. Tap "reflect on this" navigates to Journal [37] with prompt. Swipe right to dismiss for the day.
- **Size**: Full-width minus 32pt x ~100pt

### Practice Heatmap Card
- **Purpose**: Visualize weekly creative practice frequency and intensity
- **Data source**: API — aggregated session data for the current week
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow above: "THIS WEEK" — standard treatment
  - 7 cells (Mon–Sun) in a row, each:
    - Size: 32pt square, --r-xs (6pt) corners
    - No session: white at 5% fill
    - Short (<30 min): amber at 30% opacity
    - Medium (30-60 min): amber at 60% opacity
    - Long (60+ min): amber at 100% opacity
    - Gap between cells: fills width evenly
    - Day label below: 11pt Sora Regular, white at 30% (M, T, W, T, F, S, S)
  - Below heatmap (16pt gap):
    - Left: Total hours (16pt Sora Semibold, white) — "4.5 hrs total"
    - Right: Trend comparison surfaced as a KPIStatTile delta (per Visualization S36-V01) — a **visible ▲/▼ arrow glyph + signed value** over a disclosed window ("vs last week"): Up = ▲ green (#34A853) "20%"; Same = — white at 50%; Down = ▼ muted white at 40% "10%" + a constructive sub-label ("a lighter week"). **Never orange/red on a down delta** (orange is reserved for CTAs/links; a ▼ is neutral, non-shaming).
- **Variants**: Active week, Empty week (all cells white 5%, "no sessions yet this week" below)
- **Gestures**: Tap cell to see that day's session detail (lightweight tooltip)
- **Size**: Full-width minus 32pt x ~100pt

### Active Goals Section
- **Purpose**: Creativity-related goal progress
- **Data source**: API — goals filtered by Creativity domain
- **Visual treatment**: Identical to Screen 35 Active Goals Section, but the progress rings are the kit `GaugeRing` (VK-002) at 48px **domain (creativity) mode** — arc-following amber gradient (conic-mask, not a flat SVG linearGradient), `--glow-orange-md` (~20px, size-md), `--track-inset` beveled track under the `--color-alpha-white-10` track, round cap, center value `text-h2` count-up — **not** a bespoke flat 2-tone circle. One ring primitive (GaugeRing) is used for both Active Missions and Active Goals so they read as one instrument family (see Visualization S36-V03). Amber is **domain identity** on the arc, never an alarm; green appears only at 100%/arrival.
- **Size**: Full-width x ~140pt

### Streak Tracker Card
- **Purpose**: Creative practice consistency
- **Data source**: API — daily session log
- **Visual treatment**: Identical to Screen 35 Streak Tracker Card. Completed dots use amber (#F59E0B) instead of cyan. Today-incomplete dot uses amber dashed border.
- **Size**: Full-width minus 32pt x ~100pt

### Portfolio Timeline
- **Purpose**: Visual history of creative milestones showing growth over time
- **Data source**: API — user's creative milestones and project completions
- **Visual treatment**: No enclosing card — sits directly on ink-900 background
- **Content**:
  - Eyebrow: "CREATIVE JOURNEY" — standard treatment
  - Horizontal ScrollView, 16pt content insets
  - Connecting line: a **Living Line** (VK-016) — one continuous, curved (monotone), round-capped SVG `path` that **draws itself** left→right via `stroke-draw` (`--dur-flow` 1200ms `--ease-flow`, never an opacity-fade), running `--grad-progress` orange (#FF5E00, early effort) → green (#34A853, recent arrival). It is a *journey*, not a static divider (see Visualization S36-V05). `--stroke-thin` 2px, horizontal, centered vertically in the timeline area
  - Milestone markers along the line:
    - Dot: green (#34A853) arrival dot, r=3px, sitting on the line; scales in as the stroke reaches it
    - Date below: 11pt Sora Regular, white at 30%
    - Label above: 13pt Sora Regular, white at 70%, max 2 lines, 64pt wide
    - Thumbnail (if available): 32x32pt, --r-xs corners, positioned above the label
    - Gap between milestones: 80pt center-to-center minimum
  - Empty ends fade out with a gradient mask (ink-900 at 0% to 100% over 24pt at each scroll edge)
- **Variants**: Populated (3+ milestones), Few (1-2 milestones, centered, no scroll), Empty ("your creative milestones will appear here as you complete projects")
- **Gestures**: Horizontal scroll. Tap milestone for detail (expand or navigate).
- **Size**: Full-width x ~100pt

### Activity Log Card
- **Purpose**: Recent creative session history
- **Data source**: API — creative activity entries
- **Visual treatment**: Identical to Screen 35 Activity Log Card
- **Example rows**: "today · 90 min writing", "yesterday · 45 min sketching", "May 18 · 120 min recording"
- **Size**: Full-width minus 32pt x ~160pt

### Floating Action Button
- **Purpose**: Log a creative session
- **Visual treatment**: Identical to Screen 35 FAB. Label: "log session"
- **Size**: Auto-width x 48pt

---

## Visualization

> Source: embedded section (Batch 4 — no companion file). Audited in `viz-audit/` — Domain-Dashboard template **A**, findings `S36-V01..V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant** (creativity-amber `#F59E0B` is the domain **identity** ink only — heatmap intensity, project/goal fills, timeline, streak dots — never displacing orange on CTAs/links). Benchmark = **Gentler Streak + portfolio/habit apps** (consistency clouds, gentle streaks, portfolio progression) rendered **the Balencia way** (Living Line + warm glow, non-shaming on creative dry spells), not a clone. **Current grade C (68) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric. The screen already deploys a real `CalendarHeatmap` — the single best thing on it — but opens on text with **no viz hero**, renders active missions as a **bespoke flat 2-tone `CreativityProgressCircle`** where `GaugeRing` exists, draws the portfolio timeline as a **static amber hairline** that does not draw itself, and surfaces the practice trend as **colour-only "up 20%" text**. The residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

This is a Domain-Dashboard (template A). It already carries a `CalendarHeatmap` (practice week) — this section **verifies it and brings it to depth** (keeps amber-as-domain-identity, adds a visible legend + honest no-data step), then upgrades *how the rest of the data reads*: a **KPI strip** (this-week practice headlines with honest deltas), a **practice consistency `CalendarHeatmap` hero** promoted from the one-row week to a multi-week grid as the screen's focal viz, a **`GaugeRing`** active-missions row (retiring the bespoke circle), a **Living-Line `TrendChart`** for session-time trajectory, and the **portfolio timeline re-expressed as a Living Line where temporal**. Mints **no new primitive** — it retires kit backlog (`KPIStatTile`, `CalendarHeatmap` depth, `GaugeRing`, `TrendChart` / `VK-016` Living Line, `Sparkline`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| This-week practice: sessions (3) · hours (4.5) · vs-last-week (↑20%) | text "4.5 hrs total" + colour-only "up 20%" | **KPI strip** — number + uppercase label + honest WoW delta arrow over a fixed/disclosed window | `KPIStatTile` ×3 (`VK-008`) |
| Practice consistency (session frequency × duration) | **`CalendarHeatmap`, one-row week** (amber-graduated, 5-step) | **promote to the viz hero** — multi-week `CalendarHeatmap` grid (amber-as-domain identity, 5-step intensity, **visible legend** + honest no-data step), one-row week kept above it as the at-a-glance "this week" strip | `CalendarHeatmap` (deployed — verify + depth) |
| Active missions (0.55 / 0.80 / 0.30) | **bespoke flat 2-tone `CreativityProgressCircle`** (64px, no gradient/glow/inset) | **`GaugeRing` row** (48px, arc-gradient amber-domain, size-md glow, inset track, count-up) — retires the one-off | `GaugeRing` (`VK-002`) |
| Active goal rings (Film 55 / Photo 80 / Write 30) *(spec "ACTIVE GOALS")* | amber progress rings (same bespoke circle) | same `GaugeRing` language as missions (one ring primitive across the screen) | `GaugeRing` (`VK-002`) |
| Session-time / practice trend over weeks + SIA projection | not shown (only "up 20%") | **Living-Line `TrendChart`** — solid orange actual → dashed-**purple** SIA forecast, green milestone dots on best weeks | `TrendChart` (`VK-006` / `VK-016`) |
| Portfolio timeline (Jan → May milestones — temporal) | **static amber hairline** (`bg-domain-creativity/30`) + amber dots; does **not** draw | **Living Line where temporal** — one continuous curved round-capped amber→green stroke that **draws itself** L→R, milestone dots = green arrival dots, thumbnails/labels anchored to the line | `TrendChart`/Living Line (`VK-016`) as a milestone spine |
| Project milestone progress (0.45 / 0.72) | flat 2-tone `ProgressBar` (h-1.5) | depth pass — `--track-inset` recess + `--color-alpha-white-08` track + amber fill, count-up width (kept as bars; **not** promoted to rings — would fight the hero) | `MacroBar`/`ProgressBar` (`VK-008`) |
| Practice micro-trajectory (high-motivation tier) | not shown | optional 7-pt `Sparkline` (tiny Living Line) under the lead project | `Sparkline` (`VK-001`) |
| Streak (8-day · best 21 · 7-day dot row) | 7 amber dots + ✓ glyph on complete, dashed today | **kept as-is** (already non-shaming + a *visible* ✓ sign, not colour-alone) — complements the consistency hero (dots = this-week status; heatmap = long-run) | — (deliberately iconographic) |
| SIA coaching note · inspiration prompt · project names · milestone text · activity log · streak count | text | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the SIA-coaching note + inspiration prompt stay the screen's *editorial/content* focus; the **practice-consistency `CalendarHeatmap` is the one viz hero** (a creativity dashboard's truest premium signal is *showing up*, not a score — and it's the most non-shaming hero a creative practice can have); KPI strip + mission gauges + the session trend are clearly secondary; the portfolio Living Line is ambient. Six resolved data slots, one focal — not a wall of equal charts.

### 1 · Practice-this-week KPI strip — `S36-V01` → `KPIStatTile` ×3

Replace the single "4.5 hrs total · up 20%" text line under the heatmap with three `KPIStatTile`s: uppercase label (`white/40`, +0.12em) · number `text-h2` · **delta arrow** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) over a **fixed, disclosed window** ("vs last week"). Tiles: **Sessions** (3), **Hours** (4.5), **Streak** (8d). Source: `creativityDashboard.practiceWeek` (`total`, `trend`) + a new `practiceWeek.lastWeek` block (sessions/hours) added to `mock.ts` so the delta is real, not invented.
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium — depth lives in the heatmap hero).
- **Honest delta (fixes a live defect):** the current `'up 20%'` is amber text with **no arrow glyph** — direction by colour/word alone. The `KPIStatTile` carries a **visible ▲/▼ arrow + the signed value**, and the window is disclosed ("vs last week"), never cherry-picked.
- **Non-shaming:** a ▼ delta is a neutral muted arrow + a constructive sub-label ("fewer sessions — a lighter week"), **never** red or "you fell behind." A dry spell is framed as rest, not failure (Gentler-Streak thesis).
- **States:** Day-1 → all three read `0` / `—` delta (no prior week to compare — honest, not a fabricated ▲); loading → label + skeleton number bar.

### 2 · Practice-consistency hero — `S36-V02` → `CalendarHeatmap` (verify deployed + promote to hero)

The screen's **one viz hero.** The deployed `CalendarHeatmap` (`tone="creativity"`, `cellSize=32`, 5-step `--color-alpha-white-05` → full creativity-amber `#F59E0B`, today = dashed border, tap = `scale-110`) is **verified correct and kept** — amber here is the one sanctioned place domain colour rides data ink, because it encodes *this domain's* consistency (identity), not an arbitrary palette. The upgrade: **promote it from the one-row week to a multi-week grid** (trailing ~6 weeks, rows = weeks) so consistency-over-time is the focal gestalt, with the existing **one-row "THIS WEEK" strip kept directly above** it (the two are complementary — week strip = current status at a glance, grid = long-run rhythm; not redundant).
- **Depth pass (token-backed):** card surface `ink-brown-800` + top-edge highlight + a faint radial backplate behind the grid; cells keep `--r-xs` corners + 2px gap (carved separation revealing `ink-brown-800`); **no per-cell glow** (a heatmap is ambient depth, not a glowing instrument — glow would read as neon). The hero's *weight* comes from grid scale + the backplate, not from glow.
- **Visible legend (fixes a live a11y gap):** add a 5-step intensity **legend with a visible label** ("less → more practice") beneath the grid — today the steps are decodable only by eye + per-cell `aria-label`; the legend makes the encoding perceivable without colour discrimination or a screen reader.
- **Honest no-data ≠ zero:** an un-logged future/no-session day uses the existing `'future'`/`intensity 0` distinction — a genuine open day reads as the `--color-alpha-white-05` base step (an "open day"), a not-yet-reached day ghosts at `bg-alpha-white-03`; the two are visibly distinct and **neither is a guilt cell**.
- **Micro-interaction:** tap a cell → lightweight tooltip with that day's session detail (minutes + project), the existing per-cell intent.
- **Non-shaming:** empty cells read as "open days," **never** a wall-of-absence guilt grid; no loss-aversion countdown anywhere on the consistency hero.
- **States:** Day-1 → empty grid with "your practice rhythm builds here — create something today" (today cell dashed), **not** a wall of amber-absence; loading → cells shimmer in place then settle; partial → un-synced days ghosted (`future` step), distinct from real open days.
- **Data:** `creativityDashboard.practiceWeek.cells` (week strip) + a new `creativityDashboard.practiceHistory` (date → sessionLoad, ~6 weeks) in `mock.ts` for the grid.

### 3 · Active missions & goals — `S36-V03` → `GaugeRing` ×N (retire the bespoke circle)

Replace the bespoke flat **`CreativityProgressCircle`** (64px, 2-tone, round cap, **no gradient / no glow / no inset** — a depth-flat one-off where a kit primitive exists) on both the **Active Missions** row and the **Active Goals** rings with **`GaugeRing`**: 48px (card size), **arc-following gradient stroke** (**brand-orange `--grad-orange`** via conic-mask — *not* a flat SVG `linearGradient`; orange is the progress data ink, matching the recovery gauge on Fitness [26] and the active-item gauge on Learning [35]; **creativity-amber is identity only, never the arc**), green `#34A853` at 100% (arrival), `--glow-orange-md` (~20px **(mint)**, size-md — *not* the 32px hero glow, which would swamp a 48px ring), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, round cap, center value `text-h2` count-up `--dur-slow` 520ms `--ease-flow`. One ring primitive across the whole screen (missions + goals read as one instrument family).
- **Why a gauge, the Balencia way:** the same bounded-progress score rendered as our warm-glow `GaugeRing` so every domain dashboard's rings read as one system — not a per-screen hand-rolled circle.
- **Depth honesty:** the gauge arc is **orange** progress data ink (creativity-amber stays identity, never the arc) — a low mission (0.30) is **never** recoloured to a warning or to amber-as-alarm; green appears only at 100%/arrival.
- **Micro-interaction:** tap a ring → Goal Detail [14] (carries the existing `/tabs/goals/detail` route).
- **States:** loading → ghosted dashed arc + skeleton label; no missions → "Start a creative mission" affordance (no degenerate empty ring); a fresh 0% mission renders as a **ghosted min-foot**, not a filled zero.
- **Data:** `creativityDashboard.activeMissions` (0.55 / 0.80 / 0.30) + the Active-Goals set.

### 4 · Session-time trend (Living Line) — `S36-V04` → `TrendChart` (`VK-016`)

Surface the practice trajectory the screen only hints at as "up 20%": a full **Living Line** of weekly creative minutes over the last ~6 weeks — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on best-practice weeks, a `--grad-orange` **(mint)** area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *not* a 60/30/10 violation) continuing the same path to next week's suggested target. Curved monotone, `--stroke-thin` 2px (actual) / 2px dashed (projection). Sits below the consistency hero (the heatmap = *whether*, the line = *how much*).
- **Why the line, not a bar:** "every chart is the line" (§8) — the Living Line is the device portfolio/habit apps structurally don't have; it makes the trend unmistakably Balencia and reuses the exact spine of the home-screen sparklines.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; projection draws after the actual line; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across weeks; W/M/Y selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`).
- **Non-shaming:** a dip in the line is framed in SIA's accompanying note as a creative rest, never a verdict; the projection is an invitation, not a quota.
- **States:** cold-start (<2 weeks) → "calibrating — building your creative rhythm" with a faint flat baseline, **never** a single dot; projection hidden until SIA has enough data; reduced-motion → completed stroke at rest + green end dot + static dashed-purple tail.
- **Data:** new `creativityDashboard.sessionTrend` (6 weekly points + `projection`) in `mock.ts`.

### 5 · Portfolio timeline as a Living Line — `S36-V05` → Living Line (`VK-016`) milestone spine

The portfolio timeline is **temporal** (Jan → Feb → Apr → May), so per brand law it becomes a **Living Line where temporal** — retiring the current static `bg-domain-creativity/30` hairline (which does **not** draw and reads as a divider, not a journey). One continuous, curved, round-capped stroke runs **left→right along the milestone sequence**, orange (early effort) → green (recent arrival) via `--grad-progress` **(mint)**; each milestone = a **green arrival dot** (r=3px) on the line with its thumbnail (32×32, `--r-xs`) + label anchored above and date below (existing anatomy). Horizontal scroll preserved; edge gradient masks (`ink-900` 0→100% over 24px) preserved.
- **Why a Living Line, not a hairline:** a creative journey *is* a path-of-progress — the single clearest place to express §8's "the chart is the line." It makes the timeline read as growth, not a static rule, and ties it visually to the session-trend line (one motif family).
- **Motion:** the spine **draws itself** L→R (`stroke-draw` `--dur-flow` 1200ms `--ease-flow`); each milestone dot scales in *as the line reaches it* (sequenced, not a simultaneous fade). One line motif per surface — this and the session trend are distinct surfaces (timeline = milestones, trend = volume), so each may carry its own line.
- **States:** few (1–2 milestones) → centered, no scroll, line drawn between the points it has; empty → "your creative milestones appear here as you finish projects" (the existing copy), no orphan line; reduced-motion → completed stroke at rest with all milestone dots present.
- **Data:** `creativityDashboard.timeline` (Jan/Feb/Apr/May milestones).

### 6 · Project depth + optional sparkline — `S36-V06` → `MacroBar`/`ProgressBar` + `Sparkline`

The two active-project bars (0.45, 0.72) keep their **flat horizontal-bar form** (deliberately *not* promoted to rings — rings here would create competing foci against the mission gauges and the heatmap hero) but adopt the depth pass: `--color-alpha-white-08` track over a `--track-inset` **(mint)** recess, **brand-orange `#FF5E00` fill (progress data ink; green at 100%)** — creativity-amber is identity only, never the progress fill — width = progress, count-up width 0→% on mount, `--r-xs` corners. **High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, green end dot on a milestone week, **no glow** — per CONSISTENCY) under the lead project showing recent session trajectory.
- **Non-shaming:** progress framed as momentum; a low bar reads as "room to create," never a deficit.
- **States:** no projects → the existing "start your first creative project" empty variant + action chip; loading → skeleton bar.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the practice-consistency `CalendarHeatmap` grid staggers its cells in (40ms left-to-right, `--dur-fast`/`--ease-out-soft`) and settles, while the one-row "THIS WEEK" strip above it fills first as the at-a-glance anchor — **then** the KPI strip counts up (280ms `--ease-out-soft`) → **then** the mission/goal `GaugeRing`s fill (`ring-animate`, 520ms `--ease-flow`, with their center count-ups) → **then** the session-trend **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last → **then** the portfolio **Living Line draws itself** L→R with milestone dots scaling in as the stroke reaches each. One line motif per surface (session-trend and portfolio-timeline are separate surfaces). Below-fold visuals (trend, timeline, lower heatmap rows) animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; both Living Lines render their static form (completed stroke + green end/milestone dots + static dashed-purple projection tail), the heatmap at final intensity, the gauges at filled arcs.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — consistency heatmap empty with "your practice rhythm builds here" (today cell dashed, **never** a wall of amber-absence), KPI deltas read `—` (no prior week), session trend in "calibrating" with a faint baseline (no single dot), portfolio Living Line hidden until the first milestone, mission gauges ghosted-dashed behind "start a creative mission"; **loading** — depth-preserving skeletons that *morph* into drawn data (heatmap cells shimmer then settle, gauge arcs ghosted, the Living Lines' baselines drawn then stroked — never blank discs); **partial** — un-synced practice days ghosted (`future` step) distinct from real open days, a project bar at true 0% distinct from a skeleton; **error** — chart-specific honesty per the Error Handling table (heatmap "no data available" with retry, projects/timeline independent "could not load" + visible "retry"), never a screen-wide blank.
- **60/30/10:** **orange dominates** data ink and all actions — the FAB, "see all"/links, KPI delta accents, the session-trend Living-Line effort segment, project/streak emphasis; **green** = in-range/arrival only (milestone dots, ▲ deltas, gauge 100%, XP); **purple stays SIA-only** — the **single sanctioned chart purple is the dashed-purple SIA projection** on the session trend (§11 forecast, correct *not* a violation), alongside the two existing tiny SIA indicators (coaching-note dot + inspiration "✦"); **creativity-amber `#F59E0B`** is confined to **identity + own-consistency** — header accent line + title dot, the `CalendarHeatmap` intensity-of-*this-domain* (the sanctioned domain-on-own-consistency data use) + the complementary streak-strip dots (glyph-paired ✓), the inspiration card's 5%-bleed gradient, and the "start creating" chip — **never** on the mission/goal `GaugeRing` arcs, project progress bars, the portfolio timeline, a CTA, eyebrow, generic data series, or as an alarm colour. **Mission/goal gauges, project bars, and the portfolio timeline are ORANGE progress data ink** (green at 100%/arrival), matching the Fitness [26] / Learning [35] domain-dashboard rule. Glow uses the size-stepped scale (48px gauges = md ~20px, heatmap/bars/sparklines = none) — warm depth, not neon.
- **Non-shaming (ethical gate — the screen's benchmark thesis):** this is a *creative practice* dashboard, where dry spells are normal and creative shame is the failure mode. The consistency hero frames gaps as "open days," not a guilt grid; the streak never weaponises a broken streak (a missed day = a neutral `missed` dot, not a loss-aversion countdown); KPI ▼ deltas are muted + constructively sub-labelled ("a lighter week"), never red; the session-trend dip is narrated by SIA as rest; no metric is rendered as a verdict on creative worth.
- **Accessibility:** every gauge / bar / line / heatmap carries a text/`aria-label` equivalent conveying the same value (heatmap per-cell labels already present; add the grid-level "This week's creative practice" + the new **visible legend**); the heatmap trend direction now uses a **visible ▲/▼ arrow** (in the KPI tile) **plus** the signed value — never colour/word alone (fixes the current colour-only "up 20%"); streak completion uses a **visible ✓ glyph** (already present) plus the amber fill; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, the Living-Line strokes, milestone dots, heatmap cell fills at intensity ≥1, and the filled/unfilled boundary all meet ≥3:1 vs background (the `--color-alpha-white-05`/`-03` base/future steps are decorative-only no-data tones); interactive chart targets ≥ 44×44pt (heatmap cells, gauges, milestones, KPI tiles); `prefers-reduced-motion` renders all at final state with both Living Lines' static signature forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Behance + Things (creative output) — *stays Balencia via the practice-consistency CalendarHeatmap hero + Living-Line portfolio spine + non-shaming creative rest framing.*
**Pre-grade:** A− (84) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the viz hero (CalendarHeatmap + KPI strip + Living-Line session trend + Living-Line portfolio timeline) is locked and strong; the gap is (1) non-chart surfaces lack layered depth (`CK-P1` edge-highlight absent); (2) two focal claims compete (the SIA coaching note vs the heatmap hero); (3) edge microcopy (loading states, empty copy, permission lines for SIA features) is partly unauthored; (4) the KPI trend delta is colour-only ("up 20%") with no visible arrow glyph; (5) the state-craft table exists in Components/Visualization but is not reconciled as designed layouts here; (6) type line-heights are ad-hoc pixels, tracking unspecified; (7) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **practice-consistency CalendarHeatmap grid** — the screen's single focal viz hero (a grid of ~6 weeks' amber-graduated cells, the only large ≥96px data-ink element above fold). The **SIA Coaching Note sits above it as a warm preamble, not a competing hero**: emotionally distinct (the lone purple dot) but visually quieter than the heatmap (no glow, body type, one-to-two lines, card-size not oversized). The one-row "THIS WEEK" strip directly above the heatmap grid serves as an at-a-glance anchor (the smallest viz unit on screen, deliberately secondary). The KPI tile row (sessions / hours / streak deltas) is clearly secondary by size and weight. The session-trend Living Line and portfolio Living Line sit below-fold (scroll-into-view, ambient). Everything else — SIA inspiration card, active goals, projects, streak, activity log — is deliberately textual/secondary. The squint test lands on the heatmap grid first, then the week strip, then the SIA note. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28pt (the canonical dashboard card radius per `_shared-patterns.md`) · 1px `--glass-border` white/6 · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent on all Creativity cards) · `--shadow-1`. The SIA Coaching Note and Inspiration Prompt cards add `--surface-backplate` (`CK-T02`, a faint warm radial backplate). The heatmap hero card receives both. Glow is size-calibrated per `CONSISTENCY.md §1`: **no glow on the heatmap cells, KPI tiles, or project bars** (they are inline <36px elements; glow would read neon). The mission/goal `GaugeRing`s (48px) receive `--glow-orange-md` (~20px /.40) per the viz spec. Tracks (heatmap cells, project progress bars) recess under `--track-inset` (`rgba(0,0,0,0.28)`). Extends the same depth language to the streak card, activity log card, and all secondary surfaces so no surface reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: domain header "Creativity" `--text-display-l` / `--leading-tight` / 700 weight; SIA coaching message, project names, streak count `--text-body` 16pt / `--leading-normal` 1.4; captions and meta (milestone, day label, trend copy, "see all") `--text-caption` 13pt / `--leading-normal`; eyebrows (ACTIVE PROJECTS, THIS WEEK, etc.) the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); stat figures (hours, days, XP, percentages) tabular-nums. Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the entire screen (the FAB label "log session" is one, the "see all" project link is the second; the inspiration chip "start creating" is amber-text identity, not orange accent — within bounds). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal`).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice, with special emphasis on non-shaming creative-rest framing:

- **SIA Coaching Note copy (given)** → *kept as-is*: "Three creative sessions this week. Your best work happens in the morning." (Specific, warm, framed as observation, not judgment.)
- **SIA Inspiration Prompt copy (given)** → *kept as-is*: "Try creating something using only materials within arm's reach right now." (Concrete, low-barrier, warm coach tone.)
- **KPI strip, trend delta** — *before:* "↑ 20%" (colour-only, no glyph) → *after (new):* **visible ▲ green glyph + signed "+20%"** + disclosed window "(vs last week)". Down delta: **visible ▼ muted white-40 glyph + "-10%"** + constructive sub-label "(a lighter week)" — never red, never shame-framing.
- **Practice heatmap legend (new)** — *before:* no visible legend → *after:* a 5-step intensity legend beneath the grid with label "less → more practice" (fixes a11y gap; makes the cell-intensity encoding perceivable without colour discrimination).
- **Heatmap empty-cell framing** — "open day" (for a day with no session yet), **not** "no session" or a guilt label. Future cells (not yet occurred) are visibly ghosted (`--color-alpha-white-03`), distinct from open-day cells (`--color-alpha-white-05`). Never a wall-of-absence guilt grid.
- **Active Projects, empty state (new)** — *before:* unwritten → *after:* "Start your first creative project" (warm, actionable, never "0 projects" + shame).
- **Active Goals, empty state (new)** — *before:* unwritten → *after:* "Set a creativity goal to track progress" (invitation, not deficit).
- **Streak, paused state (new)** — *before:* unwritten → *after:* "Your streak paused. Pick it back up today." (Non-shaming, constructive framing; the 7-dot row shows a `missed` dot, never weaponises the break.)
- **Cold-start / Day-1** — SIA note: "Welcome to your creativity space. Everyone has creative potential. What do you enjoy making?" (Warm, inclusive, no shame.) Heatmap shows empty grid with "your practice rhythm builds here — create something today" (encouragement, not a deficit). KPI deltas read `—` (no prior week; honest, not fabricated). Session trend shows calibrating baseline with "building your rhythm" copy (never a single dot or a blank).
- **Loading states (new)** — "Syncing your practice…" (warm, patient); skeleton cards morph into data (never a swap).
- **Portfolio timeline, empty state (new)** — "Your creative milestones appear here as you complete projects" (invitation-framed).
- **Permission/disabled rationale (new)** — if SIA features are gated: "SIA needs to read your creative data to offer insights — you can turn this on anytime."

No exclamation marks; the brand period used with intent (the SIA coaching note ends with a period, calm and observational); all SIA copy is specific to the user's creative data (a real pattern-spotted insight, never a generic horoscope); dry spells are framed as creative rest, growth pauses, or lightweight weeks — never failure, never shame.

### Motion choreography

Per `CK-P4` draw-first order, locked to `CONSISTENCY.md §3` timings:

(1) **hero draws first**: the practice-consistency CalendarHeatmap cells stage in, left-to-right (40ms stagger per row, `--dur-fast` 160ms each `--ease-out-soft`), settling as the heatmap anchor; the one-row "THIS WEEK" strip above fills first as the at-a-glance read. (2) **KPI strip counts up** (`--dur-base` 280ms `--ease-out-soft`, the three tiles staggered 40ms apart) — the **▲ arrow glyph is drawn inline**, not faded. (3) **mission/goal `GaugeRing`s fill** (ring-animate, `--dur-slow` 520ms `--ease-flow`, center count-up synced). (4) **session-trend Living Line draws itself** L→R (`stroke-draw` `--dur-flow` 1200ms `--ease-flow`) with green milestone dots scaling in as the stroke reaches each, dashed-purple projection drawing after; this animation is below-fold and triggers on scroll-into-view. (5) **portfolio Living Line draws** L→R (`stroke-draw` `--dur-flow` 1200ms), milestone dots scale in sequentially. (6) **below-fold surfaces** (streak, activity log, inspiration card below the fold) animate on scroll-into-view with the same stagger language. `prefers-reduced-motion` → all elements at final state instantly; both Living Lines' static forms (completed strokes + green arrival dots + static dashed-purple tail) preserved — no essential info lost.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | Heatmap grid empty, all cells `--color-alpha-white-05` base (open days, never guilt); today cell dashed border (indicates incomplete); KPI deltas `—` (no prior week, honest); session trend shows faint baseline "calibrating" with no single dot; mission gauges ghosted dashed behind "start a creative mission" affordance; portfolio Living Line hidden until first milestone | SIA note: "Welcome to your creativity space — what do you enjoy making?" Heatmap caption: "Your practice rhythm builds here — create something today." KPI: "—" (no delta until week 2). Projects: "Start your first creative project." Goals: "Set a creativity goal." Portfolio: hidden. | Heatmap never feels empty (structure always full, cells adapt). Gauges ghosted, not degenerate. No shame. |
| **Loading** | Heatmap cells shimmer in place then settle; KPI skeleton bars → animated count-up; gauge arcs ghosted, then filled (morph, not swap); session-trend baseline drawn, then stroked with data points; Living Lines' baseline paths drawn, then real stroke over it (a progressive reveal, not a blank-to-full jump) | "Syncing your practice…" (warm, patient, patient tone) | Skeletons preserve layout + depth; morphing animations. No full-screen spinner. Depth visible throughout. |
| **Empty / partial** | Un-synced projects ghosted (fewer rows); un-synced domains on gauges ghosted/dashed + visually distinct from a real low value; heatmap cells for unavailable periods are `--color-alpha-white-03` (future) vs `--color-alpha-white-05` (real open day) — no-data ≠ zero; session trend shows available weeks, missing weeks ghosted as faint dots. | "Can't load projects — try again later." (specific, not generic). "Building your rhythm" (for partial week data). Project: "Editing final selections" (when data exists, milestones shown). | No-data cells visibly distinct (ghosted ring, dashed track). Ghosted never silent. Orange data-ink only on real values. |
| **Error** | Session-trend shows cached data if available, else a faint baseline + error copy; portfolio Living Line hidden (complex data, safe to defer); heatmap shows cached week + error banner (small, top of scroll area); projects + goals + streak show last-known data if available, skeletons if not. | "Couldn't load your creative practice — pull to refresh." (specific, recovery named). "Showing your last sync" (if cached). All errors on-voice, never generic "error." | Calibrated `--color-error-red` only for genuine sync failure (red outline on affected zone if critical); glyph + word paired (alert icon + text, never colour-alone). Cached data retained. |
| **Offline** | All cards show cached data with a small network banner (top, "You're offline — showing cached practice") + dimmed pull-to-refresh affordance. Session trend and portfolio timeline visible if cached, else hidden with a reason. | "You're offline — showing your practice from [date]." (warm, honest, specific.) | Actions honestly dimmed (50% opacity, no haptic); cached data retained; banner brief, not alarmist. |

### Signature & anti-generic

Ownable moments: (1) the **practice-consistency CalendarHeatmap hero** — the single best thing on the screen (a gentle, non-shaming consistency tracker; the domain-amber intensity cells are the *one* sanctioned place domain colour rides data ink because it encodes *this domain's* consistency, not a generic progress metric); (2) the **two Living Lines** — the portfolio timeline draws itself as a path-of-progress (orange→green arrival, the brand continuous-stroke moment), and the session-trend line carries the Living-Line motif with dashed-purple SIA projection (the sanctioned forecast purple, correct not a 60/30/10 violation); (3) **non-shaming framing on every surface** — "creative rest," "open day," "lighter week," the constructive inspiration prompt, SIA insights specific to the user's data (never a horoscope). Anti-generic fix: avoid the creative-output hall of comparison (no leaderboard framing, no "you're X% behind"); avoid generic SIA copy ("keep it up" / "great work"); avoid a flat progress-bar wall (the project bars are deliberately kept as bars, not promoted to rings, so they stay secondary to the heatmap hero). The screen reads as a **coaching companion for creative practice**, not a metrics dashboard — the Balencia way.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Note |
| --- | --- | --- | --- |
| Heatmap cell (full intensity) | `--color-creativity-amber` `--color-stalled-amber` | 2.1:1 (amber on ink-brown-800) — *below 3:1, a Visualization-phase responsibility for the build program; mitigated by visible legend + per-cell `aria-label`* | Intensity encoding is **never** colour-alone (visible legend "less → more," per-cell labels) |
| Heatmap cell (medium intensity) | `--color-creativity-amber` 60% opacity | ≥3:1 (the mid-range cell is legible; the cell boundary + per-row structure + per-cell label compensate for the low-intensity cell contrast) | No-data cells visually distinct from real empty cells via ghosting (`--color-alpha-white-03` vs `-05`) |
| KPI tile label + value | `--color-alpha-white-40` / `--color-alpha-white-100` | ≥4.5:1 + ≥12:1 (label + value separated clearly) | Trend delta **never colour-alone** — visible ▲/▼ arrow + signed value always |
| Project progress bar fill | `--color-brand-orange` `--color-brand-orange` | 3.2:1 on `--track-inset` recess | Same orange data-ink as Fitness [26] / Learning [35]; amber is identity-only, never the fill |
| Goal/mission `GaugeRing` arc | `--color-brand-orange` → `--color-forest-green` | 3.2:1 (orange) / 3.8:1 (green) on `--track-inset` recess | Green at 100% arrival only; orange is data ink, amber never the arc |
| SIA coaching note dot | `--color-royal-purple` `--color-royal-purple` | 4.2:1 on `--color-ink-brown-800` | One of two purple indicators (the inspiration "✦" is the second); within the 10% rule |
| Inspiration "start creating" chip | `--color-creativity-amber` text on amber-15% bg | 3.8:1 (amber-saturated on amber-light) | Readable, warm, domain-identity chip — not a primary CTA (primary CTA is orange FAB) |
| Inspiration "reflect on this" chip | `--color-alpha-white-60` text on ink-brown-800 bg | ≥4.5:1 | Secondary action, muted but legible |
| FAB label + icon | `--color-alpha-white-100` on `--color-brand-orange` | ≥12:1 (white on orange) | Primary CTA, always orange, always high-contrast |
| Streak flame icon | `--color-brand-orange` | 3.2:1 (emphasis glyph, paired with count text + label) | Glyph + count + "day streak" label together (never glyph-alone) |
| Portfolio Living Line (orange segment) | `--color-brand-orange` | 3.2:1 on `--color-ink-900` | Drawn stroke, paired with milestone labels + dates (never stroke-colour-alone) |
| Portfolio milestone dots (green) | `--color-forest-green` | 3.8:1 on `--color-ink-900` | Arrival dots, r=3px, paired with labels + dates |

Status never colour-alone: heatmap intensity is never the only signal (visible legend "less → more," per-cell `aria-label`); trend delta ▲/▼ is always a visible glyph + signed value, never colour-only "up 20%"; streak completion uses a visible ✓ glyph (already present) + amber fill (paired); portfolio milestones are labeled + dated + paired with dots. All interactive elements carry `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset) uniform app-wide. Targets ≥44×44pt (heatmap cells 32×32pt + 6pt gap = 38×38pt in-cell, 44×44pt touch area with tap-margin; gauges 48px; "see all" link ≥44pt; all card rows ≥44pt tall). Reduced-motion: all data-viz elements render at final state instantly; Living Lines' static completed forms (orange+green stroke with milestone dots) preserved; heatmap cells at final intensity, gauges at filled arcs, no animation seen but no essential info lost.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #F59E0B at 80% | amber (domain) | Domain identification |
| Header title dot | #F59E0B | amber (domain) | 8pt dot |
| Project progress bar fill | #FF5E00 → green at 100% | brand-orange (--grad-progress) | Milestone progress — orange data ink (amber is identity only, never the fill) |
| Goal ring / mission GaugeRing arc | #FF5E00 → green at 100% | brand-orange (--grad-orange) | Goal/mission gauge arc — orange data ink (amber never the arc) |
| Streak completed dots | #F59E0B | amber (domain) | Consistency |
| Practice heatmap fills | #F59E0B at 30-100% | amber (domain) | Session intensity |
| Portfolio timeline line | orange→green | --grad-progress (#FF5E00→#34A853) | Living Line path-of-progress (VK-016) — not amber data ink |
| Portfolio timeline milestone dots | #34A853 | green (secondary) | Arrival dots, r=3px |
| Inspiration card gradient | #F59E0B at 5% | amber (domain) | Extremely subtle top bleed |
| "start creating" chip bg | #F59E0B at 15% | amber (domain) | Identification chip |
| "start creating" chip text | #F59E0B | amber (domain) | Chip label |
| SIA purple dot (coaching note) | #7F24FF | purple (accent) | 10% rule — element 1 |
| SIA glyph (inspiration card) | #7F24FF | purple (accent) | 10% rule — element 2 |
| FAB background | #FF5E00 | orange (primary) | CTA — always orange |
| Streak flame icon | #FF5E00 | orange (primary) | Streak emphasis |
| "see all" links | #FF5E00 | orange (primary) | Interactive links |
| XP earned text | #34A853 | green (secondary) | Reward |
| Trend delta ▲ (up) | #34A853 | green (secondary) | KPIStatTile up-delta — visible ▲ glyph + signed value |
| Trend delta ▼ (down) | white at 40% | --color-alpha-white-40 | KPIStatTile down-delta — neutral muted ▼ glyph + signed value, never orange/red (non-shaming) |
| Primary text | #FFFFFF | white | Titles, body |
| Secondary text | white at 70% | — | Descriptions |
| Tertiary text | white at 50% | — | Authors, milestone labels |
| Quaternary text | white at 40% | — | Eyebrows, day labels |

**60/30/10 verification**: Orange dominates data ink + all actions — FAB, "see all"/links, KPI delta accents, the session-trend and portfolio Living-Line effort segment, streak flame. Green = arrival/in-range only — XP, milestone dots, ▲ deltas, gauge 100%. Purple stays SIA-only — coaching-note dot + inspiration "✦" + the **sanctioned dashed-purple SIA projection** on the session trend (§11 forecast, correct not a violation). Domain amber is confined to **identity** — header accent + title dot, heatmap intensity-of-this-domain, mission/goal GaugeRing domain fills, project-bar fills, the inspiration card's 5%-bleed gradient, the "start creating" chip — **never** on a CTA, eyebrow, trend/journey data series, or as an alarm. Ratio holds.

---

## Interaction States

### Active Projects Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, transparent bg | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "start creating" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Amber 15% bg, amber text | — |
| Pressed | Amber 25% bg, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Practice Heatmap Cell
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Graduated amber fill | — |
| Pressed | Scale(1.15), subtle amber glow | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Portfolio Timeline Milestone
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Amber dot, white label | — |
| Pressed | Dot scale(1.3), label brightens to white 100% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

All other interactive elements (Domain Header, SIA Card, Goal Rings, Activity Log Rows, FAB) follow the identical state specifications from Screen 35.

### Loading States
All data cards follow the skeleton loading pattern from `_shared-patterns.md` — card outlines render at ink-brown-800 with animated shimmer gradients (1.2s loop) until data resolves. Charts render axes and gridlines first, then animate data in (300ms ease-out-soft). Domain header loads instantly (static content); stat cards and chart sections load independently — partial success shows resolved cards normally while pending cards continue shimmer.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh |
| Tap | SIA coaching note | Navigate to SIA Chat [09] |
| Tap | Project row | View project detail |
| Tap | "start creating" chip | Open session logging modal |
| Tap | "reflect on this" chip | Navigate to Journal [37] with prompt |
| Swipe right | Inspiration prompt card | Dismiss for the day |
| Tap | Goal progress ring | Navigate to Goal Detail [14] |
| Tap | Activity log row | View session detail |
| Tap | FAB | Open session logging modal |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Horizontal swipe | Active Goals, Portfolio Timeline | Scroll |
| Tap | Overflow menu | Open bottom sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in, 80ms stagger per section | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Large title collapse, center title fade-in | 280ms | ease-out-soft |
| Mission/goal GaugeRings | Enter viewport | Arc fills 0→target % (`ring-animate`) with center value count-up | 520ms | ease-flow |
| Streak dots | Enter viewport | Staggered scale-in, 60ms stagger | 160ms each | ease-out-soft |
| Heatmap cells | Enter viewport | Staggered opacity fade-in, 40ms stagger, left to right | 160ms each | ease-out-soft |
| Portfolio timeline (Living Line) | Enter viewport (scroll-into-view) | Living-Line spine draws itself left→right via `stroke-draw` (orange→green `--grad-progress`), green milestone dots scale in as the stroke reaches each — never an opacity-fade | 1200ms | ease-flow |
| Inspiration dismiss | Swipe right | Card translates right + opacity to 0, height collapses | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push — slides in from right
- **Exit**: Stack pop — slides out to right

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "Welcome to your creativity space. Everyone has creative potential — let's find yours. What do you enjoy making?"
- Active Projects: Empty variant — "start your first creative project" with action chip
- Inspiration Prompt: Extra prominent — SIA gives a low-barrier creative exercise: "Describe your morning in exactly 50 words. Go."
- Practice Heatmap: All cells white at 5%. "no sessions yet this week."
- Active Goals: Empty card — "no creativity goals yet."
- Streak: "0-day streak — create something today."
- Portfolio Timeline: Hidden until first milestone
- Activity Log: Hidden until first session

### Established user (zero state)
- SIA note: "Taking a creative rest. Sometimes the best ideas come after a pause."
- Practice heatmap shows this week's pattern (may include empty days)
- All sections populated with historical data

---

## Motivation Adaptation

- **Low motivation**: SIA note is encouraging ("even 10 minutes of creative time counts"). Shows only top project + inspiration prompt. Hides goals, library detail, analytics. FAB label: "create."
- **Medium motivation**: Full screen as described. Default experience.
- **High motivation**: SIA note includes detailed metrics ("90 min avg session this month, up from 60 min in April. You're spending 65% of creative time on writing"). Extra analytics card appears with session-type breakdown. Portfolio timeline shows more granular milestones.

---

## Error Handling

| Error Scenario | Visual Treatment | Recovery Action |
|----------------|------------------|-----------------|
| Active projects load fails | Projects section shows "could not load projects" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches project list |
| SIA coaching note load fails | Card shows "could not load SIA note" as placeholder text in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Practice heatmap data unavailable | Heatmap area shows "no data available" in 15pt Regular, white at 40%, with empty grid cells at 5% opacity | Tap "retry" or wait for next pull-to-refresh |
| Portfolio timeline load fails | Timeline section shows "could not load portfolio" + "retry" link in orange | Tap retry re-fetches |
| Activity log load fails | Activity log section shows "could not load activity" + "retry" link in orange | Tap retry re-fetches |
| Project creation (FAB) submission fails | FAB returns to default state, "could not save project — try again" toast (top, 3s auto-dismiss, error-red left border) | User data preserved in modal form, user can tap FAB again |
| Inspiration prompt load fails | Inspiration card shows fallback generic prompt: "what are you creating today?" | Card tap still navigates to Journal [37] with generic prompt |
| Network offline | All API-dependent sections show last cached data with "offline — showing cached data" banner (48pt, ink-brown-800, white at 50% text, top of scroll area). FAB tap queues creation locally. | Banner includes "tap to retry" when connectivity returns |

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title (expanded) | Sora | 700 (Bold) | 28pt | 34pt | White #FFFFFF |
| Domain header title (collapsed) | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| SIA coaching note text | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| SIA coaching note dot | — | — | 8pt | — | #7F24FF (purple) |
| Eyebrow labels ("ACTIVE PROJECTS", etc.) | Sora | 600 (Semibold) | 12pt | 14pt | White at 40% |
| Project name | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Project milestone | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| Project progress percentage | Sora | 400 (Regular) | 13pt | 18pt | White at 70% |
| Project due date | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| "see all" link | Sora | 600 (Semibold) | 13pt | 18pt | #FF5E00 (orange) |
| Inspiration prompt text | Sora | 400 (Regular) | 16pt | 22pt | White at 85% |
| Inspiration "start creating" chip | Sora | 600 (Semibold) | 13pt | 16pt | #F59E0B (amber) |
| Inspiration "reflect on this" chip | Sora | 600 (Semibold) | 13pt | 16pt | White at 60% |
| SIA inspiration glyph | — | — | 12pt | — | #7F24FF (purple) |
| Heatmap total hours | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Heatmap trend comparison | Sora | 400 (Regular) | 13pt | 18pt | #34A853 (up) / White at 50% (same) / #FF5E00 (down) |
| Heatmap day labels | Sora | 400 (Regular) | 11pt | 14pt | White at 30% |
| Goal ring label | Sora | 600 (Semibold) | 13pt | 16pt | White #FFFFFF |
| Goal ring percentage | Sora | 400 (Regular) | 12pt | 14pt | White at 50% |
| Streak count | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Streak best label | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| Timeline milestone label | Sora | 400 (Regular) | 13pt | 18pt | White at 70% |
| Timeline date | Sora | 400 (Regular) | 11pt | 14pt | White at 30% |
| Activity log row text | Sora | 400 (Regular) | 14pt | 20pt | White at 70% |
| Activity log date | Sora | 400 (Regular) | 12pt | 16pt | White at 40% |
| FAB label | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Creativity dashboard" on mount as the screen identity
- Focus order: Back button -> Domain header title -> SIA coaching note -> Active projects (rows in order) -> "see all" link -> Inspiration prompt card ("start creating", "reflect on this") -> Heatmap card (summary text, then cells left-to-right) -> Active goals (rings left-to-right) -> Streak tracker -> Portfolio timeline (milestones left-to-right) -> Activity log rows -> FAB
- SIA coaching note: accessible label "SIA insight: [note text]. Double tap to open SIA chat."
- Inspiration prompt card: accessible label includes prompt text; "start creating" and "reflect on this" are separate buttons
- Practice heatmap cells: accessible label per cell (e.g., "Wednesday, 45 minutes creative session"); grouped as "This week's creative practice"
- Active goals progress rings: accessible label includes goal name and percentage (e.g., "Film, 55% complete")
- Streak tracker: accessible label "8-day creative streak, best streak 21 days"
- Portfolio timeline milestones: accessible role "button"; label includes date and milestone name (e.g., "February, demo recorded")
- FAB: accessible label "Log creative session"
- Heatmap/practice trend direction is carried by a **visible ▲/▼ arrow glyph + the signed value** in the KPIStatTile (▲ green up / ▼ muted white-40 down) — never by colour or a bare word alone; the multi-week consistency heatmap adds a **visible 5-step intensity legend** with a label ("less → more practice") beneath the grid so the encoding is perceivable without colour discrimination or a screen reader (per Visualization S36-V01/V02)
- Reduced motion: skip heatmap staggered fade-in, portfolio timeline line-draw animation, and goal ring arc draw; show final states immediately

---

## Cross-References

- **Navigates to**: Screen [09] — SIA Chat (via coaching note tap), Screen [14] — Goal Detail (via goal ring tap), Screen [37] — Journal (via inspiration prompt "reflect on this" secondary chip, stack push with prompt pre-loaded)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link)
- **Shared components with**: Screen [35] — Learning Dashboard (Domain Dashboard Template: Domain Header, SIA Coaching Note Card, Active Goals, Streak Tracker, Activity Log, FAB), Screen [38] — Habits (Streak Indicator, Practice Heatmap pattern)
- **Patterns used**: Domain Dashboard Template (established in Screen 35), Back Button, 8-State Model, Content Entry Animation
- **Patterns established**: Inspiration Prompt Card (with subtle domain gradient), Practice Heatmap (graduated domain-color cells), Portfolio Timeline (horizontal milestone visualization with connecting line)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/creativity`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B12-F08 | critical | retention | Wire both to a creative-session logging modal with prompt/project context and save/cancel/error states. |
| B12-F09 | major | navigation | Make project rows semantic links/buttons, add project detail or expansion, and wire See all to the project library. |
| B12-F10 | major | navigation | Link the coaching note to contextual SIA chat and pass prompt context into Journal via semantic prompt chips. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

