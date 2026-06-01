# Screen Design: Message Actions

**Screen**: 77 of 90
**File**: 77-message-actions.md
**Route**: `/tabs/sia/message-actions`
**Register**: Product Mode with privacy controls
**Primary action**: Review and act on a selected chat message
**Tab**: SIA
**Navigation**: Modal-style stack push from Direct Chat [75] or Group Chat [76] after long-pressing a message. Back or Done returns to the source thread.

---

## Purpose

Message Actions is the focused action surface for a selected chat message. It collects reactions, pin/star/forward/open actions, and shared-media context without crowding the chat thread. Because messages may include view-once media, mission context, or SIA summaries, privacy and provenance are visible on the screen.

---

## Information Architecture

**Hierarchy**:
1. Header with title and back affordance
2. Privacy/status pills
3. Selected message preview
4. Quick reactions grid
5. Action list
6. Shared media vault
7. Done bottom action

**User flow**:
- **Arrives from**: Long press on message in Direct Chat [75] or Group Chat [76].
- **Primary exit**: Done -> return to thread.
- **Secondary exits**: Choose reaction, pin/star/forward/open media, tap shared media.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible SIA tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <      Message actions      |
+-----------------------------+
| [View-once protected]       |
| [SIA can summarize]         |
|                             |
| SELECTED MESSAGE   [Private]|
| [AK] Perfect. I added...    |
|      [Hill segment] [Useful]|
|                             |
| QUICK REACTIONS             |
| [Useful] [Support]          |
| [Done]   [Insight]          |
|                             |
| ACTIONS                     |
| [pin] Pin message           |
| [star] Star for mission     |
| [fwd] Forward               |
| [eye] Open view-once media  |
|                             |
| SHARED MEDIA                |
| [Hill] [Pace note] [Plan]   |
+-----------------------------+
|          Done               |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Selected Message Card
- **Purpose**: Preserve context for the action decision.
- **Visual treatment**: rounded-xl ink-brown card, white/8 border, shadow-2.
- **Content**: Section eyebrow, PrivacyPill, full ThreadMessage preview.
- **Behavior**: Message preview is read-only. Attachment taps preview media metadata but do not dismiss the screen.

### Privacy Pill
- **Purpose**: Make message privacy legible.
- **Visual treatment**: 28pt pill, lock icon, white/4 bg, white/8 border.
- **Label**: "Private".

### Quick Reactions Grid
- **Purpose**: Fast lightweight response.
- **Visual treatment**: 2-column grid, 44pt pill buttons.
- **Behavior**: Single tap applies reaction and shows selected state. First/default highlighted reaction uses brand-orange/12.

### Action List
- **Purpose**: Perform durable message actions.
- **Actions**:
  - Pin message: keep visible in chat.
  - Star for mission: attach to active mission.
  - Forward: send to another conversation or SIA.
  - Open view-once media: open protected media viewer.
- **Visual treatment**: 66pt minimum rows, icon circle, label, detail, rounded-lg ink-brown surface.

### Shared Media Vault
- **Purpose**: Show related media in the selected message cluster.
- **Visual treatment**: 3-column grid, small cards, domain-tinted icon blocks.
- **Behavior**: Tap media opens Image Viewer [67] or media preview when permitted.

### Done Button
- **Purpose**: Close the action surface.
- **Visual treatment**: Full-width orange CTA with shield icon.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Selected message/actions |
| Primary action | #FF5E00 | brand-orange | Done and selected reaction |
| SIA status | #7F24FF | royal-purple | SIA summarize pill |
| Privacy/status | #FFFFFF at 50% | white/50 | Privacy pill text |
| Protected media | Domain colors | domain registry | Media cards |
| Text primary | #FFFFFF | white | Labels |
| Text secondary | #FFFFFF at 35-45% | white/45 | Details |

**60/30/10 verification**: Orange marks primary completion and selected reaction. Purple appears only for SIA capability. Domain colors identify media sources.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Reaction | Selected | brand-orange/12 bg, brand-orange text/border |
| Reaction | Pressed | scale(0.96) |
| Action row | Pressed | bg white/6, icon border brand-orange/25 |
| View-once media | Opened | Row disabled after successful open |
| Media card | Unavailable | 50% opacity, lock icon |
| Done | Pressed | scale(0.96), light haptic |

---

## Motion

- Selected message fades up first.
- Reaction grid, action list, and media vault enter with 80ms/140ms/200ms stagger.
- Reaction selection uses 120ms scale pop.
- Forward and media preview use standard bottom sheet/modal transitions.

---

## Empty, Loading, Error

- **Missing selected message**: Show error card "Message no longer available" and Done button.
- **Media expired**: Shared media card remains but displays "Expired".
- **Reaction failed**: Toast "Reaction could not be saved" with retry.
- **Forward unavailable offline**: Action row disabled with "Connect to forward".
- **Loading**: Selected message skeleton and disabled action rows.

---

## Accessibility

- Selected message is announced as a grouped preview before actions.
- Privacy pill announces "Private message".
- Quick reactions are buttons with selected state.
- Action rows announce label and detail.
- View-once media warns before opening: "This media can only be viewed once."
- Focus order: back, status pills, selected message, reactions, actions, media, Done.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/message-actions/page.tsx`.
- Mock data source: `messageActionPreview` in `balencia-screens/src/data/mock.ts`.
- Reuses `ThreadMessage`, `PrivacyPill`, `SignalPill`, and domain tone classes.
- This screen documents a focused route mock; production may present the same content as a bottom sheet.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/message-actions`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B05-F12 | critical | retention | Implement reaction save, pin/star/forward flows, protected media opening, Done/back dismissal, and failure/retry states. |
| B05-F13 | major | trust-privacy | Add protected-open confirmation and state, make media cards semantic buttons/links, and clarify what SIA can summarize. |
| B05-F14 | major | accessibility | Use aria-pressed for reactions, make back a labeled button, disambiguate the reaction from the bottom Done CTA, and maintain focus order. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

