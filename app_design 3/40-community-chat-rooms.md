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

## Premium Craft

**Profile:** content · **Cluster benchmark:** Geneva + Discord done warm (private-first; room flows are a product-decision) — *stays Balencia via warm-glow surfaces on ink-brown, the brand period, and non-shaming social tone.*
**Pre-grade:** B+ (80) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Room List shows good IA (discover + your rooms + FAB), but (1) surfaces are flat cards with no top-edge highlight or layered depth; (2) the Room Interior chat bubbles read generic, not Balencia-authored; (3) microcopy (empty states, error messages, achievement phrasing) lacks warmth and non-shaming framing; (4) motion choreography is not locked to draw-first order; (5) a state-craft matrix is missing (cold-start, loading, empty, error, offline per the CONSISTENCY template); (6) no one ownable Balencia moment is named (the brand period, the warm-glow surface, the continuous stroke are present but not called out); (7) contrast pairs are stated generically, not tabulated.

### Focal hierarchy

Two separate focal points, each appropriate to its view:

**Room List**: the **Discover Section** (the horizontal-scroll card carousel) is the above-the-fold focal point — it surfaces entry to new rooms and guides the eye first (16pt eyebrow "DISCOVER", 4–10 cards, horizontal scroll breaking the vertical monotony). The **Your Rooms list below is visibly secondary**: a vertical stack of equal-height rows, sorted by recency, no glow or size variation. The **FAB is persistent but not focal** — a 48pt fixed affordance for creation, not a hero element. On the Room List, the squint test lands on the Discover scroll first, then the rooms list as a dense block.

**Room Interior**: the **chat message stream is the focal point** — the primary interaction zone, full-height scrollable, chronologically ordered. The **Room Header sits above as context** (room name, member count, settings — subtle, supporting); the **Message Input sits below as the action affordance** (always visible, 52pt, simplified). No visual hierarchy within the message stream itself — messages are peer elements, differentiated only by sender/ownership (left/right align, own-message warm tint) and time/date separators. The squint test lands on the message thread, then the input affordance.

### Surface & depth

**Room List:**
- **Discover cards** (120pt wide × 100pt): `--color-ink-brown-800` body · `--radius-lg` (20pt) · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. No glow (cards are <96pt, per CONSISTENCY.md §1).
- **Room Row container** (the full card holding all rows): `--color-ink-brown-800` · `--radius-xl` (28pt) · 1px `--glass-border` · **`--edge-highlight`** · `--shadow-1`. Individual rows separated by 1pt `--color-alpha-white-05` dividers (decorative, not load-bearing).
- **Room header, settings sheets, member list sheet**: ink-900 bg (no card surface — they are modal/overlay contexts, not surfaces). Member/settings sheet bottoms have `--radius-2xl` (40pt) top corners.

**Room Interior:**
- **Message bubbles** (others): `--color-ink-brown-800` · `--radius-lg` (16pt) · 1px `--glass-border` · **`--edge-highlight`** · no shadow (inline chat elements). Top-left corner 4pt radius (pointer toward avatar).
- **Message bubbles** (own): same as others, but background is `--color-ink-brown-800` with a **subtle warm tint** — mixed 5% opacity of `--color-brand-orange` (`--color-brand-orange`) into the brown fill, creating a barely-perceptible warm shift. This is the ownable Balencia moment on this screen: the user's own voice reads as **warm, not neutral**. No additional glow.
- **Shared Achievement Card**: `--color-ink-brown-800` body · `--radius-lg` (16pt) · 1px `--glass-border` · **`--edge-highlight`** · **`--color-forest-green` left border accent** (3pt, celebrating completion) · `--shadow-1` · centered in chat flow. The green accent is the second ownable moment — celebrating *peer* progress in a warm, not cold, way.
- **Date separator**: no card surface — flat text line with decorative 1pt `--color-alpha-white-05` rules on each side.

All surfaces follow the locked depth recipe: `ink-brown-800` body + `CK-T01` top-edge highlight + 1px `--glass-border` + honest `--shadow-1` (FAB and sheet overlays use `--shadow-2/3` per z-layer). No surface is a flat box. No glow on inline chat elements; the warm-tint on own messages and the green border on achievement cards carry the craft signature without neon.

### Typographic rhythm

Map the existing Typography table to `CK-P3` tokens:
- Screen header title ("Community") · Room header title (interior) — `--text-h2` (20pt) / 600 / `--leading-snug` (1.25) / white 100%
- Room name (discover card), chat sender name — `--text-h3` (17pt) / 600 / `--leading-snug` / white 100% (sender) or white 60% (sender label in chat)
- Room name (row), message text, room description (preview sheet) — `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 90–100%
- Eyebrow labels ("DISCOVER", "YOUR ROOMS") — `.eyebrow` recipe (`--text-eyebrow` 12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%)
- Member count, timestamps, captions — `--text-caption` (13pt) / 400 / `--leading-normal` / white 40–50%
- Unread badge count — `--text-small` (11pt) / 600 / white 100% (high contrast on orange badge bg)
- FAB label ("create room") — `--text-h3` (17pt) / 600 / white 100%
- Input field hint text — `--text-body` (15pt) / 400 / white 30%

Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (room names, message input hint text "Say something…" not "Message…"). ≤2 `--color-brand-orange` accent words on screen (the "create room" CTA label and the unread badge count, if visible). Chillax stays logo-only (none here). Stat figures (member count, unread count) use tabular-nums.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice.

- **Discover card member count** — *before:* "234 ♦" (unclear) → *after:* "234 members" (clear, accessible; diamond icon is brand-only for Life Power, not needed here).
- **Message input hint text** — *before:* "message..." (lowercase, templated) → *after:* "Say something…" (warm, Balencia voice, conversational).
- **Unread badge** — *before:* "badge hidden if no unread" (implicit) → *after:* clarified: badge shows only when unread messages exist; the visible numeric count (white 100% on orange) is the unread indicator (never colour-alone — the count is the visible status).
- **Room row last message preview** — *before:* message shown as-is, may be generic → *after:* if a message is unread, the row reads as active; if from a peer, sender name is shown; if the user's own last message, sender name is omitted. Always warm framing — no judgment on message content.
- **Shared Achievement Card** — *before:* "[Name] hit their [goal/milestone]. +[XP] XP" (generic, template-like) → *after (on-voice, non-shaming):* "Sarah hit her fitness goal. +150 XP." or "Ahmed leveled up to 12. +250 XP." — warm, specific, no exclamation mark, the period carries intent. The phrasing celebrates *the person*, not the machine (not "Achievement unlocked"). Avoid comparative language ("Sarah beat the room average") — the celebration is personal, not competitive.
- **Empty State — Day 1 (no rooms)** — *before:* "no rooms yet. join a community above or create your own." → *after (on-voice):* "Accountability is stronger with others. Join a community above or start your own." (Warm, coaching tone, frames *why* social matters, never a blank or shame.)
- **Empty State — Room Interior (new room, no messages)** — *before:* "this is the beginning of [room name]. say hi." → *after (kept):* same; warm, inviting. (Already on-voice.)
- **Error — Room list load fails** — *before:* "could not load rooms" + "retry" → *after:* "Couldn't load rooms. Pull to refresh." (Specific, recovery action named, on-voice.)
- **Error — Message send fails** — *before:* red exclamation + "not sent" → *after:* "Not sent. Tap to retry or delete." (Warm recovery, no shame; the failed message stays in place, user has agency.)
- **Loading — Room interior messages** — *before:* no loading message → *after (new, on-voice):* a brief skeleton layout (sender avatar outline, message bubble skeleton, timestamp hint text) that morphs into real messages. No spinner-swap; if loading the *new* room interior for the first time, a centered message like "Loading conversation…" (15pt Regular, white 40%) is acceptable.
- **Offline — Message input disabled** — *before:* input dimmed, no message → *after (on-voice):* generic text "You're offline — messages will send when you reconnect." (Warm, specific, honest.)
- **WebSocket disconnection banner** — *before:* no banner (silent reconnect) → *after (new):* a subtle 32pt banner below the room header: "Reconnecting…" (amber/white 60%, calm, no urgency). On reconnect success: banner auto-updates to "Connected" (green, 2s auto-dismiss). (Builds trust, not anxiety.)

No exclamation marks anywhere; the brand period is used with intent (the celebration phrasing ends with a period, not punctuation that shouts). SIA is **not present on this screen** (no purple) — social is peer-driven, not AI-mediated. Copy tone is warm, plain, coach-like, never shaming or comparison-driven.

### Motion choreography

Locked to `CK-P4` draw-first order:

**Room List entrance** (on mount):
1. Screen header fades in (`--dur-base` 280ms `--ease-out-soft`)
2. Discover eyebrow fades in + discover cards slide in from right (280ms each, 60ms stagger, `--ease-out-soft`) — **first visual motion, horizontal breaks vertical monotony**
3. "YOUR ROOMS" eyebrow fades in
4. Room rows fade in + rise (`.animate-fade-up`, 280ms each, 80ms stagger, `--ease-out-soft`)
5. FAB scales in (0.8→1) + opacity(0→1) with 400ms delay (appears last, draws eye to creation affordance after rooms settle)

**Room Interior entrance** (after stack push):
1. Room header fades in (280ms `--ease-out-soft`)
2. Message thread loads (existing messages appear at final state instantly; no stagger on historical messages — the thread reads as settled, not animated)
3. Date separators fade in (280ms)
4. New messages (received or sent after mount) **fade in + slide up** (`translateY 16→0, opacity 0→1`, 280ms `--ease-out-soft`) — only *new* messages animate, honoring the "draw, never fade" rule by morphing them in as they arrive

**Message sending**:
- Own message bubble slides in from right (`translateX 24→0, opacity 0→1`, 280ms `--ease-out-soft`)
- Send button: orange bg fades in on text entry (opacity 0→1, 160ms `--dur-fast` `--ease-out-soft`)
- Send button (on tap): briefly darkens + `scale(0.90)`, then reverts to orange on success

**Achievement card**:
- Scales in (`scale 0.8→1`) + green glow pulses (`0→100%→0` opacity, 520ms `--dur-slow` `--ease-flow`) — the one **draw-inspired motion** on this screen, celebrating peer completion warmly

**Unread badge (on new message while on Room List)**:
- Scales in (0→1) with bounce (`scale 0→1.2→1`, 280ms `--dur-base` `--ease-out-soft`)

**Typing indicator (other user typing)**:
- Three dots pulse (opacity 30%→100%, staggered 120ms apart, looping, no duration limit) — settles when the message arrives

**Pull-to-refresh**:
- Branded spinner (Balencia symbol rotates, orange, linear rotation) — no draw motion on refresh (it's a passive action, not a focal entrance)

**`prefers-reduced-motion`**: All elements at final state instantly; the warm-tint own-message bubble, the green achievement border, and the settled chat thread are preserved — no info loss. Typing indicator and achievement glow are disabled. Staggered entrances collapse to instant.

Below-fold rooms and messages animate on scroll-into-view (if the list is long). One line motif per surface (the achievement card green border and own-message warm tint are color accents, not strokes, so no continuous-stroke repetition — but the warm-tint on own messages *is* the ownable moment that differentiates Balencia chat from a generic app).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day 1 (Room List)** | Discover section takes prominent space; "YOUR ROOMS" section replaced with centered message + icon (outlined group 48pt, white 15%) | "Accountability is stronger with others. Join a community above or start your own." | Discover cards render normally; no degenerate empty state; FAB has warm glow/pulse on first visit to draw attention |
| **Cold-start / Day 1 (Room Interior)** | Chat area centered; room emoji (48pt) above message | "This is the beginning of [room name]. Say hi." | Emoji + message, no date separator yet; Message Input is active and ready; no empty scaffold |
| **Loading (Room List)** | Discover cards: skeleton shimmer (rounded rectangles, matched card dimensions); Room rows: 3 skeleton rows (avatar outline, text placeholders, shimmer) | No loading message; structure is visible | Skeletons on `--color-ink-brown-800`, radial shimmer morphs into data (never a spinner-swap) |
| **Loading (Room Interior)** | Sender avatar + message bubble skeleton (outline, shimmer) + timestamp hint text; loads as messages arrive (inverted FlatList, bottom-up) | Brief centered "Loading conversation…" (white 40%, 15pt Regular) in center; then messages populate below | Skeleton preserves layout + depth (bubble outline visible); morphs into real message when data arrives |
| **Empty / partial (Room List)** | If discover API fails: Discover section hidden or shows cached curated list (graceful degradation). Your Rooms renders normally if that API succeeds (parallel loading). | "Couldn't load rooms. Pull to refresh." (if full failure); if partial, "Couldn't load suggested communities — showing your rooms." | Cached data shown if available; no color change; glyph + word, never colour-alone |
| **Empty / partial (Room Interior)** | If room has no messages yet (just created): centered welcome message. If message history load fails: cached messages shown, with a "Couldn't load older messages — pull to load more" hint text above. | For new room: "This is the beginning of [room name]. Say hi." For failed history: "Couldn't load older messages. Pull to retry." | No-data ≠ zero; structure intact; message input always active |
| **Error (message send fails)** | Failed message bubble stays in place; red error indicator (red circle with exclamation, 16pt) appears right of bubble | "Not sent. Tap to retry or delete." (on the bubble, 11pt error-red) | Calibrated `--color-error-red` only for genuine failure; message is preserved (user can retry); glyph + word paired |
| **Error (WebSocket disconnection)** | 32pt amber banner below room header: "Reconnecting…" (no urgency, calm); message input stays active but sends queue locally | "Reconnecting…" (amber/white 60%); on success: "Connected" (green, auto-dismiss 2s) | No panic colors; green on reconnect success (not cold blue); banner is calm, informational |
| **Offline** | Room List: all rooms show with "Offline" badge (12pt, white 30%, low visibility). Room Interior: all messages cached; message input disabled with generic text. Pull-to-refresh dimmed. | "You're offline — showing your last sync." (input hint text: "You're offline — messages will send when you reconnect.") | No color change; cached data retained; actions honestly dimmed (50% opacity, no haptic on input tap) |

### Signature & anti-generic

Ownable moments:
1. **The warm-tint own message bubble** — a 5% orange-mixed warm shift in the `--color-ink-brown-800` fill, subtly differentiating the user's voice from peers. This is *not* a generic app color (not cold blue, not a flat grey). It reads as the user's words being *warmly received*, a Balencia signature that says "your voice matters here, and it's warm."
2. **The green-bordered achievement card** — a `--color-forest-green` 3pt left border celebrating peer milestones in the chat. Green is the "arrival / completion" signal in the 60/30/10 palette; here it's used to celebrate *another person's* progress within the social context. Warm, not cold, celebration — no algorithm, no reward gamification, just peer warmth.
3. **The brand period** — used with intent in achievement copy ("Sarah hit her fitness goal." not "Sarah hit her fitness goal!") and in all microcopy (coaching tone, no urgency punctuation).

Anti-generic fixes (CK-P6):
- The Discover horizontal-scroll breaks the vertical room-list monotony; the cards are not a symmetric grid.
- Room rows are not flat equal cards — they are rows within a single card container with dividers, breaking the "card wall" pattern.
- The FAB is persistent and prominent but not a competing focal point (it comes in last during entrance motion, settling after rooms load).
- Message bubbles are differentiated by ownership (left/right, warm tint on own), not by color-alone or icon-alone; the Chat pattern reads as Balencia, not iMessage-clone.
- The achievement card is *centered* in the chat flow (a horizontal break from left/right alignment), making it visually distinct from messages.
- Empty states are never silent or degenerate (Day-1 Room List shows "Accountability is stronger with others" + an encouraging icon, not a blank screen; new Room Interior shows the welcome prompt, not a degenerate chat).

No "generic AI" tells: no generic copy, no "Message..." hint text that dominates the input, no symmetric card walls, no templated toast messages ("Success!" is never used — "Joined!" or "Connected" appears with a glyph). The screen reads as **private-first, peer-driven, warm, and ownable**.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Notes |
|---|---|---|---|
| Room name (discover card, row, header) | white 100% | ≥12:1 | Primary text |
| Message text (others) | white 90% | ≥9:1 | Body text, readable |
| Message text (own) | white 100% | ≥12:1 | User's own words, emphasis |
| Member count, timestamp, caption | white 40–50% | ≥4.5:1 at `--text-caption` | Tertiary text |
| Eyebrow ("DISCOVER") | white 40% | ≥4.5:1 | Decorative label, paired with position |
| Sender name (in chat) | white 60% | ≥4.5:1 | Secondary text |
| Unread badge count | white 100% on orange | ≥3:1 (WCAG 1.4.11) | High contrast for visibility |
| Achievement border | green (`--color-forest-green`) on brown | ≥3:1 (WCAG 1.4.11) | Load-bearing accent, visible status |
| Error message ("not sent") | error-red on brown | ≥3:1 (WCAG 1.4.11) | Load-bearing error, glyph + word |
| "Reconnecting" banner | amber/white 60% on brown | ≥4.5:1 | Informational, calm status |

Status never colour-alone: unread rooms show a **visible count badge** (orange circle with white number); connection status shows **text + colour** (amber "Reconnecting…", green "Connected"); error messages show **error-red text + icon** (red exclamation circle). Every interactive element (discover cards, room rows, message bubbles, FAB, send button) carries the single `--focus-ring` token (`CK-T03`, 2px orange, 2px offset) uniform app-wide — replacing any ad-hoc focus styling in the Interaction States table. Targets ≥44×44pt (room rows are 80pt tall, FAB 48pt, message bubbles have large hit boxes, the send button is 40pt circle). Reduced-motion: Discover cards, achievement glow, unread badge bounce, and staggered room entrances are disabled; all elements appear at final state instantly; message bubbles (own and others) appear at final opacity; typing indicator is disabled.

Accessibility labels (screen reader):
- **Discover card**: "Fitness lovers, 234 members, tap to preview"
- **Room row (unread)**: "Morning crew, 5 members, 3 unread messages"
- **Own message**: "You said: I already did my reading 45 minutes this morning. 9:45 am"
- **Other's message**: "Sarah says: Great workout this morning. Feeling strong. 9:15 am"
- **Achievement card**: "Sarah hit her fitness goal, plus 150 XP"
- **FAB**: "Create room"
- **Unread badge**: Announced as part of room row label; not a separate focusable element

Focus order: Back button → Screen/Room header → Discover eyebrow → Discover cards (left-to-right) → "YOUR ROOMS" eyebrow (Room List) / Room header member count + settings (Room Interior) → Room rows (Room List) / Date separators and messages in order (Room Interior) → Message input + Send button → FAB (Room List) / Tab bar.

Conform to `design-audit/CONSISTENCY.md`.

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

