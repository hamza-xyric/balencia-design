# Screen 56: Recipes Specification

## 1. Header
- **Screen ID:** 56
- **Name:** Recipes
- **Route(s) covered:** No live route; recipe library, detail, and create states are nested nutrition modules.
- **Tab:** Me (root), Nutrition (deep-link)
- **Source:** Functional Content Brief: Recipes Screen (Mobile)
- **Batch:** 13

## 2. Purpose
To serve as the user's personal nutrition library, facilitating the discovery of meals, curation of favorites, and creation of custom recipes. The screen bridges meal planning and food logging by allowing users to push ingredients to supply chains (shopping lists) and macros to daily health tracking. 

## 3. Entry & exit
- **Entry Paths:**
  - Nutrition Dashboard [28] via "Recipes" quick action card.
  - CIA Chat [09] via deep-link (e.g., "here are some high-protein recipes").
  - Home Screen [12] via nutrition action card.
- **Exit Paths:**
  - **Back:** Returns to source screen (Nutrition Dashboard [28] or Home [12]).
  - **Forward:** Recipe Detail (stack push), Meal Detail / Food Logger [29] (stack push via "Log as Meal"), Create Recipe (`Sheet` modal bottom-up), CIA Chat [09] (tab switch via `CIAInsightCard` tap).
  - **System Links:** RPG Character [19] (via Lv.8 badge tap), Image Viewer [67] (via recipe image tap), Report/Block [64] (via overflow menu for community recipes).

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere & Navigation:** Base background gradient, `TopBar` with back/state.
2. **Search & Filters:** `GlassPillInput` for search, `SegmentedTabs` for categories, `ChipDomainTag` for attributes.
3. **CIA Suggestions:** `CIAInsightCard` header followed by a horizontally scrolling row of premium-curated recipes.
4. **Favorites & Plan:** Horizontally scrolling rows of `SolidCard`s (hidden if empty).
5. **All Recipes Grid:** Browsable 2-column masonry grid of `SolidCard`s.
6. **System Navigation:** Floating `FABQuickLog` and `GlassNavBar`.

**ASCII Wireframe (390x844):**
```text
+---------------------------------------------+ |
|  < [Icon] Recipes                   [Lv.8]  | | <- TopBar (Transparent/Glass)
+---------------------------------------------+ |
|  ( ) Search recipes.            [Filter] |   | | <- GlassPillInput
+---------------------------------------------+ |
|  [ Breakfast ][ Lunch ][ Dinner ][ Snacks ] | | <- SegmentedTabs
|  [ Vegan ] [ Keto ] [ High-Protein ] [ > ]  | | <- ChipDomainTag
+---------------------------------------------+ |
|  CIA SUGGESTIONS                            | | <- SectionHeader
|  +-----------------------------------------+ | |
|  | *  You're short on protein this week.   | | | <- CIAInsightCard (glow-cia)
|  +-----------------------------------------+ | |
|  +-------+   +-------+   +-------+          | | <- Horizontal Scroll
|  | [Img] |   | [Img] |   | [Img] |          | |    (Premium / Blurred if Free)
|  | Recipe|   | Recipe|   | Recipe|          | |
|  | Macros|   | Macros|   | Macros|          | |
|  +-------+   +-------+   +-------+          | |
+---------------------------------------------+ |
|  FAVORITES                                  | | <- SectionHeader (Hidden if null)
|  +-------+   +-------+                      | |
|  | [Img] |   | [Img] |                      | |
|  +-------+   +-------+                      | |
+---------------------------------------------+ |
|  ALL RECIPES                                | | <- SectionHeader
|  +---------+         +---------+            | | <- BentoGrid (Masonry)
|  | [ Image ]|        | [ Image ]|           | |
|  | Name     |        | Name     |           | |
|  | Calories |        | Calories |           | |
|  +---------+         +---------+            | |
|           +---------+         +---------+   | |
|           | [ Image ]|        | [ Image ]|  | |
|           | Name     |        | Name     |  | |
|           +---------+         +---------+   | |
|                                             | |
+---------------------------------------------+ |
|               [ floating FAB ]            | | |
+---------------------------------------------+ |
|  [ Today ]  [ *CIA* ]  [ Goals ]  [ Me ]    | | <- GlassNavBar
+---------------------------------------------+ |
```

## 5. Components
- **TopBar** (Transparent over atmosphere, gains `.glass-pill` on scroll).
- **GlassPillInput** (Search variant with leading glyph; `NEW: FilterTrigger` inline trailing glyph for advanced sheet).
- **SegmentedTabs** (Category single-select).
- **ChipDomainTag** (Attribute multi-select).
- **SectionHeader** (Standard overline + titles).
- **CIAInsightCard** (Variant: Carousel Header).
- **SolidCard** (Recipe tile variants: `Standard`, `Wide`).
- **BentoGrid** (Masonry layout wrapper).
- **FABQuickLog** (Standard 56px).
- **GlassNavBar** (Standard 4-tab, Me active).
- `NEW: RecipeTile` (A specialized `SolidCard` containing an image header, domain tags, title, macro `KPIRow`, and favorite toggle. Rationale: Ensures consistent data presentation across long scroll lists without violating glass/solid boundaries).

## 6. Visual treatment
- **Background atmosphere:** `--bg-base` (#0A0A0F) overlaid with the mandatory warm radial glow top-center. CIA moments utilize the warm base with a subtle purple pool behind the `CIAInsightCard`.
- **Glass tier per region:**
  - **Search & Filters:** `.glass-pill` (Input) and `.glass-pill` track (Segmented Tabs).
  - **CIA Suggestions:** `.glass-card` (CIAInsightCard) and `--surface-2` (Recipe Tiles).
  - **All Recipes Grid:** Solid `--surface-2` cards. 
- **Semantic inner-glow (meaning-driven):**
  - **CIA Suggestions:** `--glow-cia` (Purple). Signifies AI generation, cross-domain macro analysis, and premium tier intelligence.
  - **Browse Grid & Favorites:** No glow at rest (respects resolved contradiction: grid is focal mass, not a single hero). 
  - **Active Diet Plan Tiles:** `--glow-you` (Orange) at 30% opacity to mark user's active commitment.
- **The one hero type moment:** Display (34px, NM Medium 500) is reserved exclusively for the "All Recipes" section title when invoked via deep-link, anchoring the screen.

## 7. Content & copy
- **Search Placeholder:** Search recipes.
- **CIA Coaching Notes:**
  - "You're short on protein this week. Try these high-protein recipes."
  - "These recipes match your weight loss plan — under 500 cal each."
  - "You've been eating a lot of chicken. Try some plant-based protein."
- **CIA Insight (Detail View):** "This recipe covers 29% of your daily protein. Great post-workout."
- **Empty States:**
  - "Start by exploring these recipes. Save your favorites as you discover them."
  - "No recipes match your search. Try 'Chicken' or 'Vegan'."
  - "Not enough data yet — save a recipe or create your own."
  - "Favorite your first recipe to see them here."
- **CTAs & Metadata:** 
  - Add to Shopping List
  - Log as Meal
  - In plan, My recipe, *CIA* pick
- **Create Modal:** Give it a name, Brief description (optional), Total: 45 min.
- **Errors / Loading:** Couldn't search. Pull to refresh., Macros unavailable. Add them to help others., *CIA* is gathering recipes — one moment., You're offline. Showing your saved recipes.

*Correction applied:* Replaced "CIA" with "*CIA*" in all UI copy per the canonical identity rules. Replaced double-hyphen (--) with em-dash (—) to match typographic standards.

## 8. Data & honesty states
Every metric ships in three states. No fabricated numbers.

**1. Caloric Load (Per Serving)**
- **Real:** 450 cal · `ChipProvenance`: "Recipe DB"
- **Low-confidence:** 450 cal (muted 64%) · `ChipProvenance`: "estimated · low confidence"
- **Honest-null:** "Macros unavailable. Add them to help others." (`HonestNullState`)

**2. Daily Protein % (Detail View)**
- **Real:** 29% · `ChipProvenance`: "via WHOOP" (macros vs logged intake)
- **Low-confidence:** ~29% (muted 64%) · `ChipProvenance`: "estimated"
- **Honest-null:** "Not enough data yet — log a workout to see post-workout impact." (`HonestNullState`)

**3. Recipe Rating (5-star)**
- **Real:** 4.5 · `ChipProvenance`: "42 ratings"
- **Low-confidence:** N/A (Rating is a hard integer aggregate; no low-confidence state exists).
- **Honest-null:** "Be the first to rate." (`HonestNullState`)

## 9. All states
- **Default:** Browse view loaded with CIA carousel, favorites, and main grid.
- **Skeleton:** Depth-preserving `SkeletonState`. Cards retain their solid silhouette; images are `--surface-3` blocks with 1.2s sweep; Macro rings render as axis outlines. 
- **Empty (Day 1):** Grid displays `HonestNullState` ("Not enough data yet — save a recipe or create your own.") with a `BtnPrimary` ("Create recipe").
- **Empty (No Search Match):** Replaces grid with a `SolidCard` ("No recipes match your search. Try 'Chicken' or 'Vegan'.") with `BtnGhost` to clear filters.
- **Error:** Quiet failure. No red screen. `ErrorState` card with "Couldn't search. Pull to refresh." Failing images degrade gracefully to subtle warm-gradient placeholders within the card frame.
- **Success:** Favoriting triggers a 0.8 to 1.2 scale bounce on the heart icon. Logging a meal triggers `XPToast` ("+40 XP · Nutrition").
- **Disabled:** Offline state disables Search (`GlassPillInput` drops to 40% opacity) and hides `FABQuickLog`. Displays `OfflineBanner` ("offline — showing last sync 2h ago").

## 10. Motion & interaction
- **Easing & Duration:** Strict physical easing (never linear). Feedback animations mapped to 150–250ms window.
- **Glow behavior:** `glow-cia` breathes (4s ease) to denote active AI analysis in the suggestions header. `glow-you` breathes softly on "In Plan" tiles. Browse grid remains static at rest. 
- **Haptics:** 
  - Light impact: Taps, toggling favorites, ingredient checkboxes.
  - Medium impact: FAB deployment, "Log as Meal" confirmation.
  - Success notification: Recipe successfully saved or logged.
- **Transitions:** Cards stagger fade-in/rise on mount (20ms delay per item). `FABQuickLog` translates out of view on scroll-down, returns on scroll-up.
- **Reduced-motion path:** Glow breathing becomes static alpha blend. Staggered mount becomes single 200ms cross-fade. Macro Donut arcs render fully drawn without the 1200ms clockwise sweep. 

## 11. Motivation-tier adaptation
- **Low density:** Simplified UI. CIA suggestions hidden. Grid view simplifies `RecipeTile` to image + name + calories only. Macro donut hidden in detail view. 
- **Medium density:** Default experience. CIA suggestions present (if premium). Grid displays image, name, and core `KPIRow` (Cal/Prot/Carbs).
- **High density:** Expands `RecipeTile` to include fiber/sodium. Detail view exposes deep nutrition scoring and automated meal-prep batch multiplier steppers. Grid density increases (masonry columns expand from 2 to 3 on supported devices/landscape).

## 12. Accessibility
- **AA+ Contrast:** All text verified against `--surface-2` and `.glass-card`. Paper-100 (#FEFAF3) on `--surface-2` (#211008) exceeds WCAG AAA. 
- **Targets:** All interactive elements (filter chips, fav hearts, serving steppers) strictly enforce a 44x44px minimum touch target via invisible padding bounds.
- **Screen-reader labels:** Glyph-only controls (Favorite heart, FAB, Search filter) include `accessibilityLabel` traits (e.g., "Add to favorites", "Create new recipe", "Open advanced filters"). 

## 13. Premium checklist
1. **Connects:** Bridges RPG metrics, CIA AI macro-analysis, and Shopping Lists/Logger [29].
2. **Honest:** Uses strict 3-state data rules. No fake star ratings; explicitly prompts user to add macros if null.
3. **Premium:** Corrects brief's logical errors (coach naming locked to CIA; solid cards for data grid to ensure legibility over aesthetic glassabuse).
4. **60/30/10:** Burnt orange active states, green completion indicators, purple CIA elements precisely balanced.
5. **Selective glass:** Used purely for sticky/floating chrome (`TopBar`, `FAB`, `GlassNavBar`) and hero moments (`CIAInsightCard`). Data is solid.
6. **Inner-glow:** Only one semantic glow (`glow-cia`) on the AI section; grid is matte.
7. **One hero type moment:** Display size reserved strictly for deep-link anchoring ("All Recipes").
8. **Honesty invariant:** Documented provenance for all metrics via `ChipProvenance`.
9. **One BtnPrimary:** Enforced per view (e.g., "Log as Meal" in detail; FAB is a circle, not a primary fill).
10. **CIA copy:** Sentence case, em-dashes, no exclamations, "CIA" over "CIA", one Tiempos italic emphasis.
11. **AA+ targets:** 44px touch bounds verified.
12. **Motion:** 150-250ms feedback enforced; reduced-motion paths defined.
13. **Domain colors:** Nutrition `#84cc16` used strictly as tag accents on tiles.
14. **PaywallLock:** Applied seamlessly to CIA carousel for non-premium users (no dead ends).
