# Screen Design: Personal Wiki / SIA Memory

**Screen**: 20 of 73
**File**: 20-personal-wiki-sia-memory.md
**Register**: Product Mode
**Primary action**: browse and edit what SIA knows about you
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via "book of life" quick link on Me Main.

---

## Purpose

The Personal Wiki is SIA's memory made visible — a browsable, editable knowledge base of everything the AI coach has learned about the user. Framed as the "Book of Life," it stores different chapters: personal details, preferences, behavioral patterns, cross-domain correlations, goals history, and life events. It grows over time into a comprehensive life record. This screen builds trust by making AI transparent ("here's exactly what SIA knows") and gives users control ("edit it, delete it, tell SIA it's wrong"). It's distinct from chat history (conversations) and journal entries (user-written). This is the AI-compiled knowledge base.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar — top, for finding specific memories (direct lookup)
2. Chapter tabs — horizontal scrolling pills to navigate between knowledge categories
3. Entry cards — scrollable list of wiki entries for the selected chapter
4. Entry detail — each card shows title, content, source, date, and actions (edit/delete/"this is wrong")

**User flow**:
- **Arrives from**: Me Main [17] ("book of life" quick link)
- **Primary exit**: Back → Me Main [17] (stack pop)
- **Secondary exits**: Tap correlation entry → SIA Chat [09] (tab switch with explanation context), edit entry → inline edit mode

---

## Layout

**Scroll behavior**: FlatList within selected chapter (entries can be numerous)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Book of life                │  ← Back + title (44pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔍 search memories...   │   │  ← Search bar (44pt)
│  └─────────────────────────┘   │
│                                 │
│  [About you][Prefer.][Patterns] │  ← Chapter tabs
│  [Correlat.][Goals H.][Life ev] │    horizontal scroll
│                                 │    (36pt)
│  ─────────────────────────────  │
│                                 │
│  23 entries · last updated today│  ← Chapter meta (20pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │ Morning person           │   │
│  │ You tend to be most      │   │  ← Entry card
│  │ productive between       │   │    ~120pt each
│  │ 6-10am.                  │   │
│  │                         │   │
│  │ 📝 from conversation     │   │
│  │ May 3, 2026              │   │
│  │                         │   │
│  │ [edit] [this is wrong]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Prefers strength over    │   │
│  │ cardio                   │   │
│  │ SIA detected from your   │   │  ← Entry card
│  │ workout patterns.        │   │
│  │                         │   │
│  │ 🔍 detected from data    │   │
│  │ Apr 28, 2026             │   │
│  │                         │   │
│  │ [edit] [this is wrong]   │   │
│  └─────────────────────────┘   │
│                                 │
│  ...more entries...             │
│                                 │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Back button + "book of life" title

2. **Search bar** — 44pt + 12pt top margin + 12pt bottom margin = 68pt
   - Full-width search input

3. **Chapter tabs** — 36pt + 12pt bottom margin = 48pt
   - Horizontal scrolling pill tabs

4. **Chapter meta** — 20pt + 16pt bottom margin = 36pt
   - Entry count + last updated

5. **Entry cards** — FlatList, variable height (~120pt per card, 12pt gaps)
   - Scrollable list of wiki entries

6. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern
  - Title: "book of life" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Search Bar
- **Purpose**: Find specific memories by keyword
- **Data source**: Client-side filter across all chapters (searches titles and content)
- **Visual treatment**: Same as Explore Section [18] search bar:
  - Full-width minus 32pt (16pt margins)
  - Height: 44pt
  - Background: ink-brown-800
  - Border: 1pt white at 10% (default), 2pt orange (focused)
  - Border-radius: --r-pill (999pt)
  - Left: magnifying glass 16pt, white at 40%
  - Placeholder: "search memories..." — 15pt Sora Regular, white at 40%
  - Right: clear X when text entered
- **Behavior**: When searching, chapter tabs become inactive (search spans all chapters). Results show entry cards with chapter name as a badge on each card. When cleared, returns to chapter view.
- **Gestures**: Tap → focus + keyboard. Tap X → clear.
- **Size**: full-width minus 32pt x 44pt

### Chapter Tabs
- **Purpose**: Navigate between wiki sections / knowledge categories
- **Data source**: Static chapter definitions + entry count per chapter from API
- **Visual treatment**: Horizontal ScrollView of pill-shaped tabs
  - Tab pill:
    - Height: 32pt
    - Padding: 12pt horizontal
    - Border-radius: --r-pill (999pt)
    - Active: orange (#FF5E00) fill, white text 13pt Sora Semibold
    - Inactive: transparent, 1pt border white at 10%, text 13pt Sora Regular white at 50%
    - Entry count badge: "(23)" appended to tab label in same weight, white at 40% on active, white at 30% on inactive
  - Tab spacing: 8pt between pills
  - Left padding: 16pt (aligned with screen margins)
  - Horizontal scroll, last tab has 16pt trailing padding
- **Chapters** (in order):
  1. "about you" — personal details SIA knows (name, age, preferences, family, etc.)
  2. "preferences" — communication style, schedule preferences, diet, SIA interaction preferences
  3. "patterns" — AI-discovered behavioral patterns ("you skip workouts on Mondays", "you spend more when stressed")
  4. "correlations" — cross-domain correlations (the browsable secret sauce: "your sleep quality correlates with next-day spending")
  5. "goals history" — archived goals, their outcomes, lessons learned
  6. "life events" — significant events SIA has recorded ("started new job May 2026", "moved to new city")
- **Variants**: Active chapter (orange fill), inactive (outlined). Search active → all tabs become inactive/dimmed.
- **Gestures**: Tap tab → switches to that chapter's entries (crossfade). Horizontal scroll to see more tabs.
- **Size**: full-width x 36pt (tabs) — scrollable horizontally

### Chapter Meta
- **Purpose**: Context for the current chapter
- **Data source**: API (entry count, last update timestamp)
- **Visual treatment**: 
  - Text: "23 entries · last updated today" — 12pt Sora Regular, white at 40%, left-aligned, 16pt left margin
  - Updates when chapter changes
- **Variants**: "0 entries" → shows empty state instead of entry list. "last updated 3 days ago", "last updated May 3"
- **Size**: full-width x 20pt

### Entry Card
- **Purpose**: Display a single wiki entry with content, source, and actions
- **Data source**: Wiki entries API (per chapter)
- **Visual treatment**:
  - Card: full-width minus 32pt (16pt margins), min-height ~120pt (variable based on content), ink-brown-800, border-radius 16pt, 1pt border white at 8%, padding 16pt
  - Content layout (top to bottom):
    - Title: 15pt Sora Semibold, white, left-aligned, 1-line, ellipsis if long
    - Content: 14pt Sora Regular, white at 70%, left-aligned, 4pt below title, 3 lines max with "show more" if longer. "show more" is 13pt Sora Semibold, orange.
    - Source indicator row: 12pt below content
      - Icon (12pt) + source text (12pt Sora Regular, white at 40%)
      - Conversation source: speech-bubble icon + "from conversation · [date]"
      - Data detection: search/radar icon + "detected from data · [date]"
      - User-edited: pencil icon + "edited by you · [date]"
    - Action row: 16pt below source, left-aligned
      - "edit" — 13pt Sora Semibold, white at 50%, 44x32pt touch target
      - "|" divider — white at 15%, 8pt horizontal margin
      - "this is wrong" — 13pt Sora Semibold, white at 50% (neutral muted — calm trust-building control; alarm-red retired per S20-V04), 44x32pt touch target
  - For correlation entries (chapter 4): additional element:
    - Confidence badge: "high confidence" / "medium confidence" / "low confidence" — 10pt Sora Semibold, pill shape, 6pt vertical padding, 10pt horizontal padding
      - High: green (#34A853) bg at 15%, green text
      - Medium: orange (#FF5E00) bg at 15%, orange text
      - Low: white at 10% bg, white at 40% text
    - Positioned: right-aligned on the title row
    - Tap correlation → SIA Chat with "explain this correlation" context
- **Card gap**: 12pt between cards
- **Variants**: 
  - Standard entry (About You, Preferences, Patterns, Life Events, Goals History)
  - Correlation entry (has confidence badge + tappable for SIA explanation)
  - Expanded (content fully shown after "show more" tap)
  - Edit mode (see Edit Mode component below)
  - Search result (has chapter badge pill: chapter name in tiny pill, top-right, white at 10% bg)
- **Gestures**: 
  - Tap "edit" → inline edit mode
  - Tap "this is wrong" → confirmation dialog, then marks entry for SIA review + removes or corrects
  - Tap "show more" → expands content
  - Tap correlation entry → SIA Chat [09] with context
- **Size**: full-width minus 32pt x variable (~120-180pt)

### Edit Mode (Inline)
- **Purpose**: Allow users to correct or update wiki entries
- **Data source**: Current entry data
- **Visual treatment**: Card transforms in-place:
  - Title becomes editable text input (same styling, underlined with orange 1pt)
  - Content becomes multiline text input (same styling, bordered with orange 1pt, min-height 80pt)
  - Source row remains visible but non-editable
  - Action row changes to:
    - "save" — 13pt Sora Semibold, orange (#FF5E00), 44x32pt touch target
    - "|" divider
    - "cancel" — 13pt Sora Semibold, white at 50%, 44x32pt touch target
    - "|" divider
    - "delete" — 13pt Sora Semibold, white at 50% (neutral muted — opens confirmation; alarm-red retired per S20-V04), 44x32pt touch target
  - Card border changes to 1pt orange at 30% (indicates edit mode)
- **Gestures**: Tap "save" → saves changes, exits edit mode, updates source to "edited by you · [today]". Tap "cancel" → discards, exits edit. Tap "delete" → confirmation dialog → removes entry.
- **Size**: same footprint as entry card, slightly taller if content expanded

### "This Is Wrong" Confirmation
- **Purpose**: Let users flag incorrect information
- **Data source**: Entry ID
- **Visual treatment**: Bottom sheet (modal, slides up):
  - Height: ~200pt
  - Content: "is this information wrong?" — 17pt Sora Semibold, white, center-aligned. Below: "SIA will review and correct this. you can also edit it directly." — 14pt Sora Regular, white at 60%.
  - Actions:
    - "yes, remove it" — full-width orange CTA (Brand CTA Button pattern), 56pt
    - "edit instead" — full-width outlined button (transparent bg, 1pt white at 20% border, white text), 56pt
    - "cancel" — text link, center-aligned, white at 50%, 44pt touch target
- **Gestures**: Tap "yes, remove it" → entry removed with slide-out animation. Tap "edit instead" → dismisses sheet, enters edit mode. Tap "cancel" / drag down → dismiss sheet.

### Delete Confirmation
- **Purpose**: Prevent accidental deletion
- **Visual treatment**: Same bottom sheet pattern as "This Is Wrong" but:
  - Content: "delete this entry?" — 17pt Sora Semibold, white.
  - "this cannot be undone." — 14pt Sora Regular, white at 60%.
  - "delete" — full-width red CTA (#f44336 fill, white text), 56pt
  - "cancel" — text link, center-aligned, white at 50%, 44pt touch target

---

## Visualization

> Source: no companion file (the `20-…-visualization-recommendations.md` is the sibling worksheet, not a spec dependency); audited in `viz-audit/` — Batch (lightweight-MEDIUM), findings `S20-V01..S20-V04`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen *reuses* `VK-010 NetworkGraph`** (minted on Knowledge Graph [72]; Personal Wiki [20] is its second listed consumer) as a **contained mini**, and reuses the `VK-009` signed-strength-bar encoding for confidence. **No new primitive is minted.** No new data — both visuals derive from data the screen already holds (`correlations`-chapter entries + their `confidence`, and the existing `knowledgeGraph` correlation set). **Current grade D (56) → specced-target A− (85).** *(Honest re-grade under the 10-dimension rubric: the wiki is fundamentally a text record — premium ≠ maximal here. The bar is met by **two restrained, intentional** visuals on the one chapter that genuinely benefits — Correlations — while every other chapter's entry cards stay deliberately textual. The residual gap to A+++ is build-verified depth + working pan/zoom/drill, owned by the later viz-build program.)*

Template = **Lightweight-MEDIUM 2-subsection mini** (`CONSISTENCY.md` §6 thin variants), cluster benchmark **Obsidian / Roam graph view + Reflect** (legible life-connection network) with the **Apple Health / Linear** restraint floor. **Editorial restraint is the design here:** this is the user's *book of life* — a browsable text record — so the section adds visualization to exactly the **Correlations chapter** (relationships + strength are the only data with a genuine visual form) and leaves About-you / Preferences / Patterns / Mission-history / Life-events entries as clean text. The entry card, source row, edit affordances, search and chapter tabs are unchanged.

**Register resolution (load-bearing — the spec's own §60/30/10 said "purple is absent").** The screen *chrome* stays **Product Mode, orange-dominant** — user control: search border, active chapter tab, "show more", "save", edit-mode border, confirmation CTA, and the active Me tab are all orange. That is correct and unchanged. The **one inserted Correlations-graph mini is SIA-originated content** — it renders SIA's *inferred* cross-domain correlations — so, per `VK-010` and `_shared-patterns.md` §"AI Mode" (the sanctioned purple register for SIA-authored surfaces), that single card runs **purple node-link ink as a contained local exception**, not a global mode flip. The screen is **not** purple-dominant; purple is scoped to the graph card and the confidence-direction tint, both genuinely SIA-authored. This reconciles the brief ("AI Mode · Purple (SIA)") with the spec ("Product Mode") honestly: *user-control chrome stays orange; SIA's-memory viz is purple.*

### Visualized-vs-text map

| Datum (already on the screen) | Today | Specced visual | Primitive |
|---|---|---|---|
| Correlations chapter — the inter-entry relationship set ("sleep ↔ spending", "sleep ↔ workout", etc.) | text-only entry cards; no relationship view | **contained NetworkGraph mini** of memory connections — domain-coloured nodes, purple edges, inferred = dashed / confirmed = solid | **`NetworkGraph` (VK-010, reuse 72)** |
| Per-entry `confidence` (high / medium / low) | a **colour-coded text pill** (green / orange / white) — status by colour + word, no magnitude | **honest strength bar** (filled to confidence level) + the word — same row, no colour-alone | `VK-009` strength-bar encoding (reuses `MacroBar`/`StatBar` track) |
| Connection **strength** per correlation (0–100, e.g. 85 / 72 / 68) | not shown numerically | edge width + node degree in the graph; **% + bar** in the detail panel | within `NetworkGraph` (VK-010) |
| Entry title / content / source / date / chapter meta / counts | text | — (**deliberately textual** — narrative life-record copy + identity labels; no useful visual form; over-charting these is penalised) | — |
| About-you / Preferences / Patterns / Mission-history / Life-events entries | text cards | — (**deliberately textual** — these chapters are prose memory, not metrics) | — |

### 1 · NetworkGraph mini — SIA's memory connections — `S20-V01`  *(reuse `VK-010`)*

At the top of the **Correlations chapter only** (above the entry list; absent on every other chapter), a **contained NetworkGraph mini** (`VK-010`, the same primitive minted on Knowledge Graph [72]) renders SIA's inferred cross-domain correlations as a **mobile-legible, precomputed, settled** node-link map — the visible form of the Life Correlation system, scoped to a ~220pt-tall card (not the full-screen canvas of [72]). It makes the "browsable secret sauce" actually browsable: tapping a node re-centres and surfaces that correlation; tapping a node's connection deep-links to the matching wiki entry / SIA Chat [09] with "explain this correlation" context (the screen's existing secondary exit).
- **Layout (locked, `VK-010`):** positions **precomputed/frozen** to normalized `(x,y)` ∈ [0,1] on a **square logical canvas with aspect preserved** (replaces the [72] prototype's distortion-prone `preserveAspectRatio="none"` — flagged `S20-V03`); **no client-side force sim** (no jitter). Mini caps: ~7 nodes / ~6 edges (this card's correlation set), edges <25% strength hidden (doubles as the 1.4.11 contrast floor). Buttoned zoom/reset + pan for the non-full-screen card; double-tap = 1.5× at point.
- **Node encoding (token-backed):** radius by **connection degree** (24pt @1–2 edges → up to ~48pt for the hub; most 30–40pt); fill = `--color-domain-*` @80% (identity only — sleep `#818CF8`, fitness `#EF4444`, wellbeing `#14B8A6`, productivity `#F97316`, meditation `#A78BFA`, nutrition `#84CC16`, finance `#10B981`); label `text-small` white below at zoom >0.7×; **hub** (3+ edges ≥70%) carries `--glow-orange-sm` (~12px, **mint**) **in the node's own domain colour @12%** — never a 32px bloom on a 40pt node; **selected** node = scale 1.2× + 2pt white border + `--glow-purple`, non-connected nodes → 30% opacity + labels hidden.
- **Edge encoding (token-backed):** stroke width = strength (`--stroke-thin` **(mint)** 2px @<40% → ~3px @>75%), round caps/joins (§8); colour `--color-royal-purple` (SIA-authored), opacity 15%→60% by strength; **`inferred` edges = dashed (4·2), `confirmed` = solid** — the SIA-confidence signature (§11 forecast language applied to relationships); selected node's edges → 80% + a 2s pulse, unrelated → 5%.
- **Depth:** card surface `ink-brown-800` + top-edge highlight + faint radial backplate behind the cluster; the only glow is the single hub `--glow-orange-sm` in domain colour; carved, warm, not neon.
- **Data:** `knowledgeGraph.nodes` / `.edges` / `.connections` filtered to the user's correlation entries (the same correlation set already powering [72]); each node maps 1:1 to a Correlations-chapter entry so node-tap ↔ entry is honest.
- **States (per `VK-010`):** **cold-start** = 3–5 **ghosted** domain placeholder nodes @20% + purple 3-dot pulse + "SIA is still mapping your connections — they appear after a week or two of regular use" (never an empty canvas; mirrors the chapter's existing patterns/correlations empty copy); **early/sparse** = the real small graph + "keep tracking" nudge; **partial** = available nodes/edges render, missing simply absent (not an error); **loading** = 3 purple dots pulse + "loading your connections…"; **error** = centred glyph + message + **orange** retry (the lone orange action in the purple card).

### 2 · Confidence strength bar — honest, never colour-alone — `S20-V02`  *(reuse `VK-009` encoding)*

The correlation entry card's **confidence badge** (today a green / orange / white text *pill* — status by **colour + a word only**, conveying no magnitude) gains a **thin honest strength bar** beneath the word, filled to the confidence level on one shared scale (high ≈ full, medium ≈ ~⅔, low ≈ ~⅓), so confidence reads as a **magnitude**, not just a hue. The word stays — **never colour-alone** (RUBRIC dim 10).
- **Encoding (token-backed):** bar reuses the `MacroBar`/`StatBar` track — fill over `--color-alpha-white-08` on `--track-inset` **(mint)**; **fill colour is purple** `--color-royal-purple` (this is SIA's confidence in its *own* inference — register-correct, not a 60/30/10 violation), with the confidence **word** ("high confidence") retained as the visible label; high also shows a ✓ glyph so high-confidence isn't green-alone.
- **Honesty / non-shaming:** the bar is a **disclosed confidence**, not a verdict; a *low*-confidence correlation is framed as "SIA is less sure — tell it if this is wrong" (the screen's existing "this is wrong" affordance is the lever), never greyed-as-failure. No autoscale tricks — the scale is the fixed 0–100 confidence range.
- **Data:** `wikiEntries[].confidence` (already on correlation entries).

### Brand & honesty corrections (caught against the live prototype) — `S20-V03`, `S20-V04`

- **`S20-V03` — `preserveAspectRatio="none"` distortion (carried from the [72] prototype graph).** The current Knowledge-Graph render (the primitive this mini reuses) stretches the node field with `preserveAspectRatio="none"`, distorting circular nodes into ellipses and falsifying inter-node distances (a relationship-honesty defect). The mini **must** render on a square logical canvas with aspect preserved (locked in `VK-010`). *Medium · chart-honesty.*
- **`S20-V04` — destructive-red `#f44336` on routine controls.** "This is wrong", edit-mode "delete", and the delete CTA use alarm-red `--color-error-red` `#f44336` on *non-emergency, fully-undoable* memory controls. Flagging your own AI memory is a **calm, trust-building** action, not a hazard — alarm-red here reads as shaming/dangerous and is off the 60/30/10 system. **Specced:** "this is wrong" → a neutral muted control (`white/50`, no red); the **delete-confirmation CTA** may keep red as the single genuinely-irreversible destructive action, but inline "delete" and "this is wrong" lose the alarm hue. *(Not a chart finding per se, but a live brand/non-shaming defect on this surface — logged so the viz-build pass doesn't re-import it.)* *Low–Medium · brand / non-shaming.*

### Motion choreography (entrance, draw-first)

Per `CONSISTENCY.md`: on the **Correlations chapter**, the **NetworkGraph mini draws first** — nodes fade in staggered (20ms/node, 280ms `--ease-out-soft`) at their precomputed positions → edges then **draw themselves** outward (`stroke-draw`, ~520ms `--ease-flow`) — **draw, never opacity-fade** (§8); the single hub glow blooms last; selected-edge pulse loops 2s on tap. Below it, correlation entry cards keep their existing 40ms-stagger fade-up, and each **confidence strength bar rises** `0→level` (`--dur-slow` 520ms `--ease-flow`) after its card lands. One line/graph motif per surface. Chapter switch keeps the existing 160ms-out / 280ms-in crossfade; the graph re-draws on entering Correlations, and is simply absent on other chapters (no degenerate empty graph). `prefers-reduced-motion` → the graph renders at its **settled final frame instantly** (edges fully drawn, pulse off — the settled frame is the canonical frame), bars at final level, entry stagger replaced by instant display.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — Correlations chapter shows the `VK-010` ghosted-placeholder graph + "SIA is still mapping your connections…" (matching the spec's warmer patterns/correlations empty copy), and no strength bars (no correlations yet); other chapters use the spec's existing "nothing here yet" empty state, unchanged. **Loading** — graph = 3 purple pulsing dots; entry cards = the spec's existing title+2-line skeleton shimmer (preserved). **Partial / sparse** — graph renders the nodes/edges present, ghosts the rest, never a fake zero. **Error** — graph error per `VK-010` (orange retry); entry-fetch error per the screen's existing Error-Handling table ("couldn't load entries" + try again).
- **60/30/10 (corrected from the spec's "purple absent" claim):** the screen stays **orange-dominant chrome** (search, active tab, "show more", "save", edit border, confirmation CTA, active Me tab — all unchanged). **Green** stays minimal (the save-success border flash; the high-confidence ✓). **Purple is now present and correct, *scoped*:** the SIA-memory NetworkGraph edges and the confidence strength-bar fill are SIA-authored, so purple is register-correct there — **including dashed-purple as the inferred-edge signature** (§11 forecast language) — and the card cites `_shared-patterns.md` §AI Mode. The screen is *not* globally purple-dominant. Domain colours appear **only** as node identity. Glow uses the calibrated size-stepped scale (warm `--glow-orange-sm` hub / `--glow-purple` on selection), never neon.
- **Non-shaming (ethical gate):** confidence is a **disclosed magnitude**, never a verdict; a low-confidence correlation invites correction ("tell SIA if this is wrong"), never shames; alarm-red retires from routine memory controls (`S20-V04`) so flagging/editing one's own AI memory feels calm and in-control — the screen's whole purpose. No streaks/loss-aversion on this surface.
- **Accessibility:** the graph carries the `VK-010` text-equivalent — canvas `aria-label` "memory-connection graph: N correlations across M domains"; each node `role="button"`, "[name], [domain], [N] connections, tap to explore"; and the **AT alternative view** = a flat list of nodes sorted by connection count (full data with zero graph comprehension — the Correlations entry list *is* effectively this list, so the graph adds no AT debt). Strength is always a **visible % + bar**, never width/colour-alone; confirmed-vs-inferred is **solid-vs-dashed** (non-colour); confidence is **word + bar + ✓**, never colour-alone. Load-bearing node fills / edge strokes / the filled-confidence boundary meet **WCAG 1.4.11 ≥3:1** on `#0A0A0F`/`#211008` (sub-25% edges hidden — the contrast floor); value/label text ≥**4.5:1**; node + bar interactive targets ≥**44×44pt** (min-44 hit box around each node, carrying B08-F05). `prefers-reduced-motion` renders all visuals at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Obsidian / Reflect (knowledge graph with memory trust, text-primary) — *stays Balencia via the warm-glow entry-card surfaces + the calm, non-shaming memory-control tone (no alarm-red on routine "this is wrong" actions) + the SIA-authored purple graph scope, never globally purple-dominant.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): The Visualization section is strong (A− baseline with honest NetworkGraph + confidence strength bars specced); the craft gaps are: (1) entry cards are `--color-ink-brown-800` with no top-edge highlight or layered depth; (2) search bar and chapter tabs lack depth treatment; (3) edge microcopy (empty state, loading, error, permission) is partly unwritten; (4) type line-heights and tracking unspecified; (5) the five state-craft cells are text-only; (6) contrast pairs asserted but not tabulated; (7) motion choreography for the graph draw + bar rise + card entrance is not choreographed; (8) surfaces may read flat/generic without the full depth toolkit.

### Focal hierarchy

One focal point: the **Correlations chapter's NetworkGraph mini** (`CK-P2`, data hero on the Correlations tab only) — the visual form of the "browsable secret sauce" when a user has built enough history. The graph sits above the entry list, is the largest ≥96px glowing element on that chapter, and reads as the focal hero. On other chapters (About You, Preferences, Patterns, Goals History, Life Events), the **chapter itself is the focal anchor** — each chapter's entry list is the primary interaction zone, with the chapter meta ("23 entries · last updated today") as a quiet secondary label. On Day-1 / empty Correlations, the ghosted hint text graph + warm message replaces the focal role until real data arrives (never a degenerate empty canvas). Search mode collapses all chapter focus: the search bar becomes the focal element, and results are a flat list of entries across chapters. Everything else (tabs, meta, actions, edit mode) is visibly secondary by size and weight.

### Surface & depth

Every **entry card** adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28px) · 1px `--glass-border` (`--color-alpha-white-08`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. The **search bar** (44pt tall, 8pt inline) receives the same depth language: `--color-ink-brown-800` body · `--radius-pill` · 1px `--glass-border` on focus only (orange at 2pt) · `--edge-highlight` · `--shadow-1` when focused. Chapter tabs are **pill-shaped** on a transparent background (no card surface — they sit in the scroll above the entry list), so they carry no shadow; the active tab gets an orange fill (`--color-brand-orange`), the inactive tabs get a 1pt `--glass-border` (`--color-alpha-white-10`) — both layered treatments (no flat fills). Entry card **edit mode border** is 1pt `--color-brand-orange` at 30% opacity (indicates the edit state without alarm). Confidence strength bars sit within correlation entry cards: 6px height, `--radius-pill` caps, `--color-alpha-white-08` track over `--track-inset` (the recessed baseline), fill is `--color-royal-purple` (SIA's confidence, not a user metric) with a check glyph ✓ for high confidence — never colour-alone. The **Correlations NetworkGraph mini** inherits the card layering from `VK-010` (purple edges, domain-colour nodes, the existing depth from Visualization §3); this section ensures the surrounding entry cards + tab chrome + search all speak the same warm-glow language. No surface reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: nav title "book of life" `--text-h3` (17pt) / 600 weight / `--leading-snug` (1.25) / white 100%; search hint `--text-body` (15pt) / 400 / `--leading-normal` / white at 40%; chapter tab label (active) `--text-caption` (13pt) / 600 / `--leading-normal` / white 100%; chapter tab label (inactive) `--text-caption` (13pt) / 400 / `--leading-normal` / white at 50%; chapter tab count badge `--text-small` (11pt) / 400 / white at 40% (active) or white at 30% (inactive); chapter meta "23 entries · last updated today" `--text-small` (11pt) / 400 / `--leading-normal` / white at 40%; entry card title `--text-body` (15pt) / 600 / `--leading-snug` / white 100%; entry card content `--text-body` (14pt) / 400 / `--leading-normal` / white at 70%; "show more" link `--text-caption` (13pt) / 600 / `--color-brand-orange` (the interactive accent); source indicator text (icon + label) `--text-small` (11pt) / 400 / `--leading-normal` / white at 40%; action buttons ("edit", "this is wrong", "save", "delete") `--text-caption` (13pt) / 600 / `--leading-normal`; confidence badge text `--text-small` (10pt) / 600 / `--leading-tight` (1.1); empty state heading `--text-h2` (20pt) / 600 / `--leading-snug` / white 100%; empty state body `--text-body` (14pt) / 400 / `--leading-normal` / white at 50%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (the orange "show more" link is the one; "save" action is functional, not an accent word). Chillax stays logo-only (none on this screen). Replaces the Typography table's pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

Edge strings authored to `CK-P5` brand voice:
- **Search bar hint text** — *before (given):* "search memories..." → *after (kept):* same; warm, plain, directional. (Already on-voice.)
- **Empty chapter (Day-1 / new user)** — *before:* "nothing here yet" + body → *after (kept):* same structure, body is warm and specific per chapter: "as you talk with SIA and use Balencia, this chapter will fill with things SIA learns about you." (Already on-voice.)
- **Patterns / Correlations empty (sparse)** — *before:* "SIA needs more time to discover your patterns…" → *after (kept):* same; warm, growth-oriented. (Already on-voice.)
- **"This is wrong" confirmation heading** — *before:* "is this information wrong?" (given) → *after (kept):* same. Body: "SIA will review and correct this. you can also edit it directly." (calm, not shaming, and non-destructive — this is memory control, not a hazard). No alarm-red on the "yes, remove it" CTA in this confirmation (it's a full-undo review, not irreversible; alarm-red is only on the delete-entry CTA after inline edit). (Resolves S20-V04.)
- **"This is wrong" action button** — *before:* text hint text / assuming alarm-red per S20-V04 finding → *after:* "this is wrong" label, `--color-alpha-white-50` (neutral muted, calm control, no red). (Resolves S20-V04.)
- **Edit mode "delete" button (inline)** — *before:* text hint text / assuming alarm-red → *after:* "delete" label, `--color-alpha-white-50` (neutral muted). The delete-confirmation CTA that follows may use red as a single genuinely-irreversible action, but inline "delete" loses the alarm hue.
- **Search with no results** — *before:* no message → *after (new):* centered message "no memories match '[query]'" (15pt, white at 40%) + sub-message "try a different search or browse by chapter" (13pt, white at 30%). Non-shaming, directive.
- **Chapter switch loading** — *before:* no message → *after (new):* "SIA is gathering your memories — one moment." (warm, specific, never generic "Loading…").
- **Entry save error** — *before:* generic "Couldn't save changes" → *after (new):* "Couldn't save changes. Try again." (specific, recovery action named).
- **"This is wrong" submission failure** — *before:* generic failure → *after (new):* "Couldn't flag this entry. Try again." (specific, warm).
- **Correlation entry confidence in detail** — *before:* badge text ("high confidence") only → *after (new, in bar label):* the word stays ("high confidence"), and a check glyph ✓ appears on high-confidence entries (never colour + text alone; glyph + text + bar form the honesty triple).
- **NetworkGraph mini, Day-1 state** — *before:* spec says "SIA is still mapping your connections…" → *after (kept):* same; warm, growth-oriented, never empty or degenerate. (Already on-voice in Visualization §1.)

No exclamation marks; the brand period used with intent; SIA copy is specific to the user's own data (the network graph shows real inferred correlations, never a horoscope).

### Motion choreography

Locked to `CK-P4` order (draw-first, on the Correlations chapter only): chapter load → **NetworkGraph mini renders** — nodes fade-in staggered (20ms/node, 280ms `--ease-out-soft`) at precomputed positions → edges **draw themselves** outward (stroke-draw, ~520ms `--ease-flow`) → the **hub glow blooms** last (the orange-in-domain-colour warm glow, `--glow-orange-sm` ~12px at 12% opacity, never neon). Below the graph, **confidence strength bars rise** `0 → level` (520ms `--dur-slow` `--ease-flow`, one bar per card, 40ms stagger) after the graph settles. **Entry cards fade-up** (40ms stagger, 280ms `--dur-base` `--ease-out-soft`). Chapter switch keeps the existing 160ms-out / 280ms-in crossfade; on entering Correlations, the graph re-draws and entry cards stagger in; on leaving Correlations, the graph is absent (no degenerate collapsed state — just gone). Search mode: results list fades in together (no stagger — speed signals search completion). `prefers-reduced-motion` → the graph renders at settled final frame instantly (all edges drawn, pulse off — the settled frame is the canonical frame), bars at final level, entry stagger replaced by instant display. No opacity-fade on any stroke or line (§8).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | All chapters visible, most show "(0)" count; active chapter with 0 entries shows centered message + no entry cards; Correlations chapter shows `VK-010` ghosted hint text graph (3–5 faint domain nodes, 50% opacity, no edges) + "SIA is still mapping your connections — they appear after a week or two of regular use" message (centered, warm) | "nothing here yet"; "as you talk with SIA and use Balencia, this chapter will fill with things SIA learns about you." (per chapter, warm) | ghosted graph never degenerate empty; surfaces carry full depth (edge-highlight, shadow-1); no generic copy |
| Loading | Chapter tabs inactive (dimmed); chapter meta skeleton; entry cards show title + 2-line content as skeleton shimmer (`--color-ink-brown-800` shimmer), preserving card depth (border + shadow visible); Correlations graph shows 3 purple pulsing dots + "loading your connections…" | "SIA is gathering your memories — one moment." | skeleton on `--color-ink-brown-800`, morphs into data (never a spinner-swap); surfaces preserve depth |
| Empty / partial | Present domains / chapters render normally; missing chapters/entries remain skeleton (not hidden); Correlations graph shows present nodes/edges, ghosts missing connections (no-data ≠ zero); search with no results shows centered message + sub-message | Per-chapter: "Can't sync Relationships chapter — try again later" (if applicable); search-no-results: "no memories match '[query]' · try a different search or browse by chapter" | no-data ghosted, not silent; ghosted/dashed distinct from real 0 |
| Error | Chapter tab activates visually but entries don't load; skeleton shimmer shown with a network error banner below sticky header, naming the failed section + "try again" affordance; Correlations graph error per `VK-010` (centred glyph + "Couldn't load connections" + orange retry button); entry-fetch error uses the Error Handling table pattern | "Couldn't load entries. Try again." (generic sections); "Couldn't load connections" (graph, orange retry — the only orange action in the purple card, per Visualization design) | calibrated `--color-error-red` only on genuine sync failure, glyph + word paired |
| Offline | All cached entries display normally; chapter tabs functional (cached counts); Correlations graph shows last-cached state; search disabled with message "You're offline — search unavailable"; pull-to-refresh dimmed with reason | "You're offline — showing your last sync." (banner, app-level); "Search unavailable while offline." (search bar, dimmed state) | actions honestly dimmed (50% opacity, no haptic on disabled); cached data retained |

### Signature & anti-generic

Ownable moments: (1) the **calm, non-shaming tone on memory-control actions** — "this is wrong" is a warm affordance to correct your own AI memory, not an alarm-red hazard (a unique Balencia voice on this trust-building surface); (2) the **warm-glow entry-card surfaces** + top-edge highlights on every surface (never flat boxes) — the same depth signature as all Balencia screens; (3) the **SIA-authored purple scope** on the Correlations NetworkGraph + confidence strength bars (purple edges, domain nodes, purple bar fill, high-confidence check glyph) — SIA's memory is visually distinct from the orange user-control chrome (search, tabs, "show more", "save", edit border, CTAs are all orange), so the screen makes clear what's user-editable vs SIA-inferred. Anti-generic fixes: (1) the entry-card list is broken from flat equal-weight monotony by the chapter hierarchy + varied empty states + the graph hero on Correlations (which never appears on other chapters) — so the screen reads as intentional, not templated; (2) every action button is authored and contextual ("edit", "this is wrong", "save", "delete", "cancel"), not generic defaults; (3) the offline/loading/error states are all designed with on-voice copy, not generic spinners or fallback messages. The stale ASCII wireframe in the spec (showing flat pill buttons, omitting the graph, omitting card depth) is flagged to be redrawn from this section in the build — logged as a visual-consistency check.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
| Element | Color | Contrast |
| --- | --- | --- |
| Nav title "book of life" | `--color-alpha-white-100` | ≥12:1 |
| Search hint text | `--color-alpha-white-40` | ≥4.5:1 |
| Entry card title | `--color-alpha-white-100` | ≥12:1 |
| Entry card content | `--color-alpha-white-70` | ≥4.5:1 |
| Chapter tab label (active) | `--color-alpha-white-100` on `--color-brand-orange` | ≥3.5:1 |
| Chapter tab label (inactive) | `--color-alpha-white-50` | ≥4.5:1 |
| "show more" link | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| "save" action | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` |
| "this is wrong" button | `--color-alpha-white-50` | ≥4.5:1 (calm neutral, not red) |
| "edit" button | `--color-alpha-white-50` | ≥4.5:1 |
| Confidence strength bar (purple fill) | `--color-royal-purple` | 2.8:1 (below 3:1 — flagged for build-phase luminance review; SIA confidence bar is secondary, non-leading data) |
| Confidence badge text + check glyph | word + glyph (not colour-alone) | ≥4.5:1 text + glyph at ≥44pt |
| NetworkGraph nodes (by domain colour) | `--color-domain-*` at 80% | ≥3:1 on card surface (VK-010 audit responsibility); sub-25% strength edges hidden (contrast floor) |
| NetworkGraph edges (purple, SIA) | `--color-royal-purple` at 15–60% opacity | ≥3:1 at 60% (confirmed edges), sub-25% (inferred edges) hidden |

Focus-visible: standardized to `CK-T03 --focus-ring` (2px orange, 2px offset) on every focusable element — search bar, chapter tabs, "show more" links, action buttons, correlation entry (tappable for SIA chat), confirmation sheet CTAs. Targets ≥44×44pt: search bar is 44pt; chapter tab pills are 32pt tall × 12pt h-padding (hit box expanded to 44pt vertically); all action buttons are 32pt tall but the touch target extends 44×44pt; confirmation sheet CTAs are full-width and ≥56pt tall (over-spec). Status never colour-alone: confidence level shows word + bar + check glyph (high-confidence); entry source shows icon + text (never icon-only); error shows glyph + message + recovery affordance. Reduced-motion: NetworkGraph renders at settled final frame; bars at final level; entry stagger collapses to instant; all loops off.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Search bar bg | #211008 | ink-brown-800 | Input surface |
| Search bar border (focused) | #FF5E00 | Burnt Orange | 60% — focus |
| Active chapter tab fill | #FF5E00 | Burnt Orange | 60% — active control |
| Inactive chapter tab border | white at 10% | — | Subtle outline |
| Entry card surfaces | #211008 | ink-brown-800 | z-10 |
| Entry card borders | white at 8% | — | Glass edge |
| Entry card border (edit mode) | #FF5E00 at 30% | Burnt Orange | Edit indicator |
| Entry title | white 100% | — | Primary text |
| Entry content | white at 70% | — | Secondary text |
| Entry source text | white at 40% | — | Tertiary text |
| "edit" action | white at 50% | — | Subtle action |
| "this is wrong" action | white at 50% | — | Neutral (calm, fully-undoable memory control — per S20-V04; alarm-red retired) |
| "show more" link | #FF5E00 | Burnt Orange | 60% — interactive |
| "save" action | #FF5E00 | Burnt Orange | 60% — primary action |
| "delete" action (inline trigger) | white at 50% | — | Neutral muted — opens confirmation; alarm-red retired (S20-V04); red kept only on the delete-confirmation CTA |
| Confidence: high | #34A853 at 15% bg, #34A853 text | Forest Green | 30% — positive |
| Confidence: medium | #FF5E00 at 15% bg, #FF5E00 text | Burnt Orange | 60% — caution |
| Confidence: low | white at 10% bg, white at 40% text | — | Neutral |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Chapter meta text | white at 40% | — | Tertiary |
| Confirmation CTA bg | #FF5E00 | Burnt Orange | 60% — primary |
| Delete CTA bg | #f44336 | Red | Destructive |

**60/30/10 verification**: Orange dominates the user-control *chrome* — active chapter tab, focused search border, "show more" links, "save" action, edit mode border, confirmation CTA, and the active Me tab. Green appears only on high-confidence correlation badges (paired with a ✓ glyph, never green-alone) and the save-success border flash. **Purple is present but *contained* (per ## Visualization → Register resolution):** the Correlations-chapter NetworkGraph mini's edges (incl. the dashed-purple inferred-edge signature) and the confidence strength-bar fill are *SIA-authored* memory content, so purple is register-correct there as a local AI-Mode exception — cite `_shared-patterns.md` §AI Mode. The screen is **not** globally purple-dominant; purple is scoped to the single SIA-memory card + the confidence bar, and the chrome stays orange. Domain colours appear only as node identity. Ratio holds.

---

## Interaction States

### Chapter Tab Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange fill, white text Semibold | — |
| Default (inactive) | transparent, white at 10% border, white at 50% text | — |
| Pressed (inactive) | bg white at 5%, text brightens to 70% | light impact |
| Focus-visible | 2pt orange ring inside pill | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Entry Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, border white at 8% | — |
| Pressed (correlation only) | scale(0.98), bg lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | title + 2-line content as skeleton shimmer | — |
| Error | N/A | — |
| Success | after save — brief green glow on card border (600ms) | success notification |

### "Show More" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | "show more" 13pt Sora Semibold, Burnt Orange (#FF5E00) | — |
| Pressed | Orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Text changes to "show less" after content expands | — |

### "Edit" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 50%, 13pt Semibold | — |
| Pressed | white at 80%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "This Is Wrong" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 50%, 13pt Semibold (calm muted control — alarm-red retired per S20-V04) | — |
| Pressed | white at 80%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "Save" Button (Edit Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange, 13pt Semibold | — |
| Pressed | darker orange, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | 0.4 opacity (no changes made) | — |
| Loading | text replaced with small spinner (12pt, orange) | — |
| Error | text turns red briefly, card border flashes red (600ms) | error notification |
| Success | card border flashes green (600ms), exits edit mode | success notification |

### "Delete" Button (Edit Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 50%, 13pt Semibold (calm muted control — alarm-red retired per S20-V04) | — |
| Pressed | white at 80%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | N/A | — |
| Loading | text replaced with small spinner (12pt, red) | — |
| Error | N/A | — |
| Success | card slides out to left and collapses (280ms) | success notification |

### Search Bar
Per Explore Section [18] search bar states.

### Back Button
Per Batch 1 pattern.

### Confirmation Sheet CTA Buttons
Per Brand CTA Button pattern (Batch 1) for primary CTAs. Outlined variant for secondary.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Chapter tab | Switch to that chapter (crossfade entries) |
| Tap | Search bar | Focus search, show keyboard |
| Tap | Search clear (X) | Clear search, return to chapter view |
| Tap | "edit" on entry | Enter inline edit mode |
| Tap | "this is wrong" on entry | Show confirmation bottom sheet |
| Tap | "show more" on entry | Expand entry content |
| Tap | Correlation entry | Switch to SIA tab with explanation context |
| Tap | "save" in edit mode | Save changes, exit edit mode |
| Tap | "cancel" in edit mode | Discard changes, exit edit mode |
| Tap | "delete" in edit mode | Show delete confirmation sheet |
| Tap | Back button | Stack pop to Me Main [17] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Vertical scroll | Entry list | FlatList scroll through entries |
| Horizontal scroll | Chapter tabs | Browse chapter pills |
| Pull-to-refresh | Entry list | Refresh entries from API |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Screen mount | Fade-in + translateY(8→0) | 280ms | ease-out-soft |
| Chapter tabs | Screen mount | Fade-in, 80ms after search | 280ms | ease-out-soft |
| Entry cards | Chapter load | Staggered fade-in + translateY(12→0), 40ms per card | 280ms each | ease-out-soft |
| Chapter switch | Tab tap | Current entries fade-out (160ms), new entries stagger in (280ms, 40ms stagger) | ~440ms total | ease-out-soft |
| Entry expand ("show more") | Tap | Height animates to full content, content fades in | 280ms | ease-out-soft |
| Edit mode enter | Tap "edit" | Border color transitions to orange, action row crossfades | 280ms | ease-out-soft |
| Edit mode exit | Tap "save"/"cancel" | Reverse of enter | 280ms | ease-out-soft |
| Entry delete | Confirmed delete | Card slides left + fades out, below cards slide up to fill gap | 280ms | ease-out-soft |
| "This is wrong" removal | Confirmed | Same as delete animation | 280ms | ease-out-soft |
| Bottom sheet | Present | Slides up from bottom, backdrop fades to 60% | 280ms | ease-out-soft |
| Bottom sheet | Dismiss | Slides down, backdrop fades out | 280ms | ease-out-soft |
| Save success glow | After save | Card border green glow flash | 600ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to SIA via correlation)**: Tab switch crossfade. SIA pre-loads with correlation context.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user, sparse wiki)
- Chapter tabs all visible, most show "(0)" entry count except "about you" which has entries from onboarding (name, life areas of interest).
- Active chapter with 0 entries shows centered message:
  - "nothing here yet" — 17pt Sora Semibold, white, center-aligned
  - "as you talk with SIA and use Balencia, this chapter will fill with things SIA learns about you." — 14pt Sora Regular, white at 50%, center-aligned, 2-line max
  - No CTA needed — growth is automatic.
- "patterns" and "correlations" chapters: "SIA needs more time to discover your patterns. check back after a week or two of regular use." — warmer messaging, emphasizes growth over emptiness.

### Established user, empty chapter
- Same pattern but messaging adapts: "no correlations discovered yet" (if correlations tab is empty after data exists — rare edge case).

### Search with no results
- All entry cards hidden. Centered: "no memories match '[query]'" — 15pt Sora Regular, white at 40%. Below: "try a different search or browse by chapter" — 13pt Sora Regular, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Entry cards show less detail by default (title + 1-line content only, "show more" for everything). Correlation entries are simpler ("SIA noticed a connection between sleep and mood"). Source indicators hidden to reduce noise.
- **Medium motivation**: Default experience as described.
- **High motivation**: Entry cards show full content by default (no "show more" truncation). Correlation entries show detailed data ("when your sleep drops below 6 hours, next-day spending increases 23% on average, based on 45 data points"). Source indicators include specific dates and conversation references.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title ("book of life") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Search bar placeholder | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| Search bar text | Sora | Regular (400) | 15pt | 20pt | #FFFFFF |
| Chapter tab label (active) | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| Chapter tab label (inactive) | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 50% |
| Chapter tab count badge | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% (active) / #FFFFFF at 30% (inactive) |
| Chapter meta text | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Entry card title | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Entry card content | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 70% |
| "show more" / "show less" link | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| Source indicator text | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| "edit" action | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| "this is wrong" action | Sora | Semibold (600) | 13pt | 18pt | #F44336 |
| "save" action | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| "cancel" action | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF at 50% |
| "delete" action | Sora | Semibold (600) | 13pt | 18pt | #F44336 |
| Confidence badge text | Sora | Semibold (600) | 10pt | 14pt | #34A853 / #FF5E00 / #FFFFFF at 40% |
| Confirmation sheet heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Confirmation sheet body | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 60% |
| Confirmation CTA label | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Empty state heading | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Empty state body | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| No results message | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 40% |
| No results sub-message | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 30% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (entries fetch) | Entry cards show skeleton shimmer (title + 2-line content). Chapter tabs still functional with cached counts. | Pull-to-refresh retries. Cached entries displayed if available. |
| API timeout (wiki entries) | After 8s, shows "Couldn't load entries" message centered in entry list area with "try again" button. | Tap "try again" retries. Pull-to-refresh also retries. |
| Save edit failure | Card border flashes red (600ms). Error haptic. Toast: "Couldn't save changes. Try again." Edit mode remains active with changes preserved. | Tap "save" again to retry. "cancel" discards changes. |
| Delete entry failure | Delete confirmation sheet dismisses. Toast: "Couldn't delete entry. Try again." Entry remains in list. | Re-enter edit mode and tap "delete" to retry. |
| "This is wrong" submission failure | Confirmation sheet dismisses. Toast: "Couldn't flag this entry. Try again." Entry remains unchanged. | Tap "this is wrong" again to retry. |
| Chapter switch failure | Chapter tab activates visually but entries don't load. Skeleton shimmer shown. | Tap chapter tab again to retry. Pull-to-refresh retries. |
| Search failure (client-side, unlikely) | Falls back to showing all entries in current chapter with search bar cleared. | User re-enters search query. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to Me"
  - Search bar: "Search memories, text field"
  - Search clear button: "Clear search"
  - Chapter tab: "[chapter name], [entry count] entries, [selected/not selected]"
  - Chapter meta: "[count] entries, last updated [date]"
  - Entry card: "[title], [content preview]"
  - "show more": "Show full content"
  - "show less": "Collapse content"
  - "edit": "Edit this entry"
  - "this is wrong": "Flag this entry as incorrect"
  - Confidence badge: "[level] confidence"
  - Correlation entry: "[title], tap to discuss with SIA"
  - Edit mode: "Editing [title], title field, content field"
  - "save": "Save changes"
  - "cancel": "Cancel editing"
  - "delete": "Delete this entry"
- **Focus order**: Back button -> Search bar -> Chapter tabs (left to right) -> Chapter meta -> Entry cards (top to bottom, with each card's elements: title, content, source, actions)
- **Gesture alternatives**: All interactions are standard taps. Horizontal scroll on chapter tabs navigable via VoiceOver swipe. Bottom sheet dismissible via standard VoiceOver dismiss gesture. iOS swipe-from-edge for back navigation.
- **Reduced motion**: Entry card stagger replaced with instant display. Chapter switch crossfade replaced with instant swap. Edit mode border transition and save/delete animations replaced with instant state changes. Bottom sheet appears/dismisses instantly.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via correlation entry tap (tab switch with context), inline edit mode (in-screen state change)
- **Navigates from**: Me Main [17] via "book of life" quick link (stack push)
- **Shared components with**: Screen [18] — Explore Section (search bar pattern — identical), Screen [17] — Me Main (back navigation returns here)
- **Patterns used**: Back Button (Batch 1), Search Bar (established in Screen [18] this batch), Bottom Tab Bar (_shared-patterns.md), Brand CTA Button (Batch 1 — for confirmation sheet CTAs), Modal/Bottom Sheet (from _shared-patterns.md Modal Presentation pattern)
- **Patterns established**: Chapter tab bar (horizontal scrolling pill selector), Entry card (with source indicator, edit/delete/"this is wrong" actions), Confidence badge (high/medium/low), Inline edit mode (card transforms in-place), "This Is Wrong" confirmation flow, Delete confirmation bottom sheet
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-08.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/personal-wiki`
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
| B08-F04 | critical | trust-privacy | Implement real search, chapter state, inline edit, delete confirmation, and "This is wrong" review/removal flows. |
| B08-F05 | major | mobile-ergonomics | Give tabs and memory-control actions at least 44px touch height. |
| B08-F06 | major | accessibility | Replace it with a real input, clear button, focus state, and search result semantics. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

