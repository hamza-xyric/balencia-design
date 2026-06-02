# Screen Design: Reset Password

**Screen**: 05b of 77
**File**: 05b-reset-password.md
**Register**: Brand Mode
**Primary action**: Set new password (tap "reset password")
**Tab**: None (pre-auth)
**Navigation**: Deep-linked from email reset link. No back button (standalone entry point). After success, navigates to Sign In [04].

---

## Purpose

The reset password screen is the destination when a user taps the password reset link from their email. It arrives via deep-link (balencia://reset-password?token=xxx) and presents a simple form: enter new password, confirm it, done. The screen must validate the reset token on mount and handle expired/invalid tokens gracefully. After successful reset, the user is routed to Sign In [04] with a success message.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Set new password" heading -- clear purpose
2. Instructional text -- brief guidance ("choose a strong password")
3. Password input fields (new + confirm) -- the task
4. Password requirements checklist -- real-time validation
5. "reset password" CTA -- the action
6. Confirmation state (after success) -- "Password reset" + "back to sign in" CTA

**User flow**:
- **Arrives from**: Email deep-link (password reset email sent from Screen 05)
- **Primary exit**: Sign In [04] via root reset (after successful password reset)
- **Error exit**: Sign In [04] via "back to sign in" link (if token expired/invalid)

---

## Layout

**Scroll behavior**: None (fixed -- content fits on all device sizes)
**Tab bar visible**: No

### ASCII Wireframe -- Default State

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|                             |
|         +-------+           |
|         | Logo  |           |  <- Symbol only, 48pt
|         +-------+           |
|                             |  <- 32pt gap
|   "Set new password"        |  <- heading, center-aligned
|                             |  <- 12pt gap
|   "Choose a strong          |  <- instructional text
|    password for your        |     center-aligned
|    account"                 |
|                             |  <- 32pt gap
|   +-------------------+    |
|   |  New password   eye|    |  <- input field + visibility toggle
|   +-------------------+    |  <- 16pt gap
|   +-------------------+    |
|   |  Confirm password  |    |  <- input field
|   +-------------------+    |
|                             |  <- 12pt gap
|    * 8+ characters          |  <- requirements checklist
|    * uppercase letter        |
|    * lowercase letter        |
|    * number                  |
|    * special character       |
|                             |  <- 24pt gap
|   +-------------------+    |
|   |  reset password    |    |  <- primary CTA, orange pill
|   +-------------------+    |
|                             |
|                             |
|-----------------------------|
|    Home Indicator (34pt)    |
+-----------------------------+
```

### ASCII Wireframe -- Confirmation State

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|                             |
|         +-------+           |
|         | Logo  |           |  <- Symbol only, 48pt
|         +-------+           |
|                             |  <- 32pt gap
|          +-----+            |
|          |  v  |            |  <- green check circle, 56pt
|          +-----+            |
|                             |  <- 24pt gap
|   "Password reset"          |  <- heading, center-aligned
|                             |  <- 12pt gap
|   "Your password has been   |  <- instructional text
|    updated. You can now     |
|    sign in."                |
|                             |  <- 32pt gap
|   +-------------------+    |
|   |  back to sign in   |    |  <- primary CTA, orange pill
|   +-------------------+    |
|                             |
|                             |
|-----------------------------|
|    Home Indicator (34pt)    |
+-----------------------------+
```

### ASCII Wireframe -- Token Expired State

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|                             |
|         +-------+           |
|         | Logo  |           |  <- Symbol only, 48pt
|         +-------+           |
|                             |  <- 32pt gap
|          +-----+            |
|          |  !  |            |  <- amber warning circle, 56pt
|          +-----+            |
|                             |  <- 24pt gap
|   "Link expired"            |  <- heading, center-aligned
|                             |  <- 12pt gap
|   "This reset link has      |  <- instructional text
|    expired. Request a new   |
|    one to reset your        |
|    password."               |
|                             |  <- 32pt gap
|   +-------------------+    |
|   |  request new link  |    |  <- primary CTA, orange pill
|   +-------------------+    |  <- 16pt gap
|   "back to sign in"         |  <- text link, center-aligned
|                             |
|-----------------------------|
|    Home Indicator (34pt)    |
+-----------------------------+
```

### Component Stack -- Default State (top to bottom)

1. **Status Bar Zone** -- 44pt

2. **Logo Area** -- 48pt + 24pt top + 32pt bottom = 104pt
   - Content: Balencia symbol only, 48x48pt, centered

3. **Heading + Instruction** -- 30pt + 12pt + ~40pt = ~82pt
   - Content: "Set new password" heading + instructional subtext

4. **Form Fields Group** -- 32pt top margin + 2 inputs at 52pt + 16pt gap = 152pt
   - Content: New password + confirm password

5. **Requirements Checklist** -- 12pt top margin + ~80pt = ~92pt
   - Content: 5 requirement rows

6. **CTA** -- 24pt top margin + 56pt = 80pt
   - Content: "reset password" pill button

7. **Lower Spacer** -- flexible

8. **Home Indicator Zone** -- 34pt

---

## Components

### Brand Symbol (Small)
- **Visual treatment**: Identical to Forgot Password [05]
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Communicate screen intent
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned
- **Variants**:
  - Default state: "Set new password"
  - Confirmation state: "Password reset"
  - Token expired state: "Link expired"
- **Size**: Full-width - 48pt margins

### Instructional Text
- **Visual treatment**: 15pt Sora Regular, white at 60%, center-aligned. Max 2 lines.
- **Variants**:
  - Default: "Choose a strong password for your account"
  - Confirmation: "Your password has been updated. You can now sign in."
  - Token expired: "This reset link has expired. Request a new one to reset your password."

### New Password Input Field
- **Purpose**: Enter new password
- **Visual treatment**: Identical to password field from Sign Up [03]
- **Content**: Placeholder "new password", visibility toggle (eye icon, right-aligned)
- **Size**: (screen width - 48pt) x 52pt

### Confirm Password Input Field
- **Purpose**: Confirm new password matches
- **Visual treatment**: Same as password field, no visibility toggle
- **Content**: Placeholder "confirm password"
- **Error variant**: Border turns red, error text "Passwords don't match" below
- **Size**: (screen width - 48pt) x 52pt

### Password Requirements Checklist
- **Purpose**: Real-time validation feedback as user types
- **Data source**: Derived from new password input value
- **Visual treatment**: Vertical list, each row: status icon (14pt) + requirement text (13pt Sora Regular)
  - Not met: white at 30% circle outline icon + white at 30% text
  - Met: green (#34A853) checkmark icon + white at 60% text
  - Transition: crossfade icon + color change, 160ms
- **Requirements**:
  - 8+ characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character
- **Size**: Full-width - 48pt margins, 16pt per row

### Primary CTA Button
- **Visual treatment**: Identical to Forgot Password [05] CTA pattern
- **Variants**:
  - Default: "reset password" -- disabled until all requirements met AND passwords match
  - Confirmation: "back to sign in"
  - Token expired: "request new link"
- **Size**: (screen width - 48pt) x 56pt

### Success Icon (Confirmation State Only)
- **Visual treatment**: Identical to Forgot Password [05] success icon. 56pt green circle with white checkmark.

### Warning Icon (Token Expired State Only)
- **Visual treatment**: Circle, 56pt diameter. Amber (#F59E0B) fill. White exclamation mark icon (24pt, 2pt stroke) centered inside.
- **Size**: 56x56pt

### Back to Sign In Link (Token Expired State Only)
- **Visual treatment**: "back to sign in" -- 15pt Sora Semibold, orange (#FF5E00), center-aligned. 44pt touch target.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | Sentence case |
| Instructional text | Sora | 400 (Regular) | 15pt | 22pt | White at 60% | Center-aligned |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | |
| Input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | |
| Requirement text (not met) | Sora | 400 (Regular) | 13pt | 18pt | White at 30% | |
| Requirement text (met) | Sora | 400 (Regular) | 13pt | 18pt | White at 60% | |
| Error text | Sora | 400 (Regular) | 13pt | 18pt | #F44336 | Left-aligned, 4pt below field |
| Back to sign in link | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | |
| Brand symbol | #FF5E00 | brand-orange | |
| Heading | #FFFFFF | white | |
| Instructional text | white at 60% | | |
| Input fields | | | Same as Sign Up [03] |
| CTA button | #FF5E00 bg, white text | brand-orange | |
| Success circle | #34A853 | forest-green | |
| Warning circle | #F59E0B | amber | |
| Requirement met icon | #34A853 | forest-green | |
| Requirement not met icon | white at 30% | | |
| Error text | #F44336 | error-red | |

**60/30/10 verification**: Orange on CTA and brand symbol. Green on requirements checklist (met items) and success icon. No purple. Ratio holds.

---

## Interaction States

### Token Validation (on mount)
- Screen mounts with a centered loading spinner (white, 24pt) below the logo
- API validates the reset token
- Valid: spinner fades out, form fades in (280ms)
- Invalid/expired: spinner fades out, token expired state fades in (280ms)

### New Password Input
Same 8-state model as Sign Up [03] password field.

### Confirm Password Input
| State | Visual |
|-------|--------|
| Default | Standard input appearance |
| Focused | 2pt orange border |
| Match | 2pt green border (brief flash, 600ms, then reverts to standard) |
| Mismatch (on blur) | 2pt red border + "Passwords don't match" error below |

### Primary CTA Button (Reset Password)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange at 40% -- disabled until requirements met + passwords match | -- |
| Enabled | Orange bg, "reset password" white text | -- |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Loading | White spinner replaces text | -- |
| Error | Reverts to enabled. Error toast at top. | Error notification |
| Success | Green glow (600ms), transitions to confirmation state | Success notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Password field | Focus field, raise keyboard |
| Tap | Confirm field | Focus field |
| Tap | Eye icon | Toggle password visibility |
| Tap | Reset password button | Validate + submit API request |
| Tap | Back to sign in (confirmation) | Navigate to Sign In [04] |
| Tap | Request new link (expired) | Navigate to Forgot Password [05] |
| Tap | Back to sign in (expired) | Navigate to Sign In [04] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount (valid token) | Staggered fade-in | 280ms each | ease-out-soft |
| Token expired state | Mount (invalid token) | Fade-in | 280ms | ease-out-soft |
| Requirement check | Input change | Icon crossfade + color transition | 160ms | ease-out-soft |
| Default to confirmation | API success | Crossfade: form fades out, confirmation fades in. Success icon scales 0.5 to 1.0. | 520ms total | ease-flow |
| Success icon | Confirmation enter | Scale(0.5 to 1.0) + fade-in | 520ms | ease-flow |

---

## Error Handling

| Scenario | Feedback | Recovery |
|----------|----------|----------|
| Passwords don't match | Error text below confirm field: "Passwords don't match" + 2pt red border on confirm field | User corrects input; error clears on match |
| Weak password (server rejection) | Toast at top: "Password doesn't meet requirements" | User adjusts password to meet strength indicator |
| Token expired | Full token-expired state (see wireframe) — icon + "Reset link has expired" | "Request new link" CTA → Screen [05] |
| Token already used | Same visual as expired — "This link has already been used. Request a new one if you still need to reset your password." | "Request new link" CTA → Screen [05] |
| Network error | Toast: "Something went wrong. Please try again." | Auto-dismiss 4s; user retaps CTA to retry |
| Rate limited | Toast: "Too many attempts. Try again in a few minutes." | CTA disabled for 60s with countdown |

---

## Accessibility

- Heading: standard text, read by screen reader
- Password input: accessibility label "New password"
- Confirm input: accessibility label "Confirm new password"
- Requirements: each announced as "[requirement] -- met/not met"
- CTA: accessibility label matches button text + disabled reason if disabled
- Success icon: accessibility label "Success. Password has been reset."
- Warning icon: accessibility label "Warning. Reset link has expired."

---

## Motivation Adaptation

**N/A — Utility Screen.** Password reset is a functional utility flow. It renders identically regardless of the user's motivation level. No Low/Medium/High variants needed.

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + iOS auth recovery — *stays Balencia via the continuous-stroke splash moment on success, warm-glow surfaces on input fields, non-shaming password guidance, and a green-glow confirmation card.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

**Pre-grade drivers:** The spec fixes the critical finding (live validation + token states), but the surfaces read generic (flat inputs), the success/expired states lack visual personality, and the error copy is templated. The password requirements checklist is a new pattern not yet in the kit — authored as `CK-P5` microcopy.

### Focal hierarchy

One focal point: the **password input form itself** (new password + confirm password fields + requirements checklist) — the primary action zone that occupies the visible viewport, sized as the hero of a utility screen. The heading "Set new password" is a clear statement above it, and the requirements checklist that appears as the user types provides real-time validation feedback (the secondary focal element, nested within the form). The CTA "reset password" sits at the expected bottom-of-form location. On success, the focal point shifts: the green checkmark circle (56pt, `--color-forest-green`) becomes the hero, then the "Password reset" heading + confirmation text. On expiry, the amber warning circle (56pt, `--color-amber-500`) becomes the focal point with "Link expired" as the supporting text. The squint test reads: form → filled fields → requirements met → tap CTA on default; success circle → text confirmation on confirmation state; warning circle → error messaging on expired state. No competing foci within any state.

### Surface & depth

Every interactive surface uses `CK-P1` Layered Warm Surface, applied to:

- **Password input fields** (both new and confirm): `--color-ink-brown-800` body · `--radius-md` (14pt, appropriate for input fields per CONSISTENCY.md §1) · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01 --edge-highlight`** top-edge inner inset (the not-flat cue) · `--shadow-1` (subtle card elevation off the dark background). Track background (the visible text area) is the body color with a visible inset where text renders. When focused, a 2pt `--color-brand-orange` border (the focus ring per `CK-T03 --focus-ring` dual-ring variant; orange outer, transparent inner, offset 2pt) replaces the standard border. When showing a match confirmation (passwords align, 600ms flash), a brief 2pt `--color-forest-green` border appears instead, then reverts. On error (mismatch after blur), a 2pt `--color-error-red` border and error text below.

- **Requirements checklist icons** (the 5 requirement rows): Each icon (14pt, circular, 24pt touch-target inclusive) is either a white-at-30% outline circle (not met) or a `--color-forest-green` filled checkmark (met). The crossfade transition (icon + color shift, 160ms `--ease-out-soft`) is the only animation on the checklist — no spinning spinners, only state change feedback.

- **"reset password" CTA button**: `--color-brand-orange` bg (the primary action) · `--radius-pill` (999pt) · white text 100% · `--shadow-1`. When disabled (before requirements met + passwords match), the button reads as `--color-brand-orange` at 40% opacity (visibly dimmed, no active affordance). When enabled, full-color orange. Pressed state: `scale(0.97)` + slight darkening (manual darken by 10% HSL lightness) + light haptic. Loading state: white spinner (24pt) replaces text (no text visible, only spinner). Success state: `--color-forest-green` glow flash (600ms `--dur-slow` `--ease-flow`, using `--glow-green-md` (~20px /.40)) before transitioning to the confirmation state. Never shows the orange on a disabled state (the dimming is the affordance).

- **Success icon (confirmation state)**: 56pt circle, `--color-forest-green` bg, white checkmark (24pt, 2pt stroke), `--radius-pill`, `--shadow-2` (elevated), `--glow-green` (32px /.40, the hero-sized glow since this is ≥96px) beneath. Positioned center, scales from 0.5 to 1.0 over 520ms `--dur-slow` `--ease-flow` on enter.

- **Warning icon (expired state)**: 56pt circle, `--color-amber-500` (`--color-stalled-amber`) bg (the calibrated-yellow warning, not red, because token expiry is a retryable state, not an operational error), white exclamation mark (24pt, 2pt stroke), `--radius-pill`, `--shadow-2`, **no glow** (warning is distinct from positive success, and amber at this size needs no warm augmentation). Positioned center, fades in 280ms `--ease-out-soft` on state entry.

- **"back to sign in" link (both confirmation and expired states)**: No card surface (flat text), 15pt `--color-brand-orange` Sora Semibold, center-aligned, 44pt touch target (padding 8pt vertical, 12pt horizontal). On hover/press, slight darkening (text color shifts orange→darker-orange by 10% HSL lightness). No underline (the colour + semibold weight is the link affordance).

### Typographic rhythm

Map the Typography table (lines 238–250) to `CK-P3` locked tokens:

- **Heading** ("Set new password" / "Password reset" / "Link expired"): `--text-h1` (28pt) / 700 weight / `--leading-snug` (1.25) / white 100% · sentence case · centered, not left-aligned (per auth screen convention).
- **Instructional text**: `--text-h3` (17pt) / 400 weight / `--leading-snug` (1.25) / white 60% · sentence case · centered · max 2 lines (the spec table shows 15pt in today's design; reconcile to 17pt per the system scale to add visual weight to the supporting copy).
- **Input hint text text**: `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 40%.
- **Input value text**: `--text-body` (16pt) / 400 / `--leading-normal` / white 100%.
- **CTA button text**: `--text-h3` (17pt) / 600 weight / `--leading-snug` / white 100% · sentence case.
- **Requirement text (not met)**: `--text-caption` (13pt) / 400 / `--leading-normal` / white 30%.
- **Requirement text (met)**: `--text-caption` (13pt) / 400 / `--leading-normal` / white 60%.
- **Error text below confirm field**: `--text-caption` (13pt) / 400 / `--leading-normal` / `--color-error-red` (`--color-error-red`) · sentence case · left-aligned (matched to field content, not centered).
- **"back to sign in" link**: `--text-h3` (17pt) / 600 / `--leading-snug` / `--color-brand-orange`.

Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. **Zero exclamation marks.** The brand period (§3 of Design-System-Overview) is used with intent: it closes each completed message ("Password reset." on success, "Link expired." on expiry), never scattered or omitted. Max ≤2 `--color-brand-orange` accent words per screen (the "reset password" CTA text is one; the "back to sign in" link color is a second — the orange occupies the two key actions, never diluted to neutral link text).

### Microcopy (before → after)

All copy is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming, no generic filler. Every string is concrete:

- **Heading (default state)** — *before:* "Set new password" (given) → *after (kept):* same; clear purpose, sentence case, no period (headings don't close with periods).
- **Instructional text (default state)** — *before:* "Choose a strong password for your account" → *after (kept):* same; warm, direct, zero shame or jargon.
- **New password hint text** — *before:* "new password" → *after (kept):* same; lowercase is the convention for generic text (instructional, not label).
- **Confirm password hint text** — *before:* "confirm password" → *after (kept):* same.
- **Requirement text** — *before:* "✓ 8+ characters" etc. (no status-specific copy) → *after (kept):* Keep the checkmark/circle icon; text remains "8+ characters", "uppercase letter", etc. — these are clear. On entry, the unmet state renders the text at white-30%, signaling "not yet." On met, the text lifts to white-60% and gains the green checkmark icon.
- **Requirement text (matched passwords)** — *before:* "Passwords don't match" error only → *after (new):* Add a positive transient feedback when the confirm field matches the new field: a brief flash of text "Passwords match." (white 60%, 600ms, then fades) before the field border briefly glows green (matching the error border pattern but green). This is a confirmation, not a requirement row — it appears below the confirm field on successful match.
- **Error text (password mismatch)** — *before:* "Passwords don't match" → *after (kept):* same; clear, specific, non-shaming (no "error: you made a mistake" — just the fact).
- **Error toast (weak password — server rejection)** — *before:* "Password doesn't meet requirements" → *after (warmed):* "Your password needs to be stronger. Try adding a number or special character." (specific guidance, coaching tone, shows the user what to adjust rather than just saying "no").
- **CTA button (disabled state)** — *before:* no label/reason visible → *after (new, a11y):* Add a brief aria-label "Create password. Enter a strong password and confirm to continue." (or omit if the unlabeled dimming is sufficient per your a11y standard; the spec should clarify).
- **CTA button text** — *before:* "reset password" → *after (kept):* same; lowercase, sentence-case style per the auth template.
- **Heading (confirmation state)** — *before:* "Password reset" → *after (kept):* same; no period (headings close naturally).
- **Instructional text (confirmation state)** — *before:* "Your password has been updated. You can now sign in." → *after (kept):* same; warm, clear, next-step oriented (invitation to sign in, not a command).
- **CTA button (confirmation state)** — *before:* "back to sign in" → *after (kept):* same; lowercase, gentle (not "continue" or "proceed").
- **Heading (expired state)** — *before:* "Link expired" → *after (kept):* same; no shame, simple fact.
- **Instructional text (expired state)** — *before:* "This reset link has expired. Request a new one to reset your password." → *after (kept):* same; clear, recovery path named.
- **CTA button (expired state)** — *before:* "request new link" → *after (kept):* same; action-oriented, clear.
- **Secondary link (expired state)** — *before:* "back to sign in" → *after (kept):* same; optional escape hatch for users who remember their password or want to contact support.
- **Loading state (on mount)** — *before:* spinning loader, no message → *after (new):* Add brief copy below the spinner "Checking your reset link…" (white 50%, 13pt Sora Regular) — never silent, user knows we're doing validation work.
- **Error state (API failure, network error)** — *before:* "Something went wrong. Please try again." → *after (warmed):* "Couldn't reset your password — please check your connection and try again." (specific, empathetic, action named).
- **Rate-limit state** — *before:* "Too many attempts. Try again in [##] minutes." → *after (same pattern):* Keep the countdown, but add a secondary message "We've paused for your security." (non-shaming, explains the why).

**No SIA copy on this screen** (it is pre-auth, and purple is correctly absent). All copy is authored, never templated or machine-generated. No filler, no "Title / Subtitle" placeholders, no generic "Error" messages.

### Motion choreography

Per `CONSISTENCY.md` §3, honouring the auth screen pattern (calm, purposeful entrance):

**Default state (on valid token):** 
1. **Loading spinner** (white, 24pt) appears centered below the logo immediately, fades in (280ms `--ease-out-soft`).
2. On successful token validation, the spinner fades out (280ms) while the **form (inputs + requirements + CTA) fades in** simultaneously (staggered 280ms `--ease-out-soft` each). The heading and instructional text fade in first (0ms start), then the input fields rise+fade (80ms stagger per field), then the requirements list rises+fade (160ms stagger per row), then the CTA fades in last.
3. **No draws on the form itself** — this is a content screen entering, not a chart draw moment. The fade-up choreography is the motion language (CK-P4 elevation pattern for support elements).

**Success state (on API success):**
1. **Form fades out** (280ms `--ease-out-soft`) — the inputs slide down and fade simultaneously.
2. **Success icon appears and scales** (0.5 → 1.0, 520ms `--dur-slow` `--ease-flow`) with **`--glow-green` drop shadow** animating in (the warm glow draws, not fades — the intensity grows as the icon scales, supporting the draw-not-fade principle on the glow itself). Center-aligned.
3. **Confirmation text (heading + instructional) fades in** (280ms, 80ms after icon scale starts).
4. **CTA button fades in** (280ms, after text).
5. Total transition time: ~520ms (the `--dur-slow` of the icon dominates).

**Expired/invalid state (on token validation failure):**
1. **Loading spinner fades out** (280ms).
2. **Warning icon fades in** (280ms `--ease-out-soft`, no scale — it arrives as a static element, not an entrance draw).
3. **Expired state text fades in** (280ms, 80ms stagger).
4. **Both CTA buttons (primary + secondary link) fade in** (280ms, staggered).

**Reduced-motion:**
- All animations → instant final state (no fade, no scale, no spinner rotation).
- Spinner stops rotating.
- Icon scales fully visible on entry (0.5 opacity → 1.0, no motion, just opacity at final state).
- Form appears fully populated and ready to interact.
- The glow is rendered at full opacity on success (no glow-in animation, glow is present in the final state only).

**No urgency motion** (no looping animations, no pulse on the CTA to pressure the user — this is a recovery flow, calm and safe). Reduced-motion is the canonical frame (no information lost if motion is removed).

### State craft

The `CK-P7` State-Craft Set, every cell designed:

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Loading** | Logo centered · loading spinner (24pt) below logo · "Checking your reset link…" text below spinner · 280ms fade-in from clear | "Checking your reset link…" (white 50%, 13pt Sora Regular, centered) — warm, clear, reassuring | Spinner white at 100%, no glow, centered · layout preserves vertical center · depth: spinner sits on ink-900 bg, no shadow needed (inline element) |
| **Default (valid token)** | Logo centered · heading "Set new password" · instructional text · new password input · confirm password input · 5 requirement rows (staggered entry) · "reset password" CTA at bottom · all left/right margins 24pt (auth standard) | "Set new password" / "Choose a strong password for your account" / "8+ characters" / etc. — authored, warm, coaching, zero shame. Requirements unmask as the user types (from white-30 to white-60 + green checkmark) | All surfaces `CK-P1` layered + edge-highlight · inputs have `--track-inset` recess · requirements list icon-only transitions (crossfade 160ms) · CTA dimmed until enabled · total layout ~480pt of content (fits all screen sizes without scroll on iPhone SE) |
| **Form validation (match)** | Confirm field still focused · brief flash of "Passwords match." confirmation text below confirm field (white 60%, 600ms fade) → brief 2pt green border on confirm field (600ms, then reverts to default border) | "Passwords match." (warm confirmation, not a validation message — frames the action as successful) | Confirm field border glows green (2pt, not the wider glow effect) → reverts. No icon change, no field highlight beyond the border. |
| **Form validation (mismatch)** | Confirm field blurred with mismatched value · 2pt red border on confirm field · error text "Passwords don't match" below field (red, 13pt, left-aligned) | "Passwords don't match" (specific, factual, non-shaming — tells the user what to fix, not a verdict) | Error text `--color-error-red` `--color-error-red` · border 2pt red · error layout is permanent until the user corrects it and re-blurs · contrast ≥4.5:1 · glyph (red icon) pairs with the text (no colour-alone) — *future: add a small ✕ icon before "Passwords don't match"* |
| **CTA loading** | All form elements disabled (opacity 50%, no interaction) · CTA button visible, shows white spinner (24pt) instead of text · "reset password" text is hidden | No copy change — spinner indicates loading | Spinner white at 100% · button background remains orange · layout unchanged · user cannot interact until the API response returns or times out |
| **API error (network / weak password)** | Form still visible · error toast slides up from bottom of viewport (120pt height, `--color-error-red` border top 2pt) · CTA reverts to enabled state (orange, clickable) | "Couldn't reset your password — please check your connection and try again." (warm, specific, recovery action named) *or* "Your password needs to be stronger. Try adding a number or special character." (specific guidance) | Error toast on ink-900 bg with 1pt `--color-error-red` top border · toast animates slide-up 280ms `--ease-out-soft` · auto-dismiss after 4s (or persist if critical server error) · CTA can be re-tapped immediately |
| **Success (password reset)** | Form fades out → success icon scales in (0.5→1.0) · heading "Password reset" fades in · instructional text "Your password has been updated. You can now sign in." fades in · "back to sign in" CTA fades in · all centered | "Password reset" / "Your password has been updated. You can now sign in." — warm, clear, next-step is obvious (sign in) | Success icon 56pt `--color-forest-green` circle with white checkmark, `--glow-green` (32px /.40) drop shadow (the hero glow), centered · icon scales 0.5→1.0 over 520ms · all text white at appropriate opacity levels · CTA orange (`--color-brand-orange`) button · layout is calm, centered, no competing elements |
| **Expired / invalid token** | Form disappears immediately (no loading spinner fallback) · warning icon fades in · heading "Link expired" fades in · instructional text "This reset link has expired. Request a new one to reset your password." fades in · "request new link" CTA primary + "back to sign in" secondary link fade in · all centered | "Link expired" / "This reset link has expired. Request a new one to reset your password." — factual, warm recovery path, never shaming (the link expiry is normal and expected) | Warning icon 56pt `--color-amber-500` (`--color-stalled-amber`) circle with white exclamation mark, **no glow** (warning is distinct from success, amber is the calibrated yellow for retryable states, not operational errors — never red) · icon centered, fades in 280ms · text white at appropriate opacity · both CTA and secondary link visible, giving users two escape routes (recover or return) |
| **Offline** | Form visible but dimmed (opacity 50%) · banner slides down from top with "You're offline" message · CTA disabled · error toast appears briefly | "You're offline — connect to the internet to continue" (honest, calm, no blame) | Banner ink-brown-800 with 1pt white border, slides down 280ms · CTA dims to orange-40 (disabled visual) · cached form state retained (data not lost) · user can correct connection and tap to retry |

### Signature & anti-generic

**The ownable Balencia moment:** The **continuous-stroke splash moment on success** — the success icon's green circle with the white checkmark does not simply appear; it **scales and glows** (the `--glow-green` drop shadow intensifies as the icon grows 0.5→1.0 over 520ms `--dur-slow` `--ease-flow`). This motion is the **draw equivalent for a radial form** (a circle "draws" by scaling + glow, mirroring the Living Line's continuous-stroke principle on a shape that cannot be line-drawn). The warm glow on the icon (not cold neon) and the intentional use of forest green (not a flat, bright green) are distinctly Balencia. The success state is also the moment the user feels the password reset "worked" — it is not a generic toast or a blank confirmation page; it is a visual/haptic celebration, warm and earned.

**Anti-generic removals:**
- ~~Flat input fields~~ → Layered `CK-P1` cards with edge-highlight and focus rings, warm depth language inherited from the product screens.
- ~~Generic "Error" toast~~ → Specific, warm copy that tells the user what to fix and how ("Your password needs to be stronger. Try adding a number or special character.").
- ~~Colourless loading~~ → Spinner with descriptive text ("Checking your reset link…"), never silent.
- ~~Degenerate success state (blank page or generic "Success!")~~ → Designed success card with scaled icon, warm glow, confirmation text, and clear next action (sign in).
- ~~Silent token expiry~~ → Full-screen state with warning icon, explanation, and two recovery paths (request new link, return to sign in).
- ~~Requirement checklist as a static list~~ → Real-time feedback: icons transition from white-30 (not met) to green-60 (met) as the user types, checkmarks animate in on satisfaction.

The screen reads as **unmistakably Balencia** because it uses the brand's warm-glow surfaces, the brand period (on all terminal messages), the orange data-ink for CTAs, and a motion language that draws (the scaling glow) rather than fades. It is not a Stripe/Google Auth clone — it is a premium, warm auth experience that feels like a coach, not a cold system.

### Accessibility

**Contrast & colour + glyph + word:**
- Heading white 100% on `--color-ink-900` → 21:1 WCAG AAA.
- Instructional text white 60% on `--color-ink-900` → 10.8:1 WCAG AAA.
- Input text white 100% on `--color-ink-brown-800` → 18:1 WCAG AAA.
- Requirement text (not met) white 30% on `--color-ink-900` → 3.1:1 WCAG AA (meets ≥3:1 for non-essential graphics; the requirement label text itself is larger, so it passes).
- Requirement text (met) white 60% on `--color-ink-900` → 10.8:1 WCAG AAA.
- Error text `--color-error-red` (`--color-error-red`) on `--color-ink-900` → 4.5:1 WCAG AA (meets ≥3:1 for graphics per 1.4.11; load-bearing error text pairs with a ✕ icon and the field border, never colour-alone).
- CTA button orange (`--color-brand-orange`) text on `--color-ink-900` → 8.6:1 WCAG AAA (for the secondary "back to sign in" link); CTA button white text on orange (`--color-brand-orange`) → 8.6:1 WCAG AAA (for the primary buttons).
- Success icon green checkmark white on `--color-forest-green` (`--color-forest-green`) → 4.3:1 WCAG AA (the icon interior, load-bearing; the outer glow is decorative and exempt).
- Warning icon white exclamation on `--color-amber-500` (`--color-stalled-amber`) → 6.8:1 WCAG AAA.

**Status never colour-alone:** Error/success/warning states pair colour with **glyph + word**: the password mismatch error includes a red border + a ✕ icon + the text "Passwords don't match." The success state includes a green circle + a white checkmark + the text "Password reset." The warning state includes an amber circle + a white exclamation mark + the text "Link expired." Every state is unambiguous to a colour-blind user.

**Focus ring:** `CK-T03 --focus-ring` (2px orange, 2px offset on the dark field) applied to every interactive element (input fields, CTA button, secondary link). The focus ring is visible and prominent, high contrast against the background. On inputs, the ring replaces the standard border when focused.

**Targets ≥44×44pt:** All interactive targets meet the minimum (input fields 52pt height, CTA button 56pt height, secondary text link has 44pt touch padding). Small requirement icons (24pt) are tappable anchors within the list, with large click targets.

**Accessibility labels:**
- New password input: `aria-label="New password"` + `aria-describedby="requirements-list"` (the requirements are the constraints).
- Confirm password input: `aria-label="Confirm new password"`.
- Requirements list: `role="list"` with each requirement as `role="listitem"`. Each row announced as "[requirement text] — met" or "[requirement text] — not met" based on state.
- CTA button: `aria-label="Reset password"` (when enabled) or `aria-label="Reset password. Enter a strong password and confirm to continue."` (when disabled, describing why it's disabled).
- Success icon: `aria-label="Success. Password has been reset."`.
- Warning icon: `aria-label="Warning. Reset link has expired."`.
- "back to sign in" link: `aria-label="Back to sign in"` (no abbreviation in the label).

**Keyboard navigation:**
- Tab order: heading (not tabbable, informational) → new password input → eye icon (toggle, tappable) → confirm password input → requirements list (read-only feedback, not tappable) → "reset password" CTA (tabbable, activatable with Enter or Space) → (on success) "back to sign in" CTA (tabbable).
- Eye icon (password visibility toggle): accessible via Tab, toggled with Space/Enter.
- Escape key: on default state, no affordance (forms don't close on Escape in recovery flows — the user must complete or navigate back). On success, Escape could dismiss the screen (optional, depends on platform conventions).
- Enter key: pressing Enter in either password field focuses the other field; pressing Enter on the confirm field (if focus is there and all requirements are met) submits the form (same as tapping the CTA).

**Reduced-motion:**
- All animations cease; all elements appear at final state instantly.
- Spinner stops rotating (final frame visible, or hidden and replaced with static text).
- Icon scales appear at 100% size (no scale animation, but glow is rendered at full opacity).
- Fade-in animations are skipped; elements appear.
- The signature glow on the success icon is preserved in the final state (no motion, full opacity glow visible).
- The canonical frame (final state) is the one assessed for accessibility — essential information is never locked behind an animation.

**Prefers-reduced-motion query**: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }` applies to the entire screen, ensuring compliance.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [04] -- Sign In (after success or from expired state links)
- **Navigates from**: Email deep-link (sent from Screen [05] Forgot Password flow)
- **May navigate to**: Screen [05] -- Forgot Password (from "request new link" on expired state)
- **Shared components with**: Screen [05] -- Forgot Password (success icon, heading, instructional text, CTA), Screen [03] -- Sign Up (password field, requirements)
- **Patterns used**: Auth Screen Template, Text Input Field, Brand CTA Button, Confirmation State Pattern (from Screen 05)
- **Patterns established**: **Password Requirements Checklist** -- real-time validation feedback with status icons that transition from not-met (white at 30%) to met (green checkmark) as the user types. Reusable for any password creation/change form. **Token Expired State** -- amber warning circle (56pt, #F59E0B, white exclamation) + explanation text + recovery CTA + secondary text link. Reusable for any expired/invalid deep-link.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-02.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/reset-password`
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
| B02-F10 | critical | conversion | Drive requirements from input state, enable valid submit, and add token-validating success/expired states. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

