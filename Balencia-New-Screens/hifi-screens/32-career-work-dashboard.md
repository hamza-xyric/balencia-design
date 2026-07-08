# 32-career-work-dashboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 32
- **Source spec:** `Balencia-New-Screens/screens/32-career-work-dashboard.md`
- **Evidence:** screens/32-career-work-dashboard.md, work/briefs/32.md, work/drafts/32.md, Functional Content Brief: Career & Work Dashboard
- **Route(s):** `/career`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A centralized, action-oriented hub for professional growth.
- **Premium Visual Director:** make Career & Work Dashboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Career & Work Dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------+ --10|
      |  <    career & work         [Lvl 5] |   0 |
      +-------------------------------------+
      +-------------------------------------+
      | o  Productivity peaks after         |
      |    morning workouts. Schedule       |
      |    deep work for 10am?              |
      +-------------------------------------+
      +- ACTIVE MISSIONS -------------------+
      | +-----------------------------------+   |
      | |  Get promoted to senior          |   |
      | |   Next: refresh portfolio         |   |
      | +-----------------------------------+   |
      | +---------------+ +---------------+     |
      | | o Learn Python| o Reach mentor  |     |
      | +---------------+ +---------------+     |
      +------------------------------------+
      +- TODAY'S ACTIONS -------------------+
      | [x] Review quarterly goals    +10 XP|
      | ------------------------------------|
      | [ ] Read 1 chapter of 'Deep W' +15XP|
      +-------------------------------------+
      +- GROWTH TRAJECTORY -----------------+
      | Communication        8 / 10         |
      | ####################                |
      | System Design        6 / 10         |
      | ####################                |
      |                                      |
      |   .-.                            |
      |                (Projected)      |
      | o     o--o         (Milestones)     |
      +-------------------------------------+
      +- UPCOMING --------------------------+
      | | 26 DAYS     | | 2 DAYS          | |
      | | Review      | | Project deadline| |
      +-------------------------------------+
      +- HIGH MOTIVATION -------------------+
      | [Blur] Consistency Heatmap    []  |
      +-------------------------------------+

      +-------------------------------------+
      |           o       o       o        |
      +-------------------------------------+

Route handling: `/career`
```

## Focal Hierarchy
- **Dominant focal moment:** Career & Work Dashboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA Coaching Preamble, Lead Mission, Secondary Missions, Suggested Actions.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*dashboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Transparent over atmosphere.
- **GlassCard:** Used for the CIA Coaching preamble (`CIAInsightCard` variant).
- **BentoGrid:** Layout for Active Missions and Upcoming Deadlines.
- **GlassStatCard:** Core component for Lead Mission, Secondary Missions, and Deadlines.
- **ProgressRing:** 96px hero gauge for Lead Mission; 48px compact gauges for Secondary Missions.
- **ListRow:** Actionable rows for Today's Actions.
- **Toggle:** Used as the inline checkbox for Today's Actions.
- **SolidCard:** Containers for Actions, Skills, and TrendChart to ensure data legibility.
- **TrendChart:** Workhouse 6-week momentum visualizer.
- **PaywallLock:** Blurred preview gate for the Action Consistency Heatmap.
- **GlassNavBar:** Floating bottom pill.
- **NEW: SkillStatBar:** Horizontal track displaying a 1-10 metric against a target. *Rationale: Standard ProgressBars are percentage-based; this domain metric needs a defined start/end value (0-10) with a specific target marker.*
- **NEW: DeadlineTile:** A date-specific KPI stat block. *Rationale: KPIRow is too horizontally dense for the required day-countdowns and status labels; this provides better visual hierarchy on a 390px mobile screen.*

## Data Honesty
- Every metric ships with three distinct states to enforce the honesty invariant.
- **Lead Mission Progress (Real):** 64%. Chip: `via Goals API`.
- - *Low-confidence:* 64% muted + `estimated  low confidence`.
- - *Honest-null:* "Not enough data yet - add your next steps."
- **Skill Level (Real):** 8. Target 10. Chip: `you logged`.
- - *Low-confidence:* 8 muted + `estimated  low confidence`.
- - *Honest-null:* "Not enough data yet - rate your current skills."
- **6-Week Momentum (Real):** +14 pts. Chip: `derived (CIA engine)`.
- - *Low-confidence:* +14 pts muted + `calibrating - building your trend`.
- - *Honest-null:* "Not enough data yet - 3 more weeks." (Flat baseline drawn on chart).

## Consent and Safety
- Career & Work Dashboard uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/career`. Do not add alternate vanity routes.

## States
- **Default:** Rich, populated dashboard as defined in the wireframe.
- **Skeleton:** Depth-preserving arcs for progress rings, block tracks for skill bars, and axis lines for the trend chart. Copy above: "CIA is preparing your career actions - one moment."
- **Cold-start / Day-1:** Ghosted dashed rings (no fake 0% disc), ghosted skill bars, flat momentum line. Action list replaced with `EmptyState`: "Add a career *mission*." + BtnPrimary "Create goal".
- **Established Zero-State (All Done):** `EmptyState` with a green checkmark glyph. Copy: "All caught up. CIA will suggest new actions tomorrow."
- **Error / Partial Failure:** `OfflineBanner` at top: "You're offline - showing your last sync." Action checkbox fails: flashes orange outline and reverts to unchecked. Error `SolidCard` copy: "Could not load goals - pull to refresh."
- **Success:** Action checkbox fills orange, text strikes through, `XPToast` drops down: "+15 XP  Career".
- **Disabled:** Past-due goal "Skip" button renders at 40% opacity, unclickable, replaced by "reschedule?" text.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Physical easing:** All entrance and feedback animations use spring physics (250ms), never linear.
- **Feedback loop:** Tapping an action checkbox scales to .98 and fires `BtnSuccess` green sweep over the checkbox before locking.
- **Glow behavior:** The `glow-you` on the Lead Mission breathes (4s ease-in-out). The `glow-cia` on the coaching note pulses subtly.
- **Haptics:** Light impact tap on action completion. Medium impact on level-up or goal completion.
- **Gestures:** Swipe-left on Action Card to reveal orange "Skip" layer. Swipe right on TrendChart to scrub crosshair. Edge-swipe to go back.
- **Choreography:** Hero 96px gauge draws first (arc sweep + count up), followed by secondary gauges, rising skill bars, and finally the TrendChart line drawing left-to-right.
- **Reduced-motion path:** All gauges, bars, and charts instantly snap to their final static values. Glows become static.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/career`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** Paper-100 (#FEFAF3) on --surface-2 (#211008) ensures text legibility far exceeds WCAG AA.; **Colorblind safety:** No red/green color reliance for status. Deadlines use glyphs ("!" for soon, strikethrough for past-due) and explicit text ("approaching", "passed").; **Targets:** All interactive elements (checkboxes, goal gauges, skill bars, nav tabs) meet the 44x44px minimum touch target. Inline action checkboxes have 44px invisible padding bounding boxes.
