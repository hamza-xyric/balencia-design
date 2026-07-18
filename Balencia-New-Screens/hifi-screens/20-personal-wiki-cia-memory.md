# 20-personal-wiki-cia-memory - A+++ hi-fi mobile spec

## Header
- **Source ID:** 20
- **Source spec:** `Balencia-New-Screens/screens/20-personal-wiki-cia-memory.md`
- **Evidence:** screens/20-personal-wiki-cia-memory.md, work/briefs/20.md, work/drafts/20.md, FUNCTIONAL CONTENT BRIEF: Personal Wiki / CIA Memory
- **Route(s):** `/wiki`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A browsable, editable knowledge base that makes *CIA*'s memory of the user transparent and correctable.
- **Premium Visual Director:** make Book of life hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Book of life lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| [<-]   book of life                   []   |  TopBar (transparent -> .glass-pill on scroll)
|                                               |
|  +-----------------------------------------+ |
|  |   search memories...                   | |  GlassPillInput (search)
|  +-----------------------------------------+ |
|                                               |
|  +----+ +------+ +------+ +------+ +----+ +--+  SegmentedTabs
|  |you | | pref | |patt  | |[corr]| |goal| |lif|  (scroll-overflow variant -
|  +----+ +------+ +------+ +------+ +----+ +--+   6 segments exceed 390px)
|                                               |   active = --surface-3 + orange label
|  18 entries  last updated 2h ago            |  SectionHeader (Overline, meta)
|                                               |
| +-------------------------------------------+ |
| |  | |  GlassCard (hero, r40)
| |        (sleep)(spend)               | |  glow-cia  WikiCorrelationGraph
| |             \        /                     | |  solid orange = confirmed edge
| |            (fiber)                         | |  dashed purple = CIA-inferred edge
| +-------------------------------------------+ |  green dot = milestone edge (rare)
|                                               |
| +-------------------------------------------+ |
| | gut health & sleep                         | |  SolidCard  glow-cia (chroma wash)
| | high-fiber breakfasts correlate with       | |
| | deeper sleep on the same night.            | |
| | [nutrition] [wellbeing]                    | |  ChipDomainTag pair
| | ----------------------------------------- | |
| | oooooooo  78% high confidence              | |  ConfidenceMeter (thin-bar)
| | detected from data  2d ago                | |  ChipProvenance
| |         [edit]        [this is wrong]      | |  BtnGhost row
| +-------------------------------------------+ |
|                                               |
| +-------------------------------------------+ |
| | workout skips & sleep debt                 | |  SolidCard  glow-cia
| | you skip workouts most often after nights  | |
| | under six hours of sleep.                  | |
| | [fitness] [wellbeing]                      | |  ChipDomainTag pair
| +-------------------------------------------+ |
|                                               |
| +-------------------------------------------+ |
| |  Today      CIA      Goals      [Meo]      | |  GlassNavBar (Me active, orange fill)
| +-------------------------------------------+ |
+---------------------------------------------+

Route handling: `/wiki`
```

## Focal Hierarchy
- **Dominant focal moment:** Book of life hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Search region, Chapter tabs, Chapter meta, Content area.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*life*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent, gains `.glass-pill` backdrop on scroll.
- **GlassPillInput** (`search` variant).
- **SegmentedTabs** - scroll-overflow variant (6 chapter segments don't fit one screen width; track scrolls horizontally, active segment slides per CANON 6 at 150ms, `--surface-3` fill + orange label).
- **SectionHeader** - Overline for chapter meta.
- **GlassCard** (`hero` variant, radius 40) - used exclusively for the `WikiCorrelationGraph` mini-map, the one Display-adjacent, immersive moment on the screen.
- **SolidCard** - base for every chapter entry (data-dense list; legibility over atmosphere, per CANON 2).
- **CIAInsightCard** - reserved for the *ephemeral* detail reveal when a graph node is tapped (purple glass, spark glyph, `BtnCoach` + `BtnGhost`, cites its two domains via `ChipDomainTag` pair). **Correction:** the draft's Components list named `CIAInsightCard` for "detailed correlation expansions" while its own wireframe and Visual treatment section built those same rows as `SolidCard` - two different components for the same content. Resolved by splitting the roles: the permanent, scrollable chapter list is always `SolidCard` (many entries, needs density); `CIAInsightCard` is the transient glass reveal anchored to the mini-map only, never the list itself.
- **ConfidenceMeter** - thin-bar variant, purple-tinted when the underlying entry is CIA-derived.
- **ChipProvenance** - source/recency chip on the confidence metric only (see 8 for why entry-count and timestamp metadata don't carry one).
- **ChipDomainTag** - pair, on every `correlations`/`patterns` entry, citing both domains the entry connects (tags/icons only, never chrome).
- **BtnGhost** - `edit` / `this is wrong` / `show more` / `show less` - calm, neutral, never alarm-colored.
- **BtnSecondary** - the two Flagging Sheet actions.
- **BtnPrimary** - the single destructive confirm in the Delete Sheet only (see 7 correction).
- **Sheet** (`action` variant) - two distinct sheets: Flagging and Delete (see 7).

## Data Honesty
- Every metric ships the honesty triple (real / low-confidence / honest-null). No fabricated numbers.
- **Metric 1 - Entry count**
- Real: `18 entries` - plain Caption metadata, **no ChipProvenance**. *Correction:* the draft attached a `synced via API` chip here. `ChipProvenance` exists to attribute a value to an external device or an AI inference (`via WHOOP`, `estimated`); an entry count is first-party product metadata with no such source to name. Forcing a chip onto it would be theater, not honesty - an honest "not applicable" is the right call.
- Low-confidence: not applicable - a count of stored rows is an exact integer, never an estimate. No such state exists for this metric (stated plainly, not hidden).
- Honest-null: `0 entries`, copy `nothing here yet`.
- **Metric 2 - Confidence score (%)** - the one CIA-derived metric on this screen, so it is the metric that must carry the full three-state pattern *with* a real provenance chip:
- Real: `78% high confidence`, chip `detected from data  2d ago`.
- Low-confidence: `42% low confidence` - KPI rendered at 64% opacity, meter bars muted, copy `CIA is less *sure* - tell it if this is wrong`.
- Honest-null: `-`, 0 of 8 bars filled (neutral gray, not colored), copy `needs more data to score`.
- **Metric 3 - Memory last updated**

## Consent and Safety
- Book of life lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wiki`. Do not add alternate vanity routes.

## States
- **Default:** `SolidCard` entries populate the vertical scroll for the active chapter; tabs settled.
- **Skeleton:** tabs and meta text shimmer. `WikiCorrelationGraph` shows 3 purple pulsing ghost dots (no edges yet). Entry list shows `SkeletonState` blocks matching real card geometry.
- **Empty (Day 1):** `EmptyState` component, warm tone. Mini-map shows 3-5 fully ghosted (24% opacity) placeholder nodes, no edges.
- **Node tap (correlations/patterns):** selected node highlights (orange ring), `CIAInsightCard` slides in directly beneath the mini-map - spark glyph, one-sentence insight, evidence row (`ChipProvenance` x domains), `BtnCoach` (`ask CIA more`) + `BtnGhost` (`dismiss`). Only one insight card open at a time; tapping a new node replaces it.
- **Search active:** tabs dim to 40% opacity, non-interactive. Results flatten into one list across all chapters; each result gains a `ChipDomainTag`-style chapter badge for context. `x` glyph clears the query.
- **Edit mode:** card border -> 1px solid orange (a border, not a glow - editing is a temporary user action, not the card's resting semantic state). Title/body become multiline `GlassPillInput` fields. Ghost row swaps to `[cancel]` `[save]`.
- **Success:** 250ms `--glow-done` (green) border pulse on the saved card, then settles back to its chapter's resting glow.
- **Error - fixed.** *Correction:* the draft specified "a soft red flash" for save failures, directly contradicting the system's own no-red-alarm principle (the same principle the draft's checklist claims credit for applying to destructive UI). Fixed to: 150ms `--surface-3` brighten + a thin orange accent border (no red exists in this palette), plus a light haptic. Copy: `couldn't save your changes - try again.`
- **Offline - fixed for mobile reality.** *Correction:* the draft disabled search while offline. Wiki entries are stored locally once synced - disabling search over data the device already has is unnecessarily punitive, not honest staleness labeling. Fixed: `OfflineBanner` appears under TopBar reading `offline - showing last sync 2h ago` (matches the catalog's exact honest-staleness phrasing); search stays active over cached entries; edits and flags queue locally and show a small pending-sync dot on the affected card until reconnection. Pull-to-refresh is disabled (nothing new to fetch).

## Motion
- **Easing & timings:** physical easing only (`ease-out` entrances, `ease-in-out` transitions). Chapter crossfade: 160ms out, 280ms in. Sheets spring up in 250ms.
- **Glow behavior:** `--glow-cia` on the mini-map "breathes" (4s ease, infinite) to read as live synthesis, not a static image. All card glows dim to 20% when their card leaves the viewport, to keep scroll performance calm rather than busy.
- **Draw-first graphing:** on mount (or chapter switch into `correlations`/`patterns`), `WikiCorrelationGraph` draws outward from a center hub - nodes fade in staggered 20ms/node, edges stroke-draw over 520ms. User-confirmed edges draw solid orange; CIA-inferred edges draw dashed purple.
- **Haptics:** light selection haptic on node tap; medium success haptic on saving an edit; heavy warning haptic when the Delete Sheet (not the Flagging Sheet) appears - the weight difference is intentional, since only the Delete Sheet is truly irreversible.
- **Reduced motion:** graph stroke-draw and staggered fades collapse to an instant, fully-settled frame (opacity 1, no travel). Glow "breathe" stops, holding a static 55% alpha. Chapter crossfade becomes a hard cut under 80ms.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wiki`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** body text paper-100/50 on `--surface-2`; secondary text paper-64%, tertiary paper-40% - both verified AA+ against the surface tokens in use (no glass blur diluting contrast on entry cards, by design).; **44px targets:** back chevron, settings glyph, every ghost action (`edit`, `this is wrong`, `show more`), graph nodes, and chapter tab pills all carry a 44x44px minimum hit area even where the visible glyph or label is smaller.; **Screen-reader labels:** graph nodes expose `aria-label` describing the relationship in full sentences, e.g. "confirmed connection between sleep and spending, 78 percent confidence" - never just a node name. Settings glyph labeled "wiki data and consent settings." `ChipDomainTag` pairs are never the sole signal of a connection - the entry's body copy states the relationship in words, so color-blind users lose nothing.
