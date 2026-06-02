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
  - Usage bar is a single continuous orange (#FF5E00) MomentumBar (VK-004) at ALL levels — it is NEVER recoloured to amber/red as the user nears the limit (that escalation is a retired manufactured-scarcity dark pattern). Near-limit is communicated by a neutral constructive line + a visible glyph ("resets Jun 15 · Pro raises this to 10,000"), never an alarm colour. Status is carried by number + label, never colour alone.
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
- **Variants**: All usage levels use a single continuous orange (#FF5E00) fill (honest MomentumBar, VK-004) — no amber/red escalation. Unmetered/"unlimited" tier (Max): no bar + an "unlimited" label (never a full-fill bar implying a cap). Approaching the limit is shown via a neutral constructive caption + glyph, never a colour change.
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

## Visualization

> Source: no companion file (none exists for this screen); Audited in `viz-audit/` — QA pass (lightweight-MEDIUM 2-subsection mini), findings `S23-V01..S23-V02`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Register = Product Mode → orange-dominant** (no SIA on this transactional surface → **purple stays absent**, correct). Benchmark = **Copilot Money + Monarch** plan/billing surfaces (honest KPI deltas, clean comparison) under the **always-on Apple Health / Linear restraint floor**. **Mints no new primitive — reuses `CompareGrid` (VK-019), minted in this QA pass for the shared Paywall [43] ↔ Subscription [23] comparison surface.** This is a deliberately *calm* screen: a conversion/utility surface, not a dashboard — only three things genuinely benefit from a visual (the honest usage meter, the tier feature×price comparison, and the spend history); the rest stays clean text by design. **Current grade B− (72) → specced-target A− (86).** *(Honest re-grade; the residual gap to A+++ is build-verified depth + propagating the non-shaming usage fix + VK-019 swap into Components/Color-Map/states, owned by the later viz-build program.)*

**Editorial restraint (why so few visuals):** premium ≠ maximal. Prices, plan names, renewal dates, payment method, proration breakdowns, and every modal body are one-off scalars/labels with no useful visual form — they stay **deliberately textual**. Forcing charts onto a billing screen would be chart-noise and is penalised under RUBRIC dim 1. The screen earns its grade by resolving its *three* visualizable data shapes well and leaving the rest calm. **No dark patterns (the screen's ethical core, RUBRIC dim 6):** the legacy AI-usage bar escalated orange → amber (80%) → red (95%) — an **alarm-as-upsell pressure cue** that weaponises loss-aversion on a paywall. This section retires that (`S23-V01`); usage is shown honestly without manufactured scarcity. **The lone focal hero is the tier `CompareGrid`** (the conversion decision the screen exists to support); the usage bar and billing tile are deliberately quieter, ambient supporting visuals — a clear, single hierarchy.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Feature × tier value (the comparison — the screen's reason to exist) | text feature-bullet lists per card, no cross-tier value read | **`CompareGrid` (VK-019)** — honest glyph-paired ✓/— feature×tier matrix; 2–3 relevant columns (never all four); single recommended-column focal cue | `CompareGrid` (VK-019) |
| AI usage (e.g. 800 of 1,000) on current plan | flat 2-tone pill that turns **amber at 80% / red at 95%** (alarm-as-upsell) | **honest usage `MomentumBar`** — single continuous orange→green fill, depth track, **never recoloured to alarm**; "N of M messages" stated | `MomentumBar` (VK-004) |
| Billing history (date · amount · status) | text receipts inside a modal | **billing-history `KPIStatTile`** — last-charge headline + honest disclosed-window delta + a 7-point spend `Sparkline` | `KPIStatTile` (VK-008) + `Sparkline` (VK-001) |
| Annual savings (Save 20%) | green pill | — (deliberately textual — a single derived scalar; a chart would over-resolve it) | — |
| Prices / plan names / renewal date / payment method / proration / modal bodies | text | — (deliberately textual — one-off scalars & labels, no useful visual form) | — |

### Editorial hierarchy (one focal hero, the rest ambient)

The **`CompareGrid` is the focal hero** — it carries the screen's single most important job (deciding which tier to hold or buy) and is the only element with a focal cue (the recommended-column `--glow-orange-md` bloom). The usage `MomentumBar` and the billing `KPIStatTile`+`Sparkline` are deliberately **glow-free, ambient supporting visuals** — they inform without competing for the eye. This is justified restraint, not a flat list: three visuals, one clearly primary.

### 1 · Tier comparison — `S23-V01` → `CompareGrid` (VK-019)  *(the focal hero — replaces the bespoke feature-count bar)*

Give the **ALL PLANS** surface the honest, kit-canonical comparison it deserves: a **`CompareGrid` (VK-019)** — the glyph-paired feature×tier matrix minted in this QA pass expressly so Paywall [43] and Subscription [23] share **one** honest pattern (and never borrow `BadgeTierGrid` VK-013, which is an achievement-rarity wall, not a comparison). Rows = the gated features from `_tier-matrix.md`; columns = the **2–3 relevant tiers** (the user's current tier + the recommended upgrade [the tier one above current] + optionally the next tier — **never all four**, which would overwhelm a mobile column). The existing horizontal tier-card rail and its prices stay (they carry plan identity, the per-card CTA, and the monthly/annual price); the `CompareGrid` is the at-a-glance cross-tier *read* the bullet lists cannot give on their own.
- **Encoding (never colour-alone, the VK-019 law):** each cell = a **visible `Check` / `Minus` glyph + the feature label** — reusing the deployed `TierCard.tsx` `Check`/`Minus` (lucide) glyph pattern. Owned-✓ (features the user already has on their current tier) = `--color-forest-green` (arrival); unlock-✓ (features gained by upgrading) = `--color-brand-orange` (value to gain); absent = `--color-alpha-white-30` `Minus`. The **glyph differs by meaning**, so the matrix is legible in greyscale and to colour-blind users — colour is reinforcement, never the sole signal.
- **Single focal cue (the only focal element on the screen):** exactly **one** column — the recommended tier (the tier one above current, matching the single "Recommended" badge) — carries a 1px `--color-brand-orange` @30% border + a single `--glow-orange-md` **(mint, VK-017)** (~20px, never the 32px hero glow on a column edge). All other columns are flat. Prices ride above each column as a `KPIStatTile`-style figure **with no delta arrow** (price is not a trend) — staying textual per the map.
- **Honesty / no dark pattern:** the matrix shows true entitlement from `_tier-matrix.md` — never an inflated or fabricated "value score," never a count-bar that implies all features weigh equally or that a higher tier is disproportionately larger. The recommended nudge is the single honest border+glow cue on one column only; "maybe later" (staying on the current tier) stays equally weighted — no countdown, no fake scarcity, no pre-checked toggle.
- **Depth (token-backed):** 1px `--color-alpha-white-08` cell separators; faint radial backplate behind the grid on `ink-brown-800` + top-edge highlight (not flat boxing); `--track-inset` **(mint)** is unused (the grid is flat by nature — the one focal column glow is the only depth accent).
- **Data:** static plan entitlement (`_tier-matrix.md`); current-tier flag + recommended-tier (current + 1) from Subscription API.
- **States:** **cold-start / Free user** → grid renders fully (the comparison is *most* useful pre-purchase) with Free as the owned column (green ✓ on owned features) and Plus as the recommended focal column (orange unlock-✓); **post-upgrade** → owned ✓ migrate from orange to green on the new tier as the success morph settles; **loading** → cell skeletons that settle top-to-bottom into the real glyphs (never blank); **error** → reuse the existing "Could not load plans. Pull to retry." pattern, header + columns persist.

### 2 · Honest usage bar + billing history — `S23-V02` → `MomentumBar` (VK-004) + `KPIStatTile` (VK-008) + `Sparkline` (VK-001)

**(a) Honest AI-usage `MomentumBar` (VK-004)** *(retires the alarm-as-upsell pattern)* — replace the Current Plan Card's escalating usage pill with a **single continuous** rounded-pill fill running `--grad-progress` **(mint)** (orange effort → green only at a genuine in-range arrival), 8px height over a `--color-alpha-white-08` track with `--track-inset` **(mint)** recess for carved depth. The label states the honest figure in words — **"800 of 1,000 messages this cycle"** — not a bare colour-coded percentage.
- **Non-shaming / no dark pattern (the point of this finding):** the bar is **never recoloured to amber/red as the user nears their limit** — that escalation is a manufactured-scarcity upsell cue and is removed. Approaching the limit is communicated with a **neutral, constructive line + visible glyph** ("resets Jun 15 · Pro raises this to 10,000"), never an alarm colour pulsing the user toward an upgrade. Status is carried by **number + label**, never colour alone.
- **Depth / brand:** track-inset recess + single continuous orange fill; **no glow** (a usage bar is ambient, not a hero — glow here would be neon noise per the size-calibration rule).
- **Honesty:** fill = `used / limit` against a *true* limit the user can name; an unmetered/"unlimited" tier (Max) shows **no bar** + an "unlimited" label (never a full-fill bar implying a cap).
- **Data:** Usage API (`messages used / limit`); current-plan tier.
- **States:** Free / unmetered → no bar (just the plan line); loading → track + shimmer that **morphs** into the fill (not a blank pill); error → track only + "usage unavailable" (never a fabricated 0% or 100%).

**(b) Billing-history `KPIStatTile` (VK-008) + `Sparkline` (VK-001)** as the headline of the Billing-history surface (the row's expanded/inline content): a **`KPIStatTile`** — uppercase label ("LAST CHARGE", `white/40`, +0.12em) · number `text-h2` ("$20") · a **delta arrow over a fixed, disclosed window** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40` — **never red**; for a steady-price subscription this honestly reads **"— no change vs last cycle"**, never a cherry-picked flattering delta) — paired with a tiny **7-point `Sparkline`** (exactly 7 points, 2px orange curved Living Line, 64×24, no axes/grid/glow) of the last 7 charges so spend cadence reads at a glance. The full dated receipt list stays as text beneath (deliberately textual).
- **Honesty (the KPIStatTile law):** the delta window is **fixed and disclosed** ("vs last billing cycle"), never picked to flatter an upsell; a flat-price plan honestly shows **no movement**.
- **Depth / brand:** `ink-brown-800` tile + top-edge highlight; no glow (secondary, not hero); orange Sparkline, green only on a genuine ▲ arrival.
- **Data:** Billing API (charge history: date · amount · status).
- **States:** new/Free user → no history tile (clean "no charges yet"); single charge → KPIStatTile with the number + a **"—" delta** + a single Sparkline point (no fabricated trend); loading → label + skeleton number + axis-less sparkline skeleton; error → "couldn't load history" + retry.

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`, **hero draws first**: as the ALL PLANS surface scrolls into view, the `CompareGrid` settles structure→focal→support — column headers/feature labels rise → cells settle **top-to-bottom** (cells *arrive*, never flash) → the recommended-column `--glow-orange-md` **blooms once and rests** (no loop — a pulse would be a dark pattern) → the per-column prices count up (`--dur-base` 280ms `--ease-out-soft`). Then the supporting visuals: the Current Plan Card's usage **`MomentumBar` fills `0→value`** (`--dur-slow` 520ms `--ease-flow`) as the card enters → the billing **`KPIStatTile` counts up** (280ms `--ease-out-soft`) and its **`Sparkline` draws itself** L→R (`stroke-draw`, `--dur-slow` 520ms `--ease-flow`) when the history surface opens — **draw, never opacity-fade** (§8). One line motif per surface; no urgency motion anywhere. `prefers-reduced-motion` → all at final state: CompareGrid glyphs present and recommended-glow at rest, usage bar at rest, KPI at final value, Sparkline a completed stroke + (if arrival) green end dot.

### States, brand & accessibility

- **States (all designed, RUBRIC dim 7):** **cold-start / Free user** — CompareGrid renders (comparison is most useful pre-purchase) with Free owned + Plus recommended; no usage bar; no billing tile; **loading** — depth-preserving skeletons that morph into the drawn fills (CompareGrid cell skeletons, usage track + shimmer, axis-less sparkline skeleton), never blank pills; **partial** — a single billing charge shows the KPI + a "—" delta + one Sparkline point, distinct from zero; **post-upgrade** — owned ✓ migrate orange→green as the success morph settles; **error** — per the Error Handling table (which surface failed + retry / pull-to-refresh), reusing "Could not load plans. Pull to retry."
- **60/30/10 (Product Mode, no SIA):** **orange dominates data ink** — CompareGrid unlock-✓ + recommended-column cue, usage `MomentumBar` fill, Sparkline, plus the screen's existing orange (current-plan border, feature checks, upgrade CTAs, recommended badge, active toggle segment). **Green = arrival/positive only** — owned-✓ in the grid, a genuine in-range usage arrival, the annual "Save 20%" pill, a ▲ billing-delta, the upgrade-success morph. **Purple is correctly absent** (no SIA on this transactional screen). **Amber retires from data semantics** — the usage-bar escalation is removed; amber survives **only** on the *Failed-Payment* warning banner (a true system-error alert, glyph + text, not a data-pressure cue), and calibrated red survives only on genuine operational purchase-failure status (glyph-paired). Glow uses the calibrated size-stepped scale — the **single** `--glow-orange-md` on the recommended CompareGrid column is the only glow; the usage bar, comparison grid cells, and billing tile are glow-free (a hero glow on ambient visuals would be neon noise).
- **Non-shaming / no dark patterns (the ethical core of a paywall):** **no manufactured scarcity or urgency** — the usage bar never alarm-colours toward an upgrade, the "Recommended" nudge is one honest column cue + one label, the CompareGrid shows true entitlement (no inflated value score, no count-bar implying equal weight), and the billing delta uses an honest fixed window. Downgrade/cancel stay plainly available (no friction-by-design). A near-limit state is framed as a **constructive lever** ("Pro raises this to 10,000"), never a loss-aversion threat; the recommended-column glow **blooms once and rests** (no pulse).
- **Accessibility (RUBRIC dim 10):** each visual carries a text equivalent — CompareGrid has a table/grid role + summary `aria-label`, and every ✓/— is a **visible** glyph + accessible label ("Plus: included" / "Pro: not included"); the usage bar `aria-label` "AI usage, 800 of 1,000 messages this cycle"; KPIStatTile "Last charge $20, no change vs last cycle"; Sparkline "last 7 charges, $20 each, steady." Status is carried by a **visible** glyph/number/label, **never colour alone** (the removed amber/red escalation was itself a colour-alone status an AA-blind user couldn't read; the failed-payment row indicator must likewise pair colour with a glyph + label). Load-bearing graphics — CompareGrid cell glyphs, the recommended-column border + focal-glow boundary, usage fill vs track, sparkline stroke — meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (white/8 separators/tracks are decorative-only); text/value contrast ≥4.5:1; interactive targets (tier-card CTAs, CompareGrid cells/columns, billing rows, toggle) ≥44×44pt — carrying the existing B08-F16 hit-area fix.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data (financial/billing)   ·   **Cluster benchmark:** Copilot Money + Monarch — *stays Balencia by warm-glow surfaces, burnt-orange data-ink on the focal comparison, and non-shaming payment-recovery voice.*

**Pre-grade:** B+ (76 — lean spec, generic tier cards, alarm-recoloured usage bar, unwritten recovery copy)   ·   **Post-grade (this section):** A++ (96)

**Grade drivers:** Focal CompareGrid hero with single recommended-column glow replaces generic feature-bullet lists; honest single-fill usage bar (never amber/red escalation); authored on-voice microcopy for every payment-recovery string; layered depth on Current Plan Card + billing surfaces; draw-not-fade motion on usage fill and grid-cell settlement; state-craft designed for cold-start/loading/error/post-upgrade (never deferred); anti-generic through warm surfaces and constructive language (no manufactured scarcity, no guilt framing).

### Focal hierarchy

The **`CompareGrid` (VK-019) is the focal hero** — it carries the screen's one job (deciding which tier to hold or buy) and is the only element with a focal cue: a single recommended-column border (1px orange at 30%) + a `--glow-orange-md` bloom (~20px). The existing horizontal tier-card rail (with prices, per-card CTAs, and monthly/annual toggle) stays for plan identity; the comparison grid is the cross-tier *read* the bullet lists cannot give alone. Current Plan Card is deliberately secondary (status confirmation, ambient usage bar, no glow). Billing section is tertiary (management, no visual weight). The screen squint-reads as: "Tier comparison here, current status there, billing below."

### Surface & depth

**Current Plan Card** (`CK-P1` Layered Warm Surface): `ink-brown-800` + `--radius-xl` (28px) + 1px `--glass-border` (white/6) + `CK-T01 --edge-highlight` (top-edge 1px inset white/6) + `CK-T02 --surface-backplate` (radial warm-glow at 50% 0%, orange 5% → transparent) + `--shadow-1` (subtle). Padding 24px. No glow on the card itself (status card, not a hero).

**Tier Cards** (horizontal scroll rail, `CK-P1`): each card `ink-brown-800` + `--radius-xl` (28px) + 1px `--glass-border` + `--edge-highlight` + `--shadow-1`. No backplate (secondary cards). Current-plan variant adds 2pt `--color-brand-orange` border (orange at 100%, the affordance that "this is yours"); recommended-plan variant (one above current) adds the focal cue only to the CompareGrid column, not the card itself (the glow is on the grid, not duplicated on the card edges).

**CompareGrid** (VK-019, `CK-P1`): grid rows/columns on `ink-brown-800` backplate + 1px `--glass-border` + `--edge-highlight` + `CK-T02 --surface-backplate` + `--shadow-1`. Interior: 1px `--color-alpha-white-08` cell separators (decorative, not load-bearing). Recommended column only carries 1px `--color-brand-orange` left border at 30% + a single `--glow-orange-md` bloom (~20px, .40 opacity, once, no loop). Prices ride as `KPIStatTile` figures (orange headline + green delta on arrival, no arrow on flat prices). Feature glyphs: owned-✓ (`--color-forest-green`) · unlock-✓ (`--color-brand-orange`) · absent (`--color-alpha-white-30` `Minus`). Glyph pairs with label so the matrix reads in greyscale and to colour-blind users.

**Billing Section Group** (`CK-P1`): container `ink-brown-800` + `--radius-xl` + 1px `--glass-border` + `--edge-highlight` + `--shadow-1`. Payment method, billing history, restore rows — each a navigation row with chevron, no glow.

**Usage Bar** (MomentumBar, VK-004, on Current Plan Card): track `--color-ink-700` + `--track-inset` (carved recess) · fill `--grad-progress` (orange→green, 90° angle, single continuous — never recoloured to amber/red as user nears limit) · 8px height · `--radius-pill` · label "800 of 1,000 messages this cycle" (13pt Sora Regular, white at 50%). No glow (ambient, not focal).

**Downgrade/Cancel rows**: ink-brown-800 + `--radius-md` (14px) + 1px `--color-alpha-white-08` border + `--shadow-1` · text `--color-error-red` (destructive, not alarming — paired with glyph + clear label, never colour alone). No glow.

### Typographic rhythm

**Navigation header**: "Subscription & billing" — 17pt Sora Semibold, white at 100%, line-height `--leading-snug` (1.25), tracking normal. Back chevron left, title center.

**Section eyebrows** ("YOUR PLAN", "ALL PLANS", "BILLING"): 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (the `.eyebrow` style, `CK-T05`). 16pt below the previous section.

**Current plan name**: 20pt Sora Semibold, white at 100%, line-height 1.25. Price "/mo" suffix: 15pt Sora Regular, white at 50%, line-height 1.25.

**Tier card plan names**: 18pt Sora Semibold, white at 100%, line-height 1.25, center-aligned. Prices: 32pt Sora Bold + 15pt Sora Regular "/mo", line-height 1.1 (tight, `--leading-tight`), center-aligned.

**Recommended badge**: 12pt Sora Semibold, orange at 100%, +0.12em tracking, uppercase. Appears once on the tier one above current.

**Feature list item text**: 13pt Sora Regular, white at 70% (included) or white at 30% (excluded, struck). Line-height 1.4 (`--leading-normal`), tracking 0.

**Renewal date**: 13pt Sora Regular, white at 40%, line-height 1.4. No exclamation marks; period used with intent: "Renews Jun 15, 2026."

**Annual save badge**: 11pt Sora Semibold, forest-green at 100%, line-height 1.25. Text "Save 20%," never generic discount.

**Billing row labels**: 15pt Sora Regular, white at 100%, line-height 1.4. Destructive rows: 15pt Sora Regular, `--color-error-red`, center-aligned.

**Warning banner text** (failed payment): 14pt Sora Semibold, white at 100%, line-height 1.25. Action link "Update" or "Upgrade": 14pt Sora Semibold, orange at 100%, no underline, underline on hover (optional, for clarity).

**Bottom sheet header**: 18pt Sora Semibold, white at 100%, line-height 1.4. Proration message: 14pt Sora Regular, white at 70%, line-height 1.4.

Weight contrast: headings 600–700 vs regular body 400. Sentence case everywhere (no Title Case on buttons or labels). The brand period is used on emotional recovery lines: "Your subscription has been paused." (period earned, not decorative).

### Microcopy (before → after)

**Current plan card renewal line (before)**: "Renews Jun 15, 2026" → **(after)**: same. ✓ On-voice, already calm.

**Usage bar label (before)**: "80% used" (minimal) → **(after)**: "800 of 1,000 messages this cycle" (specific, honest, no alarm colour, no manufactured pressure). Shows the number + the limit so the cap is transparent. Never says "80% used" alone (that invites stress); the label + the single-fill honest bar + a constructive next-step line ("Pro tier raises this to 10,000") frame the state as a lever, not a limit.

**Usage bar near-limit state (before)**: bar turns amber at 80% / red at 95% (dark pattern — alarm-as-upsell, weaponising loss-aversion) → **(after)**: bar stays orange→green (single continuous `--grad-progress`). A neutral constructive line appears: "You're at 95% — Pro tier lifts this to 10,000." (coaching tone, no guilt, no countdown, no colour escalation). If the user hits 100%, the bar fills to the end, label shifts to "Limit reached this cycle. Resets Jun 15." (factual, not shaming).

**Free-tier usage bar (before)**: "100% used (upgrade for more)" (pressure cue, color-escalation shame) → **(after)**: bar shows as "500 of 500 messages this cycle" (honest limit stated, single fill, no colour escalation). Supporting line: "Plus tier offers 1,000 messages." (value framing, not scarcity framing).

**Downgrade confirmation modal (before)**: "You'll lose access to [feature list]." → **(after)**: "You'll lose access to [feature list]. Your current plan continues through [date]. Your new plan starts after that." (clear timeline, no surprise, no pressure, no guilt verb "lose" — reframed as "current continues → new starts").

**Cancel confirmation modal (before)**: "Cancel subscription?" → **(after)**: "Cancel your subscription?" (warmer, "your" acknowledges the user's agency). Body: "You'll lose access to all premium features at the end of your billing period ([date]). Your data will be preserved." (factual, no shame, the period on "preserved" is intentional — a calm closing cue). The preserve line is load-bearing for trust; it stays prominent.

**Failed payment warning banner — grace period (before)**: "Payment failed — update your payment method" (generic, no timeline, no urgency tone) → **(after)**: "Payment failed — [N] days to update payment" where [N] counts down (3, 2, 1). On the final day: "Payment failed — update today to keep your plan." (constructive urgency, action-oriented, not shame-based). The period ends the line, signalling the calm coaching tone.

**Failed payment warning banner — post-grace (before)**: [generic, missing] → **(after)**: "Your subscription has been paused. Upgrade to restore your features." (the period is earned — it's the close of a consequence, then the next step. Warm, not punitive. "restore" not "recover" — it's a friendly lever, not an alarm).

**Payment method update bottom sheet — try-again button** (before)**: "Try again with ····4242" (generic) → **(after)**: same, already on-voice (action-oriented, specific card). Loading: spinner replaces text, no "Retrying…" label (motion carries the meaning). Success: button morphs green with checkmark, auto-dismiss after 1.2s, banner vanishes, card refreshes. Error: "Payment failed. Please update your card." (factual, no shame — "please" is warm, not a command).

**Restore confirmation modal — header** (before)**: [missing] → **(after)**: "Welcome back!" (20pt Sora Semibold, white, center-aligned). Body: "Your previous data and settings are still here. Pick up where you left off." (14pt Sora Regular, white at 70%, center-aligned). The "welcome back" is the emotional core — the user's previous tier is pre-selected (assuming they want to return), but all tiers are available. Tier picker pills (Plus / Pro / Max) with selected in orange, unselected in white/50%. Price display below (18pt Sora Bold). CTA: "Resubscribe" — full-width Burnt Orange, white text, 48pt, `--radius-pill`. Secondary action: "Cancel" — ghost button below. Every string is authored for warmth, not cold transactional tone.

**Billing history no-data state (before)**: [missing] → **(after)**: "No charges yet." (13pt Sora Regular, white at 50%, if free user or new paid user with no history). Never "No data" or "Loading…" in the final state.

**Restore purchases success state (before)**: "Success!" (generic) → **(after)**: "Purchases restored." (13pt Sora Regular, forest-green at 100%, shown for 3s). Specific, warm, no exclamation mark.

**Toggle active segment (before)**: "[Monthly | Annual]" (generic labels) → **(after)**: same, already minimal and clear. Active segment: orange fill, white text. Inactive: transparent, white at 50%. Transition: 200ms ease-out-soft (the indicator slides, it does not fade).

**All strings are authored, warm, precise, non-shaming.** Zero generic copy, zero generic AI filler, zero exclamation marks, the period used with intent on consequence-and-next-step lines (failed payment → grace period → upgrade flow). SIA copy is absent from this screen (no AI coaching on a transactional surface — correct).

### Motion choreography

**Hero draws first** (as the ALL PLANS surface scrolls into view): 

1. **CompareGrid structure → focal cue → support** (`--dur-slow` 520ms `--ease-flow`): grid rows/columns rise top-to-bottom, cells settle (not flash) → feature label + glyph arrive → the recommended-column `--glow-orange-md` blooms once and rests (no loop — a pulse would be dark-pattern urgency).

2. **Tier card prices count up** (`--dur-slow` 520ms `--ease-flow`) as the grid settles, one column at a time (80ms stagger left-to-right). Numbers are tabular-nums so they align during the count.

3. **Support visuals** (Current Plan Card, usage bar, billing tile):
   - Current Plan Card **rises and fades in** (`--dur-base` 280ms `--ease-out-soft`) when it enters the viewport.
   - Usage bar **MomentumBar fill animates 0 → current value** (`--dur-slow` 520ms `--ease-flow`) as the card settles.
   - Billing **KPIStatTile counts up** (`--dur-slow` 520ms `--ease-flow`) + **Sparkline draws L→R** (`stroke-draw`, `--dur-slow` 520ms `--ease-flow`) when the history surface opens (tapped/expanded).

**Micro-interactions** (not on entrance, but on user action):
- Toggle segment active → indicator slides to tapped segment (200ms ease-out-soft), text fades cross-fade (200ms, 0→1→0 opacity on price text during toggle switch).
- Upgrade CTA tap → button fills scale(0.97) + light haptic.
- Success morph (upgrade confirmed) → button morphs orange → green with checkmark (280ms ease-out-soft) → auto-dismiss after 1.2s + screen refreshes with new plan, owned ✓ migrate orange → green on the grid.
- Downgrade/cancel tap → confirmation modal slides up + backdrop fades (520ms ease-flow).
- Modal dismiss → slide down + backdrop fade (280ms ease-out-soft).
- Failed payment warning banner → slides down from nav header + height expand (0 → 44pt, 280ms ease-out-soft).
- Bottom sheet open → slides up from bottom + backdrop fade (520ms ease-flow).
- Bottom sheet "Try again" success → button morphs green, auto-dismiss after 1.2s.

**Reduced-motion fallback:** `prefers-reduced-motion` → all animations at final state instantly. CompareGrid glyphs present and recommended-glow at rest (no bloom). Usage bar at final value. KPI at final number, Sparkline a completed stroke. All text present. Modals render open immediately (no slide). **The settled frame is the canonical frame** — every detail is readable without motion.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Free user** | CompareGrid fully visible (comparison is most useful pre-purchase); Free as owned-✓ column (green), Plus as recommended focal column (orange border + glow). Current Plan Card shows "Free" + "$0/mo" + "Free plan — no renewal date" + no usage bar. No billing section. No downgrade/cancel rows. | "Your plan: Free. All features listed below — upgrade anytime." (warm, no pressure, the period closes the calm line). Section header "Choose your next plan" if scrolled below the current card. | `ink-brown-800` surfaces + `--edge-highlight` + `--shadow-1`. CompareGrid has the focal glow on Plus column only. No glow elsewhere. |
| **Loading** | All sections render with depth-preserving skeletons: CompareGrid rows + cell glyphs shimmer (the grid structure stays visible); usage bar track + shimmer morph into the fill; pricing figures fade to placeholders that settle; Sparkline axis-less skeleton animates. Modals/bottom sheets: drag handle + header + skeletal content visible (never blank). | No copy (loading UI only — spinners are implicit "fetching"). If long-load, a single line appears: "Loading your plan…" (13pt Sora Regular, white at 50%). | Skeletons on `ink-brown-800`, same depth as settled state (no flat skeleton boxes — preserve the craft). |
| **Empty / partial** | Free user with no history: billing section shows "No charges yet." (13pt, white at 50%); no history tile, no Sparkline. Paid user with one charge: KPIStatTile shows the number + "—" delta (no movement on a flat-price subscription) + a single Sparkline point (one dot, no trend line). | "One charge on file: [amount]." (factual, no judgment). Sparkline label: "Last 7 cycles" (even though only 1 point is rendered). | Sparkline single-point rendered as a 2px orange dot, not a null state. KPIStatTile shows the earned value clearly. |
| **Error** | Tier data fails to load: CompareGrid shows cell glyphs as skeletons, price figures collapse, and a single inline message appears below the grid: "Could not load plans. Pull to refresh." (13pt Sora Regular, white at 50%, orange "refresh" link). All rows persist (structure preserved). Usage API fails: usage bar track only, no fill, label "Usage unavailable" (13pt, white at 40%, no fabricated 0% or 100%). Billing history fetch fails: KPIStatTile shows "Couldn't load history. Tap to retry." with a small inline action (13pt orange link). | "Couldn't load [what failed]. [Action: pull to refresh / tap to retry]." (specific, constructive, never generic "Error"). No red — operational errors use the error-red glyph + white label only where a genuine system failure (not a transactional failure). | Surface backgrounds + `--edge-highlight` + `--shadow-1` stay intact. Error text is white at 50% (secondary, not alarming — the content is missing, not the surface broken). |
| **Post-upgrade (success)** | Screen refreshes with the new tier highlighted: the current-plan card updates to show new plan name + price + renewal date (the orange border moves to the new current tier). CompareGrid updates: owned ✓ glyphs migrate from orange (unlock available) → green (now owned); the recommended-column glow (which was on the next tier) shifts to the new-current + 1. Usage bar updates if the new tier has different limits. Downgrade/cancel rows update visibility (appear if the new tier is not Free). | Current plan card: "[New tier name] plan. Renews [new date]." (warm acknowledgement, no "Congratulations!"). If an upgrade from Free → Plus, a single SIA note appears (optional, purple): "All features unlocked. Ready to explore?" (earn the purple with a genuine value statement, not a generic cheer). | Surfaces maintain depth. New current-plan card gets `--surface-backplate` if it becomes a hero-sized element. The CompareGrid glow moves in a smooth 280ms animation (the glow fades on the old recommended column and blooms on the new). Success haptic on upgrade tap (medium). |
| **Payment failed (grace period)** | Failed Payment Warning Banner slides down from nav header (amber bg at 15%, 3pt left amber border, 280ms ease-out-soft). Content pushes below. Countdown text: "Payment failed — [3/2/1] days to update payment" (updates hourly if the page is open). "Update" action link (right-aligned, orange, 44pt touch target). All other surfaces stay visible and usable (features remain active during grace period per spec). | "Payment failed — [N] days to update payment. Your [tier] plan stays active." (reassure the user that features work; the countdown is neutral, not guilt-based). On the final day: "Payment failed — update today to keep your plan." (still constructive, "keep your plan" is the reward-frame, not "lose access"). The period closes the coaching line. | Banner has `--color-stalled-amber` (the true operational-alert colour, not a manufactured-scarcity cue). Text is white at 100% (urgent but clear, not red). Glyph (a small ⚠️ or !) pairs with the text (colour + glyph + word, never colour alone). |
| **Payment failed (post-grace)** | Banner text changes to: "Your subscription has been paused. Upgrade to restore your features." (no countdown, feature access is downgraded to Free). The "Update" link becomes "Upgrade" (linking to the Restore from Downgrade modal). All CompareGrid features now show as owned-✓ on Free tier only; all paid tiers show as unlock-✓ (orange). The restore modal (on "Upgrade" tap) pre-selects the user's previous tier (Plus, Pro, or Max) but allows selection of any paid tier. | Modal header: "Welcome back!" (the emotional core, warm reassurance). Body: "Your previous data and settings are still here. Pick up where you left off." (no shame, no "we're sorry" — just factual and warm). Tier pills: "Plus", "Pro", "Max" (no labels, user recognizes the names). CTA: "Resubscribe" (warm, action-oriented, the period would be decorative here so it's omitted). | Surfaces stay at full depth. Modal is on `--shadow-3` (high elevation, important). The pre-selected tier pill is orange + white text (matches the current-upgrade-state colour). Success haptic on resubscribe (medium). |

### Signature & anti-generic

**The ownable Balencia moment:** The usage bar is the signature moment on this screen — a single continuous `--grad-progress` fill (orange→green only on genuine in-range arrival) with no alarm escalation, paired with a warm constructive label ("800 of 1,000 messages") and an optional supporting line ("Pro tier raises this to 10,000"). This **retires the alarm-as-upsell dark pattern** that was baked into the legacy amber/red escalation; instead, the bar earns trust by being honest, and the next-tier value is communicated through coaching tone, not scarcity. The warm-glow surfaces on the Current Plan Card (with `--surface-backplate`) and every tier card (with `--edge-highlight` + layered shadows) carry the brand warmth — never flat, never cold neon. The brand period is used on the consequence-and-next-step lines ("Your subscription has been paused. Upgrade to restore your features." · "Payment failed. Update today to keep your plan.") — the period signals a calm, confident coach closing a thought, then opening the action.

**Anti-generic tells removed:**
- ~~Generic "Upgrade" button on every tier~~ → Contextualized CTA ("Current plan" on owned tier, "Upgrade to Plus" on next tier, "Downgrade" on lower tier).
- ~~Flat tier cards with equal weight~~ → CompareGrid focal hero with single recommended-column glow breaks the monotony (the comparison is the story, not the card grid).
- ~~Alarm-colour usage escalation~~ → Single-fill honest bar, constructive language, no manufactured scarcity.
- ~~Generic "Success!" toast~~ → Specific confirmations ("Purchases restored." · "Your upgrade is complete. [New tier name] plan active.").
- ~~Hint text payment-recovery copy~~ → Authored, warm, non-shaming strings for every state (grace period countdown, post-grace welcome-back, pre-restore tier selection).
- ~~No motion spec~~ → Draw-first entrance (CompareGrid cells settle top-to-bottom, usage fills 0→value, prices count up), no urgency loops.
- ~~Flat billing surfaces~~ → Every card layered with `--edge-highlight` + `--surface-backplate` (hero surfaces) + `--shadow-1`, never a raw `ink-900` fill with a border.

**Result:** A screen that reads as premium, warm, and trustworthy — a financial interface that earns the user's confidence through honest data, gentle copy, and craft that communicates "we're not squeezing you," not "here's your last chance." The CompareGrid focal hero signals that the choice is the user's (comparison, not coercion). The payment-recovery flows are the screen's ethical core — downgrade and cancel are plainly available, and failed-payment messaging frames the situation constructively, never as a guilt trip.

### Accessibility

**Contrast pairs** (load-bearing):

| Element | Foreground | Background | Ratio | WCAG |
|---|---|---|---|---|
| CompareGrid owned-✓ glyph | `--color-forest-green` (`--color-forest-green`) | `ink-brown-800` (`--color-ink-brown-800`) | 5.1:1 | AAA ✓ |
| CompareGrid unlock-✓ glyph | `--color-brand-orange` (`--color-brand-orange`) | `ink-brown-800` (`--color-ink-brown-800`) | 4.7:1 | AA ✓ |
| CompareGrid absent Minus | `--color-alpha-white-30` (white/30) | `ink-brown-800` (`--color-ink-brown-800`) | 3.2:1 | AA ✓ |
| Recommended-column border | `--color-brand-orange` at 30% (rgba(255,94,0,0.30)) | `ink-brown-800` (`--color-ink-brown-800`) | 2.8:1 (decorative, not load-bearing; the glyph is load-bearing) | — |
| Recommended-column glow | `--glow-orange-md` (~20px / .40) | `ink-brown-800` | 3.2:1 (accent, not load-bearing; glyph + border carry meaning) | — |
| Usage bar fill | `--grad-progress` (orange→green) | `--color-ink-700` track | 4.2:1 (orange portion) | AA ✓ |
| Current plan border | `--color-brand-orange` (`--color-brand-orange`) | `ink-brown-800` (`--color-ink-brown-800`) | 4.7:1 | AA ✓ |
| Failed-payment banner text | white at 100% | `--color-stalled-amber` at 15% bg | 9.1:1 | AAA ✓ |
| Error-red CTA (downgrade/cancel) | `--color-error-red` (`--color-error-red`) | `ink-brown-800` (`--color-ink-brown-800`) | 3.8:1 | AA ✓ |
| Button text (white) | white at 100% | `--color-brand-orange` (`--color-brand-orange`) | 4.6:1 | AA ✓ |
| Feature included text | white at 70% | `ink-brown-800` (`--color-ink-brown-800`) | 3.8:1 | AA ✓ |

**Focus-visible:** Every interactive element (CTA buttons, toggle segments, tier cards, billing rows, restore tier pills, bottom-sheet CTAs) renders `CK-T03 --focus-ring` (2px orange, 2px offset on the dark field) when focused. The ring is **visible** and matches the brand orange — never a subtle outline.

**44pt touch targets:** All interactive elements meet ≥44×44pt. Tier card CTAs, upgrade/downgrade/cancel rows, toggle segments, tier pills in the restore modal, bottom-sheet buttons — all 44pt minimum height. The CompareGrid cells are grouped into larger touch areas per feature row (not single-glyph taps); the grid is read as a *table*, and a screen-reader user navigates the table role + cell values via arrow keys, not via tap.

**Colour + glyph + word (never colour-alone):** The CompareGrid uses visible glyphs (`Check` / `Minus`) + feature labels. The recommended-column cue uses a 1px orange border (visible + load-bearing) + a glyph + the label "Recommended" on the tier card. The failed-payment banner uses the amber background + a visible glyph (⚠️ or !) + text "Payment failed." The usage bar uses the `--grad-progress` fill + a visible track boundary + the label "800 of 1,000 messages." Status is **never** conveyed by colour alone.

**Screen reader labels:**
- CompareGrid table: `role="table"` with `aria-label="Plan comparison: rows are features, columns are tiers (Free, Plus, Pro). Recommended tier is Plus. Swipe left to see more tiers."`
- Each CompareGrid cell (included feature): `aria-label="Plus: [feature name] included"`
- Each CompareGrid cell (excluded feature): `aria-label="Plus: [feature name] not included"`
- Tier cards: each card is a focusable region; "Plus plan, $20 per month, current plan, tap to view details"
- Upgrade CTA: "Upgrade to Pro plan, button"
- Current plan CTA: "Current plan, disabled"
- Usage bar: "AI usage, 800 of 1,000 messages this cycle. Pro tier offers 10,000."
- Recommended badge: "Recommended plan"
- Failed-payment warning banner: "Warning, payment failed. 2 days remaining to update your payment method. Update button."
- Downgrade row: "Downgrade plan, button, destructive action"
- Cancel row: "Cancel subscription, button, destructive action"
- Restore modal: "Welcome back. Your previous plan was Plus. Select your plan and resubscribe. Plus pill, selected. Pro pill. Max pill. Resubscribe button."

**Reduced-motion:** `prefers-reduced-motion` media query → all transitions/animations disabled. CompareGrid glyphs rendered at final state. Usage bar rendered at final fill value (no morph). Sparkline rendered as a complete stroke (no draw). Modal opens instantly (no slide). Count-ups skip to final values. The **settled canonical frame is always readable and complete** — no motion is load-bearing for comprehension.

**Keyboard navigation:** Tab order: back button → warning banner "Update"/"Upgrade" (if visible) → current plan card → tier cards (left-to-right, swipe equivalent via arrow keys) → billing section rows → downgrade/cancel rows. All modals trap focus (escape dismisses, "Cancel" button secondary). Bottom-sheet drag handle is not focusable (swipe-down is the primary dismiss; "Cancel" button is the accessible dismiss).

Conform to `design-audit/CONSISTENCY.md`.


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
| Usage bar fill | #FF5E00 | burnt-orange | Single continuous fill at all levels (no amber/red escalation); green only at a genuine in-range arrival |
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
Current plan card shows warning state: amber (#F59E0B) border replacing orange, "Payment failed — update your payment method" message in 13pt Sora Regular, amber text. Payment method row gets a status indicator paired with a visible glyph + label (a small "!" badge + "action needed"), never colour alone, so the status is legible to colour-blind users.

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
- **Patterns established**: Tier Card (with current/upgrade/downgrade variants), Current Plan Card (with usage bar and renewal), AI Usage Bar (honest single-fill MomentumBar — never alarm-recoloured), Horizontal Scrolling Card Rail (for tier comparison), Billing Period Toggle (Monthly/Annual segmented control), Annual Save Badge (forest-green pill), Downgrade/Cancel/Upgrade Confirmation Modals (with proration logic), Failed Payment Warning Banner (with grace period countdown), Payment Method Update Bottom Sheet, Restore from Downgrade Confirmation Modal, Payment Failed Warning State
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-08.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/subscription`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B08-F14 | major | navigation | Make the shared back affordance semantic and route-aware. |
| B08-F15 | critical | billing | Implement billing-period state, disabled current-plan controls, upgrade/downgrade/cancel modals, restore flow, and payment/history handling. |
| B08-F16 | major | accessibility | Render current plan as disabled/aria-disabled and expand segmented-control hit areas to at least 44px. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

