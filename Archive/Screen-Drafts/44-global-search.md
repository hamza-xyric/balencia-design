# Screen Design: Global Search

**Screen**: 44 of 44
**File**: 44-global-search.md
**Register**: Product Mode
**Primary action**: Search across all app content
**Tab**: None (full-screen overlay from any screen)
**Navigation**: Full-screen overlay (slides down from top). Accessible from search icon in Home [12] sticky header and from Me [17] tab. Dismisses via cancel button or swipe-down.

---

## Purpose

Global search lets users find anything across Balencia's 9 domains — goals, actions, SIA conversations, journal entries, personal wiki pages, habits, and scheduled events. With 43+ screens of content, structured search is essential. Results are grouped by type with section headers so users can scan visually by category. Quick filter chips narrow results to a single domain type. The "Ask SIA" option redirects any query to a SIA conversation when structured results don't satisfy, ensuring no search is a dead end.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search input field — auto-focused, keyboard appears immediately, highest interaction priority
2. Quick filter chips — horizontal scroll row for narrowing results by type
3. Recent searches — last 5 searches (shown when input is empty, providing fast re-entry)
4. Search results — grouped by type with section headers, the primary content zone
5. "Ask SIA" fallback — always visible at bottom of results, ensures every search has an exit

**User flow**:
- **Arrives from**: Home Screen [12] via overlay slide-down (tap search icon in sticky header), Me Main [17] via overlay slide-down (tap search icon)
- **Primary exit**: Goal Detail [14] via dismiss overlay + stack push (tap goal result)
- **Secondary exits**: SIA Chat [09] via dismiss overlay + tab switch (tap "ask SIA" card or SIA conversation result), Journal [37] via dismiss overlay + stack push (tap journal result), Habits [38] via dismiss overlay + stack push (tap habit result), Personal Wiki [20] via dismiss overlay + stack push (tap wiki result)
- **Dismiss**: Cancel button (top-right) or swipe-down gesture

---

## Layout

**Scroll behavior**: FlatList (single continuous list — recent searches or grouped results depending on input state)
**Tab bar visible**: No (full-screen overlay, no tab bar)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ┌─────────────────┐ Cancel │  ← Search bar + cancel
│  │ 🔍 Search...     │        │     48pt row
│  └─────────────────┘        │
│                             │
│  [All] [Goals] [SIA] [Journal] [Habits] [Wiki] │  ← Filter chips, horizontal scroll
│                             │
│  RECENT                     │  ← Section eyebrow (when input empty)
│  🕐 half marathon            │  ← Recent search rows
│  🕐 sleep correlation        │
│  🕐 budget groceries         │
│                             │
│  ─ ─ ─ OR when typing ─ ─  │
│                             │
│  GOALS (3)                  │  ← Results grouped by type
│  ┌───────────────────────┐  │
│  │ ◯ Run half marathon   │  │  ← Goal result card
│  │   fitness · 68%       │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ◯ Save $5,000        │  │
│  │   finance · 42%      │  │
│  └───────────────────────┘  │
│                             │
│  SIA CONVERSATIONS (2)      │
│  ┌───────────────────────┐  │
│  │ "Your sleep patterns   │  │  ← Chat result preview
│  │  have improved..."     │  │
│  │  May 18 · wellbeing   │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 💬 Ask SIA about       │  │  ← Always-visible SIA fallback
│  │   "half marathon"      │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  (no tab bar — overlay)     │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Search Header Row** — 48pt
   - Purpose: Primary input zone — search field and cancel action
   - Content: Search input bar (left), cancel button (right)
   - Behavior: Pinned at top (does not scroll), keyboard rises immediately on mount

2. **Filter Chip Row** — 52pt (36pt chips + 8pt vertical padding above + 8pt below)
   - Purpose: Narrow results to a single content type
   - Content: Horizontal scroll of filter chips — "all", "goals", "SIA chats", "journal", "habits", "wiki"
   - Behavior: Pinned below search header, scrolls horizontally

3. **Recent Searches Section** — variable (~220pt for 5 items) — visible when input is empty
   - Purpose: Fast re-entry to previous searches
   - Content: Section eyebrow "RECENT" + up to 5 recent search rows

4. **Search Results Sections** — variable — visible when input has text
   - Purpose: Grouped results by content type
   - Content: Section headers with counts + result cards per type (goals, SIA conversations, journal entries, habits, wiki pages)

5. **Ask SIA Card** — 56pt — always visible at bottom of results
   - Purpose: Fallback when structured results are insufficient
   - Content: Chat bubble icon + "ask SIA about \"[query]\"" + chevron

6. **No Results State** — ~160pt — visible when query returns zero results
   - Purpose: Acknowledge empty results, redirect to SIA
   - Content: Empty state message + ask SIA card

---

## Components

### Search Input Bar
- **Purpose**: Primary text input for search queries — extended from shared Search Bar pattern
- **Data source**: User input (local text state)
- **Visual treatment**: ink-brown-800 (#211008) background, --r-md (14pt) border radius. Full-width minus 80pt (16pt left margin + 64pt cancel button area). Height 44pt.
- **Sub-elements**:
  - Search icon: 16pt, white at 40%, 12pt from left edge
  - Placeholder: "search everything" — 15pt Sora Regular, white at 40%
  - Input text: 15pt Sora Regular, white
  - Clear button: 16pt circle with "x", white at 40%, appears when text is entered, right side of input. Tap clears text and returns to recent searches view.
- **Behavior**: Auto-focused on mount (keyboard appears immediately). Focused border: 2pt orange (#FF5E00).
- **Size**: Full-width minus 80pt, 44pt tall

### Cancel Button
- **Purpose**: Dismiss the search overlay
- **Visual treatment**: "cancel" — 15pt Sora Regular, orange (#FF5E00). No background.
- **Size**: 44x44pt touch target, right-aligned, vertically centered with search input
- **Behavior**: Tap dismisses overlay (slide up + keyboard drop)

### Filter Chip Row
- **Purpose**: Narrow search results to a single content type
- **Data source**: Local filter state (default: "all")
- **Visual treatment**: Horizontal scrollable row, reuses Filter Chip pattern from _shared-patterns.md
- **Sub-elements**:
  - Chips: "all", "goals", "SIA chats", "journal", "habits", "wiki"
  - Chip height: 36pt
  - Border radius: --r-pill (999pt)
  - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
  - Active: orange (#FF5E00) bg, white text
  - Gap: 8pt between chips
  - Leading margin: 16pt
- **Behavior**: Only one chip active at a time. "all" is default. Tapping a chip filters results to that type only. Selecting "all" shows all result types.
- **Size**: Full-width, 36pt chip height, 52pt total row height with padding

### Recent Search Row
- **Purpose**: Quick access to previous searches
- **Data source**: Local search history (last 5 searches, persisted)
- **Visual treatment**: Flat row, no card surface
- **Sub-elements**:
  - Clock icon: 14pt, white at 30%, left-aligned
  - Search text: 15pt Sora Regular, white at 70%, 12pt gap from icon
- **Size**: Full-width minus 32pt (16pt margins), 44pt tall per row
- **Gestures**:
  - Tap: re-execute search (populates input field and triggers search)
  - Swipe left: delete from history (red "delete" action revealed, 280ms ease-out-soft)

### Search Result — Goal Card (compact)
- **Purpose**: Display a matching goal with progress indicator
- **Data source**: Goals system (goal name, domain, completion percentage)
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 12pt internal padding
- **Sub-elements**:
  - Progress ring (small): 36pt diameter, 3pt stroke. Track: white at 10%. Fill: orange (#FF5E00). Green (#34A853) if 100%.
  - Goal name: 15pt Sora Semibold, white, right of ring, 12pt gap
  - Domain tag chip: 11pt Sora Semibold, domain color, pill shape, below goal name
  - Percentage: 13pt Sora Semibold, white, centered inside ring
- **Size**: Full-width minus 32pt, ~64pt tall
- **Gestures**: Tap → dismiss search overlay + stack push to Goal Detail [14]

### Search Result — SIA Conversation
- **Purpose**: Display a matching SIA conversation with message preview
- **Data source**: SIA conversation history (message text, date, domain tags)
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 12pt internal padding
- **Sub-elements**:
  - Message preview: 15pt Sora Regular, white at 70%, 2 lines max (truncate with ellipsis)
  - Date: 12pt Sora Regular, white at 40%, below preview
  - Domain tag chips: inline right of date, 8pt gap between
- **Size**: Full-width minus 32pt, ~72pt tall
- **Gestures**: Tap → dismiss search overlay + navigate to SIA Chat [09] at that conversation point

### Search Result — Journal Entry
- **Purpose**: Display a matching journal entry with date and mood
- **Data source**: Journal system (entry text, date, mood emoji, domain tags)
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 12pt internal padding
- **Sub-elements**:
  - Date: 13pt Sora Semibold, white at 70%, left-aligned
  - Mood emoji: 16pt, 8pt right of date
  - Text preview: 13pt Sora Regular, white at 70%, 1 line max (truncate with ellipsis), below date row
  - Domain tag chips: inline, right-aligned within card
- **Size**: Full-width minus 32pt, ~56pt tall
- **Gestures**: Tap → dismiss search overlay + stack push to Journal [37] at that entry

### Search Result — Habit
- **Purpose**: Display a matching habit with streak information
- **Data source**: Habits system (habit name, streak count, domain)
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 12pt internal padding
- **Sub-elements**:
  - Habit name: 15pt Sora Semibold, white, left-aligned
  - Streak info: 13pt Sora Regular, white at 50%, right of name — e.g., "12-day streak"
  - Domain tag chip: right-aligned
- **Size**: Full-width minus 32pt, ~48pt tall
- **Gestures**: Tap → dismiss search overlay + stack push to Habits [38]

### Search Result — Wiki Page
- **Purpose**: Display a matching personal wiki page with title and preview
- **Data source**: Personal wiki system (page title, content preview)
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 12pt internal padding
- **Sub-elements**:
  - Page title: 15pt Sora Semibold, white, left-aligned
  - Preview text: 13pt Sora Regular, white at 50%, 1 line max (truncate with ellipsis), below title
- **Size**: Full-width minus 32pt, ~56pt tall
- **Gestures**: Tap → dismiss search overlay + stack push to Personal Wiki [20]

### Search Result Ranking

Results within each type group are ordered by a composite relevance score:

**Ranking factors (in priority order):**
1. **Exact match** (query appears in title/name): weight 50%
2. **Recency** (last modified/created date): weight 30%
3. **Engagement frequency** (how often user interacts with this item): weight 20%

**Within-type ordering:** highest composite score first
**Cross-type section ordering:** Goals → SIA conversations → Habits → Journal → Wiki → Schedule (fixed order, not ranked)

**Special cases:**
- Active/in-progress items rank above completed/archived items regardless of score
- Pinned or starred items (if applicable) appear first within their type group

### Search Performance Strategy

- **Dataset < 100 items total**: client-side filtering (instant, no debounce needed)
- **Dataset 100-500 items**: client-side filtering with 150ms debounce on keystroke
- **Dataset > 500 items**: API search with 300ms debounce. Show skeleton loading (3 placeholder rows per type section) while waiting for results.
- **Minimum query length**: 1 character (single character triggers search)
- **Search scope**: titles, names, and first 200 characters of body content. Does NOT search full conversation transcripts (too expensive — use SIA Chat for conversation search).
- **Case-insensitive**: all searches are case-insensitive
- **Partial match**: "fit" matches "Fitness", "outfit", "fitness goal" — prefix and substring matching supported

### Ask SIA Card
- **Purpose**: Always-visible fallback that redirects the search query to a SIA conversation
- **Data source**: Current search query text
- **Visual treatment**: ink-brown-800 (#211008) card, --r-md (14pt), 16pt internal padding. 1pt orange (#FF5E00) at 20% border.
- **Sub-elements**:
  - Chat bubble icon: 20pt, orange (#FF5E00), left-aligned
  - Label: "ask SIA about \"[query]\"" — 15pt Sora Semibold, white, 12pt right of icon. Query text inserted dynamically.
  - Chevron: 14pt, white at 40%, right-aligned
- **Size**: Full-width minus 32pt, 56pt tall
- **Gestures**: Tap → dismiss search overlay + navigate to SIA Chat [09] with query pre-filled as user message
- **Variants**: When input is empty, card reads "ask SIA anything" (no quoted query)

### Section Header (Result Groups)
- **Purpose**: Labels each result group with type name and count
- **Visual treatment**: Same as Section Eyebrow Label pattern — 11pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing
- **Content format**: "GOALS (3)", "SIA CONVERSATIONS (2)", "JOURNAL (1)", etc.
- **Spacing**: 24pt above (gap from previous section), 8pt below (tight coupling to first result card)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Search placeholder | Sora | 400 (Regular) | 15pt | 20pt | White at 40% | "search everything" |
| Search input text | Sora | 400 (Regular) | 15pt | 20pt | White #FFFFFF | User typing |
| Cancel button | Sora | 400 (Regular) | 15pt | 20pt | #FF5E00 | Tappable text |
| Filter chip label | Sora | 600 (Semibold) | 13pt | 17pt | White at 60% / White | Inactive / active |
| Section eyebrow | Sora | 600 (Semibold) | 11pt | 14pt | White at 40% | Uppercase, +0.12em |
| Recent search text | Sora | 400 (Regular) | 15pt | 20pt | White at 70% | History items |
| Goal name (result) | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | Primary result text |
| Goal percentage | Sora | 600 (Semibold) | 13pt | 17pt | White #FFFFFF | Inside progress ring |
| SIA message preview | Sora | 400 (Regular) | 15pt | 20pt | White at 70% | 2 lines max |
| Journal date | Sora | 600 (Semibold) | 13pt | 17pt | White at 70% | Entry date |
| Journal preview | Sora | 400 (Regular) | 13pt | 17pt | White at 70% | 1 line max |
| Habit name | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | Primary result text |
| Streak info | Sora | 400 (Regular) | 13pt | 17pt | White at 50% | "12-day streak" |
| Wiki page title | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | Primary result text |
| Wiki preview | Sora | 400 (Regular) | 13pt | 17pt | White at 50% | 1 line max |
| Ask SIA label | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | "ask SIA about..." |
| Result date/meta | Sora | 400 (Regular) | 12pt | 16pt | White at 40% | Timestamps |
| Domain tag text | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] | Tag chips |
| No results title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | Empty state heading |
| No results subtitle | Sora | 400 (Regular) | 14pt | 18pt | White at 50% | Helper text |

---

## Composition & Visual Hierarchy

**Squint test**:
- Search input bar dominates the top — largest interactive element, immediately draws eye and keyboard focus
- Filter chip row provides a secondary visual band of small, tappable pills below the search bar
- In the empty-input state, recent searches are muted (white at 70%) and low-contrast — they suggest without demanding
- In the results state, section headers (uppercase, white at 40%) break the content into scannable groups
- Result cards are uniform in surface color (ink-brown-800) but vary in height by type, creating rhythm
- The Ask SIA card at the bottom uses an orange-tinted border, making it visually distinct from result cards — a clear "escape hatch"
- No competing colors — orange is used only for the active filter chip, cancel button, and Ask SIA accent

**Spacing breakdown (8pt grid)**:
- Status bar: 44pt
- Search header row: 48pt (44pt input + 2pt top padding + 2pt bottom padding)
- Search header to filter chips: 8pt (--s-2)
- Filter chip row: 52pt (8pt top + 36pt chips + 8pt bottom)
- Filter chips to content: 16pt (--s-4)
- Section eyebrow above: 24pt (--s-5) from previous section
- Section eyebrow to first result: 8pt (--s-2)
- Between result cards within section: 8pt (--s-2)
- Between sections: 24pt (--s-5)
- Last result to Ask SIA card: 16pt (--s-4)
- Ask SIA card bottom padding: 16pt + safe area inset

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Overlay background |
| Search input bg | #211008 | ink-brown-800 | + --r-md |
| Search input focused border | #FF5E00 | orange | 2pt border on focus |
| Search icon | #FFFFFF at 40% | white/40 | Left of input |
| Placeholder text | #FFFFFF at 40% | white/40 | "search everything" |
| Input text | #FFFFFF | white | User typing |
| Clear button | #FFFFFF at 40% | white/40 | "x" circle |
| Cancel button text | #FF5E00 | orange | Dismiss action |
| Filter chip (active) bg | #FF5E00 | orange | Selected chip fill |
| Filter chip (active) text | #FFFFFF | white | On orange bg |
| Filter chip (inactive) bg | #211008 | ink-brown-800 | Unselected |
| Filter chip (inactive) border | #FFFFFF at 10% | white/10 | Subtle border |
| Filter chip (inactive) text | #FFFFFF at 60% | white/60 | Muted label |
| Recent search icon | #FFFFFF at 30% | white/30 | Clock icon |
| Recent search text | #FFFFFF at 70% | white/70 | History label |
| Section eyebrow | #FFFFFF at 40% | white/40 | "GOALS (3)" |
| Result card surface | #211008 | ink-brown-800 | All result cards |
| Result primary text | #FFFFFF | white | Goal name, habit name, wiki title |
| Result secondary text | #FFFFFF at 70% | white/70 | Message previews, journal text |
| Result meta text | #FFFFFF at 40% | white/40 | Dates, timestamps |
| Progress ring fill | #FF5E00 | orange | Active goal progress |
| Progress ring fill (100%) | #34A853 | green | Completed goal |
| Progress ring track | #FFFFFF at 10% | white/10 | Inactive ring track |
| Domain tag chips | [domain color] at 15% bg, [domain color] text | per domain | Identification only |
| Ask SIA icon | #FF5E00 | orange | Chat bubble |
| Ask SIA border | #FF5E00 at 20% | orange/20 | Card border accent |
| Ask SIA chevron | #FFFFFF at 40% | white/40 | Navigation hint |
| No results title | #FFFFFF | white | Empty state heading |
| No results subtitle | #FFFFFF at 50% | white/50 | Helper text |

**60/30/10 verification**: Orange is used for interactive affordances — active filter chip, cancel button, search input focus border, Ask SIA icon and border, progress ring fill. Green appears only on 100% completed goal rings within results. Purple is absent (no SIA coaching note on this screen — SIA appears only as a navigation target via the Ask SIA card). Domain colors appear only on tag chips within results. Ratio holds.

---

## Interaction States

### Search Input Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default (focused) | ink-brown-800 bg, 2pt orange border, cursor blinking | — |
| Typing | Text appears, clear button fades in | — |
| Empty (after clearing) | Placeholder returns, clear button fades out | — |
| Disabled | N/A (always interactive when overlay is open) | — |
| Loading | N/A (input is local, not async) | — |
| Error | N/A (no validation on search input) | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 10% border, white at 60% text | — |
| Default (active) | Orange bg, white text | — |
| Pressed | scale(0.95), bg darkens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Recent Search Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Flat row, clock icon + text | — |
| Pressed | Full row bg: white at 5% | light impact |
| Focus-visible | 2pt orange ring around row, offset 2pt | — |
| Swiping left | Row translates, red "delete" bg reveals | light impact at 30% threshold |

### Search Result Cards (Goal, SIA, Journal, Habit, Wiki)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg | — |
| Pressed | scale(0.97), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer (ink-brown-800 to lighter pulse) | — |

### Ask SIA Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt orange at 20% border | — |
| Pressed | scale(0.97), border brightens to orange at 40% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Cancel Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text, no bg | — |
| Pressed | Orange at 50% text (dims) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Clear Button (inside search input)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 40% "x" circle | — |
| Pressed | White at 70% (brightens) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Search input | Focus input (already focused on mount) |
| Tap | Clear button | Clear search text, return to recent searches |
| Tap | Cancel button | Dismiss overlay (slide up + keyboard drop) |
| Tap | Filter chip | Switch active filter, re-filter results |
| Tap | Recent search row | Populate input + execute search |
| Tap | Any result card | Dismiss overlay + navigate to target screen |
| Tap | Ask SIA card | Dismiss overlay + navigate to SIA Chat [09] with query |
| Swipe left | Recent search row | Reveal "delete" action |
| Swipe down (>30% height) | Overlay | Dismiss overlay (slide up + keyboard drop) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Overlay enter | Mount | Slide down from top (translateY: -100%→0) + ink-900 bg fades in | 280ms | ease-out-soft |
| Keyboard rise | Mount (simultaneous with overlay) | System keyboard slides up | 280ms | system default |
| Overlay dismiss | Cancel / swipe-down | Slide up (translateY: 0→-100%) + keyboard drops | 280ms | ease-out-soft |
| Filter chip select | Tap chip | Orange fill slides to new chip (bg transition) | 280ms | ease-out-soft |
| Results appear | Query change | Staggered fade-in (opacity 0→1 + translateY 8→0), 80ms between groups | 280ms each | ease-out-soft |
| Result card press | Touch down | scale(1→0.97) | 160ms | ease-out-soft |
| Result card release | Touch up | scale(0.97→1) | 160ms | ease-out-soft |
| Clear button appear | Text entered | Fade-in (opacity 0→1) | 160ms | ease-out-soft |
| Clear button disappear | Text cleared | Fade-out (opacity 1→0) | 160ms | ease-out-soft |
| Recent search delete | Swipe left confirmed | Row slides off left + collapse gap | 280ms | ease-out-soft |
| No results state | Zero results returned | Fade-in (opacity 0→1) | 280ms | ease-out-soft |
| Section eyebrows | Content appears | Fade-in (opacity 0→1) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Overlay slides down from top (translateY: -100%→0), 280ms ease-out-soft. Keyboard rises simultaneously. Background (previous screen) remains visible but dims (ink-900 at 60% scrim).
- **Dismiss (cancel/swipe-down)**: Overlay slides up (translateY: 0→-100%), keyboard drops simultaneously, 280ms ease-out-soft. Scrim fades out.
- **Dismiss (result tap)**: Overlay slides up (same animation), then target screen navigation executes after overlay is fully dismissed (280ms delay before push/switch).

---

## Empty States

### Fresh state (no recent searches, input empty)
- **Recent searches section**: Hidden entirely (no "RECENT" eyebrow rendered)
- **Body**: Centered placeholder — "search goals, habits, journal, SIA chats, and more" (14pt Sora Regular, white at 40%), vertically positioned at ~30% screen height
- **Ask SIA card**: Visible at bottom, reads "ask SIA anything"
- **Filter chips**: All visible but "all" is active — tapping a specific chip has no effect until a query is entered

### No results (query entered, zero matches)
- **Section headers**: None rendered
- **Body**: Centered message
  - "no results for \"[query]\"" — 17pt Sora Semibold, white
  - "try different words or ask SIA" — 14pt Sora Regular, white at 50%, 8pt below
- **Ask SIA card**: Visible below empty state message, reads "ask SIA about \"[query]\""
- **Filter chips**: Remain interactive — user can switch filter in case results exist in another type

### Filtered no results (query has results in other types but not in selected filter)
- **Body**: Centered message
  - "no [type] results for \"[query]\"" — 17pt Sora Semibold, white (e.g., "no goals results for \"sleep\"")
  - "try \"all\" or a different filter" — 14pt Sora Regular, white at 50%, 8pt below
- **Ask SIA card**: Visible, same as above

---

## Motivation Adaptation

- **Low motivation** (SIA detects fatigue, low engagement):
  - Search remains fully functional — no content reduction (search is user-initiated, not ambient)
  - Result density: same as default (user is actively looking for something)
  - Ask SIA card tone: unchanged

- **Medium motivation** (default):
  - All result types shown, grouped with section headers
  - Up to 3 results per type in "all" filter view (tap section header to see full list within that type)
  - Recent searches: last 5

- **High motivation** (high engagement, active streaks):
  - All result types shown, up to 5 results per type in "all" filter view
  - Recent searches: last 8
  - Additional result metadata: last-updated timestamps, progress deltas ("up 12% this week")

---

## Cross-References

- **Navigates to**: Goal Detail [14] via dismiss + stack push, SIA Chat [09] via dismiss + tab switch (Ask SIA card or conversation result), Journal [37] via dismiss + stack push, Habits [38] via dismiss + stack push, Personal Wiki [20] via dismiss + stack push
- **Navigates from**: Home Screen [12] via overlay slide-down (search icon in sticky header), Me Main [17] via overlay slide-down (search icon)
- **Shared components with**: Help Center [25] (Search Bar), Meal Detail [29] (Search Bar, Filter Chips), Community Chat Rooms [40] (Search Bar), Goals List [13] (Filter Chip Row, Domain Tag Chip), Goal Detail [14] (Progress Ring, Domain Tag Chip)
- **Patterns used**: Search Bar (extended — auto-focus, cancel button, clear button), Filter Chip Row, Section Eyebrow Label, Domain Tag Chip, Goal Card (compact variant with small progress ring), 8-State Interaction Model, Motion Tokens (160ms/280ms), Filtered Empty State, all from _shared-patterns.md
- **Patterns established**: Search Result Cards (Goal compact, SIA Conversation, Journal Entry, Habit, Wiki Page), Ask SIA Card (fallback search-to-conversation bridge), Full-screen overlay transition (slide-down from top with keyboard sync)
