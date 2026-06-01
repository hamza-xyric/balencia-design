# Screen Design: Initial Plan Summary

**Screen**: 08 of 73
**File**: 08-initial-plan-summary.md
**Register**: Transitional (Product Mode density, Brand Mode emotional impact)
**Primary action**: Accept plan and start journey (tap "start your journey")
**Tab**: None (final onboarding screen, pre-main-app)
**Navigation**: Crossfade from SIA Onboarding Conversation [07]. "Start your journey" triggers root reset — onboarding stack is removed, main tab navigator loads with Home Screen [12] as the Today tab.

---

## Purpose

This is SIA's "pitch" — the moment the user sees their entire life plan laid out, organized, and actionable for the first time. The screen must make the user feel excited and believe their goals are achievable. SIA has taken the user's conversational input and transformed it into a structured plan with domain assignments, decomposed actions, milestones, and cross-domain connections. The user can accept the plan as-is or customize individual elements. This is the last screen before the main app experience begins. RPG framing introduces the gamification layer: Level 1, 0 XP — the journey starts here.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA's greeting + "here's your plan." heading — the big reveal
2. RPG starting status — Level 1, 0 XP (the beginning of the journey)
3. Goal plan cards — organized by domain, each with actions and milestones
4. Cross-domain connections — subtle links between goals
5. "Start your journey" CTA — the most important button in the entire app
6. "Customize" secondary link — for users who want to tweak before starting

**User flow**:
- **Arrives from**: SIA Onboarding Conversation [07] via crossfade (SIA says "let me build your plan")
- **Primary exit**: Home Screen [12] (Batch 3) via root reset ("Start your journey" — onboarding stack removed, tab navigator loads)
- **Secondary exit**: Inline edit mode (tap "customize" or edit icons on individual goals)

---

## Layout

**Scroll behavior**: ScrollView (content will exceed viewport — multiple goal cards + actions + CTA)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│  ┌─┐                       │
│  │S│  "here's your plan."  │  ← SIA avatar + heading
│  └─┘                       │
│                             │  ← 8pt gap
│  SIA: "I've broken down    │
│  your goals into daily     │  ← SIA coaching note
│  actions. Let's go."       │
│                             │  ← 24pt gap
│  ┌─────────────────────┐   │
│  │ LEVEL 1 · 0 XP      │   │  ← RPG status bar
│  │ ▓░░░░░░░░░░░░░░░░░░ │   │     (XP progress)
│  └─────────────────────┘   │
│                             │  ← 24pt gap
│  ┌─────────────────────┐   │
│  │ 🔴 Run a half       │   │
│  │    marathon          │   │  ← Goal card 1
│  │ ─────────────────── │   │     (domain color left bar)
│  │ □ Run 3x/week       │   │
│  │ □ Build to 5K       │   │  ← Expandable actions
│  │ □ Register for race │   │
│  │ ─────────────────── │   │
│  │ ↔ connects to       │   │  ← Cross-domain link
│  │   nutrition          │   │
│  └─────────────────────┘   │
│                             │  ← 16pt gap
│  ┌─────────────────────┐   │
│  │ 💚 Save $5,000      │   │
│  │ ─────────────────── │   │  ← Goal card 2
│  │ □ Track expenses     │   │
│  │ □ Set budget         │   │
│  │ □ Auto-save $200/mo  │   │
│  └─────────────────────┘   │
│                             │  ← 16pt gap
│  ┌─────────────────────┐   │
│  │ 🟣 Read 20 books    │   │  ← Goal card 3
│  │ ─────────────────── │   │
│  │ □ 30 min/day        │   │
│  │ □ 2 books/month     │   │
│  └─────────────────────┘   │
│                             │  ← 32pt gap
│  ┌───────────────────┐     │
│  │  start your journey │     │  ← Primary CTA, orange pill
│  └───────────────────┘     │
│                             │  ← 16pt gap
│       "customize"           │  ← Secondary text link
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **SIA Header** — ~80pt
   - Purpose: SIA presents the plan with a personal message
   - Content: SIA avatar (small) + heading + coaching note

3. **RPG Status Bar** — 64pt + 24pt margin = 88pt
   - Purpose: Introduce the RPG framing — this is where the journey begins
   - Content: Level badge + XP bar (empty at 0)

4. **Goal Plan Cards** — variable (each card ~160-220pt depending on actions)
   - Purpose: Show the structured plan, one card per goal
   - Content: Goal name, domain tag, decomposed actions, milestones, cross-domain links

5. **CTA Area** — 56pt button + 16pt gap + 20pt customize link + 48pt bottom padding = 140pt
   - Purpose: Accept and begin
   - Content: "start your journey" orange pill + "customize" text link

---

## Components

### SIA Header
- **Purpose**: SIA introduces the plan — personal, exciting, achievable
- **Data source**: AI-generated summary based on onboarding conversation
- **Visual treatment**: SIA Avatar (Small, 24pt, left) + heading "here's your plan." (20pt Sora Bold, white) on the same line, vertically centered. Below (8pt gap): SIA coaching note in SIA Message Bubble style but without the full bubble treatment — just text. "I've broken down your goals into daily actions across [N] life areas. Let's go." (15pt Sora Regular, white at 70%). Left-aligned, 16pt margin.
- **Variants**: Copy adapts based on number of goals and domains selected
- **Gestures**: None
- **Size**: Full-width - 32pt (16pt margins) x ~80pt

### RPG Status Bar
- **Purpose**: Introduce the gamification layer — the user starts at Level 1, 0 XP
- **Data source**: Static (always Level 1, 0 XP for new users)
- **Visual treatment**: Full-width - 32pt (16pt margins). Height: 64pt. Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Content: "level 1" badge (12pt Sora Semibold, uppercase, Burnt Orange, +0.12em tracking) on the left. "0 XP" (12pt Sora Semibold, white at 50%) on the right. Below text row: XP progress bar (full-width inside card minus padding, 8pt tall, --r-pill corners). Track: white at 8%. Fill: Burnt Orange (#FF5E00), currently at 0% width (invisible — the journey hasn't started). 16pt padding inside card.
- **Variants**: None (always 0 on this screen)
- **Gestures**: None (display only on this screen — tappable on future screens → RPG Character)
- **Size**: (screen width - 32pt) x 64pt

### Goal Plan Card
- **Purpose**: Display one goal with its structured breakdown — the core content of this screen
- **Data source**: AI-generated from onboarding conversation
- **Visual treatment**: Full-width - 32pt (16pt margins). Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Left border accent: 4pt in the goal's primary domain color (extends full height of card, inside the corner radius). Padding: 16pt all sides (20pt left to account for the domain color bar).
  - **Goal name row**: Domain tag chip (domain color bg at 20%, domain color text, 11pt Sora Semibold, --r-sm corners, 24pt height, 8pt horizontal padding) + goal name (17pt Sora Semibold, white) on the same line. Edit icon (pencil, 16pt, white at 30%) right-aligned.
  - **Actions list**: Below goal name (12pt gap). Each action: unchecked circle (18pt, white at 20% border, no fill) + action text (14pt Sora Regular, white at 80%). 8pt gap between actions. Shows 3 actions by default. If more exist, "and [N] more" link (13pt Sora Regular, orange) expands the list.
  - **Milestone row** (optional): Below actions (12pt gap). Small timeline: 2-3 milestone dots connected by a line. Dot: 8pt, white at 20% outline. Line: 1pt, white at 10%. Label below each dot: milestone name (11pt Sora Regular, white at 40%).
  - **Cross-domain connection** (optional): Below milestones (8pt gap). "↔ connects to [domain]" text (12pt Sora Regular, white at 40%). Domain name in domain color. Tapping opens a tooltip or SIA explains the connection.
- **Variants**: Collapsed (3 actions visible, "and N more"), Expanded (all actions visible), Editing (inline edit mode)
- **Gestures**: Tap edit icon → inline edit. Tap "and N more" → expand. Tap cross-domain link → SIA tooltip. Tap action checkbox → toggle (not functional until plan is accepted, shows preview of interaction).
- **Size**: (screen width - 32pt) x auto (160-220pt depending on content)

### Domain Tag Chip
- **Purpose**: Identify which life domain a goal belongs to
- **Data source**: AI-assigned domain from onboarding
- **Visual treatment**: Pill shape (--r-sm, 10pt). Height: 24pt. Padding: 8pt horizontal. Background: domain color at 15% opacity. Text: domain name in domain color (11pt Sora Semibold). No border.
- **Domain colors**: Fitness (#EF4444), Nutrition (#84CC16), Finance (#10B981), Career (#6366F1), Relationships (#EC4899), Spirituality (#A855F7), Learning (#06B6D4), Creativity (#F59E0B), Wellbeing (#14B8A6).
- **Variants**: Each domain has its color. Multi-domain goals show 2-3 chips in a row with 4pt gaps.
- **Gestures**: None (display only on this screen)
- **Size**: auto-width x 24pt

### Start Journey CTA
- **Purpose**: Accept the plan and enter the main app — the single most important CTA in the onboarding flow
- **Data source**: Triggers root reset (onboarding → main app transition)
- **Visual treatment**: Reuse Brand CTA Button pattern. Text: "start your journey". Full-width - 32pt (16pt margins). 56pt height. Orange pill. Slight enhancement: subtle orange glow behind the button (--glow-orange at 20%) to make it feel more significant than a standard CTA.
- **Variants**: Default (with glow), Pressed, Loading, Success (green glow → transitions to main app)
- **Gestures**: Tap to accept plan and begin
- **Size**: (screen width - 32pt) x 56pt

### Customize Link
- **Purpose**: Allow users to adjust the plan before starting (for high-engagement users)
- **Data source**: Toggles inline editing mode
- **Visual treatment**: "customize" — 15pt Sora Semibold, Burnt Orange (#FF5E00), center-aligned. No underline. 44pt touch target height.
- **Variants**: Default, Pressed (opacity 40%, scale 0.98)
- **Gestures**: Tap to toggle edit mode on all goal cards
- **Size**: auto-width x 44pt touch target

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Plan heading | Sora | 700 (Bold) | 20pt | 26pt | White #FFFFFF | "here's your plan." — sentence case, brand period |
| SIA coaching note | Sora | 400 (Regular) | 15pt | 22pt | White at 70% | Warm, personal |
| RPG level label | Sora | 600 (Semibold) | 12pt | 14pt | #FF5E00 | "LEVEL 1" — uppercase, tracking |
| RPG XP text | Sora | 600 (Semibold) | 12pt | 14pt | White at 50% | "0 XP" |
| Goal name | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | Quest title |
| Domain tag chip | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] | Domain name |
| Action item text | Sora | 400 (Regular) | 14pt | 20pt | White at 80% | Action description |
| "and N more" link | Sora | 400 (Regular) | 13pt | 18pt | #FF5E00 | Expandable |
| Milestone label | Sora | 400 (Regular) | 11pt | 14pt | White at 40% | Milestone name |
| Cross-domain text | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | Connection note |
| Cross-domain name | Sora | 400 (Regular) | 12pt | 16pt | [domain color] | Linked domain |
| CTA text | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "start your journey" |
| Customize link | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "customize" |
| Edit icon | — | — | 16pt | — | White at 30% | Pencil icon |

---

## Composition & Visual Hierarchy

**Squint test**:
- SIA header with the heading "here's your plan." reads as the page title
- RPG status bar is a distinct horizontal band with the orange "LEVEL 1" label
- Goal cards form a clear vertical stack — each anchored by a domain color left bar
- The orange CTA at the bottom is the most prominent interactive element, with a glow to elevate it further
- "customize" link is visually secondary, de-emphasized but accessible
- Cross-domain connections are quiet — present but not competing with the cards

**Spacing breakdown (8pt grid)**:
- Status bar to SIA header: 24pt (--s-5)
- SIA avatar + heading to coaching note: 8pt (--s-2)
- Coaching note to RPG status bar: 24pt (--s-5)
- RPG status bar to first goal card: 24pt (--s-5)
- Between goal cards: 16pt (--s-4)
- Last goal card to CTA: 32pt (--s-6)
- CTA to customize link: 16pt (--s-4)
- Customize link to bottom: 48pt (--s-7)
- Card internal: 16pt padding (--s-4)
- Goal name to first action: 12pt (--s-3)
- Between actions: 8pt (--s-2)
- Actions to milestones: 12pt (--s-3)
- Milestones to cross-domain: 8pt (--s-2)

**Z-layers**:
- z-0: ink-900 background
- z-10: Goal cards, RPG status bar
- z-20: CTA button (with glow)
- z-60: Edit mode inline controls (if customize tapped)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| SIA avatar | #FF5E00 bg, white symbol | brand-orange | SIA identity |
| SIA avatar glow | rgba(127,36,255,0.2) | brand-purple at 20% | AI indicator |
| Heading text | #FFFFFF | white | "here's your plan." |
| Coaching note | rgba(255,255,255,0.7) | white at 70% | Secondary text |
| RPG card bg | #211008 | ink-brown-800 | Surface |
| RPG level label | #FF5E00 | brand-orange | Gamification accent |
| RPG XP bar track | rgba(255,255,255,0.08) | white at 8% | Empty track |
| RPG XP bar fill | #FF5E00 | brand-orange | Progress (0% here) |
| Goal card bg | #211008 | ink-brown-800 | Surface |
| Goal card left border | [domain color] | per domain | Domain identity bar |
| Domain tag chip bg | [domain color at 15%] | per domain | Identification |
| Domain tag chip text | [domain color] | per domain | Identification |
| Goal name | #FFFFFF | white | Primary text |
| Action checkbox | rgba(255,255,255,0.2) | white at 20% | Unchecked |
| Action text | rgba(255,255,255,0.8) | white at 80% | Action description |
| "and N more" | #FF5E00 | brand-orange | Tappable expand |
| Milestone dot | rgba(255,255,255,0.2) | white at 20% | Timeline |
| Milestone line | rgba(255,255,255,0.1) | white at 10% | Timeline connector |
| Milestone label | rgba(255,255,255,0.4) | white at 40% | Label |
| Cross-domain text | rgba(255,255,255,0.4) | white at 40% | Connection |
| Cross-domain name | [domain color] | per domain | Linked domain |
| CTA bg | #FF5E00 | brand-orange | Primary action |
| CTA glow | rgba(255,94,0,0.2) | brand-orange at 20% | Elevated emphasis |
| Customize link | #FF5E00 | brand-orange | Secondary action |

**60/30/10 verification**: Orange on CTA (with glow), RPG level label, XP bar, "and N more" links, customize link, SIA avatar — clearly the 60% driver. Domain colors on tag chips and card left borders (identification only). Purple on SIA avatar glow ring only (~1 element). No green in default state (XP bar is empty). Green will flash on CTA success state. Ratio holds.

---

## Interaction States

### Goal Plan Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Card with actions list, domain bar | — |
| Pressed | Entire card: bg lightens slightly, scale(0.99) | — |
| Expanded (all actions visible) | "and N more" replaced by full action list, card height grows with animation | Light impact |
| Editing | Action items become editable text fields, domain tag becomes a dropdown chip, checkboxes hidden | — |

### Action Checkbox (Preview)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 18pt circle, white 20% border | — |
| Pressed | Circle fills with orange at 20% | Light impact |
| Note | Checkboxes are a preview interaction on this screen — tapping shows the interaction pattern but doesn't persist (plan not yet accepted) | — |

### Start Journey CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "start your journey", subtle orange glow behind | — |
| Pressed | Darker orange, scale(0.97), glow brightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | White spinner, glow pulses | — |
| Success | Glow shifts to green (600ms), then screen transitions to Home [12] | Success notification (strong) |

### Edit Icon (per Goal Card)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Pencil icon, 16pt, white at 30% | — |
| Pressed | White at 60%, scale(0.9) | Light impact |
| Active (editing) | Pencil becomes checkmark, white at 60% | — |

### Customize Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "customize" in orange | — |
| Pressed | Opacity 40%, scale(0.98) | Light impact |
| Active | Text changes to "done editing", toggles all cards to edit mode | Light impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | "start your journey" CTA | Accept plan, transition to main app |
| Tap | "customize" link | Toggle all goal cards to edit mode |
| Tap | "and N more" on a card | Expand to show all actions |
| Tap | Edit icon on a card | Toggle that card's edit mode |
| Tap | Cross-domain connection | Show tooltip with SIA's explanation |
| Tap | Action checkbox (preview) | Brief check animation, reverts (preview only) |
| Scroll | Screen content | Scroll through goal cards |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount (crossfade from [07]) | Staggered fade-in: SIA header (0ms), RPG bar (120ms), goal cards (240ms each), CTA (last, 80ms after last card). All: opacity 0→1, translateY(16→0). | 280ms each (--dur-base) | ease-out-soft |
| RPG XP bar | Screen mount | Bar track fades in, then a brief "ready" pulse (orange glow travels across empty track, 600ms) | 600ms | ease-flow |
| Goal card domain bar | Screen mount | Domain color bar slides down from 0 height to full card height | 280ms (--dur-base) | ease-out-soft |
| "and N more" expand | Tap | Card height grows smoothly, new actions fade in staggered (80ms each) | 280ms (--dur-base) | ease-out-soft |
| CTA glow | Continuous (idle) | Subtle pulse: glow opacity 15%→25%→15%, looping | 3000ms | ease-in-out |
| Transition to Home | CTA success | CTA glow flashes green (600ms). Screen fades out (280ms). Main app tab navigator fades in (280ms). Total 1200ms transition. | 1200ms (--dur-flow) | ease-flow |
| Edit mode enter | Customize tap | Action checkboxes crossfade to hidden, text fields gain focus indicators, edit icon morphs to checkmark | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Crossfade from SIA Onboarding [07] (signature transition, 1200ms, ease-flow)
- **Exit**: Root reset — onboarding stack is destroyed, main tab navigator loads with a crossfade (1200ms, ease-flow). The user lands on Home Screen [12] in the Today tab.

---

## Empty States

### Day 1 (new user)
This IS the day 1 state. SIA has generated a plan based on the onboarding conversation. There are always goals to show because the onboarding conversation collected them. Minimum: 1 goal with 3 actions. Typical: 2-4 goals across 2-3 domains.

If somehow the user provided no goals during onboarding (edge case — skipped everything), SIA generates a starter plan:
- "Here's a starting point. I'll learn more about you as we go."
- 1-2 suggested goals based on domain selections
- "start your journey" CTA still present

### Established user (zero state)
N/A — this screen is seen once during onboarding and never revisited.

---

## Motivation Adaptation

- **Low motivation**: Not yet detected (first use). If applicable, show fewer actions per goal (2 instead of 3-5), simpler milestones, more SIA encouragement in coaching note.
- **Medium motivation**: Default for all new users. 3-5 actions per goal, standard milestone display, balanced coaching note.
- **High motivation**: Show all actions expanded by default, detailed milestones with dates, cross-domain connections prominent.

Since motivation tier hasn't been established yet, all new users see the medium motivation default.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Plan data fails to load | Screen shows SIA header with message: "I'm having trouble loading your plan. Give me a moment." + "retry" text link (orange, centered, 44pt touch target); RPG bar and goal cards replaced by centered loading spinner | Tap "retry" re-fetches plan data from the API |
| "Start your journey" CTA fails (root reset error) | CTA reverts from loading to default; toast: "Something went wrong. Please try again." (ink-brown-800 bg, --r-md, auto-dismiss 4s) | User taps CTA again to retry |
| Inline edit save fails | Edited field reverts to previous value with a red border flash (160ms); toast: "Could not save changes. Try again." | User re-enters edit and resubmits |
| Goal card expand ("and N more") fails | Card stays collapsed; "and N more" link shows error state briefly (red text flash, 280ms) then reverts to orange | Tap again to retry expansion |
| Network offline on mount | Screen displays cached plan data (if available) with offline banner below SIA header: "Offline — showing your saved plan" (full-width, 36pt, ink-brown-800 bg, white at 50%); CTA active (will queue start action) | Plan acceptance queues locally and syncs when online |
| Cross-domain tooltip load fails | Tooltip area shows "Could not load insight" (13pt, white at 40%) | User can tap again or proceed without tooltip |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "here's your plan" heading on mount, followed by SIA's coaching note
- Focus order: SIA avatar + heading -> SIA coaching note -> RPG status bar -> Goal card 1 (goal name, then actions, then cross-domain link) -> Goal card 2 -> ... -> "start your journey" CTA -> "customize" link
- RPG status bar: accessible label "Level 1, 0 XP. Experience bar empty."
- Goal plan cards: accessible role "group"; label includes goal name and domain (e.g., "Run a half marathon, Fitness domain")
- Action items within cards: each action read as "Action: [text], not started"
- Edit icon on goal cards: accessible label "Edit [goal name]"
- "and N more" links: accessible label "Show [N] more actions"
- Cross-domain connection: accessible label "Connects to [domain name]. Double tap for details."
- "start your journey" CTA: accessible hint "Accepts your plan and opens the main app"
- Domain tag chips: accessible role "text"; color communicated via domain name label
- Reduced motion: skip CTA glow pulse, RPG bar ready pulse, and domain bar slide-down; show all elements immediately on mount

---

## Cross-References

- **Navigates to**: Screen [12] — Home Screen (Batch 3) via root reset ("start your journey" CTA)
- **Navigates from**: Screen [07] — SIA Onboarding Conversation via crossfade
- **Shared components with**: Screen [07] — SIA Onboarding (SIA Avatar Small, Domain Tag Chip). Screen [13] — Goals List (Batch 3, Goal Plan Card pattern reused for goal cards). Screen [14] — Goal Detail (Batch 3, action items pattern reused).
- **Patterns used**: SIA Avatar (Small) from Screen [07], Domain Tag Chip from Screen [07], Brand CTA Button from Batch 1
- **Patterns established**: **Goal Plan Card** — ink-brown-800 bg, --r-xl corners, 4pt domain color left bar, goal name + domain tag row, expandable action list (circles + text), optional milestone timeline, optional cross-domain connection. **RPG Status Bar** — ink-brown-800 card, level label (orange uppercase eyebrow) + XP text, 8pt progress bar beneath, --r-xl corners. **SIA Greeting Card** — SIA avatar (small) + heading + coaching note text, left-aligned, used here and adapted for Home Screen [12] in Batch 3. **Domain Tag Chip** — pill shape, domain color bg at 20%, domain color text, 24pt height, used across all domain-tagged screens going forward.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-03.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/auth/initial-plan`
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
| B03-F05 | critical | conversion | Wire plan acceptance to Today and make customize/edit controls functional. |
| B03-F06 | major | product-sense | Keep the plan consistent with onboarding inputs or explain why SIA changed a life area. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

