# Screen Design: Connected Services

**Screen**: 22 of 43
**File**: 22-connected-services.md
**Register**: Product Mode
**Primary action**: Connect a service (tap "connect" on an integration card)
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (or depth 2 if navigated via Settings [21]). Pushed from Me Main [17] quick link grid or Settings [21] "connected services" row. Back button returns to previous screen.

---

## Purpose

The Connected Services screen lets users manage external integrations that feed data into Balencia's life-correlation engine. Each connected service enriches SIA's understanding — WHOOP provides sleep and recovery data, Google Calendar provides schedule context, Spotify provides mood signals. The screen must make the value of connecting clear while keeping the management simple: connect, see status, disconnect. Integration data is silently woven into SIA's coaching — this screen is the only place the user explicitly sees and controls those data pipelines.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen title "connected services" — orientation
2. SIA coaching note — explains why connecting matters (prominent on first visit, subtle once services are connected)
3. Integration cards — the primary content, one per available service
4. Each card's connection status — immediately scannable (connected = green badge, not connected = neutral)
5. Sync details — last sync time, what data is syncing (secondary info on connected services)
6. Action buttons — connect/disconnect per card

**User flow**:
- **Arrives from**: Me Main [17] via stack push (quick link grid) or Settings [21] via stack push ("connected services" row)
- **Primary exit**: Previous screen via stack pop (back button)
- **Secondary exits**: External OAuth flows (system browser or in-app browser for service authorization), force sync (stays on screen, inline loading state)

---

## Layout

**Scroll behavior**: ScrollView (4 integration cards + header content fits with scroll on smaller devices)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [←]   Connected services   │  ← nav header, 44pt
├─────────────────────────────┤
│                             │  ← 16pt top padding
│  ┌───────────────────────┐  │
│  │ ● Connecting your     │  │  ← SIA note card
│  │   services helps SIA  │  │     purple dot + 13pt text
│  │   understand your     │  │
│  │   full picture         │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  AVAILABLE SERVICES         │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ [W]  WHOOP            │  │  ← integration card
│  │      ● Connected      │  │     status badge
│  │                       │  │
│  │  Syncing: sleep, HRV, │  │     sync details
│  │  recovery             │  │
│  │  Last sync: 2m ago    │  │
│  │                       │  │
│  │  [Force sync] [Disconnect]│ ← action buttons
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ [G]  Google Calendar   │  │  ← integration card
│  │      ○ Not connected  │  │
│  │                       │  │
│  │  Events, schedule,    │  │     data description
│  │  availability         │  │
│  │                       │  │
│  │        [Connect]      │  │  ← single action button
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ [S]  Spotify           │  │
│  │      ○ Not connected  │  │
│  │                       │  │
│  │  Listening data,      │  │
│  │  mood signals         │  │
│  │                       │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │
│                             │  ← 16pt gap
│  ┌───────────────────────┐  │
│  │ [♥]  Apple Health      │  │
│  │      ○ Coming soon    │  │
│  │                       │  │
│  │  Steps, activity,     │  │
│  │  health metrics       │  │
│  │                       │  │
│  │       [Notify me]     │  │  ← disabled/future
│  └───────────────────────┘  │
│                             │  ← 48pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Purpose: Screen identification and back navigation
   - Content: Back chevron (left), "Connected services" title (center)

2. **SIA Coaching Note Card** — ~72pt
   - Purpose: Explain the value of connecting services
   - Content: Purple dot + coaching message about data enrichment

3. **Section Header** — 32pt
   - Purpose: Label the integration list
   - Content: "AVAILABLE SERVICES" eyebrow

4. **Integration Cards** — ~180pt each × 4 cards
   - Purpose: One card per available integration, showing status and actions
   - Content: Service icon, name, status badge, sync details (if connected), data description (if not connected), action buttons

---

## Components

### SIA Coaching Note Card
- **Purpose**: Contextual message explaining why integrations matter
- **Data source**: Static (may adapt after first connection: "WHOOP connected — SIA can now factor in your recovery")
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Purple dot (6pt, #7F24FF) top-left of text block. Text: 13pt Sora Regular, white at 60%. Padding: 16pt all sides.
- **Variants**: No services connected (motivational: "Connect your apps so SIA can see the full picture — sleep, workouts, calendar, and more."), 1+ services connected (status confirmation: "WHOOP connected — SIA can now factor in your recovery scores."), all connected (celebratory: "All your services are syncing. SIA can see the full picture now.")
- **Gestures**: None
- **Size**: Full-width minus 32pt (16pt margins) × auto

### Integration Card
- **Purpose**: Represents one external service with its connection state and controls
- **Data source**: Connected services API (status, last sync, syncing data types)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Internal layout is vertical stack with horizontal rows.
- **Variants**: Connected, not connected, coming soon (disabled)
- **Gestures**: Tap card body → expand/collapse details (optional), tap action buttons
- **Size**: Full-width minus 32pt (16pt margins) × ~180pt (connected) / ~160pt (not connected)

#### Integration Card — Internal Layout

**Row 1: Identity (service icon + name + status badge)**
- Service icon: 32pt × 32pt, full-color logo, left-aligned
- Service name: 16pt Sora Semibold, white, left of badge
- Status badge: pill shape, right-aligned
  - Connected: Forest Green (#34A853) fill at 15%, green text (#34A853), 11pt Sora Semibold
  - Not connected: white at 10% fill, white at 50% text, 11pt Sora Semibold
  - Coming soon: white at 5% fill, white at 30% text, 11pt Sora Semibold
- Row height: 48pt, 16pt horizontal padding

**Row 2: Details**
- Connected state: "Syncing: [data types]" + "Last sync: [time]" — 13pt Sora Regular, white at 50%
- Not connected state: Data description ("Events, schedule, availability") — 13pt Sora Regular, white at 50%
- Coming soon state: Data description — 13pt Sora Regular, white at 30%
- Padding: 0pt top (tight to identity row), 16pt horizontal

**Row 3: Actions**
- Connected: Two buttons side-by-side with 12pt gap
  - "Force sync" — ghost button (transparent bg, 1pt border white at 10%, white text, --r-pill)
  - "Disconnect" — ghost button (transparent bg, 1pt border white at 10%, #f44336 red text, --r-pill)
  - Both: 36pt height, 15pt Sora Semibold, sentence case
- Not connected: Single button centered
  - "Connect" — Burnt Orange (#FF5E00) fill, white text, --r-pill, 36pt height, 15pt Sora Semibold
- Coming soon: Single button centered
  - "Notify me" — ghost button, white at 30% text, 0.5 opacity, disabled
- Padding: 16pt all sides

### Status Badge
- **Purpose**: Immediately communicates connection state
- **Data source**: Connected services API
- **Visual treatment**: Pill shape (--r-pill), 24pt × auto width, 4pt horizontal padding + 2pt vertical
- **Variants**: Connected (green), not connected (neutral), coming soon (faded)
- **Gestures**: None (decorative)
- **Size**: Auto-width × 20pt

### Disconnect Confirmation (Alert)
- Native iOS alert: "Disconnect [service name]?" / "SIA will no longer receive [data type] data. You can reconnect at any time." / [Cancel] [Disconnect]
- "Disconnect" button is destructive style (red text)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Card surface | #211008 | ink-brown-800 | z-10, card background |
| Card border | white at 5% | — | Subtle edge definition |
| Service name | white 100% | — | Primary text |
| Sync details | white at 50% | — | Secondary text |
| Connected badge bg | #34A853 at 15% | forest-green | Subtle green wash |
| Connected badge text | #34A853 | forest-green | 30% role — success state |
| Not connected badge bg | white at 10% | — | Neutral |
| Not connected badge text | white at 50% | — | Neutral |
| Connect button bg | #FF5E00 | burnt-orange | 60% role — primary CTA |
| Connect button text | white 100% | — | CTA label |
| Force sync button border | white at 10% | — | Ghost button edge |
| Disconnect text | #f44336 | red | Destructive action |
| SIA note dot | #7F24FF | purple | 10% role — SIA indicator |
| SIA note text | white at 60% | — | Coaching message |
| Section header | white at 50% | — | Eyebrow label |
| Coming soon text | white at 30% | — | Disabled/future state |

**60/30/10 verification**: Orange appears on the "Connect" CTA buttons (1-3 visible depending on connection state) — the primary accent driving action. Green appears on connected status badges (up to 4 if all connected) — secondary accent confirming success. Purple appears once on the SIA coaching note dot. Ratio holds: orange dominates action elements, green indicates status, purple marks SIA presence.

---

## Interaction States

### Connect Button (Primary CTA)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 fill, white text | — |
| Pressed | Darker orange + scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (used during another connection flow) | — |
| Loading | White spinner replaces text, button stays orange | — |
| Error | Button flashes red border, error text below card ("Connection failed. Try again.") | error notification |
| Success | Button morphs to green (#34A853) with checkmark icon, then card transitions to connected state | success notification |

### Force Sync Button (Ghost)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, white text | — |
| Pressed | Background white at 5%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (during active sync) | — |
| Loading | Text replaced with small spinner, border stays | — |
| Error | Text turns red, "Sync failed" replaces text for 3s | error notification |
| Success | Text turns green, "Synced" replaces text for 2s, then "Last sync: just now" updates | success notification |

### Disconnect Button (Ghost Destructive)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, #f44336 text | — |
| Pressed | Background red at 5%, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Text replaced with red spinner (disconnecting in progress) | — |
| Error | Error text below card ("Could not disconnect. Try again.") | error notification |
| Success | Card transitions to "not connected" state with crossfade | success notification |

### Integration Card (Body)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 surface, standard border | — |
| Pressed | Very subtle background darken (not a primary tap target — buttons are) | — |
| Focus-visible | 2pt orange ring around card | — |
| Disabled | N/A (cards are always interactive via their buttons) | — |
| Loading | Skeleton shimmer on sync details area | — |
| Error | N/A (errors appear on buttons, not cards) | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Connect button | Initiate OAuth flow in system browser |
| Tap | Force sync button | Trigger manual data sync |
| Tap | Disconnect button | Show disconnect confirmation alert |
| Tap | Notify me button | Register for availability notification (future) |
| Swipe right from edge | Screen | Stack pop to previous screen |
| Pull-to-refresh | ScrollView | Refresh all integration statuses |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Integration cards | Screen enter | Staggered fade-in + translateY(12pt→0) | 280ms per card, 80ms stagger | ease-out-soft |
| Connect → Connected | OAuth success | Button morphs green (280ms), then card content crossfades to connected state (280ms) | 560ms total | ease-out-soft |
| Disconnect → Not connected | Confirmation accepted | Card content crossfades: sync details → data description, badge → "not connected", buttons change | 280ms | ease-out-soft |
| Force sync spinner | Sync trigger | Inline spinner rotation, continuous | N/A | linear |
| Pull-to-refresh | Pull gesture | Standard iOS refresh control + cards skeleton shimmer | 280ms shimmer cycle | ease-out-soft |
| Status badge | State change | Color crossfade | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit**: Stack pop to right, 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user — no services connected)
All 4 integration cards appear with "not connected" state. The SIA coaching note is prominent at the top: "Connecting your services helps SIA understand your full picture — your sleep, your schedule, your mood." Each card's data description explains what that service provides. The "Connect" CTAs are orange and prominent, inviting action. The screen never feels empty because all available services are always shown — the empty state IS the default state, just without sync details.

### Established user (all connected)
SIA note adapts: "All services connected — SIA has your full picture." All cards show green "connected" badges, sync details, and force sync / disconnect buttons. Pull-to-refresh updates sync times.

---

## Motivation Adaptation

- **Low motivation**: No changes — integration management is a utility action unaffected by motivation tier
- **Medium motivation**: Default experience
- **High motivation**: No changes — same controls regardless of motivation

---

## Cross-References

- **Navigates to**: Previous screen (Me Main [17] or Settings [21]) via stack pop, external OAuth flows (system browser), disconnect confirmation (native alert)
- **Navigates from**: Me Main [17] via stack push (quick link grid), Settings [21] via stack push ("connected services" row)
- **Shared components with**: Settings [21] (Section Header, Navigation Header), Subscription & Billing [23] (Status Badge pattern)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1 — adapted to 36pt for card-internal use), Section Header (Batch 5), SIA Note (Batch 5)
- **Patterns established**: Integration Card (with 3 variants: connected, not connected, coming soon), Status Badge (connected/not-connected/coming-soon), Disconnect Confirmation Alert, Ghost Button — Destructive variant, Force Sync inline loading pattern
