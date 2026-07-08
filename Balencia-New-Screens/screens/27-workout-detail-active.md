### 1. Header
- **ID:** 27-workout-detail-active
- **Name:** Workout Detail / Active Workout
- **Route(s) covered:** No live route; workout detail and manual logging are stacked sub-flows launched from Screen 26.
- **Tab:** Fitness (Active state hides global tab bar)
- **Source:** Functional Brief (Workout Detail)
- **Batch:** 11

### 2. Purpose
A multi-modal tracking surface that adapts to the user's state: planning a routine, executing an active session with live metrics, or reviewing post-workout analytics. It serves as the primary touchpoint for logging physical effort, capturing both manual input and wearable telemetry to feed CIA's whole-life intelligence engine.

### 3. Entry & exit
- **Entry paths:**
  - Push from Screen 26 (Fitness Dashboard) via "Start workout" or routine preview card.
  - Deep-link from Screen 12 (Home dashboard) via action card.
  - System resume prompt on app relaunch if killed during an active session.
- **Exit paths:**
  - Stack pop to Screen 26 via back button (Planning) or "Done" CTA (Summary).
  - Modal present to Screen 42 (Celebration) if a level-up milestone is reached.

### 4. Layout anatomy
The screen operates as a three-mode state machine. The layout shifts from a scrollable list (Planning) to a fixed, immersive focal surface (Active), and finally to an analytical dashboard (Summary). 

- **TopBar:** Contextual controls (Index, Elapsed Time, Pause, End).
- **Momentum Region:** Session completion visual.
- **Live Metrics:** Heart rate, Pace, Cadence, Volume.
- **Current Exercise Display:** Target motion and focal cues.
- **Set Tracker Card:** Inputs and set progression.
- **CIA Feedback:** Rotating real-time coaching text.

**ASCII Wireframe (Active Mode - 390x844)**
```text
[0,0] ─────────────────────────────────────────── [390,0]
  ╭─ TopBar (Transparent over atmosphere) ──────────╮
  │ ‹ Exit    Exercise 2 of 5  · 12:04    [⏸] [✕]   │
  ╰──────────────────────────────────────────────────╯
  
  ╭─ MomentumBar (SolidCard) ───────────────────────╮
  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━_______  60%       │
  ╰──────────────────────────────────────────────────╯

  ╭─ KPIRow (SolidCard) ────────────╮ ╭─ Live HR ───╮
  │ 135 BPM           8:30 /mi      │ │   SolidCard │
  │ via WHOOP         via Apple Watch│ ╰─────────────╯
  ╰──────────────────────────────────╯

  ╭─ GlassCard (hero) ──────────────────────────────╮
  │ ┊ BACK SQUAT                         Fitness Tag┊ │
  │ ┊ Set 3 of 5                                    │ │
  │ ┊                                              │ │
  │ ┊ WEIGHT (lbs)        REPS                     │ │
  │ ┊ [  185  ]           [  8  ]                  │ │
  │ ┊ Last set: 185 × 8                            │ │
  │ ┊                                              │ │
  │ ┊ ╭──────────────────────────────────────────╮ │ │
  │ ┊ │           Complete set ✓                 │ │ │
  │ ┊ ╰──────────────────────────────────────────╯ │ │
  ╰──────────────────────────────────────────────────╯

  ╭─ RestTimer (glass-pill) ────────────────────────╮
  │  ◔  00:45 remaining              Skip rest  →    │
  ╰──────────────────────────────────────────────────╯

  ╭─ CIA Insight Card ──────────────────────────────╮
  │ ✦ Last set. Push *through*.                     │
  │   ─── Next Up: Romanian Deadlift ────            │
  ╰──────────────────────────────────────────────────╯
[0,844] ───────────────────────────────────────── [390,844]
```

### 5. Components
- **TopBar:** Transparent over atmosphere.
- **MomentumBar:** (Catalog) Used for cumulative set completion.
- **KPIRow:** (Catalog) Data-dense surface for live metrics.
- **GlassStatCard:** (Catalog) Used for live heart rate.
- **NEW: ActiveExerciseCard:** A variant of `GlassCard` optimized for active input. Merges the exercise title, manual inputs (`GlassPillInput`), and the `BtnPrimary` into one cohesive hero component.
- **NEW: RestTimerSheet:** A `glass-pill` or bottom `Sheet` variant that anchors to the safe area. Visually constrained ring progress for rest duration.
- **CIAInsightCard:** (Catalog) Purple-tinted glass for real-time notes.
- **ProgressRing:** (Catalog) Used in Summary mode for effort/XP rings.

### 6. Visual treatment
- **Glass tiers:** Solid `--surface-2` cards are used for dense data (Heart Rate, KPI tiles) to guarantee legibility during physical movement. `GlassCard` is reserved strictly for the Active Exercise hero to focus the eye. CIA feedback uses a purple-tinted `.glass-card`.
- **Semantic inner-glows (one per card, meaning-driven):**
  - **ActiveExerciseCard:** `--glow-you` (Burnt Orange). Signifies the user's active input and current effort locus.
  - **CIAInsightCard:** `--glow-cia` (Royal Purple). Signifies AI-generated predictive insight and coaching presence.
  - **Summary Effort Ring:** `--glow-done` (Forest Green). Signifies completion and achieved growth at the end of the session.
- **Background atmosphere:** The mandatory warm radial gradient top-center is applied. During the "Active" phase, the purple CIA pool subtly deepens to visually reinforce the AI's live monitoring.
- **The one hero type moment:** In the Active Card, the Exercise Name (e.g., "Back squat") is set in Display 34px NM Medium, anchoring the user's focus.

### 7. Content & copy
CIA voice: sentence case, no exclamations, honest and direct. Emphasis is strictly applied via Tiempos Medium _italic_ for one word per moment.

- **TopBar:** Exercise 2 of 5 · 12:04 elapsed
- **Momentum label:** Session progress
- **Active Card Title:** Back squat
- **Active Inputs:** Weight, Reps
- **Active Reference:** Last set: 185 × 8
- **CTA:** Complete set
- **Rest Timer:** 00:45 remaining · Skip rest
- **CIA Active Note:** Last set. Push _through_.
- **CIA Summary Note:** Solid session. Your volume is up 12% from last _week_.
- **CIA Cold-Start Note:** Your first workout. No pressure — just _show_ up and move.

### 8. Data & honesty states
Every metric ships three states: real (with provenance), low-confidence (muted), and honest-null. No fabricated numbers.

**1. Heart Rate (BPM)**
- **Real:** 135 BPM · ChipProvenance (`via WHOOP`)
- **Low-confidence:** 135 BPM · muted 64% · Caption (`estimated · low confidence`)
- **Honest-null:** `Connect a heart-rate sensor` · BtnGhost (`Connect device`). Card omitted from layout.

**2. Live Pace / Cadence**
- **Real:** 8:30 /mi · ChipProvenance (`via Apple Watch`)
- **Low-confidence:** 8:30 /mi · muted 64% · Caption (`estimated · low confidence`)
- **Honest-null:** `Sensor not available` · Tile displays `—`.

**3. Previous Set Reference**
- **Real:** Last set: 185 × 8 · ChipProvenance (`you logged`)
- **Low-confidence:** N/A (historical logs are absolute).
- **Honest-null:** `Enter weight and reps to log the set`.

**4. Post-Workout Effort Score (Summary)**
- **Real:** Effort 84 · ChipProvenance (`derived from HR + volume`)
- **Low-confidence:** Estimated 80 · muted 64% · Caption (`estimated · low confidence`)
- **Honest-null:** `Not enough data yet — complete one full session`.

### 9. All states
- **Default:** Planning state rendering a scrollable list of exercises via `SolidCard`.
- **Skeleton:** Depth-preserving shimmer blocks (`--surface-3` base) mapping the exercise cards and input geometries. Charts render axes only.
- **Empty:** `EmptyState` card for manual logging: `What did you do?` with a `BtnPrimary` to add an exercise.
- **Error:** Quiet failure `ErrorState`. If offline, the Complete Set button retains its shape but gains an orange outline with a Caption: `Couldn't save this set — you're offline. It will sync when you reconnect.`
- **Success:** Post-workout summary state; set completion flashes `--glow-done` (600ms).
- **Disabled:** Active inputs are disabled (40% opacity, no glow) until the user reaches that specific set in the sequence.

*(Correction from Brief)*: The brief stated the offline button should have a "red border". Red implies user error or critical system failure, violating the calm premium aesthetic. This was corrected to an orange outline (system alert) to maintain visual harmony while signaling a sync state.

### 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Feedback timing:** Set completion triggers a 150ms scale down (.98) and a 600ms `--glow-done` flash before auto-progressing.
- **Glow behavior:** The Active Card breathes (4s ease) to indicate the session timer is live. 
- **Haptics:** Medium haptic on set completion. Heavy haptic on workout finish.
- **Rest Timer:** Depletes counter-clockwise over 250ms ease-out. Flashes green upon reaching 0.
- **Accessibility:** `prefers-reduced-motion` instantly disables the breathing glow and jumps the rest timer and summary visualizations directly to their final static states.

### 11. Motivation-tier adaptation
- **Low:** Workouts shortened to 2-3 exercises. CIA copy maximally encouraging. Complex analytics (HR zones, pace) are hidden to reduce cognitive load. Focuses purely on showing up.
- **Medium (Default):** Standard routine length. Visible HR and basic stat tracking. CIA copy focuses on pacing and form.
- **High:** Unlocks live volume tracker (Σ Weight × Reps) in the KPI strip. Summary mode includes a comparative volume `TrendChart` against previous weeks. CIA copy references specific percentage deltas.

### 12. Accessibility
- **AA+ contrast:** All text on `--surface-2` and `.glass-card` uses `paper-100` (#FEFAF3) to guarantee AA+ against the warm dark base (#0A0A0F). 
- **44px targets:** The numeric inputs, while visually compact, sit inside `GlassPillInput` containers with a 52px minimum touch target. Pause and End workout controls meet 44px minimums.
- **Screen-reader labels:** Glyph-only controls (Pause, Stop, Skip Rest) have `accessibilityLabel` attributes (e.g., "Pause workout", "Skip rest period"). 

### 13. Premium checklist
1. **Connects:** Cross-domain CIA insights adapt to yesterday's cardio. (Pass)
2. **Honest:** Live metrics and effort scores have explicit low-confidence and honest-null states. (Pass)
3. **Premium:** Selective glass usage, semantic glow, and Tiempos italic moments. (Pass)
4. **Dark only:** Base `--bg-base` used effectively. (Pass)
5. **One glow per card:** Active (Orange), CIA (Purple), Summary (Green). (Pass)
6. **60/30/10 color rule:** Orange (effort), Green (completion), Purple (CIA). (Pass)
7. **Selective glass:** Data dense regions (KPI strip) use `SolidCard`; hero input uses glass. (Pass)
8. **One hero type moment:** Exercise name in Display NM Medium. (Pass)
9. **Honesty invariant:** Provenance chips and null states explicitly designed. (Pass)
10. **All states:** Default, skeleton, empty, error, success, disabled defined. (Pass)
11. **Motion constraints:** 150-250ms feedback, physical easing, reduced-motion path defined. (Pass)
12. **Motivation tiers:** Low/Medium/High density variations established. (Pass)
13. **AA+ Contrast / 44px targets:** Verified. (Pass)
14. **CIA Voice:** Sentence case, no exclamation marks, max one Tiempos italic emphasis per moment. (Pass)
