# Screen Design: Learning & Growth Dashboard

**Screen**: 35 of 73
**File**: 35-learning-growth-dashboard.md
**Register**: Product Mode
**Primary action**: log study session
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Learning & Growth). Entry from Explore [18] grid card or SIA deep-link [09]. Exit via back button to Explore, or forward to Goal Detail [14], SIA Chat [09], Journal [37].

---

## Purpose

This screen is the user's command center for intellectual development — books, courses, study habits, and AI-guided learning paths. It answers "what should I learn next and how am I progressing?" SIA acts as a study coach: tracking reading pace, suggesting learning paths, and connecting study habits to outcomes across other life domains. The screen follows the **Domain Dashboard Template** established by Screen 26 (Fitness & Workouts Dashboard).

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with cyan accent — immediate domain identification
2. SIA coaching note — personalized learning insight, the first content read
3. Current book/course progress — the active learning item with progress bar
4. AI-suggested learning actions — SIA's recommended next steps
5. Active learning goals — progress rings showing goal completion
6. Reading/study streak and consistency — 7-day tracker
7. Book/course library — full list of tracked items
8. Recent activity log — session history

**User flow**:
- **Arrives from**: Explore [18] via "Learning & growth" module card (stack push), or SIA Chat [09] via deep-link when SIA references a learning insight
- **Primary exit**: Back to Explore [18] (stack pop via back button or swipe-right)
- **Secondary exits**: Goal Detail [14] via goal ring tap (stack push), SIA Chat [09] via coaching note tap (tab switch), Journal [37] via daily study prompt "reflect" chip (stack push)

---

## Layout

**Scroll behavior**: ScrollView (content is ~950-1100pt tall, always scrollable)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤ ← STICKY
│  ← [back]  "Learning & growth" [...] │  ← Domain Header
│  ════════════════════════════════   │  ← 3pt cyan accent line
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ ● SIA: "You've read 45     │   │  ← SIA Coaching Note
│  │   pages this week across 2  │   │     Card (ink-brown-800)
│  │   books. At this pace,      │   │     purple dot (●)
│  │   you'll finish by June 3." │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  Thinking, Fast and Slow    │   │  ← Current Book Card
│  │  Daniel Kahneman            │   │
│  │  ▓▓▓▓▓▓▓▓▓░░░░░░  62%     │   │  ← Cyan progress bar
│  │  15 pages / day goal        │   │
│  │  🔥 4-day reading streak    │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  SIA SUGGESTS                       │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  ☐ Read chapter 7           │   │  ← AI Learning Path
│  │  ☐ Review yesterday's notes │   │     Actions (checkable)
│  │  ☐ Start module 3 of course │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ACTIVE GOALS                       │  ← Eyebrow
│  ┌──────┐ ┌──────┐ ┌──────┐ →     │  ← Horizontal scroll
│  │ ◯68% │ │ ◯42% │ │ ◯91% │       │     Progress rings
│  │Read  │ │Course│ │Write │       │     (cyan fill)
│  └──────┘ └──────┘ └──────┘       │
│                                     │  ← 24pt gap
│  CONSISTENCY                        │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  🔥 12-day streak  best: 34│   │  ← Streak Tracker
│  │  [●][●][●][○][●][●][◐]    │   │     7-day dots
│  │   M  T  W  T  F  S  S     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  YOUR LIBRARY                       │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ ◯62% Thinking, Fast & Slow │   │  ← Book/Course List
│  │──────────────────────────── │   │
│  │ ◯30% Data Science (Coursera)│   │
│  │──────────────────────────── │   │
│  │ ◯100% Atomic Habits    ✓   │   │
│  │  see all →                  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  RECENT ACTIVITY                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │  today · 45 min reading     │   │  ← Activity Log
│  │  yesterday · 30 min course  │   │
│  │  May 18 · 60 min reading    │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐   │
│  │ "What was the most         │   │  ← Daily Study Prompt
│  │  counterintuitive idea      │   │     (italic, subtle card)
│  │  from your reading today?"  │   │
│  │           [reflect]         │   │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘   │
│                                     │
│                       ┌────────────┐│
│                       │ + log session ││ ← FAB (orange pill)
│                       └────────────┘│
│                                     │  ← 48pt bottom breathing
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** — 88pt (44pt nav row + 4pt accent line + 40pt large title area)
   - Purpose: Domain identification, back navigation, overflow menu
   - Content: Back chevron, domain name "Learning & growth", 3pt cyan accent line, overflow three-dot menu

2. **SIA Coaching Note Card** — ~100pt (auto-height)
   - Purpose: Personalized AI insight about learning progress
   - Content: Purple dot indicator + SIA's coaching message about study patterns

3. **Current Book/Course Card** — ~140pt
   - Purpose: Show the active learning item with progress
   - Content: Title, author, progress bar (cyan fill), daily goal, inline reading streak

4. **AI Learning Path Card** — ~120pt
   - Purpose: SIA's recommended next actions
   - Content: 2-3 checkable action items generated by SIA

5. **Active Goals Section** — ~140pt
   - Purpose: Show learning-related goals with progress rings
   - Content: Horizontal scroll of goal progress rings (cyan fill)

6. **Streak Tracker Card** — ~100pt
   - Purpose: Visualize study consistency
   - Content: Streak count + flame icon, 7-day dot row, best streak

7. **Book/Course Library Card** — ~180pt
   - Purpose: Browse all tracked books and courses
   - Content: List rows with mini progress rings, title, status

8. **Activity Log Card** — ~160pt
   - Purpose: Recent study session history
   - Content: 3-5 rows with date, description, XP earned

9. **Daily Study Prompt** — ~80pt
   - Purpose: SIA-generated reflection question linking to Journal
   - Content: Italic prompt text + "reflect" action chip

10. **Floating Action Button** — 48pt height (fixed position)
    - Purpose: Primary action — log a study session
    - Content: Plus icon + "log session" label

---

## Components

### Domain Header (STICKY)
- **Purpose**: Identifies the domain, provides back navigation, collapses on scroll
- **Data source**: Static (domain name, domain color)
- **Visual treatment**: Sticky header at z-30 with backdrop-blur(20px). ink-900 at 90% opacity when scrolled.
- **Structure**:
  - Navigation row (44pt): Back chevron left (16pt from left edge, 44x44pt touch target), center title "Learning & growth" (17pt Sora Semibold, white, visible only when collapsed), overflow menu right (three-dot, 44x44pt, 16pt from right edge)
  - Cyan accent line: 3pt tall, full width, cyan (#06B6D4) at 80% opacity
  - Large title area (40pt, scrolls away): "Learning & growth" left-aligned 24pt from left, 28pt Sora Bold, white. Small 8pt cyan dot right of title baseline.
- **Collapse behavior**: At scroll position 0, large title visible, center title hidden. Past ~40pt scroll, large title collapses up (translateY 0 to -40pt, opacity 1 to 0), center title fades in (280ms, ease-out-soft). Accent line remains sticky.
- **Variants**: Expanded (at rest), Collapsed (scrolled)
- **Size**: Full-width x 88pt (expanded), full-width x 48pt (collapsed)

### SIA Coaching Note Card
- **Purpose**: Delivers SIA's domain-specific insight
- **Data source**: AI-generated, refreshed on screen load and pull-to-refresh
- **Visual treatment**: ink-brown-800 (#211008) card with glassmorphism (border: 1pt solid white at 8%, backdrop-blur if layered). Border radius: 20pt (--r-xl). Padding: 24pt all sides.
- **Content**: Purple dot (6pt circle, #7F24FF) inline-left of first line. Text: 15pt Sora Regular, white at 90%.
- **Example copy**: "You've read 45 pages this week across 2 books. At this pace, you'll finish 'Thinking, Fast and Slow' by June 3."
- **Optional action chip**: If actionable — ink-brown-800 bg, 1pt white 10% border, 12pt Sora Semibold, white at 70%, --r-pill, 32pt height.
- **Gestures**: Tap navigates to SIA Chat [09] with learning context
- **Size**: Full-width minus 32pt (16pt margins each side) x auto-height (~80-120pt)

### Current Book/Course Card
- **Purpose**: Shows the primary active learning item with progress tracking
- **Data source**: API — user's currently active book/course record
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Title: 17pt Sora Semibold, white
  - Author/source: 13pt Sora Regular, white at 50%, 4pt below title
  - Progress bar: Full-width inside card, 8pt tall, --r-xs (6pt) corners. Track: white at 8%. Fill: cyan (#06B6D4). Percentage label right-aligned above bar: 13pt Sora Regular, white at 70%. 16pt gap above bar.
  - Daily goal: "15 pages / day" — 13pt Sora Regular, white at 50%, 8pt below bar
  - Reading streak inline: Flame icon (16pt, orange #FF5E00) + "4-day reading streak" 13pt Sora Semibold, white at 70%, 8pt below daily goal
- **Variants**: Book (shows author), Course (shows platform), Empty (no active item — shows "start your first book or course" + action chip)
- **Gestures**: Tap expands to show chapter list or navigates to detail view
- **Size**: Full-width minus 32pt x ~140pt

### AI Learning Path Card
- **Purpose**: SIA's recommended study actions for the user
- **Data source**: AI-generated, based on user's goals and current progress
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Eyebrow: "SIA SUGGESTS" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking
  - 2-3 action items, each:
    - Checkbox: 24pt square, --r-xs corners, border 1.5pt white at 20%. Checked: cyan (#06B6D4) fill, white checkmark (12pt). Check animation: scale(0 to 1) with 160ms ease-out-soft.
    - Text: 15pt Sora Regular, white at 80%, 12pt left of checkbox
    - Completed: text strikethrough at 40% opacity, "+15 XP" floats up in green (#34A853), 12pt Sora Semibold
  - Each item: 48pt row height (44pt touch target), 8pt gap between items
- **Variants**: Populated (2-3 actions), All complete (congratulatory message + "ask SIA for more"), Loading (skeleton shimmer)
- **Gestures**: Tap checkbox to complete action
- **Size**: Full-width minus 32pt x ~120pt

### Active Goals Section
- **Purpose**: Shows learning-domain goals with visual progress
- **Data source**: API — goals filtered by Learning & Growth domain
- **Visual treatment**: No enclosing card — eyebrow label above horizontal ScrollView
- **Content**:
  - Eyebrow: "ACTIVE GOALS" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin
  - Horizontal ScrollView: 16pt left/right content insets, 12pt gap between items
  - Each Goal Ring Item (100pt wide x 120pt tall):
    - Progress ring: 64pt diameter, 4pt stroke. Track: white at 8%. Fill arc: cyan (#06B6D4). Percentage centered: 16pt Sora Semibold, white.
    - Goal name: 2 lines max, 13pt Sora Regular, white at 70%, center-aligned, 12pt below ring
  - Tap: Navigates to Goal Detail [14] (stack push)
- **Variants**: Populated (1-5 goals), Empty ("No active learning goals. Ask SIA to help you set one." card with action chip, 80pt tall)
- **Gestures**: Horizontal swipe to scroll, tap ring to navigate
- **Size**: Full-width x ~140pt

### Streak Tracker Card
- **Purpose**: Visualize study consistency over the past 7 days
- **Data source**: API — daily activity log aggregated into completion booleans
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding
- **Content**:
  - Top row: Flame icon (20pt, orange #FF5E00) + "12-day streak" (17pt Sora Semibold, white). Right-aligned: "best: 34" (13pt Sora Regular, white at 40%).
  - 12pt gap
  - 7-day dot row (Mon–Sun), each dot:
    - Size: 32pt circle
    - Completed: domain color fill (cyan #06B6D4 on this screen), white checkmark (12pt). On other domain dashboards, use that domain's color.
    - Missed: white at 8% fill
    - Today (incomplete): white at 15% fill, 1pt dashed domain color border (cyan on this screen)
    - Today (complete): domain color fill, subtle domain color glow (domain color at 20% opacity, 8pt blur)
    - Day label: 11pt Sora Regular, white at 30%, centered below each dot (M, T, W, T, F, S, S)
    - Dots fill width evenly (12pt gap between dot edges)
- **Variants**: Active streak (flame orange), No streak ("start today" messaging)
- **Gestures**: Tap any dot for that day's detail (lightweight tooltip or nothing in V1)
- **Size**: Full-width minus 32pt x ~100pt

### Book/Course Library Card
- **Purpose**: Browse all tracked learning items
- **Data source**: API — user's book and course collection
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius. No top/bottom padding — rows fill edge-to-edge.
- **Content**:
  - Eyebrow above card: "YOUR LIBRARY" — same eyebrow treatment, 8pt gap below
  - Each row (56pt):
    - Left: Mini progress ring (32pt diameter, cyan fill)
    - Center: Title (15pt Sora Semibold, white) + status below (13pt Regular, white at 40%: "in progress" / "completed" / "not started")
    - Right: Percentage (15pt Sora Regular, white at 50%). Completed items: green checkmark instead.
    - Padding: 16pt horizontal
    - Separator: 1pt white at 5%, inset 16pt left
  - Max 4 visible rows. "see all" link: 14pt Sora Semibold, orange (#FF5E00), center-aligned, 44pt touch target.
- **Variants**: Populated (1-20+ items), Empty ("add your first book or course" + action chip)
- **Gestures**: Tap row to view detail, tap "see all" for full list
- **Size**: Full-width minus 32pt x ~180pt

### Activity Log Card
- **Purpose**: Recent study session history
- **Data source**: API — learning activity entries sorted by recency
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius. No top/bottom padding.
- **Content**:
  - Eyebrow above card: "RECENT ACTIVITY" — same treatment
  - Each row (56pt):
    - Left: Date label (13pt Sora Regular, white at 40%). Relative: "today", "yesterday", then "May 18".
    - Center: Description (15pt Sora Regular, white at 90%): "45 min reading" / "30 min course module"
    - Right: XP earned ("+25 XP" 12pt Sora Semibold, green #34A853). Omitted if no XP.
    - Separator: 1pt white at 5%, inset 16pt left. No separator on last row.
  - Max 5 rows. "see all" link if more.
- **Variants**: Populated, Empty (hidden entirely — section does not appear until first entry)
- **Gestures**: Tap row for session detail (expand inline or navigate)
- **Size**: Full-width minus 32pt x ~160pt

### Daily Study Prompt
- **Purpose**: SIA-generated reflection question to encourage deeper learning
- **Data source**: AI-generated daily
- **Visual treatment**: Dashed border card (1pt white at 10% dashed border), 20pt radius, 24pt padding. Background: ink-900 (no fill — differentiated from solid cards above).
- **Content**:
  - Prompt text: 15pt Sora Regular italic, white at 70%. Example: "What was the most counterintuitive idea from your reading today?"
  - "reflect" chip: 8pt below prompt. ink-brown-800 bg, 1pt white 10% border, 13pt Sora Semibold, white at 70%, --r-pill, 32pt height, 16pt horizontal padding. Tapping navigates to Journal [37] with prompt pre-loaded.
- **Variants**: With prompt (default), Hidden (if user has disabled prompts)
- **Gestures**: Tap "reflect" to navigate to Journal [37]
- **Size**: Full-width minus 32pt x ~80pt

### Floating Action Button (FAB)
- **Purpose**: Primary action — log a new study session
- **Data source**: None (triggers creation flow)
- **Visual treatment**: Fixed position, right-aligned. 16pt from right edge, 24pt above tab bar top.
- **Shape**: Pill (--r-pill). Height: 48pt. Padding: 16pt left, 20pt right.
- **Background**: Burnt Orange (#FF5E00). Shadow: --shadow-2.
- **Content**: Plus icon (16pt, white, 2pt stroke) + 8pt gap + "log session" (15pt Sora Semibold, white)
- **Z-layer**: z-40
- **Gestures**: Tap opens session logging modal (bottom sheet slide-up)
- **Size**: Auto-width (~140pt) x 48pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism with 1pt white 8% border |
| Card borders | white at 8% | — | Subtle glass edge |
| Header accent line | #06B6D4 at 80% | cyan (domain) | Domain identification only |
| Header title dot | #06B6D4 | cyan (domain) | 8pt dot beside large title |
| Progress bar fill | #06B6D4 | cyan (domain) | Book/course progress |
| Goal ring arc fill | #06B6D4 | cyan (domain) | Active goals |
| Streak completed dots | #06B6D4 | cyan (domain) | 7-day consistency |
| AI action checkboxes (checked) | #06B6D4 | cyan (domain) | Checked state fill |
| SIA purple dot | #7F24FF | purple (accent) | Sole purple element — 10% rule |
| FAB background | #FF5E00 | orange (primary) | CTA — always orange, never domain |
| Streak flame icon | #FF5E00 | orange (primary) | Streak emphasis |
| "see all" / action links | #FF5E00 | orange (primary) | Interactive links |
| XP earned text | #34A853 | green (secondary) | Success/reward — 30% rule |
| Completed checkmark (library) | #34A853 | green (secondary) | Completion indicator |
| Primary text | #FFFFFF | white | Titles, body, labels |
| Secondary text | white at 70% | — | Descriptions, percentages |
| Tertiary text | white at 50% | — | Authors, dates, metadata |
| Quaternary text | white at 40% | — | Eyebrows, best streak, day labels |
| Prompt text | white at 70% italic | — | Daily study prompt |

**60/30/10 verification**: Orange dominates actions (FAB, links, streak flame). Green appears on XP rewards and completion states. Purple is limited to the single 6pt SIA dot. Domain cyan appears on progress fills, goal rings, streak dots, and checkboxes — these are identification/progress elements, not actions. The ratio holds.

---

## Interaction States

### Domain Header Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 100% opacity | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always enabled) | — |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt white 8% border | — |
| Pressed | bg lightens (white 3% overlay), scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer (3 text lines) | — |
| Error | "unable to load insight" text, white at 40% | — |

### AI Action Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt square, white at 20% border, transparent fill | — |
| Pressed | Border brightens to white at 40%, scale(0.95) | light impact |
| Checked | Cyan fill, white checkmark scales in (0 to 1, 160ms), text strikethrough | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |

### Goal Progress Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Cyan arc on white 8% track | — |
| Pressed | Ring scale(1.05), subtle cyan glow (cyan at 15%, 8pt blur) | light impact |
| Focus-visible | 2pt orange ring around ring, offset 2pt | — |

### Book/Course List Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, transparent bg | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Activity Log Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, transparent bg | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white icon+text, --shadow-2 | — |
| Pressed | Darker orange (#E55400), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |
| Loading | White spinner replaces plus icon, text remains | — |
| Disabled | 0.4 opacity (during active logging session) | — |

### "reflect" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 70% text | — |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload SIA note, progress, log) |
| Tap | SIA coaching note | Navigate to SIA Chat [09] with learning context |
| Tap | Goal progress ring | Navigate to Goal Detail [14] |
| Tap | AI action checkbox | Toggle completion, earn XP |
| Tap | Library row | View book/course detail (inline expand or push) |
| Tap | Activity log row | View session detail (inline expand) |
| Tap | "reflect" chip | Navigate to Journal [37] with prompt |
| Tap | FAB | Open session logging modal |
| Tap | Back button | Pop stack to previous screen |
| Swipe right from edge | Screen | iOS back gesture (pop stack) |
| Tap | Overflow menu | Open bottom sheet (edit preferences, view analytics, ask SIA) |
| Horizontal swipe | Active Goals section | Scroll through goal rings |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount (stack push) | Staggered fade-in: each section opacity 0→1 + translateY(12→0pt), 80ms stagger | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Large title translateY(0→-40pt) + opacity 1→0. Center title opacity 0→1 | 280ms | ease-out-soft |
| Goal ring arcs | Enter viewport | Arc draws from 0 to target % (stroke-dashoffset) | 520ms | ease-flow |
| Streak dots | Enter viewport | Staggered scale(0→1), 60ms stagger, left to right | 160ms each | ease-out-soft |
| Checkbox check | Tap | Checkmark scales in (0→1), fill color fades in | 160ms | ease-out-soft |
| XP popup | Action complete | "+15 XP" floats up (translateY 0→-24pt) + opacity 1→0 | 600ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |
| Pull-to-refresh | Pull threshold | Orange spinner appears, rotates continuously | Until data loads | linear rotation |

**Screen transition**:
- **Enter**: Standard iOS stack push — slides in from right, 280ms, ease-out-soft
- **Exit**: Stack pop — slides out to right (back button or swipe gesture)

---

## Empty States

### Day 1 (new user)
- SIA coaching note becomes welcome: "Welcome to your learning dashboard. What are you reading, studying, or curious about? Let's set up your first goal."
- Current Book/Course Card: Empty variant — "add your first book or course" with orange-outlined action chip. Tapping opens an add flow.
- AI Learning Path: Hidden (no data to suggest from)
- Active Goals: Empty card — "no active learning goals. Ask SIA to help you set one."
- Streak Tracker: All dots white at 8%. Count: "0-day streak — start today."
- Library: Empty card — "your books and courses will appear here."
- Activity Log: Hidden entirely until first session.
- Daily Study Prompt: Still visible — SIA generates a generic curiosity prompt: "What topic keeps pulling your attention lately?"

### Established user (zero state)
- SIA coaching note: "Rest day for studying. Your 12-day streak continues tomorrow."
- All sections populated with historical data. Today's actions may show "all done" state with green checkmarks.
- Activity Log: Shows recent past entries, just nothing new today.

---

## Motivation Adaptation

- **Low motivation**: SIA note is gentler ("no pressure — even 5 minutes of reading counts"). Only current book/course card + single most important SIA suggestion shown. Goals section shows closest-to-completion goal only. Library and detailed log hidden. FAB label simplifies to "log."
- **Medium motivation**: Full screen as described above. Default experience.
- **High motivation**: SIA note includes metrics and comparisons ("45 pages this week, up 20% from last week"). Additional "INSIGHTS" section appears below activity log with cross-domain connections ("Your focus scores are 30% higher on days you study in the morning"). Streak tracker expands to 14-day view. Activity log shows 7-10 entries.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Large title ("Learning & Growth") | Sora | Bold | 28pt | 34pt | #FFFFFF |
| Center title (collapsed header) | Sora | Semibold | 17pt | 22pt | #FFFFFF |
| Domain accent label | Sora | Semibold | 12pt | 16pt | #06B6D4 (cyan) |
| Section eyebrow (e.g., "CURRENT BOOK", "AI LEARNING PATH") | Sora | Semibold | 12pt | 16pt | rgba(255,255,255,0.40) |
| SIA coaching note body | Sora | Regular | 15pt | 21pt | rgba(255,255,255,0.70) |
| Book/course title | Sora | Semibold | 17pt | 22pt | #FFFFFF |
| Author / course source | Sora | Regular | 13pt | 18pt | rgba(255,255,255,0.50) |
| AI action checkbox label | Sora | Regular | 15pt | 21pt | #FFFFFF |
| AI action checkbox label (checked) | Sora | Regular | 15pt | 21pt | rgba(255,255,255,0.40) (strikethrough) |
| Goal ring percentage | Sora | Semibold | 16pt | 20pt | #FFFFFF |
| Goal ring label | Sora | Regular | 13pt | 18pt | rgba(255,255,255,0.50) |
| Streak day count | Sora | Semibold | 17pt | 22pt | #FFFFFF |
| Streak day label | Sora | Regular | 13pt | 18pt | rgba(255,255,255,0.50) |
| Library row title | Sora | Semibold | 15pt | 21pt | #FFFFFF |
| Library row subtitle | Sora | Regular | 13pt | 18pt | rgba(255,255,255,0.50) |
| Activity log date | Sora | Regular | 13pt | 18pt | rgba(255,255,255,0.40) |
| Activity log description | Sora | Regular | 15pt | 21pt | #FFFFFF |
| XP earned text | Sora | Semibold | 12pt | 16pt | #34A853 |
| XP float popup | Sora | Semibold | 14pt | 18pt | #34A853 |
| Daily study prompt text | Sora | Regular (italic) | 15pt | 21pt | rgba(255,255,255,0.70) |
| "reflect" chip label | Sora | Semibold | 13pt | 18pt | rgba(255,255,255,0.70) |
| FAB label ("+ Log Session") | Sora | Semibold | 15pt | 20pt | #FFFFFF |
| Progress bar percentage | Sora | Semibold | 12pt | 16pt | #06B6D4 |
| Insights body (high motivation) | Sora | Regular | 14pt | 20pt | rgba(255,255,255,0.60) |
| Empty state heading | Sora | Semibold | 16pt | 22pt | #FFFFFF |
| Empty state body | Sora | Regular | 15pt | 21pt | rgba(255,255,255,0.50) |
| Overflow menu item | Sora | Regular | 15pt | 21pt | #FFFFFF |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| SIA coaching note fails to load | Card shows skeleton shimmer for 3s, then "Unable to load insight" in white at 40% | Pull-to-refresh reloads; tap card opens SIA Chat [09] directly |
| AI learning path generation fails | Section collapses to single-line error: "Couldn't generate suggestions right now" | "Try again" text button; auto-retries on next pull-to-refresh |
| Checkbox toggle sync failure | Checkbox reverts to previous state, inline toast "Couldn't save — try again" | Tap checkbox retries; optimistic UI rolls back on failure |
| Goal progress data unavailable | Goal ring renders on white 8% track with "—" replacing percentage | Pull-to-refresh reloads progress data from cache then network |
| Library list fails to load | Section shows "Unable to load your library" with retry chip | "Retry" chip triggers fetch; cached data shown if available |
| Activity log fetch timeout | Section shows last cached entries with "Showing cached data" subtle label | Pull-to-refresh attempts fresh fetch |
| Session logging save failure | Modal stays open, red banner at top: "Couldn't save session. Check connection." | "Retry" button in modal; data preserved in local draft |
| Streak calculation error | Streak count shows "—" with dots all at white 8% | Pull-to-refresh recalculates; cached streak shown if available |
| Daily prompt generation fails | Prompt area shows generic fallback: "What did you learn today?" | Pull-to-refresh requests new prompt from SIA |

---

## Accessibility

### Screen Reader Labels
- Screen announces "Learning and Growth Dashboard" on mount
- SIA coaching note: "SIA says: {note text}. Double tap to open chat"
- Current book/course: "{title} by {author}. {progress}% complete"
- AI action checkbox: "{label}. {checked/unchecked}. Double tap to toggle"
- Goal ring: "{goal name}. {percentage} percent complete. Double tap for details"
- Streak tracker: "{count}-day streak. {weekday dots summary}"
- Library row: "{title}. {subtitle}. Double tap to view details"
- Activity log row: "{description}. {date}. {XP earned}"
- Daily study prompt: "Daily prompt. {prompt text}. Double tap reflect chip to journal"
- FAB: "Log learning session. Double tap to open"
- Overflow menu: "More options. Double tap to open menu"

### Focus Order
1. Back button
2. Screen title
3. Overflow menu button
4. SIA coaching note card
5. Current book/course card
6. AI learning path section → individual checkboxes (top to bottom)
7. Active goals section → individual goal rings (left to right)
8. Streak tracker
9. Library list → individual rows (top to bottom)
10. Activity log → individual rows (top to bottom)
11. Daily study prompt → "reflect" chip
12. Floating action button

### Gesture Alternatives
- All swipe-navigable elements (goal rings horizontal scroll) are also reachable via VoiceOver flick gestures
- Checkbox toggle available via double-tap in addition to direct tap
- Pull-to-refresh accessible via VoiceOver action rotor ("Refresh")
- FAB reachable via focus order; Magic Tap (two-finger double-tap) opens session logger from anywhere on screen
- Horizontal goal ring carousel supports VoiceOver 3-finger swipe to scroll, or sequential focus navigation through each ring
- Edge swipe back gesture mapped to VoiceOver scrub (two-finger Z gesture)

---

## Cross-References

- **Navigates to**: Screen [09] — SIA Chat (via coaching note tap, tab switch), Screen [14] — Goal Detail (via goal ring tap, stack push), Screen [37] — Journal (via "reflect" chip, stack push)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [16] — Life Areas Overview (stack push), Screen [09] — SIA Chat (deep-link, tab switch + stack push)
- **Shared components with**: Screen [36] — Creativity Dashboard (Domain Dashboard Template, SIA Coaching Note Card, Streak Tracker, Active Goals Section, Activity Log, FAB), Screen [38] — Habits (Streak Indicator)
- **Patterns used**: Back Button (Batch 1), 8-State Interaction Model (Batch 1), Content Entry Animation (staggered fade-in, Batch 1)
- **Patterns established**: Streak Tracker (7-day dots), Active Goals Section (horizontal progress rings), Activity Log, Daily Study Prompt, AI Learning Path Card (checkable actions), Book/Course Library List
- **Patterns referenced** (established elsewhere): Domain Dashboard Template (Screen 26), Domain Dashboard Header (Screen 26), SIA Coaching Note Card — Compact (Screen 26), Floating Action Button — Extended Pill (Screen 26)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/learning`
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
| B12-F05 | critical | retention | Implement a log-session sheet with activity type, duration, book/course selection, notes, save/cancel, validation, and feedback. |
| B12-F06 | major | retention | Render suggestions as semantic 44px buttons/checkboxes with completion state, XP animation, undo, and refresh behavior. |
| B12-F07 | major | navigation | Link the SIA note to contextual chat and wire current item/library rows and See all to details/library views. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

