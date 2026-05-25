# Screen Design: Create / Edit Goal

**Screen**: 15 of 43
**File**: 15-create-edit-goal.md
**Register**: Product Mode
**Primary action**: Create mission (tap "create mission" CTA after reviewing SIA's structured plan)
**Tab**: Goals (modal overlay)
**Navigation**: Modal presentation — slides up from bottom. Launched from Goals List [13] FAB "+" (create mode) or Goal Detail [14] edit button (edit mode). Drag-to-dismiss or explicit cancel. On create → dismisses to Goals List [13]. On edit save → dismisses to Goal Detail [14].

---

## Purpose

This screen transforms a natural-language intention into a structured, actionable mission. The user types what they want to achieve in plain language, and SIA decomposes it into domain assignments, actions, milestones, and tracking signals. The magic moment is the transition from a single sentence to a rich, structured plan — this is where SIA proves its value as a coach. The edit mode allows refinement of any SIA-generated element, keeping the user in control while SIA does the heavy lifting.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Natural language input field — the first and most prominent element in input state
2. SIA-generated structured result — the detailed plan after processing
3. "create mission" / "save changes" CTA — the commit action
4. Domain assignment chip — editable, colorful
5. Generated actions list — the tactical breakdown
6. Strictness toggle — control over SIA's coaching intensity
7. RPG quest preview — motivational framing of how this becomes a mission

**User flow**:
- **Arrives from**: Goals List [13] FAB "+" via modal present (create mode), Goal Detail [14] edit button via modal present (edit mode)
- **Primary exit (create)**: Goals List [13] — modal dismisses, list refreshes with new goal
- **Primary exit (edit)**: Goal Detail [14] — modal dismisses, detail refreshes with changes
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
│                             │
│  "Run a half marathon"      │  ← user's original input (collapsed)
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
│  QUEST PREVIEW              │  ← eyebrow
│  ┌───────────────────────┐  │
│  │ ◯  Run a half         │  │  ← mini goal card preview
│  │ 0% marathon            │  │
│  │    🔴fitness           │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  ┌───────────────────────┐  │
│  │   create mission      │  │  ← primary CTA
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
3. **User Input Summary** — ~32pt (collapsed text of original input)
4. **Domain Assignment** — ~56pt (eyebrow + chip row)
5. **Actions List** — variable (~40pt per action + "add action" row)
6. **Milestones List** — variable (~48pt per milestone)
7. **Tracking Signals** — variable (~36pt per signal)
8. **Cross-Domain Connections** — ~72pt
9. **Strictness Toggle** — ~80pt (eyebrow + segmented control + description)
10. **Quest Preview** — ~88pt (eyebrow + mini goal card)
11. **Primary CTA** — 56pt + 32pt top gap = 88pt
12. **Bottom Spacer** — 32pt

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

### User Input Summary (Structured Result State)
- **Purpose**: Collapsed view of the user's original input text
- **Visual treatment**: 16pt Sora Semibold, white, left-aligned, 16pt horizontal margins. 1 line, truncated with ellipsis if long. Quotation marks around text.
- **Gesture**: Tap → re-expands input field for editing (returns to Input state with text preserved)
- **Size**: Full-width, ~32pt

### Domain Assignment
- **Purpose**: SIA's auto-detected domain(s) for this goal, editable by user
- **Layout**: Eyebrow label "DOMAIN" + chip row below
- **Chips**: Domain Tag Chip pattern, but with a small "✕" (10pt) inside each chip for removal. Tapping "✕" removes the domain assignment.
- **Add button**: "+ add" text chip — 24pt tall, pill, 1pt white at 10% dashed border, "+" and "add" in 11pt Sora Semibold, white at 40%. Tapping opens a dropdown of available domains (Domain Tag Chips in a vertical list, z-40 floating card, same style as Quick Actions Menu).
- **Gestures**: Tap chip "✕" → remove domain. Tap "+ add" → open domain picker. Tap domain in picker → add it.

### Editable Actions List
- **Purpose**: SIA-generated tactical breakdown, editable by user
- **Layout**: Eyebrow label "ACTIONS" + card containing action rows + "add action" row at bottom
- **Card**: ink-brown-800, 14pt radius, 0pt internal padding (rows handle their own padding)
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
- **Card**: ink-brown-800, 14pt radius
- **Each milestone row**: 48pt tall, 16pt horizontal padding
  - Milestone dot: 10pt circle, orange (#FF5E00) border, left side
  - Milestone text: 15pt Sora Regular, white, tappable to edit inline
  - Target date: 13pt Sora Regular, white at 50%, right-aligned. Tappable → native date picker.
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap milestone text → inline edit. Tap date → open date picker.

### Tracking Signals
- **Purpose**: Suggested metrics SIA will track for this goal
- **Layout**: Eyebrow label "TRACKING" + card containing signal rows
- **Card**: ink-brown-800, 14pt radius
- **Each signal row**: 36pt tall, 16pt horizontal padding
  - Signal text: 14pt Sora Regular, white at 70%
  - Toggle switch: right-aligned, visual size 32pt wide x 20pt tall, touch target 44x44pt (extended hit area). On: orange (#FF5E00) bg + white circle. Off: white at 15% bg + white circle.
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap toggle → enable/disable signal tracking

### Cross-Domain Connections Preview
- **Purpose**: SIA's detected connections between this goal and other life domains
- **Layout**: Eyebrow label "CONNECTIONS" + card
- **Card**: ink-brown-800, 14pt radius, 16pt padding
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

### Quest Preview (Mini Goal Card)
- **Purpose**: Show the user how this goal will appear in their Goals List [13]
- **Layout**: Eyebrow label "QUEST PREVIEW" + mini Goal Card
- **Card**: Identical to Goal Card from Goals List [13] but at 85% scale, with 0% progress ring, using the assigned domain tags. "Preview" badge (eyebrow style) in top-right corner.
- **Non-interactive**: Read-only preview, no tap action
- **Size**: Full-width minus 32pt, ~112pt

### Create/Save CTA
- **Purpose**: Commit the goal creation or save edits
- **Visual treatment**: Brand CTA Button pattern — full-width minus 32pt, 56pt tall, orange pill
- **Label**: "create mission" (create mode) or "save changes" (edit mode) — 17pt Sora Semibold, white
- **States**: Enabled (default when in Structured Result state). Loading (white spinner replaces text during save). Disabled if user removes all actions (40% opacity).
- **Gesture**: Tap → save goal, dismiss modal, return to Goals List [13] (create) or Goal Detail [14] (edit)
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
| Tap | "create mission" / "save changes" | Save and dismiss modal |

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
| Processing → Result | SIA response received | Dots fade out (160ms), sections stagger in (fade + translateY(12→0), 80ms stagger per section) | ~800ms total | ease-out-soft |
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
- Input summary shows the existing goal name (not editable — tap re-expands input to change it)
- All structured result sections pre-populated with existing data
- CTA reads "save changes" instead of "create mission"
- Title reads "edit mission"
- Strictness toggle reflects current setting
- Quest preview shows current progress ring state (not 0%)

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

## Cross-References

- **Navigates to**: Goals List [13] (after create — modal dismiss), Goal Detail [14] (after edit save — modal dismiss)
- **Navigates from**: Goals List [13] FAB "+" via modal present (create mode), Goal Detail [14] edit button via modal present (edit mode), Home Screen [12] Day 1 "create first mission" prompt via modal present
- **Shared components with**: Goals List [13] (Domain Tag Chip, Goal Card in quest preview), Goal Detail [14] (Domain Tag Chip, action list pattern, milestone list pattern)
- **Patterns used**: Brand CTA Button (from Batch 1), Domain Tag Chip (from Screen 12), Section Eyebrow Label (from Screen 12), Modal Presentation (from _shared-patterns.md), 8-State Interaction Model, Motion Tokens
- **Patterns established**: Multi-State Screen (Input → Processing → Result → Edit), Natural Language Input (large text area with cycling placeholder), SIA Processing Animation (three-dot pulse + status text), Editable AI-Generated List (actions with reorder, edit, delete, add), Strictness Toggle (3-segment control with contextual descriptions), Quest Preview (mini Goal Card preview), Domain Picker Dropdown, Tracking Signal Toggle
