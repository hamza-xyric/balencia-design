# 69-app-rating - A+++ hi-fi mobile spec

## Header
- **Source ID:** 69
- **Source spec:** `Balencia-New-Screens/screens/69-app-rating.md`
- **Evidence:** screens/69-app-rating.md, app_design 3/69-app-rating.md plus ascii_wireframes/69-app-rating.md
- **Route(s):** No live route; system-triggered bottom-sheet overlay after positive moments.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: App rating is a non-blocking bottom sheet that asks for sentiment after a positive pause, routes 4-5 star responses to a store review prompt, routes 1-3 star responses to private feedback, and always offers `not now` plus permanent suppression without dark patterns.
- **Premium Visual Director:** make rating sheet the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** App rating uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| underlying screen dimmed              |
|                                      |
|                                      |
|                                      |
+======================================+
|          --------                    |
|          CIA avatar                  |
|                                      |
|       Enjoying Balencia?             |
|  We'd love to hear how you feel.     |
|                                      |
|    star  star  star  star  star      |
|      1     2     3     4     5       |
|                                      |
|             not now                  |
|          don't ask again             |
|                                      |
| safe area                            |
+--------------------------------------+

Route handling: No live route; system-triggered bottom-sheet overlay after positive moments.
```

## Focal Hierarchy
- **Dominant focal moment:** rating sheet; it should be visually singular, not one tile among many.
- **Secondary layer:** Positive path with thank-you copy and store review CTA. with CIA only when the source supports a synthesized read.
- **Operational layer:** ASCII wireframe :, | underlying screen dimmed              |, Initial headline, Subtitle.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*rating*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **ModalOverlay** - dimmed backdrop and bottom sheet.
- **Sheet** - fixed-height rating, positive, and feedback states.
- **ChoiceCardFrost** - adapted for selected star row semantics.
- **BtnPrimary** - Rate on App Store and Submit feedback.
- **BtnGhost** - not now, maybe later, skip, don't ask again.
- **ChipProvenance** - trigger reason, cooldown, and feedback status when shown in debug/support mode.
- **ErrorState / SkeletonState / HonestNullState** - network, store review, and no-trigger fallback states.
- **NEW: StarRatingInput** - five discrete 44px star targets with accessible labels. Rationale: catalog choice cards do not model star sentiment input.

## Data Honesty
- **Trigger reason:** real = milestone/level/quest event plus provenance; low-confidence = trigger queued after offline event; honest-null = sheet does not appear.
- **Star rating:** real = selected 1-5 value; low-confidence = gesture preview before release; honest-null = no value selected.
- **Store review handoff:** real = native prompt requested; low-confidence = OS may throttle display; honest-null = no store review claim.
- **Feedback submission:** real = sent or queued timestamp; low-confidence = offline queue pending; honest-null = no feedback entered.
- **Cooldown state:** real = 30-day not now, 60-day completed, or permanent suppression; low-confidence = local clock uncertain; honest-null = no cooldown shown.

## Consent and Safety
- App rating uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** initial question, five stars, not now, don't ask again.
- **Skeleton:** not normally shown; if trigger metadata loads, sheet geometry appears without fake event copy.
- **Empty:** HonestNullState is internal only: no qualifying trigger means no sheet renders.
- **Error:** feedback text persists; store failure offers maybe later and retry without blame.
- **Success:** store handoff or feedback submission turns CTA green with check and dismisses after confirmation.
- **Disabled:** Submit feedback dims to 40% with helper reason until minimum text length or network queue is available.

## Motion
- **Sheet:** backdrop fades in; sheet slides up with 520ms physical easing.
- **Stars:** selected stars fill center-out, bounce once, and announce selected rating.
- **Path swap:** after star selection, positive or negative content crossfades in 280ms.
- **Dismiss:** drag-down, backdrop tap, and not now share the same cooldown path.
- **Reduced-motion:** disables star bounce and sheet slide; content appears with opacity-only transition.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; system-triggered bottom-sheet overlay after positive moments..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** sheet text, stars, and links clear AA+ on `#211008`.; **Targets:** every star, CTA, dismissal link, and drag area has at least 44px touch size.; **Screen readers:** stars announce "1 star" through "5 stars"; selected path and cooldown are announced.
