# 03d-complete-profile - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03d
- **Source spec:** `Balencia-New-Screens/screens/03d-complete-profile.md`
- **Evidence:** screens/03d-complete-profile.md, work/briefs/03d.md, work/drafts/03d.md, work/briefs/03d.md, Balencia canon, component catalog.
- **Route(s):** No live route; social-auth data-gap step inside the pre-auth onboarding stack.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Fills the few profile fields that Google or Apple did not return, mainly date of birth and gender, so later health coaching can use age-appropriate and member-declared context.
- **Premium Visual Director:** make Complete profile command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Complete profile keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; social-auth data-gap step inside the pre-auth onboarding stack..
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| 9:41                                  |
|                 Balencia              |
|                                      |
|        A few more *details*           |
|  These help CIA personalize safely.   |
|                                      |
| +----------------------------------+ |
| | CIA will use these only for       | |
| | age-aware and profile-aware care. | |
| | [profile data  you entered]      | |
| +----------------------------------+ |
| [ date of birth                 > ]  |
| [ gender                        > ]  |
| [ first name ] [ last name ]         |
| readiness [#####-----] 1 of 2        |
|                                      |
| [ save details ]                     |
| skip for now                         |
+--------------------------------------+

Route handling: No live route; social-auth data-gap step inside the pre-auth onboarding stack.
```

## Focal Hierarchy
- **Dominant focal moment:** Complete profile command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Status bar over warm atmosphere. with CIA only when the source supports a synthesized read.
- **Operational layer:** Centered Balencia mark, quiet and card-free., Heading and short explanatory line., Form group, Readiness ProgressBar..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*profile*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - omitted by design; no back control is available.
- **GlassPillInput** - name fields and read-only picker rows.
- **Sheet** - DOB native picker and gender selector.
- **CIAInsightCard** - compact note only, using evidence copy rather than a recommendation.
- **ProgressBar** - readiness count for DOB and gender.
- **ChipProvenance** - "you entered" and "from Google/Apple" labels.
- **ConsentCard** - profile data control sheet from the CIA note.
- **OfflineBanner, SkeletonState, ErrorState, HonestNullState** - state components.

## Data Honesty
- **DOB:** real = user-selected date plus `ChipProvenance` "you entered"; low-confidence is not applicable to a direct selection; honest-null = "not provided yet."
- **Gender:** real = selected option; low-confidence is not applicable; honest-null = "prefer not to say" or skipped state, never guessed from provider data.
- **Names:** real = OAuth value with provider chip or typed value with "you entered"; low-confidence = provider value missing confidence from callback, shown editable; honest-null = blank optional fields.
- **Profile controls:** Data category = profile; source = user/OAuth provider; scope = personalization and account identity; retention = until account deletion or field removal; export, revoke provider link, and delete profile fields are available from Settings.

## Consent and Safety
- Complete profile keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; social-auth data-gap step inside the pre-auth onboarding stack..
- Complete profile exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** empty missing fields, save enabled, skip visible.
- **Skeleton:** only provider-prefilled fields shimmer while callback payload resolves; no placeholder values.
- **Empty:** all optional fields missing, readiness at zero, skip remains valid.
- **Error:** inline validation for DOB/field format; network and server failures use ErrorState with retry.
- **Success:** CTA flashes `--glow-done`, values save, then stack pushes to [03c].
- **Disabled:** fields drop to 40 percent only while save is in flight or picker sheet is resolving.
- **Offline:** values stay editable locally; save action explains that connection is needed.

## Motion
- **Entry:** mark, heading, note, and fields fade up in 200ms steps.
- **Pickers:** DOB and gender open as sheets; swipe down dismisses without changing values.
- **Validation:** underage copy appears inline without alarm color.
- **Save:** CTA scales to .98, spinner locks width, success glow precedes navigation.
- **Reduced-motion:** entry, sheet, progress, and success glow use opacity-only or instant state changes.

## Image Slots
- `HIFI-03d-01` - avatar or message attachment slot; screen-specific; premium warm-dark product placeholder. Prompt: Complete profile avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; social-auth data-gap step inside the pre-auth onboarding stack..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on warm dark and glass surfaces clears AA+.; **Targets:** fields, picker rows, CTA, and skip link meet 44px minimum targets.; **Screen readers:** each field announces current value, optional status, and source.
