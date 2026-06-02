# Screen Design: Nutrition & Diet Dashboard

**Screen**: 28 of 73
**File**: 28-nutrition-diet-dashboard.md
**Register**: Product Mode
**Primary action**: log food
**Tab**: Me (accessed via Explore section or SIA deep-link)
**Navigation**: Stack depth 2-3 from Me tab root (Me → Explore → Nutrition Dashboard). Also reachable via SIA deep-link or Home action card.

---

## Purpose

The Nutrition & Diet Dashboard is the user's hub for daily nutrition management. It surfaces SIA's AI-suggested meal plan, tracks macro intake against targets, monitors water consumption, and provides quick access to food logging. This screen follows the **Domain Dashboard Template** established by Screen 26 (Fitness Dashboard), confirming the template works for a second domain with different data types (continuous tracking vs. discrete events).

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. SIA's coaching note — macro-gap advice or meal suggestion
2. Today's meal plan — AI-suggested meals for each mealtime
3. Daily macros progress — calories, protein, carbs, fat toward targets (with adaptive calorie adjustments)
4. Water intake tracker — visual glass counter with inline incrementing
5. Quick actions bar — shopping list, recipes, nutrition insights
6. Active nutrition goals with progress
7. Recent food log entries
8. "Log food" FAB for quick food logging

**User flow**:
- **Arrives from**: Explore Section [18] via stack push, SIA Chat [09] via deep-link stack push, Home Screen [12] via action card stack push, Life Areas Overview [16] via domain tap stack push
- **Primary exit**: Screen 29 (Meal Detail / Food Logger) via stack push — triggered by tapping a meal row (meal view mode) or FAB (food logging mode)
- **Secondary exits**: Goals List [13] via stack push (pre-filtered to nutrition), SIA Chat [09] via tab switch (tapping SIA note card)

---

## Layout

**Scroll behavior**: ScrollView (content exceeds viewport on all device sizes)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│         Status Bar (44pt)       │
├─────────────────────────────────┤
│  ←  ┃ Nutrition & diet     Lv.8│  56pt — Domain Dashboard Header
│      ┃ (lime accent line)       │  FIXED, sticky on scroll
├─────────────────────────────────┤
│                                 │  SCROLLABLE from here
│  ┌─────────────────────────────┐│
│  │ ● SIA says:                 ││  72pt — SIA Coaching Note
│  │ "You're 30g short on       ││
│  │  protein today. Chicken or  ││
│  │  lentils for dinner?"       ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ TODAY'S MEALS                ││  ~280pt — Primary Content Card
│  │                              ││
│  │  BREAKFAST                   ││  meal type eyebrow (lime)
│  │  Oatmeal with berries       ││  meal name
│  │  350 cal · 12g P · 55g C    ││  macro badges
│  │  ───────────────────────── ││
│  │  LUNCH                       ││
│  │  Chicken salad wrap          ││
│  │  520 cal · 35g P · 40g C    ││
│  │  ───────────────────────── ││
│  │  DINNER                      ││
│  │  Grilled salmon + vegetables ││
│  │  480 cal · 42g P · 20g C    ││
│  │  ───────────────────────── ││
│  │  SNACKS                      ││
│  │  Greek yogurt, almonds       ││
│  │  250 cal · 18g P · 15g C    ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ DAILY MACROS                 ││  ~180pt — Macro Tracking Card
│  │                              ││
│  │  Calories                    ││
│  │  ████████████░░░░  1600      ││  progress bar
│  │  1600 / 2200                 ││
│  │                              ││
│  │  Protein                     ││
│  │  █████████░░░░░░    77g      ││
│  │  77 / 120g                   ││
│  │                              ││
│  │  Carbs                       ││
│  │  ██████████░░░░    130g      ││
│  │  130 / 180g                  ││
│  │                              ││
│  │  Fat                         ││
│  │  ██████████░░░      53g      ││
│  │  53 / 70g                    ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ WATER                        ││  ~80pt — Water Intake Card
│  │                              ││
│  │  ●  ●  ●  ●  ●  ○  ○  ○   ││  visual glass icons
│  │  5 / 8 glasses          [+] ││  count + add button
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ ┌────────┐┌────────┐┌─────┐││  ~64pt — Quick Actions Bar
│  │ │ 🛒     ││ 📖     ││ 📊  │││
│  │ │Shopping││Recipes ││Trends│││  3 action cards, horizontal
│  │ │  list  ││        ││      │││
│  │ └────────┘└────────┘└─────┘││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ Active goals        see all ││  ~80pt — Goals Section
│  │                              ││
│  │ ████████████░░  Lose 5kg    ││  goal + progress
│  │ 70%                          ││
│  └─────────────────────────────┘│
│          16pt gap               │
│  ┌─────────────────────────────┐│
│  │ Recent food log     see all ││  ~100pt — Recent Log
│  │                              ││
│  │ Chicken salad wrap   520 cal ││
│  │ Oatmeal with berries 350 cal││
│  └─────────────────────────────┘│
│                                 │
│          64pt bottom padding    │
│                                 │
│       ┌────────────────┐        │  FAB, floating, z-40
│       │   + Log food    │        │  48pt, above tab bar
│       └────────────────┘        │
├─────────────────────────────────┤
│  Today  │  SIA  │ Goals │  Me  │  Tab Bar (56pt + 34pt)
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar** — 44pt
   - Purpose: system status
   - Content: transparent

2. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: screen identification, back navigation, RPG level display
   - Content: back chevron (left), "Nutrition & diet" title with 2pt lime (#84CC16) accent line underneath, "Lv.8" RPG badge (right)
   - Sticky on scroll with backdrop-blur (z-30)

3. **SIA Coaching Note Card** — 72pt (variable: min 56pt, max 96pt)
   - Purpose: AI coaching voice — macro-gap advice or meal suggestions
   - Content: purple dot + contextual SIA message
   - 16pt top margin

4. **Today's Meals Card** — ~280pt
   - Purpose: primary content — AI-suggested meal plan for today
   - Content: 4 meal rows (Breakfast, Lunch, Dinner, Snacks) each with type label, meal name, macro badges
   - 16pt top margin

5. **Daily Macros Card** — ~180pt
   - Purpose: macro intake tracking toward daily targets
   - Content: 4 Macro Progress Bars (Calories, Protein, Carbs, Fat)
   - 16pt top margin

6. **Water Intake Card** — ~80pt
   - Purpose: daily water consumption tracking with inline editing
   - Content: visual glass icons (filled/empty) + count + [+] button
   - 16pt top margin

7. **Quick Actions Bar** — ~64pt
   - Purpose: quick access to nutrition utilities — shopping list, recipe browser, nutrition trends
   - Content: 3 tappable action cards in a horizontal row with 12pt gaps
     - **Shopping list**: icon + "Shopping list" — auto-generated from meal plan, user-editable. Stack push to shopping list screen.
     - **Recipes**: icon + "Recipes" — SIA-suggested recipes based on goals and preferences. Stack push to recipe browser.
     - **Trends**: icon + "Trends" — weekly/monthly nutrition trends and adherence patterns. Stack push to nutrition insights screen.
   - Each card: ink-brown-800 bg, --r-lg (20pt) corners, 1pt white 5% border, icon (20pt, nutrition-lime) centered above label (12pt Sora Semibold, white at 70%). Size: (screen width - 32pt - 24pt gaps) / 3 × 64pt.
   - 16pt top margin

9. **Active Goals Section** — ~80pt
   - Purpose: domain-filtered nutrition goals
   - Content: section heading + 1 goal row with progress bar
   - 16pt top margin

10. **Recent Food Log** — ~100pt
    - Purpose: quick view of recently logged food items
    - Content: section heading + 2-3 log entry rows
    - 16pt top margin

11. **Bottom Padding** — 64pt
    - Purpose: clears FAB and tab bar

12. **FAB (Log food)** — 48pt height, floating
    - Purpose: quick access to food logging
    - Content: "+ Log food" text
    - Positioned 16pt above tab bar, centered, z-40

13. **Tab Bar** — 56pt + 34pt safe area
    - Content: Today | SIA | Goals | Me (Me active)

---

## Components

### Domain Dashboard Header
- **Purpose**: screen identification with domain branding and RPG integration
- **Data source**: user's nutrition skill level from RPG system
- **Visual treatment**: fixed bar, ink-900 background, no card styling
- **Size**: full-width × 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44×44pt touch target, 16pt from left edge
  - Title: "Nutrition & diet", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #84CC16 (nutrition lime), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.8", 13pt Sora Semibold, #84CC16 text, background #84CC16 at 15% opacity, r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: back button pops stack; RPG badge taps push to RPG Character [19]
- **Follows**: Domain Dashboard Header pattern established in Screen 26

### SIA Coaching Note Card
- **Purpose**: contextual AI coaching focused on nutritional guidance
- **Data source**: AI-generated based on macro tracking, meal plan adherence, nutritional patterns
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), r-xl (28pt)
- **Size**: full-width minus 32pt (16pt margins) × 72pt (variable)
- **Sub-elements**: purple dot (6pt, #7F24FF) + message text (15pt Sora Regular, white, max 3 lines)
- **Variants**:
  - Behind on macros: "You're 30g short on protein today. Chicken or lentils for dinner?"
  - On track: "You've hit your protein target two days running. The consistency shows."
  - Day 1: "I've put together a meal plan based on your goals. Take a look."
  - Post-meal: "That lunch was 35g of protein — right on target."
- **Gestures**: tap entire card → SIA Chat [09] with nutrition context
- **Follows**: SIA Coaching Note Card pattern established in Screen 26

### Today's Meals Card
- **Purpose**: the primary AI-generated content — suggested meals for today
- **Data source**: AI meal planning engine based on goals, macro targets, food preferences, history
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~280pt
- **Sub-elements** (4 meal rows, ~60pt each with separator):
  - Meal type label: 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking ("BREAKFAST", "LUNCH", "DINNER", "SNACKS")
  - Meal name: 16pt Sora Semibold, white, 4pt below label
  - Macro badges: 12pt Sora Regular, white at 50%, inline, 4pt below name. Format: "350 cal · 12g P · 55g C · 8g F"
  - Separator: 1pt line, white at 10%, full card content width, 12pt below badges (not on last row)
- **Variants**:
  - Populated: all 4 meals with suggestions
  - Partially logged: logged meals show checkmark (green) left of meal type label, macros update to reflect actual intake
  - Day 1: SIA-generated starter plan with note "Adjust any meal to your taste"
  - No plan: "Tell SIA what you like to eat" with text link to SIA Chat
  - Loading: skeleton shimmer on all rows
- **Gestures**: tap any meal row → stack push to Screen 29 (Meal View mode for that meal)

### Daily Macros Card
- **Purpose**: visual tracking of macro intake against daily targets
- **Data source**: aggregated food log data vs. calculated targets
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~180pt
- **Sub-elements** (4 Macro Progress Bars, ~36pt each with 8pt gaps):
  - Each bar:
    - Label: 15pt Sora Regular, white, left-aligned ("Calories", "Protein", "Carbs", "Fat")
    - Current value: 15pt Sora Semibold, white, right-aligned on same line as label
    - Bar track: full card content width, 8pt height, white at 8% opacity, r-pill
    - Bar fill: r-pill. Width = (current / target) × 100%.
      - Calories bar: Burnt Orange (#FF5E00) fill — the single primary metric / data ink
      - Protein/Carbs/Fat bars: white at 40% fill (neutral secondary; nutrition-lime is identity-only and is never used as a bar fill)
    - Target text: "X / Yg" (or "X / Y" for calories) in 12pt Sora Regular, white at 40%, left-aligned below bar, 2pt below
  - Bars animate on mount: width from 0% to current%, 280ms, ease-out-soft
- **Variants**:
  - Normal: bars partially filled
  - Target exceeded: bar fill caps at 100%, fill color changes to a calm caution amber #F59E0B (for any excess, mild or significant) plus a visible "over" label — never alarm-red #EF4444, since over-target is a benign level, not a danger/alert state
  - Day 1: all bars at 0%, targets shown
  - Loading: skeleton shimmer on bars
- **Gestures**: tap card → no action (informational; tapping individual bars is too small a target). Long-press → option to adjust targets (future feature, no-op for now).

### Water Intake Card
- **Purpose**: daily water consumption tracking with inline editing
- **Data source**: water intake log for today
- **Visual treatment**: ink-brown-800 card with glassmorphism, r-xl (28pt), 24pt internal padding
- **Size**: full-width minus 32pt × ~80pt
- **Sub-elements**:
  - Eyebrow: "WATER", 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Glass icons row: 8 glass icons in a horizontal row, evenly spaced
    - Filled glass: 24pt circle, white fill at 80%, subtle inner shadow
    - Empty glass: 24pt circle, white at 15% fill, 1pt dashed white at 20% border
    - Each glass has a 44×44pt touch target (overlapping allowed for the row)
  - Count text: "5 / 8 glasses" in 13pt Sora Regular, white at 50%, left-aligned below icons, 8pt below
  - [+] button: 32pt circle, ink-900 background, 1pt white at 10% border, white "+" icon (16pt), right-aligned on same line as count. 44×44pt touch target.
- **Interaction**:
  - Tap [+]: adds one glass. Next empty glass fills left-to-right with a scale-in animation (0.8→1.0, 160ms). Count updates. Medium haptic.
  - Newly filled glass gets a brief green (#34A853) glow ring (280ms, fades out).
  - Long-press on a filled glass: unfills it (confirmation via error haptic). Glass shrinks briefly (scale 0.8, 160ms) then returns to empty state.
  - All 8 glasses filled: all glass icons pulse with green glow simultaneously (600ms). "+25 XP" micro-toast appears at top of screen. Success haptic.
  - Cannot exceed 8 via [+] button — button becomes disabled (0.4 opacity) when all filled.
- **Variants**:
  - Day 1: all empty, count shows "0 / 8 glasses"
  - All filled: all glasses solid, [+] disabled, count shows "8 / 8 glasses" in green (#34A853)
- **Gestures**: tap [+] adds glass; long-press filled glass removes it

### Active Goals Section
- **Purpose**: domain-filtered nutrition goals with progress
- **Data source**: user's goals filtered to Nutrition domain
- **Visual treatment**: section heading row + goal rows
- **Size**: full-width × ~80pt (1 goal shown by default)
- **Sub-elements**:
  - Section heading row: "Active goals" (18pt Sora Semibold, white) + "see all" (13pt Sora Regular, Burnt Orange). 32pt height.
  - Goal row: same spec as Screen 26 (ink-brown-800 card, r-md, progress bar, goal name, percentage, domain tag chip in #84CC16 lime)
- **Variants**: same as Screen 26 (populated, no goals, loading)
- **Gestures**: tap goal row → Goal Detail [14]; tap "see all" → Goals List [13] filtered to nutrition
- **Follows**: Active Goals Section pattern from Screen 26

### Recent Food Log
- **Purpose**: quick view of recently logged food items
- **Data source**: food log entries for today, sorted by most recent
- **Visual treatment**: section heading row + compact list rows in ink-brown-800 card
- **Size**: full-width × ~100pt
- **Sub-elements**:
  - Section heading row: "Recent food log" + "see all". 32pt height.
  - Log entry rows (2-3 visible): r-md card, 16pt padding
    - Food name: 15pt Sora Regular, white, left-aligned
    - Calories: 15pt Sora Semibold, white at 50%, right-aligned
    - Row height: ~36pt
    - Separator: 1pt, white at 10% between rows
- **Variants**:
  - Populated: 2-3 recent entries shown
  - Empty (day 1 or morning before logging): "No food logged today" in 15pt Regular, white at 50%, centered
  - Loading: skeleton shimmer
- **Gestures**: tap entry → stack push to Screen 29 (Meal View for that logged item); tap "see all" → expanded food log list

### FAB (Log Food)
- **Purpose**: quick access to food logging
- **Data source**: N/A (navigational)
- **Visual treatment**: floating button above tab bar, glassmorphism
- **Size**: 48pt height × auto-width (padding 24pt horizontal)
- **Sub-elements**: "+" icon (16pt, white) + "Log food" label (15pt Sora Semibold, white), 8pt gap
- **Variants**: N/A
- **Gestures**: tap → stack push to Screen 29 (Food Logging mode, meal type auto-selected by time of day)
- **Scroll behavior**: fades out on scroll down, fades back in on scroll up/stop (same as Screen 26)
- **Follows**: FAB pattern established in Screen 26

---

## Visualization

> Source: `app_design 3/28-nutrition-diet-dashboard-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 4 (Domain dashboards), findings `S28-V01..V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen mints `VK-007` Donut / Pie** (returned in the kit). Premium-depth, on-brand (60/30/10); no new data — every visual derives from data the screen already shows (macros, meals, water, food log). **Current grade D (54) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; benchmark = MyFitnessPal premium / Cronometer + Bevel. Residual gap to A+++ is build-verified depth + working scrub/drill micro-interactions, owned by the later viz-build program.)*

The Nutrition dashboard's job is unchanged; this section upgrades *how its data reads* — from four flat white bars + a row of dot-glasses + text rows into a crafted, calm macro instrument. The defining move is the **Macro Donut hero** (the honest part-of-whole no flat bar can show: how today's calories actually split across protein / carbs / fat), plus a KPI strip, vs-target MacroBars with depth, the wellbeing water ring, and a 7-day intake CalendarHeatmap. This is **Cronometer's density done warmly** — not a clone: the donut runs the brand's orange-dominant slice law and warm-glow depth, not Cronometer's clinical multi-colour wheel.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive / resolution |
|---|---|---|---|
| Calories 1600 / 2200 + protein/carbs/fat totals | 4 flat bars (3 are white/40) | **KPI strip** (calories remaining + macro headline) **and** the macro **donut** | `KPIStatTile` ×3 (`S28-V01`) + `Donut` (`S28-V02`) |
| Macro split protein 77g / carbs 130g / fat 53g | implied across bars | **Macro Donut** — honest part-of-whole of today's logged macros (by calorie share), orange = primary slice | `Donut` (`VK-007`, `S28-V02`) |
| Each macro current vs target (P 77/120, C 130/180, F 53/70, Cal 1600/2200) | flat bars, white fill | **MacroBar group with depth** — orange calories + domain-lime macro fills, in-range/over signs | `MacroBar` ×4 (`S28-V03`) |
| Water 5 / 8 glasses | dot row + count | **Water intake ring** (two-shades-of-blue wellbeing exception) | `GaugeRing` (water/wellbeing mode) (`S28-V04`) |
| 7-day calorie / target-adherence history | not shown | **Intake CalendarHeatmap** — consistency of hitting target | `CalendarHeatmap` (`S28-V05`) |
| 4 meals (cal · P · C · F · time) | text rows | **Meal timeline** — per-meal calorie weight + macro mini-split + logged sign | `MealCard` row, depth + per-meal micro-donut (`S28-V06`) |
| SIA note / goal % / food-log names | text / one bar | — (deliberately textual / existing `MacroBar`) | — |

### 1 · KPI strip — `S28-V01`

A **three-tile `KPIStatTile` row directly under the SIA Coaching Note**, above the meal card — the headline numbers the user wants in <2s, with **honest, disclosed-window** deltas (never cherry-picked):
- **Tile 1 — Calories remaining:** `600` (`text-h2`) / label `CAL LEFT` / no delta (a today-scalar). Turns `--color-forest-green` when within target band, `#F59E0B` if over (a **visible** colour *plus* the "over" word — never colour alone).
- **Tile 2 — Protein:** `77g` / label `PROTEIN` / delta `▲ vs 7-day avg` from a fixed 7-day window (`--color-forest-green` ▲ / `--color-alpha-white-40` ▼).
- **Tile 3 — Adherence:** `5/7 days on target` / label `ON TARGET` / no delta.
- **Depth (token-backed):** tiles sit on `ink-brown-800` with a top-edge highlight; the active number carries no glow (KPI tiles are inline-scale, `--glow-*` reserved for ≥48px gauges per the size rule). Label uppercase `--color-alpha-white-40`, +0.12em.
- **Motion:** numbers **count up** (`--dur-base` 280ms, `--ease-out-soft`).
- **Data:** `nutritionDashboard.macros` (calories left = target − current; protein current; adherence derived). **No new data** beyond a 7-day adherence array (`S28-V05` shares it).
- **States:** Day-1 → tiles read `2200 CAL LEFT`, `0g PROTEIN`, `0/7 ON TARGET` (real zeros, framed as "fresh start," never a red verdict). Loading → number skeletons that count up on resolve.
- (`KPIStatTile`; VK-008.)

### 2 · Macro Donut (hero) — `S28-V02`  ·  mints `VK-007`

The screen's **focal visualization**, placed at the **top of the Daily Macros card** (the card becomes "donut left, MacroBars right" on ≥390px, donut-above-bars stacked below). This is the honest part-of-whole that four parallel bars structurally cannot show: **how today's logged calories actually split** across the three macros — the exact view Cronometer/MyFitnessPal lead with, rendered the Balencia way.
- **Composition:** a `Donut` (`VK-007`) ~140px, slices = **protein / carbs / fat by calorie contribution** (P 77g×4 = 308 cal · C 130g×4 = 520 cal · F 53g×9 = 477 cal → **24% / 40% / 37%** of 1305 logged cal (the donut renders exact arc shares; the rounded figures total ~101% from rounding, never a padded or arbitrary total) — an **honest whole** whose slices are the true logged-calorie shares). **Largest/primary slice = orange `--color-brand-orange`**; the other two = neutral warm tints (`--color-alpha-white-40`, `--color-alpha-white-20`) — domain-lime is reserved for chrome/identity, never split across slices (would read as four domains). Center hub = `1305 cal` logged (`text-h2`) over `of 2200` (`white/40`).
  > *Component reality:* **no Donut/Pie component exists** in the prototype — this card mints **`VK-007`** (returned in this batch's kit block: SVG arc, 2px gaps, rounded slice caps, honest-whole assertion, brand slice law, a11y legend, states, draw-on-enter motion). Until built, the spec references it by name.
- **Depth (token-backed):** slice strokes use the flat brand/neutral fills with a faint `--glow-orange-sm` **(mint)** on the orange primary slice only (≥48px, calibrated — **not** the full 32px `--glow-orange`, which would swamp a 140px donut at this stroke); 2px inter-slice gap reveals the `ink-brown-800` surface for carved separation; faint radial backplate behind the ring; rounded slice caps (round-join, §8).
- **Motion:** the donut **draws itself** — each arc sweeps in clockwise from 12 o'clock via `stroke-dashoffset` (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`), primary (orange) slice first, then carbs, then fat (largest→smallest); hub counts up 520ms. **Never opacity-fades** (§8). Draws **first** in the card, before the MacroBars rise (see Motion choreography).
- **Honesty (RUBRIC dim 5):** slices sum to a **true whole** (the 1305 logged calories, *not* the 2200 target — labelling "of 2200" in the hub keeps the gap honest without a fake slice); a macro at 0g is **absent**, not a zero-width wedge; the donut shows *composition*, the MacroBars show *vs-target* — two honest questions, not a redundant pair.
- **Micro-interaction:** tap a slice → that macro's MacroBar pulses + a tooltip shows grams + % + calories; tap the hub → expand to a fiber/sugar/sodium breakdown (high-motivation tier). 44×44 tap targets via invisible slice hit-wedges.
- **Data:** `nutritionDashboard.macros` (current grams per macro; calorie factors 4/4/9 are constants, not new data).
- **States:** **Day-1 / nothing logged** → a **ghosted full-ring outline** with hub "Log a meal to see your split" — **never** a collapsed/empty disc or a misleading 100%-of-one-macro ring; **partial** (1 macro logged) → the logged slice + ghosted remainder arc (no-data ≠ 0); **loading** → ring skeleton that draws into the real arcs; **over-target** → hub number turns caution-amber `#F59E0B` (never alarm-red) with the word "over" (visible sign, not colour-alone) — a calm cue, never an alert.
- **Non-shaming:** framed as "your plate today," not a verdict; an unbalanced split reads as information, never "you failed your macros."

### 3 · Daily Macros → MacroBar group with depth — `S28-V03`

Keep the four `MacroBar`s (they answer *vs-target*, the donut answers *composition*) but upgrade them from flat fills to the locked `MacroBar` spec with a **visible status sign**:
- **Calories** = orange `--color-brand-orange` fill (the primary metric, 60%) — the single data-ink hue. **Protein / Carbs / Fat** = warm neutral `--color-alpha-white-40` fills (the deployed `MacroBar` `muted` tone), reading as legible secondary metrics on the `ink-brown-800` surface — **not** domain-lime, which stays identity-only (header accent + RPG badge) and is never used as data ink (domain colours = identity, per CONSISTENCY §2; the lone data exception is a domain's own consistency heatmap, not these bars). Track `--color-alpha-white-08`, 8px, radius-pill.
- **Status sign (never colour alone):** an in-range bar shows a `--color-forest-green` ✓ glyph at the value; an over-target bar (>100%) caps the fill at 100% and switches to a calm caution amber `#F59E0B` (used for *both* mild and significant excess — **no alarm-red**, since over-eating a macro is a benign level, not a danger state) **plus a visible "over" label** — satisfying 1.4.11 and colour-blind users, and keeping the non-shaming frame (information, never an alert/verdict).
- **Honest scale:** all four share a 0→target baseline; the over-target case is shown by colour+label+capped fill, never by a bar overflowing its track.
- **Motion:** bars rise 0→% (`--dur-slow` 520ms `--ease-flow`) **after** the donut draws.
- **Data:** `nutritionDashboard.macros` (unchanged). **States:** Day-1 → all bars at 0% with targets visible + "Log your first meal to see progress"; loading → skeleton bars that rise on resolve.
- (`MacroBar`; ready — deployed component, depth/sign upgrade only.)

### 4 · Water intake ring — `S28-V04`

Replace the 8-dot glass row with the **`GaugeRing` in water/wellbeing mode** (the sanctioned **two-shades-of-blue** exception, §11) — a real progress ring, not a flat dot count: `5 / 8` in the hub, ring filled to 62.5% in `--color-domain-wellbeing` over a lighter wellbeing track, arriving `--color-forest-green` at 8/8 with a glow pulse + "+25 XP". The existing `WaterIntakeRing` (200px) is the home for this; it adopts the `GaugeRing` depth language (inset track, size-calibrated glow at ≥96px) but keeps its wellbeing-blue identity and inline [+]/long-press decrement interaction.
- **Depth:** `--track-inset` **(mint)** recessed track; `--glow-green` only on the 8/8 arrival pulse (already in `globals.css`); the wellbeing-blue ring carries `--glow-orange-md`-scale glow recoloured to wellbeing at the 200px hero size.
- **a11y:** the count is a **text equivalent** ("5 of 8 glasses"); arrival uses the green glow **plus** the "+25 XP" / "Target reached" copy — never colour alone. [+] is 44×44 (carries B10-F12); long-press decrement has an undo affordance.
- **States:** Day-1 → empty ring `0 / 8` (ghosted, not a red "fail"); per the existing Water Intake Card spec.
- **Non-shaming:** an unfilled ring reads as "room to hydrate," never a deficit verdict.
- (`GaugeRing` water mode / `WaterIntakeRing`; VK-002.)

### 5 · Intake consistency CalendarHeatmap — `S28-V05`

A **new 7-day (1-week) `CalendarHeatmap`** inside (or just below) the Daily Macros card: intensity = **how close that day landed to its calorie/macro target** (5 steps: missed → under → on-target → over). This is the consistency signal MyFitnessPal premium surfaces — "are you *consistently* on plan," not just today. Reuses the deployed `CalendarHeatmap` (5 intensity steps `--color-alpha-white-05` → full `--color-brand-orange`; today = dashed border; tap = `scale-110`).
- **Honesty:** a **no-log day is a distinct ghosted cell** (`bg-alpha-white-03`, the component's `future`/empty tone), **not** a "0 = you ate nothing" worst-intensity cell — no-data ≠ a real zero.
- **Non-shaming:** framed as a streak of *attention*, not a punishment grid; a missed day is neutral-ghosted, never red.
- **Data:** a 7-element adherence array (shared with `S28-V01` tile 3) — the only added fixture field; derivable from food-log history the app already stores.
- **States:** Day-1 → all cells ghosted with "Your week fills in as you log."; loading → cells shimmer in.
- (`CalendarHeatmap`; ready — reuse.)

### 6 · Meal timeline depth + per-meal micro-split — `S28-V06`

The four meal rows stay, but each gains a **calorie-weight bar** and an optional **micro-donut** so the meal list reads as a timeline, not flat text:
- A thin (4px) `--color-brand-orange` **calorie-weight bar** under each meal's macro badges, width = that meal's share of the day's calories (breakfast 350/1600 ≈ 22%, etc.) — an at-a-glance "how big was this meal."
- A 24px **micro-`Donut`** (same `VK-007` primitive, no hub, no glow) at the row's right edge showing that meal's P/C/F split — reinforcing the hero donut's language at meal scale.
- **Logged sign:** the existing green ✓ stays (a **visible** sign, not colour alone) for logged meals.
- **Motion:** the per-row bars rise after the card's hero donut; micro-donuts draw on scroll-into-view.
- **Data:** `nutritionDashboard.meals` (cal/P/C/F already present). **States:** unlogged meal → ghosted bar + outline micro-donut (planned, not consumed).
- (`MealCard` + `Donut` micro variant; VK-007.)

### Motion choreography (entrance)

Per `CONSISTENCY.md`: **hero draws first** — the **Macro Donut** arcs sweep in (largest→smallest, orange primary first) + hub counts up → **then** the KPI numbers count up and the **MacroBars rise** → **then** the water ring fills → below-fold (heatmap, meal micro-donuts) draw on **scroll-into-view**. One part-of-whole motif leads each surface; the donut and meal micro-donuts read as one family. `prefers-reduced-motion` → every visual at final state instantly (donut at full arcs, bars at width, ring at fill), with the signature static forms preserved (no essential info lost).

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** (donut = ghosted ring + "log a meal" hub; KPI tiles at honest zeros framed as a fresh start; MacroBars at 0% with targets; water ring empty; heatmap all-ghosted) — **never** a degenerate collapsed donut or a "0 = failure" read; **loading** (depth-preserving skeletons that *draw/rise/count* into data — ring outline, bar tracks, tile placeholders visible, not blank boxes); **partial** (one macro/meal logged → logged slice + ghosted remainder, distinct from zero); **error** (per the Error Handling table — chart-specific: which card failed, with retry / pull-to-refresh).
- **60/30/10:** orange dominates — donut primary slice, calories MacroBar, calorie-weight bars, KPI accent; **green** = in-range/arrival/water-complete/logged ✓ only; **purple stays SIA-only** (the single SIA-note dot; **no projection series on this screen, so no purple in any chart**); **domain-lime** appears only as identity (header accent, RPG badge, the macro-bar fills, quick-action icons) — never split across donut slices or used as a generic palette. The **two-shades-of-blue water exception** is the only non-orange-family chart, and is sanctioned (§11). Glow uses the calibrated size-stepped scale (`--glow-orange-sm` on the donut primary slice; `--glow-green` only on water arrival) — premium warm depth, not neon.
- **Accessibility:** every chart has a text/`aria-label` equivalent (donut: "Protein 24%, carbs 40%, fat 37% of 1305 logged calories"; ring: "5 of 8 glasses"; each bar: "Protein, 77 of 120g, 64%"); status is **never colour-alone** — in-range/over/logged all carry a **visible glyph or word** (✓ / "over" / "logged"); load-bearing donut arcs, the orange/neutral slice boundaries, ring arc, and bar fills meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (the white/5 heatmap empty-step and white/10 separators are decorative-only); macro progress is conveyed **numerically** for colour-blind users (carries the existing a11y note); interactive targets (donut slice hit-wedges, water [+], heatmap cells, meal rows) ≥ **44×44pt** (carries B10-F12); `prefers-reduced-motion` renders all at final state.

Conform to viz-audit/CONSISTENCY.md.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** MyFitnessPal premium / Cronometer + Bevel (macro rings, dense logs clean) — *stays Balencia via the Macro Donut (orange-dominant, warm-glow, honest part-of-whole) and warm-glow surfaces on ink-brown, not a flat metric grid.*
**Pre-grade:** A− (86) · **Post-grade (this section):** A++ (95)

Pre-grade drivers (the gap to A++): the viz hero is strong (Donut, KPI tiles, MacroBars, water ring, heatmap), but (1) non-chart surfaces are flat or lack the layered depth signature (top-edge highlight, size-calibrated glow); (2) the SIA Coaching Note Card and Today's Meals Card read as secondary to the hero, with no focal clarity; (3) edge microcopy (empty / loading / error / water logic) is partly unauthored or contradictory; (4) type line-heights are ad-hoc pixels, tracking unspecified; (5) water ring depth (inset track, glow) is unspecified; (6) meal-row micro-donuts, calendar heatmap, and loading states are undesigned; (7) the FAB scroll-hide behavior, water [+] button ergonomics, and the full interaction matrix are incomplete; (8) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **Macro Donut** (`CK-P2`, data hero) — the only ≥96px element above the fold with warm glow. The **SIA Coaching Note Card sits above the Donut as an emotional anchor, not a competing focal**: on-voice coaching (warm language, purple dot for SIA identity), but visibly quieter than the donut (smaller, no glow, body type). The **KPI strip** (three `KPIStatTile`s) sits directly under the SIA card as headline numbers — supporting the donut's story, not rivaling it. Everything else (Today's Meals, MacroBars, water ring, heatmap, meal timeline, goals, food log, quick actions) is visibly secondary by size, glow, and weight. The squint test lands on the donut's primary orange slice first, then the SIA warmth, then the KPI "calories remaining" headline.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue — previously absent on all Nutrition cards) · `--shadow-1`. The two hero surfaces (Macro Donut card, SIA Coaching Note Card) add `--surface-backplate` (`CK-T02`). Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange` (32px) on the ≥96px Donut only; `--glow-orange-md` (~20px) on the water ring (≥96px at 200px); `--glow-orange-sm` (~12px) on the 36pt KPI tiles (inline scale, no glow, by the size rule); **no glow** on the 48pt macro bars or inline elements. Water ring track recess over `--track-inset`. Donut slice strokes carry a faint `--glow-orange-sm` on the orange primary slice only. Meal micro-donuts (24px) carry no glow (inline scale per the size rule). KPI tiles sit on ink-brown-800 with the edge highlight — the only inline-scale elements that read as crafted, not flat. Extends the same depth language to the Today's Meals Card, Daily Macros Card, Water Intake Card, Quick Actions Bar, Active Goals Section, Recent Food Log, and all section eyebrow containers — so no surface reads as a flat box.

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: domain title "Nutrition & diet" `--text-h2` (20pt) / weight 600 / `--leading-snug` (1.25); SIA coaching note, meal names, goal names `--text-body` (16pt raised from the current ad-hoc 15pt) / weight 400 / `--leading-normal` (1.4); meal type labels and section eyebrows the `.eyebrow` recipe (`--text-eyebrow` 12pt / weight 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`); macro labels and all meta ("Calories", "Protein", "Water", "Active goals") `--text-body` or `--text-caption` (13pt) / weight 400 / `--leading-normal`; KPI headline numbers `--text-h2` / weight 700 / tabular-nums; macro bar current values and percentages `--text-body` / weight 600 / tabular-nums; "see all" links `--text-body` / weight 600 / `--color-brand-orange`. Sentence case throughout; ≤2 `--color-brand-orange` accent words on the entire screen; Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights and missing tracking with the locked `--leading-*` and `--tracking-*` scales (`CK-T04`, `CK-T05`).

### Microcopy (before → after)

The narrative copy (SIA coaching, meal names, goal framing) is already on-voice; the gap is the **edge** strings, now authored to `CK-P5` and the Component specs reconciled:
- **Macro Donut, nothing logged** — *before:* none specified → *after (from Viz §2 states):* "Log a meal to see your split" in the hub (ghosted ring + message, never a collapsed disc).
- **Macro Donut, partial (1 macro)** — *before:* none specified → *after:* ghosted remainder arc (no-data ≠ zero) with logged slice visible.
- **Macro Donut, over-target** — *before:* none specified → *after:* hub turns `--color-stalled-amber` (calm caution amber, never alarm-red) + visible "over" label (colour + word, never colour-alone; matches the MacroBar spec).
- **KPI tiles, Day-1** — *before:* none specified → *after:* tiles read `2200 CAL LEFT`, `0g PROTEIN`, `0/7 ON TARGET` (honest zeros framed as fresh start, never a verdict).
- **Today's Meals, no plan** — *before:* "Tell SIA what you like to eat" (existing) → *kept (on-voice)*.
- **Water, all filled** — *before:* +25 XP micro-toast (existing); all glasses pulse green → *kept (on-voice)*.
- **Water, nothing logged** — *before:* all empty, count shows "0 / 8 glasses" (existing) → *kept; never hidden or shamed*.
- **Calendar Heatmap, Day-1** — *before:* none specified → *after:* all cells ghosted with "Your week fills in as you log" (never a red fail-grid; framed as attention-tracking, not punishment).
- **Calendar Heatmap, no-log day** — *before:* none specified → *after:* distinct ghosted cell (no-data ≠ zero) — **not** a worst-intensity cell, never red.
- **Recent food log, empty** — *before:* "No food logged today" (existing) → *kept (on-voice)*.
- **Food log loading** — *before:* none specified → *after:* skeleton shimmer preserving section layout (rows visible, not blank boxes).
- **Meal-row checkmark (logged)** — *before:* "Logged" visual only (existing green ✓) → *kept (visible sign, not colour-alone)*.
- **Quick actions (3 cards)** — *before:* icon + label (existing) → *kept (on-voice)*; **kept note:** "Shopping list", "Recipes", "Trends" — warm, direct, no exclamation marks.
- **FAB "Log food"** — *before:* "Log food" button (existing) → *kept (on-voice)*.
- **Error recovery (meal plan fails)** — *before:* "Could not load meal plan" + "retry" link (existing) → *kept (on-voice, specific, not "Error!")*; **+5 pts** on effort to mirror the viz-audit error spec.
- **SIA Coaching Note (no data)** — *before:* generic text (existing) → *after:* "Could not load SIA note" (specific, not "Error!"; on-voice per `CK-P5`).
No exclamation marks; the brand period used with intent; SIA strings stay specific to the user's own data (the coaching note is a real coaching observation, never generic / horoscope).

### Motion choreography

Locked to `CK-P4` order (already draw-first in the viz spec; reconciled here): **Macro Donut polygon arcs draw** (`stroke-animate`, `--dur-flow` 1200ms `--ease-flow`) — orange primary slice first, then carbs, then fat (largest→smallest); hub counts up (`--dur-slow` 520ms) → **then** KPI numbers count up (`--dur-base` 280ms `--ease-out-soft`) and MacroBars rise (0→%, `--dur-slow` 520ms `--ease-flow`) → **then** water ring fills (0→%, `--dur-slow` 520ms `--ease-flow`) → **then** meal-row calorie-weight bars rise and micro-donuts draw on scroll-into-view → **then** calendar heatmap cells fade in on scroll (below-fold). Card entrances use `.animate-fade-up` (`--dur-base` 280ms `--ease-out-soft`, 80ms stagger). Water [+] button adds a glass with a scale-in animation on the newly filled icon (0.8→1.0, `--dur-fast` 160ms `--ease-out-soft`). FAB scroll-hide: fades out + translateY(+20pt) on scroll down (`--dur-fast` 160ms `--ease-out-soft`); fades back in on scroll up/stop (same duration, same easing). `prefers-reduced-motion` → all visuals at final state instantly (donut at full arcs, bars at width, ring at fill, heatmap at full grid), loops off. No opacity-fade on any stroke (§8).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Donut = ghosted ring (faint full polygon outline), hub reads "Log a meal to see your split"; KPI tiles at honest zeros ("2200 CAL LEFT", "0g PROTEIN", "0/7 ON TARGET"); MacroBars at 0% with targets visible + "Log your first meal to see progress"; water ring empty ("0 / 8 glasses") + "Start hydrating"; calendar heatmap all-ghosted + "Your week fills in as you log"; Today's Meals = SIA-generated starter plan; recent log empty "No food logged today" | Donut hub: "Log a meal to see your split" (never "0 cal logged"); KPI: "Fresh start"; water: "Start hydrating"; heatmap: "Your week fills in as you log"; overall tone: inviting, no verdict | hub shows no Life-Power equivalent (no misleading aggregated number); `--surface-backplate`; donut never collapses to a point or a single-macro wedge; never a red fail-grid on the heatmap |
| Loading | depth-preserving skeletons (Donut outline + hub skeleton, KPI tile skeletons, macro bar track visible, water ring outline, heatmap cell grid visible) that morph/rise/count into data | "SIA is reading your nutrition — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer on Donut, count-up placeholders on KPI |
| Empty / partial | Donut: one macro logged → logged slice + ghosted remainder arc (distinct from zero); missing meals → "No plan yet" affordance in Today's Meals card; unsynced water data → count shows "? / 8 glasses" with "sync pending" note; partial heatmap → logged days visible, future/unlogged days ghosted | Donut: "You've logged protein so far" (acknowledges the logged slice). Water: "Syncing — try again shortly." Heatmap: "Your week fills in as you log." | no-data ≠ zero (ghosted, not a real 0); grey/muted tone for in-progress states |
| Error | per-section skeletons (Donut outline stays visible, bars/ring/heatmap frames visible) + a network banner below the sticky header if full sync fails; individual section fails show "Could not load [section]" with retry affordance | "Couldn't refresh — pull again." / "Could not load meal plan. Tap to retry." / "Could not load SIA note." (specific, not "Error!") | calibrated `--color-error-red` only on a genuine network/sync failure, glyph+word paired (not colour-alone) |
| Offline | cached data retained (yesterday's meals, previous log entries, last-synced water count, heatmap history); all sync-dependent [+] actions honestly dimmed; a cached banner below sticky header | "You're offline — showing your last sync. Log food now, sync when online." | actions dimmed (0.5 opacity) with a visible reason (not colour-alone) |

### Signature & anti-generic

Ownable moments: the **Macro Donut hero** (the honest part-of-whole no flat bar can show — Cronometer / MyFitnessPal lead with this, rendered here the Balencia way: orange-dominant slices, warm-glow depth, rounded caps, drawn-on-entry), the **warm-glow-on-ink surface signature** (every card has the edge-highlight + size-calibrated glow, lifting all surfaces from flat boxes), the **nutrition-lime branding** (header accent line, RPG badge, quick-action icons — distinctly Balencia, never a generic health app grey), and the **meal-timeline micro-donuts** (each meal's P/C/F split visualized at row scale, reinforcing the hero donut language — the signature visual motif no competitor carries). Anti-generic fixes: the **KPI strip is positioned above the Donut as a supporting headline**, so the screen never reads as a flat grid of bars (Cronometer's clinical density); the **meal rows have calorie-weight bars + micro-donuts**, so the meal list reads as a timeline, not flat text; the **calendar heatmap breaks the grid monotony** by appearing on scroll, below the fold; section eyebrows and the FAB scroll-behavior add **rhythm and intentional blank space**, so the dense nutrition data stays calm and hierarchical, not overwhelming. The stale ASCII wireframe (still showing flat white bars, no Donut, no micro-donuts, no heatmap) is flagged to be redrawn from this section in the build — carried as a future remediation note.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`): domain title `--color-alpha-white-100` (≥12:1), SIA coaching note white-90 (≥9:1), macro labels white-100 (≥4.5:1), macro values white-100 (≥4.5:1), section eyebrows white-40 (decorative label, paired with position — not load-bearing), "see all" links `--color-brand-orange` (≥3:1 on both fields — WCAG 1.4.11). Donut: text equivalents in `aria-label` ("Protein 24%, carbs 40%, fat 37% of 1305 logged calories"); slice boundaries (orange/neutral boundaries) meet ≥3:1 (WCAG 1.4.11). MacroBars: status never colour-alone — in-range bars show a `--color-forest-green` ✓ glyph; over-target bars show `--color-stalled-amber` **plus a visible "over" label** (colour + word, not colour-alone). Water ring: count is a **text equivalent** ("5 of 8 glasses"); arrival uses green glow **plus** the "+25 XP" copy (never colour-alone). Heatmap: intensity conveyed numerically (day + adherence score) in screen reader; no-log days are **distinct from worst-intensity** (never red). All interactive elements (meal rows, [+] water button, heatmap cells, FAB, goal rows, "see all" links, quick action cards) standardized to **`--focus-ring` (`CK-T03`)** — 2px orange, 2px offset — replacing the ad-hoc "2pt orange ring" repeated in the Interaction tables. Targets ≥44×44pt: water [+] button (32pt visual, 44pt hit box); heatmap cells (28pt visual, 44pt hit boxes with overlap allowed); meal rows (responsive height, 44pt min hit-box height). Reduced-motion preserves the Donut's static final state (arcs fully drawn, no loops).

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism |
| Domain accent line | #84CC16 | nutrition-lime | domain color, header only |
| Section eyebrow text | rgba(255,255,255,0.4) | white at 40% | meal type labels and all section labels |
| RPG badge text + bg | #84CC16 at 100% / 15% | nutrition-lime | domain color on badge |
| Calories bar fill | #FF5E00 | burnt-orange | 60% — primary metric |
| Protein/Carbs/Fat bars | #FFFFFF at 40% | white-40 | secondary metrics (neutral data ink; lime is identity-only) |
| Bar excess (over target) | #F59E0B | amber | calm caution + visible "over" word; never alarm-red, never colour-alone |
| Goal progress fills | #FF5E00 | burnt-orange | 60% — progress |
| "see all" links | #FF5E00 | burnt-orange | 60% — interactive text |
| SIA purple dot | #7F24FF | royal-purple | 10% — AI indicator |
| Water glass (filled) | #FFFFFF at 80% | white-80 | filled state |
| Water glass (empty) | #FFFFFF at 15% | white-15 | empty state |
| Water glass glow | #34A853 | forest-green | 30% — success feedback |
| Water count (complete) | #34A853 | forest-green | 30% — completion |
| Meal checkmark (logged) | #34A853 | forest-green | 30% — completion |
| [+] button bg | #0A0A0F | ink-900 | matches screen bg |
| [+] button border | #FFFFFF at 10% | white-10 | subtle |
| FAB background | #211008 | ink-brown-800 | glassmorphism |
| FAB text | #FFFFFF | white | label |
| Primary text | #FFFFFF at 100% | white | headings, values |
| Secondary text | #FFFFFF at 50% | white-50 | body, captions |

**60/30/10 verification**: orange on calories bar, goal progress, and "see all" links (60% primary). Green on water completion glow, meal checkmarks, and target-hit states (30% secondary). Purple on single SIA dot (10% accent). Domain lime (#84CC16) confined to accent line and RPG badge — never on actions, eyebrows, or UI chrome. Section eyebrows (including meal type labels) use white at 40% per shared patterns.

---

## Interaction States

### Meal Row (Today's Meals)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | meal data with separator | — |
| Pressed | background lightens slightly, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | green checkmark appears when meal is logged | success notification |

### Water [+] Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 circle, white "+", 1pt border | — |
| Pressed | scale(0.9), bg lightens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (all 8 glasses filled) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | newly filled glass gets green glow (280ms) | success notification |

### Water Glass (filled)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 80% filled circle | — |
| Pressed (long-press to remove) | scale(0.8) | error notification |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | green glow ring (280ms) when freshly filled | — |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | — |
| Pressed | scale(0.97), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | placeholder text | — |
| Success | N/A | — |

### Goal Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | card with progress bar | — |
| Pressed | scale(0.97), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Food Log Entry Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | food name + calories | — |
| Pressed | bg lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | lime text, 15% opacity pill bg | — |
| Pressed | scale(0.95), bg opacity 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### FAB (Log Food)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 glassmorphism, white text | — |
| Pressed | scale(0.95), bg darkens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Swipe right from edge | Screen | back navigation (iOS native) |
| Pull down | ScrollView | refresh dashboard data |
| Tap | Meal row | stack push to Screen 29 (Meal View mode) |
| Tap | [+] water button | add one glass, animate fill |
| Long-press | Filled water glass | remove one glass |
| Tap | Goal row | stack push to Goal Detail [14] |
| Tap | "see all" (goals) | stack push to Goals List [13], nutrition filter |
| Tap | "see all" (food log) | stack push to expanded food log |
| Tap | Food log entry | stack push to Screen 29 (Meal View for that item) |
| Tap | SIA note card | tab switch to SIA Chat [09] with nutrition context |
| Tap | RPG badge | stack push to RPG Character [19] |
| Tap | FAB | stack push to Screen 29 (Food Logging mode) |

**Haptic feedback points**:
- Meal row press: light impact
- Water [+] tap: medium impact
- Water glass long-press (remove): error notification
- All glasses filled: success notification
- FAB press: medium impact
- Goal row press: light impact
- SIA card press: light impact
- Pull-to-refresh release: medium impact
- RPG badge press: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA note card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Today's Meals card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Macros card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Water card | Screen mount | fade-in + translateY(12→0) | 280ms | ease-out-soft |
| All content entry | Screen mount | staggered: 80ms between elements | 280ms each | ease-out-soft |
| Macro bar fills | Scroll into view | width 0→percentage | 280ms | ease-out-soft |
| Water glass fill | [+] tapped | scale 0.8→1.0 on new glass | 160ms | ease-out-soft |
| Water glass green glow | After fill | glow ring appears then fades | 280ms | ease-out-soft |
| Water glass remove | Long-press | scale 1.0→0.8→empty state | 160ms | ease-out-soft |
| All glasses celebration | 8th glass filled | all glasses pulse green glow | 600ms | ease-flow |
| Meal checkmark appear | Meal logged | scale 0→1.0 on checkmark | 280ms | ease-out-soft |
| FAB scroll hide | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB scroll show | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Progress bar fill | Mount | width 0→% | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | standard iOS indicator | system | system |

**Screen transition**:
- **Enter**: stack push slide-in from right (280ms, ease-out-soft)
- **Exit**: stack pop slide-out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA note: "I've put together a meal plan based on your goals. Take a look."
- Today's Meals Card: SIA-generated starter plan with note "Adjust any meal to your taste" below the last row.
- Macros card: all bars at 0%, targets visible, labels present. Shows "Log your first meal to see progress here."
- Water card: all 8 glasses empty, count "0 / 8 glasses"
- Goals section: "No nutrition goals yet" with "create a nutrition goal" text link in Burnt Orange
- Recent food log: "No food logged today" centered text
- FAB visible and functional
- Overall feel: the screen is never empty — SIA fills every section with either a plan, a prompt, or an invitation.

### Established user (new day, nothing logged yet)
- SIA note: references yesterday's nutrition ("You hit your protein target yesterday. Keep it up today.")
- Today's Meals Card: fresh AI plan for today
- Macros card: all bars at 0%, targets shown
- Water card: all glasses empty
- Goals section: normal goals with progress from overall tracking
- Recent food log: "No food logged today" — items from yesterday are not shown here (use "see all" for history)

---

## Motivation Adaptation

- **Low motivation**: SIA note is simpler and more encouraging ("You're doing great just by paying attention."). Today's Meals card shows fewer details (meal names only, no macro badges). Macros card shows only calories bar (protein/carbs/fat hidden). Water card unchanged. Goals section shows only one goal. Recent food log hidden.
- **Medium motivation**: default experience as designed. All sections visible with standard detail level.
- **High motivation**: Macro badges on meals expand to show fiber and sodium. Macros card adds micro-nutrients row (fiber, sugar, sodium). Today's Meals card shows "nutrition score" per meal. An additional "Weekly trends" section appears below stats (mini sparkline charts for each macro). Meal timing data appears (optimal eating windows).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain accent line | — | — | 2pt height | — | #84CC16 |
| RPG skill badge | Sora | Semibold | 13pt | 18pt | #84CC16 |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| Card eyebrow ("TODAY'S MEALS", "DAILY MACROS", "WATER") | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Meal type label | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Meal name | Sora | Semibold | 16pt | 22pt | white 100% |
| Macro badges (meal row) | Sora | Regular | 12pt | 16pt | white at 50% |
| Macro label ("Calories", "Protein", etc.) | Sora | Regular | 15pt | 20pt | white 100% |
| Macro current value | Sora | Semibold | 15pt | 20pt | white 100% |
| Macro target text | Sora | Regular | 12pt | 16pt | white at 40% |
| Water count | Sora | Regular | 13pt | 18pt | white at 50% / #34A853 (complete) |
| Quick action card icon | — | — | 20pt | — | #84CC16 |
| Quick action card label | Sora | Semibold | 12pt | 16pt | white at 70% |
| Section heading ("Active goals") | Sora | Semibold | 18pt | 24pt | white 100% |
| "see all" link | Sora | Regular | 13pt | 18pt | #FF5E00 |
| Goal name | Sora | Regular | 15pt | 20pt | white 100% |
| Goal percentage | Sora | Semibold | 13pt | 18pt | white 100% |
| Domain tag chip | Sora | Regular | 11pt | 14pt | #84CC16 |
| Food log entry name | Sora | Regular | 15pt | 20pt | white 100% |
| Food log entry calories | Sora | Semibold | 15pt | 20pt | white at 50% |
| FAB label | Sora | Semibold | 15pt | 20pt | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Meal plan fails to load | Today's Meals card shows skeleton shimmer; after timeout: "Could not load meal plan" with "retry" link | Tap retry or pull-to-refresh |
| Macro data fails to load | Daily Macros card shows skeleton shimmer; after timeout: bars remain at 0% with "Pull to refresh" hint | Pull-to-refresh |
| Water intake sync fails | [+] button action applied locally (optimistic); silent background retry | Auto-retry; if fails persistently, toast: "Could not sync water intake" |
| SIA coaching note fails | "Could not load SIA note" placeholder text in white at 40% | Pull-to-refresh reloads SIA content |
| Goals fail to load | Goals section shows skeleton shimmer; after timeout: generic fallback text | Pull-to-refresh |
| Food log fails to load | Recent food log shows "Could not load food log" | Pull-to-refresh |
| Pull-to-refresh fails | Standard iOS refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls again |
| Water glass remove — sync fails | Glass visually removes (optimistic); background retry to sync | Auto-retry in background |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Nutrition and diet, Level 8"
- RPG badge: "Nutrition level 8, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- Meal rows: "[Meal type], [meal name], [calories] calories, [protein] protein, [carbs] carbs, button"
- Logged meal checkmark: "[Meal type], logged"
- Macro bars: "[Macro name], [current] of [target], [percentage] percent"
- Water glasses: "Water intake, [filled count] of 8 glasses"
- [+] button: "Add water glass, button" / "Add water glass, disabled, all glasses filled"
- Quick action cards: "[Action name], button" (e.g., "Shopping list, button")
- Goal rows: "[Goal name], [percentage] complete, button"
- Food log entries: "[Food name], [calories] calories, button"
- FAB: "Log food, button"

**Focus order:**
1. Back button → Domain title → RPG badge
2. SIA coaching note card
3. Today's Meals card → individual meal rows (Breakfast, Lunch, Dinner, Snacks)
4. Daily Macros card → macro bars (Calories, Protein, Carbs, Fat)
5. Water intake card → glass icons → [+] button
6. Quick actions bar → action cards (Shopping list, Recipes, Trends)
7. Active goals section header → "see all" → goal rows
8. Recent food log section header → "see all" → food log entries
9. FAB (Log food)

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Water [+] button as alternative to tapping individual glasses
- Long-press on filled water glass to remove (announced via VoiceOver hint)
- Pull-to-refresh reloads all dashboard data
- FAB accessible via scroll-up reveal
- All touch targets meet 44pt minimum
- Macro progress conveyed numerically (not just by bar length) for color-blind users

---

## Cross-References

- **Navigates to**: Screen 29 (Meal Detail / Food Logger) via stack push, Screen 13 (Goals List) via stack push, Screen 14 (Goal Detail) via stack push, Screen 19 (RPG Character) via stack push, Screen 09 (SIA Chat) via tab switch
- **Navigates from**: Screen 18 (Explore Section) via stack push, Screen 09 (SIA Chat) via deep-link, Screen 12 (Home Screen) via action card, Screen 16 (Life Areas Overview) via domain tap
- **Shared components with**: Screen 26 (Domain Dashboard Header, SIA Coaching Note Card, Active Goals Section, FAB, Section Heading Row — identical pattern, different domain data), Screen 29 (Macro Progress Bar pattern reused in meal detail)
- **Patterns used**: Domain Dashboard Template (Screen 26), Domain Dashboard Header (Screen 26), SIA Coaching Note Card (Screen 26), FAB (Screen 26), Section Heading Row (Screen 26), Active Goals Section (Screen 26), Back Button (Batch 1), 8-State Interaction Model
- **Patterns established**: Macro Progress Bar (horizontal bar with fill color, target, value — reusable for budgets, any target-based metric), Water Intake Tracker (visual icon counter with inline [+] increment and long-press decrement), Meal Row (meal type eyebrow + name + macro badges, tappable), Daily Macros Card (4-bar macro tracking layout)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-10.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/domains/nutrition`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B10-F12 | major | retention | Make Add water a 44x44 control with immediate increment, undo, target feedback, and failure/offline handling. |
| B10-F13 | major | navigation | Make the SIA note a semantic link/button to SIA with nutrition context and a suggested follow-up prompt. |
| B10-F14 | minor | design-system-consistency | Align the fixture/spec level or document why nutrition level changed. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

