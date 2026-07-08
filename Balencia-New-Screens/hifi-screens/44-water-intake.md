# 44-water-intake - A+++ hi-fi mobile spec

## Header
- **Source ID:** 44
- **Source spec:** `Balencia-New-Screens/screens/44-water-intake.md`
- **Evidence:** screens/44-water-intake.md, work/briefs/44.md, work/drafts/44.md, Functional Content Brief: Water Intake Tracker
- **Route(s):** No live route; hydration tracker is a nested Today, Habits, and CIA module.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Water Intake is a frictionless daily hydration command center.
- **Premium Visual Director:** make Water intake hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Water intake names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Water intake                         gear |
|                                             |
| +-----------------------------------------+ |
| | TO TARGET                         3 to go| |
| |                 63%                     | |
| |              5 / 8 *glasses*            | |
| | 1250 ml  63% of daily goal             | |
| | via Apple Health                        | |
| | momentum  ===============-----          | |
| +-----------------------------------------+ |
|                                             |
| [1 glass] [250 ml] [500 ml] [custom]       |
|                                             |
| TODAY'S LOG                       4 entries |
| +-----------------------------------------+ |
| | 1 glass        10:15 AM       synced     | |
| | 250 ml         11:30 AM       synced     | |
| | 500 ml          1:45 PM       pending    | |
| +-----------------------------------------+ |
|                                             |
| THIS WEEK                                  |
| +-----------------------------------------+ |
| | bars with target line and dashed gaps    | |
| +-----------------------------------------+ |
|                                             |
| +------------+ +------------+ +-----------+|
| | streak 12  | | avg 6.5    | | best 9    ||
| +------------+ +------------+ +-----------+|
|                                             |
| +-----------------------------------------+ |
| | CIA: add 250 ml after today's *run*.     | |
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+

Route handling: No live route; hydration tracker is a nested Today, Habits, and CIA module.
```

## Focal Hierarchy
- **Dominant focal moment:** Water intake hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Hero progress, Quick log row, Today log, Weekly trend.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*intake*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Transparent over atmosphere.
- **GlassCard:** Hero progress card.
- **ProgressRing:** Daily consumed versus target.
- **MomentumBar:** Linear companion under the ring.
- **GlassPillInput:** Quick-log buttons and custom amount field.
- **SolidCard:** Today log, weekly chart, and stats.
- **ListRow:** Individual drink entries with amount, time, source, and sync state.
- **TrendChart:** Weekly bars with target line and gaps.
- **SectionHeader:** Today log and This week.
- **CIAInsightCard:** Optional adaptive recommendation.
- **FABQuickLog:** Adds water and focuses the quick-log row.
- **Sheet:** Target settings and custom amount.
- **NEW: ChargeMeterReserve:** Linear "to target" reserve read. Rationale: the source calls for a companion meter, and a linear meter avoids clutter beside the hero ring.

## Data Honesty
- **Water consumed and target:** Real shows `5 / 8 glasses` and `1250 ml` plus ChipProvenance `via Apple Health` or `you logged`; low-confidence shows muted estimate with `estimated - low confidence`; honest-null shows "0 / 8 - building capacity."
- **Weekly history:** Real bars use synced intake; low-confidence uses dashed bars for partial sync; honest-null keeps empty chart frame with "Log water to see your week."
- **Stats:** Real streak, average, and best day use all-time stats; low-confidence marks estimated cache; honest-null shows dashes and "Your hydration streak starts today."
- **XP reward:** Real appears only when reward service returns a value; honest-null omits XP copy and uses "Goal achieved."
- **CIA suggestion:** Real requires activity, weather, or habit evidence; low-confidence labels limited context; honest-null hides the card.
- **Queued entries:** Offline rows show pending sync and keep the user's entered amount exactly.

## Consent and Safety
- Water intake names health category, source, freshness, confidence, retention, export, revoke, and delete before synced values or photo-derived reads are trusted.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Ring, quick logs, ledger, trend, stats, and optional CIA card populated.
- **Skeleton:** Ring track pulses, bars show ghost axes, stats shimmer, and quick-log buttons stay available only after target data is known.
- **Empty:** Hero ring is ghosted, Today log shows "Your drinks will appear here", and chart frame stays empty.
- **Error:** Cached values remain with a timestamp; failed chart or stats has inline retry.
- **Success:** Ring settles to green at target, success copy appears, and XP shows only if returned.
- **Disabled:** Quick-add buttons dim during duplicate-prevention windows or while custom amount is being saved.
- **Offline:** Quick-add remains enabled when queueing is available; rows carry pending labels.

## Motion
- **Entrance draw:** Ring fills first, MomentumBar fills, quick-log pills settle, log rows rise, and weekly bars grow.
- **Quick add:** Tap scales pill, logs amount, flashes green checkmark, and re-sweeps the ring.
- **Ring toggle:** Tap center toggles glasses and ml over 150ms.
- **Delete:** Swipe left reveals delete; undo toast remains available after removal.
- **Target sheet:** Gear opens daily target controls with unit selector and save.
- **Celebration:** Goal achievement uses a short green glow; reduced motion skips particle effects and long pulsing.
- **Haptics:** Light on quick add, medium on target achieved.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; hydration tracker is a nested Today, Habits, and CIA module..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on glass and SolidCards meets AA+; muted pending labels remain readable.; **Targets:** Gear, back, ring center, quick-log pills, row actions, and FAB meet 44px minimums.; **Screen readers:** Ring announces consumed amount, target, percentage, source, and sync state.
