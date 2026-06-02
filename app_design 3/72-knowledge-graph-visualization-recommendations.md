# Knowledge Graph — Premium Visualization Recommendations

> Companion to `72-knowledge-graph.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current C (66) → specced-target A− (86)** under the revised 10-dimension rubric.
> **This screen MINTS `VK-010` NetworkGraph** — the app's most novel, highest-risk primitive. Its full spec block is below (§ "Minting VK-010") and is folded into `VIZ-KIT.md`.

## Context

We compared the Balencia Knowledge Graph against its cluster benchmark — **Obsidian / Roam graph view + Reflect**. Those tools own the "thinking made visible" aesthetic: a calm, settled constellation of nodes you can pan, zoom, and inspect, where structure (clusters, hubs, bridges) emerges from layout, not chrome. That is the right bar for us — but Balencia's graph is **not** a notes-link graph. Ours is a **life-correlation** graph: nodes are *your* health metrics and behaviours, edges are *SIA's discovered correlations* across your life domains, and the whole thing is the visible form of the app's commercial differentiator (the Life Correlation system). So we grade against Obsidian's *legibility and calm*, but the **content and signature are unmistakably Balencia**:

- **It is SIA's brain, not a knowledge base.** Edges are purple because they are SIA's discovered knowledge — this is the one screen (with Intelligence [48]) where the AI-Mode purple-dominant register is sanctioned. Obsidian's graph is monochrome structure; ours is *semantic* — domain-coloured nodes, purple correlation edges, and SIA's *confidence* encoded as **solid (confirmed) vs dashed-purple (inferred)**, which is the brand's forecast signature (§11) applied to relationships. No notes-graph does this.
- **It is settled, never jittery.** Obsidian's live physics is mesmerising on desktop and nauseating on a 390px phone. Our `VK-010` is a **precomputed, settled** layout — deterministic geometry, a brief draw-in reveal, and a trivially-correct reduced-motion fallback. Premium *calm*, the always-on baseline (Linear/Things restraint), beats premium *motion* here.
- **It teaches its own encoding.** Where Obsidian assumes you know what node size means, our legend renders **live sample primitives** (sample node sizes, sample edge widths, a solid-vs-dashed sample, domain dots) so a first-time user reads the graph without a manual — and that same legend is the a11y bridge for the visual encoding.

**Root cause of today's C:** the raw graph *exists* in the prototype (real nodes, real edges, real interaction) — it is genuinely ahead of most screens — but it reads flat and slightly broken, not premium: nodes are 2-letter initials of fixed px size (degree-salience lost), the canvas uses `preserveAspectRatio="none"` so geometry **distorts** on a non-square viewport, every node's detail panel shows the **same** four connections (a shared-blob data bug), edges are flat purple with no confirmed-vs-inferred distinction (the SIA signature unused), and the legend is text-only. The upgrade is **minting `VK-010` properly** + fixing the data shape (per-node connections; `inferred` flag; degree-derived size) + a settled-layout + depth/legend pass — not new charting infra.

**Decisions honoured with the user:** distinct Balencia signature (not an Obsidian clone); spec-first (read-only); AI-Mode purple is sanctioned *here* and cited to `_shared-patterns.md`; premium depth inside the (inverted) 60/30/10; no new *user-facing* data — every visual derives from data the screen already shows, plus two backend-shape fixes (`edges[].inferred`, per-node connections) that the spec already implies.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. `--glow-purple` and `--color-domain-*` already exist in `globals.css`; the depth/stroke tokens marked **(mint)** must be added in viz-build (`VK-017`); specs reference them by name, never as floating hex:

| Token | Status | Intended value | Use here |
|---|---|---|---|
| `--color-royal-purple` | exists | `#7F24FF` | all edges, strength bars, insight dots, "ask SIA" (AI-Mode) |
| `--color-domain-*` (12) | exists | per `CONSISTENCY.md` §5 | node fills + connection dots + legend domain dots (identity only) |
| `--glow-purple` | exists | `0 0 32px rgba(127,36,255,0.40)` | selected-node ring glow (full size, on the scaled-up selected node only) |
| `--glow-orange-sm` | **(mint)** | `0 0 12px …0.35` | hub-node glow radius (calibrated small — never swamps a 32pt node) |
| `--stroke-thin` | **(mint)** | `2px` (§8) | base edge stroke; strong edges scale to ~3px |
| `--ease-flow` / `--dur-flow` | exists | `cubic-bezier(0.65,0.05,0.36,1)` / `1200ms` | edge stroke-draw reveal |
| `--dur-base` | exists | `280ms` | node fade-in, selection scale/dim |

> **Why hub glow is domain-tinted, not orange:** on this purple-register screen, a hub node's glow is its **own domain colour at 12%** at the `--glow-orange-sm` *radius* (the 12px calibration), not literal orange — so a fitness hub glows faint red, a sleep hub faint indigo. The `-sm` token names the *radius/intensity*, the domain token names the *hue*. This keeps glow as identity, not a second accent.

---

## The five recommendations

Ordered by leverage. R1 mints the hero primitive; R2–R4 are the encoding/data fixes that make it read premium and honest; R5 is the legend that makes it teachable and accessible.

### R1 — Mint `VK-010` NetworkGraph: the settled life-correlation network (the hero)

The screen *is* the graph. `VK-010` is specced as a **mobile-legible, precomputed, settled** node-link network — never a live-jittering physics sim. (Full primitive spec in § "Minting VK-010" below + folded into `VIZ-KIT.md`.) The leverage move is replacing the build's distortion-prone `preserveAspectRatio="none"` square-stretch with a **preserved-aspect square logical canvas** inside the pannable viewport, and deriving node radius from connection degree so structure reads on first paint:

```
                          ✦ Meditation
                         (med · 30pt)
        ● Protein            ╲
        (nut · 30pt)          ╲ 61%
            ╲                   ●·····  ← SIA-inferred edge (dashed purple)
         54% ╲                Stress
              ╲              (well · 36pt)
               ●━━━━85%━━━━━━━━●         ← confirmed edge (solid, width∝strength)
            Workout         Sleep ◎      ← hub: 4 edges, faint domain glow
          (fit · 38pt)    (slp · 48pt)
               ╲ 68%      ╱
                ╲        ╱
                 ● Morning energy
                 (prod · 34pt)
                                 ● Budget stress
                                 (fin · 26pt, dashed 44%)
   ┌─────────┐                            ┌──┐┌──┐┌──┐
   │ Legend ▴│                            │+ ││− ││↺ │   ← zoom / reset
   └─────────┘                            └──┘└──┘└──┘
```

- **Settled layout:** positions are **precomputed server-side** to normalized `(x,y)` ∈ [0,1] (force-directed once, then frozen), so geometry is identical every visit. The client renders to a **square logical canvas, aspect preserved**, and applies *no* force simulation — only a brief draw-in reveal (R-motion). Deterministic, jitter-free, reduced-motion-trivial.
- **Why this over a live Obsidian-style sim:** live physics on mobile is nauseating, non-deterministic, and an a11y/reduced-motion problem. Settled = calm + ownable + accessible. This is the always-on "calm/honest floor" (Linear/Things) doing the heavy lifting.

### R2 — Node encoding: degree-derived size + domain fill + calibrated hub glow

Resolve the build's fixed `size` literal and 2-letter-initial nodes:

- **Radius = connection degree**, mapped 24pt (1–2 edges) → 56pt (8+); most 32–40pt. The most-connected metrics become the visual anchors — the whole reason a graph beats a list.
- **Fill = `--color-domain-*` at 80%** (domain identity, `CONSISTENCY.md` §5). Full node label below (`text-small`, white) at zoom > 0.7×; initials only as an *extreme*-zoom-out fallback, not the default.
- **Hub glow:** nodes with 3+ edges ≥70% strength get a `--glow-orange-sm`-*radius* blur in the **node's own domain colour at 12%**. Calibrated small — a 32px glow on a 32pt node is a depth *failure*, not depth.
- **Selected:** scale 1.2×, 2pt white border, `--glow-purple` (the one place full-size purple glow is right — the node is now enlarged), glow→20%, **all non-connected nodes dim to 30% + labels hidden** (focus by subtraction).

### R3 — Per-node Detail Panel: fix the shared-blob bug + strength bars

The build's panel reads a **single shared `connections` + `insight`** — tap *any* node, see the *same* four rows. That is the most damaging defect on the screen (it makes the graph feel fake). Fix the data shape to **node-keyed**: each panel shows **that node's** edges, sorted by strength desc.

```
─── drag handle ───
Sleep quality                          [×]
[ Sleep · domain pill ]

CONNECTED TO
● Workout performance            85%   ← % always visible (never colour-alone)
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░               ← 2pt strength bar, purple, width∝strength
● Stress level                   72%
  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░
● Morning energy                 68%
  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
● Meditation                     61%
  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░

⌁ "Better sleep strongly correlates with higher        ← per-node SIA insight
   workout performance in your data."

[ ask SIA ]            [ go to domain ]   ← purple (AI) | orange (nav)
```

- **Strength bar** reuses the Intelligence Dashboard [48] correlation encoding (2pt purple bar, width ∝ strength) so the two screens read as one family. **% text is always beside the bar** → strength is visible/labelled, never colour-or-width-alone (a11y).
- **Strength % colour-stepping** (>75% white / 50–74% white/70 / <50% white/50) is a *secondary* emphasis cue — the % digits carry the value regardless.
- **Tap a connection row** → re-selects that node (graph re-centres, panel updates) — turns the panel into a second navigation surface through the network.
- **Per-node SIA insight** (not shared): observation framed as coaching, never a deficiency verdict (non-shaming).

### R4 — SIA-inferred edge signature: solid (confirmed) vs dashed-purple (inferred)

The brand's **dashed-purple projection/forecast** language (§11), applied to *relationships*. Edges SIA has **inferred** (hypothesised from pattern, not yet confirmed by enough data) render **dashed purple** (dash 4·2); **data-confirmed** correlations render **solid**. SIA's *confidence* becomes legible **without a second colour** — and a hypothesis is never dressed as established fact (honest).

```
  confirmed (enough data):   ●━━━━━━━━━━●     solid, opacity∝strength
  SIA-inferred (hypothesis): ●─ ─ ─ ─ ─●     dashed purple, opacity∝strength
```

Requires `edges[].inferred: boolean` in `knowledgeGraph` (absent today). This is the single highest-signature, lowest-cost upgrade: it turns a generic node-link graph into *SIA's visible reasoning*.

### R5 — Legend that teaches: live sample primitives, not text

Replace the text-only legend with one that **renders the actual primitives** at sample scales, so the encoding teaches itself and every encoded dimension has a visible, labelled sample (the a11y bridge):

```
┌─ Legend ─────────────────────────┐
│ Node size    ·  →  ●             │   fewer ← connections → more
│ Edge weight  ─  →  ━             │   weak ← correlation → strong
│ Confidence   ━━  vs  ─ ─         │   confirmed | SIA-inferred
│ Domains   ●fit ●slp ●nut ●fin …  │   (9 domain dots + abbrev names)
└──────────────────────────────────┘
```

Collapsed = floating "Legend" pill (bottom-left); expanded = `ink-brown-800` card, backdrop-blur, tap-outside to collapse. The **Confidence row is new** and explains R4's solid-vs-dashed — without it, the dashed edges are a mystery.

**Optional R5b — depth polish:** faint top-edge highlight on the floating controls/legend/panel (`ink-brown-800` surfaces); the hub glow is the only in-canvas depth accent (the graph floats on bare `ink-900` for impact). Subtle.

---

## Minting `VK-010` · NetworkGraph (full primitive spec — folds into `VIZ-KIT.md`)

> **Purpose:** force-directed node-link of insights/memories/domains and their correlations — the app's most novel viz, and the visible form of the Life Correlation system. **Mobile-legible, precomputed/settled** (no live physics jitter).

- **Maps-to:** **NEW** (SVG for the prototype; Canvas/Skia path noted for production but *not* assumed by the spec). Today's route renders a hand-rolled flat version — this primitive standardizes + fixes it.
- **Layout strategy (390px):** positions **precomputed server-side** (force-directed once → frozen) to normalized `(x,y)` ∈ [0,1]; client renders to a **square logical canvas with aspect preserved** (replaces the build's distortion-prone `preserveAspectRatio="none"`), inside a pannable/zoomable viewport (0.3×–3.0×, double-tap = 1.5× at point / reset-fit). Same-domain nodes cluster (intra-domain attraction in the precompute); cross-domain edges bridge clusters. **No client-side force sim.** Node/edge floors for legibility: max ~60 nodes, ~120 edges; edges <25% strength hidden by default (doubles as the WCAG-1.4.11 contrast floor).
- **Node encoding:** radius = **connection degree** (24pt @1–2 → 56pt @8+; most 32–40pt); fill = `--color-domain-*` @80% (identity); label `text-small` white below, shown at zoom >0.7×; **hub glow** (3+ edges ≥70%) = `--glow-orange-sm` radius in the node's own domain colour @12%; **selected** = scale 1.2× + 2pt white border + `--glow-purple` + glow→20%, non-connected nodes → 30% opacity + labels hidden.
- **Edge encoding:** stroke width = strength (`--stroke-thin` 2px @<40% → ~3px @>75%), round caps/joins (§8); colour `--color-royal-purple`, opacity 15%→60% by strength; **`inferred` edges = dashed (4·2), confirmed = solid** (SIA-confidence signature); selected node's edges → 80% + 2s pulse (60→80→60%), unrelated edges → 5%.
- **Interaction:** tap node = select + panel + highlight; tap empty = deselect; pinch = zoom; pan = single-finger drag; double-tap = zoom/reset; buttoned zoom/reset for non-gesture users. Connection-row tap (in panel) re-selects that node.
- **A11y text-equivalent of the graph (load-bearing):** canvas `aria-label` "Health knowledge graph showing N metrics and M connections"; each node `role="button"`, label "[name], [domain], [N] connections, tap to explore". **VoiceOver / AT alternative view:** the graph renders as a **flat list of nodes sorted by connection count**, each expandable to its connection list — the full data is reachable with zero visual graph comprehension. Strength always shown as visible % + bar (never colour/width-alone); confirmed-vs-inferred is solid-vs-dashed (non-colour). Interactive targets ≥44×44pt (min-44 hit box around each node).
- **States:** **cold-start** (3–5 ghosted domain placeholder nodes @20% + "growing" copy + purple 3-dot pulse — never an empty canvas); **early/sparse** (real 5–15-node graph + "keep tracking" nudge); **partial** (available nodes/edges render; missing data simply absent — *not* an error, no "complete" reference exists); **loading** (3 purple dots pulse + "Loading your graph…" → 10s → error); **error** (centred glyph + message + orange retry; header/controls persist); **layout error** (server positions, no reveal, still interactive); **offline** (cached-graph banner, "ask SIA" disabled @40%).
- **Motion:** nodes fade in staggered (20ms/node, 280ms, `--ease-out-soft`) at precomputed positions → edges **draw themselves** outward (`stroke-draw`, ~520ms `--ease-flow`) — **draw, never opacity-fade** (§8); selection at `--dur-base` 280ms; selected-edge pulse 2s loop. **`prefers-reduced-motion` → settled final state instantly, edges fully drawn, pulse off** (the settled frame is the canonical frame — nothing lost).
- **Brand:** AI-Mode purple-dominant (sanctioned — cite `_shared-patterns.md`); orange only on the *navigation* action ("go to domain") + help + retry; domain colours on nodes/dots/legend only; dashed-purple inferred edge is the brand forecast signature (not a violation).
- **Consumers:** Knowledge Graph [72], Personal Wiki [20].

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 NetworkGraph (mint VK-010) | the existing graph route + `knowledgeGraph` mock | `src/app/tabs/me/knowledge-graph/page.tsx`, `src/data/mock.ts` | preserve-aspect canvas (drop `preserveAspectRatio="none"`), settled layout, VK-010 (VK-017 for `--glow-orange-sm`/`--stroke-thin`) |
| R2 node encoding | `domainToneClasses`, `--color-domain-*` | `src/components/design-system/Chip.tsx`, `globals.css` | degree-derived radius; hub glow |
| R3 detail panel | `DomainTag`, Intelligence [48] strength-bar pattern | `src/components/design-system/DomainTag.tsx` | **per-node** `connections` + `insight` (fix shared blob); strength bars |
| R4 inferred edges | `knowledgeGraph.edges` | `src/data/mock.ts` | **add `edges[].inferred: boolean`**; dashed-purple render |
| R5 legend | the floating legend pill | route component | live sample primitives + Confidence row |
| Depth tokens | `--glow-orange-sm`, `--stroke-thin` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails (AI-Mode inversion — sanctioned)

- **Purple (dominant here)** is SIA's discovered knowledge — edges, strength bars, insight dots, "ask SIA". Sanctioned AI-Mode exception, cited to `_shared-patterns.md`; semantic, not decorative. Mirrors Intelligence [48].
- **Orange** anchors the user's *navigation* action ("go to [domain]"), help CTA, and error retry — the orange touchpoints that keep the screen tethered to the product register.
- **Green is absent** — there is no success/arrival/in-range state on this screen. Correct, not a gap (don't invent one).
- **Domain colours** only on node fills, connection dots, legend dots — identity, never decoration.
- **Dashed-purple SIA-inferred edges** are the brand forecast signature (§11) — on-brand, not a violation.
- **Glow** uses the calibrated `--glow-orange-sm` radius on hubs (domain-tinted) + `--glow-purple` on the selected node only — warm/calibrated depth, never neon.
- **Non-shaming:** node size = evidence/connectedness, never a verdict; small nodes framed as "still gathering signal" / "the more you track, the richer your graph"; insights are observations, not deficiency calls.
- **Accessibility:** AT alternative list view (data reachable without the graph); strength always visible % + bar; confirmed-vs-inferred is solid-vs-dashed (non-colour); WCAG 1.4.11 ≥3:1 on load-bearing edges (≥40%)/borders/dots; reduced-motion → settled final state.

---

## Phasing (when we move to build)

1. **Data-shape fixes first** — `edges[].inferred` + per-node `connections`/`insight` (R3, R4). Everything visual depends on honest data; the shared-blob bug is the most damaging and the cheapest to fix.
2. **VK-017 tokens** — mint `--glow-orange-sm`, `--stroke-thin`.
3. **R1 NetworkGraph** — preserve-aspect settled canvas + VK-010 standardization (kills the distortion).
4. **R2 node encoding** — degree-radius + domain fill + hub glow.
5. **R4 inferred edges + R5 legend** — the SIA-confidence signature + the legend that explains it (ship together; the legend's Confidence row depends on R4).
6. **R3 detail-panel polish** — strength bars + per-node insight (after the data fix lands).

Each step is independently shippable and verifiable; the data fix + R1 alone moves the screen from C to B+.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/tabs/me/knowledge-graph`, screenshot before/after; verify **nodes are circular (not elliptical) at a non-square viewport** (the `preserveAspectRatio` fix), node radius **varies by degree**, edges **draw** (not fade), inferred edges are **dashed**, and **tapping different nodes shows different connections** (shared-blob bug gone).
- Confirm cold-start (ghosted placeholder nodes + pulse), early/sparse, partial, loading→error, and offline states render per spec — never an empty black canvas.
- Toggle `prefers-reduced-motion`: graph renders at settled final state instantly, edges fully drawn, pulse off — no info lost.
- Toggle VoiceOver: the alternative flat node list (sorted by connection count, expandable) is reachable and reads each node's connections + strengths.
- `npm run check` — **`verify:brand` must stay green** (AI-Mode purple is sanctioned; confirm no *stray* purple outside SIA semantics and that orange nav/help/retry remain).
