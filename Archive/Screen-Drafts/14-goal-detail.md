# Screen Design: Goal Detail

**Screen**: 14 of 43
**File**: 14-goal-detail.md
**Register**: Product Mode
**Primary action**: Complete the next action (tap checkbox on the prominent next action card)
**Tab**: Goals (stack depth 1)
**Navigation**: Pushed from Goals List [13] (tap goal card) or Home Screen [12] (tap progress ring). Back button returns to previous screen. Edit button (top-right) opens Create/Edit Goal [15] as modal.

---

## Purpose

The Goal Detail screen is the deep view of a single mission — where the user understands not just their progress percentage but why it matters and what to do next. It uses two-level progressive disclosure: a scannable summary (the default) that answers "am I on track?" and an expandable full detail view that answers "what's the complete picture?" SIA is woven throughout — coaching notes, reasoning behind actions, and cross-domain connections all surface here. The prominent next action card ensures the user always knows their immediate next step.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Large progress ring — the hero element, immediate progress feedback
2. Goal name + domain tags — identification and context
3. Next action card — the primary call to action, most prominent interactive element
4. Stats row (actions count, streak, XP) — quick metrics at a glance
5. SIA coaching note — ambient intelligence, personalized context
6. Expandable detail sections — deeper information on demand
7. "Ask SIA about this goal" shortcut — conversational escape hatch

**User flow**:
- **Arrives from**: Goals List [13] via stack push (tap goal card), Home Screen [12] via stack push (tap progress ring in horizontal scroll)
- **Primary exit**: Goals List [13] via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Create/Edit Goal [15] via modal present (tap edit button), SIA Chat [09] (Batch 2) via tab switch (tap "ask SIA" shortcut), domain dashboards [26-36] (Batches 6-8) via stack push (tap domain tag chip)

---

## Layout

**Scroll behavior**: ScrollView (mixed content, expandable sections — not a flat list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ‹  Run a half marathon  ✎ │  ← back button (left), edit (right)
├─────────────────────────────┤
│                             │
│         ╭───────╮           │
│         │       │           │
│         │  68%  │           │  ← large progress ring (96pt)
│         │       │           │
│         ╰───────╯           │
│                             │
│    Run a half marathon      │  ← goal name, center-aligned
│    🔴fitness  🟢nutrition   │  ← domain tags, centered
│                             │  ← 24pt gap
│  ┌───────────────────────┐  │
│  │ 7 actions   🔥 12d    │  │  ← stats row
│  │ across 3    ⚡ 340 XP  │  │
│  │ life areas             │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ SIA: "Strong momentum │  │  ← SIA coaching note card
│  │ this week. Your tempo  │  │
│  │ runs are paying off."  │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  NEXT UP                    │  ← eyebrow label
│  ┌───────────────────────┐  │
│  │ ☐  5K tempo run       │  │  ← prominent next action card
│  │    🔴fitness · 30 min │  │
│  │    "This builds the   │  │
│  │     endurance base."  │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  ─── Expandable sections ──│  ← below here is full detail
│                             │
│  ▸ All actions (5/7 done)  │  ← collapsible
│  ▸ Milestones              │  ← collapsible
│  ▸ SIA's reasoning         │  ← collapsible
│  ▸ Cross-domain links      │  ← collapsible
│  ▸ Progress over time      │  ← collapsible (contains chart)
│                             │
│  ┌───────────────────────┐  │
│  │ 💬 Ask SIA about this │  │  ← SIA shortcut card
│  │    goal               │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Bar** — 44pt
   - Purpose: Back navigation and edit action
   - Content: Back button (left), goal name truncated (center, 17pt Sora Semibold), edit icon (right)

2. **Hero Progress Ring** — 96pt ring + 32pt top padding + 16pt bottom gap = 144pt
   - Purpose: Immediate visual progress feedback — the dominant element
   - Content: Large progress ring with percentage, centered

3. **Goal Identity Block** — ~56pt
   - Purpose: Goal name and domain context
   - Content: Goal name (centered) + domain tag chips (centered row below)

4. **Stats Row Card** — 64pt + 16pt gaps = 80pt
   - Purpose: Quick metrics at a glance
   - Content: Action count, life area count, streak days, XP earned

5. **SIA Coaching Note Card** — ~72pt
   - Purpose: Personalized coaching context from SIA
   - Content: SIA's assessment of this goal's progress

6. **Next Action Card** — ~96pt (eyebrow + card)
   - Purpose: The primary CTA — what to do right now
   - Content: Eyebrow "NEXT UP" + action card with checkbox, domain tag, time, SIA reason

7. **Expandable Detail Sections** — variable (each header ~48pt collapsed, expanded content varies)
   - Purpose: Full detail on demand via progressive disclosure
   - Content: 5 collapsible sections

8. **Ask SIA Card** — 56pt + 32pt top gap = 88pt
   - Purpose: Conversational shortcut to discuss this goal with SIA
   - Content: Chat icon + "ask SIA about this goal" label

9. **Bottom Spacer** — 24pt
   - Purpose: Breathing room above tab bar

---

## Components

### Navigation Bar
- **Purpose**: Back navigation, screen title, edit action
- **Visual treatment**: 44pt height, transparent bg (scrolls under sticky status bar). On scroll past hero: bg transitions to ink-900 at 80% + backdrop-blur(16px), goal name fades in at center.
- **Sub-elements**:
  - Back button: left chevron, white, 20pt icon, 44x44pt touch target, 16pt from left edge. Same as Batch 1 pattern.
  - Center title: goal name truncated, 17pt Sora Semibold, white. Opacity 0 at default, fades to 1 when hero scrolls off-screen.
  - Edit button: pencil icon, 20pt, white, 44x44pt touch target, 16pt from right edge.
- **Gestures**: Back button tap → stack pop. Edit button tap → modal present Create/Edit Goal [15] in edit mode. iOS swipe-right-from-edge → stack pop.

### Hero Progress Ring (Large Variant)
- **Purpose**: The dominant visual element — immediate progress communication
- **Visual treatment**: 96pt diameter, 6pt stroke width. Track: white at 10%. Fill: orange (#FF5E00), clockwise from 12 o'clock. Green (#34A853) if 100%.
- **Percentage**: 24pt Sora Bold, white, centered inside ring
- **Position**: Centered horizontally, 32pt below navigation bar
- **Animation**: Ring fill animates from 0→current% on mount, 520ms ease-flow. On progress update (action completed), ring fill animates from old%→new%, 280ms ease-out-soft.

### Goal Identity Block
- **Purpose**: Goal name and domain context immediately below the hero ring
- **Sub-elements**:
  - Goal name: 20pt Sora Semibold, white, center-aligned, 2 lines max. 16pt horizontal margins.
  - Domain tag chips: centered row, 8pt gap between chips, 8pt below name. Uses Domain Tag Chip pattern (tappable variant — tap navigates to domain dashboard).
- **Size**: Full-width, ~56pt (1-line name) to ~80pt (2-line name)

### Stats Row Card
- **Purpose**: Quick goal metrics in a compact row
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout**: Two-column, center-aligned:
  - Left: "[#] actions across [#] life areas" — 14pt Sora Regular, white at 70%
  - Right column top: "🔥 [##]d" streak — 14pt Sora Semibold, white at 70%
  - Right column bottom: "⚡ [##] XP" — 14pt Sora Semibold, orange (#FF5E00)
- **Size**: Full-width minus 32pt, 64pt tall

### SIA Coaching Note Card
- **Purpose**: SIA's personalized assessment of this goal's current state
- **Data source**: SIA coaching engine (contextual to this goal's progress, recent actions, patterns)
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Purple (#7F24FF) left border accent, 3pt wide, 40% opacity. This is one of the max-2 purple elements on this screen.
- **Sub-elements**:
  - "SIA" label: 11pt Sora Semibold, white at 40%, top-left
  - Note text: 15pt Sora Regular, white at 80%, 2-3 lines
- **Size**: Full-width minus 32pt, ~72pt tall
- **Variants**: Encouraging ("Strong momentum this week."), Nudging ("2 days behind schedule. Want to adjust the timeline?"), Celebrating ("On track to finish 2 weeks early.")

### Next Action Card
- **Purpose**: The single most important thing the user should do next for this goal
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Slightly elevated — warm shadow (0 2pt 12pt rgba(33,16,8,0.4)). This is the most visually prominent card on the screen after the hero ring.
- **Sub-elements**:
  - Completion checkbox: 28pt circle (slightly larger than action card standard), left-aligned. Default: 2pt white at 30% border. Completed: orange fill, white checkmark.
  - Action text: 16pt Sora Semibold, white, right of checkbox (12pt gap), 2 lines max
  - Domain tag chip + estimated time: below action text, 4pt gap. Tag(s) + "· [##] min" in 13pt Sora Regular, white at 50%
  - SIA reason: "This builds the endurance base." — 13pt Sora Regular, white at 50%, below domain/time row, 4pt gap
- **Size**: Full-width minus 32pt, ~96pt tall
- **Gestures**: Tap checkbox → complete action (success animation + haptic, ring updates, next action transitions in). Tap card body → no separate action (checkbox is the interaction).

### Expandable Section Header
- **Purpose**: Toggle for progressive disclosure sections
- **Visual treatment**: Full-width row, no card surface. 48pt tall, 16pt horizontal margins.
- **Sub-elements**:
  - Chevron: 14pt, white at 40%, rotates 90° on expand (▸ → ▾). Left side.
  - Section title: 15pt Sora Semibold, white at 80%, 8pt right of chevron
  - Counter badge (where applicable): "5/7 done" — 12pt Sora Regular, white at 40%, right-aligned
- **Divider**: 1pt white at 5% line below each header (except last)
- **Gestures**: Tap full row → toggle expand/collapse
- **States**: Collapsed (default), expanded (content visible below)

### Expandable Section: All Actions
- **Content**: Vertical checklist of all decomposed actions for this goal
- **Each row**: 44pt tall
  - Checkbox: 20pt circle, 2pt border. Completed: orange fill + white checkmark. Incomplete: white at 30% border.
  - Action text: 15pt Sora Regular, white (incomplete) or white at 40% + strikethrough (completed)
  - Domain tag chip: right-aligned, small
- **Interaction**: Tap checkbox → toggle completion (updates progress ring above)

### Expandable Section: Milestones
- **Content**: Vertical timeline of milestones with target dates
- **Each milestone**: 56pt tall
  - Milestone dot: 12pt circle. Completed: green (#34A853) fill. Upcoming: orange (#FF5E00) border. Future: white at 20% border.
  - Connecting line: 2pt vertical, white at 10%, between dots
  - Milestone text: 15pt Sora Regular, white
  - Target date: 13pt Sora Regular, white at 50%, right-aligned
  - Status: "completed May 15" or "target Jun 30" — 12pt Sora Regular, green or white at 40%

### Expandable Section: SIA's Reasoning
- **Content**: SIA's explanation of why the goal is structured this way and how actions connect
- **Visual**: Body text, 15pt Sora Regular, white at 80%, 16pt horizontal margins
- **Sub-elements**:
  - "why this goal matters" — 13pt Sora Semibold, white at 50%, section sub-heading
  - Reasoning text: 2-4 lines, conversational SIA voice
  - "how actions connect" — 13pt Sora Semibold, white at 50%
  - Connection text: explains cross-domain strategy

### Expandable Section: Cross-Domain Connections
- **Content**: How this goal connects to other goals across life domains
- **Each connection**: ink-brown-800 mini-card, 12pt radius, 12pt padding
  - Connected goal name: 14pt Sora Semibold, white
  - Domain tag chip(s)
  - Connection explanation: "This connects to your Finance goal because consistent exercise reduces healthcare costs." — 13pt Sora Regular, white at 60%
- **Gesture**: Tap mini-card → stack push to that goal's Goal Detail [14] (recursive navigation)

### Expandable Section: Progress Over Time
- **Content**: Line chart showing goal progress over time
- **Visual treatment**: ink-brown-800 card, 14pt radius, 16pt padding. Chart area: 180pt tall.
- **Chart specifications**:
  - X-axis: time (weeks or months depending on goal duration), 12pt Sora Regular, white at 30%
  - Y-axis: progress % (0-100), 12pt Sora Regular, white at 30%
  - Past data line: 2pt solid, orange (#FF5E00), with dot markers at data points (6pt circles, orange fill)
  - Projected line: 2pt dashed, purple (#7F24FF) at 60%. This is the second purple element on this screen (if SIA coaching note is the first).
  - Milestone markers: 8pt circles, green (#34A853) fill, on the data line at milestone dates
  - Fill area below past data: orange at 5% opacity (subtle gradient)
  - Grid lines: 1pt, white at 3%, horizontal only
- **Time range selector**: "week | month | all" chips below chart, 28pt tall, same chip style as filter tabs on Goals List [13]
- **Size**: Full-width minus 32pt, ~240pt total (chart + selector + padding)

### Ask SIA Card
- **Purpose**: Quick shortcut to discuss this goal with SIA in chat
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius, 16pt internal padding. Single row layout.
- **Sub-elements**:
  - Chat bubble icon: 20pt, orange (#FF5E00), left side
  - Label: "ask SIA about this goal" — 15pt Sora Semibold, white, 12pt right of icon
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 56pt tall
- **Gestures**: Tap → tab switch to SIA Chat [09] with this goal's context pre-loaded (SIA opens with "What would you like to know about [goal name]?")

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Stats row, SIA note, next action, connection cards, chart card, Ask SIA card |
| Nav bar bg (scrolled) | #0A0A0F at 80% | ink-900/80 | + backdrop-blur(16px) |
| Hero progress ring fill | #FF5E00 | orange | Primary progress |
| Hero progress ring complete | #34A853 | green | 100% state |
| Hero ring track | #FFFFFF at 10% | white/10 | Inactive track |
| Hero percentage text | #FFFFFF | white | Inside ring |
| Goal name | #FFFFFF | white | Primary heading |
| SIA coaching note border | #7F24FF at 40% | purple/40 | Purple element 1 of 2 |
| Progress chart projected line | #7F24FF at 60% | purple/60 | Purple element 2 of 2 |
| Progress chart past line | #FF5E00 | orange | User data |
| Progress chart milestones | #34A853 | green | Achievement markers |
| Next action card shadow | rgba(33,16,8,0.4) | warm shadow | Elevation |
| Checkbox completed | #FF5E00 | orange | Action completion |
| Action completed text | #FFFFFF at 40% | white/40 | Strikethrough |
| Milestone dot (completed) | #34A853 | green | Past milestones |
| Milestone dot (upcoming) | #FF5E00 | orange | Next milestone |
| Milestone dot (future) | #FFFFFF at 20% | white/20 | Distant milestones |
| XP badge | #FF5E00 | orange | Reward |
| Ask SIA icon | #FF5E00 | orange | CTA indicator |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| Expandable chevrons | #FFFFFF at 40% | white/40 | Toggle indicator |
| Section titles | #FFFFFF at 80% | white/80 | Secondary headings |

**60/30/10 verification**: Orange on hero ring fill, checkboxes, XP badge, Ask SIA icon, chart past line, upcoming milestones, next action checkbox. Green on completion states (100% ring, completed milestones, completed action checkmarks). Purple limited to exactly 2 elements (SIA note left border, chart projected line). Domain colors on chips only. Ratio holds.

---

## Interaction States

### Next Action Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Elevated card, checkbox empty, full content | — |
| Pressed (checkbox) | Checkbox scale(0.9), border brightens | light impact |
| Completed | Checkbox fills orange + checkmark, text strikethrough, card fades slightly. After 600ms, new next action slides in from below. | success notification |
| Focus-visible | 2pt orange ring around card, offset 2pt | — |
| Loading | Skeleton shimmer on text areas | — |

### Hero Progress Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Ring filled to current percentage | — |
| Updating | Ring fill animates from old%→new% (after action completion) | — |
| Complete (100%) | Ring turns green, percentage reads "100%", brief green glow pulse (600ms) | success notification |

### Expandable Section Header
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | Chevron pointing right, content hidden | — |
| Pressed | Row bg: white at 3%, chevron brightens | light impact |
| Expanded | Chevron rotates to pointing down, content slides open | — |
| Focus-visible | 2pt orange ring around row, offset 2pt | — |

### Action Checklist Row (inside expanded section)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (incomplete) | Empty checkbox, normal text | — |
| Pressed | Checkbox scale(0.9) | light impact |
| Completed | Orange checkbox + checkmark, strikethrough text at 40% opacity | success notification |
| Focus-visible | 2pt orange ring around checkbox, offset 2pt | — |

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Edit Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White pencil icon, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Ask SIA Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, chat icon + label + chevron | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Cross-Domain Connection Mini-Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, goal name + tags + explanation | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to Goals List [13] or Home Screen [12] |
| Swipe right from left edge | Screen | iOS back gesture — stack pop |
| Tap | Edit button | Modal present Create/Edit Goal [15] in edit mode |
| Tap | Next action checkbox | Complete action, update ring, transition to next action |
| Tap | Expandable section header | Toggle section expand/collapse |
| Tap | Action checklist checkbox | Toggle action completion |
| Tap | Domain tag chip | Stack push to relevant domain dashboard |
| Tap | Cross-domain connection card | Stack push to that goal's Goal Detail [14] |
| Tap | Ask SIA card | Tab switch to SIA Chat [09] with goal context |
| Tap | Chart time range chip | Switch chart time range (week/month/all) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Hero ring | Screen mount | Fill animates 0→current% | 520ms | ease-flow |
| Hero ring | Action completed | Fill animates old%→new% | 280ms | ease-out-soft |
| Hero ring 100% | Reaches 100% | Green color transition + glow pulse | 600ms | ease-flow |
| Goal name + tags | Screen mount | Fade-in + translateY(8→0), 80ms after ring | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0), staggered | 280ms | ease-out-soft |
| SIA note card | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Next action card | Screen mount | Fade-in + translateY(12→0), last in stagger | 280ms | ease-out-soft |
| Section expand | Tap header | Content height 0→auto + fade-in. Chevron rotates 0→90° | 280ms | ease-out-soft |
| Section collapse | Tap header | Content height auto→0 + fade-out. Chevron rotates 90°→0 | 280ms | ease-out-soft |
| Next action transition | Current action completed | Old card slides down + fades (280ms), new card slides up from below + fades in (280ms, 160ms delay) | 440ms total | ease-out-soft |
| Nav bar title | Scroll past hero | Title opacity 0→1, bg blur 0→16px | 160ms | ease-out-soft |
| Chart line | Section expands (chart visible) | Line draws from left to right | 520ms | ease-flow |
| Projected line | After past line draws | Dashed line draws right, starting from end of past line | 280ms | ease-out-soft |
| Checklist checkbox | Tap complete | Orange fill from center + checkmark scale 0→1 | 280ms | ease-flow |

**Screen transition**:
- **Enter**: Standard iOS stack push (slide in from right), 280ms ease-out-soft. Content stagger begins after push completes.
- **Exit (back)**: Standard iOS stack pop (slide out to right), 280ms ease-out-soft.
- **Exit (to Create/Edit Goal)**: Modal slides up from bottom, 520ms ease-flow.
- **Exit (to SIA Chat)**: Tab switch — instant, SIA chat opens with goal context message.

---

## Empty States

### Day 1 (goal just created, no actions completed)
- Hero ring: 0% (empty ring, orange at start position marker — a small dot at 12 o'clock)
- Stats row: "0 actions completed of [total]" — no streak, 0 XP
- SIA coaching note: encouraging start message — "Every mission starts at 0%. Your first action is ready below."
- Next action card: first generated action from SIA
- Expandable sections: All Actions shows full unchecked list. Milestones show future dates only. Progress chart shows only projected line (no past data yet). SIA reasoning available. Cross-domain connections available.

### All actions completed (100%)
- Hero ring: green (#34A853) fill, "100%" text, green glow pulse on mount
- Stats row: "[total]/[total] actions" + streak + total XP
- SIA coaching note: celebratory — "Mission accomplished. You stayed consistent for [##] days."
- Next action card: replaced by completion card — "Mission complete" heading, SIA suggestion for next steps ("Ready for a new challenge?" with link to Create Goal [15])
- Expandable sections: All Actions shows all checked (green). Milestones all completed (green dots). Chart shows full orange line reaching 100%.

---

## Motivation Adaptation

- **Low motivation**:
  - Only shown: Hero ring, goal name/tags, next action card, Ask SIA card
  - Stats row: hidden
  - SIA coaching note: simplified, 1 line, gently encouraging
  - Expandable sections: collapsed and de-emphasized (white at 30% text), only "all actions" section available
  - Minimal screen — fits in one viewport without scrolling

- **Medium motivation** (default):
  - Summary view fully visible (hero, identity, stats, SIA note, next action)
  - Expandable sections all present, collapsed by default
  - Ask SIA card visible

- **High motivation**:
  - Summary view fully visible
  - "All actions" and "Progress over time" sections auto-expanded on mount
  - Additional detail visible: estimated completion date, average pace metric in stats row
  - SIA coaching note expanded (3 lines with data-specific insight)

---

## Cross-References

- **Navigates to**: Create/Edit Goal [15] via modal present (edit button), SIA Chat [09] via tab switch (Ask SIA card), Goals List [13] via stack pop (back), domain dashboards [26-36] (Batches 6-8) via stack push (domain tag chips), other Goal Detail [14] instances via stack push (cross-domain connection cards)
- **Navigates from**: Goals List [13] via stack push, Home Screen [12] via stack push
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring large variant, Section Eyebrow), Goals List [13] (Domain Tag Chip, Progress Ring references, Goal Card as data source), Create/Edit Goal [15] (domain chips, action list)
- **Patterns used**: Back Button (from Batch 1), Domain Tag Chip (from Screen 12), Progress Ring large variant (new size), Section Eyebrow (from Screen 12), Action Card checkbox pattern (from Screen 12), 8-State Interaction Model, Motion Tokens, Staggered Content Entry
- **Patterns established**: Detail Screen Template (hero element → summary → expandable detail), Expandable/Collapsible Section, Progress Chart (line chart: orange solid past + purple dashed projected + green milestone dots), Cross-Domain Connection Card, Next Action Card (prominent, elevated, with SIA reasoning), Navigation Bar with scroll-reactive title (transparent → blurred with title), Ask SIA Shortcut Card
