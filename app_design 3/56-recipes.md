# Screen Design: Recipes

**Screen**: 56 of 73
**File**: 56-recipes.md
**Register**: Nutrition Mode (nutrition-lime #84CC16)
**Primary action**: browse, save, and create recipes
**Tab**: Nutrition domain (stack push from Nutrition Dashboard [28])
**Navigation**: Stack depth 3-4 from Me tab root (Me -> Explore -> Nutrition Dashboard -> Recipes). Entry from Nutrition Dashboard [28] quick actions "Recipes" card, SIA Chat [09] deep-link ("here are some high-protein recipes"), or Home Screen [12] via nutrition action card. Exit via back button to Nutrition Dashboard [28], or forward to Recipe Detail (inline stack push), SIA Chat [09], or Create Recipe (modal).

---

## Purpose

The Recipes screen is the user's personal recipe library and discovery hub within the Nutrition domain. It serves three roles: browsing SIA-suggested and community recipes aligned with the user's nutritional goals, managing a personal collection of saved and favorited recipes, and creating custom recipes with full macro tracking. The screen bridges meal planning and food logging -- a recipe discovered here can be added to the shopping list, logged as a meal, or incorporated into the active diet plan. SIA uses the user's macro targets, dietary preferences, food history, and active goals to surface personalized recipe suggestions, making this screen feel curated rather than generic. Free tier includes recipe browsing, search, and favorites; SIA suggestions and AI nutritional analysis require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar -- primary interaction point for finding recipes by name, ingredient, or cuisine
2. Filter chips -- category, cuisine, dietary flags, difficulty refinement
3. AI suggestions section -- personalized recipe recommendations from SIA
4. Favorites section -- horizontal scroll of user's favorited recipes for quick access
5. Diet plan recipes -- recipes from the active diet plan, highlighted for context
6. Recipe cards grid -- browsable recipe library with image, macros, and metadata
7. Create recipe FAB -- always-visible entry point for custom recipe creation

**User flow**:
- **Arrives from**: Nutrition Dashboard [28] via "Recipes" quick action card (stack push), SIA Chat [09] via deep-link (stack push), Home Screen [12] via nutrition action card (stack push)
- **Primary exit**: Back to Nutrition Dashboard [28] (stack pop)
- **Secondary exits**: Recipe Detail (inline stack push within this screen), SIA Chat [09] via AI suggestion tap (tab switch), Create Recipe (modal bottom sheet), Meal Detail / Food Logger [29] via "Log as Meal" (stack push)

---

## Layout

**Scroll behavior**: ScrollView (mixed content types -- search, chips, horizontal scroll, grid)
**Tab bar visible**: Yes

### ASCII Wireframe -- Browse State (default)

```
┌─────────────────────────────────────────┐
│           Status Bar (44pt)             │
├─────────────────────────────────────────┤
│  <-  │ Recipes                    Lv.8  │  56pt -- Domain Dashboard Header
│      │ (lime accent line)               │  FIXED, sticky on scroll
├─────────────────────────────────────────┤
│                                         │  SCROLLABLE from here
│  ┌─────────────────────────────────────┐│
│  │ [magnifier] Search recipes...   [sliders] ││  52pt -- Search Bar
│  └─────────────────────────────────────┘│
│          8pt gap                        │
│  [Breakfast][Lunch][Dinner][Snack]      │  36pt -- Category Chips
│  [Vegan][Keto][Gluten-free][Easy]...    │  36pt -- Secondary Chips
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ [purple dot] SIA says:              ││  ~80pt -- AI Suggestions Header
│  │ "Based on your protein goals,       ││
│  │  try these high-protein recipes"    ││
│  └─────────────────────────────────────┘│
│          12pt gap                       │
│  ┌────────┐ ┌────────┐ ┌────────┐      │  ~180pt -- AI Recipe Cards
│  │ [img]  │ │ [img]  │ │ [img]  │      │  horizontal scroll
│  │ Greek  │ │ Chicken│ │ Lentil │      │
│  │ Bowl   │ │ Stir.. │ │ Soup   │      │
│  │ 480cal │ │ 520cal │ │ 350cal │      │
│  │ 35g P  │ │ 42g P  │ │ 22g P  │      │
│  │ [heart]│ │ [heart]│ │ [heart]│      │
│  └────────┘ └────────┘ └────────┘      │
│          24pt gap                       │
│  Favorites                     see all  │  32pt -- Section Heading Row
│  ┌────────┐ ┌────────┐ ┌────────┐      │  ~160pt -- Favorites Scroll
│  │ [img]  │ │ [img]  │ │ [img]  │      │  horizontal scroll
│  │ Oatmeal│ │ Salmon │ │ Wrap   │      │
│  │ Berries│ │ Veggies│ │ Chicken│      │
│  │ 350cal │ │ 480cal │ │ 520cal │      │
│  └────────┘ └────────┘ └────────┘      │
│          24pt gap                       │
│  From your diet plan           see all  │  32pt -- Section Heading Row
│  ┌─────────────────────────────────────┐│
│  │ [tag] Chicken salad wrap    480 cal ││  ~48pt -- Diet Plan Row
│  │ [tag] Greek yogurt bowl     350 cal ││  ~48pt
│  └─────────────────────────────────────┘│
│          24pt gap                       │
│  All recipes                   see all  │  32pt -- Section Heading Row
│  ┌────────┐ ┌────────┐                  │  ~240pt -- Recipe Grid
│  │ [img]  │ │ [img]  │                  │  2-column layout
│  │ Recipe │ │ Recipe │                  │
│  │ Name   │ │ Name   │                  │
│  │ macros │ │ macros │                  │
│  │ 25min  │ │ 45min  │                  │
│  │ [Easy] │ │ [Med]  │                  │
│  │ [heart]│ │ [heart]│                  │
│  └────────┘ └────────┘                  │
│  ┌────────┐ ┌────────┐                  │
│  │ [img]  │ │ [img]  │                  │
│  │ ...    │ │ ...    │                  │
│  └────────┘ └────────┘                  │
│                                         │
│          64pt bottom padding            │
│                                         │
│                  ┌──────────────────┐   │  FAB, floating, z-40
│                  │  + Create recipe │   │  48pt, above tab bar
│                  └──────────────────┘   │
├─────────────────────────────────────────┤
│  Today  |  SIA  | Goals |  Me          │  Tab Bar (56pt + 34pt)
└─────────────────────────────────────────┘
```

### ASCII Wireframe -- Recipe Detail (stack push)

```
┌─────────────────────────────────────────┐
│           Status Bar (44pt)             │
├─────────────────────────────────────────┤
│  <-  │ Recipe Detail             [...]  │  56pt -- Detail Header
├─────────────────────────────────────────┤
│                                         │  SCROLLABLE
│  ┌─────────────────────────────────────┐│
│  │                                     ││  ~200pt -- Hero Image
│  │        [Recipe Photo]               ││  r-xl corners, full bleed
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  Greek Protein Bowl                     │  20pt Semibold, white
│  Lunch . 25 min . Easy                  │  13pt Regular, white 50%
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ MACROS PER SERVING                  ││  ~120pt -- Macro Card
│  │                                     ││
│  │  480 cal   35g P   40g C   18g F   ││  4 stat tiles
│  │                                     ││
│  │  Fiber: 8g  .  Servings: 2         ││
│  └─────────────────────────────────────┘│
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ INGREDIENTS                  2 serv ││  ~200pt -- Ingredients
│  │                                     ││
│  │  [ ] Chicken breast (300g)          ││  checkbox list
│  │  [ ] Quinoa (1 cup)                 ││
│  │  [ ] Mixed greens (100g)            ││
│  │  [ ] Cherry tomatoes (80g)          ││
│  │  [ ] Feta cheese (50g)              ││
│  │  [ ] Olive oil (1 tbsp)             ││
│  │  [ ] Lemon juice (1 tbsp)           ││
│  └─────────────────────────────────────┘│
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ INSTRUCTIONS                        ││  ~240pt -- Steps
│  │                                     ││
│  │  1. Cook quinoa per package...      ││  numbered steps
│  │  2. Grill chicken breast...         ││
│  │  3. Chop vegetables...              ││
│  │  4. Assemble bowl...               ││
│  │  5. Drizzle with olive oil...       ││
│  └─────────────────────────────────────┘│
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ [star][star][star][star][star-half]  ││  ~56pt -- Rating Row
│  │ 4.5 . Made 3 times                 ││
│  └─────────────────────────────────────┘│
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │      [Add to Shopping List]         ││  48pt -- Primary CTA
│  └─────────────────────────────────────┘│
│          12pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │         [Log as Meal]               ││  48pt -- Secondary CTA
│  └─────────────────────────────────────┘│
│          16pt gap                       │
│  ┌─────────────────────────────────────┐│
│  │ [purple dot] SIA:                   ││  56pt -- SIA Insight
│  │ "This recipe covers 29% of your    ││
│  │  daily protein. Great post-workout."││
│  └─────────────────────────────────────┘│
│                                         │
│          32pt bottom padding            │
├─────────────────────────────────────────┤
│  Today  |  SIA  | Goals |  Me          │  Tab Bar (56pt + 34pt)
└─────────────────────────────────────────┘
```

### Component Stack -- Browse State (top to bottom)

1. **Status Bar** -- 44pt
   - Purpose: system status
   - Content: transparent

2. **Domain Dashboard Header** -- 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Recipes" title with 2pt lime (#84CC16) accent line underneath, "Lv.8" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **Search Bar** -- 52pt
   - Purpose: primary recipe discovery interface
   - Content: search field with filter toggle icon
   - 12pt top margin

4. **Filter Chips Row** -- ~80pt (2 rows)
   - Purpose: refine recipe results by category, cuisine, dietary flags, difficulty
   - Content: horizontal scrollable chip rows
   - 8pt top margin

5. **AI Suggestions Section** -- ~260pt (header + horizontal scroll)
   - Purpose: SIA-personalized recipe recommendations
   - Content: SIA coaching note + horizontal scroll of AI-suggested recipe cards
   - 16pt top margin

6. **Favorites Section** -- ~192pt (heading + horizontal scroll)
   - Purpose: quick access to user's favorited recipes
   - Content: section heading row + horizontal scroll of compact recipe cards
   - 24pt top margin

7. **Diet Plan Recipes Section** -- ~128pt
   - Purpose: surface recipes from user's active diet plan
   - Content: section heading row + compact list rows
   - 24pt top margin

8. **All Recipes Grid** -- variable
   - Purpose: full browsable recipe library
   - Content: section heading row + 2-column masonry grid of recipe cards
   - 24pt top margin

9. **Bottom Padding** -- 64pt
   - Purpose: clears FAB and tab bar

10. **FAB (Create Recipe)** -- 48pt height, floating
    - Purpose: entry point for custom recipe creation
    - Content: "+ Create recipe" text
    - Positioned 16pt above tab bar, centered, z-40

11. **Tab Bar** -- 56pt + 34pt safe area
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with domain branding and RPG integration
- **Data source**: user's nutrition skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Recipes", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #84CC16 (nutrition lime), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.8", 13pt Sora Semibold, #84CC16 text, background #84CC16 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button pops stack; RPG badge taps push to RPG Character [19]
- **Follows**: Domain Dashboard Header pattern established in Screen 26

### Search Bar
- **Purpose**: primary recipe discovery through text search across recipe names, ingredients, and cuisines
- **Data source**: user_recipes table + community recipe database
- **Visual treatment**: ink-brown-800 background, 1pt border white at 10% (default), 2pt Burnt Orange border (focused), r-md (14pt)
- **Size**: full-width minus 32pt x 52pt
- **Sub-elements**:
  - Search icon: magnifying glass, 20pt, white at 40%, 16pt from left
  - Placeholder text: "Search recipes...", 16pt Sora Regular, white at 40%
  - Input text: 16pt Sora Regular, white
  - Filter toggle icon: sliders icon, 20pt, white at 50%, 44x44pt touch target, right-aligned 16pt from right edge. Tapping opens advanced filter panel.
  - Clear button (when text entered): X icon, 16pt, white at 40%, replaces filter icon, 44x44pt touch target
- **Behavior**:
  - Tap field: keyboard opens, filter icon remains visible
  - Type text: after 2+ characters, results replace the default browse layout (debounced 300ms). Filter icon replaced by clear X.
  - Clear search: default browse layout returns with fade-in (280ms)
- **Gestures**: tap field to focus; tap filter icon to toggle advanced filters; tap X to clear
- **Follows**: Search Bar pattern from Screen 25, enhanced with filter toggle

### Filter Chips Row
- **Purpose**: refine recipe results by multiple facets
- **Data source**: recipe metadata (category, cuisine, dietary_flags, difficulty from user_recipes table)
- **Visual treatment**: two horizontal scrollable rows of chips, 8pt vertical gap between rows
- **Size**: full-width x ~80pt (two rows of 36pt chips + gap)
- **Sub-elements**:
  - **Row 1 -- Category chips**: "Breakfast", "Lunch", "Dinner", "Snack" (single-select within row)
  - **Row 2 -- Attribute chips**: "Vegan", "Keto", "Gluten-free", "High protein", "Low carb", "Easy", "Quick (<30min)" (multi-select)
  - Each chip: 36pt height, r-pill (999pt), 12pt horizontal padding
    - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
    - Active: Burnt Orange (#FF5E00) bg, white text
  - Gap: 8pt between chips, 16pt leading margin
  - Cuisine sub-filter: when any category chip is active, a "Cuisine" overflow chip appears. Tapping opens a bottom sheet with cuisine options (Mediterranean, Asian, Mexican, Middle Eastern, Indian, American, etc.)
- **Behavior**: tapping a category chip selects it (single-select, deselect by tapping again). Attribute chips are multi-select. Active filters immediately refine visible recipes below.
- **Gestures**: tap chip to toggle; horizontal scroll within each row
- **Follows**: Filter Chip pattern from Screen 13

### AI Suggestions Section
- **Purpose**: SIA-curated recipe recommendations based on the user's nutritional goals, macro gaps, dietary preferences, and eating history
- **Data source**: AI recommendation engine + user's active goals, daily macro targets, food history
- **Visual treatment**: SIA coaching note card + horizontal ScrollView of recipe suggestion cards
- **Size**: full-width x ~260pt

#### SIA Coaching Note (within AI Suggestions)
- **Sub-elements**:
  - Purple dot: 6pt, #7F24FF, 16pt from card left edge
  - Message text: 15pt Sora Regular, white, max 2 lines
  - Card: ink-brown-800 with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt), 24pt padding
- **Variants**:
  - Macro gap: "You're short on protein this week. Try these high-protein recipes."
  - Goal aligned: "These recipes match your weight loss plan -- under 500 cal each."
  - Exploration: "You've been eating a lot of chicken. Try some plant-based protein."
  - Diet plan: "These recipes fit your active keto plan perfectly."
- **Gestures**: tap entire card pushes to SIA Chat [09] with nutrition/recipe context
- **Follows**: SIA Coaching Note Card pattern from Screen 26

#### AI Recipe Suggestion Card (horizontal scroll)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 12pt padding
- **Size**: 160pt wide x 180pt tall, 12pt gap between cards, 16pt leading/trailing margin
- **Sub-elements**:
  - Recipe image: 160pt x 96pt, r-lg (16pt) top corners, aspect-fill crop. Placeholder: gradient from ink-brown-800 to ink-900 with fork+knife icon centered (24pt, white at 20%).
  - Recipe name: 14pt Sora Semibold, white, max 2 lines, 8pt below image
  - Macro summary: 12pt Sora Regular, white at 50%, single line. Format: "480 cal . 35g P"
  - Favorite heart: 16pt, positioned top-right of image with 8pt inset. Unfavorited: white at 50%, outlined. Favorited: #FF5E00 (Burnt Orange), filled. 44x44pt touch target.
  - "SIA pick" badge: 11pt Sora Semibold, #7F24FF text on #7F24FF at 15% bg, r-pill, positioned top-left of image with 8pt inset. Only shown on AI-suggested cards.
- **Gestures**: tap card pushes to Recipe Detail; tap heart toggles favorite (scale 0.8 to 1.2 to 1.0, 280ms, with color change)

### Favorites Section
- **Purpose**: quick access to the user's favorited recipes
- **Data source**: user_recipes where is_favorite = true, ordered by most recent favorite action
- **Visual treatment**: section heading row + horizontal ScrollView of compact recipe cards
- **Size**: full-width x ~192pt (32pt heading + 160pt card scroll)
- **Sub-elements**:
  - Section heading row: "Favorites" (18pt Sora Semibold, white) + "see all" (13pt Sora Regular, Burnt Orange). 32pt height.
  - Compact recipe cards: identical spec to AI Recipe Suggestion Card but without the "SIA pick" badge. 160pt x 160pt (shorter without the badge space).
- **Variants**:
  - Populated: 3+ cards visible with horizontal scroll
  - Few favorites (1-2): cards shown, no scroll indicator
  - No favorites: section hidden entirely (appears once user favorites first recipe)
- **Gestures**: horizontal scroll; tap card pushes to Recipe Detail; tap "see all" pushes to full favorites list; tap heart unfavorites with confirmation (brief shake animation + "Removed from favorites" toast)
- **Follows**: Section Heading Row pattern from Screen 26

### Diet Plan Recipes Section
- **Purpose**: surface recipes that belong to the user's active diet plan, keeping meal planning connected to recipe discovery
- **Data source**: recipes linked to user's active diet plan, cross-referenced with user_recipes
- **Visual treatment**: section heading row + compact list rows in ink-brown-800 card
- **Size**: full-width x ~128pt (32pt heading + ~96pt for 2 rows)
- **Sub-elements**:
  - Section heading row: "From your diet plan" (18pt Sora Semibold, white) + "see all" (13pt Sora Regular, Burnt Orange). 32pt height.
  - Recipe list rows (~48pt each): ink-brown-800 card, r-md (14pt), 16pt padding
    - "In plan" tag: 11pt Sora Semibold, #84CC16 text on #84CC16 at 15% bg, r-sm, left side
    - Recipe name: 15pt Sora Regular, white, 8pt right of tag
    - Calories: 15pt Sora Semibold, white at 50%, right-aligned
    - Separator: 1pt, white at 10% between rows
  - Maximum 3 rows shown by default
- **Variants**:
  - Active diet plan: rows shown with "In plan" lime tag
  - No active diet plan: section hidden entirely
  - Loading: skeleton shimmer
- **Gestures**: tap row pushes to Recipe Detail; tap "see all" pushes to diet plan recipe list

### All Recipes Grid
- **Purpose**: full browsable recipe library -- the main content area
- **Data source**: user_recipes + community recipes, filtered by active chips, sorted by relevance (SIA-weighted) then recency
- **Visual treatment**: section heading row + 2-column grid
- **Size**: full-width x variable (depends on number of recipes)
- **Sub-elements**:
  - Section heading row: "All recipes" (18pt Sora Semibold, white) + "see all" (13pt Sora Regular, Burnt Orange). 32pt height.

#### Recipe Card (Grid Item)
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-md (14pt), no internal padding (image bleeds to card edges at top)
- **Size**: (screen width - 32pt margins - 12pt gap) / 2 x ~240pt
- **Sub-elements**:
  - Recipe image: full card width x 120pt, r-md top corners only, aspect-fill crop
  - Favorite heart: 16pt, top-right of image, 8pt inset. Same heart spec as AI suggestion cards.
  - Content area (below image, 12pt padding):
    - Recipe name: 15pt Sora Semibold, white, max 2 lines
    - Macro summary: 12pt Sora Regular, white at 50%. Format: "480 cal . 35g P . 40g C . 18g F"
    - Bottom row: prep time + difficulty badge, 8pt below macros
      - Prep time: clock icon (12pt, white at 40%) + "25 min" (12pt Sora Regular, white at 40%)
      - Difficulty badge: 11pt Sora Semibold, r-sm, 4pt horizontal / 2pt vertical padding
        - Easy: #34A853 text on #34A853 at 15% bg
        - Medium: #F59E0B text on #F59E0B at 15% bg
        - Hard: #EF4444 text on #EF4444 at 15% bg
- **Variants**:
  - Standard: all elements shown
  - No image: gradient placeholder (ink-brown-800 to ink-900) with fork+knife icon
  - Diet plan recipe: thin 2pt left border in #84CC16 (nutrition lime) to indicate it belongs to active plan
  - User-created: "My recipe" micro-tag, 10pt Sora Semibold, white at 30%, above recipe name
- **Gestures**: tap card pushes to Recipe Detail; tap heart toggles favorite
- **Grid layout**: 2 columns, 12pt horizontal gap, 12pt vertical gap, aligned top

### Recipe Detail (Stack Push)
- **Purpose**: full recipe view with nutritional breakdown, ingredients, instructions, and action CTAs
- **Data source**: single recipe from user_recipes (all columns)
- **Visual treatment**: standard detail screen layout, ScrollView
- **Size**: full screen

#### Detail Header
- **Size**: full-width x 56pt, FIXED
- **Sub-elements**:
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: "Recipe Detail" in 17pt Sora Semibold, white (or recipe name if short enough)
  - Overflow menu: 3-dot icon, 20pt, white, right-aligned 16pt from right. Opens: "Edit", "Share", "Delete" (if user-created), "Report" (if community)
- **Gestures**: back pops stack; overflow opens context menu

#### Hero Image
- **Visual treatment**: full-width minus 32pt, r-xl (28pt) corners, aspect ratio ~16:10
- **Size**: full-width minus 32pt x ~200pt
- **Sub-elements**:
  - Recipe photo: aspect-fill crop
  - Warm overlay gradient: transparent (top 60%) to ink-900 at 40% (bottom), for text readability below
  - Favorite heart: 24pt, top-right, 16pt inset, same favoriting behavior (larger for detail view)
- **Variants**:
  - Photo present: displays photo
  - No photo: gradient placeholder with large fork+knife icon (40pt, white at 15%)
- **Gestures**: tap photo opens full-screen viewer (zoom/pan)
- **16pt top margin**

#### Recipe Info Row
- **Sub-elements**:
  - Recipe name: 20pt Sora Semibold, white
  - Metadata line: 13pt Sora Regular, white at 50%. Format: "Lunch . 25 min . Easy" (category, total_time_minutes, difficulty)
  - Cuisine tag: domain tag chip style, 11pt Sora Semibold, #84CC16 text on #84CC16 at 15% bg, r-sm. E.g., "Mediterranean"
  - Source attribution (if source is not null): 12pt Sora Regular, white at 30%. "Source: [source]" with optional link icon if source_url exists.
- **8pt top margin below image**

#### Macros Per Serving Card
- **Purpose**: nutritional breakdown per serving
- **Data source**: calories_per_serving, protein_grams, carbs_grams, fat_grams, fiber_grams from user_recipes
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x ~120pt
- **Sub-elements**:
  - Eyebrow: "MACROS PER SERVING", 12pt Sora Semibold, #84CC16, uppercase, +0.12em tracking
  - 4 stat tiles (horizontal row, equal width, 8pt gaps):
    - Calories: "480" in 20pt Sora Semibold, white + "cal" in 12pt Sora Regular, white at 50%, centered
    - Protein: "35g" + "protein" (same sizing)
    - Carbs: "40g" + "carbs"
    - Fat: "18g" + "fat"
  - Below tiles (8pt gap): "Fiber: 8g . Servings: 2" in 13pt Sora Regular, white at 50%
- **16pt top margin**

#### Ingredients List Card
- **Purpose**: itemized ingredients with quantities, supporting shopping list integration
- **Data source**: ingredients JSONB column from user_recipes
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x variable (~36pt per ingredient)
- **Sub-elements**:
  - Eyebrow: "INGREDIENTS", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Serving adjuster: right-aligned on eyebrow line, "2 serv" text with [-] [+] stepper buttons (24pt circles, ink-900 bg, 1pt white at 10% border, white icon). Adjusting servings scales all quantities proportionally.
  - Ingredient rows (~36pt each):
    - Checkbox: 20pt square, r-xs corners, 1.5pt border white at 20%. Checked: #84CC16 fill + white checkmark. Purpose: track which ingredients are already in hand.
    - Ingredient text: 15pt Sora Regular, white, 8pt right of checkbox. Format: "Chicken breast (300g)" -- name + quantity in parentheses.
    - Separator: 1pt, white at 10%, inset 44pt from left (clears checkbox)
- **Gestures**: tap checkbox to mark ingredient as available; tap [-]/[+] to adjust servings
- **16pt top margin**

#### Instructions Card
- **Purpose**: step-by-step cooking instructions
- **Data source**: instructions JSONB column from user_recipes
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt x variable (~56pt per step)
- **Sub-elements**:
  - Eyebrow: "INSTRUCTIONS", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Step rows (~56pt each):
    - Step number: 24pt circle, Burnt Orange (#FF5E00) bg, white text (13pt Sora Semibold), center-aligned
    - Step text: 15pt Sora Regular, white at 80%, 12pt right of number circle, max 3 lines
    - Separator: 1pt, white at 5%, full content width, 12pt below text (not on last step)
  - Completed step: step number circle turns #34A853 (green), text mutes to white at 40%. Tap to toggle.
- **Gestures**: tap step number to mark step as completed (visual aid while cooking)
- **16pt top margin**

#### Rating and History Row
- **Purpose**: user's personal rating and usage tracking
- **Data source**: rating, times_made from user_recipes
- **Visual treatment**: ink-brown-800 card, r-md (14pt), 16pt padding, single row
- **Size**: full-width minus 32pt x ~56pt
- **Sub-elements**:
  - Star rating: 5 stars, 20pt each, 4pt gap. Filled: #F59E0B (amber). Empty: white at 20%. Half-star supported (clip mask at 50%).
  - Rating value: "4.5" in 15pt Sora Semibold, white, 8pt right of stars
  - Times made: "Made 3 times" in 13pt Sora Regular, white at 50%, right-aligned
- **Gestures**: tap a star to set/update rating (stars fill left-to-right with scale animation, 160ms per star)
- **16pt top margin**

#### "Add to Shopping List" CTA
- **Purpose**: add all unchecked ingredients to the user's shopping list
- **Visual treatment**: In-Card CTA Button pattern. Full-width minus 32pt, 48pt height, Burnt Orange (#FF5E00) bg, r-pill, white text.
- **Content**: "Add to Shopping List" in 16pt Sora Semibold, white, centered
- **Behavior**: only unchecked ingredients are added. If all are checked, button reads "All ingredients ready" and is disabled (0.5 opacity).
- **16pt top margin**

#### "Log as Meal" CTA
- **Purpose**: log this recipe as a consumed meal, syncing macros to daily tracking
- **Visual treatment**: secondary button. Full-width minus 32pt, 48pt height, ink-brown-800 bg, 1pt white at 10% border, r-pill
- **Content**: "Log as Meal" in 16pt Sora Semibold, white, centered
- **Behavior**: tapping opens a meal type selector (same 4-segment selector from Screen 29 -- Breakfast/Lunch/Dinner/Snack, auto-selected by time of day). After selection, recipe macros are logged and the user is pushed to Meal Detail [29] with a success confirmation.
- **12pt top margin**

#### SIA Insight Card (Recipe Detail)
- **Purpose**: AI nutritional commentary on this recipe relative to the user's goals
- **Data source**: AI analysis of recipe macros vs. daily targets and active goals
- **Visual treatment**: ink-brown-800 card, r-md (14pt), 16pt padding
- **Size**: full-width minus 32pt x 56pt (compact)
- **Sub-elements**:
  - Purple dot: 6pt, #7F24FF, 16pt from left
  - Insight text: 13pt Sora Regular, white, max 2 lines
  - Examples: "This recipe covers 29% of your daily protein. Great post-workout." / "Low in carbs, fits your keto goal perfectly." / "High in fiber -- supports your digestion goal."
- **Gestures**: tap pushes to SIA Chat [09] with recipe nutrition context
- **16pt top margin**
- **Follows**: SIA Coaching Note Card compact variant from Screen 26

### Create Recipe FAB
- **Purpose**: entry point for creating a custom recipe
- **Data source**: N/A (navigational)
- **Visual treatment**: floating pill button above tab bar, glassmorphism
- **Size**: 48pt height x auto-width (padding 24pt horizontal)
- **Sub-elements**: "+" icon (16pt, white) + "Create recipe" label (15pt Sora Semibold, white), 8pt gap
- **Gestures**: tap opens Create Recipe Modal (bottom sheet)
- **Scroll behavior**: fades out on scroll down, fades back in on scroll up/stop (same as Screen 26)
- **Follows**: FAB Extended Pill variant from Screens 26, 28

### Create Recipe Modal (Bottom Sheet)
- **Purpose**: form for adding custom recipes with full nutritional data
- **Visual treatment**: bottom sheet, ~85% screen height, ink-900 bg, r-lg (20pt) top corners, drag handle
- **Size**: full-width x ~85% screen height
- **Sub-elements**:
  - Drag handle: 4pt x 36pt, white at 20%, centered, 8pt from top
  - Modal header: "Cancel" (15pt Sora Regular, white at 50%, left) + "Create recipe" (17pt Sora Semibold, white, center) + "Save" (15pt Sora Semibold, Burnt Orange, right, disabled until required fields filled)
  - ScrollView content:
    - **Photo picker**: 120pt x 120pt circle, ink-brown-800 bg, camera icon (32pt, white at 30%), centered. Tap to open camera/gallery picker. After selection: shows photo with r-full clip.
    - **Recipe name**: Text Input Field (52pt). Placeholder: "Recipe name". Required.
    - **Description**: Text area, 80pt height (grows to 120pt), same input styling. Placeholder: "Brief description (optional)".
    - **Category selector**: horizontal pill row -- "Breakfast" / "Lunch" / "Dinner" / "Snack". Same chip styling as filter chips. Single-select, required.
    - **Cuisine input**: Text Input Field (52pt). Placeholder: "Cuisine (e.g., Mediterranean)". Optional.
    - **Servings stepper**: "Servings" label (15pt Regular, white) + stepper ([-] value [+]), value in 17pt Semibold. Default: 2. Min: 1, Max: 20.
    - **Macro inputs row** (4 fields, 2x2 grid, 8pt gaps):
      - "Calories" / "Protein (g)" / "Carbs (g)" / "Fat (g)" -- each: 52pt Text Input Field, numeric keyboard, required
      - "Fiber (g)" -- 52pt, numeric, optional, below the 2x2 grid
    - **Time inputs row** (2 fields, side by side):
      - "Prep time (min)" / "Cook time (min)" -- each: 52pt, numeric keyboard
      - Total time auto-calculates and displays below: "Total: 45 min" in 13pt Regular, white at 50%
    - **Difficulty selector**: 3 pill buttons -- "Easy" / "Medium" / "Hard". Single-select.
    - **Ingredients list**:
      - Eyebrow: "INGREDIENTS"
      - Dynamic row list. Each row: Text Input Field for ingredient name + quantity. "+" button to add row. Swipe left to delete row. Minimum 1 row.
    - **Instructions list**:
      - Eyebrow: "INSTRUCTIONS"
      - Dynamic numbered row list. Each row: text area for step description. "+" button to add step. Swipe left to delete. Minimum 1 step.
    - **Dietary flags**: multi-select chips -- "Vegan", "Vegetarian", "Gluten-free", "Keto", "Dairy-free", "Nut-free", "Halal". Same chip styling.
    - **Tags input**: Text Input Field, comma-separated tags. Placeholder: "Tags (e.g., quick, meal prep, post-workout)".
  - Bottom padding: 32pt (above keyboard safe area)
- **Gestures**: drag handle to dismiss (with confirmation if data entered); tap "Save" to create; tap "Cancel" to dismiss
- **Validation**: "Save" enabled only when recipe name, category, at least 1 ingredient, at least 1 instruction, and calorie value are provided. Missing required fields: red border on empty required fields, error text below.

---

## Visualization

> Source: no companion file; audited in `viz-audit/` — Batch (Lightweight-MEDIUM), findings `S56-V01..S56-V02`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **No new data** — every visual derives from macros the screen already prints (`calories_per_serving`, `protein_grams`, `carbs_grams`, `fat_grams`). **Current grade C (72) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric. This is a deliberately **light** screen: a recipe **library/browser**, not a data dashboard. It has exactly one datum that genuinely benefits from a chart — the per-recipe macro split — so a 2-subsection mini-section is correct; forcing a hero gauge, trend line, or KPI strip onto a browse grid would be over-resolution and is intentionally avoided. The residual gap to A+++ is build-verified depth + the working draw-on-enter micro-interaction, owned by the later viz-build program.)*

Template = **Lightweight-MEDIUM** (`CONSISTENCY.md` §6 thin variants; 56 is named there). Cluster benchmark = **MyFitnessPal premium / Cronometer + Bevel** (macro rings/donuts) under the **Apple Health / Linear** calm-restraint floor. Register = **Nutrition Mode** → nutrition-lime `#84CC16` is **identity only** (header line, eyebrows, diet-plan tags, cuisine chips, RPG badge), never data ink. This section changes only **one thing about how the data reads**: the per-recipe macro numbers (today a flat `"480 cal · 35g P · 40g C · 18g F"` text string) become an honest **part-of-whole** so the eye reads *composition* — protein-forward vs. carb-heavy — at a glance, exactly the decision a recipe browser exists to support. The star **rating stays as the 5-star row** (it is already the right primitive — a 0–5 ordinal, not a chart); calories, prep time, difficulty, names, cuisine, times-made, and all SIA copy stay **deliberately textual** (one-off scalars/labels with no useful visual form).

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Macro split per recipe — P/C/F as calorie share (card) | flat text `"480 cal · 35g P"` / `"…40g C · 18g F"` | **24px micro Donut** (no hub, no glow) beside the macro line — protein = orange primary slice, carbs/fat = warm neutral tints | **`Donut` (VK-007), micro variant** |
| Macros Per Serving (Recipe Detail card) | 4 flat stat tiles + bare numbers | **96px card Donut** with **center hub = total cal** + the 4 tiles kept as the legend/values beside it | **`Donut` (VK-007), card variant** |
| Star rating (4.5 / Made 3×) | 5-star amber row | — (deliberately textual/ordinal — stars are already the correct primitive; a chart would be worse) | — |
| Calories · prep time · difficulty · cuisine · name · times-made · SIA notes | text / badges / chips | — (deliberately textual — one-off scalars + identity labels, no useful visual form) | — |

**Editorial hierarchy (justified restraint).** There is exactly one focal visual — the **96px card Donut** on the Recipe Detail "Macros Per Serving" card — and one secondary, repeated micro-visual — the **24px Donut** on each recipe card. Everything else is intentionally textual. A recipe **browser** is a discovery surface, not a metrics dashboard: a hero `GaugeRing`, a `TrendChart`, or a `KPIStatTile` strip would be over-resolution (penalised under RUBRIC dims 1 & 2) because there is no time-series, no single bounded score, and no delta to honestly show on a list of recipes. The single composition chart is the one place a visual genuinely beats text, so it — and only it — is added.

### 1 · Donut — per-recipe macro split — `S56-V01`  *(reuse `VK-007`, micro + card variants)*

Render the macro composition as a **`Donut` (VK-007)** so a recipe reads as *protein-forward* / *carb-heavy* / *balanced* at a glance — the part-of-whole view a `"35g P · 40g C · 18g F"` text string structurally cannot show. Two sizes, one primitive:
- **Micro variant (24px) — on every Recipe Card** (grid + AI-suggestion + favorites cards): a 24px donut beside (or replacing) the macro text line. **No hub, no glow** at micro scale (per `VK-007` — a 32px `--glow-orange` would swamp a 24px ring; that is a depth *failure*, not depth). 2px slice gap (reveals `ink-brown-800` for carved separation); consistent inner-radius app-wide. The macro text caption stays as the legend/value (donut + numbers, never donut alone).
- **Card variant (96px) — on the Recipe Detail "Macros Per Serving" card**: a 96px donut with a **center hub = total `calories_per_serving`** (`text-h2`) + sub-label "cal / serving"; the existing 4 stat tiles (`480` · `35g P` · `40g C` · `18g F`) become its **visible legend** beside the ring. `--glow-orange-sm` (~12px, **mint** `VK-017`) on the primary slice only at this ≥48px size; faint radial backplate behind the ring; `--track-inset` (**mint**) under the ring.
- **Honest whole (non-negotiable, RUBRIC dim 5):** slices are **calorie share**, not gram share — protein 4 cal/g, carbs 4 cal/g, fat 9 cal/g — so the three slices **sum to a true whole the user can name** (`calories_per_serving`), never to padded grams. A 0-value macro is **omitted**, never a zero-width wedge. Fiber is a *subset* of carbs → it is **not** a slice (it stays the "Fiber: 8g" text line); adding it would double-count and lie about composition.
- **Brand slice colours (60/30/10-safe, `CONSISTENCY.md` Donut):** **largest-by-default / protein slice = `--color-brand-orange`** (orange dominates data ink — protein is the metric a macro-aware user scans for); carbs + fat = **warm neutral tints** (`--color-alpha-white-40`, `--color-alpha-white-20`). **Never rainbow** (one-hue-per-macro is a competitor clone + a 60/30/10 violation); **never nutrition-lime** in the slices (lime is identity only); **never purple** (no SIA-origin here). Green is **not** used (no arrival/completion state on a recipe browse).
- **Data source:** `calories_per_serving`, `protein_grams`, `carbs_grams`, `fat_grams` from `user_recipes` (Data Model Mapping above) — converted to calorie share client-side; nothing new fetched.
- **States:** **missing macros** (community recipe with null protein/carbs/fat) → a **ghosted full-ring outline + "macros unavailable"** hub/caption, **never** a collapsed disc or a misleading 100%-of-calories ring (no-data ≠ a fabricated single slice); **partial** (some macros null) → the present slices + a ghosted remainder arc; **loading** → a ring skeleton that **draws into** the real arcs (shares the card's existing skeleton-shimmer); **image/recipe load fail** → the donut is simply absent (card degrades to the text macro line — matches the spec's graceful-degrade rule).
- **Low-motivation mode (reconciles Motivation Adaptation):** when low-motivation Recipe Detail shows **calories only** (no P/C/F breakdown — see Motivation Adaptation), the card Donut has no honest composition to split, so it does **not** render a composition ring. Instead the 96px card collapses to a single **calorie KPI** (the hub number + "cal / serving" on a **ghosted full-ring outline**, no slices, no glow) — the same honest "no breakdown to show" treatment as the missing-macros state, **never** a fabricated single-macro ring. The full composition ring returns automatically at medium/high motivation when the breakdown is shown. The 24px micro-donut on cards is likewise suppressed in low-motivation mode (cards already drop to the simplest recipes; the macro text line carries calories).

### 2 · Star rating — kept as honest stars — `S56-V02`  *(no chart — restraint)*

The 5-star rating row (`★★★★½ · 4.5 · Made 3 times`) is **left exactly as designed** and logged here so the resolution is **intentional, not an omission**: a 0–5 ordinal rating with half-star precision is already shown in its **right** primitive (a star row reads faster than any gauge/bar and carries the half-star natively). A `GaugeRing` or bar here would be *over-resolution* (penalised under RUBRIC dim 1/2). The only viz-program note: amber stars must pair the colour with the **visible numeral "4.5"** and the filled/empty star **shape** (already specced) so rating is never colour-alone (1.4.11 / dim 10). `times_made` stays plain text.

### Motion choreography

Donuts **draw themselves** — arcs sweep clockwise from 12 o'clock via `stroke-dashoffset` (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`), **largest → smallest** (the orange protein slice first); the detail-card hub counts up (`--dur-base` 280ms `--ease-out-soft`) — **never opacity-fades** (§8). On the Recipe Detail card the draw order is **hero-first**: the 96px composition Donut draws as the macro card mounts, hub counting up in parallel, before the ingredients/instructions rows settle. Card-grid **micro-donuts draw on scroll-into-view** (they are below the fold), folded into the existing **40ms-per-card stagger** so the grid still lands as one choreography — the card container may translate/fade in as specced, but the donut ring *inside* it always **draws** (it never fades, per §8). `prefers-reduced-motion` → full arcs at rest with the hub at its final value, no sweep (the settled donut is the canonical static form). One viz motif per surface; no competing focal animation is added to this browse screen.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — AI-suggested cards arrive with real macros → real micro-donuts; any starter recipe missing macros shows the **ghosted-ring "macros unavailable"** state (never a fake slice). **Loading** — the card/grid skeleton shimmer already specced; the ring skeleton **morphs** into drawn arcs (depth preserved, never a blank disc). **Empty** (no recipes / no search match) — the existing "No recipes yet" / "No recipes match" copy carries the screen; no degenerate empty chart is shown. **Partial** (some macros null) — present slices + ghosted remainder, distinct from loading and from a real zero. **Low-motivation** — calorie-only KPI on a ghosted ring (see S56-V01), never a single-macro ring. **Error** — per the Error Handling table; a recipe that fails to load shows no donut (graceful text fallback), never a broken ring.
- **60/30/10 & brand:** **orange dominates data ink** — the protein primary slice, the only chart colour that carries meaning; carbs/fat are warm neutral tints (not a palette). **Nutrition-lime stays identity only** (header accent line, eyebrows, diet-plan/cuisine tags, ingredient checkboxes, RPG badge) — it never enters a donut slice. **Purple stays SIA-only** (coaching-note dot, "SIA pick" badge) — there is no chart-purple here (no projection on a browse screen). **Green absent from charts** (no arrival/completion datum). Amber remains only on difficulty badges + the star rating (identity/ordinal, word- and shape-paired), not in any donut. Glow uses the calibrated size-stepped scale — `--glow-orange-sm` on the 96px card slice, **none** at 24px micro — warm depth, never neon.
- **Non-shaming:** macro composition is shown as **information, never a verdict** — a high-fat recipe's slice is a neutral warm tint, **never** recoloured to an alarm red, and no "good/bad food" framing is introduced; the SIA insight stays a coaching note, not a judgement.
- **Accessibility:** each donut carries an `aria-label` enumerating every slice — e.g. *"Protein 29%, carbs 33%, fat 38% of 480 calories"* (1.4.11: load-bearing arcs + slice boundaries ≥ **3:1** on `#211008`); the visible macro-text line + the detail-card legend tiles are the **visible** (not colour-alone) equivalent for every slice; the star rating pairs the amber colour with the **numeral + filled-star shape**; text/value contrast ≥ **4.5:1**; the micro-donut is decorative-adjacent inside an already-44×44pt tappable card (the card is the target — the 24px ring needs no separate hit area); the 96px card donut is non-interactive (legend tiles carry the values). `prefers-reduced-motion` renders all donuts at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** MyFitnessPal premium / Cronometer + Bevel — *stays Balencia via orange data-ink, warm-glow surfaces on ink-brown, the nutrition-lime identity layer (header line, eyebrows, diet-plan tags), and honest part-of-whole Donut visualizations, not a cold flat grid or competitor clone.*

**Pre-grade:** B+ (77) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the search bar and filter chips read as the focal point (size, visual weight), displacing the browse-grid hierarchy; (2) all card surfaces are flat `--color-ink-brown-800` with no top-edge highlight or layered depth — never warm glow; (3) microcopy on empty / loading / error / permission states is partly unwritten; (4) type line-heights and tracking are ad-hoc, not mapped to the `CK-T04/T05` system; (5) the State Craft matrix is deferred; (6) the recipe card grid reads as symmetric monotony (CK-P6 violation) — no intentional hierarchy or varied card sizes to break the eye's path.

### Focal hierarchy

One focal point: the **All recipes grid** (the screen's primary job — browsable recipe library) — sized and positioned as the main content zone below a calm, secondary search-and-filter header. The squint test lands on the grid's 2-column card layout first, then retreats upward to the search bar as a refinement affordance, not a competing hero. The Search Bar is sized at 52pt (medium, with margin breathing room) and positioned with 12pt top margin, establishing it as functional chrome rather than a hero. The Filter Chips (80pt height, two rows) sit immediately below, optically light (low-contrast pill chips on dark field) and scrollable — they refine without overwhelming. Every section below (AI Suggestions, Favorites, Diet Plan Recipes, All Recipes Grid) is visibly secondary by card-body-text hierarchy: the All Recipes Grid dominates via card density and grid repetition, not a single large element. Below-fold sections (AI suggestions, favorites) are deliberately shorter (horizontal scroll, fewer cards) to guide the eye downward through the grid. The FAB ("Create recipe") sits floating, persistent, outside the scroll content but visible — a secondary entry point that does not compete with the grid.

### Surface & depth

Every card surface adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-md` (14pt for recipe grid cards <80px height) · 1pt `--color-glass-border` (`--color-alpha-white-06`) · **`CK-T01 --edge-highlight`** (inset 0 1px 0 rgba(255,255,255,0.06), the top-edge inner highlight that lifts every surface off the field — the single highest-leverage not-flat cue, previously absent) · `--shadow-1`. The larger hero surfaces (SIA Coaching Note Card 80pt, Favorites Section header, Diet Plan card group) use `--radius-xl` (28pt) and add `CK-T02 --surface-backplate` (radial warm-backplate, 120% 90% at 50% 0%, orange 5% to transparent 60%). Glow is size-calibrated per `CONSISTENCY.md §1`: **no glow on inline recipe cards** (<36px elements) or filter chips; the **SIA Suggestions section header carries `--glow-orange-sm` (~12px /.35)** on the purple-dot coaching note (80pt mid-size); the **card-grid Recipe Cards carry no glow at rest** (they are browsable, not focal). The recipe-detail hero image (200pt) carries a **warm overlay gradient** (transparent top 60% to `--color-ink-900` 40% bottom) and sits on a `--radius-xl` card with `CK-T02` backplate; this is the only hero glow surface (≥96px element, carries full `--glow-orange` 32px /.45). All tracks use `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess. Radius locked by role: `--radius-xl` (28pt) primary cards, `--radius-md` (14pt) small grid cards, `--radius-sm` (10pt) chips/nested. No surface reads as a flat box — the calm, crafted feel of a premium recipe app.

### Typographic rhythm

Map the Typography table to `CK-P3` locked tokens: **Domain Dashboard Header title** ("Recipes") — `--text-h2` (20pt) / 600 / `--leading-snug` (1.25) / white 100%. **Section eyebrows** ("AI Suggestions", "Favorites", etc.) — `.eyebrow` recipe: `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` (0.12em) / uppercase / `--color-alpha-white-40`. **Search bar hint text + input** — `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 100% (input) / white 40% (hint text). **Recipe card names** — `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%, max 2 lines. **Macro summary** — `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%. **Prep time + difficulty** — `--text-small` (11pt) / 400. **Recipe Detail: name + metadata** — `--text-h1` (28pt) / 700 / `--leading-snug` / white 100% (name); `--text-caption` / white 50% (metadata). **Stat figures** (calories, protein) — tabular-nums, 20pt–32pt / 700 / white 100%. **"see all" links** — `--text-h3` / 600 / `--color-brand-orange`. **Button text** — `--text-h3` / 600 / white. Sentence case throughout. ≤2 `--color-brand-orange` accent words. Hierarchy by **weight** (600–700 vs 400), not size. Chillax logo-only. Replace ad-hoc pixel line-heights with `CK-T04` scale; letter-spacing via `CK-T05`.

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` brand voice. Notable crafted strings: **Search hint** — *before:* "Search recipes..." → *after:* "Search recipes." (period, on-voice). **SIA Coaching Note** — *before:* generic → *after (authored):* "You're short on protein this week. Try these high-protein recipes." (real connection, specific, coaching tone). **No favorites** — *before:* section hidden → *after:* "Favorite your first recipe to see them here." (warm invitation). **Macros unavailable** — *before:* no copy → *after:* "Macros unavailable. Add them to help others." (non-shaming). **All ingredients checked** — *before:* "Add to Shopping List" (enabled) → *after:* "All ingredients ready" (disabled, 0.4 opacity). **Create recipe modal** — *before:* "Recipe name" → *after:* "Give it a name" (warm, conversational). **Save button disabled** — *before:* no reason → *after:* tooltip "Fill in recipe name, category, at least 1 ingredient, 1 instruction, and calories." **Save success** — *before:* "Recipe created" → *after:* "Recipe saved. Add to shopping list." (warm, forward-looking).

### Motion choreography

Locked to `CK-P4` order: Domain Dashboard Header fades in (280ms `--dur-base`) → Search bar fades in + rises (280ms, 40ms stagger) → Filter chips fade in + rise (280ms, 80ms offset, two rows stagger) → AI Suggestions section fades in + rises (280ms, 120ms offset) → Favorites, Diet Plan fades in + rise (160ms/200ms offset) → All Recipes Grid cards fade in + rise (staggered, 40–80ms per card) with **micro-Donut rings drawn within each card** (image fades 100ms, ring draws 280ms `--dur-base`, morphs into final arc) → FAB fades in (280ms, 280ms offset).

**Recipe Detail entrance:** Detail Header fades in (280ms) → Hero Image fades in + rises (280ms, 40ms offset) → Recipe Info Row fades in (280ms, 80ms offset) → Macros Card fades in + rises (280ms, 120ms offset) with **96px Donut arcs sweeping clockwise** from 12 o'clock (largest slice first, 1200ms `--dur-flow` `--ease-flow`); hub counts up (520ms `--dur-slow` `--ease-out-soft`, starting after arc begins) → Ingredients, Instructions, Rating, CTAs, SIA Insight settle with staggered fade-in + rise. Below-fold surfaces animate on-scroll-into-view.

`prefers-reduced-motion`: all cards at final state instantly; micro & macro Donuts render fully drawn (no sweep); no loops; signature visuals (Donut arcs, warm-overlay gradient) preserved.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Search + filters visible; starter recipes shown; Favorites/Diet Plan sections hidden; AI Suggestions shows welcome note. | "Start by exploring these recipes. Save your favorites as you discover them." (warm, invitation) | all cards on layered warm surfaces; micro-Donuts render with real macro data; layout feels full |
| Loading | All cards + sections show skeleton shimmer (image hint text, text lines, Donut ring outline shimmer that morphs into arcs); grid layout preserved. | "SIA is gathering recipes — one moment." (warm, specific) | skeleton depth preserved; Donut rings morph into drawn arcs — never a swap |
| Empty / partial | **No results:** message card "No recipes match. Try adjusting filters." + "clear filters" button. **Partial:** loaded cards + skeleton cards (distinct visual states). **Missing macros:** ghosted full-ring outline ("macros unavailable" text, never zero-width wedge). | "No recipes match your search. Try 'Chicken' or 'Vegan'." / "Building your recipe library." / "Macros unavailable. Add them to help others." | cards on layered surfaces; ghosted Donut rings visually distinct (dashed outline) — no-data ≠ zero |
| Error | **Search error:** message card "Couldn't search. Pull to refresh." + retry button. **Recipe load error:** card shows hint text + "Couldn't load recipe. Tap to retry." (dimmed 50%). **Image fail:** card renders without image (gradient hint text). | "Couldn't search your recipes. Check your connection and try again." / "Couldn't load. Tap to try again." | calibrated `--color-error-red` only for operational failure (red border + text — glyph + word paired, never colour-alone); cached data retained |
| Offline | All cards show cached data; pull-to-refresh dimmed (50% opacity). FAB disabled (50% opacity). | "You're offline. Showing your saved recipes." / FAB focus tooltip: "You're offline — go online to create recipes." | all cards render with full depth (CK-P1 + CK-T01); disabled FAB shows reason on focus |

### Signature & anti-generic

Ownable moments: (1) **Micro-Donut ring on every recipe card** (24px, orange protein slice + warm neutral carbs/fat tints, no hub, 2px slice gap) — the part-of-whole visual that makes macro composition legible at a glance. (2) **96px macro card Donut** (center hub = total calories, 4 stat tiles as legend, orange slice, drawn-on-enter) — the premium differentiator. (3) **Warm-glow surfaces** (CK-T01 edge-highlight, CK-T02 backplate, calibrated glows) — Balencia signature depth. (4) **The brand period** used with intent.

Anti-generic fixes: The All Recipes Grid is **not flat symmetric-card monotony** (CK-P6). Instead: (1) search + filter header acts as visual break, (2) AI Suggestions + Favorites are horizontal scrolls (asymmetry guides the eye), (3) recipe cards are 2-column with staggered-entrance micro-Donut draw motion inside (motion breaks the grid's static reading). Grid reads as *a carefully curated browse experience*, not a template grid. **Orange-dominant data ink** (Donut slices use orange primary + warm neutral tints, never rainbow). Nutrition-lime stays identity-only. Purple stays SIA-only. **60/30/10 integrity maintained.**

### Accessibility

**Tabulated load-bearing contrast pairs** (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | A11y note |
| --- | --- | --- | --- |
| Recipe card name | `--color-alpha-white-100` | ≥12:1 | Primary text, heading-weight |
| Macro summary text | `--color-alpha-white-50` | ≥4.5:1 | Caption-weight |
| Prep time + icon | `--color-alpha-white-40` | ≥4.5:1 | Icon supplementary, text load-bearing |
| Difficulty badge | domain color 100% text on domain color 15% bg | ≥3:1 (1.4.11) | Colour + text label paired (never colour-alone) |
| "SIA pick" badge | `--color-royal-purple` text on purple 15% bg | ≥3:1 | Label visible ("SIA pick" text) |
| Favorite heart (favorited) | `--color-brand-orange` filled | ≥3:1 (1.4.11) | Colour + filled heart shape paired |
| Micro-Donut slices | `--color-brand-orange` (primary) / white 40% / white 20% | ≥3:1 on `--color-ink-brown-800` | Visible macro-text is the equivalent (never colour-alone) |
| Macro card Donut (96px) | Orange primary + warm-neutral | ≥3:1 | Hub (calorie number) + 4 stat tiles are legend (never colour-alone) |
| "Add to Shopping List" button | `--color-brand-orange` bg / white text | ≥4.5:1 | Primary action, high contrast |
| Search focused border | `--color-brand-orange` 2pt | ≥3:1 (1.4.11) | Focus indicator |
| Filter chip (active) | `--color-brand-orange` bg / white text | ≥4.5:1 | Active state = colour + shape |
| "see all" link | `--color-brand-orange` | ≥3:1 (1.4.11) | Interactive text paired with underline/button context |
| Ingredient checkbox (checked) | `--color-domain-nutrition` fill + white checkmark | ≥3:1 (1.4.11) | Colour (lime, identity-only) + checkmark paired |
| Instruction step (completed) | `--color-forest-green` circle | ≥3:1 | Colour + filled circle + strikethrough text |
| Star rating (filled) | `--color-stalled-amber` | ≥3:1 | Colour + filled star shape + visible numeral "4.5" |

**Focus & interaction:** `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2pt offset) on all focusable elements. Targets ≥44×44pt. Pressed: `scale(0.97)` + light haptic. Success: brief `--glow-green` flash 600ms. Error: `--color-error-red` border + `role="alert"`. **Colour + glyph + word, never colour-alone.** Keyboard: Tab order search → chips → cards → FAB; Enter/Space/Escape on interactive elements. **Live regions:** `aria-label` on Donuts (slice breakdown), `aria-pressed` on chips, `aria-checked` on checkboxes, `role="alert"` on errors, `role="status"` on toasts. **Reduced-motion:** all elements at final state instantly; signature visuals (Donut arcs, warm-overlay gradient) preserved without animation.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism |
| Domain accent line | #84CC16 | nutrition-lime | domain color, header only |
| Domain eyebrow text | #84CC16 | nutrition-lime | macros card eyebrow, diet plan tags |
| RPG badge text + bg | #84CC16 at 100% / 15% | nutrition-lime | domain color on badge |
| "In plan" tag | #84CC16 at 100% / 15% | nutrition-lime | diet plan indicator |
| Diet plan left border | #84CC16 | nutrition-lime | recipe card variant |
| Ingredient checkbox (checked) | #84CC16 | nutrition-lime | ingredient tracking |
| Active filter chip | #FF5E00 | burnt-orange | 60% -- active selection |
| Favorite heart (active) | #FF5E00 | burnt-orange | 60% -- favorited state |
| "Add to Shopping List" CTA | #FF5E00 | burnt-orange | 60% -- primary action |
| Search focus border | #FF5E00 | burnt-orange | 60% -- active field |
| Step number circle | #FF5E00 | burnt-orange | 60% -- instruction markers |
| "see all" links | #FF5E00 | burnt-orange | 60% -- interactive text |
| "Save" modal button | #FF5E00 | burnt-orange | 60% -- confirm action |
| Completed step circle | #34A853 | forest-green | 30% -- completion |
| Difficulty "Easy" badge | #34A853 at 100% / 15% | forest-green | easy difficulty |
| Difficulty "Medium" badge | #F59E0B at 100% / 15% | amber | medium difficulty |
| Difficulty "Hard" badge | #EF4444 at 100% / 15% | red | hard difficulty |
| Star rating (filled) | #F59E0B | amber | rating display |
| SIA purple dot | #7F24FF | royal-purple | 10% -- AI indicator |
| "SIA pick" badge | #7F24FF at 100% / 15% | royal-purple | 10% -- AI suggestion |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |
| Primary text | #FFFFFF at 100% | white | headings, names, values |
| Secondary text | #FFFFFF at 50% | white-50 | macros, captions, metadata |
| Tertiary text | #FFFFFF at 40% | white-40 | eyebrows, time labels, placeholders |

**60/30/10 verification**: orange on active filter chips, favorite hearts, primary CTAs, search focus, step numbers, "see all" links, and "Save" button (60% primary). Green on completed steps, "Easy" difficulty badges, and ingredient checkmarks in detail view (30% secondary). Purple confined to single SIA dot and "SIA pick" badge on AI suggestion cards (10% accent). Domain lime (#84CC16) restricted to header accent line, eyebrow labels, diet plan tags, ingredient checkboxes, and RPG badge -- never on actions or UI chrome.

---

## Interaction States

### Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 10% border, placeholder text, filter icon visible | -- |
| Focused | 2pt Burnt Orange border, cursor visible, keyboard open | light impact |
| Active (typing) | text appears, filter icon replaced by clear X after 2+ chars | -- |
| Disabled | N/A | -- |
| Loading | inline spinner right of text (while searching) | -- |
| Error | "Search failed. Try again." below field | -- |
| Success | results appear below | -- |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 10% border, white at 60% text | -- |
| Pressed | scale(0.95), bg darkens | light impact |
| Active (selected) | Burnt Orange bg, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | N/A | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Recipe Card (Grid / Horizontal Scroll)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | card with image and metadata | -- |
| Pressed | scale(0.97), bg darkens slightly | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | skeleton shimmer (image placeholder + text lines) | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Favorite Heart
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unfavorited) | outlined heart, white at 50% | -- |
| Pressed | scale(0.8) | light impact |
| Favorited | filled heart, Burnt Orange, scale bounce (0.8 to 1.2 to 1.0) | success notification |
| Unfavorited | outlined, scale shrink (1.0 to 0.8 to 1.0), color fades | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "Add to Shopping List" CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, r-pill | -- |
| Pressed | darker orange (#E05500) + scale(0.97) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity ("All ingredients ready") | -- |
| Loading | white spinner replaces text | -- |
| Error | red border, "Could not add" text | error notification |
| Success | green glow (600ms), text changes to "Added" with checkmark | success notification |

### "Log as Meal" CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 10% border, white text | -- |
| Pressed | bg darkens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A | -- |
| Loading | spinner replaces text | -- |
| Error | red border | error notification |
| Success | green glow (600ms) | success notification |

### Star Rating
| State | Visual | Haptic |
|-------|--------|--------|
| Default | filled/empty amber stars | -- |
| Pressed (on star) | scale(1.2) on tapped star, stars fill left-to-right | light impact per star |
| Focus-visible | 2pt orange ring around star row | -- |

### Ingredient Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 20pt square, white at 20% border | -- |
| Pressed | border brightens to white at 40%, scale(0.90) | light impact |
| Checked | #84CC16 fill, white checkmark draws in | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Instruction Step Number
| State | Visual | Haptic |
|-------|--------|--------|
| Default (incomplete) | Burnt Orange circle, white number | -- |
| Pressed | scale(0.9) | light impact |
| Completed | green (#34A853) circle, white checkmark replaces number | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | lime text, 15% opacity pill bg | -- |
| Pressed | scale(0.95), bg opacity 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### FAB (Create Recipe)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism, white text | -- |
| Pressed | scale(0.95), bg darkens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | ScrollView | refresh recipe data |
| Tap | Recipe card | stack push to Recipe Detail |
| Tap | Favorite heart | toggle favorite status |
| Tap | Filter chip | toggle filter |
| Tap | "see all" (any section) | stack push to expanded list |
| Tap | SIA note card | tab switch to SIA Chat [09] with recipe context |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | FAB | open Create Recipe modal |
| Tap | Search bar | focus input, open keyboard |
| Tap | Filter toggle icon | open advanced filter panel |
| Tap | "Add to Shopping List" | add unchecked ingredients to shopping list |
| Tap | "Log as Meal" | open meal type selector, log recipe macros |
| Tap | Ingredient checkbox | toggle ingredient availability |
| Tap | Step number | toggle step completion |
| Tap | Star (rating) | set recipe rating |
| Tap | Hero image (detail) | full-screen photo viewer |
| Tap | Overflow menu (detail) | open edit/share/delete menu |
| Horizontal scroll | AI suggestions, Favorites | scroll through cards |
| Drag down | Create Recipe modal | dismiss (with confirmation) |

**Haptic feedback points**:
- Search field focus: light impact
- Filter chip toggle: medium impact (on activation), light impact (on deactivation)
- Recipe card press: light impact
- Favorite toggle: success notification (on favorite), light impact (on unfavorite)
- "Add to Shopping List" press: medium impact
- "Add to Shopping List" success: success notification
- "Log as Meal" press: light impact
- Star rating tap: light impact per star
- Ingredient checkbox: light impact
- Step completion: light impact
- FAB press: medium impact
- Pull-to-refresh release: medium impact
- RPG badge press: light impact
- Create recipe "Save": success notification

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen mount | fade-in + translateY(12 to 0) | 280ms | ease-out-soft |
| Filter chips | Screen mount | fade-in, 80ms stagger after search | 280ms | ease-out-soft |
| AI suggestions section | Screen mount | fade-in, 160ms stagger | 280ms | ease-out-soft |
| Favorites section | Screen mount | fade-in, 240ms stagger | 280ms | ease-out-soft |
| Diet plan section | Screen mount | fade-in, 320ms stagger | 280ms | ease-out-soft |
| Recipe grid cards | Screen mount | staggered fade-in, 40ms per card | 280ms each | ease-out-soft |
| Recipe card micro-donut (S56-V01) | Scroll-into-view | macro-split arcs draw clockwise from 12 o'clock (stroke-dashoffset), largest → smallest; folded into the 40ms-per-card stagger; never opacity-fade (§8) | 1200ms | ease-flow |
| Favorite heart toggle | Tap | scale 0.8 to 1.2 to 1.0 + color change | 280ms | ease-out-soft |
| Filter chip activate | Tap | bg color crossfade | 160ms | ease-out-soft |
| Recipe detail hero image | Detail mount | fade-in + scale(1.02 to 1.0) | 280ms | ease-out-soft |
| Macro stat tiles | Detail mount | count-up from 0 | 280ms | ease-out-soft |
| Macros card donut (S56-V01) | Detail mount | composition arcs draw clockwise, largest → smallest; center hub (total cal) counts up in parallel; never opacity-fade (§8) | 1200ms (arcs) / 280ms (hub) | ease-flow / ease-out-soft |
| Ingredients list | Detail mount | staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| Instruction steps | Detail mount | staggered fade-in, 60ms per step | 280ms each | ease-out-soft |
| Step completion | Tap number | circle color crossfade orange to green, checkmark draws in | 280ms | ease-out-soft |
| Star rating fill | Tap star | stars fill sequentially left-to-right, 80ms per star | 160ms each | ease-out-soft |
| "Add to Shopping List" success | After add | green glow (600ms), text swap | 600ms | ease-out-soft |
| "Log as Meal" success | After log | green glow (600ms) | 600ms | ease-out-soft |
| Search results | After typing | fade-in list, stagger 40ms per item | 280ms each | ease-out-soft |
| Browse layout return | Search cleared | fade-in | 280ms | ease-out-soft |
| Serving adjuster | [-]/[+] tap | quantity text count-up/down + ingredient quantities update | 160ms | ease-out-soft |
| Create Recipe modal | FAB tap | slide up from bottom + backdrop fade | 520ms | ease-flow |
| Create Recipe dismiss | Drag down / Cancel | slide down + backdrop fade out | 280ms | ease-out-soft |
| FAB scroll hide | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB scroll show | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Pull-to-refresh | Pull release | standard branded spinner | system | system |

**Screen transition**:
- **Enter (Browse)**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit (Browse)**: stack pop slide-out to right (280ms, ease-out-soft)
- **Enter (Recipe Detail)**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit (Recipe Detail)**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user, no recipes)
- Search bar: visible and functional
- Filter chips: visible but no results when tapped
- AI suggestions section: SIA note says "I've picked some starter recipes based on your goals. Give them a try." with 3-5 AI-suggested recipe cards populated from SIA's recommendation engine based on onboarding data.
- Favorites section: hidden (no favorites yet)
- Diet plan section: hidden if no active diet plan; if SIA generated a starter plan during onboarding, shows those recipes with "In plan" tags
- All recipes grid: "No recipes yet" centered text (17pt Semibold, white) + "save a recipe or create your own" (15pt Regular, white at 50%) + "create your first recipe" text link in Burnt Orange below
- FAB visible and functional
- Overall feel: the screen is never empty because AI suggestions fill the top section. The user has content to engage with immediately.

### Established user (no matching results from search/filter)
- Search bar: active with user's query
- Active filter chips highlighted
- Results area: "No recipes match your search" centered text + "try different keywords or filters" helper text (15pt Regular, white at 50%) + "create a recipe" text link in Burnt Orange
- AI suggestions: hidden during active search
- Favorites: hidden during active search

### Established user (no favorites)
- Favorites section is hidden entirely. It appears as soon as the user favorites their first recipe.

### Established user (no active diet plan)
- Diet Plan Recipes section is hidden entirely. It appears when the user activates a diet plan from the Nutrition Dashboard [28].

---

## Motivation Adaptation

- **Low motivation**: AI suggestions section shows only 2 recipe cards (simplest, quickest recipes). Filter chips row collapses to single row (categories only, no attribute chips). All Recipes grid shows only 4 cards. Diet plan section hidden. SIA note is simpler: "Here are two easy recipes for today." Create Recipe FAB remains visible but less prominent (no label, just "+" icon). Recipe Detail shows simplified macros (calories only, no protein/carbs/fat breakdown); accordingly the 96px Macros Per Serving Donut (S56-V01) does not render a composition ring — it collapses to a calorie KPI on a ghosted full-ring outline (hub + 'cal / serving', no slices, no glow), never a fabricated single-macro ring, and the per-card micro-donuts are suppressed (the macro text line carries calories). The full composition donut returns at medium/high motivation.

- **Medium motivation**: default experience as designed. All sections visible with standard detail level. AI suggestions show 3-5 cards. Full filter chip set. Recipe grid loads progressively.

- **High motivation**: AI suggestions section expands to include a "meal prep" sub-section with batch-cooking recipes. Macros in recipe cards expand to show fiber and sodium. Recipe Detail adds a micronutrient breakdown row below macros (fiber, sugar, sodium, potassium). "Nutrition score" badge appears on each recipe card (0-100 scale based on alignment with user's macro targets). Weekly recipe suggestions carousel appears below AI section ("This week's meal plan recipes"). Recipe Detail adds "similar recipes" section at the bottom.

---

## Accessibility

- All recipe images include descriptive alt text: "Photo of [recipe name]: [brief food description]"
- Star rating supports VoiceOver: "Rating: 4.5 out of 5 stars. Double tap to change rating."
- Filter chips announce state: "Breakfast filter, selected" / "Vegan filter, not selected"
- Favorite heart announces state: "Add to favorites" / "Remove from favorites"
- Ingredient checkboxes: "Chicken breast 300 grams, not checked" / "Chicken breast 300 grams, checked -- in hand"
- Step numbers in instructions: "Step 1 of 5, incomplete. Double tap to mark complete."
- Minimum touch target: 44x44pt on all interactive elements
- Color contrast: all text meets WCAG AA on ink-900 and ink-brown-800 backgrounds
- Difficulty badges use text labels alongside color (not color-only differentiation)
- Search bar placeholder text has sufficient contrast (white at 40% on ink-brown-800 = 4.6:1)

---

## Data Model Mapping

| UI Element | Database Column(s) | Notes |
|------------|-------------------|-------|
| Recipe name | `name` | Required, displayed everywhere |
| Description | `description` | Optional, shown in detail view metadata |
| Category chips | `category` | breakfast, lunch, dinner, snack |
| Cuisine tag | `cuisine` | Optional, shown as tag chip |
| Serving count | `servings` | Default 2, adjustable in detail |
| Calorie stat | `calories_per_serving` | Multiplied by servings for total |
| Protein stat | `protein_grams` | Per serving |
| Carbs stat | `carbs_grams` | Per serving |
| Fat stat | `fat_grams` | Per serving |
| Fiber stat | `fiber_grams` | Per serving, shown in detail |
| Ingredients list | `ingredients` (JSONB) | Array of {name, quantity, unit} objects |
| Instructions list | `instructions` (JSONB) | Array of {step_number, text} objects |
| Prep time | `prep_time_minutes` | Shown in card and detail |
| Cook time | `cook_time_minutes` | Shown in detail |
| Total time | `total_time_minutes` | Auto-calculated, shown in card metadata |
| Dietary flag chips | `dietary_flags` | Array: vegan, keto, gluten-free, etc. |
| Tags | `tags` | Array of user-defined tags |
| Recipe image | `image_url` | Optional, gradient placeholder if null |
| Difficulty badge | `difficulty` | easy, medium, hard |
| Star rating | `rating` | 0-5 scale, half-star precision |
| Times made counter | `times_made` | Incremented on "Log as Meal" |
| Favorite heart | `is_favorite` | Boolean toggle |
| Source attribution | `source` | Optional, text credit |
| Source link | `source_url` | Optional, tappable link |

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #84CC16 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | per context |
| Search bar placeholder | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 40% |
| Search bar input text | Sora | Regular 400 | 16pt | 22pt | #FFFFFF |
| Filter chip (inactive) | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| SIA suggestion message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF |
| AI recipe card name | Sora | Semibold 600 | 14pt | 20pt | #FFFFFF |
| AI recipe card macros | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 50% |
| "SIA pick" badge | Sora | Semibold 600 | 11pt | 16pt | #7F24FF |
| Section heading title | Sora | Semibold 600 | 18pt | 24pt | #FFFFFF |
| "see all" link | Sora | Regular 400 | 13pt | 18pt | #FF5E00 |
| Diet plan tag | Sora | Semibold 600 | 11pt | 16pt | #84CC16 |
| Diet plan recipe name | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Diet plan calories | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF at 50% |
| Recipe grid card name | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Recipe grid card macros | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 50% |
| Prep time text | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Difficulty badge | Sora | Semibold 600 | 11pt | 16pt | per difficulty color |
| "My recipe" micro-tag | Sora | Semibold 600 | 10pt | 14pt | #FFFFFF at 30% |
| Detail recipe name | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Detail metadata line | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Cuisine tag chip | Sora | Semibold 600 | 11pt | 16pt | #84CC16 |
| Source attribution | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Macros eyebrow | Sora | Semibold 600 | 12pt | 16pt | #84CC16 |
| Macros stat value | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| Macros stat label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 50% |
| Macros fiber/servings | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Ingredients eyebrow | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Ingredient text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Instructions eyebrow | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Step number | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Step text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 80% |
| Rating value | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Times made text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| "Add to Shopping List" CTA | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| "Log as Meal" CTA | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| SIA insight text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF |
| FAB label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Recipe list load fails | Skeleton shimmer for 3s, then "could not load recipes — tap to retry" centered in grid area | Tap retry re-fetches; pull-to-refresh also available |
| Search returns error | Search bar shows red border flash (280ms), "search failed — try again" below bar in 13pt Regular, white at 40% | User can re-submit search query |
| AI suggestions load fails | AI section shows "could not load suggestions" in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Favorite toggle fails | Heart icon reverts to previous state with brief shake animation, "could not save" toast (2s) | User can retry tap |
| Recipe detail load fails | Detail screen shows "could not load recipe" + "retry" link centered on ink-900 | Tap retry re-fetches recipe data |
| "Add to Shopping List" fails | CTA shows error state (red border flash), "could not add ingredients — try again" toast (3s) | CTA re-enables; ingredient selections preserved |
| "Log as Meal" fails | CTA shows error state, "could not log meal — try again" toast | CTA re-enables; meal type selection preserved |
| Recipe image fails to load | Gradient placeholder with fork+knife icon. No error text — degrades gracefully. | Image retries on next screen visit |
| Create recipe save fails | Modal save CTA shows error state, "could not save recipe — try again" toast | CTA re-enables; all form data preserved |
| Network offline | Browse shows cached recipes with "offline — showing cached data" banner. Search and create disabled with "available when online" toast. | Banner includes "tap to retry" on reconnect |

---

## Cross-References

- **Navigates to**: Nutrition Dashboard [28] via stack pop (back), SIA Chat [09] via tab switch (SIA note tap), Meal Detail / Food Logger [29] via stack push ("Log as Meal"), RPG Character [19] via stack push (RPG badge tap), Image Viewer [67] (modal presentation via hero image tap), Report/Block [64] (modal bottom sheet via recipe overflow menu → "report" for community recipes)
- **Navigates from**: Nutrition Dashboard [28] via stack push ("Recipes" quick action card), SIA Chat [09] via deep-link (stack push), Home Screen [12] via nutrition action card (stack push)
- **Shared components with**: Screen 28 (Domain Dashboard Header, SIA Coaching Note Card, Section Heading Row, FAB -- identical pattern, different content), Screen 29 (Meal Type Selector reused in "Log as Meal" flow, Macro display patterns), Screen 13 (Filter Chip pattern), Screen 25 (Search Bar pattern)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card compact variant (Screen 26), Section Heading Row (Screen 26), FAB Extended Pill variant (Screen 26), Filter Chip (Screen 13), Search Bar (Screen 25), In-Card CTA Button (Screen 26), Back Button (Batch 1), Text Input Field (Batch 1), 8-State Interaction Model, Domain Tag Chip (Screen 37), Stat Tile (Screen 26)
- **Patterns established**: Recipe Card (image + name + macro summary + prep time + difficulty badge + favorite heart -- reusable for any food content grid), AI Suggestion Card (recipe card variant with "SIA pick" badge and horizontal scroll), Recipe Detail Layout (hero image + macro stats + checkbox ingredient list + numbered instructions + dual CTAs), Serving Adjuster (inline [-]/[+] stepper that scales ingredient quantities), Star Rating (5-star interactive rating with sequential fill animation), Diet Plan Tag ("In plan" tag with lime left border to indicate plan membership)

---

## Implementation Notes

- **Pagination**: All Recipes grid uses infinite scroll with 12 recipes per page. Loading indicator: skeleton card shimmer at bottom of grid while fetching next page.
- **Search debounce**: 300ms debounce on search input before API call. Inline spinner shown during search.
- **Image optimization**: Recipe images served at 2x resolution for retina displays. Image URLs should support width parameter for responsive sizing (160w for cards, 400w for detail hero).
- **Offline support**: Favorited recipes and their full detail data should be cached locally for offline access. Show "Offline" badge (11pt, white at 30%) on cached recipes when offline.
- **Deep linking**: Support `balencia://recipes/{recipe_id}` for SIA deep-links and sharing.
- **Create Recipe validation**: client-side validation on required fields before enabling "Save". Server-side validation on macro values (non-negative, reasonable ranges).
- **Serving scaling**: when user adjusts servings in Recipe Detail, all ingredient quantities scale proportionally. Macros display updates to show per-serving values (unchanged) with a "Total for X servings: Y cal" line below.
- **"Log as Meal" flow**: on successful log, increment `times_made` counter and navigate to Meal Detail [29] with success state. Macro data from the recipe populates the food log entry.
- **Performance**: horizontal scroll sections (AI suggestions, Favorites) use lazy rendering. Grid uses windowed list for recipes beyond the initial 12.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-15.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/recipes`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q04 health logging needs visible in-session state, not persistence.
- Q41 recipes and shopping list support lightweight real mutations; sharing is review-first.
- Q45 meditation/yoga need library-to-active-to-complete modes.
- Q46 quick notes prioritize global bottom-sheet capture.
- Q47 report/block keeps also-block default off.
- Q49 sleep accent is canonical sleep-indigo.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B15-F07 | critical | retention | Replace search with a real input, make filters stateful, and wire recipe creation, save, and open behavior. |
| B15-F08 | major | navigation | Make cards and rows semantic links/buttons with detail, Add to shopping list, Log as meal, favorite, and SIA actions. |
| B15-F09 | major | accessibility | Use 44px semantic controls for filters, section actions, favorites, recipe cards, and create entry. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

