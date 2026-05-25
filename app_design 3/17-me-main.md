# Screen Design: Me Main

**Screen**: 17 of 73
**File**: 17-me-main.md
**Register**: Product Mode
**Primary action**: view profile and navigate to sub-screens
**Tab**: Me
**Navigation**: Tab root (stack depth 0). Entry point for all Me sub-screens.

---

## Purpose

Me Main is the user's identity hub — their profile, RPG progression, and gateway to every personal feature and domain in Balencia. It answers "who am I in this app?" at a glance (name, level, stats) and provides clear paths to deeper screens (RPG Character, Personal Wiki, Settings, Explore). SIA's presence is subtle here: a personalized insight card in the Explore preview section that contextually recommends what to explore next.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Profile header — avatar, name, RPG level badge, XP progress bar (identity anchor)
2. Quick stats row — streak, missions completed, Life Power, total XP (progression snapshot)
3. Quick links grid — 6 icon+label cards to sub-screens (navigation hub)
4. Explore preview — "suggested for you" horizontal scroll of 2-3 AI-recommended module cards + "see all" link (discovery)

**User flow**:
- **Arrives from**: Bottom tab bar (Me tab tap), or back-navigation from any Me sub-screen
- **Primary exit**: Quick links grid → any Me sub-screen (stack push)
- **Secondary exits**: Explore module card → domain dashboard or feature screen (stack push), RPG level badge → RPG Character [19] (stack push), avatar → edit profile (modal)

---

## Layout

**Scroll behavior**: ScrollView (content fits ~1.5 viewports on iPhone SE, single viewport on larger devices)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────┐      │
│  │  ⚙ (top-right)       │      │  ← Settings gear icon
│  │                       │      │
│  │    ┌──────┐           │      │
│  │    │Avatar│  64pt     │      │  ← Profile section
│  │    └──────┘           │      │    ~200pt total
│  │   User Name           │      │
│  │   ◆ Lv.14 ━━━━━━━░░  │      │  ← RPG badge + XP bar
│  │   Member since May '26│      │
│  └───────────────────────┘      │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │  42  │ │  12  │ │ ◆487 │ │8,450 ││ ← Stats row ~80pt
│  │streak│ │ done │ │ Life │ │  XP  ││
│  │      │ │      │ │Power │ │      ││
│  └──────┘ └──────┘ └──────┘ └──────┘│
│                                 │
│  ┌──────────┐ ┌──────────┐     │
│  │ 🎮 RPG   │ │ 📓 Mission│     │
│  │ character │ │ journal  │     │  ← Quick links
│  ├──────────┤ ├──────────┤     │    2x5 grid ~396pt
│  │ 📖 Wiki  │ │ 🔗 Apps  │     │
│  │ book of  │ │ connected│     │
│  ├──────────┤ ├──────────┤     │
│  │ ⭐ Plan  │ │ 📸 Photos │     │
│  │ subscr.  │ │ progress │     │
│  ├──────────┤ ├──────────┤     │
│  │ 🔥 Strks │ │ 🏆 Achvs │     │
│  │ streaks  │ │ achieve. │     │
│  ├──────────┤ ├──────────┤     │
│  │ 🔔 Notif │ │ ❓ Help  │     │
│  │ history  │ │ center   │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  suggested for you    see all → │  ← Explore preview
│  ┌─────────┐ ┌─────────┐ ┌──  │    section ~180pt
│  │ Module  │ │ Module  │ │ Mo │
│  │ Card 1  │ │ Card 2  │ │ Ca │
│  │ domain  │ │ domain  │ │ do │
│  └─────────┘ └─────────┘ └──  │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [ Today ] [ SIA ] [Goals] [Me]│  ← Tab bar (56pt)
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Settings gear icon** — 44x44pt, top-right, 16pt from right edge
   - Purpose: quick access to Settings [21]
   - Position: absolute, overlaying scroll content, in the header area

2. **Profile section** — ~200pt
   - Purpose: identity anchor
   - Content: avatar (64pt circle), user name, RPG level badge, XP progress bar, member since

3. **Stats row** — ~80pt
   - Purpose: at-a-glance progression snapshot
   - Content: 4 stat cells (streak, missions completed, Life Power, total XP)

4. **Quick links grid** — ~396pt
   - Purpose: navigation hub to Me sub-screens
   - Content: 10 cards in 2-column grid (5 rows)

5. **Explore preview section** — ~180pt
   - Purpose: AI-driven feature discovery
   - Content: section header + horizontally scrollable module cards

6. **Bottom spacing** — 32pt

---

## Components

### Profile Section
- **Purpose**: Anchors user identity and RPG progression
- **Data source**: User profile API + RPG stats API
- **Visual treatment**: Centered layout, no card surface (floats on ink-900 background)
- **Content**:
  - Avatar: 64pt circle, border 2pt white at 20% opacity. Tap → Profile Edit [50] (stack push). If no photo, shows first initial on ink-brown-800 circle. **Camera overlay**: small camera icon (16pt, white at 80%) in a 24pt circle with ink-brown-800 bg and 1pt white at 20% border, positioned bottom-right of avatar (offset -4pt, -4pt). Indicates photo upload capability.
  - Name: 20pt Sora Semibold, white, center-aligned, 8pt below avatar
  - RPG level badge: Inline pill — diamond icon (12pt, orange) + "Lv.14" text (14pt Sora Semibold, white), 8pt below name
  - XP progress bar: Full-width minus 64pt (32pt margins each side), 6pt height, rounded pill, ink-brown-800 track, orange fill. Positioned 8pt below level badge. Label below bar: "2,450 / 5,000 XP" (12pt Sora Regular, white at 50%), right-aligned.
  - Member since: 13pt Sora Regular, white at 40%, center-aligned, 8pt below XP label. Format: "member since May 2026"
- **Variants**: New user (Lv.1, 0 XP, no avatar — shows initial), established user
- **Gestures**: Tap avatar → Profile Edit [50] (stack push). Tap RPG level badge → RPG Character [19] (stack push).
- **Size**: full-width x ~200pt

### Stats Row
- **Purpose**: Quick progression snapshot — streak, missions, Life Power, XP
- **Data source**: RPG stats API (aggregated)
- **Visual treatment**: 4 equal-width cells, no dividers, centered horizontally. Each cell is a vertical stack: large number on top, label below.
- **Content per cell**:
  - Number: 24pt Sora Bold, white, tabular-nums, center-aligned
  - Label: 12pt Sora Regular, white at 50%, center-aligned, 4pt below number
  - Cell 1: current streak (days) / "day streak"
  - Cell 2: missions completed (count) / "completed"
  - Cell 3: Life Power score / "Life Power" — number preceded by diamond icon (12pt, orange #FF5E00) inline. Life Power = `sum(all active domain stats) * balance_multiplier`.
  - Cell 4: total XP (formatted with comma) / "total XP"
- **Visual treatment**: Contained in a single ink-brown-800 card with 16pt padding, border-radius 20pt (--r-lg), 1pt border white at 8%
- **Variants**: New user (all zeros, Life Power shows "0", still shows the row)
- **Gestures**: Tap entire stats row → RPG Character [19] (stack push)
- **Size**: full-width minus 32pt (16pt margins) x ~80pt

### Quick Links Grid
- **Purpose**: Navigate to all Me sub-screens
- **Data source**: Static (navigation items)
- **Visual treatment**: 2-column grid, 12pt gap between cards. Each card is ink-brown-800, border-radius 16pt (--r-md + 2pt), 1pt border white at 8%, 16pt padding.
- **Card content**:
  - Icon: 24pt, white at 70%, top-left
  - Label: 15pt Sora Semibold, white, below icon, 8pt gap
  - Subtitle: 13pt Sora Regular, white at 40%, 4pt below label (optional, 1-line description)
- **Grid items**:
  1. RPG character — icon: shield/gamepad, subtitle: "Lv.14 explorer"
  2. Mission journal — icon: book-open, subtitle: "14 completed" (dynamic count of completed + archived missions, or "no entries yet")
  3. Book of life — icon: book, subtitle: "what SIA knows"
  4. Connected apps — icon: link/chain, subtitle: "3 connected" (dynamic count)
  5. Subscription — icon: star/crown, subtitle: "Plus plan" (dynamic tier)
  6. Progress photos — icon: camera/image, subtitle: "12 entries" (dynamic count, or "start tracking")
  7. Streaks — icon: flame, subtitle: "42 days" (dynamic streak count, or "start a streak")
  8. Achievements — icon: trophy, subtitle: "47 earned" (dynamic count, or "start earning")
  9. Notifications — icon: bell, subtitle: "12 new" (dynamic count, or "all caught up")
  10. Help center — icon: question-circle, subtitle: "FAQ and guides"
- **Variants**: Notification badge (orange dot, 8pt) on Notifications card when unread. Subscription card shows current tier name. Progress photos card shows thumbnail of most recent photo as card bg (dimmed to 20% opacity). Streaks card shows flame icon in Burnt Orange when streak is active, grey when broken. Achievements card shows a "new" badge (green dot, 8pt) when new achievement earned since last visit. Mission journal card shows count of completed + archived missions as subtitle.
- **Gestures**: Tap card → respective sub-screen (stack push)
- **Size**: full-width minus 32pt x ~396pt (5 rows x ~72pt card + 12pt gaps)

### Settings Gear Icon
- **Purpose**: Quick access to Settings [21]
- **Data source**: Static
- **Visual treatment**: Gear icon, 22pt, white at 60%, positioned top-right (16pt from right edge, aligned with top of profile section)
- **Touch target**: 44x44pt
- **Gestures**: Tap → Settings [21] (stack push)

### Explore Preview Section
- **Purpose**: AI-driven feature discovery, surfaces relevant domains and features
- **Data source**: AI recommendation engine (contextual) + static module list fallback
- **Visual treatment**: Section with header row and horizontally scrollable cards
- **Section header**:
  - Left: "suggested for you" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking (eyebrow style)
  - Right: "see all" — 14pt Sora Semibold, orange (#FF5E00), tap → Explore Section [18] (stack push)
  - 24pt top margin from quick links grid
- **Module cards** (horizontal ScrollView):
  - Card width: 160pt, height: 120pt
  - Background: ink-brown-800, border-radius 16pt, 1pt border white at 8%
  - Padding: 16pt
  - Content (top to bottom):
    - Domain color dot (8pt circle) + domain name (11pt Sora Regular, white at 50%), 4pt gap, single row
    - Module name: 15pt Sora Semibold, white, 12pt below domain row
    - Description: 13pt Sora Regular, white at 40%, 4pt below name, 2-line max, ellipsis overflow
    - Optional badge: "new" or "suggested" pill (top-right corner, 8pt padding, orange bg for "suggested", green bg for "new", 10pt Sora Semibold white text)
  - Card spacing: 12pt between cards
  - Left padding: 24pt (aligned with screen margins)
  - Right: scrolls off-screen, last card has 24pt trailing padding
- **Variants**: 
  - AI-populated (2-3 contextual recommendations)
  - Fallback (3 featured modules from different domains)
  - New user: "start exploring" messaging, shows most popular modules
- **Gestures**: Horizontal scroll. Tap card → domain dashboard or feature screen (stack push).
- **Size**: full-width x ~180pt (header 24pt + 16pt gap + 120pt cards + 20pt bottom)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces (stats, quick links, module cards) | #211008 | ink-brown-800 | z-10 surface |
| Card borders | white at 8% | — | Subtle glass edge |
| XP progress bar fill | #FF5E00 | Burnt Orange | 60% — primary accent |
| XP progress bar track | #211008 | ink-brown-800 | Matches card surface |
| RPG level badge diamond icon | #FF5E00 | Burnt Orange | 60% — brand accent |
| Life Power diamond icon (stats row) | #FF5E00 | Burnt Orange | 60% — Life Power indicator |
| Life Power number (stats row) | #FFFFFF | white 100% | Primary text (same as other stat numbers) |
| "see all" link text | #FF5E00 | Burnt Orange | 60% — interactive text |
| Active tab (Me) icon + label | #FF5E00 | Burnt Orange | 60% — active state |
| Stats row numbers | #FFFFFF | white 100% | Primary text |
| Name text | #FFFFFF | white 100% | Primary text |
| Labels, subtitles, captions | #FFFFFF at 40-50% | white opacity | Tertiary text |
| Settings gear icon | #FFFFFF at 60% | white opacity | Secondary icon |
| Inactive tab icons | #FFFFFF at 60% | white opacity | Tab bar |
| Module card domain dots | per-domain hex | Domain colors | Identification only |
| "suggested" badge bg | #FF5E00 | Burnt Orange | 60% — attention |
| "new" badge bg | #34A853 | Forest Green | 30% — freshness |
| Notification badge dot | #FF5E00 | Burnt Orange | 60% — alert |
| Avatar border | white at 20% | — | Subtle ring |

**60/30/10 verification**: Orange dominates interactive elements (XP bar, "see all" link, active tab, badges, notification dot). Green appears only on "new" module badges. Purple is absent — correct for this screen (no SIA/AI indicator needed on a navigation hub). Ratio holds.

---

## Interaction States

### Avatar (Tap to Edit)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 64pt circle, 2pt border white at 20% | — |
| Pressed | scale(0.95), border brightens to white at 40% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always interactive) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Stats Row Card (Tap to RPG Character)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens slightly, border white at 15% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | skeleton shimmer across all 4 stat values | — |
| Error | N/A | — |
| Success | N/A | — |

### Quick Link Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens slightly, border white at 15% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, no touch response | — |
| Loading | icon replaced with 20pt spinner, label stays | — |
| Error | N/A | — |
| Success | N/A | — |

### Explore Module Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow appears | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | skeleton shimmer over card content | — |
| Error | N/A | — |
| Success | N/A | — |

### Settings Gear Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 60%, 22pt | — |
| Pressed | white at 40%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "See All" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange (#FF5E00), 14pt Sora Semibold | — |
| Pressed | orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### RPG Level Badge (Tap to RPG Character)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | pill shape, text white, diamond icon orange | — |
| Pressed | scale(0.95), subtle orange glow behind pill | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Bottom Tab Bar — Me Tab (Active)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange icon (filled) + orange label | — |
| Default (inactive, other tabs) | white at 60% icon (outlined) + white at 60% label | — |
| Pressed (any tab) | scale(0.90), icon brightens | medium impact |
| Focus-visible | 2pt orange ring around icon+label group | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Avatar | Present edit profile modal |
| Tap | RPG level badge | Push RPG Character [19] |
| Tap | Stats row | Push RPG Character [19] |
| Tap | Quick link card | Push respective sub-screen |
| Tap | Explore module card | Push domain dashboard / feature screen |
| Tap | Settings gear | Push Settings [21] |
| Tap | "see all" | Push Explore Section [18] |
| Horizontal scroll | Explore cards | Scroll through suggested modules |
| Vertical scroll | Entire screen | ScrollView, content pans vertically |
| Pull-to-refresh | Screen top | Refresh stats + explore suggestions |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Profile section | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Quick links grid | Screen mount | Staggered fade-in per card, 60ms stagger | 280ms each | ease-out-soft |
| Explore cards | Screen mount | Staggered fade-in, 60ms stagger after grid | 280ms each | ease-out-soft |
| XP progress bar | Screen mount | Width animates from 0 to current %, starts after profile fade-in | 520ms | ease-flow |
| Pull-to-refresh | Pull release | Stats + explore cards skeleton shimmer → populated | 280ms | ease-out-soft |
| Quick link press | Tap | scale(1→0.97→1) | 160ms | ease-out-soft |
| Tab switch to Me | Tab tap | Crossfade from previous tab content | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (from tab switch)**: Crossfade in (280ms, ease-out-soft). Content stagger begins.
- **Enter (back from sub-screen)**: Slide in from left (standard iOS pop), 280ms.
- **Exit (to sub-screen)**: Slide out to left (standard iOS push), 280ms.

---

## Empty States

### Day 1 (new user)
- Avatar shows first initial on ink-brown-800 circle
- Name displays as entered during onboarding
- RPG level badge: "Lv.1" with empty XP bar (0 / 100 XP)
- Stats row: "0 day streak" / "0 completed" / "◆ 0 Life Power" / "0 total XP"
- Quick links grid: all 10 cards visible, subtitles adapt ("Lv.1 beginner" for RPG, "no entries yet" for Mission journal, "start building" for Wiki, "0 connected" for Apps, "choose a plan" for Subscription, "all caught up" for Notifications)
- Explore preview: "start exploring" eyebrow text. Shows 3 popular modules (Fitness, Journal, Finance) with "popular" badges instead of "suggested"
- Screen never feels empty — structure is always full, content adapts.

### Returning user with zero activity today
- Stats row shows lifetime totals (never zero after first action)
- Explore preview refreshes with new AI suggestions based on recent patterns
- No special empty state needed — this screen shows cumulative data, not daily.

---

## Motivation Adaptation

- **Low motivation**: Same layout. Explore preview features simpler, less intimidating modules. Stats row emphasizes streak preservation. SIA suggestion card in explore says something encouraging ("just checking in today counts").
- **Medium motivation**: Default experience as described above.
- **High motivation**: Stats row could show additional stat (e.g., "this week" mini-trend arrows next to numbers). Explore preview may show more advanced modules (analytics, correlations). No additional visual density — Me Main stays clean regardless.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| User name | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| RPG level badge text ("Lv.14") | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| RPG level diamond icon | — | — | 12pt | — | #FF5E00 |
| XP progress label ("2,450 / 5,000 XP") | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Member since text | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Stats row number | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Stats row label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Quick link card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Quick link card subtitle | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Explore section eyebrow ("suggested for you") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| "see all" link | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| Module card domain name | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 50% |
| Module card name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Module card description | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Module card badge text | Sora | Semibold (600) | 10pt | 14pt | #FFFFFF |
| Settings gear icon | — | — | 22pt | — | #FFFFFF at 60% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (profile data) | Profile section shows cached data (name, avatar) from local storage. XP bar and level show last known values. | Pull-to-refresh retries. Profile data is cached aggressively. |
| Stats row API failure | Stats row shows skeleton shimmer across all 4 values. | Pull-to-refresh retries. Cached stats displayed if available. |
| Explore recommendations API failure | Explore preview section falls back to 3 static "popular" module cards (Fitness, Journal, Finance). No "suggested" badges shown. | Pull-to-refresh retries AI recommendations. Fallback is always available. |
| API timeout (RPG stats) | Level badge and XP bar show last cached values. Stats row shows skeleton shimmer. | Pull-to-refresh retries all data. |
| Avatar upload failure | Camera overlay shows brief red flash. Toast: "Couldn't upload photo. Try again." | User taps avatar to retry. |
| Partial data load | Sections that loaded successfully display normally. Failed sections show skeleton states independently. | Pull-to-refresh retries all sections. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Settings gear: "Settings"
  - Avatar: "Profile photo, tap to edit" (or "Profile initial [letter], tap to add photo")
  - RPG level badge: "Level [number], tap to view character"
  - XP progress bar: "[current] of [total] XP to level [next level]"
  - Stats row: "[value] day streak, [value] missions completed, [value] Life Power, [value] total XP, tap to view character"
  - Quick link card: "[card name], [subtitle]" (e.g., "RPG character, Level 14 explorer")
  - Notification badge: "[card name], [count] new notifications"
  - "see all" link: "See all suggested modules"
  - Module card: "[module name] in [domain], [description], tap to open"
- **Focus order**: Settings gear -> Avatar -> User name -> RPG level badge -> XP bar -> Stats row -> Quick link cards (left to right, top to bottom, reading order: RPG character, Mission journal, Book of life, Connected apps, Subscription, Progress photos, Streaks, Achievements, Notifications, Help center) -> "suggested for you" eyebrow -> "see all" link -> Module cards (left to right)
- **Gesture alternatives**: All interactions are tap-based (no custom gestures). Horizontal scroll on explore cards also navigable via swipe-through in VoiceOver.
- **Reduced motion**: XP bar appears at final width instantly. Content entry stagger replaced with instant display. Quick link press scale animation disabled.

---

## Cross-References

- **Navigates to**: Screen [18] — Explore Section via "see all" (stack push), Screen [19] — RPG Character via level badge or stats row (stack push), Screen [20] — Personal Wiki via quick link (stack push), Screen [21] — Settings via gear icon (stack push), Screen [22] — Connected Services via quick link (stack push), Screen [23] — Subscription via quick link (stack push), Screen [24] — Notification History via quick link (stack push), Screen [25] — Help Center via quick link (stack push), Screen [49] — Progress Photos via quick link (stack push), Screen [50] — Profile Edit via avatar tap (stack push), Screen [59] — Streak Details via quick link (stack push), Screen [71] — Achievement Gallery via quick link (stack push), Screen [73] — Mission Journal via quick link (stack push), Domain dashboards via explore module cards (stack push)
- **Navigates from**: Bottom tab bar (tab switch), back from any Me sub-screen (stack pop)
- **Shared components with**: Screen [19] — RPG Character (stats row pattern, XP progress bar), Screen [18] — Explore Section (module card pattern), Screen [12] — Home Screen (bottom tab bar), Screen [49] — Progress Photos (photo thumbnail on quick link card), Screen [50] — Profile Edit (avatar tap target), Screen [59] — Streak Details (streak count on quick link card)
- **Patterns used**: Back Button (Batch 1, for sub-screens returning here), Bottom Tab Bar (_shared-patterns.md)
- **Patterns established**: Product Mode screen layout (no large title here — profile section replaces it), Stats row, Quick links grid (2x4 layout), Module card (Explore), Settings gear icon position, Avatar Camera Overlay (small camera icon indicating upload capability)
