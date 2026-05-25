# Screen Design: Personal Wiki / SIA Memory

**Screen**: 20 of 43
**File**: 20-personal-wiki-sia-memory.md
**Register**: Product Mode
**Primary action**: browse and edit what SIA knows about you
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via "book of life" quick link on Me Main.

---

## Purpose

The Personal Wiki is SIA's memory made visible — a browsable, editable knowledge base of everything the AI coach has learned about the user. Framed as the "Book of Life," it stores different chapters: personal details, preferences, behavioral patterns, cross-domain correlations, goals history, and life events. It grows over time into a comprehensive life record. This screen builds trust by making AI transparent ("here's exactly what SIA knows") and gives users control ("edit it, delete it, tell SIA it's wrong"). It's distinct from chat history (conversations) and journal entries (user-written). This is the AI-compiled knowledge base.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar — top, for finding specific memories (direct lookup)
2. Chapter tabs — horizontal scrolling pills to navigate between knowledge categories
3. Entry cards — scrollable list of wiki entries for the selected chapter
4. Entry detail — each card shows title, content, source, date, and actions (edit/delete/"this is wrong")

**User flow**:
- **Arrives from**: Me Main [17] ("book of life" quick link)
- **Primary exit**: Back → Me Main [17] (stack pop)
- **Secondary exits**: Tap correlation entry → SIA Chat [09] (tab switch with explanation context), edit entry → inline edit mode

---

## Layout

**Scroll behavior**: FlatList within selected chapter (entries can be numerous)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Book of life                │  ← Back + title (44pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔍 search memories...   │   │  ← Search bar (44pt)
│  └─────────────────────────┘   │
│                                 │
│  [About you][Prefer.][Patterns] │  ← Chapter tabs
│  [Correlat.][Goals H.][Life ev] │    horizontal scroll
│                                 │    (36pt)
│  ─────────────────────────────  │
│                                 │
│  23 entries · last updated today│  ← Chapter meta (20pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ Morning person           │   │
│  │ You tend to be most      │   │  ← Entry card
│  │ productive between       │   │    ~120pt each
│  │ 6-10am.                  │   │
│  │                         │   │
│  │ 📝 from conversation     │   │
│  │ May 3, 2026              │   │
│  │                         │   │
│  │ [edit] [this is wrong]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Prefers strength over    │   │
│  │ cardio                   │   │
│  │ SIA detected from your   │   │  ← Entry card
│  │ workout patterns.        │   │
│  │                         │   │
│  │ 🔍 detected from data    │   │
│  │ Apr 28, 2026             │   │
│  │                         │   │
│  │ [edit] [this is wrong]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ...more entries...             │
│                                 │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Back button + "book of life" title

2. **Search bar** — 44pt + 12pt top margin + 12pt bottom margin = 68pt
   - Full-width search input

3. **Chapter tabs** — 36pt + 12pt bottom margin = 48pt
   - Horizontal scrolling pill tabs

4. **Chapter meta** — 20pt + 16pt bottom margin = 36pt
   - Entry count + last updated

5. **Entry cards** — FlatList, variable height (~120pt per card, 12pt gaps)
   - Scrollable list of wiki entries

6. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern
  - Title: "book of life" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Search Bar
- **Purpose**: Find specific memories by keyword
- **Data source**: Client-side filter across all chapters (searches titles and content)
- **Visual treatment**: Same as Explore Section [18] search bar:
  - Full-width minus 32pt (16pt margins)
  - Height: 44pt
  - Background: ink-brown-800
  - Border: 1pt white at 10% (default), 2pt orange (focused)
  - Border-radius: --r-pill (999pt)
  - Left: magnifying glass 16pt, white at 40%
  - Placeholder: "search memories..." — 15pt Sora Regular, white at 40%
  - Right: clear X when text entered
- **Behavior**: When searching, chapter tabs become inactive (search spans all chapters). Results show entry cards with chapter name as a badge on each card. When cleared, returns to chapter view.
- **Gestures**: Tap → focus + keyboard. Tap X → clear.
- **Size**: full-width minus 32pt x 44pt

### Chapter Tabs
- **Purpose**: Navigate between wiki sections / knowledge categories
- **Data source**: Static chapter definitions + entry count per chapter from API
- **Visual treatment**: Horizontal ScrollView of pill-shaped tabs
  - Tab pill:
    - Height: 32pt
    - Padding: 12pt horizontal
    - Border-radius: --r-pill (999pt)
    - Active: orange (#FF5E00) fill, white text 13pt Sora Semibold
    - Inactive: transparent, 1pt border white at 10%, text 13pt Sora Regular white at 50%
    - Entry count badge: "(23)" appended to tab label in same weight, white at 40% on active, white at 30% on inactive
  - Tab spacing: 8pt between pills
  - Left padding: 16pt (aligned with screen margins)
  - Horizontal scroll, last tab has 16pt trailing padding
- **Chapters** (in order):
  1. "about you" — personal details SIA knows (name, age, preferences, family, etc.)
  2. "preferences" — communication style, schedule preferences, diet, SIA interaction preferences
  3. "patterns" — AI-discovered behavioral patterns ("you skip workouts on Mondays", "you spend more when stressed")
  4. "correlations" — cross-domain correlations (the browsable secret sauce: "your sleep quality correlates with next-day spending")
  5. "goals history" — archived goals, their outcomes, lessons learned
  6. "life events" — significant events SIA has recorded ("started new job May 2026", "moved to new city")
- **Variants**: Active chapter (orange fill), inactive (outlined). Search active → all tabs become inactive/dimmed.
- **Gestures**: Tap tab → switches to that chapter's entries (crossfade). Horizontal scroll to see more tabs.
- **Size**: full-width x 36pt (tabs) — scrollable horizontally

### Chapter Meta
- **Purpose**: Context for the current chapter
- **Data source**: API (entry count, last update timestamp)
- **Visual treatment**: 
  - Text: "23 entries · last updated today" — 12pt Sora Regular, white at 40%, left-aligned, 16pt left margin
  - Updates when chapter changes
- **Variants**: "0 entries" → shows empty state instead of entry list. "last updated 3 days ago", "last updated May 3"
- **Size**: full-width x 20pt

### Entry Card
- **Purpose**: Display a single wiki entry with content, source, and actions
- **Data source**: Wiki entries API (per chapter)
- **Visual treatment**:
  - Card: full-width minus 32pt (16pt margins), min-height ~120pt (variable based on content), ink-brown-800, border-radius 16pt, 1pt border white at 8%, padding 16pt
  - Content layout (top to bottom):
    - Title: 15pt Sora Semibold, white, left-aligned, 1-line, ellipsis if long
    - Content: 14pt Sora Regular, white at 70%, left-aligned, 4pt below title, 3 lines max with "show more" if longer. "show more" is 13pt Sora Semibold, orange.
    - Source indicator row: 12pt below content
      - Icon (12pt) + source text (12pt Sora Regular, white at 40%)
      - Conversation source: speech-bubble icon + "from conversation · [date]"
      - Data detection: search/radar icon + "detected from data · [date]"
      - User-edited: pencil icon + "edited by you · [date]"
    - Action row: 16pt below source, left-aligned
      - "edit" — 13pt Sora Semibold, white at 50%, 44x32pt touch target
      - "|" divider — white at 15%, 8pt horizontal margin
      - "this is wrong" — 13pt Sora Semibold, #f44336 (red), 44x32pt touch target
  - For correlation entries (chapter 4): additional element:
    - Confidence badge: "high confidence" / "medium confidence" / "low confidence" — 10pt Sora Semibold, pill shape, 6pt vertical padding, 10pt horizontal padding
      - High: green (#34A853) bg at 15%, green text
      - Medium: orange (#FF5E00) bg at 15%, orange text
      - Low: white at 10% bg, white at 40% text
    - Positioned: right-aligned on the title row
    - Tap correlation → SIA Chat with "explain this correlation" context
- **Card gap**: 12pt between cards
- **Variants**: 
  - Standard entry (About You, Preferences, Patterns, Life Events, Goals History)
  - Correlation entry (has confidence badge + tappable for SIA explanation)
  - Expanded (content fully shown after "show more" tap)
  - Edit mode (see Edit Mode component below)
  - Search result (has chapter badge pill: chapter name in tiny pill, top-right, white at 10% bg)
- **Gestures**: 
  - Tap "edit" → inline edit mode
  - Tap "this is wrong" → confirmation dialog, then marks entry for SIA review + removes or corrects
  - Tap "show more" → expands content
  - Tap correlation entry → SIA Chat [09] with context
- **Size**: full-width minus 32pt x variable (~120-180pt)

### Edit Mode (Inline)
- **Purpose**: Allow users to correct or update wiki entries
- **Data source**: Current entry data
- **Visual treatment**: Card transforms in-place:
  - Title becomes editable text input (same styling, underlined with orange 1pt)
  - Content becomes multiline text input (same styling, bordered with orange 1pt, min-height 80pt)
  - Source row remains visible but non-editable
  - Action row changes to:
    - "save" — 13pt Sora Semibold, orange (#FF5E00), 44x32pt touch target
    - "|" divider
    - "cancel" — 13pt Sora Semibold, white at 50%, 44x32pt touch target
    - "|" divider
    - "delete" — 13pt Sora Semibold, #f44336 (red), 44x32pt touch target
  - Card border changes to 1pt orange at 30% (indicates edit mode)
- **Gestures**: Tap "save" → saves changes, exits edit mode, updates source to "edited by you · [today]". Tap "cancel" → discards, exits edit. Tap "delete" → confirmation dialog → removes entry.
- **Size**: same footprint as entry card, slightly taller if content expanded

### "This Is Wrong" Confirmation
- **Purpose**: Let users flag incorrect information
- **Data source**: Entry ID
- **Visual treatment**: Bottom sheet (modal, slides up):
  - Height: ~200pt
  - Content: "is this information wrong?" — 17pt Sora Semibold, white, center-aligned. Below: "SIA will review and correct this. you can also edit it directly." — 14pt Sora Regular, white at 60%.
  - Actions:
    - "yes, remove it" — full-width orange CTA (Brand CTA Button pattern), 56pt
    - "edit instead" — full-width outlined button (transparent bg, 1pt white at 20% border, white text), 56pt
    - "cancel" — text link, center-aligned, white at 50%, 44pt touch target
- **Gestures**: Tap "yes, remove it" → entry removed with slide-out animation. Tap "edit instead" → dismisses sheet, enters edit mode. Tap "cancel" / drag down → dismiss sheet.

### Delete Confirmation
- **Purpose**: Prevent accidental deletion
- **Visual treatment**: Same bottom sheet pattern as "This Is Wrong" but:
  - Content: "delete this entry?" — 17pt Sora Semibold, white.
  - "this cannot be undone." — 14pt Sora Regular, white at 60%.
  - "delete" — full-width red CTA (#f44336 fill, white text), 56pt
  - "cancel" — text link, center-aligned, white at 50%, 44pt touch target

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Search bar bg | #211008 | ink-brown-800 | Input surface |
| Search bar border (focused) | #FF5E00 | Burnt Orange | 60% — focus |
| Active chapter tab fill | #FF5E00 | Burnt Orange | 60% — active control |
| Inactive chapter tab border | white at 10% | — | Subtle outline |
| Entry card surfaces | #211008 | ink-brown-800 | z-10 |
| Entry card borders | white at 8% | — | Glass edge |
| Entry card border (edit mode) | #FF5E00 at 30% | Burnt Orange | Edit indicator |
| Entry title | white 100% | — | Primary text |
| Entry content | white at 70% | — | Secondary text |
| Entry source text | white at 40% | — | Tertiary text |
| "edit" action | white at 50% | — | Subtle action |
| "this is wrong" action | #f44336 | Red | Destructive action |
| "show more" link | #FF5E00 | Burnt Orange | 60% — interactive |
| "save" action | #FF5E00 | Burnt Orange | 60% — primary action |
| "delete" action | #f44336 | Red | Destructive |
| Confidence: high | #34A853 at 15% bg, #34A853 text | Forest Green | 30% — positive |
| Confidence: medium | #FF5E00 at 15% bg, #FF5E00 text | Burnt Orange | 60% — caution |
| Confidence: low | white at 10% bg, white at 40% text | — | Neutral |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Chapter meta text | white at 40% | — | Tertiary |
| Confirmation CTA bg | #FF5E00 | Burnt Orange | 60% — primary |
| Delete CTA bg | #f44336 | Red | Destructive |

**60/30/10 verification**: Orange dominates through active chapter tab, focused search border, "show more" links, "save" action, edit mode border, confirmation CTA, and active tab. Green appears only on high-confidence correlation badges. Purple is absent — this is the user's wiki, not SIA's active coaching surface. SIA's presence is implicit (source indicators say "from conversation") rather than visually branded purple. Correct for this screen's purpose (user control, not AI presentation). Ratio holds.

---

## Interaction States

### Chapter Tab Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange fill, white text Semibold | — |
| Default (inactive) | transparent, white at 10% border, white at 50% text | — |
| Pressed (inactive) | bg white at 5%, text brightens to 70% | light impact |
| Focus-visible | 2pt orange ring inside pill | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Entry Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, border white at 8% | — |
| Pressed (correlation only) | scale(0.98), bg lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | title + 2-line content as skeleton shimmer | — |
| Error | N/A | — |
| Success | after save — brief green glow on card border (600ms) | success notification |

### "Show More" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "show more" 13pt Sora Semibold, Burnt Orange (#FF5E00) | — |
| Pressed | Orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Text changes to "show less" after content expands | — |

### "Edit" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 50%, 13pt Semibold | — |
| Pressed | white at 80%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "This Is Wrong" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #f44336, 13pt Semibold | — |
| Pressed | #f44336 at 60%, scale(0.95) | medium impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "Save" Button (Edit Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange, 13pt Semibold | — |
| Pressed | darker orange, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | 0.5 opacity (no changes made) | — |
| Loading | text replaced with small spinner (12pt, orange) | — |
| Error | text turns red briefly, card border flashes red (600ms) | error notification |
| Success | card border flashes green (600ms), exits edit mode | success notification |

### "Delete" Button (Edit Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #f44336, 13pt Semibold | — |
| Pressed | #f44336 at 60%, scale(0.95) | medium impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | text replaced with small spinner (12pt, red) | — |
| Error | N/A | — |
| Success | card slides out to left and collapses (280ms) | success notification |

### Search Bar
Per Explore Section [18] search bar states.

### Back Button
Per Batch 1 pattern.

### Confirmation Sheet CTA Buttons
Per Brand CTA Button pattern (Batch 1) for primary CTAs. Outlined variant for secondary.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Chapter tab | Switch to that chapter (crossfade entries) |
| Tap | Search bar | Focus search, show keyboard |
| Tap | Search clear (X) | Clear search, return to chapter view |
| Tap | "edit" on entry | Enter inline edit mode |
| Tap | "this is wrong" on entry | Show confirmation bottom sheet |
| Tap | "show more" on entry | Expand entry content |
| Tap | Correlation entry | Switch to SIA tab with explanation context |
| Tap | "save" in edit mode | Save changes, exit edit mode |
| Tap | "cancel" in edit mode | Discard changes, exit edit mode |
| Tap | "delete" in edit mode | Show delete confirmation sheet |
| Tap | Back button | Stack pop to Me Main [17] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Vertical scroll | Entry list | FlatList scroll through entries |
| Horizontal scroll | Chapter tabs | Browse chapter pills |
| Pull-to-refresh | Entry list | Refresh entries from API |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Chapter tabs | Screen mount | Fade-in, 80ms after search | 280ms | ease-out-soft |
| Entry cards | Chapter load | Staggered fade-in + translateY(12→0), 40ms per card | 280ms each | ease-out-soft |
| Chapter switch | Tab tap | Current entries fade-out (160ms), new entries stagger in (280ms, 40ms stagger) | ~440ms total | ease-out-soft |
| Entry expand ("show more") | Tap | Height animates to full content, content fades in | 280ms | ease-out-soft |
| Edit mode enter | Tap "edit" | Border color transitions to orange, action row crossfades | 280ms | ease-out-soft |
| Edit mode exit | Tap "save"/"cancel" | Reverse of enter | 280ms | ease-out-soft |
| Entry delete | Confirmed delete | Card slides left + fades out, below cards slide up to fill gap | 280ms | ease-out-soft |
| "This is wrong" removal | Confirmed | Same as delete animation | 280ms | ease-out-soft |
| Bottom sheet | Present | Slides up from bottom, backdrop fades to 60% | 280ms | ease-out-soft |
| Bottom sheet | Dismiss | Slides down, backdrop fades out | 280ms | ease-out-soft |
| Save success glow | After save | Card border green glow flash | 600ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to SIA via correlation)**: Tab switch crossfade. SIA pre-loads with correlation context.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user, sparse wiki)
- Chapter tabs all visible, most show "(0)" entry count except "about you" which has entries from onboarding (name, life areas of interest).
- Active chapter with 0 entries shows centered message:
  - "nothing here yet" — 17pt Sora Semibold, white, center-aligned
  - "as you talk with SIA and use Balencia, this chapter will fill with things SIA learns about you." — 14pt Sora Regular, white at 50%, center-aligned, 2-line max
  - No CTA needed — growth is automatic.
- "patterns" and "correlations" chapters: "SIA needs more time to discover your patterns. check back after a week or two of regular use." — warmer messaging, emphasizes growth over emptiness.

### Established user, empty chapter
- Same pattern but messaging adapts: "no correlations discovered yet" (if correlations tab is empty after data exists — rare edge case).

### Search with no results
- All entry cards hidden. Centered: "no memories match '[query]'" — 15pt Sora Regular, white at 40%. Below: "try a different search or browse by chapter" — 13pt Sora Regular, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Entry cards show less detail by default (title + 1-line content only, "show more" for everything). Correlation entries are simpler ("SIA noticed a connection between sleep and mood"). Source indicators hidden to reduce noise.
- **Medium motivation**: Default experience as described.
- **High motivation**: Entry cards show full content by default (no "show more" truncation). Correlation entries show detailed data ("when your sleep drops below 6 hours, next-day spending increases 23% on average, based on 45 data points"). Source indicators include specific dates and conversation references.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via correlation entry tap (tab switch with context), inline edit mode (in-screen state change)
- **Navigates from**: Me Main [17] via "book of life" quick link (stack push)
- **Shared components with**: Screen [18] — Explore Section (search bar pattern — identical), Screen [17] — Me Main (back navigation returns here)
- **Patterns used**: Back Button (Batch 1), Search Bar (established in Screen [18] this batch), Bottom Tab Bar (_shared-patterns.md), Brand CTA Button (Batch 1 — for confirmation sheet CTAs), Modal/Bottom Sheet (from _shared-patterns.md Modal Presentation pattern)
- **Patterns established**: Chapter tab bar (horizontal scrolling pill selector), Entry card (with source indicator, edit/delete/"this is wrong" actions), Confidence badge (high/medium/low), Inline edit mode (card transforms in-place), "This Is Wrong" confirmation flow, Delete confirmation bottom sheet
