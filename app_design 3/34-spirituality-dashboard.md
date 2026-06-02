# Screen Design: Spirituality Dashboard

**Screen**: 34 of 73
**File**: 34-spirituality-dashboard.md
**Register**: Product Mode
**Primary action**: log practice
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Spirituality Dashboard). Also reachable via SIA deep-link.

---

## Purpose

The spirituality dashboard adapts entirely to the user's stated beliefs — Muslim, Christian, Jewish, Hindu, Buddhist, agnostic, spiritual-but-not-religious, or any other framework. There is no rigid religion-specific UI. SIA acts as a spiritual/practice coach, providing direction and structure ("It's a coach, not an imam") without delivering religious rulings. Features like prayer tracking, reading progress, and fasting work universally across faiths. The UI structure stays consistent; the content, labels, and SIA's tone adapt. Religious text references (Quran, Bible, Torah, etc.) require qualified human authentication before SIA can reference them directly.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with purple domain accent and spirituality level
2. SIA spiritual coaching note — adaptive to user's beliefs, cross-domain connection
3. Prayer/practice tracker — the daily practice checklist (most interacted-with element)
4. Reading progress — current text/book with progress bar and daily goal
5. Fasting tracker (conditional — only shown when user has active fast)
6. Daily reflection prompt — SIA-generated contemplation prompt
7. Meditation/contemplation timer shortcut
8. Consistency streak

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link in chat (screen 09)
- **Primary exit**: SIA tab (for spiritual coaching), reflection entry (journal-like modal)
- **Secondary exits**: Goal Detail (screen 14, for spirituality goals), reading tracker detail (inline expansion), meditation timer (modal overlay)

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2.5 viewport heights; fasting section is conditional)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Spirituality       Lv.3  ⚡ │  Domain Header (56pt)
│     purple accent bar           │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (~72pt)
│ │ "Your consistency with      │ │
│ │  prayer has improved your   │ │
│ │  overall calm this week."   │ │
│ └─────────────────────────────┘ │
│                                 │
│  today's practice        3/5    │  Eyebrow + counter (16pt)
│ ┌─────────────────────────────┐ │
│ │ ☐ Fajr         5:12 AM     │ │  Practice Row (~52pt each)
│ │ ☑ Dhuhr       12:30 PM     │ │
│ │ ☑ Asr          3:45 PM     │ │
│ │ ☑ Maghrib      6:50 PM     │ │
│ │ ☐ Isha         8:15 PM     │ │
│ │                             │ │
│ │ 🔥 12 day streak           │ │  Streak (24pt)
│ └─────────────────────────────┘ │
│                                 │
│  reading                        │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 📖 Quran                   │ │  Reading Card (~96pt)
│ │    Surah Al-Baqarah         │ │
│ │    page 42 of 604           │ │
│ │    ████████░░░░░░░░  7%     │ │
│ │    daily goal: 5 pages      │ │
│ │           [log reading]     │ │
│ └─────────────────────────────┘ │
│                                 │
│  fasting                        │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │  (Conditional — shown
│ │ 🌙 Ramadan fast             │ │   only during active fast)
│ │    started: 5:12 AM         │ │  Fasting Card (~80pt)
│ │    iftar: 6:50 PM           │ │
│ │    ████████████░░░  78%     │ │
│ │    3h 12m remaining         │ │
│ └─────────────────────────────┘ │
│                                 │
│  daily reflection               │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 💭 SIA asks:               │ │  Reflection Card (~80pt)
│ │ "What are you grateful for  │ │
│ │  today? How has your faith  │ │
│ │  shaped your perspective    │ │
│ │  this week?"                │ │
│ │         [write reflection]  │ │
│ └─────────────────────────────┘ │
│                                 │
│  contemplation                  │  Eyebrow (16pt)
│ ┌──────────┐ ┌──────────┐      │  Timer Shortcuts (72pt)
│ │ 🧘       │ │ 📿       │      │  2 cards side-by-side
│ │ meditate │ │ dhikr    │      │
│ │ 10 min   │ │ 5 min    │      │
│ └──────────┘ └──────────┘      │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Spirituality" title (20pt Sora Semibold), level badge ("Lv.3"), XP icon, 2pt purple (#A855F7) accent line at bottom

2. **SIA Coaching Note** — ~72pt
   - Purpose: Cross-domain spiritual insight, adaptive to beliefs
   - Content: Purple left bar, SIA avatar, coaching message, "ask SIA →" link

3. **Practice Tracker** — ~300pt (5 practices + streak)
   - Purpose: Daily spiritual practice checklist
   - Content: Practice rows with checkbox, name, time. Streak counter at bottom.

4. **Reading Progress Card** — ~96pt
   - Purpose: Track progress through spiritual/religious text
   - Content: Book icon, title, current position, progress bar, daily goal, "log reading" button

5. **Fasting Tracker Card** — ~80pt (conditional)
   - Purpose: Track active fast with time remaining
   - Content: Moon icon, fast type, start/end times, progress bar, time remaining

6. **Daily Reflection Card** — ~80pt
   - Purpose: SIA-generated contemplation prompt
   - Content: Thought icon, prompt text, "write reflection" button

7. **Prayer Schedule Card** — ~96pt (conditional — shown when prayer times are configured)
   - Purpose: Display calculated prayer times based on location and method
   - Content: Location indicator, next prayer countdown, full schedule list, notification toggles

8. **Contemplation Timer Shortcuts** — 72pt
   - Purpose: Quick-launch meditation/contemplation timers
   - Content: 2 side-by-side cards with icon, label, default duration

---

## Components

### Practice Tracker
- **Purpose**: Daily spiritual practice checklist — the primary interaction on this screen
- **Data source**: Spirituality API (practice schedule), prayer times API (for Islamic prayers), user-configured practices
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Section eyebrow includes a completion counter ("3/5" in 13pt Sora Semibold, orange). Directly beneath the counter, a calm continuous MomentumBar (--grad-progress orange→green fill, 8px, --color-alpha-white-08 track over --track-inset recess) reads as the single quiet completion signal — arrival-green only when all practices are complete; never a ring/gauge (a ring would gamify a spiritual practice). See the Visualization section. Each row: left — circular checkbox (24pt, 2pt stroke white at 30%, filled orange with checkmark when completed). Center — practice name (16pt Sora Semibold, white). Right — time (15pt Sora Regular, white at 50%, tabular-nums). Completed rows: name at 50% opacity with subtle strikethrough effect. Rows separated by 1pt divider (white at 5%). Below all rows: streak indicator — flame icon (20pt, orange) + "X day streak" (15pt Sora Semibold, orange).
- **Adaptive content by belief system**:
  - **Muslim**: 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) with calculated prayer times based on location. Optional sunnah/nafl prayers as secondary rows.
  - **Christian**: Customizable slots (morning prayer, evening prayer, church service, scripture reading, etc.)
  - **Jewish**: Shacharit, Mincha, Maariv with relevant times
  - **Buddhist/Hindu**: Meditation sessions, puja, mantra practice
  - **Agnostic/spiritual**: Mindfulness sessions, gratitude practice, contemplation
  - **Custom**: User-defined practice names and times (fully configurable via SIA or settings)
- **Variants**: All complete (all checkboxes filled, celebration state), partial (some complete), none complete (default start of day), missed (past time, unchecked — dimmed with "missed" label at 40% opacity)
- **Gestures**: Tap checkbox → toggle completion (XP earned). Tap practice name → expand to show additional options (late completion, skip, notes). Long-press → edit practice time or name. Tap streak → push to streak history view, which renders a real practice CalendarHeatmap (practices+reflection consistency, honest intensity, today = dashed border) — NOT the retired decorative Mon–Sat grid. See the Visualization section.
- **Size**: Full-width - 32pt × ~52pt per practice row + 24pt streak area

### Reading Progress Card
- **Purpose**: Track progress through spiritual/religious text
- **Data source**: Spirituality API (reading tracker), user-configured text/book
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Top row: book icon (24pt, purple domain color #A855F7) + text title (17pt Sora Semibold, white). Second row: current position (15pt Sora Regular, white at 70% — e.g., "Surah Al-Baqarah" or "Gospel of John, Chapter 3" or "Chapter 5 of Meditations"). Third row: page or section indicator (13pt Sora Regular, white at 50% — "page 42 of 604"). Progress bar: 6pt height, green (#34A853) fill over a --track-inset recess (white at 10% track), full-width within card, with a small distinct daily-goal tick mark on the track so today's pages-vs-target is visible separately from the lifetime book-completion %. Daily goal: 13pt Sora Regular, white at 50%. Bottom: "log reading" compact button (text link, 15pt Sora Regular, orange, right-aligned).
- **Adaptive content**:
  - **Quran**: Surah name, page/juz tracking, daily page goal
  - **Bible**: Book + chapter tracking, daily chapter goal
  - **Torah**: Parsha tracking, daily reading goal
  - **Other**: Book title + chapter/page tracking, any text works
- **Variants**: Active (progress shown), completed ("completed" badge, green checkmark, option to start another text), paused (dimmed, "paused" label), no text set ("Choose a text to read" with SIA suggestion — "Would you like me to suggest a reading plan?")
- **Gestures**: Tap "log reading" → opens log reading bottom sheet (page/chapter input + duration). Tap card body → expand to show reading streak and history. Long-press → edit text/book details.
- **Size**: Full-width - 32pt × ~96pt

### Fasting Tracker Card
- **Purpose**: Track active fast with real-time countdown
- **Data source**: Spirituality API (fasting schedule), prayer times API (for suhoor/iftar), user settings
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Conditional: only renders when user has an active fast. Top row: moon icon (24pt, purple domain color) + fast type name (17pt Sora Semibold, white — e.g., "Ramadan fast", "Lenten fast", "intermittent fast", "voluntary fast"). Start/end times (15pt Sora Regular, white at 70%): "started: 5:12 AM" / "iftar: 6:50 PM" (labels adapt by faith). Progress bar: 8pt height, orange (#FF5E00) fill representing time elapsed, white at 10% track. Time remaining: 17pt Sora Semibold, white, tabular-nums (counts down in real-time). Below bar: "3h 12m remaining" centered.
- **Adaptive content**:
  - **Muslim (Ramadan)**: Suhoor → Iftar timing, based on prayer times, "Ramadan fast" label
  - **Christian (Lent)**: Custom fasting window, "Lenten fast" label
  - **Jewish (Yom Kippur, etc.)**: Sundown-to-sundown, appropriate label
  - **Secular/intermittent**: Standard time windows (16:8, 18:6, etc.)
- **Variants**: Active (countdown running), completed (today's fast done — green check, "fast complete" label, XP earned), not fasting (component hidden entirely), about to start (pre-fast — "fast begins in X hours")
- **Gestures**: Tap → expand to show fasting streak and schedule. Long-press → edit fasting schedule. Tap when complete → mark fast as done (if manual confirmation needed).
- **Size**: Full-width - 32pt × ~80pt (hidden when not fasting)

### Daily Reflection Card
- **Purpose**: SIA-generated contemplation prompt
- **Data source**: SIA AI engine (daily reflection prompt, adapted to beliefs and recent life events)
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Thought bubble icon (20pt, white at 50%). "SIA asks:" label (12pt Sora Semibold, uppercase, white at 40%). Prompt text (15pt Sora Regular, white, 2-3 sentences max). "Write reflection" button: text link, 15pt Sora Regular, orange, right-aligned. The prompt adapts: faith-specific for religious users ("How has your prayer practice shaped your week?"), universal for non-religious ("What brought you peace today?").
- **Variants**: Fresh prompt (new today), responded (checkmark + "reflected today" label, card dimmed), skipped yesterday (SIA gently re-offers)
- **Gestures**: Tap "write reflection" → opens reflection entry bottom sheet (rich text input, similar to journal entry). Tap prompt text → navigate to SIA for a deeper conversation about the prompt.
- **Size**: Full-width - 32pt × ~80pt

### Contemplation Timer Shortcut
- **Purpose**: Quick-launch guided meditation, dhikr, or contemplation timer
- **Data source**: User preferences (default durations), SIA suggestions
- **Visual treatment**: Two cards side-by-side (equal width, 12pt gap). Each: ink-brown-800 background, 20pt border-radius, 16pt padding. Center-aligned: icon (32pt, white at 70%), label below (15pt Sora Semibold, white), default duration (13pt Sora Regular, white at 50%). Minimum 44x44pt touch target.
- **Adaptive content**:
  - **Muslim**: "dhikr" (prayer beads icon) + "meditate" (lotus icon)
  - **Christian**: "prayer" (praying hands icon) + "meditate" (lotus icon)
  - **Buddhist**: "meditate" (lotus icon) + "breathe" (wind icon)
  - **Agnostic/spiritual**: "meditate" (lotus icon) + "breathe" (wind icon)
  - Labels and icons always adapt; the two-card layout is consistent
- **Variants**: Default (showing default duration), last-used (showing "last: 15 min"), active (timer running — shows time remaining, card pulses subtly)
- **Gestures**: Tap → launch timer modal (full-screen overlay with countdown, ambient visualization, haptic at intervals). Long-press → change default duration.
- **Size**: (Full-width - 32pt margins - 12pt gap) / 2 per card × 72pt

### Reflection Entry Bottom Sheet
- **Purpose**: Write a spiritual reflection (journal-like entry)
- **Data source**: User input
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners, ~70% of screen height). Drag handle. Title: "daily reflection" (20pt Sora Semibold). SIA prompt shown above the text area in a subtle card (13pt Sora Regular, white at 50%, purple left bar). Text area: full-width, auto-expanding, 16pt Sora Regular, white. Placeholder: "Write your thoughts..." at 40% opacity. Save button: orange pill CTA. Optional: domain tag selector (defaults to Spirituality, can add cross-domain tags).
- **Variants**: Fresh (empty, prompt shown), in-progress (text entered, not saved), saved (confirmation + dismiss)
- **Gestures**: Type reflection. Tap save → saves and dismisses. Drag down → dismiss (with unsaved warning if text entered).
- **Size**: Full-width × ~70% viewport

### Prayer Schedule Card
- **Purpose**: Display calculated prayer times based on user's location and chosen calculation method, with per-prayer notification toggles
- **Data source**: Prayer times API (`prayer_schedules` table — prayer_type, scheduled_time, completed_at), location services for coordinates, user-selected calculation method
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Conditional — only shown when user has prayer times configured (primarily Islamic users, but available for any faith with fixed prayer times). Top row: mosque/prayer icon (24pt, spirituality-purple #A855F7) + "Prayer times" label (17pt Sora Semibold, white) + location indicator (13pt Sora Regular, white at 50% — e.g., "Dubai, UAE" or "auto-detected"). Next prayer highlight: wellbeing-teal background at 10%, prayer name + time + "in 2h 15m" countdown (15pt Sora Semibold, white). Full schedule list: 5-7 rows showing prayer name + calculated time + notification bell icon (toggleable). Calculation method selector: gear icon → bottom sheet with method options (Muslim World League, ISNA, Egypt, Umm al-Qura, etc.).
- **Adaptive content**:
  - **Muslim**: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha (+ optional Tahajjud). Calculation method configurable.
  - **Jewish**: Shacharit, Mincha, Maariv with zmanim times
  - **Christian**: User-defined prayer times (morning, noon, vespers, compline)
  - **Other**: Any faith with scheduled prayer/practice times
- **Variants**: Configured (showing full schedule), not configured ("Set up prayer times" with location permission prompt), next prayer highlighted (countdown to nearest upcoming prayer), all prayers complete today (green checkmarks on all rows)
- **Gestures**: Tap notification bell → toggle per-prayer reminder. Tap gear icon → open calculation method bottom sheet. Tap prayer row → same as practice tracker (toggle completion). Long-press → adjust individual prayer time manually.
- **Size**: Full-width - 32pt × ~96pt (collapsed, showing next prayer only) or ~200pt (expanded, showing all prayers)

### Log Reading Bottom Sheet
- **Purpose**: Record reading progress
- **Data source**: Current reading state, user input
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners). Drag handle. Title: "log reading" (20pt Sora Semibold). Current text shown (13pt, white at 50%). Fields: pages/chapters read (number input, large), or "finished section" toggle. Duration (optional, time picker or preset chips: "10 min", "20 min", "30 min", "1 hr"). Save button: orange pill CTA.
- **Variants**: Page-based (Quran), chapter-based (Bible, books), freeform (any text)
- **Gestures**: Enter amount, tap save. Drag down → dismiss.
- **Size**: Full-width × ~280pt

---

## Visualization

> Source: embedded section (no companion file — Batch 4 is embedded-only). Audited in `viz-audit/` — Batch 4 (Domain-Dashboard A), findings `S34-V01..S34-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (spirituality-purple `#A855F7` stays an *identity* accent on the header line + book/moon icons only — never on data ink; SIA's royal-purple `#7F24FF` is distinct and SIA-only). Benchmark = **Reflectly + Stoic + Daylio** (mood/reflection cadence, warm editorial restraint) rendered **the Balencia way** (continuous progress, warm glow), not a calm-app clone. **This is the calmest dashboard in the app — editorial restraint is the brief: resolve every datum, but do *not* over-chart a contemplative space. HEAVY non-shaming: a spiritual practice is never gamified into pressure, a missed prayer is never a verdict, a streak never weaponises loss.** **Current grade D (54) → specced-target A− (85).** *(Honest re-grade under the 10-dimension rubric; the residual gap to A+++ is build-verified depth + the calm scrub/expand micro-interactions, owned by the later viz-build program.)*

Today the screen renders as a **text checklist with two flat bars**: the practice tracker is checkbox rows, reading + fasting are flat single-tone `ProgressBar`s (no inset, no gradient, no depth), the streak is text only, and the *only* grid — the 6-cell `M T W T F S` block inside the streak modal — is a **decorative non-data chart** (a fixed Mon–Sat green grid that does **not** encode real consistency: a §11 honesty defect and a 1.4.11 colour-alone status). This section upgrades *how the calm data reads* — a restrained completion **MomentumBar** (continuous, not a gamified ring), an honest reading value-vs-target bar, a real practice **CalendarHeatmap** that *replaces* the decorative modal grid, and an optional fasting micro-trend — **without** displacing the practice tracker, which stays the screen's primary *interaction*, or adding a single competitive/score visual. Mints **no new primitive**; it composes from the frozen kit (`MomentumBar`, `MacroBar`/`ProgressBar`, `CalendarHeatmap`, `Sparkline`, `KPIStatTile`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Today's practice completion (3/5) | text counter `3/5` + checkbox rows | **calm `MomentumBar`** — a single *continuous* orange→green fill (path-of-progress), arrival-green only when *all* are done; the counter stays the label | `MomentumBar` (`VK-004`) |
| Reading progress (page 42 of 604 · 7% · daily target 5 pages) | flat green `ProgressBar`, no depth | **honest value-vs-target `ProgressBar`** depth pass (`--track-inset` + green fill; **two markers**: long-arc = book completion, plus a small *daily-goal* tick so "5 pages today" is visible-vs-target, not just lifetime %) | `MacroBar`/`ProgressBar` (`VK-007`-family) |
| Practice / reflection consistency (12-day streak, implied history) | text "12 day streak" + **decorative** fixed 6-cell green modal grid | **real practice `CalendarHeatmap`** (intensity = practices+reflection completed that day) — *replaces* the decorative grid with honest data; today = dashed border | `CalendarHeatmap` |
| Fasting progress (78% elapsed · 3h 12m remaining) | flat orange `ProgressBar` | depth pass on the **same** `ProgressBar` (time-elapsed; remaining shown as text, **never** as a phantom "behind" slice) **+ high-motivation-only** 7-pt fasting-day `Sparkline` (focus correlation) | `ProgressBar` + opt `Sparkline` (`VK-001`) |
| Reflection cadence (reflected-today, implied weekly count) | "reflected today ✓" text only | **high-motivation-only** reflection-count `KPIStatTile` ("reflections this week" + honest WoW delta) — gated off by default to protect the calm | `KPIStatTile` (`VK-008`) — deferred/optional |
| Practice rows (name · time · checkbox) | checkbox list | — (deliberately textual/interactive — the tracker is an *interaction*, not a chart; charting it would gamify a prayer) | — |
| Prayer schedule · next-prayer countdown · location · daily reflection prompt · timer durations · SIA note · level | text | — (deliberately textual — times, a name, a single status word, a prompt have no honest visual form) | — |

**Editorial hierarchy (calm, not maximal — this is the restraint screen):** there is **no viz "hero"** by design — a contemplative dashboard must not open on a gauge. The **practice tracker stays the focal *interaction***; the **`MomentumBar` is the single quiet completion signal** beneath it; reading + fasting bars and the consistency heatmap are clearly secondary/ambient. **Four visuals, zero competitive charts, zero score gauges** — the calm-vs-clutter tie-break is decided *toward* calm on purpose (RUBRIC dim 1/2). A spirituality screen that out-charted Stoic would be *wrong*, not premium.

### 1 · Practice completion — `S34-V01` → `MomentumBar` (calm, continuous)

Render the `3/5` completion as a **single continuous `MomentumBar`** directly under the practice-tracker eyebrow counter: a rounded-pill bar, `--grad-progress` **(mint)** orange→green fill, 8px height, `--color-alpha-white-08` track over a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess. Source: `spiritualityDashboard.practices` (completed/total, live as the user checks rows).
- **Why a MomentumBar, not a ring/gauge:** a full ring implies a completable score and would gamify a spiritual practice into a target to "win." A continuous fill *frames momentum* (VK-004 non-shaming clause) — calm, never a verdict. **One** fill motif, no segments (§8).
- **Depth (token-backed):** continuous fill only (no glow — glow is for heroes, and this screen has none); arrival end goes **green `#34A853` only when all practices are complete** (a quiet "complete" warmth, not a celebration explosion).
- **Motion:** fill grows `--dur-slow` 520ms `--ease-flow` on mount and re-eases when a row is checked/unchecked; **never** a fade.
- **Non-shaming (paramount here):** an incomplete bar reads as "the day is still open," **never** as failure; **un-checking a practice silently retracts the fill** with no loss-aversion language; a missed past prayer is dimmed text ("missed"), it does **not** turn the bar red or trigger a guilt animation.
- **States:** Day-1 / "set up your practice" → bar absent (no fabricated 0% pressure on a brand-new contemplative user — the "get started" affordance stands alone); all-complete → full green fill + the existing "All practices complete today" green line.

### 2 · Reading progress (honest value-vs-target) — `S34-V02` → `ProgressBar` depth pass

Keep the reading card's **horizontal bar form** (rings would fight the calm and imply a score), upgraded to honest depth: `--color-alpha-white-08` track over `--track-inset` **(mint)**, **green `#34A853` fill** (reading is *arrival/completion*, the one place green leads — §11 in-range), width = book completion (7%). Add a **small daily-goal tick mark** on the track so "daily target: 5 pages" is shown *against today's logged pages*, not only as a lifetime %. Source: `spiritualityDashboard.reading` (`progress` + `dailyTarget`).
- **Honesty (non-negotiable):** the lifetime-% fill and the daily-goal tick are visually distinct — the bar must not conflate "7% of the book" with "today's 5-page goal." No truncated scale; a 0-page day is a true empty fill, not a ghost.
- **Depth:** fill width `0→%` `--dur-slow` 520ms `--ease-flow` on scroll-into-view; rounded pill caps; `ink-brown-800` card with top-edge highlight.
- **Micro-interaction:** tap card body → expand reading streak/history in place (existing gesture); "log reading" sheet updates the bar + daily tick live.
- **States:** no text set → ghosted track + "Choose a text to read" prompt (no fake fill); completed → full green + "completed" badge; paused → dimmed bar.

### 3 · Practice consistency heatmap — `S34-V03` → `CalendarHeatmap` (replaces the decorative grid)

**Retire the decorative 6-cell modal grid** and render a real `CalendarHeatmap` of practice + reflection consistency over the trailing weeks (deployed component — reuse as-is): **5 intensity steps** (`--color-alpha-white-05` → full **spirituality-purple `#A855F7` *as this domain's identity***, the one sanctioned place domain colour sits on data because it encodes *spirituality's own* consistency), today = dashed border, tap = `scale-110`. Lives in the streak-history view (the `🔥 12 day streak` tap target), replacing the fixed Mon–Sat green block. Source: new `spiritualityDashboard.consistencyHistory` (date→count of practices+reflection that day) in `mock.ts`.
- **Why this fixes a defect:** the current modal grid is a §11 decorative non-data chart with colour-alone cells (a 1.4.11 + honesty miss). A real heatmap makes the streak *honest* — and a heatmap (calm consistency cloud) is exactly the Reflectly/Daylio-family idiom, done warm.
- **Non-shaming (Gentler-Streak thesis, baked into the benchmark):** empty cells read as **"open days," never a guilt grid**; **no loss-aversion countdown** on the 12-day streak — the number is celebrated, a *break* is never weaponised ("you'll lose your streak"); the heatmap shows presence, not absence-as-shame.
- **States:** Day-1 → empty grid + "your practice begins today" (today cell dashed), **not** a wall of purple-absence; loading → cells shimmer in place; partial-sync → un-synced days ghosted, distinct from a real "no practice" day.

### 4 · Fasting progress + optional micro-trend — `S34-V04` → `ProgressBar` (+ opt `Sparkline`)

The conditional fasting card keeps its **orange `ProgressBar`** (time *elapsed*, a literal progress dimension — orange effort is correct), upgraded with the `--track-inset` depth pass; **remaining time stays text** ("3h 12m remaining"), **never** rendered as a phantom "behind" slice that would lie about composition. **High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, **no glow**) of focus-on-fasting-days under the card (the spec's "Your focus tends to improve during fasting days" correlation). Source: `spiritualityDashboard.fasting` + new `fasting.focusTrend` (high-motivation only).
- **Depth:** elapsed fill `0→%` `--dur-slow` 520ms `--ease-flow`, then continuous real-time advance; the real-time countdown digits cross-fade (existing 160ms digit motion).
- **Honesty:** elapsed is a true proportion of the suhoor→iftar window; no dual axis; the sparkline (if shown) uses a shared scale across fasting days.
- **Non-shaming:** fasting is framed as a window to move *through*, never a target to "beat"; no comparison to other users' fasts.
- **States:** not fasting → card hidden entirely (correct — absence, not an empty 0% bar); about-to-start → "fast begins in X hours" text, bar at rest; complete → green check + "fast complete" (quiet arrival).

### 5 · Reflection cadence (deferred / high-motivation only) — `S34-V05` → `KPIStatTile` (gated)

Reflection cadence is **deliberately deferred**: by default it stays the calm "reflected today ✓" text (charting a daily contemplation would pressure it). **High-motivation tier only**, the "spiritual growth summary" surfaces a single `KPIStatTile`: "reflections this week" (`text-h2` number) + an **honest, fixed-window** WoW delta (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`, "vs last week"), count-up `--dur-base` 280ms `--ease-out-soft`. Source: new `spiritualityDashboard.reflectionWeek` (this-week + last-week counts) — gated, so the default screen never shows it.
- **Non-shaming:** a ▼ delta is a **neutral muted arrow**, never red or "you reflected less" shaming language; the window is fixed/disclosed, never a cherry-picked flattering range; **no streak-loss framing** on reflection cadence.
- **States:** <2 weeks of data → `—` delta (honest: no prior week, not a fabricated ▲); default/low/medium motivation → not rendered at all.

### Motion choreography (entrance — draw-first order, calm tempo)

Per `CONSISTENCY.md`, but at the **calmest tempo** — this screen has **no hero gauge to draw first**, so the choreography is gentle and staggered, never a synchronized flourish: the **practice `MomentumBar` fills first** (`--dur-slow` 520ms `--ease-flow`) as the rows stagger in (existing 60ms/row) → **then** the reading bar fills on its card-enter → **then** (below fold, on **scroll-into-view**) the fasting bar fills and the consistency `CalendarHeatmap` cells stagger in (40ms) → the optional `Sparkline` **draws itself** L→R last (1200ms `stroke-draw`, *never* fade) only at high motivation. One continuous-fill motif per surface (the bars); no competing draw animations. `prefers-reduced-motion` → every bar at its final fill instantly, the heatmap at final intensity, the optional sparkline as a completed stroke + green end dot — the calm static frame is the canonical frame.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — `MomentumBar` absent (no 0% pressure), reading "Choose a text" ghosted track, heatmap "your practice begins today" (today cell dashed), fasting hidden, reflection text-only; **loading** — depth-preserving skeletons that *morph* into drawn fills (track + cells visible, no blank boxes); **partial** — un-synced practice/reading days ghosted in the heatmap, distinct from a real "no practice" day; the fasting card hides on data failure (treated as no active fast); **error** — chart-specific honesty (reading bar shimmer→fallback, heatmap retry) + a visible "retry", per the Error Handling table. The decorative modal grid is **removed** in all states.
- **60/30/10:** **orange dominates** data ink (`MomentumBar` fill, fasting elapsed bar, optional sparkline, KPI accents); **green** = arrival/in-range only (reading completion fill, MomentumBar arrival when all-complete, fast-complete, ▲ deltas, "reflected today ✓"); **purple is split and disciplined** — SIA's royal-purple `#7F24FF` is **SIA-only** (note left bar/avatar), and spirituality-domain purple `#A855F7` is **identity-only** (header accent line, book/moon icons, **and the heatmap intensity encoding *this domain's* consistency** — the one sanctioned data use of a domain colour); **no projection/forecast appears on this calm screen** (no dashed-purple SIA tail — a contemplative space is not forecast against itself). Glow is intentionally **absent** (no hero → no 32px glow; warm depth comes from inset tracks + layered surfaces, not neon).
- **Accessibility:** every bar/heatmap/sparkline carries a text/`aria-label` equivalent conveying the same value ("3 of 5 practices complete today"; "Quran, page 42 of 604, 7 percent, daily goal 5 pages"); the **heatmap replaces the colour-alone modal grid** — each cell carries an `aria-label` ("[date]: [N] practices") and the streak number is the visible label, never colour alone; completion status is conveyed by **text/state** (the existing strikethrough + "missed"/"completed" labels), never by colour alone; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the MomentumBar fill, both ProgressBar fills, the heatmap cell intensities, and every filled/unfilled boundary meet ≥3:1 vs background (white/5 track is decorative-only); interactive chart/streak targets ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with the calm static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Stoic + Reflectly (belief, calm) — *stays Balencia via warm-glow surfaces on ink-brown, the continuous-stroke MomentumBar, honest reading bars with daily-goal tick marks, and the real CalendarHeatmap replacing the decorative grid.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **practice tracker card** — the primary interaction zone (the checklist rows + the calm MomentumBar completion signal beneath the eyebrow). It spans ~52pt per row × 5 rows + 24pt streak area = ~300pt of engaged interaction, positioned after the SIA coaching note. Everything else is visibly secondary: the SIA note sits above as an emotional anchor (no glow, body type), reading/fasting cards are secondary surfaces (48–80pt each, no glow), the reflection prompt is a mid-weight card (80pt), and the timer shortcuts are equal-weight pairs. The squint test lands on the practice checker rows first, then the orange-to-green MomentumBar glow (arrival signal only when complete), then the SIA voice. No competing foci.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (white at 6%) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the sacred not-flat cue, now present on all surfaces) · `--shadow-1`. The practice tracker card, reading card, fasting card, daily reflection card, and timer shortcut cards all receive this treatment. The SIA coaching note card carries the same layering (fixing the flat-box read on this screen's currently highest-priority copy). Glow is size-calibrated: the MomentumBar (8px height, 48–96pt wide) carries **no glow** (inline/small elements, per CONSISTENCY.md §1); the reading/fasting cards (80–96pt) carry **`--glow-orange-md`** (~20px /.40) only as a focal depth pass (warm, not neon, applied only once during the screen's entrance so it reads as a premium surface, not every card simultaneously — this is the calmest dashboard in the app, and restraint is the point). The inset tracks (`--track-inset` rgba(0,0,0,0.28)) under the MomentumBar, reading bar, and fasting bar fix the current flat-fill read and sit in a recessed visual plane. Streak indicator (flame icon + text) floats on the surface, no glyph-glow. Practice rows are separated by 1pt dividers (white at 5%), reading and fasting cards have top-edge highlight + track inset depth. The optional reflection card and timer cards use the same depth language.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: section eyebrow ("today's practice" / "reading" / "fasting" / etc.) the `.eyebrow` recipe (`--text-eyebrow` 12pt / 600 weight / `--tracking-eyebrow` +0.12em / uppercase / `--color-alpha-white-40`) — tighter than today's ad-hoc values. Completion counter ("3/5") `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / `--color-brand-orange`; practice names `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; practice times `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 50%, tabular-nums; streak text `--text-h3` (17pt) / 600 / `--leading-snug` / `--color-brand-orange`; reading title `--text-h3` (17pt) / 600 / white 100%; reading position / page indicator `--text-body` (16pt) / 400 / `--leading-normal` / white 70% and white 50% respectively; "log reading" link `--text-body` (16pt) / 400 / `--leading-normal` / `--color-brand-orange`; fasting type name `--text-h3` (17pt) / 600 / white 100%; fasting times `--text-body` (16pt) / 400 / white 70%; fasting time-remaining `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%, tabular-nums; daily-reflection "SIA asks:" label `--text-eyebrow` (12pt / 600 / `--tracking-eyebrow` / uppercase / white 40%); reflection prompt `--text-body` (16pt) / 400 / `--leading-normal` / white 100%; "write reflection" link `--text-body` (16pt) / 400 / `--color-brand-orange`; timer label `--text-h3` (17pt) / 600 / white 100%; timer duration `--text-body` (16pt) / 400 / white 50%. Stat figures (practice count, page count, fasting %, streak count, timer minutes) tabular-nums. Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (the completion counter + one CTA link = the two orange accents; the flame streak icon is a glyph, not a word). Chillax stays logo-only (none on this screen). Replace the ad-hoc line-heights with locked `CK-T04` and `CK-T05` values.

### Microcopy (before → after)

The narrative copy is already calm and coaching-voiced; this section authors the **edge strings** to `CK-P5`:

- **Practice tracker, day-1** — *before:* "Set up your daily practice" button only → *after:* "Set up your daily practice" stays, plus below it: "SIA can suggest practices for your beliefs" (warm, specific, never "get started now").
- **Practice tracker, missed prayer** — *before:* Missed row dimmed at 40% → *after:* Dimmed row + visible "missed" label (state made clear, never colour-alone); microcopy when tapped: "5:12 AM has passed — log it late or skip" (honest, constructive, never "you failed").
- **Practice row completed** — *before:* Orange fill + checkmark → *after:* Same visual + animated "+10 XP" float up (kept); strikethrough on name (visual, already present); no shaming language on undo.
- **Reading card, no text set** — *before:* "Choose a text to read" link only → *after:* "Choose a text to read" + below: "Quran, Bible, Torah, or any book — SIA can suggest a reading plan" (warm, faith-adaptive, specific).
- **Reading card, loading** — *before:* No message → *after (new):* Label beneath title: "Reading progress loading — one moment" (specific, warm).
- **Fasting card, not active** — *before:* Section hidden entirely → *after (kept):* Correct — section hidden is honest, not an empty 0% card.
- **Fasting card, about-to-start** — *before:* Not specified → *after (new):* "Fast begins in 2 hours" (specific time, warm).
- **Daily reflection, cold-start** — *before:* First prompt always shown → *after (kept):* Same; on first arrival, an additional line: "Reflect to deepen your practice" (warm context).
- **Daily reflection, already reflected** — *before:* Card dimmed, "reflected today ✓" → *after (kept):* Same; if reflected in prior days, show small delta: "reflected 4 days this week" (honest low-motivation view).
- **Prayer Schedule card, permission denied** — *before:* Not specified → *after (new, permission rationale):* "Enable location to show accurate prayer times for your area" + "Open settings" button (never: "we need your location"; always: "why it helps").
- **Streak history modal, loading** — *before:* No message → *after (new):* "Checking your practice history — one moment" (specific).
- **Error state (API failure)** — *before:* No fallback → *after (new, on-voice):* "Couldn't load your practices — pull to refresh" (specific, action named). Cached data shown if available.

Kept (already on-voice): SIA coaching note is warm and specific; the "log reading" / "write reflection" CTAs are active-voice and brief; streak flame is a glyph, not copy. All permission rationales are specific ("why we ask, what you gain"). Non-shaming throughout: a 0-practice day is "the day is still open," never a verdict. A broken streak is "your streak paused — pick it back up today," never "you failed."

### Motion choreography

Locked to `CK-P4` draw-first order (focal practice tracker, then support, then below-fold): domain header fades in + translateY(8→0) (`--dur-base` 280ms `--ease-out-soft`) → SIA coaching note fades in + translateY(12→0) (`--dur-base` 280ms `--ease-out-soft`, 40ms stagger) → **practice rows stagger in** (60ms per row, `--dur-base` 280ms each) → **practice completion MomentumBar fills** `0→actual` (`--dur-slow` 520ms `--ease-flow`, starting after rows are in — a fill/draw, never opacity-fade; arrival orange→green only when all practices complete) → streak flame pulses gently (2s loop, continuous, subtle — not urgent) → reading card fades in + translateY (below-fold, on scroll-into-view) → reading progress bar fills `0→%` (`--dur-slow` 520ms `--ease-flow` on scroll-into-view) → fasting card (if present) fades in + reading bar morphs/draws (same timing, coordinated, one fill motif per surface) → reflection card fades in + "write reflection" CTA lightens slightly → timer shortcut cards fade in staggered (40ms each). Below-fold surfaces (heatmap modal if streak is tapped, timer modal if shortcut is tapped) animate on open separately. One continuous-stroke motif (the MomentumBar) per surface; no competing draw animations. `prefers-reduced-motion` → every element at final state instantly, MomentumBar at its final fill width (never animated), the heatmap at final intensity, the optional sparkline as a completed stroke + green end dot — the calm static frame is the canonical frame.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | MomentumBar absent (no 0% pressure), practice tracker shows "Set up your daily practice" + SIA suggestion chips (belief-adaptive), reading "Choose a text to read" + suggestion, fasting hidden, reflection shows first prompt, timer shortcuts show generic defaults (meditate + breathe), streak shows "0" with "your practice begins today" | "SIA can suggest practices for your beliefs"; "Quran, Bible, Torah, or any book"; "Reflect to deepen your practice" (never "build this habit now" / never "get started") | profile section keeps depth; MomentumBar absent is honest (no fabricated 0% pressure on a contemplative user) |
| Loading | MomentumBar absent while rows load (skeleton shimmer on checkbox + name, preserving 52pt row height + depth), reading bar shows skeleton track + shimmer → morphs into filled bar, heatmap cells shimmer → draw in | "SIA is reading your week — one moment"; "Reading progress loading — one moment"; "Checking your practice history — one moment" | depth-preserving skeletons (rows visible, not blank boxes; bar track + cells visible, not spinners) |
| Empty / partial | un-synced practices: ghosted/dashed rows (visually distinct from complete ✓), un-synced reading days: ghosted heatmap cells, fasting hidden (no active fast = truly absent, not 0%), reflection text-only if no prompt cached, timer shortcuts show defaults | "Can't sync Dhikr data — try again later"; "Your stats grow as you build habits"; "showing your last sync" (cached) | ghosted/dashed rows + cells visually distinct from real 0; no-data ≠ zero |
| Error | practice rows show "Could not load practices" banner + retry link, reading bar shows "Couldn't load progress" + retry, fasting hidden (treated as no active fast), reflection shows "Could not load prompt" (inline, not modal), heatmap modal shows "Couldn't load history" + retry | "Couldn't load your practices — pull to refresh"; "Couldn't load your stats. Try again later." | calibrated `--color-error-red` only on genuine failure (red border on the affected zone, glyph + word paired); cached data retained if available |
| Offline | all surfaces show cached data; pull-to-refresh is dimmed with reason | "You're offline — showing your last sync" | actions honestly dimmed (50% opacity, no haptic); cached data retained |

### Signature & anti-generic

Ownable moments: the **continuous-stroke MomentumBar** (orange→green arrival, never segmented, framing momentum not a gamified target — "the day is still open," not a pressure gauge) and the **honest reading value-vs-target bar** (with the daily-goal tick mark visible on the track, making "5 pages today" distinct from "7% lifetime" — a real depth of honesty on this quiet screen). Anti-generic fixes: (1) the practice tracker is deliberately textual/interactive — charting a prayer checklist would gamify a spiritual practice into a performance, which is wrong for this screen's job; (2) the streak indicator stays as text + flame, not a rotting ring or countdown timer (no loss-aversion weaponisation); (3) the CalendarHeatmap (in the streak modal) is honest consistency data, not a decorative 6-cell grid — this is the one place domain colour (`--color-domain-faith` purple) sits on data because it encodes *spirituality's own* consistency, the screen's identity (not a generic heatmap); (4) every state is designed with non-shaming framing — a 0-practice day is "the day is still open," a low reading day is "building capacity," a missed prayer is "5:12 AM has passed — log it late or skip" (constructive, never a verdict). The fasting card's orange bar is effort-framed ("time elapsed"), not a phantom "behind" slice. The optional reflection KPI is gated off by default to protect the calm. The whole screen reads warm, calm, and premium — not a Duolingo-style gamification, not a cold health dashboard, but exactly what Stoic and Reflectly do: belief-adaptive, non-shaming, a coach's arm around your shoulder.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Domain header title | `--color-alpha-white-100` | ≥12:1 on both backgrounds |
| Spirituality level badge | `--color-alpha-white-70` | ≥4.5:1 on `ink-brown-800` |
| SIA coaching note text | `--color-alpha-white-100` | ≥12:1 |
| Section eyebrow ("today's practice") | `--color-alpha-white-40` | ≥4.5:1 (decorative, but label clarity required) |
| Completion counter ("3/5") | `--color-brand-orange` (`--color-brand-orange`) | 3.2:1 on `ink-brown-800` (WCAG 1.4.11) |
| Practice name (completed) | `--color-alpha-white-100` → 50% | strikethrough adds visual clarity beyond opacity alone |
| Practice time | `--color-alpha-white-50` | ≥4.5:1 |
| Streak text + flame | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| MomentumBar orange fill | `--color-brand-orange` | 3.2:1 on `--track-inset` recess |
| MomentumBar green arrival segment | `--color-forest-green` (`--color-forest-green`) | 2.8:1 on track (below 3:1; flagged as a Visualization build responsibility) |
| Reading progress bar fill (green) | `--color-forest-green` | 2.8:1 (same as above) |
| "log reading" link | `--color-brand-orange` | 3.2:1 |
| Fasting bar orange fill | `--color-brand-orange` | 3.2:1 on `--track-inset` recess |
| Fasting time-remaining text | `--color-alpha-white-100` | ≥12:1 |
| Reflection prompt text | `--color-alpha-white-100` | ≥12:1 |
| "write reflection" link | `--color-brand-orange` | 3.2:1 |
| Timer shortcut label | `--color-alpha-white-100` | ≥12:1 |
| Timer shortcut duration | `--color-alpha-white-50` | ≥4.5:1 |
| CalendarHeatmap cells (intensity) | `--color-alpha-white-05` → `--color-domain-faith` (spirituality-purple, 5 steps) | 3:1 between adjacent intensity steps (honesty — all cell values are labelled so intensity is never colour-alone) |

Status never colour-alone: practice completion (checkbox orange fill) is paired with a **visible checkmark** glyph and strikethrough on the name (visual + text state); missed practices show a **visible "missed" label** (white at 40%); reflection "reflected today ✓" shows a **green checkmark glyph** + the label (not just green colour); fasting "fast complete" shows a **visible checkmark** + green label; the CalendarHeatmap cells each carry an `aria-label` ("[date]: [N] practices completed today") and the intensity is **never** colour-alone. Every interactive element carries `--focus-ring` (`CK-T03`, 2px orange offset 2pt) — the practice checkboxes, "log reading" button, "write reflection" button, timer shortcuts, streak indicator, all tap targets. Targets ≥44×44pt (practice checkboxes 24pt × 52pt per row meets this; timer shortcut cards are ~76pt × 72pt, exceeds this; button hit areas explicitly 44×44pt minimum). Reduced-motion: the MomentumBar appears at final fill width instantly (no fill animation), the heatmap cells at final intensity instantly (no stagger), reflection card at final opacity instantly — essential spiritual data is all present in the static frame. Screen-reader labels on every element: "[Practice name] [time] [uncompleted/completed/missed] checkbox"; "Completion counter: [count] of [total] practices"; "Streak: [N] day streak, button, tap to view history"; "[Text title] page [current] of [total] [percentage] percent, daily goal [pages] pages"; "Daily reflection, SIA asks: [prompt text]"; "Timer [label] [duration] button"; "Prayer schedule [location] Next: [prayer] in [countdown]".

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Practice checkboxes (completed) | #FF5E00 | Burnt Orange | 60% — active/completed state |
| Streak flame + text | #FF5E00 | Burnt Orange | 60% — engagement indicator |
| Completion counter ("3/5") | #FF5E00 | Burnt Orange | 60% — progress indicator |
| "Log reading" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| "Write reflection" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| Fasting progress bar fill | #FF5E00 | Burnt Orange | 60% — time progress |
| Save buttons (bottom sheets) | #FF5E00 | Burnt Orange | 60% — primary CTA |
| Reading progress bar fill | #34A853 | Forest Green | 30% — completion progress (over --track-inset recess; distinct daily-goal tick on track) |
| Practice completion MomentumBar fill | --grad-progress (orange→green) | Burnt Orange→Forest Green | 60→30% — continuous path-of-progress; arrival-green only when all practices complete |
| Consistency heatmap intensity | #A855F7 | Purple (domain) | Domain identity used AS DATA — the one sanctioned domain-colour data use (encodes spirituality's own consistency); 5 intensity steps from --color-alpha-white-05 |
| Fast complete indicator | #34A853 | Forest Green | 30% — success state |
| "Reflected today" checkmark | #34A853 | Forest Green | 30% — done state |
| XP earned animations | #34A853 | Forest Green | 30% — reward |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Domain header accent line | #A855F7 | Purple (domain) | Domain color — identification |
| Domain level badge XP icon | #A855F7 | Purple (domain) | Domain color — identification |
| Book icon | #A855F7 | Purple (domain) | Domain color — identification |
| Moon icon (fasting) | #A855F7 | Purple (domain) | Domain color — identification |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Practice names, headings |
| Secondary text | #FFFFFF B3 | White 70% | Descriptions, values |
| Tertiary text | #FFFFFF 80 | White 50% | Times, meta, captions |

**60/30/10 verification**: Orange on all interactive/completion states (checkboxes, streak, counters, links, fasting bar, CTAs). Green on completion/success (reading progress, fast complete, reflected today, XP). Purple limited to SIA indicator (2 elements). Domain purple (#A855F7) on identification icons (header, book, moon) and — as the single sanctioned domain-colour-as-data exception — the consistency heatmap intensity, which encodes spirituality's OWN practice consistency (distinct from SIA purple #7F24FF). Note: spirituality's domain color is purple (#A855F7) while SIA's indicator is royal purple (#7F24FF) — the slightly different hues prevent confusion. Both are used sparingly. Ratio holds.

---

## Interaction States

### Practice Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt circle, 2pt stroke white at 30% | — |
| Pressed | Circle background flashes white at 10% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (future practice time not yet reached — optional enforcement) | — |
| Loading | Spinner in checkbox (syncing) | — |
| Error | Red ring flash (sync failed) | error notification |
| Success | Fill animation (orange fill, white checkmark), practice name goes 50% opacity with strikethrough, XP floats up | success notification |
| Unchecking | Reverse fill animation (orange → empty), text returns to full opacity | light impact |

### Reading Card "Log Reading" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "Log reading" text, 15pt Sora Regular, orange | — |
| Pressed | Orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Text briefly shows "logged" in green (600ms) | success notification |

### Contemplation Timer Shortcut
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, centered icon + label + duration | — |
| Pressed | Background lightens to white at 5%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A (timer launches as modal) | — |
| Active (timer running) | Card border turns orange (2pt), duration text replaced by live countdown, subtle pulse animation | — |

### Reflection "Write Reflection" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "Write reflection" text, 15pt Sora Regular, orange | — |
| Pressed | Orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (already reflected today) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Text changes to "reflected today ✓" in green | success notification |

### Fasting Tracker Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active fast) | Standard card, progress bar animating | — |
| Pressed | scale(0.98), background lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | Shimmer on time remaining | — |
| Error | N/A | — |
| Success (fast complete) | Quiet green check icon + "fast complete" label, XP animation (no glow — fast-complete is a calm arrival, not a celebration; glow is intentionally absent on this contemplative screen) | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Practice checkbox | Toggle completion, earn XP |
| Tap | Practice name | Expand for options (late completion, skip, notes) |
| Tap | "Log reading" | Open log reading bottom sheet |
| Tap | Reading card body | Expand to show reading history and streak |
| Tap | Fasting card | Expand for fasting history and schedule |
| Tap | "Write reflection" | Open reflection entry bottom sheet |
| Tap | Reflection prompt text | Navigate to SIA for deeper conversation |
| Tap | Contemplation timer card | Launch timer modal |
| Tap | Streak indicator | Push to streak history view |
| Tap | SIA coaching note | Navigate to SIA tab |
| Tap | Domain level badge | Push to RPG Character Screen (screen 19) |
| Long-press | Practice row | Edit practice name/time |
| Long-press | Contemplation timer card | Change default duration |
| Long-press | Fasting card | Edit fasting schedule |
| Long-press | Reading card | Edit text/book details |
| Pull-to-refresh | Entire ScrollView | Refresh all spirituality data |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Practice rows | Screen enter | Staggered fade-in, 60ms per row | 280ms each | ease-out-soft |
| Practice checkbox completion | Tap | Fill animation (circle → filled orange + checkmark) | 280ms | ease-out-soft |
| XP float (practice) | After checkbox | "+10 XP" floats up 24pt + fades | 520ms | ease-flow |
| Streak flame | Screen enter | Scale(0.8→1.0) + subtle flicker animation (continuous, subtle) | 280ms initial, continuous flicker 2s loop | ease-out-soft |
| Practice completion MomentumBar | Screen enter / row check-uncheck | Fill grows/re-eases 0→actual (continuous, never fade); arrival-green at all-complete | 520ms | ease-flow |
| Reading progress bar | Scroll into view | Width 0% → actual (over inset track) | 520ms | ease-flow |
| Consistency heatmap (streak view) | Scroll into view / modal open | Cells stagger in to final intensity | 40ms/cell stagger | ease-out-soft |
| Fasting focus Sparkline (high-motivation only) | Scroll into view | Draws itself L→R via stroke-draw (never fade); green end dot at rest | 1200ms | ease-flow |
| Fasting progress bar | Screen enter | Width 0% → actual (real-time progress) | 520ms initial, then continuous | ease-flow |
| Fasting countdown | Continuous | Number transition (old digit fades/slides, new digit appears) | 160ms per digit change | ease-out-soft |
| Reflection card | Scroll into view | Fade-in + translateY(12pt→0) | 280ms | ease-out-soft |
| Timer shortcut cards | Scroll into view | Staggered fade-in, 80ms apart | 280ms each | ease-out-soft |
| Bottom sheets | Open | Slide up + backdrop fade | 520ms | ease-out-soft |
| Bottom sheets | Dismiss | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| Timer modal | Launch | Full-screen fade-in with scale(0.95→1.0) | 520ms | ease-flow |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
SIA drives discovery. No religion mentioned until the user volunteers it:
- SIA coaching note: "Spirituality means different things to everyone. Tell me about your practice and I'll help you build consistency."
- Practice tracker: "Set up your daily practice" with orange "get started" button. SIA suggestion chips adapt if belief is known, otherwise generic: "meditation", "prayer", "reading", "gratitude", "journaling". Tapping any chip navigates to SIA to configure the practice.
- Reading: "Choose a text to read" with SIA prompt: "Would you like me to suggest a reading plan?"
- Fasting: Section hidden (no active fast).
- Reflection: Shows first prompt regardless: "What does spiritual growth mean to you?"
- Timer shortcuts: Show generic "meditate" + "breathe" as defaults.

### Established user (zero state)
- All practices done today: All checkboxes filled. Celebration state: "All practices complete today" in green. SIA note: "Beautiful consistency."
- Reading completed: "Completed" badge on reading card. "Choose your next text" prompt.
- No active fast: Fasting section hidden.
- Already reflected today: Reflection card dimmed with "reflected today ✓" label.

---

## Motivation Adaptation

- **Low motivation**: Only SIA note + practice tracker (top priority) + reflection prompt shown. Reading, fasting, and timer sections collapsed behind "see more". SIA tone: "Just one practice today is enough." Fewer practice rows shown if the user has many (only show top 3).
- **Medium motivation**: Default experience. All sections visible. 5 practice rows, reading card, fasting (if active), reflection, timers.
- **High motivation**: Practice tracker shows additional detail (on-time vs. late completion tracking, optimal times based on SIA analysis). Reading card shows streak + historical chart (pages/day over last month). Fasting card shows health correlation ("Your focus tends to improve during fasting days"). Reflection shows past 3 prompts in a mini-carousel for the user to choose. Additional section: "spiritual growth summary" with weekly stats.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain header accent line | — | — | 2pt height | — | #A855F7 |
| Level badge | Sora | Semibold | 12pt | 16pt | white at 70% |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| "ask SIA" link | Sora | Regular | 13pt | 18pt | white at 50% |
| Section eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| Completion counter ("3/5") | Sora | Semibold | 13pt | 18pt | #FF5E00 |
| Practice name | Sora | Semibold | 16pt | 22pt | white 100% / white at 50% (completed) |
| Practice time | Sora | Regular | 15pt | 20pt | white at 50%, tabular-nums |
| Streak text | Sora | Semibold | 15pt | 20pt | #FF5E00 |
| Reading text title | Sora | Semibold | 17pt | 22pt | white 100% |
| Reading current position | Sora | Regular | 15pt | 20pt | white at 70% |
| Reading page indicator | Sora | Regular | 13pt | 18pt | white at 50% |
| Reading daily goal | Sora | Regular | 13pt | 18pt | white at 50% |
| "log reading" link | Sora | Regular | 15pt | 20pt | #FF5E00 |
| Fasting type name | Sora | Semibold | 17pt | 22pt | white 100% |
| Fasting start/end times | Sora | Regular | 15pt | 20pt | white at 70% |
| Fasting time remaining | Sora | Semibold | 17pt | 22pt | white 100%, tabular-nums |
| Reflection "SIA asks:" label | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |
| Reflection prompt text | Sora | Regular | 15pt | 20pt | white 100% |
| "write reflection" link | Sora | Regular | 15pt | 20pt | #FF5E00 |
| Timer shortcut icon | — | — | 32pt | — | white at 70% |
| Timer shortcut label | Sora | Semibold | 15pt | 20pt | white 100% |
| Timer shortcut duration | Sora | Regular | 13pt | 18pt | white at 50% |
| Prayer times label | Sora | Semibold | 17pt | 22pt | white 100% |
| Prayer location indicator | Sora | Regular | 13pt | 18pt | white at 50% |
| Next prayer countdown | Sora | Semibold | 15pt | 20pt | white 100% |
| Bottom sheet title | Sora | Semibold | 20pt | 26pt | white 100% |
| Reflection entry text | Sora | Regular | 16pt | 24pt | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Practice data fails to load | Practice rows show skeleton shimmer; after timeout: "Could not load practices" | Pull-to-refresh |
| Practice checkbox sync fails | Checkbox shows red ring flash; reverts to unchecked; toast: "Could not save" | Error haptic; user retries tap |
| Prayer times API fails | Prayer Schedule card shows "Could not load prayer times" with "retry" link | Tap retry or pull-to-refresh |
| Location services denied (prayer times) | "Enable location for accurate prayer times" with "Open settings" button | User grants location permission |
| Reading progress fails to load | Reading card shows shimmer; fallback text | Pull-to-refresh |
| Log reading save fails | Bottom sheet shows inline error: "Could not save. Try again." | User retries save |
| Fasting tracker data fails | Card hidden (treated as no active fast) | Pull-to-refresh may restore |
| Reflection save fails | Bottom sheet shows inline error: "Could not save. Try again." with unsaved content preserved | User retries save; content not lost |
| SIA coaching note fails | Card hidden entirely | Pull-to-refresh may reload |
| Timer state fails to persist | Timer continues locally; sync retry in background | Auto-retry when connection resumes |
| Pull-to-refresh fails | Standard refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls again |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Spirituality, Level 3"
- Level badge: "Spirituality level 3, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Practice checkboxes: "[Practice name], [time], [uncompleted/completed/missed], checkbox"
- Completion counter: "[Completed] of [total] practices complete"
- Streak indicator: "[Count] day streak, button, view streak history"
- Reading card: "[Text title], [current position], [page] of [total], [percentage] percent, daily goal [pages] pages"
- "log reading" link: "Log reading progress, button"
- Fasting card: "[Fast type], started [time], ends [time], [time remaining] remaining, [percentage] percent elapsed"
- Reflection card: "Daily reflection, SIA asks: [prompt text]"
- "write reflection" link: "Write reflection, button"
- Timer shortcuts: "[Label], [default duration], button" (e.g., "Meditate, 10 minutes, button")
- Prayer schedule: "Prayer times, [location], Next: [prayer name] in [countdown]"
- Prayer notification bells: "[Prayer name] notification, [on/off], toggle"

**Focus order:**
1. Back button → Domain title → Level badge
2. SIA coaching note card
3. Today's practice eyebrow + counter → practice checkboxes in order → streak indicator
4. Reading eyebrow → reading card details → "log reading"
5. Fasting eyebrow → fasting card details (if visible)
6. Daily reflection eyebrow → reflection prompt → "write reflection"
7. Prayer schedule card (if visible) → prayer rows → notification toggles
8. Contemplation eyebrow → timer shortcut cards

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Practice checkboxes: tap to toggle; VoiceOver double-tap
- Long-press on practice row for edit; announced via VoiceOver hint
- Bottom sheets dismissable via drag-down or tap backdrop
- Timer shortcut long-press to change duration; announced via hint
- Pull-to-refresh reloads all data
- All touch targets meet 44pt minimum
- Practice completion status conveyed via text/state (not just visual strikethrough)
- Fasting progress conveyed via time remaining text (not just progress bar)
- Prayer times use numeric values, not just visual countdown

---

## Cross-References

- **Navigates to**: Screen 14 — Goal Detail (for spirituality goals, stack push), Screen 09 — SIA Chat (tap SIA note or prompt text, tab switch), Screen 19 — RPG Character Screen (tap level badge, stack push), Screen 37 — Journal (reflection entries can appear in journal), Timer modal (full-screen overlay), Log reading bottom sheet, Reflection entry bottom sheet
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Domain Header, SIA Coaching Note), Screen 32 — Career Dashboard (Domain Header, SIA Note, action checkbox pattern), Screen 33 — Relationships Dashboard (Domain Header, SIA Note, streak tracking). All domain dashboards share header and SIA note patterns. Practice checkbox shares visual pattern with Career's AI Action Checkbox.
- **Patterns used**: Domain Dashboard Header, SIA Coaching Note Card, Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model, Bottom Sheet Modal
- **Patterns established**: Practice Tracker (adaptive checklist with times, streak, and completion counter), Reading Progress Card (book/text tracking with daily goal), Fasting Tracker Card (real-time countdown with progress), Daily Reflection Card (SIA prompt + write CTA), Contemplation Timer Shortcut (dual-card quick-launch), Prayer Schedule Card (location-based calculated prayer times with per-prayer notifications and calculation method selector), Reflection Entry Bottom Sheet, Log Reading Bottom Sheet, belief-adaptive content pattern (same UI structure, different content per faith)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/spirituality`
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
| B12-F01 | critical | retention | Make every practice row a semantic 44px toggle with completion, undo, missed/late states, XP feedback, persistence, and accessible labels. |
| B12-F02 | major | navigation | Wire reading/reflection sheets and timer modals with 44px action hit areas and saved/error states. |
| B12-F03 | major | trust-privacy | Add belief/unconfigured states, source and location provenance, qualified-reference rules, and adaptive labels. |
| B12-F04 | minor | design-system-consistency | Align the fixture/spec level or document why spirituality level changed. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

