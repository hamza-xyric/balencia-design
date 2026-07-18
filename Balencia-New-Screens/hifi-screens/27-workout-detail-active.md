# 27-workout-detail-active - A+++ hi-fi mobile spec

## Header
- **Source ID:** 27
- **Source spec:** `Balencia-New-Screens/screens/27-workout-detail-active.md`
- **Evidence:** screens/27-workout-detail-active.md, work/briefs/27.md, work/drafts/27.md, Functional Brief (Workout Detail)
- **Route(s):** No live route; workout detail and manual logging are stacked sub-flows launched from Screen 26.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A multi-modal tracking surface that adapts to the user's state: planning a routine, executing an active session with live metrics, or reviewing post-workout analytics.
- **Premium Visual Director:** make Workout Detail / Active Workout hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Workout Detail / Active Workout names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
[0,0] ------------------------------------------- [390,0]
  +- TopBar (Transparent over atmosphere) ----------+
  |  Exit    Exercise 2 of 5   12:04    [] [x]   |
  +--------------------------------------------------+

  +- MomentumBar (SolidCard) -----------------------+
  | -----------------------------_______  60%       |
  +--------------------------------------------------+

  +- KPIRow (SolidCard) ------------+ +- Live HR ---+
  | 135 BPM           8:30 /mi      | |   SolidCard |
  | via WHOOP         via Apple Watch| +-------------+
  +----------------------------------+

  +- GlassCard (hero) ------------------------------+
  |  BACK SQUAT                         Fitness Tag |
  |  Set 3 of 5                                    | |
  |                                               | |
  |  WEIGHT (lbs)        REPS                     | |
  |  [  185  ]           [  8  ]                  | |
  |  Last set: 185 x 8                            | |
  |                                               | |
  |  +------------------------------------------+ | |
  |  |           Complete set x                 | | |
  |  +------------------------------------------+ | |
  +--------------------------------------------------+

  +- RestTimer (glass-pill) ------------------------+
  |    00:45 remaining              Skip rest  ->    |
  +--------------------------------------------------+

  +- CIA Insight Card ------------------------------+
  |  Keep your form *steady* through this set.     |
  |  Stop for sharp pain, dizziness, or chest pain.|
  |   --- Next Up: Romanian Deadlift ----            |
  +--------------------------------------------------+
[0,844] ----------------------------------------- [390,844]

Route handling: No live route; workout detail and manual logging are stacked sub-flows launched from Screen 26.
```

## Focal Hierarchy
- **Dominant focal moment:** Workout Detail / Active Workout hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Momentum Region with CIA only when the source supports a synthesized read.
- **Operational layer:** Live Metrics, Current Exercise Display, Set Tracker Card, CIA Feedback.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma parity mode is language-derived from `Workouts`: warm-light stack detail launched from the Workout/My Plan tab, compact top bar, active exercise card, visible timer, safe stop control, and bottom composer/controls pinned above the parent nav.
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain remain the premium active-session variant.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*workout*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Workout Detail frame was visible in the supplied Figma screenshots; inherit the Figma `Workouts` shell, especially `Workout` and `My Plan` tab rhythm.
- **Stack anatomy:** no owned route; opened from Screen 26 as a detail/active-session state with back/exit, progress/timer, current exercise, set inputs, rest timer, safety stop affordance, and source chip near live metrics.
- **Safety visibility:** stop/pause, pain/dizziness guidance, and form-safe CIA copy are visible in the active state, not only in compliance text.

## Components
- **TopBar:** Transparent over atmosphere.
- **MomentumBar:** (Catalog) Used for cumulative set completion.
- **KPIRow:** (Catalog) Data-dense surface for live metrics.
- **GlassStatCard:** (Catalog) Used for live heart rate.
- **NEW: ActiveExerciseCard:** A variant of `GlassCard` optimized for active input. Merges the exercise title, manual inputs (`GlassPillInput`), and the `BtnPrimary` into one cohesive hero component.
- **NEW: RestTimerSheet:** A `glass-pill` or bottom `Sheet` variant that anchors to the safe area. Visually constrained ring progress for rest duration.
- **CIAInsightCard:** (Catalog) Purple-tinted glass for real-time notes.
- **ProgressRing:** (Catalog) Used in Summary mode for effort/XP rings.

## Data Honesty
- Every metric ships three states: real (with provenance), low-confidence (muted), and honest-null. No fabricated numbers.
- **1. Heart Rate (BPM)**
- **Real:** 135 BPM  ChipProvenance (`via WHOOP`)
- **Low-confidence:** 135 BPM  muted 64%  Caption (`estimated  low confidence`)
- **Honest-null:** `Connect a heart-rate sensor`  BtnGhost (`Connect device`). Card omitted from layout.
- **2. Live Pace / Cadence**
- **Real:** 8:30 /mi  ChipProvenance (`via Apple Watch`)
- **Low-confidence:** 8:30 /mi  muted 64%  Caption (`estimated  low confidence`)
- **Honest-null:** `Sensor not available`  Tile displays `-`.
- **3. Previous Set Reference**
- **Real:** `Last set: 185 x 8` + source `you logged` or imported workout history.
- **Low-confidence:** muted `~185 x 8` + `estimated · low confidence` when parsed from an imported plan or partial sync.
- **Honest-null:** `No previous set yet` and no comparison delta.
- **Pain/stop guidance:** not a metric; it is always visible copy in active mode and never tied to XP or streak pressure.

## Consent and Safety
- Live metric chips open the same health-source sheet as Screen 26: category, source, freshness, confidence, retention, export, revoke, and delete.
- Workout Detail / Active Workout treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- CIA copy must never pressure the user to continue through pain. Active mode always includes `Stop workout`, `Pause`, and plain-language guidance for sharp pain, dizziness, faintness, or chest pain.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Planning state rendering a scrollable list of exercises via `SolidCard`.
- **Skeleton:** Depth-preserving shimmer blocks (`--surface-3` base) mapping the exercise cards and input geometries. Charts render axes only.
- **Empty:** `EmptyState` card for manual logging: `What did you do?` with a `BtnPrimary` to add an exercise.
- **Error:** Quiet failure `ErrorState`. If offline, the Complete Set button retains its shape but gains an orange outline with a Caption: `Couldn't save this set - you're offline. It will sync when you reconnect.`
- **Success:** Post-workout summary state; set completion flashes `--glow-done` (600ms).
- **Disabled:** Active inputs are disabled (40% opacity, no glow) until the user reaches that specific set in the sequence.
- *(Correction from Brief)*: The brief stated the offline button should have a "red border". Red implies user error or critical system failure, violating the calm premium aesthetic. This was corrected to an orange outline (system alert) to maintain visual harmony while signaling a sync state.

## Motion
- **Physical easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Feedback timing:** Set completion triggers a 150ms scale down (.98) and a 600ms `--glow-done` flash before auto-progressing.
- **Glow behavior:** The Active Card breathes (4s ease) to indicate the session timer is live.
- **Haptics:** Medium haptic on set completion. Heavy haptic on workout finish.
- **Rest Timer:** Depletes counter-clockwise over 250ms ease-out. Flashes green upon reaching 0.
- **Accessibility:** `prefers-reduced-motion` instantly disables the breathing glow and jumps the rest timer and summary visualizations directly to their final static states.

## Image Slots
- `HIFI-27-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Workout Detail / Active Workout instructional media thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; workout detail and manual logging are stacked sub-flows launched from Screen 26..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** All text on `--surface-2` and `.glass-card` uses `paper-100` (#FEFAF3) to guarantee AA+ against the warm dark base (#0A0A0F).; **44px targets:** The numeric inputs, while visually compact, sit inside `GlassPillInput` containers with a 52px minimum touch target. Pause and End workout controls meet 44px minimums.; **Screen-reader labels:** Glyph-only controls (Pause, Stop, Skip Rest) have `accessibilityLabel` attributes (e.g., "Pause workout", "Skip rest period").
