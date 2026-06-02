# Life Areas Overview — Premium Visualization Recommendations

> Companion to `16-life-areas-overview.md`. Design-recommendations reference — no prototype/spec/Figma code is changed by this document. Implementation is a separate, explicitly-requested viz-build pass.
> **Conform to `viz-audit/VIZ-KIT.md` (primitives) + `viz-audit/CONSISTENCY.md` (exact parameters).** Honest grade: **Current C (66) → specced-target A− (86)** under the revised 10-dimension rubric. This screen **mints no new primitive** — it is the purest composition of the existing kit's two signature devices.

## Context

Life Areas Overview is the **cross-domain hub** — the one screen whose entire job is the question *"where am I strong, where do I need attention?"* It is graded against the **Finch + Habitica** cluster (life-stats done *warmly*), with the **life-wheel** as the structural ancestor. This is Balencia's owned space; we don't grade on clone fidelity, we grade on **warmth + legibility + ownability**.

The screen already does the *right* thing structurally — it opens on a radar and lists ranked domains. The gap is **premiumness and signature**, not information:

- The radar that ships today is a **default RadarChart** (flat 15% orange fill, `radar-grow` *scale* animation, plain `r=4` dots, **no center hub**, 280×280 only). It is a competent life-wheel — but it is not the **Constellation Radar**. The brand book's whole thesis (`Design-System-Overview.md` §8/§11) is *"draw the line, never scale it in"* and *"Life Power is the sun at the center."* A radar that grows by scale and has no hub is structurally off-brand.
- **Life Power (487)** — the single competitive number, the entire reason the screen exists — sits *below* the chart as plain orange text. On a Finch/Habitica-grade screen the headline stat is **inside** the hero, not orphaned beneath it. Putting Life Power in the radar's center "sun" hub is the single highest-leverage move: it fuses the hero and the headline into one focal object.
- The **time-comparison** — *"watch your polygon shift over time,"* the feature the spec is proudest of — is rendered as a dashed ghost polygon overlay (good) but has **no temporal hero**: there is no way to see Life Power's *own* trajectory. A small **balance Living-Line Sparkline + weekly-delta KPIStatTile** turns "is my life trending up?" from an inference into a glance — and gives the comparison feature a Balencia-native answer.
- The **domain list** is already strong (ranked, per-domain color, progress bar, delta). It stays — formalized as **StatBars** at locked parameters. It is the screen's correct *secondary* layer; over-visualizing it (a second radar, a donut of domains) would be chart-noise and is deliberately avoided.

**The Balencia way vs the benchmark:** Finch renders life areas as cute discrete pet-stats; Habitica as RPG attribute bars; a life-wheel as a static colored pie. Ours is a **single drawn constellation** where the polygon's *shape* is the story, the **Life Power sun** is its gravitational center, and a **Living-Line** shows that whole-life number moving through time. No competitor fuses "shape of your life" + "one competitive number" + "is it trending up" into one calm, warm object. That fusion — not a prettier wheel — is what makes this premium *our* way.

**Decisions honored:** distinct Balencia signature (Constellation Radar, not a default radar or a life-wheel pie); spec-first / read-only; premium depth inside 60/30/10; **no new data** — every visual derives from `domainStats`, `domainProgress`, and `user.lifePower`, all already on the screen.

---

## Determinism note (no "e.g." values)

Every depth value below is **token-backed**. Tokens marked **(mint)** do not yet exist in `globals.css`; they are logged as `VK-017` and minted in the viz-build program. Specs reference them by name, never as floating hex:

| Token | Intended value | Use |
|---|---|---|
| `--orange-light` | `#FF8A3D` | lighter stop of the orange gradient |
| `--grad-orange` | `linear-gradient(180deg, #FF5E00, var(--orange-light))` | radar fill / hub glow base |
| `--grad-progress` | `linear-gradient(90deg, #FF5E00, #34A853)` | the balance Living-Line (effort→arrival) |
| `--track-inset` | `rgba(0,0,0,0.28)` | recessed sparkline baseline / KPI tile inset |
| `--glow-orange` (exists) · `--glow-orange-sm` (mint) | `0 0 32px …` / `0 0 12px …0.35` | hub sun glow (hero) · star-dot glow (per domain) |
| `--stroke-thin` / `--stroke-base` | `2px` / `4px` (§8) | sparkline stroke · radar polygon stroke |

`--glow-orange`, `--color-brand-orange`, `--color-forest-green`, `--color-royal-purple`, all `--color-domain-*`, and the `stroke-draw` / `--dur-flow` / `--ease-flow` motion tokens **already exist** in `globals.css`. The kit gap is the depth/gradient/size-stepped-glow tokens (`VK-017`) plus the `VK-005` Constellation Radar upgrade (hub + draw-not-scale) — both already logged; this screen introduces **no new** kit requirement.

---

## The three recommendations

Ordered by leverage. R1 is the hero fusion (radar + Life Power sun); R2 gives the comparison feature a temporal answer; R3 formalizes the already-good list.

### R1 — Constellation Radar with the Life-Power "sun" hub (the hero fusion)

The current `RadarChart` (280×280, flat 15% orange, `radar-grow` scale, plain dots, no hub) becomes the **Constellation Radar** (`VK-005`) at **hero size**, with **Life Power 487 living in the center as the sun.** This is the same primitive Home's `S12-V01` uses at *card* size — here it runs at *hero* size (the differentiator screen gets the full instrument).

```
            ✦ FIT
       MED ✦   ✦ SLP
     ✦ ╱           ╲ ✦
  WEL ●   ╱‾‾‾‾‾‾╲   ● CAR        ← drawn polygon (orange 25%→8% radial fill),
     │   │  ☀ 487 ☀ │   │           stroke --color-brand-orange + --glow-orange,
  REL ●   ╲________╱   ● NUT        DRAWS ITSELF (stroke-draw), never scales in
     ✦ ╲           ╱ ✦
       PRO ✦   ✦ FIN              ☀ = Life Power "sun" hub:
            ✦ FAI                   text-display, --glow-orange, count-up 0→487
                                    "life power" label under the number
   (creativity, learning: ghosted spokes until first activity — no-data ≠ 0)
```

- **Hub fusion (highest leverage):** Life Power moves *into* the radar center as the "sun" — `text-display` weight, `--glow-orange` (32px, hero-only), count-up `0→487` over 520ms `--ease-flow`. The orphaned `LifePowerDisplay` below the chart is **absorbed**; the diamond ◆ glyph is retained inline above the number so the brand mark survives. One focal object, one headline number — the eye lands once.
- **Axes — 12, not 10:** the canonical Constellation Radar is **12 domains** (matching Home's `S12-V01` and the `domainRoutes` map, which already lists creativity + learning). The current component renders only the 10 with `domainStats` entries. The hero radar shows **all 12 spokes**; creativity + learning render as **ghosted/dashed spokes at the axis origin** until their first activity — `no-data ≠ a real 0` (honesty gate). This keeps the constellation consistent app-wide and frames the two un-started domains as *unexplored*, never as *failed*.
- **Depth (token-backed):** polygon fill = radial orange gradient `fillOpacity 0.25 (inner) → 0.08 (outer)` over a faint radial backplate; stroke `--color-brand-orange` + `--glow-orange`, `--stroke-base` 4px, `stroke-linecap/linejoin: round`; domain dots are **glowing stars** (`--color-domain-*` + `--glow-orange-sm` (mint)); 5 rings at **20/40/60/80/99** (99 = domain-stat max, intentional — not a bug).
- **Motion — draws itself:** the polygon uses `stroke-draw` (`--dur-flow` 1200ms / `--ease-flow`) — **replacing** the current `radar-grow` *scale*, which violates §8 *"draw the line, don't scale it in."* Star dots stagger in (`radar-dot` 420 + index·40ms); the hub counts up after the stroke completes. The radar draws **first**, before the sparkline and list.
- **Comparison overlay (preserved, upgraded honestly):** in *vs week / vs month*, the prior-period polygon overlays as a **dashed white-30% ghost** (no fill) — but growth/decline is **never color-alone**: outward-moved vertices carry a green `↑` glyph + `--color-forest-green` glow; inward-moved vertices carry a muted `↓` glyph (using `--color-stalled-amber`, **not** alarm-red — non-shaming: a dip is "needs attention," not "failure"). The ghost polygon **draws itself** too, same family as the current.
- **Micro-interaction:** tap an axis label or star dot → that domain dashboard (44×44 zone, already a carried finding B07-F05); tap the hub → expand the card in place to the full 12-domain breakdown; the radar group reads its `aria-label` (Life Power + strongest/weakest domain).
- **States:** **Day-1 cold-start** → a faint *full* polygon near the rings' inner band with the hub reading **"Building your balance"** (not a number, not a collapsed point); **partial sync** → un-synced domain spokes ghosted/dashed; **loading** → depth-preserving skeleton (rings + 12 spokes visible, radial shimmer) that **morphs** into the drawn fill — never a blank disc.
- **Data:** `domainStats` (10 live + 2 ghosted), `user.lifePower` (487). `mock.ts`.

**Why this over a prettier life-wheel:** a colored-pie life-wheel is the benchmark's device and reads as a static verdict ("your life, scored"). The Constellation Radar reads as a *living shape you are drawing* with one gravitational center — whole-life coaching made legible, unmistakably Balencia, and impossible to mistake for a Finch pet-grid or a Habitica attribute screen.

### R2 — Balance Living-Line Sparkline + weekly-delta KPIStatTile (the temporal answer)

The comparison feature answers *"did this domain move?"* but never *"is my whole life trending up?"* A compact pair, placed **between the hub and the SIA insight card**, gives the screen's headline number a trajectory — the Balencia-native answer the *vs week / vs month* toggle is reaching for.

```
┌─────────────────────────────────────────┐
│  LIFE POWER · LAST 7 WEEKS               │
│   ╭─◦───╮       ╭──●   ← Living-Line Sparkline (7 pts, curved,
│  ◦       ╲_____╱           orange→green, 2px, draws itself, green end dot)
│  ─────────────────────────────────────   │
│  AVG STAT 52      ▲ 4 this week           │  ← KPIStatTile (honest, disclosed window)
└─────────────────────────────────────────┘
```

- **Sparkline (`VK-016` Living Line):** **exactly 7 points** (Life Power at each of the last 7 weeks), `--stroke-thin` 2px, **curved** (monotone), `--grad-progress` orange→green, **no axes/grid/glow**, green end dot when the latest week is a personal best, draws on appear `--dur-slow` 520ms. Derived by summing weekly domain-stat history — **no new data shape** beyond the weekly snapshots the *vs week* comparison already requires.
- **KPIStatTile (`VK-008`):** label `AVG STAT` (uppercase white/40, +0.12em) · number `52` (`text-h2`, average of active domain stats) · delta `▲ 4 this week` (▲ `--color-forest-green` / ▼ `--color-alpha-white-40`) from a **fixed, disclosed window** ("this week" — never cherry-picked). The arrow is a **visible glyph**, never color-alone. The existing `StatTile` component (`value` + `label`) extends to carry the delta row.
- **Tier honesty:** the sparkline's 7-week depth is Plus-gated to the same 14-day history threshold as the comparison toggle (the route already states "Plus comparison unlocks after 14 days of history"). Free / pre-threshold → the tile shows `AVG STAT 52` with the delta replaced by a calm "building history" hint; **no manufactured scarcity**, no locked-data teasing.
- **States:** <7 weeks of history → the sparkline ghosts the missing weeks (dashed) rather than faking zeros (`no-data ≠ 0`); loading → flat baseline that draws into the curve.
- **Non-shaming:** a downward sparkline reads as a *trajectory to discuss with SIA*, never a verdict; the SIA insight card directly below frames it as coaching.

### R3 — Domain StatBars (formalize the already-good list)

The domain list is already the screen's correct **secondary** layer — ranked descending, per-domain color dot, value, progress bar, mission count, delta. It is *kept* and formalized as **StatBars** (`MacroBar`/`StatBars` family) at locked parameters — no redesign, just consistency:

```
● Fitness        72  ▰▰▰▰▰▰▰▰▱▱   3 missions   ▲ 4 →
● Sleep          65  ▰▰▰▰▰▰▰▱▱▱   2 missions   ▲ 2 →
● Career         31  ▰▰▰▱▱▱▱▱▱▱   1 mission    ▼ 1 →   ← muted ↓, not alarm-red
   …
● Creativity      —  ░░░░░░░░░░   tap to explore       ← ghosted, never "0"
```

- **Bar:** track `--color-alpha-white-08`; fill = `--color-domain-*` at 80%; width = `stat / 99`; 4px height, radius-pill; **zero-baseline, shared scale** (honest). This is identity color, not decorative.
- **Delta in comparison mode:** `▲ +4` `--color-forest-green` / `▼ −1` `--color-stalled-amber` (muted, non-shaming) / `—` white/30 for no change — always a **glyph + number**, never color-alone.
- **Un-started domains** (creativity, learning, or any with no 90-day activity): stat shows `—` (not `0`), bar empty/ghosted, "tap to explore" replaces the mission count, row dimmed — `no-data ≠ 0` carried from the chart into the list.
- **Why not more here:** the list is the *secondary* tier; adding a second radar, a donut of domains, or per-row sparklines would be over-resolution (RUBRIC dim 1 penalizes chart-noise). The calm, ranked list is the correct restraint.

---

## Reuse map

| Recommendation | Reuses | Path | Needs |
|---|---|---|---|
| R1 Constellation Radar + sun hub | `RadarChart`, `LifePowerDisplay`, `domainStats`, `user.lifePower` | `src/components/charts/RadarChart.tsx`, `src/components/screens/LifePowerDisplay.tsx`, `src/data/mock.ts` | hub + 12-axis + draw-not-scale + ghosted spokes (`VK-005`, `VK-017`) |
| R2 Sparkline + KPIStatTile | `StatTile`, a Living-Line Sparkline, `domainProgress[].weekDelta` | `src/components/screens/StatTile.tsx`, `src/data/mock.ts` | Sparkline (`VK-016`/`VK-001`), KPIStatTile delta row (`VK-008`), 7-week life-power history |
| R3 Domain StatBars | the existing `DomainRow` list, `domainStats`, `domainProgress` | `src/app/tabs/me/life-areas/page.tsx` | formalize as `StatBars`; ghost un-started domains |
| Depth tokens | `--grad-orange`, `--track-inset`, `--glow-orange-sm`, `--stroke-*` | `src/app/globals.css` | **mint (`VK-017`)** |

**Mints nothing new.** Every primitive (`ConstellationRadar` `VK-005`, `LivingLine`/`Sparkline` `VK-016`, `KPIStatTile` `VK-008`, `StatBars`) already exists in the kit. The only blocking gaps are the **already-logged** `VK-005` (radar hub + draw) and `VK-017` (depth tokens) — shared with Home, not unique to this screen.

---

## Brand / 60·30·10 guardrails

- **Orange (60%)** dominates: radar fill + stroke, the Life Power sun hub, the sparkline's effort segment, the active time-range segment, domain progress-bar fills are domain-identity (allowed).
- **Green (30%)** only for arrival / positive delta / milestone dots: sparkline arrival end, KPI ▲, comparison growth `↑`, sparkline green end dot.
- **Purple (10%)** stays **SIA-only**: the SIA insight card's left border + icon (exactly the 2 elements the spec already allots). **No projection series on this screen** — so no dashed-purple is added; if a future "SIA forecasts your Life Power" tail is added to the sparkline, it would be the brand-sanctioned dashed-purple (§11), but it is **out of scope here**.
- **Domain colours** appear only as star dots, vertex dots, and progress-bar fills — strict identity, never decorative palette.
- **Decline color:** comparison/decline uses **`--color-stalled-amber`**, *not* alarm-red `#EF4444` — a dip is "needs attention," framed as coaching, never shaming (RUBRIC dim 6). *(The spec's older Color Map lists red-20% for decline; the Visualization section supersedes it to amber for non-shaming.)*
- **Glow** uses the calibrated size-stepped scale: `--glow-orange` (32px) on the hero hub only; `--glow-orange-sm` (~12px) on star dots; **no glow** on the sparkline. Warm depth on `ink-brown-800`, never neon.
- **Accessibility:** the radar carries a text/aria summary ("Strongest: Fitness 72. Weakest active: Career 31. Life Power 487."); every status/delta is a **visible glyph + value**, never color-alone; labels/values ≥ 4.5:1 on `#0A0A0F`; load-bearing strokes/arcs/star dots/the polygon boundary meet **WCAG 1.4.11 ≥ 3:1** (the white/5 rings + white/8 axes are decorative-only and may stay sub-threshold); interactive radar/list targets ≥ 44×44 (carries B07-F05, B07-F07); `prefers-reduced-motion` → radar at final drawn shape, sparkline at completed stroke + green end dot, no info lost.

---

## Phasing (when we move to build)

1. **`VK-017` tokens** — mint the depth tokens first (radar fill gradient, star-dot glow, sparkline stroke). Shared with Home — likely already done if Home built first.
2. **R1 Constellation Radar + sun hub** — the `VK-005` upgrade (hub, 12-axis, draw-not-scale, ghosted spokes). Biggest perceived-quality jump; also lifts Home's `S12-V01` and RPG [19].
3. **R2 Sparkline + KPIStatTile** — the temporal answer; depends on a 7-week life-power history array in `mock.ts`.
4. **R3 StatBars** — formalize the list; mostly a consistency pass on the existing `DomainRow`.

Each is independently shippable and verifiable.

## Verification (for the build pass)

- Run the prototype (`npm run dev`), open `/tabs/me/life-areas`, screenshot before/after; verify the radar **draws itself** (not `radar-grow` scale), the **Life Power sun hub** is centered and counts up, all **12 spokes** render (creativity + learning ghosted), the sparkline is a curved 7-pt Living Line, and the KPI delta is a visible glyph.
- Confirm the comparison overlay growth/decline carries **glyphs** (↑/↓), not color-alone, and decline uses amber not alarm-red.
- Confirm cold-start ("Building your balance" hub), partial-sync (ghosted spokes), loading (depth-preserving skeleton), and error states render per spec — **never a degenerate collapsed radar or a real-looking 0**.
- `npm run check` — **`verify:brand` must stay green**.
