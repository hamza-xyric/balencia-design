# 15-create-edit-goal - A+++ hi-fi mobile spec

## Header
- **Source ID:** 15
- **Source spec:** `Balencia-New-Screens/screens/15-create-edit-goal.md`
- **Evidence:** screens/15-create-edit-goal.md, work/briefs/15.md, work/drafts/15.md, Functional Content Brief: Create / Edit Mission
- **Route(s):** No live route; modal create or edit mission flow launched from Mission Board [13] or Mission Detail [14].
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Create/Edit Mission turns a plain-language intention into an editable mission plan.
- **Premium Visual Director:** make create-edit-goal command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** create-edit-goal uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|              ---                 x   |
| New mission                          |
| +----------------------------------+ |
| | What do you want to achieve?     | |
| | Run a half marathon by October   | |
| +----------------------------------+ |
| [ Let CIA plan this ]                |
| Save $5,000   Meditate daily   5K    |
+--------------------------------------+
| Part of: endurance chain             |
| prompt summary                      |
|  This looks like a main mission     |
| [daily] [weekly] [side] [main]       |
| Domains  [Fitness] [Nutrition]  +    |
| Actions                              |
|  Run 3x weekly                 x    |
|  Strength train 2x             x    |
| Milestones                           |
| 1  5K pace check       Aug 15        |
| Tracking signals                     |
| weekly distance  on  o               |
| Strictness  lenient [balanced] strict|
| Mission preview  ~420 XP            |
| [ Create mission ]                   |
+--------------------------------------+

Route handling: No live route; modal create or edit mission flow launched from Mission Board [13] or Mission Detail [14].
```

## Focal Hierarchy
- **Dominant focal moment:** create-edit-goal command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Modal grabber, close glyph, title. with CIA only when the source supports a synthesized read.
- **Operational layer:** Large natural-language input., Let CIA plan this button., Example chips., Structured result state:.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*goal*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **Sheet** full-height modal with grabber and 44px close target.
- **GlassPillInput** multiline for the natural-language prompt.
- **BtnCoach** for "Let CIA plan this" because CIA initiates the structuring.
- **ChoiceCardFrost** or compact chips for examples.
- **SegmentedTabs** for mission type, strictness, and difficulty.
- **ChipDomainTag** for domains.
- **ListRow** with drag handle for actions and milestones.
- **Toggle** for tracking signals.
- **CIAInsightCard** for type reasoning and connections.
- **ProgressRing, ProgressBar, KPIRow** inside the mission preview.
- **ChipProvenance, ConfidenceMeter, HonestNullState, SkeletonState, ErrorState, BtnPrimary, BtnGhost, BtnSuccess** for data and states.

## Data Honesty
- **Natural-language prompt:** real = user text; low-confidence not applicable because direct input; honest-null = empty input with disabled CTA.
- **Mission type:** real = CIA suggestion plus ChipProvenance "via prompt"; low-confidence = muted suggestion with ConfidenceMeter; honest-null = user selects manually.
- **Domain tags:** real = detected domains with provenance "via prompt"; low-confidence = suggested domains dimmed until confirmed; honest-null = "Add a domain to keep this organized."
- **Actions and milestones:** real = generated rows the user can edit; low-confidence = draft badge "CIA draft"; honest-null = "Add at least one action."
- **Estimated XP:** real = rule-based estimate from difficulty and scope; low-confidence = "~420 XP" with "estimated  low confidence" while action count is still changing; honest-null = "XP estimate appears after actions."
- **Connections:** real = cited relationship, such as Fitness plus Nutrition; low-confidence = dimmed with "possible connection"; honest-null = module omitted.

## Consent and Safety
- create-edit-goal uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** input mode with text area, examples, and disabled coach CTA until text exists.
- **Skeleton:** edit mode loads existing mission with skeleton rows matching actions, milestones, preview, and toggles.
- **Empty:** no prompt yet; examples are visible and no plan modules render.
- **Processing:** input shrinks, staged CIA captions run, result modules remain hidden until populated.
- **Error:** original text is preserved; ErrorState offers Try again and manual editing.
- **Success:** save CTA swaps to BtnSuccess, then sheet dismisses to the correct destination.
- **Disabled:** save/create CTA remains at 40% opacity until title, one action, and at least one domain are valid.
- **Offline:** editing remains possible, but save is blocked with explicit copy.

## Motion
- Drag down beyond threshold or tap close to dismiss. Tap prompt summary to reopen text. Drag handles reorder actions and milestones. Chips remove on tap. Toggles slide with haptic feedback.
- Input to processing shrinks over 280ms. Result sections stagger in from type reasoning to preview. Mission preview ring draws first, XP counts up second.
- Save success uses a 200ms glow-done swap and success haptic.
- **Reduced-motion path:** processing captions still update as text, but section staggers, ring draws, and count-ups jump to final states.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; modal create or edit mission flow launched from Mission Board [13] or Mission Detail [14]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Close, drag handles, chips, toggles, and CTAs have 44px targets.; Text inputs have explicit labels, not placeholder-only names.; Drag reorder has move up/down alternatives.
