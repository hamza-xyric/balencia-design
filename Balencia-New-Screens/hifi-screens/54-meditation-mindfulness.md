# 54-meditation-mindfulness - A+++ hi-fi mobile spec

## Header
- **Source ID:** 54
- **Source spec:** `Balencia-New-Screens/screens/54-meditation-mindfulness.md`
- **Evidence:** screens/54-meditation-mindfulness.md, work/briefs/54.md, work/drafts/54.md, Functional Content Brief 54, Balencia Glass Canon v1, Component Catalog v1
- **Route(s):** No live app route; source-only mindfulness surface.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Serves as the mental wellbeing practice hub, answering "what should I do right now, and how consistent have I been?" It pairs a browsable mindfulness library with a distraction-free active session and post-session feedback that helps CIA recommend calmer next steps.
- **Premium Visual Director:** make Meditation & mindfulness map the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Meditation & mindfulness keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
|  <  Meditation                    Mental 4  |
|                                             |
|  +---------------------------------------+  |
|  | CIA                                   |  |
|  | Your stress is elevated. A 5-minute   |  |
|  | body scan can shift your *baseline*.  |  |
|  | [ ask CIA ]                           |  |
|  +---------------------------------------+  |
|                                             |
|  [ all ] [ meditation ] [ quick ] [ move ]  |
|                                             |
|  Practices                                  |
|  +---------------------------------------+  |
|  | Body scan meditation        10 min     |  |
|  | Reduces tension     before sleep       |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | Deep breathing              3 min      |  |
|  | Anchors focus          anytime         |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | mindfulness streak                     |  |
|  | O O O O O O O    12 days              |  |
|  | # # # # # # #    last 4 weeks         |  |
|  +---------------------------------------+  |
|                                             |
|  +---------+ +----------+ +-------------+   |
|  |24 sess. | |145 min.  | | longest 12  |   |
|  +---------+ +----------+ +-------------+   |
|                         (+)                 |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+

Route handling: No live app route; source-only mindfulness surface.
```

## Focal Hierarchy
- **Dominant focal moment:** Meditation & mindfulness map; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, CIA Insight Area, Filter Strip, Practices List.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*mindfulness*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - transparent over atmosphere, glass-pill backing on scroll.
- **CIAInsightCard** - purple-tinted glass recommendation with evidence chips.
- **SegmentedTabs** - scroll-chip variant for practice filters.
- **NEW: PracticeListCard** - solid vertical row with leading icon, trailing duration, benefit copy, and context chip.
- **StreakCard** - seven-day strip plus heatmap.
- **KPIRow** - shared solid metric row.
- **ChipProvenance** - appears beside practice minutes, streak, and recommendation confidence.
- **TrendChart** - sparkline for high-motivation practice minutes.
- **ProgressRing** - active-session timer.
- **VoiceMicGlow** - repurposed as a breathing visual inside the active session.
- **Sheet** - full variant for the session, half variant for feedback.
- **PaywallLock** - advanced recommendation and rating insight gate.
- **FABQuickLog** and **GlassNavBar** - floating controls.

## Data Honesty
- **Practice minutes**
- - **Real:** Orange sparkline with ChipProvenance `app log`.
- - **Low-confidence:** Dashed tail with ChipProvenance `estimated - low confidence`.
- - **Honest-null:** Empty chart frame with `Not enough data yet - 3 more days for a trend.`
- **Current streak**
- - **Real:** `12 day streak` with heatmap blocks and ChipProvenance `app log`.
- - **Low-confidence:** Not estimated because streaks are exact local counts.
- - **Honest-null:** `0 days` with muted dots and first-session CTA.
- **Consistency heatmap**
- - **Real:** Filled intensity squares from completed sessions.

## Consent and Safety
- Meditation & mindfulness keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Library list, CIA recommendation, streak card, and KPI row render with real or honest-null values.
- **Skeleton:** Practice rows, heatmap, KPI row, and CIA card use geometry-matched shimmer without fake values.
- **Empty:** Library remains populated. CIA card recommends the 3-minute breathing exercise and heatmap stays honest-null.
- **Error:** Practice list gets an `ErrorState` with retry; cached practices remain tappable when safe.
- **Active session:** Full sheet slides up with breathing visual, `ProgressRing`, pause control, and duration selector.
- **Post-session:** Half sheet asks for rating and note, then saves feedback into the practice history.
- **Success:** `Done` triggers a 250ms green flash, updates streak/KPI values, and dismisses the sheet.
- **Disabled:** Premium-only feedback analysis and advanced CIA recommendations blur with `PaywallLock`.

## Motion
- **Load:** CIA card fades in first, then practice rows cascade at 60ms intervals.
- **Practice tap:** Row scales to .98 for 150ms and opens the full session sheet.
- **Session loop:** Breathing visual scales continuously on an 8s loop while the progress ring sweeps.
- **Feedback:** Rating circles fill left-to-right; saving emits one light haptic.
- **Gestures:** Edge swipe returns to the source screen; double tap in the session toggles pause.
- **Reduced-motion:** Breathing loop freezes, sheets crossfade, and heatmap/sparkline render at final state.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live app route; source-only mindfulness surface..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on `--bg-base` and `--surface-2` exceeds AA+; purple CIA text never carries meaning by color alone.; **Targets:** Filters, practice rows, session controls, and rating options meet 44px minimum touch targets.; **Screen-reader labels:** Breathing visual is decorative; the session container announces remaining time and current phase.
