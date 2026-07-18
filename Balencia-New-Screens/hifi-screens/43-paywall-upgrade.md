# 43-paywall-upgrade - A+++ hi-fi mobile spec

## Header
- **Source ID:** 43
- **Source spec:** `Balencia-New-Screens/screens/43-paywall-upgrade.md`
- **Evidence:** screens/43-paywall-upgrade.md, work/briefs/43.md, work/drafts/43.md, Balencia Glass Canon (glass-dark v1)  Component Catalog  Functional Brief (Batch 10)
- **Route(s):** `/subscription`, `/upgrade`, `/locked/[pageKey]`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Reveals the value of Balencia Plus/Pro exactly when the free-tier limit is reached, without coercing the user.
- **Premium Visual Director:** make paywall-upgrade command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** paywall-upgrade shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
(390px)
 +-------------------------+
 | ####################### | <- Scrim (rgba(10,10,15,.6))
 |                         |
 |   +-------------------+ |
 |   |                | | <- Glass Sheet (.glass-frost, r-28)
 |   |                   | |
 |   |  unlock CIA's...  | | <- Contextual Headline
 |   |                   | |
 |   | +---------------+ | |
 |   | | ############# | | | <- Blurred Preview (PaywallLock)
 |   | | ### locked ## | | |
 |   | +---------------+ | |
 |   |                   | |
 |   |  Free  | Plus |Pro| | <- Feature Matrix (SolidCard)
 |   |   -    |     | | |
 |   |   -    |     | | |
 |   |       |     | | |
 |   |                   | |
 |   | +---------------+ | |
 |   | | START 7-DAY...| | | <- BtnPrimary
 |   | +---------------+ | |
 |   |  $20/mo. cancel..| | <- Trial Terms
 |   |                   | |
 |   |  Compare all plans| | <- BtnGhost
 |   |  Maybe later  .. | | <- BtnGhost
 |   +-------------------+ |
 +-------------------------+

Route handling: `/subscription`, `/upgrade`, `/locked/[pageKey]`
```

## Focal Hierarchy
- **Dominant focal moment:** paywall-upgrade command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Scrim & Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** Drag Handle & Headline, Blurred Preview Area, Feature Matrix, CTA & Terms.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*upgrade*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **Sheet** (`half` variant): Bottom sheet container using `.glass-frost` for the immersive paywall moment.
- **GlassCard**: Used to hold the blurred preview.
- **PaywallLock**: Implements the blurred (20px) preview of the exact feature attempted.
- **SolidCard** (`elevated`): Container for the dense comparison matrix.
- **BtnPrimary**: Single conversion CTA ("Start 7-day free trial").
- **BtnGhost**: Used for dismissals ("Maybe later") and deeper routing ("Compare all plans"). Equal visual weight to ensure a non-coercive exit.
- **NEW: PricingMatrixRow**: Custom `ListRow` variant designed specifically for 3-column comparison grids. *Rationale: The catalog's standard ListRow doesn't support nested three-point alignment (Free vs Plus vs Pro) with distinct domain glyphs.*

## Data Honesty
- Every metric and pricing tile renders through standard 3-state logic. No fabricated pricing.
- **Plus Price ($20/mo):**
- - **Real:** "$20/mo" + `ChipProvenance` text: "via app store".
- - **Low-confidence:** "$20/mo" (muted 64%) + "estimated  low confidence".
- - **Honest-null:** "Price unavailable" + `HonestNullState` text: "we couldn't reach billing - try again later".
- **Trial Eligibility (7 days):**
- - **Real:** "Start 7-day free trial".
- - **Low-confidence:** Not applicable for this metric.
- - **Honest-null:** "Upgrade to Plus" (If user is known to be ineligible via API, fallback to direct upgrade copy).
- **Comparison Matrix Features:**

## Consent and Safety
- paywall-upgrade shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/subscription`, `/upgrade`, `/locked/[pageKey]`. Do not add alternate vanity routes.

## States
- **Default:** Preview blurred, matrix populated, CTA pulsing gently (breathing, not throbbing).
- **Skeleton:** Grid layout preserves geometry. Pricing tiles show `SkeletonState` blocks. Matrix cells show ghost pills. Delay >1.5s shows "Loading your *plans*".
- **Empty:** Not applicable (paywall always has context, or defaults to general CIA upgrade).
- **Error (IAP Failure):** CTA reverts from spinner to standard `BtnPrimary`. Red error text below: "Purchase failed  try again or contact *support*."
- **Error (Offline):** Displays cached matrix behind a `OfflineBanner` ("Showing saved plans  reconnect to update *prices*."); CTA disabled (40% opacity).
- **Success:** CTA fills `BtnSuccess` (forest green) with checkmark; holds 1.5s; modal slides down and auto-dismisses. No confetti overlay.
- **Disabled:** CTA disabled if offline or during IAP processing.

## Motion
- **Entrance sequence:**
- 1. Structure: Sheet springs in (250ms), grid headers fade in.
- 2. Focal: Matrix cells settle, Plus column `--glow-cia` blooms once.
- 3. Support: Prices count up from 0 to target. CTA fades in.
- *Total: ~2.5-2.8s. Intent: Calm, structural reveal.*
- **Physical easing:** Modal slides down proportionally to drag velocity. Fast flick dismisses; slow drag springs back.
- **Glow behavior:** The purple matrix glow breaths with a 4s ease in/out cycle to signify active CIA intelligence without inducing urgency.
- **Haptics:** Light impact haptic on tap of `BtnPrimary` to initialize IAP. Success haptic on IAP completion.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/subscription`, `/upgrade`, `/locked/[pageKey]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast pairs:**; - Paper-100 (`#FEFAF3`) on `--surface-2` (`#211008`) = 15.8:1.; - Paper-50 (`#FDFDFB`) on `--glow-cia` purple = 6.2:1.
