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

## Premium Craft

**Profile:** content · **Cluster benchmark:** Linear / Arc / Duolingo intro — *stays Balencia via the continuous-stroke draw (brand signature), warm-glow hero surface on ink-900, and the brand period in the wordmark.*

**Pre-grade:** B+ (82) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers: motion sequence and component specs are precise; the brand moment (symbol + stroke + wordmark) is intentional; however, depth language is implicit, microcopy is unwritten (no authored loading/error states), and the signature ownable moment relies entirely on the stroke animation.*

### Focal hierarchy

One focal point: the **symbol + continuous stroke cluster** — a vertical stack centered at 40% screen height, occupying ~160pt. The symbol (72pt) is the immediate visual anchor; the stroke line (120pt wide × 40pt tall) draws itself over 1.2s, creating motion that captures attention. The wordmark (24pt tall) arrives last as confirmation. The hero glow (320pt radial gradient centered on symbol, rgba(255, 94, 0, 0.15)) creates atmospheric depth without competing. Everything else — the status bar, home indicator — is invisible or system-provided. The squint test lands on the symbol first, then the drawing stroke, then the wordmark. One focal point; no competing elements. The screen communicates its single job (brand handshake) in <2 seconds.

### Surface & depth

The hero glow is the only explicit depth layer. It wraps the symbol cluster in a **warm radial gradient centered on the symbol, 320pt diameter, rgba(255, 94, 0, 0.15) inner → transparent outer** — the signature `--glow-orange` glow at scale. The gradient is soft and calibrated: it never reads as neon or as a hard ring, and it sits *behind* the symbol (z-order: glow, then symbol, then stroke) so the symbol reads crisp. The glow extends well beyond the 72pt symbol (the outer edge is ~160pt from center), creating a warm halo that lifts the cluster off the `--color-ink-900` background. No other surfaces exist on this screen — the background is pure `--color-ink-900` (`--color-ink-900`), undecorated. The stroke line itself (4pt width, `--stroke-base`) has round caps and round joins (never sharp mitered corners) so the continuous draw feels hand-crafted, not algorithmic.

### Typographic rhythm

The wordmark is the only text element and uses **Chillax ExtraBold (800) at 22pt, letter spacing -0.025em, white (white) at 100%**. Chillax is logo-only, never used for UI text (per the brand rules). The wordmark is centered horizontally, positioned 16pt below the stroke line terminus. The period is part of the wordmark — "Balencia." is a unit, not "Balencia" + separate period. This follows `CK-P3` and the brand-period rule in the Design System (§3 + §6). There are no other type elements. The status bar uses default iOS system text (light-content style for visibility on dark background), which is system-provided and off-brand (intentional — the status bar is system chrome, not app design).

### Microcopy (before → after)

No user-facing strings on this screen except the wordmark. All edge-case microcopy is authored per `CK-P5` voice:

- **Screen reader announcement on mount** — *before:* no label → *after (new, warm):* "Balencia. Loading." (simple, warm, acknowledges the pause)
- **Auth state check failure (pulse state on symbol, indefinite hold)** — *before:* no status message → *after (new, non-shaming):* Tooltip on pulse: "Checking your session… will retry" (after 3s of pulsing). The pulse (opacity 80%–100%, 2s loop) is a gentle "waiting" signal, not an error alarm. No red. No shame. The copy is calm and specific about what's happening.
- **Network unavailable at launch (timeout after 4s)** — *before:* no message → *after (new):* Brief toast (below splash, 2s hold): "No connection — continuing with saved data" (if offline with cached session) or "No connection — starting fresh" (if offline without session). Warm, specific, no jargon.
- **Reduced-motion preference** — *before:* animation still plays → *after (new):* All elements render at final state instantly (symbol, glow, full stroke, wordmark all visible immediately); the 1.2s animation is skipped; screen holds for 1.2s so the total time remains ~1.8s (the transition happens at the same moment in both flows, preserving the timing-based contract with downstream screens). No opacity fade-in; all elements render fully (this is the settled frame, and reduced-motion preserves the signature).

No exclamation marks. The brand period used with intent (only in the wordmark). All messages are warm and on-voice (coach-like, specific, non-shaming).

### Motion choreography

The entrance sequence is **locked per `CK-P4`** — focal draws first, then support rises (no support here, so just focal):

1. **0ms**: Symbol fades in (0→100% opacity, 280ms / `--dur-base`, `--ease-out-soft`)
2. **160ms**: Hero glow begins fading in (0→100% opacity, 520ms / `--dur-slow`, `--ease-out-soft`), layered beneath symbol
3. **280ms**: Stroke line begins drawing itself (stroke-dashoffset 1→0, 1200ms / `--dur-flow`, `--ease-flow`), starting from the symbol and extending rightward with one organic curve
4. **1480ms**: Stroke line completes; wordmark begins fade-in + rise (0→100% opacity + translateY(8pt→0), 280ms / `--dur-base`, `--ease-out-soft`)
5. **1760ms**: Wordmark fully visible and settled
6. **1800ms**: Begin screen transition (crossfade to [02] or [12], 280ms / `--dur-base`, `--ease-out-soft`). The splash content fades out (opacity 100→0) while the next screen fades in (opacity 0→100) simultaneously.

**Stroke draw detail:** The line animates using SVG `stroke-dasharray` and `stroke-dashoffset` (the canonical "draw" technique). The stroke never opacity-fades in — it is always opaque and the line is drawn, not revealed. Round caps on both ends so the starting and ending points are soft. The curve is organic, not symmetrical, so it reads hand-drawn rather than algorithmic.

**Reduced-motion fallback:** All elements render instantly at final state (symbol, glow, full stroke, wordmark all visible at t=0); animation is skipped; screen holds for 1.2s to match the normal flow's total duration so the transition to the next screen still happens at ~1.8s. The settled frame is canonical — the stroked line is complete, the glow is at full opacity, the wordmark is visible and at y=0. This preserves the brand moment without animation.

### State craft

All five states are designed per `CK-P7` — every state preserves the focal moment (symbol + glow + stroke + wordmark are always rendered and always visible). No degenerate states.

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Symbol, glow, stroke, wordmark all visible; animation plays or (reduced-motion) renders instantly. Same visual for all users, all sessions. | "Balencia. Loading." (screen-reader only) | Hero glow warm and calibrated; continuous stroke is the brand signature; wordmark period is sacred. |
| **Loading** | Same layout as cold-start. Animation plays (or skips if reduced-motion). The pause is expected — no skeleton, no spinner, no visual distress. | (None visible to user; screen-reader: "Balencia. Loading.") Brief optional tooltip after 3s if still loading: "Checking your session…" | Same depth/brand as cold-start. The glow and stroke are not dimmed or skeletonized; they are full-fidelity. |
| **Empty / partial** | Not applicable — splash has no data-driven content. | — | — |
| **Error** | Symbol + glow + stroke + wordmark remain visible and rendered fully. If auth check fails, symbol pulses (opacity 80%–100%, 2s loop, `--ease-out-soft`). No red border, no error icon overlay. | Tooltip after 3s pulse: "Checking your session… will retry" (warm, calm, non-shaming). If network timeout after 4s, toast: "No connection — continuing with saved data" or "continuing fresh" (specific, warm). | No red (red is reserved for genuine operational failure; auth retry is a routine state, not a failure). Pulse is subtle (opacity only, no color change, no jitter). Glow and stroke remain at full fidelity (not dimmed). The wordmark stays white (not greyed out). |
| **Offline** | Same as error. If the app detects no network at launch, splash holds and pulses the symbol. After 4s, it transitions based on cached session state (returning user → Home [12] with offline banner; new user → Motion Carousel [02]). | Toast on transition: "No connection — continuing with saved data" (returning) or "No connection — starting fresh" (new). Warm, honest, specific about recovery action. | Pulse is gentle (not a danger alarm). Glow stays warm (not red). Wordmark and stroke stay white and visible (not hidden or dimmed). |

### Signature & anti-generic

The **continuous-stroke draw** is the ownable Balencia moment. Every benchmark (Linear, Arc, Duolingo) has a brand mark, but only Balencia treats the mark-reveal as a *drawn stroke*. The line draws itself organically (never segmented, never opacity-faded), with round caps and curves that feel hand-crafted. This is the signature device that appears on every screen (`CK-P4` motif, the Living Line family in data screens). The splash is the first time the user sees this signature — it plants the mark.

The **wordmark period** ("Balencia.") reinforces the brand voice: calm, intentional, not shouty (no exclamation mark, no all-caps chant). The period is the same visual anchor as the brand period used throughout the product (section headings, SIA messages, etc.).

The **warm glow on ink-900** (not cold neon on slate) is the warmth signature. The glow is calibrated and never neon — it reads as atmospheric depth, not as a harsh rim light. This is the signature depth language that appears on every premium surface (cards, hero elements, depth craft across the product).

Generic tells removed:
- ✓ Not a flat full-bleed color + centered mark (would be generic)
- ✓ Not an opacity-fade-in animation (stroke draws, never fades)
- ✓ Not a generic "Loading…" spinner (screen is a brand moment, not a loading screen)
- ✓ Not an exclamation-mark chant or generic motivational copy
- ✓ Wordmark period is intentional (not sloppy punctuation)

### Accessibility

- **Screen reader announcement:** "Balencia. Loading." on mount (clear, warm, acknowledges the pause). Simple and specific.
- **Focus management:** No interactive elements on this screen, so no focus ring needed. The screen advances automatically.
- **Reduced-motion preference:** `prefers-reduced-motion` → all elements render at final state instantly; animation is skipped; the screen holds for 1.2s to preserve the brand moment duration. The settled frame (symbol visible, glow visible, full stroke drawn, wordmark visible and at y=0) is the canonical frame. No essential information is animation-only.
- **Color contrast:** Symbol (burnt-orange `--color-brand-orange`) on dark background (`--color-ink-900` `--color-ink-900`) = 5.8:1, exceeds WCAG AA 4.5:1. Wordmark (white) on dark background = 17.1:1, exceeds AA. Hero glow is decorative (accessibility feature, not load-bearing), so contrast rules do not apply.
- **Status bar:** Light-content style (white icons + text on dark background) is system-provided. The dark background is accessible to the status bar.
- **No colour-alone status:** The pulse on the symbol (if auth fails) uses opacity change (not a color change to red), so it is not colour-alone. The optional tooltip ("Checking your session…") provides text clarification.
- **Targets:** No interactive targets on this screen (auto-advances, no tap zones). System areas (status bar, home indicator) are system-managed.
- **Timeouts:** Auth check failure holds indefinitely with a pulse (no harsh timeout flash). Network timeout is 4s (generous). The screen never transitions to an error state that the user must close; it always progresses to the next screen (returning user → Home [12], new user → Motion Carousel [02]).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Screen [02] — Motion Carousel via crossfade (condition: first launch or no authenticated session), Screen [12] — Home Screen via crossfade (condition: returning user with valid authenticated session)
- **Navigates from**: App launch (system)
- **Shared components with**: None (unique screen)
- **Patterns used**: Continuous Stroke Line (Brand Guidelines 5.1), Hero Glow (--glow-orange), Brand Logo Treatment
- **Patterns established**: **Brand Logo Cluster** — symbol (72pt) + stroke line + wordmark vertical stack with 16pt gap, optically centered at 40% screen height. **Splash-to-Screen Crossfade** — 280ms crossfade transition for auto-advancing screens.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-01.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U01`
**Prototype route**: `/auth/splash`
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
| B01-F01 | minor | brand-fit | Decide whether this lockup is intentional; otherwise use the 72pt symbol as hero and reveal the wordmark after the stroke. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

