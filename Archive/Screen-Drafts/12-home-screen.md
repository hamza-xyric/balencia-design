# Screen Design: Home Screen

**Screen**: 12 of 43
**File**: 12-home-screen.md
**Register**: Product Mode
**Primary action**: Complete today's top action (swipe right or tap checkbox)
**Tab**: Today (tab root)
**Navigation**: Today tab root screen. Stack depth 0. Entry point for returning users after Splash [01]. First-time users arrive here after Initial Plan Summary [08] (Batch 2).

---

## Purpose

The Home Screen is the daily command center — the first thing a returning user sees. Its job is to answer one question: "What's worth my attention today?" SIA curates a personalized, cross-domain action list so the user never has to context-switch between fitness, finance, relationships, or any other life area. The screen uses progressive disclosure and motivation-tier adaptation to show the right amount of information without overwhelming. This screen establishes the Product Mode layout patterns used by every authenticated screen going forward.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA greeting card — emotional anchor, sets the daily tone, includes cross-domain insights when available
2. Today's action cards — the primary interaction zone, highest engagement density, includes both AI-curated actions and scheduled events
3. Time-contextual greeting + search icon + RPG level badge — persistent orientation (sticky header)
4. Active goals progress rings — visual progress feedback, horizontal scroll draws the eye

**User flow**:
- **Arrives from**: Splash Screen [01] via crossfade (returning user with valid session), Initial Plan Summary [08] (Batch 2) via root reset (first-time user completing onboarding)
- **Primary exit**: Goal Detail [14] via stack push (tap goal progress ring)
- **Secondary exits**: SIA Chat [09] (Batch 2) via tab switch (tap SIA greeting card), Goals List [13] via tab switch (tap "view all missions" link in goals section), RPG Character [19] (Batch 4) via stack push (tap level badge), Global Search [44] via overlay (tap search icon in sticky header), Schedule/Calendar [41] (Batch 9) via stack push (tap scheduled action card), domain dashboards [26-36] (Batches 6-8) via stack push (tap domain tag on action card)

---

## Layout

**Scroll behavior**: SectionList (grouped sections with section headers, allows heterogeneous content zones)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤  ← z-30, sticky on scroll
│  Good morning, Amira 🔍Lv12│  ← greeting + search + level badge
│  Tuesday, May 20            │  ← date subtitle
├─────────────────────────────┤
│                             │
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  │
│  ┊ 🟣 SIA                 ┊  │  ← purple accent left border
│  ┊ "You crushed it        ┊  │
│  ┊  yesterday. Ready for  ┊  │
│  ┊  another good day?"    ┊  │
│  ┊  ⚡ Sleep drops 30%    ┊  │  ← inline insight (conditional)
│  ┊  on skip-exercise days ┊  │
│  ┊  [😊] [😐] [😔] [⚡]  ┊  │  ← mood chips (optional)
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  │
│                             │  ← 32pt gap
│  TODAY'S ACTIONS            │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ 🟢 Meditate 10min  ☐ │  │  ← action card
│  │   wellness · 10 min   │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ 🔴 Morning run     ☐ │  │
│  │   fitness · 30 min    │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ 📅 Team standup    2PM│  │  ← scheduled variant
│  │   career              │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ 🟡 Review budget   ☐ │  │
│  │   finance · 15 min    │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  YOUR MISSIONS              │  ← eyebrow label
│  ┌────┐ ┌────┐ ┌────┐      │
│  │ ◯  │ │ ◯  │ │ ◯  │ ··►  │  ← horizontal scroll rings
│  │68% │ │42% │ │91% │      │
│  │Run │ │Save│ │Read│      │
│  └────┘ └────┘ └────┘      │
│                             │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│  ← tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Sticky Header** — 88pt (44pt status bar + 44pt content row)
   - Purpose: Persistent orientation — who you are, what level, what day
   - Content: Greeting text (left), search icon + level badge (right), date subtitle

2. **SIA Greeting Card** — ~120-140pt
   - Purpose: Emotional anchor, daily tone-setter, SIA's voice + cross-domain insights
   - Content: SIA message (2-3 lines) + optional mood chip row + optional insight line

3. **Today's Actions Section** — variable (~80pt per card, 12pt gaps)
   - Purpose: The primary interaction zone — unified cross-domain action list including both AI-curated actions AND time-scheduled events, sorted chronologically
   - Content: Section eyebrow + action cards (swipeable, includes scheduled variant)

4. **Active Goals Progress** — ~128pt (eyebrow + horizontal scroll row)
   - Purpose: Visual progress feedback across active missions
   - Content: Section eyebrow + horizontal ScrollView of progress ring cards

5. **Bottom Spacer** — 16pt
   - Purpose: Breathing room above tab bar

---

## Components

### Sticky Header
- **Purpose**: Persistent user greeting and level indicator
- **Data source**: User profile (name), RPG system (level, current XP), device clock (time of day, date)
- **Visual treatment**: Transparent background transitions to ink-900 at 80% + backdrop-blur(16px) on scroll. No border — the blur creates the separation.
- **Sub-elements**:
  - Greeting: "Good morning/afternoon/evening, [First Name]" — 20pt Sora Semibold, white
  - Date: "Tuesday, May 20" — 13pt Sora Regular, white at 50%
  - Search icon: magnifying glass (20pt, white at 60%), 16pt left of level badge, 44x44pt touch target. Tappable → opens Global Search overlay [44]
  - Level badge: "Lv [##]" in a pill (24pt tall, 48pt+ wide), ink-brown-800 bg, orange (#FF5E00) border 1pt, 13pt Sora Semibold orange text. Tappable → RPG Character [19]
- **Size**: Full-width, 44pt content height (below status bar)

### SIA Greeting Card
- **Purpose**: Daily conversational message from SIA — the emotional core of the home screen
- **Data source**: SIA AI engine (personalized based on user's recent activity, mood, time of day)
- **Visual treatment**: ink-brown-800 (#211008) card, 16pt border radius, 16pt internal padding. Purple (#7F24FF) left border accent, 3pt wide, 60% opacity. This is one of the max-2 purple elements on this screen.
- **Sub-elements**:
  - SIA avatar: 24pt circle, ink-brown-800 bg with 2pt purple (#7F24FF) ring, top-left corner of card
  - "SIA" label: 12pt Sora Semibold, white at 50%, right of avatar
  - Message text: 15pt Sora Regular, white at 90%, 2-3 lines max
  - Mood chips row (optional): 4 chips below message, 8pt gap between. Each chip: 32pt tall, pill shape (999pt radius), ink-brown-800 bg, 1pt white at 10% border, emoji (16pt) + label (12pt Sora Regular, white at 60%). Tapping a chip sends mood to SIA (not required to proceed).
  - Insight line (conditional): When SIA has a high-confidence cross-domain correlation, it appears as a second paragraph in the greeting card: "[insight text]" in 14pt Sora Regular, white at 80%. Preceded by a small lightning bolt icon (14pt, orange). Example: "Your sleep quality drops 30% on days you skip exercise." This replaces the standalone Insight Card section, keeping cross-domain intelligence visible without a separate section. Only shown when SIA has a confident insight — otherwise the greeting stands alone.
- **Gestures**: Tap entire card → tab switch to SIA Chat [09]
- **Size**: Full-width minus 32pt (16pt margins), ~120-140pt tall (variable with message length and insight presence)
- **Variants**: With mood chips (default), without mood chips (when SIA doesn't ask), with insight line (when SIA has a high-confidence correlation), without insight line (default)

### Domain Tag Chip
- **Purpose**: Color-coded identifier showing which life domain an item belongs to
- **Data source**: Domain assignment from goals/actions system
- **Visual treatment**: Pill shape (--r-sm, 10pt radius), domain color background at 15% opacity, domain color text
- **Sub-elements**:
  - Domain icon: 14pt, domain color, left side (optional — omit in tight spaces)
  - Domain label: 11pt Sora Semibold, domain color, sentence case
- **Size**: Height 24pt, width auto (padding 8pt horizontal, 12pt with icon)
- **Domain colors**: Fitness #EF4444, Nutrition #84CC16, Finance #10B981, Career #6366F1, Relationships #EC4899, Spirituality #A855F7, Learning #06B6D4, Creativity #F59E0B, Wellbeing #14B8A6
- **Variants**: Tappable (navigates to domain dashboard) or static (informational only). On this screen: static on action cards.
- **Multiple chips**: Inline with 8pt gap. A single action can have 1-3 domain tags (cross-domain).

### Action Card
- **Purpose**: A single actionable item from today's AI-curated action list
- **Data source**: SIA action engine (cross-domain, priority-ordered)
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Full-width minus 32pt (16pt margins).
- **Sub-elements**:
  - Domain tag chip(s): top-left, inline
  - Action description: 16pt Sora Semibold, white, below tags, 1-2 lines max
  - Estimated time: 13pt Sora Regular, white at 50%, right of description or below
  - Completion checkbox: 24pt circle, right-aligned, vertically centered. Default: 2pt white at 30% border. Completed: orange (#FF5E00) fill, white checkmark (14pt). Tap triggers completion.
- **Size**: Full-width minus 32pt, ~76pt tall (single-line action), ~92pt (two-line)
- **Gestures**:
  - Tap checkbox → complete action (success haptic, card animates to completed state)
  - Swipe right (>30% card width) → complete action (green #34A853 background reveals with checkmark icon)
  - Swipe left (>30% card width) → skip action (muted gray background reveals with "skip" text)
  - Tap card body → expand to show SIA's reasoning ("Why this matters")
- **Variants**: Default, completed (strikethrough text + green checkmark + 50% opacity, slides down after 600ms), skipped (muted, slides away), expanded (shows SIA reasoning text below)
  - **Scheduled variant**: For time-bound events (synced from calendar or SIA-scheduled), the action card includes a time badge: orange (#FF5E00) time text (13pt Sora Semibold) positioned top-right of the card, replacing the estimated duration. Format: "2:00 PM". Sorted chronologically within the action list. Source icon (calendar sync icon, 12pt, white at 30%) appears next to time badge for synced events.

### Action Card — Expanded State

When the user taps the body of an action card (not the checkbox), the card expands inline to reveal SIA's reasoning:

**Collapsed state** (default): ~76pt (1-line description) or ~92pt (2-line description)

**Expanded state**: collapsed height + 80pt expansion area

**Expansion content (below the existing card content):**
- Divider: 1pt, white at 5%, full card width minus 32pt (16pt margins inside card), 8pt below the existing content
- SIA reasoning: 15pt Sora Regular, white at 70%, max 3 lines, 8pt below divider
  - Example: "Meditation after high-stress days improves your sleep by 22%. Yesterday had 3 meetings."
- "ask SIA more" link: 13pt Sora Semibold, purple (#7F24FF) at 60%, right-aligned, 44pt touch target, 8pt below reasoning text
  - Tap: tab switch to SIA Chat [09] with this action's context pre-loaded
- Bottom padding: 16pt (matches card padding)

**Animation:**
- Expand: card height grows from collapsed to expanded (280ms, ease-out-soft). Expansion content fades in simultaneously (opacity 0→1, 280ms)
- Collapse: reverse (280ms). Triggered by tapping the card body again or scrolling away
- Chevron indicator: small chevron (10pt, white at 30%) appears right-aligned on the description line. Points down when collapsed, rotates to up when expanded (160ms)

**Interaction:**
- Tap card body: toggle expand/collapse
- Tap checkbox: complete action (does NOT toggle expansion)
- Swipe right: complete action (works in both states)
- Swipe left: skip action (works in both states)
- Only one card can be expanded at a time — expanding a new card auto-collapses the previous one (crossfade, 160ms)

**VoiceOver**: "Double tap to show SIA's reasoning for this action."

### Progress Ring Card
- **Purpose**: Visual progress indicator for an active goal/mission
- **Data source**: Goals system (goal name, percentage, domain, next action)
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 12pt internal padding. Arranged in a horizontal ScrollView.
- **Sub-elements**:
  - Progress ring (medium): 48pt diameter, 4pt stroke. Track: white at 10%. Fill: orange (#FF5E00), clockwise from 12 o'clock. Green (#34A853) fill if 100%.
  - Percentage: 14pt Sora Semibold, white, centered inside ring
  - Goal name: 13pt Sora Semibold, white, below ring, 1 line max (truncate with ellipsis)
  - Domain color dot: 8pt circle, domain color, below goal name
- **Size**: 96pt wide x 128pt tall per card, 12pt gap between cards
- **Gestures**: Tap → stack push to Goal Detail [14]
- **Animation**: Ring fill animates on mount — 520ms ease-flow, fills from 0 to current percentage

### Section Eyebrow Label
- **Purpose**: Labels each content zone within the SectionList
- **Visual treatment**: 11pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing
- **Spacing**: 32pt above (gap from previous section), 12pt below (tight coupling to section content)
- **Examples**: "TODAY'S ACTIONS", "YOUR MISSIONS"

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Sticky header bg (scrolled) | #0A0A0F at 80% | ink-900/80 | + backdrop-blur(16px) |
| Card surfaces | #211008 | ink-brown-800 | SIA card, action cards, progress ring cards |
| SIA card left border | #7F24FF at 60% | purple/60 | Purple element 1 of 2 |
| SIA avatar ring | #7F24FF | purple | Purple element 2 of 2 |
| Level badge border | #FF5E00 | orange | Active/branded indicator |
| Level badge text | #FF5E00 | orange | RPG level number |
| Action card checkbox (completed) | #FF5E00 | orange | Primary action completion |
| Swipe-right reveal bg | #34A853 | green | Completion gesture |
| Progress ring fill (active) | #FF5E00 | orange | Progress indicator |
| Progress ring fill (complete) | #34A853 | green | 100% completion |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive ring track |
| Insight line lightning bolt | #FF5E00 | orange | Inline insight accent |
| Scheduled variant time badge | #FF5E00 | orange | Time prominence |
| Section eyebrows | #FFFFFF at 40% | white/40 | Tertiary text |
| Greeting text | #FFFFFF | white | Primary text |
| Action description | #FFFFFF | white | Primary text |
| Date, caption, meta | #FFFFFF at 50% | white/50 | Tertiary text |
| Mood chip labels | #FFFFFF at 60% | white/60 | Secondary interactive text |
| Domain tag chips | [domain color] at 15% bg, [domain color] text | per domain | Identification only |

**60/30/10 verification**: Orange dominates interactive and progress elements (level badge, checkboxes, progress ring fills, scheduled variant time badges, insight line lightning bolt). Green appears on completion states (swipe-right reveal, 100% progress rings). Purple is limited to exactly 2 elements (SIA card left border, SIA avatar ring). Domain colors appear only on tag chips. Ratio holds.

---

## Interaction States

### Action Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, normal text | — |
| Pressed | scale(0.97), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity, no touch | — |
| Loading | Skeleton shimmer (ink-brown-800 → lighter pulse) | — |
| Error | Red (#F44336) left border 2pt, error toast | error notification |
| Success (completed) | Green checkmark fills, text strikethrough, 50% opacity | success notification |
| Swiping right | Card translates, green bg reveals proportionally | light impact at 30% threshold |
| Swiping left | Card translates, gray bg reveals proportionally | light impact at 30% threshold |

### SIA Greeting Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, purple left border | — |
| Pressed | scale(0.98), bg darkens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Message area: skeleton shimmer (2-3 lines) | — |

### Progress Ring Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, ring at current fill | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Ring: gray shimmer, text: skeleton | — |

### Level Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, orange border, orange text | — |
| Pressed | scale(0.93), orange bg fills pill, text turns white | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Completion Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 24pt circle, 2pt white at 30% border, empty | — |
| Pressed | scale(0.9), border brightens to white at 60% | light impact |
| Completed | Orange fill, white checkmark scales in (0→1, 280ms) | success notification |
| Focus-visible | 2pt orange ring, offset 4pt (larger offset for small target) | — |

### Mood Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white at 10% border | — |
| Pressed | scale(0.95), bg lightens slightly | light impact |
| Selected | Orange border 1pt, label text white at 90% | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right (>30% width) | Action card | Complete action — green reveal, checkmark, success haptic |
| Swipe left (>30% width) | Action card | Skip action — gray reveal, "skip" text, medium haptic |
| Swipe right (<30% width) | Action card | Snap back to default position (280ms ease-out-soft) |
| Tap | Action card checkbox | Complete action |
| Tap | Action card body | Expand to show SIA reasoning |
| Tap | SIA greeting card | Tab switch to SIA Chat [09] |
| Tap | Progress ring card | Stack push to Goal Detail [14] |
| Tap | Level badge | Stack push to RPG Character [19] |
| Tap | Scheduled action card | Stack push to Schedule/Calendar [41] or domain screen |
| Tap | Search icon (sticky header) | Opens Global Search overlay [44] |
| Tap | Mood chip | Select mood, send to SIA (chip stays selected) |
| Tap | "view all missions" (goals section) | Tab switch to Goals [13] |
| Pull down (from top) | Entire screen | Pull-to-refresh — branded spinner (Balencia symbol rotates, orange) |
| Pull-to-refresh release | Entire screen | Refresh all data sections — medium impact haptic |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Sticky header blur | Scroll offset > 8pt | Backdrop-blur fades in (0→16px) | 160ms | ease-out-soft |
| SIA greeting card | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Action cards | Screen mount | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Progress rings | Scroll into view | Ring fill animates from 0→current% | 520ms | ease-flow |
| Action card swipe | Finger drag | Card translates with finger, reveal bg proportional | real-time | — |
| Action card snap-back | Release below threshold | Card returns to x:0 | 280ms | ease-out-soft |
| Action card complete | Swipe past threshold / tap checkbox | Green flash + checkmark scale-in, then slide down + fade | 280ms + 520ms | ease-out-soft |
| Action card skip | Swipe left past threshold | Gray flash, slide off left, collapse gap | 280ms + 520ms | ease-out-soft |
| Checkbox fill | Tap complete | Orange fills from center, checkmark scales 0→1 | 280ms | ease-flow |
| Mood chip select | Tap | Border transitions to orange, slight scale pulse (1→1.05→1) | 280ms | ease-out-soft |
| Pull-to-refresh spinner | Pull past 60pt | Balencia symbol appears, rotates continuously | loop until complete | linear rotation |
| Section eyebrows | Scroll into view | Fade-in (opacity 0→1) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (returning user)**: Crossfade from Splash [01], 280ms ease-out-soft. Content stagger begins after crossfade completes.
- **Enter (from other tab)**: Instant tab switch — no transition animation, content already mounted.
- **Exit (tab switch)**: Instant — screen stays mounted in background.
- **Exit (stack push)**: Standard iOS push (slide left), 280ms ease-out-soft.

---

## Empty States

### Day 1 (new user, just completed onboarding)
SIA fills every zone so the screen never feels empty:
- **Sticky header**: "Good morning, [Name]" + "Lv 1" badge (fresh start)
- **SIA greeting card**: Warm, directive message — "Welcome to Balencia. Let's set up your first mission — what matters most to you right now?" Mood chips omitted (too early for mood tracking).
- **Today's actions**: 1-2 SIA-generated starter actions based on onboarding answers. Example: "Take 5 minutes to reflect on your top priority this week" (wellbeing tag). These are gentle, achievable, no external data needed.
- **Goals progress**: Single prompt card (same dimensions as a progress ring card) — "Create your first mission" with a "+" icon instead of a ring. Tappable → Create Goal [15].
- **Insight line**: Hidden (insufficient data for correlations). SIA greeting stands alone without inline insight.

### Established user — all done state
When all today's actions are completed:
- **Action cards section** transforms: cards are replaced by a centered completion message
  - Green checkmark circle (48pt, #34A853 fill, white check)
  - "Nothing left today" — 17pt Sora Semibold, white
  - "Rest, explore, or add more." — 14pt Sora Regular, white at 50%
  - SIA note: "Solid day. You earned it." — 14pt Sora Regular, white at 70%, italic-style (SIA voice)
- All other sections remain visible and functional

---

## Motivation Adaptation

- **Low motivation** (SIA detects fatigue, low engagement, or user-set preference):
  - Zones shown: Sticky header, SIA greeting card, 1-2 action cards only
  - SIA greeting tone: gentle, no pressure — "One small thing today. That's enough."
  - Goals progress: hidden
  - Insight line: hidden (even if available)
  - Reduced cognitive load — screen fits in one viewport without scrolling

- **Medium motivation** (default experience):
  - Zones shown: All 4 sections
  - SIA greeting tone: warm, encouraging — "You crushed it yesterday. Ready for another good day?"
  - 4-6 action cards (including scheduled events)
  - Goals progress: horizontal scroll of active missions
  - Insight line: shown when available

- **High motivation** (SIA detects high engagement, streak, or user-set preference):
  - All 4 sections visible, fully populated
  - SIA greeting tone: data-rich, direct — "4-day streak. 3 missions ahead of schedule. Keep the momentum."
  - Full action list with time estimates and scheduled events
  - Goals progress with mini-chart sparkline inside each ring card
  - Insight line: always shown when available

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch, Goal Detail [14] via stack push, Goals List [13] via tab switch, Life Areas Overview [16] via stack push, RPG Character [19] via stack push, Schedule/Calendar [41] via stack push, Global Search [44] via overlay (tap search icon in sticky header), Create Goal [15] via modal (Day 1 "create first mission" prompt), domain dashboards [26-36] via stack push
- **Navigates from**: Splash Screen [01] via crossfade, Initial Plan Summary [08] (Batch 2) via root reset, any tab return (screen stays mounted)
- **Shared components with**: Goals List [13] (Domain Tag Chip, Progress Ring), Goal Detail [14] (Action Card, Domain Tag Chip, Progress Ring)
- **Patterns used**: Brand CTA Button (in Day 1 "create first mission" prompt), Back Button (not used — this is a tab root), 8-State Interaction Model, Motion Tokens (160ms/280ms/520ms), Content Entry Animation (staggered fade-in)
- **Patterns established**: Product Mode Screen Title Treatment (left-aligned 28pt Bold → collapses to 17pt Semibold center on scroll), Sticky Header (z-30 backdrop-blur), SIA Greeting Card (with inline insight), Domain Tag Chip, Action Card (swipeable, with scheduled variant), Progress Ring (medium variant), Section Eyebrow Label, Mood Chip, Pull-to-Refresh (branded spinner), Swipe-to-Complete/Skip gesture, Motivation-Tier Adaptation zones
