# Balencia Craft Kit — premium-craft pattern vocabulary

The shared **craft** vocabulary every screen composes from — the content/surface/copy/motion analog of `viz-audit/VIZ-KIT.md` (which owns the 19 *data* primitives). A screen spec references these patterns **by name** (e.g. "hero card uses the `CK-P1` Layered Warm Surface"). If a screen needs craft not in this kit, it is added here as a `CK-P##` pattern first — never invented per-screen.

> **Division of labour.** Data screens compose from **both** kits: `VIZ-KIT` for the chart/gauge/graph primitives, this kit for the surfaces, copy, type, motion, and states *around* them. Content screens compose from this kit + the `_shared-patterns.md` component library. Neither kit duplicates `_shared-patterns.md` (the component specs) or `Design-System-Overview.md` (the brand law) — they reference them.

> **Tokens are real.** Every value here is a token in `balencia-screens/src/app/globals.css`, or — where it is not yet — a logged **`CK-T##`** gap (the craft analog of the viz-audit's `VK-017`) to mint in the build program. Specs reference absent tokens by their intended name, never as floating literals. Naming note: `globals.css` exposes `--radius-*` / `--spacing-*`; `_shared-patterns.md` uses the `--r-*` / `--s-*` shorthand for the same values — **the `globals.css` names are canonical in code.**

---

## The Balencia craft signature (what makes our surfaces *ours*)

Three ownable devices carry the brand at the surface level — the non-chart analog of the Living Line + Constellation Radar:

1. **Warm glow on warm ink.** Depth is calibrated **orange/green/purple glow on `ink-brown-800` surfaces over an `ink-900` field** — the ownable contrast to competitors' cold slate/neon. Glow is *warm and calibrated by element size* (never neon, never a 32px glow on a 36px element).
2. **The continuous stroke.** One drawn, round-capped, curved stroke per surface (§8) — the splash mark, the Living Line, a section's underscore, a progress path. It **draws itself**, never fades in.
3. **The brand period.** The Balencia "." is sacred (§6) — used with intent on the wordmark and key brand lines, never scattered.

Every pattern below expresses at least one. **At least one ownable moment per screen** (RUBRIC dim 4 + 14).

---

## Shared depth & type language (applies to all patterns)

**Depth tokens — inherited from the viz-audit (`VK-017`), do not re-mint.** This kit *depends* on them; the build program mints them once:
`--orange-light` (#FF8A3D) · `--grad-orange` (180° orange→orange-light) · `--grad-progress` (90° orange→green) · `--track-inset` (rgba(0,0,0,0.28)) · `--glow-orange-md` (0 0 20px /.40) · `--glow-orange-sm` (0 0 12px /.35) (+ green/purple `-md/-sm` siblings) · `--stroke-thin/base/bold/poster` (2/4/8/12px).

**Depth tokens — new craft gaps this program logs (`CK-T##`):**

| Token | Intended value (mint in build) | Use |
|---|---|---|
| `CK-T01` `--edge-highlight` | `inset 0 1px 0 rgba(255,255,255,0.06)` | the **top-edge inner highlight** that lifts a layered surface off the field — the single highest-leverage "not-flat" cue |
| `CK-T02` `--surface-backplate` | `radial-gradient(120% 90% at 50% 0%, rgba(255,94,0,0.05) 0%, transparent 60%)` | faint warm backplate behind hero surfaces (a calmer sibling of the doc-only `--grad-hero-glow`) |
| `CK-T03` `--focus-ring` | `0 0 0 2px var(--color-ink-900), 0 0 0 4px var(--color-brand-orange)` | the **one** focus-visible ring used app-wide (2px orange, 2px offset on the dark field) |
| `CK-T04` `--leading-tight/snug/normal/relaxed` | `1.1 / 1.25 / 1.4 / 1.6` | line-height steps (absent from `globals.css` — only sizes exist) |
| `CK-T05` `--tracking-tight/normal/eyebrow` | `-0.025em / 0 / 0.12em` | letter-spacing steps (eyebrow tracking exists only inside the `.eyebrow` utility) |

> **Stale-token flag (`CK-F00`, carried as a finding):** `_shared-patterns.md` §Design-Tokens lists `--grad-progress` as *teal/green→warm* and several `--grad-*` that are **not in `globals.css`**. The viz-audit corrected `--grad-progress` to **orange→green** (domain-colour-as-data-ink retired). **Defer to the viz-audit / `VK-017` definitions**; the `_shared-patterns` gradient table is stale and pre-dates that correction. Do not reference the teal definition.

**Depth rules every pattern obeys** (locked in `CONSISTENCY.md`):
- **Layered, not flat:** `ink-brown-800` body + `CK-T01` top-edge highlight + 1px `--glass-border` (white/6) + honest `--shadow-1/2/3` by z-layer. A flat fill with only a hairline border is a depth *failure*.
- **Glow calibrated by size:** `--glow-orange` (32px) on heroes ≥96px only; `--glow-orange-md` (~20px) at 48–96px; `--glow-orange-sm` (~12px) at ~36px; **none** inline. Warm, never neon.
- **Inset/beveled tracks** (`--track-inset`) under any progress/ring/slider track.
- **Round caps/joins** on every stroke (§8).
- **Radius by role** (`globals.css`): `--radius-xl` (28px) primary cards · `--radius-md` (14px) small cards <80px · `--radius-sm` (10px) chips/nested · `--radius-pill` CTAs/chips/toggles.

---

## Patterns

### `CK-P1` · Layered Warm Surface  ·  extends `_shared-patterns.md` "Glassmorphism" + `.glass-card`
- **Purpose:** the default premium card/surface — the anti-flat-box.
- **Recipe:** `ink-brown-800` · `--radius-xl` · 1px `--glass-border` · `CK-T01 --edge-highlight` · `--shadow-1` (mid surfaces `--shadow-2`); hero surfaces add `CK-T02 --surface-backplate`. Padding 24px (hero 32px).
- **When to use:** every content card, dashboard card, SIA note, list-group container. Never a raw `ink-900` block with a border.
- **A11y/brand:** text ≥4.5:1 on `ink-brown-800`; ≤2 orange accent words; the border is decorative (not load-bearing).

### `CK-P2` · Focal Hero Block (content **or** data)
- **Purpose:** the single above-the-fold focal point (RUBRIC dim 2). Exactly one per screen.
- **Forms:** *data* → a `VIZ-KIT` hero (Constellation Radar / GaugeRing / ArcGauge / the Living Line). *content* → a hero card carrying the screen's one job: the big number/title + one supporting line + the primary CTA, on a `CK-P1` surface with `CK-T02` backplate + size-calibrated glow on the key element.
- **Rule:** sized as a hero (not a 36px ring lost in a card); everything else is visibly secondary. A flat eyebrow+list opener fails this pattern.

### `CK-P3` · Typographic Rhythm
- **Purpose:** the locked type system so every screen reads with the same premium cadence (RUBRIC dim 13).
- **Scale (real tokens):** `--text-display-xl` 40 / `--text-display-l` 32 / `--text-h1` 28 / `--text-h2` 20 / `--text-h3` 17 / `--text-body` 16 / `--text-caption` 13 / `--text-eyebrow` 12 / `--text-small` 11. Pair each with `CK-T04 --leading-*` + `CK-T05 --tracking-*`.
- **Rules:** Sora for UI, **Chillax logo-only**; hierarchy by **weight** (600–700 vs regular) not size alone; **sentence case** on all labels/buttons/tabs; **no exclamation marks**; the **brand period** with intent; the `.eyebrow` style (12/600/+0.12em/uppercase/white-40) for section eyebrows; tabular-nums for stat figures.

### `CK-P4` · Motion Choreography
- **Purpose:** turn isolated micro-animations into a recognizable Balencia sequence that **draws, never fades** (RUBRIC dim 9, §8).
- **Choreography order (locked):** **focal first, then support.** (1) the hero **draws** (`stroke-animate` / `ring-animate`, `--dur-flow` 1200ms / `--dur-slow` 520ms `--ease-flow`) → (2) supporting cards **rise** (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 40–80ms stagger) → (3) numbers count up (`--dur-slow`) → (4) any SIA element settles last (purple). Below-fold surfaces animate on scroll-into-view.
- **Reduced-motion:** `prefers-reduced-motion` → final state instantly, strokes fully drawn + end dots present, loops off — the **settled frame is the canonical frame**.
- **Forbidden:** opacity-fading a stroke/line in (§8); the legacy `radar-grow` *scale* on the radar (use draw); urgency/looping motion on conversion surfaces (a dark pattern).

### `CK-P5` · Microcopy Voice Pack
- **Purpose:** author every string to brand voice (RUBRIC dim 11; `Design-System-Overview.md` §3).
- **Voice:** warm, plain, coaching — "write like a coach," sentence case, **no exclamation marks**, the period with intent. We *say* honest/specific/encouraging; we *don't say* hype/shame/jargon.
- **Non-shaming reframes (before → after):** "You failed your streak" → "Your streak paused — pick it back up today." · "0" (bare) → "0 · building capacity." · "You're behind #4" → "You're climbing — 120 XP to next." · "Over budget" → "Over by $40 — adjust or roll over." · A weak domain → "Spirituality is early in your journey," never "you're failing at X."
- **Edge strings (always authored, never generic):** empty-state line · loading line · error + recovery action · **permission rationale** ("why we ask · what you gain") · disabled-state reason · success confirmation (specific, not "Success!").
- **SIA copy:** specific to the user's data (a real connection-spotted insight), calm, earns its purple; never a horoscope, never interrupts a sensitive flow without obvious value.

### `CK-P6` · Anti-Generic Layout
- **Purpose:** kill the #1 "generic AI" tell — symmetric-card-grid monotony (RUBRIC dim 12/14).
- **Rules:** break any ≥3-card grid with a **focal hero** + varied card sizes or an intentional asymmetry that guides the eye; vary rhythm (tight within groups 8–12pt, generous between sections 24–32pt); no two adjacent elements share the same visual weight; lead sections with an `.eyebrow` + a heading row, not a bare list. Restraint scores **up** — a calm, hierarchical screen beats a maximalist one.

### `CK-P7` · State-Craft Set
- **Purpose:** every state **designed**, not deferred to a generic error table (RUBRIC dim 7). Required as a matrix in each `## Premium Craft` section.
- **The five (each a designed layout, on-voice copy, on-brand depth):**
  - **Cold-start / Day-1:** a calibrating/aspirational state (not a degenerate empty chart or blank list) — SIA fills the void warmly; "needs N days / log one to begin."
  - **Loading:** a skeleton that **preserves layout + depth** (rings/spokes/rows visible) and **morphs** into data (not a spinner-swap).
  - **Empty / partial:** distinct from loading and error; partial shows what's present and **ghosts** what's missing (no-data ≠ zero).
  - **Error:** specific (what failed) + a recovery affordance + on-voice copy; calibrated-red only for genuine operational failure, glyph+word paired.
  - **Offline:** cached banner; disabled actions honestly dimmed with a reason.

### `CK-P8` · Interaction & Focus Kit  ·  extends `_shared-patterns.md` "Interaction Patterns"
- **Purpose:** complete, premium interaction states (RUBRIC dim 9/10) — the survey found 15/20 screens missing 2–6 states.
- **The 8-state matrix per interactive element:** default · pressed (`scale(0.97)` + slight darken, light haptic) · **focus-visible (`CK-T03 --focus-ring`)** · disabled (0.5 opacity + reason, no haptic) · loading (skeleton/inline spinner) · error (error-red border + `role="alert"`) · success (brief `--glow-green` flash 600ms) · hover (accessibility devices only).
- **Targets:** every interactive element ≥44×44pt; haptic points named (light/medium/heavy · success/error); gesture fallbacks (swipe → long-press + context menu) and keyboard/focus order specified. Status never colour-alone — glyph+word always.

---

## Cross-reference: the data primitives (`viz-audit/VIZ-KIT.md`)

Data screens additionally compose from the 19 specced primitives — do **not** restate them here; reference by name and keep this kit's surfaces/copy/motion consistent with them:
GaugeRing · Sparkline/Living Line (`VK-016`) · MetricCard · MomentumBar · ConstellationRadar · TrendChart · BarChart · Donut (`VK-007`) · CalendarHeatmap · MacroBar/XPBar · KPIStatTile · CorrelationMatrix (`VK-009`) · NetworkGraph (`VK-010`) · ScatterPlot (`VK-011`) · ArcGauge (`VK-015`) · PodiumRank (`VK-012`) · BadgeTierGrid (`VK-013`) · TimelineAgenda (`VK-014`) · CompareGrid (`VK-019`).

## Kit-level gaps (logged as `CK-T##` / `CK-P##` in `findings-ledger.md`)

| Item | Status | Note |
|---|---|---|
| `CK-T01` `--edge-highlight` | **NEW token** | top-edge highlight; the key not-flat cue |
| `CK-T02` `--surface-backplate` | **NEW token** | hero warm backplate |
| `CK-T03` `--focus-ring` | **NEW token** | the one app-wide focus ring |
| `CK-T04` `--leading-*` | **NEW tokens** | line-heights absent from `globals.css` |
| `CK-T05` `--tracking-*` | **NEW tokens** | letter-spacing absent from `globals.css` |
| `CK-F00` `_shared-patterns` gradient table | **fix** | stale teal `--grad-progress`; defer to `VK-017` orange→green |
| VK-017 depth tokens | inherited | minted by the viz-build program; this kit depends on them |
