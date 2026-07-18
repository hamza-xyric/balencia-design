# VISUAL-008 D1 — Terra builder packet C (S23/S24)

- Packet status: `issued`
- Packet ID: `D1-BUILD-C`
- Parent batch: `VISUAL-008-D1-profile-settings-core`
- Worker profile/harness: native Codex Terra builder
- Routing/model/effort: `gpt56-tiered` / `gpt-5.6-terra` role intent (`W-MODEL`) / high
- Source hierarchy/tie-breaker: parent batch and frozen matrix
- Evidence destination: `evidence/builder-c.md` (Sol persists native-thread report)
- Stop condition: shared edit, source conflict, scope crossing, or two equivalent failures

Read `workers/builder-common.md`, `BATCH.md`, `VERIFICATION-MATRIX.md`, `evidence/recon-b.md`, current specs 23/24, and only imports needed by the assigned files.

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S23SubscriptionBilling.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S24NotificationHistory.tsx`

## S23 exact outcome

- Exact state/panel/usage roots.
- `ChargeMeter` renders 8/10 ticks with exact accessible label `800 of 1,000 used`; renewal is separately announced.
- Plan, usage, credits, matrix, payment, and billing history expose source/freshness/null truth.
- Semantic comparison `<table>` with row/column headers and visible Included/Not included text.
- Four operable plan choices/current state; Update/credit/plan/billing/cancel controls >=44px.
- Purpose-specific update/cancel/credits overlays with focus trap/restoration and equal exits; local-only no-purchase/no-cancellation truth.
- Exact eight contextual controls; full grace/final/post-grace and offline/state fixtures.

## S24 exact outcome

- Exact state/filter/panel/period/count roots.
- Safe React heading `Activity history`; zero markup leakage.
- One frozen `[1,0,2,1,0,1,1]`/6-event/7-day payload drives chart, CIA3/Reminders2/Social1 filters, six rows, accessible summary, and counts; omit all zero chips.
- Native 44px `aria-pressed` filters with live result count; separate row and overflow controls; no nested interactives.
- Sleep uses defined Sleep token; Social uses defined Relationships token. Dense ledger uses solid surfaces.
- Mark all read → status/Undo → restored state; exact eight Notification Controls; archive/delete local confirmations; reduced motion.

## Verify

Run `npx eslint src/components/hifi/screens/profile/S23SubscriptionBilling.tsx src/components/hifi/screens/profile/S24NotificationHistory.tsx`. Do not run or restart a server. Return evidence only after the command passes or report the exact blocker.
