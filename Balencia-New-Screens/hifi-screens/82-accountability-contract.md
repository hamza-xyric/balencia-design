# 82-accountability-contract - A+++ hi-fi mobile spec

## Header
- **Source ID:** 82
- **Source spec:** `Balencia-New-Screens/screens/82-accountability-contract.md`
- **Evidence:** screens/82-accountability-contract.md, app_design 3/82-accountability-contract.md plus ascii_wireframes/82-accountability-contract.md
- **Route(s):** `/contracts`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Accountability contract defines a shared commitment with partners or witnesses: what is being verified, what proof is visible, what stays private, when an update needs signature, and how the member can pause, resolve, or revoke sharing.
- **Premium Visual Director:** make Accountability contract hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Accountability contract uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Accountability contract       ... |
+--------------------------------------+
| +----------------------------------+ |
| | Active contract                 | |
| | Half marathon consistency       | |
| | 4 weeks left | 2 partners       | |
| | Signed | 2 checks due | consent | |
| +----------------------------------+ |
| VERIFICATION CHECKS  5 of 6          |
| [=========-----] 83%                 |
| +----------------------------------+ |
| | done  Morning run proof          | |
| | photo confirmed via check-in     | |
| +----------------------------------+ |
| | due   Weekly review              | |
| | due Sunday evening               | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Partners and witnesses           | |
| | Aisha can see proof status.      | |
| | Private journal notes stay off.  | |
| +----------------------------------+ |
| [Sign update]                        |
+--------------------------------------+

Route handling: `/contracts`
```

## Focal Hierarchy
- **Dominant focal moment:** Accountability contract hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back, title, and terms/history overflow. with CIA only when the source supports a synthesized read.
- **Operational layer:** Fixed bottom action for sign update or no update to sign., ASCII wireframe :, H1, Hero labels.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*contract*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back, terms/history overflow.
- **GlassCard** - active contract hero.
- **ProgressBar** - checks satisfied and contract progress.
- **SolidCard** - verification rows, terms, partner/witness privacy.
- **ConsentCard** - proof visibility, partner sharing, revoke/delete sharing.
- **ChipProvenance** - proof source, signature timestamp, partner confirmation.
- **Sheet** - sign confirmation, pause, resolve, partner permissions.
- **BtnPrimary / BtnSecondary / BtnGhost** - sign, create, pause, resolve.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Contract status:** real = active/pending/paused/resolved plus ChipProvenance; low-confidence = sync stale; honest-null = no active contract.
- **Verification checks:** real = proof count and status; low-confidence = partner/witness confirmation pending; honest-null = no proof required yet.
- **Partner/witness visibility:** real = per-person permissions; low-confidence = permission sync pending; honest-null = no partners or witnesses.
- **Signature state:** real = signed timestamp and signer; low-confidence = signature service queued; honest-null = no update to sign.
- **CIA recommendation:** real = contract tied to mission evidence; low-confidence = single blocker signal; honest-null = no coach plan claim.

## Consent and Safety
- Accountability contract uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/contracts`. Do not add alternate vanity routes.

## States
- **Default:** active contract hero, verification checks, partner/witness privacy, terms, and sign action render.
- **Skeleton:** hero, progress, and checks preserve layout with no fake names or percentages.
- **Empty:** HonestNullState offers Create contract and explains privacy before setup.
- **Error:** failed signature or proof sync keeps cached contract and names affected action.
- **Success:** signature/check completion updates in place with `--glow-done` and timestamp provenance.
- **Disabled:** sign action dims to 40% with copy `No update to sign` or specific missing consent/review reason.

## Motion
- **Load:** contract hero fades first; checks rise in 50ms stagger.
- **Sign:** confirmation Sheet names changed terms, partner visibility, and proof requirements.
- **Rows:** tap opens proof detail; accept/dismiss controls are buttons, not swipe-only.
- **Pause/resolve:** action sheet explains consequence and keeps cancel equal prominence.
- **Reduced-motion:** disables stagger, progress sweep, and glow breathing.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/contracts`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text and status labels clear AA+.; **Targets:** sign, rows, partner card, pause/resolve, and overflow are 44px minimum.; **Screen readers:** contract hero announces status, remaining time, partners/witnesses, consent, and next due check.
