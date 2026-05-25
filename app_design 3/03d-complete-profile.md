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

## Cross-References

- **Navigates to**: Screen [03c] -- Consent via stack push (profile completed successfully, API returns nextStep: "consent")
- **Navigates from**: Screen [03] -- Welcome / Sign Up via social auth redirect (when Google/Apple OAuth succeeds but DOB or gender is null)
- **Shared components with**: Screen [03] -- Welcome / Sign Up (Date of Birth Field, Gender Selector, Split Name Row, CTA button, Brand Symbol), Screen [04] -- Sign In (Auth Screen Template layout), Screen [03c] -- Consent (continuation of onboarding flow)
- **Patterns used**: Auth Screen Template (from [03] -- simplified variant), Text Input Field Pattern, Date Picker Field Pattern, Gender Selector Pattern, Split Name Row Pattern, Brand CTA Button
- **Patterns established**: **SIA Coaching Note Pattern** -- 24pt circular SIA avatar with 1pt purple (#7F24FF) border + explanatory text in 15pt Sora Regular white at 70%, left-aligned row, 8pt gap between avatar and text. Used to provide SIA's voice in non-chat contexts. **Conditional Field Pattern** -- form fields that render only when data is missing from a previous step (OAuth in this case). Layout adapts without visible empty slots or placeholders for hidden fields.
- **API endpoint**: POST /api/auth/complete-profile -- fields: dateOfBirth (required, 18+), gender (required: male, female, non_binary, prefer_not_to_say), firstName (optional), lastName (optional). Response: { user, nextStep: "consent" }.
