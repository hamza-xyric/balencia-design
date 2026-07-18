# 19-rpg-character - A+++ hi-fi mobile spec

## Header
- **Source ID:** 19
- **Source spec:** `Balencia-New-Screens/screens/19-rpg-character.md`
- **Evidence:** screens/19-rpg-character.md, work/briefs/19.md, work/drafts/19.md, Functional Content Brief: RPG Character Screen
- **Route(s):** `/life-world`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Life World is a read-only, celebratory view of whole-life progression.
- **Premium Visual Director:** make rpg-character hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** rpg-character uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   your character                    |
| +----------------------------------+ |
| | o Hamza     level 14             | |
| | dedicated explorer               | |
| | ######## 2,450 / 5,809 XP        | |
| +----------------------------------+ |
|         constellation radar        |
|          Life Power 487              |
|  Strongest in Fitness; Meditation    |
|  has room to grow.                   |
| DOMAIN SKILLS                        |
| Fitness 74  Wellbeing 62  Career 55  |
| Nutrition 51 Finance 48 Learning --  |
| RANKED                               |
| Fitness      #########               |
| Wellbeing    #########               |
| STREAK & REWARDS                     |
| 42 days  2.5x XP  2 freezes        |
| MISSION HISTORY              view all|
+--------------------------------------+

Route handling: `/life-world`
```

## Focal Hierarchy
- **Dominant focal moment:** rpg-character hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Character card, Constellation radar hero, Domain skills, Ranked magnitude.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*character*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** with 44px back target.
- **CharacterCard** (NEW) composed from Avatar, level badge, and XP ProgressBar.
- **ConstellationRadar** with Life Power sun hub.
- **ChipDomainTag** for domain identity.
- **DomainSkillCard** (NEW) for compact domain stat and XP.
- **GroupedBarChart** for ranked magnitude.
- **KPIRow** for streak and mission summary.
- **StreakCard** and **BadgeWall** for rewards.
- **ListRow** for mission history.
- **Sheet** for domain sub-stats.
- **ChipProvenance, HonestNullState, SkeletonState, ErrorState, OfflineBanner, CelebrationOverlay** for data and state handling.

## Data Honesty
- **Life Power:** real = calculated from active domain stats with ChipProvenance "via RPG stats"; low-confidence = muted while one domain syncs; honest-null = "Building your balance."
- **Overall level and XP:** real = current level and next-level progress; low-confidence = cached value with "estimated  low confidence"; honest-null = level 1 beginner and ghosted track.
- **Domain stat score:** real = 0-99 score from domain stats; low-confidence = dashed bar while source is partial; honest-null = "--" and "log one entry to begin."
- **Streak/rewards:** real = current streak, multiplier, freeze count, badges; low-confidence = cached with sync label; honest-null = "No active streak - start a new one today."
- **Mission history:** real = recent completed mission rows; low-confidence = cached rows dimmed; honest-null = empty prompt.

## Consent and Safety
- rpg-character uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/life-world`. Do not add alternate vanity routes.

## States
- **Default:** character card, radar, domain skills, ranked chart, rewards, and history render.
- **Skeleton:** radar rings/spokes, XP track, and grid cards shimmer.
- **Empty:** level 1, ghosted radar, all unstarted domains tappable with starter copy.
- **Error:** failed sections show ErrorState and keep cached data where possible.
- **Success:** level-up celebration draws a green arrival line and a restrained CelebrationOverlay.
- **Disabled:** pull-to-refresh and dashboard links dim while offline.
- **Offline:** cached stats remain with staleness banner and no refresh haptic.

## Motion
- Tap domain card or radar axis to open sub-stats. Tap radar hub expands ranked breakdown. Long-press a spoke scrubs that domain. Tap mission row opens detail.
- Radar polygon draws sequentially; domain gauges fill on scroll; XP bar draws as a continuous line.
- Level-up uses glow-done and brief haptic, never a noisy reward storm.
- **Reduced-motion path:** radar, gauges, bars, and celebration render instantly in final state.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/life-world`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, avatar, radar axes, domain cards, badges, and rows meet 44px targets.; Radar has a list alternative ordered by domain score.; Level and XP read as text, not just progress.
