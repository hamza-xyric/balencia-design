# Screen Design: Relationships Dashboard

**Screen**: 33 of 73
**File**: 33-relationships-dashboard.md
**Register**: Product Mode
**Primary action**: log quality time
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Relationships Dashboard). Also reachable via SIA deep-link.

---

## Purpose

The relationships dashboard helps users nurture their personal connections through intentional tracking and AI-powered reminders. Unlike the metric-heavy finance or career dashboards, this screen is people-centric — organized around the humans in the user's life rather than abstract data points. SIA acts as a relationship coach, reminding users when they have been out of touch with someone, suggesting quality time activities, and connecting relationship health to other life domains ("You tend to feel more energized after time with close friends — you haven't seen anyone socially in 10 days").

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with pink accent and relationship level
2. SIA relationship coaching note — cross-domain connection insight
3. AI reminders — proactive nudges about neglected connections
4. Key people — the user's important relationships with last interaction dates
5. Quality time log — recent entries (who, activity, duration)
6. Suggested activities from SIA
7. Important upcoming dates — birthdays, anniversaries

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link in chat (screen 09)
- **Primary exit**: Quality time log entry (modal/sheet for logging), SIA tab (for relationship advice)
- **Secondary exits**: Goal Detail (screen 14, for relationship-tagged goals), person detail (inline expansion)

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2.5 viewport heights)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Relationships      Lv.6  ⚡ │  Domain Header (56pt)
│     pink accent bar             │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (~72pt)
│ │ "You feel more energized    │ │
│ │  after time with friends.   │ │
│ │  You haven't seen anyone    │ │
│ │  socially in 10 days."      │ │
│ └─────────────────────────────┘ │
│                                 │
│  check in                       │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ⚠ It's been 2 weeks since  │ │  Reminder Card (~56pt each)
│ │   you connected with Ahmed  │ │
│ ├─────────────────────────────┤ │
│ │ ⚠ Mom's birthday is in     │ │
│ │   3 days                    │ │
│ └─────────────────────────────┘ │
│                                 │
│  key people                     │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ [👤] Sarah                  │ │  Person Row (~64pt each)
│ │      wife · 2 days ago      │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Ahmed                  │ │
│ │      friend · 14 days ago   │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Mom                    │ │
│ │      family · 5 days ago    │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Ali                    │ │
│ │      colleague · 1 day ago  │ │
│ ├─────────────────────────────┤ │
│ │  + add person               │ │
│ └─────────────────────────────┘ │
│                                 │
│  recent quality time            │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ☕ Coffee with Ahmed        │ │  Log Entry (~56pt each)
│ │   May 6 · 45 min            │ │
│ ├─────────────────────────────┤ │
│ │ 🍽 Dinner with Sarah        │ │
│ │   May 18 · 1.5 hrs          │ │
│ ├─────────────────────────────┤ │
│ │ ··· view all                │ │
│ └─────────────────────────────┘ │
│                                 │
│  sia suggests                   │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 💡 "Call Ahmed this week.   │ │  Suggestion Card (~64pt)
│ │    You always feel better   │ │
│ │    after catching up."      │ │
│ │           [do it] [skip]    │ │
│ └─────────────────────────────┘ │
│                                 │
│  upcoming dates                 │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 🎂 Mom's birthday          │ │  Date Row (~48pt each)
│ │    May 23 · 3 days away     │ │
│ ├─────────────────────────────┤ │
│ │ 💍 Anniversary with Sarah   │ │
│ │    Jun 12 · 23 days away    │ │
│ └─────────────────────────────┘ │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘

    [+ Log time]  ← FAB (56pt, bottom-right, above tab bar)
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Relationships" title (20pt Sora Semibold), level badge ("Lv.6"), XP icon, 2pt pink (#EC4899) accent line at bottom

2. **SIA Coaching Note** — ~72pt
   - Purpose: Cross-domain relationship insight
   - Content: Purple left bar, SIA avatar, coaching message, "ask SIA →" link

3. **AI Reminders Section** — ~112pt (2 reminders)
   - Purpose: Proactive nudges about neglected connections and upcoming dates
   - Content: Warning icon (orange) + reminder text + actionable suggestion

4. **Key People List** — ~320pt (4 people + add button)
   - Purpose: The user's important relationships
   - Content: Avatar, name, relationship label, last interaction date

5. **Quality Time Log** — ~128pt (2 entries + "view all")
   - Purpose: Recent quality time entries
   - Content: Activity icon, description, date, duration

6. **SIA Suggestions** — ~64pt
   - Purpose: AI-generated activity recommendations
   - Content: Suggestion text with "do it" (orange) and "skip" (gray) action buttons

7. **Upcoming Dates** — ~96pt (2 items)
   - Purpose: Important relationship dates (birthdays, anniversaries)
   - Content: Event icon, person/occasion name, date, countdown

8. **FAB (Log Quality Time)** — 56pt
   - Purpose: Quick-add quality time entry
   - Content: "+" icon, orange, positioned bottom-right above tab bar

---

## Components

### AI Reminder Card
- **Purpose**: Proactive nudge from SIA about relationship maintenance
- **Data source**: SIA AI engine (relationship analysis, last-interaction tracking)
- **Visual treatment**: Inside a card container (ink-brown-800, 20pt border-radius). Left: orange warning icon (20pt) in a 32pt circle with orange at 15% background. Text: reminder message (15pt Sora Regular, white). Each reminder is a row separated by 1pt divider (white at 5%). Right edge: chevron (12pt, white at 30%) indicating tappable.
- **Variants**: Connection reminder ("It's been X days since you connected with [person]"), date reminder ("Mom's birthday is in 3 days"), milestone ("Your 5th anniversary with Sarah is next month")
- **Gestures**: Tap → options bottom sheet (log interaction, set reminder, dismiss). Swipe left → dismiss reminder. Swipe right → mark as done (logged interaction).
- **Size**: Full-width - 32pt × ~56pt per reminder

### Person Row
- **Purpose**: Key relationship at a glance
- **Data source**: Relationships API (people list with last interaction dates)
- **Visual treatment**: Inside a card container. Each row: left — avatar circle (40pt diameter, photo if available, initials on pink at 15% background if no photo). Center — name (16pt Sora Semibold, white), relationship label + last interaction (13pt Sora Regular, white at 50%, e.g., "friend · 14 days ago"). At > 14 days the row carries a calm reach-out nudge — the per-row 48px connection-strength `GaugeRing` at its desaturated muted-foot plus a visible glyph + word ("reach out"), and the last-interaction string tints orange (never red, never colour-alone, never framed as a "warning"). Right edge: chevron (12pt, white at 30%). Rows separated by 1pt divider (white at 5%). Bottom: "+ add person" link (15pt Sora Regular, orange).
- **Variants**: Recent (< 7 days — neutral, "in touch"), steady (7-14 days — neutral), reach out (> 14 days — orange "X days ago" with a visible glyph + word "reach out", never red, never a "neglected" verdict), no photo (initials avatar)
- **Gestures**: Tap → expand inline showing recent interactions with this person, suggested activities, and "log time" shortcut. Long-press → edit person (name, relationship, photo). Tap "add person" → add person bottom sheet.
- **Size**: Full-width - 32pt × ~64pt per row

### Quality Time Log Entry
- **Purpose**: Record of intentional time spent with someone
- **Data source**: Relationships API (quality time log endpoint)
- **Visual treatment**: Inside a card container. Each row: left — activity icon (20pt, within 32pt circle, pink at 15% background). Center — description (16pt Sora Semibold, white, e.g., "Coffee with Ahmed"), date + duration below (13pt Sora Regular, white at 50%). Rows separated by 1pt divider. "View all" link at bottom (15pt Sora Regular, orange).
- **Variants**: Standard (description + date + duration), with reflection (small book icon indicating user wrote a reflection), with mood (emoji indicator)
- **Gestures**: Tap → expand to show full details (activity, who, duration, reflection if any, mood). Long-press → edit entry. Tap "view all" → full log list (likely a new FlatList within this stack).
- **Size**: Full-width - 32pt × ~56pt per entry

### SIA Suggestion Card
- **Purpose**: AI-generated activity recommendation for relationship building
- **Data source**: SIA AI engine (relationship suggestions based on patterns)
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Left: lightbulb icon (20pt, orange). Suggestion text (15pt Sora Regular, white). Below: two buttons side by side — "do it" (compact pill, orange background, white text, 13pt Sora Semibold, ~80pt wide × 36pt) and "skip" (compact pill, transparent, white at 50% text, 13pt Sora Semibold, same size).
- **Variants**: Standard (activity suggestion), contextual ("It's been X days since..." + activity), cross-domain ("Exercising together could help both fitness and this relationship")
- **Gestures**: Tap "do it" → creates action (schedules it or opens log entry pre-filled). Tap "skip" → dims card with "skipped" label, SIA notes preference. Tap suggestion text → navigate to SIA for more context.
- **Size**: Full-width - 32pt × ~64pt

### Upcoming Date Row
- **Purpose**: Important relationship dates with countdown
- **Data source**: Relationships API (important dates), user-entered
- **Visual treatment**: Inside a card container. Each row: left — event icon (20pt: 🎂 for birthday, 💍 for anniversary, 📅 for other). Center — event name (16pt Sora Semibold, white), date + countdown (13pt Sora Regular, white at 50%). Countdown tints calm orange when < 7 days; < 3 days stays orange with bold weight for emphasis — **never alarm-red** on a person or relationship date (urgency lives in orange + words). Rows separated by 1pt divider.
- **Variants**: Far (>7 days — neutral), approaching (3-7 days — orange countdown), imminent (<3 days — orange countdown, bold text, never red), today ("today" in green with celebration icon)
- **Gestures**: Tap → expand with SIA gift/activity suggestion for the occasion. Long-press → edit date.
- **Size**: Full-width - 32pt × ~48pt per row

### Add Person Bottom Sheet
- **Purpose**: Add a new person to the key people list
- **Data source**: User input
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners). Drag handle. Title: "add someone important" (20pt Sora Semibold). Fields: name (text input, standard pattern), relationship label (selector chips: "partner", "family", "friend", "colleague", "other"), photo (optional, camera/gallery picker). Save button: orange pill CTA.
- **Variants**: Single state
- **Gestures**: Fill fields, tap save → adds person to list. Drag down → dismiss.
- **Size**: Full-width × ~320pt

### Log Quality Time Bottom Sheet
- **Purpose**: Record time spent with someone
- **Data source**: User input, people list (for person selector)
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners). Drag handle. Title: "log quality time" (20pt Sora Semibold). Fields: person selector (horizontal scroll of avatar chips from key people list), activity description (text input), duration (time picker or preset chips: "15 min", "30 min", "1 hr", "2+ hrs"), reflection (optional text area: "how did it feel?"). Save button: orange pill CTA.
- **Variants**: Standard, pre-filled (from tapping a suggestion card or person row shortcut)
- **Gestures**: Select person chip, fill fields, tap save. Drag down → dismiss.
- **Size**: Full-width × ~400pt

---

## Visualization

> Source: embedded section (Batch 4 — no companion file); Audited in `viz-audit/` — Batch 4 (Domain-Dashboard A), findings `S33-V01..V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant** (relationships-pink `#EC4899` stays an *identity* accent on the header line, RPG badge, and avatar/icon chip backgrounds only — **never** on data ink). Benchmark = **Dex / Monaru** (relationship-CRM cadence + connection strength) rendered **the Balencia way** (Living Line + warm glow), not a CRM clone. **HEAVY non-shaming law:** a neglected relationship is a *gentle nudge to reach out*, never a guilt grid, a loss-aversion streak, or an alarm — there is **no red, no "broken streak," no countdown-of-shame on a person** anywhere in this section. **Current grade D (52) → specced-target A− (85).** *(Honest re-grade under the 10-dimension rubric; the residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

This is a **people-centric Domain-Dashboard** — the humans stay the content focus; visualization makes *connection health* legible without turning people into a leaderboard. Today the prototype (`/domains/relationships`) renders as a **pure text dashboard**: every datum is a text/icon row, the only signal is `text-brand-orange` on a fading person's "14 days ago" string (colour-leaning, no visible non-colour status), there is **no hero, no cadence visual, no connection-strength visual, no trend** — a flat list, hence the D. This section upgrades *how the data reads* — a quality-time KPI strip, a per-person connection-strength `GaugeRing` (the one viz hero), an honest per-person outreach-cadence `CalendarHeatmap`, and a Living-Line communication-frequency trend — **without** displacing the people list, the SIA note, or the reminders, which remain the primary *content*. Mints **no new primitive**; it composes the frozen kit (`KPIStatTile`, `GaugeRing`, `CalendarHeatmap`, `TrendChart`, `Sparkline`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Quality-time this week (hours / sessions / people seen) | not shown (only a per-entry log) | **KPI strip** — number + uppercase label + honest WoW delta arrow over a fixed "vs last week" window | `KPIStatTile` ×3 (`VK-008`) |
| Per-person **connection strength** (0–99, from recency + frequency + reciprocity) | implied only by "X days ago" text | **hero connection-strength `GaugeRing`** (96px, arc-gradient, warm glow, inset track) for the *focused* person + 48px gauges per key-person row | `GaugeRing` (`VK-002`) |
| Per-person **outreach cadence** (contact frequency over trailing weeks) | "14 days ago" string only | **cadence `CalendarHeatmap`** (intensity = touchpoints/week) per person or aggregate; gentle "open week" framing | `CalendarHeatmap` |
| **Communication-frequency trend** (interactions/week, last 6 weeks) + SIA outlook | not shown | **Living-Line `TrendChart`** — solid orange actual → dashed-purple SIA forecast of next reach-out window | `TrendChart` (`VK-006` / `VK-016`) |
| Per-person recent-trajectory micro-trend (high-motivation tier) | not shown | optional `Sparkline` (7-pt Living Line) inside the expanded person row | `Sparkline` (`VK-001`) |
| Reminders ("2 weeks since Ahmed", "Mom's birthday in 3 days") | warning-icon text rows | — (deliberately textual — these are *nudges*, not metrics; a chart would weaponise them) | — |
| Quality-time log entries (activity · date · duration) | text rows | — (deliberately textual — the log is a record, not a series; its *aggregate* is the KPI strip) | — |
| Upcoming dates + countdown | text rows w/ orange `<7d` | — (deliberately textual; countdown is an event, not a trend — **and the spec's `<3d` red is dropped here: no alarm-red on people**, see brand block) | — |
| SIA note · person names · relationship labels · level | text | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the people list + SIA coaching note stay the screen's *content* focus; the **connection-strength `GaugeRing` is the one viz hero**; the KPI strip + cadence heatmap + communication trend are clearly secondary; the per-person sparkline is ambient (high-motivation only). Four charts, one focal — not a wall of equal charts, and **never** a competitive scoreboard of humans.

### 1 · Quality-time KPI strip — `S33-V01` → `KPIStatTile` ×3

A `KPIStatTile` row summarising the week's *intentional time*, sitting under the SIA note / above the people list: uppercase label (`white/40`, +0.12em) · number `text-h2` · **delta arrow** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) over a **fixed, disclosed window** ("vs last week"). Tiles: **Quality time** (e.g. `4.5h`), **Sessions** (e.g. `3`), **People seen** (e.g. `2`). Source: a derived `relationshipsDashboard.week` aggregate over `qualityTime` (durations summed) + a new `week.lastWeek` block added to `mock.ts` so the delta is real, not invented — this also surfaces the high-motivation copy already in the spec ("4.5 hours with friends this week, up from 2 hours last week") as an honest visual instead of a sentence.
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium; depth lives in the gauge).
- **Micro-interaction:** tap a tile → the "view all" quality-time list (carries the existing route).
- **States:** Day-1 / no log → all three read `0` with a `—` delta (honest: no prior week, **not** a fabricated ▲); loading → label + skeleton number bar.
- **Non-shaming:** a ▼ delta is a **neutral muted arrow**, never red, never "you're slipping" language — a quieter week is framed as room to reconnect, not failure.

### 2 · Connection-strength hero gauge — `S33-V02` → `GaugeRing` (96px hero + 48px per row)

Promote per-person **connection strength** (0–99, a recency + frequency + reciprocity composite) from an implied "X days ago" string to the screen's **one viz hero**. The hero is a 96px `GaugeRing` for the *focused* person (the top key-person, or whoever the user taps open), with an **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, center value (`text-h2`, count-up 520ms `--ease-flow`) + the person's name/relationship label, and **`ticks`** (12 radial ticks, hero score gauge). Each **key-person row** carries a compact **48px `GaugeRing`** (`--glow-orange-md` ~20px **(mint)**, 4px stroke) replacing the bare last-interaction string as the at-a-glance strength signal.
- **Why a gauge, the Balencia way:** Dex/Monaru rank contacts in a strength *list*; we render the same bounded score as our own warm-glow `GaugeRing`, so connection strength reads as the **same instrument family** as every domain score, recovery, and sleep across the app — not a borrowed CRM strength bar, and not a ranked scoreboard of people.
- **Non-shaming banding (the critical departure from the spec's red):** **green `#34A853` = thriving/in-touch, orange `#FF5E00` = the default working state, a desaturated warm `--color-alpha-white-40` low foot = "time to reach out"** — paired with a **visible glyph + word** (✓ "in touch" / ~ "steady" / a gentle wave/hand glyph "reach out"), **never colour alone and never an alarm red.** A low gauge shows the *reach-out lever* (a "say hi" / "log time" affordance), not a danger state — a person is never recoloured into a red warning.
- **Depth:** hero + row gauges share the inset-track + arc-gradient language; only the 96px hero carries the 32px glow (48px = md ~20px, never the hero glow — that would swamp it).
- **Micro-interaction:** tap a 48px row gauge → expands the person row in place (the existing expand behaviour) and re-targets the 96px hero to that person; the expand reveals the cadence strip (V03) + optional sparkline (below).
- **States:** **cold-start / brand-new person** (no interaction history yet) → a **ghosted dashed arc** + "getting to know this connection" — *no-data ≠ a real 0%*, and a 0% on a person is forbidden (it would read as a verdict); **loading** → skeleton arc with radial shimmer that morphs into the drawn fill; **error** → ghosted arc + inline "retry"; **established zero-activity** → gauge at its steady foot + a warm "reach out" lever, never an empty/alarm ring.
- **Data:** new `relationshipsDashboard.people[].strength` (0–99) + the composite inputs in `mock.ts`.

### 3 · Outreach-cadence heatmap — `S33-V03` → `CalendarHeatmap`

A `CalendarHeatmap` (deployed component — reuse as-is, `tone="brand"`) of **outreach cadence** — touchpoints per week over the trailing weeks — shown per-person inside the expanded row (and/or as an aggregate "your connection rhythm" strip): **5 intensity steps** (`--color-alpha-white-05` → full `--color-brand-orange`), today = dashed border, tap = `scale-110`. Uses **orange (the brand consistency tone), not relationships-pink** — domain colour is identity-only, and cadence is a consistency signal, so orange is correct (the component's only tones are `brand`/`creativity`/`learning`, confirming this).
- **Why the heatmap, not a streak counter:** cadence is *rhythm*, not a chain — a heatmap shows the texture of staying in touch (a warm week here, a quiet week there) **without** a single number to "break."
- **Non-shaming (load-bearing here):** an empty cell reads as an **"open week,"** never a guilt cell; there is **no streak count, no "you broke a 6-week streak," no loss-aversion countdown** on contacting a human (the Gentler-Streak thesis, applied to people — the strictest place in the app for it). Quiet stretches are framed by SIA as a gentle invitation, surfaced via the existing reminders, not by reddening the grid.
- **States:** **Day-1 / new person** → empty grid + "your rhythm with [name] starts here" (today cell dashed), **not** a wall of absence; **loading** → cells shimmer in place; **partial** → un-synced weeks ghosted, distinct from a true "open" (zero-touch) week.
- **Data:** new `relationshipsDashboard.people[].cadence` (week → touchpoint count) in `mock.ts`.

### 4 · Communication-frequency trend (Living Line) — `S33-V04` → `TrendChart` (`VK-016`)

The signature: a full **Living Line** of **interactions/week across all key people** (or the focused person) over the last 6 weeks — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on reconnection weeks (a re-engaged fading tie), a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *not* a 60/30/10 violation) gently projecting the next reach-out window. Curved monotone, `--stroke-thin` 2px (actual) / 2px dashed (projection).
- **Why the line, not a CRM activity bar:** "every chart is the line" (§8) — the Living Line is the device Dex/Monaru structurally don't have; it makes the trend unmistakably Balencia and reuses the exact spine of the home-screen sparklines. It frames connection as a *flow over time*, which is inherently kinder than a per-person scorecard.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; the dashed-purple projection draws after the actual line; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across weeks; W/M selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`).
- **States:** cold-start (<2 weeks of data) → "calibrating — building your connection rhythm" with a faint flat baseline, **never** a single dot or a fake 0; projection hidden until SIA has enough data; reduced-motion → completed stroke at rest + green end dot + static dashed-purple tail.
- **Data:** new `relationshipsDashboard.commTrend` (6 weekly points + `projection`) in `mock.ts`.

### 5 · Per-person micro-trend sparkline — `S33-V05` → `Sparkline` (`VK-001`)

**High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, `--stroke-thin` 2px orange, curved, 64×24, **no axes / no grid / no glow**, green end dot when the latest week is a reconnection/arrival) inside the **expanded person row**, showing that person's recent touchpoint trajectory at a glance beside their 48px strength gauge.
- **Non-shaming:** a declining sparkline is framed as momentum to *renew*, never a downward "you're losing them" verdict; no signed-delta red tint.
- **States:** <5 points → omitted (no degenerate 2-dot line); loading → skeleton line; reduced-motion → completed stroke + end dot.
- **Data:** derived from the same `people[].cadence` series (last 7 weeks).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px connection-strength `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up — **then** the per-row 48px gauges fill → **then** the KPI strip counts up (280ms) → **then** (below fold, on scroll-into-view) the communication **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last → **then** the cadence heatmap cells stagger in → **then** any expanded-row sparkline draws on expand. One line motif per surface (the comm trend is the only full Living Line; the sparkline is a separate ambient micro-line inside an expanded row, never co-present in the same frame as the trend). `prefers-reduced-motion` → every chart at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail) and the gauges' filled arcs preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — no people yet → the gauge/heatmap/trend slots are *absent*, not degenerate, behind the existing "Add the people who matter" prompt (a ghosted 0% gauge on a non-existent person is forbidden); first person added → strength gauge ghosted-dashed "getting to know this connection," cadence "your rhythm starts here," KPI deltas read `—` (no prior week); **loading** — depth-preserving skeletons that *morph* into drawn data (arc/axes/cells visible, radial / L-to-R shimmer — never blank discs); **partial** — un-synced cadence weeks ghosted, distinct from a true open week; a person with sparse history shows a ghosted gauge, never a real low score; **error** — chart-specific honesty (which viz failed: "Could not load connection data" on the gauge, trend independent) + a visible "retry", consistent with the Error Handling table (people-list / quality-time / SIA failures already specified there).
- **60/30/10:** **orange dominates** data ink (connection-strength gauge fills, Living-Line effort, KPI accents, cadence-heatmap intensity, all interactive text — FAB / "do it" / "add person" / "view all"); **green** = arrival/in-range only (a thriving connection's in-touch band, milestone reconnection dots, ▲ deltas, the existing "today" date marker, logged-interaction success glow); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on the communication trend (§11 forecast, correct *not* a violation) plus the existing SIA-note left bar / avatar; **relationships-pink `#EC4899`** is confined to **identity** (header accent line, RPG level badge, avatar-initials and activity-icon chip backgrounds) — **never** on a CTA, eyebrow, gauge fill, line, or any data series. **The spec's alarm-red (`#f44336`) `<3d` countdown and `>14d` red framing are explicitly dropped from all visualizations** — no person and no relationship metric is ever rendered red; urgency lives in calm orange + words, never alarm colour. Glow uses the size-stepped scale (96px = 32px hero glow, 48px = md ~20px, sparklines/heatmap = none) — warm depth, not neon.
- **Accessibility:** every gauge / heatmap / line / sparkline carries a text/`aria-label` equivalent conveying the same value ("Connection with Sarah, strength 82, in touch"; "Reached out 3 times this week, up from 1"); connection status uses a **visible glyph + word** (✓ "in touch" / ~ "steady" / wave "reach out") **plus** the band tint — never colour alone (the current `text-brand-orange`-only fading signal is upgraded to glyph + word); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arcs, the Living-Line stroke, milestone dots, heatmap cells, and the filled/unfilled boundary all meet ≥3:1 vs background (white/5 grid/axis is decorative-only); interactive chart targets (row gauges, heatmap cells, KPI tiles, trend scrub) ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved. **Non-shaming is an accessibility-of-dignity gate here:** no metric is ever announced as a verdict on the relationship or the user's worth.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Monica CRM + Dex (relationships tracked warmly, never red on a person) — *stays Balencia via warm-glow surfaces, the connection-strength `GaugeRing` hero, the Living-Line communication trend, and non-shaming reach-out language.*

**Pre-grade:** B+ (76) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: The visualization layer (§Visualization) establishes the data hero (the connection-strength gauges, the Living-Line communication trend, the KPI strip, the cadence heatmap) at A− depth. The craft gap is in the surrounding surfaces, copy, and states: (1) non-chart card surfaces lack the layered warm-glow depth (no edge-highlight, no inset tracks, cards read flat on `ink-900`); (2) reminder and person rows use orange text alone for "reach out" framing, missing the visible glyph + word (a 1.4.11 colour-alone miss); (3) edge microcopy (cold-start, loading, error, permission rationale on the reminder swipe-dismiss gesture) is partly unspecified; (4) the "reach out" and "approaching date" orange framings could be rewritten to lead with constructive invitation, not a deficit framing; (5) no state-craft table; (6) type line-heights are ad-hoc, tracking unspecified; (7) the five-state matrix (cold-start / loading / empty / error / offline) is designed verbally but not tabulated.

### Focal hierarchy

One focal point: the **96px connection-strength `GaugeRing` for the focused person** (the hero, when a person row is tapped to expand) — the one ≥96px glowing element on the expanded-row detail area. On the default (un-expanded) dashboard, the focal point is the section composition itself: the **SIA Coaching Note sits at the top** (warm preamble, emotionally distinct via purple left bar, not glowing), immediately followed by the **KPI strip** (the three `KPIStatTile`s with honest deltas — the first visual signal of weekly progress) and the **hero 96px `GaugeRing`** for the focused/top person (if any), sitting slightly above the people list. This resolves the IA's "people-centric" directive: the humans (the people list + SIA note) stay the content focus, while the 96px gauge is the *one visual anchor* that lifts the screen from flat text. Everything below (per-row 48px gauges, reminders, quality-time log, upcoming dates) is visibly secondary by size, glyph, and depth. The squint test lands on the SIA note + KPI numbers + the hero gauge + the person names in that order — no competing foci.

### Surface & depth

Every card and row adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt for primary cards; `--radius-lg` 20pt for reminder/person rows) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue — present on all cards today) · `--shadow-1`. The SIA Coaching Note card and the KPI strip add `--surface-backplate` (`CK-T02`). The connection-strength `GaugeRing` hero (96px, when visible) carries `--glow-orange` (32px /.45); the per-row 48px gauges carry `--glow-orange-md` (~20px /.40); the 36px activity-icon circles and reminder warning icons carry `--glow-orange-sm` (~12px /.35) only when active (a fresh log, a dismissed reminder's brief success flash); no glow on inline elements. All gauge/heatmap/sparkline tracks recess over `--track-inset` (`rgba(0,0,0,0.28)`) bevels — a depth pass that lifts every chart primitive on the screen. Fixes the prior issue of reminder cards and person rows reading as flat `ink-brown-800` boxes on `ink-900` — now they all carry the layered language so the screen reads as a crafted dashboard, not a generic text list.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: domain header title "Relationships" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; SIA coaching message and reminder text `--text-body` (16pt, raised from the spec's 15pt to the standard step) / 400 / `--leading-normal` (1.4); person names `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; person relationship label + last-interaction date `--text-caption` (13pt) / 400 / `--leading-normal` / white 50% (or white 50% → orange accent + visible glyph when "reach out" is active); quality-time description `--text-h3` (17pt) / 600 / white 100%; quality-time date + duration `--text-caption` (13pt) / 400 / white 50%; eyebrow labels ("check in", "key people", etc.) the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); action links ("ask SIA →", "+ add person", "view all", "do it", "skip") `--text-h3` or `--text-body` weight / 600 / `--color-brand-orange` — no additional size accent beyond bold. All stat figures (strength gauge %, connection days, upcoming countdown) tabular-nums. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout; ≤2 `--color-brand-orange` accent words on the screen (the FAB "+" and one link, such as "view all" or "do it"). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice (warm, plain, coaching, non-shaming, no exclamation marks). Specific authored microcopy per area:

- **SIA Coaching Note** — *before* (spec): "You feel more energized after time with friends. You haven't seen anyone socially in 10 days." → *after (kept):* same; warm, specific to the user's data. (Already on-voice.)
- **AI Reminder Card, connection nudge** — *before:* "It's been 2 weeks since you connected with Ahmed" (neutral but bare) → *after (reframed):* "Ahmed on your mind? 2 weeks since you last connected" (invitation-first, not deficit-first; still honest about the time gap).
- **AI Reminder Card, upcoming date** — *before:* "Mom's birthday is in 3 days" → *after (kept):* same; factual, no urgency language. (Already on-voice.)
- **Person Row, reach-out nudge visual** — *before:* "14 days ago" in orange text only (colour-alone, 1.4.11 miss) → *after (new, a11y):* a visible **glyph + word** ("💌 reach out" or "👋 say hi" — the glyph is the icon from the state-craft table) paired with the orange text, never colour-alone.
- **Person Row "reach out" framing (non-shaming)** — *before:* "connection fading" (implied verdict) → *after (reframed):* "reach out" (an invitation, not a diagnosis). The accompanying gauge shows a desaturated warm foot + the glyph, framing it as a gentle lever to reconnect, not a failure.
- **Person Row, expand affordance** — *before:* no indication person rows expand → *after (new):* right-edge chevron (12pt, white 30%) indicates tappable; keyboard A11y label: "Tap to expand [person name] interactions."
- **Upcoming Date countdown, approaching (<7d)** — *before:* "3 days away" in orange → *after (kept):* same; calm, honest countdown. No red, no urgency language. The upcoming-dates section's "< 3 days" recommendation for bold weight is implemented, but never red.
- **Upcoming Date countdown, today** — *before:* no special case → *after (new):* text "today" in green (`--color-forest-green`) with a celebration icon (emoji or icon), warm and affirming.
- **Quality time log, "view all" link** — *before:* bare orange link → *after (kept):* "view all" / "view all quality time" in orange, 16pt / 600 weight. (Already on-voice.)
- **SIA Suggestion Card, "do it" and "skip"** — *before:* "do it" and "skip" as buttons → *after (kept):* same; action-first language. (Already on-voice.)
- **Bottom sheet "add person" title** — *before:* "add someone important" (warm) → *after (kept):* same. (Already on-voice.)
- **Bottom sheet "log quality time" title** — *before:* "log quality time" (spec) → *after (kept):* same; direct, warm. (Already on-voice.)
- **Loading state (reminders / people / log section)** — *before:* no message → *after (new, on-voice):* per-section loading line — such as "SIA is reading your relationships — one moment" (warm, specific to the domain).
- **Empty state, Day-1 / new user, no people added yet** — *before:* no message specified → *after (new, non-shaming):* "Add the people who matter to you. SIA will help you nurture these connections." (Invitation-first, never "You have no connections." — the screen never feels empty because the add-person affordance is prominent + warm.)
- **Error state, network failure on reminders** — *before:* section hidden → *after (new):* reminders section shows a specific error message: "Couldn't load your reminders — pull to refresh." (Never silent; gives the user a recovery action.)
- **Permission rationale (if relationship tracking requires consent / privacy explanation)** — *before:* not specified → *after (new, if applicable):* "SIA analyzes your connection history to spot when someone deserves a check-in. Your data stays private. You can disable tracking per person." (Honest, specific, non-coercive — per `CK-P5` permission microcopy rules.)

No exclamation marks; the brand period used with intent; all SIA strings stay specific to the user's own data (the coaching note is a real insight, never a horoscope); connection framing is never shaming (a person is never recoloured red, and a fading tie is an *invitation* to reconnect, not a verdict on the user).

### Motion choreography

Locked to `CK-P4` order (draw-first): **domain header fades in** + translateY(8→0) (`--dur-base` 280ms `--ease-out-soft`) → **SIA Coaching Note rises** (fade-in + translateY(12→0), 280ms, 80ms after header) → **KPI strip counts up** (`--dur-base` 280ms `--ease-out-soft`, 80ms after SIA note) → **hero connection-strength `GaugeRing`** (if visible) **fills** (arc animates, 520ms `--dur-slow` `--ease-flow`, count-up in the center, `--dur-slow`) → **reminder cards stagger in** (staggered fade-in, 60–80ms apart, 280ms each `--ease-out-soft`) → **per-row 48px gauges fill** (520ms `--dur-slow` `--ease-flow`, ~40ms stagger between rows) → **quality-time log entries fade in** (280ms, 60ms stagger) → **SIA suggestion card rises** (280ms, 12pt offset) → **upcoming-date rows fade in** (280ms, 60ms stagger). Below-fold surfaces (the cadence heatmap inside expanded rows, the per-person sparklines) animate on scroll-into-view or on expand. One line motif per surface: the communication-frequency `TrendChart` (the 6-week Living Line with dashed-purple projection) is the only full continuous stroke on this dashboard; the sparkline in an expanded row is a separate micro-line, never co-present in the same frame. `prefers-reduced-motion` → every element at final state instantly; the Living Line's static form (completed stroke, green milestone/end dots, static dashed-purple tail) and the gauges' filled arcs preserved — no essential info lost. No opacity-fade on any stroke (§8).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Header + SIA note ("Relationships shape everything. Let's add the people who matter.") + prominent "add person" button (orange pill) + no reminders / gauges / log sections (they're absent, not degenerate) + inactive hint for upcoming dates | "Add the people who matter to you."; "Start logging quality time after you add someone."; empty-state message is warm, never a loss-aversion frame | SIA note + button carry depth (edge-highlight, inset track if a progress element exists); no degenerate gauge or collapsed chart |
| Loading | skeleton preserving layout + depth — reminder rows show skeleton cards (icon outline + text shimmer), person rows show skeleton avatar circle + name/label outlines, quality-time rows show skeleton icon + title/time, all morphing into data; gauges visible as arc outlines before fills | "SIA is reading your relationships — one moment." | skeleton on `--color-ink-brown-800`, radial/linear shimmer on gauge arcs and text, morphs into drawn data (never a swap) |
| Empty / partial | un-synced people render ghosted 48px gauges (dashed/faded arc + "getting to know this connection" label); missing sections hidden (no reminder data → reminders section not rendered; no upcoming dates → section absent, not degenerate) | per-section, on-voice — such as "No reminders right now."; "No upcoming dates to track." | no-data ≠ zero (ghosted gauges, not a real 0% on a person); ghosted/dashed tracks visually distinct from a real low stat |
| Error | per-section: reminders fail → section shows error card "Couldn't load reminders. Pull to refresh."; people list fails → person rows show skeleton + an inline "retry" button; quality-time log fails → log section shows error affordance. A network error banner appears below the sticky header (if applicable). Partial failures show which sections succeeded + which failed. | "Couldn't load your reminders — pull to refresh."; "Could not load [person name]'s details — try again."; never silent | calibrated `--color-error-red` only on genuine sync failure (red border + glyph + word paired, never colour-alone); banner tone is calm, not urgent |
| Offline | all sections show cached data (the last-synced people list, reminders, quality-time log); a cached banner appears below the sticky header; pull-to-refresh is dimmed with a reason | "You're offline — showing your last sync." | actions honestly dimmed (50% opacity, no haptic); cached data is fully readable |

### Signature & anti-generic

Ownable moments: (1) the **96px connection-strength `GaugeRing` hero** with the warm-glow + inset-track + arc-gradient stroke (the same instrument family as every domain score, never a borrowed CRM strength bar); (2) the **Living-Line communication-frequency trend** (the 6-week orange→green fill + green milestone dots + dashed-purple SIA projection — the signature draw-not-fade stroke, unmistakably Balencia); (3) the **warm-glow surfaces on ink-brown-800** (edge-highlight, inset tracks, size-calibrated glows — never flat boxes); (4) the **non-shaming "reach out" language + the visible glyph + word** (a person is never red; an opportunity to reconnect is framed as a warm invitation, not a failure or a loss-aversion countdown — this is the critical ethical departure from a Monica CRM / Dex-like app that can turn people into a shame-able leaderboard). Anti-generic fixes: the vertical card stack (SIA note → KPI strip → hero gauge → reminder cards → person list → quality-time log → suggestions → upcoming dates) is broken from equal-card monotony by the KPI strip (three tiles, varied by metric, driving attention to the week's progress) and the hero gauge (the only ≥96px element, sized as a hero) — so the screen never reads as a templated list. The "reach out" framing is honest and warm, never generic platitudes such as "keep up the connection" or generic CRM language such as "engagement score." The bottom sheets (add person, log quality time) carry the same depth language as the main screen, so every surface reads as premium, not a generic modal.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Domain header title "Relationships" | `--color-alpha-white-100` | ≥12:1 on both |
| SIA coaching message | `--color-alpha-white-90` | ≥9:1 on `ink-brown-800` |
| KPI label (QUALITY TIME, SESSIONS, PEOPLE SEEN) | `--color-alpha-white-40` | ≥4.5:1 (eyebrow style, paired with position) |
| KPI number | `--color-alpha-white-100` | ≥12:1 |
| Delta arrow (▲ green / ▼ muted) | green `--color-forest-green` / white 40% | green ≥3:1 (glyph + delta word, never colour-alone) |
| Gauge arc fill (orange) | `--color-brand-orange` | 3.2:1 on `--track-inset` recess (WCAG 1.4.11) |
| Gauge arc fill (green = in-touch) | `--color-forest-green` | 3.2:1 on track (WCAG 1.4.11) |
| Reminder text | `--color-alpha-white-100` | ≥12:1 |
| Reminder warning icon | `--color-brand-orange` | 3.2:1 (glyph is load-bearing, paired with text) |
| Person name | `--color-alpha-white-100` | ≥12:1 |
| Person relationship + interaction date | `--color-alpha-white-50` | ≥4.5:1 (or orange accent + glyph when "reach out", paired) |
| Reach-out glyph + word (such as "👋 reach out") | orange `--color-brand-orange` + visible glyph | glyph + word paired (never orange text alone — resolves the 1.4.11 colour-alone miss) |
| Quality-time description | `--color-alpha-white-100` | ≥12:1 |
| Quality-time date + duration | `--color-alpha-white-50` | ≥4.5:1 |
| Upcoming date countdown (<7d, orange) | `--color-brand-orange` | 3.2:1 (glyph + text, never colour-alone) |
| Upcoming date countdown (today, green) | `--color-forest-green` | 3.2:1 (glyph + text) |
| "do it" button text | white 100% on orange bg | ≥4.5:1 |
| "skip" button text | `--color-alpha-white-50` on transparent | ≥4.5:1 |

Status never colour-alone: the "reach out" state uses an orange glyph (wave / hand / letter icon) **+ the word "reach out"**; the "in touch" state uses a green checkmark **+ the label "in touch"**; the "approaching date" state uses an orange countdown **+ a visible time number + the label** (never just orange text for the countdown). Focus-visible is standardized to `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset) on every interactive element (back button, all cards, person rows, reminder cards, log entries, buttons, upcoming date rows, FAB) — uniform app-wide. Targets ≥44×44pt (the 40pt reminder card icons + 1pt border allow for a 44pt touch box; the FAB is 56pt; person row chevron sits in a 64pt row, 44pt hit box). Keyboard A11y: person rows are semantic buttons/links with clear expand affordance; reminder swipe is a gesture alternative (long-press + context menu as the accessible alternative — the long-press shows "log interaction", "dismiss", "set reminder" options). Reduced-motion: the Living Line appears at final stroke length instantly (no draw animation), green end/milestone dots present; gauges appear at final fill instantly; all staggered entrances collapse to instant display; `prefers-reduced-motion` rendering preserves the signature static forms (the completed orange stroke + green milestone dots on the trend, the filled gauge arcs).

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| FAB (log time) | #FF5E00 | Burnt Orange | 60% — primary action |
| "Do it" button | #FF5E00 | Burnt Orange | 60% — action CTA |
| "Add person" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| "View all" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| Reach-out nudge text (>14d) | #FF5E00 | Burnt Orange | 60% — gentle reach-out nudge (orange + glyph + word), never an alarm; a person is never reddened |
| Warning icon (reminders) | #FF5E00 | Burnt Orange | 60% — alert indicator |
| Approaching date countdown (<7d) | #FF5E00 | Burnt Orange | 60% — calm approaching-date cue (orange + words), not an urgency escalation |
| Save button (bottom sheets) | #FF5E00 | Burnt Orange | 60% — primary CTA |
| Completed interaction check | #34A853 | Forest Green | 30% — success/done |
| "Today" date indicator | #34A853 | Forest Green | 30% — positive current |
| XP earned from logging | #34A853 | Forest Green | 30% — reward |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Domain header accent line | #EC4899 | Pink | Domain color — identification |
| Domain level badge XP icon | #EC4899 | Pink | Domain color — identification |
| Avatar background (no photo) | #EC4899 15% | Pink at 15% | Domain color — identification |
| Activity icon backgrounds | #EC4899 15% | Pink at 15% | Domain color — identification |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Names, headings |
| Secondary text | #FFFFFF B3 | White 70% | Descriptions |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, timestamps, labels |

**60/30/10 verification**: Orange on all interactive elements (FAB, buttons, links, calm reach-out / approaching-date cues). Green on success/completion (logged interaction, today marker, XP). Purple limited to SIA indicators — the SIA note left bar / avatar plus the brand-sanctioned dashed-purple SIA projection on the communication trend (§11). Pink only on domain identification (header accent, avatars, activity icons). **Alarm-red (#f44336) is NOT used on any person or relationship metric** — urgency lives in calm orange + words. Ratio holds.

---

## Interaction States

### Person Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer on avatar and text | — |
| Error | N/A | — |
| Success | Brief green glow (600ms) after logging time with this person | success notification |
| Expanded | Row expands downward revealing recent interactions + suggested activities | — |

### AI Reminder Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row with orange warning icon | — |
| Pressed | Background lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (after dismiss) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Green glow (600ms) after marking as done | success notification |
| Swiped left (dismiss) | Row slides left, fades out, height collapses | light impact |
| Swiped right (done) | Row turns green briefly, then fades | success notification |

### "Do it" Button (SIA Suggestion)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, white text | — |
| Pressed | Darker orange (#E55500), scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Spinner replaces text | — |
| Error | N/A | — |
| Success | Green glow (600ms), text changes to "done" briefly | success notification |

### "Skip" Button (SIA Suggestion)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent pill, white at 50% text | — |
| Pressed | White at 10% background, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Card dims to 40% opacity, "skipped" label | — |

### FAB (Log Quality Time)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 56pt orange circle, white "+" icon, --shadow-2 | — |
| Pressed | scale(0.93), darker orange, glow intensifies | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Person row | Expand inline (recent interactions, suggestions) |
| Tap | AI reminder | Options bottom sheet (log, remind, dismiss) |
| Tap | Quality time entry | Expand to full details |
| Tap | "Do it" button | Create action / open log entry |
| Tap | "Skip" button | Dismiss suggestion, SIA notes preference |
| Tap | Upcoming date row | Expand with SIA gift/activity suggestion |
| Tap | "Add person" | Open add person bottom sheet |
| Tap | FAB | Open log quality time bottom sheet |
| Tap | SIA coaching note | Navigate to SIA tab |
| Tap | Domain level badge | Push to RPG Character Screen (screen 19) |
| Swipe left | AI reminder | Dismiss reminder |
| Swipe right | AI reminder | Mark as done (logged interaction) |
| Long-press | Person row | Edit person details |
| Long-press | Quality time entry | Edit entry |
| Long-press | Upcoming date row | Edit date |
| Pull-to-refresh | Entire ScrollView | Refresh all relationship data |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Reminder cards | Screen enter | Staggered fade-in, 80ms apart | 280ms each | ease-out-soft |
| Person rows | Scroll into view | Staggered fade-in, 60ms per row | 280ms each | ease-out-soft |
| Person row expand | Tap | Height expands (0→auto) + content fades in | 280ms | ease-out-soft |
| Quality time entries | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |
| SIA suggestion card | Scroll into view | Fade-in + translateY(12pt→0) | 280ms | ease-out-soft |
| Upcoming date rows | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |
| FAB | Screen enter | Scale(0→1) + fade-in, delayed 400ms | 280ms | ease-out-soft |
| Reminder swipe dismiss | Swipe left | translateX(→ off-screen) + opacity(→0) + height collapse | 280ms | ease-out-soft |
| Reminder swipe done | Swipe right | Green flash + translateX(→ off-screen) + height collapse | 280ms | ease-out-soft |
| Bottom sheets | Open | Slide up from bottom + backdrop fade | 520ms | ease-out-soft |
| Bottom sheets | Dismiss | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| "Skip" card dim | Tap skip | Opacity → 40%, slight translateY(4pt) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "Relationships shape everything. Let's start by adding the people who matter most to you."
- AI reminders: Section hidden (no people tracked yet).
- Key people: "Add the people who matter" with prominent orange "add person" button. SIA suggestion chips: "partner", "family member", "best friend", "colleague".
- Quality time log: "No quality time logged yet. After you add people, start logging intentional time together."
- SIA suggestions: "Start by telling SIA about your closest relationships. I'll help you nurture them." Single orange "talk to SIA" button.
- Upcoming dates: Section hidden.

### Established user (zero state)
- No pending reminders: Reminders section hidden. SIA note: "You're staying connected. Keep it up."
- No recent quality time: Log section shows "No recent quality time. When did you last spend intentional time with someone?" + orange "log time" shortcut.
- No upcoming dates: Section hidden.

---

## Motivation Adaptation

- **Low motivation**: Only SIA note + top reminder + top 2 people shown. Quality time log, suggestions, and upcoming dates collapsed behind "see more". SIA tone: "Just check in with one person today."
- **Medium motivation**: Default experience. All sections visible with moderate density (4 people, 2 log entries, 1 suggestion, 2 dates).
- **High motivation**: Full people list visible (no cap). Quality time log shows all recent entries with duration analytics ("You spent 4.5 hours with friends this week, up from 2 hours last week"). SIA suggestions include cross-domain connections ("Exercising with Ahmed could boost both fitness and friendship"). Upcoming dates show preparation suggestions.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain header accent line | — | — | 2pt height | — | #EC4899 |
| Level badge | Sora | Semibold | 12pt | 16pt | white at 70% |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| "ask SIA" link | Sora | Regular | 13pt | 18pt | white at 50% |
| Section eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| Reminder text | Sora | Regular | 15pt | 20pt | white 100% |
| Person name | Sora | Semibold | 16pt | 22pt | white 100% |
| Relationship label + last interaction | Sora | Regular | 13pt | 18pt | white at 50% / #FF5E00 (>14 days — reach-out nudge, paired with a visible glyph + word, never colour-alone) |
| "+ add person" link | Sora | Regular | 15pt | 20pt | #FF5E00 |
| Quality time description | Sora | Semibold | 16pt | 22pt | white 100% |
| Quality time date + duration | Sora | Regular | 13pt | 18pt | white at 50% |
| "view all" link | Sora | Regular | 15pt | 20pt | #FF5E00 |
| SIA suggestion text | Sora | Regular | 15pt | 20pt | white 100% |
| "do it" button text | Sora | Semibold | 13pt | 18pt | white 100% |
| "skip" button text | Sora | Semibold | 13pt | 18pt | white at 50% |
| Upcoming event name | Sora | Semibold | 16pt | 22pt | white 100% |
| Upcoming date + countdown | Sora | Regular | 13pt | 18pt | white at 50% / #FF5E00 (<7d) / #FF5E00 bold (<3d, never red) / #34A853 (today) |
| Bottom sheet title | Sora | Semibold | 20pt | 26pt | white 100% |
| Bottom sheet field labels | Sora | Regular | 15pt | 20pt | white 100% |
| Avatar initials | Sora | Semibold | 16pt | 22pt | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| People list fails to load | Person rows show skeleton shimmer; after timeout: "Could not load people" | Pull-to-refresh |
| AI reminders fail to load | Reminders section hidden | Pull-to-refresh may restore |
| Quality time log fails to load | Log section shows "Could not load activity" | Pull-to-refresh |
| SIA suggestions fail to load | Suggestion card hidden | Pull-to-refresh may restore |
| Add person save fails | Bottom sheet shows inline error: "Could not save. Try again." | User retries save |
| Log quality time save fails | Bottom sheet shows inline error: "Could not save. Try again." | User retries save |
| Reminder dismiss/done sync fails | Reminder visually updates (optimistic); silent background retry | Auto-retry; reverts if sync ultimately fails |
| "Do it" action fails | Button shows brief error state; returns to default | User retries tap |
| Upcoming dates fail to load | Section hidden | Pull-to-refresh |
| SIA coaching note fails | Card hidden entirely | Pull-to-refresh may reload |
| Pull-to-refresh fails | Standard refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls again |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Relationships, Level 6"
- Level badge: "Relationships level 6, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Reminder cards: "Reminder, [message text], button" (e.g., "Reminder, It's been 2 weeks since you connected with Ahmed, button")
- Person rows: "[Name], [relationship], last interaction [time ago]" / "[Name], [relationship], connection fading, [days] days ago"
- "+ add person" link: "Add person, button"
- Quality time entries: "[Activity] with [person], [date], [duration], button"
- "view all" link: "View all quality time, button"
- SIA suggestion: "SIA suggests, [suggestion text]"
- "do it" button: "Do it, [suggestion context], button"
- "skip" button: "Skip suggestion, button"
- Upcoming dates: "[Event name], [date], [countdown]" / "[Event name], today"
- FAB: "Log quality time, button"

**Focus order:**
1. Back button → Domain title → Level badge
2. SIA coaching note card
3. Check-in eyebrow → reminder cards in order
4. Key people eyebrow → person rows in order → "+ add person"
5. Recent quality time eyebrow → log entries → "view all"
6. SIA suggests eyebrow → suggestion card → "do it" / "skip" buttons
7. Upcoming dates eyebrow → date rows in order
8. FAB (Log quality time)

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Swipe-left on reminder to dismiss; also available via tap → options bottom sheet
- Swipe-right on reminder to mark done; also available via tap → options
- Long-press on person row for edit; also available via expanded view
- Bottom sheets dismissable via drag-down or backdrop tap
- Pull-to-refresh reloads all data
- FAB accessible via scroll-up reveal
- All touch targets meet 44pt minimum
- Fading connection status conveyed via text ("14 days ago") not just color

---

## Cross-References

- **Navigates to**: Screen 14 — Goal Detail (for relationship goals, stack push), Screen 09 — SIA Chat (tap SIA note, tab switch), Screen 19 — RPG Character Screen (tap level badge, stack push), Add Person bottom sheet (modal), Log Quality Time bottom sheet (modal)
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Domain Header, SIA Coaching Note, FAB), Screen 32 — Career Dashboard (Domain Header, SIA Note), Screen 34 — Spirituality Dashboard (Domain Header, SIA Note, streak tracking pattern). All domain dashboards share header and SIA note patterns.
- **Patterns used**: Domain Dashboard Header, SIA Coaching Note Card, FAB with scroll-hide, Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model, Bottom Sheet Modal
- **Patterns established**: Person Row (avatar + name + relationship + last interaction), AI Reminder Card (swipeable, with warning icon and action states), Quality Time Log Entry, SIA Suggestion Card (with "do it"/"skip" inline actions), Upcoming Date Row (with countdown urgency states), Add Person Bottom Sheet, Log Quality Time Bottom Sheet
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-11.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/relationships`
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
| B11-F13 | critical | retention | Implement add-person and quality-time sheets, suggestion do/skip states, full log navigation, validation, save/cancel, success, and error states. |
| B11-F14 | major | accessibility | Make rows semantic buttons/links with expand/detail behavior, dismiss alternatives, clear labels, and 44px touch targets. |
| B11-F15 | major | trust-privacy | Add source/explanation affordances, snooze/dismiss/log paths, per-person visibility controls, and relationship tracking settings. |
| B11-F16 | minor | design-system-consistency | Align the fixture/spec level or document why the relationships level changed. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

