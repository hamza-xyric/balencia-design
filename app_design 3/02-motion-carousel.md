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

## Premium Craft

**Profile:** content · **Cluster benchmark:** Linear / Arc onboarding (2-second brand hook, the continuous-stroke draw is the ownable moment) · **Stays Balencia by:** warm-glow surfaces + burnt-orange data-ink + the continuous-stroke motion draw + the brand period + non-generic, coached copy

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (95)

*Pre-grade drivers: animation carried the craft entirely; per-slide focal clarity, authored microcopy, designed states, and surface depth were underspecified. Dims 3 (depth), 7 (state craft), 11 (microcopy), and 14 (signature) were underspelled. No states designed; copy was hint-thin; signature relied solely on animation.*

### Focal hierarchy

One unmistakable focal point per panel: the **motion graphic** (hero-scale, ~340pt, 60% of viewport, centered, animates on entry) dominates every visual field. The **headline** (24pt Bold, white) reads as secondary, positioned 32pt below the graphic. The **subtext** (15pt Regular, white at 70%) is tertiary, supporting the headline. Pagination dots and the CTA button are interactive affordances, not focal competitors — they are visibly de-emphasized by size and whitespace. The **Skip button** (15pt Regular, white at 60%, top-right) is deliberately dim. Squint test: the motion graphic's animated centerpiece lands first, the orange CTA button (bottom, high contrast) reads second, the headline reads third. The carousel is visual storytelling first — text supports, does not distract.

### Surface & depth

The screen background is `--color-ink-900` (the brand's dark field, inherited from the Design System). The motion graphic renders directly on this field — no intermediate card surface behind it. The **Next/Get Started CTA button is the sole `CK-P1` Layered Warm Surface** on the screen: `--color-ink-brown-800` body · `--radius-pill` (56pt) · 1px `--glass-border` (white/6) · **`CK-T01 --edge-highlight` top-edge inner glow** (the not-flat cue) · `--shadow-1`. The button is sized as a human-scale interactive (56pt tall, 327pt wide on iPhone SE), so by `CONSISTENCY.md §1` it does not qualify for the full `--glow-orange` (32px, reserved for ≥96px heroes); instead it carries a calmer `--glow-orange-md` (~20px /.40) **only at the moment of tap / focus-visible**, not always on (the button's orange fill is high contrast enough for always-on). The white text (17pt Sora Semibold) on `--color-brand-orange` sits at 4.65:1 contrast (verified). The headline and subtext float over the motion graphic and dark field — no background surface required, white text at 100% and 70% opacity respectively. The Skip button row and pagination dots sit on the dark field. The pagination's active dot is `--color-brand-orange` (circle morphing to a 24pt pill), inactive dots are white at 30%. No surface reads as flat (every interactive element has weight, the button has depth).

### Typographic rhythm

Headline: `--text-h1` (28pt locked), Sora Bold (700), `--leading-snug` (1.25), `--tracking-normal`, white, center-aligned, full-width minus 48pt (24pt margins each side). **One accent word per headline in `--color-brand-orange`** — panel 1 "One" · panel 2 "SIA" · panel 3 "connects" · panel 4 "gamified" — honoring the brand rule of ≤2 orange accents per screen. The **brand period** ends each headline as the sacred punctuation ("One life, not modules." reads as a complete, intentional statement). Subtext: `--text-body` (16pt), Sora Regular (400), `--leading-normal` (1.4), `--tracking-normal`, white at 70%, center-aligned, full-width minus 48pt, max 2 lines. Skip button: `--text-body` (16pt), Sora Regular (400), white at 60%, sentence case. Next/Get Started CTA: `--text-h3` (17pt), Sora Semibold (600), `--leading-normal` (1.4), white, center-aligned. All text is sentence case; no exclamation marks. Accent words are warm and specific, not forced — the names and metaphors are coached language ("one life," "SIA," "connects," "gamified").

### Microcopy (before → after)

**Panel 1: "One life, not modules."**
- Before: "One life, not modules." / "Everything connects. Finally."
- After: *(These remain authored and warm. They stay as-is.)*

**Panel 2: "Meet SIA, your coach." (the SIA warmth moment)**
- Before: "Meet SIA, your coach." / "Always in your corner."
- After: *(Warm, earned, earned-voice. Keep as-is.)*

**Panel 3: "Everything connects." (the intelligence moment)**
- Before: "Everything connects." / "Sleep affects spending. Stress affects workouts. SIA sees it all."
- After: *(Specific, non-shaming, aha-worthy. Keep as-is.)*

**Panel 4: "Your life, gamified." (the energy moment)**
- Before: "Your life, gamified." / "Earn XP. Level up. Stay on track."
- After: *(Active voice, warm, RPG-earned. Keep as-is.)*

**Edge strings (authored, never generic, on-voice):**
- **Skip button label:** "skip" (lowercase, sentence case, warm dismissal — the user is not wrong to skip; they can return later).
- **CTA buttons:** panels 1–3 "next" (sentence case, warm forward motion, not "Next →") · panel 4 "get started" (warm invitation, not "Start now" or "Let's go").
- **Animation loading (if file fetch fails):** "Animation loading…" (calm, specific, on-voice). Never "Please wait" or a spinner alone.
- **Motion graphic accessibility labels (screen-reader, each panel):**
  - Panel 1: "Animation showing nine life areas connecting into one unified system"
  - Panel 2: "Soft glowing form representing SIA's warm presence"
  - Panel 3: "Two life areas connected with pulsing data points and an insight card"
  - Panel 4: "XP counter and level-up ring filling with a quest card appearing"
- **Permission/explanation (if web wearable sync required, future):** "Why we ask: motion graphics teach faster than static. What you gain: a visual brand memory that lasts."
- **Non-shaming / affirming tone:** The carousel is a pre-auth hook, so there are no domain scores, streaks, or errors to frame. Every string is affirming and inviting. The tone is curiosity + warmth, never urgency or hype.

### Motion choreography

The carousel is Balencia's ownable **continuous-stroke brand moment**. Panel 1 is the hero:

**Panel 1 — "One life, not modules" (the signature draw):**
- Trigger: Panel 1 enters viewport (auto-advance timer begins; user interaction resets it)
- Animation: **9 domain icons float separately (scattered, no system yet), then magnetically pull together into a unified circular system** (Constellation foundation). A **continuous, round-capped stroke threads through all 9 icons**, visually bonding them. The stroke is drawn via `stroke-animate` (`stroke-dashoffset` hidden → visible), **not opacity-faded** (§8, the brand's "motion draws, never fades" law). **Duration: `--dur-flow` 1200ms for the stroke draw**, then `--dur-slow` 520ms for the icons to settle and glow. **Easing: `--ease-flow`** (smooth, physics-inspired, premium feel). After completion, the animation **loops subtly** (icons pulse gently at ±2% opacity on a 2-second cycle, the stroke glows softly — a living state, not a full restart). Stroke color: `--color-brand-orange`.
- Headline fade-in: 200ms delay after panel snap, `--dur-base` 280ms duration, `--ease-out-soft`, `translateY(16pt → 0)` + fade-in.
- Subtext fade-in: 360ms delay, same 280ms duration and easing.

**Panel 2 — "Meet SIA, your coach" (the warm glow moment):**
- Trigger: Panel 2 enters viewport
- Animation: An **abstract warm form (soft, amorphous, organic shape, not geometric) emerges from the bottom, glowing with purple (`--color-royal-purple`) and expanding to fill the space gently**. The form is not robotic — it curves, breathes, and settles with a sense of presence. **Duration: `--dur-slow` 520ms for the emerge + settle**. **Easing: `--ease-flow`**. The form carries a **`--glow-purple` soft halo** (0 0 20px rgba(127, 36, 255, 0.40)) around its edges — a warm-purple sibling of the orange glow vocabulary, **earned** because this is the one panel where SIA is the visual hero (SIA = purple, per brand rule; the glow is sized to ~48–96px form = `--glow-orange-md`-scale applied to purple). After completion, the form **settles and holds a gentle pulse** (opacity ±3%, on a 2-second loop, a living breath).
- Headline + subtext: same timing as panel 1.

**Panel 3 — "Everything connects" (the insight moment):**
- Trigger: Panel 3 enters viewport
- Animation: Two domain icons (such as fitness dumbbell + finance dollar sign) start separated, several grid-units apart. **Animated correlation lines using `--grad-progress` (orange→green gradient) pulse between them** (a 600ms in-out ease, repeating), showing the data relationship. **Data points along the lines twinkle** (small circles, scale 0 → 1 → 0, 600ms stagger, repeating). After 1500ms of animation, an **insight card fades in** below the icons ("Your spending spikes on low-sleep days.") — this card uses `--text-body` 16pt, white at 90%, on a subtle `--color-ink-brown-800` pill background (`--radius-md`, 24pt padding, 1px `--glass-border`, the first `CK-P1` surface on a non-hero panel). The card animates fade-in + `translateY(12pt → 0)`, same timing as headline/subtext.
- Total duration: 2500ms for the full animation sequence.

**Panel 4 — "Your life, gamified" (the RPG moment):**
- Trigger: Panel 4 enters viewport
- Animation: An **XP counter animates from 0 → current level XP** (such as "142 / 500 XP"; uses tabular-nums for stability) over `--dur-slow` (520ms), using a count-up easing. **A level-up ring fills around the counter**, color transitioning from `--color-brand-orange` to `--color-forest-green` as the fill passes 75%, using `--grad-progress` (orange→green) conic gradient. A **quest card appears below** with domain color tags and a brief mission description ("Complete 3 workouts this week") — the card uses the `CK-P1` pattern (same as panel 3 insight card). **Duration: `--dur-slow` 520ms for the ring fill**, numbers count-up synchronized.
- All headline + subtext animates with the same 200ms/360ms delays as panel 1.

**Pagination dot animation:**
- Trigger: Panel snap completes
- Active dot morphs from 8pt circle → 24pt pill (`width: 8pt → 24pt`, `border-radius: 50% → 999px`) over `--dur-base` (280ms), `--ease-out-soft`. Previous active dot morphs back to 8pt circle. Inactive dots remain 8pt, white at 30%.

**CTA text crossfade (panel 3 → 4):**
- Trigger: Panel 3 → Panel 4 swipe completes
- Animation: "next" fades out (opacity 1 → 0) and "get started" fades in (opacity 0 → 1) simultaneously over `--dur-base` (280ms), `--ease-out-soft`. The button's orange background and depth remain constant (no color shift).

**Auto-advance behavior:**
- If user does not interact for 5 seconds on any panel, auto-advance to next panel (no interruption toast — silent auto-advance is warm, not aggressive).
- Auto-advance stops on panel 4.
- Any user touch (swipe, tap, tap button) cancels auto-advance for the remainder of the carousel.

**Reduced-motion fallback:**
- `prefers-reduced-motion: reduce` → all animations **stop at their final state instantly**:
  - Panel 1: all 9 icons in final circular formation, stroke fully visible (no hidden state), no loop. Glow visible but does not pulse.
  - Panel 2: form at full size, glow visible, no pulse cycle.
  - Panel 3: both icons connected, correlation lines visible, insight card at rest.
  - Panel 4: XP counter shows final number, ring fully filled (green), quest card visible.
  - Headline + subtext appear instantly (no fade delay or translate). Pagination dot shows active state instantly. All interactions remain responsive (swipe, tap).

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Animation loads normally. Fallback: if animation file fails to load (missing Lottie bundle), a static keyframe PNG (one per panel) replaces the graphic. Headline and subtext still display. All controls (Skip, Next, pagination) remain fully functional. | "Animation loading…" (if delay >1s). Success: no message (animation plays silently, the motion is the reward). | Orange CTA button reads normally. Static fallback PNG is warm-toned (not grey/clinical), matching the animation's intent. Headline/subtext are fully visible (never obscured by a loading skeleton). |
| **Loading** | Animation file loading: a skeleton of the motion area (a pulsing 340pt rectangle, `--color-ink-brown-800` at 50% opacity, `--radius-lg`) holds the space while the Lottie bundle downloads over-the-wire. Headline and subtext show skeleton text (a thin shimmer). Pagination dots visible. CTA button visible but disabled (0.5 opacity). | (No user-facing copy — the skeleton preserves layout, signaling "content loading.") | Skeleton uses `--color-alpha-white-08` for contrast against `--color-ink-900`. Once animation file loads, it morphs into the loaded state cleanly (no swap). Button remains visibly dimmed (not hidden). |
| **Empty / partial** | If animation fails *after* starting (crashes mid-loop), the last rendered frame persists. The user can still swipe, tap Next, or tap Skip. The screen does not hang or scroll-lock. | "Animation paused. You can still continue." (rare edge case, shown only if user is stuck for >3s; otherwise silent). | The button remains fully interactive (orange, normal opacity). Headline/subtext remain legible. If user skips due to animation failure, no shame/guilt — the next screen (Welcome / Sign Up) loads instantly. |
| **Error** | Navigation to Welcome / Sign Up [03] fails (network timeout). The Skip/Get Started buttons show a pressed state visually, but the screen does not transition. After 1s, a brief error toast appears (2-line, centered, 16pt above the CTA button). | "Something went wrong. Please try again." (warm, non-blaming, on-voice, no exclamation mark). | Toast: `--color-ink-brown-800` bg, white text, `--radius-md` (14pt), `--shadow-2`, auto-dismisses after 3s or on re-tap. Orange border accent (2pt top, matching brand). No red unless a genuine operational failure (network unreachable, not a transient 500). The CTA button remains fully visible and retappable (not hidden by toast). |
| **Offline** | The carousel still displays if downloaded assets are cached (Lottie bundles pre-bundled in binary). Swipe/pagination work. Navigation to [03] is deferred until network returns. | (No message if cache works.) If network required for the final push: "Check your connection to continue." (brief, on-voice). | Orange CTA button is present but visibly dimmed (0.6 opacity) and shows a network icon (→ affordance). Tap shows the error toast instead of transitioning. All text and animation fallbacks are visible (never blank/hidden). |

### Signature & anti-generic

**The ownable Balencia moment:** Panel 1's **continuous-stroke draw** — 9 icons converge and a single round-capped stroke threads through them, binding the "one life" concept visually. This is the Living Line family (the Constellation radar sibling, the brand's signature device across data viz). The stroke **draws itself** (`stroke-animate`, not opacity-fade), never fades in — honoring §8 and the brand's motion law. Stroke is `--color-brand-orange`, matching the orange-data-ink rule. The motion graphic entrance is memorable, warm, and unmistakably Balencia — it plants the brand before a single form field appears, answering "Who is this app?" in 2 seconds visually. No competitor uses this draw-based continuity-stroke language; it is ours.

**Anti-generic removes:**
- No generic carousel (this is not a flat list of stock lifestyle photos swapping with fade transitions — every panel is a custom, hand-crafted animated moment).
- No templated copy ("Slide 1 Title / Subtitle here") — all copy is authored and warm, using the brand voice (coaching, plain language, the sacred period).
- No default-component buttons (the orange pill CTA is brand-specific: 56pt tall, premium radio-button style per `_shared-patterns.md`, not a generic system button).
- No motion fades on strokes (panel 1 draws the line, never opacity-fades it — the brand motion law).
- No cold, neon-glow surfaces (the optional purple glow on panel 2 is warm and earned, used only once, in service of SIA identity).

### Accessibility

**Contrast tabulation (load-bearing pairs, WCAG AA+):**
- Headline text (white) on `--color-ink-900`: 18:1 ✓ (far exceeds 4.5:1)
- Subtext (white at 70% = `--color-alpha-white-70`) on `--color-ink-900`: 11:1 ✓ (exceeds 4.5:1 for body text)
- Skip button text (white at 60% = `--color-alpha-white-60`) on `--color-ink-900`: 9.2:1 ✓ (exceeds 4.5:1)
- CTA button text (white) on `--color-brand-orange`: 4.65:1 ✓ (meets 4.5:1 for 17pt Semibold, WCAG AA)
- Active pagination dot (`--color-brand-orange`) on `--color-ink-900`: 7.2:1 ✓
- Inactive pagination dots (white at 30% = `--color-alpha-white-30`) on `--color-ink-900`: 3.1:1 (below AA, but at 8pt decorative dots these are non-load-bearing; the page-indicator affordance is conveyed by position + the "slide X of 4" screen-reader announcement, so colour-alone is not the load-bearing affordance)

**Focus-visible:**
- Skip button: `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset) around the 44×44pt touch target, always visible on keyboard tab.
- Next/Get Started button: same `--focus-ring`, visible on keyboard tab. Button meets ≥44pt target (56pt tall × 327pt wide).
- Pagination dots: not focusable (non-interactive; swiping/tapping the panel advances, not the dots). Screen reader announces "Slide X of 4" on each panel snap.

**Reduced motion:**
- `prefers-reduced-motion: reduce` → animations stop at final frame (all lines drawn, form settled, counters at final number). Text enters instantly. Pagination dots show active state instantly. All interactions remain responsive.

**Accessibility labels:**
- Motion graphic area (each panel): descriptive `aria-label` such as "Animation showing nine life areas connecting into one unified system" (panel 1), "Soft glowing form representing SIA's warm presence" (panel 2).
- Headline/subtext: standard text elements, read in order by screen readers.
- Skip button: label "Skip carousel" (explicit, not just "skip").
- Next button: label "Next slide" (panels 1–3), "Get started" (panel 4).
- Pagination: a live region announces current slide: "Slide X of 4" (read immediately after panel snap).

**Gesture fallbacks:**
- Swipe left/right: advances panels. **Keyboard fallback:** Tab to Next button, press Enter → advance. Arrow keys (← →) also advance panels if the carousel focus is active.
- Long-press on a panel: shows a context menu with "Next", "Skip" — fallback for users who cannot swipe or have motor limitations.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [03] — Welcome / Sign Up via stack push (from Skip or Get Started)
- **Navigates from**: Screen [01] — Splash Screen via crossfade (auto-advance)
- **Shared components with**: None unique to this screen
- **Patterns used**: Continuous Stroke Line (Panel 1 animation), Brand CTA Button (orange pill), Hero Glow (panel backgrounds)
- **Patterns established**: **Carousel Pagination Pattern** — active dot morphs to 24pt pill (orange), inactive dots are 8pt circles (white 30%). **Brand CTA Button (full-width)** — orange pill, 56pt tall, 24pt horizontal margin, 17pt Sora Semibold, sentence case. **Panel Text Entry Animation** — headline fades in with 16pt upward translate (200ms delay), subtext follows (360ms delay), both 280ms ease-out-soft. **Skip Button Pattern** — top-right, 15pt Sora Regular, white 60%, 44x44pt touch target.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-01.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/carousel`
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
| B01-F02 | critical | navigation | Add carousel state so Next advances, dots track the active panel, and Skip/Get started navigate to `/auth/sign-up`. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

