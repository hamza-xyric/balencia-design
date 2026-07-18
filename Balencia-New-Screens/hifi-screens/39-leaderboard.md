# 39-leaderboard - A+++ hi-fi mobile spec

## Header
- **Source ID:** 39
- **Source spec:** `Balencia-New-Screens/screens/39-leaderboard.md`
- **Evidence:** screens/39-leaderboard.md, app_design 3/39-leaderboard.md and ascii_wireframes/39-leaderboard.md.
- **Route(s):** `/leaderboard`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Leaderboard is the optional social motivation layer for XP, consistency, streaks, and personal climb.
- **Premium Visual Director:** make Leaderboard hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Leaderboard exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <       Leaderboard                  |
| [global] [competitions] [country]    |
| [this week] [this month] [all time]  |
| PODIUM: #2 Ahmed, #1 Sarah, #3 Lisa  |
| #12 You  Hamza Lv14  +3 this week    |
| XP to Lv15 [############------] 68%  |
| streak 21d [learning] 7-day line     |
| [global] [friends]                   |
| #4 Omar 3410 XP [finance]            |
| #5 Priya 3200 XP [wellbeing]         |
| #6 Yara 2980 XP [creativity]         |
| fairness: your climb, not a verdict  |
| Today | CIA | Goals | Me             |
+--------------------------------------+

Route handling: `/leaderboard`
```

## Focal Hierarchy
- **Dominant focal moment:** Leaderboard hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with title and back. with CIA only when the source supports a synthesized read.
- **Operational layer:** SegmentedTabs for global, competitions, country., Period tabs, Podium hero for top 3., Own rank card with XP-to-next MomentumBar and 7-day sparkline..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*leaderboard*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - back and title.
- **SegmentedTabs** - leaderboard type and period.
- **LeaderboardRow** - rank, avatar, name, level, XP, domain chip, delta.
- **GlassCard** - podium and own-rank hero.
- **MomentumBar** - XP to next level.
- **ChipDomainTag / ChipProvenance** - domain and ranking window.
- **ReputationDial** - optional profile sheet context, not a ranking driver.
- **Sheet** - limited profile, report/block, fairness explanation.
- **SkeletonState / ErrorState / HonestNullState / OfflineBanner** - social states.

## Data Honesty
- **Rank:** real = server rank plus window provenance; low-confidence = cached ranking; honest-null = "ranking unavailable."
- **XP:** real = verified XP total; low-confidence = pending sync; honest-null = hide bar.
- **Delta:** real = period-over-period rankChange; low-confidence = "last synced" label; honest-null = neutral dash.
- **Friends:** real = accepted social context; low-confidence = partial list; honest-null = no friends prompt.
- **Controls:** social profile, ranking visibility, report/block, and data export/delete are available.

## Consent and Safety
- Leaderboard exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/leaderboard`. Do not add alternate vanity routes.

## States
- **Default:** filters, podium, own rank, rows, and profile sheets render.
- **Skeleton:** podium plinths, own card, and row bars shimmer.
- **Empty:** community-of-one shows user and ghosted invite slots, not fake rivals.
- **Error:** cached rankings remain with retry and source label.
- **Success:** switching filters refreshes rows and own card without losing scroll.
- **Disabled:** profile, friends, or report actions dim when privacy or connectivity blocks them.

## Motion
- **Load:** podium rises, own-card bar draws, rows rise on scroll.
- **Filter:** segmented indicator slides and list crossfades.
- **Own card:** tap opens RPG Character [19].
- **Row:** tap opens limited profile with report/block.
- **Fairness:** info Sheet explains ranking window and anti-cheat basics.
- **Reduced-motion:** podium and bars appear final; no rise or count-up.

## Image Slots
- `HIFI-39-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: Leaderboard avatar or social proof placeholders, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/leaderboard`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.; **Targets:** filters, rows, own card, report/block, and profile actions are 44px minimum.; **Screen readers:** LeaderboardRow announces rank, movement, XP, domain, window, and privacy status.
