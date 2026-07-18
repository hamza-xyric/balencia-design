# 59-streak-details - A+++ hi-fi mobile spec

## Header
- **Source ID:** 59
- **Source spec:** `Balencia-New-Screens/screens/59-streak-details.md`
- **Evidence:** screens/59-streak-details.md, work/briefs/59.md, work/drafts/59.md, Functional Content Brief: Streak Details
- **Route(s):** No live route; stack-pushed streak detail opened from Life World, Home, Habits, Celebration, or CIA Chat.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Streak Details makes consistency visible and strategic without using loss aversion.
- **Premium Visual Director:** make streak-details hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** streak-details uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|   streak details                    |
| +----------------------------------+ |
| |          42 days strong          | |
| | longest: 67  63% of best        | |
| +----------------------------------+ |
| May 2026                             |
| o o o o o o o                        |
| o o o freeze o missed future         |
| XP multiplier        1.5x            |
| next: 2.0x at 30 days                |
| recovery multiplier  rest bonus next |
| streak freezes       2 available     |
| [ Use freeze ]                       |
| milestones                           |
| 7 x 14 x 30 o 60 locked              |
| streak history                       |
| 67 days  ended: travel - life happens|
+--------------------------------------+

Route handling: No live route; stack-pushed streak detail opened from Life World, Home, Habits, Celebration, or CIA Chat.
```

## Focal Hierarchy
- **Dominant focal moment:** streak-details hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Current streak hero, Streak calendar, XP multiplier dial, Recovery multiplier dial.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*details*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** with 44px back target.
- **StreakCard** hero.
- **CalendarHeatmap** month grid with day tooltips.
- **GaugeRing** for XP multiplier.
- **ArcGauge** for recovery multiplier.
- **SolidCard** for freeze and history modules.
- **TimelineAgenda** for milestones.
- **LeaderboardRow / PodiumRank** for leaderboard.
- **Sheet** for freeze confirmation.
- **CIAInsightCard** compact note only for broken-streak support.
- **ChipProvenance, HonestNullState, SkeletonState, ErrorState, OfflineBanner, BtnPrimary, BtnSecondary, BtnGhost** for states.

## Data Honesty
- **Current streak:** real = count from streak status with ChipProvenance "via streaks"; low-confidence = cached count with "estimated  low confidence"; honest-null = "your streak journey starts with day one."
- **Calendar day status:** real = day states from calendar API; low-confidence = ghosted days while syncing; honest-null = blank future cells only.
- **XP multiplier:** real = derived multiplier from current streak; low-confidence = muted if XP transactions are reconciling; honest-null = base 1.0x with "earn bonus at 7 days."
- **Recovery multiplier:** real = active or next-active bonus; low-confidence = "syncing recovery status"; honest-null = card hidden until rest mechanics unlock.
- **Freezes:** real = available count and rules; low-confidence = disabled while syncing; honest-null = "complete your first 7-day streak to earn a freeze."
- **Leaderboard:** real = rank rows; low-confidence = cached rank; honest-null = invite friends card.

## Consent and Safety
- streak-details uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** active streak with all modules visible.
- **Skeleton:** hero count, calendar cells, gauges, and timeline shimmer.
- **Empty:** Day 1 copy, blank calendar, no multiplier/freeze pressure.
- **Error:** section-level ErrorState with retry; cached modules remain.
- **Success:** freeze use updates count, protects day cell, and shows glow-done confirmation.
- **Disabled:** freeze CTA disabled offline, at zero freezes, or during sync with reason shown.
- **Offline:** cached data remains; freeze and leaderboard refresh actions disabled.
- **Broken streak:** CIA note appears, milestones remain earned, no punishment color.

## Motion
- Tap calendar day for tooltip. Tap Use freeze for sheet. Pull-to-refresh syncs all streak sections. Edge swipe pops.
- Hero count ticks up; GaugeRing and ArcGauge draw; TimelineAgenda draws top-to-bottom; calendar cells appear row by row.
- Freeze confirmation uses 250ms physical sheet motion and success haptic.
- **Reduced-motion path:** all count-ups, draws, and cell staggers render final static state.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; stack-pushed streak detail opened from Life World, Home, Habits, Celebration, or CIA Chat..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Back, day cells, freeze CTA, milestone rows, and leaderboard rows meet 44px targets.; Calendar day status is announced as active, freeze, missed, or future.; Multipliers announce numeric values and unlock thresholds.
