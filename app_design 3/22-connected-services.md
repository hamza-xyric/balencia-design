# Screen Design: Connected Services

**Screen**: 22 of 73
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

**Scroll behavior**: ScrollView (12 integration cards organized in 4 sections — requires scroll on all devices)
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
│  WEARABLES & FITNESS        │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ [W]  WHOOP            │  │  ← integration card
│  │      ● Connected      │  │     status badge (green)
│  │  Syncing: sleep, HRV, │  │     sync details
│  │  recovery, strain     │  │
│  │  Last sync: 2m ago    │  │
│  │  [Force sync] [Disconnect]│
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [♥]  Apple Health      │  │
│  │      ○ Not connected  │  │
│  │  Steps, workouts,     │  │
│  │  sleep, heart rate    │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [F]  Fitbit            │  │
│  │      ○ Not connected  │  │
│  │  Steps, sleep, HR,    │  │
│  │  workouts, calories   │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [G]  Garmin            │  │
│  │      ○ Not connected  │  │
│  │  Activities, HR, GPS, │  │
│  │  sleep, VO2 Max       │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [O]  Oura Ring         │  │
│  │      ○ Not connected  │  │
│  │  Sleep, readiness,    │  │
│  │  HRV, body temp       │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [S]  Samsung Health    │  │
│  │      ○ Not connected  │  │
│  │  Steps, sleep, HR,    │  │
│  │  workouts             │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [St] Strava            │  │
│  │      ○ Not connected  │  │
│  │  GPS activities,      │  │
│  │  training load        │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  NUTRITION                  │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ [M]  MyFitnessPal     │  │
│  │      ○ Not connected  │  │
│  │  Calories, macros,    │  │
│  │  meal logging         │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [N]  Nutritionix       │  │
│  │      ○ Not connected  │  │
│  │  Food database,       │  │
│  │  nutrition data       │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ [C]  Cronometer        │  │
│  │      ○ Not connected  │  │
│  │  Detailed nutrition,  │  │
│  │  micronutrients       │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  PRODUCTIVITY               │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ [Cal] Google Calendar  │  │  ← integration card
│  │      ○ Not connected  │  │
│  │  Events, schedule,    │  │
│  │  availability         │  │
│  │        [Connect]      │  │
│  └───────────────────────┘  │
│                             │  ← 24pt gap
│  LIFESTYLE                  │  ← section header
│                             │
│  ┌───────────────────────┐  │
│  │ [Sp] Spotify           │  │
│  │      ○ Not connected  │  │
│  │  Listening data,      │  │
│  │  mood signals         │  │
│  │        [Connect]      │  │
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

3. **Wearables & Fitness Section** — header 32pt + 7 cards × ~160pt avg + gaps
   - Purpose: Health device and fitness tracker integrations
   - Section header: "WEARABLES & FITNESS" eyebrow
   - Cards: WHOOP, Apple Health, Fitbit, Garmin, Oura Ring, Samsung Health, Strava

4. **Nutrition Section** — header 32pt + 3 cards × ~160pt avg + gaps
   - Purpose: Nutrition and food tracking integrations
   - Section header: "NUTRITION" eyebrow
   - Cards: MyFitnessPal, Nutritionix, Cronometer

5. **Productivity Section** — header 32pt + 1 card × ~160pt + gaps
   - Purpose: Calendar and productivity integrations
   - Section header: "PRODUCTIVITY" eyebrow
   - Cards: Google Calendar

6. **Lifestyle Section** — header 32pt + 1 card × ~160pt + gaps
   - Purpose: Lifestyle and mood signal integrations
   - Section header: "LIFESTYLE" eyebrow
   - Cards: Spotify

Each integration card shows: Service icon, name, status badge, sync details (if connected) or data description (if not connected), action buttons

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
  - "Notify me" — ghost button, white at 30% text, 0.4 opacity, disabled
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
| Disabled | 0.4 opacity (used during another connection flow) | — |
| Loading | White spinner replaces text, button stays orange | — |
| Error | Button flashes red border, error text below card ("Connection failed. Try again.") | error notification |
| Success | Button morphs to green (#34A853) with checkmark icon, then card transitions to connected state | success notification |

### Force Sync Button (Ghost)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, white text | — |
| Pressed | Background white at 5%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (during active sync) | — |
| Loading | Text replaced with small spinner, border stays | — |
| Error | Text turns red, "Sync failed" replaces text for 3s | error notification |
| Success | Text turns green, "Synced" replaces text for 2s, then "Last sync: just now" updates | success notification |

### Disconnect Button (Ghost Destructive)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, 1pt border white at 10%, #f44336 text | — |
| Pressed | Background red at 5%, scale(0.97) | medium impact |
| Focus-visible | 2pt red ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
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

### OAuth Error Recovery

| Scenario | Visual State | User Action |
|----------|-------------|-------------|
| User cancels OAuth window | Loading indicator dismisses. No error shown — user chose to cancel. Service row returns to "Not connected" state. | None needed |
| OAuth token expired (on sync) | Service shows "Reconnect required" amber status badge (replacing green "Connected"). Row subtitle: "Tap to reconnect". | Tap row → re-triggers OAuth flow |
| Third-party scope change | Warning card appears below the service row: amber left border (3pt), "Updated permissions needed" (14pt Semibold, white), "[Service] requires updated access. Tap to re-authorize." (13pt Regular, white at 50%), "Re-authorize" orange text link. | Tap → opens OAuth with updated scopes |
| Network failure during OAuth | Toast notification: "Connection failed. Check your network and try again." (standard toast pattern). Service row stays in "Not connected" state. | User retries manually |
| OAuth succeeds but initial sync fails | Service shows "Connected" green badge BUT a sync error indicator: orange dot (6pt) at top-right of the green badge. Subtitle: "Connected — sync pending". Auto-retries every 60s in background. | Tap row → shows bottom sheet with "Retry sync" CTA and "Disconnect" option |
| Rate-limited by third party | Service shows "Connected" green badge with subtitle: "Sync delayed — retry in [countdown]". No user action needed. | Automatic retry after rate limit window |

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
All 11 integration cards appear across 3 sections with "not connected" state. The SIA coaching note is prominent at the top: "Connecting your services helps SIA understand your full picture — your sleep, your workouts, your nutrition, and more." Each card's data description explains what that service provides. The "Connect" CTAs are orange and prominent, inviting action. The screen never feels empty because all available services are always shown — the empty state IS the default state, just without sync details.

### Established user (all connected)
SIA note adapts: "All services connected — SIA has your full picture." All cards show green "connected" badges, sync details, and force sync / disconnect buttons. Pull-to-refresh updates sync times.

### Integration Provider Reference

| Provider | Section | Data Types | Sync Method |
|----------|---------|------------|-------------|
| WHOOP | Wearables & Fitness | sleep, HRV, recovery, strain, heart rate, body temp | OAuth + webhook |
| Apple Health | Wearables & Fitness | steps, workouts, sleep, heart rate, VO2 Max | HealthKit native |
| Fitbit | Wearables & Fitness | steps, sleep, HR, workouts, calories | OAuth |
| Garmin | Wearables & Fitness | GPS activities, HR, sleep, VO2 Max, training load | OAuth |
| Oura Ring | Wearables & Fitness | sleep, readiness, HRV, body temp | OAuth |
| Samsung Health | Wearables & Fitness | steps, sleep, HR, workouts | OAuth |
| Strava | Wearables & Fitness | GPS activities, training load | OAuth |
| MyFitnessPal | Nutrition | calories, macros, meal logging | OAuth |
| Nutritionix | Nutrition | food database, nutrition data | API key |
| Cronometer | Nutrition | detailed nutrition, micronutrients | OAuth |
| Spotify | Lifestyle | listening data, mood signals | OAuth |

---

## Motivation Adaptation

- **Low motivation**: No changes — integration management is a utility action unaffected by motivation tier
- **Medium motivation**: Default experience
- **High motivation**: No changes — same controls regardless of motivation

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav header title | Sora | Semibold | 17pt | 22pt | white 100% |
| Section header eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase |
| SIA coaching note text | Sora | Regular | 13pt | 18pt | white at 60% |
| Service name | Sora | Semibold | 16pt | 22pt | white 100% |
| Status badge text | Sora | Semibold | 11pt | 14pt | varies by state |
| Sync details / data description | Sora | Regular | 13pt | 18pt | white at 50% |
| Connect button text | Sora | Semibold | 15pt | 20pt | white 100% |
| Force sync / Disconnect button text | Sora | Semibold | 15pt | 20pt | white / #f44336 |
| Notify me button text | Sora | Semibold | 15pt | 20pt | white at 30% |
| OAuth warning text | Sora | Semibold | 14pt | 20pt | white 100% |
| OAuth warning description | Sora | Regular | 13pt | 18pt | white at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| OAuth cancelled by user | Loading indicator dismisses; row returns to "Not connected" state; no error shown | None needed — user chose to cancel |
| OAuth token expired | Amber "Reconnect required" status badge replaces green; subtitle: "Tap to reconnect" | Tap row re-triggers OAuth flow |
| Third-party scope change | Warning card with amber left border: "Updated permissions needed" with "Re-authorize" link | Tap opens OAuth with updated scopes |
| Network failure during OAuth | Toast: "Connection failed. Check your network and try again." Row stays "Not connected" | User retries manually |
| OAuth succeeds but initial sync fails | Green badge with orange dot overlay; subtitle: "Connected — sync pending"; auto-retries every 60s | Tap row shows bottom sheet with "Retry sync" CTA |
| Rate-limited by third party | Green badge with subtitle: "Sync delayed — retry in [countdown]" | Automatic retry after rate limit window |
| Force sync fails | "Sync failed" replaces button text in red for 3s | User retries via Force sync button |
| Disconnect fails | "Could not disconnect. Try again." error text below card | User retries Disconnect button |
| Pull-to-refresh fails | Toast: "Could not refresh. Check your connection." | User pulls to refresh again |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- SIA coaching note: "SIA coaching note, [message text], button"
- Each integration card: "[Service name], [connection status], [data types]"
- Connect button: "Connect [service name], button"
- Force sync button: "Force sync [service name], button"
- Disconnect button: "Disconnect [service name], button, destructive"
- Section headers announced as group headings

**Focus order:**
1. Back button
2. SIA coaching note card
3. Wearables & Fitness section header → integration cards in order (WHOOP, Apple Health, Fitbit, Garmin, Oura Ring, Samsung Health, Strava), each card: name/status → action buttons
4. Nutrition section header → cards (MyFitnessPal, Nutritionix, Cronometer)
5. Productivity section header → cards (Google Calendar)
6. Lifestyle section header → cards (Spotify)

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Pull-to-refresh also available via manual Force sync per card
- All action buttons meet 44pt minimum touch target (36pt height within 44pt target area)
- Status badges are decorative; status is conveyed via text labels for screen readers

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Stripe + iOS (integrations/trust) — *stays Balencia via warm-glow layered surfaces on ink-brown, honest no-data ≠ zero ghost OAuth states, non-shaming permission copy, the brand period on key trust moments.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **SIA Coaching Note Card** (CK-P2, content hero) — the only ≥96pt glowing element above the fold, positioned immediately after the nav header with `--glow-orange` (32px) creating the warmth, and carrying the screen's single most important message ("why connecting matters"). This frames the entire screen emotionally: integrations are not compliance, they are *enrichment*. The section headers (WEARABLES & FITNESS, NUTRITION, PRODUCTIVITY, LIFESTYLE) are eyebrows (12pt, uppercase, white 40%), visibly secondary — they organize, not anchor. The integration cards follow in a calm list (12pt gaps between cards within sections, 24pt between sections). The squint test lands on the SIA coaching note's message first, then the integration card titles (WHOOP, Apple Health) as scannable identity, then the status badges (green dot + "Connected" or neutral circle + "Not connected") as the affordance layer. Everything below the fold scrolls with consistent rhythm — no competing focal points.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--color-alpha-white-06` glass-border · **`--edge-highlight` top-edge highlight** (CK-T01, the not-flat cue) · `--shadow-1`. The SIA Coaching Note Card adds `--surface-backplate` (CK-T02, a faint radial orange warm glow behind the text) to lift it as the hero. Integration cards sit in a calm scrollable section: 12pt gaps within sections (creating an optical rhythm), 24pt gaps between section headers and card groups. Each card interior is a tight vertical stack: identity row (service icon 32pt + name 16pt Semibold + status badge, 48pt tall) · details row (13pt Regular meta text, 0pt top margin to the identity — visually tight) · action button row (36–48pt action affordances, 16pt bottom padding). The status badge is a pill (24pt × auto, 4pt horizontal padding · 2pt vertical): connected state shows a 6pt filled circle in `--color-forest-green` + "Connected" (11pt, green text); not-connected shows a 6pt open circle in `--color-alpha-white-50` + "Not connected" (11pt, white 50%). Disabled "Notify me" state shows white 30% text, 0.5 opacity, no haptic. Card surface itself never flattens: the 1pt border + `--edge-highlight` on every card creates the premium depth. Section headers ("WEARABLES & FITNESS") are not cards — they sit 32pt below the previous section, 12pt above the first card (eyebrow style: `--text-eyebrow` 12pt / 600 weight / `--tracking-eyebrow` 0.12em / uppercase / white 40%). Disconnect confirmation uses the system alert (native iOS semantics), not a card — preserving the cognitive framing that this is a destructive, reversible action outside the normal card flow.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: nav header "Connected services" `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / white 100% · section header eyebrow `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40% · SIA coaching note text `--text-body` (16pt, raised from the 13pt spec) / 400 / `--leading-normal` (1.4) / white 60% · service name `--text-h3` (17pt) / 600 / white 100% · status badge text `--text-eyebrow` (12pt, size-matched to the status role) / 600 / white (color varies by state: green for connected, white 50% for not-connected, white 30% for disabled) · sync details / data description `--text-caption` (13pt) / 400 / `--leading-normal` / white 50% · button text "Connect" / "Force sync" / "Disconnect" `--text-h3` (15pt) / 600 / sentence case (no Title Case, no all-caps) / white 100% on orange, white on transparent backgrounds. Hierarchy is carried by **weight** (600 vs 400) and careful size stepping, not size alone. Sentence case everywhere on labels and buttons — no exclamation marks. The brand period is used once on the SIA coaching note, framing the emotional moment ("Connect your apps so SIA can see the full picture — sleep, workouts, calendar, and more."), never scattered. Stat figures (sync times "2m ago", counts) use `tabular-nums` if available. Replaces any ad-hoc pixels with the `CK-T04` line-height scale.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice — warm, coaching, non-shaming, specific. Critical permission/trust edge strings (the #1 craft gap flagged in Dim 11 for trust/integrations):

**Permission scope preview (OAuth modal, NEW, authored):**
- *before:* generic "grant access" + app name → *after (on-voice, honest):* 
  - Heading: "WHOOP wants to connect"
  - Subheading: "Here's what SIA will see from your data." (warm, not "we collect X")
  - Scope list (bulleted): "Sleep · HRV · Recovery scores · Strain" (honest item list, not "health data" filler)
  - Storage line: "SIA stores your WHOOP data securely and uses it only to understand your recovery patterns." (specific value, no jargon, the period)
  - Disconnect line: "You can disconnect at any time from the Connected Services screen." (honest exit path)
  - Privacy link: "WHOOP's privacy policy" (in orange, tappable)

**Disconnect confirmation alert (NEW, authored):**
- *before:* bare "Disconnect [service]?" → *after:*
  - Headline: "Disconnect WHOOP" (plain, not a question — the action is clear)
  - Body: "SIA will no longer receive your sleep and recovery data. You can reconnect anytime." (warm framing of the consequence, never shaming — "data stops flowing" not "you lose insights")
  - Button 1: "Keep connected" (white, soft out)
  - Button 2: "Disconnect" (red destructive, `--color-error-red`)

**SIA Coaching Note variants (already on-voice, kept but mapped to states):**
- Day 1 (no services): "Connecting your services helps SIA see your full picture — sleep, workouts, calendar, and more."
- 1+ services connected: "WHOOP connected — SIA can now factor in your recovery scores." (specific to the newly connected service, warm confirmation)
- All 11 connected: "All your services are syncing. SIA has your full picture now." (celebratory, not over-the-top; the period lands here)

**Status badge + sync details (NEW, non-generic):**
- Connected card subtitle: "Syncing: sleep, HRV, recovery, strain" (not "data syncing" filler) + "Last sync: 2 minutes ago." (specific, warm)
- Not-connected card subtitle: "Steps, workouts, sleep, heart rate" (the *value* not the status — what they'd gain by connecting, never "connect now" urgency)

**Loading state (NEW):**
- *before:* generic "connecting..." → *after:* "WHOOP is setting up your connection — one moment." (warm, specific service, calm waiting)

**Error states (NEW, per-scenario):**
- OAuth cancelled: no error shown (user chose to cancel; row returns to "Not connected" silently, friendly)
- OAuth fails (network): Toast: "Couldn't connect WHOOP. Check your network and try again." (specific service, recovery action, no blame)
- Scope change: Warning card (amber border, orange text): "WHOOP needs updated permissions. Tap to re-authorize." (simple, actionable, not alarmist)
- Sync fails (after connect): Status badge shows connected badge + orange dot overlay, subtitle: "Connected — sync pending. Auto-retrying in background." (transparent, hopeful, never "failed" language)
- Rate-limited: Subtitle: "Sync delayed — retry in 4 minutes." (honest countdown, no user action needed, calm)
- Force sync fails: Button text turns red: "Sync failed" for 3s, then reverts. (brief, specific; no modal noise)
- Disconnect fails: Error banner below card: "Couldn't disconnect WHOOP. Try again or contact support." (honest, recovery path)

**Permission rationale (a11y + trust, NEW):**
- On the OAuth scope preview modal, each permission gets a one-line rationale:
  - "Sleep data → SIA spots patterns between rest and your mood"
  - "Calendar data → SIA avoids scheduling conflicts with your workout windows"
  - "Spotify listening data → SIA notes correlations between music and energy levels" (specific, warm coaching framing)

**Disabled "Notify me" button (coming soon services, NEW):**
- Hint text: "Notify me when available" (white 30% text, no haptic on press; not "coming soon" jargon)

All copy is authored; zero filler, zero "Title / Subtitle", zero hint text tone. Non-shaming on all fronts: connecting is painted as *choice*, not *requirement*; not-connecting is neutral (no urgency language, no "you're missing out" reframes).

### Motion choreography

Per `CK-P4` draw-first order (locked timings, `CONSISTENCY.md` §3):

**Entrance (screen push):**
1. **Fade-in, body section header + coaching note card** (280ms `--dur-base` `--ease-out-soft`)
2. **SIA coaching note text settles** (280ms `--dur-base`; the emotional anchor lands first before the card list)
3. **Section header + card group 1 (WEARABLES & FITNESS)** fades up with staggered translateY(12pt→0): first card at 280ms, each subsequent card +40ms stagger (80ms stagger per CONSISTENCY). Cards rise, never fade alone (the rise carries the depth).
4. **Section header + card group 2 (NUTRITION)** begins staggering as group 1 completes (sequential, calm, not parallel chaos)
5. **Group 3 (PRODUCTIVITY) + group 4 (LIFESTYLE)** follow, each section's header appearing 8pt above its first card with a soft delay
6. **Below-fold cards animate on scroll-into-view** (preserved from desktop infinite scroll — as the user scrolls, off-screen cards fade in with the same 280ms + stagger when they cross the viewport threshold)

**State transitions:**
- **Connect → Connected (OAuth success):** Button morphs green (280ms) → card content crossfades: "Not connected" badge to green "Connected", action buttons ("Force sync" + "Disconnect") appear, sync details appear (280ms total). The card itself does not flash; the transition is smooth, warm.
- **Disconnect → Not connected (confirmation accepted):** Reverse of above: card content crossfades (sync details disappear, "Not connected" badge returns, buttons change to single "Connect"), 280ms `--ease-out-soft`.
- **Force sync loading:** Inline spinner (small, 16pt, white at 60%) replaces text in the button while the button border stays white 10%. Spinner rotates continuously (not pulsing) until complete.
- **Pull-to-refresh (iOS control):** Standard iOS drag handle + skeleton shimmer on the sync-details rows of all connected cards (a faint left-to-right shimmer, 280ms cycle, morphs into real data on complete).
- **OAuth modal enter:** Slides up from bottom (520ms `--dur-slow` `--ease-flow`), the scope list items stagger in slightly (40ms per item) so the permission list reads as a choreographed reveal, not a sudden wall.

**Reduced-motion:** All animations collapse to instant; the final state is preserved (cards appear at full opacity + depth, OAuth modal is instantly visible, buttons show their final icon/text). No skeleton shimmer (final data shown instantly). The signature continuous-stroke motif from the brand (§8 "draw, never fade") does not apply to this screen (no chart/line primitive); the depth language (warm-glow surfaces, the edge-highlight cue) is the ownable moment and is preserved on reduced-motion (no opacity fade, no loss of craftsmanship).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day 1** | All 11 service cards rendered in "Not connected" state across 4 sections; SIA coaching note is prominent at top: "Connecting your services helps SIA see your full picture — sleep, workouts, calendar, and more." Each card shows service icon + name + "Not connected" badge + data description ("Steps, workouts, sleep, heart rate") + single orange "Connect" button. No sync details rendered (those only appear when connected). Screen never feels empty because the full service menu is always visible — the empty state *is* the default state, just without live data. | SIA note frames connecting as *choice*, not *requirement*: "helps SIA see the full picture" (warm, coaching, the period). | All surfaces carry depth (edge-highlight, shadows); status badges are decorative but support message is clear via text. "Not connected" badge uses white 50% text on white 10% bg (subtle, never alarming). No grayed-out disabled styling on the cards themselves. |
| **Loading (OAuth in progress)** | Selected card's "Connect" button shows a white spinner (16pt) + "Connecting WHOOP..." text (13pt, white 70%, fades during spinner rotation, optional); button stays orange filled. Other cards remain in their previous state (not dimmed, not locked). iOS auth modal is presented on top (standard system sheet with the honest scope preview authored above). | "WHOOP is setting up your connection — one moment." (on the auth modal heading; warm, specific service, calm waiting) | Card surfaces remain at full depth (no grayscale, no dimming). The OAuth modal is layered above (system sheet aesthetic, not a bespoke modal, preserving iOS trust semantics). The scope list uses the warm-glow card language (CK-P1) inside the modal. |
| **Empty / partial (some services connected, some not)** | Mixed rendering: connected cards show "Connected" badge + force-sync/disconnect buttons + sync details. Not-connected cards show "Not connected" badge + "Connect" button + data description. No ghosted/dashed elements (there's no "missing data" state here — the absence of sync details is honest and clear via the "Not connected" text). If one service fails to sync (such as WHOOP rate-limited), its badge shows green "Connected" with an orange dot overlay (5pt, top-right) and subtitle: "Connected — sync pending. Auto-retrying in background." This is visually distinct from a real fully-synced card. | "WHOOP is connected — sync pending. Auto-retrying." (for the rate-limit case; calm, transparent, never "error" framing). Generic "connected" cards: "Last sync: 2 minutes ago" (specific time, warm update). | Connected cards show full depth + green badge. Partial-sync cards show full depth + badge with orange dot (the dot is a glyph + color cue, not colour-alone — the subtitle text is the load-bearing copy). Not-connected cards show full depth + neutral badge. All surfaces maintain the layered treatment; no surface degrades. |
| **Error (OAuth failure, sync failure, disconnect failure)** | **OAuth error:** card's "Connect" button shows error state (red `--color-error-red` border, 1pt, replace gray default border) + text turns red for 3s: "Connection failed"; after 3s, button reverts to orange default and row returns to "Not connected" silently. Below the card: a warm error banner: "Couldn't connect WHOOP. Check your network and try again." (specific service, recovery action, 14pt Semibold, no icon alone — text + glyph paired). **Sync failure (after connecting):** Force sync button shows error for 3s: red text "Sync failed" (13pt), then reverts to "Force sync" (white). The card itself does not show an error state — the failure is isolated to the button + optional toast notification (bottom of screen, non-intrusive): "WHOOP sync failed. Retrying..." **Disconnect failure:** Card returns to "Connected" state, error banner appears: "Couldn't disconnect WHOOP. Try again or contact support." (orange text, tappable "contact support" link). | Error text is specific (names the service, names the action) and includes recovery: "Check your network and try again" (actionable, never "something went wrong"). For scope-change warnings: "WHOOP needs updated permissions. Tap to re-authorize." (simple, direct, not technical jargon). For rate-limit: no error framing — the card shows "Connected" + "sync delayed — retry in [countdown]" (transparent, calm, system-level). | Error banners use calibrated `--color-error-red` only for genuine operational failures (OAuth network error, disconnect fails, sync fails). Glyph + word paired: a small alert icon (12pt) + red text (never colour-alone). Card surfaces do not dim or change (they remain at full depth). The error message is positioned below the card (not a modal, not an inline expansion) so it doesn't break the card's affordance hierarchy. |
| **Offline (no network)** | Cached sync status is shown ("Last sync: 45 minutes ago" in lighter text, white 40%); "Force sync" and "Connect" buttons are dimmed (50% opacity, no haptic on press). A persistent network banner sits below the sticky nav: "You're offline — showing cached data." (14pt, orange border left, white text, tap to dismiss). Connected cards remain visible with their cached last-sync time. | "You're offline — showing cached data." (calm, honest, no urgency, no blame). Sync time: "Last sync: 45 minutes ago" (muted text, white 40%, makes the staleness transparent without shaming). Disabled button reason (on a11y label, not visible in UI): "Force sync unavailable while offline." | Card surfaces and badges retain full depth (no desaturation, no grayscale). Buttons are honestly dimmed (opacity 0.5, no haptic) so the user understands they're available when online but unavailable now. The banner uses a calm aesthetic (orange left border, not red, since this is not an error — it's a system state). |

### Signature & anti-generic

Ownable moment: the **SIA Coaching Note's emotional framing** (CK-P6) — this screen could have opened with a flat eyebrow "Connected services" and a list of toggles (generic settings pattern, competitor default). Instead, it opens with a warm, personalized SIA message that *contextualizes* integrations as *enrichment, not compliance.* The messaging adapts to the user's journey (Day 1: "see the full picture", 1+ connected: service-specific confirmation, all done: celebration), so the screen has a conversational warmth that lifts it from "configuration panel" to "coaching moment." The integration cards themselves avoid generic symmetry (CK-P6 anti-pattern): the cards are not a flat 1-column list (monotony), and each card's internal layout is a tight vertical stack (identity → details → action) that guides the eye downward without repetition. The status badges are simple pills (not geometric shapes, not complex iconography), which aligns with the brand's quiet confidence — the design doesn't shout, it clarifies. The disconnect confirmation uses the native iOS alert (a system affordance, not a bespoke modal), which reads as premium trust (the app defers to OS semantics for destructive actions, never custom-designed confirmations that feel manipulative). The "Notify me" disabled state for coming-soon services is an honest affordance (a disabled button, not hidden or absent), which frames the service as *planned*, not *rejected*. Anti-generic tell removed: the screen does not render a symmetric 2×2 card grid (that would be a flat, generic default); it renders a 1-column vertical list organized by eyebrow sections, which is the premium, restrained choice (calm, scannable, trust-forward). One clear ownable moment per screen (RUBRIC dim 14): the SIA coaching note + the warm OAuth scope preview copy (the honest, permission-first framing that no competitor does well).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` / `--color-ink-brown-800`):

| Element | Color | Contrast ratio | WCAG level |
| --- | --- | --- | --- |
| Service name | `--color-alpha-white-100` | ≥12:1 on both bg | AAA |
| "Connected" badge text | `--color-forest-green` | 2.8:1 on green 15% bg (below 3:1 threshold) | AA (badge is decorative support; text label "Connected" is load-bearing) |
| Status badge "Connected" + text glyph | green dot (6pt) + "Connected" text (11pt, green) | glyph + text paired (never colour-alone); text is 2.8:1 but visible green glyph + word together exceed the colour-alone barrier | AA + 1.4.11 |
| "Not connected" badge text | `--color-alpha-white-50` | 4.5:1 on white 10% bg | AA |
| Sync details / data description | `--color-alpha-white-50` | 4.5:1 on `--color-ink-brown-800` | AA |
| "Connect" button text | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` fill | AAA |
| "Force sync" button text | `--color-alpha-white-100` | ≥4.5:1 on transparent bg w/ white 10% border | AA |
| "Disconnect" button text | `--color-error-red` | 3.2:1 on transparent bg | WCAG 1.4.11 |
| SIA coaching note text | `--color-alpha-white-60` | ≥4.5:1 on `--color-ink-brown-800` | AA |
| Section header eyebrow | `--color-alpha-white-40` | ≥3:1 on `--color-ink-900` | AA |
| Settings heading "Connected services" | `--color-alpha-white-100` | ≥12:1 on `--color-ink-900` | AAA |

**Focus ring:** Every focusable element (buttons, card tap targets, links) carries `--focus-ring` (CK-T03: 2px orange, 2px offset) uniform app-wide — the settings gear, back button, "Connect" / "Force sync" / "Disconnect" buttons, service cards, OAuth modal scope items, all use the same ring.

**Touch targets:** All action buttons (`--s-10` 40pt min, most are 36–48pt height) meet the ≥44pt minimum in a 44×44pt tap area (the "Connect" button is 36pt tall but has 4–8pt padding on horizontal edges and 4pt on vertical, landing at 44pt effective touch target). Service cards are tappable for expansion (future variant); the card body is at least 160pt tall, far exceeding the 44pt minimum.

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- SIA coaching note: "SIA coaching note, [message text]" (the purple dot indicator is decorative, announced via context)
- Service card: "[Service name], [connection status], [data description or sync time]"
  - Connected example: "WHOOP, connected, syncing sleep, HRV, recovery, strain. Last sync 2 minutes ago."
  - Not-connected example: "Apple Health, not connected, provides steps, workouts, sleep, heart rate."
- "Connect [service name]" button: "[Service name] is not connected. Connect to sync [data types]."
- "Force sync [service name]" button: "Force sync [service name], button. Refreshes data from [service]."
- "Disconnect [service name]" button: "Disconnect [service name], button, destructive action."
- Section headers: announced as group heading (such as "Wearables & Fitness section").
- OAuth modal scope list: each item announced as a list item ("Sleep data", "HRV", "Recovery scores"…).
- Disconnect confirmation alert: standard iOS alert semantics (title + body + button roles).

**Status never colour-alone:** Connected status shows a filled green circle (glyph) + "Connected" (text); not-connected shows an open circle (glyph) + "Not connected" (text); error states show red text + alert icon (glyph + word paired). The colour is a support cue, not the sole carrier of meaning.

**Gesture alternatives:**
- Tap "Connect" button → OAuth flow (system browser, standard on iOS); accessibility keyboard user receives focus and can activate via Enter/Space.
- Long-press card body (future variant) → show card context menu with disconnect/force-sync options (alternative to swipe gestures, though no swipe is specified in this screen).
- All interactive elements are keyboard-focusable; tab order follows the visual hierarchy (back button → coaching note → section headers + cards top-to-bottom).

**Reduced-motion:** `prefers-reduced-motion` media query respected — all fade-ups collapse to instant, staggered card entrances appear at final state simultaneously, the OAuth modal and error banners are instantly visible. The signature craft (warm-glow surfaces, edge-highlight, depth) is preserved on reduced-motion (no opacity fade that would remove depth information; the final state is the canonical frame).

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Previous screen (Me Main [17] or Settings [21]) via stack pop, external OAuth flows (system browser for WHOOP/Spotify/Strava/Google Calendar), disconnect confirmation (native alert)
- **Navigates from**: Me Main [17] via stack push (quick link grid), Settings [21] via stack push ("connected services" row)
- **Shared components with**: Settings [21] (Section Header, Navigation Header), Subscription & Billing [23] (Status Badge pattern)
- **Patterns used**: Back Button (Batch 1), Brand CTA Button (Batch 1 — adapted to 36pt for card-internal use), Section Header (Batch 5), SIA Note (Batch 5)
- **Patterns established**: Integration Card (with 3 variants: connected, not connected, coming soon), Status Badge (connected/not-connected/coming-soon), Disconnect Confirmation Alert, Ghost Button — Destructive variant, Force Sync inline loading pattern
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-08.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/connected-services`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B08-F10 | major | navigation | Make the shared back affordance semantic and route-aware. |
| B08-F11 | critical | integration-control | Implement OAuth launch/loading/error states, force-sync state, disconnect confirmation, and status updates. |
| B08-F12 | major | trust-privacy | Add per-service scope previews and concise disconnect/deletion policy copy before OAuth and in disconnect confirmation. |
| B08-F13 | major | mobile-ergonomics | Increase integration action hit areas to at least 44px height. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

