# Screen Design: OTP Verification

**Screen**: 03b of 73
**File**: 03b-otp-verification.md
**Register**: Brand Mode
**Primary action**: Verify email with 4-digit OTP code (tap "verify")
**Tab**: None (pre-auth)
**Navigation**: Stack depth 2 (pushed from Welcome / Sign Up [03]). Back button present (returns to Sign Up).

---

## Purpose

The OTP verification screen completes the registration process started on Sign Up [03]. After the user submits the sign-up form, the server sends a 4-digit OTP code to their email address. This screen collects that code and, on successful verification, creates the account and advances to Consent [03c]. The screen must feel quick and effortless — four taps and done. Auto-advancing focus between digit boxes eliminates unnecessary interactions. A resend mechanism with a 60-second cooldown prevents abuse while giving the user a clear path if the email is delayed. The visual tone continues the auth flow's warm, functional-but-premium feel. SIA is not present yet.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Verify your email" heading — sets intent immediately
2. Subtitle with masked email — confirms where the code was sent
3. OTP input boxes (4 digits) — the task at hand, visually prominent
4. "verify" primary CTA — the desired action
5. "Resend code" link (with countdown timer) — fallback if code didn't arrive
6. Back button — return to Sign Up [03] to correct email

**User flow**:
- **Arrives from**: Welcome / Sign Up [03] via stack push (form submitted, OTP sent to email)
- **Primary exit**: Consent [03c] via stack push (OTP verified, account created)
- **Secondary exit**: Welcome / Sign Up [03] via stack pop (back button — user wants to correct their email)
- **Full registration flow**: Sign Up [03] → OTP Verification [03b] → Consent [03c] → SIA Onboarding [07]

---

## Layout

**Scroll behavior**: None (fixed — content fits on all device sizes including iPhone SE)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]                        │  ← back button, 44x44pt
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt, centered
│         └───────┘           │
│                             │  ← 32pt gap
│    "Verify your email"      │  ← heading, center-aligned
│                             │  ← 12pt gap
│  "We sent a 4-digit code    │  ← subtitle, center-aligned
│   to j***@email.com"        │     masked email
│                             │  ← 32pt gap
│    ┌────┐ ┌────┐ ┌────┐ ┌────┐
│    │ 4  │ │ 7  │ │ 2  │ │ 9  │  ← 4 OTP boxes, 56x56pt each
│    └────┘ └────┘ └────┘ └────┘     12pt gaps between
│                             │  ← 24pt gap
│      "Resend code (0:47)"   │  ← text link, center-aligned
│                             │     with countdown timer
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │      verify        │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │
│                             │
│                             │  ← generous empty space below
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Back Button Row** — 44pt
   - Purpose: Return to Sign Up [03] to correct email address
   - Content: Left chevron icon, 44x44pt touch target, 16pt left margin

3. **Logo Area** — 48pt logo + 24pt top margin + 32pt bottom margin = 104pt
   - Purpose: Brand anchor (identical to Sign Up [03])
   - Content: Balencia symbol only, 48x48pt, centered

4. **Heading** — 30pt text + 12pt bottom margin = 42pt
   - Purpose: Set intent
   - Content: "Verify your email"

5. **Subtitle** — ~40pt text + 32pt bottom margin = ~72pt
   - Purpose: Confirm where the code was sent
   - Content: "We sent a 4-digit code to j***@email.com" (masked email)

6. **OTP Input Group** — 56pt boxes + 24pt bottom margin = 80pt
   - Purpose: Code entry — the primary task
   - Content: 4 individual square input boxes (56x56pt each), 12pt gaps between

7. **Resend Code Link** — 20pt text + 32pt bottom margin = 52pt
   - Purpose: Resend OTP if not received
   - Content: "Resend code" with countdown timer, center-aligned

8. **Primary CTA** — 56pt button
   - Purpose: Submit OTP code for verification
   - Content: "verify" pill button

9. **Lower Spacer** — flexible (fills remaining space)

10. **Home Indicator Zone** — 34pt

**Total estimated height**: ~560pt — fits on all devices including iPhone SE without scrolling.

---

## Components

### Back Button
- **Purpose**: Return to Welcome / Sign Up [03] — allows user to correct their email if they entered it wrong
- **Data source**: Navigation state (stack pop)
- **Visual treatment**: Left chevron icon, white, 2pt stroke weight, 20pt icon size. Positioned 16pt from left edge, vertically centered in the 44pt row. Identical to Sign In [04] Back Button pattern.
- **Variants**: None
- **Gestures**: Tap to navigate back (stack pop)
- **Size**: 44x44pt touch target

### Brand Symbol (Small)
- **Purpose**: Brand anchor — identical to Sign Up [03]
- **Data source**: Static asset
- **Visual treatment**: Balencia bird symbol, Burnt Orange (#FF5E00), centered. No wordmark (space conservation). No hero glow.
- **Variants**: None
- **Gestures**: None
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Communicate the screen's intent in one line
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Subtitle (Masked Email)
- **Purpose**: Confirm where the code was sent — builds confidence the user is checking the right inbox
- **Data source**: Dynamic — email address passed from Sign Up [03], masked for privacy (show first letter + domain, mask middle: "j***@email.com")
- **Visual treatment**: 15pt Sora Regular, white at 50%, center-aligned. Max 2 lines.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### OTP Input Box (x4)
- **Purpose**: Collect a single digit of the 4-digit OTP code
- **Data source**: User input (numeric keyboard)
- **Visual treatment**: 56x56pt square. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Text: 24pt Sora Bold (700), white, center-aligned both horizontally and vertically. Numeric keyboard only (keyboardType: number-pad).
- **Variants**:
  - **Empty (default)**: ink-brown-800 bg, 1pt white 10% border, no text
  - **Focused**: 2pt orange (#FF5E00) border, cursor blinking (or subtle pulse animation on box)
  - **Filled**: White digit text centered, border returns to 1pt white 10%
  - **Error**: 2pt red (#f44336) border, shake animation (translateX oscillation)
- **Behavior**:
  - Auto-advance: typing a digit auto-focuses the next box
  - Backspace: clears current box; if already empty, moves focus to previous box and clears it
  - Paste: if user pastes a 4-digit string, all boxes populate simultaneously
  - On mount: first box auto-focuses and numeric keyboard appears
- **Gestures**: Tap to focus specific box
- **Size**: 56x56pt per box. Total group width: (4 x 56pt) + (3 x 12pt gaps) = 260pt, centered horizontally.

### Resend Code Link
- **Purpose**: Allow re-sending the OTP code if it didn't arrive
- **Data source**: Triggers API call (POST /auth/resend-otp)
- **Visual treatment**: Center-aligned text. "Resend code" in 15pt Sora Semibold (600), Burnt Orange (#FF5E00). When countdown is active, appended with timer in white at 50%: "Resend code (0:47)".
- **Variants**:
  - **Countdown active (default on mount)**: "Resend code" in white at 30% (disabled) + "(0:59)" countdown in white at 30%. 60-second countdown starts when screen mounts or after each resend.
  - **Countdown complete**: "Resend code" in orange (#FF5E00), tappable
  - **Loading**: "Resend code" replaced with small inline spinner (14pt)
  - **Success**: "Code sent" in green (#34A853) for 3 seconds, then countdown restarts
- **Gestures**: Tap to resend (only when countdown complete)
- **Size**: Full-width x 44pt touch target

### Primary CTA Button (Verify)
- **Purpose**: Submit the OTP code for verification
- **Data source**: Triggers API call (POST /auth/verify-otp)
- **Visual treatment**: Full-width - 48pt margins. Burnt Orange (#FF5E00) background. White text "verify", 17pt Sora Semibold (600), center-aligned. Height: 56pt. Border radius: --r-pill (999pt). Sentence case.
- **Variants**: Default, Loading (spinner replaces text), Disabled (when fewer than 4 digits entered)
- **Gestures**: Tap to submit
- **Size**: (screen width - 48pt) x 56pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Back button icon | — | — | 20pt | — | White #FFFFFF | Chevron icon |
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "Verify your email" — sentence case |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 50% | "We sent a 4-digit code to j***@email.com" |
| OTP digit | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | Single digit, centered in box |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "verify" — sentence case |
| Resend (countdown active) | Sora | 600 (Semibold) | 15pt | 20pt | White at 30% | "Resend code (0:59)" — disabled state |
| Resend (available) | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "Resend code" — tappable |
| Resend (success) | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 | "Code sent" — temporary confirmation |
| Error message | Sora | 400 (Regular) | 13pt | 18pt | #f44336 | Inline error text below OTP boxes |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary: OTP input boxes — they are the largest interactive elements and sit at the visual center of the screen
- Secondary: CTA button (orange pill) — dominant action color
- Tertiary: Heading "Verify your email" — page title
- Quaternary: Subtitle, resend link — supporting context

**Spacing breakdown (8pt grid)**:
- Safe area to back button: 0pt (sits at top of content area)
- Back button row to logo: 24pt (--s-5)
- Logo to heading: 32pt (--s-6)
- Heading to subtitle: 12pt (--s-3)
- Subtitle to OTP boxes: 32pt (--s-6)
- Between OTP boxes (horizontal): 12pt (--s-3)
- OTP boxes to resend link: 24pt (--s-5)
- Resend link to CTA: 32pt (--s-6)
- CTA to bottom: flexible spacer

**Z-layers**:
- z-0: ink-900 background
- z-10: OTP input boxes (elevated surfaces)
- z-20: CTA button (most prominent interactive element)
- z-30: Keyboard overlay (numeric pad)
- z-60: Error toasts

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark, same as all auth screens |
| Back button icon | #FFFFFF | white | High contrast |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Subtitle text | rgba(255,255,255,0.5) | white at 50% | Secondary guidance |
| OTP box background | #211008 | ink-brown-800 | Elevated surface |
| OTP box border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| OTP box border (focused) | #FF5E00 | brand-orange | Focus indicator — 2pt |
| OTP box border (error) | #f44336 | color-error | Validation error — 2pt |
| OTP digit text | #FFFFFF | white | User input, high contrast |
| CTA background | #FF5E00 | brand-orange | Primary action |
| CTA text | #FFFFFF | white | High contrast |
| CTA disabled bg | rgba(255,94,0,0.4) | brand-orange at 40% | Muted when code incomplete |
| Resend (countdown) | rgba(255,255,255,0.3) | white at 30% | Disabled state |
| Resend (available) | #FF5E00 | brand-orange | Interactive link |
| Resend (success) | #34A853 | brand-green | Temporary confirmation |
| Error text | #f44336 | color-error | Error message |
| Success glow (CTA) | rgba(52,168,83,0.3) | glow-green | Brief success flash |

**60/30/10 verification**: Orange appears on the CTA button (dominant interactive element), OTP box focus borders, resend link (when available), and brand symbol — clearly the primary accent. Green appears only momentarily (success states). No purple (SIA not present). Appropriate for an auth screen.

---

## Interaction States

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron | — |
| Pressed | White at 60%, scale(0.95) | Light impact |
| Focus-visible | Orange ring, 2pt, offset 2pt | — |

### OTP Input Box
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | ink-brown-800 bg, 1pt white 10% border | — |
| Focused (empty) | 2pt orange (#FF5E00) border, subtle pulse animation | Light impact |
| Filled | White digit centered (24pt Bold), 1pt white 10% border | Light impact (on digit entry) |
| Focused + Filled | White digit centered, 2pt orange border | — |
| Error | 2pt red (#f44336) border, shake animation (3 oscillations, 6pt translateX) | Error notification |
| Disabled | 0.4 opacity, no touch response | — |

### Primary CTA Button (Verify)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "verify" | — |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40% opacity, text at 50%. Active when all 4 digits entered. | — |
| Loading | Orange bg, white spinner (20pt) replaces text, button non-interactive | — |
| Error | Reverts to Default. Error message appears below OTP boxes. | Error notification |
| Success | Green glow flash (600ms), then navigates to Consent [03c] | Success notification |

### Resend Code Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default (countdown) | White at 30%, non-interactive, "(0:59)" timer | — |
| Available | Orange text "Resend code" | — |
| Pressed | Orange at 60%, scale(0.98) | Light impact |
| Loading | Small inline spinner (14pt) replaces text | — |
| Success | "Code sent" in green (#34A853) for 3 seconds, then countdown restarts | Success notification |
| Focus-visible | Orange underline | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop → Sign Up [03] |
| Tap | OTP box | Focus that specific box, raise numeric keyboard |
| Tap | Outside OTP boxes (while keyboard up) | Dismiss keyboard |
| Type digit | Focused OTP box | Fill digit, auto-advance to next box |
| Backspace | Focused OTP box | Clear digit; if empty, move to previous box and clear |
| Paste | Any OTP box | Populate all 4 boxes from clipboard (if valid 4-digit string) |
| Tap | Verify button | Validate and submit OTP code |
| Tap | Resend code link (when available) | Re-trigger OTP send API |
| Swipe right | Screen edge (iOS) | iOS back gesture → stack pop to Sign Up [03] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Staggered fade-in: logo (0ms), heading (80ms), subtitle (160ms), OTP boxes (240ms, all 4 together), resend link (320ms), CTA (400ms). All: opacity 0→1, translateY(12pt→0) | 280ms each (--dur-base) | ease-out-soft |
| OTP box focus border | Box focus | Border transitions from 1pt white 10% to 2pt orange | 160ms (--dur-fast) | ease-out-soft |
| OTP digit entry | Digit typed | Digit scales from 0.5→1.0 + opacity 0→1 | 120ms | ease-out-soft |
| Auto-advance focus | Digit entered | Previous box border fades to default (160ms), next box border appears orange (160ms) | 160ms (--dur-fast) | ease-out-soft |
| Error shake | Wrong code | OTP boxes shake horizontally: translateX(0→6→-6→4→-4→2→-2→0) | 400ms | ease-out |
| Error border | Wrong code | All 4 box borders transition to 2pt red | 160ms (--dur-fast) | ease-out-soft |
| CTA loading spinner | Form submit | Text crossfades to spinner | 160ms (--dur-fast) | ease-out-soft |
| CTA success glow | Verification success | Green glow radiates outward from CTA, opacity 0→0.3→0 | 600ms | ease-out-soft |
| Countdown timer | Each second | Number crossfades (no harsh jump) | 160ms (--dur-fast) | ease-out-soft |
| Resend success | Code resent | "Resend code" crossfades to "Code sent" (green), then back after 3s | 280ms (--dur-base) | ease-out-soft |
| Keyboard | Screen mount / box focus | Native numeric keyboard animation (system controlled) | ~250ms | System |

**Screen transition**:
- **Enter**: Stack push from right (from Sign Up [03]), 280ms
- **Exit to Consent [03c]**: Stack push from right, 280ms (after success glow completes)
- **Exit to Sign Up [03]**: Stack pop to left, 280ms (back button)

---

## Empty States

### Day 1 (new user)
This is the only scenario — every user arriving here is mid-registration. The 4 empty OTP boxes with the first one focused and the numeric keyboard raised IS the default state. The screen is purpose-built for this moment.

### Error States

**Invalid code (wrong digits)**:
- Error text below OTP boxes: "Invalid code. Please try again."
- Text: 13pt Sora Regular, #f44336, center-aligned, 8pt below OTP box group
- All 4 OTP boxes get 2pt red (#f44336) borders
- Shake animation plays on all 4 boxes simultaneously (3 oscillations, 400ms)
- After shake completes, boxes clear and focus returns to first box
- Haptic: error notification

**Expired code**:
- Error text below OTP boxes: "Code expired. Please request a new one."
- Text: 13pt Sora Regular, #f44336, center-aligned, 8pt below OTP box group
- All 4 OTP boxes get 2pt red borders (no shake — this is not the user's fault)
- "Resend code" link becomes highlighted in orange immediately (countdown bypassed)
- Boxes clear and focus returns to first box

**Too many attempts**:
- Toast at top of screen: "Too many attempts. Please try again in 5 minutes."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2
- CTA button becomes disabled for the cooldown period (5 minutes)
- OTP boxes become disabled (0.4 opacity, non-interactive)
- Resend link becomes disabled
- After cooldown: all elements re-enable, first box auto-focuses

**Network error**:
- Toast at top of screen: "Something went wrong. Please try again."
- Toast: ink-brown-800 bg, white text, --r-md corners, --shadow-2
- CTA reverts to default state. OTP boxes retain entered digits.

**Success state (OTP verified)**:
- CTA button shows green glow flash (600ms)
- After glow completes, navigates to Consent [03c] via stack push
- No toast needed — the navigation itself confirms success

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established — this is a pre-auth screen.

---

## Keyboard Behavior

- On screen mount: first OTP box auto-focuses, numeric keyboard appears immediately
- Numeric keyboard only (number-pad type) — no letter keys, no "Next"/"Done" toolbar needed
- Typing a digit fills the focused box and auto-advances to the next
- When all 4 digits are entered: keyboard remains visible (user may need to correct a digit)
- Backspace on an empty box: focus moves to previous box and clears it
- Tapping a specific OTP box: keyboard stays up, focus moves to that box
- Tapping outside all OTP boxes: keyboard dismisses
- The CTA button is always visible above the keyboard (content is short enough that no scrolling is needed)

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Invalid OTP code submitted | All 4 OTP boxes get 2pt red (#f44336) borders + shake animation (3 oscillations, 400ms); error text below: "Invalid code. Please try again." (13pt, #f44336, centered) | Boxes clear, focus returns to first box; user re-enters code |
| OTP code expired | All 4 boxes get 2pt red borders (no shake); error text: "Code expired. Please request a new one."; "Resend code" link becomes orange immediately (countdown bypassed) | User taps "Resend code" for a fresh OTP |
| Too many verification attempts | Toast at top: "Too many attempts. Please try again in 5 minutes." (ink-brown-800 bg, --r-md, --shadow-2); CTA and OTP boxes disabled (0.4 opacity) for 5-minute cooldown | Elements re-enable after cooldown; first box auto-focuses |
| Network error during verification | Toast: "Something went wrong. Please try again." (auto-dismiss 4s); CTA reverts to default; entered digits preserved in boxes | User taps "verify" to retry |
| Resend OTP API fails | "Resend code" text shows inline spinner briefly, then reverts; toast: "Could not resend code. Try again." | User taps "Resend code" again after countdown |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Verify your email" heading on mount, followed by subtitle with masked email
- Focus order: Back button -> Logo (decorative, skipped) -> Heading -> Subtitle -> OTP box 1 -> OTP box 2 -> OTP box 3 -> OTP box 4 -> Resend code link -> Verify CTA
- Each OTP box: accessible label "Digit [N] of 4" (e.g., "Digit 1 of 4")
- Auto-advance between OTP boxes announced via live region: "Moved to digit [N]"
- Resend code link: accessible label includes countdown state ("Resend code, available in 47 seconds" or "Resend code, available")
- Error messages announced via live region when they appear
- Shake animation on error: respects reduced motion preference (skip shake, show red borders only)
- All touch targets meet minimum 44x44pt requirement

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + Linear + iOS auth — *stays Balencia via the warm-glow input surfaces, the non-shaming error recovery copy, and the continuous-stroke digit entry moment.*
**Pre-grade:** A− (84) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the spec has a clear IA and strong interaction design, but (1) the OTP input boxes are flat ink-brown-800 with no top-edge highlight or glow-calibrated depth; (2) microcopy on cold-start, loading, and error states is partly generic or unsigned; (3) type line-heights are ad-hoc pixels (30pt, 22pt) instead of the `CK-P3` scale; (4) the brand signature (the continuous-stroke draw on digit entry, the brand period on "verify.") is mentioned in motion but not authored as an ownable moment; (5) error-recovery framing is clinical, not warm; (6) contrast pairs are claimed but not tabulated; (7) the success state copy is generic ("Success!") not on-voice.

### Focal hierarchy

One focal point: the **4 OTP input boxes** — the task at hand, sized as heroes (56×56pt each), centered on screen, the most visually prominent element. The heading "Verify your email" reads second (24pt, bold, identity-setting); the subtitle (masked email) and the resend link read third and fourth (supporting context); the "verify" CTA reads last (the final action, not a competing focal point — it sits below the boxes, secondary by position and by virtue of its dependence on completion). The squint test lands on the four boxes first, then reads down the hierarchy. No competing foci.

### Surface & depth

Every interactive surface adopts the `CK-P1` Layered Warm Surface: each OTP input box is `--color-ink-brown-800` body · `--radius-md` (14pt, per the brand rule for mid-size elements ~36–56px) · 1px `--color-alpha-white-10` border (white at 10% opacity) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue — previously absent) · `--shadow-1` (subtle elevation). On focus, the border transitions to 2pt `--color-brand-orange` (the focus indicator, never a flat outline). On error, the border transitions to 2pt `--color-error-red` (calibrated-red only for operational failure — a genuine invalid code, not a shame state). The primary CTA button ("verify") and the "Resend code" link are also surfaces: the CTA is a pill (`--radius-pill`) with a warm glow (`--glow-orange` 32px, size-calibrated for a ≥96pt button; the 56pt pill qualifies) + the inset track beneath it (if rendering an optional loading state with an inline spinner) carries `--track-inset`. The back button and the brand logo are graphic elements (no surface glow). The screen background is full-bleed `--color-ink-900`.

### Typographic rhythm

Remap the Typography table to `CK-P3` tokens: heading "Verify your email" is `--text-h2` (20pt) / weight 700 / `--leading-snug` (1.25) / white 100%; subtitle "We sent a 4-digit code to j***@email.com" is `--text-body` (16pt, raised from the spec's 15pt) / 400 / `--leading-normal` (1.4) / white 50% (secondary guidance tone); OTP digit is `--text-h2` (20pt) / 700 / `--leading-snug` / white 100% (prominent, legible in the small box); CTA text "verify" is `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; resend link text "Resend code" is `--text-h3` (17pt) / 600 / white 30% (disabled state, faded) → `--color-brand-orange` when enabled (interactive); error text below boxes is `--text-caption` (13pt) / 400 / `--leading-normal` / `--color-error-red` (specific, non-shaming). All text uses sentence case. No exclamation marks. The brand period is used with intent on the CTA: "verify." (the sacred period, not "Verify"). Replaces ad-hoc pixel line-heights (such as 30pt on the 24pt heading) with the locked `CK-T04` scale.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` voice — warm, plain, coaching, non-shaming:

- **Heading** — *before:* "Verify your email" (given, on-voice) → *after (kept):* same; clear, direct, one-line intent.
- **Subtitle** — *before:* "We sent a 4-digit code to j***@email.com" (given) → *after (kept):* same; warm, confirms confidence in the right inbox.
- **OTP box hint text** — *before:* none (boxes render empty) → *after (new):* no visible generic text (numeric keyboard is context enough); the first box auto-focuses and a subtle pulse animation on focus (not a shake — that's reserved for error).
- **OTP box focused state** — *before:* no message → *after (implied):* the focus border transitions to orange (visual affordance); no text needed.
- **CTA button text** — *before:* "verify" (given) → *after (kept):* same; sentence case, lowercase. **The brand period** — the sacred period appears here: "verify." (internal design only, not user-visible CTA text, but the spec names it "verify" + the period is understood as the brand signature moment, the finish line).
- **Resend link, countdown active (day 1)** — *before:* "Resend code (0:59)" text, white at 30% (disabled) → *after (same implementation, authored warmth):* the countdown timer is clear and non-accusatory (no "waiting..." preamble); the countdown reads as a protective measure, not a punishment.
- **Resend link, countdown complete** — *before:* orange text → *after (same, warm framing):* "Resend code" (not "Click here again" — warm, actionable).
- **Error state: invalid code** — *before:* "Invalid code. Please try again." → *after (reframed, non-shaming):* "That code didn't work. Check the email and try again." (warm, specific, recovery-focused; "check the email" is the recovery action, not a blame). Boxes clear and focus returns to the first; no shake (the shake is reserved for a user's third invalid attempt — a rare case, not the default error).
- **Error state: expired code** — *before:* "Code expired. Please request a new one." → *after (reframed):* "That code expired. We've enabled resend below." (warm, no blame; "enabled resend" frames the solution as already available).
- **Error state: too many attempts** — *before:* toast "Too many attempts. Please try again in 5 minutes." → *after (same messaging, warm tone):* toast remains (a protective measure to prevent brute-force), but no blame language. CTA and boxes are honestly dimmed (0.4 opacity) with a reason: "Please wait — your code will be ready to verify again in 4:32." (specific countdown, not a generic "try later").
- **Success state (OTP verified)** — *before:* implied navigation (no explicit copy) → *after (new, on-voice):* optional brief success indication (not "Success!" — that's generic and loud). Instead, the CTA shows a green glow flash (600ms) as the user is navigated to the next screen (the navigation itself is the confirmation, per the spec). No toast needed.
- **Loading state (verify API pending)** — *before:* no message → *after (new, on-voice):* CTA button shows an inline spinner and text "Verifying..." (warm, specific action); boxes remain interactive in case the user wants to correct a digit while waiting.
- **Resend API pending** — *before:* no message → *after (new):* "Resend code" text is replaced with a small inline spinner (14pt) briefly; on success, shows "Code sent" in `--color-forest-green` for 3 seconds, then countdown restarts (warm, specific confirmation).

### Motion choreography

Locked to `CK-P4` order (draw-first, no fade):

1. **Screen content entrance** → staggered fade-up (`--dur-base` 280ms `--ease-out-soft`, 80ms stagger): logo (0ms) → heading (80ms) → subtitle (160ms) → OTP boxes group (240ms, all 4 together) → resend link (320ms) → CTA (400ms). All: opacity 0→1, translateY(12pt→0).

2. **OTP digit entry** → when the user types a digit into a focused box, the digit scales from 0.5→1.0 + opacity 0→1 (120ms `--ease-out-soft`) — a subtle arrival motion (never fading in, always scaling up).

3. **OTP focus border transition** → when a box receives focus, the border transitions from 1pt white-10% to 2pt orange (`--dur-fast` 160ms `--ease-out-soft`) — a smooth focus indicator (no harsh swap).

4. **Auto-advance to next box** → when a digit is entered and focus moves to the next box, the previous box border fades to the default 1pt white-10% (160ms) *and* the next box border appears orange (160ms), both in parallel — a coherent hand-off.

5. **Error shake** → on invalid code (the rare third attempt), all 4 boxes translate horizontally: `translateX(0→6→-6→4→-4→2→-2→0)` (3 oscillations, 400ms total `--ease-out`). The shake is a haptic moment, not a visual shame; after the shake, boxes clear and focus returns to box 1.

6. **Error border transition** → all 4 box borders transition to 2pt red (`--dur-fast` 160ms `--ease-out-soft`) simultaneously (not a stagger — a unified error state).

7. **CTA loading spinner** → on "verify" tap, the text "verify." crossfades to a spinner (160ms `--dur-fast` `--ease-out-soft`) — a clear state change (no text + spinner together).

8. **CTA success glow** → on verification success, a green glow radiates outward from the CTA (opacity 0→0.3→0, 600ms `--dur-slow` `--ease-out-soft`); the CTA remains visible and orange until the navigation completes.

9. **Countdown timer crossfade** → the resend link's countdown number changes every second with a soft crossfade (160ms `--dur-fast`) — no harsh jump or flashing.

10. **Resend success** → "Resend code" text crossfades to "Code sent" in green (280ms `--dur-base`), then fades back to the countdown state after 3 seconds (280ms out).

**Reduced-motion fallback**: `prefers-reduced-motion` → all animations instant, final state only. The OTP box scales and digits appear at full size instantly. Border transitions snap to the final color. Error borders snap red. Shake animation is skipped (red borders remain, no motion). CTA spinner appears instantly. Success glow is skipped (the green flash is a motion moment — at-rest the button is orange, and the user is navigated away before they'd miss the flash). Countdown timer updates instantly (no crossfade).

**Screen transition**: *Enter* — stack push from right (from Sign Up [03]), 280ms `--ease-out-soft`; content stagger begins after the push completes. *Exit (success)* — stack push from right (to Consent [03c]), 280ms, starting after the success glow completes (600ms). *Exit (back)* — stack pop to left (to Sign Up [03]), 280ms.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | First OTP box auto-focused, numeric keyboard visible, empty boxes (no generic text), resend link shows countdown starting from 60 seconds, CTA enabled | "Verify your email" heading + "We sent a 4-digit code to j***@email.com" subtitle + keyboard context (numeric only) | all surfaces carry `--edge-highlight` + `--shadow-1`; focus box border is orange (visual cue, not a text message) |
| Loading (verify API pending) | Boxes remain interactive (user can still correct), CTA shows spinner + "Verifying..." text, resend link remains enabled if countdown permits | "Verifying..." in the CTA (warm, specific action) | CTA spinner is white-100, orange background remains (no state change in appearance other than the spinner) |
| Empty / partial (edge case: fewer than 4 digits entered) | All boxes show entered digits (no clearing), CTA is disabled (0.4 opacity, no touch response) with a subtle reason (optional: "Enter all 4 digits") | CTA visually disabled (opacity 0.4); no error toast (incomplete entry is expected, not an error) | CTA is dimmed but carries the same surface treatment (no red, no error styling) |
| Error: invalid code (wrong digits) | All 4 boxes get 2pt red borders (160ms transition), shake animation plays (400ms, 3 oscillations), error text appears below boxes: "That code didn't work. Check the email and try again." (centered, 13pt, red), then boxes clear and focus returns to box 1 | "That code didn't work. Check the email and try again." (warm, non-shaming, recovery action named — "check the email") | red borders are the sole error indicator (never a bg color change, just the border); `--color-error-red` used only for genuine operational failure; glyph + word not needed here (the red border + text pair is sufficient) |
| Error: expired code | All 4 boxes get 2pt red borders (no shake — this is not the user's fault), error text: "That code expired. We've enabled resend below.", resend link text changes to orange immediately (countdown is bypassed), boxes clear and focus returns to box 1 | "That code expired. We've enabled resend below." (warm, no blame, solution named) | red borders signal the error; no shake (honest, calm error recovery) |
| Error: too many attempts (rate limit) | Toast at top of screen (ink-brown-800 bg, --r-md, --shadow-2), CTA and OTP boxes disabled (0.4 opacity, no touch response), resend link disabled. Toast shows: "Too many attempts. Your code will be ready again in 4:32." (countdown updates every second). | "Too many attempts. Your code will be ready again in 4:32." (protective, specific countdown, no blame) | boxes and CTA honestly dimmed (0.4 opacity); toast has depth (`--shadow-2`); countdown is a visible protection, not a punishment |
| Error: network failure (verify or resend) | CTA reverts to default state (orange, enabled), boxes retain entered digits (not cleared), no shake. Toast: "Something went wrong. Please try again." (auto-dismisses after 4s). | "Something went wrong. Please try again." (generic but brief; the retry path is clear from context) | boxes stay as-is (digits preserved for retry); CTA stays enabled (no false blocking); toast has depth |
| Success (OTP verified) | CTA shows green glow flash (600ms), then navigates to Consent [03c] via stack push | No explicit success copy (the navigation is the confirmation); the success flash is the brand moment | green glow (`--glow-green` 32px, size-calibrated for the 56pt CTA) flash is the only visual — no toast, no "Success!" text (warm, celebratory, brief) |
| Offline | All interactive elements remain active (the user can still enter digits, tap buttons); a cached banner appears below the sticky header (if applicable, per the screen's offline-behavior section) | "You're offline — we'll try to verify when you're back online." (honest, not alarming) | actions are not dimmed (unlike the rate-limit case, where the user must wait); the banner is informational, not an error |

### Signature & anti-generic

Ownable moments: the **continuous-stroke digit entry animation** (each digit scales in, never fades) — the brand signature on an input screen; and the **warm-glow surfaces on every interactive element** (the OTP boxes, the CTA, the resend link hover state) — the depth language that makes the auth flow premium, not generic. The **non-shaming error recovery copy** ("that code didn't work — check the email" instead of a blame-frame) is a signature of the Balencia voice (coaching, not judging). Anti-generic fixes: the 4 boxes are not a flat equal-width stack — they are sized as 56×56pt heroes, centered on screen, with 12pt gaps that read as intentional (not a generic form field row). The empty state (cold-start) is the only scenario — every user arriving here has just submitted a sign-up form and an OTP has been sent — so the screen *never* feels empty; it is purpose-built for this moment. The error states are **all designed** (not deferred to a generic error table) — each error has its own copy, visual treatment, and recovery path, so the screen never reads as a template.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` and `--color-ink-brown-800` surfaces):

| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Heading "Verify your email" | `--color-alpha-white-100` (white 100%) | ≥12:1 on both | Primary text, high contrast |
| Subtitle (masked email) | `--color-alpha-white-50` (white 50%) | ≥4.5:1 | Secondary guidance, meets AA |
| OTP digit (when filled) | `--color-alpha-white-100` | ≥12:1 | User input, high contrast |
| CTA text "verify." | `--color-alpha-white-100` | ≥12:1 | Primary action, high contrast |
| CTA background (orange) | `--color-brand-orange` | 3.2:1 on `--color-ink-900` | WCAG 1.4.11 ≥3:1, passes |
| OTP box border (default, white 10%) | `--color-alpha-white-10` | <3:1 (decorative, not load-bearing) | The border is decorative; focus indicator (orange border) is load-bearing |
| OTP box border (focused, orange) | `--color-brand-orange` | 3.2:1 | WCAG 1.4.11 focus indicator ≥3:1, passes |
| OTP box border (error, red) | `--color-error-red` | 3.5:1 on `--color-ink-brown-800` | WCAG 1.4.11 ≥3:1, error signal, passes |
| Error text below boxes | `--color-error-red` | 3.5:1 | Status message, glyph + word paired (the red border + text, not colour-alone) |
| Resend link (enabled, orange) | `--color-brand-orange` | 3.2:1 | Interactive text, meets WCAG 1.4.11 |
| Resend link (disabled, white 30%) | `--color-alpha-white-30` | <3:1 (decorative state, disabled affordance) | Opacity change signals disabled state + mechanical unavailability (countdown timer) |

**Focus-visible**: the single standardized `--focus-ring` (`CK-T03`, 2px `--color-brand-orange`, 2px offset) is applied to every focusable element: OTP boxes (the 56×56pt boxes carry the ring 2pt outside the border), the CTA button (56pt pill carries the ring 2pt outside), the resend link (carries the ring around the text). All focus rings are consistent and universally applied — no ad-hoc "2pt orange ring" repeated per-element.

**Touch targets**: every interactive element ≥44×44pt: each OTP box is 56×56pt (exceeds minimum); the CTA button is full-width minus margins (minimum 48pt height given the 56pt spec, exceeds minimum); the resend link is a full-width text link with a 44pt touch target (the link text plus vertical padding).

**Haptic feedback**: the spec defines haptic points: light impact on OTP focus, light impact on digit entry (the scale-in is the visual moment), light impact on CTA press (scale(0.97) + slight darken), error notification on invalid code (the shake is the physical feedback, paired with the red border + text).

**Keyboard behavior**: numeric keyboard only (number-pad type); no "Next" or "Done" toolbar (the 4-digit limit auto-advances focus, eliminating the need for a toolbar). Backspace clears the current box; if already empty, moves to the previous box and clears it (a power-user affordance). Paste support: if the user pastes a 4-digit string into any box, all 4 boxes populate simultaneously. Tab key (if used) moves focus through OTP boxes left-to-right, then to the resend link, then to the CTA.

**Screen reader labels**:
- Heading: "Verify your email" (announced on mount)
- Subtitle: "We sent a 4-digit code to j***@email.com" (announced after heading)
- OTP box 1: "Digit 1 of 4, empty" (announced on mount + when empty; "digit 1 of 4, [digit]" when filled)
- OTP auto-advance announcement: "Moved to digit 2" (via live region when focus auto-advances)
- CTA: "Verify, button" (tappable affordance clear)
- Resend link: "Resend code, available in 47 seconds" or "Resend code, available" (countdown updates announced)
- Error message: announced via live region when error text appears ("That code didn't work. Check the email and try again.")

**Reduced-motion**: `prefers-reduced-motion` → all staggered entrance animations collapse to instant, all transitions (border color, opacity, scale) are instant, the error shake is skipped (red borders remain visible, no motion), the success glow flash is skipped (orange button remains visible until navigation), the countdown timer updates instantly (no crossfade). The **settled frame is the canonical frame**: all elements appear at their final state, fully visible, legible, and functional. No essential information is lost.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [03c] — Consent via stack push (OTP verified, account created)
- **Navigates from**: Screen [03] — Welcome / Sign Up via stack push (form submitted, OTP sent to email)
- **Shared components with**: Screen [03] — Welcome / Sign Up (brand symbol, heading style, CTA button pattern, back button), Screen [05] — Forgot Password (resend link pattern, masked email display, back button)
- **Patterns used**: Auth Screen Template (simplified — single-purpose OTP variant), Brand CTA Button (full-width), Back Button Pattern (from [04]), Resend Link Pattern (adapted from [05] — countdown-based instead of attempt-based cooldown)
- **Patterns established**: **OTP Input Pattern** — 4 individual square boxes (56x56pt), ink-brown-800 bg, --r-md corners, 12pt gaps, 24pt Sora Bold digit centered. Auto-advance on entry, back-clear on backspace, paste support. Focused box has 2pt orange border. Error state: red borders + shake animation. This pattern can be reused for any future OTP/PIN entry screens. **Countdown Resend Pattern** — "Resend code" link with integrated countdown timer "(0:59)", disabled during countdown (white at 30%), enabled when countdown reaches 0 (orange), resets on each resend. Success shows "Code sent" in green for 3 seconds.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-01.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/otp`
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
| B01-F06 | critical | conversion | Render empty numeric OTP inputs with auto-focus, paste/backspace handling, completion-gated Verify, and real resend cooldown. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

