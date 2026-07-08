# 48-intelligence-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 48
- **Source spec:** `Balencia-New-Screens/screens/48-intelligence-dashboard.md`
- **Evidence:** screens/48-intelligence-dashboard.md, work/briefs/48.md, work/drafts/48.md, Functional content brief (Batch 7), elevated to premium craft pass
- **Route(s):** `/wellbeing/insights`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: The command center where CIA turns scattered logs and synced signals into one honest, whole-life picture: a single daily score, the contradictions between what you reported and what your devices measured, the cross-domain patterns behind your best days, and where things are headed.
- **Premium Visual Director:** make Intelligence dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Intelligence dashboard lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-----------------------------------------+  390x844
|    Intelligence                       |  TopBar (sticky, glass-pill on scroll)
|                                          |   -> manage data sources (consent)
|        ### warm atmosphere glow ###     |
| +--------------------------------------+|
| |  YOUR DAILY INTELLIGENCE             ||  Hero - GlassCard hero, glow-you
| |                                      ||
| |     +---+                           ||
| |    | 87  |   +3 from yesterday      ||  ProgressRing 120pt
| |     +---+   updated 2h ago          ||
| |                                      ||
| |  [Fit ] [Nutr ->] [Well ] [Fin ]  ||  GlassStatCard sparkline x4
| +--------------------------------------+|
|                                          |
|  ACTIVE CONTRADICTIONS                  |  SectionHeader
| +--------------------------------------+|
| |  You report 8h sleep, but WHOOP     ||  CIAInsightCard, glow-cia
| |   shows 5.5h.                       ||
| |   sleep log vs. WHOOP data           ||
| |              [resolve]      [ x ]   ||
| +--------------------------------------+|
|                                          |
|  CROSS-DOMAIN PATTERNS      [legend]    |  SectionHeader + ghost action
| +--------------------------------------+|
| |                                ||  SolidCard - NEW: CorrelationMatrix
| |         (5 active domains)     ||  (5x5 cap, see 5)
| |                                ||
| |                                ||
| |                                ||
| | ----------------------------------  ||  same SolidCard, ranked rows below
| |  On days you meditate, stress is    ||  ListRow
| |  40% lower.        helpful? [][]||
| +--------------------------------------+|
|                                          |
|  TREND                [7d][14d][30d]    |  SectionHeader + SegmentedTabs
| +--------------------------------------+|
| |  ------- solid orange (you) -----   ||  SolidCard - TrendChart
| |  - - - - dashed purple (projected)  ||
| |        o green milestone dot        ||
| +--------------------------------------+|
|                                          |
|  YOUR BEST DAY FORMULA                  |  SectionHeader
| +--------------------------------------+|
| |  x 7h sleep   x meditate  +2 more    ||  GlassCard, glow-done
| |  #####  4/5 factors                 ||  ProgressBar segmented
| +--------------------------------------+|
|                                          |
|  WEEKLY REPORT                  [see all]|  SectionHeader + ghost action
| +--------------------------------------+|
| |  Fitness 82  Nutrition 74  Well 90 ||  KPIRow (SolidCard, collapsed)
| +--------------------------------------+|
|         v expands to 9-tile BentoGrid   |
|                                          |
|  TOMORROW'S OUTLOOK                     |  SectionHeader
| +--------------------------------------+|
| |  91    AI projected                 ||  GlassStatCard metric, glow-cia
| |  based on your Wednesday patterns    ||
| +--------------------------------------+|
|                                          |
|  RECENT INSIGHTS                        |  SectionHeader
| +--------------------------------------+|
| |  (CIAInsightCard stack, feedback)    ||
| +--------------------------------------+|
|                                          |
| +--------------------------------------+|
| |  explore your health knowledge graph ||  ListRow (nav-only, no glow)
| +--------------------------------------+|
+-----------------------------------------+

Route handling: `/wellbeing/insights`
```

## Focal Hierarchy
- **Dominant focal moment:** Intelligence dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** *CIA voice with CIA only when the source supports a synthesized read.
- **Operational layer:** Hero overline, Hero empty, Hero timestamp, Contradiction section title.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back chevron (44px), title "Intelligence," one trailing glyph action ("") opening the data/consent menu.
- **GlassCard** `hero` variant - score ring container, radius 40, Display type permitted.
- **ProgressRing** - 120pt score gauge, orange fill, flips green only if the composite score itself hits a completion threshold (it doesn't here - this is a daily score, not a progress-to-goal metric, so the ring stays orange/`glow-you` throughout).
- **GlassStatCard** `sparkline` variant x4 - the 4 pillar mini-trends inside the hero card. *Correction:* the draft invented an uncatalogued "SparklineRow" component; the catalog already covers this via `GlassStatCard`'s `sparkline` variant, used here in a 4-up inline row rather than as a NEW component.
- **CIAInsightCard** - contradictions (glow-cia) and recent insights (glow-cia). Actions map to catalog buttons exactly: `resolve` = `BtnCoach` (purple, CIA-initiated), dismiss `x` = `BtnGhost`.
- **NEW: CorrelationMatrix** - compact grid mapping correlation strength (cell opacity) and direction (green fill = reinforcing, orange fill = competing-for-attention, never red) between domains. *Rationale:* a ranked list alone can't show multivariate density at a glance; a matrix gives an instantly-parseable systemic view that a text list can't. *Mobile-reality correction:* the draft implied a full NxN grid across all 9 canon domains (81 cells) - illegible and untappable at 390px. Capped to a 5x5 grid of the user's 5 most-active domains; the full 9-domain map lives one tap away at Knowledge Graph [72], which the closing nav-link card already points to. Diagonal (domain x itself) cells render neutral and non-interactive - self-correlation isn't a real metric and showing one would be fabricated data.
- **SolidCard** - houses the matrix and its ranked `ListRow` coaching rows *together*, in one container. *Correction:* the draft's ASCII stacked a glass `ListRow` directly under a solid matrix as two separate visual pieces - a flat/glass sandwich canon 2 explicitly forbids ("never mix flat and glass in one composition"). Consolidated into a single `SolidCard` region.
- **SectionHeader** - every section label (Contradictions, Cross-domain patterns, Trend, Best day formula, Weekly report, Tomorrow's outlook, Recent insights), with trailing ghost actions where there's somewhere to go (`legend`, `see all`).
- **SegmentedTabs** - 7d / 14d / 30d trend selector.
- **TrendChart** - solid orange user line, dashed purple projection, green milestone dots.
- **ListRow** - ranked correlation coaching copy (trailing chevron slot repurposed as a thumbs-up/down feedback toggle pair - a controlled reuse of the existing trailing-toggle slot, not a new component); also the closing Knowledge Graph nav link (leading icon, label, trailing chevron, no glow - pure navigation chrome, not a data card).
- **ProgressBar** `segmented` variant - Best day formula factor tracker.
- **KPIRow** - Weekly report's collapsed headline (3 domains, one SolidCard).
- **BentoGrid** - Weekly report expanded state: all 9 domains as `SolidCard` tiles (2-col, gap 12). Tiles are solid, not glass - this is a data-dense grid, and canon reserves per-card glow for glass tiles; 9 simultaneous glows would also violate the "generous, one hero glow" restraint the atmosphere depends on.

## Data Honesty
- *Every metric ships its 3-state honesty triple. No fabricated numbers, anywhere.*
- **Daily score (0-100):**
- - Real: `87`  delta `+3 from yesterday`  `ChipProvenance`: `via WHOOP, you logged`.
- - Low-confidence: KPI at 64% opacity  `estimated  low confidence` caption.
- - Honest-null: `ProgressRing` shows a faint ghost track with `-` at center  `HonestNullState` copy: "Not enough data yet - 3 more days."
- **Pillar sparklines (Fitness / Nutrition / Wellbeing / Finance):**
- - Real: solid orange line, 7 points  `ChipProvenance`: `auto-synced`.
- - Low-confidence: solid line + `estimated` caption.
- - Honest-null: hidden entirely for days 1-3 rather than shown as a dashed ghost - an empty sparkline reads as broken UI, not honest scarcity, so it's simply absent until there's something to show.
- **Correlation matrix (per cell, not just per matrix):**

## Consent and Safety
- Intelligence dashboard lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/insights`. Do not add alternate vanity routes.

## States
- **Default:** data populated, hero breathing, atmosphere visible, all sections resolved to their real/low-confidence/honest-null state as applicable.
- **Skeleton:** shimmer blocks matching layout geometry. `ProgressRing` shows a full faint track with a sweeping shimmer; `TrendChart` shows its axis with a ghost-line draw-in (per `SkeletonState`).
- **Empty / partial (days 1-3):** sparklines hidden (not ghosted), matrix and trend show their honest-null copy, contradictions section hidden entirely - absence of a contradiction is a positive state, not something that needs an empty-state UI.
- **Error:** per-section, inline. The `GlassCard`/`SolidCard` shell keeps its border; only the interior swaps to `ErrorState`: "Couldn't load this section - tap to retry." The rest of the dashboard keeps working - one bad fetch never takes down the whole screen.
- **Offline:** `OfflineBanner`/`SyncStatus` pinned under the TopBar: "you're offline - showing last sync 2h ago." Cards keep showing last-known values with their provenance chips intact - staleness is labeled, never hidden.
- **Success (contradiction resolved):** tapping `resolve` triggers a 150ms inline spinner on the `BtnCoach`, a brief green sweep across the card border (`glow-done`, one-time, not a persistent recolor), then the card collapses out of the stack.
- **Free tier (paywall):** the entire route renders through `PaywallLock` `full-screen` variant - the real layout blurred at 20px behind a centered lock glyph, one line of value copy, and a single `BtnPrimary`: "Unlock with premium." Never a redirect, never a dead end - the shape of the dashboard is still visible, just gated.
- **Disabled:** not applicable, beyond the paywall state above - there's no premium user path where individual modules are manually disabled.

## Motion
- **Easing & durations:** physical ease-out throughout. Micro feedback 150-250ms. Section entrance stagger 80ms.
- **Glow behavior:** hero card breathes continuously (box-shadow alpha 0.8 -> 1.0, 4s loop, per canon 6). Any glow brightens instantly on press (150ms), settles back on release.
- **Haptics:** light impact tick on trend-chart scrub (press-and-hold). Success impact when checking a Best Day factor.
- **Interactions:** matrix cells scale to 0.95 on tap and surface their coaching copy in a small popover. Contradiction cards support swipe-left to dismiss (80px drag threshold triggers collapse), mirroring the `[x]` tap action. Thumbs feedback glyphs scale 1.0 -> 1.3 and settle, then the row shows a quiet "thanks" acknowledgment for 1.5s.
- **Reduced motion (`prefers-reduced-motion: reduce`):** count-up and line-draw entrances resolve instantly to final state. Hero glow freezes at a static mid-alpha rather than breathing. The one-time green success sweep becomes a flat border flash with no travel.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/insights`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** paper-100 #FEFAF3 over warm-dark surfaces (#0A0A0F base, #211008 cards) clears WCAG AA with margin. Overline labels use paper-64% and stay legible at that weight because of the 11pt caps + tracking treatment, not despite it.; **44px targets:** `resolve`/`x`, thumbs feedback glyphs, `SegmentedTabs` segments, and the TopBar chevron/`` all honor the 44px minimum, even where the visual glyph is smaller.; **Screen-reader:** glyph-only controls (``, ``, `x`, thumbs icons) carry explicit `aria-label`s. `ProgressRing` and `TrendChart` expose a single grouped summary rather than reading out raw SVG paths - e.g., "Intelligence score 87, up 3 points from yesterday." Matrix cells announce as "Meditation and stress, strongly reinforcing" rather than a bare percentage.
