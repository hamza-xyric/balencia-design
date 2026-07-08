# 40-community-chat-rooms - A+++ hi-fi mobile spec

## Header
- **Source ID:** 40
- **Source spec:** `Balencia-New-Screens/screens/40-community-chat-rooms.md`
- **Evidence:** screens/40-community-chat-rooms.md, app_design 3/40-community-chat-rooms.md and ascii_wireframes/40-community-chat-rooms.md.
- **Route(s):** `/community`, `/community/[slug]`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Community is the optional social hub for rooms, circles, accountability pods, and room chat.
- **Premium Visual Director:** make Community chat rooms composer the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Community chat rooms exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <        Community                   |
| DISCOVER: Fitness lovers, Book club  |
| YOUR ROOMS                           |
| Morning crew 5 members, 3 unread     |
| Study group 3 members, yesterday     |
| Accountability pod 4 members         |
| [ + create room ]                    |
| -- Room interior --                  |
| Morning crew (5) settings            |
| Sarah: Great workout this morning.   |
| Achievement: Sarah hit goal +150 XP  |
| You: I did my reading today.         |
| Say something...                send |
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: `/community`, `/community/[slug]`
```

## Focal Hierarchy
- **Dominant focal moment:** Community chat rooms composer; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with "Community." with CIA only when the source supports a synthesized read.
- **Operational layer:** Discover carousel with curated room cards., Your rooms list in one SolidCard., Create room FAB., Room interior.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*rooms*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - list and room headers.
- **PodCard** - discover and room cards.
- **AvatarStack** - member and presence read.
- **FeedPostCard** - shared achievement style when proof appears in chat.
- **ChatComposer** - room input.
- **Sheet** - room preview, member list, settings, report/mute/block.
- **ChipProvenance** - member count, room membership, proof source, moderation.
- **SafetyResourceCard / ConsentCard** - social safety and sharing settings.
- **EmptyState / SkeletonState / ErrorState / OfflineBanner** - states.

## Data Honesty
- **Room list:** real = membership, unread count, last message; low-confidence = cached rooms; honest-null = empty room prompt.
- **Discover:** real = curated/live rooms; low-confidence = popularity delayed; honest-null = hide carousel.
- **Messages:** real = server thread; low-confidence = queued local message; honest-null = new room prompt.
- **Achievements:** real = member-shared proof; low-confidence = pending proof; honest-null = no achievement card.
- **Controls:** social data, messages, media, proof, room membership, and third-party signals expose consent/revoke/delete/report.

## Consent and Safety
- Community chat rooms exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/community`, `/community/[slug]`. Do not add alternate vanity routes.

## States
- **Default:** discover, rooms, create FAB, and room interior render.
- **Skeleton:** discover cards, room rows, and chat bubbles shimmer.
- **Empty:** discover remains; Your rooms shows warm empty prompt and create CTA.
- **Error:** cached rooms stay with retry; failed send stays inline.
- **Success:** joined room appears in Your rooms; achievement shows green feedback.
- **Disabled:** join, create, send, or report dims when moderation, privacy, or connectivity blocks it.

## Motion
- **Load:** discover cards slide in, room rows fade, FAB settles last.
- **Join:** room preview Sheet confirms visibility and rules.
- **Room tap:** pushes interior and scrolls to latest message.
- **Composer:** send queues offline and updates delivery state.
- **Achievement:** shared achievement scales in once, then rests.
- **Reduced-motion:** disables slide and scale; content appears final.

## Image Slots
- `HIFI-40-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: Community chat rooms avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/community`, `/community/[slug]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** room cards, FAB, room rows, composer, settings, and report actions are 44px minimum.; **Screen readers:** room rows announce name, members, unread, last activity, and moderation status.
