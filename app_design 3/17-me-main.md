# Screen Design: Me Main

**Screen**: 17 of 73
**File**: 17-me-main.md
**Register**: Product Mode
**Primary action**: view profile and navigate to sub-screens
**Tab**: Me
**Navigation**: Tab root (stack depth 0). Entry point for all Me sub-screens.

---

## Purpose

Me Main is the user's identity hub — their profile, RPG progression, and gateway to every personal feature and domain in Balencia. It answers "who am I in this app?" at a glance (name, level, stats) and provides clear paths to deeper screens (RPG Character, Personal Wiki, Settings, Explore). SIA's presence is subtle here: a personalized insight card in the Explore preview section that contextually recommends what to explore next.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Profile header — avatar, name, RPG level badge, XP progress bar (identity anchor)
2. Quick stats row — streak, missions completed, Life Power, total XP (progression snapshot)
3. Quick links grid — 6 icon+label cards to sub-screens (navigation hub)
4. Explore preview — "suggested for you" horizontal scroll of 2-3 AI-recommended module cards + "see all" link (discovery)

**User flow**:
- **Arrives from**: Bottom tab bar (Me tab tap), or back-navigation from any Me sub-screen
- **Primary exit**: Quick links grid → any Me sub-screen (stack push)
- **Secondary exits**: Explore module card → domain dashboard or feature screen (stack push), RPG level badge → RPG Character [19] (stack push), avatar → edit profile (modal)

---

## Layout

**Scroll behavior**: ScrollView (content fits ~1.5 viewports on iPhone SE, single viewport on larger devices)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────┐      │
│  │  ⚙ (top-right)       │      │  ← Settings gear icon
│  │                       │      │
│  │    ┌──────┐           │      │
│  │    │Avatar│  64pt     │      │  ← Profile section
│  │    └──────┘           │      │    ~200pt total
│  │   User Name           │      │
│  │   ◆ Lv.14 ━━━━━━━░░  │      │  ← RPG badge + XP bar
│  │   Member since May '26│      │
│  └───────────────────────┘      │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │  42  │ │  12  │ │ ◆487 │ │8,450 ││ ← Stats row ~80pt
│  │streak│ │ done │ │ Life │ │  XP  ││
│  │      │ │      │ │Power │ │      ││
│  └──────┘ └──────┘ └──────┘ └──────┘│
│                                 │
│  ┌──────────┐ ┌──────────┐     │
│  │ 🎮 RPG   │ │ 📓 Mission│     │
│  │ character │ │ journal  │     │  ← Quick links
│  ├──────────┤ ├──────────┤     │    2x5 grid ~396pt
│  │ 📖 Wiki  │ │ 🔗 Apps  │     │
│  │ book of  │ │ connected│     │
│  ├──────────┤ ├──────────┤     │
│  │ ⭐ Plan  │ │ 📸 Photos │     │
│  │ subscr.  │ │ progress │     │
│  ├──────────┤ ├──────────┤     │
│  │ 🔥 Strks │ │ 🏆 Achvs │     │
│  │ streaks  │ │ achieve. │     │
│  ├──────────┤ ├──────────┤     │
│  │ 🔔 Notif │ │ ❓ Help  │     │
│  │ history  │ │ center   │     │
│  └──────────┘ └──────────┘     │
│                                 │
│  suggested for you    see all → │  ← Explore preview
│  ┌─────────┐ ┌─────────┐ ┌──  │    section ~180pt
│  │ Module  │ │ Module  │ │ Mo │
│  │ Card 1  │ │ Card 2  │ │ Ca │
│  │ domain  │ │ domain  │ │ do │
│  └─────────┘ └─────────┘ └──  │
│                                 │
│  32pt bottom padding            │
├─────────────────────────────────┤
│  [ Today ] [ SIA ] [Goals] [Me]│  ← Tab bar (56pt)
├─────────────────────────────────┤
│  Home Indicator (34pt)          │
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Settings gear icon** — 44x44pt, top-right, 16pt from right edge
   - Purpose: quick access to Settings [21]
   - Position: absolute, overlaying scroll content, in the header area

2. **Profile section** — ~200pt
   - Purpose: identity anchor
   - Content: avatar (64pt circle), user name, RPG level badge, XP progress bar, member since

3. **Stats row** — ~80pt
   - Purpose: at-a-glance progression snapshot
   - Content: 4 stat cells (streak, missions completed, Life Power, total XP)

4. **Quick links grid** — ~396pt
   - Purpose: navigation hub to Me sub-screens
   - Content: 10 cards in 2-column grid (5 rows)

5. **Explore preview section** — ~180pt
   - Purpose: AI-driven feature discovery
   - Content: section header + horizontally scrollable module cards

6. **Bottom spacing** — 32pt

---

## Components

### Profile Section
- **Purpose**: Anchors user identity and RPG progression
- **Data source**: User profile API + RPG stats API
- **Visual treatment**: Centered layout, no card surface (floats on ink-900 background)
- **Content**:
  - Avatar: 64pt circle, border 2pt white at 20% opacity. Tap → Profile Edit [50] (stack push). If no photo, shows first initial on ink-brown-800 circle. **Camera overlay**: small camera icon (16pt, white at 80%) in a 24pt circle with ink-brown-800 bg and 1pt white at 20% border, positioned bottom-right of avatar (offset -4pt, -4pt). Indicates photo upload capability.
  - Name: 20pt Sora Semibold, white, center-aligned, 8pt below avatar
  - RPG level badge: Inline pill — diamond icon (12pt, orange) + "Lv.14" text (14pt Sora Semibold, white), 8pt below name
  - XP progress bar: Full-width minus 64pt (32pt margins each side), 8pt height, rounded pill (MomentumBar Living-Line family — continuous --grad-progress orange→green fill, never segmented), track white at 8% over a --track-inset recess (not ink-brown-800), orange fill. Positioned 8pt below level badge. Label below bar: "2,450 / 5,809 XP" (12pt Sora Regular, white at 50%), right-aligned.
  - Member since: 13pt Sora Regular, white at 40%, center-aligned, 8pt below XP label. Format: "member since May 2026"
- **Variants**: New user (Lv.1, 0 XP, no avatar — shows initial), established user
- **Gestures**: Tap avatar → Profile Edit [50] (stack push). Tap RPG level badge → RPG Character [19] (stack push).
- **Size**: full-width x ~200pt

### Stats Row
- **Purpose**: Quick progression snapshot — streak, missions, Life Power, XP
- **Data source**: RPG stats API (aggregated)
- **Visual treatment**: 4 equal-width cells, no dividers, centered horizontally. Each cell is a vertical stack: large number on top, label below.
- **Content per cell**:
  - Number: 24pt Sora Bold, white, tabular-nums, center-aligned
  - Label: 12pt Sora Regular, white at 50%, center-aligned, 4pt below number
  - Cell 1: current streak (days) / "day streak"
  - Cell 2: missions completed (count) / "completed"
  - Cell 3: Life Power score / "Life Power" — number preceded by diamond icon (12pt, orange #FF5E00) inline. Life Power = `sum(all active domain stats) * balance_multiplier`.
  - Cell 4: total XP (formatted with comma) / "total XP"
- **Visual treatment**: Contained in a single ink-brown-800 card with 16pt padding, border-radius 20pt (--r-lg), 1pt border white at 8%
- **Variants**: New user (all zeros, Life Power shows "0", still shows the row)
- **Gestures**: Tap entire stats row → RPG Character [19] (stack push)
- **Size**: full-width minus 32pt (16pt margins) x ~80pt

### Quick Links Grid
- **Purpose**: Navigate to all Me sub-screens
- **Data source**: Static (navigation items)
- **Visual treatment**: 2-column grid, 12pt gap between cards. Each card is ink-brown-800, border-radius 16pt (--r-md + 2pt), 1pt border white at 8%, 16pt padding.
- **Card content**:
  - Icon: 24pt, white at 70%, top-left
  - Label: 15pt Sora Semibold, white, below icon, 8pt gap
  - Subtitle: 13pt Sora Regular, white at 40%, 4pt below label (optional, 1-line description)
- **Grid items**:
  1. RPG character — icon: shield/gamepad, subtitle: "Lv.14 explorer"
  2. Mission journal — icon: book-open, subtitle: "14 completed" (dynamic count of completed + archived missions, or "no entries yet")
  3. Book of life — icon: book, subtitle: "what SIA knows"
  4. Connected apps — icon: link/chain, subtitle: "3 connected" (dynamic count)
  5. Subscription — icon: star/crown, subtitle: "Plus plan" (dynamic tier)
  6. Progress photos — icon: camera/image, subtitle: "12 entries" (dynamic count, or "start tracking")
  7. Streaks — icon: flame, subtitle: "42 days" (dynamic streak count, or "start a streak")
  8. Achievements — icon: trophy, subtitle: "47 earned" (dynamic count, or "start earning")
  9. Notifications — icon: bell, subtitle: "12 new" (dynamic count, or "all caught up")
  10. Help center — icon: question-circle, subtitle: "FAQ and guides"
- **Variants**: Notification badge (orange dot, 8pt) on Notifications card when unread. Subscription card shows current tier name. Progress photos card shows thumbnail of most recent photo as card bg (dimmed to 20% opacity). Streaks card shows flame icon in Burnt Orange when streak is active, grey when broken. Achievements card shows a "new" badge (green dot, 8pt) when new achievement earned since last visit. Mission journal card shows count of completed + archived missions as subtitle.
- **Gestures**: Tap card → respective sub-screen (stack push)
- **Size**: full-width minus 32pt x ~396pt (5 rows x ~72pt card + 12pt gaps)

### Settings Gear Icon
- **Purpose**: Quick access to Settings [21]
- **Data source**: Static
- **Visual treatment**: Gear icon, 22pt, white at 60%, positioned top-right (16pt from right edge, aligned with top of profile section)
- **Touch target**: 44x44pt
- **Gestures**: Tap → Settings [21] (stack push)

### Explore Preview Section
- **Purpose**: AI-driven feature discovery, surfaces relevant domains and features
- **Data source**: AI recommendation engine (contextual) + static module list fallback
- **Visual treatment**: Section with header row and horizontally scrollable cards
- **Section header**:
  - Left: "suggested for you" — 12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking (eyebrow style)
  - Right: "see all" — 14pt Sora Semibold, orange (#FF5E00), tap → Explore Section [18] (stack push)
  - 24pt top margin from quick links grid
- **Module cards** (horizontal ScrollView):
  - Card width: 160pt, height: 120pt
  - Background: ink-brown-800, border-radius 16pt, 1pt border white at 8%
  - Padding: 16pt
  - Content (top to bottom):
    - Domain color dot (8pt circle) + domain name (11pt Sora Regular, white at 50%), 4pt gap, single row
    - Module name: 15pt Sora Semibold, white, 12pt below domain row
    - Description: 13pt Sora Regular, white at 40%, 4pt below name, 2-line max, ellipsis overflow
    - Optional badge: "new" or "suggested" pill (top-right corner, 8pt padding, orange bg for "suggested", green bg for "new", 10pt Sora Semibold white text)
  - Card spacing: 12pt between cards
  - Left padding: 24pt (aligned with screen margins)
  - Right: scrolls off-screen, last card has 24pt trailing padding
- **Variants**: 
  - AI-populated (2-3 contextual recommendations)
  - Fallback (3 featured modules from different domains)
  - New user: "start exploring" messaging, shows most popular modules
- **Gestures**: Horizontal scroll. Tap card → domain dashboard or feature screen (stack push).
- **Size**: full-width x ~180pt (header 24pt + 16pt gap + 120pt cards + 20pt bottom)

---

## Visualization

> Source: `app_design 3/17-me-main-visualization-recommendations.md` (companion, if present); audited in `viz-audit/` — Batch (Lightweight-MEDIUM / Profile mini), findings `S17-V01..S17-V02`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (no SIA register here — **purple is correctly absent**; domain colours appear only as *identity* dots, never on data ink). Benchmark = **Finch + Habitica** (life-stats done *warmly*) under the always-on **Linear / Things editorial-restraint** floor. **Current grade D (54) → specced-target A− (85).** *(Honest re-grade: a calm navigation hub, not a dashboard — it earns A− by resolving the two metrics that benefit from a visual with restraint, not by chart-cramming. The residual gap to A is build-verified gauge/line depth, owned by the later viz-build program.)*

This is a **lightweight profile hub**, so this is a deliberate **2-subsection mini-section** (per the CONSISTENCY.md "Lightweight-MEDIUM" template), *not* a domain dashboard. Today the screen renders **zero data visualization**: the XP bar is a flat 2-tone orange fill on an `ink-brown-800` track (no gradient, no glow, no inset — and the track is near-invisible since the section floats card-less on `ink-900`), and the four progression stats (streak 42 · completed 12 · Life Power 487 · XP 8,450) are bare `StatTile` text numbers. The screen's RPG identity profile — the 10 `domainStats` (0–99) that *define* Life Power — exists in `mock.ts` but is **never surfaced here**, so "who am I in this app?" is answered by a number, not a picture. This section upgrades only **two** things — the XP bar into the signature Living-Line bar, and a compact domain StatBars preview that makes Life Power *legible as a composition* — while keeping everything else (name, avatar, member-since, the 10-card link grid, explore preview) deliberately textual. **Editorial restraint is the whole point: this screen must stay calm.** Mints **no** new primitive; retires kit backlog (`MomentumBar`/`XPBar` Living-Line upgrade, compact `BarChart`/`StatBars`; the Constellation Radar mini is named as the premium-tier alternative).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced treatment | Resolution |
|---|---|---|---|
| XP to next level (2,450 / 5,809) | flat 2-tone orange bar | **XP Living-Line bar** — continuous orange→green `MomentumBar` (path-of-progress), `--track-inset` recess, value-vs-target label retained | **visualized** — `S17-V01` |
| Life Power (487) — `sum(domainStats)·balance_multiplier` | bare number + ◆ glyph | kept as the headline **number** in the stats row, now **made legible** by the StatBars preview beneath that shows *what composes it* | **visualized (as composition)** — `S17-V02` |
| Domain / skill profile — 10 `domainStats` (0–99) | not shown anywhere | **compact domain StatBars preview** (top ~5 by stat, honest shared 0–99 scale) — or **ConstellationRadar mini** as the premium-tier variant | **visualized** — `S17-V02` |
| Day streak (42) · Missions completed (12) · Total XP (8,450) | three text `StatTile`s | **deliberately textual** — clean tabular-nums KPI cells; one-off cumulative scalars with no trend surface on this hub (streak *history* lives behind the Streaks link [59], not here). Optional ▲ delta only at high-motivation, honest "this week" window | **deliberately textual** (premium ≠ maximal) |
| Member since · name · avatar · level badge | text / pill | **deliberately textual** — identity scalars, no useful visual form | **deliberately textual** |
| 10 quick-link cards + dynamic subtitle counts (47 earned, 12 new…) | icon + label + count | **deliberately textual** — a navigation grid is not a chart; counts stay as subtitles + the existing orange/green notification dots (with a visible glyph, see a11y) | **deliberately textual** |
| Explore "suggested for you" module cards | cards w/ domain dot | **deliberately textual** — discovery cards; domain colour dot is identity-only | **deliberately textual** |

**Editorial hierarchy (calm, not maximal):** the **XP Living-Line bar is the single focal viz** (it sits in the identity anchor, the first thing read after the name); the **StatBars preview is clearly secondary** (a small composition under the stats row). Two visuals, one focal — the rest of the hub stays text. A radar/gauge wall here would *fight* the screen's job (fast navigation) and is deliberately refused.

### 1 · XP Living-Line bar — `S17-V01` → `MomentumBar` (Living-Line family, `VK-004` / `VK-016`)

Replace the flat XP fill with the signature **horizontal Living Line**: a **single continuous, round-capped** rounded-pill bar whose fill runs `--grad-progress` **(mint)** — orange `#FF5E00` (effort / XP earned) → green `#34A853` (arrival, as the bar approaches 100% of the level) — **never segmented** (segments violate §8 "do not break the line"). Width = `currentLevelXP / nextLevelXP` (2,450 / 5,809 ≈ 42%, pure orange at this fill since arrival isn't reached). The value-vs-target label ("2,450 / 5,809 XP", `white/50`, right-aligned) is retained beneath. Source: `user.currentLevelXP / user.nextLevelXP` (`mock.ts`).
- **Depth (token-backed):** 8px height; track `--color-alpha-white-08` over a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recess (fixes today's invisible `ink-brown-800`-on-`ink-900` track — a real depth/contrast defect); rounded-pill caps on both ends; **no glow** (an inline bar carries no glow per the size-stepped scale — glow would read neon on a 6–8px element).
- **Why the line, not a plain bar:** "every chart is the line" (§8) — even the humble XP bar joins the Living-Line family, so this hub's one progress element reads as the *same instrument* as the home sparklines and trend charts. This is the lowest-cost place to plant the signature.
- **Motion:** fills `0→value` (`--dur-slow` 520ms `--ease-flow`), starting after the profile fade-in (preserves the existing XP-bar entrance timing) — a **fill/draw**, never an opacity-fade.
- **Micro-interaction:** tap the level badge / bar → RPG Character [19] (existing route, where the full XP history lives) — drill, not scrub (a single-value bar has nothing to scrub).
- **Non-shaming:** frames XP as momentum toward the next level; a low fill reads as "room to grow," never a deficit. No loss-aversion ("don't lose your progress") framing.
- **States:** **Day-1 / Lv.1** → 0% bar, label "0 / 100 XP", pure orange at rest (a real, honest empty — not a fake glimmer); **loading** → pill skeleton at track height that morphs into the drawn fill (label skeletons to a number bar); **reduced-motion** → bar at final width instantly (no fill animation), Living-Line static form (the orange fill at rest) preserved.

### 2 · Life-Power composition — `S17-V02` → domain `StatBars` preview (`VK-006`) · or ConstellationRadar mini (`VK-005`)

Make **Life Power (487) legible as a composition** instead of an unexplained number. Directly beneath the stats row, add a **compact domain StatBars preview**: the user's **top ~5 domains by stat** (e.g. fitness 72 · sleep 65 · wellbeing 61 · nutrition 58 · relationships 55), each a thin labelled `StatBars` row — domain icon/label · a horizontal bar on an **honest shared 0–99 scale** (the radar-stat max, *not* a per-row re-normalised scale, which would be dishonest) · the value (tabular-nums) beside it · a "see all 10 →" link to Life Areas [16] / RPG [19]. This answers "who am I in this app?" with a *shape*, and shows *what composes* Life Power, at restraint-appropriate density (5 bars, not a 10-bar wall).
- **Premium-tier variant (named, not duplicated):** at high-motivation / Plus, this slot may instead render a **ConstellationRadar mini** (~160px card variant) — the cross-domain differentiator: drawn orange polygon (fill 25%→8%), `--color-domain-*` **star dots** + faint glow, Life Power as the central **"sun" hub** (`text-display` + `--glow-orange`), **draws itself** on enter (the brand-correct draw, not the current `radar-grow` *scale*). The radar and the StatBars show the *same* `domainStats` — one is the calm default, one the expressive upgrade; the screen ships **one** of them, never both (two foci would break the hub's calm).
- **Encoding / brand:** **bar fill = `--color-brand-orange`** (data ink stays orange — domain colour is *not* used on the bar fill); the **domain colour appears only as the small leading identity dot/icon** per row (and as the radar star-dots in the variant). This keeps 60/30/10 honest: orange dominates, domain hues are identity-only. Green never appears here (no arrival/completion state for a domain stat); **purple is absent** (no SIA on a navigation hub — correct).
- **Depth (token-backed):** each `StatBars` track `--color-alpha-white-08` over a `--track-inset` **(mint)** recess, fill `--color-brand-orange`, `ink-brown-800` row surface + top-edge highlight; **no glow** on the small bars; radar variant carries the card-size glow language (`--glow-orange` on the hub, star-dot faint glows) per CONSISTENCY.
- **Honesty (RUBRIC dim 5):** shared 0–99 scale across all rows (no per-bar autoscale that flatters a weak domain); a domain with **no data yet** renders a **ghosted/dashed** track ("not started"), visually distinct from a real low stat — a low bar is **not** a zero, and a zero is **not** a no-data.
- **Non-shaming (RUBRIC dim 6, ethical gate):** the profile is framed as **state, never a verdict on worth**; the **weakest domain is framed constructively** — the preview leads with the *top* domains and offers "grow your [lowest] →" as an *invitation* into that domain, never "you're failing at meditation." No domain is recoloured to an alarm red for being low.
- **Micro-interaction:** tap a domain row → that domain dashboard (e.g. Fitness [26]); tap "see all 10" / the radar → Life Areas [16] or RPG Character [19].
- **States:** **Day-1 / new user** → all stats at their starting values shown honestly (ghosted tracks for un-started domains + "your stats grow as you build habits" — never a collapsed/empty shape; the radar variant shows a faint full-ring placeholder, **not** a degenerate point); **loading** → row/bar skeletons (radar: spokes + rings visible, polygon draws on data — a morph, not a swap); **partial** → present domains render, un-synced ghosted; **error** → "couldn't load your stats" + retry, cached stats shown if available (matches the screen's existing stats-row partial-failure pattern).
- **Data:** `domainStats` (10 domains, `mock.ts`) + `user.lifePower` (487).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`, honouring this hub's existing calm entrance: profile fades in → the **XP Living-Line bar fills** `0→42%` (520ms `--ease-flow`, the focal motion, starting after the profile fade) → the stats row counts up (the Life Power number `--dur-base` 280ms `--ease-out-soft`) → the **StatBars preview rows rise** L-anchored `0→value` (520ms `--ease-flow`, ~60ms stagger) — *or*, in the radar variant, the polygon **draws itself** on enter (`stroke-draw` 1200ms `--ease-flow`) with star dots staggering in (`radar-dot` 420 + index·40ms) → quick-links grid + explore cards keep their existing staggered fade. **One line motif per surface** (the XP Living Line is the only continuous-stroke element; StatBars are discrete). Below-fold rows animate on **scroll-into-view**. `prefers-reduced-motion` → every element at final state instantly; the Living Line's static form (orange fill at rest) and the radar's completed polygon + star dots preserved — no essential info lost.

### States, brand & accessibility

- **States (all designed, RUBRIC dim 7):** **cold-start / Day-1** — XP bar honest 0%, StatBars at starting values with ghosted tracks for un-started domains + "your stats grow as you build habits" (never an empty/collapsed shape; the screen "never feels empty — structure is always full, content adapts," per the existing Empty-States section); **loading** — depth-preserving skeletons that *morph* into drawn data (pill skeleton → drawn XP fill; row/spoke skeletons → bars/polygon), not blank boxes; **partial** — present domains render, un-synced ghosted/dashed and visually distinct from a real low value; **error** — chart-specific honesty ("couldn't load your stats" on the preview, XP bar independent) + a visible "retry", per the screen's Error Handling table (cached stats shown if available).
- **60/30/10:** **orange dominates** data ink (XP Living-Line effort fill, all StatBars fills, the Life Power ◆ glyph, "see all" links, active-tab); **green** appears only as the Living Line's *arrival* segment as a level nears 100% (and the existing "new"-achievement dot) — never as a domain-stat fill; **purple is absent and that is correct** (no SIA register on a navigation hub — the existing Color Map's 60/30/10 note already states this); **domain colours are confined to identity** (the leading dot per StatBars row, the radar star-dots, the explore module dots) — never on a bar/polygon fill or any CTA. Glow uses the size-stepped scale: **none** on the XP bar / StatBars (inline), `--glow-orange` on the radar hub only in the radar variant — warm depth, never neon.
- **Accessibility:** the XP bar carries a text/`aria-label` equivalent ("2,450 of 5,809 XP to level 15", matching the existing screen-reader label); the StatBars preview is announced as a list ("Fitness 72 of 99, Sleep 65 of 99 …") and the radar variant carries a summary `aria-label` ("Life Power 487; strongest fitness 72, weakest meditation 39"); **status/series never by colour alone** — every StatBars row shows a **visible value number** beside the bar and a labelled domain (not just a colour dot), and the quick-link notification dots (today bare orange/green `aria-hidden` dots — a **colour-alone + 1.4.11 miss**) gain a **visible glyph/label** (e.g. a count badge "12" / a ✓-"new" tag) so unread/new state isn't colour-only; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the XP Living-Line stroke, the StatBars fills, the radar polygon + star dots, and the filled/unfilled boundary all meet ≥ 3:1 vs background (the `white/05` radar grid rings are decorative-only and exempt); interactive chart/row targets ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Finch + Habitica + Things (identity hub, calm) — *stays Balencia via the XP Living-Line bar + domain StatBars composition + warm-glow surfaces on ink-brown, not a flat stat grid.*
**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **profile section** (avatar + name + RPG badge + XP Living-Line bar) — the first element read, identity anchor, ~200pt vertical span. The XP bar is the visual anchor within that (the only ≥8px continuous stroke on screen). Everything else is visibly secondary: the stats row is a compressed 80pt card with four equal-weight numbers (no visual dominance), the quick-links grid is deliberately a navigation grid (10 equal cards, not a dashboard), the explore preview is a discovery scroll (secondary by IA), and the domain StatBars preview sits *below* the stats row as a composed-of breakdown (a visual annotation, not a focal chart). The squint test lands on the profile avatar + name first, then the XP bar fill, then the stats row as a dense block. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-lg` (20pt, per the brand card radius rule for this screen's mid-size cards) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. The profile section floats card-less on `--color-ink-900` (an intentional contrast choice to read as elevated), while the stats row, quick-links cards, and module cards all receive the layered treatment. The XP progress bar sits within the profile section: 8px height, `--radius-pill` caps, `--color-alpha-white-08` track over a `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess — a depth pass that fixes the prior invisibility on `ink-900`. The domain StatBars preview (if rendered) uses the same track language: each bar is 6px, `--radius-pill`, `--color-alpha-white-08` track over `--track-inset`, fill `--color-brand-orange`. No glow on the inline XP bar or StatBars (they are <36px elements per CONSISTENCY.md §1); the settings gear icon carries no glow. The quick-link cards and explore module cards are small (72pt and 120pt respectively), so they receive **`--glow-orange-sm`** (~12px /.35) only if they carry an active state (a notification badge or a "new" badge lights one briefly on first arrival); at rest, no glow. Extends the same depth language to all surfaces so nothing reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: user name `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; RPG badge text ("Lv.14") `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; XP label ("2,450 / 5,809 XP") `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / white 50%; member-since `--text-small` (11pt) / 400 / `--leading-normal` / white 40%; stats row numbers `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% with tabular-nums; stats row labels `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; quick-link card label `--text-h3` (17pt) / 600 / white 100%; quick-link subtitle `--text-caption` (13pt) / 400 / white 40%; explore section eyebrow ("suggested for you") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); "see all" link `--text-h3` (17pt) / 600 / `--color-brand-orange` (no weight accent beyond existing bold); module card name `--text-h3` (17pt) / 600 / white 100%; module card domain + description `--text-caption` / 400 / white 40–50%. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the screen (the diamond ◆ glyph on Life Power is non-text, so the two accents are: the RPG badge "Lv.14" text and the "see all" link). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice. Specific authored microcopy per state:

- **Profile → member-since** — *before:* "member since May 2026" (given) → *after (kept):* same; warm, plain, anchors identity. (Already on-voice.)
- **Settings gear icon a11y label** — *before:* no label → *after:* "Settings" (simple, clear).
- **Stats row a11y context** — *before:* bare numbers → *after:* "Tap to view character" (tappable affordance labeled).
- **XP bar loading** — *before:* no message → *after (new, on-voice):* label is animated / skeleton text "building your momentum" during load.
- **StatBars preview, day-1 / new user** — *before:* ghosted tracks, no message → *after (new, non-shaming):* "Your stats grow as you build habits" + a "see all 10" link (never empty or hidden; frames building not deficit).
- **StatBars preview, partial sync** — *before:* unclear if ghosted = no data or low stat → *after (new):* ghosted/dashed track is visually distinct from a real 0 (no-data ≠ zero, per the design rules).
- **Quick-link card "Notifications" badge, unread count** — *before:* bare orange dot (colour-only) → *after (new, a11y):* count badge "12" visible + glyph (notification bell) so unread state is not colour-alone. (Resolves the colour-alone miss flagged in Accessibility.)
- **Explore preview, no AI suggestions (fallback)** — *before:* silently shows 3 "popular" modules → *after (new, microcopy):* eyebrow shifts to "popular with Balencia" (warm, honest framing; never "explore" without context).
- **Error state (stats API failure)** — *before:* no message → *after (new, on-voice):* "Couldn't load your stats — pull to refresh" (specific, recovery action named).
- **Pull-to-refresh success** — *before:* no confirmation → *after (new):* brief toast "Stats refreshed" (warm, specific).

No exclamation marks; the brand period used with intent; all SIA copy (if present on explore cards) is specific to the user's data (a real curated insight, never a horoscope).

### Motion choreography

Locked to `CK-P4` order (draw-first): the **profile section fades in** (`--dur-base` 280ms `--ease-out-soft`) → the **XP Living-Line bar draws** `0 → value` (520ms `--dur-slow` `--ease-flow`, starting after the profile fade — preserves the existing bar-entrance timing) → the **stats row counts up** (520ms `--dur-slow`, the Life Power number is the lead counter) → the **domain StatBars preview rows rise** L-anchored `0 → value` (520ms `--dur-slow` `--ease-flow`, ~60ms stagger between rows) → the **quick-links grid fades in** (staggered, 280ms `--dur-base` each, 40ms stagger) → the **explore preview cards fade in** (280ms each, 40ms stagger). Below-fold surfaces animate on scroll-into-view. `prefers-reduced-motion` → all elements at final state instantly; the Living Line's static form (orange fill at value, never animated) and the StatBars at their final fills preserved — no essential info lost.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | XP bar at 0% (honest empty), all stats "0", quick-links all visible with adapted subtitles ("Lv.1 beginner", "no entries yet", "start a streak"), domain StatBars show all starting values with ghosted/dashed tracks for un-started domains | "Your stats grow as you build habits"; "Member since [today]"; quick-link subtitles adapt per card (never "0" alone, never hidden) | profile section keeps depth; StatBars ghosted tracks visually distinct from real 0; no degenerate empty radar / no collapsed shape |
| Loading | XP bar: skeleton pill (same track height, shimmer) → drawn fill; stats row: skeleton numbers (4 wide shimmer) → values; StatBars: row skeleton (track + label outline, shimmer) → bars. Layout preserved, depth visible. | "SIA is reading your profile — one moment." | skeleton on `--color-ink-brown-800`, shimmer animation, morphs into data (never a swap) |
| Empty / partial | un-synced domains: ghosted/dashed StatBars rows; missing stats: only present cards render, others remain skeleton (not hidden). Explore: fallback "popular" module cards render. | "Can't sync Meditation — try again later" (per-domain, if applicable); "building your balance" for stats that haven't synced | no-data ≠ zero (ghosted tracks, not real 0); ghosted, never silent |
| Error | stats row shows last-cached values if available, skeleton if not; StatBars show cached domains if available, others ghosted; a network banner below the sticky header (if applicable to the screen) names the failure. Explore: falls back to 3 "popular" modules. | "Couldn't refresh your stats. Pull to refresh." | calibrated `--color-error-red` only on genuine sync failure (red outline on the affected zone); glyph + word paired (a small alert icon + text, never colour-alone) |
| Offline | all cards show cached data; pull-to-refresh is dimmed with a reason. | "You're offline — showing your last sync." | actions honestly dimmed (50% opacity, no haptic); cached data retained |

### Signature & anti-generic

Ownable moments: the **XP Living-Line bar** (the horizontal continuous stroke, orange→green arrival, the brand signature on a navigation hub) and the **domain StatBars composition** (making Life Power legible as a shape, not just a number — the honest alternative to a generic radar/donut). Anti-generic fix: the 10 quick-link cards are *not* a flat symmetric grid (CK-P6). They are a 2×5 grid with slightly varied card heights (quick-links are 72pt, but the variant with a thumbnail or a badge on a link can be 80–88pt), and the section is led by a profile header + stats row that breaks the card monotony and anchors identity first — so the screen never reads as an undifferentiated card stack. The explore preview is a horizontal scroll (a deliberate asymmetry that guides the eye), not a grid. The settings gear in the top-right corner is a premium detail (never generic — a purposeful IA choice, not a template afterthought).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
| Element | Color | Contrast |
| --- | --- | --- |
| User name | `--color-alpha-white-100` | ≥12:1 on both |
| RPG badge text (Lv.14) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| XP bar (orange fill) | `--color-brand-orange` | 3.2:1 on `--track-inset` recess |
| XP bar (green arrival segment) | `--color-forest-green` | 2.8:1 on track (below 3:1, flagged as a Visualization-phase responsibility for the build program) |
| Stats row numbers | `--color-alpha-white-100` | ≥12:1 |
| Stats row labels | `--color-alpha-white-50` | ≥4.5:1 |
| "see all" link | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |
| Quick-link labels | `--color-alpha-white-100` | ≥12:1 |
| Quick-link subtitles | `--color-alpha-white-40` | ≥4.5:1 |
| Settings gear icon | `--color-alpha-white-60` | ≥4.5:1 |
| Notification badge count | `--color-brand-orange` OR white 100% (depends on badge style) | ≥3:1 (glyph + count label, never colour-alone) |
| Module card domain dot | per domain color | identity-only (not load-bearing data) |

Status never colour-alone: unread Notifications badge shows a **visible count** ("12") + a glyph (bell icon); new achievement shows a **visible "new" label** + a green dot; all interactive elements carry `--focus-ring` (`CK-T03`, 2px orange, 2px offset) uniform app-wide — the settings gear, avatar, RPG badge, stats row, quick-link cards, explore cards, "see all" link all use the same ring. Targets ≥44×44pt (the 44pt tap area for the settings gear is already met per the spec; the quick-link cards and module cards meet the 44pt minimum). Reduced-motion: the XP bar appears at final width instantly, Living Line's static form (orange fill) preserved; StatBars appear at final fill instantly; all staggered entrances collapse to instant.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | 60/30/10 base |
| Card surfaces (stats, quick links, module cards) | #211008 | ink-brown-800 | z-10 surface |
| Card borders | white at 8% | — | Subtle glass edge |
| XP progress bar fill | #FF5E00 | Burnt Orange | 60% — primary accent |
| XP progress bar track | white at 8% over inset rgba(0,0,0,0.28) | --color-alpha-white-08 / --track-inset (mint) | Recessed inset track per Visualization S17-V01 — fixes the previously near-invisible ink-brown-800-on-ink-900 track |
| RPG level badge diamond icon | #FF5E00 | Burnt Orange | 60% — brand accent |
| Life Power diamond icon (stats row) | #FF5E00 | Burnt Orange | 60% — Life Power indicator |
| Life Power number (stats row) | #FFFFFF | white 100% | Primary text (same as other stat numbers) |
| "see all" link text | #FF5E00 | Burnt Orange | 60% — interactive text |
| Active tab (Me) icon + label | #FF5E00 | Burnt Orange | 60% — active state |
| Stats row numbers | #FFFFFF | white 100% | Primary text |
| Name text | #FFFFFF | white 100% | Primary text |
| Labels, subtitles, captions | #FFFFFF at 40-50% | white opacity | Tertiary text |
| Settings gear icon | #FFFFFF at 60% | white opacity | Secondary icon |
| Inactive tab icons | #FFFFFF at 60% | white opacity | Tab bar |
| Module card domain dots | per-domain hex | Domain colors | Identification only |
| "suggested" badge bg | #FF5E00 | Burnt Orange | 60% — attention |
| "new" badge bg | #34A853 | Forest Green | 30% — freshness |
| Notification badge dot | #FF5E00 | Burnt Orange | 60% — alert |
| Avatar border | white at 20% | — | Subtle ring |

**60/30/10 verification**: Orange dominates interactive elements (XP bar, "see all" link, active tab, badges, notification dot). Green appears only on "new" module badges. Purple is absent — correct for this screen (no SIA/AI indicator needed on a navigation hub). Ratio holds.

---

## Interaction States

### Avatar (Tap to Edit)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 64pt circle, 2pt border white at 20% | — |
| Pressed | scale(0.95), border brightens to white at 40% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always interactive) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Stats Row Card (Tap to RPG Character)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens slightly, border white at 15% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | skeleton shimmer across all 4 stat values | — |
| Error | N/A | — |
| Success | N/A | — |

### Quick Link Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens slightly, border white at 15% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity, no touch response | — |
| Loading | icon replaced with 20pt spinner, label stays | — |
| Error | N/A | — |
| Success | N/A | — |

### Explore Module Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt border white at 8% | — |
| Pressed | scale(0.97), bg lightens, warm shadow appears | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | skeleton shimmer over card content | — |
| Error | N/A | — |
| Success | N/A | — |

### Settings Gear Icon
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 60%, 22pt | — |
| Pressed | white at 40%, scale(0.90) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### "See All" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | orange (#FF5E00), 14pt Sora Semibold | — |
| Pressed | orange at 60%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### RPG Level Badge (Tap to RPG Character)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | pill shape, text white, diamond icon orange | — |
| Pressed | scale(0.95), subtle orange glow behind pill | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Bottom Tab Bar — Me Tab (Active)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | orange icon (filled) + orange label | — |
| Default (inactive, other tabs) | white at 60% icon (outlined) + white at 60% label | — |
| Pressed (any tab) | scale(0.90), icon brightens | medium impact |
| Focus-visible | 2pt orange ring around icon+label group | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Avatar | Present edit profile modal |
| Tap | RPG level badge | Push RPG Character [19] |
| Tap | Stats row | Push RPG Character [19] |
| Tap | Quick link card | Push respective sub-screen |
| Tap | Explore module card | Push domain dashboard / feature screen |
| Tap | Settings gear | Push Settings [21] |
| Tap | "see all" | Push Explore Section [18] |
| Horizontal scroll | Explore cards | Scroll through suggested modules |
| Vertical scroll | Entire screen | ScrollView, content pans vertically |
| Pull-to-refresh | Screen top | Refresh stats + explore suggestions |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Profile section | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Stats row | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Quick links grid | Screen mount | Staggered fade-in per card, 60ms stagger | 280ms each | ease-out-soft |
| Explore cards | Screen mount | Staggered fade-in, 60ms stagger after grid | 280ms each | ease-out-soft |
| XP progress bar | Screen mount | Width animates from 0 to current %, starts after profile fade-in | 520ms | ease-flow |
| Pull-to-refresh | Pull release | Stats + explore cards skeleton shimmer → populated | 280ms | ease-out-soft |
| Quick link press | Tap | scale(1→0.97→1) | 160ms | ease-out-soft |
| Tab switch to Me | Tab tap | Crossfade from previous tab content | 280ms | ease-out-soft |

**Screen transition**:
- **Enter (from tab switch)**: Crossfade in (280ms, ease-out-soft). Content stagger begins.
- **Enter (back from sub-screen)**: Slide in from left (standard iOS pop), 280ms.
- **Exit (to sub-screen)**: Slide out to left (standard iOS push), 280ms.

---

## Empty States

### Day 1 (new user)
- Avatar shows first initial on ink-brown-800 circle
- Name displays as entered during onboarding
- RPG level badge: "Lv.1" with empty XP bar (0 / 100 XP)
- Stats row: "0 day streak" / "0 completed" / "◆ 0 Life Power" / "0 total XP"
- Quick links grid: all 10 cards visible, subtitles adapt ("Lv.1 beginner" for RPG, "no entries yet" for Mission journal, "start building" for Wiki, "0 connected" for Apps, "choose a plan" for Subscription, "all caught up" for Notifications)
- Explore preview: "start exploring" eyebrow text. Shows 3 popular modules (Fitness, Journal, Finance) with "popular" badges instead of "suggested"
- Screen never feels empty — structure is always full, content adapts.

### Returning user with zero activity today
- Stats row shows lifetime totals (never zero after first action)
- Explore preview refreshes with new AI suggestions based on recent patterns
- No special empty state needed — this screen shows cumulative data, not daily.

---

## Motivation Adaptation

- **Low motivation**: Same layout. Explore preview features simpler, less intimidating modules. Stats row emphasizes streak preservation. SIA suggestion card in explore says something encouraging ("just checking in today counts").
- **Medium motivation**: Default experience as described above.
- **High motivation**: Stats row could show additional stat (e.g., "this week" mini-trend arrows next to numbers). Explore preview may show more advanced modules (analytics, correlations). No additional visual density — Me Main stays clean regardless.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| User name | Sora | Semibold (600) | 20pt | 26pt | #FFFFFF |
| RPG level badge text ("Lv.14") | Sora | Semibold (600) | 14pt | 18pt | #FFFFFF |
| RPG level diamond icon | — | — | 12pt | — | #FF5E00 |
| XP progress label ("2,450 / 5,000 XP") | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Member since text | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Stats row number | Sora | Bold (700) | 24pt | 30pt | #FFFFFF |
| Stats row label | Sora | Regular (400) | 12pt | 16pt | #FFFFFF at 50% |
| Quick link card label | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Quick link card subtitle | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Explore section eyebrow ("suggested for you") | Sora | Semibold (600) | 12pt | 16pt | #FFFFFF at 50% |
| "see all" link | Sora | Semibold (600) | 14pt | 18pt | #FF5E00 |
| Module card domain name | Sora | Regular (400) | 11pt | 14pt | #FFFFFF at 50% |
| Module card name | Sora | Semibold (600) | 15pt | 20pt | #FFFFFF |
| Module card description | Sora | Regular (400) | 13pt | 18pt | #FFFFFF at 40% |
| Module card badge text | Sora | Semibold (600) | 10pt | 14pt | #FFFFFF |
| Settings gear icon | — | — | 22pt | — | #FFFFFF at 60% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Network failure (profile data) | Profile section shows cached data (name, avatar) from local storage. XP bar and level show last known values. | Pull-to-refresh retries. Profile data is cached aggressively. |
| Stats row API failure | Stats row shows skeleton shimmer across all 4 values. | Pull-to-refresh retries. Cached stats displayed if available. |
| Explore recommendations API failure | Explore preview section falls back to 3 static "popular" module cards (Fitness, Journal, Finance). No "suggested" badges shown. | Pull-to-refresh retries AI recommendations. Fallback is always available. |
| API timeout (RPG stats) | Level badge and XP bar show last cached values. Stats row shows skeleton shimmer. | Pull-to-refresh retries all data. |
| Avatar upload failure | Camera overlay shows brief red flash. Toast: "Couldn't upload photo. Try again." | User taps avatar to retry. |
| Partial data load | Sections that loaded successfully display normally. Failed sections show skeleton states independently. | Pull-to-refresh retries all sections. |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Screen reader labels**:
  - Settings gear: "Settings"
  - Avatar: "Profile photo, tap to edit" (or "Profile initial [letter], tap to add photo")
  - RPG level badge: "Level [number], tap to view character"
  - XP progress bar: "[current] of [total] XP to level [next level]"
  - Stats row: "[value] day streak, [value] missions completed, [value] Life Power, [value] total XP, tap to view character"
  - Quick link card: "[card name], [subtitle]" (e.g., "RPG character, Level 14 explorer")
  - Notification badge: "[card name], [count] new notifications"
  - "see all" link: "See all suggested modules"
  - Module card: "[module name] in [domain], [description], tap to open"
- **Focus order**: Settings gear -> Avatar -> User name -> RPG level badge -> XP bar -> Stats row -> Quick link cards (left to right, top to bottom, reading order: RPG character, Mission journal, Book of life, Connected apps, Subscription, Progress photos, Streaks, Achievements, Notifications, Help center) -> "suggested for you" eyebrow -> "see all" link -> Module cards (left to right)
- **Gesture alternatives**: All interactions are tap-based (no custom gestures). Horizontal scroll on explore cards also navigable via swipe-through in VoiceOver.
- **Reduced motion**: XP bar appears at final width instantly. Content entry stagger replaced with instant display. Quick link press scale animation disabled.

---

## Cross-References

- **Navigates to**: Screen [18] — Explore Section via "see all" (stack push), Screen [19] — RPG Character via level badge or stats row (stack push), Screen [20] — Personal Wiki via quick link (stack push), Screen [21] — Settings via gear icon (stack push), Screen [22] — Connected Services via quick link (stack push), Screen [23] — Subscription via quick link (stack push), Screen [24] — Notification History via quick link (stack push), Screen [25] — Help Center via quick link (stack push), Screen [49] — Progress Photos via quick link (stack push), Screen [50] — Profile Edit via avatar tap (stack push), Screen [59] — Streak Details via quick link (stack push), Screen [71] — Achievement Gallery via quick link (stack push), Screen [73] — Mission Journal via quick link (stack push), Domain dashboards via explore module cards (stack push)
- **Navigates from**: Bottom tab bar (tab switch), back from any Me sub-screen (stack pop)
- **Shared components with**: Screen [19] — RPG Character (stats row pattern, XP progress bar), Screen [18] — Explore Section (module card pattern), Screen [12] — Home Screen (bottom tab bar), Screen [49] — Progress Photos (photo thumbnail on quick link card), Screen [50] — Profile Edit (avatar tap target), Screen [59] — Streak Details (streak count on quick link card)
- **Patterns used**: Back Button (Batch 1, for sub-screens returning here), Bottom Tab Bar (_shared-patterns.md)
- **Patterns established**: Product Mode screen layout (no large title here — profile section replaces it), Stats row, Quick links grid (2x4 layout), Module card (Explore), Settings gear icon position, Avatar Camera Overlay (small camera icon indicating upload capability)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/me`
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
| B07-F08 | minor | mobile-ergonomics | Keep compact visuals but expand important text-link hit areas to at least 44px high with focus-visible styling. |

### Prototype Implications

- Keep the existing visual direction, then verify touch targets, labels, and route parity in the prototype phase.

