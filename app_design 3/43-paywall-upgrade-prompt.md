# Screen Design: Paywall / Upgrade Prompt

**Screen**: 43 of 73
**File**: 43-paywall-upgrade-prompt.md
**Register**: Brand Mode
**Primary action**: upgrade subscription
**Tab**: None (modal overlay on top of any screen)
**Navigation**: z-50 modal (slides up from bottom). Not a navigated screen — system-triggered when user hits a premium-gated feature. Dismissed via "maybe later" or drag-down. Also has an inline SIA Chat variant (z-10, within chat flow).

---

## Purpose

The Paywall converts free users into subscribers by showing them exactly what they're missing — in context, at the moment they want it most. Unlike a generic subscription page, this overlay adapts its headline, preview, and tier emphasis to whatever feature the user just tried to access. It never hides features; it blurs them — showing enough value to create desire while keeping the upgrade path frictionless. The secondary SIA conversational variant handles in-chat upsells without breaking the coaching flow.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority — Modal Variant):
1. Contextual headline — speaks to what they were trying to do
2. Blurred preview — a tantalizing glimpse of the premium feature
3. Feature highlights — 3-4 bullet points of what they'd unlock
4. Tier recommendation — the right plan for their need, with price
5. Primary CTA — "start free trial" or "upgrade to [tier]"
6. Easy-out — "maybe later" link, always visible and accessible
7. Drag handle — physical affordance for dismissing

**Hierarchy** (SIA Chat Inline Variant):
1. SIA message referencing the premium feature naturally
2. Inline upgrade card with contextual CTA
3. "maybe later" text link below card

**User flow**:
- **Arrives from**: Any screen where user taps a premium-gated feature. Common triggers: SIA Chat (09) AI limit reached, domain dashboards premium analytics, cross-domain insight cards, advanced goal decomposition, voice mode limits
- **Primary exit**: Tap "upgrade" → native IAP payment flow → success → modal dismisses, feature unlocks
- **Secondary exits**: "Maybe later" tap or drag-down dismiss → returns to previous screen (feature remains locked), tap "see all plans" → Subscription & Billing (23) pushed onto stack

---

## Layout

**Scroll behavior**: ScrollView (content may exceed viewport on smaller devices)
**Tab bar visible**: No (modal covers tab bar)

### ASCII Wireframe — Modal Variant

```
┌─────────────────────────────┐
│                             │
│  (underlying screen,        │
│   dimmed at 60% opacity)    │
│                             │
├─────────────────────────────┤
│         ─── ───             │  ← Drag handle: 4pt
│                             │
│  Unlock SIA's full          │  ← Contextual
│  coaching.                  │     headline: 24pt
│                             │
│  ┌───────────────────────┐  │
│  │ ░░░░░░░░░░░░░░░░░░░░ │  │
│  │ ░░ Blurred preview ░░ │  │  ← Blurred preview
│  │ ░░ of the premium  ░░ │  │     of the feature
│  │ ░░ feature content ░░ │  │     ~160pt
│  │ ░░░░░░░░░░░░░░░░░░░░ │  │
│  └───────────────────────┘  │
│                             │
│  What you'll get:           │  ← Feature list
│  ✓ Unlimited SIA messages   │     eyebrow + items
│  ✓ Cross-domain insights    │
│  ✓ Voice coaching mode      │
│  ✓ Advanced goal planning   │
│                             │
│  ┌───────────────────────┐  │
│  │  PLUS  $20/mo         │  │  ← Recommended
│  │  Full SIA coaching,   │  │     tier card
│  │  all 9 domains        │  │     (highlighted)
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  start free trial     │  │  ← Primary CTA
│  └───────────────────────┘  │     (Brand CTA)
│                             │
│       maybe later           │  ← Easy-out link
│                             │
│     see all plans           │  ← Secondary link
│                             │
└─────────────────────────────┘
```

### ASCII Wireframe — SIA Chat Inline Variant

```
┌─────────────────────────────┐
│  ... previous chat ...      │
│                             │
│  ┌──── SIA ────────────┐    │
│  │ "Your sleep and      │   │
│  │  spending patterns    │   │  ← SIA message
│  │  have a strong        │   │     mentioning
│  │  connection. Want     │   │     premium feature
│  │  to see the full      │   │
│  │  analysis?"           │   │
│  └──────────────────────┘   │
│                             │
│  ┌──────────────────────┐   │
│  │  🔒 Cross-domain     │   │
│  │     insights          │   │  ← Inline upgrade
│  │                       │   │     card within
│  │  See connections      │   │     chat flow
│  │  across all your      │   │
│  │  life areas.          │   │
│  │                       │   │
│  │ ┌──────────────────┐ │   │
│  │ │  unlock with plus │ │   │
│  │ └──────────────────┘ │   │
│  │                       │   │
│  │    maybe later        │   │
│  └──────────────────────┘   │
│                             │
│  ... chat continues ...     │
│                             │
├─────────────────────────────┤
│  [text input]        [mic]  │
└─────────────────────────────┘
```

### Component Stack — Modal Variant (top to bottom)

1. **Semi-Transparent Backdrop** — full screen, z-49
   - Purpose: Dim underlying screen, tap to dismiss
   - Content: ink-900 at 60% opacity

2. **Modal Container** — slides up from bottom, z-50
   - Purpose: Contains all paywall content
   - Content: ink-brown-800 background, top corners --r-2xl (40pt), drag handle at top

3. **Drag Handle** — top of modal
   - Purpose: Visual affordance for pull-down dismiss
   - Content: 40pt wide x 4pt pill, white at 20%, centered

4. **Contextual Headline** — below handle
   - Purpose: Speak directly to what the user wanted to do
   - Content: Dynamic text adapting to trigger context

5. **Blurred Preview** — below headline
   - Purpose: Show the premium feature they're missing
   - Content: Screenshot/render of the feature with Gaussian blur

6. **Feature Highlights** — below preview
   - Purpose: Bullet the key unlocks for this tier
   - Content: 3-4 checkmark items

7. **Recommended Tier Card** — below highlights
   - Purpose: Present the right plan
   - Content: Tier name, price, short description

8. **Primary CTA** — below tier card
   - Purpose: Start the upgrade
   - Content: Brand CTA Button — "start free trial" or "upgrade"

9. **Easy-Out Link** — below CTA
   - Purpose: Let user leave without pressure
   - Content: "maybe later" text link

10. **See All Plans Link** — below easy-out
    - Purpose: Navigate to full subscription comparison
    - Content: "see all plans" text link

---

## Components

### Semi-Transparent Backdrop
- **Purpose**: Focus attention on the paywall modal
- **Data source**: None
- **Visual treatment**: ink-900 (#0A0A0F) at 60% opacity. Covers entire screen including status bar and tab bar area. Tapping backdrop dismisses the modal (same as "maybe later").
- **Variants**: None
- **Gestures**: Tap to dismiss modal
- **Size**: Full screen

### Modal Container
- **Purpose**: The paywall card that slides up
- **Data source**: API — user's current plan, available tiers, pricing, trial eligibility
- **Visual treatment**: ink-brown-800 (#211008) background. Top-left and top-right corners: --r-2xl (40pt). Bottom corners: 0 (extends to screen bottom). 1pt border on top and sides: white at 8%. Internal padding: 16pt horizontal, 16pt top (above handle), 32pt bottom (below last element). Safe area padding at bottom for home indicator.
- **Variants**: Partial-height (default — covers ~75% of screen), near-full-height (on iPhone SE where content is taller)
- **Gestures**: Drag handle down to dismiss (velocity-based — fast flick dismisses, slow drag springs back). Content area scrolls if needed.
- **Size**: Full-width, ~75% screen height

### Drag Handle
- **Purpose**: Physical affordance indicating the modal can be pulled down
- **Data source**: None
- **Visual treatment**: Rounded pill shape, 40pt wide x 4pt height, white at 20%, centered horizontally, 8pt below top edge of modal.
- **Variants**: None
- **Gestures**: Drag down to dismiss modal
- **Size**: 40x4pt

### Contextual Headline
- **Purpose**: Make the paywall feel personal, not generic
- **Data source**: Trigger context passed from the calling screen
- **Visual treatment**: 24pt Sora Bold, white, left-aligned. Brand period at end. Sentence case. Maximum 2 lines. 16pt horizontal margins. 24pt gap below.
- **Content examples by trigger**:
  - SIA limit reached: "unlock SIA's full coaching."
  - Cross-domain insight: "see the connection between your sleep and spending."
  - Voice mode: "talk to SIA anytime."
  - Advanced analytics: "see the full picture."
  - Domain dashboard premium: "get the complete [domain] experience."
- **Variants**: Dynamic text by trigger. One orange accent word per headline (the action verb: "unlock", "see", "talk", "get").
- **Gestures**: None
- **Size**: Full-width minus 32pt, auto-height (1-2 lines)

### Blurred Preview
- **Purpose**: Show what the user is missing — enough to create desire, not enough to satisfy
- **Data source**: Dynamic — captures or renders the premium content the user was trying to access
- **Visual treatment**: Full-width minus 32pt (16pt margins). Height: ~160pt. --r-xl (28pt) corners. Content rendered behind a Gaussian blur (radius 12pt). Subtle gradient overlay from transparent (top) to ink-brown-800 at 40% (bottom) so it blends into the modal. Thin 1pt border: white at 8%.
- **Variants by trigger type**:
  - Data feature: blurred chart/insight card
  - SIA coaching: blurred conversation with rich cards
  - Voice mode: blurred voice mode interface
  - Domain dashboard: blurred dashboard content
- **Gestures**: None (non-interactive visual)
- **Size**: Full-width minus 32pt x ~160pt

### Feature Highlights
- **Purpose**: Concise list of what upgrading unlocks
- **Data source**: API — features for the recommended tier, filtered to context-relevant ones
- **Visual treatment**: Eyebrow label "what you'll get" (12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking). 12pt gap below. Each item: orange checkmark icon (16pt) + feature text (15pt Sora Regular, white). 12pt gap between items. Left-aligned, 16pt horizontal margins. 3-4 items maximum.
- **Content adapts to trigger**:
  - SIA limit: unlimited messages, voice mode, proactive insights, cross-domain connections
  - Analytics: advanced charts, trend analysis, SIA projections, domain comparisons
  - General: full SIA coaching, all 9 domains, RPG gamification, cross-domain insights
- **Variants**: 3-item list (tight), 4-item list (default)
- **Gestures**: None
- **Size**: Full-width minus 32pt, ~120pt (4 items)

### Recommended Tier Card
- **Purpose**: Present the right subscription plan prominently
- **Data source**: API — tier details, pricing, user's current plan
- **Visual treatment**: Full-width minus 32pt. --r-xl (28pt) corners. Background: ink-900 (slightly darker than modal surface for contrast). 1pt border: Burnt Orange at 30%. Padding: 20pt. Content: tier name in 12pt Sora Semibold, uppercase, Burnt Orange, +0.12em tracking (eyebrow). Price in 24pt Sora Bold, white ("$20/mo"). Description in 15pt Sora Regular, white at 70% (single line: "full SIA coaching, all 9 domains"). Tier badge (optional): small "recommended" chip, Burnt Orange bg, white text, --r-pill.
- **Variants by context**:
  - User on Free, light feature: recommend Plus ($20/mo)
  - User on Free, advanced feature: recommend Pro ($60/mo)
  - User on Plus, hitting Pro limits: recommend Pro ($60/mo)
- **Gestures**: Tap card to expand tier details (optional — can show feature comparison inline)
- **Size**: Full-width minus 32pt, ~100pt

### Primary CTA (Upgrade / Free Trial)
- **Purpose**: The conversion action
- **Data source**: API — trial eligibility (has user used a free trial for this feature before?)
- **Visual treatment**: Brand CTA Button pattern (established in Batch 1). Full-width minus 32pt. 56pt height. Burnt Orange fill, white text, --r-pill. Text adapts: "start free trial" (if trial eligible, first-time for this feature) or "upgrade to plus" (if trial used or not eligible). 17pt Sora Semibold, sentence case, center-aligned.
- **Variants**: Free trial available (primary text: "start free trial"), direct upgrade (primary text: "upgrade to [tier]"), processing (white spinner)
- **Gestures**: Tap to initiate native IAP flow
- **Size**: Full-width minus 32pt x 56pt

### Easy-Out Link ("maybe later")
- **Purpose**: Let the user leave without feeling pressured
- **Data source**: None
- **Visual treatment**: "maybe later" in 15pt Sora Regular, white at 50%, center-aligned. Touch target: full-width x 44pt. No underline, no decoration. Subtle — present but not prominent.
- **Variants**: None
- **Gestures**: Tap to dismiss modal (same as drag-down dismiss)
- **Size**: Full-width x 44pt touch target

### See All Plans Link
- **Purpose**: Navigate to the full subscription comparison screen
- **Data source**: None
- **Visual treatment**: "see all plans" in 15pt Sora Semibold, Burnt Orange, center-aligned. Touch target: full-width x 44pt. No underline.
- **Variants**: None
- **Gestures**: Tap to navigate to Subscription & Billing (23) — modal dismisses, screen pushes onto stack
- **Size**: Full-width x 44pt touch target

### SIA Inline Upgrade Card (Chat Variant)
- **Purpose**: In-chat upsell that doesn't break the coaching flow
- **Data source**: API — SIA determines when to surface upgrade contextually, premium feature details
- **Visual treatment**: Appears as a rich card in the SIA Chat message flow (left-aligned, like a SIA message card). ink-brown-800 background, --r-xl corners, 16pt padding. Top row: lock icon (16pt, white at 40%) + feature name (16pt Sora Semibold, white) + dismiss "X" button (top-right, 14pt icon, white at 30%, 44x44pt touch target). Below: 1-2 line description (15pt Sora Regular, white at 70%). Below: inline CTA button — "unlock with plus" (Burnt Orange fill, white text, --r-pill, 44pt height, full card width minus 32pt padding). Below button: "maybe later" text link (13pt Sora Regular, white at 40%, center-aligned). Card width: same as SIA message cards (~280pt). Subtle orange left border accent (3pt, Burnt Orange at 40%).
- **Dismiss affordances**: Three ways to exit without upgrading — (1) dismiss "X" button (top-right), (2) "maybe later" text link, (3) swipe card left to dismiss (standard chat card swipe, slides out 280ms ease-out-soft). All three trigger SIA's graceful acknowledgment: "no worries, it'll be here when you're ready." The user should never feel trapped.
- **Variants**: By feature being upsold — changes the lock icon label, description, and CTA text
- **Gestures**: Tap CTA to trigger modal paywall (or directly initiate IAP), tap dismiss "X" or "maybe later" to dismiss card, swipe card left to dismiss
- **Size**: ~280pt wide, ~180pt height

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Backdrop | #0A0A0F at 60% | ink-900 | Dim underlying screen |
| Modal background | #211008 | ink-brown-800 | Card surface |
| Modal border | white at 8% | — | Subtle edge |
| Drag handle | white at 20% | — | Affordance |
| Headline text | white | — | Primary text |
| Headline accent word | #FF5E00 | brand-orange | 60% role — action verb |
| Blurred preview border | white at 8% | — | Frame |
| Blurred preview overlay | #211008 at 40% | ink-brown-800 | Bottom fade blend |
| Feature checkmarks | #FF5E00 | brand-orange | 60% role — value indicators |
| Feature text | white | — | Primary text |
| Eyebrow labels | white at 50% | — | Section labels |
| Tier card background | #0A0A0F | ink-900 | Contrast against modal |
| Tier card border | #FF5E00 at 30% | brand-orange | 60% role — highlight |
| Tier name | #FF5E00 | brand-orange | 60% role — plan identity |
| Tier price | white | — | Primary text |
| Tier description | white at 70% | — | Secondary text |
| "Recommended" chip bg | #FF5E00 | brand-orange | 60% role — badge |
| "Recommended" chip text | white | — | Badge text |
| CTA button | #FF5E00 | brand-orange | 60% role — primary action |
| CTA text | white | — | Button text |
| "Maybe later" text | white at 50% | — | Tertiary link |
| "See all plans" text | #FF5E00 | brand-orange | 60% role — navigation |
| SIA inline card bg | #211008 | ink-brown-800 | Chat card surface |
| SIA inline lock icon | white at 40% | — | Premium indicator |
| SIA inline CTA | #FF5E00 | brand-orange | 60% role — inline action |
| SIA inline "maybe later" | white at 40% | — | Easy-out |
| SIA inline left border | #FF5E00 at 40% | brand-orange | Accent |

**60/30/10 verification**: Orange heavily dominates this conversion-focused screen — headline accent, checkmarks, tier card border/name/badge, CTA button, "see all plans" link, and inline card CTA. This is intentional: the paywall is an action-driving screen where orange's 60% role as the CTA color is concentrated. Green does not appear (no success states visible in the default presentation — success happens in the IAP flow after this screen). Purple does not appear (SIA's presence is through the inline chat variant, which uses standard SIA message styling from Screen 09). Domain colors are absent.

---

## Interaction States

### Primary CTA (Upgrade / Free Trial)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text | — |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (e.g., during IAP processing on another device) | — |
| Loading | White spinner replaces text (IAP initializing) | — |
| Error | Red border accent, "purchase failed" text below | Error notification |
| Success | Green fill, white checkmark, "welcome to plus." text | Success notification |

### "Maybe Later" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 50% | — |
| Pressed | White at 30%, scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### "See All Plans" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange text | — |
| Pressed | Darker orange (orange-600), scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Recommended Tier Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, orange border at 30% | — |
| Pressed | Border brightens to 60%, scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer (price loading) | — |
| Error | Red border, "pricing unavailable" message | Error notification |
| Success | — | — |

### SIA Inline Upgrade Card CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, within card | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | White spinner replaces text | — |
| Error | Red border, error text | Error notification |
| Success | Green fill, checkmark | Success notification |

### Drag Handle (Modal Dismiss)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 20% | — |
| Dragging | White at 40%, modal follows finger with resistance | Light impact (at drag start) |
| Released (velocity dismiss) | Modal slides down and fades | Medium impact |
| Released (spring back) | Modal springs back to position | Light impact |
| Focus-visible | — | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Drag down | Drag handle or modal top area | Dismiss modal (velocity-based threshold) |
| Tap | Backdrop (dimmed area above modal) | Dismiss modal |
| Tap | Primary CTA | Initiate IAP flow |
| Tap | "Maybe later" | Dismiss modal |
| Tap | "See all plans" | Navigate to Subscription & Billing (23) |
| Tap | Tier card | Expand tier details (optional) |
| Tap | SIA inline CTA | Trigger modal paywall or initiate IAP |

### Haptic Feedback Points
- Modal slides up (presentation): medium impact
- Drag handle engaged: light impact
- Modal dismiss (velocity): medium impact
- Modal spring-back: light impact
- CTA tap: light impact
- IAP initiated (loading): — (none during processing)
- Purchase success: success notification (heavy)
- Purchase error: error notification
- "Maybe later" tap: light impact
- Backdrop tap (dismiss): light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Backdrop | Modal triggered | Fade in (opacity 0→60%) | 280ms (--dur-base) | ease-out-soft |
| Modal container | After backdrop starts | Slide up from bottom (translateY(100%→0)) | 520ms (--dur-slow) | ease-flow |
| Headline | After modal settles | Fade in + translateY(12→0) | 280ms (--dur-base) | ease-out-soft |
| Blurred preview | After headline | Fade in + scale(0.95→1.0) | 280ms (--dur-base) | ease-out-soft |
| Feature highlights | After preview | Staggered fade-in, 60ms between items | 280ms per item | ease-out-soft |
| Tier card | After highlights | Fade in + translateY(8→0) | 280ms (--dur-base) | ease-out-soft |
| CTA button | After tier card | Fade in + scale(0.95→1.0) | 280ms (--dur-base) | ease-out-soft |
| Easy-out links | After CTA | Fade in | 280ms (--dur-base) | ease-out-soft |
| Modal dismiss (drag) | User drag down | Modal follows finger, backdrop opacity reduces proportionally | Continuous | — |
| Modal dismiss (release) | Velocity exceeds threshold | Modal slides to bottom + backdrop fades | 280ms (--dur-base) | ease-out-soft |
| Modal spring-back | Release below threshold | Modal returns to position | 280ms (--dur-base) | ease-out-soft |
| IAP loading | CTA tap | Button text → spinner, modal dims slightly | 160ms (--dur-fast) | ease-out-soft |
| Purchase success | IAP completes | CTA turns green with checkmark, then modal auto-dismisses after 1.5s | 520ms (--dur-slow) | ease-flow |
| SIA inline card | SIA message flow | Appears as part of normal chat message animation | 280ms (--dur-base) | ease-out-soft |

**Total entrance sequence**: ~2.5 seconds from trigger to all elements visible. Modal slides up as the primary motion, content cascades in as it settles.

**Screen transition**:
- **Enter**: Not a navigation — modal slides up over current screen with backdrop dim
- **Exit (dismiss)**: Modal slides down, backdrop fades, underlying screen revealed
- **Exit (success)**: CTA turns green, modal auto-dismisses after 1.5s celebration beat
- **Exit (to Subscription)**: Modal slides down, then Subscription & Billing (23) pushes onto stack

---

## Empty States

### Day 1 (new user)
Not applicable in the traditional sense — the paywall only appears when triggered. However, the system should avoid showing the paywall too early in the user journey:
- No paywall triggers during onboarding (screens 06-08)
- First paywall appearance should be after the user has experienced at least 2-3 days of free tier value
- When the paywall does first appear, the SIA conversational variant is preferred over the modal (less aggressive)

### Established user (zero state)
Not applicable — the paywall only appears when triggered by a premium feature interaction.

### Trial expired
When a user's free trial for a specific feature has ended:
- Same modal layout, but headline changes: "your [feature] trial has ended."
- Free trial CTA is replaced with direct upgrade: "upgrade to plus"
- SIA inline variant: "your trial for [feature] wrapped up. want to keep it?"

---

## Motivation Adaptation

- **Low motivation**: Paywall appears less frequently — system limits to max 1 paywall trigger per session to avoid frustration. SIA conversational variant preferred (softer approach). Easy-out link is more prominent. Headline tone is gentler: "whenever you're ready." No urgency language.
- **Medium motivation**: Default experience. Modal paywall triggers when user hits premium features. Balance between showing value and respecting boundaries. Standard headline and CTA.
- **High motivation**: Paywall can appear more directly — user is engaged and likely to convert. Data-focused value proposition: "users who upgrade see 40% more insights." Additional detail in tier card (usage stats, feature comparison). "See all plans" link more prominent for power users who want to compare tiers carefully.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Contextual headline | Sora | Bold (700) | 24pt | 32pt | white (with one orange accent word) |
| Feature eyebrow ("what you'll get") | Sora | Semibold (600) | 12pt | 16pt | white at 50% |
| Feature item text | Sora | Regular (400) | 15pt | 22pt | white |
| Tier name (eyebrow) | Sora | Semibold (600) | 12pt | 16pt | orange #FF5E00 |
| Tier price | Sora | Bold (700) | 24pt | 32pt | white |
| Tier description | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| "recommended" chip text | Sora | Semibold (600) | 11pt | 16pt | white |
| Primary CTA text | Sora | Semibold (600) | 17pt | 22pt | white |
| "maybe later" link | Sora | Regular (400) | 15pt | 22pt | white at 50% |
| "see all plans" link | Sora | Semibold (600) | 15pt | 22pt | orange #FF5E00 |
| SIA inline card feature name | Sora | Semibold (600) | 16pt | 22pt | white |
| SIA inline card description | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| SIA inline CTA text | Sora | Semibold (600) | 15pt | 20pt | white |
| SIA inline "maybe later" | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Trial expired headline | Sora | Bold (700) | 24pt | 32pt | white |
| Purchase error text | Sora | Regular (400) | 13pt | 18pt | #F44336 |
| Purchase success text | Sora | Semibold (600) | 17pt | 22pt | white |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Tier/pricing data fails to load | Recommended tier card shows skeleton shimmer for 3s, then: "pricing unavailable" with red border accent | Tap tier card to retry; dismiss and re-trigger paywall |
| IAP initialization fails | CTA button reverts from spinner to default text; inline error below CTA: "purchase failed. try again." in 13pt Sora Regular, #F44336 | Tap CTA to retry; "maybe later" to dismiss |
| IAP cancelled by user | CTA reverts to default state; modal remains open for another attempt | Tap CTA to try again or dismiss via "maybe later" |
| IAP receipt validation fails | CTA shows error state: red border accent, "purchase could not be verified" text below | Tap CTA to retry validation; contact support link appears below error |
| Network error during purchase | CTA reverts from spinner; toast: "no connection. check your network and try again." | Restore connectivity and tap CTA again |
| Blurred preview fails to render | Preview area shows solid ink-brown-800 background with centered lock icon (24pt, white at 30%) | No user action needed; feature highlights still convey value |
| SIA inline card fails to load | Card does not appear in chat flow; SIA continues conversation normally | No user action needed; paywall can be triggered manually from settings |
| Modal presentation fails | Feature remains locked; no visible error (graceful degradation) | User can access upgrade from Subscription & Billing [23] directly |
| Free trial already used | CTA text changes from "start free trial" to "upgrade to [tier]"; no trial messaging shown | User proceeds with direct purchase |

---

## Accessibility

- Modal announced on presentation: "Upgrade prompt. [Contextual headline text]."
- Drag handle announces: "Drag down to dismiss"
- Blurred preview is decorative; hidden from accessibility tree with description: "Preview of premium feature"
- Feature highlight items each announce: "Included: [feature name]"
- Recommended tier card announces: "Recommended plan: [tier name], [price] per month. [Description]."
- Primary CTA announces: "Start free trial" or "Upgrade to [tier name]"
- "maybe later" announces: "Maybe later, dismisses upgrade prompt"
- "see all plans" announces: "See all plans, navigates to subscription comparison"
- SIA inline card in chat announces: "Premium feature: [feature name]. [Description]. Unlock with [tier]."
- SIA inline dismiss "X" announces: "Dismiss upgrade card"
- Loading state on CTA announces: "Processing purchase"
- Error state announced: "Purchase failed. [Error details]."
- Success state announced: "Welcome to [tier name]. Purchase successful."
- All touch targets meet 44x44pt minimum
- Focus order (modal): drag handle -> headline -> blurred preview (skipped) -> feature items -> tier card -> primary CTA -> "maybe later" -> "see all plans"
- Gesture alternatives: drag-down on handle or backdrop tap dismisses; VoiceOver escape gesture (two-finger Z-scrub) dismisses modal

---

## Cross-References

- **Navigates to**: Native IAP payment flow (system-level, not an app screen), Subscription & Billing (23) via "see all plans" link (stack push after modal dismiss)
- **Navigates from**: System trigger — any screen with premium-gated features. Common triggers: SIA Chat (09) AI message limit, all domain dashboards (26-36) advanced analytics sections, Goal Detail (14) advanced decomposition, Life Areas Overview (16) correlation drill-down, Voice Mode (10/11) usage limits, Journal (37) AI reflection analysis, Habits (38) AI habit suggestions
- **Shared components with**: Subscription & Billing (23) — tier card uses same pricing display and plan naming; SIA Chat (09) — inline upgrade card follows SIA message card styling patterns
- **Patterns used**: Brand CTA Button (_shared-patterns.md), Modal Presentation (_shared-patterns.md — slide up, drag-to-dismiss, 20pt/40pt top corners, 60% backdrop)
- **Patterns established**: Contextual Paywall Modal (headline + blurred preview + feature list + tier card + CTA + easy-out, all adapting to trigger context), Blurred Preview Treatment (Gaussian blur with bottom gradient fade for "preview behind lock"), SIA Inline Upgrade Card (in-chat upsell card with lock icon + feature name + CTA + easy-out, within normal message flow), Trial-Aware CTA (button text adapts: "start free trial" vs "upgrade to [tier]" based on trial eligibility), Motivation-Adapted Paywall Frequency (system limits paywall triggers per session based on motivation tier)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/paywall`
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
| B13-F12 | critical | monetization | Wire trial eligibility, native purchase entry, processing, success unlock, cancel/error, restore, and post-purchase dismissal states. |
| B13-F13 | major | conversion | Make easy-out/backdrop/drag dismiss the modal and route See all plans to plan comparison or Subscription & billing. |
| B13-F14 | major | accessibility | Use 44px secondary actions, dialog semantics, focus trapping, escape/back dismissal, and return focus to the gated trigger. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

