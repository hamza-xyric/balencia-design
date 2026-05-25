# Screen Design: Explore Section

**Screen**: 18 of 73
**File**: 18-explore-section.md
**Register**: Product Mode
**Primary action**: discover and navigate to domain dashboards and features
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via "see all" from the Explore preview section on Me Main.

---

## Purpose

Explore is Balencia's feature discovery surface — the complete catalog of every domain dashboard and standalone feature, organized by life domain with AI-powered recommendations at the top. It solves the problem of "what else can I do in this app?" without requiring users to ask SIA. The "suggested for you" section uses AI context (recent goals, mood, time of day, underexplored domains) to surface the most relevant modules. Below that, a categorized grid lets users browse at their own pace. This replaces a traditional "more" tab or hamburger menu with a warm, browsable experience.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. "Suggested for you" — 2-3 AI-recommended module cards (most prominent, horizontal scroll)
2. Domain categories with module cards — grouped by life domain, each category a section with domain-colored header
3. Standalone features section — Journal, Habits, Calendar, Leaderboard, Community (not tied to a single domain)
4. Search bar — top, for direct lookup

**User flow**:
- **Arrives from**: Me Main [17] ("see all" link in Explore preview section)
- **Primary exit**: Tap module card → domain dashboard [26-36], wellbeing feature [44-63], or standalone feature [37-41, 45-48, 59, 61-62] (stack push)
- **Secondary exits**: Back → Me Main [17] (stack pop), search → filtered results

---

## Layout

**Scroll behavior**: SectionList (grouped sections with sticky section headers)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Explore                     │  ← Back + title row (44pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔍 search modules...    │   │  ← Search bar (44pt)
│  └─────────────────────────┘   │
│                                 │
│  SUGGESTED FOR YOU              │  ← Eyebrow (20pt)
│  ┌─────────┐ ┌─────────┐ ┌──  │
│  │ Module  │ │ Module  │ │ Mo │  ← Suggested cards
│  │ Card    │ │ Card    │ │ Ca │    horizontal scroll
│  │ 🟠sugg. │ │ 🟢new   │ │    │    ~140pt
│  └─────────┘ └─────────┘ └──  │
│                                 │
│  ● Fitness and movement         │  ← Domain section header
│  ┌──────────┐ ┌──────────┐     │
│  │Workouts  │ │Active    │     │  ← Module cards 2-col
│  │Dashboard │ │Workout   │     │    ~100pt per row
│  └──────────┘ └──────────┘     │
│                                 │
│  ● Nutrition and diet           │  ← Domain section header
│  ┌──────────┐ ┌──────────┐     │
│  │Nutrition │ │Food      │     │
│  │Dashboard │ │Logger    │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  ● Finance and money            │
│  ...                            │
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━     │  ← Divider
│  MORE FEATURES                  │  ← Standalone section
│  ┌──────────┐ ┌──────────┐     │
│  │Journal   │ │Habits    │     │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐     │
│  │Calendar  │ │Leader-   │     │
│  │          │ │board     │     │
│  └──────────┘ └──────────┘     │
│  ┌──────────┐                   │
│  │Community │                   │
│  └──────────┘                   │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Back button + "explore" title

2. **Search bar** — 44pt + 16pt top/bottom margin = 76pt
   - Full-width search input

3. **Suggested section** — ~180pt
   - Eyebrow header + horizontal scroll of module cards

4. **Domain sections** — variable height (one per active domain)
   - Section header + 2-column grid of module cards
   - ~9 sections × ~120pt average = ~1080pt

5. **Standalone features section** — ~240pt
   - "More features" header + 2-column grid

6. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern (left chevron, white, 44x44pt, 16pt from left)
  - Title: "explore" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Search Bar
- **Purpose**: Direct lookup of modules by name or domain
- **Data source**: Static module list (client-side filter)
- **Visual treatment**: 
  - Based on Text Input Field pattern (Batch 1) with modifications for search:
  - Full-width minus 32pt (16pt margins)
  - Height: 44pt (slightly shorter than form inputs)
  - Background: ink-brown-800 (#211008)
  - Border: 1pt solid white at 10% opacity (default), 2pt Burnt Orange (focused)
  - Border-radius: --r-pill (999pt) — pill shape differentiates from form inputs
  - Left icon: magnifying glass, 16pt, white at 40%, 16pt left padding
  - Placeholder: "search modules..." — 15pt Sora Regular, white at 40%
  - Text: 15pt Sora Regular, white
  - Right: clear button (X, 16pt) appears when text is entered, 44x44pt touch target
- **Behavior**: Filters the domain sections and standalone features in real-time as user types. Suggested section hides during search. Matching cards remain, non-matching cards hide with 160ms fade-out. If no results, centered message: "no modules match '[query]'" in 15pt Sora Regular, white at 40%.
- **Variants**: Empty (placeholder visible), Active (text entered, results filtered), No results
- **Gestures**: Tap → keyboard appears, search input focuses. Tap clear → clears text, resets view.
- **Size**: full-width minus 32pt x 44pt

### Suggested For You Section
- **Purpose**: AI-driven feature recommendations
- **Data source**: AI recommendation engine (context: recent goals, mood signals, time of day, underexplored domains)
- **Visual treatment**: 
  - Eyebrow header: "suggested for you" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 16pt below search bar
  - Horizontal ScrollView of module cards (same pattern as Me Main [17] Explore Preview):
    - Card width: 160pt, height: 120pt
    - Background: ink-brown-800, border-radius 16pt, 1pt border white at 8%
    - Padding: 16pt
    - Domain color dot (8pt) + domain name (11pt Sora Regular, white at 50%), single row
    - Module name: 15pt Sora Semibold, white, 12pt below
    - Description: 13pt Sora Regular, white at 40%, 2-line max, ellipsis
    - Badge: "suggested" (orange bg, white text) or "new" (green bg, white text) — 10pt Sora Semibold, top-right corner pill
  - Card spacing: 12pt, left padding 16pt, trailing padding 16pt
- **Variants**: AI-populated (2-3 cards), fallback popular (if AI unavailable)
- **Gestures**: Horizontal scroll. Tap card → domain dashboard or feature screen (stack push).
- **Size**: full-width x ~180pt (eyebrow 20pt + 16pt gap + 120pt cards + 24pt bottom margin)

### Domain Section
- **Purpose**: Category grouping for domain-specific modules
- **Data source**: Static module definitions + domain metadata
- **Visual treatment**:
  - Section header (sticky on scroll): 
    - Height: 32pt
    - Background: ink-900 (matches screen bg, becomes opaque when sticky)
    - Content: Domain color dot (8pt circle) + 8pt gap + domain name (14pt Sora Semibold, white at 70%, sentence case)
    - Padding: 16pt left, 16pt right
    - When sticky: adds 1pt bottom border white at 5%, slight backdrop-blur
  - Module cards (2-column grid):
    - Card width: (screen width - 32pt margins - 12pt gap) / 2
    - Card height: 88pt
    - Background: ink-brown-800, border-radius 14pt (--r-md), 1pt border white at 8%
    - Padding: 12pt
    - Content (top to bottom):
      - Module icon: 20pt, white at 60% (outlined style)
      - Module name: 14pt Sora Semibold, white, 8pt below icon
      - Description: 12pt Sora Regular, white at 40%, 1-line, ellipsis
    - Optional lock icon overlay: 12pt, white at 30%, bottom-right (for premium-only modules visible to free users)
    - Gap between cards: 12pt horizontal, 12pt vertical
- **Domain sections and their modules**:
  1. Fitness and movement: Workouts dashboard [26], Active workout [27], Progress photos [49]
  2. Nutrition and diet: Nutrition dashboard [28], Food logger [29], Recipes [56], Shopping list [57]
  3. Finance and money: Money map dashboard [30], Transaction detail [31]
  4. Career and work: Career dashboard [32]
  5. Relationships: Relationships dashboard [33]
  6. Spirituality: Spirituality dashboard [34]
  7. Learning and growth: Learning dashboard [35]
  8. Creativity: Creativity dashboard [36]
  9. Wellbeing: Water intake [44], Stress management [52], Breathing exercises [53], Meditation [54], Yoga sessions [55], Sleep tracking [58], Energy tracking [63], Medication tracking [60]
- **Variants**: All domains shown (not filtered by user interests — full catalog). Domains the user has explored get a subtle checkmark on the section header.
- **Gestures**: Tap card → domain dashboard or feature screen (stack push). Scroll through sections. Sticky headers remain visible.
- **Size**: variable per section (header 32pt + grid rows)

### Standalone Features Section
- **Purpose**: Features not tied to a single domain
- **Data source**: Static
- **Visual treatment**:
  - Divider: 1pt line, white at 8%, full-width minus 32pt, 24pt vertical margin above
  - Section header: "more features" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin
  - 2-column grid using same card pattern as domain sections
- **Features**:
  1. Journal [37] — icon: pen/notebook, description: "guided reflections"
  2. Habits [38] — icon: checkmark-circle, description: "daily habit tracking"
  3. Calendar [41] — icon: calendar, description: "schedule and planning"
  4. Leaderboard [39] — icon: trophy, description: "community rankings"
  5. Community [40] — icon: people/chat-bubbles, description: "chat rooms and groups"
  6. Daily check-in [45] — icon: sun/moon, description: "mood, energy, and intentions"
  7. Accountability [46] — icon: handshake, description: "accountability partners"
  8. Competitions [47] — icon: flag, description: "challenges and competitions"
  9. Intelligence dashboard [48] — icon: brain/sparkle, description: "AI insights and predictions"
  10. Streaks [59] — icon: flame, description: "streak details and rewards"
  11. Reminders [61] — icon: bell, description: "reminders and tasks"
  12. Quick notes [62] — icon: note/sticky, description: "capture quick thoughts"
- **Gestures**: Tap card → feature screen (stack push)
- **Size**: variable (header + 3 rows of 2-col grid = ~32pt + 3 × 100pt)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Search bar bg | #211008 | ink-brown-800 | Input surface |
| Search bar border (focused) | #FF5E00 | Burnt Orange | 60% — focus indicator |
| Module card surfaces | #211008 | ink-brown-800 | z-10 |
| Card borders | white at 8% | — | Glass edge |
| "suggested" badge bg | #FF5E00 | Burnt Orange | 60% — attention |
| "new" badge bg | #34A853 | Forest Green | 30% — freshness |
| Section header domain dots | per-domain hex | Domain colors | Identification only |
| Module icons | white at 60% | — | Neutral, not domain-colored |
| Module names | white 100% | — | Primary text |
| Module descriptions | white at 40% | — | Tertiary text |
| Eyebrow headers | white at 50% | — | Section labels |
| Search icon | white at 40% | — | Placeholder weight |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Lock icon (premium) | white at 30% | — | Subtle premium indicator |
| Sticky header bg | #0A0A0F | ink-900 | Matches background |

**60/30/10 verification**: Orange appears on focused search bar border, "suggested" badges, and active tab. Green appears only on "new" badges. Purple is absent (correct — no SIA/AI content on this screen; AI recommendations are signaled by the "suggested" badge, not purple). Domain colors strictly on section header dots. Ratio holds.

---

## Interaction States

### Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 10% border, placeholder visible | — |
| Focused | 2pt orange border, placeholder fades, cursor visible | light impact |
| Active (text entered) | orange border, text visible, clear X appears right | — |
| Focus-visible | 2pt orange ring (same as focused) | — |
| Disabled | N/A | — |
| Loading | N/A (client-side filter, instant) | — |
| Error | N/A | — |
| Success | N/A | — |

### Suggested Module Card (Horizontal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, lock icon visible | — |
| Loading | skeleton shimmer over card | — |
| Error | N/A | — |
| Success | N/A | — |

### Grid Module Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, lock icon if premium | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Search Clear Button (X)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | X icon, 16pt, white at 40% | — |
| Pressed | white at 70%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Back Button
Per Batch 1 pattern (see _shared-patterns.md).

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Module card (any) | Push domain dashboard or feature screen |
| Tap | Search bar | Focus search, show keyboard |
| Tap | Clear (X) button | Clear search, reset view |
| Tap | Back button | Stack pop to Me Main [17] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Horizontal scroll | Suggested cards | Browse recommendations |
| Vertical scroll | Full screen | SectionList scroll with sticky headers |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Suggested cards | Screen mount | Staggered fade-in + translateX(24→0), 80ms stagger | 280ms each | ease-out-soft |
| Domain section headers | Screen mount | Fade-in, sequential after suggested section | 280ms | ease-out-soft |
| Grid cards | Section visible | Staggered fade-in within section, 40ms stagger | 280ms each | ease-out-soft |
| Section header (sticky) | Scroll threshold | Backdrop-blur fades in, bottom border appears | 160ms | ease-out-soft |
| Search filter | Text input | Non-matching cards fade out, matching cards remain | 160ms | ease-out-soft |
| No results message | Search empty | Fade-in + translateY(8→0) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to dashboard/feature)**: Stack push — this screen slides left.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user)
- All modules shown (full catalog). Nothing is hidden.
- "suggested for you" shows 3 modules aligned with life areas selected during onboarding. Badges say "start here" (orange) instead of "suggested."
- No lock icons (assume free trial period or upsell happens contextually).

### Search with no results
- All sections hidden. Centered vertically: "no modules match '[query]'" — 15pt Sora Regular, white at 40%. Below: "try a different search" — 13pt Sora Regular, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Suggested section shows simpler, less intimidating modules (Journal, Habits) rather than data-heavy dashboards (Finance, Career). Section order unchanged.
- **Medium motivation**: Default experience.
- **High motivation**: Suggested section may show advanced features (correlations, analytics). Module cards could show a tiny stat preview (e.g., "Fitness — Lv.12" below the description) for domains the user is active in.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title ("explore") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Search bar placeholder | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Search bar text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| "suggested for you" eyebrow | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| Suggested card domain name | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 50% |
| Suggested card module name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Suggested card description | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Suggested card badge text | Sora | Semibold (600) | 10pt | 14pt | #FFFFFF |
| Domain section header name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF at 70% |
| Grid card module name | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| Grid card description | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| "more features" section header | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| No results message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| No results sub-message | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 30% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| AI recommendations API failure | "Suggested for you" section falls back to 3 static popular module cards. Badges show "popular" instead of "suggested." | Pull-to-refresh retries AI recommendations. Fallback always available. |
| Network failure (full) | Module catalog is static/cached client-side, so domain sections and standalone features still display. "Suggested for you" falls back to popular. | Search still works (client-side filter). Pull-to-refresh retries AI suggestions. |
| Search returns no results | All sections hidden. Centered: "no modules match '[query]'" with "try a different search" hint below. | User modifies search query or clears search to reset view. |
| Module navigation failure (target screen fails to load) | Standard stack push occurs; error handled by target screen. | User can back-navigate and retry. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to Me"
  - Search bar: "Search modules, text field"
  - Search clear button: "Clear search"
  - "suggested for you" section: "Suggested modules for you"
  - Suggested module card: "[module name] in [domain], [description], [badge if present], tap to open"
  - Domain section header: "[domain name] modules"
  - Grid module card: "[module name], [description], tap to open" (with "premium" announcement if lock icon present)
  - "more features" section: "Additional features"
- **Focus order**: Back button -> Search bar -> Suggested cards (left to right) -> Domain sections (top to bottom, with section header then cards left to right per row) -> "more features" header -> Standalone feature cards (left to right, row by row)
- **Gesture alternatives**: Horizontal scroll on suggested cards also navigable via VoiceOver swipe. Sticky headers announce domain name when scrolling into a new section.
- **Reduced motion**: Staggered card entry replaced with instant display. Sticky header backdrop-blur appears instantly. Search filter fade-out replaced with instant hide/show.

---

## Cross-References

- **Navigates to**: All domain dashboards [26-36] via module cards (stack push), Wellbeing features — Water intake [44], Stress management [52], Breathing exercises [53], Meditation [54], Yoga sessions [55], Sleep tracking [58], Energy tracking [63], Medication tracking [60] (stack push), Nutrition features — Recipes [56], Shopping list [57] (stack push), Fitness features — Progress photos [49] (stack push), Standalone features — Journal [37], Habits [38], Calendar [41], Leaderboard [39], Community [40], Daily check-in [45], Accountability [46], Competitions [47], Intelligence dashboard [48], Streaks [59], Reminders [61], Quick notes [62] (all stack push)
- **Navigates from**: Me Main [17] via "see all" (stack push)
- **Shared components with**: Screen [17] — Me Main (module card pattern — identical card spec), Screen [12] — Home Screen (domain-colored tags)
- **Patterns used**: Back Button (Batch 1), Text Input Field (Batch 1 — adapted for search), Bottom Tab Bar (_shared-patterns.md), Module Card (established in Screen [17] this batch), Domain Tag Chip (domain dot variant — color dot + name)
- **Patterns established**: Search bar (pill variant), Domain section with sticky header, Grid module card (2-column variant), Standalone features section, Client-side search filter behavior
