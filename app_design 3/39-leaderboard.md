# Screen Design: Leaderboard

**Screen**: 39 of 73
**File**: 39-leaderboard.md
**Register**: Product Mode
**Primary action**: view rankings
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Leaderboard). Entry from Explore [18] grid card or SIA deep-link [09] ("you moved up 3 spots this week"). Exit via back button to Explore, or forward to RPG Character [19] via own rank card.

---

## Purpose

This screen is the social motivation layer — a leaderboard ranking users by life improvement consistency, not domain-specific metrics. It answers "who is leading in improving their life?" The core measure is XP earned through habit completion, goal progress, and engagement consistency. This is tied directly to the RPG gamification system: levels, XP, and streaks drive rankings. The philosophy is "individual first, social as enhancement" — this screen is optional, motivational, and never shaming. The framing emphasizes discipline and consistency, not raw ability.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header — "Leaderboard" title with back navigation
2. Segmented time filter — This week / This month / All time
3. User's own rank card — highlighted, always visible, personal anchor
4. Leaderboard list — ranked rows of other users
5. Friends filter — toggle between global and friends-only

**User flow**:
- **Arrives from**: Explore [18] via "Leaderboard" card (stack push), SIA Chat [09] via deep-link when SIA mentions rank change
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: RPG Character [19] via own rank card tap (stack push), limited user profile view via tapping other users (lightweight sheet)

---

## Layout

**Scroll behavior**: FlatList (leaderboard can be long, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]     "Leaderboard"        │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  [This week][This month][All time] │  ← Segmented Control
│                                     │  ← 16pt gap
│  ┌═════════════════════════════┐   │
│  ║  #12          ↑3 this week  ║   │  ← User's Own Rank Card
│  ║  [avatar] Hamza    Lv. 14  ║   │     (highlighted, orange
│  ║  2,340 XP  🔥 21-day streak║   │      border accent)
│  ║  [learning]                 ║   │     top domain badge
│  └═════════════════════════════┘   │
│                                     │  ← 8pt gap
│  [global]  [friends]               │  ← Filter Toggle
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  #1  [av] Sarah    Lv. 23  │   │  ← Rank Row 1 (gold)
│  │       4,120 XP  [fitness]   │   │
│  ├─────────────────────────────┤   │
│  │  #2  [av] Ahmed    Lv. 21  │   │  ← Rank Row 2 (silver)
│  │       3,890 XP  [spiritual] │   │
│  ├─────────────────────────────┤   │
│  │  #3  [av] Lisa     Lv. 20  │   │  ← Rank Row 3 (bronze)
│  │       3,650 XP  [career]    │   │
│  ├─────────────────────────────┤   │
│  │  #4  [av] Omar     Lv. 19  │   │
│  │       3,410 XP  [finance]   │   │
│  ├─────────────────────────────┤   │
│  │  #5  [av] Priya    Lv. 18  │   │
│  │       3,200 XP  [wellbeing] │   │
│  ├─────────────────────────────┤   │
│  │  ...more rows...            │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Leaderboard" title

2. **Leaderboard Type Tabs** — 40pt
   - Purpose: Switch between global XP leaderboard, competition leaderboards, and country leaderboards
   - Content: "global" / "competitions" / "country" segmented control

3. **Segmented Time Filter** — 40pt (shown for global/country tabs only)
   - Purpose: Filter rankings by time period
   - Content: "this week" / "this month" / "all time"

4. **User's Own Rank Card** — ~120pt
   - Purpose: Personal anchor — the user always sees their position
   - Content: Rank, avatar, name, level, XP, streak, top domain badge, rank change

4. **Filter Toggle** — 32pt
   - Purpose: Switch between global and friends-only rankings
   - Content: "global" / "friends" underline tabs

5. **Leaderboard List** — Remaining height (FlatList)
   - Purpose: Ranked list of users
   - Content: Individual rank rows

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Leaderboard" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Segmented Time Filter
- **Purpose**: Filter leaderboard by time range
- **Data source**: View state (local), triggers API reload on change
- **Visual treatment**: Identical to Screen 38 Segmented Control pattern. 16pt horizontal margins.
- **Content**:
  - Container: Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill
  - Three segments: "this week" / "this month" / "all time" (13pt Sora Semibold, sentence case)
  - Active: Burnt orange fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Variants**: This week (default), This month, All time
- **Gestures**: Tap to switch period
- **Size**: Full-width minus 32pt x 40pt

### User's Own Rank Card
- **Purpose**: The user's personal position — always visible, the emotional center of the screen
- **Data source**: API — current user's rank, XP, level, streak, top domain
- **Visual treatment**: ink-brown-800 glassmorphism card with orange border accent (1.5pt, #FF5E00 at 40%). 20pt radius. 20pt padding. 16pt horizontal margins. This is the only card with a colored border on this screen — it signals "this is you."
- **Content layout**:
  - Top row:
    - Left: Rank number — "#12" in 24pt Sora Bold, white. If top 3: gold (#FFD700) for #1, silver (#C0C0C0) for #2, bronze (#CD7F32) for #3.
    - Right: Rank change indicator — "↑3 this week" in 13pt Sora Semibold. Up: green (#34A853) with ↑. Down: orange (#FF5E00) with ↓. Same: white at 40% "—".
  - Middle row (12pt below top):
    - User avatar: 44pt circle, left-aligned. Placeholder: first initial on orange (#FF5E00) circle. Photo if available, --r-pill corners.
    - User name: 16pt Sora Semibold, white, 12pt right of avatar
    - Level badge: "Lv. 14" in 13pt Sora Semibold. Pill shape: ink-900 bg, 1pt orange border, --r-pill, 24pt height, 8pt horizontal padding. Right-aligned.
  - Bottom row (8pt below middle):
    - XP: "2,340 XP" — 14pt Sora Regular, white at 70%. `tabular-nums` for alignment.
    - Streak: Flame (14pt, orange) + "21-day streak" in 13pt Sora Regular, white at 60%. 16pt right of XP.
    - Top domain badge: Domain Tag Chip (as defined in Screen 37) positioned at far right. Shows the user's highest-level domain.
- **Sticky behavior**: If the user scrolls and their rank row is not in the visible leaderboard area (e.g., user is rank 47 but viewing top 10), this card pins to the top of the list area below the filter toggle. When their row comes into view in the list, the pinned card unpins and scrolls normally.
- **Gestures**: Tap navigates to RPG Character [19] (stack push)
- **Size**: Full-width minus 32pt x ~120pt

### Filter Toggle
- **Purpose**: Switch between global leaderboard and friends-only
- **Data source**: View state (local), triggers API reload
- **Visual treatment**: Minimal underline tab style. 16pt horizontal margins.
- **Content**:
  - "global" / "friends" — 14pt Sora Semibold
  - Active: White text, 2pt orange underline (#FF5E00), 4pt below text
  - Inactive: White at 50% text, no underline
  - Gap between labels: 24pt
- **Variants**: Global (default), Friends (requires community/rooms to populate)
- **Gestures**: Tap to switch filter
- **Size**: Auto-width x 32pt

### Leaderboard Rank Row
- **Purpose**: Individual user in the ranked list
- **Data source**: API — paginated leaderboard data
- **Visual treatment**: Rows within a continuous ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (72pt tall):
  - Rank number (left, 32pt wide area): 17pt Sora Bold, white. Top 3 use accent colors:
    - #1: Gold (#FFD700)
    - #2: Silver (#C0C0C0)
    - #3: Bronze (#CD7F32)
    - #4+: White
  - Avatar (12pt right of rank): 36pt circle, --r-pill. Placeholder: first initial on ink-brown-800 circle with white text.
  - Name (12pt right of avatar): 15pt Sora Semibold, white. Single line, truncated.
  - Level badge (right-aligned): "Lv. 23" — 12pt Sora Semibold. Pill: ink-900 bg, 1pt white 20% border, --r-pill, 22pt height, 6pt horizontal padding.
  - Second line (below name, left-aligned with name): XP (13pt Sora Regular, white at 50%, `tabular-nums`) + Top domain badge (Domain Tag Chip, 8pt right of XP)
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Top 3 (colored rank number, subtle glow behind rank), Regular (white rank), User's own row (if visible in list, orange left border accent 3pt)
- **Gestures**: Tap opens limited user profile (bottom sheet with avatar, name, level, top domains, streak)
- **Size**: Full-width minus 32pt x 72pt per row

### Leaderboard Type Tabs
- **Purpose**: Switch between global XP leaderboard, active competition leaderboards, and country-based rankings
- **Data source**: View state (local), triggers different API endpoints on switch. Leaderboard types from `leaderboard_type` enum: global, country, friends, competition.
- **Visual treatment**: Segmented control at the top of the screen, below the header. Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill. Three segments: "global" (default) / "competitions" / "country" (13pt Sora Semibold).
  - Active: Burnt orange fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Behavior**:
  - "global": Shows standard XP leaderboard with time filter and global/friends toggle (existing behavior)
  - "competitions": Shows a list of active competitions the user has joined, each as a mini-leaderboard card. Tapping a competition card navigates to Competitions [47] detail view. If no active competitions: "Join a competition to see rankings here" with CTA linking to Competitions [47].
  - "country": Shows rankings filtered to user's country (from timezone/profile). Same row format as global.
- **Gestures**: Tap segment to switch. Content crossfades (280ms).
- **Size**: Full-width minus 32pt × 40pt

### Competition Leaderboard Card (shown in "competitions" tab)
- **Purpose**: Mini-leaderboard for an individual competition the user has joined
- **Data source**: API — `/api/competitions/:id/leaderboard`, competition metadata
- **Visual treatment**: ink-brown-800 card, --r-md radius, 16pt padding. 16pt margins.
  - Header row: Competition name (15pt Sora Semibold, white) + status badge ("active" green pill, "ending soon" orange pill) + participant count (13pt Sora Regular, white at 50%)
  - Top 3 mini-rows: rank + avatar (24pt) + name + score (compact, 13pt). Gold/silver/bronze rank colors.
  - User's position: Highlighted row with orange left border (3pt), shows "You — #8 of 42"
  - "View full" link: right-aligned, 13pt Sora Regular, orange, navigates to Competitions [47]
- **Variants**: Active (countdown to end date), Ending soon (< 24hrs, orange pulse on badge), Ended (greyed, shows final position)
- **Gestures**: Tap card → navigate to Competition Detail [47] (stack push). Tap "view full" → same.
- **Size**: Full-width minus 32pt × ~160pt

### Limited User Profile (Bottom Sheet)
- **Purpose**: Quick view of another user's stats
- **Data source**: API — public profile data
- **Visual treatment**: Bottom sheet, ~40% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Avatar: 64pt, centered
  - Name: 20pt Sora Semibold, white, centered, 16pt below avatar
  - Level: "Level 23" — 14pt Sora Regular, white at 60%, centered
  - Top 3 domains: Row of Domain Tag Chips, centered, 16pt below level
  - Streak: Flame + count, centered, 12pt below domains
  - XP: "4,120 XP this month" — 14pt Regular, white at 50%, centered
  - **Overflow menu** (top-right of bottom sheet): Three-dot icon (20pt, white at 60%), 44x44pt touch target. Positioned 16pt from top edge, 16pt from right edge.
- **Gestures**: Drag to dismiss, tap outside to dismiss, tap overflow menu to open context menu

### Report/Block Context Menu (from Limited User Profile overflow)
- **Purpose**: Allow users to report or block another user from the leaderboard profile sheet
- **Trigger**: Tap the three-dot overflow menu icon in the top-right of the Limited User Profile bottom sheet
- **Visual treatment**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Appears below the overflow icon, right-aligned. 8pt vertical padding.
- **Content**:
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%. Full-width tap target.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336. Full-width tap target.
- **Behavior**:
  - Tap "Report": Dismisses context menu and Limited User Profile sheet, navigates to Report/Block flow [64] with user pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the Limited User Profile sheet (replaces sheet content below avatar/name).
- **Gestures**: Tap outside to dismiss context menu, tap row to act

### Block Confirmation (inline within Limited User Profile)
- **Purpose**: Confirm blocking a user from leaderboard context with a clear explanation of consequences
- **Trigger**: Tap "Block" in the Report/Block Context Menu
- **Visual treatment**: Replaces the bottom half of the Limited User Profile sheet content (below name). Centered layout, 24pt horizontal padding.
- **Content**:
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap between buttons):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg. 44pt touch target.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg. 44pt touch target.
- **Behavior**:
  - Tap "Block": Calls POST /api/users/:id/block, dismisses sheet, blocked user's row is removed from leaderboard with slide-out animation (280ms ease-out-soft). Toast: "user blocked" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard Limited User Profile content (crossfade, 280ms).

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Own rank card border | #FF5E00 at 40% | orange (primary) | "This is you" indicator |
| Segmented active fill | #FF5E00 | orange (primary) | Active time filter |
| Filter underline | #FF5E00 | orange (primary) | Active filter indicator |
| Rank #1 | #FFD700 | gold | Podium accent |
| Rank #2 | #C0C0C0 | silver | Podium accent |
| Rank #3 | #CD7F32 | bronze | Podium accent |
| Rank #4+ | #FFFFFF | white | Standard |
| Own row left border | #FF5E00 | orange (primary) | Row highlight in list |
| Level badge border | #FF5E00 (own) / white 20% (others) | — | Own card uses orange |
| Avatar placeholder bg | #FF5E00 | orange (primary) | Own avatar bg |
| Rank change ↑ | #34A853 | green (secondary) | Positive movement |
| Rank change ↓ | #FF5E00 | orange (primary) | Negative (not red — stays brand) |
| XP text | white at 70% (own) / white at 50% (others) | — | Tabular nums |
| Streak flame | #FF5E00 | orange (primary) | Streak emphasis |
| Domain tags (all 9) | Various at 15% bg | domain colors | Top domain badge |
| Primary text | #FFFFFF | white | Names, rank numbers |
| Secondary text | white at 60% | — | Streak text |
| Tertiary text | white at 50% | — | XP, metadata |

**60/30/10 verification**: Orange on segmented control, own rank card border, level badge, avatar placeholder, filter underline, flames, negative rank change. Green on positive rank movement only. No purple anywhere (leaderboard is user-driven social, not SIA-driven). Gold/silver/bronze are podium accents — they are a contained exception to the palette for leaderboard convention, appearing only on the rank number of the top 3. Domain colors on tag chips only. Ratio holds.

---

## Interaction States

### Segmented Time Filter
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 60% text | — |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill, white text | medium impact |

### User's Own Rank Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange 40% border | — |
| Pressed | Border brightens to orange 70%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer for rank, name, XP | — |

### Filter Toggle Tab
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | White 50% text, no underline | — |
| Pressed | White 70% text | light impact |
| Active | White text, orange underline | medium impact |

### Leaderboard Rank Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer per row | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | FlatList | Pull-to-refresh (reload rankings) |
| Tap | Segmented control | Switch time period |
| Tap | Own rank card | Navigate to RPG Character [19] |
| Tap | Filter toggle | Switch global/friends |
| Tap | Rank row | Open limited user profile sheet |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Scroll | FlatList | Scroll through rankings (own card pins if out of view) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: segmented control (0ms), own rank card (80ms), filter toggle (160ms), first 5 rank rows (80ms stagger each starting at 240ms) | 280ms each | ease-out-soft |
| Segmented control | Tap | Active indicator slides horizontally | 280ms | ease-out-soft |
| Rank data | Time filter change | Rank rows crossfade (old rows opacity 1→0, new rows opacity 0→1 with translateY 8→0) | 280ms | ease-out-soft |
| Own rank card sticky | Scroll past threshold | Card position transitions from inline to pinned (opacity 0→1 at top, original position fades out) | 280ms | ease-out-soft |
| Rank change | Data refresh | ↑/↓ indicator slides in from left, count animates | 280ms | ease-out-soft |
| User profile sheet | Row tap | Bottom sheet slides up | 520ms | ease-out-soft |
| Rank rows | Pull-to-refresh | Rows fade out, new data fades in with stagger | 280ms each | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push
- **Exit**: Stack pop

---

## Empty States

### Day 1 (new user, no community)
- Own rank card: Shows user at "#1" with 0 XP, Lv. 1. Rank change: "—" (no previous data). This is technically accurate — the user is #1 on their own leaderboard.
- Global tab: Shows a small set of seed/example users (or the user alone). Text below: "rankings get better as the community grows. invite friends to see where you stand."
- Friends tab: Empty — "no friends yet. create or join a community room to connect." with tappable "find communities" link (navigates to Community [40]).
- Heatmap/analytics: N/A for leaderboard.

### Established user (zero state — friends tab empty)
- Global tab: Populated normally.
- Friends tab: "no friends on the leaderboard. invite them from your community rooms." Link to Community [40].

---

## Motivation Adaptation

- **Low motivation**: Rank is de-emphasized (shown smaller). Focus shifts to personal progress: "you completed 5 more habits than last week" replaces the competitive framing. Leaderboard list still visible but the own rank card leads with positive personal metrics rather than rank number.
- **Medium motivation**: Standard experience as described. Rank is visible and motivating.
- **High motivation**: Additional stats appear on own rank card: "top 5% this month", weekly XP trend sparkline, domain-by-domain skill levels. Rank rows show more detail: XP breakdown, longest streak. "Competitions" tab shows extended stats per competition (daily score trend, best day, predicted final rank).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Leaderboard") | Sora | Semibold (600) | 17pt | 22pt | white |
| Segmented control labels | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 60% (inactive) |
| Own rank number | Sora | Bold (700) | 24pt | 32pt | white (or gold/silver/bronze for top 3) |
| Own rank change text | Sora | Semibold (600) | 13pt | 18pt | green #34A853 (up) / orange #FF5E00 (down) / white at 40% (same) |
| Own user name | Sora | Semibold (600) | 16pt | 22pt | white |
| Own level badge | Sora | Semibold (600) | 13pt | 18pt | orange on ink-900 |
| Own XP text | Sora | Regular (400) | 14pt | 20pt | white at 70% |
| Own streak text | Sora | Regular (400) | 13pt | 18pt | white at 60% |
| Filter toggle labels | Sora | Semibold (600) | 14pt | 20pt | white (active) / white at 50% (inactive) |
| Rank row number (#4+) | Sora | Bold (700) | 17pt | 22pt | white |
| Rank row name | Sora | Semibold (600) | 15pt | 20pt | white |
| Rank row level badge | Sora | Semibold (600) | 12pt | 16pt | white on ink-900 |
| Rank row XP | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Domain tag chip text | Sora | Semibold (600) | 11pt | 16pt | domain color |
| Leaderboard type tabs | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 60% (inactive) |
| Competition card name | Sora | Semibold (600) | 15pt | 20pt | white |
| Competition participant count | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Competition "view full" link | Sora | Regular (400) | 13pt | 18pt | orange #FF5E00 |
| Limited profile name | Sora | Semibold (600) | 20pt | 28pt | white |
| Limited profile level | Sora | Regular (400) | 14pt | 20pt | white at 60% |
| Limited profile XP | Sora | Regular (400) | 14pt | 20pt | white at 50% |
| Block confirmation heading | Sora | Semibold (600) | 17pt | 22pt | white |
| Block confirmation body | Sora | Regular (400) | 14pt | 20pt | white at 50% |
| Block/cancel button text | Sora | Semibold (600) | 15pt | 20pt | #F44336 (block) / white at 50% (cancel) |
| Report/block menu text | Sora | Regular (400) | 15pt | 20pt | white at 80% (report) / #F44336 (block) |
| Empty state message | Sora | Regular (400) | 15pt | 22pt | white at 40% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Leaderboard data fails to load | Skeleton shimmer on rank rows persists 5s, then inline error: "couldn't load rankings" with retry button | Tap "retry" re-fetches; pull-to-refresh also retries |
| Own rank card fails to load | Card shows skeleton shimmer then fallback: "rank unavailable" in white at 40% | Pull-to-refresh to retry |
| Time filter change fails | Previous time range data remains visible; toast: "couldn't update rankings. try again." | Tap the segment again to retry |
| Friends tab empty (no friends) | Empty state: "no friends on the leaderboard. invite them from your community rooms." with link to Community [40] | Tap link to navigate to Community |
| User profile sheet fails to load | Bottom sheet shows spinner for 3s, then: "couldn't load profile" with dismiss option | Dismiss sheet; tap rank row again to retry |
| Block user fails | Block confirmation sheet dismisses; toast: "couldn't block user. try again." | Re-open profile sheet and retry block |
| Report user fails | Report flow shows inline error: "report failed. try again." | Tap "report" again to retry |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull-to-refresh again |
| Competition data fails to load | "competitions" tab shows: "couldn't load competitions" with retry link | Tap retry or switch tab and back |
| Offline state | Banner at top: "you're offline -- showing cached rankings" (ink-brown-800 bg, white at 60% text) | Rankings update automatically on reconnection |

---

## Accessibility

- Screen title "Leaderboard" announced on focus via VoiceOver
- Leaderboard type tabs announce: "Global tab, selected" / "Competitions tab" / "Country tab"
- Segmented time filter announces: "Time filter: This week, selected" / "This month" / "All time"
- Own rank card announces: "Your rank: number [N], [name], level [N], [XP] XP, [streak] day streak, [rank change] from last period"
- Filter toggle announces: "Global rankings, selected" / "Friends rankings"
- Each rank row announces: "Rank [N], [name], level [N], [XP] XP, top domain [domain name]"
- Top 3 rank rows include podium position: "First place, gold" / "Second place, silver" / "Third place, bronze"
- Limited user profile sheet traps focus on open; announces "Profile: [name], level [N]"
- Report/block context menu items announce their action: "Report user" / "Block user"
- Block confirmation announces: "Block [name]? They won't be able to see you on leaderboards."
- All touch targets meet 44x44pt minimum
- Focus order: back button -> leaderboard type tabs -> time filter -> own rank card -> filter toggle -> rank rows (top to bottom)
- Gesture alternatives: swipe-right-from-edge replaces back button; VoiceOver custom actions on rank rows provide "View profile" action

---

## Cross-References

- **Navigates to**: Screen [19] — RPG Character (via own rank card tap, stack push), Screen [47] — Competitions (via competition leaderboard card tap or "join a competition" CTA, stack push), User Profile Bottom Sheet (from rank row tap — shows avatar, level, top domains, "message" and "invite" CTAs per _shared-patterns.md), Screen [40] — Community (via "find communities" link in empty state, or via "message" action in User Profile Bottom Sheet which creates/opens a private room), Screen [64] — Report/Block (via overflow menu "report" in Limited User Profile sheet)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link), Screen [47] — Competitions (via "view leaderboard" link)
- **Shared components with**: Screen [38] — Habits (Segmented Control, XP/RPG elements, Domain Tag Chip), Screen [19] — RPG Character (Level Badge, XP display), Screen [47] — Competitions (Competition Leaderboard Card, podium colors, rank row format)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 38), Domain Tag Chip (Screen 37), Modal Presentation (user profile bottom sheet)
- **Patterns established**: User Rank Card (highlighted own-position with orange border), Leaderboard Rank Row (rank + avatar + name + level + XP + domain badge), Level Badge ("Lv. N" pill), Filter Toggle (underline tab style), Podium Accent Colors (gold/silver/bronze for top 3), Sticky Rank Card (pins when user scrolls past own position), Leaderboard Type Tabs (global/competitions/country segmented control), Competition Leaderboard Card (mini-leaderboard within competitions tab with top 3 + user position)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/leaderboard`
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
| B13-F04 | major | information-architecture | Implement leaderboard type, time-period, country, global/friends state, and loading/empty/error behavior. |
| B13-F05 | major | trust-privacy | Make rank rows semantic buttons that open limited profiles with report/block and clear public-data boundaries. |
| B13-F06 | major | accessibility | Expand hit areas to 44px, expose selected/pressed state, and make shared back semantic. |

### Prototype Implications

- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

