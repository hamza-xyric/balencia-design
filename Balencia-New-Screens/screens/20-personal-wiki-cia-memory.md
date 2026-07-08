# 20-personal-wiki-cia-memory — Hi-Fi Spec

## 1. Header
- **Screen ID:** 20-personal-wiki-cia-memory
- **Name:** Book of life
- **Route(s) covered:** `/wiki`
- **Tab:** Me
- **Source:** `FUNCTIONAL CONTENT BRIEF: Personal Wiki / CIA Memory`
- **Batch:** 7

## 2. Purpose
A browsable, editable knowledge base that makes *CIA*'s memory of the user transparent and correctable. It stores compiled chapters of stated facts, detected behaviors, and cross-domain correlations — the same underlying record CIA draws on in chat, surfaced here so nothing about the user is a black box. Every entry can be confirmed, edited, or flagged wrong.

## 3. Entry & exit
- **Entry Paths:** Pushed via the "book of life" quick link on the Me root screen (stack depth 1).
- **Primary Exit:** Back chevron or iOS edge-swipe → pop stack to Me root.
- **Secondary Exit:** Tapping a correlation node → deep-links to CIA Chat with "explain this correlation" passed as context.
- **In-screen Transitions:** Node tap → inline `CIAInsightCard` reveal. Ghost action → `Sheet` (flag or delete). Edit mode is in-place, no navigation.

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** transparent header, back chevron (44px target), H1 "book of life", trailing 44px glyph for wiki data/consent settings.
2. **Search region:** full-width `GlassPillInput` (search variant) — filters entries across whichever chapter is active.
3. **Chapter tabs:** horizontally scrolling `SegmentedTabs` for the 6 wiki chapters — `about you` · `preferences` · `patterns` · `correlations` · `goals history` · `life events`.
4. **Chapter meta:** `SectionHeader` overline, e.g. `18 entries · last updated 2h ago`.
5. **Content area:** chapter-dependent. `correlations` and `patterns` chapters lead with the `WikiCorrelationGraph` hero mini-map; all chapters render their entries as a scrolling stack of `SolidCard` rows below it (or in place of it, for chapters with no graph).

**Correction — FABQuickLog removed.** The scaffolding draft placed `FABQuickLog` above the bottom nav. CANON §8 and the catalog both restrict `FABQuickLog` to **Today-tab screens** ("global log entry... reachable from Today-tab screens"). This screen's Tab is **Me**, not Today — quick-logging water/meal/mood has no reason to live inside a memory archive, and its presence here would train users to expect it on every screen, diluting the Today-tab signal. Removed entirely; no replacement needed since this surface has no logging action of its own (only edit/flag on existing entries).

**ASCII Wireframe (390×844):**
```text
┌─────────────────────────────────────────────┐
│ [←]   book of life                   [⚙︎]   │  TopBar (transparent → .glass-pill on scroll)
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 🔍  search memories...                   │ │  GlassPillInput (search)
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ ┌──┐  SegmentedTabs
│  │you │ │ pref │ │patt  │ │[corr]│ │goal│ │lif│  (scroll-overflow variant —
│  └────┘ └──────┘ └──────┘ └──────┘ └────┘ └──┘   6 segments exceed 390px)
│                                               │   active = --surface-3 + orange label
│  18 entries · last updated 2h ago            │  SectionHeader (Overline, meta)
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ │ │  GlassCard (hero, r40)
│ │        (sleep)╌╌╌╌╌╌▸(spend)               │ │  glow-cia · WikiCorrelationGraph
│ │             \        /                     │ │  solid orange = confirmed edge
│ │            (fiber)                         │ │  dashed purple = CIA-inferred edge
│ └───────────────────────────────────────────┘ │  green dot = milestone edge (rare)
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │ gut health & sleep                         │ │  SolidCard · glow-cia (chroma wash)
│ │ high-fiber breakfasts correlate with       │ │
│ │ deeper sleep on the same night.            │ │
│ │ [nutrition] [wellbeing]                    │ │  ChipDomainTag pair
│ │ ───────────────────────────────────────── │ │
│ │ ●●●●○○○○  78% high confidence              │ │  ConfidenceMeter (thin-bar)
│ │ detected from data · 2d ago                │ │  ChipProvenance
│ │         [edit]        [this is wrong]      │ │  BtnGhost row
│ └───────────────────────────────────────────┘ │
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │ workout skips & sleep debt                 │ │  SolidCard · glow-cia
│ │ you skip workouts most often after nights  │ │
│ │ under six hours of sleep.                  │ │
│ │ [fitness] [wellbeing]                      │ │  ChipDomainTag pair
│ └───────────────────────────────────────────┘ │
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │  Today      CIA      Goals      [Me●]      │ │  GlassNavBar (Me active, orange fill)
│ └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```
**Correction — mini-map, not a full graph.** The brief asked for the global Knowledge Graph screen reused wholesale. A full-viewport node graph breaks on a 390px scroll surface (unreadable node density, no room for the entry list beneath it). *Fix:* `NEW: WikiCorrelationGraph`, a contained 16:9 mini-map (aspect-ratio locked, no squash) with 3–5 tappable nodes. Tapping a node doesn't navigate away — it reveals a `CIAInsightCard` inline directly beneath the map (see §5, §9), so the map stays a *finder*, not the whole experience.

**Correction — content/IA fix on the second entry.** The draft's second example, "workout skips," was a single-domain observation (Fitness only) shown inside the `correlations` chapter, which by definition holds cross-domain links — a category error that would train users to distrust the chapter's labeling. Retitled to **workout skips & sleep debt**, a genuine two-domain correlation (Fitness × Wellbeing), so both example entries actually justify their placement and the `ChipDomainTag` pair on each is truthful, not decorative.

## 5. Components
- **TopBar** — transparent, gains `.glass-pill` backdrop on scroll.
- **GlassPillInput** (`search` variant).
- **SegmentedTabs** — scroll-overflow variant (6 chapter segments don't fit one screen width; track scrolls horizontally, active segment slides per CANON §6 at 150ms, `--surface-3` fill + orange label).
- **SectionHeader** — Overline for chapter meta.
- **GlassCard** (`hero` variant, radius 40) — used exclusively for the `WikiCorrelationGraph` mini-map, the one Display-adjacent, immersive moment on the screen.
- **SolidCard** — base for every chapter entry (data-dense list; legibility over atmosphere, per CANON §2).
- **CIAInsightCard** — reserved for the *ephemeral* detail reveal when a graph node is tapped (purple glass, spark glyph, `BtnCoach` + `BtnGhost`, cites its two domains via `ChipDomainTag` pair). **Correction:** the draft's Components list named `CIAInsightCard` for "detailed correlation expansions" while its own wireframe and Visual treatment section built those same rows as `SolidCard` — two different components for the same content. Resolved by splitting the roles: the permanent, scrollable chapter list is always `SolidCard` (many entries, needs density); `CIAInsightCard` is the transient glass reveal anchored to the mini-map only, never the list itself.
- **ConfidenceMeter** — thin-bar variant, purple-tinted when the underlying entry is CIA-derived.
- **ChipProvenance** — source/recency chip on the confidence metric only (see §8 for why entry-count and timestamp metadata don't carry one).
- **ChipDomainTag** — pair, on every `correlations`/`patterns` entry, citing both domains the entry connects (tags/icons only, never chrome).
- **BtnGhost** — `edit` / `this is wrong` / `show more` / `show less` — calm, neutral, never alarm-colored.
- **BtnSecondary** — the two Flagging Sheet actions.
- **BtnPrimary** — the single destructive confirm in the Delete Sheet only (see §7 correction).
- **Sheet** (`action` variant) — two distinct sheets: Flagging and Delete (see §7).
- **GlassNavBar** — floating bottom pill, Me tab active.
- **NEW: WikiCorrelationGraph** — *Rationale:* no catalog primitive handles an interactive, aspect-locked node-edge mini-map. Renders an accessible SVG graph, 16:9, 3–5 nodes, edges styled per CANON §7 (solid orange = user-confirmed, dashed purple = CIA-inferred, green dot = milestone). Promote to catalog once a second screen needs it.

## 6. Visual treatment
- **Glass tier per region:** TopBar/nav/tabs use `.glass-pill`; the correlation mini-map uses `.glass-card` (hero); every chapter entry uses `SolidCard` (`--surface-2`, no blur) — legibility for a long scrolling archive beats atmosphere here, per CANON §2's data-density rule.
- **Chapter → semantic glow map (complete; the draft only defined 3 of 6 chapters).** One glow per card, meaning-stated, per chapter:
  - `about you` — `--glow-you` (orange). User-stated identity facts; the user is the author.
  - `preferences` — `--glow-you` (orange). User-set, same authorship logic.
  - `patterns` — `--glow-cia` (purple). CIA-detected single-domain behavior; CIA is the author.
  - `correlations` — `--glow-cia` (purple). CIA-inferred cross-domain links.
  - `goals history` — `--glow-done` (green). Archived, completed milestones.
  - `life events` — `--glow-you` (orange). User-logged personal history.
  - The mini-map itself is always `--glow-cia` regardless of chapter, since it is always CIA's synthesis view.
- **Glow-on-SolidCard rendering (new, specific).** CANON §3's glow recipe (blur 24px, 62% card height) assumes a glass backdrop; `SolidCard` has none. To keep entries legible while still carrying meaning, the glow renders as a **bottom-edge chroma wash**: `color-mix(in srgb, var(--glow) 40%, transparent)` fading to transparent at 40% of card height, blur 12px (half the glass recipe) — visible as a warm or cool cast at the card's foot, never competing with body text contrast.
- **Background atmosphere:** `--bg-base` (#0A0A0F) with the mandatory top-center warm radial (`rgba(255,94,0,.18)`, 90% 60% at 50% -10%) plus 3–4% grain. A secondary purple pool (`rgba(127,36,255,.12)`, centered) appears only while `correlations` or `patterns` is the active chapter — CIA-moment atmosphere per CANON §1, not a permanent screen treatment.
- **Hero type moment:** H1 `book of *life*`, NM Medium 34, one Tiempos-italic word (`life`) — the only Display-adjacent type on the screen besides the mini-map's visual weight.
- **Entry card titles — casing fix.** The draft rendered card titles in shouting caps ("GUT HEALTH & SLEEP"). CANON's voice rule is sentence case everywhere, with no exception carved out for card titles — all-caps here reads as alarm styling, at odds with the calm tone the rest of the screen (and the checklist's own "no red-alarm" correction) commits to. Fixed to lowercase throughout: `gut health & sleep`, `workout skips & sleep debt`.

## 7. Content & copy
*Voice: CIA coach. Sentence case, fully lowercase house style. No exclamations. One `*emphasis*` word per moment, rendered Tiempos italic.*

- **H1 Title:** `book of *life*`
- **Search Placeholder:** `search memories...`
- **Chapter Meta:** `18 entries · last updated 2h ago`
- **Empty State (Day 1):**
  - `nothing here yet`
  - `as you talk with *CIA* and use Balencia, this chapter will fill with things it learns about you.`
- **Empty State (Patterns/Correlations):**
  - `CIA is still mapping your connections — they appear after a *week* or two of regular use.`
- **Entry Card Actions (ghost):** `edit` · `this is wrong` · `show more` · `show less`
- **Source Indicators:** `from conversation · oct 12` / `detected from data · 2d ago` / `edited by *you* · today`
- **Confidence Label (high):** `78% high confidence`
- **Low Confidence Nudge:** `CIA is less *sure* — tell it if this is wrong`

**Correction — the two sheets were tangled together.** The draft's Flagging Sheet listed three actions, one of them a `delete` — but its own next section, the Delete Sheet, defined a title and body with *no actions at all*. The two flows had been merged by mistake: flagging ("is this wrong?") and permanently deleting a memory are different decisions with different weight, and a destructive action should never be one tap away from a "flag as wrong" prompt. Fixed by giving each sheet its own, complete action set:

- **Flagging Sheet** (from `this is wrong`):
  - Title: `is this information *wrong*?`
  - Body: `CIA will review and correct this. you can also edit it directly.`
  - Actions: `edit instead` (`BtnSecondary`) · `yes, remove it` (`BtnSecondary`) — tapping `yes, remove it` opens the Delete Sheet for a second, explicit confirmation. Both actions are equal weight; neither is styled as urgent.
- **Delete Sheet** (final confirmation, reached from the flow above or directly in edit mode):
  - Title: `delete this *entry*?`
  - Body: `this cannot be undone.`
  - Actions: `cancel` (`BtnGhost`) · `delete` (`BtnPrimary`) — the palette has no separate danger-red, so the system's single accent color doubles as the final confirm here; seriousness is carried by the second-confirmation *pattern* and copy, not by hue.

## 8. Data & honesty states
Every metric ships the honesty triple (real / low-confidence / honest-null). No fabricated numbers.

**Metric 1 — Entry count**
- Real: `18 entries` — plain Caption metadata, **no ChipProvenance**. *Correction:* the draft attached a `synced via API` chip here. `ChipProvenance` exists to attribute a value to an external device or an AI inference (`via WHOOP`, `estimated`); an entry count is first-party product metadata with no such source to name. Forcing a chip onto it would be theater, not honesty — an honest "not applicable" is the right call.
- Low-confidence: not applicable — a count of stored rows is an exact integer, never an estimate. No such state exists for this metric (stated plainly, not hidden).
- Honest-null: `0 entries`, copy `nothing here yet`.

**Metric 2 — Confidence score (%)** — the one CIA-derived metric on this screen, so it is the metric that must carry the full three-state pattern *with* a real provenance chip:
- Real: `78% high confidence`, chip `detected from data · 2d ago`.
- Low-confidence: `42% low confidence` — KPI rendered at 64% opacity, meter bars muted, copy `CIA is less *sure* — tell it if this is wrong`.
- Honest-null: `—`, 0 of 8 bars filled (neutral gray, not colored), copy `needs more data to score`.

**Metric 3 — Memory last updated**
- Real: `last updated 2h ago` — plain Caption metadata, same first-party rationale as Metric 1, no chip.
- Low-confidence: not applicable — a sync timestamp is a factual system record, never estimated.
- Honest-null: `never`, copy `start a conversation to log your first memory`.

**Cross-cutting pattern check — crisis/safety layer (CANON §8).** Not applicable to this screen: `book of life` is a memory archive, not a mood/check-in surface. Crisis resources stay reachable at their canonical entry points (daily check-in, mood log) rather than being force-fit here; adding a `SafetyResourceCard` to a settings-adjacent archive screen would dilute its meaning where it actually matters. This is a deliberate exclusion, not an oversight.

## 9. All states
- **Default:** `SolidCard` entries populate the vertical scroll for the active chapter; tabs settled.
- **Skeleton:** tabs and meta text shimmer. `WikiCorrelationGraph` shows 3 purple pulsing ghost dots (no edges yet). Entry list shows `SkeletonState` blocks matching real card geometry.
- **Empty (Day 1):** `EmptyState` component, warm tone. Mini-map shows 3–5 fully ghosted (24% opacity) placeholder nodes, no edges.
- **Node tap (correlations/patterns):** selected node highlights (orange ring), `CIAInsightCard` slides in directly beneath the mini-map — spark glyph, one-sentence insight, evidence row (`ChipProvenance` × domains), `BtnCoach` (`ask CIA more`) + `BtnGhost` (`dismiss`). Only one insight card open at a time; tapping a new node replaces it.
- **Search active:** tabs dim to 40% opacity, non-interactive. Results flatten into one list across all chapters; each result gains a `ChipDomainTag`-style chapter badge for context. `×` glyph clears the query.
- **Edit mode:** card border → 1px solid orange (a border, not a glow — editing is a temporary user action, not the card's resting semantic state). Title/body become multiline `GlassPillInput` fields. Ghost row swaps to `[cancel]` `[save]`.
- **Success:** 250ms `--glow-done` (green) border pulse on the saved card, then settles back to its chapter's resting glow.
- **Error — fixed.** *Correction:* the draft specified "a soft red flash" for save failures, directly contradicting the system's own no-red-alarm principle (the same principle the draft's checklist claims credit for applying to destructive UI). Fixed to: 150ms `--surface-3` brighten + a thin orange accent border (no red exists in this palette), plus a light haptic. Copy: `couldn't save your changes — try again.`
- **Offline — fixed for mobile reality.** *Correction:* the draft disabled search while offline. Wiki entries are stored locally once synced — disabling search over data the device already has is unnecessarily punitive, not honest staleness labeling. Fixed: `OfflineBanner` appears under TopBar reading `offline — showing last sync 2h ago` (matches the catalog's exact honest-staleness phrasing); search stays active over cached entries; edits and flags queue locally and show a small pending-sync dot on the affected card until reconnection. Pull-to-refresh is disabled (nothing new to fetch).

## 10. Motion & interaction
- **Easing & timings:** physical easing only (`ease-out` entrances, `ease-in-out` transitions). Chapter crossfade: 160ms out, 280ms in. Sheets spring up in 250ms.
- **Glow behavior:** `--glow-cia` on the mini-map "breathes" (4s ease, infinite) to read as live synthesis, not a static image. All card glows dim to 20% when their card leaves the viewport, to keep scroll performance calm rather than busy.
- **Draw-first graphing:** on mount (or chapter switch into `correlations`/`patterns`), `WikiCorrelationGraph` draws outward from a center hub — nodes fade in staggered 20ms/node, edges stroke-draw over 520ms. User-confirmed edges draw solid orange; CIA-inferred edges draw dashed purple.
- **Haptics:** light selection haptic on node tap; medium success haptic on saving an edit; heavy warning haptic when the Delete Sheet (not the Flagging Sheet) appears — the weight difference is intentional, since only the Delete Sheet is truly irreversible.
- **Reduced motion:** graph stroke-draw and staggered fades collapse to an instant, fully-settled frame (opacity 1, no travel). Glow "breathe" stops, holding a static 55% alpha. Chapter crossfade becomes a hard cut under 80ms.

## 11. Motivation-tier adaptation
- **Low density (overwhelmed/fatigued):** entries truncate to title + 1 line (`show more` disclosure). Mini-map simplifies to 2 nodes / 1 edge. Confidence shown as a plain label (`low` / `high`), no percentage. `ChipDomainTag` pairs collapse to a single dominant tag to cut visual load.
- **Medium density (default):** title + 3 lines. Mini-map shows the standard 4–5 node web. `ConfidenceMeter` shows percentage + `ChipProvenance`. Full `ChipDomainTag` pairs shown.
- **High density (curious/analytical):** full text expanded, no truncation. Mini-map reveals secondary "ghost" nodes for potential future links (24% opacity, unconfirmed). Correlation strength surfaced explicitly in-line, e.g. `r=0.82 over 14 days`, for users who want the underlying number.

## 12. Accessibility
- **Contrast:** body text paper-100/50 on `--surface-2`; secondary text paper-64%, tertiary paper-40% — both verified AA+ against the surface tokens in use (no glass blur diluting contrast on entry cards, by design).
- **44px targets:** back chevron, settings glyph, every ghost action (`edit`, `this is wrong`, `show more`), graph nodes, and chapter tab pills all carry a 44×44px minimum hit area even where the visible glyph or label is smaller.
- **Screen-reader labels:** graph nodes expose `aria-label` describing the relationship in full sentences, e.g. "confirmed connection between sleep and spending, 78 percent confidence" — never just a node name. Settings glyph labeled "wiki data and consent settings." `ChipDomainTag` pairs are never the sole signal of a connection — the entry's body copy states the relationship in words, so color-blind users lose nothing.
- **Motion safety:** every animated sequence in §10 has a stated reduced-motion equivalent; none rely on motion alone to convey meaning (edge style — solid vs. dashed — carries the confirmed/inferred distinction independent of the draw animation).

## 13. Premium checklist
1. **Connects (cross-pillar):** yes, and now truthfully — both example entries are genuine two-domain correlations (`nutrition × wellbeing`, `fitness × wellbeing`) with `ChipDomainTag` pairs, not a single-domain observation mislabeled as cross-pillar.
2. **Honest:** yes. Three metrics, honesty triple on each; two of them honestly opt out of a provenance chip and a low-confidence state, with rationale, rather than faking either.
3. **Premium (visuals):** yes. Glass reserved for the one hero moment (mini-map); solid cards for the dense archive; exact CANON radii (28 default, 40 hero).
4. **60/30/10:** maintained — orange for user-authored chapters/CTAs, green for archived completion, purple for CIA-derived chapters and the mini-map.
5. **One hero type moment:** `life` in Tiempos italic, H1.
6. **One semantic glow per card, meaning stated:** complete for all 6 chapters (the draft only defined 3); `SolidCard` glow implemented as a bottom-edge chroma wash since the surface carries no blur.
7. **Data-viz rules:** solid orange = confirmed edge, dashed purple = inferred edge, green dot = milestone edge. No gradients beyond the single-color chroma wash.
8. **Voice & tone:** CIA voice sustained, sentence case, zero exclamations, one italic word per moment, "CIA" always CIA (none found in the draft to begin with).
9. **Component reuse:** `SolidCard`, `GlassCard` (hero), `CIAInsightCard`, `Sheet`, `SegmentedTabs`, `ChipDomainTag`, `ChipProvenance`, `ConfidenceMeter` all pulled from the catalog with corrected, non-overlapping roles; only `WikiCorrelationGraph` flagged `NEW:` with rationale.
10. **Accessibility:** 44px targets, AA+ contrast, full reduced-motion path, color-independent relationship labeling.
11. **Corrections integrated (this pass):** removed a Today-tab-only `FABQuickLog` from a Me-tab screen; fixed all-caps card titles to sentence case; resolved the `CIAInsightCard`/`SolidCard` role conflict; completed the chapter→glow map from 3 to all 6 chapters; removed a fabricated `synced via API` provenance chip; untangled the merged Flagging/Delete sheets into two complete flows; replaced a red error flash with the palette's actual no-red-alarm treatment; stopped disabling offline search over already-local data; fixed a single-domain entry mislabeled as a cross-pillar correlation.
12. **Consent layer:** settings glyph in TopBar routes to wiki data controls (view/revoke/delete underlying sources) — required since this screen surfaces health- and behavior-derived inferences.
13. **Crisis/safety layer:** explicitly marked not applicable here, with rationale (§8) — an honest exclusion rather than a forced, diluted inclusion.
14. **Motivation tiering:** low/medium/high density variants defined for both entry text and mini-map complexity.
15. **Platform constraints:** 390×844 respected; floating nav clears the home indicator by 16px; edge-swipe exit preserved.
