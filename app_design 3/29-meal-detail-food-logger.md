# Screen Design: Meal Detail / Food Logger

**Screen**: 29 of 73
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
- **Visual treatment**: ink-brown-800 card, r-xl (28pt), 24pt padding
- **Size**: full-width minus 32pt × 56pt (compact)
- **Sub-elements**:
  - Purple dot: 6pt, #7F24FF, 24pt from left
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

## Visualization

> Source: no companion file (`29-…-visualization-recommendations.md` not present); Audited in `viz-audit/` — Batch (Tracker B), findings `S29-V01..V04`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Benchmark = **MyFitnessPal premium / Cronometer + Bevel** (macro rings/donuts, dense food-logs done cleanly) rendered **the Balencia way** (warm-glow donut on ink-brown, honest calorie-share whole), not an MFP/Cronometer clone. **Register = Product Mode → orange-dominant** (nutrition-lime `#84CC16` stays an *identity* accent on the meal badge/photo gradient only — **never** on data ink). **Current grade D (52) → specced-target A− (85).** *(Honest re-grade under the 10-dimension rubric. The CURRENT grade is grounded on what `/domains/meal` renders **today**: the spec's donut + macro bars are **unbuilt** — Meal View ships four flat text stat tiles [Cal/Protein/Carbs/Fat] + a text-macro ingredient list; the `Donut/Pie` primitive `VK-007` does not yet exist in `components/charts/`. The residual gap to A+++ is build-verified depth + the working tap-to-isolate micro-interaction, owned by the later viz-build program.)*

This is a **light Tracker B / detail screen**, not a domain dashboard — its job is to read the composition of **one** meal clearly, not to chart a multi-series dashboard. **Editorial restraint governs:** the screen has exactly **one** part-of-whole worth visualizing (the macro split) and **one** secondary comparison (macros vs *this meal's* own total, or vs daily target). The Food-Logging mode is a search/quick-add utility with **no** standing data to chart — it stays deliberately textual (over-charting a search list would be chart-noise). So this is a focused **2-visual** section (donut hero + macro bars), not a five-chart dashboard. Mints **no** new primitive — it **consumes** `VK-007 Donut/Pie` (minted in Nutrition [28]) and the deployed `MacroBar`.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Resolution |
|---|---|---|---|
| Meal macro split (P 35g · C 40g · F 15g → **by calorie share**) | flat text tiles + spec's unbuilt donut | **hero macro `Donut`** (96px card size) — slices by **calorie share**, orange protein primary, hub = total calories | **visualized** — `Donut/Pie` (`VK-007`) |
| Total calories (520) | text in a tile | **donut center hub** (`text-h2`) + "cal" sub-label naming the whole | visualized (hub of V01) |
| Per-macro absolute grams (35 / 40 / 15) | flat text tiles | **`MacroBar` ×3** vs this-meal max (or daily-target when a goal exists) — honest, labelled, value-beside-bar | **visualized** — `MacroBar` (`VK-006`) |
| Per-ingredient macros (4 rows: cal · P · C · F) | text rows | **micro composition bar** per row (tiny 3-segment calorie-share fill, no hub/glow) — optional, high-motivation | **deferred** (textual default; micro-bar at high-motivation) |
| SIA "29% of daily target" insight | text in purple-dot card | **inline daily-target context** surfaced on the donut hub sub-label *only when a goal exists* | deferred to hub context |
| Meal name · date · time · meal-type · "Logged" badge | text | — (one-off scalars / labels — no useful visual form) | **deliberately textual** |
| Meal photo | image | — (content, not data) | deliberately textual |
| Search / Recent / Frequent / results / scanner / manual form (Logging mode) | list rows + inputs | — (a logging utility with no standing series; charting it is noise) | **deliberately textual** |

**Editorial hierarchy (calm, not maximal):** the **macro `Donut` is the one viz hero** of Meal View; the three `MacroBar`s are clearly secondary; per-ingredient micro-bars are ambient and gated to high-motivation. Food-Logging mode carries **zero** charts by design. Two charts, one focal — a *detail* screen, not a dashboard.

### 1 · Macro split donut (hero) — `S29-V01` → `Donut/Pie` (`VK-007`, consumed from Nutrition [28])

Promote the meal's macro composition from four flat text tiles to **one** warm focal **`Donut`** (96px card size — *not* a 140px hero; this is a detail card, restraint). It composes the kit primitive at `CONSISTENCY.md` parameters: SVG arc paths, `stroke-linejoin/linecap: round`, **2px gap** between slices (reveals `ink-brown-800` for carved separation), **consistent inner-radius** with every other donut in the app, center **hub** = total calories `text-h2` white + "cal" sub-label naming the whole.

- **Honest whole (non-negotiable, RUBRIC dim 5 — fixes a live spec defect):** slices are sized by **calorie share, NOT gram share.** The current spec/Color-Map sizes the donut by grams (protein 35 / carbs 40 / fat 15) while the center reads *calories* (520) — that is a **dishonest composition** (a gram is not a calorie; fat is 9 cal/g, protein & carbs 4 cal/g). Correct shares: protein 35×4 = 140 cal (~32%), carbs 40×4 = 160 cal (~37%), fat 15×9 = 135 cal (~31%) of the **435 macro-calories**. The hub shows the **logged total (520)**; the ~85 cal gap (fiber/rounding/un-attributed) is disclosed as hub sub-text ("435 from macros"), **never** padded into a phantom slice. A 0-gram macro is **omitted**, never a zero-width wedge.
- **Brand slice colours (60/30/10-safe — no rainbow):** **largest/primary by calorie = `--color-brand-orange`** (protein or carbs, whichever leads); the remaining two macros = warm neutral tints `--color-alpha-white-40` then `--color-alpha-white-20` (carbs / fat order by share). **Never** one-hue-per-macro (a Cronometer/MFP rainbow clone + a 60/30/10 violation); **never** purple (no SIA origin); nutrition-lime is identity-only and stays off the donut.
- **Depth (token-backed):** `--glow-orange-sm` (~12px **mint**) on the **primary orange slice only** (96px card scale — the full 32px `--glow-orange` would swamp it, a depth *failure*); faint radial backplate behind the ring; `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess under the ring; `ink-brown-800` card + top-edge highlight.
- **Micro-interaction:** tap a slice → it isolates (others dim to `--color-alpha-white-20`) and the hub swaps to that macro's grams + calorie-share % (`--dur-fast` 160ms); tap-out restores. Slice hit-wedges ≥ **44×44pt**.
- **States:** **empty / cold-start** (un-logged planned meal) → a **ghosted full-ring outline** + hub prompt ("Log this meal to see its split") — **never** a collapsed disc or a misleading 100%-of-one-macro ring; **single-ingredient** meal → donut still valid if 2+ macros present, else omit donut and show macro bars only (per existing "single ingredient" variant); **loading** → a ring skeleton that **draws** into the real arcs (not a blank disc); **over/edge** → handled in hub text, never by distorting slice shares.
- **Data:** computed from `mealDetail.meal` (`calories`/`protein`/`carbs`/`fat`) in `mock.ts` — **no new data**; the calorie-share transform is a pure derivation. *(Build note: `VK-007 Donut/Pie` is **not yet** in `components/charts/`; this section consumes the primitive minted on Nutrition [28] — it is unbuildable until that lands, which is the core CURRENT-grade finding.)*

### 2 · Macros-vs-target bars — `S29-V02` → `MacroBar` ×3 (`VK-006`)

The three macro absolutes (35 / 40 / 15 g) render as the deployed **`MacroBar`** beneath the donut (the donut shows *proportion*, the bars show *magnitude vs a reference* — complementary, the one view a donut structurally can't give). Each bar: label · value-beside-bar · `--color-alpha-white-08` track over `--track-inset` recess · **`--color-brand-orange` fill** (the protein/primary bar) with carbs/fat in `--color-alpha-white-40` / `-20` to echo the donut tints. Reference scale (honest, disclosed): **vs daily macro target when a nutrition goal exists** (the SIA "29% of daily target" line becomes literal), else **vs this-meal's largest macro** (proportional, the current spec intent) — the section **states which** so the bar never implies a target that isn't set.
- **Honesty:** **one shared scale** across the three bars (zero baseline); when target-relative, a bar may legitimately exceed 100% (over-target) and shows the overflow honestly in the label, never by clipping.
- **Depth / motion:** fills rise width 0→value `--dur-slow` 520ms `--ease-flow`; no glow (glow lives on the donut slice).
- **States:** loading → track + skeleton value; no-target user → proportional mode (no fabricated target line).
- **Data:** `mealDetail.meal` macros (+ a `nutritionGoal.macroTargets` lookup when present) in `mock.ts`.

### 3 · Per-ingredient composition micro-bar (optional) — `S29-V03` → micro `MacroBar`

**High-motivation tier only.** Each ingredient row gains a tiny 3-segment **calorie-share fill** (no hub, **no glow**, ≤8px tall, same orange-primary + neutral-tint encoding as the donut) so the eye sees which ingredient drives which macro. Default / medium / low-motivation tiers keep the **textual** macro line (`230 cal · 35g P · 0g C · 8g F`) — adding a bar to every ingredient row at the base tier is chart-noise on a detail screen (penalised under Data-resolution over-resolution).
- **States:** loading → text only; a 0-macro ingredient shows a single full orange/neutral segment, never an empty bar implying missing data.
- **Data:** `mealDetail.ingredients[]` (already present) — no new data.

### 4 · Food-Logging mode — deliberately chart-free — `S29-V04`

Logging mode is a **search/quick-add utility**, not a data surface: the only "numbers" are per-result calorie/protein scalars, which belong as the existing clean text. **No chart is added here by design** — a sparkline or donut on a search row would be decorative non-data noise (RUBRIC dim 5) and is explicitly *not* specced. The one honesty rule that does apply: the **`+25 XP` toast** and the green confirm states are framed as *completion/reward*, never as loss-aversion ("don't break your log streak"); the quick-add never shames an un-logged meal.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: in **Meal View**, the **donut draws first** — arcs sweep clockwise from 12 o'clock via `stroke-draw` (`--dur-flow` 1200ms `--ease-flow`), **largest → smallest** (primary orange slice first), hub counts up 520ms — **then** the three `MacroBar`s rise (520ms `--ease-flow`, 80ms stagger) — **then** the ingredient list staggers in (existing 80ms content stagger); high-motivation ingredient micro-bars fill last. One part-of-whole motif per surface (the donut is the only arc viz). Below-fold visuals animate on **scroll-into-view**. **Food-Logging mode** keeps its existing list fade/stagger — no chart motion. `prefers-reduced-motion` → donut arcs at rest at final shares + hub at final value, bars at final width, instantly (no sweep) — the static composition is fully legible.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / un-logged planned meal** — donut = ghosted full-ring outline + "Log this meal to see its split" hub prompt (never a fake 100%-of-one-macro ring or a collapsed disc); macro bars at zero with a "no foods logged" affordance; **loading** — depth-preserving skeletons that *morph* into drawn data (ring skeleton draws into arcs, bar tracks draw into fills — never blank discs/boxes); **single-ingredient / partial** — donut omitted if <2 macros, bars retained; a 0-gram macro is **omitted** from the donut, distinct from a missing-data ghost; **error** — "Could not load meal data" on the breakdown card with a visible retry (per the Error Handling table), Logging-mode search/scanner errors per their existing rows.
- **60/30/10:** **orange dominates** data ink (donut primary slice, protein/primary macro bar, the isolate-on-tap accent); **green** = completion only (the "Add to [meal]" / "Add food" confirm buttons, the success checkmark, the "Logged" arrival state — never a data series); **purple stays SIA-only** (the single SIA-insight dot — *no* purple on any chart, since nothing here is SIA-forecast); **nutrition-lime `#84CC16`** is confined to **identity** (meal badge, photo-gradient wash) — **never** on the donut, bars, or a CTA. Glow uses the size-stepped scale (96px donut = `--glow-orange-sm` on the primary slice only; bars/micro-bars = none) — warm depth, not neon.
- **Non-shaming:** macro composition is framed as **information, never a verdict** — no "too much fat" red, no alarm colour on any slice or bar; a high-fat or over-target reading is shown by number + neutral tint, not a danger hue; the SIA insight stays constructive ("Good protein balance…"), and the XP/streak framing never weaponises a skipped log.
- **Accessibility:** the donut carries an `aria-label` enumerating every slice — "Protein 32%, carbs 37%, fat 31% of 520 calories (435 from macros)"; a **visible** in-situ legend/labels accompany the slices (never colour-alone — orange-vs-white-tint is reinforced by the per-macro label + value); each `MacroBar` has a text equivalent ("Protein 35 grams"); label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — donut slice arcs, the 2px inter-slice boundaries, and bar fills all meet **≥ 3:1** vs background (the faint radial backplate is decorative-only); interactive slice/bar targets ≥ **44×44pt**; `prefers-reduced-motion` renders the donut + bars at final state with the composition fully conveyed.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** MyFitnessPal premium / Cronometer + Bevel (macro rings/donuts, dense food-logs done cleanly) — *stays Balencia via the warm-glow donut on ink-brown + continuous-stroke search/quick-add flows, not a flat stat list.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Visualization section's donut + macro bars are A− (strong, honest, warm-glow); but (1) the Meal View surfaces are flat `--color-ink-brown-800` cards with no top-edge highlight or layered depth; (2) the two modes (Meal View vs Food Logging) split the focal hierarchy — Meal View is a data hero (the donut), Food Logging is a utility (search-first), and the transition is not choreographed into a clear focal sequence; (3) edge microcopy on the Food Logging side (empty Recent/Frequent, no search results, scanner failures, permission denials) is partly unwritten; (4) type rhythm is ad-hoc (15pt / 13pt / 12pt scattered, line-heights not tokenized); (5) the state-craft table (cold-start, loading, error) is missing designed layouts for the Food Logging side; (6) contrast pairs are asserted, not tabulated.

### Focal hierarchy

**Meal View mode:** One focal point — the **hero Nutrition Breakdown Card** (the donut + macro bars, ~200pt vertical span, the only ≥96px glowing element above the fold). The Meal Info block (name + date, ~56pt) sits above as a warm preamble, not a competing focal. The donut is the visual anchor (the only continuous stroke on screen). Everything below (SIA Insight, Ingredients List) is visibly secondary — smaller, no glow, supporting in role. The squint test lands on the donut hub (total calories) first, then the macro slices, then the ingredient list as detail. One focal point.

**Food Logging mode:** The focal point is the **Search Input field** (52pt, fixed at top, always visible, the primary interaction point). Meal Type Selector is a supporting row (40pt, tight coupling below search). Recent/Frequent sections and search results are the secondary scroll zones. The "Add manually" button is the tertiary input path. This mode is deliberately utilitarian (search-first, quick-add, minimal glow) — the squint test reads "search here" first, then "pick a meal type," then "browse quick-add." No competing foci across the two modes.

**Mode transition:** the Meal View and Food Logging modes are entry-point determined, not sequential. Transition from Meal View to Food Logging mode (tap "Edit") uses content crossfade (520ms, ease-out-soft) below the stable Detail Header — the focal shift from data hero (donut) to utility hero (search input) is clear and smooth.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt, primary cards) or `--radius-md` (14pt, small cards <80pt like the search input) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. Hero surfaces (Nutrition Breakdown Card, Meal Photo frame) add `--surface-backplate` (`CK-T02`, a faint warm radial gradient).

**Meal View mode:** Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px) on the ≥96px donut hero only (the donut's primary slice carries it); **no glow** on inline bars/text. The macro bars and ingredient rows sit on the card surface with top-edge highlight. The SIA Insight Card is the sole secondary surface — same layered treatment, no glow, orange top-border accent (2pt).

**Food Logging mode:** The Search Input sits in an ink-brown-800 card frame, 1pt border white at 10% (default), 2pt `--color-brand-orange` border (focused), `--track-inset` recess if visible. The Meal Type Selector sits on a card with the same glass treatment. Recent/Frequent sections and search results are rows within a card; each row has a 1pt white at 10% divider (not on the last). The Food Item Expanded state and Manual Entry Form are layered cards with 24pt padding, top-edge highlight, no glow (they sit below the fold). Depth is consistent across both modes — nothing reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: Detail Header meal name `--text-h3` (17pt) / 600 weight / `--leading-snug` (1.25) / white 100%; Meal Info name `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; Meal Info date/time `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / white 50%; nutrition card eyebrow (`NUTRITION`, `INGREDIENTS`) the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); donut center calories `--text-h2` (20pt) / 600 / white 100%; donut sub-label ("P / C / F") `--text-small` (11pt) / 400 / `--leading-normal` / white 40%; macro bar label + value `--text-h3` (17pt) / 600 / white 100% (label), `--text-body` (16pt) / 400 / white 100% (value); ingredient name + portion `--text-body` (16pt) / 400 / `--leading-normal` / white 100%; ingredient macro line `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; SIA Insight text `--text-caption` (13pt) / 400 / `--leading-normal` / white 100%; Search Input `--text-body` (16pt) / 400 / white 100% (typed text), white 40% (hint text); Meal Type Segment `--text-caption` (13pt) / 600 / white 100% (active), white 50% (inactive); Food Item Row name `--text-body` (16pt) / 400 / white 100%; Food Item Row macros `--text-caption` (13pt) / 400 / white 50%; section eyebrow ("RECENT", "FREQUENT", "RESULTS") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` / uppercase / white 40%); Manual Entry eyebrow `--text-eyebrow` (12pt) / 600 / uppercase / white 40%; manual input label `--text-small` (11pt) / 600 / `--leading-snug` / white 40%; manual input value `--text-body` (16pt) / 400 / white 100%; section divider text ("Can't find it?") `--text-caption` (13pt) / 400 / white 40%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (on the Nutrition donut and the macro bars). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixels with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`) and `CK-T05` (`--tracking-*`).

### Microcopy (before → after)

**Meal View mode:**
- **Donut hub, logged meal** — *before:* "520 cal" + "P / C / F" (given) → *after (kept):* same; warm, clear, centered hub. The "435 from macros" sub-text is authored to be transparent about the calculation (the ~85 cal gap is not hidden).
- **Macro bars, no target set** — *before:* bars rendered without context → *after (new, on-voice):* a line above the bars states "Proportional to this meal's largest macro" (warm, honest disclosure of the reference scale).
- **SIA Insight card, generic example** — *before:* "Good protein balance. This meal hits 29% of your daily target." (given) → *after (audited):* ensure the copy is **specific to the user's own data** (a real connection-spotted insight, never a horoscope); avoid exclamation marks; use the brand period with intent.
- **Cold-start / planned meal, no foods logged** — *before:* donut ghosted, no message → *after (new, non-shaming):* donut renders as "calibrating" state with hub text "Log this meal to see its split" (warm, invitational, never "empty" or "incomplete").

**Food Logging mode:**
- **Search input hint text** — *before:* "Search food..." (given) → *after (kept):* same; warm, clear.
- **Barcode scanner permission denied** — *before:* no message → *after (new, on-voice):* "Camera access needed to scan. Go to settings?" (specific, recovery action named, no shame).
- **Barcode scanner, not found in database** — *before:* no message → *after (new, on-voice):* "Not found in database. Try manual entry?" (honest, warm, invitational).
- **Receipt scanner, no items extracted** — *before:* no message → *after (new, on-voice):* "Could not read receipt. Try a clearer photo?" (specific, encouraging retry, non-shaming).
- **Recent foods section, day-1 user** — *before:* section hidden or empty → *after (new, on-voice):* "No recent foods yet. Search or scan to get started." (warm, invitational, acknowledges the state).
- **Frequent foods section, no data** — *before:* section hidden → *after (new, on-voice):* (section is hidden if truly empty, but if it renders with 1–2 items, each food item shows calorie count and a [+] button; the message is clear from the visible rows).
- **Search results, zero matches** — *before:* no message → *after (new, on-voice):* "No results — try different keywords or add manually." (warm, recovery action visible).
- **"Add to [meal]" green button, success** — *before:* no message → *after (new):* the row collapses, a green checkmark overlay flashes (600ms), and a "+25 XP" micro-toast slides down from top (warm reward, not a shame message; frames logging as progress).
- **Manual entry, all fields filled** — *before:* "Add food ✓" (given) → *after (kept):* same; the checkmark is the warm confirmation glyph.

No exclamation marks; the brand period used with intent; all SIA copy (if present on insights) is specific to the user's own meal composition, never a generic wellness horoscope.

### Motion choreography

Locked to `CK-P4` order (draw-first):

**Meal View mode** (entrance):
1. **Meal Photo fades in** (`--dur-base` 280ms `--ease-out-soft`) — if present
2. **Meal Info fades in** (280ms stagger)
3. **Donut draws itself** (`stroke-draw`, arcs sweep clockwise from 12 o'clock, `--dur-flow` 1200ms `--ease-flow`, **largest→smallest** with primary orange slice first, never scaled)
4. **Donut hub counts up** (the total calories number animates 0 → 520, `--dur-slow` 520ms `--ease-flow`)
5. **Macro bars rise** (width 0 → value, `--dur-slow` 520ms `--ease-flow`, 80ms stagger between the three bars)
6. **SIA Insight Card fades in** (280ms `--dur-base` `--ease-out-soft`)
7. **Ingredients List rows fade in** (280ms each, 40ms stagger)

**Food Logging mode** (entrance):
1. **Search Input fades in** (280ms `--dur-base`)
2. **Meal Type Selector fades in** (280ms, 40ms stagger)
3. **Recent/Frequent sections fade in** (280ms each, 40ms stagger)
4. **"Add manually" button fades in** (280ms)

**Mode transition** (Meal View → Food Logging via "Edit" tap):
- Content crossfade below header (520ms `--ease-out-soft`) — Meal View contents fade out while Food Logging contents fade in simultaneously.

**Food Item Expand** (tap [+] on a food item):
- Row height expands 48pt → 120pt (280ms `--ease-out-soft`)
- Portion dropdown fades in (280ms)
- Live macro display fades in (280ms)
- "Add to [meal]" button fades in (280ms)

**Food Item Collapse + Success** (tap "Add to [meal]"):
- Row height collapses 120pt → 48pt (280ms `--ease-out-soft`)
- Green checkmark overlay scales 0 → 1.0 + fades out (600ms `--ease-out-soft`)
- "+25 XP" toast slides down from top (280ms in, hold 1.5s, 280ms out)

**Manual Entry Expand** (tap "Add manually"):
- "Add manually" button fades out (160ms)
- Form height animates 0 → 320pt (520ms `--ease-out-soft`)
- Form contents fade in (280ms stagger after height animation starts)

**Manual Entry Collapse** (tap "Add food"):
- Form height animates 320pt → 0pt (280ms `--ease-out-soft`)
- "Add manually" button fades back in (280ms)

**Barcode/Receipt Scanner Entry** (tap barcode/receipt icon):
- Half-sheet slides up from bottom (280ms `--ease-out-soft`)

**Barcode/Receipt Scanner Dismiss** (drag down or tap X):
- Half-sheet slides down (280ms `--ease-out-soft`)

**Reduced-motion** (`prefers-reduced-motion`):
- Donut arcs at rest at final shares + hub at final value (no sweep), instantly
- Macro bars at final width, instantly
- Card entrances at final opacity, instantly
- The donut polygon and bars are fully legible in their settled state — the static composition conveys the composition without animation.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Meal View: Cold-start (planned meal, un-logged)** | Donut in "calibrating" state (faint full-ring outline + hub reads "Log this meal to see its split"), macro bars at zero, ingredients list visible (from meal plan), SIA insight shows "This is SIA's suggestion — adjust any ingredient to match what you actually ate" | "Log this meal to see its split"; "This is SIA's suggestion. Adjust any ingredient to match what you actually ate." | Hub shows no Life-Power-style number; donut has faint `--surface-backplate`; never a degenerate point or collapsed disc |
| **Meal View: Loading** | Skeleton shimmer on all cards (donut ring outline + macro bar track outlines visible, morphing into data); ingredient rows show skeleton text; SIA card shows skeleton text | "SIA is reading your meal — one moment." | Skeleton on `--color-ink-brown-800`, radial shimmer, depth-preserving layout visible |
| **Meal View: Empty / partial** | Un-synced ingredients show ghosted text; missing macros in a single ingredient render as "0" with no visual emphasis; donut always renders if 2+ macros present | "Nutrition for [ingredient] couldn't load — try refreshing." | No-data ≠ zero (ghosted text is visually distinct from a real 0) |
| **Meal View: Error** | Donut card shows "Could not load meal data" + a visible "Retry" button; ingredient list hidden or shows cached data | "Could not load meal data — pull to refresh." | Calibrated `--color-error-red` only on genuine sync failure; glyph + word paired |
| **Meal View: Offline** | All data shown is cached; pull-to-refresh dimmed with reason | "You're offline — showing your last sync." | Actions honestly dimmed (50% opacity, no haptic); cached data retained |
| **Food Logging: Cold-start (day-1 user)** | Search input focused + keyboard open; Meal Type Selector shows time-of-day auto-selected; Recent section shows message; Frequent hidden; "Add manually" visible | "Search food" (hint text); "No recent foods yet. Search or scan to get started." | Search input has top-edge highlight; no other surfaces glowing |
| **Food Logging: Loading** | Search input retains text; inline spinner right of text; Recent/Frequent fade out; results show skeleton rows | "Searching..." (optional) | Skeleton on `--color-ink-brown-800`, shimmer animation |
| **Food Logging: Empty / partial (0 results)** | Search input shows typed text; results area displays message; "Add manually" button visible | "No results — try different keywords or add manually." | Honest, warm framing |
| **Food Logging: Error** | Search input shows "Search failed. Try again." in red below; scanner shows error + recovery action; receipt shows "Could not read receipt. Try a clearer photo?" | Per scenario: "Search failed. Try again.", "Camera access needed to scan. Go to settings?", "Not found in database. Try manual entry?", "Could not read receipt. Try a clearer photo?" | Calibrated `--color-error-red` only on genuine failure; glyph + word paired |
| **Food Logging: Offline** | Search input dimmed (50% opacity) with reason; scanner icons disabled; "Add manually" enabled | "You're offline — search is unavailable. Add manually or try later." | Actions honestly dimmed; "Add manually" remains bright |

### Signature & anti-generic

Ownable moments: the **warm-glow donut on ink-brown-800** (the Constellation Radar / Living Line signature applied to a nutrition hero — the anti-flat-stat-list alternative), the **continuous-stroke macro bars** (the stroke-not-fade rule, §8), and the **search-first food-logging utility with quick-add rows** (the Balencia "draw, not fade" philosophy extends to the interaction — tapping [+] expands a row with a smooth height animation, never a modal fade-in; the quick-add pattern is ownable to Balencia, not a competitor clone). Anti-generic fix: the Meal View is not a flat text stat tile stack (like MFP's ingredient list) — the donut hero + macro bars + warm-glow surfaces + the ingredient list as secondary detail makes it premium and layered, not maximal. The Food Logging mode is not a generic search-results list — the Meal Type Selector above the search results, the Recent/Frequent quick-add rows, and the Manual Entry inline form (not a modal) are deliberately structured to minimize taps (design goal: most food logging in <3 taps), and the continuous-stroke macro bars on quick-add rows earn the Balencia signature.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Meal name (Meal Info) | `--color-alpha-white-100` | ≥12:1 on both |
| Date/time (Meal Info) | `--color-alpha-white-50` | ≥4.5:1 |
| Donut hub (calories) | `--color-alpha-white-100` | ≥12:1 |
| Donut sub-label ("P / C / F") | `--color-alpha-white-40` | ≥4.5:1 (decorative label, paired with hub number) |
| Donut slice arcs (orange primary) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11, load-bearing data ink) |
| Donut slice arcs (white secondary/tertiary) | `--color-alpha-white-40` / `-20` | ≥3:1 on `ink-brown-800` (WCAG 1.4.11) |
| Macro bar fill (orange) | `--color-brand-orange` | 3.2:1 |
| Macro bar label + value | `--color-alpha-white-100` | ≥12:1 |
| Ingredient name | `--color-alpha-white-100` | ≥12:1 |
| Ingredient macro line | `--color-alpha-white-50` | ≥4.5:1 |
| SIA Insight text | `--color-alpha-white-100` | ≥12:1 |
| Search input (typed text) | `--color-alpha-white-100` | ≥12:1 |
| Search input (hint text) | `--color-alpha-white-40` | ≥4.5:1 |
| Meal Type Segment (active text) | `--color-alpha-white-100` | ≥12:1 |
| Meal Type Segment (inactive text) | `--color-alpha-white-50` | ≥4.5:1 |
| Food Item name | `--color-alpha-white-100` | ≥12:1 |
| Food Item macros | `--color-alpha-white-50` | ≥4.5:1 |
| "Add to [meal]" button (green) | `--color-forest-green` | 3.2:1 (WCAG 1.4.11; text is white) |
| "+25 XP" toast | `--color-brand-orange` | 3.2:1 (success framing, non-shaming) |
| Manual entry labels (field names) | `--color-alpha-white-40` | ≥4.5:1 |
| Manual entry input values | `--color-alpha-white-100` | ≥12:1 |
| Error text (red) | `--color-error-red` | ≥4.5:1 |
| Section eyebrow ("NUTRITION", "RECENT") | `--color-alpha-white-40` | Decorative label (paired with position); not load-bearing |

Status never colour-alone: the donut slice arcs are reinforced by a per-macro **text label + value** (not just the colour hue); the macro bars show a **text value beside the bar** (not just the orange fill). Focus-visible is standardized to the single **`--focus-ring`** token (`CK-T03`, 2pt orange, 2pt offset) across every interactive element (back button, "Edit" button, search input, meal type segments, [+] buttons, "Add to [meal]" button, "Done" button, FABs, all scanner icons, "Add manually" button). Targets ≥44×44pt (the [+] buttons and scanner icons are 44×44pt per spec; the meal type segments are 40pt height × ~80pt width per segment, each meeting 44pt when tapped). Reduced-motion: the donut appears at final arc paths instantly (fully drawn, no sweep animation); the macro bars appear at final fills instantly; all card entrances are instant at final opacity; the static forms (the donut's calorie split, the bars' proportions) fully convey the data without motion. Keyboard navigation: all interactive elements are reachable via tab order. Voice-over / screen-reader labels match the Accessibility section of the screen spec.

Conform to `design-audit/CONSISTENCY.md`.


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
| Donut slices sized by **calorie share** (P×4 · C×4 · F×9), hub = logged total (520 cal) + "435 from macros" sub-text — never gram share, never a phantom slice (see Visualization S29-V01) ||||
| Donut: largest-calorie slice | #FF5E00 | burnt-orange | 60% — primary slice (the macro leading **by calorie share**, protein *or* carbs — not hardwired) |
| Donut: 2nd-largest slice | #FFFFFF at 40% | white-40 | secondary (next macro by calorie share) |
| Donut: smallest slice | #FFFFFF at 20% | white-20 | tertiary (smallest macro by calorie share); a 0-gram macro is omitted, never a zero-width wedge |
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
| Disabled | 0.4 opacity (no portion selected) | — |
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
| Disabled | 0.4 opacity (when search has text) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Receipt Scanner Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | document icon, white at 50% | — |
| Pressed | white at 30%, scale(0.9) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (when search has text) | — |
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
| Disabled | 0.4 opacity (if no changes) | — |
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
| Donut chart segments | Mount | draws itself — arcs sweep clockwise from 12 o'clock (stroke-draw), largest→smallest, primary orange slice first; hub counts up 520ms | 1200ms (--dur-flow) | ease-flow |
| Macro bars (meal view) | Mount (after donut draws) | width 0→value, 80ms stagger | 520ms (--dur-slow) | ease-flow |
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

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Detail header meal name | Sora | Semibold | 17pt | 22pt | white 100% |
| "Edit" / "Done" header action | Sora | Semibold | 15pt | 20pt | #FF5E00 |
| Meal info name | Sora | Semibold | 20pt | 26pt | white 100% |
| Meal info date/time | Sora | Regular | 13pt | 18pt | white at 50% |
| Nutrition card eyebrow | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Donut center calories | Sora | Semibold | 20pt | 26pt | white 100% |
| Donut center P/C/F label | Sora | Regular | 11pt | 14pt | white at 40% |
| Macro bar label | Sora | Semibold | 15pt | 20pt | white 100% |
| Ingredient name + portion | Sora | Regular | 15pt | 20pt | white 100% |
| Ingredient macro line | Sora | Regular | 12pt | 16pt | white at 50% |
| SIA insight text | Sora | Regular | 13pt | 18pt | white 100% |
| Search placeholder | Sora | Regular | 16pt | 22pt | white at 40% |
| Search input text | Sora | Regular | 16pt | 22pt | white 100% |
| Meal type segment | Sora | Semibold | 13pt | 18pt | white 100% (active) / white at 50% (inactive) |
| Section eyebrow ("RECENT", "FREQUENT", "RESULTS") | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |
| Food item name | Sora | Regular | 15pt | 20pt | white 100% |
| Food item macros | Sora | Regular | 12pt | 16pt | white at 50% |
| "Add to [meal]" button | Sora | Semibold | 15pt | 20pt | white 100% |
| "+ Add manually" button | Sora | Regular | 15pt | 20pt | white 100% |
| Manual entry eyebrow | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase |
| Manual entry input value | Sora | Regular | 16pt | 22pt | white 100% |
| Manual entry field labels | Sora | Semibold | 11pt | 14pt | white at 40%, uppercase |
| "Add food" confirm button | Sora | Semibold | 15pt | 20pt | white 100% |
| Scanner instruction text | Sora | Regular | 13pt | 18pt | white 100% |
| "Scanned" badge | Sora | Semibold | 11pt | 14pt | #34A853 |
| Portion selector text | Sora | Regular | 15pt | 20pt | white 100% |
| "Can't find it?" text | Sora | Regular | 13pt | 18pt | white at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Meal data fails to load (meal view) | Skeleton shimmer on content; after timeout: "Could not load meal data" | Back navigation and retry |
| Food search fails | "Search failed. Try again." text below search field in red | User clears and retries search |
| Food search — no results | "No results found" centered; "+ Add manually" button below | User adds item manually or adjusts query |
| Barcode not found in database | Scanner overlay shows: "Not found in database. Try manual entry?" with "Add manually" link | User taps "Add manually" or scans another item |
| Camera permission denied (scanner) | "Camera access needed" message with "Open settings" button | User grants camera permission in device settings |
| Receipt scan — no items found | "Could not read receipt. Try a clearer photo?" with "Retake" and "Cancel" | User retakes photo or cancels |
| Food add fails | "Add to [meal]" button flashes red border; "Could not add" error text | Error haptic; user retries |
| Manual entry save fails | "Add food" button returns to default; error text below form | User retries save |
| "Done" save fails | Spinner on "Done" button stops; toast: "Could not save changes" (3s) | User retries "Done" tap |
| Portion data fails to load | Dropdown shows "1 serving" default only | User can still log with default portion |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Nutrition Dashboard"
- "Edit" header button: "Edit meal, button"
- "Done" header button: "Done, save changes, button"
- Meal photo: "Meal photo, [meal name], button, tap to view full screen"
- Donut chart: "Nutrition breakdown, [total] calories, Protein [value], Carbs [value], Fat [value]"
- Ingredient rows: "[Ingredient name], [portion], [calories] calories, [macros]"
- SIA insight: "SIA insight, [text], button, navigate to SIA chat"
- Search field: "Search food, text field"
- Barcode scanner icon: "Scan barcode, button"
- Receipt scanner icon: "Scan receipt, button"
- Meal type selector: "Meal type, [selected type] selected, segmented control"
- Food item rows: "[Food name], [calories] calories"
- [+] quick-add button: "Quick add [food name], button"
- Expanded food row: "[Food name], Portion [value], [calories], Add to [meal type] button"
- "+ Add manually" button: "Add food manually, button"
- Manual entry fields: "[Field name], text field"

**Focus order:**
- Meal View: Back button → "Edit" → Meal photo → Meal info → Nutrition breakdown (donut, bars) → SIA insight → Ingredients list rows
- Food Logging: Back button → "Done" → Search input → barcode icon → receipt icon → Meal type selector segments → food item rows (Recent, then Frequent, or Search results) → "+ Add manually"
- Expanded food item: Portion selector → live macro display → "Add to [meal]" button

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Scanner overlays dismissable via drag-down or X button
- Search clear (x) button also accessible via keyboard delete
- Portion dropdown opens native picker accessible via VoiceOver
- All touch targets meet 44pt minimum
- Macro values conveyed numerically (not just chart segments) for color-blind users

---

## Cross-References

- **Navigates to**: Screen 28 (Nutrition Dashboard) via stack pop, Screen 09 (SIA Chat) via tab switch (from SIA insight)
- **Navigates from**: Screen 28 (Nutrition Dashboard) via stack push — meal row tap (Meal View) or FAB (Food Logging), Screen 09 (SIA Chat) via deep-link, Screen 12 (Home Screen) via action card
- **Shared components with**: Screen 27 (Detail Header, Multi-Mode Pattern — entry-point determined vs. sequential, SIA compact note), Screen 28 (Macro Progress Bar pattern in nutrition breakdown, meal type labels)
- **Patterns used**: Detail Screen Template (Screen 27), Multi-Mode Screen Pattern (Screen 27 — adapted for entry-point-determined modes), Back Button (Batch 1), Text Input Field (Batch 1), 8-State Interaction Model
- **Patterns established**: Search-First Input Pattern (search field with embedded scanner icons, results replacing default lists), Quick-Add Row (food item with [+] expand → portion → confirm), Manual Entry Inline Form (collapsible form that expands in place), Barcode Scanner Half-Sheet (camera overlay for barcode detection), Receipt Scanner Overlay (camera + AI extraction + checklist review), Portion Selector Dropdown (inline dropdown with live macro update)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-11.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/meal`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B11-F01 | critical | retention | Build real food search, meal-type state, scanner flows, quick-add, portion editing, manual entry, confirmation, undo, and error/offline states. |
| B11-F02 | major | information-architecture | Support entry-point-driven meal view and logging modes, or split meal detail and food logging into separate routes. |
| B11-F03 | major | accessibility | Use semantic inputs/selectors/buttons with accessible names, state, and at least 44x44 hit areas. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

