# Screen Design: Image Viewer

**Screen**: 67 of 73
**File**: 67-image-viewer.md
**Register**: System Mode (immersive dark)
**Primary action**: view image at full resolution
**Tab**: None (full-screen overlay, z-50 — hides tab bar)
**Navigation**: Modal overlay presented from Progress Photos [49] via photo tap (modal presentation) and Journal [37] via image attachment tap (modal presentation). Dismissed by swipe-down, close button tap, or Android back button. When launched from a gallery context (multiple images), swipe-left/right navigates between images without dismissing.

---

## Purpose

This screen is the app's dedicated image viewing surface — a full-screen immersive overlay that strips away all UI chrome to let the image itself take center stage. It serves two distinct source contexts: (1) Progress Photos [49], where users need to examine body transformation photos at full resolution, zoom into specific muscle groups or body areas, and navigate through a timeline gallery; and (2) Journal [37], where users view image attachments embedded in journal entries. In both cases the user's intent is the same: inspect visual detail that thumbnail-sized previews cannot convey. The design philosophy is ruthlessly minimal — the image occupies 100% of the viewport, chrome appears only on demand (tap to toggle), and every gesture is mapped to a spatial metaphor (pinch = zoom, swipe down = dismiss/put away, swipe sideways = next/previous). The screen must feel like holding a photograph in your hands: intimate, responsive, and distraction-free. For the Progress Photos context, a Comparison Mode variant provides a side-by-side slider overlay so the user can visually compare two photos from different dates without leaving the viewer.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Image canvas — the image itself, filling the entire viewport, the only element visible in chrome-hidden state
2. Chrome header bar — close button (left), image counter (center, "2 of 7"), share button (right) — appears on tap toggle
3. Gallery pagination dots — multi-image indicator, bottom center — appears on tap toggle
4. Comparison mode controls — slider divider, date labels (Progress Photos context only)
5. Background — solid ink-900 (#0A0A0F) at 100% behind and around the image

**User flow**:
- **Arrives from**: Progress Photos [49] via photo thumbnail tap (modal presentation, slide-up), Journal [37] via image attachment tap (modal presentation, slide-up). The presenting screen passes the image source (URL or local encrypted key), an optional gallery array (for multi-image navigation), and a source context flag ("progress" or "journal").
- **Primary exit**: Swipe-down to dismiss (velocity-based threshold), close button tap (top-left), Android hardware back button. All three return to the presenting screen with a matched dismissal animation.
- **No secondary navigation**: This screen is a dead end by design. The user views, zooms, optionally shares, and leaves. No deeper navigation, no editing, no deletion (those actions live on the presenting screen).

---

## Layout

**Scroll behavior**: None (pan and zoom via gesture recognizers, no ScrollView)
**Tab bar visible**: No (hidden by z-50 overlay)
**Status bar**: Visible, light-content style (white icons on ink-900 background). Hidden when chrome is hidden.

### ASCII Wireframe — Chrome Visible State

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │  light-content, white icons
├─────────────────────────────────────┤
│  [✕]     2 of 7          [share]   │  Chrome Header (56pt)
│                                     │  translucent ink-900 at 70%
├─────────────────────────────────────┤  gradient fade (no hard edge)
│                                     │
│                                     │
│                                     │
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │                 │         │
│         │     [IMAGE]     │         │  Image Canvas (full viewport)
│         │                 │         │  aspect-fit, centered
│         │                 │         │  pinch-to-zoom enabled
│         │                 │         │
│         └─────────────────┘         │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│           ● ● ○ ● ● ● ●           │  Pagination Dots (if gallery)
│                                     │  8pt above safe area
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │  safe area respected
└─────────────────────────────────────┘
```

### ASCII Wireframe — Chrome Hidden State (default after 3s idle)

```
┌─────────────────────────────────────┐
│                                     │  Status bar hidden
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │                 │         │
│         │     [IMAGE]     │         │  Image fills entire viewport
│         │                 │         │  ink-900 letterbox bars
│         │                 │         │  if aspect ratio differs
│         │                 │         │
│         └─────────────────┘         │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │  Pagination dots hidden
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │  safe area still respected
└─────────────────────────────────────┘
```

### ASCII Wireframe — Comparison Mode (Progress Photos context)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  [✕]       Compare          [done] │  Chrome Header (56pt)
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────┬────────────────┐│
│  │                │                ││
│  │    Mar 01      │    May 21      ││  Date labels (pill badges)
│  │                │                ││
│  │                │                ││
│  │    BEFORE      │     AFTER      ││  Side-by-side photos
│  │                │                ││
│  │                │                ││
│  │                │                ││
│  └────────────────┴────────────────┘│
│                                     │
│  ◄════════════╪════════════════════►│  Slider divider (draggable)
│                                     │
│                                     │  16pt gap
│      ┌──────┐ ┌──────┐ ┌──────┐   │  Date selector (scroll)
│      │Mar 01│ │Apr 15│ │May 21│   │
│      └──────┘ └──────┘ └──────┘   │
│                                     │
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom, chrome-visible state)

1. **Status Bar Zone** — 44pt
   - Purpose: System status bar area
   - Content: Light-content style (white icons), transparent background blending into chrome header gradient

2. **Chrome Header** — 56pt
   - Purpose: Navigation controls and gallery context
   - Content: Close button (left), image counter (center), share button (right)
   - Background: Linear gradient from ink-900 at 70% (top) to transparent (bottom), extending 24pt below the 56pt bar for a soft fade — no hard edge against the image
   - Visibility: Toggled by single tap; auto-hides after 3 seconds of inactivity

3. **Image Canvas** — Full viewport (100% width x 100% height)
   - Purpose: The image itself, the reason this screen exists
   - Content: Image rendered at aspect-fit within the viewport, centered. Letterbox bars (ink-900) fill any remaining space above/below or left/right depending on image aspect ratio.
   - Gesture layer: Pinch-to-zoom (1x-5x), double-tap zoom toggle, pan (when zoomed), swipe-down dismiss, swipe-left/right gallery navigation

4. **Gallery Pagination Dots** — 8pt diameter each, 8pt gaps, centered horizontally
   - Purpose: Indicate position within a multi-image gallery
   - Content: Filled dots (white at 80% for current, white at 30% for others)
   - Position: 8pt above safe area bottom edge
   - Visibility: Matches chrome visibility (toggled by tap). Hidden when single image.

5. **Home Indicator Zone** — 34pt
   - Purpose: System safe area (iOS)

---

## Components

### Image Canvas

- **Purpose**: Full-resolution image display surface with gesture-driven zoom and pan
- **Data source**: Image URL (remote, CDN-served) or local encrypted image key (Progress Photos — decrypted client-side). Passed from the presenting screen as part of the modal presentation payload.
- **Visual treatment**: Image rendered using `resizeMode: contain` (aspect-fit) within the full viewport. The image is centered both horizontally and vertically. Any space not occupied by the image is filled with ink-900 (#0A0A0F). No border, no shadow, no rounding — the image is presented raw.
- **Loading**: Progressive — a blurred low-resolution placeholder (from thumbnail cache) is displayed immediately at full viewport size while the high-resolution image loads. On load complete, the sharp image cross-fades over the blur (280ms, ease-out-soft).
- **Zoom behavior**:
  - Default scale: 1x (image fits viewport, aspect-fit)
  - Minimum scale: 1x (cannot zoom out beyond fit)
  - Maximum scale: 5x
  - Pinch-to-zoom: continuous gesture, follows finger positions. When zoomed beyond 1x, pan gestures allow the user to explore the image. Pan is bounded — the image edges cannot be pulled past the viewport center.
  - Double-tap: toggles between 1x and 2x. When zooming to 2x, the zoom centers on the tap point. When resetting to 1x, the image animates back to center-fit.
  - Zoom resets to 1x when navigating to a different image in the gallery.
- **Gallery navigation**: When a gallery array is provided (multiple images), horizontal swipe-left/right navigates between images. This gesture is only active when the image is at 1x zoom. When zoomed, horizontal swipes are consumed by pan. The transition between images uses a horizontal slide (the current image slides out, the next slides in, matching the swipe direction).
- **Size**: Full viewport (screen width x screen height)
- **Gestures**: See Gesture Map section

### Chrome Header

- **Purpose**: Navigation controls (close, share) and gallery position context (image counter)
- **Data source**: Current image index and total count from the gallery array
- **Visual treatment**: 56pt height, positioned at the top of the screen below the status bar. Background is a linear gradient from ink-900 at 70% (top edge) to fully transparent (bottom edge), extending 24pt below the bar to create a soft cinematic fade. This prevents a harsh line between chrome and image.
- **Size**: Full-width x 56pt (+ 24pt gradient tail)
- **Visibility**: Visible by default on screen mount. Auto-hides after 3 seconds of no interaction. Toggled by single tap on the image canvas. Animates in/out with fade + translateY (see Motion section).
- **Sub-elements**:
  - Close button: left-aligned, 16pt from left safe area edge
  - Image counter: centered horizontally
  - Share button: right-aligned, 16pt from right safe area edge

### Close Button

- **Purpose**: Dismiss the image viewer and return to the presenting screen
- **Data source**: N/A (navigational)
- **Visual treatment**: 44x44pt touch target. Icon: "X" (cross), 20pt, 2pt stroke weight, round caps, white (#FFFFFF). The icon itself is ~20x20pt centered within the 44pt touch target. No background circle or badge — the icon floats directly on the gradient chrome.
- **Variants**: See Interaction States
- **Gestures**: Tap dismisses the viewer (matched transition with swipe-down dismiss)
- **Size**: 44x44pt touch target, 20pt icon

### Image Counter

- **Purpose**: Show the user's position within a multi-image gallery
- **Data source**: Current index (1-based) and total count from the gallery array
- **Visual treatment**: "2 of 7" — 15pt Sora Semibold, white (#FFFFFF), centered horizontally within the chrome header. Letter spacing: standard. No background pill or badge — the text floats directly on the gradient. When the gallery contains a single image, the counter is hidden and the chrome header shows only the close and share buttons.
- **Variants**:
  - Gallery (2+ images): "N of M" displayed
  - Single image: counter hidden
- **Gestures**: None (informational only)
- **Size**: Auto-width x 20pt (text height)

### Share Button

- **Purpose**: Share the current image via the system share sheet
- **Data source**: The current image (as a temporary file or in-memory bitmap for the share payload)
- **Visual treatment**: 44x44pt touch target. Icon: share/export icon (iOS: square with up-arrow; Android: three-dot share), 20pt, 2pt stroke weight, white (#FFFFFF). Positioned 16pt from the right safe area edge, vertically centered in the chrome header.
- **Variants**: See Interaction States
- **Gestures**: Tap opens the native system share sheet with the current image as the share payload
- **Size**: 44x44pt touch target, 20pt icon
- **Privacy note**: For encrypted Progress Photos, the share action shares the decrypted image. The user is shown a brief confirmation toast before the share sheet opens: "Photo will be shared unencrypted" (13pt Sora Regular, white at 80%, ink-brown-800 bg, --r-xl, centered, auto-dismisses when share sheet opens).

### Gallery Pagination Dots

- **Purpose**: Visual indicator of gallery position and total image count
- **Data source**: Gallery array length and current index
- **Visual treatment**: Horizontal row of dots, centered at the bottom of the viewport (8pt above safe area bottom edge). Current image dot: 8pt diameter, white at 80%. Other image dots: 6pt diameter, white at 30%. Dot spacing: 8pt center-to-center. When the gallery exceeds 9 images, a condensed dot pattern is used: the 3 dots nearest the current position are full-size, dots further away progressively shrink (4pt, 2pt) and fade, preventing the row from spanning too wide.
- **Visibility**: Matches chrome visibility state. Hidden for single images.
- **Variants**:
  - 2-9 images: standard dot row
  - 10+ images: condensed dot pattern with size scaling
  - Single image: hidden entirely
- **Gestures**: None (informational only; navigation is via swipe)
- **Size**: Auto-width (depends on dot count) x 8pt

### Comparison Mode (Progress Photos context only)

- **Purpose**: Side-by-side slider view for comparing two progress photos from different dates, enabling visual tracking of body transformation
- **Data source**: Two images selected by date from the Progress Photos gallery, filtered by view type (front/side/back). Inherits the comparison state from Progress Photos [49] Photo Comparison Mode when the user taps a photo within that mode to view full-screen.
- **Visual treatment**: The viewport is divided vertically by a draggable slider divider. The "before" photo fills the left portion, the "after" photo fills the right portion. The divider position determines how much of each photo is visible. Both photos are rendered at the same scale and alignment so body position matches across the split.
- **Sub-elements**:
  - Slider divider: vertical line, 2pt width, white (#FFFFFF), full viewport height. At the divider center: a circular drag handle, 32pt diameter, white fill (#FFFFFF), --shadow-3 for high elevation, centered on the divider line.
  - Date labels: pill badges on each photo, 16pt from top safe area, centered within each photo's visible area. "Mar 01" / "May 21" — 13pt Sora Semibold, white, on ink-900 at 50% backdrop, --r-pill, 12pt horizontal / 6pt vertical padding.
  - "BEFORE" / "AFTER" labels: 11pt Sora Semibold, white at 40%, uppercase, +0.12em letter spacing, centered below each date label, 4pt gap.
  - Date selector: horizontal ScrollView, positioned 16pt above safe area bottom. Date pills: 64pt wide x 40pt tall, --r-md, ink-brown-800 bg. Active (selected): 2pt burnt orange border, white text. Inactive: white at 50% text. Two pills active simultaneously (before + after).
- **Activation**: Triggered when the user enters the Image Viewer from Progress Photos [49] Comparison Mode. The chrome header shows "Compare" as the center title instead of the image counter, and "done" (14pt Sora Semibold, burnt orange) replaces the share button.
- **Gestures**: Drag slider handle horizontally; tap date pills to change before/after dates; pinch-to-zoom on individual photo halves (zooms both photos simultaneously to maintain alignment)
- **Size**: Full viewport

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed, 100% opacity, immersive dark |
| Letterbox bars | #0A0A0F | ink-900 | Fills space around non-matching aspect ratios |
| Chrome header gradient top | #0A0A0F at 70% | ink-900 | Top of gradient |
| Chrome header gradient bottom | transparent | -- | Soft fade, no hard edge |
| Close button icon | #FFFFFF | white | X icon |
| Share button icon | #FFFFFF | white | Export icon |
| Image counter text | #FFFFFF | white | "2 of 7" |
| Pagination dot (current) | #FFFFFF at 80% | white-80 | Active image indicator |
| Pagination dot (other) | #FFFFFF at 30% | white-30 | Inactive image indicators |
| Comparison slider line | #FFFFFF | white | Vertical divider |
| Comparison drag handle | #FFFFFF | white | 32pt circle with shadow |
| Comparison date label bg | #0A0A0F at 50% | ink-900 | Backdrop pill |
| Comparison date label text | #FFFFFF | white | Date text |
| Comparison BEFORE/AFTER | #FFFFFF at 40% | white-40 | Contextual labels |
| Comparison date pill bg | #211008 | ink-brown-800 | Selector pills |
| Comparison date pill active border | #FF5E00 | brand-orange | Selected date |
| Comparison date pill active text | #FFFFFF | white | Selected date text |
| Comparison date pill inactive text | #FFFFFF at 50% | white-50 | Unselected date text |
| "done" text (comparison) | #FF5E00 | brand-orange | Dismiss comparison |
| Encrypted share toast bg | #211008 | ink-brown-800 | Privacy warning |
| Encrypted share toast text | #FFFFFF at 80% | white-80 | Warning message |
| Error state icon | #FFFFFF at 30% | white-30 | Broken image icon |
| Error state text | #FFFFFF at 50% | white-50 | Error message |
| "retry" link | #FF5E00 | brand-orange | Retry load action |

**60/30/10 verification**: This is a System Mode (immersive) screen. The vast majority of visible pixels are the image itself and ink-900 background — neutral ground. Orange appears minimally: comparison date pill borders, "done" text link, and "retry" link. White is the supporting color on chrome icons, text, and the comparison slider. No green or purple on this screen (no success states, no SIA involvement). This is a utility surface, not a branded moment. The ratio holds: neutral at ~90%+, white chrome ~8%, orange accents ~2%.

---

## Interaction States

### Close Button (8-State Model)

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | White X icon (20pt, 2pt stroke) on transparent bg | Idle, chrome visible |
| 2 | **Pressed** | White X icon, circular white at 10% backdrop (36pt diameter) appears behind icon, scale(0.90) | Finger down |
| 3 | **Loading** | N/A | -- |
| 4 | **Success** | N/A (screen dismisses) | -- |
| 5 | **Error** | N/A | -- |
| 6 | **Disabled** | N/A (always active when chrome visible) | -- |
| 7 | **Focus-visible** | 2pt white ring, offset 2pt outside 44pt touch target | Keyboard / switch control focus |
| 8 | **Hover** | White at 8% circular backdrop (iPad pointer) | Pointer hover |

### Share Button (8-State Model)

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | White share icon (20pt, 2pt stroke) on transparent bg | Idle, chrome visible |
| 2 | **Pressed** | White share icon, circular white at 10% backdrop (36pt diameter), scale(0.90) | Finger down |
| 3 | **Loading** | Icon replaced by white circular spinner (16pt) while share sheet prepares | Image being prepared for share |
| 4 | **Success** | N/A (share sheet takes over) | -- |
| 5 | **Error** | Icon pulses once, toast appears: "Couldn't share this image" (13pt Sora Regular, white at 80%, ink-brown-800 bg, --r-xl, auto-dismisses 3s) | Share preparation failed |
| 6 | **Disabled** | Icon at 30% opacity. Active only after image has fully loaded. | Image still loading |
| 7 | **Focus-visible** | 2pt white ring, offset 2pt outside 44pt touch target | Keyboard / switch control focus |
| 8 | **Hover** | White at 8% circular backdrop (iPad pointer) | Pointer hover |

### Comparison Slider Handle

| # | State | Visual | Behavior |
|---|-------|--------|----------|
| 1 | **Default** | 32pt white circle, --shadow-3, centered on divider line | Idle |
| 2 | **Pressed** | scale(1.15), --shadow-3 intensifies, subtle glow (white at 15%, 8pt blur) | Finger down on handle |
| 3 | **Dragging** | Follows finger horizontally, divider line moves with it, photos clip dynamically | Active drag |
| 4 | **Released** | Spring back to scale(1.0), handle stays at release position | Finger lifted |
| 5 | **Focus-visible** | 2pt orange ring, offset 2pt | Accessibility focus |

### Haptic Feedback

| Trigger | Haptic Type |
|---------|-------------|
| Close button tap | Light impact |
| Share button tap | Light impact |
| Share error | Error notification (triple pulse) |
| Double-tap zoom in | Medium impact |
| Double-tap zoom reset | Light impact |
| Gallery swipe (image change) | Selection tick |
| Swipe-down dismiss (threshold crossed) | Medium impact |
| Comparison slider at 25%/50%/75% positions | Selection tick |
| Chrome toggle (tap to show/hide) | Soft impact |

---

## Gesture Map

| Gesture | Target | Zoom State | Action |
|---------|--------|-----------|--------|
| **Pinch (two fingers)** | Image canvas | Any | Zoom in/out continuously between 1x and 5x. Zoom origin is the midpoint between the two fingers. When released below 1x, springs back to 1x. When released above 5x, springs back to 5x. |
| **Double-tap** | Image canvas | 1x | Zoom to 2x centered on tap point. Animation: 280ms, ease-out-soft. |
| **Double-tap** | Image canvas | >1x | Reset to 1x (center-fit). Animation: 280ms, ease-out-soft. |
| **Pan (one finger)** | Image canvas | >1x | Pan the zoomed image. Bounded — image edges cannot be dragged past viewport center. Deceleration on release (momentum scrolling). |
| **Pan (one finger)** | Image canvas | 1x (vertical) | Swipe-down to dismiss. The image translates downward following the finger. Background opacity decreases proportionally (100% at 0pt, 0% at 200pt). If released with downward velocity > 800pt/s OR vertical displacement > 150pt, the dismiss completes. Otherwise, the image springs back to center. |
| **Pan (one finger)** | Image canvas | 1x (horizontal) | Gallery navigation (if multi-image). Swipe-left advances to next image, swipe-right returns to previous. Requires horizontal displacement > 60pt or velocity > 500pt/s. If threshold not met, the image rubber-bands back. |
| **Single tap** | Image canvas | Any | Toggle chrome visibility (header, pagination dots, status bar). If zoomed, tap does NOT reset zoom — it only toggles chrome. |
| **Long press** | Image canvas | Any | No action (reserved, avoids accidental triggers) |
| **Tap** | Close button | -- | Dismiss viewer, return to presenting screen |
| **Tap** | Share button | -- | Open system share sheet with current image |
| **Drag** | Comparison handle | -- | Move slider divider horizontally, clipping before/after photos dynamically |
| **Tap** | Comparison date pill | -- | Select date for before or after slot |
| **Swipe right from edge** | Screen (iOS) | 1x | Dismiss viewer (iOS interactive pop gesture). Blocked when zoomed >1x to prevent conflict with pan. |
| **Hardware back** | System (Android) | Any | Dismiss viewer |

**Gesture priority and conflict resolution**:
- When zoomed >1x: Pan takes priority over swipe-down dismiss and gallery swipe. The user must be at 1x to dismiss or navigate.
- Double-tap vs. single tap: 300ms delay differentiates them. Single tap fires after 300ms if no second tap detected. Double-tap fires immediately on second tap, cancelling the pending single-tap.
- Pinch vs. pan: Two-finger contact activates pinch. Single-finger activates pan. If the user starts with one finger and adds a second, the gesture transitions from pan to pinch smoothly.
- Swipe-down vs. swipe-left/right: Direction is determined by the dominant axis in the first 20pt of movement. If vertical displacement > horizontal, it is a swipe-down dismiss. If horizontal > vertical, it is a gallery swipe.

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen enter | Modal presentation | Image thumbnail expands from source position to full viewport (shared element transition). Background fades ink-900 from 0% to 100%. | 320ms | ease-out-soft |
| Screen enter (fallback) | No shared element source | Fade in from black + scale(0.92 to 1.0) | 280ms | ease-out-soft |
| Chrome header show | Tap toggle / mount | Fade in (0 to 1) + translateY(-12pt to 0) | 200ms | ease-out-soft |
| Chrome header hide | Tap toggle / 3s idle | Fade out (1 to 0) + translateY(0 to -12pt) | 200ms | ease-out-soft |
| Status bar show | Chrome visible | System-animated (follows chrome header timing) | 200ms | system |
| Status bar hide | Chrome hidden | System-animated | 200ms | system |
| Pagination dots show | Chrome visible | Fade in (0 to 1) + translateY(8pt to 0) | 200ms, 80ms delay after chrome | ease-out-soft |
| Pagination dots hide | Chrome hidden | Fade out (1 to 0) + translateY(0 to 8pt) | 160ms | ease-out-soft |
| Pinch zoom | Gesture | Continuous scale transform following finger positions, no animation — frame-synced | realtime | -- |
| Double-tap zoom in | Double-tap at 1x | Scale from 1x to 2x centered on tap point | 280ms | ease-out-soft |
| Double-tap zoom reset | Double-tap at >1x | Scale from current to 1x, translate back to center | 280ms | ease-out-soft |
| Zoom spring (below min) | Release below 1x | Spring back from current to 1x | 200ms | spring (damping 0.8) |
| Zoom spring (above max) | Release above 5x | Spring back from current to 5x | 200ms | spring (damping 0.8) |
| Pan momentum | Finger release while panning | Deceleration scroll with edge bounce | 400-800ms | decelerate |
| Swipe-down dismiss (tracking) | Pan down at 1x | Image follows finger, background opacity decreases proportionally (1.0 at 0pt to 0.0 at 200pt), image scale decreases slightly (1.0 to 0.9) | realtime | -- |
| Swipe-down dismiss (complete) | Threshold met | Image accelerates downward off-screen, background fades to transparent | 200ms | ease-in |
| Swipe-down dismiss (cancel) | Threshold not met | Image springs back to center, background opacity restores to 100% | 280ms | spring (damping 0.85) |
| Gallery swipe (tracking) | Horizontal pan at 1x | Current image and next image track finger horizontally | realtime | -- |
| Gallery swipe (complete) | Threshold met | Current slides out, next slides in to center | 280ms | ease-out-soft |
| Gallery swipe (cancel) | Threshold not met | Current image rubber-bands back to center | 280ms | spring (damping 0.85) |
| Gallery swipe (dot update) | Image change | Current dot scales up (6pt to 8pt) + opacity increases; previous dot scales down + fades | 200ms | ease-out-soft |
| Image load (blur to sharp) | High-res load complete | Blurred placeholder cross-fades to sharp image | 280ms | ease-out-soft |
| Comparison slider drag | Handle drag | Divider and photo clipping follow finger, frame-synced | realtime | -- |
| Share toast enter | Share triggered on encrypted photo | Fade in + translateY(8pt to 0) | 200ms | ease-out-soft |
| Share toast exit | Share sheet opens / 3s timeout | Fade out | 200ms | ease-out-soft |
| Error toast enter | Load failure | Fade in + translateY(8pt to 0) | 200ms | ease-out-soft |
| Error toast exit | 4s timeout / retry tap | Fade out | 200ms | ease-out-soft |
| Close button press | Finger down | scale(0.90) + backdrop circle appears | 80ms | ease-out |
| Close button release | Finger up | scale(1.0) + backdrop fades | 160ms | ease-out-soft |
| Share button press | Finger down | scale(0.90) + backdrop circle appears | 80ms | ease-out |
| Share button release | Finger up | scale(1.0) + backdrop fades | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Shared element transition — the tapped thumbnail expands from its position on the presenting screen to fill the viewport (320ms, ease-out-soft). The presenting screen dims behind with ink-900 at 100%. If the source position is unavailable (e.g., deep link), falls back to a center-scale fade (280ms).
- **Exit (swipe-down)**: Image follows finger downward, shrinks slightly (scale 0.9), background fades. On threshold, image accelerates off-screen. Presenting screen becomes visible as the overlay dissolves.
- **Exit (close button / back)**: Reverse shared element — the image shrinks back to the thumbnail position on the presenting screen (320ms, ease-out-soft). If the thumbnail is no longer visible (user scrolled), falls back to a fade-out + scale-down (280ms).

**Reduced motion preference**: All zoom and dismiss animations replaced with instant opacity transitions (0ms). Shared element transitions become simple fade (200ms). Gallery swipes become instant cut between images. Chrome toggle is instant show/hide with no translate.

---

## Empty States

### Image Load Failure

- **Visual**: Centered broken-image icon (48pt, white at 15%, simple outline — rectangle with diagonal crack). Below: "Couldn't load this image" in 15pt Sora Regular, white at 50%, centered. Below that: "retry" text link in 14pt Sora Semibold, burnt orange (#FF5E00), 44pt touch target. Background: ink-900. Chrome header remains visible and functional (close and share buttons). Share button enters Disabled state.
- **Behavior**: Tapping "retry" re-fetches the image from the CDN. The broken-image icon is replaced by a circular progress indicator (white at 50%, 24pt) during retry. If retry fails, the error state returns with the same layout.
- **For gallery**: If one image in the gallery fails, only that image shows the error state. The user can swipe to adjacent images which may load successfully. The pagination dots remain functional. Failed image dot shows at white 10% opacity instead of 30%.

### Encrypted Image Decryption Failure

- **Visual**: Same layout as load failure, but message reads "Couldn't decrypt this photo" in 15pt Sora Regular, white at 50%. Below: "This may happen after a password change" in 13pt Sora Regular, white at 30%. No "retry" link (decryption failures are deterministic). Close button remains functional.
- **Behavior**: The user can only dismiss the viewer. The presenting screen (Progress Photos [49]) handles any recovery flow.

---

## Error Handling

### Image Load Failure (Network)
- **Trigger**: CDN request returns error (timeout, 404, 500) or device is offline
- **Behavior**: Blurred placeholder (if available from thumbnail cache) remains visible for 2 seconds while a silent retry occurs. If the retry also fails, the placeholder cross-fades to the error empty state (broken-image icon + "retry" link). Chrome header stays visible and functional. Gallery navigation still works for other images.
- **Retry**: Tapping "retry" makes one additional attempt. If it fails, the error state returns. No automatic retry beyond the initial silent one.

### Image Load Failure (Decryption)
- **Trigger**: Client-side decryption of an encrypted Progress Photo fails (corrupted key, password change, storage issue)
- **Behavior**: Immediately shows the decryption failure empty state. No retry option. Close button is the only action. A silent error is logged to analytics.

### Share Failure
- **Trigger**: Share sheet preparation fails (image not in memory, disk full, permissions denied)
- **Behavior**: Share button enters Error state. Toast appears above the bottom safe area: "Couldn't share this image" in 13pt Sora Regular, white at 80%, ink-brown-800 bg, --r-xl corners, 48pt height, centered, fades in 200ms, auto-dismisses after 3 seconds. Share button returns to Default state after toast dismisses.
- **No retry button**: The user simply taps share again.

### Gallery Array Empty
- **Trigger**: Presenting screen passes an empty gallery array (should not happen in normal flow)
- **Behavior**: The viewer displays the error empty state immediately. Close button functional. This is a defensive guard, not an expected state.

### Memory Pressure During Zoom
- **Trigger**: Device runs low on memory while the user is zoomed into a high-resolution image
- **Behavior**: The high-resolution decode is dropped and the viewer falls back to a lower-resolution version. The user may notice slight softness when zoomed to 3x+. No visible error — the degradation is silent and graceful. When memory pressure clears, the high-resolution version is re-decoded on the next zoom gesture.

---

## Accessibility

- **VoiceOver / TalkBack reading order**: Close button -> Image counter ("Image 2 of 7") -> Share button -> Image description (if available) -> "Swipe left or right to navigate images"
- **VoiceOver announcement on screen mount**: "Image viewer. [Image description or 'Progress photo from May 21']. Image 2 of 7. Double tap to zoom. Swipe down to close."
- **Close button**: `accessibilityRole="button"`, `accessibilityLabel="Close image viewer"`, `accessibilityHint="Returns to the previous screen"`
- **Share button**: `accessibilityRole="button"`, `accessibilityLabel="Share image"`, `accessibilityHint="Opens the share sheet"`
- **Image canvas**: `accessibilityRole="image"`, `accessibilityLabel` set to image description from metadata (e.g., "Front-facing progress photo from May 21, 2026") or fallback ("Image attachment")
- **Gallery navigation**: `accessibilityAction` for swipe-left ("Next image") and swipe-right ("Previous image") with announcements ("Image 3 of 7")
- **Zoom**: VoiceOver announces zoom level changes: "Zoomed to 2x", "Zoom reset"
- **Comparison mode**: VoiceOver reads "Comparison mode. Before photo from March 1. After photo from May 21. Drag to adjust slider."
- **Dynamic type**: Chrome text (image counter) scales with system font size up to 1.3x. Beyond that, text truncates.
- **High contrast mode**: Chrome header gradient opacity increases from 70% to 90% for stronger text contrast. Pagination dots increase to white at 100% (current) and white at 50% (others).
- **Reduced motion**: See Motion section above

---

## Motivation Adaptation

Not applicable. This is a utility screen that appears identically regardless of the user's motivation tier. It is a content viewing surface, not a coaching moment. The image is the same, the gestures are the same, the chrome is the same. No adaptation needed.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Image counter | Sora | 600 (Semibold) | 15pt | 20pt | White |
| Comparison date label | Sora | 600 (Semibold) | 13pt | 18pt | White |
| BEFORE / AFTER label | Sora | 600 (Semibold) | 11pt | 16pt | White at 40% |
| Comparison "done" text | Sora | 600 (Semibold) | 14pt | 18pt | #FF5E00 |
| Comparison date pill text | Sora | 600 (Semibold) | 13pt | 18pt | White (active) / White at 50% (inactive) |
| Error message | Sora | 400 (Regular) | 15pt | 22pt | White at 50% |
| Decryption error detail | Sora | 400 (Regular) | 13pt | 18pt | White at 30% |
| "retry" link | Sora | 600 (Semibold) | 14pt | 20pt | #FF5E00 |
| Share toast text | Sora | 400 (Regular) | 13pt | 18pt | White at 80% |
| Error toast text | Sora | 400 (Regular) | 13pt | 18pt | White at 80% |

---

## Cross-References

- **Navigates to**: System share sheet (external, via share button). No in-app forward navigation — this is a terminal viewing surface.
- **Navigates from**: Progress Photos [49] via photo thumbnail tap (modal presentation — single photo or gallery context), Progress Photos [49] Photo Comparison Mode via photo tap (modal presentation — comparison context), Journal [37] via image attachment tap (modal presentation — single photo or multi-attachment gallery).
- **Shared components with**: Screen [49] — Progress Photos (Photo Comparison Mode slider pattern is inherited and displayed full-screen here; gallery pagination dot pattern matches the photo strip's selection state), Screen [69] — App Rating (bottom toast pattern for error/privacy warnings), Screen [65] — Force Update (full-screen overlay z-index pattern, chrome toggle concept).
- **Patterns used**: 8-State Interaction Model (shared pattern), Error Toast (inline variant, adapted from Screen 04/65), Chrome Toggle (established here), Shared Element Transition (established here), Swipe-Down Dismiss (established here), Pinch-to-Zoom Canvas (established here), Gallery Pagination Dots (established here).
- **Patterns established**: **Chrome Toggle** — tap-to-show/hide UI chrome over immersive content, with auto-hide after 3 seconds of inactivity, synchronized status bar visibility, and gradient fade instead of hard edge. **Swipe-Down Dismiss** — velocity-based (>800pt/s) or displacement-based (>150pt) dismissal with proportional background opacity and image scale tracking, spring-back on cancel. **Pinch-to-Zoom Canvas** — gesture-driven zoom (1x-5x) with double-tap toggle (1x/2x), bounded pan when zoomed, zoom-state-aware gesture routing (pan vs. dismiss vs. gallery nav). **Shared Element Transition** — thumbnail-to-fullscreen expand on enter, fullscreen-to-thumbnail contract on exit, with center-scale fade fallback when source/destination position is unavailable. **Gallery Navigation** — horizontal swipe between images with pagination dots, rubber-band on boundary, zoom-reset on image change. **Progressive Image Loading** — blurred thumbnail placeholder cross-fading to high-resolution on load complete.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-17.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/image-viewer`
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
| B17-F04 | critical | retention | Render actual passed media with loading/error states, pinch/double-tap zoom, pan, and left/right gallery swipe. |
| B17-F05 | critical | navigation | Wire close/swipe-down/back dismissal and native share, and add accessible names for Close image viewer and Share image. |
| B17-F06 | major | trust-privacy | Add a decrypted-photo warning/confirmation before sharing, or disable share until the photo privacy policy is finalized. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

