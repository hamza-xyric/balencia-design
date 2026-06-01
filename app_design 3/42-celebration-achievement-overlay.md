# Screen Design: Celebration / Achievement Overlay

**Screen**: 42 of 73
**File**: 42-celebration-achievement-overlay.md
**Register**: Brand Mode
**Primary action**: dismiss celebration
**Tab**: None (overlay on top of any screen)
**Navigation**: z-50 overlay (big milestone) or z-60 toast (small win). Not a navigated screen — system-triggered. Dismissed by tap/button. Returns to underlying screen.

---

## Purpose

The Celebration overlay is the emotional payoff of Balencia's RPG gamification system. When a user completes a milestone — finishing a mission, hitting a streak, leveling up (overall or per-domain) — this overlay makes the moment feel earned and significant. It reinforces the XP loop, celebrates consistency, and delivers SIA's warmth at the peak of accomplishment. The overlay exists at three scales: full-screen cinematic for major milestones, a lightweight toast for everyday wins (including domain level-ups), and inline radar vertex pulses for stat increases. All must feel premium and mature, never cartoonish.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority — Big Milestone):
1. Achievement badge/icon — the visual anchor, large and animated
2. XP earned — count-up number animation, the tangible reward
3. Achievement title + description — what they did
4. SIA congratulatory message — personal, data-specific warmth
5. Level-up indicator (conditional) — if this milestone triggers a level-up
6. Share button — optional social action
7. Dismiss affordance — tap anywhere or explicit button

**Hierarchy** (Small Win — toast):
1. XP popup — "+25 XP" floating up from the trigger point
2. Toast bar — achievement name + XP earned, auto-dismisses

**User flow**:
- **Arrives from**: System trigger — mission completion (14), workout finish (27), habit streak (38), action completion on Home (12), any domain dashboard milestone, overall level-up threshold crossed, domain level-up threshold crossed
- **Primary exit**: Dismiss (tap anywhere / "continue" button) → returns to underlying screen
- **Secondary exits**: "Share" → native share sheet → returns to overlay → dismiss

---

## Layout

**Scroll behavior**: None (fixed content, no scroll)
**Tab bar visible**: No (overlay covers entire screen including tab bar)

### ASCII Wireframe — Big Milestone (Full-Screen)

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│                             │
│    ✦  ·  ✧  ·  ✦  ·  ✧    │  ← Confetti
│  ·  ✦  ·  ✧  ·  ✦  ·  ✧   │     particles
│    ✧  ·  ✦  ·  ✧  ·  ✦    │     (animated)
│                             │
│         ┌───────┐           │
│         │       │           │
│         │ BADGE │           │  ← Achievement
│         │       │           │     badge: 96pt
│         └───────┘           │
│                             │
│       + 150 XP              │  ← XP count-up
│                             │     28pt Bold
│    Mission completed.       │  ← Title: 20pt
│    "Run 5km three           │     Semibold
│     times a week"           │
│                             │
│  ── ── ── ── ── ── ── ──   │  ← Continuous
│                             │     stroke line
│  "Three weeks strong.       │
│   Your recovery is up 15%   │  ← SIA message
│   since you started."       │     15pt Regular
│       — SIA                 │
│                             │
│     ┌─────────────────┐     │
│     │     share       │     │  ← Share button
│     └─────────────────┘     │     (secondary)
│                             │
│      tap anywhere to        │  ← Dismiss hint
│         continue            │     13pt, white 40%
│                             │
└─────────────────────────────┘
```

### ASCII Wireframe — Level-Up Variant (Overall)

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│                             │
│    ✦  ·  ✧  ·  ✦  ·  ✧    │
│  ·  ✦  ·  ✧  ·  ✦  ·  ✧   │
│    ✧  ·  ✦  ·  ✧  ·  ✦    │
│                             │
│         ┌───────┐           │
│         │       │           │
│         │ BADGE │           │
│         │       │           │
│         └───────┘           │
│                             │
│       + 500 XP              │
│                             │
│      Level 8 → 9            │  ← Level transition
│    ━━━━━━━━━━━━━━━━━━       │     with XP bar
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░       │     fill animation
│                             │
│  ── ── ── ── ── ── ── ──   │
│                             │
│  "Level 9. You're building  │
│   real momentum across      │
│   3 life areas."            │
│       — SIA                 │
│                             │
│     ┌─────────────────┐     │
│     │     share       │     │
│     └─────────────────┘     │
│                             │
│      tap anywhere to        │
│         continue            │
│                             │
└─────────────────────────────┘
```

### ASCII Wireframe — Domain Level-Up (Toast)

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ 🔴 Fitness Level 8    │  │  ← Domain Level-Up Toast
│  │         +25 XP        │  │     domain color icon
│  └───────────────────────┘  │     auto-dismiss 3s
│                             │
│  (underlying screen)        │
│                             │
└─────────────────────────────┘
```

### ASCII Wireframe — Small Win (Toast)

```
┌─────────────────────────────┐
│  Status Bar (44pt)          │
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ ✓ Habit done  +25 XP  │  │  ← Toast: 48pt
│  └───────────────────────┘  │     auto-dismiss 3s
│                             │
│                             │
│  (underlying screen shows   │
│   through — toast does not  │
│   block interaction after   │
│   brief appearance)         │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│ [ Today ][ SIA ][ Goals ][ Me ] │
└─────────────────────────────┘
```

### Component Stack — Big Milestone (top to bottom)

1. **Confetti Particle Layer** — full screen, z-51
   - Purpose: Cinematic celebration atmosphere
   - Content: Animated particles in brand colors (orange, green, gold)

2. **Achievement Badge** — 96x96pt, centered
   - Purpose: Visual anchor — the trophy
   - Content: Domain-colored badge icon with glow

3. **XP Counter** — centered, below badge
   - Purpose: Tangible reward display
   - Content: "+ NNN XP" with count-up animation

4. **Achievement Title + Description** — centered, below XP
   - Purpose: What they accomplished
   - Content: Title + mission name

5. **Level-Up Bar** (conditional) — centered, below title
   - Purpose: Show level progression
   - Content: Level transition text + XP progress bar fill animation

6. **Continuous Stroke Line** — centered, decorative divider
   - Purpose: Brand signature visual separating achievement from SIA message
   - Content: Single continuous stroke in orange, draws itself

7. **SIA Congratulatory Message** — centered, below line
   - Purpose: Personal, warm acknowledgment from the coach
   - Content: 2-3 sentence message with data specifics

8. **Share Button** — centered, below SIA message
   - Purpose: Optional social sharing
   - Content: Secondary button style

9. **Dismiss Hint** — centered, bottom
   - Purpose: Tell user how to close
   - Content: "tap anywhere to continue" in white at 40%

---

## Components

### Celebration Backdrop
- **Purpose**: Full-screen dark overlay that focuses attention on the celebration
- **Data source**: None (visual only)
- **Visual treatment**: ink-900 at 95% opacity over the underlying screen. Subtle radial gradient glow from center — orange at 8% opacity, fading outward. This creates a warm, premium atmosphere without fully obscuring the underlying screen.
- **Variants**: Standard (orange glow), level-up (orange + green glow, more intense)
- **Gestures**: Tap anywhere to dismiss (after entrance animation completes, ~1.2s)
- **Size**: Full screen

### Confetti Particle System
- **Purpose**: Cinematic celebration moment
- **Data source**: None (animated visual)
- **Visual treatment**: 40-60 particles falling/floating from top. Particle types: small circles (4pt), small squares (4pt), elongated pills (4x12pt). Colors: Burnt Orange (#FF5E00) at 80%, Forest Green (#34A853) at 60%, gold/amber (#F59E0B) at 40%, white at 20%. Particles have randomized rotation, velocity, and size variation. Fade out as they reach bottom third of screen. Duration: ~3 seconds, then particles settle.
- **Variants**: Standard confetti (goal completion), enhanced confetti (level-up — more particles, slower, with subtle glow on each)
- **Gestures**: None (non-interactive decoration)
- **Size**: Full screen overlay

### Achievement Badge
- **Purpose**: The visual trophy — the thing the user earned
- **Data source**: API — achievement type determines badge design
- **Visual treatment**: 96x96pt circular container. Background: domain color of the achievement at 15% opacity. Border: 2pt domain color. Center icon: domain-specific icon (24pt, domain color, filled variant). Outer glow: domain color glow (--glow-orange / --glow-green / domain equivalent). Entrance animation: scale(0→1.0) with bounce overshoot + fade-in.
- **Variants by achievement type**:
  - Mission complete: shield/star icon in domain color
  - Streak milestone: flame icon in orange
  - Level-up (overall): arrow-up icon in green
  - Cross-domain: connected dots icon in orange
- **Gestures**: None (non-interactive)
- **Size**: 96x96pt

### XP Counter
- **Purpose**: Show the tangible XP reward with satisfying count-up
- **Data source**: API — XP amount for this achievement
- **Visual treatment**: "+ NNN XP" text. "+" in white at 60% (20pt Sora Regular). Number in white (28pt Sora Bold, tabular-nums). "XP" in Burnt Orange (20pt Sora Semibold). Count-up animation from 0 to final value over 800ms. Subtle orange glow behind the number during count-up.
- **Variants**: Small XP (+10-50), medium XP (+50-200), large XP (+200-1000, number larger at 36pt)
- **Gestures**: None
- **Size**: Auto-width x 40pt

### Achievement Title Block
- **Purpose**: Describe what was achieved
- **Data source**: API — achievement name and linked mission name
- **Visual treatment**: Two lines, center-aligned. Line 1: Achievement type label — "mission completed." / "streak milestone." / "level up." in 20pt Sora Semibold, white. Brand period at end. Line 2: Specific name — the mission title in 16pt Sora Regular, white at 70%, in quotes.
- **Variants**: Mission completion, streak milestone, level-up (overall), cross-domain achievement
- **Gestures**: None
- **Size**: Full-width minus 32pt (16pt margins), auto-height

### Level-Up Bar (Conditional)
- **Purpose**: Visualize the level transition when a milestone triggers a level-up
- **Data source**: API — previous level, new level, XP progress
- **Visual treatment**: Level transition text: "level N → N+1" in 20pt Sora Bold, white, center-aligned. Arrow in Burnt Orange. Below: XP progress bar — full-width minus 64pt (32pt margins each side), 8pt height, --r-pill corners. Background: white at 10%. Fill: Burnt Orange, animates from previous XP percentage to new (overflows and resets to show level-up). 24pt gap above and below this component.
- **Variants**: Single level-up, multi-level-up (rare — shows each level transition sequentially)
- **Gestures**: None
- **Size**: Full-width minus 64pt, 80pt total height

### Continuous Stroke Line (Celebration)
- **Purpose**: Brand signature divider between achievement info and SIA message
- **Data source**: None (decorative)
- **Visual treatment**: Single continuous stroke line, Burnt Orange at 60%, --stroke-base (4px width). Approximately 200pt wide, centered. Organic curved path (not straight). Draws itself from left to right (stroke animation). Round caps, round joins.
- **Variants**: None
- **Gestures**: None
- **Size**: ~200pt wide x 24pt tall (including curve height)

### SIA Congratulatory Message
- **Purpose**: Warm, personal acknowledgment from the AI coach
- **Data source**: API — SIA-generated message specific to this achievement
- **Visual treatment**: Message text in 15pt Sora Regular, white at 80%, center-aligned, max 3 lines. Italicized. Below message: "— SIA" attribution in 13pt Sora Semibold, purple (#7F24FF) at 60%, center-aligned. Small purple dot (6pt) to the left of "SIA" as the AI indicator. 8pt gap between message and attribution.
- **Variants**: By achievement type — mission completion gets progress-focused message, streak gets consistency message, overall level-up gets growth-focused message, domain level-up references domain-specific progress
- **Gestures**: None
- **Size**: Full-width minus 64pt margins, auto-height

### Share Button
- **Purpose**: Optional social sharing of achievement
- **Data source**: None
- **Visual treatment**: Secondary button style — transparent background, 1pt border white at 20%, --r-pill corners. Text: "share" in 15pt Sora Semibold, white. Width: 160pt, centered. Height: 44pt. Not the primary action (dismiss is primary — by tapping anywhere).
- **Variants**: None
- **Gestures**: Tap to open native share sheet (generates achievement card image)
- **Size**: 160x44pt

### Dismiss Hint
- **Purpose**: Tell user how to close the overlay
- **Data source**: None
- **Visual treatment**: "tap anywhere to continue" in 13pt Sora Regular, white at 40%, center-aligned. Subtle pulse animation (opacity 30% → 50% → 30%, 2s cycle) to draw attention without being distracting. Appears after entrance animation completes (~1.5s delay).
- **Variants**: None
- **Gestures**: The entire overlay backdrop is the dismiss target
- **Size**: Auto-width x 20pt

### Small Win Toast
- **Purpose**: Lightweight celebration for everyday completions
- **Data source**: API — XP amount, action name
- **Visual treatment**: Horizontal bar, 48pt height, full-width minus 32pt (16pt margins). ink-brown-800 background with --shadow-2. --r-xl (28pt) corners. Left side: green checkmark in circle (24pt). Center: action name truncated (15pt Sora Semibold, white). Right side: "+NN XP" in Burnt Orange (15pt Sora Bold). Slides down from top (below status bar), auto-dismisses after 3 seconds.
- **Variants**: Action complete, habit streak ("5-day streak"), XP-only (no action name — just "+NN XP")
- **Gestures**: Swipe up to dismiss early, tap to expand to detail (navigates to achievement history)
- **Size**: Full-width minus 32pt x 48pt

### XP Popup Animation
- **Purpose**: Floating XP indicator at the point of action completion
- **Data source**: API — XP amount
- **Visual treatment**: "+NN XP" text in Burnt Orange, 16pt Sora Bold. Appears at the tap point (where the user completed the action). Floats upward ~64pt while fading out over 1.2s. Slight scale-up (1.0 → 1.2) during float. No background — text only with subtle orange glow behind.
- **Variants**: Small XP (+5-25, 14pt), medium XP (+25-100, 16pt), large XP (+100+, 20pt with enhanced glow)
- **Gestures**: None (non-interactive, passes through to elements below)
- **Size**: Auto-width, ~20pt height

### Domain Level-Up Toast
- **Purpose**: Celebrate a per-domain level-up (e.g., "Fitness Level 7 → 8") without full-screen interruption. Domain level-ups are frequent enough that a full overlay would be fatiguing — a toast keeps the celebration proportionate.
- **Data source**: API — domain name, domain color, previous level, new level, +25 XP bonus
- **Visual treatment**: Same dimensions and positioning as Small Win Toast (48pt height, full-width minus 32pt, slides down from top). ink-brown-800 background with --shadow-2, --r-xl corners.
  - Left side: domain color dot (12pt circle, domain color fill)
  - Center: "[Domain] Level [N]" — 15pt Sora Semibold, white
  - Right side: "+25 XP" — 15pt Sora Bold, Burnt Orange (#FF5E00)
  - Auto-dismiss after 3s
- **Variants**: Standard (single domain), Dual level-up (two domains level up simultaneously — stacked toasts, 4pt gap, 80ms stagger)
- **Gestures**: Swipe up to dismiss early. Tap to navigate to RPG Character [19] domain sub-stats view.
- **Size**: Full-width minus 32pt x 48pt

### Radar Vertex Pulse
- **Purpose**: Inline micro-celebration on the Life Areas [16] radar chart when a domain stat increases from new activity. Provides immediate visual feedback tying an action to character growth without leaving the current context.
- **Data source**: Domain stat recalculation after activity logged
- **Visual treatment**: The affected axis vertex dot (8pt) on the radar chart pulses outward with a domain-colored glow ring (16pt → 24pt → fade) over 600ms. The vertex position may shift slightly outward if the stat score increased. The filled polygon area morphs smoothly to the new shape (280ms ease-flow).
- **Trigger**: Any action that increases a domain stat (habit completion, workout logged, meal logged, etc.) while radar chart is visible or on next radar chart mount.
- **Gestures**: None (passive animation)
- **Size**: 24pt glow radius around affected vertex

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Backdrop | #0A0A0F at 95% | ink-900 | Dark overlay |
| Backdrop glow | #FF5E00 at 8% | brand-orange | Warm radial atmosphere |
| Confetti primary | #FF5E00 at 80% | brand-orange | 60% role — dominant particles |
| Confetti secondary | #34A853 at 60% | brand-green | 30% role — success particles |
| Confetti tertiary | #F59E0B at 40% | — | Gold accent particles |
| XP number text | white | — | High contrast reward |
| XP label "XP" | #FF5E00 | brand-orange | 60% role — brand reward |
| XP popup float | #FF5E00 | brand-orange | 60% role — inline reward |
| Achievement title | white | — | Primary text |
| Achievement subtitle | white at 70% | — | Secondary text |
| Level-up bar fill | #FF5E00 | brand-orange | 60% role — progress |
| Level-up bar bg | white at 10% | — | Track |
| Level arrow | #FF5E00 | brand-orange | 60% role — progression |
| Stroke line | #FF5E00 at 60% | brand-orange | Brand signature |
| SIA message text | white at 80% | — | Coach message |
| SIA attribution | #7F24FF at 60% | brand-purple | 10% role — AI indicator |
| SIA dot indicator | #7F24FF | brand-purple | 10% role — AI presence |
| Share button border | white at 20% | — | Secondary action |
| Share button text | white | — | Button text |
| Dismiss hint | white at 40% | — | Tertiary guidance |
| Toast background | #211008 | ink-brown-800 | Card surface |
| Toast checkmark | #34A853 | brand-green | 30% role — completion |
| Toast XP text | #FF5E00 | brand-orange | 60% role — reward |
| Badge glow | per domain | domain color glow | Identification |
| Badge border | per domain | domain color | Identification |

**60/30/10 verification**: Orange dominates through confetti particles, XP display, progress bar fill, stroke line, and popup. Green appears in confetti (secondary role) and toast checkmark. Purple is limited to SIA attribution text and dot — exactly 2 elements. Domain colors appear only on the achievement badge border and glow.

---

## Interaction States

### Dismiss Target (Full Backdrop)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Backdrop at 95% | — |
| Pressed | Backdrop brightens slightly (90%) | Light impact |
| Focus-visible | Orange ring around screen edge (2pt) | — |
| Disabled | During entrance animation (~1.2s) — taps ignored | — |
| Loading | — | — |
| Error | — | — |
| Success | Overlay begins exit animation | — |

### Share Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent, 1pt border white 20% | — |
| Pressed | Scale(0.97), bg white at 5%, border brightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Spinner replaces text (generating share card) | — |
| Error | Red border, "sharing failed" text | Error notification |
| Success | Green glow 600ms, share sheet appears | Success notification |

### Small Win Toast
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Visible, auto-dismiss countdown active | — |
| Pressed | Scale(0.98), shadow reduces | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Backdrop (anywhere) | Dismiss overlay (after entrance completes) |
| Tap | Share button | Open native share sheet |
| Swipe up | Small win toast | Dismiss toast early |
| Tap | Small win toast | Navigate to achievement detail/history |

### Haptic Feedback Points
- Big milestone overlay appears: heavy impact
- XP count-up completes: success notification
- Level-up animation triggers: heavy impact
- Share button tap: light impact
- Dismiss overlay: light impact
- Small win toast appears: success notification
- Small win XP popup: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Backdrop | Achievement triggered | Fade in (opacity 0→95%) | 520ms (--dur-slow) | ease-out-soft |
| Confetti particles | After backdrop fade | Particles cascade from top, random trajectories, settle after 3s | 3000ms | ease-flow (fall) |
| Achievement badge | After backdrop | Scale(0→1.0) with spring overshoot (1.15→1.0) + fade in | 520ms (--dur-slow) | ease-flow |
| Badge glow | After badge settles | Pulsing glow (opacity 30%→60%→30%), continuous | 2000ms cycle | ease-in-out |
| XP counter | After badge | Count-up from 0 to final value | 800ms | ease-flow |
| XP glow | During count-up | Orange glow behind number, fades after count completes | 1200ms | ease-out-soft |
| Achievement title | After XP | Fade in + translateY(12→0) | 280ms (--dur-base) | ease-out-soft |
| Level-up bar | After title (if applicable) | Bar fill animates from old % to 100%, resets, fills to new % | 1200ms (--dur-flow) | ease-flow |
| Level number | During bar fill | Old number fades out, new number fades in + scale bounce | 520ms (--dur-slow) | ease-flow |
| Stroke line | After title/level | Draws itself left to right | 1200ms (--dur-flow) | ease-flow |
| SIA message | After line | Fade in + translateY(8→0) | 280ms (--dur-base) | ease-out-soft |
| Share button | After SIA message | Fade in | 280ms (--dur-base) | ease-out-soft |
| Dismiss hint | Last element | Fade in (delayed 1.5s from start) + pulse cycle | 280ms in, then 2s pulse | ease-out-soft |
| Exit animation | Tap dismiss | All elements scale(1.0→0.95) + fade out simultaneously | 280ms (--dur-base) | ease-out-soft |
| Toast enter | Small win triggered | Slide down from top (translateY(-60→0)) + fade in | 280ms (--dur-base) | ease-out-soft |
| Toast exit | Auto-dismiss or swipe | Slide up (translateY(0→-60)) + fade out | 280ms (--dur-base) | ease-out-soft |
| Domain level-up toast enter | Domain level-up triggered | Slide down from top (same as toast) with domain color dot scale(0→1) | 280ms (--dur-base) | ease-out-soft |
| Domain level-up toast exit | Auto-dismiss 3s or swipe | Slide up + fade out | 280ms (--dur-base) | ease-out-soft |
| Radar vertex pulse | Domain stat increased | Vertex dot glow ring expands (16→24pt) + fades, polygon shape morphs to new values | 600ms glow, 280ms morph | ease-flow |
| XP popup float | Action completion | Float up (translateY(0→-64)) + fade out + scale(1.0→1.2) | 1200ms (--dur-flow) | ease-out-soft |

**Total entrance sequence**: ~4.5 seconds from trigger to all elements visible. Confetti and badge lead (cinematic hook), then information cascades in. User can dismiss after ~1.5s (once badge + XP are visible).

**Screen transition**:
- **Enter**: Not a navigation — overlay fades in over current screen
- **Exit**: Overlay fades out, revealing underlying screen unchanged

---

## Empty States

### Day 1 (new user)
Not applicable — the celebration overlay only appears when there is an achievement to celebrate. However, the system should trigger the first celebration early in the user experience:
- After completing the first onboarding goal setup: small win toast "+10 XP — first mission created."
- After completing the first action ever: full celebration overlay — "first step taken." with encouraging SIA message: "everyone starts here. you just did the hardest part — starting."

### Established user (zero state)
Not applicable — this overlay never shows in a "zero" state. It only appears when triggered by an achievement event.

---

## Motivation Adaptation

- **Low motivation**: More celebrations for smaller wins. Small win toast triggers on every completed action (not just milestones). Domain level-up toasts always shown. Full celebration overlay triggers at lower thresholds (3-day streaks instead of 7-day). SIA messages are warmer and more encouraging: "every step matters. this one too." XP amounts feel generous for small actions.
- **Medium motivation**: Default experience. Small win toasts for action completions, domain level-up toasts always shown, full overlay for mission completions and streak milestones (7-day, 14-day, 30-day). SIA messages balance warmth with data specifics. Radar vertex pulses on stat increases.
- **High motivation**: Fewer celebrations, more substance. Small win toasts are minimal (XP popup only, no toast bar). Domain level-up toasts still shown (they're infrequent enough). Full overlay reserved for significant milestones only (mission completion, overall level-up). SIA messages are data-focused: "level 9. your consistency across fitness and finance has been in the top 10% for 3 weeks." Replace confetti with a clean data summary card showing progress metrics. Radar vertex pulses active.

---

## Cross-References

### Subscription Success Variant
- **Purpose**: Celebrate a subscription upgrade with premium flair and SIA congratulations
- **Trigger**: After successful IAP purchase on Subscription [23] returns confirmed
- **Visual treatment**: Same full-screen celebration overlay structure with these differences:
  - Badge: crown/star icon (96pt) in Burnt Orange, with gold (#FFD700) glow instead of domain color glow
  - XP counter: hidden (subscription isn't an XP event)
  - Title: "Welcome to [tier name]." — 20pt Sora Semibold, white. Second line: "[tier name] unlocked" in 16pt Sora Regular, white at 70%
  - Level-up bar: hidden
  - Confetti: enhanced variant — gold/amber (#F59E0B) at 60% dominant instead of orange, with orange secondary
  - SIA message: tier-specific congratulatory message. Example: "Pro unlocked. You now have access to advanced analytics and deeper AI coaching. Let's put it to work." — SIA attribution in purple as standard
  - CTA: "explore new features" orange pill (48pt, 200pt wide) instead of share button. Tap → navigates to Explore [18] or refreshes Subscription [23] screen.
  - Share button: still present below CTA, secondary style
  - Dismiss: "tap anywhere to continue" as standard
- **Gestures**: same as standard celebration — tap anywhere dismisses, tap CTA navigates, tap share opens share sheet

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| XP "+" prefix | Sora | Regular (400) | 20pt | 28pt | white at 60% |
| XP number | Sora | Bold (700) | 28pt | 36pt | white |
| XP "XP" label | Sora | Semibold (600) | 20pt | 28pt | orange #FF5E00 |
| Large XP number (200+) | Sora | Bold (700) | 36pt | 44pt | white |
| Achievement type label | Sora | Semibold (600) | 20pt | 28pt | white |
| Achievement specific name | Sora | Regular (400) | 16pt | 24pt | white at 70% |
| Level transition text | Sora | Bold (700) | 20pt | 28pt | white |
| SIA message text | Sora | Regular (400) | 15pt | 22pt | white at 80% |
| SIA "— SIA" attribution | Sora | Semibold (600) | 13pt | 18pt | purple #7F24FF at 60% |
| Share button text | Sora | Semibold (600) | 15pt | 20pt | white |
| Dismiss hint text | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Toast action name | Sora | Semibold (600) | 15pt | 20pt | white |
| Toast XP text | Sora | Bold (700) | 15pt | 20pt | orange #FF5E00 |
| XP popup float text | Sora | Bold (700) | 16pt | 22pt | orange #FF5E00 |
| Small XP popup | Sora | Bold (700) | 14pt | 20pt | orange #FF5E00 |
| Large XP popup (100+) | Sora | Bold (700) | 20pt | 28pt | orange #FF5E00 |
| Subscription tier name | Sora | Semibold (600) | 20pt | 28pt | white |
| Subscription subtitle | Sora | Regular (400) | 16pt | 24pt | white at 70% |
| Subscription CTA ("explore new features") | Sora | Semibold (600) | 15pt | 20pt | white |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Achievement data fails to load | Overlay does not appear; achievement queued for next app foreground | Achievement triggers again on next relevant screen load |
| SIA message fails to generate | Overlay displays without SIA message section; stroke line and share button shift up to fill gap | No user action needed; SIA message is supplementary |
| Share card generation fails | Share button shows brief spinner then error state: red border, "sharing failed" text (600ms), reverts to default | Tap share button again to retry |
| XP count-up data missing | XP section hidden; achievement title and SIA message still display | No user action needed |
| Level-up bar data error | Level-up section hidden; overlay shows standard achievement without level transition | No user action needed |
| Overlay dismiss fails to register | Overlay respects second tap; 10-second auto-dismiss failsafe if no interaction detected after entrance completes | Tap anywhere or wait for auto-dismiss |
| Toast fails to render | XP popup float still appears at action point even if toast bar fails | No user action needed; XP is still recorded server-side |
| Subscription celebration data missing | Overlay shows generic "Welcome!" heading without tier-specific details | Tap dismiss to continue; subscription status still active |

---

## Accessibility

- Full-screen overlay announced: "Achievement celebration. [Achievement type]: [specific name]. [XP] XP earned."
- XP count-up animation has final value announced after animation completes: "[N] XP earned"
- Level-up announced: "Level up! Level [old] to level [new]"
- SIA message announced: "SIA says: [message text]"
- Share button announces: "Share achievement"
- Dismiss hint announced: "Tap anywhere to continue"
- Small win toast announced: "[Action name] complete. Plus [N] XP."
- Toast auto-dismiss duration extended to 5s when VoiceOver is active
- Confetti particles are purely decorative and hidden from accessibility tree (accessibilityElementsHidden)
- Stroke line is decorative and hidden from accessibility tree
- XP popup float is announced once then removed from accessibility tree
- Entrance animation delays dismiss affordance; VoiceOver users can dismiss immediately via escape gesture
- Focus order (big milestone): achievement badge -> XP counter -> achievement title -> SIA message -> share button -> dismiss (entire backdrop)
- Gesture alternatives: VoiceOver escape gesture (two-finger Z-scrub) dismisses overlay; swipe-up on toast dismisses early

---

## Cross-References

- **Navigates to**: Native share sheet via share button (returns to overlay after sharing), Explore Section [18] via subscription success "explore new features" CTA
- **Navigates from**: System trigger — any screen can trigger this overlay. Common triggers: Goal Detail (14) mission completion, Workout Detail (27) post-workout XP, Habits (38) streak milestone, Home Screen (12) action completion, any domain dashboard task completion, domain level-up (any screen where domain XP is earned), Subscription [23] after successful IAP purchase (subscription success variant)
- **Shared components with**: Home Screen (12) — activity feed uses same XP display style; RPG Character Screen (19) — level/XP bar uses same visual language; Goals List (13) — completion checkmark triggers XP popup; Achievement Gallery [71] — badge visual language shared
- **Patterns used**: Brand CTA Button style (for share button, adapted to secondary), Continuous Stroke Line (_shared-patterns.md — celebration is an approved use context)
- **Patterns established**: Full-Screen Celebration Overlay (backdrop + confetti + badge + staggered content entrance), XP Count-Up Animation (count from 0 with orange glow), Level-Up Bar Animation (fill + overflow + reset), Small Win Toast (slide-down notification bar with auto-dismiss), XP Popup Float (in-place floating "+NN XP" text at completion point), **Domain Level-Up Toast** (domain color dot + "[Domain] Level [N]" + "+25 XP" — toast format for per-domain level-ups), **Radar Vertex Pulse** (domain-colored glow ring expansion on radar chart vertex when stat increases), Motivation-Adapted Celebration (celebration intensity scales inversely with motivation tier), **Subscription Success Celebration** (gold-themed celebration with tier-specific messaging, "explore new features" CTA, no XP counter)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/celebration`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B13-F10 | critical | navigation | Implement overlay dismissal, return to trigger screen, native share flow, and queued celebration handling. |
| B13-F11 | major | accessibility | Announce the achievement, add a labeled dismiss action, trap/return focus, and honor reduced motion. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

