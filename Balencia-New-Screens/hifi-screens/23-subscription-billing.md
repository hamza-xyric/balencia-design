# 23-subscription-billing - A+++ hi-fi mobile spec

## Header
- **Source ID:** 23
- **Source spec:** `Balencia-New-Screens/screens/23-subscription-billing.md`
- **Evidence:** screens/23-subscription-billing.md, work/briefs/23.md, work/drafts/23.md, Functional Content Brief: Subscription & Billing
- **Route(s):** `/settings/billing`, `/settings/billing/credits`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Subscription & Billing shows the current plan, compares every tier, manages purchases, and exposes billing history without dark patterns.
- **Premium Visual Director:** make subscription-billing command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** subscription-billing shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   Subscription & billing            |
| payment failed - 3 days to update    |
| +----------------------------------+ |
| | Pro  $60/mo                     | |
| | renews Jun 15, 2026              | |
| | 800 of 1,000 messages this cycle | |
| | credits 420                      | |
| +----------------------------------+ |
| Free  Plus  Pro  Max                 |
| Compare plans                         |
| feature        current  recommended  |
| CIA coaching   x        x             |
| voice          -        x             |
| Credits ledger                        |
| +500 monthly grant  expires Aug 1    |
| -80 voice call  via usage            |
| Billing                               |
| Visa ....4242     Billing history     |
| Downgrade plan     Cancel subscription|
+--------------------------------------+

Route handling: `/settings/billing`, `/settings/billing/credits`
```

## Focal Hierarchy
- **Dominant focal moment:** subscription-billing command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Payment warning, Current plan card, Plan rail, Compare plans grid.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*billing*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** with 44px back target.
- **WarningBanner** for failed payment.
- **GlassStatCard** for current plan.
- **ChargeMeter** for metered CIA message usage.
- **PlanTierCard** (NEW) for Free/Plus/Pro/Max rail.
- **CompareGrid** (NEW) for tier matrix.
- **CreditLedgerRow** (NEW) for grants, usage, expiration, and provenance.
- **ListRow** for billing controls.
- **Sheet / ModalOverlay** for upgrade, downgrade, cancel, update payment, restore.
- **ChipProvenance, SkeletonState, ErrorState, OfflineBanner, HonestNullState, PaywallLock, BtnPrimary, BtnSecondary, BtnGhost** for data and states.

## Data Honesty
- **Current tier:** real = tier, price, renewal with ChipProvenance "via subscription API"; low-confidence = stale tier label while receipt refreshes; honest-null = "No active plan found."
- **Usage meter:** real = used/limit from usage API; low-confidence = "usage unavailable" with muted track; honest-null = hidden for Free or unlimited Max where not applicable.
- **Credits balance:** real = balance plus grants and spends with source chips; low-confidence = cached balance with stale label; honest-null = "No credits yet."
- **Tier matrix:** real = feature entitlements from tier matrix; low-confidence = saved matrix banner; honest-null = fallback text list.
- **Billing history:** real = charge rows, card last4, receipt links; low-confidence = partial history; honest-null = "No charges yet."
- **Payment failed:** real = grace countdown from billing API; low-confidence not applicable; honest-null = banner hidden.

## Consent and Safety
- subscription-billing shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/settings/billing`, `/settings/billing/credits`. Do not add alternate vanity routes.

## States
- **Default:** paid user with current plan, plan rail, CompareGrid, credits, billing rows, and downgrade/cancel.
- **Skeleton:** plan card, rail, grid, and credits ledger shimmer.
- **Empty:** Free user shows Free plan card, all features listed, billing history hidden.
- **Error:** grid persists structurally; failed sections show retry.
- **Success:** upgrade/restore CTA turns glow-done then dismisses native flow result.
- **Disabled:** current plan CTA disabled; offline purchase/update buttons disabled with reason.
- **Offline:** cached plan and credits show staleness; native purchase/update actions disabled.
- **Payment failed:** warning banner variants for grace, final day, and post-grace.

## Motion
- Swipe tier rail horizontally. Tap CTAs to open IAP or confirmation sheets. Tap billing rows to expand. Pull-to-refresh reloads plans and receipts.
- CompareGrid cells settle top-to-bottom; ChargeMeter fills; credits ledger rows insert with 250ms ease.
- **Reduced-motion path:** no count-up, grid settle, or row insertion animation; values render final immediately.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/settings/billing`, `/settings/billing/credits`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, plan cards, grid rows, CTAs, billing rows, and destructive actions meet 44px targets.; Price, renewal, cancellation date, and trial terms are read in full.; Included/excluded features are glyph plus text.
