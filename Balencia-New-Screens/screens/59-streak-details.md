### 1. Header
- **Screen ID:** 59
- **Name:** streak-details
- **Route(s) covered:** No live route; stack-pushed streak detail opened from Life World, Home, Habits, Celebration, or CIA Chat.
- **Tab:** Me / Goals utility stack
- **Source:** Functional Content Brief: Streak Details
- **Batch:** 9

### 2. Purpose
Streak Details makes consistency visible and strategic without using loss aversion. It shows current streak, calendar history, XP and recovery multipliers, freeze mechanics, milestones, leaderboard context, and historical breaks with restart-kindly framing.

### 3. Entry & exit
- **Entry paths:** Life World [19] day streak stat, Home [12] streak widget, Habits [38] flame indicator, Celebration [42] milestone link, CIA Chat [09] supportive deep-link.
- **Exit paths:** Back returns to origin. See full leaderboard pushes Leaderboard [39]. Build your streak pushes Habits [38]. CIA note opens CIA Chat [09].
- **Freeze path:** Use freeze opens confirmation sheet before any streak-protection write.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron and title "streak details."
2. **Current streak hero:** flame, count, longest comparison.
3. **Streak calendar:** month grid with active, freeze, missed, and future days.
4. **XP multiplier dial:** current streak bonus and next tier.
5. **Recovery multiplier dial:** rest-day bonus mechanics.
6. **Streak freeze module:** available freezes, rules, use CTA.
7. **Milestones:** timeline ladder for 7, 14, 30, 60, 90, 180, 365 days.
8. **Leaderboard:** top streakers and user's rank.
9. **History:** previous streaks and break reasons.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  streak details                    │
│ ┌──────────────────────────────────┐ │
│ │          42 days strong          │ │
│ │ longest: 67 · 63% of best        │ │
│ └──────────────────────────────────┘ │
│ May 2026                             │
│ ● ● ● ● ● ○ ◌                        │
│ ● ● ● freeze ● missed future         │
│ XP multiplier        1.5x            │
│ next: 2.0x at 30 days                │
│ recovery multiplier  rest bonus next │
│ streak freezes       2 available     │
│ [ Use freeze ]                       │
│ milestones                           │
│ 7 ✓ 14 ✓ 30 • 60 locked              │
│ streak history                       │
│ 67 days · ended: travel - life happens│
└──────────────────────────────────────┘
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** warm dark base with low ember glow.
- **Glass tiers:** streak hero uses glass-card; calendar, multipliers, freezes, milestones, and history use SolidCard for legibility.
- **Semantic glow:** current active streak uses glow-you; earned milestones use glow-done; CIA broken-streak note uses glow-cia. Missed days are neutral and never alarm-red.
- **Calendar encoding:** active, freeze, missed, and future days use glyphs and labels, not color alone.

### 7. Content & copy
- **Title:** streak details
- **Hero:** 42 days strong. Longest: 67 days.
- **XP:** 1.5x XP multiplier. Next: 2.0x at 30 days.
- **Recovery:** take a rest day and earn 1.3x XP bonus on your next active day.
- **Freezes:** 2 available. Use a freeze to protect your streak on a rest day.
- **Confirmation:** use a freeze to protect today's streak? You will have 1 freeze remaining.
- **Empty:** start a new streak today. One day counts.
- **Broken streak:** streaks break. What matters is starting again.
- **Error:** could not load streak data.
- **Offline:** offline - showing cached data.

### 8. Data & honesty states
- **Current streak:** real = count from streak status with ChipProvenance "via streaks"; low-confidence = cached count with "estimated · low confidence"; honest-null = "your streak journey starts with day one."
- **Calendar day status:** real = day states from calendar API; low-confidence = ghosted days while syncing; honest-null = blank future cells only.
- **XP multiplier:** real = derived multiplier from current streak; low-confidence = muted if XP transactions are reconciling; honest-null = base 1.0x with "earn bonus at 7 days."
- **Recovery multiplier:** real = active or next-active bonus; low-confidence = "syncing recovery status"; honest-null = card hidden until rest mechanics unlock.
- **Freezes:** real = available count and rules; low-confidence = disabled while syncing; honest-null = "complete your first 7-day streak to earn a freeze."
- **Leaderboard:** real = rank rows; low-confidence = cached rank; honest-null = invite friends card.

### 9. All states
- **Default:** active streak with all modules visible.
- **Skeleton:** hero count, calendar cells, gauges, and timeline shimmer.
- **Empty:** Day 1 copy, blank calendar, no multiplier/freeze pressure.
- **Error:** section-level ErrorState with retry; cached modules remain.
- **Success:** freeze use updates count, protects day cell, and shows glow-done confirmation.
- **Disabled:** freeze CTA disabled offline, at zero freezes, or during sync with reason shown.
- **Offline:** cached data remains; freeze and leaderboard refresh actions disabled.
- **Broken streak:** CIA note appears, milestones remain earned, no punishment color.

### 10. Motion & interaction
- Tap calendar day for tooltip. Tap Use freeze for sheet. Pull-to-refresh syncs all streak sections. Edge swipe pops.
- Hero count ticks up; GaugeRing and ArcGauge draw; TimelineAgenda draws top-to-bottom; calendar cells appear row by row.
- Freeze confirmation uses 250ms physical sheet motion and success haptic.
- **Reduced-motion path:** all count-ups, draws, and cell staggers render final static state.

### 11. Motivation-tier adaptation
- **Low:** hide leaderboard, multipliers, and deep history; keep hero, calendar, and one next step.
- **Medium:** default.
- **High:** show projected milestone dates, 14-day XP sparkline, and detailed break reasons.

### 12. Accessibility
- Back, day cells, freeze CTA, milestone rows, and leaderboard rows meet 44px targets.
- Calendar day status is announced as active, freeze, missed, or future.
- Multipliers announce numeric values and unlock thresholds.
- Freeze confirmation traps focus and returns to Use freeze.
- No outcome relies on color alone.

### 13. Premium checklist
1. Source-specific streak mechanics are preserved.
2. No fake route is claimed.
3. Streaks are non-shaming.
4. Freeze mechanics have confirmation and disabled reasons.
5. Multipliers are honest and source-labeled.
6. Broken streak keeps earned milestones.
7. CIA note is supportive and optional.
8. Selective glass avoids noisy reward UI.
9. Semantic glow maps to effort, earned milestones, or CIA support.
10. Default, Skeleton, Empty, Error, Success, Disabled, Offline, and Broken states exist.
11. Reduced-motion path exists.
12. 44px target floor is stated.
13. Plus gating is explicit for advanced multiplier/freeze/leaderboard mechanics.
14. Cross-links to Habits, Leaderboard, Life World, Celebration, and CIA Chat are preserved.
