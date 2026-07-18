# 92-reputation - A+++ hi-fi mobile spec

## Header
- **Source ID:** 92
- **Source spec:** `Balencia-New-Screens/screens/92-reputation.md`
- **Evidence:** screens/92-reputation.md, work/briefs/92.md, work/drafts/92.md, Functional Content Brief: Reputation & Trust Score Profile
- **Route(s):** `/reputation`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Reputation shows a member's community trust standing with transparency and due process.
- **Premium Visual Director:** make reputation hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** reputation exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   Reputation                       |
| o Hamza                 Trusted      |
| +----------------------------------+ |
| |        Trust Score 82            | |
| |      +------------+              | |
| |      |  mentor    |              | |
| |      +------------+              | |
| |  18 points to next tier          | |
| +----------------------------------+ |
| Breakdown                            |
| consistency  ########  via activity  |
| helpfulness  ########  via feed      |
| engagement   ########  via community |
| accountability ######  via contracts |
| Reputation history                    |
| ---o-----o-----o-----o               |
|  CIA insight                         |
| Your helpful replies are lifting      |
| trust this week.                      |
| Privacy & safety                      |
| flags 0  appeals none  report path  |
+--------------------------------------+

Route handling: `/reputation`
```

## Focal Hierarchy
- **Dominant focal moment:** reputation hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Profile snippet, Trust score hero, Breakdown, History.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*reputation*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** with safety glyph and 44px controls.
- **ProfileSnippet** with avatar, display name, and tier.
- **ReputationDial** for composite trust score.
- **ProgressBar** for next-tier progress.
- **GlassStatCard** for hero score and tier.
- **SolidCard** metric rows for breakdown.
- **TrendChart** and **TimelineAgenda** for reputation history.
- **TierLadder** (NEW) for current/next/locked privileges.
- **CIAInsightCard** for synthesis.
- **TrustTransparencyPanel** (NEW) for flags, appeals, reports, and data controls.
- **ChipProvenance, ConfidenceMeter, HonestNullState, SkeletonState, ErrorState, OfflineBanner, PaywallLock, BtnSecondary** for states and gating.

## Data Honesty
- **Trust score:** real = computed BFF score with ChipProvenance "via community + contracts"; low-confidence = muted score with "estimated  low confidence" while moderation data syncs; honest-null = "--" and starter copy.
- **Tier progress:** real = points to next tier; low-confidence = progress bar dimmed while score is reconciling; honest-null = ladder shows current base tier only.
- **Breakdown metrics:** real = separate values for consistency, helpfulness, engagement, accountability with source chips; low-confidence = row-level ConfidenceMeter; honest-null = row omitted if source has no data.
- **History:** real = score events and trend; low-confidence = cached trend dashed; honest-null = "History appears after your first trust event."
- **Trust flags:** real = count and appeal state, visible only to the member; low-confidence not applicable because flags are recorded moderation state; honest-null = "No active flags."
- **CIA insight:** real = explanation from score movement; low-confidence = "early read  low confidence"; honest-null = card omitted.

## Consent and Safety
- reputation exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/reputation`. Do not add alternate vanity routes.

## States
- **Default:** hero, breakdown, history, tiers, CIA insight, and transparency panel render.
- **Skeleton:** dial, rows, chart, and ladder shimmer in final geometry.
- **Empty:** no score dial value; starter copy and Learn how to earn are shown.
- **Error:** ErrorState offers Retry while cached score remains if available.
- **Success:** new positive score event briefly flashes glow-done in the history row.
- **Disabled:** premium-only deep-dive rows sit behind PaywallLock; appeal buttons disable during submission with inline reason.
- **Offline:** cached reputation renders with staleness label; resolve/appeal actions are disabled until online.
- **Flagged:** private review panel appears above CIA insight, with evidence, policy link, and appeal path.

## Motion
- Pull-to-refresh updates score. Tap metric row opens explanatory sheet. Swipe/scrub history to inspect events. Tap tier ladder cards to read privileges.
- ReputationDial draws to the score; history line draws left-to-right; new event rows insert with 250ms physical easing.
- Appeals and resolve actions show inline spinners and success/error states.
- **Reduced-motion path:** dial and chart render final state instantly; row insertions use no slide.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/reputation`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, safety glyph, metric rows, tier cards, and actions meet 44px minimum targets.; Score and tier are announced as text and progress, not color alone.; Flags and appeals are private to screen reader focus order and not exposed as public badges.
