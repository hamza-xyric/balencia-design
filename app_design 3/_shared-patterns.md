# Shared Patterns — Balencia Screen Designs

This document tracks every reusable pattern established across all 90 screen design docs (85 numbered screens + 5 lettered auth sub-screens). It is the single source of truth for component specs, layout templates, color tokens, motion tokens, typography, interaction models, and gesture conventions. A developer should be able to implement any component from this document alone, without reading individual screen drafts.

Updated: complete consolidation covering Screens 01–72, all 14 batches + gap audit + full remediation. Includes input validation, keyboard behavior, small screen adaptations, offline behavior, permission request flows, typography convention, and device support scope (all finalized 2026-05-22).

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Navigation Patterns](#navigation-patterns)
3. [Layout Templates](#layout-templates)
4. [Component Patterns](#component-patterns)
5. [SIA (AI Coach) Patterns](#sia-ai-coach-patterns)
6. [RPG / Gamification Patterns](#rpg--gamification-patterns)
7. [Domain-Specific Patterns](#domain-specific-patterns)
8. [Chart & Data Visualization Patterns](#chart--data-visualization-patterns)
9. [Typography Patterns](#typography-patterns)
10. [Color Patterns](#color-patterns)
11. [Motion Patterns](#motion-patterns)
12. [Interaction Patterns](#interaction-patterns)
13. [Celebration & Reward Patterns](#celebration--reward-patterns)
14. [Empty State Patterns](#empty-state-patterns)
15. [Motivation Adaptation](#motivation-adaptation)
16. [Error Handling & Recovery Patterns](#error-handling--recovery-patterns)
17. [Interrupt & Notification Layering](#interrupt--notification-layering)
18. [Accessibility Standards](#accessibility-standards)
19. [SIA Suggestion Chip Variants](#sia-suggestion-chip-variants)
20. [Input Validation Rules](#input-validation-rules)
21. [Keyboard Behavior Standard](#keyboard-behavior-standard)
22. [Small Screen Adaptations](#small-screen-adaptations)
23. [Offline Behavior Standard](#offline-behavior-standard)
24. [Permission Request Flows](#permission-request-flows)
25. [Screen Registry Additions 74-85](#screen-registry-additions-74-85)
26. [Typography Convention](#typography-convention)
27. [Device Support](#device-support)

---

## Design Tokens

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `brand-orange` | #FF5E00 | Primary CTA, active states, progress fills, accent words (60% role) |
| `forest-green` | #34A853 | Success states, completion, health metrics, positive trends (30% role) |
| `royal-purple` | #7F24FF | SIA/AI indicators only — avatar accent, coaching note borders, projected data (10% role) |
| `ink-900` | #0A0A0F | Screen background |
| `ink-brown-800` | #211008 | Card/surface background |
| `white` | #FFFFFF | Primary text at 100%, secondary at 70%, tertiary at 50%, quaternary at 40% |
| `error-red` | #F44336 | Error borders, error text |
| `glow-orange` | rgba(255, 94, 0, 0.15) | Hero glow, subtle orange radiance |

**Domain Colors** (tags/indicators only, never for actions):

| Domain | Hex | Token |
|--------|-----|-------|
| Fitness | #EF4444 | fitness-red |
| Sleep | #818CF8 | sleep-indigo-light |
| Career | #6366F1 | career-indigo |
| Nutrition | #84CC16 | nutrition-lime |
| Finance | #10B981 | finance-emerald |
| Faith | #A855F7 | faith-purple |
| Productivity | #F97316 | productivity-orange |
| Relationships | #EC4899 | relationships-pink |
| Wellbeing | #14B8A6 | wellbeing-teal |
| Meditation | #A78BFA | meditation-violet |

> **Extensibility**: The 10 domains above are the starting set. Optional domains (e.g., Creativity #F59E0B) can be activated per user without structural changes. Domains are stored in a registry, not hardcoded.

**APPROVED EXCEPTION — Podium Colors** (Screen 39 leaderboard only):
- Gold: #FFD700
- Silver: #C0C0C0
- Bronze: #CD7F32

### Corner Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--r-xs` | 6pt | Small UI details (checkboxes, tiny indicators) |
| `--r-sm` | 10pt | Small chips, nested cards, domain tag chips |
| `--r-md` | 14pt | Input fields, small cards (stat tiles, domain skill grid cards) |
| `--r-lg` | 20pt | Buttons, mid cards, modal top corners |
| `--r-xl` | 28pt | **Primary content cards** — SIA notes, action cards, goal cards, dashboard cards, panels |
| `--r-2xl` | 40pt | Large surfaces, hero cards, paywall modal top corners |
| `--r-pill` | 999pt | CTA buttons, toggles, badges, filter chips, segmented controls |

> **Card radius rule (Brand Guidelines v2)**: Default card radius is `--r-xl (28pt)`. Use `--r-md (14pt)` only for small cards under ~80pt height (e.g., stat tiles in a 3-column grid). Use `--r-sm (10pt)` for chips and nested cards within other cards.

### Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-1` | 0 8pt 24pt rgba(33, 16, 8, 0.18) | Subtle elevation — default card shadow |
| `--shadow-2` | 0 18pt 48pt rgba(33, 16, 8, 0.22) | Mid elevation — FABs, floating elements, hover cards |
| `--shadow-3` | 0 32pt 80pt rgba(33, 16, 8, 0.28) | High elevation — modals, overlays, drag states |

### Glow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--glow-orange` | 0 0 32pt rgba(255, 94, 0, 0.45) | Orange glow accent — hero elements, active states |
| `--glow-green` | 0 0 32pt rgba(52, 168, 83, 0.40) | Green glow accent — success/completion celebrations |
| `--glow-purple` | 0 0 32pt rgba(127, 36, 255, 0.40) | Purple glow accent — SIA/AI premium moments |

### Spacing Scale (8pt base)

| Token | Value | Usage |
|-------|-------|-------|
| `--s-1` | 4pt | Tight icon/text gap |
| `--s-2` | 8pt | Button inner gap, element-to-element inside cards |
| `--s-3` | 12pt | Button inner gap (large), small component gap |
| `--s-4` | 16pt | Screen horizontal margins (product), component group gap |
| `--s-5` | 24pt | **Card internal padding (default)**, component group gap (large) |
| `--s-6` | 32pt | Hero card padding, inter-section gap, section header gap |
| `--s-7` | 48pt | Section header gap (large) |
| `--s-8` | 64pt | Bottom padding (clears FAB + tab bar) |
| `--s-9` | 96pt | Section vertical padding (web) |
| `--s-10` | 128pt | Section vertical padding large (web) |

### Spacing Usage

- **Product screen horizontal margins**: 16pt per side (32pt total)
- **Auth screen horizontal margins**: 24pt per side (48pt total)
- **Card internal padding**: 24pt (standard per brand guidelines), 32pt (hero cards)
- **Section gap**: 16pt between cards within a section
- **Inter-section gap**: 32pt between content sections
- **Gap between elements inside cards**: 8–12pt

### Stroke Width Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--stroke-thin` | 2pt | Thin detail, subtle UI lines, back chevron |
| `--stroke-base` | 4pt | Base weight, standard continuous stroke lines |
| `--stroke-bold` | 8pt | Bold emphasis lines |
| `--stroke-poster` | 12pt | Hero/billboard brand lines (onboarding, celebrations) |

### Gradient Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--grad-progress` | Teal/green → warm progress color | Progress movement in charts |
| `--grad-growth` | Warm yellow/orange → stronger orange | Growth and effort indicators |
| `--grad-status` | Green → warm status color | 0% to 100% completion status |
| `--grad-hero-glow` | radial-gradient(circle, rgba(255, 94, 0, 0.42) 0%, rgba(255, 94, 0, 0) 70%) | Hero atmosphere, depth glow |

> **Gradient rules**: Gradients represent movement, journey, and status. Use in charts, hero glows, and progress lines only. Do not use unrelated gradients or heavy dark gradients in graphs. Do not use a three-color gradient unless it is the approved journey palette.

### Glassmorphism

- Border: 1pt, white at 5–8% opacity
- Background: ink-brown-800 (#211008)
- Backdrop-blur: on sticky headers only (16px blur radius)
- Used on: all cards app-wide, sticky header backgrounds

---

## Navigation Patterns

### Bottom Tab Bar
*Established: Screen 12. Used on: all authenticated product screens (12–43 except active workout mode on 27, modals, overlays)*

- **Tabs**: Today | SIA | Goals | Me
- **Height**: 56pt (standardized) + ~34pt iOS safe area below on notch devices
- **Active tab**: orange icon (#FF5E00) + label (filled icon variant)
- **Inactive tab**: white at 60% (outlined icon variant)
- **Tab icons**: 24pt, outlined when inactive, filled when active
- **Label**: 11pt Sora Regular below icon
- **Background**: ink-900, no border, subtle shadow-1 above
- **Always visible** on authenticated product screens
- **Hidden during**: onboarding/auth (01–08), active workout mode (27), full-screen overlays (42), modals (15, 43)

### Stack Navigation (within tabs)
*Established: Screen 12. Used on: all stack-pushed screens*

- Push/pop within each tab's stack
- Back button: left chevron, white, 2pt stroke weight, 20pt icon, 44x44pt touch target, 16pt from left edge
- Screen title: 17pt Sora Semibold, center-aligned (in nav bar)
- Large title style on primary screens (28pt Bold, left-aligned, collapses to 17pt Semibold center on scroll)
- iOS swipe-right-from-edge gesture supported on all stack screens
- Transition: slide in from right (280ms, ease-out-soft)

### Modal Presentation
*Established: Screen 15. Used on: 15, 29 (barcode scanner), 31 (edit budget), 33 (add person, log quality time), 38 (add habit), 42 (celebration), 43 (paywall)*

- Slides up from bottom
- Drag-to-dismiss with handle indicator at top
- Semi-transparent backdrop: ink-900 at 60% opacity, tap to dismiss
- Corner radius: --r-lg (20pt) top-left and top-right (standard), --r-2xl (40pt) on paywall (43)
- Drag handle: 36–40pt wide x 4pt tall pill, white at 20%, centered, 8–14pt below modal top
- Entry: 520ms ease-flow (slide up)
- Dismiss: 280ms ease-out-soft (slide down)

**Bottom Sheet Dismiss Behavior** (applies to all bottom sheets and modals):

| Trigger | Threshold | Result |
|---------|-----------|--------|
| Drag distance | >30% of sheet height | Dismiss (slide down, 280ms ease-out-soft) |
| Drag velocity | >500pt/s downward | Dismiss regardless of distance |
| Below threshold | <30% height AND <500pt/s | Snap back to open position (280ms ease-out-soft) |
| Tap backdrop | Anywhere on backdrop | Dismiss (unless sheet is marked non-dismissible) |

- **Handle area vs. content area**: Dragging the handle (top 44pt of sheet) always engages the dismiss gesture. Dragging within the content area scrolls content first — dismiss gesture only engages when content is scrolled to the top (offset 0) and the user continues pulling down.
- **Rubber-band resistance**: When dragging past full-open position (upward), apply 0.3x resistance factor — sheet moves at 30% of finger distance.
- **Snap points**: Sheets with >600pt content height support a half-open snap at 50% height. Drag past 50% snaps to full-open; drag below 50% snaps to dismiss. Half-open snap uses the same 280ms ease-out-soft timing.
- **Non-dismissible sheets**: Payment confirmation and account deletion sheets disable drag-to-dismiss and backdrop tap. Only explicit button actions close them.

### Navigation Bar with Scroll-Reactive Title
*Established: Screen 14. Used on: 13, 14, 35, and all screens with large-title style*

- Transparent at rest
- On scroll past hero/title: transitions to ink-900 at 80% + backdrop-blur(16px)
- Title fades in at center (17pt Sora Semibold, opacity 0 to 1)
- Transition: 160ms ease-out-soft

---

## Layout Templates

### Auth Screen Template
*Established: Screens 03–05. Used on: 03 (Sign Up), 04 (Sign In), 05 (Forgot Password)*

**Structure (top to bottom)**:
1. Back button row (44pt) — omitted on entry screen (03)
2. Brand symbol (48pt, Burnt Orange, centered) + 32pt gap
3. Screen heading (24pt Sora Bold, white, center-aligned) + 32pt gap
4. Form fields group (52pt per field, 16pt gaps between)
5. Primary CTA (56pt orange pill, full-width minus 48pt) + 24pt gap above
6. Divider "or continue with" + social auth (if applicable) + 24pt gaps
7. Navigation text links (white 50% context + orange action word)
8. Legal footer (if applicable)

**Constants**:
- Horizontal margins: 24pt each side (48pt total)
- ScrollView wrapper
- ink-900 background, no tab bar
- Brand Mode register (large type, generous whitespace)
- Content optically centered (~40% from top)

### Domain Dashboard Template
*Established: Screen 26 (canonical). Confirmed by: 28, 30, 32, 33, 34, 35, 36*

The canonical layout pattern for all 10 domain dashboards. Each dashboard follows this slot-based structure with domain-specific content:

**Structure (top to bottom)**:
1. **Domain Dashboard Header** — 56pt, FIXED, sticky with backdrop-blur on scroll
2. **SIA Coaching Note Card** — 56–80pt (variant depends on screen)
3. **Primary Content Card** — domain-specific hero card (e.g., Today's Workout, Daily Macros, Monthly KPIs)
4. **Integration/Data Card** — conditional (WHOOP on 26, Water Tracker on 28, etc.)
5. **Active Goals Section** — domain-filtered goals with progress bars
6. **History/Activity Section** — 7-day dots, stat tiles, calendar heatmap, etc.
7. **Bottom Padding** — 64pt (clears FAB + tab bar)
8. **FAB** — floating, above tab bar, z-40

**Constants**:
- ScrollView (not FlatList — mixed content, not homogeneous)
- 16pt margins each side
- 16pt gap between all section cards
- Tab bar visible
- Domain accent color appears ONLY on: header accent line, section eyebrow text, RPG skill badge — never on CTAs or primary actions

### Detail Screen Template
*Established: Screen 27 (canonical). Confirmed by: 14, 29, 31*

**Structure (top to bottom)**:
1. **Detail Header** — 56pt, FIXED: back chevron + title/subtitle + overflow menu (3 dots)
2. **Hero Element** — large progress ring (14), set tracker (27), amount display (31), or photo (29)
3. **Summary Section** — stats row, domain tags, key metadata
4. **Primary Action Card** — the main thing the user should do (next action, start workout, etc.)
5. **Expandable Detail Sections** — progressive disclosure via collapsible headers
6. **Ask SIA / SIA Shortcut Card** — conversational escape hatch to SIA Chat
7. **Bottom Spacer** — 24pt above tab bar

### Multi-Mode Screen Pattern
*Established: Screen 27. Used on: 27, 29*

A single screen that transitions between 2–3 modes via content crossfade:
- **Screen 27**: Planning → Active → Post-Workout Summary
- **Screen 29**: Search → Quick-Add → Manual Entry

Mode transition: content crossfade below the header (520ms, ease-out-soft). Header remains stable during transitions.

---

## Component Patterns

### Brand CTA Button (Full-Width)
*Established: Screen 02. Used on: 02, 03, 04, 05, 06, 08, 12, 15, 25, 27, 43*

The primary call-to-action button:
- Full-width minus margins (48pt for auth screens, 32pt for product screens)
- Height: 56pt
- Background: Burnt Orange (#FF5E00)
- Text: white, 17pt Sora Semibold (600), center-aligned, sentence case
- Border radius: --r-pill (999pt)
- States:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Orange fill, white text | — |
  | Pressed | Darker orange (#E05500) + scale(0.97) | Light impact |
  | Disabled | 40% opacity, no touch | — |
  | Loading | White spinner replaces text | — |
  | Success | Green glow (600ms) | Success notification |
  | Focus-visible | 2pt orange ring, offset 2pt | — |

### In-Card CTA Button
*Established: Screen 26. Used on: 26, 27, 28, 30, 43*

A smaller CTA used inside cards:
- Full card content width (card width minus card padding x2)
- Height: 48pt
- Background: Burnt Orange (#FF5E00)
- Text: white, 16pt Sora Semibold, center-aligned
- Border radius: --r-pill
- Same 8-state model as Brand CTA

### "Complete Set" / Green Action Button
*Established: Screen 27. Used on: 27*

Used for completion actions (distinct from primary orange CTA):
- Height: 48pt
- Background: Forest Green (#34A853)
- Text: white, 16pt Sora Semibold, "Complete set checkmark"
- Border radius: --r-pill
- Pressed: darker green (#2D9249) + scale(0.97), medium impact
- Success: green glow (600ms), text changes to "Set logged checkmark" for 280ms

### Text Input Field
*Established: Screen 03. Used on: 03, 04, 05, 15, 21, 27, 29, 40*

Standard form input:
- Full-width minus margins
- Height: 52pt
- Background: ink-brown-800 (#211008)
- Border: 1pt solid white at 10% (default), 2pt Burnt Orange (focused), 2pt #F44336 (error)
- Border radius: --r-md (14pt)
- Text: 16pt Sora Regular, white
- Placeholder: white at 40%
- Padding: 16pt horizontal
- Password variant: visibility toggle (eye icon, 20pt, right-aligned, 44x44pt touch target)
- Error message: 13pt Sora Regular, #F44336, left-aligned, 4pt below field

### Natural Language Input
*Established: Screen 15. Used on: 15*

Large-format text area for goal creation:
- Full-width minus 32pt
- Height: 120pt (grows to 200pt max)
- Background: ink-brown-800, --r-md border radius
- Text: 18pt Sora Regular, white (larger than standard 16pt)
- Placeholder: 18pt Sora Regular, white at 30%, cycles every 4 seconds with crossfade
- Border: 1pt white at 10% (default), 2pt orange (focused)

### Social Auth Button
*Established: Screen 03. Used on: 03, 04*

Side-by-side social login buttons:
- Two buttons with 16pt gap, each half available width minus gap
- Height: 52pt
- Background: ink-brown-800 (#211008)
- Border: 1pt solid white at 10%
- Border radius: --r-lg (20pt)
- Content: Provider icon (20pt, full color) + name (15pt Sora Semibold, white), centered
- Google: multicolor G + "Google" | Apple: white Apple logo + "Apple"
- States: Default, Pressed (bg darkens + scale(0.97)), Loading (spinner replaces content)

### Auth Divider
*Established: Screen 03. Used on: 03, 04*

"or continue with" separator:
- Horizontal rule (1pt, white at 10%) on each side of centered text
- Text: "or continue with", 13pt Sora Regular, white at 40%
- Text padding: 12pt horizontal from rules
- 24pt vertical spacing above and below

### Auth Navigation Link
*Established: Screen 03. Used on: 03, 04, 05*

Bottom-of-screen text links:
- Full-width, center-aligned
- Context: 15pt Sora Regular, white at 50%
- Action word: 15pt Sora Semibold, Burnt Orange
- Touch target: 44pt height
- Pressed: entire line at 40% opacity, scale(0.98)

### Back Button
*Established: Screen 04. Used on: all stack-depth > 0 screens*

- Left chevron icon, white, 2pt stroke weight, 20pt size
- Position: 16pt from left edge, in 44pt tall row
- Touch target: 44x44pt
- Pressed: white at 60%, scale(0.95), light haptic
- Supports iOS swipe-right-from-edge gesture

### Skip Button
*Established: Screen 02. Used on: 02, 07*

- Position: top-right, 16pt right margin, 8pt below safe area
- Text: "skip", 15pt Sora Regular, white at 60%
- Touch target: 44x44pt
- Pressed: white at 40%, scale(0.97), light haptic

### Carousel Pagination
*Established: Screen 02. Used on: 02*

Horizontal dot pagination:
- Dots: 8pt diameter circles
- Active dot: Burnt Orange, morphs to 24pt wide pill
- Inactive dots: white at 30%, 8pt circle
- Spacing: 12pt between dots
- Transition: 280ms ease-out-soft
- Position: centered horizontally, above CTA area

### Confirmation State (Form to Success)
*Established: Screen 05. Used on: 05, 15, 27*

Pattern for form submission confirmations:
- Crossfade from form to confirmation (520ms)
- Success icon: 56pt circle, Forest Green fill, white checkmark (24pt), subtle green glow
- Success icon enters: scale(0.5 to 1.0) + fade-in, 520ms, ease-flow
- Optional resend link with cooldown

### Section Eyebrow Label
*Established: Screen 12. Used on: 12, 13, 14, 15, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41*

- 12pt Sora Semibold (600), white at 40%, uppercase, +0.12em letter-spacing
- Spacing: 32pt above (gap from previous section), 12pt below
- Domain dashboard variant: uses domain color instead of white at 40% (e.g., "TODAY'S WORKOUT" in #EF4444)
- Examples: "TODAY'S ACTIONS", "YOUR MISSIONS", "BUDGETS", "EXERCISES"

### Section Heading Row
*Established: Screen 26. Used on: 26, 28, 30, 32, 33, 34, 35, 36, 38, 39*

Title + "see all" link in a single row:
- Title: 18pt Sora Semibold, white, left-aligned
- "see all": 13pt Sora Regular, Burnt Orange, right-aligned, 44pt touch target
- Row height: 32pt
- Used as section headers in domain dashboards

### Domain Tag Chip
*Established: Screen 12. Canonical spec confirmed: Screen 37. Used on: 12, 13, 14, 15, 16, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41*

Color-coded life domain identifier:
- Height: 24pt
- Padding: 8pt horizontal (12pt with optional icon)
- Border radius: --r-sm (10pt)
- Background: domain color at 15% opacity
- Text: 11pt Sora Semibold, domain color, sentence case
- Optional icon: 14pt, domain color, left side (omit in tight spaces)
- Domain colors: Fitness #EF4444, Sleep #818CF8, Career #6366F1, Nutrition #84CC16, Finance #10B981, Faith #A855F7, Productivity #F97316, Relationships #EC4899, Wellbeing #14B8A6, Meditation #A78BFA
- Variants:
  - **Static** (informational): no gesture. Used on action cards (12), habit rows (38)
  - **Tappable** (navigates to domain dashboard): used on goal detail (14), journal entries (37)
  - **Editable** (with x remove button): 10pt "x" inside chip for removal. Used on create/edit goal (15)
- Multiple chips inline with 8pt gap

### Filter Chip / Filter Tab Row
*Established: Screen 13. Used on: 13, 16, 29, 38, 39*

Horizontal scrollable row of filter chips:
- Chip height: 36pt
- Border radius: --r-pill (999pt)
- Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
- Active: orange (#FF5E00) bg, white text
- Gap: 8pt between chips
- Leading margin: 16pt
- Only one status chip active at a time
- "by domain" variant: opens a secondary row of domain chips (animated slide-down, 280ms)

### Segmented Control
*Established: Screen 15 (3-segment strictness). Confirmed by: 16, 29, 35, 38, 41*

Pill-shaped segmented toggle:
- Container: ink-brown-800 bg, --r-pill (999pt), 1pt white at 10% border
- Height: 40pt (38 habits), 36pt (16 life areas), 44pt (15 strictness)
- Segment text: 14pt Sora Semibold
- Active segment: orange (#FF5E00) bg pill, white text — slides to new position (280ms, ease-out-soft)
- Inactive: transparent bg, white at 50% text
- Haptic: medium impact on segment change
- Common configurations:
  - 2-segment: Today | Week (38, partial)
  - 3-segment: day | week | month (41), Today | Week | Month (38), lenient | balanced | strict (15), week | month | all-time (16)
  - 4-segment: breakfast | lunch | dinner | snack (29)

### Toggle Switch
*Established: Screen 15. Used on: 15, 21*

- Visual size: 32pt wide x 20pt tall
- Touch target: 44x44pt (extended hit area)
- On: orange (#FF5E00) bg + white circle (right)
- Off: white at 15% bg + white circle (left)
- Transition: circle slides + bg color transitions (160ms)
- Haptic: light impact

### Progress Ring
*Established: Screen 12. Used on: 12, 13, 14, 15, 32, 35*

Circular progress indicator in 3 size variants:

| Variant | Diameter | Stroke | Label | Used on |
|---------|----------|--------|-------|---------|
| Small | 36pt | 3pt | 12pt Semibold | 13 (Goal Card) |
| Medium | 48pt | 4pt | 14pt Semibold | 12 (Progress Ring Card) |
| Large | 96pt | 6pt | 24pt Bold | 14 (Goal Detail hero) |

**Common specs (all variants)**:
- Track: white at 10%
- Fill: orange (#FF5E00), clockwise from 12 o'clock
- Complete (100%): green (#34A853) fill + green glow pulse (600ms)
- Label: white, centered inside ring (shows percentage)
- Mount animation: fill from 0 to current%, 520ms ease-flow
- Update animation: old% to new%, 280ms ease-out-soft

### Floating Action Button (FAB)
*Established: Screen 13. Used on: 13, 26, 28, 30, 32, 33, 35, 36, 38*

**Circular variant** (Screen 13):
- 56pt diameter circle
- Orange (#FF5E00) fill
- Centered "+" icon (24pt, white, 2pt stroke)
- Shadow: --shadow-2 + rgba(255, 94, 0, 0.3) warm glow
- Position: bottom-right, 16pt from right, 16pt above tab bar, z-40

**Extended Pill variant** (Screens 26, 28, 30, 35, 36, 38):
- Height: 48pt, auto-width (24pt horizontal padding)
- Background: ink-brown-800 with glassmorphism (26, 28) or orange (#FF5E00) fill (35, 38)
- Content: "+" icon (16pt) + label (15pt Sora Semibold, white), 8pt gap
- Shadow: --shadow-2
- Position: centered or right-aligned, 16pt above tab bar, z-40

**Long-press expand variant** (Screen 30):
- 56pt circle, orange fill
- Short tap: opens default action
- Long-press: expands to reveal 2 options ("add transaction", "scan receipt")

**Scroll behavior** (all FABs): fades out on scroll down (opacity 0 + translateY +20pt, 160ms), fades back in on scroll up or stop

**States**:
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Full opacity, resting position | — |
| Pressed | scale(0.93–0.95), bg darkens | Medium impact |
| Focus-visible | 2pt white/orange ring, offset 4pt | — |

### Quick Actions Menu (Long-Press Context Menu)
*Established: Screen 13. Used on: 13, 38*

- Floating card, z-40, ink-brown-800 bg, --r-lg (20pt), backdrop-blur(12px)
- Anchored to the long-pressed element
- Vertical list of actions, each row: 48pt tall, 16pt horizontal padding, 44pt touch target
- Icon (16pt) + label (15pt Sora Regular, white)
- Divider: 1pt white at 5% between items
- Backdrop: ink-900 at 40% (tap to dismiss)
- Entry: scale(0.95 to 1.0) + fade-in, 160ms
- Exit: fade-out, 160ms
- Haptic: medium impact on long-press trigger

### Expandable/Collapsible Section
*Established: Screen 14. Used on: 14, 25, 34, 41*

- Full-width row, no card surface, 48pt tall, 16pt horizontal margins
- Chevron: 14pt, white at 40%, rotates 0 to 90deg on expand
- Title: 15pt Sora Semibold, white at 80%, 8pt right of chevron
- Counter badge (optional): "5/7 done", 12pt Regular, white at 40%, right-aligned
- Divider: 1pt white at 5% below each header (except last)
- Expand/collapse animation: content height 0 to auto + fade-in / auto to 0 + fade-out, 280ms ease-out-soft

### FAQ Accordion Item
*Established: Screen 25. Used on: 25*

- Question text: 16pt Sora Semibold, white
- Chevron: 14pt, white at 40%, right-aligned, rotates on expand
- Answer: 15pt Sora Regular, white at 70%, slides in below question
- Full row: 56pt collapsed height, 16pt padding
- Same animation as Expandable Section (280ms ease-out-soft)

### Action Card (Swipeable)
*Established: Screen 12. Used on: 12, 32*

- ink-brown-800 card, --r-xl (28pt), 24pt padding
- Full-width minus 32pt
- Domain tag chip(s) top-left
- Action description: 16pt Sora Semibold, white
- Estimated time: 13pt Regular, white at 50%
- Completion checkbox: 24pt circle, right-aligned. Default: 2pt white at 30% border. Completed: orange fill + white checkmark
- Height: ~76pt (1-line) to ~92pt (2-line)
- Gestures:
  - Tap checkbox: complete action (success haptic)
  - Swipe right >30%: complete (green reveal bg + checkmark)
  - Swipe left >30%: skip (gray reveal + "skip" text)
  - Tap body: expand to show SIA reasoning
- Completed state: strikethrough text + checkmark + 50% opacity, slides down after 600ms

### Goal Card
*Established: Screen 13. Used on: 13, 15 (quest preview)*

- ink-brown-800, --r-xl (28pt), 24pt padding, full-width minus 32pt
- Left column (64pt): Progress Ring (small, 36pt)
- Right column: goal name (16pt Semibold), domain tags, next action (13pt Regular, white at 70%), SIA note (13pt Regular, white at 50%), XP + streak row (12pt Semibold)
- Height: ~132pt
- Tap: stack push to Goal Detail
- Long-press: Quick Actions Menu
- Variants: active (default), completed (green ring, 70% opacity), paused (gray ring, 60% opacity)

### Notification Row
*Established: Screen 24. Used on: 24*

- Height: 80pt
- Left: category icon (24pt, ink-brown-800 circle bg)
- Content: title (15pt Semibold), body (13pt Regular, white at 70%, 2 lines max), timestamp (12pt Regular, white at 40%)
- Unread variant: 6pt orange dot, left edge; white bg at 3% tint
- Read variant: no dot, standard ink-900 bg
- Swipe-left to delete

### Date Group Header (Sticky)
*Established: Screen 24. Used on: 24, 37, 40*

- Sticky section header in a SectionList
- Text: 13pt Sora Semibold, white at 40%, uppercase
- Background: ink-900 + backdrop-blur on scroll
- Height: 32pt
- Content: "Today", "Yesterday", "May 18, 2026", etc.

### Search Bar
*Established: Screen 25. Used on: 25, 29, 40*

- Full-width minus 32pt, 44pt tall
- Background: ink-brown-800, --r-md (14pt)
- Left: search icon (16pt, white at 40%)
- Placeholder: 15pt Sora Regular, white at 40%
- Text: 15pt Sora Regular, white
- Focused border: 2pt orange

### Integration Card (Connected Service)
*Established: Screen 22. Used on: 22, 26*

3 variants:
- **Connected + Data**: 3-column layout (value + label + color indicator per column), 120pt height
- **Connected + Syncing**: "Syncing..." with inline spinner
- **Not Connected**: compact prompt "Connect [service] for [benefit]" + right chevron, ~64pt

Color coding for indicator dots: green (#34A853) = good (>70%), yellow (#F59E0B) = moderate (40–70%), red (#EF4444) = low (<40%)

### Tier Card (Subscription)
*Established: Screen 23. Used on: 23, 43*

- Height: ~260pt (full), ~100pt (compact on 43)
- Full-width minus 48pt (auth margins) or 32pt
- Border radius: --r-xl (28pt)
- Background: ink-900 (contrast against modal)
- Border: 1pt orange at 30% (recommended), 1pt white at 10% (other)
- Content: tier name eyebrow (12pt Semibold, uppercase, orange), price (24pt Bold, white), description (15pt Regular, white at 70%)
- Optional "recommended" chip: orange bg, white text, --r-pill
- Pressed: border brightens to 60%, scale(0.98)

### Person Row
*Established: Screen 33. Used on: 33*

- Height: ~64pt
- Left: 40pt avatar circle (photo or initials on domain color bg)
- Content: name (16pt Semibold), relationship label (13pt Regular, white at 50%), last interaction (12pt Regular, white at 40%)
- Right: chevron (12pt, white at 20%)
- Tap: stack push to person detail

### Habit Row
*Established: Screen 38. Used on: 38*

- Height: 64pt
- Left: 24pt square checkbox (1.5pt border, --r-xs corners). Checked: orange fill + white checkmark (14pt, 2pt stroke). Unchecked: white at 20% border.
- Content: habit name (15pt Semibold, white), streak (13pt Regular, "fire 12 days"), domain tag chip
- Swipe-left: edit / delete actions
- Tap checkbox: complete habit (orange fill animates from center, 280ms ease-flow)

### Completion Rate Bar
*Established: Screen 38. Used on: 38*

- Full-width minus 32pt, 8pt height
- Track: white at 8%, --r-pill
- Fill: orange (#FF5E00), animates to current %
- 100% state: fill turns green (#34A853)
- Above bar: "5 of 8 today" (15pt Semibold, white) + "62%" right-aligned

### Stat Tile
*Established: Screen 26. Used on: 26, 27, 28, 30, 32, 35*

Compact metric display:
- 3 tiles per row, equal width, 8pt gaps
- Height: 72pt
- Background: ink-brown-800, --r-md (14pt)
- Value: 20pt Sora Semibold, white, centered
- Label: 12pt Sora Regular, white at 50%, centered, 4pt below value
- Count-up animation on mount: 0 to final value, 280ms ease-out-soft

### Exercise Preview Chip
*Established: Screen 26. Used on: 26*

- Horizontal ScrollView of chips
- Background: ink-900, --r-sm (10pt)
- Padding: 8pt horizontal, 4pt vertical
- Text: 13pt Sora Regular, white
- Gap: 8pt between chips
- Overflow: "+N" indicator chip (same style, white at 40% text)

### Budget Category Row
*Established: Screen 30. Used on: 30, 31*

- Category icon (24pt) + name (15pt Semibold) + spent/allocated (13pt Regular, right-aligned)
- Progress bar: 8pt height, --r-pill, white at 8% track
- Under budget: orange fill
- Over budget: red (#EF4444) fill, amount text turns red
- Row height: ~52pt
- Tap: stack push to Transaction/Budget Detail

### Transaction Row
*Established: Screen 30. Used on: 30, 31*

- Height: ~56pt
- Left: category icon (24pt circle)
- Content: merchant name (15pt Semibold, white), date/time (13pt Regular, white at 50%)
- Right: amount. Income: green (#34A853) "+$X". Expense: white "-$X"
- Divider: 1pt white at 5%
- Tap: stack push to Transaction Detail

### Savings Goal Card
*Established: Screen 30. Used on: 30*

- Goal name (15pt Semibold), current/target amounts (13pt Regular), percentage (13pt Semibold)
- Progress bar: 8pt, --r-pill, green (#34A853) fill
- Card: ink-brown-800, --r-xl (28pt), 24pt padding

### Monthly KPI Strip
*Established: Screen 30. Used on: 30*

3 equal-width cards in a horizontal row:
- Each: ink-brown-800, --r-md (14pt), 16pt padding
- Amount: 20pt Sora Bold, white
- Label: 12pt Regular, white at 50%
- Delta: 13pt Semibold, green (positive) or red (negative) + arrow indicator
- Height: ~96pt

### Amount Display (Hero)
*Established: Screen 31. Used on: 31*

- 36pt Sora Bold, white, centered
- Used as hero element at top of transaction/budget detail

### Category Chip (Tappable Pill)
*Established: Screen 31. Used on: 31*

- Pill shape, category color bg at 15%, category color text
- Tappable: navigates to budget category view
- Size: auto-width, 28pt height

### Edit Budget Bottom Sheet / Delete Confirmation Sheet
*Established: Screen 31. Used on: 31, 33*

- Slides up from bottom, backdrop ink-900 at 60%
- ink-brown-800 bg, --r-lg top corners
- Drag handle at top
- Content area with form fields or confirmation message
- CTA buttons at bottom

### AI Action Card
*Established: Screen 32. Used on: 32*

- 24pt checkbox (left) + action description (15pt Semibold) + XP reward badge
- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Tap checkbox: complete action, earn XP, trigger XP Float Animation

### Skills Snapshot Card
*Established: Screen 32. Used on: 32*

- Skill name pills: domain color at 15% bg, domain color text
- Arranged in a horizontal wrap layout

### Deadline Row
*Established: Screen 32. Used on: 32*

- Countdown timer: orange text if <7 days, red if <3 days
- Task name + deadline date

### Career Goal Card
*Established: Screen 32. Used on: 32*

- 32pt progress ring (left) + next action description
- Card: ink-brown-800, --r-xl (28pt)

### Practice Tracker (Adaptive Checklist)
*Established: Screen 34. Used on: 34*

- Checklist with 24pt checkboxes
- Each item: name + optional time + streak info
- Completion counter: "3/5 completed today"
- Content adapts to user's faith/belief system (same UI, different text)

### Reading Progress Card
*Established: Screen 34. Used on: 34, 35*

- Book/reading title, current page/chapter
- 6pt progress bar, green (#34A853) fill (34) or cyan fill (35)
- Card: ink-brown-800, --r-xl (28pt)

### Fasting Tracker Card
*Established: Screen 34. Used on: 34*

- Real-time countdown display
- Orange progress ring/bar
- Current fast status text

### Current Book/Course Card
*Established: Screen 35. Used on: 35*

- Title, author/instructor
- Cyan (#06B6D4) progress bar
- "Continue" CTA

### AI Learning Path Card
*Established: Screen 35. Used on: 35*

- 24pt square checkboxes, cyan fill when checked
- Step name + status

### Streak Tracker Card
*Established: Screen 35. Used on: 35, 38*

- 7-day dot row: 32pt circles (35) or 28pt cells (38)
- Domain color fill for completed days
- Graduated opacity (30–100%) based on completion percentage

### Active Projects Card
*Established: Screen 36. Used on: 36*

- Project name + amber (#F59E0B) progress bars
- Card: ink-brown-800, --r-xl (28pt)

### Practice Heatmap
*Established: Screen 36. Used on: 36, 38*

- 7 cells per row, multiple rows
- Cell size: 32pt squares (36), 28pt squares (38)
- Graduated domain color: 30–100% opacity based on activity
- 4pt gap between cells

### Portfolio Timeline
*Established: Screen 36. Used on: 36*

- Horizontal scroll
- Connecting line (amber) + dot markers
- Card items along timeline

### Journal Entry Row
*Established: Screen 37. Used on: 37*

- Height: 80–96pt
- Content: date, mood emoji, text preview (13pt Regular, white at 70%, 2 lines max), domain tag chips
- Tap: opens Writing Mode Bottom Sheet

### Writing Mode Bottom Sheet
*Established: Screen 37. Used on: 37*

- ~90% screen height modal
- Rich text input area
- Domain tag selector
- Mood selector row
- Drag handle at top, "done" button top-right

### Mood Selector
*Established: Screen 37. Used on: 12 (mood chips variant), 37*

- 5 emojis: happy, calm, neutral, sad, frustrated
- Size: 32pt each
- Selected: scale(1.2) + white at 10% circular background
- 12pt gap between emojis

### User Rank Card
*Established: Screen 39. Used on: 39*

- Height: 120pt
- 1.5pt orange at 40% border
- Content: rank number, avatar, name, level, XP, top domain

### Leaderboard Rank Row
*Established: Screen 39. Used on: 39*

- Height: 72pt
- Content: rank #, avatar (40pt), name, level badge, XP, top domain
- Top 3: gold/silver/bronze accent (PODIUM EXCEPTION)

### Level Badge
*Established: Screen 39. Used on: 12, 26, 39*

- "Lv. N" text in a pill
- Background: ink-900
- Border: 1pt domain color or orange
- Text: 13pt Sora Semibold, domain color or orange

### Filter Toggle (Underline Tab)
*Established: Screen 39. Used on: 39*

- Text tabs with 2pt orange underline on active tab
- No pill background
- Active: 15pt Semibold, white
- Inactive: 15pt Regular, white at 50%

### Room List Row
*Established: Screen 40. Used on: 40*

- Height: 80pt
- Left: room avatar (48pt)
- Content: room name (16pt Semibold), member count + message preview (13pt Regular, white at 70%), time (12pt Regular, white at 40%)
- Right: unread badge (if applicable)

### Discover Card
*Established: Screen 40. Used on: 40*

- Size: 120x100pt, horizontal scroll
- Background: ink-brown-800 with subtle gradient
- Content: room name + member count

### Chat Message Bubble Group
*Established: Screen 40. Used on: 09, 40*

**Others (left-aligned)**:
- Background: ink-brown-800
- Border radius: 16/16/16/4pt (top-left, top-right, bottom-right, bottom-left)

**Own (right-aligned)**:
- Background: ink-brown-800 with 5% orange tint
- Border radius: 16/16/4/16pt

### Shared Achievement Card (Chat)
*Established: Screen 40. Used on: 40*

- Green 3pt left border
- Achievement name + XP earned
- Within chat message flow

### Message Input Bar
*Established: Screen 40. Used on: 09, 40*

- Height: 52pt
- Input field: 40pt tall, ink-brown-800, --r-pill
- Send button: 40pt circle, orange, right side
- Optional: mic icon, attachment icon

### Unread Badge
*Established: Screen 40. Used on: 24, 40*

- 20pt circle, orange fill
- White count text (12pt Semibold, centered)
- Min-width: 20pt (grows with digit count)

### Calendar Day View
*Established: Screen 41. Used on: 41*

- Time-slot grid, 60pt per hour
- Vertical scrolling
- Current time indicator: 2pt orange horizontal line

### Calendar View Switcher
*Established: Screen 41. Used on: 41*

- 3-segment: Day | Week | Month
- Same Segmented Control pattern

### Event Card
*Established: Screen 41. Used on: 41*

**Synced/Manual**: solid ink-brown-800, 3pt domain color left bar
**SIA-Suggested**: dashed orange at 40% border, purple dot indicator

### Date Navigator
*Established: Screen 41. Used on: 41*

- Left/right chevrons + current date text + "today" orange dot indicator
- Height: 44pt

### Week Day Selector Row
*Established: Screen 41. Used on: 41*

- 7 days horizontally, 64pt height
- Active day: orange bg circle
- Today indicator: small orange dot below

### Month Calendar Grid
*Established: Screen 41. Used on: 41*

- Standard 7-column grid, ~280pt total height
- Date numbers: 14pt Regular, white
- Today: orange circle bg
- Dates with events: small domain-color dot below number

### Blurred Preview Treatment
*Established: Screen 43. Used on: 43*

- Gaussian blur radius 12pt
- Gradient overlay: transparent (top) to ink-brown-800 at 40% (bottom)
- Border: 1pt white at 8%, --r-xl (28pt)
- Height: ~160pt

### Easy-Out Link ("maybe later")
*Established: Screen 43. Used on: 43*

- "maybe later" in 15pt Sora Regular, white at 50%, center-aligned
- Touch target: full-width x 44pt
- No underline, no decoration

### Circular Progress Ring (Water)
*Established: Screen 44. Used on: 44*

- Diameter: 200pt, 8pt stroke, centered
- Track: white at 10%
- Fill: blue-tinted (#4FC3F7) clockwise from 12 o'clock
- Center: current ml value (32pt Sora Bold, white) + "/2500ml" (14pt Regular, white at 50%)
- 100% state: fill pulses green (#34A853) + glow-green
- Mount animation: fill from 0 to current%, 520ms ease-flow

### Quick Add Button Row
*Established: Screen 44. Used on: 44*

- Horizontal row of 4 preset buttons (e.g., +250ml, +500ml, +glass, +bottle)
- Each button: 72pt wide x 44pt tall, ink-brown-800 bg, --r-lg (20pt), 1pt white at 10% border
- Icon: 20pt, white at 70%, centered above label
- Label: 12pt Sora Regular, white at 50%
- Active/pressed: orange border, scale(0.95), light haptic
- Gap: 12pt between buttons

### Drink Entry Row
*Established: Screen 44. Used on: 44*

- Height: 56pt
- Left: drink type icon (24pt, white at 60%)
- Content: drink name (15pt Semibold, white) + amount (13pt Regular, white at 50%)
- Right: timestamp (12pt Regular, white at 40%)
- Swipe-left to delete entry

### Water Weekly Bar Chart
*Established: Screen 44. Used on: 44*

- 7 vertical bars, evenly spaced, full-width minus 32pt
- Bar width: 24pt, --r-sm top corners
- Fill: blue-tinted (#4FC3F7) at graduated opacity (50–100%) based on goal %
- Goal line: 1pt dashed, white at 20%, horizontal
- Day labels: 12pt Regular, white at 40%, centered below bars
- Chart height: ~120pt

### Custom Amount Numeric Keypad Modal
*Established: Screen 44. Used on: 44*

- Bottom sheet, --r-lg top corners, ink-brown-800 bg
- Number display: 28pt Sora Bold, white, centered, with "ml" suffix
- 3x4 keypad grid: digits 0–9 + delete + confirm
- Key: 64pt square, ink-900 bg, --r-md (14pt), 15pt Sora Semibold white
- Confirm key: orange bg, white checkmark
- Haptic: light impact per key press

### Mood Emoji Selector (6-Emoji Variant)
*Established: Screen 45. Used on: 45*

- 6 emojis in a horizontal row (great, good, okay, low, bad, awful)
- Size: 40pt each, 16pt gap
- Selected: scale(1.3) + orange ring (2pt) + white at 8% circular bg
- Unselected: scale(1.0), no ring
- Transition: 160ms ease-out-soft
- Haptic: light impact on selection

### Wellbeing Slider
*Established: Screen 45. Used on: 45*

- Full-width minus 32pt, 44pt touch target height
- Track: 6pt height, white at 10%, --r-pill
- Fill: gradient from red (#F44336) through amber (#F59E0B) to green (#34A853)
- Thumb: 24pt circle, white fill, --shadow-2
- Labels: "low" (left, 12pt Regular, white at 40%) and "high" (right)
- Value display: 15pt Semibold, white, above thumb, follows position

### Fulfillment Toggle
*Established: Screen 45. Used on: 45*

- Pill-shaped multi-select: "not at all" | "somewhat" | "very"
- Same spec as Segmented Control (40pt height, --r-pill)
- Active segment: orange bg, white text
- Used for quick self-assessment responses

### Intention Reflection Card
*Established: Screen 45. Used on: 45*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Quote-style layout: 3pt orange left border at 40% opacity
- Yesterday's intention text: 15pt Sora Regular, italic, white at 80%
- Reflection prompt: 13pt Regular, white at 50%, below
- Optional "how did it go?" rating row

### Expandable Context Note
*Established: Screen 45. Used on: 45*

- Collapsed: single-line summary (15pt Regular, white at 70%) + expand chevron
- Expanded: multi-line text area, 120pt max height, scrollable
- Same animation as Expandable Section (280ms ease-out-soft)

### Emotion Tag Chips
*Established: Screen 45. Used on: 45*

- Multi-select chip row, horizontal wrapping layout
- Chip: 32pt height, --r-pill, ink-brown-800 bg, 1pt white at 10% border
- Text: 13pt Sora Regular, white at 70%
- Selected: orange bg at 15%, orange text, 1pt orange border
- Gap: 8pt between chips
- Examples: "anxious", "grateful", "focused", "tired"

### Tomorrow Preview Card
*Established: Screen 45. Used on: 45*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "Tomorrow" eyebrow: 12pt Semibold, white at 40%, uppercase
- 2–3 preview items: icon + label (13pt Regular, white at 70%)
- Purpose: sets intention for next day

### Time-Aware Greeting
*Established: Screen 45. Used on: 45*

- Dynamic greeting based on time of day ("Good morning", "Good evening", etc.)
- Text: 24pt Sora Bold, white
- Subtitle: 15pt Regular, white at 50%, context-aware message
- Positioned at top of check-in flow

### Motivation-Reduced Check-in
*Established: Screen 45. Used on: 45*

- Low-motivation variant: shows only mood selector + 1 slider (reduced from full check-in)
- Fewer fields, larger touch targets
- Aligned with 3-tier Motivation Adaptation system

### Master Consent Banner
*Established: Screen 46. Used on: 46*

- Full-width minus 32pt, ink-brown-800 bg, --r-xl (28pt), 24pt padding
- Warning icon (24pt, amber #F59E0B) + heading (16pt Semibold, white)
- Description: 14pt Regular, white at 70%
- Toggle switch (right-aligned): enables/disables all accountability sharing
- Border: 1pt amber at 20%

### Contact Row
*Established: Screen 46. Used on: 46*

- Height: 64pt
- Left: 40pt avatar circle (photo or initials)
- Content: name (15pt Semibold, white) + role badge + permission indicator
- Right: chevron (12pt, white at 20%)
- Tap: opens permission configuration

### Role Badge
*Established: Screen 46. Used on: 46*

- Pill: 22pt height, --r-pill, ink-900 bg
- Text: 11pt Sora Semibold, white at 60%
- Variants: "partner", "coach", "friend", "family"
- Inline with contact name, 8pt left margin

### Permission Indicator
*Established: Screen 46. Used on: 46*

- Small dot row (3–5 dots), 6pt each, 4pt gap
- Filled: green (#34A853) — permission granted
- Empty: white at 20% — permission not granted
- Represents categories of shared data

### Group Card
*Established: Screen 46. Used on: 46*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Group name (16pt Semibold, white) + member count (13pt Regular, white at 50%)
- Overlapping avatar stack: up to 4 avatars (32pt circles, -8pt overlap)
- Right: chevron
- Tap: opens group detail

### Emergency Contact Row
*Established: Screen 46. Used on: 46*

- Same layout as Contact Row but with red (#F44336) left border accent (3pt)
- Emergency icon: 16pt, error-red
- "Emergency" label: 11pt Semibold, error-red

### Contract Card
*Established: Screen 46. Used on: 46*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Contract title (16pt Semibold, white) + partner name (13pt Regular, white at 50%)
- Contract Status Badge (inline)
- Terms preview: 13pt Regular, white at 70%, 2 lines max
- Tap: opens contract detail

### Contract Status Badge
*Established: Screen 46. Used on: 46*

- Pill: 22pt height, --r-pill
- Active: green (#34A853) at 15% bg, green text
- Pending: amber (#F59E0B) at 15% bg, amber text
- Expired: white at 10% bg, white at 40% text
- Text: 11pt Sora Semibold

### Violation Alert Card
*Established: Screen 46. Used on: 46*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Red left border: 3pt, error-red at 60%
- Alert icon (20pt, error-red) + violation description (15pt Semibold, white)
- Timestamp: 13pt Regular, white at 50%
- Action buttons: "view" orange text link + "dismiss" white at 50% text link

### AI Suggestion Card (Accountability)
*Established: Screen 46. Used on: 46*

- Purple left border: 3pt, royal-purple at 40%
- SIA-generated accountability recommendation
- "apply" orange pill CTA + "skip" ghost button
- Card: ink-brown-800, --r-xl (28pt), 24pt padding

### Trigger Row
*Established: Screen 46. Used on: 46*

- Height: 56pt
- Left: trigger icon (20pt, amber)
- Content: trigger name (15pt Semibold, white) + description (13pt Regular, white at 50%)
- Right: AI Intervene Toggle

### AI Intervene Toggle
*Established: Screen 46. Used on: 46*

- Same visual spec as Toggle Switch (32pt x 20pt)
- On: purple (#7F24FF) bg (AI-specific) + white circle
- Off: white at 15% bg
- Enables/disables SIA intervention for a specific trigger

### Trigger Log Entry
*Established: Screen 46. Used on: 46*

- Height: 48pt
- Content: trigger name (14pt Regular, white at 70%) + timestamp (12pt Regular, white at 40%)
- Outcome indicator: green dot (resolved) or amber dot (escalated)

### Create Trigger Modal
*Established: Screen 46. Used on: 46*

- Standard bottom sheet modal spec (--r-lg top corners, drag handle)
- Trigger name input + trigger type selector (chips)
- Intervention level picker: "notify" | "intervene" | "block"
- Confirm CTA: orange pill

### Create Contract Modal
*Established: Screen 46. Used on: 46*

- Standard bottom sheet modal spec
- Partner selector + terms text area + duration picker
- Both-party consent requirement notice
- Confirm CTA: orange pill

### Consent Configuration Modal
*Established: Screen 46. Used on: 46*

- Standard bottom sheet modal spec
- Checklist of data categories with toggle switches per category
- Category icon (20pt) + name (15pt Semibold) + toggle (right-aligned)
- "select all" / "deselect all" links at top

### Dispute Modal
*Established: Screen 46. Used on: 46*

- Standard bottom sheet modal spec
- Violation context card at top (read-only)
- Dispute reason text area
- "submit dispute" orange CTA

### Dashed Border Add Button
*Established: Screen 46. Used on: 46, 61*

- Full-width minus 32pt, 56pt height
- Dashed border: 1.5pt dashed, white at 20%, --r-xl (28pt)
- "+" icon (20pt) + label (15pt Semibold), white at 40%, centered
- Pressed: border opacity increases to 40%, light haptic
- Reusable for "add contact", "add task", "add item" contexts

### Hero Banner Card
*Established: Screen 47. Used on: 47*

- Full-width minus 32pt, ~180pt height
- Card: ink-brown-800, --r-2xl (40pt), 32pt padding
- Background: subtle radial gradient (glow-orange at 10% center)
- Title: 20pt Sora Bold, white
- Subtitle: 15pt Regular, white at 70%
- Optional illustration/icon area: right side, 80pt
- Tap: opens primary competition or featured content

### Competition Card
*Established: Screen 47. Used on: 47*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Competition name (16pt Semibold, white) + Competition Type Badge + Status Indicator Dot
- Participant avatars: overlapping stack (up to 5, 28pt circles, -6pt overlap)
- Progress bar: 6pt height, orange fill, --r-pill
- Countdown Timer Display (right-aligned)
- Tap: stack push to competition detail

### Competition Type Badge
*Established: Screen 47. Used on: 47*

- Pill: 22pt height, --r-pill
- Types: "1v1" (orange at 15% bg), "team" (green at 15% bg), "community" (purple at 15% bg)
- Text: 11pt Sora Semibold, matching color
- Inline with competition name, 8pt gap

### Status Indicator Dot
*Established: Screen 47. Used on: 47, 60*

- 8pt circle, inline with text, 6pt right margin
- Active: green (#34A853) + subtle pulse (800ms loop)
- Upcoming: amber (#F59E0B), static
- Ended: white at 20%, static
- Reusable across competition, medication, and status contexts

### Countdown Timer Display
*Established: Screen 47. Used on: 47*

- Inline text: "2d 14h 32m" format
- Text: 14pt Sora Semibold, orange (#FF5E00)
- Updates in real-time (per-minute)
- Urgent (<24h): text pulses, color shifts to error-red

### Progress Bar Chart
*Established: Screen 47. Used on: 47*

- Grouped horizontal bars comparing participants
- Bar height: 8pt per participant, 4pt gap
- Colors: orange (user), white at 30% (opponents)
- Labels: participant name (13pt Regular) + value (13pt Semibold)
- Chart card: ink-brown-800, --r-xl (28pt), 24pt padding

### Chat Preview Card
*Established: Screen 47. Used on: 47*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Last message preview: 13pt Regular, white at 70%, 1 line max
- Sender avatar (24pt) + name (13pt Semibold) + timestamp (12pt Regular, white at 40%)
- Unread count badge (if applicable)
- Tap: opens competition chat

### Invitation Badge Card
*Established: Screen 47. Used on: 47*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Orange left border: 3pt, orange at 60%
- Inviter avatar + name + competition name
- "accept" orange pill (40pt) + "decline" ghost button
- Haptic: medium impact on accept

### AI Competition Preview Sheet
*Established: Screen 47. Used on: 47*

- Standard bottom sheet modal spec
- SIA-generated competition recommendation
- Purple left border accent (3pt, royal-purple at 40%)
- Predicted difficulty, suggested teammates
- "create" orange CTA + "not now" ghost link

### Leave Confirmation Sheet
*Established: Screen 47. Used on: 47*

- Standard bottom sheet modal spec
- Warning icon (24pt, amber) + confirmation text (16pt Semibold)
- Consequence description: 14pt Regular, white at 70%
- "leave" red-tinted CTA + "stay" ghost button

### Intelligence Score Ring
*Established: Screen 48. Used on: 48*

- Diameter: 160pt, 8pt stroke, centered
- Track: white at 10%
- Fill: gradient from orange to green based on score
- Center: score value (36pt Sora Bold, white) + "/100" (14pt Regular, white at 50%)
- Label below: "Intelligence Score" (13pt Semibold, white at 50%)
- Mount animation: fill from 0, 520ms ease-flow

### Contradiction Alert Card
*Established: Screen 48. Used on: 48*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Amber left border: 3pt, amber (#F59E0B) at 60%
- Alert icon (16pt, amber) + contradiction description (15pt Semibold, white)
- Detail: 13pt Regular, white at 70%
- Action: "resolve" orange text link

### Correlation Row
*Established: Screen 48. Used on: 48*

- Height: 56pt
- Two metric labels connected by arrow icon (16pt, white at 40%)
- Correlation strength: color-coded dot (green = strong positive, red = negative, amber = weak)
- Description: 13pt Regular, white at 50%

### Best Day Checklist
*Established: Screen 48. Used on: 48*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "Your best day" heading (16pt Semibold, white)
- Checklist items: green checkmarks (16pt) + habit/action names (14pt Regular, white at 80%)
- AI-generated from historical data patterns

### Prediction Display
*Established: Screen 48. Used on: 48*

- Purple dashed border: 1.5pt, royal-purple at 40%, --r-xl
- Prediction text: 15pt Regular, white at 80%
- Confidence level: 13pt Semibold, purple at 60% + bar indicator
- SIA attribution: "SIA prediction" (11pt Semibold, purple at 40%)

### Insight Feedback Row
*Established: Screen 48. Used on: 48*

- Height: 44pt
- Inline thumbs-up / thumbs-down icons (20pt, white at 40%)
- Tapped: selected icon fills orange, light haptic
- "Was this useful?" label: 13pt Regular, white at 40%

### Knowledge Graph Link Card
*Established: Screen 48. Used on: 48*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Two connected nodes with a line between
- Node: 32pt circle, domain color fill at 20%, domain icon centered
- Link line: 2pt, white at 15%
- Label: 13pt Regular, white at 60%, below link
- Tap: navigates to related insight

### Weight Trend Chart
*Established: Screen 49. Used on: 49*

- Same base spec as Line Chart (180pt height, ink-brown-800 card)
- Past data line: 2pt solid, orange
- Goal line: 1pt dashed, green (#34A853)
- Fill area below: orange at 5% opacity
- Time range chips below: 7d | 30d | 90d | all

### Body Stats Row
*Established: Screen 49. Used on: 49*

- Horizontal row of 3–4 stat tiles
- Each: value (18pt Semibold, white) + label (12pt Regular, white at 50%) + delta indicator (green/red arrow + 12pt text)
- Same Stat Tile layout adapted for body metrics

### Measurement Row
*Established: Screen 49. Used on: 49*

- Height: 52pt
- Left: body part icon (20pt, white at 60%)
- Content: measurement name (15pt Semibold, white) + current value (15pt Regular, white at 70%)
- Right: delta (13pt Semibold, green or red) + "cm" / "in" unit

### Photo Timeline Strip
*Established: Screen 49. Used on: 49*

- Horizontal scrollable row of thumbnail photos
- Each thumbnail: 80pt x 80pt, --r-md (14pt), 2pt gap
- Date label below: 11pt Regular, white at 40%
- Selected: 2pt orange border
- Tap: opens full-screen photo viewer

### Photo Comparison Mode
*Established: Screen 49. Used on: 49*

- Side-by-side layout: two photos, each 50% width minus 8pt gap
- Date labels above each photo: 13pt Semibold, white
- Swipe horizontally on either side to change comparison photo
- Draggable center divider line: 2pt, orange, vertical

### Privacy Notice
*Established: Screen 49. Used on: 49, 60*

- Compact inline notice: lock icon (14pt, white at 40%) + text (12pt Regular, white at 40%)
- "Photos stored on-device only" / "Data encrypted at rest"
- No card bg, sits below sensitive sections
- Reusable across progress photos and medication

### Add Progress Bottom Sheet
*Established: Screen 49. Used on: 49*

- Standard bottom sheet modal spec
- Camera/gallery picker + weight input field + measurement fields
- Photo preview: 120pt square, --r-md
- "save" orange CTA

### AI Analysis Badge
*Established: Screen 49. Used on: 49*

- Inline badge: purple (#7F24FF) at 15% bg, --r-pill, 22pt height
- "AI analyzed" text: 11pt Semibold, purple
- Appears on photos/measurements that SIA has processed
- Tap: shows SIA analysis detail

### Read-Only Field
*Established: Screen 50. Used on: 50*

- Same dimensions as Text Input Field (52pt height, full-width minus margins)
- Background: ink-brown-800 at 50% opacity (dimmer than editable)
- Text: 16pt Sora Regular, white at 50%
- No focus state, no border change on tap
- Lock icon: 14pt, white at 30%, right-aligned (optional)

### Phone Input with Country Code
*Established: Screen 50. Used on: 50*

- Composite field: country code picker (80pt wide) + phone number input
- Country code: flag emoji (16pt) + code (15pt Regular, white) + dropdown chevron
- Divider: 1pt white at 10%, vertical
- Total height: 52pt, same border spec as Text Input Field

### Timezone Selector with Auto-Detect
*Established: Screen 50. Used on: 50*

- Dropdown field: 52pt height, ink-brown-800 bg, --r-md
- Auto-detected value shown with "auto-detected" badge (11pt, green at 60%)
- Dropdown chevron: right-aligned, 14pt, white at 40%
- Tap: opens searchable timezone list modal

### Avatar Upload Section
*Established: Screen 50. Used on: 50*

- Center-aligned, 96pt diameter circle
- Photo: fills circle with object-fit cover
- Empty state: user icon (40pt, white at 30%) on ink-brown-800 bg
- Camera overlay badge: 28pt circle, orange bg, camera icon (14pt, white), bottom-right of avatar
- Tap: opens photo picker (camera/gallery)

### Dirty Form Tracking
*Established: Screen 50. Used on: 50*

- Visual indicator: "unsaved changes" text (13pt Semibold, amber) in nav bar area
- Save button: enabled only when form is dirty (orange), disabled when clean (40% opacity)
- Back navigation with unsaved changes: triggers confirmation sheet

### Voice Call History Card
*Established: Screen 51. Used on: 51*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Call type icon (20pt, white at 60%) + title (15pt Semibold, white)
- Duration: 13pt Regular, white at 50%
- Emotion Trend Emoji row (inline)
- Timestamp: 12pt Regular, white at 40%
- Tap: opens call detail / playback

### Upcoming Call Card
*Established: Screen 51. Used on: 51*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Orange left border: 3pt, orange at 60%
- Scheduled time: 16pt Semibold, orange
- Call description: 14pt Regular, white at 70%
- "join" orange pill CTA (40pt height)

### Emotion Trend Emoji
*Established: Screen 51. Used on: 51*

- Inline row of 3–5 emoji representing emotional arc of a call
- Size: 20pt each, 4pt gap
- Ordered left-to-right (start to end of call)
- Subtle connecting line below: 1pt, white at 10%

### Emotion Trend Visualization
*Established: Screen 51. Used on: 51*

- Mini sparkline chart: 80pt wide x 24pt tall
- Line: 2pt, gradient from red (negative) through amber to green (positive)
- No axes, no labels — purely visual
- Context: displayed on call history cards

### Listen Again Card
*Established: Screen 51. Used on: 51*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Play icon (20pt, orange) + call title (14pt Semibold, white) + duration (13pt Regular, white at 50%)
- Progress bar: 4pt height, orange fill, --r-pill (shows playback position)
- Tap: begins audio playback inline

### AI Mode Tab Switcher
*Established: Screen 51. Used on: 51*

- 2-segment control: "all calls" | "SIA calls"
- Same spec as Segmented Control (40pt height, --r-pill)
- Active segment: orange bg, white text

### AI Mode Filter Chips
*Established: Screen 51. Used on: 51*

- Horizontal scrollable chip row (same spec as Filter Chip Row)
- Chips: "coaching", "check-in", "crisis", "scheduled"
- Multi-select: multiple chips can be active simultaneously
- Active: orange bg, white text. Inactive: ink-brown-800, white at 60%

### Action Item Row with Source
*Established: Screen 51. Used on: 51*

- Height: 52pt
- Checkbox (24pt, left) + action text (14pt Regular, white) + source badge (right)
- Source badge: 11pt Semibold, purple at 60% text, purple at 10% bg, --r-pill ("from call #3")
- Tap checkbox: completes action item

### Schedule Call Modal
*Established: Screen 51. Used on: 51*

- Standard bottom sheet modal spec
- Date/time picker + call type selector (chips)
- Reminder toggle + note input
- "schedule" orange CTA

### Cancel Confirmation Sheet
*Established: Screen 51. Used on: 51, 47*

- Standard bottom sheet modal spec
- Warning text: 16pt Semibold, white
- Consequence description: 14pt Regular, white at 70%
- "cancel call" red-tinted CTA + "keep" ghost button
- Reusable for call cancellation and competition leave

### Trigger Multi-Select Chips
*Established: Screen 52. Used on: 52*

- Horizontal wrapping chip layout, multi-select
- Chip: 32pt height, --r-pill, ink-brown-800 bg, 1pt white at 10% border
- Text: 13pt Sora Regular, white at 70%
- Selected: amber (#F59E0B) at 15% bg, amber text, 1pt amber border
- Examples: "work", "social", "sleep", "diet", "exercise"

### Relief Tool Quick Action Cards
*Established: Screen 52. Used on: 52*

- 2-column grid of cards, 8pt gap
- Each: 120pt tall, ink-brown-800, --r-xl (28pt), 16pt padding
- Icon: 32pt, white at 70%, centered
- Label: 14pt Semibold, white, center-aligned below icon
- Examples: "breathe", "journal", "walk", "call friend"
- Tap: navigates to respective tool screen

### Breathing Circle
*Established: Screen 53. Used on: 53*

- Centered circle, 200pt diameter at rest
- Animates: expands to 280pt (inhale) → holds → contracts to 200pt (exhale)
- Fill: orange (#FF5E00) at 20% opacity, pulsing
- Border: 2pt, orange at 60%
- Glow: --glow-orange, intensity follows circle size
- Phase label below: "breathe in" / "hold" / "breathe out" (17pt Semibold, white)

### Active Session Immersive Mode
*Established: Screen 53. Used on: 53, 54, 55*

- Full-screen takeover: tab bar hidden, status bar dimmed
- Background: ink-900, no cards
- Minimal UI: breathing circle / timer + phase label + stop button only
- Stop button: 48pt circle, white at 10% bg, "x" icon (20pt, white at 60%)
- Reusable for breathing, meditation, and yoga sessions

### Post-Session Effectiveness Rating
*Established: Screen 53. Used on: 53, 54*

- Full-width card appearing after session ends
- "How effective was this?" (16pt Semibold, white)
- 5-star or 5-circle rating row: 32pt each, 12pt gap
- Unselected: white at 20%. Selected: orange fill
- Optional: text input for notes (80pt tall)
- Reusable across breathing and meditation

### "When to Use" Contextual Filter Tags
*Established: Screen 53. Used on: 53*

- Horizontal scrollable tag row
- Tags: "before sleep", "anxiety", "focus", "morning", "break"
- Same visual spec as Filter Chip Row (36pt height, --r-pill)
- Filters available breathing exercises

### Breathing Exercise Card
*Established: Screen 53. Used on: 53*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Exercise name (16pt Semibold, white) + pattern (e.g., "4-7-8")
- Duration: 13pt Regular, white at 50%
- Difficulty: 3 dots (filled = harder), 8pt each
- Contextual tags below: small chips (24pt height)
- Tap: starts session in immersive mode

### Practice Card
*Established: Screen 54. Used on: 54*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Practice name (16pt Semibold, white) + type (13pt Regular, white at 50%)
- Duration: 14pt Semibold, orange
- Rating Circle Row below (compact)
- Tap: opens practice detail / starts session

### Active Session Overlay
*Established: Screen 54. Used on: 54*

- Same as Active Session Immersive Mode
- Additional: ambient background gradient (subtle purple at 5% radial)
- Timer display: 36pt Sora Bold, white, centered
- Timer Controls row below

### Timer Controls
*Established: Screen 54. Used on: 54, 55*

- Horizontal row: pause/play (48pt circle, white at 10% bg) + stop (48pt circle, white at 10% bg)
- Icons: 24pt, white
- Pause: "||" icon. Play: ">" icon. Stop: square icon
- Active state: orange bg on play
- Reusable for meditation and yoga

### Post-Session Feedback View
*Established: Screen 54. Used on: 54*

- Full-screen view replacing session overlay
- Session summary: duration, type, date (15pt Regular, white at 70%)
- Effectiveness rating (reuses Post-Session Effectiveness Rating)
- "save & close" orange CTA

### Pulsing Breathe Circle
*Established: Screen 54. Used on: 54*

- 80pt diameter, orange at 10% fill, 2pt orange at 30% border
- Gentle scale pulse: 1.0 to 1.05 to 1.0, continuous, 3000ms loop
- Decorative indicator on meditation practice cards
- Non-interactive

### Rating Circle Row
*Established: Screen 54. Used on: 54*

- 5 circles in a row: 24pt each, 8pt gap
- Empty: white at 15% fill. Filled: orange fill
- Represents difficulty or quality rating
- Tap: sets rating (fills up to tapped circle)

### SIA Recommended Practice Card
*Established: Screen 54. Used on: 54*

- Same base as Practice Card
- Purple left border: 3pt, royal-purple at 40%
- "recommended by SIA" badge: 11pt Semibold, purple at 60%, --r-pill, purple at 10% bg
- SIA reasoning: 13pt Regular, white at 50%, 1 line

### Yoga Streak Banner
*Established: Screen 55. Used on: 55*

- Full-width minus 32pt, 56pt height
- Background: gradient (orange at 8% left to transparent right), --r-xl (28pt)
- Flame icon (20pt, orange) + streak count (16pt Semibold, orange) + "day streak" (14pt Regular, white at 60%)
- Compact, sits above session cards

### Pose Timer Ring
*Established: Screen 55. Used on: 55*

- Same base as Circular Countdown (120pt diameter, 6pt stroke)
- Track: white at 10%
- Fill: orange, counterclockwise sweep
- Center: time remaining (28pt Semibold, white, "0:30")
- Pose name below: 15pt Semibold, white

### Session Card
*Established: Screen 55. Used on: 55*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Session name (16pt Semibold, white) + style tag (13pt Regular, white at 50%)
- Duration + difficulty rating (circle dots row)
- Pose count: 13pt Regular, white at 40%
- Tap: starts yoga session

### Pose Grid Card
*Established: Screen 55. Used on: 55*

- 3-column grid of pose thumbnails within a card
- Each cell: 80pt x 80pt, ink-900 bg, --r-md (14pt)
- Pose illustration/icon: centered, 48pt, white at 60%
- Pose name below: 11pt Regular, white at 40%, center-aligned
- Scroll if >6 poses (2 rows visible)

### Difficulty Rating Row
*Established: Screen 55. Used on: 55*

- Inline row: "difficulty" label (13pt Regular, white at 40%) + 5 dots (8pt each, 4pt gap)
- Filled: orange. Empty: white at 15%
- Non-interactive (display only)

### Post-Session Summary Card
*Established: Screen 55. Used on: 55*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "Session complete" heading (18pt Semibold, white)
- Stats row: duration, calories, poses completed (Stat Tile layout)
- XP earned badge (reuses XP Earned Badge pattern)
- "share" ghost button + "done" orange CTA

### Active Session View
*Established: Screen 55. Used on: 55*

- Same as Active Session Immersive Mode
- Additional: current pose name + Pose Timer Ring + next pose preview
- Transition between poses: crossfade (280ms ease-out-soft)

### YouTube Integration Card
*Established: Screen 55. Used on: 55*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Video thumbnail: 120pt x 68pt, --r-md, left-aligned
- Play overlay: 32pt circle, white at 80%, centered on thumbnail
- Title (14pt Semibold, white) + channel (12pt Regular, white at 40%)
- Tap: opens YouTube player (in-app WebView or deep link)

### Recipe Card
*Established: Screen 56. Used on: 56*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Recipe name (16pt Semibold, white) + Diet Plan Tags (inline)
- Prep time + cook time: 13pt Regular, white at 50%, with clock icon (14pt)
- Calories: 14pt Semibold, orange
- Star Rating (inline, compact)
- Optional: thumbnail image (80pt x 80pt, --r-md, right side)
- Tap: opens Recipe Detail Layout

### AI Suggestion Card (Recipe)
*Established: Screen 56. Used on: 56*

- Purple left border: 3pt, royal-purple at 40%
- "SIA suggests" label: 11pt Semibold, purple at 60%
- Recipe recommendation with reasoning (13pt Regular, white at 70%)
- "view recipe" orange text link
- Card: ink-brown-800, --r-xl (28pt), 24pt padding

### Recipe Detail Layout
*Established: Screen 56. Used on: 56*

- Full-screen detail: hero image (200pt, full-width) + scrollable content below
- Serving Adjuster (inline)
- Ingredients list: checkbox per item (24pt, left) + ingredient (15pt Regular, white)
- Steps: numbered list (16pt Semibold number, orange) + instruction (15pt Regular, white at 80%)
- Nutrition card: 4-column macro breakdown (reuses Stat Tile layout)

### Serving Adjuster
*Established: Screen 56. Used on: 56*

- Inline stepper: minus (28pt circle, ink-brown-800, white icon) + count (16pt Semibold, white) + plus (28pt circle, orange bg, white icon)
- Label: "servings" (13pt Regular, white at 50%)
- Adjusts ingredient amounts proportionally

### Star Rating
*Established: Screen 56. Used on: 56, 58, 69*

- 5 stars in a row: 24pt each, 8pt gap
- Empty: white at 15%. Filled: amber (#F59E0B)
- Tappable: sets rating on tap
- Display-only variant: non-interactive, smaller (16pt)
- Reusable across recipes, sleep quality, and app rating

### Diet Plan Tag
*Established: Screen 56. Used on: 56*

- Pill: 22pt height, --r-pill
- Background: nutrition-lime (#84CC16) at 15%
- Text: 11pt Semibold, nutrition-lime
- Examples: "keto", "vegan", "high-protein", "gluten-free"
- Multiple tags inline with 6pt gap

### Swipeable List Row with Dual Actions
*Established: Screen 57. Used on: 57*

- Height: 52pt
- Left swipe: reveals "delete" (red bg) action
- Right swipe: reveals "edit" (orange bg) action
- Threshold: >30% of row width to trigger
- Content: checkbox (24pt) + item name (15pt Semibold, white) + Source Badge
- Haptic: light impact at threshold

### Inline Add Input
*Established: Screen 57. Used on: 57, 62*

- Appears inline within a list, same height as list rows (52pt)
- Input: 15pt Sora Regular, white, no border, transparent bg
- Placeholder: "add item..." (white at 30%)
- Submit: return key or checkmark icon (right-aligned, 20pt, orange)
- Reusable for shopping list and quick notes

### Source Badge
*Established: Screen 57. Used on: 57*

- Pill: 20pt height, --r-pill, ink-900 bg
- Text: 10pt Sora Semibold, white at 50%
- Variants: "from recipe" (nutrition-lime text), "manual" (white at 40%), "SIA" (purple text)
- Indicates origin of shopping list item

### Category-Grouped Shopping List
*Established: Screen 57. Used on: 57*

- SectionList with sticky category headers
- Category header: 13pt Semibold, white at 40%, uppercase, same spec as Date Group Header (Sticky)
- Items grouped by: produce, dairy, protein, pantry, etc.
- Collapse/expand per category: chevron rotation (280ms)

### Purchased Item Delayed Move
*Established: Screen 57. Used on: 57*

- On checkbox tap: item text gets strikethrough + 50% opacity
- After 1200ms delay: item slides down to "purchased" section (280ms ease-out-soft)
- Allows undo during delay window
- Haptic: success notification on move complete

### Last Night Summary Card
*Established: Screen 58. Used on: 58*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "Last night" heading (16pt Semibold, white)
- Sleep duration: 28pt Sora Bold, white (e.g., "7h 23m")
- Quality Star Rating (inline, 5 stars)
- Sleep tags below: Sleep Tag Chips
- Stat row: time asleep, time awake, sleep score

### Sleep Trend Bar Chart
*Established: Screen 58. Used on: 58*

- 7 vertical bars (same layout as Water Weekly Bar Chart)
- Bar fill: blue-tinted (#4FC3F7) graduated opacity
- Goal line: 1pt dashed, green (#34A853)
- Each bar shows hours slept
- Day labels below: 12pt Regular, white at 40%

### Bedtime Consistency Visualization
*Established: Screen 58. Used on: 58*

- 7-day horizontal chart: each day shows a horizontal bar from bedtime to wake time
- Bar: 12pt height, blue-tinted (#4FC3F7) at 60%, --r-pill
- Ideal range overlay: green (#34A853) at 8% horizontal band
- Time axis: 12pt Regular, white at 30% (10pm, 12am, 2am, etc.)
- Chart height: ~120pt

### Quality Star Rating
*Established: Screen 58. Used on: 58*

- Reuses Star Rating pattern (5 stars, 24pt, amber fill)
- Context-specific label: "sleep quality" (13pt Regular, white at 50%)

### Sleep Tag Chip
*Established: Screen 58. Used on: 58*

- Same spec as Emotion Tag Chips but sleep-specific
- Chip: 28pt height, --r-pill, ink-brown-800 bg, 1pt white at 10% border
- Examples: "restless", "deep sleep", "dreams", "noise"
- Multi-select, 8pt gap

### Wearable Sync Badge
*Established: Screen 58. Used on: 58*

- Inline badge: green (#34A853) at 15% bg, --r-pill, 22pt height
- Device icon (14pt) + "synced" text: 11pt Semibold, green
- Variants: "synced" (green), "syncing..." (amber + spinner), "disconnected" (white at 40%)

### Current Streak Hero Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-2xl (40pt), 32pt padding
- Large streak count: 48pt Sora Bold, orange (#FF5E00), centered
- "day streak" label: 16pt Regular, white at 60%, centered below
- Flame icon: 32pt, orange, above count
- Background glow: radial gradient, glow-orange at 15%
- Height: ~180pt

### Streak Calendar
*Established: Screen 59. Used on: 59*

- Same base as Month Calendar Grid (7-column, date numbers)
- Active streak days: orange (#FF5E00) circle bg
- Missed days: white at 10% bg
- Freeze days: blue-tinted (#4FC3F7) circle bg with snowflake icon
- Today: orange ring (2pt), no fill
- Current month navigation: left/right chevrons + month label

### XP Multiplier Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "XP Multiplier" heading (14pt Semibold, white at 60%)
- Current multiplier: 24pt Sora Bold, orange (e.g., "2.5x")
- Progress to next tier: 6pt progress bar, orange fill, --r-pill
- Next tier label: 13pt Regular, white at 50%

### Streak Freeze Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Snowflake icon (24pt, blue-tinted #4FC3F7) + "Streak Freezes" heading (15pt Semibold, white)
- Available count: 16pt Semibold, white (e.g., "2 remaining")
- "use freeze" CTA: ghost button, 40pt height, white at 60% border
- Tap: triggers Freeze Confirmation Sheet

### Streak Milestone Ladder
*Established: Screen 59. Used on: 59*

- Vertical ladder layout with connected nodes
- Node: 32pt circle, connected by 2pt vertical line
- Achieved: orange fill + white checkmark icon
- Current target: orange ring (2pt), pulsing (800ms loop)
- Future: white at 15% fill
- Milestone labels right of nodes: "7 days", "30 days", "100 days" (14pt Semibold, white)
- Reward description: 12pt Regular, white at 50%

### Freeze Confirmation Sheet
*Established: Screen 59. Used on: 59*

- Standard bottom sheet modal spec
- Snowflake icon (32pt) + "Use a streak freeze?" heading
- Explanation: 14pt Regular, white at 70%
- "use freeze" orange CTA + "cancel" ghost button

### Streak History Row
*Established: Screen 59. Used on: 59*

- Height: 56pt
- Content: streak period (15pt Semibold, white, e.g., "Jan 5 – Feb 12") + duration (14pt Regular, white at 50%, "38 days")
- Right: XP earned (13pt Semibold, orange)

### Medication Check Row
*Established: Screen 60. Used on: 60*

- Height: 64pt
- Left: large checkbox (28pt, --r-xs). Checked: green (#34A853) fill + white checkmark. Unchecked: white at 20% border
- Content: medication name (15pt Semibold, white) + dosage (13pt Regular, white at 50%) + scheduled time (13pt Regular, white at 40%)
- Right: Status Indicator Dot (taken/upcoming/missed)
- Tap checkbox: marks as taken, success haptic

### Medication Card
*Established: Screen 60. Used on: 60*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Medication name (16pt Semibold, white) + dosage (14pt Regular, white at 50%)
- Frequency: 13pt Regular, white at 40%
- Adherence mini-bar: 4pt height, green fill, --r-pill (last 7 days)
- Tap: opens medication detail

### Adherence Summary Bar
*Established: Screen 60. Used on: 60*

- Full-width minus 32pt, 8pt height, --r-pill
- Track: white at 8%
- Fill: green (#34A853) based on adherence %
- Label above: "adherence" (13pt Semibold, white) + "92%" right-aligned (13pt Semibold, green)
- Below 80%: fill changes to amber. Below 50%: fill changes to error-red

### Interactions Warning Banner
*Established: Screen 60. Used on: 60*

- Full-width minus 32pt, ink-brown-800 bg, --r-xl (28pt), 16pt padding
- Red left border: 3pt, error-red at 60%
- Warning icon (20pt, error-red) + "Interaction alert" (15pt Semibold, white)
- Detail: 13pt Regular, white at 70%
- Medications involved: 13pt Semibold, orange
- Tap: opens interaction detail

### Privacy Notice Card
*Established: Screen 60. Used on: 60*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Lock icon (16pt, white at 40%) + privacy text (13pt Regular, white at 50%)
- Same concept as inline Privacy Notice but wrapped in a card
- Used for more prominent privacy messaging

### Add Medication Modal
*Established: Screen 60. Used on: 60*

- Standard bottom sheet modal spec
- Medication name input + dosage input + frequency selector (chips)
- Time picker for scheduled doses
- Reminder Offset Selector below time picker
- "add medication" orange CTA

### Reminder Offset Selector
*Established: Screen 60. Used on: 60*

- Horizontal chip row: "at time" | "5 min before" | "15 min before" | "30 min before"
- Same spec as Filter Chip Row (36pt, --r-pill)
- Single-select: one chip active at a time

### Task Row
*Established: Screen 61. Used on: 61*

- Height: 56pt
- Left: checkbox (24pt, --r-xs). Checked: orange fill + white checkmark. Unchecked: white at 20% border
- Content: task name (15pt Semibold, white) + due date (13pt Regular, white at 40%)
- Right: Priority Pill + domain tag chip
- Swipe-left: edit / delete
- Completed: strikethrough + 50% opacity

### Reminder Row
*Established: Screen 61. Used on: 61*

- Height: 52pt
- Left: bell icon (20pt, white at 60%)
- Content: reminder text (15pt Semibold, white) + time/recurrence (13pt Regular, white at 50%)
- Right: toggle switch (on/off)
- Tap row: edit reminder

### Priority Pill Selector
*Established: Screen 61. Used on: 61*

- 3-segment pill: "low" | "med" | "high"
- Low: white at 20% bg, white at 50% text
- Medium: amber (#F59E0B) at 15% bg, amber text
- High: error-red at 15% bg, error-red text
- Height: 24pt, --r-pill
- Tappable: cycles through priorities

### Day Circle Selector
*Established: Screen 61. Used on: 61*

- 7 circles in a horizontal row (M, T, W, T, F, S, S)
- Each: 36pt diameter, 8pt gap
- Unselected: white at 10% bg, 13pt Semibold, white at 40%
- Selected: orange bg, white text
- Multi-select: multiple days can be active

### Notification Channel Toggles
*Established: Screen 61. Used on: 61*

- Vertical list of notification channels
- Each row: icon (20pt) + channel name (15pt Regular, white) + toggle switch (right-aligned)
- Channels: "push", "email", "SMS"
- Height per row: 48pt

### Task Color Selector
*Established: Screen 61. Used on: 61*

- Horizontal row of 8 color circles: 28pt each, 12pt gap
- Colors: domain colors + white + orange
- Selected: 2pt white ring, offset 2pt
- Tap: assigns color to task

### Tag Input
*Established: Screen 61. Used on: 61*

- Text input field (same spec as Text Input Field)
- Below field: existing tags displayed as removable chips (same as Domain Tag Chip "editable" variant)
- Autocomplete suggestions dropdown: ink-brown-800, --r-md, --shadow-2
- Suggestion row: 44pt, 15pt Regular, white at 70%

### Add Chooser Bottom Sheet
*Established: Screen 61. Used on: 61*

- Standard bottom sheet modal spec
- 2–3 large buttons: "add task" | "add reminder" | "add note"
- Each: 56pt height, full-width, ink-brown-800 bg, --r-lg
- Icon (24pt) + label (16pt Semibold, white), left-aligned
- Divider: 1pt white at 5% between options

### Smart Suggestion Action Row
*Established: Screen 61. Used on: 61*

- Height: 48pt
- Purple left border: 3pt, royal-purple at 30%
- SIA lightbulb icon (16pt, purple at 60%) + suggestion text (14pt Regular, white at 70%)
- "add" orange text link (right-aligned)
- SIA-generated task/reminder recommendations

### Quick Add Bar
*Established: Screen 62. Used on: 62*

- Fixed at bottom, above tab bar, z-30
- Height: 52pt, full-width, ink-brown-800 bg, 1pt white at 8% top border
- Input: 40pt tall, transparent bg, 15pt Regular, white
- Placeholder: "jot something down..." (white at 30%)
- Submit: orange send icon (20pt), right side
- Expands to multi-line on focus (80pt max)

### Global Bottom Sheet Trigger
*Established: Screen 62. Used on: 62*

- Persistent pull-up handle at bottom of certain screens
- Handle: 36pt wide x 4pt tall pill, white at 15%, centered
- Pull-up gesture: reveals Quick Add Bar in a bottom sheet
- Allows note creation from any screen context

### Undo Toast
*Established: Screen 62. Used on: 57, 62*

- Height: 44pt, auto-width + 32pt horizontal padding
- Background: ink-brown-800, --r-pill, --shadow-2
- Content: action text (14pt Regular, white at 70%) + "undo" (14pt Semibold, orange)
- Position: centered horizontally, 16pt above tab bar
- Auto-dismiss: 4 seconds (slide-down + fade)
- Reusable for note deletion, shopping list changes

### Auto-Tag Shimmer
*Established: Screen 62. Used on: 62*

- Applied to newly created notes as SIA analyzes content
- Shimmer animation: subtle lighter pulse sweeping left-to-right
- Duration: continuous until tags are assigned
- On complete: domain tag chips fade-in (280ms) below note

### Offline Sync Indicator
*Established: Screen 62. Used on: 62*

- Compact inline: cloud icon (14pt, white at 30%) + "saved offline" (11pt Regular, white at 30%)
- Synced variant: green checkmark (14pt) + "synced" (11pt Regular, green at 60%)
- Position: below note timestamp
- Transition between states: crossfade (280ms)

### Energy Slider
*Established: Screen 63. Used on: 63*

- Same base spec as Wellbeing Slider (full-width minus 32pt, 44pt touch target)
- Track gradient: red → amber → green (low to high energy)
- Thumb: 28pt circle, white fill, --shadow-2
- 5 snap points with haptic feedback at each
- Labels: emoji indicators at each snap point (e.g., battery empty to full)

### Current Energy Display
*Established: Screen 63. Used on: 63*

- Large centered display: emoji (48pt) + energy level text (24pt Sora Bold, white)
- Color matches current level: red (1), amber (2-3), green (4-5)
- Subtle glow behind emoji matching level color

### Energy Sparkline Timeline
*Established: Screen 63. Used on: 63*

- Full-width minus 32pt, 48pt height
- Line: 2pt, gradient matching energy levels
- X-axis: hours of day (6am to 10pm), 11pt Regular, white at 30%
- Dot markers at logged entries: 6pt circles
- No Y-axis labels — purely visual

### Chronotype Badge Card
*Established: Screen 63. Used on: 63*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Chronotype icon (24pt) + type name (15pt Semibold, white, e.g., "Night Owl")
- Description: 13pt Regular, white at 50%
- SIA-determined from energy patterns

### Context Tag Auto-Select
*Established: Screen 63. Used on: 63*

- Same chip layout as Emotion Tag Chips
- Tags auto-selected based on time of day and recent activity
- Auto-selected: orange border with subtle pulse (800ms, once)
- User can deselect or add additional tags
- Examples: "post-workout", "morning", "after meal"

### Report Context Object
*Established: Screen 64. Used on: 64*

- Card: ink-brown-800, --r-xl (28pt), 16pt padding
- Preview of reported content: avatar (32pt) + name + content snippet (13pt Regular, white at 50%)
- Non-interactive (read-only context for the report form)
- Subtle red tint: 1pt error-red at 15% border

### Co-located Block Toggle
*Established: Screen 64. Used on: 64*

- Inline with report form: "also block this user" toggle
- Same Toggle Switch spec but with label inline
- Label: 15pt Sora Regular, white at 70%
- Default: off

### Moderation Success Auto-Dismiss
*Established: Screen 64. Used on: 64*

- Success confirmation screen after report submission
- Green checkmark circle (48pt) + "Report submitted" (17pt Semibold, white)
- Auto-navigates back after 2 seconds
- No user interaction required

### Rate-Limited System Modal
*Established: Screen 64. Used on: 64*

- Center-aligned modal (not bottom sheet): ink-brown-800, --r-2xl (40pt), 32pt padding
- Warning icon (32pt, amber) + heading (17pt Semibold, white)
- Cooldown timer: 16pt Semibold, orange, counting down
- "OK" single CTA button
- Backdrop: ink-900 at 60%, tap outside to dismiss

### Force Update Gate
*Established: Screen 65. Used on: 65*

- Full-screen, no navigation, no dismissal
- Background: ink-900
- Brand symbol: 48pt, centered, orange
- Heading: 20pt Sora Bold, white, "Update required"
- Description: 15pt Regular, white at 70%, center-aligned
- Store Deep Link CTA: full-width orange pill (Brand CTA Button spec)
- No back button, no skip, Hardware Back Block

### Store Deep Link CTA
*Established: Screen 65. Used on: 65*

- Same spec as Brand CTA Button
- Text: "Update now" (17pt Semibold, white)
- Tap: deep links to App Store / Play Store listing
- Only interactive element on Force Update Gate

### Hardware Back Block
*Established: Screen 65. Used on: 65*

- Android-specific: intercepts hardware back button, prevents app exit
- No visual treatment — behavioral pattern only
- Back press shows subtle toast: "Please update to continue" (Undo Toast spec)

### Pre-Permission Screen
*Established: Screen 66. Used on: 66*

- Full-screen layout before OS permission dialog
- Brand symbol: 48pt, centered, orange
- Heading: 20pt Sora Bold, white, center-aligned (e.g., "Stay on track")
- 3 Benefit Rows stacked vertically
- CTA: "Enable notifications" orange pill (Brand CTA Button spec)
- Skip: "not now" Easy-Out Link at bottom

### Benefit Row with Color-Coded Icon
*Established: Screen 66. Used on: 66*

- Height: 56pt
- Left: 36pt circle, domain/feature color at 15% bg, icon (20pt, matching color)
- Content: benefit title (15pt Semibold, white) + description (13pt Regular, white at 50%)
- 3 rows, each with different color: orange (reminders), green (progress), purple (SIA coaching)

### Open Settings Fallback
*Established: Screen 66. Used on: 66*

- Shown when OS permission was previously denied
- Same layout as Pre-Permission Screen
- CTA changes to "Open Settings" (opens iOS/Android Settings app)
- Additional text: "You previously declined..." (14pt Regular, white at 50%)

### Full-Screen Search Overlay
*Established: Screen 68. Used on: 68*

- z-50, full-screen, ink-900 bg
- Search input at top: 52pt height, auto-focused, orange cursor
- Cancel button: right of input, "cancel" (15pt Semibold, white at 60%)
- Results below, full-screen scroll
- Entry: slide-down from top (280ms ease-out-soft)
- Exit: slide-up + fade (280ms)

### SIA Suggestion Row
*Established: Screen 68. Used on: 68*

- Height: 56pt
- Left: purple SIA icon (20pt, #7F24FF)
- Content: suggestion text (15pt Regular, white at 80%)
- Right: chevron (12pt, white at 20%)
- Purple left border accent: 2pt, royal-purple at 30%
- Tap: executes SIA suggestion

### Query Match Highlighting
*Established: Screen 68. Used on: 68*

- Matching text segments: bold weight (Sora Semibold) + orange color (#FF5E00)
- Non-matching text: normal weight, white at 70%
- Applied to all result row text fields

### Category Filter Chips with Count Badges
*Established: Screen 68. Used on: 68*

- Same base as Filter Chip Row (36pt, --r-pill, horizontal scroll)
- Each chip includes count badge: 16pt circle, orange bg, white text (10pt Semibold)
- Badge position: top-right of chip, overlapping by 4pt
- Examples: "goals (5)", "habits (12)", "journal (8)"

### Search Result Deep-Linking
*Established: Screen 68. Used on: 68*

- Behavioral pattern: each result row stores navigation route
- Tap: navigates directly to source screen and element
- Visual: standard row with domain tag + result type icon
- No specific visual treatment — uses destination screen's row style

### 8 Result Row Variants
*Established: Screen 68. Used on: 68*

Universal search returns 8 specialized result row types:
- **Goal**: progress ring (24pt) + goal name + domain tag
- **Habit**: checkbox (20pt) + habit name + streak
- **Journal**: date + mood emoji + text preview
- **Recipe**: recipe name + prep time + calorie count
- **Person**: avatar (32pt) + name + relationship
- **Medication**: pill icon + name + dosage
- **Task**: checkbox + task name + due date
- **SIA insight**: purple dot + insight text

Each row: 56pt height, standard left/content/right layout

### Inline Error Banner
*Established: Screen 68. Used on: 68*

- Full-width minus 32pt, 44pt height, --r-md (14pt)
- Background: error-red at 10%
- Border: 1pt, error-red at 30%
- Content: warning icon (16pt, error-red) + error message (14pt Regular, error-red)
- Auto-dismiss after 5 seconds or tap to dismiss
- Use: "no results found", "search failed", network errors

### Pull-Down-to-Open-Search
*Established: Screen 68. Used on: 68*

- Behavioral gesture pattern on primary screens
- Pull down beyond refresh threshold (~80pt): opens Full-Screen Search Overlay
- Visual hint: search icon fades in during pull (above refresh spinner)
- Release: triggers search overlay entry animation

### Happy Path First Rating Flow
*Established: Screen 69. Used on: 69*

- Behavioral flow: asks "enjoying Balencia?" before showing Star Rating Row
- Positive response: shows Star Rating Row + "rate on App Store" CTA
- Negative response: shows feedback form instead (text area + "send feedback" CTA)
- Card: ink-brown-800, --r-xl (28pt), 24pt padding

### Deferred Trigger Pattern
*Established: Screen 69. Used on: 69*

- Behavioral pattern: rating prompt appears only after positive events
- Triggers: after streak milestone, after goal completion, after 7+ days of use
- Max frequency: once per 30 days
- No visual treatment — logic-only pattern

### Double-Tap Confirmation
*Established: Screen 69. Used on: 69*

- First tap on "rate" CTA: button text changes to "tap again to confirm"
- Button briefly flashes (160ms) to indicate state change
- Second tap: opens App Store rating dialog
- Resets after 3 seconds if no second tap

### Star Rating Row
*Established: Screen 69. Used on: 69*

- Reuses Star Rating pattern at larger size: 36pt stars, 12pt gap
- Centered horizontally
- Interactive: tap to set rating
- Below: dynamic CTA changes based on rating (4-5 stars → "rate on App Store", 1-3 stars → "tell us how to improve")

---

## SIA (AI Coach) Patterns

### SIA Greeting Card
*Established: Screen 12. Used on: 12*

- ink-brown-800 card, --r-xl (28pt), 24pt padding
- Purple (#7F24FF) left border accent: 4pt wide, 60% opacity
- SIA avatar: 24pt circle, ink-brown-800 bg with 2pt purple ring, top-left
- "SIA" label: 12pt Semibold, white at 50%
- Message: 15pt Regular, white at 90%, 2–3 lines max
- Optional mood chip row below (4 chips, 32pt, pill, 8pt gap)
- Tap: tab switch to SIA Chat
- Height: ~120pt

### SIA Coaching Note Card — Compact Variant
*Established: Screen 26 (canonical). Used on: 26, 27, 28, 32, 34, 35, 36*

- ink-brown-800 card with glassmorphism (1pt white at 6% border), --r-xl (28pt)
- Purple dot: 6pt circle, #7F24FF, 16pt from left edge, vertically centered with first text line
- Message: 15pt Sora Regular, white, 32pt from card left, max 3 lines
- Height: 56–72pt (variable)
- Tap: navigates to SIA Chat with domain context pre-loaded

### SIA Coaching Note Card — Contextual Variant
*Established: Screen 30 (canonical). Used on: 14, 16, 30, 33*

- ink-brown-800 card, --r-xl (28pt), 24pt padding
- Purple (#7F24FF) left border: 3pt wide, 40% opacity
- SIA avatar: 16pt circle with purple gradient fill (on some screens)
- "ask SIA" link: 13pt Sora Semibold, purple at 60%, right-aligned or below text
- Message: 14–15pt Sora Regular, white at 80%, 2–3 lines
- Height: ~72–80pt
- Tap: navigates to SIA Chat with context

### SIA Inline Upgrade Card (Chat Variant)
*Established: Screen 43. Used on: 43*

In-chat upsell card:
- Left-aligned like a SIA message card (~280pt wide)
- ink-brown-800 bg, --r-xl (28pt) corners, 24pt padding
- Top: lock icon (16pt, white at 40%) + feature name (16pt Semibold, white)
- Description: 15pt Regular, white at 70%
- CTA button: orange fill, white text, --r-pill, 44pt height, full card width minus 32pt
- "maybe later" link: 13pt Regular, white at 40%, centered
- Orange left border accent: 3pt, orange at 40%

### SIA Processing Animation
*Established: Screen 15. Used on: 15*

- Three dots: 8pt circles, orange, 12pt gap, sequential pulse (scale 1 to 1.4 to 1, 160ms stagger)
- Status text: 15pt Regular, white at 50%, updates during processing
- Minimum display: 800ms (perceived intelligence)

### SIA Real-Time Note (Active Workout)
*Established: Screen 27. Used on: 27*

- Compact inline: 40pt height
- Purple dot (6pt, #7F24FF) + message (13pt Regular, white, 1 line max)
- Messages rotate based on workout context (fade in + translateY, 280ms)

### Ask SIA Shortcut Card
*Established: Screen 14. Used on: 14, 25*

- ink-brown-800, --r-xl (28pt), 24pt padding, single-row layout
- Chat bubble icon (20pt, orange) + "ask SIA about this goal" (15pt Semibold, white) + chevron (14pt, white at 40%)
- Height: 56pt
- Tap: tab switch to SIA Chat with context pre-loaded

### SIA Suggestion Card
*Established: Screen 33. Used on: 33*

- SIA-generated suggestion with action buttons
- "do it" orange pill + "skip" transparent pill
- Auto-generated by SIA based on relationship patterns

### SIA Inspiration Prompt Card
*Established: Screen 36. Used on: 36*

- Subtle amber gradient (top 5% opacity)
- SIA-generated creative prompt
- Card: ink-brown-800, --r-xl (28pt)

### Daily Study Prompt / Daily Reflection Card
*Established: Screen 34 (reflection), Screen 35 (study). Used on: 34, 35*

- Dashed border card (35) or solid card with thought icon (34)
- SIA prompt text in italic style
- "write reflection" or "start session" link
- Card: ink-brown-800, --r-xl (28pt)

### SIA Recommended Practice Card
*Established: Screen 54. Used on: 54*

- Same base as Practice Card (ink-brown-800, --r-xl, 24pt padding)
- Purple left border: 3pt, royal-purple at 40%
- "recommended by SIA" badge: 11pt Semibold, purple at 60%, --r-pill, purple at 10% bg
- SIA reasoning text: 13pt Regular, white at 50%, 1 line
- Tap: opens practice detail / starts session

### SIA Suggestion Row (Search)
*Established: Screen 68. Used on: 68*

- Height: 56pt
- Left: purple SIA icon (20pt, #7F24FF)
- Content: SIA-generated search suggestion (15pt Regular, white at 80%)
- Right: chevron (12pt, white at 20%)
- Purple left border accent: 2pt, royal-purple at 30%
- Appears in universal search results alongside regular results

---

## RPG / Gamification Patterns

### Domain Stat Score (0-99)
*Established: Screen 19. Used on: 16, 19*

Each domain is scored 0-99, auto-calculated from real activity data. The scale mirrors FIFA player ratings — cognitively parseable at a glance. No manual allocation.

- Formula: `domain_stat = (consistency * 0.40) + (depth * 0.35) + (trend * 0.25)`
  - **Consistency (40%)**: Active days in last 28 days relative to user's expected cadence
  - **Depth (35%)**: Quality/intensity of engagement. Domain-specific sub-stats drive this.
  - **Trend (25%)**: Compares last 14 days to prior 14 days. Positive trend lifts; declining drags down.
- Display: 28pt Sora Bold, white (on domain skill card), 20pt Semibold (in domain list row)
- Change indicator: green arrow up or red arrow down (12pt, inline), shown when stat changes by ≥2 since last calculation

### Domain Sub-Stats Bottom Sheet
*Established: Screen 19. Used on: 19*

Tap a domain skill card → bottom sheet reveals qualitative sub-stat breakdowns. Sub-stats are NOT shown as numbers — they appear as labeled progress bars with tier labels.

- Sheet: standard bottom sheet spec (--r-lg top corners, drag handle, ink-brown-800 bg)
- Domain name header: 18pt Semibold, domain color
- Domain stat score: 28pt Bold, white, right-aligned in header
- Sub-stat rows (3-5 per domain):
  - Label: 15pt Regular, white at 80% (e.g., "Strength", "Endurance", "Flexibility")
  - Progress bar: 6pt height, domain color fill, --r-pill, white at 8% track
  - Tier label: 12pt Regular, white at 50%, right-aligned (e.g., "Developing", "Proficient")
- Milestone tier badges: 7 tiers calibrated to behavior change research (Newcomer → Developing → Established → Proficient → Advanced → Expert → Mastery)

### Per-Domain XP Level Card
*Established: Screen 19. Used on: 19*

Each domain card in the skills grid shows both a level (1-25) and a stat score (0-99). These are distinct:
- **Domain level**: Cumulative XP-based, never decreases. Driven by logged actions.
- **Domain stat**: Activity-based snapshot, can rise or fall. Driven by consistency/depth/trend.

Card layout (within 3-column grid):
- Size: equal-width columns with 8pt gap, ~100pt height
- Background: ink-brown-800, --r-md (14pt)
- Top: domain color dot (8pt) + domain abbreviation (12pt Semibold, domain color)
- Center: stat score (24pt Bold, white)
- Bottom: "Lv.N" (12pt Semibold, white at 60%) + mini XP bar (4pt height, domain color fill, --r-pill)
- Mastery tier dot: 6pt circle, right of domain abbreviation, colored by mastery tier (gray/white/green/blue/purple/orange/gold) — visible from Phase 4 onward
- Tap: opens Domain Sub-Stats Bottom Sheet

XP curve (logarithmic): `xp_required(level) = 100 * level^1.5`
- Level 1: 0 XP → Level 5: 800 XP → Level 10: 3,162 XP → Level 15: 5,809 XP → Level 25: 12,500 XP

### Overall Character Level
*Established: Screen 19. Used on: 12, 17, 19, 39*

Aggregates all domain stats into a single level (1-25 normal range):
- `overall_power = weighted_average(all active domain stats) + balance_bonus`
- `balance_bonus = (min_active_stat / max_active_stat) * 10`
- `level = floor(overall_power / 4) + 1`
- Active domains = domains with > 0 activity in last 90 days
- Display: "Level N" in character card hero, level badge on home screen header

### Recovery Multiplier Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "Rest day bonus" heading: 14pt Semibold, white at 60%
- Multiplier: 20pt Bold, forest-green (#34A853) (e.g., "1.3x tomorrow")
- Description: 13pt Regular, white at 50% ("Earned from yesterday's rest day")
- When a user takes a deliberate rest day (marked or via streak freeze), next active day earns 1.3x XP on all actions
- Stacks with streak multiplier but caps at 2.0x total

### XP Multiplier Stack
*Used on: 19, 59*

Final XP calculation:
```
final_xp = base_xp
  * cross_domain_synergy_bonus (max 1.15)    [Phase 4+]
  * party_buff (1.10 if in active squad)      [Phase 5+]
  * recovery_multiplier (1.30 if post-rest)
  * streak_multiplier (1.0x / 1.5x / 2.0x)

total cap: 2.0x
```
Diminishing returns: if a user logs activities across 7+ domains in a single day, XP for the 8th+ domain actions is reduced to 50%.

### Domain Level-Up Toast
*Established: Screen 42. Used on: 42*

When a domain gains a level (e.g., Fitness Level 7 → 8):
- Small Win Toast variant: domain color icon (20pt) + "Fitness Level 8" (15pt Semibold, white) + "+25 XP bonus" (14pt Semibold, orange)
- Same positioning and timing as Small Win Toast (top of screen, 3s auto-dismiss)
- AI coach mentions it in next coaching message

### Radar Vertex Pulse
*Established: Screen 16. Used on: 16*

Micro-celebration when a domain stat increases from new activity:
- Affected vertex dot scales 1.0 → 1.6 → 1.0 (400ms ease-out-soft)
- Polygon edge adjacent to vertex glows in domain color (280ms fade-in, 600ms fade-out)
- No toast, no overlay — purely visual feedback on the radar chart itself

### XP Earned Badge
*Established: Screen 27. Used on: 27, 38, 42*

- Badge: orange at 15% bg, --r-pill, 16pt horizontal / 8pt vertical padding
- Text: "+NN XP" in 20pt Sora Semibold, Burnt Orange
- Glow: --glow-orange behind badge
- Animation: scale from 0.5 to 1.0 + orange glow pulse, 520ms ease-flow

### XP Progress Bar
*Established: Screen 27. Used on: 19, 27, 42*

- Full-width minus 32pt, 8pt height, --r-pill
- Track: white at 8%
- Fill: Burnt Orange (#FF5E00)
- Animates from old position to new, 520ms ease-flow
- Level label above: "Fitness Lv.12" (15pt Semibold, white)
- Percentage right-aligned: "(89%)" (13pt Regular, white at 50%)

### XP Float Animation
*Established: Screen 32. Used on: 12, 27, 32, 38*

- "+NNxp" text floats up 24–64pt from trigger point
- Fades from full opacity to 0
- Duration: 520ms (compact) to 1200ms (celebration)
- 14pt Sora Semibold, orange

### RPG Skill Badge (Domain Level)
*Established: Screen 26. Used on: 26, 28, 30, 32, 33, 34, 35, 36, 39*

- Text: "Lv.N" in 13pt Sora Semibold
- Color: domain color text on domain color at 15% bg
- Shape: --r-pill, 8pt horizontal / 4pt vertical padding
- Position: right side of Domain Dashboard Header
- Pressed: scale(0.95), bg opacity increases to 25%
- Tap: push to RPG Character screen

### Level-Up Bar Animation
*Established: Screen 42. Used on: 42*

- XP bar fills to 100%, overflows with orange glow, resets to new level starting position
- Duration: 1200ms (Signature)
- Easing: ease-flow

### Current Streak Hero Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-2xl (40pt), 32pt padding
- Large streak count: 48pt Sora Bold, orange (#FF5E00), centered
- "day streak" label: 16pt Regular, white at 60%, centered below
- Flame icon: 32pt, orange, above count
- Background glow: radial gradient, glow-orange at 15%
- Height: ~180pt

### Streak Calendar
*Established: Screen 59. Used on: 59*

- Same base as Month Calendar Grid (7-column, date numbers)
- Active streak days: orange (#FF5E00) circle bg
- Missed days: white at 10% bg
- Freeze days: blue-tinted (#4FC3F7) circle bg with snowflake icon
- Today: orange ring (2pt), no fill
- Current month navigation: left/right chevrons + month label

### XP Multiplier Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- "XP Multiplier" heading (14pt Semibold, white at 60%)
- Current multiplier: 24pt Sora Bold, orange (e.g., "2.5x")
- Progress to next tier: 6pt progress bar, orange fill, --r-pill
- Next tier label: 13pt Regular, white at 50%

### Streak Freeze Card
*Established: Screen 59. Used on: 59*

- Card: ink-brown-800, --r-xl (28pt), 24pt padding
- Snowflake icon (24pt, blue-tinted #4FC3F7) + "Streak Freezes" heading (15pt Semibold, white)
- Available count: 16pt Semibold, white (e.g., "2 remaining")
- "use freeze" CTA: ghost button, 40pt height, white at 60% border
- Tap: triggers Freeze Confirmation Sheet

### Streak Milestone Ladder
*Established: Screen 59. Used on: 59*

- Vertical ladder layout with connected nodes
- Node: 32pt circle, connected by 2pt vertical line
- Achieved: orange fill + white checkmark icon
- Current target: orange ring (2pt), pulsing (800ms loop)
- Future: white at 15% fill
- Milestone labels right of nodes: "7 days", "30 days", "100 days" (14pt Semibold, white)
- Reward description: 12pt Regular, white at 50%

### Streak History Row
*Established: Screen 59. Used on: 59*

- Height: 56pt
- Content: streak period (15pt Semibold, white, e.g., "Jan 5 – Feb 12") + duration (14pt Regular, white at 50%, "38 days")
- Right: XP earned (13pt Semibold, orange)

### Inline Goal Celebration
*Established: Screen 44. Used on: 44*

- Triggered when daily water goal is met (reusable for any inline goal completion)
- Brief green glow pulse (600ms) on the progress ring/bar
- Checkmark icon fades in (280ms) + "Goal reached!" toast (Small Win Toast spec)
- Confetti: none (reserved for full celebrations)

### Mini Confetti Burst
*Established: Screen 47. Used on: 47*

- Lightweight celebration: 12–15 particles, localized to a card/element
- Colors: orange, green, gold
- Duration: 800ms, particles fall + fade
- Trigger: competition win, challenge completed
- Smaller scale than Full-Screen Celebration Overlay confetti

### Mission Type Badge
*Established: Screen 13 (Phase 2). Used on: 12, 13, 14, 15, 73*

Small metallic-toned pill indicating mission scope. Colors are deliberately muted/metallic to avoid collision with the 10 saturated domain colors.

- Size: 24pt tall, auto-width, 10pt horizontal padding, pill radius (999pt)
- Typography: 11pt Sora Semibold
- Placement: inline with domain tag chips, before domain tags, 8pt gap between badge and first tag

| Type | Background | Text Color | Token |
|------|-----------|------------|-------|
| Life (Epic) | #D4A017 at 20% | #D4A017 | mission-gold |
| Main | #A8A9AD at 20% | #A8A9AD | mission-silver |
| Side | #CD7F32 at 20% | #CD7F32 | mission-bronze |
| Weekly | #5B7FA5 at 20% | #5B7FA5 | mission-steel |
| Daily | #6B8E6B at 20% | #6B8E6B | mission-sage |
| Group | #B87333 at 20% | #B87333 | mission-copper |

- Life badge: subtle shimmer gradient sweep (left→right, 3s loop). Reduced-motion: static.
- Screen reader: "[type] mission" (e.g., "main mission")
- Variants: default (inline with tags), standalone (centered, used on Mission Detail [14] hero area)

### Chain Progress Bar
*Established: Screen 13 (Phase 2). Used on: 13, 14*

Thin horizontal indicator showing a mission's position in a sequential chain.

- Size: full parent width, 4pt bar height, 8pt top margin above bar
- Track: white at 8%, pill radius
- Step dots (centered on track line):
  - Completed: 6pt diameter, green (#34A853) fill
  - Current: 8pt diameter, orange (#FF5E00) fill, subtle pulse (scale 1→1.15→1, 1.2s loop, ease-flow). Reduced-motion: static orange.
  - Upcoming: 6pt diameter, white at 20% fill
- Connecting segments: 2pt wide, white at 8%, between dots
- Label: "2 of 4" — 11pt Sora Regular, white at 40%, right-aligned, positioned 4pt above bar
- Tap entire bar → expand to show chain name + mission titles (bottom sheet on Mission Board [13], inline on Mission Detail [14])
- Screen reader: "Mission chain, step [current] of [total]"

### Difficulty Tier Indicator
*Established: Screen 13 (Phase 2). Used on: 13, 14*

Small colored dot showing mission difficulty relative to the user's current domain level.

- Dot size: 8pt diameter, placed inline with stats (after streak text on goal cards, as a row in stats card on detail)
- 3 visible tiers (collapsed from RPG spec's 6):
  - Easy (Beginner + Apprentice): green (#34A853)
  - Moderate (Journeyman + Expert): orange (#FF5E00)
  - Hard (Master + Grand Master): #EF4444 (red)
- Tap dot → tooltip: "This mission is [easy/moderate/hard] for your current [domain] level ([level])" — ink-brown-800 floating card, 12pt radius, 12pt padding, 13pt Sora Regular, white at 80%. Auto-dismiss after 3s or tap outside.
- Screen reader: "[difficulty] difficulty for your [domain] level"

### Pinned Mission Card
*Established: Screen 12 (Phase 2). Used on: 12*

Vertical card for pinned missions on the Home screen. Replaces the Phase 1 horizontal Progress Ring Card scroll.

- Size: full-width minus 32pt (16pt margins), ~100pt tall
- Surface: ink-brown-800 (#211008), 28pt radius, 24pt padding
- Layout (inside card):
  - Left column (64pt wide): Progress Ring small (36pt), centered vertically
  - Right column (remaining width, 12pt gap from left):
    - Row 1: Mission name — 16pt Sora Semibold, white, 2 lines max (truncate)
    - Row 2: Mission Type Badge + Domain Tag Chip(s), inline, 8pt gap, 4pt top margin
    - Row 3: "Next: [action text]" — 13pt Sora Regular, white at 70%, 1 line truncate, 4pt top margin
    - Row 4: XP + Streak — "⚡ [##] XP" (12pt Sora Semibold, orange) + "🔥 [##]d" (12pt Sora Semibold, white at 60%), 8pt gap, 8pt top margin
  - Pin icon: 12pt, white at 30%, absolute positioned top-right (8pt inset from card padding)
- Gestures:
  - Tap card → stack push to Mission Detail [14]
  - Tap "Next:" row → complete action inline (checkbox appears, same completion animation as Action Card on Home [12])
- States: active (default), completed (green ring, 70% opacity), paused (gray ring, 60% opacity)
- Motion: card entry fade-in + translateY(12→0), 280ms ease-out-soft, staggered 80ms per card

### SIA Mission Suggestion Card
*Established: Screen 13 (Phase 2). Used on: 13*

Card for AI-generated mission recommendations the user hasn't yet accepted.

- Surface: ink-brown-800 (#211008), 28pt radius, 16pt padding
- Purple left border accent: 2pt wide, #7F24FF at 40% (counts toward max-2 purple elements per screen)
- Content layout:
  - Row 1: Mission name — 15pt Sora Semibold, white
  - Row 2: Suggested Mission Type Badge + Domain Tag Chip(s), 4pt top margin
  - Row 3: SIA reasoning — 13pt Sora Regular, white at 50%, 2 lines max, 4pt top margin
  - Row 4: Action row — "accept" (15pt Sora Semibold, orange) + "dismiss" (15pt Sora Semibold, white at 40%), 16pt gap between, right-aligned, 8pt top margin
- Gestures:
  - Tap "accept" → mission added to board (Create Mission [15] opens with pre-filled data)
  - Tap "dismiss" → card collapses (height→0, fade-out, 280ms ease-out-soft)
- Screen reader: "SIA suggests: [mission name], [type], [domain]. Accept or dismiss."
- Haptic: light impact on accept, none on dismiss

### Stalled Mission Nudge
*Established: Screen 14 (Phase 2). Used on: 14*

SIA coaching card shown when a mission has 7+ days with no progress on any action.

- Surface: ink-brown-800 (#211008), 28pt radius, 24pt padding
- Amber left border accent: 2pt wide, #F59E0B at 50%
- Content layout:
  - "SIA" label: 11pt Sora Semibold, white at 40%, top-left
  - Coaching message: 15pt Sora Regular, white at 80%, 2-3 lines. Compassionate tone — "It's been a while since you worked on this. Want to adjust the plan?"
  - Action chips row (12pt top margin): horizontal scroll
    - Each chip: 32pt tall, pill radius, ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 60%
    - Options: "adjust timeline" | "reduce scope" | "pause" | "archive"
    - 8pt gap between chips
- Tap actions:
  - "adjust timeline" → inline date picker for milestone adjustment
  - "reduce scope" → opens Create/Edit [15] in edit mode with SIA simplification suggestion
  - "pause" → pauses mission (existing behavior from Quick Actions Menu)
  - "archive" → confirmation: "Archive this mission? You'll receive [##] XP for your progress so far." Two buttons: "archive" (orange text) + "cancel" (white at 40%)
- Not a purple element — amber border distinguishes from SIA coaching notes
- Screen reader: "SIA nudge: [message]. Options: adjust timeline, reduce scope, pause, archive."
- Condition: only appears when mission.days_since_last_action >= 7

---

## Domain-Specific Patterns

### Domain Dashboard Header
*Established: Screen 26 (canonical). Used on: 26, 28, 30, 32, 33, 34, 35, 36*

- Height: 56pt, FIXED (sticky on scroll, z-30, backdrop-blur)
- Background: ink-900
- Sub-elements:
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: 20pt Sora Semibold, white, left-aligned 56pt from left. "Fitness & workouts", "Nutrition", "Finance", etc.
  - Domain accent line: 2pt height, domain color, extends from title left to ~60% width, 4pt below title baseline
  - RPG Skill Badge: right-aligned, 16pt from right edge

### Collapsing Header Variant
*Established: Screen 35. Used on: 35*

- Expanded: 88pt (includes subtitle or additional info)
- Collapsed: 48pt (on scroll)
- Transition: 160ms ease-out-soft

### 7-Day Calendar Dot Row
*Established: Screen 26. Used on: 26, 28, 34, 35, 38*

- Horizontal row, evenly spaced, full-width minus 32pt
- Day label: 12pt Regular, white at 40%, centered above dot (M, T, W, etc.)
- Dot: 12pt diameter circle
  - Completed: Burnt Orange fill (or domain color)
  - Planned not done: white at 20%, 1pt dashed white at 30% border
  - Today (upcoming): white at 10%, subtle pulse (800ms loop, ease-flow)
  - Rest day: dash in white at 20%
- Row height: 40pt

### Calendar Heatmap (4-Week)
*Established: Screen 38. Confirmed by: 36*

- 7 columns x 4 rows grid
- Cell size: 28pt squares (38), 32pt squares (36)
- Gap: 4pt
- Color: graduated domain color at 20–100% opacity based on completion
- Month label below: 13pt Regular, white at 40%

### Macro Progress Bar
*Established: Screen 28. Used on: 28, 29*

4 horizontal bars for daily macros:
- Calories bar fill: orange (#FF5E00)
- Protein/carbs/fat bars: white at 70% fill
- Track: white at 8%, 8pt height, --r-pill
- Label: macro name + current/target (13pt Regular)

### Water Intake Tracker
*Established: Screen 28. Used on: 28*

- 8 glass icons in a horizontal row
- Filled: blue-tinted white at 80%
- Empty: white at 20%
- Tap: fill next glass (one at a time)
- Size: 24pt per icon, 8pt gap

### Meal Row
*Established: Screen 28. Used on: 28, 29*

- Meal type icon + name + calorie count
- Time: 13pt Regular, white at 50%
- Height: ~56pt

### Donut Chart
*Established: Screen 29. Used on: 29*

- Protein segment: orange
- Carbs segment: white at 40%
- Fat segment: white at 20%
- Center: total calories (20pt Bold)
- Size: 120pt diameter

### Portion Selector
*Established: Screen 29. Used on: 29*

- Stepper control: minus/plus buttons flanking amount
- Unit selector: g, oz, cups, etc.

### Meal Type Selector
*Established: Screen 29. Used on: 29*

- 4-segment segmented control: breakfast | lunch | dinner | snack
- Same spec as standard Segmented Control

### Quick-Add Row
*Established: Screen 29. Used on: 29*

- [+] button expands to: portion selector + confirm button
- Collapsed: food name + calories + "+" button
- Expanded: portion controls + "add" orange pill

### Barcode Scanner Half-Sheet
*Established: Screen 29. Used on: 29*

- Camera view in modal half-sheet (~50% screen)
- Scan frame overlay with orange corners
- Auto-detect barcode and populate food data

### Spending Trend Chart
*Established: Screen 30. Used on: 14, 30*

- Orange solid line: past/actual data
- Purple dashed line: projected/AI-predicted trend
- Green milestone dots (on Goal Detail variant)
- Time range toggle: 7d | 30d
- Chart height: ~120pt

### AI Reminder Card
*Established: Screen 33. Used on: 33*

- Orange warning icon + reminder text
- Swipeable: swipe to dismiss or act
- SIA-generated based on relationship patterns

### Upcoming Date Row
*Established: Screen 33. Used on: 33, 41*

- Date + event name + domain tag
- Countdown: "in 3 days"
- Height: 48pt

### Contemplation Timer Shortcut
*Established: Screen 34. Used on: 34*

- Dual-card layout: 2 equal-width cards, 12pt gap
- Each card: timer mode name + duration + start icon
- Card: ink-brown-800, --r-xl (28pt)

### Stress Gauge
*Established: Screen 52. Used on: 52*

- Semicircular gauge, 160pt wide x 80pt tall
- Stroke: 8pt
- Track: white at 10%
- Fill: gradient from green (low stress) through amber to red (high stress)
- Needle indicator: 2pt line, white, radiates from center
- Center label: stress level (20pt Semibold, white) + "/10" (14pt Regular, white at 50%)
- Mount animation: needle sweeps from 0, 520ms ease-flow

### Stress Slider
*Established: Screen 52. Used on: 52*

- Same base as Wellbeing Slider spec
- Track gradient: green (#34A853) → amber (#F59E0B) → red (#F44336)
- 10 snap points with haptic feedback
- Labels: "calm" (left) and "overwhelmed" (right), 12pt Regular, white at 40%

### Trigger Donut Chart
*Established: Screen 52. Used on: 52*

- Size: 120pt diameter
- Segments colored by trigger category (domain colors)
- Center: most common trigger name (14pt Semibold, white)
- Legend below: trigger name + percentage, 12pt Regular, white at 60%
- Tap segment: highlights and shows detail

### Mental Recovery Gauge
*Established: Screen 52. Used on: 52*

- Same semicircular gauge as Stress Gauge but inverted color scale
- Fill: gradient from red (depleted) to green (recovered)
- Label: "Recovery" (13pt Semibold, white at 50%) above gauge
- Center: percentage (20pt Semibold, white)

### Weight Trend Chart
*Established: Screen 49. Used on: 49*

- Same base spec as Line Chart (180pt height, ink-brown-800 card)
- Past data line: 2pt solid, orange
- Goal line: 1pt dashed, green (#34A853)
- Fill area below: orange at 5% opacity
- Time range chips below: 7d | 30d | 90d | all

### Bedtime Consistency Visualization
*Established: Screen 58. Used on: 58*

- 7-day horizontal chart: each day shows a horizontal bar from bedtime to wake time
- Bar: 12pt height, blue-tinted (#4FC3F7) at 60%, --r-pill
- Ideal range overlay: green (#34A853) at 8% horizontal band
- Time axis: 12pt Regular, white at 30% (10pm, 12am, 2am, etc.)
- Chart height: ~120pt

### Sleep Trend Bar Chart
*Established: Screen 58. Used on: 58*

- 7 vertical bars, evenly spaced, full-width minus 32pt
- Bar fill: blue-tinted (#4FC3F7) at graduated opacity
- Goal line: 1pt dashed, green (#34A853)
- Each bar shows hours slept
- Day labels below: 12pt Regular, white at 40%

### Medication Check Row
*Established: Screen 60. Used on: 60*

- Height: 64pt
- Left: large checkbox (28pt, --r-xs). Checked: green (#34A853) fill + white checkmark. Unchecked: white at 20% border
- Content: medication name (15pt Semibold, white) + dosage (13pt Regular, white at 50%) + scheduled time (13pt Regular, white at 40%)
- Right: Status Indicator Dot (taken/upcoming/missed)

### Adherence Summary Bar
*Established: Screen 60. Used on: 60*

- Full-width minus 32pt, 8pt height, --r-pill
- Track: white at 8%
- Fill: green (#34A853) based on adherence %
- Label above: "adherence" (13pt Semibold, white) + percentage right-aligned (13pt Semibold, green)
- Below 80%: fill changes to amber. Below 50%: fill changes to error-red

### Energy Slider
*Established: Screen 63. Used on: 63*

- Same base spec as Wellbeing Slider (full-width minus 32pt, 44pt touch target)
- Track gradient: red → amber → green (low to high energy)
- Thumb: 28pt circle, white fill, --shadow-2
- 5 snap points with haptic feedback at each
- Labels: emoji indicators at each snap point

### Energy Sparkline Timeline
*Established: Screen 63. Used on: 63*

- Full-width minus 32pt, 48pt height
- Line: 2pt, gradient matching energy levels
- X-axis: hours of day (6am to 10pm), 11pt Regular, white at 30%
- Dot markers at logged entries: 6pt circles
- No Y-axis labels — purely visual

---

## Chart & Data Visualization Patterns

### Line Chart (Progress Over Time)
*Established: Screen 14. Used on: 14, 30, 35*

- Chart area: ~180pt tall, inside ink-brown-800 card (--r-xl 28pt, 24pt padding)
- X-axis: time (12pt Regular, white at 30%)
- Y-axis: value (12pt Regular, white at 30%)
- Past data line: 2pt solid, orange (#FF5E00), dot markers (6pt circles, orange fill)
- Projected line: 2pt dashed, purple (#7F24FF) at 60%
- Milestone markers: 8pt circles, green (#34A853), on data line
- Fill area below past line: orange at 5% opacity
- Grid lines: 1pt, white at 3%, horizontal only
- Time range selector below: chip buttons (28pt tall)
- Line draw animation: 520ms ease-flow

### Radar Chart (Life Wheel)
*Established: Screen 16. Used on: 16, 19*

- Diameter: 280pt canvas, centered
- Axes: 10 (one per life domain — FIT, SLP, CAR, NUT, FIN, FAI, PRO, REL, WEL, MED)
- Grid rings: 5 concentric at stat values 20, 40, 60, 80, 99 — white at 5%, 1pt
- Axis lines: white at 8%, 1pt
- Data polygon: orange at 15% fill + orange at 80% stroke (2pt). The shape itself tells the story — a circle = balanced, a spiky star = specialist.
- Vertex dots: 8pt circles, domain color
- Domain labels: 11pt Semibold, white at 70%, 12pt beyond chart edge, abbreviated (FIT, SLP, etc.)
- Touch target: 44x44pt per axis label. Tap axis → domain dashboard (stack push)
- Mount animation: vertices grow from center, 520ms ease-flow
- Time range change: vertices morph, 280ms ease-out-soft
- **Growth animation**: When a stat increases from new activity, the vertex dot pulses (scale 1.0→1.4→1.0, 600ms) and the polygon edge glows in the domain color (280ms fade)
- **Comparison overlay**: "vs Last Week" and "vs Last Month" views show current polygon (solid) + comparison polygon (dashed, white at 30%). Growth areas glow green; decline areas tint red at 20%.
- **Life Power display**: Single number below chart — `sum(all active domain stats) * balance_multiplier`. Displayed as 28pt Sora Bold, orange. Balance multiplier: `1.0 + (0.15 * (1 - coefficient_of_variation(active_stats)))`. Perfectly balanced stats get up to 15% bonus.

### Mini Radar Chart (Preview)
*Established: Screen 13. Used on: 13*

- 40x40pt, simplified, decorative (not interactive)
- Same visual language as full radar, at tiny scale
- Within Life Areas Radar Preview Card (64pt height)

### Circular Countdown (Rest Timer)
*Established: Screen 27. Used on: 27*

- Ring diameter: 120pt, 6pt stroke
- Track: white at 10%
- Fill: Burnt Orange, counterclockwise sweep from 12 o'clock
- Center: time display (32pt Semibold, white, "M:SS")
- "REST" label: 12pt Semibold, white at 40%, above ring
- "Skip rest" below: 15pt Regular, white at 50%
- Completion: ring flashes green (280ms), medium haptic
- Expand/collapse: 280ms ease-out-soft

### Correlations Bar Chart
*Established: Screen 63. Used on: 63*

- Horizontal bars comparing correlation strength between metrics
- Bar height: 12pt, --r-pill
- Positive correlation: green (#34A853) fill, extends right
- Negative correlation: red (#F44336) fill, extends left
- Center axis: 1pt white at 10%, vertical
- Labels: metric name (13pt Regular, white at 60%), left-aligned
- Chart card: ink-brown-800, --r-xl (28pt), 24pt padding

### Progress Bar Chart (Competition)
*Established: Screen 47. Used on: 47*

- Grouped horizontal bars comparing participants
- Bar height: 8pt per participant, 4pt gap
- Colors: orange (user), white at 30% (opponents)
- Labels: participant name (13pt Regular) + value (13pt Semibold)
- Chart card: ink-brown-800, --r-xl (28pt), 24pt padding

### Donut Chart (Trigger Variant)
*Established: Screen 52. Used on: 52*

- Size: 120pt diameter (same as existing Donut Chart)
- Segments: colored by stress trigger category (domain colors)
- Center: most common trigger name (14pt Semibold, white)
- Legend below: trigger name + percentage (12pt Regular, white at 60%)
- Tap segment: highlights and shows tooltip

---

## Typography Patterns

### Font Family
- **UI text**: Sora only — Regular (400), Semibold (600), Bold (700)
- **Logo/wordmark**: Chillax ExtraBold (800) — splash screen only, not for UI

### Mobile Type Scale

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Screen title (large) | 24–28pt | Bold (700) | 1.2 | Home, Goals List, auth headings |
| Screen title (nav bar) | 17pt | Semibold (600) | 1.3 | Collapsed/scrolled titles |
| Section heading | 18–20pt | Semibold (600) | 1.3 | Card titles, section headers |
| Card title | 16–17pt | Semibold (600) | 1.4 | Goal name, action description |
| Body | 15–16pt | Regular (400) | 1.5 | SIA messages, descriptions |
| Caption/meta | 12–13pt | Regular (400) | 1.4 | Timestamps, tertiary info |
| Eyebrow | 12pt | Semibold (600) | 1.3 | Section labels, uppercase, +0.12em tracking |
| Small label | 11pt | Semibold (600) | 1.2 | Domain tag text, tab labels (minimum size) |

### Text Color Hierarchy
- Primary text: white (100%)
- Secondary text: white at 70%
- Tertiary text: white at 50%
- Quaternary text: white at 40%
- Disabled text: white at 30%

### Screen Title Treatment

**Auth/pre-auth (Brand Mode)**:
- 24pt Sora Bold, white, center-aligned
- Sentence case (never Title Case)
- No accent words on functional headings
- 32pt gap below heading

**Product Mode screens**:
- 28pt Sora Bold, white, left-aligned, 16pt left margin
- Collapses to 17pt Semibold center-aligned in nav bar on scroll (160ms crossfade)
- Sentence case
- Max 2 accent words per screen in orange (#FF5E00)
- All UI text: sentence case. No exclamation marks.

---

## Color Patterns

### 60/30/10 Rule Application

Every screen must verify adherence:

- **Orange (#FF5E00) — 60%**: Primary CTAs, active states, progress fills, accent words, active tab indicator, XP badges, schedule times
- **Green (#34A853) — 30%**: Success states (checkmarks, completion), health metrics, completion rings, positive trend indicators, "complete set" buttons, income amounts
- **Purple (#7F24FF) — 10%**: SIA/AI indicators only — max 1–2 purple elements per screen. SIA avatar accent, coaching note left borders, projected data lines on charts

### Domain Colors — Usage Rules
- Domain colors are for **identification only** (tags, dots, accent lines, skill badges)
- **Never** use domain colors for CTAs, primary actions, or UI chrome
- Domain dashboards: domain color appears on header accent line, section eyebrow labels, RPG skill badge only
- All interactive elements remain orange

### Surface Colors
- Background: ink-900 (#0A0A0F)
- Card surface: ink-brown-800 (#211008) with glassmorphism
- Elevated surface: +warm shadow rgba(33, 16, 8, 0.3)
- Text on dark: white at 100%/70%/50%/40%

---

## Motion Patterns

### Timing Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `--dur-fast` / Micro | 160ms | Button press feedback, toggle, tooltip |
| `--dur-base` / Standard | 280ms | Card expand, tab switch, navigation push, content fade |
| `--dur-slow` / Complex | 520ms | Modal present, sheet slide, list reorder, ring fill |
| `--dur-flow` / Signature | 1200ms | Celebration, onboarding reveals, SIA avatar entrance, level-up bar |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-soft` | cubic-bezier(0.22, 0.61, 0.36, 1) | UI default — all standard transitions |
| `--ease-flow` | cubic-bezier(0.65, 0.05, 0.36, 1) | Signature non-linear journey — celebrations, ring fills, line drawing |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Two-way transitions — modals, panels, surface transitions |

### Screen Transitions

| Transition | Use Case | Animation | Duration | Easing |
|------------|----------|-----------|----------|--------|
| Crossfade | Auto-advancing (Splash to Carousel), auth success to main | Simultaneous fade-out/fade-in | 280ms | ease-out-soft |
| Stack push | Forward navigation | Slide in from right (standard iOS) | 280ms | ease-out-soft |
| Stack pop | Back navigation | Slide out to right | 280ms | ease-out-soft |
| Root reset | Auth completion to main app | Auth stack removed, main app crossfades in | 280ms | ease-out-soft |
| In-screen state | Form to confirmation | Crossfade within screen | 520ms | ease-out-soft |
| Modal present | Creation flows, overlays | Slide up from bottom + backdrop fade | 520ms | ease-flow |
| Modal dismiss | Cancel/complete | Slide down + backdrop fade out | 280ms | ease-out-soft |
| Tab switch | Tab bar navigation | Instant (screens pre-mounted) | 0ms | — |

### Content Entry Animation (Staggered Fade-In)
*Used on: all product screens*

- Each element: fade-in (opacity 0 to 1) + translateY(12pt to 0)
- Stagger: 80ms between elements
- Duration per element: 280ms
- Easing: ease-out-soft

### Pull-to-Refresh
*Established: Screen 12. Used on: 12, 13, 16, 26, 28, 30*

- Branded spinner: Balencia symbol appears, rotates continuously
- Trigger threshold: 60pt pull distance
- Orange (#FF5E00) symbol
- Release haptic: medium impact

### Phase Transition Haptics
*Established: Screen 53. Used on: 53, 54*

- Breathing phase changes (inhale → hold → exhale): medium impact haptic at each transition
- Distinct haptic pattern per phase: light (inhale start), medium (hold), light (exhale start)
- Timed to coincide with circle animation phase changes
- Reusable for meditation phase transitions

### Purchased Item Delayed Move
*Established: Screen 57. Used on: 57*

- On checkbox tap: item text gets strikethrough + 50% opacity (immediate)
- After 1200ms delay: item slides down to "purchased" section (280ms ease-out-soft)
- During delay: undo is possible (tap again to uncheck)
- Haptic: success notification when move completes

### Shared Element Transition
*Established: Screen 67. Used on: 67*

- Photo thumbnail morphs into full-screen view: position, size, and corner radius animate simultaneously
- Duration: 280ms ease-out-soft
- Reverse on dismiss: full-screen shrinks back to thumbnail position
- Maintains visual continuity between list and detail views

### Progressive Image Loading
*Established: Screen 67. Used on: 67, 49*

- Phase 1: ink-brown-800 placeholder with skeleton shimmer
- Phase 2: low-resolution blur-up (thumbnail loaded, Gaussian blur 12pt)
- Phase 3: full-resolution crossfade (280ms, blur removed)
- Reusable for photos in timeline strips and image viewers

### Animation Interruption Policy

User navigation always takes priority over in-flight animations. These rules apply globally.

| Scenario | Behavior |
|----------|----------|
| User taps back during screen entry animation | Animation cancels — elements jump to final position instantly. Navigation proceeds. |
| User taps back during celebration overlay [42] | Overlay dismisses instantly (no exit animation). Navigation proceeds. Celebration is NOT re-queued. |
| User navigates during loading skeleton | Skeleton is abandoned. New screen loads normally. |
| User swipes back during modal entry (520ms) | Modal reverses direction — slides back down from current position (280ms ease-out-soft). |
| App backgrounds during ring-fill / count-up | Animation pauses. On foreground, animation resumes from paused position (not restart). |
| prefers-reduced-motion enabled | All animations except functional transitions (screen push/pop, modal present/dismiss) are replaced with instant state changes (opacity 0→1, no translateY). Celebration overlays show static state (confetti frozen, no particle animation). |

- **No animation queuing**: If two animations would overlap (e.g., entry stagger + incoming toast), the later animation starts immediately — it does not wait for the first to complete.
- **Interruptible by default**: All animations use the Animated API's `useNativeDriver` with `stopAnimation()` support. No animation should block the UI thread.

---

## Interaction Patterns

### 8-State Model (all interactive elements)

1. **Default** — resting appearance
2. **Hover** — N/A on mobile (define for accessibility devices only)
3. **Active/Pressed** — scale(0.95–0.98), slight background darken, light haptic
4. **Focus-visible** — 2pt orange ring (#FF5E00), offset 2pt
5. **Disabled** — 0.4 opacity (40%), no touch response
6. **Loading** — skeleton shimmer or inline spinner
7. **Error** — red border accent (#F44336), error message below
8. **Success** — brief green glow (600ms), success haptic

### Gesture Patterns

| Gesture | Component | Action | Screens |
|---------|-----------|--------|---------|
| Swipe right >30% | Action Card | Complete action (green reveal) | 12, 32 |
| Swipe left >30% | Action Card | Skip action (gray reveal) | 12 |
| Swipe left | Notification Row | Delete | 24 |
| Swipe left | Habit Row | Edit/Delete | 38 |
| Swipe left | AI Reminder Card | Dismiss/Act | 33 |
| Long-press >500ms | Goal Card | Quick Actions Menu | 13 |
| Long-press | FAB (circle) | Expand options | 30 |
| Pull-to-refresh | Screen top | Refresh data | 12, 13, 16, 26, 28, 30 |
| Drag down | Modal handle | Dismiss modal | 15, 37, 43 |
| Drag to reorder | Action rows | Reorder list | 15 |
| Tap outside | Overlays/menus | Dismiss | 13, 43 |
| iOS swipe-right-from-edge | All stack screens | Back navigation | All |

**Gesture Conflict Resolution — Edge Zone Rule**

Screens with horizontal swipe actions on cards (12, 37, 38) must disambiguate between iOS back-swipe and card action swipe:

- **Edge zone (0–20pt from left screen edge)**: Reserved for iOS back navigation. Card swipe gestures do not register in this zone.
- **Card body (>20pt from left edge)**: Card swipe gestures (complete, skip, delete) register normally.
- Implementation: Use `hitSlop` or `activeOffsetX` to exclude the edge zone from the gesture recognizer. Do not disable iOS back navigation on these screens.
- Applies to: All screens using `Swipe right` or `Swipe left` gesture rows above.
| Drag-to-schedule | Calendar events | Move event to time slot | 41 |

### Swipe Action Color Convention

All swipe-reveal actions across the app follow this unified color system. No exceptions.

| Reveal Color | Meaning | Icon | Usage |
|-------------|---------|------|-------|
| Forest Green (#34A853) at 100% | Positive action (complete, accept, approve) | Checkmark (white) | Completing actions [12, 32], accepting reminders [33] |
| Error Red (#F44336) at 100% | Destructive action (delete, remove, leave) | Trash (white) | Deleting notifications [24], removing habits [38], deleting notes [62], removing items [57] |
| White at 10% | Neutral action (edit, archive, secondary) | Pencil or archive icon (white at 70%) | Editing habits [38], archiving items |
| Ink-brown-800 at 50% | Dismiss (skip, snooze) | X or clock icon (white at 50%) | Skipping actions [12], dismissing reminders [33] |

**Rules**:
- **Never use orange** for swipe reveals — orange is reserved for CTAs and tap actions, not swipe surfaces.
- **One action per direction**: Left-swipe reveals one action, right-swipe reveals another. Never stack multiple actions on the same side.
- **Reveal width**: 80pt per action button. Full reveal at >30% of row width.
- **Spring-back**: If swipe doesn't reach 30% threshold, row snaps back (280ms ease-out-soft).
- **Confirm destructive**: Red (delete) actions on important data require a confirmation step — either a second tap on the revealed button, or a confirmation toast with "Undo" (4-second window).

### Haptic Feedback Points

| Trigger | Haptic Type |
|---------|-------------|
| Button press | Light impact |
| Toggle switch | Medium impact |
| Action completion | Success notification |
| Error | Error notification |
| Pull-to-refresh release | Medium impact |
| Swipe action threshold | Light impact |
| FAB press | Medium impact |
| Long-press trigger | Medium impact |
| Set completed (workout) | Medium impact + success notification |
| Rest timer completion | Medium impact (vibration) |
| Segment control change | Medium impact |
| Level-up | Success notification (heavy) |
| Reorder drag lift/drop | Medium impact (lift), light impact (drop) |

### Skeleton Loading States
*Used on: all data-dependent components*

- Shimmer animation: subtle lighter pulse over ink-brown-800 base
- Shape matches content layout (text lines, circles, bars)
- Duration: continuous loop until data loads
- Elements: text lines (varying widths), circular avatars/rings, rectangular cards
- **Minimum display time**: 400ms — even if data returns faster, skeleton stays visible to prevent jarring flash-of-content. After 400ms, crossfade to real content (160ms ease-out-soft).
- **Progressive loading order**: On mixed-content screens, sections load top-to-bottom. Each section transitions independently as its data arrives — do not hold all sections for the slowest endpoint.

### Chrome Toggle (Image Viewer)
*Established: Screen 67. Used on: 67*

- Single tap on image: toggles UI chrome (nav bar, controls) visibility
- Chrome visible: standard nav bar + close button + share button
- Chrome hidden: full-screen image only, status bar dimmed
- Transition: fade-in/fade-out (160ms ease-out-soft)

### Swipe-Down Dismiss
*Established: Screen 67. Used on: 67*

- Drag image downward: image follows finger, background fades to transparent
- Threshold: >30% of screen height or velocity >500pt/s → dismiss
- Below threshold: snaps back (280ms ease-out-soft)
- Dismiss: image scales down + fades out (280ms), returns to source

### Pinch-to-Zoom Canvas
*Established: Screen 67. Used on: 67*

- Min scale: 1.0x (fit to screen)
- Max scale: 4.0x
- Double-tap: toggles between 1.0x and 2.0x (280ms ease-out-soft)
- Pinch: continuous scale with momentum
- Pan: enabled when zoomed past 1.0x

### Gallery Navigation
*Established: Screen 67. Used on: 67*

- Horizontal swipe: navigates between photos in gallery
- Transition: slide-left/slide-right (280ms ease-out-soft)
- Pagination dots below: same spec as Carousel Pagination (8pt dots, orange active pill)
- Counter: "3 of 12" (13pt Regular, white at 50%), top-right of chrome

### Pull-Down-to-Open-Search
*Established: Screen 68. Used on: 68*

- Gesture: pull down on primary screen beyond refresh threshold (~80pt)
- Visual hint: search icon fades in during pull, above refresh spinner
- Release triggers Full-Screen Search Overlay entry animation
- Distinct from Pull-to-Refresh: triggers at higher threshold, shows search icon not spinner

---

## Celebration & Reward Patterns

### Full-Screen Celebration Overlay
*Established: Screen 42. Used on: 42*

- z-50 overlay
- Background: ink-900 at 95%
- Tab bar hidden
- Confetti Particle System: 40–60 particles, colors: orange, green, gold, white
- Achievement Badge: 96pt circle, domain color glow
- XP Count-Up: 0 to final value, 800ms ease-flow, 28pt Bold
- Achievement title: 20pt Semibold
- Continuous Stroke Line: decorative divider, orange at 60%, ~200pt, draws left-to-right
- SIA message: 15pt Regular, italic style, "-- SIA" attribution in purple at 60%
- Share button: secondary ghost style, 160x44pt
- Dismiss hint: "tap anywhere to continue", 13pt Regular, white at 40%, pulse animation

### Level-Up Variant (Overall)
*Established: Screen 42. Used on: 42*

All of the above, plus:
- Level transition text: "Level 8 to 9" (24pt Bold, white)
- XP bar fill animation: fills to 100%, overflows with orange glow, resets to new level starting position. Duration: 1200ms ease-flow
- New rank title unlocked (if crossing a tier boundary): title text fades in below level transition, rarity glow treatment [Phase 4+]
- AI congratulatory message personalized with recent activity data

### Domain Level-Up Variant
*Established: Screen 42. Used on: 42*

Lighter celebration for per-domain level increases:
- Small Win Toast format (not full-screen overlay)
- Domain color icon (20pt) + "Fitness Level 8" (15pt Semibold, white) + "+25 XP bonus" (14pt Semibold, orange)
- Slide-down from top, 3s auto-dismiss
- Haptic: success notification

### Small Win Toast
*Established: Screen 42. Used on: 12, 27, 32, 38, 42*

- Height: 48pt
- Background: ink-brown-800, --shadow-2
- Content: checkmark icon + achievement name + XP amount
- Position: top of screen, below status bar
- Animation: slide-down from top (280ms), auto-dismiss after 3 seconds (slide-up + fade)
- Non-blocking: underlying screen remains interactive after brief appearance

### XP Popup Float
*Established: Screen 42. Used on: 12, 27, 32, 38, 42*

- "+NNxp" text floats up 64pt from trigger point
- Fades from 100% to 0% opacity
- Duration: 1200ms (celebration) or 520ms (inline)
- Text: 14pt Sora Semibold, orange

### Inline Goal Celebration
*Established: Screen 44. Used on: 44*

- Triggered when daily goal is met (water intake, step count, etc.)
- Brief green glow pulse (600ms) on the progress ring/bar
- Checkmark icon fades in (280ms) + "Goal reached!" Small Win Toast
- No confetti (reserved for full-screen celebrations)
- Reusable for any inline daily goal completion

### Mini Confetti Burst
*Established: Screen 47. Used on: 47*

- Lightweight, localized celebration: 12–15 particles confined to a card/element
- Colors: orange, green, gold
- Duration: 800ms, particles fall + fade
- Trigger: competition win, challenge completed
- Smaller scale than Full-Screen Celebration Overlay (40–60 particles)

---

## Empty State Patterns

### Day 1 (New User) Strategy
*Principle: SIA fills every zone so no screen feels empty.*

- Action-oriented: always provide at least one actionable item
- SIA greeting warmth: "Welcome to Balencia..."
- Starter suggestions: SIA-generated chips/prompts based on onboarding
- Zeroed stats visible but not hidden (stat tiles show "0")
- Hidden sections: only hide if completely irrelevant (e.g., schedule preview when no calendar connected)

### Filtered Empty State
*Used on: 13 (filter returns no results), 30 (no transactions), 37 (no journal entries)*

- Centered text: "[No X] yet" in 17pt Semibold, white
- Contextual help: 15pt Regular, white at 50%, centered
- Optional CTA: "create your first [X]" as orange text link or Brand CTA Button

### All-Done State
*Established: Screen 12. Used on: 12*

When all daily actions are completed:
- Green checkmark circle (48pt, green fill, white check)
- "Nothing left today" (17pt Semibold)
- "Rest, explore, or add more." (14pt Regular, white at 50%)
- SIA note: "Solid day. You earned it."

---

## Motivation Adaptation

### Three-Tier System
*Applied to: all content screens (12–43). NOT applied to: auth (03–05), creation flows (15), modals.*

**Low Motivation** (SIA detects fatigue, low engagement):
- Reduced information density — show only essential sections
- Fewer action items (1–2 instead of 4–6)
- Shorter SIA notes (1 line, gentle tone)
- Hidden: stats, insights, advanced sections
- Goal: fit screen in one viewport without scrolling
- Paywall frequency: max 1 per session

**Medium Motivation** (default):
- All standard sections visible
- 4–6 action items
- SIA notes: warm, encouraging, 2–3 lines
- Expanded sections collapsed by default

**High Motivation** (high engagement, active streaks):
- All sections visible + additional data
- Expanded SIA notes with data-specific insights
- Count badges on filters ("active (5)")
- Comparative stats (vs. last week, personal records)
- Auto-expanded detail sections
- More prominent "see all plans" link on paywall

---

## Error Handling & Recovery Patterns

Every screen that submits data, waits for an AI response, or loads remote content must handle failure states. These patterns replace the need for per-screen error specs — screens inherit them automatically.

### Timeout States (AI / API Responses)

Applies to: SIA Chat [09], Create Goal [15], Food Logger [29], Intelligence Dashboard [48], and any screen that triggers an AI-generated response or API call with variable latency.

| Elapsed Time | Visual State | User Action |
|--------------|-------------|-------------|
| 0–3s | Standard loading (inline spinner or skeleton shimmer) | None — expected wait |
| 3–5s | Spinner continues, no change | None |
| 5–8s | Text appears below spinner: "Taking a bit longer..." (14pt Regular, white at 50%) | None |
| 8–12s | Text updates: "Still working on it..." | Optional: "Cancel" text link appears (14pt Regular, white at 50%) |
| >12s | Spinner stops. Error state: "Couldn't complete this right now." (15pt Semibold, white) + "Try again" orange text button | Tap "Try again" to retry, or navigate away |

- Spinner: 20pt circular, white at 50%, centered within the loading zone
- Text position: 8pt below spinner, centered
- Haptic: Error notification haptic at the >12s failure point

### Failed Send Indicator (Chat / Submit)

Applies to: SIA Chat [09], any screen where a user submits content that can fail.

- **Failed message bubble**: User message bubble retains its position but shows a red warning circle (16pt, `error-red` fill, white `!` icon) at bottom-right of the bubble
- **Tap to retry**: Tapping the warning circle shows a context menu (Quick Actions Menu pattern): "Retry" (orange text) / "Delete" (error-red text)
- **Retry behavior**: Message re-sends with original content. Warning circle replaced by inline spinner (16pt) during retry.
- **Multiple failures**: Each failed message shows its own indicator. Messages send in order — retry on message N blocks message N+1.

### Network Error Banner

Applies to: all screens. Appears when the device loses connectivity.

- **Position**: Fixed at top of screen, below status bar, above sticky header (z-index above all content, below modals/sheets)
- **Height**: 36pt
- **Background**: `error-red` (#F44336) at 100%
- **Text**: "No connection" (14pt Sora Semibold, white) centered
- **Icon**: Wi-Fi off icon (16pt, white) left of text, 8pt gap
- **Entry**: Slide down from top (280ms ease-out-soft)
- **Exit**: Auto-dismisses when connectivity returns — slide up (280ms ease-out-soft)
- **Content shift**: Screen content shifts down 36pt when banner appears, shifts back up when it dismisses
- **Interaction**: While banner is visible, all network-dependent actions show disabled state (0.4 opacity). Local actions (navigation, toggling UI, reading cached data) remain active.

### Partial Failure Recovery

Applies to: any multi-step operation (goal creation, profile save, competition join).

- **Principle**: Save what succeeded, surface what failed.
- **Visual**: Toast notification (existing toast pattern) with message: "[Action] saved, but [dependent action] failed" (e.g., "Goal created, but SIA insights couldn't load")
- **Recovery action**: Toast includes "Retry" orange text link at right. Tapping retries only the failed step.
- **Data integrity**: The successfully saved portion is never rolled back. User sees the partial result immediately.

### Form Validation Errors

Applies to: all form screens (03, 04, 05, 07, 15, 29, 50, 60).

- **Inline error**: `error-red` (#F44336) 2pt border on the field + error message 4pt below field (13pt Regular, `error-red`)
- **Error position**: Below the field, above the next field. Other fields shift down to accommodate.
- **Trigger**: On field blur (not on every keystroke). Exception: real-time validation for email format, password strength.
- **Dismiss**: Error clears when user begins editing the field again.
- **Multiple errors**: All invalid fields show errors simultaneously on submit attempt. Screen auto-scrolls to the first error.

---

## Interrupt & Notification Layering

Defines how competing overlays, notifications, achievements, and system alerts are prioritized when they occur simultaneously or while the user is in a flow.

### Z-Layer Priority (lowest to highest)

| Layer | Z-Index | Examples | Can Interrupt |
|-------|---------|----------|---------------|
| 1 — Content | Base | Screen content, cards, lists | N/A |
| 2 — Sticky elements | +10 | Tab bar, sticky header, FAB | N/A |
| 3 — Bottom sheets | +20 | Create Goal, Food Logger, Settings modals | No — waits for sheet dismiss |
| 4 — Toasts | +30 | Success toast, error toast, partial failure toast | Yes — appears above sheets |
| 5 — In-app notifications | +40 | Push notification banner, SIA proactive message | Yes — appears above toasts |
| 6 — Celebrations | +50 | Achievement overlay [42], level-up, streak milestone | Queued — waits for notification dismiss |
| 7 — System alerts | +60 | Network error banner, force update [65], permission prompts | Yes — highest priority, appears above everything |

### Screen Exclusion List (No Interrupts)

The following flows suppress all Layer 4–6 interrupts. Interrupts are queued and shown after the flow completes. Layer 7 (system alerts) is never suppressed.

- **Payment flow**: Paywall [43] and any in-app purchase confirmation
- **Account deletion**: Delete account confirmation in Profile Edit [50]
- **Active voice call**: SIA Voice Full-Screen [11]
- **Onboarding**: Screens 03–08 (first-time user flow)
- **SIA processing**: While SIA is generating a response (spinner visible)

### Notification Batching Rules

- **Max visible**: 1 notification banner at a time
- **Queue**: Additional notifications queue in FIFO order
- **Minimum gap**: 1 second between dismissing one notification and showing the next
- **Auto-dismiss**: Notification banners auto-dismiss after 4 seconds. User can swipe up to dismiss early.
- **Tap action**: Tapping a notification navigates to its target screen. Queued notifications are discarded (they remain in Notification History [24]).

### SIA Proactive Message Display

When SIA has a proactive insight to share (not in response to user action):

- **On Home screen [12]**: Insight appears as a new Proactive Insight Card in the content feed (standard card insertion animation — fade-in + translateY from 12pt, 280ms ease-out-soft)
- **On any other screen**: Appears as a toast-style banner at top of screen (below status bar, above sticky header). Format: SIA avatar (20pt) + message preview (1 line, 14pt Regular, white) + "View" orange text link. Auto-dismisses after 6 seconds.
- **On SIA Chat [09]**: Appears as a new message bubble in the conversation (standard message entry animation)

### Achievement Timing

- Achievements are never shown in real-time during user actions. They are queued and displayed at the next "natural pause" — defined as: screen transition completes, scroll stops for >1 second, or user returns to Home/tab root.
- If multiple achievements are pending, show them sequentially with 1-second gaps. Max 3 in a row — remaining are batched into a summary toast ("You earned 2 more achievements").

---

## Accessibility Standards

Global accessibility rules applied to all 90 design docs. Screen-specific annotations are only needed where behavior deviates from these defaults.

### Screen Reader (VoiceOver / TalkBack)

- **Reading order**: Follows visual top-to-bottom, left-to-right layout order
- **Sticky header**: Read first when screen loads, then content. On scroll, header is not re-announced.
- **Tab bar**: Announced as "Tab bar" with each tab as "[Tab name], tab, [position] of 4, [selected/not selected]"
- **Cards**: Announced as a single group — title + subtitle + status in one read. Interactive cards announce available actions ("double-tap to open, swipe right to complete").
- **Progress rings**: Announced as "[Value] percent complete, [Label]"
- **Domain tag chips**: Announced as "[Domain name] tag"
- **Segmented controls**: Announced as "[Label], [position] of [total], [selected/not selected]"
- **Bottom sheets**: On open, focus moves to sheet title. On dismiss, focus returns to the trigger element.
- **Toasts**: Announced as live region (assertive) — screen reader reads the toast message immediately without moving focus.

### Focus Order

- Default: matches visual reading order (top-to-bottom, left-to-right)
- **Modals/sheets**: Focus trapped inside the overlay until dismissed
- **After action**: Focus moves to the next logical element (e.g., after completing an action card, focus moves to the next action card)
- **After navigation**: Focus moves to the screen title or first interactive element

### Touch Targets

- **Minimum**: 44×44pt for all interactive elements (established in component specs)
- **Small visual elements** (checkboxes 24pt, toggle 34×20pt): Use extended hit area to meet 44pt minimum
- **Adjacent targets**: Minimum 8pt gap between touch targets to prevent mis-taps

### Reduced Motion

- **`prefers-reduced-motion: reduce`**: All animations complete instantly (0ms duration). Skeleton shimmers still animate (essential for communicating loading). Progress ring fills jump to final value. Screen transitions use crossfade (160ms) instead of slide.
- **Content**: No changes to content, layout, or information density.

### Dynamic Type

- **Supported range**: Default (16pt body) through XXXL (23pt body)
- **Scaling**: Body text, labels, and eyebrows scale. Display text (hero numbers, ring center values) does not scale — uses fixed sizes for layout integrity.
- **Layout**: Cards expand vertically to accommodate larger text. Horizontal layouts (stat tile rows) reflow to vertical stacking at XXXL.

---

## SIA Suggestion Chip Variants

SIA suggestion chips appear in Chat [09], Onboarding [07], Home [12] (insight cards), and domain dashboards [26-36]. The chip visual is identical across screens (orange border, orange text, --r-pill, 36pt height, 14pt Sora Semibold). The wording follows these rules:

### Conversational Chips (used during dialogue)

When SIA asks a question or makes a statement that expects a response:
- Affirm/acknowledge: "sounds good", "let's do it", "not right now"
- Redirect: "tell me more", "what else?", "skip this"
- Emotional: "I'm feeling great", "not my best day"

Used on: Onboarding [07], SIA Chat [09] during conversation turns, Daily Check-in [45]

### Action Chips (used to suggest next steps)

When SIA recommends a specific action or the user has completed something:
- Feature navigation: "log a meal", "start workout", "check my goals"
- Domain-specific: "review budget", "journal about this", "try a breathing exercise"
- Follow-up: "track water", "set a reminder", "share with partner"

Used on: Home [12] (SIA greeting card, insight cards), SIA Chat [09] after action completion, domain dashboards [26-36]

### Rule

If SIA's preceding message ends with a question mark → use conversational chips.
If SIA's preceding message is a recommendation, insight, or completion acknowledgment → use action chips.
If ambiguous, prefer action chips (they drive engagement).

---

## Product Tour / Coach Marks

*Established: Batch 8. Applied on first visit to: Home Screen [12], SIA Chat [09], Goals List [13], Me Main [17]*

A reusable tooltip/spotlight overlay system for first-time feature discovery. Applied automatically on the user's first visit to key screens. Max 3-4 coach marks per screen.

### Coach Mark Overlay

- **Overlay**: full-screen ink-900 at 70% opacity (dim everything except spotlight target)
- **Spotlight cutout**: rounded rectangle matching the target component's bounds + 8pt padding. Clear (no overlay in cutout). 2pt orange (#FF5E00) ring around cutout, --r-md (14pt) or matching target's border radius.
- **Tooltip card**: ink-brown-800 bg, --r-xl (28pt), 16pt padding, 1pt border white at 10%. Max width 280pt. Positioned above or below spotlight target (auto-detects which side has more room, 12pt gap from cutout).
  - Pointer: 12pt triangle (ink-brown-800 fill, 1pt white at 10% border on two sides) pointing toward spotlight target. Centered horizontally on tooltip.
  - Title: 15pt Sora Semibold, white. Brief label (e.g., "Your AI Coach")
  - Body: 13pt Sora Regular, white at 60%. 1-2 sentences explaining the feature.
  - Step indicator: dot row at bottom of tooltip. Active dot: orange (6pt). Inactive: white at 20% (6pt). 6pt gap between dots.
  - Navigation row: 8pt below body
    - Left: "skip tour" text (13pt Sora Regular, white at 30%). Tap → dismisses entire tour.
    - Right: "next" pill (13pt Sora Semibold, orange bg, white text, --r-pill, 32pt height, 16pt horizontal padding). Last step: "got it" replaces "next".

### Coach Mark Sequence

- Marks appear one at a time, in order
- Transition between marks: spotlight crossfades to next target (280ms ease-out-soft), tooltip fades out then fades in at new position (280ms)
- Dismissal: "skip tour" dismisses all. Tapping outside spotlight also advances to next (forgiving UX). "got it" on last mark dismisses overlay.
- Persistence: tour completion stored in local device storage. Never shows again after dismissed or completed.
- Haptic: light impact on each mark advance

### Screen-Specific Coach Marks

**Home Screen [12]** (4 marks):
1. SIA greeting card → "Your AI Coach — SIA gives you personalized guidance every day"
2. Quick actions row → "Quick Actions — Tap for instant access to breathing, water, and more"
3. Goals progress section → "Your Goals — Track progress on what matters most"
4. Domain health strip → "Health at a Glance — Live data from your connected devices"

**SIA Chat [09]** (3 marks):
1. Message input → "Talk to SIA — Ask anything about your health, goals, or habits"
2. Voice button → "Use Your Voice — Tap and hold to speak instead of typing"
3. Search icon → "Search History — Find past conversations and insights"

**Goals List [13]** (3 marks):
1. Goal card → "Your Goals — Tap any goal to see details and update progress"
2. Filter chips → "Filter — Narrow by domain, status, or priority"
3. FAB → "Add Goal — Create new goals with SIA's help"

**Me Main [17]** (3 marks):
1. RPG level badge → "Your Level — Earn XP by completing goals and building habits"
2. Quick links grid → "Your Hub — Access your character, wiki, settings, and more"
3. Explore preview → "Discover — SIA suggests features based on your patterns"

---

## Pull-to-Refresh Pattern

*Established: Batch 8. Used on: all scrollable screens*

Standard pull-to-refresh behavior for all ScrollView and FlatList screens.

- **Trigger**: Pull down from top of scrollable content, >60pt past overscroll threshold
- **Indicator**: Circular spinner (20pt, orange #FF5E00, 2pt stroke) centered at top, 16pt below nav header. Appears at 40pt pull, reaches full size at 60pt.
- **Spinner style**: arc spinner (270° arc, continuous rotation, 800ms per revolution)
- **Background**: transparent (spinner floats on screen background)
- **Behavior**: releases fetch request, spinner persists until response arrives, content crossfades to updated state (280ms ease-out-soft)
- **Haptic**: light impact at 60pt threshold (confirms pull registered)
- **Error**: if refresh fails, spinner disappears + network error banner slides down (see Error Handling patterns)
- **Duration cap**: spinner auto-hides after 8s even if response hasn't arrived (prevents infinite spinner)

---

## Generic Toast Notification

*Established: Batch 8. Used on: all screens*

Non-modal, temporary feedback for background actions (copy, save, toggle, etc.).

- **Position**: top of screen, 8pt below status bar safe area, centered horizontally
- **Visual**: ink-brown-800 bg, --r-pill, 12pt vertical padding, 20pt horizontal padding, 1pt border white at 10%, backdrop-blur(12px). Max width: screen width minus 64pt.
- **Content**: icon (16pt, left) + message text (14pt Sora Semibold, white) in a single row
- **Icon variants**: checkmark (green #34A853) for success, info circle (white at 50%) for info, warning triangle (amber #F59E0B) for warning
- **Animation**: slide down from -44pt + fade in (280ms ease-out-soft), auto-dismiss after 3s (slide up + fade out, 280ms)
- **Stacking**: max 1 toast visible. New toast replaces existing with crossfade.
- **Haptic**: light impact on appear (success), warning notification (warning)
- **Interaction**: swipe up to dismiss early. Not tappable (no action).
- **Accessibility**: announced via accessibilityLiveRegion "polite"

---

## App Icon Badge

*Established: Batch 8. Applied via: Push notification system*

- Badge count reflects total unread notifications (from Notification History [24])
- Updated via silent push notification when count changes server-side
- Cleared when user opens Notification History [24] (reads all)
- iOS: standard red circle badge on app icon. Count number in white.
- Implementation: `setBadgeCount()` via push notification handler

---

## Ambient Audio Selector

*Established: Batch 8. Used on: Breathing [53], Meditation [54], Yoga [55]*

Inline audio control for immersive wellness sessions.

- **Position**: horizontal chip row, 12pt above session stop/pause controls, centered
- **Visual**: scrollable row of audio preset chips (--r-pill, 36pt height)
  - Active chip: orange (#FF5E00) bg, white text (14pt Sora Semibold)
  - Inactive chip: ink-brown-800 bg, white at 60% text (14pt Sora Semibold), 1pt border white at 8%
- **Presets**: "silence" (default, no icon), "rain" (cloud-rain icon, 14pt), "forest" (tree icon, 14pt), "white noise" (wave icon, 14pt)
- **Spotify chip** (conditional, only if Spotify connected via Screen 22): Spotify icon (14pt, green #1DB954) + "Spotify" text. Active: green bg, white text. Tap → opens Spotify mini-player or playlist selector.
- **Behavior**: tapping a preset starts/switches ambient audio immediately (crossfade 500ms between presets). Audio plays alongside session timer/guidance. Audio stops when session ends.
- **Volume**: follows device volume. No separate volume control (keeps UI minimal).
- **Persistence**: last-selected preset remembered per session type (breathing/meditation/yoga) in local storage.

---

## User Profile Bottom Sheet

*Established: Batch 8. Used on: Leaderboard [39], Community [40], Competitions [47]*

Compact profile view when tapping another user anywhere in the app.

- **Trigger**: tap user avatar or name row on Leaderboard, Community room member list, or Competition participant list
- **Presentation**: standard bottom sheet, ink-brown-800 bg, --r-lg top corners, drag handle. ~40% screen height.
- **Content**:
  - Avatar: 56pt circle, centered, 2pt border white at 15%. 16pt below drag handle.
  - Name: 18pt Sora Semibold, white, center-aligned, 8pt below avatar
  - Level badge: diamond icon (12pt, orange) + "Lv.14" (14pt Sora Semibold, white), inline pill, center-aligned, 4pt below name
  - Top 3 domains: horizontal row of 3 domain pills (domain color at 15% bg, domain color text, 11pt Sora Semibold, --r-pill, 24pt height). 12pt below level badge. Centered. Shows user's 3 highest-level domains.
  - Mutual stats row: 16pt below domains. Two cells:
    - "2 mutual competitions" — 13pt Sora Regular, white at 50%, trophy icon (12pt, white at 40%)
    - "1 shared room" — 13pt Sora Regular, white at 50%, chat icon (12pt, white at 40%)
  - Action row: 16pt below mutual stats. Two buttons, full-width minus 32pt, 8pt gap:
    - "message" — ink-brown-800 bg, 1pt white at 10% border, white text (14pt Sora Semibold), --r-pill, 44pt height. Creates/opens private room with this user (reuses Screen 40 patterns).
    - "invite" — orange (#FF5E00) bg, white text (14pt Sora Semibold), --r-pill, 44pt height. Opens invite flow (competition invite or room invite depending on context).
- **Gestures**: drag-to-dismiss, tap "message", tap "invite"
- **Empty state**: if user has no mutual connections, mutual stats row hidden

---

## Maintenance Mode Screen

*Established: Batch 8. System-triggered (Screen 74 equivalent)*

Displayed when the backend is unreachable or returns maintenance status.

- **Trigger**: system-level check on app launch or when API returns 503 with maintenance flag
- **Presentation**: full-screen, replaces all content (no tab bar, no navigation)
- **Layout** (centered vertically):
  - Brand logo: Monda wordmark, 32pt, white, center-aligned
  - 32pt gap
  - Illustration: wrench/gear icon (64pt, white at 20%), center-aligned
  - 24pt gap
  - Title: "We'll be right back" — 20pt Sora Semibold, white, center-aligned
  - 12pt gap
  - Body: "We're making improvements. This usually takes just a few minutes." — 15pt Sora Regular, white at 50%, center-aligned, max width 280pt
  - 24pt gap
  - Estimated return (if available from API): "Estimated return: 2:30 PM" — 13pt Sora Regular, white at 40%, center-aligned
  - 48pt gap
  - SIA quote: italic, 14pt Sora Regular, white at 30%, center-aligned. Random from a pool of 5 encouraging quotes. Example: "Good things take time."
- **Background**: ink-900, no glassmorphism (keep it simple and lightweight)
- **Auto-retry**: polls health endpoint every 30s. When healthy, crossfades to normal app state (520ms ease-flow).
- **Offline variant**: if device is offline (no network), shows "No internet connection" title + "Check your connection and try again" body + "retry" orange pill button (48pt, center-aligned)

---

## Input Validation Rules

Global validation standards for all form inputs. Individual screens inherit these rules — only document overrides in screen specs.

### Field Type Rules

| Field Type | Min | Max | Allowed Characters | Keyboard Type | Validation Timing |
|-----------|-----|-----|-------------------|---------------|-------------------|
| Email | 5 | 254 | RFC 5322 format | `email-address` | Real-time format check (debounced 500ms) + on-blur |
| Password | 8 | 128 | Any printable character | `default` (with secure entry) | Real-time strength indicator |
| First / Last name | 2 | 50 | Unicode letters, hyphens, apostrophes, spaces | `default` | On-blur |
| Display name | 2 | 30 | Unicode letters, numbers, hyphens, underscores | `default` | On-blur |
| Phone number | 7 | 15 | Digits only (E.164 format) | `phone-pad` | On-blur |
| OTP code | 4 | 6 | Digits only | `number-pad` | Auto-submit on complete entry |
| Goal title | 3 | 100 | Any printable character | `default` | On-submit |
| Goal description | 0 | 500 | Any printable character + emoji | `default` | On-submit |
| Journal / Notes | 0 | 5000 | Any printable character + emoji | `default` | On-submit |
| Chat message | 1 | 2000 | Any printable character + emoji | `default` | On-submit |
| Numeric (weight, reps, ml) | Context-dependent | Context-dependent | Digits + decimal point | `decimal-pad` | On-blur (range check) |
| Currency | 0.01 | 999999.99 | Digits + decimal point | `decimal-pad` | On-blur (format to 2 decimals) |
| Search query | 1 | 200 | Any printable character | `default` | Real-time (debounced 300ms) |

### Password Strength Requirements

All password fields (create account, reset password, change password) enforce:
1. Minimum 8 characters
2. At least 1 uppercase letter (A-Z)
3. At least 1 lowercase letter (a-z)
4. At least 1 number (0-9)
5. At least 1 special character (!@#$%^&*…)

**Strength indicator**: 4-segment bar below password field. Segments fill left-to-right as requirements are met. Colors: 1 segment = error-red, 2 = error-red, 3 = creativity-amber (#F59E0B), 4 = forest-green. Each segment is 25% width, 4pt height, --r-xs (6pt), 4pt gap between segments.

### Validation Error Display

- **Inline**: Error message appears 4pt below the invalid field (13pt Sora Regular, error-red #F44336). Field border changes to 2pt error-red.
- **On-blur fields**: Error appears when user taps/clicks away from the field. Clears when user begins editing again.
- **Real-time fields**: Error updates live as user types (debounced per field type above).
- **On-submit**: All invalid fields show errors simultaneously. Screen auto-scrolls to the first error field with a 16pt top offset.
- **Server-side errors**: "Email already in use", "Invalid invite code", etc. — appear as inline errors on the relevant field after API response.

### Character Counter

Shown on fields with max length ≤ 500 characters (goal title, display name). Not shown on long-form fields (journal, notes, chat).
- Position: right-aligned, 4pt below field
- Format: "47 / 100" (13pt Sora Regular, white at 30%)
- At 90%+ capacity: text turns creativity-amber (#F59E0B)
- At 100%: text turns error-red, input stops accepting characters

---

## Keyboard Behavior Standard

Global keyboard handling rules for all screens with text inputs. Individual screens inherit these — only document overrides.

### Keyboard Types by Field

See the Input Validation Rules table above for `keyboardType` per field. Additional mappings:

| Context | Keyboard Type | Return Key |
|---------|--------------|------------|
| Single-field form (search, OTP) | Per field type | "Search" or "Done" |
| Multi-field form (sign up, profile edit) | Per field type | "Next" (chains to next field) |
| Last field in multi-field form | Per field type | "Done" (submits form or dismisses keyboard) |
| Chat / message input | `default` | "Send" (submits message) |
| Numeric-only (reps, ml, currency) | `decimal-pad` or `number-pad` | "Done" (via input accessory view) |

### KeyboardAvoidingView Behavior

- **Platform**: iOS uses `padding` behavior, Android uses `height` behavior (React Native KeyboardAvoidingView).
- **Scroll adjustment**: When a field receives focus, the ScrollView scrolls to position the focused field at 33% from the top of the visible area (not edge — leaves room for the field label and error message above).
- **CTA visibility**: The primary CTA button must remain visible above the keyboard. If the CTA would be hidden, the ScrollView adjusts to keep both the focused field and the CTA visible. If both can't fit, prioritize the focused field.
- **Tab bar**: Hidden when keyboard is active on full-screen forms (auth screens). Remains visible on product screens where keyboard appears in bottom sheets or inline inputs.

### Dismiss Behavior

| Trigger | Action |
|---------|--------|
| Tap outside any input field | Keyboard dismisses |
| Scroll content (on product screens) | Keyboard dismisses (`keyboardDismissMode="on-drag"`) |
| Tap "Done" / "Send" return key | Keyboard dismisses (after action completes) |
| Tap "Next" return key | Focus moves to next field (keyboard stays open) |
| Navigate away (back button, tab switch) | Keyboard dismisses immediately |

### Input Accessory View

For `number-pad` and `decimal-pad` keyboards (which lack a return key), show a slim input accessory toolbar:
- Height: 44pt
- Background: ink-brown-800
- Content: "Done" text button (15pt Sora Semibold, brand-orange), right-aligned, 16pt right padding
- Separator: 1pt line, white at 10%, top edge

---

## Small Screen Adaptations

Balencia V1 targets iPhone only. The design baseline is 375pt width (iPhone SE / iPhone 8). All specs are authored at 375pt. On larger devices (390pt, 393pt, 430pt), layouts stretch naturally via flexible widths and margins.

### Breakpoint: Compact (≤375pt width)

When the device width is ≤375pt, the following adaptations apply automatically:

| Component | Standard (390pt+) | Compact (≤375pt) | Rule |
|-----------|-------------------|-------------------|------|
| Screen margins | 16pt each side | 12pt each side | Reduce by 4pt |
| Card internal padding | 16–24pt | 12–16pt | Reduce by 4pt |
| Section gap | 16pt | 12pt | Reduce by 4pt |
| Stat tile grid | 3-column (varies) | 2-column (third wraps below) | Reflow, don't shrink |
| Horizontal scroll chips | Show 4-5 chips | Show 3-4 chips, scroll hint remains | No change to chip size |
| Tab bar labels | 11pt visible | 11pt visible (no change) | Tab bar does not compress |
| Large title (28pt Bold) | Full text | Truncate with ellipsis at 85% width | Never reduce font size |
| Radar chart [16] | 200pt diameter | 160pt diameter | Scale proportionally |
| Domain dashboard hero card | Standard height | Height reduces by 16pt | Compress vertical padding |

### What Never Changes on Compact

- **Font sizes**: Never reduced. Text truncates or wraps instead.
- **Touch targets**: Always ≥44pt. Never compress interactive elements.
- **CTA button height**: Always 56pt (auth) or 48pt (product). Never shorter.
- **Bottom sheet handle**: Always centered, same size.
- **Icon sizes**: 16pt, 20pt, 24pt — never smaller.

### Landscape Orientation

Not supported in V1. All screens are portrait-locked. Document landscape support as a V2 enhancement.

---

## Offline Behavior Standard

Default offline handling for all screens. Individual screens only need their own offline section if behavior deviates from these defaults.

### Detection

- Monitor `NetInfo` connection state (React Native). When connection drops, trigger offline mode.
- When connection restores, auto-sync queued operations and dismiss offline indicators.

### Visual Treatment

| State | Visual | User Impact |
|-------|--------|-------------|
| Offline (screen has cached data) | Network Error Banner (top, 36pt, error-red — per existing pattern). Cached content remains visible with a subtle stale-data indicator: section eyebrows append "(offline)" in white at 30%. | Read-only. Can navigate, scroll, read cached data. Write actions show disabled state (40% opacity). |
| Offline (screen has NO cached data) | Network Error Banner + empty state: Wi-Fi off icon (48pt, white at 15%) + "You're offline" (17pt Semibold, white) + "Check your connection to load [screen name]" (14pt Regular, white at 50%) + "Retry" orange pill CTA (48pt). | No content visible. Retry button polls connection. |
| Reconnecting | Network Error Banner text changes to "Reconnecting..." with inline spinner (16pt, white at 50%). | Automatic — no user action needed. |
| Reconnected | Banner slides up (280ms ease-out-soft). Stale indicators removed. Queued writes sync silently. If sync fails on any item, show partial failure toast. | Full functionality restored. |

### Write Queue (Offline-First Operations)

These actions are queued locally when offline and synced when connection restores:
- Habit completions (checkbox state)
- Water intake logs
- Journal entries (text + metadata)
- Quick notes
- Mood/energy check-in data
- Chat messages (queued, sent on reconnect with "sent" timestamp of original action)

These actions are **blocked** when offline (cannot queue):
- Account creation / sign-in (requires server auth)
- Payment / subscription changes
- Connected service OAuth flows
- Photo uploads (too large for reliable queue)
- SIA AI responses (requires server)

### Cache Strategy

- **Always cached**: User profile, settings, habit list, goal list, recent journal entries (last 30), schedule (next 7 days)
- **Cached on first load**: Domain dashboard data, exercise library, recipe list, achievement badges
- **Never cached**: SIA chat history (too large), intelligence scores (always fresh), leaderboard rankings, community chat

---

## Permission Request Flows

All OS permission requests follow Screen 66's pre-permission interstitial pattern. The app never triggers the native permission dialog cold — it always shows a branded explanation screen first.

### Pre-Permission Interstitial Pattern (from Screen 66)

**Structure**:
1. SIA avatar (48pt) + greeting text ("SIA works better with [permission]")
2. 3 benefit rows: icon (24pt) + title (15pt Semibold) + subtitle (13pt Regular, white at 50%)
3. Primary CTA: "Enable [permission]" (orange pill, 56pt)
4. Secondary: "Not now" text link (15pt Regular, white at 50%)

**Behavior**:
- Tapping CTA triggers the native OS permission dialog
- If user grants: proceed silently (CTA success state, then auto-navigate)
- If user denies: show "Open Settings" variant (CTA changes to "Open Settings", which deep-links to iOS Settings > Balencia)
- "Not now" dismisses the interstitial. The feature works in reduced mode. The interstitial can be re-triggered from Settings [21].

### Permission Map

| Permission | Trigger Screen | Justification Copy | Benefit Row 1 | Benefit Row 2 | Benefit Row 3 | Denial Fallback |
|-----------|---------------|-------------------|---------------|---------------|---------------|-----------------|
| Notifications | 66 (dedicated interstitial, post-onboarding) | "Stay in sync with your goals" | SIA coaching reminders | Accountability partner updates | Streak protection alerts | Features work but no push notifications. Reminders only visible in-app. |
| Camera | 49 (Progress Photos), 50 (Avatar Upload) | "Capture your progress" | Progress photo timeline | Profile photo | Barcode scanning for food logger [29] | Photo features hidden. Avatar shows default initial. Food logger uses search-only mode. |
| Microphone | 10 (Voice In-Chat), 11 (Voice Full-Screen), 37 (Voice Journal) | "Talk to SIA naturally" | Voice conversations with SIA | Voice journal entries | Hands-free logging during workouts | Voice features hidden. SIA chat is text-only. Journal is text-only. |
| HealthKit | 22 (Connected Services → Apple Health) | "See your complete health picture" | Auto-sync workouts and steps | Sleep data from Apple Watch | Heart rate and recovery metrics | Health data entered manually. No wearable sync. |
| Calendar | 22 (Connected Services → Google Calendar) | "Keep your schedule in one place" | SIA-suggested events appear in your calendar | Schedule [41] syncs both ways | Reminders for upcoming goals and habits | Schedule is Balencia-only. No external calendar sync. |
| Location | N/A (V2) | — | — | — | — | Not requested in V1. |
| Contacts | N/A (V2) | — | — | — | — | Not requested in V1. |

### Re-Request Strategy

- Each permission is requested **once** via the pre-permission interstitial during the natural flow.
- If denied, the interstitial does not re-appear automatically. User can re-trigger from Settings [21] > Permissions section.
- The Settings [21] permissions section shows current status for each permission: "Enabled" (green dot) or "Disabled — tap to enable" (navigates to the pre-permission interstitial with "Open Settings" CTA).

---

## Screen Registry Additions 74-85

The 2026-05-25 registry audit added screens 74-85 from the production screen registry. These screens reuse existing navigation, card, tab bar, modal, and SIA patterns with the lightweight additions below.

### Conversation Suite Row

Used on: Conversations Hub [74], Direct Chat [75], Group Chat [76], Message Actions [77].

- Row height: 74pt minimum, rounded-lg, ink-brown-800, 1pt white at 6% border.
- Avatar: initials inside domain-tinted circle; active presence dot uses forest-green.
- Metadata: timestamp at right, unread badge in brand-orange, arrow when no unread messages.
- Tags: conversation kind pill (Coach, Direct, Group, Room) plus Domain Tag.
- Optional icons: pin uses brand-orange; SIA assist sparkles use royal-purple.
- Tap opens the target thread. Long press opens message/thread actions where supported.

### Thread Message Bubble

Used on: Direct Chat [75], Group Chat [76], Message Actions [77].

- Incoming human messages: left aligned, ink-brown-800 bubble, author/time above.
- User messages: right aligned, brand-orange at 15% bubble, status below.
- SIA assist messages: left aligned, royal-purple at 12% bubble, SIA avatar and author.
- Attachments render as nested cards with icon tile, title, metadata, and domain tint.
- Reactions render as compact pills below the bubble.
- Long press lifts the bubble and routes to Message Actions [77].

### Signal And Privacy Pills

Used on: Screens 74-85.

- Signal pill: 28pt height, rounded-pill, 1pt border, 11pt Semibold label.
- Tones: orange for action/reward, purple for SIA/intelligence, green for ready/success, muted for metadata.
- Privacy pill: lock icon + "Private", white at 50% text, white at 8% border, white at 4% bg.
- Pills must include text labels; color never carries status alone.

### Report And Data Source Rows

Used on: Reports Center [78], Data Sources [84].

- Row/card surface: ink-brown-800 or white at 4%, rounded-lg, 16pt padding.
- Left icon tile: 40-44pt square/circle, domain or status tint.
- Primary label: 15pt Semibold, white.
- Metadata: 12pt Regular, white at 45%.
- Right status text/pill: Ready, Draft, Connected, Needs refresh, Synced time.
- Tap opens detail/preview. Failed refresh/export states show inline error or toast.

### Media Recommendation Card

Used on: Music Coach [80], Video Library [81].

- Featured media cards use rounded-xl containers, 16-20pt padding, and domain-tinted hero area.
- Playback controls are icon buttons with 44pt touch targets.
- SIA matching rationale is shown as a visible note or signal pill, not hidden in tooltip-only UI.
- External provider actions (Spotify, YouTube) remain explicit CTAs and show loading/success/error states.

### Accountability And Obstacle Diagnosis Cards

Used on: Accountability Contract [82], Social Buddy Profile [83], Obstacle Coach [85].

- Contract/status cards use green for active/signed, orange for due/reconnection, purple for SIA timing.
- Verification and blocker rows use icon tile + title + detail + proposed action.
- Proposed action text is written directly on the card; users should not infer action from color alone.
- Accept/dismiss/refresh actions must be available through buttons or sheets, not swipe-only gestures.

---

## Typography Convention

All 90 design docs include screen-level typography guidance either explicitly or through shared-pattern inheritance. Screen-level typography sections document **only overrides and screen-specific text roles** — the global 7-tier type scale defined in [Design Tokens → Typography Tokens](#design-tokens) applies universally unless explicitly overridden. There is no need to repeat the global scale on each screen.

When a screen's typography section says "follows global type scale," a developer refers to this document's type scale. When it lists specific elements (e.g., a custom stat size or a unique title treatment), those take precedence for that screen only.

---

## Device Support

**V1 targets iPhone only** — screen width range 375pt (iPhone SE) to 430pt (iPhone 16 Pro Max). All layout specs, wireframes, and spacing values are authored for this range.

**Small screen adaptations** (≤375pt) are defined in the [Small Screen Adaptations](#small-screen-adaptations) section — margin compression, component height minimums, and truncation strategies ensure usability on iPhone SE.

**Tablet and iPad layouts are deferred to V2.** No screen spec should be interpreted as tablet-ready. When V2 tablet support is added, it will require: multi-column layouts for wider screens, sidebar navigation pattern, split-view for detail screens, and revisited touch-target sizes for pointer input.

---

## Pattern Count Summary

| Category | Count |
|----------|-------|
| Design Tokens | 6 token groups (color, radius, shadow, spacing, glassmorphism, domain colors) |
| Navigation Patterns | 4 (tab bar, stack, modal, scroll-reactive nav) |
| Layout Templates | 4 (auth, domain dashboard, detail screen, multi-mode) |
| Component Patterns | 262 (buttons, inputs, cards, rows, chips, controls, overlays, modals, sheets, badges, selectors, trackers, coach marks, toasts, audio selectors, user profiles, conversation rows/messages, report/source rows, media recommendation cards) |
| SIA Patterns | 15 (greeting, compact note, contextual note, inline upgrade, processing, real-time, shortcut, suggestion, inspiration, daily prompt, recommended practice, search suggestion, assist strip, post-call summary, obstacle diagnosis) |
| RPG/Gamification Patterns | 13 (XP badge, XP bar, XP float, skill badge, level-up bar, streak hero, streak calendar, XP multiplier, streak freeze, streak milestone ladder, streak history, inline goal celebration, mini confetti) |
| Domain-Specific Patterns | 36 (header, calendar dots, heatmap, macros, water, meal, donut, portions, budget, transaction, savings, KPI, spending chart, reminders, timer, stress gauge, stress slider, trigger donut, mental recovery, weight trend, bedtime consistency, sleep trend, medication check, adherence bar, energy slider, energy sparkline, data source health, accountability verification, etc.) |
| Chart/Visualization Patterns | 8 (line chart, radar, mini radar, circular countdown, donut, correlations bar, competition progress bar, trigger donut variant) |
| Typography Patterns | 8 roles in type scale + 2 title treatments |
| Color Patterns | 3 rule sets (60/30/10, domain usage, surface hierarchy) |
| Motion Patterns | 4 timing tokens, 2 easing curves, 8 screen transitions, staggered entry, pull-to-refresh, phase transition haptics, purchased item delayed move, shared element transition, progressive image loading, animation interruption policy |
| Interaction Patterns | 8-state model, 17 gesture types, swipe action color convention, 14 haptic triggers, skeleton loading, gesture conflict resolution (edge zone rule), chrome toggle, swipe-down dismiss, pinch-to-zoom, gallery navigation, pull-down-to-open-search, pull-to-refresh, app icon badge |
| Celebration Patterns | 6 (full-screen, level-up, toast, XP popup, inline goal celebration, mini confetti burst) |
| Empty State Patterns | 3 strategies (Day 1, filtered, all-done) |
| Motivation Adaptation | 3-tier system applied across all content screens |
| Error Handling & Recovery | 5 patterns (timeout states, failed send, network error banner, partial failure recovery, form validation) |
| Interrupt & Notification Layering | 7-layer z-index hierarchy, screen exclusion list, batching rules, SIA proactive display rules, achievement timing |
| Accessibility Standards | Screen reader defaults, focus order, touch targets, reduced motion, dynamic type, conversation/message semantics |
| SIA Suggestion Chip Variants | 2 variant types (conversational, action) with selection rule |
| Input Validation Rules | 13 field types, password strength indicator, character counter, validation error display |
| Keyboard Behavior Standard | Keyboard types per field, KeyboardAvoidingView behavior, dismiss triggers, input accessory view |
| Small Screen Adaptations | Compact breakpoint (≤375pt) rules, 10 component adaptation rules, landscape deferral |
| Offline Behavior Standard | 4 offline states, write queue (6 queued / 5 blocked actions), cache strategy (3 tiers) |
| Permission Request Flows | Pre-permission interstitial pattern, 5 permission types mapped, re-request strategy |
| Screen Registry Additions 74-85 | 6 pattern groups (conversation row, thread bubble, signal/privacy pills, report/source rows, media recommendation cards, accountability/obstacle diagnosis cards) |
| Typography Convention | Global type scale authority note, screen-level override convention |
| Device Support | iPhone-only V1 scope (375pt–430pt), tablet deferred to V2 |

**Total documented patterns: ~424 unique patterns across 27 categories, covering all 90 design docs.**
