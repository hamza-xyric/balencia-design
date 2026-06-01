# Screen Design: Streak Details

**Screen**: 59 of 73
**File**: 59-streak-details.md
**Register**: Gamification Mode (brand-orange #FF5E00)
**Primary action**: view and manage activity streaks
**Tab**: Me
**Navigation**: Stack depth 2-3 from Me tab root (Me Main [17] → RPG Character [19] → Streak Details, or Home [12] → Streak Details). Entry from RPG Character [19] stats summary "day streak" tap, Home [12] streak widget tap, or Habits [38] streak flame tap. Exit via back button to source screen, or forward to Leaderboard [39] via streak leaderboard section.

---

## Purpose

The Streak Details screen is the motivational engine of Balencia's gamification system — the place where consistency becomes visible, rewarding, and strategic. It answers "how consistent have I been, and what do I get for staying consistent?" Users come here to see their current streak visualized across a calendar, understand how streak multipliers amplify their XP earnings, plan ahead with streak freezes for rest days, and track progress toward milestone rewards. The screen reinforces that showing up daily — even imperfectly — is the most powerful driver of life improvement. SIA plays a supporting role through contextual coaching notes that celebrate consistency or gently encourage recovery after a broken streak. Free tier shows current streak and calendar; XP multiplier system, freeze management, and streak leaderboard require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Current streak hero — large flame icon with streak count, the emotional anchor and identity display
2. Streak calendar — month view showing active, frozen, and missed days at a glance
3. XP multiplier card — current streak multiplier level and progress to next tier
4. Recovery multiplier card — rested XP bonus status and explanation
5. Streak freeze card — available freezes and "use freeze" action (the primary interactive element)
6. Streak milestones — progression ladder with earned and upcoming rewards
7. Streak leaderboard — social context among friends and globally
8. Streak history — past streaks for reflection and pattern recognition

**User flow**:
- **Arrives from**: RPG Character [19] via stats summary "day streak" tap (stack push), Home [12] via streak widget or streak-related action card (stack push), Habits [38] via streak flame tap (stack push), Celebration Overlay [42] via streak milestone achievement "view details" (stack push), SIA Chat [09] via deep-link when SIA mentions streak status
- **Primary exit**: Back to source screen (stack pop)
- **Secondary exits**: Leaderboard [39] via streak leaderboard "see full leaderboard" link (stack push), Habits [38] via "build your streak" CTA in empty state (stack push), SIA Chat [09] via SIA coaching note tap (tab switch with context)

---

## Layout

**Scroll behavior**: ScrollView (mixed content — hero card, calendar, cards, list sections; not homogeneous enough for FlatList)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]     "Streak details"     │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌═════════════════════════════┐   │
│  ║           🔥                ║   │  ← Current Streak Hero
│  ║          42                 ║   │     flame icon 64pt
│  ║       days strong           ║   │     count: 36pt Bold
│  ║                             ║   │
│  ║  longest: 67 days           ║   │     longest comparison
│  ║  ━━━━━━━━━━━━━━░░░░░░░     ║   │     progress bar toward
│  ║  63% of longest streak      ║   │     personal record
│  └═════════════════════════════┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  ◀  May 2026  ▶            │   │  ← Streak Calendar
│  │  M  T  W  T  F  S  S       │   │     month view
│  │ [●][●][●][●][●][❄][●]      │   │     green = active
│  │ [●][●][●][●][●][●][●]      │   │     blue = freeze used
│  │ [●][●][○][●][●][●][●]      │   │     grey = missed
│  │ [●][●][●][●][ ][ ][ ]      │   │
│  │                             │   │
│  │  ● active  ❄ freeze  ○ miss │   │  ← Legend
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  ⚡ 1.5x XP multiplier     │   │  ← XP Multiplier Card
│  │  7-day streak bonus active  │   │
│  │  ━━━━━━━━━━━━━░░░░░░░░     │   │     progress to next tier
│  │  next: 2.0x at 30 days     │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  💤 Recovery multiplier     │   │  ← Recovery Multiplier Card
│  │  Rest day bonus: 1.3x XP   │   │
│  │  tomorrow                   │   │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │   │
│  │  Take a deliberate rest day │   │
│  │  and earn boosted XP on     │   │
│  │  your next active day.      │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  ❄ Streak freezes           │   │  ← Streak Freeze Card
│  │  2 available                │   │
│  │                             │   │
│  │  Use a freeze to protect    │   │
│  │  your streak on rest days.  │   │
│  │  Earn 1 freeze per 7 days. │   │
│  │                             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │    use freeze        │   │   │  ← CTA button (orange)
│  │  └─────────────────────┘   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  MILESTONES                         │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ ✓  7 days    +50 XP        │   │  ← Earned milestone
│  │ ✓ 14 days   +100 XP        │   │
│  │ ✓ 30 days   +250 XP        │   │
│  │ ○ 60 days   +500 XP  🔒   │   │  ← Upcoming milestone
│  │ ○ 90 days  +1000 XP  🔒   │   │
│  │ ○ 180 days +2500 XP  🔒   │   │
│  │ ○ 365 days +5000 XP  🔒   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  STREAK LEADERBOARD                 │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ #1  [av] Sarah    98 days  │   │  ← Top streakers
│  │ #2  [av] Ahmed    84 days  │   │
│  │ #3  [av] Lisa     72 days  │   │
│  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │   │
│  │ #12 [av] You      42 days  │   │  ← User's position
│  │                             │   │
│  │       see full leaderboard  │   │  ← Link (orange)
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  STREAK HISTORY                     │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ 42 days  (active)           │   │  ← Current streak
│  │ Apr 10 – present            │   │
│  ├─────────────────────────────┤   │
│  │ 67 days  ★ personal best    │   │  ← Past streak (best)
│  │ Jan 2 – Mar 9, 2026        │   │
│  │ ended: travel               │   │
│  ├─────────────────────────────┤   │
│  │ 23 days                     │   │
│  │ Nov 8 – Nov 30, 2025       │   │
│  │ ended: illness              │   │
│  └─────────────────────────────┘   │
│                                     │
│  32pt bottom padding                │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "streak details" title

2. **Current Streak Hero Card** — ~200pt
   - Purpose: Emotional anchor — the user's streak identity at a glance
   - Content: Flame icon, streak count, longest streak comparison, progress bar

3. **Streak Calendar Card** — ~240pt
   - Purpose: Monthly view of streak consistency
   - Content: Month navigator, 7x5 day grid with colored indicators, legend

4. **XP Multiplier Card** — ~96pt
   - Purpose: Show current streak-driven XP bonus and next tier
   - Content: Multiplier value, tier description, progress bar to next tier

5. **Recovery Multiplier Card** — ~96pt
   - Purpose: Explain the rested XP bonus earned by taking deliberate rest days
   - Content: Recovery multiplier status, explanation, active/inactive state

6. **Streak Freeze Card** — ~160pt
   - Purpose: Manage streak protection (the primary interactive card)
   - Content: Available freeze count, rules explanation, "use freeze" CTA

7. **Milestones Section** — ~320pt (eyebrow + 7 rows)
   - Purpose: Streak reward progression ladder
   - Content: 7 milestone tiers with XP rewards, earned/locked states

8. **Streak Leaderboard Section** — ~240pt
   - Purpose: Social motivation through streak comparison
   - Content: Top 3 streakers, user's own position, link to full leaderboard

9. **Streak History Section** — variable (~80pt per entry)
   - Purpose: Record of past streaks with context
   - Content: Active streak + past streaks with dates, length, break reason

10. **Bottom Spacing** — 32pt

---

## Components

### Screen Header
- **Purpose**: Title and back navigation
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header. ink-900 background, 44pt height.
- **Content**:
  - Back button: standard pattern (left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target)
  - Title: "streak details" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to source screen
- **Size**: full-width x 44pt

### Current Streak Hero Card
- **Purpose**: The emotional centerpiece — makes the user's streak feel significant and earned. The flame + large count is the "trophy display" that reinforces daily commitment.
- **Data source**: GET /api/streaks/status — current_streak, longest_streak, last_activity_date
- **Visual treatment**: Full-width minus 32pt (16pt margins). ink-brown-800 background, border-radius 24pt (--r-xl). 1pt border white at 8%. Subtle warm shadow (--shadow-warm). Internal padding 24pt. Subtle orange radial glow from center top (rgba(255, 94, 0, 0.08)) — creating a warm ember atmosphere behind the flame.
- **Content** (centered layout):
  - Flame icon: 64pt, animated with subtle flicker. Orange (#FF5E00) fill with warm glow (--glow-orange). The flame is the visual anchor — largest element on screen.
  - Streak count: 36pt Sora Bold, white, center-aligned, 12pt below flame. tabular-nums. If streak >= 100, use 32pt to fit.
  - Streak label: "days strong" — 16pt Sora Regular, white at 60%, center-aligned, 4pt below count. Brand period omitted here for cleaner read.
  - Divider: 1pt white at 5%, full card width minus 48pt, 20pt vertical margin above and below.
  - Longest streak comparison: "longest: 67 days" — 14pt Sora Regular, white at 50%, center-aligned.
  - Progress bar toward longest: full card width minus 48pt, 6pt height, --r-pill. Track: white at 8%. Fill: orange (#FF5E00). Shows current streak as percentage of longest.
  - Progress label: "63% of longest streak" — 12pt Sora Regular, white at 40%, center-aligned, 6pt below bar.
  - If current streak IS the longest: replace comparison with "new personal best" in Forest Green (#34A853), 14pt Sora Semibold. Progress bar fills to 100% green. Subtle green glow replaces orange glow.
- **Variants**:
  - Active streak (default): orange flame, warm glow
  - Personal best active: green flame icon, green progress bar, "new personal best" label
  - Streak at 0: dimmed flame (white at 20%), "0 days" count, "start a new streak today" replaces comparison section, no progress bar
- **Gestures**: Not tappable (read-only display)
- **Size**: full-width minus 32pt x ~200pt

### Streak Calendar Card
- **Purpose**: Visualize streak consistency at a monthly level — which days were active, which used a freeze, which were missed. Gives the user a tangible sense of their daily commitment pattern.
- **Data source**: GET /api/streaks/calendar — array of dates with status (active, freeze, missed, future)
- **Visual treatment**: ink-brown-800 card, border-radius 20pt (--r-lg), 1pt border white at 8%, 16pt padding. 16pt horizontal margins.
- **Content**:
  - Month navigator: left chevron (14pt, white at 40%, 44x44pt touch target) + month/year label ("May 2026" — 16pt Sora Semibold, white, center-aligned) + right chevron (same spec). Height: 44pt.
  - Day-of-week labels: M, T, W, T, F, S, S — 11pt Sora Regular, white at 30%, centered above each column. 8pt below navigator.
  - Calendar grid: 7 columns, 4-6 rows depending on month.
    - Cell size: 36pt diameter circles, 4pt gap between cells.
    - Active day: Forest Green (#34A853) fill at 100% opacity, white checkmark (10pt, 1.5pt stroke) centered. This is a "completed" day.
    - Freeze used: #3B82F6 (cool blue) fill at 60% opacity, snowflake icon (10pt, white at 80%) centered. Distinct from active — the user knows they didn't earn it, but were protected.
    - Missed day: white at 8% fill, no icon. Subtle and non-judgmental — missed days are quiet, not red or alarming.
    - Today (incomplete): 1.5pt orange (#FF5E00) dashed border, no fill. Indicates "still time to complete today."
    - Today (complete): green fill + orange solid border (1.5pt).
    - Future days: white at 3% fill (barely visible).
  - Legend row: 12pt below grid. Three items inline: green dot (8pt) + "active" (12pt Regular, white at 40%), blue dot + "freeze" (same), grey dot + "missed" (same). 16pt gap between items. Center-aligned.
- **Variants**:
  - Populated month (default)
  - Empty month (new user): all cells white at 3%, legend still visible. No special message — the calendar itself is the invitation.
  - Current month (with future days): future cells barely visible, today highlighted.
- **Gestures**: Tap left/right chevron to navigate months. Tap individual day cell for tooltip showing that day's detail ("completed 6 of 8 habits" or "freeze used" or "missed — no activity logged"). Tooltip: small floating card above cell, ink-brown-800, --r-sm, 13pt Regular, auto-dismiss after 3s.
- **Size**: full-width minus 32pt x ~240pt

### XP Multiplier Card
- **Purpose**: Show the tangible XP reward benefit of maintaining a streak — reinforces the "why" of consistency through the RPG system.
- **Data source**: user_xp_transactions — streak_day, multiplier, base_xp. Derived from current streak length.
- **Visual treatment**: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, 16pt padding. 16pt horizontal margins.
- **Content**:
  - Lightning bolt icon: 20pt, orange (#FF5E00), left-aligned inline with multiplier text.
  - Current multiplier: "1.5x XP multiplier" — 17pt Sora Semibold, white, 8pt right of icon.
  - Tier description: "7-day streak bonus active" — 13pt Sora Regular, white at 50%, 4pt below multiplier text. Left-aligned with multiplier text.
  - Progress bar: full card width minus 32pt, 6pt height, --r-pill, 12pt below description. Track: white at 8%. Fill: orange (#FF5E00).
  - Next tier label: "next: 2.0x at 30 days" — 12pt Sora Regular, white at 40%, 6pt below bar.
  - **Multiplier tiers** (aligned with `_xp-reward-table.md`):
    - < 7 days: 1.0x (no bonus — bar shows progress to 7)
    - 7-29 days: 1.5x ("7-day streak bonus active")
    - 30+ days: 2.0x ("30-day streak bonus active" — maximum streak multiplier)
  - Total XP multiplier cap is 2.0x (streak multiplier stacks with recovery, synergy, and squad multipliers but total never exceeds 2.0x — see `_xp-reward-table.md` for full stack).
  - If at max tier (30+ days): "maximum streak multiplier — legendary consistency" replaces next tier label, in Forest Green, 13pt Semibold.
- **Variants**:
  - Active multiplier (streak >= 7): orange fill, current tier displayed
  - No multiplier (streak < 7): "earn 1.5x XP bonus at 7 days" — progress bar shows days toward 7
  - Max multiplier (30+ days): green progress bar fill, green lightning icon
- **Gestures**: Not tappable (informational)
- **Size**: full-width minus 32pt x ~96pt

### Recovery Multiplier Card
- **Purpose**: Explains the "rested XP" mechanic — users who take a deliberate rest day (marked as rest or via streak freeze) earn a 1.3x XP bonus on their next active day. This encourages healthy rest without punishing breaks and adds strategic depth to the streak system.
- **Data source**: GET /api/streaks/status — recovery_multiplier_active (boolean), next_active_bonus (1.3x or null)
- **Visual treatment**: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, 16pt padding. 16pt horizontal margins.
- **Content**:
  - Header row: moon icon (20pt, #818CF8 sleep-indigo) + "recovery multiplier" — 17pt Sora Semibold, white, 8pt right of icon.
  - Status line:
    - Active: "1.3x XP bonus active today" — 14pt Sora Semibold, Forest Green (#34A853). Green dot (8pt) pulsing inline before text.
    - Inactive: "rest day bonus: 1.3x XP tomorrow" — 14pt Sora Regular, white at 60%.
  - Divider: 1pt white at 5%, full card width minus 32pt, 12pt vertical margins.
  - Explanation: "take a deliberate rest day (or use a streak freeze) and earn boosted XP on your next active day. stacks with streak multiplier up to the 2.0x total cap." — 14pt Sora Regular, white at 50%.
- **Variants**:
  - Inactive (default): moon icon at 50% opacity, explanation visible
  - Active today: moon icon at 100%, green status line pulsing, explanation collapses to single line "enjoy your boosted day."
  - Not eligible (no rest day taken): same as inactive
- **Gestures**: Not tappable (informational)
- **Size**: full-width minus 32pt x ~96pt

### Streak Freeze Card
- **Purpose**: The primary actionable element on this screen — allows users to strategically protect their streak during planned rest days. This feature reduces anxiety about streak breaks and makes the system feel fair.
- **Data source**: GET /api/streaks/status — available_freezes count. POST /api/streaks/freeze to use.
- **Visual treatment**: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, 20pt padding. 16pt horizontal margins. This card has slightly more padding than others because it contains the primary CTA.
- **Content**:
  - Header row: snowflake icon (20pt, #3B82F6 cool blue) + "streak freezes" — 17pt Sora Semibold, white, 8pt right of icon.
  - Available count: "2 available" — 14pt Sora Semibold, white at 70%, right-aligned in header row. Count number in white at 100%.
  - Divider: 1pt white at 5%, full card width minus 40pt, 12pt vertical margins.
  - Rules explanation (3 lines):
    - "use a freeze to protect your streak on rest days." — 14pt Sora Regular, white at 60%.
    - "you earn 1 freeze for every 7 consecutive active days." — 14pt Sora Regular, white at 60%, 4pt below.
    - "maximum 3 freezes stored at a time." — 14pt Sora Regular, white at 60%, 4pt below.
  - "use freeze" button: In-Card CTA Button pattern. Full card content width. Height: 48pt. Background: orange (#FF5E00). Text: "use freeze" — 16pt Sora Semibold, white, center-aligned. --r-pill. 16pt above card bottom padding.
  - If 0 freezes available: button shows disabled state (40% opacity), text changes to "no freezes available". Below button: "earn your next freeze in N days" — 12pt Sora Regular, white at 40%, center-aligned.
- **Freeze confirmation**: Tapping "use freeze" presents a lightweight confirmation bottom sheet (not a full modal):
  - Sheet height: ~200pt, ink-900 bg, --r-lg top corners, drag handle.
  - Content: "use 1 streak freeze?" — 17pt Sora Semibold, white. "this will protect today's streak. you'll have N freezes remaining." — 14pt Regular, white at 60%. Two buttons: "confirm" (orange CTA, 48pt) + "cancel" (ghost button, 48pt, white at 50% text).
- **Variants**:
  - Available (1-3 freezes): orange CTA active
  - Empty (0 freezes): CTA disabled, "earn next freeze" label visible
  - Already used today: CTA disabled, "freeze active today" in cool blue, snowflake indicator
- **Gestures**: Tap "use freeze" button to present confirmation sheet. Drag to dismiss confirmation.
- **Size**: full-width minus 32pt x ~160pt

### Streak Milestones Section
- **Purpose**: A progression ladder showing what rewards the user has earned and what's coming — drives long-term streak commitment by making future goals visible.
- **Data source**: GET /api/streaks/rewards — earned milestones, upcoming milestones with XP values
- **Visual treatment**:
  - Eyebrow: "milestones" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from freeze card.
  - Milestones list: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, no internal padding (rows handle their own). 16pt horizontal margins.
  - Each milestone row (56pt height, 16pt horizontal padding):
    - Left indicator (24pt wide area):
      - Earned: green circle (20pt, #34A853 fill, white checkmark 10pt)
      - Next up (closest unearned): orange circle (20pt, #FF5E00 border 2pt, no fill, pulsing glow)
      - Locked: white at 10% circle (20pt), lock icon (10pt, white at 30%)
    - Milestone label: "7 days" / "14 days" / "30 days" / "60 days" / "90 days" / "180 days" / "365 days" — 15pt Sora Semibold, white (earned) or white at 50% (locked), 12pt right of indicator.
    - XP reward: "+50 XP" / "+100 XP" / "+250 XP" / "+500 XP" / "+1,000 XP" / "+2,500 XP" / "+5,000 XP" — 14pt Sora Semibold, right-aligned, 16pt from right edge. Earned: Forest Green (#34A853). Locked: white at 30%. tabular-nums.
    - Connecting line: 2pt vertical line between indicators, connecting earned milestones (green) and unearned (white at 8%). Line runs 8pt below one indicator to 8pt above the next. Creates a visual "progress path."
    - Divider: 1pt white at 5% between rows (except last).
  - **Milestone progression labels** (beneath each milestone row, only for the "next up" milestone):
    - "N more days to go" — 12pt Sora Regular, orange (#FF5E00), 36pt from left (aligned with milestone label), 2pt below row.
- **Variants**:
  - Populated (mix of earned and locked)
  - All earned (365-day streak): all checkmarks green, "legendary" badge appears at bottom — 13pt Sora Semibold, orange, center-aligned.
  - None earned (streak < 7): first milestone pulsing as "next up", rest locked
- **Gestures**: Tap earned milestone row → brief toast showing "earned on [date]" (auto-dismiss 2s). Locked milestones not tappable.
- **Size**: full-width minus 32pt x variable (~320pt for 7 milestones)

### Streak Leaderboard Section
- **Purpose**: Social motivation — see where the user's streak ranks among friends and globally. Creates friendly competition around consistency.
- **Data source**: GET /api/streaks/leaderboard — top 3 streakers + user's rank
- **Visual treatment**:
  - Eyebrow: "streak leaderboard" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from milestones section.
  - Leaderboard card: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, no internal padding. 16pt horizontal margins.
  - Top 3 rows (64pt each, 16pt horizontal padding):
    - Rank: "#1" / "#2" / "#3" — 17pt Sora Bold. #1: gold (#FFD700), #2: silver (#C0C0C0), #3: bronze (#CD7F32). 24pt wide area.
    - Avatar: 32pt circle, --r-pill, 8pt right of rank. Placeholder: first initial on ink-brown-800 circle.
    - Name: 15pt Sora Semibold, white, 10pt right of avatar. Single line, truncated.
    - Streak days: "98 days" — 14pt Sora Semibold, white at 70%, right-aligned, 16pt from right edge. Flame icon (12pt, orange) inline before count.
    - Divider: 1pt white at 5% between rows.
  - Separator: dashed line (1pt, white at 8%, 4pt dash, 4pt gap) if user is not in top 3.
  - User's own row (64pt, 16pt horizontal padding):
    - Left border accent: 3pt orange (#FF5E00), full row height, left edge.
    - Rank: "#12" — 17pt Sora Bold, white.
    - Avatar: 32pt circle, user's photo or initial on orange bg.
    - Name: "You" — 15pt Sora Semibold, white.
    - Streak days: "42 days" — 14pt Sora Semibold, white at 70%, flame icon inline.
  - "see full leaderboard" link: 14pt Sora Semibold, orange (#FF5E00), center-aligned, 44pt touch target, 12pt below last row. Navigates to Leaderboard [39] with streak tab pre-selected.
- **Variants**:
  - Populated (user has rank): default display
  - User is top 3: own row appears in top 3 with orange left border accent, no separator, no duplicate row below
  - Friends only: if user has few friends, show "invite friends to compare streaks" — 13pt Sora Regular, white at 40%, center-aligned
- **Gestures**: Tap rank row → limited user profile bottom sheet (same pattern as Leaderboard [39]). Tap "see full leaderboard" → stack push to Leaderboard [39].
- **Size**: full-width minus 32pt x ~240pt

### Streak History Section
- **Purpose**: Record of past streaks providing reflection and pattern recognition — users can see what caused breaks and understand their consistency patterns over time.
- **Data source**: GET /api/streaks/history — past streaks with start_date, end_date, length, break_reason (optional)
- **Visual treatment**:
  - Eyebrow: "streak history" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from leaderboard section.
  - History rows: ink-brown-800 card, --r-lg (20pt), 1pt border white at 8%, no internal padding. 16pt horizontal margins.
  - Each history row (~76pt, 16pt horizontal padding):
    - Streak length: "42 days" — 17pt Sora Bold, white. tabular-nums.
    - Status badge (inline with length, 8pt right):
      - Active: "active" — 11pt Sora Semibold, orange (#FF5E00) text on orange at 15% bg, --r-pill, 8pt horizontal / 4pt vertical padding.
      - Personal best: gold star icon (14pt, #FFD700) + "personal best" — 11pt Sora Semibold, #FFD700 text on #FFD700 at 15% bg, --r-pill.
      - Past (no distinction): no badge.
    - Date range: "Apr 10 – present" (active) or "Jan 2 – Mar 9, 2026" (past) — 13pt Sora Regular, white at 50%, 4pt below length.
    - Break reason (past streaks only, if provided): "ended: travel" — 12pt Sora Regular, white at 40%, 4pt below date range. Italic style.
    - Divider: 1pt white at 5% between rows (except last).
  - Shows most recent 5 streaks. "show earlier streaks" link at bottom if more exist — 14pt Sora Semibold, orange, center-aligned, 44pt touch target.
- **Variants**:
  - Populated (1+ past streaks)
  - Active streak only (no history): single row with "active" badge, no "show earlier" link.
  - Empty (new user, no streak ever): "your streak journey starts with day one." — 14pt Sora Regular, white at 40%, center-aligned, 32pt vertical padding.
- **Gestures**: Tap "show earlier streaks" to load more rows. Rows are not tappable (informational).
- **Size**: variable (eyebrow + rows x ~76pt)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | All cards — hero, calendar, multiplier, freeze, milestones, leaderboard, history |
| Card borders | white at 8% | — | Standard glass edge |
| Hero flame icon | #FF5E00 | brand-orange | 60% role — the screen's visual anchor |
| Hero flame glow | rgba(255, 94, 0, 0.08) | glow-orange | Subtle radial atmosphere |
| Hero progress bar fill | #FF5E00 | brand-orange | 60% role — progress toward longest |
| Calendar active day | #34A853 | forest-green | 30% role — completed days |
| Calendar freeze day | #3B82F6 | cool-blue | Exception — freeze indicator distinct from active/brand |
| Calendar missed day | white at 8% | — | Non-judgmental, quiet |
| Calendar today border | #FF5E00 | brand-orange | 60% role — today indicator |
| Calendar legend dots | per type | green, blue, grey | Identification |
| XP multiplier lightning | #FF5E00 | brand-orange | 60% role — reward emphasis |
| XP multiplier bar fill | #FF5E00 | brand-orange | 60% role — tier progress |
| Recovery moon icon | #818CF8 | sleep-indigo | Thematic — rest/recovery concept |
| Recovery active dot | #34A853 | forest-green | 30% role — active bonus indicator |
| Recovery active text | #34A853 | forest-green | 30% role — bonus status |
| Freeze snowflake icon | #3B82F6 | cool-blue | Exception — freeze identity color |
| Freeze CTA button | #FF5E00 | brand-orange | 60% role — primary action |
| Milestone earned checkmark | #34A853 | forest-green | 30% role — completion |
| Milestone earned XP text | #34A853 | forest-green | 30% role — reward earned |
| Milestone "next up" ring | #FF5E00 | brand-orange | 60% role — pulsing next target |
| Milestone locked circle | white at 10% | — | Inactive |
| Milestone progress line | #34A853 (earned) / white at 8% (locked) | — | Path visualization |
| Leaderboard #1 rank | #FFD700 | gold | Podium exception (from [39]) |
| Leaderboard #2 rank | #C0C0C0 | silver | Podium exception |
| Leaderboard #3 rank | #CD7F32 | bronze | Podium exception |
| Leaderboard own row border | #FF5E00 | brand-orange | 60% role — "this is you" |
| Leaderboard streak flame | #FF5E00 | brand-orange | 60% role — streak emphasis |
| "see full leaderboard" link | #FF5E00 | brand-orange | 60% role — interactive |
| History active badge bg | #FF5E00 at 15% | brand-orange | Active streak indicator |
| History personal best star | #FFD700 | gold | Podium exception — achievement accent |
| Primary text (counts, names) | white 100% | — | High contrast |
| Secondary text (labels) | white at 60-70% | — | Supporting info |
| Tertiary text (meta) | white at 50% | — | Descriptions |
| Quaternary text (legend, hints) | white at 40% | — | Lowest priority text |
| Active tab (Me) | #FF5E00 | brand-orange | 60% role — tab indicator |

**60/30/10 verification**: Orange dominates through the hero flame icon and glow, hero progress bar, calendar today border, XP multiplier icon and bar, freeze CTA button, milestone "next up" ring, leaderboard flames and own-row border, link text, history active badge, and active tab. Green appears on calendar active days, milestone earned checkmarks, milestone earned XP text, and milestone progress line — all in the "completion/success" role. Purple is absent from this screen — correct, as this is a user-driven gamification display, not SIA-driven content. Cool blue (#3B82F6) appears only on freeze-related elements (snowflake, freeze calendar days) as a contained thematic exception for the "protection/rest" concept, similar to how podium colors are a contained leaderboard exception. Podium gold/silver/bronze on leaderboard top 3 only. Domain colors absent (this screen is domain-agnostic). Ratio holds.

---

## Interaction States

### Back Button
Per standard pattern (Screen 04 / _shared-patterns.md).

### Month Navigator Chevrons (Calendar)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 14pt chevron, white at 40% | — |
| Pressed | White at 70%, scale(0.90) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.3 opacity (e.g., can't go past current month forward) | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Calendar Day Cell
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Colored circle per status (green/blue/grey) | — |
| Pressed | scale(1.15), tooltip appears above cell | Light impact |
| Focus-visible | 2pt orange ring around cell | — |
| Disabled | Future days — white at 3%, not tappable | — |
| Loading | Shimmer on all cells during month data fetch | — |
| Error | — | — |
| Success | — | — |

### "Use Freeze" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) fill, white text, --r-pill | — |
| Pressed | Darker orange (#E05500), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (no freezes available or already used today) | — |
| Loading | White spinner replaces text (processing freeze request) | — |
| Error | Red border flash, "freeze failed" text briefly | Error notification |
| Success | Green glow (600ms), text changes to "freeze activated" briefly, then disabled state | Success notification |

### Confirmation Sheet "Confirm" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | — | — |
| Loading | White spinner | — |
| Error | Red flash | Error notification |
| Success | Green glow (600ms), sheet auto-dismisses | Success notification |

### Confirmation Sheet "Cancel" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, white at 50% text | — |
| Pressed | White at 10% bg flash, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Milestone Row (Earned)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Green checkmark, white text, green XP amount | — |
| Pressed | Row bg flashes white at 3%, scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring around row | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |
| Success | Toast appears with "earned on [date]" | — |

### Leaderboard Rank Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard content layout | — |
| Pressed | Row bg white at 5%, scale(0.99) | Light impact |
| Focus-visible | 2pt orange ring around row | — |
| Disabled | — | — |
| Loading | Skeleton shimmer per row | — |
| Error | — | — |
| Success | — | — |

### "See Full Leaderboard" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text, 14pt Sora Semibold | — |
| Pressed | Orange at 60%, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### "Show Earlier Streaks" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text, 14pt Sora Semibold | — |
| Pressed | Orange at 60%, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | 0.4 opacity (all streaks loaded) | — |
| Loading | Text replaced with small spinner (16pt, orange) | — |
| Error | — | — |
| Success | — | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop to source screen |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Tap | Calendar day cell | Show day detail tooltip |
| Tap | Month chevrons | Navigate month forward/backward |
| Tap | "use freeze" button | Present freeze confirmation sheet |
| Tap | Confirmation "confirm" | Execute freeze, dismiss sheet |
| Tap | Confirmation "cancel" | Dismiss sheet |
| Drag down | Confirmation sheet handle | Dismiss sheet |
| Tap | Earned milestone row | Show "earned on [date]" toast |
| Tap | Leaderboard rank row | Open limited user profile sheet |
| Tap | "see full leaderboard" | Stack push to Leaderboard [39] |
| Tap | "show earlier streaks" | Load more history rows |
| Pull down | ScrollView top | Pull-to-refresh (reload all streak data) |
| Vertical scroll | Full screen | ScrollView scroll |

### Haptic Feedback Points
- Back button tap: light impact
- Calendar day cell tap: light impact
- Month chevron tap: light impact
- "Use freeze" button tap: light impact
- Freeze confirmed successfully: success notification
- Freeze failed: error notification
- Earned milestone tap: light impact
- Leaderboard row tap: light impact
- Pull-to-refresh release: medium impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Hero card | Screen mount | Fade-in + scale(0.95→1.0) | 280ms | ease-out-soft |
| Flame icon | Screen mount | Scale(0.5→1.0) with bounce overshoot (1.1→1.0), starts 80ms after card | 520ms | ease-flow |
| Flame flicker | Continuous | Subtle scale oscillation (1.0→1.03→1.0) + glow pulse (8%→12%→8%) | 2000ms cycle | ease-in-out |
| Hero progress bar | Screen mount | Width 0→current%, starts 200ms after card | 520ms | ease-flow |
| Streak count | Screen mount | Count-up from 0 to current value, starts with card | 520ms | ease-flow |
| Calendar card | Screen mount | Fade-in + translateY(12→0), starts 160ms after hero | 280ms | ease-out-soft |
| Calendar cells | Card visible | Staggered opacity fade-in, 15ms per cell, top-left to bottom-right | 160ms each | ease-out-soft |
| Month change | Chevron tap | Cells fade out (160ms), new cells fade in with stagger (160ms) | 320ms total | ease-out-soft |
| Day tooltip | Cell tap | Scale(0.8→1.0) + fade-in, positioned above cell | 160ms | ease-out-soft |
| XP multiplier card | Screen mount | Fade-in + translateY(12→0), starts 240ms after hero | 280ms | ease-out-soft |
| XP multiplier bar | Card visible | Width 0→current%, starts 100ms after card fade | 280ms | ease-out-soft |
| Recovery multiplier card | Screen mount | Fade-in + translateY(12→0), starts 280ms after XP multiplier card | 280ms | ease-out-soft |
| Recovery active dot | Card visible (active state) | Pulsing glow (opacity 40%→80%→40%) | 1500ms cycle | ease-in-out |
| Freeze card | Screen mount | Fade-in + translateY(12→0), starts 360ms after hero | 280ms | ease-out-soft |
| Freeze confirmation sheet | Button tap | Slides up from bottom + backdrop fade | 520ms | ease-flow |
| Freeze confirmation dismiss | Cancel/confirm | Slides down + backdrop fade out | 280ms | ease-out-soft |
| Freeze success | Confirmed | CTA green glow (600ms) + snowflake icon pops (scale bounce) + freeze card updates | 600ms | ease-flow |
| Milestone rows | Section visible | Staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| Milestone "next up" pulse | Continuous | Ring glow opacity 20%→50%→20% | 1500ms cycle | ease-in-out |
| Milestone connecting line | Section visible | Line draws top to bottom, green portion first, then white portion | 520ms | ease-flow |
| Leaderboard rows | Section visible | Staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| History rows | Section visible | Staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| Pull-to-refresh | Pull down | Balencia spinner appears, all content fades out and back in with stagger | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide completes — hero card first, then calendar, multiplier, freeze card, milestones, leaderboard, history cascade down.
- **Exit (to leaderboard)**: Stack push — slides left.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user, no streak)
- Hero card: flame icon at 20% opacity (dimmed), "0 days" count, "start a new streak today." message replaces the longest streak comparison. No progress bar.
- Calendar: current month visible, all cells white at 3% or white at 8% (past days missed). Today cell has dashed orange border.
- XP multiplier: "earn 1.5x XP bonus at 7 days" — progress bar empty. Lightning icon at 40% opacity.
- Recovery multiplier: moon icon at 50%, "rest day bonus: 1.3x XP tomorrow" — default inactive state.
- Freeze card: "0 available" — CTA disabled. "complete your first 7-day streak to earn a freeze." replaces rules text.
- Milestones: first milestone (7 days) pulsing as "next up", rest locked. All XP values in white at 30%.
- Leaderboard: shows other users normally (user at bottom or with low rank). "start building your streak to climb the board."
- History: "your streak journey starts with day one." centered text.
- The screen feels aspirational, not empty — the milestone ladder and leaderboard provide clear goals.

### Established user (streak broken today)
- Hero card: "0 days" with dimmed flame. "previous: 42 days" replaces longest comparison. If previous was the longest, "personal best: 42 days" in green.
- SIA coaching note appears above the hero card (normally hidden): compact variant with purple dot, "streaks break. what matters is starting again. your 42-day run was impressive." — 15pt Sora Regular, white. Tap navigates to SIA Chat with encouragement context.
- Calendar: most recent day shows as missed (grey). Previous active days remain green.
- XP multiplier: resets to "1.0x — no bonus active". Progress bar empty. "earn 1.5x XP bonus at 7 days" label.
- Recovery multiplier: if streak broke after a rest day, recovery bonus may be active. Otherwise default inactive.
- Freeze card: unchanged (available freezes persist through streak breaks).
- Milestones: previously earned milestones remain checked (green). Progress resets for unearned.
- History: broken streak appears as most recent history entry with date range and optional break reason.

---

## Motivation Adaptation

- **Low motivation**: Hero card shows a gentler message beneath the count: "even 1 day counts." instead of the longest streak comparison. Calendar hides the legend (simpler). XP multiplier card hidden (avoid reminding them of lost multiplier). Recovery multiplier card hidden (too much system complexity). Milestones show only the next 2 upcoming (not all 7 — reduces overwhelm). Leaderboard section hidden entirely (avoid negative social comparison). Streak history shows only the most recent 2 entries. SIA coaching note appears at the top: "your pace, your rules. just show up today."
- **Medium motivation**: Default experience as described above. All sections visible. Standard SIA presence (coaching note appears only on streak break). Milestones show all 7 tiers. Leaderboard shows top 3 + user.
- **High motivation**: Hero card shows additional stats below the progress bar: "avg. daily XP: 45" and "total XP from streaks: 3,200" — 12pt Sora Regular, white at 50%. Calendar adds intensity shading (darker green for days with more completions, lighter for fewer). XP multiplier card shows a sparkline of XP earned per day over the last 14 days (tiny, 32pt tall, orange line). Milestones show estimated days to reach each locked milestone based on current pace. Leaderboard expands to top 5 + user. History shows break pattern analysis: "most common break reason: travel (3 of 5 breaks)." — 13pt Sora Regular, white at 50%.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Streak count (hero) | Sora | Bold 700 | 36pt | 44pt | #FFFFFF |
| Streak label ("days strong") | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 60% |
| Longest streak comparison | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 50% |
| Progress label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| "new personal best" label | Sora | Semibold 600 | 14pt | 20pt | #34A853 |
| Calendar month label | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Calendar day-of-week labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Calendar legend text | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Multiplier text | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Multiplier tier description | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| Next tier label | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| "max multiplier" text | Sora | Semibold 600 | 13pt | 18pt | #34A853 |
| Recovery header | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Recovery active status | Sora | Semibold 600 | 14pt | 20pt | #34A853 |
| Recovery inactive status | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| Recovery explanation | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 50% |
| Freeze header | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Freeze available count | Sora | Semibold 600 | 14pt | 20pt | #FFFFFF at 70% |
| Freeze rules text | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| "use freeze" CTA | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Freeze earn countdown | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Confirmation title | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Confirmation body | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| Milestone label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF or #FFFFFF at 50% |
| Milestone XP reward | Sora | Semibold 600 | 14pt | 20pt | #34A853 or #FFFFFF at 30% |
| Milestone countdown | Sora | Regular 400 | 12pt | 16pt | #FF5E00 |
| "legendary" badge text | Sora | Semibold 600 | 13pt | 18pt | #FF5E00 |
| Leaderboard rank (#1/#2/#3) | Sora | Bold 700 | 17pt | 24pt | per podium color |
| Leaderboard name | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Leaderboard streak days | Sora | Semibold 600 | 14pt | 20pt | #FFFFFF at 70% |
| "see full leaderboard" link | Sora | Semibold 600 | 14pt | 20pt | #FF5E00 |
| History streak length | Sora | Bold 700 | 17pt | 24pt | #FFFFFF |
| History status badge | Sora | Semibold 600 | 11pt | 16pt | per status color |
| History date range | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 50% |
| History break reason | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% (italic) |
| "show earlier streaks" link | Sora | Semibold 600 | 14pt | 20pt | #FF5E00 |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Streak data load fails | Hero card shows skeleton shimmer for 3s, then "could not load streak data" + "retry" link in orange | Tap retry re-fetches; pull-to-refresh also available |
| Calendar data load fails | Calendar grid shows skeleton shimmer, then "could not load calendar" + "retry" link | Tap retry re-fetches month data |
| Use freeze fails | "use freeze" CTA shows error state (red border flash), "could not activate freeze — try again" toast (3s) | CTA re-enables; confirmation sheet dismisses |
| Milestones load fails | Milestones section shows "could not load milestones" + "retry" link | Tap retry re-fetches milestone data |
| Leaderboard load fails | Leaderboard section shows "could not load leaderboard" + "retry" link | Tap retry re-fetches ranking data |
| Streak history load fails | History section shows "could not load history" + "retry" link | Tap retry re-fetches history |
| Network offline | All sections show cached data with "offline — showing cached data" banner (48pt). "use freeze" CTA disabled with "available when online" toast on tap. | Banner includes "tap to retry" on reconnect |
| Streak count mismatch (server vs local) | Hero card crossfades to server value (280ms). SIA note: "your streak data has been updated." | No user action needed; server is authoritative |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Current streak hero**: VoiceOver reads "42-day streak. Longest streak: 67 days. 63% of longest streak."
- **Streak calendar**: Each day cell has an accessible label: "May 5, active day" / "May 6, freeze used" / "May 7, missed." Month navigation chevrons labeled "Previous month" / "Next month."
- **XP multiplier card**: VoiceOver reads "1.5 times XP multiplier active. 7-day streak bonus. Next tier: 2.0 times at 30 days." Maximum streak multiplier is 2.0x at 30+ days.
- **Recovery multiplier card**: VoiceOver reads "Recovery multiplier. [Status]. Take a rest day to earn 1.3 times XP on your next active day." Active state: "1.3 times XP bonus active today." Inactive state: "Rest day bonus available."
- **Streak freeze card**: VoiceOver reads "2 streak freezes available. Use a freeze to protect your streak on rest days." Button: "Use freeze, button."
- **Milestone rows**: Earned milestones read "7 days, 50 XP, earned." Locked milestones read "60 days, 500 XP, locked." Next target reads "30 days, 250 XP, 18 more days to go."
- **Leaderboard rows**: VoiceOver reads rank, name, and streak count: "Rank 1, Sarah, 98 days."
- **History rows**: VoiceOver reads length, status, and dates: "42 days, active, April 10 to present" / "67 days, personal best, January 2 to March 9, ended: travel."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Calendar day cells have 36pt visible size with 44pt touch targets.
- **Color contrast**: All text meets WCAG AA. Calendar day statuses use both color and icon (checkmark/snowflake/empty), not color alone.
- **Reduced motion**: Flame icon appears static (no flicker). Progress bars appear at final fill without sweep. Milestone connecting lines appear without draw animation. Calendar cell tooltips appear without scale animation.

---

## Cross-References

- **Navigates to**: Screen [39] — Leaderboard via "see full leaderboard" link (stack push, streak tab pre-selected), Screen [38] — Habits via "build your streak" CTA in empty state (stack push), Screen [09] — SIA Chat via coaching note tap (tab switch with streak context), Limited User Profile bottom sheet via leaderboard row tap (modal)
- **Navigates from**: Screen [19] — RPG Character via stats summary "day streak" cell tap (stack push), Screen [12] — Home Screen via streak widget or streak-related action card (stack push), Screen [38] — Habits via streak flame indicator tap (stack push), Screen [42] — Celebration Overlay via streak milestone achievement "view details" (stack push), Screen [09] — SIA Chat via deep-link when SIA mentions streak (stack push)
- **Shared components with**: Screen [19] — RPG Character (Stats Summary pattern — streak count, XP bar visual language), Screen [38] — Habits (Calendar Heatmap pattern adapted to monthly streak calendar, Streak flame indicator), Screen [39] — Leaderboard (Rank Row pattern, Podium Colors, Limited User Profile bottom sheet, "see full leaderboard" link pattern), Screen [42] — Celebration Overlay (XP reward display, milestone achievement trigger)
- **Patterns used**: Back Button (_shared-patterns.md), 8-State Model (_shared-patterns.md), In-Card CTA Button (_shared-patterns.md), Section Eyebrow Label (_shared-patterns.md), Bottom Tab Bar (_shared-patterns.md), Leaderboard Rank Row (Screen 39), Podium Accent Colors (Screen 39), Limited User Profile Bottom Sheet (Screen 39), Pull-to-Refresh (_shared-patterns.md), Staggered Content Entry Animation (_shared-patterns.md), SIA Coaching Note — Compact Variant (_shared-patterns.md, for streak break state)
- **Patterns established**: Current Streak Hero Card (flame icon + count + longest comparison + progress bar), Streak Calendar (monthly grid with green/blue/grey day indicators and day-detail tooltip), XP Multiplier Card (multiplier tier display with progress bar to next tier — 3 tiers: 1.0x/1.5x/2.0x), **Recovery Multiplier Card** (rested XP bonus display — 1.3x after rest day, stacks with streak multiplier up to 2.0x total cap), Streak Freeze Card (available count + rules + confirmation flow), Streak Milestone Ladder (vertical progression with connecting line, earned/next/locked states), Freeze Confirmation Sheet (lightweight bottom sheet for destructive-adjacent action confirmation), Streak History Row (length + status badge + date range + break reason)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/goals/streaks`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F11 | critical | retention | Implement month navigation, day tooltips, freeze confirmation/used states, leaderboard navigation, and failure/offline states. |
| B06-F12 | major | information-architecture | Decide the product owner for streaks and align route/tab context with that decision. |
| B06-F13 | major | product-sense | Align streak multiplier math and copy with the XP reward table, or update the spec if the reward model changed. |
| B06-F14 | major | accessibility | Use 44x44 semantic controls with labels for completed, freeze, missed, today, and future states. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

