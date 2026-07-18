# 30-finance-money-map - A+++ hi-fi mobile spec

## Header
- **Source ID:** 30
- **Source spec:** `Balencia-New-Screens/screens/30-finance-money-map.md`
- **Evidence:** screens/30-finance-money-map.md, work/briefs/30.md, work/drafts/30.md, Functional Content Brief: Finance / Money Map Dashboard
- **Route(s):** `/money-map`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Finance / Money Map gives the user an at-a-glance view of income, spending, budgets, savings, and the behavioral patterns behind money decisions.
- **Premium Visual Director:** make Finance / Money Map hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Finance / Money Map shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Finance                            [Lv.8]|
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | Dining spend rose during high *stress*. | |
| | [finance] [stress]        ask CIA       | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | Spend by category                       | |
| |              $2,150 total               | |
| |       donut: dining, transit, groceries | |
| | 1 Dining $650   2 Transit $400          | |
| +-----------------------------------------+ |
|                                             |
| +------------+ +------------+ +-----------+|
| | income     | | spent      | | saved     ||
| | $5,000     | | $2,150     | | $1,000    ||
| +------------+ +------------+ +-----------+|
| Net change this month: +$2,850             |
|                                             |
| BUDGETS                           view all |
| +-----------------------------------------+ |
| | groceries $300 / $400 ========---       | |
| | dining    over by $50 - adjust or roll  | |
| +-----------------------------------------+ |
|                                             |
| TRANSACTIONS                    view all   |
| +-----------------------------------------+ |
| | Trader Joe's       Apr 12       -$42.10 | |
| | Uber               Apr 11       -$18.50 | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | Emergency fund $6k / $10k               | |
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+

Route handling: `/money-map`
```

## Focal Hierarchy
- **Dominant focal moment:** Finance / Money Map hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA coaching note, Spend by category hero, Monthly overview, Budgets.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*money*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar:** Transparent over atmosphere.
- **CIAInsightCard:** Cross-domain note with confidence/source controls.
- **NEW: DonutChart:** Part-of-whole spend hero. Rationale: the source requires a category composition hero, which the base ring cannot express.
- **KPIRow:** Monthly income, spent, and saved.
- **SolidCard:** Budgets, transactions, savings, and trend chart.
- **ProgressBar:** Capped budget and savings bars.
- **TrendChart:** Spending line and projected trend.
- **ListRow:** Transaction rows and budget rows.
- **ChipProvenance:** Finance API, user-entered, pending bank, and CIA source labels.
- **FABQuickLog:** Add transaction and scan receipt.
- **Sheet:** Add transaction, scan receipt, budget edit, delete confirmation, and insight sources.
- **GlassNavBar:** Floating bottom navigation.

## Data Honesty
- **Total monthly spend:** Real shows amount plus ChipProvenance `via Finance API`; low-confidence shows muted amount with `estimated - low confidence`; honest-null shows ghost donut and "Not enough data yet - 3 more days."
- **KPI deltas:** Real deltas use finance history; low-confidence deltas are muted; honest-null uses dash, never fake arrows.
- **Budget utilization:** Real bars cap at 100% with explicit over amount; low-confidence labels pending sync; honest-null says "No budgets yet."
- **Transactions:** Real rows show merchant, date, amount, and source; low-confidence pending rows reduce opacity and label "pending"; honest-null shows the add-first prompt.
- **CIA insight:** Real card shows evidence chips and confidence; low-confidence card labels the correlation; honest-null hides the card entirely.
- **Receipt scan:** OCR output is a suggestion until the user confirms merchant, category, and amount.

## Consent and Safety
- Finance / Money Map shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/money-map`. Do not add alternate vanity routes.

## States
- **Default:** Populated dashboard with donut hero, KPIs, budgets, transactions, savings, and trend.
- **Skeleton:** Donut ring, KPI blocks, row silhouettes, and chart axes shimmer without values.
- **Empty:** KPIs read `$0` with dash deltas, Donut is a ghost outline, and budget creation chips are visible.
- **Error:** Section-level failure with cached safe content underneath; no full-screen finance error.
- **Success:** Transaction or budget save triggers a quiet green sweep and optional `+40 XP - Finance` toast.
- **Disabled:** Swipe-to-delete and receipt scan are disabled offline unless a local queue is available.

## Motion
- **Donut draw:** Category arcs sweep largest-to-smallest; tapping a slice cross-highlights the matching budget row.
- **Trend scrub:** Long-press displays exact day amount and source.
- **FAB:** Tap opens action sheet; long-press expands mini-actions for manual add and scan.
- **Swipe:** Transaction swipe reveals delete; delete requires confirmation.
- **Insight sources:** Long-press CIA note opens source and confidence sheet.
- **Reduced motion:** Charts render final states instantly; breathing glows become static.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/money-map`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Paper text on SolidCard and glass surfaces meets AA+; muted pending labels remain above AA.; **Targets:** KPI tiles, rows, FAB, delete, and insight controls maintain 44px hit areas.; **Screen readers:** Donut announces total spend, top category, source, and whether data is pending.
