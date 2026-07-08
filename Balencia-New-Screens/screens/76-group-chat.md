# 76-group-chat - hi-fi glass spec

### 1. Header
- **ID:** 76
- **Name:** Group chat
- **Route(s) covered:** /chat
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** CIA communication stack.
- **Source:** app_design 3/76-group-chat.md and ascii_wireframes/76-group-chat.md.
- **Batch:** 18

### 2. Purpose
Group chat is the small-room thread for mission crews, pods, and accountability groups. It keeps members, room mission, CIA recap, and pacing context visible without turning the thread into a dashboard.

### 3. Entry & exit
- **Entry:** Conversations Hub [74], Community [40], Accountability [46], Competitions [47], or group links.
- **Primary exit:** send a message or return to origin.
- **Action exits:** add member, group info, member profile, mission detail, or Message Actions [77].
- **CIA exit:** CIA recap and pace plan open a private assist sheet before posting.
- **Failure exit:** offline messages queue and failed sends stay inline.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Morning crew", add member, and group info.
2. Room mission card with group XP and joining progress.
3. Member summary rail with AvatarStack and presence.
4. Date divider and group message thread.
5. CIA recap bubble, shared mission attachment, typing state.
6. ChatComposer and GlassNavBar.

**ASCII wireframe (390x844):**
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
```

### 5. Components
- **TopBar** - group title, add, info.
- **PodCard / GlassCard** - room mission context.
- **AvatarStack** - member summary.
- **CIAChatBubble** - CIA recap and pacing suggestions.
- **ChatComposer** - message input, mention, attach, send.
- **InlineArtifactCard** - group mission plan.
- **MomentumBar** - members joining ratio.
- **Sheet** - members, info, add member, message actions.
- **SafetyResourceCard / ConsentCard** - reporting and shared health/recovery consent.

### 6. Visual treatment
- **Atmosphere:** warm `#0A0A0F`; thread uses calm solid cards.
- **Semantic glows:** mission join progress uses `--glow-you #FF5E00`; group success uses `--glow-done #34A853`; CIA recap uses `--glow-cia #7F24FF`.
- **Color:** domain red only as ChipDomainTag on mission; orange action, green presence/done, purple CIA.
- **Thread:** human messages use warm `#211008`; user messages get a small orange tint.
- **Type:** Neue Montreal plus one Tiempos italic word in recap, e.g. "pace *together*."

### 7. Content & copy
- **Header:** "Morning crew."
- **Mission:** "Tempo run together." "Two pace groups, one shared XP."
- **Member rail:** "5 members. 3 online."
- **CIA recap:** "Three members share your pace. Recovery time together matters."
- **Quick reply:** "I can lead."
- **Composer:** "Message Morning crew."
- **Empty copy:** "Ready to move together. Send the first message to sync your pace."

### 8. Data & honesty states
- **Messages:** real = server message with sender/time; low-confidence = queued local message; honest-null = empty thread prompt.
- **Mission:** real = shared mission progress; low-confidence = stale group sync; honest-null = no mission card.
- **Presence:** real = live presence; low-confidence = last seen; honest-null = hide online count.
- **CIA recap:** real = explicit group consent and evidence provenance; low-confidence = draft recap; honest-null = no CIA bubble.
- **Controls:** social messages, group membership, health/recovery signals, media, voice, and CIA group insights expose consent/revoke/delete/report.

### 9. All states
- **Default:** mission, members, messages, CIA recap, typing, composer, and nav render.
- **Skeleton:** mission card, avatar rail, and alternating bubbles shimmer.
- **Empty:** mission and member rail stay; centered first-message prompt appears.
- **Error:** failed send shows retry; group load error keeps cached thread.
- **Success:** sent message appears, member join updates MomentumBar, accepted CIA plan flashes green.
- **Disabled:** send, add member, or CIA recap dims when permissions, moderation, or connectivity blocks them.

### 10. Motion & interaction
- **Load:** mission card enters first, member rail follows, messages stagger.
- **Send:** outgoing bubble slides up and delivery state updates.
- **CIA recap:** tapping opens private preview; user chooses whether to post.
- **Members:** AvatarStack opens members Sheet.
- **Long press:** opens Message Actions [77].
- **Reduced-motion:** disables stagger and typing animation; content appears settled.

### 11. Motivation-tier adaptation
- **Low:** mission summary, latest messages, composer; CIA recap collapsed.
- **Medium:** default group thread.
- **High:** show member presence, join progress, group XP, and mission evidence chips.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** add, info, avatars, mission, messages, chips, and composer controls are 44px minimum.
- **Screen readers:** messages announce author, time, delivery, text, attachment, and report options.
- **Safety:** report/mute/block and SafetyResourceCard are available from group info and message actions.
- **Data controls:** shared recovery, social, media, voice, CIA recap, and third-party data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** group chat ties mission, members, CIA, and social proof.
2. **Honest:** presence, progress, and CIA recap carry source/confidence.
3. **Premium:** thread remains focal; only one quiet join meter.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** join, success, and CIA meanings stated.
6. **60/30/10:** orange action, green presence/success, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used.
13. **CIA voice:** group recap is consented and specific.
