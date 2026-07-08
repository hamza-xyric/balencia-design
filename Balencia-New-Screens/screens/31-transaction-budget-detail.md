# 31-transaction-budget-detail

## 1. Header
- **Screen ID:** 31
- **Name:** Transaction / Budget Detail
- **Route(s) covered:** No live route; transaction and budget detail are nested Money Map stack modes.
- **Tab:** Today / Finance
- **Source:** Functional Content Brief: Transaction / Budget Detail
- **Batch:** 14

## 2. Purpose
Transaction / Budget Detail is a dual-purpose financial review surface. It renders either a single transaction or a budget category drill-down, providing edit controls, receipt context, and CIA behavioral insight while keeping budget pressure non-shaming and visually honest.

## 3. Entry & exit
- **Entry paths:** Transaction row or budget category row from Money Map [30].
- **Internal navigation:** In Budget View, tapping a transaction pushes Transaction View within the same stack.
- **Primary exit:** Back chevron or edge-swipe returns to Money Map [30].
- **Action exits:** CIA insight opens CIA Chat [09]; edit, delete, recategorize, receipt, and budget changes open bottom sheets.
- **Failure exit:** Cached values remain visible with stale labels; destructive actions require confirmation and clear failure recovery.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Back chevron, contextual title, edit glyph, and delete glyph when allowed.
2. **Transaction hero:** Amount, income/expense label, category chip, merchant, date, note, and receipt slot.
3. **Budget hero:** Category name, allocation, ProgressRing, capped MacroBar, pace read, and days remaining.
4. **CIA insight:** Purple glass card linking financial behavior to life context.
5. **History region:** Receipt preview in Transaction View; filtered transaction list in Budget View.
6. **Action CTA:** Recategorize, edit budget, replace receipt, or add note depending on mode.
7. **Sheets:** Delete confirmation, category picker, receipt replace/delete, and budget edit.

**ASCII Wireframe (390x844):**
```text
+---------------------------------------------+
| <- Dining budget                      edit  |
|                                             |
| +-----------------------------------------+ |
| | ALLOCATED THIS MONTH                    | |
| |            78%                          | |
| | $480 spent / $620 allocated             | |
| | 12 days left · on pace                  | |
| | progress ========----                   | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | Dining jumps 40% after short *sleep*.   | |
| | [finance] [wellbeing]     Ask CIA       | |
| +-----------------------------------------+ |
|                                             |
| RECENT ACTIVITY                            |
| +-----------------------------------------+ |
| | Joe's Pizza        2 days ago   -$24.00 | |
| | Spotify            4 days ago   -$11.99 | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | edit budget                             | |
| +-----------------------------------------+ |
|                                             |
| -- transaction view --                      |
| -$42.10 expense · Trader Joe's              |
| category groceries · receipt attached       |
+---------------------------------------------+
```

## 5. Components
- **TopBar:** Transparent header with contextual actions.
- **SolidCard:** Dense transaction details, budget overview, metadata, and lists.
- **ProgressRing:** Budget percentage hero.
- **ProgressBar:** Capped budget progress and pace marker.
- **CIAInsightCard:** Behavioral context with evidence chips.
- **ListRow:** Transaction list and metadata rows.
- **ChipDomainTag:** Category and domain labels.
- **ChipProvenance:** Plaid, Finance API, you logged, pending bank, and calculated labels.
- **BtnPrimary / BtnSecondary / BtnGhost:** Edit, recategorize, replace receipt, and delete flows.
- **Sheet:** Delete confirmation, category picker, budget edit, receipt options.
- **NEW: ContextToggle:** Compact segmented control for hybrid entry cases. Rationale: a single shell handles transaction and budget modes without duplicating screens.

## 6. Visual treatment
- **Atmosphere:** Warm dark base with top-center orange glow and no alarm-red overlays.
- **Selective glass:** CIA insight and sheets use glass; all finance facts use SolidCard.
- **Semantic glow:** CIA insight uses `--glow-cia`; budget hero uses `--glow-you`; successful save uses `--glow-done`.
- **Non-shaming over-budget:** Visual fill caps at 100% and text says "Over by $40 - adjust allocation or roll over."
- **Hero type moment:** Transaction amount or budget allocation value uses large tabular numerals.
- **Receipt treatment:** Missing receipts use a small add-receipt row, not an empty image frame.

## 7. Content & copy
- **Transaction labels:** "expense", "income", "pending", "add a note", "add receipt", "Replace or delete receipt"
- **Budget status:** "on pace · 12 days left", "! $40 over", "No spending in Dining yet. Budget fully available."
- **CIA insight:** "Dining jumps 40% after short *sleep*. Plan meals on stress days."
- **Suggestion:** "Based on your 3-month average, $480 would be realistic."
- **Actions:** "edit budget", "recategorize", "cancel", "delete", "replace receipt"
- **Errors:** "Delete this transaction? This cannot be undone.", "Could not save. Try again.", "Couldn't load budget - pull to refresh."
- **System:** "CIA is reading your spending - one moment.", "You're offline - showing your last sync."
- **Success:** "Budget updated", "Transaction saved"

## 8. Data & honesty states
- **Transaction amount:** Real shows signed value plus ChipProvenance `via Plaid` or `you logged`; low-confidence pending values are muted; honest-null hides the hero until amount exists.
- **Budget spent and allocated:** Real shows `$480 / $620`; low-confidence labels `estimated - low confidence`; honest-null says "No spending in Dining yet. Budget fully available."
- **Days remaining:** Real uses finance cycle data; low-confidence marks approximate; honest-null says "Cycle dates unknown."
- **Category list:** Real transactions carry merchant, amount, and source; low-confidence rows say "merchant pending"; honest-null shows "No transactions in this budget yet."
- **CIA suggestion amount:** Real uses 3-month average and marks calculated source; low-confidence is labeled; honest-null says "2 of 3 merchants synced - check back soon."
- **Receipt:** Real shows attachment metadata; honest-null shows "No receipt attached."

## 9. All states
- **Default:** Renders Transaction View or Budget View based on payload.
- **Skeleton:** Hero amount, ring, metadata rows, and list rows shimmer in shape.
- **Empty:** Budget View shows ghost ring and "Budget fully available"; Transaction View shows metadata fields with missing labels.
- **Error:** Failed budget or transaction load keeps cached data and offers retry.
- **Success:** Save or update flashes green and returns to stable mode.
- **Disabled:** Delete hidden when a transaction is still pending bank clearance.
- **Offline:** Editing and deletion disabled unless local queue exists; data reads stale with timestamp.

## 10. Motion & interaction
- **Budget draw:** Ring sweeps clockwise, then capped MacroBar fills.
- **Transaction entry:** Amount scales from 0.96 to 1.0 while metadata rows rise.
- **Filter:** Tapping a budget slice filters the list with 150ms opacity transition.
- **Sheets:** Bottom sheets spring in with focus trap and drag-to-dismiss.
- **Deletion:** Confirmed deletion collapses the row before returning.
- **Haptics:** Light on edit save, medium on successful delete.
- **Reduced motion:** Count-ups, sweeps, and spring bounce resolve instantly.

## 11. Motivation-tier adaptation
- **Low density:** Core amount, status, and edit action only; CIA and trends hidden.
- **Medium density:** Default transaction/budget detail with CIA and recent activity.
- **High density:** Adds four-week trend and monthly spend summary.

## 12. Accessibility
- **Contrast:** Tabular finance values on SolidCard surfaces meet AA+.
- **Targets:** Back, edit, delete, rows, and CTA buttons maintain 44px hit areas.
- **Screen readers:** Budget ring announces percentage, over amount, days left, and source.
- **Focus safety:** Delete and edit sheets trap focus and return it to the triggering control.
- **Color safety:** Over-budget state includes glyph and copy, never only hue.

## 13. Premium checklist
1. **Connects:** CIA links finance and wellbeing with evidence chips.
2. **Honest:** Budget visuals cap, overage is text, and missing data stays explicit.
3. **Premium:** Solid finance surfaces, warm atmosphere, and restrained glass fit sensitive money data.
4. **Route truth:** Detail modes are documented as nested stack states, not live routes.
5. **Non-shaming:** No red alarm treatment for spending.
6. **Selective glass:** CIA and sheets glass; data solid.
7. **Semantic glow:** Purple CIA, orange budget effort, green save success.
8. **One hero type moment:** Amount or allocation value owns the screen.
9. **All states:** Default, skeleton, empty, error, success, disabled, and offline states are covered.
10. **Source fidelity:** Dual mode, edit/delete, receipt, recategorize, budget ring, capped bar, and CIA insight are preserved.
11. **A11y:** Focus traps, targets, ring summaries, and color safety are defined.
12. **Motion:** Draw-first budget and reduced-motion alternatives are specified.
13. **Sensitive controls:** Destructive actions require explicit confirmation.
14. **Voice:** Calm sentence case, no exclamation marks.
