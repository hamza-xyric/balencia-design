# 28-nutrition-diet-dashboard

## 1. Header
- **Screen ID:** 28
- **Name:** Nutrition & diet dashboard
- **Route(s) covered:** `/nutrition`
- **Tab:** Today (root)
- **Source:** Functional content brief (Batch 13)
- **Batch:** 13

## 2. Purpose
Serve as the daily, actionable hub for nutrition management. It connects AI-driven meal planning, macro tracking, and water intake into a single cohesive view, ensuring the user knows exactly what to eat and how close they are to their goals. It establishes the standard for continuous health tracking, prioritizing an honest, non-shaming presentation of data.

## 3. Entry & exit
- **Entry paths:**
  - Explore [18] via stack push
  - CIA Chat [09] via deep-link stack push
  - Home Screen [12] via action card stack push
  - Life Areas Overview [16] via domain tap stack push
- **Exit paths:**
  - Meal Detail / Food Logger [29] via stack push (triggered by tapping a meal row or the `+ Log food` FAB)
  - Goals List [13] via stack push (tapping `see all` on active goals)
  - Goal Detail [14] via stack push
  - RPG Character [19] via stack push (tapping the Lv.8 badge)
  - CIA Chat [09] via tab switch (tapping the CIA coaching note)

## 4. Layout anatomy
The layout uses a vertical scroll view divided into rhythmic sections, balancing dense data with atmospheric glass.

**Regions (top-to-bottom):**
1. **Top Bar:** Transparent navigation with domain title and RPG level.
2. **CIA Insight Card:** High-level AI coaching note bridging data to action.
3. **Bento Grid (KPI Strip):** Three solid metric tiles providing fast macro context.
4. **Daily Macros Card:** The data-dense hero featuring the donut chart, progress bars, and heatmap.
5. **Water Intake Card:** Interactive tracker for hydration.
6. **Quick Actions Bar:** 1×3 grid for utility shortcuts.
7. **Today's Meals Timeline:** AI-suggested/logged meals.
8. **Active Goals Section:** Visual progress for related goals.
9. **Floating Action Button (FAB):** Global quick-log shortcut.

**ASCII Wireframe (390x844):**
```text
       [ - ]   nutrition & diet         [ Lv.8 ]
  .--------------------------------------------.
  | ◍ CIA Note                                |
  | You're 30g short on protein today.        |
  | Chicken or lentils for *dinner*?    [ > ] |
  '--------------------------------------------'
  .----------------. .----------------. 
  | CAL LEFT       | | PROTEIN        |
  | 1,450          | | 95g            |
  | ▲ vs 7-day avg | | via WHOOP      |
  '----------------' '----------------' 
  .----------------.
  | ADHERENCE      |
  | 5/7 ON TARGET  |
  '----------------'
  .--------------------------------------------.
  | DAILY MACROS                               |
  |   .----.     Carbs ████░░░░  120g / 200g   |
  |  /      \    Fat   ███░░░░░   40g / 70g    |
  | |  1450  |    Pro  ██████░░   95g / 125g   |
  |  \      /    [ M ][ T ][ W ][ T ][ F ]...  |
  |   '----'                                   |
  '--------------------------------------------'
  .--------------------------------------------.
  | WATER                            [ + ]     |
  |   ◯ 5/8 glasses                 1.2 L      |
  '--------------------------------------------'
  .----------. .----------. .----------.
  | Shopping | | Recipes  | | Trends   |
  '----------' '----------' '----------'
  TODAY'S MEALS                               ▼
  .--------------------------------------------.
  | ◯ Breakfast         [ O ] Oats & Berries   |
  |   350 kcal          ████████░░  Carbs      |
  |   9:00 AM (via you logged)                 |
  '--------------------------------------------'
  | ◯ Lunch             [ O ] Chicken Bowl     |
  |   450 kcal          █████░░░░░  Protein    |
  |   1:30 PM (via you logged)                 |
  '--------------------------------------------'

                  ( F A B [ + Log food ] )
```

## 5. Components
- **TopBar:** Transparent over atmosphere, transitions to `.glass-pill` on scroll.
- **CIAInsightCard:** Leads with meaning, carrying the `glow-cia` bottom anchor.
- **GlassStatCard (variant: metric):** Used for the 3 KPIs in the strip.
- **SolidCard:** Base for the Daily Macros card, Meals Timeline, and Water Intake.
- **ProgressRing:** The donut chart. Stroke flips green at 100%.
- **ProgressBar:** Horizontal tracks for macros. Segmented variant for the heatmap.
- **KPIRow:** Used inside meal rows for micro-stats.
- **BtnSecondary / BtnGhost:** Used for quick actions and list expansions.
- **FABQuickLog:** Orange, fixed to bottom right, auto-selects meal by time of day.
- **GlassNavBar:** Bottom floating pill (Me tab visually syncs with Today tab if accessed via Today).
- **NEW: MacroBarsGroup:** A tightly coupled cluster of `ProgressBar` components with inline labels and values. *(Rationale: The compact alignment of label, track, and value in a multi-row format needs specific vertical rhythm not natively provided by stacking base `ProgressBar` components without heavy manual overrides).*
- **NEW: MacroDonutHub:** An interactive `ProgressRing` that supports uneven multi-segment arcs for part-of-whole macro visualization. *(Rationale: The standard `ProgressRing` is single-stroke. We need a multi-arc donut that can handle tap-to-expand and partial state syncing without adding complexity to the base charting system).*

## 6. Visual treatment
- **Background atmosphere:** Base ink (`#0A0A0F`) with the mandatory warm radial glow top-center (`rgba(255,94,0,.18)` to transparent 60%) and a subtle purple pool (`#7F24FF`) behind the CIA note to anchor the AI presence. 3-4% soft-light grain overlay.
- **Glass tier per region:**
  - **TopBar:** Transparent → `.glass-pill` on scroll.
  - **CIAInsightCard:** `.glass-card` (Premium feel).
  - **KPI Strip:** `SolidCard` (`--surface-2`) for high data legibility.
  - **Daily Macros:** `SolidCard` (dense data).
  - **Water Card:** `.glass-card` (Interactive, tactile hero element).
  - **Quick Actions:** `.glass-pill`.
  - **Meals/Recent Food:** `SolidCard` (`--surface-2`).
  - **Bottom Nav / FAB:** `.glass-pill`.
- **Semantic inner-glow (one per card, meaning-driven):**
  - **CIAInsightCard:** Royal Purple (`--glow-cia`) — AI-generated insight.
  - **Calories Left Tile:** Burnt Orange (`--glow-you`) — active metric/effort.
  - **Adherence Tile:** Forest Green (`--glow-done`) — completion/positive delta.
  - **Water Intake Card:** Burnt Orange (`--glow-you`) — active effort; briefly flashes Forest Green (`--glow-done`) at 100% completion.
- **Hero type moment:** The "1,450" KPI inside the center of the donut chart. Display font (Neue Montreal Medium 52), tabular-nums.

## 7. Content & copy
All copy uses CIA voice: sentence case, no exclamations, honest, direct, second-person. One emphasis word per moment (rendered in Tiempos italic).

- **Top bar:** `Nutrition & diet` · `Lv.8`
- **CIA Note:** `You're 30g short on protein today. Chicken or lentils for *dinner*?`
- **KPI strip:** `CAL LEFT` / `PROTEIN` / `ADHERENCE`
- **Daily Macros:** `DAILY MACROS`
- **Water:** `WATER` / `glasses`
- **Quick Actions:** `Shopping list` · `Recipes` · `Trends`
- **Today's Meals:** `TODAY'S MEALS` · `BREAKFAST` · `LUNCH`
- **Empty state:** `Log a meal to see your *split*`

## 8. Data & honesty states
Every metric ships 3 states. No fabricated numbers.

**1. Calories Left (Target: 2200)**
- **Real:** `1,450` (ChipProvenance: `food log`)
- **Low-confidence:** `~1,450` (Muted + `estimated · low confidence`)
- **Honest-null:** `--` (Caption: `Log a meal to see your split`)

**2. Protein (Target: 125g)**
- **Real:** `95g` (ChipProvenance: `via WHOOP`)
- **Low-confidence:** `~95g` (Muted + `estimated · low confidence`)
- **Honest-null:** `0g` (Caption: `No food logged today`)

**3. Adherence (Target: 7/7)**
- **Real:** `5/7 ON TARGET` (Caption: `via WHOOP`)
- **Low-confidence:** `~5/7 ON TARGET` (Muted + `estimated · low confidence`)
- **Honest-null:** `0/7 ON TARGET` (Caption: `Your week fills in as you log.`)

## 9. All states
- **Default:** Established user view with partial data logged (as wireframed above).
- **Skeleton:** Depth-preserving shimmer blocks (`--surface-3` base, 1.2s sweep) for cards. Donut chart shows a radial ghost ring shimmer. Copy: `CIA is reading your nutrition — one *moment*.`
- **Empty:** Cold-start state. Donut is a ghosted ring. KPIs show honest zeros. CIA Note: `I've put together a *plan* based on your goals. Take a look.`
- **Error / Offline:** `OfflineBanner` (`offline — showing last sync 2h ago`) pinned under TopBar. Quick-log FAB dims to 0.5 opacity. Copy: `Couldn't refresh — pull *again*.`
- **Success:** Hitting 8/8 glasses triggers a brief synchronized pulse on all glasses. Macro completion triggers a quiet green flip on the `ProgressBar` (no confetti, no alarms).
- **Disabled:** Water `[+]` button dims to 0.4 opacity and ignores taps when 8/8 glasses are reached.

## 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for all entrance and interactive transitions.
- **Sequential entrance:** 150-250ms feedback. Donut arcs draw clockwise (largest to smallest), hub numbers count up using `tabular-nums`, followed by water ring filling.
- **Scroll choreography:** Below-fold elements (meal weight bars, micro-donuts, heatmap) draw on scroll-into-view.
- **FAB behavior:** Fades out on scroll down, returns on scroll up.
- **Glow behavior:** Hero CIA card features a 4s breathing glow.
- **Micro-interactions:** Tapping the Donut hub expands to show fiber/sugar/sodium (high motivation only). Adding water triggers a brief green glow (`glow-done`).
- **Haptics:** Success impact on water glass increments; warning impact (light) on macro over-target warnings.
- **Reduced-motion path:** Disable donut counting and FAB fade. Use 150ms opacity fades for all state transitions. Glow breathing is paused (static opacity).

## 11. Motivation-tier adaptation
- **Low density:** Hides KPI strip and recent food log. The CIA note converts into a simplified, plain-text goal reminder. Simplified UI focused solely on "Log Food" and "Water".
- **Medium density:** The default experience. Displays the primary 4 macros, water, and current AI meal plan.
- **High density:** Adds micro-nutrient tracking (Fiber, Sugar, Sodium) via the expanding Donut hub. Reveals optimal eating windows and weekly sparklines for each macro bar.

## 12. Accessibility
- **AA+ contrast pairs:** Paper-100 (`#FEFAF3`) on `--surface-2` (`#211008`) = 14.5:1. Orange (`#FF5E00`) on `--surface-2` = 4.8:1.
- **Targets:** Minimum 44px targets for all meal rows, buttons, FAB, and water glasses.
- **Screen-reader labels:** Glyph-only controls (e.g., `+` on water, `<` back chevron) include `aria-label`s (e.g., `Add water glass`, `Back`). Charts read as structured lists (e.g., `Calories consumed: 1450 out of 2200. Protein: 95 grams.`).

## 13. Premium checklist
- [x] **Connects:** CIA reads macro gaps to proactively suggest meals; RPG level deep-links; bidirectional goals sync.
- [x] **Honest:** Every metric has an explicit real/low-confidence/honest-null state. No fake data.
- [x] **Premium:** Tight typography, selective glass tiers over warm dark, physical motion, semantic glows.
- [x] **Canon compliant (60/30/10):** Burnt Orange primary, Forest Green completion, Royal Purple CIA only.
- [x] **Selective glass:** Dense data uses `SolidCard`; hero/CIA/Water use `.glass-card`.
- [x] **Semantic inner-glow:** Correct colors mapped to meaning (`glow-you`, `glow-done`, `glow-cia`).
- [x] **One hero type moment:** Donut center value uses Display NM Medium 52.
- [x] **Tiempos italic emphasis:** One word max per moment (e.g., *dinner*).
- [x] **CIA voice:** No exclamations, direct, honest, never blames the user.
- [x] **Honest empty states:** "Your week fills in as you log" (not a dead end or error code).
- [x] **Data viz rules:** Past = solid orange, projected = dashed purple, milestones = green.
- [x] **Icons:** 2px rounded outline, domain colors (Nutrition = `#84cc16`).
- [x] **A11y floor:** AA+ contrast, 44px targets, screen-reader labels, reduced-motion path.
