# 76-group-chat - A+++ hi-fi mobile spec

## Header
- **Source ID:** 76
- **Source spec:** `Balencia-New-Screens/screens/76-group-chat.md`
- **Evidence:** screens/76-group-chat.md, app_design 3/76-group-chat.md and ascii_wireframes/76-group-chat.md.
- **Route(s):** `/chat`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Group chat is the small-room thread for mission crews, pods, and accountability groups.
- **Premium Visual Director:** make Group chat composer the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Group chat exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <      Morning crew          +  info |
| ROOM MISSION: Tempo run together     |
| members joining [############----]4/5|
| [120 group XP] [CIA pacing]          |
| avatars: 5 members, 3 online         |
| ------------ Today ---------------- |
| Kenji: Tomorrow is tempo day.        |
| CIA recap: three members share pace. |
| [Group tempo mission] [I can lead]   |
| You: I can lead the easy group.      |
| CIA is preparing pace...             |
| Message Morning crew            send |
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: `/chat`
```

## Focal Hierarchy
- **Dominant focal moment:** Group chat composer; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with "Morning crew", add member, and group info. with CIA only when the source supports a synthesized read.
- **Operational layer:** Room mission card with group XP and joining progress., Member summary rail with AvatarStack and presence., Date divider and group message thread., CIA recap bubble, shared mission attachment, typing state..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*chat*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Group Chat frame was visible in the supplied screenshots and Figma MCP returned an access error in this pass.
- **Thread anatomy:** `/chat` is the group/thread state launched from Conversations Hub. Use warm native top bar, `AvatarStack`, compact `PodCard`, group progress chips, private CIA recap preview, and composer pinned above nav.
- **Route truth:** this screen owns `/chat` group/thread behavior; Conversations Hub may link to it but should not duplicate ownership.

## Components
- **TopBar** - group title, add, info.
- **PodCard / GlassCard** - room mission context.
- **AvatarStack** - member summary.
- **CIAChatBubble** - CIA recap and pacing suggestions.
- **ChatComposer** - message input, mention, attach, send.
- **InlineArtifactCard** - group mission plan.
- **MomentumBar** - members joining ratio.
- **Sheet** - members, info, add member, message actions.
- **SafetyResourceCard / ConsentCard** - reporting and shared health/recovery consent.

## Data Honesty
- **Messages:** real = server message with sender/time; low-confidence = queued local message; honest-null = empty thread prompt.
- **Mission:** real = shared mission progress; low-confidence = stale group sync; honest-null = no mission card.
- **Presence:** real = live presence; low-confidence = last seen; honest-null = hide online count.
- **CIA recap:** real = explicit group consent and evidence provenance; low-confidence = draft recap; honest-null = no CIA bubble.
- **Controls:** social messages, group membership, health/recovery signals, media, voice, and CIA group insights expose consent/revoke/delete/report.

## Consent and Safety
- Group info sheet exposes audience, visibility, membership, export transcript, revoke CIA recap, delete own content/media, report/mute/block, leave group, and crisis-resource handoff in report flow.
- Group XP/progress is optional and never attached to health/nutrition/sleep compliance; members can hide social comparison from this thread.
- Keep navigation targets aligned to `/chat`. Do not add alternate vanity routes.

## States
- **Default:** mission, members, messages, CIA recap, typing, composer, and nav render.
- **Skeleton:** mission card, avatar rail, and alternating bubbles shimmer.
- **Empty:** mission and member rail stay; centered first-message prompt appears.
- **Error:** failed send shows retry; group load error keeps cached thread.
- **Success:** sent message appears, member join updates MomentumBar, accepted CIA plan flashes green.
- **Disabled:** send, add member, or CIA recap dims when permissions, moderation, or connectivity blocks them.

## Motion
- **Load:** mission card enters first, member rail follows, messages stagger.
- **Send:** outgoing bubble slides up and delivery state updates.
- **CIA recap:** tapping opens private preview; user chooses whether to post.
- **Members:** AvatarStack opens members Sheet.
- **Long press:** opens Message Actions [77].
- **Reduced-motion:** disables stagger and typing animation; content appears settled.

## Image Slots
- `HIFI-76-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: Group chat avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/chat`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** add, info, avatars, mission, messages, chips, and composer controls are 44px minimum.; **Screen readers:** messages announce author, time, delivery, text, attachment, and report options.
