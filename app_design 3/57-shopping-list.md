# Screen Design: Shopping List

**Screen**: 57 of 73
**File**: 57-shopping-list.md
**Register**: Nutrition Mode (nutrition-lime #84CC16)
**Primary action**: manage grocery shopping list for meal plans
**Tab**: Nutrition domain → stack push from Nutrition Dashboard [28] quick actions
**Navigation**: Stack depth 3-4 from Me tab root (Me → Explore → Nutrition Dashboard → Shopping List). Entry via Nutrition Dashboard [28] quick actions "Shopping list" card, SIA Chat [09] via deep-link ("I've added ingredients to your shopping list"), or recipe detail screen. Exit via back button to Nutrition Dashboard [28].

---

## Purpose

The Shopping List screen bridges SIA's AI-generated meal plans and the user's real-world grocery shopping. It automatically generates a categorized, prioritized shopping list from the active diet plan and user-saved recipes, while also allowing manual item entry. The screen is designed for use in a store — one-handed, quick scanning and checking off — so legibility, large touch targets, and fast interaction are paramount. SIA keeps the list current as the diet plan evolves. Free tier includes manual list creation and category grouping; auto-generation from diet plans requires Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Inline add input — always visible at top for quick manual additions
2. Category sections — items grouped by store aisle (produce, protein, dairy, grains, snacks, beverages, pantry, frozen, other) with collapsible headers
3. Item rows — checkbox, name, quantity, source badge, swipe actions
4. Purchased toggle — show/hide completed items
5. Share and clear actions — utility bar at bottom of list
6. Floating "+" FAB — secondary path to add items

**User flow**:
- **Arrives from**: Nutrition Dashboard [28] via "Shopping list" quick action card (stack push), SIA Chat [09] via deep-link (stack push), recipe detail screen via "Add ingredients to list" (stack push)
- **Primary exit**: Nutrition Dashboard [28] via stack pop (back button)
- **Secondary exits**: SIA Chat [09] via tab switch (tapping SIA-generated item badge), recipe detail via stack push (tapping recipe link on item)

---

## Layout

**Scroll behavior**: SectionList (grouped by category with sticky section headers)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  ┃ Shopping list         ⋮  │  56pt — Screen Header
│      ┃ (lime accent line)       │  FIXED, sticky on scroll
├─────────────────────────────────┤
│                                 │  SCROLLABLE from here
│  ┌─────────────────────────────┐│
│  │ + Add an item...            ││  52pt — Inline Add Input
│  └─────────────────────────────┘│
│          8pt gap                │
│  ┌─────────────────────────────┐│
│  │ 12 items · 3 purchased      ││  32pt — List Summary Bar
│  │              Hide purchased ▸││  toggle + count
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ ▾ PRODUCE                 4 ││  40pt — Category Header
│  │─────────────────────────────││  (sticky within section)
│  │ ☐  Spinach          200g    ││
│  │    From diet plan            ││  ~56pt per item row
│  │─────────────────────────────││
│  │ ☐  Bananas          6       ││
│  │    From recipe: Smoothie     ││
│  │─────────────────────────────││
│  │ ☐  Avocados         3       ││
│  │    Manual                    ││
│  │─────────────────────────────││
│  │ ☐  Mixed berries    250g    ││
│  │    From diet plan            ││
│  └─────────────────────────────┘│
│          12pt gap               │
│  ┌─────────────────────────────┐│
│  │ ▾ PROTEIN                 2 ││  40pt — Category Header
│  │─────────────────────────────││
│  │ ☐  Chicken breast    500g   ││
│  │    From diet plan            ││
│  │─────────────────────────────││
│  │ ☐  Salmon fillets    2      ││
│  │    From diet plan            ││
│  └─────────────────────────────┘│
│          12pt gap               │
│  ┌─────────────────────────────┐│
│  │ ▸ DAIRY                   3 ││  40pt — Collapsed Header
│  └─────────────────────────────┘│
│          12pt gap               │
│  ┌─────────────────────────────┐│
│  │ ▸ GRAINS                  2 ││  40pt — Collapsed Header
│  └─────────────────────────────┘│
│          12pt gap               │
│  ┌─────────────────────────────┐│
│  │ ▾ ✓ PURCHASED             3 ││  40pt — Purchased Section
│  │─────────────────────────────││  (only if toggle = show)
│  │ ☑  Greek yogurt      500g   ││  strikethrough + green ✓
│  │─────────────────────────────││
│  │ ☑  Oats              1kg    ││
│  │─────────────────────────────││
│  │ ☑  Almond milk       1L     ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │  🗑 Clear purchased   📤 Share││  44pt — Action Bar
│  └─────────────────────────────┘│
│                                 │
│          64pt bottom padding    │
│                                 │
│                        ┌──────┐ │  FAB, floating, z-40
│                        │  +   │ │  56pt circle, bottom-right
│                        └──────┘ │  16pt above tab bar
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt)
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status
   - Content: transparent

2. **Screen Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, overflow menu
   - Content: back chevron (left), "Shopping list" title with 2pt lime (#84CC16) accent line underneath, overflow menu icon (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **Inline Add Input** — 52pt
   - Purpose: quick manual item addition without leaving the list context
   - Content: "+" icon + text field with "Add an item..." placeholder
   - 12pt top margin

4. **List Summary Bar** — 32pt
   - Purpose: at-a-glance list status and purchased visibility toggle
   - Content: item count + purchased count (left), "Hide/Show purchased" toggle (right)
   - 8pt top margin

5. **Category Sections** — variable height (~56pt per item + 40pt header)
   - Purpose: grouped shopping items organized by store aisle category
   - Content: collapsible category header + item rows within ink-brown-800 card
   - 16pt top margin for first section, 12pt between sections

6. **Purchased Section** — variable (conditional, only when "Show purchased" is active)
   - Purpose: completed items with visual distinction
   - Content: purchased items with strikethrough and green checkmark
   - 12pt top margin

7. **Action Bar** — 44pt
   - Purpose: bulk actions for list management
   - Content: "Clear purchased" (left), "Share" (right)
   - 16pt top margin

8. **Bottom Padding** — 64pt
   - Purpose: clears FAB and tab bar

9. **FAB (Add Item)** — 56pt circle, floating
   - Purpose: secondary add path — tapping opens inline add input focus or a quick-add sheet
   - Content: "+" icon, centered
   - Positioned 16pt above tab bar, 16pt from right edge, z-40

10. **Tab Bar** — 56pt + 34pt safe area
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Screen Header
- **Purpose**: screen identification with domain branding and utility access
- **Data source**: static title, no dynamic data
- **Visual treatment**: fixed bar, ink-900 background, backdrop-blur on scroll
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left edge
  - Title: "Shopping list", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #84CC16 (nutrition lime), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - Overflow menu icon: vertical ellipsis (⋮), white, 20pt icon, 44×44pt touch target, right-aligned 16pt from right edge. Menu items: "Sort by category", "Sort by priority", "Clear all items", "Import from diet plan"
- **Gestures**: back button pops stack; overflow opens dropdown menu (z-40)
- **Follows**: Domain Dashboard Header pattern established in Screen 26

### Inline Add Input
- **Purpose**: primary manual item addition — fast, always accessible
- **Data source**: user text input → POST /api/shopping-list
- **Visual treatment**: ink-brown-800 background, 1pt border white at 10% (default), 2pt Burnt Orange border (focused), r-md (14pt), 16pt internal padding
- **Size**: full-width minus 32pt × 52pt
- **Sub-elements**:
  - "+" icon: 20pt, #84CC16 (nutrition lime), 16pt from left inside field
  - Placeholder text: "Add an item...", 16pt Sora Regular, white at 40%
  - Input text: 16pt Sora Regular, white
  - Submit button (appears when text entered): right-aligned, "Add" text in 14pt Sora Semibold, #FF5E00 (Burnt Orange), 44×44pt touch target. Replaces placeholder submit area.
- **Behavior**:
  - Tap field: keyboard opens with return key set to "Add"
  - Type item name: optional quantity parsing — "2 avocados" auto-splits into name "Avocados" + quantity "2"
  - Submit (tap "Add" or press return): item added to list under "Other" category (user can recategorize), field clears, success haptic, item animates in at correct position
  - Category auto-detection: SIA infers category from item name (e.g., "chicken" → Protein, "bananas" → Produce). Runs asynchronously after add.
- **Gestures**: tap to focus; tap "Add" or keyboard return to submit; tap outside to dismiss keyboard

### List Summary Bar
- **Purpose**: quick status overview and purchased visibility control
- **Data source**: computed from shopping list state (total count, purchased count)
- **Visual treatment**: no card — inline text row, 16pt horizontal margins
- **Size**: full-width × 32pt
- **Sub-elements**:
  - Count text: "12 items · 3 purchased", 13pt Sora Regular, white at 50%, left-aligned
  - Toggle: "Hide purchased" / "Show purchased", 13pt Sora Semibold, #FF5E00 (Burnt Orange), right-aligned, 44×32pt touch target. Includes small chevron (▸ / ▾) before text.
- **Behavior**:
  - Tap toggle: purchased section animates in/out (280ms, ease-out-soft). Text updates between "Hide purchased" and "Show purchased". Light haptic.
  - Count updates in real-time as items are checked/unchecked.
- **Gestures**: tap toggle to show/hide purchased items

### Category Section Header
- **Purpose**: group items by store aisle for efficient shopping
- **Data source**: item category field from shopping_list_items table
- **Visual treatment**: section header row inside ink-brown-800 card, sticky within its section on scroll
- **Size**: full-width minus 32pt × 40pt
- **Sub-elements**:
  - Collapse indicator: ▾ (expanded) / ▸ (collapsed), 12pt, white at 40%, 16pt from left
  - Category name: "PRODUCE", "PROTEIN", "DAIRY", "GRAINS", "SNACKS", "BEVERAGES", "PANTRY", "FROZEN", "OTHER" — 12pt Sora Semibold, #84CC16 (nutrition lime), uppercase, +0.12em tracking. 8pt left of collapse indicator.
  - Item count: number badge, 12pt Sora Regular, white at 40%, right-aligned 16pt from right edge
- **Behavior**:
  - Tap header: toggles collapse/expand with 280ms height animation (ease-out-soft). Items within animate height to 0 (collapse) or full height (expand). Collapse indicator rotates.
  - Default state: all categories expanded on first load. User collapse preferences persist per session.
- **Gestures**: tap anywhere on header row to toggle collapse
- **Categories** (ordered by typical store layout):
  1. Produce — fruits, vegetables, fresh herbs
  2. Protein — meat, poultry, fish, tofu, legumes
  3. Dairy — milk, cheese, yogurt, eggs
  4. Grains — bread, rice, pasta, cereal, oats
  5. Snacks — nuts, bars, chips, dried fruit
  6. Beverages — water, juice, coffee, tea, milk alternatives
  7. Pantry — oils, spices, sauces, canned goods
  8. Frozen — frozen vegetables, frozen meals, ice cream
  9. Other — uncategorized manual additions

### Item Row
- **Purpose**: display a shopping list item with quick check-off and contextual metadata
- **Data source**: GET /api/shopping-list → individual item from shopping_list_items table
- **Visual treatment**: list row inside ink-brown-800 card, 16pt internal padding, separator between rows
- **Size**: full-width minus 32pt × ~56pt per row (two-line layout)
- **Sub-elements**:
  - Checkbox: 24pt circle, white at 15% fill + 1pt white at 20% border (unchecked), Forest Green (#34A853) fill + white checkmark (checked). 44×44pt touch target.
  - Item name: 15pt Sora Regular, white, left-aligned 12pt from checkbox. Truncates with ellipsis at 60% of row width.
  - Quantity: 15pt Sora Semibold, white at 70%, right-aligned 16pt from right edge. Format: "200g", "6", "1L", "2 cans", etc.
  - Source badge (second line, below name):
    - "From diet plan": 11pt Sora Regular, #84CC16 (nutrition lime) text, no background. Shown when source = "diet_plan".
    - "From recipe: [Name]": 11pt Sora Regular, #84CC16 text. Recipe name is tappable (underlined at 50% opacity). Shown when source = "recipe".
    - "Manual": 11pt Sora Regular, white at 30% text. Shown when source = "manual".
  - Priority indicator (optional): small dot, 6pt, left of item name, #FF5E00 (Burnt Orange) for high priority items. Only visible when priority > 0.
  - Separator: 1pt line, white at 8%, full card content width (not on last item in category)
- **Purchased state**: checkbox filled green with white checkmark, item name gets strikethrough (white at 30%), quantity text at 30% opacity. Entire row opacity reduces to 70%. Row animates to purchased section after 1.5s delay (giving user time to undo).
- **Swipe actions**:
  - Swipe left: reveals "Delete" action (red #F44336 background, white trash icon, 80pt wide). Continues full swipe to delete with confirmation haptic.
  - Swipe right: reveals "Edit" action (#FF5E00 background, white pencil icon, 80pt wide). Opens inline edit mode.
- **Inline edit mode** (triggered by swipe-right or long-press):
  - Item name becomes editable text field (2pt Burnt Orange border)
  - Quantity becomes editable with stepper (−/+) buttons
  - Category dropdown appears below
  - Notes field appears below category
  - "Save" button (Forest Green, r-pill) and "Cancel" text link
  - Height expands to ~160pt (280ms, ease-out-soft)
- **Gestures**: tap checkbox to toggle purchased; swipe left to delete; swipe right to edit; long-press to enter edit mode; tap recipe name to navigate to recipe

### Purchased Section
- **Purpose**: show completed items separately with visual distinction
- **Data source**: shopping_list_items where is_purchased = true
- **Visual treatment**: same card style as category sections but with muted styling
- **Size**: variable, depends on purchased item count
- **Sub-elements**:
  - Section header: "✓ PURCHASED" in 12pt Sora Semibold, Forest Green (#34A853), uppercase, +0.12em tracking. Count badge (right). Collapse indicator (left).
  - Item rows: same as Item Row but in purchased state (strikethrough, reduced opacity)
- **Behavior**:
  - Hidden by default (toggle says "Show purchased")
  - When shown, appears below all active category sections
  - Collapsible independently via header tap
- **Gestures**: tap header to collapse/expand; tap checkbox on purchased item to un-purchase (moves back to active category)

### Action Bar
- **Purpose**: bulk list management actions
- **Data source**: N/A (actions)
- **Visual treatment**: inline row, no card, 16pt horizontal margins
- **Size**: full-width × 44pt
- **Sub-elements**:
  - "Clear purchased" button: trash icon (16pt, white at 50%) + "Clear purchased" text (13pt Sora Semibold, white at 50%), left-aligned, 44×44pt touch target. Disabled (0.3 opacity) when no purchased items exist.
  - "Share" button: share icon (16pt, white at 50%) + "Share" text (13pt Sora Semibold, white at 50%), right-aligned, 44×44pt touch target.
- **Clear purchased behavior**:
  - Tap: confirmation dialog — "Clear 3 purchased items?" with "Clear" (red text) and "Cancel" buttons
  - Confirmed: all purchased items delete with staggered fade-out animation (40ms stagger, 160ms each). Success haptic. Count updates.
- **Share behavior**:
  - Tap: native share sheet opens with plain-text formatted list. Format:
    ```
    Shopping List (12 items)
    
    PRODUCE
    ☐ Spinach — 200g
    ☐ Bananas — 6
    ☐ Avocados — 3
    ☐ Mixed berries — 250g
    
    PROTEIN
    ☐ Chicken breast — 500g
    ☐ Salmon fillets — 2
    ...
    ```
  - Includes only unpurchased items by default
- **Gestures**: tap to trigger respective action

### FAB (Add Item)
- **Purpose**: secondary add path — always visible floating button
- **Data source**: N/A (navigational)
- **Visual treatment**: circular floating button, ink-brown-800 with glassmorphism, warm shadow
- **Size**: 56pt diameter circle
- **Sub-elements**: "+" icon, 24pt, white, centered
- **Behavior**: tap focuses the inline add input at top and scrolls to it. If already at top, opens keyboard directly.
- **Scroll behavior**: visible at all scroll positions (does not hide on scroll — shopping list needs persistent add access)
- **Gestures**: tap to focus add input
- **Position**: 16pt from right edge, 16pt above tab bar, z-40

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism |
| Domain accent line | #84CC16 | nutrition-lime | domain color, header only |
| Category header text | #84CC16 | nutrition-lime | domain color, eyebrow labels |
| Source badge text (diet plan/recipe) | #84CC16 | nutrition-lime | item provenance indicator |
| "Add" button text | #FF5E00 | burnt-orange | 60% — primary action |
| "Show/Hide purchased" toggle | #FF5E00 | burnt-orange | 60% — interactive text |
| Input focus border | #FF5E00 | burnt-orange | 60% — active state |
| Priority dot | #FF5E00 | burnt-orange | 60% — high priority indicator |
| Overflow menu actions | #FF5E00 | burnt-orange | 60% — interactive text |
| Edit swipe background | #FF5E00 | burnt-orange | 60% — edit action |
| "Save" button (edit mode) | #34A853 | forest-green | 30% — confirmation |
| Checkbox (checked) | #34A853 | forest-green | 30% — completion |
| Purchased section header | #34A853 | forest-green | 30% — completion |
| Purchased checkmark | #FFFFFF on #34A853 | white on forest-green | 30% — success |
| Delete swipe background | #F44336 | error-red | destructive action |
| "Clear" confirmation text | #F44336 | error-red | destructive action |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB icon | #FFFFFF | white | action |
| Checkbox (unchecked) | #FFFFFF at 15% fill | white-15 | empty state |
| Primary text (item names) | #FFFFFF at 100% | white | main content |
| Secondary text (quantities) | #FFFFFF at 70% | white-70 | supporting data |
| Tertiary text (source manual) | #FFFFFF at 30% | white-30 | low-priority metadata |
| Placeholder text | #FFFFFF at 40% | white-40 | input hint |
| Summary count text | #FFFFFF at 50% | white-50 | informational |
| Separator lines | #FFFFFF at 8% | white-8 | subtle dividers |
| Collapse indicator | #FFFFFF at 40% | white-40 | interactive hint |
| Category item count | #FFFFFF at 40% | white-40 | secondary info |

**60/30/10 verification**: orange on "Add" submit text, purchased toggle, input focus border, edit swipe action, priority dots, overflow menu actions (60% primary). Green on checked checkboxes, purchased section header, save button in edit mode, purchased checkmarks (30% completion). No purple on this screen — SIA presence is indirect (auto-generated items carry lime source badges, not purple dots). Domain lime (#84CC16) confined to accent line, category eyebrows, and source badges — never on actions or UI chrome.

---

## Interaction States

### Checkbox (Unchecked)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 24pt circle, white at 15% fill, 1pt white at 20% border | -- |
| Pressed | scale(0.85), border brightens to white at 40% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | fill animates to Forest Green, white checkmark scales in (0→1.0) | success notification |

### Checkbox (Checked)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 24pt circle, Forest Green fill, white checkmark | -- |
| Pressed | scale(0.85), fill darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | fill animates to empty (unchecked state), checkmark fades | light impact |

### Inline Add Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 10% border, "+" icon lime, placeholder text | -- |
| Focused | 2pt Burnt Orange border, cursor visible, keyboard open | light impact |
| Active (typing) | text appears, "Add" button fades in (right) | -- |
| Disabled | N/A | -- |
| Loading | inline spinner right of "Add" text (while submitting) | -- |
| Error | 2pt red border, "Could not add item" below | error notification |
| Success | field clears, brief green glow on border (280ms) | success notification |

### Item Row (Swipeable)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | item data with separator | -- |
| Pressed | background lightens slightly, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | skeleton shimmer | -- |
| Error | N/A | -- |
| Success | green checkmark animation on checkbox | success notification |
| Swiped-left | red delete action revealed (80pt) | light impact at threshold |
| Swiped-right | orange edit action revealed (80pt) | light impact at threshold |

### Category Section Header
| State | Visual | Haptic |
|-------|--------|--------|
| Default | lime text, collapse indicator, count badge | -- |
| Pressed | background lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | skeleton shimmer | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### "Clear Purchased" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | trash icon + text, white at 50% | -- |
| Pressed | text brightens to white at 70%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.3 opacity (no purchased items) | -- |
| Loading | spinner replaces icon | -- |
| Error | "Could not clear items" toast | error notification |
| Success | purchased items fade out with stagger | success notification |

### "Share" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | share icon + text, white at 50% | -- |
| Pressed | text brightens to white at 70%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | native share sheet opens | medium impact |

### FAB (Add Item)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism circle, white "+" icon | -- |
| Pressed | scale(0.9), bg darkens, warm shadow intensifies | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Overflow Menu Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white vertical ellipsis | -- |
| Pressed | scale(0.9), white at 50% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | dropdown appears (z-40) | light impact |

### Recipe Name Link (in source badge)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | lime text, subtle underline at 50% opacity | -- |
| Pressed | text brightens, underline solid | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A (navigates) | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | SectionList | refresh shopping list data |
| Tap | Checkbox (unchecked) | mark item as purchased, animate to purchased state |
| Tap | Checkbox (checked) | un-purchase item, move back to active category |
| Swipe left | Item row | reveal delete action (80pt); full swipe deletes |
| Swipe right | Item row | reveal edit action (80pt); full swipe opens edit |
| Long-press | Item row | enter inline edit mode |
| Tap | Category header | toggle collapse/expand section |
| Tap | "Show/Hide purchased" | toggle purchased section visibility |
| Tap | "Clear purchased" | confirmation dialog → bulk delete purchased items |
| Tap | "Share" | open native share sheet |
| Tap | FAB (+) | scroll to top and focus inline add input |
| Tap | Recipe name in source badge | stack push to recipe detail screen |
| Tap | Inline add "Add" button | submit new item |
| Keyboard return | Inline add input (focused) | submit new item |
| Tap | Overflow menu icon | open dropdown menu |

**Haptic feedback points**:
- Checkbox tap (check): success notification
- Checkbox tap (uncheck): light impact
- Item swipe threshold (left or right): light impact at 80pt threshold
- Item delete (full swipe): error notification
- Category header tap: light impact
- FAB press: medium impact
- Pull-to-refresh release: medium impact
- "Clear purchased" confirmed: success notification
- Share button press: medium impact
- Inline add submit: success notification
- Long-press item: medium impact (enter edit mode)

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Screen mount | staggered fade-in (80ms between sections) | 280ms each | ease-out-soft |
| Inline add input | Screen mount | fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Category sections | Screen mount | staggered fade-in (80ms per section) | 280ms each | ease-out-soft |
| Checkbox check | Tap | fill color 0→100% + checkmark scale 0→1.0 | 160ms | ease-out-soft |
| Checkbox uncheck | Tap | fill color fade out + checkmark scale 1.0→0 | 160ms | ease-out-soft |
| Item → purchased | Checkbox checked | row fades to 70% opacity, name strikethrough draws left-to-right | 280ms | ease-out-soft |
| Item move to purchased section | 1.5s after check | row slides down out of category, slides into purchased section | 520ms | ease-flow |
| Item un-purchased move | Checkbox unchecked | row slides up out of purchased section into correct category | 520ms | ease-flow |
| Category collapse | Header tap | child items height → 0, indicator ▾ → ▸ rotates -90° | 280ms | ease-out-soft |
| Category expand | Header tap | child items height 0 → full, indicator ▸ → ▾ rotates +90° | 280ms | ease-out-soft |
| Purchased section show | Toggle tap | section height 0 → full + fade-in | 280ms | ease-out-soft |
| Purchased section hide | Toggle tap | section fade-out + height → 0 | 280ms | ease-out-soft |
| Swipe reveal (left) | Swipe gesture | red delete action slides in from right | follows finger | spring |
| Swipe reveal (right) | Swipe gesture | orange edit action slides in from left | follows finger | spring |
| Item delete | Full swipe or tap delete | row height → 0 + fade-out, remaining rows shift up | 280ms | ease-out-soft |
| New item added | Submit | row inserts with height 0→56pt + fade-in at correct category position | 280ms | ease-out-soft |
| Clear purchased (bulk) | Confirmed | staggered fade-out (40ms per item) + height collapse | 160ms each | ease-out-soft |
| Edit mode expand | Long-press or swipe-right tap | row height 56→160pt, fields fade-in | 280ms | ease-out-soft |
| Edit mode collapse | Save or cancel | row height 160→56pt, fields fade-out | 280ms | ease-out-soft |
| Inline add success | Item submitted | green glow on input border, fades out | 280ms | ease-out-soft |
| FAB | Always visible | no scroll-hide (persistent access) | -- | -- |
| Pull-to-refresh | Pull release | standard iOS indicator | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user, no diet plan)
- Inline add input visible and functional at top
- List area shows centered empty state illustration: minimal line-art shopping bag (48pt, white at 20%)
- Primary text: "Your shopping list is empty", 17pt Sora Semibold, white, centered
- Secondary text: "Tell SIA about your diet goals and she'll suggest meals with a ready-made shopping list.", 14pt Sora Regular, white at 50%, centered, 8pt below
- CTA button: "Talk to SIA", r-pill, #FF5E00 background, white text, 44pt height, 200pt width, centered. Tapping switches to SIA Chat [09] tab.
- FAB still visible

### Day 1 (new user, diet plan active but list not yet generated)
- Inline add input visible
- Primary text: "SIA is building your shopping list...", 17pt Sora Semibold, white, centered
- Loading shimmer on 3 placeholder item rows
- Below: "Based on your meal plan for this week", 14pt Sora Regular, white at 50%

### Established user (all items purchased)
- All category sections collapsed or empty
- Purchased section visible with all items
- Celebratory text at top of list area: "All done! You've got everything.", 17pt Sora Semibold, white, centered
- SIA message below: "Your meal plan ingredients are covered for the week.", 14pt Sora Regular, white at 50%
- "Clear purchased" button highlighted (white at 70% instead of 50%) to encourage cleanup

### Established user (list cleared)
- Same as Day 1 empty state but with different messaging:
- Primary text: "Shopping list cleared", 17pt Sora Semibold, white, centered
- Secondary text: "New items will appear when SIA updates your meal plan, or add your own above.", 14pt Sora Regular, white at 50%
- No CTA button (user knows the app already)

---

## Motivation Adaptation

- **Low motivation**: Category sections default collapsed — only category headers visible with item counts, user expands as needed. Source badges hidden (reduces cognitive load). Priority dots hidden. Edit mode simplified — only name and quantity editable (no category, no notes). SIA-generated items show just name and quantity (no calorie info). Action bar hidden — share and clear accessible only via overflow menu.
- **Medium motivation**: default experience as designed. All sections expanded, source badges visible, full edit mode, action bar visible. Items show name, quantity, and source.
- **High motivation**: Items display estimated calories per item (from shopping_list_items.calories field) as a subtle badge next to quantity ("200g · ~45 cal"). A "List total" row appears at the bottom of each category showing estimated total calories for that category. A "Nutrition summary" card appears above the action bar showing macro estimates for the entire shopping list. Items from diet plan show which specific meal day they map to ("Mon lunch, Wed dinner"). Priority sorting becomes the default (most important items first within each category).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Inline add placeholder | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 40% |
| Inline add input text | Sora | Regular 400 | 16pt | 22pt | #FFFFFF |
| "Add" submit text | Sora | Semibold 600 | 14pt | 20pt | #FF5E00 |
| Summary count text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| "Show/Hide purchased" toggle | Sora | Semibold 600 | 13pt | 18pt | #FF5E00 |
| Category header name | Sora | Semibold 600 | 12pt | 16pt | #84CC16 |
| Category item count | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Item name | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Item quantity | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 70% |
| Source badge (diet plan/recipe) | Sora | Regular 400 | 11pt | 16pt | #84CC16 |
| Source badge (manual) | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Purchased section header | Sora | Semibold 600 | 12pt | 16pt | #34A853 |
| Purchased item name | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 30% (strikethrough) |
| "Clear purchased" text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 50% |
| "Share" text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 50% |
| Edit mode input text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Overflow menu items | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Empty state heading | Sora | Semibold 600 | 18pt | 24pt | #FFFFFF |
| Empty state body | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Shopping list load fails | Skeleton shimmer for 3s, then "could not load your list — tap to retry" centered | Tap retry re-fetches; pull-to-refresh also available |
| Add item fails | Inline add input shows red border flash (280ms), "could not add item" below input in 13pt Regular, white at 40% | Input retains text, user can re-submit |
| Check-off (purchase) fails | Checkbox reverts to unchecked state with gentle snap, "could not update — try again" toast (3s) | User can re-tap checkbox |
| Delete item fails | Swipe-delete row snaps back to original position, "could not delete — try again" toast | Row restored, user can retry swipe |
| Edit save fails | "Save" button shows error state (red border flash), "could not save changes" toast | Button re-enables, edit data preserved |
| Clear purchased fails | Confirmation dialog closes, "could not clear — try again" toast | User can re-trigger from action bar |
| Share generation fails | Native share sheet does not open, "could not generate list — try again" toast | User can re-tap share button |
| Auto-categorization fails | Item added to "Other" category, silent fallback. Categorization retries in background. | User can manually recategorize via edit mode |
| Network offline | Cached list shown with "offline" banner. All add/check/delete operations queue locally and sync on reconnect. | Banner updates to "syncing..." on reconnect |
| Diet plan sync fails | Items from diet plan show stale data. "could not sync with diet plan — tap to retry" banner below inline add. | Tap retry re-syncs diet plan items |

---

## Cross-References

- **Navigates to**: Nutrition Dashboard [28] via stack pop (back button), SIA Chat [09] via tab switch (from empty state CTA), recipe detail screen via stack push (tapping recipe name in source badge)
- **Navigates from**: Nutrition Dashboard [28] via "Shopping list" quick action card (stack push), SIA Chat [09] via deep-link (stack push), recipe detail screen via "Add ingredients to list" action (stack push)
- **Shared components with**: Screen 28 (Domain Dashboard Header pattern — same lime accent line and back navigation), Screen 29 (Search Input pattern influence — same input field visual treatment), Screen 38 (Checkbox pattern — similar check-off interaction for habits)
- **Patterns used**: Domain Dashboard Header (Screen 26 — adapted without RPG badge), Back Button (Batch 1), Text Input Field (Batch 1), 8-State Interaction Model, SectionList with Sticky Headers (Screen 38 — Habits), Swipe Actions (standard iOS/Android list pattern), Checkbox Toggle (adapted from Screen 38 Habits checklist)
- **Patterns established**: Swipeable List Row with Dual Actions (swipe left = destructive, swipe right = edit — reusable for any list-based screen with item management), Inline Add Input (persistent text field at top of list for quick item creation without modal), Source Badge (small inline text label indicating data provenance — "From diet plan" / "From recipe: X" / "Manual" — reusable wherever items have mixed manual and AI sources), Category-Grouped Shopping List (SectionList with collapsible category headers, item counts, and purchased section segregation), Purchased Item Delayed Move (1.5s delay before moving checked item to purchased section, allowing quick undo)

---

## Data Model

### API Endpoints

**GET /api/shopping-list**
- Returns all shopping list items for the authenticated user
- Response grouped by category
- Query params: `include_purchased` (boolean, default true), `sort` (category | priority)

**POST /api/shopping-list**
- Creates a new shopping list item
- Body: `{ name, quantity?, category?, notes?, source?, source_description?, priority? }`
- SIA auto-categorizes if category not provided (async update via PATCH)

**PATCH /api/shopping-list/:id**
- Updates an existing item
- Body: partial `{ name?, quantity?, category?, notes?, is_purchased?, priority? }`
- When `is_purchased: true`, server sets `purchased_at` to current timestamp

**DELETE /api/shopping-list/:id**
- Soft-deletes a shopping list item
- Bulk delete: `DELETE /api/shopping-list?purchased=true` (clear all purchased)

### Database Table: `shopping_list_items`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | primary key |
| user_id | UUID | foreign key → users |
| name | VARCHAR(255) | item display name |
| quantity | VARCHAR(50) | flexible format: "200g", "6", "1L", "2 cans" |
| category | ENUM | produce, protein, dairy, grains, snacks, beverages, pantry, frozen, other |
| notes | TEXT | optional user notes |
| calories | INTEGER | estimated calories (nullable, for high-motivation display) |
| source | ENUM | manual, diet_plan, recipe |
| source_description | VARCHAR(255) | e.g., recipe name, diet plan day |
| is_purchased | BOOLEAN | default false |
| purchased_at | TIMESTAMP | set when is_purchased = true |
| priority | INTEGER | 0 = normal, 1 = high priority |
| created_at | TIMESTAMP | auto |
| updated_at | TIMESTAMP | auto |

---

## Accessibility

- **Checkbox**: `accessibilityRole="checkbox"`, `accessibilityState={{ checked }}`, `accessibilityLabel="[item name], [quantity], [source]"`
- **Category headers**: `accessibilityRole="header"`, `accessibilityState={{ expanded }}`, `accessibilityHint="Double tap to collapse/expand"`
- **Swipe actions**: accessible via long-press context menu as fallback (Edit, Delete options) for users who cannot perform swipe gestures
- **Inline add input**: `accessibilityLabel="Add a shopping list item"`, keyboard return key labeled "Add"
- **Source badges**: included in parent item's accessibility label, not separately focusable
- **Purchased toggle**: `accessibilityRole="switch"`, `accessibilityState={{ checked: isShowingPurchased }}`
- **Screen reader announcement**: when item is checked, announces "[item name] purchased" after checkbox animation
- **Minimum touch targets**: all interactive elements 44×44pt minimum
- **Color contrast**: all text meets WCAG AA against ink-900/ink-brown-800 backgrounds (white at 50%+ on dark achieves 7:1+ ratio)
- **Reduce motion**: when system reduce-motion is on, all animations replaced with instant state changes (no slide, no stagger, no delayed move — items teleport to purchased section immediately)

---

## Edge Cases

- **Duplicate items**: when SIA adds an item from a diet plan that the user already added manually, the system merges quantities and shows both source badges. E.g., user added "Chicken breast 200g (manual)" and diet plan adds "Chicken breast 300g" → merged to "Chicken breast 500g" with both "Manual" and "From diet plan" badges stacked.
- **Diet plan update**: when SIA updates the meal plan mid-week, new items are added with a subtle "New" badge (Burnt Orange, 11pt, r-pill, fades after first view). Removed meals' items are flagged with "No longer needed" in white at 30% rather than auto-deleted.
- **Offline mode**: shopping list is cached locally. Checked/unchecked states sync when connection is restored. Inline add works offline (items queued for sync). Visual indicator: subtle "Offline" badge in header (white at 30%, next to title).
- **Very long lists (50+ items)**: SectionList virtualization handles performance. Fast-scroll indicator appears on right edge (category initial letters). Search/filter input appears above category sections when list exceeds 20 items.
- **Category reassignment**: when SIA auto-categorizes a manually added item, the item smoothly animates from "Other" to the correct category (520ms, ease-flow). A subtle toast confirms: "Moved to Produce".
- **Concurrent edits**: if shared list feature is added later, optimistic updates with conflict resolution. Last-write-wins for simple fields; additive merge for quantities.
- **Undo support**: after deleting an item or clearing purchased, a toast appears at bottom: "Undo" (Burnt Orange text, 5-second timeout). Tapping restores deleted items.
