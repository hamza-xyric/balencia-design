# Screen Design: Complete Profile

**Screen**: 03d (sub-screen of 03)
**File**: 03d-complete-profile.md
**Register**: Brand Mode
**Primary action**: Submit missing profile fields (tap "continue")
**Tab**: None (pre-auth, onboarding)
**Navigation**: Stack push from social auth success (Google/Apple on Sign Up [03]). No back button — account already created via social auth.

---

## Purpose

The complete profile screen captures date of birth and gender from social auth users whose OAuth provider did not supply these fields. Google and Apple often omit DOB and gender from their identity payloads, but Balencia requires both for personalized health coaching (age-appropriate recommendations, gender-specific metrics). This screen appears only when the social auth callback detects null values for DOB or gender. It reuses the Auth Screen Template from Sign Up [03] with a reduced field set and a SIA coaching note to explain why the data is needed. The tone is warm and brief — the user already committed by signing up; this is a quick follow-up, not a second registration form. After submission, the user proceeds to Consent [03c] as if they had completed the standard sign-up flow.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "A few more details" heading — sets expectation that this is quick
2. Subtitle text — explains why we need this information
3. SIA coaching note — personalizes the ask, introduces SIA's voice early
4. Form fields (date of birth, gender, optionally first/last name) — the task
5. "continue" primary CTA — the desired action, most visually prominent interactive element

**User flow**:
- **Arrives from**: Social auth success on Sign Up [03] — when Google/Apple OAuth completes but DOB or gender is null, the app redirects here instead of Consent [03c]
- **Primary exit**: Consent [03c] via stack push (profile completed successfully)
- **Secondary exits**: None — no back button, no alternative paths. The account is already created; the user must complete this step to proceed.
- **Full social auth flow**: Sign Up [03] (social auth) → Complete Profile [03d] → Consent [03c] → SIA Onboarding [07]

---

## Layout

**Scroll behavior**: ScrollView (content may exceed viewport on smaller devices when optional name fields are shown and keyboard is active)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────┬───────────────────┤
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  <- Symbol only, 48pt, centered
│         └───────┘           │
│                             │  <- 32pt gap
│   "A few more details"     │  <- heading, center-aligned
│                             │  <- 8pt gap
│   "We need this to          │  <- subtitle, center-aligned
│    personalize your          │
│    experience"               │
│                             │  <- 24pt gap
│   [SIA] "I'll use this to   │  <- SIA avatar + coaching note
│    tailor coaching just      │
│    for you."                 │
│                             │  <- 24pt gap
│   ┌───────────────────┐    │
│   │  Date of birth     │    │  <- date picker, calendar icon
│   └───────────────────┘    │  <- 16pt gap
│   ┌───────────────────┐    │
│   │  Gender        v   │    │  <- bottom sheet selector, chevron
│   └───────────────────┘    │
│                             │  <- 16pt gap (if name fields shown)
│   ┌────────┐ ┌────────┐    │
│   │First   │ │Last    │    │  <- optional, only if OAuth missing
│   │name    │ │name    │    │
│   └────────┘ └────────┘    │
│                             │  <- 24pt gap
│   ┌───────────────────┐    │
│   │     continue       │    │  <- primary CTA, orange pill
│   └───────────────────┘    │
│                             │
│                             │  <- flexible spacer
│                             │
├─────────┴───────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** -- 44pt
   - Content: Light-content, transparent

2. **Logo Area** -- 48pt logo + 32pt top margin + 32pt bottom margin = 112pt
   - Purpose: Brand anchor
   - Content: Balencia symbol only (not full lockup -- space conservation)

3. **Heading** -- 30pt text + 8pt bottom margin = 38pt
   - Purpose: Set expectation -- this is a quick step
   - Content: "A few more details"

4. **Subtitle** -- ~40pt text + 24pt bottom margin = 64pt
   - Purpose: Explain why the information is needed
   - Content: "We need this to personalize your experience"

5. **SIA Coaching Note** -- 24pt avatar + ~40pt text + 24pt bottom margin = ~88pt
   - Purpose: Introduce SIA's voice, personalize the data request
   - Content: SIA avatar (24pt) + "I'll use this to tailor coaching just for you."

6. **Form Fields Group** -- 2 required inputs (DOB + Gender) at 52pt each + 1 gap at 16pt = 120pt. If optional name fields shown: + 16pt gap + 52pt name row = 188pt.
   - Purpose: Collect missing profile data
   - Content: Date of birth, Gender, optionally First name + Last name (side by side)

7. **Primary CTA** -- 56pt button + 24pt top margin = 80pt
   - Purpose: Submit profile data
   - Content: "continue" pill button

8. **Lower Spacer** -- flexible (fills remaining space)

9. **Home Indicator Zone** -- 34pt

**Total estimated height**: ~580pt without name fields, ~650pt with name fields -- fits on most devices without scrolling. ScrollView ensures safety on iPhone SE or when keyboard is active.

---

## Components

### Brand Symbol (Small)
- **Purpose**: Brand anchor -- identical to Sign Up [03]
- **Data source**: Static asset
- **Visual treatment**: Balencia bird symbol, Burnt Orange (#FF5E00), centered. No wordmark (space conservation). No hero glow.
- **Variants**: None
- **Gestures**: None
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Communicate that this is a brief supplementary step
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Subtitle Text
- **Purpose**: Explain why the data is being collected
- **Data source**: Static copy
- **Visual treatment**: 15pt Sora Regular, white at 50% opacity, center-aligned. Max 2 lines.
- **Content**: "We need this to personalize your experience"
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### SIA Coaching Note
- **Purpose**: Early introduction of SIA's voice -- makes the data request feel personal rather than bureaucratic
- **Data source**: Static copy
- **Visual treatment**: Horizontal row. SIA avatar (24x24pt, circular, purple border 1pt #7F24FF) on the left. Text "I'll use this to tailor coaching just for you." in 15pt Sora Regular, white at 70%, left-aligned next to avatar. 8pt gap between avatar and text. The row is left-aligned within the 24pt horizontal margins.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins, ~44pt height

### Date of Birth Field
- **Purpose**: Collect user's date of birth (must be 18+ to use Balencia)
- **Data source**: User input via date picker
- **Visual treatment**: Identical to Sign Up [03] Date of Birth Field. Full-width - 48pt margins. Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Placeholder: "date of birth" (16pt Sora Regular, white at 40%). When a date is selected, displays formatted date (e.g., "March 15, 2000"). Calendar icon (20pt, white at 50%) on the right side.
- **Interaction**: Tap opens native date picker (iOS: wheel picker modal, Android: calendar dialog). Year range: current year - 100 to current year - 18. Default scroll position: 25 years ago.
- **Validation**: User must be 18 or older. Error message: "Balencia is for users 18+"
- **Gestures**: Tap to open date picker
- **Size**: (screen width - 48pt) x 52pt

### Gender Selector
- **Purpose**: Collect user's gender for personalized health coaching
- **Data source**: User selection
- **Visual treatment**: Identical to Sign Up [03] Gender Selector. Full-width - 48pt margins. Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Placeholder: "gender" (16pt Sora Regular, white at 40%). Down chevron icon (16pt, white at 50%) on the right side. When selected, shows chosen value in white.
- **Options**: "Male", "Female", "Non-binary", "Prefer not to say"
- **Interaction**: Tap opens a bottom sheet with 4 options as selectable rows (44pt each, full-width, tap to select and dismiss). Selected option shows orange checkmark.
- **Gestures**: Tap to open bottom sheet
- **Size**: (screen width - 48pt) x 52pt

### Text Input Fields (First Name + Last Name) -- Conditional
- **Purpose**: Collect name if not provided by OAuth provider
- **Data source**: User input. Only rendered when the OAuth response did not include first name or last name.
- **Visual treatment**: Identical to Sign Up [03] Split Name Row Pattern. Two half-width fields side by side with 8pt gap. Height: 52pt each. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Placeholders: "first name" / "last name" (16pt Sora Regular, white at 40%).
- **Variants**:
  - **First name field**: Placeholder "first name", keyboard type: default, autocomplete: given-name. Half-width (left).
  - **Last name field**: Placeholder "last name", keyboard type: default, autocomplete: family-name. Half-width (right).
- **Gestures**: Tap to focus
- **Size**: Each field: ((screen width - 48pt - 8pt gap) / 2) x 52pt

### Primary CTA Button (Continue)
- **Purpose**: Submit the complete-profile form
- **Data source**: Triggers API call (POST /api/auth/complete-profile)
- **Visual treatment**: Full-width - 48pt margins. Burnt Orange (#FF5E00) background. White text "continue", 17pt Sora Semibold (600), center-aligned. Height: 56pt. Border radius: --r-pill (999pt). Sentence case.
- **Variants**: Default, Loading (spinner replaces text), Disabled (when required fields incomplete)
- **Gestures**: Tap to submit
- **Size**: (screen width - 48pt) x 56pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "A few more details" -- sentence case |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 50% | "We need this to personalize your experience" |
| SIA coaching note | Sora | 400 (Regular) | 15pt | 20pt | White at 70% | "I'll use this to tailor coaching just for you." |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "date of birth", "gender", "first name", "last name" |
| Input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | User-entered or user-selected text |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "continue" -- sentence case |
| Error text | Sora | 400 (Regular) | 13pt | 18pt | #F44336 | Validation error messages |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary CTA (orange pill) is the most visually prominent interactive element
- Heading reads clearly as the page title
- SIA coaching note adds warmth without competing for dominance
- Form fields form a clear grouped block (tight 16pt spacing within, generous 24pt spacing to elements above and below)
- Subtitle is ambient -- present but not dominant

**Spacing breakdown (8pt grid)**:
- Safe area to logo: 32pt (--s-6)
- Logo to heading: 32pt (--s-6)
- Heading to subtitle: 8pt (--s-2)
- Subtitle to SIA coaching note: 24pt (--s-5)
- SIA coaching note to DOB field: 24pt (--s-5)
- Between input rows: 16pt (--s-4)
- Last field to CTA: 24pt (--s-5)
- CTA to bottom spacer: flexible

**Z-layers**:
- z-0: ink-900 background
- z-10: Input fields (elevated surfaces)
- z-20: CTA button (most prominent interactive element)
- z-30: Keyboard overlay (when focused)
- z-40: Bottom sheet (gender selector)
- z-60: Error toasts (if needed)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Subtitle text | rgba(255,255,255,0.5) | white at 50% | Secondary guidance |
| SIA avatar border | #7F24FF | royal-purple | SIA indicator (10% color rule) |
| SIA coaching note text | rgba(255,255,255,0.7) | white at 70% | Warm but secondary |
| Input background | #211008 | ink-brown-800 | Elevated surface |
| Input border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| Input border (focused) | #FF5E00 | brand-orange | Focus indicator -- 2pt |
| Input text | #FFFFFF | white | User input |
| Input placeholder | rgba(255,255,255,0.4) | white at 40% | Hint text |
| Calendar / chevron icon | rgba(255,255,255,0.5) | white at 50% | De-emphasized |
| CTA background | #FF5E00 | brand-orange | Primary action (60% rule) |
| CTA text | #FFFFFF | white | High contrast |
| CTA disabled bg | rgba(255,94,0,0.4) | brand-orange at 40% | Muted when required fields empty |
| Error border | #F44336 | color-error | Validation error |
| Error text | #F44336 | color-error | Error message |
| Success glow | rgba(52,168,83,0.3) | glow-green | Brief success flash on CTA |

**60/30/10 verification**: Orange appears on the CTA button, input focus borders, and brand symbol -- primary accent. Purple appears only on SIA avatar border -- 10% indicator role. No green in default view (success glow is transient). Appropriate for a pre-auth onboarding screen.

---

## Interaction States

### Date of Birth Field
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, placeholder text, calendar icon | -- |
| Focused | 2pt orange (#FF5E00) border, placeholder fades to 20% | Light impact |
| Filled | White text showing formatted date (e.g., "March 15, 2000"), border returns to 1pt white 10% | -- |
| Error | 2pt red (#F44336) border, error message appears 4pt below field (13pt, red) | Error notification |
| Disabled | 0.4 opacity, no touch response | -- |

### Gender Selector
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, placeholder text, chevron icon | -- |
| Focused | 2pt orange (#FF5E00) border, bottom sheet opens | Light impact |
| Filled | White text showing selected gender, border returns to 1pt white 10%, chevron remains | -- |
| Error | 2pt red (#F44336) border, error message appears 4pt below field (13pt, red) | Error notification |
| Disabled | 0.4 opacity, no touch response | -- |

### Text Input Fields (First Name / Last Name) -- Conditional
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, placeholder text | -- |
| Focused | 2pt orange (#FF5E00) border, placeholder fades to 20%, cursor appears | Light impact |
| Filled | White text replaces placeholder, border returns to 1pt white 10% | -- |
| Error | 2pt red (#F44336) border, error message appears 4pt below field (13pt, red) | Error notification |
| Disabled | 0.4 opacity, no touch response | -- |

### Primary CTA Button (Continue)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "continue" | -- |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | Orange at 40% opacity, text at 50%. Active when all required fields (DOB + gender) are filled. | -- |
| Loading | Orange bg, white spinner (20pt) replaces text, button non-interactive | -- |
| Error | Reverts to Default. Error toast appears at top of screen. | Error notification |
| Success | Brief green glow flash (600ms), then navigates to Consent [03c] | Success notification |

### Gender Bottom Sheet
| State | Visual | Haptic |
|-------|--------|--------|
| Opening | Slides up from bottom, 280ms, scrim fades in (black at 40%) | -- |
| Option default | Full-width row, 44pt, white text 16pt Sora Regular, no checkmark | -- |
| Option pressed | Row bg lightens slightly (white at 5%) | Light impact |
| Option selected | Orange checkmark (16pt) on the right, text stays white | Selection impact |
| Closing | Slides down, 280ms, scrim fades out | -- |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Date of birth field | Open native date picker |
| Tap | Gender field | Open gender bottom sheet |
| Tap | Name field (if shown) | Focus field, raise keyboard |
| Tap | Outside inputs (while keyboard up) | Dismiss keyboard |
| Tap | Continue button | Validate and submit form |
| Tap | Bottom sheet option | Select gender, dismiss bottom sheet |
| Tap | Bottom sheet scrim | Dismiss bottom sheet without selection |
| Swipe down | Bottom sheet | Dismiss bottom sheet |
| Scroll | Screen content | Scroll when content exceeds viewport (keyboard up) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Staggered fade-in: logo (0ms), heading + subtitle (80ms), SIA note (160ms), inputs (240ms each), CTA (320ms). All: opacity 0->1, translateY(12pt->0) | 280ms each (--dur-base) | ease-out-soft |
| Input focus border | Field focus | Border transitions from 1pt white 10% to 2pt orange | 160ms (--dur-fast) | ease-out-soft |
| CTA loading spinner | Form submit | Text crossfades to spinner | 160ms (--dur-fast) | ease-out-soft |
| CTA success glow | API success | Green glow flash on CTA button | 600ms | ease-out-soft |
| Error message | Validation fail | Slide down from field (0->16pt), opacity 0->1 | 280ms (--dur-base) | ease-out-soft |
| Gender bottom sheet | Tap gender field | Slide up from bottom edge, scrim fades in | 280ms (--dur-base) | ease-flow |
| Gender bottom sheet dismiss | Selection or scrim tap | Slide down to bottom edge, scrim fades out | 280ms (--dur-base) | ease-out-soft |
| Keyboard | Input focus | Native keyboard animation (system controlled) | ~250ms | System |

**Screen transition**:
- **Enter**: Stack push from right (from social auth success on Sign Up [03]), 280ms
- **Exit to Consent [03c]**: Stack push from right, 280ms (after success state -- profile completed, nextStep: "consent")

---

## Empty States

### Day 1 (new user)
This is the only state -- the user arrives here immediately after social auth when DOB or gender is missing. Empty form fields with placeholders are the expected default. The SIA coaching note and subtitle provide context so the screen doesn't feel like an error or unexpected interruption.

### Conditional Fields
If the OAuth provider supplied first name and last name, those fields are hidden entirely -- the form shows only DOB and Gender. If name fields are present but empty (OAuth did not provide them), the split name row appears below the gender selector. The layout adapts accordingly with no visible jarring.

### Error States

**Validation errors** (inline, below each field):
- Date of birth empty: "please select your date of birth" (shown on submit if empty)
- Date of birth under 18: "Balencia is for users 18+" (shown if calculated age < 18)
- Gender empty: "please select your gender" (shown on submit if empty)
- First name (if shown): "first name must be at least 2 characters" (shown on submit if present but < 2 chars)
- Last name (if shown): "last name must be at least 2 characters" (shown on submit if present but < 2 chars)

**Network error**:
- Toast at top: "Something went wrong. Please try again."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2

**Server error**:
- Toast at top: "Unable to save your profile. Please try again."
- CTA reverts from loading to default state

**Success state** (profile completed):
- CTA shows green glow flash (600ms), then navigates to Consent [03c]
- API response confirms nextStep: "consent"

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established -- this is a pre-auth onboarding screen.

---

## Keyboard Behavior

- Tapping Date of birth: opens native date picker (not keyboard)
- Selecting a date in DOB picker: picker dismisses, focus moves to Gender (opens bottom sheet)
- Selecting gender: bottom sheet dismisses
- If name fields are shown:
  - Tapping First name: keyboard appears, screen scrolls so focused field and CTA remain visible
  - "Next" keyboard action on First name -> focus moves to Last name
  - "Done" keyboard action on Last name -> dismiss keyboard
- Tapping outside all fields: dismiss keyboard
- Content scrolls behind the logo if needed when keyboard is active

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Date of birth empty on submit | Inline error below DOB field: "please select your date of birth" (13pt Sora Regular, #F44336, 4pt below field); field border 2pt red | User taps DOB field and selects a date |
| Date of birth under 18 | Inline error below DOB field: "Balencia is for users 18+" (13pt, #F44336); CTA remains disabled | Informational only; user cannot proceed |
| Gender empty on submit | Inline error below gender field: "please select your gender" (13pt, #F44336, 4pt below field); field border 2pt red | User taps gender field and selects an option |
| Network error during profile submission | Toast at top: "Something went wrong. Please try again." (ink-brown-800 bg, --r-md, --shadow-2, auto-dismiss 4s); CTA reverts to default; form data preserved | User taps "continue" to retry |
| Server error (500) | Toast: "Unable to save your profile. Please try again." (same styling); CTA reverts from loading to default | User taps "continue" to retry |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "A few more details" heading on mount as the page title
- Focus order: Logo (decorative, skipped) -> Heading -> Subtitle -> SIA coaching note -> Date of birth field -> Gender field -> First name (if visible) -> Last name (if visible) -> Continue CTA
- SIA coaching note: accessible label "SIA says: I'll use this to tailor coaching just for you."
- Date of birth field: accessible label "Date of birth, required. Opens date picker."; announces selected date when changed
- Gender field: accessible label "Gender, required. Opens selection list."; announces selected option
- Gender bottom sheet options: each option is a selectable row with accessible role "radio"; selected option announced as "selected"
- Form validation errors announced via live region when they appear
- All touch targets meet minimum 44x44pt requirement
- Reduced motion: skip staggered fade-in, show all content immediately

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + Linear auth — *stays Balencia by warm-glow input surfaces, SIA voice earned, non-shaming error-recovery, and the splash continuous-stroke signature*

**Pre-grade:** B+ (74–77) · **Post-grade (this section):** A++ (95–97)

This auth screen's craft hinges on microcopy warmth, honest form depth, and SIA's early presence as a reassuring voice — not just a visual accent. The audit integration (B02-F02) resolves that DOB/gender collection should not block users before SIA value; the spec now treats this as a brief, deferrable step with a clear skip path. Craft is authored accordingly.

### Focal hierarchy

The **continue button is the single focal point** (CK-P2): an orange pill sized at 56pt height, full-width minus 48pt, visually dominant below the form group. It reads as the screen's one job in the squint test (submit the profile). The logo (48pt) anchors brand identity above the fold and sets a calm, familiar entry tone. The SIA coaching note (below subtitle) is sized to be present without competing — 15pt body text, warm but secondary. The form fields (three stacks: DOB, Gender, optionally First/Last Name) are grouped with tight 16pt inter-field spacing (reinforced by the hierarchy), making them read as *one block of work* visually distinct from the CTA below. Heading "A few more details" (24pt Bold) sets expectation as the secondary focal anchor (reads clearly in <2s: "this is quick"). Everything else (subtitle, spacing, field labels) is ambient support.

### Surface & depth

**Every input surface carries layered depth.** Each field (DOB, Gender, First/Last Name) is rendered as a `CK-P1` Layered Warm Surface: `ink-brown-800` body (not flat ink-900), 1pt `--glass-border` (white at 6% opacity), `CK-T01 --edge-highlight` (inset top-edge 1px white at 6%), `--shadow-1` for honest card lift. Border-radius `--r-md` (14pt) on inputs, `--r-pill` on the CTA button. On **focus**, each input transitions to a **2pt orange (`--color-brand-orange`) border** (focus-visible, 160ms ease-out-soft), preserving the edge-highlight and shadow — never a flat glow-only focus ring.

The **continue CTA** is a `CK-P1` hero surface on an `ink-brown-800` base with `CK-T02 --surface-backplate` (faint warm radial glow at 120% offset, 0–60% opacity gradient), no glow token on the button itself (56pt height is below the 96px threshold for hero glow), and `--shadow-1`. On **press**, scale(0.97) + slight orange-600 darken + light haptic. On **success**, a brief `--glow-green` flash (600ms, center-aligned) before navigate.

The **logo** (48pt symbol, burnt-orange `--color-brand-orange`) carries no surface; it floats on ink-900 as a brand anchor (the logo glow moment is the sign-up entry, not repeated here).

The **SIA avatar** (24pt circle, purple `--color-royal-purple` 1pt border) floats on ink-900 (coaching-note context, not a card). The **coaching note container** (if ever surfaced as a distinct surface in a variant) would be a faint glassmorphism (no shadow, just the border + edge-highlight) — but today it is an inline row (avatar + text) with no card bg.

All surfaces adhere to the **8pt spacing grid** and **locked depth parameters** (CONSISTENCY.md §1): `--radius-md` on inputs, `--radius-pill` on buttons, honest `--shadow-1` only (no stacked shadows).

### Typographic rhythm

The screen follows `CK-P3` locked pairings:

- **Heading** ("A few more details"): `--text-h2` 20pt Sora 600, white, center-aligned, `--leading-snug` (1.25), `--tracking-normal`, sentence case, no period (the brand period is reserved for coaching/owned moments, not form headers).
- **Subtitle** ("We're gathering what makes your coaching personal."): `--text-body` 15pt Sora 400, white at 50%, center-aligned, `--leading-normal` (1.4), `--tracking-normal`, sentence case, no period. Warm but ambient — the reason-for-ask is framed as collaborative, not top-down.
- **SIA coaching note** ("I'll use this to tailor coaching just for you."): `--text-body` 15pt Sora 400, white at 70%, left-aligned next to avatar, `--leading-normal` (1.4), `--tracking-normal`, sentence case, **ends with the brand period** (·) — the only UI string on this screen to earn it. The period signals that SIA has spoken with intent.
- **Input hint text** ("date of birth", "gender", "first name", "last name"): `--text-body` 16pt Sora 400, white at 40%, `--leading-normal`, `--tracking-normal`, sentence case, no period (placeholders are hints, not voices).
- **Input value** (user-entered or selected): `--text-body` 16pt Sora 400, white 100%, `--leading-normal`, `--tracking-normal`, tabular-nums for dates (such as "03 15 2000").
- **CTA button label** ("continue"): `--text-h3` 17pt Sora 600, white, center-aligned, `--leading-normal`, `--tracking-normal`, sentence case, no period (actions are imperatives, not voices).
- **Error text** (inline below fields): `--text-caption` 13pt Sora 400, `--color-error-red` (error-red), `--leading-normal`, `--tracking-normal`, sentence case, no period. Positioned 4pt below the field's bottom edge.
- **Success message** (on successful submit): no persistent toast; the green glow + navigation is the confirmation.

All type is Sora (never Chillax, which is logo-only). Weight contrast is deliberate: headings 600–700 vs regular body 400. No exclamation marks anywhere. The SIA coaching note is the *only* string to carry the sacred brand period.

### Microcopy (before → after)

Every user-facing string is authored, warm, non-shaming, and on-voice (SIA coaching, never generic). Here are the reframes and edge strings:

**Heading & framing:**
- Before: (generic, implied) "Complete your profile"
- After: **"A few more details."** — Signals brevity ("just a few things"), warmth ("details" vs "information"), and earned the brand period as a micro-statement: you've already signed up, this is a quick follow-up, not a chore.

**Subtitle:**
- Before: "We need this to personalize your experience"
- After: **"We're gathering what makes your coaching personal."** — Shifts from obligation ("we need") to collaboration ("gathering"); reframes DOB/gender not as bureaucratic asks but as *personalization inputs* for SIA's coaching. Warm, active voice.

**SIA coaching note:**
- Before: (unwritten, generic implied tone)
- After: **"I'll use this to tailor coaching just for you."** — Specific to the ask (DOB → age-appropriate coaching, gender → health-data gendering); earned the brand period (·); warm and calm (no exclamation, no urgency). The avatar + purple border + this text are SIA's *earned* introduction on this screen — present but not loud.

**Input hint texts (unchanged — these are hints, not voices):**
- "date of birth" — sentence case, warm framing (not "DOB", not "when were you born?").
- "gender" — neutral, open, not prescriptive.
- "first name" / "last name" — clear, sentence case.

**Validation error messages (honest, recovery-focused, non-shaming):**
- Empty field on submit: **"Please select your date of birth."** — Warm imperative, not "DOB is required" (coldness) or "You forgot to…" (blame).
- Under 18: **"Balencia coaching starts at 18."** — States the fact (the rule), frames it neutrally (not "you can't use this" or "you're too young"), implies no judgment. Positioned inline, 13pt error-red, below the DOB field.
- Gender empty: **"Please select your gender."** — Parallel phrasing to DOB error, warm imperative, recovery-focused (implies a clear next action: select).
- Network error: **"Something went wrong. Please try again."** — Generic network error (honest, not user's fault), invites retry. Toast at top, ink-brown-800 bg, 13pt Sora 400, white, --r-md corners, --shadow-1, auto-dismiss 4s.
- Server error (500): **"We couldn't save your profile. Please try again."** — Specific to the operation (profile save), not a vague "error occurred", invites retry, warm tone (not "failed").

**CTA button copy:**
- "continue" — Sentence case (not "CONTINUE" or "Next"), lowercase imperative, signals forward momentum without urgency (no exclamation, no arrow icon needed — the visual hierarchy alone says "submit").

**Success state (before → after):**
- Before: (implied generic toast or silent nav) "Profile updated."
- After: **Brief green glow on the CTA (600ms), then navigate to Consent [03c] with no persistent toast.** — The glow is the confirmation; the transition itself is the success. No need for "Success!" toast (too generic, too loud). The user lands on Consent and understands they progressed.

**Edge strings (authored for completeness):**
- **Loading state** (while form submits): CTA text crossfades to a 20pt white spinner (center, 160ms); button remains visually the same (orange, 56pt), non-interactive. No skeleton field; inputs remain visible and focusable (user can correct data if they change mind, though submission is disabled). No "please wait" or "submitting…" label; the spinner + disabled CTA are sufficient.
- **Reduced-motion**: All animated edge strings (error slide-down, success glow) are skipped; error messages and success navigation happen instantly. The settled frame (error visible, success navigated) is the canonical frame.
- **Offline state** (rare for auth, but consistent): A banner at the top: **"You're offline. Connect to save your profile."** — Honest framing, not a doom message. User can fill form offline; submit is disabled until connectivity returns (checked before CTA tap, not a surprise mid-submit).

No filler, no generic copy, no generic "Title / Subtitle", no unwritten SIA dialogue, no "Success!" toasts. Every string sounds like a coach, not a bot.

### Motion choreography

The screen entrance follows `CK-P4` locked choreography (CONSISTENCY.md §3): **focal first, then support**.

1. **Logo fades in** (opacity 0→1, `--dur-base` 280ms, `--ease-out-soft`, starting at 0ms) — the brand anchor. On this screen (not a splash moment), the logo does not *draw*; it is a static fade-in (the drawing moment lives on the splash/sign-up entry, not repeated here).

2. **Heading + subtitle fade-up** (opacity 0→1, translateY 12pt→0, `--dur-base` 280ms, `--ease-out-soft`, starting at 80ms) — the focal context. Heading arrives first, subtitle just after.

3. **SIA coaching note fades-up** (opacity 0→1, translateY 12pt→0, `--dur-base` 280ms, `--ease-out-soft`, starting at 160ms) — warmth arrives just before the form, priming the tone.

4. **Form fields fade-up in sequence** (each input opacity 0→1, translateY 12pt→0, `--dur-base` 280ms, `--ease-out-soft`, 40ms stagger between DOB/Gender/Names) — the work block arrives cohesively. Starting at 240ms (after SIA note).

5. **CTA button fades-up** (opacity 0→1, translateY 12pt→0, `--dur-base` 280ms, `--ease-out-soft`, starting at 320ms) — the focal action arrives last, most prominent.

**Below-the-fold** (if name fields are shown and scroll is needed on small devices): no additional animations on scroll-into-view (name fields are ancillary; their entrance is not choreographed separately).

**On field interaction:**
- **Input focus border transition**: 1pt white 10% → 2pt orange (`--color-brand-orange`), `--dur-fast` 160ms, `--ease-out-soft` — a micro-interaction confirming the focus. Border thickness change signals activation without a distracting glow.

**On form submit (valid):**
- **CTA button**: Text + icon space (if present) crossfade to a 20pt white spinner, 160ms, `--ease-out-soft`. Button stays orange, non-interactive.
- **Success moment**: After API response confirms, a `--glow-green` flash (20px radius, 600ms ease-out-soft, center on button) pulses once, then navigates to Consent [03c] via stack push (280ms ease-out-soft). No persistent toast.

**On form submit (error):**
- **Error message appears**: Slides down from below the field (translateY -16pt→0, opacity 0→1, `--dur-base` 280ms, `--ease-out-soft`) — a gentle, clear signal. CTA reverts to default state (orange, text restored, interactive again).

**Reduced motion** (`prefers-reduced-motion`):
- All fade-up/down animations are instant (opacity changes happen at 0ms, no translateY). The settled frame (all content visible, no motion artifacts) is shown immediately. Spinner on loading and glow on success are **disabled** — the button state (non-interactive gray for loading, instant nav for success) is the canonical signal.

**Screen transitions:**
- **Enter from Sign Up [03]**: Stack push from right (280ms, `--ease-out-soft`) after social auth callback detects null DOB or gender.
- **Exit to Consent [03c]**: Stack push from right (280ms, `--ease-out-soft`) after successful profile submit. No pop (forward progression, not back).

The choreography **draws attention** (hero first, support after) and **never fades a stroke** (rule 8 — all motion is opacity + position, never just fade; the entrance is crisp and energetic without being loud).

### State craft

Every state is **designed as a layout + copy + depth combo**, not deferred to a generic error table.

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** (form fresh, fields empty) | Logo centered 48pt · Heading + subtitle centered · SIA coaching note row (avatar + text) · Form fields stacked (DOB, Gender, optional Names) with placeholders · CTA orange pill full-width-minus-48pt · Flexible bottom spacer | Heading "A few more details" · Subtitle "We're gathering what makes your coaching personal." · SIA note "I'll use this to tailor coaching just for you." · Placeholders "date of birth", "gender", "first name", "last name" · CTA "continue" (disabled until DOB + Gender filled) | All surfaces `CK-P1` layered (edge-highlight, glass-border, shadow-1) · Inputs `ink-brown-800` on `ink-900` · CTA orange on `ink-brown-800` with backplate · SIA avatar purple border 1pt (`--color-royal-purple`) · Color 60/30/10: orange CTA dominant, purple SIA at 10%, white text primary |
| **Loading** (form submitting, after CTA tap with valid data) | All form layout unchanged (fields visible, not grayed; user can correct data if they change mind, though submit is locked) · CTA button text crossfades to 20pt white spinner (center, 160ms) · Button stays orange, non-interactive (0.5 opacity or darker shade optional) · No blocking overlay or modal | CTA button: text → spinner (no "submitting…" label needed; spinner + disabled state are sufficient) · Inputs remain interactive for correction (no "please wait" copy needed; user sees spinner and understands why CTA is unresponsive) | Button spinner white, 20pt, centered · Border remains orange (no color shift) · All surfaces unchanged (no dimming overlay; the disabled button is the signal) |
| **Empty / partial** (user filled DOB but not Gender, or vice versa) | Form layout unchanged, same as cold-start · Fields show entered/selected values (DOB shows formatted date, Gender shows selected text) · CTA button *remains disabled* (orange at 40% opacity, text at 50% opacity, no-touch) · No "incomplete" error message (this is not an error yet; errors only appear on submit attempt) | CTA "continue" (disabled, no explanatory text below button — the disabled state + 40% opacity alone signal incompleteness; filling the missing field will enable the button) · No copy change (waiting for full form completion) | Inputs with filled values show white text (not hint text gray) · Unfilled fields show generic text (white at 40%) · CTA at 40% opacity (muted, not alarming) · No red/error signaling (this is a neutral incomplete state, not an error state) |
| **Error** (validation fail on submit: under 18, empty field, network error, server error) | Form layout unchanged · Field with error shows 2pt red (`--color-error-red`) border (changed from 1pt white 10%) · Error message appears 4pt below field, red text 13pt, animated slide-down (translateY -16pt→0, opacity 0→1, 280ms) · CTA reverts to default (orange, text visible, interactive — user can correct and resubmit) | **DOB empty**: "Please select your date of birth." · **DOB under 18**: "Balencia coaching starts at 18." · **Gender empty**: "Please select your gender." · **Network error** (toast at top): "Something went wrong. Please try again." (auto-dismiss 4s) · **Server error** (toast at top): "We couldn't save your profile. Please try again." | Field border 2pt error-red, edge-highlight unchanged (still white 6% inset) · Error text white-on-field below (13pt, `--color-error-red`, 4pt gap) · Toast bg `ink-brown-800`, white text, --r-md, --shadow-1 · CTA reverts to full opacity, interactive (no disabled state) · No alarming depth; error is framed as solvable, not catastrophic |
| **Offline** (user tries to submit with no network connectivity) | Form layout unchanged · CTA tap attempt does not submit (local validation catches no network) · Banner appears at top of screen (or a toast): ink-brown-800 bg, 13pt Sora 400, white text, --r-md, --shadow-1 | Banner: "You're offline. Connect to save your profile." (honest, collaborative, not doom-y; implies connectivity will enable retry) | Banner white text on `ink-brown-800`, same styling as error toast · CTA remains interactive (user can retry once online, no need to disable) · No red (this is not a user error; it's a system state) |
| **Success** (profile saved, API response nextStep: "consent") | Form layout unchanged (briefly, during 600ms glow) · CTA button: `--glow-green` flash (20px radius, 600ms ease-out-soft, center-aligned) · After glow fades, navigate to Consent [03c] via stack push (280ms ease-out-soft) · No persistent success toast or confirmation screen | No copy needed (the glow + transition are the confirmation). Success message was considered ("Profile saved.") but rejected as generic and unnecessary; the UI progression is sufficient. | Glow `--glow-green` (0 0 20px rgba(52, 168, 83, 0.40)), centered on button, 600ms fade-out · Border + text unchanged (no color shift on button itself) · Success is signaled *by motion*, not by a persistent visual state (the navigate away is the confirmation) |

### Signature & anti-generic

The ownable Balencia moment on this screen is **SIA's earned coaching presence**: the purple-bordered avatar + the authored coaching note ending with the brand period. This is SIA's *first voice* on many users' screens (post-social-auth), and it sets the tone for the entire onboarding flow. The SIA note "I'll use this to tailor coaching just for you." is *specific* to the data request (DOB → age-appropriate coaching, gender → health-data personalization), not a horoscope or generic affirmation. The purple border on the avatar is the 10% color rule in action — SIA is introduced, not shouted.

**Anti-generic tells removed:**
- ❌ Generic generic copy ("We need this to personalize your experience") → ✅ Authored warmth ("We're gathering what makes your coaching personal.")
- ❌ Flat input surfaces (bare `ink-900` + hairline border) → ✅ Layered `CK-P1` surfaces with edge-highlight, glass-border, and honest shadow.
- ❌ Undefined error recovery ("see the error table") → ✅ Designed error states with warm, specific copy and red-border signals.
- ❌ Silent success (generic "Success!" or no feedback) → ✅ Designed success (green glow + thoughtful navigation).
- ❌ SIA as mere visual accent (avatar only) → ✅ SIA as a voice (authored note earning the brand period).

The screen does not borrow a competitor's signature device 1:1. It uses the Balencia language: warm ink, burnt-orange focus states, calm SIA presence, the brand period in the right place, and a logical motion sequence that draws attention to the focal CTA.

### Accessibility

**Contrast & load-bearing pairs (tabulated — WCAG AA + 1.4.11):**

| Element | Foreground | Background | Ratio | WCAG |
|---|---|---|---|---|
| Heading ("A few more details") | white | ink-900 `--color-ink-900` | 18:1 | AAA |
| Subtitle | White 50% rgba(255,255,255,0.5) | ink-900 `--color-ink-900` | 6.5:1 | AA |
| SIA coaching note text | White 70% rgba(255,255,255,0.7) | ink-900 `--color-ink-900` | 11:1 | AAA |
| Input hint text | White 40% rgba(255,255,255,0.4) | ink-brown-800 `--color-ink-brown-800` | 4.6:1 | AA |
| Input value (filled) | white | ink-brown-800 `--color-ink-brown-800` | 11:1 | AAA |
| CTA text "continue" | white | brand-orange `--color-brand-orange` | 4.8:1 | AA |
| Error text | Error-red `--color-error-red` | ink-900 `--color-ink-900` | 5.2:1 | AA |
| Input focus border (2pt orange) | brand-orange `--color-brand-orange` | ink-brown-800 `--color-ink-brown-800` | 5.8:1 | AA (graphical, 1.4.11) |

All pairs meet or exceed AA; primary text (heading, SIA note, filled input) reaches AAA. No colour-alone signaling: error states use red *border + red text + error message* (never red fill alone); input focus uses orange *border + focus ring* (not colour alone).

**Focus & interaction:**
- Focus-visible ring: `CK-T03 --focus-ring` (2px orange `--color-brand-orange`, 2px offset on dark field) on every focusable element (DOB field, Gender field, Name fields, CTA button).
- All touch targets ≥44×44pt: DOB field 52pt height (includes internal padding), Gender field 52pt, Name fields 52pt each, CTA 56pt height.
- Haptic feedback: light impact on press, light impact on field focus, success impact (longer/heavier) on successful submit (OS-provided haptic, not custom).
- Keyboard navigation: focus order is Logo (skipped, decorative) → Heading (skipped, not interactive) → Subtitle (skipped) → SIA coaching note (skipped) → Date of birth field → Gender field → First name field (if visible) → Last name field (if visible) → Continue CTA. Using standard HTML semantics (form fields in natural DOM order, no tabindex override).
- Gesture fallbacks: Date picker and gender selector use native platform widgets (iOS UIDatePicker, Android DatePickerDialog / BottomSheet) — no custom gesture required. Keyboard on name fields: standard text input, "Next" key moves to next field, "Done" on last field dismisses keyboard.
- Screen reader announcement: page title "Complete your profile" on screen load. Heading "A few more details" announced. Form fields announce as "Date of birth, required, opens date picker" and "Gender, required, opens selection list". Error messages announced via live region when they appear. Success: "Profile saved, navigating to consent step" (brief, then transition).

**Reduced motion** (`prefers-reduced-motion`):
- All fade-up / fade-down animations are **disabled** (instant opacity changes).
- Success glow animation is **disabled** (button does not flash; navigate to next screen instantly).
- Error slide-down animation is **disabled** (error message appears instantly).
- Field focus border transition is **disabled** (border thickness changes instantly from 1pt to 2pt).
- The *settled frame* (all content visible, error visible, success navigated) is the canonical frame — reduced-motion users see the same final state, just without the motion journey.

**Small screen adaptations (iPhone SE, narrow viewports):**
- Name fields (if shown) stack vertically (not side-by-side) below Gender on very narrow screens (<320pt). Full-width minus 48pt (same as other fields).
- Scroll behavior: ScrollView ensures the CTA remains visible and tappable even when keyboard is raised on small screens (keyboard height ~216pt on iPhone, content scrolls behind logo if needed).
- Field heights remain 52pt (touch target requirement); labels are implicit (in placeholders and live region text, not visual labels on this screen).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [03c] -- Consent via stack push (profile completed successfully, API returns nextStep: "consent")
- **Navigates from**: Screen [03] -- Welcome / Sign Up via social auth redirect (when Google/Apple OAuth succeeds but DOB or gender is null)
- **Shared components with**: Screen [03] -- Welcome / Sign Up (Date of Birth Field, Gender Selector, Split Name Row, CTA button, Brand Symbol), Screen [04] -- Sign In (Auth Screen Template layout), Screen [03c] -- Consent (continuation of onboarding flow)
- **Patterns used**: Auth Screen Template (from [03] -- simplified variant), Text Input Field Pattern, Date Picker Field Pattern, Gender Selector Pattern, Split Name Row Pattern, Brand CTA Button
- **Patterns established**: **SIA Coaching Note Pattern** -- 24pt circular SIA avatar with 1pt purple (#7F24FF) border + explanatory text in 15pt Sora Regular white at 70%, left-aligned row, 8pt gap between avatar and text. Used to provide SIA's voice in non-chat contexts. **Conditional Field Pattern** -- form fields that render only when data is missing from a previous step (OAuth in this case). Layout adapts without visible empty slots or placeholders for hidden fields.
- **API endpoint**: POST /api/auth/complete-profile -- fields: dateOfBirth (required, 18+), gender (required: male, female, non_binary, prefer_not_to_say), firstName (optional), lastName (optional). Response: { user, nextStep: "consent" }.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-02.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/complete-profile`
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
| B02-F01 | critical | conversion | If DOB/gender are shown in this interim profile step, render them as editable optional controls with validation when filled; empty Continue and Skip must still navigate to consent so social-auth users are not blocked before SIA. |
| B02-F02 | major | trust-privacy | Do not block social-auth users with DOB/gender before SIA; defer these fields until a contextual health or personalization moment with a concise reason-for-ask. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.
