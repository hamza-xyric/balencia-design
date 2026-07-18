# 34-spirituality-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 34
- **Source spec:** `Balencia-New-Screens/screens/34-spirituality-dashboard.md`
- **Evidence:** screens/34-spirituality-dashboard.md, work/briefs/34.md, work/drafts/34.md, Functional Content Brief: Spirituality Dashboard
- **Route(s):** No live app route; source-only spirituality surface.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To provide a calm, belief-adaptive hub for daily spiritual practices.
- **Premium Visual Director:** make Spirituality dashboard map the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Spirituality dashboard keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------+ -+
      |                            [Lv.3]   |  |
      |  Spirituality                        |  |
      +---------------------------------------+ -+
      +---------------------------------------+ -+
      |  o CIA                                |  |
      |  Your consistency with prayer has     |  |
      |  improved your overall _calm_ this   |  |
      |                          [Read more]  |  |
      +---------------------------------------+ -+

      +---------------------------------------+ -+
      | TODAY'S PRACTICE                      |  |
      | +---------------------------------+   |  | SolidCard
      | | o Fajr               5:12 AM    |   |  |
      | +---------------------------------+   |  |
      | |  Dhuhr            x completed   |   |  |
      | +---------------------------------+   |  |
      +---------------------------------------+ -+

      +---------------------------------------+ -+
      | CONSISTENCY                           |  |
      | ##########################            |  |
      | your practice begins today            |  |
      +---------------------------------------+ -+

      +------------------+ +------------------+ -+
      | READING          | | REFLECTION       |  | Glass
      | Surah Al-Baqarah | | What are you    |  |
      | Page 42 / 604    | | Tap to write     |  |
      +------------------+ +------------------+ -+

      +------------------+ +------------------+
      |  Contemplation   | |  Breathing       |
      +------------------+ +------------------+

+---------------------------------------------------+
|        Today        CIA        Goals        Me    |
+---------------------------------------------------+

Route handling: No live app route; source-only spirituality surface.
```

## Focal Hierarchy
- **Dominant focal moment:** Spirituality dashboard map; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA Coaching Note, Practice Schedule, Consistency Heatmap, Reading Progress.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Transparent over atmosphere)
- **CIAInsightCard** (Default, royal purple)
- **SolidCard** (Default, used for Prayer Schedule list)
- **ListRow** (Toggle/Check variant, for practices)
- **HonestNullState** (For consistency history)
- **GlassStatCard** (`sparkline` variant for reading, `metric` for reflection)
- **BtnSecondary** (For timer shortcuts)
- **GlassNavBar** (Floating pill)
- **FABQuickLog** (Global, above nav)
- **NEW: ContextualTimerSheet:** Replaces standard Sheet to display time rings without applying gamification pressure to the timer overlay. Promoting to catalog.

## Data Honesty
- Every metric is grounded in provenance or rendered honestly.
- **Metric: Prayer Time (Fajr)**
- - **Real:** "5:12 AM"  Chip: "via Prayer API"
- - **Low-confidence:** "5:14 AM" (muted 64%)  Label: "estimated  low confidence"
- - **Honest-null:** "Time not set"  Action: "Enable location for accurate times"
- **Metric: Practice Completion (3/5)**
- - **Real:** "3 / 5"  Chip: "you logged"
- - **Low-confidence:** N/A (binary state)
- - **Honest-null:** "Not enough data yet - 3 more days" (Momentum bar hidden)
- **Metric: Consistency History (Heatmap)**

## Consent and Safety
- Spirituality dashboard keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Practices listed, CIA note visible, reading/reflection tiles populated.
- **Skeleton:** Depth-preserving shimmer blocks (`--surface-3` base) replacing components. Loading text centered: "CIA is reading your week - one moment." Axis renders as ghost lines for charts.
- **Empty (Cold Start):** Practices replaced with `EmptyState` card: "CIA can *suggest* practices for your beliefs." Consistency heatmap renders as a blank grid.
- **Error:** Cached data retained for Practices. If Prayer API fails: "Couldn't load your practices - pull to refresh." Fasting card hides entirely (no fake countdowns).
- **Success:** Toggling a practice visually fills the check glyph (250ms). No celebratory explosion. Silently retracts if un-tapped.
- **Disabled:** Offline state dimms unchecked practices to 40% opacity; cached checked practices retain full color.

## Motion
- **Easing & Duration:** Physical spring easing for sheets (`spring(stiffness: 300, damping: 30)`); standard interactions locked to 180ms ease-out.
- **Glow behavior:** `CIAInsightCard` executes a 4s slow radial breathe (`glow-cia` alpha 0.35 -> 0.55) to feel alive without demanding attention. No glow on standard practice rows.
- **Haptics:** Soft impact on completing a practice (joy without adrenaline). Medium impact on opening configuration sheets.
- **Gestures:** Pull-to-refresh snaps back; bottom sheets drag down with 1:1 touch tracking before snapping out.
- **Reduced-motion path:** Glow breathe snaps to static alpha. Practice completion checks fade in instantly (no scale pop). Timers tick numerically without pulsing UI rings.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live app route; source-only spirituality surface..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Color Contrast:** Paper-100 (#FEFAF3) on `--bg-base` (#0A0A0F) exceeds 15:1. Domain tag for Spirituality (#8b5cf6) paired with paper-50 maintains AA+ for small text.; **Touch Targets:** Practice `ListRow` actions (chevrons/toggles) padded to 44px minimum. Floating nav and FAB spaced 16px from edge and home indicator to prevent thumb false-positives.; **Screen-reader:** Glyph-only controls (like the timer launch icons) have explicit `aria-labels` (e.g., "Launch contemplation timer"). Toggle switches announce state changes ("Dhuhr, marked as completed"). Heatmap exposes text summary via VoiceOver rather than requiring visual interpretation of dots.
