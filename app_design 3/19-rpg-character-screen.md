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
2. Constellation Radar hero (S19-V01) — the cross-domain stat *shape* of all 10 domains, carrying **Life Power as its centre "sun" hub** (the standalone inline Life Power number is absorbed into the hub; it is also echoed in the stats summary row)
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
- **Visual treatment** (viz-upgraded — see Visualization S19-V01): under the specced design the Life Power number lives in the **Constellation Radar centre "sun" hub** (`text-display` + `--glow-orange`, count-up 520ms) and is echoed in the KPIStatTile stats row; the standalone inline row below is the fallback when the radar is unavailable. As the inline fallback — centered below character card, 16pt gap, single horizontal row:
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

## Visualization

> Source: `app_design 3/19-rpg-character-screen-visualization-recommendations.md`. Audited in `viz-audit/` — Batch (RPG/Differentiator cluster), findings `S19-V01..V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Cluster benchmark = **Finch + Habitica** (life-stats done *warmly*; this is Balencia's owned space — graded on warmth + legibility, not clone fidelity). Premium-depth, on-brand (60/30/10); **no new data** — every visual derives from `domainStats`, `domainProgress`, and `user` that the screen already shows. **Current grade D (54) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; residual gap to A+++ is build-verified depth + working drill/scrub micro-interactions, owned by the later viz-build program.)* This screen mints **no new primitive** — it composes `ConstellationRadar` (VK-005), `GaugeRing` (VK-002), the Living Line (VK-016) and `XPBar`/`StatBars` from the existing kit. **Register: Product Mode → orange-dominant; no SIA content → no purple on this screen, no projection series.**

The RPG Character screen is the user's "Call of Duty profile card" — the stat profile. Today it renders that profile as **text + flat fill bars with no focal visualization at all**: Life Power is plain inline text, the 10 domains are a number + a 3pt flat domain-colour bar, and the cross-domain *shape* that is the entire point of a character sheet is never drawn. This section upgrades *how its data reads* — from a stat list to a crafted, celebratory character sheet — by adding the **Constellation Radar hero** (the cross-domain shape no list can show), depth-upgrading the domain cards to a `GaugeRing` mini + XP **Living-Line** bar, and making the overall XP a **Living-Line progress**. **Non-shaming is load-bearing here:** every stat is framed as *growth state*, never a verdict on worth (RUBRIC dim 6).

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| 10 domain stats (0–99) as a *profile shape* | not shown (no chart on this screen) | **Constellation Radar with Life-Power sun hub** — the cross-domain shape | `ConstellationRadar` (VK-005) |
| Life Power (487) | plain orange inline text | **center "sun" hub** of the radar (`text-display` + `--glow-orange`) + echoed in the stats row | `ConstellationRadar` hub + `KPIStatTile` |
| Per-domain stat score (0–99) | big number only | `GaugeRing` mini (depth-upgraded, glow-by-size at small) wrapping the score | `GaugeRing` (VK-002) |
| Per-domain level XP (`currentXP/nextLevelXP`) | flat 3pt domain-colour fill bar | **domain XP `XPBar`** (value-vs-target, domain-coloured pill) | `XPBar` / `StatBars` |
| Overall level XP (`2,450 / 5,809`) | flat orange fill bar (no depth) | **Living-Line XP progress** (orange→green, arrival-aware) | `XPBar` re-based on Living Line (VK-016) |
| Avg domain stat + weekly delta | not shown | number + honest delta arrow (`weekDelta`, fixed window) | `KPIStatTile` (VK-008) |
| Streak / missions done / active / Life Power | text tiles | `KPIStatTile` row (kept text-led; deltas where honest) | `KPIStatTile` |
| Domain sub-stats (in bottom sheet) | labelled fill bars + tier word | **`StatBars`** (domain-coloured, value-vs-target, tier label kept) | `StatBars` / `MacroBar` |
| Name / rank title / avatar / mission rows / dates | text + checkmark | — (deliberately textual; a character *narrative*, not a chart) | — |

### 1 · Constellation Radar hero — `S19-V01`

A **new focal card inserted between the Character Card and the Life Power display** (it *becomes* the Life Power display — the lone inline number is absorbed into the radar's hub). This is the screen's missing hero: the cross-domain *shape* that makes "how far have I come?" legible in <2s, rendered as the **Constellation Radar** (`VK-005`), not a default radar and not a list.
- **Composition:** `ConstellationRadar` **hero variant (220–280pt** — the character sheet earns the larger size) of all 10 `domainStats`, with **Life Power (`487`) in the center "sun" hub** (`text-display` + `--glow-orange`, count-up 520ms) and the rank title beneath it. Domain **star dots** sit at each axis (`--color-domain-*` + faint `--glow-orange-sm`), so the radar doubles as the colour key the domain grid below reuses.
  > *Component reality:* the existing `RadarChart` is hardcoded `280×280`, flat **15%** orange (`fillOpacity 0.15`), **no center hub**, plain `r=4` dots, and animates with the `radar-grow` **scale** keyframe (which violates §8 "draw the line, never scale it in"). It is **not even mounted on this screen today** (imported only on Home/Life Areas). This card requires the `VK-005` depth upgrade *and* first-time placement here. Tracked under VK-005.
- **Depth (token-backed):** polygon fill = radial orange gradient `fillOpacity 0.25 → 0.08` (over a faint radial backplate behind the rings); stroke `--color-brand-orange` + `--glow-orange` (32px is correct at this hero size); 5 rings at **20/40/60/80/99** (99 = domain-stat max, intentional — not a bug); domain star dots keep `--color-domain-*` with a faint `--glow-orange-sm` **(mint)**.
- **Motion:** the polygon **draws itself** (`stroke-draw`, `--dur-flow` 1200ms / `--ease-flow`) — **replacing** the current `radar-grow` scale; dots stagger in (`radar-dot` 420 + index·40ms); hub Life-Power counts up 520ms. Radar draws **first**, before the domain grid (see Motion choreography).
- **Warmth / non-shaming:** a one-line read beneath the hub frames the *profile*, never a verdict — e.g. "Strongest in Fitness; Meditation is the room to grow." The weakest domain is a **constructive prompt**, never "you're failing at Meditation." Life Power is *growth state*, not a worth score (RUBRIC dim 6).
- **Micro-interaction:** tap an axis/star dot → that domain's Sub-Stats bottom sheet (same target as its grid card); tap the hub → expand to the full 10-domain ranked breakdown in place; long-press a spoke → scrub the domain's stat. Targets ≥ 44×44.
- **Data:** `domainStats[].stat`, `user.lifePower`, `user.title` (`src/data/mock.ts`).
- **States:** **cold-start / Day-1** → a **"calibrating — building your character"** hub state with a faint *full* polygon, **never** a degenerate point or empty radar (the Day-1 grid is "a canvas to fill" — the radar must honour that, not collapse); **partial** (only 1–2 domains active) → inactive domains rendered as **ghosted/dashed spokes pulled to the rings' inner edge** (no-data ≠ a real 0, so a sparse profile never reads as "you scored 0"); **loading** → skeleton keeps rings + spokes + hub frame visible, radial shimmer, morphs into the drawn fill.

### 2 · Domain Skill cards → `GaugeRing` mini + XP Living-Line bar — `S19-V02`

Each of the 10 domain cards keeps its layout but upgrades its two flat elements. The big stat score (0–99) is wrapped in a **`GaugeRing` mini** (the score is the arc value, 0–99 mapped to the arc); the flat 3pt domain-colour bar becomes a proper **domain `XPBar`** (`currentXP / nextLevelXP`, value-vs-target).
- **GaugeRing (mini, depth-upgraded, glow-by-size):** size **48px** card gauge in **`domain` colour mode** (the arc is the domain colour, not orange — identity), with an **arc-following gradient stroke** (domain-tinted `--grad-orange` analogue via conic-mask — *not* a flat SVG `linearGradient`), `--track-inset` beveled track, and **`--glow-orange-md` (~20px)** glow calibrated to the 48px size — **not** the 32px `--glow-orange`, which would swamp a card gauge (a 32px glow on a 48px gauge is a depth *failure*, not depth). The score number sits in the gauge centre (`text-h2`, count-up). At Lv.0 / 0-activity the gauge renders as a faint empty track (dimmed, still tappable) — never a missing ring.
  > *Component reality:* `ProgressRing` is locked to sizes `36 | 48 | 96`, flat 2-tone, single orange/green arc, **no domain colour mode, no gradient, no inset, no glow**. GaugeRing adds the `domain` colour mode + arc-gradient + size-stepped glow + inset track. Tracked under VK-002.
- **Domain XP bar:** the existing flat fill becomes `XPBar` (2px pill, track `--color-alpha-white-08`, fill = domain colour, value-vs-target). Per-card it stays a flat domain-coloured bar (the *overall* XP bar carries the Living-Line treatment — one line motif per surface, §8 — so the 10 card bars don't each become competing lines).
- **Motion:** each gauge fills 0→score (`ring-animate`, `--dur-slow` 520ms / `--ease-flow`) on card scroll-into-view, staggered 40ms per card after the radar; XP bars rise 0→% 100ms after their card.
- **States:** loading → gauge + bar skeleton (track visible, no fill); 0-activity → dimmed empty gauge + empty bar (aspirational, never an error).
- **Non-shaming:** a low domain gauge reads as "room to grow," echoing the radar's framing — never a red/fail state. Sort keeps strongest domains top-left (the spec's existing order), so the screen opens on strength.

### 3 · Overall XP — Living-Line progress — `S19-V03`

The Character Card's overall XP bar (`2,450 / 5,809 XP to level 16`) is re-based on the **Living Line** (VK-016): a **single continuous** orange→green fill (`--grad-progress` **(mint)**, radius-pill, 8px, track `--color-alpha-white-08`), arriving **green** as the user nears the next level — **not** a flat single-tone orange fill, and **not** segmented. This is the screen's one Living-Line surface (the §8 "one line motif per surface" budget spent on the identity-defining progression bar).
- **Level-up state:** the existing celebration (green glow + flash) becomes the Living Line *completing* its draw to green at 100% — the arrival is the celebration, on-brand.
- **Motion:** fills 0→current% (`--dur-slow` 520ms / `--ease-flow`), 200ms after the card, as today.
- **Non-shaming:** frames forward momentum to the next level; a low bar reads as "early in this level," never failure; no countdown weaponises loss.

### 4 · Stats summary → `KPIStatTile` row — `S19-V04`

The 4-cell stats row (streak · missions done · active missions · Life Power) adopts the **`KPIStatTile`** anatomy: label (uppercase `white/40`, +0.12em) + number (`text-h2`, count-up 280ms) + an **honest delta arrow** where a delta is meaningful (streak ▲ vs last week; Life Power ▲ `weekDelta`-derived) over a **fixed, disclosed window** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) — never a cherry-picked flattering range. Life Power here echoes the radar hub (one number, two reinforcing reads). Kept deliberately text-led — these are scalars, not series — so the screen keeps a calm hierarchy (radar is the one hero; this row supports). (VK-008.)
- **Non-shaming:** a ▼ on a delta is muted `white/40`, never alarming red — a dip is information, not a verdict.

### 5 · Domain Sub-Stats sheet → `StatBars` — `S19-V05`

In the Domain Sub-Stats bottom sheet, the 3–5 sub-stat fill bars adopt **`StatBars`** (the `MacroBar`/`XPBar` family at CONSISTENCY parameters): domain-coloured value-vs-target bars (6pt, track `--color-alpha-white-08`, rounded), with the existing tier word ("Developing/Proficient/Advanced…") kept as the **visible label** beside each — so status never rides colour alone. Bars rise 0→value on sheet-open (`--dur-slow` 520ms). The sheet header score reuses the same `GaugeRing` mini as the card it opened from (kit consistency — same data shape, same primitive). (StatBars / VK — MacroBar/XPBar family.)

### Motion choreography (entrance)

Per `CONSISTENCY.md`: **hero draws first** — the Constellation Radar polygon **draws itself** (stroke-dashoffset) while the Life-Power hub counts up and dots stagger in → **then** the domain `GaugeRing` minis fill (staggered 40ms/card) with their XP bars rising → **then** the overall **Living-Line XP bar** fills orange→green → **then** the `KPIStatTile` row counts up. One line motif per surface (the overall XP bar is the line; card XP bars stay flat domain fills). Below-fold cards animate on scroll-into-view. `prefers-reduced-motion` → all visuals render at final state instantly, with the Living Line's static form (completed stroke + green end at arrival) and the radar's drawn polygon + star dots preserved — the signature survives without motion.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** (radar "calibrating — building your character" with a faint full polygon, all 10 gauges as faint empty tracks, XP Living-Line empty — aspirational "canvas to fill," never a collapsed point); **loading** (depth-preserving skeletons that morph into drawn data — radar rings/spokes/hub frame, gauge tracks, bar tracks visible, not blank discs — per the Error Handling table); **partial** (active domains live, inactive ghosted/dashed on the radar + dimmed gauges in the grid, distinct from a real 0); **error** (chart-specific, per the Error Handling table — radar/grid/stats fail independently with cached values + "try again", naming which section failed).
- **60/30/10:** **orange dominates** — radar fill/stroke, the Life-Power sun glow, the overall XP Living-Line's effort segment, level diamond, "view"/journal links; **green = arrival only** — XP Living-Line's near-level-up segment, mission checkmarks + earned-XP text, positive `KPIStatTile` deltas, level-up; **purple is absent — correct**: this is a pure stats display with **no SIA/AI content**, so no purple and **no projection series** appears (a projection here would be a brand error). **Domain colours appear only for identity** — radar star dots, the 10 domain `GaugeRing` arcs, domain XP bars, sub-stat bars, mission domain dots — never as decorative palette. The freeze-blue snowflake stays a deliberate frost accent (streak-freeze affordance), not a data colour. Glow uses the calibrated **size-stepped** scale (`--glow-orange` 32px on the hero radar / `--glow-orange-md` ~20px on 48px gauges) — premium warm depth, not neon.
- **Accessibility:** the radar keeps an `aria-label` reading Life Power + ranked top domains; each `GaugeRing` renders its score as the centre text equivalent; every domain card keeps its "[domain], stat score [n], Level [n]" label; status/identity is **never colour-alone** — domain cards carry the domain *name* + dot, sub-stat rows carry the tier *word*, deltas carry an *arrow* glyph, mission completion carries a *checkmark*; load-bearing strokes/arcs/dots (radar polygon + star dots, gauge arcs, the filled/unfilled boundary, XP Living-Line) meet **WCAG 1.4.11 ≥ 3:1** on `#0A0A0F` / `#211008` (the white/5 radar rings are decorative-only structure); text/value contrast ≥ 4.5:1; interactive targets (domain cards, radar axes, sheet controls) ≥ **44×44pt** (carries B08-F02/F03); `prefers-reduced-motion` renders all visuals at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Finch + Habitica (RPG stats done *warmly*, mature not cartoonish) — *stays Balencia via the Constellation Radar sun-hub + warm-glow surfaces on ink-brown, the non-shaming domain framing, and the Living-Line overall XP bar.*

**Pre-grade:** A− (86) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the viz-audit specced the hero Constellation Radar + GaugeRing minis + Living-Line overall XP (all A− depth), but the non-chart surfaces (character card, domain cards, stats row, mission rows, streak card) remain flat `--color-ink-brown-800` with no `CK-T01` top-edge highlight or layered depth; (2) focal hierarchy has two competing foci (the character card hero claims "identity + progression anchor" vs the radar as the cross-domain focal point); (3) edge microcopy (cold-start "calibrating", empty missions, loading states) is partly unauthored; (4) type line-heights are ad-hoc pixel values (26pt on the 20pt greeting → needs `--leading-snug`), tracking unspecified; (5) Streak & Rewards section in Components is omitted from Motion / State craft, leaving that card's states undesigned; (6) contrast is asserted ("text ≥4.5:1"), not tabulated with specific pairs.

### Focal hierarchy

**One focal point:** the **Constellation Radar hero** (the cross-domain stat *shape*, the screen's raison d'être) — sized as a hero (~220–280pt), sits **immediately above Life Power**, and carries `--glow-orange` (32px) on the center sun-hub. The **Character Card** sits *above* the radar as a warm, sized-down identity preamble: 20pt greeting + 16pt level diamond + rank title, all on a `CK-P1` surface with no glow, capped at ~280pt. This resolves the focal split — the squint test now lands on the radar's Life Power sun-hub first (bright glow, center), then the character card (warm but quieter), then the domain grid (secondary by size/order). Everything below (stats row, missions, streak card) is visibly tertiary.

### Surface & depth

Every card adopts **`CK-P1` Layered Warm Surface** — `--color-ink-brown-800` body · `--radius-xl` 28pt (character card, stats row, streak card, mission-list container) or `--radius-md` 14pt (domain skill cards <80pt height) per CONSISTENCY.md §1 · 1pt `--glass-border` (white/6) · **`CK-T01` top-edge highlight** (the not-flat cue, previously absent) · `--shadow-1` (mid surfaces `--shadow-2`). The character card hero adds `CK-T02 --surface-backplate` (faint warm radial behind the rings). Domain skill card XP bars recess over `--track-inset`. Glow is size-calibrated per locked table: `--glow-orange` (32px) on the radar hub only (≥96px hero); `--glow-orange-md` (~20px) on the 48px `GaugeRing` minis per S19-V02; **no glow** on inline text/badges. Mission checkmarks + XP earned text use `--color-forest-green` for completion identity. Streak card keeps the flame icon (20pt, `--color-stalled-amber`) on the left for visual weight; the freeze snowflake (16pt, `--color-freeze-blue`) differentiates freeze-status as a frost accent, not orange data-ink.

### Typographic rhythm

Remap the Typography table to `CK-P3` tokens:

- Character card name `--text-h2` (20pt) / `--leading-snug` (1.25) / 600 weight
- Character card level + rank `--text-body` / `--leading-normal` / 600 (level diamond icon 14pt, orange) / 400 (rank title at white/50)
- XP label `--text-caption` / `--leading-normal` / 400
- Life Power score (28pt) → `--text-display-l` (32pt) / `--leading-tight` (1.1) / 700 weight / tabular-nums, orange
- Life Power label `--text-caption` / 400 / white-50
- Domain eyebrow `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40)
- Domain card name `--text-small` (11pt) / 400 / white-50
- Domain stat score (24pt) → `--text-h2` / `--leading-snug` / 700 / tabular-nums
- Domain level "Lv.12" `--text-caption` / 600 / white-60 / tabular-nums
- Stats row number `--text-h2` / `--leading-snug` / 700 / tabular-nums
- Stats row label `--text-caption` / 400 / white-50
- Streak count (24pt) → `--text-h2` / `--leading-snug` / 700 / tabular-nums
- XP multiplier / freeze count `--text-caption` / 600 / orange or white
- Mission name `--text-body` / 600 / white
- Mission domain + date `--text-small` / 400 / white-40
- Mission XP earned `--text-body` / 600 / `--color-forest-green`

Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case everywhere (eyebrows uppercase only). ≤2 `--color-brand-orange` accent words per screen (level diamond, Life Power score, "view" link). Chillax stays logo-only (none on this screen). Stat figures and streak counts tabular-nums.

### Microcopy (before → after)

Every string authored to `CK-P5`:

- **Character card rank title** — *before:* "Dedicated explorer" (existing, already on-voice) → *after (warmth lock):* stays as-is ("beginner" / "apprentice" / "dedicated explorer" / "rising champion" / "life architect" / "grand master" — already non-shaming progression titles)
- **Life Power hub state, cold-start** — *before:* "0" (bare number) → *after:* hub reads "Building your balance — add your first domain to get started" (warm, constructive, never "no data yet")
- **Domain skill card, Lv.0** — *before:* bare "Lv.0", stat "0", dimmed text → *after (in card tooltip or sub-stat sheet):* "[Domain name] is early in your journey — log one entry to begin tracking" (aspirational, not failure)
- **Stats row, incomplete** — *before:* "0 day streak", "0 missions done" → *after:* framed as states, never verdicts — "0 · building momentum" in the label, never a bare zero
- **Mission history, empty** — *before:* "no missions completed yet. your completed missions will appear here as you finish goals." → *after:* "Complete a goal to see your journey here. Start with one small mission."
- **Constellation Radar, partial sync** — *before:* ghosted domains show no label → *after:* tooltip on ghosted spoke reads "[Domain name] · waiting for first log" (explains the state)
- **Loading** — *before:* no string specified → *after:* "Building your character — one moment" (warm, not generic "Loading...")
- **Pull-to-refresh failure** — *before:* no recovery message → *after:* "Couldn't refresh — pull again or tap to retry" (honest, warm)
- **Streak & Rewards, no active streak** — *before:* no fallback copy → *after:* "No active streak — start a new one today" (encouraging, not shaming)

No exclamation marks. The brand period used with intent ("Building your balance." vs "Building your balance!"). SIA strings stay specific to the user's data (such as "Meditation is early in your journey" reads the actual stat state, not a horoscope).

### Motion choreography

Locked to `CK-P4` draw-first order (reconciled with Motion table):

1. **Character card** fades + scales in (`--dur-base` 280ms `--ease-out-soft`)
2. **Constellation Radar hero** polygon draws itself (`stroke-animate`, `--dur-flow` 1200ms `--ease-flow`) → domain star dots stagger in (40ms between each, `radar-dot` class) → Life Power sun-hub counts up 0→current (`--dur-slow` 520ms)
3. **Domain skill cards** fade-in + rise staggered (`--dur-base` 280ms `--ease-out-soft`, 40ms stagger per card, triggered after radar completes)
4. **GaugeRing minis** on each card fill 0→stat% (ring-animate, `--dur-slow` 520ms, on card scroll-into-view)
5. **Domain XP bars** rise 0→current% (`--dur-base` 280ms, 100ms after card enters)
6. **Overall XP Living-Line bar** in character card fills 0→current% (orange→green `--grad-progress`, `--dur-slow` 520ms, 200ms after card)
7. **Stats row** fades + rises (`--dur-base` 280ms, 40ms after cards complete)
8. **Streak & Rewards card** fades + rises (`--dur-base` 280ms, on scroll-into-view)
9. **Mission history rows** staggered fade-in (`--dur-base` 280ms, 40ms between rows, on scroll-into-view)

**One line motif per surface** (§8): the overall XP bar is the Living Line; domain card XP bars stay flat domain-coloured fills (not competing lines). No opacity-fade on the radar polygon — it draws with `stroke-dashoffset`. `prefers-reduced-motion` → settled final frame: radar fully drawn + star dots present, XP Living-Line at final orange/green position, all rings at final fill %, no loops.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | Character card (Lv.1, 0 XP, empty bar), Constellation Radar "calibrating" state (faint full polygon, dashed spokes, hub reads "Building your balance"), all 10 domain cards at Lv.0 stat 0 with dimmed/ghosted appearance, stats row all zeros, "create your first mission" prompt card (in place of mission history), one genesis activity item "+10 XP Welcome" | "Building your balance"; "[Domain name] is early in your journey — log one entry to begin tracking" (in sub-stat sheet); "Complete a goal to see your journey here." | radar hub shows no Life Power number (degenerate); faint full polygon (aspirational, never collapsed point); `--surface-backplate` on hero cards; domain cards visibly ghosted (white-30 text, faint track), still tappable |
| **Loading** | depth-preserving skeletons: radar rings/spokes/hub frame visible (not blank disc), domain card tracks visible (gray shimmer), stat row outlines visible, mission rows as skeleton lines | "Building your character — one moment." | skeleton on `--color-ink-brown-800` with radial shimmer behind radar; tracks and frames visible, morphs into drawn fill |
| **Empty / partial** | un-synced domains = ghosted/dashed spokes on radar + dimmed gauges in grid (white-30, empty track); present domains show live data | per-zone, on-voice — such as "[Domain] · waiting for first log" on a ghosted spoke tooltip | no-data ≠ zero (ghosted/dashed, visually distinct from a real stat 0) |
| **Error** | per-section skeletons (radar rings, domain cards, stats row, mission rows) + network banner below header naming the failed zone, with "try again" link | "Couldn't refresh — pull again." (generic); "[Section name] failed to load — tap to retry" (specific per section) | calibrated `--color-error-red` only on genuine operational failure (not on 0 data); error-red 1–2pt border or text + glyph (such as ⚠️) + word, never color-alone |
| **Offline** | cached data retained, all action-buttons (tap to expand/navigate) honestly dimmed with a reason; pull-to-refresh dimmed with "you're offline" affordance | "You're offline — showing your last sync from [time]." | actions dimmed (white-30 text, white-5 bg instead of interactive state); a cached banner sits below sticky header |

### Signature & anti-generic

**Ownable Balencia moments:**
1. **Constellation Radar sun-hub** — the Life Power number as a glowing center, the cross-domain *shape* no flat stat list shows
2. **Living-Line overall XP bar** — orange→green gradient fill, arrives green at level-up (the brand's motion signature, draw-not-fade)
3. **Warm-glow-on-ink surfaces** — size-calibrated `--glow-orange` on the radar hero, `--glow-orange-md` on the 48px gauges, never flat boxes or neon
4. **Non-shaming domain framing** — a low domain gauge reads "room to grow," a zero reads "early in your journey"; sorted strongest-first (screen opens on strength)

**Generic-tell fixes:** the 10-card grid (if monotonous) is broken by the character card hero + varied card visual hierarchy (some with glow, some without) + the radar inserting a focal visualization before the grid. Domain skill cards are small (14pt radius, under 80pt) but elevated with the layered surface recipe + glow on the gauge mini (not neon, size-stepped). Copy is authored warmly on every edge (loading, empty, error) — zero filler. Stat figures are tabular-nums (premium polish, not default monospace). Interaction state is unified to the `CK-T03 --focus-ring` (2px orange, 2px offset) everywhere.

### Accessibility

**Tabulated load-bearing contrast pairs** (on `--color-ink-brown-800` / `--color-ink-900`):
- Greeting (white-100) ≥12:1 on both fields
- Character card name (white) ≥12:1 on `ink-brown-800`
- Level "level 14" (white) + diamond icon orange ≥4.5:1 (text), ≥3:1 (icon, WCAG 1.4.11)
- Rank title (white-50) ≥4.5:1 on `ink-brown-800`
- Life Power score (orange `--color-brand-orange`) ≥3:1 on `ink-brown-800` (WCAG 1.4.11 load-bearing graphic)
- Domain stat score (white) ≥4.5:1 on `ink-brown-800`
- Domain level (white-60) ≥4.5:1
- Stats row number (white) ≥4.5:1
- Section eyebrow (white-40, decorative position-paired) ≥3:1
- `--color-forest-green` mission XP (green `--color-forest-green`) ≥3:1 on `ink-900` (load-bearing, completion indicator)
- Domain colors in GaugeRing arcs (domain colour) ≥3:1 on track white/8 (WCAG 1.4.11 — the arc is load-bearing data)

**Status never colour-alone:** domain completion is the arc + the stat number; mission completion is the checkmark icon **+ "Completed [mission name]"** label; the radar ghosted domain is a dashed spoke (visual pattern) + a label/tooltip; the XP Living-Line arriving green is the color + the arrival-aware animation + the label "2,450 / 5,809 XP" showing the value.

**Focus-visible:** the single `CK-T03 --focus-ring` (2px orange ring, 2px offset, box-shadow) applied to all interactive targets: character card avatar (44×44 tap target), domain skill cards (tap to open sheet, 44×44 min), stats row cells (if tappable, ≥44×44), mission history rows (tap to detail, 44pt min height), back button (44×44), streak card (if tappable). Tab order: back → avatar → character card as a group → radar (if tappable) → domain cards left→right, row by row → stats row → mission history rows → "view full journal" link.

**Reduced-motion:** `prefers-reduced-motion` renders: character card at final scale instantly, radar fully drawn (no `stroke-draw` animation, just the settled SVG), domain gauge rings at final fill %, XP bars at final width, mission rows at final opacity — the Living-Line static form (full stroke, orange→green gradient, final endpoint) is preserved, loops off, no entrance stagger. The radar's draw signature and the Living-Line's arrival moment survive non-motion context (the settled frame is the canonical frame).

Conform to `design-audit/CONSISTENCY.md`.


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

**60/30/10 verification**: Orange dominates the data ink — the Constellation Radar fill/stroke + glow, the Life-Power **sun hub** (radar centre), the overall XP **Living-Line** effort segment, plus avatar glow, level diamond icon, "show earlier"/journal links, and active tab. Green = arrival only — the XP Living-Line's near-level-up segment, mission checkmarks + earned-XP text, and positive KPIStatTile deltas. Purple is absent — correct, this screen has no SIA/AI content, so no projection series appears. **Domain colours are identity only** — the radar star dots, the 10 domain `GaugeRing` arcs (sanctioned multi-domain domain-mode), the domain XP bars, sub-stat StatBars, and mission domain dots — never decorative palette. Glow uses the size-stepped scale (32px `--glow-orange` on the hero radar / ~20px `--glow-orange-md` on the 48px gauges). Ratio holds.

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
| Constellation Radar hero | Screen mount | Polygon **draws itself** (stroke-draw, replacing radar-grow scale); domain star dots stagger in (radar-dot 420 + index·40ms); Life-Power sun hub counts up | 1200ms (draw) / 520ms (hub) | ease-flow |
| XP bar (overall) | Screen mount | Living-Line fill 0→current % (orange→green, arrival-aware — S19-V03), starts 200ms after card | 520ms | ease-flow |
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
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-08.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me/rpg`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B08-F01 | major | navigation | Make `showBack` render a 44x44 labeled button/link that pops history or routes to the previous Me screen. |
| B08-F02 | major | navigation | Make each domain card a semantic button that opens the Domain Sub-Stats sheet and links to the domain dashboard. |
| B08-F03 | minor | mobile-ergonomics | Expand the touch area to at least 44px high while preserving the compact visual treatment. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

