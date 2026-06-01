# Screen Design: Home Screen

**Screen**: 12 of 73
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
1. SIA greeting card — emotional anchor, sets the daily tone, most visually distinct element
2. Today's action cards — the primary interaction zone, highest engagement density
3. Time-contextual greeting + RPG level badge — persistent orientation (sticky header)
4. Active goals progress rings — visual progress feedback, horizontal scroll draws the eye
5. Schedule preview — upcoming commitments, time-sensitive context
6. Proactive insight cards — intermittent, high-value SIA observations
7. Activity feed — ambient progress awareness, lowest priority

**User flow**:
- **Arrives from**: Splash Screen [01] via crossfade (returning user with valid session), Initial Plan Summary [08] (Batch 2) via root reset (first-time user completing onboarding)
- **Primary exit**: Goal Detail [14] via stack push (tap goal progress ring)
- **Secondary exits**: SIA Chat [09] via tab switch (tap SIA greeting card or insight card), Goals List [13] via tab switch (tap "view all missions" link in goals section), RPG Character [19] via stack push (tap level badge), Schedule/Calendar [41] via stack push (tap schedule item), domain dashboards [26-36] via stack push (tap domain tag on action card)
- **Deep-link targets from SIA action cards**: Today's Actions cards can deep-link to any screen via stack push. Common targets include: Water intake [44] ("drink water"), Daily check-in [45] ("check in with yourself"), Stress management [52] ("manage your stress"), Breathing exercises [53] ("try a breathing exercise"), Meditation [54] ("meditate for 10 minutes"), Yoga [55] ("morning yoga"), Recipes [56] ("try this recipe"), Sleep tracking [58] ("log last night's sleep"), Medication tracking [60] ("take your medication"), Reminders [61] ("review your tasks"), Energy tracking [63] ("log your energy"), Fitness dashboard [26] ("morning run"), Nutrition dashboard [28] ("log breakfast"), Journal [37] ("reflect on your day"), Habits [38] ("complete your habits"), and any domain dashboard [26-36] or feature screen

---

## Layout

**Scroll behavior**: SectionList (grouped sections with section headers, allows heterogeneous content zones)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤  ← z-30, sticky on scroll
│  Good morning, Amira   Lv12│  ← greeting + level badge
│  Tuesday, May 20            │  ← date subtitle
├─────────────────────────────┤
│                             │
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐  │
│  ┊ 🟣 SIA                 ┊  │  ← purple accent left border
│  ┊ "You crushed it        ┊  │
│  ┊  yesterday. What's     ┊  │
│  ┊  worth your attention  ┊  │
│  ┊  today?"               ┊  │
│  ┊  [😊] [😐] [😔] [⚡]  ┊  │  ← mood chips (optional)
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘  │
│                             │  ← 16pt gap
│  [♡72] [🏃1,204] [😴7.2h]  │  ← health metrics strip
│                             │  ← 12pt gap
│  [🧘breathe][💧water]      │  ← quick actions row
│  [📝journal][✓check-in]    │     scrollable, 4-5 pills
│                             │  ← 24pt gap
│  TODAY'S ACTIONS            │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ 🟢 Meditate 10min  ☐ │  │  ← swipeable action card
│  │   wellness · 10 min   │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ 🔴 Morning run     ☐ │  │
│  │   fitness · 30 min    │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ 🟡 Review budget   ☐ │  │
│  │   finance · 15 min    │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  PINNED MISSIONS            │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ ◯  Run a half      📌│  │  ← pinned mission card
│  │68% marathon            │  │
│  │    🥈main 🔴fitness    │  │
│  │    Next: 5K tempo run  │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ◯  Save $5,000     📌│  │
│  │42% by December         │  │
│  │    🥉side 🟢finance    │  │
│  │    Next: Review subs   │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  COMING UP                  │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ 2:00 PM  Team standup │  │
│  │ 5:30 PM  Gym session  │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  ┌───────────────────────┐  │
│  │ ⚡ CONNECTION SPOTTED  │  │  ← insight card (intermittent)
│  │ "Sleep quality drops   │  │
│  │  30% on days you skip  │  │
│  │  exercise."            │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  RECENT ACTIVITY            │  ← eyebrow label
│  +15 XP  Completed yoga    │
│  +10 XP  Logged breakfast  │
│  +5 XP   Checked finances  │
│  "view all"                 │
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
   - Content: Greeting text (left), level badge (right), date subtitle
   - Behavior: Sticks at top on scroll (z-30), backdrop-blur(16px), ink-900 at 80% opacity

2. **SIA Greeting Card** — ~120pt
   - Purpose: Emotional anchor, daily tone-setter, SIA's voice on the home screen
   - Content: SIA message (2-3 lines) + optional mood chip row

3. **Health Metrics Strip** — ~48pt
   - Purpose: Live health data at a glance from connected wearables
   - Content: Horizontal row of 3 compact metric pills (heart rate, steps, sleep)

4. **Quick Actions Row** — ~48pt
   - Purpose: 1-tap shortcuts to frequently-used features (reduces 3-4 tap paths)
   - Content: Horizontal scrollable pills (breathe, water, journal, check-in, quick note)

5. **Today's Actions Section** — variable (~80pt per card, 12pt gaps)
   - Purpose: The primary interaction zone — cross-domain AI-curated actions
   - Content: Section eyebrow + action cards (swipeable)

6. **Pinned Missions** — variable (~100pt per card, max 3 cards, 12pt gaps)
   - Purpose: User's top-priority missions elevated for quick access
   - Content: Section eyebrow "PINNED MISSIONS" + up to 3 Pinned Mission Cards (vertical stack)

7. **Schedule Preview** — ~96pt
   - Purpose: Time-sensitive upcoming commitments
   - Content: Section eyebrow + 2-3 schedule rows

8. **Proactive Insight Cards** — ~104pt (when present, 0pt when absent)
   - Purpose: SIA's cross-domain correlation discoveries
   - Content: Insight card with correlation data

9. **Activity Feed** — ~120pt (collapsed, 3 items + "view all")
   - Purpose: Ambient awareness of recent progress
   - Content: Section eyebrow + recent XP/completion items + "view all" link

10. **Bottom Spacer** — 16pt
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
  - Level badge: "Lv [##]" in a pill (24pt tall, 48pt+ wide), ink-brown-800 bg, orange (#FF5E00) border 1pt, 13pt Sora Semibold orange text. Level derived from overall character power using logarithmic XP curve (`xp_required(level) = 100 * level^1.5`). Tappable → RPG Character [19]
- **Size**: Full-width, 44pt content height (below status bar)

### SIA Greeting Card
- **Purpose**: Daily conversational message from SIA — the emotional core of the home screen
- **Data source**: SIA AI engine (personalized based on user's recent activity, mood, time of day)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Purple (#7F24FF) left border accent, 3pt wide, 60% opacity. This is one of the max-2 purple elements on this screen.
- **Sub-elements**:
  - SIA avatar: 24pt circle, ink-brown-800 bg with 2pt purple (#7F24FF) ring, top-left corner of card
  - "SIA" label: 12pt Sora Semibold, white at 50%, right of avatar
  - Message text: 15pt Sora Regular, white at 90%, 2-3 lines max
  - Mood chips row (optional): 4 chips below message, 8pt gap between. Each chip: 32pt tall, pill shape (999pt radius), ink-brown-800 bg, 1pt white at 10% border, emoji (16pt) + label (12pt Sora Regular, white at 60%). Tapping a chip sends mood to SIA (not required to proceed).
- **Gestures**: Tap entire card → tab switch to SIA Chat [09]
- **Size**: Full-width minus 32pt (16pt margins), ~120pt tall (variable with message length)
- **Variants**: With mood chips (default), without mood chips (when SIA doesn't ask)

### Health Metrics Strip
- **Purpose**: Live wearable health data at a glance — heart rate, steps, last night's sleep
- **Data source**: Wearable sync APIs (Apple Health, WHOOP via Connected Services [22]). Falls back to manual entries if no wearable connected.
- **Visual treatment**: Horizontal row of 3 compact metric pills, evenly spaced, full-width minus 32pt. 16pt top margin below SIA Greeting Card.
  - Each pill: ink-brown-800 bg, --r-pill, 36pt height, 12pt horizontal padding, 1pt border white at 8%
  - Content: metric icon (14pt, white at 50%) + value (15pt Sora Semibold, white) + unit (12pt Sora Regular, white at 40%)
  - Pill 1: heart icon + "72" + "bpm" (live or last reading)
  - Pill 2: footsteps icon + "1,204" + "steps" (today's total)
  - Pill 3: moon icon + "7.2" + "hrs" (last night's sleep)
- **Variants**:
  - Connected (data flowing): values update periodically (every 5 min for HR, real-time for steps)
  - No wearable: strip hidden entirely (does not show empty state — preserves clean layout)
  - Partial data: only shows pills for available metrics (1-3 pills, centered)
- **Gestures**: Tap any pill → navigates to relevant domain dashboard (Fitness [26] for HR/steps, Sleep [58] for sleep)
- **Size**: full-width minus 32pt x 48pt (including 6pt vertical padding)

### Quick Actions Row
- **Purpose**: 1-tap shortcuts to stress-relief and daily-use features, reducing 3-4 tap navigation paths to 1 tap
- **Data source**: Static shortcuts (breathing, water, journal, check-in) + optional SIA-suggested 5th action
- **Visual treatment**: Horizontal scrollable row, 12pt gap below Health Metrics Strip (or 16pt below SIA card if no wearable). Left-aligned with 16pt margin.
  - Each action pill: ink-brown-800 bg, --r-pill, 40pt height, 16pt horizontal padding, 1pt border white at 8%
  - Content: contextual icon (16pt, orange #FF5E00) + label (13pt Sora Semibold, white)
  - Default actions: "breathe" (wind icon), "water" (droplet icon), "journal" (pencil icon), "check-in" (heart-pulse icon)
  - Optional 5th: SIA-suggested based on context (e.g., "quick note", "meditate", "log meal"), with purple dot (4pt) before icon to indicate SIA suggestion
- **Variants**:
  - Default (4 pills): breathe, water, journal, check-in
  - SIA-enhanced (5 pills): adds contextual suggestion at the end
  - Low motivation: only 2 pills shown (breathe, check-in) — reduces choice paralysis
- **Gestures**: Tap pill → navigates to respective screen (Breathing [53], Water [44], Journal [37], Daily Check-in [45], etc.) via stack push. Horizontal scroll if pills overflow.
- **Size**: full-width x 48pt (including 4pt vertical padding)

### Domain Tag Chip
- **Purpose**: Color-coded identifier showing which life domain an item belongs to
- **Data source**: Domain assignment from goals/actions system
- **Visual treatment**: Pill shape (--r-sm, 10pt radius), domain color background at 15% opacity, domain color text
- **Sub-elements**:
  - Domain icon: 14pt, domain color, left side (optional — omit in tight spaces)
  - Domain label: 11pt Sora Semibold, domain color, sentence case
- **Size**: Height 24pt, width auto (padding 8pt horizontal, 12pt with icon)
- **Domain colors**: Fitness #EF4444, Sleep #818CF8, Career #6366F1, Nutrition #84CC16, Finance #10B981, Faith #A855F7, Productivity #F97316, Relationships #EC4899, Wellbeing #14B8A6, Meditation #A78BFA
- **Variants**: Tappable (navigates to domain dashboard) or static (informational only). On this screen: static on action cards, tappable in insight cards.
- **Multiple chips**: Inline with 8pt gap. A single action can have 1-3 domain tags (cross-domain).

### Action Card
- **Purpose**: A single actionable item from today's AI-curated action list
- **Data source**: SIA action engine (cross-domain, priority-ordered)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Full-width minus 32pt (16pt margins).
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

### Pinned Mission Card (Phase 2 — replaces Progress Ring Card)
- **Purpose**: Vertical card for the user's pinned top-priority missions (up to 3)
- **Data source**: Missions system — only missions the user has pinned (via Mission Board [13] or Mission Detail [14])
- **Visual treatment**: Uses Pinned Mission Card pattern from `_shared-patterns.md` — ink-brown-800 (#211008), 28pt radius, 24pt padding, full-width minus 32pt (16pt margins). Vertical stack with 12pt gaps.
- **Sub-elements**:
  - Left column (64pt wide): Progress Ring small (36pt), centered vertically
  - Right column (remaining width, 12pt gap from left):
    - Row 1: Mission name — 16pt Sora Semibold, white, 2 lines max
    - Row 2: Mission Type Badge + Domain Tag Chip(s), inline, 4pt top margin
    - Row 3: "Next: [action text]" — 13pt Sora Regular, white at 70%, 1 line truncate, 4pt top margin
    - Row 4: "⚡ [##] XP" (12pt Sora Semibold, orange) + "🔥 [##]d" (12pt Sora Semibold, white at 60%), 8pt top margin
  - Pin icon: 12pt, white at 30%, top-right corner (8pt inset)
- **Size**: Full-width minus 32pt, ~100pt tall per card
- **Gestures**: Tap card → stack push to Mission Detail [14]. Tap "Next:" row → complete action inline.
- **Animation**: Staggered card entry — fade-in + translateY(12→0), 80ms stagger, 280ms each
- **Daily/weekly action card badge**: Today's Actions cards that correspond to daily or weekly missions show a Mission Type Badge (mission-sage for daily, mission-steel for weekly) inline with their domain tag chips. No other layout changes.

**Section empty state** (no missions pinned): "Pin your top missions from the Goals tab to track them here." — 15pt Sora Regular, white at 50%, centered. No card surface.

**Section hidden state** (no missions at all): Section does not render.

### Schedule Row
- **Purpose**: Single upcoming event/task in the schedule preview
- **Data source**: Calendar sync or manual entries
- **Visual treatment**: No card surface — flat row within a section card. 1pt white at 5% divider between rows.
- **Sub-elements**:
  - Time: 13pt Sora Semibold, orange (#FF5E00), left-aligned, 56pt fixed width
  - Event name: 15pt Sora Regular, white, left of domain tag
  - Domain tag chip: right-aligned (if applicable)
- **Size**: Full-width, 44pt tall per row
- **Gestures**: Tap → stack push to Schedule/Calendar [41] or relevant domain screen

### Insight Card
- **Purpose**: SIA's cross-domain correlation discovery — a high-value intermittent element
- **Data source**: SIA correlation engine (appears when confidence threshold is met, not always present)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Subtle orange (#FF5E00) top border accent, 2pt.
- **Sub-elements**:
  - Eyebrow: "connection spotted" — 12pt Sora Semibold, orange (#FF5E00), uppercase, +0.12em tracking
  - Insight text: 15pt Sora Regular, white at 90%, 2-3 lines
  - Domain tag chips: inline, showing which domains are correlated
  - Arrow icon: 16pt, white at 40%, right side (indicates tappable)
- **Size**: Full-width minus 32pt, ~104pt tall
- **Gestures**: Tap → tab switch to SIA Chat [09] (SIA explains the insight in conversation)
- **Variants**: Present (when SIA has a high-confidence insight), absent (no card rendered — section collapses)

### Activity Feed Item
- **Purpose**: Single line of recent activity (XP, completion, streak)
- **Data source**: Activity log / XP system
- **Visual treatment**: Flat row, no card surface
- **Sub-elements**:
  - XP badge: "+[##] XP" in 12pt Sora Semibold, orange (#FF5E00)
  - Description: 14pt Sora Regular, white at 70%
  - Timestamp: 12pt Sora Regular, white at 30%, right-aligned (optional, "2h ago")
- **Size**: Full-width, 36pt tall per item, 8pt gap between
- **Collapsed default**: 3 most recent items + "view all" link (14pt Sora Semibold, orange)
- **Gestures**: "view all" tap → push to a full activity history screen (not yet scoped)

### Section Eyebrow Label
- **Purpose**: Labels each content zone within the SectionList
- **Visual treatment**: 12pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing
- **Spacing**: 32pt above (gap from previous section), 12pt below (tight coupling to section content)
- **Examples**: "TODAY'S ACTIONS", "PINNED MISSIONS", "COMING UP", "RECENT ACTIVITY"

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Sticky header bg (scrolled) | #0A0A0F at 80% | ink-900/80 | + backdrop-blur(16px) |
| Card surfaces | #211008 | ink-brown-800 | SIA card, action cards, progress ring cards, insight card |
| SIA card left border | #7F24FF at 60% | purple/60 | Purple element 1 of 2 |
| SIA avatar ring | #7F24FF | purple | Purple element 2 of 2 |
| Level badge border | #FF5E00 | orange | Active/branded indicator |
| Level badge text | #FF5E00 | orange | RPG level number |
| Action card checkbox (completed) | #FF5E00 | orange | Primary action completion |
| Swipe-right reveal bg | #34A853 | green | Completion gesture |
| Progress ring fill (active) | #FF5E00 | orange | Progress indicator |
| Progress ring fill (complete) | #34A853 | green | 100% completion |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive ring track |
| Insight card top border | #FF5E00 | orange | Attention draw |
| "connection spotted" eyebrow | #FF5E00 | orange | Accent text |
| XP badge text | #FF5E00 | orange | Reward indicator |
| Schedule time text | #FF5E00 | orange | Time prominence |
| Section eyebrows | #FFFFFF at 40% | white/40 | Tertiary text |
| Greeting text | #FFFFFF | white | Primary text |
| Action description | #FFFFFF | white | Primary text |
| Date, caption, meta | #FFFFFF at 50% | white/50 | Tertiary text |
| Mood chip labels | #FFFFFF at 60% | white/60 | Secondary interactive text |
| Domain tag chips (10 domains) | [domain color] at 15% bg, [domain color] text | per domain | Identification only — see `_shared-patterns.md` domain color table |

**60/30/10 verification**: Orange dominates interactive and progress elements (level badge, checkboxes, progress ring fills, schedule times, XP badges, insight eyebrow, "view all" link). Green appears on completion states (swipe-right reveal, 100% progress rings). Purple is limited to exactly 2 elements (SIA card left border, SIA avatar ring). Domain colors appear only on tag chips. Ratio holds.

---

## Interaction States

### Action Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, normal text | — |
| Pressed | scale(0.97), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, no touch | — |
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

### Schedule Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Flat row, no highlight | — |
| Pressed | Full row bg: white at 5% | light impact |
| Focus-visible | 2pt orange ring around row, offset 2pt | — |

### Insight Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, orange top border | — |
| Pressed | scale(0.98), bg darkens | light impact |
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
| Tap | Schedule row | Stack push to Schedule/Calendar [41] or domain screen |
| Tap | Insight card | Tab switch to SIA Chat [09] with insight context |
| Tap | Mood chip | Select mood, send to SIA (chip stays selected) |
| Tap | "view all" (activity feed) | Push to full activity history |
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
| Insight card | Mount (when available) | Fade-in + translateY(16→0) | 520ms | ease-flow |
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
- **Schedule preview**: Hidden entirely (no calendar connected yet). Section does not render.
- **Insight cards**: Hidden (insufficient data for correlations). Section does not render.
- **Activity feed**: Single item — "Welcome to Balencia — +10 XP" as the genesis event.

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
  - Goals progress, schedule, insights, activity feed: all hidden
  - Reduced cognitive load — screen fits in one viewport without scrolling

- **Medium motivation** (default experience):
  - Zones shown: All except proactive insight cards (shown only when available) and activity feed collapsed to 3 items
  - SIA greeting tone: warm, encouraging — "You crushed it yesterday. What's worth your attention today?"
  - 4-6 action cards
  - Goals progress: horizontal scroll of active missions

- **High motivation** (SIA detects high engagement, streak, or user-set preference):
  - All 7 zones visible, fully populated
  - SIA greeting tone: data-rich, direct — "4-day streak. 3 missions ahead of schedule. Keep the momentum."
  - Full action list with time estimates
  - Goals progress with mini-chart sparkline inside each ring card
  - Schedule with conflict flags
  - All available insight cards shown
  - Activity feed: 5 items + "view all"

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Greeting ("Good morning, Name") | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Date subtitle | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Level badge text | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| SIA "SIA" label | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| SIA greeting message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 90% |
| Mood chip label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 60% |
| Health metric value | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Health metric unit | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Quick action pill label | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Section eyebrow label | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| Action card description | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Action card time/domain | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Progress ring percentage | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Progress ring goal name | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Schedule time | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| Schedule event name | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Insight "connection spotted" | Sora | Semibold (600) | 12pt | 16pt | #FF5E00 |
| Insight text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 90% |
| XP badge | Sora | Semibold (600) | 12pt | 16pt | #FF5E00 |
| Activity description | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Activity timestamp | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 30% |
| "view all" link | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| All done heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| All done body | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| All done SIA note | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (full) | All data sections show skeleton shimmer states. Network error banner appears at top below sticky header. | Pull-to-refresh retries all data fetches. Auto-retry every 30s in background. |
| SIA greeting API timeout | SIA Greeting Card shows skeleton shimmer (2-3 line placeholder). Other sections load independently. | Card retries silently. Falls back to generic time-based greeting after 3 retries. |
| Health metrics sync failure | Health Metrics Strip hidden entirely (same as no-wearable state). No error indicator shown. | Data refreshes on next successful wearable sync. Pull-to-refresh retries. |
| Action list empty response | "Today's Actions" section shows: "SIA is preparing your actions." Temporary skeleton state. | Auto-refreshes. If persistent, shows Day 1 starter actions. |
| Goal progress API failure | Progress ring cards show skeleton shimmer (gray ring + placeholder text). | Pull-to-refresh retries. Rings load independently from action cards. |
| Calendar sync failure | Schedule Preview section hidden (same as no-calendar state). | Section reappears on next successful sync. |
| Partial data load | Sections that loaded successfully display normally. Failed sections show individual skeleton states. | Each section retries independently. Pull-to-refresh retries all. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Level badge: "Level [number], tap to view RPG character"
  - SIA greeting card: "SIA says: [message text], tap to open SIA chat"
  - Mood chips: "Select mood: [emoji name]" (e.g., "Select mood: happy")
  - Health metric pill: "[metric name]: [value] [unit]" (e.g., "Heart rate: 72 bpm")
  - Quick action pill: "[action name], tap to open" (e.g., "Breathe, tap to open breathing exercises")
  - Action card: "[action description], [domain], [time estimate], tap to expand, swipe right to complete"
  - Completion checkbox: "Mark [action] as complete"
  - Progress ring card: "[goal name], [percentage] complete, tap to view details"
  - Insight card: "SIA insight: [insight text], tap to discuss with SIA"
- **Focus order**: Sticky header (greeting, level badge) -> SIA greeting card -> Mood chips -> Health metrics strip -> Quick actions row -> Section eyebrow -> Action cards (top to bottom) -> Progress ring cards (left to right) -> Schedule rows -> Insight card -> Activity feed items -> "view all" link
- **Gesture alternatives**: Swipe-right-to-complete on action cards also available via checkbox tap. Pull-to-refresh also available via explicit refresh action in assistive technology rotor.
- **Reduced motion**: Staggered entry animations replaced with instant display. Progress ring fill appears immediately at final value. Pull-to-refresh spinner is a static icon.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch, Mission Detail [14] via stack push (pinned mission card tap), Mission Board [13] via tab switch ("view all missions" link), Life Areas Overview [16] via stack push, RPG Character [19] via stack push, Schedule/Calendar [41] via stack push, Create Mission [15] via modal (Day 1 "create first mission" prompt), Universal Search [68] via search icon in header (modal presentation), domain dashboards [26-36] via stack push, and via SIA action card deep-links: Water intake [44], Daily check-in [45], Stress management [52], Breathing exercises [53], Meditation [54], Yoga [55], Recipes [56], Sleep tracking [58], Medication tracking [60], Reminders [61], Energy tracking [63], and any other feature screen (all stack push)
- **Navigates from**: Splash Screen [01] via crossfade, Initial Plan Summary [08] (Batch 2) via root reset, any tab return (screen stays mounted)
- **Shared components with**: Mission Board [13] (Domain Tag Chip, Progress Ring, Mission Type Badge, Pinned Mission Card), Mission Detail [14] (Action Card, Domain Tag Chip, Progress Ring, Mission Type Badge)
- **Patterns used**: Brand CTA Button (in Day 1 "create first mission" prompt), Back Button (not used — this is a tab root), 8-State Interaction Model, Motion Tokens (160ms/280ms/520ms), Content Entry Animation (staggered fade-in)
- **Patterns established**: Product Mode Screen Title Treatment (left-aligned 28pt Bold → collapses to 17pt Semibold center on scroll), Sticky Header (z-30 backdrop-blur), SIA Greeting Card, Domain Tag Chip, Action Card (swipeable), Progress Ring (medium variant), Section Eyebrow Label, Insight Card, Activity Feed Item, Schedule Row, Mood Chip, Pull-to-Refresh (branded spinner), Swipe-to-Complete/Skip gesture, Motivation-Tier Adaptation zones, **Health Metrics Strip** (compact wearable data pills — HR, steps, sleep — hidden when no wearable connected), **Quick Actions Row** (1-tap shortcut pills to breathing, water, journal, check-in — collapses deep navigation paths), **Pinned Mission Card** (Phase 2 — vertical mission cards with type badge, replacing horizontal Progress Ring Card scroll)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-03.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/today`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B03-F07 | critical | retention | Wire completion, shortcut navigation, mood capture, and action-card expansion/deep-link behavior. |
| B03-F08 | major | mobile-ergonomics | Increase touch hit areas to at least 44x44 while preserving the visual rhythm. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

