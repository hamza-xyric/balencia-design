# 58-sleep-tracking

## 1. Header
- **Screen ID:** 58
- **Name:** Sleep tracking
- **Route(s) covered:** No live route; sleep tracking is a nested module opened from Today, Wellbeing, Explore, and CIA chat.
- **Tab:** Today / Wellbeing
- **Source:** Functional Content Brief: Sleep Tracking
- **Batch:** 12

## 2. Purpose
Sleep tracking is the command center for last-night rest, long-term sleep patterns, and practical CIA coaching. It explains the quality of sleep without over-charting, distinguishes wearable data from manual logs, and protects the user from fake precision when sleep stages or recovery are unavailable.

## 3. Entry & exit
- **Entry paths:** Explore grid card, Home sleep action, CIA Chat deep-link, Wellbeing hub, and notification cards.
- **Primary exit:** Back returns to the owning stack.
- **Action exits:** Tap CIA note opens CIA Chat [09]; tap level badge opens RPG Character [19]; tap connect prompt opens Connected Services [22]; FAB opens Manual Sleep Log sheet.
- **Failure exit:** Cached data stays visible when safe; failed sync sections provide retry without blocking manual logging.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Sticky header with back chevron, title "Sleep", and RPG badge.
2. **CIA coaching note:** Cross-domain context above data, with evidence chips.
3. **Last-night hero:** GlassStatCard with Sleep Score ring, hours, recovery, bedtime, wake time, and Sleep Reserve ChargeMeter.
4. **Stages and consistency:** SolidCard bento for sleep stages and bedtime consistency.
5. **Duration trend:** SolidCard TrendChart with 7, 14, and 30 day tabs.
6. **Thirty-night heatmap:** SolidCard calendar grid for adherence and gaps.
7. **Quality trend:** SolidCard line for manual 1-5 rating.
8. **Hygiene tips:** Expandable ListRows with CIA evidence and ask-more action.
9. **Manual log sheet:** Date, bedtime, wake time, quality rating, tags, and notes.
10. **Floating nav and FAB:** GlassNavBar plus "Log sleep" FAB.

**ASCII Wireframe (390x844):**
```text
+---------------------------------------------+
| <- Sleep                            [Lv.8]  |
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | HRV dipped after a late *workout*.      | |
| | [fitness] [sleep]        Ask CIA        | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | LAST NIGHT                  via wearable| |
| |              82                         | |
| |        sleep score ring                 | |
| | 7.2 hrs   recovery 64%   10:45p-6:08a  | |
| | sleep reserve  =======---              | |
| +-----------------------------------------+ |
|                                             |
| +----------------+ +--------------------+  |
| | sleep stages   | | consistency        |  |
| | REM 1h 20m     | | tight 10:45p       |  |
| | Deep 1h 10m    | | cluster graphic    |  |
| +----------------+ +--------------------+  |
|                                             |
| DURATION TREND             [7d][14d][30d] |
| +-----------------------------------------+ |
| | living line with dashed gaps            | |
| +-----------------------------------------+ |
|                                             |
| 30-NIGHT HEATMAP                           |
| +-----------------------------------------+ |
| | cells: real nights, gaps, manual logs   | |
| +-----------------------------------------+ |
|                                             |
| HYGIENE TIPS                               |
| +-----------------------------------------+ |
| | wrap up exercise earlier                | |
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+
```

## 5. Components
- **TopBar:** Sticky header with back, title, and RPGBadge.
- **RPGBadge:** Compact glass-pill for Wellbeing skill level.
- **CIAInsightCard:** Purple glass with evidence chips and Ask CIA action.
- **GlassStatCard:** Hero summary with ProgressRing and ChargeMeter.
- **ProgressRing:** Sleep Score.
- **ChargeMeter:** Sleep Reserve.
- **BentoGrid:** Stages and consistency cards.
- **NEW: ConsistencyCloud:** Dots for bedtime and wake clusters. Rationale: variance needs a spatial cluster primitive, not a percentage bar.
- **TrendChart:** Duration and quality living lines.
- **SegmentedTabs:** 7, 14, and 30 day views.
- **CalendarHeatmap:** Thirty-night adherence grid.
- **ListRow:** Hygiene tips with expandable evidence.
- **FABQuickLog:** Opens Manual Sleep Log.
- **Sheet:** Manual Sleep Log with GlassPillInput and ChoiceCardFrost.

## 6. Visual treatment
- **Atmosphere:** Warm dark base with top-center orange glow and a restrained purple pool behind the CIA note.
- **Selective glass:** CIA note and hero summary use glass; stages, consistency, trends, heatmap, and tips use SolidCard for chart clarity.
- **Semantic glow:** Hero uses `--glow-you` for last-night personal data; CIA note uses `--glow-cia`; manual-log success uses `--glow-done`.
- **Data ink:** Duration and score use orange; recovered or completed markers use green; projections and AI tips use purple.
- **Hero type moment:** Sleep Score number in the hero ring is the dominant display moment.
- **Manual entry treatment:** Wearable-only cards disappear when unavailable instead of showing empty rings.

## 7. Content & copy
- **H1:** Sleep
- **CIA insight:** "Your HRV dipped last night. CIA noticed a late *workout* - try wrapping up exercise by 7pm next time."
- **CIA empty:** "Start logging your sleep. CIA will spot patterns and coach you on better rest."
- **Hero:** "Last night", "sleep score", "7.2 hrs", "Recovery 64%", "Sleep reserve"
- **Consistency:** "Tight. Your consistent 10:45p bedtime gives your body a strong rhythm."
- **Hygiene tip:** "Afternoon caffeine can delay sleep onset. Try moving coffee to before noon."
- **Manual log:** "Log sleep", "Night of", "Bedtime", "Wake time", "How did you sleep?", "Anything else to note?", "Save"
- **Tags:** "restless", "dreaming", "snoring", "light sleep", "deep sleep", "woke up refreshed", "woke up tired"
- **Empty:** "No data for last night. Log it when you're ready.", "Log a few more nights to see your trend."
- **Error:** "Couldn't save your sleep. Check your connection and try again."
- **Success:** "Sleep logged. Your trend will update shortly."

## 8. Data & honesty states
- **Sleep Score:** Real shows `82` plus `via wearable`; low-confidence shows muted approximate score with `estimated - low confidence`; honest-null shows a faint empty ring and "Not enough data yet."
- **Sleep Duration:** Real shows `7.2 hrs` plus provider or manual source; low-confidence shows a muted estimate when the wake time was inferred; honest-null shows "-- hrs" and a manual log action.
- **Recovery:** Real shows `64%` from connected health metrics; low-confidence is muted; honest-null hides the recovery module and shows a connect prompt.
- **Sleep stages:** Real uses provider stage data; low-confidence is not shown because stage detection must be provider-backed; honest-null hides stages completely.
- **Consistency:** Real uses bedtime and wake variance; low-confidence labels fewer than seven nights; honest-null shows "More data needed. Log sleep over a week to spot your rhythm."
- **Trends and heatmap:** Missing nights render as gaps or ghost cells, never as zero sleep.
- **CIA tips:** Real only when evidence exists; low-confidence tips are labeled; honest-null asks the user to log more sleep before claiming a pattern.

## 9. All states
- **Default:** Wearable connected, last-night hero visible, 7-day trend selected, and hygiene tips populated.
- **Skeleton:** Depth-preserving shimmer for ring, trend axes, bento cards, heatmap, and tips; no spinning loader.
- **Empty:** Hero ring is a faint track, wearable-only cards hidden, manual log CTA visible, and CIA note uses starter copy.
- **Error:** Cached values remain when safe; failed sync gaps are labeled; save failure preserves form entries.
- **Success:** Manual log sheet closes, hero updates if relevant, and a small XPToast may appear only if reward data exists.
- **Disabled:** FAB is disabled while offline if queueing is unavailable; Save is disabled until date, bedtime, and wake time are valid.
- **Manual-only:** Stages and recovery are hidden; trends and score rely only on manual duration and quality values.

## 10. Motion & interaction
- **On mount:** Hero ring fills first, numbers settle, then SolidCards rise in 80ms stagger.
- **Chart draw:** Living Lines draw left-to-right on scroll; heatmap cells appear row-by-row.
- **Manual sheet:** Date and time fields use bottom-sheet focus states; quality choices scale on tap.
- **Tips:** Tapping a tip expands evidence and CTA in 200ms.
- **FAB behavior:** Hides on scroll-down and returns on scroll-up unless reduced motion is active.
- **Haptics:** Light on tabs, quality choice, and successful save.
- **Reduced motion:** No ring fills, line draws, count-ups, or breathing glows; all states render final positions.

## 11. Motivation-tier adaptation
- **Low density:** Shows CIA note, hero, and one duration trend; hides stages, heatmap, and advanced tips.
- **Medium density:** Default layout with all key cards.
- **High density:** Adds consistency variance, 14-day default trend, quality trend, and deeper tip evidence.

## 12. Accessibility
- **Contrast:** Paper text on dark and SolidCard surfaces meets AA+; orange is not used for small body text.
- **Targets:** Back, badge, tabs, FAB, Save, quality choices, and tip rows maintain 44px hit areas.
- **Screen readers:** Charts summarize score, duration, source, confidence, and missing-night gaps before individual points.
- **Manual logging:** Time fields announce calculated duration and validation errors.
- **Reduced motion:** Matches Section 10 and keeps chart information available as text summaries.

## 13. Premium checklist
1. **Connects:** CIA can relate sleep to fitness, nutrition, stress, and mindfulness only with evidence.
2. **Honest:** Stages and recovery are hidden when provider data is missing; gaps never become zero sleep.
3. **Premium:** Hero ring, warm glass, SolidCard data modules, and calm coaching create a polished sleep command center.
4. **Route truth:** Sleep tracking is documented as a module, not a live route.
5. **Selective glass:** Glass for hero and CIA, solid surfaces for charts.
6. **Semantic glow:** Orange user data, green completion, purple CIA analysis.
7. **One hero type moment:** Sleep Score owns the first viewport.
8. **All states:** Default, skeleton, empty, error, success, disabled, and manual-only are covered.
9. **Motion:** Draw-first charts and reduced-motion alternatives are specified.
10. **A11y:** Chart summaries, targets, validation, and reduced-motion paths are included.
11. **Manual entry:** The user can log sleep without a wearable.
12. **Source fidelity:** Hero summary, stages, consistency cloud, trends, heatmap, tips, and manual sheet are preserved.
13. **Premium gating:** Advanced CIA tips can be gated without hiding core logging or last-night data.
14. **Voice:** Calm, sentence-case copy with no exclamation marks.
