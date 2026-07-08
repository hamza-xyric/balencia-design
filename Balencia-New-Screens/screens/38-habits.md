# 38-habits

## 1. Header
- **Screen ID:** 38
- **Name:** Habits
- **Route(s) covered:** `/wellbeing/habits`
- **Tab:** Today
- **Source:** Functional Content Brief 38, habit dashboard source notes, Balencia Glass Canon v1
- **Batch:** 15

## 2. Purpose
Gives the user a daily habit command center that answers "what do I do today, and how consistent am I?" It turns small repeated actions into a clear, non-shaming checklist, then lets CIA connect habit consistency to energy, sleep, stress, and goal progress.

## 3. Entry & exit
- **Entry paths:** Today card for "habits due", Wellbeing module card, CIA coaching prompt, push notification for a scheduled habit, and Goal detail [14] when a habit supports a goal.
- **Exit paths:** Back to the owning stack, open habit editor sheet, reorder habits sheet, CIA Chat [09] with habit context, Goal Detail [14], or Settings consent controls for reminder permissions.
- **Failure exit:** Cached checklist remains visible when sync fails; the user can still check local habits and reconcile later.

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere:** Warm radial glow over the dark base, with a small green completion halo reserved for the hero when the day improves.
2. **TopBar:** Transparent title row, back chevron when stacked, reminder/settings glyph.
3. **Hero Momentum Card:** Glass card with completion count, streak, and a `MomentumBar`.
4. **View Switcher:** Segmented tabs for today, week, and month.
5. **Today Checklist:** Grouped habit rows for morning, afternoon, and evening.
6. **Analytics & Insight:** Four-week heatmap plus CIA pattern card.
7. **Footer Controls:** `FABQuickLog` for a new habit and `GlassNavBar` when opened from a root tab.

**ASCII wireframe (390x844):**
```text
+---------------------------------------------+
|  <  Habits                         bell gear |
|                                             |
|  +---------------------------------------+  |
|  | momentum today                        |  |
|  | 5 of 8 habits                 21 days |  |
|  | ███████████░░░░░░░  62%               |  |
|  | you logged · synced locally           |  |
|  +---------------------------------------+  |
|                                             |
|  [ today ] [ week ] [ month ]              |
|                                             |
|  Morning                                    |
|  +---------------------------------------+  |
|  | [x] drink water        07:30  health   |  |
|  | [x] stretch            08:00  fitness  |  |
|  +---------------------------------------+  |
|  Afternoon                                  |
|  +---------------------------------------+  |
|  | [ ] walk 10 min        due now         |  |
|  | [ ] deep work block    14:00  career   |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | consistency                            |  |
|  | ░ ▒ █ ░ ▒ █ ░   ░ ▒ █ ░ ▒ █ ░         |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | CIA: sleep is strongest on stretch...  |  |
|  | [ ask CIA why ]                        |  |
|  +---------------------------------------+  |
|                         (+)                 |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+
```

## 5. Components
- **TopBar** - transparent, gains `.glass-pill` backing after scroll.
- **GlassStatCard** - hero momentum card with `--glow-you` while work remains and `--glow-done` when complete.
- **MomentumBar** - completion bar using fixed height and tabular numbers.
- **SegmentedTabs** - today, week, month view switcher.
- **SolidCard** - grouped checklist containers and analytics block.
- **NEW: HabitRowCard** - compact row with checkbox, schedule, domain chip, drag handle, and skipped state. The catalog list row is too general for recurrence and streak metadata.
- **NEW: WeeklyBarChart** - seven fixed bars for completed habits per day; used inside the week tab.
- **CalendarHeatmap** - four-week consistency map.
- **CIAInsightCard** - pattern read with evidence chips.
- **ChipProvenance** and **ChipDomainTag** - source and domain labels.
- **FABQuickLog** and **GlassNavBar** - global add/navigation controls.

## 6. Visual treatment
- **Atmosphere:** `--bg-base` with the required warm radial glow and soft grain. Completion moments may add a restrained forest-green glow near the hero only after the final habit is checked.
- **Glass tiers:** The hero and CIA card use `.glass-card`; checklist groups, heatmap, and weekly bars use `SolidCard` for legibility. Segmented tabs and FAB use `.glass-pill`.
- **Semantic glows:** Hero uses `--glow-you` for active effort, then `--glow-done` for a completed day. CIA uses `--glow-cia` because the insight is synthesized. Checklist rows never glow.
- **Hero type moment:** The count phrase reads `5 of *8* habits`, with only the number emphasized in Tiempos italic.
- **Color discipline:** Orange marks active effort and the unchecked path, green marks completed habits, and purple is reserved for CIA guidance and projected patterns.

## 7. Content & copy
- **TopBar:** `Habits`
- **Hero:** `5 of 8 habits`, `21 day streak`, `62% complete`
- **Hero provenance:** `you logged`, `synced locally`, or `estimated - low confidence`
- **Tabs:** `today`, `week`, `month`
- **Section labels:** `Morning`, `Afternoon`, `Evening`, `Consistency`
- **Habit row labels:** `drink water`, `stretch`, `walk 10 min`, `deep work block`
- **CIA line:** `Stretching appears on your best sleep days. Keep that *tiny* anchor.`
- **Primary action:** `Add habit`
- **Empty copy:** `Pick *one*. That's enough.`
- **Error copy:** `Couldn't refresh habits. Your saved checklist is still here.`
- **Offline copy:** `Offline - local checks will sync later.`
- **Success copy:** `Logged. The day just got lighter.`

## 8. Data & honesty states
- **Completion count**
  - **Real:** `5 of 8 habits` with `you logged`.
  - **Low-confidence:** `about 5 of 8 habits` with `estimated - low confidence` when sync is incomplete.
  - **Honest-null:** `No habits yet` with the add action.
- **Current streak**
  - **Real:** `21 day streak` with `calculated locally`.
  - **Low-confidence:** `21 day streak` muted with `sync pending`.
  - **Honest-null:** Hidden until at least two completed days exist.
- **Heatmap**
  - **Real:** Filled blocks from local completions.
  - **Low-confidence:** Last pending day uses a dashed outline.
  - **Honest-null:** Empty grid with `Your pattern starts after your first check.`
- **CIA recommendation**
  - **Real:** Requires at least two habit signals and one adjacent domain signal.
  - **Low-confidence:** One supporting signal shows `early pattern`.
  - **Honest-null:** `CIA needs a few checks before it can spot a pattern.`

## 9. All states
- **Default:** Hero, tabs, grouped checklist, heatmap, and CIA card render with real or honest-null data.
- **Skeleton:** Hero count, segmented tabs, and checklist rows use geometry-matched shimmer. No placeholder numbers.
- **Empty:** Checklist collapses into the low-friction prompt `Pick one. That's enough.` with `Add habit`.
- **Error:** Cached habit rows remain interactive when safe. Failed sync shows an inline `ErrorState` above the first group.
- **Success:** Checked row fills the mark, mutes the row, updates the hero count, and flashes green only if all habits are complete.
- **Disabled:** Reminder controls and add button dim to 40% with a screen-reader reason when permissions or entitlement block them.
- **Offline:** Local checks queue with an orange cloud chip and reconcile after sync.

## 10. Motion & interaction
- **Load:** Hero rises 8px and fades over 200ms; groups cascade at 60ms intervals.
- **Check action:** Check stroke draws in 180ms, row content shifts to completed styling, and haptic feedback fires once.
- **Reorder:** Long-press exposes drag handles; rows lift into a glass-pill shadow while the list keeps fixed row heights.
- **Tabs:** Today, week, and month crossfade charts without changing the top hero geometry.
- **Glow behavior:** Hero breathes subtly while there are unchecked habits. Completion flash is a single 600ms green pulse.
- **Reduced-motion:** Row checks become instant state changes; cascades and glow breathing are disabled.

## 11. Motivation-tier adaptation
- **Low:** Shows only the next due habit, the add action, and one gentle CIA sentence. Heatmap, streak, and week/month tabs hide.
- **Medium:** Default density with grouped checklist, momentum, heatmap, and one insight.
- **High:** Adds weekly bar chart, drag-to-prioritize, domain filters, and correlation chips linking habits to sleep, stress, and goals.

## 12. Accessibility
- **Contrast:** Paper text on dark solid and glass surfaces meets AA+; completion is shown by check state and text, not color alone.
- **Targets:** Habit rows, checkboxes, chips, FAB, and tabs maintain 44px minimum targets.
- **Screen-reader labels:** Checkbox rows announce habit name, due time, completion state, and streak impact.
- **Keyboard and switch control:** Add, check, reorder, and tab controls are reachable in a predictable order.
- **Reduced-motion:** Mirrors Section 10 and respects OS preference.

## 13. Premium checklist
1. **Connects:** Habit completion links to sleep, stress, goals, and CIA pattern reads.
2. **Honest:** Completion, streaks, heatmap, and CIA all include real, low-confidence, and honest-null handling.
3. **Premium:** One clear hero, selective glass, solid list surfaces, and restrained completion motion.
4. **Warm-dark atmosphere:** Required radial glow, grain, and glass hierarchy are present.
5. **Semantic glow:** Orange effort, green completion, purple CIA only.
6. **60/30/10:** Orange leads action, green rewards completion, purple stays with intelligence.
7. **Type:** Neue Montreal for UI with one Tiempos emphasis word.
8. **All states:** Default, skeleton, empty, error, success, disabled, and offline are defined.
9. **Motivation tiers:** Low, medium, and high variants change density without changing purpose.
10. **Accessibility:** AA+ contrast, 44px targets, labels, and reduced-motion path are specified.
11. **Catalog fit:** New components are justified where recurrence metadata needs a dedicated pattern.
12. **CIA voice:** Calm, direct, sentence case, no exclamation marks.
13. **Data visualization:** Heatmap and bars use single-purpose color roles with provenance.
14. **Route hygiene:** Covers the live wellbeing habits route only.
