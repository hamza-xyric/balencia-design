# Balencia Screen Design Session

You are designing mobile screens for **Balencia**, a premium AI life coaching app built with React Native. This is a design drafting session — you will create detailed system design drafts for the next batch of screens following an 8-phase methodology.

**Product DNA**: SIA (AI coach) is central. RPG gamification (XP, levels, quests). 9 life domains. Cross-domain life correlation engine. Progressive disclosure. Premium, cinematic, dark-first aesthetic.

---

## Step 1: Detect Progress

Read the progress tracker and shared patterns:
- Read `/Users/hamza/yHealth/Screen-Drafts/_progress.md`
- Read `/Users/hamza/yHealth/Screen-Drafts/_shared-patterns.md`

If `_progress.md` shows all screens as `not-started`, this is the first session.

Report:
```
Progress: X / 43 screens completed.
Starting Batch Y.
```

---

## Step 2: Identify This Session's Screens

From the progress tracker, find the next screens with status `not-started` following the batch assignments in the Batch column. These are this session's screens.

Display:
```
This session's batch (Batch Y — [theme]):
1. [##] [Screen Name]
2. [##] [Screen Name]
3. [##] [Screen Name]
4. [##] [Screen Name]
5. [##] [Screen Name]
```

**Ask the user to confirm** the batch before proceeding. The user may want to adjust, skip, or reorder.

Update their status to `in-progress` in the tracker.

---

## Step 3: Load Context

Read these documents once (not per screen):

**Primary spec** (read only the sections for this batch's screens):
- `/Users/hamza/yHealth/Balencia-Screen-Specifications.md`

**Brand and design system**:
- `/Users/hamza/yHealth/Balencia-Brand-Guidelines-v2.md`
- `/Users/hamza/yHealth/Balencia-Design-Direction-v2.md`

**Design methodology**:
- `/Users/hamza/yHealth/yhealth-app/.claude/skills/screen-design.md`

**UI/UX rationale** (for deep context on decisions):
- `/Users/hamza/yHealth/Balencia-UIUX-Compiled-Final-v3.md`

**Previously established patterns**:
- `/Users/hamza/yHealth/Screen-Drafts/_shared-patterns.md`

Also read any previously completed screen drafts that this batch's screens navigate to or from, so cross-references are accurate.

---

## Step 4: Pre-Design Batch Analysis

Before designing any screen, analyze the batch as a group (10-15 lines):

1. **Navigation flow**: How do these screens connect to each other and to previously designed screens? Map the flow.
2. **Shared components**: What UI elements appear across multiple screens in this batch? (Headers, cards, buttons, input patterns, domain tags)
3. **Cross-screen consistency**: What visual patterns must be maintained from prior batches?
4. **New patterns to establish**: What new reusable patterns will this batch introduce? (Check `_shared-patterns.md` for placeholders waiting to be filled.)
5. **Design register**: Which screens are Brand Mode (marketing/onboarding) vs Product Mode (authenticated app)?

Present the analysis and get user confirmation before proceeding to individual screens.

---

## Step 5: Design Each Screen

For each screen, follow the **8-phase gated process**. Announce which phase you are in as you work.

### Phase 1: Purpose
- What is this screen's single most important job?
- What user problem does it solve?
- What is the primary action the user should take?
- What data sources does it need?
- Design register: **Product Mode** for all authenticated screens (compact type, dense info). **Brand Mode** for splash/onboarding/marketing screens only.

### Phase 2: Information Architecture
- List all content items this screen must display (prioritized from spec)
- Define the visual hierarchy: what do users see first, second, third?
- User flow: where did they come from? Where do they go next?
- Navigation method: tab bar visible? Stack push? Modal? Overlay?

### Phase 3: Layout (Mobile-Native)
This is React Native. No CSS grid. Design for:
- **Screen frame**: 375pt width (iPhone SE baseline) to 428pt (iPhone 15 Pro Max)
- **Safe areas**: Status bar (44pt top), home indicator (34pt bottom), bottom tab bar (48-56pt)
- **Scroll behavior**: ScrollView (short content), FlatList (long lists), SectionList (grouped lists)
- **Vertical stack**: What components stack top to bottom?
- **Horizontal elements**: Full-width, side-by-side (2-col max), or horizontal scroll (ScrollView horizontal)?
- **Touch targets**: Every interactive element minimum 44x44pt

**Include an ASCII wireframe** showing major zones on a mobile frame:
```
┌─────────────────────────┐
│  Status Bar (44pt)      │
├─────────────────────────┤
│                         │
│  [Zone descriptions     │
│   with approximate      │
│   proportions]          │
│                         │
├─────────────────────────┤
│  Tab Bar (48pt)         │
└─────────────────────────┘
```

### Phase 4: Typography (Mobile Scale)
Apply Sora at mobile-appropriate sizes:
- Screen title: 24-28pt Sora Bold
- Section heading: 18-20pt Sora Semibold
- Card title: 16-17pt Sora Semibold
- Body: 15-16pt Sora Regular
- Caption/meta: 12-13pt Sora Regular
- Eyebrow: 11-12pt Sora Semibold, uppercase, +0.12em tracking

Rules:
- Sentence case everywhere. No Title Case on UI labels/buttons/tabs.
- No exclamation marks in UI copy.
- Maximum 2 accent words per screen with brand orange (#FF5E00).
- Define which text elements use which scale level.

### Phase 5: Composition & Visual Hierarchy
**Squint test**: If you blur your eyes, can you still identify:
- The primary CTA? (Should be most visually prominent — orange, large)
- Headings vs body? (Distinguished by weight 600-700, not just size)
- Grouped elements vs section breaks? (Tight within groups 8-16pt, generous between 24-48pt)
- No two adjacent elements should share the same visual weight.

**Spacing rule**: All values on 8pt grid (4, 8, 12, 16, 24, 32, 48, 64pt).

**Z-layer system**:
- z-0: Screen background (ink-900 #0A0A0F)
- z-10: Card surfaces (ink-brown-800 with glassmorphism)
- z-20: Elevated cards (pressed/active, +warm shadow)
- z-30: Sticky headers (backdrop-blur)
- z-40: Bottom sheets, dropdowns
- z-50: Modals, full-screen overlays
- z-60: Toasts, snackbars

### Phase 6: Color Map
Map the 60/30/10 rule to **this specific screen**:
- **Orange (#FF5E00) — 60%**: Which specific elements on this screen are orange? (Primary CTA, active states, progress fills, tab indicator...)
- **Green (#34A853) — 30%**: Which specific elements? (Success states, completion indicators, health metrics, positive trends...)
- **Purple (#7F24FF) — 10%**: Which specific elements? (SIA/AI indicators only — max 1-2 elements on this screen)
- **Domain colors**: Only on domain tag chips and domain-specific indicators. Never on actions or UI chrome.
- **Neutrals**: Background (ink-900), card surfaces (ink-brown-800), text (white at 100%/70%/50% opacity)

Verify: purple on no more than 1-2 elements. Domain colors on tags only.

### Phase 7: Interaction States & Gestures
For **every interactive element** on this screen, define all 8 states:
1. **Default** — resting appearance
2. **Hover** — N/A on mobile touch (define for accessibility devices)
3. **Active/Pressed** — scale(0.97), slight background darken
4. **Focus-visible** — orange ring, 2pt, offset 2pt
5. **Disabled** — 0.5 opacity, no touch response
6. **Loading** — skeleton shimmer or inline spinner
7. **Error** — red border accent, error message with role="alert"
8. **Success** — brief green glow flash (600ms)

**Gesture map** (if applicable):
- Swipe right: [action]
- Swipe left: [action]
- Long-press: [action]
- Pull-to-refresh: [yes/no]
- Pinch: [action if applicable]

**Haptic feedback points**: List which interactions trigger which haptic type (light/medium/heavy impact, success/error notification).

### Phase 8: Self-QA

Before finalizing, verify this checklist:
- [ ] All colors from brand palette (no strays, no hardcoded values outside the system)
- [ ] 60/30/10 ratio holds visually for this screen
- [ ] Sora only, correct mobile scale (no web-sized type)
- [ ] All spacing values on 8pt grid (4, 8, 12, 16, 24, 32, 48, 64pt)
- [ ] Every interactive element has all 8 states defined
- [ ] Touch targets minimum 44x44pt on all interactive elements
- [ ] Dark mode is the primary design (ink-900 background)
- [ ] Mobile-native patterns used (no sidebar, no hover-dependent interactions, no CSS grid)
- [ ] Cross-references to related screens are present and accurate
- [ ] Navigation pattern specified (tab switch, stack push, modal present, etc.)
- [ ] Empty states described (what shows with no data? Day 1 experience?)
- [ ] Motivation-tier adaptation noted (low/medium/high data density)
- [ ] ASCII wireframe included showing major layout zones
- [ ] No web-isms: no "sidebar", no "footer", no "responsive breakpoints"

---

## Output Format Per Screen

Save each screen to its own file at `/Users/hamza/yHealth/Screen-Drafts/[##-filename].md`:

```markdown
# Screen Design: [Name]

**Screen**: [##] of 73
**File**: [##-filename.md]
**Register**: Product Mode / Brand Mode
**Primary action**: [verb + noun]
**Tab**: [Today / SIA / Goals / Me / None (pre-auth)]
**Navigation**: [Stack depth from tab root, entry points, exit points]

---

## Purpose

[2-3 sentences: what this screen does, what problem it solves, why it matters to the user. Reference SIA's role if applicable.]

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. [First thing — most prominent]
2. [Second thing]
3. [Third thing]
...

**User flow**:
- **Arrives from**: [Screen name(s) + navigation method]
- **Primary exit**: [Screen name + navigation method]
- **Secondary exits**: [Screen names + navigation methods]

---

## Layout

**Scroll behavior**: [ScrollView / FlatList / SectionList / None (fixed)]
**Tab bar visible**: [Yes / No]

### ASCII Wireframe

[ASCII art showing the mobile screen with major zones, approximate proportions, and key elements labeled]

### Component Stack (top to bottom)

1. **[Component name]** — [height estimate]pt
   - Purpose: [what it does]
   - Content: [what it shows]
   
2. **[Component name]** — [height estimate]pt
   ...

---

## Components

### [Component Name]
- **Purpose**: [what it does]
- **Data source**: [API endpoint, local state, or static]
- **Visual treatment**: [card style, list row, floating button, etc.]
- **Variants**: [if any — e.g., empty, loading, populated, error]
- **Gestures**: [tap, swipe, long-press, etc.]
- **Size**: [width x height, or "full-width x auto"]

[Repeat for each component]

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| [Element] | [Hex] | [Name] | [Role in 60/30/10] |
| ... | ... | ... | ... |

**60/30/10 verification**: [Brief statement confirming ratio holds]

---

## Interaction States

### [Interactive Element Name]
| State | Visual | Haptic |
|-------|--------|--------|
| Default | [description] | — |
| Pressed | [description] | light impact |
| Focus-visible | [description] | — |
| Disabled | [description] | — |
| Loading | [description] | — |
| Error | [description] | error notification |
| Success | [description] | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| [gesture] | [element] | [what happens] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| [element] | [trigger] | [what animates] | [token] | [curve] |

**Screen transition**:
- **Enter**: [animation description]
- **Exit**: [animation description]

---

## Empty States

### Day 1 (new user)
[What shows when there's no data. How SIA fills the void. Never feels empty.]

### Established user (zero state)
[What shows when a normally-populated section has no current items. E.g., "all tasks done today."]

---

## Motivation Adaptation

- **Low motivation**: [What changes — fewer items, simpler UI, gentler SIA tone]
- **Medium motivation**: [Default experience]
- **High motivation**: [What additional detail appears — more data, richer cards, deeper stats]

---

## Cross-References

- **Navigates to**: [Screen ## — name] via [method], [Screen ## — name] via [method], ...
- **Navigates from**: [Screen ## — name] via [method], ...
- **Shared components with**: [Screen ## — name] (component name), ...
- **Patterns used**: [Reference to _shared-patterns.md sections]
- **Patterns established**: [New patterns this screen introduces, to be added to _shared-patterns.md]
```

---

## Step 6: Post-Batch Review

After all screens in the batch are drafted:

### 6a. Cross-Screen Consistency Check
Review all drafts from this batch together:
- Are navigation patterns consistent between connected screens?
- Are shared components (headers, cards, buttons) described identically?
- Do domain colors appear consistently?
- Are SIA presence patterns consistent?
- Do the ASCII wireframes show consistent spacing and component sizing?

Flag and fix any inconsistencies before finalizing.

### 6b. Update Shared Patterns
Add any new reusable patterns to `/Users/hamza/yHealth/Screen-Drafts/_shared-patterns.md`:
- New component patterns (with description and visual spec)
- New layout templates
- New navigation patterns
- New interaction/gesture patterns
- Fill in any "To be established" placeholders that this batch addresses

### 6c. Update Progress Tracker
In `/Users/hamza/yHealth/Screen-Drafts/_progress.md`:
- Mark all batch screens as `done` with today's date
- Update the "Last updated" date
- Update the "Completed: X / 43" count
- Clear the "Current batch" field

### 6d. Session Report
```
Batch [N] complete: [theme]
━━━━━━━━━━━━━━━━━━━━━━━━━━
Screens drafted:
  [##] [Name] ✓
  [##] [Name] ✓
  [##] [Name] ✓
  [##] [Name] ✓
  [##] [Name] ✓

New shared patterns established:
  - [pattern name]: [one-line description]
  - ...

Progress: X / 43 screens (Y% complete)

Next session (Batch [N+1] — [theme]):
  [##] [Name]
  [##] [Name]
  [##] [Name]
  [##] [Name]
  [##] [Name]
```

---

## Quality Reminders

### This is mobile-native design
- React Native components: View, ScrollView, FlatList, TouchableOpacity, SafeAreaView, StatusBar
- No CSS grid, no sidebar, no hover states as primary interaction, no responsive breakpoints
- Bottom tab bar always present on authenticated screens
- Think in terms of React Navigation: TabNavigator, StackNavigator, Modal

### Premium quality bar
- Each draft must be detailed enough to hand to a Figma designer or React Native developer
- Include specific spacing values (in pt, on 8pt grid), specific typography tokens, specific color hex values
- ASCII wireframes should clearly show spatial relationships and proportions
- Component descriptions should specify exact sizes, not just "large" or "small"

### SIA is everywhere
- Most screens should have some SIA presence: a coaching note, a greeting, a suggestion, an insight card
- SIA's messages use purple accent (#7F24FF) sparingly — just a subtle indicator, not a purple background
- SIA-generated content should feel warm, conversational, and specific to the user's data

### Progressive disclosure
- Default to showing less, with clear paths to see more
- The "Mother Test": if a non-tech user cannot understand and use the screen, it is too complicated
- Collapse detail behind expandable sections. Show summaries with "see more" paths.

### RPG framing
- Goals are "missions." Completion earns XP. Users have levels and streaks.
- Keep it premium and mature — subtle gamification, not cartoonish
- RPG elements enhance, they don't dominate. The life coaching is the product.

### Domain colors coexist with brand colors
- Domain colors (fitness red, nutrition lime, finance emerald, etc.) appear ONLY on tag chips and domain indicators
- Brand colors (orange, green, purple) drive all actions, CTAs, and UI chrome
- They do not conflict because they serve different purposes (identification vs interaction)

---

## Batch Reference

| Batch | Screens | Theme |
|-------|---------|-------|
| 1 | 01-05 | Auth flow |
| 2 | 06-10 | Onboarding → SIA |
| 3 | 11-15 | Core daily experience |
| 4 | 16-20 | Me tab ecosystem |
| 5 | 21-25 | Settings & utility |
| 6 | 26-29 | Health domain pairs |
| 7 | 30-34 | Finance pair + domain dashboards |
| 8 | 35-40 | Remaining domains + social |
| 9 | 41-43 | Supporting + overlays |
