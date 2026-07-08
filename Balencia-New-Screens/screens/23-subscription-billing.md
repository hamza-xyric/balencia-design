### 1. Header
- **Screen ID:** 23
- **Name:** subscription-billing
- **Route(s) covered:** `/settings/billing`, `/settings/billing/credits`
- **Tab:** Settings / Me stack
- **Source:** Functional Content Brief: Subscription & Billing
- **Batch:** 10

### 2. Purpose
Subscription & Billing shows the current plan, compares every tier, manages purchases, and exposes billing history without dark patterns. It is a transactional utility, so it must be precise: prices, renewal dates, usage limits, credit balances, downgrade timing, and cancellation consequences are stated plainly.

### 3. Entry & exit
- **Entry paths:** Me Main [17] billing quick link, Settings [21] manage subscription row, Paywall [43] compare all plans link.
- **Exit paths:** Back returns to origin. Upgrade/resubscribe opens native IAP. Payment method opens App Store settings. Billing history row expands. Downgrade/cancel opens confirmation sheet.
- **Credits path:** `/settings/billing/credits` anchors the credits ledger module inside this screen.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron and title.
2. **Payment warning:** conditional failed-payment banner.
3. **Current plan card:** tier, price, renewal, usage meter, credits balance.
4. **Plan rail:** Free, Plus, Pro, Max cards with CTAs.
5. **Compare plans grid:** focal matrix for current/recommended/next tiers.
6. **Credits ledger:** balance, grants, usage, expirations, and source chips.
7. **Billing group:** payment method, billing history, restore purchases.
8. **Destructive actions:** downgrade and cancel, separated.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  Subscription & billing            │
│ payment failed - 3 days to update    │
│ ┌──────────────────────────────────┐ │
│ │ Pro · $60/mo                     │ │
│ │ renews Jun 15, 2026              │ │
│ │ 800 of 1,000 messages this cycle │ │
│ │ credits 420                      │ │
│ └──────────────────────────────────┘ │
│ Free  Plus  Pro  Max                 │
│ Compare plans                         │
│ feature        current  recommended  │
│ CIA coaching   ✓        ✓             │
│ voice          -        ✓             │
│ Credits ledger                        │
│ +500 monthly grant · expires Aug 1    │
│ -80 voice call · via usage            │
│ Billing                               │
│ Visa ....4242     Billing history     │
│ Downgrade plan     Cancel subscription│
└──────────────────────────────────────┘
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** warm dark account utility surface.
- **Focal hierarchy:** CompareGrid is the single focal hero; current plan and rail support it.
- **Glass tiers:** current plan uses glass; CompareGrid, credits, and billing history use SolidCard for exact financial reading.
- **Semantic glow:** recommended tier column uses glow-you once; restore/purchase success uses glow-done; no CIA-purple surface on this transactional screen except text references inside the matrix.
- **Ethical limit design:** usage meter is non-alarming and never escalates to red.

### 7. Content & copy
- **Title:** Subscription & billing.
- **Plan:** Free plan - no renewal date. Renews Jun 15, 2026.
- **Usage:** 800 of 1,000 messages this cycle.
- **Near limit:** resets Jun 15 - Pro raises this to 10,000.
- **CTAs:** Current plan, Upgrade, Upgrade to Plus, Downgrade.
- **Warning:** Payment failed - 3 days to update payment. Your Pro plan stays active.
- **Credits:** Credits ledger, monthly grant, voice call usage, expires Aug 1.
- **Cancel:** Cancel your subscription? Your data will be preserved.
- **Restore:** Purchases restored.
- **Error:** Could not load plans. Pull to retry.
- **Offline:** offline - showing saved billing data.

### 8. Data & honesty states
- **Current tier:** real = tier, price, renewal with ChipProvenance "via subscription API"; low-confidence = stale tier label while receipt refreshes; honest-null = "No active plan found."
- **Usage meter:** real = used/limit from usage API; low-confidence = "usage unavailable" with muted track; honest-null = hidden for Free or unlimited Max where not applicable.
- **Credits balance:** real = balance plus grants and spends with source chips; low-confidence = cached balance with stale label; honest-null = "No credits yet."
- **Tier matrix:** real = feature entitlements from tier matrix; low-confidence = saved matrix banner; honest-null = fallback text list.
- **Billing history:** real = charge rows, card last4, receipt links; low-confidence = partial history; honest-null = "No charges yet."
- **Payment failed:** real = grace countdown from billing API; low-confidence not applicable; honest-null = banner hidden.

### 9. All states
- **Default:** paid user with current plan, plan rail, CompareGrid, credits, billing rows, and downgrade/cancel.
- **Skeleton:** plan card, rail, grid, and credits ledger shimmer.
- **Empty:** Free user shows Free plan card, all features listed, billing history hidden.
- **Error:** grid persists structurally; failed sections show retry.
- **Success:** upgrade/restore CTA turns glow-done then dismisses native flow result.
- **Disabled:** current plan CTA disabled; offline purchase/update buttons disabled with reason.
- **Offline:** cached plan and credits show staleness; native purchase/update actions disabled.
- **Payment failed:** warning banner variants for grace, final day, and post-grace.

### 10. Motion & interaction
- Swipe tier rail horizontally. Tap CTAs to open IAP or confirmation sheets. Tap billing rows to expand. Pull-to-refresh reloads plans and receipts.
- CompareGrid cells settle top-to-bottom; ChargeMeter fills; credits ledger rows insert with 250ms ease.
- **Reduced-motion path:** no count-up, grid settle, or row insertion animation; values render final immediately.

### 11. Motivation-tier adaptation
- **Low:** show current plan, recommended plan, and three most relevant comparison rows.
- **Medium:** default.
- **High:** full tier rail, full CompareGrid, expanded credits ledger, billing sparkline.

### 12. Accessibility
- Back, plan cards, grid rows, CTAs, billing rows, and destructive actions meet 44px targets.
- Price, renewal, cancellation date, and trial terms are read in full.
- Included/excluded features are glyph plus text.
- Downgrade/cancel sheets trap focus and return to trigger.
- Usage limits are announced as numbers, not color.

### 13. Premium checklist
1. Billing screen is precise and non-coercive.
2. Routes cover billing and credits.
3. Current plan, tier rail, CompareGrid, credits, billing history, restore, downgrade, and cancel are preserved.
4. Credits ledger is source-labeled.
5. No dark-pattern scarcity or alarm color.
6. Native IAP and App Store handoffs are explicit.
7. Failed payment grace is honest.
8. Default, Skeleton, Empty, Error, Success, Disabled, Offline, and Payment Failed states exist.
9. Reduced-motion path exists.
10. 44px target floor is stated.
11. Feature gating is transparent.
12. Cancellation preserves data until policy says otherwise.
13. Financial values have provenance.
14. Cross-links to Settings and Paywall are preserved.
