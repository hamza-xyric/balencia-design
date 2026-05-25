# Screen Design: Forgot Password

**Screen**: 05 of 43
**File**: 05-forgot-password.md
**Register**: Brand Mode
**Primary action**: Send password reset link (tap "send reset link")
**Tab**: None (pre-auth)
**Navigation**: Stack depth 2 (pushed from Sign In [04]). Back button present.

---

## Purpose

The forgot password screen is a single-purpose utility — enter your email, get a reset link. It must feel quick and reassuring, not punishing. The simplest screen in the auth flow: one input, one button, one outcome. After submission, a confirmation state replaces the form to confirm the email was sent and provide a clear path back to sign in.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Reset your password" heading — clear purpose
2. Instructional text — brief reassurance ("we'll send you a reset link")
3. Email input field — the single task
4. "send reset link" CTA — the action
5. Confirmation state (after submit) — "check your email" message + "back to sign in" link

**User flow**:
- **Arrives from**: Sign In [04] via stack push ("Forgot password?" link)
- **Primary exit**: Sign In [04] via stack pop (back button or "back to sign in" link after confirmation)
- **Secondary exits**: None

---

## Layout

**Scroll behavior**: None (fixed — content fits on all device sizes)
**Tab bar visible**: No

### ASCII Wireframe — Default State

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]                        │  ← back button, 44x44pt
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt
│         └───────┘           │
│                             │  ← 32pt gap
│   "Reset your password"     │  ← heading, center-aligned
│                             │  ← 12pt gap
│   "Enter your email and     │  ← instructional text
│    we'll send you a reset   │     center-aligned
│    link"                    │
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │  Email             │    │  ← single input field
│   └───────────────────┘    │
│                             │  ← 24pt gap
│   ┌───────────────────┐    │
│   │  send reset link   │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │
│                             │
│                             │
│                             │  ← generous empty space below
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### ASCII Wireframe — Confirmation State (after email sent)

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]                        │  ← back button
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt
│         └───────┘           │
│                             │  ← 32pt gap
│          ┌─────┐            │
│          │  ✓  │            │  ← green check circle, 56pt
│          └─────┘            │
│                             │  ← 24pt gap
│   "Check your email"        │  ← heading, center-aligned
│                             │  ← 12pt gap
│   "We sent a reset link to  │  ← instructional text
│    j***@email.com"          │     masked email shown
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │  back to sign in   │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │  ← 16pt gap
│   "Didn't receive it?       │
│    send again"              │  ← text link, center-aligned
│                             │
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack — Default State (top to bottom)

1. **Status Bar Zone** — 44pt

2. **Back Button Row** — 44pt
   - Content: Left chevron, same as Sign In [04]

3. **Logo Area** — 48pt + 24pt top + 32pt bottom = 104pt
   - Content: Balencia symbol, 48x48pt, centered

4. **Heading + Instruction** — 30pt + 12pt + ~40pt = ~82pt
   - Content: "Reset your password" heading + instructional subtext

5. **Email Input** — 32pt top margin + 52pt = 84pt
   - Content: Single email field

6. **CTA** — 24pt top margin + 56pt = 80pt
   - Content: "send reset link" pill button

7. **Lower Spacer** — flexible (fills remaining space)

8. **Home Indicator Zone** — 34pt

### Component Stack — Confirmation State (top to bottom)

1. **Status Bar Zone** — 44pt

2. **Back Button Row** — 44pt

3. **Logo Area** — 104pt

4. **Success Icon** — 32pt top margin + 56pt = 88pt
   - Content: Green circle with white checkmark

5. **Heading + Confirmation Text** — 24pt top margin + 30pt + 12pt + ~40pt = ~106pt
   - Content: "Check your email" + masked email confirmation

6. **Back to Sign In CTA** — 32pt top margin + 56pt = 88pt
   - Content: "back to sign in" orange pill button

7. **Resend Link** — 16pt top margin + 20pt = 36pt
   - Content: "Didn't receive it? send again" text link

8. **Lower Spacer** — flexible

9. **Home Indicator Zone** — 34pt

---

## Components

### Back Button
- **Purpose**: Return to Sign In [04]
- **Visual treatment**: Identical to Sign In [04] Back Button pattern
- **Size**: 44x44pt touch target

### Brand Symbol (Small)
- **Visual treatment**: Identical to Sign Up [03] and Sign In [04]
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Communicate screen intent
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned
- **Variants**:
  - Default state: "Reset your password"
  - Confirmation state: "Check your email"
- **Size**: Full-width - 48pt margins

### Instructional Text
- **Purpose**: Guide the user — set expectations before the input, confirm after submission
- **Data source**: Static (default) / partially dynamic (confirmation — shows masked email)
- **Visual treatment**: 15pt Sora Regular, white at 60%, center-aligned. Max 2 lines.
- **Variants**:
  - Default: "Enter your email and we'll send you a reset link"
  - Confirmation: "We sent a reset link to j***@email.com" (email partially masked — show first letter, mask middle, show domain)
- **Size**: Full-width - 48pt margins

### Email Input Field
- **Purpose**: Collect email for password reset
- **Visual treatment**: Identical to the Email field from Sign Up [03]
- **Variants**: Default, Focused, Filled, Error
- **Size**: (screen width - 48pt) x 52pt

### Primary CTA Button
- **Purpose**: Submit reset request / navigate back to sign in
- **Visual treatment**: Identical to Sign Up [03] CTA pattern
- **Variants**:
  - Default state: "send reset link" — orange pill
  - Confirmation state: "back to sign in" — orange pill (same visual, different text and action)
- **Size**: (screen width - 48pt) x 56pt

### Success Icon (Confirmation State Only)
- **Purpose**: Visual confirmation that the action succeeded
- **Data source**: State-driven (appears after successful API response)
- **Visual treatment**: Circle, 56pt diameter. Forest Green (#34A853) fill. White checkmark icon (24pt, 2pt stroke) centered inside. Subtle green glow: --glow-green at 50% intensity behind the circle.
- **Variants**: None (only appears in confirmation state)
- **Gestures**: None
- **Size**: 56x56pt

### Resend Link (Confirmation State Only)
- **Purpose**: Allow re-sending the reset email if it didn't arrive
- **Data source**: Triggers API call (same endpoint)
- **Visual treatment**: "Didn't receive it? send again" — context in white at 50%, "send again" in orange Semibold. Center-aligned.
- **Variants**:
  - Default: as described
  - After tap: "send again" replaced with "sent" in green for 3 seconds, then reverts
  - Cooldown: After 2 sends, "send again" becomes disabled (white at 30%) for 60 seconds
- **Gestures**: Tap "send again"
- **Size**: Full-width x 44pt touch target

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Back button icon | — | — | 20pt | — | White | Chevron |
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | Sentence case |
| Instructional text | Sora | 400 (Regular) | 15pt | 22pt | White at 60% | Center-aligned, max 2 lines |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "email address" |
| Input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | User-entered email |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "send reset link" / "back to sign in" |
| Resend context | Sora | 400 (Regular) | 15pt | 20pt | White at 50% | "Didn't receive it?" |
| Resend action | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "send again" |
| Resend success | Sora | 600 (Semibold) | 15pt | 20pt | #34A853 | "sent" (temporary) |

---

## Composition & Visual Hierarchy

**Squint test**:
- Default state: CTA button (orange pill) is the dominant element. Heading and input form a clear task unit.
- Confirmation state: Green success icon draws the eye first (new color in the flow — signals "done"). CTA button is the next action.

**Spacing**:
- Back button row: 0pt below safe area
- Back button to logo: 24pt (--s-5)
- Logo to heading: 32pt (--s-6)
- Heading to instructional text: 12pt (--s-3)
- Instructional text to input: 32pt (--s-6)
- Input to CTA: 24pt (--s-5)
- (Confirmation) Success icon to heading: 24pt (--s-5)
- (Confirmation) CTA to resend link: 16pt (--s-4)

**Z-layers**:
- z-0: ink-900 background
- z-10: Input field
- z-20: CTA button
- z-60: Error toasts

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Same as all auth screens |
| Back button | #FFFFFF | white | High contrast |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading | #FFFFFF | white | Primary text |
| Instructional text | rgba(255,255,255,0.6) | white at 60% | Secondary guidance |
| Input field | — | — | Same as Sign Up [03] |
| CTA button | #FF5E00 bg, #FFFFFF text | brand-orange, white | Primary action |
| Success circle | #34A853 | brand-green | Confirmation — 30% color rule |
| Success glow | rgba(52,168,83,0.2) | glow-green reduced | Atmospheric |
| Checkmark icon | #FFFFFF | white | Inside green circle |
| Resend "send again" | #FF5E00 | brand-orange | Interactive link |
| Resend "sent" | #34A853 | brand-green | Temporary success |

**60/30/10 verification**: Default state — orange only (CTA, symbol, link). Confirmation state introduces green (success icon, "sent" text) as the 30% secondary color, which is appropriate — green signals success/completion per the brand system. No purple on either state. Ratio holds.

---

## Interaction States

### Back Button
Same as Sign In [04].

### Email Input Field
Same 8-state model as Sign Up [03].

### Primary CTA Button (Send Reset Link)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, "send reset link" white text | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40%. Active when email field non-empty and valid format. | — |
| Loading | White spinner replaces text | — |
| Error | Reverts to default. Error appears below field. | Error notification |
| Success | Brief green glow (600ms), then transitions to confirmation state | Success notification |

### Primary CTA Button (Back to Sign In — Confirmation State)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, "back to sign in" white text | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Resend Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "send again" in orange | — |
| Pressed | Orange at 60%, scale(0.98) | Light impact |
| Loading | "send again" replaced with small inline spinner (14pt) | — |
| Success | "send again" replaced with "sent" in green for 3s | Success notification |
| Disabled (cooldown) | "send again" in white at 30%, non-interactive | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop → Sign In [04] |
| Tap | Email field | Focus field, raise keyboard |
| Tap | Send reset link button | Validate email format, submit API request |
| Tap | Back to sign in button (confirmation) | Stack pop → Sign In [04] |
| Tap | "send again" link (confirmation) | Re-trigger reset email API |
| Swipe right | Screen edge (iOS) | iOS back gesture → stack pop to Sign In [04] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Staggered fade-in (same as auth screens) | 280ms each | ease-out-soft |
| Default → Confirmation | API success | Crossfade: form content fades out (280ms), confirmation content fades in (280ms, 160ms delay). Success icon scales from 0.5→1.0 with bounce. | 520ms total | ease-flow (icon), ease-out-soft (crossfade) |
| Success icon | Confirmation enter | Scale(0.5→1.0) + fade-in, with slight overshoot | 520ms (--dur-slow) | ease-flow |
| Green glow | Confirmation enter | Fade in, 200ms delay after icon | 280ms | ease-out-soft |
| "sent" text | Resend success | Crossfade "send again" → "sent" + color change | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (from Sign In)
- **Exit**: Stack pop to left (back to Sign In)

---

## Empty States

### Day 1 (new user)
Users arrive here only if they've signed up previously and forgotten their password. The empty input with placeholder is the default and expected state.

### Error States

**Email not found**:
- Error text below email field: "No account found with this email address."
- 13pt Sora Regular, #f44336, left-aligned, 4pt below field
- Input gets 2pt red border

**Invalid email format**:
- Error text: "Please enter a valid email address."
- Same styling as above

**Network error**:
- Toast at top: "Something went wrong. Please try again."

**Rate limited**:
- Toast at top: "Too many requests. Please wait a few minutes."

---

## Motivation Adaptation

Not applicable. Pre-auth screen.

---

## Accessibility

- Back button: accessibility label "Go back to sign in"
- Heading: standard text, read by screen reader
- Instructional text: standard text, read after heading
- Email input: accessibility label "Email address for password reset"
- CTA: accessibility label matches button text
- Success icon: accessibility label "Success. Password reset link sent."
- Confirmation state: screen reader announces "Check your email. We sent a reset link to [masked email]."

---

## Cross-References

- **Navigates to**: Screen [04] — Sign In via stack pop (back button or "back to sign in" CTA)
- **Navigates from**: Screen [04] — Sign In via stack push ("Forgot password?" link)
- **Shared components with**: Screen [03] — Welcome / Sign Up (email input, CTA button), Screen [04] — Sign In (back button, email input, CTA button)
- **Patterns used**: Auth Screen Template (simplified — single input variant), Text Input Field Pattern, Brand CTA Button, Back Button Pattern
- **Patterns established**: **Confirmation State Pattern** — form-to-confirmation crossfade within the same screen. Green success icon (56pt circle, #34A853, white checkmark) + heading change + CTA change. Used when a form submission results in a "check your email/phone" confirmation. **Resend Link Pattern** — "Didn't receive it? send again" with tap → "sent" green confirmation text (3s) → cooldown after 2 sends.
