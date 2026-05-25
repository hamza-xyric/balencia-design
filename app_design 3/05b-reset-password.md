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

## Cross-References

- **Navigates to**: Screen [04] -- Sign In (after success or from expired state links)
- **Navigates from**: Email deep-link (sent from Screen [05] Forgot Password flow)
- **May navigate to**: Screen [05] -- Forgot Password (from "request new link" on expired state)
- **Shared components with**: Screen [05] -- Forgot Password (success icon, heading, instructional text, CTA), Screen [03] -- Sign Up (password field, requirements)
- **Patterns used**: Auth Screen Template, Text Input Field, Brand CTA Button, Confirmation State Pattern (from Screen 05)
- **Patterns established**: **Password Requirements Checklist** -- real-time validation feedback with status icons that transition from not-met (white at 30%) to met (green checkmark) as the user types. Reusable for any password creation/change form. **Token Expired State** -- amber warning circle (56pt, #F59E0B, white exclamation) + explanation text + recovery CTA + secondary text link. Reusable for any expired/invalid deep-link.
