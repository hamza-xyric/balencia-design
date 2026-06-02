# Nutrition & Diet Dashboard — Premium Visualization Recommendations

> Companion to `28-nutrition-diet-dashboard.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current D (54) → specced-target A− (86)** under the revised 10-dimension rubric.
> **This screen mints `VK-007` Donut / Pie** — the primitive's full spec is folded into `VIZ-KIT.md` by the orchestrator; this companion designs it in context.

## Context

We compared the Balencia Nutrition dashboard against **Cronometer / MyFitnessPal premium** (the macro-tracking benchmark) and **Bevel** (the always-on premium-depth floor). Our **data** is strong — a full AI meal plan, four macros vs target, water, food log, adherence. The gap is the same as Home's: our information reads as a **list** (four flat white bars, a row of dot-glasses, text meal rows), while Cronometer reads as a crafted instrument and leads with the one view bars cannot show — **how today's calories actually split across macros.**

But the goal is **not to clone Cronometer's clinical multi-colour macro wheel.** That would make us a recognizable copy in a nutrition-tracker's own language and would shred 60/30/10 (a six-colour donut). The Balencia way:

- **The Macro Donut, our way** — an honest part-of-whole where the **largest slice is brand orange** and the rest are warm neutral tints, with **warm-glow depth** on `ink-brown-800`, a count-up center hub of *logged* calories "of target," and the **draw-itself** motion that ties it to the Living Line family. Composition as coaching, not a clinical readout.
- **The same donut at three scales** — hero (the day), micro (per meal row), and a tap-to-expand fiber/sugar/sodium drill — so one primitive carries the whole screen, not five bespoke charts.
- **Warm-glow depth** — calibrated orange glow on warm `ink-brown-800`, vs Cronometer's flat clinical cards.
- **Non-shaming framing** (the Gentler-Streak thesis applied to food) — an unbalanced plate is *information*, a missed log day is a **neutral ghost** not a red verdict, and "calories left" is framed as headroom, never a deficit to feel guilty about.

Decisions locked with the program: **distinct Balencia signature** (not Cronometer-proximate); **spec-first** (read-only); premium depth inside 60/30/10. No new data — every visual derives from data the screen already shows (macros, meal cal/P/C/F, water, food log), plus a single 7-day adherence array reused across two visuals.

---

## What reads premium — and how we do it *our* way (not Cronometer's)

| Premium quality | Cronometer / MFP device | **Balencia's ownable equivalent** |
|---|---|---|
| The macro split, at a glance | Multi-colour macro wheel (protein/carb/fat each its own hue) | **Macro Donut** — orange primary slice + warm neutrals, warm-glow, count-up hub |
| Headline numbers on landing | Dense top stat row | `KPIStatTile` ×3 (cal left · protein · adherence) with honest deltas |
| vs-target legibility | Flat coloured bars | `MacroBar` with **domain-lime** macro fills + a **visible** in-range/over sign |
| Consistency signal | Weekly streak strip | `CalendarHeatmap` (5-step, ghosted no-log days, non-shaming) |
| Hydration tracking | Water counter | `GaugeRing` water-mode (sanctioned two-blue), arrival glow + XP |
| "Instrument" depth | Flat clinical cards | warm `--glow-orange-sm` on `ink-brown-800` + inset tracks |

**Root cause of today's flatness:** we own the raw materials but render them flat, and the one primitive this screen most needs **doesn't exist** — there is **no Donut/Pie component** anywhere in the prototype (`grep` confirms). The four `MacroBar`s are deployed (three rendered `white/40`, reading as disabled); `CalendarHeatmap` is deployed but unused here; `WaterIntakeRing` exists (200px, wellbeing-blue) but the screen renders flat dot-glasses instead; `StatTile` exists but is unused here. The depth tokens to make any of it premium **don't exist yet** (logged `VK-017`). The upgrade is: **mint `VK-007` Donut**, compose the deployed primitives, mint the depth tokens, and add the warm-glow pass.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** must be added to `globals.css` in viz-build (`VK-017`); specs reference them by name, never as floating hex. Verified against `globals.css`: `--glow-orange/green/purple` exist (all 32px); the size-stepped and gradient/inset/stroke tokens **do not** and are minted in viz-build.

| Token | Intended value | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient (named once) |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | gauge/ring/area depth |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed ring/track (water ring, donut backplate) |
| `--glow-orange-sm` / `--glow-orange-md` | `0 0 12px …0.35` / `0 0 20px …0.40` | size-stepped glow (donut primary slice; water ring) |
| `--stroke-thin / -base` | `2 / 4px` (§8) | donut slice gaps, calorie-weight bars |
| `--glow-orange` · `--glow-green` | `0 0 32px …` (**exist**) | hero-scale glow; water 8/8 arrival pulse |

Macro-to-calorie factors (protein 4, carbs 4, fat 9 kcal/g) are **arithmetic constants**, not new data — they convert the grams the screen already shows into the honest calorie-share whole the donut renders.

---

## The six recommendations

Ordered by leverage. R1 is the hero (and mints the kit's missing primitive); R2 closes the obvious comparison point; R3–R6 establish density + consistency.

### R1 — `Donut` (`VK-007`): the Macro Donut hero — mints the kit's missing primitive (highest leverage)

There is **no donut/pie anywhere in the prototype.** This screen mints `VK-007` and deploys it as the focal hero at the top of the Daily Macros card. It is the one view four parallel bars cannot give: **how today's logged calories actually split.**

```
        DAILY MACROS                          1305 cal logged · of 2200
        ┌──────────────────┐    ┌────────────────────────────────────┐
        │      ╭─────╮      │    │ Calories  ████████████░░░░  1600   │
        │    ╱  CARBS  ╲    │    │           1600 / 2200              │
        │   │   41%     │   │    │ Protein   ██████████░░░░░  77g  ✓  │
        │   │ ┌───────┐ │   │    │           77 / 120g               │
        │   │ │ 1305  │ │   │    │ Carbs     ████████████░░  130g  ✓  │
        │   │ │ cal   │ │   │    │           130 / 180g              │
        │  ╲ └───────┘  ╱   │    │ Fat       ████████████░░  53g   ✓  │
        │   ╲ FAT   PROT╱   │    │           53 / 70g                │
        │    ╲38%   24%╱    │    └────────────────────────────────────┘
        │      ╰─────╯      │
        └──────────────────┘
   ↑ ORANGE = largest slice (carbs)        ↑ honest hub: logged cal "of" target,
     warm-neutral = the other two             NOT a fake 100%-of-target ring
     ~140px · draws itself · 2px gaps
```

- **Slice math (honest whole):** protein 77g×4 = 308 cal · carbs 130g×4 = 520 cal · fat 53g×9 = 477 cal → total **1305 logged cal**. Shares: **carbs 41% (largest → orange) · fat 38% · protein 24%.** The donut sums to a **true whole** (the 1305 logged, not the 2200 target). The hub reads `1305 cal` over `of 2200` — the gap to target is honest text in the hub, **not** a phantom "remaining" slice that would lie about composition.
- **Brand slice law (60/30/10-safe):** **largest slice = `--color-brand-orange`**; the other two = warm neutrals (`--color-alpha-white-40`, `--color-alpha-white-20`). **Never** one-hue-per-macro (that's the Cronometer clone and a 60/30/10 violation), **never** domain-lime across slices (lime is identity, used on the MacroBars/chrome — splitting it across a donut would read as four domains), **never** purple (no SIA in this chart).
- **Depth:** 2px inter-slice gap reveals `ink-brown-800` for carved separation; rounded slice caps (round-join, §8); faint radial backplate; `--glow-orange-sm` **(mint)** on the orange slice only (calibrated to the 140px size — the full 32px `--glow-orange` would swamp it; a depth *failure*).
- **Motion — draws itself:** arcs sweep clockwise from 12 o'clock via `stroke-dashoffset` (`stroke-draw`, `--dur-flow`/`--ease-flow`), largest→smallest (orange first), **not** opacity-fade (§8); hub counts up 520ms. Draws **before** the MacroBars rise.
- **Honesty (the hard part):** a macro at 0g is **absent** (no zero-width wedge); Day-1/no-log → a **ghosted full-ring outline** with "Log a meal to see your split," **never** a collapsed disc or a misleading 100%-of-one ring; over-target is shown on the MacroBars + hub colour, not by distorting slice shares.
- **Micro-interaction:** tap a slice → its MacroBar pulses + tooltip (grams · % · cal); tap the hub → expand to fiber/sugar/sodium (high-motivation drill). 44×44 invisible hit-wedges.
- **Data:** `nutritionDashboard.macros` (current grams) + the 4/4/9 constants.

> **Why a donut over a fifth bar:** four bars already answer *vs-target*; none answers *composition*. The donut is the honest, glanceable "what's on my plate today" that every macro app leads with — and rendered with our orange-primary slice law + warm glow + draw motion, it's unmistakably Balencia, not Cronometer.

### R2 — `KPIStatTile` strip: the headline three (closes the "what matters now" question)

A three-tile row under the SIA note, above the meal card — the numbers a user opens this screen for:

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   600        │ │  77g  ▲      │ │  5/7         │  ← count-up; ▲ from fixed 7-day window
│   CAL LEFT   │ │  PROTEIN     │ │  ON TARGET   │  ← uppercase white/40 labels
└──────────────┘ └──────────────┘ └──────────────┘
```

- **Cal left** = target − current (600); turns `--color-forest-green` in-band / `#F59E0B` + the word "over" past target (visible sign, not colour-alone).
- **Protein** = current (77g) + `▲/▼` vs a **fixed, disclosed 7-day average** (no cherry-picking — RUBRIC dim 6).
- **On target** = adherence days this week (5/7), sharing the `S28-V05` heatmap array.
- Count-up `--dur-base` 280ms; reuses/extends the existing `StatTile` (currently unused here). Day-1 → honest zeros framed as a fresh start, never a red verdict.

### R3 — `MacroBar` group: depth + a visible in-range/over sign

Keep the four bars (they answer *vs-target*; the donut answers *composition* — two honest questions). Upgrade from today's flat fills:

```
Protein   ██████████░░░░░  77g  ✓ in range      ← lime fill (domain identity), visible ✓
          77 / 120g
Calories  ████████████░░░  1600                  ← ORANGE (primary metric, 60%)
          1600 / 2200
Fat       ███████████████  72g  ⚠ over           ← amber + the WORD "over" (not colour alone)
          72 / 70g  (capped fill, honest scale)
```

- **Calories** = `--color-brand-orange` (primary, 60%). **Protein/Carbs/Fat** = `--color-domain-nutrition` lime (identity) — **not** today's `white/40`, which reads as disabled.
- **Status sign (never colour alone):** in-range = green ✓ glyph; over = `#F59E0B`/`#EF4444` fill **plus a visible "over" label** — fixes the a11y gap and serves colour-blind users.
- **Honest scale:** all four share a 0→target baseline; over-target is colour+label+capped fill, never a bar overflowing its track. Deployed component — depth/sign upgrade only.

### R4 — `GaugeRing` water-mode: the sanctioned two-shades-of-blue ring

Replace the 8 dot-glasses with the real **`WaterIntakeRing`** (200px, already built) adopting `GaugeRing` depth:

```
        ╭───────╮
      ╱  5 / 8   ╲        ← hub; ring filled 62.5% in wellbeing-blue
     │  Glasses   │       ← two-shades-of-blue exception (§11), sanctioned here
      ╲ 1250 ml  ╱        ← arrives green + "+25 XP" glow pulse at 8/8
        ╰───────╯
```

- Wellbeing-blue ring over a lighter wellbeing track; `--track-inset` **(mint)** recessed; `--glow-green` (exists) only on the 8/8 arrival pulse.
- a11y: "5 of 8 glasses" text equivalent; arrival = green glow **plus** "+25 XP / Target reached" copy (never colour alone). [+] 44×44 (carries **B10-F12**); long-press decrement with undo.
- Non-shaming: an unfilled ring reads as "room to hydrate," never a deficit. Day-1 → empty ghosted ring `0/8`.

### R5 — `CalendarHeatmap`: 7-day intake consistency (the streak-of-attention)

A one-week heatmap in/under the Daily Macros card — intensity = how close each day landed to target (missed → under → on → over). Reuses the deployed `CalendarHeatmap` (5 steps, today = dashed border, tap = `scale-110`).

```
 M  T  W  T  F  S  S
 ▣  ▣  ▣  ◻  ▣  ▦  ⬚      ▣ on-target · ◻ under · ▦ over · ⬚ no-log (GHOSTED, not "0")
 "Your week — 5/7 on target"
```

- **Honesty:** a no-log day is a **ghosted** cell (`bg-alpha-white-03`), **not** the worst intensity — no-data ≠ "you ate nothing." Non-shaming: a missed day is neutral, never red.
- Data: a 7-element adherence array (the only added fixture; shared with R2 tile 3; derivable from food-log history).

### R6 — Meal timeline: per-row calorie weight + micro-donut

The four meal rows become a timeline — same `VK-007` donut at meal scale:

```
✓ BREAKFAST   Oatmeal with berries                        ◔  ← 24px micro-donut (P/C/F)
  350 cal · 12g P · 55g C · 8g F
  ███░░░░░░░░░░░  22% of day                               ← 4px orange calorie-weight bar
─────────────────────────────────────────────────────────
  LUNCH        Chicken salad wrap                          ◑
  520 cal · 35g P · 40g C · 15g F
  ██████░░░░░░░  33% of day
```

- A 4px `--color-brand-orange` calorie-weight bar (meal cal / day cal) + a 24px micro-`Donut` (no hub, no glow) per row; logged ✓ stays (visible sign). Bars/donuts draw on scroll-into-view. Unlogged meal → ghosted bar + outline micro-donut (planned, not consumed).

---

## VK-007 Donut/Pie — primitive design (what gets folded into the kit)

Designed here so the kit block is grounded in a real screen:

- **Arc:** SVG `path` arcs (or Recharts `Pie`), `stroke-linejoin/linecap: round`, **2px gap** between slices (reveals surface), **consistent inner-radius across the app** (donut, not pie, unless a screen needs solid).
- **Honest-whole assertion:** slices **must** sum to a true whole the user can name (logged calories, total spend, total sleep minutes) — never to an arbitrary or padded total; a 0-value category is **omitted**, not drawn as a zero-width wedge; a "remaining vs target" gap is **hub text**, not a phantom slice.
- **Brand slice law:** **largest/primary slice = `--color-brand-orange`**; remaining slices = warm neutral tints or, where each slice *is* a domain (a spend-by-category donut), `--color-domain-*` identity tints; **never purple unless the slice is SIA-originated.** No rainbow.
- **Depth:** `--glow-orange-sm` on the primary slice only at ≥48px; faint radial backplate; no glow at micro (<48px) scale.
- **a11y:** an `aria-label` enumerating every slice's label + % + value; a **visible** legend or in-situ labels (never colour-alone); arcs/boundaries ≥3:1 (1.4.11); 44×44 slice hit-wedges.
- **States:** empty/Day-1 = ghosted full-ring outline + hub prompt (never a collapsed disc); partial = logged slices + ghosted remainder; loading = ring skeleton that draws into arcs; over/edge = handled in hub text, not by distorting shares.
- **Motion:** **draws itself** — arcs sweep from 12 o'clock, largest→primary first, `stroke-draw` `--dur-flow` `--ease-flow`; hub counts up 520ms; reduced-motion → full arcs at rest. **Never opacity-fades** (§8).
- **Consumers:** Nutrition [28] (macros, meal micro-splits), Finance [30] (spend by category), Sleep [58] (light/deep/REM stages), Call Summary [79] (topic split).

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 Macro Donut | — (**none exists**) | `src/components/charts/` (new `Donut.tsx`) | **mint VK-007** + `--glow-orange-sm` (VK-017) |
| R2 KPI strip | `StatTile` (unused here) | `src/components/screens/StatTile.tsx` | extend to KPIStatTile (delta arrow) — VK-008 |
| R3 MacroBar depth | `MacroBar` (deployed, 3× white/40) | `src/components/domain/MacroBar.tsx` | lime fills + visible status sign |
| R4 Water ring | `WaterIntakeRing` (built, unused on screen) | `src/components/domain/WaterIntakeRing.tsx` | inset track + GaugeRing depth (VK-002, VK-017) |
| R5 Intake heatmap | `CalendarHeatmap` (deployed, unused here) | `src/components/charts/CalendarHeatmap.tsx` | 7-day adherence array in `mock.ts` |
| R6 Meal timeline | `MealCard` + R1 Donut micro | `src/components/domain/MealCard.tsx` | calorie-weight bar + 24px micro-donut |
| Depth tokens | `--glow-*-sm/md`, `--track-inset`, `--grad-orange`, `--stroke-*` | `src/app/globals.css` | **mint (VK-017)** |

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates: donut primary slice, calories MacroBar, calorie-weight bars, KPI accent, heatmap full-intensity.
- **Green (30%)** for in-range / target-hit / water-arrival / logged ✓ only.
- **Purple (10%)** stays SIA-only — the single SIA-note dot. **No projection series on this screen → no purple in any chart.**
- **Domain-lime (`#84CC16`)** is **identity only** — header accent, RPG badge, the three macro-bar fills, quick-action icons. **Never** split across donut slices, never a generic palette.
- **Two-shades-of-blue** is the **only** sanctioned non-orange-family chart (water ring, §11).
- **Glow** uses the calibrated size-stepped scale — `--glow-orange-sm` on the donut primary slice, `--glow-green` only on water arrival; never neon.
- **Accessibility:** text/aria equivalents on every chart; visible status signs (✓ / "over" / "logged"); WCAG 1.4.11 ≥3:1 on donut arcs / slice boundaries / ring arc / bar fills; macro progress conveyed numerically; reduced-motion → final state.
- **Non-shaming (ethical gate):** "cal left" = headroom not deficit; an unbalanced donut = information not a verdict; a missed-log heatmap day = neutral ghost not red; water = "room to hydrate." No streak weaponised, no flattering delta window.

---

## Phasing (when we move to build)

1. **VK-017 tokens + VK-007 Donut** — mint the depth tokens and the missing primitive first (everything leans on them).
2. **R1 Macro Donut** — the hero; biggest perceived-quality jump and the honest-composition view we lack.
3. **R3 MacroBar depth + sign** — fixes the disabled-looking white bars and the colour-only a11y gap.
4. **R2 KPI strip** — the headline numbers, with honest deltas.
5. **R4 Water ring** — swap dot-glasses for the real ring (carries B10-F12 44×44 + undo).
6. **R5 heatmap + R6 meal timeline** — consistency + density polish.

Each is independently shippable and verifiable.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/domains/nutrition`, screenshot before/after; verify the donut **draws** (not fades) with the **largest slice orange**, slices summing to the **logged** calories (hub reads "of 2200"), the MacroBars carry a **visible** in-range/over sign, and the water ring replaces the dot-glasses.
- Confirm the donut's **empty/Day-1** state is a ghosted ring + prompt, **never** a collapsed disc or a misleading 100% ring; confirm a no-log heatmap day is **ghosted**, not worst-intensity.
- `npm run check` — **`verify:brand` must stay green** (no lime in slices, no purple in any chart, two-blue confined to water).
