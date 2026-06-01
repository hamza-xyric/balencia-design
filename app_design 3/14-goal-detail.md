# Screen Design: Mission Detail

**Screen**: 14 of 74
**File**: 14-goal-detail.md
**Register**: Product Mode
**Primary action**: Complete the next action (tap checkbox on the prominent next action card)
**Tab**: Goals (stack depth 1)
**Navigation**: Pushed from Mission Board [13] (tap mission card) or Home Screen [12] (tap pinned mission card). Back button returns to previous screen. Edit button (top-right) opens Create Mission [15] as modal. Pin button toggles home pin state.

---

## Purpose

The Mission Detail screen is the deep view of a single mission — where the user understands not just their progress percentage but why it matters, what to do next, and where this mission sits in a larger chain. It uses two-level progressive disclosure: a scannable summary (the default) that answers "am I on track?" and an expandable full detail view that answers "what's the complete picture?" SIA is woven throughout — coaching notes, chain suggestions, stalled-mission nudges, and cross-domain connections all surface here. The prominent next action card ensures the user always knows their immediate next step.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Large progress ring — the hero element, immediate progress feedback
2. Mission name + mission type badge + domain tags — identification, classification, and context
3. Next action card — the primary call to action, most prominent interactive element
4. Stats row (actions count, streak, XP, difficulty) — quick metrics at a glance
5. SIA coaching note / Stalled mission nudge — ambient intelligence, personalized context
6. Expandable detail sections — deeper information on demand (including mission chain)
7. "Ask SIA about this mission" shortcut — conversational escape hatch

**User flow**:
- **Arrives from**: Mission Board [13] via stack push (tap mission card), Home Screen [12] via stack push (tap pinned mission card)
- **Primary exit**: Mission Board [13] via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Create Mission [15] via modal present (tap edit button), SIA Chat [09] via tab switch (tap "ask SIA" shortcut), domain dashboards [26-36] via stack push (tap domain tag chip), other Mission Detail [14] instances via stack push (tap cross-domain connection card or chain mission link)

---

## Layout

**Scroll behavior**: ScrollView (mixed content, expandable sections — not a flat list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ‹  Run a half marathon 📌✎│  ← back (left), pin + edit (right)
├─────────────────────────────┤
│                             │
│         ╭───────╮           │
│         │       │           │
│         │  68%  │           │  ← large progress ring (96pt)
│         │       │           │
│         ╰───────╯           │
│                             │
│    Run a half marathon      │  ← mission name, center-aligned
│        🥈 main mission      │  ← mission type badge, centered
│    🔴fitness  🟢nutrition   │  ← domain tags, centered
│                             │  ← 24pt gap
│  ┌───────────────────────┐  │
│  │ 7 actions   🔥 12d    │  │  ← stats row
│  │ across 3    ⚡ 340 XP  │  │
│  │ life areas  🟢 easy    │  │  ← + difficulty indicator
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ SIA: "Strong momentum │  │  ← SIA coaching note card
│  │ this week. Your tempo  │  │     (OR stalled nudge if 7+ days)
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
│  ─── Expandable sections ──│
│                             │
│  ▸ All actions (5/7 done)  │  ← collapsible
│  ▸ Milestones              │  ← collapsible
│  ▸ Mission chain (2 of 4)  │  ← collapsible (NEW - Phase 2)
│  ▸ SIA's reasoning         │  ← collapsible
│  ▸ Cross-domain links      │  ← collapsible
│  ▸ Progress over time      │  ← collapsible (contains chart)
│                             │
│  ┌───────────────────────┐  │
│  │ 💬 Ask SIA about this │  │  ← SIA shortcut card
│  │    mission            │  │
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
   - Purpose: Back navigation, pin toggle, and edit action
   - Content: Back button (left), mission name truncated (center), pin icon + edit icon (right)

2. **Hero Progress Ring** — 96pt ring + 32pt top padding + 16pt bottom gap = 144pt
   - Purpose: Immediate visual progress feedback — the dominant element
   - Content: Large progress ring with percentage, centered

3. **Mission Identity Block** — ~80pt
   - Purpose: Mission name, type badge, and domain context
   - Content: Mission name (centered) + mission type badge (centered) + domain tag chips (centered row below)

4. **Stats Row Card** — 80pt + 16pt gaps = 96pt
   - Purpose: Quick metrics at a glance including difficulty
   - Content: Action count, life area count, streak days, XP earned, difficulty tier

5. **SIA Coaching Note Card / Stalled Mission Nudge** — ~72-120pt (conditional)
   - Purpose: Personalized coaching context from SIA, or stalled-mission intervention
   - Content: Either SIA coaching note OR Stalled Mission Nudge (if 7+ days no progress)

6. **Next Action Card** — ~96pt (eyebrow + card)
   - Purpose: The primary CTA — what to do right now
   - Content: Eyebrow "NEXT UP" + action card with checkbox, domain tag, time, SIA reason

7. **Expandable Detail Sections** — variable (each header ~48pt collapsed, expanded content varies)
   - Purpose: Full detail on demand via progressive disclosure
   - Content: 6 collapsible sections (actions, milestones, mission chain, reasoning, connections, progress chart)

8. **Ask SIA Card** — 56pt + 32pt top gap = 88pt
   - Purpose: Conversational shortcut to discuss this mission with SIA
   - Content: Chat icon + "ask SIA about this mission" label

9. **Bottom Spacer** — 24pt
   - Purpose: Breathing room above tab bar

---

## Components

### Navigation Bar
- **Purpose**: Back navigation, screen title, pin toggle, edit action
- **Visual treatment**: 44pt height, transparent bg (scrolls under sticky status bar). On scroll past hero: bg transitions to ink-900 at 80% + backdrop-blur(16px), mission name fades in at center.
- **Sub-elements**:
  - Back button: left chevron, white, 20pt icon, 44x44pt touch target, 16pt from left edge.
  - Center title: mission name truncated, 17pt Sora Semibold, white. Opacity 0 at default, fades to 1 when hero scrolls off-screen.
  - Pin button: pin outline icon, 20pt, 44x44pt touch target. Unpinned: white at 60%. Pinned: filled pin, orange (#FF5E00). 8pt gap from edit button.
  - Edit button: pencil icon, 20pt, white, 44x44pt touch target, 16pt from right edge.
- **Gestures**: Back button tap → stack pop. Pin button tap → toggle pin state (max 3 limit applies). Edit button tap → modal present Create Mission [15] in edit mode. iOS swipe-right-from-edge → stack pop.

### Hero Progress Ring (Large Variant)
- **Purpose**: The dominant visual element — immediate progress communication
- **Visual treatment**: 96pt diameter, 6pt stroke width. Track: white at 10%. Fill: orange (#FF5E00), clockwise from 12 o'clock. Green (#34A853) if 100%. Gray (#6B7280) if archived.
- **Percentage**: 24pt Sora Bold, white, centered inside ring
- **Position**: Centered horizontally, 32pt below navigation bar
- **Animation**: Ring fill animates from 0→current% on mount, 520ms ease-flow. On progress update (action completed), ring fill animates from old%→new%, 280ms ease-out-soft.

### Mission Identity Block
- **Purpose**: Mission name, type classification, and domain context immediately below the hero ring
- **Sub-elements**:
  - Mission name: 20pt Sora Semibold, white, center-aligned, 2 lines max. 16pt horizontal margins.
  - Mission type badge: centered, 4pt below name. Uses Mission Type Badge pattern (metallic pill, 24pt tall). Standalone variant (centered, not inline with tags).
  - Domain tag chips: centered row, 8pt gap between chips, 4pt below badge. Uses Domain Tag Chip pattern (tappable variant — tap navigates to domain dashboard).
- **Size**: Full-width, ~80pt (1-line name) to ~104pt (2-line name)

### Stats Row Card
- **Purpose**: Quick mission metrics in a compact card
- **Visual treatment**: ink-brown-800 (#211008) card, 14pt border radius (--r-md, card height under 80pt), 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout**: Three rows:
  - Row 1: "[#] actions across [#] life areas" — 14pt Sora Regular, white at 70%
  - Row 2: "🔥 [##]d" streak (14pt Sora Semibold, white at 70%) + "⚡ [##] XP" (14pt Sora Semibold, orange)
  - Row 3: Difficulty Tier Indicator — dot (8pt) + label ("easy" / "moderate" / "hard") (13pt Sora Regular, white at 60%). Tappable → tooltip.
- **Size**: Full-width minus 32pt, 80pt tall

### SIA Coaching Note Card
- **Purpose**: SIA's personalized assessment of this mission's current state
- **Condition**: Only shows when mission.days_since_last_action < 7 (otherwise Stalled Mission Nudge shows instead)
- **Data source**: SIA coaching engine (contextual to this mission's progress, recent actions, patterns)
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Purple (#7F24FF) left border accent, 3pt wide, 40% opacity. This is one of the max-2 purple elements on this screen.
- **Sub-elements**:
  - "SIA" label: 11pt Sora Semibold, white at 40%, top-left
  - Note text: 15pt Sora Regular, white at 80%, 2-3 lines
- **Size**: Full-width minus 32pt, ~72pt tall
- **Variants**: Encouraging ("Strong momentum this week."), Nudging ("2 days behind schedule. Want to adjust the timeline?"), Celebrating ("On track to finish 2 weeks early.")

### Stalled Mission Nudge (Conditional)
- **Purpose**: Compassionate intervention when mission has 7+ days without progress
- **Condition**: Only shows when mission.days_since_last_action >= 7
- **Replaces**: SIA Coaching Note Card (same position in layout)
- **Visual treatment**: Uses Stalled Mission Nudge pattern from `_shared-patterns.md` — ink-brown-800, 28pt radius, amber (#F59E0B at 50%) left border, coaching message + action chips
- **Action chip behaviors**:
  - "adjust timeline" → inline date picker overlay for milestone dates
  - "reduce scope" → modal present Create Mission [15] in edit mode with SIA simplification pre-applied
  - "pause" → pauses mission, card switches to paused state, Quick Actions Menu updates
  - "archive" → confirmation bottom sheet: "Archive this mission? You'll receive [##] XP for your progress so far." Actions: "archive" (orange) + "cancel" (white at 40%)
- **Size**: Full-width minus 32pt, ~120pt tall

### Next Action Card
- **Purpose**: The single most important thing the user should do next for this mission
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Slightly elevated — warm shadow (0 2pt 12pt rgba(33,16,8,0.4)). This is the most visually prominent card on the screen after the hero ring.
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
  - Counter badge (where applicable): "5/7 done" or "2 of 4" — 12pt Sora Regular, white at 40%, right-aligned
- **Divider**: 1pt white at 5% line below each header (except last)
- **Gestures**: Tap full row → toggle expand/collapse
- **States**: Collapsed (default), expanded (content visible below)

### Expandable Section: All Actions
- **Content**: Vertical checklist of all decomposed actions for this mission
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

### Expandable Section: Mission Chain (Phase 2)
- **Purpose**: Show this mission's position in a sequential chain and what comes next
- **Condition**: Only present for missions that are part of a chain
- **Header**: "▸ Mission chain" + "2 of 4" counter badge
- **Expanded content**:
  - Chain visualization (vertical timeline, same pattern as Milestones):
    - Completed missions: green (#34A853) dot (12pt), mission name (15pt Sora Regular, white at 40%, strikethrough), XP earned (12pt Sora Regular, orange at 60%). Tap → navigate to that mission's detail.
    - Current mission: orange (#FF5E00) dot (12pt, pulsing), mission name (15pt Sora Semibold, white), mini progress ring (20pt, inline right)
    - Upcoming missions: white at 20% dot (12pt), mission name (15pt Sora Regular, white at 50%)
    - Connecting line: 2pt vertical, white at 10%
  - "What comes next" card (below chain visualization, 16pt top margin):
    - Only shows if SIA has a suggestion for the next chain step
    - Surface: ink-brown-800, 14pt radius, 16pt padding
    - Content: "SIA suggests:" (11pt Sora Semibold, white at 40%) + suggested mission name (15pt Sora Semibold, white) + type badge + domain tag
    - Actions: "accept" (15pt Sora Semibold, orange) + "modify" (15pt Sora Semibold, white at 60%) + "dismiss" (15pt Sora Semibold, white at 40%)
    - Accept → creates mission with chain link (navigates to new Mission Detail [14])
    - Modify → opens Create Mission [15] with chain context and SIA suggestion pre-filled
    - Dismiss → card fades out (SIA may suggest again later)

### Expandable Section: SIA's Reasoning
- **Content**: SIA's explanation of why the mission is structured this way and how actions connect
- **Visual**: Body text, 15pt Sora Regular, white at 80%, 16pt horizontal margins
- **Sub-elements**:
  - "why this mission matters" — 13pt Sora Semibold, white at 50%, section sub-heading
  - Reasoning text: 2-4 lines, conversational SIA voice
  - "how actions connect" — 13pt Sora Semibold, white at 50%
  - Connection text: explains cross-domain strategy

### Expandable Section: Cross-Domain Connections
- **Content**: How this mission connects to other missions across life domains
- **Each connection**: ink-brown-800 mini-card, 12pt radius, 12pt padding
  - Connected mission name: 14pt Sora Semibold, white
  - Domain tag chip(s)
  - Connection explanation: "This connects to your Finance goal because consistent exercise reduces healthcare costs." — 13pt Sora Regular, white at 60%
- **Gesture**: Tap mini-card → stack push to that mission's Mission Detail [14] (recursive navigation)

### Expandable Section: Progress Over Time
- **Content**: Line chart showing mission progress over time
- **Visual treatment**: ink-brown-800 card, 28pt radius, 24pt padding. Chart area: 180pt tall.
- **Chart specifications**:
  - X-axis: time (weeks or months depending on mission duration), 12pt Sora Regular, white at 30%
  - Y-axis: progress % (0-100), 12pt Sora Regular, white at 30%
  - Past data line: 2pt solid, orange (#FF5E00), with dot markers at data points (6pt circles, orange fill)
  - Projected line: 2pt dashed, purple (#7F24FF) at 60%. This is the second purple element on this screen (if SIA coaching note is the first).
  - Milestone markers: 8pt circles, green (#34A853) fill, on the data line at milestone dates
  - Fill area below past data: orange at 5% opacity (subtle gradient)
  - Grid lines: 1pt, white at 3%, horizontal only
- **Time range selector**: "week | month | all" chips below chart, 28pt tall, same chip style as type filter chips on Mission Board [13]
- **Size**: Full-width minus 32pt, ~240pt total (chart + selector + padding)

### Ask SIA Card
- **Purpose**: Quick shortcut to discuss this mission with SIA in chat
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Single row layout.
- **Sub-elements**:
  - Chat bubble icon: 20pt, orange (#FF5E00), left side
  - Label: "ask SIA about this mission" — 15pt Sora Semibold, white, 12pt right of icon
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 56pt tall
- **Gestures**: Tap → tab switch to SIA Chat [09] with this mission's context pre-loaded (SIA opens with "What would you like to know about [mission name]?")

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Stats row, SIA note, next action, connection cards, chart card, Ask SIA card, chain suggestion card |
| Nav bar bg (scrolled) | #0A0A0F at 80% | ink-900/80 | + backdrop-blur(16px) |
| Hero progress ring fill | #FF5E00 | orange | Primary progress |
| Hero progress ring complete | #34A853 | green | 100% state |
| Hero progress ring archived | #6B7280 | gray | Archived state |
| Hero ring track | #FFFFFF at 10% | white/10 | Inactive track |
| Hero percentage text | #FFFFFF | white | Inside ring |
| Mission name | #FFFFFF | white | Primary heading |
| Mission type badge | [metallic tone] | per type | Centered below name |
| Pin icon (unpinned) | #FFFFFF at 60% | white/60 | Default state |
| Pin icon (pinned) | #FF5E00 | orange | Active pin |
| SIA coaching note border | #7F24FF at 40% | purple/40 | Purple element 1 of 2 |
| Stalled nudge border | #F59E0B at 50% | amber/50 | Warning/attention |
| Progress chart projected line | #7F24FF at 60% | purple/60 | Purple element 2 of 2 |
| Progress chart past line | #FF5E00 | orange | User data |
| Progress chart milestones | #34A853 | green | Achievement markers |
| Next action card shadow | rgba(33,16,8,0.4) | warm shadow | Elevation |
| Checkbox completed | #FF5E00 | orange | Action completion |
| Action completed text | #FFFFFF at 40% | white/40 | Strikethrough |
| Chain dot (completed) | #34A853 | green | Past chain missions |
| Chain dot (current) | #FF5E00 | orange | Active chain mission |
| Chain dot (upcoming) | #FFFFFF at 20% | white/20 | Future chain missions |
| Difficulty dot (easy) | #34A853 | green | Low difficulty |
| Difficulty dot (moderate) | #FF5E00 | orange | Medium difficulty |
| Difficulty dot (hard) | #EF4444 | red | High difficulty |
| Milestone dot (completed) | #34A853 | green | Past milestones |
| Milestone dot (upcoming) | #FF5E00 | orange | Next milestone |
| Milestone dot (future) | #FFFFFF at 20% | white/20 | Distant milestones |
| XP badge | #FF5E00 | orange | Reward |
| Ask SIA icon | #FF5E00 | orange | CTA indicator |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| Expandable chevrons | #FFFFFF at 40% | white/40 | Toggle indicator |
| Section titles | #FFFFFF at 80% | white/80 | Secondary headings |
| Chain suggestion actions | #FF5E00 / #FFFFFF at 60% / #FFFFFF at 40% | orange / white/60 / white/40 | accept / modify / dismiss |

**60/30/10 verification**: Orange on hero ring fill, pin (active), checkboxes, XP badge, Ask SIA icon, chart past line, chain current dot, upcoming milestones, difficulty moderate dot, next action checkbox. Green on completion states (100% ring, completed milestones, completed chain dots, completed action checkmarks, difficulty easy). Purple limited to exactly 2 elements (SIA note left border, chart projected line). Amber on stalled nudge only. Red on difficulty hard dot only. Domain colors on chips only. Metallic tones on type badge. Ratio holds.

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
| Archived | Ring gray, percentage reads "[##]%", "archived" badge below ring (13pt, white at 40%) | — |

### Pin Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unpinned) | Pin outline, white at 60% | — |
| Pressed | scale(0.9), white at 40% | light impact |
| Pinned | Filled pin icon, orange (#FF5E00) | medium impact on pin |
| Pin limit reached | Button shakes (4pt horizontal oscillation, 280ms) + toast | error notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Stalled Mission Nudge Action Chips
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 10% border, white at 60% text | — |
| Pressed | scale(0.95), white at 5% bg flash | light impact |
| Focus-visible | 2pt orange ring around chip | — |

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

### Chain Mission Row (inside chain section)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (completed) | Green dot, strikethrough name, XP shown | — |
| Pressed | Row bg: white at 3% | light impact |
| Current | Orange pulsing dot, bold name, mini ring | — |
| Upcoming | White/20 dot, muted name, not tappable | — |
| Focus-visible | 2pt orange ring around row | — |

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
| Default | ink-brown-800, mission name + tags + explanation | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to Mission Board [13] or Home Screen [12] |
| Swipe right from left edge | Screen | iOS back gesture — stack pop |
| Tap | Pin button | Toggle pin state (max 3 limit) |
| Tap | Edit button | Modal present Create Mission [15] in edit mode |
| Tap | Next action checkbox | Complete action, update ring, transition to next action |
| Tap | Expandable section header | Toggle section expand/collapse |
| Tap | Action checklist checkbox | Toggle action completion |
| Tap | Domain tag chip | Stack push to relevant domain dashboard |
| Tap | Cross-domain connection card | Stack push to that mission's Mission Detail [14] |
| Tap | Chain completed mission row | Stack push to that mission's Mission Detail [14] |
| Tap | Chain "accept" | Create linked mission, navigate to new Mission Detail |
| Tap | Chain "modify" | Modal present Create Mission [15] with chain context |
| Tap | Chain "dismiss" | Card fades out |
| Tap | Stalled nudge action chip | Execute respective action |
| Tap | Ask SIA card | Tab switch to SIA Chat [09] with mission context |
| Tap | Chart time range chip | Switch chart time range (week/month/all) |
| Tap | Difficulty dot | Show tooltip with context |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Hero ring | Screen mount | Fill animates 0→current% | 520ms | ease-flow |
| Hero ring | Action completed | Fill animates old%→new% | 280ms | ease-out-soft |
| Hero ring 100% | Reaches 100% | Green color transition + glow pulse | 600ms | ease-flow |
| Mission name + badge + tags | Screen mount | Fade-in + translateY(8→0), 80ms after ring | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0), staggered | 280ms | ease-out-soft |
| SIA note / stalled nudge | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Next action card | Screen mount | Fade-in + translateY(12→0), last in stagger | 280ms | ease-out-soft |
| Section expand | Tap header | Content height 0→auto + fade-in. Chevron rotates 0→90° | 280ms | ease-out-soft |
| Section collapse | Tap header | Content height auto→0 + fade-out. Chevron rotates 90°→0 | 280ms | ease-out-soft |
| Next action transition | Current action completed | Old card slides down + fades (280ms), new card slides up from below + fades in (280ms, 160ms delay) | 440ms total | ease-out-soft |
| Nav bar title | Scroll past hero | Title opacity 0→1, bg blur 0→16px | 160ms | ease-out-soft |
| Chart line | Section expands (chart visible) | Line draws from left to right | 520ms | ease-flow |
| Projected line | After past line draws | Dashed line draws right, starting from end of past line | 280ms | ease-out-soft |
| Checklist checkbox | Tap complete | Orange fill from center + checkmark scale 0→1 | 280ms | ease-flow |
| Chain current dot | Chain section expands | Pulse animation begins (scale 1→1.15→1, 1.2s loop) | loop | ease-flow |
| Chain suggestion dismiss | Tap "dismiss" | Card height collapses + fade-out | 280ms | ease-out-soft |
| Stalled nudge chip | Tap chip | Chip scale(0.95→1), action executes | 160ms | ease-out-soft |
| Pin toggle | Tap pin button | Icon crossfade (outline↔filled), 160ms | 160ms | ease-out-soft |
| Archive confirmation | Archive chip tap | Bottom sheet slides up, 520ms ease-flow | 520ms | ease-flow |

**Screen transition**:
- **Enter**: Standard iOS stack push (slide in from right), 280ms ease-out-soft. Content stagger begins after push completes.
- **Exit (back)**: Standard iOS stack pop (slide out to right), 280ms ease-out-soft.
- **Exit (to Create Mission)**: Modal slides up from bottom, 520ms ease-flow.
- **Exit (to SIA Chat)**: Tab switch — instant, SIA chat opens with mission context message.

---

## Empty States

### Day 1 (mission just created, no actions completed)
- Hero ring: 0% (empty ring, orange at start position marker — a small dot at 12 o'clock)
- Stats row: "0 actions completed of [total]" — no streak, 0 XP, difficulty shown
- SIA coaching note: encouraging start message — "Every mission starts at 0%. Your first action is ready below."
- Next action card: first generated action from SIA
- Expandable sections: All Actions shows full unchecked list. Milestones show future dates only. Mission Chain shows chain if part of one. Progress chart shows only projected line (no past data yet). SIA reasoning available. Cross-domain connections available.

### All actions completed (100%)
- Hero ring: green (#34A853) fill, "100%" text, green glow pulse on mount
- Stats row: "[total]/[total] actions" + streak + total XP
- SIA coaching note: celebratory — "Mission accomplished. You stayed consistent for [##] days."
- Next action card: replaced by completion card — "Mission complete" heading, SIA suggestion for next steps ("Ready for a new challenge?" with link to Create Mission [15])
- Chain section: if part of chain, "What comes next" card auto-shows with next chain step suggestion
- Expandable sections: All Actions shows all checked (green). Milestones all completed (green dots). Chart shows full orange line reaching 100%.

### Archived state
- Hero ring: gray (#6B7280) fill at archived percentage, "archived" badge (13pt Sora Regular, white at 40%) centered below ring
- Stats row: shows partial XP earned — "⚡ [##] XP (partial)" in orange, "(partial)" in white at 40%
- SIA coaching note: reflective variant — "You made it to [##]%. Sometimes priorities shift — that's okay." 
- Next action card: replaced by action options card:
  - "Restart this mission" — 15pt Sora Semibold, orange, tappable (reopens mission at current progress)
  - "Delete permanently" — 15pt Sora Semibold, white at 40%, tappable (confirmation required)
- Contextual note field (below action options): "Add a note about why you archived this" — 14pt Sora Regular, white at 50% placeholder. ink-brown-800 textarea, 14pt radius, 120pt tall. User's note saved and displayed in Mission Journal [73].
- Expandable sections: mostly collapsed, chain section shows archived mission in chain context

---

## Motivation Adaptation

- **Low motivation**:
  - Only shown: Hero ring, mission name/badge/tags, next action card, Ask SIA card
  - Stats row: hidden
  - SIA coaching note: simplified, 1 line, gently encouraging
  - Stalled nudge: still shows if triggered (important for re-engagement)
  - Expandable sections: collapsed and de-emphasized (white at 30% text), only "all actions" section available
  - Minimal screen — fits in one viewport without scrolling

- **Medium motivation** (default):
  - Summary view fully visible (hero, identity, stats, SIA note/nudge, next action)
  - Expandable sections all present, collapsed by default
  - Ask SIA card visible
  - Chain section visible when applicable

- **High motivation**:
  - Summary view fully visible
  - "All actions" and "Progress over time" sections auto-expanded on mount
  - "Mission chain" auto-expanded if part of a chain
  - Additional detail visible: estimated completion date, average pace metric in stats row
  - SIA coaching note expanded (3 lines with data-specific insight)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar center title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Hero ring percentage | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Mission name | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Stats row text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Stats row XP | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| Stats row streak | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF at 70% |
| Stats row difficulty | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 60% |
| SIA coaching "SIA" label | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 40% |
| SIA coaching note text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Stalled nudge message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Stalled nudge chips | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Section eyebrow ("NEXT UP") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 40% |
| Next action text | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Next action domain/time | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Next action SIA reason | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Expandable section title | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF at 80% |
| Expandable section counter | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Action checklist text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Action checklist completed | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Milestone text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Milestone date | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Milestone status | Sora | Regular (400) | 12pt | 16pt | #34A853 or #FFFFFF at 40% |
| Chain mission name (completed) | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Chain mission name (current) | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Chain mission name (upcoming) | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| Chain XP earned | Sora | Regular (400) | 12pt | 16pt | #FF5E00 at 60% |
| Chain suggestion label | Sora | Semibold (600) | 11pt | 14pt | #FFFFFF at 40% |
| Chain suggestion name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Chain suggestion actions | Sora | Semibold (600) | 15pt | 20pt | #FF5E00 / #FFFFFF at 60% / #FFFFFF at 40% |
| SIA reasoning sub-heading | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| SIA reasoning body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Connection mission name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Connection explanation | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 60% |
| Chart axis labels | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 30% |
| Ask SIA card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Completion heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Archive badge | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Archive note placeholder | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| Archive note text | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| Archived XP "(partial)" | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (mission detail fetch) | Hero ring shows skeleton shimmer. Stats row, SIA note, and next action show skeleton states. Expandable sections hidden. | Pull-to-refresh retries. Back navigation still functional. |
| API timeout (mission data) | After 8s, displays cached data if available. If no cache, "Couldn't load mission details" message with "try again" button. | Tap "try again" retries fetch. Cached data displayed when available. |
| Action completion sync failure | Checkbox reverts to unchecked. Toast: "Couldn't save completion. Try again." Ring percentage does not update. | Tap checkbox again to retry. Queued for background sync. |
| SIA coaching note API failure | SIA Coaching Note Card shows skeleton shimmer briefly, then hides (section collapses). Other sections unaffected. | Note loads on next screen visit or pull-to-refresh. |
| Progress chart data failure | "Progress over time" expandable section shows "Chart data unavailable" placeholder inside card. Other sections unaffected. | Retries on next expand of the section. |
| Cross-domain connections failure | "Cross-domain links" section shows "Connections unavailable" placeholder. | Retries on section expand. |
| Chain data failure | "Mission chain" section shows "Chain data unavailable" placeholder. | Retries on section expand. |
| Pin toggle failure | Pin state reverts. Toast: "Couldn't update pin. Try again." | User taps pin button again. |
| Archive action failure | Confirmation sheet dismisses. Toast: "Couldn't archive. Try again." | User retries from stalled nudge or quick actions. |
| Stalled nudge actions failure | Chip reverts to default state. Toast: "Couldn't save changes. Try again." | User taps chip again. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to mission board"
  - Pin button: "Pin to home, [currently pinned/unpinned]"
  - Edit button: "Edit mission"
  - Hero progress ring: "[percentage] percent complete for [mission name]"
  - Mission type badge: "[type] mission" (e.g., "main mission")
  - Domain tag chip: "[domain name], tap to view dashboard"
  - Stats row: "[count] actions across [count] life areas, [days] day streak, [amount] XP earned, [difficulty] difficulty"
  - Difficulty dot: "[easy/moderate/hard] difficulty for your [domain] level"
  - SIA coaching note: "SIA coaching note: [note text]"
  - Stalled mission nudge: "SIA suggests adjusting this mission. Options: adjust timeline, reduce scope, pause, archive"
  - Next action checkbox: "Complete next action: [action text]"
  - Expandable section: "[section name], [collapsed/expanded], [counter if applicable]"
  - Mission chain section: "Mission chain, step [current] of [total], [collapsed/expanded]"
  - Chain completed row: "[mission name], completed, [XP] earned, tap to view"
  - Chain suggestion: "SIA suggests next in chain: [name]. Accept, modify, or dismiss."
  - Ask SIA card: "Ask SIA about this mission, opens chat"
  - Cross-domain connection card: "Connected mission: [mission name], tap to view"
  - Archive note field: "Add archive note, text field"
- **Focus order**: Back button → Pin button → Edit button → Hero progress ring → Mission name → Type badge → Domain tags (left to right) → Stats row → Difficulty dot → SIA note/stalled nudge → Stalled nudge chips (if present) → Next action card (checkbox first) → Expandable section headers (top to bottom) → Ask SIA card
- **Gesture alternatives**: iOS swipe-from-edge for back navigation. Expandable sections toggled via standard tap (no custom gestures required). Pin accessible without long-press.
- **Reduced motion**: Hero ring appears at final fill value immediately. Content entry stagger replaced with instant display. Section expand/collapse uses instant height change without animation. Chain current dot pulse disabled.

---

## Cross-References

- **Navigates to**: Create Mission [15] via modal present (edit button), SIA Chat [09] via tab switch (Ask SIA card), Mission Board [13] via stack pop (back), domain dashboards [26-36] via stack push (domain tag chips), other Mission Detail [14] instances via stack push (cross-domain connection cards, chain mission rows), Mission Detail [14] (new, from chain accept)
- **Navigates from**: Mission Board [13] via stack push, Home Screen [12] via stack push (pinned mission card)
- **Shared components with**: Home Screen [12] (Domain Tag Chip, Progress Ring large variant, Section Eyebrow, Pinned Mission Card reference), Mission Board [13] (Domain Tag Chip, Progress Ring references, Mission Card as data source, Chain Progress Bar, Difficulty Tier Indicator, Mission Type Badge), Create Mission [15] (domain chips, action list, Mission Type Badge)
- **Patterns used**: Back Button, Domain Tag Chip (from Screen 12), Progress Ring large variant, Section Eyebrow (from Screen 12), Action Card checkbox pattern (from Screen 12), Mission Type Badge (Phase 2), Chain Progress Bar (Phase 2, adapted to vertical timeline), Difficulty Tier Indicator (Phase 2), Stalled Mission Nudge (Phase 2), 8-State Interaction Model, Motion Tokens, Staggered Content Entry
- **Patterns established**: Mission Detail Screen Template (hero element → type badge → summary → expandable detail with chain section), Pin Toggle, Stalled Mission Conditional Card, Mission Chain Vertical Timeline, Archive State (gray ring, partial XP, contextual note, restart/delete options), Archive Confirmation Bottom Sheet
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals/detail`
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
| B06-F05 | critical | retention | Implement next-action completion, progress/stat updates, next-action replacement, undo, and failure states. |
| B06-F06 | major | information-architecture | Wire expanded sections, pin/unpin state, persisted detail changes, and accessible disclosure behavior. |
| B06-F07 | major | mobile-ergonomics | Wrap the 28px visual checkbox in a 44x44 labeled touch target with focus and completion states. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

