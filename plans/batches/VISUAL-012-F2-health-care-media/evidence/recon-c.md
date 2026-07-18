# F2 reconciliation C — screens 86, 87, 88, 89

Scope is read-only inspection of current specs, the historical F2 audit, live product modules, shared-kit behavior, F1 acceptance evidence, image-slot authority, and verifier conventions. This is worker evidence, not acceptance. Safety/privacy decisions remain Sol-owned.

## Executive inventory

- All four live modules are static default-only implementations. None reads `?state=`, emits an exact query-state marker, or provides deterministic state variants. The current route wrapper also passes no search parameters; the established F1 pattern is for each client screen to read `useSearchParams()` itself and expose a screen-specific `data-*` marker.
- Existing strengths are real: 86 has unusually explicit purpose/retention/no-training/revoke/delete copy; 87 exposes source deletion, render confidence, export and deletion concepts; 88 has a strong non-diagnostic boundary and urgent symptom copy; 89 places crisis resources above modules and presents its four signals as wellbeing rather than diagnosis.
- Current hard defects remain: 86 derives contradictory consent/media states and exposes a non-interactive scrubber before a render exists; 87 labels three May 21 rows as `2 looks` while the hero claims seven; 88 has a 28px switch, displays an implementation note in default UI, and lacks the required visual/state behavior; 89 has conflicting one/two breathing-session copy, generic provenance, inert module/source chips, no privacy sheet, and insufficient bottom-action clearance.
- Shared-kit reuse is preferred: `SafetyCard` is already a real same-origin Help Center anchor and therefore can remain reachable offline; `ConsentRail` should use `FULL_DATA_CONTROLS`, not its privacy-only default, where the spec requires category/source/scope/freshness/confidence/retention/export/revoke/delete. Existing dialog/focus patterns from accepted families should be reused rather than new shared primitives.

## 86 — Virtual try-on

### Current strengths

- Correct warm-dark hierarchy, explicit `preview only`, 30-day retention, no model training, revoke/delete entry points, source/render labels, four-step rail, low-confidence safety-scan explanation, and no identifiable person.
- Camera/upload/generate/delete controls are native buttons and nominally 44px; CIA evidence names profile preference and manual prompt.

### Exact gaps and risks

- The card says consent is accepted and revocable, while disabled copy says `Needs photo consent`; these must derive from one consent value.
- `Via upload` claims a source exists, `Pending render` says no output exists, yet a before/after scrubber is shown. The scrubber must not exist until both safe source and generated images exist.
- The scrubber is decorative (`aria-hidden`) rather than a native range/equivalent control, so the spec's finger tracking, reset, keyboard operation and announced value are absent.
- Delete actions have no confirmation or visible outcome; camera/upload/generate/history controls have no deterministic local outcome. Failed scan naming exists only in the default composition, not a distinct error state.
- Only five privacy concepts are explicit; category, scope, freshness, confidence and export need visible/reachable treatment. CIA guidance must be null until consent plus evidence exists.
- The slot is a text placeholder, not a deliberate asset disposition marker.

### Frozen state/query proposal

Use `?state=` with exact marker `data-tryon-state`:

1. `default-consented` — safe source exists, no render yet, consent accepted; no scrubber.
2. `empty-unconsented` — honest null, upload/camera choices, retention/purpose copy, no CIA claim.
3. `skeleton` — fixed preview geometry, no invented body/photo.
4. `safety-unclear` — source retained if safe, failed/unclear **Safety scan** step named, generation disabled for that reason only.
5. `render-error` — generated pane error, source retained, retry/delete outcomes.
6. `success` — both privacy-safe panes, native comparison control, render timestamp/confidence, save/share/delete/history.
7. `consent-revoked` — no source/render disclosure, generation disabled, deletion/retention status visible.
8. `offline-disabled` — local deletion remains reachable; capture/render disabled with reason.
9. `delete-confirm` — destructive dialog with source/generated/all-data scope and cancel/confirm focus behavior.
10. `data-controls` — full nine-control privacy sheet.

Reduced motion should be verified through a reduced-motion browser context on `success`, not by a default-screen implementation note.

### Hard assertions

- One consent source drives `data-consent-state`, CTA enabled state and reason copy; accepted/revoked/unaccepted cannot coexist.
- `role=slider`/native range count is zero before `success`, exactly one in `success`, named `Compare source and generated look`, keyboard operable, and exposes current split.
- No CIA recommendation in `empty-unconsented` or `consent-revoked`; success names at least two evidence sources.
- Failed state text names `Safety scan` or `Render`; destructive confirmation receives focus, Escape closes/restores focus, and confirm produces an announced status.
- All visible controls are >=44px, named, and outcome-bearing; no media/camera/file/share capability invocation during verifier interaction.

### Likely kit need

- Prefer a screen-local native range and accepted-family dialog pattern. A shared `TryOnPreviewCanvas` is not necessary for this batch unless another consumer appears. Reuse `ConsentRail controls={FULL_DATA_CONTROLS}`.

## 87 — Try-on history

### Current strengths

- Native 44px filter tabs and icon buttons; rows convey source retained/deleted, render confidence, low-confidence status, provenance, reuse/delete concepts; CIA has the minimum three-look evidence; export/delete-all controls and privacy rail exist.

### Exact gaps and risks

- `May 21 · 2 looks` renders three rows. Hero `Saved looks: 7` is also not derivable from the three displayed fixtures. Count/date grouping must derive from one array or the remaining four must be explicitly summarized/paginated.
- Hero provenance `Try-on history provenance` is content-free; freshness/source are missing. `ConsentRail` defaults to only five controls, omitting category/scope/freshness/confidence.
- Thumbnails are generic camera glyphs with no explicit HIFI disposition marker. Reuse/delete/filter/export/options are inert and destructive actions lack confirmation/outcome.
- No skeleton/empty/error/offline/disabled/success evidence. Sharing state is not represented despite the Shared filter.

### Frozen state/query proposal

Use `?state=` with exact marker `data-tryon-history-state`:

1. `default` — array-derived hero and group counts, explicit source/freshness.
2. `filter-shared` — selected Shared tab and only shared rows/count.
3. `filter-deleting` — pending-delete rows and local deletion availability.
4. `empty` — no numbers, route/action back to screen 86.
5. `skeleton` — geometry-only counts/thumbs.
6. `low-confidence` — stale sync and one row with incomplete render metadata.
7. `offline-cached` — cached rows, sync banner/retry; local-ID delete remains enabled.
8. `error` — named sync failure while cached rows remain if available.
9. `reuse-success` — local prompt handoff status / deterministic screen-86 link.
10. `delete-confirm` — scoped destructive dialog.
11. `delete-pending` — row/counts update from the same fixture and announced outcome.
12. `data-controls` — full nine controls.

### Hard assertions

- Group count equals rendered rows in that group; hero saved count equals the canonical fixture total or explicitly says `3 shown of 7`.
- Every row accessible name/description includes look name, source state, render confidence, retention and available actions.
- Default provenance includes concrete source and freshness; Shared state exposes a completed/unknown sharing distinction.
- Filter selection changes visible rows and count without route drift; delete confirmation has focus containment/restore and an announced pending/deleted outcome.
- Empty has no fabricated count; offline preserves delete only when a local identifier is present.

### Likely kit need

- Keep `LookTimelineRow` screen-local. Reuse existing dialog/focus and `FULL_DATA_CONTROLS`; no shared-kit mutation is inherently required.

## 88 — Vision suite

### Current strengths

- Strong explicit `Non-diagnostic` language, urgent flashes/floaters/sharp-pain guidance, 20-20-20 instruction, plausible coexistence of a 2:00 overall exercise and 15-second sub-timer, manual-source/freshness provenance, native tab and urgent-guidance buttons.

### Exact gaps and risks

- The visible switch itself is 48x28, failing the 44px target requirement even though its surrounding row is tall; the actual interactive hitbox is only the button.
- `Reduced motion shows...` is an implementation note displayed in default product UI. Required behavior is absent: no query states, no running timer, and no proof that ring/chart/glow motion is removed while text state remains clear.
- No HIFI-88-01/non-diagnostic code-native asset disposition is present. Current ring/chart alone do not clearly fulfill the eye-test/exercise visual slot.
- Tabs, reminder/info, exercise, urgent guidance, consent switch and data controls are inert. Only privacy-five controls are shown, not the required full set.
- No skeleton/empty/error/success/disabled or honest-null eye-test states. `Last eye test: Non-diagnostic` is a boundary, not an actual result/source state.

### Frozen state/query proposal

Use `?state=` with exact marker `data-vision-state`:

1. `default` — exercises selected, no diagnostic result claim.
2. `eye-test-null` — no prior result/score; start option and disclaimer.
3. `exercise-active` — discrete timer state and pause/stop outcomes.
4. `exercise-success` — completed duration/timestamp, green completion and optional reminder.
5. `strain-low-confidence` — fewer than three entries and clearly hedged trend.
6. `empty` — three entry paths, urgent guidance retained.
7. `skeleton` — fixed geometry, no score.
8. `error` — failed tool named, urgent guidance retained, retry outcome.
9. `disabled` — specific permission/motion/connectivity/safety reason; urgent guidance never disabled.
10. `offline` — local exercises/log available as appropriate, remote actions reasoned.
11. `consent-off` — switch false; log claims removed, delete/export controls remain reachable.
12. `data-controls` — full nine controls.

Reduced-motion acceptance should run `exercise-active` with `reducedMotion: reduce`, assert the same text/timer status, and assert no animated arc/chart transition; no implementation-note copy should appear.

### Hard assertions

- Switch interactive bounding box is at least 44x44, named, toggles `aria-checked`, and produces visible/announced local outcome.
- Every state retains `Not a diagnosis`; error/disabled/offline also retain a real `Find urgent guidance` destination.
- No acuity/color score is emitted in null/empty/skeleton. Any completed task announces instructions, non-diagnostic status and completion before result-like copy.
- Start/pause/complete interactions change state deterministically; all tabs change content and `aria-selected` coherently.
- A code-native `data-asset-disposition="HIFI-88-01-code-native-non-diagnostic"` visual has no identifiable person, logo, private/readable text, or medical interpretation.

### Likely kit need

- A screen-local code-native optotype/focus exercise visual is sufficient. Expand the switch button itself; reuse accepted dialogs and full ConsentRail rather than creating a global toggle component unless another F2 builder needs it.

## 89 — Wellbeing hub

### Current strengths

- Correct System Field hierarchy, four non-diagnostic signals, crisis card immediately after hero and above modules, CIA visually separated in purple, no raster requirement, and a labelled Help control.
- Shared `SafetyCard` already links to `/screens/25?support=crisis`, so the safety destination can remain present in empty/error/offline states without invoking a forbidden external capability.

### Exact gaps and risks

- Hero says `One breath session helped twice`; CIA says `two breathing sessions this week`. One canonical fixture must drive both or the first must be rewritten to a non-conflicting fact.
- CIA action chips are display-only. All eight module cards are non-interactive `div`s; `Fresh source` is generic and repeated without actual source/freshness. Schedule/virtual try-on access from the spec is absent.
- No data/privacy sheet entry, full control set, `what this logs` pre-save path, or consent exits for sensitive modules.
- No skeleton/empty/error/success/disabled/offline/low-motivation state. Safety must remain operational in every one.
- Bottom padding is `pb-4` while a floating quick-log action is mounted; this risks obscuring the Today row/insight actions and fails reserved bottom clearance.

### Frozen state/query proposal

Use `?state=` with exact marker `data-wellbeing-state`:

1. `default-real` — one coherent two-session fixture cited in hero and CIA, concrete source/freshness.
2. `low-confidence` — hedged inferred mood/stress, no sensitive detail behind premium treatment.
3. `honest-null` — no mood/stress/sleep/energy numbers, first mood-log action; crisis unchanged.
4. `skeleton` — hero/CIA/modules preserve geometry; crisis is real and immediately available, not shimmer-only.
5. `source-error` — failed source named per tile, cached values marked cached.
6. `offline` — crisis and local/national fallback copy present; local logs/actions truthfully available.
7. `mood-success` — hero updates from the same fixture and announces completion.
8. `breathing-success` — session count increments once everywhere and announces completion.
9. `module-disabled` — source-dependent tiles dim with reasons; crisis never disables.
10. `low-motivation` — reduced module density while safety/core self-care paths remain.
11. `what-this-logs` — pre-save sensitive-data dialog with category/source/scope.
12. `data-controls` — full nine-control sheet for mood/journal/health/photo-adjacent exits.

### Hard assertions

- Breathing count is derived once and matches every visible claim before/after success.
- Crisis link exists, is named, and remains enabled/reachable in all 12 states including offline/error/skeleton/disabled.
- Module entries are native anchors/buttons with real deep routes or local outcomes; every visible source action names source and freshness.
- Data controls include all nine required concepts; the `what this logs` dialog precedes a sensitive quick-save and restores focus on Escape.
- Bottom content/action clearance prevents overlap at 390x844 and actual 125% type scale; all controls remain >=44px.

### Likely kit need

- Reuse `SafetyCard`, existing focus-managed dialog patterns, `FULL_DATA_CONTROLS`, and real links. `RegulationTile` can remain screen-local unless a second consumer is proven.

## Privacy-safe image-slot dispositions

The slot authority says image generation is not blocking. All four F2 slots can be deliberately fulfilled code-natively, avoiding faces, bodies, homes, documents, provider/brand logos and private/readable text:

| Slot | Proposed disposition | Required marker / accessible treatment |
|---|---|---|
| `HIFI-70-01` | Code-native equipment/instruction diagram using abstract bench/mat/dumbbell geometry; no person and no exercise diagnosis. | `data-asset-disposition="HIFI-70-01-code-native-instructional"`; card accessible name separately announces exercise facts. |
| `HIFI-86-01` | Code-native neutral fabric/mannequin-free swatch or garment silhouette pair; source/generated panes only after corresponding state exists. | `data-asset-disposition="HIFI-86-01-code-native-no-identifiable-person"`; state-aware source/generated alt text, never fake user media. |
| `HIFI-87-01` | Code-native garment/swatch thumbnails varied by look fixture, with no human form. | `data-asset-disposition="HIFI-87-01-code-native-no-identifiable-person"`; row label carries source/retention/render truth. |
| `HIFI-88-01` | Code-native non-diagnostic focus/optotype or 20-20-20 target with abstract shapes and no result interpretation. | `data-asset-disposition="HIFI-88-01-code-native-non-diagnostic"`; accessible name explicitly says exercise visual, not a diagnosis. |

No new raster is recommended for these slots in F2. If Sol chooses raster instead, provenance and the same privacy/non-diagnostic constraints remain mandatory.

## Exact accepted-through-F1 sentinel candidate

The correct pre-F2 set is **71 unique product files**:

1. Preserve all **61** unique rows from `plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256` byte-for-byte.
2. Append the ten F1-accepted product files below at their current accepted hashes:

```text
7909d3742ea6ad937deaf14a382ca4c000298b66f36f75c1919ed3b4042c33ad  balencia-screens/src/components/hifi/screens/health/S26FitnessDashboard.tsx
d252de1f968149e15ba0c298bd49211113bcd6a3ecc443b24981409c50db7ca7  balencia-screens/src/components/hifi/screens/health/S27WorkoutDetail.tsx
bf291bd9ab7c1d6ebf5c425247f55ef80419498b41f5352aa15417298b5e45d5  balencia-screens/src/components/hifi/screens/health/S28NutritionDashboard.tsx
ad396a20be837d4df462e698ab0a57f8d607d07a9c2908ce98542e543a4a6c4c  balencia-screens/src/components/hifi/screens/health/S29MealDetail.tsx
dcf25a710a984e2daff5762ef16e4548a416ff3945834d33b869f33a50b890df  balencia-screens/src/components/hifi/screens/health/S49ProgressPhotos.tsx
1800167f29fec4d30122fae0845b13f3d9269d6293958d899735e3646f6c7095  balencia-screens/src/components/hifi/screens/health/S52StressManagement.tsx
c30ac17d3177dc90f567df2bd19ef08cc71f48767c9560a1dfa12389a47cd433  balencia-screens/src/components/hifi/screens/health/S53BreathingExercises.tsx
9c4a8abc483814950ff0252def7bbd8fabb10b668c36717c01177b6619ae5eec  balencia-screens/src/components/hifi/screens/health/S54Meditation.tsx
8886f129efb5cf0a7ddb7e7e465d62a2c598729806adc5ff2276c9087dff9ad0  balencia-screens/src/components/hifi/screens/health/S55YogaSessions.tsx
996d92e6a08824205f8685b5f9ffb2eb7fd9f2a62dd2d402e334bcd1b7aab8a7  balencia-screens/src/components/hifi/screens/health/S56Recipes.tsx
```

This candidate intentionally excludes every F2 target (`57,58,60,62,63,70,86,87,88,89`) and all shared/verifier/authority files. Sol should freeze it as a new F2 pre-edit manifest and make the verifier fail closed on exactly 71 unique rows plus start/end hash equality.

## Cross-screen verification recommendation

- Candidate matrix for these four screens is 45 named PNG states (`86=10`, `87=12`, `88=12`, `89=11`) plus four screenshot-free real 125% proofs. Sol may consolidate only where a state remains semantically and visually evidenced; default-only comments are not evidence.
- Every state needs exact `data-*` query markers, 390x844/no-overflow, >=44px visible controls, named native controls, all-caps CIA, empty storage/cookies, zero console/page errors, zero forbidden capability events, and two consecutive byte-identical captures before promotion.
- Default interactions must be exercised, and high-risk dialogs (delete/data controls/what-this-logs) must prove focus entry, containment, Escape close and trigger-focus restoration.
- Safety assertions are fail-closed: 88 urgent guidance and 89 crisis resources remain reachable in error/offline/disabled/null states; 86 never reveals/compares media without consent and actual state-backed panes; 87 counts always derive from rows/data.

## Residual Sol-owned decisions

- Final safety-reviewed wording and jurisdiction behavior for vision urgency and crisis resources.
- Whether local prototype delete actions model `pending` versus immediate removal; whichever is selected must be consistent with retention/source copy.
- Whether the 86 default fixture is consented/no-render or consented/success. The former is safer and makes the no-scrubber-before-images invariant obvious.
- Whether to adopt the proposed exact 45-state matrix or a stricter superset after recon A/B; no product implementation should begin before the family-wide matrix and 71-file sentinel manifest are frozen.
