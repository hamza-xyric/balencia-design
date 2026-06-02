# Screen Design: Mission Journal

**Screen**: 73 of 74
**File**: 73-mission-journal.md
**Register**: Product Mode
**Primary action**: Browse completed and archived mission history
**Tab**: Goals (stack depth 1), Me (stack depth 2), or from RPG Character (stack depth 2)
**Navigation**: Stack push from Mission Board [13] header journal icon, RPG Character [19] "View full journal" link, or Me Main [17] quick links grid. Back button returns to previous screen.

---

## Purpose

The Mission Journal is the retrospective companion to the Mission Board — where the Board is forward-looking ("what am I working on?"), the Journal is reflective ("what have I accomplished?"). Each completed mission entry includes an AI-authored summary that transforms raw data into a narrative micro-memoir, making the journal feel like a personal logbook of growth. Archived missions appear alongside completions, acknowledging that pivoting is part of the journey. Photo memories from the mission period add visual anchors to the history.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Mission entry cards — the dominant visual pattern, grouped by month
2. "Mission journal" title — screen identification
3. Filter chips — control mechanism for domain and type filtering
4. Month section headers — temporal grouping
5. SIA-authored summaries — narrative texture within each entry
6. Photo memory thumbnails — visual anchors to past progress

**User flow**:
- **Arrives from**: Mission Board [13] via stack push (journal icon in header), RPG Character [19] via stack push ("View full journal" link), Me Main [17] via stack push (quick links grid card)
- **Primary exit**: Previous screen via stack pop (back button or swipe-right gesture)
- **Secondary exits**: Mission Detail [14] via stack push (tap completed entry to view full detail), Image Viewer [67] via modal present (tap photo thumbnails)

---

## Layout

**Scroll behavior**: SectionList (grouped by month, with sticky month headers)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  ‹  Mission journal         │  ← back button + title
├─────────────────────────────┤
│                             │
│  [All] [By Domain▾] [By    │  ← filter chips
│   Type▾]                    │
│                             │  ← 16pt gap
│  MAY 2026                   │  ← month section header (sticky)
│  ┌───────────────────────┐  │
│  │ ✓  Run a half marathon│  │  ← completed mission entry
│  │    🥈main  🔴fitness   │  │
│  │    May 18 · 14 weeks   │  │
│  │    ⚡ 450 XP            │  │
│  │                         │  │
│  │    "You trained through │  │  ← SIA-authored summary
│  │     rain and doubt. 47  │  │
│  │     runs. One finish    │  │
│  │     line."              │  │
│  │                         │  │
│  │    📸 ○○○ 3 photos      │  │  ← photo memories
│  └───────────────────────┘  │
│                             │  ← 12pt gap
│  ┌───────────────────────┐  │
│  │ ⊘  Learn to cook      │  │  ← archived mission entry
│  │    🥉side  🟢nutrition │  │
│  │    Archived May 12     │  │
│  │    ⚡ 63 XP (partial)   │  │
│  │                         │  │
│  │    "You explored 8 new  │  │
│  │     recipes before life │  │
│  │     shifted your focus."│  │
│  │                         │  │
│  │    📝 "Got too busy     │  │  ← user's archive note
│  │     with the new job."  │  │
│  └───────────────────────┘  │
│                             │  ← 32pt gap
│  APRIL 2026                 │  ← next month header
│  ┌───────────────────────┐  │
│  │ ✓  Save $2,000        │  │
│  │    🥉side  🟢finance   │  │
│  │    Apr 28 · 6 weeks    │  │
│  │    ⚡ 120 XP            │  │
│  │                         │  │
│  │    "Six weeks of       │  │
│  │     discipline. Your    │  │
│  │     emergency fund is   │  │
│  │     real now."          │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  [Today]  [SIA] [Goals] [Me]│  ← tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation Bar** — 44pt
   - Purpose: Back navigation and screen identification
   - Content: Back button (left), "Mission journal" title (center)

2. **Filter Chips Row** — 36pt chips + 16pt bottom gap = 52pt
   - Purpose: Filter journal entries by domain or mission type
   - Content: Horizontal scrollable chip row

3. **Month Section Headers** — 24pt per header
   - Purpose: Temporal grouping of journal entries
   - Content: Month/year label, sticky on scroll

4. **Journal Entry Cards** — variable (~180-240pt per card, 12pt gaps)
   - Purpose: The primary content — completed and archived mission records
   - Content: SectionList of journal entry cards grouped by month

5. **Bottom Spacer** — 24pt
   - Purpose: Breathing room above tab bar

---

## Components

### Navigation Bar
- **Purpose**: Back navigation and screen title
- **Visual treatment**: 44pt height, ink-900 bg.
- **Sub-elements**:
  - Back button: left chevron, white, 20pt icon, 44x44pt touch target, 16pt from left edge.
  - Title: "Mission journal" — 17pt Sora Semibold, white, center-aligned.
- **Gestures**: Back button tap → stack pop. iOS swipe-right-from-edge → stack pop.

### Filter Chips Row
- **Purpose**: Filter journal entries by domain or type
- **Visual treatment**: Horizontal ScrollView of chip buttons. No scroll indicator. 16pt left margin.
- **Sub-elements**:
  - "all" chip (default active): 36pt tall, pill, orange (#FF5E00) bg, white text
  - "by domain" chip: 36pt tall, pill, ink-brown-800 bg, 1pt white at 10% border, white at 60% text, small down-chevron (10pt). Tap → secondary row of domain color chips (animated slide-down, 280ms). Domain chips are toggleable (multi-select).
  - "by type" chip: 36pt tall, pill, ink-brown-800 bg, 1pt white at 10% border, white at 60% text, small down-chevron (10pt). Tap → secondary row of mission type pills (animated slide-down, 280ms). Type pills follow Mission Type Badge metallic colors but as filter chips.
  - 8pt gap between chips
- **Behavior**: "all" deactivates when domain or type sub-filters are active. Tapping "all" clears all sub-filters.

### Month Section Header
- **Purpose**: Temporal grouping label
- **Visual treatment**: "MAY 2026" — 13pt Sora Semibold, white at 40%, uppercase, +0.12em letter-spacing. Left-aligned, 16pt left margin.
- **Spacing**: 32pt top margin (gap from previous section or filters), 12pt bottom margin
- **Sticky behavior**: Sticks to top of scroll area (below nav bar and filters) when section is scrolled into view. ink-900 bg when sticky.
- **Size**: Full-width, 24pt tall (text + vertical padding)

### Completed Mission Entry
- **Purpose**: Record of a successfully completed mission with SIA-authored narrative
- **Data source**: Missions system (completion data) + SIA narrative engine (summary text) + progress photos system
- **Visual treatment**: ink-brown-800 (#211008) card, 28pt border radius, 24pt internal padding. Full-width minus 32pt (16pt margins).
- **Layout** (inside card):
  - Row 1 — Status + Name: Green checkmark icon (16pt, #34A853) + mission name (16pt Sora Semibold, white), 8pt gap between icon and name
  - Row 2 — Classification: Mission Type Badge + Domain Tag Chip(s), inline, 8pt gap, 4pt top margin
  - Row 3 — Metadata: Completion date + duration — "[Month] [day] · [##] weeks" — 13pt Sora Regular, white at 50%, 4pt top margin
  - Row 4 — XP earned: "⚡ [##] XP" — 13pt Sora Semibold, orange (#FF5E00), 4pt top margin
  - Row 5 — SIA summary (12pt top margin): 2-3 sentence AI-authored narrative — 14pt Sora Regular, white at 70%. Written in SIA's grounded coach voice, memoir-like tone. References specific data points (number of sessions, days, key milestones). No quotation marks — differentiated by opacity and top margin.
  - Row 6 — Photo memories (optional, 8pt top margin): Horizontal row of 3 circular thumbnails (32pt diameter each, 8pt gap) + count label "[##] photos" (12pt Sora Regular, white at 40%, 8pt right of thumbnails). Photos sourced from Progress Photos [49] taken during the mission period.
- **Size**: Full-width minus 32pt, ~180pt (without photos) to ~220pt (with photos)
- **Gestures**:
  - Tap card → stack push to Mission Detail [14] (showing completed state)
  - Tap photo thumbnails → modal present Image Viewer [67] with mission-period photos

### Archived Mission Entry
- **Purpose**: Record of an archived mission with partial progress acknowledgment
- **Visual treatment**: Same card pattern as Completed Mission Entry but with visual differences:
  - Card at 80% opacity (overall)
  - Status icon: Archive icon (⊘, 16pt, white at 40%) replaces green checkmark
  - XP shows partial: "⚡ [##] XP (partial)" — orange text, "(partial)" in white at 40%
  - SIA summary: Still present, written compassionately — acknowledges what was achieved and why the mission was archived
  - Archive note (optional, below SIA summary, 8pt top margin): 📝 icon (14pt, white at 40%) + user's contextual note text — 13pt Sora Regular, white at 50%, 1-3 lines. This is the note the user wrote when archiving from Mission Detail [14].
- **Size**: Full-width minus 32pt, ~180pt (without note) to ~220pt (with note)
- **Gestures**: Tap card → stack push to Mission Detail [14] (showing archived state)

---

## Visualization

> Source: brief-driven (no companion file). Audited in `viz-audit/` — Batch 8, findings `S73-V01..V03`. Primitives from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Product-Mode retrospective — lightweight mini-section (§6 Thin variant). Benchmark = Reflectly + Stoic + Daylio reflection, rendered the Balencia way (a drawn completion journey, not a flat month list), with Gentler Streak's non-shaming framing. **Current grade C+ (72) → specced-target A− (86).**

The Mission Journal is the reflective companion to the Mission Board. The visualization's whole job is to turn a month-grouped list of finished and pivoted missions into a single legible **journey of what's been accomplished** — celebratory, never a deficit ledger. Restraint is deliberate: this is a read-and-reflect screen, so it earns its grade with **one** quiet focal device (the drawn completion journey) plus two supporting numbers, not a wall of charts. The SIA-authored summaries and photo memories stay as warm text/image — they are the soul of the screen and need no chart.

### Visualized-vs-text map
| Datum | Today | Specced visual | Primitive |
|---|---|---|---|
| Completed / pivoted missions over time | month-grouped cards | a drawn completion **journey** (newest→oldest spine) | `TimelineAgenda` (VK-014), vertical |
| XP earned per mission | bare orange text | XP-per-mission **bar** on one shared scale | `StatBars` (BarChart/`VK-006` wrap) |
| Missions completed (all-time) | implicit | a header **count** tile, honest disclosed window | `KPIStatTile` (StatTile extract) |
| SIA summaries / photo memories / filter chips | text / image / chips | — (deliberately textual / non-data) | — |

**Editorial hierarchy (one focal hero, the rest secondary — calm, not maximal):** the **completion journey** (`S73-V01`) is the single hero — the spine the eye traces down the screen. The per-entry **XP StatBar** (`S73-V02`) is a quiet inline accent *inside* each card, never competing with the spine. The header **completion count** (`S73-V03`) is a one-line summary tile, not a second hero. SIA summaries and photos carry the emotional weight as text; nothing else is charted. This restraint is the point — a reflection screen that reads as calm scores above a maximalist one.

### 1 · Completion journey — `S73-V01` → `TimelineAgenda` (VK-014, vertical)
A vertical **`TimelineAgenda`** spine threads the journal newest→oldest, one node per entry, so the month-grouped list reads as a literal **path of progress** rather than a stack of cards. Each completed mission is a **reached node**; each archived mission is a **neutral "pivoted" node** (never "failed"). The drawn path is the screen's signature device, sharing the Living-Line gradient family with `TrendChart`/`Sparkline` so the journal feels of-a-piece with the rest of the app.
- **Depth (token-backed):** **reached path segment** = `--grad-progress` **(mint)** orange→green, `--stroke-base` 4px, `stroke-linecap/linejoin: round`; **unreached segment is N/A here** (the whole journal is *past*, so the path is fully "reached" orange→green — there is no future tail). Node diameters 20–24pt (min-44 hit box). **Reached/completed node** = filled `--color-forest-green` + white ✓. **Pivoted/archived node** = `--color-alpha-white-10` fill + a neutral pivot/branch glyph at `--color-alpha-white-30` (no green, no red, no lock). The newest entry carries one focal accent: a `--color-brand-orange` 2px ring + `--glow-orange-sm` (~12px, **mint**) — the single "you are here / most recent win" cue (never a 32px glow on a 24pt node). `--track-inset` is unused — the drawn path *is* the depth cue (per VK-014).
- **Micro-interaction:** tap a node or its row → stack-push Mission Detail [14] (`--dur-fast` 160ms `--ease-out-soft` press, scale 0.98); the row is the ≥44×44pt target. Because this is a retrospective, there is no scrub/forecast — drill-to-detail is the rewarded interaction.
- **States:** **cold-start** (no finished missions) → defer to the screen Empty State ("no entries yet"); the spine does not render a degenerate single dot. **Loading** → node skeletons at their row positions + a path skeleton that **draws into** the real orange→green segment (morph, not swap), shimmer top→bottom. **Partial** (some entries cached, journal still fetching) → cached reached nodes render solid, un-fetched rows ghost at `--color-alpha-white-08` (distinct from loading). **Error** (fetch failed, no cache) → reached nodes from cache if any; otherwise the path collapses to the screen-level "Couldn't load your journal" + "try again" (Error Handling table) — never a broken/red path. **Reached stays reached**: an archived/lapsed mission never removes or re-colours an already-reached node (past wins are permanent, VK-014 ethical rule).
- **Data source:** Missions system (completion + archive records, dates, type, domain) grouped by month; XP from the rewards ledger; node status from mission `state` (completed vs archived).

### 2 · XP per mission — `S73-V02` → `StatBars` (BarChart / `VK-006` wrap)
Inside each entry card, the XP earned renders as a small horizontal **`StatBar`** so high-XP missions read as visibly **bigger wins** — the same data the spec shows today as bare orange text, now also encoded as length. The numeric XP ("⚡ 450 XP") is **always shown beside the bar**, never bar-alone.
- **Depth (token-backed):** orange fill (`--color-brand-orange`) over a `--color-alpha-white-08` track on `--track-inset` **(mint)**, 8px pill, `stroke-linecap: round`; **no glow** (inline scale). Width ∝ XP on **one shared zero-baseline scale across the whole journal** (the highest-XP mission = full width) — per-card re-normalisation is forbidden as dishonest (a 63-XP pivot must read shorter than a 450-XP finish). Archived "(partial)" XP uses the same orange fill at the same scale (the "(partial)" is carried in the label at `--color-alpha-white-40`, never by a different bar colour).
- **Micro-interaction:** the bar is decorative-adjacent within the card; the whole card is the tap target to Mission Detail. No separate bar interaction.
- **States:** **0 XP** (rare archived) → a ghosted empty track + "0 XP", distinct from no-bar. **Loading** → track skeleton, fill rises on data. **Inherits** the card's partial/error states (no independent failure).
- **Data source:** rewards ledger (XP per mission), shared-max computed across all visible journal entries (re-derived when a filter narrows the set, with the disclosed scale).

### 3 · Completion count — `S73-V03` → `KPIStatTile` (StatTile extract)
A single header **`KPIStatTile`** states the honest all-time count — "**N missions completed**" — as a quiet summary above the first month. Framing is neutral and non-shaming: it counts arrivals, it does not surface a "failed/archived" deficit. Per the High-motivation variant, an optional second tile may show all-time XP or active domains, but the default is the single count.
- **Depth (token-backed):** label uppercase `--color-alpha-white-40` +0.12em; number `text-h2` white, tabular-nums; if a delta is ever shown it is the honest **fixed/disclosed window** (▲ `--color-forest-green` for "more this period", never ▼-red) — but for an all-time retrospective the **default is no delta** (a delta would imply a target the journal does not set). Surface = `ink-brown-800` + top-edge highlight.
- **Micro-interaction:** non-interactive summary (it is a label, not a drill). 
- **States:** **cold-start** → tile hidden (covered by the screen Empty State). **Loading** → number skeleton, count-up on data. **Partial** → counts what's loaded with a subtle "…" until complete; never shows a falsely-low final figure.
- **Motion:** count-up `--dur-base` 280ms `--ease-out-soft`.
- **Data source:** Missions system, all-time completed count (and optional XP sum / active-domain count for the High-motivation tile).

### Motion choreography (draw-first order)
On mount/scroll-into-view, motion follows the §8 draw-first rule: **(1) the completion-journey path draws itself top→bottom** via `stroke-draw` (`--dur-flow` 1200ms `--ease-flow`), the `--grad-progress` orange→green stroke tracing the spine — **never an opacity-fade**; **(2) nodes settle** (scale 0.8→1, `--dur-base` 280ms `--ease-out-soft`) as the drawing path reaches each one, ✓/pivot glyphs landing with them; **(3) each card's XP `StatBar` rises** 0→width (`--dur-slow` 520ms `--ease-flow`, 80ms stagger) and **(4) the header `KPIStatTile` counts up** (280ms `--ease-out-soft`). The newest node's `--glow-orange-sm` pulse loops 2s (the single "you are here" marker). Below-fold cards animate on scroll-into-view. **`prefers-reduced-motion`** → the full path renders drawn at rest with all nodes settled, StatBars at final width, the count at final value, and the current-node pulse off (the settled frame is the canonical frame) — the journey identity survives without motion.

### States, brand & accessibility
- **States:** cold-start (defers to the designed Empty State, no degenerate single-dot spine), loading (skeleton path that **draws** into data), partial (cached nodes solid + ghosted un-fetched rows), and error (cached reached nodes, else screen-level retry) are all designed per-viz above; the filtered-empty case reuses the screen's Filtered empty state.
- **Brand / 60·30·10:** orange dominates data ink (current-node ring, XP StatBar fills, header accent); **green = arrival only** (reached/completed nodes + the path's arrival end); **purple is absent** — SIA summaries are plain text at `white/70` differentiated by opacity (no SIA avatar, no AI indicator, no projection on this past-only screen), so this stays a genuinely purple-free Product-Mode surface. Domain colours appear only as identity on the existing Domain Tag Chips and mission-type metallic badges, never as primary data ink. **Non-shaming (ethical core):** reached missions stay reached and are never recoloured; archived missions are framed as **"pivoted"** (neutral white-tint node + branch glyph), never "failed"; **no alarm-red anywhere**; no loss-aversion, no broken-path, no deficit count. The journal celebrates arrivals and acknowledges pivots.
- **Accessibility:** the timeline carries a summary `aria-label` ("Mission journey: N missions completed, M pivoted") and a **linear AT reading order** (each node is a `listitem`/`button` labelled "[mission name], [completed/pivoted], [XP] XP, [date]"); status is conveyed by a **visible glyph** (✓ completed / branch pivoted) **plus** colour, never colour-alone. XP `StatBars` always show the number beside the bar. Load-bearing graphics — the path stroke, node fills, the reached/current boundary, the StatBar fills — meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (the `white/08` track is decorative, exempt); text/value contrast ≥4.5:1; node and card tap targets ≥44×44pt.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Reflectly + Stoic + Daylio (reflection done warmly, non-shaming journey framing) — *stays Balencia via the drawn TimelineAgenda spine + warm-glow surfaces on ink-brown, never a flat month list.*

**Pre-grade:** B+ (80) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **TimelineAgenda completion spine** (`CK-P2`, data hero, S73-V01) — the drawn path threading newest→oldest, anchoring the whole screen visually. The newest entry carries the orange-glow accent (the "you are here" current-node ring), guiding the eye. The filter chips sit *above* the spine in a secondary zone (control mechanism, not content). Month headers are sticky and tertiary (organizational spine). Journal entry cards sit *alongside* the spine, each a detail read after the path catches the eye. The completion-count summary tile (`S73-V03`) is tertiary (a one-liner, not a competing viz). Everything else (archive notes, photo thumbnails, SIA summaries) is deliberately textual and sized secondary. The squint test lands on the spine path first, then individual entry cards, then the monthly grouping. No competing focal elements.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28pt · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. Completed entry cards and archived entry cards receive the same treatment (no distinction in surface craft — the visual difference is the archive icon and opacity, not flatness). Month section headers sit on the `--color-ink-900` base (organizational label only). The TimelineAgenda spine carries size-calibrated glow: `--glow-orange-sm` ~12px on the current-node ring (the smallest element that earns glow per `CONSISTENCY.md §1`); reached/pivoted nodes carry no additional glow, only the spine path's `--grad-progress` orange→green gradient. XP StatBars (`S73-V02`): 8px height · `--radius-pill` · `--color-brand-orange` fill over `--color-alpha-white-08` track on `--track-inset` beveled recess — no glow (inline scale). Filter chip surfaces: inactive `--color-ink-brown-800` + 1pt `--glass-border` + **`--edge-highlight`**; active `--color-brand-orange` fill + white text. Extends the depth language uniformly so no element reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: nav bar title `--text-h3` 17pt / 600 / `--leading-snug` / white 100%; month header `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40); mission name `--text-h3` 16pt / 600 / `--leading-snug` / white 100%; metadata `--text-caption` 13pt / 400 / `--leading-normal` / white-50; XP earned `--text-h3` 13pt / 600 / `--color-brand-orange` (primary), "(partial)" white-40 (secondary); SIA summary `--text-body` 14pt / 400 / `--leading-relaxed` 1.6 / white-70; archive note `--text-caption` 13pt / 400 / white-50; photo count `--text-small` 12pt / 400 / white-40; filter chip `--text-h3` 13pt / 600 / white-60 (inactive) or white-100 (active on orange). Hierarchy by **weight** (600–700 vs 400) and `--leading-*` rhythm, not size alone. Sentence case on all labels. Stat figures tabular-nums. ≤2 `--color-brand-orange` accent words per screen. Chillax logo-only. Replaces ad-hoc pixel line-heights with `CK-T04` scale.

### Microcopy (before → after)

Authored per `CK-P5`. Every user-facing string is warm, on-voice, non-shaming:

**SIA summaries** — *after (grounded coach voice, specific to data):* "You trained through rain and doubt. 47 runs. One finish line." (references specific session count, frames perseverance + earned arrival; memoir-like, no exclamation, period with intent) · "You explored 8 new recipes before life shifted your focus." (acknowledges partial progress, reframes archive as pivot not failure) · "Six weeks of discipline. Your emergency fund is real now." (celebrates concrete outcome, specific timeframe).

**Archive note label** — *after:* "Archive note" or "Your note" (clear a11y label for the 📝 icon).

**Empty state** — *after:* Heading "No entries yet" + Body "Complete or archive a mission and it'll appear here with a summary of your journey." (frames act as building process, inviting, non-deficit).

**Filtered-empty** — *after:* "No [domain/type] entries.\nTry a different filter or check back after completing more missions." (actionable, never "nothing to see").

**Filter chip labels** — *after (sentence case):* "All" · "By domain" · "By type" (with small down-chevron glyph, not text).

**Loading / error** — *after:* Loading "SIA is loading your journey — one moment." (warm, screen-specific) · Error "Couldn't load your journal. Pull to refresh." (honest, recovery named).

No exclamation marks. Brand period used with intent. Archive framing uses "pivoted," "archived," "paused," "shifted focus" — never "failed" or "quit."

### Motion choreography

Locked to `CK-P4` draw-first order: **TimelineAgenda path draws** top→bottom (`stroke-draw`, `--dur-flow` 1200ms / `--ease-flow`, hero motion, never opacity-fade) → **timeline nodes settle** (scale 0.8→1, `--dur-base` 280ms / `--ease-out-soft`) as path reaches each one, glyphs landing; current-node `--glow-orange-sm` pulse loops 2s → **entry cards fade-up + translateY** (12→0, `--dur-base` 280ms / `--ease-out-soft`, 80ms stagger) → **XP StatBars rise** (0→width, `--dur-slow` 520ms / `--ease-flow`, shared scale, 80ms stagger) → **completion-count KPI counts up** (`--dur-slow` 520ms / `--ease-out-soft`) → **photo thumbnails fade-in** (60ms stagger, 280ms each). Filter chips and month headers fade-in parallel. Below-fold animates on scroll-into-view. `prefers-reduced-motion` → path fully drawn at rest, StatBars at final width, KPI at final value, node pulse off, all stagger instant. Signature **draw-not-fade** (§8) survives reduced-motion via drawn path's settled form.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | Filter chips visible, no month headers, no entries, empty state centered | "No entries yet.\nComplete or archive a mission and it'll appear here with a summary of your journey." | Cards not rendered; TimelineAgenda spine defers to empty state (no degenerate single dot) |
| Loading | Skeleton cards at row positions; month headers skeleton; path skeleton draws into real orange→green spine, morphs not swaps; node skeletons land as path reaches them | "SIA is loading your journey — one moment." | Depth-preserving skeleton: cards show body + 3-line text shimmer + thumbnail placeholders; path visible but shimmering, morphs to real data |
| Empty after filter | Filter chips visible (active distinct), empty-state centered, no cards, no timeline | "No [domain/type] entries.\nTry a different filter or check back after completing more missions." | Cards and spine not rendered; empty state is focal point; never "no results" line in a card |
| Partial (cached + fetching) | Cached entries render fully + path reaches them solid (orange→green); un-fetched rows ghost at `--color-alpha-white-08` (distinct from loading), subtle skeleton visible, nodes ghosted until data arrives | "Syncing your journey…" (subtle, non-intrusive) | Cached nodes reached/pivoted glyph visible; un-fetched rows clearly distinct (paler, not spinner-confusion) |
| Error (fetch failed, no cache) | Filter chips visible, network error banner at top ("Couldn't load your journal — pull to refresh"), no entries, fallback to empty state; if cached reached nodes exist, show in muted state with "incomplete" caveat | "Couldn't load your journal. Pull to refresh." | Error banner calibrated error-red only if operational failure; cache-fallback reads as state, not failure; spine only renders reached nodes (never broken path) |
| Filtered result (non-empty) | Active filter chip orange + white text, path draws only filtered entries, month headers only for months with filtered entries, cards show only filtered missions | "Journal refreshed" (brief toast on successful filter change) | Full depth on filtered cards; no visual distinction between "all" and filtered (same surface depth); spine adapts to show only filtered entries (honest, not hidden) |

### Signature & anti-generic

Ownable moments: the **TimelineAgenda completion spine** (vertical drawn path threading the journal, continuous-stroke motif shared with Living-Line family — brand signature on a reflection screen) and the **TimelineAgenda spatial metaphor** (missions as nodes reached on a literal path, not a flat month list — honest alternative to a card stack). Anti-generic fixes: (1) archive framing as "pivoted" neutral nodes (never red, never shamed) — ethical differentiator vs competitors' deficit ledgers; (2) SIA summaries authored and specific to user's actual mission data (real insights, not horoscopes — depth competitors skip); (3) filter interaction designed as full affordance (chips + sub-filter rows + animated states) not relegated to text; (4) completion-count summary tile (`S73-V03`) is designed focal object in header, not generic "stats card." Screen reads as *Balencia's* journal because of the path metaphor, warm-glow surfaces, and non-shaming archive framing.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | WCAG |
|---|---|---|---|
| Mission name (completed/archived) | `--color-alpha-white-100` | ≥12:1 on both | AAA |
| Metadata (date/duration) | `--color-alpha-white-50` | ≥4.5:1 | AA |
| XP text (primary "450 XP") | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (1.4.11) | Enhanced |
| XP text "(partial)" label | `--color-alpha-white-40` | ≥4.5:1 | AA |
| SIA summary text | `--color-alpha-white-70` | ≥4.5:1 on `--color-ink-brown-800` | AA |
| Archive note text | `--color-alpha-white-50` | ≥4.5:1 | AA |
| Photo count label | `--color-alpha-white-40` | ≥4.5:1 | AA |
| Month section header (eyebrow) | `--color-alpha-white-40` | ≥4.5:1 | AA |
| TimelineAgenda path stroke | `--grad-progress` (orange→green) | 3.2:1 orange on `--color-ink-900`; 2.8:1 green (viz-build) | Enhanced |
| Reached/completed node ✓ | `--color-forest-green` + white bg | 4.2:1 | AA |
| Pivoted/archived node glyph | `--color-alpha-white-30` on `--color-alpha-white-10` fill | ≥3:1 | AA |
| Filter chip (active) text on orange | white 100% on `--color-brand-orange` | ≥4.5:1 | AA |
| Filter chip (inactive) text | `--color-alpha-white-60` on `--color-ink-brown-800` | ≥4.5:1 | AA |

Status never colour-alone: TimelineAgenda uses **visible glyph** (✓ completed / neutral branch pivoted) **plus** colour (green reach / white neutral) **plus label** ("Completed: [mission name]" in aria-label). Focus-visible ring: `CK-T03` (2px orange offset 2pt) uniform app-wide. Touch targets ≥44×44pt (back button, entry cards ≥60pt, photo thumbnails 32pt + ≥44pt hit box, filter chips 36pt height · ≥44pt width). Keyboard navigation: tab through filter chips (left→right, wraps), back button, then entries (top→bottom by visual spine order). Reduced-motion: path fully drawn at rest, cards at final opacity, text at rest value — canonical settled frame preserved. Screen-reader labels: back button "Back, return to previous screen"; month header "[Month] [year], section"; completed entry "[mission name], completed [date], [type] mission, [domain], [XP] earned"; archived entry "[mission name], archived [date], [type] mission, [domain], [XP] partial earned"; SIA summary "Summary: [summary text]"; photo thumbnails "View [count] progress photos from this mission"; archive note "Archive note: [note text]". AT announces TimelineAgenda as journey summary with entry count, then lists entries in visual order.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Journal entry cards |
| Nav bar bg | #0A0A0F | ink-900 | Solid |
| Completed checkmark | #34A853 | green | Completion indicator |
| Archive icon | #FFFFFF at 40% | white/40 | Muted status |
| Mission name | #FFFFFF | white | Primary text |
| Metadata (date/duration) | #FFFFFF at 50% | white/50 | Secondary text |
| XP earned | #FF5E00 | orange | Reward |
| XP "(partial)" | #FFFFFF at 40% | white/40 | Modifier |
| SIA summary text | #FFFFFF at 70% | white/70 | Narrative text |
| Archive note text | #FFFFFF at 50% | white/50 | User note |
| Archive note icon | #FFFFFF at 40% | white/40 | 📝 indicator |
| Photo count label | #FFFFFF at 40% | white/40 | Metadata |
| Month headers | #FFFFFF at 40% | white/40 | Section labels |
| Active filter chip bg | #FF5E00 | orange | Selected filter |
| Active filter chip text | #FFFFFF | white | On orange bg |
| Inactive filter chip bg | #211008 | ink-brown-800 | Deselected |
| Inactive filter chip text | #FFFFFF at 60% | white/60 | Muted |
| Mission type badges | [metallic tones] | per type | See _shared-patterns.md |
| Domain tag chips | [domain color] at 15% bg | per domain | Identification only |
| Timeline reached path | orange→green | --grad-progress (mint) | TimelineAgenda spine — Living-Line family (S73-V01) |
| Timeline reached node | #34A853 | green | Completed mission node + white ✓ |
| Timeline pivoted node | #FFFFFF at 10% fill | white/10 | Archived = "pivoted", branch glyph at white/30 — never red |
| Timeline current node ring | #FF5E00 + --glow-orange-sm | orange | Newest entry "you are here" accent (~12px glow, mint) |
| XP StatBar fill | #FF5E00 | orange | XP-per-mission bar over white/08 track on --track-inset (S73-V02) |

**60/30/10 verification**: Orange dominates data ink — active filter chip, XP earned text, XP StatBar fills, the timeline current-node accent, and the reached path's effort segment. Green is arrival only — completed checkmarks, reached timeline nodes, and the path's orange→green arrival end. Purple is absent from this screen (no SIA avatar or AI indicator — SIA summaries are text-only at white/70, differentiated by opacity; the journal is past-only so there is no dashed-purple projection). Domain colors on tag chips only; metallic tones on type badges (identity only). Non-shaming: archived = "pivoted" neutral node, no alarm-red anywhere. Ratio holds — this is a subdued, reflective screen.

---

## Interaction States

### Journal Entry Card (Completed)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, full content | — |
| Pressed | scale(0.98), bg darkens to #1A0C06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer: checkmark area + 3 text lines + thumbnail placeholders | — |

### Journal Entry Card (Archived)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg at 80% overall opacity | — |
| Pressed | scale(0.98), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Photo Thumbnails
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Circular 32pt thumbnails, 1pt white at 10% border | — |
| Pressed | scale(0.9) | light impact |
| Focus-visible | 2pt orange ring around thumbnail group | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white at 60% text | — |
| Pressed | scale(0.95), bg darkens | light impact |
| Active | Orange bg, white text | light impact on activate |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Back Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White chevron, 20pt | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to previous screen |
| Swipe right from left edge | Screen | iOS back gesture — stack pop |
| Tap | Filter chip ("all") | Clear all sub-filters |
| Tap | Filter chip ("by domain"/"by type") | Toggle sub-filter row |
| Tap | Domain/type sub-filter chip | Toggle filter (multi-select for domain, single-select for type) |
| Tap | Completed entry card | Stack push to Mission Detail [14] (completed state) |
| Tap | Archived entry card | Stack push to Mission Detail [14] (archived state) |
| Tap | Photo thumbnails | Modal present Image Viewer [67] with mission photos |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Filter chips | Screen mount | Fade-in + translateX(-12→0), staggered 60ms | 280ms each | ease-out-soft |
| Month headers | Screen mount | Fade-in | 160ms | ease-out-soft |
| Journal entry cards | Screen mount | Staggered fade-in + translateY(12→0), 80ms stagger | 280ms each | ease-out-soft |
| Completion-journey path (S73-V01) | Scroll-into-view | stroke-draw top→bottom, --grad-progress orange→green; never opacity-fade (§8) | 1200ms (--dur-flow) | ease-flow |
| Timeline nodes (S73-V01) | Path reaches node | Settle scale 0.8→1 + glyph land; current node --glow-orange-sm pulse loops 2s | 280ms (node) / 2s loop (pulse) | ease-out-soft |
| XP StatBars (S73-V02) | Card enters viewport | Fill rises 0→width, shared scale, 80ms stagger | 520ms (--dur-slow) | ease-flow |
| Completion-count tile (S73-V03) | Screen mount | Count-up to all-time value | 280ms (--dur-base) | ease-out-soft |
| Photo thumbnails | Card enters viewport | Fade-in, staggered 60ms per thumbnail | 280ms each | ease-out-soft |
| Domain sub-filter row | "by domain" chip tap | Slide-down + fade-in (height 0→44pt) | 280ms | ease-out-soft |
| Type sub-filter row | "by type" chip tap | Slide-down + fade-in (height 0→44pt) | 280ms | ease-out-soft |
| Filter transition | Filter change | Crossfade old list → new list | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push (slide in from right), 280ms ease-out-soft. Content stagger begins after push completes.
- **Exit (back)**: Standard iOS stack pop (slide out to right), 280ms ease-out-soft.
- **Exit (to Mission Detail)**: Standard iOS stack push (slide left), 280ms ease-out-soft.
- **Exit (to Image Viewer)**: Modal slides up from bottom, 520ms ease-flow.

---

## Empty States

### No entries yet (new user or no completed/archived missions)
- Central empty state content (vertically centered in available space):
  - Heading: "no entries yet" — 20pt Sora Semibold, white
  - Body: "Complete or archive a mission and it'll appear here with a summary of your journey." — 15pt Sora Regular, white at 60%, center-aligned, max 280pt width
- Filter chips: hidden (no content to filter)

### Filtered empty state
When a filter returns no results:
- "no [filter] entries" — 17pt Sora Semibold, white, centered
- "Try a different filter or check back after completing more missions." — 15pt Sora Regular, white at 50%, centered
- Filter chips remain visible for adjustment

---

## Motivation Adaptation

- **Low motivation**: Same as default (journal is a read-only retrospective screen — simplifying it further provides no benefit)
- **Medium motivation** (default): Full journal entries with SIA summaries and photos
- **High motivation**: Additional data visible per entry — completion rate, daily average pace, chain context. Month-level stats summary card at top of each month section: "May 2026: 3 missions completed, 633 XP earned, 2 domains active"

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filter chip label (inactive) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 60% |
| Filter chip label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Month section header | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 40% |
| Mission name (completed) | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission name (archived) | Sora | Semibold (600) | 16pt | 22pt | #FFFFFF |
| Mission type badge label | Sora | Semibold (600) | 11pt | 14pt | [type color] |
| Domain tag chip label | Sora | Semibold (600) | 11pt | 14pt | [domain color] |
| Metadata (date/duration) | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| XP earned | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| XP "(partial)" | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| SIA summary | Sora | Regular (400) | 14pt | 20pt | #FFFFFF at 70% |
| Photo count label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Archive note text | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Empty state heading | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Empty state body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 60% |
| Filtered empty heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Filtered empty body | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 50% |
| High motivation month stats | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (journal fetch) | Entry cards show skeleton shimmer. Error banner at top. | Pull-to-refresh retries. Back navigation still functional. |
| API timeout (journal data) | After 8s, shows cached data if available. If no cache, "Couldn't load your journal." message with "try again" button. | Tap "try again" retries fetch. |
| SIA summary generation failure | Entry card renders without summary section (all other fields visible). Placeholder: "Summary generating..." in white at 30%. | Summary populates on next visit when available. |
| Photo thumbnails load failure | Thumbnail circles show placeholder (ink-brown-800 bg, no image). Photo count still shows. | Tap still opens Image Viewer [67] — viewer loads from source. |
| Filter returns empty (not an error) | "no [filter] entries" centered with help text. | User changes filter. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to previous screen"
  - Filter chip: "[filter name], [active/inactive], tap to filter"
  - Month header: "[month year] section"
  - Completed entry: "Completed: [mission name], [type] mission, [domain], completed [date], [XP] earned"
  - Archived entry: "Archived: [mission name], [type] mission, [domain], archived [date], [XP] partial XP earned"
  - SIA summary: "Summary: [summary text]"
  - Photo thumbnails: "View [count] progress photos from this mission"
  - Archive note: "Archive note: [note text]"
- **Focus order**: Back button → Filter chips (left to right) → Month header → Entry cards (top to bottom, each card as a unit, summary and photos as child elements) → Next month header → Next entries
- **Gesture alternatives**: Standard tap and swipe-from-edge navigation. No custom gestures required.
- **Reduced motion**: Staggered card entry replaced with instant display. Photo thumbnail stagger replaced with instant display. Filter transition crossfade replaced with instant swap. Completion-journey path (S73-V01) renders fully drawn at rest with all nodes settled and the current-node pulse off; XP StatBars render at final width; the completion-count tile renders at final value (the settled frame is canonical — no info lost).

---

## Cross-References

- **Navigates to**: Mission Detail [14] via stack push (tap entry card), Image Viewer [67] via modal present (tap photo thumbnails)
- **Navigates from**: Mission Board [13] via stack push (journal icon in header), RPG Character [19] via stack push ("View full journal" link), Me Main [17] via stack push (quick links grid card)
- **Shared components with**: Mission Board [13] (Filter Chip, Domain Tag Chip, Mission Type Badge), Mission Detail [14] (Mission Type Badge, Domain Tag Chip, archived state reference)
- **Patterns used**: Back Button, Domain Tag Chip (from Screen 12), Mission Type Badge (Phase 2), Filter Chips (from Screen 13, adapted for journal), Section Eyebrow Label (adapted as month header), 8-State Interaction Model, Motion Tokens, Staggered Content Entry
- **Patterns established**: Journal Entry Card (completed variant with SIA summary + photos, archived variant with partial XP + user note), Month-Grouped SectionList, Photo Memory Thumbnails (circular 32pt inline thumbnails linking to Image Viewer)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/goals/journal`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B07-F01 | major | information-architecture | Wire filter state, domain/type sub-filter rows, mission detail links, and photo thumbnail Image Viewer behavior. |
| B07-F02 | major | navigation | Render the back affordance as a labeled 44x44 semantic control with stack-pop behavior. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

