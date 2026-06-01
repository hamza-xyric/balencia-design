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

