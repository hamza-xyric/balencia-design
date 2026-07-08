# 28-nutrition-diet-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 28
- **Source spec:** `Balencia-New-Screens/screens/28-nutrition-diet-dashboard.md`
- **Evidence:** screens/28-nutrition-diet-dashboard.md, work/briefs/28.md, work/drafts/28.md, Functional content brief (Batch 13)
- **Route(s):** `/nutrition`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serve as the daily, actionable hub for nutrition management.
- **Premium Visual Director:** make Nutrition & diet dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Nutrition & diet dashboard names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[ - ]   nutrition & diet         [ Lv.8 ]
  .--------------------------------------------.
  | o CIA Note                                |
  | You're 30g short on protein today.        |
  | Chicken or lentils for *dinner*?    [ > ] |
  '--------------------------------------------'
  .----------------. .----------------.
  | CAL LEFT       | | PROTEIN        |
  | 1,450          | | 95g            |
  |  vs 7-day avg | | via food log   |
  '----------------' '----------------'
  .----------------.
  | ADHERENCE      |
  | 5/7 ON TARGET  |
  '----------------'
  .--------------------------------------------.
  | DAILY MACROS                               |
  |   .----.     Carbs ########  120g / 200g   |
  |  /      \    Fat   ########   40g / 70g    |
  | |  1450  |    Pro  ########   95g / 125g   |
  |  \      /    [ M ][ T ][ W ][ T ][ F ]...  |
  |   '----'                                   |
  '--------------------------------------------'
  .--------------------------------------------.
  | WATER                            [ + ]     |
  |   o 5/8 glasses                 1.2 L      |
  '--------------------------------------------'
  .----------. .----------. .----------.
  | Shopping | | Recipes  | | Trends   |
  '----------' '----------' '----------'
  TODAY'S MEALS
  .--------------------------------------------.
  | o Breakfast         [ O ] Oats & Berries   |
  |   350 kcal          ##########  Carbs      |
  |   9:00 AM (via you logged)                 |
  '--------------------------------------------'
  | o Lunch             [ O ] Chicken Bowl     |
  |   450 kcal          ##########  Protein    |
  |   1:30 PM (via you logged)                 |
  '--------------------------------------------'

                  ( F A B [ + Log food ] )

Route handling: `/nutrition`
```

## Focal Hierarchy
- **Dominant focal moment:** Nutrition & diet dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Top Bar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA Insight Card, Bento Grid, Daily Macros Card, Water Intake Card.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is the default for this pass: warm-light nutrition dashboard, compact macro cards, green nutrition/completion language, orange active tabs/actions, and purple only for CIA/projection cards.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium analytical variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** `Nutrition` plus tabs `Analytics`, `Plan`, `Recipes`, `History`, `Today`.
- **Evidence tier / canon exception:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session; alignment comes from supplied mock/reference screens plus local prompt/ledger evidence. The warm-light Figma-derived nutrition dashboard is a scoped exception, not a replacement for glass-dark v1 canon. CIA naming, data honesty, and glass-redesign rules remain binding.
- **Shell/anatomy:** Figma nutrition screens use a warm-light dashboard: top back chevron, centered title `Nutrition`, add/refresh action, macro stat cards with sparklines (`Calories`, `Protein`, `Carbas` as visible typo; canonical copy should use `Carbs`), and a segmented tab rail with active orange pill.
- **Tab mapping:** `Analytics` = today's meals, hydration, and first-meal empty state; `Plan` = diet plan empty state plus `Create Manual Plan` and an AI-powered plan card; `Recipes` = category chips and recipe empty state plus `Create First Recipe`; `History` = meal-history calendar with orange selected day and AI plan card; `Today` = range selector and daily nutrition trend chart.
- **Visual mode note:** use green-tinted nutrition artwork/cards from Figma for nutrition imagery and completion states. Purple only appears on AI-powered cards or trend projections, never as the dominant nutrition color.

## Components
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

## Data Honesty
- Every metric ships 3 states. No fabricated numbers.
- **1. Calories Left (Target: 2200)**
- **Real:** `1,450` (ChipProvenance: `food log`)
- **Low-confidence:** `~1,450` (Muted + `estimated  low confidence`)
- **Honest-null:** `--` (Caption: `Log a meal to see your split`)
- **2. Protein (Target: 125g)**
- **Real:** `95g` (ChipProvenance: `via food log`; recipe DB or Health nutrition source when imported)
- **Low-confidence:** `~95g` (Muted + `estimated  low confidence`)
- **Honest-null:** `0g` (Caption: `No food logged today`)
- **3. Adherence (Target: 7/7)**
- **Real:** `5/7 on target` + source `food log`.
- **Low-confidence:** `~5/7` muted + `estimated · low confidence` when targets or logs are incomplete.
- **Honest-null:** `No target yet` + `Set nutrition target` ghost action.
- **Allergy/dietary restrictions:** real = stored user preference or explicit entry; low-confidence = parsed from text and awaiting confirmation; honest-null = `No restrictions added` with edit action.

## Consent and Safety
- Macro/source chips and the add/log flow open nutrition data controls: source, database, freshness, retention, export, revoke imported nutrition data, delete food logs, and edit allergies/dietary restrictions.
- CIA meal advice is bounded as coaching support, not medical nutrition advice; allergy/restriction warnings outrank CIA suggestions and must be shown before recipe or meal recommendations.
- Keep navigation targets aligned to `/nutrition`. Do not add alternate vanity routes.

## States
- **Default:** Established user view with partial data logged (as wireframed above).
- **Skeleton:** Depth-preserving shimmer blocks (`--surface-3` base, 1.2s sweep) for cards. Donut chart shows a radial ghost ring shimmer. Copy: `CIA is reading your nutrition - one *moment*.`
- **Empty:** Cold-start state. Donut is a ghosted ring. KPIs show honest zeros. CIA Note: `I've put together a *plan* based on your goals. Take a look.`
- **Error / Offline:** `OfflineBanner` (`offline - showing last sync 2h ago`) pinned under TopBar. Quick-log FAB dims to 0.5 opacity. Copy: `Couldn't refresh - pull *again*.`
- **Success:** Hitting 8/8 glasses triggers a brief synchronized pulse on all glasses. Macro completion triggers a quiet green flip on the `ProgressBar` (no confetti, no alarms).
- **Disabled:** Water `[+]` button dims to 0.4 opacity and ignores taps when 8/8 glasses are reached.
- **Tab states:** every nutrition tab has a named empty state matching Figma's friendly center illustration pattern. Empty `Analytics` says no meals today and offers `Log your first meal`; empty `Plan` offers `Create manual plan`; empty `Recipes` offers `Create first recipe`; empty `History` keeps the month grid visible with no invented meal rows; empty `Today` keeps the trend chart honest-null with a prompt to log data.

## Motion
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for all entrance and interactive transitions.
- **Sequential entrance:** 150-250ms feedback. Donut arcs draw clockwise (largest to smallest), hub numbers count up using `tabular-nums`, followed by water ring filling.
- **Scroll choreography:** Below-fold elements (meal weight bars, micro-donuts, heatmap) draw on scroll-into-view.
- **FAB behavior:** Fades out on scroll down, returns on scroll up.
- **Glow behavior:** Hero CIA card features a 4s breathing glow.
- **Micro-interactions:** Tapping the Donut hub expands to show fiber/sugar/sodium (high motivation only). Adding water triggers a brief green glow (`glow-done`).
- **Haptics:** Success impact on water glass increments; warning impact (light) on macro over-target warnings.
- **Reduced-motion path:** Disable donut counting and FAB fade. Use 150ms opacity fades for all state transitions. Glow breathing is paused (static opacity).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/nutrition`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text, muted helper copy, orange CTA/tab states, and green nutrition completion states must be checked in the warm-light shell for the Figma default; dark-theme contrast checks apply only to the optional premium variant.; **Targets:** Minimum 44px targets for all meal rows, buttons, FAB, and water glasses.; **Screen-reader labels:** Glyph-only controls (e.g., `+` on water, `<` back chevron) include `aria-label`s (e.g., `Add water glass`, `Back`). Charts read as structured lists (e.g., `Calories consumed: 1450 out of 2200. Protein: 95 grams via food log.`).
