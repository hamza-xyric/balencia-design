# Screen Design: Group Chat

**Screen**: 76 of 90
**File**: 76-group-chat.md
**Route**: `/tabs/sia/group`
**Register**: AI Mode with group accountability
**Primary action**: Coordinate a group mission conversation with SIA-assisted pacing and context
**Tab**: SIA
**Navigation**: Stack push from Conversations Hub [74], Community [40], Accountability [46], Competitions [47], or group profile links.

---

## Purpose

Group Chat is the small-room conversation surface for friends, accountability pods, and mission crews. It supports real human coordination while letting SIA contribute structured coaching, such as pace groups, recovery context, and shared XP. The screen keeps the room mission visible so the conversation stays tied to action rather than becoming a generic chat room.

---

## Information Architecture

**Hierarchy**:
1. Header with group title, add member, and group info
2. Room mission card
3. Member summary rail
4. Date divider
5. Group message thread
6. Typing indicator
7. Composer

**User flow**:
- **Arrives from**: Conversations Hub [74], Community [40], Accountability [46], Competitions [47].
- **Primary exit**: Send message, tap mission card, or back to origin.
- **Secondary exits**: Add member, group info, member profile, message actions, mission detail.

---

## Layout

**Scroll behavior**: Vertical message thread with fixed header and fixed composer.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Morning crew     + i |
+-----------------------------+
| Room mission             *  |
| Tempo run together          |
| Two pace groups, one XP...  |
| [120 group XP][4 joining]   |
|                             |
| [members avatars] 5 members |
|                   3 online  |
|                             |
| -------- Today ------------ |
| [S] Tomorrow is tempo day...|
| [SIA] Three members have... |
|       [Group tempo mission] |
|                  I can lead |
| [O] That helps. I am sore...|
|                             |
| SIA is preparing pace... ...|
+-----------------------------+
| Message Morning crew   Send |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Group Header
- **Purpose**: Identify the group and expose group management.
- **Visual treatment**: 56pt ink-900 header, centered title "Morning crew".
- **Actions**:
  - Plus icon opens add-member flow.
  - Info icon opens group info sheet.

### Group Mission Card
- **Purpose**: Anchor the chat to the active shared mission.
- **Visual treatment**: rounded-xl, fitness-red border at 25%, linear fitness tint over ink-brown.
- **Content**:
  - Eyebrow "Room mission".
  - Mission title "Tempo run together".
  - Description with SIA-adjusted recovery context.
  - Signal pills: 120 group XP, 4 joining, SIA pacing.
- **Gesture**: Tap -> Mission Detail [14] or group mission detail.

### Member Summary
- **Purpose**: Show group size and active presence without taking over the thread.
- **Visual treatment**: rounded-lg, white/3 surface, member avatar overlap rail.
- **Content**: Members rail, "5 members", "3 online now".
- **Gesture**: Tap -> members list sheet.

### Group Thread Message
- **Purpose**: Display multiple human participants plus SIA.
- **Visual treatment**:
  - Member messages left aligned with avatar and author name.
  - User messages right aligned.
  - SIA messages highlighted with royal-purple/12 and SIA avatar.
  - Attachment cards can represent shared mission cards or plans.
- **Long press**: Opens Message Actions [77].

### Composer
- **Purpose**: Send a group message.
- **Behavior**: Supports text, attachments, mentions, and SIA prompt shortcuts.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Mission card | #211008 | ink-brown-800 | With fitness tint |
| Fitness accent | #EF4444 | fitness-red | Room mission only |
| Primary action | #FF5E00 | brand-orange | CTA/send/action emphasis |
| SIA assist | #7F24FF | royal-purple | SIA messages/pacing |
| Presence active | #34A853 | forest-green | Online dots |
| Text primary | #FFFFFF | white | Titles/messages |
| Text secondary | #FFFFFF at 45-60% | white/60 | Metadata |

**60/30/10 verification**: Fitness red identifies the mission domain, orange remains action/reward, purple is SIA-only, green is presence/readiness.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Mission card | Pressed | scale(0.98), border fitness-red/40 |
| Add member | Pressed | white/75 icon, light haptic |
| Message | Long pressed | Lifted bubble with action preview |
| Mention | Tapped | Opens member profile preview |
| Composer | Focused | Keyboard opens; content scrolls to latest message |
| SIA plan card | Tapped | Opens plan detail sheet |

---

## Motion

- Mission card enters first, member summary follows at 80ms, messages stagger every 70ms.
- Member rail additions use avatar scale-in over 180ms.
- SIA typing indicator loops dot animation until response is ready.
- Add-member and group-info sheets use standard bottom sheet motion.

---

## Empty, Loading, Error

- **Empty group**: Show mission card and member summary, then "No messages yet. Start the room."
- **Loading**: Skeleton mission card, member rail, and four bubbles.
- **Failed send**: Outgoing bubble shows retry affordance.
- **Member removed**: System row appears: "[Name] left the room"; composer remains available if user is still a member.
- **Offline**: Cached thread is readable; sends queue locally.

---

## Accessibility

- Group header actions labeled "Add member" and "Group info".
- Member rail announces number of members and online count.
- Message bubbles include author and timestamp.
- SIA plan attachments announce title, type, and destination.
- Room mission card announces title, domain, group XP, and join count.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/group/page.tsx`.
- Mock data source: `groupConversationMessages` in `balencia-screens/src/data/mock.ts`.
- Reuses `MembersRail`, `ThreadMessage`, `TypingIndicator`, and `SignalPill`.
- This is a docs-only spec; no runtime group membership model changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/group`
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
| B05-F09 | critical | retention | Build a real group composer with mentions, attachments, queued sends, retry/offline states, and 44px action target. |
| B05-F10 | major | navigation | Wire add-member, group-info, members list, mission detail, back navigation, and message-action entry. |
| B05-F11 | major | trust-privacy | Require explicit health-signal sharing consent, default to aggregate/anonymized guidance, and show who can see SIA group insights. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

