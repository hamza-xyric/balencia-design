# 56-recipes - A+++ hi-fi mobile spec

## Header
- **Source ID:** 56
- **Source spec:** `Balencia-New-Screens/screens/56-recipes.md`
- **Evidence:** screens/56-recipes.md, work/briefs/56.md, work/drafts/56.md, Functional Content Brief: Recipes Screen (Mobile)
- **Route(s):** No live route; recipe library, detail, and create states are nested nutrition modules.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To serve as the user's personal nutrition library, facilitating the discovery of meals, curation of favorites, and creation of custom recipes.
- **Premium Visual Director:** make Recipes command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Recipes treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

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
|  [ Nutrition tab: Recipes active ]           | | <- inherited parent tab state
+---------------------------------------------+ |

Route handling: No live route; recipe library, detail, and create states are nested nutrition modules.
```

## Focal Hierarchy
- **Dominant focal moment:** Recipes command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & Navigation with CIA only when the source supports a synthesized read.
- **Operational layer:** Search & Filters, CIA Suggestions, Favorites & Plan, All Recipes Grid.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is nested under Nutrition: warm-light recipe tab, green illustration/empty state, category chips, and orange `Create First Recipe` CTA.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium browse variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*recipes*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma alias:** nested `Recipes` tab inside the Nutrition screen.
- **Evidence tier / canon exception:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session; alignment comes from supplied mock/reference screens plus local prompt/ledger evidence. The warm-light Figma-derived recipe tab is a scoped exception, not a replacement for glass-dark v1 canon. CIA naming, data honesty, and glass-redesign rules remain binding.
- **Nutrition-tab inheritance:** this screen has no standalone route. It inherits the Figma Nutrition shell when launched from `/nutrition`: top macro cards remain optional/condensed, tab rail keeps `Analytics / Plan / Recipes / History / Today`, and `Recipes` is the active orange tab.
- **Recipes anatomy:** use the visible recipe empty state as the base: category chips (`All`, `Breakfast`, `Lunch`, `Dinner`, `Snack`), centered green nutrition illustration slot, `No Recipes Yet` body copy, and full-width orange `Create First Recipe` CTA. Populate search/grid/favorites only after the user has recipes.
- **Color discipline:** green-tinted nutrition illustration and food cards carry the domain; orange remains action; purple only appears if an AI-powered recipe suggestion is visible and evidence-backed.

## Components
- **TopBar** (Transparent over atmosphere, gains `.glass-pill` on scroll).
- **GlassPillInput** (Search variant with leading glyph; `NEW: FilterTrigger` inline trailing glyph for advanced sheet).
- **SegmentedTabs** (Category single-select).
- **ChipDomainTag** (Attribute multi-select).
- **SectionHeader** (Standard overline + titles).
- **CIAInsightCard** (Variant: Carousel Header).
- **SolidCard** (Recipe tile variants: `Standard`, `Wide`).
- **BentoGrid** (Masonry layout wrapper).
- **FABQuickLog** (Standard 56px).
- **Parent navigation state:** no standalone bottom-nav ownership; parent Nutrition route remains active with `Recipes` selected in the nutrition tab rail.
- `NEW: RecipeTile` (A specialized `SolidCard` containing an image header, domain tags, title, macro `KPIRow`, and favorite toggle. Rationale: Ensures consistent data presentation across long scroll lists without violating glass/solid boundaries).

## Data Honesty
- Every metric ships in three states. No fabricated numbers.
- **1. Caloric Load (Per Serving)**
- **Real:** 450 cal  `ChipProvenance`: "Recipe DB"
- **Low-confidence:** 450 cal (muted 64%)  `ChipProvenance`: "estimated  low confidence"
- **Honest-null:** "Macros unavailable. Add them to help others." (`HonestNullState`)
- **2. Daily Protein % (Detail View)**
- **Real:** 29%  `ChipProvenance`: "via food log + recipe DB" (macros vs logged intake; only reference workout/recovery evidence if the view explicitly combines post-workout context)
- **Low-confidence:** ~29% (muted 64%)  `ChipProvenance`: "estimated"
- **Honest-null:** "Not enough data yet - log a workout to see post-workout impact." (`HonestNullState`)
- **3. Recipe Rating (5-star)**
- **Real:** synced user/community rating with source label and count.
- **Low-confidence:** hidden or muted `rating pending` while sync is incomplete; never infer a rating from saves.
- **Honest-null:** no rating row; optional `Be first to rate` action.
- **Allergy/diet fit:** real = matched against stored restrictions; low-confidence = possible conflict awaiting confirmation; honest-null = `No restrictions added`.

## Consent and Safety
- Recipes treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Recipe/database chips open controls for recipe source, nutrition database, freshness, retention, export saved recipes, revoke imported recipe source, and delete recipe/media.
- Recipe suggestions respect allergies and dietary restrictions before CIA personalization. Copy is coaching support, not medical nutrition advice.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Browse view loaded with CIA carousel, favorites, and main grid.
- **Skeleton:** Depth-preserving `SkeletonState`. Cards retain their solid silhouette; images are `--surface-3` blocks with 1.2s sweep; Macro rings render as axis outlines.
- **Empty (Day 1):** Grid displays `HonestNullState` ("Not enough data yet - save a recipe or create your own.") with a `BtnPrimary` ("Create recipe").
- **Empty (No Search Match):** Replaces grid with a `SolidCard` ("No recipes match your search. Try 'Chicken' or 'Vegan'.") with `BtnGhost` to clear filters.
- **Error:** Quiet failure. No red screen. `ErrorState` card with "Couldn't search. Pull to refresh." Failing images degrade gracefully to subtle warm-gradient placeholders within the card frame.
- **Success:** Favoriting triggers a 0.8 to 1.2 scale bounce on the heart icon. Logging a meal may show `XPToast` only if reward feedback is enabled; nutrition reward copy must never pressure streaks, restriction adherence, or compulsive logging.
- **Disabled:** Offline state disables Search (`GlassPillInput` drops to 40% opacity) and hides `FABQuickLog`. Displays `OfflineBanner` ("offline - showing last sync 2h ago").

## Motion
- **Easing & Duration:** Strict physical easing (never linear). Feedback animations mapped to 150-250ms window.
- **Glow behavior:** `glow-cia` breathes (4s ease) to denote active AI analysis in the suggestions header. `glow-you` breathes softly on "In Plan" tiles. Browse grid remains static at rest.
- **Haptics:**
- - Light impact: Taps, toggling favorites, ingredient checkboxes.
- - Medium impact: FAB deployment, "Log as Meal" confirmation.
- - Success notification: Recipe successfully saved or logged.
- **Transitions:** Cards stagger fade-in/rise on mount (20ms delay per item). `FABQuickLog` translates out of view on scroll-down, returns on scroll-up.
- **Reduced-motion path:** Glow breathing becomes static alpha blend. Staggered mount becomes single 200ms cross-fade. Macro Donut arcs render fully drawn without the 1200ms clockwise sweep.

## Image Slots
- `HIFI-56-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: Recipes instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; recipe library, detail, and create states are nested nutrition modules..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast:** All text verified against `--surface-2` and `.glass-card`. Paper-100 (#FEFAF3) on `--surface-2` (#211008) exceeds WCAG AAA.; **Targets:** All interactive elements (filter chips, fav hearts, serving steppers) strictly enforce a 44x44px minimum touch target via invisible padding bounds.; **Screen-reader labels:** Glyph-only controls (Favorite heart, FAB, Search filter) include `accessibilityLabel` traits (e.g., "Add to favorites", "Create new recipe", "Open advanced filters").
