# Screen Design: Meal Detail / Food Logger

**Screen**: 29 of 43
**File**: 29-meal-detail-food-logger.md
**Register**: Product Mode
**Primary action**: log food
**Tab**: Me (inherited from Nutrition Dashboard stack)
**Navigation**: Stack depth 3-4 from Me tab root (Me → Explore → Nutrition Dashboard → Meal Detail). Also reachable via SIA deep-link or Home action card.

---

## Purpose

The Meal Detail / Food Logger screen serves two functions: viewing the nutritional breakdown of a planned or logged meal, and logging new food items to the daily nutrition tracker. It uses the **Multi-Mode Screen Pattern** established by Screen 27, with entry-point-determined modes (Meal View or Food Logging) rather than sequential flow. The food logging mode prioritizes speed through a search-first interface with 5 hierarchically organized input methods, designed so most food logging takes under 3 taps.

---

## Information Architecture

**Hierarchy** varies by mode:

**Meal View mode** (what the user sees, in order of visual priority):
1. Meal name and metadata (date, time)
2. Meal photo (if available)
3. Nutrition breakdown (pie chart / macro bars)
4. Ingredients list with per-item macros
5. SIA nutrition insight

**Food Logging mode** (what the user sees, in order of visual priority):
1. Search input (always visible at top, primary interaction point)
2. Meal type selector (which meal this food belongs to)
3. Recent / frequent foods (quick-add with minimal taps)
4. Search results (when actively searching)
5. Manual entry (last resort, most effort)

**User flow**:
- **Arrives from**: Screen 28 (Nutrition Dashboard) — meal row tap enters Meal View mode; FAB tap enters Food Logging mode. SIA Chat [09] via deep-link. Home Screen [12] via action card.
- **Primary exit**: Screen 28 via stack pop (back button or "done")
- **Mode transition**: from Meal View, tapping "edit" or "add food" transitions to Food Logging mode

---

## Layout

**Scroll behavior**: ScrollView (both modes)
**Tab bar visible**: Yes (both modes)

### Mode Architecture

```
Tap meal row ──────► Meal View Mode ──► "edit" ──► Food Logging Mode
(from Screen 28)                                         ▲
                                                         │
Tap FAB ───────────────────────────────────────────────────┘
(from Screen 28)
```

Modes are entry-point determined. Unlike Screen 27 where modes flow sequentially, here the user enters one mode based on their navigation action. Transition from Meal View to Food Logging uses content crossfade (520ms, ease-out-soft) below stable header.

### ASCII Wireframe — Meal View Mode

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  Lunch                  Edit │  56pt — Detail Header
├─────────────────────────────────┤
│                                 │  SCROLLABLE
│  ┌─────────────────────────────┐│
│  │                              ││  ~160pt — Meal Photo
│  │      [Photo placeholder]     ││  (optional, r-xl corners)
│  │                              ││
│  └─────────────────────────────┘│
│                                 │
│  Chicken salad wrap             │  20pt Semibold, white
│  Tuesday, May 20 · 12:30pm     │  13pt Regular, white 50%
│                                 │
│  ┌─────────────────────────────┐│
│  │ NUTRITION                    ││  ~200pt — Macro Breakdown
│  │                              ││
│  │       ┌────────────┐        ││  donut chart, 120pt
│  │       │   520 cal   │        ││  center: total calories
│  │       │   P/C/F     │        ││  segments: macro split
│  │       └────────────┘        ││
│  │                              ││
│  │  Protein   35g  ████████    ││  macro bars
│  │  Carbs     40g  ███████     ││
│  │  Fat       15g  ████        ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ ● SIA:                     ││  56pt — SIA Insight
│  │ "Good protein balance. This ││
│  │  meal hits 29% of your      ││
│  │  daily target."             ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ INGREDIENTS                  ││  ~200pt — Ingredients List
│  │                              ││
│  │ Chicken breast (150g)        ││
│  │   230 cal · 35g P · 0g C    ││
│  │ ─────────────────────────── ││
│  │ Whole wheat wrap (1)         ││
│  │   180 cal · 6g P · 30g C    ││
│  │ ─────────────────────────── ││
│  │ Mixed greens (50g)           ││
│  │    15 cal · 1g P · 2g C     ││
│  │ ─────────────────────────── ││
│  │ Caesar dressing (1 tbsp)     ││
│  │    95 cal · 0g P · 1g C     ││
│  └─────────────────────────────┘│
│                                 │
│          32pt bottom padding    │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt)
└─────────────────────────────────┘
```

### ASCII Wireframe — Food Logging Mode (default state, search empty)

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  Log food               Done │  56pt — Detail Header
├─────────────────────────────────┤
│                                 │  SCROLLABLE
│  ┌─────────────────────────────┐│
│  │ 🔍  Search food...     📷 📄││  52pt — Search Input
│  └─────────────────────────────┘│  barcode + receipt icons
│          8pt gap                │
│  ┌───────┐┌───────┐┌───────┐┌──┐│
│  │Brkfast││ Lunch ││Dinner ││Snk││  40pt — Meal Type Selector
│  └───────┘└───────┘└───────┘└──┘│  segmented control
│          16pt gap               │
│  RECENT                         │  eyebrow
│  ┌─────────────────────────────┐│
│  │ Chicken salad wrap      [+] ││  ~160pt — Recent Foods
│  │ 520 cal                     ││
│  │ ─────────────────────────── ││
│  │ Oatmeal with berries   [+] ││
│  │ 350 cal                     ││
│  │ ─────────────────────────── ││
│  │ Greek yogurt            [+] ││
│  │ 150 cal                     ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  FREQUENT                       │  eyebrow
│  ┌─────────────────────────────┐│
│  │ Coffee with milk        [+] ││  ~120pt — Frequent Foods
│  │ 45 cal                      ││
│  │ ─────────────────────────── ││
│  │ Banana                  [+] ││
│  │ 105 cal                     ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌───────────────────────────┐  │
│  │      + Add manually        │  │  44pt — Manual Entry Button
│  └───────────────────────────┘  │  secondary action
│                                 │
│          32pt bottom padding    │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt)
└─────────────────────────────────┘
```

### ASCII Wireframe — Food Logging Mode (active search)

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  Log food               Done │  56pt
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🔍  chick|             📷 📄││  52pt — active search
│  └─────────────────────────────┘│
│          8pt gap                │
│  ┌───────┐┌───────┐┌───────┐┌──┐│
│  │Brkfast││ Lunch ││Dinner ││Snk││  meal type (persists)
│  └───────┘└───────┘└───────┘└──┘│
│          16pt gap               │
│  RESULTS                        │  eyebrow
│  ┌─────────────────────────────┐│
│  │ Chicken breast (100g)   [+] ││  search results replace
│  │ 165 cal · 31g protein       ││  recent/frequent sections
│  │ ─────────────────────────── ││
│  │ Chicken thigh (100g)    [+] ││
│  │ 209 cal · 26g protein       ││
│  │ ─────────────────────────── ││
│  │ Chicken salad wrap      [+] ││
│  │ 520 cal · 35g protein       ││
│  │ ─────────────────────────── ││
│  │ Chicken tikka (serving) [+] ││
│  │ 280 cal · 25g protein       ││
│  └─────────────────────────────┘│
│                                 │
│  Can't find it?                 │  13pt, white 40%
│  ┌───────────────────────────┐  │
│  │      + Add manually        │  │  secondary action
│  └───────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │
└─────────────────────────────────┘
```

### ASCII Wireframe — Food Item Expanded (after tapping [+])

```
│  ┌─────────────────────────────┐│
│  │ Chicken breast (100g)       ││  expanded state
│  │ 165 cal · 31g protein       ││
│  │                              ││
│  │  Portion: [1 serving  ▼]   ││  dropdown selector
│  │  165 cal · 31g P · 0g C    ││  live macro update
│  │                              ││
│  │  ┌──────────────────────┐   ││
│  │  │   Add to lunch ✓     │   ││  green confirm button
│  │  └──────────────────────┘   ││
│  └─────────────────────────────┘│
```

### ASCII Wireframe — Manual Entry (expanded inline)

```
│  ┌─────────────────────────────┐│
│  │ ADD FOOD MANUALLY            ││  inline form
│  │                              ││
│  │  Food name                   ││  text input, 52pt
│  │  ┌───────────────────────┐  ││
│  │  │                        │  ││
│  │  └───────────────────────┘  ││
│  │                              ││
│  │  ┌────────┐  ┌────────▼┐   ││  portion row
│  │  │ Amount  │  │  Unit    │   ││  number + dropdown
│  │  └────────┘  └─────────┘   ││
│  │                              ││
│  │  ┌──────┐ ┌──────┐ ┌──────┐││  macro inputs (3 across)
│  │  │ Cal  │ │Protein│ │Carbs │││
│  │  └──────┘ └──────┘ └──────┘││
│  │  ┌──────┐                   ││
│  │  │  Fat │                   ││  4th macro below
│  │  └──────┘                   ││
│  │                              ││
│  │  ┌──────────────────────┐   ││
│  │  │     Add food ✓        │   ││  green confirm
│  │  └──────────────────────┘   ││
│  └─────────────────────────────┘│
```

### Component Stack — Meal View Mode (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system
   - Content: transparent

2. **Detail Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, edit action
   - Content: back chevron (left), meal name (center-left), "Edit" button (right)

3. **Meal Photo** — ~160pt (conditional)
   - Purpose: visual representation of the meal
   - Content: photo with r-xl corners, or omitted if no photo
   - 16pt top margin

4. **Meal Info** — ~56pt
   - Purpose: meal name and metadata
   - Content: meal name (20pt Semibold), date + time (13pt Regular, white 50%)
   - 16pt top margin (from photo), or 16pt from header if no photo

5. **Nutrition Breakdown Card** — ~200pt
   - Purpose: macro visualization for the meal
   - Content: donut chart (120pt) + 3 macro bars
   - 16pt top margin

6. **SIA Insight Card** — 56pt
   - Purpose: AI nutritional commentary
   - Content: purple dot + insight text
   - 16pt top margin

7. **Ingredients List Card** — variable (~50pt per ingredient)
   - Purpose: itemized nutritional breakdown
   - Content: ingredient rows with per-item macros
   - 16pt top margin

8. **Bottom Padding** — 32pt

9. **Tab Bar** — 56pt + 34pt safe area

### Component Stack — Food Logging Mode (top to bottom)

1. **Status Bar** — 44pt

2. **Detail Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, done action
   - Content: back chevron (left), "Log food" title (center-left), "Done" text button (right)

3. **Search Input** — 52pt
   - Purpose: primary food search with scanner access
   - Content: search field with barcode and receipt scanner icons
   - 12pt top margin

4. **Meal Type Selector** — 40pt
   - Purpose: categorize the logged food into a mealtime
   - Content: segmented control (Breakfast / Lunch / Dinner / Snack)
   - 8pt top margin

5. **Recent Foods Section** — ~160pt (when search empty)
   - Purpose: quick-add from recently logged foods
   - Content: eyebrow + food item rows with [+] buttons
   - 16pt top margin

6. **Frequent Foods Section** — ~120pt (when search empty)
   - Purpose: quick-add from most frequently logged foods
   - Content: eyebrow + food item rows with [+] buttons
   - 16pt top margin

7. **Search Results Section** — variable (replaces Recent + Frequent when searching)
   - Purpose: display food database matches
   - Content: food item rows with [+] buttons
   - 16pt top margin

8. **"Add manually" Button** — 44pt
   - Purpose: tertiary input method for custom food entries
   - Content: "+ Add manually" text button
   - 16pt top margin

9. **Manual Entry Form** — ~320pt (expanded inline when "Add manually" tapped)
   - Purpose: custom food entry with full macro input
   - Content: food name, portion, calorie/macro fields, confirm button
   - Replaces "Add manually" button when expanded

10. **Bottom Padding** — 32pt

11. **Tab Bar** — 56pt + 34pt safe area

---

## Components

### Detail Header (Meal View)
- **Purpose**: screen identification with edit action
- **Data source**: meal name from meal plan or food log
- **Visual treatment**: fixed bar, ink-900 background
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left
  - Meal name: 17pt Sora Semibold, white, left-aligned 56pt from left ("Lunch")
  - "Edit" button: 15pt Sora Semibold, Burnt Orange (#FF5E00), right-aligned 16pt from right, 44×44pt touch target
- **Gestures**: back pops stack; "Edit" transitions to Food Logging mode with current meal items pre-loaded

### Detail Header (Food Logging)
- **Purpose**: screen identification with done action
- **Data source**: N/A (static title)
- **Visual treatment**: fixed bar, ink-900 background
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: same as Meal View
  - Title: "Log food" in 17pt Sora Semibold, white
  - "Done" button: 15pt Sora Semibold, Burnt Orange (#FF5E00), right-aligned, 44×44pt touch target
- **Gestures**: back pops stack; "Done" saves logged items and pops stack

### Meal Photo
- **Purpose**: visual representation of the meal
- **Data source**: user-captured photo or AI-generated placeholder
- **Visual treatment**: full-width minus 32pt, r-xl (28pt) corners, aspect ratio ~16:10
- **Size**: full-width minus 32pt × ~160pt
- **Variants**:
  - Photo present: displays photo with warm overlay gradient at bottom for text readability
  - No photo: section is omitted entirely (no placeholder)
- **Gestures**: tap → full-screen photo viewer (zoom/pan)

### Nutrition Breakdown Card (Meal View)
- **Purpose**: visual macro distribution for the meal
- **Data source**: calculated from meal ingredients
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~200pt
- **Sub-elements**:
  - Eyebrow: "NUTRITION", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Donut chart: 120pt diameter, centered. 12pt stroke width. Segments:
    - Protein: #FF5E00 (Burnt Orange)
    - Carbs: #FFFFFF at 40%
    - Fat: #FFFFFF at 20%
  - Center text: total calories in 20pt Sora Semibold, white ("520 cal"). "P / C / F" in 11pt Regular, white at 40%, below.
  - Macro bars (below donut, 16pt gap): 3 rows, same spec as Macro Progress Bar from Screen 28 but without target indicator (showing absolute values, not progress toward target)
    - Protein: label + value (15pt Semibold) + bar (Burnt Orange fill)
    - Carbs: label + value + bar (white at 40% fill)
    - Fat: label + value + bar (white at 20% fill)
  - Bars are proportional to each other (largest macro = full width, others proportional)
- **Variants**:
  - Populated: donut + bars with data
  - Single ingredient: simplified — no donut, just macro bars
  - Loading: skeleton shimmer
- **Gestures**: none (informational display)

### SIA Insight Card (Meal View)
- **Purpose**: AI nutritional commentary on this specific meal
- **Data source**: AI analysis of meal composition vs. daily goals
- **Visual treatment**: ink-brown-800 card, r-md (14pt), 16pt padding
- **Size**: full-width minus 32pt × 56pt (compact)
- **Sub-elements**:
  - Purple dot: 6pt, #7F24FF, 16pt from left
  - Insight text: 13pt Sora Regular, white, max 2 lines
  - Examples: "Good protein balance. This meal hits 29% of your daily target." / "High in carbs relative to your usual lunch." / "Consider adding a green vegetable for micronutrients."
- **Variants**: always present in Meal View mode
- **Gestures**: tap → SIA Chat [09] with this meal's nutrition context

### Ingredients List Card (Meal View)
- **Purpose**: itemized nutritional breakdown per ingredient
- **Data source**: meal ingredient data from food log or meal plan
- **Visual treatment**: ink-brown-800 card, r-xl (28pt), 24pt padding
- **Size**: full-width minus 32pt × variable (~50pt per ingredient)
- **Sub-elements**:
  - Eyebrow: "INGREDIENTS", 12pt Sora Semibold, white at 40%, uppercase
  - Ingredient rows (~44pt each):
    - Name + portion: 15pt Sora Regular, white ("Chicken breast (150g)")
    - Macro line: 12pt Sora Regular, white at 50% ("230 cal · 35g P · 0g C · 8g F"), 4pt below name
    - Separator: 1pt, white at 10%, full content width (not on last item)
- **Variants**:
  - Standard: list of ingredients
  - Single food item: one row, no separator
  - Empty (shouldn't happen in Meal View): N/A
- **Gestures**: tap ingredient row → no action (informational)

### Search Input (Food Logging)
- **Purpose**: primary food search with integrated scanner access
- **Data source**: food database (API)
- **Visual treatment**: ink-brown-800 background, 1pt border white at 10% (default), 2pt Burnt Orange border (focused), r-md (14pt)
- **Size**: full-width minus 32pt × 52pt
- **Sub-elements**:
  - Search icon: magnifying glass, 20pt, white at 40%, 16pt from left
  - Placeholder text: "Search food...", 16pt Sora Regular, white at 40%
  - Input text: 16pt Sora Regular, white
  - Barcode scanner icon: camera icon, 20pt, white at 50%, 44×44pt touch target, right-aligned with 48pt from right edge
  - Receipt scanner icon: document/receipt icon, 20pt, white at 50%, 44×44pt touch target, right-aligned 16pt from right edge
  - 8pt gap between the two scanner icons
  - Clear button (when text entered): X icon, 16pt, white at 40%, replaces scanner icons, 44×44pt touch target
- **Behavior**:
  - Tap field: keyboard opens, scanner icons remain visible
  - Type text: after 2+ characters, search results appear below (debounced 300ms). Scanner icons replaced by clear X.
  - Clear search: results disappear, recent/frequent sections return
- **Gestures**: tap field to focus; tap barcode icon to open scanner; tap receipt icon to open scanner; tap X to clear

### Meal Type Selector (Food Logging)
- **Purpose**: categorize food into a mealtime
- **Data source**: time-of-day auto-selection + user override
- **Visual treatment**: segmented control, ink-brown-800 background, r-md (14pt)
- **Size**: full-width minus 32pt × 40pt
- **Sub-elements**:
  - 4 segments: "Breakfast", "Lunch", "Dinner", "Snack"
  - Each segment: equal width, 13pt Sora Semibold
  - Active segment: ink-900 background (darker), white text, r-sm (10pt). Subtle slide animation between segments.
  - Inactive segment: transparent background, white at 50% text
- **Auto-selection**: based on time of day — before 11am = Breakfast, 11am-2pm = Lunch, 2pm-5pm = Snack, 5pm-9pm = Dinner, 9pm+ = Snack. User can override by tapping.
- **Gestures**: tap segment to select (160ms slide animation, light haptic)

### Food Item Row (Recent / Frequent / Search Results)
- **Purpose**: display a food item with quick-add action
- **Data source**: food database, user history
- **Visual treatment**: list row in ink-brown-800 card, r-md, 16pt padding
- **Size**: full-width minus 32pt × ~48pt per row
- **Sub-elements**:
  - Food name: 15pt Sora Regular, white, left-aligned
  - Macro info: 12pt Sora Regular, white at 50%, below name ("520 cal · 35g protein" for search results; "520 cal" only for recent/frequent)
  - [+] button: 32pt circle, ink-900 background, 1pt white at 10% border, white "+" icon (16pt), right-aligned, 44×44pt touch target
  - Separator: 1pt, white at 10%, between rows (not on last)
- **Expanded state** (after [+] tap):
  - Row height expands to ~120pt (280ms, ease-out-soft)
  - Portion selector: dropdown, 44pt height, ink-900 bg, r-md, "1 serving ▼" default, white text
  - Live macro update: 12pt Sora Regular, white at 50%, updates as portion changes
  - "Add to [meal type]" button: 40pt height, full row content width, Forest Green (#34A853), white text "Add to lunch ✓" in 15pt Sora Semibold, r-pill
- **After adding**:
  - Row collapses back (280ms)
  - Green checkmark overlay on the row (600ms, fades out)
  - Success haptic
  - "+25 XP" micro-toast at top of screen
  - If on Screen 28, macro bars would update (reflected on back navigation)
- **Gestures**: tap [+] to expand; tap portion dropdown to change; tap "Add to [meal]" to confirm; tap row body (not [+]) for no action in logging mode

### Manual Entry Form (Food Logging)
- **Purpose**: custom food entry when search/quick-add can't find the item
- **Data source**: user input
- **Visual treatment**: ink-brown-800 card, r-xl (28pt), 24pt padding. Appears inline, replacing "Add manually" button.
- **Size**: full-width minus 32pt × ~320pt
- **Sub-elements**:
  - Eyebrow: "ADD FOOD MANUALLY", 12pt Sora Semibold, white at 40%, uppercase
  - Food name input: 52pt, ink-900 bg, 1pt white at 10% border (default), 2pt Burnt Orange (focused), r-md. Placeholder "Food name". 16pt Sora Regular.
  - Portion row (side-by-side):
    - Amount input: 52pt, same style as food name. Numeric keyboard. Placeholder "Amount". ~50% width minus 4pt gap.
    - Unit dropdown: 52pt, ink-900 bg, r-md, "Unit ▼" placeholder. Dropdown options: g, oz, ml, cup, tbsp, tsp, piece, serving. ~50% width minus 4pt gap.
  - Macro inputs (3 across + 1 below):
    - Each: 52pt, ink-900 bg, 1pt white at 10% border, r-md, numeric keyboard
    - Row 1: "Cal" / "Protein" / "Carbs" — each ~33% width minus 4pt gaps
    - Row 2: "Fat" — same width, left-aligned
    - Labels: eyebrow above each (11pt Semibold, white at 40%)
    - Values: 16pt Sora Regular, white
  - "Add food" button: 44pt height, full card content width, Forest Green (#34A853), white text "Add food ✓" in 15pt Sora Semibold, r-pill. 16pt top margin.
  - All fields 8pt vertical gap between rows
- **Expand animation**: height 0→320pt, 520ms, ease-out-soft. "Add manually" button crossfades into form.
- **After adding**: form collapses (280ms), green checkmark flash, success haptic, "+25 XP" toast. "Add manually" button reappears.
- **Gestures**: tap fields to edit; tap "Add food" to save; tap back/outside to collapse (with confirmation if data entered)

### Barcode Scanner Overlay
- **Purpose**: scan food barcode for instant lookup
- **Data source**: barcode → food database API
- **Visual treatment**: half-sheet (z-40), slides up from bottom, camera viewfinder
- **Size**: full-width × ~50% screen height
- **Sub-elements**:
  - Drag handle: 4pt × 36pt, white at 20%, centered, 8pt from top
  - Camera viewfinder: live camera feed, full sheet width
  - Alignment guide: rounded rectangle outline (white at 40%, 2pt), centered in viewfinder (~60% width)
  - Instruction: "Point at barcode" in 13pt Sora Regular, white, centered below guide
  - Close button: X icon, 20pt, white, top-right, 44×44pt touch target
- **Behavior**:
  - On detection: overlay auto-dismisses (slide down, 280ms). Detected food item populates search results with "Scanned" badge (green pill, 11pt).
  - Not found: "Not found in database. Try manual entry?" message replaces instruction text. "Add manually" text link below.
  - Camera permission denied: "Camera access needed" message with "Open settings" button.
- **Gestures**: drag down to dismiss; tap X to close; barcode detection is automatic

### Barcode Scan → Confirm Flow (Clarification)

Barcode scanning does NOT auto-add food. The flow is:

1. User taps barcode icon → camera half-sheet opens
2. Camera detects barcode → half-sheet auto-dismisses (slide down, 280ms)
3. Detected food item appears as the TOP result in the search results list with a "Scanned" badge (11pt Semibold, green (#34A853), --r-pill, 6pt horizontal / 2pt vertical padding)
4. User must tap the [+] button on the scanned result to add it (same Quick-Add Row interaction as manual search results)
5. Portion selector appears → user confirms portion → food is logged

The user always has the final confirmation step. Scanning is a search shortcut, not an auto-add.

**"Not found" flow:**
- If barcode is not in the database: toast appears "Food not found" (standard toast pattern)
- Search results show empty with "Add manually" CTA (orange text link, 44pt touch target)
- Tap "Add manually" → switches to Manual Entry mode (same-screen mode transition, 520ms crossfade)

### Receipt Scanner Overlay
- **Purpose**: scan a receipt to extract multiple food items via AI
- **Data source**: photo → AI OCR → food items
- **Visual treatment**: full-frame camera overlay (z-40), slides up from bottom
- **Size**: full-width × ~60% screen height
- **Sub-elements**:
  - Drag handle: same as barcode scanner
  - Camera viewfinder: full frame, no alignment guide (receipts vary in size)
  - Capture button: 64pt circle, white stroke (2pt), centered at bottom of viewfinder, 44pt from bottom edge
  - Close button: X icon, same as barcode
  - Processing state: after capture, viewfinder freezes, "SIA is reading your receipt..." overlay with subtle pulse animation
  - Results: extracted items appear as a checklist below the frozen image
    - Each item: checkbox (pre-checked, 24pt, Burnt Orange when checked) + food name + estimated macros
    - "Add all" button: Forest Green, full-width, "Add X items ✓"
    - "Cancel" text link below
- **Behavior**:
  - Capture: medium haptic. Processing takes 2-3 seconds.
  - Items found: review list appears. User unchecks incorrect items.
  - "Add all": logs all checked items, dismisses overlay, success haptic, "+XP" toast for each item.
  - No items found: "Could not read receipt. Try a clearer photo?" with "Retake" and "Cancel" options.
- **Gestures**: tap capture button; tap checkboxes to toggle; tap "Add all" to confirm; drag down to dismiss

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism |
| "Edit" / "Done" text | #FF5E00 | burnt-orange | 60% — header action |
| Search focus border | #FF5E00 | burnt-orange | 60% — active field |
| Input focus borders | #FF5E00 | burnt-orange | 60% — active field |
| Active segment (selector) | #0A0A0F | ink-900 | darker = selected |
| Donut: protein segment | #FF5E00 | burnt-orange | 60% — primary macro |
| Donut: carbs segment | #FFFFFF at 40% | white-40 | secondary |
| Donut: fat segment | #FFFFFF at 20% | white-20 | tertiary |
| Macro bar: protein fill | #FF5E00 | burnt-orange | 60% — primary |
| Macro bar: carbs/fat fill | #FFFFFF at 40% / 20% | white | secondary |
| "Add to [meal]" button | #34A853 | forest-green | 30% — completion |
| "Add food" button | #34A853 | forest-green | 30% — completion |
| Checkmark overlay | #34A853 | forest-green | 30% — success |
| "Scanned" badge | #34A853 | forest-green | 30% — success |
| Receipt checkbox (checked) | #FF5E00 | burnt-orange | 60% — active |
| SIA purple dot | #7F24FF | royal-purple | 10% — AI indicator |
| Scanner icons | #FFFFFF at 50% | white-50 | secondary |
| [+] button | #0A0A0F / white | ink-900 / white | action |
| Primary text | #FFFFFF | white | headings, names |
| Secondary text | #FFFFFF at 50% | white-50 | macros, captions |
| Placeholder text | #FFFFFF at 40% | white-40 | input hints |

**60/30/10 verification**: orange on donut protein segment, protein macro bar, focus borders, header action text, receipt checkboxes (60%). Green on all "add/confirm" buttons, checkmark overlays, scanned badge (30% — completion). Purple on single SIA dot in Meal View (10%). Meal View and Food Logging both maintain the ratio cleanly.

---

## Interaction States

### Search Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 10% border, placeholder text | — |
| Focused | 2pt Burnt Orange border, cursor visible, keyboard open | light impact |
| Active (typing) | text appears, scanner icons → clear X after 2+ chars | — |
| Disabled | N/A | — |
| Loading | inline spinner right of text (while searching) | — |
| Error | "Search failed. Try again." below field | — |
| Success | results appear below | — |

### [+] Quick-Add Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 circle, white "+", 1pt border | — |
| Pressed | scale(0.9), bg lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | spinner replaces "+" (while expanding) | — |
| Error | N/A | — |
| Success | green checkmark replaces "+" (600ms) | success notification |

### "Add to [meal]" Green Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Forest Green fill, white text, r-pill | — |
| Pressed | darker green (#2D9249) + scale(0.97) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (no portion selected) | — |
| Loading | spinner replaces text | — |
| Error | red border, "Could not add" text | error notification |
| Success | green glow (600ms) | success notification |

### "Add Manually" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white text "+ Add manually", r-pill, 1pt white at 10% border | — |
| Pressed | bg darkens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A (transitions to form) | — |

### Meal Type Segment
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | transparent bg, white at 50% text | — |
| Pressed | slight bg darken | light impact |
| Active (selected) | ink-900 bg, white text, r-sm | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Barcode Scanner Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | camera icon, white at 50% | — |
| Pressed | white at 30%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (when search has text) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Receipt Scanner Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | document icon, white at 50% | — |
| Pressed | white at 30%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (when search has text) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Meal Row (Meal View — tapping from dashboard)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | meal data display | — |
| Pressed | N/A (this is the landing screen) | — |
| Focus-visible | N/A | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | "Could not load meal data" | — |
| Success | N/A | — |

### "Edit" Header Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange text | — |
| Pressed | darker orange, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A (transitions to logging mode) | — |

### "Done" Header Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange text | — |
| Pressed | darker orange, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (if no changes) | — |
| Loading | spinner replaces text | — |
| Error | N/A | — |
| Success | pops stack | success notification |

### Manual Entry Input Fields
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, 1pt white at 10% border | — |
| Focused | 2pt Burnt Orange border | light impact |
| Active (with value) | white text value | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | 2pt red border, error label below | error notification |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action | Mode |
|---------|--------|--------|------|
| Swipe right from edge | Screen | back navigation | Both |
| Tap | "Edit" (header) | transition to Food Logging mode | Meal View |
| Tap | Meal photo | full-screen photo viewer | Meal View |
| Tap | SIA insight card | SIA Chat with meal context | Meal View |
| Tap | Search field | focus + keyboard | Food Logging |
| Tap | Barcode icon | open barcode scanner half-sheet | Food Logging |
| Tap | Receipt icon | open receipt scanner overlay | Food Logging |
| Tap | [+] button | expand food item row | Food Logging |
| Tap | Portion dropdown | open portion picker | Food Logging |
| Tap | "Add to [meal]" | log food, collapse row, XP toast | Food Logging |
| Tap | Meal type segment | select mealtime category | Food Logging |
| Tap | "Add manually" | expand manual entry form inline | Food Logging |
| Tap | "Add food" (manual) | save manual entry, collapse form | Food Logging |
| Tap | "Done" (header) | save + pop stack | Food Logging |
| Drag down | Scanner overlay | dismiss scanner | Food Logging |

**Haptic feedback points**:
- Search field focus: light impact
- [+] button press: light impact
- Food added (any method): success notification
- Meal type segment change: light impact
- Barcode detected: success notification
- Receipt captured: medium impact
- Receipt items added: success notification
- "Done" press: light impact
- Scanner dismiss drag: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Meal View content | Screen mount | staggered fade-in (80ms stagger) | 280ms each | ease-out-soft |
| Donut chart segments | Mount | draw-in from 0° | 520ms | ease-flow |
| Macro bars (meal view) | Mount | width 0→value | 280ms | ease-out-soft |
| Food Logging content | Screen mount / mode switch | staggered fade-in | 280ms each | ease-out-soft |
| Mode transition | "Edit" tap | crossfade below header | 520ms | ease-out-soft |
| Search results appear | After 2+ chars + debounce | fade-in list, stagger 40ms per item | 280ms each | ease-out-soft |
| Recent/Frequent disappear | Search starts | fade-out | 160ms | ease-out-soft |
| Recent/Frequent reappear | Search cleared | fade-in | 280ms | ease-out-soft |
| Food row expand | [+] tap | height 48→120pt | 280ms | ease-out-soft |
| Food row collapse | "Add" tap | height 120→48pt + green checkmark | 280ms | ease-out-soft |
| Green checkmark overlay | Food added | scale 0→1.0 + fade out | 600ms | ease-out-soft |
| Manual form expand | "Add manually" tap | height 0→320pt + crossfade | 520ms | ease-out-soft |
| Manual form collapse | "Add food" tap | height 320→0pt | 280ms | ease-out-soft |
| "+25 XP" toast | Food added | slide down from top + fade | 280ms in, hold 1.5s, 280ms out | ease-out-soft |
| Scanner half-sheet | Icon tap | slide up from bottom | 280ms | ease-out-soft |
| Scanner dismiss | Drag down / X | slide down | 280ms | ease-out-soft |
| Meal type segment slide | Segment tap | active indicator slides | 160ms | ease-out-soft |
| Portion dropdown | Tap | standard iOS picker presentation | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user, Meal View)
- If arriving at a planned meal that hasn't been logged: full meal plan data shown (from SIA's plan). SIA insight says: "This is SIA's suggestion. Adjust any ingredient to match what you actually ate."
- "Edit" button in header is prominent to encourage logging actual intake.

### Day 1 (new user, Food Logging)
- Search input with placeholder "Search food..."
- Recent foods section: "No recent foods yet. Search or scan to get started." in 15pt Regular, white at 50%.
- Frequent foods section: hidden (no data)
- "Add manually" button visible as fallback
- Meal type auto-selected by time of day

### Established user (Food Logging)
- Recent and Frequent sections populated from history
- Search yields results from personal history first, then broader database

---

## Motivation Adaptation

- **Low motivation**: Meal View shows simplified macros (calories only, no protein/carbs/fat breakdown). Food Logging shows only Recent foods (not Frequent or search — simplest path). Manual entry hidden. SIA insight is gentler: "Any tracking is good tracking."
- **Medium motivation**: default experience. All features visible.
- **High motivation**: Meal View adds micronutrient breakdown (fiber, sodium, sugar, vitamins). Food Logging adds portion estimator tool (visual guide). Manual entry pre-expanded. Recent foods show more items (5 instead of 3).

---

## Cross-References

- **Navigates to**: Screen 28 (Nutrition Dashboard) via stack pop, Screen 09 (SIA Chat) via tab switch (from SIA insight)
- **Navigates from**: Screen 28 (Nutrition Dashboard) via stack push — meal row tap (Meal View) or FAB (Food Logging), Screen 09 (SIA Chat) via deep-link, Screen 12 (Home Screen) via action card
- **Shared components with**: Screen 27 (Detail Header, Multi-Mode Pattern — entry-point determined vs. sequential, SIA compact note), Screen 28 (Macro Progress Bar pattern in nutrition breakdown, meal type labels)
- **Patterns used**: Detail Screen Template (Screen 27), Multi-Mode Screen Pattern (Screen 27 — adapted for entry-point-determined modes), Back Button (Batch 1), Text Input Field (Batch 1), 8-State Interaction Model
- **Patterns established**: Search-First Input Pattern (search field with embedded scanner icons, results replacing default lists), Quick-Add Row (food item with [+] expand → portion → confirm), Manual Entry Inline Form (collapsible form that expands in place), Barcode Scanner Half-Sheet (camera overlay for barcode detection), Receipt Scanner Overlay (camera + AI extraction + checklist review), Portion Selector Dropdown (inline dropdown with live macro update)
