# Screen Design: Community / Chat Rooms

**Screen**: 40 of 43
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
  - Eyebrow: "DISCOVER" — 11pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin
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

### SIA Community Coaching Note
- **Purpose**: Add SIA's presence to the community screen — flagged as missing in the cross-batch inconsistency report. SIA contextualizes social engagement within the user's life goals.
- **Data source**: SIA engine (based on user's community activity and goals)
- **Visual treatment**: Same as SIA Coaching Note Card — Compact Variant (from _shared-patterns.md). Purple dot (6pt) + message text (15pt Sora Regular, white, max 2 lines). Examples: "Your community completed 47 actions today. Jump in." or "3 people in your room are working on fitness goals too."
- **Position**: Below the room list header, above the first room row
- **Gestures**: Tap → tab switch to SIA Chat [09] with community context
- **Size**: Full-width minus 32pt, 56-72pt height

### Group Challenge Card
- **Purpose**: Time-limited collaborative challenges that move social features from passive (leaderboard observation) to active (doing things together). Adapts Habitica's party quest mechanic with Balencia's positive motivation model — no punishment for missing, only positive reinforcement for contributing.
- **Data source**: Challenge system (API — active challenges, member progress, time remaining)
- **Visual treatment**: ink-brown-800 card, --r-lg (16pt), 16pt padding. Full-width minus 32pt.
- **Sub-elements**:
  - Challenge name: 17pt Sora Semibold, white (e.g., "30-Day Meditation Streak")
  - Domain tag chips: inline, showing relevant domains
  - Time remaining: 13pt Sora Regular, orange (#FF5E00) (e.g., "18 days left")
  - Shared progress bar: 8pt height, --r-pill. Track: white at 8%. Fill: orange (#FF5E00). Represents collective group progress toward the challenge goal (e.g., "Team: 340/500 total actions").
  - Member avatars: row of 5 overlapping circles (24pt each, -8pt overlap), showing participants. "+N" overflow badge.
  - Your contribution: "You: 12 actions" (13pt Sora Semibold, white at 70%)
  - "Join" button (for unjoinged challenges): 36pt height, --r-pill, orange fill, white text "join challenge"
- **Size**: Full-width minus 32pt, ~160pt height
- **Gestures**: Tap card → expand to challenge detail (inline expansion showing full member list, daily breakdown, your rank). Tap "join" → join the challenge with success haptic.
- **Variants**: Active (user joined — shows contribution), Available (user not joined — shows "join" button), Completed (green border, results summary)

### Group Challenge Card — Expanded State

When user taps a Group Challenge Card, it expands inline (not a navigation push):

**Collapsed state** (default): ~96pt
- Challenge name (15pt Semibold, white)
- Shared progress bar (8pt, --r-pill, orange fill)
- "3/8 members active" (13pt Regular, white at 50%)
- Time remaining (13pt Regular, orange)

**Expanded state** (collapsed + ~180pt expansion):

**Expansion content:**
- Divider: 1pt, white at 5%, 8pt below collapsed content
- Member list: vertical stack of participant rows (40pt each, max 8 visible, scroll if more)
  - Each row: 24pt avatar circle + name (14pt Regular, white) + status icon (checkmark if today's contribution done, circle if pending)
  - Your row highlighted with subtle orange tint (orange at 5% bg)
- Daily breakdown: 7-day dot row (same as 7-Day Calendar Dot Row pattern, domain color = orange)
- Your rank: "You're #3 of 8" (13pt Semibold, white, centered below member list)

**Animation:**
- Expand: height grows 280ms ease-out-soft, content fades in 280ms
- Collapse: tap card again or tap outside, reverse animation
- Only one challenge card expanded at a time

**Relationship to "Discover Challenges":**
- Group Challenge Cards appear within each room's chat (inline, above the message list)
- "Discover Challenges" is a tab within the Community screen's top-level segmented control: "Rooms" | "Challenges"
- The "Challenges" tab shows a grid of available challenges to join (same layout as Explore module cards on Screen [18])

### Discover Section — Challenges Tab
- **Purpose**: Show available group challenges alongside discoverable rooms
- **Visual treatment**: Add a segmented control at the top of the Discover section: "rooms" | "challenges" (standard Segmented Control pattern). "Challenges" tab shows horizontally scrollable Group Challenge Cards (compact variant: 140pt wide x 120pt tall).

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
| Long-pressed | Bubble lifts slightly (no context menu in V1) | medium impact |

### Message Bubble (Own)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Warm-tinted bubble | — |
| Long-pressed | Bubble lifts slightly (no context menu in V1) | medium impact |

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
| Long-press | Message bubble | No action in V1 (see V2 Features section) |
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
- **High motivation**: Additional room analytics appear in room settings: message frequency, member activity rates. Discover section may shrink after user has joined multiple rooms. Group challenges teaser: "competitions coming soon" banner in room settings (see V2 Features section).

---

## Cross-References

- **Navigates to**: Room Interior (stack push from room row), Room Preview Sheet (from discover card), Create Room Modal (from FAB), Member List Sheet (from room header), Room Settings Sheet (from room header), Limited User Profile (from member list, same as Screen 39)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link), Screen [39] — Leaderboard ("find communities" link)
- **Shared components with**: Screen [39] — Leaderboard (Limited User Profile sheet, Level Badge on member rows), Screen [09] — SIA Chat (message bubble pattern — community uses simpler variant without rich cards)
- **Patterns used**: Back Button, 8-State Model, FAB (Screen 35), Modal Presentation (Batch 1), Text Input Field (Batch 1), Brand CTA Button (Batch 1)
- **Patterns established**: Room List Row (avatar + name + members + preview + time + unread badge), Discover Card (emoji + name + member count, horizontal scroll), Chat Message Bubble — Group (sender avatar + name + bubble + timestamp, left/right alignment), Shared Achievement Card (green-bordered celebration within chat), Message Input Bar (input field + send button with active/inactive states), Date Separator (centered text with horizontal rules), Room Preview Sheet, Create Room Modal, Member List Sheet, Room Settings Sheet, Typing Indicator (three-dot pulse), Unread Badge (orange circle with count). **SIA Community Coaching Note** — SIA presence on the community screen. **Group Challenge Card** — collaborative time-limited challenges with shared progress bar, member avatars, and positive-only mechanics (no punishment for non-participation). **Discover Challenges Tab** — challenges alongside room discovery.

---

## V2 Features (Deferred — Not for V1 Implementation)

The following features are planned for V2 and should NOT be implemented in V1. They are documented here for future reference only.

- **Message context menu**: Long-press on message bubbles will support "copy" and "reply" actions. V1 has no long-press behavior on messages.
- **Follow/friend request system**: No discovery or connection mechanism in V1. Users join rooms via invite links or community discovery.
- **Competitions and shared challenges**: While Group Challenge Cards are included in V1, competitive scoring between rooms is deferred.
- **Financial stakes**: "If I don't do this, I pay X" enforcement via AI is V2.
- **Voice messages in community chat**: Text only in V1.
