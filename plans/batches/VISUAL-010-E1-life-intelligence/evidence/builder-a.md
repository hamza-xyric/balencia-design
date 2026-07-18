# VISUAL-010 E1 — builder A evidence

Bounded implementation evidence for screens `16,20,48`. Worker output only; no acceptance decision.

## Allowed edits

- `balencia-screens/src/components/hifi/screens/intelligence/S16LifeAreas.tsx`
- `balencia-screens/src/components/hifi/screens/intelligence/S20CiaMemory.tsx`
- `balencia-screens/src/components/hifi/screens/intelligence/S48Intelligence.tsx`
- This evidence file.

No shared kit, globals, registry, verifier, docs, other screen, browser/server, external service, or `yhealth-app` change was made.

## Query-addressable state map

All states use `/screens/<id>?state=<value>` and initialize deterministically without storage, cookies, network, or device capability.

| Screen | State query values | Local interactive outcomes |
|---|---|---|
| 16 | `default`, `low-confidence`, `empty`, `error`, `offline`, `compare-week`, `domain-detail`, `data-controls` | Current/week/month mutually exclusive native selectors; domain rows open a labelled detail dialog; Data controls opens a labelled controls dialog; Close requests focus restoration. |
| 20 | `default`, `search`, `node-detail`, `edit`, `delete-confirm`, `success`, `error`, `offline`, `upload`, `citation-medical`; additionally `empty` is supported | Native search/clear and chapter selection; graph node, edit, flag, delete, upload, citation and settings controls have visible local outcomes; save/delete/upload/citation actions announce status; panels are modal-labelled and close requests focus restoration. |
| 48 | `default`, `low-confidence`, `empty`, `error`, `offline`, `contradiction`, `legend`, `timeframe` | Manage, Resolve, Dismiss, Legend and 7d/14d/30d are native controls; resolve/dismiss visibly remove the contradiction and announce an outcome; modal-labelled panels close with requested focus restoration. |

## Frozen hard-assertion implementation

### S16

- One exact ten-domain payload in canonical order drives the local radar polygon, accessible summary, reporting value and rows.
- Life Power uses the adjudicated local formula `round(average + (min / max) * 10)`: fixture average `43.3`, balance bonus `5.5`, displayed Life Power `49`. It does not call or label the shared CP helper.
- Default reporting is `10/10`; empty is `0/10`. Real, low-confidence, empty, error and offline outcomes are exclusive by query.
- Comparison controls expose one `aria-pressed` state and exact signed week/month deltas.
- Domain and data-control dialogs are native-triggered, labelled, modal visual previews with close/focus-return behavior. Data controls name category, scope, freshness, retention, export, revoke and delete.
- Radar is responsive (`220px`, `max-width:100%`); domain rows use resilient `minmax` tracks and 56px minimum native targets for 390px/125% reflow.

### S20

- Search is native, labelled, mutable, clearable and exposes a deterministic result summary. Six native tabs maintain exactly one selected chapter.
- Graph has a complete grouped AT summary and a native 44px Sleep node control. Node detail names both sources, 28 paired days/8 weeks, 2-day freshness, 78% confidence/method and an explicit non-causal boundary.
- First claim uses both sources/sample/window/freshness/confidence and non-causal wording. The honest-null second entry suppresses a definitive claim and says only that evidence is insufficient.
- Edit/save, flag, delete confirmation/undo notice, upload→processing preview, citation approval, medical boundary, offline cached behavior and error/success outcomes are visibly represented with local-only actions.
- Settings/consent text names categories, scope, freshness, retention, export, revoke and delete. Upload copy states no file leaves the prototype and nothing enters memory without approval.
- Actions wrap and tab rail scrolls, avoiding fixed-width action compression at 390px/125%.

### S48

- Replaced the overflowing shared 160px gauge usage locally with a responsive contained meter capped at 128px in a `minmax` grid. It exposes role, range and value.
- Score `87` exposes its three source categories, 2h freshness, high confidence and formula weights; low `64`, null, error and offline states are query-exclusive.
- The named axes are Sleep/Fitness/Nutrition/Wellbeing/Finance. Exactly 25 cells are derived; five diagonal cells announce not-applicable, and every non-diagonal cell exposes both axes, reinforcing/competing direction, numeric strength, 42 paired days/8 weeks, 2h freshness and medium confidence.
- Non-color matrix semantics are present in each cell's AT name and the visible `+`, `−`, `N/A` legend.
- Manage/Resolve/Dismiss/Legend/timeframes are native and have visible local outcomes. Exactly one timeframe is pressed.
- Personal-pattern copy says “co-varied” and “observation, not causation”; it names sample/window/freshness/confidence. Empty/error suppress the pattern and trend.

## Verification

Command, run from `balencia-screens/`:

```text
npx eslint src/components/hifi/screens/intelligence/S16LifeAreas.tsx src/components/hifi/screens/intelligence/S20CiaMemory.tsx src/components/hifi/screens/intelligence/S48Intelligence.tsx
```

Result: PASS, exit 0, no output.

`git diff --check` on the same three paths: PASS, exit 0.

SHA-256 after verification:

```text
1e2c589ab0e60b8bfac0c67fcafab12f52a60cc6116aec67b97d04bf0b2ae9a2  S16LifeAreas.tsx
eeaec53e80581d75dedb90bdc277506376108d0444474cc558d1a6a8bc36bf77  S20CiaMemory.tsx
23fe0de9381fc2fad72f57261e8a085f06b244919aecf700876622d3fb6daf2b  S48Intelligence.tsx
```

Browser/runtime/native-pixel verification remains the orchestrator's gate and was not run by this worker.
