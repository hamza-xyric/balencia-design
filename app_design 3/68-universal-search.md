# Screen Design: Universal Search

**Screen**: 68 of 73
**File**: 68-universal-search.md
**Register**: Brand Mode (brand-orange #FF5E00)
**Primary action**: find content across the app
**Tab**: None (full-screen overlay, z-40)
**Navigation**: Full-screen overlay presented from Home [12] via search icon tap (modal presentation with slide-up), or pull-down gesture on Today tab screens. Dismissed by cancel button, swipe-down from top, or selecting a result (navigates to destination).

---

## Purpose

Balencia has 73 screens, 9 life domains, and an ever-growing universe of user-created content — goals, habits, recipes, journal entries, quick notes, community rooms, and settings buried several taps deep. Without a unifying search layer, the app risks becoming a maze: users know what they want but not where it lives. Universal Search collapses the entire app into a single text field. It is the fastest path between intent and destination. The overlay opens with the keyboard already live, respecting the user's urgency — if they tapped the search icon, they want to type now, not admire an animation. SIA powers the ranking engine behind every result set, surfacing the most contextually relevant match first (a goal the user checked this morning ranks higher than one dormant for weeks). A dedicated "SIA thinks you're looking for..." suggestion row injects AI intelligence directly into the search flow, predicting intent from partial queries and recent behavior. Category filter chips let users narrow scope without retyping. Every result row is a deep-link — tapping a result dismisses the overlay and navigates directly to the target screen with the relevant item pre-focused. Search history is stored locally, making repeat lookups instant. This is a utility screen — no gamification, no XP, no celebrations — but SIA's suggestion row ensures the AI coach's presence is felt even here.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search input field — auto-focused, cursor blinking, the entire screen serves this field
2. Cancel button — immediate escape hatch, always visible alongside the search field
3. Category filter chips — horizontal scroll row below the input: All, Goals, Habits, Recipes, Notes, Journal, Settings, Screens, Community
4. Recent searches (initial state) — reverse chronological, max 10 items, swipe-to-delete
5. SIA suggestion row — purple dot accent, appears after 2+ characters when SIA has a prediction
6. Categorized result sections — grouped by content type, each with a section eyebrow + count badge
7. Individual result rows — 8 format variants, one per content category
8. Empty results state — friendly message when no matches found

**User flow**:
- **Arrives from**: Home Screen [12] via search icon in sticky header (slide-up modal), any Today tab screen via pull-down gesture (same modal presentation), Settings [21] via search bar tap (slide-up modal), SIA Chat [09] via "search for that" deep-link
- **Primary exit**: Tap any result row — overlay dismisses (slide-down), navigates to destination screen via stack push with target item pre-focused
- **Secondary exits**: Cancel button (top-right) — overlay dismisses (slide-down), returns to previous screen. Swipe-down from top of overlay — same as cancel. Hardware back (Android) — same as cancel.
- **Deep-link targets**: Goal Detail [14], Habits [38], Recipe Detail [56], Quick Notes [62], Journal [37], Settings [21], any feature screen [09-65], Community Room Detail [40]

---

## Layout

**Scroll behavior**: FlatList (virtualized, grouped by category sections). Keyboard-aware — content scrolls above keyboard when results extend below fold.
**Tab bar visible**: No (full-screen overlay covers tab bar, z-40)

### ASCII Wireframe — Initial State (Empty Query, Recent Searches)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │  <- 8pt gap
│  ┌───────────────────────┐ Cancel  │  <- Search Header (48pt)
│  │ 🔍  search balencia... │         │     Auto-focused input + cancel
│  └───────────────────────┘         │
│                                     │  <- 12pt gap
│  [All] [Goals] [Habits] [Recipes]  │  <- Category Filter Chips
│  [Notes] [Journal] [Settings] ->   │     (horizontal scroll)
│                                     │  <- 24pt gap
│  RECENT SEARCHES                    │  <- Section eyebrow
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐   │
│  │  🕐  morning routine          x │  <- Recent search 1
│  ├─────────────────────────────┤   │
│  │  🕐  budget review            x │  <- Recent search 2
│  ├─────────────────────────────┤   │
│  │  🕐  protein shake recipe     x │  <- Recent search 3
│  ├─────────────────────────────┤   │
│  │  🕐  sleep settings           x │  <- Recent search 4
│  ├─────────────────────────────┤   │
│  │  🕐  meditation                x │  <- Recent search 5
│  └─────────────────────────────┘   │
│                                     │  <- 24pt gap
│  "Clear all"                        │  <- Clear all link (orange)
│                                     │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │  <- Keyboard area
│  │        Keyboard             │   │     (system, auto-shows)
│  │                             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Typing State (Live Suggestions)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │  <- 8pt gap
│  ┌───────────────────────┐ Cancel  │  <- Search Header (48pt)
│  │ 🔍  morn|                │  x    │     Active input + clear icon
│  └───────────────────────┘         │
│                                     │  <- 12pt gap
│  [(All)] [Goals] [Habits] [Recipes]│  <- "All" chip selected (orange)
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐   │
│  │  🟣 SIA thinks you're       │   │  <- SIA Suggestion Row
│  │     looking for:             │   │     (purple dot accent)
│  │     "Morning Routine" goal   │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  GOALS  (2)                         │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  🟢 Morning Routine     72% │   │  <- Goal result row
│  │     [wellbeing]              │   │
│  ├─────────────────────────────┤   │
│  │  🔴 Morning Run Goal    45% │   │  <- Goal result row
│  │     [fitness]                │   │
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  HABITS  (1)                        │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  ☑ Morning Meditation  🔥14 │   │  <- Habit result row
│  │    [spirituality]            │   │
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  SCREENS  (1)                       │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  ☀ Morning Check-in         │   │  <- Screen result row
│  │    Start your day with SIA   │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │        Keyboard             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Results View (Scrolled, Multiple Categories)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │  <- 8pt gap
│  ┌───────────────────────┐ Cancel  │  <- Search Header (48pt)
│  │ 🔍  protein              │  x    │     Keyboard dismissed on scroll
│  └───────────────────────┘         │
│                                     │  <- 12pt gap
│  [(All)] [Goals] [Habits] [Recipes]│  <- Filter chips
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐   │
│  │  🟣 SIA: "Try the high-     │   │  <- SIA Suggestion Row
│  │     protein meal plan"       │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  RECIPES  (3)                       │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  [img] Protein Pancakes     │   │  <- Recipe result row
│  │        320 cal · 15 min     │   │
│  ├─────────────────────────────┤   │
│  │  [img] Protein Smoothie     │   │
│  │        280 cal · 5 min      │   │
│  ├─────────────────────────────┤   │
│  │  [img] High-Protein Bowl    │   │
│  │        450 cal · 25 min     │   │
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  GOALS  (1)                         │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  🟢 Hit Protein Target  58% │   │  <- Goal result row
│  │     [nutrition]              │   │
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  QUICK NOTES  (2)                   │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  "Need more protein in..."  │   │  <- Note result row
│  │   May 18 · [nutrition]       │   │
│  ├─────────────────────────────┤   │
│  │  "Protein shake made me..." │   │
│  │   May 15 · [health]         │   │
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  JOURNAL  (1)                       │  <- Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │  "Realized my protein..."   │   │  <- Journal result row
│  │   May 12 · 😊               │   │
│  └─────────────────────────────┘   │
│                                     │
│  SETTINGS  (1)                      │
│  ┌─────────────────────────────┐   │
│  │  ⚙ Protein target            │   │  <- Settings result row
│  │    Currently: 120g/day       │   │
│  └─────────────────────────────┘   │
│                                     │  <- 32pt bottom spacer
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Search Header** — 48pt (search input + cancel button)
   - Purpose: Primary interaction point — every search begins and ends here
   - Content: Search input field (auto-focused), inline clear button (x), cancel text button
   - Behavior: Pinned at top (z-41, above overlay background), does not scroll with content

2. **Category Filter Chips** — 40pt (horizontal scroll row)
   - Purpose: Narrow search scope without retyping the query
   - Content: 9 filter chips in horizontal ScrollView
   - Behavior: Pinned below search header, scrolls horizontally, does not scroll vertically with results

3. **SIA Suggestion Row** — ~64pt (when present)
   - Purpose: AI-powered intent prediction, surfaces the most likely target
   - Content: Purple dot + suggestion text + tappable row
   - Behavior: Appears after 2+ typed characters when SIA has a high-confidence prediction. Disappears when query is cleared.

4. **Recent Searches Section** — variable (initial state only)
   - Purpose: Fast repeat access to previous queries
   - Content: Section eyebrow + up to 10 recent search rows + "clear all" link
   - Behavior: Only visible when search input is empty. Hidden once user types.

5. **Result Sections** — variable (one section per matching category)
   - Purpose: Categorized, scannable results grouped by content type
   - Content: Section eyebrow with count badge + result rows (category-specific format)
   - Behavior: Sections appear in relevance order (SIA-ranked). Empty categories are hidden.

6. **Empty Results State** — ~200pt (centered, when no matches)
   - Purpose: Friendly feedback when search yields nothing
   - Content: Illustration + message + suggestion text

---

## Components

### Search Header
- **Purpose**: The command line of the entire app — everything flows from this field
- **Data source**: User input (text), search history (recent), keyboard state
- **Visual treatment**: Full-width bar, ink-900 (#0A0A0F) background matching the overlay. Search input: ink-brown-800 (#211008) background, --r-md (14pt) border radius, 48pt height, 16pt horizontal padding internally. Left-aligned magnifying glass icon (16pt, white at 40%). Placeholder text: "search balencia..." in 16pt Sora Regular, white at 30%. Active text: 16pt Sora Regular, white. Clear button (x): 20pt circle, white at 30% background, white at 60% icon (12pt), appears only when input has text. Cancel button: 15pt Sora Semibold, orange (#FF5E00), right of input field, 16pt gap from input.
- **Sub-elements**:
  - Search input field: flex-1, 48pt tall, ink-brown-800 bg, --r-md radius
  - Magnifying glass icon: 16pt, white at 40%, 16pt left padding inside input
  - Placeholder text: "search balencia..." — 16pt Sora Regular, white at 30%
  - Active input text: 16pt Sora Regular, white
  - Clear (x) button: 20pt diameter circle, appears when text length > 0, right side inside input field, 12pt right padding
  - Cancel button: "Cancel" — 15pt Sora Semibold, orange (#FF5E00), 44pt touch target, right of input
- **Size**: Full-width minus 32pt (16pt margins), 48pt tall, 8pt top margin below status bar
- **Behavior**: Auto-focuses on overlay open (keyboard appears immediately). Tapping clear (x) empties the field and restores recent searches. Tapping cancel dismisses the entire overlay.

### Recent Search Row
- **Purpose**: One-tap access to a previous search query
- **Data source**: Local search history (AsyncStorage), max 10 entries, reverse chronological
- **Visual treatment**: Full-width row, no card surface (flat). 1pt white at 5% divider between rows. Clock icon (14pt, white at 30%) left-aligned, query text (15pt Sora Regular, white at 70%) center, delete button (x icon, 12pt, white at 20%) right-aligned.
- **Sub-elements**:
  - Clock icon: 14pt, white at 30%, left side, 16pt left margin
  - Query text: 15pt Sora Regular, white at 70%, 12pt left of clock icon, flex-1, single line, truncate with ellipsis
  - Delete button: x icon, 12pt, white at 20% (brightens to white at 50% on press), 44pt touch target, right side
- **Size**: Full-width, 48pt tall per row (meets 44pt minimum touch target)
- **Gestures**: Tap row — re-executes that search query (populates input, triggers search). Tap delete (x) — removes single entry with slide-left + collapse animation. Swipe left — reveals delete zone (red #F44336 background with trash icon), release past 30% to delete.
- **"Clear all" link**: Below all recent rows, 14pt Sora Semibold, orange (#FF5E00), 44pt touch target. Tap clears all recent searches (confirmation: subtle toast "Search history cleared").

### Category Filter Chips
- **Purpose**: Scope search to a single content type without retyping
- **Data source**: Static list of 9 categories: All, Goals, Habits, Recipes, Notes, Journal, Settings, Screens, Community
- **Visual treatment**: Horizontal ScrollView, 8pt gap between chips. Each chip: pill shape (--r-pill, 999pt), 36pt tall, 16pt horizontal padding. Default state: ink-brown-800 (#211008) background, 1pt white at 10% border, 13pt Sora Semibold, white at 60%. Selected state: orange (#FF5E00) background at 15% opacity, 1pt orange border, 13pt Sora Semibold, orange text.
- **Sub-elements (per chip)**:
  - Label: category name — 13pt Sora Semibold
  - Count badge (active results only): 11pt Sora Bold, white, inside a 18pt circle, orange (#FF5E00) background, right of label, 6pt gap. Only appears when that category has results.
- **Size**: Row height 40pt (36pt chip + 2pt top/bottom breathing room). Horizontal scroll extends beyond screen width.
- **Behavior**: "All" is selected by default. Selecting a category filters results to that type only. Selecting "All" restores full cross-category results. Only one chip active at a time (radio behavior). Selecting a chip re-runs the current query with scope filter — no need to retype. Chips with 0 results show as default (not hidden) but appear at 40% opacity when results exist in other categories.

### SIA Suggestion Row
- **Purpose**: AI prediction of the user's search intent — the smartest row on the screen
- **Data source**: SIA intent engine (analyzes partial query + recent user behavior + time context + frequently accessed items)
- **Visual treatment**: ink-brown-800 (#211008) card surface, --r-md (14pt) border radius, 16pt internal padding. Purple (#7F24FF) dot (8pt circle) left-aligned as the AI accent indicator. Full-width minus 32pt (16pt margins).
- **Sub-elements**:
  - Purple dot: 8pt circle, #7F24FF, left-aligned, vertically centered
  - "SIA thinks you're looking for:" — 12pt Sora Regular, white at 50%, below dot (or same line on single-line variant)
  - Suggestion text: 15pt Sora Semibold, white, below the label. Can be a goal name, habit name, screen name, or natural language suggestion. Single line, truncate with ellipsis.
  - Chevron: 14pt, white at 30%, right-aligned, vertically centered
- **Size**: Full-width minus 32pt, ~64pt tall (label + suggestion), min 56pt
- **Gestures**: Tap entire row — navigates directly to the suggested destination (same behavior as tapping a result row). This is the "I'm feeling lucky" path.
- **Appearance logic**: Appears after user types 2+ characters AND SIA has a prediction with confidence > 0.7. Disappears when input is cleared or when the query matches nothing SIA can predict. Renders above all result sections — it is always the first result-like element visible.
- **Variants**: Single-line (suggestion fits on one line), two-line (suggestion + brief description). Purple dot is the ONLY purple element on this screen — respects the max-2 purple element rule.

### Result Section Header
- **Purpose**: Labels each category grouping in the results list
- **Visual treatment**: Section eyebrow pattern — 12pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing. Count badge inline: "(N)" in same style but white at 60%.
- **Sub-elements**:
  - Section label: "GOALS", "HABITS", "RECIPES", "QUICK NOTES", "JOURNAL", "SETTINGS", "SCREENS", "COMMUNITY" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Result count: "(N)" — 12pt Sora Semibold, white at 60%, 6pt left gap from label
- **Spacing**: 24pt above (gap from previous section or SIA suggestion), 12pt below (tight coupling to first result row)
- **Behavior**: Only rendered when the category has 1+ results. Sections are ordered by SIA relevance ranking, not by a fixed order. The category with the highest-confidence match appears first.

### Result Row — Goals
- **Purpose**: Display a goal match with enough context to decide whether to tap
- **Data source**: Goals system (goal name, domain, progress percentage)
- **Visual treatment**: Full-width row, no card surface (flat within section card). --r-md (14pt) border radius on the section group card. 1pt white at 5% divider between rows within the section.
- **Sub-elements**:
  - Domain color dot: 10pt circle, domain color (from domain colors table), left-aligned, vertically centered
  - Goal name: 15pt Sora Semibold, white, left of dot (12pt gap), flex-1, single line, truncate with ellipsis. Matched query characters highlighted in orange (#FF5E00).
  - Progress percentage: 14pt Sora Semibold, orange (#FF5E00), right-aligned. Shows "72%" format. Green (#34A853) if 100%.
  - Domain tag chip: below goal name, pill shape, domain color at 15% bg, domain color text, 11pt Sora Semibold, 20pt tall
- **Size**: Full-width, 64pt tall (two-line: name + domain tag)
- **Gestures**: Tap → dismiss overlay + stack push to Goal Detail [14] with goal pre-focused

### Result Row — Habits
- **Purpose**: Display a habit match with streak context
- **Data source**: Habits system (habit name, domain, streak count, today's completion status)
- **Visual treatment**: Same flat row pattern as goals. 1pt white at 5% divider.
- **Sub-elements**:
  - Checkbox icon: 20pt circle, left-aligned. If completed today: orange (#FF5E00) fill with white checkmark (10pt). If not completed: 2pt white at 30% border, empty.
  - Habit name: 15pt Sora Semibold, white, 12pt right of checkbox, flex-1, single line, truncate. Matched characters highlighted in orange.
  - Streak badge: flame emoji (14pt) + streak count (13pt Sora Semibold, orange #FF5E00), right-aligned. Format: "14" (number only, flame provides context). Hidden if streak is 0.
  - Domain tag chip: below habit name, same spec as goals row
- **Size**: Full-width, 64pt tall
- **Gestures**: Tap → dismiss overlay + stack push to Habits [38] with habit pre-focused and scrolled into view

### Result Row — Recipes
- **Purpose**: Display a recipe match with visual preview and key nutritional/time data
- **Data source**: Recipe system (recipe name, thumbnail image, calories, prep time)
- **Visual treatment**: Same flat row pattern. Uniquely includes a thumbnail image for visual recognition.
- **Sub-elements**:
  - Thumbnail: 48pt x 48pt, --r-sm (10pt) border radius, left-aligned. Displays recipe image. Fallback: ink-brown-800 bg with fork-knife icon (20pt, white at 20%) if no image.
  - Recipe name: 15pt Sora Semibold, white, 12pt right of thumbnail, flex-1, single line, truncate. Matched characters highlighted in orange.
  - Metadata line: below recipe name — calories (13pt Sora Regular, white at 50%, format: "320 cal") + separator dot (white at 30%) + prep time (13pt Sora Regular, white at 50%, format: "15 min")
- **Size**: Full-width, 64pt tall (thumbnail height drives the row height)
- **Gestures**: Tap → dismiss overlay + stack push to Recipe Detail [56] with recipe loaded

### Result Row — Quick Notes
- **Purpose**: Display a note match with preview text and date context
- **Data source**: Quick Notes system (note text preview, date created, auto-assigned tags)
- **Visual treatment**: Same flat row pattern. Text-forward — no icon or image, the preview text IS the visual.
- **Sub-elements**:
  - Note preview: 15pt Sora Regular, white at 80%, left-aligned, 2 lines max, truncate with ellipsis. Matched characters highlighted in orange (#FF5E00) at full weight (Sora Semibold for matched segments only).
  - Date: 12pt Sora Regular, white at 40%, below preview text, left-aligned. Relative format: "Today", "Yesterday", "May 18", "Apr 3"
  - Auto-tag chips: inline with date (8pt gap), pill shape, --r-sm (10pt), 18pt tall, domain color at 15% bg, 11pt Sora Semibold, domain color text. Max 2 tags shown ("+N" overflow if more)
- **Size**: Full-width, 72pt tall (preview text needs 2 lines for context)
- **Gestures**: Tap → dismiss overlay + navigate to Quick Notes [62] (full-screen mode) with note scrolled into view and highlighted

### Result Row — Journal Entries
- **Purpose**: Display a journal entry match with emotional context (mood)
- **Data source**: Journal system (entry text preview, date, mood emoji)
- **Visual treatment**: Same flat row pattern. Mood emoji adds emotional signal without taking space.
- **Sub-elements**:
  - Entry preview: 15pt Sora Regular, white at 80%, left-aligned, 2 lines max, truncate. Matched characters highlighted in orange.
  - Date: 12pt Sora Regular, white at 40%, below preview text, left-aligned. Same relative format as notes.
  - Mood emoji: 20pt, right-aligned, vertically centered. Displays the mood logged with that entry (happy, neutral, sad, energized, etc.). If no mood logged: hidden.
- **Size**: Full-width, 72pt tall
- **Gestures**: Tap → dismiss overlay + stack push to Journal [37] with entry expanded and scrolled into view

### Result Row — Settings
- **Purpose**: Deep-link to a specific setting without navigating the settings tree
- **Data source**: Settings registry (setting name, current value, category path)
- **Visual treatment**: Same flat row pattern. Gear icon provides instant visual recognition.
- **Sub-elements**:
  - Gear icon: 20pt, white at 40%, left-aligned, vertically centered
  - Setting name: 15pt Sora Semibold, white, 12pt right of icon, flex-1, single line, truncate. Matched characters highlighted in orange.
  - Current value: 13pt Sora Regular, white at 50%, below setting name. Shows current state: "On", "Off", "120g/day", "Every morning at 7:00", etc. Single line, truncate.
- **Size**: Full-width, 60pt tall
- **Gestures**: Tap → dismiss overlay + stack push to Settings [21] with the specific setting section scrolled into view and highlighted (brief orange pulse, 520ms)

### Result Row — Screens/Features
- **Purpose**: Navigate directly to any app feature by name, even if the user doesn't know where it lives in the tab structure
- **Data source**: Screen registry (static list of all 73 screens with name, description, icon, navigation path)
- **Visual treatment**: Same flat row pattern. Feature icon provides visual context for the destination.
- **Sub-elements**:
  - Feature icon: 20pt, orange (#FF5E00), left-aligned, vertically centered. Uses the screen's tab or section icon. Examples: dumbbell for Fitness Dashboard, brain for SIA Chat, chart for Finance, moon for Sleep Tracking.
  - Feature name: 15pt Sora Semibold, white, 12pt right of icon, flex-1, single line. Matched characters highlighted in orange.
  - Description: 13pt Sora Regular, white at 50%, below feature name. Brief description of what the screen does. Single line, truncate. Example: "Track your workouts and view fitness stats"
- **Size**: Full-width, 60pt tall
- **Gestures**: Tap → dismiss overlay + navigate to the target screen (navigation method depends on target: tab switch for tab roots, stack push for nested screens)

### Result Row — Community Rooms
- **Purpose**: Find and join community rooms by name or topic
- **Data source**: Community system (room name, room emoji, member count, room description)
- **Visual treatment**: Same flat row pattern. Room emoji provides personality and instant recognition.
- **Sub-elements**:
  - Room emoji: 24pt, left-aligned, vertically centered. Each community room has a user-defined or system-assigned emoji.
  - Room name: 15pt Sora Semibold, white, 12pt right of emoji, flex-1, single line, truncate. Matched characters highlighted in orange.
  - Member count: 13pt Sora Regular, white at 40%, right-aligned. Format: "1.2k members" or "48 members". Person icon (12pt, white at 30%) inline left of count.
- **Size**: Full-width, 52pt tall (single-line, community rooms are simpler)
- **Gestures**: Tap → dismiss overlay + stack push to Community Room Detail [40] with room loaded

### Empty Results State
- **Purpose**: Friendly, non-frustrating feedback when the query matches nothing
- **Visual treatment**: Centered vertically in the available space (below filter chips, above keyboard). No card surface.
- **Sub-elements**:
  - Search icon: 48pt, white at 15%, centered
  - Primary message: "No results for '[query]'" — 17pt Sora Semibold, white, centered, 16pt below icon. The query text is truncated to 24 characters with ellipsis if longer.
  - Secondary message: "Try a different spelling or search term" — 14pt Sora Regular, white at 50%, centered, 8pt below primary
  - SIA suggestion (optional): If SIA has a related suggestion — "Did you mean '[suggestion]'?" in 14pt Sora Regular, orange (#FF5E00), centered, 16pt below secondary. Tappable — tapping replaces the query with the suggestion and re-runs search.
- **Size**: ~200pt tall block, centered vertically

### Keyboard
- **Purpose**: System keyboard for text input
- **Behavior**: Auto-shows on overlay open (search field auto-focused). Dismisses on scroll (user scrolls results), tap on result row, or tap cancel. Re-appears on tap of search input field. KeyboardAvoidingView ensures results list resizes to fit available space above keyboard.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Overlay background | #0A0A0F | ink-900 | Full-screen overlay base, 100% opacity |
| Backdrop behind overlay | #0A0A0F at 60% | ink-900/60 | Dims the underlying screen during slide-up transition |
| Search input bg | #211008 | ink-brown-800 | Input field surface |
| Search input text | #FFFFFF | white | Active input text |
| Search placeholder | #FFFFFF at 30% | white/30 | "search balencia..." |
| Cancel button | #FF5E00 | orange | Primary action color |
| Clear (x) icon | #FFFFFF at 60% | white/60 | Inside input field |
| Category chip (default) | #211008 bg, #FFFFFF at 10% border | ink-brown-800 | Unselected state |
| Category chip (selected) | #FF5E00 at 15% bg, #FF5E00 border + text | orange/15 | Active filter |
| Category chip count badge | #FF5E00 bg, #FFFFFF text | orange | Result count indicator |
| SIA dot | #7F24FF | purple | AI-only indicator (1 of max-2 purple elements) |
| SIA suggestion text | #FFFFFF | white | Prediction text |
| SIA label text | #FFFFFF at 50% | white/50 | "SIA thinks you're looking for:" |
| Section eyebrow | #FFFFFF at 40% | white/40 | Category headers |
| Result count "(N)" | #FFFFFF at 60% | white/60 | Inline with eyebrow |
| Result row primary text | #FFFFFF | white | Names, titles |
| Result row secondary text | #FFFFFF at 50% | white/50 | Descriptions, metadata |
| Query match highlight | #FF5E00 | orange | Highlighted matching characters in result text |
| Domain color dots | [per domain] | domain tokens | Goal/habit domain indicators |
| Domain tag chips | [domain color] at 15% bg, [domain color] text | per domain | Category identification |
| Progress % (active) | #FF5E00 | orange | Goal progress indicator |
| Progress % (complete) | #34A853 | green | 100% goal indicator |
| Streak count | #FF5E00 | orange | Habit streak number |
| Habit checkbox (done) | #FF5E00 fill, #FFFFFF check | orange | Completed today |
| Habit checkbox (undone) | #FFFFFF at 30% border | white/30 | Not completed today |
| Recent search icon | #FFFFFF at 30% | white/30 | Clock icon |
| Recent search text | #FFFFFF at 70% | white/70 | Previous query text |
| Delete (x) icon | #FFFFFF at 20% | white/20 | Delete recent search |
| Row dividers | #FFFFFF at 5% | white/5 | Between result rows |
| "Clear all" link | #FF5E00 | orange | Clear search history action |
| Empty state icon | #FFFFFF at 15% | white/15 | Large search icon |
| Feature icons | #FF5E00 | orange | Screen/feature type indicators |
| Gear icon (settings) | #FFFFFF at 40% | white/40 | Settings row indicator |
| Swipe-delete reveal | #F44336 | error-red | Delete recent search swipe bg |

**60/30/10 verification**: Orange is the dominant accent — cancel button, selected filter chip, query match highlights, progress %, streak counts, feature icons, "clear all" link, SIA "did you mean" suggestion (matching the 60% role of brand-orange across interactive elements). Green appears only on 100% completion states (30% role, minimal on this screen since search is not a completion flow). Purple appears on exactly 1 element — the SIA suggestion dot (10% role, AI-only). Domain colors appear only on tag chips and domain dots — never on actions. Ratio holds.

---

## Interaction States

### Search Input Field
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty, focused) | ink-brown-800 bg, cursor blinking, placeholder visible | — |
| Active (text entered) | ink-brown-800 bg, white text, clear (x) visible | — |
| Pressed | bg darkens to #1A0C06 | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Cancel Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "Cancel" in orange, 15pt Sora Semibold | — |
| Pressed | opacity 0.6 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Category Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | ink-brown-800 bg, white at 10% border, white at 60% text | — |
| Selected | orange at 15% bg, orange border + text, count badge (if results) | light impact |
| Pressed | scale(0.95), bg darkens | light impact |
| Disabled (0 results, others have results) | 0.4 opacity | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Suggestion Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, purple dot, white text | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Result Row (all 8 variants)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Flat row, no highlight | — |
| Pressed | Full row bg: white at 5% | light impact |
| Focus-visible | 2pt orange ring around row, offset 2pt | — |

### Recent Search Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Flat row, clock icon at 30%, text at 70% | — |
| Pressed | Full row bg: white at 5% | light impact |
| Swiping left | Row translates, red delete bg reveals proportionally | light impact at 30% threshold |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Clear (x) Button (inside input)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 20pt circle, white at 30% bg, white at 60% x icon | — |
| Pressed | scale(0.9), bg brightens to white at 40% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Loading States
Search results follow the skeleton loading pattern from `_shared-patterns.md`. On query submit: result area shows 4 skeleton rows (ink-brown-800, shimmer) matching the result card height. Results stream in as they resolve — each card fades in (200ms ease-out-soft) and pushes skeleton rows down. If all results load within 300ms, no skeleton is shown (instant render). Category tabs show skeleton pills during initial load, then populate.

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Search input field | Focus input, show keyboard (if not already showing) |
| Tap | Clear (x) inside input | Clear query text, restore recent searches, refocus input |
| Tap | Cancel button | Dismiss overlay (slide-down), return to previous screen |
| Tap | Category filter chip | Select chip (radio behavior), re-filter results to that category |
| Tap | SIA suggestion row | Navigate directly to SIA's predicted destination (same as result tap) |
| Tap | Any result row | Dismiss overlay + navigate to destination screen with target pre-focused |
| Tap | Recent search row | Re-execute that query (populate input, trigger search) |
| Tap | Delete (x) on recent search | Remove that single recent search entry |
| Tap | "Clear all" link | Clear all recent search history |
| Tap | "Did you mean..." (empty state) | Replace query with SIA's suggestion, re-run search |
| Swipe left | Recent search row | Reveal delete zone (red bg + trash icon). Release past 30% to delete. |
| Swipe left (<30%) | Recent search row | Snap back to default position (280ms ease-out-soft) |
| Swipe down (from top) | Overlay | Dismiss overlay (slide-down), same as cancel |
| Scroll (vertical) | Results list | Scroll results, dismiss keyboard on first scroll movement |
| Scroll (horizontal) | Category filter chips | Pan through chip row |
| Type (keyboard) | Search input | Live search — results update after 300ms debounce |
| Pull down (from top of overlay) | Overlay | Begin dismiss gesture — overlay follows finger, release past 40% screen height to dismiss |
| Hardware back (Android) | Overlay | Dismiss overlay, return to previous screen |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Overlay entrance | Search icon tap / pull-down gesture | Slide-up from bottom (translateY: 100% → 0), ink-900 bg fades in. Backdrop dims underlying screen (0 → 60% opacity). | 280ms | ease-out-soft |
| Overlay dismiss | Cancel / swipe-down / result tap | Slide-down (translateY: 0 → 100%), backdrop fades out. | 280ms | ease-out-soft |
| Keyboard appear | Overlay entrance (auto-focus) | System keyboard slides up | ~250ms | system |
| Keyboard dismiss | Scroll results / tap result / cancel | System keyboard slides down | ~200ms | system |
| Recent searches | Overlay entrance | Staggered fade-in + translateY(8→0), 40ms stagger per row | 160ms each | ease-out-soft |
| Recent search delete | Tap delete (x) or swipe-left past threshold | Row slides left + collapses height (gap closes), 280ms | 280ms | ease-out-soft |
| SIA suggestion appear | Query reaches 2+ chars + SIA has prediction | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| SIA suggestion update | SIA prediction changes with typing | Crossfade text (old fades, new fades in) | 160ms | ease-out-soft |
| SIA suggestion disappear | Query cleared or no prediction | Fade-out + translateY(0→-8) | 160ms | ease-out-soft |
| Result sections appear | Search results return (after 300ms debounce) | Staggered fade-in + translateY(12→0), 60ms stagger per section | 280ms each | ease-out-soft |
| Result rows within section | Section appears | Staggered fade-in, 40ms stagger per row within section | 160ms each | ease-out-soft |
| Category chip select | Tap chip | Selected: bg fills with orange at 15% (160ms). Deselected: bg returns to ink-brown-800 (160ms). Results crossfade. | 160ms (chip) + 280ms (results) | ease-out-soft |
| Category chip count badge | Results load | Scale-in (0→1) + fade-in | 160ms | ease-out-soft |
| Query match highlight | Result text renders | Highlighted characters pulse once: orange at 100% → 80% → 100% | 520ms | ease-flow |
| Empty results state | No matches found | Fade-in + translateY(16→0) | 280ms | ease-out-soft |
| Result row press | Touch down | Row bg transitions to white at 5% | 80ms | ease-out-soft |
| Result row release | Touch up (navigate) | Row bg flashes white at 10% briefly before overlay begins dismiss | 80ms | ease-out-soft |
| Pull-dismiss gesture | Finger drag from top | Overlay translateY follows finger position. Backdrop opacity inversely proportional to drag distance. | real-time | — |
| Pull-dismiss snap-back | Release below 40% threshold | Overlay returns to y:0 | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (from Home search icon)**: Overlay slides up from bottom, 280ms ease-out-soft. Keyboard appears immediately after overlay settles (~50ms delay).
- **Enter (from pull-down gesture)**: Overlay follows finger, then snaps to full position when released past threshold. Same 280ms settle.
- **Exit (cancel/swipe-down)**: Overlay slides down, 280ms ease-out-soft. Keyboard dismisses simultaneously.
- **Exit (result tap)**: Overlay slides down, underlying screen begins navigation transition (stack push or tab switch) in parallel — the two animations overlap for a smooth 280ms combined transition.

---

## Empty States

### No Recent Searches (first use)
When the user opens search for the first time (no search history):
- **Recent searches section**: Hidden entirely (section does not render)
- **Replacement content**: Centered below filter chips:
  - Search icon: 48pt, white at 10%, centered
  - "Search across everything" — 17pt Sora Semibold, white at 70%, centered, 16pt below icon
  - "Goals, habits, recipes, notes, settings, and more" — 14pt Sora Regular, white at 40%, centered, 8pt below
- **Category filter chips**: Visible but all in default state (none selected except "All")
- **Keyboard**: Auto-focused and visible, ready for input

### No Results Found
When the current query matches nothing across all categories:
- **SIA suggestion row**: Hidden (no prediction possible for unknown terms)
- **Result sections**: None rendered
- **Empty results state**: Centered in available space (see Empty Results State component above)
- **Category filter chips**: All at 40% opacity (disabled), "All" still selected
- **SIA "did you mean" suggestion**: Shown if SIA can fuzzy-match the query to a known term. Tappable.

### Partial Results (some categories empty)
When some categories have results and others don't:
- **Result sections**: Only categories with 1+ results are rendered. Empty categories are completely hidden (no "0 results" rows).
- **Category filter chips**: Chips for empty categories show at 40% opacity (visually de-emphasized). Tapping a 0-result chip shows a brief inline message: "No [category] results for '[query]'" below the chips, 13pt Sora Regular, white at 40%, fades out after 2 seconds.

---

## Error Handling

### Search API Failure (network/server error)
When the search backend returns an error or times out (>5 seconds):
- **Behavior**: Local search proceeds (recent searches, static screen/feature registry). Server-dependent results (community rooms, SIA suggestion) show error state.
- **Visual**: Inline error banner below filter chips — full-width, ink-brown-800 bg, 1pt error-red (#F44336) left border, 14pt Sora Regular, white at 70% text: "Some results may be missing. Pull down to retry." Error-red dot (6pt) left of text.
- **Retry**: Pull-down on results list retries the API call. Success: banner dismisses with fade-out (280ms). Continued failure: banner persists, text updates to "Still having trouble. Check your connection."
- **Local-first categories** (always available offline): Goals, Habits, Quick Notes, Journal Entries, Settings, Screens/Features — these are indexed locally.
- **Server-dependent categories**: Recipes (content library), Community Rooms (real-time data), SIA Suggestion (AI engine) — these degrade gracefully with the error banner.

### Partial Results (timeout on some categories)
When some API calls succeed and others don't:
- **Behavior**: Render all successful results normally. For failed categories, show a subtle row at the end of results: "[Category] results unavailable" in 13pt Sora Regular, white at 30%.
- **SIA suggestion**: If the SIA engine is unreachable, the suggestion row simply does not appear (no error shown — it's optional by nature).

### Search Index Stale (offline mode)
When the device has no network connection:
- **Behavior**: All search runs against the local index (last synced data). A subtle banner below the search header: "Searching offline — some results may be outdated" in 13pt Sora Regular, white at 40%, with a cloud-offline icon (14pt, white at 30%).
- **Community rooms**: Hidden entirely (real-time data, meaningless offline).
- **Recipes**: Show only previously viewed/saved recipes from local cache.

---

## Motivation Adaptation

N/A — Universal Search is a pure utility screen. It does not adapt based on motivation tier. However, two elements are indirectly influenced by user state:

- **SIA suggestion content**: SIA's predictions account for the user's current motivation tier. A low-motivation user searching "morn" will see SIA suggest "Morning check-in" (gentle, wellness-focused). A high-motivation user searching the same query will see "Morning run routine" (action-oriented). The suggestion adapts; the UI does not.
- **Result ranking**: SIA ranks results by contextual relevance, which includes engagement recency, frequency, and streak status. Actively tracked goals and habits rank higher than dormant ones, regardless of alphabetical order. This is behavioral ranking, not visual adaptation.

---

## Accessibility

- **Screen reader (VoiceOver/TalkBack)**: Search input announced as "Search Balencia, text field, double-tap to edit." Each result row announced as "[Category]: [Name], [key detail]" — e.g., "Goal: Morning Routine, 72 percent complete, wellbeing domain." SIA suggestion announced as "SIA suggestion: [suggestion text], double-tap to navigate."
- **Dynamic Type**: All text scales with system font size. Search input, result rows, and filter chips reflow for larger sizes. Row heights increase proportionally to maintain 44pt minimum touch targets.
- **Reduce Motion**: If the user has "Reduce Motion" enabled, all slide-up/slide-down and stagger animations are replaced with instant fade transitions (160ms). Overlay appears and dismisses via crossfade only.
- **Voice Control**: All interactive elements have accessible labels. "Cancel", "Clear search", filter chip names, and result row names are all voice-actionable.
- **Contrast**: All text meets WCAG AA contrast ratios against ink-900 and ink-brown-800 backgrounds. Orange (#FF5E00) on ink-900 exceeds 4.5:1 for normal text.

---

## Technical Notes

### Search Architecture
- **Debounce**: 300ms after last keystroke before triggering search. Prevents excessive API calls during rapid typing.
- **Local index**: Goals, habits, notes, journal entries, settings, and screen registry are indexed locally using a lightweight full-text search library (e.g., FlexSearch or Lunr.js adapted for React Native). Index updates on each app foreground.
- **Server search**: Recipes (content library) and community rooms query the backend API. Results are merged with local results and ranked by SIA.
- **SIA ranking**: All results pass through SIA's relevance engine, which combines text-match score, recency, engagement frequency, time-of-day context, and user behavior patterns. The engine returns a flat ranked list that the UI groups by category.
- **Result limits**: Max 5 results per category in "All" view. Selecting a specific category chip removes the limit (shows all matches, paginated at 20).
- **Search history**: Stored in AsyncStorage, max 10 entries, FIFO. Query text only (no result snapshots). Synced to user profile for cross-device consistency (encrypted at rest).

### Performance
- **Target**: First results visible within 200ms of debounce trigger (local index). Server results stream in within 500ms.
- **FlatList optimization**: Result rows use getItemLayout for fixed heights, keyExtractor by category+id, windowSize of 10 for efficient rendering.
- **Keyboard-aware**: KeyboardAvoidingView wraps the result list. On iOS, behavior="padding". On Android, android:windowSoftInputMode="adjustResize" in manifest.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Search input text | Sora | 400 (Regular) | 16pt | 22pt | White |
| Search placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 30% |
| Cancel button | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 |
| Category chip label | Sora | 600 (Semibold) | 13pt | 18pt | White at 60% (inactive) / #FF5E00 (active) |
| Category chip count | Sora | 700 (Bold) | 11pt | 16pt | White |
| SIA label text | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| SIA suggestion text | Sora | 600 (Semibold) | 15pt | 20pt | White |
| Section eyebrow | Sora | 600 (Semibold) | 12pt | 16pt | White at 40% |
| Result count "(N)" | Sora | 600 (Semibold) | 12pt | 16pt | White at 60% |
| Result primary text | Sora | 600 (Semibold) | 15pt | 20pt | White |
| Result secondary text | Sora | 400 (Regular) | 13pt | 18pt | White at 50% |
| Domain tag chip text | Sora | 600 (Semibold) | 11pt | 16pt | Domain color |
| Recent search text | Sora | 400 (Regular) | 15pt | 20pt | White at 70% |
| "Clear all" link | Sora | 600 (Semibold) | 14pt | 20pt | #FF5E00 |
| Empty state primary | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Empty state secondary | Sora | 400 (Regular) | 14pt | 20pt | White at 50% |
| "Did you mean" suggestion | Sora | 400 (Regular) | 14pt | 20pt | #FF5E00 |
| Error banner text | Sora | 400 (Regular) | 14pt | 20pt | White at 70% |
| Offline banner text | Sora | 400 (Regular) | 13pt | 18pt | White at 40% |

---

## Cross-References

- **Navigates to**: Goal Detail [14] via result tap (stack push), Habits [38] via result tap (stack push), Recipe Detail [56] via result tap (stack push), Quick Notes [62] via result tap (stack push or navigate to full-screen mode), Journal [37] via result tap (stack push), Settings [21] via result tap (stack push with section pre-focused), Community Room Detail [40] via result tap (stack push), SIA Chat [09] via screen/feature result (tab switch), any feature screen [01-73] via Screens/Features result (navigation method varies: tab switch for tab roots, stack push for nested screens)
- **Navigates from**: Home Screen [12] via search icon (modal overlay), any Today tab screen via pull-down gesture (modal overlay), Settings [21] via search bar tap (modal overlay), SIA Chat [09] via deep-link
- **Shared components with**: Quick Notes [62] (search input pattern, tag filter chips), Home Screen [12] (domain tag chip, section eyebrow label), Goals List [13] (domain color dots, progress percentage display), Habits [38] (checkbox icon, streak badge), Settings [21] (gear icon, setting value display)
- **Patterns used**: Section Eyebrow Label, Domain Tag Chip, --r-md (14pt) for result row sections, --r-pill (999pt) for filter chips, 8-State Interaction Model (adapted: no disabled state on result rows), Motion Tokens (160ms/280ms/520ms), Content Entry Animation (staggered fade-in for results), Flat Row Pattern (from Home Screen schedule rows), Pull-Dismiss Gesture (adapted from bottom sheet patterns)
- **Patterns established**: Full-Screen Search Overlay (z-40 modal with auto-focused input), SIA Suggestion Row (AI intent prediction), Query Match Highlighting (orange highlight on matched characters within result text), Category Filter Chips with Count Badges, Search Result Deep-Linking (overlay dismiss + navigate in parallel), 8 Result Row Variants (goals, habits, recipes, notes, journal, settings, screens, community), Inline Error Banner (for degraded search), Pull-Down-to-Open-Search gesture (on Today tab screens)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-17.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/universal-search`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B17-F07 | critical | information-architecture | Replace the static query with an auto-focused input, controlled clear/cancel behavior, semantic result rows, and deep-link navigation. |
| B17-F08 | major | design-system-consistency | Align filters with the product taxonomy and show recent searches only in the empty-query state. |
| B17-F09 | major | accessibility | Use 44px semantic filter controls and make every result/recent row a labeled button or link. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.

