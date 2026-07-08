# 70-exercise-library - A+++ hi-fi mobile spec

## Header
- **Source ID:** 70
- **Source spec:** `Balencia-New-Screens/screens/70-exercise-library.md`
- **Evidence:** screens/70-exercise-library.md, work/briefs/70.md, work/drafts/70.md, Fitness DB / Local Cache
- **Route(s):** `/exercises`, `/exercises/[id]`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A lightweight, performant utility for discovering over 500 movements, learning proper form, and selecting exercises for workout planning.
- **Premium Visual Director:** make Exercise Library command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Exercise Library names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
.-- TopBar (Transparent) --------------.
      |  <              Exercise library     O |
      '----------------------------------------'
      .-- GlassPillInput ---------------------.
      |  Q   search exercises...             |
      '----------------------------------------'
      .-- Muscle Filters (Scroll) ------------.
      |  ( All ) ( Upper Body ) ( Lower )  >  |
      '----------------------------------------'
      .-- Equip Filters (Scroll) -------------.
      |  ( Any ) ( Dumbbell ) ( Barbell )  >  |
      '----------------------------------------'
      |  532 exercises                        |
      .-- Virtualized Grid (2-col) -----------.
      |  .----------.   .----------.         |
      |  | [Image]  |   | [Image]  |         |
      |  | Bench Pr |   | Squat    |         |
      |  | Chest    |   | Legs     |         |
      |  |  Adv  |   |  Adv  |         |
      |  |          |   |          |         |
      |  |          |   |          |         |
      |  '----------'   '----------'         |
      |  .----------.   .----------.         |
      |  | [Image]  |   | [Image]  |         |
      |  | Plank    |   | Pullup   |         |
      |  | Core     |   | Back     |         |
      |  |  Beg  |   |  Int  |         |
      |  '----------'   '----------'         |
      '----------------------------------------'
               .--- Floating Nav ---.
               |  o   *   o   o    |
               '-------------------'

Route handling: `/exercises`, `/exercises/[id]`
```

## Focal Hierarchy
- **Dominant focal moment:** Exercise Library command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Search & Filters, Contextual Banner, Exercise Grid, GlassNavBar.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is language-derived from `Workouts` and the `Features` grid: warm-light utility list, search, chips, compact cards, and orange active filters.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium library variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*library*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Exercise Library frame was visible in the supplied screenshots; inherit the `Workouts` shell for route `/exercises` and the Figma feature-card style for movement tiles.
- **Route split:** `/exercises` is the searchable library; `/exercises/[id]` is a stack detail or half sheet with form cues, equipment, contraindication notes, and `Add to workout`. Do not present the same state as both at once.
- **Anatomy:** title `Exercise library`, search, muscle/equipment filters, count, 2-column cards, cached/offline label, and detail sheet with source/provenance.

## Components
- **TopBar** (Transparent / `.glass-pill` on scroll)
- **GlassPillInput** (Variant: search)
- **SegmentedTabs** (Single-select for muscle, multi-select for equipment)
- **GlassNavBar**
- **OfflineBanner / SyncStatus** (Variant: offline cache notice)
- **NEW: ExerciseTileCard:** SolidCard base for dense data legibility. Contains image, text, and difficulty meter. One-line rationale: Grid tiles require a specialized, ultra-clean composition optimized for masonry layouts without internal glass glow (obeying the selective glass rule).
- **NEW: DifficultyMeter:** Compact 3-bar ordinal indicator (Beg/Int/Adv). One-line rationale: Existing progress bars imply continuous percentage, whereas difficulty is strictly ordinal (1, 2, or 3).
- **Sheet** (Variant: `half` for exercise details)
- **BtnPrimary** (Contextual CTA inside Sheet)
- **BtnSecondary** (Retry actions)
- **HonestNullState** (For unrated data)

## Data Honesty
- **Exercise Difficulty Metric:**
- 1.  **Real:** 3-bar DifficultyMeter filled appropriately (e.g., 2/3 bars). Provenance: inherent database property (`exercise.difficulty`).
- 2.  **Low-confidence:** *Not applicable*. Difficulty is an absolute categorical property of the exercise, not a synced user metric.
- 3.  **Honest-null:** Empty 3-bar track with "Unrated" text label.
- **Result Count Metric:**
- 1.  **Real:** "[N] *exercises*" (e.g., 532 exercises). Provenance: Exercise DB size.
- 2.  **Low-confidence:** *Not applicable*. Count is either exact or zero.
- 3.  **Honest-null:** Zero results state (Empty State UI replaces count).
- **Instructional media/form cues:**
- 1. **Real:** media/source label from the exercise database or uploaded coach asset.
- 2. **Low-confidence:** thumbnail pending or form cue unverified, marked `estimated · low confidence`.
- 3. **Honest-null:** no media slot; text instructions remain, with no fake thumbnail.

## Consent and Safety
- Exercise database/source chips open data controls: database version, source, freshness, export saved exercise selections, revoke imported plan source, and delete saved exercise history.
- Exercise Library treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Detail sheet includes form-safety boundary copy and avoids diagnostic or rehab claims unless a licensed source is explicitly cited.
- Keep navigation targets aligned to `/exercises`, `/exercises/[id]`. Do not add alternate vanity routes.

## States
- **Default:** 2-col masonry grid, scrollable, filters accessible.
- **Skeleton:** 2-column shimmer block grid (`--surface-3` base, 1.2s sweep) matching card geometry.
- **Empty:** Centered search glyph, "No exercises found", (no BtnPrimary as filters are the primary corrective action).
- **Error (List):** Centered offline cloud glyph, plain language Body text, BtnSecondary `retry`. Filters visible but inert.
- **Error (Detail):** Sheet opens to skeleton, resolves to failure message + BtnSecondary `retry` after 5 seconds.
- **Success (CTA):** "Add to workout" BtnPrimary transitions to forest green `BtnSuccess` fill with text "Added" for 600ms.
- **Disabled:** BtnPrimary disabled (40% opacity) during network mutation (prevents double-taps).

## Motion
- **Physical easing:** 250ms standard feedback, 520ms `ease-flow` spring for the detail Sheet.
- **Grid entry:** DifficultyMeter bars animate their "rise" (transform Y) as they enter the viewport.
- **Tap interactions:** Cards scale to `.97` with light haptic on tap. Filter changes crossfade the grid (280ms).
- **Glow behavior:** Active filter chips bleed a subtle orange glow (`glow-you`).
- **Reduced motion (`prefers-reduced-motion`):** Grid crossfades and DifficultyMeter bar rises are bypassed; elements render instantly at final state. Sheet slides up without spring interpolation.

## Image Slots
- `HIFI-70-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Exercise Library instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/exercises`, `/exercises/[id]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper-100 `#FEFAF3` on `--surface-2` `#211008` easily surpasses AA+ contrast for text.; **Targets:** 44px minimum targets strictly enforced for TopBar actions, filter chips, cards, and the bottom Sheet grabber/CTA zone.; **Screen-reader labels:** cards announce exercise name, muscle group, equipment, difficulty, source, and whether media/form cues are available.
