# Screen Design: Create / Edit Mission

**Screen**: 15 of 74
**File**: 15-create-edit-goal.md
**Register**: Product Mode
**Primary action**: Create mission (tap "create mission" CTA after reviewing SIA's structured plan)
**Tab**: Goals (modal overlay)
**Navigation**: Modal presentation — slides up from bottom. Launched from Mission Board [13] FAB "+" (create mode), Mission Detail [14] edit button (edit mode), or Mission Detail [14] chain "modify" action (chain-linked create mode). Drag-to-dismiss or explicit cancel. On create → dismisses to Mission Board [13]. On edit save → dismisses to Mission Detail [14]. On chain create → dismisses to new Mission Detail [14].

---

## Purpose

This screen transforms a natural-language intention into a structured, actionable mission. The user types what they want to achieve in plain language, and SIA decomposes it into a mission type, domain assignments, actions, milestones, and tracking signals. SIA also auto-suggests the mission type based on scope/duration and, when applicable, generates chain suggestions for follow-up missions. The magic moment is the transition from a single sentence to a rich, structured plan — this is where SIA proves its value as a coach. The edit mode allows refinement of any SIA-generated element, keeping the user in control while SIA does the heavy lifting.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Natural language input field — the first and most prominent element in input state
2. SIA-generated structured result — the detailed plan after processing
3. Mission type suggestion — SIA's recommended classification (daily/weekly/side/main/life)
4. "create mission" / "save changes" CTA — the commit action
5. Domain assignment chip — editable, colorful
6. Generated actions list — the tactical breakdown
7. Chain suggestions — "What comes next?" follow-up mission ideas
8. Strictness toggle — control over SIA's coaching intensity
9. Mission preview — motivational framing of how this becomes a mission card

**User flow**:
- **Arrives from**: Mission Board [13] FAB "+" via modal present (create mode), Mission Detail [14] edit button via modal present (edit mode), Mission Detail [14] chain "modify" / "accept" via modal present (chain-linked create mode)
- **Primary exit (create)**: Mission Board [13] — modal dismisses, list refreshes with new mission
- **Primary exit (chain create)**: Mission Detail [14] — modal dismisses, navigates to new mission's detail
- **Primary exit (edit)**: Mission Detail [14] — modal dismisses, detail refreshes with changes
- **Cancel exit**: Previous screen — modal dismisses via drag-down, X button, or "cancel" link

---

## Layout

**Scroll behavior**: ScrollView (content varies significantly by state — short in input state, long in structured result state)
**Tab bar visible**: No (modal overlay hides tab bar)

### ASCII Wireframe — Input State

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ─── drag handle (32pt) ─── │  ← modal handle indicator
├─────────────────────────────┤
│  ✕  New mission             │  ← close button + title
│                             │
│                             │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │  "What do you want    │  │  ← large text input area
│  │   to achieve?"        │  │     placeholder text
│  │                       │  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │   let SIA plan this   │  │  ← primary CTA
│  └───────────────────────┘  │
│                             │
│  Try: "Save $5,000 by       │  ← cycling example suggestions
│   December"                 │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### ASCII Wireframe — Structured Result State

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ─── drag handle (32pt) ─── │
├─────────────────────────────┤
│  ✕  New mission             │
│  ┌───────────────────────┐  │
│  │ Part of: Get Fit Chain│  │  ← chain context banner (conditional)
│  └───────────────────────┘  │
│                             │
│  "Run a half marathon"      │  ← user's original input (collapsed)
│                             │  ← 16pt gap
│  MISSION TYPE               │  ← eyebrow (NEW - Phase 2)
│  [daily][weekly][side]      │  ← type pills, SIA pre-selects one
│  [🥈 main][life]            │     "main" shown active (orange)
│  "This looks like a main    │
│   mission."                 │  ← SIA explanation
│                             │  ← 16pt gap
│  DOMAIN                     │  ← eyebrow
│  [🔴 fitness ✕] [+ add]    │  ← editable domain chips
│                             │  ← 16pt gap
│  ACTIONS                    │  ← eyebrow
│  ┌───────────────────────┐  │
│  │ ☐ Start with 5K runs  │  │  ← editable action list
│  │ ☐ Build to 10K        │  │
│  │ ☐ Join a running club │  │
│  │ ☐ Follow training plan│  │
│  │ ☐ Complete half mara  │  │
│  │ [+ add action]        │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  MILESTONES                 │  ← eyebrow
│  ┌───────────────────────┐  │
│  │ ◯ 5K under 30 min     │  │
│  │   target: Jun 15      │  │
│  │ ◯ 10K completed       │  │
│  │   target: Aug 1       │  │
│  │ ◯ Half marathon done  │  │
│  │   target: Nov 1       │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  TRACKING                   │  ← eyebrow
│  ┌───────────────────────┐  │
│  │ Weekly distance (km)  │  │
│  │ Pace (min/km)         │  │
│  │ Rest days per week    │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  CONNECTIONS                │  ← eyebrow
│  ┌───────────────────────┐  │
│  │ Links to: Nutrition   │  │
│  │ "Fueling supports     │  │
│  │  endurance training."  │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  HOW STRICT?                │  ← eyebrow
│  [ lenient | balanced | strict ]  ← segmented toggle
│                             │  ← 16pt gap
│  MISSION PREVIEW            │  ← eyebrow (renamed from QUEST PREVIEW)
│  ┌───────────────────────┐  │
│  │ ◯  Run a half         │  │  ← mini mission card preview
│  │ 0% marathon            │  │
│  │    🥈main 🔴fitness    │  │  ← includes type badge
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  WHAT COMES NEXT?           │  ← eyebrow (NEW - Phase 2, conditional)
│  ┌───────────────────────┐  │
│  │ "Enter a 10K race"    │  │  ← SIA chain suggestion
│  │  🥉side  🔴fitness     │  │
│  │ "Complete a marathon"  │  │
│  │  🥇life  🔴fitness     │  │
│  └───────────────────────┘  │
│  [🔘 link as chain]        │  ← toggle (default on)
│                             │  ← 32pt gap
│  ┌───────────────────────┐  │
│  │   create mission      │  │  ← primary CTA (or "create mission chain")
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack — Input State

1. **Modal Handle** — 32pt
   - Purpose: Visual drag indicator for modal dismissal
   - Content: 36pt wide x 4pt tall pill, white at 20%, centered

2. **Modal Header** — 44pt
   - Purpose: Close button and screen title
   - Content: Close "✕" (left, 44x44pt), "new mission" title (center, 17pt Sora Semibold, white)

3. **Natural Language Input** — 120pt
   - Purpose: Where the user types their goal in plain language
   - Content: Large text area with cycling placeholder

4. **Submit CTA** — 56pt + 24pt top gap = 80pt
   - Purpose: Send goal text to SIA for structuring
   - Content: "let SIA plan this" — Brand CTA Button

5. **Example Suggestions** — ~48pt
   - Purpose: Inspire the user with example goals
   - Content: Cycling placeholder text below CTA

### Component Stack — Structured Result State

1. **Modal Handle** — 32pt (same)
2. **Modal Header** — 44pt (same, title changes to "new mission" or "edit mission")
3. **Chain Context Banner** — 40pt (conditional — only when creating from a chain suggestion)
4. **User Input Summary** — ~32pt (collapsed text of original input)
5. **Mission Type Suggestion** — ~80pt (eyebrow + type pills + SIA explanation) (Phase 2)
6. **Domain Assignment** — ~56pt (eyebrow + chip row)
7. **Actions List** — variable (~40pt per action + "add action" row)
8. **Milestones List** — variable (~48pt per milestone)
9. **Tracking Signals** — variable (~36pt per signal)
10. **Cross-Domain Connections** — ~72pt
11. **Strictness Toggle** — ~80pt (eyebrow + segmented control + description)
12. **Mission Preview** — ~88pt (eyebrow + mini mission card with type badge)
13. **Chain Suggestions** — ~120pt (conditional — eyebrow + suggestion cards + toggle) (Phase 2)
14. **Primary CTA** — 56pt + 32pt top gap = 88pt
15. **Bottom Spacer** — 32pt

---

## Components

### Modal Handle
- **Purpose**: Drag affordance for modal dismissal
- **Visual treatment**: 36pt wide x 4pt tall rounded pill (999pt radius), white at 20%, centered horizontally. 14pt from top of modal surface.
- **Gesture**: Drag down from handle (or anywhere on modal) → dismiss threshold at 120pt downward drag.

### Modal Header
- **Purpose**: Close action and screen identification
- **Sub-elements**:
  - Close button: "✕" icon, 18pt, white at 60%, 44x44pt touch target, 16pt from left edge
  - Title: "new mission" (create mode) or "edit mission" (edit mode) — 17pt Sora Semibold, white, center-aligned
- **Size**: Full-width, 44pt tall

### Natural Language Input
- **Purpose**: Free-form goal input — the primary interaction in input state
- **Visual treatment**: ink-brown-800 (#211008) bg, 14pt border radius, 16pt padding all sides. Full-width minus 32pt (16pt margins).
- **Text**: 18pt Sora Regular, white. Larger than standard input (16pt) because this is the hero element.
- **Placeholder**: Cycling examples, 18pt Sora Regular, white at 30%. Cycles every 4 seconds with crossfade:
  - "Save $5,000 by December"
  - "Run a half marathon"
  - "Read 20 books this year"
  - "Meditate daily for 30 days"
  - "Get promoted at work"
- **Border**: 1pt white at 10% (default), 2pt orange (#FF5E00) when focused
- **Size**: Full-width minus 32pt, 120pt tall (multi-line capable, grows with content up to 200pt max)
- **Keyboard**: Default keyboard, no autocorrect suppression, return key type "done"
- **States**: Empty (placeholder cycling), typing (text visible, placeholder hidden), filled (ready to submit)

### Submit CTA ("let SIA plan this")
- **Purpose**: Send the natural language input to SIA for structuring
- **Visual treatment**: Brand CTA Button pattern — full-width minus 32pt, 56pt tall, orange (#FF5E00) pill, "let SIA plan this" in 17pt Sora Semibold white, center-aligned
- **States**: Disabled when input is empty (40% opacity). Enabled when input has text. Loading state when SIA is processing (white spinner replaces text).
- **Gesture**: Tap → triggers SIA Processing state

### SIA Processing Animation
- **Purpose**: Visual feedback while SIA structures the goal
- **Visual treatment**: Replaces the input area content. Centered vertically in the available space.
- **Sub-elements**:
  - Three dots: 8pt circles, orange (#FF5E00), 12pt gap between. Sequential pulse animation (each dot scales 1→1.4→1 with 160ms stagger).
  - Status text: "structuring your mission..." — 15pt Sora Regular, white at 50%, 16pt below dots. Text may update: "analyzing domains..." → "generating actions..." → "finding connections..."
- **Duration**: Variable (real API response time). Minimum display: 800ms even if response is instant (perceived intelligence). Maximum: 8 seconds before timeout/error state.
- **Transition in**: Input field shrinks upward (120pt→0pt, 280ms ease-out-soft), processing animation fades in center (280ms, 160ms delay)
- **Transition out**: Processing animation fades out, structured result content fades in with stagger (80ms per section, 280ms each)

### Chain Context Banner (Conditional)
- **Purpose**: Indicates this mission is being created as part of an existing chain
- **Condition**: Only visible when creating a mission from a chain "accept" or "modify" action on Mission Detail [14]
- **Visual treatment**: ink-brown-800 bg, 14pt border radius, 12pt padding. Full-width minus 32pt. 8pt below modal header.
- **Sub-elements**:
  - Chain icon: link/chain icon, 14pt, white at 40%, left side
  - Text: "Part of: [chain name]" — 13pt Sora Semibold, white at 60%, 8pt right of icon
  - Close "✕": 12pt, white at 30%, right-aligned, 44x44pt touch target. Tap → removes chain link (mission becomes standalone).
- **Size**: Full-width minus 32pt, 40pt tall
- **Behavior**: When present, domain and some actions may be pre-filled from chain context. User can still modify everything.

### User Input Summary (Structured Result State)
- **Purpose**: Collapsed view of the user's original input text
- **Visual treatment**: 16pt Sora Semibold, white, left-aligned, 16pt horizontal margins. 1 line, truncated with ellipsis if long. Quotation marks around text.
- **Gesture**: Tap → re-expands input field for editing (returns to Input state with text preserved)
- **Size**: Full-width, ~32pt

### Mission Type Suggestion (Phase 2)
- **Purpose**: SIA's recommended mission type based on scope and duration analysis
- **Layout**: Eyebrow label "MISSION TYPE" + horizontally scrollable type pills + SIA explanation text
- **Type pills**: 5 pills in a horizontal scroll row, 36pt tall each, 8pt gap
  - "daily" | "weekly" | "side" | "main" | "life"
  - SIA's suggestion is pre-selected: orange (#FF5E00) bg, white text
  - Others: ink-brown-800 bg, white at 50% text, 1pt white at 10% border
  - User can override by tapping a different pill
- **SIA explanation** (below pills, 4pt gap): "This looks like a [type] mission — [reasoning]." — 13pt Sora Regular, white at 40%, 1-2 lines
  - Examples: "This looks like a main mission — it'll take a few months of consistent effort."
  - "This looks like a daily mission — a quick action you can repeat every day."
- **Auto-classification logic** (SIA-side, informing the suggestion):
  - 1 day duration → Daily
  - ~1 week → Weekly
  - 1-4 weeks → Side
  - 1-4 months → Main
  - 6+ months → Life
- **Size**: Full-width minus 32pt, ~80pt (eyebrow + pills + explanation)
- **Animation**: Pills appear as part of the structured result stagger (80ms per section)

### Domain Assignment
- **Purpose**: SIA's auto-detected domain(s) for this mission, editable by user
- **Layout**: Eyebrow label "DOMAIN" + chip row below
- **Chips**: Domain Tag Chip pattern, but with a small "✕" (10pt) inside each chip for removal. Tapping "✕" removes the domain assignment.
- **Add button**: "+ add" text chip — 24pt tall, pill, 1pt white at 10% dashed border, "+" and "add" in 11pt Sora Semibold, white at 40%. Tapping opens a dropdown of available domains (Domain Tag Chips in a vertical list, z-40 floating card, same style as Quick Actions Menu).
- **Gestures**: Tap chip "✕" → remove domain. Tap "+ add" → open domain picker. Tap domain in picker → add it.

### Editable Actions List
- **Purpose**: SIA-generated tactical breakdown, editable by user
- **Layout**: Eyebrow label "ACTIONS" + card containing action rows + "add action" row at bottom
- **Card**: ink-brown-800, 28pt radius, 0pt internal padding (rows handle their own padding)
- **Each action row**: 44pt tall, 16pt horizontal padding
  - Reorder handle: 3 horizontal lines icon (12pt, white at 20%), left side, drag to reorder
  - Action text: 15pt Sora Regular, white, center area. Tappable to edit inline (text input replaces text).
  - Delete button: "✕" icon, 14pt, white at 20%, right side, 44x44pt touch target. Tap → remove with collapse animation.
  - Divider: 1pt white at 5% between rows
- **"+ add action" row**: 44pt tall, "+" icon (14pt, orange) + "add action" (14pt Sora Regular, orange), left-aligned, 16pt padding. Tap → inserts new empty row above (focus on new input).
- **Gestures**: Drag reorder handle → reorder (medium haptic at lift + drop). Tap action text → inline edit. Tap "✕" → delete row with collapse. Tap "+ add action" → insert new row.

### Milestones List
- **Purpose**: SIA-generated milestone checkpoints with target dates, editable
- **Layout**: Eyebrow label "MILESTONES" + card containing milestone rows
- **Card**: ink-brown-800, 28pt radius
- **Each milestone row**: 48pt tall, 16pt horizontal padding
  - Milestone dot: 10pt circle, orange (#FF5E00) border, left side
  - Milestone text: 15pt Sora Regular, white, tappable to edit inline
  - Target date: 13pt Sora Regular, white at 50%, right-aligned. Tappable → native date picker.
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap milestone text → inline edit. Tap date → open date picker.

### Tracking Signals
- **Purpose**: Suggested metrics SIA will track for this goal
- **Layout**: Eyebrow label "TRACKING" + card containing signal rows
- **Card**: ink-brown-800, 28pt radius
- **Each signal row**: 36pt tall, 16pt horizontal padding
  - Signal text: 14pt Sora Regular, white at 70%
  - Toggle switch: right-aligned, visual size 32pt wide x 20pt tall, touch target 44x44pt (extended hit area). On: orange (#FF5E00) bg + white circle. Off: white at 15% bg + white circle.
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap toggle → enable/disable signal tracking

### Cross-Domain Connections Preview
- **Purpose**: SIA's detected connections between this goal and other life domains
- **Layout**: Eyebrow label "CONNECTIONS" + card
- **Card**: ink-brown-800, 28pt radius, 24pt padding
  - Connected domain chip(s)
  - Connection explanation: 14pt Sora Regular, white at 60%, 2 lines max
- **Size**: Full-width minus 32pt, ~72pt
- **Non-editable**: Informational only (SIA-generated, not user-modifiable)

### Strictness Toggle
- **Purpose**: User control over SIA's coaching intensity for this goal
- **Layout**: Eyebrow label "HOW STRICT?" + segmented control + description text
- **Segmented control**: 3 segments in a pill-shaped container
  - Container: ink-brown-800, pill radius (999pt), 1pt white at 10% border, 44pt tall, full-width minus 32pt
  - Segments: "lenient" | "balanced" | "strict" — 14pt Sora Semibold
  - Active segment: orange (#FF5E00) bg pill (animated slide), white text
  - Inactive segments: transparent bg, white at 50% text
  - Default selection: "balanced" (center)
- **Description text** (below control, 8pt gap): Contextual description changes with selection
  - Lenient: "SIA will check in gently and adjust timelines flexibly." — 13pt Sora Regular, white at 40%
  - Balanced: "SIA will hold you accountable with reasonable flexibility." — 13pt Sora Regular, white at 40%
  - Strict: "SIA will push hard and flag missed deadlines immediately." — 13pt Sora Regular, white at 40%
- **Size**: Full-width minus 32pt, ~80pt total
- **Animation**: Active segment bg slides between positions (280ms ease-out-soft)
- **Haptic**: Medium impact on segment change

### Mission Preview (Mini Mission Card)
- **Purpose**: Show the user how this mission will appear in their Mission Board [13]
- **Layout**: Eyebrow label "MISSION PREVIEW" + mini Mission Card
- **Card**: Identical to Mission Card from Mission Board [13] but at 85% scale, with 0% progress ring, using the assigned domain tags and selected mission type badge (metallic pill). "Preview" badge (eyebrow style) in top-right corner.
- **Non-interactive**: Read-only preview, no tap action
- **Size**: Full-width minus 32pt, ~112pt

### Chain Suggestions (Phase 2, Conditional)
- **Purpose**: SIA-generated follow-up mission ideas that naturally build on the current mission
- **Condition**: Only appears when SIA detects chain potential (goals that build on each other)
- **Layout**: Eyebrow label "WHAT COMES NEXT?" + suggestion cards + chain toggle
- **Suggestion cards**: 1-2 compact cards, 12pt gap between, ink-brown-800 bg, 14pt radius, 16pt padding
  - Each card:
    - Suggested mission name: 15pt Sora Semibold, white
    - Mission Type Badge + Domain Tag Chip(s), 4pt below name
    - No action buttons on individual cards (accept/dismiss is the toggle below)
- **Explanation text** (below cards, 4pt gap): "These will be added as suggestions after you complete this mission." — 13pt Sora Regular, white at 40%
- **Chain toggle**: "link as chain" — toggle switch, right of label text (14pt Sora Regular, white at 70%). Default: on (orange). Off: white at 15%.
  - When on: Create CTA changes label to "create mission chain"
  - When off: Create CTA stays "create mission" and suggestions are not linked
- **Size**: Full-width minus 32pt, ~120pt (eyebrow + cards + text + toggle)
- **Animation**: Cards appear as part of the structured result stagger. Toggle follows standard toggle animation (160ms slide).

### Create/Save CTA
- **Purpose**: Commit the mission creation or save edits
- **Visual treatment**: Brand CTA Button pattern — full-width minus 32pt, 56pt tall, orange pill
- **Label**: "create mission" (create mode), "create mission chain" (create mode with chain toggle on), or "save changes" (edit mode) — 17pt Sora Semibold, white
- **States**: Enabled (default when in Structured Result state). Loading (white spinner replaces text during save). Disabled if user removes all actions (40% opacity).
- **Gesture**: Tap → save mission, dismiss modal, return to Mission Board [13] (create) or Mission Detail [14] (edit/chain create)
- **Haptic**: Success notification on successful creation/save

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Modal background | #0A0A0F | ink-900 | Full modal surface |
| Modal handle | #FFFFFF at 20% | white/20 | Drag indicator |
| Close button | #FFFFFF at 60% | white/60 | Dismissal action |
| Input bg | #211008 | ink-brown-800 | Text input area |
| Input border (focused) | #FF5E00 | orange | Active input indicator |
| Input text | #FFFFFF | white | User-typed text |
| Placeholder text | #FFFFFF at 30% | white/30 | Cycling examples |
| Submit CTA bg | #FF5E00 | orange | Primary action |
| Processing dots | #FF5E00 | orange | Loading indicator |
| Domain chips | [domain color] at 15% bg | per domain | Editable assignment |
| Domain chip "✕" | [domain color] at 60% | per domain | Removal affordance |
| "+ add" chip border | #FFFFFF at 10% | white/10 | Dashed, add affordance |
| Action text | #FFFFFF | white | Editable list items |
| Delete "✕" | #FFFFFF at 20% | white/20 | Row deletion |
| Reorder handle | #FFFFFF at 20% | white/20 | Drag affordance |
| "+ add action" text | #FF5E00 | orange | Creation affordance |
| Milestone dots | #FF5E00 | orange | Timeline markers |
| Toggle (on) bg | #FF5E00 | orange | Enabled tracking signal |
| Toggle (off) bg | #FFFFFF at 15% | white/15 | Disabled tracking signal |
| Strictness active segment | #FF5E00 | orange | Selected strictness |
| Strictness inactive text | #FFFFFF at 50% | white/50 | Unselected options |
| Create CTA bg | #FF5E00 | orange | Commit action |
| Card surfaces | #211008 | ink-brown-800 | Actions, milestones, tracking, connections, quest preview |
| Eyebrow labels | #FFFFFF at 40% | white/40 | Section identifiers |

**60/30/10 verification**: Orange dominates interactive elements (input border, submit CTA, processing dots, "+ add action", milestone dots, toggle on-state, strictness active segment, create CTA). Green absent from this screen (no completion states — this is a creation flow). Purple absent from this screen (no SIA avatar or AI indicator — SIA's work is represented by the structured output itself, not a color marker). Domain colors on assignment chips only. Ratio holds — this screen is heavily orange because nearly everything is an action or input.

---

## Interaction States

### Natural Language Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | ink-brown-800 bg, 1pt white/10 border, placeholder cycling | — |
| Focused (empty) | 2pt orange border, keyboard up, placeholder pauses | — |
| Typing | 2pt orange border, user text visible, placeholder hidden | — |
| Filled (blurred) | 1pt white/10 border, user text visible | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Submit CTA ("let SIA plan this")
| State | Visual | Haptic |
|-------|--------|--------|
| Disabled | 40% opacity, no touch (input empty) | — |
| Default | Orange bg, white text | — |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Loading | White spinner replaces text, orange bg | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Create/Save CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text | — |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Loading | White spinner replaces text | — |
| Success | Brief green glow (600ms) before modal dismisses | success notification |
| Disabled | 40% opacity (no actions remain) | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Action Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, reorder handle + delete visible | — |
| Editing | Text input active, 2pt orange underline | — |
| Dragging (reorder) | Row lifts (scale 1.02, warm shadow), other rows shift | medium impact (lift), light impact (drop) |
| Deleting | Row collapses height 44→0pt, fade out | — |
| Focus-visible | 2pt orange ring around row | — |

### Strictness Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Inactive | Transparent bg, white/50 text | — |
| Active | Orange bg pill, white text | medium impact |
| Pressed (on inactive) | White/5 bg flash | light impact |
| Focus-visible | 2pt orange ring around segment | — |

### Domain Chip (Editable)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Domain color bg 15%, domain color text, "✕" visible | — |
| Pressed (on "✕") | "✕" brightens, chip scale(0.95) | light impact |
| Removing | Chip collapses width→0, fade out | — |
| Focus-visible | 2pt orange ring around chip | — |

### Tracking Signal Toggle
| State | Visual | Haptic |
|-------|--------|--------|
| On | Orange bg, white circle right | — |
| Off | White/15 bg, white circle left | — |
| Toggling | Circle slides + bg color transitions (160ms) | light impact |
| Focus-visible | 2pt orange ring around toggle | — |

### Close Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "✕", white at 60% | — |
| Pressed | white at 40%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Drag down (>120pt) | Modal handle / modal surface | Dismiss modal (cancel) |
| Tap | Close "✕" button | Dismiss modal (cancel) |
| Tap | "let SIA plan this" CTA | Submit to SIA, enter processing state |
| Tap | User input summary (structured result state) | Re-expand input for editing |
| Tap | Domain chip "✕" | Remove domain assignment |
| Tap | "+ add" domain | Open domain picker dropdown |
| Tap | Action text | Inline edit action |
| Drag | Action reorder handle | Reorder actions |
| Tap | Action "✕" | Delete action |
| Tap | "+ add action" | Insert new action row |
| Tap | Milestone text | Inline edit milestone |
| Tap | Milestone date | Open native date picker |
| Tap | Tracking toggle | Toggle signal on/off |
| Tap | Strictness segment | Switch strictness level |
| Tap | Mission type pill | Select type (deselects others) |
| Tap | Chain suggestion toggle | Toggle chain link on/off |
| Tap | Chain context banner "✕" | Remove chain link (become standalone) |
| Tap | "create mission" / "create mission chain" / "save changes" | Save and dismiss modal |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Modal | Open | Slide up from bottom (y: 100%→0) + backdrop fade (0→60% ink-900) | 520ms | ease-flow |
| Modal | Dismiss (drag) | Slide down follows finger, snap dismiss at 120pt threshold | 280ms (snap) | ease-out-soft |
| Modal | Dismiss (button) | Slide down + backdrop fade out | 280ms | ease-out-soft |
| Placeholder cycle | Every 4s (input state) | Crossfade between example texts | 280ms | ease-out-soft |
| Input → Processing | CTA tap | Input field height shrinks (120→0pt, 280ms), processing dots fade in (280ms, 160ms delay) | 440ms total | ease-out-soft |
| Processing dots | While processing | Sequential scale pulse per dot (1→1.4→1, 160ms stagger, loop) | 480ms per cycle | ease-out-soft |
| Processing → Result | SIA response received | Dots fade out (160ms), sections stagger in (fade + translateY(12→0), 80ms stagger per section, including mission type + chain suggestions) | ~1000ms total | ease-out-soft |
| Type pill select | Tap inactive pill | Active pill slides orange bg to new position (same as strictness) | 280ms | ease-out-soft |
| Chain toggle | Toggle tap | Circle slides + bg color transitions | 160ms | ease-out-soft |
| Chain banner dismiss | Tap "✕" | Banner height collapses + fade-out | 280ms | ease-out-soft |
| Domain chip remove | Tap "✕" | Chip width collapses + fade out, adjacent chips slide to fill gap | 280ms | ease-out-soft |
| Domain picker open | Tap "+ add" | Scale(0.95→1) + fade-in, anchored to "+ add" chip | 160ms | ease-out-soft |
| Action row insert | Tap "+ add action" | New row height expands (0→44pt) + fade-in | 280ms | ease-out-soft |
| Action row delete | Tap "✕" | Row height collapses (44→0pt) + fade-out, rows below shift up | 280ms | ease-out-soft |
| Action reorder | Drag handle | Row lifts (scale 1.02 + shadow), other rows shift smoothly | real-time drag | — |
| Strictness pill | Segment tap | Orange bg pill slides to new position | 280ms | ease-out-soft |
| Strictness description | Segment change | Crossfade to new description text | 280ms | ease-out-soft |
| Create CTA success | Save completes | Green glow flash (600ms) → modal dismisses | 600ms + 280ms | ease-flow |

**Screen transition**:
- **Enter**: Modal slides up from bottom, 520ms ease-flow. Backdrop fades in simultaneously (ink-900 at 60%).
- **Exit (success)**: Green glow on CTA (600ms), then modal slides down (280ms ease-out-soft), backdrop fades out.
- **Exit (cancel/drag dismiss)**: Modal slides down following finger or 280ms snap, backdrop fades out simultaneously.

---

## Empty States

### Input state (default — no text yet)
This IS the default state. The cycling placeholder examples serve as inspiration. The screen is deliberately sparse in this state — the large input field is the focus. No other content competes for attention.

### Edit mode (existing goal)
- Input summary shows the existing mission name (not editable — tap re-expands input to change it)
- All structured result sections pre-populated with existing data
- Mission type shows current type as selected (user can change)
- CTA reads "save changes" instead of "create mission"
- Title reads "edit mission"
- Strictness toggle reflects current setting
- Mission preview shows current progress ring state (not 0%)
- Chain suggestions section hidden in edit mode (chains managed from Mission Detail [14])

### Chain-linked create mode (from chain "modify" or "accept")
- Chain Context Banner visible at top with chain name
- Input field pre-populated with SIA's chain suggestion text (editable)
- Mission type pre-selected based on chain context
- Domain and some actions pre-filled from chain context
- User can modify everything including removing the chain link via banner "✕"
- CTA reads "create mission" (or "create mission chain" if further chain suggestions exist)

### SIA processing error
If SIA fails to structure the goal (timeout or error):
- Processing animation stops
- Error message: "SIA couldn't structure that. Try being more specific, or add details." — 15pt Sora Regular, white at 60%, center-aligned
- "try again" button: secondary style (ink-brown-800 bg, orange text, pill, 44pt tall)
- Input re-expands with original text preserved
- Haptic: error notification

---

## Motivation Adaptation

- **Low motivation**: Same as default (creation flow should be consistent — simplifying it would reduce SIA's ability to create a thorough plan)
- **Medium motivation** (default): Full structured result with all sections
- **High motivation**: Same as default (creation flow is already comprehensive)

Note: Motivation adaptation does not apply to goal creation — the user is actively engaged by definition. Adaptation matters for consumption screens (Home, Goals List, Goal Detail), not creation screens.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Modal title ("new mission" / "edit mission") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Close button icon | Sora | — | 18pt | — | #FFFFFF at 60% |
| Natural language input text | Sora | Regular (400) | 18pt | 24pt | #FFFFFF |
| Natural language placeholder | Sora | Regular (400) | 18pt | 24pt | #FFFFFF at 30% |
| Submit CTA label | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| SIA processing status text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| User input summary | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Section eyebrow labels | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| Domain chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| "+ add" chip text | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 40% |
| Action row text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| "+ add action" text | Sora | Regular (400) | 14pt | 18pt | #FF5E00 |
| Milestone text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Milestone target date | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Tracking signal text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Connection explanation | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 60% |
| Strictness segment labels | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF (active) / #FFFFFF at 50% (inactive) |
| Strictness description | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Create/Save CTA label | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Error message text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 60% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| SIA processing timeout (>8s) | Processing animation stops. Error message: "SIA couldn't structure that. Try being more specific, or add details." Input re-expands with original text preserved. | "try again" button (secondary style, ink-brown-800 bg, orange text). User can edit text and resubmit. Error haptic. |
| SIA processing API failure | Same as timeout — processing stops, error message displayed, input restored. | "try again" button. User can modify input and resubmit. |
| Network failure during goal save | Create/Save CTA shows loading spinner, then reverts to enabled state. Toast: "Couldn't save. Check your connection." | CTA tap retries save. All structured data preserved in form state. |
| Network failure during SIA processing | Processing dots stop. "Connection lost. SIA can't structure your goal right now." | "try again" button. User can also dismiss modal and retry later. |
| Goal save validation error | CTA shakes briefly (horizontal 4pt oscillation, 280ms). Relevant fields highlight with red border. Error text below field. | User corrects fields and re-taps CTA. |
| Empty actions (user deleted all) | Create CTA disabled (40% opacity). Subtle hint: "Add at least one action to create your mission." | User taps "+ add action" to add actions back. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Modal: "New mission, modal" (or "Edit mission, modal")
  - Close button: "Close, cancel creating mission"
  - Natural language input: "Describe your goal, text field"
  - Submit CTA: "Let SIA plan this" (disabled state: "Let SIA plan this, disabled, enter goal text first")
  - Domain chip: "[domain name], removable, tap X to remove"
  - "+ add" domain: "Add domain"
  - Action row: "[action text], editable, drag to reorder, tap X to delete"
  - Reorder handle: "Reorder [action text], drag to move"
  - Milestone row: "[milestone text], target [date], tap date to change"
  - Tracking toggle: "[signal name], [on/off]"
  - Strictness segment: "[level name], [selected/not selected]"
  - Create CTA: "Create mission" (or "Save changes")
- **Focus order**: Close button -> Modal title -> Natural language input -> Submit CTA (input state). Close button -> User input summary -> Domain chips -> Actions list (top to bottom) -> Milestones -> Tracking toggles -> Strictness segments -> Quest preview (read-only) -> Create/Save CTA (structured result state).
- **Gesture alternatives**: Drag-to-dismiss modal also available via close button tap. Drag-to-reorder actions also available via "Move up"/"Move down" accessibility actions on each row.
- **Reduced motion**: Processing animation replaced with static "Processing..." text. Section stagger-in replaced with instant display. Strictness pill slide replaced with instant position change.

---

## Cross-References

- **Navigates to**: Mission Board [13] (after create — modal dismiss), Mission Detail [14] (after edit save or chain create — modal dismiss)
- **Navigates from**: Mission Board [13] FAB "+" via modal present (create mode), Mission Detail [14] edit button via modal present (edit mode), Mission Detail [14] chain "modify"/"accept" via modal present (chain-linked create), Home Screen [12] Day 1 "create first mission" prompt via modal present
- **Shared components with**: Mission Board [13] (Domain Tag Chip, Mission Card in mission preview, Mission Type Badge), Mission Detail [14] (Domain Tag Chip, action list pattern, milestone list pattern, Mission Type Badge, chain context)
- **Patterns used**: Brand CTA Button (from Batch 1), Domain Tag Chip (from Screen 12), Section Eyebrow Label (from Screen 12), Modal Presentation (from _shared-patterns.md), Mission Type Badge (Phase 2), 8-State Interaction Model, Motion Tokens
- **Patterns established**: Multi-State Screen (Input → Processing → Result → Edit), Natural Language Input (large text area with cycling placeholder), SIA Processing Animation (three-dot pulse + status text), Editable AI-Generated List (actions with reorder, edit, delete, add), Mission Type Suggestion (type pills with SIA auto-classification), Chain Suggestions ("What comes next?" section with toggle), Chain Context Banner (chain-linked creation indicator), Strictness Toggle (3-segment control with contextual descriptions), Mission Preview (mini Mission Card preview with type badge), Domain Picker Dropdown, Tracking Signal Toggle
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals/create`
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
| B06-F08 | critical | conversion | Restore the input-first SIA planning flow with a real text area, planning CTA, processing, result, timeout, and error states. |
| B06-F09 | critical | conversion | Wire modal dismissal, generated-plan editing, type/domain/action controls, strictness state, chain toggle, and create/save navigation. |
| B06-F10 | major | mobile-ergonomics | Give editing controls 44px hit areas, prevent clipped type options, and add accessible labels for edit/remove controls. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

