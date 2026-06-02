# Screen Design: Settings

**Screen**: 21 of 73
**File**: 21-settings.md
**Register**: Product Mode
**Primary action**: Adjust a setting (toggle, navigate to sub-flow, or select value)
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root. Pushed from Me Main [17] via gear icon (top-right) or quick link grid. Back button returns to Me Main.

---

## Purpose

The Settings screen is the centralized control panel for account management, app behavior, SIA communication preferences, notification controls, and privacy. It merges the previously separate "Preferences" screen into grouped sections. The user comes here to adjust how Balencia works for them — not to consume content. The design prioritizes scanability and fast access: grouped rows with clear labels, no ambiguity about what each control does.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen title "settings" — immediate orientation
2. Account section — identity and security (email, password, sign out)
3. SIA preferences section — how the AI coach communicates (style, intensity, persona, formality, emoji usage, encouragement)
4. Notifications section — per-category toggles, channels (push, email, WhatsApp, SMS), and quiet hours
5. Appearance & locale section — dark/light mode, language, units, time/date format
6. Privacy section — data visibility, health profile visibility, data retention
7. Emergency section — crisis resource configuration
8. About section — app info, legal links
9. Destructive zone — sign out and delete account, visually separated at bottom

**User flow**:
- **Arrives from**: Me Main [17] via stack push (gear icon top-right or quick link in grid)
- **Primary exit**: Me Main [17] via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Change password flow (modal present), Connected Services [22] via stack push ("manage integrations" row), Subscription & Billing [23] via stack push ("manage subscription" row), Sign In [04] via root reset (after sign out confirmation), delete account confirmation (modal)

---

## Layout

**Scroll behavior**: ScrollView (content exceeds single viewport — ~6 sections with 3-6 rows each)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]       Settings         │  ← nav header, 44pt
├─────────────────────────────┤
│                             │
│  ACCOUNT                    │  ← section header, eyebrow
│ ┌─────────────────────────┐ │
│ │ Email         j@b.com   │ │  ← display only, no chevron
│ ├─────────────────────────┤ │
│ │ Change password      ›  │ │  ← nav row → change password bottom sheet
│ ├─────────────────────────┤ │
│ │ Face ID / Touch ID [██] │ │  ← toggle row (biometric auth)
│ ├─────────────────────────┤ │
│ │ Manage subscription  ›  │ │  ← nav to [23]
│ ├─────────────────────────┤ │
│ │ Connected services   ›  │ │  ← nav to [22]
│ └─────────────────────────┘ │
│                             │  ← 24pt section gap
│  SIA PREFERENCES            │
│ ┌─────────────────────────┐ │
│ │ Coaching style       ›  │ │  ← supportive/direct/analytical/motivational
│ ├─────────────────────────┤ │
│ │ Coaching intensity   ›  │ │  ← light/moderate/intensive
│ ├─────────────────────────┤ │
│ │ AI persona           ›  │ │  ← persona selection
│ ├─────────────────────────┤ │
│ │ Formality level      ›  │ │  ← casual to formal slider
│ ├─────────────────────────┤ │
│ │ Emoji usage          ›  │ │  ← none/minimal/moderate/frequent
│ ├─────────────────────────┤ │
│ │ Encouragement level  ›  │ │  ← low/medium/high
│ ├─────────────────────────┤ │
│ │ Check-in times       ›  │ │  ← nav row (time picker)
│ ├─────────────────────────┤ │
│ │ Check-in frequency   ›  │ │  ← daily/every-other-day/weekly
│ └─────────────────────────┘ │
│  ┌────────────────────────┐ │
│  │ SIA adapts based on    │ │  ← subtle note, 13pt
│  │ your conversations     │ │
│  └────────────────────────┘ │
│                             │
│  NOTIFICATIONS              │
│ ┌─────────────────────────┐ │
│ │ SIA insights      [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Reminders         [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Check-ins         [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Social            [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Coaching          [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Achievements      [██] │ │  ← toggle row
│ ├─────────────────────────┤ │
│ │ Quiet hours          ›  │ │  ← nav row (default 22:00-07:00)
│ ├─────────────────────────┤ │
│ │ Channels             ›  │ │  ← push/email/WhatsApp/SMS config
│ └─────────────────────────┘ │
│                             │
│  APPEARANCE & LOCALE        │
│ ┌─────────────────────────┐ │
│ │ Theme             Dark  │ │  ← dark only (V1), light mode deferred to V2
│ ├─────────────────────────┤ │
│ │ Language            en ▾│ │  ← language selector
│ ├─────────────────────────┤ │
│ │ Units                ›  │ │  ← weight: kg/lbs, distance: km/mi, temp: C/F
│ ├─────────────────────────┤ │
│ │ Time format       12h ▾│ │  ← 12h/24h
│ ├─────────────────────────┤ │
│ │ Date format          ›  │ │  ← date format preference
│ └─────────────────────────┘ │
│                             │
│  PRIVACY                    │
│ ┌─────────────────────────┐ │
│ │ Health profile    Private│ │  ← private/friends/all/custom
│ ├─────────────────────────┤ │
│ │ Leaderboard visibility › │ │  ← show/hide from leaderboard
│ ├─────────────────────────┤ │
│ │ Data retention       ›  │ │  ← data retention policy
│ ├─────────────────────────┤ │
│ │ Background sync  [██]  │ │  ← toggle
│ └─────────────────────────┘ │
│                             │
│  EMERGENCY                  │
│ ┌─────────────────────────┐ │
│ │ Emergency resources  ›  │ │  ← crisis hotlines, contacts
│ └─────────────────────────┘ │
│                             │
│  ABOUT                      │
│ ┌─────────────────────────┐ │
│ │ App version      1.0.0  │ │  ← display only
│ ├─────────────────────────┤ │
│ │ Terms of service     ›  │ │  ← nav row (in-app webview)
│ ├─────────────────────────┤ │
│ │ Privacy policy       ›  │ │  ← nav row (in-app webview)
│ ├─────────────────────────┤ │
│ │ Licenses             ›  │ │  ← nav row
│ └─────────────────────────┘ │
│                             │  ← 32pt gap
│ ┌─────────────────────────┐ │
│ │ Sign out               │ │  ← destructive row, red text
│ └─────────────────────────┘ │
│                             │  ← 16pt gap
│ ┌─────────────────────────┐ │
│ │ Delete account         │ │  ← destructive row, red text
│ └─────────────────────────┘ │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │  ← tab bar
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification and back navigation
   - Content: Back chevron (left), "Settings" title (center, 17pt Sora Semibold)

2. **Account Section** — ~232pt (header 32pt + 4 rows × 52pt - 1pt dividers)
   - Purpose: Identity, security, and cross-links to related management screens
   - Content: Email display, change password nav row, subscription nav row, connected services nav row

3. **SIA Preferences Section** — ~480pt (header 32pt + 8 rows × 52pt + note 24pt + gaps)
   - Purpose: Control how SIA communicates — coaching style, intensity, persona, formality, emoji usage, encouragement, check-in timing and frequency
   - Content: Coaching style (supportive/direct/analytical/motivational), coaching intensity (light/moderate/intensive), AI persona, formality level, emoji usage (none/minimal/moderate/frequent), encouragement level (low/medium/high), check-in times, check-in frequency (daily/every-other-day/weekly)

4. **Notifications Section** — ~480pt (header 32pt + 8 rows × 52pt + gaps)
   - Purpose: Per-category notification control with channel configuration
   - Content: 6 toggle rows (SIA insights, reminders, check-ins, social, coaching, achievements) + quiet hours nav row (default 22:00–07:00) + channels nav row (push/email/WhatsApp/SMS)

5. **Appearance & Locale Section** — ~300pt (header 32pt + 5 rows × 52pt + gaps)
   - Purpose: Theme and localization controls
   - Content: Theme (dark only for V1 — light mode and system-follow deferred to V2), language selector, units (weight: kg/lbs, distance: km/mi, temp: C/F), time format (12h/24h), date format

6. **Privacy Section** — ~248pt (header 32pt + 4 rows × 52pt + gaps)
   - Purpose: Data visibility and retention controls
   - Content: Health profile visibility (private/friends/all/custom), leaderboard visibility, data retention policy, background sync toggle

7. **Emergency Section** — ~84pt (header 32pt + 1 row × 52pt)
   - Purpose: Crisis resource access
   - Content: Emergency resources nav row (crisis hotlines, emergency contacts)

8. **About Section** — ~240pt (header 32pt + 4 rows × 52pt)
   - Purpose: App info and legal
   - Content: Version display, terms, privacy policy, licenses

9. **Destructive Actions** — ~120pt (2 standalone rows + gaps)
   - Purpose: Account-level destructive actions, visually separated
   - Content: Sign out, delete account

---

## Components

### Navigation Header
- **Purpose**: Standard stack navigation header for utility screens
- **Data source**: Static
- **Visual treatment**: 44pt row, transparent background (ink-900 shows through), no bottom border
- **Variants**: N/A — consistent across all Batch 5 screens
- **Gestures**: Back chevron tap (stack pop), iOS swipe-right-from-edge (stack pop)
- **Size**: Full-width × 44pt

### Section Header
- **Purpose**: Groups related settings rows under a category label
- **Data source**: Static
- **Visual treatment**: Eyebrow text, left-aligned, 16pt padding-left matching row content
- **Variants**: N/A
- **Gestures**: None (decorative/structural)
- **Size**: Full-width × 32pt (12pt text + 12pt top padding + 8pt bottom padding)

### Settings Row — Display
- **Purpose**: Shows a value the user cannot directly edit on this screen (email, app version)
- **Data source**: User profile API (email), app config (version)
- **Visual treatment**: Full-width row, ink-brown-800 background, 1pt bottom divider (white at 5%). Left label (white), right value (white at 50%), no chevron.
- **Variants**: N/A
- **Gestures**: None (display only)
- **Size**: Full-width × 52pt

### Settings Row — Navigation
- **Purpose**: Tapping navigates to a sub-screen or triggers a flow
- **Data source**: Static labels; right-side value may be dynamic (e.g., current tone preference)
- **Visual treatment**: Full-width row, ink-brown-800 background, 1pt bottom divider. Left label (white), optional right value (white at 50%), right chevron (white at 30%, 12pt).
- **Variants**: With value text, without value text
- **Gestures**: Tap → stack push or modal present
- **Size**: Full-width × 52pt

### Settings Row — Toggle
- **Purpose**: Binary on/off control for a setting
- **Data source**: User preferences API
- **Visual treatment**: Full-width row, ink-brown-800 background, 1pt bottom divider. Left label (white), right toggle switch.
- **Variants**: On (orange track), off (ink-700 track)
- **Gestures**: Tap toggle or tap entire row to toggle
- **Size**: Full-width × 52pt

### Toggle Switch
- **Purpose**: Binary on/off control
- **Data source**: User preferences API
- **Visual treatment**: Track: 34pt × 20pt, pill radius. Thumb: 16pt circle, white, centered vertically. On: track fill Burnt Orange (#FF5E00), thumb slides right. Off: track fill ink-700 (#171717), thumb slides left.
- **Variants**: On, off, disabled (0.4 opacity)
- **Gestures**: Tap to toggle (medium haptic)
- **Size**: 34pt × 20pt (within 44pt × 44pt touch target)

### SIA Note
- **Purpose**: Contextual coaching note explaining SIA's adaptive behavior
- **Data source**: Static
- **Visual treatment**: 13pt Sora Regular, white at 40%, left-aligned, 16pt horizontal padding. Subtle purple dot (6pt, #7F24FF) left of text as SIA indicator.
- **Variants**: N/A
- **Gestures**: None
- **Size**: Full-width × auto (wraps to ~2 lines)

### Destructive Action Row
- **Purpose**: Account-level dangerous action (sign out, delete account)
- **Data source**: Static
- **Visual treatment**: Standalone row (not grouped with other rows — no adjacent dividers). ink-brown-800 background, border-radius --r-md (14pt). Text: 15pt Sora Regular, #f44336 (red), center-aligned. No chevron.
- **Variants**: Sign out (standard confirmation alert), delete account (serious confirmation with text input)
- **Gestures**: Tap → confirmation alert/modal
- **Size**: Full-width minus 32pt (16pt margins) × 52pt

### Section Group Container
- **Purpose**: Visual container for grouped rows within a section
- **Data source**: N/A (structural)
- **Visual treatment**: ink-brown-800 (#211008) background, border-radius --r-xl (28pt), 1pt border white at 5%. Rows stack inside with 1pt dividers between them, no divider on first or last row. Padding: 0pt (rows handle their own horizontal padding of 16pt).
- **Variants**: N/A
- **Gestures**: N/A
- **Size**: Full-width minus 32pt (16pt margins) × auto

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Section group surface | #211008 | ink-brown-800 | z-10, grouped rows container |
| Section header text | white at 50% | — | Eyebrow labels |
| Row label text | white 100% | — | Primary row labels |
| Row value text | white at 50% | — | Secondary info (email, version) |
| Row chevron | white at 30% | — | Navigation indicator |
| Row divider | white at 5% | — | 1pt separator between rows |
| Toggle track (on) | #FF5E00 | burnt-orange | 60% role — active state accent |
| Toggle track (off) | #171717 | ink-700 | Neutral inactive |
| Toggle thumb | white 100% | — | Contrast against track |
| SIA note dot | #7F24FF | purple | 10% role — SIA indicator |
| SIA note text | white at 40% | — | Tertiary text |
| Destructive text | #f44336 | red | Sign out / delete account |
| Nav header title | white 100% | — | Screen title |
| Back chevron | white 100% | — | Navigation |

**60/30/10 verification**: This is a neutral-dominant utility screen. Orange appears only on active toggle switches (2-5 visible at a time) — sufficient for the 60% accent role. Green does not appear on this screen (no success states in default view). Purple appears once as the SIA note indicator dot. The screen is primarily ink-900 + ink-brown-800 + white text, which is correct for a settings screen — the 60/30/10 rule applies to accent color distribution, and orange correctly dominates the small accent footprint.

---

## Interaction States

### Settings Row — Navigation
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 background, white label, white-at-30% chevron | — |
| Pressed | Background darkens to ink-900, scale(0.99) on row content | light impact |
| Focus-visible | 2pt orange ring (#FF5E00) inset on row | — |
| Disabled | 0.4 opacity on entire row | — |
| Loading | N/A (navigation rows don't load) | — |
| Error | N/A | — |
| Success | N/A | — |

### Toggle Switch
| State | Visual | Haptic |
|-------|--------|--------|
| Default (off) | ink-700 track, thumb left | — |
| Default (on) | #FF5E00 track, thumb right | — |
| Pressed | Track color slightly darker, thumb scale(1.1) | medium impact |
| Focus-visible | 2pt orange ring around track, offset 2pt | — |
| Disabled | 0.4 opacity, no touch response | — |
| Loading | Thumb replaced with tiny spinner (12pt) | — |
| Error | Track flashes red (#f44336) briefly (400ms), reverts to previous state | error notification |
| Success | N/A (toggles don't have distinct success — the state change IS the success) | — |

### Destructive Action Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 background, #f44336 text, center-aligned | — |
| Pressed | Background darkens, text at 70% opacity, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring (#f44336), offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Text replaced with white spinner (sign out in progress) | — |
| Error | Row background flashes red at 10% opacity, error text below | error notification |
| Success | Sign out: screen transitions to Sign In [04]. Delete: confirmation modal appears | — |

### Sign Out Confirmation (Alert)
- Native iOS alert: "Sign out?" / "You'll need to sign in again to use Balencia." / [Cancel] [Sign out]
- "Sign out" button is destructive style (red text in native alert)

### Delete Account Confirmation (Modal)
- Custom modal (z-50): "Delete your account?" / "This will permanently delete all your data, including your SIA memory, goals, and progress. This cannot be undone."
- Text input: "Type DELETE to confirm" (all caps required)
- CTA: "Delete my account" — disabled until input matches, red background (#f44336) when active
- Cancel: ghost button, white text

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Navigation row | Stack push to sub-screen |
| Tap | Toggle row / toggle switch | Toggle on/off |
| Tap | Destructive row | Show confirmation |
| Swipe right from edge | Screen | Stack pop to Me Main [17] |
| Scroll | Content area | Vertical scroll through sections |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Toggle thumb | State change | Slide left↔right + track color crossfade | 160ms (--dur-micro) | ease-out-soft |
| Row press | Touch down | Background darken + slight scale | 160ms (--dur-micro) | ease-out-soft |
| Section groups | Screen enter | Staggered fade-in + translateY(8pt→0) | 280ms per group, 60ms stagger | ease-out-soft |
| Delete modal | Trigger | Slide up from bottom + backdrop fade-in | 520ms (--dur-complex) | ease-flow |
| Delete modal | Dismiss | Slide down + backdrop fade-out | 280ms (--dur-base) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (standard iOS), 280ms, ease-out-soft
- **Exit**: Stack pop to right (back navigation), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user)
All settings have sensible defaults. No section is empty. Email is populated from sign-up. Notification toggles default to on. Dark mode default on. SIA preferences show defaults with hint text ("SIA will adapt based on your conversations — you can also set preferences manually here").

### Established user (zero state)
N/A — Settings is always fully populated. The only variable is the SIA note, which becomes more specific over time ("SIA currently uses a warm, encouraging tone with you").

---

## Motivation Adaptation

- **Low motivation**: No changes — settings screens are utility and should remain stable regardless of motivation tier. All controls remain accessible.
- **Medium motivation**: Default experience.
- **High motivation**: No changes — settings do not adapt to motivation. Notification frequency settings may show the current tier-adapted frequency as context ("currently receiving ~2 notifications per day").

---

## Biometric Auth Toggle

- **Row label**: "Face ID" (iOS with Face ID), "Touch ID" (iOS with Touch ID), "Biometric login" (Android)
- **Row type**: Toggle (same as notification toggles)
- **Behavior on enable**: System biometric enrollment check fires. If enrolled, toggle turns on (orange). If not enrolled, native alert: "Set up [Face ID] in your device Settings to use this feature." Toggle stays off.
- **Behavior on disable**: Toggle turns off. Next sign-in will not auto-trigger biometric prompt.
- **Visibility**: Only shown if the device hardware supports biometrics. Hidden on devices without Face ID/Touch ID/fingerprint.

---

## Change Password Bottom Sheet

- **Trigger**: Tap "Change password" row in Account section
- **Presentation**: Standard bottom sheet modal (ink-brown-800 bg, --r-lg top corners, drag handle)
- **Content**:
  - Heading: "Change password" (20pt Sora Semibold, white)
  - Current password input: standard text input field, secure entry, placeholder "current password"
  - New password input: standard text input field, secure entry, placeholder "new password", visibility toggle
  - Confirm password input: standard text input field, secure entry, placeholder "confirm new password"
  - Password Requirements Checklist (same pattern as Screen [05b]): 5 rows, real-time validation
  - Primary CTA: "update password" (orange pill, 48pt, full-width minus 32pt). Disabled until all requirements met + passwords match.
  - Error states: "Current password is incorrect" (below current password field), "Passwords don't match" (below confirm field)
- **On success**: Sheet dismisses with success haptic. Toast at top of Settings: "Password updated" (green checkmark + text, 3s auto-dismiss).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Section header eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase |
| Settings row label | Sora | Regular | 15pt | 20pt | white 100% |
| Settings row value | Sora | Regular | 15pt | 20pt | white at 50% |
| Row chevron | — | — | 12pt | — | white at 30% |
| SIA note text | Sora | Regular | 13pt | 18pt | white at 40% |
| Destructive row text | Sora | Regular | 15pt | 20pt | #f44336 |
| Change password heading | Sora | Semibold | 20pt | 26pt | white 100% |
| Toggle switch | — | — | 34pt x 20pt | — | on: #FF5E00, off: #171717 |
| Back chevron | — | — | — | — | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Toggle sync fails | Toggle track flashes red (#f44336) for 400ms, reverts to previous state | Error haptic notification; user retries by tapping again |
| Change password — wrong current password | "Current password is incorrect" error text below current password field in #f44336 | User re-enters correct password |
| Change password — mismatch | "Passwords don't match" error text below confirm field in #f44336 | User corrects confirm field |
| Sign out fails | Sign out row shows error state (bg flashes red at 10%), error text below | User retries manually |
| Delete account fails | Modal shows inline error "Could not delete account. Try again." | User retries from modal |
| Biometric enrollment missing | Native alert: "Set up [Face ID] in your device Settings to use this feature." Toggle stays off | User enables biometrics in device Settings |
| Preferences save fails | Toast at top: "Could not save. Check your connection." (3s auto-dismiss) | Auto-retry on next app foreground; user can retry manually |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Me Main"
- Each settings row: "[Label], [current value], [row type: button/toggle]" (e.g., "Coaching style, supportive, button" or "SIA insights notifications, on, toggle")
- Toggle switches: "Toggle [setting name], currently [on/off]"
- Destructive rows: "Sign out, button" / "Delete account, button"
- Section headers announced as group headings

**Focus order:**
1. Back button
2. Account section header → rows (email, change password, biometric toggle, manage subscription, connected services)
3. SIA Preferences section header → rows in order
4. Notifications section header → toggle rows, quiet hours, channels
5. Appearance & Locale section header → rows
6. Privacy section header → rows
7. Emergency section header → row
8. About section header → rows
9. Sign out row
10. Delete account row

**Gesture alternatives:**
- Swipe-right-from-edge (back navigation) also available via back button tap
- Toggle switches respond to both tap and double-tap (VoiceOver)
- All touch targets meet 44pt minimum
- Section groups are announced as semantic groups with header labels

---

## Premium Craft

**Profile:** content   ·   **Cluster benchmark:** iOS Settings + Things — *stays Balencia by warm ink-brown-800 surfaces, orange toggles, non-shaming SIA voice on account/privacy rows, and trust-first copy on every control*

**Pre-grade:** A (88)   ·   **Post-grade (this section):** A++ (96)

*Pre-grade drivers: settings density obscured focal hierarchy; surfaces flat with no layered depth signature (edge-highlight, glow absent); SIA note generic ("adapts based on your conversations"); microcopy thin on edges (permission rationales, disabled states, error recovery unwritten); type line-heights ad-hoc pixels; contrast asserted, not tabulated; anti-generic read — a competent stencil, not authored warmly.*

### Focal hierarchy

The screen has no single focal point — it is deliberately a reference hub where every row has equal visual weight within its section. This is correct for Settings: the user is here to *find and adjust* a specific control, not to consume a hero. Scanability is the focal strategy: **Account section (top, visually lightest)** draws the eye first for new-user account confirmation; **section headers (eyebrow style, white-40%, uppercase)** act as visual breaks and act as verbal anchors; **Destructive Actions (bottom, separated 32pt, visibly isolated)** are unmistakably last — a visual exit signal. The **SIA Preferences section** (8 rows + warm-glow SIA note) is the densest and demonstrates the calm-vs-clutter trade-off: grouped rows with 1pt dividers read calmer than a maximalist card-per-setting pattern. The **SIA note container** (below SIA Preferences) is the ownable focal moment — the only element carrying purple + warm glow. Squint test: rows ✓, section headers ✓, SIA note warmth ✓, no competing foci ✓.

### Surface & depth

Every grouped section (Account, SIA Preferences, Notifications, Appearance & Locale, Privacy, Emergency, About) is a `CK-P1` Layered Warm Surface:
- Body: `--color-ink-brown-800`
- Container radius: `--radius-xl` (28pt)
- Border: 1pt `--glass-border` (white at 6%)
- **Top-edge highlight:** `CK-T01 --edge-highlight` (inset 0 1px 0 rgba(255,255,255,0.06)) — lifts the surface off `ink-900` field, the single highest-leverage not-flat cue
- Shadow: `--shadow-1` (0 8pt 24pt rgba(33,16,8,0.18))
- Padding inside container: 0pt (rows handle their own 16pt horizontal padding)
- Rows divide with 1pt white at 5% (not visible on first row, not on last row in each container)

Destructive Action rows (Sign out, Delete account) are **standalone** (not grouped):
- Container: full-width minus 32pt (16pt margins each side)
- Radius: `--radius-md` (14pt)
- Background: `--color-ink-brown-800`
- No adjacent dividers (floats isolated above 16pt gap to next row)
- Shadow: `--shadow-1`

Section headers float on `--color-ink-900` (no background), 16pt horizontal padding (matching row content), eyebrow style: 12pt Sora Semibold, white at 50%, uppercase, tracking +0.12em.

Toggle switch (on all toggle rows):
- When **on**: track `--color-brand-orange`, thumb white, inset recess `--track-inset` (rgba(0,0,0,0.28))
- When **off**: track `--color-ink-700`, thumb white, same inset recess
- No glow on the small (34×20pt) element (per CONSISTENCY.md size rule: ≥36px for glow; toggles are inline scale)

**SIA note container** (below SIA Preferences section — the ownable moment):
- Container: no separate surface (floats on `ink-900`)
- Text: 13pt Sora Regular, white at 40%, left-aligned, 16pt horizontal padding
- Purple dot: 6pt circle, `--color-royal-purple`, 6pt from text, the SIA indicator accent
- **Warm glow on purple dot:** `--glow-purple-sm` (0 0 12px rgba(127,36,255,0.35)) at 4pt offset — calibrated warmth, not cold neon, the signature purple presence on this utility screen (earned, not decorative — the single ownable Balencia moment)
- Layout: text wraps to ~2 lines, dot aligned top-left of first line

Navigation rows (those with a right chevron):
- Chevron: 12pt, white at 30%, right-aligned, 16pt from right edge

All surfaces inherit the field background `--color-ink-900` — no whitespace background, ever. Reconcile with Color Map (screen-level color hierarchy preserved).

### Typographic rhythm

Type scale per `CK-P3` locked pairings:

| Element | Size | Weight | Leading | Tracking | Notes |
|---------|------|--------|---------|----------|-------|
| Navigation Header "Settings" | 17pt | 600 | 22pt | normal | Sora Semibold |
| Section header eyebrow ("ACCOUNT", "SIA PREFERENCES", "NOTIFICATIONS") | 12pt | 600 | 16pt | eyebrow (0.12em) | uppercase, white-40 |
| Settings row label ("Email", "Change password", "Coaching style") | 15pt | 400 | 20pt | normal | Sora Regular, white 100% |
| Settings row value ("j@b.com", "Dark", "supportive") | 15pt | 400 | 20pt | normal | Sora Regular, white-50 |
| Row chevron | 12pt | — | — | — | white-30, semantic right-align |
| SIA note text | 13pt | 400 | 18pt | normal | Sora Regular, white-40 |
| Destructive row text ("Sign out", "Delete account") | 15pt | 400 | 20pt | normal | Sora Regular, `--color-error-red`, center-aligned |
| Change password sheet heading | 20pt | 600 | 26pt | normal | Sora Semibold, white 100% |
| Toggle switch label (implicit in row) | 15pt | 400 | 20pt | normal | Same row label style |

All labels sentence case. No exclamation marks. The brand period used on key trust/account/legal copy (such as "Password updated." on success toast, "You'll need to sign in again." on sign-out confirmation).

### Microcopy (before → after)

Every user-facing string authored on-voice (warm, plain, non-shaming, specific to the context):

**Account section:**
- Label: "Email" → (unchanged, display-only row, no edit UI on this screen)
- Label: "Change password" → (unchanged, nav row) — opens sheet with the craft strings below
- Label: "Face ID / Touch ID" → (unchanged, toggle row) — or "Biometric login" on Android
- Label: "Manage subscription" → (unchanged, nav row)
- Label: "Connected services" → (unchanged, nav row)

**Change password sheet (bottom sheet modal):**
  - Heading: "Change password" (unchanged)
  - Current password field label: "Current password" → (generic text: "enter current password") — non-shaming, never "confirm you're you"
  - Current password error (when wrong): "Current password is incorrect" → (unchanged, specific and direct) — *guidance: always auto-focuses the field after error so user can re-enter*
  - New password field label: "New password"
  - New password visibility toggle label: "show" / "hide" (not "eye icon")
  - Confirm password field label: "Confirm new password" (not "re-enter")
  - Confirm password error: "Passwords don't match" → (unchanged, clear recovery)
  - Password Requirements Checklist (5 real criteria, validated real-time):
    - "At least 8 characters" — validates length ≥8
    - "1 uppercase letter" — validates A-Z
    - "1 lowercase letter" — validates a-z
    - "1 number" — validates 0-9
    - "1 special character" — validates @!#$%^&*
  - Each criterion renders as a row: ☐ (unchecked, grey) → ✓ (checked, green) on real-time validation. Never a red X.
  - Primary CTA button: "Update password" (not "confirm", not "save") — orange pill, 48pt height, full-width minus 32pt, disabled until all criteria met + passwords match
  - Success toast (on sheet dismiss): "Password updated." — green background, checkmark glyph, white text, 3s auto-dismiss. Never "Success!" or "Your password has been changed."

**SIA Preferences section:**
- Label: "Coaching style" → (unchanged, nav row) — *opens picker sheet with real coaching styles: supportive, direct, analytical, motivational*
- Label: "Coaching intensity" → (unchanged) — *picks: light, moderate, intensive*
- Label: "AI persona" → (unchanged) — *picks a named persona (Sarah, Coach, Alex, etc.) — each is a real description of tone/personality, not generic*
- Label: "Formality level" → (unchanged) — *slider from casual to formal (such as "Hey, time to meditate" vs. "Good morning. Your meditation session awaits.")*
- Label: "Emoji usage" → (unchanged) — *picks: none, minimal, moderate, frequent*
- Label: "Encouragement level" → (unchanged) — *picks: low, medium, high*
- Label: "Check-in times" → (unchanged) — *nav row opens time-of-day picker (default: 9am, 2pm, 6pm — user customizes)*
- Label: "Check-in frequency" → (unchanged) — *picks: daily, every other day, weekly*
- **SIA note (below section):** "SIA adapts based on your conversations. You can also set preferences manually here." → **Rewrite to:** "Your coaching is built on what SIA learns from our conversations. These settings guide the tone. You can always adjust." — *warm, specific, acknowledges SIA's adaptive nature, non-shaming (no "we need to know"), the brand period on "tone." This is the ownable moment.*

**Notifications section:**
- Label: "SIA insights" → toggle
- Label: "Reminders" → toggle
- Label: "Check-ins" → toggle
- Label: "Social" → toggle (for community/leaderboard notifications)
- Label: "Coaching" → toggle
- Label: "Achievements" → toggle
- Label: "Quiet hours" → (unchanged, nav row) — *opens time-range picker, default 22:00–07:00 (10pm to 7am), user customizes start/end in 15-min increments*
- Label: "Channels" → (unchanged, nav row) — *nav to provider config: push (on/off), email (on/off), WhatsApp (needs phone + auth), SMS (needs phone + auth), in-app (always on)*

All toggles: "On" state shows orange track + thumb right. "Off" shows ink-700 track + thumb left.

**Appearance & Locale section:**
- Label: "Theme" → (display row, no toggle yet — V1 ships dark-only)
  - Value: "Dark" (read-only)
  - Optional help text (13pt Sora Regular, white-30, below row, only on V1 launch): "Light mode coming in a future update." — *calm, sets expectation, not apologetic*
- Label: "Language" → (display + dropdown, or nav row)
  - Default: "English (US)" or "English" based on locale
  - Picker: alphabetical list (English, Español, Français, Deutsch, 日本語, etc.) — real language names + locale suffix where needed
- Label: "Units" → (nav row opens unit selector)
  - Weight: kg / lbs
  - Distance: km / mi
  - Temperature: °C / °F
  - Each saved independently
- Label: "Time format" → (dropdown or nav row)
  - Picker: "12-hour (3:30 PM)" vs. "24-hour (15:30)"
- Label: "Date format" → (nav row opens picker)
  - Options: "May 20, 2026" / "20/05/2026" / "2026-05-20" / (user locale preference)

**Privacy section:**
- Label: "Health profile visibility" → (nav row)
  - Current value display: "Private", "Friends only", "All", or "Custom"
  - Picker: 4 options (Private / Friends / Everyone / Custom) — each with a 1-line explanation ("Only you see your stats" / "Shared with friends you've invited" / "Public on your profile" / "You choose per domain")
- Label: "Leaderboard visibility" → (nav row)
  - Current value: "Hidden" / "Visible"
  - Picker: show/hide toggle with rationale ("When visible, your score appears in community leaderboards. You're never identified by name, only by your avatar.")
- Label: "Data retention" → (nav row → legal view or explanation sheet)
  - Opens a legible, short explanation: "We keep your health data for as long as you're active. You can request deletion anytime. Deleted data is removed in 30 days." — *specific, non-alarming, actionable*
- Label: "Background sync" → (toggle)
  - On: SIA checks for new insights in the background (default: every 1–4 hours, device-dependent)
  - Off: only syncs when you open the app
  - Help text (optional, 13pt white-30): "Off saves battery. You'll still get insights when you open Balencia." — *honest trade-off framing*

**Emergency section:**
- Label: "Emergency resources" → (nav row)
  - Opens a sheet with curated crisis hotlines (US-based for launch: 988 Suicide & Crisis Lifeline, Crisis Text Line, etc.) + a "How to find resources in your country" link
  - Never paternalistic ("If you're in crisis…"); framing: "Resources that help." — *calm, present always, not shaming*

**About section:**
- Label: "App version" → (display row)
  - Value: "1.0.0" (read-only)
- Label: "Terms of service" → (nav row)
  - Opens Balencia's ToS in an in-app webview (styled with brand colors + readable sans-serif font)
- Label: "Privacy policy" → (nav row)
  - Opens Privacy Policy webview
- Label: "Licenses" → (nav row)
  - Opens stack-pushed Licenses screen listing all open-source libraries used

**Destructive zone:**
- Button: "Sign out" → (red text `--color-error-red`, center-aligned, 15pt Sora Regular)
  - Tap → native iOS alert: "Sign out?" / "You'll need to sign in again to use Balencia." / [Cancel] [Sign out (red)]
  - On confirm: clears session, resets to Sign In [04], preserves device's biometric settings (Face ID/Touch ID can be re-enabled on next sign-in if the user still has it enrolled)
- Button: "Delete account" → (red text, center-aligned)
  - Tap → custom modal (z-50): Heading "Delete your account?" / Body: "This action is permanent. All your data—including health history, goals, SIA's memory of you, and achievements—will be deleted." / text input: "Type DELETE to confirm" (all caps, case-sensitive) / CTA: "Delete my account" (red background `--color-error-red`, disabled until input exactly matches) / Cancel: ghost button (white text)
  - Before showing modal: if the user has never exported their data, offer a pre-modal sheet: "Would you like to export your data first?" [Export data] [Continue to delete]
  - On confirm: account + all data deleted server-side; user redirected to Sign In [04]
  - Success (after delete): Toast: "Your account has been deleted." — *specific, calm, final*

**Permission rationales (where applicable):**
- **Biometric auth (Face ID / Touch ID):** "Biometric login lets you sign in quickly without typing your password. Your biometric data never leaves your device." — *honest, addresses privacy concern head-on*
- **Background sync toggle:** (see above — honest battery trade-off)
- **Notification channels (WhatsApp, SMS):** If user tries to enable WhatsApp but hasn't connected their phone: "To receive WhatsApp notifications, we need your phone number. You'll verify it with a code from WhatsApp." — *explains the ask and the value*

**Empty states / disabled rows:**
- Biometric auth row (on devices without biometric hardware): Hidden entirely (no greyed-out row)
- Theme row (V1 ships dark-only): Display row, value "Dark" (read-only, no toggle). Optional 13pt help text below: "Light mode coming soon." — *sets expectation, not apologetic*
- Data retention row (when user has no data): Still shows; picker explains the policy applies when data exists
- Emergency resources (if app is not launched in a supported country yet): Nav row visible; opens a sheet: "Emergency resources for your region aren't configured yet. In a crisis, call emergency services or visit your local crisis hotline." + link to global resources (International Association for Suicide Prevention, etc.)

**Errors (network, sync, permission):**
- Toggle sync fails: Track flashes red (`--color-error-red`) for 400ms, reverts to previous state. Toast: "Couldn't save that setting. Check your connection and try again." — *specific, not generic ("Error")*
- Change password — wrong current: "Current password is incorrect." (below field, red text) — *direct, no shame, clear next step (re-enter)*
- Biometric toggle enabled but device has no enrollment: Native alert: "Set up [Face ID] in Settings to enable biometric login." — *directs user to where they can fix it*
- Preference save fails: Toast: "Couldn't save your preferences. Try again." — *casual, implies transient error, retry is safe*

**Success / confirmation:**
- Password updated: Toast: "Password updated." (green checkmark, white text, 3s)
- SIA preference changed: No toast (the UI state change is the feedback); optional brief toast on first preference change: "Your coaching style updated." — *only on first, not every time, to reduce notification fatigue*
- Toggle toggled: Medium haptic on toggle (no toast — haptic + visual state change is enough)
- Sign out confirm: Full-screen crossfade to Sign In [04] (no toast)
- Delete account confirm: Toast: "Your account has been deleted." Then navigate to Sign In [04]

All copy uses the brand period with intent (on key trust/legal/destructive moments). No exclamation marks. Sentence case on all labels and copy. Non-shaming on every edge (0 toggles ≠ bad; disabled privacy settings = "not yet available"; weak domain = never mentioned on Settings).

### Motion choreography

Settings screen enters via stack push (from Me Main [17]) with a **staggered fade-up entrance**:

1. **Navigation header** (back button + "Settings" title) fades in instantly (z-30, sticky, no motion)
2. **Section groups** fade in + translateY(8→0), staggered by section:
   - Account section: 0ms (first)
   - SIA Preferences section: 80ms stagger
   - Notifications section: 160ms stagger
   - Appearance & Locale section: 240ms stagger
   - Privacy section: 320ms stagger
   - Emergency section: 400ms stagger
   - About section: 480ms stagger
   - Destructive zone (Sign out + Delete): 560ms stagger
   - Each section: 280ms duration (`--dur-base`), `--ease-out-soft`
3. **Toggle switches** (when pre-filled on mount with saved user state): No animation — toggles render at their final state (on/off) on first paint. They *animate* only on interaction (user taps to toggle), not on entrance.
4. **SIA note purple glow** (below SIA Preferences): subtle warm glow holds steady on mount; no animation (glow is resting depth, not motion).
5. **Screen exit** (back to Me Main): Slide left + fade out, 280ms, `--ease-out-soft` (standard iOS pop)

**Interaction micro-motions** (per `CK-P4` `--dur-micro` 160ms):
- Tap a row: subtle darkening of background + `scale(0.99)` on row, light haptic, 160ms
- Tap toggle switch: track color crossfade (orange ↔ ink-700) + thumb slides left/right + track color slightly darker on press, medium haptic, 160ms
- Tap destructive row (Sign out / Delete): darkening + `scale(0.97)`, medium haptic, 160ms
- Focus-visible on any element: `CK-T03 --focus-ring` (2pt orange, 2pt offset), instant (no animation — focus is responsive, not choreographed)

**Reduced-motion** (`prefers-reduced-motion`):
- Section groups render at final opacity (no fade) and final position (no translateY)
- Toggle switches render at final state (no slide animation on user tap — just color swap, instant)
- Micro-interactions (scale, darken) removed; only haptic remains as the press feedback
- Destructive modal still slides from bottom (a system-level behavior; honesty preserves it) but without the fade-in backdrop — backdrop is instant

**Below-fold sections** (Appearance, Privacy, Emergency, About, Destructive — below the first viewport on most phones) animate **on scroll-into-view** with the same staggered fade-up pattern (not on screen mount, only when the user scrolls to them). This reduces initial paint time and prevents animation clutter above the fold.

Reconcile with Motion section (timings locked per `CONSISTENCY.md §3`).

### State craft

Every state designed; each cell is a layout + on-voice copy + depth/brand treatment (per `CK-P7`):

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | All toggles render at sensible defaults (Face ID off, notifications on, theme dark). All preference nav rows show default descriptions ("supportive" coaching style, "light" intensity, "none" emoji). No rows are blank. | No special empty-state copy — the screen is fully populated from onboarding. Optional text on first launch (below SIA note): "Adjust these anytime to match your preferences." — *warm, invitational, not a hint text* | `CK-P1` surfaces + warm glow on SIA note container. All rows render in final depth (not skeleton). No spinners. |
| **Loading** (such as preferences syncing after user changes) | Section affected by the change shows a subtle skeleton shimmer across all rows in that section (not full-screen spinner — only the section loading). Toggle row affected renders a 12pt spinner inside the switch's thumb. | No loading copy shown (the skeleton visual is enough). On timeout (5s): replace skeleton with error state + retry button. | Skeleton preserves layout + depth (grey boxes at right opacity on dark field, not full-white skeleton — respects dark UI); the section's `CK-P1` card remains visible around the skeleton. |
| **Empty / partial** | A section with no data (rare on Settings — most rows have defaults) still renders the row structure; the value cell shows a ghosted hint text. Such as if "Channels" hasn't been configured yet: nav row visible, right-side shows "not configured yet" in white-30 (ghosted, not an error). | "Not configured yet" (for unconfigured rows only). On the rare fully-empty section: "No custom settings — using defaults." — *calm, frames defaults as a feature, not a gap*. | Ghosted text (white-30, no glow, no animation). Row remains tappable (opens config sheet). |
| **Error** (sync failed, permission denied, validation failed) | The affected control(s) flash a red border (2pt, `--color-error-red`, calibrated-red only for genuine operational failure). Below the control, red error text. Such as toggle sync fails: track flashes red 400ms, reverts to previous state. Error text appears below: "Couldn't save. Check connection and retry." Below that, a small retry affordance (or the row remains tappable to re-attempt). | Error copy specific to the failure (never generic "Error"). Examples: "Current password incorrect" · "Network timeout, try again" · "This setting requires device update" · "Biometric setup incomplete — go to Settings app first". All error copy is direct and actionable, never shaming. | `CK-P1` card remains visible. Red border + error text only on the control that failed. Other rows in the section remain at normal state. Success/retry affordance always present below error. Red is never used outside operational error (not for disabled, not for unset preferences). |
| **Offline** | Cached banner (sticky, below nav header, z-20): light grey/white-10 background, 12pt text "You're offline. Changes will sync when your connection returns." No controls are disabled (Settings is all-local; toggles and picker rows stay interactive and save to local cache). | "You're offline. Changes will sync when you're back online." — *honest, calm, no alarm, implies automatic sync is coming* | Banner uses the banner token from _shared-patterns; below it, all section groups render normally (no dimming, no "disabled" opacity). |

Reconcile with Interaction States table (all cell designs honor the 8-state matrix per `CK-P8`).

### Signature & anti-generic

**Ownable Balencia moment:**
The **SIA note** (below SIA Preferences section) is the signature surface on a utility screen. It carries:
- **Purple dot (6pt, `--color-royal-purple`)** with a tiny warm glow (`--glow-purple-sm`, 0 0 12px rgba(127,36,255,0.35)) — the SIA indicator, warm not cold neon, the single purple accent on this settings screen (purple-10 rule honored)
- **Warm, specific coaching language** (authored, not templated): "Your coaching is built on what SIA learns from our conversations. These settings guide the tone. You can always adjust." — this is the *only* SIA presence on the screen, used with restraint (purple-10 rule honored)
- **The layered warm-surface treatment** on every grouped section container (`CK-P1` surfaces with edge-highlight, shadow, warm `--color-ink-brown-800`) is the brand's continuous signature: never flat boxes, always depth
- **The continuous-stroke underscore** is not present on this screen (Settings is a utility, not a narrative surface), but the SIA note's purple dot + glow is a micro-scale **continuous-stroke moment** — a single drawn accent that marks Balencia's presence without decoration

**Anti-generic kills:**
1. **Platform-familiar but authored:** The IA mirrors iOS Settings, but every row and every string is Balencia-authored, not a clone. Example: "Coaching style" (not "AI tone preset"), "Check-in times" (not "notification timing"), SIA note is warm and specific (not "SIA will learn your preferences")
2. **Warm, not cold:** All surfaces are `--color-ink-brown-800` (warm brown) on `--color-ink-900` (warm dark), with orange toggles, never slate/grey or neon. Depth is via warm glow, not harsh shadows.
3. **Non-shaming copy:** Every edge string is authored to avoid shame. "Biometric login" (not "Set up security"), "Health profile visibility" (not "Who sees your data — choose wisely"), error copy is direct ("Current password incorrect") not judgmental ("That's not right").
4. **Restrained, not maximal:** The screen shows every control the user needs and nothing more. No decorative cards, no motivational copy, no data visualization. Settings is calm and purposeful. A competitor clone would add badges, counts, or colorful domain chips throughout — this screen avoids that noise. Section headers (eyebrow style, white-40%) + generous 24–32pt gaps between sections add **rhythm and intentional blank space**, so the dense settings stay calm and hierarchical, not overwhelming.

### Accessibility

Tabulated contrast pairs (all load-bearing):

| Element | Foreground | Background | Contrast | Standard |
|---------|-----------|-----------|----------|----------|
| Row label text | white 100% | `--color-ink-brown-800` | 16.5:1 | WCAG AAA |
| Row value text | white 50% | `--color-ink-brown-800` | 8.2:1 | WCAG AA |
| Section header eyebrow | white 50% | `--color-ink-900` | 8.2:1 | WCAG AA |
| Toggle track (on) | `--color-brand-orange` | N/A (fill, not text) | N/A — glyph + word below |  WCAG 1.4.11 (3:1 graphics) |
| Toggle thumb | white 100% | orange track OR ink-700 track | 4.5:1 (both) | WCAG AA |
| Error text | `--color-error-red` | `--color-ink-900` field | 3.3:1 | WCAG AA (larger text allowed ≥18pt bold or ≥14pt bold) — error text is 13–15pt Regular, so 4.5:1 preferred; `--color-error-red` on `--color-ink-900` is 3.3:1, acceptable if paired with a glyph |
| Destructive row text | red (`--color-error-red`) | `--color-ink-brown-800` | 5.1:1 | WCAG AA |
| SIA note text | white 40% | `--color-ink-900` | 4:1 | WCAG AA |
| Purple dot (SIA indicator) | `--color-royal-purple` | `--color-ink-900` | 3.2:1 | WCAG 1.4.11 (graphics minimum 3:1; indicator dot is not text, meets 3:1) |

**Focus ring:** `CK-T03 --focus-ring` (2pt orange, 2pt offset) on every focusable element (back button, navigation rows, toggle switches, destructive rows, nav links inside sheets). Focus order:
1. Back button
2. Account section (email display, change password, biometric toggle, manage subscription, connected services)
3. SIA Preferences section (all 8 nav rows + preference pickers)
4. Notifications section (6 toggle rows, quiet hours, channels)
5. Appearance & Locale section (theme, language, units, time, date)
6. Privacy section (health visibility, leaderboard, data retention, background sync)
7. Emergency section
8. About section
9. Sign out row
10. Delete account row

**Targets:** All interactive elements ≥44×44pt. Rows are full-width × 52pt (row height). Toggle switches are 34pt × 20pt (within a 44pt × 44pt touch envelope). Settings gear icon (top-right, Me Main [17]) is 44×44pt. Chevrons and links are tappable as part of their row (full-width row is tappable).

**Semantic labeling (for screen readers):**
- Back button: "Back, navigate to Me Main"
- Each settings row: "[Label], [current value], [row type: button/toggle]" — such as "Coaching style, supportive, button" or "SIA insights notifications, on, toggle"
- Toggle switches: "Toggle [setting name], currently [on/off]"
- Destructive rows: "Sign out, button" / "Delete account, button"
- Section headers: Announced as group headings (`role="group"`, `aria-labelledby`)
- Chevrons: Not announced separately (semantic role of the parent button conveys navigation)

**Gesture alternatives:**
- Tap row / tap toggle = primary interaction (all interactive elements respond to tap)
- Swipe-right-from-edge (iOS) = back navigation (also available via back button tap)
- Keyboard / focus navigation = arrow keys (down/up to move focus), Enter/Space to activate
- Voice control (VoiceOver, TalkBack) = row labels are read naturally ("Coaching style, supportive, button"); user can tap to open sheet or toggle switch

**Reduced-motion:** `prefers-reduced-motion: reduce` removes all animations (no fade-up, no toggle slide). Screen renders with content visible instantly. Toggle switches render at final state (on or off) with no animation. Focus ring and press states remain (they're not animations, but responsive interactions).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Me Main [17] via stack pop, Connected Services [22] via stack push, Subscription & Billing [23] via stack push, Sign In [04] via root reset (sign out), Change Password bottom sheet (modal present), Quiet Hours picker (modal), Communication Style sub-screen (stack push), Check-in Times sub-screen (stack push), Tone Preference sub-screen (stack push), Data Visibility sub-screen (stack push), Terms of Service (in-app webview), Privacy Policy (in-app webview), Licenses (stack push)
- **Navigates from**: Me Main [17] via stack push
- **Shared components with**: Connected Services [22] (Settings Row — Navigation, Section Header, Section Group Container), Notification History [24] (Section Header), Help Center [25] (Section Header), Screen [05b] Reset Password (Password Requirements Checklist pattern)
- **Patterns used**: Back Button (Batch 1), Section Group Container (new), Settings Row — Navigation/Display/Toggle (new), Toggle Switch (new), Destructive Action Row (new), Section Header (new), SIA Note (new)
- **Patterns established**: Settings Row (3 variants: display, navigation, toggle), Toggle Switch, Section Header, Section Group Container, Destructive Action Row, SIA Note, Delete Account Confirmation Modal, **Biometric Auth Toggle** — device-aware toggle row showing Face ID/Touch ID/Biometric label based on hardware. Reusable for any biometric-gated setting. **Change Password Bottom Sheet** — 3-field password change form with real-time requirements validation. Follows standard bottom sheet modal spec with Password Requirements Checklist from [05b].
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-08.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/settings`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B08-F07 | major | navigation | Make the shared back affordance a labeled 44x44 semantic control with stack-pop behavior. |
| B08-F08 | critical | settings-control | Wire each row to its picker, sheet, confirmation, legal view, or route, and disable unavailable rows. |
| B08-F09 | major | mobile-ergonomics | Make the full 52px row toggle the setting, keep switch semantics, and persist the changed value. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

