# Screen Design: Guest Mode Preview

**Screen**: 06 of 43
**File**: 06-guest-mode-preview.md
**Register**: Brand Mode (entry) / Product Mode (demo browsing)
**Primary action**: Browse demo experience (then sign up)
**Tab**: None (entry) / All tabs visible (demo mode, non-functional sign-up state)
**Navigation**: Stack push from Welcome/Sign Up [03]. Entry screen is a single form. After entry, full app loads with demo data + persistent sign-up banner. Tapping "sign up" navigates back to Welcome/Sign Up [03].

---

## Purpose

The Guest Mode Preview lets hesitant users experience the full Balencia app with realistic demo data before committing to an account. It answers "what would this app actually look like for me?" — the most common pre-signup hesitation. The user provides only a name and 1-3 domain interests, then browses a pre-populated app including demo SIA conversations, demo goals, demo dashboards, and demo insights. A persistent sign-up prompt ensures they can convert at any moment. This screen has two distinct phases: the mini-onboarding entry form and the persistent demo overlay applied across all app screens.

The centerpiece is a mini SIA conversation (3 exchanges) that lets guests experience the "it gets me" moment before creating an account. This converts passive browsing into active investment — the user has shared something personal with SIA, creating a reason to sign up and continue.

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
- **Visual treatment**: Eyebrow label "life areas" (11pt Sora Semibold, uppercase, +0.12em tracking, white at 40%). Below: 9 domain chips arranged in a 3x3 grid with 8pt horizontal and 8pt vertical gaps. Each chip: pill shape (--r-pill), 36pt height, 12pt horizontal padding. Unselected: ink-brown-800 bg, 1pt white 10% border, domain color icon (16pt) + domain name (13pt Sora Semibold, white at 70%). Selected: domain color bg at 20% opacity, 1pt domain color border, icon + text at full white. Maximum 3 selections.
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

### Demo Data Indicator

All demo content must be visually distinguished from real user data. Two indicators work together:

**Per-card badge:**
- "demo" pill badge on every data card (action cards, goal cards, stat tiles)
- Position: top-right corner of card, 8pt inset from edges
- Style: 11pt Sora Semibold, white at 40%, ink-900 bg at 60%, --r-pill, 6pt horizontal / 2pt vertical padding
- Not interactive (no touch target needed)
- Removed automatically when user completes full onboarding and has real data

**Persistent context line:**
- Below the sign-up banner: "exploring with sample data" in 12pt Sora Regular, white at 30%, center-aligned
- Only visible when sign-up banner is visible (collapses with it)

### Mini SIA Conversation
- **Purpose**: Let guest users experience the core product before requiring account creation — the "try before you buy" moment. This follows the ChatGPT model: let users interact with the AI first, creating investment that drives sign-up conversion.
- **Data source**: Lightweight AI endpoint (no account required, limited context, 3 exchanges max)
- **Visual treatment**: Compact chat interface that replaces or overlays part of the blurred preview. Uses the same SIA Message Bubble and User Message Bubble patterns from Screen 07. Contained within a card (ink-brown-800, --r-lg, 16pt padding).
- **Conversation flow** (exactly 3 exchanges):
  1. **SIA opens**: "What's one area of your life you'd like to improve?" + suggestion chips: "fitness", "finances", "career", "relationships", "just exploring"
  2. **User responds** (via chip or typing): SIA processes and gives one personalized insight. Example: User picks "finances" → SIA: "Smart focus. Most people don't realize their spending patterns shift based on stress and sleep. I can help you see those connections."
  3. **SIA closes with CTA**: "Want me to build you a full plan? Create an account and we'll pick up right here." + "create account" CTA (Brand CTA Button, orange) + "maybe later" link below.
- **After 3 exchanges**: Chat input disables. "Create account to continue" message appears. The conversation data is preserved and restored after sign-up (SIA references it: "Earlier you mentioned wanting to improve your finances...").
- **Size**: ~300pt height (fits within the guest preview area)
- **Animation**: Messages appear with the standard SIA message animation (fade-in + translateY, 280ms). Suggestion chips stagger in (80ms apart).

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
| Eyebrow label | Sora | 600 (Semibold) | 11pt | 14pt | White at 40% | "LIFE AREAS" — uppercase, +0.12em tracking |
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

## Cross-References

- **Navigates to**: Screen [03] — Welcome/Sign Up via stack push (banner "sign up"), Screen [04] — Sign In via stack push ("sign in" link)
- **Navigates from**: Screen [03] — Welcome/Sign Up via stack push ("Try without an account")
- **Shared components with**: Screen [03] — Welcome/Sign Up (Text Input Field, Brand CTA Button, Auth Navigation Link, Back Button, Brand Symbol)
- **Patterns used**: Brand CTA Button (full-width), Text Input Field, Back Button, Auth Navigation Link, Bottom Tab Bar
- **Patterns established**: **Domain Interest Picker** — 9 domain chips in 3x3 grid, pill shape, domain color tinting on selection, max 3 selections. **Persistent Sign-Up Banner** — floating above tab bar, full-width with inline CTA pill, minimizable via swipe, expandable via tap. **Guest Mode Demo Data Treatment** — full app with pre-populated seed data, user name injected, medium-density default.
