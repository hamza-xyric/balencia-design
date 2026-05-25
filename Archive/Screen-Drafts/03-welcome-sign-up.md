# Screen Design: Welcome / Sign Up

**Screen**: 03 of 43
**File**: 03-welcome-sign-up.md
**Register**: Brand Mode
**Primary action**: Create account (tap "sign up")
**Tab**: None (pre-auth)
**Navigation**: Stack depth 1 (pushed from Motion Carousel [02]). No back button — this is the auth entry point.

---

## Purpose

The sign-up screen converts interest into accounts. It must feel effortless — three fields and a button, or one tap for social auth. This screen establishes the Auth Screen Template pattern reused by Sign In [04] and Forgot Password [05]. The visual tone shifts from the cinematic carousel to a functional-but-premium form experience. SIA is not present yet — the user hasn't met SIA. The screen should feel warm and inviting, not clinical.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Create your account" heading — sets intent immediately
2. Form fields (name, email, password) — the task at hand
3. "sign up" primary CTA — the desired action, most visually prominent interactive element
4. Social auth buttons — fast alternative path
5. "Already have an account? sign in" link — escape hatch for returning users
6. "Try without an account" link — low-commitment alternative
7. Legal footer — terms and privacy, required but ambient

**User flow**:
- **Arrives from**: Motion Carousel [02] via stack push, or Sign In [04] via stack navigation
- **Primary exit**: SIA Onboarding Conversation [07] (Batch 2) via stack push (successful account creation)
- **Secondary exits**: Sign In [04] via stack push ("Already have an account?"), Guest Mode Preview [06] (Batch 2) via stack push ("Try without an account")

---

## Layout

**Scroll behavior**: ScrollView (content may exceed viewport on smaller devices like iPhone SE, especially with keyboard visible)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│         ┌───────┐           │
│         │ Logo  │           │  ← Symbol only, 48pt, centered
│         └───────┘           │
│                             │  ← 32pt gap
│   "Create your account"    │  ← heading, center-aligned
│                             │  ← 32pt gap
│   ┌───────────────────┐    │
│   │  Name              │    │  ← input field, full-width - 48pt
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Email             │    │
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Password      👁  │    │  ← visibility toggle
│   └───────────────────┘    │
│                             │  ← 24pt gap
│   ┌───────────────────┐    │
│   │     sign up        │    │  ← primary CTA, orange pill
│   └───────────────────┘    │
│                             │  ← 24pt gap
│   ──── or continue with ───│  ← divider
│                             │  ← 24pt gap
│   ┌──────┐    ┌──────┐     │
│   │Google│    │Apple │     │  ← social auth buttons, side by side
│   └──────┘    └──────┘     │
│                             │  ← 32pt gap
│   "Already have an account? │
│    sign in"                 │  ← text link, center-aligned
│                             │  ← 12pt gap
│   "Try without an account"  │  ← text link, center-aligned
│                             │  ← 24pt gap
│   Terms · Privacy           │  ← legal links, center-aligned
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Logo Area** — 48pt logo + 32pt top margin + 32pt bottom margin = 112pt
   - Purpose: Brand anchor
   - Content: Balencia symbol only (not full lockup — save space on mobile)

3. **Heading** — 30pt text + 32pt bottom margin = 62pt
   - Purpose: Set intent
   - Content: "Create your account"

4. **Form Fields Group** — 3 inputs at 52pt each + 2 gaps at 16pt = 188pt
   - Purpose: Account creation data collection
   - Content: Name, Email, Password fields

5. **Primary CTA** — 56pt button + 24pt top margin = 80pt
   - Purpose: Submit form
   - Content: "sign up" pill button

6. **Divider** — 20pt text + 24pt top margin + 24pt bottom margin = 68pt
   - Purpose: Separate form auth from social auth
   - Content: "or continue with" text with horizontal rules

7. **Social Auth Buttons** — 52pt buttons = 52pt
   - Purpose: One-tap sign up via Google or Apple
   - Content: Two buttons side by side

8. **Navigation Links** — ~60pt
   - Purpose: Alternative paths
   - Content: "Already have an account? sign in" + "Try without an account"

9. **Legal Footer** — ~40pt
   - Purpose: Terms and privacy compliance
   - Content: "Terms of service" and "Privacy policy" links

10. **Home Indicator Zone** — 34pt

**Total estimated height**: ~740pt — fits on iPhone 15 Pro Max (852pt usable) but needs scroll on iPhone SE (667pt usable). ScrollView handles this gracefully.

---

## Components

### Brand Symbol (Small)
- **Purpose**: Brand anchor — smaller than splash, establishes that this is a Balencia screen
- **Data source**: Static asset
- **Visual treatment**: Balencia bird symbol, Burnt Orange (#FF5E00), centered. No wordmark (space conservation). No hero glow (not a brand moment screen).
- **Variants**: None
- **Gestures**: None
- **Size**: 48x48pt

### Screen Heading
- **Purpose**: Communicate the screen's intent in one line
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Sentence case. No accent word — the heading is functional, not marketing.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width - 48pt margins

### Text Input Field
- **Purpose**: Collect user data (name, email, password)
- **Data source**: User input
- **Visual treatment**: Full-width - 48pt margins (24pt each side). Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Text: 16pt Sora Regular, white. Placeholder text: white at 40% opacity. Padding: 16pt horizontal.
- **Variants**:
  - **Name field**: Placeholder "full name", keyboard type: default, autocomplete: name
  - **Email field**: Placeholder "email address", keyboard type: email-address, autocomplete: email
  - **Password field**: Placeholder "password", keyboard type: default, secure entry by default, visibility toggle icon (eye) on the right side
- **Gestures**: Tap to focus
- **Size**: (screen width - 48pt) x 52pt

### Password Visibility Toggle
- **Purpose**: Show/hide password text
- **Data source**: Local toggle state
- **Visual treatment**: Eye icon (outlined, 2pt stroke), 20pt, white at 50% opacity. Positioned 16pt from right edge of password field, vertically centered. When active (password visible): filled eye icon, white at 70%.
- **Variants**: Hidden (eye-off) / Visible (eye)
- **Gestures**: Tap to toggle
- **Size**: 44x44pt touch target (icon visually 20pt)

### Primary CTA Button (Sign Up)
- **Purpose**: Submit the sign-up form
- **Data source**: Triggers API call (POST /auth/signup)
- **Visual treatment**: Full-width - 48pt margins. Burnt Orange (#FF5E00) background. White text "sign up", 17pt Sora Semibold (600), center-aligned. Height: 56pt. Border radius: --r-pill (999pt). Sentence case.
- **Variants**: Default, Loading (spinner replaces text), Disabled (when fields incomplete)
- **Gestures**: Tap to submit
- **Size**: (screen width - 48pt) x 56pt

### Divider with Text
- **Purpose**: Visually separate form auth from social auth
- **Data source**: Static
- **Visual treatment**: Horizontal line (1pt, white at 10% opacity) on each side of centered text "or continue with" (13pt Sora Regular, white at 40%). Lines extend from text to horizontal margins (24pt each side). Text has 12pt padding on each side.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width x 20pt

### Social Auth Button
- **Purpose**: One-tap authentication via third-party provider
- **Data source**: Triggers OAuth flow
- **Visual treatment**: Two buttons side by side with 16pt gap between them. Each button: ink-brown-800 (#211008) background, 1pt border white at 10% opacity, border radius --r-lg (20pt). Provider icon (20pt, full color) + provider name (15pt Sora Semibold, white). Center-aligned content. Height: 52pt.
- **Variants**:
  - **Google**: Google "G" multicolor icon + "Google"
  - **Apple**: Apple logo (white) + "Apple"
- **Gestures**: Tap to initiate OAuth
- **Size**: Each button is (screen width - 48pt - 16pt gap) / 2 x 52pt. Approximately 155pt x 52pt on iPhone SE.

### Navigation Text Link
- **Purpose**: Navigate to alternative paths
- **Data source**: Static
- **Visual treatment**: Center-aligned text. The navigational word is Burnt Orange (#FF5E00) and tappable. The surrounding text is white at 50%.
  - "Already have an account? sign in" — "sign in" in orange
  - "Try without an account" — "without an account" in orange
- **Variants**: Two links
- **Gestures**: Tap on the full text line (generous touch target, not just the orange word)
- **Size**: Full-width x 44pt touch target per link

### Legal Footer Links
- **Purpose**: Legal compliance — terms of service and privacy policy
- **Data source**: Static (links to web views)
- **Visual treatment**: "Terms of service" · "Privacy policy" — 12pt Sora Regular, white at 30% opacity, center-aligned. Separated by a middle dot (·) in white at 20%. Tapping opens in-app browser.
- **Variants**: None
- **Gestures**: Tap to open web view
- **Size**: ~200pt wide x 16pt text, 44pt touch target height

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Heading | Sora | 700 (Bold) | 24pt | 30pt | White #FFFFFF | "Create your account" — sentence case |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "full name", "email address", "password" |
| Input value | Sora | 400 (Regular) | 16pt | 22pt | White #FFFFFF | User-entered text |
| CTA button | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "sign up" — sentence case |
| Divider text | Sora | 400 (Regular) | 13pt | 18pt | White at 40% | "or continue with" |
| Social button label | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "Google", "Apple" |
| Nav link (normal) | Sora | 400 (Regular) | 15pt | 20pt | White at 50% | "Already have an account?" |
| Nav link (action) | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "sign in", "without an account" |
| Legal links | Sora | 400 (Regular) | 12pt | 16pt | White at 30% | "Terms of service · Privacy policy" |

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary CTA (orange pill) is the most visually prominent interactive element
- Heading reads clearly as the page title
- Form fields form a clear grouped block (tight 16pt spacing within, generous 24-32pt spacing to elements above and below)
- Social auth buttons are visually secondary to the primary CTA
- Legal text is nearly invisible — present but ambient

**Spacing breakdown (8pt grid)**:
- Safe area to logo: 32pt (--s-6)
- Logo to heading: 32pt (--s-6)
- Heading to first input: 32pt (--s-6)
- Between inputs: 16pt (--s-4)
- Last input to CTA: 24pt (--s-5)
- CTA to divider: 24pt (--s-5)
- Divider to social buttons: 24pt (--s-5)
- Social buttons to nav links: 32pt (--s-6)
- Between nav links: 12pt (--s-3)
- Nav links to legal footer: 24pt (--s-5)
- Legal footer to bottom safe area: 16pt (--s-4)

**Z-layers**:
- z-0: ink-900 background
- z-10: Input fields, social auth buttons (elevated surfaces)
- z-20: CTA button (most prominent interactive element)
- z-30: Keyboard overlay (when focused)
- z-60: Error toasts (if needed)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Brand symbol | #FF5E00 | brand-orange | Brand anchor |
| Heading text | #FFFFFF | white | Primary text |
| Input background | #211008 | ink-brown-800 | Elevated surface |
| Input border (default) | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| Input border (focused) | #FF5E00 | brand-orange | Focus indicator — 2pt |
| Input text | #FFFFFF | white | User input |
| Input placeholder | rgba(255,255,255,0.4) | white at 40% | Hint text |
| Visibility toggle icon | rgba(255,255,255,0.5) | white at 50% | De-emphasized |
| CTA background | #FF5E00 | brand-orange | Primary action (60% rule) |
| CTA text | #FFFFFF | white | High contrast |
| CTA disabled bg | rgba(255,94,0,0.4) | brand-orange at 40% | Muted when fields empty |
| Divider line | rgba(255,255,255,0.1) | white at 10% | Subtle separator |
| Divider text | rgba(255,255,255,0.4) | white at 40% | Ambient |
| Social button bg | #211008 | ink-brown-800 | Card surface |
| Social button border | rgba(255,255,255,0.1) | white at 10% | Subtle definition |
| Nav link text | rgba(255,255,255,0.5) | white at 50% | Secondary text |
| Nav link action | #FF5E00 | brand-orange | Tappable indicator |
| Legal text | rgba(255,255,255,0.3) | white at 30% | Ambient |
| Error border | #f44336 | color-error | Validation error |
| Error text | #f44336 | color-error | Error message |

**60/30/10 verification**: Orange appears on the CTA button (dominant interactive element), input focus borders, nav link actions, and brand symbol — clearly the primary accent. No green on this screen (no success states in default view). No purple (SIA not present). Appropriate for an auth screen.

---

## Interaction States

### Text Input Field
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, placeholder text | — |
| Focused | 2pt orange (#FF5E00) border, placeholder fades to 20%, cursor appears | Light impact |
| Filled | White text replaces placeholder, border returns to 1pt white 10% | — |
| Error | 2pt red (#f44336) border, error message appears 4pt below field (13pt, red) | Error notification |
| Disabled | 0.5 opacity, no touch response | — |
| Loading | N/A | — |

### Password Visibility Toggle
| State | Visual | Haptic |
|-------|--------|--------|
| Default (hidden) | Eye-off icon, white at 50% | — |
| Pressed | Scale(0.9) | Light impact |
| Active (visible) | Eye icon filled, white at 70% | Light impact |

### Primary CTA Button (Sign Up)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text "sign up" | — |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | Orange at 40% opacity, text at 50%. Active when all fields non-empty. | — |
| Loading | Orange bg, white spinner (20pt) replaces text, button non-interactive | — |
| Error | Reverts to Default. Error toast appears at top of screen. | Error notification |
| Success | Brief green glow flash (600ms), then navigates to SIA Onboarding | Success notification |

### Social Auth Button (Google / Apple)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border | — |
| Pressed | bg darkens slightly, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always active) | — |
| Loading | Spinner replaces icon + text. Bg unchanged. Other social button becomes disabled. | — |
| Error | Error toast: "Google sign in failed. Try again." | Error notification |
| Success | Brief green glow flash (600ms), navigates to SIA Onboarding | Success notification |

### Navigation Text Links
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White 50% context + orange action word | — |
| Pressed | Entire text line at 40% opacity, scale(0.98) | Light impact |
| Focus-visible | Orange underline on action word | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Input field | Focus field, raise keyboard |
| Tap | Outside inputs (while keyboard up) | Dismiss keyboard |
| Tap | Sign up button | Validate and submit form |
| Tap | Social auth button | Initiate OAuth flow |
| Tap | "sign in" link | Navigate to Sign In [04] |
| Tap | "without an account" link | Navigate to Guest Mode [06] |
| Tap | Legal links | Open in-app web view |
| Scroll | Screen content | Scroll when content exceeds viewport (keyboard up) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | Staggered fade-in: logo (0ms), heading (80ms), inputs (160ms each), CTA (320ms), social (400ms), links (480ms). All: opacity 0→1, translateY(12pt→0) | 280ms each (--dur-base) | ease-out-soft |
| Input focus border | Field focus | Border transitions from 1pt white 10% to 2pt orange | 160ms (--dur-fast) | ease-out-soft |
| CTA loading spinner | Form submit | Text crossfades to spinner | 160ms (--dur-fast) | ease-out-soft |
| Error message | Validation fail | Slide down from field (0→16pt), opacity 0→1 | 280ms (--dur-base) | ease-out-soft |
| Keyboard | Input focus | Native keyboard animation (system controlled) | ~250ms | System |

**Screen transition**:
- **Enter**: Stack push from right (standard iOS navigation), 280ms
- **Exit to SIA Onboarding**: Stack push from right, 280ms (after success state)
- **Exit to Sign In**: Stack push from right, 280ms

---

## Empty States

### Day 1 (new user)
This is the default state — empty form fields with placeholders. The screen is designed for this exact scenario. No "empty" feeling because the form IS the content.

### Error States

**Validation errors** (inline, below each field):
- Name: "please enter your name" (shown on submit if empty)
- Email: "please enter a valid email" (shown on submit if empty or malformed)
- Password: "password must be at least 8 characters" (shown on submit if too short)

**Account exists error**:
- Toast at top: "An account with this email already exists." + "sign in" tappable link within the toast
- Toast: ink-brown-800 bg, white text, orange "sign in" link, --r-md corners, --shadow-2

**Network error**:
- Toast at top: "Something went wrong. Please try again."

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established — this is a pre-auth screen.

---

## Keyboard Behavior

- Tapping Name field: keyboard appears, screen scrolls up so the focused field and CTA remain visible
- "Next" keyboard action on Name field → focus moves to Email
- "Next" keyboard action on Email field → focus moves to Password
- "Done" keyboard action on Password field → dismiss keyboard
- Tapping outside all fields → dismiss keyboard
- Content scrolls behind a sticky header area (logo remains visible if space allows, otherwise scrolls with content)

---

## Cross-References

- **Navigates to**: Screen [07] — SIA Onboarding (Batch 2) via stack push (signup success), Screen [04] — Sign In via stack push, Screen [06] — Guest Mode Preview (Batch 2) via stack push
- **Navigates from**: Screen [02] — Motion Carousel via stack push, Screen [04] — Sign In via stack navigation
- **Shared components with**: Screen [04] — Sign In (form inputs, CTA button, social auth, nav links), Screen [05] — Forgot Password (form input, CTA button)
- **Patterns used**: Brand CTA Button (full-width), Text Input Field, Social Auth Button
- **Patterns established**: **Auth Screen Template** — logo (48pt symbol) → heading (24pt Bold) → form fields → CTA → divider → social auth → nav links → legal footer. 24pt horizontal margins. 16pt between inputs, 24-32pt between sections. ScrollView wrapper. **Text Input Field Pattern** — 52pt tall, ink-brown-800 bg, --r-md corners, 1pt white 10% border default, 2pt orange border focused, 16pt Sora Regular, 16pt horizontal padding. **Social Auth Button Pattern** — two buttons side by side, 52pt tall, ink-brown-800 bg, --r-lg corners, provider icon + name, 16pt gap between buttons. **Auth Divider Pattern** — "or continue with" centered text with horizontal rules extending to margins. **Auth Nav Link Pattern** — context text in white 50%, action word in orange Semibold, full-line 44pt touch target.
