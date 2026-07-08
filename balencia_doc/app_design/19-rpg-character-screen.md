# Screen Design: RPG Character Screen

**Screen**: 19 of 43
**File**: 19-rpg-character-screen.md
**Register**: Product Mode
**Primary action**: review RPG progression and domain skill levels
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via RPG level badge, stats row, or quick links grid on Me Main.

---

## Purpose

The RPG Character Screen is the user's "Call of Duty profile card" — a premium stats display showing their life progression as a gamified journey. It answers "how far have I come?" through overall level, XP, domain skill levels, active streaks, and quest history. This screen is primarily read-only and celebratory — it reinforces progress and makes the user feel accomplished. Every domain they've engaged with has a visible skill level, making cross-domain breadth feel rewarding. The aesthetic must be premium and mature (not cartoonish) while still feeling like a character sheet.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Character card hero — large avatar, overall level, title/rank, XP bar (identity + progression anchor)
2. Domain skill levels — grid showing per-domain levels with domain colors (breadth of engagement)
3. Stats summary — streak, quests completed, quests active, lifetime XP (achievement snapshot)
4. Quest history — scrollable list of completed goals/missions with XP earned (journey record)

**User flow**:
- **Arrives from**: Me Main [17] (RPG level badge tap, stats row tap, or quick link tap)
- **Primary exit**: Back → Me Main [17] (stack pop)
- **Secondary exits**: Tap domain skill → domain dashboard (stack push), tap completed quest → archived Goal Detail [14] (stack push)

---

## Layout

**Scroll behavior**: ScrollView (content is ~1.5-2 viewports)
**Tab bar visible**: Yes (Me tab active)

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ← Your character               │  ← Back + title (44pt)
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      ┌──────┐           │   │
│  │      │Avatar│  80pt     │   │  ← Character card
│  │      └──────┘           │   │    hero section
│  │     User Name            │   │    ~280pt
│  │    ◆ Level 14            │   │
│  │   "Dedicated explorer"   │   │
│  │                         │   │
│  │  ━━━━━━━━━━━━━━━━░░░░   │   │  ← XP bar (wide)
│  │  2,450 / 5,000 XP       │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  DOMAIN SKILLS                  │  ← Eyebrow
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │🔴Fit  │ │🟢Nutr │ │💰Fin  │ │  ← Domain skill
│  │Lv.12  │ │Lv.9   │ │Lv.8   │ │    cards, 3-col
│  │━━━░░  │ │━━░░░  │ │━░░░░  │ │    ~200pt
│  ├───────┤ ├───────┤ ├───────┤ │
│  │💼Car  │ │💗Rel  │ │🟣Spi  │ │
│  │Lv.5   │ │Lv.7   │ │Lv.4   │ │
│  │━░░░░  │ │━░░░░  │ │░░░░░  │ │
│  ├───────┤ ├───────┤ ├───────┤ │
│  │🔵Lea  │ │🟡Cre  │ │🩵Wel  │ │
│  │Lv.6   │ │Lv.3   │ │Lv.11  │ │
│  │━░░░░  │ │░░░░░  │ │━━━░░  │ │
│  └───────┘ └───────┘ └───────┘ │
│                                 │
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │  42   │ │  12   │ │  5    │ │  ← Stats summary
│  │ day   │ │quests │ │active │ │    row ~80pt
│  │streak │ │ done  │ │quests │ │
│  └───────┘ └───────┘ └───────┘ │
│                                 │
│  QUEST HISTORY                  │  ← Eyebrow
│  ┌─────────────────────────┐   │
│  │ ✓ Save $2,000      +350│   │  ← Completed quest
│  │   💰🏋 · May 2026       │   │    rows ~64pt each
│  ├─────────────────────────┤   │
│  │ ✓ Run half marathon +500│   │
│  │   🏋 · Apr 2026         │   │
│  ├─────────────────────────┤   │
│  │ ✓ Read 5 books    +200 │   │
│  │   📚 · Mar 2026         │   │
│  └─────────────────────────┘   │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [Today] [ SIA ] [Goals] [ Me ]│
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Navigation header** — 44pt
   - Back button + "your character" title

2. **Character card** — ~280pt
   - Hero section with avatar, level, rank, XP bar

3. **Domain skills section** — ~220pt
   - Eyebrow + 3-column grid of domain skill cards

4. **Stats summary** — ~80pt
   - 3-cell row (same pattern as Me Main [17])

5. **Streak & Rewards section** — ~160pt
   - Streak freeze status, XP multiplier, active rewards

6. **Quest history section** — variable (~64pt per row)
   - Eyebrow + list of completed quests

7. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern
  - Title: "your character" — 17pt Cabinet Grotesk Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Character Card (Hero)
- **Purpose**: Identity anchor and primary progression display — the "profile card"
- **Data source**: User profile API + RPG stats API
- **Visual treatment**: Full-width card minus 32pt (16pt margins). ink-brown-800 background, border-radius 24pt (--r-xl). 1pt border white at 8%. Subtle warm shadow (--shadow-1). Internal padding 24pt.
- **Content** (centered vertically within card):
  - Avatar: 80pt circle, 3pt border with orange (#FF5E00) gradient glow (subtle, not loud). If no photo, first initial on ink-brown-800 darker circle.
  - Name: 20pt Cabinet Grotesk Semibold, white, center-aligned, 12pt below avatar
  - Level indicator: diamond icon (14pt, orange) + "level 14" — 16pt Cabinet Grotesk Bold, white, center-aligned, 8pt below name
  - Rank title: 14pt Switzer Regular, white at 50%, center-aligned, 4pt below level. Dynamic title based on level range (e.g., "dedicated explorer", "rising champion", "life architect"). Sentence case.
  - XP progress bar: full card width minus 48pt internal margins (so full-width - 80pt total). Height 8pt, pill shape. Track: white at 8%. Fill: orange (#FF5E00) with subtle glow. 24pt below rank title.
  - XP label: "2,450 / 5,000 XP to level 15" — 12pt Switzer Regular, white at 50%, center-aligned, 6pt below bar. Numbers use tabular-nums.
- **Level rank titles** (progression):
  - Lv.1-3: "beginner"
  - Lv.4-7: "apprentice"
  - Lv.8-12: "dedicated explorer"
  - Lv.13-18: "rising champion"
  - Lv.19-25: "life architect"
  - Lv.26+: "grand master"
- **Variants**: New user (Lv.1, 0 XP, "beginner", empty bar). Established user (as described). Level-up state (when user just leveled — green glow replaces orange momentarily, 1200ms celebration).
- **Gestures**: Tap avatar → edit profile modal (same as Me Main). Card itself is not tappable.
- **Size**: full-width minus 32pt x ~280pt

### Domain Skills Grid
- **Purpose**: Shows per-domain skill levels — the RPG "stats page"
- **Data source**: RPG domain levels API
- **Visual treatment**:
  - Eyebrow: "domain skills" — 12pt Cabinet Grotesk Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from character card
  - 3-column grid, 8pt gaps between cards
  - Grid margins: 16pt left, 16pt right
  - Each card:
    - Width: (screen width - 32pt margins - 16pt gaps) / 3
    - Height: ~72pt
    - Background: ink-brown-800, border-radius 12pt (--r-sm + 2pt), 1pt border white at 8%
    - Padding: 10pt
    - Content:
      - Domain color dot (8pt circle) + domain name abbreviated (11pt Switzer Regular, white at 50%), single row. Names truncated: "Fitness", "Nutrition", "Finance", "Career", "Relat...", "Spirit...", "Learning", "Creative", "Wellbeing"
      - Level: "Lv.12" — 18pt Cabinet Grotesk Bold, white, 6pt below domain row. tabular-nums.
      - XP bar: full card width minus 20pt padding. Height 3pt, pill shape. Track: white at 8%. Fill: domain color at 80%.
    - Tappable → domain dashboard
- **Sort order**: Highest level first (strongest domains at top-left)
- **Variants**: 
  - Domain with 0 activity: "Lv.0", empty bar, dimmer text (white at 30%). Still tappable.
  - Fewer than 9 domains: grid adjusts (last row may have 1-2 cards centered)
- **Gestures**: Tap card → domain dashboard (stack push)
- **Size**: full-width x ~220pt (eyebrow 20pt + 16pt gap + 3 rows × ~72pt + 8pt gaps × 2)

### Stats Summary Row
- **Purpose**: Key achievement metrics at a glance
- **Data source**: RPG stats API
- **Visual treatment**: Same pattern as Me Main [17] Stats Row — 3 equal cells in ink-brown-800 card.
  - Card: full-width minus 32pt, border-radius 20pt, 1pt border white at 8%, 16pt padding
  - Cell contents:
    - Number: 24pt Cabinet Grotesk Bold, white, tabular-nums, center-aligned
    - Label: 12pt Switzer Regular, white at 50%, center-aligned, 4pt below
    - Cell 1: current streak (days) / "day streak"
    - Cell 2: quests completed (count) / "quests done"
    - Cell 3: active quests (count) / "active quests"
  - 24pt top margin from domain skills grid
- **Variants**: New user (all zeros). Established user (populated).
- **Gestures**: Not tappable (read-only — unlike Me Main where it navigates here)
- **Size**: full-width minus 32pt x ~80pt

### Streak & Rewards Section
- **Purpose**: Displays current streak status, streak freeze availability, XP multiplier tier, and recent rewards — connecting to the deeper Streak Details [59]
- **Data source**: API — `GET /api/streaks/status` (current streak, freeze count, multiplier), `GET /api/streaks/rewards` (recent rewards)
- **Visual treatment**:
  - Eyebrow: "streak & rewards" — 12pt Cabinet Grotesk Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from stats row
  - Main card: full-width minus 32pt, ink-brown-800, border-radius 20pt, 1pt border white at 8%, 16pt padding
  - Left section (streak + multiplier):
    - Flame icon (20pt, Burnt Orange) + streak count (24pt Cabinet Grotesk Bold, white, tabular-nums) + "days" (12pt Switzer Regular, white at 50%)
    - XP multiplier badge: pill shape, Burnt Orange at 15% bg, "2.5x XP" text (13pt Cabinet Grotesk Semibold, Burnt Orange). Shows current multiplier tier.
    - 8pt gap between streak and multiplier
  - Right section (streak freeze):
    - Snowflake icon (16pt, cool-blue #3B82F6) + "2 freezes" count (13pt Cabinet Grotesk Semibold, white)
    - If 0 freezes: "no freezes" in white at 40%, tap to earn/buy
    - Frost-blue accent, not orange, to differentiate freeze from active streak
  - Bottom row (recent rewards, horizontal scroll):
    - Up to 3 recent achievement badges (32pt circles with domain-colored backgrounds, white icons). Tappable → Celebration overlay [42].
    - "view all" link (13pt Cabinet Grotesk Semibold, orange) at end → Streak Details [59]
- **Variants**: Active streak (flame, count, multiplier shown), broken streak (grey flame, "start a new streak" CTA), no rewards yet (bottom row hidden)
- **Gestures**: Tap card → Streak Details [59] (stack push). Tap achievement badge → Celebration overlay [42]. Tap freeze indicator → freeze confirmation (if freezes available).
- **Size**: full-width minus 32pt x ~160pt

### Quest History Section
- **Purpose**: Scrollable record of completed goals/missions with XP earned
- **Data source**: Goals API (completed goals, sorted by completion date descending)
- **Visual treatment**:
  - Eyebrow: "quest history" — 12pt Cabinet Grotesk Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from stats row
  - Quest rows (flat list on ink-900, thin dividers):
    - Height: 64pt (minimum touch target)
    - Left (12pt from 16pt margin): green checkmark circle (20pt, Forest Green #34A853 fill, white check 10pt)
    - Content (12pt after checkmark):
      - Quest name: 15pt Cabinet Grotesk Semibold, white, left-aligned. 1-line, ellipsis if long.
      - Domain tags + date: 12pt Switzer Regular, white at 40%, 4pt below name. Domain color dots (6pt) inline before "May 2026" date.
    - Right: XP earned — "+350 XP" — 14pt Cabinet Grotesk Semibold, Forest Green (#34A853), right-aligned, 16pt from right edge. tabular-nums.
    - Divider: 1pt, white at 5%, below each row (except last)
  - Shows most recent 10 quests. "show earlier quests" link at bottom if more exist (14pt Cabinet Grotesk Semibold, orange, center-aligned, 44pt touch target).
- **Variants**: 
  - Populated (1+ completed quests)
  - Empty: "no quests completed yet. your completed missions will appear here as you finish goals." — 14pt Switzer Regular, white at 40%, center-aligned, 48pt top padding.
- **Gestures**: Tap quest row → archived Goal Detail [14] (stack push). Tap "show earlier quests" → loads more rows.
- **Size**: variable (eyebrow + rows × 64pt)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Character card surface | #211008 | ink-brown-800 | z-10, hero surface |
| Character card border | white at 8% | — | Glass edge |
| Avatar border glow | #FF5E00 at 30% | Burnt Orange | 60% — identity accent |
| Level diamond icon | #FF5E00 | Burnt Orange | 60% — brand accent |
| XP bar fill (overall) | #FF5E00 | Burnt Orange | 60% — primary progression |
| XP bar track | white at 8% | — | Subtle track |
| Domain skill card surfaces | #211008 | ink-brown-800 | z-10 |
| Domain skill XP fills | per-domain hex at 80% | Domain colors | Domain identification |
| Domain color dots | per-domain hex | Domain colors | Identification |
| Stats row surface | #211008 | ink-brown-800 | z-10 |
| Quest checkmark circles | #34A853 | Forest Green | 30% — completion |
| Quest XP earned text | #34A853 | Forest Green | 30% — positive reward |
| "show earlier" link | #FF5E00 | Burnt Orange | 60% — interactive |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Level text | white 100% | — | Primary text |
| Rank title | white at 50% | — | Tertiary text |
| Stats numbers | white 100% | — | Primary text |
| Stats labels | white at 50% | — | Tertiary text |
| Quest names | white 100% | — | Primary text |
| Quest meta (domain + date) | white at 40% | — | Quaternary text |

**60/30/10 verification**: Orange dominates through avatar glow, level diamond icon, XP bar fill, "show earlier" link, and active tab. Green appears on quest checkmarks and XP reward text (completion/success). Purple is absent — correct, this screen has no SIA/AI content (it's a pure stats display). Domain colors strictly on skill cards and quest domain dots. Ratio holds.

---

## Interaction States

### Avatar (Tap to Edit)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 80pt circle, 3pt orange glow border | — |
| Pressed | scale(0.95), glow brightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Domain Skill Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, border white at 8% | — |
| Pressed | scale(0.95), bg lightens, domain color glow faintly around card | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (Lv.0 domains, dimmed but tappable) | — |
| Loading | level number + bar show skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Quest History Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | row on ink-900, checkmark green | — |
| Pressed | bg flashes ink-brown-800, scale(0.98) horizontal | light impact |
| Focus-visible | 2pt orange ring around entire row | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer across name and XP | — |
| Error | N/A | — |
| Success | N/A | — |

### "Show Earlier Quests" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange text, 14pt Cabinet Grotesk Semibold | — |
| Pressed | orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | 0.4 opacity (when all quests loaded) | — |
| Loading | text replaced with small spinner (16pt, orange) | — |
| Error | N/A | — |
| Success | N/A | — |

### Back Button
Per Batch 1 pattern.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Avatar | Present edit profile modal |
| Tap | Domain skill card | Push domain dashboard |
| Tap | Quest history row | Push archived Goal Detail [14] |
| Tap | "show earlier quests" | Load more quest rows |
| Tap | Back button | Stack pop to Me Main [17] |
| Swipe right (from edge) | Screen | Stack pop (iOS native) |
| Vertical scroll | Full screen | ScrollView scroll |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Character card | Screen mount | Fade-in + scale(0.95→1.0) | 280ms | ease-out-soft |
| Avatar | Screen mount | Fade-in + scale(0.8→1.0), starts 80ms after card | 280ms | ease-flow |
| XP bar (overall) | Screen mount | Width 0→current %, starts 200ms after card | 520ms | ease-flow |
| Level text | Screen mount | Fade-in, starts with card | 280ms | ease-out-soft |
| Domain skill cards | Screen mount | Staggered fade-in, 40ms per card, starts after XP bar | 280ms each | ease-out-soft |
| Domain skill XP bars | Card visible | Width 0→current %, starts 100ms after card fade | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0), starts after domain grid | 280ms | ease-out-soft |
| Quest history rows | Screen mount | Staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| Level-up celebration | Level change detected | Avatar glow pulses green, XP bar flashes green→orange, confetti particle burst (subtle) | 1200ms | ease-flow |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to dashboard)**: Stack push — slides left.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user)
- Character card: avatar initial, "level 1", "beginner" rank, XP bar empty (0 / 100 XP).
- Domain skills: all 9 domains at Lv.0, empty XP bars, dimmed text. Still shows the grid (structure visible from day 1). Cards are tappable to explore domains.
- Stats row: "0 day streak", "0 quests done", "0 active quests"
- Quest history: empty state message — "no quests completed yet. your completed missions will appear here as you finish goals."
- Feels aspirational, not empty — the grid of Lv.0 domains is a canvas to fill.

### Established user with only 1-2 domains active
- Active domains show real levels, inactive show Lv.0 (dimmed).
- Grid sort puts active domains first.
- Quest history shows whatever quests are completed.

---

## Motivation Adaptation

- **Low motivation**: Stats row could add encouraging context beneath numbers (e.g., "that's 42 days strong" under streak in smaller text). Quest history emphasizes recent small wins. Domain skills grid unchanged (showing low levels is fine — it's aspirational).
- **Medium motivation**: Default experience.
- **High motivation**: Stats row shows a 4th cell: "lifetime XP" (total across all time). Quest history rows could show a secondary line with brief description or XP breakdown. Domain skill cards show trend arrows (up/flat) next to level number.

---

## Cross-References

- **Navigates to**: Domain dashboards [26-36] via domain skill cards (stack push), Goal Detail [14] (archived) via quest history rows (stack push), Edit profile via avatar (modal), Streak Details [59] via streak & rewards card (stack push), Celebration Overlay [42] via achievement badge tap
- **Navigates from**: Me Main [17] via RPG level badge, stats row, or quick link (stack push)
- **Shared components with**: Screen [17] — Me Main (Stats row pattern — identical spec, Avatar — same tap behavior), Screen [16] — Life Areas Overview (domain progress bar pattern, domain color dot), Screen [59] — Streak Details (streak count, freeze status, XP multiplier — shared data, deeper view), Screen [42] — Celebration Overlay (achievement badges trigger celebration)
- **Patterns used**: Back Button (Batch 1), Stats Row (established in Screen [17] this batch), Bottom Tab Bar (_shared-patterns.md), Domain Color Dot (established in Screen [16] this batch)
- **Patterns established**: Character card hero (avatar + level + rank + XP bar), Domain skill card (3-column grid), Quest history row (checkmark + name + domain tags + XP), Level rank title system, Level-up celebration animation, Streak & Rewards Card (flame icon + multiplier badge + freeze count + recent badges)
