# Screen Design: Finance / Money Map Dashboard

**Screen**: 30 of 73
**File**: 30-finance-money-map-dashboard.md
**Register**: Product Mode
**Primary action**: review financial health
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Finance Dashboard). Also reachable via SIA deep-link (stack push from SIA tab).

---

## Purpose

The finance dashboard gives users a complete, at-a-glance view of their financial health — income, expenses, budgets, savings, and spending trends — with SIA's life-system intelligence layered on top. This is a full Mint/YNAB-level finance experience, not a lightweight goal tracker. SIA connects spending patterns to other life domains ("Your dining spending spikes on high-stress weeks"), making this more than a finance app — it is finance as part of a life system.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with emerald accent and domain level
2. SIA coaching note — the cross-domain financial insight (the differentiator)
3. Monthly overview KPIs — income, expenses, savings, net change
4. Budget categories — horizontal progress bars showing spent vs. allocated
5. Recent transactions — last 5–10 entries, scannable
6. Savings goals — progress toward savings targets
7. Spending trend — mini line chart (7-day or 30-day)

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link card in chat (screen 09)
- **Primary exit**: Transaction / Budget Detail (screen 31) via tap on transaction row or budget category
- **Secondary exits**: SIA tab (tap SIA coaching note or "ask SIA"), Goal Detail (screen 14, for finance-tagged goals), receipt scanner (modal overlay)

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2.5 viewport heights; not a flat list, mixed content types)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Finance          Lv.8  ⚡   │  Domain Header (56pt)
│     emerald accent bar          │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (80pt)
│ │ "Your dining spending is    │ │
│ │  up 20% this week.          │ │
│ │  Connected to stress?"      │ │
│ └─────────────────────────────┘ │
│                                 │
│  may overview                   │  Eyebrow (16pt)
│ ┌──────┐ ┌──────┐ ┌──────┐    │  KPI Strip (96pt)
│ │Income│ │Spent │ │Saved │    │  3 cards side-by-side
│ │$4,200│ │$2,870│ │$1,330│    │
│ │+3.2% │ │-8.1% │ │+12%  │    │
│ └──────┘ └──────┘ └──────┘    │
│  net: +$1,330 vs last month    │  Summary line (20pt)
│                                 │
│  budgets                        │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 🍽 Dining    $420 / $500   │ │  Budget Row (~52pt each)
│ │ ████████████░░░░  84%      │ │
│ │ 🏠 Housing   $1,200/$1,200│ │
│ │ ████████████████  100%     │ │
│ │ 🚗 Transport $180 / $300  │ │
│ │ ████████░░░░░░░░  60%     │ │
│ │ ··· view all budgets       │ │
│ └─────────────────────────────┘ │
│                                 │
│  recent transactions            │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 🍽 Uber Eats    -$32.50   │ │  Transaction Row (~56pt)
│ │    Today, 12:34pm           │ │
│ ├─────────────────────────────┤ │
│ │ 💰 Salary      +$4,200    │ │
│ │    Yesterday                │ │
│ ├─────────────────────────────┤ │
│ │ 🛒 Whole Foods  -$87.20   │ │
│ │    May 18                   │ │
│ ├─────────────────────────────┤ │
│ │ ··· view all transactions   │ │
│ └─────────────────────────────┘ │
│                                 │
│  savings goals                  │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ Emergency fund              │ │  Savings Card (~72pt)
│ │ $3,400 / $10,000    34%    │ │
│ │ ████████░░░░░░░░░░░░░░░░   │ │
│ └─────────────────────────────┘ │
│                                 │
│  spending trend                 │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │  📈 7-day mini line chart   │ │  Trend Chart (~120pt)
│ │  [solid orange line = past] │ │
│ │  [dashed purple = projected]│ │
│ │  30d ·  7d                  │ │
│ └─────────────────────────────┘ │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar (56pt + 34pt safe)
└─────────────────────────────────┘

        [+ Add]  ← FAB (56pt circle, bottom-right, above tab bar)
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Identifies the domain, provides navigation context
   - Content: Back chevron, "Finance" title (20pt Sora Semibold), domain level badge ("Lv.8"), XP spark icon, thin emerald accent line at bottom (2pt)

2. **SIA Coaching Note** — ~80pt (variable with text)
   - Purpose: Cross-domain financial insight from SIA
   - Content: SIA indicator (small purple dot), coaching message, subtle tap-to-expand or tap-to-chat affordance

3. **Monthly Overview KPI Strip** — 96pt
   - Purpose: At-a-glance financial health
   - Content: 3 cards (income, expenses, savings) each with amount + month-over-month delta percentage

4. **Net Summary Line** — 20pt
   - Purpose: Bottom-line net position
   - Content: "net: +$1,330 vs last month" in 15pt Sora Regular

5. **Budget Categories Card** — ~220pt (3 categories shown + "view all")
   - Purpose: Budget spend tracking per category
   - Content: Category icon + name, spent/allocated amounts, horizontal progress bar, percentage

6. **Recent Transactions List** — ~224pt (4 rows shown + "view all")
   - Purpose: Quick scan of recent financial activity
   - Content: Category icon, merchant name, amount (green for income, white for expense), date/time

7. **Savings Goals Card** — ~72pt per goal
   - Purpose: Long-term savings target tracking
   - Content: Goal name, current/target amounts, progress bar, percentage

8. **Spending Trend Chart** — ~120pt
   - Purpose: Visual spending pattern over time
   - Content: Mini line chart. Solid orange line for past data, dashed purple line for AI-projected trend. Toggle for 7d / 30d.

9. **FAB (Floating Action Button)** — 56pt circle
   - Purpose: Quick-add transaction or scan receipt
   - Content: "+" icon. Long-press reveals two options: "add transaction" and "scan receipt"

---

## Components

### Domain Header
- **Purpose**: Establishes domain context with RPG level indicator
- **Data source**: User profile (domain level, XP), static labels
- **Visual treatment**: Full-width bar, ink-900 background. Left: back chevron (white). Center-left: "Finance" in 20pt Sora Semibold, white. Right: domain level badge ("Lv.8" in 12pt Sora Semibold, white at 70%) + XP spark icon (emerald). Bottom edge: 2pt horizontal line in emerald (#10B981), full width.
- **Variants**: Consistent across all domain dashboards; only domain name, level number, and accent color change.
- **Gestures**: Back chevron tap → stack pop. Level badge tap → RPG Character Screen (screen 19).
- **Size**: Full-width × 56pt

### SIA Coaching Note
- **Purpose**: Contextual AI insight connecting finance to other life domains
- **Data source**: SIA AI engine (proactive insight API)
- **Visual treatment**: Card on ink-brown-800 surface with glassmorphism. Left edge: 3pt vertical bar in purple (#7F24FF). Small SIA avatar indicator (16pt, circular, purple tint) top-left of card text. Message in 15pt Sora Regular, white. Bottom-right: subtle "ask SIA →" text link in 13pt Sora Regular, white at 50%.
- **Variants**: Empty (no current insight — card hidden, not shown empty), populated (standard), expanded (on tap — shows data sources and confidence)
- **Gestures**: Tap card → navigate to SIA tab with finance context. Tap "ask SIA →" → same.
- **Size**: Full-width - 32pt (16pt margins) × auto (min ~80pt)

### Monthly Overview KPI Strip
- **Purpose**: At-a-glance financial health numbers
- **Data source**: Finance API (monthly aggregate endpoint)
- **Visual treatment**: 3 equal-width cards in a horizontal row with 12pt gaps. Each card: ink-brown-800 background, 16pt padding, border-radius 14pt (--r-md). Amount in 24pt Sora Bold, white. Label above in 12pt Sora Semibold, uppercase, white at 50% (+0.12em tracking). Delta below in 13pt Sora Semibold over a fixed disclosed window ("vs last month"): the arrow encodes direction-of-good, not raw sign — a good move (income up, savings up, **or spend down**) = forest-green (#34A853) ▲/▼; an attention move (spend rising) = muted white/40 (or amber), never red and never an alarm tint. "Lower is better for spending" is disclosed in the tile's aria-label.
- **Variants**: Loading (skeleton shimmer on amounts), populated, error (retry prompt)
- **Gestures**: Tap any KPI card → scrolls to relevant section (income → transactions filtered, expenses → budget categories, savings → savings goals)
- **Size**: (Full-width - 32pt (16pt margins) - 24pt gaps) / 3 per card × 96pt

### Budget Category Row
- **Purpose**: Show spending against budget per category
- **Data source**: Finance API (budget categories endpoint)
- **Visual treatment**: Inside a card container (ink-brown-800, glassmorphism, 20pt border-radius). Each row: category icon (20pt, category-specific color), category name (16pt Sora Semibold, white), spent/allocated amounts right-aligned (15pt Sora Regular, white at 70%). Below: horizontal progress bar (full-width within card padding, 6pt height, border-radius 3pt). Bar fill: orange (#FF5E00) for under-budget; at-limit (100%) = forest-green (#34A853) arrival + a visible ✓. Over-budget = the fill caps at 100% (never drawn longer than the track) and a visible `!` glyph + "over by $N" label carries the meaning; finance-red (#EF4444) appears only as a reinforcing tint on the capped fill, never as the sole signal (colour-alone + alarm-red-as-data-ink is retired — see Visualization S30-V03). Non-shaming copy: "over by $N — adjust or roll over," never "you failed your budget." Bar track: white at 10%. Percentage right-aligned below bar (12pt Sora Regular, white at 50%). Rows separated by 1pt divider (white at 5%). "View all budgets" link at bottom: 15pt Sora Regular, orange (#FF5E00).
- **Variants**: On-track (orange fill), at-limit (green fill + ✓ "at limit"), over-budget (capped orange fill + reinforcing #EF4444 tint + visible `!` glyph + "over by $N — adjust or roll over" label, never colour-alone), no budget set (dashed outline bar)
- **Gestures**: Tap row → push to screen 31 (Budget Detail for that category). Tap "view all" → push to screen 31 with full budget list.
- **Size**: Full-width - 32pt (16pt margins), ~52pt per row

### Transaction Row
- **Purpose**: Scannable recent financial activity
- **Data source**: Finance API (recent transactions endpoint)
- **Visual treatment**: Inside a card container. Each row: left — category icon (20pt, in a 32pt circle with category color at 15% opacity background), merchant name (16pt Sora Semibold, white), date below (13pt Sora Regular, white at 50%). Right — amount (17pt Sora Semibold, tabular-nums): green (#34A853) for income with "+" prefix, white for expenses with "-" prefix. Rows separated by 1pt divider (white at 5%). "View all transactions" link at bottom.
- **Variants**: Income (green amount, ↑ icon), expense (white amount), pending (amount at 50% opacity, "pending" label)
- **Gestures**: Tap row → push to screen 31 (Transaction Detail). Swipe left → quick delete (with confirmation). Tap "view all" → push to screen 31 with full transaction list.
- **Size**: Full-width - 32pt (16pt margins), ~56pt per row

### Savings Goal Card
- **Purpose**: Track progress toward savings targets
- **Data source**: Finance API (savings goals endpoint)
- **Visual treatment**: Inside a card container. Goal name (16pt Sora Semibold, white). Current/target amounts (15pt Sora Regular, white at 70%). Progress bar (full-width within padding, 8pt height, border-radius 4pt). Fill: green (#34A853). Track: white at 10%. Percentage right-aligned (13pt Sora Semibold, green).
- **Variants**: Active (green progress), completed (full bar + green checkmark + "goal reached" label), paused (dimmed, 50% opacity)
- **Gestures**: Tap → expand to show contribution history and projected completion date. Long-press → edit goal.
- **Size**: Full-width - 32pt (16pt margins) × ~72pt per goal

### Spending Trend Chart
- **Purpose**: Visual pattern of spending over time
- **Data source**: Finance API (spending time-series endpoint), SIA AI (projected trend)
- **Visual treatment**: Inside a card container. Mini line chart: solid orange (#FF5E00) line for past data (2pt stroke), dashed purple (#7F24FF) line for AI-projected trend. Green (#34A853) dots for milestones (savings goals hit, budget resets). Y-axis labels in 11pt Sora Regular, white at 40%. Time toggle: segmented control ("7d" / "30d") in 13pt Sora Semibold, top-right of card. Active segment: orange text on orange at 15% background. Inactive: white at 50%.
- **Variants**: Loading (shimmer), 7-day view (default), 30-day view, insufficient data (< 3 days: message "SIA needs a few more days of data")
- **Gestures**: Tap toggle to switch period. Touch-and-hold on chart → tooltip showing exact amount for that date. Pinch → no action (chart is fixed scale).
- **Size**: Full-width - 32pt (16pt margins) × ~120pt

### FAB (Floating Action Button)
- **Purpose**: Quick entry point for adding transactions and scanning receipts
- **Data source**: None (triggers creation flow)
- **Visual treatment**: 56pt circle, orange (#FF5E00) background, white "+" icon (24pt, 2pt stroke). Positioned 16pt from right edge, 16pt above tab bar. Elevated: --shadow-2 + subtle orange glow. On long-press: expands upward into two mini-FABs (44pt each) — "add transaction" (pencil icon) and "scan receipt" (camera icon) with labels.
- **Variants**: Default (single "+"), expanded (two options), hidden (while scrolling down, reappears on scroll up)
- **Gestures**: Tap → push to add transaction modal. Long-press → expand to two options. Tap outside expanded → collapse.
- **Size**: 56pt diameter (touch target: 56pt, exceeds 44pt minimum)

---

## Visualization

> Source: embedded section (no companion file — Batch 4 is embedded-only). Audited in `viz-audit/` — Batch 4 (Domain-Dashboard A), findings `S30-V01..S30-V06`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant** (finance-emerald `#10B981` stays an *identity* accent on the header line + level badge + spend-by-category slice tints only — never on primary data ink). Benchmark = **Copilot Money + Monarch** (KPI tiles with honest deltas, a category donut, a spend trend, capped budget bars) rendered **the Balencia way** (Living Line + warm glow + honest whole), not as a Copilot/Monarch clone. **Current grade C (66) → specced-target A− (86).** *(Honest re-grade under the 10-dimension rubric. The prototype already ships the richest dashboard layout — KPI strip, capped budget bars, a category-tinted transaction list, and a spend trend that is *correctly* solid-orange-past + dashed-purple-projection with a green milestone dot. What it lacks: a viz hero, the spend-by-category Donut, the Living Line as more than a bare `polyline`, an honest budget over-budget glyph, and the income/spend/saved KPI delta rendered as a real disclosed window. The residual gap to A+++ is build-verified depth + working scrub/drill, owned by the later viz-build program.)*

This is the **richest life dashboard** and inherits the **Domain-Dashboard A template** (Fitness [26] is the canonical exemplar). Today it renders as a competent text-and-bars dashboard: the KPI strip is three text cards with colour-coded deltas (no arrow glyph, no disclosed window), budget rows are flat 2-tone `ProgressBar`s that **cap fill at 100%** (good) but signal over-budget by **red colour alone** with no glyph (a 1.4.11 + colour-alone miss the moment a category goes over), the spend split is *implied* by category-tinted transaction icons but never **composed into a part-of-whole**, savings is a flat green bar, and the spending trend is a hand-built SVG `polyline` (solid orange + dashed-purple projection + one green milestone dot — directionally right, but axis-less, area-less, and not the curved round-capped Living Line). This section upgrades *how the money reads* — an honest KPI strip, a **spend-by-category Donut hero** (the screen's one focal viz), capped+glyphed budget MacroBars, the Living-Line spend trend, and a net-worth/balance trend — **without** displacing the transaction list or SIA note, which remain the screen's scannable *content*. Mints no new primitive; it retires kit backlog (`KPIStatTile`, `Donut/Pie` VK-007, `MacroBar`, `TrendChart`/`VK-016`, `Sparkline`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Income ($4,200, +3.2%) · Spent ($2,870, −8.1%) · Saved ($1,330, +12%) | three text cards, colour-only delta | **KPI strip** — number + uppercase label + honest MoM **delta arrow** (▲/▼) over a **fixed disclosed window** ("vs last month") | `KPIStatTile` ×3 (`VK-008`) |
| Net change (+$1,330 vs last month) | text summary line | kept as the KPI strip's **honest net footer** (sum of the three tiles, named whole) | — (deliberately textual, reinforced by tiles) |
| Spend by category (dining/housing/transport/groceries/…) | *implied only* by tinted transaction icons | **spend-by-category `Donut` hero** (VK-007) — honest whole = **total spend $2,870**, largest slice orange, rest finance-domain identity tints, hub = total + "this month" | `Donut / Pie` (`VK-007`) |
| Budget category vs limit (Dining 420/500, Housing 1200/1200, Transport 180/300, Groceries 370/450) | flat 2-tone `ProgressBar`, fill capped at 100%, over = **red colour alone** | **budget `MacroBar` group** — capped honest fill, **visible over-budget glyph (`!` + "over" label)**, not colour alone; at-limit = green arrival | `MacroBar` (`VK-006`) |
| Spending trend (7d / 30d) + SIA projection | hand-built `polyline` (orange + dashed-purple + green dot) | **Living-Line `TrendChart`** — solid orange actual (curved, round-capped, draws itself) → **dashed-purple `#7F24FF` SIA projection**, area fade, green milestone dots, W/M/Y selector | `TrendChart` (`VK-006` / `VK-016`) |
| Net worth / running balance trend | not shown | **second `TrendChart` (Living Line)** — balance over the trailing months, dashed-purple projected month-end | `TrendChart` (`VK-016`) |
| Savings target progress (Emergency fund 34%) | flat green `ProgressBar` | `MacroBar` depth pass (track-inset + green arrival fill) + optional 7-pt contribution `Sparkline` (high-motivation) | `MacroBar` + `Sparkline` (`VK-001`) |
| Recent transactions (merchant · amount · date) | category-tinted icon list | kept as the scannable **content** list — income green +/expense white − prefix (sign, not colour-alone) | — (deliberately textual/iconographic) |
| Domain header / level / SIA note / "view all" links | text | — (deliberately textual) | — |

**Editorial hierarchy (calm, not maximal):** the transaction list + SIA note stay the screen's scannable *content*; the **spend-by-category `Donut` is the one viz hero** (it answers "where did my money go?" in <2s, which no bar can); KPI strip + budget bars + spend trend are clearly secondary; the net-worth trend + savings sparkline are ambient. Six visuals, one focal — not a wall of equal charts. (Over-resolution would be making each KPI a gauge and each budget a ring; resisted here.)

### 1 · KPI strip — `S30-V01` → `KPIStatTile` ×3

Promote the three text KPI cards (Income / Spent / Saved) to `KPIStatTile`s: uppercase label (`white/40`, +0.12em) · number `text-h2` · **delta arrow** (▲ `--color-forest-green` for a *good* move / ▼ `--color-alpha-white-40` for a muted *down* move) over a **fixed disclosed window** ("vs last month"). Source: `financeDashboard.kpis` (4,200 / 2,870 / 1,330 with +3.2% / −8.1% / +12%) + a new `kpis[].lastMonth` block in `mock.ts` so the delta is a real period-over-period figure, not a literal string.
- **Honest-delta semantics (finance-specific, non-shaming):** the arrow encodes *direction of the metric*, not a verdict — Spent **−8.1%** is a *down* arrow but is a **good** outcome, so its arrow is **green ▼** (down-and-good), while Spent rising would be a muted-amber ▲ (up, attention) — **never red**. The current build colours the Spent delta orange "to alert"; replace with the disclosed-window arrow + a neutral tint so a normal month is never framed as alarm. The semantics ("for spending, lower is better") are disclosed in the tile's `aria-label`.
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium — depth lives in the Donut hero).
- **Net footer:** the "Net: +$1,330 vs last month" line stays as the honest sum-of-tiles footer (income − spent = saved; a nameable whole), `text-body` white.
- **Micro-interaction:** tap a tile → scroll-to-section (income → transactions, spent → budgets, saved → savings) — preserve the existing `aria-pressed` filter affordance, but make it a *visible* selected ring, not colour-only.
- **States:** Day-1 → all three read `$0` with a `—` delta (honest: no prior month to compare, **not** a fabricated ▲); loading → label + skeleton number bar; error → "—" + orange "retry" (per Error Handling table).

### 2 · Spend-by-category Donut hero — `S30-V02` → `Donut / Pie` (`VK-007`)

The screen's **one viz hero**: a ~140px `Donut` of **spend by category** for the period — the part-of-whole a budget bar structurally cannot show. **Honest whole = total spend ($2,870)**, named in the hub (`text-h2` + "spent" sub-label + "this month"); slices are the budget/transaction categories aggregated (dining, housing, transport, groceries, …). **Largest slice = `--color-brand-orange`**; remaining slices = **finance-domain identity tints** (`--color-domain-finance` `#10B981` at graduated opacity) and warm neutral tints (`--color-alpha-white-40 / -20`) — **never rainbow, never purple** (no SIA origin here). 2px gap reveals the `ink-brown-800` surface for carved separation; consistent inner-radius per the app-wide Donut lock.
- **Honest whole (non-negotiable):** slices **sum to the true total spend** the user can name — a 0-spend category is **omitted**, never a zero-width wedge; "remaining budget" is **never** a phantom slice (it would lie about composition) — the budget-vs-limit story lives in the MacroBars (V03), not the donut.
- **Why a donut, the Balencia way:** Copilot/Monarch both lead with a category donut; we render the *same composition* as our own warm-glow donut (orange-primary, finance-tint rest, hub-named whole) so it reads unmistakably Balencia, not a Copilot screenshot.
- **Depth (token-backed):** `--glow-orange-sm` **(mint)** on the **primary (orange) slice only** at this ≥48px scale (the full 32px `--glow-orange` would swamp a 140px donut — a depth *failure*); faint radial backplate behind the ring; `--track-inset` **(mint)** under the ring; round slice caps.
- **Micro-interaction:** tap a slice → its budget category row scrolls into focus + a tooltip pill ($ + % of total); selecting a slice cross-highlights its `MacroBar` (V03).
- **States:** **cold-start / no spend** → a **ghosted full-ring outline** + hub prompt "Log spending to see where your money goes" (never a collapsed disc or a misleading 100%-of-one-category ring); **partial** → logged slices + a ghosted "uncategorized" remainder arc with a visible label (not silently folded into a category); **loading** → a ring skeleton that **draws into** the real arcs; **over-budget month** → handled in hub text/colour, never by distorting slice shares.
- **Data:** new `financeDashboard.spendByCategory` (label → amount, summing to total spend) in `mock.ts`, derived from budgets + categorized transactions.

### 3 · Budget category MacroBars — `S30-V03` → `MacroBar` (capped, glyphed)

The budget rows adopt the `MacroBar` (`components/domain/MacroBar.tsx`) with the depth + honesty pass: `--color-alpha-white-08` track over a `--track-inset` **(mint)** recess, **`--color-brand-orange` fill**, width = `min(spent/allocated, 1)` (**capped honest fill** — fill never exceeds the track, so a 120%-spent category does not draw a bar longer than the track and lie about scale), value-vs-target labelled ("$420 / $500", 84%), width count-up 0→% on mount.
- **Over-budget = glyph, not colour-alone (fixes the live defect):** when `spent > allocated`, the bar caps at 100% **and** shows a **visible `!` over-budget glyph + "over by $N" label**; the fill tints **finance-red `#EF4444`** as a *reinforcing* signal, but the **glyph + label carry the meaning** so it survives greyscale/colour-blindness and meets 1.4.11. At-limit (Housing 100%) reads **green arrival** + a ✓, not a red alarm. **Non-shaming:** an over-budget category is framed as "over by $N — adjust or roll over," never "you failed your budget."
- **Depth:** bars rise `--dur-slow` 520ms `--ease-flow` on scroll-into-view; rounded pill caps; `ink-brown-800` backplate; **no glow** (glow is reserved for the Donut hero).
- **Micro-interaction:** tap a row → Budget Detail [31] (preserve existing route + explicit `type=budget&id=`); selected row cross-highlights its donut slice (V02).
- **States:** Day-1 / no budgets → "No budgets yet" + orange "Create budget" + SIA suggestion chips (per Empty States), bars not drawn as fake zeros; new-month reset → all bars at a true 0% with a "fresh month" label (a real zero, distinct from un-set = dashed-outline track).

### 4 · Spending trend (Living Line) — `S30-V04` → `TrendChart` (`VK-016`)

Replace the hand-built `polyline` with the signature: a full **Living Line** of period spend — **one continuous, curved (monotone), round-capped, round-joined stroke that draws itself**, running orange `#FF5E00` (effort/past) via `--grad-progress` **(mint)**, **green `#34A853` milestone dots** on meaningful days (budget reset, savings goal hit), a `--grad-orange` area fade (≤25% top), and the **dashed-purple `#7F24FF` SIA projection** tail (§11 — the brand-sanctioned forecast colour, **correct, not a 60/30/10 violation**; the spec already calls for orange-past + purple-projection, which now aligns with §11) continuing the *same* path to the projected period-end. `--stroke-thin` 2px (actual) / 2px dashed (projection). The current build's correct-but-bare polyline keeps its colour law and green dot — it gains curvature, axes labels, the area fade, and the draw-itself motion.
- **Why the line, not stacked bars:** "every chart is the line" (§8) — the Living Line is the device Copilot/Monarch structurally don't have; it makes our spend trend unmistakably Balencia and reuses the exact spine of the home-screen sparklines.
- **Honest scale:** zero baseline; the projection is visually distinct (dashed-purple) so a forecast is never mistaken for actual spend; Y-axis $ labels in `text-micro` `white/40`; no-data days **ghosted ≠ a real $0 day**.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never opacity-fades**; the dashed-purple projection draws **after** the actual line; scroll-into-view (below fold).
- **Micro-interaction:** preserve the existing touch-and-hold tooltip (exact $ for a date) as a **scrubbed crosshair** across days; **W/M/Y** (or 7d/30d) selector pill (active = orange-on-`--glow-orange-bg`, inactive `white/50`) replacing the current 7d/30d toggle.
- **States:** insufficient data (<3 days, per spec) → "SIA needs a few more days of data" with a faint flat baseline + axes, **never** a single dot; projection hidden until SIA has enough history; reduced-motion → completed stroke at rest + green end/milestone dots + static dashed-purple tail.
- **Data:** `financeDashboard.trend` (7-pt) + a new `trend30` series + `projection` block in `mock.ts`.

### 5 · Net-worth / balance trend — `S30-V05` → `TrendChart` (`VK-016`)

A second **Living Line** for running **balance / net worth** over the trailing months (the Monarch "net worth over time" view, the Balencia way): same curved orange→green stroke law, green milestone dot on a new all-time high, area fade, and a **dashed-purple projected month-end balance** (§11). One line motif per *surface* (§8) — this is a separate card from the spend trend, so each surface still carries exactly one Living Line. Below the savings section, as ambient context.
- **Non-shaming:** a dip in balance is rendered as a neutral trough on a continuous line, never a red "loss" treatment; the projection is framed as "on pace for $N," not a warning.
- **States:** cold-start (<2 months) → "calibrating — building your balance history," faint flat baseline (never a single dot); reduced-motion → completed stroke + static dashed-purple tail.
- **Data:** new `financeDashboard.balanceTrend` (monthly points + `projection`) in `mock.ts`.

### 6 · Savings depth + optional sparkline — `S30-V06` → `MacroBar` + `Sparkline`

The savings-target bar keeps its **flat horizontal form** (deliberately *not* promoted to a ring — a savings ring would create a second focal point and fight the Donut hero) but adopts the depth pass: `--color-alpha-white-08` track over `--track-inset` **(mint)**, **`--color-forest-green` fill** (savings = arrival domain), width = progress, count-up width 0→% on mount; **completed** = full green bar + ✓ + "goal reached" (not colour-alone). **High-motivation tier only:** a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, green end dot when a contribution lands on a milestone, **no glow**) under the lead target showing recent contribution trajectory.
- **Non-shaming:** progress framed as momentum toward the target; a low bar reads as "on the way," never a shortfall.
- **States:** no target → "Set a savings target" card + orange CTA (per Empty States); loading → skeleton bar; completed → green + ✓ + congratulatory SIA note.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the spend-by-category `Donut` sweeps its arcs **largest → smallest** (the orange primary slice first, `stroke-draw` `--dur-flow` 1200ms `--ease-flow`) with the hub counting up (520ms) — **then** the KPI strip counts up (280ms `--ease-out-soft`) → **then** the budget `MacroBar`s rise (520ms `--ease-flow`, staggered) → **then** the spend-trend **Living Line draws itself** L→R (1200ms `stroke-draw`, *never* fade) with its dashed-purple projection drawing **last** → **then** the net-worth Living Line (below fold) draws on **scroll-into-view** → **then** the savings bar + optional sparkline. One line motif **per surface** (each trend card carries exactly one Living Line; KPI/budget/savings use numbers/bars). `prefers-reduced-motion` → every chart at final state instantly; the Donut's full arcs at rest with hub at final value, each Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail), and the bars' filled tracks preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — Donut = ghosted full-ring outline + "Log spending to see where your money goes" (never a 100%-of-one-category lie), KPI deltas read `—` (no prior month), budget section = "No budgets yet" + create CTA + suggestion chips (bars not faked to 0), spend + balance trends in "calibrating / SIA needs a few more days" with axes drawn, savings = "Set a savings target"; **loading** — depth-preserving skeletons that *morph* into drawn data (donut ring → arcs, axes → lines, bars from 0 — never blank discs); **partial** — un-categorized spend = a visibly-labelled ghosted remainder arc (not silently folded), un-synced days ghosted vs a true $0 day; **error** — chart-specific honesty (which dataset failed: "Could not load budgets" independent of the KPI strip) + a visible orange "retry," per the Error Handling table; SIA note hidden (not shown empty) on failure.
- **60/30/10:** **orange dominates** data ink (Donut primary slice, budget bar fills, Living-Line spend effort, KPI accents, the active toggle, "view all" links, the FAB); **green** = arrival/positive only (income amounts, savings fill, ▲ "good" deltas, at-limit budgets, milestone dots, the down-and-good Spent delta); **purple stays SIA-only** — the **single sanctioned purple is the dashed-purple SIA projection** on both trend lines (§11 forecast, correct *not* a violation) plus the existing SIA-note bar/avatar; **finance-emerald `#10B981`** is confined to **identity** (header accent line, level badge XP icon, and graduated spend-by-category slice tints — the one place a domain colour rides data, because each slice *is* a finance category) — **never** on a CTA, eyebrow, or the primary spend series; **finance-red `#EF4444`** appears **only** as the reinforcing over-budget bar tint, always paired with the `!` glyph + label. Glow uses the size-stepped scale (140px donut primary slice = `--glow-orange-sm`, everything else = none) — warm depth, not neon.
- **Non-shaming (ethical gate, RUBRIC dim 6):** no metric is a verdict — Spent is framed as direction, not failure; an over-budget category is "over by $N — adjust or roll over," not "you failed"; deltas use a **fixed disclosed window** ("vs last month"), never a cherry-picked flattering range; balance dips are neutral troughs; no manufactured scarcity/urgency anywhere on the screen.
- **Accessibility:** every Donut/bar/line/KPI carries a text/`aria-label` equivalent conveying the same value (Donut enumerates "Dining 32%, housing 28%… of $2,870 total spend"; budget bar "Dining, spent $420 of $500, 84 percent" / "Groceries, over budget by $40"; KPI "Spent, $2,870, down 8.1 percent — lower is better"); over-budget + at-limit + completed states use a **visible glyph** (`!` / ✓) **plus** colour — never colour alone (fixes the live red-colour-only over-budget signal); income/expense via **text +/− prefix**, not colour; label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — Donut slice boundaries, bar fills, the Living-Line strokes, milestone dots, and the filled/unfilled boundary all meet ≥3:1 vs background (the white/10 trend grid is decorative-only); interactive chart targets (slices, bars, scrub crosshair, toggle) ≥ 44×44pt; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Copilot Money + Monarch — *stays Balencia via the spend-by-category Donut hero + Living-Line trend charts + warm-glow surfaces on ink-brown, not a slate stat-grid.*
**Pre-grade:** C (66) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the Visualization section is strong on primitives and honesty, but (1) the non-chart surfaces are flat `--color-ink-brown-800` cards with no top-edge highlight or size-calibrated glow; (2) the focal hierarchy claims two heroes (the SIA note "the differentiator" and the KPI strip "at-a-glance") when only the Donut should read focal; (3) domain-header + domain-level-badge + KPI cards are all accent-coloured orange, fighting for focus; (4) microcopy across all state edges is partly unauthored (empty budget → "No budgets yet," but not the constructive reframe); (5) type line-heights are ad-hoc pixels, tracking unspecified; (6) the colour Map section cites locked token values, but the Visualization credits raw hex; (7) contrast pairs are asserted ("title ≥4.5:1 on ink-brown-800") without tabulation.

### Focal hierarchy

One focal point: the **spend-by-category Donut hero** (`CK-P2`, data hero) — the only ≥96px glowing element above the fold, the one visual that answers "where did my money go?" in <2s. Everything else is visibly secondary: the **SIA Coaching Note sits above it as a warm preamble, not a competing hero** (no glow, body type, two-line cap, purple accent only on the left border — emotionally distinct but visually quieter than the Donut). The **KPI strip below the Donut is a support row** (three equal-weight cards, no individual glow, the net footer is textual). The domain header is an orientation affordance (no accent on the "Finance" title itself — the 2pt emerald line stays at the bottom as identity, never on the label). The budget bars, transaction list, savings bar, and trend charts are all visibly secondary by size and motion order. The squint test lands on the Donut's orange primary slice first, then the SIA voice, then the KPI numbers, then the detail.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28pt · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue) · `--shadow-1`. The SIA Coaching Note and the Spend-by-Category Donut card (the two hero surfaces) add `--surface-backplate` (`CK-T02`). The domain header floats on `--color-ink-900` (the status-bar-adjacent zone), no card surface. Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange-sm` (~12px /.35) on the Donut primary (orange) slice only** at the ≥140px scale — a depth mint that lifts the hero without neon swamp; **no glow** on the KPI cards (they are inline at <36px in the stack, per the locked scale), on the budget MacroBars (inline within a card container), on the transaction pill icons (36pt circles at ~15% opacity, decorative tint), or on the trend-chart axes/dots. The budget-bar tracks and the savings-bar track recess over `--track-inset` (`rgba(0,0,0,0.28)` mint). The domain-header accent line stays 2pt emerald at the bottom edge (identity accent, locked). Extends the same depth language to all surfaces so the Donut hero reads as crafted + premium, and no card reads as a flat box.

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: domain-header title "Finance" → `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; level badge "Lv.8" → `--text-eyebrow` (12pt) / 600 / white 70%; SIA message → `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 100%; "ask SIA →" link → `--text-caption` (13pt) / 400 / white 50%; section eyebrow ("may overview", "budgets", "recent transactions", etc.) → the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); KPI amount → `--text-h2` (20pt) / 700 / white 100% with tabular-nums; KPI label (uppercase) → `--text-eyebrow` (12pt / 600 / 0.12em / white 50%); KPI delta → `--text-h3` (17pt) / 600 / white 100% (the arrow symbol carries the colour — `--color-forest-green` for good-direction, `--color-alpha-white-40` for muted attention — the text itself stays neutral); net summary → `--text-body` (16pt) / 400 / white 100%; budget category name → `--text-h3` (17pt) / 600 / white 100%; budget amounts + percentage → `--text-caption` (13pt) / 400 / white 50–70%; transaction merchant → `--text-h3` (17pt) / 600 / white 100%; transaction amount → `--text-h3` (17pt) / 600 / tabular-nums, green (`--color-forest-green`) for income (with "+" prefix), white for expense (with "−" prefix — the sign carries the meaning, never colour alone); transaction date → `--text-caption` (13pt) / 400 / white 50%; "view all" link → `--text-body` (16pt) / 600 / `--color-brand-orange`; Donut hub "spent" sub-label → `--text-caption` (13pt) / 400 / white 50%; chart Y-axis labels → `--text-small` (11pt) / 400 / `--leading-normal` / white 40%; time-toggle segments ("7d" / "30d") → `--text-h3` (17pt) / 600 / `--color-brand-orange` (active) / white 50% (inactive). Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout; the brand period used with intent on eyebrows. ≤2 `--color-brand-orange` accent words per screen (the two accents are: the domain-header left-align of "Finance" title and the "view all budgets" / "view all transactions" links). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale.

### Microcopy (before → after)

The narrative copy is already on-voice (the IA's SIA message, budget rows, transaction list, and savings descriptions are warm and specific). The gap is the **state-edge** strings, now authored to `CK-P5`:

- **KPI strip, no prior month** — *before:* delta reads `—` (a bare dash, honest but blank) → *after (slightly warmer):* kept as `—` (honest: no prior month, not a fabricated comparison); the tiles' `aria-label` discloses the window ("vs last month" — a fixed, disclosed reference, never cherry-picked).
- **Budget category, at-limit (100%)** — *before:* green fill + implied arrival → *after (explicit):* a visible **✓ glyph** + "at limit" label (the glyph+label carry the meaning, never colour alone).
- **Budget category, over-budget** — *before:* red colour alone (a 1.4.11 miss) + no glyph → *after (fixed):* **`!` glyph** + "over by $N — adjust or roll over" label (non-shaming, specific, the glyph + label pair carry the meaning; the bar fill tints `--color-error-red` `--color-domain-fitness` as reinforcement only, paired with the glyph+label); the over-budget bar caps at 100% visually (never drawn longer than the track, which would distort scale).
- **Budget section, day-1 / no budgets** — *before:* "No budgets yet" (neutral) → *after (still warm):* "No budgets yet. Create one to track your spending." + an orange "Create budget" CTA + optional SIA suggestion chips ("dining", "housing", "transport") — never an empty state, never hidden.
- **Transaction swipe-left delete** — *before:* no copy on the red reveal → *after (new):* the trash icon is self-explanatory, but if a confirm modal appears: "Delete this transaction?" with a "cancel" / "delete" pair (never a scary red "delete" button alone — the action is destructive but honest in framing).
- **Spending trend chart, insufficient data (<3 days)** — *before:* "SIA needs a few more days of data" (correct message) → *after (kept):* same; specific and warm, framed as SIA's need, not user failure; the chart shows a faint flat baseline + axes, never a single dot.
- **Savings goal, completed** — *before:* full green bar + implicit arrival → *after (explicit):* green bar + **✓ glyph** + "goal reached" label + optional SIA note ("You've built momentum. Next step?").
- **Net worth / balance trend, loading** — *before:* no message during load → *after (new):* "SIA is analyzing your cash flow — one moment."
- **Error state (financial data fails to load)** — *before:* generic "—" hint text → *after (specific):* "Couldn't load your finances. Pull to refresh." (specific, recovery action named, per-section failure — such as "Couldn't load budgets" if only the budget API fails, independent of the KPI strip).
- **Permission / data-source disclosure (SIA insights)** — *before:* no rationale → *after (new, foundational):* the SIA note card's long-press or a "why is this insight shown?" affordance displays "SIA is making this connection based on your spending patterns and stress data, with a confidence level [metric]. You can review the sources."

No exclamation marks; the brand period used with intent; all SIA copy is specific to the user's own data (the 20% dining-spending spike is a real pattern found in this user's data, never a horoscope-like "many people spend more on Fridays").

### Motion choreography

Locked to `CK-P4` order (hero draws first, then support rises, then numbers count, then SIA settles): **Donut polygon draws** (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`, largest orange slice first → smallest remaining slices) → **hub counts up** (Donut hub reads "total spend $2,870 · this month" in text, 520ms count-up on the total only if dynamic) → **KPI strip cards fade up** (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 80ms stagger, from left to right: income, spent, saved) → **KPI net footer settles** (no motion, text only) → **budget MacroBar`s rise** (width `0 → value`, `--dur-slow` 520ms `--ease-flow`, staggered 60ms per row, on scroll-into-view) → **transaction rows fade in** (`.animate-fade-up`, `--dur-base` 280ms, 60ms stagger, on scroll-into-view) → **spending trend Living Line draws** L→R (stroke-draw, 1200ms `--ease-flow`) with dashed-purple projection drawing **after** the solid-orange past → **net-worth Living Line draws** (below fold, on scroll-into-view, same timings) → **savings bar + optional sparkline rise** (520ms `--ease-flow`, on scroll-into-view). One line motif per surface (the Donut is the polygon, the two trend charts are each a single Living Line — KPI/budget/savings use numbers/bars, never strokes). The SIA Coaching Note fades in with the domain header (`--dur-base` 280ms, 80ms after header), no purple flourish. `prefers-reduced-motion` → all elements at final state instantly; the Donut's full arcs at rest with hub at final value, each Living Line's static form (completed stroke + green end/milestone dots + static dashed-purple tail) preserved, bars at final fills, loops off. No opacity-fade on any stroke (§8).

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | KPI strip at $0/$0/$0 with `—` deltas (honest: no prior month), Donut = ghosted full-ring outline + hub prompt "Log spending to see where your money goes", budget section = "No budgets yet. Create one." + orange CTA + suggestion chips, transaction section = "No transactions yet. Add your first." + illustration (simple icon, no photo), savings = "Set a savings target" card + orange CTA, spending + balance trends = hidden entirely (not enough data) | "Let's set up your finances. Start by adding a transaction or creating a budget." (SIA warmth) | hub shows no total number; `--surface-backplate` on hero card; never a degenerate collapsed ring |
| Loading | KPI strip = skeleton shimmer on amounts + static `—` deltas (label visible); Donut = ring skeleton that **draws into** the real arcs (morphing skeleton, not a swap); budget rows = bar skeleton (track + label shimmer) that **morphs into** drawn bars; transaction rows = row-shape skeleton shimmer; trend charts = axes + faint baseline visible, line skeleton that draws; savings bar = pill skeleton → fill | "SIA is reading your month — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer on Donut, morphs into data (never a blank disc → never a stalled feeling) |
| Empty / partial | Donut = un-categorized spend → **visibly-labelled ghosted remainder arc** (distinct from a zero, not silently folded); un-synced budget category → ghosted/dashed MacroBar (distinct from on-track, not a real 0); missing metric in KPI strip (such as no prior month data) → label + `—` (honest empty, not hidden); transaction list = only synced transactions render, others remain skeleton (not silent failures) | per-zone, on-voice (such as "Meditation spending not yet categorized — add a category" if a category is truly absent) | no-data ≠ zero (ghosted/dashed, never a real 0 fill or a silent omission) |
| Error | KPI strip (if data fails) = "—" hint text + orange "retry" link; budget rows (if fail) = "Couldn't load budgets" section message + orange retry; transaction list = "Couldn't load transactions" + orange retry (independent of budgets); SIA note hidden entirely (not shown empty); a network banner below the sticky header (if applicable) names the failed section | "Couldn't refresh your finances. Pull to refresh." (specific, recovery action named) | calibrated `--color-error-red` only on genuine API/sync failure (never a shaming signal); glyph + word paired ("⚠ Couldn't load" icon + text, never colour-alone) |
| Offline | KPI strip, budget rows, transaction list, savings bar = all show cached data; Donut = last-synced snapshot (with a "cached data" label if available); trend charts = dimmed (50% opacity) with "offline" label; pull-to-refresh dimmed + reason ("Couldn't refresh — you're offline") | "You're offline — showing your last sync." (warm, no shame) | cached data retained (never silently dropped); offline actions honestly dimmed (50% opacity, no haptic) |

### Signature & anti-generic

Ownable moments: the **spend-by-category Donut hero** (the one focal viz that answers a money question unmistakably Balencia — warm-glow orange primary slice, finance-tint remaining slices, hub-named whole), the **Living-Line spend + balance trend charts** (the horizontal continuous-stroke signature, orange effort → green arrival projection, the brand's draw-not-fade motion law), and the **warm-glow-on-ink surfaces** (the craft signature). Anti-generic fixes: the screen avoids a "stat wall" feel by anchoring on one focal Donut (not a 5-chart grid), keeping the transaction list + SIA note as scannable *content* (not visualized), and using the budget MacroBar for honest honesty (capped fill + visible over-budget glyph, never red colour alone). The vertical stack (domain header → SIA note → Donut → KPI strip → budgets → transactions → savings → trends) is broken from flat-card monotony by the Donut hero + varied card heights + section-eyebrow rhythm (`CK-P6`), so it never reads as an undifferentiated grid. The spend-by-category Donut is the one place in Balencia where a domain colour legitimately rides data (each slice *is* a finance category, so the graduated finance-emerald tints answer "which category?" — the exception that proves the rule).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Domain header title ("Finance") | `--color-alpha-white-100` | ≥12:1 on both |
| Level badge ("Lv.8") | `--color-alpha-white-70` | ≥4.5:1 |
| SIA message | `--color-alpha-white-100` | ≥12:1 |
| KPI amount (such as $4,200) | `--color-alpha-white-100` | ≥12:1 |
| KPI delta arrow + text | `--color-forest-green` (good-direction) / `--color-alpha-white-40` (muted) | ≥3:1 (WCAG 1.4.11) |
| Budget category name | `--color-alpha-white-100` | ≥12:1 |
| Budget bar fill (orange) | `--color-brand-orange` | 3.2:1 on track (WCAG 1.4.11) |
| Budget bar fill (green, at-limit) | `--color-forest-green` | 2.8:1 on track (flagged as a viz-build responsibility) |
| Budget over-budget glyph + label | `!` glyph (white) + `--color-error-red` text | glyph + text pair carries meaning (never colour alone) |
| Transaction amount (income) | `--color-forest-green` | 2.8:1 (with "+" prefix for clarity) |
| Transaction amount (expense) | `--color-alpha-white-100` | ≥12:1 (with "−" prefix for clarity) |
| Spending trend line (orange) | `--color-brand-orange` | ≥3:1 vs background (WCAG 1.4.11) |
| Spending trend projection (dashed purple) | `--color-royal-purple` (the sanctioned forecast colour, §11) | ≥3:1 vs background |
| Savings bar fill (green) | `--color-forest-green` | 2.8:1 on track |
| "view all" links | `--color-brand-orange` | 3.2:1 (WCAG 1.4.11) |

Status never colour-alone: **over-budget** = visible **`!` glyph + "over by $N" label** (not red colour); **at-limit** = visible **✓ glyph + "at limit" label**; **income vs expense** = **text `+/−` prefix** (not colour); Donut slices' boundaries and the Living-Line strokes meet ≥3:1 vs background (the `white/10` trend grid is decorative-only, exempt). Every Donut slice, MacroBar, Living-Line stroke, and filled/unfilled boundary carries a text equivalent in `aria-label` ("Dining 32%, Housing 28%, Transport 18%, Other 22% of total $2,870 spend"; "Budgets: Dining spent $420 of $500, 84 percent. Housing spent $1,200 of $1,200, at limit. Transport spent $180 of $300, 60 percent. Groceries over budget by $40 — adjust or roll over."). Focus-visible is standardized to `--focus-ring` (`CK-T03`, 2px orange, 2pt offset) on every focusable element (KPI cards, budget rows, transaction rows, savings goals, time toggle, Donut slices, trend-chart scrub crosshair, "view all" links) — uniform app-wide. Touch targets on KPI cards, rows, and slices ≥44×44pt. Reduced-motion: Donut at final state (all arcs drawn, hub at final value), Living Lines completed (no draw animation, static form preserved), bars at final fills, all stagger-entrance animations collapse to instant.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Primary CTA (FAB) | #FF5E00 | Burnt Orange | 60% — primary action |
| Budget progress bars (under-budget) | #FF5E00 | Burnt Orange | 60% — progress indicator |
| Active chart line (past data) | #FF5E00 | Burnt Orange | 60% — data viz, user's data |
| Time toggle active segment | #FF5E00 | Burnt Orange | 60% — active state |
| "View all" links | #FF5E00 | Burnt Orange | 60% — interactive text |
| Good-direction delta (incl. spend ↓) | #34A853 | Forest Green | 30% — direction-of-good, not raw sign (lower spend is good) |
| Attention delta (e.g. spend rising) | #FFFFFF 66 | White 40% | Muted attention — never alarm-red on a spend delta |
| Income amounts | #34A853 | Forest Green | 30% — positive financial state |
| Positive delta arrows | #34A853 | Forest Green | 30% — growth indicator |
| Savings goal progress | #34A853 | Forest Green | 30% — completion/progress |
| Chart milestone dots | #34A853 | Forest Green | 30% — milestone markers |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA/AI indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Projected trend line (dashed) | #7F24FF | Royal Purple | 10% — AI projection |
| Domain header accent line | #10B981 | Emerald | Domain color — identification only |
| Domain level badge XP icon | #10B981 | Emerald | Domain color — identification only |
| Category icons in transaction rows | Per category | Various | Category identification only |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated surface |
| Primary text | #FFFFFF | White 100% | Headings, amounts |
| Secondary text | #FFFFFF B3 | White 70% | Labels, descriptions |
| Tertiary text | #FFFFFF 80 | White 50% | Captions, meta, timestamps |
| Dividers | #FFFFFF 0D | White 5% | Row separators |

**60/30/10 verification**: Orange dominates interactive elements (FAB, progress bars, links, chart line, toggles). Green appears on success/positive states (income, savings, deltas, milestones). Purple is limited to 3 elements (SIA note bar, SIA avatar, projected trend line). Domain emerald is confined to identity: the header accent line, the level-badge XP icon, and the graduated spend-by-category Donut slice tints — the one place a finance domain colour legitimately rides data, because each slice *is* a finance category (identity-on-its-own-composition, the sanctioned domain-colour-as-data exception); never on a CTA, eyebrow, or the primary spend series. Ratio holds.

---

## Interaction States

### FAB (Floating Action Button)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 56pt orange circle, white "+" icon, --shadow-2, subtle orange glow | — |
| Pressed | scale(0.93), darker orange (#E55500), glow intensifies | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A (always available on this screen) | — |
| Loading | Spinner replaces "+" icon after tap (during navigation) | — |
| Error | N/A | — |
| Success | N/A | — |
| Expanded | Scales up slightly, two mini-FABs animate upward (staggered 80ms) | light impact |

### Transaction Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 background, full opacity | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt around row | — |
| Disabled | 0.4 opacity (e.g., pending transaction with no detail yet) | — |
| Loading | Skeleton shimmer across row | — |
| Error | N/A | — |
| Success | Brief green glow flash on row after edit/categorize (600ms) | success notification |
| Swipe-left | Row slides left revealing red "delete" action (56pt wide, red background, trash icon) | light impact at threshold |

### Budget Category Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer across row | — |
| Error | N/A | — |
| Success | Brief green glow (600ms) after budget edit saved | success notification |

### KPI Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard | — |
| Pressed | scale(0.97), background lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | Skeleton shimmer replacing amount and delta | — |
| Error | "—" placeholder, "retry" text in orange | — |
| Success | N/A | — |

### Savings Goal Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card appearance | — |
| Pressed | scale(0.98), background lightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | Skeleton shimmer | — |
| Error | N/A | — |
| Success | Green glow flash when goal is reached (600ms) + confetti-lite | success notification |

### Time Toggle (7d / 30d)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive segment) | Text white at 50%, no background | — |
| Pressed | scale(0.97) | light impact |
| Focus-visible | 2pt orange ring around entire toggle | — |
| Disabled | 0.4 opacity | — |
| Active segment | Orange text, orange at 15% background pill | — |
| Loading | Shimmer on chart during data fetch | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Transaction row | Push to screen 31 (Transaction Detail) |
| Tap | Budget category row | Push to screen 31 (Budget Detail) |
| Tap | KPI card | Scroll to relevant section |
| Tap | SIA coaching note | Navigate to SIA tab with finance context |
| Tap | FAB | Push add transaction modal |
| Long-press | FAB | Expand to two options (add / scan receipt) |
| Long-press | Savings goal | Open edit goal sheet |
| Swipe left | Transaction row | Reveal delete action |
| Pull-to-refresh | Entire ScrollView | Refresh all financial data |
| Scroll down | FAB | FAB hides (translateY down + fade) |
| Scroll up | FAB | FAB reappears (translateY up + fade) |
| Touch-hold | Spending chart | Show tooltip with exact amount for date |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms after header | 280ms | ease-out-soft |
| KPI strip | Screen enter | Staggered fade-in, each card 80ms apart | 280ms each | ease-out-soft |
| Budget rows | Screen enter (on scroll into view) | Fade-in + translateY(8pt→0), stagger 60ms per row | 280ms each | ease-out-soft |
| Budget progress bars | Scroll into view | Width animates from 0% to actual percentage | 520ms | ease-flow |
| Transaction rows | Screen enter (on scroll into view) | Fade-in, stagger 60ms per row | 280ms each | ease-out-soft |
| Savings progress bar | Scroll into view | Width animates from 0% to actual percentage | 520ms | ease-flow |
| Spending chart line | Scroll into view | Line draws itself from left to right | 1200ms | ease-flow |
| FAB | Screen enter | Scale(0→1) + fade-in, delayed 400ms after screen loads | 280ms | ease-out-soft |
| FAB expand | Long-press | Mini-FABs scale(0→1) + translateY upward, staggered 80ms | 280ms | ease-out-soft |
| FAB hide on scroll | Scroll down | translateY(80pt) + opacity(0) | 160ms | ease-out-soft |
| FAB show on scroll | Scroll up | translateY(0) + opacity(1) | 280ms | ease-out-soft |
| Pull-to-refresh | Pull gesture release | Standard refresh spinner | 280ms | ease-out-soft |
| Time toggle switch | Tap segment | Active pill slides to new position (translateX) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
The finance dashboard is never empty-feeling. SIA fills the void:
- SIA coaching note: "Let's set up your finances. I'll help you create budgets and track spending — start by adding your first transaction."
- KPI strip shows $0 / $0 / $0 with no delta arrows
- Budget section: "No budgets yet" with orange "create budget" button and SIA suggestion chips ("dining", "housing", "transport", "groceries")
- Transactions: "No transactions yet" with illustration of receipt. "Add your first transaction" orange button. SIA note: "You can also tell me in chat — just say 'I spent $30 on lunch'."
- Savings goals: "Set a savings target" card with orange CTA
- Spending chart: Hidden entirely (not enough data)

### Established user (zero state)
- All budgets at $0 spent (start of new month): Progress bars at 0%, fresh month label. SIA note: "New month, fresh start. Your budgets are reset."
- No recent transactions (unlikely but handled): "No transactions this period" with suggestion to add one
- All savings goals completed: Goals show green checkmarks, SIA congratulates

---

## Motivation Adaptation

- **Low motivation**: KPI strip simplified to 2 cards (income, expenses only). Budget section shows only top 2 categories. Transactions show last 3 only. Savings and chart sections collapsed behind "see more" expander. SIA note is gentler: "Here's a quick look at your spending. No pressure."
- **Medium motivation**: Default experience as designed above. 3 KPIs, 3-4 budget categories, 5 transactions, savings visible, chart visible.
- **High motivation**: All KPIs expanded with additional detail (average daily spend, projected month-end). All budget categories visible by default (no "view all" — full list inline). Chart shows both 7d and 30d simultaneously as overlay. Additional section: "spending by domain" breakdown showing cross-domain financial impact.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Domain header title | Sora | Semibold | 20pt | 26pt | white 100% |
| Domain header accent line | — | — | 2pt height | — | #10B981 |
| Level badge | Sora | Semibold | 12pt | 16pt | white at 70% |
| SIA coaching note text | Sora | Regular | 15pt | 20pt | white 100% |
| "ask SIA" link | Sora | Regular | 13pt | 18pt | white at 50% |
| Section eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| KPI amount | Sora | Bold | 24pt | 32pt | white 100% |
| KPI label | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase, +0.12em tracking |
| KPI delta | Sora | Semibold | 13pt | 18pt | #34A853 (good-direction move, incl. spend ↓) / white at 40% (attention move) — never alarm-red on a spend delta |
| Net summary line | Sora | Regular | 15pt | 20pt | white 100% |
| Budget category name | Sora | Semibold | 16pt | 22pt | white 100% |
| Budget amounts | Sora | Regular | 15pt | 20pt | white at 70% |
| Budget percentage | Sora | Regular | 12pt | 16pt | white at 50% |
| Transaction merchant | Sora | Semibold | 16pt | 22pt | white 100% |
| Transaction amount | Sora | Semibold | 17pt | 22pt | white (expense) / #34A853 (income), tabular-nums |
| Transaction date | Sora | Regular | 13pt | 18pt | white at 50% |
| "View all" links | Sora | Regular | 15pt | 20pt | #FF5E00 |
| Savings goal name | Sora | Semibold | 16pt | 22pt | white 100% |
| Savings amounts | Sora | Regular | 15pt | 20pt | white at 70% |
| Savings percentage | Sora | Semibold | 13pt | 18pt | #34A853 |
| Chart Y-axis labels | Sora | Regular | 11pt | 14pt | white at 40% |
| Time toggle segments | Sora | Semibold | 13pt | 18pt | #FF5E00 (active) / white at 50% (inactive) |
| FAB "+" icon | — | — | 24pt | — | white 100% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Financial data fails to load | KPI cards show skeleton shimmer; after timeout: "—" placeholder with "retry" text in orange | Tap retry or pull-to-refresh |
| Budget data fails to load | Budget rows show skeleton shimmer; fallback: "Could not load budgets" | Pull-to-refresh |
| Transaction list fails to load | Transaction rows show skeleton shimmer; fallback: "Could not load transactions" | Pull-to-refresh |
| Savings data fails to load | Savings card shows skeleton shimmer | Pull-to-refresh |
| Spending chart — insufficient data | Chart area shows: "SIA needs a few more days of data" message (< 3 days) | None needed — chart populates automatically with more data |
| SIA coaching note fails | Card hidden entirely (not shown empty) | Pull-to-refresh may reload |
| Pull-to-refresh fails | Standard refresh indicator dismisses; toast: "Could not refresh." (3s) | User pulls again |
| Transaction delete fails | Red "delete" swipe action shows error state; row slides back | User retries swipe-to-delete |
| FAB action — add transaction fails | Modal shows inline error: "Could not save transaction" | User retries from modal |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to previous screen"
- Domain header: "Finance, Level 8"
- Level badge: "Finance level 8, button, navigate to RPG character"
- SIA coaching note: "SIA says, [message text], button, navigate to SIA chat"
- KPI cards: "[Label], [amount], [delta direction] [delta percentage]" (e.g., "Income, $4,200, up 3.2 percent")
- Net summary: "Net, positive $1,330 versus last month"
- Budget rows: "[Category], spent [amount] of [allocated], [percentage] percent" / "[Category], over budget"
- Transaction rows: "[Merchant], [expense/income], [amount], [date]"
- Savings goal: "[Goal name], [current] of [target], [percentage] percent"
- Spending chart: "Spending trend chart, [period] view, [current total]"
- Time toggle: "[Period] selected, segmented control"
- "View all" links: "View all [section], button"
- FAB: "Add transaction, button" (long-press: "Add transaction or scan receipt")

**Focus order:**
1. Back button → Domain title → Level badge
2. SIA coaching note card
3. Monthly overview eyebrow → KPI cards (Income, Spent, Saved) → net summary
4. Budgets eyebrow → budget category rows → "View all budgets"
5. Recent transactions eyebrow → transaction rows → "View all transactions"
6. Savings goals eyebrow → savings goal cards
7. Spending trend eyebrow → time toggle → chart area
8. FAB

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Swipe-left on transaction row for delete; also available via edit mode or detail screen
- Long-press on FAB for expanded options; single tap opens default add flow
- Touch-and-hold on chart shows tooltip; data also conveyed via VoiceOver value descriptions
- Pull-to-refresh reloads all data
- FAB accessible via scroll-up reveal
- All touch targets meet 44pt minimum
- Income/expense distinction conveyed via text prefix (+/-) not just color

---

## Cross-References

- **Navigates to**: Screen 31 — Transaction / Budget Detail (tap transaction or budget row, stack push), Screen 09 — SIA Chat (tap SIA coaching note, tab switch), Screen 14 — Goal Detail (for finance-tagged goals, stack push), Screen 19 — RPG Character Screen (tap domain level badge, stack push)
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link card, stack push)
- **Shared components with**: All domain dashboards (screens 26, 28, 32, 33, 34, 35, 36) share Domain Header and SIA Coaching Note patterns. Screen 31 shares Transaction Row and Budget Category Row.
- **Patterns used**: Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model (from _shared-patterns.md)
- **Patterns established**: Transaction Row, Budget Category Row, Savings Goal Card, KPI Strip, Spending Trend Chart, FAB with long-press expand, scroll-hide FAB behavior
- **Patterns referenced** (established elsewhere): Domain Dashboard Header (Screen 26), SIA Coaching Note Card — Contextual (Screen 30 variant)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-11.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/finance`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B11-F04 | major | navigation | Route budget and transaction rows to distinct contexts and wire the FAB to add/scan transaction flows. |
| B11-F05 | major | retention | Make KPI cards, savings targets, chart toggles, and chart points semantic controls with filtering, expansion, and accessible summaries. |
| B11-F06 | major | trust-privacy | Add source/confidence/context details and a path to manage data used for sensitive financial inferences. |

### Prototype Implications

- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

