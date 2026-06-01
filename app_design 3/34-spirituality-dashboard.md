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
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Section eyebrow includes a completion counter ("3/5" in 13pt Sora Semibold, orange). Each row: left — circular checkbox (24pt, 2pt stroke white at 30%, filled orange with checkmark when completed). Center — practice name (16pt Sora Semibold, white). Right — time (15pt Sora Regular, white at 50%, tabular-nums). Completed rows: name at 50% opacity with subtle strikethrough effect. Rows separated by 1pt divider (white at 5%). Below all rows: streak indicator — flame icon (20pt, orange) + "X day streak" (15pt Sora Semibold, orange).
- **Adaptive content by belief system**:
  - **Muslim**: 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) with calculated prayer times based on location. Optional sunnah/nafl prayers as secondary rows.
  - **Christian**: Customizable slots (morning prayer, evening prayer, church service, scripture reading, etc.)
  - **Jewish**: Shacharit, Mincha, Maariv with relevant times
  - **Buddhist/Hindu**: Meditation sessions, puja, mantra practice
  - **Agnostic/spiritual**: Mindfulness sessions, gratitude practice, contemplation
  - **Custom**: User-defined practice names and times (fully configurable via SIA or settings)
- **Variants**: All complete (all checkboxes filled, celebration state), partial (some complete), none complete (default start of day), missed (past time, unchecked — dimmed with "missed" label at 40% opacity)
- **Gestures**: Tap checkbox → toggle completion (XP earned). Tap practice name → expand to show additional options (late completion, skip, notes). Long-press → edit practice time or name. Tap streak → push to streak history view.
- **Size**: Full-width - 32pt × ~52pt per practice row + 24pt streak area

### Reading Progress Card
- **Purpose**: Track progress through spiritual/religious text
- **Data source**: Spirituality API (reading tracker), user-configured text/book
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Top row: book icon (24pt, purple domain color #A855F7) + text title (17pt Sora Semibold, white). Second row: current position (15pt Sora Regular, white at 70% — e.g., "Surah Al-Baqarah" or "Gospel of John, Chapter 3" or "Chapter 5 of Meditations"). Third row: page or section indicator (13pt Sora Regular, white at 50% — "page 42 of 604"). Progress bar: 6pt height, green (#34A853) fill, white at 10% track, full-width within card. Daily goal: 13pt Sora Regular, white at 50%. Bottom: "log reading" compact button (text link, 15pt Sora Regular, orange, right-aligned).
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
| Reading progress bar fill | #34A853 | Forest Green | 30% — completion progress |
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

**60/30/10 verification**: Orange on all interactive/completion states (checkboxes, streak, counters, links, fasting bar, CTAs). Green on completion/success (reading progress, fast complete, reflected today, XP). Purple limited to SIA indicator (2 elements). Domain purple (#A855F7) only on identification icons (header, book, moon — distinct from SIA purple #7F24FF). Note: spirituality's domain color is purple (#A855F7) while SIA's indicator is royal purple (#7F24FF) — the slightly different hues prevent confusion. Both are used sparingly. Ratio holds.

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
| Success (fast complete) | Green glow (600ms), check icon, "fast complete" label, XP animation | success notification |

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
| Reading progress bar | Scroll into view | Width 0% → actual | 520ms | ease-flow |
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

