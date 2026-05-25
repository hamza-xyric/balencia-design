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
- **Visual treatment**: ink-brown-800 card, 20pt border-radius, 16pt padding. "Allocated" eyebrow + amount (24pt Sora Bold, white). Below: two columns — "spent" (20pt Sora Semibold, white) and "remaining" (20pt Sora Semibold, green if positive, red if over-budget). Progress bar: 8pt height, full-width within padding, border-radius 4pt. Fill: orange (#FF5E00) for under-budget, red (#f44336) for over-budget. Percentage label right-aligned. Days remaining: 13pt Sora Regular, white at 50%.
- **Variants**: Under-budget (orange bar, green remaining), over-budget (red bar, red remaining, pulsing warning icon), complete (100% — bar full, "fully spent" label)
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
| Budget progress bar (over-budget) | #f44336 | Red (error) | Warning state |
| Budget remaining (negative) | #f44336 | Red (error) | Over-budget warning |
| Delete confirmation button | #f44336 | Red (error) | Destructive action |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Amounts, headings |
| Secondary text | #FFFFFF B3 | White 70% | Labels, values |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, captions |

**60/30/10 verification**: Orange on primary CTA and interactive links. Green on income and positive budget states. Purple limited to SIA indicator elements (2 instances). Red used only for error/warning states (over-budget, delete). Ratio holds.

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
| Budget spent/remaining | Sora | Semibold | 20pt | 26pt | white (spent) / #34A853 or #f44336 (remaining) |
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
- Budget health conveyed via text (percentage, remaining amount) not just bar color

---

## Cross-References

- **Navigates to**: Screen 30 — Finance Dashboard (back navigation), Screen 09 — SIA Chat (tap SIA context card), Category picker bottom sheet (tap category chip), Edit budget bottom sheet (tap edit budget CTA), Full-screen image viewer (tap receipt photo)
- **Navigates from**: Screen 30 — Finance Dashboard (tap transaction row or budget category row, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Transaction Row component reused in budget view's filtered list, SIA Coaching Note pattern)
- **Patterns used**: Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model, Bottom Sheet Modal (from _shared-patterns.md)
- **Patterns established**: Amount Display (hero-sized financial figure), Category Chip (tappable category indicator), Details Card (structured metadata with eyebrow labels), Budget Overview Card (allocated/spent/remaining with progress), Delete Confirmation Sheet, Edit Budget Bottom Sheet
