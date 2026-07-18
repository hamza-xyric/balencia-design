# F2 reconciliation A — screens 57, 58, 60

Worker role: Luna read-only inventory. This is evidence, not acceptance. Current hi-fi specs and canon were compared with the historical F2 audit, current product modules, and the accepted F1 verifier pattern. Medical/safety decisions remain with Sol.

## Cross-screen implementation and verification contract

- Use deterministic `?state=` fixtures read once on mount, and expose exactly one marker per render: `data-f2-state="<id>-<state>"` on the screen `main`.
- Keep the prototype capability-free: local React state only; no provider/API, storage, file picker, clipboard, share sheet, vibration, payment, notification, credential, or external-navigation side effect.
- Minimum verifier floor per fixture: exact marker, no horizontal/phone-frame overflow, no visible control below the safe action boundary, every visible native control at least 44×44px, no nested interactive controls, no console/page/capability event, isolated storage/cookies, deterministic consecutive PNGs, and an actual 125% text-scale proof for each screen.
- All health/source surfaces need category, source, scope, freshness, confidence, retention, export, revoke, and delete disposition. `ConsentRail compact controls={FULL_DATA_CONTROLS}` is the likely shared-kit baseline; source-specific controls may need a local dialog/sheet.
- Canon conflicts visible in current code: white text on orange CTAs, sub-12px semantic copy, and paper text below the intended secondary 64% floor. Repairs should use `focus-ring`, paper/ink CTA text with verified contrast, and canonical button/input/card primitives.

## 57 — Shopping list

### Current strengths

- Correct source-only/nested route disposition is documented in code; no live app route is invented.
- Default summary is internally correct: 8 items, 2 purchased, 25%, `Computed locally`.
- Categorized solid list surfaces, source chips, a visible estimated/sync-pending quantity, allergy/restriction copy, and 44px visual checkbox boxes align with the intent.
- No raster slot is required.

### Exact gaps

- `GlassPillInput` is a visual wrapper with no native labeled text input; Add has no handler/outcome.
- `ShoppingItemRow` uses a focusable `span role="checkbox"`, not a native checkbox/button, and has no keyboard/click mutation, undo toast, edit action, explicit motor fallback, or purchased-section movement.
- The checkbox aria-label says `Double-tap to mark purchased` even for an already purchased row and does not expose the spec's reversible outcome.
- Hide purchased, Clear purchased, and Share are inert. Share must remain a local preview and must not invoke `navigator.share`.
- Only 4 of the 8 stated rows are rendered while the hero claims 8. That can be valid only if the collapsed purchased and omitted categories are visibly reconciled; current UI exposes neither six remaining open rows nor two purchased rows.
- Skeleton, honest-null, cached error, offline/low-confidence, success, disabled/syncing, data-control, and edit/undo outcomes exist only in comments.
- `ConsentRail` uses its default compact controls rather than an explicit full-control contract.

### Required visible fixtures / query keys

Recommended frozen set:

`default`, `low-confidence`, `honest-null`, `skeleton`, `error-cached`, `offline`, `check-undo`, `all-done`, `sync-disabled`, `edit-item`, `data-controls`.

`default` should visibly reconcile all 8 items (6 open + 2 purchased/collapsed); `low-confidence` must show `~25%` and `Estimated · sync pending`; `honest-null` must show `---` plus empty-list actions; `error-cached` must retain labeled stale rows; `offline` must distinguish cached availability from unavailable mutations; `all-done` needs a reduced-motion-safe success state.

### Hard assertions / interaction proof

- Body matches `8 items`, `2 purchased`, and `25%` together in default; six unchecked and two checked item records are derivable from the same fixture data.
- `getByRole('textbox', {name:/add.*item/i})` and a submit button exist; submitting a non-empty local value visibly adds one row and updates denominator/math without storage/network.
- Native checkbox count matches visible item count; Space toggles; focus stays predictable; a polite status offers Undo; Undo restores count and ordering.
- An explicit `Edit <item>` button or accessible action sheet is keyboard reachable without swipe/long-press.
- Empty actions are `Talk to CIA` and `Import from diet plan`; neither performs external navigation or API work.
- Data-control fixture includes all nine dispositions and no destructive control acts without confirmation.

### Accessibility/trust risks and shared-kit needs

- Blocker: non-native checkbox and absent add input.
- Blocker: gesture-only source behavior has no explicit motor/keyboard equivalent.
- Trust: summary/row mismatch can make completion progress fabricated.
- Likely shared-kit reuse: `BtnPrimary`, `BtnSecondary`, `BtnGhost`, `HonestNullState`, `SkeletonState`, `OfflineBanner`, `ConsentRail/FULL_DATA_CONTROLS`; a screen-local native `ShoppingItemRow` is acceptable because the spec already flags it `NEW`.

## 58 — Sleep tracking

### Current strengths

- Strong above-fold hierarchy with coherent real fixture: sleep score 82, 7.2 hours, recovery 64%, span, reserve, provider/freshness provenance.
- CIA guidance is hedged rather than diagnostic; source actions, missing-night explanatory copy, manual-log FAB, heatmap, hygiene tips, and a safety card are present.
- Missing duration data is not silently rendered as zero in prose; no raster slot is required.

### Exact gaps

- Current trend supplies only six values to a continuous `TrendChart`; the missing seventh night is stated below but not visually/semantically encoded as an actual gap.
- `HeatGrid` uses numeric zero cells without a per-cell/state semantic distinction between missing, manual, provider, or measured-low values.
- The consistency graphic is five decorative dots, not the specified seven-night bedtime/wake `ConsistencyCloud`, and its data/source/confidence are not exposed to assistive technology.
- Stage and recovery subcards lack their own provider provenance. Manual-only/honest-null must hide both entirely, not show empty/fabricated values.
- Data sources and Ask CIA are interactive chips with no visible local outcome; `SafetyCard` must prove an always-reachable local crisis/support destination, including offline.
- No skeleton, low-confidence, honest-null, manual-only, sync-error/cached, offline, save-disabled, manual-save-success, explicit data-controls, or safety-open fixture exists.
- Trend tabs are static; no range changes or status proof. Tips appear visually card-like but are not expandable controls as the spec describes.

### Required visible fixtures / query keys

Recommended frozen set:

`default-real`, `low-confidence`, `honest-null`, `manual-only`, `skeleton`, `sync-error-cached`, `offline`, `range-14d`, `manual-disabled`, `manual-success`, `data-controls`, `safety-open`.

`low-confidence` may mute/approximate score or duration but must not show low-confidence stages; `honest-null` shows a faint/empty hero and manual action; `manual-only` hides stages and recovery; cached error/offline states name freshness and preserve only defensible values.

### Hard assertions / interaction proof

- Default body contains 82, 7.2 hrs, 64%, provider and freshness; trend accessibility summary explicitly says six logged nights and one missing gap.
- The chart DOM/accessible description contains a seventh missing datum, not a zero; heatmap semantics distinguish missing nights from logged-quality values.
- Default consistency evidence describes seven nights and the stated `5 of 7 within 30 min`; low-confidence names fewer than seven nights.
- Manual-only and honest-null have zero `Sleep stages` and zero `Recovery` modules, while a labeled manual-log control remains.
- Open manual log produces a dialog/sheet with labeled date, bedtime, wake time, and quality fields; Save is disabled until required values are valid; success is announced locally.
- Data sources opens the complete source-control surface. Safety action opens a focus-managed local support dialog, remains enabled offline, closes with Escape, and restores trigger focus.
- Range tabs update `aria-selected`, chart copy, and a polite local outcome without fabricating data.

### Accessibility/trust risks and shared-kit needs

- Blocker: crisis/support reachability is not proven.
- Critical honesty risk: a continuous chart can visually interpolate across an unlogged night despite corrective caption copy.
- Screen-reader risk: consistency dots and heatmap do not communicate source/gaps/confidence.
- Likely shared-kit reuse: `SafetyCard` with a real local destination, `E1Modal`-style focus handling, `SkeletonState`, `HonestNullState`, `OfflineBanner`, `ConsentRail/FULL_DATA_CONTROLS`. The spec already authorizes a new `ConsistencyCloud`; it needs an accessible textual summary.

## 60 — Medication tracking

### Current strengths

- Correct source-only/no-live-route intent; labeled Add medication glyph; hero, timeline, roster, partial heatmap error, doctor warning, provenance, and privacy copy establish the required information architecture.
- Hero arithmetic itself states the desired 75% / 3 of 4 and uses local-log provenance.
- No raster slot is required.

### Exact gaps and Sol-owned safety conflicts

- **Medical-safety blocker:** live code uses `Adderall XR`, `Take when ready`, and `no pressure on the last`. The historical audit/current batch direction requires a neutral demo medication and safety-reviewed adherence copy. The hi-fi sketch still contains Adderall, so this is a source conflict for Sol; do not preserve the named stimulant merely because it appears in the sketch.
- **Truth blocker:** hero says 3/4 complete, but only two timeline rows are checked. Roster claims 3 listed while four daily dose rows are shown, and the roster includes the named stimulant but omits evening melatonin. Derive hero, schedule, and roster from explicit fixture data or clearly separate medication count from dose count.
- Dose rows are inert divs with color/icon-only status; no native checkbox/button, accessible due/status label, keyboard behavior, error recovery, or visible local outcome.
- Purple is used for pending medication timeline/status and safety border; canon reserves purple for CIA/projection/premium. Pending should be neutral/orange as appropriate, and safety should not masquerade as AI.
- CIA is an ad-hoc lock action inside the card rather than canonical `PaywallLock` over a real preview with one unlock CTA.
- Only heatmap error exists. There is no real 4×7 grid, roster low-confidence/null, cold-start, skeleton, 100% success, add-modal disabled/valid state, free entitlement, or full data-controls state.
- `500mg` Vitamin D is a potentially unsafe-looking demo quantity. Sol/qualified review should approve all demo names, units, and copy; Luna recommends neutral fictional labels and clearly non-prescriptive fixture framing rather than supplying medical doses.
- Privacy footer says controls live in settings but does not provide category/scope/freshness/confidence or reachable export/revoke/delete controls.

### Required visible fixtures / query keys

Recommended frozen set:

`default-real`, `roster-low-confidence`, `honest-null`, `skeleton`, `heatmap-error-cached`, `dose-success`, `all-doses-complete`, `add-disabled`, `add-valid`, `free-paywall`, `data-controls`.

Use one neutral, explicitly fictional/demo fixture approved by Sol across every state. `default-real` must derive 3 checked doses from 4 scheduled doses; `all-doses-complete` derives 4/4 = 100%; honest-null derives 0/0 or a clearly defined 0% cold-start without contradictory denominator; roster-low-confidence affects only delayed synced history, never explicit local dose toggles.

### Hard assertions / interaction proof

- Default fixture data yields exactly four scheduled doses and three native checked statuses; hero text is `75%` and `3 of 4 doses today` from that same data.
- No body/aria text matches `Adderall`, `Take when ready`, `no pressure`, or an unapproved medical instruction. Doctor warning remains visible.
- Each dose is a native checkbox/button with a complete label containing neutral medication, demo amount if approved, due time, and current status; state is not color-only.
- Toggling the pending dose updates checkbox state, hero to 4/4 and 100%, green completion treatment, and polite status without storage/network/haptic calls.
- Default and real-history fixtures expose exactly 28 heatmap cells with a non-color textual summary; error fixture retains cached hero/schedule and offers a 44px Retry local preview.
- `free-paywall` renders one canonical `PaywallLock` over a real CIA preview, with one labeled premium-information CTA and no checkout/payment/storefront capability.
- Add dialog has labeled neutral fields, disabled Save and reason, valid-state enablement, Escape close, focus containment/restoration, and local-only success.
- Data controls expose all required dispositions; revoke/delete require confirmation and remain local previews.

### Accessibility/trust risks and shared-kit needs

- Critical: named controlled medication plus permissive adherence language can be interpreted as medical direction.
- Critical: 3/4 hero contradicts two checked doses; medication/dose counts are ambiguous.
- Blocker: dose status is inert and color-only.
- Trust: unreviewed demo amounts and an error-only history make the screen look operational without defensible state coverage.
- Required shared-kit reuse: canonical `PaywallLock`, native controls styled with `focus-ring`, `BtnPrimary/Secondary`, focus-managed modal, `SkeletonState`, `HonestNullState`, `OfflineBanner`, `ConsentRail/FULL_DATA_CONTROLS`. The spec-authorized local `TimelineAgenda` and `AdherenceHeatmap` should remain screen-specific but data-derived and fully labeled.

## Priority recommendation to Sol

1. Freeze a clinically neutral fictional medication fixture and approved non-prescriptive copy before implementation of screen 60.
2. Freeze one data model per screen so visible KPIs are derived rather than separately typed.
3. Freeze the proposed query matrix and exact `data-f2-state` marker contract before writer packets.
4. Treat screen 60 safety/math/native controls, screen 58 missing-night/safety semantics, and screen 57 native input/checkbox recovery as hard acceptance gates.
