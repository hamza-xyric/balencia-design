# 85-obstacle-coach - A+++ hi-fi mobile spec

## Header
- **Source ID:** 85
- **Source spec:** `Balencia-New-Screens/screens/85-obstacle-coach.md`
- **Evidence:** screens/85-obstacle-coach.md, app_design 3/85-obstacle-coach.md plus ascii_wireframes/85-obstacle-coach.md
- **Route(s):** `/obstacles/[id]`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Obstacle coach helps a member diagnose why a mission is slipping, identify root cause patterns, and start a non-shaming coach plan.
- **Premium Visual Director:** make Obstacle coach hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Obstacle coach lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Obstacle coach                 ...|
+--------------------------------------+
| +----------------------------------+ |
| | Obstacle diagnosis              | |
| | CIA found the root cause behind | |
| | missed workouts: late meetings. | |
| | 3 blockers | coach plan ready   | |
| +----------------------------------+ |
| DETECTED BLOCKERS                    |
| +----------------------------------+ |
| | time  Late meetings moved runs  | |
| | evidence: 3 missed after 7 PM   | |
| | next step: try Tuesday 6 AM     | |
| +----------------------------------+ |
| +----------------------------------+ |
| | food  Protein target dipped     | |
| | next step: prepped lunch        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA next best timing            | |
| | Monday 8:10 AM has best odds    | |
| +----------------------------------+ |
| [Start reconnection]                 |
+--------------------------------------+

Route handling: `/obstacles/[id]`
```

## Focal Hierarchy
- **Dominant focal moment:** Obstacle coach hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back, title, and plan history overflow. with CIA only when the source supports a synthesized read.
- **Operational layer:** Fixed bottom action to start reconnection, review, or retry., ASCII wireframe :, H1, Hero title.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*coach*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back, title, and plan history.
- **GlassCard** - obstacle diagnosis hero.
- **CIAInsightCard** - root cause explanation and next-best timing.
- **ChoiceCardFrost** - blocker choice/accept/dismiss states.
- **SolidCard** - blocker evidence rows.
- **ProgressBar** - reconnection plan progress after acceptance.
- **SafetyResourceCard** - crisis or harm support when wellbeing signals require it.
- **ChipProvenance** - missed check-ins, calendar conflicts, nutrition logs, schedule confidence.
- **Sheet** - blocker detail, edit plan, schedule picker, safety support.
- **BtnPrimary / BtnSecondary / BtnGhost** - start reconnection, review blockers, dismiss.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Root cause:** real = repeated pattern with evidence provenance; low-confidence = one or two weak signals; honest-null = no root cause named.
- **Blocker evidence:** real = missed action count, calendar, nutrition, or budget record; low-confidence = stale or partial source; honest-null = no evidence row.
- **Next step:** real = specific action tied to evidence; low-confidence = suggestion marked tentative; honest-null = ask user to choose manually.
- **Timing recommendation:** real = schedule follow-through history; low-confidence = fewer than three comparable actions; honest-null = no timing claim.
- **Coach plan:** real = generated plan with accepted steps; low-confidence = pending user review; honest-null = no plan created.

## Consent and Safety
- Obstacle coach lets every CIA evidence chip explain why the source was used, mark low-confidence synthesis, and delete recommendation history.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/obstacles/[id]`. Do not add alternate vanity routes.

## States
- **Default:** diagnosis hero, blockers, CIA timing, provenance, and start action render.
- **Skeleton:** hero and blocker rows preserve geometry; no fake root cause appears.
- **Empty:** HonestNullState says no recurring blockers found and offers review mission rhythm.
- **Error:** diagnosis remains; failed coach plan changes CTA to Try again and keeps review path.
- **Success:** accepted blocker or plan step shows `--glow-done`, updates plan progress, and routes when complete.
- **Disabled:** start/review/schedule dims to 40% with reason when insufficient data, consent missing, offline, or safety escalation blocks plan generation.

## Motion
- **Load:** hero fades first, blocker rows stagger 70ms, timing card follows.
- **Blockers:** accept/dismiss are explicit buttons; dismissed row slides with undo toast.
- **Plan:** start opens step editor before confirmation; success routes after check animation.
- **Safety:** if crisis language or harm signal appears, SafetyResourceCard opens before coach plan.
- **Reduced-motion:** disables row stagger, progress sweep, and glow breathing.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/obstacles/[id]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text and chips clear AA+ on dark and solid surfaces.; **Targets:** blocker rows, accept/dismiss, schedule, start, and safety links are 44px minimum.; **Screen readers:** hero announces diagnosis status, root cause confidence, blocker count, and next step.
