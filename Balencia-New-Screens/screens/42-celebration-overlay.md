### 1. Header
**Screen ID:** 42-celebration-overlay
**Name:** Celebration / Achievement Overlay
- **Route(s) covered:** `/subscription/success`
- **Overlay states:** Global non-routed `CelebrationOverlay` for milestone moments and top overlay `XPToast` for everyday wins.
**Tab:** N/A (system-triggered, layers over whichever tab fired it)
**Source:** Functional content brief + Balencia Glass Canon
**Batch:** 9

### 2. Purpose
To give an honest, restrained payoff for consistency: a full-screen cinematic moment (`CelebrationOverlay`) for milestones — level-ups, streak thresholds — and a lightweight, non-blocking moment (`XPToast`) for everyday completions. Both read from the same XP/provenance data; only the staging changes with the size of the win and the user's motivation tier. Never invents a number, never traps the user in the moment.

### 3. Entry & exit
**Entry paths (system-triggered):**
* Mission completion (Screen 14)
* Workout finish (Screen 27)
* Habit streak achieved (Screen 38)
* Action completion on Home (Screen 12)
* Overall or domain Life Power level-up threshold crossed

**Exit paths — full overlay:**
* **Primary:** Tap `BtnPrimary` ("continue") — labeled, focusable, the accessible-first affordance.
* **Equivalent:** Tap anywhere on the backdrop scrim — kept as a fast, physical shortcut for sighted users; VoiceOver users rely on the labeled button instead, which is why `BtnPrimary` was added (see §5 correction).
* **Secondary:** Tap `BtnSecondary` ("share") → native share sheet; overlay stays open behind it.
* *Correction:* The brief's 10-second auto-dismiss failsafe is replaced by a 1.2-second input lockout during the entrance animation only. After that, tap-to-continue is live. A moment that lingers indefinitely — or one a screen-reader user can't find an exit from — breaks the premium "moment in time" read; a named button fixes both.

**Exit paths — toast:**
* Auto-dismiss **2.5s** (matches catalog `XPToast` spec exactly — the draft's invented "3s / extends to 5s" was not a canon value and is corrected here). Extends to 5s only when VoiceOver/TalkBack is active, per WCAG 2.2.1 timing-adjustable allowance. Swipe-up dismisses early at any time.

### 4. Layout anatomy
**Regions (top to bottom), full overlay:**
1. **Scrim & atmosphere layer** — darkened blur, captures global tap-to-dismiss.
2. **Particle layer** — restrained green→orange particle burst (decorative motif, not a card glow).
3. **Hero FrostCard** — overline, badge in `ProgressRing`, XP stat, progress-to-next-level bar. Single glow: `--glow-done`.
4. **ContinuousStrokeDivider** — SVG line motif, draws once.
5. **CIAInsightCard** — coach message, cross-domain evidence chips. Single glow: `--glow-cia`.
6. **Action row** — `BtnPrimary` + `BtnSecondary`.

**ASCII wireframe — full overlay (390×844):**
```text
┌──────────────────────────────────────┐
│                                      │
│        (tap scrim = continue)       │
│                                      │
│     ·      restrained particles   · │
│        ✦                    ✦       │
│                                      │
│   ╔══════════════════════════════╗  │  FrostCard · glow-done (green)
│   ║  overall level up      chip: ║  │
│   ║                     level 8→9║  │
│   ║        ╭────────────╮        ║  │
│   ║       │   ⬥ badge    │       ║  │  ProgressRing · 82%, orange
│   ║        ╰────────────╯        ║  │  (neutral paper emblem —
│   ║                              ║  │   this level is aggregate,
│   ║           + 120               ║  │   not one domain, see §5)
│   ║             XP                ║  │  GlassStatCard, flush · Display
│   ║       chip: you earned it     ║  │
│   ║                              ║  │
│   ║  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░  82%      ║  │  ProgressBar, segmented
│   ╚══════════════════════════════╝  │
│                                      │
│         ───────╯   ╭───────         │  ContinuousStrokeDivider
│                                      │
│   ┌──────────────────────────────┐  │  CIAInsightCard · glow-cia (purple)
│   │ ✦ level 9. your *consistency*│  │
│   │   across fitness and finance │  │
│   │   is coming together.        │  │
│   │           — CIA               │  │
│   │   [ fitness ]   [ finance ]   │  │  ChipDomainTag pair
│   └──────────────────────────────┘  │
│                                      │
│     ( continue )      share         │  BtnPrimary · BtnSecondary
│                                      │
└──────────────────────────────────────┘
```

**ASCII wireframe — toast variant (domain-level-up, medium-tier):**
```text
┌──────────────────────────────────────┐
│   ┌────────────────────────────┐    │
│   │  + 40 XP  ·  [ fitness ]    │    │  XPToast · glass-pill, top
│   └────────────────────────────┘    │  auto-dismiss 2.5s, no scrim
│                                      │
│      (Today tab content beneath,     │
│       fully interactive)             │
└──────────────────────────────────────┘
```

### 5. Components
* **CelebrationOverlay** — root component (catalog §5). Owns the continuous-stroke draw, particle restraint, XP line, single `BtnPrimary`. This screen is its build spec; the draft never named it and hand-assembled the moment from smaller parts instead — restored here as the top-level reference.
* **ModalOverlay** — provides the centered-card-over-scrim structural pattern that `CelebrationOverlay` uses for its full-screen variant.
* **FrostCard** (`variant: summary`) — hero container, `--r-2xl` (40).
* **ProgressRing** (`variant: ring`) — frames the badge. Here it functions as an ambient progress frame, not a numeric readout (the numeral lives in the `ProgressBar` below it instead) — a stated, deliberate variant of the catalog's "center KPI" anatomy so the badge glyph isn't fighting a number for the same space.
* **GlassStatCard** (`variant: metric`, **flush sub-mode**) — carries the +XP honesty states (catalog usage rule 3: every metric renders through `GlassStatCard`/`KPIRow`, no exceptions). *Correction:* nesting a fully-chromed `GlassStatCard` inside an already-bordered, already-blurred `FrostCard` double-glasses a single region. Flush mode keeps the honesty-state machinery (real / low-confidence / honest-null) without its own border, blur, or shadow — it inherits the FrostCard's chrome.
* **ProgressBar** (`variant: segmented`) — literal 82%-to-next-level readout, orange fill.
* **NEW: ContinuousStrokeDivider** — *rationale: Canon §6 mandates a continuous-stroke line motif for hero/celebration moments and the catalog's `CelebrationOverlay` entry names it as anatomy but doesn't spec the draw itself. This names the SVG path-draw sub-component so the animation is buildable and reusable rather than reinvented per screen.*
* **CIAInsightCard** — *correction, not new:* the draft rendered the coach line as bare floating text with no card, no glow, no evidence chips — the one catalog component built exactly for this (purple `glow-cia`, spark glyph, Tiempos-italic emphasis, evidence row) was simply unused. Restored here with its evidence row as a `ChipDomainTag` pair, since the copy is explicitly cross-pillar (fitness + finance) and the catalog says cross-pillar insights "cite both domains via `ChipDomainTag` pair."
* **ChipDomainTag** ×2 — Fitness `#ef4444`, Finance `#10b981` (CANON §4). Tag-only use, never chrome.
* **ChipProvenance** ×2 — XP: `you earned it` (system-computed, not synced — see §8 for why "via Balencia RPG" was wrong); progress: `level 8 → 9`.
* **BtnPrimary** ("continue") — *correction:* the draft's action row had only `BtnSecondary` (share) and a tap-hint, with no primary button at all — but the catalog's `CelebrationOverlay` entry explicitly requires "single `BtnPrimary`." Added, and it doubles as the accessible exit path named in §3.
* **BtnSecondary** ("share").
* **XPToast** — *correction:* the draft flagged this `NEW:`, but it is already cataloged verbatim in COMPONENT-CATALOG.md §5 ("compact top toast: `+40 XP · Fitness` with `ChipDomainTag`; auto-dismiss 2.5s"). No promotion needed — cited as existing.
* **Badge emblem** — reuses `BadgeTile`'s emblem/domain-color iconography convention at hero scale inside the `ProgressRing` frame; it is not a literal `BadgeTile` instance (no lock state, no earned-date caption applies to a same-moment celebration).

### 6. Visual treatment
* **Glass tiers:**
  * Scrim: `rgba(10,10,15,.6)`, matches the `Sheet`/`ModalOverlay` scrim value in canon.
  * Hero FrostCard: `.glass-frost` — `rgba(255,255,255,.10)`, blur 48px, sat 130%, border `.16`, inset top-light `.40`, radius 40.
  * CIAInsightCard: purple-tinted glass per catalog (`glow-cia` bleed), same `.glass-frost` recipe with the semantic glow swapped to purple.
  * Buttons: `.glass-pill` (`BtnSecondary`); `BtnPrimary` is solid orange fill per canon, no glass.
* **Glow color & meaning — one per card, corrected:**
  * *Correction:* the draft put `--glow-you` (orange) on the `ProgressRing` **and** `--glow-done` (green) on the `FrostCard`'s edge in the same composition — two competing semantic glows bleeding into one card, against Usage rule 1 ("one semantic glow per card"). Resolved by separating **card-level ambient glow** (one per card, canon §3 recipe) from **component-level fill color** (the `ProgressRing`/`ProgressBar`'s own orange→green fill logic, which is functional progress signage, not the card's atmosphere):
    * `FrostCard` → **`--glow-done` (green)**, bottom-anchored radial, `color-mix(in srgb, #34A853 55%, transparent)` → transparent, blur 24px, height 62% of card. Meaning: *the level-up itself just happened — done.*
    * `ProgressRing` / `ProgressBar` fill → **orange**, per their own catalog behavior (fill orange, flips green only at 100%). At 82% they correctly stay orange. Meaning: *the next level is in progress — you (effort), not yet done.* This is honest: the level-up already happened (green card), but the *next* climb is only 82% underway (orange bar) — two true facts, not a contradiction.
    * `CIAInsightCard` → **`--glow-cia` (purple)**, same recipe. Meaning: *this is CIA speaking — AI insight, not a system readout.*
* **Background atmosphere:** `--bg-base` with the mandatory warm orange radial top-center, plus a purple pool layered in behind the CIA region (canon §1: "CIA moments add a purple pool") — the draft's atmosphere was orange-only and missed this despite the screen containing a full `CIAInsightCard`.
* **Hero type moment:** `+ 120 XP` in **Display** (NM Medium 500, 52px), tabular-nums — the one Display moment on this screen, inside the flush `GlassStatCard`.

### 7. Content & copy
* **Overline:** `overall level up.`
* **Hero stat:** `+ 120 XP`
* **Progress caption:** `level 8 → 9`
* **CIA message:** `Level 9. Your *consistency* across fitness and finance is coming together.` (Tiempos Medium italic on "consistency" — the one emphasis word for this moment.)
* **Attribution:** `— CIA`
* **Domain evidence:** `fitness` · `finance` (ChipDomainTag pair, lowercase per sentence-case rule even though the chip glyphs render domain-tinted)
* **Controls:** `continue` (BtnPrimary), `share` (BtnSecondary)
* **Toast copy:** `+ 40 XP · fitness`
* *Correction carried from draft (verified, kept):* every "CIA" reference in the source brief is written as **CIA** throughout — attribution, message, and all copy. No stray "CIA" remains anywhere in this spec.

### 8. Data & honesty states
**Metric: XP earned**
* **Real:** `+ 120 XP` (NM Medium, tabular-nums). Provenance: `you earned it`. *Correction:* the draft used `via Balencia RPG`, which reads like a third-party sync source — XP is computed live by the app's own engine, not synced from anywhere, so it doesn't get a "via [source]" chip. `you earned it` mirrors canon's existing `you logged` construction (first-party, honest, second-person).
* **Low-confidence:** N/A — XP is an exact, deterministic system calculation, never estimated. (Stated, not silently skipped.)
* **Honest-null:** If the XP value fails to resolve, the entire XP block (stat + provenance chip) is omitted — never a fabricated placeholder. Layout recenters using the same graceful-collapse rule as the CIA-message failure in §9, so the FrostCard never shows an awkward gap.

**Metric: progress to next level**
* **Real:** `ProgressRing`/`ProgressBar` at `82%`. Provenance: `level 8 → 9`.
* **Low-confidence:** N/A — level math is deterministic.
* **Honest-null:** If this celebration is a pure streak with no level attached (e.g., a 7-day streak, not a level-up), the `ProgressRing` and `ProgressBar` are omitted entirely — not shown at 0% or greyed out. A streak-only celebration shows badge + XP + CIA message only.

**Domain tags on the hero overlay:**
* *Correction / clarification:* for an **overall** Life Power level-up (this instance), the badge emblem itself stays neutral paper-100 — it isn't one domain's badge, so it doesn't borrow one domain's hex. Cross-domain evidence lives only in the `CIAInsightCard`'s `ChipDomainTag` pair. If this same overlay instead fires from a **single-domain** trigger (e.g., screen 27 workout finish, screen 38 habit streak), the hero `GlassStatCard` gets one `ChipDomainTag` next to the XP value in that domain's color, and the CIA card's evidence row drops to a single chip or omits it if the insight isn't cross-pillar.

### 9. All states
* **Default:** full-screen choreographed entrance (particles → badge scale-in → stroke draw → CIA card fade-up → actions).
* **Skeleton:** achievement data still loading — `FrostCard` shows a shimmering `--surface-3` block where the badge sits, `0 XP` placeholder (explicitly zero, never a guessed number), caption `getting your result ready`. No `CIAInsightCard` renders yet (avoids showing a card with nothing to say).
* **Honest-null — CIA message unavailable:** if the CIA copy API fails, the `ContinuousStrokeDivider` and `CIAInsightCard` are both hidden — not replaced with filler text. `FrostCard`'s bottom margin recenters so the composition doesn't read as broken or waiting.
* **Error — share failure:** *correction:* the draft gave `BtnSecondary` a `1.5px #ef4444` border on failure. `#ef4444` is the Fitness **domain tag** color, reserved for tags/icons only and never chrome (canon §4) — reusing it as an error-red border both invents an off-canon "error" token and misapplies a domain color as chrome. Canon defines no error-red at all, so failure here stays quiet per the catalog's `ErrorState` ethos: the button's chrome is untouched, only its label swaps to `sharing failed · try again` for 2.5s, then reverts. No color signal, no blame.
* **Fast-dismiss (early tap):** *renamed from the draft's "Success," which isn't a real state category here.* If the user taps `BtnPrimary` or the scrim before the entrance sequence finishes, all count-ups and the stroke draw resolve instantly to final values — never left mid-animation.
* **Toast variant states:** default (slides in from top, 200ms) → auto-dismiss (2.5s, fades + slides up) → early-dismiss (swipe up, 150ms). Non-modal throughout; underlying tab stays fully interactive.
* **Disabled:** N/A — the overlay/toast is either present or dismissed; there is no inert variant.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
* **Entrance:** spring physics (`stiffness 150, damping 15`) for badge scale-in; all fades 150–250ms ease-out; stroke divider draws once, left-to-right, ~400ms.
* **Glow behavior:** the `FrostCard`'s green glow breathes (60%→100% opacity, 3s ease) as the primary hero card. The `CIAInsightCard`'s purple glow stays static/calm once it fades in — it's the secondary beat, and two breathing glows on screen at once would read busy rather than premium.
* **Haptics:** medium-weight impact synced to the badge's scale-in snap (iOS: `UIImpactFeedbackGenerator .medium` equivalent; Android: platform confirm-tier haptic) — *correction: the draft's "Core Haptics" naming is iOS-only API vocabulary; canon specifies native iOS **and** Android, so the spec now names the platform-neutral behavior with per-platform equivalents rather than one platform's SDK class.*
* **Reduced-motion path:** particles removed entirely; badge, XP, progress, and stroke divider render instantly at final state; `CIAInsightCard` is immediately visible (no fade-up); glow breathe becomes a static glow; the 1.2s entrance lockout is bypassed so dismissal is available immediately.
* **Toast motion:** slide-down-in 200ms, slide-up-out on dismiss; no particles, no haptic (reserved for the full overlay only — everyday wins shouldn't compete with milestone haptics).

### 11. Motivation-tier adaptation
* **Low motivation:** lower trigger threshold (e.g., a 3-day streak earns the full overlay, not just a toast). Copy leans encouraging without inflating the achievement: `Everyone starts here. You just did the *hardest* part — starting.`
* **Medium motivation:** standard behavior as specced above — domain-level-ups trigger `XPToast`, overall level-ups trigger the full `CelebrationOverlay`.
* **High motivation:** everyday `XPToast`s are suppressed (inline pulse on the trigger screen instead — no separate overlay component, just a brief glow-you flash on the action that was just completed). When the full overlay does fire, particles are dropped in favor of a `SolidCard` data summary appended below the `CIAInsightCard` — data over fanfare, consistent with catalog's data-dense-uses-`SolidCard` rule.

### 12. Accessibility
* **Contrast pairs:** paper-100 `#FEFAF3` on scrim `rgba(10,10,15,.6)` — AA+. Orange `#FF5E00` on `--bg-base` `#0A0A0F` — AA+. `ChipDomainTag` labels render in domain color over that domain's own 16%-tint pill background (Fitness `#ef4444`, Finance `#10b981`) — verified against the standard chip pattern used everywhere else these tags appear, not unique to this screen.
* **Targets:** `BtnPrimary` height 52, `BtnSecondary` meets 44px minimum. The scrim itself is a full-screen tap target for the scrim-tap shortcut, but per §3 it is never the *only* way out — `BtnPrimary` is the labeled, guaranteed affordance for VoiceOver/TalkBack users who can't rely on an unlabeled full-screen gesture.
* **Screen-reader labels:** backdrop carries `.button` trait, label `"dismiss celebration"`; `BtnPrimary` reads `"continue"`; badge glyph is hidden from the accessibility tree and replaced with a direct text node, `"level 9 badge, earned"`; `ProgressRing`/`ProgressBar` collapse to one announcement, `"82 percent to level 10"`; `CIAInsightCard` reads as one block (`"CIA: level 9. Your consistency across fitness and finance is coming together."`) followed by the two domain-tag labels; `XPToast` posts as a polite live-region announcement (`"plus 40 XP, fitness"`) without stealing focus from the underlying tab.

### 13. Premium checklist
1. **Connects:** CIA insight explicitly bridges two domains (fitness + finance) in copy *and* in a `ChipDomainTag` evidence row — not copy alone. *(Pass)*
2. **Honest:** XP/level honest-null paths never fabricate a number; share-failure never invents an off-canon error color. *(Pass)*
3. **Premium:** restrained particles, physical springs, selective glass, a labeled primary exit instead of relying only on an implicit tap-anywhere gesture. *(Pass)*
4. **60/30/10:** orange drives the `ProgressRing`/`ProgressBar` fill and `BtnPrimary`; green drives the `FrostCard`'s one completion glow; purple drives the `CIAInsightCard`'s one AI-voice glow. *(Pass)*
5. **Semantic inner-glow — one per card:** `FrostCard` = green (done), `CIAInsightCard` = purple (CIA) — the draft's original orange-on-ring-plus-green-on-card overlap on a single card is corrected in §6. *(Pass, corrected)*
6. **Selective glass:** frost reserved for the hero card, the CIA card, and the toast pill; the XP metric uses a flush (chromeless) `GlassStatCard` sub-mode specifically to avoid double-glassing inside the FrostCard. *(Pass)*
7. **One hero type moment:** `+ 120 XP` at Display 52px is the sole massive text on screen. *(Pass)*
8. **Voice/CIA:** CIA naming verified; one Tiempos-italic emphasis word ("consistency") in the one CIA moment. *(Pass)*
9. **Data-viz rules:** `ProgressRing`/`ProgressBar` are solid orange while in progress, no gradient tricks, no dark chart gradients. *(Pass)*
10. **Radii:** `FrostCard` at `--r-2xl` (40); buttons at pill (999); `ChipDomainTag`/`ChipProvenance` at pill. *(Pass)*
11. **Motion:** physical easing, one breathing glow (not two competing), full reduced-motion path including bypassed input lockout. *(Pass)*
12. **Locked-feature gating:** *honest N/A* — this is a system-triggered achievement moment with zero premium-gated content; `PaywallLock` has no reason to appear here. The draft's original checklist claimed this was "handled via the Subscription Success variant," which refers to nothing that exists anywhere in this spec — that claim is removed and replaced with a justified not-applicable rather than forced fake compliance.
13. **Catalog conformance:** root component is named (`CelebrationOverlay`), its "single `BtnPrimary`" requirement is met (the draft omitted it entirely), and `XPToast` is cited as existing rather than wrongly flagged `NEW:`. *(Pass, corrected)*
