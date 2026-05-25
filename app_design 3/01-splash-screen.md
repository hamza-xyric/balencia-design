# Screen Design: Splash Screen

**Screen**: 01 of 73
**File**: 01-splash-screen.md
**Register**: Brand Mode
**Primary action**: None — auto-advances
**Tab**: None (pre-auth)
**Navigation**: Entry point. No stack depth. Auto-transitions to Motion Carousel (first launch) or Home (returning user).

---

## Purpose

The splash screen is Balencia's handshake — a sub-2-second brand moment that communicates premium quality before a single word is read. It exists to cover the cold-start initialization period (auth state check, asset preloading) while delivering emotional impact through the continuous stroke line drawing itself around the Balencia symbol. The user should feel: "This is polished. This is intentional."

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Balencia symbol — centered, dominant, immediately recognizable
2. Continuous stroke line — animating, drawing attention and creating motion
3. Subtle hero glow — atmospheric depth behind the symbol
4. Wordmark "Balencia." — secondary confirmation of the brand name

**User flow**:
- **Arrives from**: App launch (iOS springboard / Android launcher)
- **Primary exit**: Motion Carousel [02] via crossfade (first-time user, no saved session)
- **Secondary exit**: Home Screen [12] via crossfade (returning user with valid session token)

---

## Layout

**Scroll behavior**: None (fixed, single viewport)
**Tab bar visible**: No

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                             │
│                             │
│                             │
│                             │
│                             │
│    ╭ ─ hero glow zone ─ ╮  │
│    │                     │  │
│    │   ┌─────────────┐   │  │
│    │   │             │   │  │
│    │   │   Symbol    │   │  │
│    │   │   (72pt)    │   │  │
│    │   │             │   │  │
│    │   └─────────────┘   │  │
│    │  ~ stroke line ~    │  │
│    │                     │  │
│    │   "Balencia."       │  │
│    │    (wordmark)       │  │
│    ╰ ─ ─ ─ ─ ─ ─ ─ ─ ─ ╯  │
│                             │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Purpose: System status bar area
   - Content: Hidden during splash (light-content style, transparent background)

2. **Upper Spacer** — flexible (~220pt on iPhone SE, ~280pt on Pro Max)
   - Purpose: Pushes symbol cluster to optical center (40% from top, not true 50%)

3. **Symbol + Stroke Animation Cluster** — ~160pt total
   - Purpose: The brand moment
   - Content: Balencia bird symbol (72x72pt), continuous stroke line animation, wordmark below
   - Sub-layout:
     - Symbol: 72x72pt, centered horizontally
     - Stroke line: Draws itself starting from symbol, extends ~120pt wide, 4pt stroke weight
     - Gap: 16pt between stroke line terminus and wordmark
     - Wordmark: "Balencia." centered, Chillax ExtraBold

4. **Lower Spacer** — flexible (fills remaining space)
   - Purpose: Balance. Slightly larger than upper spacer for optical center effect.

5. **Home Indicator Zone** — 34pt
   - Purpose: System safe area

---

## Components

### Balencia Symbol
- **Purpose**: Brand recognition, visual anchor
- **Data source**: Static asset (SVG/Lottie)
- **Visual treatment**: Flat symbol on dark background, Burnt Orange fill. Centered in a hero glow radial gradient.
- **Variants**: None (single state)
- **Gestures**: None
- **Size**: 72x72pt

### Continuous Stroke Line
- **Purpose**: Signature brand motion — the line draws itself, communicating journey and life
- **Data source**: Animated vector (Lottie or react-native-svg animated path)
- **Visual treatment**: Burnt Orange (#FF5E00) stroke, 4pt width (--stroke-base), round caps and round joins. Starts from the symbol, flows organically rightward and downward with one natural curve. No symmetry — feels hand-drawn but precise.
- **Variants**: None
- **Gestures**: None
- **Size**: ~120pt wide x ~40pt tall, positioned below and slightly right of symbol center
- **Animation**: stroke-dashoffset draws from 0 to full length over 1200ms using --ease-flow

### Hero Glow
- **Purpose**: Atmospheric depth, warmth, premium feel
- **Data source**: Static radial gradient
- **Visual treatment**: Radial gradient centered on symbol. Inner: rgba(255, 94, 0, 0.15). Outer: transparent. Radius ~160pt.
- **Variants**: None
- **Gestures**: None
- **Size**: 320x320pt (extends well beyond symbol)

### Wordmark
- **Purpose**: Brand name confirmation
- **Data source**: Static text or SVG
- **Visual treatment**: "Balencia." in Chillax ExtraBold (800), white, centered. The period is part of the wordmark. Letter spacing: -0.025em.
- **Variants**: None
- **Gestures**: None
- **Size**: ~140pt wide x 24pt tall (at 22pt font size, mobile-appropriate)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Wordmark | Chillax | 800 (ExtraBold) | 22pt | 24pt | White #FFFFFF | Logo typography only — not UI text. Period included. Letter spacing -0.025em. |

No other text elements on this screen. The wordmark is a logo element, not a heading.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Symbol fill | #FF5E00 | brand-orange | Primary brand mark |
| Stroke line | #FF5E00 | brand-orange | Draws at full opacity |
| Hero glow (inner) | rgba(255, 94, 0, 0.15) | glow-orange (reduced) | Atmospheric, not distracting |
| Wordmark | #FFFFFF | white | Clean contrast on dark |
| Status bar content | #FFFFFF | white | Light-content status bar style |

**60/30/10 verification**: This screen is almost entirely neutral (ink-900 background) with orange as the sole accent color on the symbol and stroke line. No green or purple — appropriate for a pure brand moment. The 60/30/10 rule applies to the brand color elements only: orange dominates (symbol + line), white supports (wordmark), no purple needed.

---

## Interaction States

No interactive elements on this screen. It is a passive, time-based transition screen.

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| None | — | Screen auto-advances; no user interaction accepted |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Symbol | Screen mount | Fade in from 0 to 1 opacity | 280ms (--dur-base) | ease-out-soft |
| Hero glow | Screen mount | Fade in from 0 to 1 opacity, 160ms delay | 520ms (--dur-slow) | ease-out-soft |
| Stroke line | Symbol visible | Stroke draws itself (dashoffset 1 → 0) | 1200ms (--dur-flow) | ease-flow |
| Wordmark | Stroke complete | Fade in + translateY(8pt → 0) | 280ms (--dur-base) | ease-out-soft |

**Animation sequence (total ~1.8s)**:
1. **0ms**: Symbol fades in
2. **160ms**: Hero glow begins fading in
3. **280ms**: Stroke line begins drawing (symbol now fully visible)
4. **1480ms**: Stroke line completes, wordmark begins fade-in
5. **1760ms**: Wordmark fully visible
6. **1800ms**: Begin screen transition to next screen

**Screen transition**:
- **Exit**: Crossfade to Motion Carousel [02] or Home [12]. Duration 280ms (--dur-base), ease-out-soft. The splash content fades out while the next screen fades in simultaneously.

---

## Empty States

### Day 1 (new user)
The splash screen is identical for all users. No data dependency.

### Established user (zero state)
Not applicable — splash has no data-driven content.

---

## Motivation Adaptation

Not applicable. The splash screen is identical regardless of motivation tier. It is a brand moment, not a content screen.

---

## Accessibility

- Status bar uses light-content style for visibility on dark background
- No interactive elements, so no focus management needed
- Screen reader: announce "Balencia. Loading." on screen mount
- Reduced motion preference: Skip stroke animation, show all elements immediately, hold for 1.2s then transition

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Auth state check fails on launch | Splash holds at wordmark visible state indefinitely (no timeout flash), subtle pulse on symbol (opacity 80%-100% loop, 2s) | Auto-retries auth check every 3 seconds up to 5 attempts; after 5 failures, transitions to Motion Carousel [02] as if first-time user |
| Asset preloading fails | Splash animation completes normally; missing assets load lazily on subsequent screens | No user action required — graceful degradation; next screen handles its own asset loading |
| Network unavailable at launch | Splash holds for max 4 seconds, then transitions based on last cached auth state (returning user → Home [12] with offline banner, new user → Motion Carousel [02]) | Downstream screens show Network Error Banner from `_shared-patterns.md` |

---

## Cross-References

- **Navigates to**: Screen [02] — Motion Carousel via crossfade (condition: first launch or no authenticated session), Screen [12] — Home Screen via crossfade (condition: returning user with valid authenticated session)
- **Navigates from**: App launch (system)
- **Shared components with**: None (unique screen)
- **Patterns used**: Continuous Stroke Line (Brand Guidelines 5.1), Hero Glow (--glow-orange), Brand Logo Treatment
- **Patterns established**: **Brand Logo Cluster** — symbol (72pt) + stroke line + wordmark vertical stack with 16pt gap, optically centered at 40% screen height. **Splash-to-Screen Crossfade** — 280ms crossfade transition for auto-advancing screens.
