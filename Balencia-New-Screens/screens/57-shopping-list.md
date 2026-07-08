# 57-shopping-list — Hi-Fi Spec

## 1. Header
- **Screen ID:** 57
- **Name:** Shopping list
- **Route(s) covered:** No live route; shopping list is a nested nutrition execution module launched from Nutrition, recipes, or CIA chat.
- **Tab:** Nutrition (via Today / side-drawer)
- **Source:** Functional brief (AI meal-plan execution & grocery check-off)
- **Batch:** 13

## 2. Purpose
Bridges CIA's AI-generated meal plans and saved recipes with real-world grocery execution. It automatically generates, categorizes, and merges a unified shopping list while allowing manual additions and quick, one-handed, offline-ready in-store check-offs. 

## 3. Entry & exit
- **Entry (Stack Push):**
  - Nutrition Dashboard `[28]` → "Shopping list" quick action card.
  - CIA Chat `[09]` → Deep-link triggered by CIA ("I've added ingredients...").
  - Recipe Detail → "Add ingredients to list" action.
- **Exit:**
  - **Primary:** Nutrition Dashboard `[28]` (via stack pop / back chevron).
  - **Secondary:** CIA Chat `[09]` (via empty state CTA or tab switch).
  - **Secondary:** Recipe Detail (via stack push by tapping a recipe source badge inside a row).

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere & TopBar:** Warm dark background with top radial glow. Transparent `TopBar` with back chevron, H1 title, and overflow menu.
2. **Inline Add Input:** Persistent `GlassPillInput` pinned directly below the TopBar (correction from brief contradiction: it stays static above the fold so users can always add items immediately, even mid-scroll).
3. **List Summary Bar:** `SolidCard` (flat, inline) holding the count (KPI), a progress hairline, and a toggle to hide/show purchased items. Contains `--glow-you` for active progress.
4. **List Body (Scrollable):** 
   - Category sections (`SectionHeader` with collapse toggle).
   - `ListRow` items with checkboxes, titles, quantities, domain tags, and swipe actions.
   - Purchased section (conditionally rendered at the bottom).
5. **Sticky Bulk Action Bar:** Solid opaque bar pinned above the bottom nav for "Clear" and "Share" actions.
6. **Bottom Nav & FAB:** Floating `GlassNavBar` with `FABQuickLog` nested seamlessly on the right.

**ASCII Wireframe (390x844):**
```text
       [ - ] Shopping list          [ ⋯ ]  <- TopBar
       ┌──────────────────────────────────┐
       │  ⊕ Add an item...          [ Add ]│  <- Static GlassPillInput
       └──────────────────────────────────┘
       ┌──────────────────────────────────┐
       │  8 items · 2 purchased           │  │
       │  ━━━━━━━━━━━━━━━━━━ (hairline)   │  │  <- Solid Summary Bar
       │  [ Hide purchased ]              v│  │
       └──────────────────────────────────┘

       PRODUCE                           ▼
       ─────────────────────────────────-
       [✓] Avocados (2)    [ 🍃 Meal plan ]
       [ ] Spinach (200g)  [ 🍃 Recipe: X ]
       
       PROTEIN                            ▼
       ─────────────────────────────────-
       [ ] Chicken thigh (1kg)            ⋯ 

           (Scrollable List)
       ─────────────────────────────────-
       PURCHASED (Hidden)                 ▼

       ┌──────────────────────────────────┐
       │ [ Clear purchased ]   [ Share ]  │  <- Bulk Action Bar
       └──────────────────────────────────┘
                     [ ⊕ ]                 <- FAB
       ╭────────────────────────────────╮
       │  Today   CIA   Goals    Me     │  <- GlassNavBar
       ╰────────────────────────────────╯
```

*Correction of Brief Contradiction #2 (Layout):* The input is treated as a static UI chrome element pinned above the scroll view, preventing it from being lost when the list grows long.

## 5. Components
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
- **NEW: `ShoppingItemRow`** — A highly specific `ListRow` variant combining a 44px target checkbox, flexible typography for name/quantity, and inline source/macro chips. Swipes left to `BtnSuccess` (check) or `BtnSecondary` (edit). *Rationale: standard ListRow doesn't support the dual-typography inline parsing required by the brief.*

## 6. Visual treatment
- **Background atmosphere:** True base `#0A0A0F` with the mandatory top-center warm radial glow (`rgba(255,94,0,.18)`). 3% soft-light grain overlay.
- **Glass tiers:** 
  - `.glass-pill` on the `GlassPillInput` and overflow popups.
  - Solid `--surface-2` on the Summary Bar and Bulk Action Bar to anchor the top/bottom chrome seamlessly without layering too much heavy glass. 
  - `.glass-card` on the floating `GlassNavBar`.
- **Semantic inner-glow (meaning-driven):**
  - **Summary Bar:** `--glow-you` (#FF5E00). Anchors the user's active progress through the list.
  - **Empty State Card (if triggered):** `--glow-cia` (#7F24FF). Signifies CIA is ready to generate or assist.
  - **List Items:** No glow (preserving honesty and preventing visual noise on dense data).
- **The one hero type moment:** The Input placeholder: `Add an *item*…` (Tiempos Medium italic). 

## 7. Content & copy
(CIA voice: warm, direct, no exclamations. One Tiempos italic emphasis word per moment max).
- **H1 Title:** `Shopping list`
- **Input Placeholder:** `Add an *item*…`
- **Summary Metrics:** `8 items · 2 purchased`
- **Toggle:** `Hide purchased` / `Show purchased`
- **Source Tags:** `From your meal plan`, `From recipe: [Name]`, `Manual`
- **Bulk Actions:** `Clear purchased`, `Share`
- **Swipe Actions:** `Delete`, `Edit`
- **Undo Toast:** `Purchased — tap again to *undo*`
- **Empty State Body:** `Your shopping list is empty. Add items above or import from a diet *plan*.`
- **CIA Generation:** `Building your shopping list from your meal *plan* — one moment.`
- **Success State:** `All *done*. You've got everything.`
- **CIA Insight Line:** `CIA: meal-plan ingredients are *covered* for the week.`
- **Offline Warning:** `You're offline — changes will sync when you *reconnect*.`
- **Load Error:** `Couldn't load your list — pull to *refresh*.`

## 8. Data & honesty states
**List Completion Metric (Real):**
- Value: `25%` (or `[X] purchased`)
- Provenance: `computed locally`
- State: Active.

**List Completion Metric (Low-confidence):**
- Value: `~25%` (muted to paper-64%).
- Provenance: `estimated · sync pending`
- State: Offline/Local cache mode.

**List Completion Metric (Honest-null):**
- Value: `---`
- Provenance: `Not enough data yet — add an item`

**Macros/Calories Data (High Motivation Tier):**
- **Real:** `450 kcal` + `via Nutrition DB`
- **Low-confidence:** `~450 kcal` + `estimated · generic item`
- **Honest-null:** `Macros unknown — tap to log manually`

## 9. All states
- **Default:** Active list categorized; offline cache enabled.
- **Skeleton:** Axis + ghost lines for categories. Input and top bar render immediately.
- **Empty:** Centered `HonestNullState`. Text: `Your shopping list is empty.` `BtnGhost`: `Talk to CIA`. `BtnPrimary`: `Import from diet plan`.
- **Error:** `ErrorState` inline at top: `Couldn't load your list`. Retains last cached local list underneath (honest staleness).
- **Success (All Done):** `CelebrationOverlay` (fade-only for reduced motion). Text: `All *done*. You've got everything.` Dismissed by tapping anywhere.
- **Disabled:** If list is syncing, swipe/edit actions are disabled (40% opacity).

## 10. Motion & interaction
- **Check-off Delay:** Tap checkbox → scales .98 immediately → item gets strikethrough + fades to paper-40% → *pauses 1.5s* with an "Undo" toast before dropping to the Purchased section. Allows recovery from fat-finger mis-taps.
- **Swipe Actions:** Physical spring (`spring(stiffness: 300, damping: 30)`). Full swipe executes primary action (Delete).
- **FAB / Input Focus:** Tapping FAB scrolls the list to top (150ms ease-out) and activates the keyboard on the `GlassPillInput`.
- **Glow behavior:** Summary Bar `--glow-you` breathes subtly (4s ease) when progress increases.
- **Haptics:** Light impact on item check-off; medium impact on list clear/generation.
- **Reduced-motion path:** Swipes require full distance (no auto-completion), 1.5s delay reduced to 0s (instant move, undo via native toast), glow breathe is static.

## 11. Motivation-tier adaptation
*Correction of Brief Contradiction #3 (Motivation toggles):* This state is driven by global app preference settings, not an unlisted UI toggle on this screen.
- **Low Density:** Category sections auto-collapse by default. Row metadata is hidden (just Name + Quantity). Simplifies visual noise for cognitive ease.
- **Medium Density (Default):** Categories expanded. Inline chips show provenance (`Meal plan`, `Recipe: X`). 
- **High Density:** Macros/calories exposed inline on rows via `ChipProvenance` (e.g., `450 kcal via Nutrition DB`). Meal mapping visible (e.g., `Mon lunch`).

## 12. Accessibility
- **Targets:** Checkbox swipes are mapped to a 44x44px invisible hit-area over the row. Overflow chevron in `SectionHeader` is 44px.
- **Screen-reader:** Checkboxes read as `"Avocados, quantity 2, unchecked. Double tap to mark purchased."`
- **Motor-impaired fallback:** Long-press on a row opens a `Sheet` with explicit `BtnPrimary` "Mark as purchased" and `BtnSecondary` "Edit" actions, bypassing the need for swipe gestures.
- **Contrast:** Paper-40% (#FEFAF3 at 40% opacity) strictly used *only* for metadata under 12pt; row titles are Paper-100 to guarantee AA+ on `--surface-2`.

## 13. Premium checklist
1. **Connects:** Binds AI Chat, Recipes, and Nutrition seamlessly via inline source tags. ✅
2. **Honest:** 1.5s check-off delay prevents accidental false-completion; offline mode computes real local state. ✅
3. **Premium:** Warm dark glass, atmospheric glow, no flat black backgrounds. ✅
4. **Glass tiers:** Solid cards for dense lists; glass strictly for input and nav. ✅
5. **Semantic glow:** Used exclusively on progress, not on individual list rows. ✅
6. **60/30/10 rule:** Orange progress/chips; Green purchased checks/dots; Purple CIA empty-state prompts. ✅
7. **Type:** One Tiempos italic hero word (`*item*`) in the input. ✅
8. **Voice:** Sentence case, zero exclamations. ✅
9. **Data states:** Completion metric has real, estimated, and null states defined. ✅
10. **Density adaptation:** Mapped to Low/High variations cleanly without hidden UI. ✅
11. **A11y floor:** 44px swipe targets, long-press fallback for swipes. ✅
12. **Consent:** Items originating from health/diet data intrinsically respect global data syncing consents without nagging on-screen. ✅
13. **Motion:** 150-250ms physical easing used; reduced-motion path flattens delays. ✅
14. **Correction traceability:** Brief layout contradiction resolved by pinning the input statically above the scroll view; Type contradiction resolved below. ✅

*Correction of Brief Contradiction #1 (Typography):* Base spec mandates 15pt Name / 15pt Quantity. The "Premium Craft" rewrite suggests 16pt Name / 17pt Quantity. **Resolution:** Data density on mobile requires restraint. We reject the 17pt Quantity. We adopt `Body` (15pt NM Regular) for Item Name and `Body` (15pt NM Medium) for Quantity. This differentiates the elements structurally without inflating vertical row height, which is critical for a grocery list containing 30+ items.
