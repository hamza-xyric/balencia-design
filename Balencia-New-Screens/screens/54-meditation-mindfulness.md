# 54-meditation-mindfulness

## 1. Header
- **Screen ID:** 54
- **Name:** Meditation & mindfulness
- **Route(s) covered:** No live app route; source-only mindfulness surface.
- **Tab:** Today / Explore / CIA
- **Source:** Functional Content Brief 54, Balencia Glass Canon v1, Component Catalog v1
- **Batch:** 16

## 2. Purpose
Serves as the mental wellbeing practice hub, answering "what should I do right now, and how consistent have I been?" It pairs a browsable mindfulness library with a distraction-free active session and post-session feedback that helps CIA recommend calmer next steps.

## 3. Entry & exit
- **Entry paths:** Explore grid card, Today mindfulness action, Stress management [52] relief tool, CIA Chat [09] coaching prompt, and notification for a scheduled practice.
- **Exit paths:** Stack pop to the source screen, open a full active-session sheet, complete into a rating sheet, ask CIA with practice context, or dismiss back to the library.
- **Correction:** The source describes an expanded card state; this spec uses a full sheet for active practice so the timer and breathing visual are not crowded by the list.

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Atmosphere:** Warm radial glow with a quiet purple pool behind the CIA recommendation.
2. **TopBar:** Transparent title row with back chevron and mental level badge.
3. **CIA Insight Area:** Glass recommendation card driven by stress, mood, and recent practice context.
4. **Filter Strip:** Horizontal chips for all, meditation, quick reset, movement, and evening.
5. **Practices List:** Solid list cards with duration, benefit, and context tag.
6. **Streak & Consistency:** Seven-day strip and four-week heatmap.
7. **Metrics & Vitals:** Solid KPI row for sessions, minutes, and longest streak.
8. **Floating Controls:** `FABQuickLog` and `GlassNavBar`.

**ASCII wireframe (390x844):**
```text
+---------------------------------------------+
|  <  Meditation                    Mental 4  |
|                                             |
|  +---------------------------------------+  |
|  | CIA                                   |  |
|  | Your stress is elevated. A 5-minute   |  |
|  | body scan can shift your *baseline*.  |  |
|  | [ ask CIA ]                           |  |
|  +---------------------------------------+  |
|                                             |
|  [ all ] [ meditation ] [ quick ] [ move ]  |
|                                             |
|  Practices                                  |
|  +---------------------------------------+  |
|  | Body scan meditation        10 min     |  |
|  | Reduces tension     before sleep       |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | Deep breathing              3 min      |  |
|  | Anchors focus          anytime         |  |
|  +---------------------------------------+  |
|                                             |
|  +---------------------------------------+  |
|  | mindfulness streak                     |  |
|  | O O O O O O O    12 days              |  |
|  | ░ ▒ █ ░ ▒ █ ░    last 4 weeks         |  |
|  +---------------------------------------+  |
|                                             |
|  +---------+ +----------+ +-------------+   |
|  |24 sess. | |145 min.  | | longest 12  |   |
|  +---------+ +----------+ +-------------+   |
|                         (+)                 |
|        Today      CIA      Goals      Me    |
+---------------------------------------------+
```

## 5. Components
- **TopBar** - transparent over atmosphere, glass-pill backing on scroll.
- **CIAInsightCard** - purple-tinted glass recommendation with evidence chips.
- **SegmentedTabs** - scroll-chip variant for practice filters.
- **NEW: PracticeListCard** - solid vertical row with leading icon, trailing duration, benefit copy, and context chip.
- **StreakCard** - seven-day strip plus heatmap.
- **KPIRow** - shared solid metric row.
- **ChipProvenance** - appears beside practice minutes, streak, and recommendation confidence.
- **TrendChart** - sparkline for high-motivation practice minutes.
- **ProgressRing** - active-session timer.
- **VoiceMicGlow** - repurposed as a breathing visual inside the active session.
- **Sheet** - full variant for the session, half variant for feedback.
- **PaywallLock** - advanced recommendation and rating insight gate.
- **FABQuickLog** and **GlassNavBar** - floating controls.

## 6. Visual treatment
- **Atmosphere:** `--bg-base` with the required top-center warm radial glow and 3-4% grain. A restrained purple pool sits behind the CIA card only.
- **Glass tiers:** CIA card and active-session sheet use `.glass-card` or `.glass-frost`; practice rows and KPIs use `SolidCard`; filters use `.glass-pill`.
- **Semantic glows:** CIA card uses `--glow-cia`; streak card uses `--glow-you`; completion feedback uses `--glow-done`.
- **Hero type moment:** The CIA sentence emphasizes one word: `baseline` in Tiempos italic.
- **Color discipline:** Orange carries practice effort, green completion feedback, purple intelligence. Heatmaps use a single orange intensity scale.

## 7. Content & copy
- **TopBar:** `Meditation`
- **Level badge:** `Mental 4`
- **CIA card:** `Your stress is elevated. A 5-minute body scan can shift your *baseline*.`
- **CIA action:** `Ask CIA`
- **Filters:** `all`, `meditation`, `quick reset`, `movement`, `evening`
- **Practice rows:** `Body scan meditation`, `Deep breathing`, `Mindful walk`, `Sleep wind-down`
- **Practice benefits:** `reduces tension`, `anchors focus`, `settles the body`
- **Streak card:** `Mindfulness streak`, `12 day streak`, `last 4 weeks`
- **KPI row:** `24 sessions`, `145 minutes`, `longest streak: 12`
- **Active session:** `Breathe in`, `hold gently`, `release slowly`, `tap to pause`
- **Post-session:** `Session complete`, `How do you feel now?`, `Done`
- **Empty copy:** `Welcome to mindfulness. Let's start *simple* - a 3-minute breathing exercise.`
- **Error copy:** `Couldn't load practices. Check your connection.`

## 8. Data & honesty states
- **Practice minutes**
  - **Real:** Orange sparkline with ChipProvenance `app log`.
  - **Low-confidence:** Dashed tail with ChipProvenance `estimated - low confidence`.
  - **Honest-null:** Empty chart frame with `Not enough data yet - 3 more days for a trend.`
- **Current streak**
  - **Real:** `12 day streak` with heatmap blocks and ChipProvenance `app log`.
  - **Low-confidence:** Not estimated because streaks are exact local counts.
  - **Honest-null:** `0 days` with muted dots and first-session CTA.
- **Consistency heatmap**
  - **Real:** Filled intensity squares from completed sessions.
  - **Low-confidence:** Last pending day uses dashed outline when sync is incomplete.
  - **Honest-null:** Quiet grid of faint outlines; no fabricated intensity.
- **CIA recommendation**
  - **Real:** Requires recent stress or mood context plus at least one practice history signal.
  - **Low-confidence:** Shows `early read` chip when only one signal exists.
  - **Honest-null:** `CIA needs one practice before it can personalize this.`

## 9. All states
- **Default:** Library list, CIA recommendation, streak card, and KPI row render with real or honest-null values.
- **Skeleton:** Practice rows, heatmap, KPI row, and CIA card use geometry-matched shimmer without fake values.
- **Empty:** Library remains populated. CIA card recommends the 3-minute breathing exercise and heatmap stays honest-null.
- **Error:** Practice list gets an `ErrorState` with retry; cached practices remain tappable when safe.
- **Active session:** Full sheet slides up with breathing visual, `ProgressRing`, pause control, and duration selector.
- **Post-session:** Half sheet asks for rating and note, then saves feedback into the practice history.
- **Success:** `Done` triggers a 250ms green flash, updates streak/KPI values, and dismisses the sheet.
- **Disabled:** Premium-only feedback analysis and advanced CIA recommendations blur with `PaywallLock`.

## 10. Motion & interaction
- **Load:** CIA card fades in first, then practice rows cascade at 60ms intervals.
- **Practice tap:** Row scales to .98 for 150ms and opens the full session sheet.
- **Session loop:** Breathing visual scales continuously on an 8s loop while the progress ring sweeps.
- **Feedback:** Rating circles fill left-to-right; saving emits one light haptic.
- **Gestures:** Edge swipe returns to the source screen; double tap in the session toggles pause.
- **Reduced-motion:** Breathing loop freezes, sheets crossfade, and heatmap/sparkline render at final state.

## 11. Motivation-tier adaptation
- **Low:** Hides KPIs and heatmap. Filter defaults to quick reset and shows one CIA recommendation plus two short practices.
- **Medium:** Default library with filters, streak, KPIs, and one recommendation.
- **High:** Adds a seven-day minutes trend, expanded why-it-helps text, and longer practices while keeping the same hierarchy.

## 12. Accessibility
- **Contrast:** Paper text on `--bg-base` and `--surface-2` exceeds AA+; purple CIA text never carries meaning by color alone.
- **Targets:** Filters, practice rows, session controls, and rating options meet 44px minimum touch targets.
- **Screen-reader labels:** Breathing visual is decorative; the session container announces remaining time and current phase.
- **Motor access:** Double tap pauses; sheet controls remain reachable by switch control and keyboard focus order.
- **Reduced-motion:** Mirrors Section 10 and respects OS preference.

## 13. Premium checklist
1. **Connects:** CIA uses stress, mood, and practice history to recommend a session.
2. **Honest:** Minutes, streaks, heatmap, and recommendations define real, low-confidence, and honest-null handling.
3. **Premium:** Selective glass, solid practice rows, and calm full-session choreography avoid utility-timer flatness.
4. **Warm-dark atmosphere:** Radial glow, grain, and purple intelligence pool are specified.
5. **Semantic glow:** Purple CIA, orange effort, green completion only.
6. **60/30/10:** Orange, green, and purple roles remain distinct.
7. **Type:** Neue Montreal UI with one Tiempos emphasis word.
8. **All states:** Default, skeleton, empty, error, active, post-session, success, and disabled are covered.
9. **Motivation tiers:** Low, medium, and high density variants are practical.
10. **Accessibility:** AA+ contrast, 44px targets, labels, motor access, and reduced-motion path are included.
11. **Catalog fit:** New list card is justified by mindfulness-specific row content.
12. **CIA voice:** Calm, direct, sentence case, no exclamation marks.
13. **Data visualization:** Heatmap and sparkline use restrained single-purpose color.
14. **Route hygiene:** Marked source-only because no live app route is mapped.
