# 13-goals-list - A+++ hi-fi mobile spec

## Header
- **Source ID:** 13
- **Source spec:** `Balencia-New-Screens/screens/13-goals-list.md`
- **Evidence:** screens/13-goals-list.md, work/briefs/13.md, work/drafts/13.md, Batch 6
- **Route(s):** `/goals`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serves as mission control.
- **Premium Visual Director:** make Goals List (Mission Board) hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Goals List (Mission Board) uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
########################## 38px top safe area #####
 +-------------------------------------------------+
 |  your missions          [journal]   [filter]    |  TopBar
 |                                                 |
 |  +-----------------++----------++-------------+ |
 |  | 2h ago      SYNC|| 4h ago   || est         | |  Board Summary Band
 |  | 2h ago          || 4h ago   || low conf    | |  (Hero GlassStatCards
 |  | 04              || 12       || 07d         | |   + MomentumBar)
 |  | ACTIVE          || DONE     || STREAK      | |
 |  | [##########] XP ||          ||             | |
 |  +-----------------++----------++-------------+ |
 |                                                 |
 |  ( active )( done )( all )                      |  SegmentedTabs
 |  ( all )( life )( main )( side )                |  Filter Chips
 |                                                 |
 |  +-----------------------+ +------------------+ |  ConstellationRadar
 |  |  [Radar Viz Polygon]  | | LIFE AREAS       | |  (Real data viz)
 |  |  [.................]  | | *Whole*-life map | |
 |  +-----------------------+ +------------------+ |
 |                                                 |
 |  PINNED
 |  +---------------------------------------------+|
 |  | [#] Morning Sunlight              [progress]||  Mission Cards
 |  | [#] Finalize Q3 Report            [progress]||  (SolidCard)
 |  +---------------------------------------------+|
 |  +---------------------------------------------+|
 |  | [#] Run 5K                      [progress]   ||
 |  | [x] Hydrate                     [progress]   ||
 |  +---------------------------------------------+|
 |                                                 |
 +-------------------------------------------------+
 |        ( Today )  ( CIA )  [Goals]  ( Me )      |  GlassNavBar
 |                              ( + )              |  FAB
 +-------------------------------------------------+

Route handling: `/goals`
```

## Focal Hierarchy
- **Dominant focal moment:** Goals List (Mission Board) hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Board Summary Band, Filter Row, Life Areas Radar, Mission List.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*board*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- `TopBar`: Transparent backdrop that shifts to `.glass-pill` on scroll.
- `GlassStatCard` (variants: `metric`, `ring`, `sparkline`): For the 3 hero summary tiles.
- `MomentumBar`: For the daily XP tracking inside the summary band.
- `SegmentedTabs`: Status control.
- `ChipDomainTag`: Scope filters and card tagging.
- `GlassCard` (variant: `interactive`): Container for the Constellation Radar.
- **NEW:** `ConstellationRadar`: A data-bound radar chart mapping `domainStats`. Rationale: Brief explicitly demands upgrading a decorative polygon into a real-data viz to satisfy the premium/honesty invariant.
- `SolidCard`: Mission list rows (data-dense requirement).
- `ProgressRing`: Embedded in mission cards.
- `HonestNullState`: For missing metric/sparkline data.
- `Sheet` (variant: `action`): Quick-actions menu and domain filter sheet.
- `FABQuickLog`: Global logging CTA.
- `GlassNavBar`: Bottom tab navigation.

## Data Honesty
- Every metric ships 3 states. No fabricated numbers.
- **Active Count:**
- - Real: `04` + `via missions sync`
- - Low-confidence: `04` (muted 64%) + `estimated  low confidence`
- - Honest-null: `--` + `Not enough data yet - 3 more days`
- **Done Today Count:**
- - Real: `12` + `you logged`
- - Low-confidence: `12` (muted 64%) + `estimated  low confidence`
- - Honest-null: `--` + `Not enough data yet - 3 more days`
- **Streak (Days):**

## Consent and Safety
- Goals List (Mission Board) uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/goals`. Do not add alternate vanity routes.

## States
- **Default:** Full layout, radar, hero band, and list visible.
- **Skeleton:** Radial sweep shimmer blocks (`--surface-3` base, 1.2s sweep) morphing into data. Axes render as ghost lines.
- **Empty (Day 1):** Hides all metrics and lists. Shows illustration-free, centralized Display copy: "No missions yet. Start with what matters most to you - *CIA* can help." Includes a single `BtnPrimary` and 3 `ChoiceCardFrost` starter chips.
- **Empty (Filtered):** List collapses gracefully. Shows: "No missions here yet."
- **Error / Offline:** Cached data preserved. Quiet `ErrorState` banner at top: "Couldn't load your missions - pull to refresh." Pull-to-refresh disabled if fully offline.
- **Success:** `BtnSuccess` micro-animation (green sweep) plays locally on the `ProgressRing` when an inline action is checked.
- **Disabled:** FAB and filter buttons drop to 40% opacity and lose semantic glow when offline/syncing.

## Motion
- **Draw-first choreography:** On load, the Board Summary Band fills Left-to-Right (250ms). Radar draws in (250ms). Mission cards cascade downward (80ms stagger).
- **Feedback:** Tap targets scale to `.98` with 150ms physical ease.
- **Glow behavior:** Hero summary tiles execute a slow 4s "breathe" (opacity pulse) to anchor the focal point.
- **FAB behavior:** Hides on continuous downward scroll; reappears on upward scroll.
- **Haptics:** Light impact haptic on inline checkbox completion; medium impact on filter segment change.
- **Reduced-motion path:** Draw choreography and cascades bypass instantly to final static states. Glows freeze at static luminosity.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/goals`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast pairs:** Text paper-100 `#FEFAF3` over `--surface-2` `#211008` (Ratio: 14.5:1, AAA). Paper-64% over `--surface-2` (Ratio: 9:1, AAA).; **44px targets:** All glyph actions in TopBar, inline checkboxes, FAB, chips, and radar card maintain a 44x44px minimum hit target.; **Screen-reader labels:** Glyph-only TopBar controls labeled (`aria-label="Open mission journal"`, `aria-label="Filter by domain"`). FAB labeled (`aria-label="Create new mission"`).
