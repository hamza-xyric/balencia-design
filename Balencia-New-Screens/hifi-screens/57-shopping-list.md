# 57-shopping-list - A+++ hi-fi mobile spec

## Header
- **Source ID:** 57
- **Source spec:** `Balencia-New-Screens/screens/57-shopping-list.md`
- **Evidence:** screens/57-shopping-list.md, work/briefs/57.md, work/drafts/57.md, Functional brief (AI meal-plan execution & grocery check-off)
- **Route(s):** No live route; shopping list is a nested nutrition execution module launched from Nutrition, recipes, or CIA chat.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Bridges CIA's AI-generated meal plans and saved recipes with real-world grocery execution.
- **Premium Visual Director:** make Shopping list graph the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Shopping list uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[ - ] Shopping list          [  ]  <- TopBar
       +----------------------------------+
       |   Add an item...          [ Add ]|  <- Static GlassPillInput
       +----------------------------------+
       +----------------------------------+
       |  8 items  2 purchased           |  |
       |  ------------------ (hairline)   |  |  <- Solid Summary Bar
       |  [ Hide purchased ]              v|  |
       +----------------------------------+

       PRODUCE
       ----------------------------------
       [x] Avocados (2)    [  Meal plan ]
       [ ] Spinach (200g)  [  Recipe: X ]

       PROTEIN
       ----------------------------------
       [ ] Chicken thigh (1kg)

           (Scrollable List)
       ----------------------------------
       PURCHASED (Hidden)

       +----------------------------------+
       | [ Clear purchased ]   [ Share ]  |  <- Bulk Action Bar
       +----------------------------------+
                     [  ]                 <- FAB
       +--------------------------------+
       |  Today   CIA   Goals    Me     |  <- GlassNavBar
       +--------------------------------+

Route handling: No live route; shopping list is a nested nutrition execution module launched from Nutrition, recipes, or CIA chat.
```

## Focal Hierarchy
- **Dominant focal moment:** Shopping list graph; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Inline Add Input, List Summary Bar, List Body :, - Category sections ..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*list*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- `TopBar` (Transparent over atmosphere)
- `GlassPillInput` (Variant: search/text with trailing BtnSecondary)
- `GlassStatCard` (Variant: `ring`. *Used as an alternative visual for the summary progress bar in high-motivation tier.*)
- `SolidCard` (Variant: inline bar. Houses the summary counts and progress hairline).
- `SectionHeader` (Overline + collapse chevron)
- `ListRow` (Variant: shopping item. Checkbox leading, metadata trailing).
- `BtnPrimary`, `BtnSecondary`, `BtnGhost` (Actions)
- `FABQuickLog`, `GlassNavBar` (Global nav)
- `ChipDomainTag` (Source badges: `Meal plan`, `Recipe: X`)
- `ChipProvenance` (Trailing metadata for macro estimates in High tier).
- `SkeletonState` (Loaders)
- `HonestNullState` (Sync/empty metrics)
- **NEW: `ShoppingItemRow`** - A highly specific `ListRow` variant combining a 44px target checkbox, flexible typography for name/quantity, and inline source/macro chips. Swipes left to `BtnSuccess` (check) or `BtnSecondary` (edit). *Rationale: standard ListRow doesn't support the dual-typography inline parsing required by the brief.*

## Data Honesty
- **List Completion Metric (Real):**
- Value: `25%` (or `[X] purchased`)
- Provenance: `computed locally`
- State: Active.
- **List Completion Metric (Low-confidence):**
- Value: `~25%` (muted to paper-64%).
- Provenance: `estimated  sync pending`
- State: Offline/Local cache mode.
- **List Completion Metric (Honest-null):**
- Value: `---`

## Consent and Safety
- Shopping list uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Active list categorized; offline cache enabled.
- **Skeleton:** Axis + ghost lines for categories. Input and top bar render immediately.
- **Empty:** Centered `HonestNullState`. Text: `Your shopping list is empty.` `BtnGhost`: `Talk to CIA`. `BtnPrimary`: `Import from diet plan`.
- **Error:** `ErrorState` inline at top: `Couldn't load your list`. Retains last cached local list underneath (honest staleness).
- **Success (All Done):** `CelebrationOverlay` (fade-only for reduced motion). Text: `All *done*. You've got everything.` Dismissed by tapping anywhere.
- **Disabled:** If list is syncing, swipe/edit actions are disabled (40% opacity).

## Motion
- **Check-off Delay:** Tap checkbox -> scales .98 immediately -> item gets strikethrough + fades to paper-40% -> *pauses 1.5s* with an "Undo" toast before dropping to the Purchased section. Allows recovery from fat-finger mis-taps.
- **Swipe Actions:** Physical spring (`spring(stiffness: 300, damping: 30)`). Full swipe executes primary action (Delete).
- **FAB / Input Focus:** Tapping FAB scrolls the list to top (150ms ease-out) and activates the keyboard on the `GlassPillInput`.
- **Glow behavior:** Summary Bar `--glow-you` breathes subtly (4s ease) when progress increases.
- **Haptics:** Light impact on item check-off; medium impact on list clear/generation.
- **Reduced-motion path:** Swipes require full distance (no auto-completion), 1.5s delay reduced to 0s (instant move, undo via native toast), glow breathe is static.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; shopping list is a nested nutrition execution module launched from Nutrition, recipes, or CIA chat..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Targets:** Checkbox swipes are mapped to a 44x44px invisible hit-area over the row. Overflow chevron in `SectionHeader` is 44px.; **Screen-reader:** Checkboxes read as `"Avocados, quantity 2, unchecked. Double tap to mark purchased."`; **Motor-impaired fallback:** Long-press on a row opens a `Sheet` with explicit `BtnPrimary` "Mark as purchased" and `BtnSecondary` "Edit" actions, bypassing the need for swipe gestures.
