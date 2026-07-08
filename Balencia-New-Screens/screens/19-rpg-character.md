### 1. Header
- **Screen ID:** 19
- **Name:** rpg-character
- **Route(s) covered:** `/life-world`
- **Tab:** Me / Growth
- **Source:** Functional Content Brief: RPG Character Screen
- **Batch:** 8

### 2. Purpose
Life World is a read-only, celebratory view of whole-life progression. It shows level, XP, Life Power, domain shape, streak mechanics, rewards, and mission history without implying that lower stats are failures. It is a character sheet for a real life, so the visual language must be premium and restrained rather than noisy.

### 3. Entry & exit
- **Entry paths:** Me Main [17] via level badge, stats row, or quick link.
- **Exit paths:** Back returns to Me Main. Avatar opens Profile Edit [50]. Domain cards open a sub-stats sheet with View dashboard. Mission rows push Mission Detail [14]. Badges open Celebration [42] or Achievements [71]. View full journal pushes Mission Journal [73].

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron and title "your character."
2. **Character card:** avatar, name, level diamond, rank title, XP progress.
3. **Constellation radar hero:** 10-domain shape with Life Power in the sun hub and one CIA read.
4. **Domain skills:** compact grid of domain stat cards.
5. **Ranked magnitude:** grouped bar chart comparing domain scores.
6. **Stats summary:** streak, missions done, active missions, Life Power.
7. **Streak and rewards:** active streak, multiplier, freezes, recent badges.
8. **Mission history:** recent completed goals plus view full journal.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  your character                    │
│ ┌──────────────────────────────────┐ │
│ │ ◯ Hamza     level 14             │ │
│ │ dedicated explorer               │ │
│ │ ██████░░ 2,450 / 5,809 XP        │ │
│ └──────────────────────────────────┘ │
│        ✦ constellation radar ✦       │
│          Life Power 487              │
│  Strongest in Fitness; Meditation    │
│  has room to grow.                   │
│ DOMAIN SKILLS                        │
│ Fitness 74  Wellbeing 62  Career 55  │
│ Nutrition 51 Finance 48 Learning --  │
│ RANKED                               │
│ Fitness      ███████░░               │
│ Wellbeing    ██████░░░               │
│ STREAK & REWARDS                     │
│ 42 days · 2.5x XP · 2 freezes        │
│ MISSION HISTORY              view all│
└──────────────────────────────────────┘
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** warm dark base, top radial glow, and grain.
- **Focal moment:** constellation radar is the hero, not the character card.
- **Glass tiers:** character card and radar use glass-card; dense domain grid and history rows use SolidCard.
- **Semantic glow:** radar sun uses glow-you for earned progression; CIA one-line read uses glow-cia; badge unlock and level-up use glow-done. Unstarted domains are ghosted, not red.
- **No projections:** this is a record of earned stats, so dashed purple forecast lines are absent.

### 7. Content & copy
- **Title:** your character.
- **Rank:** dedicated explorer.
- **XP:** 2,450 / 5,809 XP to level 16.
- **Radar empty:** Building your balance - add your first domain to get started.
- **CIA read:** Strongest in Fitness; Meditation has room to grow.
- **Labels:** domain skills, ranked, streak & rewards, mission history.
- **Empty mission history:** Complete a goal to see your journey here. Start with one small mission.
- **Loading:** Building your character - one moment.
- **Error:** Couldn't refresh - pull again.
- **Actions:** view dashboard, view full journal.

### 8. Data & honesty states
- **Life Power:** real = calculated from active domain stats with ChipProvenance "via RPG stats"; low-confidence = muted while one domain syncs; honest-null = "Building your balance."
- **Overall level and XP:** real = current level and next-level progress; low-confidence = cached value with "estimated · low confidence"; honest-null = level 1 beginner and ghosted track.
- **Domain stat score:** real = 0-99 score from domain stats; low-confidence = dashed bar while source is partial; honest-null = "--" and "log one entry to begin."
- **Streak/rewards:** real = current streak, multiplier, freeze count, badges; low-confidence = cached with sync label; honest-null = "No active streak - start a new one today."
- **Mission history:** real = recent completed mission rows; low-confidence = cached rows dimmed; honest-null = empty prompt.

### 9. All states
- **Default:** character card, radar, domain skills, ranked chart, rewards, and history render.
- **Skeleton:** radar rings/spokes, XP track, and grid cards shimmer.
- **Empty:** level 1, ghosted radar, all unstarted domains tappable with starter copy.
- **Error:** failed sections show ErrorState and keep cached data where possible.
- **Success:** level-up celebration draws a green arrival line and a restrained CelebrationOverlay.
- **Disabled:** pull-to-refresh and dashboard links dim while offline.
- **Offline:** cached stats remain with staleness banner and no refresh haptic.

### 10. Motion & interaction
- Tap domain card or radar axis to open sub-stats. Tap radar hub expands ranked breakdown. Long-press a spoke scrubs that domain. Tap mission row opens detail.
- Radar polygon draws sequentially; domain gauges fill on scroll; XP bar draws as a continuous line.
- Level-up uses glow-done and brief haptic, never a noisy reward storm.
- **Reduced-motion path:** radar, gauges, bars, and celebration render instantly in final state.

### 11. Motivation-tier adaptation
- **Low:** character card, radar, top three domains, and one mission-history prompt.
- **Medium:** default.
- **High:** full domain grid, ranked chart, sub-stats, deltas, rewards metadata, and expanded history.

### 12. Accessibility
- Back, avatar, radar axes, domain cards, badges, and rows meet 44px targets.
- Radar has a list alternative ordered by domain score.
- Level and XP read as text, not just progress.
- Locked or unstarted domains announce their status directly.
- Badge rarity never relies on color alone.

### 13. Premium checklist
1. Route header matches `/life-world`.
2. Constellation radar is the singular focal visual.
3. Life Power is absorbed into the hub.
4. Domain scores are honest and source-labeled.
5. No-data domains are not rendered as failure.
6. CIA read is present but secondary.
7. Streaks, rewards, and mission history are preserved.
8. Selective glass keeps dense stat areas readable.
9. Default, Skeleton, Empty, Error, Success, Disabled, and Offline states exist.
10. Reduced-motion path exists.
11. 44px target floor is stated.
12. No manipulative scarcity or shame language.
13. Premium gating is limited to deeper comparisons.
14. Cross-links to Profile Edit, Mission Journal, Achievements, Streaks, and domain dashboards are preserved.
