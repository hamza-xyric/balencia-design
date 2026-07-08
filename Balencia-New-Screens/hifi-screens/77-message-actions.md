# 77-message-actions - A+++ hi-fi mobile spec

## Header
- **Source ID:** 77
- **Source spec:** `Balencia-New-Screens/screens/77-message-actions.md`
- **Evidence:** screens/77-message-actions.md, app_design 3/77-message-actions.md and ascii_wireframes/77-message-actions.md.
- **Route(s):** no live route; modal action surface from chat threads.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Message actions is the focused privacy surface after a long press in Direct Chat [75] or Group Chat [76].
- **Premium Visual Director:** make Message actions command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Message actions exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| action sheet over chat thread        |
| [view-once protected] [CIA summarize]|
| SELECTED MESSAGE        Private      |
| AK 9:41 Perfect. I added the hill... |
| [Hill segment] [Useful]              |
| QUICK REACTIONS                      |
| [Useful] [Support] [Done] [Insight] |
| ACTIONS                              |
| Pin, Star, Copy, Forward             |
| Report, Mute/block sender, Export    |
| Revoke CIA summary, Delete summary   |
| Delete own message/media             |
| SHARED MEDIA: Hill, Pace note, Plan  |
| [Done]                               |
+--------------------------------------+

Route handling: no live route; modal action surface from chat threads.
```

## Focal Hierarchy
- **Dominant focal moment:** Message actions command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Modal TopBar with Back and "Message actions." with CIA only when the source supports a synthesized read.
- **Operational layer:** Privacy/status pills, Quick reactions grid., Action ListRows, Shared media vault..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*actions*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Message Actions frame was visible in the supplied screenshots. This is a `Sheet`/modal over [75] or [76], not a standalone route or full bottom-nav screen.
- **Modal anatomy:** selected-message preview, privacy/source pills, quick reactions, action `ListRow`s, destructive actions grouped at the bottom, and `Done`. No owned bottom nav inside the sheet.

## Components
- **TopBar** - labeled Back and title.
- **GlassCard** - selected message preview.
- **CIAChatBubble / InlineArtifactCard** - rendered read-only inside preview.
- **ListRow** - action rows.
- **Sheet** - delete confirmation, forward target, save to mission.
- **ChipProvenance** - message source, media source, view-once, CIA summary.
- **BtnPrimary** - Done.
- **ErrorState / EmptyState / SkeletonState** - utility states.

## Data Honesty
- **Message:** real = selected message with source/time; low-confidence = local cached message; honest-null = "Message no longer available."
- **Media:** real = permitted media with provenance; low-confidence = thumbnail pending; honest-null = no shared media.
- **Reactions:** real = synced reaction; low-confidence = queued offline reaction; honest-null = no reaction selected.
- **CIA summary:** real = explicit permission; low-confidence = draft summary; honest-null = hidden when scope denied.
- **Controls:** social data, media, voice, CIA summary, and deleted messages expose revoke/delete/report as appropriate.

## Consent and Safety
- Action list explicitly includes report message, mute/block sender, export message/thread data, revoke CIA summary permission, delete CIA summary, delete own message/media, and crisis-resource handoff when reporting crisis content.
- View-once and forwarded media name retention and visibility before opening; destructive actions use confirmation sheets with cancel equal prominence.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** preview, privacy pills, reactions, actions, media vault, Done render.
- **Skeleton:** selected message and action rows shimmer in final geometry.
- **Empty:** no shared media uses text, not a fake media tile.
- **Error:** deleted message card explains the issue and leaves Done enabled.
- **Success:** reaction, copy, delete, or save shows green confirmation.
- **Disabled:** view-once media, forward, or delete dims with reason after use or when offline.

## Motion
- **Load:** preview fades first, reactions and actions follow.
- **Reaction:** selected pill bounces and sets aria-pressed.
- **Delete:** opens confirmation Sheet with exact message action.
- **Copy:** copies text and shows green toast.
- **Open media:** confirms view-once before Image Viewer [67].
- **Reduced-motion:** no bounce or stagger; state changes use opacity.

## Image Slots
- `HIFI-77-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: Message actions avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: no live route; modal action surface from chat threads..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** reactions, action rows, media cards, Back, and Done are 44px minimum.; **Screen readers:** preview announces author, time, privacy, media, reaction state, and available actions.
