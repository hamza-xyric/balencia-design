# Screen Design: Conversations Hub

**Screen**: 74 of 90
**File**: 74-conversations-hub.md
**Route**: `/tabs/sia/conversations`
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: Start, search, and resume SIA, direct, group, and room conversations
**Tab**: SIA
**Navigation**: Stack push from SIA Chat [09], Community [40], Accountability [46], or social shortcuts. Bottom tab bar remains visible with SIA active.

---

## Purpose

The Conversations Hub is the SIA tab's unified inbox for coaching, direct messages, group chats, and community rooms. It turns conversation history into an organized command center: SIA stays pinned as the primary coach, while people, groups, and rooms are searchable and filterable underneath. The screen supports social accountability without letting it replace SIA as the central coaching relationship.

---

## Information Architecture

**Hierarchy**:
1. Pinned SIA coach hero with live signals and call readiness
2. Search bar for people, rooms, and SIA memory
3. Filter rail for All, SIA, People, Groups, Rooms
4. Pinned conversations list
5. Recent conversations list
6. Persistent "Start new chat" bottom action

**User flow**:
- **Arrives from**: SIA Chat [09] conversation list affordance, Community [40] message CTA, Accountability [46] partner message CTA, Social Buddy Profile [83].
- **Primary exit**: Tap SIA hero -> SIA Chat [09]. Tap direct row -> Direct Chat [75]. Tap group row -> Group Chat [76]. Tap room row -> Community [40].
- **Secondary exits**: Search icon opens search mode; voice icon opens Voice Mode [11]; bottom action starts a new conversation picker.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, scrollable content, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
|          Conversations   S V |
+-----------------------------+
|                             |
| [S] Pinned coach            |
|     SIA coach           *   |
|     Recovery, budget, and   |
|     breakfast timing...     |
| [3 live signals][1 draft]   |
|                             |
| [ Search people, rooms... ] |
|                             |
| [All] [SIA] [People] ...    |
|                             |
| PINNED                      |
| [MC] Morning crew       18m |
|      Sarah pinned...    5   |
|      Group  Fitness         |
|                             |
| RECENT                      |
| [AK] Aisha Khan        7min |
|      Shared her pace... 2   |
|      Direct Fitness         |
| [FF] Finance focus       1h |
|      Budget sprint...   >   |
|                             |
+-----------------------------+
|       + Start new chat      |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

### Component Stack

1. **Header** - 56pt, centered title, search icon, voice icon.
2. **SIA Hero** - large rounded card with SIA avatar, live-signal pills, and coach summary.
3. **Search Bar** - standard search input, placeholder "Search people, rooms, and SIA memory".
4. **Filter Rail** - horizontal chips: All, SIA, People, Groups, Rooms.
5. **Conversation Sections** - "Pinned" and "Recent" groups using reusable conversation rows.
6. **Bottom Action** - orange full-width "Start new chat" button.

---

## Components

### Header
- **Purpose**: Screen identity and quick access to search/voice.
- **Visual treatment**: ink-900 background, 56pt height. Title 17pt Sora Semibold, white.
- **Actions**:
  - Search icon: opens in-screen search focus.
  - AudioLines icon: opens voice coaching entry.
- **Touch targets**: 44x44pt minimum.

### SIA Hero
- **Purpose**: Keep SIA as the pinned, primary coaching thread.
- **Visual treatment**: 16pt horizontal margins, rounded-xl card, royal-purple border at 25%, purple radial accent, ink-brown surface.
- **Content**:
  - Large SIA avatar with active presence dot.
  - Eyebrow: "Pinned coach" in royal-purple.
  - Title: "SIA coach".
  - Summary: current cross-domain signal.
  - Signal pills: "3 live signals", "1 draft plan", "Ready to call".
- **Gestures**: Tap -> SIA Chat [09].

### Search Bar
- **Purpose**: Find conversations, rooms, people, and SIA memory references.
- **Behavior**: Focus expands to search mode; query filters all visible conversation rows. Empty query restores section grouping.

### Filter Rail
- **Purpose**: Narrow the inbox by conversation type.
- **Visual treatment**: Horizontal scroll, 8pt chip gaps, active chip orange, inactive chips ink-brown.
- **Behavior**: Single-select. Default is All.

### Conversation Row
- **Purpose**: Resume a thread quickly.
- **Visual treatment**: 74pt minimum row, rounded-lg, ink-brown-800, subtle border.
- **Content**:
  - Avatar with initials, domain tint, and presence dot.
  - Conversation name, optional pin icon, optional SIA-assist sparkles.
  - One-line subtitle.
  - Kind pill: Coach, Direct, Group, or Room.
  - Domain tag.
  - Timestamp and unread badge or arrow.
- **Gestures**: Tap routes to the row's destination. Long press opens lightweight row actions: pin/unpin, mute, archive.

### Start New Chat Button
- **Purpose**: Create a new direct, group, room, or SIA thread.
- **Visual treatment**: 56pt orange pill, plus icon, white label, glow-orange shadow.
- **Behavior**: Presents new conversation bottom sheet.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card/row surfaces | #211008 | ink-brown-800 | Hero and rows |
| Primary CTA | #FF5E00 | brand-orange | Start new chat |
| SIA indicators | #7F24FF | royal-purple | SIA hero, sparkles, voice icon |
| Presence active | #34A853 | forest-green | Online dots |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 55-60% | white/60 | Metadata |
| Domain tags | Per domain | domain registry | Identification only |

**60/30/10 verification**: Orange is reserved for action and unread count. Purple is SIA-only. Green is presence/readiness. Domain colors appear only on tags and avatar tints.

---

## Interaction States

| Component | State | Visual |
|-----------|-------|--------|
| SIA hero | Pressed | scale(0.98), border brightens to royal-purple/40 |
| Conversation row | Hover/focus | border brand-orange/30, bg white/4 |
| Conversation row | Unread | Orange unread badge replaces arrow |
| Filter chip | Active | Orange bg, white text |
| Bottom CTA | Pressed | scale(0.96), glow tightens |
| Search | Focused | Orange focus ring, keyboard opens |

---

## Motion

- Screen content enters with staggered fade-up: hero 0ms, pinned 80ms, recent 150ms.
- Row press uses 120ms scale feedback before navigation.
- Filter changes crossfade row groups over 180ms.
- New conversation sheet follows standard modal presentation from `_shared-patterns.md`.

---

## Empty, Loading, Error

- **No conversations**: Show SIA hero, then centered empty state: "No conversations yet" with "Start new chat" CTA.
- **Filtered empty**: Preserve filter rail and show "No [filter] conversations".
- **Loading**: Skeleton hero plus three row skeletons.
- **Network error**: Inline banner below search: "Could not refresh conversations" with retry action.
- **Offline**: Cached conversations remain visible with timestamp muted; new message entry is blocked with offline toast.

---

## Accessibility

- Header buttons use labels: "Search conversations" and "Start voice coaching".
- Conversation rows announce name, type, unread count, domain, and timestamp.
- Filter rail is a single-select tab group.
- Unread badge text is included in row accessibility label, not exposed as a separate unlabeled element.
- Minimum touch targets: 44pt for icons, 74pt for rows, 56pt for CTA.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/conversations/page.tsx`.
- Mock data source: `conversationPreviews` and `conversationFilters` in `balencia-screens/src/data/mock.ts`.
- Reuses `ConversationAvatar`, `ConversationRow`, and `SignalPill` from the conversation suite.
- This is a docs-only screen spec; no runtime route or API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-05.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/conversations`
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
| B05-F04 | major | information-architecture | Implement real search, filter state, voice entry, and a new-conversation picker sheet. |
| B05-F05 | major | accessibility | Render a real search input and make filters a semantic 44px tab/single-select control. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

