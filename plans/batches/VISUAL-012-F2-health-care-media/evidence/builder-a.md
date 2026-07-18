# F2 builder A evidence — screens 57, 58, 60

Worker output is implementation evidence only; Sol retains acceptance authority.

## Product scope changed

- `S57ShoppingList.tsx`
- `S58SleepTracking.tsx`
- `S60MedicationTracking.tsx`

No shared kit, verifier, browser/server, git, submodule, or out-of-packet product file was changed.

## Implemented states and outcomes

### 57 — Shopping list

- Emits `data-f2-state="57-<state>"` for all 11 frozen fixtures.
- One eight-item fixture derives six open, two purchased, and 25%; low/offline states label the approximate value and sync condition.
- Native labeled add textbox/form and eight native checkboxes; checkbox click/Space updates derived counts and exposes a polite Undo recovery action.
- Explicit 44px edit buttons provide the motor/keyboard fallback; edit fixture has a labeled local form.
- Honest-null, skeleton, cached error, offline, all-done, sync-disabled, check-undo, and data-control presentations are implemented.
- Empty actions, share, clear, CIA, and import remain deterministic local previews without external capabilities.
- Full nine-disposition data-control rail and source/scope/freshness/confidence/retention copy are visible.

### 58 — Sleep tracking

- Emits `data-f2-state="58-<state>"` for all 12 frozen fixtures.
- Default derives score 82, 7.2 hours, recovery 64%, WHOOP source, and 2-hour freshness.
- Seven-column trend includes an actual null/dashed gap plus accessible text: six logged nights and one missing gap, never zero/interpolated.
- Thirty-night record distinguishes solid measured/manual cells from five dashed missing cells with a text summary.
- Seven-night consistency evidence is accessible; manual-only and honest-null omit both Sleep stages and Recovery modules.
- Native range tabs update `aria-selected` and local status.
- Focus-managed manual log, data controls, and qualified-support overlays use `E1Modal`; manual Save stays disabled until date, bedtime, and wake fields are populated.
- Offline/cached error, low-confidence, skeleton, manual-only, success, data, and safety fixtures are implemented; local safety remains reachable offline.

### 60 — Medication tracking

- Emits `data-f2-state="60-<state>"` for all 11 frozen fixtures.
- Uses only the Sol-approved fictional fixtures `Daily support A/B/C` with `Dose A/B/C` and the exact approved non-prescriptive safety text.
- One four-event fixture derives three complete / four scheduled / 75%; checkbox mutation derives 4/4 and 100% without storage, provider, or network access.
- All four statuses are native labeled checkboxes and expose name, non-clinical dose label, due time, and current state without color-only meaning.
- Roster explicitly separates three fictional items from four dose events; low-confidence affects history labeling, not explicit local toggles.
- Real history renders exactly 28 labeled day cells with non-color summary; partial error retains the current local schedule and provides a 44px Retry.
- Canonical `PaywallLock` covers a real CIA preview with one premium-information CTA and no checkout/payment behavior.
- Focus-managed Add and data-control overlays implement disabled/valid, Escape/close/focus restoration via `E1Modal`, full dispositions, and local confirmation previews.
- No real medication name, clinical unit, permissive adherence wording, medical recommendation, or restricted capability remains.

## Targeted checks

- `npm run typecheck` — PASS.
- `npx eslint src/components/hifi/screens/health/S57ShoppingList.tsx src/components/hifi/screens/health/S58SleepTracking.tsx src/components/hifi/screens/health/S60MedicationTracking.tsx` — PASS, zero output.
- Forbidden-string/capability scan for `Adderall`, `Take when ready`, `no pressure`, navigator/storage/fetch — PASS, zero matches.

## Residual risk for root verification

- Production screenshot geometry, exact 122-context verifier assertions, focus restoration, and live keyboard behavior require the root-owned fresh production acceptance run.
- `ConsentRail` links to the local data-source screen by shared-kit design; destructive semantics are additionally represented as local confirmation previews in screen 60.
