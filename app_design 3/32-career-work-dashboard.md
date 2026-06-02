# Screen Design: Career & Work Dashboard

**Screen**: 32 of 73
**File**: 32-career-work-dashboard.md
**Register**: Product Mode
**Primary action**: complete career action
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Career Dashboard). Also reachable via SIA deep-link.

---

## Purpose

The career dashboard is where users track professional growth — active career goals, AI-suggested skill-building actions, networking prompts, and upcoming work deadlines. SIA acts as a career coach, connecting professional development to other life domains ("Your productivity peaks after morning workouts — schedule deep work for 10am"). Unlike the finance dashboard (data-dense, Mint-like), this screen is action-oriented: the primary interaction is reviewing and completing AI-suggested career actions.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with indigo accent and career level
2. SIA career coaching note — cross-domain professional insight
3. Active career goals with progress rings
4. AI-suggested actions — skill-building tasks, networking prompts, professional development items
5. Growth trajectory — skills inventory visualization
6. Upcoming career deadlines/tasks

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link in chat (screen 09)
- **Primary exit**: Goal Detail (screen 14) for career-specific goals, via stack push
- **Secondary exits**: SIA tab (tap SIA note or "ask SIA for career advice"), Create/Edit Goal (screen 15, via "add career goal")

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2 viewport heights)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Career & work     Lv.5  ⚡  │  Domain Header (56pt)
│     indigo accent bar           │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (~72pt)
│ │ "Your productivity peaks    │ │
│ │  after morning workouts.    │ │
│ │  Schedule deep work for     │ │
│ │  10am?"                     │ │
│ └─────────────────────────────┘ │
│                                 │
│  active goals                   │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ◎ Get promoted to senior    │ │  Goal Card (~72pt each)
│ │   3 of 8 actions done  38% │ │
│ │   Next: update portfolio    │ │
│ ├─────────────────────────────┤ │
│ │ ◎ Learn Python basics       │ │
│ │   12 of 20 actions    60%  │ │
│ │   Next: complete chapter 5  │ │
│ └─────────────────────────────┘ │
│                                 │
│  suggested actions              │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ☐ Reach out to mentor       │ │  Action Card (~56pt each)
│ │   networking · +15 XP       │ │
│ ├─────────────────────────────┤ │
│ │ ☐ Review quarterly goals    │ │
│ │   planning · +20 XP         │ │
│ ├─────────────────────────────┤ │
│ │ ☐ Read 1 chapter of "Deep  │ │
│ │   Work" · skill · +10 XP   │ │
│ └─────────────────────────────┘ │
│                                 │
│  growth trajectory              │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │  Skills snapshot             │ │  Skills Card (~140pt)
│ │  ┌────┐ ┌────┐ ┌────┐      │ │
│ │  │Lead│ │Tech│ │Comm│      │ │  Skill pills
│ │  │ 7  │ │ 5  │ │ 8  │      │ │
│ │  └────┘ └────┘ └────┘      │ │
│ │  "Communication is your     │ │
│ │   strongest area."          │ │
│ └─────────────────────────────┘ │
│                                 │
│  upcoming                       │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 📅 Performance review       │ │  Deadline Row (~48pt each)
│ │    Jun 15 · 26 days away    │ │
│ ├─────────────────────────────┤ │
│ │ 📅 Project deadline         │ │
│ │    May 28 · 8 days away     │ │
│ └─────────────────────────────┘ │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Career & work" title (20pt Sora Semibold), level badge ("Lv.5"), XP icon, 2pt indigo (#6366F1) accent line at bottom

2. **SIA Coaching Note** — ~72pt
   - Purpose: Cross-domain career insight
   - Content: Purple left bar (3pt), SIA avatar indicator (16pt), coaching message, "ask SIA →" link

3. **Active Career Goals** — ~144pt (2 goals shown)
   - Purpose: Current career objectives with progress
   - Content: Goal cards with progress ring, completion count, next action preview

4. **AI-Suggested Actions** — ~168pt (3 actions shown)
   - Purpose: Actionable career tasks from SIA
   - Content: Checkbox + action description + category tag + XP reward

5. **Growth Trajectory / Skills Card** — ~140pt
   - Purpose: Skills inventory visualization
   - Content: Skill level pills, SIA assessment summary

6. **Upcoming Deadlines** — ~96pt (2 items shown)
   - Purpose: Time-sensitive career events
   - Content: Calendar icon, event name, date, days-away countdown

---

## Components

### Career Goal Card
- **Purpose**: Shows a career goal with progress and next action
- **Data source**: Goals API (filtered by career domain)
- **Visual treatment**: Inside a card container (ink-brown-800, 20pt border-radius). Left: compact progress ring (32pt diameter, orange fill against white at 10% track, percentage in center in 11pt Sora Bold). Right: goal name (16pt Sora Semibold, white), completion count + percentage (13pt Sora Regular, white at 50%), next action (15pt Sora Regular, orange — tappable). Indigo domain tag chip (tiny, top-right corner if needed for multi-domain goals). Cards separated by 1pt divider (white at 5%).
- **Variants**: Active (standard), near-complete (>80% — green progress ring), stalled (no actions completed in 7+ days — SIA flag: "Need help with this?"), completed (green checkmark, full ring)
- **Gestures**: Tap card → push to Goal Detail (screen 14). Tap next action text → push to specific action within Goal Detail.
- **Size**: Full-width - 32pt × ~72pt per goal

### AI Action Card
- **Purpose**: Suggested career action from SIA, completable inline
- **Data source**: SIA AI engine (career action suggestions)
- **Visual treatment**: Inside a card container. Each row: left — checkbox (24pt, circular, 2pt stroke white at 30% default). Center — action description (15pt Sora Regular, white). Below description: action type tag (11pt Sora Semibold, uppercase, white at 40%) + XP reward (13pt Sora Semibold, orange, "+15 XP"). Rows separated by 1pt divider (white at 5%).
- **Variants**: Uncompleted (standard), completed (checkbox filled orange with white check, text strikethrough at 50% opacity, XP earned animation), skipped (dimmed, "skipped" label), AI-generated note visible ("SIA suggested this because...")
- **Gestures**: Tap checkbox → mark complete (XP earned animation). Tap action text → expand for details or SIA explanation. Swipe left → skip action. Long-press → options (reschedule, modify, ask SIA why).
- **Size**: Full-width - 32pt × ~56pt per action

### Skills Snapshot Card
- **Purpose**: Visual representation of career skill levels
- **Data source**: User profile (skills inventory), SIA AI (skill assessment)
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Row of skill pills: each pill is a rounded rectangle (--r-lg, 20pt) with skill name (13pt Sora Semibold, white) and level number below (20pt Sora Bold, white). Background of each pill: indigo (#6366F1) at 15% opacity. Skill levels are numbers (1-10 scale). Below pills: SIA assessment line (15pt Sora Regular, white at 70% — e.g., "Communication is your strongest area."). Max 4-5 skills visible, horizontal scroll for more.
- **Variants**: Populated (skills assessed), new user (no skills assessed — SIA prompt: "Tell me about your professional skills and I'll track your growth"), single skill (early stage)
- **Gestures**: Tap skill pill → expand to show level history and SIA recommendations for improvement. Horizontal scroll for additional skills.
- **Size**: Full-width - 32pt × ~140pt

### Deadline Row
- **Purpose**: Time-sensitive career events and deadlines
- **Data source**: Goals API (deadlines), Calendar sync (if connected), user-entered
- **Visual treatment**: Inside a card container. Each row: calendar icon (20pt, indigo tint), event name (16pt Sora Semibold, white), date + days-away countdown (13pt Sora Regular, white at 50%). Urgency is carried by a day-count + a proximity glyph + a word ("far" / "approaching" / "this week"), never colour-alone (see Visualization S32-V04): the day-count number tints orange when 3–7 days; the < 3-day urgent red is always paired with a "!" glyph + "soon" label. A past-due deadline is neutral + reschedulable ("passed — reschedule?"), never red shaming. Rows separated by 1pt divider (white at 5%).
- **Variants**: Far (>7 days — neutral, "far" glyph+word), approaching (3-7 days — orange day-count tint + "approaching" glyph+word), urgent (< 3 days — red day-count paired with "!" glyph + "soon" word, bold text — never colour-alone), past-due (neutral muted "passed — reschedule?" + constructive lever, strikethrough + 50% opacity — never red shaming)
- **Gestures**: Tap row → push to Goal Detail (screen 14) for the associated goal, or expand inline with more detail. Long-press → edit/reschedule.
- **Size**: Full-width - 32pt × ~48pt per row

---

## Visualization

> Source: embedded section (no companion file — Batch 4 is embedded-only); Audited in `viz-audit/` — Batch 4 (Domain-Dashboard A), findings `S32-V01..S32-V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent**; career-indigo `#6366F1` stays an *identity* accent (header line, RPG badge, skill-bar identity tint, calendar glyph) — **never** on primary data ink. Benchmark = **Linear / Things restraint + goal/OKR apps** — calm, editorial, one focal viz; goal-progress and skill growth rendered **the Balencia way** (GaugeRing + Living Line + warm glow), not as an OKR-app clone. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric: this screen is action-oriented by design, so the bar is "resolve the few quantitative datums with restraint," not "chart everything." The residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

This is an **action-oriented Domain-Dashboard** (the AI-action list is the screen's *content* focus — not a data wall). Today it renders as a near-pure text dashboard: the only visual is two **flat 36px `ProgressRing`s** (single-tone orange, no gradient/glow/inset track) on the mission cards; skills are bare number pills; deadlines are text countdowns; there is **no hero, no trend, no skill comparison viz, no consistency surface**. This section upgrades *how the quantitative data reads* — promoting mission progress to depth `GaugeRing`s, turning the skill pills into honest value-vs-target `StatBars`, adding an overall career-momentum **Living Line**, and converting the deadline countdowns to honest `KPIStatTile`s — **without** displacing the SIA note or the completable action list, which stay the primary content. Mints **no** new primitive; it composes from the frozen kit (`GaugeRing`, `StatBars`/`MacroBar`, `TrendChart`/`VK-016`, `KPIStatTile`, `Sparkline`, `CalendarHeatmap`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Mission progress (0.38 "3 of 8", 0.60 "12 of 20") | flat 36px single-tone `ProgressRing` | **depth `GaugeRing`** (48px card, arc-gradient stroke, size-stepped glow, inset track, center %) — one per mission card; **the lead mission's 96px gauge is the hero** | `GaugeRing` (`VK-002`) |
| Skill levels (Lead 7 · Tech 5 · Comm 8 · Strategy 6, 1–10 scale) | bare number pills (indigo 15% bg) | **skill `StatBars`** — value-vs-target horizontal bars (level/10), career-indigo identity tint, value + target labelled | `MacroBar` / `StatBars` (`VK-006`) |
| Overall career momentum / Life-Power-of-domain over time | not shown | **Living-Line `TrendChart`** — solid orange actual (skill-sum or career stat, last 6 weeks) → dashed-purple SIA projection | `TrendChart` (`VK-006` / `VK-016`) |
| Deadline countdowns (Perf review 26d · Project 8d) | text "N days away" (colour-shift on urgency) | **deadline `KPIStatTile`s** — big day-count number + label + a **proximity/timeline sign** (non-shaming on a past-due) | `KPIStatTile` (`VK-008`) |
| Action XP rewards (+15 / +20 / +10) · weekly XP toward level | XP text only | optional **`MomentumBar`** — today's career-XP-vs-daily-goal continuous orange→green fill (high-motivation tier) | `MomentumBar` (`VK-004`) |
| Skill-growth trend (e.g. Comm 3→8 over 6 mo, high-motivation) | not shown | optional **`Sparkline`** (7-pt Living Line) under the selected skill bar | `Sparkline` (`VK-001`) |
| Action-completion consistency (career habit cadence) | not shown | optional **`CalendarHeatmap`** of career-action consistency (career-indigo intensity = *this domain's* cadence) | `CalendarHeatmap` |
| Action description / type tag / SIA note / level / deadline date | text | — (deliberately textual — scalars/labels with no useful visual form) | — |

**Editorial hierarchy (calm, not maximal):** the SIA note + completable action list stay the screen's *content* focus; the **lead-mission 96px `GaugeRing` is the one viz hero**; mission card gauges + skill StatBars + the momentum Living Line are clearly secondary; the sparkline/heatmap are ambient (high-motivation only). One focal viz, a restrained supporting set — Linear/Things calm, not an OKR data wall.

### 1 · Mission-progress gauges (hero + cards) — `S32-V01` → `GaugeRing`

Promote the two mission `ProgressRing`s from flat single-tone to depth `GaugeRing`s. The **lead mission** ("Get promoted to senior", 0.38) renders as the screen's **one 96px hero gauge** at the top of "active missions": **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, center value `text-h2` ("38%", count-up 520ms `--ease-flow`) + "3 of 8 actions" sub-label, and **`ticks`** (12 radial, hero score gauge). The second mission keeps an inline **48px `GaugeRing`** on its card (`--glow-orange-md` ~20px **(mint)**, 4px stroke — *never* the 32px hero glow, which would swamp 48px). **Green `#34A853`** fill at 100% / near-complete (>80%, matching the existing `near-complete` card variant); a stalled mission keeps its orange fill (never recoloured to alarm) and surfaces the SIA "Need help with this?" flag as a label, **not** a colour verdict.
- **Why a gauge, the Balencia way:** mission/OKR progress *completes* (0→100%), so a full ring is honest (vs `ArcGauge`, reserved for non-completing levels); the warm-glow `GaugeRing` makes career progress read as the same instrument family as every other domain score — not a borrowed OKR-app ring.
- **Depth:** all gauges share inset-track + arc-gradient; only the 96px hero carries the 32px glow; round caps; layered `ink-brown-800` surface + top-edge highlight.
- **Micro-interaction:** tap a gauge → push to Goal Detail [14] (carries the existing card route); the hero's "3 of 8" sub-label is the disclosed window for its %.
- **Non-shaming:** a low % reads as "room to move," framed by the next-action line — never "you're behind."
- **States:** **Day-1 / no missions** → ghosted dashed full-ring outline + "Add a career mission" affordance (the existing Day-1 variant), **never** a filled 0% disc; **loading** → arc skeleton with radial shimmer that *morphs* into the drawn fill (not a blank disc); **near-complete** → green fill + green check glyph; **stalled** → orange fill + SIA help label.
- **Data:** `careerDashboard.missions[].progress / completed / total` (`mock.ts`, already present).

### 2 · Skill StatBars — `S32-V02` → `MacroBar` / `StatBars`

Replace the bare number pills in "growth trajectory" with **value-vs-target `StatBars`** (one row per skill: Lead 7 · Tech 5 · Comm 8 · Strategy 6 on a 1–10 scale). Each bar: **`--color-alpha-white-08` track over a `--track-inset` **(mint)** recess, fill = `career-indigo #6366F1` (*identity* — the one sanctioned place domain colour is the data ink, because it encodes *this domain's* skills), width = level/10, with the skill name + a labelled `level / 10` value (visible number, never bar-length-alone)**. Bars stay horizontal and labelled so they read at 390px; the selected skill expands in place (carries the existing skill-pill expand gesture). The "Communication is your strongest area" line stays as the SIA assessment beneath.
- **Why StatBars not a radar:** four named skills on a shared 1–10 scale are a *comparison*, and Linear/Things-restraint favours a clean labelled bar group over a 4-axis radar (a radar here would create a second focal point fighting the mission hero, and reads worse than bars at this count). Cross-domain *life* profiles use the ConstellationRadar elsewhere; per-skill levels use StatBars.
- **Honest scale:** all four bars share the same 0–10 baseline and scale (no truncation); a 0-level skill is a true zero-width fill at the baseline, not a hidden row.
- **Depth:** fill count-up width 0→level on scroll-into-view (`--dur-slow` 520ms `--ease-flow`); no glow (bars are flat-premium; depth lives in the hero gauge).
- **Micro-interaction:** tap a skill bar → expand level history + SIA improvement recommendations (existing gesture); **high-motivation tier** reveals the `Sparkline` (`S32-V06`).
- **Non-shaming:** the weakest skill (Tech 5) is framed by a constructive SIA lever, never "your weakest skill" as a verdict.
- **States:** **new user / no skills** → ghosted bar tracks + the existing "Tell SIA about your skills" prompt (no fake zeroed bars implying assessed-zero); **single skill** → one bar + "more as you grow" nudge; **loading** → track skeletons shimmer in place.
- **Data:** `careerDashboard.skills[].level` (`mock.ts`, already present).

### 3 · Career-momentum Living Line — `S32-V03` → `TrendChart` (`VK-016`)

The signature, added at the foot of "growth trajectory": a full **Living Line** of overall career momentum over the last 6 weeks (skill-sum, or the career Domain Stat) — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on level-up / skill-up weeks, a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *correct*, not a 60/30/10 violation) continuing the same path toward the next milestone. Curved monotone, `--stroke-thin` 2px (actual) / 2px dashed (projection).
- **Why the line:** "every chart is the line" (§8) — a Living Line gives this restraint-benchmarked screen its one piece of motion-craft signature, and reuses the exact spine of the home/fitness trends so career reads as one family — not an OKR-app sparkline.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; the projection draws after the actual line; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across weeks; W/M/Y selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`).
- **States:** **cold-start (<2 weeks)** → "calibrating — building your career trend" with a faint flat baseline, **never** a single dot; projection hidden until SIA has enough data; **reduced-motion** → completed stroke at rest + green end/milestone dots + static dashed-purple tail.
- **Data:** new `careerDashboard.momentumTrend` (6 weekly points + `projection`) to add in `mock.ts`.

### 4 · Deadline countdown KPIStatTiles — `S32-V04` → `KPIStatTile`

Convert the "upcoming" deadline rows to honest **`KPIStatTile`s**: uppercase event label (`white/40`, +0.12em) · big **day-count** number `text-h2` (26, 8) · a **proximity sign** — a calendar/clock glyph **plus** a word ("far" / "approaching" / "this week") so urgency is never colour-alone. Approaching (3–7 d) tints the number `--color-brand-orange`; urgent (<3 d) keeps the spec's red **paired with a "!" glyph + "soon" label**. Count-up `--dur-base` 280ms `--ease-out-soft`.
- **Honest window:** the day-count is the literal, disclosed distance to the date (the date stays visible beneath) — no cherry-picked or relative-flattering framing.
- **Non-shaming on missed deadlines (brief-mandated):** a **past-due** deadline is **not** weaponised — it renders as a neutral muted tile with a "passed — reschedule?" affordance and a constructive SIA lever, **never** red shaming, a guilt countdown, or loss-aversion language (the deadline-row `past` variant: strikethrough + 50% opacity, plus a reschedule action — not a penalty).
- **Micro-interaction:** tap a tile → Goal Detail [14] for the linked goal (existing gesture); long-press → edit/reschedule.
- **States:** **no deadlines** → section hidden (existing behaviour — no empty tile); **loading** → label + skeleton number bar; **past-due** → muted "passed" tile + reschedule.
- **Data:** `careerDashboard.deadlines[].countdown / date / urgency` (`mock.ts`, already present).

### 5 · Career-XP momentum (optional) — `S32-V05` → `MomentumBar`

**High-motivation tier only:** a single continuous `MomentumBar` (radius-pill, 8px, `--color-alpha-white-08` track) above "suggested actions" showing today's earned career-XP vs the daily goal — a **continuous** orange→green `--grad-progress` **(mint)** fill (*not* segments — segments violate §8), arrival end green. Sums the action XP (+15/+20/+10) as actions are completed, so the bar advances live with the existing checkbox-complete + XP-float interaction.
- **Non-shaming:** frames momentum, never weaponises a partial day; a low fill reads as "the day's still open," not a deficit.
- **States:** Day-1 → empty track + "complete an action to start your day's momentum"; reduced-motion → fill at final width instantly.
- **Data:** derived from `careerDashboard.actions[].xp` + a new `dailyXpGoal` in `mock.ts`.

### 6 · Skill micro-trend + action consistency (optional) — `S32-V06` → `Sparkline` + `CalendarHeatmap`

**High-motivation tier only.** A 7-point **`Sparkline`** (tiny Living Line, `--stroke-thin` 2px orange, curved, 64×24, green end dot on a milestone, **no glow, no axes**) under the *selected* skill bar, showing that skill's recent trajectory (e.g. Comm 3→8). And — where the screen wants a consistency surface — a **`CalendarHeatmap`** (deployed component, reuse as-is) of career-action consistency: **5 intensity steps** (`--color-alpha-white-05` → full career-indigo `#6366F1` *as domain identity* — the one place domain colour is allowed on data because it encodes *this domain's* cadence), today = dashed border, tap = `scale-110`.
- **Non-shaming:** empty heatmap cells read as "open days," never a guilt grid; no loss-aversion countdown on a broken cadence (Gentler-Streak thesis under the always-on baseline).
- **States:** sparkline cold-start (<7 points) → faint flat baseline, never a single dot; heatmap Day-1 → empty grid + "your career cadence starts today" (today cell dashed), not a wall of indigo-absence; loading → cells/stroke shimmer in place.
- **Data:** new `careerDashboard.skills[].history` + `careerDashboard.actionHistory` (date→count) in `mock.ts`.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px lead-mission `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up — **then** the 48px mission gauge fills → **then** the skill `StatBars` rise (width 0→level, 520ms, staggered) → **then** the deadline `KPIStatTile`s count up (280ms) → **then** the career-momentum **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last → **then** (high-motivation) the optional `MomentumBar` fills + `Sparkline` draws + heatmap cells stagger in. One line motif per surface (the momentum trend is the only full Living Line; missions/skills/KPI use gauges/bars/numbers). Below-fold visuals (momentum line, heatmap) animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail) and the gauges' filled arcs preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — mission gauges ghosted-dashed behind the "Add a career mission" affordance (never a filled 0% disc), skill bars ghosted-track behind the "Tell SIA about your skills" prompt, momentum line "calibrating" with a flat baseline (no single dot), deadline tiles absent (section hidden), heatmap "your career cadence starts today"; **loading** — depth-preserving skeletons that *morph* into drawn data (arcs/bar-tracks/axes/cells visible, radial / L-to-R / count-up shimmer — never blank discs); **partial** — un-assessed skills ghosted (distinct from a real level-0), un-synced trend points ghosted ≠ a true zero; **error** — chart-specific honesty (which series failed — "Could not load skills" on the bars, missions/deadlines independent) + a visible "retry", per the Error Handling table (action-checkbox sync keeps its red-ring-flash + revert + toast).
- **60/30/10:** **orange dominates** data ink (mission gauge fills, Living-Line effort, next-action links, XP text, momentum bar, approaching-deadline number); **green** = arrival/in-range only (≥80% mission gauge, completed mission check, milestone dots, momentum arrival end, ▲ deltas, XP-earned); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on the momentum line (§11 forecast, correct *not* a violation) plus the existing SIA-note dot/bar; **career-indigo `#6366F1`** is confined to **identity** (header accent line, RPG level badge, skill-StatBar fill as *this-domain's* data, calendar glyph, heatmap intensity-of-*this-domain*) — **never** on a CTA, eyebrow, or generic series; **red `#f44336`** only on the <3-day urgent deadline, paired with a "!" glyph + "soon" label (never an alarm-recolour of a low score). Glow uses the size-stepped scale (96px = 32px hero glow, 48px = md ~20px, bars/sparklines = none) — warm depth on `ink-brown-800`, not neon.
- **Non-shaming (ethical gate):** mission progress, skill levels, and deadlines are framed as *state + next lever*, never a verdict on worth; the weakest skill and a stalled mission get a constructive SIA prompt, not "you're failing"; a **missed/past-due deadline is neutral + reschedulable, never weaponised** (brief-mandated); no loss-aversion countdown on a broken action cadence; KPI/delta windows are honest and disclosed.
- **Accessibility:** every gauge/bar/line/tile/heatmap carries a text/`aria-label` equivalent conveying the same value ("Get promoted to senior, 38 percent, 3 of 8 actions"; "Communication, level 8 of 10"; "Performance review, 26 days away"); urgency + skill status use a **visible glyph + word** (calendar/clock + "this week"/"soon"; check at completion) **plus** colour — never colour alone; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, StatBar fills, the Living-Line stroke, milestone dots, KPI signs, and the filled/unfilled boundary all meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets ≥ 44×44pt (the existing 44pt mission-card / skill-pill / deadline-row hit areas carry through); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

> Layers premium craft **on top of** the A− `## Visualization` section above (which it does not replace) — elevating the non-chart surfaces, copy, type, motion, and states to the A++ bar and reconciling the optional-elements Day-1 degenerate states the viz pass left undefined. Graded under `design-audit/RUBRIC.md` (data profile).

**Profile:** data · **Cluster benchmark:** Notion + Things (career) — *stays Balencia via orange-dominant mission gauges, the career-momentum Living Line as the signature draw-first viz, warm-glow surfaces on ink-brown, and the sacred non-shaming deadline framing that never weaponises missed dates.*
**Pre-grade:** A− (86) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **lead-mission 96px `GaugeRing` hero at the top of "active goals"** (`CK-P2`, data hero) — the only ≥96px glowing element above the fold. The **SIA coaching note sits above it as a warm preamble, not a competing hero**: emotionally distinct (purple left bar, SIA voice) but visually *quieter* — no glow, body type, no accent surface — so it reads as the voice setting the tone for the dashboard. This resolves the visual ambiguity: the squint test now lands on the mission gauge's center percentage first (large number, orange, glowing), then the SIA coaching context, then the secondary 48px mission gauge, then the action list. Everything below (skill bars, momentum line, deadline tiles, heatmap) is clearly secondary by size and depth cue.

### Surface & depth

Every card surface adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28px on primary cards; `--radius-md` 14px on skill detail cards if expanded) · 1px `--glass-border` white-06 · **`--edge-highlight` top-edge inner highlight** (`CK-T01`, the not-flat cue, newly minted) · `--shadow-1` for card elevation. Hero surfaces (lead-mission card, SIA note) add `CK-T02 --surface-backplate` (radial warm orange gradient, 5% opacity, 60% stops at center). 

**Glow calibration per `CONSISTENCY.md §1`:** `--glow-orange` (32px, 0.45 opacity) only on the ≥96px lead-mission hub; `--glow-orange-md` (~20px, 0.40 opacity) on secondary 48px mission gauge; **no glow** on skill bars, sparklines, heatmap cells, or inline elements. All ring/gauge tracks recess over `--track-inset` rgba(0,0,0,0.28). Domain-indigo (`--color-domain-career` `--color-domain-career`) appears as the skill StatBar fill (the one sanctioned place domain colour is data-ink — encoding *this domain's* owned metric), calendar glyph tint, and heatmap intensity scale (never on a CTA, eyebrow, or generic text).

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: domain header title `--text-h2` / weight 700 / `--leading-snug` (1.25); SIA coaching message `--text-body` (16px, raised from 15px) / weight 400 / `--leading-normal` (1.4); section eyebrows the `.eyebrow` recipe (`--text-eyebrow` 12px / weight 600 / `--tracking-eyebrow` +0.12em / uppercase / white-40); goal names and deadline event names `--text-h3` (17px) / weight 600 / `--leading-snug`; action descriptions `--text-body` / weight 400 / `--leading-normal`; skill pill names `--text-caption` (13px) / weight 600 / `--leading-normal`; stat values (percentages, day-counts, skill levels) tabular-nums at `--text-h2` / weight 700. Hierarchy by **weight** (600–700 vs 400), never size alone. Sentence case on all labels. ≤2 `--color-brand-orange` accent words (next-action text on goal cards, XP reward badge). Chillax logo-only. No exclamation marks; the brand period used with intent on SIA strings.

### Microcopy (before → after)

Narrative copy is on-voice; edge strings are now authored to `CK-P5`:
- **Goal card next-action text** — *before:* "Next: update portfolio" (generic verb) → *after (warmer):* "Next: refresh your portfolio with 3 recent wins" (specific, actionable).
- **Skill card empty state** — *before:* "Tell SIA about your skills to start tracking your growth" → *after:* "Tell SIA what you're building at work and we'll track your growth together."
- **Stalled mission label** — *before:* unremarked low % → *after:* "Need help with this?" (paired with orange "?" glyph, SIA-suggested, on-voice, not shaming).
- **Deadline approaching (3–7d)** — *before:* implicit colour tint → *after:* day-count number in `--color-brand-orange` + "approaching" word + calendar glyph (never colour-alone); such as "Performance review — 26 days away · approaching" (visible sign + word).
- **Deadline urgent (<3d)** — day-count in calibrated `--color-error-red` + "!" glyph + "soon" label; such as "Project deadline — 2 days away · ! · soon" (red paired with glyph+word, not red alone).
- **Deadline past-due (honest, non-shaming)** — *before:* unaddressed red shaming → *after:* neutral muted tile with strikethrough + 50% opacity + a "reschedule" affordance + SIA lever; such as "Training deadline · passed — reschedule?" (constructive, warm, never a guilt countdown).
- **Action card loading** — "SIA is preparing your career actions — one moment."
- **Skill bars cold-start (no skills assessed)** — "Tell SIA about your professional skills and we'll track your growth here" + affordance button "Get started".
- **Momentum line cold-start (<2 weeks)** — "Calibrating — building your career trend" (no projection until SIA has ≥2 weeks of data).
- **Heatmap Day-1** — "Your career cadence starts today" (never a wall of indigo-absence implying failure).
- **All actions completed** — "All caught up. SIA will suggest new actions tomorrow. Great momentum this week."

No SIA string is ever a horoscope; all are specific to the user's own data, calendar, and actions. Kept (already on-voice): "Your productivity peaks after morning workouts — schedule deep work for 10am?" (specific connection), goal framing as "room to move" not deficit.

### Motion choreography

Locked to `CK-P4` order, draw-first **hero-to-support cascade:** 
- (1) **Lead-mission 96px `GaugeRing` draws first** — arc `stroke-animate` 520ms `--ease-flow`, center percentage counts up 520ms, 12 tick marks stagger in.
- (2) **Secondary 48px mission gauge fills** — arc 520ms, 4px stroke (no ticks), staggered 80ms after hero.
- (3) **Skill `StatBars` rise** — width 0→level/10, 520ms `--ease-flow`, staggered 80ms per skill.
- (4) **Deadline `KPIStatTile` numbers count up** — 280ms `--ease-out-soft`, staggered 60ms per tile.
- (5) **Career-momentum **Living Line** draws itself** — L→R stroke-draw 1200ms `--ease-flow`, then dashed-purple SIA projection draws 1200ms (after actual), green milestone dots appear on level-up weeks. **The signature moment: one continuous, curved, round-capped stroke that *draws itself*, never fades.**
- (6) **Optional high-motivation elements enter last:** momentum bar fills (280ms), sparkline draws (520ms), heatmap cells stagger in (60ms per cell).

Card entrances use `.animate-fade-up` (280ms `--ease-out-soft`, 80ms stagger between sections). Below-fold visuals (momentum line, heatmap) animate on **scroll-into-view**, not screen mount. `prefers-reduced-motion` → all visuals at final state instantly; Living Line fully drawn + green end/milestone dots + static dashed-purple tail; gauges at final fill; bars at final width; no loops, no opacity-fades on strokes.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Hero mission gauge ghosted (dashed ring outline, "Add a career mission" affordance), secondary gauge absent, skill bars ghosted (track visible, no fill), momentum line "calibrating" flat baseline (no single dot), heatmap "your career cadence starts today", deadline section hidden | "Let's map out your career path. What are you working toward professionally?" (SIA coaching); "Add a career mission" CTA; "Tell SIA about your professional skills"; "Calibrating — building your career trend" | Hub shows no percentage; `--surface-backplate` glow; never a filled 0% disc or a degenerate point |
| Loading | Depth-preserving skeletons (ring arcs + center hint text, skill bar tracks + left-align shimmer, axes on the momentum line) that morph into drawn data | "SIA is preparing your career actions — one moment." | Skeleton on `--color-ink-brown-800`, radial shimmer on arcs, L→R shimmer on lines |
| Empty / partial | Un-assessed skills ghosted (track visible, no indigo fill, label "not yet assessed") distinct from a 0-level skill; un-synced weeks on heatmap ghosted (lighter indigo tint); action list empty: "All caught up. SIA will suggest new actions tomorrow." | Per-zone, on-voice, never shaming | No-data ≠ zero (ghosted, 20% opacity, not a real 0) |
| Error | Per-card skeletons + network banner below header naming failed section; deadlines independent from goals/actions | "Could not load goals — pull to refresh." | Calibrated `--color-error-red` only on genuine operational failure, glyph+word paired |
| Offline | Cached data retained + cached banner; actions honestly dimmed with reason | "You're offline — showing your last sync." | Dim 0.5 opacity + "offline" label |

**Non-shaming on low progress:** a 28% mission reads "28% · on track for [deadline month]" (real closure date + runway, never "you're behind"). **Non-shaming on stalled:** the stalled mission label "Need help with this?" + orange "?" glyph (warm SIA offer, not a verdict). **Non-shaming on missed deadlines:** past-due renders as neutral muted tile with "passed — reschedule?" affordance + strikethrough + 50% opacity (never red, never a guilt countdown).

### Signature & anti-generic

Ownable moments: (1) the **career-momentum Living Line** — the same draw-first spine as the home/fitness trends, reused so career reads as one family; (2) the **warm-glow-on-ink-brown surface signature** — none of which a flat Notion database or Things treelist carries; (3) the **orange-dominant mission gauges** (data-ink) over domain-indigo identity cues; (4) the sacred **non-shaming deadline framing** (neutral on past-due, warm SIA lever on stalled). Anti-generic fixes: the vertical card stack (SIA → goals → actions → skills → momentum → deadlines → heatmap) is broken from equal-card monotony by the 96px hero gauge + varied card heights + the eyebrow-section rhythm (`CK-P6`), so it never reads as a templated grid of equal stat cards. The ASCII wireframe (still showing flat text pills and stalled-state red coloring) is flagged to be redrawn from this section in the build.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`): SIA coaching message white-100 (≥12:1), goal name white-100 (≥12:1), action description white-100 (≥12:1), deadline event white-100 (≥12:1), secondary text (next-action, skill labels, deadline dates) white-70 (≥7:1), meta (section eyebrows, timestamps) white-40 (≥4.5:1 at `--text-caption`), `--color-brand-orange` accents (≥3:1 on both fields — WCAG 1.4.11). **Status never colour-alone:** mission urgency (progress %/visual gauge) + text label ("38%", "on track"); deadline urgency (red day-count + "!" glyph + "soon" word; orange day-count + "approaching" word; neutral + "passed" label); stalled mission (orange "?" glyph + "Need help?" label). Focus-visible is standardized to `CK-T03 --focus-ring` (2px orange, 2px offset) on every interactive element (goal card, action checkbox, skill pill, deadline row, level badge) — replacing ad-hoc ring values in the Interaction tables. Targets ≥44×44pt. Reduced-motion preserves all chart final states with signature static forms (Living Line fully drawn, gauges filled, bars widened, lines without loops).

Every gauge/bar/line/tile renders a text/`aria-label` equivalent: "Get promoted to senior, 38 percent, 3 of 8 actions" (gauge); "Communication, level 8 of 10" (skill bar); "Career momentum, 6-week trend, orange actual, purple projected" (Living Line); "Performance review, 26 days away, approaching" (KPI tile); "Your career action consistency this year, career-indigo intensity" (heatmap). Urgency and skill status conveyed via **glyph + word + colour** (not colour alone).

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Next action text (goal cards) | #FF5E00 | Burnt Orange | 60% — tappable action |
| Progress ring fill | #FF5E00 | Burnt Orange | 60% — progress indicator |
| XP reward text | #FF5E00 | Burnt Orange | 60% — reward indicator |
| Completed checkbox fill | #FF5E00 | Burnt Orange | 60% — active/completed state |
| Approaching deadline number (3–7d) | #FF5E00 | Burnt Orange | 60% — proximity tint; urgency is carried by the day-count + proximity glyph + word ("approaching"), never colour-alone (see Visualization S32-V04) |
| Near-complete goal ring | #34A853 | Forest Green | 30% — nearing success |
| Completed goal checkmark | #34A853 | Forest Green | 30% — success |
| XP earned animation | #34A853 | Forest Green | 30% — reward confirmation |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Domain header accent line | #6366F1 | Indigo | Domain color — identification |
| Domain level badge XP icon | #6366F1 | Indigo | Domain color — identification |
| Skill pill backgrounds | #6366F1 15% | Indigo at 15% | Domain color — identification |
| Calendar icon tint | #6366F1 | Indigo | Domain color — identification |
| Urgent deadline number (<3d) | #f44336 | Red | Calibrated red ONLY paired with a "!" glyph + "soon" word (never colour-alone); a past-due deadline is NEUTRAL muted "passed — reschedule?", never red shaming (see Visualization S32-V04) |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Headings, names |
| Secondary text | #FFFFFF B3 | White 70% | Descriptions, values |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, captions, timestamps |

**60/30/10 verification**: Orange on interactive actions (next action links, checkboxes, XP text, approaching deadlines, progress rings). Green on success states (completed goals, earned XP). Purple limited to SIA note elements (2). Indigo only on domain identification (header, skill pills, calendar icons). Ratio holds.

---

## Interaction States

### Career Goal Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card with progress ring | — |
| Pressed | scale(0.98), background lightens to white at 5% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer on ring and text | — |
| Error | N/A | — |
| Success | Green glow (600ms) when goal completed | success notification |

### AI Action Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 24pt circle, 2pt stroke white at 30% | — |
| Pressed | Circle fills partially (scale pulse) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Spinner in checkbox area (during server sync) | — |
| Error | Red ring flash (sync failed, retry) | error notification |
| Success | Fill animation (white → orange), white checkmark appears, XP floats up (+15 XP), text strikethrough | success notification |

### Skill Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Indigo 15% background, white text | — |
| Pressed | scale(0.97), background opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Deadline Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (past deadline) | — |
| Loading | Skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Career goal card | Push to Goal Detail (screen 14) |
| Tap | Next action text | Push to Goal Detail (action focused) |
| Tap | Action checkbox | Toggle completion, earn XP |
| Tap | Action text | Expand for details / SIA explanation |
| Tap | Skill pill | Expand skill detail |
| Tap | Deadline row | Push to Goal Detail or expand inline |
| Tap | SIA coaching note | Navigate to SIA tab |
| Tap | Domain level badge | Push to RPG Character Screen (screen 19) |
| Swipe left | Action card | Skip action |
| Long-press | Action card | Options (reschedule, modify, ask SIA why) |
| Long-press | Deadline row | Edit/reschedule |
| Pull-to-refresh | Entire ScrollView | Refresh all career data |
| Swipe right from edge | Screen | iOS back gesture |
| Horizontal scroll | Skills row | View additional skills |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Goal cards | Screen enter | Staggered fade-in, 80ms apart | 280ms each | ease-out-soft |
| Progress rings | After goal card enters | Ring fill animates from 0 to actual % | 520ms | ease-flow |
| Action cards | Scroll into view | Staggered fade-in, 60ms per card | 280ms each | ease-out-soft |
| Checkbox completion | Tap | Fill animation (circle collapses inward to filled) | 280ms | ease-out-soft |
| XP float | After checkbox complete | "+15 XP" floats upward 24pt + fades out | 520ms | ease-flow |
| Action strikethrough | After checkbox complete | Opacity 100% → 50%, strikethrough line draws | 280ms | ease-out-soft |
| Skills card | Scroll into view | Fade-in, pills stagger 60ms each | 280ms | ease-out-soft |
| Deadline rows | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "Let's map out your career path. What are you working toward professionally?"
- Active goals: "No career goals yet." Orange "add a career goal" button. SIA suggestion chips: "get promoted", "learn a new skill", "switch careers", "improve work-life balance".
- Suggested actions: SIA generates 2-3 starter actions based on onboarding data (e.g., "Write down your top 3 professional strengths").
- Skills snapshot: "Tell SIA about your skills to start tracking your growth." Single orange "get started" button that navigates to SIA with career context.
- Upcoming deadlines: Section hidden (no data to show).

### Established user (zero state)
- All actions completed: "All caught up. SIA will suggest new actions tomorrow." Green checkmark illustration. SIA note: "Great momentum this week."
- No upcoming deadlines: Section hidden.

---

## Motivation Adaptation

- **Low motivation**: Only SIA note + top 1 goal + top 2 actions shown. Skills and deadlines sections hidden. SIA tone: "Here's one thing you could do for your career today."
- **Medium motivation**: Default experience. 2 goals, 3 actions, skills visible, 2 deadlines.
- **High motivation**: All goals shown (no "view all" cap). All actions shown with additional detail (SIA reasoning visible inline). Skills card shows historical trend (level 3 → 7 over 6 months). Deadlines section expanded with preparation suggestions from SIA.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain header accent line | — | — | 2pt height | — | #6366F1 |
| Level badge | Sora | Semibold | 12pt | 16pt | white at 70% |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| "ask SIA" link | Sora | Regular | 13pt | 18pt | white at 50% |
| Section eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| Goal name | Sora | Semibold | 16pt | 22pt | white 100% |
| Goal completion count | Sora | Regular | 13pt | 18pt | white at 50% |
| Goal next action | Sora | Regular | 15pt | 20pt | #FF5E00 |
| Progress ring percentage | Sora | Bold | 11pt | 14pt | white 100% |
| Action description | Sora | Regular | 15pt | 20pt | white 100% |
| Action type tag | Sora | Semibold | 11pt | 14pt | white at 40%, uppercase |
| Action XP reward | Sora | Semibold | 13pt | 18pt | #FF5E00 |
| Skill pill name | Sora | Semibold | 13pt | 18pt | white 100% |
| Skill pill level | Sora | Bold | 20pt | 26pt | white 100% |
| SIA assessment text | Sora | Regular | 15pt | 20pt | white at 70% |
| Deadline event name | Sora | Semibold | 16pt | 22pt | white 100% |
| Deadline date + countdown | Sora | Regular | 13pt | 18pt | white at 50%; proximity tint #FF5E00 (3–7d) / #f44336 (<3d, paired with "!" glyph + "soon" word — never colour-alone); urgency is conveyed by the day-count + proximity glyph + word, not text colour (see Visualization S32-V04) |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Career goals fail to load | Goal cards show skeleton shimmer; after timeout: "Could not load goals" | Pull-to-refresh |
| AI suggested actions fail to load | Action cards show skeleton shimmer; fallback: "SIA is thinking..." placeholder | Pull-to-refresh or auto-retry |
| Action checkbox sync fails | Checkbox shows red ring flash; reverts to unchecked; toast: "Could not save. Try again." | Error haptic; user retries tap |
| Skills data fails to load | Skills card shows shimmer; fallback: "Could not load skills" | Pull-to-refresh |
| Deadlines fail to load | Section hidden (no partial state shown) | Pull-to-refresh |
| SIA coaching note fails | Card hidden entirely | Pull-to-refresh may reload |
| Pull-to-refresh fails | Standard refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls again |
| Action swipe-to-skip fails | Row slides back to original position; toast: "Could not skip action" | User retries swipe |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Career and work, Level 5"
- Level badge: "Career level 5, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Career goal cards: "[Goal name], [completed] of [total] actions done, [percentage] percent, Next: [action], button"
- Progress ring: "[Percentage] percent complete"
- Action checkboxes: "[Action description], [uncompleted/completed], [type] type, plus [XP] XP, checkbox"
- Skill pills: "[Skill name], level [number]"
- SIA assessment: "[Assessment text]"
- Deadline rows: "[Event name], [date], [countdown] days away, button"
- Urgent deadlines: "[Event name], urgent, [countdown] days away"

**Focus order:**
1. Back button → Domain title → Level badge
2. SIA coaching note card
3. Active goals eyebrow → goal cards in order (each: progress ring, name, next action)
4. Suggested actions eyebrow → action cards in order (each: checkbox, description, type, XP)
5. Growth trajectory eyebrow → skill pills (horizontal scroll) → SIA assessment
6. Upcoming eyebrow → deadline rows in order

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Swipe-left on action card to skip; also available via long-press options menu
- Skill pills horizontally scrollable; VoiceOver swipe-right traverses all pills
- Pull-to-refresh reloads all career data
- All touch targets meet 44pt minimum
- Deadline urgency conveyed via text ("X days away") not just color change
- Checkbox completion state conveyed via VoiceOver trait, not just visual strikethrough

---

## Cross-References

- **Navigates to**: Screen 14 — Goal Detail (tap career goal, stack push), Screen 15 — Create/Edit Goal (tap "add career goal", modal), Screen 09 — SIA Chat (tap SIA note, tab switch), Screen 19 — RPG Character Screen (tap level badge, stack push)
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Domain Header, SIA Coaching Note patterns), Screen 33 — Relationships Dashboard (Domain Header, SIA Note, action-oriented layout), Screen 34 — Spirituality Dashboard (Domain Header, SIA Note). All domain dashboards share these patterns.
- **Patterns used**: Domain Dashboard Header, SIA Coaching Note Card, Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model
- **Patterns established**: Career Goal Card (with progress ring and next action), AI Action Card (checkbox + description + XP), Skills Snapshot Card (skill level pills), Deadline Row (countdown timer with urgency states), XP Float Animation (earned XP rising and fading)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-11.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/career`
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
| B11-F10 | critical | retention | Render suggested actions as semantic completable rows with XP feedback, undo, skip/reschedule, failure recovery, and SIA explanation states. |
| B11-F11 | major | navigation | Make skill pills and deadline rows semantic controls with detail, goal links, edit/reschedule actions, and contextual SIA routing. |
| B11-F12 | minor | mobile-ergonomics | Expand compact text-link and level-badge hit areas to at least 44px high. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

