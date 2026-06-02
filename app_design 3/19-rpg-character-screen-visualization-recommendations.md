# RPG Character — Premium Visualization Recommendations

> Companion to `19-rpg-character-screen.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (54) → specced-target A− (86)** under the revised 10-dimension rubric. **Mints no new primitive** — composes `ConstellationRadar` (VK-005), `GaugeRing` (VK-002), the Living Line (VK-016), and `XPBar`/`StatBars` from the existing kit.

## Context

The RPG Character screen is positioned in the spec as the user's **"Call of Duty profile card"** — a premium, mature, *celebratory* character sheet. The cluster benchmark is **Finch + Habitica**: life-stats done as a satisfying game profile. The job here is **not** to copy Habitica's flat pixel-art stat bars or Finch's cute-but-shallow rings — those would either look cartoonish (the spec explicitly forbids cartoonish) or read as shallow. The job is to render the *life-stat profile* with the warmth and instrument-precision the rest of Balencia owns, using **Balencia's own** signature devices the brand book already defines:

- **The Constellation Radar** (`Design-System-Overview.md` §11): the 10-domain life profile as a "constellation" — glowing star dots, a drawn polygon, Life Power as the central **sun**. This is *the* reason a character sheet beats a stat list: it shows the cross-domain **shape** (balanced vs. spiky) at a glance. No competitor's profile screen shows whole-life shape this way.
- **The Living Line** (§8/§11): "every chart is the line" — the one continuous orange→green stroke that *draws itself* and arrives green. Spent here on the **overall XP progression bar** (the single most important "how far have I come?" signal), so progression reads as a path, not a flat fill.
- **Warm-glow depth**: calibrated orange glow on warm `ink-brown-800`, vs. competitors' flat slate — the ownable "carved instrument" feel that makes 0–99 stat gauges look premium rather than like a game HUD.

**Today's flatness — the honest read.** This screen currently has **zero focal visualization**. Worse than Home (which at least has rings): the cross-domain **shape that is the entire thesis of a character sheet is never drawn**. The `RadarChart` component exists but is **not even mounted here** (imported only on Home/Life Areas [12]/[16]); Life Power is plain inline orange text; the 10 domains are a number + a **flat 3pt domain-colour fill bar**; the overall XP is a flat single-tone orange fill (no depth); the stats row and mission history are text. The screen reads as a *spreadsheet of stats*, not a profile card. The data is rich and already present (`domainStats` with stat/level/XP per domain, `domainProgress` with honest `weekDelta`/`monthDelta`, `user.lifePower = 487`) — **no new data is needed**. The gap is purely: (1) the radar hero is missing, (2) depth tokens don't exist yet, (3) flat bars/rings where gauges and Living Lines belong.

Decisions locked with the program: **distinct Balencia signature** (not a Habitica/Finch clone); **spec-first** (read-only); premium depth inside 60/30/10; non-shaming is **load-bearing** (every stat is *growth state*, never a verdict on worth).

---

## What reads premium — and how we do it *our* way (not Habitica/Finch's)

| Premium quality | Benchmark's device | **Balencia's ownable equivalent** |
|---|---|---|
| A focal point that shows *who you are* | Habitica avatar + flat stat bars / Finch pet | **Constellation Radar** hero (Life Power sun + 10-domain *shape*) — whole-life, drawn |
| A satisfying 0–99 stat readout | Flat HP/MP bars | `GaugeRing` mini per domain — arc-gradient, glow-by-size, domain-coloured instrument |
| Progression you can feel | A linear XP bar | **Living-Line XP** — continuous orange→green, *arrives* green at level-up |
| Layered depth | Flat game-UI panels | **Warm** `--glow-orange` on `ink-brown-800` + inset tracks |
| Honest "how am I trending" | Streak number | `KPIStatTile` deltas over a fixed, disclosed window |

**Why a radar over more bars:** ten stat bars (Habitica's instinct) is *over-resolution* — a wall of equally-weighted bars with no hero, which the rubric penalises in both Data-resolution and Hero. One drawn radar gives the screen its hero **and** compresses ten numbers into a single legible shape; the per-domain gauges then live *below* it as the secondary tier. Calm hierarchy beats a maximalist stat wall.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex. `--glow-orange/green/purple` (32px) **already exist** in `globals.css`; the size-stepped and gradient tokens do **not** yet:

| Token | Intended value | Use here |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient (named once) |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | gauge arc depth (domain-tinted analogue per domain) |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | the overall XP **Living Line** (effort→arrival) |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed gauge/bar track (carved depth) |
| `--glow-orange-md` / `--glow-orange-sm` | `0 0 20px …0.40` / `0 0 12px …0.35` | size-stepped glow (48px gauges / radar star dots) |
| `--stroke-thin/base/bold` | `2 / 4 / 8px` (§8) | stroke widths (XPBar 2px, Living Line 8px) |

The hero radar's `--glow-orange` (32px) is correct **only** because it sits on a 220–280pt hero. The 48px domain gauges use `--glow-orange-md` (~20px); a 32px glow on a 48px gauge would swamp it — a depth *failure*, not depth.

---

## The five recommendations

Ordered by leverage. R1 is the missing hero (biggest jump); R2 lifts every domain card; R3 is the signature; R4–R5 finish the supporting tier and the drill-down.

### R1 — `LifeBalanceCard` (RPG variant): the Constellation Radar hero (the differentiator)

A **new focal card inserted between the Character Card and the Life Power display**. It *absorbs* the lone inline Life Power number into the radar's **sun hub** — so we add a hero without adding a competing number.

```
┌───────────────────────────────────────┐
│              ✦  FIT                     │
│         ✦         ◇                     │  ← 220–280pt radar, DRAWS itself
│      MED ◇    ╱☀☀☀╲    ◇ SLP           │    (stroke-dashoffset, not scale)
│         ◇   ☀  487  ☀   ◇              │    Life Power = central "sun" hub
│      ✦    ╲ ☀☀☀ ╱    ✦                 │    ☀ = --glow-orange (hero size only)
│         REL  ◇      ◇  CAR             │    ✦/◇ = domain star dots (--color-domain-*)
│              ✦  ✦                       │      + faint --glow-orange-sm
│   "dedicated explorer"                  │  ← rank title under hub
│   ⌁ Strongest in Fitness;               │  ← one-line read (warmth, non-shaming)
│     Meditation is room to grow.         │     weakest framed as a PROMPT, not a verdict
└───────────────────────────────────────┘
```

- **Radar (hero variant 220–280pt):** ⚠️ the current `RadarChart` is hardcoded **280×280, flat 15% orange (`fillOpacity 0.15`), no center hub, plain `r=4` dots, and `radar-grow` *scale* animation** — *and it is not mounted on this screen at all today.* This card needs the `VK-005` depth upgrade **and** first placement here: radial fill `fillOpacity 0.25→0.08`, stroke `--color-brand-orange` + `--glow-orange`, **star** domain dots (`--color-domain-*` + `--glow-orange-sm`), faint radial backplate, 5 rings (20/40/60/80/99 — 99 is the domain-stat max, intentional), and a **center "sun" hub** showing Life Power (`487`, `text-display` + `--glow-orange`).
- **Motion — draws itself:** the polygon uses `stroke-draw` (`--dur-flow` 1200ms / `--ease-flow`), **replacing** `radar-grow` *scale* (which violates §8 "draw the line, don't scale it in"). Dots stagger (`radar-dot` 420+index·40ms); hub counts up 520ms; radar draws **before** the domain grid.
- **The hub doubles as Life Power:** the screen's separate inline Life Power display is **removed** — its number lives in the sun hub (one number, premium home). The stats row still echoes Life Power as a `KPIStatTile` (a second, reinforcing read is fine; a second *competing hero* is not).
- **Star dots double as the colour key:** each domain's star sits at its axis, so the radar *is* the legend the 10-card grid below reuses — no separate key needed.
- **Micro-interaction:** tap an axis/star → that domain's Sub-Stats sheet (same target as its grid card); tap the hub → expand to the full 10-domain ranked breakdown in place; long-press a spoke → scrub that domain's stat. Targets ≥ 44×44.
- **States:** Day-1 → **"calibrating — building your character"** (faint full polygon + the hub label instead of a number; **never** a collapsed point — the Day-1 grid is explicitly "a canvas to fill," and the radar must honour that); partial (1–2 domains active) → **ghosted/dashed spokes pulled to the inner rings** for inactive domains (no-data ≠ a real 0); loading → depth-preserving skeleton (rings/spokes/hub frame visible) that morphs into the drawn fill.
- **Warmth / non-shaming:** the one-line read frames the weakest domain as a **prompt** ("Meditation is room to grow"), never "you're failing at Meditation." Life Power is *growth state*, not a worth score.
- **Data:** `domainStats[].stat`, `user.lifePower`, `user.title` (`mock.ts`).

**Why this over more stat bars:** a radar gives the screen its hero *and* its cross-domain shape in one drawn object; ten bars would be a wall with no focal point. This is unmistakably Balencia and structurally something Habitica/Finch profiles don't show.

### R2 — Domain Skill cards: `GaugeRing` mini + domain XP bar

Each of the 10 domain cards keeps its compact layout but upgrades its two flat elements.

```
  ┌─────────┐         ┌─────────┐
  │ ● Fit   │         │ ● Med   │   ← domain dot + name (identity, never colour-alone)
  │  ╭──╮   │         │  ╭──╮   │
  │ ( 72 )  │  →      │ (  39)  │   ← GaugeRing mini 48px, DOMAIN-coloured arc
  │  ╰──╯   │         │  ╰──╯   │     + --grad-orange analogue + --glow-orange-md (~20px)
  │ Lv.12   │         │ Lv.3    │     + --track-inset bevel; score in centre (count-up)
  │ ▰▰▰▱▱   │         │ ▰▱▱▱▱   │   ← domain XPBar (currentXP/nextLevelXP), 2px pill
  └─────────┘         └─────────┘
```

- **GaugeRing mini (48px, `domain` colour mode):** the 0–99 stat is the arc value. ⚠️ `ProgressRing` is locked to `36 | 48 | 96`, **flat 2-tone, no domain mode, no gradient, no inset, no glow**. GaugeRing adds: arc-following gradient (domain-tinted `--grad-orange` analogue via **conic-mask** — an SVG `linearGradient` can't sweep the arc; "gradient stroke" is not a one-liner), `--track-inset` beveled track, and **`--glow-orange-md` (~20px)** calibrated to 48px (NOT the 32px `--glow-orange`, which swamps a card gauge). Score in centre (`text-h2`, count-up).
- **Domain XP bar:** the flat 3pt fill becomes `XPBar` (2px pill, track `--color-alpha-white-08`, fill = domain colour, value-vs-target `currentXP/nextLevelXP`). Stays a flat domain bar per-card — the **overall** XP bar (R3) carries the Living-Line treatment so the ten cards don't each sprout a competing line (§8 one line per surface).
- **Motion:** gauges fill 0→score (`ring-animate`, 520ms) on scroll-into-view, staggered 40ms/card after the radar; XP bars rise 100ms after their card.
- **States:** loading → gauge + bar skeleton (track visible); Lv.0 / 0-activity → faint empty gauge + empty bar, dimmed, still tappable (aspirational, never an error or a red fail).
- **Non-shaming:** a low gauge reads as "room to grow," echoing the radar — never a red/fail colour.

### R3 — Overall XP: the Living-Line progression (the signature, spent where it matters)

The Character Card's overall XP bar is re-based on the **Living Line** — the single most important "how far have I come?" signal, so it earns the identity device.

```
CHARACTER CARD
  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱        ← one continuous orange→green fill (--grad-progress)
  2,450 / 5,809 XP to level 16                arrives GREEN as the next level nears
```

- One continuous rounded bar (radius-pill, 8px, track `--color-alpha-white-08`), filling **orange → green** (`--grad-progress` **(mint)**) — **not** a flat single-tone orange fill (today's), and **not** segmented (§8 "do not break the line into fragments").
- **Level-up celebration** becomes the line *completing* its draw to green at 100% — the arrival *is* the celebration (replaces the current green-flash hack with the on-brand signature).
- This is the screen's **one** Living-Line surface (§8 budget): the overall progression. Card XP bars (R2) stay flat domain fills.
- **Motion:** fills 0→current% (520ms / `--ease-flow`), 200ms after the card, as today.
- **Non-shaming:** frames forward momentum to the next level; a low bar reads as "early in this level," never failure; no countdown weaponises loss.

### R4 — Stats summary: `KPIStatTile` row (honest deltas, kept text-led)

The 4-cell row (streak · missions done · active missions · Life Power) adopts `KPIStatTile`: label (uppercase `white/40`, +0.12em) + number (`text-h2`, count-up 280ms) + an **honest delta arrow** where a delta is meaningful (streak ▲ vs last week; Life Power ▲ from `weekDelta`) over a **fixed, disclosed window** (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`).

```
┌────────┬────────┬────────┬────────┐
│ STREAK │ DONE   │ ACTIVE │ POWER  │  ← label (white/40, +0.12em)
│  42 ▲  │  12    │   5    │ 487 ▲  │  ← number (text-h2) + honest delta arrow
│ +3 wk  │        │        │ +9 wk  │     fixed disclosed window
└────────┴────────┴────────┴────────┘
```

- Kept **deliberately text-led** — these are scalars, not series; a chart here would be over-resolution and would create a second hero. Life Power echoes the radar hub (reinforcing, not competing).
- **Non-shaming / honest:** a ▼ delta is muted `white/40`, never alarming red; the window is fixed (`weekDelta` from `domainProgress`), never cherry-picked. (VK-008.)

### R5 — Domain Sub-Stats sheet: `StatBars`

In the Sub-Stats bottom sheet, the 3–5 sub-stat fill bars adopt `StatBars` (the `MacroBar`/`XPBar` family): domain-coloured value-vs-target bars (6pt, track `--color-alpha-white-08`, rounded), with the existing **tier word** ("Developing/Proficient/Advanced/Mastery…") kept as the **visible label** beside each — status never rides colour alone. The sheet header score reuses the **same `GaugeRing` mini** as the card that opened it (kit consistency — same data shape, same primitive). Bars rise 0→value on sheet-open (520ms).

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 Constellation Radar hero | `RadarChart`, `domainStats`, `user.lifePower`, `user.title` | `src/components/charts/RadarChart.tsx`, `src/data/mock.ts` | hub + hero resize + **draw** (not scale) + first placement on this route (VK-005) |
| R2 GaugeRing minis | `ProgressRing`, `DomainSkillCard`, `domainStats` | `src/components/screens/ProgressRing.tsx`, `src/components/screens/DomainSkillCard.tsx` | `domain` colour mode + arc gradient (conic) + glow-by-size + inset (VK-002, VK-017) |
| R3 Living-Line XP | overall XP bar in `CharacterCard`, `user.currentLevelXP/nextLevelXP` | `src/app/tabs/me/rpg/page.tsx`, `src/components/screens/XPBar.tsx` | continuous orange→green fill (VK-016, VK-017) |
| R4 KPIStatTile row | `StatTile` / stats row, `domainProgress[].weekDelta` | `src/components/screens/StatTile.tsx`, `src/data/mock.ts` | extract `KPIStatTile` + honest delta (VK-008) |
| R5 Sub-stat StatBars | sub-stat bars in the bottom sheet | `src/app/tabs/me/rpg/page.tsx`, `src/components/domain/MacroBar.tsx` | StatBars (MacroBar/XPBar family at CONSISTENCY params) |
| Depth tokens | `--grad-*`, `--track-inset`, `--glow-*-sm/md`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates: radar fill/stroke, Life-Power sun glow, overall XP Living-Line's effort segment, level diamond, links.
- **Green (30%)** for arrival only: XP Living-Line's near-level-up segment, mission checkmarks + earned-XP text, positive `KPIStatTile` deltas, level-up.
- **Purple (10%)** is **absent — and that is correct.** This is a pure stats display with **no SIA/AI content**: no purple appears, and **no projection series** appears (the dashed-purple projection is on-brand only where SIA forecasts — there is no forecast here; adding one would be a brand error). The `60/30/10 verification` block in the spec already states this.
- **Domain colours** for identity only: radar star dots, the 10 domain `GaugeRing` arcs, domain XP bars, sub-stat bars, mission domain dots — never decorative palette. The freeze-blue snowflake stays a deliberate frost accent (streak-freeze affordance), not a data colour.
- **Glow** uses the calibrated **size-stepped** scale — `--glow-orange` (32px) on the hero radar only; `--glow-orange-md` (~20px) on 48px gauges; `--glow-orange-sm` on radar star dots. Premium warm depth, not neon.
- **Non-shaming (ethical gate):** every stat is *growth state*, never a verdict on worth; the weakest domain is a constructive prompt; a low gauge/bar reads as "room to grow"; deltas use an honest fixed window; no streak/countdown weaponises loss-aversion.
- **Accessibility:** text/aria equivalents on radar + every gauge (centre score); visible non-colour signs everywhere (domain name + dot, tier word, delta arrow, checkmark); WCAG 1.4.11 ≥3:1 on load-bearing radar polygon/star dots, gauge arcs, XP Living-Line, filled/unfilled boundaries (white/5 radar rings decorative-only); ≥44×44 targets; reduced-motion → final state with the radar's drawn polygon + the Living-Line's static form preserved.

---

## Phasing (when we move to build)

1. **VK-017 tokens** — mint the depth tokens first (everything below depends on them).
2. **R1 Constellation Radar hero** — the missing focal viz; the single biggest perceived-quality jump on this screen.
3. **R2 GaugeRing minis** — depth-upgrade the 10 domain cards (lifts the densest zone; reuses the GaugeRing work from Home [12]).
4. **R3 Living-Line XP** — the progression signature + level-up arrival.
5. **R4 KPIStatTile row + R5 sub-stat StatBars** — finish the supporting tier and the drill-down.

Each is independently shippable and verifiable. R2's GaugeRing and R3's Living Line are shared with Home [12]'s viz-build — build once, reuse.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/tabs/me/rpg`, screenshot before/after; verify the **radar is now mounted and draws itself** (not scales, not absent), the Life-Power number lives in the sun hub, each domain card shows a domain-coloured `GaugeRing` (not a flat number), the overall XP bar is one continuous orange→green Living Line, and the stats row carries honest delta arrows.
- Confirm **cold-start** (radar "calibrating," gauges empty tracks, never a collapsed point), **partial** (ghosted/dashed inactive spokes, dimmed gauges), **loading** (depth-preserving skeletons), and **error** states render per spec.
- Confirm the weakest domain is framed as a prompt, not a verdict (non-shaming gate).
- `npm run check` — **`verify:brand` must stay green** (no purple introduced; domain colours identity-only).
