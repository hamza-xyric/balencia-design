# 16-life-areas-overview - A+++ hi-fi mobile spec

## Header
- **Source ID:** 16
- **Source spec:** `Balencia-New-Screens/screens/16-life-areas-overview.md`
- **Evidence:** screens/16-life-areas-overview.md, work/briefs/16.md, work/drafts/16.md, Balencia Glass Canon (glass-dark v1)
- **Route(s):** `/life-areas`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Gives the user one honest, whole-life snapshot - "where am I strong, where do I need attention" - by fusing the Life Power score, a 9-domain shape visualization, a 7-week trajectory, and a CIA cross-pillar insight into a single, non-shaming hub.
- **Premium Visual Director:** make Life areas overview hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Life areas overview uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[0,0]-----------------------------------------------[390,0]
|                                                         |
|     life areas                         data sources   | <- TopBar: back  title  consent entry (NEW, see 8)
|                                                         |
|  +---------------------------------------------------+ |
|  | LIFE POWER                              via: calc'd| | <- GlassCard hero, r40, glow-you
|  |                                                     | |
|  |        487   +4                                   | | <- Display KPI, tabular-nums, one hero-type moment
|  |                                                     | |
|  |            .-'''-.                                  | |
|  |         ,-'       '-.                              | |
|  |       ,'   o-------o   ',                           | | <- DomainRadarChart (NEW) - 9 axes, decorative,
|  |      |   o          o   |                           | |    aria-hidden, no per-vertex tap targets
|  |      |     ooooooo     |                            | |
|  |       ',   o          ,'                            | |
|  |         '-.   o    .-'                              | |
|  |            '-...-'                                  | |
|  |                                                     | |
|  +---------------------------------------------------+ |
|                                                         |
|  +---------------------------------------------------+ |
|  |  avg 78  +4  via 9 domains     8/9 reporting     | | <- SolidCard: KPIRow (avg, completeness ring)
|  |  -------------------------------------------------  | |    hairline divider
|  |  last 7 weeks                                       | |
|  |  -------------------------                       | | <- TrendChart, solid orange, green milestone dot
|  +---------------------------------------------------+ |
|                                                         |
|  +---------------------------------------------------+ |
|  |  fitness and mental/wellbeing have held steady -   | | <- CIAInsightCard, glow-cia
|  |   your *anchors* this month. career dipped this     | |
|  |   week - want to set a goal?                        | |
|  |   [Fitness] [Mental/Wellbeing]                      | | <- ChipDomainTag pair (evidence)
|  |   ( Talk to CIA )        ( not now )                | | <- BtnCoach + BtnGhost
|  +---------------------------------------------------+ |
|                                                         |
|  [ current    vs week     vs month  ]              | <- SegmentedTabs, PaywallLock inline on locked segs
|                                                         |
|  +---------------------------------------------------+ |
|  | o Fitness                    82    +4              | | <- DomainStatRow (NEW), 56px, ProgressBar orange->green
|  | -------------------------------------------------   | |
|  | o Nutrition                  76    2              | |
|  | -------------------------------------------------   | |
|  | o Mental/Wellbeing           81    +2              | |
|  | -------------------------------------------------   | |
|  |             6 more - scroll                        | | <- Finance, Career, Relationships, Spirituality,
|  +---------------------------------------------------+ |    Learning, Creativity continue below the fold
|                                                         |
|         ( Today  CIA  Goals  Me )                    | <- GlassNavBar, floating, pinned
+---------------------------------------------------------+

Route handling: `/life-areas`
```

## Focal Hierarchy
- **Dominant focal moment:** Life areas overview hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Hero - GlassCard . with CIA only when the source supports a synthesized read.
- **Operational layer:** Balance trajectory - one SolidCard holding KPIRow ., Temporal selector - SegmentedTabs ., System navigation - GlassNavBar, floating, pinned., Voice.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*overview*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma alias:** `Features` is a visual alias only; app route truth remains `/life-areas`, not `/features`.
- **Evidence tier / canon exception:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session; alignment comes from supplied mock/reference screens plus local prompt/ledger evidence. The warm-light Figma-derived feature-grid entry state is a scoped exception, not a replacement for glass-dark v1 canon. CIA naming, data honesty, and glass-redesign rules remain binding.
- **Feature-grid anatomy:** the visible Figma feature screen is a warm-light 2-column domain card grid, not a radar. Cards use soft pastel backgrounds, domain illustration slots, title/subtitle, and a small diagonal-arrow action in the top-right. Nutrition/Health/Faith skew green, Fitness/Career/Relationship skew peach/orange, Wellbeing/Finance/Learning skew purple.
- **Mapping:** retain the Life Areas analytics/radar as the deeper `/life-areas` state, but add a Figma-faithful `Features` entry state that routes to the same domain dashboards. The entry state is scan-first and card-based; the radar state is insight-first and scroll/deeper.
- **Load more:** include the orange centered `Load More` pill from Figma when fewer than all domains are visible.
- **Entry composition:** top bar title `Features`, warm-light shell, 2-column cards for Fitness, Nutrition, Wellbeing, Finance, Career, Relationships, Spirituality/Faith, Learning, Creativity, and diagonal arrow affordances. Domain cards show only real route labels and do not imply marketing pages.

## Components
- **TopBar** - back chevron (44px target)  title `life areas`  secondary glyph action `data sources` (ADDED, see 8 correction) linking to the consent/data-control surface.
- **GlassCard** (variant: `hero`, radius 40, Display type allowed) - houses the Life Power KPI + embedded radar. The screen's *only* hero-tier glass tile.
- **NEW: `DomainRadarChart`** - rationale: no catalog component plots simultaneous multi-axis domain state; `TrendChart`'s grammar (past/projected/milestone over time) doesn't fit a same-moment, 9-axis shape. Built by reusing CANON 7's exact color grammar rather than inventing new semantics - see 6 for the mapping. Decorative/glanceable only; not an interactive control (see 4, 12 mobile-reality correction).
- **SolidCard** ("Balance trajectory") - houses `KPIRow` + `TrendChart`, hairline divider between.
- **KPIRow** - 2 mini-stats: avg score (delta arrow) and data-completeness (`ProgressRing`, 8/9 domains reporting), each with its own provenance.
- **TrendChart** - 7-week Life Power average, solid orange line, milestone dots.
- **CIAInsightCard** - glow-cia, `ChipDomainTag` evidence pair, actions `BtnCoach` + `BtnGhost` (catalog specifies both; draft rendered `BtnCoach` alone).
- **SegmentedTabs** - current / vs week / vs month; locked segments carry `PaywallLock`'s inline-tile treatment (40% opacity + lock glyph), tap surfaces a lightweight unlock sheet rather than doing nothing (see 9 correction).
- **SolidCard** ("Domain detail") - houses 9 `DomainStatRow`s.
- **NEW: `DomainStatRow`** (ListRow variant) - rationale: base `ListRow` has no inline-`ProgressBar` slot; this variant standardizes domain-color dot, tabular score, delta, and a `ProgressBar` (orange fill, flips green at 100%, same logic as `ProgressRing`) into one 56px row.
- **GlassNavBar** - floating, 4 tabs, pinned.
- **Not rendered, referenced only:** `ConsentCard` - the TopBar's `data sources` glyph opens it; see 8.
- **`FABQuickLog`** - omitted. CANON 8 scopes it to Today-tab screens; this is a secondary drill-down surface reached by deep-link, not a Today landing screen.
- **`SafetyResourceCard`** - omitted here. CANON 8 requires it on "mood/check-in/journal surfaces." This screen surfaces a Mental/Wellbeing *score*, not a check-in flow - the safety layer belongs on that domain's own dashboard [26-36], where mood entry actually happens. Not skipped by oversight; scoped out on purpose.

## Data Honesty
- Every metric renders 3 ways through `ChipProvenance` + the documented states. No fabricated numbers.
- **Life Power score**
- - Real: `487` + `ChipProvenance: calculated`
- - Low-confidence: `460` (muted, 64% opacity) + `estimated  low confidence`
- - Honest-null: `building your *balance*` (never a zero)
- **Domain stat** (any of the 9, e.g. Fitness)
- - Real: `82` + `ChipProvenance: via WHOOP`
- - Low-confidence: `79` (muted) + `estimated`
- - Honest-null: `-` on the row, `ProgressBar` empty, hint reads `no goals  tap to explore`
- **Avg stat**
- - Real: `78` + `ChipProvenance: calculated from 9 domains`
- - Low-confidence: `~78` muted + `estimated · low confidence` when any required domain is stale
- - Honest-null: `building your balance` with the KPI hidden until at least 3 domains report
- **Completeness**
- - Real: `8/9 reporting` + source sheet shortcut
- - Low-confidence: `syncing sources` while provider refresh is in flight
- - Honest-null: `no connected sources yet` + `Add a source` ghost action
- **Trend**
- - Real: 7-week orange line with green milestone dots
- - Low-confidence: dashed muted line labeled `estimated · low confidence`
- - Honest-null: `Not enough data yet - 3 more check-ins`
- **CIA insight evidence**
- - Real: requires at least two `ChipDomainTag` evidence chips and source freshness
- - Low-confidence: written as `possible pattern` with confidence meter
- - Honest-null: CIA card hidden; do not invent a cross-domain claim

## Consent and Safety
- The visible `data sources` action opens a sheet listing connected sources, categories read, per-domain scope, last sync/freshness, retention window, export, revoke, and delete controls.
- Each domain row source chip opens the same sheet filtered to that domain; failed/stale sources are named inline.
- `SafetyResourceCard` stays scoped out on the feature grid and radar because this surface has no mood/check-in entry; if a mental/wellbeing card adds a check-in shortcut, that shortcut must expose the safety entry before launch.
- Keep navigation targets aligned to `/life-areas`. Do not add alternate vanity routes.

## States
- **Default:** radar plots all 9 axes (solid where data exists, dashed-ghost spoke where a domain has no goals/data yet - per-user, not hardcoded to any specific domain). Life Power score shown. 7-week trend renders.
- **Skeleton:** hero card, trajectory card, and domain rows shimmer (`--surface-3` base, 1.2s sweep) matching real geometry; `ProgressBar`s animate 0 -> value on data arrival; radar strokes draw in once, no spinners.
- **Empty (cold-start):** radar renders all 9 axes as dashed ghost spokes (no data anywhere yet). Hub reads `building your *balance*`. CIA card shows the cold-start copy. Temporal selector locked to `current` (nothing to compare against yet).
- **Error (total network):** hero shows grid rings/axes only, no polygon. Domain list shows skeleton rows. CIA card hidden (no insight to offer without data). Toast: `couldn't load latest data` + `BtnSecondary` retry, per `ErrorState`.
- **Error (partial domain):** radar draws successfully for domains that loaded; failed domains render as dashed ghost spokes (visually identical to honest-null - a fetch failure and "no data yet" look the same to the user, which is the honest read: either way, there's nothing real to show). Affected rows read `data unavailable - tap to refresh`.
- **Success (comparison toggle):** ghost overlay polygon draws in (280ms, paper-40% dashed). Vertices that improved get their `` mark; vertices that declined get their `` mark. Glow holds through the transition, then settles.
- **Disabled/locked:** `vs week` and `vs month` segments render at 40% opacity with a lock glyph. *Correction:* the draft left this a dead end. Tapping a locked segment now opens a compact upsell (single `BtnPrimary`, "unlock with premium" copy from 7) - never a dead tap, per CANON 8's paywall rule.

## Motion
- Physical easing throughout (never linear), 150-250ms feedback on taps.
- Hero glow "breathes" (4s ease) - the only continuous idle motion on the screen.
- Radar polygon draws in once on load (stroke animates in), then holds static; it does not idle-animate (nothing to communicate by moving once drawn).
- Comparison toggle: ghost overlay polygon draws itself in 280ms; vertices don't "morph" numerically since each axis is a separate domain, not a shared scale changing over time - the current polygon stays fixed, the ghost overlay appears/disappears.
- Haptics: light tick on the comparison-toggle switch. *Correction:* the draft specified "light tick (medium impact)" - a contradiction (those are two different haptic strengths). Also dropped "domain star-dot taps" from the haptic list since the radar is no longer an interactive surface (4, 12); domain row taps in the list get the standard `ListRow` selection tick instead.
- `prefers-reduced-motion`: radar stroke draws instantly (no animated trace), `TrendChart` renders static, skeleton shimmer becomes a static tone, count-up bypassed - final numbers appear immediately.
- Gestures: tap domain row -> stack push to domain dashboard. Tap `data sources` glyph -> push `ConsentCard`. Pull-to-refresh -> retry fetch.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/life-areas`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** primary text `paper-100` (#FEFAF3) on `--surface-2` (#211008) exceeds AA+. Muted text (paper-64%) holds 4.5:1 minimum.; **Targets:** back chevron, `data sources` glyph, `SegmentedTabs` segments, and every `DomainStatRow` meet the 44pt minimum (rows are 56px). *Correction, mobile reality:* the draft claimed radar "star-dots" get "44x44pt expanded invisible bounding boxes" - with 9 vertices arranged around a ~220px-diameter shape, that's mathematically impossible without the hit zones overlapping each other and the center. Fixed by making the radar decorative/`aria-hidden` and moving all interaction to the `DomainStatRow` list, which already has honest, non-overlapping 56px targets.; **Screen reader:** the radar carries a single summary label (`"Life Power shape across 9 domains"`) and is otherwise `aria-hidden` - its data is not read axis-by-axis because the `DomainStatRow` list below is the real, complete, already-accessible representation of the same numbers (`"Fitness, 82 out of 99, up 4 points, via WHOOP"`). One source of truth read aloud, not a duplicate hidden structure (the draft's "invisible `CalendarStrip` fallback" was that duplicate - removed, see 5).
