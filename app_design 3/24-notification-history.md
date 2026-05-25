# Screen Design: Notification History

**Screen**: 24 of 73
**File**: 24-notification-history.md
**Register**: Product Mode
**Primary action**: Tap a notification to navigate to its relevant screen
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root. Pushed from Me Main [17] quick link grid. Back button returns to Me Main.

---

## Purpose

The Notification History screen is a scrollable log of past notifications grouped by date. It exists so users can revisit SIA insights, missed reminders, and check-in prompts they may have dismissed from the lock screen. This is a minimal feature — not a primary experience — so the design is simple and functional. Each notification is a tap target that deep-links to the relevant screen (SIA chat for insights, Goal Detail for goal reminders, Home for check-ins). The screen also serves as a signal of SIA's activity — seeing a trail of personalized notifications reinforces that SIA is actively working for the user.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen title "notifications" — orientation
2. "Mark all as read" action — top-right utility action
3. Date group headers — temporal orientation (Today, Yesterday, This week, Earlier)
4. Notification rows — the content, each with category icon, title, preview, timestamp, read/unread indicator
5. Unread indicators — orange dots drawing attention to unseen items

**User flow**:
- **Arrives from**: Me Main [17] via stack push (quick link grid, possibly with unread badge count)
- **Primary exit**: Relevant screen per notification type (tap notification → SIA Chat [09], Goal Detail [14], Home Screen [12], etc.)
- **Secondary exits**: Me Main [17] via stack pop (back button)

---

## Layout

**Scroll behavior**: FlatList with SectionList-style date group headers (sticky headers on scroll)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]  Notifications  [Mark] │  ← nav header, 44pt
├─────────────────────────────┤
│                             │
│  TODAY                      │  ← sticky date header
│                             │
│  ┌─────────────────────────┐│
│  │ ● [🧠] SIA insight      ││  ← unread, purple icon
│  │    Your sleep and       ││     preview text
│  │    spending are conn... ││
│  │                  2h ago ││     timestamp
│  ├─────────────────────────┤│
│  │   [🔔] Reminder         ││  ← read, orange icon
│  │    Don't forget your    ││
│  │    morning walk         ││
│  │                  6h ago ││
│  ├─────────────────────────┤│
│  │ ● [📊] Check-in         ││  ← unread, green icon
│  │    How are you feeling  ││
│  │    this morning?        ││
│  │                  8h ago ││
│  └─────────────────────────┘│
│                             │
│  YESTERDAY                  │  ← sticky date header
│                             │
│  ┌─────────────────────────┐│
│  │   [🧠] SIA insight      ││
│  │    Great workout        ││
│  │    consistency this...  ││
│  │                   1d    ││
│  ├─────────────────────────┤│
│  │   [👥] Social            ││
│  │    Alex completed a     ││
│  │    fitness quest        ││
│  │                   1d    ││
│  └─────────────────────────┘│
│                             │
│  THIS WEEK                  │  ← sticky date header
│  ┌─────────────────────────┐│
│  │   [🔔] Reminder         ││
│  │    Your budget review   ││
│  │    is due               ││
│  │                   3d    ││
│  └─────────────────────────┘│
│                             │
│         (end of list)       │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification, back navigation, mark-all-read action
   - Content: Back chevron (left), "Notifications" title (center), "Mark all read" text button (right)

2. **Date Group Headers** — 32pt each (sticky)
   - Purpose: Temporal grouping of notifications
   - Content: Date label (Today / Yesterday / This week / Earlier / specific date)

3. **Notification Rows** — 80pt each
   - Purpose: Individual notification with tap-to-navigate
   - Content: Unread dot, category icon, title, preview text, timestamp

---

## Components

### Navigation Header — With Action
- **Purpose**: Standard header with an additional right-side action
- **Data source**: Static (title), computed (action availability — disabled when all read)
- **Visual treatment**: Same as standard Navigation Header. Right action: "Mark all read" in 13pt Sora Semibold, Burnt Orange (#FF5E00). Disabled state: white at 30% (when no unread notifications).
- **Variants**: Has unread (action active, orange text), all read (action disabled, faded)
- **Gestures**: Left: back tap/swipe. Right: "mark all read" tap.
- **Size**: Full-width × 44pt

### Date Group Header (Sticky)
- **Purpose**: Groups notifications by time period
- **Data source**: Computed from notification timestamps
- **Visual treatment**: Eyebrow text pattern (12pt Sora Semibold, uppercase, white at 50%, +0.12em tracking). Background: ink-900 (becomes opaque when sticky to occlude content scrolling beneath). 16pt horizontal padding, 12pt vertical padding.
- **Variants**: Today, Yesterday, This week, Earlier, or specific date (e.g., "MAY 12")
- **Gestures**: None
- **Size**: Full-width × 32pt (sticky on scroll, z-30 with backdrop-blur when stuck)

### Notification Row
- **Purpose**: Single notification entry with deep-link navigation
- **Data source**: Notifications API (category, title, body, timestamp, read status, deep-link target)
- **Visual treatment**: Full-width row, ink-brown-800 background within section group container. 1pt bottom divider (white at 5%) between rows within the same date group.
- **Variants**: Unread (orange dot, slightly bolder text), read (no dot, standard text weight)
- **Gestures**: Tap → navigate to relevant screen
- **Size**: Full-width × 80pt

#### Notification Row — Internal Layout
- **Unread indicator**: 8pt circle, Burnt Orange (#FF5E00), left edge of row, vertically centered. Hidden when read.
- **Category icon**: 24pt × 24pt, themed by category:
  - SIA insights: brain icon, #7F24FF (purple) — this is the SIA indicator
  - Reminders: bell icon, #FF5E00 (orange)
  - Check-ins: chart-bar icon, #34A853 (green)
  - Social: people icon, white at 60%
- **Icon position**: 36pt from left (after unread dot space)
- **Content area**: To the right of icon, 12pt gap
  - Title: 15pt Sora Semibold, white (unread) or white at 80% (read). Single line, truncated with ellipsis.
  - Preview: 13pt Sora Regular, white at 50%. Max 2 lines, truncated with ellipsis.
- **Timestamp**: Right-aligned, vertically centered with title. 12pt Sora Regular, white at 40%. Relative format: "2m ago", "1h ago", "6h ago", "1d", "3d", "May 12".
- **Padding**: 16pt horizontal (content area), 12pt vertical.

### Section Group Container (for notification rows)
- **Purpose**: Groups rows within a date section
- **Data source**: N/A (structural)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Rows stack inside with dividers.
- **Variants**: N/A
- **Gestures**: N/A
- **Size**: Full-width minus 32pt (16pt margins) × auto

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Row surface | #211008 | ink-brown-800 | z-10, within section group |
| Row divider | white at 5% | — | Between rows in same group |
| Unread dot | #FF5E00 | burnt-orange | 60% role — attention indicator |
| SIA insight icon | #7F24FF | purple | 10% role — SIA category |
| Reminder icon | #FF5E00 | burnt-orange | 60% role — action category |
| Check-in icon | #34A853 | forest-green | 30% role — engagement category |
| Social icon | white at 60% | — | Neutral category |
| Notification title (unread) | white 100% | — | High priority text |
| Notification title (read) | white at 80% | — | Reduced emphasis |
| Preview text | white at 50% | — | Secondary text |
| Timestamp | white at 40% | — | Tertiary text |
| Date group header | white at 50% | — | Eyebrow label |
| Mark all read (active) | #FF5E00 | burnt-orange | Action link |
| Mark all read (disabled) | white at 30% | — | No unread items |
| Sticky header bg | #0A0A0F at 95% | ink-900 | Backdrop-blur when sticky |

**60/30/10 verification**: Orange appears on unread dots (drawing attention to new items), reminder category icons, and the "mark all read" action — correctly dominating the accent space. Green appears on check-in category icons — secondary accent. Purple appears on SIA insight category icons — minimal, correctly marking AI-originated notifications. The ratio holds: orange for attention/action, green for engagement, purple for SIA origin.

---

## Interaction States

### Notification Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unread) | ink-brown-800 bg, orange dot visible, title at full white | — |
| Default (read) | ink-brown-800 bg, no dot, title at 80% white | — |
| Pressed | Background darkens to ink-900, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring inset on row | — |
| Disabled | N/A (rows are always tappable) | — |
| Loading | N/A (navigation is instant, target screen loads its own content) | — |
| Error | N/A | — |
| Success | N/A | — |

### Mark All Read Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (has unread) | #FF5E00 text, "Mark all read" | — |
| Default (no unread) | white at 30% text, disabled | — |
| Pressed | Text at 60% opacity, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring around text bounds | — |
| Disabled | white at 30%, no touch response | — |
| Loading | Text replaced with tiny spinner (12pt, orange) | — |
| Error | N/A (marking as read is a local operation, unlikely to fail) | — |
| Success | All unread dots fade out simultaneously (280ms) | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Notification row | Navigate to relevant screen (deep-link) |
| Tap | Mark all read | Mark all notifications as read |
| Swipe right from edge | Screen | Stack pop to Me Main [17] |
| Pull-to-refresh | FlatList | Refresh notification list from API |
| Scroll | Content area | Vertical scroll through grouped notifications |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Notification rows | Screen enter | Staggered fade-in + translateY(8pt→0) | 280ms per row, 40ms stagger (fast, since many rows) | ease-out-soft |
| Unread dots | Mark all read | Simultaneous fade-out (opacity 1→0) | 280ms | ease-out-soft |
| Unread dot (single) | Tap row (marks as read) | Fade-out + scale(1→0) | 160ms | ease-out-soft |
| Title weight | Read state change | Font weight crossfade (Semibold → Regular is subtle, no animation needed — instant) | — | — |
| Pull-to-refresh | Pull gesture | Standard iOS refresh indicator | N/A | iOS default |
| Sticky header | Scroll threshold | Fade-in backdrop-blur when stuck | 160ms | ease-out-soft |
| New notification | Push received while on screen | New row slides in from top with fade-in | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right (back) or stack push to right (deep-link navigate to target screen), 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user — no notifications yet)
Centered vertically in content area:
- Bell icon: 48pt, white at 20%, center-aligned
- Heading: "No notifications yet" — 18pt Sora Semibold, white at 60%, center-aligned
- SIA message: "I'll start reaching out once I get to know you better" — 15pt Sora Regular, white at 40%, center-aligned, max 240pt width
- Purple dot (6pt, #7F24FF) left of SIA message as SIA indicator
- No pull-to-refresh (nothing to refresh)

The empty state feels warm, not broken. SIA's voice fills the void with a promise of future engagement.

### Established user (zero unread)
All notifications show in "read" state (no orange dots). "Mark all read" action is disabled (white at 30%). Content is otherwise identical to the populated state. The lack of dots is the visual difference.

---

## Motivation Adaptation

- **Low motivation**: Fewer notifications in history (system sends max 1/day). The list is shorter, but the screen design is identical.
- **Medium motivation**: Default experience (2-3 notifications/day).
- **High motivation**: More notifications in history (up to 5+/day). List is longer, more varied categories. Design is identical — FlatList handles any length.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Mark all read action (active) | Sora | Semibold | 13pt | 18pt | #FF5E00 |
| Mark all read action (disabled) | Sora | Semibold | 13pt | 18pt | white at 30% |
| Date group header | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| Notification title (unread) | Sora | Semibold | 15pt | 20pt | white 100% |
| Notification title (read) | Sora | Regular | 15pt | 20pt | white at 80% |
| Notification preview | Sora | Regular | 13pt | 18pt | white at 50% |
| Timestamp | Sora | Regular | 12pt | 16pt | white at 40% |
| Empty state heading | Sora | Semibold | 18pt | 24pt | white at 60% |
| Empty state SIA message | Sora | Regular | 15pt | 22pt | white at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Notification list fails to load | Skeleton shimmer on rows, then "Could not load notifications. Pull to refresh." centered text | Pull-to-refresh to retry |
| Mark all read fails | Tiny spinner on action text replaces with original text; toast: "Could not mark as read." (3s) | User retries tap on "Mark all read" |
| Deep-link target screen unavailable | Notification row navigates but target screen shows its own error state | Target screen handles recovery |
| Pull-to-refresh fails | Standard iOS refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls to refresh again |
| New push notification received while on screen | New row slides in from top with fade-in animation | None needed — automatic |
| Individual notification read-status sync fails | Local state updates immediately (optimistic); silent background retry | Auto-retry; reverts if sync ultimately fails |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Me Main"
- Mark all read: "Mark all notifications as read, button" / "Mark all read, disabled, all notifications already read"
- Date group headers: Announced as section headings (e.g., "Today, section")
- Notification rows: "[Unread/Read], [Category] notification, [Title], [Preview text], [Timestamp], button"
- Unread indicator dot: Conveyed via "Unread" prefix on row label (not announced separately)
- Category icons: "[Category name] icon" (e.g., "SIA insight icon", "Reminder icon")
- Empty state: "No notifications yet. SIA says: I'll start reaching out once I get to know you better."

**Focus order:**
1. Back button
2. "Mark all read" action
3. Date group headers → notification rows within each group (Today, Yesterday, This Week, Earlier)
4. Each notification row in chronological order within its group

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Pull-to-refresh available for updating notification list
- All notification rows meet 44pt minimum touch target (80pt row height)
- Sticky date headers remain visible for orientation during scroll
- VoiceOver announces read/unread status without relying on visual dot indicator

---

## Cross-References

- **Navigates to**: SIA Chat [09] via tab switch (SIA insight notifications), Goal Detail [14] via stack push (goal reminders), Home Screen [12] via tab switch (check-in prompts), Community [40] via tab switch (social notifications), various screens per notification deep-link
- **Navigates from**: Me Main [17] via stack push (quick link grid, possibly with unread count badge)
- **Shared components with**: Settings [21] (Section Header, Navigation Header, Section Group Container), Help Center [25] (Section Group Container)
- **Patterns used**: Back Button (Batch 1), Section Header (Batch 5), Section Group Container (Batch 5)
- **Patterns established**: Notification Row (with unread/read variants), Date Group Header (sticky, with backdrop-blur), Header Action Button ("mark all read" right-side action), Notification Category Icons (SIA = purple brain, Reminder = orange bell, Check-in = green chart, Social = neutral people), Notification Empty State (with SIA promise message)
