# 75 Direct chat - A+++ hi-fi mobile spec

## Header
- **Source ID:** 75
- **Source spec:** `Balencia-New-Screens/screens/75-direct-chat.md`
- **Evidence:** `app_design 3/75-direct-chat.md`, `ascii_wireframes/75-direct-chat.md`
- **Route:** `/messages`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve header, profile rail, CIA assist strip, message thread, attachment, typing, composer, and Message Actions handoff.
- **Premium Visual Director:** keep the message thread as focal; the shared mission bar is a hairline, not a dashboard.
- **Interaction and State Designer:** composer enabled/disabled, optimistic send, queued offline, long press, delivery glyphs, and reduced-motion typing are required.
- **Trust and Safety Reviewer:** CIA assist is opt-in, private, and revocable; report/mute/block/delete must be close.
- **GLM directions considered:** human-first thread, CIA co-pilot, mission accountability chat. **Chosen:** human-first thread with scoped CIA assist.

## Final Composition

```text
+--------------------------------------+
| <        Aisha Khan        call info |
| +----------------------------------+ |
| | AK  Aisha is training with you   | |
| |     Shared mission: Run 30 min   | |
| |     [#############-----] 62%      | |
| |     arriving together            | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA assist                 info  | |
| | Suggest pacing, summarize, save  | |
| | to mission. You control access.  | |
| | [Pace] [Shared] [Private]        | |
| +----------------------------------+ |
| ------------- Today --------------- |
| Aisha: I am thinking of the river   |
|        route this Sunday.           |
| Private CIA draft, visible to you:   |
| Recovery supports the river route.   |
| [Insert draft] [Share health source] |
|                         You: Works. |
|                         9:05 read   |
| Aisha: Hill segment photo attached  |
|        [Hill segment] [Useful 1]    |
| ... Aisha is typing                 |
| attach  Message Aisha          send |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** the thread itself.
- **Context:** profile rail with shared mission hairline `MomentumBar`.
- **CIA layer:** opt-in assist strip and private draft tray, visually separate from peer-visible messages.
- **Composer:** becomes focal only on input.

## Visual System
- Contact bubbles use layered `SolidCard` warmth.
- User bubbles use orange-tinted glass, no hard border.
- CIA assist bubbles use purple tint and label "CIA assist."
- Shared mission bar uses orange progress; saved-to-mission confirmation uses green.
- Neue Montreal; Tiempos italic word in assist info: "*private*".

## Figma Reference Alignment
- **Language-derived evidence:** no direct Direct Chat frame was visible in the supplied Figma screenshots; use the Figma warm-light shell and compact control language where it does not conflict with chat readability.
- **Shell/anatomy:** header should feel like the Figma native top bars: rounded back control, centered contact name, compact trailing call/info icons, light paper background, and soft gray separators. The thread stays human-first; CIA assist remains a purple opt-in strip, never an auto-sent message.
- **Component carryover:** use Figma's rounded input/pill language for the composer, orange send/action affordance, pastel attachment chips, and green completion chips when something is saved to a shared mission.
- **Safety carryover:** info sheet and long-press actions visibly include report, mute, block, export thread, revoke CIA assist, delete summaries/media, and private crisis resources.

## Components
- `TopBar`, `ChatComposer`, `CIAChatBubble`, `InlineArtifactCard`, `Sheet`, `ChipProvenance`, `MomentumBar`, `SafetyResourceCard`, `SkeletonState`, `ErrorState`.

## Data Honesty
- Messages: server state with sender, timestamp, edited/deleted/delivery labels.
- Queued messages: local and labeled "waiting for connection."
- Shared mission: progress source chip or honest-null "No shared mission yet."
- Attachments: source, retention, pending thumbnail, missing media state.
- CIA assist: draft suggestion until sent by user; evidence chips required for claims.

## Consent and Safety
- CIA assist sheet: "Aisha cannot see CIA suggestions unless you send them."
- Health/recovery context cannot enter the peer-visible thread until the user explicitly chooses Share health source or rewrites it into a normal message.
- User can revoke thread assist, export thread data, delete summaries, clear media, delete voice drafts, and remove CIA memory for this thread.
- Info and long-press menu include Report, Mute, Block, Delete, Copy, Save to mission, plus explicit completion states: muted, blocked, reported, deleted, revoked.
- Crisis language detection offers SafetyResourceCard in the report flow without exposing it to the other person. A private `support and safety` entry is always reachable from the info sheet even without detection.

## States
- **Default:** rail, assist strip, thread, typing, composer.
- **Skeleton:** rail, assist strip, and bubble placeholders.
- **Empty:** "Start the first message. Aisha is here if you need help."
- **Error:** cached messages stay; failed send remains inline with retry.
- **Offline:** composer remains editable; sends queue.
- **Disabled:** send disabled until content exists; CIA assist dimmed when permission revoked.

## Implementation Readiness
- **Real data:** messages render only from server thread state or local queued sends with sender, timestamp, delivery, edit/delete status, attachment source, and source freshness; shared health or mission proof needs a visible `ChipProvenance`.
- **Low-confidence:** CIA draft suggestions and health/recovery context use muted copy plus `estimated - low confidence` until source freshness and sharing scope are confirmed; they never auto-send.
- **Honest-null:** no shared mission, no media thumbnail, no voice draft, or no CIA-assist permission becomes a designed empty row with an action such as `Invite to mission`, `Retry media`, or `Turn on CIA assist`; no filler messages.
- **Disabled states:** Send, Share health source, Insert draft, call, attachment, and CIA assist controls dim to 40% with a reason when offline, blocked, permission-revoked, moderation-limited, or source-stale.
- **44px and screen readers:** back, call, info, chips, message action, composer, mic, attach, and send controls maintain 44px targets; screen-reader labels announce delivery state, attachment type/source, queued/offline status, and whether a CIA draft is private or peer-visible.
- **Controls and consent:** info/long-press sheets expose export thread, revoke CIA assist, delete summaries, delete/clear media, delete voice drafts, report, mute, block, and delete message where allowed. Health, photo, voice, and social sharing each show consent state before entering the peer-visible thread.

## Motion
- Rail and assist fade in; bubbles stagger subtly.
- New outgoing bubble rises 8px and settles.
- Long press lifts a bubble into message actions.
- Typing dots animate only when reduced motion is off.

## Image Slots
- `HIFI-75-01` hill segment attachment placeholder.

## Implementation Notes
- Route stays `/messages`.
- Long press opens screen 77 as modal/action surface; do not invent a route.
