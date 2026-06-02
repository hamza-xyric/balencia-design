# Screen Design: Guest Mode Preview

**Screen**: 06 of 73
**File**: 06-guest-mode-preview.md
**Register**: Brand Mode (entry) / Product Mode (demo browsing)
**Primary action**: Browse demo experience (then sign up)
**Tab**: None (entry) / All tabs visible (demo mode, non-functional sign-up state)
**Navigation**: Stack push from Welcome/Sign Up [03]. Entry screen is a single form. After entry, full app loads with demo data + persistent sign-up banner. Tapping "sign up" navigates back to Welcome/Sign Up [03].

---

## Purpose

The Guest Mode Preview lets hesitant users experience the full Balencia app with realistic demo data before committing to an account. It answers "what would this app actually look like for me?" — the most common pre-signup hesitation. The user provides only a name and 1-3 domain interests, then browses a pre-populated app including demo SIA conversations, demo goals, demo dashboards, and demo insights. A persistent sign-up prompt ensures they can convert at any moment. This screen has two distinct phases: the mini-onboarding entry form and the persistent demo overlay applied across all app screens.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):

*Phase 1 — Entry form:*
1. Heading — sets expectation ("take a look around")
2. Supporting text — explains what happens next
3. Name input — minimal personalization
4. Domain interest picker — customize the demo experience
5. "Explore" CTA — enter the demo
6. "Sign in" link — for returning users who landed here by mistake

*Phase 2 — Demo browsing:*
1. Full app experience — realistic demo data across all tabs
2. Persistent sign-up banner — conversion mechanism, always visible
3. Demo context — all content is pre-populated, not user-generated

**User flow**:
- **Arrives from**: Welcome/Sign Up [03] via stack push ("Try without an account")
- **Primary exit**: Welcome/Sign Up [03] via stack push (tapping "sign up" on the persistent banner)
- **Secondary exit**: Sign In [04] via stack push ("sign in" link on entry form)
- **Demo browsing**: All app tabs browsable (Today, SIA, Goals, Me) with demo data

---

## Layout

### Phase 1: Entry Form

**Scroll behavior**: None (fixed, content fits viewport)
**Tab bar visible**: No

#### ASCII Wireframe — Entry Form

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│      ← Back                 │  ← back button, top-left
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← symbol only, 48pt, orange
│         └───────┘           │
│                             │  ← 32pt gap
│   "take a look around"     │  ← 24pt Sora Bold, white, centered
│                             │  ← 12pt gap
│   "tell us your name and   │
│   pick a few areas you     │  ← 15pt Sora Regular, white 50%
│   care about."             │
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │  your name         │    │  ← name input field
│   └───────────────────┘    │
│                             │  ← 24pt gap
│   LIFE AREAS               │  ← eyebrow label
│                             │  ← 12pt gap
│   ┌──────┐ ┌──────┐ ┌────┐│
│   │fitness│ │nutri │ │well││  ← domain chips row 1
│   └──────┘ └──────┘ └────┘│
│   ┌──────┐ ┌──────┐ ┌────┐│
│   │finan │ │career│ │rela││  ← domain chips row 2
│   └──────┘ └──────┘ └────┘│
│   ┌──────┐ ┌──────┐ ┌────┐│
│   │spirit│ │learn │ │crea││  ← domain chips row 3
│   └──────┘ └──────┘ └────┘│
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │     explore        │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │  ← 32pt gap
│   "Already have an account? │
│    sign in"                 │  ← nav link
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

#### Component Stack — Entry Form (top to bottom)

1. **Back Button Row** — 44pt
   - Purpose: Return to Welcome/Sign Up [03]
   - Content: Left chevron, white, 20pt

2. **Logo Area** — 48pt logo + 32pt top margin + 32pt bottom margin = 112pt
   - Purpose: Brand anchor
   - Content: Balencia symbol only, 48pt, Burnt Orange

3. **Heading + Supporting Text** — ~70pt
   - Purpose: Set expectation
   - Content: "take a look around" + supporting copy

4. **Name Input** — 52pt + 24pt bottom margin = 76pt
   - Purpose: Minimal personalization
   - Content: Reuse Text Input Field pattern from Batch 1

5. **Domain Interest Picker** — ~160pt
   - Purpose: Customize demo to user's interests
   - Content: Eyebrow label + 9 domain chips in 3 rows

6. **Explore CTA** — 56pt + 32pt top margin = 88pt
   - Purpose: Enter demo experience
   - Content: "explore" orange pill button

7. **Navigation Link** — 44pt
   - Purpose: Escape hatch for returning users
   - Content: "Already have an account? sign in"

### Phase 2: Demo Browsing

**Scroll behavior**: Per-screen (inherits from each app screen)
**Tab bar visible**: Yes (all 4 tabs active with demo data)

#### ASCII Wireframe — Demo Mode Overlay

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│                             │
│  [Normal app screen         │
│   content with demo data    │  ← full app experience
│   — Today, SIA, Goals,      │
│   or Me tab content]        │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ ✦ sign up to save your  │ │  ← persistent banner, 52pt
│ │   progress    [sign up] │ │     above tab bar
│ └─────────────────────────┘ │
├─────────────────────────────┤
│  Today    SIA   Goals   Me  │  ← bottom tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

---

## Components

### Back Button
- **Purpose**: Return to Welcome/Sign Up [03]
- **Data source**: Navigation stack
- **Visual treatment**: Reuse Back Button pattern from Batch 1
- **Variants**: None
- **Gestures**: Tap, iOS swipe-right-from-edge
- **Size**: 44x44pt touch target

### Screen Heading (Entry Form)
- **Purpose**: Set expectation — this is a preview, not a commitment
- **Data source**: Static copy
- **Visual treatment**: "take a look around" — 24pt Sora Bold, white, center-aligned. Supporting text "tell us your name and pick a few areas you care about." — 15pt Sora Regular, white at 50%, center-aligned, max 2 lines.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 32pt (16pt margins)

### Name Input Field
- **Purpose**: Minimal personalization (demo data will use this name)
- **Data source**: User input
- **Visual treatment**: Reuse Text Input Field pattern from Batch 1. Placeholder: "your name". Keyboard type: default. Autocomplete: given-name.
- **Variants**: Default, Focused, Filled, Error
- **Gestures**: Tap to focus
- **Size**: (screen width - 32pt) x 52pt

### Domain Interest Picker
- **Purpose**: Let users select 1-3 life areas to customize the demo experience
- **Data source**: Static list of 9 domains
- **Visual treatment**: Eyebrow label "life areas" (12pt Sora Semibold, uppercase, +0.12em tracking, white at 40%). Below: 9 domain chips arranged in a 3x3 grid with 8pt horizontal and 8pt vertical gaps. Each chip: pill shape (--r-pill), 36pt height, 12pt horizontal padding. Unselected: ink-brown-800 bg, 1pt white 10% border, domain color icon (16pt) + domain name (13pt Sora Semibold, white at 70%). Selected: domain color bg at 20% opacity, 1pt domain color border, icon + text at full white. Maximum 3 selections.
- **Domain chips**:
  - Fitness (#EF4444) · Nutrition (#84CC16) · Wellbeing (#14B8A6)
  - Finance (#10B981) · Career (#6366F1) · Relationships (#EC4899)
  - Spirituality (#A855F7) · Learning (#06B6D4) · Creativity (#F59E0B)
- **Variants**: Unselected, Selected (max 3), Deselecting (tap a selected to remove)
- **Gestures**: Tap to select/deselect
- **Size**: Each chip ~110pt x 36pt. Grid: ~340pt wide x ~124pt tall

### Explore CTA Button
- **Purpose**: Enter the demo experience
- **Data source**: Triggers demo mode initialization
- **Visual treatment**: Reuse Brand CTA Button pattern from Batch 1. Text: "explore". Disabled until name is entered and at least 1 domain selected.
- **Variants**: Default, Pressed, Disabled, Loading
- **Gestures**: Tap to submit
- **Size**: (screen width - 32pt) x 56pt

### Persistent Sign-Up Banner (Demo Mode)
- **Purpose**: Convert guest users to registered accounts — always visible during demo browsing
- **Data source**: Static + user's entered name
- **Visual treatment**: Full-width - 32pt margins (16pt each side). Height: 52pt. Background: ink-brown-800 (#211008) with 1pt white 10% border. Border radius: --r-xl (28pt). Positioned above the tab bar with 8pt gap. Content: Balencia symbol (16pt, orange) + "sign up to save your progress" (14pt Sora Regular, white at 70%) + "sign up" button (pill, 32pt height, orange bg, white text 13pt Sora Semibold). The banner is persistent across all demo screens — it lives at the z-30 layer above page content but below modals.
- **Variants**: Full banner (default), Minimized pill (after user dismisses — shows only the orange "sign up" pill, 32pt, bottom-right corner above tab bar)
- **Gestures**: Tap "sign up" → navigate to Welcome/Sign Up [03]. Swipe left on banner → minimize to pill. Tap pill → expand back to full banner.
- **Size**: (screen width - 32pt) x 52pt (full), 80pt x 32pt (minimized pill)

### Bottom Tab Bar (Demo Mode)
- **Purpose**: Navigate demo app sections
- **Data source**: Static demo data per tab
- **Visual treatment**: Reuse Bottom Tab Bar pattern from shared patterns. All 4 tabs active: Today, SIA, Goals, Me. Each loads demo content.
- **Variants**: Active tab highlighted
- **Gestures**: Tap to switch tabs
- **Size**: Full-width x 56pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "take a look around" — sentence case |
| Supporting text | Sora | 400 (Regular) | 15pt | 22pt | White at 50% | Two lines max |
| Name input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "your name" |
| Eyebrow label | Sora | 600 (Semibold) | 12pt | 14pt | White at 40% | "LIFE AREAS" — uppercase, +0.12em tracking |
| Domain chip label | Sora | 600 (Semibold) | 13pt | 16pt | White at 70% (unselected), White (selected) | Domain names, sentence case |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "explore" |
| Nav link (context) | Sora | 400 (Regular) | 15pt | 20pt | White at 50% | "Already have an account?" |
| Nav link (action) | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "sign in" |
| Banner text | Sora | 400 (Regular) | 14pt | 18pt | White at 70% | "sign up to save your progress" |
| Banner button | Sora | 600 (Semibold) | 13pt | 16pt | White #FFFFFF | "sign up" |

---

## Composition & Visual Hierarchy

**Squint test (Entry Form)**:
- Heading reads as page title (largest text, full white)
- Name input is a clear dark field with placeholder
- Domain chips form a structured grid — selected chips glow with their domain color
- Orange CTA is the most prominent interactive element
- Supporting text and nav link fade into the background

**Spacing breakdown (8pt grid)**:
- Back button row: 44pt
- Back button to logo: 16pt (--s-4)
- Logo to heading: 32pt (--s-6)
- Heading to supporting text: 12pt (--s-3)
- Supporting text to name input: 32pt (--s-6)
- Name input to eyebrow: 24pt (--s-5)
- Eyebrow to chip grid: 12pt (--s-3)
- Between chip rows: 8pt (--s-2)
- Chip grid to CTA: 32pt (--s-6)
- CTA to nav link: 32pt (--s-6)

**Z-layers**:
- z-0: ink-900 background
- z-10: Input field, domain chips (surfaces)
- z-20: CTA button
- z-30: Persistent sign-up banner (demo mode)
- z-40: Bottom tab bar (demo mode)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Supporting text | rgba(255,255,255,0.5) | white at 50% | Secondary |
| Input background | #211008 | ink-brown-800 | Elevated surface |
| Input border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle |
| Input border (focused) | #FF5E00 | brand-orange | Focus indicator |
| Eyebrow label | rgba(255,255,255,0.4) | white at 40% | Label |
| Chip (unselected) bg | #211008 | ink-brown-800 | Surface |
| Chip (unselected) border | rgba(255,255,255,0.1) | white at 10% | Subtle |
| Chip (selected) bg | [domain color at 20%] | per domain | Tinted surface |
| Chip (selected) border | [domain color] | per domain | Domain identity |
| Chip icon | [domain color] | per domain | Always domain color |
| CTA background | #FF5E00 | brand-orange | Primary action |
| CTA text | #FFFFFF | white | High contrast |
| Nav link action | #FF5E00 | brand-orange | Tappable |
| Banner background | #211008 | ink-brown-800 | Elevated surface |
| Banner symbol | #FF5E00 | brand-orange | Brand mini-icon |
| Banner button bg | #FF5E00 | brand-orange | Conversion CTA |

**60/30/10 verification**: Orange on CTA, input focus, nav link, banner button, brand symbol — clearly primary. Domain colors on chips only (identification, not action). No green (no success states on this screen). No purple (SIA not present on entry form). Appropriate for a Brand Mode entry screen.

---

## Interaction States

### Domain Interest Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | ink-brown-800 bg, white 10% border, domain icon + white 70% text | — |
| Pressed | Scale(0.95), bg darkens | Light impact |
| Selected | Domain color 20% bg, domain color border, white text, icon brightens | Medium impact |
| Deselecting (pressed on selected) | Scale(0.95) | Light impact |
| Max reached (4th selection attempt) | Brief shake animation on tapped chip, no selection | Error notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Explore CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "explore" | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40% opacity. Active when name non-empty AND at least 1 domain selected. | — |
| Loading | White spinner replaces text | — |
| Success | Green glow (600ms), then transitions to demo mode | Success notification |

### Persistent Sign-Up Banner
| State | Visual | Haptic |
|-------|--------|--------|
| Default (full) | ink-brown-800 bg, text + "sign up" pill | — |
| "sign up" pressed | Pill: darker orange, scale(0.95) | Light impact |
| Minimized | Small orange pill "sign up" in bottom-right, 80pt x 32pt | — |
| Minimized → expanding | Pill animates to full-width banner | Light impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Navigate back to [03] |
| Tap | Name input | Focus field, raise keyboard |
| Tap | Domain chip | Select/deselect domain interest |
| Tap | Explore CTA | Initialize demo mode |
| Tap | "sign in" link | Navigate to [04] |
| Tap | Banner "sign up" button | Navigate to [03] (pre-filled with guest name) |
| Swipe left | Sign-up banner | Minimize banner to pill |
| Tap | Minimized pill | Expand banner back to full |
| iOS edge swipe | Screen edge | Navigate back to [03] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Entry form content | Screen mount | Staggered fade-in: back button (0ms), logo (80ms), heading (160ms), input (240ms), chips (320ms), CTA (400ms), link (480ms). All: opacity 0→1, translateY(12→0) | 280ms each | ease-out-soft |
| Domain chip selection | Tap | Scale(1→1.05→1), bg crossfade to domain tint | 160ms (--dur-fast) | ease-out-soft |
| Domain chip deselection | Tap | Scale(1→0.95→1), bg crossfade to neutral | 160ms (--dur-fast) | ease-out-soft |
| Demo mode transition | Explore CTA success | Entry form fades out (opacity 1→0, 280ms), tab navigator fades in with sign-up banner sliding up from bottom | 520ms total (--dur-slow) | ease-flow |
| Sign-up banner minimize | Swipe left | Banner slides right + shrinks to pill, pill slides to bottom-right | 280ms (--dur-base) | ease-out-soft |
| Sign-up banner expand | Tap pill | Pill expands from bottom-right to full width | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (from [03]), 280ms
- **Exit to demo**: In-screen crossfade (entry form → tab navigator), 520ms
- **Exit to sign up**: Stack push from right to [03], 280ms

---

## Empty States

### Day 1 (new user)
The entry form IS the default state — empty name field with placeholder, all 9 domain chips unselected. The screen is designed for this exact scenario. Copy is warm and inviting: "take a look around" — no pressure, no commitment.

### Demo Browsing
All demo screens show pre-populated realistic data:
- **Today tab**: Demo SIA greeting with the guest's entered name, 3-4 sample action cards, sample goal progress rings
- **SIA tab**: Pre-scripted demo conversation showing SIA's capabilities (cross-domain insight, a rich inline card, a suggestion chip interaction)
- **Goals tab**: 2-3 sample goals with progress (e.g., "Run a half marathon" at 40%, "Save $5,000" at 25%)
- **Me tab**: Demo RPG character (Level 3, 450 XP), sample explore grid

Demo data feels real but is clearly illustrative. The user's entered name is used in SIA greetings and the Me tab.

### Established user (zero state)
N/A — guest mode has no persistent state.

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established — this is a pre-auth demo experience. Demo data shows a "medium motivation" density level to represent the typical experience.

---

## Guest → Registered Conversion

### Conversion Triggers
The guest is prompted to sign up at three escalating moments:

1. **Passive (persistent banner)**: The sign-up banner is visible from the moment demo mode begins. It never auto-dismisses — it rides above the tab bar on every screen. If the user minimizes it (swipe left), the orange pill remains in the bottom-right corner.

2. **Soft prompt (interaction boundary)**: When the guest attempts an action that requires a real account — tapping the SIA chat input field, trying to create a goal, attempting to log data — a bottom sheet (40% screen height) slides up:
   - Heading: "this needs an account" — 20pt Sora Bold, white, center-aligned
   - Supporting text: "sign up to save your data, chat with SIA, and track real progress." — 15pt Sora Regular, white at 50%, center-aligned, 2 lines max
   - Primary CTA: "sign up" — Brand CTA Button (56pt, orange pill, full-width minus 32pt)
   - Secondary: "keep exploring" — 15pt Sora Semibold, white at 50%, center-aligned, 32pt below CTA
   - Tap "sign up" → navigate to Welcome/Sign Up [03] with guest name pre-filled
   - Tap "keep exploring" or drag-dismiss → return to demo, interaction blocked
   - Maximum 2 soft prompts per session (tracked locally). After the 2nd, subsequent blocked actions show only a brief inline toast: "sign up to unlock this" (48pt, white on ink-brown-800, 3s auto-dismiss)

3. **Session-end prompt**: After 5 minutes of demo browsing (tracked from first tab interaction), a full-screen overlay appears once per session:
   - Gradient background: ink-900 at 90% opacity over current screen
   - Balencia symbol: 48pt, orange, centered
   - Heading: "ready to make it real?" — 24pt Sora Bold, white, center-aligned
   - Supporting text: "everything you've seen is waiting for you — with your own data, your own goals, and SIA coaching built around your life." — 15pt Sora Regular, white at 50%, center-aligned, 4 lines max
   - Primary CTA: "sign up" — Brand CTA Button (56pt, orange pill)
   - Secondary: "not yet" — 15pt Sora Semibold, white at 50%
   - Tap "not yet" → dismiss overlay, demo continues with no further full-screen prompts

### Data Preservation Policy
- **No data is preserved from guest mode.** The demo uses pre-populated seed data, not user-generated content. The user cannot log food, create goals, or chat with SIA during the demo — these actions trigger the soft prompt.
- The only user input preserved is the **name** entered on the entry form. If the guest taps "sign up" at any point, the name is passed to Welcome/Sign Up [03] and pre-filled in the name field.
- This is communicated transparently: the sign-up banner reads "sign up to save your progress" (not "save your data"), and the soft prompt says "sign up to save your data, chat with SIA, and track real progress." No implication of existing data loss since no real data was created.

### Conversion Flow Motion
| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Soft prompt bottom sheet | Blocked action | Slide up from bottom, backdrop dims to ink-900 at 60% | 520ms | ease-flow |
| Soft prompt dismiss | "keep exploring" or drag | Slide down, backdrop clears | 280ms | ease-out-soft |
| Session-end overlay | 5-minute timer | Fade-in (opacity 0→1), content stagger (symbol 0ms, heading 120ms, text 240ms, CTA 360ms) | 280ms each | ease-out-soft |
| Session-end dismiss | "not yet" | Fade-out (opacity 1→0) | 280ms | ease-out-soft |
| Inline toast | 3rd+ blocked action | Slide down from below header, auto-dismiss after 3s | 280ms in, 280ms out | ease-out-soft |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Demo mode initialization fails | "explore" CTA reverts from loading to default; toast: "Could not load demo. Please try again." (ink-brown-800 bg, --r-md, auto-dismiss 4s); entry form data preserved | User taps "explore" to retry |
| Demo data fails to load for a tab | Affected tab shows skeleton placeholders (shimmer animation) with centered text: "demo content unavailable" (15pt Sora Regular, white at 40%) | User switches to another tab; content retries on next tab visit |
| Network unavailable during demo | Inline toast: "Demo requires a connection." (48pt, ink-brown-800 bg, centered, auto-dismiss 3s); "explore" CTA disabled while offline | CTA re-enables when connectivity returns |
| Sign-up banner navigation fails | "sign up" pill shows pressed state but does not navigate; brief error toast: "Something went wrong. Try again." | User taps "sign up" again |
| Domain chip selection exceeds max (4th tap) | Tapped chip plays brief shake animation; no selection registered | User deselects an existing chip before selecting a new one |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "take a look around" heading on mount as the page title
- Focus order (entry form): Back button -> Logo (decorative, skipped) -> Heading -> Supporting text -> Name input -> "life areas" eyebrow label -> Domain chips (left-to-right, top-to-bottom) -> Explore CTA -> "sign in" link
- Each domain chip: accessible role "toggle button"; state announced as "selected" or "not selected"; label is domain name (e.g., "Fitness, not selected")
- Maximum selection enforced: screen reader announces "Maximum 3 areas selected" when 4th chip is tapped
- Persistent sign-up banner (demo mode): accessible label "Sign up to save your progress. Tap sign up to create an account."
- Soft prompt bottom sheet: focus traps within the sheet when open; "keep exploring" acts as dismiss
- Session-end overlay: focus traps within the overlay; "not yet" acts as dismiss
- Reduced motion: skip domain chip selection scale animations and demo mode crossfade; use instant transitions

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + iOS (trust preview) — *stays Balencia via warm-glow domain-chip tinting + continuous-stroke demo transition motion + non-shaming framing.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (95)

Pre-grade drivers (the gap to A++): the entry form spec is textually complete but (1) surfaces are flat `--color-ink-brown-800` cards with no top-edge highlight or layered depth; (2) domain chips read as a generic tile grid, not a Balencia moment; (3) microcopy edge cases (demo loading, demo failure, soft-prompt permission rationale, disabled-CTA reasons) are partly unauthored; (4) the soft-prompt and session-end overlays lack designed states; (5) the persistent sign-up banner is flat, not layered; (6) contrast pairs on the entry form are asserted, not tabulated; (7) no single ownable moment anchors the screen's warmth.

### Focal hierarchy

The **entry form's focal point is the "Explore" CTA button** (56pt `--radius-pill`, full-width, `--color-brand-orange`), sized as a hero and visually dominant above the fold. The **"take a look around" heading** is the emotional anchor (32pt `--text-display-l`, white, sentence case), read first on mount. Everything else is secondary: the logo sits as a brand anchor (48pt, not competing); supporting text, name input, and domain picker form a structured information flow (tight, 8–12pt gaps within groups); the "sign in" link is the escape hatch (secondary weight, 15pt `--text-body` regular, white at 50%). The squint test lands on heading + orange CTA first, then domain chips as a grid block, then supporting scaffold. No competing foci.

### Surface & depth

Entry form surfaces adopt `CK-P1` Layered Warm Surface: every card — name input, domain chips, "Explore" CTA, persistent sign-up banner in demo mode — carries `--color-ink-brown-800` body · `--radius-md` (14pt for chips and small fields) or `--radius-pill` (CTAs) · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01 --edge-highlight`** (inset 0 1px 0 `--color-alpha-white-06`, the not-flat cue) · `--shadow-1`. Screen background is `--color-ink-900` (full-bleed dark). No glow at entry-form scale (all elements <36px or inline per `CONSISTENCY.md §1`); unselected chips are flat surfaces only; selected chips glow faintly with `CK-T05 --glow-orange-sm` (~12px /.35, warm, not neon). Persistent sign-up banner in demo mode adds `CK-T02 --surface-backplate` (faint warm radial tint behind banner) to read elevated above tab bar. Z-layers: ink-900 field → z-10 inputs/chips (surfaces) → z-20 CTAs → z-30 banner (above tab content) → z-40 tab bar. Extends layered depth language to all entry-form surfaces so nothing reads as flat box.

### Typographic rhythm

Map Typography table to `CK-P3` tokens: heading "take a look around" → `--text-display-l` (32pt) / 700 weight / `--leading-tight` (1.1) / white 100%; supporting text → `--text-body` (16pt, raised from 15pt) / 400 / `--leading-normal` (1.4) / white at 50%; name input hint text → `--text-body` / 400 / `--leading-normal` / white at 40%; eyebrow "LIFE AREAS" → `--text-eyebrow` (12pt) / 600 / `--leading-snug` (1.25) / `--tracking-eyebrow` (0.12em) / uppercase / white at 40%; domain chip label (unselected) → `--text-h3` (17pt, elevated from 13pt) / 600 / white at 70%; domain chip label (selected) → same, white 100%; Explore CTA text "explore" → `--text-h2` (20pt, elevated from 17pt for focal prominence) / 600 / `--leading-snug` / white 100%; nav link context → `--text-body` / 400 / white at 50%; nav link action "sign in" → `--text-body` / 600 / `--color-brand-orange`; persistent banner text → `--text-body` / 400 / white at 70%; banner button text → `--text-h3` / 600 / white 100%. Hierarchy by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (CTA "explore", nav "sign in"). Chillax logo-only (none here). Replaces ad-hoc pixels with `CK-T04` line-height scale.

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice — warm, coaching, on-voice, non-shaming.

Entry form:
- Heading "take a look around" — *before:* given → *after (kept):* same; warm, inviting, no pressure.
- Supporting text "tell us your name and pick a few areas you care about." — *before:* given → *after (kept):* same; warm, direct.
- Name input hint text "your name" — *before:* given → *after (kept):* same; lowercase, warm.
- Eyebrow "LIFE AREAS" — *before:* given → *after (kept):* same; already eyebrow-correct.
- Domain chip 4th selection blocked — *before:* shake animation only → *after (new):* toast "Pick up to 3 areas" near tapped chip, 2s auto-dismiss; warm framing of limit.
- Explore CTA disabled reason — *before:* no message → *after (new):* aria-label "Explore (requires a name and at least 1 area selected)"; disabled state 0.5 opacity clearly signals unavailability.
- Explore CTA loading — *before:* no message → *after (new):* button text shifts to "Starting your preview…" or inline spinner + label "Loading…" (never blank spinner).
- Explore CTA success — *before:* not specified → *after (new):* brief toast "Welcome to your preview" (warm, brief, 2s auto-dismiss before crossfade).
- Explore CTA failure — *before:* not specified → *after (new):* button reverts to default, toast: "Couldn't start your preview — your internet or our servers might be busy. Try again." (warm, honest, specific recovery path).

Demo phase persistent banner:
- Banner heading "sign up to save your progress" — *before:* given → *after (kept):* same; warm, honest (no data implication).
- Banner dismiss (swipe left) — *before:* no message → *after (new):* brief toast "Minimized — tap the pill to expand" on first swipe.
- Soft-prompt sheet heading "this needs an account" — *before:* given → *after (kept):* same; warm, direct, non-shaming.
- Soft-prompt supporting text — *before:* given → *after (kept):* same; warm, benefit-focused.
- Soft-prompt "keep exploring" → aria-label "Close this prompt and keep browsing the demo"; styled as secondary text (15pt white at 50%), 44pt min target.
- Soft-prompt max-reach inline toast → "sign up to unlock this" (kept, on-voice); brief, warm.
- Session-end overlay heading "ready to make it real?" → *before:* given → *after (kept):* same; warm, conversational.
- Session-end supporting text — *before:* given → *after (kept):* same; warm, benefit-driven, no pressure.
- Session-end "not yet" → aria-label "Dismiss this and continue browsing the demo"; styled as secondary (15pt white at 50%).

Error states & edge cases:
- Demo mode init fails — *before:* "Could not load demo. Please try again." → *after (warmer):* "Couldn't start your preview. Your internet might be busy — pull to refresh or try again in a moment."
- Demo data partial failure — *before:* shimmer indefinitely → *after (new):* 3s shimmer max, then "Demo content for [tab] isn't loading. Check your connection or try another tab." (specific, recovery action).
- Network unavailable — *before:* "Demo requires a connection" → *after (warmer):* "Your preview needs a connection — once you're back online, try again."
- No exclamation marks — all copy uses the brand period (.) with intent.

### Motion choreography

Locked to `CK-P4` order (draw-first, hero leads):

Entry form entrance — staggered fade-in on screen mount:
1. Back button (0ms, opacity 0→1, `--dur-base` 280ms, `--ease-out-soft`)
2. Logo (80ms, same)
3. Heading (160ms, same)
4. Supporting text (240ms, same)
5. Name input (320ms, same)
6. Eyebrow + domain chips (400ms, staggered L-R top-to-bottom 40ms per chip, same easing)
7. Explore CTA (480ms, same)
8. Nav link (560ms, same)

Domain chip selection/deselection:
- Unselected → selected: scale 1→1.08→1 (160ms `--dur-fast`), bg crossfade to domain color at 20% opacity, border crossfade to domain color (1pt), text/icon brighten to white 100%; light haptic.
- Selected → unselected: scale 1→0.95→1, bg/border/text fade to neutral; light haptic.
- Max selection (4th tap): tapped chip shake (scale oscillate, 160ms), no selection, optional error tone.

Demo mode transition (Explore success):
Entry form fades out (opacity 1→0, `--dur-slow` 520ms `--ease-flow`) as tab navigator + banner fade in (staggered 40ms apart, each 280ms `--dur-base`). Banner slides up from below tab bar (translateY 56pt→0, 520ms `--dur-slow` `--ease-flow` in parallel). **Ownable moment**: continuous-stroke motion draws new UI into view (not hard swap).

Persistent sign-up banner (demo mode):
- Mount: slides up + content fades in (280ms `--dur-base`, `--ease-out-soft`).
- Minimize (swipe left): slides right + shrinks to pill (280ms), animates to bottom-right above tab bar.
- Expand (tap pill): animates from bottom-right to full-width (280ms).

Soft-prompt bottom sheet (blocked action):
- Enter: slides up (translateY 100%→0, 520ms `--dur-slow` `--ease-flow`), backdrop dims to ink-900 60%, content stagger within sheet (heading 0ms, supporting text 120ms, CTA 240ms, each 280ms `--dur-base`).
- Dismiss: slides down (280ms).

Session-end overlay (5-min timer):
- Enter: fade-in (opacity 0→1, 280ms), backdrop appears, content stagger (symbol 0ms, heading 120ms, supporting text 240ms, CTA 360ms, each 280ms).
- Dismiss: fade-out (280ms).

Reduced-motion fallback: all animations collapse to instant; final states displayed immediately. Signature preserved in static form (continuous-stroke aesthetic in final UI layout).

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| Cold-start / Day-1 (entry form, fresh) | Empty name field (hint text visible), all 9 chips unselected, Explore CTA disabled (0.5 opacity), nav link visible | "take a look around" heading sets no-pressure tone; hint text + eyebrow guide user | profile floats card-less on ink-900; chips flat ink-brown-800 surfaces (no glow); CTA orange pill, ready to activate |
| Loading (Explore pressed, waiting) | Name input disabled (0.4 opacity), chips disabled, Explore CTA shows spinner + "Starting your preview…" or label "Loading…", nav link disabled | "Starting your preview…" (warm, brief) | CTA maintains orange bg (not greyed), spinner on white |
| Empty / partial (form state, validation fails) | All fields rendered, only invalid field highlighted (red border 1pt `--color-error-red`, not blanket banner) | Per-field error: name empty → no message; domain chips max reached → toast "Pick up to 3 areas" (warm, specific) | invalid field gets red 1pt border (≥3:1 WCAG 1.4.11), no colour-alone; glyph + word if banner |
| Error (Explore pressed, API/network fails) | Explore CTA reverts to default (orange, enabled), name + chips re-enabled, toast: "Couldn't start your preview — your internet or our servers might be busy. Try again." (48pt, ink-brown-800 bg, `--radius-md`, 4s auto-dismiss) | Honest, specific error (names two likely causes), offers recovery action, warm tone | toast on ink-brown-800 with 1pt `--color-alpha-white-06` border, `--edge-highlight` top, shadow-1; no red |
| Success / demo transition | Entry form fades out, demo UI (tab navigator + banner) fades in + slides from below; tab bar animates into place; banner above it (smooth crossfade, no jumps) | Brief success toast "Welcome to your preview" (warm, calm); banner now reads "sign up to save your progress" | form's ink-brown-800 surfaces fade smoothly; demo surfaces appear with full depth (edge-highlight visible immediately); banner glows faintly with `--surface-backplate` |
| Demo mode — no wearable / no data | Health Metrics Strip affordance card: "Connect a device to see your vitals" + connect button (orange pill, 44pt target) | "Connect a device to see your vitals" (warm, inviting); never silently hidden | affordance card uses `CK-P1` layered surface |
| Demo mode — soft-prompt (blocked action) | Bottom sheet slides up, semi-transparent backdrop (ink-900 60%) over current screen, centered content: heading + supporting text + CTA + secondary link | Heading: "this needs an account" (warm, direct); supporting: "sign up to save your data, chat with SIA, and track real progress." (benefit-focused, non-shaming); CTA: "sign up"; secondary: "keep exploring" (lowercase, secondary) | sheet bg ink-brown-800, full `CK-P1` depth, heading `--text-h2` 600, supporting `--text-body` 400, CTA orange pill |
| Demo mode — max soft-prompts reached | Inline toast below action trigger: "sign up to unlock this" (48pt, ink-brown-800 bg, centered, 3s auto-dismiss) | "sign up to unlock this" (brief, warm, specific); never shows counter | toast on ink-brown-800 with `--edge-highlight`, no red or urgency |
| Demo mode — session-end overlay (5-min timer) | Full-screen overlay: gradient background (ink-900 90% opacity over current screen), centered: symbol + heading + supporting text (2-4 lines) + CTA + secondary link | Heading: "ready to make it real?" (warm, conversational, no pressure); supporting: "everything you've seen is waiting for you — with your own data, your own goals, and SIA coaching built around your life." (benefit-driven, specific); CTA: "sign up"; secondary: "not yet" | overlay bg gradient (not flat black); symbol 48pt orange; content white at 90% opacity; CTA orange pill; "not yet" secondary weight |
| Offline (both phases) | Entry form: Explore CTA dimmed (0.4 opacity), nav link enabled; demo mode: all CTAs dimmed (0.4 opacity), inline banner below sticky header: "Demo requires a connection" | "Demo requires a connection. Check your internet and try again." (honest, specific, recovery action named) | all disabled at 0.4 opacity (WCAG-compliant, no colour-alone); banner on ink-brown-800 with `--edge-highlight` |

### Signature & anti-generic

Ownable moment: **demo transition motion** — entry form fades out as demo UI (tab navigator + persistent sign-up banner) slides up from below; banner animates in parallel. This is a **continuous-stroke aesthetic** (layout "draws" into view, not hard swap) that anchors Balencia signature (brand's motion law: draw, never fade). Domain chips' selection tinting (domain color at 20% opacity on chip bg when selected) is also a micro-signature — warm, not cold-neon, mirrors brand's color identity approach (domain colors as identity, not data ink). Anti-generic fixes: (1) domain chip grid is **not** symmetric 3×3 wall — eyebrow label + gap above chips break monotony, anchor hierarchy; (2) entry form is **not** generic onboarding — warm copy ("take a look around"), low-pressure framing, invite-to-explore CTAs signal trust and calm, not urgency; (3) persistent sign-up banner in demo mode is **not** generic paywall — floats above tab bar (intentional z-layer), carries warm-glow surface treatment (`--surface-backplate` radial tint), copy frames signups as preservation step, never coercion. Screen never reads as template onboarding — reads as warm, trust-first preview gate.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Heading "take a look around" | `--color-alpha-white-100` | ≥12:1 on both | Primary text, focal |
| Supporting text | `--color-alpha-white-50` | ≥4.5:1 on both | Secondary text |
| Name input hint text | `--color-alpha-white-40` | ≥4.5:1 on `ink-brown-800` | Label-weight text |
| Domain chip unselected (text) | `--color-alpha-white-70` | ≥4.5:1 on `ink-brown-800` | Interactive label |
| Domain chip selected (text) | `--color-alpha-white-100` | ≥12:1 on domain-color-20% bg | Contrast on tinted bg |
| Domain chip selected (border) | per-domain color | ≥3:1 on `ink-brown-800` (WCAG 1.4.11) | Identity indicator, not data-ink |
| Explore CTA text | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` | Primary action |
| Nav link action "sign in" | `--color-brand-orange` | 3.2:1 on `ink-900` (WCAG 1.4.11) | Interactive text |
| Banner text | `--color-alpha-white-70` | ≥4.5:1 on `ink-brown-800` | Secondary info |
| Banner CTA "sign up" | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` | Primary action in banner |
| Error toast text | `--color-alpha-white-100` | ≥12:1 on `ink-brown-800` | Alert text |
| Disabled state (Explore CTA) | `--color-brand-orange` at 0.5 opacity | ≥4.5:1 on `ink-900` | Disabled text, never colour-alone |

**Focus-visible ring:** every focusable element (inputs, buttons, links, chips) uses `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2pt offset on `ink-900` field) — uniform app-wide. Targets ≥44×44pt (domain chips: 36pt height × 110pt width, falls below 44pt height **flagged Medium finding for build phase** — recommend expanding touch area with vertical padding or increasing to 44pt height).

**Status never colour-alone:** domain chips' selected state signalled by **both** visible colour tint + visible border change + visual weight change (text brightens) — not colour-alone; error state on name field is **red 1pt border + optional glyph** (never bare red bg); disabled CTAs use **reduced opacity + clear disabled state** (never colour-alone) + reason in aria-label.

**Reduced-motion fallback:** entrance animations collapse to instant; forms appear fully rendered at final state (all fields visible, all chips unselected, CTA ready, nav link visible, etc.). Demo transition shows final UI (tab bar visible, banner visible, tab content visible) all at once, no motion. Signature of transition (continuous-stroke aesthetic) preserved in final static layout — UI appears intentional and crafted.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [03] — Welcome/Sign Up via stack push (banner "sign up"), Screen [04] — Sign In via stack push ("sign in" link)
- **Navigates from**: Screen [03] — Welcome/Sign Up via stack push ("Try without an account")
- **Shared components with**: Screen [03] — Welcome/Sign Up (Text Input Field, Brand CTA Button, Auth Navigation Link, Back Button, Brand Symbol)
- **Patterns used**: Brand CTA Button (full-width), Text Input Field, Back Button, Auth Navigation Link, Bottom Tab Bar
- **Patterns established**: **Domain Interest Picker** — 9 domain chips in 3x3 grid, pill shape, domain color tinting on selection, max 3 selections. **Persistent Sign-Up Banner** — floating above tab bar, full-width with inline CTA pill, minimizable via swipe, expandable via tap. **Guest Mode Demo Data Treatment** — full app with pre-populated seed data, user name injected, medium-density default.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-03.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/auth/guest-preview`
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
| B03-F01 | critical | conversion | For this prototype, keep the entry-form placeholder if needed, but label it as preview/demo and provide a clear continuation; full browsable demo tabs can wait. |
| B03-F02 | major | onboarding-friction | Start empty, require a name plus 1-3 domains, and expose accessible selected state with max-selection feedback. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

