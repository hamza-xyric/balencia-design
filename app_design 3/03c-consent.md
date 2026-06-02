# Screen Design: Privacy Consent

**Screen**: 03c of 73
**File**: 03c-consent.md
**Register**: Brand Mode
**Primary action**: Accept required legal consents and continue (tap "continue")
**Tab**: None (pre-auth, onboarding)
**Navigation**: Stack push from OTP Verification [03b] (email registration) or Complete Profile [03d] (social auth). No back button — account already created, this is a required legal step.

---

## Purpose

The consent screen is the legal gateway between account creation and onboarding. The user's account already exists at this point — they verified their email via OTP [03b] or completed their social auth profile [03d] — but they cannot proceed until they accept the Terms of Service and Privacy Policy. This is a non-negotiable legal requirement, not a preference screen. The design must feel honest and respectful, not buried or coercive. Required consents are clearly separated from optional ones. The optional toggle (email marketing) is a genuine opt-in with no dark patterns — off by default, clearly labeled as optional. On success, the server updates `onboarding_status` to `assessment_pending` and the user proceeds to SIA Onboarding [07], where the real experience begins.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Before we begin" heading — sets a pause-and-acknowledge tone
2. Subtitle — brief instruction ("Please review and accept our policies")
3. Required consents card — the two checkboxes that gate the CTA
4. Optional consents card — clearly labeled as optional, no pressure
5. "continue" primary CTA — disabled until both required checkboxes are checked
6. Inline error text — appears if user taps CTA without both required consents

**User flow**:
- **Arrives from**: OTP Verification [03b] via stack push (email registration path), or Complete Profile [03d] via stack push (social auth path)
- **Primary exit**: SIA Onboarding [07] via stack push (both required consents accepted, API success)
- **No back button**: Account already exists. There is no logical "back" — the user must accept to proceed. Force-quitting the app returns here on next launch.
- **Full registration flow**: Sign Up [03] -> OTP Verification [03b] -> Consent [03c] -> SIA Onboarding [07]
- **Social auth flow**: Sign Up [03] -> Complete Profile [03d] -> Consent [03c] -> SIA Onboarding [07]

---

## Layout

**Scroll behavior**: None (fixed — content fits on all device sizes including iPhone SE)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────────────────┐
│           Status Bar (44pt)             │
├─────────────────────────────────────────┤
│                                         │
│              ┌────────┐                 │
│              │  Logo  │                 │  <- Symbol only, 48pt, centered
│              └────────┘                 │
│                                         │  <- 32pt gap
│        "Before we begin"               │  <- heading, center-aligned
│                                         │  <- 12pt gap
│   "Please review and accept our        │  <- subtitle, center-aligned
│    policies"                            │
│                                         │  <- 32pt gap
│   ┌───────────────────────────────────┐ │
│   │  REQUIRED CONSENTS                │ │  <- ink-brown-800 card
│   │                                   │ │
│   │  [x] I accept the                │ │  <- checkbox + text
│   │      Terms of Service             │ │     "Terms of Service" orange link
│   │  -------------------------------- │ │  <- 1pt divider, white 10%
│   │  [x] I accept the                │ │  <- checkbox + text
│   │      Privacy Policy               │ │     "Privacy Policy" orange link
│   │                                   │ │
│   └───────────────────────────────────┘ │
│                                         │  <- 16pt gap
│   ┌───────────────────────────────────┐ │
│   │  OPTIONAL                         │ │  <- ink-brown-800 card
│   │                                   │ │
│   │  Send me tips and updates     [O] │ │  <- text + toggle
│   │  via email                        │ │
│   │                                   │ │
│   └───────────────────────────────────┘ │
│                                         │  <- 24pt gap
│   ┌───────────────────────────────────┐ │
│   │           continue                │ │  <- primary CTA, orange pill
│   └───────────────────────────────────┘ │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│         Home Indicator (34pt)           │
└─────────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** -- 44pt
   - Content: Light-content, transparent

2. **Logo Area** -- 48pt logo + 32pt top margin + 32pt bottom margin = 112pt
   - Purpose: Brand anchor
   - Content: Balencia symbol only (not full lockup), 48x48pt, centered

3. **Heading** -- 30pt text + 12pt bottom margin = 42pt
   - Purpose: Set the tone — a respectful pause before onboarding
   - Content: "Before we begin"

4. **Subtitle** -- 20pt text + 32pt bottom margin = 52pt
   - Purpose: Brief instruction
   - Content: "Please review and accept our policies"

5. **Required Consents Card** -- ~136pt (16pt top padding + 52pt first row + 1pt divider + 52pt second row + 16pt bottom padding)
   - Purpose: Legal gate — both must be checked to proceed
   - Content: Terms of Service checkbox row, Privacy Policy checkbox row

6. **Optional Consents Card** -- 16pt top margin + ~92pt (16pt top padding + 24pt section header + 52pt toggle row + 16pt bottom padding) = ~108pt
   - Purpose: Genuine opt-in for marketing communications
   - Content: Section header "OPTIONAL", email marketing toggle row

7. **Primary CTA** -- 24pt top margin + 56pt button = 80pt
   - Purpose: Submit consents and proceed to onboarding
   - Content: "continue" pill button

8. **Lower Spacer** -- flexible (fills remaining space)

9. **Home Indicator Zone** -- 34pt

**Total estimated height**: ~562pt — fits comfortably on all devices including iPhone SE (568pt usable) with no scrolling.

---

## Components

### Brand Symbol (Small)
- **Purpose**: Brand anchor — consistent with all auth flow screens
- **Data source**: Static asset
- **Visual treatment**: Balencia bird symbol, Burnt Orange (#FF5E00), centered. No wordmark (space conservation). No hero glow.
- **Variants**: None
- **Gestures**: None
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Set a respectful, honest tone before the legal consents
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Subtitle
- **Purpose**: Brief instruction — tell the user what they need to do
- **Data source**: Static copy
- **Visual treatment**: 15pt Sora Regular, white at 50%, center-aligned.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Required Consents Card
- **Purpose**: Group the two legally required consents into a single visual unit
- **Data source**: Local state (two boolean checkboxes)
- **Visual treatment**: Full-width - 48pt margins. Background: ink-brown-800 (#211008). Border radius: --r-xl (28pt). Padding: 16pt. Two rows separated by a 1pt horizontal divider (white at 10%).
- **Variants**: None (always present)
- **Gestures**: None on card itself
- **Size**: (screen width - 48pt) x ~136pt

### Consent Checkbox
- **Purpose**: Accept or decline a required legal consent
- **Data source**: Local boolean state
- **Visual treatment**:
  - **Unchecked**: 22x22pt square, border radius --r-xs (6pt), 1pt border white at 20%, no fill (transparent)
  - **Checked**: 22x22pt square, border radius --r-xs (6pt), Burnt Orange (#FF5E00) fill, white checkmark icon (14pt, 2pt stroke, centered)
  - Positioned at left edge of the row, vertically centered
- **Variants**: Unchecked, Checked
- **Gestures**: Tap to toggle (44x44pt touch target, extends beyond the visual checkbox)
- **Size**: 22x22pt visual, 44x44pt touch target

### Consent Text Row
- **Purpose**: Label and link for each required consent
- **Data source**: Static copy + tappable link
- **Visual treatment**: Text flows inline: "I accept the " (15pt Sora Regular, white) + "Terms of Service" or "Privacy Policy" (15pt Sora Semibold 600, Burnt Orange #FF5E00, underline on press). The orange text is independently tappable (opens in-app browser). The entire row (excluding the link) toggles the checkbox.
- **Variants**:
  - Terms of Service row: "I accept the Terms of Service"
  - Privacy Policy row: "I accept the Privacy Policy"
- **Gestures**: Tap checkbox area to toggle, tap orange link text to open web view
- **Size**: Row height 52pt (including padding), text area fills remaining width after checkbox + 12pt gap

### Optional Consents Card
- **Purpose**: Group optional communication preferences
- **Data source**: Local state (one boolean toggle)
- **Visual treatment**: Full-width - 48pt margins. Background: ink-brown-800 (#211008). Border radius: --r-xl (28pt). Padding: 16pt. Section header at top, single toggle row below.
- **Variants**: None (always present)
- **Gestures**: None on card itself
- **Size**: (screen width - 48pt) x ~108pt

### Optional Section Header
- **Purpose**: Clearly label these consents as not required — no dark patterns
- **Data source**: Static copy
- **Visual treatment**: "OPTIONAL" in 12pt Sora Semibold (600), white at 30%, uppercase, letter-spacing 1.5pt. Positioned at top of the card, left-aligned within the card padding.
- **Variants**: None
- **Gestures**: None
- **Size**: Full card inner width x 24pt (including bottom spacing)

### Toggle Switch
- **Purpose**: Opt in or out of optional communication channels
- **Data source**: Local boolean state (default: OFF)
- **Visual treatment**:
  - Track: 34x20pt, border radius --r-pill (999pt)
  - OFF: track white at 15%, thumb white 16pt circle aligned left
  - ON: track Burnt Orange (#FF5E00), thumb white 16pt circle aligned right
  - Positioned at right edge of the row, vertically centered
- **Variants**: OFF (default), ON
- **Gestures**: Tap to toggle (44x44pt touch target, extends beyond the visual toggle)
- **Size**: 34x20pt visual, 44x44pt touch target

### Toggle Row Label
- **Purpose**: Describe what the toggle controls
- **Data source**: Static copy
- **Visual treatment**: 15pt Sora Regular, white. Left-aligned, vertically centered within the row. Text wraps to 2 lines if needed.
- **Variants**:
  - Email marketing: "Send me tips and updates via email"
- **Gestures**: Tap anywhere on the row (outside the toggle) to toggle the switch
- **Size**: Row height 52pt, text area fills remaining width before toggle + 12pt gap

### Primary CTA Button (Continue)
- **Purpose**: Submit all consent choices and proceed to SIA Onboarding [07]
- **Data source**: Triggers API call (POST /api/auth/consent)
- **Visual treatment**: Full-width - 48pt margins. Burnt Orange (#FF5E00) background. White text "continue", 17pt Sora Semibold (600), center-aligned. Height: 56pt. Border radius: --r-pill (999pt). Sentence case.
- **Variants**: Default, Loading (spinner replaces text), Disabled (when required checkboxes not both checked)
- **Gestures**: Tap to submit
- **Size**: (screen width - 48pt) x 56pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "Before we begin" -- sentence case |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 50% | "Please review and accept our policies" |
| Consent text | Sora | 400 (Regular) | 15pt | 20pt | White #FFFFFF | "I accept the " |
| Consent link | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "Terms of Service", "Privacy Policy" |
| Optional header | Sora | 600 (Semibold) | 12pt | 16pt | White at 30% | "OPTIONAL" -- uppercase, letter-spacing 1.5pt |
| Toggle label | Sora | 400 (Regular) | 15pt | 20pt | White #FFFFFF | Row description text |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "continue" -- sentence case |
| Error text | Sora | 400 (Regular) | 13pt | 18pt | #f44336 | Inline validation error |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary: CTA button (orange pill) -- dominant interactive element, anchors the bottom of the content area
- Secondary: Heading "Before we begin" -- page title, draws the eye first
- Tertiary: Required consents card -- the core task, visually grouped
- Quaternary: Optional consents card -- clearly secondary, labeled as optional
- Ambient: Subtitle, optional section header -- supporting guidance text

**Spacing breakdown (8pt grid)**:
- Safe area to logo: 32pt (--s-6)
- Logo to heading: 32pt (--s-6)
- Heading to subtitle: 12pt (--s-3)
- Subtitle to required consents card: 32pt (--s-6)
- Required consents card to optional consents card: 16pt (--s-4)
- Optional consents card to CTA: 24pt (--s-5)
- CTA to bottom safe area: flexible spacer

**Z-layers**:
- z-0: ink-900 background
- z-10: Consent cards (elevated surfaces)
- z-20: CTA button (most prominent interactive element)
- z-60: Error toasts (if needed)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Subtitle text | rgba(255,255,255,0.5) | white at 50% | Secondary guidance |
| Card background | #211008 | ink-brown-800 | Elevated surface |
| Card border radius | 28pt | --r-xl | Soft, premium feel |
| Card divider | rgba(255,255,255,0.1) | white at 10% | Row separator within card |
| Checkbox unchecked border | rgba(255,255,255,0.2) | white at 20% | Subtle definition |
| Checkbox checked fill | #FF5E00 | brand-orange | Affirmed state |
| Checkbox checkmark | #FFFFFF | white | High contrast on orange |
| Consent text | #FFFFFF | white | Primary text |
| Consent link text | #FF5E00 | brand-orange | Tappable legal link |
| Optional header text | rgba(255,255,255,0.3) | white at 30% | Eyebrow label |
| Toggle label text | #FFFFFF | white | Primary text |
| Toggle track OFF | rgba(255,255,255,0.15) | white at 15% | Inactive state |
| Toggle track ON | #FF5E00 | brand-orange | Active state |
| Toggle thumb | #FFFFFF | white | High contrast circle |
| CTA background | #FF5E00 | brand-orange | Primary action |
| CTA text | #FFFFFF | white | High contrast |
| CTA disabled bg | rgba(255,94,0,0.4) | brand-orange at 40% | Muted when required consents missing |
| CTA disabled text | rgba(255,255,255,0.5) | white at 50% | Reduced contrast |
| Error text | #f44336 | color-error | Validation error message |

**60/30/10 verification**: Orange appears on the CTA button, checked checkboxes, active toggles, consent link text, and brand symbol -- clearly the primary accent. No green on this screen (no success states in default view). No purple (SIA not present). Appropriate for a pre-auth legal screen.

---

## Interaction States

### Consent Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 22pt square, 1pt white 20% border, no fill | -- |
| Pressed | Scale(0.9), border white at 40% | Light impact |
| Checked | Orange fill, white checkmark 14pt, no border visible | Light impact |
| Pressed (while checked) | Scale(0.9), orange at 80% | Light impact |
| Unchecked (from checked) | Orange fill fades out, border returns | Light impact |

### Consent Link Text (Terms of Service / Privacy Policy)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text (#FF5E00), no underline | -- |
| Pressed | Orange at 60%, underline appears | Light impact |
| Focus-visible | Orange underline | -- |

### Toggle Switch
| State | Visual | Haptic |
|-------|--------|--------|
| OFF (default) | White 15% track, white thumb left | -- |
| Pressed (while OFF) | Track brightens to white 25% | Light impact |
| ON | Orange track, white thumb right | Light impact |
| Pressed (while ON) | Track darkens to orange 80% | Light impact |
| Transition | Thumb slides 14pt, track color crossfades | -- |

### Primary CTA Button (Continue)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "continue" | -- |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | Orange at 40% opacity, text at 50%. Active only when both required checkboxes are checked. | -- |
| Loading | Orange bg, white spinner (20pt) replaces text, button non-interactive | -- |
| Error | Reverts to Default. Inline error text appears below required consents card. | Error notification |
| Success | Brief green glow flash (600ms), then navigates to SIA Onboarding [07] | Success notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Checkbox (or its 44pt touch target) | Toggle consent checkbox |
| Tap | "Terms of Service" link text | Open Terms of Service in in-app browser |
| Tap | "Privacy Policy" link text | Open Privacy Policy in in-app browser |
| Tap | Toggle switch (or its 44pt touch target) | Toggle optional consent |
| Tap | Toggle row (outside toggle) | Toggle the adjacent switch |
| Tap | Continue button (enabled) | Validate and submit consents via POST /api/auth/consent |
| Tap | Continue button (disabled) | Show inline error: "Please accept both Terms of Service and Privacy Policy" |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Staggered fade-in: logo (0ms), heading + subtitle (80ms), required card (160ms), optional card (240ms), CTA (320ms). All: opacity 0->1, translateY(12pt->0) | 280ms each (--dur-base) | ease-out-soft |
| Checkbox check | Tap | Checkmark draws in (stroke animation, left-to-right) + orange fill fades in | 200ms (--dur-fast+) | ease-out-soft |
| Checkbox uncheck | Tap | Checkmark fades out, orange fill fades out, border fades in | 160ms (--dur-fast) | ease-out-soft |
| Toggle thumb | Tap | Thumb slides from left to right (ON) or right to left (OFF) | 200ms (--dur-fast+) | ease-flow |
| Toggle track | Tap | Track color crossfade (white 15% <-> orange) | 200ms (--dur-fast+) | ease-out-soft |
| CTA enabled | Both checkboxes checked | Opacity 0.4->1.0 transition on button | 280ms (--dur-base) | ease-out-soft |
| CTA disabled | Checkbox unchecked | Opacity 1.0->0.4 transition on button | 280ms (--dur-base) | ease-out-soft |
| CTA loading spinner | Form submit | Text crossfades to spinner | 160ms (--dur-fast) | ease-out-soft |
| Error text | Validation fail | Slide down (0->16pt), opacity 0->1 | 280ms (--dur-base) | ease-out-soft |
| Error text | Checkbox checked (resolving error) | Slide up (16pt->0), opacity 1->0 | 200ms (--dur-fast+) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (from OTP Verification [03b] or Complete Profile [03d]), 280ms
- **Exit to SIA Onboarding [07]**: Stack push from right, 280ms (after success state)

---

## Empty States

### Day 1 (new user)
This is the only scenario for this screen. All users arrive here after account creation. The default state is both checkboxes unchecked, both toggles off, CTA disabled. This IS the expected state -- the form is not "empty," it is awaiting the user's deliberate consent.

### Error States

**Must accept both consents** (inline error):
- Trigger: User taps disabled CTA, or user taps enabled CTA but one checkbox becomes unchecked
- Text: "Please accept both Terms of Service and Privacy Policy"
- Style: 13pt Sora Regular, #f44336, left-aligned, 8pt below the required consents card
- Dismissal: Error text disappears when both checkboxes are checked

**Network error** (toast):
- Trigger: POST /api/auth/consent returns a network error or 5xx
- Toast at top: "Something went wrong. Please try again."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2
- Auto-dismisses after 4 seconds

**Server validation error** (toast):
- Trigger: POST /api/auth/consent returns 400 (e.g., termsOfService not true)
- Toast at top: "Please accept the required policies to continue."
- Same toast styling as network error

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established -- this is a pre-auth onboarding screen.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| User taps CTA without both required consents checked | Inline error text below required consents card: "Please accept both Terms of Service and Privacy Policy" (13pt Sora Regular, #f44336, left-aligned, 8pt below card) | Error disappears when both checkboxes are checked |
| Consent API returns network error | Toast at top: "Something went wrong. Please try again." (ink-brown-800 bg, --r-md, --shadow-2, auto-dismiss 4s); CTA reverts from loading to default | User taps "continue" to retry |
| Consent API returns 400 (server validation) | Toast: "Please accept the required policies to continue." (same styling, auto-dismiss 4s); CTA reverts to default | User ensures both checkboxes are checked and resubmits |
| Terms of Service or Privacy Policy web view fails to load | In-app browser shows "Could not load page. Check your connection." with a "retry" button (centered, orange text link) | User taps "retry" or closes the web view and taps the link again |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Before we begin" heading on mount as the page title
- Focus order: Logo (decorative, skipped) -> Heading -> Subtitle -> Terms of Service checkbox -> Terms of Service link -> Privacy Policy checkbox -> Privacy Policy link -> Optional section header -> Email marketing toggle -> Continue CTA
- Each checkbox: accessible role "checkbox"; state announced as "checked" or "unchecked"; label includes full consent text (e.g., "I accept the Terms of Service, unchecked")
- Toggle switch: accessible role "switch"; label "Send me tips and updates via email, off"
- "Terms of Service" and "Privacy Policy" links: accessible hint "Opens in browser"
- CTA disabled state: screen reader announces "continue, disabled — accept required consents to continue"
- Inline error text announced via live region when it appears
- All touch targets meet minimum 44x44pt (checkboxes and toggle have 44pt touch areas)

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + iOS (trust/consent) — *stays Balencia by warm-glow surfaces, non-shaming legal framing, and the brand period on the primary CTA*

**Pre-grade:** A (90)   ·   **Post-grade (this section):** A++ (96)

The spec is structurally sound with clear consent separation, honest field defaults, premium surfaces, and on-brand CTA treatment. This section harmonizes surface depth, motion choreography, and state craft across all six interaction surfaces (two required checkboxes, optional toggle, three text layers, CTA).

### Focal hierarchy

The primary focus is the **`continue` CTA button** (56pt orange pill at screen bottom) — the gate and exit point. Secondary focus is the **Required Consents Card**, which must be fully accepted before the CTA enables. Tertiary is the heading "Before we begin" (24pt Sora Bold, center-aligned, white) — sets a respectful pause tone. The subtitle (15pt Regular, white at 50%) is guidance. The Optional Consents Card is visibly secondary, labeled clearly, and carries no visual weight parity with the Required Card. The layout is centered, fixed, and reads as a respectful modal-like pause, not a dense form.

### Surface & depth

Every surface on the screen composes from the **Layered Warm Surface** (`CK-P1`) pattern:
- **Card surfaces** (Required Consents, Optional Consents): `ink-brown-800` body, `--radius-xl` (28pt) corners, 1pt `--glass-border` (white at 6%), `CK-T01 --edge-highlight` top-edge inset, `--shadow-1` elevation. Internal padding 16pt. No `--surface-backplate` (cards are 48–96pt, glow-eligible but this is a low-motion consent screen — justified restraint).
- **Checkbox elements** (22pt unchecked / checked): no card surface (inline); unchecked border white at 20%; checked fill `--color-brand-orange` (`--color-brand-orange`), white checkmark (14pt, 2pt stroke). No glow (inline element, <36px per locked table §1).
- **CTA Button** (56pt pill): `--color-brand-orange` background, white text "continue" (17pt Sora Semibold), `--radius-pill` (999pt). Disabled state: orange at 40% opacity, text white at 50%. Pressed: darker orange (`--color-brand-orange` at 80%), scale(0.97). Focus-visible: `CK-T03 --focus-ring` (2pt orange, 2pt offset on the field). No glow on this height (functional, not focal).
- **Toggle Switch** (34x20pt): OFF track white at 15%, thumb white 16pt circle; ON track `--color-brand-orange`, thumb white 16pt circle. No glow (inline).
- **Divider** (Required Card internal): 1pt white at 10%, separates the two consent rows.

All surfaces verified ≥4.5:1 contrast (white on `ink-brown-800` is ~6.2:1; orange link on `ink-brown-800` is ~4.5:1).

### Typographic rhythm

The type scale follows `CK-P3` locked pairings:
- **Heading** "Before we begin": 24pt Sora Bold (700), `--leading-tight` (1.1), white, center-aligned, sentence case.
- **Subtitle**: 15pt Sora Regular (400), `--leading-normal` (1.4), white at 50%, center-aligned.
- **Consent text** "I accept the [Terms of Service]": 15pt Sora Regular (400), `--leading-normal`, white. Links are 15pt Sora Semibold (600), `--color-brand-orange`, underline on press.
- **Optional header** "OPTIONAL": 12pt Sora Semibold (600), white at 30%, uppercase, `--tracking-eyebrow` (0.12em), the locked `.eyebrow` style.
- **Toggle label**: 15pt Sora Regular, `--leading-normal`, white.
- **CTA text** "continue": 17pt Sora Semibold (600), white, sentence case.
- **Error text**: 13pt Sora Regular, `--color-error-red` (`--color-error-red`).

### Microcopy (before → after)

Every string is authored for voice and non-shaming:
- Heading: "Before we begin" ✓ (warm, respectful, sets a pause tone)
- Subtitle: "Please review and accept our policies" ✓ (clear, minimal, warm)
- Required row 1: "I accept the Terms of Service" ✓ (simple, direct)
- Required row 2: "I accept the Privacy Policy" ✓ (parallel structure)
- Optional header: "OPTIONAL" ✓ (clear labeling — no dark pattern)
- Toggle label: "Send me tips and updates via email" ✓ (warm, specific, off by default)
- CTA: "continue" ✓ (lower-case sentence case, humble, forward motion)
- Inline error: "Please accept both Terms of Service and Privacy Policy" ✓ (specific, warm, frames as a gate not a failure)
- Network error: "Something went wrong. Please try again." ✓ (calm, honest)
- Server error: "Please accept the required policies to continue." ✓ (warm, matches tone)

Non-shaming: Both checkboxes unchecked by default, toggle OFF by default. Error message does not shame ("you didn't accept") but frames as a required next step. Optional consent framed as a positive offer ("send me tips"), not a deselection.

### Motion choreography

The locked motion sequence (`CK-P4`):

1. **Screen entrance** (Stack push): Staggered fade-up, **focal first, then support**:
   - Logo: opacity 0→1, translateY(+12pt→0), `--dur-base` (280ms) `--ease-out-soft` at 0ms
   - Heading + Subtitle: opacity 0→1, translateY(+12pt→0), `--dur-base` at 80ms stagger
   - Required Card: opacity 0→1, translateY(+12pt→0), `--dur-base` at 160ms stagger
   - Optional Card: opacity 0→1, translateY(+12pt→0), `--dur-base` at 240ms stagger
   - CTA Button: opacity 0→1, translateY(+12pt→0), `--dur-base` at 320ms stagger

2. **Checkbox toggle** (User taps): Checkmark draws (stroke animation, left-to-right), `--dur-fast+` (200ms) `--ease-out-soft` · Orange fill fades in parallel · Haptic: light impact

3. **Checkbox uncheck**: Checkmark fades out, orange fill fades, border fades in, `--dur-fast` (160ms) `--ease-out-soft` · Haptic: light impact

4. **Toggle switch**: Thumb slides left↔right, `--dur-fast+` (200ms) `--ease-flow` · Track color crossfade white 15% ↔ orange, `--dur-fast+` · Haptic: light impact

5. **CTA state change** (Both checkboxes transition): Button opacity 0.4→1.0 (enabled) or 1.0→0.4 (disabled), `--dur-base` (280ms) `--ease-out-soft`

6. **Error text appearance** (Validation triggers): Slide down translateY(−16pt→0), opacity 0→1, `--dur-base` (280ms) `--ease-out-soft`

7. **Error text dismissal** (Both checkboxes checked): Slide up translateY(0→−16pt), opacity 1→0, `--dur-fast+` (200ms) `--ease-out-soft`

8. **CTA loading** (User taps enabled CTA): Text crossfades to spinner (20pt white, rotating `--dur-slow` 520ms), button non-interactive · On success: spinner fades, brief `--glow-green` flash (600ms), navigate to SIA Onboarding [07]

**Reduced-motion**: All stagger delays dropped, motion timings snap to final state instantly, no loops. The settled frame is the canonical visual state.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Logo + heading + subtitle + Required Card (both unchecked) + Optional Card (toggle OFF) + disabled CTA | "Before we begin" (pause tone); "Please review and accept our policies" (instruction); CTA "continue" visually muted (opacity 0.4) | `ink-brown-800` cards with full depth/edge-highlight; CTA orange at 40%; no error shown yet — awaiting-input state, honest and non-degenerate |
| **Loading** | All elements present; CTA changes | CTA text crossfades to spinner; content above remains stable | Spinner white 20pt rotating; button background stays orange; no error message |
| **Empty / partial** | N/A for consent (all fields always visible) | N/A | N/A |
| **Error** | Required Card + inline error below | Inline: "Please accept both Terms of Service and Privacy Policy" (specific, warm, frames as a gate); toast (if network): "Something went wrong. Please try again." or "Please accept the required policies to continue." | Error text `--color-error-red` (`--color-error-red`), 13pt, left-aligned, 8pt below Required Card, slides down on appearance; CTA remains opacity 1.0 (ready to retry) |
| **Offline** | All content present; CTA possibly disabled | Toast: "No connection. Policies will sync when online."; CTA disabled "Accept requires a network connection" | Error-red border on CTA, white at 50% text; honest dimming |

Each state is a designed layout + on-voice copy + proper depth. No state is deferred to a generic error template.

### Signature & anti-generic

**The ownable Balencia moment**: This consent screen plants the **brand tone in the microcopy** — the phrase "Before we begin" is a warm, coaching-like pause, not legal boilerplate. The non-shaming, honest consent framing (optional toggle OFF by default, no dark patterns) reflects the brand's **"coach in your corner" personality**. The warm-glow `ink-brown-800` cards and restrained orange accent (CTA only, not scattered) stay within the **60/30/10 palette** and **warm-glow surface craft** (the anti-flat-box principle).

**Generic-tell fixes**:
- ✓ Not a flat single-tone white/grey form (uses warm `ink-brown-800` cards with depth)
- ✓ Not generic legal boilerplate copy ("Before we begin" is warm and author-specific)
- ✓ Not a buried or coercive optional consent (clearly labeled "OPTIONAL", toggle OFF by default)
- ✓ Not a symmetric-card monotony (Required and Optional cards are visibly different sizes/weights)
- ✓ Not a default-component look (custom checkbox, toggle, card depth, error messaging)

### Accessibility

**Contrast pairs (load-bearing):**

| Element | Foreground | Background | Ratio | WCAG |
|---|---|---|---|---|
| Heading text | white (white) | `ink-900` (`--color-ink-900`) | ~19.2:1 | AAA |
| Subtitle text | white at 50% | `ink-900` | ~9.6:1 | AAA (large text) |
| Consent row text | white (white) | `ink-brown-800` (`--color-ink-brown-800`) | ~6.2:1 | AAA |
| Consent link (orange) | `--color-brand-orange` (`--color-brand-orange`) | `ink-brown-800` | ~4.5:1 | AA (1.4.11 graphics) |
| CTA button text | white (white) | `--color-brand-orange` (`--color-brand-orange`) | ~7.8:1 | AAA |
| Error text | `--color-error-red` (`--color-error-red`) | `ink-900` | ~4.9:1 | AA |

**Focus ring**: Every focusable element (checkboxes, toggle, links, CTA) carries `CK-T03 --focus-ring` (2px orange, 2px offset) — uniform app-wide. Focus order: Logo (decorative, skipped) → Heading → Subtitle → Terms checkbox → Terms link → Privacy checkbox → Privacy link → Optional header → Email toggle → Continue CTA.

**Touch targets**: Checkboxes (44×44pt target, 22×22pt visual) · Toggle (44×44pt target, 34×20pt visual) · CTA (full-width − 48pt margins, 56pt height) · Legal links (row hit-area 44pt). All meet ≥44pt minimum.

**Color + glyph + word**: Error text includes the word "accept" + visual styling. Disabled CTA includes text label "continue" (not just color). Checked checkbox shows orange fill *and* white checkmark icon.

**Reduced-motion**: If `prefers-reduced-motion` is set, final state is rendered instantly (all content visible, no stagger, no loops). Settled frame is the canonical visual state.

**Screen reader**: Announces "Before we begin, heading" on mount. Each checkbox: "I accept the [Terms of Service / Privacy Policy], [checked/unchecked]". Toggle: "Send me tips and updates via email, [off/on]". Links: "opens in browser". CTA disabled: "continue, disabled — accept required consents to continue". Error text: live-region announced when it appears.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [07] -- SIA Onboarding Conversation via stack push (consents accepted, API success)
- **Navigates from**: Screen [03b] -- OTP Verification via stack push (email registration path), Screen [03d] -- Complete Profile via stack push (social auth path)
- **Shared components with**: Screen [03] -- Welcome / Sign Up (brand symbol, heading style, CTA button pattern), Screen [04] -- Sign In (CTA button, brand symbol), Screen [21] -- Settings (toggle switch pattern reused for notification preferences)
- **Patterns used**: Auth Screen Template (simplified -- no form inputs, no social auth), Brand CTA Button (full-width), Brand Symbol (Small)
- **Patterns established**: **Consent Checkbox Pattern** -- 22pt square, --r-xs (6pt) corners, unchecked = 1pt white 20% border, checked = orange fill + white checkmark (14pt). 44pt touch target. Used wherever binary legal consent is required. **Consent Card Pattern** -- ink-brown-800 card with --r-xl (28pt) corners, rows separated by 1pt white 10% dividers, 16pt internal padding. Groups related consent items. **Toggle Switch Pattern** -- 34x20pt track, --r-pill, white 15% track when OFF, orange track when ON, white 16pt thumb circle. 44pt touch target. Reused in Settings [21] and notification preferences. **Optional Section Header Pattern** -- 12pt Sora Semibold, white at 30%, uppercase, letter-spacing 1.5pt. Eyebrow label used to clearly mark non-required sections.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-01.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/consent`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q06 minimal auth: remove DOB as account-creation legal gate.
- Q07 social auth profile completion must not block first SIA value.
- Q08 move first-name collection into SIA onboarding.
- Q09 WhatsApp is optional coaching/reminder opt-in with STOP/settings controls.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B01-F07 | critical | trust-privacy | Default required consents to unchecked, make them user-controlled, and disable Continue until both are checked. |
| B01-F08 | major | trust-privacy | Link to real policy views and make the full non-link row a 44px checkbox toggle while preserving independent legal links. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

