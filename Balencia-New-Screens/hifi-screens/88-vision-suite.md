# 88-vision-suite - A+++ hi-fi mobile spec

## Header
- **Source ID:** 88
- **Source spec:** `Balencia-New-Screens/screens/88-vision-suite.md`
- **Evidence:** screens/88-vision-suite.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/wellbeing/vision`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Vision suite is a wellbeing utility for non-diagnostic eye check-ins: color/acuity-style eye test tasks, eye exercises, screen-strain journaling, and clear medical disclaimer copy.
- **Premium Visual Director:** make Vision suite hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Vision suite names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Vision suite            bell info |
+--------------------------------------+
| +----------------------------------+ |
| | Eye care today                  | |
| | Exercise: 2 min remaining       | |
| | Last eye test: non-diagnostic   | |
| | via wellbeing log               | |
| +----------------------------------+ |
| [Eye test] [Exercises] [Strain]      |
|                                      |
| +----------------------------------+ |
| | 20-20-20 reset                  | |
| | Look 20 feet away for 20 sec    | |
| | [Start eye exercise]            | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | TrendChart: strain notes        | |
| | Mon low | Tue medium | Wed low  | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | Not a diagnosis. Sudden vision  | |
| | changes need a clinician.       | |
| | [Find urgent guidance]          | |
| +----------------------------------+ |
+--------------------------------------+

Route handling: `/wellbeing/vision`
```

## Focal Hierarchy
- **Dominant focal moment:** Vision suite hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back, title, reminder, and disclaimer action. with CIA only when the source supports a synthesized read.
- **Operational layer:** Consent footer for screen/health data and delete log controls., H1, Hero caption, Eye test disclaimer.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*suite*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back, title, reminder, and disclaimer info.
- **GlassStatCard** - today's care status and last eye test result.
- **SegmentedTabs** - eye test, exercises, strain log, progress.
- **ProgressRing** - timer progress for eye exercises.
- **TrendChart** - strain and exercise cadence, never medical diagnosis.
- **SafetyResourceCard** - urgent symptoms, clinician guidance, and crisis-adjacent support.
- **ConsentCard** - screen-health log consent, revoke, and delete.
- **ChipProvenance** - wellbeing log, timer, manual note, and confidence labels.
- **BtnPrimary / BtnSecondary** - start exercise, begin eye test, log strain.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Eye test result:** real = completed task plus ChipProvenance; low-confidence = partial test or poor conditions; honest-null = no result and no score invented.
- **Exercise timer:** real = completed duration and timestamp; low-confidence = interrupted timer; honest-null = no exercise started.
- **Screen strain log:** real = manual rating plus source time; low-confidence = vague note; honest-null = no strain entry.
- **Progress trend:** real = TrendChart from logged data; low-confidence = fewer than three entries; honest-null = HonestNullState with start actions.
- **CIA recommendation:** real = at least two signals such as strain plus sleep/stress; low-confidence = one signal; honest-null = no cross-signal claim.

## Consent and Safety
- Vision suite names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Vision suite treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/wellbeing/vision`. Do not add alternate vanity routes.

## States
- **Default:** hero, tabs, selected tool, trend, disclaimer, and consent controls render.
- **Skeleton:** timer, tab, and chart blocks preserve geometry; no fake eye test score appears.
- **Empty:** HonestNullState offers exercise, eye test, or strain log without pressure.
- **Error:** failed tool keeps disclaimer and urgent guidance visible, then offers retry.
- **Success:** completed exercise shows green check, stored provenance, and optional reminder setup.
- **Disabled:** eye test or timer is 40% opacity with reason when motion setting, permissions, connectivity, or safety constraints block use.

## Motion
- **Load:** hero fades in; selected tab content rises 8px over 180ms.
- **Timer:** ProgressRing sweeps during exercise; reduced-motion shows elapsed time text without animated arc.
- **Tabs:** content crossfades in 160ms and never changes route.
- **Safety:** urgent guidance opens as an action Sheet with clear dismiss and call options.
- **Reduced-motion:** disables timer sweep, chart draw, and glow breathing.

## Image Slots
- `HIFI-88-01` - content proof or instructional media slot; screen-specific; privacy-safe, non-diagnostic, no identifiable person. Prompt: Vision suite eye-test and exercise visuals, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/wellbeing/vision`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text on `#0A0A0F` and `#211008` clears AA+.; **Targets:** tabs, timer controls, guidance links, and delete controls are at least 44px.; **Screen readers:** eye test tasks announce instructions, non-diagnostic status, and completion before result.
