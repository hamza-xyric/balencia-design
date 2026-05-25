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
- **Visual treatment**: 3 equal-width cards in a horizontal row with 12pt gaps. Each card: ink-brown-800 background, 16pt padding, border-radius 14pt (--r-md). Amount in 24pt Sora Bold, white. Label above in 12pt Sora Semibold, uppercase, white at 50% (+0.12em tracking). Delta below in 13pt Sora Semibold: green (#34A853) with ↑ for positive, orange (#FF5E00) with ↓ for negative.
- **Variants**: Loading (skeleton shimmer on amounts), populated, error (retry prompt)
- **Gestures**: Tap any KPI card → scrolls to relevant section (income → transactions filtered, expenses → budget categories, savings → savings goals)
- **Size**: (Full-width - 32pt (16pt margins) - 24pt gaps) / 3 per card × 96pt

### Budget Category Row
- **Purpose**: Show spending against budget per category
- **Data source**: Finance API (budget categories endpoint)
- **Visual treatment**: Inside a card container (ink-brown-800, glassmorphism, 20pt border-radius). Each row: category icon (20pt, category-specific color), category name (16pt Sora Semibold, white), spent/allocated amounts right-aligned (15pt Sora Regular, white at 70%). Below: horizontal progress bar (full-width within card padding, 6pt height, border-radius 3pt). Bar fill: orange (#FF5E00) for under-budget, red (#f44336) for over-budget. Bar track: white at 10%. Percentage right-aligned below bar (12pt Sora Regular, white at 50%). Rows separated by 1pt divider (white at 5%). "View all budgets" link at bottom: 15pt Sora Regular, orange (#FF5E00).
- **Variants**: On-track (orange fill), over-budget (red fill + "over budget" label in red), no budget set (dashed outline bar)
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

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Primary CTA (FAB) | #FF5E00 | Burnt Orange | 60% — primary action |
| Budget progress bars (under-budget) | #FF5E00 | Burnt Orange | 60% — progress indicator |
| Active chart line (past data) | #FF5E00 | Burnt Orange | 60% — data viz, user's data |
| Time toggle active segment | #FF5E00 | Burnt Orange | 60% — active state |
| "View all" links | #FF5E00 | Burnt Orange | 60% — interactive text |
| Negative delta arrows | #FF5E00 | Burnt Orange | 60% — alerts user attention |
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

**60/30/10 verification**: Orange dominates interactive elements (FAB, progress bars, links, chart line, toggles). Green appears on success/positive states (income, savings, deltas, milestones). Purple is limited to 3 elements (SIA note bar, SIA avatar, projected trend line). Domain emerald only on the header accent line and level badge. Ratio holds.

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
| KPI delta | Sora | Semibold | 13pt | 18pt | #34A853 (positive) / #FF5E00 (negative) |
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
