# Screen Design: RPG Character Screen

**Screen**: 19 of 73
**File**: 19-rpg-character-screen.md
**Register**: Product Mode
**Primary action**: review RPG progression and domain skill levels
**Tab**: Me
**Navigation**: Stack depth 1 from Me tab root (Me Main [17]). Pushed via RPG level badge, stats row, or quick links grid on Me Main.

---

## Purpose

The RPG Character Screen is the user's "Call of Duty profile card" — a premium stats display showing their life progression as a gamified journey. It answers "how far have I come?" through overall level, XP, domain stat scores (0-99), Life Power (single competitive number), and mission history. Each of the 10 life domains has a stat score with sub-stats drill-down, making cross-domain breadth and depth feel rewarding. This screen is primarily read-only and celebratory — it reinforces progress and makes the user feel accomplished. The aesthetic must be premium and mature (not cartoonish) while still feeling like a character sheet.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Character card hero — avatar, overall level, title/rank, XP bar (identity + progression anchor)
2. Life Power display — single competitive number below character card (overall proficiency)
3. Domain skill grid — 10 domains with stat scores (0-99) AND levels (breadth + depth)
4. Stats summary — streak, missions done, active missions, Life Power (achievement snapshot)
5. Mission history — completed goals/missions with XP earned (journey record)

**User flow**:
- **Arrives from**: Me Main [17] (RPG level badge tap, stats row tap, or quick link tap)
- **Primary exit**: Back → Me Main [17] (stack pop)
- **Secondary exits**: Tap domain skill → Domain Sub-Stats Bottom Sheet → "view dashboard" link → domain dashboard (stack push), tap completed mission → archived Goal Detail [14] (stack push)

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
│  │  2,450 / 5,809 XP       │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│        ◆ 487 Life Power         │  ← Life Power display
│                                 │    ~48pt
│  DOMAIN SKILLS                  │  ← Eyebrow
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │🔴Fit  │ │🟣Slp  │ │🔵Car  │ │  ← Domain skill
│  │  72   │ │  65   │ │  31   │ │    cards, 3-col
│  │Lv.12  │ │Lv.8   │ │Lv.5   │ │    4 rows
│  │━━━░░  │ │━━░░░  │ │━░░░░  │ │    ~260pt
│  ├───────┤ ├───────┤ ├───────┤ │
│  │🟢Nut  │ │🟢Fin  │ │🟣Fai  │ │
│  │  58   │ │  44   │ │  52   │ │
│  │Lv.9   │ │Lv.8   │ │Lv.4   │ │
│  │━━░░░  │ │━░░░░  │ │━░░░░  │ │
│  ├───────┤ ├───────┤ ├───────┤ │
│  │🟠Pro  │ │🩷Rel  │ │🩵Wel  │ │
│  │  48   │ │  55   │ │  61   │ │
│  │Lv.6   │ │Lv.7   │ │Lv.11  │ │
│  │━░░░░  │ │━░░░░  │ │━━━░░  │ │
│  ├───────┤ ├───────┤ ├───────┤ │
│  │🟣Med  │ │       │ │       │ │
│  │  39   │ │       │ │       │ │
│  │Lv.3   │ │       │ │       │ │
│  │░░░░░  │ │       │ │       │ │
│  └───────┘ └───────┘ └───────┘ │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  │  42  │ │  12  │ │  5   │ │ 487  │ ← Stats summary
│  │ day  │ │ mis- │ │active│ │ life │   row ~80pt
│  │streak│ │ done │ │ mis. │ │power │   4 cells
│  └──────┘ └──────┘ └──────┘ └──────┘
│                                 │
│  MISSION HISTORY                │  ← Eyebrow
│  ┌─────────────────────────┐   │
│  │ ✓ Save $2,000      +350│   │  ← Completed mission
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

3. **Life Power display** — ~48pt
   - Diamond icon + Life Power score + label, centered below character card

4. **Domain skills section** — ~260pt
   - Eyebrow + 3-column grid of 10 domain skill cards (4 rows: 3-3-3-1)

5. **Stats summary** — ~80pt
   - 4-cell row: streak, missions done, active missions, Life Power

6. **Streak & Rewards section** — ~160pt
   - Streak freeze status, XP multiplier, active rewards

7. **Mission history section** — variable (~64pt per row)
   - Eyebrow + list of completed missions

8. **Bottom spacing** — 32pt

---

## Components

### Navigation Header
- **Purpose**: Back navigation and screen identification
- **Data source**: Static
- **Visual treatment**: Standard Product Mode header
- **Content**:
  - Back button: Batch 1 pattern
  - Title: "your character" — 17pt Sora Semibold, white, center-aligned
- **Gestures**: Tap back / swipe from left edge → stack pop to Me Main [17]
- **Size**: full-width x 44pt

### Character Card (Hero)
- **Purpose**: Identity anchor and primary progression display — the "profile card"
- **Data source**: User profile API + RPG stats API
- **Visual treatment**: Full-width card minus 32pt (16pt margins). ink-brown-800 background, border-radius 24pt (--r-xl). 1pt border white at 8%. Subtle warm shadow (--shadow-1). Internal padding 24pt.
- **Content** (centered vertically within card):
  - Avatar: 80pt circle, 3pt border with orange (#FF5E00) gradient glow (subtle, not loud). If no photo, first initial on ink-brown-800 darker circle.
  - Name: 20pt Sora Semibold, white, center-aligned, 12pt below avatar
  - Level indicator: diamond icon (14pt, orange) + "level 14" — 16pt Sora Bold, white, center-aligned, 8pt below name
  - Rank title: 14pt Sora Regular, white at 50%, center-aligned, 4pt below level. Dynamic title based on level range (e.g., "dedicated explorer", "rising champion", "life architect"). Sentence case.
  - XP progress bar: full card width minus 48pt internal margins (so full-width - 80pt total). Height 8pt, pill shape. Track: white at 8%. Fill: orange (#FF5E00) with subtle glow. 24pt below rank title. XP thresholds follow logarithmic curve: `xp_required(level) = 100 * level^1.5`.
  - XP label: "2,450 / 5,809 XP to level 16" — 12pt Sora Regular, white at 50%, center-aligned, 6pt below bar. Numbers use tabular-nums. Values reflect logarithmic XP curve.
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

### Life Power Display
- **Purpose**: Single competitive number summarizing overall life proficiency across all active domains
- **Data source**: Calculated from domain stats. Life Power = `sum(all active domain stats) * balance_multiplier` where `balance_multiplier = 1.0 + (0.15 * (1 - coefficient_of_variation(active_stats)))`. Overall character level = `floor(overall_power / 4) + 1` where `overall_power = weighted_average(all active domain stats) + balance_bonus` and `balance_bonus = (min_active_stat / max_active_stat) * 10`.
- **Visual treatment**: Centered below character card, 16pt gap. Single horizontal row:
  - Diamond icon: 16pt, orange (#FF5E00)
  - Score: 28pt Sora Bold, orange (#FF5E00), 6pt after icon
  - Label: "life power" — 12pt Sora Regular, white at 50%, 6pt after score
  - Count-up animation on mount (animates from 0 to current value over ~600ms)
- **Variants**: New user: shows "0". Established user: shows calculated value.
- **Gestures**: Not tappable.
- **Size**: full-width x ~48pt

### Domain Skills Grid
- **Purpose**: Shows per-domain stat scores and levels — the RPG "stats page". 10 life domains: Fitness (#EF4444), Sleep (#818CF8), Career (#6366F1), Nutrition (#84CC16), Finance (#10B981), Faith (#A855F7), Productivity (#F97316), Relationships (#EC4899), Wellbeing (#14B8A6), Meditation (#A78BFA).
- **Data source**: RPG domain stats API. Each domain has a stat score (0-99) auto-calculated from `(consistency * 0.40) + (depth * 0.35) + (trend * 0.25)`. Each domain has a level (1-25) with per-domain XP following logarithmic curve: `xp_required(level) = 100 * level^1.5`. Each domain has 3-5 sub-stats (qualitative breakdowns).
- **Visual treatment**:
  - Eyebrow: "domain skills" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from Life Power display
  - 3-column grid, 8pt gaps between cards. 4 rows: 3-3-3-1.
  - Grid margins: 16pt left, 16pt right
  - Each card:
    - Width: (screen width - 32pt margins - 16pt gaps) / 3
    - Height: ~72pt
    - Background: ink-brown-800, border-radius 12pt (--r-sm + 2pt), 1pt border white at 8%
    - Padding: 10pt
    - Content:
      - Domain color dot (8pt circle) + domain name abbreviated (11pt Sora Regular, white at 50%), single row. Names truncated: "Fitness", "Sleep", "Career", "Nutrition", "Finance", "Faith", "Product...", "Relat...", "Wellbeing", "Medit..."
      - Stat score: 24pt Sora Bold, white, centered — the big number (0-99), 4pt below domain row. tabular-nums.
      - Level: "Lv.12" — 12pt Sora Semibold, white at 60%, centered, 2pt below stat score. tabular-nums.
      - Mini XP bar: full card width minus 20pt padding. Height 3pt, pill shape. Track: white at 8%. Fill: domain color at 80%.
    - Tappable → opens Domain Sub-Stats Bottom Sheet
- **Domain Sub-Stats Bottom Sheet**:
  - Standard bottom sheet: border-radius --r-lg top corners, drag handle (40pt x 4pt, white at 20%, centered, 8pt from top), ink-brown-800 background.
  - Header: Domain name (18pt Sora Semibold, domain color) + stat score (28pt Sora Bold, white), 24pt padding.
  - Sub-stat rows (3-5 per domain):
    - Label: 15pt Sora Regular, white at 80%, left-aligned
    - Progress bar: full width minus 32pt padding, 6pt height, pill shape, track white at 8%, fill domain color
    - Tier label: 12pt Sora Regular, white at 50%, right-aligned — one of: "Newcomer" / "Developing" / "Established" / "Proficient" / "Advanced" / "Expert" / "Mastery"
    - 16pt vertical spacing between sub-stat rows
  - Footer: "View dashboard" link — 15pt Sora Semibold, orange (#FF5E00), center-aligned, 24pt top margin. Tap → domain dashboard (stack push, bottom sheet dismisses).
  - Backdrop: black at 40%, tap to dismiss.
- **Sort order**: Highest stat score first (strongest domains at top-left)
- **Variants**: 
  - Domain with 0 activity: stat score "0", "Lv.0", empty bar, dimmer text (white at 30%). Still tappable.
  - 10 domains always shown: grid is 4 rows (3-3-3-1), last row has 1 card left-aligned.
- **Gestures**: Tap card → opens Domain Sub-Stats Bottom Sheet
- **Size**: full-width x ~260pt (eyebrow 20pt + 16pt gap + 4 rows x ~72pt + 8pt gaps x 3)

### Stats Summary Row
- **Purpose**: Key achievement metrics at a glance
- **Data source**: RPG stats API
- **Visual treatment**: Same pattern as Me Main [17] Stats Row — 4 equal cells in ink-brown-800 card.
  - Card: full-width minus 32pt, border-radius 20pt, 1pt border white at 8%, 16pt padding
  - Cell contents:
    - Number: 24pt Sora Bold, white, tabular-nums, center-aligned
    - Label: 12pt Sora Regular, white at 50%, center-aligned, 4pt below
    - Cell 1: current streak (days) / "day streak"
    - Cell 2: missions completed (count) / "missions done"
    - Cell 3: active missions (count) / "active missions"
    - Cell 4: Life Power score / "life power"
  - 24pt top margin from domain skills grid
- **Variants**: New user (all zeros, Life Power 0). Established user (populated).
- **Gestures**: Not tappable (read-only — unlike Me Main where it navigates here)
- **Size**: full-width minus 32pt x ~80pt

### Streak & Rewards Section
- **Purpose**: Displays current streak status, streak freeze availability, XP multiplier tier, and recent rewards — connecting to the deeper Streak Details [59]
- **Data source**: API — `GET /api/streaks/status` (current streak, freeze count, multiplier), `GET /api/streaks/rewards` (recent rewards)
- **Visual treatment**:
  - Eyebrow: "streak & rewards" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from stats row
  - Main card: full-width minus 32pt, ink-brown-800, border-radius 20pt, 1pt border white at 8%, 16pt padding
  - Left section (streak + multiplier):
    - Flame icon (20pt, Burnt Orange) + streak count (24pt Sora Bold, white, tabular-nums) + "days" (12pt Sora Regular, white at 50%)
    - XP multiplier badge: pill shape, Burnt Orange at 15% bg, "2.5x XP" text (13pt Sora Semibold, Burnt Orange). Shows current multiplier tier.
    - 8pt gap between streak and multiplier
  - Right section (streak freeze):
    - Snowflake icon (16pt, cool-blue #3B82F6) + "2 freezes" count (13pt Sora Semibold, white)
    - If 0 freezes: "no freezes" in white at 40%, tap to earn/buy
    - Frost-blue accent, not orange, to differentiate freeze from active streak
  - Bottom row (recent rewards, horizontal scroll):
    - Up to 3 recent achievement badges (32pt circles with domain-colored backgrounds, white icons). Tappable → Celebration overlay [42].
    - "view all" link (13pt Sora Semibold, orange) at end → Streak Details [59]
- **Variants**: Active streak (flame, count, multiplier shown), broken streak (grey flame, "start a new streak" CTA), no rewards yet (bottom row hidden)
- **Gestures**: Tap card → Streak Details [59] (stack push). Tap achievement badge → Celebration overlay [42]. Tap freeze indicator → freeze confirmation (if freezes available).
- **Size**: full-width minus 32pt x ~160pt

### Mission History Section
- **Purpose**: Scrollable record of completed goals/missions with XP earned, with link to full Mission Journal
- **Data source**: Goals API (completed goals, sorted by completion date descending)
- **Visual treatment**:
  - Eyebrow: "mission history" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking, 16pt left margin, 24pt top margin from stats row
  - Mission rows (flat list on ink-900, thin dividers):
    - Height: 64pt (minimum touch target)
    - Left (12pt from 16pt margin): green checkmark circle (20pt, Forest Green #34A853 fill, white check 10pt)
    - Content (12pt after checkmark):
      - Mission name: 15pt Sora Semibold, white, left-aligned. 1-line, ellipsis if long.
      - Mission Type Badge (metallic pill, 11pt) + Domain tags + date: 12pt Sora Regular, white at 40%, 4pt below name. Type badge inline before domain color dots (6pt) before "May 2026" date.
    - Right: XP earned — "+350 XP" — 14pt Sora Semibold, Forest Green (#34A853), right-aligned, 16pt from right edge. tabular-nums.
    - Divider: 1pt, white at 5%, below each row (except last)
  - Shows most recent 5 missions. "View full journal" link at bottom — 15pt Sora Semibold, orange (#FF5E00), right-aligned with chevron (14pt, white at 40%). 44pt touch target. Tap → stack push to Mission Journal [73].
- **Variants**: 
  - Populated (1+ completed missions)
  - Empty: "no missions completed yet. your completed missions will appear here as you finish goals." — 14pt Sora Regular, white at 40%, center-aligned, 48pt top padding.
- **Gestures**: Tap mission row → Mission Detail [14] in completed state (stack push). Tap "View full journal" → Mission Journal [73] (stack push).
- **Size**: variable (eyebrow + rows × 64pt + journal link 44pt)

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
| Domain stat score | white 100% | — | Primary number |
| Life Power diamond icon | #FF5E00 | Burnt Orange | 60% — brand accent |
| Life Power score | #FF5E00 | Burnt Orange | 60% — competitive number |
| Life Power label | white at 50% | — | Tertiary text |
| Stats row surface | #211008 | ink-brown-800 | z-10 |
| Mission checkmark circles | #34A853 | Forest Green | 30% — completion |
| Mission XP earned text | #34A853 | Forest Green | 30% — positive reward |
| "show earlier" link | #FF5E00 | Burnt Orange | 60% — interactive |
| Active tab (Me) | #FF5E00 | Burnt Orange | 60% — tab indicator |
| Level text | white 100% | — | Primary text |
| Rank title | white at 50% | — | Tertiary text |
| Stats numbers | white 100% | — | Primary text |
| Stats labels | white at 50% | — | Tertiary text |
| Mission names | white 100% | — | Primary text |
| Mission meta (domain + date) | white at 40% | — | Quaternary text |

**60/30/10 verification**: Orange dominates through avatar glow, level diamond icon, XP bar fill, Life Power display (diamond + score), "show earlier" link, and active tab. Green appears on mission checkmarks and XP reward text (completion/success). Purple is absent — correct, this screen has no SIA/AI content (it's a pure stats display). Domain colors strictly on skill cards and mission domain dots. Ratio holds.

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

### Life Power Display
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Diamond icon + score + label, centered | — |
| Pressed | N/A (not tappable) | — |
| Focus-visible | 2pt orange ring around display area | — |
| Disabled | N/A | — |
| Loading | Score shows skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Mission History Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | row on ink-900, checkmark green | — |
| Pressed | bg flashes ink-brown-800, scale(0.98) horizontal | light impact |
| Focus-visible | 2pt orange ring around entire row | — |
| Disabled | N/A | — |
| Loading | skeleton shimmer across name and XP | — |
| Error | N/A | — |
| Success | N/A | — |

### "Show Earlier Missions" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange text, 14pt Sora Semibold | — |
| Pressed | orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring | — |
| Disabled | 0.4 opacity (when all missions loaded) | — |
| Loading | text replaced with small spinner (16pt, orange) | — |
| Error | N/A | — |
| Success | N/A | — |

### Back Button
Per Batch 1 pattern.

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Avatar | Present edit profile modal |
| Tap | Domain skill card | Opens Domain Sub-Stats Bottom Sheet |
| Tap | "View dashboard" link (in bottom sheet) | Push domain dashboard, dismiss sheet |
| Tap | Mission history row | Push archived Goal Detail [14] |
| Tap | "show earlier missions" | Load more mission rows |
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
| Life Power score | Screen mount | Count-up from 0 to current value, starts after XP bar | 600ms | ease-flow |
| Domain skill cards | Screen mount | Staggered fade-in, 40ms per card, starts after Life Power | 280ms each | ease-out-soft |
| Domain skill XP bars | Card visible | Width 0→current %, starts 100ms after card fade | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0), starts after domain grid | 280ms | ease-out-soft |
| Mission history rows | Screen mount | Staggered fade-in, 40ms per row | 280ms each | ease-out-soft |
| Level-up celebration | Level change detected | Avatar glow pulses green, XP bar flashes green→orange, confetti particle burst (subtle) | 1200ms | ease-flow |

**Screen transition**:
- **Enter**: Stack push from right (280ms, ease-out-soft). Content stagger begins after slide.
- **Exit (to dashboard)**: Stack push — slides left.
- **Exit (back)**: Stack pop — slides right.

---

## Empty States

### Day 1 (new user)
- Character card: avatar initial, "level 1", "beginner" rank, XP bar empty (0 / 100 XP).
- Life Power: shows "0".
- Domain skills: all 10 domains at Lv.0, stat score 0, empty XP bars, dimmed text. Still shows the grid (structure visible from day 1). Cards are tappable to explore domains.
- Stats row: "0 day streak", "0 missions done", "0 active missions", "0 life power"
- Mission history: empty state message — "no missions completed yet. your completed missions will appear here as you finish goals."
- Feels aspirational, not empty — the grid of Lv.0 domains is a canvas to fill.

### Established user with only 1-2 domains active
- Active domains show real stat scores and levels, inactive show stat score 0 and Lv.0 (dimmed).
- Grid sort puts active domains first (by stat score).
- Mission history shows whatever missions are completed.

---

## Motivation Adaptation

- **Low motivation**: Stats row could add encouraging context beneath numbers (e.g., "that's 42 days strong" under streak in smaller text). Mission history emphasizes recent small wins. Domain skills grid unchanged (showing low levels is fine — it's aspirational).
- **Medium motivation**: Default experience.
- **High motivation**: Stats row already shows 4 cells including Life Power. Mission history rows could show a secondary line with brief description or XP breakdown. Domain skill cards show trend arrows (up/flat) for stat score changes.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav bar title ("your character") | Sora | Semibold (600) | 17pt | 22pt | #FFFFFF |
| Character card name | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| Level indicator ("level 14") | Sora | Bold (700) | 16pt | 22pt | #FFFFFF |
| Rank title ("dedicated explorer") | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 50% |
| XP label ("2,450 / 5,809 XP to level 16") | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Life Power score | Sora | Bold (700) | 28pt | 34pt | #FF5E00 |
| Life Power label ("life power") | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| "domain skills" eyebrow | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| Domain skill card name | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 50% |
| Domain stat score | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Domain level ("Lv.12") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 60% |
| Sub-stats label | Sora | Regular (400) | 15pt | 20pt | #FFFFFF at 80% |
| Sub-stats tier label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Stats summary number | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Stats summary label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| "streak & rewards" eyebrow | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| Streak count | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| "days" label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| XP multiplier badge ("2.5x XP") | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| Freeze count text | Sora | Semibold (600) | 13pt | 18pt | #FFFFFF |
| "view all" link | Sora | Semibold (600) | 13pt | 18pt | #FF5E00 |
| "mission history" eyebrow | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| Mission name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Mission domain + date | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 40% |
| Mission XP earned ("+350 XP") | Sora | Semibold (600) | 14pt | 18pt | #34A853 |
| "show earlier missions" link | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| Empty mission history message | Sora | Regular (400) | 14pt | 18pt | #FFFFFF at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (RPG data fetch) | Character card shows cached data (name, avatar, last known level). Life Power shows cached value. Domain skills grid shows skeleton shimmer on stat scores, levels, and XP bars. Stats row shows skeleton shimmer. Mission history shows skeleton rows. | Pull-to-refresh retries. Cached profile data always shown. Back navigation functional. |
| API timeout (RPG stats) | After 8s, displays cached data where available. Sections without cache show "Couldn't load data" with "try again" link. | Tap "try again" retries. Pull-to-refresh retries all. |
| Mission history fetch failure | Mission history section shows skeleton shimmer for 3 rows, then "Couldn't load mission history" message. Character card, Life Power, and domain skills unaffected. | "try again" link in mission history section. Pull-to-refresh retries all. |
| Domain skills API failure | Domain skill cards show skeleton shimmer (stat score, level, and bar). Cards still show domain name and color dot. | Pull-to-refresh retries. Cached stats shown if available. |
| "Show earlier missions" load failure | Link reverts to default state. Toast: "Couldn't load more missions." | Tap link again to retry. |
| Streak & rewards data failure | Streak card shows skeleton shimmer. Achievement badges hidden. "view all" link still functional. | Pull-to-refresh retries. Cached streak count shown if available. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Back button: "Back, return to Me"
  - Avatar: "Profile photo, tap to edit"
  - Character card: "Level [number], [rank title], [current XP] of [total XP] to next level"
  - Life Power display: "[value] Life Power"
  - Domain skill card: "[domain name], stat score [number], Level [number], tap to view sub-stats"
  - Stats summary row: "[value] day streak, [value] missions done, [value] active missions, [value] life power"
  - Streak & rewards card: "[count] day streak, [multiplier] XP multiplier, [count] streak freezes available"
  - Achievement badge: "[achievement name], tap to view"
  - Mission history row: "Completed: [mission name], [domain names], [date], earned [XP] XP, tap to view details"
  - "View full journal" link: "View full mission journal"
- **Focus order**: Back button -> Avatar -> Character card (name, level, rank, XP bar as a group) -> Life Power display -> Domain skills eyebrow -> Domain skill cards (left to right, row by row) -> Stats summary row -> Streak & rewards card -> Mission history eyebrow -> Mission history rows (top to bottom) -> "View full journal" link
- **Gesture alternatives**: All interactions are standard taps. iOS swipe-from-edge for back navigation.
- **Reduced motion**: Character card scale animation replaced with instant display. Avatar scale-in replaced with fade-in. XP bar and domain skill bars appear at final width instantly. Life Power count-up animation disabled; shows final value instantly. Level-up celebration confetti disabled; green glow is a static color change.

---

## Cross-References

- **Navigates to**: Domain dashboards [26-36] via domain skill card → sub-stats bottom sheet → "view dashboard" link (stack push), Goal Detail [14] (archived) via mission history rows (stack push), Edit profile via avatar (modal), Streak Details [59] via streak & rewards card (stack push), Celebration Overlay [42] via achievement badge tap, Achievement Gallery [71] via "view all" link in Streak & Rewards section (stack push), Mission Journal [73] via "View full journal" link in Mission History section (stack push)
- **Navigates from**: Me Main [17] via RPG level badge, stats row, or quick link (stack push)
- **Shared components with**: Screen [17] — Me Main (Stats row pattern — identical spec, Avatar — same tap behavior), Screen [16] — Life Areas Overview (radar chart, domain stats, Life Power — shared data, domain color dot), Screen [59] — Streak Details (streak count, freeze status, XP multiplier — shared data, deeper view), Screen [42] — Celebration Overlay (achievement badges trigger celebration)
- **Patterns used**: Back Button (Batch 1), Stats Row (established in Screen [17] this batch), Bottom Tab Bar (_shared-patterns.md), Domain Color Dot (established in Screen [16] this batch)
- **Patterns established**: Character card hero (avatar + level + rank + XP bar), Life Power display (diamond + score + label), Domain skill card (3-column grid with stat scores + levels), Domain Sub-Stats Bottom Sheet (sub-stat rows + tier labels + "view dashboard" link), Mission history row (checkmark + name + domain tags + XP), Level rank title system, Level-up celebration animation, Streak & Rewards Card (flame icon + multiplier badge + freeze count + recent badges)
