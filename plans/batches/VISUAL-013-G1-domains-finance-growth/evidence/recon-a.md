# G1 reconciliation A — finance and budget (screens 30–31)

Worker role: Luna read-only evidence inventory. This is not implementation or acceptance. I reconciled the active batch/matrix, current hi-fi specs and source specs, current product modules and shared consumers, current canon/catalog and RPG authority, the historical G1 audit, and the F2 acceptance/sentinel records. Finance/privacy decisions remain Sol-owned.

## Reconciled authority and stale-audit disposition

- The live modules and active `hifi-screens/30-...` / `31-...` specs govern implementation details. The old G1 audit remains useful defect evidence but cannot override newer kit behavior or canon.
- Current canon explicitly names the coach `CIA` and the bottom-nav label `CIA`; therefore the audit's blanket claim that uppercase `CIA` is wrong-case is stale. User-facing sentence case still applies to surrounding copy and action labels.
- Finance is a current RPG stat (0–99) and a current canon domain color (`#10b981`). No taxonomy conflict exists for screens 30–31. The visible domain level does conflict: the active S30 spec sketches `Lv.8`, while live S30 shows `Lv 12`; S31 repeats `Amira · Lv 12`. A level is not derivable from the displayed finance facts. Sol must freeze one payload and label whether it is the Finance domain level or character level; do not silently preserve both values.
- The audit's claim that S30 `ComplianceFooter` controls are spans is stale: the current shared component resolves strings into real focusable anchors. However, those five links are incomplete for the finance contract, which requires category, source, scope, freshness, confidence, retention, export, revoke, and delete.
- The audit's shared-back/navigation claim is also stale for the current kit: `TopBar`, `GlassNavBar`, and `FloatingQuickLog` now render native links/buttons with focus-ring classes and 44px-or-larger geometry. Screen-local inert controls remain live defects.
- Both active specs say `Image Slots: None required`. The exact asset disposition should be **code-native data visualization and type only; no raster, generated image, or external asset** for both screens.

## Cross-screen finance/trust contract

- This visual-only prototype must never imply a bank/Plaid connection, compliance readiness, OCR scan, or live financial advice. Use deterministic local fixtures and local outcomes only; no API, storage, file picker, camera, clipboard, share, payment, credential, export, or external provider capability.
- Real fixtures must visibly name a bundled/demo source and freshness. If `Finance API` or `Plaid` remains visible, pair it with unambiguous fixture/unavailable-provider language; otherwise the surfaces look operational despite unresolved DEP-FIN readiness.
- Use one fixture model as the only source for totals, percentages, ring/bar values, category legend, transaction count/status, and source/confidence text. Numeric strings must not be independently hard-coded in separate modules.
- Add exactly one deterministic marker per render, proposed as `data-g1-state="30-<state>"` / `data-g1-state="31-<state>"` on `main`. Parse `?state=` once on mount; unsupported values fall back to default.
- Minimum verifier floor for every context: exact marker; no horizontal or phone-frame overflow at 390×844; no visible action hidden behind shell chrome; all native controls at least 44×44px; no nested interactive controls; correct keyboard/focus behavior; zero console/page/capability events; clean isolated cookies/storage; two byte-identical captures; unique state PNG hashes; actual 125% text-scale proof per screen; reduced-motion proof; and stable product/API/accepted fingerprints at start/end.
- Full finance data-control evidence must include the nine dispositions: Category, Source, Scope, Freshness, Confidence, Retention, Export, Revoke, Delete. Revoke/delete need explicit local confirmation, cancellation, focus containment/restoration, and a non-destructive preview outcome.
- Every destructive control must distinguish posted versus pending-bank status. Pending items cannot be deleted; offline delete/edit is disabled unless an explicitly local queue exists. No destructive result may occur before confirmation.

## 30 — Finance / Money Map

### Live strengths

- Route and shell intent are correct: `/money-map`, Today tab, warm CIA atmosphere, real bottom action link, canonical navigation.
- Monthly arithmetic is coherent in the populated fixture: `$5,000 - $2,150 = +$2,850`; groceries are `$300 / $400 = 75%`; emergency fund is `$6k / $10k = 60%`.
- Dense budget/transaction facts use solid cards, while CIA and the donut hero use glass. The over-budget copy is non-shaming and the progress bar is capped.
- `DonutHub` already supports a single role=`img` summary when segment labels are supplied; the current call simply fails to provide those labels.

### Exact live defects versus the active spec

- **Blocker — unreconciled composition:** donut segments sum to 100%, but the visible legend names only `$650 + $400 + $300 = $1,350` against a `$2,150` total. The unnamed fourth segment is `$800` (about 37%). `DonutHub` receives no segment labels, so assistive text announces only `Total $2,150`; it omits top category, all categories, source, and pending status required by the spec.
- **Critical — provider/readiness honesty:** CIA provenance says `Finance API`, `Stress API`, and `CIA`; hero says `Via Finance API`, with no fixture/provider-unavailable label, source timestamp, consent scope, confidence, or DEP-FIN qualification. The correlation reads as live fact.
- **Critical — incomplete states:** no skeleton, honest-null, low-confidence, cached section error, offline, pending row, success, delete confirmation, scan-disabled, source-controls, or reduced-motion-specific fixture exists.
- **High — missing named modules:** the required spending trend (historical solid orange plus dashed purple projection) is absent. Receipt scan and budget-create sheet dispositions are absent. Savings is incorrectly a green-glowing `GlassCard` at only 60%; canon reserves green glow for completion/healthy arrival, and this dense incomplete mission should be solid/orange-neutral.
- **High — inert perceived actions:** Ask CIA, Adjust or roll, both transaction rows, and Add transaction have no visible outcome. `SectionTitle meta="View all"` renders static text for both Budgets and Transactions. The bottom `FloatingQuickLog` link is real but routes to the same screen query without the module reading the query, so it has no visible action state.
- **High — incomplete privacy:** current footer exposes Source/Retention/Export/Revoke/Delete only, not category/scope/freshness/confidence; delete/revoke jump to shared screen 84 rather than proving screen-local finance scope and confirmation.
- **Medium — semantic color/source:** Finance and Stress chips are both purple CIA tone. Finance should use the Finance domain tag color; Stress should map to the current Wellbeing authority rather than masquerade as CIA. Green on the incomplete emergency fund implies done.
- **Medium — level/source conflict:** live header says `Lv 12`, active spec says `Lv.8`, and neither is visibly sourced or identified as domain versus character level.
- **Medium — KPI semantics:** `Saved $1,000` and `Net change +$2,850` can coexist, but the payload must explicitly define savings as a subset/allocation rather than imply the two are alternate cash-balance totals.

### Proposed frozen fixtures

`default-real`, `low-confidence`, `honest-null`, `skeleton`, `section-error-cached`, `offline`, `pending-transaction`, `category-selected`, `trend-scrub`, `add-transaction`, `scan-disabled`, `delete-confirm`, `save-success`, `data-controls`.

- `default-real`: all four category rows reconcile exactly to `$2,150`, with source/freshness/confidence and a defensive fixture label.
- `low-confidence`: muted estimated total and KPIs, explicit low-confidence source, no confident CIA correlation or projection.
- `honest-null`: ghost donut, `$0`/dash KPIs, no CIA card, `Not enough data yet — 3 more days`, no budgets/transactions, and first-action affordances.
- `section-error-cached`: section-scoped error with cached timestamp; the rest of the defensible dashboard remains.
- `offline`: cached/read-only data with scan/delete/provider mutations disabled and reasons connected through `aria-describedby`.
- `pending-transaction`: a visibly and semantically pending row; destructive reveal disabled.
- `category-selected`: selecting a donut category visibly filters/highlights the matching budget/transaction data without changing totals.
- `trend-scrub`: deterministic exact-day amount/source readout, including a keyboard-accessible alternative to long-press.
- `add-transaction`: focus-managed local sheet with merchant, amount, category and source; invalid Save disabled with reason.
- `scan-disabled`: local camera/OCR capability explicitly unavailable; manual entry remains available.
- `delete-confirm`: exact merchant/amount named; Cancel and destructive Confirm; no deletion before confirm.
- `save-success`: local-only new transaction or budget outcome with stable totals and optional canonical `+40 XP · Finance` only if Sol confirms current RPG reward authority.

### Deterministic assertions and interactions

- Parse the visible category rows and assert values sum exactly to `$2,150`; assert DonutHub accessible name includes total, top category, all four labels, source, and confidence/pending status.
- Assert income minus spent equals net change. Assert 300/400 = 75% and 6000/10000 = 60%; the 60% savings surface must not use done glow or completion copy.
- Activate Ask CIA, both View-all controls, Adjust or roll, a transaction row, the bottom Log action, and Add transaction; each must navigate to a valid local review surface or produce a named local outcome.
- Keyboard-select each donut category and assert `aria-pressed`/selected state, matching row emphasis/filter, and a polite outcome. Color cannot be the only selection cue.
- Open/close every sheet with mouse and keyboard; Escape closes; Tab remains contained; close/confirm restores focus to its trigger.
- Pending/offline scan and delete controls must be disabled and expose the exact reason. Confirm no camera/file/network/storage capability event.
- Data controls show all nine exact labels. Revoke/Delete cannot mutate before a named confirmation; Cancel restores trigger focus.
- Default must include a textual trend summary for past versus projected data; honest-null/low-confidence must not render a fabricated projected series.

### 390×844 and actual 125% risks

- Current default is substantially taller than one frame; scrolling is acceptable, but the 52px bottom action plus nav must not obscure the savings, trend, CTA, or footer. Capture both top and representative bottom states.
- The three-column KPI row is the highest horizontal-reflow risk at 125%; amounts and labels must wrap without clipping or shrinking below the type floor. The donut+legend flex row, five footer links, long over-budget action, and long source chips also need explicit no-overflow checks.
- A focus-managed bottom sheet must be opaque enough that underlying finance values/actions do not bleed through and must remain fully operable within 844px after text enlargement.

## 31 — Transaction / Budget Detail

### Live strengths

- The screen is correctly source-only/nested (review route `/screens/31` is evidence infrastructure, not a new product route), has no bottom nav, uses solid surfaces for finance facts, and has a real back control.
- Budget math is approximately correct: `$480 / $620 = 77.42%`, reasonably displayed as `78%` if Sol freezes rounding-to-nearest; bar and ring use the same displayed percentage.
- Posted transaction metadata, receipt presence, provenance, recategorize/replace actions, and a visible privacy rail establish most of the intended information architecture.

### Exact live defects versus the active spec

- **Blocker — dual-mode truth:** required `ContextToggle`/payload-driven mode is absent. Budget hero, budget activity, and a separate transaction hero are concatenated into one screen, so neither Budget View nor Transaction View is an honest stable mode.
- **Blocker — broken copy/category:** `Allocated this mission` should be `Allocated this month`. `Dining jumps 40% after short detail in your sleep window` is semantically broken and must use the source-authorized `sleep` claim with properly hedged fixture evidence. Spotify is implausibly categorized as Dining; replace with a defensible Dining merchant or mark it uncategorized/pending.
- **Critical — destructive and status behavior:** posted Trader Joe's has no Delete control or confirmation. Required add-note and receipt-delete options are absent. Pending-bank delete-hidden/disabled, offline editing rules, save failure recovery, and local success are not implemented.
- **Critical — provider/readiness honesty:** `Via Plaid` and `3-month average · calculated` look live and verified. No unavailable-provider/demo fixture label, source freshness, confidence, scope, or dependency qualification appears.
- **High — nested glass:** a `GlassCard tone="cia"` wraps `CIAInsightCard`, creating a glass-within-glass hero against canon. Render one CIA glass surface only.
- **High — inert perceived actions:** header Edit, Ask CIA, See all, both activity rows, Recategorize, Replace receipt, and Edit budget do nothing visibly.
- **High — incomplete privacy:** `ConsentRail compact` defaults to only Source/Retention/Export/Revoke/Delete. It lacks Category/Scope/Freshness/Confidence and proves no destructive confirmation.
- **High — absent states:** no transaction mode, pending transaction, budget/transaction honest-null, skeleton, cached error, offline, low-confidence, save-disabled/error/success, delete sheet, category picker, receipt sheet, or reduced-motion fixture.
- **Medium — semantic domain color:** Finance uses orange/user tone and Wellbeing uses purple/CIA tone. Use registry-backed Finance green and Wellbeing teal tags while reserving purple for the CIA synthesis surface.
- **Medium — rounding/source:** 480/620 is 77.42%, not exactly 78%. Freeze a rounding rule and include amount/percentage/source in the ProgressRing accessible summary. The current generic `78%, Spent` omits over amount/days/source required by the spec.
- **Medium — duplicated/ambiguous progression:** `Amira · Lv 12` is an unrelated extra identity/level footer, and may conflict with S30's domain-level badge. Remove it unless current authority and payload prove its purpose.

### Proposed frozen fixtures

`budget-default`, `transaction-default`, `budget-low-confidence`, `transaction-pending`, `budget-honest-null`, `transaction-honest-null`, `skeleton`, `error-cached`, `offline`, `budget-edit-disabled`, `budget-save-success`, `category-picker`, `receipt-options`, `delete-confirm`, `delete-failure`, `data-controls`.

- The default context should be one mode, not a concatenation. `budget-default` is the natural primary fixture because the current title and hero are Dining budget; `transaction-default` proves the nested stack's second mode.
- `budget-honest-null`: ghost ring, zero spent/full allocation, cycle-unknown if dates are missing, no fabricated CIA suggestion.
- `transaction-honest-null`: no amount hero until amount exists; missing merchant/category/receipt have explicit labels without invented values.
- `transaction-pending`: source/freshness/status visible; Delete absent/disabled; receipt/recategorize behavior follows the pending rule.
- `error-cached` and `offline`: preserve only defensible timestamped values and disable edits/deletion with connected explanations.
- Edit/category/receipt/delete fixtures are focus-managed local sheets with explicit cancel paths and no provider/storage effects.

### Deterministic assertions and interactions

- `budget-default` exposes a selected Budget tab and exactly one budget hero; it contains no separate Trader Joe's transaction-detail hero. `transaction-default` selects Transaction and exposes exactly one transaction hero; it contains no budget allocation ring.
- Switching ContextToggle with click and keyboard updates `aria-selected`, named tabpanel/mode marker, title, action set, and polite status without a route/API effect.
- Assert `$480 / $620` computes to displayed `78%` under the frozen nearest-integer rule, and assert the ring accessible name includes spent, allocation, days remaining, pace, source, and rounding/confidence.
- Assert no visible/aria copy contains `Allocated this mission`, `short detail`, or a Spotify Dining row. CIA copy must name the evidence window/source/confidence and remain non-judgmental.
- Activate header Edit, Ask CIA, See all, each activity row, Recategorize, Replace/delete receipt, Edit budget, and Add note; each produces an appropriate local mode/sheet/outcome.
- Posted delete opens a confirmation naming the exact merchant and amount plus `cannot be undone`; Cancel does not mutate; confirm yields a local success or explicit failure fixture. Pending and offline states cannot activate delete.
- Invalid budget/category/receipt saves remain disabled with a visible/associated reason; success/failure is announced; focus and original mode remain predictable.
- Full nine-label data controls are present and locally scoped. No bank, Plaid, export, storage, receipt file/camera, payment, or network capability event occurs.

### 390×844 and actual 125% risks

- The current concatenated composition is needlessly tall; splitting modes materially improves hierarchy. Even split, the CIA card, two activity rows, bottom action set, consent controls and footer must remain reachable without hidden controls.
- `12 days left · On pace`, `$480 / $620`, provenance chips, two-column action buttons, `Replace or delete receipt`, destructive copy, and nine data-control chips are the main wrap/overflow risks at 125%.
- Sheets need an internal scroll boundary and opaque scrim; the destructive CTA must not be clipped below the 844px safe area and must remain separated from Cancel.

## Accepted-through-F2 sentinel proposal (exclude G1 targets)

Freeze an exact **81-file, non-overlapping union** before any G1 product write:

1. the 61 paths in `plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256`;
2. the 10 paths in `plans/batches/VISUAL-012-F2-health-care-media/evidence/ACCEPTED-F1-ADDITIONS-BEFORE.sha256`; and
3. a new `ACCEPTED-F2-ADDITIONS-BEFORE.sha256` containing current hashes for exactly:
   - `balencia-screens/src/components/hifi/screens/health/S57ShoppingList.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S58SleepTracking.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S60MedicationTracking.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S62QuickNotes.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S63EnergyTracking.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S70ExerciseLibrary.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S86VirtualTryon.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S87TryonHistory.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S88VisionSuite.tsx`
   - `balencia-screens/src/components/hifi/screens/health/S89Wellbeing.tsx`

All nine G1 product targets (including S30/S31) are excluded. The verifier must reject malformed rows, duplicates across manifests, a union count other than 81, missing paths, pre-run drift, or start/end drift. Shared kit, registry, routes, and the dedicated verifier/API belong in separate start/end product/API fingerprints, not the immutable accepted-product manifest.

## Sol freeze decisions before writer release

1. Freeze the finance fixture disclaimer/provider naming and DEP-FIN posture; current `Finance API`/`Plaid` language is too launch-ready without qualification.
2. Freeze S30 domain level (active spec 8 versus live 12) and remove/identify S31's unrelated `Amira · Lv 12` footer.
3. Freeze S30's fourth category (`$800`) and the exact low-confidence/honest-null payloads; every visible number must derive from them.
4. Freeze S31's default mode, ContextToggle behavior, defensible replacement for Spotify, posted/pending destructive rules, and nearest-integer budget rounding.
5. Freeze whether optional `+40 XP · Finance` is current authority. Omit it if not proven; this is a reward decision, not a visual-worker choice.
6. Freeze the proposed 14-state S30 / 16-state S31 matrix or a documented strict superset, exact 81-file sentinel union, and no-raster dispositions before implementation.
