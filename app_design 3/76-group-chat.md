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

## Premium Craft

**Profile:** content · **Cluster benchmark:** iMessage + Telegram (group) — *stays Balencia via warm-glow message surfaces, safety-first copy, and SIA coaching specific to group members.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (95)

Pre-grade drivers: (1) message card surfaces listed with no depth/glow; (2) microcopy for composer, empty, typing, system-events partly generic or high-level only; (3) state craft matrix is text-only; (4) SIA design named but copy unwritten (risk of generic coaching-speak or shame-framing); (5) no ownable Balencia signature on chat (Living Line, warm glow, brand period); (6) focus rings and a11y labels unspecified.

### Focal hierarchy

One focal point: the **message thread** — the primary interactive zone. The **Group Header (title + icons)** is secondary anchor; the **Room Mission Card sits above as warm context, not competition**. The **Member Summary Rail is tertiary** (48pt status). The **Typing Indicator and Composer frame input readiness**. Squint test lands on message bubbles (varied heights, avatars, one SIA accent) → mission card → room identity. Nothing competes for focal weight.

### Surface & depth

Every message bubble and card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (mission card 28pt), `--radius-lg` (member rail 20pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge** (`CK-T01`) · `--shadow-1`. Mission card adds `CK-T02 --surface-backplate` (faint warm radial). SIA message bubbles add `--color-royal-purple` 12% opacity left-edge accent bar (2pt, purple earned). Fitness-red border on mission card (25% opacity) is domain identity, not error. No inline bubbles carry glow (per size-stepped CONSISTENCY.md §1); mission card ≥96px would use `--glow-orange-md` (~20px) on hover. No flat boxes.

### Typographic rhythm

- **Group Header title** ("Morning crew"): `--text-h1` (28pt) / 600 / `--leading-snug` / white 100%.
- **Room mission eyebrow**: `.eyebrow` (12pt / 600 / `--tracking-eyebrow` / uppercase / white 40%).
- **Mission title**: `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%.
- **Mission description & signal pills**: `--text-body` (16pt) / 400 / `--leading-normal` / white 90%.
- **Member label** ("5 members"): `--text-caption` (13pt) / 400 / white 50%.
- **Author name**: `--text-caption` (13pt) / 600 / white 60%.
- **Message text**: `--text-body` (16pt) / 400 / `--leading-normal` / white 100%.
- **SIA messages**: same body scale, purple tint (purple 80%).
- **Timestamp**: `--text-small` (11pt) / 400 / white 30%.
- **System message**: `--text-caption` (13pt) / 400 / white 50%, center-aligned.
- **Typing label**: `--text-caption` / 400 / white 50% + animated dots (draw, not fade).
- **Composer label**: `--text-body` / 400 / white 50%.

Hierarchy by weight (600 vs 400) and position. Sentence case on title and composer. ≤2 brand-orange accents. Chillax logo-only. Replace ad-hoc line-heights with `CK-T04`.

### Microcopy (before → after)

- **Add/info icons** — *before:* unlabeled → *after:* aria-label "Add member" / "Group info".
- **Signal pills** — *before:* "[120 group XP][4 joining]" → *after:* "120 group XP earned" + "4 members joining".
- **SIA message** — *before:* generic "Three members have..." → *after:* "Sofia, Marcus, and Kenji are on your pace. Recovery time together here matters — you'll sync stronger if you pace together." (Specific to this group, warm, tied to mission).
- **SIA attachment** — *before:* "[Group tempo mission]" → *after:* "Group pace · suggested 2:15/mile".
- **Composer hint text** — *before:* "Message Morning crew" (kept, already on-voice).
- **Empty state** — *before:* "No messages yet. Start the room." → *after:* "Ready to move together. Send the first message to sync your pace." (Forward-framed, non-shaming).
- **Loading** — *before:* unwritten → *after:* "Loading your crew..."
- **Failed send** — *before:* generic "Couldn't send" → *after:* "Message didn't send — tap to retry."
- **Member left** — *before:* unwritten → *after:* "[Name] left the room — the pace is still on." (Warm, frames continuity).
- **Permission rationale (health data)** — *before:* unwritten → *after:* "SIA sees your group's recovery so it can pace together — you control what's shared."
- **Offline** — *before:* unwritten → *after:* "You're offline — messages will send when you're back."

No exclamation marks. Brand period with intent on SIA coaching. All SIA copy specific to user's actual group, never generic.

### Motion choreography

Draw-first order per `CK-P4`:
1. Group Header fades in (`--dur-base` 280ms).
2. Room mission card rises (fade-up, `--dur-base` 280ms, 40ms after header).
3. Member rail rises (fade-up, `--dur-base` 280ms, 40ms after mission).
4. Message thread stagger-enters (fade-up, `--dur-base` each, 40–80ms stagger, oldest → newest → SIA last).
5. Typing indicator dots animate (three dots staggered scale/opacity at 400ms loop, draw-not-fade; SIA typing inherits faint purple tint).
6. Composer rises last (`--dur-base` 280ms after thread settles).

New messages animate on-arrival. `prefers-reduced-motion` → all at final state instantly; typing indicator settles with all dots visible; no fade. No opacity-fade on any motion.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / empty | Header + mission + rail + centered prompt | "Ready to move together. Send the first message to sync your pace." | mission card keeps full depth; white 50% prompt |
| Loading | skeleton: header, mission card shape, member rail avatars, 4 message bubbles (varied widths, depth visible) | "Loading your crew..." | skeleton on `ink-brown-800`, radial shimmer, morphs to data |
| Partial | shown messages render, "load earlier" affordance at top | "Loading earlier messages..." | existing keep depth; new messages animate in |
| Error | outgoing bubble with retry affordance + error state; inbox cached or banner | "Couldn't load messages — [Retry]"; send: "Message didn't send — [Retry]" | cached `ink-brown-800`; error: red border + ⚠ glyph + text (never colour-alone) |
| Offline | cached thread visible, actions dimmed, banner "You're offline..." | "You're offline — messages will send when you're back." | banner `ink-brown-800`; actions 0.5 opacity dimmed |
| Member removed | user read-only; system message: "[Name] removed you" | "[Name] removed you — you can still read the chat." | system row `--color-alpha-white-40` text; composer replaced with "You've left" notice |

### Signature & anti-generic

Ownable moments: (1) **SIA coaching specific to group members** ("Sofia, Marcus, and Kenji are on your pace" vs generic); (2) **warm message depth** (`--edge-highlight`, layered, no flat boxes); (3) **purple SIA accent bar** (SIA-earned, consistent with Home); (4) **brand period on coaching lines** ("Recovery time together here matters." — purposeful); (5) **mission fitness-red accent** framing the *why* without decoration.

Anti-generic: message bubbles are lifted with depth and varied by speaker (alignment, avatar, SIA purple), not undifferentiated stacks; empty state is inviting prompt, not degenerate blank; SIA presence is earned and restrained (purple limited); no dark patterns, safety framing is warm and clear.

### Accessibility

Tabulated load-bearing pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Notes |
|---|---|---|---|
| Group header title | `--color-alpha-white-100` | ≥12:1 | Primary text |
| Author name | `--color-alpha-white-60` | ≥4.5:1 | Paired with position (left/right) |
| Message text | `--color-alpha-white-100` | ≥12:1 | Load-bearing |
| SIA message text | `--color-royal-purple` 80% | 2.4:1 (below 3:1, build-responsibility) | Color + bar + "SIA" label + position; never colour-alone |
| Timestamp | `--color-alpha-white-30` | ≥4.5:1 | Tertiary |
| Signal pill text | `--color-alpha-white-100` | ≥12:1 | Load-bearing |
| Room mission title | `--color-alpha-white-100` | ≥12:1 | Hero |
| Fitness-red accent | `--color-domain-fitness` | 2.1:1 (domain identity, not signal) | Label + icon + position disambiguate |
| Add/info icons | `--color-alpha-white-60` | ≥4.5:1 | Paired with aria-label |
| Member online dot | `--color-forest-green` | 2.6:1 (paired with label "3 online", never colour-alone) | Position + aria-label disambiguate |

Status never colour-alone: green dot + visible label; SIA messages: purple bar + "SIA" label + position; member removal: visible system message + label. Every interactive element uses single **`--focus-ring`** (`CK-T03`, 2px orange, 2px offset). Targets ≥44×44pt. Reduced-motion: typing indicator all dots visible (no loop); messages appear final state (no stagger).

Conform to `design-audit/CONSISTENCY.md`.

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

