# Screen Design: Mission Journal

**Screen**: 73 of 74
**File**: 73-mission-journal.md
**Register**: Product Mode
**Primary action**: Browse completed and archived mission history
**Tab**: Goals (stack depth 1), Me (stack depth 2), or from RPG Character (stack depth 2)
**Navigation**: Stack push from Mission Board [13] header journal icon, RPG Character [19] "View full journal" link, or Me Main [17] quick links grid. Back button returns to previous screen.

---

## Purpose

The Mission Journal is the retrospective companion to the Mission Board — where the Board is forward-looking ("what am I working on?"), the Journal is reflective ("what have I accomplished?"). Each completed mission entry includes an AI-authored summary that transforms raw data into a narrative micro-memoir, making the journal feel like a personal logbook of growth. Archived missions appear alongside completions, acknowledging that pivoting is part of the journey. Photo memories from the mission period add visual anchors to the history.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Mission entry cards — the dominant visual pattern, grouped by month
2. "Mission journal" title — screen identification
3. Filter chips — control mechanism for domain and type filtering
4. Month section headers — temporal grouping
5. SIA-authored summaries — narrative texture within each entry
6. Photo memory thumbnails — visual anchors to past progress

**User flow**:
- **Arrives from**: Mission Board [13] via stack push (journal icon in header), RPG Character [19] via stack push ("View full journal" link), Me Main [17] via stack push (quick links grid card)
- **Primary exit**: Previous screen via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Mission Detail [14] via stack push (tap completed entry to view full detail), Image Viewer [67] via modal present (tap photo thumbnails)

---

## Layout

**Scroll behavior**: SectionList (grouped by month, with sticky month headers)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ‹  Mission journal         │  ← back button + title
├─────────────────────────────┤
│                             │
│  [All] [By Domain▾] [By    │  ← filter chips
│   Type▾]                    │
│                             │  ← 16pt gap
│  MAY 2026                   │  ← month section header (sticky)
│  ┌───────────────────────┐  │
│  │ ✓  Run a half marathon│  │  ← completed mission entry
│  │    🥈main  🔴fitness   │  │
│  │    May 18 · 14 weeks   │  │
│  │    ⚡ 450 XP            │  │
│  │                         │  │
│  │    "You trained through │  │  ← SIA-authored summary
│  │     rain and doubt. 47  │  │
│  │     runs. One finish    │  │
│  │     line."              │  │
│  │                         │  │
│  │    📸 ○○○ 3 photos      │  │  ← photo memories
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ⊘  Learn to cook      │  │  ← archived mission entry
│  │    🥉side  🟢nutrition │  │
│  │    Archived May 12     │  │
│  │    ⚡ 63 XP (partial)   │  │
│  │                         │  │
│  │    "You explored 8 new  │  │
│  │     recipes before life │  │
│  │     shifted your focus."│  │
│  │                         │  │
│  │    📝 "Got too busy     │  │  ← user's archive note
│  │     with the new job."  │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  APRIL 2026                 │  ← next month header
│  ┌───────────────────────┐  │
│  │ ✓  Save $2,000        │  │
│  │    🥉side  🟢finance   │  │
│  │    Apr 28 · 6 weeks    │  │
│  │    ⚡ 120 XP            │  │
│  │                         │  │
│  │    "Six weeks of       │  │
│  │     discipline. Your    │  │
│  │     emergency fund is   │  │
│  │     real now."          │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│  ← tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Bar** — 44pt
   - Purpose: Back navigation and screen identification
   - Content: Back button (left), "Mission journal" title (center)

2. **Filter Chips Row** — 36pt chips + 16pt bottom gap = 52pt
   - Purpose: Filter journal entries by domain or mission type
   - Content: Horizontal scrollable chip row

3. **Month Section Headers** — 24pt per header
   - Purpose: Temporal grouping of journal entries
   - Content: Month/year label, sticky on scroll

4. **Journal Entry Cards** — variable (~180-240pt per card, 12pt gaps)
   - Purpose: The primary content — completed and archived mission records
   - Content: SectionList of journal entry cards grouped by month

5. **Bottom Spacer** — 24pt
   - Purpose: Breathing room above tab bar

---

## Components

### Navigation Bar
- **Purpose**: Back navigation and screen title
- **Visual treatment**: 44pt height, ink-900 bg.
- **Sub-elements**:
  - Back button: left chevron, white, 20pt icon, 44x44pt touch target, 16pt from left edge.
  - Title: "Mission journal" — 17pt Sora Semibold, white, center-aligned.
- **Gestures**: Back button tap → stack pop. iOS swipe-right-from-edge → stack pop.

### Filter Chips Row
- **Purpose**: Filter journal entries by domain or type
- **Visual treatment**: Horizontal ScrollView of chip buttons. No scroll indicator. 16pt left margin.
- **Sub-elements**:
  - "all" chip (default active): 36pt tall, pill, orange (#FF5E00) bg, white text
  - "by domain" chip: 36pt tall, pill, ink-brown-800 bg, 1pt white at 10% border, white at 60% text, small down-chevron (10pt). Tap → secondary row of domain color chips (animated slide-down, 280ms). Domain chips are toggleable (multi-select).
  - "by type" chip: 36pt tall, pill, ink-brown-800 bg, 1pt white at 10% border, white at 60% text, small down-chevron (10pt). Tap → secondary row of mission type pills (animated slide-down, 280ms). Type pills follow Mission Type Badge metallic colors but as filter chips.
  - 8pt gap between chips
- **Behavior**: "all" deactivates when domain or type sub-filters are active. Tapping "all" clears all sub-filters.

### Month Section Header
- **Purpose**: Temporal grouping label
- **Visual treatment**: "MAY 2026" — 13pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing. Left-aligned, 16pt left margin.
- **Spacing**: 32pt top margin (gap from previous section or filters), 12pt bottom margin
- **Sticky behavior**: Sticks to top of scroll area (below nav bar and filters) when section is scrolled into view. ink-900 bg when sticky.
- **Size**: Full-width, 24pt tall (text + vertical padding)

### Completed Mission Entry
- **Purpose**: Record of a successfully completed mission with SIA-authored narrative
- **Data source**: Missions system (completion data) + SIA narrative engine (summary text) + progress photos system
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout** (inside card):
  - Row 1 — Status + Name: Green checkmark icon (16pt, #34A853) + mission name (16pt Sora Semibold, white), 8pt gap between icon and name
  - Row 2 — Classification: Mission Type Badge + Domain Tag Chip(s), inline, 8pt gap, 4pt top margin
  - Row 3 — Metadata: Completion date + duration — "[Month] [day] · [##] weeks" — 13pt Sora Regular, white at 50%, 4pt top margin
  - Row 4 — XP earned: "⚡ [##] XP" — 13pt Sora Semibold, orange (#FF5E00), 4pt top margin
  - Row 5 — SIA summary (12pt top margin): 2-3 sentence AI-authored narrative — 14pt Sora Regular, white at 70%. Written in SIA's grounded coach voice, memoir-like tone. References specific data points (number of sessions, days, key milestones). No quotation marks — differentiated by opacity and top margin.
  - Row 6 — Photo memories (optional, 8pt top margin): Horizontal row of 3 circular thumbnails (32pt diameter each, 8pt gap) + count label "[##] photos" (12pt Sora Regular, white at 40%, 8pt right of thumbnails). Photos sourced from Progress Photos [49] taken during the mission period.
- **Size**: Full-width minus 32pt, ~180pt (without photos) to ~220pt (with photos)
- **Gestures**:
  - Tap card → stack push to Mission Detail [14] (showing completed state)
  - Tap photo thumbnails → modal present Image Viewer [67] with mission-period photos

### Archived Mission Entry
- **Purpose**: Record of an archived mission with partial progress acknowledgment
- **Visual treatment**: Same card pattern as Completed Mission Entry but with visual differences:
  - Card at 80% opacity (overall)
  - Status icon: Archive icon (⊘, 16pt, white at 40%) replaces green checkmark
  - XP shows partial: "⚡ [##] XP (partial)" — orange text, "(partial)" in white at 40%
  - SIA summary: Still present, written compassionately — acknowledges what was achieved and why the mission was archived
  - Archive note (optional, below SIA summary, 8pt top margin): 📝 icon (14pt, white at 40%) + user's contextual note text — 13pt Sora Regular, white at 50%, 1-3 lines. This is the note the user wrote when archiving from Mission Detail [14].
- **Size**: Full-width minus 32pt, ~180pt (without note) to ~220pt (with note)
- **Gestures**: Tap card → stack push to Mission Detail [14] (showing archived state)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Journal entry cards |
| Nav bar bg | #0A0A0F | ink-900 | Solid |
| Completed checkmark | #34A853 | green | Completion indicator |
| Archive icon | #FFFFFF at 40% | white/40 | Muted status |
| Mission name | #FFFFFF | white | Primary text |
| Metadata (date/duration) | #FFFFFF at 50% | white/50 | Secondary text |
| XP earned | #FF5E00 | orange | Reward |
| XP "(partial)" | #FFFFFF at 40% | white/40 | Modifier |
| SIA summary text | #FFFFFF at 70% | white/70 | Narrative text |
| Archive note text | #FFFFFF at 50% | white/50 | User note |
| Archive note icon | #FFFFFF at 40% | white/40 | 📝 indicator |
| Photo count label | #FFFFFF at 40% | white/40 | Metadata |
| Month headers | #FFFFFF at 40% | white/40 | Section labels |
| Active filter chip bg | #FF5E00 | orange | Selected filter |
| Active filter chip text | #FFFFFF | white | On orange bg |
| Inactive filter chip bg | #211008 | ink-brown-800 | Deselected |
| Inactive filter chip text | #FFFFFF at 60% | white/60 | Muted |
| Mission type badges | [metallic tones] | per type | See _shared-patterns.md |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |

**60/30/10 verification**: Orange on active filter chip, XP earned text. Green on completed checkmarks only. Purple absent from this screen (no SIA avatar or AI indicator — SIA summaries are text-only, differentiated by opacity). Domain colors on tag chips only. Metallic tones on type badges. Ratio holds — this is a subdued, reflective screen.

---

## Interaction States

### Journal Entry Card (Completed)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full content | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer: checkmark area + 3 text lines + thumbnail placeholders | — |

### Journal Entry Card (Archived)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg at 80% overall opacity | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Photo Thumbnails
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Circular 32pt thumbnails, 1pt white at 10% border | — |
| Pressed | scale(0.9) | light impact |
| Focus-visible | 2pt orange ring around thumbnail group | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Active | Orange bg, white text | light impact on activate |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to previous screen |
| Swipe right from left edge | Screen | iOS back gesture — stack pop |
| Tap | Filter chip ("all") | Clear all sub-filters |
| Tap | Filter chip ("by domain"/"by type") | Toggle sub-filter row |
| Tap | Domain/type sub-filter chip | Toggle filter (multi-select for domain, single-select for type) |
| Tap | Completed entry card | Stack push to Mission Detail [14] (completed state) |
| Tap | Archived entry card | Stack push to Mission Detail [14] (archived state) |
| Tap | Photo thumbnails | Modal present Image Viewer [67] with mission photos |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Filter chips | Screen mount | Fade-in + translateX(-12→0), staggered 60ms | 280ms each | ease-out-soft |
| Month headers | Screen mount | Fade-in | 160ms | ease-out-soft |
| Journal entry cards | Screen mount | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Photo thumbnails | Card enters viewport | Fade-in, staggered 60ms per thumbnail | 280ms each | ease-out-soft |
| Domain sub-filter row | "by domain" chip tap | Slide-down + fade-in (height 0→44pt) | 280ms | ease-out-soft |
| Type sub-filter row | "by type" chip tap | Slide-down + fade-in (height 0→44pt) | 280ms | ease-out-soft |
| Filter transition | Filter change | Crossfade old list → new list | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push (slide in from right), 280ms ease-out-soft. Content stagger begins after push completes.
- **Exit (back)**: Standard iOS stack pop (slide out to right), 280ms ease-out-soft.
- **Exit (to Mission Detail)**: Standard iOS stack push (slide left), 280ms ease-out-soft.
- **Exit (to Image Viewer)**: Modal slides up from bottom, 520ms ease-flow.

---

## Empty States

### No entries yet (new user or no completed/archived missions)
- Central empty state content (vertically centered in available space):
  - Heading: "no entries yet" — 20pt Sora Semibold, white
  - Body: "Complete or archive a mission and it'll appear here with a summary of your journey." — 15pt Sora Regular, white at 60%, center-aligned, max 280pt width
- Filter chips: hidden (no content to filter)

### Filtered empty state
When a filter returns no results:
- "no [filter] entries" — 17pt Sora Semibold, white, centered
- "Try a different filter or check back after completing more missions." — 15pt Sora Regular, white at 50%, centered
- Filter chips remain visible for adjustment

---

## Motivation Adaptation

- **Low motivation**: Same as default (journal is a read-only retrospective screen — simplifying it further provides no benefit)
- **Medium motivation** (default): Full journal entries with SIA summaries and photos
- **High motivation**: Additional data visible per entry — completion rate, daily average pace, chain context. Month-level stats summary card at top of each month section: "May 2026: 3 missions completed, 633 XP earned, 2 domains active"

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filter chip label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Filter chip label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Month section header | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 40% |
| Mission name (completed) | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission name (archived) | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Metadata (date/duration) | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| XP earned | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| XP "(partial)" | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| SIA summary | Sora | Regular (400) | 14pt | 20pt | #FFFFFF at 70% |
| Photo count label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Archive note text | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Empty state heading | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Empty state body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 60% |
| Filtered empty heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| High motivation month stats | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (journal fetch) | Entry cards show skeleton shimmer. Error banner at top. | Pull-to-refresh retries. Back navigation still functional. |
| API timeout (journal data) | After 8s, shows cached data if available. If no cache, "Couldn't load your journal." message with "try again" button. | Tap "try again" retries fetch. |
| SIA summary generation failure | Entry card renders without summary section (all other fields visible). Placeholder: "Summary generating..." in white at 30%. | Summary populates on next visit when available. |
| Photo thumbnails load failure | Thumbnail circles show placeholder (ink-brown-800 bg, no image). Photo count still shows. | Tap still opens Image Viewer [67] — viewer loads from source. |
| Filter returns empty (not an error) | "no [filter] entries" centered with help text. | User changes filter. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to previous screen"
  - Filter chip: "[filter name], [active/inactive], tap to filter"
  - Month header: "[month year] section"
  - Completed entry: "Completed: [mission name], [type] mission, [domain], completed [date], [XP] earned"
  - Archived entry: "Archived: [mission name], [type] mission, [domain], archived [date], [XP] partial XP earned"
  - SIA summary: "Summary: [summary text]"
  - Photo thumbnails: "View [count] progress photos from this mission"
  - Archive note: "Archive note: [note text]"
- **Focus order**: Back button → Filter chips (left to right) → Month header → Entry cards (top to bottom, each card as a unit, summary and photos as child elements) → Next month header → Next entries
- **Gesture alternatives**: Standard tap and swipe-from-edge navigation. No custom gestures required.
- **Reduced motion**: Staggered card entry replaced with instant display. Photo thumbnail stagger replaced with instant display. Filter transition crossfade replaced with instant swap.

---

## Cross-References

- **Navigates to**: Mission Detail [14] via stack push (tap entry card), Image Viewer [67] via modal present (tap photo thumbnails)
- **Navigates from**: Mission Board [13] via stack push (journal icon in header), RPG Character [19] via stack push ("View full journal" link), Me Main [17] via stack push (quick links grid card)
- **Shared components with**: Mission Board [13] (Filter Chip, Domain Tag Chip, Mission Type Badge), Mission Detail [14] (Mission Type Badge, Domain Tag Chip, archived state reference)
- **Patterns used**: Back Button, Domain Tag Chip (from Screen 12), Mission Type Badge (Phase 2), Filter Chips (from Screen 13, adapted for journal), Section Eyebrow Label (adapted as month header), 8-State Interaction Model, Motion Tokens, Staggered Content Entry
- **Patterns established**: Journal Entry Card (completed variant with SIA summary + photos, archived variant with partial XP + user note), Month-Grouped SectionList, Photo Memory Thumbnails (circular 32pt inline thumbnails linking to Image Viewer)
