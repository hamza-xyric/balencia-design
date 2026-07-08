# Shared Patterns — Balencia Screen Designs

This document tracks every reusable pattern established across all 43 screen design files. It is the single source of truth for component specs, layout templates, color tokens, motion tokens, typography, interaction models, and gesture conventions. A developer should be able to implement any component from this document alone, without reading individual screen drafts.

Updated: complete consolidation covering Screens 01–43, all 9 batches.

> **Updated for Brand Guidelines v2.1** (2026-07-08) — typography migrated from Sora to Cabinet Grotesk (headings) + Switzer (body). Color, radius, shadow, and spacing tokens unchanged from v2.0. See `Balencia-Brand-Guidelines-v2.1.md` for the canonical source.

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
| Nutrition | #84CC16 | nutrition-lime |
| Finance | #10B981 | finance-emerald |
| Career | #6366F1 | career-indigo |
| Relationships | #EC4899 | relationships-pink |
| Spirituality | #A855F7 | spirituality-purple |
| Learning | #06B6D4 | learning-cyan |
| Creativity | #F59E0B | creativity-amber |
| Wellbeing | #14B8A6 | wellbeing-teal |

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

### Glassmorphism — Light Glass-Card Variant *(v2.1, optional alternative)*

> This is a lighter-touch alternative surface documented in `Balencia-Brand-Guidelines-v2.1.md`. It is **not** a replacement for the dark ink-brown-800 clay/glass hybrid above, which remains the app-wide default card surface. Reach for this variant only where a screen calls for a brighter, translucent glass treatment over rich imagery or gradient backgrounds (e.g. hero/marketing surfaces) — do not mix the two card recipes within the same section.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1),
    inset 0 0 14px 7px rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;
}
```

- Background: white at 14% opacity (vs. ink-brown-800 solid for the default clay card)
- Blur: 50px backdrop-filter (vs. 16px on the default sticky-header-only blur)
- Border: 1px white at 30% opacity
- Top-edge highlight + left-edge highlight gradients (`::before` / `::after`) reinforce the glass edge — see brand guidelines for exact gradient stops
- Text/content on this surface follows the **Typography on Light Backgrounds** rules (§4 of the brand guidelines), not the dark-background rules used elsewhere in this document

---

## Navigation Patterns

### Bottom Tab Bar
*Established: Screen 12. Used on: all authenticated product screens (12–43 except active workout mode on 27, modals, overlays)*

- **Tabs**: Today | SIA | Goals | Me
- **Height**: 56pt (standardized) + ~34pt iOS safe area below on notch devices
- **Active tab**: orange icon (#FF5E00) + label (filled icon variant)
- **Inactive tab**: white at 60% (outlined icon variant)
- **Tab icons**: 24pt, outlined when inactive, filled when active
- **Label (active)**: 11pt Cabinet Grotesk SemiBold, orange (#FF5E00), below icon
- **Label (inactive)**: 11pt Switzer Regular, white at 60%, below icon
- **Background**: ink-900, no border, subtle shadow-1 above
- **Always visible** on authenticated product screens
- **Hidden during**: onboarding/auth (01–08), active workout mode (27), full-screen overlays (42), modals (15, 43)

### Stack Navigation (within tabs)
*Established: Screen 12. Used on: all stack-pushed screens*

- Push/pop within each tab's stack
- Back button: left chevron, white, 2pt stroke weight, 20pt icon, 44x44pt touch target, 16pt from left edge
- Screen title: 17pt Cabinet Grotesk SemiBold, center-aligned (in nav bar)
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
- Dismiss: 280ms ease-out-soft (slide down), velocity-based threshold for drag dismiss

### Navigation Bar with Scroll-Reactive Title
*Established: Screen 14. Used on: 13, 14, 35, and all screens with large-title style*

- Transparent at rest
- On scroll past hero/title: transitions to ink-900 at 80% + backdrop-blur(16px)
- Title fades in at center (17pt Cabinet Grotesk SemiBold, opacity 0 to 1)
- Transition: 160ms ease-out-soft

---

## Layout Templates

### Auth Screen Template
*Established: Screens 03–05. Used on: 03 (Sign Up), 04 (Sign In), 05 (Forgot Password)*

**Structure (top to bottom)**:
1. Back button row (44pt) — omitted on entry screen (03)
2. Brand symbol (48pt, Burnt Orange, centered) + 32pt gap
3. Screen heading (24pt Cabinet Grotesk Bold, white, center-aligned) + 32pt gap
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

The canonical layout pattern for all 9 domain dashboards. Each dashboard follows this slot-based structure with domain-specific content:

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
- Text: white, 17pt Cabinet Grotesk SemiBold (600), center-aligned, sentence case
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
- Text: white, 16pt Cabinet Grotesk SemiBold, center-aligned
- Border radius: --r-pill
- Same 8-state model as Brand CTA

### "Complete Set" / Green Action Button
*Established: Screen 27. Used on: 27*

Used for completion actions (distinct from primary orange CTA):
- Height: 48pt
- Background: Forest Green (#34A853)
- Text: white, 16pt Cabinet Grotesk SemiBold, "Complete set checkmark"
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
- Text: 16pt Switzer Regular, white
- Placeholder: white at 40%
- Padding: 16pt horizontal
- Password variant: visibility toggle (eye icon, 20pt, right-aligned, 44x44pt touch target)
- Error message: 13pt Switzer Regular, #F44336, left-aligned, 4pt below field

### Natural Language Input
*Established: Screen 15. Used on: 15*

Large-format text area for goal creation:
- Full-width minus 32pt
- Height: 120pt (grows to 200pt max)
- Background: ink-brown-800, --r-md border radius
- Text: 18pt Switzer Regular, white (larger than standard 16pt)
- Placeholder: 18pt Switzer Regular, white at 30%, cycles every 4 seconds with crossfade
- Border: 1pt white at 10% (default), 2pt orange (focused)

### Social Auth Button
*Established: Screen 03. Used on: 03, 04*

Side-by-side social login buttons:
- Two buttons with 16pt gap, each half available width minus gap
- Height: 52pt
- Background: ink-brown-800 (#211008)
- Border: 1pt solid white at 10%
- Border radius: --r-lg (20pt)
- Content: Provider icon (20pt, full color) + name (15pt Cabinet Grotesk SemiBold, white), centered
- Google: multicolor G + "Google" | Apple: white Apple logo + "Apple"
- States: Default, Pressed (bg darkens + scale(0.97)), Loading (spinner replaces content)

### Auth Divider
*Established: Screen 03. Used on: 03, 04*

"or continue with" separator:
- Horizontal rule (1pt, white at 10%) on each side of centered text
- Text: "or continue with", 13pt Switzer Regular, white at 40%
- Text padding: 12pt horizontal from rules
- 24pt vertical spacing above and below

### Auth Navigation Link
*Established: Screen 03. Used on: 03, 04, 05*

Bottom-of-screen text links:
- Full-width, center-aligned
- Context: 15pt Switzer Regular, white at 50%
- Action word: 15pt Switzer Medium, Burnt Orange
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
- Text: "skip", 15pt Switzer Regular, white at 60%
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

- 12pt Cabinet Grotesk SemiBold (600), white at 40%, uppercase, +0.12em letter-spacing
- Spacing: 32pt above (gap from previous section), 12pt below
- Domain dashboard variant: uses domain color instead of white at 40% (e.g., "TODAY'S WORKOUT" in #EF4444)
- Examples: "TODAY'S ACTIONS", "YOUR MISSIONS", "BUDGETS", "EXERCISES"

### Section Heading Row
*Established: Screen 26. Used on: 26, 28, 30, 32, 33, 34, 35, 36, 38, 39*

Title + "see all" link in a single row:
- Title: 18pt Cabinet Grotesk SemiBold, white, left-aligned
- "see all": 13pt Switzer Regular, Burnt Orange, right-aligned, 44pt touch target
- Row height: 32pt
- Used as section headers in domain dashboards

### Domain Tag Chip
*Established: Screen 12. Canonical spec confirmed: Screen 37. Used on: 12, 13, 14, 15, 16, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41*

Color-coded life domain identifier:
- Height: 24pt
- Padding: 8pt horizontal (12pt with optional icon)
- Border radius: --r-sm (10pt)
- Background: domain color at 15% opacity
- Text: 11pt Cabinet Grotesk SemiBold, domain color, sentence case
- Optional icon: 14pt, domain color, left side (omit in tight spaces)
- Domain colors: Fitness #EF4444, Nutrition #84CC16, Finance #10B981, Career #6366F1, Relationships #EC4899, Spirituality #A855F7, Learning #06B6D4, Creativity #F59E0B, Wellbeing #14B8A6
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
- Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Cabinet Grotesk SemiBold white at 60%
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
- Segment text: 14pt Cabinet Grotesk SemiBold
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
- Content: "+" icon (16pt) + label (15pt Cabinet Grotesk SemiBold, white), 8pt gap
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
- Icon (16pt) + label (15pt Switzer Regular, white)
- Divider: 1pt white at 5% between items
- Backdrop: ink-900 at 40% (tap to dismiss)
- Entry: scale(0.95 to 1.0) + fade-in, 160ms
- Exit: fade-out, 160ms
- Haptic: medium impact on long-press trigger

### Expandable/Collapsible Section
*Established: Screen 14. Used on: 14, 25, 34, 41*

- Full-width row, no card surface, 48pt tall, 16pt horizontal margins
- Chevron: 14pt, white at 40%, rotates 0 to 90deg on expand
- Title: 15pt Cabinet Grotesk SemiBold, white at 80%, 8pt right of chevron
- Counter badge (optional): "5/7 done", 12pt Regular, white at 40%, right-aligned
- Divider: 1pt white at 5% below each header (except last)
- Expand/collapse animation: content height 0 to auto + fade-in / auto to 0 + fade-out, 280ms ease-out-soft

### FAQ Accordion Item
*Established: Screen 25. Used on: 25*

- Question text: 16pt Cabinet Grotesk SemiBold, white
- Chevron: 14pt, white at 40%, right-aligned, rotates on expand
- Answer: 15pt Switzer Regular, white at 70%, slides in below question
- Full row: 56pt collapsed height, 16pt padding
- Same animation as Expandable Section (280ms ease-out-soft)

### Action Card (Swipeable)
*Established: Screen 12. Used on: 12, 32*

- ink-brown-800 card, --r-xl (28pt), 24pt padding
- Full-width minus 32pt
- Domain tag chip(s) top-left
- Action description: 16pt Cabinet Grotesk SemiBold, white
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
- Text: 13pt Cabinet Grotesk SemiBold, white at 40%, uppercase
- Background: ink-900 + backdrop-blur on scroll
- Height: 32pt
- Content: "Today", "Yesterday", "May 18, 2026", etc.

### Search Bar
*Established: Screen 25. Used on: 25, 29, 40*

- Full-width minus 32pt, 44pt tall
- Background: ink-brown-800, --r-md (14pt)
- Left: search icon (16pt, white at 40%)
- Placeholder: 15pt Switzer Regular, white at 40%
- Text: 15pt Switzer Regular, white
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
- Value: 20pt Cabinet Grotesk SemiBold, white, centered
- Label: 12pt Switzer Regular, white at 50%, centered, 4pt below value
- Count-up animation on mount: 0 to final value, 280ms ease-out-soft

### Exercise Preview Chip
*Established: Screen 26. Used on: 26*

- Horizontal ScrollView of chips
- Background: ink-900, --r-sm (10pt)
- Padding: 8pt horizontal, 4pt vertical
- Text: 13pt Switzer Regular, white
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
- Amount: 20pt Cabinet Grotesk Bold, white
- Label: 12pt Regular, white at 50%
- Delta: 13pt Semibold, green (positive) or red (negative) + arrow indicator
- Height: ~96pt

### Amount Display (Hero)
*Established: Screen 31. Used on: 31*

- 36pt Cabinet Grotesk Bold, white, centered
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
- Text: 13pt Cabinet Grotesk SemiBold, domain color or orange

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

- "maybe later" in 15pt Switzer Regular, white at 50%, center-aligned
- Touch target: full-width x 44pt
- No underline, no decoration

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
- Message: 15pt Switzer Regular, white, 32pt from card left, max 3 lines
- Height: 56–72pt (variable)
- Tap: navigates to SIA Chat with domain context pre-loaded

### SIA Coaching Note Card — Contextual Variant
*Established: Screen 30 (canonical). Used on: 14, 16, 30, 33*

- ink-brown-800 card, --r-xl (28pt), 24pt padding
- Purple (#7F24FF) left border: 3pt wide, 40% opacity
- SIA avatar: 16pt circle with purple gradient fill (on some screens)
- "ask SIA" link: 13pt Switzer Medium, purple at 60%, right-aligned or below text
- Message: 14–15pt Switzer Regular, white at 80%, 2–3 lines
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

---

## RPG / Gamification Patterns

### XP Earned Badge
*Established: Screen 27. Used on: 27, 38, 42*

- Badge: orange at 15% bg, --r-pill, 16pt horizontal / 8pt vertical padding
- Text: "+NN XP" in 20pt Cabinet Grotesk SemiBold, Burnt Orange
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
- 14pt Cabinet Grotesk SemiBold, orange

### RPG Skill Badge (Domain Level)
*Established: Screen 26. Used on: 26, 28, 30, 32, 33, 34, 35, 36, 39*

- Text: "Lv.N" in 13pt Cabinet Grotesk SemiBold
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

---

## Domain-Specific Patterns

### Domain Dashboard Header
*Established: Screen 26 (canonical). Used on: 26, 28, 30, 32, 33, 34, 35, 36*

- Height: 56pt, FIXED (sticky on scroll, z-30, backdrop-blur)
- Background: ink-900
- Sub-elements:
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: 20pt Cabinet Grotesk SemiBold, white, left-aligned 56pt from left. "Fitness & workouts", "Nutrition", "Finance", etc.
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
*Established: Screen 16. Used on: 16*

- Diameter: 240pt, centered
- Axes: one per active domain (3–9)
- Grid rings: 3 concentric (33%, 66%, 100%), white at 5%, 1pt
- Axis lines: white at 8%, 1pt
- Data polygon: orange at 15% fill + orange at 80% stroke (2pt)
- Vertex dots: 6pt circles, domain color
- Domain labels: 11pt Semibold, white at 70%, 12pt beyond chart edge
- Touch target: 44x44pt per axis label
- Mount animation: vertices grow from center, 520ms ease-flow
- Time range change: vertices morph, 280ms ease-out-soft

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

---

## Typography Patterns

### Font Family *(v2.1)*

| Role | Family | Weight | Use |
|------|--------|--------|-----|
| Heading | Cabinet Grotesk | Bold (700) | Screen titles, large headings, hero numeric/data values |
| Subheading / UI label | Cabinet Grotesk | SemiBold (600) | Section headings, card/nav titles, chips, badges, buttons, stat labels |
| Body | Switzer | Regular (400) | Body copy, descriptions, captions, placeholders, timestamps |
| Body Emphasis | Switzer | Medium (500) | Emphasized inline UI labels, action words within body text, links inside paragraphs |
| Logo/wordmark only | Chillax | ExtraBold (800) | "Balencia." wordmark asset only — splash screen mark, never for UI headings or body text |

> **v2.1 change**: Sora is deprecated app-wide. Cabinet Grotesk replaces it for all headings/UI chrome; Switzer replaces it for all body/caption text. See `Balencia-Brand-Guidelines-v2.1.md` §4.

### Mobile Type Scale

| Role | Family | Size | Weight | Line Height | Usage |
|------|--------|------|--------|-------------|-------|
| Screen title (large) | Cabinet Grotesk | 24–28pt | Bold (700) | 1.2 | Home, Goals List, auth headings |
| Screen title (nav bar) | Cabinet Grotesk | 17pt | SemiBold (600) | 1.3 | Collapsed/scrolled titles |
| Section heading | Cabinet Grotesk | 18–20pt | SemiBold (600) | 1.3 | Card titles, section headers |
| Card title | Cabinet Grotesk | 16–17pt | SemiBold (600) | 1.4 | Goal name, action description |
| Body | Switzer | 15–16pt | Regular (400) | 1.5 | SIA messages, descriptions |
| Body Emphasis | Switzer | 15–16pt | Medium (500) | 1.5 | Emphasized inline links, action words within body text |
| Caption/meta | Switzer | 12–13pt | Regular (400) | 1.4 | Timestamps, tertiary info |
| Eyebrow | Cabinet Grotesk | 12pt | SemiBold (600) | 1.3 | Section labels, uppercase, +0.12em tracking |
| Small label | Cabinet Grotesk | 11pt | SemiBold (600) | 1.2 | Domain tag text, tab labels (minimum size) |
| Data / Numeric | Cabinet Grotesk | Context-dependent | Bold (700) | 1.0–1.1 | Scores, XP totals, hero amounts, KPI/stat values |

### v2.1 Canonical Type Scale (Web/Cross-Platform Reference)
*Per `Balencia-Brand-Guidelines-v2.1.md` §4. Desktop/mobile-web px sizes shown for cross-touchpoint consistency (marketing site, dashboards); the app's own screens use the pt-based Mobile Type Scale above.*

| Level | Font | Weight | Size (Desktop) | Size (Mobile) |
|-------|------|--------|-----------------|-----------------|
| H1 | Cabinet Grotesk | 700 | 48–56px | 36–40px |
| H2 | Cabinet Grotesk | 700 | 36–40px | 28–32px |
| H3 | Cabinet Grotesk | 700 | 28–32px | 22–26px |
| H4 | Cabinet Grotesk | 600 | 22–24px | 18–20px |
| H5 | Cabinet Grotesk | 600 | 18–20px | 16–18px |
| Body Large | Switzer | 400 | 18px | 16px |
| Body | Switzer | 400 | 16px | 15px |
| Body Small | Switzer | 400 | 14px | 13px |
| Caption | Switzer | 400 | 12px | 12px |
| Overline | Cabinet Grotesk | 600 | 11–12px uppercase | 11px uppercase |
| Stat / Number | Cabinet Grotesk | 700 | Context-dependent | Context-dependent |

### Letter Spacing *(v2.1 §4)*

| Level | Tracking |
|-------|----------|
| Display / H1 | -0.03em to -0.025em |
| H2 / H3 | -0.02em |
| H4 / H5 | -0.01em |
| Body | 0 (default) |
| Caption | 0 to +0.01em |
| Overline | +0.08em to +0.12em |

### Line Height *(v2.1 §4)*

| Level | Line Height |
|-------|-------------|
| Display / H1 | 0.92–0.96 |
| H2 / H3 | 1.0–1.1 |
| H4 / H5 | 1.2–1.3 |
| Body | 1.5–1.6 |
| Caption | 1.4 |

### Text Color Hierarchy
- Primary text: white (100%)
- Secondary text: white at 70%
- Tertiary text: white at 50%
- Quaternary text: white at 40%
- Disabled text: white at 30%

### Screen Title Treatment

**Auth/pre-auth (Brand Mode)**:
- 24pt Cabinet Grotesk Bold, white, center-aligned
- Sentence case (never Title Case)
- No accent words on functional headings
- 32pt gap below heading

**Product Mode screens**:
- 28pt Cabinet Grotesk Bold, white, left-aligned, 16pt left margin
- Collapses to 17pt Cabinet Grotesk SemiBold center-aligned in nav bar on scroll (160ms crossfade)
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
| Drag-to-schedule | Calendar events | Move event to time slot | 41 |

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

### Level-Up Variant
*Established: Screen 42. Used on: 42*

All of the above, plus:
- Level transition text: "Level 8 to 9"
- XP bar fill animation: fills to 100%, overflows, resets. Duration: 1200ms ease-flow

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
- Text: 14pt Cabinet Grotesk SemiBold, orange

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

## Pattern Count Summary

| Category | Count |
|----------|-------|
| Design Tokens | 6 token groups (color, radius, shadow, spacing, glassmorphism, domain colors) |
| Navigation Patterns | 4 (tab bar, stack, modal, scroll-reactive nav) |
| Layout Templates | 4 (auth, domain dashboard, detail screen, multi-mode) |
| Component Patterns | 58 (buttons, inputs, cards, rows, chips, controls, overlays) |
| SIA Patterns | 9 (greeting, compact note, contextual note, inline upgrade, processing, real-time, shortcut, suggestion, inspiration) |
| RPG/Gamification Patterns | 5 (XP badge, XP bar, XP float, skill badge, level-up bar) |
| Domain-Specific Patterns | 22 (header, calendar dots, heatmap, macros, water, meal, donut, portions, budget, transaction, savings, KPI, spending chart, reminders, timer, etc.) |
| Chart/Visualization Patterns | 5 (line chart, radar, mini radar, circular countdown, donut) |
| Typography Patterns | 10 roles in type scale (Cabinet Grotesk + Switzer, v2.1) + letter-spacing/line-height tables + 2 title treatments |
| Color Patterns | 3 rule sets (60/30/10, domain usage, surface hierarchy) |
| Motion Patterns | 4 timing tokens, 2 easing curves, 8 screen transitions, staggered entry, pull-to-refresh |
| Interaction Patterns | 8-state model, 12 gesture types, 14 haptic triggers, skeleton loading |
| Celebration Patterns | 4 (full-screen, level-up, toast, XP popup) |
| Empty State Patterns | 3 strategies (Day 1, filtered, all-done) |
| Motivation Adaptation | 3-tier system applied across all content screens |

**Total documented patterns: ~150+ unique patterns across 15 categories, covering all 43 screens.**
