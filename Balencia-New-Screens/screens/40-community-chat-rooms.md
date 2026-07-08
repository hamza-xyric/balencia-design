# 40-community-chat-rooms - hi-fi glass spec

### 1. Header
- **ID:** 40
- **Name:** Community chat rooms
- **Route(s) covered:** /community, /community/[slug]
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Social.
- **Source:** app_design 3/40-community-chat-rooms.md and ascii_wireframes/40-community-chat-rooms.md.
- **Batch:** 19

### 2. Purpose
Community is the optional social hub for rooms, circles, accountability pods, and room chat. It helps users find people on similar journeys while keeping solo coaching complete on its own. Moderation, report, mute, and privacy controls are first-class.

### 3. Entry & exit
- **Entry:** Explore community card, leaderboard find-community link, CIA social suggestion, or notification.
- **Primary exit:** join or enter a room.
- **Room exit:** back from room interior to room list.
- **Safety exit:** report/mute/block from room info and message actions.
- **Failure exit:** cached rooms and chat remain visible offline.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Community."
2. Discover carousel with curated room cards.
3. Your rooms list in one SolidCard.
4. Create room FAB.
5. Room interior: room header, member badge, date divider, chat messages, shared achievement card, composer.
6. GlassNavBar.

**ASCII wireframe (390x844):**
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
```

### 5. Components
- **TopBar** - list and room headers.
- **PodCard** - discover and room cards.
- **AvatarStack** - member and presence read.
- **FeedPostCard** - shared achievement style when proof appears in chat.
- **ChatComposer** - room input.
- **Sheet** - room preview, member list, settings, report/mute/block.
- **ChipProvenance** - member count, room membership, proof source, moderation.
- **SafetyResourceCard / ConsentCard** - social safety and sharing settings.
- **EmptyState / SkeletonState / ErrorState / OfflineBanner** - states.

### 6. Visual treatment
- **Atmosphere:** warm `#0A0A0F`; no purple unless CIA explanation appears in a Sheet.
- **Semantic glows:** own room activity uses `--glow-you #FF5E00`; shared achievements use `--glow-done #34A853`; optional CIA suggestion uses `--glow-cia #7F24FF`.
- **Rows:** Your rooms are rows inside one SolidCard, not card spam.
- **Chat:** own bubble has faint orange tint; peer bubbles use `#211008`.
- **Type:** Neue Montreal plus one Tiempos italic word in empty copy, e.g. "find your *people*."

### 7. Content & copy
- **H1:** "Community."
- **Discover rooms:** "Fitness lovers", "Book club", "Mindfulness."
- **Rooms:** "Morning crew", "Study group", "Accountability pod."
- **Interior:** "Great workout this morning." "Sarah hit her fitness goal. +150 XP."
- **CTA:** "Create room."
- **Moderation labels:** "Report room", "Mute room", "Block member."
- **Empty copy:** "Accountability is stronger with others. Join a community above or start your own."

### 8. Data & honesty states
- **Room list:** real = membership, unread count, last message; low-confidence = cached rooms; honest-null = empty room prompt.
- **Discover:** real = curated/live rooms; low-confidence = popularity delayed; honest-null = hide carousel.
- **Messages:** real = server thread; low-confidence = queued local message; honest-null = new room prompt.
- **Achievements:** real = member-shared proof; low-confidence = pending proof; honest-null = no achievement card.
- **Controls:** social data, messages, media, proof, room membership, and third-party signals expose consent/revoke/delete/report.

### 9. All states
- **Default:** discover, rooms, create FAB, and room interior render.
- **Skeleton:** discover cards, room rows, and chat bubbles shimmer.
- **Empty:** discover remains; Your rooms shows warm empty prompt and create CTA.
- **Error:** cached rooms stay with retry; failed send stays inline.
- **Success:** joined room appears in Your rooms; achievement shows green feedback.
- **Disabled:** join, create, send, or report dims when moderation, privacy, or connectivity blocks it.

### 10. Motion & interaction
- **Load:** discover cards slide in, room rows fade, FAB settles last.
- **Join:** room preview Sheet confirms visibility and rules.
- **Room tap:** pushes interior and scrolls to latest message.
- **Composer:** send queues offline and updates delivery state.
- **Achievement:** shared achievement scales in once, then rests.
- **Reduced-motion:** disables slide and scale; content appears final.

### 11. Motivation-tier adaptation
- **Low:** show only Your rooms and discover suggestions from close matches.
- **Medium:** default list and room interior.
- **High:** expose room filters, member presence, moderation state, and proof metadata.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** room cards, FAB, room rows, composer, settings, and report actions are 44px minimum.
- **Screen readers:** room rows announce name, members, unread, last activity, and moderation status.
- **Safety:** report, mute, block, and SafetyResourceCard are reachable from room and message menus.
- **Data controls:** social, media, proof, chat, CIA suggestions, and third-party data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** community ties rooms, chat, proof, achievements, and social safety.
2. **Honest:** membership, unread, proof, and moderation states are sourced.
3. **Premium:** rows-in-card, not generic card wall.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** activity, achievement, and CIA meanings stated.
6. **60/30/10:** orange action, green achievement, purple CIA only when present.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** PodCard, AvatarStack, FeedPostCard, ChatComposer used.
13. **CIA voice:** social suggestions are optional and consent-aware.
