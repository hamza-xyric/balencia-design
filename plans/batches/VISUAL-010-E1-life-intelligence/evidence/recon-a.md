# VISUAL-010 E1 — reconciliation A evidence

Read-only worker evidence for screens `16,20,48`. This is not an acceptance or readiness decision.

## Source hierarchy reconciliation

- The current RPG authority defines exactly ten 0–99 domain stats and the canonical order/names (`RPG_SYSTEM_DESIGN.md:31-48`); the correlation authority repeats the same ten nodes (`LIFE_CORRELATION_MATRIX.md:34-51`). The older S16 hi-fi spec still describes nine axes/domains and 8/9 reporting (`Balencia-New-Screens/hifi-screens/16-life-areas-overview.md:95-105,111-128,144-151`). Per the batch tie-breaker, those nine-domain portions are stale, not an unresolved implementation choice.
- Two distinct aggregate formulas exist in the RPG authority: `overall_power = weighted_average + balance_bonus` (`RPG_SYSTEM_DESIGN.md:132-148`) and competitive Character Power/CP = `sum(active stats) * balance_multiplier` (`RPG_SYSTEM_DESIGN.md:166-173`). The live shared helper implements the latter (`balencia-screens/src/components/hifi/kit/data.tsx:65-79`) but the rendered component calls it “Life Power” (`data.tsx:112-124,166-169`). This naming/formula mismatch is live and requires Sol adjudication; do not silently treat CP and overall power as synonyms.
- Correlation weights represent symmetric co-movement, explicitly not causality (`LIFE_CORRELATION_MATRIX.md:53-59`). User-specific claims need the base/personal/temporal layer and confidence truth (`LIFE_CORRELATION_MATRIX.md:61-110`), not a bare matrix color or definitive sentence.
- The compact canon requires real/low-confidence/honest-null states for every metric and consent/data exits on relevant screens (`Balencia-New-Screens/canon/COMPACT-CANON.md:72-88`). The catalog specifies the corresponding metric, consent, error, skeleton, offline and locked components (`Balencia-New-Screens/canon/COMPONENT-CATALOG.md:56-70,110-128`).

## Screen 16 — Life areas

### Exact live fixture and formulas

- Ten ordered records are hardcoded: Fitness `58/Workout log/+4/+7`, Sleep `50/Health/+1/+3`, Career `46/Calendar/-3/-1`, Nutrition `43/You logged/+2/+5`, Finance `38/You logged/+1/+2`, Faith `32/You logged/+2/+4`, Productivity `49/Calendar/+3/+6`, Relationships `44/You logged/+2/+3`, Wellbeing `40/Mood check-ins/+2/+5`, Meditation `33/Session log/+1/+4` (`balencia-screens/src/components/hifi/screens/intelligence/S16LifeAreas.tsx:6-17`).
- Live `average` is `round(433/10) = 43`; strongest are Fitness and Sleep and weakest is Faith, derived by sorting (`S16LifeAreas.tsx:19-21`). Current/Vs-week/Vs-month trend arrays resolve respectively to `[39,40,41,40,42,42,43]`, `[40,41,40,42,42,42,43]`, and `[36,37,38,39,40,42,43]` (`S16LifeAreas.tsx:22-27`).
- The radar validates exact ten-domain membership/order/finite values (`kit/data.tsx:21-63`), clamps each value to 0–99, computes CP-style score from the ten-value sum and coefficient-of-variation multiplier, and exposes all sources in one image label (`kit/data.tsx:65-79,97-125`). For this fixture its displayed aggregate is `486` (sum `433`, multiplier about `1.122`), while the separate Average pill is `43` and Reporting is `10/10` (`S16LifeAreas.tsx:41-45`).

### State, controls, focus, and actions

- `Current` is the only initial state; the three comparison states are mutually exclusive in React state (`S16LifeAreas.tsx:29-31,58-61`). Each comparison is now a native 44px-min button through interactive `Chip`, with `aria-pressed` and the shared focus ring (`kit/chips.tsx:51-61`). This makes the audit's “decorative comparison chips” claim stale (`E1-life-intelligence.md:27`).
- Data sources is now an interactive link to `/screens/84` (`S16LifeAreas.tsx:34`), so the audit's claim that it is decorative is stale. It does not preserve a filtered category/domain/scope query and is not the complete per-domain consent sheet required by the spec (`16-life-areas-overview.md:138-142`), so that deeper gap remains live.
- Domain rows are non-native `div`s, not the spec's tappable 56px navigation rows (`S16LifeAreas.tsx:63-83` versus `16-life-areas-overview.md:104-105,158-160`). There are no row actions, source chips, filtered consent entry, null/stale/failed states, or per-row AT summaries. `ProgressBar` itself has no role/name/value (`kit/data.tsx:3-9`).
- Only default populated and the three comparison views exist. Skeleton, cold-start, total/partial error, locked upsell, offline and reduced-data treatments required by the spec are absent (`16-life-areas-overview.md:144-159`). The current comparisons are all unlocked, which conflicts with the older spec's premium locks (`16-life-areas-overview.md:151`) and needs product disposition rather than accidental preservation.

### Risks and dependencies

- The ten-axis radar repair and 10/10 reporting make the audit's old eight-spoke/seven-point `MiniRadar` defect stale (`E1-life-intelligence.md:27`); the current polygon/grid/labels all derive from the same ten-item array (`kit/data.tsx:106-164`). The live aggregate still carries the formula/name conflict above.
- At 390×844, the fixed 240px radar fits its card, but ten labels at 10px (`kit/data.tsx:115-168`) and ten domain rows below it create a long scroll; at 125% text zoom the fixed `86px 1fr 50px` columns and long labels such as “Relationships” risk crowding/wrapping (`S16LifeAreas.tsx:67-78`). Verify no horizontal overflow and no label/value collision.
- Shared dependencies: `LifePowerRadar`, `calculateLifePower`, domain registry/assertion, `Chip`, `ProgressBar`, `Sparkline`, `Provenance`, `MetricPill`, `TopBar`, `HifiShell`, cards and shell/nav. Changing `data.tsx`, `chips.tsx`, or chrome is shared-kit work and must remain serialized.
- Asset disposition: none; the spec explicitly requires no image slot (`16-life-areas-overview.md:162-163`).

### Proposed deterministic verifier cases

1. Default screenshot + DOM assertions: ten domain labels in canonical order; `data-domain-count="10"`; Reporting `10/10`; Average `43`; radar accessible label begins `Life Power 486` and includes every source.
2. Click `Vs week`, then `Vs month`, then `Current`: assert exactly one pressed chip each time; row values switch to the exact deltas above and return to exact scores; trend accessible arrays match the selected fixture.
3. Keyboard tab/Enter/Space through Data sources and all three selectors; assert visible focus and target boxes at least 44×44; Data sources href is `/screens/84`.
4. 390×844 and 125% text screenshots at top and domain-list scroll position; assert no horizontal overflow, clipped labels, overlaps, or hidden controls.
5. Static hard assertions that the payload count/order is ten and no `8/9`, `9 domains`, or separate hardcoded score appears.

## Screen 20 — Book of life / memory

### Exact live fixture and claim truth

- Default is statically the Correlations chapter with six chapter tabs, `18 entries`, timestamp `Last updated 2h ago`, and no stateful tab selection (`balencia-screens/src/components/hifi/screens/intelligence/S20CiaMemory.tsx:26-28,47-71`). The graph encodes confirmed Sleep↔Fiber and Cia-inferred Sleep↔Spend edges and exposes that summary as one `role=img` (`S20CiaMemory.tsx:73-101`).
- Entry 1 claims same-night high-fiber/deeper-sleep correlation, tags Nutrition/Wellbeing, shows `78% high`, six of eight confidence ticks, and only `Detected from data · 2d ago` (`S20CiaMemory.tsx:104-128`). It lacks both named sources, sample/window, confidence method and citations; those are required for an inspectable personal correlation under the matrix's personal-confidence model (`LIFE_CORRELATION_MATRIX.md:77-83,97-110`).
- Entry 2 makes the definitive claim that workouts are skipped most often after under-six-hour nights, but its only confidence copy is `Needs more data to score` and it has no provenance (`S20CiaMemory.tsx:130-150`). This is a live truth conflict: an honest-null confidence state must not accompany an unqualified personal pattern claim.

### State, controls, focus, and actions

- Search is now a labelled native input with a 52px shell and focus-within ring (`S20CiaMemory.tsx:45`; `kit/glass-pill-input.tsx:19-69`), so the audit's “visual div” claim is stale (`E1-life-intelligence.md:28`). It has no query/results/clear behavior in this static component.
- Chapter tabs, settings, edit, wrong and delete are native buttons with 44px-min shared treatments (`S20CiaMemory.tsx:35-38,47-69,121-127,143-148`; `kit/chrome.tsx:65-75`; `kit/buttons.tsx:68-83`). They have no handlers, tabpanel linkage, sheets, confirmation or undo; perceived operability therefore remains a live defect.
- The graph is one summarized image, not selectable nodes. Required mutually exclusive node detail, search-active, edit, success, failure and offline states are spec-only (`20-personal-wiki-cia-memory.md:113-129`). Upload/processing/citation/medical-gate/document→wiki states cited by the E1 audit are also absent from the live file (`E1-life-intelligence.md:28,39`).
- ConsentRail currently links only Source, Retention, Export, Revoke and Delete to `/screens/84?control=...` (`kit/chips.tsx:91-115`; `S20CiaMemory.tsx:152-155`). This is stronger than the audit's old generic-five characterization but still omits Category, Scope, Freshness and Confidence required by canon/spec (`20-personal-wiki-cia-memory.md:108-111`); each claim also needs its own evidence/consent path.

### Risks and dependencies

- At 390×844, horizontal overflow is intentional for the six tabs (`20-personal-wiki-cia-memory.md:80-84`). At 125%, the fixed graph labels at 11px and action row with two text buttons plus delete icon risk compression; verify the buttons do not overlap or shrink below their hit areas (`S20CiaMemory.tsx:90-100,121-127`).
- Visible uppercase `CIA` remains live across title/graph/copy (`S20CiaMemory.tsx:80,99,153`) and conflicts with the audit's target `Cia` casing (`E1-life-intelligence.md:17`).
- Shared dependencies: native `GlassPillInput`, `IconButton`, `BtnGhost`, `ConsentRail`/`Chip`, `TopBar`, shell/nav and cards. Asset disposition: none (`20-personal-wiki-cia-memory.md:131-132`).

### Proposed deterministic verifier cases

1. Default screenshot + assertions for six tabs, only Correlations `aria-selected=true`, 18 entries, exact graph accessible label, 78%/6-of-8 confidence, and honest-null second confidence.
2. Keyboard sequence through search, six tabs, settings, edit/wrong/delete controls and five consent links; assert visible focus and ≥44×44 targets.
3. Assert settings/tabs/edit/wrong/delete are either wired to deterministic prototype state/actions or explicitly rendered non-affordant; prohibit inert native controls.
4. Fixture/state screenshots for search-active, node-selected (only one detail), edit, flag sheet, delete confirmation, save success/error, offline cached, empty Day 1, and document upload→processing→citation/medical-gate path.
5. Claim assertions: both source names, sample/window, freshness, confidence method, citation/non-causal boundary for scored correlations; no definitive claim when confidence is honest-null.
6. 390×844 and 125% screenshots at default/action rows; assert tab scroll remains usable, no page horizontal overflow, and no action overlap.

## Screen 48 — Intelligence dashboard

### Exact live fixture

- Static daily score is `87`, delta `+3`, freshness `2h`, sources “wearable, logs, and mission activity” (`balencia-screens/src/components/hifi/screens/intelligence/S48Intelligence.tsx:7-15`). No inspectable score formula, source count or confidence state exists.
- The only contradiction is logged sleep `8h` versus WHOOP `5.5h`, with source display chips but no resolve/dismiss controls (`S48Intelligence.tsx:17-21`).
- The matrix is 25 unlabeled spans: indexes divisible by 6 are neutral diagonal, otherwise indexes divisible by 4 are green, all remaining cells orange (`S48Intelligence.tsx:22-30`). It has no axes, cell values, role, names, direction/strength legend, source, window or confidence per cell.
- Trend uses Sparkline's default values `[62,66,68,65,70,72,74]` and labels it “Projected by CIA / Low confidence” (`S48Intelligence.tsx:31-32`; `kit/data.tsx:441-457`), but the component renders an area fill that is always orange even when `tone="cia"` (`kit/data.tsx:450-456`). Best-day fixture is `7h sleep, meditation, one workout, early meal`, `4/5`, 80% (`S48Intelligence.tsx:33-42`).

### State, controls, focus, and actions

- Manage data, both contradiction source labels, `Legend`, and `7d / 14d / 30d` are display text/chips, not controls (`S48Intelligence.tsx:5,17-32`); the audit's inert-control classification remains live (`E1-life-intelligence.md:29`). No local focusable control exists besides shared back/nav.
- Default populated is the only state. Low-confidence applies only as an unstructured trend chip; score/cells/formula lack real/low/null triples. Skeleton, partial, per-section error, offline, resolved-success and full-route paywall states required by the spec are absent (`48-intelligence-dashboard.md:122-147`).
- The spec requires pillar sparklines, weekly report, outlook, recent insights, feedback, graph handoff and contradiction resolution/dismissal (`48-intelligence-dashboard.md:106-120`); none appear in the product component (`S48Intelligence.tsx:3-46`).

### Risks and dependencies

- The audit's collision is live: a fixed 160px `ArcGauge` (`kit/data.tsx:180-192`) is placed in a 110px grid column (`S48Intelligence.tsx:9-14`). It necessarily overflows the first track by 50px before gap/content and is higher-risk at 125% when the adjacent prose wraps.
- `ArcGauge` does have `role=img` through its outer `div`, so the audit phrase “aria-label but no role” is stale (`kit/data.tsx:180-183`). It still lacks a numeric `aria-valuenow` contract because it is an image, not a meter.
- Visible uppercase `CIA` remains live (`S48Intelligence.tsx:19,32`). Matrix color cannot carry meaning alone and its cells are 28px high (`S48Intelligence.tsx:24-27`), below interactive size if converted without redesign.
- Shared dependencies: `ArcGauge`, `Sparkline`, `ProgressBar`, `Chip`, `Provenance`, `TopBar`, shell/nav and cards. Asset disposition: none (`48-intelligence-dashboard.md:156-157`).

### Proposed deterministic verifier cases

1. 390×844 and 125% screenshots plus bounding-box assertions: gauge box entirely within hero/card/grid, zero overlap with delta/provenance, zero horizontal overflow.
2. Default fixture assertions for 87/+3/2h, exact contradiction values/sources, 25 cells with 5 neutral diagonal cells, exact trend array/provenance, and best-day 4/5/80% agreement.
3. Matrix semantics: five named axes; 25 programmatically named cells; diagonal explicitly “not applicable”; non-diagonal cells expose direction, strength, window, freshness and confidence; legend is a native ≥44px control with focus.
4. Native actions and keyboard cases for Manage data, Resolve, Dismiss, timeframe tabs, feedback, See all and graph handoff; exactly one timeframe selected and visible focus throughout.
5. State screenshots/assertions for score real/low/null, days-1–3 partial, per-section error, offline stale, contradiction-resolving/loading/success, and premium route gate.
6. Assert every personal-pattern sentence is non-causal and supplies sources/sample/window/freshness/confidence; no claim is rendered for honest-null evidence.

## Cross-screen live issues

- Casing: all three product files still show uppercase `CIA` (`S16LifeAreas.tsx:54`; `S20CiaMemory.tsx:80,99,153`; `S48Intelligence.tsx:19,32`), so the audit's casing finding is live.
- Honesty/state coverage remains substantially incomplete despite S16's repaired registry and S20's repaired native input. Comments describing absent states are not rendered evidence (`S20CiaMemory.tsx:16-24`).
- No raster/image asset is required for any of these three screens; retain zero new raster assets.
- Shared-kit edits are a serialization boundary. Screen-local remediation can consume existing native primitives, but any changes to `data.tsx`, `chips.tsx`, `chrome.tsx`, `glass-pill-input.tsx`, buttons, surfaces or shell/nav affect consumers outside this packet and need root review.
