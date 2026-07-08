# 12-home-screen - hi-fi glass spec

### 1. Header
- **ID:** 12
- **Name:** Home screen
- **Route(s) covered:** /dashboard, /activity-status
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Today root.
- **Source:** app_design 3/12-home-screen.md, app_design 3/12-home-screen-visualization-recommendations.md, and ascii_wireframes/12-home-screen.md.
- **Batch:** 5

### 2. Purpose
The Home screen answers "What is worth my attention today?" It is the authenticated command center: CIA sets the tone, Life balance shows whole-life status, Today's actions give a short execution queue, and pinned missions plus schedule preview keep the day grounded.

### 3. Entry & exit
- **Entry:** returning session lands from Splash [01]; first-time completion of Initial Plan Summary [08] resets here.
- **Primary exit:** complete a Today's action inline, then stay on Today with progress updated.
- **Action exits:** Life balance opens Intelligence Dashboard [48]; pinned mission opens Goal Detail [14]; level badge opens RPG Character [19]; schedule rows open Schedule Calendar [41].
- **Quick exits:** FABQuickLog opens water, meal, mood, or quick note capture; health metric cards route to Fitness [26], Sleep [58], or Health data [96].
- **Failure exit:** cached Today remains visible with SyncStatus and System states [98] only if the route cannot safely render.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Sticky TopBar with greeting, date, and level badge.
2. Quiet CIA greeting card; emotional anchor, not the visual hero.
3. Life balance GlassCard hero with ConstellationRadar, daily energy ChargeMeter, and CIA read.
4. Three GlassStatCard vitals with 7-point sparkline and provenance.
5. Today's actions section with MomentumBar and swipeable action cards.
6. Pinned missions list with ProgressRing/GaugeRing style rings.
7. Coming up, connection insight, and recent activity.
8. FABQuickLog and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Good morning, Amira           Lv12 > |
| Tuesday, May 20                     |
+--------------------------------------+
| [CIA] You crushed it yesterday.      |
|       What needs care today?         |
|       [steady] [low] [wired]         |
| +----------------------------------+ |
| | LIFE BALANCE              12 dom | |
| |        *      *                 | |
| |    *    \ 487 /    Fitness 72   | |
| |      ---- (sun) ---- Sleep 65   | |
| |    *    /     \    Mood 61      | |
| |  energy [##########------] 7/10 | |
| |  Avg 52  +4 this week           | |
| | CIA: Fitness is carrying you.   | |
| +----------------------------------+ |
| [HR 72 via WHOOP] [8.2k steps]      |
| [Sleep 7.5h via phone]              |
| TODAY'S ACTIONS          3 of 6 +90 |
| progress [############----------]   |
| +----------------------------------+ |
| | Meditate 10 min       wellness []| |
| | Morning run           fitness  []| |
| | Review budget         finance  []| |
| +----------------------------------+ |
| PINNED MISSIONS                    |
| | 68% Run a half marathon     pin | |
| | 42% Save 5,000 by December  pin | |
| COMING UP: 2:00 standup, 5:30 gym  |
| [ + ] quick log                    |
| Today | CIA | Goals | Me           |
+--------------------------------------+
```

### 5. Components
- **TopBar** - sticky greeting and level badge; glass-pill backing appears after scroll.
- **CIAInsightCard** - quiet greeting plus later cross-domain connection card.
- **GlassCard** - Life balance hero with semantic glow.
- **GlassStatCard** - heart rate, steps, sleep; each includes ChipProvenance and sparkline.
- **MomentumBar / ChargeMeter** - continuous Today's actions progress and segmented daily energy.
- **ProgressRing** - pinned mission progress; green only at completion.
- **ChipDomainTag** - domain chips on actions and missions.
- **FABQuickLog** - water, meal, mood, quick note.
- **SafetyResourceCard** - reachable from mood/check-in shortcuts because Today exposes wellbeing entry points.
- **OfflineBanner / SyncStatus / SkeletonState / HonestNullState / ErrorState** - catalog state components.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base, warm radial glow, 3-4 percent grain, and no flat black bands.
- **Focal hierarchy:** Life balance is the only hero glow; CIA greeting is secondary with purple text/icon treatment but no dominant glow.
- **Semantic glows:** Life balance uses `--glow-you #FF5E00` for current effort; completed actions flash `--glow-done #34A853`; CIA insight uses `--glow-cia #7F24FF` for synthesized read.
- **60/30/10:** orange owns active progress and FABQuickLog; green only marks done or positive delta; purple appears on CIA surfaces and projected context.
- **Type:** H1/greeting in Neue Montreal; one Tiempos italic word in the CIA greeting, e.g. "what needs *care* today?"

### 7. Content & copy
- **Greeting:** "Good morning, Amira." Date uses device calendar.
- **CIA greeting:** "You crushed it yesterday. What needs *care* today?"
- **Life balance label:** "Life balance." Footer: "Avg 52. Up 4 this week."
- **Daily energy:** "7 of 10 charged."
- **Vitals:** "72 bpm", "8,204 steps", "7.5 hrs sleep" with `via WHOOP`, `via phone`, or `you logged`.
- **Today's actions:** "Meditate 10 min", "Morning run", "Review budget."
- **Pinned missions:** "Run a half marathon", "Save $5,000 by December."
- **Connection insight:** "Sleep quality drops on days you skip movement."
- **Quick-log labels:** "Water", "Meal", "Mood", "Note."

### 8. Data & honesty states
- **Life balance:** real = calculated score with domain provenance; low-confidence = ghosted spokes labeled "estimated · low confidence"; honest-null = "Building your balance - 3 more days."
- **Vitals:** real = value plus ChipProvenance; low-confidence = muted value and ConfidenceMeter; honest-null = "Connect a device or log manually."
- **Today's actions:** real = CIA-curated actions from plan and habits; low-confidence = "suggested from onboarding"; honest-null = "Create one mission to build today."
- **Schedule:** real = synced calendar rows; low-confidence = stale SyncStatus; honest-null = hidden with an "Add calendar" control.
- **Safety and consent:** health data uses ConsentCard links to revoke/delete wearable data; mood shortcuts expose SafetyResourceCard and crisis resources.

### 9. All states
- **Default:** greeting, Life balance, vitals, actions, missions, schedule, and nav render with real or honest-null data.
- **Skeleton:** radar rings, vitals, MomentumBar, and mission rings keep exact geometry while values shimmer.
- **Empty:** day-one state shows two starter actions, a "Create your first mission" card, and honest-null Life balance.
- **Error:** cached Today remains visible; ErrorState names the failed source, such as calendar or wearable sync.
- **Success:** completing an action triggers a green check, updates MomentumBar, awards XP, and moves the row below active work.
- **Disabled:** FABQuickLog options, wearable cards, or calendar rows dim to 40 percent with a screen-reader reason when consent or connectivity blocks them.

### 10. Motion & interaction
- **Load:** TopBar appears instantly; Life balance draws spokes, then values count up; cards fade in by section.
- **Action completion:** swipe right or checkbox fills green, haptic fires, and MomentumBar animates to the new count.
- **Quick-log:** FAB expands into four glass-pill actions above GlassNavBar.
- **Insight:** CIA card expands to show evidence chips and a chat handoff.
- **Scroll:** TopBar gets glass-pill backing once content passes beneath it.
- **Reduced-motion:** spokes, sparklines, counts, and glow breathing resolve as still frames with opacity-only changes.

### 11. Motivation-tier adaptation
- **Low:** CIA greeting, one Life balance sentence, two actions, FABQuickLog; charts collapse to labels.
- **Medium:** default density shown in the wireframe.
- **High:** show all domain spokes, mission XP/streak metadata, schedule detail, and expanded connection evidence.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+; domain colors are paired with text labels.
- **Targets:** TopBar actions, checkboxes, cards, chips, FAB, and nav maintain 44px minimum hit areas.
- **Screen readers:** Life balance summarizes score, strongest/weakest domains, source count, and confidence before listing visual points.
- **Safety:** SafetyResourceCard is one tap from mood/check-in/journal shortcuts; crisis resources are never gamified.
- **Data controls:** wearable, calendar, mood, quick-note, and CIA-derived recommendations expose consent, revoke, and delete paths.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** home links activity, wellbeing, finance, goals, schedule, and CIA context.
2. **Honest:** every metric has provenance or an honest-null.
3. **Premium:** Life balance is the single hero; dense lists use solid surfaces.
4. **Warm-dark:** canon background, grain, glass, and warm surfaces used.
5. **Semantic glow:** effort, completion, and CIA glow meanings are explicit.
6. **60/30/10:** orange, green, purple roles are separated.
7. **Type:** Neue Montreal with one Tiempos italic word in the greeting.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled are designed.
9. **Motivation tiers:** low, medium, high density variants specified.
10. **Accessibility:** contrast, 44px targets, labels, and reduced-motion included.
11. **Honesty triple:** real, low-confidence, honest-null are defined for core data.
12. **Catalog:** canon component names used; no unflagged one-offs.
13. **CIA voice:** coach copy is calm, concrete, and uses CIA naming only.
