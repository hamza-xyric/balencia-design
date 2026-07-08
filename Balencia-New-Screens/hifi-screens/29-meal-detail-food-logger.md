# 29-meal-detail-food-logger - A+++ hi-fi mobile spec

## Header
- **Source ID:** 29
- **Source spec:** `Balencia-New-Screens/screens/29-meal-detail-food-logger.md`
- **Evidence:** screens/29-meal-detail-food-logger.md, work/briefs/29.md, work/drafts/29.md, Meal Detail / Food Logger Brief
- **Route(s):** No live route; meal view and food logging are stack modes launched from Nutrition.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Meal Detail / Food Logger displays the nutritional truth of a planned or logged meal and provides a fast search-first logging surface.
- **Premium Visual Director:** make Meal Detail / Food Logger command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Meal Detail / Food Logger names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+
| <- Lunch                              Edit |
|                                           |
| +---------------------------------------+ |
| | meal photo or warm placeholder        | |
| +---------------------------------------+ |
| Chicken salad wrap                       |
| 12:30 PM  you logged                    |
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

Route handling: No live route; meal view and food logging are stack modes launched from Nutrition.
```

## Focal Hierarchy
- **Dominant focal moment:** Meal Detail / Food Logger command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Stable TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Meal photo and info, Macro visualization, CIA insight, Ingredients list.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is language-derived from `Nutrition`: warm-light stack/detail surface, search-first logging, scanner actions, meal-type tabs, and green nutrition status cards.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium detail variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*logger*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Meal Detail/Food Logger frame was visible in the supplied screenshots; inherit Figma `Nutrition` add/logging language.
- **Logger anatomy:** stable top bar, search field, barcode/receipt/manual entry actions, Breakfast/Lunch/Dinner/Snack segmented tabs, recent foods, confirmation checklist, and meal macro card after save.
- **Safety visibility:** allergy and dietary restriction chips appear beside the source/provenance row before adding suggested foods.

## Components
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

## Data Honesty
- **Total calories:** Real shows `520 cal` plus ChipProvenance `you logged` or `food database`; low-confidence shows muted value with `estimated - low confidence`; honest-null shows empty donut and "Log this meal to see its split."
- **Macro split:** Real percentages use protein times 4, carbs times 4, and fat times 9 before rendering; low-confidence labels estimated macros; honest-null bars are visually empty and labeled "Macros not logged."
- **Unattributed calories:** Real displays "435 from macros" when ingredient macro math does not equal total calories; honest-null hides the line if there is no gap.
- **Ingredients:** Real rows show food name, portion, calories, and source; low-confidence labels `portion estimated`; honest-null rows avoid charts and show "Macros unavailable."
- **Search results:** Real database rows carry source; low-confidence generic matches are marked; honest-null result state offers manual entry.
- **Scanner output:** Receipt or barcode results are suggestions until the user confirms each item.

## Consent and Safety
- Meal, ingredient, scanner, and database chips open nutrition-source controls with freshness, confidence, retention, export, revoke imported nutrition source, and delete meal/media entries.
- Meal Detail / Food Logger treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Allergy/dietary restriction handling is visible in both detail and logging modes; CIA copy is coaching support only and never medical nutrition advice.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Entry determines Meal View or Food Logging mode.
- **Skeleton:** Macro card shows ring track, bars, and ingredient rows as shimmer geometry; no fake calories.
- **Empty Meal View:** Planned meal exists but is unlogged; donut is a faint outline with "Log this meal to see its split."
- **Empty Food Logging:** Search focused, recent foods hidden, manual entry available.
- **Error:** Meal or search failures are localized with retry; manual entry remains available.
- **Success:** Quick-add row collapses, green checkmark appears, and the new item is appended with source label.
- **Disabled:** Offline search and scanners are disabled; manual entry stays available and queues locally if supported.

## Motion
- **Screen entrance:** Stack push slide-in over 280ms.
- **Mode transition:** Content below the stable TopBar crossfades over 520ms.
- **Macro draw:** Donut arcs sweep clockwise from largest share to smallest; bars rise with 80ms stagger.
- **Quick-add:** Row expands from compact to portion picker; confirm collapses the row and flashes green.
- **Scanners:** Barcode sheet slides up; receipt scanner opens full frame and returns a confirmation checklist.
- **Haptics:** Light on quick-add, medium on scanner success.
- **Reduced motion:** Donuts and bars render instantly; crossfade becomes opacity-only; count-ups are skipped.

## Image Slots
- `HIFI-29-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Meal Detail / Food Logger instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; meal view and food logging are stack modes launched from Nutrition..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on SolidCards meets AA+; low-confidence values do not drop below readable contrast.; **Targets:** Back, Edit, Done, scanner buttons, plus buttons, and row actions maintain 44px targets.; **Screen readers:** Donut announces total calories, macro shares, source, and unattributed-calorie gap before visual details.
