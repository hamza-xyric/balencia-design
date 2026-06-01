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

