# 64-report-block - A+++ hi-fi mobile spec

## Header
- **Source ID:** 64
- **Source spec:** `Balencia-New-Screens/screens/64-report-block.md`
- **Evidence:** screens/64-report-block.md, work/briefs/64.md, work/drafts/64.md, Balencia Glass Canon  glass-dark v1.
- **Route(s):** No live route; global ReportBlock Sheet over Community Chat, Competitions, and Recipes.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Provides a low-friction, calm, and non-shaming flow for users to report harmful content and optionally block the offending user.
- **Premium Visual Director:** make Report & block command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Report & block uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
|#############################################| Scrims
|#############################################|
| +-----------------------------------------+ |
| |                  ( Grabber )            | |
| |  cancel            report               | | 1. Header
| |-----------------------------------------| |
| |  [Avtr] Deleted user                    | | 2. Entity Context
| |  May have deleted account.              | |
| |-----------------------------------------| |
| |  WHY ARE YOU REPORTING THIS?            | |
| |                                         | |
| |     Spam                               | |
| |     Harassment                         | |
| |     Inappropriate content              | | 3. Reason List
| |     Misinformation                     | |
| |     Impersonation                      | |
| |     Other                              | |
| |-----------------------------------------| |
| | +-------------------------------------+ | |
| | | tell us more (optional)             | | | 4. Description Input
| | |                                     | | |
| | |                                  0/500| | |
| | +-------------------------------------+ | |
| |                                         | |
| |  +-----------------------------------+  | |
| |  | also block this user       ( ON )  |  | | 5. Block Toggle
| |  | you won't see their messages...    |  | |
| |  +-----------------------------------+  | |
| |                                         | |
| | +-----------------------------------+   | |
| | |           submit report           |   | | 6. Submit CTA
| | +-----------------------------------+   | |
| +-----------------------------------------+ |
+---------------------------------------------+

Route handling: No live route; global ReportBlock Sheet over Community Chat, Competitions, and Recipes.
```

## Focal Hierarchy
- **Dominant focal moment:** Report & block command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Scrim & Grabber with CIA only when the source supports a synthesized read.
- **Operational layer:** Header, Entity Context, Reasoning, Context Details.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*block*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **Sheet** (`half` variant) - base container.
- **TopBar** (modified) - uses BtnGhost for "cancel", plain Title H3.
- **FeedPostCard** (truncated variant) - used to display the reported entity context.
- **ListRow** - base for report reasons.
- **GlassPillInput** (`multiline` variant, radius 20) - description field.
- **Toggle** - block opt-in switch.
- **BtnPrimary** - submit report.
- **ErrorState** - inline submission error message.
- **NEW: SafetyActionRow** - A composite of ListRow + Toggle + sub-label text. *Rationale: The standard ListRow doesn't accommodate a dual-line expanding description (for the block consequence) alongside a Toggle without violating the 56px height rule.*
- *Flagged for removal:* Quick-log FAB and Bottom Nav. Native modal sheets focus the user entirely on the critical action at hand.

## Data Honesty
- *Not applicable for standard data metrics.* This screen contains no WHOOP data, habit trackers, or AI-generated analytics. It operates purely on local UI state and user input.
- **Honesty invariant applied to:** The Character Counter (0/500). It reflects system calculation of text input length exactly. No fabricated estimations.
- **Honesty invariant applied to:** Context passing. If the entity ID is missing, the UI does not "guess" or create a blank report. It fails honestly with the source-screen toast: `couldn't load report. try again.`
- **Honesty lock:** every metric on this screen must ship as real + ChipProvenance, low-confidence with muted/dashed treatment, and honest-null with no fabricated number.

## Consent and Safety
- Report & block uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default Initial:** Form visible; submit disabled; block toggle OFF (per resolved contradiction).
- **Reason Selected:** Radio button filled orange; submit button activated.
- **Offline:** Sheet remains interactive; top banner reads `you're offline - your report will send when you're back online.` Submission queues locally.
- **Duplicate Report:** Submit button text reads `update report`.
- **Submission Error:** Form remains; submit button executes physical high-frequency rattle; inline error text `couldn't submit. check your connection and try again.`
- **Success:** Checkmark icon scales in (with bounce); confirmation text displayed; sheet auto-dismisses after 1.5s.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Sheet Presentation:** Backdrop fades in (150ms). Sheet springs up via physical easing (250ms). Internal modules cascade in with a subtle fade and 8px upward translate.
- **Radio Selection:** Tapping a reason animates a filled inner circle scaling in (0 to 1.0, 150ms ease-out).
- **Toggle Activation:** Tapping the row or switch slides the thumb left/right (150ms). Track background crossfades.
- **Submit Failure Shake:** On error, the submit button executes a horizontal translate `transform: translateX(0 -> 8px -> -8px -> 0)` over 250ms.
- **Success Auto-Dismiss:** Checkmark scales in (slight overshoot); after 1.5s delay, the entire sheet slides down off-screen (250ms) as background backdrop fades simultaneously.
- **Haptics:** Light impact haptic on radio selection; medium impact on successful submission.
- **Reduced-motion path:** All spring bounces and rattles default to instant `opacity` fades and simple `translateY` without keyframe bouncing.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; global ReportBlock Sheet over Community Chat, Competitions, and Recipes..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast pairs:** Paper-100 `#FEFAF3` on `.glass-frost` (passes AA+). Error text `#ef4444` on frost background (passes AA+).; **Targets:** All radio list rows, the block toggle row, and the cancel button maintain a strict 44px minimum tap target height.; **Screen-reader:** Glyph-only cancel `X` and success checkmarks include `accessibilityLabel` ("cancel report", "success"). Radio buttons announce as `role="radio"` with `selected` state.
