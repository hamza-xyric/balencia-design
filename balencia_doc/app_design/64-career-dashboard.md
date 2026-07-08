# Screen Design: Career Dashboard

**Screen**: 64 of 66
**File**: 64-career-dashboard.md
**Register**: Growth Mode (forest-green #34A853)
**Primary action**: track career execution and goals
**Tab**: Career (top-level nav item, not nested in Me)
**Navigation**: Root of the Career tab stack. Entry from Bottom Tab Bar "Career" icon (persistent, always reachable), Home Screen [12] via career action card, Goal Detail [14] via domain tag chip (career-indigo), SIA Chat [09] deep-link (career coaching context), Achievements [—] via career badge unlock. Exit via Bottom Tab Bar to another tab (no back stack at root; sub-screens push above it).

---

## Purpose

This screen is the execution engine for the Career life pillar — it turns a career goal into a structured 5-level progression with weekly behavioral routines, honest analytics, and curated resources. It answers "where am I on my path, what do I need to show up for this week, and is it working?" The philosophy is behavioral, not curriculum-based: levels unlock on *evidence of consistency* (sessions logged, active days, consistency percentage, reflections, system changes) rather than a checklist of tasks alone. SIA (the AI coach) owns three touch points here: it drafts the level path and starter tasks when a goal is created, it surfaces an accountability nudge when it detects a behavioral pattern (e.g. consistently under-shooting a cadence), and it curates real learning resources (video/article/search) per level. Every AI-originated element carries the same purple "AI drafted" marker established on Screen 46.

This screen has four tab views: **Journey**, **This Week**, **Analytics**, and **Resources**, accessed via a segmented tab below the header stat row. A goal picker (pill row) appears above the tabs when the user has more than one active career goal.

**Register vs. action color — read this first**: forest-green (#34A853) is this screen's *register* accent — it appears on the header accent line, section eyebrows, the level-path progress glow, and completion states, signaling "growth" the way Screen 26 (Fitness) uses red or Screen 30 (Finance) uses emerald. It is **not** a substitute for the brand's action language: primary CTAs ("Mark complete," "Log a session," "New Goal") remain Burnt Orange per the 60% rule, and the RPG Skill Badge / Domain Tag Chip elsewhere in the app still uses career-indigo (#6366F1) as the *identification* color for career items referenced from other dashboards. Forest-green here is chrome, not action — it never appears on a button.

---

## Information Architecture

**Hierarchy — Journey Tab** (what the user sees, in order of visual priority):
1. Career stat row (career XP, streak days, next milestone, 42-day trend sparkline)
2. Goal picker pills (conditional — only if >1 goal)
3. Level Path visualization — 5-node ascending trail, current level expanded
4. Level Task Panel (revealed on node tap) — behavioral thresholds + optional tasks + curated resources
5. SIA Accountability Card (conditional) — pattern-based nudge with one-tap apply
6. SIA Obstacle Plan (conditional, collapsible) — named obstacles + counter-moves
7. Recovery Plan card (conditional) — shown when a miss is detected

**Hierarchy — This Week Tab**:
1. Today's Mission card — single focused action, "Mark complete" CTA
2. This Week card — session count vs. weekly target, consistency %, weekly reflection prompt
3. Execution Scores strip — Discipline / Momentum / Recovery / Identity (0–100 each, honest-null)
4. Focus Area sections (conditional, per-goal-type) — Skills / Portfolio / Applications trackers

**Hierarchy — Analytics Tab**:
1. Career Score ring (0–100, honest-null) + component breakdown (level progress, task velocity, streak consistency, goal diversity)
2. Summary stat tiles — completed goals, career XP earned, active days (30d), applications tracked
3. Consistency Heatmap — 182-day GitHub-style grid
4. Momentum Chart — 90-day XP area chart
5. Badge Grid — unlocked/locked career milestones

**Hierarchy — Resources Tab**:
1. Curated Resources list (per current level, grouped by level if multiple unlocked)
2. Obstacle Plan quick-access
3. Badge Grid (compact variant, links to Analytics for full view)
4. Career Upgrade Banner (conditional — premium career features paywall tease)

**User flow**:
- **Arrives from**: Bottom Tab Bar "Career" (persistent tab root), Home Screen [12] via career action card (deep-link to This Week tab), Goal Detail [14] via career domain tag chip, SIA Chat [09] deep-link with goal context pre-loaded, Achievements screen via badge tap (deep-link to Analytics tab)
- **Primary exit**: Bottom Tab Bar to Today/SIA/Goals/Me
- **Secondary exits**: Create Goal Modal (stack push from "New Goal"), Career Plan Modal (stack push from goal creation "show plan"), SIA Chat [09] (tab switch from Accountability Card or Obstacle Plan), Paywall [43] (stack push from Career Upgrade Banner), Resource external links (system browser, new tab)

---

## Layout — Journey Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes (bottom tab bar); segmented tab is a secondary in-screen nav, not the bottom bar

### ASCII Wireframe — Journey Tab (level node expanded)

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  "Your Growth Journey"    [+ Goal] │  ← Screen Header (56pt)
│  Personalized growth, your pace     │     subtitle, green accent line
├─────────────────────────────────────┤
│  ┌────────┬────────┬────────┬────┐ │  ← Career Stat Row (88pt)
│  │Active:2│XP:4,120│Streak:9│▲trnd│ │     4 stat cells + sparkline
│  └────────┴────────┴────────┴────┘ │
│                                     │  ← 16pt gap
│  [ Learn Spanish ] [ SWE Promo ]   │  ← Goal Picker Pills (36pt)
│                                     │     (only if >1 goal)
│  [Journey][This Week][Analytics]   │  ← Segmented Tab (40pt)
│  [Resources]                        │
│                                     │  ← 16pt gap
│         Mastery Peak  ●L05          │
│                    ╱                │
│         Execution Summit ●L04       │  ← Level Path
│                  ╱                  │     (ascending wave trail,
│      Skill Ridge ●L03  ← CURRENT    │      5 milestone nodes,
│              ╱   [expanded card]    │      current node's glass
│  Foundation Camp ●L02               │      card expanded below it)
│          ╱                          │
│  Beginning Valley ✓L01              │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ Level 3: Interview Drills    │   │  ← Task Panel (revealed)
│  │  3/5 sessions · +250 XP      │   │     threshold bars + tasks
│  │  ▓▓▓▓▓▓░░░░ Sessions 3/5     │   │
│  │  ▓▓▓▓▓▓▓▓░░ Active days 4/5  │   │
│  │  GRADUATE CAP Learn this lvl │   │     resource links (2)
│  │  [+ Log a session]           │   │
│  │  + Optional tasks (2)        │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐    │
│  │ ✦ SIA noticed a pattern    │    │  ← Accountability Card
│  │ "You log sessions 6/7 days  │    │     (purple border, conditional)
│  │  but skip Sundays. Want to   │    │
│  │  move Sunday's session to    │    │
│  │  Saturday?"                  │    │
│  │        [apply suggestion]    │    │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘    │
│                                     │  ← 24pt gap
│  ▸ SIA Obstacle Plan (3)           │  ← Collapsible section
│                                     │  ← 64pt bottom padding
├─────────────────────────────────────┤
│ Today | SIA | Goals | Career | Me  │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Journey Tab (top to bottom)

1. **Screen Header** — 56pt, FIXED
   - Purpose: Screen identity + primary creation CTA
   - Content: "Your Growth Journey" title + subtitle + "New Goal" orange pill CTA top-right
2. **Career Stat Row** — 88pt
   - Purpose: At-a-glance career momentum
   - Content: 4 stat cells (Active goals, Career XP, Streak days, Next milestone) + inline 42-day trend sparkline
3. **Goal Picker Pills** — 36pt (conditional)
   - Purpose: Switch which goal's Journey is shown
   - Content: Horizontal scroll pill row, one pill per goal, status suffix on non-active goals
4. **Segmented Tab** — 40pt
   - Purpose: Switch between Journey / This Week / Analytics / Resources
   - Content: Four segments with active state
5. **Level Path Visualization** — ~420pt
   - Purpose: Visual 5-level ascending progression with zone storytelling
   - Content: Wavy Catmull-Rom trail, 5 Milestone Nodes, glass zone-label cards
6. **Level Task Panel** — Variable (revealed on node tap)
   - Purpose: Behavioral thresholds, curated resources, optional tasks for the selected level
   - Content: Threshold bars, resource links, "Log a session" CTA, optional task editor
7. **SIA Accountability Card** — ~120pt (conditional)
   - Purpose: Pattern-detected coaching nudge with one-tap apply
   - Content: Sparkles icon + message + apply CTA
8. **SIA Obstacle Plan** — Variable, collapsible (conditional)
   - Purpose: Named obstacles from goal creation + SIA's counter-move for each
   - Content: Collapsible header + obstacle rows (icon + obstacle + solution)
9. **Recovery Plan Card** — ~140pt (conditional, shown after a detected miss)
   - Purpose: Non-punitive restart guidance
   - Content: Recovery strategy text + "Restart Small" CTA

---

## Layout — This Week Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — This Week Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  "Your Growth Journey"    [+ Goal] │  ← Screen Header (56pt)
├─────────────────────────────────────┤
│  [Journey][This Week][Analytics]   │  ← Segmented Tab (40pt)
│  [Resources]                        │
│                                     │  ← 16pt gap
│  ┌───────────────┬───────────────┐ │
│  │ TODAY'S MISSION│ THIS WEEK     │ │  ← 2-col grid (stacks on
│  │ Interview      │ Show up 5x    │ │     mobile <640px)
│  │ Drills — 30 min│               │ │
│  │                │ Sessions 3/5  │ │
│  │ Start the      │ ▓▓▓▓▓▓░░░░   │ │
│  │ smallest       │ Consistency   │ │
│  │ version — just │ 68%           │ │
│  │ 30 minutes.    │               │ │
│  │                │ ✓ Weekly      │ │
│  │ [Mark complete]│  reflection   │ │
│  └───────────────┴───────────────┘ │
│                                     │  ← 16pt gap
│  ┌─────────┬─────────┬─────────┐  │
│  │Gauge     │TrendUp  │Repeat   │  │  ← Execution Scores Strip
│  │Discipline│Momentum │Recovery │  │     4 cells, honest-null
│  │  78/100  │ 64/100  │  91/100 │  │
│  │  Strong  │ Rising  │Excellent│  │
│  ├─────────┴─────────┴─────────┤  │
│  │ShieldCheck  Identity  82/100 │  │
│  └───────────────────────────────┘  │
│                                     │  ← 24pt gap
│  SKILLS                             │  ← Section (conditional,
│  ┌─────────────────────────────┐   │     per goal type)
│  │ + Add a skill to track…      │   │
│  ├─────────────────────────────┤   │
│  │ React                 mid    │   │
│  │ ▓▓▓▓▓▓░░░░ 62%               │   │
│  └─────────────────────────────┘   │
│                                     │  ← 64pt bottom padding
├─────────────────────────────────────┤
│ Today | SIA | Goals | Career | Me  │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — This Week Tab (top to bottom)

1. **Screen Header** — 56pt, FIXED (shared)
2. **Segmented Tab** — 40pt (shared)
3. **Today's Mission / This Week Grid** — ~220pt (2-column desktop/tablet ≥640px, stacked mobile)
   - Purpose: Single focused daily action + weekly cadence tracker in one glance
   - Content: Today's Mission Card (left), This Week Card (right)
4. **Execution Scores Strip** — ~140pt
   - Purpose: 4-axis behavioral scoring (honest-null when insufficient data)
   - Content: 4 score cells in a 2×2 (mobile) / 1×4 (desktop) grid
5. **Focus Area Sections** — Variable (conditional, per active goal's opted-in trackers)
   - Purpose: Scoped sub-trackers (Skills / Portfolio / Applications)
   - Content: One labelled section per opted-in focus area

---

## Layout — Analytics Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — Analytics Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  "Your Growth Journey"    [+ Goal] │  ← Screen Header (56pt)
├─────────────────────────────────────┤
│  [Journey][This Week][Analytics]   │  ← Segmented Tab (40pt)
│  [Resources]                        │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │      ╭───────────╮  Elite   │   │  ← Career Score Panel
│  │     │      78     │ 91% conf│   │     ring + tier chip +
│  │      ╰───────────╯          │   │     component breakdown
│  │  Level progress   ▓▓▓▓▓▓░ 71│   │
│  │  Task velocity     ▓▓▓▓░░░58│   │
│  │  Streak consistency▓▓▓▓▓▓▓84│   │
│  │  Goal diversity     ▓▓▓░░░45│   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌────────┬────────┬────────┬───┐ │
│  │Trophy 3│Zap 4120│Cal'k 18│Tgt│ │  ← Summary Tiles (4-col)
│  │Goals   │XP earnd│Active d│Apps│ │
│  └────────┴────────┴────────┴───┘ │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ Consistency        Less▪▪▪▪More│ ← Consistency Heatmap
│  │ ▪▪▪▫▫▪▪ ▪▫▪▪▫▪▪ ▪▪▪▪▫▪▪ ...  │   │     182-day grid
│  │ Active:42d Streak:9d Best:14d │  │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ Daily momentum      4,120 XP │   │  ← Momentum Chart
│  │      ╱╲    ╱╲╲                │   │     90-day area chart
│  │  ___╱  ╲__╱   ╲___            │   │
│  │ Peak: 340 · 18 earning days   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  BADGES              12 of 20      │  ← Badge Grid
│  ⬡First Step ⬡5-Day ⬡Level Up ...  │
│                                     │  ← 64pt bottom padding
├─────────────────────────────────────┤
│ Today | SIA | Goals | Career | Me  │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Analytics Tab (top to bottom)

1. **Screen Header** — 56pt, FIXED (shared)
2. **Segmented Tab** — 40pt (shared)
3. **Career Score Panel** — ~220pt
   - Purpose: Single composite momentum signal (honest-null below data threshold)
   - Content: Score ring (184pt), tier chip, confidence %, 4-part component breakdown
4. **Summary Stat Tiles** — ~140pt
   - Purpose: All-time / period career facts
   - Content: 4 tiles (2-col mobile, 4-col desktop) — Completed goals, Career XP, Active days (30d), Applications
5. **Consistency Heatmap** — ~340pt
   - Purpose: 182-day (~26 week) activity intensity grid
   - Content: 7×26 cell grid, month labels, day-of-month ticks, 5-cell summary row
6. **Momentum Chart** — ~300pt
   - Purpose: 90-day XP-earned trend, continuous daily series
   - Content: Recharts area chart, peak-day + earning-days footer stats
7. **Badge Grid** — Variable
   - Purpose: Career milestone achievements
   - Content: Wrapped pill row, unlocked (orange glow) vs. locked (dim) states

---

## Layout — Resources Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — Resources Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  "Your Growth Journey"    [+ Goal] │  ← Screen Header (56pt)
├─────────────────────────────────────┤
│  [Journey][This Week][Analytics]   │  ← Segmented Tab (40pt)
│  [Resources]                        │
│                                     │  ← 16pt gap
│  LEARN THIS LEVEL          3       │  ← Section eyebrow + count
│  ┌─────────────────────────────┐   │
│  │[▶thumb] STAR framework for   │   │  ← Resource Row (video)
│  │  behavioral interviews       │   │
│  │  WATCH · CareerVidPro         │   │
│  ├─────────────────────────────┤   │
│  │[Book] Common interview       │   │  ← Resource Row (article)
│  │  mistakes and how to avoid   │   │
│  │  READ                         │   │
│  ├─────────────────────────────┤   │
│  │[Search] "mock interview      │   │  ← Resource Row (search)
│  │  questions software eng"     │   │
│  │  EXPLORE                      │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │ ShieldCheck SIA Obstacle Plan (3)│ ← Obstacle Plan quick-
│  │  The blockers you named —    │   │     access (collapsed)
│  │  and the move that beats     │   │
│  │  each. ▾                     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  BADGES             see all →      │  ← Badge Grid (compact)
│  ⬡ ⬡ ⬡ ⬡ ⬡ +7                     │
│                                     │  ← 24pt gap
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐    │
│  │ ⭐ Unlock Career Pro          │    │  ← Career Upgrade Banner
│  │  Skill-gap AI analysis,      │    │     (conditional, free tier)
│  │  unlimited goals, resume     │    │
│  │  review           [upgrade]  │    │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘    │
│                                     │  ← 64pt bottom padding
├─────────────────────────────────────┤
│ Today | SIA | Goals | Career | Me  │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Resources Tab (top to bottom)

1. **Screen Header** — 56pt, FIXED (shared)
2. **Segmented Tab** — 40pt (shared)
3. **Curated Resources List** — Variable
   - Purpose: SIA-curated learning resources scoped to the current unlocked level(s)
   - Content: Resource Rows (video/article/search variants), grouped by level when >1 level unlocked
4. **Obstacle Plan Quick-Access** — Variable, collapsible
   - Purpose: Same component as Journey tab, surfaced here for a resource-seeking mindset
5. **Badge Grid (Compact)** — ~72pt
   - Purpose: Quick badge glance + "see all" link to Analytics tab
   - Content: First 5 badge pills + "+N" overflow chip
6. **Career Upgrade Banner** — ~120pt (conditional, free-tier users only)
   - Purpose: Paywall tease for premium career features (skill-gap AI analysis, unlimited concurrent goals, resume review)
   - Content: Same Blurred Preview Treatment + CTA language established on Screen 43

---

## Components

### Screen Header
- **Purpose**: Screen identity, subtitle, and primary creation CTA
- **Visual treatment**: ink-900 background, 56pt, FIXED with backdrop-blur on scroll. Thin forest-green (#34A853 at 60%) accent line, 2pt, beneath the title — the register signature, matching the Domain Dashboard Header pattern (Screen 26).
- **Content**: "Your Growth Journey" (24pt Cabinet Grotesk Bold 700, white) + "Personalized growth adapted to your progress." (14pt Switzer Regular, white at 60%) + "New Goal" pill CTA (orange fill, plus icon, top-right)
- **Size**: Full-width x 56pt

### Career Stat Row
- **Purpose**: At-a-glance career momentum, mirrors the RPG stat-card pattern used on Screen 32
- **Data source**: API — GET /api/v1/career/overview + GET /api/v1/career/trend?days=42
- **Visual treatment**: 4 equal-width cells (2×2 on mobile <640px), ink-brown-800, --r-md (14pt), 16pt padding, 8pt gaps
- **Content**:
  - Cell 1: "Active" label (11pt Switzer, white at 50%) + count (20pt Cabinet Grotesk Bold, white)
  - Cell 2: "Career XP" + XP total (20pt Cabinet Grotesk Bold, forest-green — this is a growth metric)
  - Cell 3: "Streak" + day count with flame icon (12pt, orange)
  - Cell 4: "Next milestone" + inline 42-day sparkline (mini line chart, forest-green stroke, 32pt tall)
- **Size**: Full-width minus 32pt x 88pt

### Goal Picker Pills
- **Purpose**: Switch which goal drives the Journey tab and stat row
- **Data source**: API — GET /api/v1/career/goals?status=all
- **Visual treatment**: Horizontal scroll pill row, 16pt leading margin. Same visual language as Contract Filter Chip Row (Screen 46) — inactive: ink-brown-800 bg + white at 60% text; active: orange bg + white text (goal selection is an action, not a register signal, so it stays orange not green)
- **Content**: Goal title per pill + status suffix in 10pt at 60% opacity for non-active goals (e.g. "· paused")
- **Gestures**: Tap to switch selected goal (all tab content re-fetches scoped to the new goal)
- **Size**: Full-width x 36pt, only rendered when user has >1 goal

### Segmented Tab (4-segment)
- **Purpose**: Switch between Journey / This Week / Analytics / Resources
- **Data source**: View state (local)
- **Visual treatment**: Identical to the established Segmented Control pattern (Screen 38), extended to 4 segments. 16pt horizontal margins, wraps to 2 rows below 380pt width (Journey/This Week on row 1, Analytics/Resources on row 2) rather than shrinking text below 12pt.
- **Content**: "journey" / "this week" / "analytics" / "resources" (13pt Cabinet Grotesk SemiBold 600, sentence case)
- **Active**: Burnt orange (#FF5E00) fill — segment switching is a navigation action, orange per brand rule, not the green register
- **Size**: Full-width minus 32pt x 40pt (x80pt if wrapped)

### Level Path (Milestone Trail)
- **Purpose**: Visual storytelling of the 5-level behavioral progression — the screen's hero element
- **Data source**: API — GET /api/v1/career/goals/:goalId (levels array with completionStatus, unlockStatus, xpReward, levelNumber, title, description)
- **Visual treatment**: SVG-rendered ascending wave trail (Catmull-Rom smoothed bezier path) across a ~420pt stage, 5 anchor points climbing left-to-right/bottom-to-top (12%,80% → 88%,26%). Each anchor carries a Milestone Node. Zone names label the emotional arc of the climb: "Beginning Valley" → "Foundation Camp" → "Skill Ridge" → "Execution Summit" → "Mastery Peak."
- **Trail color logic**: completed segments render in forest-green (#34A853) at full opacity — this is THE moment forest-green earns its register role, since level completion is literally growth made visible. The segment leading to the current level pulses gently. Locked segments render at white 12% opacity.
- **Content per Milestone Node**:
  - Glass zone-label card above the node (18pt radius, backdrop-blur): zone name (9pt Cabinet Grotesk SemiBold, uppercase, +0.22em tracking, gold #FFB84D on unlocked / white 35% on locked) + "L0N" index + level title (15pt Cabinet Grotesk Bold) + optional subtitle (10pt Switzer Medium, white 40%). Expands on hover/current to reveal description + XP reward pill + "N% done."
  - Node capsule: 84pt outer ring (progress arc, forest-green stroke for behavioral completion %) around a 66pt glass circle. Completed: white checkmark (24pt) + idle shimmer sweep. Current: level number (Cabinet Grotesk Bold) + pulsing outer ring. Locked: lock icon (24pt, white 35%), no ring fill.
  - Pedestal glow: soft radial blur beneath each unlocked node, forest-green tinted, breathing animation
- **Variants**: Completed (checkmark, full ring, shimmer), Current (number, partial ring, pulse), Locked (lock icon, empty ring, 60% opacity glass card)
- **Gestures**: Tap any non-locked node to expand/collapse its Level Task Panel below the trail. Hover (desktop) previews the zone card expansion without opening the panel.
- **Size**: Full-width minus 32pt x ~420pt (scales down proportionally at 360pt viewport, node capsule floors at 64pt)

### Level Task Panel
- **Purpose**: Behavioral progress detail for the selected level — thresholds, resources, tasks
- **Data source**: API — GET /api/v1/career/goals/:goalId/levels/:levelId/metrics (ExecutionMetrics: sessions, activeDays, consistencyPct, reflections, systemChanges) + GET /api/v1/career/goals/:goalId/resources
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding, 1pt white at 10% border, backdrop-blur
- **Content**:
  - Header row: "Level N: [title]" (16pt Cabinet Grotesk Bold) + "+NNN XP" (12pt Switzer, white 50%)
  - Description (13pt Switzer Regular, white at 45%)
  - Curated Resource Links (conditional — see Resource Row component)
  - Routine summary strip: repeat icon + "Your routine: 5×/week · 30 min · weekdays" (13pt Switzer Medium, white 70%, ink-900 pill background)
  - Threshold Bars (one per active requirement): icon + label + "value/target" (tabular nums) + progress bar. Met threshold: orange fill + inline checkmark. Unmet: dimmer orange-glow fill.
  - "Log a session" CTA — orange pill, plus icon, 44pt height
  - "Optional tasks (N)" — collapsed dashed-border expander (Screen 46 dashed-button pattern), reveals a compact task list on tap
- **Size**: Full-width minus 32pt x variable (~280–420pt depending on threshold count + resources)

### Threshold Bar
- **Purpose**: One behavioral requirement's progress (sessions, active days, consistency %, reflections, system change)
- **Visual treatment**: Icon (14pt) + label (13pt Switzer Medium, white 60%/orange when met) left; "value/target" (tabular nums, orange when met) right. 6pt height bar below, --r-pill, white 10% track.
- **Fill logic**: Unmet — orange at 70% opacity fill. Met — full orange fill + 12pt checkmark suffix.
- **Size**: Full-width (card content width) x ~34pt per row

### Resource Row
- **Purpose**: One SIA-curated learning resource (video, article, or search suggestion) for the current level
- **Data source**: `goal.metadata.resources[levelNumber]` — real curated links, never fabricated placeholders
- **Visual treatment**: ink-900-tinted row, --r-lg (20pt) approximated at 12pt for compactness, 1pt white 7% border, 8pt padding
- **Content**:
  - Video variant: 74×44pt thumbnail (real YouTube thumbnail, lazy-loaded) with a centered play glyph overlay
  - Article/search variant: 36pt icon tile, orange at 10% bg, orange icon (book for article, magnifier for search)
  - Title (14pt Switzer Medium, white 90%, 2-line clamp)
  - Meta line: verb in uppercase orange (11pt Cabinet Grotesk SemiBold — "WATCH" / "READ" / "EXPLORE") + channel name if present (11pt Switzer, white 45%)
  - External-link icon (14pt, white 30%, brightens to orange on hover)
- **Honesty rule**: renders nothing when no curated resources exist for a level — never shows an empty "no resources" placeholder
- **Gestures**: Tap opens the link in a new tab/system browser
- **Size**: Full-width minus card padding x ~60pt (video variant) / ~52pt (text variant)

### Today's Mission Card
- **Purpose**: The single most important action for today — the "first step" anchor of the whole execution model
- **Data source**: API — GET /api/v1/career/goals/:goalId/today
- **Visual treatment**: ink-brown-800 to ink-900 diagonal gradient card, --r-xl (28pt), 20pt padding
- **Content**:
  - Eyebrow: "TODAY'S FIRST STEP" (first-ever session) or "TODAY'S MISSION" (11pt Cabinet Grotesk SemiBold, uppercase, +0.18em, orange)
  - Mission label (18pt Cabinet Grotesk Bold, white)
  - Guidance line: encouragement copy for first-step users, or "N min · one focused session" with clock icon (14pt Switzer, white 50–55%)
  - CTA: "Mark complete" / "Start Today's Step" — orange pill, 44pt. Done state: outlined orange pill, checkmark, "Done for today," non-interactive.
  - Multi-session footnote (conditional): "N sessions logged today — momentum" (11pt Switzer, white 40%)
- **Size**: Full-width minus 32pt (mobile) or 50% grid column (≥640pt) x ~180pt

### This Week Card
- **Purpose**: Weekly cadence tracker — sessions vs. target, consistency %, weekly reflection
- **Data source**: API — GET /api/v1/career/goals/:goalId/week
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 20pt padding
- **Content**:
  - Eyebrow: "THIS WEEK" (11pt Cabinet Grotesk SemiBold, uppercase, +0.18em, royal-purple — this strip is where SIA's weekly framing lives)
  - Mission focus line (18pt Cabinet Grotesk Bold, white) — SIA-set weekly focus text
  - Sessions row: flame icon + "Sessions" label vs. "completed/target" (tabular nums)
  - Progress bar: 6pt, --r-pill, orange fill
  - Consistency line: gauge icon + "Consistency this week:" + percentage (tabular nums, bold)
  - Weekly Reflection sub-section: Done state — orange checkmark + "Weekly reflection done." Not-done — "Reflect on this week" dashed-border button (purple accent) expands 5 short-answer prompts ("What worked this week?" / "What almost caused you to fail?" / "What distracted you most?" / "What will you change next week?" / "What system needs improving?") each a 2-row textarea, with "Save reflection" purple CTA
- **Size**: Full-width minus 32pt (mobile) or 50% grid column (≥640pt) x ~220pt (280pt expanded reflection)

### Execution Scores Strip
- **Purpose**: 4-axis behavioral scoring — Discipline, Momentum, Recovery, Identity — each honest-null until enough data exists
- **Data source**: API — GET /api/v1/career/goals/:goalId/scores
- **Visual treatment**: 4 cells sharing a 1pt white-10% grid divider, ink-900 cell background, container --r-xl (28pt) with 1pt white 10% border
- **Content per cell**:
  - Icon (14pt, orange) + label (11pt Cabinet Grotesk SemiBold, uppercase, +0.1em, white 45%): Gauge/Discipline, TrendingUp/Momentum, Repeat/Recovery, ShieldCheck/Identity
  - Score (24pt Cabinet Grotesk Bold, white) + "/100" (12pt Switzer, white 40%) — or em-dash when null
  - Sub-line (11pt Switzer, white 45%): a short reason string when null ("Not enough data yet"), or a tier word when scored ("Rising" for momentum up-trend, "Slowing" for down, "Steady" for flat, else the level label)
- **Layout**: 2×2 grid on mobile (<640pt), 1×4 row on tablet/desktop
- **Size**: Full-width minus 32pt x ~140pt (2×2) or ~96pt (1×4)

### SIA Accountability Card
- **Purpose**: Pattern-detected coaching nudge — SIA noticed a behavioral trend and proposes a concrete routine adjustment
- **Data source**: API — GET /api/v1/career/goals/:goalId/accountability-insight
- **Visual treatment**: ink card tinted royal-purple at 6% bg, 1pt purple at 20% border, --r-xl (28pt), 16pt padding. Follows the SIA Coaching Note Card — Contextual Variant (Screen 30) exactly, purple border instead of orange elsewhere.
- **Content**:
  - Icon tile: 36pt, purple at 10% bg, 1pt purple 30% border, sparkles icon (16pt purple)
  - Eyebrow: "SIA NOTICED A PATTERN" (11pt Cabinet Grotesk SemiBold, uppercase, +0.18em, purple)
  - Message (14pt Switzer Regular, white 85%, up to 3 lines)
  - "apply suggestion" CTA (conditional — only when SIA has a concrete patch): purple pill, checkmark icon
- **Visibility**: Hidden entirely when no insight exists (kind: "none") — never shows an empty nudge shell
- **Gestures**: Tap CTA applies the patched commitment (e.g. adjusted cadence) via PUT /api/v1/career/commitments/:id
- **Size**: Full-width minus 32pt x ~120pt

### SIA Obstacle Plan
- **Purpose**: The obstacles the user named at goal creation, each paired with SIA's counter-move
- **Data source**: Derived client-side from `goal.obstacles[]` (career_goals.obstacles TEXT[]) via a category-classifier + solution library — not a live API call
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 20pt padding, collapsible header
- **Content**:
  - Header: shield-check icon (16pt, orange) + "SIA Obstacle Plan" (11pt Cabinet Grotesk SemiBold, uppercase, +0.18em, orange) + count badge + chevron (rotates on expand)
  - Intro line: "The blockers you named — and the one move that beats each." (14pt Switzer Regular, white 55%)
  - Obstacle rows: category icon tile (36pt, orange 10% bg) + obstacle text (14pt Switzer SemiBold, white 90%) + solution text (14pt Switzer Regular, white 60%)
- **Categories** (icon mapping): motivation, time, overthinking, fear, consistency, energy, distraction, emotion, tracking, money, clarity, accountability, general
- **Visibility**: Hidden entirely when the goal has no stored obstacles
- **Gestures**: Tap header to expand/collapse (280ms ease-out-soft, matches Expandable/Collapsible Section pattern)
- **Size**: Full-width minus 32pt x 48pt (collapsed) to ~variable (expanded, ~90pt per obstacle)

### Recovery Plan Card
- **Purpose**: Non-punitive restart guidance shown after a detected consistency lapse
- **Data source**: `goal.recoveryStrategy` (career_goals.recovery_strategy TEXT) with a default coaching line when unset
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 20pt padding
- **Content**:
  - Repeat icon (16pt, orange) + "Recovery Plan" (11pt Cabinet Grotesk SemiBold, uppercase, +0.18em, orange)
  - Strategy text (14pt Switzer Regular, white 70%)
  - Two-cell guidance grid: "Missed a day?" (restart-small guidance) / "Missed several?" (SIA auto-shrinks the routine, no guilt framing) — each 12pt Switzer, white 55%, ink-900 tinted cell
  - "Restart Small" CTA — orange pill, flame icon, logs a capped 5–15 min session
- **Size**: Full-width minus 32pt x ~160pt

### Career Score Panel
- **Purpose**: Single composite momentum number blending level progress, task velocity, streak consistency, and goal diversity — honest-null below the data threshold
- **Data source**: API — GET /api/v1/career/analytics/score
- **Visual treatment**: ink-brown-800 card with orange ambient glow (top-right blur), --r-xl (28pt), 20–28pt padding, 2-column grid (ring left, breakdown right) collapsing to 1-column stacked below 768pt
- **Content**:
  - Score Ring: 184pt SVG, 14pt stroke, orange-to-gold gradient arc (0% #FF5E00 → 55% #FF7A45 → 100% #FFB000), center shows score (48pt Cabinet Grotesk Bold) + "/100 · [tier]" (11pt Switzer, white 60%). Null state: em-dash + "No score yet" (11pt, white 40%)
  - Tier chip (conditional, scored only): pill, tier-colored border/bg — Elite (purple), Strong (green), Building (amber), Momentum (orange), Getting started (neutral)
  - Confidence chip: "N% confidence" (11pt Switzer Medium, white 75%, neutral pill)
  - Explainer line (14pt Switzer Regular, white 75%)
  - Component Breakdown (4 mini bars): Level progress (orange), Task velocity (gold), Streak consistency (purple), Goal diversity (forest-green) — each: label + value (11pt) + 6pt animated fill bar
  - Null-state fallback: reason string in a compact card ("Not enough activity yet to compute a Career Score")
- **Size**: Full-width minus 32pt x ~220pt

### Summary Stat Tile (Career variant)
- **Purpose**: All-time / period career facts — completed goals, XP earned, active days, applications
- **Data source**: API — GET /api/v1/career/analytics/summary
- **Visual treatment**: Gradient-bordered tile (1pt gradient ring per stat's theme color), --r-xl (~22pt inner), ink gradient fill, ambient corner glow on hover, bottom decorative wave flourish (shared with Wellbeing KPI tiles)
- **Content**: Label (11pt Cabinet Grotesk Bold, uppercase, +0.15em, white 60%) + icon tile (40pt, gradient fill per theme) + value (32pt Cabinet Grotesk Bold, tabular nums, white) + sub-label pill ("All-time" / "Last 30 days" / "Tracked")
- **Theme colors**: Completed goals (orange→deep-orange), Career XP (violet→purple), Active days (mint→forest-green), Applications (amber→gold)
- **Size**: 2-col grid mobile, 4-col grid desktop, ~140pt height per tile

### Consistency Heatmap
- **Purpose**: 182-day (~26 week) GitHub-contribution-style activity intensity grid
- **Data source**: API — GET /api/v1/career/analytics/trend?days=182 (aggregated: session count + progress-event count per day)
- **Visual treatment**: ink gradient card (150deg diagonal), --r-2xl (24pt approximated), 16–28pt padding, subtle top-right flowing wave decoration
- **Content**:
  - Header: activity icon tile (44pt, orange 12% bg) + "Consistency" (18pt Cabinet Grotesk Bold) + "Activity intensity over the last 6 months" (12pt Switzer, white 50%) + inline Less→More 5-swatch legend
  - Grid: 7 rows (Sun–Sat) × ~26 columns, cell size auto-fits container width (7–30pt), 4pt gap, rounded corners scaled to cell size, month separators + month labels above, day-of-month ticks (shown when cell ≥11pt)
  - **Intensity spectrum** (5 tiers, dim-ember → bright brand-orange): `#231b15` (none) → `#5c2d12` (≤25%) → `#9c3f12` (≤50%) → `#d4540f` (≤75%, subtle glow) → `#FF7A1A→#FF5E00` (>75%, stronger glow)
  - Summary row (5 cells, 2-col mobile / 5-col desktop): Active days (green), Current streak (orange, flame), Best streak (amber, award), Busiest day (purple, zap), Total events (orange, sparkles)
- **Gestures**: Hover/long-press a cell shows a native title tooltip with date + event count
- **Size**: Full-width minus 32pt x ~340pt (scales with cell auto-fit)

### Momentum Chart
- **Purpose**: 90-day continuous daily XP-earned trend — the "is this working" signal
- **Data source**: Derived from the same 182-day trend payload, clipped client-side to the most recent 90 days and gap-filled to a continuous daily series (API returns only days with events; the chart never shows a floating single point)
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 16–24pt padding. Recharts AreaChart, orange stroke (2.5pt) + orange-to-transparent vertical gradient fill, dashed grid (horizontal only), axis labels 10pt Switzer at reduced opacity
- **Content**:
  - Header: trending-up icon tile (40pt, orange 12% bg) + "Daily momentum" (18pt Cabinet Grotesk Bold) + "XP earned over the last 90 days" (12pt Switzer, white 50%) + right-aligned total XP (18pt Cabinet Grotesk Bold, tabular nums)
  - Chart: 210–240pt height, tooltip on hover (ink-900 card, "N XP · Earned")
  - Footer stats: peak day XP (flame icon, orange) + earning-days count (calendar icon, forest-green)
  - Empty state (no XP in period): dashed-border placeholder, "No XP earned in this period yet"
- **Size**: Full-width minus 32pt x ~340pt

### Badge Grid
- **Purpose**: Career milestone achievements, unlocked vs. locked
- **Data source**: API — GET /api/v1/career/badges
- **Visual treatment**: Wrapped pill row, 10pt gap. Unlocked: orange 35% border, orange 12% bg, orange glow shadow. Locked: white 7% border, white 2% bg, muted icon/text (60% desaturated)
- **Content per badge**: Icon (16pt, trophy/award/star/flame/zap/target/rocket/sparkles/activity/checkmark/trending — mapped from a badge-icon key) + title (12pt Switzer Medium). Hover/long-press title shows description + unlock date via native tooltip.
- **Header** (full variant, Analytics tab): "Badges" (18pt Cabinet Grotesk Bold) + "N of M unlocked" (12pt Switzer, white 50%)
- **Compact variant** (Resources tab): first 5 badges + "+N" overflow chip + "see all" link (orange, right-aligned) to Analytics tab
- **Empty state**: dashed placeholder, "No badges available yet"
- **Size**: Full-width, auto-height (wraps), ~40pt per badge pill

### Career Upgrade Banner
- **Purpose**: Paywall tease for premium career features, shown to free-tier users
- **Visual treatment**: Same Blurred Preview Treatment + orange border established on Screen 43 — 12pt gaussian blur on a preview of the locked feature, gradient overlay (transparent → ink-brown-800 40%), 1pt orange 30% border, --r-xl (28pt)
- **Content**: Star icon (16pt, orange) + "Unlock Career Pro" (16pt Cabinet Grotesk Bold) + feature list ("Skill-gap AI analysis, unlimited goals, resume review" — 13pt Switzer Regular, white 70%) + "upgrade" CTA (orange pill, right-aligned)
- **Gestures**: Tap anywhere on the card or the CTA pushes Screen 43 (Paywall / Upgrade Prompt) with `source: career_resources`
- **Visibility**: Hidden entirely for Career Pro subscribers
- **Size**: Full-width minus 32pt x ~120pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen title | Cabinet Grotesk | 700 (Bold) | 24pt | 1.1 | White #FFFFFF | "Your Growth Journey" |
| Screen subtitle | Switzer | 400 (Regular) | 14pt | 1.5 | White at 60% | Below title |
| Section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 11–12pt | 1.0 | Domain-context color | Uppercase, +0.12–0.18em tracking |
| Stat cell value | Cabinet Grotesk | 700 (Bold) | 20–32pt | 1.0 | White or forest-green | Tabular nums |
| Stat cell label | Switzer | 400 (Regular) | 11–12pt | 1.4 | White at 50–60% | |
| Level title | Cabinet Grotesk | 700 (Bold) | 15–16pt | 1.2 | White #FFFFFF | On milestone card / task panel header |
| Level zone name | Cabinet Grotesk | 600 (SemiBold) | 9pt | 1.2 | Gold #FFB84D / white 35% | Uppercase, +0.22em tracking |
| Level description | Switzer | 400 (Regular) | 11–13pt | 1.5 | White at 45% | |
| Threshold label | Switzer | 500 (Medium) | 13pt | 1.4 | White at 60% / orange when met | |
| Threshold value | Cabinet Grotesk | 700 (Bold) | 13pt | 1.4 | White at 55% / orange when met | Tabular nums |
| Resource title | Switzer | 500 (Medium) | 14pt | 1.4 | White at 90% | 2-line clamp |
| Resource verb | Cabinet Grotesk | 600 (SemiBold) | 11pt | 1.0 | Orange at 80% | Uppercase, "WATCH"/"READ"/"EXPLORE" |
| Mission label | Cabinet Grotesk | 700 (Bold) | 18pt | 1.2 | White #FFFFFF | Today's Mission / This Week headline |
| Score value | Cabinet Grotesk | 700 (Bold) | 24–48pt | 1.0 | White or em-dash white 50% | Tabular nums |
| Score label | Cabinet Grotesk | 600 (SemiBold) | 11pt | 1.0 | White at 45% | Uppercase, +0.1em |
| Score sub-line | Switzer | 400 (Regular) | 11pt | 1.4 | White at 45% | Reason or tier word |
| SIA card eyebrow | Cabinet Grotesk | 600 (SemiBold) | 11pt | 1.0 | Royal-purple #7F24FF | Uppercase, +0.18em |
| SIA message | Switzer | 400 (Regular) | 14pt | 1.5 | White at 85% | Up to 3 lines |
| Reflection question | Switzer | 400 (Regular) | 11pt | 1.4 | White at 55% | |
| Tile value | Cabinet Grotesk | 700 (Bold) | 32pt | 1.0 | White #FFFFFF | Tabular nums |
| Tile label | Cabinet Grotesk | 700 (Bold) | 11pt | 1.0 | White at 60% | Uppercase, +0.15em |
| Chart title | Cabinet Grotesk | 700 (Bold) | 18pt | 1.2 | White #FFFFFF | "Consistency", "Daily momentum" |
| Chart caption | Switzer | 400 (Regular) | 12pt | 1.4 | White at 50% | |
| Badge title | Switzer | 500 (Medium) | 12pt | 1.3 | White (unlocked) / white 50% (locked) | |
| CTA text | Switzer | 600 (SemiBold, Body Emphasis) | 14–15pt | 1.0 | White (on fill) / orange (on outline) | Buttons |
| Input placeholder | Switzer | 400 (Regular) | 14–16pt | 1.5 | White at 30–40% | |

---

## Composition & Visual Hierarchy

**Squint test**:
- Journey tab: the Level Path trail dominates the fold — its ascending diagonal wave immediately reads as "progress," with the current node's glowing pulse pulling the eye. The task panel expansion below it is the natural second stop.
- This Week tab: the two-card grid (Today's Mission / This Week) reads as a single unit at a glance — orange CTA on the left card is the clearest actionable element on the tab. The 4-cell scores strip below reads as a dashboard summary, secondary to the action cards.
- Analytics tab: the Career Score ring is the unmistakable focal point (large, centered, gradient-lit). The heatmap's orange-intensity grid is the second-strongest pull — its warm glow on high-activity cells naturally draws the eye across the 6-month span.
- Resources tab: video thumbnails (when present) are the strongest visual weight; text-only resource rows recede into a calm list. The upgrade banner's blur treatment deliberately signals "locked, secondary" even though it sits near the CTA hierarchy of the page.
- Forest-green appears sparingly and always at a moment of *completed* growth — the header accent line, the level-path completed-segment fill, and the "Career XP" stat value. It never competes with orange for attention.

**Spacing breakdown (8pt grid)**:
- Screen header height: 56pt
- Header to stat row: 16pt (--s-4)
- Stat row to goal picker / segmented tab: 16pt (--s-4)
- Segmented tab to content: 16pt (--s-4)
- Section eyebrow to card below: 12pt (--s-3)
- Between cards within a section: 16pt (--s-4)
- Between major sections: 24pt (--s-5)
- Card internal padding: 20–24pt
- Level Path stage height: ~420pt, node spacing derived from 5-point anchor grid (12/31/50/69/88% horizontal)
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Content cards (stat row, level path stage, task panel, score panel, heatmap, chart, badge grid)
- z-15: Level Path node glass cards on hover (elevate above neighboring nodes)
- z-20: SIA Accountability Card, Recovery Plan Card (both conditional overlays on the base content flow)
- z-30: Screen Header (backdrop-blur on scroll), Segmented Tab (sticky if scrolled past header)
- z-40: Bottom Tab Bar
- z-50: Create Goal Modal, Career Plan Modal, Reflection expansion overlay
- z-60: Confirmation dialogs (delete task, delete evidence)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base, all four tabs |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #34A853 at 60% | forest-green (secondary) | Register signature — 2pt |
| "New Goal" / primary CTAs | #FF5E00 | orange (primary) | All buttons, per 60% rule |
| Segmented tab active | #FF5E00 | orange (primary) | Navigation action |
| Level path completed segment | #34A853 | forest-green (secondary) | The one place green = the star |
| Level path current segment | #FF7A1A (glow variant) | orange (primary, glow tone) | Pulsing active trail |
| Level path locked segment | white at 12% | -- | Neutral, unreached |
| Career XP stat value | #34A853 | forest-green (secondary) | Growth metric emphasis |
| Threshold met fill | #FF5E00 | orange (primary) | Behavioral progress |
| SIA Accountability border | #7F24FF at 20% | royal-purple (AI) | Coach-originated nudge |
| SIA Accountability CTA | #7F24FF | royal-purple (AI) | "apply suggestion" |
| Weekly reflection accent | #7F24FF | royal-purple (AI) | SIA-set weekly framing |
| Career Score ring gradient | #FF5E00 → #FF7A45 → #FFB000 | orange → gold | Luxury gradient, not a 3rd brand hue |
| Elite tier chip | #7F24FF at 15% bg | royal-purple (AI) | Top Career Score tier only |
| Strong tier chip | #34A853 at 15% bg | forest-green (secondary) | 2nd tier |
| Building / Momentum tiers | amber / orange at 15% bg | -- | 3rd/4th tiers |
| Component: Level progress | #FF5E00 | orange (primary) | Score breakdown bar |
| Component: Task velocity | #FFB000 | gold (extension) | Score breakdown bar |
| Component: Streak consistency | #7F24FF | royal-purple (AI) | Score breakdown bar |
| Component: Goal diversity | #34A853 | forest-green (secondary) | Score breakdown bar |
| Heatmap spectrum | #231b15 → #FF5E00 | orange intensity scale | 5-tier dim-ember to bright orange |
| Momentum chart line/fill | #FF5E00 | orange (primary) | XP trend |
| Badge unlocked | #FF5E00 at 12% bg, orange border+glow | orange (primary) | |
| Badge locked | white at 2% bg, white 7% border | -- | Muted |
| Recovery Plan accent | #FF5E00 | orange (primary) | "Restart Small" |
| Obstacle Plan accent | #FF5E00 | orange (primary) | Icon + eyebrow |
| Upgrade Banner border | #FF5E00 at 30% | orange (primary) | Paywall tease |
| Primary text | #FFFFFF | white | Titles, values |
| Secondary text | white at 60–70% | -- | Descriptions, subtitles |
| Tertiary text | white at 45–50% | -- | Meta, captions |
| Quaternary text | white at 30–40% | -- | Placeholders, disabled |

**60/30/10 verification**: Orange dominates — segmented tab, all CTAs, current-level trail glow, threshold fills, heatmap spectrum, momentum chart, badge unlocked state, Career Score ring's primary hue. Forest-green is deliberately restrained to its register role — header accent line, completed level-path segments, Career XP stat value, one score-breakdown bar, one tier chip — a visible but secondary presence that reads as "growth achieved," never as an action driver. Royal-purple appears only at genuine SIA/AI moments — the Accountability Card, the weekly reflection sub-section, the Elite score tier, and one score-breakdown bar — capped at roughly 1–2 elements per tab, consistent with the 10% rule and the precedent set on Screen 46. Gold (#FFB84D) is an approved extension used only within the Level Path zone labels and the Career Score gradient, mirroring the Podium Colors exception pattern (Screen 39) — never used elsewhere on this screen.

---

## Interaction States

### Milestone Node
| State | Visual | Haptic |
|-------|--------|--------|
| Locked | Lock icon, empty ring, 60% opacity glass card, not tappable | -- |
| Unlocked/Current | Number shown, pulsing outer ring, glass card expanded by default | -- |
| Completed | Checkmark, full ring, idle shimmer sweep every ~9s | -- |
| Hover (desktop) | Card lifts (-12pt) + scales 1.03, node scales 1.08 | -- |
| Pressed | Node scales 0.95 | Light impact |
| Focus-visible | 2pt orange ring around node capsule, offset 2pt | -- |

### Today's Mission CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default (not done) | Orange fill, white text, plus icon | -- |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Logging | Spinner replaces icon, disabled | -- |
| Done | Outlined orange pill, checkmark icon, "Done for today," non-interactive | Success notification (on transition) |

### Threshold Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Below target | Orange fill at 70% opacity, standard label color | -- |
| Met | Full orange fill, orange label + value, inline checkmark | Light impact (on met transition) |

### SIA Accountability Card CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple pill, checkmark icon | -- |
| Applying | Spinner replaces icon, disabled, "Applying…" | -- |
| Applied | Success toast, card refreshes/dismisses if insight resolved | Success notification |

### Badge Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Locked | Dim icon/text, white 7% border | -- |
| Unlocked | Orange border/bg, glow shadow, full-opacity icon/text | -- |
| Hover/long-press | Native tooltip: description + unlock date | -- |

### Consistency Heatmap Cell
| State | Visual | Haptic |
|-------|--------|--------|
| No activity | Darkest ember tone, no glow | -- |
| Low–high activity | Graduated ember → bright orange, glow appears above 75% tier | -- |
| Hover/long-press | Scale 1.1, z-index raise, native tooltip with date + event count | -- |

### Career Upgrade Banner
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Blurred preview, orange border, "upgrade" CTA | -- |
| Pressed | Border brightens to 45%, scale(0.98) | Light impact |

---

## Gesture Map

### Gesture Map — Journey Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload goal, levels, metrics) |
| Tap | Goal picker pill | Switch active goal context |
| Tap | Segmented tab | Switch to This Week / Analytics / Resources |
| Tap | Milestone node (unlocked/current/completed) | Expand/collapse Level Task Panel |
| Hover | Milestone node (desktop) | Preview zone card expansion |
| Tap | "Log a session" | Log a focus-time session, re-evaluate level completion |
| Tap | Optional tasks expander | Reveal per-level task editor |
| Tap | SIA Accountability "apply suggestion" | Apply the patched commitment |
| Tap | Obstacle Plan header | Expand/collapse obstacle list |
| Tap | "Restart Small" | Log a capped recovery session |
| Tap | "New Goal" | Open Create Goal Modal |

### Gesture Map — This Week Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | "Mark complete" / "Start Today's Step" | Log today's mission, evaluate level completion |
| Tap | "Reflect on this week" | Expand weekly reflection form |
| Tap | "Save reflection" | Submit weekly reflection, re-evaluate level completion |
| Tap | Focus area section header | Navigate is inline — no push, just scroll anchor |
| Tap | "+" on Skills/Portfolio/Applications | Add a new tracked item |

### Gesture Map — Analytics Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Hover/long-press | Heatmap cell | Show date + event count tooltip |
| Hover | Momentum chart point | Show XP tooltip for that day |
| Long-press | Badge pill | Show description + unlock date tooltip |
| Tap | Component breakdown bar | (informational only, no navigation) |

### Gesture Map — Resources Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Resource row | Open link in new tab / system browser |
| Tap | Obstacle Plan header | Expand/collapse |
| Tap | "see all" (Badge Grid compact) | Switch to Analytics tab |
| Tap | Career Upgrade Banner | Push Paywall [43] |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-up: stat row (0ms), level path (80ms), first task panel if pre-expanded (160ms) | 400–550ms | ease-out ([0.22, 0.61, 0.36, 1]) |
| Segmented tab | Tap | Active indicator slides to new segment | 280ms | ease-out-soft |
| Tab content | Tab change | Content crossfade below segmented tab | 280ms | ease-out-soft |
| Milestone node card | Hover / current state | translateY 0 to -12pt + scale 1 to 1.03 | Spring (stiffness 320, damping 26) | Spring |
| Milestone progress ring | Level data load | strokeDashoffset animates from empty to current % | 900–1000ms | ease-out |
| Level path completed shimmer | Idle loop (completed nodes only) | Diagonal light sweep across glass capsule | 1100ms, repeats every 9s | ease-in-out |
| Current node pulse ring | Idle loop | boxShadow ring expands and fades | 1900ms, infinite | ease-out |
| Pedestal glow | Idle loop | Opacity breathes 0.45–0.95 (current: faster 2.2s / others: 6s) | 2200–6000ms, infinite | ease-in-out |
| Task panel | Node tap | Height 0 to auto + opacity 0 to 1 | 280ms | ease-out-soft |
| Threshold bar fill | Data load / session logged | Width animates to new % | 280ms | ease-out-soft |
| Score ring | Mount / data load | strokeDashoffset from full to current % | 1100ms | ease-out |
| Component breakdown bars | Mount | Width 0 to current %, staggered ~50ms each | 900ms | ease-out |
| Summary tile | Mount | translateY 16 to 0 + fade-in, staggered 50ms each | 550ms | ease-out ([0.22,0.61,0.36,1]) |
| Summary tile hover | Hover (desktop) | translateY 0 to -3pt, corner glow fades in | 250ms | ease-out |
| Heatmap cell | Mount | Scale 0.5 to 1 + fade-in, staggered by (week×0.01 + day×0.005)s | 180ms | ease-out |
| Momentum chart area | Mount / data change | Path draws in, dot appears on hover | 280ms | ease-out-soft |
| Badge pill | Mount | Scale 0.9 to 1 + fade-in, staggered 40ms each | 280ms | ease-out-soft |
| SIA Accountability card | Insight loaded | Fade-in + translateY 8 to 0 | 280ms | ease-out-soft |
| Obstacle Plan expand/collapse | Tap header | Height 0 to auto + fade, chevron rotates 0 to 180deg | 250ms | ease-out-soft |
| Weekly reflection form | Tap "Reflect on this week" | Fade-in + height animates | 280ms | ease-out-soft |
| XP Float (level/goal complete) | Session logged, level/goal completes | "+NN XP" floats up, orange glow pulse (shared RPG pattern) | 520–1200ms | ease-flow |
| Bottom sheets (Create Goal, Career Plan) | Open/dismiss | Slide up + backdrop fade / slide down + backdrop fade | 520ms / 280ms | ease-flow / ease-out-soft |

**Reduced-motion**: All idle loops (shimmer sweeps, pulsing rings, pedestal glow breathing, decorative wave flourishes) are dropped entirely under `prefers-reduced-motion`. Entrance animations collapse to instant opacity swaps. Progress rings and bars still animate their fill (state communication, not decoration) but at reduced duration (160ms).

**Screen transition**:
- **Enter**: Tab bar switch — content crossfade, no slide (root-level tab, not a stack push)
- **Exit**: Tab bar switch to sibling tab

---

## Empty States

### Day 1 — Journey Tab (no career goal)
- Level Path, stat row, and all conditional cards are replaced with a single centered empty state (shared `CareerEmpty` pattern): floating briefcase icon (28pt, orange, in a 64pt tile with pulsing glow), "No career goal yet" (18pt Cabinet Grotesk Bold), "Create your first goal and SIA will turn it into a motivating 5-level path with tasks, XP, and streaks." (14pt Switzer, white 50%, max 2 lines), "Add your first goal" CTA (orange pill).
- Career Stat Row and Goal Picker Pills are hidden entirely until a goal exists.
- Segmented tab remains visible but This Week / Analytics / Resources show their own scoped empty states if navigated to directly.

### Day 1 — This Week Tab (goal exists, no sessions logged)
- Today's Mission Card shows the "first step" framing by default (isFirstStep: true) — softer copy, no streak footnote.
- This Week Card shows 0/target with an empty progress bar; Execution Scores strip shows all 4 cells null ("Not enough data yet").
- No dashed-border empty-state block needed — the cards themselves communicate the zero-state honestly.

### Established user — Analytics Tab (insufficient data for score)
- Career Score Panel shows the null-state fallback card with the honest reason string instead of the ring — never a fabricated placeholder number.
- Consistency Heatmap and Momentum Chart still render (they're honest at zero — an all-dark grid / a flat zero line is itself informative), but the Momentum Chart's empty variant shows a dashed placeholder: "No XP earned in this period yet."
- Badge Grid shows its own dashed empty state: "No badges available yet" if the catalog has yet to sync.

### Resources Tab (no curated resources for current level)
- The Curated Resources List section renders nothing at all — no header, no placeholder card. This is a deliberate honesty rule (never show "no resources" clutter); the tab simply starts at the Obstacle Plan / Badge Grid sections.

### Multi-goal — Analytics / This Week scoped views
- If a user has multiple goals but the currently selected one is brand-new (no sessions), Analytics and This Week both read from that goal's own honest-null state rather than falling back to aggregate stats from other goals — scores never blend across goals.

---

## Motivation Adaptation

- **Low motivation**: Today's Mission Card leans harder into the "smallest version" framing regardless of streak length — copy stays gentle ("Start the smallest version — just N minutes"). Execution Scores strip de-emphasizes Discipline (reorders Recovery and Identity first) so the user isn't confronted with a low number first. Recovery Plan card becomes proactive — shown even before a lapse is detected, framed as "here if you need it." SIA Accountability nudges favor cadence-softening suggestions over "push harder" framing. Obstacle Plan is expanded by default instead of collapsed.
- **Medium motivation**: Standard experience as described. All sections visible in their default collapsed/expanded states. SIA Accountability nudges are balanced between softening and stretch suggestions.
- **High motivation**: Career Score Panel gets a "trend since last week" delta chip next to the tier badge. Consistency Heatmap defaults to showing the full 182-day window with the summary row expanded (5-col even on tablet). Execution Scores strip adds a 5th micro-metric: week-over-week momentum delta. SIA Accountability nudges lean toward stretch suggestions ("You're consistently early — want to raise your weekly target to 6 sessions?"). Badge Grid surfaces "next badge in reach" as a highlighted 6th tile even when locked, with a progress ring overlay.

---

## Cross-References

- **Navigates to**: Level Task Panel (inline expand, no push), Create Goal Modal (modal from "New Goal"), Career Plan Modal (modal from goal creation "show plan"), Paywall [43] (stack push from Career Upgrade Banner), SIA Chat [09] (tab switch from Accountability Card / Obstacle Plan "ask SIA" context), external resource links (system browser), Achievements screen (deep-link from badge detail, if a dedicated achievements screen is opened)
- **Navigates from**: Bottom Tab Bar "Career" (persistent root), Home Screen [12] via career action card, Goal Detail [14] via career domain tag chip (career-indigo #6366F1), SIA Chat [09] deep-link with goal context, Achievements badge tap (deep-link to Analytics tab)
- **Shared components with**: Screen 46 — Accountability (Segmented Control extended to 4 segments, Contract Filter Chip Row → Goal Picker Pills, SIA Coaching Note Card — Contextual Variant → SIA Accountability Card, AI Suggestion Card lightbulb-to-sparkles lineage, Dashed Border Add Button → Optional tasks expander), Screen 43 — Paywall (Blurred Preview Treatment, Easy-Out Link pattern for "maybe later" if added), Screen 32 — Career & Work Dashboard (RPG stat-card row lineage, Skills Snapshot Card, Deadline Row concepts folded into Focus Area sections), Screen 39 — Leaderboard (Podium Colors exception precedent for the gold #FFB84D Level Path / Score Ring extension), Screen 26 — Fitness (Domain Dashboard Header accent-line pattern, Calendar Heatmap lineage), Screen 30 — Finance (Monthly KPI Strip lineage → Summary Stat Tile, Spending Trend Chart lineage → Momentum Chart)
- **Patterns used**: Back Button (N/A — root tab, no back), 8-State Model, Segmented Control (Screen 15/38), Filter Chip Row (Screen 13), Section Eyebrow Label (Screen 12), Section Heading Row (Screen 26), Expandable/Collapsible Section (Screen 14), Stat Tile (Screen 26), Progress Ring (Screen 12), XP Earned Badge / XP Float Animation (Screen 27/32), RPG Skill Badge lineage, Domain Dashboard Header accent-line convention (Screen 26), Modal Presentation (Batch 1), Brand CTA Button / In-Card CTA Button (Screen 02/26), Dashed Border Add Button (Screen 46), Blurred Preview Treatment (Screen 43), Calendar Heatmap (Screen 38/36), Spending Trend Chart (Screen 30/14)
- **Patterns established**: Level Path (Milestone Trail) — 5-node ascending wave-path progression with zone storytelling and completion-state trail coloring, Milestone Node (locked/current/completed glass-capsule states with progress ring), Level Task Panel (behavioral threshold bars + curated resources + optional tasks), Threshold Bar (value/target with met-state color flip), Resource Row (video/article/search curated-link variants, honest-empty), Today's Mission Card (first-step vs. mission framing), This Week Card (cadence tracker + weekly reflection sub-flow), Execution Scores Strip (4-axis honest-null behavioral scoring), SIA Accountability Card (pattern-nudge with one-tap apply), SIA Obstacle Plan (named-obstacle-to-counter-move mapping, collapsible), Recovery Plan Card (non-punitive restart guidance), Career Score Panel (composite score ring + component breakdown, honest-null), Consistency Heatmap — Career variant (182-day, orange-ember spectrum), Momentum Chart (continuous-series XP area chart), Badge Grid (full + compact variants), Career Upgrade Banner (career-scoped paywall tease), Register-vs-Action color separation convention (forest-green = growth chrome, orange = every action, documented explicitly for future domain screens using a non-orange register)
