# Balencia Native Mobile App — Screen 72 Design Specification

## 1. Header
*   **Screen ID:** 72
*   **Name:** Knowledge Graph
- **Route(s) covered:** `/knowledge-graph`
*   **Tab:** CIA
*   **Source:** Functional Content Brief (Knowledge Graph)
*   **Batch:** 7

## 2. Purpose
To give the user a visual, explorable map of the correlations *CIA* has found across their tracked life domains — turning "your sleep affects your workouts" from a sentence buried in a chat reply into a network they can pan, zoom, and interrogate node by node. This is the one screen that makes Balencia's core differentiator — cross-pillar intelligence — literally visible. Every node and edge on it must be traceable to a real data source or explicitly marked as not yet earned.

## 3. Entry & exit
*   **Entry Paths:**
    *   Intelligence Dashboard [48], via the "Explore your health knowledge graph" link card.
*   **Exit Paths:**
    *   Intelligence Dashboard [48] (back-stack pop).
    *   CIA Chat [09], via **Ask *CIA*** — carries node context (which node, its domain, its live connections) so *CIA* continues the thread instead of starting cold.
    *   Domain Dashboards [26–36], via **Go to [Domain]**.
    *   Data & Privacy Settings, via **Manage your data sources** (footer link inside the Help sheet). *Correction: the draft's checklist claimed CANON §8 consent/data-control compliance without naming a mechanism. This screen surfaces third-party synced health data (`via WHOOP`), which CANON §8 requires to expose a consent/revoke entry point — added here rather than duplicating a full ConsentCard on an already dense canvas.*
    *   Help Bottom Sheet (modal, non-exiting overlay).

## 4. Layout anatomy
Full-bleed interactive canvas with floating glass controls and a bottom sheet. No card container wraps the graph itself — it is the one region on this screen allowed to be pure atmosphere (CANON §2: "glass reserved for hero cards, chips, nav, sheets, overlays" — the canvas is the hero).

**Regions Top-to-Bottom:**
1.  **Atmosphere & Base:** `--bg-base` with the mandatory top-center warm radial glow *and* the mandatory 3–4% grain overlay (CANON §1 — the draft's Visual Treatment omitted the grain, corrected below). A faint purple pool blends in beneath the Node Detail Sheet only, marking it as a *CIA* moment.
2.  **Top Navigation (TopBar):** Transparent by default. *Correction:* the draft said it "gains `.glass-pill` on scroll" — this canvas has no vertical scroll, it's pan/zoom. Corrected trigger: TopBar gains its `.glass-pill` backdrop when panned graph content intersects the header's safe area, so node labels never wash out under the title.
3.  **Graph Canvas (Hero):** Full-viewport interactive network, floats directly on the base canvas.
4.  **Floating UI Layer:**
    *   Bottom-left: Legend (`.glass-pill`), collapsed by default to a small "Legend" chip with chevron; tap expands to the 3-line key. Auto-collapses whenever the Node Detail Sheet is open, to keep the canvas legible on a 390pt-wide frame with three floating layers competing for space.
    *   Bottom-right: GraphControlsStack — zoom in / zoom out / reset, grouped into one floating pill.
5.  **Node Detail Panel (Sheet):** `.glass-frost`, default **half** variant (~45% height, per catalog Sheet variants). Header (node name + domain chip) and footer (action row) stay pinned; the connections list scrolls internally past 4 rows, or the user drags the grabber to the **full** variant for hub nodes with many connections — reusing the catalog's existing `half`/`full` Sheet variants rather than inventing a nested-scroll pattern.
6.  **Global Navigation (GlassNavBar):** Floating bottom pill, CIA tab active.

**ASCII Wireframe (390×844):**
```text
┌──────────────────────────────────────────────┐
│ ‹   Knowledge graph                   (?)     │
│                                                │
│                                                │
│       (Zen)         (Productivity)            │
│         \               /                     │
│           \           /                        │
│             (Sleep)──────────(Workout)         │
│             /   |                |    \        │
│            /    |                |     \       │
│      (Deep)   (HRV)          (Strain) (Cal)    │
│                                                │
│                                                │
│                                                │
│ ┌ Legend ▾ ┐                  ┌ Controls ┐    │
│ │ (collapsed;                  │    +     │    │
│ │  tap to expand)               │    –     │    │
│ └───────────┘                  │    ⟲     │    │
│                                 └──────────┘    │
│ ┌─Node Detail Sheet (glass-frost, half)───────┐│
│ │ ▔▔ (grabber)                                ││
│ │ ● Fitness            Workout strain     [×] ││
│ │ ──────────────────────────────────────────  ││
│ │ CONNECTED TO                                ││
│ │ ● Sleep score   ▓▓▓▓▓░░░ 78%   via WHOOP    ││
│ │ ● HRV           ▓▓▓▓░░░░ 62%   estimated    ││
│ │ ──────────────────────────────────────────  ││
│ │ ✦ Better sleep *strongly* correlates with   ││
│ │   higher workout performance in your data.  ││
│ │   ● Wellbeing  ● Fitness                    ││
│ │                                              ││
│ │ [ Ask CIA ]            [ Go to Fitness ]     ││
│ └──────────────────────────────────────────────┘│
│ ┌───── GlassNavBar ─────────────────────────┐  │
│ │  Today    ◉ CIA    Goals    Me            │  │
│ └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```
*(Legend expanded state, referenced not drawn above: "— confirmed · orange, from your synced/logged data" / "┄ inferred · purple, CIA's hypothesis, low confidence" / "● hub · green, 3+ strong confirmed connections".)*

## 5. Components
*   **TopBar** — transparent over atmosphere; gains `.glass-pill` when panned content passes under it (corrected from "on scroll" — this canvas pans, it doesn't scroll).
*   **GlassNavBar** — floating bottom pill (CANON §6).
*   **Legend** — `.glass-pill`, collapsed-chip default, expands to the 3-line key described above. Auto-collapses while the Sheet is open.
*   **GraphControlsStack (NEW:)** — vertical `.glass-pill` capsule housing three 44×44 icon targets (zoom in, zoom out, reset-to-fit), hairline dividers `rgba(255,255,255,.06)` between them (matching ListRow's separator token), icon paper-100 default / orange on press. Rationale: grouping zoom controls into one floating pill respects 60/30/10 and keeps three standalone glyph buttons from cluttering the canvas — a direct extension of the existing "floating stacked icon" idiom already used for GlassNavBar, not a new visual language.
*   **Sheet** — `.glass-frost`, top-radius 28, grabber pill, scrim `rgba(10,10,15,.6)`. Default `half`, draggable to `full`.
*   **CIAInsightCard** — used inside the sheet for the per-node observation. Cross-pillar insight cites both domains via a **ChipDomainTag pair** (Wellbeing teal `#14b8a6` + Fitness red `#ef4444` for the sleep↔workout example). Actions map directly to the catalog spec: **Ask *CIA*** = `BtnCoach` (CIA-initiated), **Go to Fitness** = `BtnGhost` (plain navigation, not a CIA action).
*   **StrengthListRow (NEW:)** — correlation-strength row inside the sheet's "connected to" list. Anatomy: leading `ChipDomainTag` dot → node name (Body) → `ProgressBar` (8px, radius 999) → percentage (Caption, tabular-nums) → `ChipProvenance`. Sits directly on the sheet's frost surface with hairline separators, matching plain `ListRow` usage inside a Sheet — *correction: the draft's checklist claimed these rows use solid `--surface-2` for legibility, which would mix flat and glass inside one composition, a rule CANON §2 explicitly forbids ("never mix flat and glass in one composition"). Corrected to stay on the frost surface; the sheet's own opacity (10% white, blur 48) already carries enough legibility.* Fill color is **not** the default ProgressBar orange→green completion logic — a correlation strength isn't a completion metric. Corrected mapping: fill is orange when the row is confirmed/real, purple when it's inferred/low-confidence — reusing the exact edge-encoding language from the canvas so the whole screen reads as one honesty system, not two.
*   **HonestNullState** — replaces the connections list when a node has zero real connections yet: quiet glyph + Body-light line ("Keep tracking to discover more connections"). No `BtnGhost` action — the only action is passive, continued logging.
*   **ChipProvenance** — `via WHOOP` on synced biometric nodes (sleep, HRV, strain), `you logged` on manually tracked domains (Zen/meditation minutes, mood), `estimated` on low-confidence rows.
*   **ChipDomainTag** — domain-color dots on nodes and the insight's domain pair.
*   **SkeletonState** — *correction:* the draft specified "3 staggered purple dots pulsing," which is the `IntelligenceTimeline`/`CIAPresenceOrb` thinking idiom, not a layout-matching skeleton. Corrected to the catalog's actual `SkeletonState` behavior: 5–8 ghost node circles + faint ghost edges in the graph's real settled geometry, `--surface-3` shimmer sweep, with a small CIA-voice caption beneath ("*CIA* is mapping your connections — one moment") giving it personality without inventing a second loading pattern.
*   **FABQuickLog** — intentionally absent. CANON §8 scopes it to Today-tab screens; this is a CIA-tab screen.
*   **SafetyResourceCard** — intentionally absent. CANON §8 scopes crisis resources to mood/check-in/journal surfaces; this screen displays biometric correlations, not a mood check-in.

## 6. Visual treatment
*   **Glass Tiers:** Canvas is bare atmosphere (no container). Legend and GraphControlsStack use `.glass-pill`. Node Detail Sheet uses `.glass-frost`. No `SolidCard` anywhere in this composition — see StrengthListRow correction above.
*   **Screen Atmosphere (mandatory, CANON §1):** `--bg-base` + top-center warm radial glow + 3–4% grain overlay (soft-light) — *added; the draft's atmosphere note dropped the grain.* A faint purple pool blends in beneath the Sheet only, marking the node-detail moment as *CIA*'s.
*   **Node encoding (data, not chrome):** Each node's fill dot is colored by its real domain, using only CANON §4's nine domain hexes — Zen → Spirituality `#8b5cf6`, Productivity → Career `#6366f1`, Sleep/Deep/HRV → Mental & Wellbeing `#14b8a6`, Workout/Strain/Cal → Fitness `#ef4444`. *This mapping is a correction: the draft never assigned domain colors to nodes at all, instead treating "confirmed/inferred/hub" as if they were per-node glow colors — conflating data encoding with the CANON §3 glow recipe (see next point).* The node roster itself is fully dynamic per the user's actually-tracked domains — the wireframe above shows one illustrative arrangement, not a fixed template. Node diameter scales with degree (connection count), clamped 32px (leaf) to 64px (major hub); label type scales with it too, Caption (12) on leaf nodes up to Body-light (15) on hubs. Hit-box is always padded to 44×44 regardless of visual size.
*   **Edge encoding — reuses CANON §7's data-viz invariant directly, because a correlation graph *is* a data visualization:** confirmed/real correlations render as a **solid orange** `#FF5E00` stroke; inferred/AI-hypothesized correlations render as a **dashed purple** `#7F24FF` stroke (4px dash / 3px gap) — the same solid-orange-vs-dashed-purple language CANON already uses for TrendChart, so tapping through to a domain dashboard doesn't require re-learning the color code. Stroke width scales 1px (25% strength) to 4px (100% strength), delivering on the Help copy's "thicker lines show stronger correlations" with an actual number instead of a vague promise.
*   **Hub badge:** a 6px green `#34A853` dot (identical size to CANON §7's milestone dot, reused deliberately) appears at a node's edge once it has **3 or more confirmed edges each at ≥60% strength** — *correction: the draft said "3+ confirmed strong edges" without defining "strong"; now numerically bounded.* Hub-ness is redundantly signaled three ways — larger size, the dot, and (secondarily) the green hue — so it never depends on color alone.
*   **The one true semantic glow on this screen:** per CANON §3, a glow is a specific bottom-anchored radial recipe, not just "a colored thing." *Correction: the draft applied "glow" language to confirmed edges (green) and inferred edges (purple) as well as selection — three simultaneous "glows" in one composition, which both muddles the recipe and reads as decorative rather than meaning-driven.* Corrected to exactly one: the **selected node** carries `--glow-you` (#FF5E00) — "this is what you're looking at right now" — scaled proportionally to the node's own bounding box (the CANON recipe's "62% of card height" adapted to a small circular element, not a rectangular card) alongside a 1.5px orange ring and a 1.2× scale. Everything else on the canvas (domain fill, edge stroke, hub dot) is flat, meaning-coded color — honest data encoding, not glow.
*   **Hero Type Moment:** The nav title scales from H1 (34) into Display (52, NM Medium) during first load, settling back to 34 as the network resolves — both values sit exactly on CANON §5's stated Display/H1 ranges. *Refinement:* this full choreography plays once per app session, on first entry only; re-opening the graph later that session renders instantly settled. CANON §6 reserves the continuous-stroke line motif for "hero/celebration only" — this screen earns hero status once per session, not on every routine reopen.

## 7. Content & copy
Strict CIA voice: sentence case, no exclamation marks, direct, warm, one emphasis word per moment in `*asterisks*` (Tiempos italic).

*   **Nav Title:** Knowledge graph
*   **Cold-Start Messaging:** Your knowledge graph grows as you track — the more you log, the *richer* the connections.
*   **Early Data Messaging:** Keep tracking to discover *more* connections.
*   **Partial Sync Messaging:** Syncing your *Zen* practice — some connections coming soon. *(Correction: draft referenced "meditation," a domain not otherwise named on this screen; retargeted to Zen, the node already visible in the wireframe, so the example copy is traceable to something the user can actually see.)*
*   **Loading:** *CIA* is mapping your connections — one moment.
*   **Error State:** Couldn't load your knowledge graph. Check your connection and try again.
*   **Error Action:** Retry
*   **Offline State:** You're offline — showing your graph from *2h* ago. *(Correction: draft said "showing your last graph," dropping the elapsed-time staleness label CANON's `OfflineBanner/SyncStatus` requires — "offline — showing last sync 2h ago" is the honest pattern; corrected to include it.)*
*   **Panel Failure:** Couldn't load connections. Tap to try again.
*   **Connection Header:** Connected to
*   **Sample CIA Insight:** Better sleep *strongly* correlates with higher workout performance in your data.
*   **Action Buttons:** Ask *CIA*, Go to Fitness. *(Correction: draft had "Go to fitness" lowercase; Fitness is a domain proper noun here, same convention as the ChipDomainTag label — capitalized even inside sentence-case copy, same treatment CIA itself always gets.)*
*   **Help Title:** About your knowledge graph
*   **Help Body:** This graph shows how different aspects of your life connect and influence each other, based on your personal data. Larger nodes have more connections. Thicker lines show *stronger* correlations. Tap any node to explore its connections. The more you track, the richer your graph becomes.
*   **Help Footer Link:** Manage your data sources — *(new; routes to Data & Privacy Settings, see §3 correction)*
*   **Help Dismissal:** Got it

## 8. Data & honesty states
Every metric ships three states: real, low-confidence, honest-null. The brief's critical bug (shared blob connection data across nodes) is fixed via strict node-keyed data mapping — no node ever renders another node's numbers.

*   **Node Degree (connection count):**
    *   *Real:* "8" (Caption: confirmed edges)
    *   *Low-confidence:* "8" (Caption: estimated · low confidence)
    *   *Honest-null:* 0 (Caption: Not enough data yet — 3 more days)
*   **Correlation Strength (edge weight, `StrengthListRow`):**
    *   *Real:* 78% — orange `ProgressBar` fill, `ChipProvenance` "via WHOOP"
    *   *Low-confidence:* 62% — purple `ProgressBar` fill, `ChipProvenance` "estimated · low confidence" *(correction: fill color now carries the same orange/confirmed vs purple/inferred meaning as the canvas edges, not the default ProgressBar orange→green completion logic — see §6)*
    *   *Honest-null:* row absent, replaced by `HonestNullState` — "Keep tracking to discover more connections"
*   **Node Topology / Hub Status:**
    *   *Real:* Hub (Caption: based on 14 days of logs)
    *   *Low-confidence:* Hub (Caption: estimated · low confidence)
    *   *Honest-null:* Standard node (Copy: Track 7 more days to calculate hub status)
*   **Provenance diversity:** not every node is WHOOP-sourced — biometric nodes (sleep, HRV, strain) carry "via WHOOP"; self-tracked domains (Zen minutes, mood) carry "you logged." Treating all data as synced would be its own small dishonesty.

## 9. All states
*   **Default:** full interactive graph (20–50 nodes), all data confirmed/provenance-verified.
*   **Skeleton:** ghost node/edge geometry in the graph's real settled layout, `--surface-3` shimmer sweep, CIA-voice caption beneath (see §5 correction). Transitions to Error after 10s.
*   **Sheet loading (sub-state):** tapping a node opens the Sheet immediately with `SkeletonState` `StrengthListRow` placeholders while that node's connection data resolves, then swaps to real content — never a blank sheet, never a jump-cut pop-in.
*   **Empty (cold-start):** never an empty canvas. 3–5 ghosted placeholder nodes at paper-100 20% opacity — *neutral, not domain-colored*, since coloring a node before its domain has real data would presume a connection that doesn't exist yet. No edges. Centered growing-copy line + calm 3-dot purple pulse.
*   **Error:** centered glyph, error copy, orange retry link. Header/controls persist, dimmed to 40%. Graph drops to 0% opacity.
*   **Success:** node selection draws the Sheet and highlights its local network (medium haptic).
*   **Sheet overflow:** connections list shows top 4 by strength with internal scroll, or drag-to-`full` Sheet variant for hub nodes with more.
*   **Disabled:** **Ask *CIA*** button disabled (40% opacity, matching `BtnCoach` disabled state) when offline.

## 10. Motion & interaction
*   **Easing & Timing:** physical easing only, never linear. Feedback (scale, opacity) within 150–250ms.
*   **Entrance Choreography (first entry per session only — see §6 refinement):** nodes fade in staggered (20ms/node max). Once settled, edges "draw" outward via `stroke-dashoffset` over 400ms. Legend and controls fade in last. Later re-entries in the same session render already-settled, no restagger.
*   **Glow Behavior:** the selected node's `--glow-you` pulses opacity 60→80→60% over 2s while selected; scale settles at 1.2×. No other element pulses or glows — see §6's "one true glow" correction.
*   **Legend collapse:** auto-collapses to its chip form when the Sheet opens, re-expands (still requires a tap) once the Sheet is dismissed — keeps three floating layers from crowding a 390pt frame at once.
*   **Haptics:** node press (pre-selection) — light impact. Node selection — medium impact. Connection-row tap (re-center canvas on that node) — light impact.
*   **Gestures:** pan (drag), zoom (0.3×–3.0× pinch, double-tap), deselect (tap empty canvas, or drag down on the Sheet).
*   **Reduced Motion:** graph renders instantly at its final settled frame. Entrance draw-in and the glow pulse loop are disabled outright. No information is lost — hub status, selection, and edge type are all still legible from static color/stroke/size alone.

## 11. Motivation-tier adaptation
*   **Low Motivation:** defaults to a flat, accessible list view instead of the 2D canvas — `SectionHeader` per domain + `ListRow` per node (trailing hint keeps the honesty label, e.g. "78% · via WHOOP" — no exceptions, per catalog usage rule 3). This is the *same* list the screen reader path below renders, just reached by a different trigger — one component, two entry conditions, not two builds to maintain.
*   **Medium Motivation:** standard interactive graph — solid = confirmed, dashed = inferred, as specified throughout. Base UI, no overlays.
*   **High Motivation:** adds analytics overlays on the canvas — cluster-density shading, data-point counts on edge labels. *Correction: the draft gated "Ask *CIA*" itself behind premium for this tier, which would dead-end a core connect action on the CIA tab and contradicts CANON §8's "locked features never dead-end" rule as well as this screen's own north star. Corrected: only the advanced analytics overlay is premium-gated, via `PaywallLock`'s inline-tile pattern (blurred preview + one-line value copy + orange unlock CTA) — never the graph itself, never Ask CIA, never Go to Domain.*

## 12. Accessibility
*   **Contrast:** all text and glyph pairs hit AA+ against `--bg-base` and the `.glass-frost` sheet.
*   **Targets:** 44×44px minimum on every floating control, list row, and graph node — nodes get an invisible hit-box padding their visual size (32–64px) up to the 44px floor.
*   **Screen Reader (VoiceOver):** the visual graph suppresses entirely and renders as the same flat, domain-grouped list used by the Low Motivation tier (§11) — sorted by connection count, fully linear.
*   **Focus Indicators:** 2pt solid orange focus ring on all interactive targets under keyboard/Switch access.
*   **Colorblind safety:** confirmed vs. inferred is never color-alone — solid vs. dashed stroke is the primary signal, orange vs. purple the secondary. Hub status is never color-alone either — size and a discrete dot are the primary signals, green hue is tertiary.

## 13. Premium checklist
*   [x] **Connects:** Go to [Domain] links the abstract graph straight into Domain Dashboards [26–36]; Ask *CIA* carries node context into CIA Chat [09] rather than resetting the conversation.
*   [x] **Honest:** fixes the shared-blob-connection bug via strict node-keyed provenance; every metric ships real/low-confidence/honest-null; offline state now names its own staleness (2h ago), not just "last graph."
*   [x] **Premium:** bare-canvas hero + `.glass-pill` floating controls + `.glass-frost` Sheet — funded-product depth, no boxed dashboard; hero Display moment earns its keep by firing once per session, not on every reopen.
*   [x] **Exact hex/radii/blur (CANON §1–2):** `--bg-base` `#0A0A0F`, grain overlay restored, Sheet radius 28 / blur 48, `.glass-pill` blur 24 — verified, no invented values.
*   [x] **Semantic inner-glow (CANON §3):** exactly one glow on this screen — selected node, `--glow-you`. The draft's three "glows" (confirmed/inferred/selection) are corrected to one true glow plus honest flat data-encoding for the other two.
*   [x] **60/30/10 (CANON §4):** orange = confirmed/effort/selection, green = hub/growth, purple = inferred/CIA — never decorative; domain hexes used only as node/tag color, never chrome.
*   [x] **Selective glass (CANON §2):** no `SolidCard` anywhere in this composition — the draft's "solid rows inside the frost sheet" claim is corrected, since that would have mixed flat and glass in one composition.
*   [x] **Honesty invariant (CANON §7):** edge and row color code is the exact same solid-orange/dashed-purple language as TrendChart — one honesty system across the whole app, not a one-off for this screen.
*   [x] **CIA Voice & Persona (CANON §10):** CIA locked to CIA (draft artifact); no exclamations; one emphasis word per moment; domain proper nouns (Fitness, CIA) keep their caps inside sentence case.
*   [x] **Crisis/Consent (CANON §8):** "Manage your data sources" added to the Help sheet — the draft claimed this was covered without naming a mechanism; SafetyResourceCard correctly omitted (not a mood/check-in surface).
*   [x] **Domain Tags (CANON §4):** node fill and the insight's domain pair use only the nine canon domain hexes; mapping stated explicitly rather than left implicit.
*   [x] **Premium Gating:** corrected to gate only the High-tier analytics overlay via `PaywallLock` — Ask *CIA* and Go to Domain are never gated, so the feature never dead-ends.
*   [x] **Display/Hero moment (CANON §5):** Display 52 → H1 34, both exact canon range boundaries; session-scoped so it stays special.
*   [x] **Motion Rules:** `prefers-reduced-motion` disables entrance draw-in and the glow pulse with zero information loss; hub/selection/edge-type all remain legible from static cues alone.
