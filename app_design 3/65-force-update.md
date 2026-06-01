# Screen Design: Force Update

**Screen**: 65 of 73
**File**: 65-force-update.md
**Register**: Brand Mode
**Primary action**: update the app
**Tab**: None (full-screen blocking — no navigation, no tab bar, no back button)
**Navigation**: System-triggered when API returns `version_deprecated` flag on any authenticated request, or at cold start when the local version check against the config endpoint returns `force_update: true`. Covers the entire app as a non-dismissible overlay (z-index above everything including modals and tab bar). The only exit is tapping the "Update Now" CTA which opens the App Store (iOS) or Play Store (Android) to the Balencia listing. There is no back button, no swipe-to-dismiss, no hardware back override. The app process remains alive behind this screen so the user returns directly to the app after updating and relaunching.

---

## Purpose

This screen exists to enforce a hard version floor when a deployed app version can no longer safely communicate with the backend. It serves three critical functions: (1) API compatibility — when breaking backend changes ship, old clients must not send malformed requests or misinterpret responses; (2) security — patching critical vulnerabilities requires guaranteeing all users move to a fixed build; (3) App Store compliance — both Apple and Google require apps to remain functional, and a gracefully blocked update screen is preferable to silent failures or crashes on deprecated endpoints. The screen is deliberately simple, calm, and brand-forward. It should feel like a brief pause, not a punishment. The user should think: "Something better is waiting for me" rather than "I am locked out." The tone is warm and encouraging, consistent with Balencia's coaching voice.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Balencia logo wordmark — brand anchor, establishes trust ("this is still Balencia, not an error")
2. Illustration / app icon — visual softener, gives the screen warmth and prevents it from feeling like a raw error page
3. Update message (title + subtitle) — explains what is happening and why, in plain language
4. "What's New" preview — optional motivator showing 2-3 improvements in the new version, giving the user a reason to be excited rather than annoyed
5. "Update Now" CTA — the single action, unmissable, full-width
6. Version info footer — small technical detail for support reference (current version vs. required version)

**User flow**:
- **Arrives from**: Any screen in the app. The force update overlay is injected by a root-level version gate component that wraps the entire navigation tree. It can appear at cold start (version check on launch), or mid-session (API response includes `version_deprecated` header). When triggered mid-session, the overlay fades in on top of whatever the user was viewing.
- **Primary exit**: App Store / Play Store (external) via deep link from the "Update Now" CTA
- **No secondary exit**: This screen cannot be dismissed, bypassed, or navigated away from within the app

---

## Layout

**Scroll behavior**: None (fixed, single viewport). All content fits within a single screen on all supported devices (iPhone SE through iPhone Pro Max, standard Android sizes). If the "What's New" section is present and the device is very small (iPhone SE / 4-inch), the layout compresses spacing but never scrolls.
**Tab bar visible**: No
**Status bar**: Visible, light-content style (white icons on dark background)

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │
│                                     │  <- 48pt top spacer
│                                     │
│          ┌─────────────┐            │
│          │  Balencia.   │            │  <- Wordmark (Monda, 24pt)
│          └─────────────┘            │     centered horizontally
│                                     │  <- 32pt gap
│          ┌─────────────┐            │
│          │             │            │
│          │   [  app  ] │            │  <- App Icon (96pt)
│          │   [ icon  ] │            │     centered, rounded corners
│          │             │            │
│          └─────────────┘            │
│                                     │  <- 8pt gap
│           ↑  (arrow badge)          │  <- Update Arrow Badge (28pt)
│                                     │     orange circle with up-arrow
│                                     │  <- 32pt gap
│      ┌───────────────────────┐      │
│      │   A new version is    │      │  <- Title (22pt Sora Bold)
│      │      available        │      │     centered, white
│      └───────────────────────┘      │
│                                     │  <- 12pt gap
│      ┌───────────────────────┐      │
│      │  We've made Balencia  │      │  <- Subtitle (15pt Sora Regular)
│      │  better. Update to    │      │     centered, white at 60%
│      │  continue your        │      │     max 3 lines
│      │  journey.             │      │
│      └───────────────────────┘      │
│                                     │  <- 24pt gap
│      ┌───────────────────────┐      │
│      │  WHAT'S NEW           │      │  <- What's New Section
│      │                       │      │     (optional, server-driven)
│      │  ○ Faster AI coaching │      │
│      │  ○ New workout plans  │      │
│      │  ○ Bug fixes & more   │      │
│      └───────────────────────┘      │
│                                     │  <- flexible spacer (pushes CTA down)
│                                     │
│  ┌───────────────────────────────┐  │
│  │        UPDATE NOW             │  │  <- Brand CTA Button
│  └───────────────────────────────┘  │     full-width (minus 48pt margins)
│                                     │  <- 16pt gap
│       v2.1.0 → v3.0.0 required     │  <- Version Info (12pt)
│                                     │     centered, white at 30%
│                                     │  <- 24pt bottom padding
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Purpose: System status bar area
   - Content: Light-content style (white icons), transparent background over ink-900

2. **Top Spacer** — 48pt (fixed)
   - Purpose: Breathing room below status bar, positions content cluster in upper-center of viewport

3. **Balencia Wordmark** — 28pt height
   - Purpose: Brand anchor — confirms this is an official Balencia screen, not a system error
   - Content: "Balencia." in Monda Bold, white, centered

4. **Wordmark-to-Icon Gap** — 32pt

5. **App Icon Cluster** — ~132pt total (96pt icon + 8pt gap + 28pt badge)
   - Purpose: Visual anchor and update signifier
   - Content: App icon (96pt, 20pt corner radius) + update arrow badge overlapping bottom-center

6. **Icon-to-Title Gap** — 32pt

7. **Update Message Block** — ~80-100pt (variable)
   - Purpose: Explain what is happening in warm, non-technical language
   - Content: Title (22pt) + 12pt gap + subtitle (15pt, max 3 lines)

8. **Message-to-WhatsNew Gap** — 24pt

9. **What's New Section** — ~80-100pt (optional, 0pt when absent)
   - Purpose: Motivate the update by showing what the user gains
   - Content: Eyebrow label + 2-3 bullet points

10. **Flexible Spacer** — expands to fill remaining space
    - Purpose: Pushes CTA to the bottom of the screen, creating a natural thumb-reach zone

11. **Update Now CTA Button** — 56pt
    - Purpose: The single action on the screen — opens the store listing
    - Content: Full-width button (24pt horizontal margins), pill radius

12. **CTA-to-Version Gap** — 16pt

13. **Version Info Line** — 16pt
    - Purpose: Technical reference for support conversations
    - Content: Current version and required version, small text

14. **Bottom Padding** — 24pt (above home indicator safe area)

15. **Home Indicator Zone** — 34pt
    - Purpose: System safe area

---

## Components

### Balencia Wordmark
- **Purpose**: Brand trust anchor — the user sees the familiar logo and knows this is an intentional Balencia screen, not a crash or system alert
- **Data source**: Static asset
- **Visual treatment**: "Balencia." rendered in Monda Bold (the logo font), 24pt, white (#FFFFFF), centered horizontally. The period is part of the wordmark. Letter spacing: standard (0em). No glow, no animation — clean and authoritative.
- **Variants**: None (always static)
- **Gestures**: None
- **Size**: ~140pt wide x 28pt tall, centered

### App Icon
- **Purpose**: Visual softener and recognition element — the user's familiar app icon grounds the screen
- **Data source**: Static asset (the same icon used on the home screen / app launcher)
- **Visual treatment**: 96x96pt, corner radius 20pt (matching iOS app icon radius at this size). Rendered at full resolution with a subtle --shadow-2 drop shadow for elevation against the dark background. The icon sits centered horizontally.
- **Variants**: None
- **Gestures**: None
- **Size**: 96x96pt

### Update Arrow Badge
- **Purpose**: Visual signifier that an update action is needed — a small upward arrow badge overlapping the app icon's bottom edge
- **Data source**: Static
- **Visual treatment**: 28pt diameter circle, Burnt Orange (#FF5E00) fill, centered horizontally below the app icon with 8pt overlap into the icon's bottom edge. Inside the circle: a white upward arrow icon (12pt, 2pt stroke weight, round caps). The badge has a 2pt ink-900 border (creates a clean cutout effect against the icon).
- **Variants**: None
- **Gestures**: None
- **Size**: 28x28pt

### Update Message Title
- **Purpose**: Primary communication — tells the user what is happening
- **Data source**: Server-driven string with local fallback. Default: "A new version is available"
- **Visual treatment**: 22pt Sora Bold, white (#FFFFFF), center-aligned, max 2 lines. Line height: 28pt. Horizontal padding: 24pt per side (48pt total, matching auth screen margins for brand-mode screens).
- **Variants**:
  - Default: "A new version is available"
  - Critical security: "An important security update is available" (server can override)
  - Major release: "Balencia [version] is here" (server can override)
- **Gestures**: None
- **Size**: Full-width minus 48pt x 28-56pt (1-2 lines)

### Update Message Subtitle
- **Purpose**: Secondary explanation — gives the user context and reassurance in a warm, coaching tone
- **Data source**: Server-driven string with local fallback. Default: "We've made Balencia even better. Update to continue your journey."
- **Visual treatment**: 15pt Sora Regular, white at 60% opacity, center-aligned, max 3 lines. Line height: 22pt. Same horizontal padding as title (24pt per side).
- **Variants**:
  - Default: "We've made Balencia even better. Update to continue your journey."
  - Critical security: "This update includes important security improvements to keep your data safe."
  - API breaking: "This update is required to keep your coaching experience running smoothly."
- **Gestures**: None
- **Size**: Full-width minus 48pt x 22-66pt (1-3 lines)

### What's New Section (Optional)
- **Purpose**: Motivate the update by previewing improvements — transforms a blocking screen into an exciting preview
- **Data source**: Server-driven array of strings (2-3 items). When the server provides no items, this entire section is hidden and its space collapses (the flexible spacer absorbs the difference).
- **Visual treatment**: Contained within an ink-brown-800 (#211008) card with glassmorphism border (1pt white at 6%), --r-xl (28pt) corner radius, 20pt padding. Centered horizontally with 24pt horizontal margins.
- **Content**:
  - Eyebrow: "WHAT'S NEW" — 12pt Sora Semibold, Burnt Orange (#FF5E00), uppercase, +0.12em letter spacing, left-aligned within card
  - Bullet items (12pt below eyebrow): Each item is a row with:
    - Bullet: 6pt circle, Burnt Orange (#FF5E00), vertically centered with first text line, 0pt left (flush with eyebrow)
    - Text: 14pt Sora Regular, white at 70%, 16pt left of bullet center. Max 1 line per item, truncated with ellipsis if overflow.
    - Gap between items: 10pt
  - Example items: "Faster AI coaching responses", "New workout plans and exercises", "Bug fixes and performance improvements"
- **Variants**: 
  - With items (2-3 bullet points shown)
  - Hidden (no server data — section collapses completely)
- **Gestures**: None (informational only)
- **Size**: Full-width minus 48pt x ~80-100pt (when visible)

### Update Now CTA Button
- **Purpose**: The single interactive element on the screen — opens the platform store listing for Balencia
- **Data source**: Static label, dynamic store URL (iOS: App Store deep link via `itms-apps://`, Android: Play Store deep link via `market://details?id=`)
- **Visual treatment**: Brand CTA Button (established Screen 03). Full-width minus 48pt horizontal margins (24pt per side, auth/brand screen margins). Height: 56pt. Background: Burnt Orange (#FF5E00). Text: "Update Now" in 17pt Sora Semibold, white, center-aligned. Border radius: --r-pill (999pt). Shadow: --shadow-2 for elevation emphasis. This is the only interactive element on screen, so it receives maximum visual weight.
- **Content**: "Update Now" (static, not server-driven — consistency matters for a blocking screen)
- **Variants**: See Interaction States section for all 8 states
- **Gestures**: Tap opens store listing
- **Size**: Full-width minus 48pt x 56pt

### Version Info Footer
- **Purpose**: Technical reference — helps support staff and the user understand exactly which versions are involved if they contact help
- **Data source**: Local app version (from build config) + required minimum version (from API response or config endpoint)
- **Visual treatment**: 12pt Sora Regular, white at 30% opacity, center-aligned. Format: "v[current] → v[required] required" (e.g., "v2.1.0 → v3.0.0 required"). The arrow (→) is a Unicode right arrow, not a custom icon.
- **Variants**:
  - Standard: "v2.1.0 → v3.0.0 required"
  - Version unknown (config fetch failed): "Update required" (no version numbers)
- **Gestures**: None
- **Size**: Full-width x 16pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark, no gradient |
| Wordmark | #FFFFFF | white | Brand text |
| App icon shadow | rgba(33, 16, 8, 0.22) | --shadow-2 | Elevation behind icon |
| Update arrow badge fill | #FF5E00 | brand-orange | Action signifier |
| Update arrow badge border | #0A0A0F | ink-900 | Cutout border |
| Arrow icon in badge | #FFFFFF | white | Contrast on orange |
| Title text | #FFFFFF | white | Primary message |
| Subtitle text | white at 60% | -- | Secondary message |
| What's New card bg | #211008 | ink-brown-800 | Glassmorphism card |
| What's New card border | white at 6% | -- | Glassmorphism border |
| What's New eyebrow | #FF5E00 | brand-orange | Section label |
| What's New bullet dots | #FF5E00 | brand-orange | Bullet indicators |
| What's New item text | white at 70% | -- | Feature descriptions |
| CTA button fill | #FF5E00 | brand-orange | Primary action — dominant element |
| CTA button text | #FFFFFF | white | Button label |
| CTA pressed fill | #E55400 | -- | Darker orange on press |
| CTA disabled fill | #FF5E00 at 40% | brand-orange (reduced) | Loading/disabled state |
| Version info text | white at 30% | -- | Tertiary technical detail |
| CTA glow (pulse) | rgba(255, 94, 0, 0.25) | -- | Subtle attention pulse |

**60/30/10 verification**: This is a Brand Mode screen, so orange is the dominant accent. Orange appears on: the CTA button (largest colored element), the update arrow badge, the What's New eyebrow, and the What's New bullet dots. White is the supporting color on text and the wordmark. No green on this screen (no success/completion states). No purple (no SIA/AI involvement — this is a system screen). The background is neutral ink-900. The ratio holds: orange as the clear action driver (~15% of non-background pixels), white as text/information (~25%), ink-900/ink-brown-800 as neutral ground (~60%).

---

## Interaction States

### Update Now CTA Button (8-State Model)

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | Burnt Orange (#FF5E00) fill, white text "Update Now", --shadow-2, --r-pill. Subtle glow pulse animation (see Motion section). | Idle, awaiting tap |
| 2 | **Pressed** | Darker orange (#E55400) fill, scale(0.97), shadow reduces to --shadow-1 | Finger down on button |
| 3 | **Loading** | Orange fill at 60% opacity, white circular spinner (20pt) replaces text, centered. Button is non-interactive during this state. | Store link is being resolved or the OS is processing the deep link |
| 4 | **Success** | Not applicable — the app backgroundes when the store opens. If the user returns without updating, the button resets to Default. | Store opened successfully |
| 5 | **Error** | Orange fill, text changes to "Try Again" for 3 seconds, then reverts to "Update Now". A subtle toast appears above the button: "Couldn't open the store. Check your connection." in 13pt Sora Regular, white at 80%, on ink-brown-800 bg, --r-xl, 48pt height, centered, fades in over 280ms and auto-dismisses after 4 seconds. | Store deep link failed (no network, store app not found) |
| 6 | **Disabled** | Not applicable — the button is never disabled on this screen. The update action is always available. | -- |
| 7 | **Focus-visible** | 2pt orange ring (#FF5E00), offset 2pt outside button edge. For accessibility focus navigation. | Keyboard / switch control focus |
| 8 | **Hover** | Not applicable on mobile. On tablet with pointer: orange lightens slightly (mix with 10% white), cursor changes to pointer. | Pointer hover (iPad) |

### Haptic Feedback

| Trigger | Haptic Type |
|---------|-------------|
| CTA tap (pressed) | Medium impact |
| CTA error (store failed) | Error notification (triple pulse) |
| Screen appearance | None (avoid startling the user) |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Update Now CTA | Opens App Store (iOS) or Play Store (Android) to Balencia listing |
| Swipe right from edge | Screen | **Blocked** — no back navigation. iOS edge swipe gesture is disabled on this screen. |
| Swipe down | Screen | **Blocked** — no pull-to-dismiss. This is not a modal — it is a full-screen blocking overlay. |
| Hardware back (Android) | System | **Blocked** — `BackHandler` returns `true` to consume the event. The user cannot back out. Optionally, a second hardware back press within 2 seconds shows a subtle toast: "Please update to continue using Balencia." (13pt Sora Regular, white at 70%, ink-brown-800 bg, --r-xl, centered, auto-dismisses after 3 seconds). |
| Tap outside CTA | Screen | No action. The screen is inert except for the CTA button. |
| Long press | Update Now CTA | Same as tap (no distinct long-press behavior) |
| Three-finger tap (accessibility) | Screen | VoiceOver reads the full screen content: wordmark, title, subtitle, what's new items, CTA label, version info |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen overlay | Version gate triggered | Fade in from 0 to 1 opacity over ink-900 background | 520ms | ease-flow |
| Wordmark | Screen mount | Fade in + translateY(-12pt to 0) | 280ms, 0ms delay | ease-out-soft |
| App icon | Screen mount | Fade in + scale(0.9 to 1.0) | 280ms, 120ms delay | ease-out-soft |
| Update arrow badge | Icon settled | Scale(0 to 1.0) + fade in, spring from below icon center | 320ms, 320ms delay | ease-out-back (slight overshoot) |
| Title | Screen mount | Fade in + translateY(8pt to 0) | 280ms, 280ms delay | ease-out-soft |
| Subtitle | Screen mount | Fade in + translateY(8pt to 0) | 280ms, 360ms delay | ease-out-soft |
| What's New card | Screen mount | Fade in + translateY(8pt to 0) | 280ms, 440ms delay | ease-out-soft |
| What's New bullets | Card visible | Staggered fade in, 80ms stagger per item | 200ms each, starts at 520ms | ease-out-soft |
| CTA button | Screen mount | Fade in + translateY(16pt to 0) | 280ms, 560ms delay | ease-out-soft |
| CTA glow pulse | CTA visible (after entrance) | Subtle box-shadow pulse: --glow-orange opacity oscillates between 0.15 and 0.30 | 2400ms per cycle, infinite, starts at 1000ms | ease-in-out (sinusoidal) |
| Version info | Screen mount | Fade in | 280ms, 640ms delay | ease-out-soft |
| CTA press | Finger down | Scale(1.0 to 0.97) + fill darkens | 80ms | ease-out |
| CTA release | Finger up | Scale(0.97 to 1.0) + fill restores | 160ms | ease-out-soft |
| Error toast | Store link failed | Fade in + translateY(8pt to 0) from below CTA | 280ms | ease-out-soft |
| Error toast dismiss | Auto after 4s | Fade out | 280ms | ease-out-soft |
| Back press toast (Android) | Second hardware back | Fade in + translateY(4pt to 0), centered on screen | 200ms | ease-out-soft |
| Back press toast dismiss | Auto after 3s | Fade out | 200ms | ease-out-soft |

**Animation sequence (total ~1.0s to full visibility)**:
1. **0ms**: Screen overlay fades in, wordmark begins entrance
2. **120ms**: App icon begins scale-in
3. **280ms**: Title begins fade-in
4. **320ms**: Update arrow badge springs in on the icon
5. **360ms**: Subtitle begins fade-in
6. **440ms**: What's New card begins entrance
7. **520ms**: What's New bullet items begin staggered fade-in
8. **560ms**: CTA button slides up into position
9. **640ms**: Version info fades in
10. **1000ms**: CTA glow pulse begins its infinite cycle

**Reduced motion preference**: All entrance animations are replaced with immediate opacity 1 and position 0 (no translate, no scale). The CTA glow pulse is replaced with a static --glow-orange at 0.20 opacity (no animation). Hold all elements visible for 200ms then show screen fully rendered.

**Screen transition**:
- **Enter**: Fade-in overlay (520ms, ease-flow). This is NOT a stack push or modal slide — it is a full-screen fade because the screen replaces the entire app context.
- **Exit**: None from within the app. When the user returns from the store after updating, the app relaunches from the splash screen [01] and the force update gate re-evaluates. If the version is now acceptable, the gate does not trigger and the user proceeds normally.

---

## Empty States

### Not applicable

This screen has no empty state in the traditional sense. It always displays its full content (wordmark, icon, message, CTA, version info). The only variable element is the "What's New" section:

- **What's New present**: Server provides 2-3 feature items. Section is visible with the card and bullet points.
- **What's New absent**: Server provides no items (or the config fetch failed and the screen is displaying from cached/fallback data). The What's New section collapses completely — no card, no eyebrow, no placeholder. The flexible spacer absorbs the freed space, and the remaining elements (title, subtitle, CTA) are simply closer together. This is the expected state when the force update is triggered by a stale cached config rather than a fresh API response.

### Fallback (no network at all)

If the version check was cached locally (e.g., from a previous session's config fetch) and the device currently has no network, the screen still displays. The What's New section is hidden (no server data available). The CTA still attempts to open the store — if the store app itself is cached on-device, it may load the listing from its own cache. If the store cannot load, the CTA enters its Error state (see Interaction States).

---

## Error Handling

### Store Not Reachable
- **Trigger**: The `Linking.openURL()` call fails (no internet, store app not installed, deep link malformed)
- **Behavior**: CTA button transitions to Error state — text changes to "Try Again" for 3 seconds. An error toast appears above the button: "Couldn't open the store. Check your connection." The toast uses ink-brown-800 background, --r-xl corners, 13pt Sora Regular text at white 80%, auto-dismisses after 4 seconds. After the toast dismisses and the 3-second "Try Again" window expires, the button reverts to its default "Update Now" state. The user can tap again.
- **No retry limit**: The user can attempt as many times as they want. Each failure shows the same toast.

### Store Page Loads but App Not Found
- **Trigger**: The deep link opens the store app, but the Balencia listing is unavailable (e.g., app temporarily removed from store, regional restriction)
- **Behavior**: This is outside the app's control. The store app handles this with its own error UI. When the user returns to Balencia (via app switcher or back navigation from the store), the force update screen is still displayed. No change in state.

### Config Endpoint Unreachable at Launch
- **Trigger**: The app launches, attempts to check the minimum version from the config endpoint, but the network request fails
- **Behavior**: If a previously cached config response exists and it contains `force_update: true` for the current app version, the force update screen is shown using cached data (without What's New items, since those require a fresh response). If no cached config exists, the app proceeds normally — it is better to let the user in with a potentially stale version than to block them based on no data. The next successful API call will trigger the force update if needed.

### Version Parsing Error
- **Trigger**: The required version string from the server is malformed or unparseable
- **Behavior**: The app does not trigger the force update screen. A silent error is logged to the analytics/crash reporting service. The user proceeds normally. This prevents a server-side bug from locking all users out of the app.

---

## Accessibility

- **VoiceOver / TalkBack reading order**: Wordmark -> Title -> Subtitle -> What's New eyebrow -> What's New item 1 -> What's New item 2 -> What's New item 3 -> Update Now button -> Version info
- **VoiceOver announcement on screen mount**: "Balencia. A new version is available. [subtitle text]. Update Now button."
- **CTA button**: `accessibilityRole="button"`, `accessibilityLabel="Update Now — opens the app store"`, `accessibilityHint="Double tap to open the store and update Balencia"`
- **Version info**: `accessibilityLabel="Current version [x], required version [y]"` (reads out the arrow as natural language)
- **What's New items**: Each item is an `accessibilityRole="text"` with the bullet text as the label
- **Dynamic type**: Title and subtitle scale with system font size up to 1.3x (beyond that, text truncates to prevent layout overflow on this fixed-viewport screen)
- **High contrast mode**: CTA button gains a 2pt white border for additional contrast. Subtitle opacity increases from 60% to 80%.
- **Reduced motion**: See Motion section above

---

## Motivation Adaptation

Not applicable. This is a system-level screen that appears identically regardless of the user's motivation tier. It is not a coaching moment — it is an infrastructure requirement. The tone is warm and brand-consistent, but it does not adapt to low/medium/high motivation states. All users see the same content and the same single CTA.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Wordmark | Monda | 700 (Bold) | 24pt | 28pt | White |
| Title | Sora | 700 (Bold) | 22pt | 28pt | White |
| Subtitle | Sora | 400 (Regular) | 15pt | 22pt | White at 60% |
| What's New eyebrow | Sora | 600 (Semibold) | 12pt | 16pt | #FF5E00 |
| What's New item text | Sora | 400 (Regular) | 14pt | 20pt | White at 70% |
| CTA button text | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Version info | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| Error toast text | Sora | 400 (Regular) | 13pt | 18pt | White at 80% |
| Back press toast text | Sora | 400 (Regular) | 13pt | 18pt | White at 70% |

---

## Cross-References

- **Navigates to**: External — App Store (iOS) via `itms-apps://` deep link, Play Store (Android) via `market://details?id=` deep link. No in-app navigation targets.
- **Navigates from**: Any screen in the app when the version gate triggers. Most commonly appears on top of: Splash Screen [01] (cold start version check), Home Screen [12] (mid-session API response), SIA Chat [09] (mid-session API response). The overlay covers everything — it does not replace the navigation stack, it sits above it.
- **Shared components with**: Screen [01] — Splash Screen (Balencia wordmark treatment, though Splash uses Chillax ExtraBold and this screen uses Monda Bold per the logo font spec). Screen [03] — Welcome/Sign Up (Brand CTA Button pattern — full-width, 56pt, --r-pill, orange). Screen [43] — Paywall (full-screen blocking pattern with a single CTA, though Paywall is dismissible and this screen is not).
- **Patterns used**: Brand CTA Button (Screen 03), Glassmorphism Card (shared pattern), 8-State Interaction Model (shared pattern), Content Entry Animation (staggered fade-in, shared pattern), Error Toast (inline variant, adapted from Screen 04 validation pattern), Brand Mode color register (orange-dominant)
- **Patterns established**: **Force Update Gate** — a root-level version check component that wraps the navigation tree, comparing `app_version` against `config.min_supported_version`. Triggers on cold start (config endpoint check) and mid-session (API response header `X-Min-Version`). Non-dismissible overlay with z-index above all navigation layers including modals and tab bar. **Store Deep Link CTA** — a button pattern that opens platform-specific store URLs with graceful error handling when the store is unreachable. **Hardware Back Block** — Android-specific `BackHandler` pattern that consumes back press events and shows an informational toast on repeated attempts.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-17.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/force-update`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B17-F01 | critical | navigation | Wire the CTA to platform-specific App Store / Play Store deep links with loading, return, unavailable-store, and retry/error states. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

