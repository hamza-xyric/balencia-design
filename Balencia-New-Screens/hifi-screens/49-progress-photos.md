# 49-progress-photos - A+++ hi-fi mobile spec

## Header
- **Source ID:** 49
- **Source spec:** `Balencia-New-Screens/screens/49-progress-photos.md`
- **Evidence:** screens/49-progress-photos.md, work/briefs/49.md, work/drafts/49.md, Balencia Glass Redesign Plan plus progress photo draft
- **Route(s):** No live route; progress photos are a private module inside Progress measurements, Fitness, and Today surfaces.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Progress photos give the user a private, consent-led view of physical change over time.
- **Premium Visual Director:** make Progress photos timeline the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Progress photos names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Progress photos                  [Lv.12] |
|                                             |
| +-----------------------------------------+ |
| | photos stay private      manage privacy | |
| | encrypted storage and AI analysis are   | |
| | separate choices                         | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | Weight changed alongside better *sleep*.| |
| | [sleep] [training] [you logged]         | |
| +-----------------------------------------+ |
|                                             |
| WEIGHT TREND              [1M][3M][6M][1Y] |
| +-----------------------------------------+ |
| | 72.0 kg      target 70 kg               | |
| | orange history line, dashed projection  | |
| | via wearable + you logged               | |
| +-----------------------------------------+ |
|                                             |
| +------------+ +---------+ +-------------+ |
| | weight     | | BMI     | | body fat    | |
| | 72.0 kg    | | 22.1    | | est. 18%    | |
| +------------+ +---------+ +-------------+ |
|                                             |
| MEASUREMENTS                        see all |
| +-----------------------------------------+ |
| | waist 82.0 cm        you logged         | |
| | arms 35.5 cm         you logged         | |
| +-----------------------------------------+ |
|                                             |
| PROGRESS PHOTOS                     compare |
| +-----------------------------------------+ |
| | o Oct 12  encrypted  analysis ready     | |
| | | Sep 15  encrypted  low confidence     | |
| | o Aug 18  hidden by user                | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | export photos   delete set   analysis off|
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+

Route handling: No live route; progress photos are a private module inside Progress measurements, Fitness, and Today surfaces.
```

## Focal Hierarchy
- **Dominant focal moment:** Progress photos timeline; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Consent banner, CIA coaching note, Weight trend, Current stats row.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*photos*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Transparent over atmosphere; privacy overflow exposes export, hide, delete, and analysis choices.
- **ConsentCard:** GlassCard explaining encrypted storage, separate AI analysis opt-in, and revocation.
- **CIAInsightCard:** Purple glass note with evidence chips; hidden until the evidence threshold is met.
- **TrendChart:** SolidCard Living Line for weight and optional dashed projection.
- **SegmentedTabs:** Time-range selector.
- **KPIRow:** Weight, BMI, and body-fat estimate with provenance.
- **ListRow:** Measurements with values, deltas, last-updated text, and source chips.
- **NEW: PhotoTimelineTrack:** SolidCard vertical track linking encrypted photo checkpoints. Rationale: a chronological private-media journey needs a dedicated track with thumbnail, consent, and analysis states.
- **Sheet:** Compare sheet, log progress sheet, photo consent sheet, and delete confirmation sheet.
- **FABQuickLog:** Opens actions for log weight, take photo, and add measurements.
- **PaywallLock:** Applies only to opted-in AI analysis features, never to deletion or export.

## Data Honesty
- **Weight:** Real shows `72.0 kg` plus ChipProvenance `via wearable` or `you logged`; low-confidence shows the value muted with `estimated - low confidence`; honest-null shows "log your first weigh-in" without a fake line.
- **BMI:** Real shows `22.1` plus `calculated`; low-confidence is not used because it is either computable or missing; honest-null shows "add height".
- **Body-fat estimate:** Real shows estimate plus `via photo AI`; low-confidence shows muted estimate and sample warning; honest-null shows "Take at least two consented photos for analysis."
- **Measurements:** Real values use `you logged`; low-confidence is not used for direct manual entries; honest-null keeps rows collapsed until a measurement exists.
- **Photo analysis:** Real appears only after explicit opt-in and successful processing; low-confidence labels small or inconsistent photo sets; honest-null hides analysis claims and leaves encrypted thumbnails available.
- **Privacy controls:** Export, hide, delete, revoke analysis, and delete all photo data are always available to the account owner, including free-tier users.

## Consent and Safety
- Progress photos names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Progress photos treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Consent accepted, trend populated, timeline shows encrypted photo checkpoints, compare enabled when at least two visible photos exist.
- **Skeleton:** Geometry-matched shimmer for chart, metrics, and timeline; no placeholder bodies or fake thumbnails.
- **Empty:** Consent card, first-photo prompt, ghost trend axis, and no CIA note until evidence exists.
- **Error:** Failed media, failed trend, and failed upload degrade per card while cached safe content remains visible.
- **Success:** Save actions flash green and update the exact row or photo checkpoint.
- **Disabled:** Compare disabled until two visible photos exist; AI analysis disabled when consent is off, offline, or entitlement does not allow it.
- **Privacy-revoked:** Existing AI labels are removed from the timeline immediately; encrypted original photos remain until the user deletes or exports them.

## Motion
- **Chart scrubbing:** Long-press opens a crosshair tooltip with date, value, and source.
- **Comparison slider:** Drag handle reveals before/after images in the private sheet; handle has haptic ticks at 25%, 50%, and 75%.
- **Timeline draw:** Vertical PhotoTimelineTrack draws top-to-bottom over 600ms; reduced-motion renders instantly.
- **Consent controls:** Revoking analysis opens a confirmation sheet with plain-language effects before applying.
- **FAB behavior:** FAB hides on scroll-down and returns on scroll-up; reduced-motion keeps it fixed.
- **Deletion safety:** Delete photo set requires a confirmation sheet that names the number of photos and analysis records affected.

## Image Slots
- `HIFI-49-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Progress photos privacy-safe photo placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; progress photos are a private module inside Progress measurements, Fitness, and Today surfaces..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on warm dark and SolidCard surfaces meets AA+; thumbnails never carry information without labels.; **Targets:** Back, overflow, FAB, compare, reveal, export, delete, and timeline rows all maintain 44px hit areas.; **Screen readers:** Photo rows announce date, visibility, encryption state, and analysis confidence before any body estimate.
