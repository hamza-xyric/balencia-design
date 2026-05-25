# Screen Design: Settings

**Screen**: 21 of 43
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
3. SIA preferences section — how the AI coach communicates
4. Notifications section — per-category toggles and quiet hours
5. Appearance section — dark/light mode
6. Privacy section — data visibility controls
7. About section — app info, legal links
8. Destructive zone — sign out and delete account, visually separated at bottom

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
│ │ Change password      ›  │ │  ← nav row
│ ├─────────────────────────┤ │
│ │ Manage subscription  ›  │ │  ← nav to [23]
│ ├─────────────────────────┤ │
│ │ Connected services   ›  │ │  ← nav to [22]
│ └─────────────────────────┘ │
│                             │  ← 24pt section gap
│  SIA PREFERENCES            │
│ ┌─────────────────────────┐ │
│ │ Communication style  ›  │ │  ← nav row
│ ├─────────────────────────┤ │
│ │ Check-in times       ›  │ │  ← nav row
│ ├─────────────────────────┤ │
│ │ Tone preference      ›  │ │  ← nav row
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
│ │ Quiet hours          ›  │ │  ← nav row (time picker)
│ └─────────────────────────┘ │
│                             │
│  APPEARANCE                 │
│ ┌─────────────────────────┐ │
│ │ Dark mode         [██] │ │  ← toggle (on by default)
│ └─────────────────────────┘ │
│                             │
│  PRIVACY                    │
│ ┌─────────────────────────┐ │
│ │ Data visibility      ›  │ │  ← nav row
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

3. **SIA Preferences Section** — ~216pt (header 32pt + 3 rows × 52pt + note 24pt)
   - Purpose: Control how SIA communicates
   - Content: Communication style, check-in times, tone preference (all nav rows to sub-screens)

4. **Notifications Section** — ~300pt (header 32pt + 5 rows × 52pt + gaps)
   - Purpose: Per-category notification control
   - Content: 4 toggle rows (SIA insights, reminders, check-ins, social) + quiet hours nav row

5. **Appearance Section** — ~84pt (header 32pt + 1 row × 52pt)
   - Purpose: Theme control
   - Content: Dark mode toggle (on by default)

6. **Privacy Section** — ~84pt (header 32pt + 1 row × 52pt)
   - Purpose: Data visibility controls
   - Content: Nav row to data visibility sub-screen

7. **About Section** — ~240pt (header 32pt + 4 rows × 52pt)
   - Purpose: App info and legal
   - Content: Version display, terms, privacy policy, licenses

8. **Destructive Actions** — ~120pt (2 standalone rows + gaps)
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
- **Variants**: On, off, disabled (0.5 opacity)
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

### Notification Preferences Section
- **Purpose**: Control notification frequency, categories, and quiet hours to prevent overload from 9 active domains
- **Data source**: User preferences (local + synced)
- **Visual treatment**: Standard settings section card (ink-brown-800, --r-md, 16pt padding)
- **Sub-elements**:
  - Section header: "notifications" (18pt Sora Semibold, white)
  - **Master toggle**: "push notifications" toggle switch (standard Toggle Switch pattern). Off = no push notifications at all.
  - **Daily digest toggle**: "daily digest" toggle. When on, batches non-urgent notifications into a single morning summary (default: 8:00 AM). Time picker appears below when enabled.
  - **Quiet hours row**: "quiet hours" with time range selector (default: 10:00 PM – 7:00 AM). Two time pickers side by side.
  - **Category toggles** (each with Toggle Switch):
    - "SIA insights & reminders" — default ON
    - "goal milestones" — default ON
    - "streak alerts" — default ON
    - "social & community" — default ON
    - "system updates" — default OFF
  - **Per-domain section**: "domain notifications" header + expandable list. Each domain row: domain tag chip + toggle. Default: all ON. User can mute entire domains from notifications.
  - **Frequency cap indicator**: "max 3 notifications per day" (13pt Regular, white at 40%). This is not user-adjustable — it's a system cap that adapts to motivation tier (low: max 1/day, medium: max 3/day, high: max 5/day).
- **Gestures**: Standard toggle taps, time picker interactions
- **Size**: Variable height (~400pt with all options visible)

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
| Disabled | 0.5 opacity on entire row | — |
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
| Disabled | 0.5 opacity, no touch response | — |
| Loading | Thumb replaced with tiny spinner (12pt) | — |
| Error | Track flashes red (#f44336) briefly (400ms), reverts to previous state | error notification |
| Success | N/A (toggles don't have distinct success — the state change IS the success) | — |

### Destructive Action Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 background, #f44336 text, center-aligned | — |
| Pressed | Background darkens, text at 70% opacity, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring (#f44336), offset 2pt | — |
| Disabled | 0.5 opacity | — |
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

## Cross-References

- **Navigates to**: Me Main [17] via stack pop, Connected Services [22] via stack push, Subscription & Billing [23] via stack push, Sign In [04] via root reset (sign out), Change Password flow (modal), Quiet Hours picker (modal), Communication Style sub-screen (stack push), Check-in Times sub-screen (stack push), Tone Preference sub-screen (stack push), Data Visibility sub-screen (stack push), Terms of Service (in-app webview), Privacy Policy (in-app webview), Licenses (stack push)
- **Navigates from**: Me Main [17] via stack push
- **Shared components with**: Connected Services [22] (Settings Row — Navigation, Section Header, Section Group Container), Notification History [24] (Section Header), Help Center [25] (Section Header)
- **Patterns used**: Back Button (Batch 1), Section Group Container (new), Settings Row — Navigation/Display/Toggle (new), Toggle Switch (new), Destructive Action Row (new), Section Header (new), SIA Note (new)
- **Patterns established**: Settings Row (3 variants: display, navigation, toggle), Toggle Switch, Section Header, Section Group Container, Destructive Action Row, SIA Note, Delete Account Confirmation Modal
- Pre-permission education screen: System should show a notification preview screen before requesting iOS notification permission. Triggered after Day 2-3 of usage, not during onboarding. Uses the same pre-education card pattern established in Screen [34] (Location Permission Flow) — explain value before requesting system permission.
