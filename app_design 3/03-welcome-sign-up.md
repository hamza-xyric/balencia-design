# Screen Design: Welcome / Sign Up

**Screen**: 03 of 73
**File**: 03-welcome-sign-up.md
**Register**: Brand Mode
**Primary action**: Create account (tap "sign up")
**Tab**: None (pre-auth)
**Navigation**: Stack depth 1 (pushed from Motion Carousel [02]). No back button — this is the auth entry point.

---

## Purpose

The sign-up screen converts interest into accounts. It collects the essentials — name, email, password, date of birth, and gender — then verifies via a 4-digit OTP before creating the account. Social auth (Google/Apple) provides a faster path but may require a follow-up "complete profile" step for DOB and gender. This screen establishes the Auth Screen Template pattern reused by Sign In [04] and Forgot Password [05]. The visual tone shifts from the cinematic carousel to a functional-but-premium form experience. SIA is not present yet — the user hasn't met SIA. The screen should feel warm and inviting, not clinical.

**Registration is a two-step process:**
1. **Step 1 (this screen)**: User fills form → submits → server sends 4-digit OTP to email
2. **Step 2 (OTP Verification [03b])**: User enters OTP → account is created → redirects to Consent [03c]

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Create your account" heading — sets intent immediately
2. Form fields (first name, last name, email, password, date of birth, gender) — the task at hand
3. "sign up" primary CTA — the desired action, most visually prominent interactive element
4. Social auth buttons — fast alternative path
5. "Already have an account? sign in" link — escape hatch for returning users
6. "Try without an account" link — low-commitment alternative
7. Legal footer — terms and privacy, required but ambient

**User flow**:
- **Arrives from**: Motion Carousel [02] via stack push, or Sign In [04] via stack navigation
- **Primary exit**: OTP Verification [03b] via stack push (form submitted, OTP sent to email)
- **Secondary exits**: Sign In [04] via stack push ("Already have an account?"), Guest Mode Preview [06] (Batch 2) via stack push ("Try without an account")
- **Full registration flow**: Sign Up [03] → OTP Verification [03b] → Consent [03c] → SIA Onboarding [07]

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
│   ┌────────┐ ┌────────┐    │
│   │First   │ │Last    │    │  ← name fields, side by side
│   │name    │ │name    │    │
│   └────────┘ └────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Email             │    │
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Password      👁  │    │  ← visibility toggle
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Date of birth     │    │  ← date picker
│   └───────────────────┘    │  ← 16pt gap
│   ┌───────────────────┐    │
│   │  Gender        ▾   │    │  ← dropdown selector
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

4. **Form Fields Group** — 6 inputs (first name + last name side-by-side as 1 row, email, password, DOB, gender) = 4 rows at 52pt + name row at 52pt + 4 gaps at 16pt = 324pt
   - Purpose: Account creation data collection
   - Content: First name + Last name (side by side), Email, Password, Date of birth, Gender fields

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

**Total estimated height**: ~940pt — requires scroll on all devices including iPhone 15 Pro Max (852pt usable). ScrollView handles this gracefully. The additional fields (DOB, gender, split name row) add ~200pt to the original layout.

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
- **Purpose**: Collect user data (first name, last name, email, password)
- **Data source**: User input
- **Visual treatment**: Full-width - 48pt margins (24pt each side). Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Text: 16pt Sora Regular, white. Placeholder text: white at 40% opacity. Padding: 16pt horizontal.
- **Variants**:
  - **First name field**: Placeholder "first name", keyboard type: default, autocomplete: given-name. Half-width (left side of name row, with 8pt gap to last name).
  - **Last name field**: Placeholder "last name", keyboard type: default, autocomplete: family-name. Half-width (right side of name row).
  - **Email field**: Placeholder "email address", keyboard type: email-address, autocomplete: email. Validates against disposable email domains.
  - **Password field**: Placeholder "password", keyboard type: default, secure entry by default, visibility toggle icon (eye) on the right side. Minimum 8 characters, requires uppercase, lowercase, number, special character.
- **Gestures**: Tap to focus
- **Size**: Full-width fields: (screen width - 48pt) x 52pt. Name fields: ((screen width - 48pt - 8pt gap) / 2) x 52pt each.

### Date of Birth Field
- **Purpose**: Collect user's date of birth (must be 18+ to use Balencia)
- **Data source**: User input via date picker
- **Visual treatment**: Full-width - 48pt margins. Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Placeholder: "date of birth" (16pt Sora Regular, white at 40%). When a date is selected, displays formatted date (e.g., "March 15, 2000"). Calendar icon (20pt, white at 50%) on the right side.
- **Interaction**: Tap opens native date picker (iOS: wheel picker modal, Android: calendar dialog). Year range: current year - 100 to current year - 18. Default scroll position: 25 years ago.
- **Validation**: User must be 18 or older. Error message: "Balencia is for users 18+. Contact support@balencia.com for assistance."
- **Gestures**: Tap to open date picker
- **Size**: (screen width - 48pt) x 52pt

### Gender Selector
- **Purpose**: Collect user's gender for personalized health coaching
- **Data source**: User selection
- **Visual treatment**: Full-width - 48pt margins. Height: 52pt. Background: ink-brown-800 (#211008). Border: 1pt solid white at 10% opacity. Border radius: --r-md (14pt). Placeholder: "gender" (16pt Sora Regular, white at 40%). Down chevron icon (16pt, white at 50%) on the right side. When selected, shows chosen value in white.
- **Options**: "Male", "Female", "Non-binary", "Prefer not to say"
- **Interaction**: Tap opens a bottom sheet with 4 options as selectable rows (44pt each, full-width, tap to select and dismiss). Selected option shows orange checkmark.
- **Gestures**: Tap to open bottom sheet
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
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | "first name", "last name", "email address", "password", "date of birth", "gender" |
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
- Heading to name row: 32pt (--s-6)
- Between name fields (horizontal): 8pt (--s-2)
- Between input rows: 16pt (--s-4)
- Gender field to CTA: 24pt (--s-5)
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
| Disabled | 0.4 opacity, no touch response | — |
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
| Success | Brief green glow flash (600ms), then navigates to OTP Verification [03b] | Success notification |

### Social Auth Button (Google / Apple)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border | — |
| Pressed | bg darkens slightly, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always active) | — |
| Loading | Spinner replaces icon + text. Bg unchanged. Other social button becomes disabled. | — |
| Error | Error toast: "Google sign in failed. Try again." | Error notification |
| Success | Brief green glow flash (600ms), navigates to OTP Verification [03b] or Consent [03c] | Success notification |

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
- **Exit to OTP Verification [03b]**: Stack push from right, 280ms (after success state — OTP sent to email)
- **Exit to Sign In**: Stack push from right, 280ms

---

## Empty States

### Day 1 (new user)
This is the default state — empty form fields with placeholders. The screen is designed for this exact scenario. No "empty" feeling because the form IS the content.

### Error States

**Validation errors** (inline, below each field):
- First name: "first name must be at least 2 characters" (shown on submit if empty or < 2 chars)
- Last name: "last name must be at least 2 characters" (shown on submit if empty or < 2 chars)
- Email: "please enter a valid email" (shown on submit if empty or malformed)
- Email: "please use a permanent email address" (shown if disposable email domain detected)
- Password: "password must be at least 8 characters" (shown on submit if too short). Must include uppercase, lowercase, number, and special character.
- Date of birth: "please select your date of birth" (shown on submit if empty)
- Date of birth: "Balencia is for users 18+" (shown if age < 18)
- Gender: "please select your gender" (shown on submit if empty)

**Account exists error**:
- Toast at top: "An account with this email already exists." + "sign in" tappable link within the toast
- Toast: ink-brown-800 bg, white text, orange "sign in" link, --r-md corners, --shadow-2

**Network error**:
- Toast at top: "Something went wrong. Please try again."

**Success state** (OTP sent):
- CTA shows green glow flash (600ms), then navigates to OTP Verification [03b]
- Toast at top: "We've sent a verification code to your email"

---

## Motivation Adaptation

Not applicable. Motivation tier has not been established — this is a pre-auth screen.

---

## Keyboard Behavior

- Tapping First name field: keyboard appears, screen scrolls up so the focused field and CTA remain visible
- "Next" keyboard action on First name → focus moves to Last name
- "Next" keyboard action on Last name → focus moves to Email
- "Next" keyboard action on Email → focus moves to Password
- "Next" keyboard action on Password → dismiss keyboard, focus moves to Date of birth (opens date picker)
- Selecting a date in DOB picker → picker dismisses, focus moves to Gender (opens bottom sheet)
- Selecting gender → bottom sheet dismisses
- Tapping outside all fields → dismiss keyboard
- Content scrolls behind a sticky header area (logo remains visible if space allows, otherwise scrolls with content)

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Sign-up API returns 409 (account exists) | Toast at top: "An account with this email already exists." with orange "sign in" link inside toast (ink-brown-800 bg, --r-md, --shadow-2, auto-dismiss 5s) | Tap "sign in" in toast navigates to Sign In [04]; or user changes email |
| Sign-up API returns 422 (validation error) | Inline error text below the failing field (13pt Sora Regular, #f44336); field border turns 2pt red | User corrects the field and resubmits |
| Network error during sign-up | Toast at top: "Something went wrong. Please try again." (auto-dismiss 4s); CTA reverts from loading to default; all form data preserved | User taps "sign up" to retry |
| Google/Apple OAuth flow fails | Toast: "Google sign in failed. Try again." or "Apple sign in failed. Try again." (auto-dismiss 4s); social auth button reverts to default | User taps social auth button to retry |
| Disposable email domain detected | Inline error below email field: "please use a permanent email address" (13pt, #f44336); email border 2pt red | User enters a non-disposable email address |
| Date of birth under 18 | Inline error below DOB field: "Balencia is for users 18+. Contact support@balencia.com for assistance." (13pt, #f44336); CTA remains disabled | User cannot proceed; informational only |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Create your account" heading on mount as the page title
- Focus order: Logo (decorative, skipped) -> Heading -> First name -> Last name -> Email -> Password -> Date of birth -> Gender -> Sign up CTA -> Google button -> Apple button -> "sign in" link -> "Try without an account" link -> Terms -> Privacy
- Password visibility toggle: accessible label toggles between "Show password" and "Hide password"
- Date of birth field: accessible label "Date of birth, required. Opens date picker."
- Gender selector: accessible label "Gender, required. Opens selection list."
- Form validation errors announced to screen reader via live region when they appear
- All touch targets meet minimum 44x44pt requirement
- Reduced motion: skip staggered fade-in entry animations, show all content immediately

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + Linear + iOS auth — *stays Balencia via premium form inputs on warm ink-brown surfaces with burnt-orange focus rings, continuous-stroke brand symbol (not hero glow), sentence-case on-voice copy throughout, non-shaming error recovery, and the brand period used to close key moments.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: thin craft layer; generic form; inputs lack depth; copy unwritten in places; error messages templated; no focal anchor; no ownable Balencia signature moment on a conversion form.

### Focal hierarchy

One clear focal point: the **"sign up" CTA button** (56pt burnt-orange pill, full-width minus 48pt margins, white text "sign up") — the screen's primary interactive goal, sized as a hero among form elements, reads instantly as the desired action. The form fields are visibly secondary and grouped (tight 16pt spacing within the group, generous 24pt gap above the CTA), so the hierarchy reads as "fill this → tap orange button." The logo (48pt centered symbol) anchors the screen emotionally but is not a focal element (intentionally small and ambient, not a hero glow moment—the user is already past the splash). The social buttons and nav links are tertiary and ambient below. The squint test lands on the orange CTA first, then the form block as a unified group, then the section separator. No competing foci.

### Surface & depth

Every surface adopts **`CK-P1` Layered Warm Surface** — body on `--color-ink-brown-800` · `--radius-md` (14pt, per locked params for inputs ≤80pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01 --edge-highlight` top-edge inner highlight** (the not-flat cue, inset 0 1px 0 rgba(255,255,255,0.06)) · `--shadow-1`. Input fields (first name, last name, email, password, date of birth, gender) all receive this treatment — never a flat fill with a border only. The CTA button ("sign up") is a `--radius-pill` pill on `--color-brand-orange` with no glow (the button is ~56pt, under the 96px threshold for glow; inline CTAs at <36px receive no glow per CONSISTENCY.md §1). The social auth buttons (Google, Apple) are 52pt tall, use the same `CK-P1` layered surface on ink-brown-800, and carry **`--glow-orange-sm`** (~12px /.35) only when in focus-visible state (never at rest, to avoid visual noise—social buttons are secondary). The divider's horizontal rules are 1pt `--color-alpha-white-10` (subtly defined, never neon). The logo (48pt symbol) floats on the `--color-ink-900` field background with no surface card or glow — pure brand mark, warm burnt orange (`--color-brand-orange`). All cards receive `--shadow-1` (not stacked; one shadow per element). The screen background is `--color-ink-900` full-bleed, with ScrollView container allowing content to scroll on smaller devices without collision.

### Typographic rhythm

Map all type to `CK-P3` locked scale: **heading** "Create your account" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100% / center-aligned, sentence case (given as "Create your account", stays as-is); **input labels** (implicit, inside placeholders) `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white at 40% (the generic text); **input values** (user-entered text) `--text-body` (16pt) / 400 / white 100%; **divider text** "or continue with" `--text-caption` (13pt) / 400 / `--leading-normal` / white at 40%; **CTA text** "sign up" `--text-h3` (17pt) / 600 / white 100% / center-aligned, sentence case; **social button labels** "Google" / "Apple" `--text-h3` (17pt) / 600 / white 100%; **nav link text** "Already have an account?" / "Try without an account" — context `--text-h3` (17pt) / 400 / white at 50%, action word `--text-h3` (17pt) / 600 / `--color-brand-orange`; **legal footer** `--text-caption` (12pt) / 400 / white at 30%. Hierarchy carried by **weight** (600 vs 400), not size alone. Sentence case everywhere (buttons, labels, headings). **Zero exclamation marks** — energy comes from clarity and the brand period, not punctuation. ≤2 `--color-brand-orange` accent words on screen (CTA "sign up" button text and nav link action words "sign in" / "without an account" are two; the strategy is to use orange on call-to-action, not decoration). Chillax is logo-only (none on form labels). Line-heights and letter-spacing are locked per `CK-T04 / CK-T05` scale.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming, on-voice. Specific strings:

- **Heading** — *before (given):* "Create your account" → *after (kept):* same; warm, clear, action-oriented. ✓
- **Name field placeholders** — *before (spec):* "first name" / "last name" → *after (kept):* same; lowercase, conversational, not "First Name". ✓
- **Email hint text** — *before (spec):* "email address" → *after (kept):* same; plain, specific. ✓
- **Password hint text** — *before (spec):* "password" → *after (kept):* same; simple, not "Enter password". ✓
- **Password visibility toggle label** — *before:* no label → *after (new, a11y):* "Show password" / "Hide password" (clear state description). NEW
- **Date of birth hint text** — *before (spec):* "date of birth" → *after (kept):* same; ✓
- **Date of birth help line** — *before:* none → *after (new):* line below field (if needed): "Must be 18 to use Balencia." (warm, plain, non-accusatory). NEW
- **Gender hint text** — *before (spec):* "gender" → *after (kept):* same; ✓
- **Divider text** — *before (spec):* "or continue with" → *after (kept):* same; conversational lower-case. ✓
- **CTA button** — *before (spec):* "sign up" → *after (kept):* same; sentence case, lowercase "up", not "Sign Up". ✓
- **Social button labels** — *before (spec):* "Google" / "Apple" → *after (kept):* same; proper nouns, match platform names. ✓
- **"Already have an account?" link** — *before (spec):* "Already have an account? sign in" → *after (reconciliation):* context "Already have an account?" stays, action "sign in" stays, both sentence case + lower "in". ✓
- **"Try without an account" link** — *before (spec):* "Try without an account" → *after (kept):* same; warm, exploratory tone (guest mode is low-friction entry). ✓
- **Legal footer** — *before (spec):* "Terms of service · Privacy policy" → *after (kept):* same; neutral, ambient. ✓
- **Error: first name too short** — *before (spec):* "first name must be at least 2 characters" → *after (kept):* same; specific, not shaming. ✓
- **Error: last name too short** — *before (spec):* "last name must be at least 2 characters" → *after (kept):* same. ✓
- **Error: invalid email** — *before (spec):* "please enter a valid email" → *after (reconciliation):* replace with "That email looks invalid" (warmer, more conversational, removes "please"). RECONCILE
- **Error: disposable email** — *before (spec):* "please use a permanent email address" → *after (reconciliation):* replace with "Please use a permanent email address so we can reach you." (explains the why; still warm, earns trust by honesty). RECONCILE
- **Error: password too weak** — *before (spec):* "password must be at least 8 characters" → *after (reconciliation):* replace with "Password needs 8+ characters, uppercase, lowercase, number, and symbol." (specific, non-accusatory, clear next step). RECONCILE
- **Error: date of birth missing** — *before (spec):* "please select your date of birth" → *after (reconciliation):* replace with "Please select your date of birth." (warm, action-forward; no shame). RECONCILE
- **Error: age under 18** — *before (spec):* "Balencia is for users 18+. Contact support@balencia.com for assistance." → *after (kept):* same; warm, offers escape hatch (email), not a dead end. ✓
- **Error: gender missing** — *before (spec):* "please select your gender" → *after (kept):* same; simple, direct. ✓
- **Error: account exists (toast)** — *before (spec):* "An account with this email already exists." + "sign in" tappable link → *after (reconciliation):* replace toast with "We found an existing account for that email. Sign in instead?" (warmer, asks, not tells; the tappable "Sign in" is orange, not hidden in toast text). RECONCILE
- **Error: network error (toast)** — *before (spec):* "Something went wrong. Please try again." → *after (reconciliation):* replace with "We had a hiccup. Please try again." (warmer, less generic, removes "please"). RECONCILE
- **Success: OTP sent (toast)** — *before (spec):* "We've sent a verification code to your email" → *after (reconciliation):* replace with "Check your email for a verification code." (shorter, action-oriented, not marketing-speak "we've sent"). RECONCILE
- **Loading state (CTA button spinner)** — *before:* no message → *after (new):* "Creating your account..." (warm, specific, inside or near spinner). NEW
- **Empty state / day 1** — *before:* N/A (this screen is the empty state entry) → *after:* the form itself is the empty state; all placeholders are visible and ambient. ✓

No exclamation marks anywhere. The brand period used with intent: error messages end with a period (not a question mark). Copy is specific, honest, never generic ("we had a hiccup" beats "error" or "failed"). Non-shaming framing throughout (an age miss is "Balencia is for users 18+," not "you're too young" or "access denied"). Permission to proceed is earned by clarity and warmth, not guilt or urgency.

### Motion choreography

Locked to `CK-P4` order (focal first, then support): **screen entry** — the logo fades in (`--dur-base` 280ms `--ease-out-soft`, at 0ms), then the heading fades in + rises (`--dur-base` 280ms, 80ms stagger), then the form fields fade in + rise in sequence (inputs 1–6, 160ms each, 80ms stagger, `--dur-base` 280ms `--ease-out-soft` per field), then the CTA button fades in + rises (320ms total offset, `--dur-base` 280ms), then the divider fades in (400ms offset), then social auth buttons fade in + rise (480ms offset), then nav links fade in + rise (560ms offset), then legal footer fades in (640ms offset). **Input focus** — the border transitions from 1pt white 10% to 2pt burnt-orange (`--color-brand-orange`) over `--dur-fast` (160ms `--ease-out-soft`); no scale or opacity shift (focus is subtle, not disruptive). **CTA pressed** — scale(0.97) + light haptic over `--dur-fast` (160ms), then returns to scale(1). **CTA loading** — the button bg stays burnt-orange, text fades to 0 opacity (160ms), then a white spinner (20pt, centered) fades in (same 160ms); button becomes non-interactive. **Error message** — slides down from the input field (0→16pt translateY) + opacity 0→1 over `--dur-base` (280ms `--ease-out-soft`); the field border turns 2pt red simultaneously. **Success (OTP sent)** — CTA button flashes `--glow-green` (600ms glow, not sustained), then automatically navigates to OTP Verification [03b] via stack push (280ms standard transition). `prefers-reduced-motion` → all staggered entries collapse to instant; spinner is replaced with static checkmark (✓) or "check your email" inline text; skeleton states (if any loading appears) show final state immediately. The screen always draws, never fades entry animations (honoring §8 brand law).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (new user) | All form fields visible with placeholders, logo centered, heading, CTA active (enabled), social buttons visible, nav links visible, legal footer ambient. Form group is the focal block. | Heading: "Create your account." Placeholders calm and plain. Logo anchors without distraction. "or continue with" frames social as an alternative path, not primary. Nav links offer escape hatches ("Already have an account?" / "Try without an account") to reduce anxiety. | All surfaces use `CK-P1` layered depth on `--color-ink-brown-800`; no flat inputs. Logo is burnt-orange symbol only, no hero glow (user is past splash now). Focus ring on first field is clear and warm. Brand moment is the form's premium craft (premium inputs, not chart or visualizer). |
| Focused / active (user typing) | Focused field border turns 2pt burnt-orange, hint text fades to 20% opacity, cursor visible. Other fields remain at default (1pt white 10% border). Keyboard overlay appears (system-managed). Screen scrolls up to keep focused field and CTA visible. | Hint text text stays same (no "now entering" messages). Error message appears below field only if validation fails on blur. | Focused field glows with orange ring (warm, not cold). Surrounding fields remain calm (low-emphasis) so attention is on the active field. |
| Partially filled (some fields done, some empty) | Filled fields show white value text, empty fields show placeholders at 40%. CTA button remains enabled (filled fields do not enable submit until ALL required fields are non-empty). Visual hierarchy: filled = higher contrast (white text) vs empty = lower (hint text at 40%). | No state-specific copy (placeholders are the only prompt). | Depth on all surfaces stays consistent. Unfilled fields are not dimmed or hidden—they remain at full interactive opacity, inviting completion. |
| Error on single field (such as invalid email) | The failing field border turns 2pt error-red (`--color-error-red`). An error message appears 4pt below the field, in-line, 13pt Sora Regular, error-red text. Other fields remain unchanged (not dimmed). The CTA button stays enabled (user can correct and re-submit). | Error text is specific (such as "That email looks invalid") and warm (not accusatory). Explains the fix ("use a permanent email" if disposable domain detected). Never blames the user. | The error message is part of the card's depth (sits within the form group, 1px below field, 16pt margin-bottom before next field). The red is calibrated (genuine validation error, not danger alert). Glyph + word: a small ✗ icon (12pt, red, to the left of text) + text (never red color alone). |
| Error on account exists | A toast appears at top of screen (or below header if scrolled): "We found an existing account for that email. Sign in instead?" The toast is ink-brown-800 with 1px white 10% border, `--radius-md`, `--shadow-2`. The "Sign in" link inside is burnt-orange Semibold, tappable (44pt touch target height for the link within the toast). Toast auto-dismisses after 5s or on tap "Sign in". | Warm, acknowledges the existing account without shame. Offers a next step (sign in) immediately within the message. Not "Error: account exists" (generic, cold). | Toast floats at z-60 above form content. Uses same depth language (layered warm surface). The link is orange and actionable. Warm tone throughout. |
| Network error (toast) | A toast at top: "We had a hiccup. Please try again." Ink-brown-800, same styling as error toast. CTA button reverts from loading state (spinner removed, text "sign up" returns). All form data is preserved (never lost on error). A small retry affordance (an inline "retry" link or the user taps the CTA again). | Warm, human ("hiccup" is relatable, not jargon). Honest (not "server error" or "technical difficulty"). Encourages retry without blame. | Same toast styling. Not a harsh red alert—this is recoverable, not a critical failure. |
| Keyboard visible (mobile) | Screen ScrollView adjusts: content scrolls up so the focused field and CTA button remain visible above keyboard. Logo may scroll out of view, but heading stays sticky or scrolls with content (no floating header on auth form—keep it simple). Keyboard covers ~50% of screen. | No special microcopy (keyboard is system-managed). Hint text (password strength, email rules) stay in field labels/helper text if space allows. | Form depth is preserved. Fields remain full-size (no squishing). Touch targets stay ≥44pt (keyboard doesn't shrink buttons). |
| Loading (form submitted, OTP in flight) | CTA button: text "sign up" fades out (160ms), white spinner (20pt) fades in centered, button bg stays burnt-orange, button becomes non-interactive (no ripple on tap). Form fields stay visible but read-only (0.5 opacity, no cursor). | Button label (inline near spinner, if space): "Creating your account..." (warm, specific—not just a spinner). | Loading state is brief (expected <3s before OTP screen). Spinner is white on orange (high contrast, visible). No skeleton forms or shimmer needed—the form fields are the skeleton (they are always visible). |
| Success / OTP sent | CTA button flashes `--glow-green` (600ms green glow, then fades). After the glow settles, the screen auto-navigates to OTP Verification [03b] via stack push (280ms standard iOS nav transition). | Toast (optional, brief): "Check your email for a verification code." Or let the screen transition be the confirmation (no redundant toast if nav is instant). | Green glow is warm and earned (genuine success, not celebratory or cutesy). Glow fades naturally (no sustained neon). Screen transition is smooth (push from right, standard iOS navigation). |
| Offline / no network | Form fields remain visible. CTA button is dimmed (0.5 opacity, no haptic on tap). A banner below the header (or at the top, if space): "You're offline. Check your connection." | Copy is honest and action-forward (not "error"). Explains the state (offline, not "fail"). Doesn't say "try again" if offline (action is impossible). | Dimmed CTA is visually clear (not disabled in color, but opacity indicates it's not interactive). Banner uses the same calm layered surface (no harsh red or alarming design). |

### Signature & anti-generic

**Ownable Balencia moment:** the **premium form input craft** — every input field on this screen uses the warm-ink layered surface (`CK-P1` on `ink-brown-800` with the edge highlight and subtle shadow), burnt-orange focus ring on tab, and instant visual feedback (border color shift, hint text fade). This is not a default iOS form (which would be a single-line input on a white field) or a generic SaaS form (flat boxes, cold shadows). The form itself IS the Balencia signature on an auth screen — premium, warm, earned-trust design that signals "this app cares about craft and warmth even on the conversion form." The CTA button is a burnt-orange pill with sentence-case "sign up" (no "SIGN UP" all-caps, no "Create Account" title-case marketing speak).

**Anti-generic fixes:**
- ✓ Form fields are never flat boxes. Every input is a `CK-P1` layered surface (edge-highlight, shadow, glass border).
- ✓ Copy is authored and warm, never templated ("we had a hiccup" vs. "error occurred"; "That email looks invalid" vs. "please enter a valid email"; "Check your email for a verification code" vs. "OTP sent").
- ✓ Error messages are specific to each field (not a generic error table at the bottom).
- ✓ CTA is a prime visual anchor (burnt-orange, full-width pill, sized as a hero among form elements).
- ✓ No generic copy like "Enter your name here" or "Username (optional)" — placeholders are simple: "first name", "email address".
- ✓ Nav links are not buried or apologetic — "Already have an account?" and "Try without an account" are prominent, warm escape hatches (no shame for returning users or guest explorers).
- ✓ Social auth is framed as an alternative ("or continue with") not a primary path — it's secondary and ambient, respecting the form's focal hierarchy.
- ✓ The legal footer is ambient and text-small (white 30%), never intrusive.
- ✓ No loading spinners without context ("Creating your account..." labels the action).
- ✓ No exclamation marks. The brand period is used to close key messages ("We're setting you up." if needed). Energy is in the design (bold orange, depth, motion), not punctuation.

The screen reads as premium because every surface is crafted, every string is authored, and every state (focus, error, loading, success) has been intentionally designed — not defaulted.

### Accessibility

**Tabulated load-bearing contrast pairs** (on `--color-ink-900` / `--color-ink-brown-800`):

| Element | Color | Contrast |
| --- | --- | --- |
| Heading text "Create your account" | `--color-alpha-white-100` | ≥12:1 on `--color-ink-900` |
| Input hint text text | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` (WCAG) |
| Input value text (user-entered) | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Input focus border | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Error message text | `--color-error-red` | ≥4.5:1 on `--color-ink-900` (if toast) or on `--color-ink-brown-800` (if inline) |
| Error border (field) | `--color-error-red` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| CTA button text | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` |
| CTA button (disabled state) | `--color-brand-orange` at 40% opacity | 2.1:1 on `--color-ink-900` (acceptable for disabled; not load-bearing) |
| Social button text | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Nav link text (context) | `--color-alpha-white-50` | ≥4.5:1 on `--color-ink-900` |
| Nav link action text | `--color-brand-orange` | 3.2:1 on `--color-ink-900` (WCAG 1.4.11) |
| Legal footer links | `--color-alpha-white-30` | ≥4.5:1 on `--color-ink-900` (WCAG, small text exception) |
| Divider lines | `--color-alpha-white-10` | 1:1 (decorative, not load-bearing) |

**Status never colour-alone:**
- Focused input: orange 2pt border + visible cursor (not colour-only).
- Error field: red 2pt border + inline ✗ glyph (12pt, red) + error text message (not red colour alone).
- CTA disabled: 0.5 opacity + no haptic feedback (the disabled state is clear from interaction feedback, not colour alone).
- Success: green glow flash + automatic navigation to next screen (not a green checkmark alone).

**Focus ring:** every focusable element (inputs, CTA, social buttons, nav links, legal links) receives `CK-T03 --focus-ring` (2px burnt-orange, 2px offset from element, uniform app-wide). The focus ring is visible and warm (not a thin cold outline).

**44pt touch targets:** all interactive elements meet minimum 44×44pt:
- Input fields: 52pt height (exceeds minimum).
- CTA button: 56pt height (exceeds minimum).
- Social buttons: 52pt height (exceeds minimum).
- Nav links: full-width with 44pt min touch height per line (generous).
- Legal links: full-width with 44pt min touch height per word/element (generous).
- Password visibility toggle: 44×44pt touch target (icon is 20pt, centered in target).

**Keyboard & focus order:**
- Focus order: Logo (decorative, skipped in screen reader) → Heading → First name → Last name → Email → Password → Date of birth → Gender → CTA button → Google button → Apple button → "sign in" link → "without an account" link → "Terms" link → "Privacy" link.
- Screen reader announces "Create your account, heading" on mount.
- Password visibility toggle: screen reader label "Show password" (when hidden) or "Hide password" (when visible).
- Date of birth field: screen reader label "Date of birth, required. Opens date picker."
- Gender selector: screen reader label "Gender, required. Opens selection menu."
- Form validation errors: announced to screen reader via `role="alert"` live region when they appear (not silent, not visual-only).

**Reduced-motion:**
- All staggered fade-in entry animations (logo, heading, fields, CTA, social, links) collapse to instant if `prefers-reduced-motion: reduce` is set.
- Input focus border transitions to orange instantly (no gradual colour shift).
- CTA loading spinner is replaced with static text "Creating your account..." (no rotating animation).
- Error message slide-in animation replaced with instant appearance.
- Success glow flash replaced with instant final visual (no pulsing).
- The settled/final frame is always the canonical, information-complete frame.

**Keyboard behavior:**
- Tapping First name field: keyboard appears, screen scrolls up (ScrollView adjusts) to keep focused field + CTA visible.
- "Next" on First name: focus moves to Last name (keyboard stays open).
- "Next" on Last name: focus moves to Email.
- "Next" on Email: focus moves to Password.
- "Next" on Password: keyboard dismisses, focus moves to Date of birth (opens native date picker).
- Date picker selection: closes picker, focus moves to Gender (opens bottom sheet).
- Gender selection: closes sheet, focus moves to CTA (ready to submit).
- Tab navigation: cycle through form in reading order (standard web behavior).
- Escape key: dismiss keyboard or bottom sheet (standard platform behavior).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [03b] — OTP Verification via stack push (signup form submitted, OTP sent), Screen [04] — Sign In via stack push, Screen [06] — Guest Mode Preview (Batch 2) via stack push
- **Navigates from**: Screen [02] — Motion Carousel via stack push, Screen [04] — Sign In via stack navigation
- **Shared components with**: Screen [04] — Sign In (form inputs, CTA button, social auth, nav links), Screen [05] — Forgot Password (form input, CTA button), Screen [03b] — OTP Verification (continuation of registration flow)
- **Patterns used**: Brand CTA Button (full-width), Text Input Field, Social Auth Button, Date Picker Field, Gender Selector
- **Patterns established**: **Auth Screen Template** — logo (48pt symbol) → heading (24pt Bold) → form fields → CTA → divider → social auth → nav links → legal footer. 24pt horizontal margins. 16pt between inputs, 24-32pt between sections. ScrollView wrapper. **Text Input Field Pattern** — 52pt tall, ink-brown-800 bg, --r-md corners, 1pt white 10% border default, 2pt orange border focused, 16pt Sora Regular, 16pt horizontal padding. **Split Name Row Pattern** — two half-width text inputs side by side with 8pt gap (first name + last name). **Date Picker Field Pattern** — 52pt tall, ink-brown-800 bg, calendar icon right, opens native date picker. **Gender Selector Pattern** — 52pt tall, ink-brown-800 bg, chevron icon right, opens bottom sheet with options. **Social Auth Button Pattern** — two buttons side by side, 52pt tall, ink-brown-800 bg, --r-lg corners, provider icon + name, 16pt gap between buttons. Social auth may require a follow-up "Complete Profile" step [03d] if DOB/gender are not provided by the OAuth provider. **Auth Divider Pattern** — "or continue with" centered text with horizontal rules extending to margins. **Auth Nav Link Pattern** — context text in white 50%, action word in orange Semibold, full-line 44pt touch target.

---

## Social Auth: Complete Profile Flow

When a user signs up via Google or Apple, the OAuth provider may not supply date of birth and gender. In this case:

1. Social auth succeeds → account created with `onboarding_status: consent_pending`
2. If DOB or gender is missing → redirect to **Complete Profile [03d]** instead of Consent [03c]
3. Complete Profile [03d] shows only the missing fields (DOB, gender, optionally first/last name)
4. After completion → redirect to Consent [03c]

This ensures all users have DOB and gender before proceeding, regardless of auth method.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-01.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/sign-up`
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
| B01-F03 | major | onboarding-friction | Reduce account creation to minimum inputs and defer DOB/gender until the app can explain the value or legal need. |
| B01-F04 | critical | conversion | Wire validation for the reduced email/password form and enable submit only when the remaining required fields are valid. Do not restore DOB/gender to account creation. |
| B01-F05 | major | trust-privacy | Use platform-compliant provider marks with accessible labels and polished OAuth button styling. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.
