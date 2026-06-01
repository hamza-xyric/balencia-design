# Screen Design: Sign In

**Screen**: 04 of 73
**File**: 04-sign-in.md
**Register**: Brand Mode
**Primary action**: Sign in to existing account (tap "sign in")
**Tab**: None (pre-auth)
**Navigation**: Stack depth 1 (pushed from Welcome / Sign Up [03]). Back button present (returns to Sign Up).

---

## Purpose

The sign-in screen gets returning users back into Balencia as fast as possible. It is a simpler variant of the Auth Screen Template established by Welcome / Sign Up [03] — fewer fields, same visual structure. The "welcome back" tone signals recognition. Biometric auth (Face ID / Touch ID) may auto-trigger on mount for the fastest possible re-entry, though this is an implementation detail.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Welcome back" heading — emotional recognition, sets returning-user tone
2. Form fields (email, password) — the task
3. "sign in" primary CTA — the action
4. "Forgot password?" link — recovery path, positioned near the password field
5. Social auth buttons — alternative fast path
6. "Don't have an account? sign up" link — redirect for wrong-screen arrivals

**User flow**:
- **Arrives from**: Welcome / Sign Up [03] via stack push ("Already have an account? sign in")
- **Primary exit**: Home Screen [12] (Batch 3) via root reset (successful sign in — replaces auth stack with main app)
- **Secondary exits**: Forgot Password [05] via stack push, Welcome / Sign Up [03] via stack pop (back button) or "sign up" link

---

## Layout

**Scroll behavior**: ScrollView (may need scroll on iPhone SE with keyboard up, though content is shorter than Sign Up)
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
│      "Welcome back"         │  ← heading, center-aligned
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │  Email             │    │  ← input field
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Password      👁  │    │  ← input field + visibility toggle
│   └───────────────────┘    │
│                             │
│        "Forgot password?"   │  ← text link, right-aligned, 8pt above CTA area
│                             │  ← 12pt gap
│   Remember me        [██]  │  ← toggle row
│                             │  ← 16pt gap
│   ┌───────────────────┐    │
│   │      sign in       │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │  ← 24pt gap
│   ──── or continue with ───│  ← divider
│                             │  ← 24pt gap
│   ┌──────┐    ┌──────┐     │
│   │Google│    │Apple │     │  ← social auth buttons
│   └──────┘    └──────┘     │
│                             │  ← 32pt gap
│   "Don't have an account?   │
│    sign up"                 │  ← text link, center-aligned
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt

2. **Back Button Row** — 44pt
   - Purpose: Return to Sign Up screen
   - Content: Left chevron icon, 44x44pt touch target, 16pt left margin

3. **Logo Area** — 48pt logo + 24pt top margin + 32pt bottom margin = 104pt
   - Purpose: Brand anchor (identical to Sign Up)
   - Content: Balencia symbol only, 48x48pt, centered

4. **Heading** — 30pt text + 32pt bottom margin = 62pt
   - Purpose: Set returning-user tone
   - Content: "Welcome back"

5. **Form Fields Group** — 2 inputs at 52pt each + 1 gap at 16pt = 120pt
   - Purpose: Credential entry
   - Content: Email, Password

6. **Forgot Password Link** — 20pt text + 8pt top margin + 16pt bottom margin = 44pt
   - Purpose: Password recovery path
   - Content: "Forgot password?" right-aligned within form area

7. **Primary CTA** — 56pt button
   - Purpose: Submit credentials
   - Content: "sign in" pill button

8. **Divider** — 68pt (same as Sign Up)
   - Content: "or continue with"

9. **Social Auth Buttons** — 52pt
   - Content: Google + Apple (identical to Sign Up)

10. **Navigation Link** — 44pt touch target + 32pt top margin
    - Content: "Don't have an account? sign up"

11. **Home Indicator Zone** — 34pt

**Total estimated height**: ~640pt — fits on all devices including iPhone SE without scrolling (unless keyboard is active).

---

## Components

### Back Button
- **Purpose**: Return to Welcome / Sign Up [03]
- **Data source**: Navigation state (stack pop)
- **Visual treatment**: Left chevron icon, white, 2pt stroke weight, 20pt icon size. Positioned 16pt from left edge, vertically centered in the 44pt row.
- **Variants**: None
- **Gestures**: Tap to navigate back (stack pop)
- **Size**: 44x44pt touch target

### Brand Symbol (Small)
- **Purpose**: Brand anchor — identical to Sign Up [03]
- **Visual treatment**: Same as Screen [03]: 48x48pt, Burnt Orange, centered
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Set the emotional tone for returning users
- **Data source**: Static
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case. No accent word — "welcome back" is warm without needing color emphasis.
- **Size**: Full-width - 48pt margins

### Text Input Fields (Email + Password)
- **Purpose**: Credential entry
- **Visual treatment**: Identical to Sign Up [03] Text Input Field pattern
- **Variants**:
  - **Email**: Placeholder "email address", keyboard type: email-address, autocomplete: email
  - **Password**: Placeholder "password", secure entry, visibility toggle
- **Size**: (screen width - 48pt) x 52pt each

### Forgot Password Link
- **Purpose**: Navigate to password reset flow
- **Data source**: Static
- **Visual treatment**: "Forgot password?" in 15pt Sora Regular, Burnt Orange (#FF5E00), right-aligned within the form field width. This is right-aligned because it relates specifically to the password field above it.
- **Gestures**: Tap to navigate to Forgot Password [05]
- **Size**: 44pt touch target height, text width + padding

### Remember Me Toggle
- **Purpose**: Keep user signed in between sessions
- **Data source**: Local state, sent as `rememberMe` boolean with login request
- **Visual treatment**: Full-width - 48pt margins. Row layout: Left label "Remember me" (15pt Sora Regular, white at 70%), right toggle switch (34x20pt). Row height: 44pt. Positioned between the Forgot Password link and the CTA button.
- **Variants**: On (orange track, extends session duration), Off (default, standard session)
- **Gestures**: Tap toggle or tap entire row to toggle
- **Size**: (screen width - 48pt) x 44pt

### Primary CTA Button (Sign In)
- **Purpose**: Submit credentials and authenticate
- **Data source**: Triggers API call (POST /auth/login) with email, password, rememberMe
- **Visual treatment**: Identical to Sign Up [03] CTA pattern. Full-width - 48pt margins, orange pill, 56pt tall. Text: "sign in".
- **Variants**: Default, Loading (spinner), Disabled (when fields empty)
- **Size**: (screen width - 48pt) x 56pt

### Divider, Social Auth Buttons, Navigation Link
- **Purpose & visual treatment**: Identical to Sign Up [03]
- **Navigation link text**: "Don't have an account? sign up" — "sign up" in orange

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Back button icon | — | — | 20pt | — | White #FFFFFF | Chevron icon |
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "Welcome back" — sentence case |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | Same as Sign Up |
| Input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | Same as Sign Up |
| Forgot password | Sora | 400 (Regular) | 15pt | 20pt | #FF5E00 | Right-aligned within form field width, sentence case |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "sign in" |
| Divider text | Sora | 400 (Regular) | 13pt | 18pt | White at 40% | Same as Sign Up |
| Social button label | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | Same as Sign Up |
| Nav link (normal) | Sora | 400 (Regular) | 15pt | 20pt | White at 50% | "Don't have an account?" |
| Nav link (action) | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "sign up" |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary: CTA button (orange pill) — dominant interactive element
- Secondary: Heading "Welcome back" — page title
- Tertiary: Form fields — the task
- Quaternary: Social auth, forgot password, nav link — supporting paths

**Spacing**:
- Back button: 0pt below safe area (sits at top of content area)
- Back button row to logo: 24pt (--s-5)
- Logo to heading: 32pt (--s-6)
- Heading to first input: 32pt (--s-6)
- Between inputs: 16pt (--s-4)
- Password field to forgot password link: 8pt (--s-2)
- Forgot password to CTA: 16pt (--s-4)
- CTA to divider text: 24pt (--s-5)
- Divider text to social buttons: 24pt (--s-5)
- Social buttons to nav link: 32pt (--s-6)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Same as all auth screens |
| Back button icon | #FFFFFF | white | High contrast |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading | #FFFFFF | white | Primary text |
| Input fields | — | — | Same as Sign Up [03] |
| Forgot password text | #FF5E00 | brand-orange | Interactive link |
| CTA button | #FF5E00 bg, #FFFFFF text | brand-orange, white | Primary action |
| Divider, social auth | — | — | Same as Sign Up [03] |
| Nav link | White 50% + #FF5E00 | — | Same pattern as Sign Up |

**60/30/10 verification**: Identical distribution to Sign Up [03]. Orange leads on CTA, links, symbol. No green or purple. Appropriate for auth.

---

## Interaction States

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron | — |
| Pressed | White at 60%, scale(0.95) | Light impact |
| Focus-visible | Orange ring, 2pt, offset 2pt | — |

### Text Input Fields
Same 8-state model as Sign Up [03].

### Forgot Password Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text (#FF5E00) | — |
| Pressed | Orange at 60%, scale(0.98) | Light impact |
| Focus-visible | Orange underline | — |

### Primary CTA Button (Sign In)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, "sign in" white text | — |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40%, text at 50%. Active when both fields non-empty. | — |
| Loading | White spinner replaces text | — |
| Error | Reverts to default. Error message appears. | Error notification |
| Success | Brief green glow (600ms), then navigates to Home | Success notification |

### Social Auth Buttons
Same as Sign Up [03].

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop → Sign Up [03] |
| Tap | Input field | Focus field, raise keyboard |
| Tap | Forgot password link | Stack push → Forgot Password [05] |
| Tap | Sign in button | Validate and submit |
| Tap | Social auth button | Initiate OAuth flow |
| Tap | "sign up" link | Stack push → Sign Up [03] (or pop if came from Sign Up) |
| Swipe right | Screen edge (iOS) | iOS back gesture → stack pop to Sign Up [03] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Same staggered fade-in as Sign Up [03] | 280ms each | ease-out-soft |
| Input focus | Field tap | Same border transition | 160ms | ease-out-soft |
| CTA loading | Form submit | Text → spinner crossfade | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (from Sign Up or from Forgot Password back)
- **Exit to Home**: Root reset — auth stack replaced by main app tab navigator. Crossfade transition, 280ms.
- **Exit to Forgot Password**: Stack push from right, 280ms

---

## Empty States

### Day 1 (new user)
New users would not normally reach this screen — they arrive at Sign Up [03] from the carousel. If they do tap "sign in" by mistake, the form is empty with placeholders, which is the expected default.

### Error States

**Wrong credentials**:
- Error text below the password field: "Incorrect email or password. Please try again."
- Text: 13pt Sora Regular, #f44336, left-aligned, 4pt below password field
- Both input fields get red (#f44336) 2pt borders

**Account not found**:
- Same error treatment. Message: "No account found with this email."

**Network error**:
- Toast at top: "Something went wrong. Please try again."

**Too many attempts**:
- Toast at top: "Too many attempts. Please try again in 5 minutes."
- CTA button becomes disabled for the cooldown period

---

## Motivation Adaptation

Not applicable. Pre-auth screen.

---

## Keyboard Behavior

- "Next" on Email field → focus moves to Password
- "Done" on Password field → dismiss keyboard (or submit form)
- Screen scrolls if needed when keyboard is active (less likely than Sign Up due to fewer fields)

---

## Biometric Authentication (Face ID / Touch ID)

### Auto-Trigger on Mount
- If the user has previously signed in successfully AND enabled biometric auth in Settings [21], the system biometric prompt fires automatically on screen mount (after a 400ms delay for screen render).
- During biometric prompt: form fields are visible but dimmed (40% opacity). The biometric prompt is the system-native iOS/Android dialog.
- On biometric success: same flow as password sign-in success (green glow, navigate to Home [12]).
- On biometric failure or dismiss: form returns to full opacity, user can sign in manually.

### Biometric Icon Button
- **Purpose**: Manually trigger biometric auth (if auto-trigger was dismissed or failed)
- **Position**: Centered below the social auth buttons, above the "Don't have an account?" link. 32pt gap above, 24pt gap below.
- **Visual treatment**: 44x44pt touch target. Icon: Face ID icon (iOS) or fingerprint icon (Android), 24pt, white at 50%. No background, no border.
- **Visibility**: Only shown if biometric auth is enrolled on the device AND the user has previously signed in.
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Icon at white 50% | -- |
  | Pressed | Icon at white 30%, scale(0.95) | Light impact |
  | Processing | Icon pulses (opacity 50% to 80% loop, 800ms) | -- |
  | Success | Icon turns green (#34A853), 600ms | Success notification |
  | Failure | Icon flashes red (#F44336), 400ms, reverts | Error notification |

### Biometric Opt-In Prompt (Post First Login)
- **Trigger**: After the FIRST successful email/password or social auth sign-in, when the user has not yet enabled biometric auth and the device supports it.
- **Presentation**: Bottom sheet modal (standard spec: ink-brown-800 bg, --r-lg top corners, drag handle).
- **Content**:
  - Icon: Face ID or fingerprint (40pt, orange #FF5E00), centered
  - Heading: "Sign in faster?" (20pt Sora Semibold, white)
  - Body: "Use [Face ID / Touch ID] to sign in instantly next time." (15pt Sora Regular, white at 70%)
  - Primary CTA: "enable [Face ID / Touch ID]" (orange pill, 48pt, full-width minus 32pt)
  - Secondary: "not now" (15pt Sora Regular, white at 50%, center-aligned, 44pt touch target)
- **On enable**: Triggers system biometric enrollment check, saves preference, dismisses sheet, continues to Home [12].
- **On "not now"**: Dismisses sheet, continues to Home [12]. Does not ask again for 7 days.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Wrong credentials | Error text below password field: "Incorrect email or password. Please try again." (13pt Sora Regular, #f44336, 4pt below); both input fields get 2pt red borders | User corrects credentials and resubmits |
| Account not found | Same inline error treatment; message: "No account found with this email." | User corrects email or navigates to Sign Up [03] |
| Too many login attempts (429) | Toast at top: "Too many attempts. Please try again in 5 minutes." (ink-brown-800 bg, --r-md, --shadow-2, auto-dismiss 5s); CTA disabled for cooldown | CTA re-enables after cooldown period |
| Network error during sign-in | Toast: "Something went wrong. Please try again." (auto-dismiss 4s); CTA reverts to default; form data preserved | User taps "sign in" to retry |
| Google/Apple OAuth flow fails | Toast: "Google sign in failed. Try again." or "Apple sign in failed. Try again." (auto-dismiss 4s); social button reverts to default | User taps social auth button to retry |
| Biometric auth fails | Face ID / Touch ID icon flashes red (#F44336, 400ms), then reverts; form returns to full opacity for manual sign-in | User signs in manually with email and password |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Welcome back" heading on mount as the page title
- Focus order: Back button -> Logo (decorative, skipped) -> Heading -> Email input -> Password input -> Password visibility toggle -> Forgot password link -> Remember me toggle -> Sign in CTA -> Google button -> Apple button -> Biometric icon (if visible) -> "sign up" link
- Back button: accessible label "Go back to sign up"
- Password visibility toggle: accessible label toggles between "Show password" and "Hide password"
- Forgot password link: accessible label "Forgot password? Navigate to password reset."
- Remember me toggle: accessible role "switch"; label "Remember me, off" or "Remember me, on"
- Biometric icon button: accessible label "Sign in with Face ID" or "Sign in with Touch ID" depending on device
- Error messages announced via live region when they appear
- All touch targets meet minimum 44x44pt requirement

---

## Cross-References

- **Navigates to**: Screen [12] — Home Screen (Batch 3) via root reset (sign-in success), Screen [05] — Forgot Password via stack push, Screen [03] — Welcome / Sign Up via stack pop, Screen [05b] — Reset Password (via email deep-link, external)
- **Navigates from**: Screen [03] — Welcome / Sign Up via stack push
- **Shared components with**: Screen [03] — Welcome / Sign Up (input fields, CTA button, social auth buttons, divider, nav link), Screen [05] — Forgot Password (input field, CTA button, back button)
- **Patterns used**: Auth Screen Template (from [03]), Text Input Field Pattern, Brand CTA Button, Social Auth Button Pattern, Auth Divider Pattern, Auth Nav Link Pattern
- **Patterns established**: **Back Button Pattern** — left chevron, white, 20pt icon, 44x44pt touch target, 16pt left margin. Used on all non-root screens in the auth flow. **Forgot Password Link Pattern** — right-aligned within form field width, 15pt Sora Regular, orange, 44pt touch target, positioned 8pt below the password field. **Biometric Opt-In Prompt** — bottom sheet shown after first successful login on biometric-capable devices. Face ID/fingerprint icon (40pt, orange) + heading + body + enable CTA + "not now" dismiss. Reusable pattern for any post-auth system permission prompt. **Biometric Icon Button** — 24pt system biometric icon (Face ID/fingerprint), white at 50%, centered, 44pt touch target. Appears below social auth when biometric is enrolled.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-02.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/sign-in`
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
| B02-F05 | critical | conversion | Disable until valid, show validation, submit credentials, and route successful users to Today. |
| B02-F06 | major | trust-privacy | Default Remember me to off and make persistence an explicit user choice. |
| B02-F07 | major | brand-fit | Use platform-compliant provider marks with accessible labels. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

