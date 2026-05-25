# Screen Design: App Rating

**Screen**: 69 of 73
**File**: 69-app-rating.md
**Register**: System Mode (brand-orange accent)
**Primary action**: rate the app
**Tab**: None (modal overlay, z-40)
**Navigation**: System-triggered after positive events (streak milestone, level-up, quest completion, habit streak). Bottom sheet overlay on any screen. Dismissed by drag-down, "not now", or completion. Never interrupts an active user flow — waits for a natural pause.

---

## Purpose

The App Rating screen is a non-blocking modal bottom sheet that asks satisfied users to rate Balencia on the App Store. It uses a "happy path first" pattern: the initial question ("Enjoying Balencia?") is deliberately warm and personal, framed as a conversation rather than a demand. Users who tap 4-5 stars are routed to the native App Store review prompt; users who tap 1-3 stars are routed to an in-app feedback form so their concerns are captured privately rather than becoming public negative reviews. The screen is a critical growth lever — App Store ratings directly affect discovery and conversion — but it must never feel transactional or interrupt the user's momentum. The trigger logic is carefully gated: the prompt appears only after genuinely positive moments (streak milestones, level-ups, quest completions, habit streaks of 5+ days), never during low-motivation states, never mid-flow, and at most once every 60 days. SIA's avatar appears alongside the question to make the ask feel like it comes from the user's AI coach, not from a faceless system dialog.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Satisfaction question — "Enjoying Balencia?" with SIA avatar, the emotional hook
2. Star rating row — 5 interactive stars, the primary interaction point
3. Positive path (4-5 stars): thank-you message + "Rate on App Store" CTA
4. Negative path (1-3 stars): empathetic message + feedback text area + "Submit" CTA
5. "Not now" dismissal link — low-pressure exit (30-day cooldown)
6. "Don't ask again" permanent suppression link — smallest, lowest priority

**User flow**:
- **Arrives from**: System trigger after positive event on any screen. The bottom sheet overlays the current screen without navigating away from it. Trigger events: streak milestone reached (7, 14, 30, 60, 90, 180, 365 days) on Streak Details [59] or Celebration Overlay [42], level-up on RPG Character [19] or Celebration Overlay [42], quest completion on Quests/Challenges [46], habit streak of 5+ days on Habits [38].
- **Primary exit (positive path)**: Star rating 4-5 → "Rate on App Store" CTA → native StoreKit review prompt → sheet auto-dismisses. Rating event recorded, 60-day cooldown starts.
- **Primary exit (negative path)**: Star rating 1-3 → feedback text area → "Submit feedback" CTA → confirmation message → sheet auto-dismisses. Feedback sent to backend, 60-day cooldown starts.
- **Dismissal exits**: "Not now" link → sheet dismisses, 30-day cooldown starts. "Don't ask again" link → sheet dismisses, permanent suppression flag set. Drag-down on handle → same as "Not now". Backdrop tap → same as "Not now".

---

## Layout

**Scroll behavior**: None (fixed-height bottom sheet; feedback text area scrolls internally if content overflows)
**Tab bar visible**: Yes (visible behind the semi-transparent backdrop on the underlying screen)

### ASCII Wireframe — Initial State (Satisfaction Question)

```
┌─────────────────────────────────────┐
│                                     │
│      [underlying screen content     │
│       visible but dimmed behind     │
│       ink-900 at 60% backdrop]      │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
├═════════════════════════════════════┤  ← Sheet top (--r-xl top corners)
│            ━━━━━━━━                 │  ← Drag handle (36pt x 4pt)
│                                     │  ← 24pt gap
│         [SIA avatar]                │  ← SIA avatar (48pt circle)
│                                     │  ← 12pt gap
│      Enjoying Balencia?             │  ← Question (22pt Bold)
│                                     │  ← 8pt gap
│   We'd love to hear how you feel.   │  ← Subtitle (15pt Regular)
│                                     │  ← 24pt gap
│     ☆     ☆     ☆     ☆     ☆     │  ← Star rating row (5 stars)
│     1     2     3     4     5       │  ← Star labels (hidden, a11y)
│                                     │  ← 32pt gap
│          not now                    │  ← "Not now" link (14pt)
│                                     │  ← 12pt gap
│        don't ask again              │  ← "Don't ask again" (12pt)
│                                     │  ← 16pt gap
│                                     │  ← Safe area (34pt)
└─────────────────────────────────────┘
```

### ASCII Wireframe — Positive Path (4-5 Stars Selected)

```
├═════════════════════════════════════┤
│            ━━━━━━━━                 │  ← Drag handle
│                                     │  ← 24pt gap
│         [SIA avatar]                │  ← SIA avatar (48pt, smiling)
│                                     │  ← 12pt gap
│          Thank you!                 │  ← Heading (22pt Bold)
│                                     │  ← 8pt gap
│  Your support means everything.     │  ← Subtitle (15pt Regular)
│  A quick review helps others        │
│  find Balencia too.                 │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │      Rate on App Store       │   │  ← Primary CTA (orange pill)
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│          maybe later                │  ← Dismiss link (14pt)
│                                     │  ← 16pt gap
│                                     │  ← Safe area (34pt)
└─────────────────────────────────────┘
```

### ASCII Wireframe — Negative Path (1-3 Stars Selected)

```
├═════════════════════════════════════┤
│            ━━━━━━━━                 │  ← Drag handle
│                                     │  ← 24pt gap
│         [SIA avatar]                │  ← SIA avatar (48pt, listening)
│                                     │  ← 12pt gap
│        We hear you.                 │  ← Heading (22pt Bold)
│                                     │  ← 8pt gap
│  Tell us what we can improve —      │  ← Subtitle (15pt Regular)
│  your feedback shapes Balencia.     │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  What could be better?       │   │  ← Feedback text area
│  │                              │   │     (ink-brown-800 bg, --r-md)
│  │                              │   │     120pt height, 14pt Regular
│  │                              │   │     200 char limit
│  └─────────────────────────────┘   │
│  178 / 200                          │  ← Character count (12pt)
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │      Submit feedback         │   │  ← Primary CTA (orange pill)
│  └─────────────────────────────┘   │
│                                     │  ← 12pt gap
│            skip                     │  ← Dismiss link (14pt)
│                                     │  ← 16pt gap
│                                     │  ← Safe area (34pt)
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Backdrop overlay** — full screen, ink-900 at 60%
   - Purpose: Dim underlying content, indicate modal context
   - Tappable to dismiss (same as "not now")

2. **Bottom sheet container** — variable height (~380pt initial, ~340pt positive, ~440pt negative)
   - Purpose: Houses all rating prompt content
   - ink-900 background, --r-xl (28pt) top-left and top-right corners

3. **Drag handle** — 36pt x 4pt
   - Purpose: Visual affordance for drag-to-dismiss

4. **SIA avatar** — 48pt circle
   - Purpose: Personalizes the ask as coming from the user's AI coach

5. **Satisfaction question / response heading** — 22pt Sora Bold
   - Purpose: Emotional hook or response to rating

6. **Subtitle text** — 15pt Sora Regular
   - Purpose: Context and encouragement

7. **Star rating row** — 5 stars, 44pt each
   - Purpose: The primary interaction — captures user sentiment

8. **Positive path CTA** — "Rate on App Store" pill button
   - Purpose: Routes satisfied users to native App Store review

9. **Negative path feedback area** — text area + submit CTA
   - Purpose: Captures constructive feedback privately

10. **Dismissal links** — "not now" and "don't ask again"
    - Purpose: Non-coercive exit options with different cooldowns

---

## Components

### Backdrop Overlay
- **Purpose**: Dims the underlying screen to focus attention on the rating prompt. Establishes modal context without fully blocking the underlying content.
- **Data source**: None (system UI)
- **Visual treatment**: Full screen, ink-900 (#0A0A0F) at 60% opacity. Fades in with sheet entry animation. No blur (bottom sheets do not use backdrop-blur per shared patterns — only sticky headers use blur).
- **Gestures**: Tap anywhere on backdrop dismisses sheet (same behavior as "not now" — starts 30-day cooldown).
- **Size**: Full screen

### Bottom Sheet Container
- **Purpose**: Houses all rating prompt content. Uses the standard bottom sheet pattern but at a fixed (non-scrollable) height since content is compact.
- **Data source**: None (system UI)
- **Visual treatment**: ink-900 (#0A0A0F) background. --r-xl (28pt) on top-left and top-right corners, square bottom. No border (bottom sheets sit against the screen bottom edge). --shadow-3 (high elevation: 0 32pt 80pt rgba(33, 16, 8, 0.28)) for strong lift from backdrop. Sheet height varies by state: ~380pt (initial question), ~340pt (positive path), ~440pt (negative path with text area). Minimum sheet width: full screen width.
- **Content**: All child components below.
- **Gestures**: Drag down on sheet body (not just handle) to dismiss. Velocity-based threshold: if downward velocity > 500pt/s, dismiss regardless of position. If released below 50% of sheet height, dismiss. Otherwise, spring back to full height.
- **Size**: Full screen width x variable height

### Sheet Header (Grab Bar)
- **Purpose**: Visual drag affordance indicating the sheet can be pulled down to dismiss.
- **Data source**: None
- **Visual treatment**: 36pt wide x 4pt tall pill shape. --r-pill (999pt). Background: white at 20%. Centered horizontally. 12pt below sheet top edge.
- **Gestures**: Drag down to dismiss (handled by sheet container gesture recognizer). The handle itself is not a discrete tap target — the entire sheet body participates in the drag gesture.
- **Size**: 36pt x 4pt

### SIA Avatar
- **Purpose**: Personalizes the rating prompt. The ask feels like it comes from SIA (the user's AI coach) rather than a generic system dialog. This dramatically improves engagement compared to a faceless "rate us" modal.
- **Data source**: Static asset (SIA avatar image), or the current SIA avatar variant if the user has unlocked custom variants.
- **Visual treatment**: 48pt circle, --r-pill. SIA avatar image centered and cropped. 1.5pt border in royal-purple (#7F24FF) at 60% — subtle AI indicator consistent with SIA avatar treatment across the app. Centered horizontally. 24pt below drag handle.
- **Variants**:
  - Initial state: neutral/warm SIA expression
  - Positive path (4-5 stars): SIA expression shifts to happy/celebratory (if animated variant available, otherwise same)
  - Negative path (1-3 stars): SIA expression shifts to listening/empathetic (if animated variant available, otherwise same)
- **Gestures**: Not tappable (decorative element in this context).
- **Size**: 48pt x 48pt

### Satisfaction Question ("Enjoying Balencia?")
- **Purpose**: The emotional hook. A warm, personal question that feels conversational rather than transactional. Deliberately avoids phrases like "rate us" or "leave a review" at this stage — the user's emotional response comes first.
- **Data source**: Static copy (localized)
- **Visual treatment**:
  - Question text: "Enjoying Balencia?" — 22pt Sora Bold, white at 100%, center-aligned. 12pt below SIA avatar.
  - Subtitle: "We'd love to hear how you feel." — 15pt Sora Regular, white at 60%, center-aligned. 8pt below question text. Single line on most devices, wraps gracefully on narrow screens (320pt width).
- **Variants**: This component is replaced entirely when the user selects a star rating:
  - 4-5 stars: replaced by positive path header (see Positive Path component)
  - 1-3 stars: replaced by negative path header (see Negative Path component)
- **Gestures**: None (read-only)
- **Size**: Full sheet width minus 32pt (16pt margins) x ~64pt

### Star Rating Row
- **Purpose**: The primary interaction. Five large, accessible star targets that capture user sentiment. Stars are intentionally oversized (44pt touch targets) to make the interaction feel effortless and satisfying.
- **Data source**: Local state — selected_rating (0-5, 0 = none selected)
- **Visual treatment**: Row of 5 stars, horizontally centered, 12pt gap between each star. 24pt below subtitle text.
  - Star icon: 32pt, custom star shape (not system SF Symbol — branded Balencia star with slightly rounded points for warmth).
  - Unselected star: white at 20% fill, white at 10% stroke (1.5pt). Reads as "empty" but not invisible.
  - Selected star (fill animation): brand-orange (#FF5E00) fill. On tap, fills from center outward (radial fill, 160ms). All stars up to and including the tapped star fill simultaneously with a 30ms stagger (left to right). Stars animate to selected: scale(1.0→1.15→1.0) bounce with 280ms duration.
  - Hover/press preview: if user drags across stars (without lifting), stars temporarily fill as the finger position suggests. Committed on release.
- **Accessibility**:
  - Each star is an independent accessible element: "1 star", "2 stars", ... "5 stars".
  - VoiceOver: "Rate 1 out of 5 stars" through "Rate 5 out of 5 stars". Selected state announced.
  - Minimum touch target per star: 44pt x 44pt (the 32pt icon has 6pt inset on each side within the 44pt target).
- **Behavior on selection**:
  - 4-5 stars: after 400ms delay (allows user to see their selection), sheet transitions to positive path with a crossfade (280ms).
  - 1-3 stars: after 400ms delay, sheet transitions to negative path with a crossfade (280ms).
  - Stars remain visible during transition (at selected state) and fade out as new content fades in.
- **Gestures**: Tap individual star to select rating. Drag/slide across stars to preview rating (committed on touch-up). Re-tap the same star to deselect (returns to initial state).
- **Size**: (5 x 44pt) + (4 x 12pt) = 268pt wide x 44pt tall

### Positive Path (4-5 Stars): Thank You + App Store CTA
- **Purpose**: Routes satisfied users to the App Store review flow. The "thank you" message creates a moment of mutual appreciation before the CTA, which improves follow-through compared to immediately launching the store prompt.
- **Data source**: Local state — triggers StoreKit requestReview() on CTA tap
- **Visual treatment**:
  - Heading: "Thank you!" — 22pt Sora Bold, white at 100%, center-aligned. Replaces the satisfaction question. 12pt below SIA avatar.
  - Subtitle: "Your support means everything. A quick review helps others find Balencia too." — 15pt Sora Regular, white at 60%, center-aligned. 8pt below heading. Max 2 lines.
  - CTA button: "Rate on App Store" — full sheet content width (screen width minus 64pt, i.e. 16pt sheet margin + 16pt button inset each side). Height: 52pt. Background: brand-orange (#FF5E00). Text: 16pt Sora Semibold, white, center-aligned. --r-pill (999pt). 24pt below subtitle. Subtle orange glow (--glow-orange) on default state to draw attention.
  - Dismiss link: "maybe later" — 14pt Sora Regular, white at 40%, center-aligned, 44pt touch target height (text vertically centered). 16pt below CTA. Tap behavior same as "not now" (30-day cooldown).
- **Behavior**:
  - CTA tap: calls StoreKit SKStoreReviewController.requestReview() (iOS) or Google Play In-App Review API (Android). Sheet dismisses after a brief delay (200ms) to allow the native prompt to appear above it. Records rating_prompted event with timestamp. Sets 60-day cooldown.
  - If native review prompt is unavailable (e.g., already shown by OS, or OS rate-limit reached): open App Store product page as fallback via deep link. Sheet dismisses.
- **Gestures**: Tap CTA to launch App Store review. Tap "maybe later" to dismiss with 30-day cooldown.
- **Size**: Full sheet width x ~280pt (heading through dismiss link)

### Negative Path (1-3 Stars): Feedback Form
- **Purpose**: Captures constructive feedback privately before the user considers leaving a public negative review. This is the critical "save" moment — by providing an outlet for frustration inside the app, we reduce the chance of a 1-star App Store review. The tone is empathetic ("We hear you") rather than defensive.
- **Data source**: Local state — feedback_text (string, max 200 chars). POST /api/feedback/app-rating — { rating: number, feedback: string, trigger_event: string, screen_context: string }
- **Visual treatment**:
  - Heading: "We hear you." — 22pt Sora Bold, white at 100%, center-aligned. 12pt below SIA avatar.
  - Subtitle: "Tell us what we can improve — your feedback shapes Balencia." — 15pt Sora Regular, white at 60%, center-aligned. 8pt below heading. Max 2 lines.
  - Feedback text area:
    - Full sheet content width (screen width minus 64pt). Height: 120pt (fixed, content scrolls internally).
    - Background: ink-brown-800 (#211008). Border: 1pt white at 8%. --r-md (14pt).
    - Placeholder: "What could be better?" — 14pt Sora Regular, white at 25%.
    - Input text: 14pt Sora Regular, white at 90%. Left-aligned, 16pt internal padding on all sides.
    - Cursor color: brand-orange (#FF5E00).
    - Focus state: border changes to brand-orange (#FF5E00) at 60%, 1.5pt width.
    - Character counter: right-aligned below text area, 4pt gap. "[count] / 200" — 12pt Sora Regular, white at 30%. When count >= 180: brand-orange (#FF5E00). When count = 200: error-red (#F44336).
    - 16pt below subtitle.
  - CTA button: "Submit feedback" — same dimensions and style as positive path CTA (full content width, 52pt height, orange pill). 16pt below character counter.
  - Dismiss link: "skip" — 14pt Sora Regular, white at 40%, center-aligned, 44pt touch target. 12pt below CTA. Dismisses sheet with 60-day cooldown (same as submitting — user engaged with the prompt either way).
- **Behavior**:
  - CTA enabled only when feedback_text.trim().length >= 10 characters. Disabled state at 0-9 characters (40% opacity).
  - On submit: POST feedback to backend. Show loading spinner in CTA (white, replaces text). On success: CTA transitions to green (#34A853) with checkmark icon (280ms), heading changes to "Thanks for sharing." (crossfade 280ms), sheet auto-dismisses after 1200ms. Records feedback_submitted event. Sets 60-day cooldown.
  - On submit error: CTA briefly flashes error-red border (400ms), text changes to "Try again" (auto-reverts after 2s). Toast appears: "Couldn't send feedback. We'll try again later." — standard error toast pattern.
  - Keyboard behavior: when text area gains focus, sheet slides up to accommodate keyboard. Content above text area (avatar, heading, subtitle) compresses or scrolls off the top of the sheet. CTA and dismiss link remain visible above the keyboard.
- **Gestures**: Tap text area to focus and open keyboard. Tap CTA to submit. Tap "skip" to dismiss. Drag down to dismiss (same as skip).
- **Size**: Full sheet width x ~400pt (before keyboard), ~320pt visible above keyboard

### "Not Now" Link
- **Purpose**: Low-pressure dismissal. The language "not now" implies the user might be asked again someday — it is honest about the future re-prompt without being pushy. Starts a 30-day cooldown before the prompt can appear again.
- **Data source**: Writes to local user preferences: last_rating_dismissed_at = now, rating_cooldown_days = 30
- **Visual treatment**: "not now" — 14pt Sora Regular, white at 40%, center-aligned. 44pt touch target height (text vertically centered within target area). 32pt below star rating row in initial state. Not visible on positive/negative path screens (replaced by path-specific dismiss links).
- **Gestures**: Tap to dismiss sheet with 30-day cooldown.
- **Size**: Text width x 44pt touch target

### "Don't Ask Again" Link
- **Purpose**: Permanent opt-out. Respects user autonomy — if they never want to be asked, they should have a clear way to say so. Intentionally smaller and lower-priority than "not now" to avoid accidental taps, but not hidden.
- **Data source**: Writes to local user preferences: rating_permanently_suppressed = true. Also sends to backend: PATCH /api/users/preferences — { app_rating_suppressed: true }
- **Visual treatment**: "don't ask again" — 12pt Sora Regular, white at 30%, center-aligned. 44pt touch target height. 12pt below "not now" link.
- **Confirmation**: Tapping "don't ask again" does NOT immediately suppress. Instead, the text animates to "are you sure? tap again to confirm" — 12pt Sora Regular, white at 50%, crossfade 200ms. A second tap within 5 seconds confirms permanent suppression. If no second tap within 5s, text reverts to "don't ask again". This prevents accidental permanent suppression.
- **Gestures**: Tap once to reveal confirmation, tap again within 5s to confirm.
- **Size**: Text width x 44pt touch target

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Backdrop overlay | #0A0A0F at 60% | ink-900 | Dims underlying screen |
| Sheet background | #0A0A0F | ink-900 | Base sheet surface |
| Sheet shadow | rgba(33, 16, 8, 0.28) | --shadow-3 | High elevation |
| Drag handle | white at 20% | -- | Standard sheet handle |
| SIA avatar border | #7F24FF at 60% | royal-purple | 10% role -- AI indicator |
| Question text | white 100% | -- | Primary text |
| Subtitle text | white at 60% | -- | Secondary text |
| Star unselected fill | white at 20% | -- | Empty star body |
| Star unselected stroke | white at 10% | -- | Empty star outline |
| Star selected fill | #FF5E00 | brand-orange | 60% role -- primary interaction |
| Star press glow | rgba(255, 94, 0, 0.25) | glow-orange | Feedback on tap |
| Positive heading text | white 100% | -- | Primary text |
| "Rate on App Store" CTA bg | #FF5E00 | brand-orange | 60% role -- primary action |
| "Rate on App Store" CTA text | white 100% | -- | Button label |
| CTA glow | rgba(255, 94, 0, 0.45) | --glow-orange | Subtle draw-attention glow |
| "maybe later" link | white at 40% | -- | Low-priority dismissal |
| Negative heading text | white 100% | -- | Primary text |
| Feedback text area bg | #211008 | ink-brown-800 | Input surface |
| Feedback text area border | white at 8% | -- | Default border |
| Feedback text area focus border | #FF5E00 at 60% | brand-orange | Focus state |
| Feedback placeholder text | white at 25% | -- | Placeholder |
| Feedback input text | white at 90% | -- | User input |
| Feedback cursor | #FF5E00 | brand-orange | Text cursor |
| Character count (normal) | white at 30% | -- | Below limit |
| Character count (warning) | #FF5E00 | brand-orange | >= 180 chars |
| Character count (limit) | #F44336 | error-red | = 200 chars |
| "Submit feedback" CTA bg | #FF5E00 | brand-orange | 60% role -- primary action |
| Submit success state | #34A853 | forest-green | 30% role -- success |
| Submit error flash | #F44336 | error-red | Error state |
| "not now" link | white at 40% | -- | Low-priority dismissal |
| "don't ask again" link | white at 30% | -- | Lowest-priority option |
| "don't ask again" confirm | white at 50% | -- | Confirmation state |

**60/30/10 verification**: Orange dominates through star selected fill, both CTA button backgrounds, CTA glow, text area focus border, feedback cursor, and character count warning — all in the "primary action / brand accent" role (60%). Green appears only on the submit-success state (forest-green checkmark and CTA background transition) — in the "completion/success" role (30%). Purple appears only on the SIA avatar border — in the "AI indicator" role (10%). Error red appears only on character limit reached and submission failure — functional, not decorative. Domain colors absent (this screen is domain-agnostic). No gradient usage. Ratio holds.

---

## Interaction States

### Star (Individual, 8-State)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | 32pt star, white at 20% fill, white at 10% stroke (1.5pt) | -- |
| Pressed | scale(0.90), fill brightens to white at 30% | Light impact |
| Selected | brand-orange (#FF5E00) fill, scale bounce (1.0→1.15→1.0, 280ms), radial fill animation from center (160ms) | Medium impact |
| Focus-visible | 2pt orange ring, offset 3pt from star edge | -- |
| Disabled | N/A (stars are always interactive once sheet is visible) | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Drag-over (finger hovering) | Temporarily fills orange at 60% opacity, scale(1.05) — commits on release | -- |

### "Rate on App Store" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) fill, white text, --r-pill, subtle --glow-orange | -- |
| Pressed | Darker orange (#E05500), scale(0.97), glow dims | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A (always enabled when visible) | -- |
| Loading | White spinner (20pt) replaces text, orange fill persists | -- |
| Error | N/A (failure handled by fallback to App Store URL) | -- |
| Success | Green (#34A853) fill, white checkmark icon, --glow-green (600ms) | Success notification |

### "Submit Feedback" CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) fill, white text, --r-pill | -- |
| Pressed | Darker orange (#E05500), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (feedback text < 10 chars) | -- |
| Loading | White spinner (20pt) replaces text | -- |
| Error | Error-red (#F44336) border flash (400ms), text briefly "Try again" | Error notification |
| Success | Green (#34A853) fill, white checkmark icon (280ms transition), --glow-green | Success notification |

### Feedback Text Area
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white at 8% border, placeholder visible | -- |
| Focused | Border changes to orange (#FF5E00) at 60%, 1.5pt width, cursor visible | -- |
| Filled | Input text white at 90%, placeholder hidden | -- |
| Focus-visible | 2pt orange ring, offset 2pt (keyboard-focus for accessibility) | -- |
| Disabled | N/A | -- |
| Loading | N/A (text area is local, not loading from API) | -- |
| Error | If submission fails, text area border flashes error-red (#F44336) for 400ms | -- |
| Character limit | Border pulses error-red (#F44336) briefly when 200th char typed, input stops accepting | Light impact |

### "Not Now" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 40% text, 14pt Sora Regular | -- |
| Pressed | white at 60% text, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring | -- |
| Disabled | N/A | -- |

### "Don't Ask Again" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 30% text, 12pt Sora Regular | -- |
| Pressed | white at 50% text, scale(0.97) | Light impact |
| Awaiting confirmation | Text changes to "are you sure? tap again to confirm", white at 50%, crossfade 200ms | -- |
| Confirmed | Text changes to "got it — we won't ask again", white at 40%, then sheet dismisses after 800ms | Light impact |
| Focus-visible | 2pt orange ring | -- |

### "Maybe Later" / "Skip" Dismiss Links
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 40% text, 14pt Sora Regular | -- |
| Pressed | white at 60% text, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring | -- |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Backdrop overlay | Dismiss sheet (30-day cooldown, same as "not now") |
| Drag down | Sheet body / drag handle | Dismiss sheet (velocity > 500pt/s or released below 50% height = dismiss; otherwise spring back). 30-day cooldown. |
| Tap | Individual star (1-5) | Select rating. Stars up to tapped index fill orange. After 400ms, transitions to positive (4-5) or negative (1-3) path. |
| Drag/slide | Across star row | Preview selection — stars fill/unfill as finger moves. Committed on touch-up. |
| Tap | "Rate on App Store" CTA | Launch StoreKit review prompt (iOS) or Google Play In-App Review (Android). 60-day cooldown. Sheet dismisses. |
| Tap | "Submit feedback" CTA | POST feedback to backend. On success, sheet auto-dismisses after 1200ms. 60-day cooldown. |
| Tap | Feedback text area | Focus text area, open keyboard. Sheet slides up to accommodate keyboard. |
| Tap | "not now" link | Dismiss sheet. 30-day cooldown. |
| Tap | "don't ask again" link (first) | Reveal confirmation text. |
| Tap | "don't ask again" link (second, within 5s) | Permanently suppress rating prompt. Sheet dismisses. |
| Tap | "maybe later" / "skip" link | Dismiss sheet. 30/60-day cooldown respectively. |

### Haptic Feedback Points
- Star tap (any): medium impact (stronger than typical light impact — this is the key interaction)
- Star drag-and-release: medium impact on commit
- "Rate on App Store" CTA tap: light impact
- "Submit feedback" CTA tap: light impact
- Feedback submitted successfully: success notification
- Feedback submission failed: error notification
- "not now" tap: light impact
- "don't ask again" first tap: light impact
- "don't ask again" confirmed: light impact
- Sheet drag dismiss: light impact on release
- Character limit reached (200): light impact (brief tactile "stop")

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Backdrop | Sheet appears | Opacity 0→60% | 280ms | ease-out-soft |
| Sheet container | System trigger | Slides up from bottom (translateY(100%→0)) | 520ms | ease-flow |
| Drag handle | Sheet appears | Opacity 0→1, 80ms delay after sheet starts | 160ms | ease-out-soft |
| SIA avatar | Sheet settled | Scale(0.8→1.0) + fade-in, 80ms delay after sheet settles | 280ms | ease-out-soft |
| Question text | Sheet settled | Fade-in + translateY(8→0), 120ms delay after avatar | 280ms | ease-out-soft |
| Subtitle text | Sheet settled | Fade-in + translateY(8→0), 40ms after question | 280ms | ease-out-soft |
| Star row | Sheet settled | Staggered fade-in per star, 40ms delay between each (left to right), 200ms after subtitle | 280ms each | ease-out-soft |
| Star select (fill) | Tap | Radial fill from center outward (orange spreads from tap point) | 160ms | ease-out-soft |
| Star select (bounce) | Tap | scale(1.0→1.15→1.0) spring overshoot | 280ms | ease-flow |
| Stars stagger fill | Tap star N | Stars 1 through N fill with 30ms stagger (left to right) | 30ms x N + 160ms | ease-out-soft |
| Transition to positive path | 4-5 star selected | Crossfade: question/stars fade out (160ms), positive content fades in + translateY(8→0) (280ms). Sheet height animates to new size. | 440ms total | ease-flow |
| Transition to negative path | 1-3 star selected | Crossfade: question/stars fade out (160ms), negative content fades in + translateY(8→0) (280ms). Sheet height animates to new size. | 440ms total | ease-flow |
| SIA avatar expression | Path transition | Morph to new expression (scale pulse 1.0→1.05→1.0 + crossfade expression) | 280ms | ease-out-soft |
| CTA button | Path visible | Fade-in + translateY(12→0), 160ms after heading text | 280ms | ease-out-soft |
| Feedback text area | Negative path visible | Fade-in + translateY(12→0), 80ms after heading | 280ms | ease-out-soft |
| Keyboard accommodation | Text area focus | Sheet translateY upward to keep CTA above keyboard | 280ms | ease-out-soft |
| Submit success | POST success | CTA bg orange→green (200ms), text→checkmark icon (crossfade 160ms), heading→"Thanks for sharing." (crossfade 280ms) | 280ms | ease-flow |
| Sheet dismiss (success) | After success animation | Sheet slides down (translateY(0→100%)) + backdrop fades (60%→0%) | 280ms | ease-out-soft |
| Sheet dismiss (drag) | Drag below threshold / velocity | Sheet continues translateY to bottom + backdrop fades | 280ms | ease-out-soft |
| Sheet dismiss (tap/link) | "not now" / backdrop tap | Sheet slides down + backdrop fades | 280ms | ease-out-soft |
| Sheet spring back | Drag released above threshold | Sheet springs back to full height (translateY(current→0)) | 320ms | ease-flow (spring) |
| "Don't ask again" confirm text | First tap | Crossfade old text → confirmation text | 200ms | ease-out-soft |
| "Don't ask again" revert | 5s timeout without second tap | Crossfade confirmation → original text | 200ms | ease-out-soft |

**Screen transition**:
- **Enter**: Sheet slides up from bottom over the current screen (520ms, ease-flow). Backdrop fades in simultaneously. Content stagger begins after sheet reaches full height.
- **Exit (all dismiss paths)**: Sheet slides down (280ms, ease-out-soft), backdrop fades out. Underlying screen content returns to full brightness. No navigation change — the user remains on whatever screen they were viewing.

---

## Empty States

N/A — This screen is a system-triggered modal that only appears when triggered by qualifying events. There is no "empty" version of the rating prompt. If no qualifying event has occurred, the sheet never appears. The sheet always has content (question, stars, and dismissal options).

---

## Error Handling

### Feedback Submission Failure
- **Trigger**: POST /api/feedback/app-rating returns error (network failure, server error, timeout)
- **User sees**: "Submit feedback" CTA briefly flashes error-red (#F44336) border (400ms), button text changes to "Try again" for 2 seconds, then reverts to "Submit feedback". Standard error toast appears at top of sheet: "Couldn't send feedback. We'll try again later." — 14pt Sora Regular, white, error-red left border accent, auto-dismiss after 4 seconds.
- **User's feedback text is preserved** in the text area — they do not lose their input.
- **Retry**: User can tap "Submit feedback" again. Maximum 3 retries, then CTA text changes to "We'll save this for later" and the feedback is queued locally for retry when connectivity returns. Sheet dismisses normally, 60-day cooldown still applies (the user made an effort to engage).

### App Store Not Reachable
- **Trigger**: StoreKit requestReview() fails or is unavailable (OS rate-limited the native prompt, device offline, or App Store not available)
- **Fallback**: Open the Balencia App Store product page via deep link (itms-apps://). If that also fails (no network), show a brief toast: "We'll remind you next time you're online." Sheet dismisses, 30-day cooldown (shorter than normal since the user wanted to rate but couldn't).
- **No error state shown on the CTA itself** — the user sees the sheet dismiss naturally.

### Trigger Event Not Recorded
- **Trigger**: The system attempts to record the rating_prompted event but the API call fails
- **Behavior**: Silent failure. The prompt still appears and functions normally. Cooldown is set locally regardless. The event is queued for retry. This is a backend analytics concern, not a user-facing issue.

### Double-Trigger Prevention
- **Trigger**: Two qualifying events fire in rapid succession (e.g., streak milestone and level-up from the same action)
- **Behavior**: The trigger system uses a debounce of 2 seconds. Only the first qualifying event within a 2-second window triggers the prompt. The prompt checks local cooldown state before presenting — if it was already shown (even milliseconds ago), it will not appear again.

---

## Motivation Adaptation

This screen is **never shown during a low-motivation state**. The trigger logic explicitly checks the user's current motivation level (as determined by SIA's motivation model) before presenting the rating prompt. The reasoning is straightforward: asking someone who is struggling to rate the app is tone-deaf at best and relationship-damaging at worst.

### Low Motivation (prompt suppressed entirely)
- The rating prompt does NOT appear, regardless of qualifying events.
- Even if a streak milestone or level-up occurs during a low-motivation period, the prompt is deferred, not skipped. The qualifying event is stored as a "deferred trigger." When the user's motivation returns to medium or high, and a natural pause occurs, the deferred trigger can fire (subject to the standard 60-day cooldown check).
- This prevents the worst-case scenario: a user who is barely hanging on sees "Enjoying Balencia?" — a question that could feel sarcastic or out of touch.

### Medium Motivation (default experience)
- Standard trigger logic applies. Prompt appears after qualifying events at natural pauses.
- All components visible as described above.
- SIA avatar shows warm/neutral expression.

### High Motivation (enhanced experience)
- Standard trigger logic applies. No changes to the prompt's visual design.
- The only adaptation: the 400ms delay between star selection and path transition is reduced to 280ms — high-motivation users tend to move faster through UI, and the quicker transition respects their pace.
- SIA avatar may show an energetic/celebratory expression variant.
- The subtitle text on the initial question may optionally include the trigger context: "You just hit a 30-day streak — enjoying Balencia?" (15pt Sora Regular, white at 60%). This personalization increases engagement by connecting the ask to the specific achievement. If trigger context is unavailable, falls back to generic subtitle.

---

## Trigger Logic (Business Rules)

### Qualifying Events (ALL of the following must be true)
1. **Positive event occurred**: streak milestone (7, 14, 30, 60, 90, 180, 365 days), level-up, quest completion, or habit streak (5+ consecutive days)
2. **Natural pause**: user has completed the current action and is viewing a result/summary screen (e.g., celebration overlay has been dismissed, level-up animation has completed). Never mid-flow.
3. **Motivation state**: medium or high (never low)
4. **Cooldown clear**: at least 60 days since last prompt shown (or 30 days if last dismissed via "not now")
5. **Not permanently suppressed**: rating_permanently_suppressed is false
6. **Session duration**: user has been active for at least 2 minutes in the current session (avoids prompting someone who just opened the app)
7. **App version stability**: user has been on the current app version for at least 3 days (avoids prompting right after an update that might have introduced bugs)

### Cooldown Rules
| Dismissal type | Cooldown period |
|----------------|----------------|
| Completed rating (4-5 stars, App Store launched) | 60 days |
| Submitted feedback (1-3 stars, feedback sent) | 60 days |
| "Not now" / drag dismiss / backdrop tap | 30 days |
| "Don't ask again" (confirmed) | Permanent (never show again) |
| "Maybe later" (from positive path) | 30 days |
| "Skip" (from negative path) | 60 days |

### Cooldown Storage
- **Local**: AsyncStorage key `balencia_rating_prompt` — JSON object: `{ last_shown_at: ISO8601, cooldown_days: number, permanently_suppressed: boolean, deferred_trigger: string | null }`
- **Backend sync**: PATCH /api/users/preferences — mirrors local state for cross-device consistency

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Satisfaction question | Sora | 700 (Bold) | 22pt | 28pt | White |
| Subtitle text | Sora | 400 (Regular) | 15pt | 22pt | White at 60% |
| Positive heading ("Thank you!") | Sora | 700 (Bold) | 22pt | 28pt | White |
| Negative heading ("We hear you.") | Sora | 700 (Bold) | 22pt | 28pt | White |
| "Rate on App Store" CTA text | Sora | 600 (Semibold) | 16pt | 22pt | White |
| "Submit feedback" CTA text | Sora | 600 (Semibold) | 16pt | 22pt | White |
| Feedback placeholder | Sora | 400 (Regular) | 14pt | 20pt | White at 25% |
| Feedback input text | Sora | 400 (Regular) | 14pt | 20pt | White at 90% |
| Character counter | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| "not now" link | Sora | 400 (Regular) | 14pt | 20pt | White at 40% |
| "don't ask again" link | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| "don't ask again" confirm | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| "maybe later" / "skip" link | Sora | 400 (Regular) | 14pt | 20pt | White at 40% |
| Error toast text | Sora | 400 (Regular) | 14pt | 20pt | White |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **VoiceOver / TalkBack reading order**: Drag handle (skipped, decorative) -> SIA avatar (decorative, skipped) -> satisfaction question -> subtitle -> star 1 through star 5 -> "not now" link -> "don't ask again" link. On positive path: heading -> subtitle -> "Rate on App Store" button -> "maybe later" link. On negative path: heading -> subtitle -> feedback text area -> character counter -> "Submit feedback" button -> "skip" link.
- **VoiceOver announcement on sheet mount**: "Enjoying Balencia? We'd love to hear how you feel. Rate 1 to 5 stars."
- **Star rating row**: Each star is an independent element with `accessibilityRole="button"`, `accessibilityLabel="Rate [N] out of 5 stars"`. Selected state announced: "[N] stars selected." The row is grouped as `accessibilityRole="adjustable"` so users can swipe up/down to increment/decrement the rating.
- **SIA avatar**: `accessibilityElementsHidden={true}` — decorative, provides no information not covered by text.
- **"Rate on App Store" CTA**: `accessibilityRole="button"`, `accessibilityLabel="Rate on App Store"`, `accessibilityHint="Double tap to open the App Store review prompt"`.
- **Feedback text area**: `accessibilityRole="text"`, `accessibilityLabel="Feedback, what could be better"`, `accessibilityHint="Enter at least 10 characters to submit"`.
- **"Submit feedback" CTA**: `accessibilityRole="button"`, `accessibilityLabel="Submit feedback"`, `accessibilityState={disabled: true/false}`. Disabled state announced: "Submit feedback, dimmed, enter at least 10 characters."
- **"don't ask again" link**: `accessibilityRole="button"`, `accessibilityLabel="Don't ask again"`, `accessibilityHint="Double tap to begin permanent opt-out. You will need to confirm."`. Confirmation state: `accessibilityLabel="Are you sure? Tap again to confirm permanent opt-out."`.
- **Dynamic type**: All text scales with system font size up to 1.3x. Sheet height adjusts to accommodate larger text. Star icons maintain 44pt minimum touch targets regardless of text scaling.
- **High contrast mode**: Star unselected stroke increases from 10% to 25%. "not now" and "don't ask again" link opacity increases to 60% and 50% respectively. Feedback text area border increases from 8% to 15%.
- **Reduced motion**: See Motion section — sheet entrance, star fill animations, and path transitions simplified to instant opacity changes.

---

## Cross-References

- **Navigates to**: App Store review prompt (native OS, via StoreKit / Google Play In-App Review API). No in-app screen navigation — the sheet overlays and dismisses without changing the navigation stack.
- **Navigates from (trigger sources)**: Screen [59] — Streak Details (streak milestone reached), Screen [42] — Celebration Overlay (streak milestone, level-up, quest completion achievement displayed), Screen [19] — RPG Character (level-up event), Screen [46] — Quests/Challenges (quest completion), Screen [38] — Habits (habit streak of 5+ days reached), Screen [12] — Home Screen (post-celebration natural pause)
- **Shared components with**: Screen [42] — Celebration Overlay (SIA avatar display, bottom sheet presentation pattern, post-positive-event context), Screen [15] — Create/Edit Goal (bottom sheet modal pattern, drag-to-dismiss gesture, backdrop overlay), Screen [43] — Paywall (modal bottom sheet UX, CTA button pattern, dismissal link pattern)
- **Patterns used**: Modal Presentation — Bottom Sheet (_shared-patterns.md: slide up, drag handle, semi-transparent backdrop, drag-to-dismiss), In-Card CTA Button (_shared-patterns.md: orange pill, 52pt height, --r-pill), SIA Avatar Display (_shared-patterns.md: purple border, circle crop), 8-State Interaction Model (_shared-patterns.md), Haptic Feedback Points (_shared-patterns.md), Text Area Input (Screen 62 — Quick Notes: ink-brown-800 bg, orange focus border, character counter)
- **Patterns established**: Happy Path First Rating Flow (satisfaction question → star rating → branch to App Store or in-app feedback), Deferred Trigger Pattern (storing qualifying events during low-motivation for later presentation), Double-Tap Confirmation for Permanent Actions ("don't ask again" requires two taps within 5 seconds), Star Rating Row (5-star interactive row with drag-to-preview and staggered fill animation)
