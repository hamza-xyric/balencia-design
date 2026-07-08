## 1. Header
- **Screen ID:** 70
- **Name:** Exercise Library
- **Route(s) covered:** `/exercises`, `/exercises/[id]`
- **Tab:** Today / Explore
- **Source:** Fitness DB / Local Cache
- **Batch:** 11

## 2. Purpose
A lightweight, performant utility for discovering over 500 movements, learning proper form, and selecting exercises for workout planning. Deliberately stripped of cross-domain charting to keep the focus on fast, unbloated browsing.

## 3. Entry & exit
**Entry paths:**
*   **Fitness Dashboard:** Via the "browse exercises" shortcut.
*   **Workout Detail (Planning Mode):** Via the "add exercise" button (passes context to enable the "Add to workout" CTA).
*   **Explore:** Via the Fitness section.

**Exit paths:**
*   **Previous Screen:** Via stack pop (Back chevron).
*   **Exercise Detail Modal:** Opens as a bottom sheet overlay by tapping a card.
*   **Workout Detail:** Via the "Add to workout" CTA within the detail sheet (planning context only).

## 4. Layout anatomy
**Regions top-to-bottom:**
1.  **TopBar:** Transparent over atmosphere, gains `.glass-pill` backdrop on scroll. 44px back chevron, H1 title, 44px bookmark glyph.
2.  **Search & Filters:** Sticky beneath TopBar. GlassPillInput search bar, followed by two scrollable rows of SegmentedTabs (Muscle, Equipment).
3.  **Contextual Banner:** Slot for OfflineBanner or result count.
4.  **Exercise Grid:** Virtualized 2-column masonry of NEW: ExerciseTileCards. Pull-to-refresh enabled.
5.  **GlassNavBar:** Floating bottom pill (Today · CIA · Goals · Me).

**ASCII Wireframe (390x844):**
```text
      .-- TopBar (Transparent) --------------.
      |  <                       Library     O |
      '----------------------------------------'
      .-- GlassPillInput ---------------------.
      |  Q   search exercises...             |
      '----------------------------------------'
      .-- Muscle Filters (Scroll) ------------.
      |  ( All ) ( Upper Body ) ( Lower )  >  |
      '----------------------------------------'
      .-- Equip Filters (Scroll) -------------.
      |  ( Any ) ( Dumbbell ) ( Barbell )  >  |
      '----------------------------------------'
      |  532 exercises                        |
      .-- Virtualized Grid (2-col) -----------.
      |  .----------.   .----------.         |
      |  | [Image]  |   | [Image]  |         |
      |  | Bench Pr |   | Squat    |         |
      |  | Chest    |   | Legs     |         |
      |  | ▮▮▯ Adv  |   | ▮▮▯ Adv  |         |
      |  |          |   |          |         |
      |  |          |   |          |         |
      |  '----------'   '----------'         |
      |  .----------.   .----------.         |
      |  | [Image]  |   | [Image]  |         |
      |  | Plank    |   | Pullup   |         |
      |  | Core     |   | Back     |         |
      |  | ▮▯▯ Beg  |   | ▮▮▯ Int  |         |
      |  '----------'   '----------'         |
      '----------------------------------------'
               .--- Floating Nav ---.
               |  o   *   o   o    |
               '-------------------'
```

## 5. Components
*   **TopBar** (Transparent / `.glass-pill` on scroll)
*   **GlassPillInput** (Variant: search)
*   **SegmentedTabs** (Single-select for muscle, multi-select for equipment)
*   **GlassNavBar**
*   **OfflineBanner / SyncStatus** (Variant: offline cache notice)
*   **NEW: ExerciseTileCard:** SolidCard base for dense data legibility. Contains image, text, and difficulty meter. One-line rationale: Grid tiles require a specialized, ultra-clean composition optimized for masonry layouts without internal glass glow (obeying the selective glass rule).
*   **NEW: DifficultyMeter:** Compact 3-bar ordinal indicator (Beg/Int/Adv). One-line rationale: Existing progress bars imply continuous percentage, whereas difficulty is strictly ordinal (1, 2, or 3).
*   **Sheet** (Variant: `half` for exercise details)
*   **BtnPrimary** (Contextual CTA inside Sheet)
*   **BtnSecondary** (Retry actions)
*   **HonestNullState** (For unrated data)

## 6. Visual treatment
*   **Glass tiers:** Glass is strictly reserved for the TopBar (on scroll), the Search input, Filter chips, and the bottom Sheet/S scrim. The grid uses `SolidCard` (`--surface-2`) to handle data density cleanly.
*   **Semantic glow:** 
    *   *None* on the grid `SolidCard`s. 
    *   *None* on the detail `Sheet` (data legibility priority).
    *   Active filter chips gain a subtle `--glow-you` (effort/preparedness).
*   **Background atmosphere:** The mandatory warm radial glow sits at top-center. When offline, the atmosphere remains warm, but the `OfflineBanner` provides the visual state shift.
*   **Hero type moment:** The result count text ("532 exercises") is rendered in Tiempos Medium _italic_ Display 34pt to anchor the utility screen with a moment of premium editorial weight.

## 7. Content & copy
Sentence case, no exclamation marks, exactly one emphasis word per moment.
*   **Nav Title:** Exercise library
*   **Search Placeholder:** search exercises...
*   **Result Count:** 532 *exercises* 
*   **Difficulty Gloss (Intermediate):** Intermediate — *solid* form on the fundamentals.
*   **Empty State:** No exercises found. Try different filters or search terms.
*   **Error State (List):** Couldn't load exercises. Check your connection and try again.
*   **Offline Banner:** You're offline — showing cached exercises
*   **Detail Sheet Headers:** How to perform, Common mistakes, Variations, Target areas
*   **CTA (Add):** Add to workout
*   **CTA (Success):** *Added* 

## 8. Data & honesty states
*   **Exercise Difficulty Metric:**
    1.  **Real:** 3-bar DifficultyMeter filled appropriately (e.g., 2/3 bars). Provenance: inherent database property (`exercise.difficulty`).
    2.  **Low-confidence:** *Not applicable*. Difficulty is an absolute categorical property of the exercise, not a synced user metric.
    3.  **Honest-null:** Empty 3-bar track with "Unrated" text label. 
*   **Result Count Metric:**
    1.  **Real:** "[N] *exercises*" (e.g., 532 exercises). Provenance: Exercise DB size.
    2.  **Low-confidence:** *Not applicable*. Count is either exact or zero.
    3.  **Honest-null:** Zero results state (Empty State UI replaces count).

## 9. All states
*   **Default:** 2-col masonry grid, scrollable, filters accessible.
*   **Skeleton:** 2-column shimmer block grid (`--surface-3` base, 1.2s sweep) matching card geometry.
*   **Empty:** Centered search glyph, "No exercises found", (no BtnPrimary as filters are the primary corrective action).
*   **Error (List):** Centered offline cloud glyph, plain language Body text, BtnSecondary `retry`. Filters visible but inert.
*   **Error (Detail):** Sheet opens to skeleton, resolves to failure message + BtnSecondary `retry` after 5 seconds.
*   **Success (CTA):** "Add to workout" BtnPrimary transitions to forest green `BtnSuccess` fill with text "Added" for 600ms.
*   **Disabled:** BtnPrimary disabled (40% opacity) during network mutation (prevents double-taps).

## 10. Motion & interaction
*   **Physical easing:** 250ms standard feedback, 520ms `ease-flow` spring for the detail Sheet.
*   **Grid entry:** DifficultyMeter bars animate their "rise" (transform Y) as they enter the viewport. 
*   **Tap interactions:** Cards scale to `.97` with light haptic on tap. Filter changes crossfade the grid (280ms).
*   **Glow behavior:** Active filter chips bleed a subtle orange glow (`glow-you`).
*   **Reduced motion (`prefers-reduced-motion`):** Grid crossfades and DifficultyMeter bar rises are bypassed; elements render instantly at final state. Sheet slides up without spring interpolation.

## 11. Motivation-tier adaptation
*   **Low (Density 1):** Images hidden in `ExerciseTileCard`. Text-only layout reduces cognitive load and increases scroll speed.
*   **Medium (Density 2):** Standard 2-column masonry grid with 4:3 aspect ratio thumbnails and text. Default experience.
*   **High (Density 3):** Expanded 1-column list view with larger 16:9 hero imagery per row, prioritizing visual form discovery over dense textual scanning.

## 12. Accessibility
*   **Contrast:** Paper-100 `#FEFAF3` on `--surface-2` `#211008` easily surpasses AA+ contrast for text.
*   **Targets:** 44px minimum targets strictly enforced for TopBar actions, filter chips, and the bottom Sheet grabber/CTA zone.
*   **Screen-reader labels:** 
    *   Search: "Search exercises by name, muscle group, or equipment"
    *   Cards: "[name], targets [muscle], [difficulty] difficulty"
    *   Detail CTA: "Add [exercise name] to current workout"

## 13. Premium checklist
1.  **Connects:** (Yes) Modifies behavior cleanly based on entry route (Dashboard vs. Workout Planner) without breaking context.
2.  **Honest:** (Yes) Explicit empty and unrated states provided; no fabricated difficulty metrics.
3.  **Premium:** (Yes) Editorial Tiempos result count anchors a utility screen with high-end typographic weight.
4.  **Glass selective:** (Pass) Glass strictly limited to nav/search/sheets. Data grid uses SolidCard for premium legibility.
5.  **One glow per card:** (Pass) Grid cards have no glow; active chips have `glow-you`.
6.  **60/30/10 color:** (Pass) Orange (60/active), Green (30/success), Purple (10/omitted correctly as this is non-AI utility).
7.  **Sentence case / No exclamations:** (Pass) All copy adheres to CIA tone.
8.  **One Tiempos italic per moment:** (Pass) The "[N] *exercises*" count holds the spotlight.
9.  **Honest nulls for metrics:** (Pass) Unrated difficulty uses designed empty track + text.
10. **Shape & radii:** (Pass) SolidCards use 28 (`--r-xl`), inputs use 999 (`.glass-pill`).
11. **44px targets & A11y:** (Pass) Glyphs mapped to explicit aria-labels; targets respected.
12. **Reduced motion:** (Pass) Explicit path defined for bypassing animations.
13. **Bottom Nav:** (Pass) Floating GlassNavBar implemented.
14. **No CIA:** (Pass) Replaced with CIA in all system references.
