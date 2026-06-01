# Screen Design: Community / Chat Rooms

**Screen**: 40 of 73
**File**: 40-community-chat-rooms.md
**Register**: Product Mode
**Primary action**: join or enter a room
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3+ from Me tab root (Me Main → Explore → Community). Entry from Explore [18] grid card, SIA deep-link [09] ("your accountability group is active"), or Leaderboard [39] "find communities" link. Exit via back button to Explore. Room interior is a sub-screen pushed further onto the stack.

---

## Purpose

This screen is the social hub — group-based chat rooms for accountability, shared progress, and community. It answers "who else is on this journey with me?" The philosophy is "individual first, social as enhancement": the solo coaching experience is complete on its own, and community is an optional motivational layer. Rooms can be friend groups ("three friends make a room"), interest-based communities, or accountability pods. There is no follow/friend request system for V1 — social connections form through room membership. Competitions and matching are deprioritized for V1 but structurally present for V2.

This screen has two views: **Room List** (the primary entry view) and **Room Interior** (a pushed sub-screen when a room is tapped).

---

## Information Architecture

**Hierarchy — Room List** (what the user sees, in order of visual priority):
1. Screen header — "Community" title with back navigation
2. Discover communities section — curated/popular rooms for exploration
3. Your rooms list — rooms the user has joined, sorted by recency
4. Create room FAB — always visible

**Hierarchy — Room Interior** (pushed sub-screen):
1. Room header — room name, member count, back navigation
2. Chat messages — group conversation
3. Shared achievements — milestone celebrations from members
4. Message input — text input + send

**User flow**:
- **Arrives from**: Explore [18] via "Community" card (stack push), SIA Chat [09] via deep-link, Leaderboard [39] via "find communities" link
- **Primary exit (Room List)**: Back to Explore [18] (stack pop)
- **Primary exit (Room Interior)**: Back to Room List (stack pop)
- **Secondary exits**: Member profile (bottom sheet), Room settings (bottom sheet), Create Room (modal)

---

## Layout — Room List View

**Scroll behavior**: ScrollView (room list is typically short, <20 items)
**Tab bar visible**: Yes

### ASCII Wireframe — Room List

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]      "Community"         │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  DISCOVER                           │  ← Eyebrow
│  ┌────────┐ ┌────────┐ ┌────────┐→│  ← Horizontal scroll
│  │ 🏋️    │ │ 📖    │ │ 🎯    │ │     Discover cards
│  │Fitness │ │Book    │ │Mindful-│ │
│  │lovers  │ │club    │ │ness   │ │
│  │ 234 ♦  │ │ 89 ♦   │ │ 156 ♦  │ │
│  └────────┘ └────────┘ └────────┘ │
│                                     │  ← 24pt gap
│  YOUR ROOMS                         │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ [🟢] Morning crew           │   │  ← Room Row 1
│  │  5 members · "See you at..."│   │     avatar + name +
│  │                    10:32 am │   │     members + preview
│  │                         (3) │   │     + time + unread
│  ├─────────────────────────────┤   │
│  │ [🔵] Study group            │   │  ← Room Row 2
│  │  3 members · "Finished ch..."│   │
│  │                    yesterday│   │
│  ├─────────────────────────────┤   │
│  │ [🟡] Accountability pod     │   │  ← Room Row 3
│  │  4 members · "Hit my goal..."│   │
│  │                     May 18  │   │
│  └─────────────────────────────┘   │
│                                     │
│                    ┌───────────────┐│
│                    │ + create room ││ ← FAB (orange pill)
│                    └───────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Room List (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Community" title

2. **Discover Section** — ~140pt
   - Purpose: Surface popular/curated rooms for users to join
   - Content: Horizontal scroll of discover cards

3. **Your Rooms List** — Variable
   - Purpose: Rooms the user has joined, sorted by most recent activity
   - Content: Room rows with avatar, name, member count, last message, time, unread badge

4. **Floating Action Button** — 48pt (fixed)
   - Purpose: Create a new room
   - Content: Plus icon + "create room"

---

## Layout — Room Interior View (Pushed Sub-screen)

**Scroll behavior**: FlatList (inverted, messages load oldest-first, scroll starts at bottom)
**Tab bar visible**: Yes (remains visible since this is within the Me tab stack)

### ASCII Wireframe — Room Interior

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back] "Morning crew" [5] [⚙] │  ← Room Header (44pt)
├─────────────────────────────────────┤
│                                     │
│       ── May 20, 2026 ──           │  ← Date separator
│                                     │
│  [av] Sarah                         │  ← Message from other
│  Great workout this morning.        │     (left-aligned)
│  Feeling strong.                    │
│                          9:15 am    │
│                                     │
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐    │
│  │ 🎉 Sarah hit her fitness   │    │  ← Shared Achievement
│  │    goal. +150 XP           │    │     Card (green accent)
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘    │
│                                     │
│  [av] Ahmed                         │
│  Nice one Sarah. I'm about to       │
│  start my study session.             │
│                          9:22 am    │
│                                     │
│            I already did my reading  │  ← Own message
│            45 minutes this morning.  │     (right-aligned,
│  9:45 am                            │      subtle orange bg)
│                                     │
│  [av] Omar                          │
│  Accountability check: everyone      │
│  logged their habits today?          │
│                          10:30 am   │
│                                     │
├─────────────────────────────────────┤
│  [message input...        ] [send] │  ← Message Input (52pt)
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

---

## Components — Room List View

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Community" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Discover Section
- **Purpose**: Curated/popular rooms for new users and room discovery
- **Data source**: API — curated list of featured/popular rooms
- **Visual treatment**: Horizontal ScrollView with cards
- **Content**:
  - Eyebrow: "DISCOVER" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin
  - Horizontal ScrollView: 16pt content insets, 12pt gap between cards
  - Each Discover Card (120pt wide x 100pt tall):
    - Background: ink-brown-800 glassmorphism, 16pt radius (--r-lg), 16pt padding
    - Top: Room emoji/icon (24pt, centered)
    - Name: 14pt Sora Semibold, white, center-aligned, 2 lines max, 8pt below icon
    - Member count: 12pt Sora Regular, white at 40%, center-aligned, 4pt below name. "234 members" or "234 ♦" with diamond glyph.
    - Tap: Opens room preview sheet (room description, member count, "join" CTA)
- **Variants**: Populated (4-10 curated rooms), Empty (hidden if no curated rooms available)
- **Gestures**: Horizontal scroll, tap card for preview
- **Size**: Full-width x ~140pt (eyebrow + cards + padding)

### Room Row
- **Purpose**: Individual room in the user's joined rooms list
- **Data source**: API — user's rooms sorted by most recent message
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius on outer card. Separated by 1pt white at 5%.
- **Content per row** (80pt tall):
  - Room avatar (left): 44pt circle. Could be room emoji on colored background, or custom image if set. Default: first letter of room name on ink-900 circle with white text.
  - Room name (12pt right of avatar): 16pt Sora Semibold, white. Single line.
  - Member count (below name): "5 members" — 12pt Sora Regular, white at 40%, 2pt below name
  - Last message preview (below member count): 14pt Sora Regular, white at 50%, single line truncated, 4pt below member count. Format: "Sender: message..." or just "message..." if own message.
  - Timestamp (right-aligned, top): 12pt Sora Regular, white at 30%. Relative: "10:32 am" (today), "yesterday", "May 18"
  - Unread badge (right-aligned, below timestamp): If unread messages exist — 20pt circle (minimum), orange (#FF5E00) fill, unread count in white (11pt Sora Semibold). If count >99: "99+". If no unread: badge hidden.
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Unread (badge visible, name bolder), Read (standard), Active now (green dot on avatar indicating active members)
- **Gestures**: Tap navigates to Room Interior (stack push)
- **Size**: Full-width minus 32pt x 80pt per row

### Floating Action Button
- **Purpose**: Create a new room
- **Visual treatment**: Identical FAB pattern from Screen 35. Label: "create room".
- **Gestures**: Tap opens Create Room modal
- **Size**: Auto-width (~150pt) x 48pt

### Create Room Modal (Bottom Sheet)
- **Purpose**: Set up a new chat room
- **Visual treatment**: Bottom sheet, ~65% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "create")
  - Room name input: Text Input Field (52pt), placeholder: "room name"
  - Room description input: Multi-line text area (104pt, 2 lines), placeholder: "what's this room about?" — 16pt Sora Regular
  - Room type selector: Two pill buttons — "private" (invite only) / "public" (discoverable). Default: private.
  - Room emoji picker: Horizontal scroll of common emojis (🏋️ 📖 🧘 🎯 💪 ☕ 🎨 🎵), tap to select as room avatar
  - "create room" button: Full-width orange CTA (Brand CTA Button, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap create to save

### Room Preview Sheet (from Discover)
- **Purpose**: Preview a room before joining
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners
- **Content**:
  - Room emoji (48pt, centered)
  - Room name: 20pt Sora Semibold, white, centered
  - Description: 14pt Sora Regular, white at 60%, centered, max 3 lines
  - Member count: "234 members" — 14pt Regular, white at 40%
  - Member preview: 5 overlapping avatar circles (32pt each, 8pt overlap)
  - "join room" button: Full-width orange CTA
  - "maybe later" link: 14pt, white at 50%, center-aligned
- **Gestures**: Tap "join room" to join + navigate to interior, "maybe later" to dismiss

---

## Components — Room Interior View

### Room Header
- **Purpose**: Room identification, member count, settings access
- **Data source**: Room data
- **Visual treatment**: ink-900 background, 44pt, backdrop-blur if content scrolls behind
- **Content**:
  - Left: Back chevron (44x44pt touch target)
  - Center: Room name (16pt Sora Semibold, white, truncated)
  - Right area: Member count badge ("[5]" — 13pt Sora Regular, white at 50%, inside 28pt circle, white 10% bg) + Settings gear icon (20pt, white at 60%, 44x44pt touch target)
- **Gestures**: Tap member count to open member list sheet, tap gear for room settings sheet
- **Size**: Full-width x 44pt

### Chat Message Bubble — Others
- **Purpose**: Display messages from other room members
- **Data source**: Real-time (Socket.IO) + API for history
- **Visual treatment**: Left-aligned message group
- **Content**:
  - Sender avatar: 28pt circle, left-aligned, shown only on first message in a consecutive group from the same sender
  - Sender name: 12pt Sora Semibold, white at 60%, 8pt right of avatar, above message bubble. Shown only on first message in group.
  - Message bubble: ink-brown-800 bg, 16pt radius (--r-lg). Top-left corner is 4pt radius (pointer toward avatar). Padding: 12pt.
  - Message text: 15pt Sora Regular, white at 90%
  - Timestamp: 11pt Sora Regular, white at 30%, right-aligned below bubble, 4pt below
  - Max bubble width: 75% of screen width
- **Size**: Auto-width (max 75% screen) x auto-height

### Chat Message Bubble — Own
- **Purpose**: Display user's own messages
- **Visual treatment**: Right-aligned
- **Content**:
  - No avatar or name shown (it's the user's own message)
  - Message bubble: ink-brown-800 bg with subtle orange tint — background is #211008 mixed with #FF5E00 at 5% opacity, creating a barely-warm shift. 16pt radius. Top-right corner is 4pt radius (pointer toward right edge). Padding: 12pt.
  - Message text: 15pt Sora Regular, white
  - Timestamp: 11pt Sora Regular, white at 30%, left-aligned below bubble, 4pt below
  - Max bubble width: 75% of screen width
- **Size**: Auto-width (max 75% screen) x auto-height

### Shared Achievement Card
- **Purpose**: Celebrate a member's milestone within the chat
- **Data source**: Triggered by RPG system events (goal completion, level up, streak milestone)
- **Visual treatment**: Centered in the chat flow. Full-width minus 32pt. ink-brown-800 card with green (#34A853) left border accent (3pt). 16pt radius. 16pt padding.
- **Content**:
  - Celebration emoji: 🎉 (20pt, left)
  - Achievement text: "[Name] hit their [goal/milestone]. +[XP] XP" — 14pt Sora Regular, white at 80%
  - Green accent: 3pt left border (#34A853). XP in green.
- **Variants**: Goal completion, Level up, Streak milestone (21 days, 50 days, 100 days)
- **Gestures**: Tap to congratulate (future V2 — reactions). Currently informational only.
- **Size**: Full-width minus 32pt x ~56pt

### Date Separator
- **Purpose**: Separate messages by day
- **Visual treatment**: Centered text with horizontal rules on each side
- **Content**: Date text ("May 20, 2026" or "today" / "yesterday") — 12pt Sora Regular, white at 30%, centered. Rules: 1pt white at 5%, extending to 16pt margins on each side. 12pt horizontal padding around text.
- **Size**: Full-width x 32pt

### Message Input Bar
- **Purpose**: Compose and send messages
- **Data source**: Local state
- **Visual treatment**: Fixed at bottom, above tab bar. ink-900 bg with 1pt white at 8% top border.
- **Content**:
  - Input field: Full-width minus 64pt (16pt left margin, send button right), 40pt tall, ink-brown-800 bg, 20pt radius (--r-lg), 12pt horizontal padding. Placeholder: "message..." in 15pt Sora Regular, white at 30%.
  - Send button: 40pt circle, right-aligned, 8pt right of input field. Inactive: white at 15% bg, white at 30% arrow icon. Active (text entered): orange (#FF5E00) bg, white arrow icon (16pt).
  - Auto-grows to max 4 lines (40pt → ~100pt), then scrolls internally.
- **Gestures**: Tap input to focus (keyboard slides up), tap send to send message
- **Size**: Full-width x 52pt (padding included)

### Member List Sheet (Bottom Sheet)
- **Purpose**: View all room members
- **Data source**: API — room member list
- **Visual treatment**: Bottom sheet, ~60% screen height, ink-900 bg, 20pt top corners
- **Content**:
  - Title: "members (5)" — 17pt Sora Semibold, white, left-aligned, 16pt padding
  - Member rows (56pt each): Avatar (36pt) + name (15pt Sora Semibold, white) + Level badge ("Lv. 14") right-aligned + online indicator (8pt green dot on avatar if active)
  - Room creator: "creator" label in 11pt, white at 40%, below name
- **Gestures**: Tap member for limited profile view, drag to dismiss

### Room Settings Sheet (Bottom Sheet)
- **Purpose**: Room management
- **Visual treatment**: Bottom sheet, ~40% screen height, ink-900 bg
- **Content**: Options list — "room info" / "notifications" (toggle) / "invite people" / "leave room" (red text, #f44336)
- **Gestures**: Tap option to act, drag to dismiss

### User Profile Report/Block (from avatar/name tap or member list)
- **Purpose**: Allow users to report or block another user encountered in chat rooms
- **Trigger**: Tap on a message sender's avatar or name in the Room Interior view, or tap a member in the Member List Sheet. Opens the Limited User Profile bottom sheet (same pattern as Screen [39]) with an overflow menu (three-dot icon, 20pt, white at 60%, top-right, 44x44pt touch target).
- **Overflow menu content**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Right-aligned below the overflow icon.
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336.
- **Behavior**:
  - Tap "Report": Dismisses context menu and profile sheet, navigates to Report/Block flow [64] with user pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the profile sheet.
- **Block Confirmation** (inline, replaces bottom half of profile sheet content):
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards. their messages will be hidden in all rooms." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg.
  - Tap "Block": Calls POST /api/users/:id/block, dismisses sheet. Blocked user's messages are hidden across all rooms (replaced with collapsed "blocked message" placeholder, 32pt, white at 10% bg, 13pt Sora Regular white at 20%). User removed from member lists. Toast: "user blocked" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard profile sheet content (crossfade, 280ms).

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base (both views) |
| Card surfaces / bubbles | #211008 | ink-brown-800 | Glassmorphism |
| Own message bubble | #211008 + #FF5E00 at 5% | — | Barely-warm orange tint |
| Unread badge | #FF5E00 | orange (primary) | Attention indicator |
| FAB background | #FF5E00 | orange (primary) | CTA |
| Send button (active) | #FF5E00 | orange (primary) | Message send action |
| "join room" CTA | #FF5E00 | orange (primary) | Join action |
| "create room" CTA | #FF5E00 | orange (primary) | Create action |
| Achievement card border | #34A853 | green (secondary) | Celebration accent |
| Achievement XP text | #34A853 | green (secondary) | Reward |
| Online indicator | #34A853 | green (secondary) | Active status |
| "leave room" text | #f44336 | error | Destructive action |
| Primary text | #FFFFFF | white | Room names, message text |
| Secondary text | white at 60% | — | Sender names |
| Tertiary text | white at 50% | — | Message previews, descriptions |
| Quaternary text | white at 30% | — | Timestamps, date separators |
| Member count text | white at 40% | — | Room metadata |

**60/30/10 verification**: Orange on FAB, unread badges, send button, join/create CTAs, own message tint. Green on achievement cards, online indicators, XP rewards. No purple on this screen (community is peer-driven, not SIA-driven). Ratio holds with orange as primary action driver.

---

## Interaction States

### Discover Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard layout | — |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Room Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Message Bubble (Others)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bubble | — |
| Long-pressed | Bubble lifts slightly, context menu appears (copy, reply — V2) | medium impact |

### Message Bubble (Own)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Warm-tinted bubble | — |
| Long-pressed | Bubble lifts, context menu (copy, delete) | medium impact |

### Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | White 15% bg, white 30% arrow | — |
| Default (active — text present) | Orange bg, white arrow | — |
| Pressed | Darker orange, scale(0.90) | medium impact |
| Sending | Spinner replaces arrow | — |
| Success | Brief checkmark flash (160ms) then returns to inactive | success notification |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, --shadow-2 | — |
| Pressed | Darker orange, scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |

### "join room" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white text, --r-pill | — |
| Pressed | Darker orange, scale(0.97) | light impact |
| Loading | Spinner replaces text | — |
| Success | Green bg flash (600ms), text: "joined" | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map — Room List
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload rooms) |
| Horizontal swipe | Discover section | Scroll through discover cards |
| Tap | Discover card | Open room preview sheet |
| Tap | Room row | Navigate to Room Interior (stack push) |
| Tap | FAB | Open Create Room modal |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Swipe left | Room row | Reveal "mute" / "leave" actions |

### Gesture Map — Room Interior
| Gesture | Target | Action |
|---------|--------|--------|
| Scroll up | FlatList | Load older messages (pagination) |
| Tap | Message input | Focus input, keyboard slides up |
| Tap | Send button | Send message |
| Long-press | Message bubble | Context menu (copy, reply V2, delete own, report — see Report/Block [64]) |
| Tap | Sender avatar/name | Open user profile sheet (with report/block overflow menu) |
| Tap | Member count badge | Open member list sheet |
| Tap | Settings gear | Open room settings sheet |
| Tap | Back button | Pop to Room List |
| Swipe right from edge | Screen | iOS back gesture |
| Pull down | Top of messages | Load older message history |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Room List content | Mount | Staggered fade-in: discover (0ms), first 3 room rows (80ms stagger) | 280ms each | ease-out-soft |
| Discover cards | Enter viewport | Staggered slide-in from right, 60ms stagger | 280ms each | ease-out-soft |
| Room Interior | Push from Room List | Standard iOS stack push (slide from right) | 280ms | ease-out-soft |
| New message (received) | Real-time event | Message bubble fades in + slides up from bottom (translateY 16→0, opacity 0→1) | 280ms | ease-out-soft |
| New message (sent) | Send tap | Own bubble slides in from right (translateX 24→0, opacity 0→1) | 280ms | ease-out-soft |
| Send button activate | Text entered | Orange bg fades in (opacity 0→1) | 160ms | ease-out-soft |
| Achievement card | Achievement event | Card scales in (0.8→1) + green glow pulse (0→100%→0 opacity) | 520ms | ease-flow |
| Unread badge | New message while on Room List | Badge scales in (0→1) with bounce (scale 0→1.2→1) | 280ms | ease-out-soft |
| Typing indicator | Other user typing | Three dots pulse (opacity 30%→100%, staggered 120ms apart, looping) | 600ms loop | ease-in-out |
| Create/Preview sheet | Open | Bottom sheet slides up | 520ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (Room List)**: Standard stack push from Explore
- **Enter (Room Interior)**: Stack push from Room List
- **Exit**: Stack pop

---

## Empty States

### Day 1 — Room List (no rooms)
- Discover section: Extra prominent — takes up more vertical space. Header changes to "find your community."
- Your Rooms section: Replaced with centered message: "no rooms yet. join a community above or create your own." Icon: outlined group (48pt, white at 15%).
- FAB: Extra visible. Possibly pulsing orange glow on first visit to draw attention.
- SIA is not present on this screen, but the empty state tone follows SIA's warm voice: "accountability is stronger with others. start or join a room."

### Day 1 — Room Interior (new room, no messages)
- Chat area: Centered message — "this is the beginning of [room name]. say hi." in 15pt Sora Regular, white at 40%, center-aligned.
- Room emoji: Displayed large (48pt) centered above the text.
- No date separator until first message.

### Established user — Room List (rooms with no activity)
- Rooms show normally with last message preview. Inactive rooms naturally sort to the bottom by recency. No special treatment needed.

---

## Motivation Adaptation

- **Low motivation**: Discover section stays prominent even after joining rooms (social connection as motivation). Room rows may show a SIA-generated label: "your accountability pod checked in today" to encourage entry. Achievement cards in rooms are more celebratory.
- **Medium motivation**: Standard experience.
- **High motivation**: Additional room analytics appear in room settings: message frequency, member activity rates. Discover section may shrink after user has joined multiple rooms. Group challenges teaser: "competitions coming soon" banner in room settings (V2).

---

## Error Handling

| Error Scenario | Visual Treatment | Recovery Action |
|----------------|------------------|-----------------|
| Room list load fails | Room list area shows "could not load rooms" in 15pt Regular, white at 40%, centered + "retry" link in orange | Tap retry re-fetches room list |
| Room creation fails | Create Room modal CTA shows error state (red border flash, 280ms), "could not create room — try again" toast (top, 3s auto-dismiss) | Modal stays open, form data preserved, user retries |
| Message send fails | Message bubble shows error indicator (red exclamation circle, 16pt, right of bubble) + "not sent" label in 11pt Regular, error-red. Bubble stays in place. | Tap failed message bubble shows "retry / delete" action menu |
| Message history load fails | Room interior shows "could not load messages" centered + "retry" link in orange | Tap retry re-fetches. Cached messages show if available. |
| Media attachment upload fails | Attachment placeholder shows red border + upload-failed icon. "upload failed" label in 11pt, error-red, below placeholder. | Tap placeholder shows "retry upload / remove" action menu |
| Join room fails | Join CTA reverts to default state (280ms), "could not join — try again" toast | User taps join again to retry |
| WebSocket disconnection | Subtle "reconnecting..." banner (32pt, ink-brown-800, amber text at 60%) slides down below room header. Dot indicator on room header changes from green to amber. | Auto-reconnects with exponential backoff. Banner updates to "connected" (green, auto-dismiss 2s) on success. |
| Member list load fails | Member list sheet shows "could not load members" + "retry" link | Tap retry re-fetches |
| Network offline | Room list shows cached rooms with "offline" badge (12pt, white at 30%). Room interior shows cached messages only. Message input disabled with "offline — messages will send when you reconnect" placeholder text. | New messages queue locally and send on reconnection with "sending..." state |

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen header title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| Eyebrow labels ("DISCOVER", "YOUR ROOMS") | Sora | 600 (Semibold) | 12pt | 14pt | White at 40% |
| Discover card room name | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF |
| Discover card member count | Sora | 400 (Regular) | 12pt | 16pt | White at 40% |
| Room row name | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Room row member count | Sora | 400 (Regular) | 12pt | 16pt | White at 40% |
| Room row message preview | Sora | 400 (Regular) | 14pt | 20pt | White at 50% |
| Room row timestamp | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| Unread badge count | Sora | 600 (Semibold) | 11pt | 14pt | White #FFFFFF |
| Room header title (interior) | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF |
| Room header member count | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| Chat sender name | Sora | 600 (Semibold) | 12pt | 16pt | White at 60% |
| Chat message text | Sora | 400 (Regular) | 15pt | 22pt | White at 90% (others) / White #FFFFFF (own) |
| Chat timestamp | Sora | 400 (Regular) | 11pt | 14pt | White at 30% |
| Date separator | Sora | 400 (Regular) | 12pt | 16pt | White at 30% |
| Achievement card text | Sora | 400 (Regular) | 14pt | 20pt | White at 80% |
| Achievement XP text | Sora | 600 (Semibold) | 14pt | 20pt | #34A853 (green) |
| Message input placeholder | Sora | 400 (Regular) | 15pt | 22pt | White at 30% |
| Message input text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF |
| FAB label | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF |
| Create room modal title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| Room preview sheet name | Sora | 600 (Semibold) | 20pt | 26pt | White #FFFFFF |
| Room preview description | Sora | 400 (Regular) | 14pt | 20pt | White at 60% |
| Member list name | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF |
| Member list level badge | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| "leave room" action | Sora | 400 (Regular) | 15pt | 20pt | #f44336 (error) |
| Block confirmation heading | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF |
| Block confirmation body | Sora | 400 (Regular) | 14pt | 20pt | White at 50% |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "Community" on mount as the screen identity
- Focus order (Room List): Back button -> Screen header -> "DISCOVER" eyebrow -> Discover cards (left-to-right) -> "YOUR ROOMS" eyebrow -> Room rows (top-to-bottom) -> FAB
- Focus order (Room Interior): Back button -> Room header (name, member count, settings gear) -> Date separators and messages in chronological order -> Message input -> Send button -> Tab bar
- Discover cards: accessible role "button"; label includes room name and member count (e.g., "Fitness lovers, 234 members. Double tap to preview.")
- Room rows: accessible role "button"; label includes room name, member count, last message preview, and unread count (e.g., "Morning crew, 5 members, 3 unread messages")
- Unread badge: count announced as part of room row label; not a separate focusable element
- Chat messages from others: accessible label "Sender name says: message text. Time."
- Own chat messages: accessible label "You said: message text. Time."
- Shared achievement cards: accessible role "text"; label includes achievement details (e.g., "Sarah hit her fitness goal, plus 150 XP")
- Message input: accessible label "Type a message"
- Send button: accessible label "Send message"; only active state is focusable
- Member list sheet: focus traps within sheet; each member row is a button with label including name and level
- Report/Block overflow menu: accessible role "menu"; each option is a "menuitem"
- Block confirmation: focus traps within confirmation; "Block" and "Cancel" are clearly labeled
- Reduced motion: skip achievement card scale-in, discover card staggered slide-in, unread badge bounce, and typing indicator pulse; show elements in final state immediately

---

## Cross-References

- **Navigates to**: Room Interior (stack push from room row), Room Preview Sheet (from discover card), Create Room Modal (from FAB), Member List Sheet (from room header), Room Settings Sheet (from room header), User Profile Bottom Sheet (from member list or sender avatar/name tap — shows avatar, level, top domains, "message" and "invite" CTAs per _shared-patterns.md with overflow menu for report/block; "message" creates/opens a private room with that user), Report/Block [64] (via overflow menu "report" in user profile sheet, message long-press → "report", or member options → "report")
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link), Screen [39] — Leaderboard ("find communities" link)
- **Shared components with**: Screen [39] — Leaderboard (Limited User Profile sheet, Level Badge on member rows), Screen [09] — SIA Chat (message bubble pattern — community uses simpler variant without rich cards)
- **Patterns used**: Back Button, 8-State Model, FAB (Screen 35), Modal Presentation (Batch 1), Text Input Field (Batch 1), Brand CTA Button (Batch 1)
- **Patterns established**: Room List Row (avatar + name + members + preview + time + unread badge), Discover Card (emoji + name + member count, horizontal scroll), Chat Message Bubble — Group (sender avatar + name + bubble + timestamp, left/right alignment), Shared Achievement Card (green-bordered celebration within chat), Message Input Bar (input field + send button with active/inactive states), Date Separator (centered text with horizontal rules), Room Preview Sheet, Create Room Modal, Member List Sheet, Room Settings Sheet, Typing Indicator (three-dot pulse), Unread Badge (orange circle with count)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/community`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B13-F07 | critical | navigation | Make discover cards and room rows semantic controls, open room preview or room interior, and wire Create room to its bottom sheet. |
| B13-F08 | major | trust-privacy | Add visibility defaults, preview/join copy, room settings, member controls, and moderation/report/block entry points. |
| B13-F09 | major | accessibility | Use labeled links/buttons for discover cards, room rows, unread state, active status, and back navigation. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

