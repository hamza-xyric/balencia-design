# 77-message-actions - hi-fi glass spec

### 1. Header
- **ID:** 77
- **Name:** Message actions
- **Route(s) covered:** no live route; modal action surface from chat threads.
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** CIA communication modal.
- **Source:** app_design 3/77-message-actions.md and ascii_wireframes/77-message-actions.md.
- **Batch:** 18

### 2. Purpose
Message actions is the focused privacy surface after a long press in Direct Chat [75] or Group Chat [76]. It lets the user react, copy, pin, forward, delete, save to mission, and open protected media without crowding the thread.

### 3. Entry & exit
- **Entry:** long press a message, proof card, media attachment, or CIA assist bubble.
- **Primary exit:** Done returns to the source thread.
- **Action exits:** react, copy, delete, forward, open media, save to mission, or view image [67].
- **Privacy exit:** view-once media confirmation and CIA summarization scope live above actions.
- **Failure exit:** unavailable message shows Done and no destructive surprises.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Modal TopBar with Back and "Message actions."
2. Privacy/status pills: view-once, private, CIA can summarize.
3. Selected message preview with author, time, attachment, and useful reaction.
4. Quick reactions grid.
5. Action ListRows: Pin, Star for mission, Copy, Forward, Delete, Open media.
6. Shared media vault.
7. Fixed Done CTA.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| < Back       Message actions         |
| [view-once protected] [CIA summarize]|
| SELECTED MESSAGE        Private      |
| AK 9:41 Perfect. I added the hill... |
| [Hill segment] [Useful]              |
| QUICK REACTIONS                      |
| [Useful] [Support] [Done] [Insight] |
| ACTIONS                              |
| Pin message, Star for mission, Copy  |
| Forward, Delete, Open view-once      |
| SHARED MEDIA: Hill, Pace note, Plan  |
| [Done]                               |
| Today | CIA | Goals | Me             |
+--------------------------------------+
```

### 5. Components
- **TopBar** - labeled Back and title.
- **GlassCard** - selected message preview.
- **CIAChatBubble / InlineArtifactCard** - rendered read-only inside preview.
- **ListRow** - action rows.
- **Sheet** - delete confirmation, forward target, save to mission.
- **ChipProvenance** - message source, media source, view-once, CIA summary.
- **BtnPrimary** - Done.
- **ErrorState / EmptyState / SkeletonState** - utility states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` modal backdrop; sheet/card surfaces on `#211008`.
- **Semantic glows:** selected reaction uses `--glow-you #FF5E00`; successful save/delete confirmation uses `--glow-done #34A853`; CIA summarize pill uses `--glow-cia #7F24FF`.
- **Restraint:** no chart primitives and no hero glow; selected message card is the focal depth object.
- **Color:** orange selected reaction and Done; purple CIA scope; green success only.
- **Type:** Neue Montreal plus one Tiempos italic privacy word, e.g. "keep it *private*."

### 7. Content & copy
- **Pills:** "View-once protected", "Private", "CIA can summarize."
- **Preview:** "Perfect. I added the hill segment to today's run."
- **Reactions:** "Useful", "Support", "Done", "Insight."
- **Actions:** "Pin message", "Star for mission", "Copy", "Forward", "Delete", "Open this media", "Save to mission."
- **View-once copy:** "View once, then it is gone."
- **Empty copy:** "No shared media in this message."

### 8. Data & honesty states
- **Message:** real = selected message with source/time; low-confidence = local cached message; honest-null = "Message no longer available."
- **Media:** real = permitted media with provenance; low-confidence = thumbnail pending; honest-null = no shared media.
- **Reactions:** real = synced reaction; low-confidence = queued offline reaction; honest-null = no reaction selected.
- **CIA summary:** real = explicit permission; low-confidence = draft summary; honest-null = hidden when scope denied.
- **Controls:** social data, media, voice, CIA summary, and deleted messages expose revoke/delete/report as appropriate.

### 9. All states
- **Default:** preview, privacy pills, reactions, actions, media vault, Done render.
- **Skeleton:** selected message and action rows shimmer in final geometry.
- **Empty:** no shared media uses text, not a fake media tile.
- **Error:** deleted message card explains the issue and leaves Done enabled.
- **Success:** reaction, copy, delete, or save shows green confirmation.
- **Disabled:** view-once media, forward, or delete dims with reason after use or when offline.

### 10. Motion & interaction
- **Load:** preview fades first, reactions and actions follow.
- **Reaction:** selected pill bounces and sets aria-pressed.
- **Delete:** opens confirmation Sheet with exact message action.
- **Copy:** copies text and shows green toast.
- **Open media:** confirms view-once before Image Viewer [67].
- **Reduced-motion:** no bounce or stagger; state changes use opacity.

### 11. Motivation-tier adaptation
- **Low:** selected message, two reactions, delete/copy, Done.
- **Medium:** default action set.
- **High:** show media vault, save-to-mission, forward, and CIA summary scope details.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** reactions, action rows, media cards, Back, and Done are 44px minimum.
- **Screen readers:** preview announces author, time, privacy, media, reaction state, and available actions.
- **Safety:** report, block, delete, and crisis support routing remain reachable from destructive or harm-related messages.
- **Data controls:** social, media, voice, CIA summary, and third-party data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** message actions bridge chat, media, mission, and CIA summary.
2. **Honest:** privacy and media state are explicit.
3. **Premium:** focused modal, no noisy dashboard.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** reaction, success, and CIA scope meanings stated.
6. **60/30/10:** orange action, green success, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** aria-pressed, labels, 44px targets, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used.
13. **CIA voice:** summarization scope is explicit and controllable.
