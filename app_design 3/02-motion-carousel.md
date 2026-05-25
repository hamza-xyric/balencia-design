# Screen Design: Motion Carousel

**Screen**: 02 of 73
**File**: 02-motion-carousel.md
**Register**: Brand Mode
**Primary action**: Advance through panels → tap "Get started"
**Tab**: None (pre-auth)
**Navigation**: Stack depth 0 from app launch. Entry from Splash [01] via crossfade. Exit to Welcome / Sign Up [03] via stack push.

---

## Purpose

The motion carousel is Balencia's 5-10 second pitch — a dark, cinematic sequence of real-time motion graphics that creates the visual hook before a single form field appears. Each panel communicates one core value proposition through animation, not text walls. The user should feel: "This looks premium. I want to know more." It establishes the emotional arc: curiosity (panel 1) then warmth (panel 2) then intelligence (panel 3) then aspiration (panel 4).

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Motion graphic — the animated centerpiece of each panel, occupying ~60% of the screen
2. Panel headline — one short line per panel, large and bold
3. Panel subtext — one supporting sentence, secondary
4. Navigation controls — pagination dots (bottom center), Skip (top right), Next/Get Started (bottom)

**User flow**:
- **Arrives from**: Splash Screen [01] via crossfade (auto-advance)
- **Primary exit**: Welcome / Sign Up [03] via stack push (tap "Get started" on final panel, or tap Skip)
- **Secondary exits**: None

**Panels (4 panels)**:

| # | Headline | Subtext | Motion Graphic Concept |
|---|----------|---------|----------------------|
| 1 | "One life, not modules." | "Everything connects. Finally." | 9 domain icons floating separately, then magnetically pulling together into a unified circular system. Continuous stroke line threads through them. |
| 2 | "Meet SIA, your coach." | "Always in your corner." | Abstract warm form emerges — SIA's presence visualized as a glowing, responsive shape. Purple accent (#7F24FF) glow. Feels alive, not robotic. |
| 3 | "Everything connects." | "Sleep affects spending. Stress affects workouts. SIA sees it all." | Two domain icons (e.g., fitness + finance) connect with animated correlation lines. Data points pulse. An insight card fades in: "Your spending spikes on low-sleep days." |
| 4 | "Your life, gamified." | "Earn XP. Level up. Stay on track." | XP counter animates up. Level-up ring fills. A quest card appears with domain color tags. Feels premium RPG — not cartoonish. |

---

## Layout

**Scroll behavior**: Horizontal paging (React Native ScrollView with pagingEnabled, or FlatList horizontal). Each panel is exactly one screen width.
**Tab bar visible**: No

### ASCII Wireframe (single panel view)

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│                     [Skip]  │  ← top-right, 44x44pt touch
│                             │
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │                       │  │
│  │   Motion Graphic      │  │
│  │   (animated area)     │  │  ← ~340pt tall, full width
│  │   center-aligned      │  │
│  │                       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│    "One life, not modules." │  ← headline, center-aligned
│                             │  ← 8pt gap
│    "Everything connects.    │  ← subtext, center-aligned
│     Finally."               │
│                             │
│                             │
│          ● ○ ○ ○            │  ← pagination dots, 32pt from bottom CTA
│                             │
│  ┌───────────────────────┐  │
│  │      [ Next → ]       │  │  ← primary CTA, 56pt tall, full-width - 32pt margin
│  └───────────────────────┘  │
│                             │  ← 16pt padding
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Purpose: System status bar
   - Content: Light-content style, transparent background

2. **Skip Button Row** — 44pt
   - Purpose: Allow users to bypass the carousel
   - Content: "Skip" text button, top-right, 16pt right margin, 8pt below safe area

3. **Motion Graphic Area** — ~340pt (flexible, takes available space)
   - Purpose: The visual centerpiece — animated motion graphics
   - Content: Lottie/Rive animation unique to each panel. Centered horizontally and vertically within this zone.

4. **Text Area** — ~80pt
   - Purpose: Headline + subtext for each panel
   - Content: Headline (24pt Bold) + subtext (15pt Regular, 70% opacity)
   - Padding: 24pt horizontal (--s-5)

5. **Pagination Dots** — 20pt
   - Purpose: Indicate current position and total panels
   - Content: 4 dots, 8pt diameter, 12pt spacing between

6. **CTA Area** — 56pt button + 16pt top padding + 16pt bottom padding = 88pt
   - Purpose: Primary forward action
   - Content: "Next" on panels 1-3, "Get started" on panel 4

7. **Home Indicator Zone** — 34pt

---

## Components

### Skip Button
- **Purpose**: Bypass carousel for returning-but-logged-out users or impatient users
- **Data source**: Static
- **Visual treatment**: Text-only button. "skip" in 15pt Sora Regular, white at 60% opacity. No background, no border. Uppercase would feel aggressive — sentence case.
- **Variants**: None
- **Gestures**: Tap → navigates to Welcome / Sign Up [03]
- **Size**: 44x44pt touch target (text visually smaller, touch area padded)

### Motion Graphic Panel
- **Purpose**: Visual storytelling — each panel communicates one value proposition through animation
- **Data source**: Static Lottie/Rive animation files
- **Visual treatment**: Full-width within 24pt horizontal margins. Centered vertically in the graphic area. Dark background bleeds through — animations use brand colors on ink-900. No container card — graphics float directly on the background.
- **Variants**: 4 unique animations (one per panel). Each auto-plays on panel entry. Loops subtly after initial sequence completes.
- **Gestures**: None on the graphic itself (swipe is on the parent scroll container)
- **Size**: Full-width (375-428pt) x ~340pt

### Panel Headline
- **Purpose**: One-line value proposition
- **Data source**: Static copy
- **Visual treatment**: 24pt Sora Bold (700), white, center-aligned. Max 1 accent word per headline in Burnt Orange (#FF5E00). The brand period appears at the end of each headline.
- **Variants**: 4 headlines (one per panel)
- **Gestures**: None
- **Size**: Full-width - 48pt (24pt margins each side)

### Panel Subtext
- **Purpose**: Supporting detail — one line that grounds the headline
- **Data source**: Static copy
- **Visual treatment**: 15pt Sora Regular (400), white at 70% opacity, center-aligned. Max 2 lines.
- **Variants**: 4 subtexts (one per panel)
- **Gestures**: None
- **Size**: Full-width - 48pt (24pt margins each side)

### Pagination Dots
- **Purpose**: Position indicator
- **Data source**: Derived from current panel index
- **Visual treatment**: 4 circles, 8pt diameter. Active dot: Burnt Orange (#FF5E00), 8pt diameter. Inactive dots: white at 30% opacity, 8pt diameter. Active dot animates width to 24pt (pill shape) to indicate current panel.
- **Variants**: Updates on each panel change
- **Gestures**: None (non-interactive — swiping the panels changes state)
- **Size**: ~80pt wide x 8pt tall (4 dots + gaps)

### Next / Get Started Button
- **Purpose**: Primary forward navigation
- **Data source**: Static (text changes on panel 4)
- **Visual treatment**: Full-width pill button (--r-pill). Burnt Orange (#FF5E00) background, white text, 17pt Sora Semibold (600), center-aligned. Height: 56pt. Horizontal margin: 24pt each side.
- **Variants**:
  - Panels 1-3: "next" — advances to next panel
  - Panel 4: "get started" — navigates to Welcome / Sign Up [03]
- **Gestures**: Tap
- **Size**: (375 - 48)pt wide x 56pt tall = 327pt x 56pt (iPhone SE), up to 380pt x 56pt (Pro Max)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Skip button | Sora | 400 (Regular) | 15pt | 20pt | White at 60% | Lowercase, understated |
| Panel headline | Sora | 700 (Bold) | 24pt | 30pt | White, accent word in #FF5E00 | Sentence case. Brand period at end. Max 1 orange accent word. |
| Panel subtext | Sora | 400 (Regular) | 15pt | 22pt | White at 70% | Sentence case. Max 2 lines. |
| Next/Get started | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | Sentence case |

**Accent words per panel**:
- Panel 1: "one" (orange) in "One life, not modules."
- Panel 2: "SIA" (orange) in "Meet SIA, your coach."
- Panel 3: "connects" (orange) in "Everything connects."
- Panel 4: "gamified" (orange) in "Your life, gamified."

---

## Composition & Visual Hierarchy

**Squint test**:
- Primary: The motion graphic dominates the visual field — large, animated, eye-catching
- Secondary: The CTA button is the second most prominent element — orange pill at the bottom, clearly the action to take
- Tertiary: Headline text reads clearly at 24pt Bold
- Quaternary: Subtext and pagination dots are ambient — present but not demanding

**Spacing**:
- Skip button: 8pt below safe area, 16pt right margin
- Motion graphic top: 24pt below Skip button
- Motion graphic to headline: 32pt (--s-6)
- Headline to subtext: 8pt (--s-2)
- Subtext to pagination dots: 32pt (--s-6)
- Pagination dots to CTA: 24pt (--s-5)
- CTA to bottom safe area: 16pt (--s-4)

**Z-layers**:
- z-0: ink-900 background
- z-10: Motion graphic (renders above background, below text)
- z-20: Text content (headline, subtext)
- z-30: Skip button, pagination dots, CTA (always on top of all content)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Continuous across all panels |
| Skip button text | rgba(255,255,255,0.6) | white at 60% | De-emphasized |
| Motion graphics | Mixed | brand-orange, brand-purple, white | Per panel — primarily orange, purple for SIA panel only |
| Headline text | #FFFFFF | white | Primary |
| Headline accent word | #FF5E00 | brand-orange | One per headline |
| Subtext | rgba(255,255,255,0.7) | white at 70% | Secondary |
| Active pagination dot | #FF5E00 | brand-orange | Pill-shaped (24x8pt) |
| Inactive pagination dots | rgba(255,255,255,0.3) | white at 30% | Circle (8x8pt) |
| CTA background | #FF5E00 | brand-orange | Primary CTA |
| CTA text | #FFFFFF | white | High contrast |

**60/30/10 verification**: Orange dominates as the action color (CTA button, active dot, accent words, primary animation color). Green does not appear — correct for pre-auth brand screens. Purple appears only in Panel 2's SIA visualization (max 1-2 elements per screen rule satisfied since it's a panel-level accent). Neutrals (ink-900, white at varying opacities) provide the canvas.

**Per-panel color emphasis**:
- Panel 1: Orange (domain icons assembling, stroke line)
- Panel 2: Purple (SIA glow) — this is the one panel where purple leads as the panel's hero accent
- Panel 3: Orange + green (correlation lines use grad-progress gradient — teal to warm)
- Panel 4: Orange (XP counter, level-up ring)

---

## Interaction States

### Skip Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% opacity | — |
| Pressed | White at 40% opacity, scale(0.97) | Light impact |
| Focus-visible | Orange ring (#FF5E00), 2pt, offset 2pt | — |
| Disabled | N/A (always active) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Next / Get Started Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg (#FF5E00), white text | — |
| Pressed | Darker orange (Orange-600), scale(0.97), --shadow-1 | Light impact |
| Focus-visible | Orange ring, 2pt, offset 2pt around pill | — |
| Disabled | N/A (always active) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Swipe left | Panel content | Advance to next panel (with snap). No advance past panel 4. |
| Swipe right | Panel content | Return to previous panel (with snap). No swipe back past panel 1. |
| Tap | Skip button | Navigate to Welcome / Sign Up [03] |
| Tap | Next button (panels 1-3) | Advance to next panel |
| Tap | Get started button (panel 4) | Navigate to Welcome / Sign Up [03] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Panel graphic | Panel enters viewport | Auto-play animation sequence | 2000-3000ms | ease-flow (per animation) |
| Panel graphic | Panel exits viewport | Pause animation | — | — |
| Panel headline | Panel enters viewport | Fade in + translateY(16pt → 0), 200ms delay after panel snap | 280ms (--dur-base) | ease-out-soft |
| Panel subtext | Panel enters viewport | Fade in + translateY(12pt → 0), 360ms delay | 280ms (--dur-base) | ease-out-soft |
| Pagination dot | Panel change | Active dot morphs from circle to pill (width 8pt → 24pt). Previous dot shrinks pill → circle. | 280ms (--dur-base) | ease-out-soft |
| CTA text | Panel 3→4 transition | Crossfade "next" → "get started" | 280ms (--dur-base) | ease-out-soft |
| Panel snap | Swipe release | Decelerate and snap to nearest panel boundary | 280ms (--dur-base) | ease-out-soft |

**Auto-advance behavior**:
- If user does not interact for 5 seconds on any panel, auto-advance to next panel
- Auto-advance stops on panel 4 (the last panel)
- Any user touch cancels auto-advance for the remainder of the carousel

**Screen transition**:
- **Enter**: Crossfade from Splash [01], 280ms
- **Exit**: Stack push right-to-left to Welcome / Sign Up [03], 280ms, standard iOS navigation transition

---

## Empty States

### Day 1 (new user)
This screen is only shown to first-time users. Content is static — no data dependency. Always appears fully populated.

### Established user (zero state)
Returning users with a valid session skip this screen entirely (Splash → Home directly).

---

## Motivation Adaptation

Not applicable. The carousel is shown once on first launch. Motivation tier has not been established yet.

---

## Accessibility

- Each panel's motion graphic has an accessibility label describing the visual concept (e.g., "Animation showing nine life areas connecting into one unified system")
- Headline and subtext are standard text elements — screen readers read them in order
- Skip and Next/Get Started buttons have clear accessibility labels
- Swipe gestures have an alternative: the Next button advances panels for users who cannot swipe
- Reduced motion: Replace motion graphics with static keyframe images. Remove panel text animations (show immediately). Keep pagination dot transitions.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Lottie/Rive animation file fails to load | Motion graphic area shows a static keyframe image (fallback PNG per panel) instead of animation; headline and subtext appear normally | No user action required — static fallback is pre-bundled with the app binary |
| Animation playback stutters or freezes | Panel displays at last rendered frame; text content and navigation remain fully functional | User can swipe or tap Next to advance; no retry needed |
| Navigation to Welcome / Sign Up [03] fails | "Get started" and "Skip" buttons show pressed state but screen does not transition; brief error toast: "Something went wrong. Please try again." (ink-brown-800 bg, white text, --r-md, auto-dismiss 3s) | Tap "Get started" or "Skip" again to retry navigation |

---

## Cross-References

- **Navigates to**: Screen [03] — Welcome / Sign Up via stack push (from Skip or Get Started)
- **Navigates from**: Screen [01] — Splash Screen via crossfade (auto-advance)
- **Shared components with**: None unique to this screen
- **Patterns used**: Continuous Stroke Line (Panel 1 animation), Brand CTA Button (orange pill), Hero Glow (panel backgrounds)
- **Patterns established**: **Carousel Pagination Pattern** — active dot morphs to 24pt pill (orange), inactive dots are 8pt circles (white 30%). **Brand CTA Button (full-width)** — orange pill, 56pt tall, 24pt horizontal margin, 17pt Sora Semibold, sentence case. **Panel Text Entry Animation** — headline fades in with 16pt upward translate (200ms delay), subtext follows (360ms delay), both 280ms ease-out-soft. **Skip Button Pattern** — top-right, 15pt Sora Regular, white 60%, 44x44pt touch target.
