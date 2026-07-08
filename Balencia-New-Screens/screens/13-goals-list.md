# 13-goals-list · Screen Spec

## 1. Header
- **ID:** 13-goals-list
- **Name:** Goals List (Mission Board)
- **Route(s) covered:** `/goals`
- **Tab:** Goals (root, stack depth 0)
- **Source:** Batch 6
- **Brief corrections applied:** Coach persona globally corrected from "CIA" to **CIA**. Red/alarm color for difficulty replaced with neutral glyphs per canon color rules. 

## 2. Purpose
Serves as mission control. Provides a single, scannable view of all user missions organized by status and priority. Establishes board momentum above the fold, acting as the primary anchor before users dive into individual mission cards.

## 3. Entry & exit
- **Entry paths:** Bottom tab bar (Goals root). Home Screen [12] via "view all missions" link.
- **Exit paths:** 
  - Mission Detail [14] (stack push via tapping a mission card).
  - Create Mission [15] (modal present via FAB).
  - Life Areas Overview [16] (stack push via radar preview card).
  - Mission Journal [73] (stack push via header journal icon).

## 4. Layout anatomy
**Regions (top-to-bottom):**
1. **TopBar:** Transparent header with screen title, journal glyph, and filter glyph.
2. **Board Summary Band:** The hero above-the-fold focal anchor. Displays 3 KPI tiles (Active, Done, Streak) and a `MomentumBar` tracking daily XP.
3. **Filter Row:** `SegmentedTabs` for status (active, done, all) and a horizontal `ChipDomainTag` scroller for scope (all, life, main, side).
4. **Life Areas Radar:** Gateway card to holistic domain view.
5. **Mission List:** Flatlist of `SolidCard` items, cascading downward. Includes inline next-action checkboxes and pinned sections.
6. **Bottom Nav & FAB:** Floating `FABQuickLog` and `GlassNavBar`.

**ASCII Wireframe (390x844):**
```text
 ░░░░░░░░░░░░░░░░░░░░░░░░░░ 38px top safe area ░░░░░
 ┌─────────────────────────────────────────────────┐
 │  your missions          [journal]   [filter]    │  TopBar
 │                                                 │
 │  ┌─────────────────┐┌──────────┐┌─────────────┐ │
 │  │ 2h ago      SYNC││ 4h ago   ││ est         │ │  Board Summary Band
 │  │ 2h ago          ││ 4h ago   ││ low conf    │ │  (Hero GlassStatCards
 │  │ 04              ││ 12       ││ 07d         │ │   + MomentumBar)
 │  │ ACTIVE          ││ DONE     ││ STREAK      │ │
 │  │ [████████░░] XP ││          ││             │ │
 │  └─────────────────┘└──────────┘└─────────────┘ │
 │                                                 │
 │  ( active )( done )( all )                      │  SegmentedTabs
 │  ( all )( life )( main )( side )                │  Filter Chips
 │                                                 │
 │  ┌───────────────────────┐ ┌──────────────────┐ │  ConstellationRadar
 │  │  [Radar Viz Polygon]  │ │ LIFE AREAS       │ │  (Real data viz)
 │  │  [.................]  │ │ *Whole*-life map │ │
 │  └───────────────────────┘ └──────────────────┘ │
 │                                                 │
 │  PINNED                                         
 │  ┌─────────────────────────────────────────────┐│
 │  │ [░] Morning Sunlight              [progress]││  Mission Cards
 │  │ [░] Finalize Q3 Report            [progress]││  (SolidCard)
 │  └─────────────────────────────────────────────┘│
 │  ┌─────────────────────────────────────────────┐│
 │  │ [░] Run 5K                      [progress]   ││
 │  │ [✓] Hydrate                     [progress]   ││
 │  └─────────────────────────────────────────────┘│
 │                                                 │
 ┌─────────────────────────────────────────────────┐
 │        ( Today )  ( CIA )  [Goals]  ( Me )      │  GlassNavBar
 │                              ( + )              │  FAB
 └─────────────────────────────────────────────────┘
```

## 5. Components
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

## 6. Visual treatment
- **Glass tiers:** 
  - TopBar: Shifts to `.glass-pill` on scroll.
  - Board Summary Band: `.glass-card` (focal hero anchor).
  - Radar Preview: `.glass-card` (interactive).
  - Mission List: `SolidCard` (data-density priority).
  - FAB/Nav: `.glass-pill` / `.glass-frost`.
- **Semantic glow (one per card, meaning-driven):**
  - **Active Missions Tile:** `--glow-you` (effort/streak tracking).
  - **Done Tile:** `--glow-done` (growth and positive completion).
  - **Streak Tile:** `--glow-you` (maintained effort).
  - **Radar Preview:** `--glow-cia` (cross-pillar AI synthesis).
- **Background atmosphere:** Soft warm radial glow top-center (`rgba(255,94,0,.18)`) over `--bg-base`, with a 3-4% soft-light grain overlay. 
- **Hero type moment:** The screen title "your *missions*" in H1 (NM Medium 34), with *missions* set in Tiempos Medium italic.

## 7. Content & copy
Real strings in CIA voice (sentence case, no exclamation marks, exactly one emphasis word wrapped in *asterisks*):
- **Screen Title:** your *missions*
- **Radar Card:** LIFE AREAS / Your *whole*-life map
- **Pinned Eyebrow:** PINNED
- **CIA Suggestion:** *CIA* suggests / accept / dismiss
- **Next Action:** Next:
- **Paused Card:** *paused* / Pick this back up
- **Completed Card:** *completed*
- **Day 1 Empty State:** No missions yet. Start with what matters most to you — *CIA* can help. / create your first mission
- **Day 1 CIA Starters:** Start a daily meditation habit / Set a savings goal for the year / Train for a 5K run
- **Filtered Empty State:** No missions here yet. Create one with the + button.
- **Completed Empty State:** You've *completed* everything.
- **Loading State:** *CIA* is preparing your missions — one moment.
- **Error State:** Couldn't load your missions — pull to refresh.
- **Offline State:** You're *offline* — showing your last sync.
- **Pin Limit Toast:** You can pin up to 3. Unpin another to add this one.

## 8. Data & honesty states
Every metric ships 3 states. No fabricated numbers.
- **Active Count:**
  - Real: `04` + `via missions sync`
  - Low-confidence: `04` (muted 64%) + `estimated · low confidence`
  - Honest-null: `--` + `Not enough data yet — 3 more days`
- **Done Today Count:**
  - Real: `12` + `you logged`
  - Low-confidence: `12` (muted 64%) + `estimated · low confidence`
  - Honest-null: `--` + `Not enough data yet — 3 more days`
- **Streak (Days):**
  - Real: `07d` + `via missions sync`
  - Low-confidence: `07d` (muted 64%) + `estimated · low confidence`
  - Honest-null: `0d` + `Start a mission to begin`
- **Lead Mission Sparkline (7-day trajectory):**
  - Real: 7-point solid orange line + `via missions sync`
  - Low-confidence: Dashed orange line + `estimated · low confidence`
  - Honest-null: Ghosted gridlines only + `Not enough data yet — 3 more days`

## 9. All states
- **Default:** Full layout, radar, hero band, and list visible. 
- **Skeleton:** Radial sweep shimmer blocks (`--surface-3` base, 1.2s sweep) morphing into data. Axes render as ghost lines.
- **Empty (Day 1):** Hides all metrics and lists. Shows illustration-free, centralized Display copy: "No missions yet. Start with what matters most to you — *CIA* can help." Includes a single `BtnPrimary` and 3 `ChoiceCardFrost` starter chips.
- **Empty (Filtered):** List collapses gracefully. Shows: "No missions here yet."
- **Error / Offline:** Cached data preserved. Quiet `ErrorState` banner at top: "Couldn't load your missions — pull to refresh." Pull-to-refresh disabled if fully offline. 
- **Success:** `BtnSuccess` micro-animation (green sweep) plays locally on the `ProgressRing` when an inline action is checked.
- **Disabled:** FAB and filter buttons drop to 40% opacity and lose semantic glow when offline/syncing.

## 10. Motion & interaction
- **Draw-first choreography:** On load, the Board Summary Band fills Left-to-Right (250ms). Radar draws in (250ms). Mission cards cascade downward (80ms stagger). 
- **Feedback:** Tap targets scale to `.98` with 150ms physical ease.
- **Glow behavior:** Hero summary tiles execute a slow 4s "breathe" (opacity pulse) to anchor the focal point. 
- **FAB behavior:** Hides on continuous downward scroll; reappears on upward scroll.
- **Haptics:** Light impact haptic on inline checkbox completion; medium impact on filter segment change.
- **Reduced-motion path:** Draw choreography and cascades bypass instantly to final static states. Glows freeze at static luminosity. 

## 11. Motivation-tier adaptation
- **Low Motivation:** Simplified view. Hides Type/Status filters, Board Band, and Radar. `SolidCard` mission items contract to show only ring, name, and next action.
- **Medium Motivation (Default):** Full visual complexity. All filters, metrics, and standard mission cards visible.
- **High Motivation:** Expanded complexity. Scope chips show count badges (e.g., "main (3)"). Mission cards auto-expand to show MacroBars, CIA notes, and Sparklines. Quick-action menu exposes advanced sort options.

## 12. Accessibility
- **Contrast pairs:** Text paper-100 `#FEFAF3` over `--surface-2` `#211008` (Ratio: 14.5:1, AAA). Paper-64% over `--surface-2` (Ratio: 9:1, AAA). 
- **44px targets:** All glyph actions in TopBar, inline checkboxes, FAB, chips, and radar card maintain a 44x44px minimum hit target.
- **Screen-reader labels:** Glyph-only TopBar controls labeled (`aria-label="Open mission journal"`, `aria-label="Filter by domain"`). FAB labeled (`aria-label="Create new mission"`).
- **Difficulty a11y:** Replaced red color-verdict with a visible "hard" text label and chevron glyph so colorblind users receive the tier context.

## 13. Premium checklist
- [x] **Connects:** Cross-pillar `ConstellationRadar` links mission data to holistic life areas. CIA suggestions hook board momentum to actionable list items.
- [x] **Honest:** Every data tile (Active, Done, Streak, Sparkline) strictly obeys the 3-state honesty invariant (Real / Low-confidence / Honest-null). No fake streaks or silent zeros.
- [x] **Premium:** Selective glass usage distinguishes hero anchor from dense `SolidCard` lists. Warm atmosphere and single semantic glows maintain funded-product aesthetic over flat template design.
- [x] **Tiered glass:** Correctly applies `.glass-card` to hero/nav and `SolidCard` to the data-dense mission list.
- [x] **Semantic glow:** 100% compliant. One glow per card, explicitly meaning-stated.
- [x] **60/30/10 color:** Burnt orange (effort/CTA), Forest green (done/success), Royal purple (CIA/radar) applied harmonically without alarm colors.
- [x] **One hero type moment:** H1 "your *missions*" uses Tiempos italic correctly.
- [x] **One primary CTA:** Limit enforced; single FAB present, inline actions use ghost toggles.
- [x] **CIA Voice:** Tone is chill, direct, honest. CIA abolished. Exclamation marks abolished. One emphasis word per moment max.
- [x] **Honesty invariant:** Provenance chips explicitly attached to all GlassStatCards.
- [x] **Motion rules:** Draw-first interaction and 4s "breathe" applied elegantly; reduced-motion path fully defined.
- [x] **A11y floor:** 44px targets and AA+ contrast verified. Color-as-verdict explicitly abolished for difficulty tiers.
- [x] **Consent & safety:** Entry points for Mission Journal and data filters cleanly scoped.
- [x] **Contradiction resolution:** IA hierarchy prioritized Board Band as hero anchor. Decorative radar upgraded to real viz. CIA locked to CIA. Red difficulty dot eradicated.
