# Screen Design: Fitness & Workouts Dashboard

**Screen**: 26 of 73
**File**: 26-fitness-workouts-dashboard.md
**Register**: Product Mode
**Primary action**: start today's workout
**Tab**: Me (accessed via Explore section or SIA deep-link)
**Navigation**: Stack depth 2-3 from Me tab root (Me → Explore → Fitness Dashboard). Also reachable via SIA deep-link or Home action card.

---

## Purpose

The Fitness & Workouts Dashboard is the user's command center for physical activity. It surfaces SIA's AI-generated workout plan for today, shows connected wearable data (WHOOP), tracks fitness goals, and provides a quick 7-day history at a glance. This screen establishes the **Domain Dashboard Template** — the canonical layout pattern that every domain dashboard in the app (Nutrition, Finance, Career, Relationships, Spirituality, Learning, Creativity) will follow.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA's coaching note — the AI voice, immediately below the header
2. Today's workout plan — the primary content card with "start workout" CTA
3. WHOOP recovery data — connected wearable integration (conditional)
4. Active fitness goals with progress bars
5. 7-day workout history with weekly stats
6. "Log workout" FAB for manual logging

**User flow**:
- **Arrives from**: Explore Section [18] via stack push, SIA Chat [09] via deep-link stack push, Home Screen [12] via action card stack push, Life Areas Overview [16] via domain tap stack push
- **Primary exit**: Screen 27 (Workout Detail / Active Workout) via stack push — triggered by "start workout" CTA or tapping the workout card
- **Secondary exits**: Goals List [13] via stack push (pre-filtered to fitness), Connected Services [22] via stack push (WHOOP setup), RPG Character [19] via stack push (tapping skill level badge), SIA Chat [09] via tab switch (tapping SIA note card)

---

## Layout

**Scroll behavior**: ScrollView (content is moderate length, not a dynamic list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  ┃ Fitness & workouts  Lv.12│  56pt — Domain Dashboard Header
│      ┃ (red accent line)        │  FIXED, sticky on scroll
├─────────────────────────────────┤
│                                 │  SCROLLABLE from here
│  ┌─────────────────────────────┐│
│  │ ● SIA says:                 ││  72pt — SIA Coaching Note
│  │ "Your recovery is high      ││
│  │  today. Good day for        ││
│  │  intensity."                ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ TODAY'S WORKOUT              ││  ~220pt — Primary Content Card
│  │                              ││
│  │ Upper body strength          ││
│  │ Strength · 45 min            ││
│  │                              ││
│  │ ┌──────┐┌─────┐┌─────┐  +2 ││  exercise preview chips
│  │ │Bench ││ OHP ││Rows │     ││
│  │ └──────┘└─────┘└─────┘     ││
│  │                              ││
│  │ ┌───────────────────────┐   ││
│  │ │   Start workout →      │   ││  orange pill CTA
│  │ └───────────────────────┘   ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ WHOOP RECOVERY               ││  ~120pt — Integration Card
│  │                              ││  (conditional)
│  │  Sleep  │  HRV   │ Recovery ││
│  │   85    │   68   │   78%    ││
│  │   ●●●●  │  ●●●   │  ●●●●   ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ Active goals        see all ││  ~140pt — Goals Section
│  │                              ││
│  │ ████████████░░░  Run 5K     ││
│  │ 68%                          ││
│  │ ██████░░░░░░░░  Build       ││
│  │ 40%             muscle      ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ This week           see all ││  ~180pt — History + Stats
│  │                              ││
│  │  M   T   W   T   F   S   S ││  7-day calendar dots
│  │  ●   ●   ○   ●   ○   ○   · ││
│  │                              ││
│  │ ┌──────┐┌──────┐┌──────┐   ││  stat tiles row
│  │ │  3   ││ 135  ││ 850  │   ││
│  │ │workts││ min  ││ cal  │   ││
│  │ └──────┘└──────┘└──────┘   ││
│  └─────────────────────────────┘│
│                                 │
│          64pt bottom padding    │
│                                 │
│       ┌────────────────┐        │  FAB, floating, z-40
│       │  + Log workout  │        │  48pt, above tab bar
│       └────────────────┘        │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status bar
   - Content: transparent, system-managed

2. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Fitness & workouts" title with 2pt red (#EF4444) accent line underneath, "Lv.12" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **SIA Coaching Note Card** — 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice — the first thing the user reads after the title
   - Content: purple dot indicator (6pt, #7F24FF) + contextual SIA message
   - 16pt top margin from header

4. **Today's Workout Card** — ~220pt
   - Purpose: primary content — AI-generated workout plan for today
   - Content: eyebrow label, workout name, type + duration, exercise preview chips (horizontal scroll), "start workout" CTA
   - 16pt top margin

5. **WHOOP Integration Card** — ~120pt (conditional)
   - Purpose: connected wearable data display
   - Content: 3-column layout (sleep score, HRV, recovery percentage) with color-coded indicators
   - 16pt top margin. Shows "Connect WHOOP" prompt (~64pt) if not connected.

6. **Active Goals Section** — ~140pt
   - Purpose: domain-filtered fitness goals with progress
   - Content: section heading row + max 2 goal rows with progress bars
   - 16pt top margin

7. **This Week Section** — ~180pt
   - Purpose: recent activity overview and key metrics
   - Content: 7-day calendar dot row + 3 stat tiles (workouts completed, active minutes, estimated calories)
   - 16pt top margin

8. **Bottom Padding** — 64pt
   - Purpose: clears FAB and tab bar from content

9. **FAB (Log workout)** — 48pt height, floating
   - Purpose: manual workout logging shortcut
   - Content: "+ Log workout" text
   - Positioned 16pt above tab bar, centered, z-40

10. **Tab Bar** — 56pt + 34pt safe area
    - Purpose: primary app navigation
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with domain branding and RPG integration
- **Data source**: user's fitness skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left edge
  - Title: "Fitness & workouts", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #EF4444 (fitness red), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.12", 13pt Sora Semibold, #EF4444 text, background #EF4444 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button taps pop stack; RPG badge taps push to RPG Character [19]

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching message, establishes SIA-first pattern
- **Data source**: AI-generated based on WHOOP data, workout history, goal progress
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt)
- **Size**: full-width minus 32pt (16pt margins) × 72pt (variable)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 24pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 40pt from card left edge, 24pt right padding, max 3 lines
- **Variants**:
  - WHOOP connected: references recovery data ("Your recovery is high today. Good day for intensity.")
  - No WHOOP: references workout history ("You've hit 3 workouts this week. One more for your goal.")
  - Day 1: motivational starter ("Ready to build your routine? Here's what I suggest.")
- **Gestures**: tap entire card → navigates to SIA Chat [09] with fitness context pre-loaded

### Today's Workout Card
- **Purpose**: the primary AI-generated content — today's recommended workout plan
- **Data source**: AI workout engine (SIA-generated plan based on goals, recovery, history)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~220pt
- **Sub-elements**:
  - Eyebrow: "TODAY'S WORKOUT", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Workout name: 17pt Sora Semibold, white ("Upper body strength")
  - Type + duration: 13pt Sora Regular, white at 50% ("Strength · 45 min")
  - Exercise preview chips: horizontal ScrollView, each chip is ink-900 background, r-sm (10pt), 8pt horizontal / 4pt vertical padding, 13pt Sora Regular white, 8pt gap between chips. Shows 3 visible + "+N" overflow indicator
  - "Start workout" CTA: 48pt height, full card content width, Burnt Orange (#FF5E00), white text 16pt Sora Semibold, r-pill. 16pt top margin from chips.
- **Variants**:
  - Populated: full workout plan as described
  - Day 1 (no plan yet): SIA-generated starter based on onboarding. If fitness not in onboarding, shows "Tell SIA about your fitness goals" card with text link to SIA Chat
  - Rest day: "No workout planned today" message with "Log a workout" secondary button (white text, no fill)
  - Loading: skeleton shimmer on all text elements
- **Gestures**: tap card body → stack push to Screen 27 (Planning mode); tap "start workout" → stack push to Screen 27 (transitions to Active mode)

### WHOOP Integration Card
- **Purpose**: display connected wearable recovery data for informed workout decisions
- **Data source**: WHOOP API via Connected Services
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~120pt
- **Sub-elements** (3-column layout, equal widths):
  - Each column: value (20pt Sora Semibold, white, centered) + label (12pt Sora Regular, white at 50%, centered, 4pt below value) + color indicator dot (8pt circle, 8pt below label)
  - Column 1: Sleep score (value), "sleep" (label), green/yellow/red dot
  - Column 2: HRV (value), "HRV" (label), green/yellow/red dot
  - Column 3: Recovery % (value), "recovery" (label), green/yellow/red dot
  - Color coding: green (#34A853) = good (>70%), yellow (#F59E0B) = moderate (40-70%), red (#EF4444) = low (<40%)
- **Variants**:
  - Connected + data: full 3-column display
  - Connected + no data: "Syncing with WHOOP..." with inline spinner
  - Not connected: compact prompt "Connect WHOOP for recovery insights" in 15pt Sora Regular, white at 50%, with right chevron. ~64pt height. Tappable → Connected Services [22].
  - Error: "Could not load WHOOP data" with "retry" text link
- **Gestures**: tap card → expand to more detailed WHOOP view (future screen, not in current scope — for now, no-op with light haptic)

### Active Goals Section
- **Purpose**: show domain-filtered fitness goals with progress tracking
- **Data source**: user's goals filtered to Fitness domain
- **Visual treatment**: section with heading row + goal rows on ink-brown-800 cards
- **Size**: full-width × ~140pt
- **Sub-elements**:
  - Section heading row: "Active goals" in 18pt Sora Semibold, white, left-aligned + "see all" in 13pt Sora Regular, Burnt Orange (#FF5E00), right-aligned. 44pt touch target on "see all". Full row height 32pt.
  - Goal rows (max 2 visible): ink-brown-800 card, r-md (14pt), 16pt padding. Each row ~48pt:
    - Progress bar: 8pt height, r-pill, white at 8% track, Burnt Orange fill. Width = percentage of goal completion.
    - Goal name: 15pt Sora Regular, white, right of progress bar text or below bar
    - Percentage: 13pt Sora Semibold, white, left-aligned below bar
    - Domain tag chip: 8pt right margin, "fitness" in 11pt, #EF4444 text, #EF4444 at 15% background, r-pill
  - 8pt gap between goal rows
- **Variants**:
  - Populated: 1-2 goals with progress
  - No goals: "No fitness goals yet" in 15pt Regular, white at 50% + "create a fitness goal" text link in Burnt Orange
  - Loading: skeleton shimmer on goal rows
- **Gestures**: tap goal row → stack push to Goal Detail [14]; tap "see all" → stack push to Goals List [13] pre-filtered to fitness

### This Week Section
- **Purpose**: 7-day activity history and aggregate weekly metrics
- **Data source**: workout completion log for current week
- **Visual treatment**: section with heading + calendar dots + stat tiles in ink-brown-800 card
- **Size**: full-width × ~180pt
- **Sub-elements**:
  - Section heading row: "This week" + "see all" (same pattern as Active Goals heading). 32pt height.
  - 7-day calendar dots: horizontal row, evenly spaced across full width minus 32pt margins. Each dot:
    - Day label: 12pt Sora Regular, white at 40%, centered above dot ("M", "T", "W", etc.)
    - Dot: 12pt diameter circle
    - Completed: Burnt Orange (#FF5E00) fill
    - Planned but not done: white at 20% fill, 1pt dashed white at 30% border
    - Today (upcoming): white at 10% fill with subtle pulse animation (800ms, ease-flow, loops)
    - Rest day: no dot, dash (—) in white at 20%
    - Future: no dot, empty
  - Calendar dot row height: 40pt (including day labels)
  - Stat tiles row: 3 tiles, equal width, 8pt gaps between. 16pt top margin from calendar dots.
    - Each tile: ink-brown-800 background (slightly lighter than card behind — use ink-900 if nested inside a card, or standalone), r-md (14pt), 72pt height
    - Value: 20pt Sora Semibold, white, centered ("3", "135", "850")
    - Label: 12pt Sora Regular, white at 50%, centered, 4pt below value ("workouts", "min", "cal")
    - Count-up animation on mount: 0 → value over 280ms, ease-out-soft
- **Variants**:
  - Populated: dots and stats reflect actual data
  - Day 1: all dots empty except today (pulse). Stats show "0 workouts · 0 min · 0 cal" — visible but zeroed.
  - All done: all planned dots filled. SIA note above might reference the achievement.
- **Gestures**: tap "see all" → expanded exercise history view (future detail, for now stack push to a placeholder); tap individual day dot → no action (informational only)

### FAB (Log Workout)
- **Purpose**: quick access to manual workout logging
- **Data source**: N/A (navigational)
- **Visual treatment**: floating button above tab bar, glassmorphism
- **Size**: 48pt height × auto-width (padding 24pt horizontal)
- **Sub-elements**:
  - Icon: "+" in 16pt, white
  - Label: "Log workout" in 15pt Sora Semibold, white
  - 8pt gap between icon and label
- **Variants**: N/A
- **Gestures**: tap → stack push to Screen 27 (Planning mode, blank template for manual entry)
- **Scroll behavior**: fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or scroll stop.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism with 1pt white 6% border |
| Domain accent line | #EF4444 | fitness-red | domain color, header only |
| Section eyebrow text | rgba(255,255,255,0.4) | white at 40% | "TODAY'S WORKOUT" and all section labels |
| RPG badge text + bg | #EF4444 at 100% / 15% | fitness-red | domain color on badge |
| "Start workout" CTA | #FF5E00 | burnt-orange | 60% primary — main CTA |
| "see all" links | #FF5E00 | burnt-orange | 60% primary — interactive text |
| Progress bar fills | #FF5E00 | burnt-orange | 60% primary — goal progress |
| Calendar dots (done) | #FF5E00 | burnt-orange | 60% primary — completion |
| WHOOP good indicator | #34A853 | forest-green | 30% secondary — positive state |
| WHOOP moderate | #F59E0B | amber | caution indicator |
| WHOOP low indicator | #EF4444 | fitness-red | warning (domain-appropriate) |
| SIA purple dot | #7F24FF | royal-purple | 10% accent — AI indicator |
| Primary text | #FFFFFF at 100% | white | headings, values |
| Secondary text | #FFFFFF at 70% | white-70 | body text |
| Tertiary text | #FFFFFF at 50% | white-50 | captions, labels |
| Quaternary text | #FFFFFF at 40% | white-40 | hints, meta |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |

**60/30/10 verification**: orange dominates interactive elements (CTA, progress bars, calendar dots, links). Green appears only in WHOOP good-state indicators. Purple limited to single SIA dot. Domain red (#EF4444) confined to accent line and RPG badge — never on actions, eyebrows, or UI chrome. Section eyebrows use white at 40% per shared patterns.

---

## Interaction States

### "Start workout" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange (#FF5E00) fill, white text, r-pill | — |
| Pressed | darker orange (#E05400) + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, no touch response | — |
| Loading | white spinner replaces text, orange bg | — |
| Error | N/A (navigation action) | — |
| Success | brief green glow (600ms) as it navigates | success notification |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | — |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always tappable) | — |
| Loading | skeleton shimmer on text area | — |
| Error | "Could not load SIA note" placeholder text | — |
| Success | N/A | — |

### Goal Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, progress bar, text | — |
| Pressed | scale(0.97), background darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### WHOOP "Connect" Prompt
| State | Visual | Haptic |
|-------|--------|--------|
| Default | text + right chevron, white at 50% | — |
| Pressed | text at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | domain color text, 15% opacity pill bg | — |
| Pressed | scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### FAB (Log Workout)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism, white text, --shadow-2 | — |
| Pressed | scale(0.95), background darkens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always active) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Exercise Preview Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, white text, r-sm | — |
| Pressed | scale(0.95), bg lightens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | ScrollView | refresh dashboard data (workout plan, WHOOP, goals) |
| Tap | Today's Workout card body | stack push to Screen 27 (Planning mode) |
| Tap | "Start workout" CTA | stack push to Screen 27 (transitions to Active mode) |
| Tap | Goal row | stack push to Goal Detail [14] |
| Tap | "see all" (goals) | stack push to Goals List [13], fitness filter |
| Tap | "see all" (this week) | stack push to exercise history |
| Tap | SIA note card | tab switch to SIA Chat [09] with fitness context |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | WHOOP connect prompt | stack push to Connected Services [22] |
| Tap | FAB | stack push to Screen 27 (manual log template) |

**Haptic feedback points**:
- "Start workout" press: light impact
- FAB press: medium impact
- Goal row press: light impact
- SIA card press: light impact
- Pull-to-refresh release: medium impact
- RPG badge press: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA note card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Today's Workout card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| WHOOP card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Goals section | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| This Week section | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Stat tile values | Scroll into view | count-up from 0 | 280ms | ease-out-soft |
| Calendar dots | Scroll into view | scale-in from 0.5 | 280ms, 40ms stagger | ease-out-soft |
| Today dot | Continuous | subtle pulse (opacity 0.4→1.0) | 800ms loop | ease-flow |
| FAB | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Progress bar fills | Mount | width 0→percentage | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | standard iOS refresh indicator | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA note: "Ready to build your routine? Here's what I suggest."
- Today's Workout Card: SIA-generated starter plan based on onboarding fitness interests. If onboarding didn't include fitness, shows a simplified card: "Tell SIA about your fitness goals" with a text link to SIA Chat [09]. Card maintains same visual weight (r-xl, 24pt padding) but with centered content.
- WHOOP card: compact 64pt prompt "Connect a wearable for smarter recovery insights" with right chevron → Connected Services [22]
- Goals section: "No fitness goals yet" in 15pt Regular, white at 50%. "Create a fitness goal" text link in Burnt Orange. Taps navigate to Create/Edit Goal [15] with fitness domain pre-selected.
- This Week: all day dots empty except today (subtle pulse animation). Stat tiles show "0" for all values — visible but zeroed, not hidden.
- FAB remains visible and functional.

### Established user (rest day / zero state)
- SIA note: "Rest day. Your body recovers stronger than before."
- Today's Workout Card: "No workout planned today" message in 15pt Regular, white at 50%, centered. "Log a workout" secondary button (white text on transparent, 1pt white at 10% border, r-pill, 44pt height) replaces the "start workout" CTA.
- WHOOP card: normal data display (recovery data is relevant on rest days)
- Goals section: normal (goals still have progress to show)
- This Week: completed days filled, today marked as rest (—)

---

## Motivation Adaptation

- **Low motivation**: SIA note is more encouraging and gentle. Today's Workout Card shows a simplified plan (2-3 exercises instead of 5, shorter duration). Stats section hidden entirely. Goals section shows only the single most important fitness goal. WHOOP card simplified to just recovery percentage. Overall: less data, more warmth.
- **Medium motivation**: default experience as designed above. All sections visible. 3-5 exercises in workout plan. Full stats and goals.
- **High motivation**: exercise preview chips expand to show all exercises (no "+N" overflow). Additional stat tiles appear: personal records, weekly volume trend (mini spark line), streak count. WHOOP card shows expanded data (resting HR, respiratory rate). Goals section shows all fitness goals (not limited to 2).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain accent line | — | — | 2pt height | — | #EF4444 |
| RPG skill badge | Sora | Semibold | 13pt | 18pt | #EF4444 |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| Card eyebrow ("TODAY'S WORKOUT") | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Workout name | Sora | Semibold | 17pt | 22pt | white 100% |
| Workout type + duration | Sora | Regular | 13pt | 18pt | white at 50% |
| Exercise preview chip | Sora | Regular | 13pt | 18pt | white 100% |
| "Start workout" CTA | Sora | Semibold | 16pt | 22pt | white 100% |
| WHOOP column value | Sora | Semibold | 20pt | 26pt | white 100% |
| WHOOP column label | Sora | Regular | 12pt | 16pt | white at 50% |
| Section heading ("Active goals") | Sora | Semibold | 18pt | 24pt | white 100% |
| "see all" link | Sora | Regular | 13pt | 18pt | #FF5E00 |
| Goal name | Sora | Regular | 15pt | 20pt | white 100% |
| Goal percentage | Sora | Semibold | 13pt | 18pt | white 100% |
| Domain tag chip | Sora | Regular | 11pt | 14pt | #EF4444 |
| Day label (calendar) | Sora | Regular | 12pt | 16pt | white at 40% |
| Stat tile value | Sora | Semibold | 20pt | 26pt | white 100% |
| Stat tile label | Sora | Regular | 12pt | 16pt | white at 50% |
| FAB label | Sora | Semibold | 15pt | 20pt | white 100% |
| WHOOP connect prompt | Sora | Regular | 15pt | 20pt | white at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Workout plan fails to load | Today's Workout Card shows skeleton shimmer; after timeout: "Could not load workout plan" with "retry" text link | Tap retry or pull-to-refresh |
| WHOOP data fails to load | WHOOP card shows "Could not load WHOOP data" with "retry" text link | Tap retry; auto-retries in background |
| WHOOP not connected | Compact prompt: "Connect WHOOP for recovery insights" with right chevron | Tap navigates to Connected Services [22] |
| Goals fail to load | Goals section shows skeleton shimmer; after timeout: generic fallback text | Pull-to-refresh |
| SIA coaching note fails | "Could not load SIA note" placeholder text in white at 40% | Pull-to-refresh reloads SIA content |
| Pull-to-refresh fails | Standard iOS refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls to refresh again |
| Workout history fails to load | This Week section shows zeroed stats and empty dots | Pull-to-refresh |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Fitness and workouts, Level 12"
- RPG badge: "Fitness level 12, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Today's workout card: "Today's workout, [workout name], [type], [duration], button"
- "Start workout" CTA: "Start workout, button"
- WHOOP card: "WHOOP recovery, Sleep [value], HRV [value], Recovery [value] percent"
- Goal rows: "[Goal name], [percentage] complete, button"
- "see all" links: "See all [section name], button"
- Calendar dots: "[Day], [completed/planned/rest day]"
- Stat tiles: "[Value] [label]" (e.g., "3 workouts", "135 minutes", "850 calories")
- FAB: "Log workout, button"

**Focus order:**
1. Back button → Domain title → RPG badge
2. SIA coaching note card
3. Today's Workout card → "Start workout" CTA
4. WHOOP integration card (or connect prompt)
5. Active goals section header → "see all" → goal rows
6. This week section header → "see all" → calendar dots → stat tiles
7. FAB (Log workout)

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Pull-to-refresh reloads all dashboard data
- FAB remains accessible when scrolling via scroll-up reveal
- Exercise preview chips horizontally scrollable; VoiceOver swipe-right traverses all chips
- All touch targets meet 44pt minimum
- Color-coded WHOOP indicators supplemented by numeric values for color-blind users

---

## Cross-References

- **Navigates to**: Screen 27 (Workout Detail) via stack push, Screen 70 (Exercise Library) via "browse exercises" shortcut or FAB sub-action (stack push), Screen 13 (Goals List) via stack push, Screen 14 (Goal Detail) via stack push, Screen 15 (Create/Edit Goal) via stack push, Screen 19 (RPG Character) via stack push, Screen 22 (Connected Services) via stack push, Screen 09 (SIA Chat) via tab switch
- **Navigates from**: Screen 18 (Explore Section) via stack push, Screen 09 (SIA Chat) via deep-link, Screen 12 (Home Screen) via action card, Screen 16 (Life Areas Overview) via domain tap
- **Shared components with**: Screen 28 (Domain Dashboard Header, SIA Coaching Note Card, Active Goals Section, FAB, Section Heading Row — same components, different domain data)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1), 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in)
- **Patterns established**: Domain Dashboard Template (canonical layout with named slots), Domain Dashboard Header (back + title + accent line + RPG badge), SIA Coaching Note Card (purple dot + contextual message), Floating Action Button (above tab bar, auto-hides on scroll), Stat Tile (compact value + label metric), Section Heading Row (title + "see all" link), Exercise Preview Chip (horizontal scroll list), WHOOP Integration Card (3-column recovery data)
