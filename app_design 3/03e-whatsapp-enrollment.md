# Screen Design: WhatsApp Enrollment

**Screen**: 03e of 73
**File**: 03e-whatsapp-enrollment.md
**Register**: Brand Mode
**Primary action**: Enroll phone number for WhatsApp coaching channel (or skip)
**Tab**: None (pre-auth, onboarding)
**Navigation**: Stack push from Consent [03c] (when user opted into WhatsApp coaching). Skip available — not a required step. Exit to SIA Onboarding [07] via stack push.

---

## Purpose

The WhatsApp Enrollment screen is the optional bridge between consent and onboarding for users who opted into WhatsApp coaching on the Consent screen [03c]. Balencia uses WhatsApp as a proactive coaching channel — SIA can send reminders, check-ins, and encouragement outside the app. This screen collects and verifies the user's phone number via a 6-digit SMS code. The two-phase flow (phone entry → SMS verification) mirrors familiar patterns from banking and messaging apps. The screen must feel lightweight and skippable — this is not a gate, it is a value-add. Users who skip can always enable WhatsApp later in Settings [21]. SIA is not present yet.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Get SIA on WhatsApp" heading — frames the value, not the obligation
2. Subtitle — explains what they will receive ("reminders, check-ins, and coaching tips")
3. Phone number input (Phase 1) or SMS code boxes (Phase 2) — the active task
4. Primary CTA — "send code" (Phase 1) or "verify" (Phase 2)
5. "skip" link — always visible, always accessible, no guilt
6. Value preview — brief list of what WhatsApp coaching includes

**User flow**:
- **Arrives from**: Consent [03c] via stack push (user toggled WhatsApp coaching on)
- **Primary exit**: SIA Onboarding [07] via stack push (phone verified, WhatsApp channel active)
- **Secondary exit**: SIA Onboarding [07] via stack push (user taps "skip" — WhatsApp not configured)
- **Full registration flow**: Sign Up [03] → OTP [03b] → Consent [03c] → WhatsApp Enrollment [03e] → SIA Onboarding [07]
- **Skip flow**: Consent [03c] → WhatsApp Enrollment [03e] → skip → SIA Onboarding [07]

---

## Layout

**Scroll behavior**: None (fixed — content fits on all device sizes including iPhone SE)
**Tab bar visible**: No

### ASCII Wireframe — Phase 1: Phone Entry

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                      skip   │  ← skip link, top-right
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt, centered
│         └───────┘           │
│                             │  ← 32pt gap
│   "Get SIA on WhatsApp"    │  ← heading, center-aligned
│                             │  ← 12pt gap
│   "Reminders, check-ins,   │  ← subtitle, center-aligned
│    and coaching tips —      │
│    right in your chat."     │
│                             │  ← 32pt gap
│   ┌──┐ ┌─────────────────┐ │
│   │+1│ │ Phone number     │ │  ← country code + phone input
│   └──┘ └─────────────────┘ │
│                             │  ← 24pt gap
│   ┌───────────────────┐    │
│   │    send code       │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │  ← 16pt gap
│    ✓ Daily reminders        │  ← value preview list
│    ✓ Check-in prompts       │     (white at 50%)
│    ✓ SIA coaching tips      │
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### ASCII Wireframe — Phase 2: SMS Verification

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]                 skip   │  ← back (returns to Phase 1) + skip
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt, centered
│         └───────┘           │
│                             │  ← 32pt gap
│   "Enter the code"         │  ← heading, center-aligned
│                             │  ← 12pt gap
│   "We sent a 6-digit code  │  ← subtitle, center-aligned
│    to +1 *** *** 4567"     │     masked phone number
│                             │  ← 32pt gap
│  ┌───┐┌───┐┌───┐┌───┐┌───┐┌───┐
│  │ 4 ││ 8 ││ 2 ││ 7 ││ 1 ││ 5 │  ← 6 code boxes, 48x48pt
│  └───┘└───┘└───┘└───┘└───┘└───┘     8pt gaps between
│                             │  ← 24pt gap
│      "Resend code (0:47)"  │  ← resend link with countdown
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │      verify        │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack — Phase 1 (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Skip Link Row** — 44pt
   - Purpose: Allow skipping without friction
   - Content: "skip" text link, right-aligned, 16pt right margin

3. **Logo Area** — 48pt logo + 24pt top margin + 32pt bottom margin = 104pt
   - Purpose: Brand anchor (identical to all auth screens)
   - Content: Balencia symbol only, 48x48pt, centered

4. **Heading** — 30pt text + 12pt bottom margin = 42pt
   - Purpose: Frame the value proposition
   - Content: "Get SIA on WhatsApp"

5. **Subtitle** — ~60pt text + 32pt bottom margin = ~92pt
   - Purpose: Explain the benefit
   - Content: "Reminders, check-ins, and coaching tips — right in your chat."

6. **Phone Input Group** — 52pt input + 24pt bottom margin = 76pt
   - Purpose: Collect phone number
   - Content: Country code picker + phone number input

7. **Primary CTA** — 56pt button + 16pt bottom margin = 72pt
   - Purpose: Submit phone number to trigger SMS
   - Content: "send code" pill button

8. **Value Preview** — ~72pt
   - Purpose: Reinforce why WhatsApp coaching is worth it
   - Content: 3 checkmark items

9. **Lower Spacer** — flexible

10. **Home Indicator Zone** — 34pt

### Component Stack — Phase 2 (top to bottom)

1. **Status Bar Zone** — 44pt

2. **Back + Skip Row** — 44pt
   - Content: Back chevron (left), "skip" link (right)

3. **Logo Area** — 104pt (same as Phase 1)

4. **Heading** — 42pt
   - Content: "Enter the code"

5. **Subtitle (Masked Phone)** — ~72pt
   - Content: "We sent a 6-digit code to +1 *** *** 4567"

6. **SMS Code Input Group** — 48pt boxes + 24pt bottom margin = 72pt
   - Content: 6 individual square input boxes

7. **Resend Code Link** — 52pt
   - Content: "Resend code" with countdown timer

8. **Primary CTA** — 56pt button
   - Content: "verify" pill button

9. **Lower Spacer** — flexible

10. **Home Indicator Zone** — 34pt

---

## Components

### Skip Link
- **Purpose**: Allow the user to bypass WhatsApp enrollment entirely — no guilt, no friction
- **Data source**: Triggers API call (POST /auth/whatsapp/skip)
- **Visual treatment**: "skip" in 15pt Sora Regular, white at 60%. Positioned top-right, 16pt right margin, 8pt below safe area. 44x44pt touch target. Identical to Skip Button pattern from Screen [02].
- **Variants**:
  - Default: white at 60%
  - Pressed: white at 40%, scale(0.97)
- **Gestures**: Tap to skip → POST /auth/whatsapp/skip → navigate to SIA Onboarding [07]
- **Size**: 44x44pt touch target

### Brand Symbol (Small)
- **Purpose**: Brand anchor — identical to all auth screens
- **Data source**: Static asset
- **Visual treatment**: Balencia bird symbol, Burnt Orange (#FF5E00), centered. No wordmark. No hero glow.
- **Variants**: None
- **Gestures**: None
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Set the screen's intent and value framing
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case.
- **Variants**: Phase 1: "Get SIA on WhatsApp" | Phase 2: "Enter the code"
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Subtitle
- **Purpose**: Supporting context for the heading
- **Data source**: Phase 1: Static copy. Phase 2: Dynamic — masked phone number from Phase 1 input.
- **Visual treatment**: 15pt Sora Regular, white at 50%, center-aligned. Max 3 lines.
- **Variants**: Phase 1: "Reminders, check-ins, and coaching tips — right in your chat." | Phase 2: "We sent a 6-digit code to +1 *** *** 4567" (masked: show country code + last 4 digits)
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Country Code Picker
- **Purpose**: Select the user's country dialing code
- **Data source**: Country code list. Default: auto-detect from device locale, or +1 (US) as fallback.
- **Visual treatment**: 60pt wide x 52pt tall. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10%. Border radius: --r-md (14pt). Content: flag emoji (20pt) + code text ("+1" in 16pt Sora Regular, white), left-aligned with 12pt horizontal padding. Chevron-down icon (12pt, white at 40%) right side.
- **Variants**:
  - Default: selected country flag + code
  - Pressed: bg darkens, scale(0.97)
  - Open: triggers native picker / bottom sheet with country list + search
- **Gestures**: Tap to open country picker
- **Size**: 60pt x 52pt

### Phone Number Input
- **Purpose**: Collect the user's phone number
- **Data source**: User input (phone keyboard)
- **Visual treatment**: Fills remaining width after country code picker (minus 8pt gap). Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% (default), 2pt Burnt Orange (focused), 2pt #F44336 (error). Border radius: --r-md (14pt). Text: 16pt Sora Regular, white. Placeholder: "Phone number" in white at 40%. Padding: 16pt horizontal. Numeric keyboard (keyboardType: phone-pad).
- **Variants**: Default, Focused (orange border), Error (red border + error message below), Filled
- **Gestures**: Tap to focus, type digits
- **Size**: (screen width - 48pt margins - 60pt country picker - 8pt gap) x 52pt

### SMS Code Box (x6)
- **Purpose**: Collect a single digit of the 6-digit SMS code (Phase 2 only)
- **Data source**: User input (numeric keyboard)
- **Visual treatment**: 48x48pt square (slightly smaller than OTP boxes on [03b] to fit 6 in a row). Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Text: 22pt Sora Bold (700), white, centered. Numeric keyboard only (keyboardType: number-pad).
- **Variants**: Same as OTP Input Box on [03b] — Empty, Focused (2pt orange border), Filled, Error (2pt red border + shake)
- **Behavior**: Auto-advance, back-clear, paste support for 6-digit strings. First box auto-focuses on Phase 2 entry.
- **Gestures**: Tap to focus specific box
- **Size**: 48x48pt per box. Total group width: (6 x 48pt) + (5 x 8pt gaps) = 328pt, centered horizontally.

### Resend Code Link (Phase 2 only)
- **Purpose**: Re-send the SMS code if not received
- **Data source**: Triggers API call (POST /auth/whatsapp/enroll with same phone number)
- **Visual treatment**: Identical to Countdown Resend Pattern from [03b]. 15pt Sora Semibold, center-aligned. 60-second countdown on mount and after each resend.
- **Variants**: Countdown active (white at 30%), Available (orange), Loading (spinner), Success ("Code sent" in green for 3s)
- **Gestures**: Tap to resend (when countdown complete)
- **Size**: Full-width x 44pt touch target

### Primary CTA Button
- **Purpose**: Phase 1: submit phone number. Phase 2: verify SMS code.
- **Data source**: Phase 1: POST /auth/whatsapp/enroll (sends SMS). Phase 2: POST /auth/whatsapp/verify (verifies code).
- **Visual treatment**: Full-width - 48pt margins. Burnt Orange (#FF5E00) background. White text, 17pt Sora Semibold, center-aligned. Height: 56pt. Border radius: --r-pill (999pt). Sentence case.
- **Variants**: Phase 1 text: "send code" | Phase 2 text: "verify". States: Default, Pressed, Loading, Disabled, Success, Focus-visible — identical to Brand CTA Button pattern.
- **Gestures**: Tap to submit
- **Size**: (screen width - 48pt) x 56pt

### Value Preview List (Phase 1 only)
- **Purpose**: Reinforce the benefits of enabling WhatsApp coaching
- **Data source**: Static copy
- **Visual treatment**: Left-aligned with 24pt left margin. Each item: green checkmark icon (14pt, #34A853) + 8pt gap + text (14pt Sora Regular, white at 50%). Items: "Daily reminders", "Check-in prompts", "SIA coaching tips". 8pt vertical gap between items.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins, ~72pt total height

### Back Button (Phase 2 only)
- **Purpose**: Return to Phase 1 to correct phone number
- **Data source**: Internal phase state
- **Visual treatment**: Left chevron icon, white, 2pt stroke weight, 20pt size. 16pt from left edge. Identical to Back Button pattern from [04].
- **Variants**: Default, Pressed (white at 60%, scale(0.95))
- **Gestures**: Tap to return to Phase 1 (content crossfade, not navigation)
- **Size**: 44x44pt touch target

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Skip link | Sora | 400 (Regular) | 15pt | 20pt | White at 60% | "skip" — always visible |
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | Sentence case |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 50% | Supporting context |
| Country code | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | "+1" etc. |
| Phone input text | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | User input |
| Phone placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "Phone number" |
| SMS code digit | Sora | 700 (Bold) | 22pt | 28pt | White #FFFFFF | Single digit, centered |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "send code" / "verify" |
| Resend (countdown) | Sora | 600 (Semibold) | 15pt | 20pt | White at 30% | Disabled state |
| Resend (available) | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | Tappable |
| Resend (success) | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 | "Code sent" |
| Value preview item | Sora | 400 (Regular) | 14pt | 20pt | White at 50% | Benefit text |
| Value preview check | — | — | 14pt | — | #34A853 | Checkmark icon |
| Error message | Sora | 400 (Regular) | 13pt | 18pt | #F44336 | Below input field |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary: Phone input (Phase 1) or SMS code boxes (Phase 2) — the active task
- Secondary: CTA button (orange pill) — dominant action color
- Tertiary: Heading — page title / value prop
- Quaternary: Skip link, subtitle, value preview — supporting context

**Spacing breakdown (8pt grid)**:
- Safe area to skip/back row: 0pt
- Skip row to logo: 24pt (--s-5)
- Logo to heading: 32pt (--s-6)
- Heading to subtitle: 12pt (--s-3)
- Subtitle to input: 32pt (--s-6)
- Country picker to phone input (horizontal): 8pt (--s-2)
- Phone input to CTA (Phase 1): 24pt (--s-5)
- SMS boxes to resend link (Phase 2): 24pt (--s-5)
- Resend link to CTA (Phase 2): 32pt (--s-6)
- CTA to value preview (Phase 1): 16pt (--s-4)

**Z-layers**:
- z-0: ink-900 background
- z-10: Input fields, code boxes (elevated surfaces)
- z-20: CTA button (most prominent interactive element)
- z-30: Keyboard overlay, country picker dropdown
- z-60: Error toasts

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Skip link text | rgba(255,255,255,0.6) | white at 60% | Non-intrusive |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Subtitle text | rgba(255,255,255,0.5) | white at 50% | Secondary guidance |
| Country picker bg | #211008 | ink-brown-800 | Elevated surface |
| Country picker border | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| Phone input bg | #211008 | ink-brown-800 | Elevated surface |
| Phone input border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| Phone input border (focused) | #FF5E00 | brand-orange | Focus indicator — 2pt |
| Phone input border (error) | #F44336 | color-error | Validation error — 2pt |
| SMS code box bg | #211008 | ink-brown-800 | Elevated surface |
| SMS code box border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| SMS code box border (focused) | #FF5E00 | brand-orange | Focus indicator — 2pt |
| SMS code box border (error) | #F44336 | color-error | Validation error — 2pt |
| CTA background | #FF5E00 | brand-orange | Primary action |
| CTA text | #FFFFFF | white | High contrast |
| CTA disabled bg | rgba(255,94,0,0.4) | brand-orange at 40% | Muted when input empty |
| Value preview checkmark | #34A853 | forest-green | Positive benefit indicator |
| Value preview text | rgba(255,255,255,0.5) | white at 50% | Supporting content |
| Resend (countdown) | rgba(255,255,255,0.3) | white at 30% | Disabled state |
| Resend (available) | #FF5E00 | brand-orange | Interactive link |
| Resend (success) | #34A853 | forest-green | Temporary confirmation |
| Error text | #F44336 | color-error | Error message |

**60/30/10 verification**: Orange on CTA, focus borders, skip link hover, resend link, and brand symbol — primary accent. Green on value preview checkmarks and success states — secondary. No purple (SIA not present). Appropriate for an auth screen.

---

## Interaction States

### Skip Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% | — |
| Pressed | White at 40%, scale(0.97) | Light impact |
| Focus-visible | Orange underline | — |

### Country Code Picker
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Flag + code, 1pt white 10% border | — |
| Pressed | bg darkens, scale(0.97) | Light impact |
| Open | 2pt orange border, picker visible | — |

### Phone Number Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | ink-brown-800 bg, 1pt white 10% border, placeholder text | — |
| Focused (empty) | 2pt orange border, placeholder text, keyboard up | — |
| Filled | User text, 1pt white 10% border | — |
| Focused + Filled | User text, 2pt orange border | — |
| Error | 2pt red border, error text below | Error notification |
| Disabled | 0.4 opacity | — |

### SMS Code Box
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | ink-brown-800 bg, 1pt white 10% border | — |
| Focused (empty) | 2pt orange border | Light impact |
| Filled | White digit centered, 1pt white 10% border | Light impact |
| Error | 2pt red border, shake animation (3 oscillations, 6pt translateX) | Error notification |
| Disabled | 0.4 opacity | — |

### Primary CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text | — |
| Pressed | Darker orange (#E05500), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40% opacity. Phase 1: active when valid phone entered. Phase 2: active when all 6 digits entered. | — |
| Loading | White spinner replaces text | — |
| Error | Reverts to Default. Error text appears below input. | Error notification |
| Success | Green glow flash (600ms), then navigates to [07] | Success notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Skip link | POST /auth/whatsapp/skip → navigate to SIA Onboarding [07] |
| Tap | Country code picker | Open country picker (bottom sheet or native picker) |
| Tap | Phone input | Focus input, raise phone keyboard |
| Tap | Send code CTA (Phase 1) | Validate phone → POST /auth/whatsapp/enroll → transition to Phase 2 |
| Tap | Back button (Phase 2) | Content crossfade to Phase 1 (retains entered phone number) |
| Tap | SMS code box | Focus that specific box |
| Type digit | Focused SMS box | Fill digit, auto-advance to next box |
| Backspace | Focused SMS box | Clear digit; if empty, move to previous box |
| Paste | Any SMS box | Populate all 6 boxes from clipboard (if valid 6-digit string) |
| Tap | Verify CTA (Phase 2) | POST /auth/whatsapp/verify → navigate to [07] |
| Tap | Resend link (Phase 2, available) | Re-trigger POST /auth/whatsapp/enroll |
| Swipe right | Screen edge (iOS) | Phase 2: return to Phase 1. Phase 1: no back (skip instead). |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content (Phase 1) | Screen mount | Staggered fade-in: logo (0ms), heading (80ms), subtitle (160ms), phone input (240ms), CTA (320ms), value preview (400ms). All: opacity 0→1, translateY(12pt→0) | 280ms each | ease-out-soft |
| Phase transition (1→2) | SMS sent | Content crossfade: Phase 1 elements fade out (opacity 1→0, 160ms), Phase 2 elements fade in (opacity 0→1, translateY(12pt→0), 280ms staggered) | 440ms total | ease-out-soft |
| Phase transition (2→1) | Back button | Reverse: Phase 2 fades out, Phase 1 fades in with phone number retained | 440ms total | ease-out-soft |
| Country picker open | Tap picker | Bottom sheet slides up from bottom | 520ms | ease-flow |
| Phone input focus | Tap input | Border transitions from 1pt white 10% to 2pt orange | 160ms | ease-out-soft |
| SMS box focus | Box focused | Border transitions from 1pt white 10% to 2pt orange | 160ms | ease-out-soft |
| SMS digit entry | Digit typed | Digit scales from 0.5→1.0 + opacity 0→1 | 120ms | ease-out-soft |
| Auto-advance | Digit entered | Previous box border fades to default, next box border appears orange | 160ms | ease-out-soft |
| Error shake | Wrong code | SMS boxes shake: translateX(0→6→-6→4→-4→2→-2→0) | 400ms | ease-out |
| CTA loading | Form submit | Text crossfades to spinner | 160ms | ease-out-soft |
| CTA success glow | Verification success | Green glow radiates outward from CTA, opacity 0→0.3→0 | 600ms | ease-out-soft |
| Countdown timer | Each second | Number crossfades | 160ms | ease-out-soft |
| Resend success | Code resent | "Resend code" crossfades to "Code sent" (green), back after 3s | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (from Consent [03c]), 280ms
- **Exit to [07]**: Stack push from right, 280ms (after success glow or skip)
- **Skip exit**: Immediate stack push to [07], no success glow (just 280ms slide)

---

## Empty States

### Day 1 (new user)
This is the only scenario — every user arriving here is mid-registration. Phase 1 with an empty phone input field is the default state.

### Error States

**Invalid phone number (Phase 1)**:
- Error text below phone input: "Please enter a valid phone number."
- Text: 13pt Sora Regular, #F44336, left-aligned (matching phone input left edge), 4pt below field
- Phone input border: 2pt red
- CTA reverts to default state

**SMS send failure (Phase 1)**:
- Toast at top of screen: "Could not send code. Please try again."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2, auto-dismisses after 4s
- CTA reverts to default state. Phone input retains number.

**Invalid SMS code (Phase 2)**:
- Error text below SMS boxes: "Invalid code. Please try again."
- Text: 13pt Sora Regular, #F44336, center-aligned, 8pt below code box group
- All 6 boxes get 2pt red borders + shake animation (3 oscillations, 400ms)
- After shake, boxes clear and focus returns to first box

**Expired code (Phase 2)**:
- Error text below SMS boxes: "Code expired. Please request a new one."
- 13pt Sora Regular, #F44336, center-aligned, 8pt below code boxes
- All 6 boxes get 2pt red borders (no shake)
- "Resend code" link highlighted in orange immediately (countdown bypassed)
- Boxes clear, focus returns to first box

**Too many attempts (Phase 2)**:
- Toast: "Too many attempts. Please try again in 5 minutes."
- CTA and SMS boxes disabled (0.4 opacity) for cooldown period
- Resend link disabled
- After cooldown: all elements re-enable, first box auto-focuses

**Network error (either phase)**:
- Toast: "Something went wrong. Please try again."
- CTA reverts to default. Input retains entered data.

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established — this is a pre-auth screen.

---

## Keyboard Behavior

**Phase 1**:
- On mount: phone input does not auto-focus (user reads the value prop first)
- Tapping the phone input raises the phone-pad keyboard
- Country code picker dismisses keyboard if open, then opens its own bottom sheet
- Tapping outside input dismisses keyboard

**Phase 2**:
- On phase transition: first SMS box auto-focuses, numeric keyboard appears immediately
- Numeric keyboard only (number-pad type)
- Typing a digit fills focused box and auto-advances
- When all 6 digits entered: keyboard remains visible
- Backspace on empty box: focus moves to previous box
- CTA always visible above keyboard

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Invalid phone number (Phase 1) | Inline error below phone input: "Please enter a valid phone number." (13pt Sora Regular, #F44336, 4pt below field); phone input border 2pt red; CTA reverts to default | User corrects phone number and resubmits |
| SMS send failure (Phase 1) | Toast at top: "Could not send code. Please try again." (ink-brown-800 bg, --r-md, --shadow-2, auto-dismiss 4s); CTA reverts to default; phone number retained | User taps "send code" to retry |
| Invalid SMS code (Phase 2) | All 6 boxes get 2pt red borders + shake animation (3 oscillations, 400ms); error text below: "Invalid code. Please try again." (13pt, #F44336, centered) | Boxes clear, focus returns to first box; user re-enters code |
| Expired SMS code (Phase 2) | All 6 boxes get 2pt red borders (no shake); error text: "Code expired. Please request a new one."; "Resend code" link highlighted orange immediately (countdown bypassed) | User taps "Resend code" for a new SMS |
| Too many attempts (Phase 2) | Toast: "Too many attempts. Please try again in 5 minutes."; CTA and SMS boxes disabled (0.4 opacity) for cooldown | Elements re-enable after cooldown; first box auto-focuses |
| Network error (either phase) | Toast: "Something went wrong. Please try again." (auto-dismiss 4s); CTA reverts to default; entered data preserved | User taps CTA to retry |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Get SIA on WhatsApp" (Phase 1) or "Enter the code" (Phase 2) heading on mount
- Focus order (Phase 1): Skip link -> Logo (decorative, skipped) -> Heading -> Subtitle -> Country code picker -> Phone number input -> Send code CTA -> Value preview items (informational)
- Focus order (Phase 2): Back button -> Skip link -> Logo (decorative, skipped) -> Heading -> Subtitle -> SMS box 1 through 6 -> Resend code link -> Verify CTA
- Skip link: accessible label "Skip WhatsApp enrollment"
- Country code picker: accessible label "Country code, currently [+1 United States]"
- Each SMS code box: accessible label "Digit [N] of 6"
- Resend code link: accessible label includes countdown state
- Phase transition announced via live region: "Verification code sent. Enter the 6-digit code."
- Value preview items: accessible role "text"; grouped as a list for screen readers
- All touch targets meet minimum 44x44pt requirement
- Reduced motion: skip phase transition crossfade, use instant swap

---

## Cross-References

- **Navigates to**: Screen [07] — SIA Onboarding Conversation via stack push (phone verified or skipped)
- **Navigates from**: Screen [03c] — Consent via stack push (user opted into WhatsApp coaching)
- **Shared components with**: Screen [03b] — OTP Verification (SMS code box pattern, resend link pattern, CTA states, error handling), Screen [03] — Welcome / Sign Up (phone input style, country picker concept), Screen [02] — Motion Carousel (skip link pattern)
- **Patterns used**: Auth Screen Template (two-phase variant), Brand CTA Button (full-width), Skip Button Pattern (from [02]), Countdown Resend Pattern (from [03b], adapted for 6-digit SMS)
- **Patterns established**: **Phone Input with Country Picker** — side-by-side layout: 60pt country code picker (flag + code + chevron) + flexible-width phone input, 8pt gap, matching heights (52pt), both ink-brown-800 bg with --r-md radius. Reusable for any phone number collection. **Two-Phase Auth Flow** — single screen that transitions between data entry (Phase 1) and verification (Phase 2) via content crossfade, without navigation. Back button in Phase 2 returns to Phase 1 while retaining entered data. Reusable for any verify-then-confirm pattern. **Value Preview List** — compact bulleted benefit list with green checkmarks, used to justify optional enrollment steps.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-02.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/whatsapp`
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
| B02-F03 | critical | conversion | Add real phone entry, country selection, skip navigation, SMS code verification, and resend cooldown. |
| B02-F04 | major | trust-privacy | Add concise opt-out, message-frequency, and settings reassurance copy before collecting a phone number. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

