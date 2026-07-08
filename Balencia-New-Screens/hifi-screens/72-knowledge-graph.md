# 72-knowledge-graph - A+++ hi-fi mobile spec

## Header
- **Source ID:** 72
- **Source spec:** `Balencia-New-Screens/screens/72-knowledge-graph.md`
- **Evidence:** screens/72-knowledge-graph.md, work/briefs/72.md, work/drafts/72.md
- **Route(s):** `/knowledge-graph`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To give the user a visual, explorable map of the correlations *CIA* has found across their tracked life domains - turning "your sleep affects your workouts" from a sentence buried in a chat reply into a network they can pan, zoom, and interrogate node by node.
- **Premium Visual Director:** make Knowledge Graph hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Knowledge Graph lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+----------------------------------------------+
|    Knowledge graph                   (?)     |
|                                                |
|                                                |
|       (Zen)         (Productivity)            |
|         \               /                     |
|           \           /                        |
|             (Sleep)----------(Workout)         |
|             /   |                |    \        |
|            /    |                |     \       |
|      (Deep)   (HRV)          (Strain) (Cal)    |
|                                                |
|                                                |
|                                                |
| + Legend  +                  + Controls +    |
| | (collapsed;                  |    +     |    |
| |  tap to expand)               |    -     |    |
| +-----------+                  |         |    |
|                                 +----------+    |
| +-Node Detail Sheet (glass-frost, half)-------+|
| |  (grabber)                                ||
| | o Fitness            Workout strain     [x] ||
| | ------------------------------------------  ||
| | CONNECTED TO                                ||
| | o Sleep score   ######## 78%   via WHOOP    ||
| | o HRV           ######## 62%   estimated    ||
| | ------------------------------------------  ||
| |  Better sleep *strongly* correlates with   ||
| |   higher workout performance in your data.  ||
| |   o Wellbeing  o Fitness                    ||
| |                                              ||
| | [ Ask CIA ]            [ Go to Fitness ]     ||
| +----------------------------------------------+|
| +----- GlassNavBar -------------------------+  |
| |  Today     CIA    Goals    Me            |  |
| +--------------------------------------------+ |
+----------------------------------------------+

Route handling: `/knowledge-graph`
```

## Focal Hierarchy
- **Dominant focal moment:** Knowledge Graph hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & Base with CIA only when the source supports a synthesized read.
- **Operational layer:** Top Navigation, Graph Canvas, Floating UI Layer:, *   Bottom-left.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*graph*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent over atmosphere; gains `.glass-pill` when panned content passes under it (corrected from "on scroll" - this canvas pans, it doesn't scroll).
- **GlassNavBar** - floating bottom pill (CANON 6).
- **Legend** - `.glass-pill`, collapsed-chip default, expands to the 3-line key described above. Auto-collapses while the Sheet is open.
- **GraphControlsStack (NEW:)** - vertical `.glass-pill` capsule housing three 44x44 icon targets (zoom in, zoom out, reset-to-fit), hairline dividers `rgba(255,255,255,.06)` between them (matching ListRow's separator token), icon paper-100 default / orange on press. Rationale: grouping zoom controls into one floating pill respects 60/30/10 and keeps three standalone glyph buttons from cluttering the canvas - a direct extension of the existing "floating stacked icon" idiom already used for GlassNavBar, not a new visual language.
- **Sheet** - `.glass-frost`, top-radius 28, grabber pill, scrim `rgba(10,10,15,.6)`. Default `half`, draggable to `full`.
- **CIAInsightCard** - used inside the sheet for the per-node observation. Cross-pillar insight cites both domains via a **ChipDomainTag pair** (Wellbeing teal `#14b8a6` + Fitness red `#ef4444` for the sleep<->workout example). Actions map directly to the catalog spec: **Ask *CIA*** = `BtnCoach` (CIA-initiated), **Go to Fitness** = `BtnGhost` (plain navigation, not a CIA action).
- **StrengthListRow (NEW:)** - correlation-strength row inside the sheet's "connected to" list. Anatomy: leading `ChipDomainTag` dot -> node name (Body) -> `ProgressBar` (8px, radius 999) -> percentage (Caption, tabular-nums) -> `ChipProvenance`. Sits directly on the sheet's frost surface with hairline separators, matching plain `ListRow` usage inside a Sheet - *correction: the draft's checklist claimed these rows use solid `--surface-2` for legibility, which would mix flat and glass inside one composition, a rule CANON 2 explicitly forbids ("never mix flat and glass in one composition"). Corrected to stay on the frost surface; the sheet's own opacity (10% white, blur 48) already carries enough legibility.* Fill color is **not** the default ProgressBar orange->green completion logic - a correlation strength isn't a completion metric. Corrected mapping: fill is orange when the row is confirmed/real, purple when it's inferred/low-confidence - reusing the exact edge-encoding language from the canvas so the whole screen reads as one honesty system, not two.
- **HonestNullState** - replaces the connections list when a node has zero real connections yet: quiet glyph + Body-light line ("Keep tracking to discover more connections"). No `BtnGhost` action - the only action is passive, continued logging.
- **ChipProvenance** - `via WHOOP` on synced biometric nodes (sleep, HRV, strain), `you logged` on manually tracked domains (Zen/meditation minutes, mood), `estimated` on low-confidence rows.
- **ChipDomainTag** - domain-color dots on nodes and the insight's domain pair.
- **SkeletonState** - *correction:* the draft specified "3 staggered purple dots pulsing," which is the `IntelligenceTimeline`/`CIAPresenceOrb` thinking idiom, not a layout-matching skeleton. Corrected to the catalog's actual `SkeletonState` behavior: 5-8 ghost node circles + faint ghost edges in the graph's real settled geometry, `--surface-3` shimmer sweep, with a small CIA-voice caption beneath ("*CIA* is mapping your connections - one moment") giving it personality without inventing a second loading pattern.
- **FABQuickLog** - intentionally absent. CANON 8 scopes it to Today-tab screens; this is a CIA-tab screen.
- **SafetyResourceCard** - intentionally absent. CANON 8 scopes crisis resources to mood/check-in/journal surfaces; this screen displays biometric correlations, not a mood check-in.

## Data Honesty
- Every metric ships three states: real, low-confidence, honest-null. The brief's critical bug (shared blob connection data across nodes) is fixed via strict node-keyed data mapping - no node ever renders another node's numbers.
- **Node Degree (connection count):**
- *   *Real:* "8" (Caption: confirmed edges)
- *   *Low-confidence:* "8" (Caption: estimated  low confidence)
- *   *Honest-null:* 0 (Caption: Not enough data yet - 3 more days)
- **Correlation Strength (edge weight, `StrengthListRow`):**
- *   *Real:* 78% - orange `ProgressBar` fill, `ChipProvenance` "via WHOOP"
- *   *Low-confidence:* 62% - purple `ProgressBar` fill, `ChipProvenance` "estimated  low confidence" *(correction: fill color now carries the same orange/confirmed vs purple/inferred meaning as the canvas edges, not the default ProgressBar orange->green completion logic - see 6)*
- *   *Honest-null:* row absent, replaced by `HonestNullState` - "Keep tracking to discover more connections"
- **Node Topology / Hub Status:**

## Consent and Safety
- Knowledge Graph lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/knowledge-graph`. Do not add alternate vanity routes.

## States
- **Default:** full interactive graph (20-50 nodes), all data confirmed/provenance-verified.
- **Skeleton:** ghost node/edge geometry in the graph's real settled layout, `--surface-3` shimmer sweep, CIA-voice caption beneath (see 5 correction). Transitions to Error after 10s.
- **Sheet loading (sub-state):** tapping a node opens the Sheet immediately with `SkeletonState` `StrengthListRow` placeholders while that node's connection data resolves, then swaps to real content - never a blank sheet, never a jump-cut pop-in.
- **Empty (cold-start):** never an empty canvas. 3-5 ghosted placeholder nodes at paper-100 20% opacity - *neutral, not domain-colored*, since coloring a node before its domain has real data would presume a connection that doesn't exist yet. No edges. Centered growing-copy line + calm 3-dot purple pulse.
- **Error:** centered glyph, error copy, orange retry link. Header/controls persist, dimmed to 40%. Graph drops to 0% opacity.
- **Success:** node selection draws the Sheet and highlights its local network (medium haptic).
- **Sheet overflow:** connections list shows top 4 by strength with internal scroll, or drag-to-`full` Sheet variant for hub nodes with more.
- **Disabled:** **Ask *CIA*** button disabled (40% opacity, matching `BtnCoach` disabled state) when offline.

## Motion
- **Easing & Timing:** physical easing only, never linear. Feedback (scale, opacity) within 150-250ms.
- **Entrance Choreography (first entry per session only - see 6 refinement):** nodes fade in staggered (20ms/node max). Once settled, edges "draw" outward via `stroke-dashoffset` over 400ms. Legend and controls fade in last. Later re-entries in the same session render already-settled, no restagger.
- **Glow Behavior:** the selected node's `--glow-you` pulses opacity 60->80->60% over 2s while selected; scale settles at 1.2x. No other element pulses or glows - see 6's "one true glow" correction.
- **Legend collapse:** auto-collapses to its chip form when the Sheet opens, re-expands (still requires a tap) once the Sheet is dismissed - keeps three floating layers from crowding a 390pt frame at once.
- **Haptics:** node press (pre-selection) - light impact. Node selection - medium impact. Connection-row tap (re-center canvas on that node) - light impact.
- **Gestures:** pan (drag), zoom (0.3x-3.0x pinch, double-tap), deselect (tap empty canvas, or drag down on the Sheet).
- **Reduced Motion:** graph renders instantly at its final settled frame. Entrance draw-in and the glow pulse loop are disabled outright. No information is lost - hub status, selection, and edge type are all still legible from static color/stroke/size alone.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/knowledge-graph`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** all text and glyph pairs hit AA+ against `--bg-base` and the `.glass-frost` sheet.; **Targets:** 44x44px minimum on every floating control, list row, and graph node - nodes get an invisible hit-box padding their visual size (32-64px) up to the 44px floor.; **Screen Reader (VoiceOver):** the visual graph suppresses entirely and renders as the same flat, domain-grouped list used by the Low Motivation tier (11) - sorted by connection count, fully linear.
