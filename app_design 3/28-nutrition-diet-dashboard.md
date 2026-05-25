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
      - Calories bar: Burnt Orange (#FF5E00) fill
      - Protein/Carbs/Fat bars: white at 40% fill
    - Target text: "X / Yg" (or "X / Y" for calories) in 12pt Sora Regular, white at 40%, left-aligned below bar, 2pt below
  - Bars animate on mount: width from 0% to current%, 280ms, ease-out-soft
- **Variants**:
  - Normal: bars partially filled
  - Target exceeded: bar fill extends to 100%, fill color changes to #F59E0B (amber) for mild excess, #EF4444 (red) for significant excess (>120% of target)
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

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | base |
| Card surfaces | #211008 | ink-brown-800 | glassmorphism |
| Domain accent line | #84CC16 | nutrition-lime | domain color, header only |
| Section eyebrow text | rgba(255,255,255,0.4) | white at 40% | meal type labels and all section labels |
| RPG badge text + bg | #84CC16 at 100% / 15% | nutrition-lime | domain color on badge |
| Calories bar fill | #FF5E00 | burnt-orange | 60% — primary metric |
| Protein/Carbs/Fat bars | #FFFFFF at 40% | white-40 | secondary metrics |
| Bar excess (mild) | #F59E0B | amber | over target warning |
| Bar excess (significant) | #EF4444 | red | over target alert |
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
