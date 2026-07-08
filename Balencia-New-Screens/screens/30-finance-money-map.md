# 30-finance-money-map

## 1. Header
- **Screen ID:** 30
- **Name:** Finance / Money Map
- **Route(s) covered:** `/money-map`
- **Tab:** Today
- **Source:** Functional Content Brief: Finance / Money Map Dashboard
- **Batch:** 14

## 2. Purpose
Finance / Money Map gives the user an at-a-glance view of income, spending, budgets, savings, and the behavioral patterns behind money decisions. It treats finance as part of the whole-life system, connecting spending to stress, sleep, work, and goals without shame or alarm styling.

## 3. Entry & exit
- **Entry paths:** Explore [18], CIA Chat [09], Home [12], and Life Areas [16].
- **Primary exit:** Back returns to the origin stack.
- **Action exits:** Tap transaction or budget row opens Transaction / Budget Detail [31]; tap savings goal opens Goal Detail [14]; tap CIA note opens CIA Chat [09]; tap level badge opens RPG Character [19].
- **Modal exits:** FAB opens add transaction, receipt scanner, and budget creation sheets.
- **Failure exit:** If finance sync fails, cached data stays visible with timestamp and row-level pending labels.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Back chevron, title "Finance", and domain level badge.
2. **CIA coaching note:** Quiet preamble with cross-domain insight and source access.
3. **Spend by category hero:** Interactive DonutChart with total spend hub and category legend.
4. **Monthly overview:** KPIRow for income, spent, saved, and net change footer.
5. **Budgets:** SolidCard list with capped bars and non-shaming over-budget text.
6. **Recent transactions:** SolidCard list with merchant, date, amount, pending state, and swipe actions.
7. **Savings goals:** SolidCard progress row with optional sparkline.
8. **Spending trend:** SolidCard Living Line with historical spend and dashed CIA projection.
9. **FAB and nav:** Add transaction / scan receipt FAB above GlassNavBar.

**ASCII Wireframe (390x844):**
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
```

## 5. Components
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

## 6. Visual treatment
- **Atmosphere:** Warm dark `#0A0A0F` with top-center orange radial glow and 3% grain.
- **Selective glass:** CIA preamble and Donut hero use glass; KPI, budgets, transactions, savings, and trend use SolidCard.
- **Semantic glow:** CIA uses `--glow-cia`; Donut hero uses `--glow-you`; budget tracking can use a restrained `--glow-done` when all budgets are on pace.
- **Non-shaming finance:** Over-budget states cap visual fill at 100%, add a neutral `!` glyph, and use plain text rather than red alarms.
- **Hero type moment:** The Donut center amount "$2,150" owns the focal type.
- **Color discipline:** Orange for user spend and controls, green for saved/goal reached, purple for CIA correlations.

## 7. Content & copy
- **H1:** Finance
- **CIA preamble:** "Dining spend rose during high *stress* weeks."
- **Hero:** "Spend by category", "$2,150 total"
- **KPI labels:** "Income", "Spent", "Saved", "Net change this month"
- **Budget copy:** "over by $50 - adjust or roll over", "No budgets yet. Create one to track your spending."
- **Transactions:** "No transactions yet. Add your first.", "Delete this transaction?", "pending"
- **Savings:** "Emergency fund", "goal reached", "Set a savings target"
- **Trend empty:** "Log spending to see where your money goes"
- **System:** "CIA is analyzing your cash flow - one moment.", "You're offline - showing your last sync."
- **Actions:** "ask CIA", "view all budgets", "view all transactions", "Add transaction", "Scan receipt"

## 8. Data & honesty states
- **Total monthly spend:** Real shows amount plus ChipProvenance `via Finance API`; low-confidence shows muted amount with `estimated - low confidence`; honest-null shows ghost donut and "Not enough data yet - 3 more days."
- **KPI deltas:** Real deltas use finance history; low-confidence deltas are muted; honest-null uses dash, never fake arrows.
- **Budget utilization:** Real bars cap at 100% with explicit over amount; low-confidence labels pending sync; honest-null says "No budgets yet."
- **Transactions:** Real rows show merchant, date, amount, and source; low-confidence pending rows reduce opacity and label "pending"; honest-null shows the add-first prompt.
- **CIA insight:** Real card shows evidence chips and confidence; low-confidence card labels the correlation; honest-null hides the card entirely.
- **Receipt scan:** OCR output is a suggestion until the user confirms merchant, category, and amount.

## 9. All states
- **Default:** Populated dashboard with donut hero, KPIs, budgets, transactions, savings, and trend.
- **Skeleton:** Donut ring, KPI blocks, row silhouettes, and chart axes shimmer without values.
- **Empty:** KPIs read `$0` with dash deltas, Donut is a ghost outline, and budget creation chips are visible.
- **Error:** Section-level failure with cached safe content underneath; no full-screen finance error.
- **Success:** Transaction or budget save triggers a quiet green sweep and optional `+40 XP - Finance` toast.
- **Disabled:** Swipe-to-delete and receipt scan are disabled offline unless a local queue is available.

## 10. Motion & interaction
- **Donut draw:** Category arcs sweep largest-to-smallest; tapping a slice cross-highlights the matching budget row.
- **Trend scrub:** Long-press displays exact day amount and source.
- **FAB:** Tap opens action sheet; long-press expands mini-actions for manual add and scan.
- **Swipe:** Transaction swipe reveals delete; delete requires confirmation.
- **Insight sources:** Long-press CIA note opens source and confidence sheet.
- **Reduced motion:** Charts render final states instantly; breathing glows become static.

## 11. Motivation-tier adaptation
- **Low density:** Shows two KPIs, top two budgets, and no trend chart by default.
- **Medium density:** Default layout with three KPIs, budgets, transactions, savings, and one trend.
- **High density:** Adds daily average, projected month-end, expanded budget list, and deeper cross-domain spending breakdown.

## 12. Accessibility
- **Contrast:** Paper text on SolidCard and glass surfaces meets AA+; muted pending labels remain above AA.
- **Targets:** KPI tiles, rows, FAB, delete, and insight controls maintain 44px hit areas.
- **Screen readers:** Donut announces total spend, top category, source, and whether data is pending.
- **Color safety:** Over-budget status includes glyph and text, not only color.
- **Reduced motion:** Matches Section 10 and preserves chart summaries.

## 13. Premium checklist
1. **Connects:** Finance links to stress, goals, and CIA source review.
2. **Honest:** No fake arrows, no uncapped over-budget bars, and no empty CIA card.
3. **Premium:** Donut hero, selective glass, solid finance tables, and warm dark surfaces create a funded feel.
4. **Route truth:** `/money-map` is the only live route named.
5. **Non-shaming:** Finance warnings stay neutral and actionable.
6. **Selective glass:** Guidance and hero use glass; dense data uses solid.
7. **Semantic glow:** Orange, green, and purple each keep one meaning.
8. **One hero type moment:** Total spend in the Donut hub.
9. **All states:** Default, skeleton, empty, error, success, disabled, and offline states are covered.
10. **Source fidelity:** Spend donut, KPIs, budgets, transactions, savings, trends, and receipt scan are preserved.
11. **A11y:** Donut summaries, glyph text, targets, and reduced motion are specified.
12. **Motion:** Draw-first arcs and chart scrubbing are defined.
13. **Sensitive data:** CIA sources are reviewable and manageable.
14. **Voice:** Sentence case, calm, no exclamation marks.
