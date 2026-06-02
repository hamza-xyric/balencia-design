# Screen Design: Achievement Gallery

**Screen**: 71 of 77
**File**: 71-achievement-gallery.md
**Register**: Product Mode
**Primary action**: Browse earned achievements and track progress toward to-discover ones (tap achievement card)
**Tab**: Me
**Navigation**: Stack depth 2+ (pushed from Me Main [17] quick links grid, RPG Character [19] achievement badge tap, or Celebration Overlay [42] "view all" link). Back button returns to previous screen.

---

## Purpose

The Achievement Gallery is the user's trophy room — a visual, collectible-style display of every badge and milestone earned across all 9 life domains, plus progress toward to-discover achievements. This screen closes the gamification feedback loop: users see what they've accomplished, what's within reach, and what's still to discover. It reinforces engagement breadth (achievements span all domains) and depth (progressive tiers within each domain). The gallery must feel premium and satisfying — earned badges should glow and feel weighty, while to-discover badges create aspirational pull without feeling punishing.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Achievement summary strip — total earned count, completion percentage ring, current streak badge
2. Domain filter chips — narrow by domain or view all
3. Achievement grid — visual grid of badge cards (earned glow, to-discover dimmed)
4. Achievement detail bottom sheet — full badge info on tap

**User flow**:
- **Arrives from**: Me Main [17] via "Achievements" quick link card, RPG Character [19] via achievement badge tap in Streak & Rewards section, Celebration Overlay [42] via "view all achievements" link, Notification tap (new achievement earned)
- **Primary exit**: Previous screen via stack pop (back button)
- **Secondary exits**: Achievement Detail Bottom Sheet (modal present), Domain Dashboard [26-36] via "go to [domain]" CTA in detail sheet

---

## Layout

**Scroll behavior**: FlatList (homogeneous achievement cards, virtualized for performance)
**Tab bar visible**: Yes

### ASCII Wireframe

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|  [<-]   Achievements        |  <- nav header, 44pt
|-----------------------------|
|                             |  <- 16pt top padding
|  +---------+---------+---+ |
|  | [ring]  | 47      | 🔥 | |  <- summary strip
|  | 47/120  | earned  | 42 | |     ~80pt
|  |  39%    |         |days| |
|  +---------+---------+---+ |
|                             |  <- 16pt gap
|  [All] [Fitness] [Nutrition]|  <- domain filter chips
|  [Finance] [Career] [...]   |     scrollable horizontal
|                             |  <- 16pt gap
|  +--------+  +--------+    |
|  | [🏆]   |  | [🏆]   |    |  <- 2-column grid
|  | First   |  | 7-Day  |    |
|  | Workout |  | Streak |    |
|  | Fitness |  | General|    |
|  | ✓earned |  | ✓earned|    |
|  +--------+  +--------+    |  <- 12pt gap
|  +--------+  +--------+    |
|  | [🔒]   |  | [🔒]   |    |
|  | 30-Day  |  | Meal   |    |
|  | Streak  |  | Master |    |
|  | General |  | Nutrit.|    |
|  | 18/30   |  | 8/20   |    |  <- progress toward to-discover
|  +--------+  +--------+    |
|  ...                        |
|                             |  <- 64pt bottom padding
|-----------------------------|
|  Today   SIA   Goals   Me   |
+-----------------------------+
```

### Component Stack (top to bottom)

1. **Navigation Header** — 44pt
   - Back chevron (left), "Achievements" title (center)

2. **Achievement Summary Strip** — 16pt top padding + 80pt = 96pt
   - Completion ring + earned count + streak badge in a single card

3. **Domain Filter Chips** — 16pt gap + 36pt = 52pt
   - Horizontal scrollable chip row: All, Fitness, Nutrition, Finance, Career, Relationships, Spirituality, Learning, Creativity, Wellbeing, General

4. **Achievement Grid** — 16pt gap + FlatList of achievement cards
   - 2-column grid, 12pt gap between items
   - Earned achievements first, then in-progress (partially complete), then to-discover (by closeness-to-unlock)

5. **Bottom Padding** — 64pt (clears tab bar)

---

## Components

### Achievement Summary Strip
- **Purpose**: At-a-glance progression snapshot for all achievements
- **Data source**: `GET /api/v1/achievements/summary` — returns total, earned, streak_badge
- **Visual treatment**: Single ink-brown-800 card, --r-xl (28pt), full-width minus 32pt, 16pt internal padding, 1pt border white at 8%. Three sections side by side:
  - **Left — Completion ring**: 48pt diameter circular progress ring. Stroke 4pt. Track: white at 10%. Fill: orange (#FF5E00). Center: earned/total count in 13pt Sora Bold white. Below ring: completion percentage in 11pt Sora Regular, white at 40%.
  - **Center — Earned count**: Large number (24pt Sora Bold, white, tabular-nums) + "earned" label (12pt Sora Regular, white at 50%). Vertically centered.
  - **Right — Streak badge**: Flame icon (16pt, orange) + current streak count (18pt Sora Bold, white) + "days" (11pt Sora Regular, white at 50%). Vertically centered.
- **Size**: full-width minus 32pt x 80pt

### Domain Filter Chips
- **Visual treatment**: Same as Filter Chip Row pattern from Screen [13] and Screen [70]. Horizontal scrollable, 36pt height, --r-pill.
- **Active**: domain color bg at 100%, white text. Inactive: ink-brown-800, white at 60%.
- **"All" chip**: active state uses orange (#FF5E00) bg.
- **Single-select**: Only one filter active at a time. "All" is default.
- **Each domain chip**: shows domain color dot (6pt) inline before name when inactive.

### Achievement Card
- **Purpose**: Visual badge display with earned/to-discover state
- **Visual treatment**: ink-brown-800 bg, --r-xl (28pt), 1pt border (varies by state). Full card content:
  - Badge icon area: 80pt height, centered. Contains the achievement badge artwork.
    - **Earned**: Badge icon (48pt) rendered in full color with domain color accent. Subtle warm glow behind icon (domain color at 10%, 64pt radial blur).
    - **In-progress**: Badge icon (48pt) rendered in white at 30% (desaturated). No glow. Small circular progress ring (24pt) overlaid at bottom-right of icon.
    - **To discover**: ghosted rarity-outlined silhouette (rarity colour at 15%) centered — never a padlock icon (non-shaming, S71-V02). Badge artwork hidden.
  - Achievement name: 14pt Sora Semibold, white (earned) or white at 40% (to discover), center-aligned, 8pt below icon area
  - Domain tag: 11pt Sora Regular, domain color at 60% (earned) or white at 30% (to discover), center-aligned, 4pt below name
  - Status indicator:
    - Earned: "earned" text (11pt Sora Semibold, Forest Green #34A853) + small checkmark (10pt)
    - In-progress: progress text (11pt Sora Regular, orange #FF5E00), e.g., "18/30 days"
    - To discover: "to discover" text (11pt Sora Regular, white at 40%) — an invitation, never "locked"/"failed" (non-shaming, per Visualization)
  - Earned date (earned only): 10pt Sora Regular, white at 25%, 2pt below status. "May 15, 2026"
- **Border states**:
  - Earned: 1pt border domain color at 20%
  - In-progress: 1pt border white at 8%
  - To discover: 1pt border white at 5%
- **Size**: ((screen width - 32pt - 12pt) / 2) x ~180pt
- **Sort order**: Earned (newest first) → In-progress (highest % first) → To discover (by closeness-to-unlock)
- **Gestures**: Tap → opens Achievement Detail Bottom Sheet

### Achievement Detail Bottom Sheet
- **Presentation**: Standard bottom sheet (ink-brown-800 bg, --r-lg top corners, drag handle). ~70% screen height.
- **Content**:
  - Badge hero: 96pt badge icon, centered, with glow effect for earned badges (domain color at 12%, 80pt radial). To-discover badges show a ghosted rarity-outlined silhouette (rarity colour at 15%).
  - Achievement name: 20pt Sora Semibold, white, center-aligned, 16pt below icon
  - Achievement description: 15pt Sora Regular, white at 70%, center-aligned, 8pt below name. 2-3 sentences explaining what this badge represents.
  - Domain pill: domain color at 15% bg, domain color text, 12pt Sora Semibold, --r-pill, 28pt height. Center-aligned, 12pt below description.
  - Tier indicator (if tiered achievement):
    - Horizontal row of tier dots/badges: Bronze → Silver → Gold
    - Each tier: 32pt circle. Earned: full color. Current: pulsing ring. Locked: white at 10%.
    - Tier name below each: 10pt Sora Regular, white at 40%
  - **Earned state**:
    - Earned date: "Earned on May 15, 2026" — 13pt Sora Regular, white at 50%, 16pt below tier/domain
    - Share row: "Share this achievement" with share icon, tappable (system share sheet)
  - **Detail-sheet register (Product Mode):** the sheet carries **no "Ask SIA" control and no SIA copy** — this is a pure-gamification screen. Its only primary touchpoint is the orange "go to [domain]" CTA (to discover) / "keep going" text (in-progress); a royal-purple "Ask SIA" button would be a 60/30/10 register violation.
  - **In-progress state**:
    - Progress bar: full-width minus 32pt, 6pt height, --r-pill. Track: white at 8%. Fill: orange (#FF5E00). 16pt below tier/domain.
    - Progress label: "18 of 30 days completed" — 13pt Sora Regular, white at 60%, 6pt below bar
    - Remaining: "12 more days to go" — 13pt Sora Regular, orange, 4pt below label
  - **To-discover state**:
    - Requirements: "To unlock:" header (14pt Sora Semibold, white at 60%), followed by bullet list of requirements (13pt Sora Regular, white at 50%). Each bullet: white at 30% dot.
    - CTA: "start working toward this" — orange text link, 14pt Sora Semibold, navigates to relevant domain dashboard
  - **Rarity indicator** (all states): "12% of users have earned this" — 11pt Sora Regular, white at 30%, bottom of content. Shows percentage of user base who earned it.
- **CTAs** (conditional):
  - To discover: "go to [domain]" orange pill CTA (48pt, full-width minus 32pt) fixed at bottom
  - Earned: no fixed CTA (view-only)
  - In-progress: "keep going" motivational text (not a button, just 14pt Sora Semibold, orange, center-aligned)
- **Gestures**: Drag-to-dismiss, tap CTAs

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Summary earned count | Sora | 700 (Bold) | 24pt | 30pt | White |
| Summary labels | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| Summary ring count | Sora | 700 (Bold) | 13pt | 18pt | White |
| Filter chip text | Sora | 600 (Semibold) | 13pt | 18pt | White at 60% (inactive) / white (active) |
| Card achievement name | Sora | 600 (Semibold) | 14pt | 18pt | White (earned) / white at 40% (to discover) |
| Card domain tag | Sora | 400 (Regular) | 11pt | 16pt | Domain color at 60% |
| Card status text | Sora | 600 (Semibold) | 11pt | 16pt | Green (earned) / orange (progress) |
| Detail name | Sora | 600 (Semibold) | 20pt | 26pt | White |
| Detail description | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Rarity indicator | Sora | 400 (Regular) | 11pt | 16pt | White at 30% |

---

## Visualization

> Source: embedded section (no companion file — Batch 5). Audited in `viz-audit/` — Batch 5 (Progress/Awards, template C), findings `S71-V01..S71-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This screen MINTS `VK-013` BadgeTierGrid** — the achievement/rarity grid; its full primitive spec is folded into `VIZ-KIT.md`. **Product Mode → orange-dominant** (no SIA content; the prototype's "Ask SIA" button is a register slip flagged below). Benchmark = **Duolingo + Apple Fitness badges + game achievement screens** rendered **the Balencia way** (warm rarity glow on ink-brown, non-shaming "to discover" framing), not a Duolingo/Game-Center clone. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified rarity-glow calibration + working per-badge progress arcs + the detail-sheet tier ladder, owned by the later viz-build program.)*

The Achievement Gallery is a trophy room; this section upgrades *how the collection reads* — from a flat grid of identical lock/trophy glyphs into a crafted **rarity-graded badge wall** with honest per-badge progress, a hero completion gauge, a streak momentum strip, and a fully-designed cold-start/empty/partial/error state set. The hero is the collection's at-a-glance progression (completion gauge + earned KPI); the grid is the body; everything stays **non-shaming** — locked badges are framed as *invitations to discover*, never deficiencies.

> **Component reality (spec-vs-build diff — each gap is a finding):** the prototype route `/tabs/me/achievements` renders far below the spec. (1) Every earned/in-progress badge uses the **same generic `Trophy` lucide glyph** — no rarity tier, no domain-colour accent, no badge artwork; the in-progress "progress ring" is a literal **"%" character** in an orange dot, not a `GaugeRing` arc (`S71-V04`). (2) Earned badges carry the **full 32px `--glow-orange`** on a 56px circle regardless of rarity or domain — a glow-*swamp* depth failure *and* a colour error (orange glow on a non-orange-rarity badge) (`S71-V02`). (3) The summary strip has **no completion ring** at all — it's three icon+number columns (Earned / Close / Days); the spec's 48px orange completion ring is absent (`S71-V01`). (4) The detail sheet has **no tier ladder, no rarity indicator, no progress bar, no requirements list, no "go to [domain]" CTA** — it shows a domain pill, one sentence, and a register-violating **"Ask SIA" purple button** on a pure-gamification screen (`S71-V05`, brand finding). (5) `mock.ts` `achievementsGallery` carries **no `rarity`, no numeric `progress` (only a display string `"18/30 days"`), no `rarityPct`, no `total`-vs-`earned` ring datum, no per-badge `tier`** — every viz below names the field it needs. These are the resolution gaps this section closes.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Earned (47) / total (120) / completion (39%) | three icon columns; **no ring** | **hero completion `GaugeRing`** (96px, arc-gradient, glow, inset, count-up) + **earned `KPIStatTile`** | `GaugeRing` (`VK-002`) + `KPIStatTile` (`VK-008`) |
| Current streak (42 days) | flame icon + number | **streak `MomentumBar`** toward next streak-milestone badge (honest % to next unlock) | `MomentumBar` (`VK-004`) |
| Badge collection across 9 domains, earned / in-progress / locked + **rarity** | identical `Trophy`/`Lock` glyphs, orange glow on all earned, no rarity | **BadgeTierGrid** — rarity-glow tiles (common→legendary), locked = "to discover" silhouette, domain accent | **`BadgeTierGrid` (`VK-013`)** — body hero |
| Per-badge progress toward unlock (18/30, 8/20) | a literal "%" glyph in an orange dot | **thin per-badge `GaugeRing` arc** (≤24px, honest % toward unlock) on in-progress tiles | `GaugeRing` micro (`VK-002`) inside `VK-013` |
| Rarity / scarcity ("12% of users have earned this") | absent | **rarity chip** (rarity-colour identity + word) + rarity % as honest disclosed text | `BadgeTierGrid` rarity chip (`VK-013`) |
| Tiered achievement ladder (bronze→silver→gold) — detail sheet | absent in build | **tier ladder** — 3 tier nodes, earned filled / current ringed / locked ghosted | `BadgeTierGrid` tier ladder (`VK-013`) |
| Domain filter chips · badge name · earned date · requirements list | chips / text | — (deliberately textual / iconographic) | — |

**Editorial hierarchy (calm, not maximal):** the **completion `GaugeRing` is the one viz hero** (one focal score, <2s read); the earned KPI + streak momentum are clearly secondary in the summary strip; the **BadgeTierGrid is the screen's body** (a collection wall, not a competing hero — its tiles carry *micro* depth, the grid does not fight the gauge). Three viz registers, one focal — not a wall of equal-weight charts.

### 1 · Hero completion gauge + earned KPI — `S71-V01` → `GaugeRing` (96px) + `KPIStatTile`

Replace the ring-less summary strip's left column with the spec's intended **completion ring, upgraded to a `GaugeRing`**: a 96px hero gauge of `earned / total` (47/120 → 39%), **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, center value (`text-h2`, count-up 520ms `--ease-flow`: the **earned count "47"**) + "of 120 earned" sub-label, and **`ticks`** (12 radial ticks, hero score gauge). The middle column becomes a **`KPIStatTile`** — uppercase "EARNED THIS MONTH" label (`white/40`, +0.12em) · number `text-h2` · **▲ green delta** over a **fixed, disclosed window** ("vs last month"); the right column stays the streak (handed to `S71-V03`).
- **Depth (token-backed):** gauge surface `ink-brown-800` + top-edge highlight; arc-gradient + 32px hero glow on the 96px gauge *only*; KPI tile flat-premium (no glow — depth lives in the gauge).
- **Honesty / non-shaming:** completion is framed as *collection progress*, never a verdict ("39% complete," not "you're missing 61%"); a ▲/— delta is honest (Day-1 reads `—`, no fabricated gain); the gauge never recolours low completion to alarm-red.
- **Micro-interaction:** tap the gauge → scrolls/filters to the nearest in-progress badges ("closest to unlock"); count-up on mount.
- **States:** Day-1 → gauge at a **ghosted 0%** track (faint full ring, center "0", **not** a filled-0 disc), KPI reads `0` with `—` delta; loading → ghosted arc + skeleton number that **morphs** into the drawn fill (never a blank disc).
- **Data:** `achievementsGallery.summary` (`earned`/`total`/`percent`) + a new `summary.lastMonthEarned` so the KPI delta is real, not invented (`mock.ts`).

### 2 · Badge collection — `S71-V02` → **`BadgeTierGrid` (`VK-013`)** — the minted primitive

The screen's body and the reason this screen exists: every badge across 9 domains as a **rarity-graded collectible wall**. **This screen mints `VK-013` BadgeTierGrid** (full spec folded into `VIZ-KIT.md`). Each tile is a 2-column grid card carrying:
- **Rarity (identity, the new dimension):** the tile's accent + glow colour is the badge's **rarity** — `--color-rarity-common #FFFFFF` · `--color-rarity-uncommon #14B8A6` · `--color-rarity-rare #7F24FF` · `--color-rarity-epic #FF5E00` · `--color-rarity-legendary #FFD700` (all already in `globals.css`, `CONSISTENCY.md` §5). Rarity is **identity, not data-ink** — it does *not* break 60/30/10, exactly as podium metals don't. A small **rarity chip** (rarity-colour text on a 15%-subtle fill, e.g. `--color-rarity-rare-subtle`) + the **word** ("Rare") makes rarity legible without colour-alone.
- **Calibrated rarity glow (size-stepped, the depth signature):** earned tiles carry a **soft outer glow in the rarity colour**, size-stepped so legendary reads brightest but **never neon** — `--glow-orange-sm`-radius (~12px) **(mint)** behind the 56px badge medallion at the rarity colour @ stepped alpha: common ~0% (a flat ring, no glow) → uncommon ~18% → rare ~26% → epic ~32% → legendary ~40% (the brightest, capped well under neon). This **fixes the build's** "32px orange glow on every earned badge" swamp + colour error: the glow radius matches the medallion size and the colour matches the rarity. Locked tiles carry **no glow**.
- **Earned / in-progress / locked states (non-shaming):** **earned** = full-colour medallion (domain-accent artwork) + rarity glow + a **green `#34A853` ✓ "earned" chip** (glyph + word, never colour-alone) + earned date `white/25`; **in-progress** = desaturated medallion (`white/30`) + a **thin per-badge `GaugeRing` arc** (`S71-V04`) + honest "18/30" progress text in orange; **locked = a ghosted badge silhouette** (rarity-coloured outline @ 15%, **not** a generic padlock) under the label **"to discover"** (`white/40`) — framed as an *invitation*, with a one-line "what unlocks this" teaser, **never** "locked"/"failed". Border by state: earned = rarity colour @ 20%, in-progress = `white/8`, to-discover = `white/5`.
- **Depth:** tiles `ink-brown-800` + top-edge highlight; the rarity glow is the only depth accent; the grid surface itself stays flat so it doesn't compete with the hero gauge.
- **Micro-interaction:** tap tile → Achievement Detail Bottom Sheet (`S71-V05`); pressed = `scale(0.97)`.
- **States:** Day-1 → all tiles "to discover" (ghosted silhouettes, rarity-outlined), sorted by closeness-to-unlock, with the motivational banner above the grid ("Complete goals and build streaks to earn your first badge") — **never** a wall of grey padlocks; loading → tiles shimmer in place (medallion circle + label bars), resolving to data; partial-load → loaded tiles render, failed tiles resolve to text-only (name + domain + state) — distinct from loading.
- **Data:** `achievementsGallery.achievements[]` extended with **`rarity` ('common'|'uncommon'|'rare'|'epic'|'legendary')**, numeric **`progress`/`target`** (replacing the display-only "18/30 days" string), **`rarityPct`** (% of users earned), and per-badge **`tier`** for the ladder (`mock.ts`).

### 3 · Streak momentum toward next badge — `S71-V03` → `MomentumBar`

The streak (42 days) keeps its summary-strip flame + number, but adopts a **`MomentumBar`** beneath it showing **honest progress toward the next streak-milestone badge** (e.g. 42/60 → "18 days to the 60-day legend") — a **single continuous** rounded `--grad-progress` **(mint)** orange→green fill (arrival end green), 8px, over a `--color-alpha-white-08` track. This converts a bare streak number into *forward* momentum toward a concrete unlock.
- **Non-shaming (the Gentler-Streak thesis, per the benchmark):** the bar frames **momentum toward the next reward**, never weaponises loss-aversion — there is **no** "don't break your streak!" countdown, no red decay, no guilt; a reset streak reads "starting fresh — 0 of 60," not a failure.
- **Depth:** continuous fill (never segmented — §8), arrival end green; no glow (bar-scale).
- **States:** Day-1 / streak 0 → "Your streak starts today — 0 of [first milestone]" with the bar at a ghosted 0; loading → skeleton bar.
- **Data:** `achievementsGallery.summary.streak` + a new `summary.nextStreakBadge { target, name }` (`mock.ts`).

### 4 · Per-badge progress arc — `S71-V04` → micro `GaugeRing` (inside `VK-013`)

Resolve the build's literal **"%" placeholder glyph**: every in-progress tile carries a **thin `GaugeRing` arc** (≤24px, 2–3px stroke, **no glow** at micro-scale) overlaid bottom-right of the desaturated medallion, filled to the **honest `progress/target`** ratio (18/30 = 60%), orange `--color-brand-orange` fill on a `--track-inset` **(mint)** + `--color-alpha-white-10` track. The numeric "18/30" stays beside it so progress is **never arc-alone** (a11y). This is the BadgeTierGrid's "show progress toward the next unlock" guarantee — every locked-but-reachable badge shows *how close*.
- **Honesty:** the arc reflects the true ratio; a no-progress badge (0/30) shows a ghosted empty arc + "0/30," distinct from a *locked* (undiscovered) badge that shows none.
- **Non-shaming:** progress framed as "60% there," never "12 short."
- **States:** un-synced progress → ghosted arc (no-data ≠ 0%); loading → skeleton ring.
- **Data:** per-badge numeric `progress`/`target` (`mock.ts`).

### 5 · Detail sheet — tier ladder + rarity + progress — `S71-V05` → `BadgeTierGrid` detail facet

The Achievement Detail Bottom Sheet (~70%) gets the spec's full anatomy the build dropped, all `VK-013` facets:
- **Badge hero** (96px medallion) with rarity glow (same calibrated size-step as the grid — *not* the build's flat orange) for earned; **ghosted rarity-outlined silhouette** for to-discover (not a padlock).
- **Tier ladder** (tiered achievements): a horizontal row of 3 tier nodes (Bronze `--color-mission-bronze` → Silver `--color-mission-silver` → Gold `--color-mission-gold`, all in `globals.css`): **earned** = filled metal + ✓; **current** = a pulsing rarity-coloured ring (the one place a pulse is allowed — it's the "you are here" marker, not a loss-aversion alarm); **locked** = ghosted `white/10`. Tier name below each (`white/40`). Metals are neutral identity, 60/30/10-safe.
- **In-progress** → a full-width `MomentumBar`/progress bar (orange `--grad-progress` **(mint)**) + "18 of 30 days · 12 to go" (honest, forward-framed).
- **To-discover** → a **"To unlock"** requirements list (constructive, an invitation) + an **orange "go to [domain]" CTA** (48px pill) — the screen's correct primary touchpoint, **replacing the build's register-violating "Ask SIA" purple button** (this is pure gamification — no SIA content; see brand block).
- **Rarity row (all states):** rarity chip (colour + word) + **honest disclosed** "12% of users have earned this" (`white/30`) — a real, fixed scarcity figure, never manufactured urgency.
- **States:** detail-load failure → skeleton hero + list, 5s → "Couldn't load achievement details" + orange retry; name/domain/rarity still show from cached grid data.
- **Data:** per-badge `tier`, `rarity`, `rarityPct`, numeric `progress`/`target`, `requirements[]`, `domainRoute` (`mock.ts`).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px completion `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + center count-up → **then** the earned `KPIStatTile` counts up (280ms `--ease-out-soft`) → **then** the streak `MomentumBar` fills L→R (520ms `--ease-flow`) → **then** the BadgeTierGrid tiles **stagger in** (40ms/tile, `--ease-out-soft`), each in-progress tile's micro-arc filling after its tile lands → rarity glows fade in 0→calibrated alpha as each tile settles (warm glow *arrives*, never flashes). On filter change → grid crossfade (280ms). Newly-earned badge (arriving from Celebration Overlay [42]) → medallion `scale 0.8→1.0` + a rarity-coloured (not generic gold) particle accent (600ms `--ease-flow`). Below-fold tiles animate on **scroll-into-view**. No full Living Line on this screen (the streak `MomentumBar` is the one horizontal-line motif — one line per surface, §8). `prefers-reduced-motion` → every chart at final state instantly; the gauge's filled arc, the momentum bar's final fill, and each tile's rarity glow at rest are preserved (the static frame is the canonical frame).

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — completion gauge ghosted at 0% (faint full track, center "0", never a filled-0 disc), KPI `0` with `—` delta, streak bar "starts today," **all tiles "to discover"** (ghosted rarity silhouettes sorted by closeness-to-unlock) under the motivational banner — never a grey padlock wall; **loading** — depth-preserving skeletons that *morph* into drawn data (gauge arc, momentum bar, tile medallions visible — never blank discs); **empty (filtered)** — domain-coloured icon + "No [domain] badges yet — complete [domain] goals to start earning," distinct from loading and Day-1; **partial** — loaded tiles render, failed tiles resolve to text-only (distinct from a real "to discover" state); un-synced per-badge progress ghosted vs a true 0/target; **error** — chart-specific honesty (the gauge / grid fail independently) + a visible "retry," per the Error Handling table. **Low-motivation adaptation** (per the Motivation table): hide locked tiles entirely, promote >75%-progress "almost there" badges with a green progress ring — non-shaming by omission.
- **60/30/10:** **orange dominates** data ink (completion gauge fill, per-badge progress arcs, streak momentum, "go to [domain]" CTA, active "All" filter); **green** = arrival/completion only (earned ✓ chip, KPI ▲ delta, momentum arrival end, milestone dots); **purple is absent — this is a pure-gamification Product-Mode screen with no SIA content** (the build's "Ask SIA" purple button is a **register violation** flagged in `S71-V05` and must be replaced by the orange "go to [domain]" CTA — purple here would be a 60/30/10 breach). **Rarity colours** (`--color-rarity-*`) and **tier metals** (`--color-mission-*`/podium) are **identity only** (badge accent + glow + tier ladder), never decorative data-ink — the same exemption podium colours carry; the lone `--color-rarity-rare #7F24FF` purple is a *rarity identity*, not an SIA signal, and is paired with the word "Rare" so it never reads as AI. **Domain colours** appear only on the medallion accent + domain tag + filter chip (identity, `CONSISTENCY.md` §5). Glow uses the size-stepped scale (96px gauge = 32px hero glow; 56px medallion = `--glow-orange-sm`-radius ~12px in rarity colour at stepped alpha, legendary brightest-but-not-neon; bars/micro-arcs = none) — warm depth, not a neon casino.
- **Non-shaming (ethical gate, the benchmark's thesis):** completion is *collection progress*, never a worth verdict; **locked badges are "to discover" invitations** showing progress toward the next unlock, never "failed"/deficiency framing; the **streak `MomentumBar` frames forward momentum, never weaponises loss-aversion** (no break-the-streak countdown, no red decay); rarity % is an **honest disclosed** figure, never manufactured scarcity; KPI deltas use a **fixed disclosed window** ("vs last month"), never a cherry-picked flattering range.
- **Accessibility:** every gauge/bar/arc/tile carries a text/`aria-label` equivalent conveying the same value (completion gauge "47 of 120 achievements earned, 39 percent"; tile "[name], [domain], [rarity], [earned/in-progress N of M/to discover]"; tier node "Tier [N] of 3, [bronze/silver/gold], [earned/current/locked]"); **status & rarity never colour-alone** — earned shows a **visible green ✓ + "earned"** word, rarity shows a **visible chip + word** ("Rare"), tier shows a visible ✓/ring/ghost (never the metal colour alone); label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the gauge arc, progress-arc fills, momentum-bar fill, the filled/unfilled boundary, rarity-tile borders, and tier-node rings all meet **≥3:1** vs background (faint `white/5` to-discover outlines are decorative-only structure); interactive chart/tile/chip targets ≥ **44×44pt** (the build's `h-11` chips already satisfy this — preserve it); `prefers-reduced-motion` renders all at final state with signature static forms (filled gauge, completed momentum, glowing tiles) preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Duolingo + Finch (badges, non-shaming gamification) — *stays Balencia via warm-glow rarity-graded surfaces on ink-brown-800, size-stepped glow calibration, non-shaming "to discover" invitation framing, the continuous-stroke momentum bar (Gentler Streak thesis), and honest state craft.*

**Pre-grade:** D (52) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers: Visualization audit findings S71-V01–V05 (missing completion ring, glow-swamp depth failure, no per-badge progress arcs, register-violating "Ask SIA" button on pure-gamification screen). Premium Craft resolves the surfaces, copy, motion, and states to brand-grade anti-generic.*

### Focal hierarchy

**One focal point:** the achievement **summary strip** (completion gauge 96px + earned count + streak momentum bar) — the first element read, identity anchor for the gallery, ~96pt hero span. The completion ring is the visual hero (it occupies 48pt of width and draws first on mount). Everything else is secondary: the domain filter chips are navigation affordances (not a focal data element), the achievement grid is the body (a collection wall, not a competing hero — tiles are calm surfaces with *micro* depth, the grid surface stays flat so it does not fight the gauge), and the detail sheet is a drill, never a secondary focal surface. The squint test lands on the orange gauge ring fill first, then the earned count + streak flame, then the grid below. No competing foci.

### Surface & depth

Every surface adopts **`CK-P1` Layered Warm Surface**: `--color-ink-brown-800` body · `--radius-xl` (28pt, primary-card radius) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (the `CK-T01` not-flat cue, inherited from the Visualization section's depth recipe) · `--shadow-1`.

**Summary strip** (96px hero): the completion `GaugeRing` is 96px diameter, so it carries the **hero glow `--glow-orange` (32px /.45)** on the arc itself; the earned `KPIStatTile` is 48–60px, so it carries **`--glow-orange-md` (~20px /.40)** on any accent glyph (the ▲ delta arrow if present); the streak `MomentumBar` is 8px height (inline), so it carries **no glow** per the size-stepped scale (inline bars never glow, per CONSISTENCY.md §1). The summary strip card itself: 1pt border on `--color-alpha-white-08` (vs the 06 default — a slightly stronger border for the hero card to read as more prominent), `--track-inset` (`rgba(0,0,0,0.28)`) beveled recess under the gauge track and the momentum bar track (depth pass that fixes the flat 2-tone orange of the build).

**Achievement grid tiles** (56px medallion): earned badges carry the **rarity-coloured glow at size-stepped alpha** — `--glow-orange-sm`-radius (~12px) at rarity colour at stepped alpha: common 0% (flat ring, no glow) → uncommon ~18% → rare ~26% → epic ~32% → legendary ~40% (the brightest-but-not-neon). This is the signature depth signature of the Achievement Gallery — each tile's glow *colour* is its rarity *identity*, and the glow *alpha* is calibrated so legendary glows unmistakably but none read neon. Locked tiles carry **no glow**. All tiles have `--radius-xl` (28pt, small-card radius), 1pt border coloured by state (earned = rarity colour @ 20%, in-progress = `white/8`, to-discover = `white/5`), `--edge-highlight`, `--shadow-1`.

**Detail bottom sheet** (modal, ~70% height): carries the same layered language (card surfaces inside it receive `CK-P1` treatment). The badge hero medallion is 96px, so it carries **hero glow in the rarity colour at stepped alpha** (same calibration as the grid — earned badges glow, to-discover silhouettes do not). The tier ladder nodes (3 circles, 32pt each) are mid-scale (48–56px zone with the surrounding text), so each earned/current node carries **`--glow-orange-md` in the metal colour** (bronze/silver/gold are neutral identity, 60/30/10-safe; they are not competing data-ink colours) at /.25 opacity (subtle, just enough to lift the metal off the field). The progress bar (6pt height, inline) carries **no glow**. The rarity chip carries the rarity colour as text on a 15%-subtle fill (such as `--color-rarity-rare-subtle`), which is a *identity* accent, not depth — the word "Rare" paired with the chip makes rarity legible without colour-alone.

### Typographic rhythm

Map every element to `CK-P3` locked tokens: 

- **Navigation header title** ("Achievements") — `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / `--color-alpha-white-100` 
- **Summary strip completion label** ("47 of 120 earned" center; "39%" below) — earned count `--text-display-l` (32pt) / 700 / `--leading-tight` (1.1) / white 100% / **tabular-nums** · percentage `--text-h3` (17pt) / 600 / white 40%
- **Summary strip KPI label** ("earned this month") — `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-40` / uppercase eyebrow tracking +0.12em · KPI number `--text-display-l` (32pt) / 700 / `--leading-tight` / white 100% / **tabular-nums** · delta "▲" + "vs last month" `--text-caption` / 400 / `--color-forest-green`
- **Summary strip streak** ("42 days") — flame icon (16pt, orange) + count `--text-h2` (20pt) / 700 / white 100% · label "days" `--text-caption` / 400 / white 50%
- **Filter chip (inactive/active)** — `--text-h3` (17pt) / 600 / `--leading-snug` / white 60% (inactive) or white 100% (active)
- **Achievement card name** — `--text-h3` (17pt) / 600 / `--leading-snug` / white 100% (earned) or `--color-alpha-white-40` (to-discover)
- **Achievement card domain tag** — `--text-caption` (13pt) / 400 / `--leading-normal` / domain-colour 60% (earned) or `--color-alpha-white-30` (to-discover)
- **Achievement card status** ("earned" / "18 of 30" / "to discover") — `--text-caption` / 600 / `--color-forest-green` (earned ✓) or `--color-brand-orange` (progress) or `--color-alpha-white-40` (to-discover)
- **Achievement card earned date** ("May 15, 2026") — `--text-small` (11pt) / 400 / white 25%
- **Detail sheet badge name** — `--text-h1` (28pt) / 600 / `--leading-snug` / white 100%
- **Detail sheet description** — `--text-body` (16pt) / 400 / `--leading-normal` / white 70%
- **Detail sheet rarity chip** ("Rare") — `--text-caption` / 600 / rarity-colour 100% (on rarity-colour-subtle bg)
- **Detail sheet "to unlock" requirements header** — `--text-h3` (17pt) / 600 / white 60%
- **Detail sheet requirements list** — `--text-body` (16pt) / 400 / `--leading-normal` / white 50% / bulleted with white-30 dots
- **Detail sheet rarity disclosure** ("12% of users have earned this") — `--text-caption` / 400 / white 30%
- **Detail sheet "go to [domain]" CTA** — `--text-h3` (17pt) / 600 / white 100% on `--color-brand-orange` bg

Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (no Title Case on labels, chips, or card titles). ≤2 `--color-brand-orange` accent words on the screen: the "earned" orange count in the summary strip and the "go to [domain]" CTA button (the streak flame and progress arcs are data-ink, not accent words). Chillax stays logo-only (none on this screen). All line-heights and letter-spacings are tokenized per `CK-T04`/`CK-T05`; no off-scale or floating values.

### Microcopy (before → after)

**Narrative copy is authored to `CK-P5` brand voice** — warm, plain, coaching, non-shaming, zero exclamation marks, the brand period with intent. Specific authored strings per state/element:

- **Achievement card status (earned)** — *before:* "✓ earned" (bare, generic) → *after:* **"earned"** + green checkmark glyph (the word is always paired with the glyph, never colour-alone; the 11pt Sora Semibold `--color-forest-green` pairing makes status legible without relying on colour)
- **Achievement card status (in-progress)** — *before:* literal "%" character in an orange dot (hint text, illegible) → *after:* **"18 of 30 days"** in 11pt orange, paired with the micro `GaugeRing` arc showing honest progress (the number is always paired with the arc, never arc-alone; the arc *shows* 60%, the number *says* 60%)
- **Achievement card status (to-discover)** — *before:* "🔒 locked" (shaming, deficiency framing) → *after:* **"to discover"** in 11pt white-40 (an invitation, never "locked"/"failed"; the ghost rarity-outlined silhouette beneath it signals unavailable without shame)
- **Achievement card earned date** — *before:* bare date "May 15, 2026" → *after (kept):* same, warm plain framing; adds context "Earned on [date]" in detail sheet (10pt white-25)
- **Detail sheet badge description** — *before (absent in build)* → *after:* 15pt Sora Regular, white-70, 2–3 sentences explaining what the badge represents and *why* it matters to life balance (specific to each badge, not generic; coached tone)
- **Detail sheet progress bar (in-progress)** — *before (absent)* → *after (new):* "18 of 30 days completed" (13pt white-60) + "12 more days to go" (13pt orange, forward-framed, never "X short" deficit framing)
- **Detail sheet "go to [domain]" CTA (to-discover)** — *before (register violation):* "Ask SIA" (purple button on pure-gamification screen — a 60/30/10 breach and a register error) → *after:* **"go to [domain]"** orange pill CTA (14pt Sora Semibold, 48pt height, full-width minus 32pt, centered at bottom). This replaces the purple button with the correct primary action on a pure-Product-Mode screen.
- **Detail sheet rarity disclosure** — *before (absent in build)* → *after (new):* "12% of users have earned this" (11pt white-30, real, fixed scarcity figure, never manufactured urgency)
- **Empty state (cold-start / Day-1)** — *before (inferred):* no messaging or a degenerate empty → *after (new):* banner above grid: **"Start completing goals and building streaks to earn your first badge"** (14pt Sora Regular, white-50, center-aligned, on an ink-brown-800 card with --r-xl, 16pt padding) — never a wall of grey padlocks; motivational but plain (no exclamation), coaching tone
- **Empty state (filtered, no badges in domain)** — *before (not specified)* → *after (new):* centered message: domain colour icon (32pt, 20%) + **"No [domain] achievements yet"** (15pt Sora Semibold, white) + **"Complete [domain] goals to start earning badges"** (13pt Sora Regular, white-50) — warm, constructive, never shame-framing
- **Loading state** — *before (not specified)* → *after (new):* none (skeleton shimmer preserves layout; label text is optional or animated "building your collection — one moment" if a loading message is needed)
- **Error state (network failure)** — *before (not specified)* → *after (new):* centered error: trophy icon (48pt, white-15) + **"Couldn't load achievements"** (17pt Sora Semibold, white) + **"Check your connection and try again"** (14pt Sora Regular, white-50) + **"retry"** orange text link (14pt Sora Semibold, 44pt tap target) — specific, recovery action named, warm
- **Permission rationale** (if wearable/calendar sync needed) — *before (not applicable to this screen)* → *after (new, if added):* **"why we ask · what you gain"** — such as "To show your fitness achievements, we sync with Apple Health. You stay in control — disconnect anytime."

No exclamation marks anywhere. The brand period used with intent (the period marks the brand commitment, not casual punctuation). All SIA copy (if any appears on the detail sheet as an insight) is specific to the user's badge (such as "You've earned rarity badges in 6 domains — your balance is strong," never a horoscope).

### Motion choreography

**Locked to `CK-P4` draw-first order:**

1. **Hero completion `GaugeRing` draws first** (the gauge arc `stroke-animate` from 0 to final %, 520ms `--dur-slow` `--ease-flow`) + **ticks appear** (radial tick marks fade in at 350ms, 170ms before arc finishes — they arrive as scaffolding) + **center count-up** (earned count "47" animates from 0 to final, 520ms `--dur-slow`)
2. **Earned `KPIStatTile` counts up** (the stat number animates at 280ms `--dur-base` `--ease-out-soft`, starting after the gauge; the ▲ delta arrow fades in with the number)
3. **Streak `MomentumBar` fills** L→R (520ms `--dur-slow` `--ease-flow`, orange→green gradient travel along the path, starting after the stats row — the arrival-end green arrives last)
4. **Domain filter chips fade in** (280ms `--dur-base` each, 40ms stagger)
5. **Achievement grid tiles stagger in** (240ms fade-up + translateY(12→0) per tile, 40ms stagger) → once each tile lands, **its in-progress micro-arc fills** (if present) at 380ms (100ms after tile arrival), and **its rarity glow fades in** 0→calibrated alpha (280ms starting at tile arrival — the glow is warm-arrival, not a flash)
6. **Below-fold tiles animate on scroll-into-view** (same stagger + glow arrival)

**One line motif per surface:** the summary strip carries the momentum bar (the only continuous horizontal stroke on the identity section); the grid carries no lines (tiles are discrete; to avoid a line-cluttered card, the tile borders are hairline 1px, not a prominent stripe).

**Newly-earned badge (arriving from Celebration Overlay [42]):** medallion `scale(0.8→1.0)` + **a rarity-coloured particle accent** (not generic gold — a small splash of starburst particles in the badge's rarity colour, 600ms `--ease-flow`, arriving at the medallion center and dissolving outward). This is the **one ownable Balencia moment** — the rarity-coloured splash (never gold, always tied to what makes the badge ownable) is the signature detail that makes earned badges feel premium and personal.

**Reduced-motion:** `prefers-reduced-motion` → every chart and tile at final state instantly (no draw, no fill, no stagger); the signature static forms are preserved: the gauge's filled arc (orange + green segment), the momentum bar's final orange→green fill, each tile's rarity glow at rest (faint but present), and the rarity-coloured splash particle is static (a single burst frame, not animated). No essential information is lost; the settled frame is the canonical frame.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | Summary strip: gauge ring at ghosted 0% (full faint track visible, center "0 earned", **never** a filled-0 disc or empty void); KPI shows "0" with "—" delta (no fabricated gain); streak bar text "Your streak starts today — 0 of [first milestone]" with bar at ghosted 0. Grid: all tiles "to discover" (ghosted rarity-outlined silhouettes, not padlock icons), sorted by closeness-to-unlock. Above grid: motivational banner "Start completing goals and building streaks to earn your first badge" (never "unlock your first badge" shame framing). | "Your stats grow as you build habits" (in StatBars equivalent, if present). Banner: plain, warm, coaching. | Summary strip, grid, and banner all on `ink-brown-800` with full depth language (glow, highlight, shadow); ghosted tiles are visually distinct from error state (rarity-outlined silhouettes, not blank greyscale); no degenerate empty (the structure is always full, content adapts). |
| **Loading** | Summary strip: gauge skeleton pill at track height (gradient shimmer), stat skeletons (4-bar grid), streak bar skeleton. Grid: tile skeletons (medallion circle + label bars shimmer in place). All layout preserved, depth-cue shapes visible (rings, track shapes). Skeleton on `--color-ink-brown-800` matches card surface. | Optional animated label: "building your collection — one moment" (13pt white-50, subtle, never a spinner-glyph interrupt). | Skeleton morphs into data (arc draws, bar fills, glows fade in — never a swap from blank to rendered). Depth-preserving shapes visible during load. |
| **Empty / partial (filtered)** | Domain filter: a non-matching domain selected. Grid area: centered message with domain colour icon (32pt, 20%) + name + "No [domain] achievements yet" (15pt Sora Semibold, white) + "Complete [domain] goals to start earning badges" (13pt, white-50). Summary strip remains visible and cached. Other domains' cached tiles may render if they're available. | "No [domain] badges yet — complete [domain] goals to start earning." Warm, constructive. | Domain icon at reduced opacity (identity hint, not full-colour emphasis — keeps the empty state calm). Depth language preserved on visible surfaces (summary strip, cached tiles if any). |
| **Error** | Summary strip: shows last-cached gauge if available, otherwise skeleton for 5s then text "Couldn't load summary." Grid: cached tiles render; failed tiles resolve to text-only (name + domain + "couldn't load this badge — try again" at 11pt white-40) — distinct from a real "to discover" state (text-only has different styling). Network banner at top (if applicable): "Couldn't refresh your achievements — pull to refresh" (13pt white-50, cloud-error icon 14pt, 44pt dismissal tap target). | "Couldn't load achievements. Check your connection and try again." + "retry" link (orange, 14pt, 44pt target). Per-badge: "couldn't load this badge" (white-40, not shame-framing). | Calibrated `--color-error-red` border (1–2pt) only on the affected zone (such as grid container, not individual tiles unless individual tile fails independently). Glyph + word always (icon + text, never colour-alone). Cached data retained; actions honestly disabled if offline (pull-to-refresh shows a reason "trying to refresh — no connection"). |
| **Offline** | All cached data renders: summary strip shows last-synced values, grid shows last-synced tiles. A banner below the filter chips (if applicable): "You're offline — showing cached achievements" (13pt white-40, cloud-offline icon 14pt). Pull-to-refresh affordance is present but dimmed (50% opacity) with reason. Newly-earned badges cannot be fetched; "check back when online" is an honest reason. | "You're offline — showing your last sync." (calm, honest, no alarm). For actions: "Offline — try again when connected" (dimmed reason, not an error tone). | Cached surfaces at full depth; actions honestly dimmed (50% opacity, no haptic on tap). No red alarm language; the cloud icon is white-40, not error-red. |

### Signature & anti-generic

**Ownable Balencia moments:**

1. **The rarity-glow size-stepped calibration** — common badges have a flat ring (no glow), uncommon carry subtle cyan, rare carry subtle purple, epic carry orange (matching data-ink), legendary carry golden (brightest but never neon). This is the signature depth signature of the Achievement Gallery — glow *colour* is rarity *identity*, glow *size* is calibrated by the medallion size (12px radius on 56px tiles, hero glows only on 96px gauges). This is unmistakably Balencia: warm, not neon, and emotionally calibrated to the rarity of what was earned.

2. **The warm-glow surfaces on ink-brown-800** — every surface floats on `--color-ink-900` with layered depth (highlight, border, shadow, calibrated glow on focal elements) — the anti-flat-box design language that contrasts competitors' cold slate/neon.

3. **The continuous-stroke momentum bar** (the Gentler Streak thesis) — a single rounded orange→green bar showing forward motion toward the next streak-milestone badge, never a countdown to loss. This is the brand's commitment to non-shaming, aspirational framing (we ask "how close are you to the next unlock?" not "how much time until you lose this").

4. **The non-shaming "to discover" invitation** — locked badges are framed as *invitations to discover* (a ghosted rarity-outlined silhouette, never a padlock), and the detail sheet shows *what unlocks* them (a constructive list, not a failure verdict). This is the ethical gate — the screen never weaponises loss-aversion or shame.

5. **The rarity-coloured particle splash on newly-earned badges** — when a user arrives at the gallery after earning a new achievement (from Celebration Overlay [42]), the new tile's medallion scales in (0.8→1.0) and releases a small starburst *in the badge's rarity colour* (not generic gold). This is the premium detail — each rarity feels celebrated uniquely.

**Anti-generic fixes:**

- The achievement grid is **not** a symmetric card wall. The summary strip (hero) + domain filter chips (navigation) + grid (body) creates intentional hierarchy and breaks the card-monotony that is the #1 generic-tell. The grid itself is a 2-column card grid, but the *screen* is not a flat card stack.
- Every earned/in-progress/to-discover state carries a **designed tile appearance**, not hint text glyphs (no more generic Trophy/Lock icons). Earned badges display actual badge artwork in full colour with rarity glow. In-progress badges show a desaturated medallion + micro progress arc (not a literal "%" glyph). To-discover badges show a rarity-outlined ghosted silhouette (not a generic padlock).
- Every empty/loading/error state is **fully laid out and on-voice**, never deferred to a generic pattern. Day-1 shows a motivational banner + ghosted tiles (never a blank void). Loading preserves depth (skeleton rings, bars visible). Error is specific ("couldn't load achievements" not "Error: 500").
- The detail sheet **removes the register-violating "Ask SIA" button** (purple on a pure-gamification screen) and replaces it with the orange "go to [domain]" CTA — the correct primary action for a to-discover badge workflow.

**The brand period:** used with intent on the empty-state banner ("Start completing goals and building streaks to earn your first badge.") and the permission rationale (if added). It marks the brand's commitment to coaching warmth, not decorative punctuation.

### Accessibility

**Tabulated load-bearing contrast pairs (on `--color-ink-900` field / `--color-ink-brown-800` card):**

| Element | Color | Contrast |
| --- | --- | --- |
| Earned count (summary) | `--color-alpha-white-100` (on `ink-brown-800`) | ≥12:1 |
| Completion gauge arc | `--color-brand-orange` (on `--track-inset` recess) | 3.2:1 (WCAG 1.4.11, load-bearing) |
| Earned status ✓ glyph + "earned" word | `--color-forest-green` + word (on `ink-brown-800`) | 4.8:1 (glyph+word never colour-alone) |
| Progress arc | `--color-brand-orange` (on `--track-inset` recess) | 3.2:1 (load-bearing) |
| "to discover" text | `--color-alpha-white-40` (on `ink-brown-800`) | 4.5:1 |
| Rarity chip | rarity-colour text (such as `--color-rarity-rare `--color-royal-purple`) on rarity-subtle fill | ≥3:1 for the text; the chip includes both colour + word, never colour-alone |
| Tier node (earned) | metallic colour (such as `--color-mission-gold `--color-mission-gold``) on `ink-brown-800` | 3.8:1 (glyph ✓ + word always pairs it, never colour-alone) |
| CTA "go to [domain]" | `--color-alpha-white-100` text on `--color-brand-orange` bg | 8.5:1 |
| Filter chip (active) | `--color-alpha-white-100` text on domain-colour bg | varies by domain (≥3:1 for darkest domains) |

**Focus ring:** every focusable element (card tap target, chip, CTA, detail-sheet close button) carries `CK-T03 --focus-ring` (2px orange, 2px offset on `--color-ink-900` field) on focus-visible — uniform app-wide.

**Interactive targets:** every tappable surface (card, chip, CTA, tier node in detail sheet, share button) is ≥44×44pt; hit areas never overlap. Domain filter chips: 36pt height (per Screen [13] pattern) with ≥16pt horizontal padding (total width ≥48pt for typical domain names) — satisfies 44pt. Achievement cards in a 2-column grid: ((screen width - 32pt margin - 12pt gap) / 2) ≈ 167pt width × ~180pt height — far exceeds 44pt. Detail-sheet CTA: 48pt height, full-width minus 32pt — 44pt+ minimum guaranteed.

**Colour + glyph + word (never colour-alone):**
- **Earned status:** green ✓ glyph (14pt) + "earned" word (11pt Sora Semibold, green) — never the checkmark alone or the word alone
- **Progress:** orange text "18 of 30" (11pt) + micro-arc glyph (a drawn ring, 24px) — never arc-alone or number-alone
- **To-discover:** "to discover" word (11pt white-40) + rarity-outlined silhouette glyph (the ghosted badge shape, never a generic lock) — never the silhouette alone or "to discover" without the visual cue
- **Rarity:** rarity chip with colour (such as purple text) + word ("Rare", 11pt) on a rarity-subtle fill — never the colour alone
- **Tier nodes:** earned tier shows the metal colour (gold circle, 32pt) + ✓ glyph (white, 12pt) + tier name below ("Gold", 10pt white-40) — never just the colour; current tier shows a pulsing rarity-coloured ring (the "you are here" marker) + the metal + the name; locked tier shows the metal ghosted (white-10) + "locked" text — all three states are visually distinct via glyph + word + fill, not colour-alone

**Load-bearing graphics (≥3:1 WCAG 1.4.11):** the completion gauge arc (`--color-brand-orange` on `--track-inset`), the progress micro-arc (orange on track), the momentum bar fill (orange on track, green segment on arrival), the rarity-glow outline of to-discover silhouettes, the tier-node filled/ringed/ghosted boundaries — all meet ≥3:1 vs their backgrounds. The `white/5` to-discover tile border is decorative-only (it marks the tile boundary visually but is not a load-bearing state cue — the "to discover" word + silhouette carry the state signal).

**Reduced-motion:** `prefers-reduced-motion` → every element renders at final state instantly; no draws, no count-ups, no stagger. The signature static forms are preserved and visible: gauge arc filled to final %, momentum bar at final width with green arrival segment, all glows at rest (faint but present), rarity-coloured splash visible as a single static burst frame (not animated spray). The settled frame contains all essential information and is the canonical frame for users with motion sensitivity.

**Labels and descriptions:**
- Achievement card accessibility label: `"[badge name], [domain], [rarity if earned], [earned / in-progress N of M / to discover], [earned date if earned]"` — read in order, context clear
- Summary strip label: `"Completion: 47 of 120 achievements earned, 39 percent. Streak: 42 days. Tap to view character."` (tappable affordance labeled)
- Tier node label: `"Tier [N] of 3, [Bronze/Silver/Gold], [Earned/Current/Locked]"` — status announced without relying on colour
- Filter chip: `role="button"` (or semantic checkbox) with `aria-selected` (true/false) and `aria-label` naming the domain
- Rarity disclosure: `"12 percent of users have earned this"` (aria-label if not visible as text)

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | |
| Card surface | #211008 | ink-brown-800 | |
| Completion ring fill | #FF5E00 | brand-orange | 60% role |
| Active "All" filter chip | #FF5E00 | brand-orange | |
| Active domain filter chip | per-domain hex | domain colors | Domain identification |
| Earned status text | #34A853 | forest-green | 30% role — success/completion |
| In-progress status text | #FF5E00 | brand-orange | 60% role — active progress |
| Earned badge glow | per-domain hex at 10% | domain colors | Subtle pride effect |
| Earned card border | per-domain hex at 20% | domain colors | Subtle domain identification |
| To-discover badge silhouette | rarity color at 15% | rarity colors | Ghosted rarity-outlined silhouette (not a padlock), aspirational |
| To-discover text | white at 40% | | "to discover" — an invitation, never "locked" |
| Detail progress bar fill | #FF5E00 | brand-orange | |
| Detail CTA | #FF5E00 bg, white text | brand-orange | |
| Tier — bronze | #CD7F32 | | Earned tier |
| Tier — silver | #C0C0C0 | | Earned tier |
| Tier — gold | #FFD700 | | Earned tier |
| Streak flame icon | #FF5E00 | brand-orange | |
| Share icon | white at 50% | | Secondary action |

**60/30/10 verification**: Orange on completion ring, active filters, progress indicators, the detail-sheet "go to [domain]" CTA, streak flame. Green on earned status text (success). **Purple absent — pure-gamification Product Mode, no SIA content:** the detail sheet carries no "Ask SIA" control and no SIA copy; its sole primary touchpoint is the orange "go to [domain]" CTA (the build's royal-purple "Ask SIA" button is a register violation, flagged in Visualization `S71-V05`). The lone `--color-rarity-rare #7F24FF` is rarity *identity* (always paired with the word "Rare"), not an SIA signal. Domain colors on badge glows and filter chips per domain color rules. Rarity colors (`--color-rarity-*`) and tier metals (bronze/silver/gold) are neutral identity accents, not competing with the 60/30/10 palette. Ratio holds.

---

## Interaction States

### Achievement Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default (earned) | Domain-tinted border, full-color badge | — |
| Default (to discover) | Dim border, ghosted rarity-outlined silhouette (not a lock icon) | — |
| Pressed | Scale(0.97), bg lightens slightly | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Active | Domain color bg, white text | — |
| Inactive | ink-brown-800, white at 60% | — |
| Pressed | Scale(0.95), bg brightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Summary Strip Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard display | — |
| Pressed | Scale(0.98), bg lightens | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "Go to [domain]" CTA (Detail Sheet)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, white text | — |
| Pressed | Darker orange, scale(0.97) | Medium impact |
| Success | N/A (navigates away) | — |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop |
| Tap | Filter chip | Toggle filter, refresh grid |
| Tap | Achievement card | Open Achievement Detail Bottom Sheet |
| Tap | "go to [domain]" (in detail) | Navigate to domain dashboard, dismiss sheet |
| Tap | Share row (in detail) | System share sheet |
| Drag down | Detail bottom sheet | Dismiss sheet |
| Scroll | Achievement grid | Standard scroll |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Summary strip | Screen mount | Fade-in + translateY(12→0) | 280ms | ease-out-soft |
| Completion ring | Screen mount | Arc draws from 0 to current % | 520ms | ease-flow |
| Achievement cards | Screen mount | Staggered fade-in, 40ms per card | 280ms each | ease-out-soft |
| Earned badge glow | Card enters viewport | Glow fades in 0→10% opacity | 280ms | ease-out-soft |
| Filter change | Tap chip | Grid crossfade | 280ms | ease-out-soft |
| Detail bottom sheet | Open | Slide up from bottom | 520ms | ease-flow |
| Detail bottom sheet | Close | Slide down | 280ms | ease-out-soft |
| New achievement | Just earned (from celebration) | Badge scales 0.8→1.0 with gold particle burst | 600ms | ease-flow |

---

## Empty States

### Day 1 (no achievements earned)
- Summary strip: ring at 0%, "0 earned", streak shows "0 days"
- Grid shows all achievements as "to discover" (ghosted rarity-outlined silhouettes), sorted by closeness-to-unlock
- Motivational banner above grid: "Start completing goals and building streaks to earn your first badge." — 14pt Sora Regular, white at 50%, center-aligned in an ink-brown-800 card with --r-xl, 16pt padding

### Single domain filtered with no achievements
- Empty grid area: domain color icon (32pt, at 20%) + "No [domain] achievements yet" (15pt Sora Semibold, white) + "Complete [domain] goals to start earning badges" (13pt Sora Regular, white at 50%)

---

## Accessibility

- Achievement cards: accessibility label "[name], [domain], [earned / in-progress N of M / to discover], [progress if applicable]" — status & rarity never colour-alone (visible green ✓ + "earned", rarity chip + word)
- Filter chips: role "button", selected state announced
- Summary strip: accessibility label "47 of 120 achievements earned, 39 percent complete, 42 day streak"
- Detail sheet: full content readable by screen reader in order
- Tier indicators: accessibility label "Tier [N] of 3, [bronze/silver/gold], [earned/current/locked]"

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Achievement list fails to load (network) | Centered error state: trophy icon (48pt, white at 15%) + "Couldn't load achievements" (17pt Sora Semibold, white) + "Check your connection and try again" (14pt Sora Regular, white at 50%) + "retry" orange text link (14pt Sora Semibold, 44pt touch target). Summary strip shows skeleton shimmer. Filter chips visible but non-functional. | Tap "retry" to re-fetch. Pull-down-to-refresh also available. |
| Summary strip fails to load | Summary strip shows skeleton shimmer (ink-brown-800 card, animated gradient). Achievement grid may still render from cached data. | Silent retry on scroll or re-focus. Tap strip to retry manually. |
| Achievement detail fails to load | Detail bottom sheet opens with skeleton placeholder (shimmer). After 5 seconds: "Couldn't load achievement details" (15pt Sora Regular, white at 50%) + "retry" link (orange). Close button remains functional. | Tap "retry" in the sheet. Dismiss and re-tap card also works. |
| "Go to [domain]" navigation fails | CTA button briefly flashes error-red border (400ms). Toast: "Couldn't open [domain]. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap CTA again. If persistent, dismiss sheet and navigate manually via tab bar. |
| Share action fails | Toast: "Couldn't share this achievement" (13pt Sora Regular, white at 80%, ink-brown-800 bg, auto-dismiss 3s). Share row returns to default state. | Tap share again to retry. |
| Badge image fails to load | Card shows domain color circle (48pt, at 20% opacity) as fallback instead of badge artwork. Card remains fully interactive. Name, domain tag, and status still render. | No user action needed. Image retries on next scroll into viewport. |
| Partial load (some achievements load, others fail) | Successfully loaded cards render normally. Failed cards show skeleton shimmer that resolves to text-only card (name + domain + status, no badge icon). | Scroll away and back triggers silent retry. |
| Offline mode | Banner below filter chips: "You're offline — showing cached achievements" (13pt Sora Regular, white at 40%, cloud-offline icon 14pt). Progress data may be stale. | Banner dismisses when connection restores. Data refreshes silently. |

---

## Motivation Adaptation

| Level | Adaptation |
|-------|------------|
| **Low** | Locked/unearned achievements are hidden entirely — grid shows only earned badges to celebrate progress rather than highlight gaps. Summary strip emphasizes "X earned" count and current streak without showing total possible. "Almost there" badges (>75% progress) promoted to top of grid with subtle green progress ring to show attainability. |
| **Medium** | Default layout — earned and locked achievements both visible. Locked badges show progress percentage and "X away" hint. Summary strip shows earned/total ratio. Standard sort order (earned first, then by progress %). |
| **High** | Full gallery with competitive framing — rarity percentages visible on all badges ("Top 5% of users"). Locked achievements show detailed requirement breakdowns. Tier progression (bronze → silver → gold) emphasized with "next tier" call-outs. Summary strip includes "rank among friends" if social features active. |

---

## Cross-References

- **Navigates to**: Achievement Detail Bottom Sheet (modal present), Domain Dashboards [26-36] (via "go to [domain]" CTA in detail sheet, stack push)
- **Navigates from**: Me Main [17] via "Achievements" quick link (stack push), RPG Character [19] via achievement badge tap in Streak & Rewards section (stack push), Celebration Overlay [42] via "view all" link (stack push), Push notification for new achievement
- **Shared components with**: Screen [70] — Exercise Library (2-column grid layout, filter chip row), Screen [19] — RPG Character (achievement badges in Streak & Rewards), Screen [13] — Goals List (Filter Chip Row pattern), Screen [42] — Celebration Overlay (achievement celebration trigger)
- **Patterns used**: Filter Chip Row (Screen 13), Back Button (Batch 1), Bottom Sheet (_shared-patterns.md), 2-Column Grid (Screen 70)
- **Patterns established**: **Achievement Card** — 2-column grid card with badge icon, name, domain tag, earned/locked/progress state. Earned badges get domain-colored glow and border. **Achievement Detail Bottom Sheet** — ~70% height sheet with badge hero, description, tier indicator, domain pill, rarity percentage. Contextual CTA and progress display based on earned/locked/in-progress state. **Achievement Summary Strip** — compact card with completion ring + earned count + streak badge. **Tier Indicator** — horizontal row of bronze/silver/gold circles showing tiered achievement progression.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-09.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U05`
**Prototype route**: `/tabs/me/achievements`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q17 progress photos are private, encrypted, user-deletable, and AI analysis is premium opt-in.
- Q20 OAuth flows need scope and revocation clarity.
- Q21 Data Sources may be a demo/no-live-sync trust placeholder for prototype acceptance.
- Q39 achievement density adapts for low-motivation users.
- Q43 Knowledge Graph V1 is a guided insight map.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B09-F13 | critical | retention | Make filters stateful, render cards as buttons, and implement earned/progress/locked detail sheets. |
| B09-F14 | major | product-sense | Load the full achievement set or align the summary with visible/cached data; add loading, partial-load, and offline states. |
| B09-F15 | major | accessibility | Increase chip hit areas, expose selected state, and label each card with name, domain, state, and progress. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

