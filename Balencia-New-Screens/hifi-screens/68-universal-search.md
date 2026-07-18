# 68-universal-search - A+++ hi-fi mobile spec

## Header
- **Source ID:** 68
- **Source spec:** `Balencia-New-Screens/screens/68-universal-search.md`
- **Evidence:** screens/68-universal-search.md, work/briefs/68.md, work/drafts/68.md, COMPONENT-CATALOG.md 1 (SearchOverlay, explicitly named for screen 68) + COMPACT-CANON.md 7-8
- **Route(s):** No live route; global SearchOverlay opened over the current route.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A single fast lane into all nine life domains and every screen in Balencia - goals, habits, recipes, notes, journal, settings, community - without forcing the person to remember which tab something lives in.
- **Premium Visual Director:** make 68-universal-search hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** 68-universal-search lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
#0A0A0F base + top-center warm orange atmosphere
+------------------------------------------+
|  +------------------------------+        |
|  |   search everything      x | Cancel |  <- GlassPillInput (search)
|  +------------------------------+        |     .glass-pill, autofocus
|                                            |
|  ( All )( Goals )( Habits )( Recipes )(+) |  <- SegmentedTabs (chips)
|  --------------------------------------- |
|                                            |
|  +------------------------------------+  |
|  |  CIA thinks you're looking for    |  |  <- CIAInsightCard
|  |                                     |  |     .glass-card + glow-cia
|  | [Habit] Morning mobility            |  |     purple pool behind card
|  | your usual Tuesday reset            |  |
|  | [Fitness]  based on 6 Tuesdays      |  |
|  |                                     |  |
|  |  [ Open routine ]      Not now      |  |  <- BtnCoach + BtnGhost
|  +------------------------------------+  |
|                                            |
|  GOALS  1 RESULT                         |  <- SectionHeader (overline)
|  +------------------------------------+  |
|  |  Run a 5k              [Fitness]  |  |  <- ListRow, in SolidCard
|  |   ########## 60%      via Goals    |  |     no glow - see 6
|  +------------------------------------+  |
|                                            |
|  HABITS  1 RESULT                        |  <- SectionHeader
|  +------------------------------------+  |
|  |  10k steps             [Fitness]  |  |  <- ListRow
|  |   12-day streak        via Habits  |  |
|  +------------------------------------+  |
|                                            |
|  RECIPES  1 RESULT                       |  <- SectionHeader
|  +------------------------------------+  |
|  |  Post-run bowl       [Nutrition] |  |  <- ListRow
|  |   450 cal          via saved recipes|  |
|  +------------------------------------+  |
|                                            |
|           (content fades to base)         |
+------------------------------------------+
no bottom nav while search is active

Route handling: No live route; global SearchOverlay opened over the current route.
```

## Focal Hierarchy
- **Dominant focal moment:** 68-universal-search hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Category filter - horizontal SegmentedTabs  scoping results with CIA only when the source supports a synthesized read.
- **Operational layer:** ASCII wireframe :, 0A0A0F base + top-center warm orange atmosphere, Input placeholder, Escape.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*search*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **`SearchOverlay`** - the screen itself. Root component per catalog: full-screen scrim + autofocused `GlassPillInput` + grouped results (`SectionHeader` per type) + recent queries as `ChipChoice` row. Everything below is what fills that shell.
- **`GlassPillInput`** (variant: search) - leading glyph, clear button, `.glass-pill` per CANON 2.
- **`SegmentedTabs`** (chip styling) - single-select category scope; active segment `--surface-3` + orange label.
- **`ChipChoice`** - recent-search chips, per the `SearchOverlay` catalog entry; tap re-runs the stored query, long-press removes one.
- **`CIAInsightCard`** - purple-tinted `glow-cia` hero row for the AI prediction. Uses its **full** anatomy: spark glyph, one-italic-word insight line, evidence row (`ChipDomainTag` + `ChipProvenance`), and both `BtnCoach` (primary) + `BtnGhost` (dismiss) actions.
- **`SolidCard`** - groups each category's `ListRow`s; data-dense, no blur.
- **`ListRow`** - the result unit: leading glyph, title, `ChipDomainTag`, secondary line (metric + `ChipProvenance`), 56px min height, hairline dividers.
- **`ChipProvenance`** / **`ChipDomainTag`** - attached per the honesty invariant and domain palette respectively.
- **`HonestNullState`** - the *zero-results-for-this-query* moment (glyph + line, no CTA).
- **`EmptyState`**-adjacent - see 9 for why the true catalog `EmptyState` doesn't fit the first-use moment and what replaces it.
- **`ErrorState`** - quiet inline banner + `BtnSecondary` retry.
- **`SkeletonState`** - shimmer `ListRow` geometry while a query is in flight.

## Data Honesty
- Every metric a result row can show runs through the full three-state honesty invariant (CANON 7):
- **Goal progress - real:** `60%` fill (orange, in-progress)  chip `via Goals`.
- **Goal progress - low-confidence:** `~60%` at 64% opacity  chip `estimated  low confidence`.
- **Goal progress - honest-null:** metric text replaced with `No progress logged yet`  chip `no data yet`. *(Corrected from the draft's "Start tracking to see progress" - a directive CTA voice doesn't belong on a passive list row; this is a description, not a nudge.)*
- **Habit streak - real:** `12-day streak` (tabular-nums)  chip `via Habits`.
- **Habit streak - honest-null:** `Not enough data yet`  chip `no data yet`.
- **Recipe calories - real:** `450 cal`  `[Nutrition]` domain tag `#84cc16`  chip `via saved recipes`. *(Corrected from the draft's "via server," which names infrastructure, not a source a person would recognize. Provenance should always answer "where did Balencia get this," in the person's language.)*
- **Community members - real:** `120 members`  chip `via Community`. No domain tag - Community is a feature surface, not one of the nine life domains, so it doesn't inherit `ChipDomainTag` color.
- **Community members - offline:** hidden entirely from the local index rather than shown stale. This is a deliberate architecture choice, not a gap - see the offline-banner fix in 9 for why showing a number here would have been dishonest.
- **Local vs. server-dependent categories**, stated once so 9's behavior is traceable: Goals, Habits, Journal, Quick notes, Settings, and Screens are indexed locally and always searchable offline. Recipes and Community depend on a live connection and disappear gracefully rather than serve stale numbers.

## Consent and Safety
- 68-universal-search lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default / empty query:** up to 10 `ChipChoice` recent searches, or - on true first use, zero history - a quiet prompt: *"Try searching for a goal, habit, or recipe"* with suggested category `ChipChoice`s (Goals  Habits  Recipes  Journal).
- *Correction: the draft implied catalog `EmptyState` here (illustration-free hero + `BtnPrimary` starter action). That component is right for a screen with one canonical next action - it's wrong for search, which has no single action to push someone toward. Forcing a `BtnPrimary` onto "try searching for something" would be a fake CTA. Suggested-category chips orient the person without inventing an action that doesn't exist.*
- **Typing / live suggestions:** 300ms debounce. `CIAInsightCard` slides in once confidence > 0.7; grouped `SolidCard` results fade in below it.
- **Skeleton:** inline `Searching for "[query]"` label above 4 shimmer `ListRow` blocks - `--surface-3` base, 1.2s sweep, matching the real row geometry (CANON `SkeletonState`).
- **Zero results (has typed, no matches):** `HonestNullState` proper - quiet search glyph, `No results for "[query]." Try a different spelling or search term.`, filter chips drop to 40% opacity (nothing to scope).
- **Error / API failure:** quiet inline banner, `Some results may be missing right now.` + `BtnSecondary` `Retry`. Server-dependent categories (Recipes, Community) hide; local categories stay visible.
- *Correction: the draft's recovery affordance was "pull down to retry" - a gesture-only fix, which is both less discoverable and, per catalog, wrong: `ErrorState`'s anatomy explicitly specifies a `BtnSecondary` retry action, not a hidden gesture. Replaced with a tappable, screen-reader-reachable button.*
- **Offline:** `.glass-pill` banner, `Offline - showing local results only. Community and recipes need a connection.`
- *Correction: the draft's offline copy ("some results may be outdated") contradicted 8's own rule that offline server-dependent results are *hidden*, not shown-but-stale. The banner now states exactly what's true - nothing invented, nothing implied that isn't happening.*
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Presentation:** overlay slides up over 280ms, ease-out-soft (physical easing, CANON 6 - never linear).
- **Row feedback:** press scales a `ListRow` to `.98` and shifts its `SolidCard` background toward `--surface-3`, 150ms.
- **Glow behavior:** `--glow-cia` on `CIAInsightCard` breathes on a 4s ease-in-out cycle - the visible signal that CIA is actively reasoning, not a static decoration.
- **Haptics:** light impact when the CIA prediction resolves onto screen; medium impact on a successful deep-link navigation (result tap -> destination push).
- **Reduced-motion path:** slide-up collapses to an instant fade; the CIA glow breathe freezes at rest state; staggered result fade-ins render immediately, no stagger.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; global SearchOverlay opened over the current route..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** primary text `paper-100` `#FEFAF3` on `SolidCard` `--surface-2` `#211008` computes to roughly **17.7:1** - far past AA. Secondary metadata at paper-64% over the same surface computes to roughly **7.7:1**, clearing AAA for body text. *(Corrected from the draft's flat, unverified "16:1" claim - recomputed against the actual token pair rather than asserted.)*; **Targets:** every `ListRow`, filter chip, and the clear/`Cancel` controls meet the 44px minimum touch target.; **Screen-reader:** glyph-only controls carry explicit labels - "Clear search," "Cancel search," "Fitness domain," "Nutrition domain" - and the `CIAInsightCard`'s `BtnGhost` announces as "Dismiss suggestion," not just "Not now," so its purpose survives without sight of the label.
