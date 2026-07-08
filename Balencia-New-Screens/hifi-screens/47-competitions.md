# 47-competitions - A+++ hi-fi mobile spec

## Header
- **Source ID:** 47
- **Source spec:** `Balencia-New-Screens/screens/47-competitions.md`
- **Evidence:** screens/47-competitions.md, app_design 3/47-competitions.md and ascii_wireframes/47-competitions.md.
- **Route(s):** `/competitions`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Competitions lets users browse, join, and track health challenges.
- **Premium Visual Director:** make Competitions hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Competitions exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <        Competitions                |
| FEATURED: Step Challenge active      |
| May 25-Jun 8, 234 participants       |
| time elapsed [############------]68% |
| prize 500 XP + Gold Badge            |
| [join now]                           |
| [All][Active][Upcoming][Past][My]    |
| 2 invitations from Sarah, Ahmed      |
| SUGGESTED: 7-Day Mindful, Fit Feb    |
| Step Challenge #12 [view details]    |
| Meditation Marathon [join]           |
| Nutrition Challenge #5 [view results]|
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: `/competitions`
```

## Focal Hierarchy
- **Dominant focal moment:** Competitions hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with "Competitions." with CIA only when the source supports a synthesized read.
- **Operational layer:** Filter chips, Invitation badge., CIA suggested challenge cards., GlassNavBar..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*competitions*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - title and back.
- **GlassCard** - featured competition hero.
- **ProgressBar / MomentumBar** - time window elapsed.
- **KPIRow** - participants, prize, your rank.
- **LeaderboardRow** - detail standings preview.
- **ChipDomainTag / ChipProvenance** - admin, CIA, active, upcoming, ended.
- **PaywallLock** - locked social challenge.
- **Sheet** - invite list, rules, join confirmation, report.
- **SkeletonState / ErrorState / HonestNullState / OfflineBanner** - states.

## Data Honesty
- **Competition:** real = date range, participants, rules, status; low-confidence = cached list; honest-null = empty filter.
- **Countdown:** real = server time window; low-confidence = offline cached remaining; honest-null = hide countdown.
- **Rank:** real = joined score and rank; low-confidence = pending sync; honest-null = no rank until joined.
- **CIA suggestion:** real = evidence-backed challenge match; low-confidence = starter suggestion; honest-null = hide suggestions.
- **Controls:** social sharing, leaderboard visibility, health proof, CIA suggestions, third-party data, and report/block expose consent/revoke/delete.

## Consent and Safety
- Competitions exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/competitions`. Do not add alternate vanity routes.

## States
- **Default:** hero, filters, invitations, suggestions, list, and nav render.
- **Skeleton:** hero, filter chips, invite card, suggestions, and rows shimmer.
- **Empty:** filter empty state suggests another filter without shame.
- **Error:** cached competitions remain with source-specific retry.
- **Success:** join adds challenge to My and changes CTA to View details with green confirmation.
- **Disabled:** join/view dims when premium, rules, consent, or connectivity blocks it.

## Motion
- **Load:** hero appears first, time bar draws, rows fade.
- **Filter:** chip selection updates list with crossfade.
- **Join:** opens confirmation Sheet with rules and data used.
- **Detail:** card opens competition detail with leaderboard and progress.
- **Invite:** badge opens invitation Sheet.
- **Reduced-motion:** no bar fill or row stagger; content appears final.

## Image Slots
- `HIFI-47-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: Competitions avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/competitions`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** filters, hero CTA, rows, invitation badge, and join buttons are 44px minimum.; **Screen readers:** cards announce challenge name, status, dates, participants, rank, source, and action.
