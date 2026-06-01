# Screen Design: Goals List (Mission Board)

**Screen**: 13 of 74
**File**: 13-goals-list.md
**Register**: Product Mode
**Primary action**: Tap a mission card to view its detail
**Tab**: Goals (tab root)
**Navigation**: Goals tab root screen. Stack depth 0. Accessed via bottom tab bar. Contains the "+" FAB to create new missions. Header icons provide access to Mission Journal [73] and domain filter.

---

## Purpose

The Mission Board is mission control — a single view of every mission the user is pursuing, organized by type and status. Its job is to let users scan their missions at a glance, check progress, identify chain positions, and quickly act on the most urgent next step. The two-tier filter system separates mission types from status, while SIA surfaces intelligent suggestions based on radar imbalance. Pinned missions float above the main list for top-priority focus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Mission cards with progress rings — the dominant visual pattern, repeating vertically
2. "your missions" screen title + header icons — RPG framing, quick access to journal and filters
3. Type filter chips + status segmented control — two-tier control mechanism
4. Pinned missions section — user's top 3 priorities, elevated above main list
5. Mission type badges + chain indicators — classification and progress context per card
6. SIA Suggestions section (collapsible) — AI-generated mission recommendations
7. FAB "+" button — persistent creation entry point, visually prominent (orange circle)
8. Life Areas radar preview card — gateway to the holistic view

**User flow**:
- **Arrives from**: Bottom tab bar (Goals tab), Home Screen [12] via tab switch ("view all missions" link)
- **Primary exit**: Mission Detail [14] via stack push (tap mission card)
- **Secondary exits**: Create Mission [15] via modal present (tap FAB "+"), Life Areas Overview [16] via stack push (tap radar preview card), Mission Journal [73] via stack push (tap journal icon in header)

---

## Layout

**Scroll behavior**: FlatList (homogeneous mission cards, potentially many items, needs virtualized rendering). Pinned section and SIA suggestions are sticky/non-virtualized header components.
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│  your missions    📖  🔽   │  ← 28pt title + journal icon + filter icon
│                             │  ← 8pt gap
│  ┌─────────────────────────┐│
│  │ [All][Life][Main][Side] ││  ← type filter chips, horizontal scroll
│  │ [Weekly][Daily]         ││
│  └─────────────────────────┘│
│                             │  ← 8pt gap
│  [ Active  |  Done  |  All ]│  ← status segmented control
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │  ╭─╮  Life areas      │  │  ← mini radar chart card
│  │  │◇│  overview  ›     │  │
│  │  ╰─╯                  │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  PINNED                     │  ← eyebrow (only if pinned missions exist)
│  ┌───────────────────────┐  │
│  │ ◯   Run a half     📌│  │  ← pinned mission card
│  │68%  marathon           │  │
│  │     🥈main 🔴fitness   │  │  ← type badge + domain tag
│  │     Next: 5K tempo run │  │  ← next action
│  │     ⚡ 340 XP 🔥12d  🟢│  │  ← XP + streak + difficulty dot
│  │     ●──●──◉──○  2 of 4│  │  ← chain progress bar
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ▸ SIA SUGGESTIONS (2)     │  ← collapsible (default collapsed)
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Save $5,000       │  │  ← mission card (not pinned)
│  │42%  by December        │  │
│  │     🥉side 🟢finance   │  │
│  │     Next: Review subs  │  │
│  │     ⚡ 180 XP 🔥5d   🟠│  │
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ◯   Meditate daily    │  │
│  │25%  for 30 days        │  │
│  │     🟩daily 🟣medit.   │  │
│  │     Next: 10min session│  │
│  │     ⚡ 50 XP  🔥7d   🟢│  │
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

1. **Screen Title + Header Icons** — 28pt text + icons + 16pt top padding = 44pt
   - Purpose: RPG-framed heading + quick access to journal and domain filter
   - Content: "your missions" title (left) + journal icon + filter icon (right)

2. **Type Filter Chips Row** — 36pt chips + 8pt bottom gap = 44pt
   - Purpose: Filter missions by type (scope)
   - Content: Horizontal scrollable chip row

3. **Status Segmented Control** — 36pt + 16pt bottom gap = 52pt
   - Purpose: Filter missions by completion status
   - Content: 3-segment pill control

4. **Life Areas Radar Preview Card** — 64pt + 16pt bottom gap = 80pt
   - Purpose: Gateway to holistic life balance view
   - Content: Mini radar chart + "Life areas overview" label + chevron

5. **Pinned Missions Section** — variable (eyebrow 16pt + up to 3 cards at ~148pt each + 12pt gaps)
   - Purpose: User's top-priority missions elevated above main list
   - Content: Eyebrow label + pinned mission cards (max 3)
   - Conditional: only renders when user has at least 1 pinned mission

6. **SIA Suggestions Section** — 48pt collapsed, variable expanded
   - Purpose: AI-generated mission recommendations
   - Content: Collapsible header + suggestion cards when expanded
   - Conditional: only renders when SIA has pending suggestions

7. **Mission Card List** — variable (~148pt per card, 12pt gaps)
   - Purpose: The primary content — all non-pinned missions
   - Content: FlatList of Mission Cards

8. **FAB** — 56pt (floating, positioned above tab bar)
   - Purpose: Persistent mission creation entry point
   - Content: "+" icon in orange circle

9. **Bottom Spacer** — 72pt (56pt FAB overlap zone + 16pt breathing room)
   - Purpose: Prevent last card from being obscured by FAB

---

## Components

### Screen Title + Header Icons
- **Purpose**: Page heading with quick-access actions
- **Visual treatment**: 28pt Sora Bold (700), white, left-aligned, 24pt left margin. Icons right-aligned in same row.
- **Sub-elements**:
  - Title: "your missions" — 28pt Sora Bold, white. Collapses to 17pt Sora Semibold center-aligned in nav bar on scroll (iOS large title pattern, 160ms crossfade).
  - Journal icon: book outline, 20pt, white at 60%, 44x44pt touch target. Tap → stack push to Mission Journal [73].
  - Filter icon: funnel outline, 20pt, white at 60%, 44x44pt touch target. Tap → Domain Filter Bottom Sheet. 8pt gap between icons.
  - Filter active indicator: 4pt orange (#FF5E00) dot, top-right of filter icon, appears when domain filter is active.
- **Size**: Full-width, 28pt text height + 16pt top padding

### Type Filter Chips Row
- **Purpose**: Filter missions by type/scope
- **Visual treatment**: Horizontal ScrollView of chip buttons. No scroll indicator.
- **Sub-elements**:
  - Filter chip (inactive): 36pt tall, pill (999pt radius), ink-brown-800 bg, 1pt white at 10% border. Label: 13pt Sora Semibold, white at 60%.
  - Filter chip (active): orange (#FF5E00) bg, white text. Only one chip active at a time.
  - Chips: "all" (default active), "life", "main", "side", "weekly", "daily"
- **Size**: Full-width, 36pt chip height, 8pt gap between chips, 16pt left margin start
- **Behavior**: Active chip scrolls to leading edge. Selecting a type filters the list to missions of that type. "All" shows everything.

### Status Segmented Control
- **Purpose**: Filter missions by completion status
- **Visual treatment**: 3-segment pill-shaped container, full-width minus 32pt (16pt margins).
  - Container: ink-brown-800, pill radius (999pt), 1pt white at 10% border, 36pt tall
  - Segments: "active" | "done" | "all" — 13pt Sora Semibold
  - Active segment: orange (#FF5E00) bg pill (animated slide), white text
  - Inactive segments: transparent bg, white at 50% text
  - Default selection: "active" (left)
- **Size**: Full-width minus 32pt, 36pt tall
- **Animation**: Active segment bg slides between positions (280ms ease-out-soft)
- **Haptic**: Light impact on segment change

### Domain Filter Bottom Sheet
- **Purpose**: Multi-select domain filter accessed via header filter icon
- **Visual treatment**: Standard bottom sheet (drag handle, backdrop blur, slides up from bottom). ink-900 surface.
- **Content**:
  - Header: "Filter by domain" — 17pt Sora Semibold, white, center-aligned
  - Domain toggle chips: 10 chips in a wrap layout (2 rows of 5), each uses Domain Tag Chip pattern but with a checkmark indicator when selected
  - Each chip: 36pt tall, tappable toggle (multi-select). Selected: domain color at 25% bg + checkmark (12pt). Unselected: ink-brown-800 bg, domain color text.
  - Actions row (bottom): "clear all" (15pt Sora Semibold, white at 40%, left) + "apply" (15pt Sora Semibold, orange, right). 48pt tall row.
- **Dismiss**: Drag down, tap backdrop, or tap "apply"
- **Entry animation**: Slide up from bottom, 520ms ease-flow. Backdrop fades in (ink-900 at 60%).

### Life Areas Radar Preview Card
- **Purpose**: Visual gateway to the Life Areas Overview [16] holistic view
- **Data source**: Domain progress data (same as Life Areas Overview but rendered as a miniature)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Single row layout.
- **Sub-elements**:
  - Mini radar chart: 40pt x 40pt, simplified (domain color axes, filled area showing balance). Decorative — not interactive at this size.
  - Label: "life areas overview" — 15pt Sora Semibold, white, left of chevron
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 64pt tall
- **Gestures**: Tap entire card → stack push to Life Areas Overview [16]

### Pinned Missions Section
- **Purpose**: Elevate user's top-priority missions above the main list
- **Conditional**: Only renders when user has at least 1 pinned mission (max 3)
- **Sub-elements**:
  - Eyebrow: "PINNED" — 12pt Sora Semibold, white at 40%, left-aligned, 16pt left margin
  - Pinned mission cards: same as Mission Card (below) but with pin icon (12pt, white at 30%) positioned top-right inside card. Full-width, vertical stack, 12pt gaps.
- **Size**: Eyebrow 16pt + variable cards

### SIA Suggestions Section
- **Purpose**: AI-generated mission recommendations user hasn't yet accepted
- **Conditional**: Only renders when SIA has pending suggestions (1-3 max)
- **Visual treatment**: Collapsible section with header row
- **Sub-elements**:
  - Header row: 48pt tall, full-width, 16pt horizontal margins
    - Chevron: 14pt, white at 40%, rotates 90° on expand (▸ → ▾). Left side.
    - Label: "SIA SUGGESTIONS" — 12pt Sora Semibold, white at 40%, 8pt right of chevron
    - Count badge: "(2)" — 12pt Sora Regular, white at 30%, right of label
  - Expanded content: 1-3 SIA Mission Suggestion Cards (see `_shared-patterns.md`), 12pt gaps, 16pt top margin
- **Default state**: Collapsed
- **Animation**: Expand/collapse content height 0↔auto + fade-in/out, chevron rotation. 280ms ease-out-soft.

### Mission Card
- **Purpose**: Summary of a single mission with progress, type, chain position, difficulty, and next action
- **Data source**: Missions system (name, progress %, type, domain assignments, chain position, difficulty, next action, SIA coaching note, XP earned, streak days)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout** (inside card):
  - Left column (64pt wide): Progress Ring (small, 36pt), centered vertically in column
  - Right column (remaining width, 12pt gap from left):
    - Row 1: Mission name — 16pt Sora Semibold, white, 2 lines max (truncate)
    - Row 2: Mission Type Badge + Domain tag chips — inline, 8pt gap between badge and first tag, 4pt top margin
    - Row 3: Next action — "Next: [action text]" — 13pt Sora Regular, white at 70%, 1 line truncate, 4pt top margin
    - Row 4: SIA coaching note — 13pt Sora Regular, white at 50%, 1 line, 4pt top margin
    - Row 5: Stats row — XP: "⚡ [##] XP" 12pt Sora Semibold, orange. Streak: "🔥 [##]d" 12pt Sora Semibold, white at 60%. Difficulty Tier Indicator (8pt dot). Chain label "2 of 4" (11pt Sora Regular, white at 40%, right-aligned). 8pt gaps between elements. 8pt top margin.
  - Chain Progress Bar (conditional): below the main card content area, 8pt top margin. Only renders for missions that are part of a chain.
- **Size**: Full-width minus 32pt, ~132pt tall without chain bar, ~148pt with chain bar
- **Gestures**:
  - Tap card → stack push to Mission Detail [14]
  - Tap "Next: [action]" row → complete action inline (checkbox appears, same completion animation as Action Card on Home Screen [12])
  - Long-press card → Quick Actions Menu appears
- **Variants**: Active (default), completed (100% ring is green, card at 70% opacity, "completed" badge replaces streak), paused (ring is gray, "paused" badge), pinned (pin icon 12pt, white at 30%, top-right)

### Progress Ring (Small Variant)
- **Purpose**: Compact progress indicator for use in mission cards
- **Visual treatment**: 36pt diameter, 3pt stroke width. Track: white at 10%. Fill: orange (#FF5E00), clockwise from 12 o'clock. Green (#34A853) if 100%.
- **Percentage**: 12pt Sora Semibold, white, centered inside ring
- **Animation**: Same as medium variant — fill animates on mount, 520ms ease-flow

### Floating Action Button (FAB)
- **Purpose**: Persistent entry point to create a new mission
- **Visual treatment**: 56pt diameter circle, orange (#FF5E00) fill, centered "+" icon (24pt, white, 2pt stroke). Shadow: 0 4pt 16pt rgba(255, 94, 0, 0.3) (warm orange glow).
- **Position**: Fixed, bottom-right. 16pt from right edge, 16pt above tab bar top edge. z-40 (above content, below modals).
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Orange circle, white "+" | — |
  | Pressed | scale(0.93), darker orange (#E05500), shadow contracts | medium impact |
  | Focus-visible | 2pt white ring, offset 4pt | — |
- **Gestures**: Tap → modal present Create Mission [15]
- **Scroll behavior**: Stays fixed. Hides after 80pt continuous downward scroll (fade-out to opacity 0 + translateY +20pt, 160ms ease-out-soft). Reappears on any upward scroll or scroll stop (fade-in, 160ms ease-out-soft).

### Quick Actions Menu
- **Purpose**: Context menu for mission-level actions without navigating away
- **Data source**: Mission state (active, paused, pinned, archived)
- **Visual treatment**: Floating card at z-40, ink-brown-800 bg, 14pt border radius, backdrop-blur(12px), subtle warm shadow. Appears anchored to the long-pressed card.
- **Sub-elements** (vertical list):
  - "pin to home" / "unpin from home" — pin icon (16pt) + label (15pt Sora Regular, white). Toggles based on current pin state.
  - "pause mission" / "resume mission" — pause/play icon (16pt) + label
  - "archive" — archive icon (16pt) + label
  - "edit" — pencil icon (16pt) + label
  - Divider (1pt, white at 5%) between items
  - Each row: 48pt tall, 16pt horizontal padding, 44pt touch target
- **Pin limit**: If user tries to pin a 4th mission, show toast: "Unpin a mission first. Maximum 3 pinned." (auto-dismiss 3s)
- **Entry animation**: Scale(0.95→1.0) + fade-in, 160ms ease-out-soft
- **Exit**: Fade-out, 160ms. Tap outside dismisses.
- **Backdrop**: Semi-transparent overlay (ink-900 at 40%) behind menu, covering the rest of the screen. Tap backdrop to dismiss.
- **Haptic**: Medium impact on long-press trigger

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Mission cards, radar card, quick actions menu, bottom sheet |
| Screen title | #FFFFFF | white | Primary heading |
| Header icons | #FFFFFF at 60% | white/60 | Journal + filter icons |
| Filter active dot | #FF5E00 | orange | 4pt indicator on filter icon |
| Active type chip bg | #FF5E00 | orange | Selected type filter |
| Active type chip text | #FFFFFF | white | On orange bg |
| Inactive type chip bg | #211008 | ink-brown-800 | Deselected type |
| Inactive type chip text | #FFFFFF at 60% | white/60 | Muted |
| Segmented control active bg | #FF5E00 | orange | Active status segment |
| Segmented control inactive text | #FFFFFF at 50% | white/50 | Unselected status |
| Mission name | #FFFFFF | white | Primary text |
| Next action text | #FFFFFF at 70% | white/70 | Secondary text |
| SIA coaching note | #FFFFFF at 50% | white/50 | Tertiary text |
| XP badge | #FF5E00 | orange | Reward prominence |
| Streak text | #FFFFFF at 60% | white/60 | Secondary stat |
| Chain label | #FFFFFF at 40% | white/40 | Position indicator |
| Progress ring fill | #FF5E00 | orange | Active progress |
| Progress ring complete | #34A853 | green | 100% state |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive track |
| Chain bar track | #FFFFFF at 8% | white/8 | Background track |
| Chain dots (completed) | #34A853 | green | Past steps |
| Chain dots (current) | #FF5E00 | orange | Active step |
| Chain dots (upcoming) | #FFFFFF at 20% | white/20 | Future steps |
| Difficulty dot (easy) | #34A853 | green | Low difficulty |
| Difficulty dot (moderate) | #FF5E00 | orange | Medium difficulty |
| Difficulty dot (hard) | #EF4444 | red | High difficulty |
| Mission type badges | [metallic tones] | per type | See _shared-patterns.md |
| Pin icon | #FFFFFF at 30% | white/30 | Subtle indicator |
| FAB bg | #FF5E00 | orange | Primary creation action |
| FAB icon | #FFFFFF | white | "+" on orange |
| FAB shadow | rgba(255,94,0,0.3) | orange/30 | Warm glow |
| Radar preview chart | [domain colors] | per domain | Decorative mini chart |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| SIA suggestion border | #7F24FF at 40% | purple/40 | AI indicator (max 2 purple elements) |
| Quick actions menu bg | #211008 | ink-brown-800 | + backdrop-blur |
| Quick actions overlay | #0A0A0F at 40% | ink-900/40 | Dismissible backdrop |
| Eyebrow labels | #FFFFFF at 40% | white/40 | Section identifiers |

**60/30/10 verification**: Orange on active type chip, segmented control active, progress ring fills, XP badges, FAB, difficulty dot (moderate), chain current dot, filter active dot. Green on completed rings, chain completed dots, difficulty easy dot. Purple on SIA suggestion card border only (max 2 elements per screen — suggestions section counts as 1 since it's a contained group). Red on difficulty hard dot only. Domain colors on tag chips only. Metallic badge tones are neutral/muted, not competing. Ratio holds.

---

## Interaction States

### Mission Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full content | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (cards are always interactive) | — |
| Loading | Skeleton shimmer: ring area + 3 text lines + 2 chip shapes + chain bar placeholder | — |
| Long-press | scale(0.97) hold + Quick Actions Menu appears | medium impact |
| Completed variant | Ring green, card at 70% opacity, "completed" badge replaces streak | — |
| Paused variant | Ring gray, card at 60% opacity, "paused" badge | — |
| Pinned variant | Pin icon visible top-right, otherwise same as default | — |

### Type Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Active | Orange bg, white text | light impact on activate |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Status Segmented Control
| State | Visual | Haptic |
|-------|--------|--------|
| Segment inactive | Transparent bg, white/50 text | — |
| Segment active | Orange bg pill, white text | light impact |
| Pressed (on inactive) | White/5 bg flash | light impact |
| Focus-visible | 2pt orange ring around control | — |

### Header Icon (Journal / Filter)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% | — |
| Pressed | White at 40%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Suggestions Header
| State | Visual | Haptic |
|-------|--------|--------|
| Collapsed | Chevron right, count badge visible | — |
| Pressed | White at 3% bg flash on row | light impact |
| Expanded | Chevron rotates down, content visible below | — |
| Focus-visible | 2pt orange ring around row | — |

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
| Tap | Mission card | Stack push to Mission Detail [14] |
| Tap | "Next: [action]" row on card | Inline completion (checkbox appears + complete animation) |
| Long-press (>500ms) | Mission card | Quick Actions Menu appears |
| Tap | Type filter chip | Activate type filter, deactivate others |
| Tap | Status segment | Switch status filter |
| Tap | Journal icon (header) | Stack push to Mission Journal [73] |
| Tap | Filter icon (header) | Present Domain Filter Bottom Sheet |
| Tap | Domain chips in bottom sheet | Toggle domain selection (multi-select) |
| Tap | "apply" in bottom sheet | Apply domain filter, dismiss sheet |
| Tap | SIA Suggestions header | Toggle expand/collapse |
| Tap | "accept" on suggestion card | Opens Create Mission [15] pre-filled |
| Tap | "dismiss" on suggestion card | Card collapses + fades out |
| Tap | Radar preview card | Stack push to Life Areas Overview [16] |
| Tap | FAB "+" | Modal present Create Mission [15] |
| Tap | Chain Progress Bar | Bottom sheet with chain name + mission titles |
| Pull down (from top) | Entire list | Pull-to-refresh — branded spinner |
| Tap outside | Quick Actions Menu | Dismiss menu |
| Tap outside | Domain Filter Bottom Sheet | Dismiss sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen title | Scroll past title | Collapse from 28pt left-aligned to 17pt center-aligned in nav bar | 160ms | ease-out-soft |
| Type filter chips | Screen mount | Fade-in + translateX(-12→0), staggered 60ms | 280ms each | ease-out-soft |
| Status segmented control | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Status active pill | Segment tap | Orange bg slides to new position | 280ms | ease-out-soft |
| Radar preview card | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Pinned section eyebrow | Screen mount | Fade-in, stagger after radar card | 280ms | ease-out-soft |
| Mission cards | Screen mount / list refresh | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Progress rings in cards | Card enters viewport | Ring fill animates from 0→current% | 520ms | ease-flow |
| Chain progress bar | Card enters viewport | Dots appear sequentially left→right, 60ms stagger | 160ms each | ease-out-soft |
| FAB | Screen mount | Scale(0→1) + fade-in, delayed 400ms after content | 280ms | ease-flow |
| FAB scroll hide | Fast downward scroll | translateY(0→120pt) + fade-out | 280ms | ease-out-soft |
| FAB scroll show | Upward scroll or rest | translateY(120pt→0) + fade-in | 280ms | ease-out-soft |
| Quick Actions Menu | Long-press trigger | Scale(0.95→1) + fade-in, anchored to card | 160ms | ease-out-soft |
| Quick Actions Menu dismiss | Tap outside | Fade-out | 160ms | ease-out-soft |
| Quick Actions backdrop | Menu open | Fade-in (0→40% opacity) | 160ms | ease-out-soft |
| SIA Suggestions expand | Tap header | Content height 0→auto + fade-in. Chevron rotates 0→90° | 280ms | ease-out-soft |
| SIA Suggestions collapse | Tap header | Content height auto→0 + fade-out. Chevron rotates 90°→0 | 280ms | ease-out-soft |
| SIA Suggestion dismiss | Tap "dismiss" | Card height collapses + fade-out | 280ms | ease-out-soft |
| Domain Filter Bottom Sheet | Filter icon tap | Slide up from bottom + backdrop fade-in | 520ms | ease-flow |
| Domain Filter dismiss | Apply/drag/backdrop tap | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| Filter list transition | Filter change | Crossfade old list → new list | 280ms | ease-out-soft |
| Inline completion | Tap "Next:" action | Checkbox appears, fills orange, checkmark scales in | 280ms | ease-flow |
| Pull-to-refresh spinner | Pull past 60pt | Balencia symbol appears, rotates | loop | linear |
| Pin toast | Pin limit exceeded | Toast slides down from top, auto-dismiss 3s | 280ms in/out | ease-out-soft |

**Screen transition**:
- **Enter (tab switch)**: Instant — screen is pre-mounted in tab navigator
- **Exit (stack push to Mission Detail)**: Standard iOS push (slide left), 280ms ease-out-soft
- **Exit (stack push to Mission Journal)**: Standard iOS push (slide left), 280ms ease-out-soft
- **Exit (modal present Create Mission)**: Modal slides up from bottom, 520ms ease-flow

---

## Empty States

### Day 1 (no missions created)
- Type filter chips: hidden (no content to filter)
- Status segmented control: hidden
- Radar preview card: hidden (no domain data yet)
- Pinned section: hidden
- SIA Suggestions: hidden
- Central empty state content (vertically centered in available space):
  - Illustration: abstract quest map outline (ink-brown-800 tones, orange accent path), ~120pt
  - Heading: "no missions yet" — 20pt Sora Semibold, white
  - Body: "SIA can help you create your first mission based on what matters most to you." — 15pt Sora Regular, white at 60%, center-aligned, max 280pt width
  - Primary CTA: "create your first mission" — Brand CTA Button (full-width orange pill, 56pt)
  - SIA suggestion chips (below CTA, 16pt gap): 3 starter mission suggestions from SIA based on onboarding. Each is a tappable chip (ink-brown-800, 1pt white at 10% border, pill shape). Tapping pre-fills the Create Mission [15] input field.
    - Example: "Start a daily meditation habit", "Set a savings goal for the year", "Train for a 5K run"
- FAB: still visible (redundant with inline CTA, but maintains spatial consistency)

### Established user — filtered empty state
When a filter returns no results:
- "no [filter] missions" — 17pt Sora Semibold, white, centered
- Contextual message varies:
  - Type filter: "You don't have any [type] missions yet. Create one with the + button."
  - Status filter: "No completed missions yet. Keep going." / "All missions are done. Time to start something new."
  - Domain filter: "No missions in this domain yet."
- 15pt Sora Regular, white at 50%, centered

---

## Motivation Adaptation

- **Low motivation**:
  - Mission cards simplified: only progress ring + mission name + next action (no SIA note, no XP/streak row, no chain bar, no difficulty dot)
  - Card height reduces to ~88pt
  - Type filter chips hidden (reduces cognitive overhead — user sees all missions in simple list)
  - Status segmented control hidden
  - SIA Suggestions section hidden
  - Radar preview card hidden
  - Pinned section still shows (these are the user's chosen priorities)

- **Medium motivation** (default):
  - Full mission cards with all elements (ring, name, type badge, tags, next action, SIA note, XP/streak, difficulty, chain)
  - All filter controls visible
  - Pinned section visible
  - SIA Suggestions visible (collapsed)
  - Radar preview card visible

- **High motivation**:
  - Full mission cards with expanded SIA note (2 lines instead of 1)
  - Additional stats visible on cards: completion rate percentage, days remaining
  - Type filter chips with count badges ("main (3)", "weekly (5)")
  - SIA Suggestions auto-expanded
  - Sort options accessible (by priority, by deadline, by domain, by XP)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("your missions") | Sora | Bold (700) | 28pt | 34pt | #FFFFFF |
| Collapsed title (nav bar) | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Type filter chip label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Type filter chip label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Status segment label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| Status segment label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Section eyebrow ("PINNED", "SIA SUGGESTIONS") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| SIA suggestions count badge | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 30% |
| Radar card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Mission card name | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission card next action | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 70% |
| Mission card SIA coaching note | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Mission card XP badge | Sora | Semibold (600) | 12pt | 16pt | #FF5E00 |
| Mission card streak text | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 60% |
| Mission card chain label | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 40% |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Progress ring percentage (small) | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Quick actions menu item | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Bottom sheet title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Bottom sheet actions | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 / #FFFFFF at 40% |
| Empty state heading | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Empty state body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 60% |
| Empty state CTA | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty message | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| Pin toast text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (missions fetch) | Mission cards show skeleton shimmer (ring area + 3 text lines + 2 chip shapes + chain bar per card). Error banner at top. | Pull-to-refresh retries. Auto-retry every 30s. |
| API timeout (missions list) | Same skeleton shimmer state. After 8s, shows "Couldn't load your missions." message with "try again" button. | Tap "try again" to retry. Pull-to-refresh also retries. |
| Empty response (no missions from API, but user has missions) | Shows skeleton briefly, then falls back to cached data if available. If no cache, shows "Something went wrong loading your missions." | Pull-to-refresh retries. Cached data displayed if available. |
| Action completion sync failure | Checkbox reverts to unchecked state. Inline error toast: "Couldn't save. Try again." | Tap checkbox again to retry. Change queued for sync when connection restores. |
| Life areas radar data failure | Radar preview card shows placeholder (gray chart outline) instead of mini radar. Card still tappable. | Data loads on next successful fetch. |
| SIA suggestions fetch failure | SIA Suggestions section hidden (graceful degradation — no error shown). | Retries on next screen visit or pull-to-refresh. |
| Pin action failure | Pin state reverts. Toast: "Couldn't pin. Try again." | User retries from Quick Actions Menu. |
| Domain filter bottom sheet data failure | Domain chips show skeleton shimmer briefly, then fall back to hardcoded 10-domain list. | Domain data loads on next attempt. |
| Filter returns empty (not an error) | "no [filter] missions" message centered. Contextual body text. | User changes filter or creates new mission via FAB. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Screen title: "Your missions, mission board"
  - Journal icon: "Mission journal, tap to view history"
  - Filter icon: "Filter by domain, [active/inactive]" (announces "active, [count] domains selected" when filter is on)
  - Type filter chip: "[type name], [active/inactive], tap to filter" (e.g., "Main, selected, tap to filter")
  - Status segment: "[status], [selected/not selected]"
  - Pinned section eyebrow: "Pinned missions, [count] pinned"
  - Mission card: "[mission name], [type] mission, [percentage] complete, [domain names], next action: [action text], [difficulty] difficulty, [chain position if applicable]"
  - Progress ring (small): "[percentage] percent complete"
  - Mission type badge: "[type] mission"
  - Chain progress bar: "Mission chain, step [current] of [total]"
  - Difficulty dot: "[easy/moderate/hard] difficulty"
  - FAB: "Create new mission"
  - Radar preview card: "Life areas overview, tap to view"
  - SIA Suggestions header: "SIA suggestions, [count] available, [collapsed/expanded]"
  - Quick actions menu: "Mission options menu" (announced on long-press)
  - Quick actions menu items: "[action name]" (e.g., "Pin to home", "Pause mission", "Archive", "Edit")
- **Focus order**: Screen title → Header icons (journal, filter) → Type filter chips (left to right) → Status segments → Radar preview card → Pinned missions (top to bottom) → SIA Suggestions header → Mission cards (top to bottom, each card as a unit) → FAB
- **Gesture alternatives**: Long-press context menu also accessible via "Actions" rotor item on each mission card. FAB accessible regardless of scroll position via accessibility shortcut.
- **Reduced motion**: Staggered card entry replaced with instant display. Progress ring fills appear at final value. FAB hide/show on scroll is disabled (FAB always visible). Chain progress bar dots appear instantly. Status segment slides instantly.

---

## Cross-References

- **Navigates to**: Mission Detail [14] via stack push, Create Mission [15] via modal present, Life Areas Overview [16] via stack push, Mission Journal [73] via stack push
- **Navigates from**: Tab bar (Goals tab root), Home Screen [12] via tab switch ("view all missions")
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring small/medium, Section Eyebrow, Pull-to-Refresh, Pinned Mission Card), Mission Detail [14] (Domain Tag Chip, Progress Ring, Mission Card as reference, Chain Progress Bar, Difficulty Tier Indicator, Mission Type Badge), Create Mission [15] (Mission Type Badge, Domain Tag Chip)
- **Patterns used**: Product Mode Screen Title (from Screen 12), Domain Tag Chip (from Screen 12), Progress Ring small variant, Pull-to-Refresh (from Screen 12), Mission Type Badge (Phase 2), Chain Progress Bar (Phase 2), Difficulty Tier Indicator (Phase 2), SIA Mission Suggestion Card (Phase 2), 8-State Interaction Model, Motion Tokens, Content Entry Animation (staggered fade-in)
- **Patterns established**: Mission Card (evolves Goal Card with type badge, chain bar, difficulty dot), Type Filter Chips Row, Status Segmented Control, Domain Filter Bottom Sheet, Pinned Missions Section, SIA Suggestions Collapsible Section, Quick Actions Menu (updated with pin action)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F03 | major | information-architecture | Implement mission filtering, domain filter bottom sheet, and expandable/actionable SIA suggestions. |
| B06-F04 | major | mobile-ergonomics | Add 44px hit areas and selected/pressed semantics while preserving compact visual styling. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

