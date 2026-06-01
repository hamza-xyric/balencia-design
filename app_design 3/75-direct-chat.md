# Screen Design: Direct Chat

**Screen**: 75 of 90
**File**: 75-direct-chat.md
**Route**: `/tabs/sia/direct`
**Register**: AI Mode with social accountability support
**Primary action**: Message one trusted contact with optional SIA assistance
**Tab**: SIA
**Navigation**: Stack push from Conversations Hub [74], Social Buddy Profile [83], Accountability [46], Community [40], or user profile bottom sheets. Back returns to the origin screen.

---

## Purpose

Direct Chat is the private one-to-one social layer inside Balencia. It lets the user coordinate with a trusted buddy while SIA quietly supports pacing, summaries, and mission updates. The design protects the human relationship first: SIA is assistive and contextual, not a third participant unless explicitly invoked.

---

## Information Architecture

**Hierarchy**:
1. Chat header with contact name, call, and info actions
2. Shared mission profile rail
3. SIA assist strip
4. Date divider
5. Message thread with human, user, and SIA-assisted messages
6. Typing indicator
7. Composer

**User flow**:
- **Arrives from**: Conversations Hub [74], Social Buddy Profile [83], Accountability [46], or message shortcut from user profile bottom sheet.
- **Primary exit**: Back to origin or continue messaging in composer.
- **Secondary exits**: Start call, open contact info, tap attachment, long-press message -> Message Actions [77].

---

## Layout

**Scroll behavior**: Vertical message thread. Header fixed. Composer fixed above tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Aisha Khan      C i |
+-----------------------------+
| [AK] Aisha is training...   |
|      Shared mission: Run... |
|                             |
| [S] SIA assist              |
|     Suggest pacing, summarize|
|     decisions, convert to... |
| [Pace][Shared][Private]     |
|                             |
| -------- Today ------------ |
|                             |
| [AK] I am thinking of...    |
| [S]  Your recovery supports |
|      the river route...     |
|      [Suggested pacing]     |
|                  That works |
| [AK] Perfect. I added the   |
|      hill segment photo...  |
|      [Hill segment] [Useful]|
|                             |
| Aisha is looking... ...     |
+-----------------------------+
| Message Aisha           Send|
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Direct Header
- **Purpose**: Conversation identity and direct actions.
- **Visual treatment**: 56pt ink-900 header, back chevron, centered contact name.
- **Actions**:
  - Phone icon opens call setup.
  - Info icon opens conversation info/profile panel.

### Profile Rail
- **Purpose**: Reconfirm relationship context before the user reads the thread.
- **Visual treatment**: rounded-lg, white/3 background, white/6 border.
- **Content**: Contact avatar, "Aisha is training with you", shared mission text.
- **Gesture**: Tap -> Social Buddy Profile [83].

### SIA Assist Strip
- **Purpose**: Explain what SIA can do in the thread without taking over.
- **Visual treatment**: ink-brown card, royal-purple/20 border, SIA sparkles avatar.
- **Content**: Eyebrow "SIA assist", 1-2 line description, signal pills for Pace context, Shared mission, Private chat.
- **Behavior**: Tap opens SIA-assist options sheet: summarize, suggest reply, save to mission, ask SIA privately.

### Thread Message
- **Purpose**: Render direct, user, and SIA-assist messages.
- **Visual treatment**:
  - Contact messages: left aligned, ink-brown bubble.
  - SIA messages: left aligned, royal-purple/12 highlighted bubble with SIA avatar.
  - User messages: right aligned, brand-orange/15 bubble.
- **Attachments**: Inline cards for image, voice, mission, or plan attachments.
- **Reactions**: Compact pill strip under the message bubble.
- **Long press**: Opens Message Actions [77].

### Composer
- **Purpose**: Send a direct message.
- **Visual treatment**: Fixed composer above tab bar, placeholder "Message Aisha", send action.
- **Behavior**: Supports text, attachment, voice, and SIA-suggested reply insertion.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Human bubbles | #211008 | ink-brown-800 | Incoming |
| User bubble | #FF5E00 at 15% | brand-orange/15 | Outgoing |
| SIA bubble | #7F24FF at 12% | royal-purple/12 | Assistive |
| SIA border | #7F24FF at 20-25% | royal-purple | SIA assist only |
| Shared mission domain | #EF4444 | fitness-red | Tag/avatar tint |
| Read status | #34A853 | forest-green | Double-check read |
| Text primary | #FFFFFF | white | Message text |
| Text metadata | #FFFFFF at 30-45% | white/45 | Time/status |

**60/30/10 verification**: Orange is limited to user message emphasis and actions. Purple indicates SIA assist. Green is read/online status only.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Message bubble | Long pressed | Bubble lifts with shadow-2; background brightens |
| Attachment | Pressed | scale(0.98), border white/12 |
| SIA assist strip | Active | Royal-purple border brightens |
| Composer | Focused | Keyboard opens, input border white/12 |
| Send | Disabled | white/25 until text or attachment exists |
| Send | Active | brand-orange icon/text |

---

## Motion

- Messages appear with 70ms stagger on screen entry.
- New outgoing message slides up 8pt and fades in over 180ms.
- Typing indicator dots loop with 180ms offsets.
- Attachment preview expands with 220ms ease-out-soft.

---

## Empty, Loading, Error

- **New direct chat**: Show profile rail, SIA assist strip, and empty prompt "Start the first message".
- **Loading**: Skeleton profile rail, assist strip, and four bubble placeholders.
- **Failed send**: Message remains in place with orange warning text "Tap to retry".
- **Attachment blocked**: Show toast "This media is no longer available".
- **Offline**: Composer remains editable; sends queue with "Waiting for connection" status.

---

## Accessibility

- Header call button label: "Start call with Aisha Khan".
- Info button label: "Conversation info".
- Message bubbles announce author, time, message text, and attachment summary.
- Reactions announce label and count.
- Composer supports standard keyboard return/send behavior and dictation.
- SIA messages include "SIA assist" in accessibility label.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/direct/page.tsx`.
- Mock data source: `directConversationMessages` in `balencia-screens/src/data/mock.ts`.
- Long-press actions route to Message Actions [77].
- This spec does not introduce a new social graph model; it documents the current private chat mock route.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/direct`
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
| B05-F06 | critical | retention | Build a real direct-message composer with enabled/disabled send, optimistic send, retry/offline states, and 44px action target. |
| B05-F07 | major | navigation | Wire back navigation, call setup, contact info, SIA-assist options, and message-action entry. |
| B05-F08 | major | trust-privacy | Define and expose per-thread SIA visibility and explicit opt-in controls for summarize/suggest/save actions. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

