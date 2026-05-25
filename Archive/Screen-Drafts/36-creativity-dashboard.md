# Screen Design: Creativity Dashboard

**Screen**: 36 of 43
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
│  │         2                    │   │  ← Hero Insight
│  │    active projects           │   │     Active Projects
│  │  Short film script           │   │     (~120pt)
│  │  ▓▓▓▓▓▓▓░░░░░░░░  45%      │   │
│  └─────────────────────────────┘   │
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

2. **Hero Insight — Active Projects** — ~120pt
   - Purpose: At-a-glance answer to "what am I creating?" — shows project count and latest
   - Content: Large number (36pt Sora Bold, white) + "active projects" (14pt Regular, white at 50%) label. Below: latest project name (15pt Semibold, white) + amber progress bar (8pt, #F59E0B fill). If no projects: "start your first project" (15pt Sora Semibold, orange) as tappable link.
   - Background: ink-brown-800 card, --r-lg (16pt), 16pt padding, centered content
   - **Design principle**: Hero insight always appears ABOVE the SIA coaching note. SIA interprets the hero number — this follows the Bevel model: "score first, interpretation second."

3. **SIA Coaching Note Card** — ~100pt
   - Purpose: Creative practice insight from SIA
   - Content: Purple dot + SIA observation about creative patterns

4. **Active Projects Card** — ~160pt
   - Purpose: Show current creative work with milestone tracking
   - Content: Project name, current milestone, amber progress bar

5. **SIA Inspiration Prompt Card** — ~100pt
   - Purpose: Generative creative suggestion from SIA
   - Content: Creative prompt text + "start creating" action chip

6. **Practice Heatmap Card** — ~100pt
   - Purpose: Visualize this week's creative session frequency and duration
   - Content: 7-day graduated heatmap + total hours + trend comparison

7. **Active Goals Section** — ~140pt
   - Purpose: Creativity-related goal progress
   - Content: Horizontal scroll of amber progress rings

8. **Streak Tracker Card** — ~100pt
   - Purpose: Creative practice consistency
   - Content: Streak count + 7-day dot row (amber fill)

9. **Portfolio Timeline** — ~100pt
   - Purpose: Visual history of creative milestones over time
   - Content: Horizontal scrollable timeline with milestone markers

10. **Activity Log Card** — ~160pt
   - Purpose: Recent creative session history
   - Content: 3-5 rows with date, description, XP

11. **Floating Action Button** — 48pt (fixed)
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
    - Progress bar: Full-width inside card, 6pt tall, --r-xs corners. Track: white at 8%. Fill: amber (#F59E0B). Percentage right-aligned: 13pt Regular, white at 70%. 8pt below milestone.
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

### Inspiration Prompt — Dismiss Lifecycle

- **Dismiss action**: swipe right on the card (translateX + opacity, 280ms, ease-out-soft) or tap a small "×" button (14pt, white at 30%, top-right of card, 44pt touch target)
- **After dismiss**: card collapses (height → 0, 280ms) and the section gap closes
- **Daily refresh**: dismissed prompts return the next calendar day (midnight local time). A new prompt is generated by SIA each day.
- **Frequency**: maximum 1 inspiration prompt per day. If the user dismisses it, no replacement appears until tomorrow.
- **"Show fewer" option**: if user dismisses 5 prompts in 7 days, SIA reduces frequency to every 3 days. After 2 weeks of engagement with a prompt (tapping "start creating"), frequency returns to daily.
- **Motivation adaptation**: Low-motivation users always see a prompt (even if recently dismissed). High-motivation users may see a prompt replaced by a "creative stats" card if SIA determines data is more motivating.
- **No permanent opt-out** on this screen. Users can disable inspiration prompts in Settings [21] → SIA Preferences → "Creative prompts" toggle.

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
    - Right: Trend comparison (13pt Sora Regular). Up: green (#34A853) "↑ 20%". Same: white at 50%. Down: orange (#FF5E00) "↓ 10%".
- **Variants**: Active week, Empty week (all cells white 5%, "no sessions yet this week" below)
- **Gestures**: Tap cell to see that day's session detail (lightweight tooltip)
- **Size**: Full-width minus 32pt x ~100pt

### Active Goals Section
- **Purpose**: Creativity-related goal progress
- **Data source**: API — goals filtered by Creativity domain
- **Visual treatment**: Identical to Screen 35 Active Goals Section. Progress ring fills use amber (#F59E0B) instead of cyan.
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
  - Thin connecting line: 1pt, amber (#F59E0B) at 30%, horizontal, centered vertically in the timeline area
  - Milestone markers along the line:
    - Dot: 12pt circle, amber fill
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

### Quick-Log Practice Session Sheet
- **Purpose**: Minimal structured logging for creative practice — captures what project, how long, and progress feeling. SIA tracks creative consistency patterns.
- **Data source**: User input + existing projects list
- **Visual treatment**: Bottom sheet (modal slide-up, --r-lg top corners, drag handle, ink-brown-800 bg)
- **Fields** (3 fields max):
  1. Project picker: dropdown-style selector showing existing projects (if any). "New project" option at top creates inline. If no projects, shows text input for project name.
  2. Duration: stepper control — minus/plus flanking time (default: 30 min, increments of 15 min). Label: "practice time"
  3. Progress feeling: 3-option segmented control — "stuck", "flowing", "breakthrough" (13pt Sora Semibold). Selected: amber (#F59E0B) fill. This gives SIA emotional data about creative sessions.
- **CTA**: "log session" (In-Card CTA Button, 48pt, orange fill, white text)
- **Success state**: Sheet dismisses, Small Win Toast ("Session logged · +15 XP"), practice heatmap updates
- **Size**: ~280pt sheet height
- **Animation**: Standard modal present/dismiss

### Floating Action Button
- **Purpose**: Log a creative session
- **Visual treatment**: Identical to Screen 35 FAB. Label: "log session"
- **Gestures**: Tap opens Quick-Log Practice Session Sheet. Long-press: expands to reveal 2 options — 'log session' (opens Quick-Log Practice Session Sheet) and 'ask SIA' (opens SIA Chat with creativity context).
- **Unified FAB behavior**: All domain dashboard FABs follow the same pattern: short tap opens the primary quick-log sheet, long-press reveals 2 options ("quick log" + "ask SIA"). This consistency across all 9 domains means users learn one interaction model.
- **Size**: Auto-width x 48pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #F59E0B at 80% | amber (domain) | Domain identification |
| Header title dot | #F59E0B | amber (domain) | 8pt dot |
| Project progress bar fill | #F59E0B | amber (domain) | Milestone progress |
| Goal ring arc fill | #F59E0B | amber (domain) | Goal progress |
| Streak completed dots | #F59E0B | amber (domain) | Consistency |
| Practice heatmap fills | #F59E0B at 30-100% | amber (domain) | Session intensity |
| Portfolio timeline line/dots | #F59E0B at 30-100% | amber (domain) | Creative journey |
| Inspiration card gradient | #F59E0B at 5% | amber (domain) | Extremely subtle top bleed |
| "start creating" chip bg | #F59E0B at 15% | amber (domain) | Identification chip |
| "start creating" chip text | #F59E0B | amber (domain) | Chip label |
| SIA purple dot (coaching note) | #7F24FF | purple (accent) | 10% rule — element 1 |
| SIA glyph (inspiration card) | #7F24FF | purple (accent) | 10% rule — element 2 |
| FAB background | #FF5E00 | orange (primary) | CTA — always orange |
| Streak flame icon | #FF5E00 | orange (primary) | Streak emphasis |
| "see all" links | #FF5E00 | orange (primary) | Interactive links |
| XP earned text | #34A853 | green (secondary) | Reward |
| Trend up indicator | #34A853 | green (secondary) | Positive comparison |
| Primary text | #FFFFFF | white | Titles, body |
| Secondary text | white at 70% | — | Descriptions |
| Tertiary text | white at 50% | — | Authors, milestone labels |
| Quaternary text | white at 40% | — | Eyebrows, day labels |

**60/30/10 verification**: Orange on FAB, links, streak flame. Green on XP and positive trend. Purple limited to coaching note dot + inspiration card glyph (2 small indicators). Domain amber on all progress/identification elements. Ratio holds.

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
| Tap | FAB | Open Quick-Log Practice Session Sheet |
| Long-press | FAB | Expand to reveal 'log session' and 'ask SIA' options |
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
| Goal ring arcs | Enter viewport | Arc draws from 0 to target % | 520ms | ease-flow |
| Streak dots | Enter viewport | Staggered scale-in, 60ms stagger | 160ms each | ease-out-soft |
| Heatmap cells | Enter viewport | Staggered opacity fade-in, 40ms stagger, left to right | 160ms each | ease-out-soft |
| Portfolio timeline | Enter viewport | Line draws left to right (stroke-dashoffset), dots scale in as line reaches them | 1200ms | ease-flow |
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

## Cross-References

- **Navigates to**: Screen [09] — SIA Chat (via coaching note tap), Screen [14] — Goal Detail (via goal ring tap), Screen [37] — Journal (via inspiration prompt "reflect on this" secondary chip, stack push with prompt pre-loaded)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link)
- **Shared components with**: Screen [35] — Learning Dashboard (Domain Dashboard Template: Domain Header, SIA Coaching Note Card, Active Goals, Streak Tracker, Activity Log, FAB), Screen [38] — Habits (Streak Indicator, Practice Heatmap pattern)
- **Patterns used**: Domain Dashboard Template (established in Screen 35), Back Button, 8-State Model, Content Entry Animation
- **Patterns established**: Inspiration Prompt Card (with subtle domain gradient), Practice Heatmap (graduated domain-color cells), Portfolio Timeline (horizontal milestone visualization with connecting line), Quick-Log Practice Session Sheet (minimal structured logging bottom sheet with progress feeling)
