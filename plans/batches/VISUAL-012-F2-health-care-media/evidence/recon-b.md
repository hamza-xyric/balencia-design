# F2 reconciliation B — screens 62, 63, and 70

- Worker role: Luna read-only inventory
- Date: 2026-07-16 PKT
- Authority: evidence only; Sol/root owns safety, architecture, implementation, and acceptance
- Sources read: current hi-fi specs, compact canon, component catalog, historical F2 audit, current product modules, current shared-kit contracts, and hardened verifier patterns
- Product mutation: none

## Cross-screen findings

- All three product modules currently render one default composition and do not read a query fixture. Each needs a typed allowlist, local `state` initialization from `URLSearchParams`, and one exact state marker for deterministic production verification.
- The current `GlassPillInput` is already a labeled native `input`/`textarea`; 62 and 70 can reuse it. Screen 63 currently uses a styled `div` for its note and another `div` for submit, so its logging surface remains non-native.
- Current `ConsentRail` defaults to the five privacy controls only. These health surfaces require `controls={FULL_DATA_CONTROLS}` so category, source, scope, freshness, confidence, retention, export, revoke, and delete are all reachable.
- Canon requires real, low-confidence, and honest-null treatment for every metric; 62 and 63 currently expose only real values. Screen 70 correctly includes categorical `Unrated` and an estimated form cue, but media and result-count variants are not separately fixtureable.
- Reduced motion should be verified through a real browser `reducedMotion: 'reduce'` context, not exposed as implementation-note UI. All query fixtures must remain one product state per frame.

## Screen 62 — Quick notes

### Current strengths

- Correct route intent and capture-first hierarchy: composer remains pinned through `HifiShell`, day-grouped notes follow the archive summary, and the screen uses one emphasis word.
- Native `GlassPillInput`, native mic/save buttons, labeled `Save note` and `Record voice note`, a disabled empty save state, and a reachable shared `SafetyCard` are already present.
- Existing notes distinguish `You logged` from `Derived from chat`; private-note copy and `ConsentRail` are present; the knee note says the member plans to rest and makes no diagnosis.
- Weekly trend label is screen-reader-readable and the composer actions are 44px.

### Exact gaps and reconciliation

- The summary overline says `Captured this month` while the only value is `12 This week`; it must show separate, explicit scopes. Recommended coherent fixture: `12 this week` and a separately labeled monthly count derived from the visible archive fixture. Never let one number sit beneath a contradictory period label.
- `Mood` is selected while Health, Mood/CIA, and Nutrition notes remain visible. Default must be inclusive `All`, or selecting a domain must actually filter the feed and update the result count/empty state.
- Input is native but static: there is no controlled draft, submit outcome, retry preserving typed text, queued-local outcome, or new-note insertion.
- Filters are button-like only if `interactive`; the default selection and every selected state need `aria-pressed` truth. Note expansion/tag/delete actions and undo/edit fallback are absent.
- The screen lacks explicit real/low/null archive-summary fixtures and does not label a monthly count, cache freshness, or pending sync at metric level.
- Current `ConsentRail compact` omits category, scope, freshness, and confidence. Use `FULL_DATA_CONTROLS`.
- Domain labels/colors need canonical reconciliation: the current `Health` chip uses the fitness token and the active Mood chip uses member-orange rather than a canonical wellbeing tag treatment.

### Required visible states and query keys

Use `?state=<key>` with exact marker `data-notes-state="<key>"`:

1. `default-real` — All filter; separate weekly/monthly KPIs; mixed-domain archive; empty composer/save disabled.
2. `low-confidence` — weekly trailing trend/count explicitly `sync pending` or `estimated · low confidence`; no precise unqualified number.
3. `honest-null` — summary number/chart hidden; `Your capture activity will appear here`; composer remains usable.
4. `skeleton` — depth-preserving summary/feed placeholders; composer usable.
5. `empty` — first capture prompt; filters hidden; composer available.
6. `search-empty` — archive retained but query/tag has no match; corrective clear-filter action.
7. `error` — typed draft retained; save failure and native retry.
8. `success` — saved local note at top of Today and visible status.
9. `offline` — cached archive label and queued-local capture outcome.
10. `disabled` — empty native composer and disabled native Save note.
11. `data-controls` — full nine-control rail/panel proof.

Optional interaction query key: `filter=health` may seed the actually filtered Health view, but the canonical product-state marker remains the `state` value.

### Hard assertions

- Exact state marker count is one; frame is 390x844; horizontal overflow <=1px; all visible controls are named and >=44px; no visible `SIA`, `Sia`, or `Cia`.
- `default-real` includes `All`, `12 this week`, a separately labeled monthly KPI, `You logged`, and `Derived from chat`; mixed domains are permitted only while All is selected.
- `low-confidence` contains `estimated` or `sync pending`; `honest-null` contains no archive KPI digits.
- `error` preserves a seeded draft after failed Save; `success` inserts one note and exposes a live status; `offline` says cached/queued locally.
- Save is a native button and the composer is a named native textbox. Empty Save is disabled; typing enables it; saving never invokes network/storage/account capability.
- Crisis-resource destination is a real local link; data controls expose all nine `FULL_DATA_CONTROLS` entries.

### Accessibility and trust risks

- Filter truth is currently contradictory and can mislead screen-reader and sighted users alike.
- Swipe-only note actions would be inaccessible unless accompanied by explicit edit/tag/delete buttons or a menu; destructive delete needs confirmation and undo.
- Small 11px/low-opacity metadata and domain-colored tags require contrast review at 125% text scaling.
- Crisis resources must remain reachable in default, empty, error, and offline states.

### Likely shared-kit needs

- No new global input primitive: reuse controlled `GlassPillInput`.
- Reuse `SafetyCard`, `FULL_DATA_CONTROLS`, `HonestNullState`/local equivalent, and existing modal/action-sheet focus trap if delete/data-control overlays are added.
- A screen-local `NoteCard` is spec-authorized as `NEW`; do not promote it globally during this batch unless Sol finds repeated use.

## Screen 63 — Energy tracking

### Current strengths

- Current default numbers are internally compatible: energy `7.5` maps to 75%, average `6.2`, and `5 logs today` does not self-conflict.
- Hero gauge, quick-log context chips, day trend, CIA insight, and privacy rail preserve the source hierarchy and semantic purple is limited to CIA.
- Real hero provenance names `You logged` and `Fresh now`.

### Exact gaps and reconciliation

- Quick-log note and CTA are styled `div`s; there is no native range input, named context selection, note field, submit button, rate-limit state, queued-local state, or outcome.
- The default composition mixes an apparently established-data user with an opaque free-tier lock. Entitlement must be explicit and singular. Recommended default is `premium-real`; a separate `free-preview` fixture owns the canonical PaywallLock.
- The current lock is a gray/opaque dead-end. Canon requires `PaywallLock` over a real Peak Hours/Chronotype/Correlations layout, one-line value copy, and native `Unlock with premium` CTA.
- The locked preview must contain real `ImpactBarRow` structure, not generic text. No shared `ImpactBarRow` exists; implement screen-locally because the spec marks it `NEW`, unless Sol promotes it deliberately.
- The CIA claim `after movement and breakfast` lacks source, window, sample, freshness, and confidence. It must be framed as observed co-variation, not causation.
- Metrics lack low-confidence and honest-null fixtures. The spec itself truncates the written third honesty example, so Sol should use the invariant: real `5 logs today`; low `about 5 · sync pending`; null `No energy logged today` with no count.
- `ConsentRail compact` omits four required health-data controls and there is no reachable safety resource.

### Required visible states and query keys

Use `?state=<key>` with exact marker `data-energy-state="<key>"`:

1. `premium-real` — 7.5, avg 6.2, five logs, unlocked Peak Hours/Chronotype/Correlations, evidence-backed CIA insight.
2. `free-preview` — same real preview layout beneath canonical `PaywallLock`; explicit Free entitlement and unlock action.
3. `low-confidence` — muted approximate hero/average/count with `estimated · low confidence` and no exact unqualified derived claim.
4. `honest-null` — `--`, `avg: --`, no count/peak claim, constructive quick-log CTA.
5. `skeleton` — gauge/chart geometry preserved; no fabricated metric.
6. `error` — failed chart or submission, native local retry, no blame.
7. `success` — local log outcome, updated gauge/timeline and visible status.
8. `offline` — cached freshness and queued-local native submit.
9. `disabled` — native submit disabled with `Next log available in Xm`.
10. `data-controls` — complete health-data control proof.

Recommended optional fixture `?state=premium-real&panel=correlations` if the real ImpactBarRow detail is placed in a focus-managed sheet; do not create a second competing entitlement flag.

### Hard assertions

- Exact marker one; layout/a11y/casing scanner passes; reduced-motion browser context produces final-state visuals with no breathing/draw animation requirement.
- `premium-real` has one explicit `Premium` entitlement and no PaywallLock; `free-preview` has one `Free` entitlement, one canonical blurred-real-layout PaywallLock, and one named `Unlock with premium` button.
- `free-preview` contains inert/aria-hidden preview rows for Peak Hours, Chronotype, and at least two real ImpactBarRow facts; it is not an opaque card.
- Hero truth: real `7.5` + `You logged`; low contains `estimated · low confidence`; null shows `--`/no-log copy and no precise average/count.
- Native named range input, context controls, optional note textbox, and submit button exist. Submit produces local status only; disabled and offline states remain semantically exposed.
- CIA evidence names source domains, observation window/sample, freshness, confidence, and `not causation` boundary.
- Full nine data controls and reachable crisis/safety support exist in all relevant states.

### Accessibility and trust risks

- Current faux controls are the primary blocker. Range value, min/max/current value, selected chip state, and submit availability must be announced without color.
- A blurred Paywall preview must be inert and excluded from focus while its unlock overlay remains readable and operable.
- Premium/free ambiguity is a commercial trust defect, not only a visual state issue.
- Health correlation copy can overstate evidence; exact source/sample/freshness/confidence and non-causal language are mandatory.

### Likely shared-kit needs

- Reuse current `PaywallLock`, `GlassPillInput`, `FULL_DATA_CONTROLS`, `SafetyCard`, buttons, and native HTML range styled with canonical tokens.
- `ImpactBarRow` and ArcGaugeDial treatment may remain screen-local because both are explicitly `NEW` in the spec. Avoid shared-kit mutation unless Sol adjudicates promotion and accepted-sentinel impact.

## Screen 70 — Exercise library

### Current strengths

- Correct library anatomy: title, native labeled search (`GlassPillInput`), muscle/equipment filters, exact 532 result count, local-cache chip, two-column solid-card grid, and no bottom tab bar.
- Difficulty is categorical and honest: ordinal 1/2/3 meters and one `Unrated` null row. Pull-up exposes an estimated form cue rather than silently presenting it as verified.
- Current cards use native buttons; muscle tabs are 44px and expose `aria-selected`; medical boundary copy is explicit.
- No identifiable face/body/home/logo/private text is rendered. Data/consent copy and an export/delete-capable privacy rail are present.

### Exact gaps and reconciliation

- `HIFI-70-01` is currently only a dumbbell glyph inside a box labeled as a placeholder. For this privacy-sensitive utility, freeze the asset as **code-native, no raster**: an abstract equipment/movement-path instructional diagram with no human likeness, readable private text, logo, diagnosis, or implied form certification. Mark it `data-asset-disposition="HIFI-70-01-code-native-no-raster"`; detail/media states can expose source and verification status.
- Card accessible names currently omit difficulty, exercise DB source, and media/form-cue availability despite the spec requiring all facts.
- Equipment chips must be native selected controls with `aria-pressed`; current behavior is static. Search/filter changes do not alter results or expose an empty outcome.
- No route-split detail sheet, detail error, Add to workout success/disabled state, list skeleton/empty/error/offline state, or deterministic reduced-motion proof exists.
- The current privacy rail omits category/scope/freshness/confidence, and data chips do not name an actual database version/freshness.
- The `532 exercises` copy must disappear or become zero only when the actual filtered fixture does; do not preserve it in empty/error states.

### Required visible states and query keys

Use `?state=<key>` with exact marker `data-exercise-state="<key>"`:

1. `default` — exact 532/local-cache library, All/Any filters, code-native HIFI-70-01 disposition.
2. `skeleton` — two-column geometry-matched shimmer grid.
3. `empty` — `No exercises found`, zero results, filters remain corrective; no fabricated cards/count.
4. `error-list` — filters visible but inert, plain failure, native retry.
5. `offline` — cached database version/freshness; library remains inspectable.
6. `detail` — one `/exercises/[id]`-equivalent half sheet with instructions, equipment, safety boundary, source/provenance, media availability, and native Add to workout.
7. `error-detail` — detail sheet failure and native retry.
8. `success` — detail CTA becomes `Added`/green confirmation for the local preview.
9. `disabled` — detail CTA native-disabled during local mutation fixture.
10. `media-low-confidence` — code-native cue marked `estimated · low confidence`.
11. `media-null` — text instructions remain, no fake thumbnail; media availability announced as unavailable.
12. `data-controls` — complete database/control proof.

Recommended detail selector: `?state=detail&exercise=bench-press`; selected exercise must be from a strict bundled allowlist. The canonical state marker remains `detail`.

### Hard assertions

- Exact marker one; frame/overflow/44px/name/CIA-casing checks pass at default and all evidence states.
- Default includes exact `532 exercises`, a database source/version/freshness chip, and exactly one `HIFI-70-01-code-native-no-raster` marker.
- Every exercise-card accessible name includes exercise, muscle, equipment, difficulty or Unrated, database source, and media/form-cue availability.
- Search is a named native searchbox; muscle controls expose `aria-selected`; equipment controls expose `aria-pressed`; changing a filter/search changes count/list or reaches the honest empty state.
- Empty contains zero result cards and no 532 count. Error-list has native retry and no invented results. Offline explicitly says cached and names freshness/version.
- Detail is a focus-managed dialog/sheet; opening moves focus inside, Tab remains contained, Escape closes, and focus returns to the trigger. Underlying shell regions are inert while open.
- Add to workout produces a local-only visible status and no network/account/device capability; disabled prevents repeat action.
- Media-low-confidence contains `estimated · low confidence`; media-null has no fake thumbnail and retains text instructions.
- Full nine data controls are reachable; medical boundary and contraindication/source copy remain visible in detail.

### Accessibility and trust risks

- Current button names omit required facts; visual difficulty bars alone do not satisfy card-level announcement.
- Two-column cards are dense and likely fragile at 125% text scaling; verify no clipping/overlap and preserve >=44px card/action targets.
- Code-native instructional media must not imply clinically verified form. Separate `database property`, `estimated cue`, and `media unavailable` language.
- Detail sheet needs robust modal focus isolation; visual-only sheet presentation without dialog semantics would be a blocker.

### Likely shared-kit needs

- Reuse native `GlassPillInput`, existing chips/buttons, `FULL_DATA_CONTROLS`, and the accepted focus-managed modal/sheet pattern used by E1/F1 screens.
- Keep `ExerciseTileCard`, `DifficultyMeter`, and the HIFI-70-01 abstract equipment/movement-path proof screen-local; both card/meter are spec-authorized `NEW` components.
- No raster generation is needed. The code-native/no-raster disposition is safer, deterministic, and satisfies the slot purpose without identifiable-person or provenance risk.

## Suggested verifier matrix summary

| Screen | State PNGs | Text-scale proof | Required interaction pass |
|---|---:|---|---|
| 62 | 11 | `default-real` at true 125% | type/save; filter truth; retry; crisis/data links |
| 63 | 10 | `premium-real` at true 125% | range/chips/submit; Paywall unlock; crisis/data links |
| 70 | 12 | `default` at true 125% | search/filter; detail modal focus; Add/Retry; data links |

The state count is intentionally explicit for intake planning; Sol may merge semantically identical evidence only if every spec/audit disposition remains covered and the hard assertions stay deterministic.
