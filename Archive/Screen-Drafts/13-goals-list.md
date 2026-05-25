# Screen Design: Goals List

**Screen**: 13 of 43
**File**: 13-goals-list.md
**Register**: Product Mode
**Primary action**: Tap a goal card to view its detail
**Tab**: Goals (tab root)
**Navigation**: Goals tab root screen. Stack depth 0. Accessed via bottom tab bar. Contains the "+" FAB to create new goals.

---

## Purpose

The Goals List is mission control — a single view of every goal the user is pursuing, framed as active quests in Balencia's RPG system. Its job is to let users scan their missions at a glance, check progress, and quickly act on the most urgent next step. The multi-domain tag system visually proves that Balencia connects life areas instead of siloing them. SIA provides coaching context on each goal card so the list feels alive, not static.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Goal cards with progress rings — the dominant visual pattern, repeating vertically
2. "your missions" screen title — RPG framing, sets context
3. Filter tabs — control mechanism, secondary to the content itself
4. Domain tag chips on cards — colorful markers drawing the eye to cross-domain connections
5. FAB "+" button — persistent creation entry point, visually prominent (orange circle)
6. Life Areas radar preview card — gateway to the holistic view
7. SIA coaching notes on cards — ambient intelligence, read if curious

**User flow**:
- **Arrives from**: Bottom tab bar (Goals tab), Home Screen [12] via tab switch ("view all missions" link)
- **Primary exit**: Goal Detail [14] via stack push (tap goal card)
- **Secondary exits**: Create/Edit Goal [15] via modal present (tap FAB "+"), Life Areas Overview [16] (Batch 4) via stack push (tap radar preview card)

---

## Layout

**Scroll behavior**: FlatList (homogeneous goal cards, potentially many items, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│  your missions              │  ← 28pt Sora Bold, left-aligned
│                             │  ← 8pt gap
│  ┌─────────────────────────┐│
│  │ [all] [active] [done]   ││  ← filter chips, horizontal scroll
│  │ [by domain ▾]           ││
│  └─────────────────────────┘│
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │  ╭─╮  Life areas      │  │  ← mini radar chart card
│  │  │◇│  overview  ›     │  │
│  │  ╰─╯                  │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Run a half        │  │  ← goal card
│  │68%  marathon           │  │
│  │     🔴fitness 🟢nutri │  │  ← domain tags
│  │     Next: 5K tempo run │  │  ← next action
│  │     SIA: Strong push   │  │  ← coaching note
│  │     ⚡ 340 XP  🔥 12d  │  │  ← XP + streak
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Save $5,000       │  │
│  │42%  by December        │  │
│  │     🟢finance          │  │
│  │     Next: Review subs  │  │
│  │     SIA: 2 days behind │  │
│  │     ⚡ 180 XP  🔥 5d   │  │
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Read 20 books     │  │
│  │91%                     │  │
│  │     🔵learning         │  │
│  │     ...                │  │
│  └───────────────────────┘  │
│                             │
│                        ┌──┐ │
│                        │+ │ │  ← FAB, bottom-right
│                        └──┘ │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│  ← tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Title** — 28pt text + 16pt top padding = 44pt
   - Purpose: RPG-framed heading
   - Content: "your missions" — Product Mode large title, left-aligned
   - Behavior: Collapses to 17pt Sora Semibold center-aligned in nav bar on scroll (iOS large title pattern)

2. **Filter Tab Row** — 36pt chips + 16pt bottom gap = 52pt
   - Purpose: Filter/sort goals by status or domain
   - Content: Horizontal scrollable chip row

3. **Life Areas Radar Preview Card** — 64pt + 16pt bottom gap = 80pt
   - Purpose: Gateway to holistic life balance view
   - Content: Mini radar chart + "Life areas overview" label + chevron

4. **Goal Card List** — variable (~132pt per card, 12pt gaps)
   - Purpose: The primary content — all goals as mission cards
   - Content: FlatList of Goal Cards

5. **FAB** — 56pt (floating, positioned above tab bar)
   - Purpose: Persistent goal creation entry point
   - Content: "+" icon in orange circle

6. **Bottom Spacer** — 72pt (56pt FAB overlap zone + 16pt breathing room)
   - Purpose: Prevent last card from being obscured by FAB

---

## Components

### Screen Title (Product Mode)
- **Purpose**: Page heading with RPG framing
- **Visual treatment**: 28pt Sora Bold (700), white, left-aligned, 24pt left margin. When the user scrolls past the title, it collapses into the navigation bar area: 17pt Sora Semibold, center-aligned, with a subtle crossfade (160ms). This follows the iOS large title convention adapted for Balencia.
- **Size**: Full-width, 28pt text height + 16pt top padding

### Filter Tab Row
- **Purpose**: Filter goals by status or domain assignment
- **Visual treatment**: Horizontal ScrollView of chip buttons. No scroll indicator.
- **Sub-elements**:
  - Filter chip (inactive): 36pt tall, pill (999pt radius), ink-brown-800 bg, 1pt white at 10% border. Label: 13pt Sora Semibold, white at 60%.
  - Filter chip (active): orange (#FF5E00) bg, white text. Only one status chip active at a time.
  - Chips: "all" (default active), "active", "completed", "by domain"
  - "by domain" chip: has a small down-chevron (10pt) indicating it opens a sub-filter. When tapped, a secondary row of domain color chips appears below (animated slide-down, 280ms). Each domain chip follows the Domain Tag Chip pattern but is tappable as a toggle filter.
- **Size**: Full-width, 36pt chip height, 8pt gap between chips, 16pt left margin start
- **Behavior**: Active chip scrolls to leading edge. "by domain" sub-row: domain chips are toggleable (multi-select). Selecting one or more filters the list to goals matching those domains.

### Life Areas Radar Preview Card
- **Purpose**: Visual gateway to the Life Areas Overview [16] holistic view
- **Data source**: Domain progress data (same as Life Areas Overview but rendered as a miniature)
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Single row layout.
- **Sub-elements**:
  - Mini radar chart: 40pt x 40pt, simplified (domain color axes, filled area showing balance). Decorative — not interactive at this size.
  - Label: "life areas overview" — 15pt Sora Semibold, white, left of chevron
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 64pt tall
- **Gestures**: Tap entire card → stack push to Life Areas Overview [16] (Batch 4)

### Goal Card
- **Purpose**: Summary of a single goal/mission with progress, context, and next action
- **Data source**: Goals system (goal name, progress %, domain assignments, next action, SIA coaching note, XP earned, streak days)
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout** (inside card):
  - Left column (64pt wide): Progress Ring (small, 36pt), centered vertically in column
  - Right column (remaining width, 12pt gap from left):
    - Row 1: Goal name — 16pt Sora Semibold, white, 2 lines max (truncate)
    - Row 2: Domain tag chips — inline, 8pt gap, 4pt top margin
    - Row 3: Next action — "Next: [action text]" — 13pt Sora Regular, white at 70%, 1 line truncate, 4pt top margin
    - Row 4: SIA coaching note — 13pt Sora Regular, white at 50%, italic feel (not actual italic — Sora has no italic, use 50% opacity to differentiate), 1 line, 4pt top margin
    - Row 5: XP + Streak — inline. XP: "⚡ [##] XP" 12pt Sora Semibold, orange. Streak: "🔥 [##]d" 12pt Sora Semibold, white at 60%. 8pt gap between. 8pt top margin.
- **Size**: Full-width minus 32pt, ~132pt tall (may vary with 1-line vs 2-line goal name)
- **Gestures**:
  - Tap card → stack push to Goal Detail [14]
  - Tap "Next: [action]" row → complete action inline (checkbox appears, same completion animation as Action Card on Home Screen [12])
  - Long-press card → Quick Actions Menu appears
- **Variants**: Active (default), completed (100% ring is green, card at 70% opacity, "completed" badge replaces streak), paused (ring is gray, "paused" badge)

### Progress Ring (Small Variant)
- **Purpose**: Compact progress indicator for use in goal cards
- **Visual treatment**: 36pt diameter, 3pt stroke width. Track: white at 10%. Fill: orange (#FF5E00), clockwise from 12 o'clock. Green (#34A853) if 100%.
- **Percentage**: 12pt Sora Semibold, white, centered inside ring
- **Animation**: Same as medium variant — fill animates on mount, 520ms ease-flow

### Floating Action Button (FAB)
- **Purpose**: Persistent entry point to create a new goal/mission
- **Visual treatment**: 56pt diameter circle, orange (#FF5E00) fill, centered "+" icon (24pt, white, 2pt stroke). Shadow: 0 4pt 16pt rgba(255, 94, 0, 0.3) (warm orange glow).
- **Position**: Fixed, bottom-right. 16pt from right edge, 16pt above tab bar top edge. z-40 (above content, below modals).
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Orange circle, white "+" | — |
  | Pressed | scale(0.93), darker orange (#E05500), shadow contracts | medium impact |
  | Focus-visible | 2pt white ring, offset 4pt | — |
- **Gestures**: Tap → modal present Create/Edit Goal [15]
- **Scroll behavior**: Stays fixed. Hides after 80pt continuous downward scroll (fade-out to opacity 0 + translateY +20pt, 160ms ease-out-soft). Reappears on any upward scroll or scroll stop (fade-in, 160ms ease-out-soft).

### Quick Actions Menu
- **Purpose**: Context menu for goal-level actions without navigating away
- **Data source**: Goal state (active, paused, archived)
- **Visual treatment**: Floating card at z-40, ink-brown-800 bg, 14pt border radius, backdrop-blur(12px), subtle warm shadow. Appears anchored to the long-pressed card.
- **Sub-elements** (vertical list):
  - "pause mission" — pause icon (16pt) + label (15pt Sora Regular, white)
  - "archive" — archive icon (16pt) + label
  - "edit" — pencil icon (16pt) + label
  - Divider (1pt, white at 5%) between items
  - Each row: 48pt tall, 16pt horizontal padding, 44pt touch target
- **Entry animation**: Scale(0.95→1.0) + fade-in, 160ms ease-out-soft
- **Exit**: Fade-out, 160ms. Tap outside dismisses.
- **Backdrop**: Semi-transparent overlay (ink-900 at 40%) behind menu, covering the rest of the screen. Tap backdrop to dismiss.
- **Haptic**: Medium impact on long-press trigger

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Goal cards, radar card, quick actions menu |
| Screen title | #FFFFFF | white | Primary heading |
| Active filter chip bg | #FF5E00 | orange | Selected filter state |
| Active filter chip text | #FFFFFF | white | On orange bg |
| Inactive filter chip bg | #211008 | ink-brown-800 | Deselected state |
| Inactive filter chip text | #FFFFFF at 60% | white/60 | Muted |
| Goal name | #FFFFFF | white | Primary text |
| Next action text | #FFFFFF at 70% | white/70 | Secondary text |
| SIA coaching note | #FFFFFF at 50% | white/50 | Tertiary text |
| XP badge | #FF5E00 | orange | Reward prominence |
| Streak text | #FFFFFF at 60% | white/60 | Secondary stat |
| Progress ring fill | #FF5E00 | orange | Active progress |
| Progress ring complete | #34A853 | green | 100% state |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive track |
| FAB bg | #FF5E00 | orange | Primary creation action |
| FAB icon | #FFFFFF | white | "+" on orange |
| FAB shadow | rgba(255,94,0,0.3) | orange/30 | Warm glow |
| Radar preview chart | [domain colors] | per domain | Decorative mini chart |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| Quick actions menu bg | #211008 | ink-brown-800 | + backdrop-blur |
| Quick actions overlay | #0A0A0F at 40% | ink-900/40 | Dismissible backdrop |

**60/30/10 verification**: Orange on active filter chip, progress ring fills, XP badges, FAB. Green on completed rings only. Purple absent from this screen (no SIA avatar or AI indicator — SIA coaching notes are text-only, differentiated by opacity not color). Domain colors on tag chips only. Ratio holds.

---

## Interaction States

### Goal Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full content | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (cards are always interactive) | — |
| Loading | Skeleton shimmer: ring area + 3 text lines + 2 chip shapes | — |
| Long-press | scale(0.97) hold + Quick Actions Menu appears | medium impact |
| Completed variant | Ring green, card at 70% opacity, "completed" badge | — |
| Paused variant | Ring gray, card at 60% opacity, "paused" badge | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Active | Orange bg, white text | light impact on activate |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Life Areas Radar Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, chart + label + chevron | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Quick Actions Menu Item
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, white icon + text | — |
| Pressed | White at 5% bg highlight | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Goal card | Stack push to Goal Detail [14] |
| Tap | "Next: [action]" row on card | Inline completion (checkbox appears + complete animation) |
| Long-press (>500ms) | Goal card | Quick Actions Menu appears |
| Tap | Filter chip | Activate filter, deactivate others (except "by domain" which opens sub-row) |
| Tap | Domain sub-filter chip | Toggle domain filter (multi-select) |
| Tap | Radar preview card | Stack push to Life Areas Overview [16] |
| Tap | FAB "+" | Modal present Create/Edit Goal [15] |
| Pull down (from top) | Entire list | Pull-to-refresh — branded spinner |
| Tap outside | Quick Actions Menu | Dismiss menu |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen title | Scroll past title | Collapse from 28pt left-aligned to 17pt center-aligned in nav bar | 160ms | ease-out-soft |
| Filter chips | Screen mount | Fade-in + translateX(-12→0), staggered 60ms | 280ms each | ease-out-soft |
| Radar preview card | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Goal cards | Screen mount / list refresh | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Progress rings in cards | Card enters viewport | Ring fill animates from 0→current% | 520ms | ease-flow |
| FAB | Screen mount | Scale(0→1) + fade-in, delayed 400ms after content | 280ms | ease-flow |
| FAB scroll hide | Fast downward scroll | translateY(0→120pt) + fade-out | 280ms | ease-out-soft |
| FAB scroll show | Upward scroll or rest | translateY(120pt→0) + fade-in | 280ms | ease-out-soft |
| Quick Actions Menu | Long-press trigger | Scale(0.95→1) + fade-in, anchored to card | 160ms | ease-out-soft |
| Quick Actions Menu dismiss | Tap outside | Fade-out | 160ms | ease-out-soft |
| Quick Actions backdrop | Menu open | Fade-in (0→40% opacity) | 160ms | ease-out-soft |
| Domain sub-filter row | "by domain" chip tap | Slide-down + fade-in (height 0→44pt) | 280ms | ease-out-soft |
| Filter list transition | Filter change | Crossfade old list → new list | 280ms | ease-out-soft |
| Inline completion | Tap "Next:" action | Checkbox appears, fills orange, checkmark scales in | 280ms | ease-flow |
| Pull-to-refresh spinner | Pull past 60pt | Balencia symbol appears, rotates | loop | linear |

**Screen transition**:
- **Enter (tab switch)**: Instant — screen is pre-mounted in tab navigator
- **Exit (stack push to Goal Detail)**: Standard iOS push (slide left), 280ms ease-out-soft
- **Exit (modal present Create Goal)**: Modal slides up from bottom, 520ms ease-flow

---

## Empty States

### Day 1 (no goals created)
- Filter tab row: hidden (no content to filter)
- Radar preview card: hidden (no domain data yet)
- Central empty state content (vertically centered in available space):
  - Illustration: abstract quest map outline (ink-brown-800 tones, orange accent path), ~120pt
  - Heading: "no missions yet" — 20pt Sora Semibold, white
  - Body: "SIA can help you create your first mission based on what matters most to you." — 15pt Sora Regular, white at 60%, center-aligned, max 280pt width
  - Primary CTA: "create your first mission" — Brand CTA Button (full-width orange pill, 56pt)
  - SIA suggestion chips (below CTA, 16pt gap): 3 starter goal suggestions from SIA based on onboarding. Each is a tappable chip (ink-brown-800, 1pt white at 10% border, pill shape). Tapping pre-fills the Create Goal [15] input field.
    - Example: "Get fitter", "Save more money", "Read more books"
- FAB: still visible (redundant with inline CTA, but maintains spatial consistency)

### Established user — filtered empty state
When a filter returns no results:
- "no [filter] missions" — 17pt Sora Semibold, white, centered
- Contextual message: "You don't have any completed missions yet. Keep going." or "No missions in this domain yet."
- 15pt Sora Regular, white at 50%, centered

---

## Motivation Adaptation

- **Low motivation**:
  - Goal cards simplified: only progress ring + goal name + next action (no SIA note, no XP/streak row)
  - Card height reduces to ~88pt
  - Filter tabs hidden (reduces cognitive overhead — user sees all goals in simple list)
  - SIA notes removed from cards to reduce information density
  - Radar preview card hidden

- **Medium motivation** (default):
  - Full goal cards with all elements (ring, name, tags, next action, SIA note, XP/streak)
  - Filter tabs visible
  - Radar preview card visible

- **High motivation**:
  - Full goal cards with expanded SIA note (2 lines instead of 1)
  - Additional stats visible on cards: completion rate percentage, days remaining
  - Filter tabs with count badges ("active (5)", "completed (12)")
  - Sort options accessible (by priority, by deadline, by domain, by XP)

---

## Cross-References

- **Navigates to**: Goal Detail [14] via stack push, Create/Edit Goal [15] via modal present, Life Areas Overview [16] (Batch 4) via stack push
- **Navigates from**: Tab bar (Goals tab root), Home Screen [12] via tab switch ("view all missions")
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring small/medium, Section Eyebrow, Pull-to-Refresh), Goal Detail [14] (Domain Tag Chip, Progress Ring, Goal Card as reference)
- **Patterns used**: Product Mode Screen Title (from Screen 12), Domain Tag Chip (from Screen 12), Progress Ring small variant (new size, same pattern as Screen 12 medium), Pull-to-Refresh (from Screen 12), 8-State Interaction Model, Motion Tokens, Content Entry Animation (staggered fade-in)
- **Patterns established**: Goal Card, Filter Tab Row (with "by domain" sub-filter), FAB (Floating Action Button), Quick Actions Menu (long-press context menu), Life Areas Radar Preview Card, Empty state with SIA suggestion chips
