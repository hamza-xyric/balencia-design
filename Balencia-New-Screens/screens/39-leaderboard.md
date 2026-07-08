# 39-leaderboard - hi-fi glass spec

### 1. Header
- **ID:** 39
- **Name:** Leaderboard
- **Route(s) covered:** /leaderboard
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Social / Explore.
- **Source:** app_design 3/39-leaderboard.md and ascii_wireframes/39-leaderboard.md.
- **Batch:** 19

### 2. Purpose
Leaderboard is the optional social motivation layer for XP, consistency, streaks, and personal climb. It must be fair and anti-shame: the user's own rank is always anchored, downward movement is neutral, and competitors are shown as context rather than judgment.

### 3. Entry & exit
- **Entry:** Explore, CIA rank insight, community link, or competitions teaser.
- **Primary exit:** tap own rank to RPG Character [19].
- **Secondary exits:** limited profile sheet, competitions, country/global tabs, or back to origin.
- **Safety exit:** report/block available from profile sheets.
- **Failure exit:** cached rankings show OfflineBanner.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with title and back.
2. SegmentedTabs for global, competitions, country.
3. Period tabs: this week, this month, all time.
4. Podium hero for top 3.
5. Own rank card with XP-to-next MomentumBar and 7-day sparkline.
6. Global/friends toggle.
7. LeaderboardRow list with shared-scale XP bars, self-row anchor, and fairness notes.

**ASCII wireframe (390x844):**
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
```

### 5. Components
- **TopBar** - back and title.
- **SegmentedTabs** - leaderboard type and period.
- **LeaderboardRow** - rank, avatar, name, level, XP, domain chip, delta.
- **GlassCard** - podium and own-rank hero.
- **MomentumBar** - XP to next level.
- **ChipDomainTag / ChipProvenance** - domain and ranking window.
- **ReputationDial** - optional profile sheet context, not a ranking driver.
- **Sheet** - limited profile, report/block, fairness explanation.
- **SkeletonState / ErrorState / HonestNullState / OfflineBanner** - social states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` warm dark with restrained social glow.
- **Semantic glows:** own rank uses `--glow-you #FF5E00`; climb or streak recovery uses `--glow-done #34A853`; CIA rank explanation uses `--glow-cia #7F24FF`.
- **Podium:** metal accents are identity only and paired with medal glyphs and labels.
- **Rows:** SolidCard on `#211008` for readable FlatList density.
- **Type:** Neue Montreal plus one Tiempos italic word, e.g. "your *climb*."

### 7. Content & copy
- **H1:** "Leaderboard."
- **Own card:** "#12. Hamza. Lv14. Up 3 vs this week."
- **Fairness note:** "Your climb, not a verdict."
- **Rows:** "Sarah 4,120 XP", "Ahmed 3,890 XP", "Lisa 3,650 XP", "Omar 3,410 XP."
- **Filters:** "Global", "Friends", "This week", "This month", "All time."
- **Empty copy:** "Rankings grow as your community grows. Invite friends or join a community."

### 8. Data & honesty states
- **Rank:** real = server rank plus window provenance; low-confidence = cached ranking; honest-null = "ranking unavailable."
- **XP:** real = verified XP total; low-confidence = pending sync; honest-null = hide bar.
- **Delta:** real = period-over-period rankChange; low-confidence = "last synced" label; honest-null = neutral dash.
- **Friends:** real = accepted social context; low-confidence = partial list; honest-null = no friends prompt.
- **Controls:** social profile, ranking visibility, report/block, and data export/delete are available.

### 9. All states
- **Default:** filters, podium, own rank, rows, and profile sheets render.
- **Skeleton:** podium plinths, own card, and row bars shimmer.
- **Empty:** community-of-one shows user and ghosted invite slots, not fake rivals.
- **Error:** cached rankings remain with retry and source label.
- **Success:** switching filters refreshes rows and own card without losing scroll.
- **Disabled:** profile, friends, or report actions dim when privacy or connectivity blocks them.

### 10. Motion & interaction
- **Load:** podium rises, own-card bar draws, rows rise on scroll.
- **Filter:** segmented indicator slides and list crossfades.
- **Own card:** tap opens RPG Character [19].
- **Row:** tap opens limited profile with report/block.
- **Fairness:** info Sheet explains ranking window and anti-cheat basics.
- **Reduced-motion:** podium and bars appear final; no rise or count-up.

### 11. Motivation-tier adaptation
- **Low:** own rank, friends-only default, and fairness note.
- **Medium:** default podium and list.
- **High:** global/country/competition tabs, rank history, and detailed deltas.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** filters, rows, own card, report/block, and profile actions are 44px minimum.
- **Screen readers:** LeaderboardRow announces rank, movement, XP, domain, window, and privacy status.
- **Safety:** report/block and fairness explanation are reachable from every profile sheet.
- **Data controls:** social visibility, ranking history, CIA insight, and third-party competition data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** leaderboard ties XP, RPG, social, competitions, and CIA context.
2. **Honest:** rank windows and cached data are labeled.
3. **Premium:** aspiration without shame.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** own effort, recovery, and CIA meanings stated.
6. **60/30/10:** orange self/action, green recovery, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** LeaderboardRow and catalog components used.
13. **CIA voice:** rank insights frame growth, never worth.
