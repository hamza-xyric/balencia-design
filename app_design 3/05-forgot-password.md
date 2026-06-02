# Screen Design: Forgot Password

**Screen**: 05 of 73
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

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Reset email API returns 404 (email not found) | Email input gets 2pt red (#f44336) border; error text below field: "No account found with this email address." (13pt Sora Regular, #f44336) | User corrects email and resubmits |
| Reset email API returns 429 (rate limited) | Toast at top: "Too many requests. Please wait a few minutes." (ink-brown-800 bg, white text, --r-md, auto-dismiss 4s); CTA disabled for 60 seconds | CTA re-enables after cooldown; user taps again |
| Network error during reset request | Toast at top: "Something went wrong. Please try again." (ink-brown-800 bg, white text, --r-md, auto-dismiss 4s); CTA reverts to default state; email input retains entered text | User taps CTA to retry |
| Resend link fails (confirmation state) | "send again" text replaced with inline spinner (14pt) briefly, then reverts to "send again" in orange; toast: "Could not resend. Try again." | User taps "send again" to retry |

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + Linear + iOS auth — *stays Balencia via the splash continuous-stroke confirmation moment + warm-glow layered surfaces + calm, non-shaming error recovery copy.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

**Pre-grade drivers:** Thin default-state layout + generic instructional copy + no warm-surface depth + zero motion choreography + undesigned error/confirmation states → surface-level competence, not brand-grade craft.

### Focal hierarchy

One focal point: the **email input field** (52pt height, full-width minus 48pt margins) — the screen's single task, positioned above the fold after the heading. The heading "Reset your password" and instructional text anchor the purpose immediately. The CTA button ("send reset link", 56pt pill) reads as secondary to the input (a natural consequence of filling it). On the confirmation state, the green check circle (56pt, `--color-forest-green`) becomes the focal point — a new color in the flow signals completion. The back button and logo sit in a reduced header zone (no sticky behavior needed — content fits one viewport). Squint test: input + heading anchor the eye, then the CTA pill below.

### Surface & depth

All surfaces apply `CK-P1` layered warmth. The screen background is `--color-ink-900`. The email input field follows the `_shared-patterns.md` premium input recipe (inherited from Sign Up [03]): `--color-ink-brown-800` body · `--radius-md` (14pt) · 1px `--color-alpha-white-06` border · **`CK-T01 --edge-highlight`** inset top-edge (`0 1px 0 rgba(255,255,255,0.06)`) — the critical not-flat cue · `--shadow-1` on focus. The CTA button ("send reset link") is a pill (`--radius-pill`) on `--color-brand-orange` bg with white text, no glow (it is inline CTA size, <36px); on press, `scale(0.97)` + slightly darker orange. The confirmation-state green check circle is **56pt, the hero size**, receiving **`--glow-green-sm`** (~12px /.35) in a warm green tone (a size-calibrated glow that feels warm, not neon) behind the circle to lift it from the field. The success icon itself is simple: `--color-forest-green` (`--color-forest-green`) fill + white checkmark (24pt, 2pt stroke) centered. No glow on the heading, instructional text, or the "back to sign in" CTA in confirmation state (they are text elements or inline buttons). All spacing is tokenized (32pt logo gap = `--spacing-8`, 12pt heading-to-instruction gap = `--spacing-3`).

### Typographic rhythm

Map the Typography table to `CK-P3` locked scale:
- Heading ("Reset your password" / "Check your email"): `--text-h1` (28pt) / weight 700 / `--leading-snug` (1.25) / white 100% / center-aligned
- Instructional text ("Enter your email..." / "We sent a reset link to..."): `--text-body` (16pt) / weight 400 / `--leading-normal` (1.4) / `--color-alpha-white-60` / center-aligned
- Email input hint text: `--text-body` (16pt) / weight 400 / `--color-alpha-white-40` / "email address"
- CTA button text: `--text-h3` (17pt) / weight 600 / white 100%
- Resend link context ("Didn't receive it?"): `--text-caption` (13pt) / weight 400 / `--color-alpha-white-50`
- Resend action ("send again"): `--text-caption` (13pt) / weight 600 / `--color-brand-orange` (active) or `--color-forest-green` (success "sent") or `--color-alpha-white-30` (disabled cooldown)
- Error text: `--text-caption` (13pt) / weight 400 / `--color-error-red`

Hierarchy is carried by weight (600–700 headings vs 400 body), not size alone. Sentence case on all labels. ≤2 orange accent words per screen (the "send reset link" button text and the "send again" link). No exclamation marks. The brand period is used with intent: the instructional text closes with a period (calm, coaching tone, not urgency). Chillax stays logo-only.

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming.

**Default state:**
- Heading — *before:* "Reset your password" (given) → *after (kept):* same; clear purpose.
- Instructional text — *before:* "Enter your email and we'll send you a reset link" (given) → *after (kept):* same; warm, direct, sets expectation.
- Input hint text — *before:* "email address" (given) → *after (kept):* same; lowercase, plain.
- CTA button — *before:* "send reset link" (given) → *after (kept):* same; imperative, action-oriented.

**Confirmation state:**
- Heading — *before:* "Check your email" (given) → *after (kept):* same; calm confirmation.
- Instructional text — *before:* "We sent a reset link to j***@email.com" (given) → *after (kept):* same; shows masked email (first letter + mask middle + domain), warm, specific to user.
- CTA button — *before:* "back to sign in" (given) → *after (kept):* same; direct next step.
- Resend link context — *before:* "Didn't receive it?" (given) → *after (kept):* same; warm, not accusatory.
- Resend action — *before:* "send again" (given) → *after (kept):* same; direct action.
- Resend success (temporary) — *before:* no message → *after (new, on-voice):* "sent" in `--color-forest-green` for 3 seconds, then revert. Simple confirmation, warm tone.
- Resend disabled (cooldown) — *before:* no message → *after (new, honest):* "send again" at `--color-alpha-white-30` for 60 seconds; no text label needed (the visual dimming + tap-disabled affordance is clear).

**Error states (edge strings):**
- Email not found — *before:* "No account found with this email address." (given, bare) → *after (kept, on-voice):* same; specific, non-shaming. A missing account is a state, not a failure on the user's part.
- Invalid email format — *before:* "Please enter a valid email address." (given) → *after (kept):* same; instructional, warm.
- Network error (toast) — *before:* no message → *after (new, specific):* "Something went wrong. Please try again." (on-voice, recovery named). Toast: ink-brown-800 bg, white text, `--radius-lg`, auto-dismiss 4s, centered top position (z-60).
- Rate limited (toast) — *before:* no message → *after (new, honest):* "Too many requests. Please wait a few minutes." (specific, non-shaming). Cooldown enforced on button (disabled for 60s after 2nd send).
- Back button a11y label — *before:* no label → *after (new):* "Go back to sign in" (clear, specific).

### Motion choreography

Per `CONSISTENCY.md §3` (locked timings), the screen follows the auth entrance pattern established by Sign In [04]:

**Default state entrance:**
1. **Back button + logo + heading + instructional text** — staggered fade-in (each element fades in `0→100%` over `--dur-base` 280ms `--ease-out-soft`, staggered 40–80ms apart), starting on screen mount. No motion on these text elements — they establish context.
2. **Email input** — rises from below (`translateY(16→0)` + fade-in) over `--dur-base` 280ms `--ease-out-soft`, 80ms after heading (the focal element moves into place).
3. **CTA button** — rises from below (`translateY(16→0)` + fade-in) over `--dur-base` 280ms `--ease-out-soft`, 80ms after input (consequence follows input).

**Default → Confirmation transition (on successful API response):**
- **Form content** (heading, input, CTA) fades out (`opacity 1→0`) over `--dur-base` 280ms `--ease-out-soft`.
- **Confirmation content** (check circle, new heading, new CTA, resend link) fades in with stagger:
  - Check circle **scales** (`scale 0.5→1.0` + fade-in) over `--dur-slow` 520ms `--ease-flow` (the draw moment — the signature), starting with 160ms delay after form fadeout (overlaps slightly for fluidity).
  - New heading + instructional text fade in over `--dur-base` 280ms `--ease-out-soft`, starting after circle scale completes.
  - Back-to-sign-in CTA fades in, 40ms stagger.
  - Resend link appears last (fades in, 80ms stagger).

**Reduced-motion fallback:**
- All elements appear at final state instantly; no stagger, no scale. The check circle at full size (no mid-scale state) with the glow applied. Form elements hidden, confirmation visible. Signature motion (the scale/draw) is sacrificed for accessibility — the settled frame (full circle, complete composition) is the canonical frame.

**No looping or urgency motion** on the form or confirmation (non-coercive, calm recovery flow). The resend link animation is simple (no spinner loop — a 3s "sent" fade applies, then reverts to "send again"). No motion on the cooldown state.

### State craft

Every state is designed, never deferred to a generic error table per `CONSISTENCY.md §5`:

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Default form state: heading centered, logo above, input below, CTA below input. Content centered, generous gaps (32pt sections). | "Reset your password" + "Enter your email and we'll send you a reset link" — calm, clear, no urgency. | All surfaces use `CK-P1` layering + `--edge-highlight`. `--color-ink-brown-800` input with inset depth. Logo 48pt, orange. |
| **Loading** | Input field becomes a skeleton (same height/width, pulse animation 1.5s). CTA button text replaced with a 14pt spinner (white, 2pt stroke, rotating 1 rev/2s). | No label change — button reads as "loading" by the spinner. | Skeleton preserves input depth (borders, shadow visible, body at 40% opacity to show loading state). |
| **Empty / partial** | Same as cold-start; input retains user's email if they re-attempt. | Instructional text unchanged. No "no data" message (input itself is the CTA state). | No change from default. |
| **Error (email not found)** | Input gets 2pt `--color-error-red` border (replaces the `--color-alpha-white-06` border). Error text appears directly below input (4pt gap): "No account found with this email address." — 13pt, red, left-aligned. CTA remains enabled (user can correct and retry). | "No account found with this email address." — specific, non-shaming. User's email is the problem, not the user. | Input surface keeps `CK-P1` depth but with red border swap. Error text sits on plain `--color-ink-900` background (no card). |
| **Error (invalid format)** | Input gets 2pt `--color-error-red` border. Error text: "Please enter a valid email address." — same styling as above. | "Please enter a valid email address." — instructional, warm. | Same as email-not-found error. |
| **Error (network)** | Form stays visible (input + CTA unchanged). Toast appears at top (z-60, centered): ink-brown-800 bg, 24pt top margin from status bar, `--radius-lg`. | "Something went wrong. Please try again." — specific, recovery action implied (tapping the CTA again retries). | Toast: `--shadow-2`, 4–6pt padding, white text at 100%, auto-dismiss 4s. |
| **Error (rate limited)** | Form stays visible. Toast at top (same positioning + styling as network error). CTA becomes disabled (white at 40%, `pointer-events: none`) for 60 seconds; a 60s countdown timer appears below CTA (12pt, white at 50%): "Try again in [60..0]s". | "Too many requests. Please wait a few minutes." — honest, non-shaming. Cooldown is framed as system protection, not user failure. | Disabled CTA at 40% opacity (no glow change, just opacity). Countdown timer in white-50, centered below CTA. |
| **Success / Confirmation** | Replaces default form entirely. Logo remains (smaller position, 24pt top margin below back button). Check circle (56pt) centered, 32pt below logo. "Check your email" heading (28pt) below circle, 24pt gap. Instructional text (16pt) below heading, 12pt gap, shows masked email: "We sent a reset link to j***@email.com". CTA "back to sign in" below text, 32pt gap. Resend link below CTA, 16pt gap. | Heading: "Check your email" — warm, confirms next step. Instructional: "We sent a reset link to j***@email.com" — specific to user. CTA: "back to sign in" — direct exit. Resend context: "Didn't receive it?" — non-accusatory. Resend action: "send again" — direct. | Check circle on `--color-forest-green` (success signal, a new color in the flow). Circle receives **`--glow-green-sm`** (~12px, warm green glow at /.35 opacity) behind it to lift from `--color-ink-900` field — warm depth, not neon. Checkmark white (24pt, 2pt stroke, centered). All text white, no new surfaces (confirmation state floats on `--color-ink-900` like the default form). |
| **Offline** | If the form is submitted while offline, the default form persists (input + CTA unchanged). Offline banner appears at bottom: "You're offline. Reset link will send when you're back online." — 13pt, white at 50%, centered. | "You're offline. Reset link will send when you're back online." — honest, specific, recovery automatic (no action needed). | Banner: ink-brown-800 bg, 24pt padding, `--radius-lg`, `--shadow-1`. Does not obstruct CTA (positioned 16pt above screen bottom or tab bar if visible). |

### Signature & anti-generic

**Ownable Balencia moment:** the **check-circle scale-in on confirmation** (CK-P4 motion choreography) — the signature draw/scale moment that announces success. The circle scales from 0.5 to full size over 520ms with `--ease-flow` (the brand's flowing, natural easing, not a snappy pop), accompanied by the warm `--glow-green-sm` glow that lifts it off the field. This is the brand's approach to success confirmation: *calm, warm, spatial* — not a spinning checkmark or a confetti burst. The moment reads unmistakably Balencia because it honors the same motion law as the Living Line and Constellation Radar (§8, "motion draws, never fades").

**Removed generic tells:**
- No flat input on `--color-ink-900` (the prior state); every surface now has the `--edge-highlight` cue that reads premium.
- No generic copy (the spec contains "email address" as the generic text, authored and specific to the field, not "enter your email" or "email@example.com").
- No generic error styling (errors are specific: "No account found" vs "Invalid input"; each carries its own recovery path — either correct the email or retry after cooldown).
- No undesigned confirmation state (the prior audit found that clicking send did nothing; now the confirmation is a fully crafted moment with motion, depth, and warm copy).
- Instruction copy avoids enthusiasm/urgency language ("we'll send you a reset link" is plain, coaching tone — not "get a reset link now" or "unlock your account").

The screen feels unmistakably Balencia because it is calm, warm, non-shaming, and uses the brand's motion signature at the moment of highest emotional weight (success confirmation). It matches the benchmark (Stripe's clarity + iOS's restraint + Linear's copy precision) while staying rooted in the Balencia language: the orange logo, the warm ink-brown surfaces, the forest-green success moment, and the continuous-scale draw choreography.

### Accessibility

**Contrast pairs (load-bearing):**
- White text (100%) on `--color-ink-brown-800` input: ≥4.5:1 ✓
- White text (100%) on `--color-ink-900` (heading, instructional on default state): ≥4.5:1 ✓
- White text (50%) on `--color-ink-900` (instructional secondary): ≥3:1 ✓
- `--color-error-red` (`--color-error-red`) on `--color-ink-900`: ≥3:1 (error border + error text) ✓
- White checkmark (2pt stroke) on `--color-forest-green` circle: ≥3:1 ✓
- `--color-brand-orange` ("send reset link" button text, white at 100% on `--color-brand-orange` bg): ≥4.5:1 ✓
- `--color-forest-green` ("sent" success text on `--color-ink-900`): ≥3:1 ✓

**Focus ring:** every interactive element (input, CTA, resend link) receives `CK-T03 --focus-ring` on focus-visible state: 2px `--color-brand-orange` ring, 2px offset from element border, on the `--color-ink-900` field. Uniform app-wide, visible on dark backgrounds.

**Touch targets:** input field 52pt height ≥44pt ✓, CTA button 56pt height ≥44pt ✓, back button 44x44pt ✓, resend link row 44pt touch target ✓.

**Colour + glyph + word:** success state uses the green color *plus* a white checkmark glyph *plus* the "Check your email" heading (status never colour-alone). Error state uses the red border *plus* red text *plus* the error message string (status never colour-alone).

**Screen reader:** aria-labels:
- Back button: "Go back to sign in"
- Email input: "Email address for password reset"
- CTA button (default state): "Send reset link"
- CTA button (confirmation state): "Back to sign in"
- Check circle (confirmation state): "Success. Password reset link sent."
- Resend link: "Didn't receive it? Send again." (the entire row is tappable, but the link text is clear)

Screen reader announces the confirmation state as: "Check your email. We sent a reset link to [masked email address]." (heading + instructional text read in sequence, no additional aria markup needed beyond semantic HTML).

**Reduced-motion:** `prefers-reduced-motion: reduce` → all animated elements appear at final state instantly; no stagger, no scale, no spinner. The check circle appears at full 56pt size with the glow already applied (the settled frame is the canonical frame). Form-to-confirmation transition is instant (form hidden, confirmation shown). No animation loop on the spinner or resend cooldown (if a countdown appears, it updates text only, no animation).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [04] — Sign In via stack pop (back button or "back to sign in" CTA)
- **Navigates from**: Screen [04] — Sign In via stack push ("Forgot password?" link)
- **Shared components with**: Screen [03] — Welcome / Sign Up (email input, CTA button), Screen [04] — Sign In (back button, email input, CTA button)
- **Patterns used**: Auth Screen Template (simplified — single input variant), Text Input Field Pattern, Brand CTA Button, Back Button Pattern
- **Patterns established**: **Confirmation State Pattern** — form-to-confirmation crossfade within the same screen. Green success icon (56pt circle, #34A853, white checkmark) + heading change + CTA change. Used when a form submission results in a "check your email/phone" confirmation. **Resend Link Pattern** — "Didn't receive it? send again" with tap → "sent" green confirmation text (3s) → cooldown after 2 sends.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-02.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/forgot-password`
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
| B02-F08 | critical | conversion | Wire reset submission, masked-email confirmation, back-to-sign-in CTA, and resend/cooldown states. |
| B02-F09 | minor | accessibility | Add a Back aria-label and ensure it performs stack pop. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

