# 42-celebration-overlay - A+++ hi-fi mobile spec

## Header
- **Source ID:** 42
- **Source spec:** `Balencia-New-Screens/screens/42-celebration-overlay.md`
- **Evidence:** screens/42-celebration-overlay.md, work/briefs/42.md, work/drafts/42.md
- **Route(s):** `/subscription/success`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To give an honest, restrained payoff for consistency: a full-screen cinematic moment (`CelebrationOverlay`) for milestones - level-ups, streak thresholds - and a lightweight, non-blocking moment (`XPToast`) for everyday completions.
- **Premium Visual Director:** make Celebration Overlay hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Celebration Overlay uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|                                      |
|        (tap scrim = continue)       |
|                                      |
|           restrained particles    |
|                                   |
|                                      |
|   +------------------------------+  |  FrostCard  glow-done (green)
|   |  overall level up      chip: |  |
|   |                     level 8->9|  |
|   |        +------------+        |  |
|   |       |    badge    |       |  |  ProgressRing  82%, orange
|   |        +------------+        |  |  (neutral paper emblem -
|   |                              |  |   this level is aggregate,
|   |           + 120               |  |   not one domain, see 5)
|   |             XP                |  |  GlassStatCard, flush  Display
|   |       chip: you earned it     |  |
|   |                              |  |
|   |  ##################  82%      |  |  ProgressBar, segmented
|   +------------------------------+  |
|                                      |
|         -------+   +-------         |  ContinuousStrokeDivider
|                                      |
|   +------------------------------+  |  CIAInsightCard  glow-cia (purple)
|   |  level 9. your *consistency*|  |
|   |   across fitness and finance |  |
|   |   is coming together.        |  |
|   |           - CIA               |  |
|   |   [ fitness ]   [ finance ]   |  |  ChipDomainTag pair
|   +------------------------------+  |
|                                      |
|     ( continue )      share         |  BtnPrimary  BtnSecondary
|                                      |
+--------------------------------------+

Route handling: `/subscription/success`
```

## Focal Hierarchy
- **Dominant focal moment:** Celebration Overlay hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Particle layer - restrained green->orange particle burst . with CIA only when the source supports a synthesized read.
- **Operational layer:** ContinuousStrokeDivider - SVG line motif, draws once., Action row - BtnPrimary + BtnSecondary., ASCII wireframe - full overlay :, Overline.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*overlay*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **CelebrationOverlay** - root component (catalog 5). Owns the continuous-stroke draw, particle restraint, XP line, single `BtnPrimary`. This screen is its build spec; the draft never named it and hand-assembled the moment from smaller parts instead - restored here as the top-level reference.
- **ModalOverlay** - provides the centered-card-over-scrim structural pattern that `CelebrationOverlay` uses for its full-screen variant.
- **FrostCard** (`variant: summary`) - hero container, `--r-2xl` (40).
- **ProgressRing** (`variant: ring`) - frames the badge. Here it functions as an ambient progress frame, not a numeric readout (the numeral lives in the `ProgressBar` below it instead) - a stated, deliberate variant of the catalog's "center KPI" anatomy so the badge glyph isn't fighting a number for the same space.
- **GlassStatCard** (`variant: metric`, **flush sub-mode**) - carries the +XP honesty states (catalog usage rule 3: every metric renders through `GlassStatCard`/`KPIRow`, no exceptions). *Correction:* nesting a fully-chromed `GlassStatCard` inside an already-bordered, already-blurred `FrostCard` double-glasses a single region. Flush mode keeps the honesty-state machinery (real / low-confidence / honest-null) without its own border, blur, or shadow - it inherits the FrostCard's chrome.
- **ProgressBar** (`variant: segmented`) - literal 82%-to-next-level readout, orange fill.
- **NEW: ContinuousStrokeDivider** - *rationale: Canon 6 mandates a continuous-stroke line motif for hero/celebration moments and the catalog's `CelebrationOverlay` entry names it as anatomy but doesn't spec the draw itself. This names the SVG path-draw sub-component so the animation is buildable and reusable rather than reinvented per screen.*
- **CIAInsightCard** - *correction, not new:* the draft rendered the coach line as bare floating text with no card, no glow, no evidence chips - the one catalog component built exactly for this (purple `glow-cia`, spark glyph, Tiempos-italic emphasis, evidence row) was simply unused. Restored here with its evidence row as a `ChipDomainTag` pair, since the copy is explicitly cross-pillar (fitness + finance) and the catalog says cross-pillar insights "cite both domains via `ChipDomainTag` pair."
- **ChipDomainTag** x2 - Fitness `#ef4444`, Finance `#10b981` (CANON 4). Tag-only use, never chrome.
- **ChipProvenance** x2 - XP: `you earned it` (system-computed, not synced - see 8 for why "via Balencia RPG" was wrong); progress: `level 8 -> 9`.
- **BtnPrimary** ("continue") - *correction:* the draft's action row had only `BtnSecondary` (share) and a tap-hint, with no primary button at all - but the catalog's `CelebrationOverlay` entry explicitly requires "single `BtnPrimary`." Added, and it doubles as the accessible exit path named in 3.
- **BtnSecondary** ("share").
- **XPToast** - *correction:* the draft flagged this `NEW:`, but it is already cataloged verbatim in COMPONENT-CATALOG.md 5 ("compact top toast: `+40 XP  Fitness` with `ChipDomainTag`; auto-dismiss 2.5s"). No promotion needed - cited as existing.
- **Badge emblem** - reuses `BadgeTile`'s emblem/domain-color iconography convention at hero scale inside the `ProgressRing` frame; it is not a literal `BadgeTile` instance (no lock state, no earned-date caption applies to a same-moment celebration).

## Data Honesty
- **Metric: XP earned**
- **Real:** `+ 120 XP` (NM Medium, tabular-nums). Provenance: `you earned it`. *Correction:* the draft used `via Balencia RPG`, which reads like a third-party sync source - XP is computed live by the app's own engine, not synced from anywhere, so it doesn't get a "via [source]" chip. `you earned it` mirrors canon's existing `you logged` construction (first-party, honest, second-person).
- **Low-confidence:** N/A - XP is an exact, deterministic system calculation, never estimated. (Stated, not silently skipped.)
- **Honest-null:** If the XP value fails to resolve, the entire XP block (stat + provenance chip) is omitted - never a fabricated placeholder. Layout recenters using the same graceful-collapse rule as the CIA-message failure in 9, so the FrostCard never shows an awkward gap.
- **Metric: progress to next level**
- **Real:** `ProgressRing`/`ProgressBar` at `82%`. Provenance: `level 8 -> 9`.
- **Low-confidence:** N/A - level math is deterministic.
- **Honest-null:** If this celebration is a pure streak with no level attached (e.g., a 7-day streak, not a level-up), the `ProgressRing` and `ProgressBar` are omitted entirely - not shown at 0% or greyed out. A streak-only celebration shows badge + XP + CIA message only.
- **Domain tags on the hero overlay:**
- *Correction / clarification:* for an **overall** Life Power level-up (this instance), the badge emblem itself stays neutral paper-100 - it isn't one domain's badge, so it doesn't borrow one domain's hex. Cross-domain evidence lives only in the `CIAInsightCard`'s `ChipDomainTag` pair. If this same overlay instead fires from a **single-domain** trigger (e.g., screen 27 workout finish, screen 38 habit streak), the hero `GlassStatCard` gets one `ChipDomainTag` next to the XP value in that domain's color, and the CIA card's evidence row drops to a single chip or omits it if the insight isn't cross-pillar.

## Consent and Safety
- Celebration Overlay uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/subscription/success`. Do not add alternate vanity routes.

## States
- **Default:** full-screen choreographed entrance (particles -> badge scale-in -> stroke draw -> CIA card fade-up -> actions).
- **Skeleton:** achievement data still loading - `FrostCard` shows a shimmering `--surface-3` block where the badge sits, `0 XP` placeholder (explicitly zero, never a guessed number), caption `getting your result ready`. No `CIAInsightCard` renders yet (avoids showing a card with nothing to say).
- **Honest-null - CIA message unavailable:** if the CIA copy API fails, the `ContinuousStrokeDivider` and `CIAInsightCard` are both hidden - not replaced with filler text. `FrostCard`'s bottom margin recenters so the composition doesn't read as broken or waiting.
- **Error - share failure:** *correction:* the draft gave `BtnSecondary` a `1.5px #ef4444` border on failure. `#ef4444` is the Fitness **domain tag** color, reserved for tags/icons only and never chrome (canon 4) - reusing it as an error-red border both invents an off-canon "error" token and misapplies a domain color as chrome. Canon defines no error-red at all, so failure here stays quiet per the catalog's `ErrorState` ethos: the button's chrome is untouched, only its label swaps to `sharing failed  try again` for 2.5s, then reverts. No color signal, no blame.
- **Fast-dismiss (early tap):** *renamed from the draft's "Success," which isn't a real state category here.* If the user taps `BtnPrimary` or the scrim before the entrance sequence finishes, all count-ups and the stroke draw resolve instantly to final values - never left mid-animation.
- **Toast variant states:** default (slides in from top, 200ms) -> auto-dismiss (2.5s, fades + slides up) -> early-dismiss (swipe up, 150ms). Non-modal throughout; underlying tab stays fully interactive.
- **Disabled:** N/A - the overlay/toast is either present or dismissed; there is no inert variant.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Entrance:** spring physics (`stiffness 150, damping 15`) for badge scale-in; all fades 150-250ms ease-out; stroke divider draws once, left-to-right, ~400ms.
- **Glow behavior:** the `FrostCard`'s green glow breathes (60%->100% opacity, 3s ease) as the primary hero card. The `CIAInsightCard`'s purple glow stays static/calm once it fades in - it's the secondary beat, and two breathing glows on screen at once would read busy rather than premium.
- **Haptics:** medium-weight impact synced to the badge's scale-in snap (iOS: `UIImpactFeedbackGenerator .medium` equivalent; Android: platform confirm-tier haptic) - *correction: the draft's "Core Haptics" naming is iOS-only API vocabulary; canon specifies native iOS **and** Android, so the spec now names the platform-neutral behavior with per-platform equivalents rather than one platform's SDK class.*
- **Reduced-motion path:** particles removed entirely; badge, XP, progress, and stroke divider render instantly at final state; `CIAInsightCard` is immediately visible (no fade-up); glow breathe becomes a static glow; the 1.2s entrance lockout is bypassed so dismissal is available immediately.
- **Toast motion:** slide-down-in 200ms, slide-up-out on dismiss; no particles, no haptic (reserved for the full overlay only - everyday wins shouldn't compete with milestone haptics).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/subscription/success`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast pairs:** paper-100 `#FEFAF3` on scrim `rgba(10,10,15,.6)` - AA+. Orange `#FF5E00` on `--bg-base` `#0A0A0F` - AA+. `ChipDomainTag` labels render in domain color over that domain's own 16%-tint pill background (Fitness `#ef4444`, Finance `#10b981`) - verified against the standard chip pattern used everywhere else these tags appear, not unique to this screen.; **Targets:** `BtnPrimary` height 52, `BtnSecondary` meets 44px minimum. The scrim itself is a full-screen tap target for the scrim-tap shortcut, but per 3 it is never the *only* way out - `BtnPrimary` is the labeled, guaranteed affordance for VoiceOver/TalkBack users who can't rely on an unlabeled full-screen gesture.; **Screen-reader labels:** backdrop carries `.button` trait, label `"dismiss celebration"`; `BtnPrimary` reads `"continue"`; badge glyph is hidden from the accessibility tree and replaced with a direct text node, `"level 9 badge, earned"`; `ProgressRing`/`ProgressBar` collapse to one announcement, `"82 percent to level 10"`; `CIAInsightCard` reads as one block (`"CIA: level 9. Your consistency across fitness and finance is coming together."`) followed by the two domain-tag labels; `XPToast` posts as a polite live-region announcement (`"plus 40 XP, fitness"`) without stealing focus from the underlying tab.
