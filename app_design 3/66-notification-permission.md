# Screen Design: Notification Permission

**Screen**: 66 of 73
**File**: 66-notification-permission.md
**Register**: Brand Mode (auth-adjacent)
**Primary action**: enable push notifications
**Tab**: None (modal/interstitial — no tab bar)
**Navigation**: Interstitial screen shown after SIA Onboarding [07] and before Home [12] on first launch. Also presented as modal from Settings [21] or Accountability [46] when notification access is needed but not granted. On first launch, this is a stack push from the onboarding flow. On re-entry, it is a modal slide-up from the requesting screen. The screen is always dismissible via the "Not now" link — it never blocks app access.

---

## Purpose

iOS grants exactly one chance to show the native notification permission dialog. If the user declines that system prompt, notifications are permanently off unless they manually navigate to Settings > Balencia > Notifications — a path most users will never take. This makes the system dialog a one-shot moment with permanent consequences. The pre-permission screen exists to dramatically improve the opt-in rate by framing the ask around concrete, personal benefits before the irreversible system prompt fires. Research shows that pre-permission screens increase notification opt-in rates by 2-3x compared to cold-prompting with the system dialog alone.

The screen achieves three things: (1) it shows the user exactly what they gain from notifications — SIA coaching nudges, streak protection, accountability partner updates — so the decision is informed, not reflexive; (2) it gives users who are not ready a soft "Not now" exit that avoids burning the one-time system prompt; (3) it primes the user psychologically so that when the iOS dialog appears immediately after tapping "Enable Notifications," they tap "Allow" with conviction rather than defaulting to "Don't Allow" out of habit.

The tone is warm and benefit-driven, not desperate. The screen should feel like SIA explaining how it will stay in touch, not like the app begging for permission. The illustration and benefit rows create a visual story: "Here is what you will miss if you say no."

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Bell illustration with notification badges — the visual hook, immediately communicates "this is about notifications" without reading a single word
2. Title ("Stay on track") — the value proposition in three words, positioned as a benefit to the user rather than a request from the app
3. Benefit rows (3 rows with icons) — the specific, concrete reasons to enable notifications, each tied to a core Balencia feature
4. "Enable Notifications" CTA — the primary action, dominant visual weight, triggers the iOS system dialog
5. "Not now" skip link — the escape hatch, always available, no guilt language

**User flow**:
- **Arrives from (first launch)**: SIA Onboarding [07] → Initial Plan Summary [08] → this screen [66] via stack push. The user has just completed onboarding and is about to enter the app for the first time. SIA's plan is set, goals are established — the user is primed and invested.
- **Arrives from (re-entry)**: Settings [21] → Notification Settings toggle → this screen [66] as modal, OR Accountability Partners [46] → "Enable notifications to get partner updates" prompt → this screen [66] as modal, OR Reminders [61] → "Turn on notifications for reminders" prompt → this screen [66] as modal.
- **Primary exit (allow)**: User taps "Enable Notifications" → iOS system dialog appears → user taps "Allow" → screen auto-dismisses → navigates to Home [12] (first launch) or dismisses modal back to requesting screen (re-entry).
- **Secondary exit (system denied)**: User taps "Enable Notifications" → iOS system dialog appears → user taps "Don't Allow" → screen shows brief acknowledgment, then navigates to Home [12] (first launch) or dismisses modal (re-entry). Notification status is recorded as denied.
- **Tertiary exit (skip)**: User taps "Not now" → screen dismisses without triggering the system dialog → navigates to Home [12] (first launch) or dismisses modal (re-entry). The one-time system prompt is preserved for a future attempt.

---

## Layout

**Scroll behavior**: None (fixed, single viewport). All content fits within a single screen on all supported devices (iPhone SE through iPhone Pro Max). On iPhone SE, spacing between the illustration and benefit rows compresses by 8pt but never scrolls.
**Tab bar visible**: No
**Status bar**: Visible, light-content style (white icons on dark background)

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │
│                                     │  <- 56pt top spacer
│                                     │
│          ┌─────────────┐            │
│          │    ┌───┐    │            │
│          │    │ 🔔│    │            │  <- Bell Illustration (120pt)
│          │    └───┘    │            │     centered, with floating
│          │  [3] [●] [2]│            │     notification badges
│          └─────────────┘            │
│                                     │  <- 32pt gap
│        ┌─────────────────┐          │
│        │  Stay on track   │          │  <- Title (26pt Sora Bold)
│        └─────────────────┘          │     centered, white
│                                     │  <- 8pt gap
│    ┌───────────────────────┐        │
│    │  SIA uses notifications │       │  <- Subtitle (15pt Regular)
│    │  to help you build     │        │     centered, white at 60%
│    │  lasting habits.       │        │
│    └───────────────────────┘        │
│                                     │  <- 32pt gap
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │  ◉ SIA sends timely          │  │  <- Benefit Row 1 (purple dot)
│  │    coaching nudges            │  │     SIA coaching reminders
│  │                               │  │  <- 16pt gap
│  │  ◉ Never miss a day          │  │  <- Benefit Row 2 (orange flame)
│  │    accidentally               │  │     Streak protection
│  │                               │  │  <- 16pt gap
│  │  ◉ Know when partners        │  │  <- Benefit Row 3 (green dot)
│  │    check in                   │  │     Accountability updates
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │  <- flexible spacer
│                                     │
│  ┌───────────────────────────────┐  │
│  │      ENABLE NOTIFICATIONS     │  │  <- Brand CTA Button (56pt)
│  └───────────────────────────────┘  │     full-width minus 48pt margins
│                                     │  <- 16pt gap
│            Not now                  │  <- Skip link (15pt)
│                                     │     centered, white at 50%
│                                     │  <- 24pt bottom padding
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Purpose: System status bar area
   - Content: Light-content style (white icons), transparent background over ink-900

2. **Top Spacer** — 56pt (fixed; compresses to 40pt on iPhone SE)
   - Purpose: Breathing room below status bar, centers the content cluster vertically in the viewport

3. **Bell Illustration Area** — 120pt height x 120pt width
   - Purpose: Immediate visual communication — "this screen is about notifications" — before the user reads any text
   - Content: Animated bell icon with floating notification badge chips

4. **Illustration-to-Title Gap** — 32pt

5. **Title Block** — ~34pt (single line)
   - Purpose: Value proposition in three words
   - Content: "Stay on track" in 26pt Sora Bold, white, centered

6. **Title-to-Subtitle Gap** — 8pt

7. **Subtitle Block** — ~44pt (2 lines)
   - Purpose: Brief explanation connecting notifications to SIA and habit-building
   - Content: "SIA uses notifications to help you build lasting habits." in 15pt Sora Regular, white at 60%, centered

8. **Subtitle-to-Benefits Gap** — 32pt

9. **Benefit Rows Block** — ~168pt (3 rows x 56pt each)
   - Purpose: Three concrete, feature-specific reasons to enable notifications
   - Content: Icon + title + description per row, left-aligned within 24pt margins

10. **Flexible Spacer** — expands to fill remaining space
    - Purpose: Pushes CTA and skip link to the bottom thumb zone

11. **Enable Notifications CTA** — 56pt
    - Purpose: Primary action — triggers the iOS system notification permission dialog
    - Content: Full-width button (24pt horizontal margins), pill radius

12. **CTA-to-Skip Gap** — 16pt

13. **Not Now Skip Link** — 44pt touch target (text centered vertically)
    - Purpose: Soft exit that preserves the one-time system prompt for later
    - Content: "Not now" text link, centered

14. **Bottom Padding** — 24pt (above home indicator safe area)

15. **Home Indicator Zone** — 34pt
    - Purpose: System safe area

---

## Components

### Bell Illustration

- **Purpose**: The visual anchor of the screen. A bell icon surrounded by floating notification badge chips creates an immediate, universal association with push notifications. The illustration does the heavy lifting before the user reads a word — they know exactly what this screen is asking.
- **Data source**: Static asset + animation layer
- **Visual treatment**: Centered horizontally. The bell is a custom Balencia bell icon (not SF Symbols), 64pt, white at 90%, with a subtle inner glow (white at 8%, 4pt blur). The bell sits within a 120pt circular zone. Around the bell, three small notification badge chips float at slight offsets:
  - Top-right badge: 24pt diameter circle, Royal Purple (#7F24FF) fill, white "3" text (12pt Sora Bold, centered). Represents SIA coaching notifications.
  - Bottom-left badge: 20pt diameter circle, Burnt Orange (#FF5E00) fill, white flame icon (10pt). Represents streak alerts.
  - Top-left badge: 20pt diameter circle, Forest Green (#34A853) fill, white checkmark icon (10pt). Represents accountability partner updates.
  - Each badge has a 2pt ink-900 border (cutout effect) and --shadow-1 for subtle elevation.
- **Animation**: See Motion section. The bell gently sways, and badges float in with staggered timing.
- **Variants**: None (always the same illustration)
- **Gestures**: None (decorative)
- **Size**: 120pt x 120pt bounding area

### Screen Title

- **Purpose**: The value proposition in three words. "Stay on track" frames notifications as a tool for the user's benefit rather than a request from the app. The language is active and empowering.
- **Data source**: Static copy (localized)
- **Visual treatment**: "Stay on track" — 26pt Sora Bold, white (#FFFFFF), center-aligned. Single line on all devices. Letter spacing: standard (0em). Horizontal padding: 24pt per side (auth/brand screen margins).
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width minus 48pt x ~34pt

### Screen Subtitle

- **Purpose**: Connects the ask to SIA specifically — the user's AI coach they just met in onboarding. This personalizes the request. "Build lasting habits" ties notifications to the user's goals rather than the app's metrics.
- **Data source**: Static copy (localized)
- **Visual treatment**: "SIA uses notifications to help you build lasting habits." — 15pt Sora Regular, white at 60% opacity, center-aligned. Max 2 lines. Line height: 22pt. Horizontal padding: 24pt per side.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width minus 48pt x ~44pt (2 lines)

### Benefit Row — SIA Coaching Nudges

- **Purpose**: The first and most important benefit. SIA's coaching nudges are the core value proposition of Balencia. The purple dot icon ties this benefit visually to SIA (purple = AI throughout the app).
- **Data source**: Static copy
- **Visual treatment**: 
  - Container: Full-width minus 48pt horizontal margins, 56pt height, flex row, vertically centered.
  - Icon: 36pt diameter circle, Royal Purple (#7F24FF) at 15% fill, centered within circle: SIA mini-avatar silhouette icon (16pt, Royal Purple at 100%). The subtle purple background circle creates visual weight without overwhelming the row.
  - Text block (12pt left of icon): 
    - Title: "SIA coaching nudges" — 16pt Sora Semibold, white (#FFFFFF). Single line.
    - Description: "Timely reminders tailored to your goals" — 13pt Sora Regular, white at 50%. Single line. 2pt below title.
  - No divider between rows — spacing handles visual separation.
- **Variants**: None
- **Gestures**: None (informational)
- **Size**: Full-width minus 48pt x 56pt

### Benefit Row — Streak Protection

- **Purpose**: The second benefit appeals to loss aversion — users who have started building streaks do not want to lose them accidentally. The orange flame icon ties to the streak/gamification system (orange = action/brand throughout the app).
- **Data source**: Static copy
- **Visual treatment**: 
  - Container: Same as Row 1 — full-width minus 48pt, 56pt height, flex row.
  - Icon: 36pt diameter circle, Burnt Orange (#FF5E00) at 15% fill, centered within circle: flame icon (16pt, Burnt Orange at 100%).
  - Text block:
    - Title: "Streak protection" — 16pt Sora Semibold, white.
    - Description: "Never miss a day accidentally" — 13pt Sora Regular, white at 50%. 2pt below title.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width minus 48pt x 56pt

### Benefit Row — Accountability Updates

- **Purpose**: The third benefit ties into the social accountability system. Users who have accountability partners want to know when their partner checks in. The green dot icon ties to success/social (green = positive throughout the app).
- **Data source**: Static copy
- **Visual treatment**: 
  - Container: Same as Rows 1-2 — full-width minus 48pt, 56pt height, flex row.
  - Icon: 36pt diameter circle, Forest Green (#34A853) at 15% fill, centered within circle: person-with-checkmark icon (16pt, Forest Green at 100%).
  - Text block:
    - Title: "Partner updates" — 16pt Sora Semibold, white.
    - Description: "Know when accountability partners check in" — 13pt Sora Regular, white at 50%. 2pt below title.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width minus 48pt x 56pt

### Enable Notifications CTA Button

- **Purpose**: The primary action on the screen. Tapping this button immediately triggers the native iOS notification permission dialog (UNUserNotificationCenter.requestAuthorization). This is the irreversible moment — once the system dialog fires, the user's response is final (unless they go to Settings).
- **Data source**: Calls `UNUserNotificationCenter.requestAuthorization(options: [.alert, .badge, .sound])` on iOS. On Android, calls `PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)` (Android 13+) or enables directly (Android 12 and below).
- **Visual treatment**: Brand CTA Button (established Screen 03). Full-width minus 48pt horizontal margins (24pt per side). Height: 56pt. Background: Burnt Orange (#FF5E00). Text: "Enable Notifications" in 17pt Sora Semibold, white, center-aligned. Border radius: --r-pill (999pt). Shadow: --shadow-2 for elevation emphasis. Subtle glow pulse (--glow-orange oscillating between 0.15 and 0.30 opacity) to draw attention.
- **Content**: "Enable Notifications" (static)
- **Variants**: See Interaction States section for all 8 states
- **Gestures**: Tap triggers the system notification permission dialog
- **Size**: Full-width minus 48pt x 56pt

### Not Now Skip Link

- **Purpose**: A soft, guilt-free exit. The language "Not now" implies "maybe later" — it is honest and respectful. Critically, tapping "Not now" does NOT trigger the system dialog. This preserves the one-time system prompt for a future attempt when the user might be more receptive (e.g., when they enable Accountability Partners and are asked again). This is the strategic advantage of the pre-permission pattern: "Not now" on the custom screen is free, while "Don't Allow" on the system dialog is permanent.
- **Data source**: Writes `notification_prepermission_skipped = true` and `notification_prepermission_skipped_at = now` to user preferences. Does NOT call any system notification APIs.
- **Visual treatment**: "Not now" — 15pt Sora Regular, white at 50%, center-aligned. 44pt touch target height (text vertically centered within target area). Positioned 16pt below the CTA button. No underline, no button chrome — just text.
- **Variants**: See Interaction States section
- **Gestures**: Tap to dismiss screen without triggering system dialog
- **Size**: Text width (minimum 44pt) x 44pt touch target

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark, no gradient |
| Bell icon | white at 90% | -- | Primary illustration element |
| Bell inner glow | white at 8% | -- | Subtle warmth on bell surface |
| SIA badge (top-right) | #7F24FF | royal-purple | 10% role — AI indicator |
| SIA badge text | #FFFFFF | white | "3" numeral |
| Streak badge (bottom-left) | #FF5E00 | brand-orange | Action signifier |
| Streak badge icon | #FFFFFF | white | Flame icon |
| Partner badge (top-left) | #34A853 | forest-green | Social/success indicator |
| Partner badge icon | #FFFFFF | white | Checkmark icon |
| Badge borders | #0A0A0F | ink-900 | Cutout border (2pt) |
| Title text | #FFFFFF | white | Primary message |
| Subtitle text | white at 60% | -- | Secondary explanation |
| Row 1 icon background | #7F24FF at 15% | royal-purple (reduced) | SIA coaching row |
| Row 1 icon | #7F24FF | royal-purple | SIA silhouette |
| Row 2 icon background | #FF5E00 at 15% | brand-orange (reduced) | Streak row |
| Row 2 icon | #FF5E00 | brand-orange | Flame icon |
| Row 3 icon background | #34A853 at 15% | forest-green (reduced) | Partner row |
| Row 3 icon | #34A853 | forest-green | Person icon |
| Row title text | #FFFFFF | white | Benefit title |
| Row description text | white at 50% | -- | Benefit detail |
| CTA button fill | #FF5E00 | brand-orange | Primary action — dominant element |
| CTA button text | #FFFFFF | white | Button label |
| CTA pressed fill | #E55400 | -- | Darker orange on press |
| CTA disabled fill | #FF5E00 at 40% | brand-orange (reduced) | Loading/waiting state |
| CTA glow (pulse) | rgba(255, 94, 0, 0.25) | -- | Subtle attention pulse |
| Skip link text | white at 50% | -- | Low-priority exit |
| Skip link pressed | white at 30% | -- | Feedback on press |

**60/30/10 verification**: This is a Brand Mode screen. Orange appears on: the CTA button (largest colored element), the streak protection badge, the streak benefit row icon — serving as the primary action/brand accent (60% role). Green appears on: the accountability badge and benefit row icon — success/social indicator (30% role). Purple appears on: the SIA coaching badge and benefit row icon — AI indicator (10% role). The three benefit rows create a color triad (purple, orange, green) that maps exactly to Balencia's three-color system, each tied to its semantic meaning. The background is neutral ink-900. The ratio holds: orange drives the action, green and purple serve supporting indicator roles.

---

## Interaction States

### Enable Notifications CTA Button (8-State Model)

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | Burnt Orange (#FF5E00) fill, white text "Enable Notifications", --shadow-2, --r-pill. Subtle glow pulse animation (opacity oscillates 0.15-0.30, 2400ms cycle). | Idle, awaiting tap |
| 2 | **Pressed** | Darker orange (#E55400) fill, scale(0.97), shadow reduces to --shadow-1, glow dims to static 0.10 | Finger down on button |
| 3 | **Loading** | Orange fill at 60% opacity, white circular spinner (20pt) replaces text, centered. Button is non-interactive. | System permission dialog is being prepared (brief, typically <200ms) |
| 4 | **Success** | Green (#34A853) fill transition (200ms), white checkmark icon replaces spinner, --glow-green pulse. Holds for 800ms, then screen transitions out. | User tapped "Allow" on the system dialog |
| 5 | **Error** | Button reverts to Default state. No error shown on the button itself — the system dialog denial is handled by the screen-level flow (see Error Handling). | User tapped "Don't Allow" on the system dialog |
| 6 | **Disabled** | Not applicable — the button is always enabled when the screen is visible. If notifications are already granted (re-entry edge case), the screen should not be shown at all. | -- |
| 7 | **Focus-visible** | 2pt orange ring (#FF5E00), offset 2pt outside button edge. For accessibility focus navigation (VoiceOver, Switch Control). | Keyboard / switch control focus |
| 8 | **Hover** | Not applicable on mobile. On tablet with pointer: orange lightens slightly (mix with 10% white), cursor changes to pointer. | Pointer hover (iPad) |

### Not Now Skip Link (8-State Model)

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | "Not now" in 15pt Sora Regular, white at 50% | Idle |
| 2 | **Pressed** | White at 30%, scale(0.97) | Finger down |
| 3 | **Loading** | Not applicable | -- |
| 4 | **Success** | Not applicable (skip is immediate) | -- |
| 5 | **Error** | Not applicable | -- |
| 6 | **Disabled** | Not applicable | -- |
| 7 | **Focus-visible** | 2pt orange ring (#FF5E00), offset 2pt | VoiceOver / Switch Control |
| 8 | **Hover** | White at 60% on iPad with pointer | Pointer hover |

### Haptic Feedback

| Trigger | Haptic Type |
|---------|-------------|
| CTA tap (pressed) | Medium impact |
| CTA success (user allowed notifications) | Success notification |
| Skip link tap | Light impact |
| Screen appearance | None (avoid startling the user during a permission flow) |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Enable Notifications CTA | Triggers iOS system notification permission dialog via `UNUserNotificationCenter.requestAuthorization`. On Android, calls `PermissionsAndroid.request`. |
| Tap | Not now skip link | Dismisses screen without triggering system dialog. Records `notification_prepermission_skipped` in user preferences. Navigates to Home [12] (first launch) or dismisses modal (re-entry). |
| Swipe right from edge | Screen (first launch context) | **Blocked** — no back navigation during first-launch interstitial. The user has completed onboarding; going back to the plan summary is illogical. |
| Swipe down | Screen (modal context) | Dismisses modal (same behavior as "Not now"). Only available when the screen is presented as a modal from Settings [21], Accountability [46], or Reminders [61]. Not available in first-launch interstitial context. |
| Tap outside content | Screen | No action. The screen is inert except for the CTA and skip link. |
| Hardware back (Android) | System | Same as "Not now" — dismisses screen without triggering system dialog. |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen background | Mount | Fade in from transparent to ink-900 (or slide up if modal) | 280ms | ease-out-soft |
| Bell icon | Screen mount | Fade in + scale(0.85 to 1.0), centered | 320ms, 0ms delay | ease-out-soft |
| Bell sway | After entrance settled | Gentle rotation oscillation: rotate(-3deg to 3deg), infinite loop | 3000ms per cycle | ease-in-out (sinusoidal) |
| Bell clapper knock | Each sway peak | At rotation extremes, a tiny impulse (translateX 1pt) suggests the clapper hitting the bell wall | 80ms | ease-out |
| SIA badge (purple) | Bell settled | Scale(0 to 1.0) + fade in, springs from top-right of bell | 240ms, 320ms delay | ease-out-back (slight overshoot) |
| Streak badge (orange) | Bell settled | Scale(0 to 1.0) + fade in, springs from bottom-left of bell | 240ms, 440ms delay | ease-out-back |
| Partner badge (green) | Bell settled | Scale(0 to 1.0) + fade in, springs from top-left of bell | 240ms, 560ms delay | ease-out-back |
| Badge float | After entrance | Each badge gently floats (translateY oscillation, 2pt amplitude, staggered phase offsets) | 2400ms per cycle, infinite | ease-in-out (sinusoidal) |
| Title | Screen mount | Fade in + translateY(8pt to 0) | 280ms, 400ms delay | ease-out-soft |
| Subtitle | Screen mount | Fade in + translateY(8pt to 0) | 280ms, 480ms delay | ease-out-soft |
| Benefit Row 1 | Screen mount | Fade in + translateX(-12pt to 0) | 280ms, 560ms delay | ease-out-soft |
| Benefit Row 2 | Screen mount | Fade in + translateX(-12pt to 0) | 280ms, 640ms delay | ease-out-soft |
| Benefit Row 3 | Screen mount | Fade in + translateX(-12pt to 0) | 280ms, 720ms delay | ease-out-soft |
| CTA button | Screen mount | Fade in + translateY(16pt to 0) | 280ms, 800ms delay | ease-out-soft |
| CTA glow pulse | CTA visible | Box-shadow oscillates: --glow-orange opacity 0.15 to 0.30 | 2400ms per cycle, infinite, starts at 1200ms | ease-in-out (sinusoidal) |
| Skip link | Screen mount | Fade in | 280ms, 880ms delay | ease-out-soft |
| CTA press | Finger down | Scale(1.0 to 0.97) + fill darkens to #E55400 | 80ms | ease-out |
| CTA release | Finger up | Scale(0.97 to 1.0) + fill restores | 160ms | ease-out-soft |
| CTA success | User allowed notifications | Fill crossfade orange to green (#34A853), text crossfade to checkmark icon, --glow-green pulse | 200ms fill, 160ms icon | ease-flow |
| Screen exit (success) | After success hold (800ms) | All content fades out, screen transitions to Home [12] via crossfade | 280ms | ease-out-soft |
| Screen exit (skip) | "Not now" tapped | All content fades out, navigates to Home [12] or modal dismisses | 280ms | ease-out-soft |
| Screen exit (denied) | System dialog denied | Brief pause (400ms), then content fades out, navigates to Home [12] or modal dismisses | 280ms after 400ms pause | ease-out-soft |

**Animation sequence (total ~1.1s to full visibility)**:
1. **0ms**: Screen fades in, bell icon begins scale-in entrance
2. **320ms**: Bell settled — SIA badge (purple) springs in
3. **400ms**: Title fades in
4. **440ms**: Streak badge (orange) springs in
5. **480ms**: Subtitle fades in
6. **560ms**: Benefit Row 1 slides in from left, partner badge (green) springs in
7. **640ms**: Benefit Row 2 slides in from left
8. **720ms**: Benefit Row 3 slides in from left
9. **800ms**: CTA button slides up into position
10. **880ms**: Skip link fades in
11. **1200ms**: CTA glow pulse begins its infinite cycle, bell sway begins, badges begin floating

**Reduced motion preference**: All entrance animations are replaced with immediate opacity 1 and final position (no translate, no scale). The bell sway animation is disabled (bell remains static). Badge float is disabled (badges remain at their final positions). The CTA glow pulse is replaced with a static --glow-orange at 0.20 opacity (no animation). The screen renders fully in a single 200ms fade-in.

**Screen transition**:
- **Enter (first launch)**: Crossfade from Initial Plan Summary [08] or stack push from right, 280ms, ease-out-soft.
- **Enter (re-entry modal)**: Modal slide-up from bottom (translateY(100% to 0)), 520ms, ease-flow. Semi-transparent ink-900 at 50% backdrop behind the modal for context.
- **Exit (allowed / denied / skipped, first launch)**: Crossfade to Home [12], 280ms.
- **Exit (allowed / denied / skipped, modal)**: Modal slides down (translateY(0 to 100%)), 280ms, ease-out-soft. Backdrop fades out simultaneously.

---

## Empty States

### Not applicable

This screen has no empty state. It always displays its full content (illustration, title, subtitle, three benefit rows, CTA, skip link). The content is entirely static — there is no data to load, no network dependency, and no conditional content. The screen either appears (when notification permission has not been determined or was previously skipped) or it does not appear (when notifications are already granted or permanently denied via the system dialog).

### Edge case: Notifications already granted

If the app detects that notification permission is already `.authorized` (e.g., the user granted it previously and then the app was reinstalled, or a background permission sync updated the state), this screen is skipped entirely. The navigation flow proceeds directly from SIA Onboarding [07] / Initial Plan Summary [08] to Home [12] without stopping here.

### Edge case: Notifications permanently denied

If the app detects that notification permission status is `.denied` (the user previously saw and declined the system dialog — not the pre-permission screen, but the actual iOS dialog), this screen is not shown in its standard form. Instead, when re-triggered from Settings [21] or Accountability [46], a modified version appears: the CTA text changes to "Open Settings" and tapping it opens the iOS Settings app directly to the Balencia notification preferences page via `UIApplication.openSettingsURL()`. The "Not now" link remains unchanged.

---

## Error Handling

### System Dialog Denied ("Don't Allow")

- **Trigger**: User taps "Enable Notifications" CTA, the iOS system dialog appears, and the user taps "Don't Allow"
- **Behavior**: The system returns `.denied` to the authorization callback. The screen does not show an error — this is a valid user choice, not a failure. The CTA briefly shows a neutral acknowledgment: the button text changes to "Got it" with the orange fill dimming to 40% opacity for 400ms, then the screen transitions out (crossfade to Home [12] on first launch, or modal dismiss on re-entry). A record is written: `notification_system_denied = true`, `notification_system_denied_at = now`. This record ensures the pre-permission screen is not shown again in its standard form (only the "Open Settings" variant on re-entry).
- **No guilt messaging**: The screen does not say "You won't receive important updates!" or anything punitive. The user made their choice; Balencia respects it.

### System Dialog Not Available

- **Trigger**: On rare occasions, iOS may fail to present the system dialog (e.g., if the app's notification entitlement is misconfigured, or the dialog was already consumed in a prior installation without a clean uninstall)
- **Behavior**: If `requestAuthorization` returns an error rather than a granted/denied status, the screen logs the error to analytics, the CTA reverts to its Default state, and a subtle inline message appears below the CTA: "Something went wrong. You can enable notifications in Settings later." — 13pt Sora Regular, white at 50%, center-aligned, fade-in over 280ms. The screen remains interactive — the user can tap the CTA to retry or tap "Not now" to proceed.
- **Retry**: No limit on retries. Each CTA tap re-attempts `requestAuthorization`.

### Re-Entry from Settings [21] / Accountability [46] / Reminders [61]

- **Trigger**: A feature requires notifications (e.g., user enables accountability partner pairing in [46], or creates a reminder in [61]), but notification permission is either `.notDetermined` (never asked) or `.denied` (previously declined via system dialog)
- **Behavior for `.notDetermined`**: The standard pre-permission screen is shown as a modal. The CTA triggers the system dialog as normal.
- **Behavior for `.denied`**: The modified pre-permission screen is shown as a modal. The CTA text is "Open Settings" and tapping it calls `UIApplication.openSettingsURL()` to deep-link the user to Balencia's notification settings in the iOS Settings app. When the user returns to the app (via app switcher), the app re-checks notification status. If now `.authorized`, the modal auto-dismisses with the success state animation. If still `.denied`, the modal remains visible with the CTA reset to Default.

### Android-Specific: Permission Rationale

- **Trigger**: On Android 13+, the system may require a rationale before re-requesting the POST_NOTIFICATIONS permission (if previously denied once but not permanently)
- **Behavior**: The pre-permission screen itself serves as the rationale. The CTA triggers `PermissionsAndroid.request()`. If the user denied previously and the system shows "Don't ask again" in the native dialog, the app records this and future re-entries use the "Open Settings" variant (same as iOS `.denied` flow).

---

## Accessibility

- **VoiceOver / TalkBack reading order**: Bell illustration (decorative, skipped) -> Title -> Subtitle -> Benefit Row 1 (icon label + title + description as one element) -> Benefit Row 2 -> Benefit Row 3 -> Enable Notifications button -> Not now link
- **VoiceOver announcement on screen mount**: "Stay on track. SIA uses notifications to help you build lasting habits. Enable Notifications button available."
- **Bell illustration**: `accessibilityElementsHidden={true}` — decorative, provides no information not covered by the title and subtitle.
- **Benefit Row 1**: `accessibilityLabel="SIA coaching nudges. Timely reminders tailored to your goals."` — combined as one accessible element.
- **Benefit Row 2**: `accessibilityLabel="Streak protection. Never miss a day accidentally."` — combined as one accessible element.
- **Benefit Row 3**: `accessibilityLabel="Partner updates. Know when accountability partners check in."` — combined as one accessible element.
- **CTA button**: `accessibilityRole="button"`, `accessibilityLabel="Enable Notifications"`, `accessibilityHint="Double tap to allow Balencia to send you notifications"`. When in "Open Settings" variant: `accessibilityLabel="Open Settings"`, `accessibilityHint="Double tap to open notification settings for Balencia"`.
- **Skip link**: `accessibilityRole="button"`, `accessibilityLabel="Not now"`, `accessibilityHint="Double tap to skip enabling notifications. You can enable them later in Settings."`.
- **Dynamic type**: Title and benefit text scale with system font size up to 1.3x. Beyond 1.3x, text truncates gracefully (benefit descriptions may wrap to 2 lines, which expands the row height from 56pt to 72pt).
- **High contrast mode**: CTA button gains a 2pt white border for additional definition. Skip link opacity increases from 50% to 70%. Benefit row icon background opacity increases from 15% to 25%.
- **Reduced motion**: See Motion section above.

---

## Motivation Adaptation

Not applicable. This screen appears during onboarding (before any motivation model exists) or as a system-level permission request from Settings / feature screens. It is not a coaching moment — it is an infrastructure requirement. The tone is warm and brand-consistent, but it does not adapt to low/medium/high motivation states. All users see the same content and the same CTA.

The one exception: if the screen is triggered from Accountability Partners [46] during a high-motivation session, the subtitle may optionally include context: "Your accountability partner is waiting. Turn on notifications to stay connected." This minor adaptation is controlled by passing an optional `trigger_context` parameter when presenting the screen. If no context is provided, the default subtitle is shown.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Title | Sora | 700 (Bold) | 26pt | 34pt | White |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 60% |
| Benefit row title | Sora | 600 (Semibold) | 16pt | 22pt | White |
| Benefit row description | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| CTA button text | Sora | 600 (Semibold) | 17pt | 22pt | White |
| "Not now" link | Sora | 400 (Regular) | 15pt | 22pt | White at 50% |
| Error inline message | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |

---

## Cross-References

- **Navigates to**: Home Screen [12] (first launch, after allow/deny/skip). Settings App (external, when "Open Settings" variant is shown for `.denied` users). Requesting screen (modal dismiss, re-entry context — returns to Settings [21], Accountability Partners [46], or Reminders [61]).
- **Navigates from**: SIA Onboarding [07] / Initial Plan Summary [08] (first launch, stack push or crossfade). Settings [21] (re-entry, modal presentation when user toggles notification-dependent setting). Accountability Partners [46] (re-entry, modal when partner pairing requires notifications). Reminders [61] (re-entry, modal when creating a reminder requires notifications).
- **Shared components with**: Screen [03] — Welcome/Sign Up (Brand CTA Button pattern: full-width, 56pt, --r-pill, orange). Screen [65] — Force Update (full-screen interstitial with single CTA pattern, though Force Update is non-dismissible while this screen is always dismissible). Screen [03e] — WhatsApp Enrollment (optional enrollment interstitial with skip link, benefit preview list pattern). Screen [69] — App Rating (modal presentation pattern from system trigger, "not now" dismissal link).
- **Patterns used**: Brand CTA Button (Screen 03: full-width, 56pt, --r-pill, orange fill, white text), Skip Link Pattern (Screen 02/03e: low-priority text link, white at 50%, 44pt touch target), Content Entry Animation (staggered fade-in, shared pattern), CTA Glow Pulse (Screen 65: infinite --glow-orange oscillation), 8-State Interaction Model (shared pattern), Brand Mode color register (orange-dominant, purple/green supporting).
- **Patterns established**: **Pre-Permission Screen** — a custom interstitial shown before an irreversible OS permission dialog, designed to prime the user with concrete benefits and provide a soft "Not now" exit that preserves the system prompt for later. Reusable for any OS permission (camera, microphone, location, health data) where a single system dialog has permanent consequences. **Benefit Row with Color-Coded Icon** — a horizontal row layout with a 36pt colored circle (brand color at 15% fill + icon at 100%) + title + description text, used to list concrete feature benefits. The color-coding ties each benefit to its semantic meaning in the design system (purple = AI, orange = action, green = success/social). Reusable for any feature explanation or value proposition screen. **Open Settings Fallback** — a variant of the CTA button that deep-links to the iOS Settings app when the OS permission has been permanently denied. The CTA label changes to "Open Settings" and the app monitors permission status on return from Settings, auto-dismissing the screen on success.
