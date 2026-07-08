# 31-transaction-budget-detail - A+++ hi-fi mobile spec

## Header
- **Source ID:** 31
- **Source spec:** `Balencia-New-Screens/screens/31-transaction-budget-detail.md`
- **Evidence:** screens/31-transaction-budget-detail.md, work/briefs/31.md, work/drafts/31.md, Functional Content Brief: Transaction / Budget Detail
- **Route(s):** No live route; transaction and budget detail are nested Money Map stack modes.
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Transaction / Budget Detail is a dual-purpose financial review surface.
- **Premium Visual Director:** make Transaction / Budget Detail hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Transaction / Budget Detail shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------+
| <- Dining budget                      edit  |
|                                             |
| +-----------------------------------------+ |
| | ALLOCATED THIS MONTH                    | |
| |            78%                          | |
| | $480 spent / $620 allocated             | |
| | 12 days left  on pace                  | |
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
| -$42.10 expense  Trader Joe's              |
| category groceries  receipt attached       |
+---------------------------------------------+

Route handling: No live route; transaction and budget detail are nested Money Map stack modes.
```

## Focal Hierarchy
- **Dominant focal moment:** Transaction / Budget Detail hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Transaction hero, Budget hero, CIA insight, History region.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*detail*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
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

## Data Honesty
- **Transaction amount:** Real shows signed value plus ChipProvenance `via Plaid` or `you logged`; low-confidence pending values are muted; honest-null hides the hero until amount exists.
- **Budget spent and allocated:** Real shows `$480 / $620`; low-confidence labels `estimated - low confidence`; honest-null says "No spending in Dining yet. Budget fully available."
- **Days remaining:** Real uses finance cycle data; low-confidence marks approximate; honest-null says "Cycle dates unknown."
- **Category list:** Real transactions carry merchant, amount, and source; low-confidence rows say "merchant pending"; honest-null shows "No transactions in this budget yet."
- **CIA suggestion amount:** Real uses 3-month average and marks calculated source; low-confidence is labeled; honest-null says "2 of 3 merchants synced - check back soon."
- **Receipt:** Real shows attachment metadata; honest-null shows "No receipt attached."

## Consent and Safety
- Transaction / Budget Detail shows source/confidence on money or billing data and keeps cancellation, export, support, and delete visible without false urgency.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** Renders Transaction View or Budget View based on payload.
- **Skeleton:** Hero amount, ring, metadata rows, and list rows shimmer in shape.
- **Empty:** Budget View shows ghost ring and "Budget fully available"; Transaction View shows metadata fields with missing labels.
- **Error:** Failed budget or transaction load keeps cached data and offers retry.
- **Success:** Save or update flashes green and returns to stable mode.
- **Disabled:** Delete hidden when a transaction is still pending bank clearance.
- **Offline:** Editing and deletion disabled unless local queue exists; data reads stale with timestamp.

## Motion
- **Budget draw:** Ring sweeps clockwise, then capped MacroBar fills.
- **Transaction entry:** Amount scales from 0.96 to 1.0 while metadata rows rise.
- **Filter:** Tapping a budget slice filters the list with 150ms opacity transition.
- **Sheets:** Bottom sheets spring in with focus trap and drag-to-dismiss.
- **Deletion:** Confirmed deletion collapses the row before returning.
- **Haptics:** Light on edit save, medium on successful delete.
- **Reduced motion:** Count-ups, sweeps, and spring bounce resolve instantly.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; transaction and budget detail are nested Money Map stack modes..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** Tabular finance values on SolidCard surfaces meet AA+.; **Targets:** Back, edit, delete, rows, and CTA buttons maintain 44px hit areas.; **Screen readers:** Budget ring announces percentage, over amount, days left, and source.
