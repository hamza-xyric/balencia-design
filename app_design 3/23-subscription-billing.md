# Screen Design: Subscription & Billing

**Screen**: 23 of 73
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
│  ┌──────────────────────┐   │
│  │ [Monthly | Annual ]  │   │  ← segmented toggle
│  └──────────────────────┘   │
│                             │  ← 12pt gap
│  ┌──────┐┌──────┐┌──────┐  │
│  │ Free ││ Plus ││ Pro  │→ │  ← horizontal scroll
│  │      ││ ████ ││      │  │     current plan highlighted
│  │ $0   ││ $20  ││ $60  │  │     (monthly prices shown)
│  │      ││      ││      │  │
│  │  ·   ││  ·   ││  ·   │  │     feature bullets
│  │  ·   ││  ·   ││  ·   │  │
│  │  ·   ││  ·   ││  ·   │  │
│  │      ││      ││      │  │
│  │[curr]││[curr]││[Upgr]│  │     CTA per card
│  └──────┘└──────┘└──────┘  │
│                             │
│  When Annual toggle active: │
│  ┌──────┐┌──────┐┌──────┐  │
│  │ Free ││ Plus ││ Pro  │→ │
│  │      ││ ████ ││      │  │
│  │ $0   ││$192/y││$576/y│  │     annual prices shown
│  │      ││[Save]││[Save]│  │     green "Save 20%" badge
│  │  ·   ││  ·   ││  ·   │  │
│  │  ·   ││  ·   ││  ·   │  │
│  │  ·   ││  ·   ││  ·   │  │
│  │[curr]││[curr]││[Upgr]│  │
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

3. **Billing Period Toggle** — 40pt
   - Purpose: Switch tier card pricing between monthly and annual
   - Content: Segmented control — "Monthly | Annual". Default selection = Monthly.

4. **Tier Cards (Horizontal Scroll)** — ~360pt
   - Purpose: Compare all 4 tiers, highlight current, drive upgrades
   - Content: 4 scrollable cards (Free, Plus, Pro, Max) with name, price, feature bullets, CTA

5. **Billing Section** — ~180pt
   - Purpose: Payment and billing management
   - Content: Payment method row, billing history expandable, restore purchases

6. **Destructive Actions** — ~120pt
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
- **Recommended badge** (on the tier one above current): "Recommended" — 12pt Sora Semibold, uppercase, Burnt Orange (#FF5E00), +0.12em tracking. Positioned above plan name. Only appears on one card.
- **Feature list**: Bullet list, left-aligned. Each item: orange checkmark icon (14pt, #FF5E00) + feature text (13pt Sora Regular, white at 70%). Items vertically stacked with 8pt gaps. Max 5 features visible; if more exist, show "and N more" link (13pt Sora Regular, orange, 44pt touch target) that expands the full list inline (280ms ease-out-soft). Features NOT included on this tier: gray checkmark (white at 20%) + text at white at 30%, struck through.
- **CTA button**: Bottom of card, full card width minus padding.
  - Current plan: "Current plan" label, ink-700 background, white at 50% text, disabled state
  - Upgrade: "Upgrade" / "Upgrade to [tier]", Burnt Orange fill, white text, --r-pill, 44pt height
  - Downgrade: "Downgrade", ghost button (transparent, 1pt border white at 10%, white text)

### Billing Period Toggle (Monthly / Annual)
- **Purpose**: Allow the user to switch all tier card prices between monthly and annual billing
- **Data source**: Static pricing data
- **Visual treatment**: Segmented control, full-width minus 32pt (16pt margins), 40pt height, ink-brown-800 background, --r-pill radius, 1pt border white at 5%. Active segment: Burnt Orange (#FF5E00) fill, white text (14pt Sora Semibold). Inactive segment: transparent fill, white at 50% text (14pt Sora Regular). Transition between segments: 200ms ease-out-soft (active indicator slides to tapped segment).
- **Default state**: "Monthly" selected
- **Placement**: Directly above the tier cards horizontal scroll, 12pt below the "ALL PLANS" section header, 12pt above the first tier card.
- **Gestures**: Tap inactive segment to switch. Active segment does not respond to tap.

#### Annual Pricing Table

| Tier | Monthly | Annual | Annual per-month equivalent | Savings |
|------|---------|--------|----------------------------|---------|
| Free | $0/mo | $0/yr | — | — |
| Plus | $20/mo | $192/yr | $16/mo | Save 20% |
| Pro | $60/mo | $576/yr | $48/mo | Save 20% |
| Max | $120/mo | $1,152/yr | $96/mo | Save 20% |

#### Annual Price Display (within tier card)
- When "Annual" is selected on the toggle, each tier card's price updates:
  - **Price**: 32pt Sora Bold, white. "$192" large + "/yr" in 15pt Sora Regular white at 50%. Center-aligned.
  - **Save badge**: Appears below the price, center-aligned. "Save 20%" — 11pt Sora Semibold, forest-green (#34A853) text on forest-green (#34A853) at 15% background, --r-pill radius, 4pt vertical padding, 8pt horizontal padding.
  - Free tier: No price change (always "$0"), no save badge.
- **Toggle animation**: When switching between Monthly and Annual, tier card prices cross-fade (opacity 1→0→1) over 200ms ease-out-soft. Save badge fades in 200ms with 80ms delay after price settles.

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

### Upgrade Confirmation Modal (Mid-Cycle Proration)
- Custom modal (z-50): Presented when a user taps "Upgrade" on a tier card and the user is currently on a paid plan mid-billing-cycle.
- **Header**: "Upgrade to [tier name]" — 18pt Sora Semibold, white
- **Proration message**: "You'll be charged the prorated difference for the remaining [X] days of your current billing period." — 14pt Sora Regular, white at 70%. [X] is dynamically computed from today to the current billing period end date.
- **Price breakdown**: Two rows:
  - "Prorated charge today" + "$[amount]" — 14pt Sora Regular, white at 70%
  - "Next full charge on [date]" + "$[new tier price]" — 14pt Sora Regular, white at 70%
- Two buttons: "Confirm upgrade" (orange CTA), "Cancel" (ghost, white text)

#### Proration Note — Downgrade Variant
When a user confirms a downgrade (via the Downgrade Confirmation Modal), the modal body includes the following additional line below the feature-loss message:
- "Your current plan continues until the end of your billing period on [date]. Your new plan starts after that." — 14pt Sora Regular, white at 70%. The [date] is formatted as "MMM DD, YYYY" (e.g., "Jun 15, 2026"). This ensures the user understands that downgrade is deferred, not immediate.

### Restore from Downgrade Flow

When a previously-paying user who was auto-downgraded to Free (due to failed payment and grace period expiry — see Failed Payment Recovery below) taps "Upgrade" on any tier card, a special confirmation modal is presented instead of the standard Upgrade Confirmation Modal.

#### Restore Confirmation Modal
- Custom modal (z-50), same visual container as other confirmation modals
- **Header**: "Welcome back!" — 20pt Sora Semibold, white, center-aligned
- **Body message**: "Your previous data and settings are still here. Pick up where you left off." — 14pt Sora Regular, white at 70%, center-aligned. 8pt below header.
- **Tier selection**: Below the message (16pt gap), the user's previously-held tier is pre-selected but all paid tiers are available. Display as a compact tier picker: three selectable pills in a horizontal row (Plus / Pro / Max), each 80pt wide × 36pt, --r-pill, 1pt border white at 10%. Selected pill: Burnt Orange (#FF5E00) fill, white text (13pt Sora Semibold). Unselected pill: transparent fill, white at 50% text (13pt Sora Regular). Tap to switch selection.
- **Price display**: Below tier picker (12pt gap). Shows the price of the selected tier: 18pt Sora Bold, white. E.g., "$20/mo" or "$192/yr" depending on billing period toggle state on the parent screen.
- **CTA**: "Resubscribe" — full modal width minus 48pt (24pt side margins), 48pt height, Burnt Orange (#FF5E00) fill, white text (16pt Sora Semibold), --r-pill, center-aligned. Triggers native IAP flow for the selected tier.
- **Secondary action**: "Cancel" — ghost button below CTA (8pt gap), transparent bg, white at 50% text (14pt Sora Regular). Dismisses modal.
- **Detection**: The system flags users for this flow when their `previous_subscription_tier` field is non-null and their `downgrade_reason` is `payment_failed_grace_expired`. The flag resets once the user successfully resubscribes or after 90 days.

### Failed Payment Recovery

This section covers the complete failed payment lifecycle: warning, grace period, downgrade, and payment method update flow.

#### Failed Payment Warning Banner
- **Purpose**: Alert the user that their most recent payment attempt failed and prompt immediate action
- **Placement**: Top of screen, directly below the navigation header (44pt). Pushes all content below it down. Visible on every visit to this screen while payment is in a failed state.
- **Visual treatment**: Full-width, 44pt height, amber (#F59E0B) background at 15%, 3pt solid left border amber (#F59E0B). Horizontal padding: 16pt. Content vertically centered.
- **Content layout**: Horizontal row, space-between.
  - Left: "Payment failed — update your method" — 14pt Sora Semibold, white.
  - Right: "Update" — 14pt Sora Semibold, Burnt Orange (#FF5E00), underline: none. 44pt × 44pt touch target (text right-aligned within target).
- **Gesture**: Tap "Update" → opens Payment Method Update Bottom Sheet (see below).
- **Grace period countdown variant**: During the 3-day grace period, the left text changes to include the countdown: "Payment failed — [N] days to update payment" where [N] is the remaining calendar days (3, 2, 1). When [N] reaches 0 on the final day: "Payment failed — update today to keep your plan".
- **Post-grace-period variant**: After 3 calendar days elapse without a successful payment, the banner text changes to: "Your subscription has been paused. Upgrade to restore your features." — 14pt Sora Semibold, white. The "Update" link is replaced with "Upgrade" — 14pt Sora Semibold, Burnt Orange (#FF5E00). Tapping "Upgrade" opens the Restore from Downgrade Flow modal (see Restore Confirmation Modal above).

#### Grace Period Rules
- **Duration**: 3 calendar days from the timestamp of the first failed payment attempt.
- **Feature access during grace period**: All features of the user's current paid tier remain fully active. No degradation of service.
- **Retry cadence**: The system automatically retries the charge once per day during the grace period (at the same time of day as the original failed attempt).
- **Notification**: Push notification sent on day of failure, day 2, and final day (day 3) with progressively urgent copy.
- **After grace period expiry**: If no successful payment is captured within 3 calendar days, the user is automatically downgraded to Free tier. The downgrade happens at the exact moment of grace period expiry (72 hours after first failure). The `downgrade_reason` field is set to `payment_failed_grace_expired` and `previous_subscription_tier` is preserved.

#### Payment Method Update Bottom Sheet
- **Purpose**: Allow the user to update or retry their payment method without leaving the Subscription & Billing screen
- **Trigger**: Tap "Update" on the Failed Payment Warning Banner
- **Visual treatment**: Standard bottom sheet — slides up from bottom (520ms ease-flow), dark backdrop (black at 50%). Sheet: ink-brown-800 background, --r-xl (28pt) top-left and top-right radius, 0pt bottom radius. Max height: 50% of screen. Padding: 24pt all sides. Drag handle: centered, 36pt × 4pt, white at 15%, --r-pill, 8pt top margin.
- **Content layout** (top to bottom):
  1. **Header**: "Update payment method" — 18pt Sora Semibold, white. 16pt below drag handle.
  2. **Current card display** (16pt below header): Card brand icon (24pt, full color) + "····[last 4 digits]" — 15pt Sora Regular, white at 70%. Horizontal row, left-aligned. If card is expired, append " (expired)" in #f44336 text.
  3. **"Try again" CTA** (16pt below current card): Full sheet width minus padding, 48pt height, Burnt Orange (#FF5E00) fill, white text "Try again with ····[last 4]" (15pt Sora Semibold), --r-pill, center-aligned. Tap → retries the failed charge with the existing card on file.
     - Loading state: White spinner replaces text.
     - Success: Button morphs to green (#34A853) with checkmark, bottom sheet auto-dismisses after 1.2s, warning banner disappears, current plan card refreshes.
     - Failure: Button returns to default, error text appears below: "Payment failed. Please update your card." — 13pt Sora Regular, #f44336, center-aligned.
  4. **"Update card" CTA** (12pt below "Try again"): Full sheet width minus padding, 48pt height, transparent fill, 1pt border white at 10%, white text "Update card" (15pt Sora Semibold), --r-pill, center-aligned. Tap → opens native payment method management (App Store subscription settings on iOS).
  5. **Bottom safe area**: 34pt (home indicator clearance on notched devices).
- **Dismiss**: Swipe down on sheet or tap backdrop. 280ms ease-out-soft slide-down + backdrop fade.

#### Failed Payment Warning Banner — ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]  Subscription & billing│  ← nav header
├─────────────────────────────┤
│▌ Payment failed — 2 days   [Update]│  ← warning banner
│▌ to update payment                 │     amber left border
├─────────────────────────────┤
│                             │
│  YOUR PLAN                  │
│  ┌───────────────────────┐  │
│  │  Plus       $20/mo    │  │
│  │  ...                  │  │
│  └───────────────────────┘  │
│         (rest of screen)    │
```

#### Payment Method Update Bottom Sheet — ASCII Wireframe

```
┌─────────────────────────────┐
│         (backdrop)          │
│                             │
│                             │
├─────────────────────────────┤
│         ─────────           │  ← drag handle
│                             │
│  Update payment method      │  ← header
│                             │
│  💳  ····4242               │  ← current card
│                             │
│  ┌───────────────────────┐  │
│  │ Try again with ····4242│  │  ← orange CTA
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    Update card        │  │  ← ghost CTA
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

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
| Annual save badge text | #34A853 | forest-green | Save 20% label |
| Annual save badge bg | #34A853 at 15% | forest-green-15 | Subtle badge background |
| Toggle active segment | #FF5E00 | burnt-orange | Monthly/Annual active |
| Toggle inactive text | white at 50% | — | Monthly/Annual inactive |
| Warning banner bg | #F59E0B at 15% | amber-15 | Failed payment alert |
| Warning banner border | #F59E0B | amber | Left accent border |
| Warning banner "Update" | #FF5E00 | burnt-orange | Action link |
| Bottom sheet bg | #211008 | ink-brown-800 | Payment update sheet |
| Restore modal header | white 100% | — | "Welcome back!" |
| Restore tier pill active | #FF5E00 | burnt-orange | Selected tier pill |
| Restore tier pill inactive | white at 10% border | — | Unselected tier pill |

**60/30/10 verification**: Orange dominates this screen — current plan border, all feature checkmarks, upgrade CTAs, usage bar fill, recommended badge. It correctly serves the 60% accent role, driving attention to the upgrade path. Green does not appear on this screen in its default state (no success states visible). Purple does not appear (no SIA presence on this transactional screen). The ratio is orange-heavy by design: this is a conversion-oriented screen where the primary color drives action.

---

## Interaction States

### Upgrade CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 fill, white text "Upgrade" | — |
| Pressed | Darker orange + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (during IAP flow) | — |
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
| Disabled | 0.4 opacity | — |
| Loading | N/A (confirmation modal handles the flow) | — |
| Error | N/A | — |
| Success | N/A | — |

### Billing Settings Rows
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white text, chevron at 30% | — |
| Pressed | Background darkens, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring inset | — |
| Disabled | 0.4 opacity | — |
| Loading | Restore purchases: text replaced with spinner | — |
| Error | Restore: "No purchases found" inline message, 13pt, red | error notification |
| Success | Restore: "Purchases restored" green text for 3s | success notification |

### Destructive Action Rows (Downgrade/Cancel)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, #f44336 text, centered | — |
| Pressed | Background darkens, text at 70%, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring, offset 2pt | — |
| Disabled | 0.4 opacity (free users don't see these) | — |
| Loading | N/A (modal handles flow) | — |
| Error | N/A | — |
| Success | N/A | — |

### Billing Period Toggle (Monthly / Annual)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (Monthly selected) | Monthly segment: orange fill, white text. Annual segment: transparent, white at 50% text | — |
| Pressed (inactive segment) | Inactive segment bg white at 5% | light impact |
| Transition | Active indicator slides to tapped segment, 200ms | — |
| Focus-visible | 2pt orange ring on the entire toggle, offset 2pt | — |

### Failed Payment Warning Banner
| State | Visual | Haptic |
|-------|--------|--------|
| Default (grace period) | Amber bg at 15%, amber left border, countdown text | — |
| Default (post-grace) | Same container, "paused" text, "Upgrade" link | — |
| "Update" / "Upgrade" pressed | Text darkens to 70% opacity | light impact |
| Hidden | Banner not rendered (no failed payment) | — |

### Payment Method Update Bottom Sheet — Try Again CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 fill, white text "Try again with ····[last 4]" | — |
| Pressed | Darker orange + scale(0.97) | light impact |
| Loading | White spinner replaces text | — |
| Success | Button morphs to green (#34A853) with checkmark | success notification |
| Error | Button returns to default, error text below in #f44336 | error notification |

### Payment Method Update Bottom Sheet — Update Card CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, white text | — |
| Pressed | Background white at 5%, scale(0.97) | light impact |
| Loading | Opens native settings — button disabled at 0.4 opacity | — |

### Restore Confirmation Modal — Tier Picker Pills
| State | Visual | Haptic |
|-------|--------|--------|
| Selected | #FF5E00 fill, white text, 13pt Sora Semibold | light impact (on selection change) |
| Unselected | Transparent fill, 1pt border white at 10%, white at 50% text | — |
| Pressed (unselected) | Background white at 5% | light impact |

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
| Tap | Billing period toggle segment | Switch between Monthly / Annual pricing |
| Tap | Warning banner "Update" link | Open Payment Method Update Bottom Sheet |
| Tap | Warning banner "Upgrade" link (post-grace) | Open Restore from Downgrade modal |
| Tap | Bottom sheet "Try again" CTA | Retry failed charge with existing card |
| Tap | Bottom sheet "Update card" CTA | Open native payment method management |
| Swipe down | Bottom sheet | Dismiss bottom sheet |
| Tap | Bottom sheet backdrop | Dismiss bottom sheet |
| Tap | Restore modal tier pill | Select tier for resubscription |
| Tap | Restore modal "Resubscribe" CTA | Trigger IAP for selected tier |
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
| Billing period toggle | Segment tap | Active indicator slides to tapped segment | 200ms | ease-out-soft |
| Tier card prices | Toggle switch | Cross-fade (opacity 1→0→1) | 200ms | ease-out-soft |
| Annual save badge | Toggle to Annual | Fade in (opacity 0→1), 80ms delay after price settles | 200ms | ease-out-soft |
| Warning banner | Screen enter (failed state) | Fade-in + height expand (0→44pt) | 280ms | ease-out-soft |
| Bottom sheet | "Update" tap | Slide up from bottom + backdrop fade | 520ms | ease-flow |
| Bottom sheet | Dismiss | Slide down + backdrop fade | 280ms | ease-out-soft |
| Bottom sheet success | Charge succeeds | Button morphs green, auto-dismiss after 1.2s | 280ms morph + 1200ms hold | ease-out-soft |
| Restore modal | Trigger | Slide up + backdrop fade | 520ms | ease-flow |
| Restore modal | Dismiss | Slide down + backdrop fade | 280ms | ease-out-soft |

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

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Section header eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase |
| Current plan name | Sora | Semibold | 20pt | 26pt | white 100% |
| Current plan price | Sora | Regular | 15pt | 20pt | white at 50% |
| AI usage label | Sora | Regular | 12pt | 16pt | white at 50% |
| Renewal date | Sora | Regular | 13pt | 18pt | white at 40% |
| Tier card plan name | Sora | Semibold | 18pt | 24pt | white 100% |
| Tier card price large | Sora | Bold | 32pt | 40pt | white 100% |
| Tier card price period | Sora | Regular | 15pt | 20pt | white at 50% |
| Recommended badge | Sora | Semibold | 12pt | 16pt | #FF5E00, uppercase |
| Feature list item | Sora | Regular | 13pt | 18pt | white at 70% / white at 30% (excluded) |
| Toggle segment active | Sora | Semibold | 14pt | 18pt | white 100% |
| Toggle segment inactive | Sora | Regular | 14pt | 18pt | white at 50% |
| Save badge | Sora | Semibold | 11pt | 14pt | #34A853 |
| Billing row text | Sora | Regular | 15pt | 20pt | white 100% |
| Billing history item | Sora | Regular | 13pt | 18pt | white at 50% |
| Destructive row text | Sora | Regular | 15pt | 20pt | #f44336, center-aligned |
| Warning banner text | Sora | Semibold | 14pt | 18pt | white 100% |
| Warning banner action | Sora | Semibold | 14pt | 18pt | #FF5E00 |
| Bottom sheet heading | Sora | Semibold | 18pt | 24pt | white 100% |
| Proration message | Sora | Regular | 14pt | 20pt | white at 70% |
| Restore modal header | Sora | Semibold | 20pt | 26pt | white 100% |
| Restore modal body | Sora | Regular | 14pt | 20pt | white at 70% |
| Restore tier pill selected | Sora | Semibold | 13pt | 18pt | white 100% |
| Restore tier pill unselected | Sora | Regular | 13pt | 18pt | white at 50% |
| Restore CTA text | Sora | Semibold | 16pt | 22pt | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| IAP purchase fails | "Purchase failed. Try again." error text below tier card CTA; button returns to default | User retries upgrade tap |
| IAP purchase cancelled | Loading indicator dismisses; no error shown; user returns to current state | None needed |
| Restore purchases — none found | "No purchases found" inline message in red below Restore row | User contacts support if incorrect |
| Restore purchases — success | "Purchases restored" green text for 3s; plan card refreshes | None needed |
| Failed payment (grace period) | Amber warning banner at top with countdown: "Payment failed — [N] days to update payment" | Tap "Update" to open Payment Method Update Bottom Sheet |
| Failed payment (post-grace) | Banner changes to: "Your subscription has been paused. Upgrade to restore your features." | Tap "Upgrade" to open Restore from Downgrade modal |
| Payment retry fails (bottom sheet) | "Try again" button returns to default; error text: "Payment failed. Please update your card." | User taps "Update card" to change payment method |
| Downgrade/cancel API fails | Modal shows inline error: "Could not process. Please try again." | User retries from modal |
| Plan data fails to load | Tier cards show skeleton shimmer; after timeout, "Could not load plans. Pull to retry." | Pull-to-refresh |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Current plan card: "Current plan, [plan name], [price], renews [date]"
- AI usage bar: "AI usage, [percentage] used"
- Billing period toggle: "Billing period, [Monthly/Annual] selected, segmented control"
- Tier card: "[Plan name], [price per period], [current/upgrade/downgrade]"
- Upgrade CTA: "Upgrade to [plan name], button"
- Current plan CTA: "Current plan, disabled"
- Feature checkmarks: "Included: [feature]" / "Not included: [feature]"
- Downgrade row: "Downgrade plan, button, destructive"
- Cancel row: "Cancel subscription, button, destructive"
- Warning banner: "Warning, payment failed, [countdown text], Update button"

**Focus order:**
1. Back button
2. Warning banner (if visible) → "Update"/"Upgrade" action
3. Your Plan section header → Current plan card
4. All Plans section header → Billing period toggle → Tier cards (left to right, each: name, price, features, CTA)
5. Billing section header → Payment method row → Billing history row → Restore purchases row
6. Downgrade plan row
7. Cancel subscription row

**Gesture alternatives:**
- Horizontal swipe on tier cards also navigable via VoiceOver left/right swipe
- Swipe-right-from-edge (back) also available via back button tap
- Bottom sheet dismiss via drag-down or tap backdrop; also available via "Cancel" button
- All CTA buttons meet 44pt minimum touch target
- Toggle segments are reachable via VoiceOver flick gestures

---

## Cross-References

- **Navigates to**: Previous screen via stack pop, native IAP flow (system sheet), payment method management, Paywall [43] (if accessed from there, user may return), Celebration Overlay [42] (subscription success variant — triggers after successful IAP purchase confirmation)
- **Navigates from**: Me Main [17] via stack push (quick link), Settings [21] via stack push ("manage subscription" row), Paywall [43] via stack push ("see all plans")
- **Shared components with**: Settings [21] (Section Header, Section Group Container, Destructive Action Row, Navigation Header), Connected Services [22] (Status Badge concept adapted for plan badge)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1 — adapted for tier card CTA), Section Header (Batch 5), Section Group Container (Batch 5), Destructive Action Row (Batch 5), Settings Row — Navigation (Batch 5)
- **Patterns established**: Tier Card (with current/upgrade/downgrade variants), Current Plan Card (with usage bar and renewal), AI Usage Bar (with normal/warning/critical color states), Horizontal Scrolling Card Rail (for tier comparison), Billing Period Toggle (Monthly/Annual segmented control), Annual Save Badge (forest-green pill), Downgrade/Cancel/Upgrade Confirmation Modals (with proration logic), Failed Payment Warning Banner (with grace period countdown), Payment Method Update Bottom Sheet, Restore from Downgrade Confirmation Modal, Payment Failed Warning State
