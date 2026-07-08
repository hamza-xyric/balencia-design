# 44-water-intake

## 1. Header
- **Screen ID:** 44
- **Name:** Water intake
- **Route(s) covered:** No live route; hydration tracker is a nested Today, Habits, and CIA module.
- **Tab:** Today
- **Source:** Functional Content Brief: Water Intake Tracker
- **Batch:** 13

## 2. Purpose
Water Intake is a frictionless daily hydration command center. It answers "how much water have I had today and am I on track?" with one-tap logging, a glanceable progress ring, honest trend history, and gentle CIA context when hydration intersects with activity, weather, or habits.

## 3. Entry & exit
- **Entry paths:** Today water widget, Explore wellbeing card, Habits drink-water deep-link, CIA hydration reminder, and Nutrition dashboard water card.
- **Primary exit:** Back returns to the owning stack.
- **Action exits:** CIA note opens CIA Chat [09]; gear opens target settings sheet; goal achievement can trigger Celebration Overlay [42]; log row deletion stays in-screen with undo.
- **Failure exit:** If sync fails, cached values stay visible with timestamp and local logs queue when possible.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Back chevron, title "Water intake", and settings gear.
2. **Hero progress:** GlassCard with ProgressRing, glass/ml toggle, target read, and MomentumBar.
3. **Quick log row:** Four glass-pill actions for 1 glass, 250 ml, 500 ml, and custom.
4. **Today log:** SolidCard ledger of chronological entries, swipe-to-delete, and pending sync labels.
5. **Weekly trend:** SolidCard bar chart with target line and previous-week paging.
6. **Stats:** Streak, average, and best day.
7. **CIA insight:** Optional Plus card for activity/weather/habit-aware hydration suggestions.
8. **Bottom chrome:** FABQuickLog and GlassNavBar.

**ASCII Wireframe (390x844):**
```text
+---------------------------------------------+
| <- Water intake                         gear |
|                                             |
| +-----------------------------------------+ |
| | TO TARGET                         3 to go| |
| |                 63%                     | |
| |              5 / 8 *glasses*            | |
| | 1250 ml · 63% of daily goal             | |
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
```

## 5. Components
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

## 6. Visual treatment
- **Atmosphere:** Warm radial glow over `#0A0A0F` with 3% grain.
- **Selective glass:** Hero, quick-log pills, CIA card, nav, and sheets use glass; logs, trends, and stats use SolidCard.
- **Semantic glow:** Hero ring uses `--glow-you`; goal achieved uses `--glow-done`; CIA suggestion uses `--glow-cia`.
- **Hero type moment:** "5 / 8 *glasses*" sits in the ring center with *glasses* as the single Tiempos italic emphasis.
- **Data honesty styling:** Missing or unsynced days render as dashed bars or pending row chips, never as zero intake.
- **No shame states:** Over-target reads as "+2 over target" in neutral green, not warning red.

## 7. Content & copy
- **Header:** "Water intake"
- **Ring:** "5 / 8 *glasses*", "1250 ml", "63% of daily goal", "3 to go"
- **Quick log:** "1 glass", "250 ml", "500 ml", "custom"
- **Empty:** "First glass starts your day.", "Your drinks will appear here.", "Log water to see your week."
- **CIA suggestion:** "Add 250 ml after today's *run*."
- **Stats:** "This week", "Today's log", "day streak", "avg glasses/day", "best day"
- **System:** "Updating your hydration", "Could not load chart. Tap to retry.", "Logs queue locally and sync when you're back online."
- **Success:** "Goal achieved. +25 XP at 3:45 PM"
- **Deletion:** "Drink removed. Undo"

## 8. Data & honesty states
- **Water consumed and target:** Real shows `5 / 8 glasses` and `1250 ml` plus ChipProvenance `via Apple Health` or `you logged`; low-confidence shows muted estimate with `estimated - low confidence`; honest-null shows "0 / 8 - building capacity."
- **Weekly history:** Real bars use synced intake; low-confidence uses dashed bars for partial sync; honest-null keeps empty chart frame with "Log water to see your week."
- **Stats:** Real streak, average, and best day use all-time stats; low-confidence marks estimated cache; honest-null shows dashes and "Your hydration streak starts today."
- **XP reward:** Real appears only when reward service returns a value; honest-null omits XP copy and uses "Goal achieved."
- **CIA suggestion:** Real requires activity, weather, or habit evidence; low-confidence labels limited context; honest-null hides the card.
- **Queued entries:** Offline rows show pending sync and keep the user's entered amount exactly.

## 9. All states
- **Default:** Ring, quick logs, ledger, trend, stats, and optional CIA card populated.
- **Skeleton:** Ring track pulses, bars show ghost axes, stats shimmer, and quick-log buttons stay available only after target data is known.
- **Empty:** Hero ring is ghosted, Today log shows "Your drinks will appear here", and chart frame stays empty.
- **Error:** Cached values remain with a timestamp; failed chart or stats has inline retry.
- **Success:** Ring settles to green at target, success copy appears, and XP shows only if returned.
- **Disabled:** Quick-add buttons dim during duplicate-prevention windows or while custom amount is being saved.
- **Offline:** Quick-add remains enabled when queueing is available; rows carry pending labels.

## 10. Motion & interaction
- **Entrance draw:** Ring fills first, MomentumBar fills, quick-log pills settle, log rows rise, and weekly bars grow.
- **Quick add:** Tap scales pill, logs amount, flashes green checkmark, and re-sweeps the ring.
- **Ring toggle:** Tap center toggles glasses and ml over 150ms.
- **Delete:** Swipe left reveals delete; undo toast remains available after removal.
- **Target sheet:** Gear opens daily target controls with unit selector and save.
- **Celebration:** Goal achievement uses a short green glow; reduced motion skips particle effects and long pulsing.
- **Haptics:** Light on quick add, medium on target achieved.

## 11. Motivation-tier adaptation
- **Low density:** Shows ring and two quick-log buttons only; trend and stats collapse.
- **Medium density:** Default layout with ring, four quick-log buttons, log, chart, and stats.
- **High density:** Adds consistency heatmap, 30-day sparkline, fifth quick-log preset, and richer CIA adaptive target detail.

## 12. Accessibility
- **Contrast:** Paper text on glass and SolidCards meets AA+; muted pending labels remain readable.
- **Targets:** Gear, back, ring center, quick-log pills, row actions, and FAB meet 44px minimums.
- **Screen readers:** Ring announces consumed amount, target, percentage, source, and sync state.
- **Motor fallback:** Long-press row opens a sheet with delete and edit actions for users who cannot swipe.
- **Reduced motion:** Ring sweeps, bar growth, and celebration glow respect OS preference.

## 13. Premium checklist
1. **Connects:** CIA can connect hydration to activity, weather, habits, and nutrition context.
2. **Honest:** Pending rows, dashed gaps, and omitted XP prevent false certainty.
3. **Premium:** Warm hero ring, tactile quick logging, solid ledger, and calm trend history feel native.
4. **Route truth:** Hydration is documented as a nested module, not a live route.
5. **Selective glass:** Hero and controls use glass; ledger and charts are solid.
6. **Semantic glow:** Orange effort, green completion, purple CIA.
7. **One hero type moment:** The ring center owns the screen.
8. **All states:** Default, skeleton, empty, error, success, disabled, and offline are covered.
9. **Source fidelity:** Ring, quick add, ledger, weekly trend, stats, target sheet, and offline queueing are preserved.
10. **A11y:** Ring summaries, motor fallback, contrast, and 44px targets are specified.
11. **Motion:** Draw-first ring and reduced-motion celebration paths are defined.
12. **No shame:** Over-target and missed days are neutral.
13. **Premium gating:** Core logging stays available; adaptive CIA detail may be gated.
14. **Voice:** Sentence case, calm, direct, no exclamation marks.
