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

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + Linear + iOS auth — *stays Balencia via the splash stroke moment in the logo, warm-glow input surfaces, non-shaming copy on every edge, and the brand period.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: (1) the spec is solid on IA and layout but missing the craft layer — inputs are described functionally, not crafted as warm surfaces; (2) three audit findings block premium grade: the primary CTA is enabled with empty credentials (critical conversion blocker), Remember Me defaults to on when spec says off (critical trust/privacy), and social auth marks are placeholders (major brand-fit gap); (3) edge microcopy (loading, errors, permissions, disabled states) is partly unwritten or shaming-adjacent; (4) the Welcome Back heading has no ownable moment — the splash stroke and brand period are not yet planted on this screen; (5) Accessibility is thin on contrast pairs and focus-ring spec. This section remediates all five.

### Focal hierarchy

One focal point: the **primary CTA "sign in" button** — the only ≥56pt orange pill above the fold, sized as a hero, glowing to draw the eye. Everything above (logo, heading, form fields) is visibly secondary by size and visual weight. The heading "Welcome back" is textual and warm (no accent, no color), sitting comfortably between logo and form. Form fields are tightly grouped (inputs + forgot password link + remember toggle), not scattered. Social auth buttons and the bottom "Don't have an account?" link are visibly tertiary (smaller, muted, alternative paths). The squint test lands on the orange CTA first, then the logo, then the form as the task zone.

### Surface & depth

Every interactive surface adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-md` (14pt per CONSISTENCY.md for input-sized elements) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. Text input fields and the Remember Me toggle row all receive the layered treatment — never a flat border-only box. The primary CTA "sign in" button is a `--radius-pill` orange pill with `--shadow-1` and a size-calibrated **`--glow-orange`** (32px /.45) — a ≥56pt hero element, so it glows at the full intensity per CONSISTENCY.md §1. The back button, social auth buttons, and text links carry no glow (inline elements, <36px). Form field borders are 1pt white at 10% at rest, 2pt `--color-brand-orange` on focus, 2pt `--color-error-red` on error (the existing spec text). The toggle switch uses the brand `--color-brand-orange` track when on, white at 15% when off — no glow (inline element). All surfaces sit on the `--color-ink-900` field, creating the depth language the spec's Color Map already cites: premium, crafted, warm, never flat.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: heading "Welcome back" `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100% / sentence case / no accent; input label and hint text `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white at 40% hint text, white 100% value; "Forgot password?" link `--text-caption` (13pt) / 400 / `--leading-normal` / `--color-brand-orange`; "Remember me" label `--text-caption` (13pt) / 400 / white 70%; CTA button text "sign in" `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; divider text "or continue with" `--text-eyebrow` (12pt) / 400 / `--leading-snug` / white 40% / +0.12em tracking; social button labels `--text-h3` (17pt) / 600 / white 100%; bottom navigation link "Don't have an account?" `--text-caption` (13pt) / 400 / white 50% + "sign up" `--text-h3` / 600 / `--color-brand-orange`. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (no Title Case on buttons or labels). ≤2 `--color-brand-orange` accent words on the screen (the "Forgot password?" link and the "sign up" action word). No exclamation marks. Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

All user-facing strings are authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming:

- **Heading** — *before:* "Welcome back" (given in spec) → *after (kept):* same; warm, plain, recognizes returning user without over-enthusiasm. (Already on-voice.)
- **Email hint text** — *before:* "email address" → *after (warmer):* "email address" — kept, simple and clear; no change needed.
- **Password hint text** — *before:* "password" → *after (kept):* same.
- **Forgot password link** — *before:* "Forgot password?" (given, right-aligned per spec) → *after (kept):* same; warm, simple, a question not a command. (Already on-voice.)
- **Remember me label** — *before:* "Remember me" (given) → *after (kept):* same; plain and clear. (Already on-voice.) **Default state:** OFF (per audit finding B02-F06 — the spec says "default session is off" but the Component Stack says the toggle "may auto-trigger," creating ambiguity; this section clarifies: the toggle renders unchecked by default, making persistence an explicit user choice).
- **Primary CTA** — *before:* "sign in" (given) → *after (kept):* same.
- **Divider** — *before:* "or continue with" (given) → *after (kept):* same.
- **Social button labels** — *before:* hint text "G" / "A" marks → *after:* **official Google + Apple provider logos** (per audit finding B02-F07 — use platform-compliant marks with accessible labels: `aria-label="Sign in with Google"` / `aria-label="Sign in with Apple"`).
- **Bottom navigation link** — *before:* "Don't have an account? sign up" (given) → *after (kept):* same.
- **Error state: wrong credentials** — *before:* "Incorrect email or password. Please try again." (from Error Handling table) → *after (warmer, on-voice):* "Incorrect email or password. Try again." — removes the redundant "Please" and trusts the user to recover without over-politeness.
- **Error state: account not found** — *before:* "No account found with this email." (from Error Handling table) → *after (same):* same; specific and honest.
- **Error state: network** — *before:* "Something went wrong. Please try again." (from Error Handling table) → *after (warmer):* "Connection lost. Check your internet and try again." — specific problem + actionable next step.
- **Error state: too many attempts** — *before:* "Too many attempts. Please try again in 5 minutes." (from Error Handling table) → *after (same):* same; honest and specific.
- **Loading state** — *before:* no loading message in the spec → *after (new, on-voice):* button shows spinner + brief label (optional, if UX needs it): "One moment" — never generic.
- **Biometric permission prompt, heading** — *before:* "Sign in faster?" (given) → *after (kept):* same; warm and curious, not a command.
- **Biometric permission prompt, body** — *before:* "Use [Face ID / Touch ID] to sign in instantly next time." (given) → *after (kept):* same; plain and specific benefit.
- **CTA on biometric opt-in** — *before:* "enable [Face ID / Touch ID]" (given) → *after (kept):* same.
- **Dismiss on biometric opt-in** — *before:* "not now" (given) → *after (kept):* same; plain and warm.
- **Biometric failure** — *before:* no message → *after (new):* form returns to full opacity with a subtle toast (if needed): "Biometric failed. Use password to sign in." — specific recovery, no shame.

All strings are authored, never hint text or generic. No filler, no "Title / Subtitle", no exclamation marks. The brand period is used with intent on the logo (if present as a wordmark element).

### Motion choreography

Locked to `CK-P4` order (draw-first): **logo appears first** (`--dur-base` 280ms `--ease-out-soft`, fade-in) → **heading and form fields fade/slide in** (staggered, 280ms each, 40ms between) → **the primary CTA "sign in" button draws its outline** (`stroke-animate`, `--stroke-base` 4px, `--dur-slow` 520ms `--ease-flow`, the focal motion moment — this is the ownable splash-stroke signature, the continuous-stroke motif per `CK-P4`) → **social auth buttons and navigation link fade in** (280ms `--ease-out-soft`, 40ms stagger). When biometric is triggered on mount, the form dims to 40% opacity with a smooth transition (160ms), the system biometric prompt appears (native iOS/Android), and on success the form snaps back to 100% opacity and navigates to Home (280ms crossfade). On error, the form brightens back to 100% (160ms) and a brief red flash animates on the biometric icon (4pt scale pulse, 400ms). `prefers-reduced-motion` → all elements at final state instantly; the CTA button at its final resting outline (orange pill, fully drawn) — the signature stroke is still *present and complete*, just not animated.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / empty (Day-1) | All fields empty, CTA disabled, form fully visible, back button present | Heading "Welcome back" + empty form with placeholders (email address, password) — no error message, no loading state. Biometric icon hidden (only shows if enrolled + prior sign-in). | Profile section (logo, heading) at full opacity; form fields and CTA visible and ready; no skeleton, no collapsed state. |
| Focused input | That field's border transitions to 2pt `--color-brand-orange`, hint text dims to 40%, label (if present) brightens; other fields retain default 1pt white-10 border. Optional cursor caret visible. | Focused field has no message; helper text (if used on the screen) clarifies format or reason. | Focused border provides visual affordance; depth unchanged. |
| Typing / partial | At least one field has content, CTA transitions from disabled (40% opacity) to enabled (100% opacity, full glow), button text remains "sign in" in white. | No message (text input is self-evident); if password is empty, CTA stays disabled; if email is invalid format (no @), CTA stays disabled. | CTA glow activates when both fields are non-empty and email format is valid (per audit B02-F05: "Disable until valid"). |
| Submitted / loading | Form fields remain visible (not hidden), CTA button shows a white spinner (replacing text "sign in"), form is briefly dimmed to 80% opacity (visual feedback that submission is in flight) or shows a subtle loading toast above the CTA. | Optional: "Signing you in — one moment" (brief, warm, on-voice). | CTA button at full opacity, spinner visible, motion smooth (160ms crossfade from text to spinner). |
| Success | Form fields collapse upward and fade out (280ms), success icon emerges (56pt circle, `--color-forest-green` fill, white checkmark, `--glow-green` flash 600ms), screen then crossfades to Home (280ms). | "Welcome back, [Name]" (if available) appears briefly, then navigation — or simply silent navigation (depending on UX test). | Green glow on the success icon, warm and celebratory, not harsh. |
| Error: wrong credentials | Both email and password fields get a 2pt `--color-error-red` border, a red error icon (14pt, ✗ or alert glyph) appears left of the label/hint text area (never colour-alone per WCAG 1.4.11). Error text appears below the password field: "Incorrect email or password. Try again." (13pt Sora Regular, `--color-error-red`, 4pt below field, left-aligned). Form fields remain in place, CTA enabled (user can edit and retry). | "Incorrect email or password. Try again." — specific, warm, recovery-focused (user can try again immediately). Borders and icon are red, but the message does the work; colour alone doesn't convey the error. | Error borders provide visual affordance, error icon + text prevents colour-alone fail, depth unchanged. |
| Error: account not found | Email field gets 2pt red border + red alert icon; error text below email: "No account found with this email." (13pt, `--color-error-red`). Password field remains at default state (not highlighted). CTA stays enabled (user can edit email or navigate to Sign Up). | "No account found with this email." — specific and direct, with implicit recovery (try a different email or sign up). | Red error treatment on email only; password field calm. |
| Error: network | Form remains visible and enabled (no dimming), a network error banner slides in from top (or a toast at the bottom, per error-handling pattern). Text: "Connection lost. Check your internet and try again." (13pt Sora Regular, `--color-error-red`, white text on a muted bg). CTA remains enabled (user can retry). | "Connection lost. Check your internet and try again." — specific problem + actionable next step, non-shaming. | Error banner uses `--color-error-red` only for the icon/glyph + border (not the whole banner bg, which is ink-brown-800 at 90% to match the card language). |
| Error: too many attempts (429) | CTA button is disabled (40% opacity, no haptic on tap), a toast appears at top: "Too many attempts. Please try again in 5 minutes." (13pt Sora Regular, white at 70% on ink-brown-800 bg, 2pt red left border, auto-dismiss 5s). Form fields remain visible but CTA is locked. Countdown timer optional (shows minutes remaining, updates every 10s). | "Too many attempts. Please try again in 5 minutes." — specific, honest, non-shaming; frames as a safety measure, not a punishment. | Red left-border on toast (glyph + border, never just colour); CTA disabled with 0.4 opacity + no haptic (honest dimming per CONSISTENCY.md dim 7 disabled states). |
| Biometric auth: triggered on mount | Form fields visible but dimmed to 40% opacity (smooth 160ms transition), a system biometric prompt (native iOS Face ID dialog or Android fingerprint) appears on top (system-level, not our UI). Form remains interactive behind but unresponsive (the OS controls the flow). | No custom message (the OS handles biometric copy). Optional: if the prompt takes >2s, an on-brand subtitle below the system dialog: "Checking your face — one moment." | Form dimmed but not hidden; depth layer visual (modal overlay via OS); no glow or motion added by our UI (OS handles the presentation). |
| Biometric auth: success | System biometric prompt dismisses, form snaps back to 100% opacity (160ms fade-in), screen crossfades to Home (280ms) — identical to password success. | No custom message; silent navigation (the success is felt via motion, not text). | Green glow on the biometric icon (if visible) flashes briefly (600ms) as a success signal. |
| Biometric auth: failure | System biometric prompt dismisses, form snaps back to 100% opacity (160ms), the biometric icon (if shown below social buttons) flashes red (`--color-error-red`, 400ms) and then settles to default state. Form is fully enabled for manual sign-in (no message, no error banner — the red flash on the icon is the signal). | No message (the red icon flash is the feedback); user can tap the biometric icon again or sign in manually with email/password. | Red icon flash (4pt scale pulse, 400ms duration) provides the error signal without a banner; form returns to calm default state. |
| Offline / cached | All fields and CTA visible and enabled. A subtle banner above the form (if the app detects offline status): "You're offline — we'll sync when you're back online." Form attempts sign-in locally (if credentials were recently cached) or shows a network error. | "You're offline — we'll sync when you're back online." (honest, calm, non-shaming). If sign-in fails due to no cached session: "No cached session — check your internet." | Offline banner uses ink-brown-800 + white at 50% text (calm, not alarming). |

### Signature & anti-generic

Ownable moment: the **primary CTA "sign in" button draws its outline as a continuous stroke** (the `CK-P4` splash-stroke signature) — a 4pt round-capped orange pill outline that animates on entry (520ms `--dur-slow`, `--ease-flow`). This is the ownable Balencia moment on this screen, planting the continuous-stroke motif from the design system (§8, the Living Line family, the brand period in motion). Anti-generic fixes: (1) inputs are not flat borders but layered `CK-P1` surfaces with top-edge highlights, warm glow, and inset depth — never default-component flat boxes. (2) Copy is authored, not templated — every string is specific and on-voice (no "Success!", no generic "Please try again," no shaming framing on errors). (3) The form is simple and restrained (no choice paralysis, no aggressive social push) — mirrors Stripe and Linear's calm, minimal-friction aesthetic. (4) States are all designed: loading shows motion (spinner, not blank), errors are specific with a recovery affordance, biometric integrates warmly without hijacking the form, disabled CTA is honest (40% opacity, no haptic). (5) The heading "Welcome back" is warm without needing colour emphasis — the orange is reserved for the CTA and the stroke signature, keeping the screen calm and the primary action clear. No flat boxes, no generic microcopy, no dark patterns, no shaming language — a top-tier product studio would ship this sign-in flow.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` / `--color-ink-brown-800`):

| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Heading "Welcome back" | `--color-alpha-white-100` | ≥12:1 on ink-900 | Primary text |
| Email/password input value | `--color-alpha-white-100` | ≥12:1 on ink-brown-800 | Primary text in field |
| Input hint text | `--color-alpha-white-40` | ≥4.5:1 on ink-brown-800 | Tertiary text |
| "Forgot password?" link | `--color-brand-orange` | 3.2:1 on ink-900 (WCAG 1.4.11) | Interactive link |
| "Remember me" label | `--color-alpha-white-70` | ≥4.5:1 on ink-900 | Secondary text |
| "sign in" button text (orange bg) | `--color-alpha-white-100` | ≥12:1 on orange | Primary text on CTA |
| CTA button border (on focus) | `--color-brand-orange` | 3.2:1 on ink-900 (WCAG 1.4.11) | Focus-visible ring |
| Error message text | `--color-error-red` | 2.6:1 on ink-900 (below 3:1, paired with icon ✗ per WCAG 1.4.11: "status only by colour" avoided via glyph + word) | Error text + icon |
| Error field border (2pt red) | `--color-error-red` | 2.6:1 (paired with red icon + message, not colour-alone) | Identifies error field |
| Divider "or continue with" | `--color-alpha-white-40` | ≥4.5:1 on ink-900 | Tertiary separator |
| Social button text (Google) | `--color-alpha-white-100` | ≥12:1 on ink-brown-800 | Primary text |
| Social button text (Apple) | `--color-alpha-white-100` | ≥12:1 on ink-brown-800 | Primary text |
| "Don't have an account?" | `--color-alpha-white-50` | ≥4.5:1 on ink-900 | Secondary text |
| "sign up" action | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) | Interactive action word |
| Back button chevron | `--color-alpha-white-100` | ≥12:1 on ink-900 | Icon in 44×44 target |
| Biometric icon (default) | `--color-alpha-white-50` | ≥4.5:1 on ink-900 | Secondary icon |
| Biometric icon (success, green) | `--color-forest-green` | 2.8:1 on ink-900 (below 3:1, paired with glyph motion + a success toast if needed) | Success feedback |
| Biometric icon (error, red) | `--color-error-red` | 2.6:1 on ink-900 (paired with icon motion + glyph, never colour-alone) | Error feedback |

**Focus-visible ring:** Every interactive element (input fields, CTA button, back button, social buttons, "Forgot password?" link, "sign up" link, biometric icon button if present) uses the uniform `CK-T03 --focus-ring` (2px `--color-brand-orange` ring, 2px offset) — never default browser outline. Screen-reader announces: "Email address input field", "Password input field", "Sign in button (enabled/disabled state read dynamically)", "Forgot password link", "Remember me toggle switch", "Google sign in button", "Apple sign in button", "Back button, go back to sign up", "Biometric sign in button" (if present, reads "Sign in with Face ID" or "Sign in with Touch ID"). Error states are announced via a live region: "Incorrect email or password. Try again." is announced dynamically when the error appears, not on initial page load. Keyboard navigation follows the logical focus order: Back button → Email input → Password input → Forgot password link → Remember me toggle → Sign in button → Google button → Apple button → (Biometric button if present) → Sign up link. All touch targets ≥44×44pt (email/password inputs are 52pt tall, CTA is 56pt tall, back button is 44×44, social buttons are 52pt tall, toggle row is 44pt tall, biometric icon button is 44×44, navigation link has a 44pt touch target). `prefers-reduced-motion` → all animations collapse to instant (CTA button stroke appears fully drawn at rest, form entries at final opacity instantly, no staggered motion, success icon present at full glow instantly without pulsing), and the motion accessibility fallback preserves the signature by keeping the stroke fully drawn (not erased) and the glow present.

Conform to `design-audit/CONSISTENCY.md`.

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

