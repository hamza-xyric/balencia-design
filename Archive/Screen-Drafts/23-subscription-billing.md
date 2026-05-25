# Screen Design: Subscription & Billing

**Screen**: 23 of 43
**File**: 23-subscription-billing.md
**Register**: Product Mode
**Primary action**: Upgrade plan (tap upgrade CTA on a tier card)
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (or depth 2 if navigated via Settings [21]). Pushed from Me Main [17] quick link grid or Settings [21] "manage subscription" row. Back button returns to previous screen.

---

## Purpose

The Subscription & Billing screen shows the user what they have, what they're missing, and how to get more. It presents Balencia's 4-tier subscription model (Free/Plus/Pro/Max) with the current plan highlighted, a feature comparison that makes the value clear, and billing management for paying users. The design follows the "show everything, upsell via visibility" principle — all features are visible to all users, with clear indicators of what requires an upgrade. This screen is never part of onboarding; users arrive here after experiencing Balencia's value.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Current plan badge — immediate confirmation of where they stand
2. Tier cards — the comparison, with the recommended upgrade most prominent
3. Feature checklist — detailed what-you-get-per-tier breakdown
4. AI usage indicator — for metered tiers (Pro), current consumption
5. Billing section — payment method, history, cancel/downgrade (secondary importance)

**User flow**:
- **Arrives from**: Me Main [17] via stack push (quick link grid) or Settings [21] via stack push ("manage subscription" row) or Paywall [43] via stack push ("see all plans" link)
- **Primary exit**: Native IAP flow (upgrade action) → returns to this screen with updated plan
- **Secondary exits**: Previous screen via stack pop (back button), billing history detail (expandable inline), cancel/downgrade confirmation (modal)

---

## Layout

**Scroll behavior**: ScrollView (tier cards + feature comparison + billing section exceeds viewport significantly)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]  Subscription & billing│  ← nav header, 44pt
├─────────────────────────────┤
│                             │  ← 16pt top padding
│  YOUR PLAN                  │  ← section header
│  ┌───────────────────────┐  │
│  │  Plus       $20/mo    │  │  ← current plan card
│  │  ●────────── 80%      │  │     AI usage bar
│  │  Renews Jun 15, 2026  │  │     renewal date
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  ALL PLANS                  │  ← section header
│                             │
│  ┌──────┐┌──────┐┌──────┐  │
│  │ Free ││ Plus ││ Pro  │→ │  ← horizontal scroll
│  │      ││ ████ ││      │  │     current plan highlighted
│  │ $0   ││ $20  ││ $60  │  │
│  │      ││      ││      │  │
│  │  ·   ││  ·   ││  ·   │  │     feature bullets
│  │  ·   ││  ·   ││  ·   │  │
│  │  ·   ││  ·   ││  ·   │  │
│  │      ││      ││      │  │
│  │[curr]││[curr]││[Upgr]│  │     CTA per card
│  └──────┘└──────┘└──────┘  │
│                             │  ← 24pt gap
│  BILLING                    │  ← section header
│  ┌───────────────────────┐  │
│  │ Payment method        │  │
│  │ Visa ····4242     ›   │  │  ← nav row
│  ├───────────────────────┤  │
│  │ Billing history    ›  │  │  ← expandable
│  ├───────────────────────┤  │
│  │ Restore purchases  ›  │  │  ← action row
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  ┌───────────────────────┐  │
│  │ Downgrade plan        │  │  ← destructive row
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ Cancel subscription   │  │  ← destructive row
│  └───────────────────────┘  │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification and back navigation
   - Content: Back chevron (left), "Subscription & billing" title (center)

2. **Current Plan Card** — ~120pt
   - Purpose: Show current subscription status at a glance
   - Content: Plan name, price, AI usage bar (if applicable), renewal/expiry date

3. **Tier Cards (Horizontal Scroll)** — ~360pt
   - Purpose: Compare all 4 tiers, highlight current, drive upgrades
   - Content: 4 scrollable cards (Free, Plus, Pro, Max) with name, price, feature bullets, CTA

4. **Billing Section** — ~180pt
   - Purpose: Payment and billing management
   - Content: Payment method row, billing history expandable, restore purchases

5. **Destructive Actions** — ~120pt
   - Purpose: Downgrade or cancel subscription
   - Content: Two standalone destructive rows

---

## Components

### Current Plan Card
- **Purpose**: At-a-glance confirmation of subscription status
- **Data source**: Subscription API (plan tier, renewal date, AI usage metrics)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 2pt border Burnt Orange (#FF5E00) — the orange border distinguishes this as "your current" plan. Padding: 24pt all sides.
- **Variants**: Free (no renewal date, no usage bar), Plus (renewal + basic usage), Pro (renewal + visible usage meter), Max (renewal, "unlimited" label)
- **Gestures**: None (display only)
- **Size**: Full-width minus 32pt (16pt margins) × ~120pt

#### Current Plan Card — Internal Layout
- **Plan name + price**: Horizontal row. Name: 20pt Sora Semibold, white. Price: 15pt Sora Regular, white at 50%, right-aligned. E.g., "Plus" ... "$20/mo"
- **AI usage bar** (Pro tier and below): Below name row, 8pt gap. Track: full-width, 6pt height, --r-pill, ink-700 fill. Fill: Burnt Orange (#FF5E00), width proportional to usage. Right label: "80% used" — 12pt Sora Regular, white at 50%.
  - Usage bar turns amber (#F59E0B) at 80%, red (#f44336) at 95%
- **Renewal date**: 13pt Sora Regular, white at 40%. "Renews Jun 15, 2026" or "Free plan" for free tier.

### Tier Card (Horizontal Scroll Item)
- **Purpose**: Individual plan option for comparison and upgrade
- **Data source**: Static plan data (prices, features)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Width: 260pt fixed (allows ~1.3 cards visible, encouraging horizontal scroll). Padding: 24pt all sides.
- **Variants**: Current plan (2pt orange border, "current plan" badge replacing CTA), upgrade target (orange CTA), downgrade target (ghost CTA), locked/unavailable (N/A for V1 — all tiers always available)
- **Gestures**: Horizontal swipe to scroll between cards, tap CTA
- **Size**: 260pt × ~320pt

#### Tier Card — Internal Layout
- **Plan name**: 18pt Sora Semibold, white. Center-aligned.
- **Price**: 32pt Sora Bold, white. "$20" large + "/mo" in 15pt Sora Regular white at 50%. Center-aligned. 8pt below name.
- **Recommended badge** (on the tier one above current): "Recommended" — 11pt Sora Semibold, uppercase, Burnt Orange (#FF5E00), +0.12em tracking. Positioned above plan name. Only appears on one card.
- **Feature list**: Bullet list, left-aligned. Each item: orange checkmark icon (14pt, #FF5E00) + feature text (13pt Sora Regular, white at 70%). Items vertically stacked with 8pt gaps. Max 5 features visible; if more exist, show "and N more" link (13pt Sora Regular, orange, 44pt touch target) that expands the full list inline (280ms ease-out-soft). Features NOT included on this tier: gray checkmark (white at 20%) + text at white at 30%, struck through.
- **CTA button**: Bottom of card, full card width minus padding.
  - Current plan: "Current plan" label, ink-700 background, white at 50% text, disabled state
  - Upgrade: "Upgrade" / "Upgrade to [tier]", Burnt Orange fill, white text, --r-pill, 44pt height
  - Downgrade: "Downgrade", ghost button (transparent, 1pt border white at 10%, white text)

### Feature Comparison List (within tier cards)
- **Purpose**: Show what each tier includes
- **Data source**: Static
- **Features shown per tier**:
  - **Free**: Journaling, finance module, habit tracking, basic dashboard, limited AI (X msgs/day)
  - **Plus**: Everything in Free + full SIA coaching, all domains, cross-domain insights, RPG gamification
  - **Pro**: Everything in Plus + advanced analytics, higher AI limits, real-time usage meter
  - **Max**: Everything in Pro + unlimited SIA, priority processing, family/team features

### AI Usage Indicator
- **Purpose**: Show current AI consumption for metered tiers
- **Data source**: Usage API (messages used / limit)
- **Visual treatment**: Horizontal progress bar within Current Plan Card
- **Variants**: Low usage (0-60%, orange fill), approaching limit (60-80%, orange fill), near limit (80-95%, amber #F59E0B fill), at limit (95-100%, red #f44336 fill)
- **Gestures**: None
- **Size**: Full card width × 6pt bar + 16pt label

### Billing Section Group
- **Purpose**: Container for payment-related settings rows
- **Data source**: Billing API (payment method, history)
- **Visual treatment**: Section Group Container (same as Settings [21] — ink-brown-800, --r-xl, rows with dividers)
- **Variants**: Has payment method (shows card info), no payment method (free tier — section hidden or shows "no payment method")
- **Gestures**: Navigation rows tap to expand or navigate
- **Size**: Full-width minus 32pt (16pt margins) × auto

#### Payment Method Row
- **Visual treatment**: Settings Row — Navigation pattern. Left: card brand icon (16pt) + "Visa ····4242" (15pt Sora Regular). Right: chevron. Tap → payment method management (native IAP settings or in-app update flow).

#### Billing History Row
- **Visual treatment**: Settings Row — Navigation pattern. Left: "Billing history" (15pt Sora Regular). Right: chevron. Tap → expands inline to show recent charges: date, amount, status (paid/failed). Each history item: 13pt Sora Regular, white at 50%.

#### Restore Purchases Row
- **Visual treatment**: Settings Row — Navigation pattern. Left: "Restore purchases" (15pt Sora Regular). Right: chevron. Tap → triggers App Store restore flow.

### Downgrade / Cancel Rows
- **Purpose**: Allow users to downgrade or cancel subscription
- **Data source**: Current subscription API
- **Visual treatment**: Destructive Action Row pattern (from Settings [21]) — standalone, ink-brown-800, --r-md, #f44336 text, center-aligned.
- **Variants**: "Downgrade plan" (visible if on Plus/Pro/Max), "Cancel subscription" (visible if on any paid tier). Both hidden if on Free tier.
- **Gestures**: Tap → confirmation modal
- **Size**: Full-width minus 32pt (16pt margins) × 52pt each

### Downgrade Confirmation Modal
- Custom modal (z-50): "Downgrade to [tier name]?" / "You'll lose access to [list of features losing]. Your current plan continues until [end of billing period]."
- Two buttons: "Keep [current tier]" (orange CTA), "Downgrade" (ghost, #f44336 text)

### Cancel Confirmation Modal
- Custom modal (z-50): "Cancel subscription?" / "You'll lose access to all premium features at the end of your billing period ([date]). Your data will be preserved."
- Two buttons: "Keep subscription" (orange CTA), "Cancel subscription" (ghost, #f44336 text)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Card surfaces | #211008 | ink-brown-800 | z-10, tier cards + billing group |
| Current plan border | #FF5E00 | burnt-orange | 60% role — highlights current plan |
| Tier card border (non-current) | white at 5% | — | Neutral edge |
| Plan name text | white 100% | — | Primary heading |
| Price large | white 100% | — | High prominence |
| Price period "/mo" | white at 50% | — | Secondary |
| Feature included check | #FF5E00 | burnt-orange | 60% role — positive indicator |
| Feature excluded check | white at 20% | — | Muted indicator |
| Feature excluded text | white at 30% | — | Struck through |
| Feature included text | white at 70% | — | Readable |
| Upgrade CTA bg | #FF5E00 | burnt-orange | 60% role — primary action |
| Upgrade CTA text | white 100% | — | CTA label |
| Current plan CTA bg | #171717 | ink-700 | Disabled/neutral |
| Current plan badge | white at 50% | — | Non-actionable label |
| Recommended badge | #FF5E00 | burnt-orange | Draws eye to upgrade target |
| Usage bar track | #171717 | ink-700 | Empty portion |
| Usage bar fill (normal) | #FF5E00 | burnt-orange | Progress indicator |
| Usage bar fill (warning) | #F59E0B | amber | Approaching limit |
| Usage bar fill (critical) | #f44336 | red | Near/at limit |
| Renewal text | white at 40% | — | Tertiary info |
| Section header | white at 50% | — | Eyebrow label |
| Billing row text | white 100% | — | Row labels |
| Destructive text | #f44336 | red | Downgrade / cancel |
| Card icon / payment icon | full color | — | Brand recognition |

**60/30/10 verification**: Orange dominates this screen — current plan border, all feature checkmarks, upgrade CTAs, usage bar fill, recommended badge. It correctly serves the 60% accent role, driving attention to the upgrade path. Green does not appear on this screen in its default state (no success states visible). Purple does not appear (no SIA presence on this transactional screen). The ratio is orange-heavy by design: this is a conversion-oriented screen where the primary color drives action.

---

## Interaction States

### Upgrade CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 fill, white text "Upgrade" | — |
| Pressed | Darker orange + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (during IAP flow) | — |
| Loading | White spinner replaces text (IAP sheet loading) | — |
| Error | Error text below card ("Purchase failed. Try again.") | error notification |
| Success | Button morphs to green (#34A853) with checkmark, then screen refreshes with updated plan | success notification |

### Current Plan CTA (Disabled)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-700 bg, "Current plan" text at 50% | — |
| Pressed | N/A — disabled, no response | — |
| Focus-visible | 2pt white ring at 30%, offset 2pt | — |
| Disabled | This IS the default (always disabled) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Downgrade CTA (Ghost)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, white text | — |
| Pressed | Background white at 5%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | N/A (confirmation modal handles the flow) | — |
| Error | N/A | — |
| Success | N/A | — |

### Billing Settings Rows
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white text, chevron at 30% | — |
| Pressed | Background darkens, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring inset | — |
| Disabled | 0.5 opacity | — |
| Loading | Restore purchases: text replaced with spinner | — |
| Error | Restore: "No purchases found" inline message, 13pt, red | error notification |
| Success | Restore: "Purchases restored" green text for 3s | success notification |

### Destructive Action Rows (Downgrade/Cancel)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, #f44336 text, centered | — |
| Pressed | Background darkens, text at 70%, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring, offset 2pt | — |
| Disabled | 0.5 opacity (free users don't see these) | — |
| Loading | N/A (modal handles flow) | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Horizontal swipe | Tier cards area | Scroll between tier cards |
| Tap | Upgrade CTA | Trigger native IAP flow |
| Tap | Downgrade row | Show downgrade confirmation modal |
| Tap | Cancel row | Show cancel confirmation modal |
| Tap | Payment method row | Navigate to payment management |
| Tap | Billing history row | Expand inline history list |
| Tap | Restore purchases row | Trigger App Store restore |
| Swipe right from edge | Screen | Stack pop to previous screen |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Current plan card | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| Tier cards | Screen enter | Staggered slide-in from right | 280ms per card, 60ms stagger | ease-out-soft |
| Tier cards | Horizontal scroll | Native ScrollView momentum | N/A | iOS default |
| Usage bar fill | Screen enter | Width animates from 0 to current value | 520ms | ease-flow |
| Upgrade success | IAP complete | CTA morphs green (280ms), then full screen content refreshes (280ms) | 560ms total | ease-out-soft |
| Billing history | Expand tap | Height expands, content fades in | 280ms | ease-out-soft |
| Confirmation modals | Trigger | Slide up + backdrop fade | 520ms | ease-flow |
| Confirmation modals | Dismiss | Slide down + backdrop fade | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right, 280ms, ease-out-soft

---

## Empty States

### Day 1 (free user)
Current plan card shows "Free" with "$0/mo" and "Free plan — no renewal date." No AI usage bar. Tier cards are fully visible with Plus recommended. No billing section (no payment method on file). No downgrade/cancel rows visible.

### Established user (paid, no billing issues)
Full experience: current plan highlighted with orange border, usage meter (if applicable), billing section populated with payment method and history. Downgrade and cancel rows visible.

### Edge case: Payment failed
Current plan card shows warning state: amber (#F59E0B) border replacing orange, "Payment failed — update your payment method" message in 13pt Sora Regular, amber text. Payment method row gets a red dot indicator.

---

## Motivation Adaptation

- **Low motivation**: No changes — subscription management is utility, unaffected by motivation tier
- **Medium motivation**: Default experience
- **High motivation**: No changes — billing is always the same experience

---

## Cross-References

- **Navigates to**: Previous screen via stack pop, native IAP flow (system sheet), payment method management, Paywall [43] (if accessed from there, user may return)
- **Navigates from**: Me Main [17] via stack push (quick link), Settings [21] via stack push ("manage subscription" row), Paywall [43] via stack push ("see all plans")
- **Shared components with**: Settings [21] (Section Header, Section Group Container, Destructive Action Row, Navigation Header), Connected Services [22] (Status Badge concept adapted for plan badge)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1 — adapted for tier card CTA), Section Header (Batch 5), Section Group Container (Batch 5), Destructive Action Row (Batch 5), Settings Row — Navigation (Batch 5)
- **Patterns established**: Tier Card (with current/upgrade/downgrade variants), Current Plan Card (with usage bar and renewal), AI Usage Bar (with normal/warning/critical color states), Horizontal Scrolling Card Rail (for tier comparison), Downgrade/Cancel Confirmation Modals, Payment Failed Warning State
