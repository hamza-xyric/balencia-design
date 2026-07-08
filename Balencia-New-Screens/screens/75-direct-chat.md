# 75-direct-chat - hi-fi glass spec

### 1. Header
- **ID:** 75
- **Name:** Direct chat
- **Route(s) covered:** /messages
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** CIA / communication stack.
- **Source:** app_design 3/75-direct-chat.md plus ascii_wireframes/75-direct-chat.md.
- **Batch:** 18

### 2. Purpose
Direct chat is the private one-to-one social layer for a trusted contact. It protects the human relationship first: Aisha and the user own the thread, while CIA assist is opt-in, private, and only used for pacing, summaries, or saving a decision to a mission.

### 3. Entry & exit
- **Entry:** Conversations Hub [74], Social Buddy Profile [83], Accountability [46], Community [40], or a profile message action.
- **Primary exit:** back to origin or keep composing inside the fixed composer.
- **Action exits:** call button opens voice setup; info opens the peer profile; long press opens Message Actions [77].
- **Assist exit:** CIA assist sheet can suggest a reply, summarize the thread, or save a decision to a mission.
- **Failure exit:** failed sends stay inline with retry; offline messages queue rather than ejecting the user.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Fixed TopBar with back, "Aisha Khan", call, and info actions.
2. Profile rail with avatar, shared mission, and hairline MomentumBar.
3. CIA assist strip with permission info and scoped assist chips.
4. Date divider and scrollable message thread.
5. Contact, user, CIA assist, attachment, reaction, and typing states.
6. Fixed ChatComposer above GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <        Aisha Khan        call info |
+--------------------------------------+
| +----------------------------------+ |
| | AK  Aisha is training with you   | |
| |     Shared mission: Run 30 min   | |
| |     progress [##########------]62| |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA ASSIST                 info  | |
| | Suggest pacing, summarize, save  | |
| | to mission. You control access.  | |
| | [Pace] [Shared] [Private]        | |
| +----------------------------------+ |
| ------------ Today ---------------- |
| Aisha: I am thinking of the river   |
|        route this Sunday.           |
| CIA assist: Your recovery supports  |
|             the river route.        |
|             [Pace at 7 min/mile]    |
|                         You: Works. |
|                         9:05 read   |
| Aisha: Hill segment photo attached  |
|        [Hill segment] [Useful 1]    |
| ... Aisha is typing                 |
+--------------------------------------+
| attach  Message Aisha          send |
+--------------------------------------+
| Today | CIA | Goals | Me            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title, back, call, and info with 44px targets.
- **ChatComposer** - text input, attachment, voice, and send affordances.
- **CIAChatBubble** - only for opt-in CIA assist content; never impersonates the peer.
- **InlineArtifactCard** - hill segment photo, mission card, plan snippet, or voice memo preview.
- **Sheet** - CIA assist controls, message options, contact info, and delete confirmation.
- **ChipProvenance** - shared mission source, attachment origin, and assist evidence.
- **MomentumBar** - shared mission progress rail; continuous and quiet.
- **SafetyResourceCard** - reachable from report/block flows and crisis language detection.
- **SkeletonState / ErrorState / HonestNullState** - catalog states adapted to thread geometry.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with the mandatory warm radial glow; chat stays calm, not dashboard-like.
- **Bubbles:** contact bubbles use SolidCard-like `#211008`; user bubbles use orange-tinted glass; CIA assist bubbles use purple-tinted glass.
- **Semantic glows:** shared mission progress uses `--glow-you #FF5E00`; saved-to-mission confirmation uses `--glow-done #34A853`; CIA assist uses `--glow-cia #7F24FF` because it is synthesized.
- **Hierarchy:** message thread is the focal surface; profile rail and assist strip support context without becoming hero cards.
- **Type:** Neue Montreal for UI; one Tiempos italic word in the assist strip, e.g. "keep it *private*."

### 7. Content & copy
- **Header:** "Aisha Khan."
- **Profile rail:** "Aisha is training with you." "Shared mission: Run 30 min."
- **CIA assist:** "CIA can suggest pacing, summarize your chat, or save to a mission. You control what I read."
- **Permission sheet:** "Aisha cannot see CIA suggestions unless you send them."
- **Thread samples:** "I am thinking of the river route this Sunday." "Your recovery supports the river route." "That works."
- **Composer placeholder:** "Message Aisha."
- **Read receipts:** "sent", "delivered", "read" paired with glyphs.
- **Failure copy:** "Tap to retry." Offline: "Waiting for connection."

### 8. Data & honesty states
- **Thread messages:** real = server message with sender, time, and delivery provenance; low-confidence = queued local message labeled "waiting"; honest-null = new thread prompt "Start the first message."
- **Shared mission:** real = mission progress plus ChipProvenance; low-confidence = stale sync label; honest-null = no MomentumBar and copy "No shared mission yet."
- **CIA assist:** real = explicit opt-in plus evidence chips; low-confidence = "draft suggestion" label before sending; honest-null = hide assist suggestions until permission is granted.
- **Attachments:** real = preview plus source and retention; low-confidence = thumbnail pending; honest-null = "This media is no longer available."
- **Consent controls:** voice, media, social relationship data, CIA summaries, and delete/revoke actions are reachable from info and message actions.

### 9. All states
- **Default:** profile rail, assist strip, date divider, messages, attachment cards, typing, composer, and nav render.
- **Skeleton:** profile rail, assist strip, and four alternating bubble skeletons match final sizes.
- **Empty:** new thread keeps profile and assist context, then centers "Start the first message."
- **Error:** load failure shows cached messages if safe; failed send remains inline with retry.
- **Success:** sent message appears optimistically, then delivery state progresses to delivered or read; save-to-mission flashes green.
- **Disabled:** send button is Disabled until text, voice, or attachment exists; CIA assist controls dim when permission is revoked.

### 10. Motion & interaction
- **Load:** rail fades in, assist strip follows, then messages stagger by 40ms.
- **Send:** outgoing bubble rises 8px, settles, and updates delivery glyph without layout jump.
- **Long press:** bubble lifts to a Sheet with React, Copy, Delete, Forward, and Save to mission.
- **Typing:** three dots animate unless reduced-motion is active.
- **Assist:** tapping "Pace" inserts a draft into the composer, never sends automatically.
- **Reduced-motion:** disables stagger, dot loop, and bubble lift; state changes use opacity-only feedback.

### 11. Motivation-tier adaptation
- **Low:** hide the assist strip behind a single "CIA assist" pill and show the composer plus newest messages.
- **Medium:** default profile rail, assist strip, and thread.
- **High:** expand shared mission metadata, delivery details, attachment provenance, and assist evidence chips.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` clears AA+; purple/orange tints never carry meaning alone.
- **Targets:** back, call, info, chips, message actions, composer buttons, and send maintain 44px touch areas.
- **Screen readers:** bubbles announce author, time, delivery state, text, and attachment summary.
- **Safety:** report, mute, block, crisis resources, and delete controls are accessible from info and long press.
- **Data controls:** user can revoke CIA assist, delete media, remove voice drafts, and clear social thread data.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** chat ties a human relationship to shared missions and optional CIA support.
2. **Honest:** message, mission, attachment, and assist states carry provenance.
3. **Premium:** thread is the focus; progress rail is quiet and source-specific.
4. **Warm-dark:** canon background and warm bubbles used.
5. **Semantic glow:** progress, completion, and CIA glow are meaningful.
6. **60/30/10:** orange user/action, green read/saved, purple assist only.
7. **Type:** Neue Montreal plus one Tiempos italic emphasis word in assist copy.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high chat density specified.
10. **Accessibility:** 44px targets, labels, contrast, and reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined for thread data.
12. **Catalog:** canon components named; no unflagged one-offs.
13. **CIA voice:** CIA is assistive, opt-in, and never a hidden third participant.
