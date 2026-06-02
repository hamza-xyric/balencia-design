# Screen Design: Leaderboard

**Screen**: 39 of 73
**File**: 39-leaderboard.md
**Register**: Product Mode
**Primary action**: view rankings
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Leaderboard). Entry from Explore [18] grid card or SIA deep-link [09] ("you moved up 3 spots this week"). Exit via back button to Explore, or forward to RPG Character [19] via own rank card.

---

## Purpose

This screen is the social motivation layer — a leaderboard ranking users by life improvement consistency, not domain-specific metrics. It answers "who is leading in improving their life?" The core measure is XP earned through habit completion, goal progress, and engagement consistency. This is tied directly to the RPG gamification system: levels, XP, and streaks drive rankings. The philosophy is "individual first, social as enhancement" — this screen is optional, motivational, and never shaming. The framing emphasizes discipline and consistency, not raw ability.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header — "Leaderboard" title with back navigation
2. Segmented time filter — This week / This month / All time
3. User's own rank card — highlighted, always visible, personal anchor
4. Leaderboard list — ranked rows of other users
5. Friends filter — toggle between global and friends-only

**User flow**:
- **Arrives from**: Explore [18] via "Leaderboard" card (stack push), SIA Chat [09] via deep-link when SIA mentions rank change
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: RPG Character [19] via own rank card tap (stack push), limited user profile view via tapping other users (lightweight sheet)

---

## Layout

**Scroll behavior**: FlatList (leaderboard can be long, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]     "Leaderboard"        │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  [This week][This month][All time] │  ← Segmented Control
│                                     │  ← 16pt gap
│  ┌═════════════════════════════┐   │
│  ║  #12          ↑3 this week  ║   │  ← User's Own Rank Card
│  ║  [avatar] Hamza    Lv. 14  ║   │     (highlighted, orange
│  ║  2,340 XP  🔥 21-day streak║   │      border accent)
│  ║  [learning]                 ║   │     top domain badge
│  └═════════════════════════════┘   │
│                                     │  ← 8pt gap
│  [global]  [friends]               │  ← Filter Toggle
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │  #1  [av] Sarah    Lv. 23  │   │  ← Rank Row 1 (gold)
│  │       4,120 XP  [fitness]   │   │
│  ├─────────────────────────────┤   │
│  │  #2  [av] Ahmed    Lv. 21  │   │  ← Rank Row 2 (silver)
│  │       3,890 XP  [spiritual] │   │
│  ├─────────────────────────────┤   │
│  │  #3  [av] Lisa     Lv. 20  │   │  ← Rank Row 3 (bronze)
│  │       3,650 XP  [career]    │   │
│  ├─────────────────────────────┤   │
│  │  #4  [av] Omar     Lv. 19  │   │
│  │       3,410 XP  [finance]   │   │
│  ├─────────────────────────────┤   │
│  │  #5  [av] Priya    Lv. 18  │   │
│  │       3,200 XP  [wellbeing] │   │
│  ├─────────────────────────────┤   │
│  │  ...more rows...            │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Leaderboard" title

2. **Leaderboard Type Tabs** — 40pt
   - Purpose: Switch between global XP leaderboard, competition leaderboards, and country leaderboards
   - Content: "global" / "competitions" / "country" segmented control

3. **Segmented Time Filter** — 40pt (shown for global/country tabs only)
   - Purpose: Filter rankings by time period
   - Content: "this week" / "this month" / "all time"

4. **User's Own Rank Card** — ~120pt
   - Purpose: Personal anchor — the user always sees their position
   - Content: Rank, avatar, name, level, XP, streak, top domain badge, rank change

4. **Filter Toggle** — 32pt
   - Purpose: Switch between global and friends-only rankings
   - Content: "global" / "friends" underline tabs

5. **Leaderboard List** — Remaining height (FlatList)
   - Purpose: Ranked list of users
   - Content: Individual rank rows

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Leaderboard" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Segmented Time Filter
- **Purpose**: Filter leaderboard by time range
- **Data source**: View state (local), triggers API reload on change
- **Visual treatment**: Identical to Screen 38 Segmented Control pattern. 16pt horizontal margins.
- **Content**:
  - Container: Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill
  - Three segments: "this week" / "this month" / "all time" (13pt Sora Semibold, sentence case)
  - Active: Burnt orange fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Variants**: This week (default), This month, All time
- **Gestures**: Tap to switch period
- **Size**: Full-width minus 32pt x 40pt

### User's Own Rank Card
- **Purpose**: The user's personal position — always visible, the emotional center of the screen
- **Data source**: API — current user's rank, XP, level, streak, top domain
- **Visual treatment**: ink-brown-800 glassmorphism card with orange border accent (1.5pt, #FF5E00 at 40%). 20pt radius. 20pt padding. 16pt horizontal margins. This is the only card with a colored border on this screen — it signals "this is you."
- **Content layout**:
  - Top row:
    - Left: Rank number — "#12" in 24pt Sora Bold, white. If top 3: gold (#FFD700) for #1, silver (#C0C0C0) for #2, bronze (#CD7F32) for #3.
    - Right: Rank change indicator — "↑3 this week" in 13pt Sora Semibold. Up: green (#34A853) with ↑. Down: orange (#FF5E00) with ↓. Same: white at 40% "—".
  - Middle row (12pt below top):
    - User avatar: 44pt circle, left-aligned. Placeholder: first initial on orange (#FF5E00) circle. Photo if available, --r-pill corners.
    - User name: 16pt Sora Semibold, white, 12pt right of avatar
    - Level badge: "Lv. 14" in 13pt Sora Semibold. Pill shape: ink-900 bg, 1pt orange border, --r-pill, 24pt height, 8pt horizontal padding. Right-aligned.
  - Bottom row (8pt below middle):
    - XP: "2,340 XP" — 14pt Sora Regular, white at 70%. `tabular-nums` for alignment.
    - Streak: Flame (14pt, orange) + "21-day streak" in 13pt Sora Regular, white at 60%. 16pt right of XP.
    - Top domain badge: Domain Tag Chip (as defined in Screen 37) positioned at far right. Shows the user's highest-level domain.
- **Sticky behavior**: If the user scrolls and their rank row is not in the visible leaderboard area (e.g., user is rank 47 but viewing top 10), this card pins to the top of the list area below the filter toggle. When their row comes into view in the list, the pinned card unpins and scrolls normally.
- **Gestures**: Tap navigates to RPG Character [19] (stack push)
- **Size**: Full-width minus 32pt x ~120pt

### Filter Toggle
- **Purpose**: Switch between global leaderboard and friends-only
- **Data source**: View state (local), triggers API reload
- **Visual treatment**: Minimal underline tab style. 16pt horizontal margins.
- **Content**:
  - "global" / "friends" — 14pt Sora Semibold
  - Active: White text, 2pt orange underline (#FF5E00), 4pt below text
  - Inactive: White at 50% text, no underline
  - Gap between labels: 24pt
- **Variants**: Global (default), Friends (requires community/rooms to populate)
- **Gestures**: Tap to switch filter
- **Size**: Auto-width x 32pt

### Leaderboard Rank Row
- **Purpose**: Individual user in the ranked list
- **Data source**: API — paginated leaderboard data
- **Visual treatment**: Rows within a continuous ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (72pt tall):
  - Rank number (left, 32pt wide area): 17pt Sora Bold, white. Top 3 use accent colors:
    - #1: Gold (#FFD700)
    - #2: Silver (#C0C0C0)
    - #3: Bronze (#CD7F32)
    - #4+: White
  - Avatar (12pt right of rank): 36pt circle, --r-pill. Placeholder: first initial on ink-brown-800 circle with white text.
  - Name (12pt right of avatar): 15pt Sora Semibold, white. Single line, truncated.
  - Level badge (right-aligned): "Lv. 23" — 12pt Sora Semibold. Pill: ink-900 bg, 1pt white 20% border, --r-pill, 22pt height, 6pt horizontal padding.
  - Second line (below name, left-aligned with name): XP (13pt Sora Regular, white at 50%, `tabular-nums`) + Top domain badge (Domain Tag Chip, 8pt right of XP)
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Top 3 (colored rank number, subtle glow behind rank), Regular (white rank), User's own row (if visible in list, orange left border accent 3pt)
- **Gestures**: Tap opens limited user profile (bottom sheet with avatar, name, level, top domains, streak)
- **Size**: Full-width minus 32pt x 72pt per row

### Leaderboard Type Tabs
- **Purpose**: Switch between global XP leaderboard, active competition leaderboards, and country-based rankings
- **Data source**: View state (local), triggers different API endpoints on switch. Leaderboard types from `leaderboard_type` enum: global, country, friends, competition.
- **Visual treatment**: Segmented control at the top of the screen, below the header. Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill. Three segments: "global" (default) / "competitions" / "country" (13pt Sora Semibold).
  - Active: Burnt orange fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Behavior**:
  - "global": Shows standard XP leaderboard with time filter and global/friends toggle (existing behavior)
  - "competitions": Shows a list of active competitions the user has joined, each as a mini-leaderboard card. Tapping a competition card navigates to Competitions [47] detail view. If no active competitions: "Join a competition to see rankings here" with CTA linking to Competitions [47].
  - "country": Shows rankings filtered to user's country (from timezone/profile). Same row format as global.
- **Gestures**: Tap segment to switch. Content crossfades (280ms).
- **Size**: Full-width minus 32pt × 40pt

### Competition Leaderboard Card (shown in "competitions" tab)
- **Purpose**: Mini-leaderboard for an individual competition the user has joined
- **Data source**: API — `/api/competitions/:id/leaderboard`, competition metadata
- **Visual treatment**: ink-brown-800 card, --r-md radius, 16pt padding. 16pt margins.
  - Header row: Competition name (15pt Sora Semibold, white) + status badge ("active" green pill, "ending soon" orange pill) + participant count (13pt Sora Regular, white at 50%)
  - Top 3 mini-rows: rank + avatar (24pt) + name + score (compact, 13pt). Gold/silver/bronze rank colors.
  - User's position: Highlighted row with orange left border (3pt), shows "You — #8 of 42"
  - "View full" link: right-aligned, 13pt Sora Regular, orange, navigates to Competitions [47]
- **Variants**: Active (countdown to end date), Ending soon (< 24hrs, orange pulse on badge), Ended (greyed, shows final position)
- **Gestures**: Tap card → navigate to Competition Detail [47] (stack push). Tap "view full" → same.
- **Size**: Full-width minus 32pt × ~160pt

### Limited User Profile (Bottom Sheet)
- **Purpose**: Quick view of another user's stats
- **Data source**: API — public profile data
- **Visual treatment**: Bottom sheet, ~40% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Avatar: 64pt, centered
  - Name: 20pt Sora Semibold, white, centered, 16pt below avatar
  - Level: "Level 23" — 14pt Sora Regular, white at 60%, centered
  - Top 3 domains: Row of Domain Tag Chips, centered, 16pt below level
  - Streak: Flame + count, centered, 12pt below domains
  - XP: "4,120 XP this month" — 14pt Regular, white at 50%, centered
  - **Overflow menu** (top-right of bottom sheet): Three-dot icon (20pt, white at 60%), 44x44pt touch target. Positioned 16pt from top edge, 16pt from right edge.
- **Gestures**: Drag to dismiss, tap outside to dismiss, tap overflow menu to open context menu

### Report/Block Context Menu (from Limited User Profile overflow)
- **Purpose**: Allow users to report or block another user from the leaderboard profile sheet
- **Trigger**: Tap the three-dot overflow menu icon in the top-right of the Limited User Profile bottom sheet
- **Visual treatment**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Appears below the overflow icon, right-aligned. 8pt vertical padding.
- **Content**:
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%. Full-width tap target.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336. Full-width tap target.
- **Behavior**:
  - Tap "Report": Dismisses context menu and Limited User Profile sheet, navigates to Report/Block flow [64] with user pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the Limited User Profile sheet (replaces sheet content below avatar/name).
- **Gestures**: Tap outside to dismiss context menu, tap row to act

### Block Confirmation (inline within Limited User Profile)
- **Purpose**: Confirm blocking a user from leaderboard context with a clear explanation of consequences
- **Trigger**: Tap "Block" in the Report/Block Context Menu
- **Visual treatment**: Replaces the bottom half of the Limited User Profile sheet content (below name). Centered layout, 24pt horizontal padding.
- **Content**:
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap between buttons):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg. 44pt touch target.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg. 44pt touch target.
- **Behavior**:
  - Tap "Block": Calls POST /api/users/:id/block, dismisses sheet, blocked user's row is removed from leaderboard with slide-out animation (280ms ease-out-soft). Toast: "user blocked" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard Limited User Profile content (crossfade, 280ms).

---

## Visualization

> Source: embedded-section only (no companion file — Batch 5). Audited in `viz-audit/` — Batch 5 (Social/Leaderboard D), findings `S39-V01..S39-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen MINTS `VK-012` PodiumRank** — the top-3 podium + ranked-row primitive; its full spec is folded into `VIZ-KIT.md`. Benchmark = **Strava segments + Duolingo leagues**, rendered the Balencia way (warm-glow podium, Living-Line climb) — **explicitly non-toxic** (this screen's ethical crux): the comparison surface must motivate *your climb*, never shame a low rank. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified podium depth + the working rank-history TrendChart scrub, owned by the later viz-build program.)*

This is a **Social/Leaderboard D template** screen. Today it renders as a flat ranked **text list**: the top 3 are ordinary rows whose only podium signal is the *rank-number colour* (gold/silver/bronze text — a colour-alone + WCAG 1.4.11 miss, with no visible medal/glyph and the built `aria-label` only "Open limited profile for {name}, rank {N}"); XP is bare text (no bar); the own-rank card's "↑3 this week" is **hardcoded green**, not read from `leaderboardOwnRank.rankChange`; and there is **no hero, no rank-progression trend, and no honest delta window** anywhere (the period filter merely adds a flat XP offset). This section upgrades *how the standings read* — a warm top-3 **podium hero**, XP **StatBars** with honest per-period deltas on every row, and a **Living-Line "your climb" TrendChart** — while keeping the user's own row **always anchored and never shamed**. Mints `VK-012` PodiumRank; otherwise retires kit backlog (`BarChart`/`StatBars`, `TrendChart`/`VK-016`, `KPIStatTile`).

> **Component reality (spec-vs-build diff — each gap is a finding):** the route `/features/leaderboard` renders `LeaderboardRow.tsx` (rank# + avatar + name + `Lv.` pill + bare XP + `DomainTag`) inside a flat `Card`. **No podium structure exists** — `rankClass()` only tints the rank number `text-podium-gold/silver/bronze` (the podium tokens *do* exist in `globals.css`: `--color-podium-gold/silver/bronze`), so podium status is **colour-alone** (`S39-V01`). **No XP bar** — XP is `tabular-nums` text, so relative standing isn't visually encoded (`S39-V02`). **No rank-change delta on rows**, and the own card's delta is a **hardcoded** `<ArrowUp/> 3 this week` literal that ignores the real `leaderboardOwnRank.rankChange` field (`S39-V01`/`S39-V03`). **No rank-history series exists** in `mock.ts` — the "your climb" trend has no data backing yet (`S39-V03`). `LineChart.tsx`/`BarChart.tsx` exist but are **unused** (wire-up). These are the resolution gaps this section closes.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Top-3 standings (gold/silver/bronze) | flat rows; rank-number colour only (colour-alone) | **PodiumRank hero** — 3 raised plinths (2-1-3 stage order), avatar + crown/medal **glyph** + name + level + XP, podium-colour as *identity* | `PodiumRank` (`VK-012`) — **hero** |
| Ranked rows #4+ (rank · avatar · name · level · XP) | rank# + bare XP text + level pill | **ranked rows** — rank# + avatar + name + **XP `StatBar`** (relative-to-leader fill) + level badge + honest delta | `PodiumRank` rows → `BarChart`/`StatBars` (`VK-006`) |
| Per-row rank movement vs last period (▲/▼/—) | absent on rows; own card hardcoded | **honest delta chip** per row + own card — ▲ green / ▼ muted / — neutral, **disclosed window** ("vs {period}") | `KPIStatTile` delta (`VK-008`) |
| User's own rank + XP + streak + Δ (anchor) | own card; hardcoded green ▲ | **anchored own row/card** — same PodiumRank row treatment, always pinned & visible, leads with *your* climb | `PodiumRank` own-row (`VK-012`) |
| Rank progression over weeks ("your climb") + SIA projection | not shown anywhere | **Living-Line `TrendChart`** — solid orange actual climb → dashed-purple SIA forecast; **inverted y so up = better** | `TrendChart` (`VK-006` / `VK-016`) |
| Competition mini-leaderboard (competitions tab) | top-3 mini-rows, colour-only | compact PodiumRank mini-variant (medal glyph + score `StatBar`) + own "You — #8 of 42" anchor | `PodiumRank` compact (`VK-012`) |
| Streak (21-day) · top-domain tag · name · level | text / chip / pill | — (deliberately textual / iconographic — flame + `DomainTag` identity) | — |

**Editorial hierarchy (calm, not maximal):** the **PodiumRank hero is the one viz focal point**; the ranked rows + their XP StatBars are a clearly-secondary dense list; the "your climb" TrendChart is a deliberately *secondary* below-fold panel (revealed in the high-motivation tier / own-card expand), so the screen never becomes a wall of competing charts. One hero, one supporting trend, one row-bar system.

### 1 · Podium hero + honest delta — `S39-V01` → `PodiumRank` (`VK-012`)

**This screen mints `VK-012` PodiumRank** (full spec folded into `VIZ-KIT.md`). The top-3 are promoted from colour-only rows to a **warm 3-plinth podium**: classic **2 · 1 · 3 stage order** (1st centre-tallest, 2nd left, 3rd right), each plinth carrying its member's avatar (with a podium-coloured ring), a **visible rank glyph** (crown for #1, medal/laurel for #2–#3 — *never colour alone*), name, `Lv.` badge, and XP. Plinth fill = `--color-podium-gold/silver/bronze` as **identity** (the contained, brand-sanctioned exception — podium colour appears only on the plinth/ring/glyph, **never** on data ink); the #1 plinth carries a size-calibrated warm `--glow-orange-md` (~20px, **(mint)**) so the leader reads as the focal point without a casino glow.
- **Honest delta:** each podium member (and every ranked row) shows a **rank-movement chip vs the selected period** — ▲ `--color-forest-green` (climbed), ▼ `--color-alpha-white-40` (slipped — a **neutral muted** arrow, *never* red and never a "you're losing" alarm), — `--color-alpha-white-40` (held), each with a **visible glyph + the number** and a **disclosed window** ("vs this week / this month") — no cherry-picked flattering range, reading `leaderboardOwnRank.rankChange` (and a new per-entry `rankDelta`) rather than the hardcoded literal.
- **Depth (token-backed):** plinths on `ink-brown-800` + top-edge highlight + a faint radial backplate; `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess under each plinth top; only the #1 plinth carries `--glow-orange-md` (#2/#3 carry none — glow encodes the single leader); avatar rings 2pt in the member's podium colour.
- **Micro-interaction:** tap a podium member → Limited User Profile sheet (existing); the own member's plinth → RPG Character [19].
- **Non-shaming (ethical core):** the podium frames *aspiration*, not a verdict — there is **no "you're #12, you're behind" treatment**; lower ranks are never greyed-as-failure; the celebration is reserved for *climbing*, and the user's own position is always reachable (`S39-V04`).
- **Data:** `leaderboard[0..2]` + `leaderboardOwnRank` (add `rankDelta` / wire `rankChange`) in `mock.ts`.
- **States:** **Day-1 / community-of-one** → the podium renders the user on the **#1 plinth at 0 XP, Lv. 1**, the #2/#3 plinths **ghosted** with "invite friends to fill the podium" (honest — accurate *and* non-degenerate, never an empty stage); **loading** → 3 plinth skeletons that *rise* into place (not blank boxes); **partial** (only 1–2 ranked users) → real plinths + ghosted remainder.

### 2 · Ranked rows + XP StatBars — `S39-V02` → `PodiumRank` rows / `BarChart` `StatBars` (`VK-006`)

Rows #4+ keep the existing anatomy (rank# · avatar · name · `Lv.` badge · `DomainTag`) but **resolve XP from bare text into a horizontal XP `StatBar`**: a single rounded bar, `--color-brand-orange` fill over a `--color-alpha-white-08` track on a `--track-inset` recess, **width ∝ XP relative to the #1 leader's XP** on a **shared scale across all rows** (honest — one zero baseline, same max, so bar length is directly comparable down the list). The numeric "{xp} XP" stays beside the bar (value-plus-bar, never bar-alone). The **podium-colour rank tint on #1–#3 is retained but paired with a visible medal glyph** (fixing the colour-alone miss).
- **Depth (token-backed):** bars rise `--dur-slow` 520ms `--ease-flow` on scroll-into-view; rounded caps; no glow (glow is reserved for the #1 plinth — row bars stay flat-premium); rows divided by `--color-alpha-white-05`.
- **Honesty / non-shaming:** the StatBar shows *relative XP*, framed as "distance to close," **not** a deficit bar; a short bar reads as "room to climb," never "you're failing." Shared scale forbids the dishonest per-row re-normalisation that would exaggerate gaps.
- **Micro-interaction:** tap a row → Limited User Profile sheet (existing, with report/block).
- **Data:** `leaderboard[].xp` (+ leader XP for the shared max) in `mock.ts`.
- **States:** **friends-empty** → the existing "no friends on the leaderboard…" empty copy (rows absent, **not** zero-width bars); **loading** → per-row bar skeletons; **blocked-user removed** → row slides out (existing 280ms), the shared scale re-normalises honestly.

### 3 · "Your climb" rank progression (Living Line) — `S39-V03` → `TrendChart` (`VK-016`)

The signature, applied to *personal progress, not comparison*: a full **Living Line** of the user's own rank (or rank-percentile) over the trailing weeks — **one continuous, curved, round-capped stroke that draws itself**, running orange `#FF5E00` (effort) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green milestone dots** on personal-best weeks, a `--grad-orange` area fade (≤25% top), and a **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, *not* a 60/30/10 violation) continuing the same path ("on this pace, you reach ~#9 next week"). Curved monotone, `--stroke-thin` 2px actual / 2px dashed projection. **Y-axis inverted so visually-up = a better (lower-numbered) rank** — the line *rises* as the user climbs (honest: axis direction disclosed, label "higher = better rank").
- **Why the line, not a comparison bar:** "every chart is the line" (§8) reframes the whole screen from *them-vs-you* to *you-vs-past-you* — the Living Line is the device Strava/Duolingo structurally don't have, and it is the screen's non-toxic centre of gravity.
- **Placement:** a secondary panel surfaced on **own-card expand** and in the **high-motivation tier** (per the existing Motivation Adaptation block — "weekly XP trend sparkline" upgrades to this), so it never competes with the podium hero.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; projection draws after the actual climb; scroll-into-view (below fold).
- **Micro-interaction:** long-press to scrub a crosshair across weeks (rank + XP at that week); W/M/Y selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`).
- **Non-shaming:** a *downward* climb week is shown plainly (no red, no alarm) and SIA reframes it as "consistency dipped — one habit closes the gap," never "you dropped."
- **Data:** new `leaderboardOwnRank.climb` (≥4 weekly rank points + `projection`) in `mock.ts`.
- **States:** **cold-start (<2 weeks)** → "calibrating — building your climb" with a faint flat baseline, **never** a single dot; projection hidden until SIA has enough data; **reduced-motion** → completed stroke at rest + green end/milestone dot + static dashed-purple tail.

### 4 · Own-anchor row + competition mini-podium — `S39-V04` → `PodiumRank` own-row / compact

The own-rank card adopts the **PodiumRank row treatment** (XP StatBar + honest delta chip) and keeps its **always-anchored** behaviour: it stays pinned/visible whether or not the user is in the on-screen list (existing sticky logic), and in the **low-motivation tier** it **de-emphasises rank and leads with the climb** ("you completed 5 more habits than last week") per the Motivation Adaptation block — the rank number shrinks, the personal-progress line leads. The **competitions tab** renders a **compact PodiumRank mini-variant** per competition (medal glyph + score StatBar on the top-3, plus the anchored "You — #8 of 42" own row), replacing the colour-only mini-rows.
- **Non-shaming (ethical core, RUBRIC dim 6):** the own row is **never** rendered as a loss-aversion demotion alarm — no "you'll drop out of the league" countdown, no red, no manufactured urgency; the anchor guarantees the user is always *seen*, framed by *their* trajectory, not the gap to #1.
- **States:** **own-card load fail** → "rank unavailable" (`white/40`) per the Error Handling table (skeleton, not a fake #1); competition **ending-soon** → the existing orange badge pulse (a neutral time cue, not a shaming alarm).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the **PodiumRank plinths rise** (0→height, `--dur-slow` 520ms `--ease-flow`, centre #1 first → #2 → #3) with the leader's `--glow-orange-md` blooming in + the rank glyphs settling — **then** the own-anchor row's delta chip slides in + counts (280ms `--ease-out-soft`) → **then** the ranked rows' **XP StatBars rise** L-anchored (520ms, 80ms stagger, on scroll-into-view) → **then**, when revealed, the "your climb" **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing last. One line motif per surface (the climb trend is the only full Living Line; podium/rows use plinths/bars/numbers). Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every viz at final state instantly; the Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail), the podium plinths at full height, and the StatBars at final width are all preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1 (community-of-one)** — podium shows the user on the #1 plinth at 0 XP / Lv. 1 with #2/#3 **ghosted** + "invite friends to fill the podium" (honest, never an empty stage or a fabricated rival), climb trend "calibrating," friends tab uses the existing invite empty-state; **loading** — depth-preserving skeletons that *rise/draw* into data (plinths rise, bars fill, line draws — never blank boxes), per the Error Handling table; **empty** (friends-only, no friends) — the existing invite copy, distinct from loading; **partial** (1–2 ranked users) — real plinths/rows + ghosted remainder, shared StatBar scale honest; **error** — chart-specific honesty per the Error Handling table ("couldn't load rankings" + retry; own card "rank unavailable"; offline cached-rankings banner), never a degenerate empty podium.
- **60/30/10 & non-shaming:** **orange dominates** data ink (XP StatBars, own-card border, the climb Living-Line effort segment, segmented/filter accents, the #1 plinth glow, flame); **green** = arrival/positive only (▲ rank-up delta, milestone dots, the climb line's arrival segment); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on the climb trend (§11 forecast, correct *not* a violation) — **no other purple** (the leaderboard is user-driven social, not SIA-driven, per the screen's own 60/30/10 note); **podium gold/silver/bronze are confined to plinth/ring/glyph identity** (the contained exception), **never** on data ink; **error-red `#F44336` is confined to the destructive Block affordance**, never to a low rank or a ▼ delta (a slip is muted, not red). Glow uses the size-stepped scale (#1 plinth = `--glow-orange-md` ~20px, bars/sparklines = none) — warm depth, not neon. **The ethical crux:** no toxic comparison — no "you're behind #11" framing, no demotion alarm, no loss-aversion countdown; the user's own row is always anchored and framed by *their* climb.
- **Accessibility:** every podium plinth, row StatBar, delta chip, and the climb line carries a text/`aria-label` equivalent conveying the same value — podium announces position **in words + a visible glyph** ("First place, gold, Sarah, level 23, 4,120 XP, up 1 this week"), fixing the current colour-only podium + the thin built `aria-label`; rank movement is shown by a **visible ▲/▼/— glyph + the number**, never colour alone; XP StatBar always shows the numeric XP beside the bar (never bar/colour-alone); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — plinth edges, the leader glow boundary, StatBar fills, the Living-Line stroke, milestone dots, and the filled/unfilled boundary all meet ≥3:1 vs background (white/5 dividers/grid are decorative-only); interactive targets ≥ 44×44pt (rows, plinths, the scrub crosshair); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Strava segments + Duolingo leagues (non-toxic) — *stays Balencia via the PodiumRank hero + XP StatBars composition + the Living-Line "your climb" focus, never them-vs-you comparison.*
**Pre-grade:** A− (84) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) non-chart surfaces are flat without top-edge highlights or glow on focal elements; (2) the screen structure lacks a clear visual hierarchy between the podium hero and the ranked rows (two competing foci, unclear which reads first); (3) segmented control + filter toggle are unspecified interaction + unstyled type; (4) microcopy on the own-rank card's rank-change delta is hardcoded and doesn't read `rankChange`; (5) the rank-shaming risk (low rank, red deltas, "you're behind #1" framing) is present in the IA but not resolved in voice/copy; (6) contrast on the podium-colour rank numbers (gold/silver/bronze) is not tabulated, and the colour-alone miss is flagged; (7) state-craft (cold-start / friends-empty / loading / error / offline) is named but not authored.

### Focal hierarchy

One focal point: the **PodiumRank hero** (the top-3 podium with plinths, medal glyphs, the #1 plinth's `--glow-orange-md` bloom, and the leader's name/level/XP) — the first thing read, visually dominant, sized as a hero (≥96px per CONSISTENCY.md §1, the focal element carries glow). The own-rank card sits **directly below** the segmented time filter as a secondary anchor (always visible, always readable, but visibly quieter than the podium — no glow, body-weight text, 120pt height vs the podium's 160pt). The segmented control + filter toggle are tertiary navigation (not a focal layer). The ranked rows #4+ are a dense, deliberately secondary list (white body text, StatBars without glow, compact 72pt rows). The "your climb" Living-Line trend is deliberately **hidden at cold-start** and surfaced only on the high-motivation tier or via own-card expand — so it never competes with the podium hero. The squint test lands on the podium plinths (visually raised, glow-centered on #1) first, the own-rank card second, then the ranked rows as a scrollable list.

### Surface & depth

Every surface adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28pt (the podium card is a single large card containing all three plinths) · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`, previously absent) · `--shadow-1`. The own-rank card uses the same treatment + an **orange left border accent** (3pt, `--color-brand-orange` at 40%) to signal "this is you" (distinct from the podium). The leaderboard rows live inside a single large ink-brown-800 card with rounded corners, internal dividers (`--color-alpha-white-05` 1pt), and depth. The segmented control + filter toggle sit at the screen background (`ink-900`) with no surface container (intentionally minimal, navigation-only). Glow is **size-calibrated and strictly gatekept** per CONSISTENCY.md §1: **only the #1 plinth carries `--glow-orange-md` (~20px /.40)** (the leader is the glowing focal point, no other element carries glow — the #2/#3 plinths carry none, the own-rank card carries none, ranked rows carry none); this honesty prevents glow-overload and ensures the podium reads as the single hero. Podium tracks rest on `--track-inset` beveled recess (the contained exception — no-glow rule for rank bars). XP StatBars on rows use `--color-alpha-white-08` track over `--track-inset` with orange fill, no glow (they are ~8px inline elements). All interactive elements use the standardized `--focus-ring` (`CK-T03`, 2px orange, 2px offset).

### Typographic rhythm

Map the screen's existing typography to `CK-P3` tokens: screen title "Leaderboard" `--text-h2` 20pt / 600 / `--leading-snug` / white 100%; segmented control labels `--text-caption` 13pt / 600 / `--leading-normal` / white 100% active, white 60% inactive; own-rank card rank number `--text-display-l` 32pt / 700 / `--leading-tight` / white 100% (or podium-colour for top 3); own-rank card name `--text-h2` 16pt / 600 / `--leading-snug` / white 100%; own-rank card XP/streak `--text-body` 14pt / 400 / `--leading-normal` / white 70%; rank change indicator `--text-caption` 13pt / 600 / `--leading-normal` / green 100% (up) or white 40% (down/same — neutral muted, never red, never orange-as-alarm); ranked-row name `--text-h3` 15pt / 600 / `--leading-snug` / white 100%; ranked-row rank/XP/level `--text-caption` 13pt / 400 / `--leading-normal` / white 50%; filter toggle "global" / "friends" `--text-body` 14pt / 600 / `--leading-normal` / white 100% active, white 50% inactive. All stat figures use `tabular-nums`. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (the "Leaderboard" title does not count as accent; the two accents are: the own-rank card's orange left border glyph and the rank-change "↑" glyph if climbed). Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

Every edge string is authored to `CK-P5` brand voice — warm, plain, coaching, non-shaming. Specific reframes on this screen (the ethical crux):

- **Own rank display (hardcoded delta)** — *before:* `↑3 this week` hardcoded literal → *after (reading `rankChange`):* ▲ green (climbed) / ▼ muted white/40 (slipped, **never red, never orange-alarm** — frames dip as a correction opportunity, not a shame) / — white/40 (held). Always shows the **glyph + number + a disclosed window** ("vs this week"). Resolves the non-shaming breach.
- **Ranked row rank-change delta (new)** — *before:* absent on rows → *after (per row, on-voice):* each row shows its own ▲/▼/— indicator (same colour scheme as own card) with a number and the disclosed period, so users see *others' climb too*, framing the list as "who's climbing," not "who's ahead."
- **Podium framing (low-motivation tier, future)** — *before:* "you're #12, you're behind #1" implied → *after:* "your climb this week: +2 spots" (focus on *your* trajectory, not the gap). This is the non-toxic anchor.
- **Friends-empty state** — *before:* silent or generic "no friends" → *after (on-voice):* "no friends on the leaderboard — invite them from your community rooms to climb together" (warm invite, never a shame for being alone).
- **Day-1 / community-of-one podium** — *before:* empty podium or a degenerate single plinth → *after (honest, non-degenerate):* the user appears on the #1 plinth at 0 XP / Lv.1 (technically accurate and aspiring), the #2/#3 plinths are **ghosted** with "invite friends to fill the podium" (never an empty stage, never a fake rival). Frames the beginning as an invitation, not a failure.
- **Slipped delta** — *before:* red/orange "▼" alarm (dark-pattern shame) → *after (reframed):* muted white/40 "▼" with a number, no colour-alarm. Copy if triggered: "consistency dipped — one habit closes the gap" (SIA voice, constructive). The arrow is a neutral fact, never a verdict.
- **Pull-to-refresh failure** — *before:* no message → *after:* "couldn't refresh rankings — pull again" (clear recovery action, honest).
- **Own-card tap affordance** — *before:* unlabeled → *after:* "tap to view your character" (simple, clear).

No exclamation marks; the brand period with intent; no "crush the leaderboard," no "you're losing," no loss-aversion weaponisation.

### Motion choreography

Locked to `CK-P4` order (draw-first, hero-first): **podium plinths rise** (0→height, staggered: center #1 → #2 left → #3 right, `--dur-slow` 520ms `--ease-flow`) with the #1 plinth's `--glow-orange-md` blooming in and the rank medal glyphs settling → **own-rank card fades in + translateY** (`--dur-base` 280ms `--ease-out-soft`, 80ms stagger after podium) → **filter toggle + segmented control fade in** (280ms, minimal delay) → **ranked rows #4+ StatBars rise** L-anchored `0→value` (520ms `--dur-slow`, 80ms stagger between rows, on scroll-into-view) → **the "your climb" Living-Line draws itself** L→R (1200ms `stroke-draw` `--dur-flow`, starting on own-card expand or high-motivation, never on cold-start — never competes with podium hero). Card entrances and staggered fades use `.animate-fade-up` throughout. `prefers-reduced-motion` → every element at final state instantly (podium plinths at full height, own-rank card visible, StatBars at final width, the Living Line fully drawn + green end dots + dashed-purple projection tail visible). **No opacity-fade on the Living-Line stroke** (§8 draw-not-fade rule).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (community-of-one) | Podium shows user at #1 plinth (0 XP, Lv.1), #2/#3 plinths **ghosted** (not empty, visually distinct); global tab shows a few seed users or the user alone; friends tab empty + invite link | Podium: "rankings grow as your community grows"; Friends: "no friends yet — invite them from your communities"; Own-rank card: "your climb starts here" (never "you're #1, you're winning") | podium plinths at full depth, the #1 plinth with `--glow-orange-md` + the user's avatar ring, ghosted #2/#3 (dashed outlines, 50% opacity), no "fake rivals" |
| Loading | Podium skeletons (3 plinth outlines + avatar + medal shimmer); own-rank card skeleton (rank + name shimmer); ranked-row skeletons (rank# + avatar + bar skeleton per row). Layout **preserved**, depth visible. | "SIA is calculating the rankings — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer, morphs into plinths/bars (never blank boxes) |
| Empty / partial (friends tab, no friends) | Podium + global tab render normally. Friends tab shows only the invite-link copy + a CTA card ("Find communities"). Ranked rows section absent. | "no friends on the leaderboard — invite them from your community rooms to climb together" + "Find communities" link | no-data ≠ zero (missing data is ghosted or hidden sections, not a fake 0 rank) |
| Error | Podium shows skeleton shimmer 3s then inline error: "couldn't load rankings" + retry button. Own-rank card shows "rank unavailable" (white/40) if it specifically fails. Ranked rows show skeleton shimmer then inline error per section. Offline banner (if applicable) names the failure. | "couldn't load rankings — pull to refresh" / "rank unavailable" / per-section honesty | calibrated `--color-error-red` only on a genuine network failure (never on low rank, never on a slip); `role="alert"` + glyph + word paired (never colour-alone) |
| Offline | Cached podium/own-rank/rows displayed. All pull-to-refresh + sort/filter actions dimmed. Offline banner at top of sheet: "you're offline — showing cached rankings." | "you're offline — showing cached rankings" | actions honestly dimmed (50% opacity, no haptic); cached data retained, never cleared |

### Signature & anti-generic

Ownable moments: (1) the **PodiumRank podium hero** (the 2-1-3 stage, medal glyphs + crown, the warm glow on the leader — a surface no generic leaderboard has); (2) the **XP StatBars composition** (every row shows relative XP visually, not just a text number — the honest alternative to a flat ranked list); (3) the **Living-Line "your climb" trend** (orange actual climb → dashed-purple SIA projection, inverted y-axis so up = better — the brand signature applied to *personal progress, not comparison* — the device that reframes the whole screen from "them vs you" to "you vs past-you"); (4) the **non-shaming delta system** (rank movement is green-up / muted-neutral-down, never red, never an alarm — ethical ownership). Anti-generic fix: the screen **never reads as a flat ranked list** because the podium hero breaks the monotony at the top, the own-rank card anchors the user visually (always pinned, always highlighted), and the "your climb" trend de-emphasises comparison for high-motivation users. The UI avoids the #1 toxic pattern: there is **no red "you're losing" alarm, no countdown to demotion, no manufactured urgency, no hardcoded fake rivals on Day-1** — all anti-patterns ruled out by design. The screen stays warm and non-coercive.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Podium plinth rank number (#1 gold) | `--color-podium-gold` | 2.1:1 | WCAG 1.4.11 miss — flagged for the viz-build program to adjust podium gold saturation or add a subtle dark outline |
| Podium plinth rank number (#2 silver) | `--color-podium-silver` | 3.8:1 | Meets WCAG 1.4.11 ≥3:1 |
| Podium plinth rank number (#3 bronze) | `--color-mission-bronze` | 3.2:1 | Meets WCAG 1.4.11 ≥3:1 |
| Own-rank card rank number | white/100 | ≥12:1 | Exceeds requirement |
| Own-rank card name | white/100 | ≥12:1 | Exceeds requirement |
| Rank-change ▲ (green) | green/100 | 3.5:1 | Meets 1.4.11; always glyph + number |
| Rank-change ▼ (muted) | white/40 | 4.8:1 | Meets 1.4.11; neutral (not red/alarm); always glyph + number |
| XP StatBar fill | orange/100 | 3.2:1 on white/8 | Meets 1.4.11; numeric label always beside bar |
| Ranked-row text | white/50 | ≥4.5:1 | Meets 4.5:1 |
| Segmented control active | orange/100 | 3.2:1 | Meets 1.4.11 |

Screen reader labels: podium plinth announces "First place, gold, [name], level [N], [XP] XP, up [N] from [period]"; own-rank card announces "Your rank: [number], [name], level [N], [XP] XP, [streak] day streak, [movement] from [period]"; each ranked row announces "Rank [N], [name], level [N], [XP] XP, top domain [domain], up/down [N] from [period]." All interactive elements use `--focus-ring` (`CK-T03`, 2px orange, 2px offset). Targets ≥44×44pt. Reduced-motion: all elements at final state instantly, signature static forms preserved (podium at full height, StatBars at full width, Living Line fully drawn with end dots + projection tail). Delta glyphs paired with **visible numeric values** and disclosed period labels — status never by colour alone.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Own rank card border | #FF5E00 at 40% | orange (primary) | "This is you" indicator |
| Segmented active fill | #FF5E00 | orange (primary) | Active time filter |
| Filter underline | #FF5E00 | orange (primary) | Active filter indicator |
| Rank #1 | #FFD700 | gold | Podium accent |
| Rank #2 | #C0C0C0 | silver | Podium accent |
| Rank #3 | #CD7F32 | bronze | Podium accent |
| Rank #4+ | #FFFFFF | white | Standard |
| Own row left border | #FF5E00 | orange (primary) | Row highlight in list |
| Level badge border | #FF5E00 (own) / white 20% (others) | — | Own card uses orange |
| Avatar placeholder bg | #FF5E00 | orange (primary) | Own avatar bg |
| Rank change ▲ (climbed) | #34A853 | green (secondary) | Positive movement / arrival only; glyph + number always shown |
| Rank change ▼ (slipped) | white at 40% | --color-alpha-white-40 | Neutral muted per PodiumRank VK-012 — never red, never orange-as-alarm; glyph + number always shown (non-shaming) |
| XP text | white at 70% (own) / white at 50% (others) | — | Tabular nums |
| Streak flame | #FF5E00 | orange (primary) | Streak emphasis |
| Domain tags (all 9) | Various at 15% bg | domain colors | Top domain badge |
| Primary text | #FFFFFF | white | Names, rank numbers |
| Secondary text | white at 60% | — | Streak text |
| Tertiary text | white at 50% | — | XP, metadata |

**60/30/10 verification**: Orange dominates data ink — segmented control, own rank card border, level badge, avatar placeholder, filter underline, flames, XP StatBars, the #1 plinth --glow-orange-md, the climb Living-Line effort segment. Green = arrival only (▲ rank-up delta, milestone dots, the climb line's arrival segment). A slipped ▼ delta is neutral muted white/40 — never orange, never red (non-shaming). The single sanctioned purple is the dashed-purple SIA climb projection on the "your climb" TrendChart (§11 forecast — correct, not a violation); no other purple (leaderboard is user-driven social, not SIA-driven). Gold/silver/bronze are a contained, brand-sanctioned exception confined to plinth fill / avatar ring / rank glyph as identity only (always glyph-paired — crown #1, medal/laurel #2-#3 — never colour-alone), never on data ink. Error-red #F44336 is confined to the destructive Block affordance only. Domain colors on tag chips only. Ratio holds.

---

## Interaction States

### Segmented Time Filter
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 60% text | — |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill, white text | medium impact |

### User's Own Rank Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange 40% border | — |
| Pressed | Border brightens to orange 70%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer for rank, name, XP | — |

### Filter Toggle Tab
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | White 50% text, no underline | — |
| Pressed | White 70% text | light impact |
| Active | White text, orange underline | medium impact |

### Leaderboard Rank Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer per row | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | FlatList | Pull-to-refresh (reload rankings) |
| Tap | Segmented control | Switch time period |
| Tap | Own rank card | Navigate to RPG Character [19] |
| Tap | Filter toggle | Switch global/friends |
| Tap | Rank row | Open limited user profile sheet |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Scroll | FlatList | Scroll through rankings (own card pins if out of view) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: segmented control (0ms), own rank card (80ms), filter toggle (160ms), first 5 rank rows (80ms stagger each starting at 240ms) | 280ms each | ease-out-soft |
| Segmented control | Tap | Active indicator slides horizontally | 280ms | ease-out-soft |
| Rank data | Time filter change | Rank rows crossfade (old rows opacity 1→0, new rows opacity 0→1 with translateY 8→0) | 280ms | ease-out-soft |
| Own rank card sticky | Scroll past threshold | Card position transitions from inline to pinned (opacity 0→1 at top, original position fades out) | 280ms | ease-out-soft |
| Rank change | Data refresh | ↑/↓ indicator slides in from left, count animates | 280ms | ease-out-soft |
| User profile sheet | Row tap | Bottom sheet slides up | 520ms | ease-out-soft |
| Rank rows | Pull-to-refresh | Rows fade out, new data fades in with stagger | 280ms each | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push
- **Exit**: Stack pop

---

## Empty States

### Day 1 (new user, no community)
- Own rank card: Shows user at "#1" with 0 XP, Lv. 1. Rank change: "—" (no previous data). This is technically accurate — the user is #1 on their own leaderboard.
- Global tab: Shows a small set of seed/example users (or the user alone). Text below: "rankings get better as the community grows. invite friends to see where you stand."
- Friends tab: Empty — "no friends yet. create or join a community room to connect." with tappable "find communities" link (navigates to Community [40]).
- Heatmap/analytics: N/A for leaderboard.

### Established user (zero state — friends tab empty)
- Global tab: Populated normally.
- Friends tab: "no friends on the leaderboard. invite them from your community rooms." Link to Community [40].

---

## Motivation Adaptation

- **Low motivation**: Rank is de-emphasized (shown smaller). Focus shifts to personal progress: "you completed 5 more habits than last week" replaces the competitive framing. Leaderboard list still visible but the own rank card leads with positive personal metrics rather than rank number.
- **Medium motivation**: Standard experience as described. Rank is visible and motivating.
- **High motivation**: Additional stats appear on own rank card: "top 5% this month", weekly XP trend sparkline, domain-by-domain skill levels. Rank rows show more detail: XP breakdown, longest streak. "Competitions" tab shows extended stats per competition (daily score trend, best day, predicted final rank).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Leaderboard") | Sora | Semibold (600) | 17pt | 22pt | white |
| Segmented control labels | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 60% (inactive) |
| Own rank number | Sora | Bold (700) | 24pt | 32pt | white (or gold/silver/bronze for top 3) |
| Own rank change text | Sora | Semibold (600) | 13pt | 18pt | green #34A853 (up) / white at 40% (down — neutral muted, never red/orange) / white at 40% (same) |
| Own user name | Sora | Semibold (600) | 16pt | 22pt | white |
| Own level badge | Sora | Semibold (600) | 13pt | 18pt | orange on ink-900 |
| Own XP text | Sora | Regular (400) | 14pt | 20pt | white at 70% |
| Own streak text | Sora | Regular (400) | 13pt | 18pt | white at 60% |
| Filter toggle labels | Sora | Semibold (600) | 14pt | 20pt | white (active) / white at 50% (inactive) |
| Rank row number (#4+) | Sora | Bold (700) | 17pt | 22pt | white |
| Rank row name | Sora | Semibold (600) | 15pt | 20pt | white |
| Rank row level badge | Sora | Semibold (600) | 12pt | 16pt | white on ink-900 |
| Rank row XP | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Domain tag chip text | Sora | Semibold (600) | 11pt | 16pt | domain color |
| Leaderboard type tabs | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 60% (inactive) |
| Competition card name | Sora | Semibold (600) | 15pt | 20pt | white |
| Competition participant count | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Competition "view full" link | Sora | Regular (400) | 13pt | 18pt | orange #FF5E00 |
| Limited profile name | Sora | Semibold (600) | 20pt | 28pt | white |
| Limited profile level | Sora | Regular (400) | 14pt | 20pt | white at 60% |
| Limited profile XP | Sora | Regular (400) | 14pt | 20pt | white at 50% |
| Block confirmation heading | Sora | Semibold (600) | 17pt | 22pt | white |
| Block confirmation body | Sora | Regular (400) | 14pt | 20pt | white at 50% |
| Block/cancel button text | Sora | Semibold (600) | 15pt | 20pt | #F44336 (block) / white at 50% (cancel) |
| Report/block menu text | Sora | Regular (400) | 15pt | 20pt | white at 80% (report) / #F44336 (block) |
| Empty state message | Sora | Regular (400) | 15pt | 22pt | white at 40% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Leaderboard data fails to load | Skeleton shimmer on rank rows persists 5s, then inline error: "couldn't load rankings" with retry button | Tap "retry" re-fetches; pull-to-refresh also retries |
| Own rank card fails to load | Card shows skeleton shimmer then fallback: "rank unavailable" in white at 40% | Pull-to-refresh to retry |
| Time filter change fails | Previous time range data remains visible; toast: "couldn't update rankings. try again." | Tap the segment again to retry |
| Friends tab empty (no friends) | Empty state: "no friends on the leaderboard. invite them from your community rooms." with link to Community [40] | Tap link to navigate to Community |
| User profile sheet fails to load | Bottom sheet shows spinner for 3s, then: "couldn't load profile" with dismiss option | Dismiss sheet; tap rank row again to retry |
| Block user fails | Block confirmation sheet dismisses; toast: "couldn't block user. try again." | Re-open profile sheet and retry block |
| Report user fails | Report flow shows inline error: "report failed. try again." | Tap "report" again to retry |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull-to-refresh again |
| Competition data fails to load | "competitions" tab shows: "couldn't load competitions" with retry link | Tap retry or switch tab and back |
| Offline state | Banner at top: "you're offline -- showing cached rankings" (ink-brown-800 bg, white at 60% text) | Rankings update automatically on reconnection |

---

## Accessibility

- Screen title "Leaderboard" announced on focus via VoiceOver
- Leaderboard type tabs announce: "Global tab, selected" / "Competitions tab" / "Country tab"
- Segmented time filter announces: "Time filter: This week, selected" / "This month" / "All time"
- Own rank card announces: "Your rank: number [N], [name], level [N], [XP] XP, [streak] day streak, [rank change] from last period"
- Filter toggle announces: "Global rankings, selected" / "Friends rankings"
- Each rank row announces: "Rank [N], [name], level [N], [XP] XP, top domain [domain name]"
- Top 3 rank rows include podium position: "First place, gold" / "Second place, silver" / "Third place, bronze"
- Limited user profile sheet traps focus on open; announces "Profile: [name], level [N]"
- Report/block context menu items announce their action: "Report user" / "Block user"
- Block confirmation announces: "Block [name]? They won't be able to see you on leaderboards."
- All touch targets meet 44x44pt minimum
- Focus order: back button -> leaderboard type tabs -> time filter -> own rank card -> filter toggle -> rank rows (top to bottom)
- Gesture alternatives: swipe-right-from-edge replaces back button; VoiceOver custom actions on rank rows provide "View profile" action

---

## Cross-References

- **Navigates to**: Screen [19] — RPG Character (via own rank card tap, stack push), Screen [47] — Competitions (via competition leaderboard card tap or "join a competition" CTA, stack push), User Profile Bottom Sheet (from rank row tap — shows avatar, level, top domains, "message" and "invite" CTAs per _shared-patterns.md), Screen [40] — Community (via "find communities" link in empty state, or via "message" action in User Profile Bottom Sheet which creates/opens a private room), Screen [64] — Report/Block (via overflow menu "report" in Limited User Profile sheet)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link), Screen [47] — Competitions (via "view leaderboard" link)
- **Shared components with**: Screen [38] — Habits (Segmented Control, XP/RPG elements, Domain Tag Chip), Screen [19] — RPG Character (Level Badge, XP display), Screen [47] — Competitions (Competition Leaderboard Card, podium colors, rank row format)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 38), Domain Tag Chip (Screen 37), Modal Presentation (user profile bottom sheet)
- **Patterns established**: User Rank Card (highlighted own-position with orange border), Leaderboard Rank Row (rank + avatar + name + level + XP + domain badge), Level Badge ("Lv. N" pill), Filter Toggle (underline tab style), Podium Accent Colors (gold/silver/bronze for top 3), Sticky Rank Card (pins when user scrolls past own position), Leaderboard Type Tabs (global/competitions/country segmented control), Competition Leaderboard Card (mini-leaderboard within competitions tab with top 3 + user position)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/leaderboard`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B13-F04 | major | information-architecture | Implement leaderboard type, time-period, country, global/friends state, and loading/empty/error behavior. |
| B13-F05 | major | trust-privacy | Make rank rows semantic buttons that open limited profiles with report/block and clear public-data boundaries. |
| B13-F06 | major | accessibility | Expand hit areas to 44px, expose selected/pressed state, and make shared back semantic. |

### Prototype Implications

- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

