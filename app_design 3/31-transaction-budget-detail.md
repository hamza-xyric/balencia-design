# Screen Design: Transaction / Budget Detail

**Screen**: 31 of 73
**File**: 31-transaction-budget-detail.md
**Register**: Product Mode
**Primary action**: review and edit financial record
**Tab**: Me (accessed within Finance dashboard stack)
**Navigation**: Stack depth 3–4 from Me tab root (Me → Explore → Finance → Transaction/Budget Detail). Back button returns to Finance Dashboard (screen 30).

---

## Purpose

This is a dual-purpose detail screen that serves two distinct views depending on the entry point: **Transaction Detail** (viewing/editing a single transaction) or **Budget Detail** (drilling into a budget category to see allocation, spending, and filtered transactions). Both views share the same screen shell but render different content. This keeps the navigation model simple — one "detail" destination from the finance dashboard — while handling two use cases elegantly.

---

## Information Architecture

### Transaction View

**Hierarchy** (what the user sees, in order of visual priority):
1. Transaction amount — the dominant visual element, large and prominent
2. Merchant name and category — who and what type
3. Date/time and receipt photo (if scanned)
4. Notes and tags
5. Edit / delete actions
6. SIA context note — how this transaction connects to life patterns

**User flow**:
- **Arrives from**: Finance Dashboard (screen 30) — tap on transaction row, stack push
- **Primary exit**: Back to Finance Dashboard (screen 30) via back button or swipe-right
- **Secondary exits**: SIA tab (tap SIA note), edit modal (tap edit button)

### Budget View

**Hierarchy** (what the user sees, in order of visual priority):
1. Category name and icon with budget amounts (allocated / spent / remaining)
2. Progress bar — visual indicator of budget health
3. Filtered transaction list — all transactions in this category
4. Edit budget allocation button
5. SIA insight — spending pattern for this category

**User flow**:
- **Arrives from**: Finance Dashboard (screen 30) — tap on budget category row, stack push
- **Primary exit**: Back to Finance Dashboard (screen 30) via back button or swipe-right
- **Secondary exits**: Transaction Detail (tap individual transaction in the filtered list, stack push within same screen), Edit Budget (bottom sheet)

---

## Layout

**Scroll behavior**: ScrollView (Transaction view fits in ~1.5 viewports; Budget view with filtered list may extend further, uses embedded FlatList for the transaction list section)
**Tab bar visible**: Yes

### ASCII Wireframe — Transaction View

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Transaction       ✏️  🗑️   │  Header (56pt)
├─────────────────────────────────┤
│                                 │
│         -$32.50                 │  Amount (48pt tall text)
│        expense                  │  Label (16pt)
│                                 │
│ ┌─────────────────────────────┐ │
│ │  🍽️  Dining                │ │  Category Chip (40pt)
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │  Details Card (~160pt)
│ │  merchant                   │ │
│ │  Uber Eats                  │ │
│ │                             │ │
│ │  date                       │ │
│ │  May 20, 2026 · 12:34 PM   │ │
│ │                             │ │
│ │  notes                      │ │
│ │  "Lunch with Ali"           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │  Receipt Photo (~200pt)
│ │                             │ │  (if present)
│ │    [Receipt image]          │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │  SIA Context Card (~64pt)
│ │ 🟣 SIA: "Your dining       │ │
│ │  spending is your fastest   │ │
│ │  growing category."         │ │
│ └─────────────────────────────┘ │
│                                 │
│  ┌──────────────────────────┐   │  Recategorize Button (48pt)
│  │  recategorize             │   │
│  └──────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘
```

### ASCII Wireframe — Budget View

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Dining             ✏️       │  Header (56pt)
├─────────────────────────────────┤
│                                 │
│  🍽️  Dining                    │  Category (32pt)
│                                 │
│  ┌─────────────────────────────┐│  Budget Overview Card (~128pt)
│  │  allocated                  ││
│  │  $500.00                    ││
│  │                             ││
│  │  spent          remaining   ││
│  │  $420.00        $80.00      ││
│  │                             ││
│  │  ████████████░░░░  84%      ││
│  │                             ││
│  │  12 days remaining          ││
│  └─────────────────────────────┘│
│                                 │
│ ┌─────────────────────────────┐ │  SIA Insight (~64pt)
│ │ 🟣 SIA: "You tend to       │ │
│ │  overspend on dining during │ │
│ │  stressful work weeks."     │ │
│ └─────────────────────────────┘ │
│                                 │
│  transactions in dining         │  Eyebrow
│ ┌─────────────────────────────┐ │
│ │ Uber Eats        -$32.50   │ │  Filtered Transaction List
│ │ Today, 12:34pm              │ │  (FlatList, variable height)
│ ├─────────────────────────────┤ │
│ │ Nandos           -$45.00   │ │
│ │ May 19                      │ │
│ ├─────────────────────────────┤ │
│ │ Starbucks        -$6.80    │ │
│ │ May 18                      │ │
│ ├─────────────────────────────┤ │
│ │ ··· (scrollable list)       │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌────────────────────────────┐  │  Edit Budget Button (56pt)
│ │  edit budget                │  │
│ └────────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘
```

### Component Stack — Transaction View (top to bottom)

1. **Header Bar** — 56pt
   - Purpose: Navigation + edit/delete actions
   - Content: Back chevron, "Transaction" title, edit (pencil) icon, delete (trash) icon, both 44x44pt touch targets

2. **Amount Display** — ~80pt
   - Purpose: Dominant transaction amount
   - Content: Amount in 36pt Sora Bold, white. Expense = "-" prefix, income = "+" prefix in green. Expense/income label below in 13pt Sora Regular, white at 50%.

3. **Category Chip** — 40pt
   - Purpose: Transaction categorization
   - Content: Category icon (20pt) + category name (15pt Sora Semibold) in a pill-shaped chip. Background: category-specific color at 15% opacity. Border: 1pt category color at 30%.

4. **Details Card** — ~160pt
   - Purpose: Transaction metadata
   - Content: Merchant name, date/time, notes. Each field: eyebrow label (11pt, uppercase, white at 40%) + value below (16pt Sora Regular, white).

5. **Receipt Photo** — ~200pt (conditional, only if receipt exists)
   - Purpose: Visual receipt reference
   - Content: Photo in a card with 14pt border-radius, constrained to full-width - 32pt (16pt margins).

6. **SIA Context Card** — ~64pt
   - Purpose: AI insight about this transaction in life context
   - Content: Same pattern as SIA Coaching Note (purple left bar, message text)

7. **Recategorize Button** — 48pt
   - Purpose: Change transaction category
   - Content: Secondary button (ink-brown-800 background, white text, 15pt Sora Semibold, pill shape)

### Component Stack — Budget View (top to bottom)

1. **Header Bar** — 56pt
   - Purpose: Navigation + edit action
   - Content: Back chevron, category name as title, edit (pencil) icon

2. **Category Display** — 32pt
   - Purpose: Category identification with icon
   - Content: Category icon (24pt) + name (20pt Sora Semibold, white)

3. **Budget Overview Card** — ~128pt
   - Purpose: At-a-glance budget health
   - Content: Allocated amount (24pt Sora Bold, white), spent and remaining amounts side-by-side (20pt Sora Semibold: spent in white, remaining in green if positive / red if negative). Progress bar (8pt height). Days remaining in period (13pt Sora Regular, white at 50%).

4. **SIA Insight Card** — ~64pt
   - Purpose: AI pattern recognition for this budget category
   - Content: Same SIA Coaching Note pattern

5. **Filtered Transaction List** — variable (FlatList)
   - Purpose: All transactions in this category
   - Content: Transaction rows (same component as screen 30), filtered to this category. Sorted most recent first.

6. **Edit Budget Button** — 56pt
   - Purpose: Modify budget allocation
   - Content: Full-width primary CTA (orange pill, "edit budget", 17pt Sora Semibold white). Opens bottom sheet with budget editing form.

---

## Components

### Amount Display
- **Purpose**: Hero-sized transaction amount
- **Data source**: Transaction record (amount field)
- **Visual treatment**: Centered. Amount in 36pt Sora Bold, white, tabular-nums. Expenses: white text with "-" prefix. Income: green (#34A853) text with "+" prefix. Label below: "expense" or "income" in 13pt Sora Regular, white at 50%.
- **Variants**: Expense (white), income (green), pending (white at 50% + "pending" badge)
- **Gestures**: None (display only)
- **Size**: Full-width × ~80pt

### Category Chip
- **Purpose**: Shows and allows changing the transaction's category
- **Data source**: Transaction record (category field), category metadata
- **Visual treatment**: Pill-shaped (--r-pill). Background: category color at 15% opacity. Border: 1pt solid category color at 30%. Icon (20pt) + name (15pt Sora Semibold, white). Centered horizontally.
- **Variants**: Each category has its own icon and color pair
- **Gestures**: Tap → opens category picker bottom sheet (for recategorization)
- **Size**: Auto-width (content + 16pt horizontal padding) × 40pt

### Details Card
- **Purpose**: Structured transaction metadata
- **Data source**: Transaction record (merchant, date, notes fields)
- **Visual treatment**: ink-brown-800 card, 20pt border-radius, 16pt padding. Each field: eyebrow label (12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking) + value (16pt Sora Regular, white). Fields separated by 16pt vertical gap. Notes field: if empty, shows "add a note" in orange (15pt Sora Regular), tappable.
- **Variants**: Full (all fields populated), partial (no notes — shows add prompt), no merchant (shows "unknown merchant")
- **Gestures**: Tap "add a note" → inline text input activates. Tap merchant name → no action (display only).
- **Size**: Full-width - 32pt × auto

### Receipt Photo
- **Purpose**: Visual reference for scanned receipt
- **Data source**: Transaction record (receipt_image_url field)
- **Visual treatment**: Image in a card container (14pt border-radius). Constrained: full-width - 32pt (16pt margins), aspect ratio preserved, max-height 240pt. If no receipt: component hidden entirely. Small camera icon button below: "add receipt" (15pt Sora Regular, orange) — only shown when no receipt exists.
- **Variants**: Has receipt (photo displayed), no receipt (hidden or "add receipt" link), loading (shimmer placeholder)
- **Gestures**: Tap photo → full-screen image viewer (modal). Tap "add receipt" → camera/gallery picker. Long-press photo → options (replace, delete).
- **Size**: Full-width - 32pt × aspect-ratio auto (max 240pt)

### Budget Overview Card
- **Purpose**: Complete budget status for a category
- **Data source**: Finance API (budget category detail endpoint)
- **Visual treatment**: ink-brown-800 card, 20pt border-radius, 16pt padding. "Allocated" eyebrow + amount (24pt Sora Bold, white). Below: two columns — "spent" (20pt Sora Semibold, white) and "remaining" (20pt Sora Semibold, green if positive, neutral muted white/40 if over-budget — never red). The progress bar is the `MacroBar` value-vs-limit specced in the Visualization section (`S31-V02`): 8pt height, `--color-alpha-white-08` track over a `--track-inset` recess, `--color-brand-orange` fill, width capped at 100% (an over-budget category never stretches the fill past the track and never recolours to alarm-red). A visible status glyph + word sits beside the bar (✓ on-track ≤90% / ~ near 90–100% / ! over >100%); over-budget appends the overspend amount in words ("$40 over"). Percentage label right-aligned. Days remaining: 13pt Sora Regular, white at 50%.
- **Variants**: Under-budget (orange bar, green remaining, ✓), near (90–100% — orange bar, ~ glyph), over-budget (orange bar capped at 100% + visible "!" glyph + "$N over" + neutral-muted remaining — no red, no pulsing warning icon), complete (100% — bar full, "fully spent" label)
- **Gestures**: None (display only, edit via dedicated button below)
- **Size**: Full-width - 32pt × ~128pt

### Edit Budget Bottom Sheet
- **Purpose**: Modify budget allocation amount
- **Data source**: Current budget allocation, spending history
- **Visual treatment**: Bottom sheet (slides up, --r-xl top corners, ink-brown-800 background). Drag handle (40pt wide, 4pt height, white at 20%, centered). Title: "edit budget" (20pt Sora Semibold, white). Amount input: large number input (28pt Sora Bold, white, tabular-nums) with currency symbol. SIA suggestion: "Based on your 3-month average, $480 would be realistic" (15pt Sora Regular, white at 70%). Save button: full-width orange pill CTA. Cancel: "cancel" text link below.
- **Variants**: Default (current amount pre-filled), SIA suggestion available, no suggestion (new category)
- **Gestures**: Drag down to dismiss. Tap save → submit. Tap cancel → dismiss.
- **Size**: Full-width × ~300pt (from bottom)

### Delete Confirmation
- **Purpose**: Prevent accidental transaction deletion
- **Data source**: None
- **Visual treatment**: Bottom sheet (compact). Warning icon (24pt, orange). "Delete this transaction?" (17pt Sora Semibold, white). "This cannot be undone." (15pt Sora Regular, white at 50%). Two buttons: "delete" (full-width, red background #f44336, white text) and "cancel" (full-width, ink-brown-800, white text).
- **Variants**: Single state
- **Gestures**: Tap delete → confirm deletion, animate row removal, pop to screen 30. Tap cancel → dismiss sheet.
- **Size**: Full-width × ~220pt (from bottom)

---

## Visualization

> Source: no companion file (`31-transaction-budget-detail-visualization-recommendations.md` absent); audited in `viz-audit/` — Batch (Tracker B), findings `S31-V01..S31-V04`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Premium-depth, on-brand (60/30/10), **Product Mode → orange-dominant accent** (category colour stays *identity* only on the chip + donut slice tints — never decorative data ink; SIA purple confined to the coaching-note dot). Benchmark = **Copilot Money + Monarch** (category-breakdown donut, budget bar vs limit, spend trend) rendered **the Balencia way** (warm-glow donut + Living-Line micro-trend), not a Copilot clone. **Current grade C (66) → specced-target A− (85).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working drill/scrub micro-interactions, owned by the later viz-build program.)*

This is a **MEDIUM / Tracker-B detail screen** with two modes. The **Transaction view is deliberately kept calm** — a single transaction is one scalar amount + metadata, which has **no useful chart form**; it stays clean hero text (over-charting it would be the maximalist anti-pattern the rubric penalises). All visualization lives in the **Budget view**, which has the three datasets that genuinely benefit: a *part-of-whole* (how this category's spend splits), a *bounded value-vs-limit* (spent vs allocated), and a *short time-series* (this category's spend trend, today gated to high-motivation as a "mini trend chart"). This section promotes those three to kit primitives and fixes two live defects: the flat over-budget `ProgressBar` and the **specced alarm-red + pulsing-warning over-budget treatment** (a shaming/loss-aversion framing — `S31-V02`). Mints **no** new primitive; it retires kit backlog (`Donut`/`VK-007`, `MacroBar`, `Sparkline`/`VK-001`).

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Category spend split (the $420 across merchants / sub-categories) | not shown | **category-breakdown `Donut` (VK-007)** — slices sum to the true *spent* total, primary slice orange, rest warm-neutral / category-identity tints, hub = total spent | `Donut` (`VK-007`) |
| Spent ($420) vs allocated ($500) + remaining ($80) + % | flat 2-tone `ProgressBar` + bare amounts | **`MacroBar` value-vs-limit** — honest cap at 100% + an **over glyph** past the cap (never a stretched/lying fill or alarm-red) | `MacroBar` (`VK-006`) |
| This category's spend trend (last 4 weeks — high-motivation) | text-only / unbuilt mini chart | **`Sparkline` (VK-001)** — 7-pt curved Living Line, orange, green end dot on the latest week | `Sparkline` (`VK-001`) |
| Budget health (under / near / over) | colour-only bar + red-when-over | **visible status glyph + word** beside the bar (✓ on-track / ~ near / ! over), never colour-alone | (carried by `S31-V02`) |
| Transaction amount (−$32.50) + merchant / date / notes / category / receipt | hero text + chip + card | — (**deliberately textual** — a one-off scalar + identity metadata; no useful visual form) | — |
| Days remaining (12) · allocated / spent / remaining figures | text | — (deliberately textual — the donut hub + MacroBar carry the *visual*; the figures stay clean tabular text beside them) | — |
| Filtered transaction list · SIA note · edit/delete actions | rows / card / buttons | — (deliberately textual — a list is not a chart) | — |

**Editorial hierarchy (calm, not maximal):** the **Donut is the one viz hero** of the Budget view; the `MacroBar` is the honest secondary; the `Sparkline` is an ambient micro-trend (high-motivation only). Three visuals, one focal — and the *entire Transaction view stays text* by design. This is a 3-subsection Tracker-B mini, not a domain dashboard.

### 1 · Category-breakdown donut — `S31-V01` → `Donut` (VK-007), card ~96px

Promote the budget category's composition to the screen's **one viz hero**: a `Donut` (`VK-007`) showing **how this category's spent total splits** — by merchant for a fine category (Uber Eats / Nandos / Starbucks / Sweetgreen) or by sub-category for a broad one. Sits **above** the `MacroBar` in the Budget Overview Card.
- **Honest whole (non-negotiable, RUBRIC dim 5):** slices **sum to the true `spent` total** the user can name ($420), **not** the allocation and **not** a padded figure; the hub reads the **total spent** (`text-h2`) + a sub-label naming the whole ("spent of $500"). The remaining-vs-allocated gap is shown in **hub/MacroBar text, never as a phantom slice** (a "remaining" wedge would lie about composition). A $0 sub-category is **omitted**, never a zero-width wedge.
- **Depth (token-backed):** **largest slice = `--color-brand-orange`**; remaining slices = warm neutral tints (`--color-alpha-white-40`, `--color-alpha-white-20`) or, where each slice *is* a category, `--color-domain-*`/category-identity tints (identity only); **never rainbow, never purple** (no SIA-originated slice here). 2px gap between slices (reveals `ink-brown-800` for carved separation); consistent inner-radius; `--glow-orange-sm` (~12px, **mint** `VK-017`) on the primary slice only (≥48px); faint radial backplate; `--track-inset` `rgba(0,0,0,0.28)` **(mint)** under the ring.
- **Micro-interaction:** tap a slice → highlight + filter the transaction list below to that merchant/sub-category; tap hub → no-op (display).
- **States:** **empty / cold-start** (no transactions this period) → a **ghosted full-ring outline** + hub prompt ("No spending in Dining yet") — **never** a collapsed disc or a misleading 100%-of-one-category ring; **partial** → logged slices + a ghosted remainder arc; **loading** → ring skeleton that draws into the real arcs.
- **Data:** `budgetDetail.transactions` aggregated by merchant (already in `mock.ts`); sums to `budgetDetail.spent` (420).

### 2 · Budget vs limit — honest MacroBar + over glyph — `S31-V02` → `MacroBar` (VK-006)

Replace the flat 2-tone `ProgressBar` with a depth-passed **`MacroBar`** value-vs-target: **spent ($420) vs allocated ($500)**, `--color-alpha-white-08` track over a `--track-inset` **(mint)** recess, `--color-brand-orange` fill, width = spent/allocated, count-up width 0→% on mount, value-vs-target label ("$420 / $500 · 84%").
- **Honest cap + over glyph (the key fix):** the fill **caps at 100%** of the bar width — an over-budget category **never stretches the fill past the track** (a dishonest >100% bar) and **never recolours to alarm-red** (the current spec's red bar + *pulsing warning icon* is a **shaming / loss-aversion** treatment — replaced here). Instead, over-budget shows a **visible `!` over glyph + the overspend amount in words** ("$40 over") at the bar end, and the remaining figure flips to a **neutral muted** treatment, not red. On-track ≤90% → ✓; near (90–100%) → ~ ; over (>100%) → ! — **status always glyph + word, never colour-alone** (this also satisfies the existing a11y note "budget health conveyed via text not just bar color").
- **Non-shaming (ethical gate, RUBRIC dim 6):** over-budget is framed as **state + a lever** ("$40 over — SIA can suggest a realistic limit"), never a verdict or a guilt pulse; the "fully spent" / "over" edge is handled in **text + glyph**, never by distorting the bar or alarming the colour.
- **Data:** `budgetDetail.spent` / `budgetDetail.allocated` / `budgetDetail.remaining` (`mock.ts`).

### 3 · Spend micro-trend — `S31-V03` → `Sparkline` (VK-001), high-motivation

The high-motivation "mini trend chart for this category (spending over the last 4 weeks)" becomes a **`Sparkline`** (a tiny Living Line): **exactly 7 points** (weekly category spend resampled to 7), `--stroke-thin` 2px **curved** orange, **no axes / grid / glow**, **green end dot** when the latest week is the period high. Caption keeps "4-week trend · avg $/wk". Shown **only at high motivation** (per Motivation Adaptation) — deliberately *not* forced onto the calm default.
- **Non-shaming:** a rising trend is framed neutrally (momentum), never "you're spending more"; the Sparkline carries no alarm tint.
- **States:** single week → one dot, no line; no history → flat **ghosted** dashed line (no-data ≠ a real flat $0) + "more weeks sharpen your trend"; loading → draws into shape on scroll-into-view.
- **Data:** new `budgetDetail.categoryTrend` (4 weekly points, resampled to 7) in `mock.ts`.

### 4 · Transaction view — deliberately textual — `S31-V04`

The **Transaction view stays unvisualized by design.** A single transaction is **one scalar amount** (−$32.50) + identity metadata (merchant, date, notes, category chip, receipt) — none of which has a useful chart form. The hero amount keeps its `text-display` weight (the existing scale(0.9→1.0) entrance is the right craft); the category chip keeps its category-identity colour (identity, not data ink). The high-motivation "spending in this category this month: $420 of $500" line is rendered as a **clean inline figure**, *not* a second mini-bar (it would duplicate the Budget view's `MacroBar` and add chart-noise to a detail screen). This is an intentional **deliberately-textual** resolution, scored as *resolved* under RUBRIC dim 1 — not an omission.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **Budget-view hero draws first** — the `Donut` arcs **sweep clockwise from 12 o'clock**, **largest → smallest** (primary orange slice first) via `stroke-draw` (`--dur-flow` 1200ms `--ease-flow`), hub counts up 520ms — **then** the `MacroBar` fill rises 0→% (`--dur-slow` 520ms `--ease-flow`) — **then** (high-motivation) the `Sparkline` **draws itself** L→R on scroll-into-view (520ms) — **then** the filtered transaction rows stagger in (existing 60ms/row). One line motif per surface (the Sparkline is the only Living Line; the donut is arcs). The Transaction view keeps its existing amount scale-in + staggered card fades (no chart motion — none is needed). `prefers-reduced-motion` → every visual at final state instantly: donut arcs at rest, hub at final value, MacroBar at final width, Sparkline as a completed stroke + green end dot.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1 (Budget view, no transactions)** — donut = ghosted full-ring outline + "No spending in Dining yet" hub prompt (never a collapsed/100%-of-one disc), MacroBar at 0% with "$0 / $500 · budget fully available" + ✓, Sparkline ghosted-dashed "more weeks sharpen your trend"; the existing green "100% remaining" zero-state copy maps onto the MacroBar's full-available ✓ state (kept, not contradicted). **loading** — depth-preserving skeletons that *morph* into drawn data (donut ring skeleton → arcs, MacroBar track → fill, Sparkline flat → curve), never blank discs. **partial** — logged donut slices + a ghosted remainder arc, distinct from a real zero. **error** — chart-specific honesty per the Error Handling table ("Could not load budget" on the overview card, transaction list independent) + a visible "retry"; **Transaction view** has no chart states (text only).
- **60/30/10:** **orange dominates** data ink — the donut primary slice, the MacroBar fill, the Sparkline stroke, the edit-budget CTA and interactive links. **Green** = arrival/healthy only — positive remaining figure, Sparkline milestone end dot, recategorize/save success flash. **Purple stays SIA-only** — the coaching-note dot/border (no chart-purple on this screen; there is **no** projection here). **Category/domain colour** is confined to **identity** — the category chip + the donut's per-category slice tints — **never** a CTA, eyebrow, or generic series. **Red retires from data semantics:** the over-budget bar is **no longer red** (was a shaming alarm); error-red stays confined to the **destructive delete** affordance only. Glow uses the size-stepped scale (donut primary slice = `--glow-orange-sm` ~12px at ≥48px; MacroBar/Sparkline = none) — warm depth, not neon.
- **Non-shaming (ethical gate):** an over-budget category is framed as **state + a reclaimable lever**, never a verdict or a loss-aversion pulse; the `MacroBar` never lies past 100% and never alarms; the Sparkline never tints a rise as failure; no manufactured urgency on the edit-budget flow.
- **Accessibility:** every visual carries a text/`aria-label` equivalent conveying the same value — donut: "Dining spend $420: Uber Eats $32.50, Nandos $45, … of $500 allocated"; MacroBar: "Spent $420 of $500, 84 percent, on track" (or "$40 over"); Sparkline: "4-week dining trend, average $X per week, latest week highest." Budget health uses a **visible glyph** (✓ / ~ / !) **plus** the word, never colour alone. Label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — donut slice arcs + boundaries, the MacroBar fill + filled/track boundary, and the Sparkline stroke + end dot all meet ≥3:1 vs background (the `white/08` track and any decorative backplate are exempt); interactive slice/row targets ≥ 44×44pt; `prefers-reduced-motion` renders all visuals at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Copilot Money + Monarch — *stays Balencia via the warm-glow donut composition, honest MacroBar with glyph, and the brand period on empty states.*
**Pre-grade:** C+ (70) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): The Visualization section is strong (A− at 85 with three primitives, donut/MacroBar/Sparkline all specced to depth and honesty), but the craft layer has gaps: (1) the non-viz surfaces (Details Card, Budget Overview Card, SIA note, section eyebrows) are flat `--color-ink-brown-800` with no top-edge highlight or layered depth; (2) empty states and loading states are text-only, not designed layouts; (3) microcopy (empty-state lines, error messages, the "no receipt" affordance, over-budget framing) is partly unwritten; (4) the MacroBar's depth language (track recess, glow) is specced but not reconciled in Components; (5) type scales are ad-hoc pixels, not the `CK-P3` locked scale; (6) the Recategorize button and Edit Budget modals lack full interaction states; (7) contrast pairs for data-viz elements (donut slices, MacroBar, Sparkline) are asserted but not tabulated. Resolving these elevates the screen to premium craft.

### Focal hierarchy

One focal point: the **Budget Overview Card's donut visualization** (`CK-P2`, data hero) — the **only ≥96px element above the fold in Budget view**, the first thing the eye lands on when drilling from the Finance Dashboard. Within the card, the donut is rendered as a **large arc path** (drawing itself on entrance), the hub **Life Power-style counter** (the spent total, text-display weight with orange glow), and the hub sub-label ("spent of $500") below. Everything else is visibly secondary: the MacroBar is the honest secondary (a 8pt track under the donut); the filtered transaction list, SIA insight, and edit-budget button are clearly below-fold. The Transaction view has **no focal viz** (no chart) — deliberately textual by design (the amount display is a scalar, not visualized); the Amount display is the typographic hero, sized and timed (scale entrance) appropriately. The squint test in Budget view lands on the donut hub first, then the MacroBar numbers, then the transaction rows.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28px · 1px `--glass-border` · **`CK-T01 --edge-highlight` top-edge highlight** (the not-flat cue, critical on all detail screens, previously absent) · `--shadow-1`. The hero surfaces (Budget Overview Card) add **`CK-T02 --surface-backplate`** (faint orange radial gradient, warm depth without neon). The Details Card, SIA Context Card, Recategorize Button all receive the same layering. Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange` (32px)** on the ≥96px donut hub only (the sun-hub is the focal glow); **`--glow-orange-md` (~20px)** on the MacroBar's fill line as it animates in (a secondary glow, subtle warmth); **no glow** on inline elements (the donut rim, Sparkline, transaction rows). The MacroBar track is `--color-alpha-white-08` over a **`--track-inset`** recess (`rgba(0,0,0,0.28)`) — a depth pass that fixes the prior flat 2-tone appearance; rounded-pill caps on both ends. The donut ring carries `--track-inset` beneath as a carved separation line. Sparkline carries no glow (a 2px stroke on a micro chart). All surfaces read layered, never flat.

### Typographic rhythm

Re-map the Typography table to `CK-P3` locked scale: **Transaction amount** `--text-display-xl` 40px / 700 / `--leading-tight` (1.1) / tabular-nums / white 100%; **Expense/income label** `--text-small` 11px / 400 / `--leading-normal` / white 50%; **Category chip text** `--text-h3` 17px / 600 / `--leading-snug` (1.25) / white 100%; **Details card eyebrow** `--text-eyebrow` 12px / 600 / `--tracking-eyebrow` (+0.12em) / uppercase / white 40%; **Details card value** `--text-body` 16px / 400 / `--leading-normal` (1.4) / white 100%; **Budget category display** `--text-h2` 20px / 600 / `--leading-snug` / white 100%; **Budget allocated amount** `--text-display-l` 32px / 700 / `--leading-tight` / white 100% / tabular-nums; **Budget spent/remaining** `--text-h2` 20px / 600 / `--leading-snug` / white (spent) · `--color-forest-green` 100% (remaining, positive) · `--color-alpha-white-40` (remaining, over-budget — never red); **Budget status glyph + word** `--text-body` 16px / 400 / `--leading-normal` / white 100% (✓ on-track / ~ near / ! over, paired always, never colour-alone); **Budget days remaining** `--text-caption` 13px / 400 / `--leading-normal` / white 50%; **Filtered transaction eyebrow** `.eyebrow` recipe (12px / 600 / `--tracking-eyebrow` / uppercase / white 40%); **Edit budget CTA** `--text-h3` 17px / 600 / `--leading-snug` / white 100% (in pill, `--color-brand-orange` bg); **SIA context card text** `--text-body` 16px / 400 / `--leading-normal` / white 100%; **Recategorize button** `--text-h3` 17px / 600 / white 100% (secondary pill, ink-brown-800 bg). Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words per screen (edit/delete icons are non-text; the two accent *words* are "add" and "edit"). Stat figures tabular-nums. Chillax logo-only (none on this screen). Replaces ad-hoc pixels with locked `CK-T04` and `CK-T05` (leading and tracking).

### Microcopy (before → after)

**Transaction view, notes field, empty** — *before:* no affordance → *after:* "add a note" (15pt, `--color-brand-orange`, tappable). **Budget view, zero category state** — *before:* bare "no transactions yet" → *after:* "No spending in Dining yet. Budget fully available." (frames state constructively). **Receipt photo, no receipt** — *before:* hidden silently → *after:* "add receipt" link (15pt, `--color-brand-orange`) visible immediately below hint text. **Budget over-budget, remaining** — *before:* "-$40" in red (`--color-error-red`) + pulsing warning (shaming, loss-aversion) → *after:* MacroBar fill **caps at 100%** with visible **"! $40 over"** glyph+word label inline; remaining shows `--color-alpha-white-40` (neutral, never red); copy is "Over by $40 — adjust allocation or roll over" (state + lever, not verdict). **Recategorize button loading** — *before:* no message → *after:* chip shimmer during recategorization; on completion, brief green glow (600ms) + new chip fades in. **Delete confirmation** — *before:* kept (already on-voice) → *after:* "Delete this transaction? This cannot be undone." **SIA context card** — *before:* generic "You tend to overspend on dining during stressful work weeks" (horoscope-like) → *after:* "Your dining spend jumps 40% in months with 3+ all-nighters. Breathe, plan meals on stress days." (specific to user data, frames as observable pattern, suggests constructive next step). **Loading state** — *before:* generic spinner → *after:* "SIA is reading your spending…" (warm, specific, no exclamation). **Error state, transaction delete fails** — *before:* toast "Could not delete" → *after:* "Couldn't delete transaction. Try again or pull to refresh." (specific reason, recovery action named). **Budget pull-to-refresh success** — *before:* silent → *after:* brief toast "Budget updated" (warm, specific confirmation). All strings follow the brand period rule (used with intent, never scattered). SIA strings are specific to user's own data (real connection-spotted patterns, never generic). No exclamation marks.

### Motion choreography

Locked to `CK-P4` order (draw-first): **Budget view (hero draws first):** (1) Donut arcs draw (`stroke-animate`, `--dur-flow` 1200ms `--ease-flow`) — largest (primary orange) slice first, clockwise from 12 o'clock, smallest last; (2) Donut hub counts up (520ms `--dur-slow` `--ease-flow`) — spent total animates 0 to final; (3) MacroBar fill animates `0 → spent/allocated %` (520ms `--dur-slow` `--ease-flow`) + `--glow-orange-md` glow on fill; (4) SIA insight card fades in + translateY(12→0) (280ms `--dur-base` `--ease-out-soft`); (5) Filtered transaction rows stagger in (280ms `--dur-base` each, 60ms stagger); (6) Sparkline draws L→R on scroll-into-view (520ms `--dur-slow`, high-motivation only). **Transaction view (text-only):** Amount display scale(0.9→1.0) + fade-in (280ms); Category chip fade-in (80ms after, 280ms); Details card fade-in + translateY (staggered, 280ms, 80ms stagger); Receipt photo fade-in (optional, 80ms after details); SIA context card fade-in + translateY (280ms); Recategorize button fade-in (last). **Modals:** Bottom sheet slide up + backdrop fade-in (520ms `--dur-flow`); Dismiss: slide down + backdrop fade-out (280ms `--dur-base` `--ease-out-soft`). **`prefers-reduced-motion`:** all at final state instantly — donut arcs fully drawn + hub at final count, MacroBar at final width, Sparkline completed stroke with green end dot, all text cards at rest. No loops, no opacity-fade on strokes.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (Budget view, no transactions) | Donut = ghosted full-ring outline (no slices) + "No spending in Dining yet" in hub, MacroBar at 0% with "budget fully available", Sparkline ghosted-dashed, filtered list empty with prompt, Edit Budget button active | "No spending in Dining yet. Budget fully available."; "log your first transaction to get started →" link (orange, tappable) | hub shows no spent number; `--surface-backplate`; never collapsed disc |
| Loading | Depth-preserving skeletons (donut ring + spoke outlines, MacroBar track + label outline, Sparkline dashed outline) morphing into drawn data | "SIA is reading your spending — one moment." | skeleton on `--color-ink-brown-800`, radial shimmer (not spinner swap) |
| Empty / partial | Logged donut slices (if any) + ghosted remainder arc (visually distinct from zero); un-synced domains = dashed/ghosted rows in list (marked "awaiting sync") | "2 of 3 merchants synced — check back soon." | no-data ≠ zero (ghosted ring arc, not real wedge) |
| Error | Donut shows cached slices if available, else skeleton + "Could not load budget"; MacroBar shows cached or skeleton; list shows cached or "Could not load transactions" + retry | "Couldn't load budget — pull to refresh." | calibrated `--color-error-red` only on genuine sync failure (small icon + red label, never colour-alone) |
| Offline | All sections show cached data; pull-to-refresh dimmed with reason | "You're offline — showing your last sync." | actions honestly dimmed (50% opacity, no haptic) |

**Transaction view states:** **Loading** — Amount skeleton + Details skeleton (3 field rows) | "SIA is loading your transaction…" | skeleton on `--color-ink-brown-800`. **Error** — Amount "Could not load" + details skeleton | "Couldn't load transaction — pull to refresh." | red outline on error zone. **Receipt missing** — "add receipt" link (orange, 15pt) visible below hint text | "add receipt" link text | link inline, tappable immediately.

### Signature & anti-generic

Ownable moments: the **donut visualization** (slices sum to *true spent* total, never phantom "remaining" wedge — honest composition, Balencia way) · the **MacroBar with visible glyph + word** (✓ on-track / ~ near / ! over, never colour-alone — frames budget health as state, not alarm) · the **warm-glow-on-ink surface craft** (top-edge highlight, layered depth on every card, `--surface-backplate` on hero) · the **non-shaming over-budget framing** (capped fill, neutral muted remaining, "adjust or roll over" copy — the brand's ethical stance). Anti-generic fixes: Budget Overview Card broken from flat data-tile monotony by focal donut (largest, glowing) + secondary MacroBar (smaller, subordinate) + clear hierarchy — never card-grid wall. Details Card in Transaction view not flat: top-edge highlight, layered depth, glassmorphism border. Filtered transaction list is deliberate FlatList (not grid), sorted most-recent first (natural cognitive order). "add receipt" affordance visible immediately (not hidden silently) — premium, honest detail.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`): **Transaction amount** `--color-alpha-white-100` ≥12:1 | **Category chip text** `--color-domain-*` ≥3:1 (WCAG 1.4.11, identity-only) | **Budget spent** `--color-alpha-white-100` ≥12:1 | **Budget remaining (positive)** `--color-forest-green` ≥3:1 (WCAG 1.4.11) | **Budget remaining (over-budget)** `--color-alpha-white-40` ≥4.5:1 (neutral, never red) | **MacroBar status glyph + word** `--color-alpha-white-100` + `--color-brand-orange` ≥3:1 paired (glyph + word, never colour-alone) | **Donut slice boundaries** ≥3:1 at slice boundary (WCAG 1.4.11, via 2px `--color-ink-brown-800` gap + contrast) | **Sparkline stroke** `--color-brand-orange` ≥3:1 (line + end dot both visible) | **Edit Budget CTA** `--color-alpha-white-100` on `--color-brand-orange` ≥4.5:1 | **"add a note" link** `--color-brand-orange` ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) | **Delete icon (red on hover)** `--color-error-red` ≥3:1 (destructive action only). Status never colour-alone: glyph (✓ / ~ / !) + word ("on-track" / "near" / "over") + numeric remaining value paired. All interactive elements ≥44×44pt (edit/delete icons, category chip, "add a note" link, edit budget button, transaction rows, receipt photo). Focus-visible: unified `--focus-ring` (`CK-T03`, 2px orange, 2px offset) app-wide on every focusable element. `prefers-reduced-motion`: all visuals at final state, no loops; Living Line's static form (orange fill at value) and Sparkline's completed stroke with green end dot preserved.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Edit budget CTA | #FF5E00 | Burnt Orange | 60% — primary action |
| "Add a note" / "add receipt" links | #FF5E00 | Burnt Orange | 60% — interactive text |
| Budget progress bar (under-budget) | #FF5E00 | Burnt Orange | 60% — progress indicator |
| Recategorize button text (if styled as link) | #FF5E00 | Burnt Orange | 60% — action |
| Income amount text | #34A853 | Forest Green | 30% — positive financial state |
| Budget remaining (positive) | #34A853 | Forest Green | 30% — healthy budget |
| SIA context card left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Category chip background/border | Per category | Domain/category colors | Identification only |
| Budget progress bar (over-budget) | #FF5E00 | Burnt Orange | Fill capped at 100% — never red; over = visible "!" glyph + "$N over" |
| Budget remaining (over-budget) | #FFFFFF 66 | White 40% (neutral muted) | Over-budget shown neutrally — never red, never shaming |
| Delete confirmation button | #f44336 | Red (error) | Destructive action — the ONLY calibrated-red use on this screen |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Amounts, headings |
| Secondary text | #FFFFFF B3 | White 70% | Labels, values |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, captions |

**60/30/10 verification**: Orange on primary CTA, interactive links, the budget MacroBar fill, and the donut primary slice. Green on income and positive/in-range budget states only (positive remaining, donut/Sparkline arrival). Purple limited to SIA indicator elements (2 instances). Red confined to the destructive Delete affordance only — never on a budget level or remaining figure (over-budget is orange-capped bar + visible "!" glyph + neutral-muted remaining). Category colour stays identity-only (chip + donut slice tints). Ratio holds.

---

## Interaction States

### Edit Icon (Header)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White pencil icon, 20pt, in 44x44pt touch area | — |
| Pressed | White at 60%, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (when in edit mode already) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Delete Icon (Header)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White trash icon, 20pt, in 44x44pt touch area | — |
| Pressed | Red tint (#f44336), scale(0.95) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Spinner replaces icon during deletion | — |
| Error | Red flash, icon returns | error notification |
| Success | Check icon briefly replaces trash (600ms), then screen pops | success notification |

### Category Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Pill with category color background/border | — |
| Pressed | scale(0.97), background opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Shimmer on chip during recategorization | — |
| Error | N/A | — |
| Success | Brief green glow (600ms) after recategorization | success notification |

### Edit Budget CTA (Budget View)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) pill, white text "edit budget" | — |
| Pressed | Darker orange (#E55500), scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (during save operation) | — |
| Loading | White spinner replaces text | — |
| Error | Red border flash | error notification |
| Success | Green glow (600ms), text briefly shows "saved" | success notification |

### Transaction Row (in Budget View filtered list)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer | — |
| Error | N/A | — |
| Success | Green glow (600ms) after edit | success notification |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back chevron | Pop to Finance Dashboard (screen 30) |
| Tap | Edit icon | Toggle edit mode (inline field editing) |
| Tap | Delete icon | Present delete confirmation bottom sheet |
| Tap | Category chip | Present category picker bottom sheet |
| Tap | "Add a note" | Activate inline text input |
| Tap | Receipt photo | Full-screen image viewer (modal) |
| Tap | "Add receipt" | Camera/gallery picker |
| Tap | Transaction row (budget view) | Push to Transaction Detail view |
| Tap | Edit budget CTA | Present edit budget bottom sheet |
| Swipe right from edge | Screen | iOS back gesture — pop to screen 30 |
| Long-press | Receipt photo | Options (replace, delete) |
| Drag down | Bottom sheets | Dismiss sheet |
| Pull-to-refresh | ScrollView (budget view) | Refresh budget and transaction data |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Amount display | Screen enter | Scale(0.9→1.0) + fade-in | 280ms | ease-out-soft |
| Category chip | Screen enter | Fade-in, 80ms after amount | 280ms | ease-out-soft |
| Details card | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Receipt photo | Screen enter | Fade-in, 80ms after details | 280ms | ease-out-soft |
| SIA context card | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Budget overview card | Screen enter | Fade-in + translateY(12pt→0) | 280ms | ease-out-soft |
| Budget progress bar | Screen enter | Width 0% → actual (after card fade-in completes) | 520ms | ease-flow |
| Filtered transaction list | Screen enter | Staggered fade-in, 60ms per row | 280ms each | ease-out-soft |
| Bottom sheets | Trigger (tap) | Slide up from bottom + backdrop fade-in | 520ms | ease-out-soft |
| Bottom sheets | Dismiss | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| Delete confirmation | After confirmed | Row dissolves (opacity → 0, height → 0) then screen pops | 280ms + 280ms | ease-out-soft |
| Category chip change | After recategorize | Crossfade old → new chip (color and icon transition) | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- **Transaction view**: Cannot reach this screen without a transaction, so no empty state needed
- **Budget view**: "No transactions in this category yet. Add one, or tell SIA what you spent." Orange "add transaction" button + SIA suggestion link.

### Established user (zero state)
- **Budget view with no transactions this period**: "No spending in [category] this month. Budget fully available." Shows full green progress bar (inverted — 100% remaining). SIA note: "Clean slate for [category] this month."

---

## Motivation Adaptation

- **Low motivation**: Transaction view shows only amount, merchant, date. Details card collapses notes section. SIA context card hidden. Budget view shows only overview card and edit button — filtered transactions collapsed behind "see transactions" expander.
- **Medium motivation**: Default experience as designed. All sections visible.
- **High motivation**: Transaction view adds "spending in this category this month: $420 of $500" summary line below the amount. Budget view adds a mini trend chart for this category (spending over the last 4 weeks). SIA insight is more detailed with data sources visible.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title ("Transaction" / category name) | Sora | Semibold | 17pt | 22pt | white 100% |
| Transaction amount (expense) | Sora | Bold | 36pt | 44pt | white 100%, tabular-nums |
| Transaction amount (income) | Sora | Bold | 36pt | 44pt | #34A853, tabular-nums |
| Expense/income label | Sora | Regular | 13pt | 18pt | white at 50% |
| Category chip text | Sora | Semibold | 15pt | 20pt | white 100% |
| Details card eyebrow | Sora | Semibold | 12pt | 16pt | white at 40%, uppercase, +0.12em tracking |
| Details card value | Sora | Regular | 16pt | 22pt | white 100% |
| "Add a note" prompt | Sora | Regular | 15pt | 20pt | #FF5E00 |
| SIA context card text | Sora | Regular | 15pt | 20pt | white 100% |
| Recategorize button text | Sora | Semibold | 15pt | 20pt | white 100% |
| Budget category display | Sora | Semibold | 20pt | 26pt | white 100% |
| Budget allocated amount | Sora | Bold | 24pt | 32pt | white 100% |
| Budget spent/remaining | Sora | Semibold | 20pt | 26pt | white (spent) / #34A853 if positive · white/40 neutral-muted if over-budget (remaining) — never #f44336 |
| Budget days remaining | Sora | Regular | 13pt | 18pt | white at 50% |
| Budget percentage | Sora | Regular | 12pt | 16pt | white at 50% |
| Filtered transaction eyebrow | Sora | Semibold | 12pt | 16pt | white at 50%, uppercase |
| Edit budget CTA | Sora | Semibold | 17pt | 22pt | white 100% |
| Bottom sheet title | Sora | Semibold | 20pt | 26pt | white 100% |
| Bottom sheet amount input | Sora | Bold | 28pt | 36pt | white 100%, tabular-nums |
| SIA suggestion text | Sora | Regular | 15pt | 20pt | white at 70% |
| Delete confirmation heading | Sora | Semibold | 17pt | 22pt | white 100% |
| Delete confirmation body | Sora | Regular | 15pt | 20pt | white at 50% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Transaction data fails to load | Skeleton shimmer on amount and details; after timeout: "Could not load transaction" | Back and retry, or pull-to-refresh |
| Budget data fails to load | Skeleton shimmer on overview card and transaction list | Pull-to-refresh |
| Transaction delete fails | Delete icon shows red flash, returns to default; toast: "Could not delete" | User retries delete |
| Category recategorization fails | Category chip shows shimmer briefly, reverts to original category; toast: "Could not update category" | User retries recategorization |
| Edit budget save fails | "edit budget" CTA shows red border flash; inline error in bottom sheet: "Could not save. Try again." | User retries save in bottom sheet |
| Note save fails | Inline text input shows red border; toast: "Could not save note" (3s) | User retries save |
| Receipt upload fails | "add receipt" link shows error state; toast: "Could not upload receipt" | User retries upload |
| SIA context card fails to load | Card hidden (not shown empty) | Pull-to-refresh may reload |
| Filtered transaction list fails | "Could not load transactions" placeholder in list area | Pull-to-refresh |

---

## Accessibility

**Screen reader labels:**
- Back button: "Back, navigate to Finance Dashboard"
- Edit icon: "Edit transaction, button"
- Delete icon: "Delete transaction, button, destructive"
- Amount display: "[Expense/Income], [amount]"
- Category chip: "[Category name], button, tap to recategorize"
- Details fields: "[Field label], [value]" (e.g., "Merchant, Uber Eats")
- "Add a note" prompt: "Add a note, button"
- Receipt photo: "Receipt photo, button, tap to view full screen"
- "Add receipt" link: "Add receipt photo, button"
- SIA context card: "SIA insight, [text], button, navigate to SIA chat"
- Recategorize button: "Recategorize transaction, button"
- Budget overview: "[Category] budget, allocated [amount], spent [amount], remaining [amount], [percentage] percent, [days] days remaining"
- Edit budget CTA: "Edit budget, button"
- Transaction rows (budget view): "[Merchant], [amount], [date], button"
- Delete confirmation: "Delete this transaction? This cannot be undone."

**Focus order:**
- Transaction view: Back button → Edit icon → Delete icon → Amount display → Category chip → Details card fields → Receipt photo / "Add receipt" → SIA context card → Recategorize button
- Budget view: Back button → Edit icon → Category display → Budget overview card → SIA insight card → "Transactions in [category]" eyebrow → filtered transaction rows → Edit budget CTA

**Gesture alternatives:**
- Swipe-right-from-edge (back) also available via back button tap
- Bottom sheets dismissable via drag-down or "Cancel" button
- Long-press on receipt photo provides Replace/Delete options; also available via edit mode
- Pull-to-refresh available in budget view
- All touch targets meet 44pt minimum
- Budget health conveyed by a visible status glyph (✓ on-track / ~ near / ! over) plus the word and the numeric percentage/remaining amount — never bar colour alone

---

## Cross-References

- **Navigates to**: Screen 30 — Finance Dashboard (back navigation), Screen 09 — SIA Chat (tap SIA context card), Category picker bottom sheet (tap category chip), Edit budget bottom sheet (tap edit budget CTA), Full-screen image viewer (tap receipt photo)
- **Navigates from**: Screen 30 — Finance Dashboard (tap transaction row or budget category row, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Transaction Row component reused in budget view's filtered list, SIA Coaching Note pattern)
- **Patterns used**: Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model, Bottom Sheet Modal (from _shared-patterns.md)
- **Patterns established**: Amount Display (hero-sized financial figure), Category Chip (tappable category indicator), Details Card (structured metadata with eyebrow labels), Budget Overview Card (allocated/spent/remaining with progress), Delete Confirmation Sheet, Edit Budget Bottom Sheet
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-11.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/budget`
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
| B11-F07 | critical | retention | Implement the edit budget sheet with amount input, SIA suggestion, save/cancel, validation, loading, success, and error states. |
| B11-F08 | major | information-architecture | Implement transaction and budget modes driven by route/query context, and make filtered transactions open transaction detail. |
| B11-F09 | major | trust-privacy | Add transaction metadata editing, receipt image handling, recategorization, delete confirmation, and recovery/error behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

