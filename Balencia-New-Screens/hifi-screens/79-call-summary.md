# 79-call-summary - A+++ hi-fi mobile spec

## Header
- **Source ID:** 79
- **Source spec:** `Balencia-New-Screens/screens/79-call-summary.md`
- **Evidence:** screens/79-call-summary.md, work/briefs/79.md, work/drafts/79.md, Voice Call History [51], Voice Mode [11]
- **Route(s):** No live route; post-call summary detail opened from Voice mode and Voice call history.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Converts a completed CIA voice session into a durable, honest debrief - not a transcript dump.
- **Premium Visual Director:** make Call summary hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Call summary keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <            Call summary            (i)    |  TopBar - transparent, glyph = privacy
+---------------------------------------------+
|                                               |
|   Morning coaching call                      |
|                                               |
|            .-""""""""-.                     |
|          /              \                    |
|         |       72        |                  |  FrostCard(summary) - glow-cia
|         |      warm       |                  |  NEW: ToneGauge
|          \              /                    |
|            '-........-'                      |
|                                               |
|   Your *recovery* is clear for a tempo day   |  Display 34 - the one hero moment
+---------------------------------------------+
|  12m 04s    3 actions     15% shift         |  KPIRow - glow-done
|  auto-logged CIA-detected transcript parsed  |  ChipProvenance x3
+---------------------------------------------+
|  CALL COMPOSITION                            |
|  [::::::,,,,,,,] 12m total          |  SolidCard - glow-you
|  o recovery 5m  o pace 3m  o fueling 4m       |  ChipDomainTag: fitness/fitness/nutrition
+---------------------------------------------+
|   CIA insight                               |
|  Your *pacing* held because fueling          |  CIAInsightCard - glow-cia
|  happened early                              |
|  [fitness][nutrition]   via transcript  meal log
+---------------------------------------------+
|  KEY MOMENTS                                 |
|  o----------o----------o----------o          |  CallArcTimeline - glow-done
|  2m        5m         8m         10m          |  orange baseline, green milestone dots
+---------------------------------------------+
|  ACTION ITEMS                                |
|  [ ] Check resting HRV tomorrow              |  ListRow x3 - glow-you
|  [ ] Adjust pre-workout nutrition            |
|  [ ] Log wind-down time before 10pm          |
+---------------------------------------------+
|  TRANSCRIPT HIGHLIGHTS                       |
|  +---------------------------------------+   |
|  | CIA: let's lock in that pacing rule.   |   |  CIAChatBubble
|  +---------------------------------------+   |
+---------------------------------------------+
|                                               |
|         [ Schedule follow-up call ]          |  fixed bar - BtnSecondary
+---------------------------------------------+

Route handling: No live route; post-call summary detail opened from Voice mode and Voice call history.
```

## Focal Hierarchy
- **Dominant focal moment:** Call summary hero; it should be visually singular, not one tile among many.
- **Secondary layer:** Hero - FrostCard (variant with CIA only when the source supports a synthesized read.
- **Operational layer:** *Correction, KPIRow - three inline stats  sharing one SolidCard., *Added, TopBar.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*summary*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- `TopBar`
- `FrostCard` (variant: `summary`) - promoted from default `.glass-card`, see 4 correction.
- `NEW: ToneGauge` - single-value radial arc visualizing CIA's synthesized tone read. *Rationale:* neither `ReputationDial` (trust-score arc, orange, social-system semantics) nor `ProgressRing` (orange->green completion semantics) fits a CIA-synthesized emotional-tone read. `ToneGauge` borrows `ProgressRing`'s structural conventions (6-8px stroke, `rgba(255,255,255,.08)` track) but never flips green - tone is interpretive, not "done." Its low-confidence state reuses the existing `ConfidenceMeter` rather than inventing a second gauge.
- `KPIRow` (duration  action count  emotion shift)
- `ChipProvenance` x3 (one per KPIRow stat)
- `SolidCard` (call composition)
- `ProgressBar` (variant: `segmented`)
- `ChipDomainTag` x3 (fitness, fitness, nutrition - labels topic segments, per CANON 8 "never chrome" rule: tag color stays on the label/dot, not the bar fill)
- `CIAInsightCard` - added; evidenced by `ChipDomainTag` pair (fitness + nutrition) and `ChipProvenance` x2.
- `NEW: CallArcTimeline` - *Rationale:* the draft used `IntelligenceTimeline`, which the catalog defines as a **live** processing trace ("checking your sleep comparing to last month") that collapses once done - the wrong pattern for a static historical map of a *finished* call. `CallArcTimeline` instead applies CANON 7's chart grammar directly: solid orange baseline = elapsed real time (the "past/user" line), green 6px dots = milestones.
- `ListRow` x3 (action items)
- `CIAChatBubble` (transcript highlight)
- `BtnSecondary` (schedule follow-up, demoted, now correctly framed as a secondary exit - see 3)
- `Sheet` (triggered by `BtnSecondary`)

## Data Honesty
- Every metric renders through the 3-state honesty invariant.
- **Call duration**
- - *Real:* `12m 04s` (chip: `auto-logged`)
- - *Low-confidence / honest-null:* n/a - duration is deterministic, not inferred.
- **Emotion shift**
- - *Real:* ` 15%` (chip: `transcript parsed`)
- - *Low-confidence:* `~ 15%`, label `estimated  low confidence`
- - *Honest-null:* `Tone analysis preparing` (ghosted arc inside the KPIRow stat)
- **ToneGauge (hero)**
- - *Real:* `72` / `warm` + chip `vocal pacing analyzed`

## Consent and Safety
- Call summary keeps privacy-first language and SafetyResourceCard reachable for journal, mood, stress, sleep, energy, voice, and wellbeing-adjacent moments.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** fully rendered summary, all metrics parsed, action items actionable.
- **Skeleton (mid-generation):** depth-preserving. Hero shows a ghosted `ToneGauge` ring (track only). Composition bars use `SkeletonState` (`--surface-3`, 1.2s sweep). KPIs show `--surface-3` blocks. `CallArcTimeline` shows an empty baseline with no dots. `CIAInsightCard` is not shown during skeleton - it only appears once real, per its honest-null rule.
- **Partial:** duration, tone, and composition render normally once available. `CallArcTimeline` and transcript sections ghost with `Transcript is still processing`. `CIAInsightCard` stays hidden until the transcript-derived correlation resolves.
- **Error:** `CIA couldn't summarize this call - try again or review the transcript manually`. Charts default to ghost state; hero replaced with `BtnSecondary` `Retry`.
- **Offline:** cached summary renders normally. `OfflineBanner`: `offline - showing your last sync, 2h ago` (matches catalog's staleness-labeling format exactly). Schedule CTA disabled at 50% opacity with overlay copy: `connect to internet to schedule`.
- **Success:** `XPToast` on action-item completion - `+40 XP  Fitness` with `ChipDomainTag` fitness.
- *Correction: draft read "+40 XP  Tasks," but "Tasks" isn't one of the nine life domains - completing "check resting HRV" earns Fitness XP against that Domain Stat, per the RPG system's domain-scoped progression, not a generic bucket.*

## Motion
- **Motion intent (draw-first):** hero `ToneGauge` sweeps clockwise into position. Composition bars scale-X from left. KPIs count up via `tabular-nums`. `CIAInsightCard` fades/rises in after composition (it depends on the same transcript-derived data). `CallArcTimeline` path draws left-to-right, milestone dots pop in sequence. Action and transcript rows stagger in last, 24ms offset.
- *Correction: draft's motion spec said "topic arcs scale X from left" - composition is a `ProgressBar` (segmented), not an arc. Fixed to "topic bars."*
- **Easing:** physical ease-out for inbound elements. 150-250ms feedback for all taps.
- **Tap (ToneGauge):** expands a one-line explainer - `warm tone detected from vocal pacing`. Never frames a lower reading as failure.
- **Tap (topic segment):** deep-links to the anchored transcript section.
- **Tap (CIA insight):** expands to show the full correlated reasoning (both domain data points side by side).
- **Tap (privacy glyph):** opens `GlyphTooltip` - retention line + `Delete now` action, satisfying CANON 8's consent/revoke requirement.
- **Reduced-motion path:** draw-first animations swap to opacity-only fades; `ToneGauge` and `CallArcTimeline` set to final state instantly.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; post-call summary detail opened from Voice mode and Voice call history..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast pairs** (recalculated against the exact hexes cited above, not approximated):; - `paper-100` `#FEFAF3` over `--bg-warm` `#0C0603`  **19.3:1** (draft cited 18.2:1; recomputed against WCAG relative luminance).; - `paper-64%` (paper-100 at 64% alpha, blended over `--surface-2` `#211008`)  **7.7:1** (draft cited 11.4:1, which didn't account for the alpha blend against the actual card background - recomputed to reflect the real composited color; still clears the AAA 7:1 threshold for body text).
