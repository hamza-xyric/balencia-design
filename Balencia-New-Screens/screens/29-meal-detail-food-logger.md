# 29-meal-detail-food-logger

## 1. Header
- **Screen ID:** 29
- **Name:** Meal Detail / Food Logger
- **Route(s) covered:** No live route; meal view and food logging are stack modes launched from Nutrition.
- **Tab:** Today
- **Source:** Meal Detail / Food Logger Brief
- **Batch:** 13

## 2. Purpose
Meal Detail / Food Logger displays the nutritional truth of a planned or logged meal and provides a fast search-first logging surface. It operates as a two-mode pattern: Meal View for reading macros and ingredients, and Food Logging for adding items by search, scanner, recent foods, or manual entry.

## 3. Entry & exit
- **Entry paths:** Meal row on Nutrition [28] opens Meal View; Nutrition FAB opens Food Logging; CIA Chat [09] and Home [12] can open either mode depending on context.
- **Primary exit:** Back or edge-swipe returns to Nutrition [28].
- **Action exits:** Done saves logged items and returns to Nutrition [28]; CIA insight opens CIA Chat [09]; scanner settings prompt opens device permission settings.
- **Failure exit:** If food search fails, the screen keeps manual entry available; if meal data fails, cached meal metadata remains visible with retry.

## 4. Layout anatomy
Top-to-bottom regions:
1. **Stable TopBar:** Back chevron, contextual title ("Lunch" or "Log food"), and Edit or Done action.
2. **Meal photo and info:** Conditional image, meal name, time, source label, and planned/logged status.
3. **Macro visualization:** SolidCard with honest MacroDonutViz, total calories, macro bars, and unattributed-calorie disclosure.
4. **CIA insight:** Purple glass card with meal-specific context and Talk action.
5. **Ingredients list:** SolidCard with ingredient rows and per-item micro-bars.
6. **Food logging mode:** Search input, scanner buttons, meal type selector, recent/frequent foods, search results, and manual entry accordion.
7. **Bottom chrome:** Floating nav inherited from Today; no extra primary button beyond Done in logging mode.

**ASCII Wireframe (390x844):**
```text
+-------------------------------------------+
| <- Lunch                              Edit |
|                                           |
| +---------------------------------------+ |
| | meal photo or warm placeholder        | |
| +---------------------------------------+ |
| Chicken salad wrap                       |
| 12:30 PM · you logged                    |
|                                           |
| +---------------------------------------+ |
| | MACROS                                | |
| |          520 cal                      | |
| |    donut by calorie share             | |
| | protein 32%  ========                 | |
| | carbs   37%  =========                | |
| | fat     31%  =======                  | |
| | 435 from macros                       | |
| +---------------------------------------+ |
|                                           |
| +---------------------------------------+ |
| | CIA                                   | |
| | Good *balance*. This meal hits 29%.   | |
| +---------------------------------------+ |
|                                           |
| +---------------------------------------+ |
| | Ingredients                           | |
| | wrap              220 cal  verified   | |
| | dressing           80 cal  estimated  | |
| +---------------------------------------+ |
|                                           |
| -- logging mode crossfade --              |
| [Search food...] [barcode] [receipt]      |
| [Breakfast][Lunch][Dinner][Snack]         |
| recent: almonds [+]   apple [+]           |
+-------------------------------------------+
```

## 5. Components
- **TopBar:** Stable across both modes.
- **GlassStatCard:** Meal image fallback when no photo exists.
- **SolidCard:** Macro Breakdown and Ingredients list.
- **GlassPillInput:** Search and manual entry fields.
- **SegmentedTabs:** Meal type selector.
- **ListRow:** Ingredients, recent foods, search results, and manual rows.
- **ProgressRing:** Donut base.
- **ProgressBar:** Macro bars and per-ingredient micro-bars.
- **CIAInsightCard:** Meal-specific coaching with evidence.
- **Sheet:** Barcode scanner, receipt scanner, permission prompt, and portion picker.
- **NEW: MacroDonutViz:** Dedicated calorie-share donut. Rationale: the source explicitly rejects raw-gram slices because calories, not grams, are what the hub displays.
- **NEW: QuickAddRow:** Expandable food row with portion selector, macro preview, and confirm action.

## 6. Visual treatment
- **Atmosphere:** Warm dark base with top-center orange glow and 3% soft-light grain.
- **Selective glass:** CIA and search/scanner inputs use glass; macro math, ingredient rows, and search results use SolidCard.
- **Semantic glow:** CIA uses `--glow-cia`; macro focus uses `--glow-you` only after the user taps a macro; successful add uses `--glow-done`.
- **Hero type moment:** The total calorie value "520" is the dominant display moment with tabular numerals.
- **Honesty visual:** Unattributed calories are disclosed below the hub rather than being forced into a 100% donut.
- **Photo fallback:** Missing meal photos use warm placeholders and source labels, not stock food imagery.

## 7. Content & copy
- **Meal View header:** "Lunch", "Edit"
- **Food Logging header:** "Log food", "Done"
- **Macro hub:** "520", "cal", "435 from macros"
- **Macro reference:** "Proportional to daily target"
- **CIA insight:** "Good *balance*. This meal hits 29% of your daily target."
- **CIA manual copy:** "This is CIA's suggestion. Adjust any ingredient to match what you actually ate."
- **Search:** "Search food...", "No recent foods yet. Search or scan to get started."
- **Scanners:** "Point at barcode", "CIA is reading your receipt", "Could not read receipt. Try a clearer photo?"
- **Manual entry:** "Add manually", "Food name", "Amount", "Unit", "Cal", "Protein", "Carbs", "Fat"
- **Errors:** "Could not load meal data", "Search failed. Try again.", "Camera access needed to scan."
- **Success:** "Food added.", "+25 XP"

## 8. Data & honesty states
- **Total calories:** Real shows `520 cal` plus ChipProvenance `you logged` or `food database`; low-confidence shows muted value with `estimated - low confidence`; honest-null shows empty donut and "Log this meal to see its split."
- **Macro split:** Real percentages use protein times 4, carbs times 4, and fat times 9 before rendering; low-confidence labels estimated macros; honest-null bars are visually empty and labeled "Macros not logged."
- **Unattributed calories:** Real displays "435 from macros" when ingredient macro math does not equal total calories; honest-null hides the line if there is no gap.
- **Ingredients:** Real rows show food name, portion, calories, and source; low-confidence labels `portion estimated`; honest-null rows avoid charts and show "Macros unavailable."
- **Search results:** Real database rows carry source; low-confidence generic matches are marked; honest-null result state offers manual entry.
- **Scanner output:** Receipt or barcode results are suggestions until the user confirms each item.

## 9. All states
- **Default:** Entry determines Meal View or Food Logging mode.
- **Skeleton:** Macro card shows ring track, bars, and ingredient rows as shimmer geometry; no fake calories.
- **Empty Meal View:** Planned meal exists but is unlogged; donut is a faint outline with "Log this meal to see its split."
- **Empty Food Logging:** Search focused, recent foods hidden, manual entry available.
- **Error:** Meal or search failures are localized with retry; manual entry remains available.
- **Success:** Quick-add row collapses, green checkmark appears, and the new item is appended with source label.
- **Disabled:** Offline search and scanners are disabled; manual entry stays available and queues locally if supported.

## 10. Motion & interaction
- **Screen entrance:** Stack push slide-in over 280ms.
- **Mode transition:** Content below the stable TopBar crossfades over 520ms.
- **Macro draw:** Donut arcs sweep clockwise from largest share to smallest; bars rise with 80ms stagger.
- **Quick-add:** Row expands from compact to portion picker; confirm collapses the row and flashes green.
- **Scanners:** Barcode sheet slides up; receipt scanner opens full frame and returns a confirmation checklist.
- **Haptics:** Light on quick-add, medium on scanner success.
- **Reduced motion:** Donuts and bars render instantly; crossfade becomes opacity-only; count-ups are skipped.

## 11. Motivation-tier adaptation
- **Low density:** Shows calories only, recent foods first, and CIA copy that validates partial tracking.
- **Medium density:** Default macro visualization, search, scanners, and ingredient breakdown.
- **High density:** Adds fiber, sugar, portion estimator, and pre-expanded manual entry.

## 12. Accessibility
- **Contrast:** Paper text on SolidCards meets AA+; low-confidence values do not drop below readable contrast.
- **Targets:** Back, Edit, Done, scanner buttons, plus buttons, and row actions maintain 44px targets.
- **Screen readers:** Donut announces total calories, macro shares, source, and unattributed-calorie gap before visual details.
- **Dynamic type:** Macro labels wrap without overlapping the donut or row actions.
- **Scanner fallback:** Manual entry remains reachable when camera permission is denied.

## 13. Premium checklist
1. **Connects:** CIA card deep-links with meal context and target integration.
2. **Honest:** Macro donut uses calorie share and discloses the gap instead of faking 100%.
3. **Premium:** Stable mode transition, selective glass, and precise data surfaces preserve craft.
4. **Route truth:** This is documented as a nested stack mode, not a live route.
5. **Selective glass:** Inputs and CIA glass, data solid.
6. **Semantic glow:** Purple for CIA, orange for user focus, green for add success.
7. **One hero type moment:** Total calories own the focal display.
8. **All states:** Default, skeleton, empty, error, success, disabled, and offline behavior covered.
9. **Source fidelity:** Meal view, logging mode, scanner, manual entry, quick-add, and corrected macro math are preserved.
10. **A11y:** Macro summaries, camera fallback, targets, and dynamic type are covered.
11. **Motion:** Donut draw and mode crossfade have reduced-motion paths.
12. **No fake data:** Search, scanner, and ingredient suggestions require confirmation.
13. **Voice:** Calm sentence case, no exclamation marks.
14. **CIA identity:** Coach name remains CIA throughout.
