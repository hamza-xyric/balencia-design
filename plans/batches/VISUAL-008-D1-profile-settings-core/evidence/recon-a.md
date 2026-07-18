# D1-RECON-A — Luna read-only reconciliation evidence

- Scope: S17, S18, S21
- Product SHAs: S17 `7bfe03e8…a3a44f`; S18 `a847b458…85e77`; S21 `121276ed…bc8dc7`
- Method: static code/spec/audit/baseline reconciliation only; no edits or service mutation
- Runtime model intent: Luna `scope_scout`, medium; exact thread attestation covered by `W-MODEL`

## Shared audit classification

- **Stale/resolved:** Back and bottom navigation are now native, labelled, 44px, and expose `aria-current`; shared legal footer is real navigation; shared action focus/loading/reduced-motion contracts exist.
- **Partially current:** `ConsentRail` is now interactive, but its default is only five controls and the current `/screens/84?control=` destination does not consume each context. D1 must pass a screen-local exact control set and prove contextual outcomes.
- **Current:** all three screens are static-only with no query fixtures/root state attributes; raw screen-local buttons are actionless; several meaningful low-opacity labels remain under the deterministic AA margin.
- **Sol override:** the audit/scout recommendation to lowercase `CIA` is rejected. DVF-07 and the continuation contract require visible coach name `CIA` in all caps.

## S17 findings

- Static populated frame; no `data-me-state`, `aria-busy`, or non-default states.
- Search/settings/avatar/quick links/data rows/See all/recommendation appear interactive but have no outcomes.
- Avatar accessible name claims a current photo while only initials render.
- Exact contradiction remains: `3 connected` providers versus `84 connected` data sources without unit/scope distinction.
- Default rail exposes only five controls.

Required repair: visible and spoken `3 connected providers` versus `84 imported records`; full eight contextual controls; deterministic `default/skeleton/empty/error/offline/success/disabled`; honest initials avatar; real routes/outcomes; AA/focus/44px.

Sol route adjudication: Search `/screens/68`; Settings `/screens/21`; avatar `/screens/50`; journal `/screens/73`; Book of Life `/screens/20`; connected services `/screens/22`; progress photos `/screens/49`; achievements `/screens/71`; Life Power/domain detail `/screens/16`.

Recommended captures: `17-default`, `17-skeleton`, `17-empty`, `17-error`, `17-offline`, `17-success`, `17-disabled`, `17-data-controls`.

## S18 findings

- Static frame; search is a button and shows Clear with no query.
- Suggested cards and module tiles have no outcomes; provenance is section-level, not per suggestion.
- Five donut segments total 100 but legend has four rows totaling 108; invalid SVG class roles leave a missing key.
- Specified radar and its partial/null states are absent.
- Locked modules are opacity-treated dead buttons, not canonical `PaywallLock`.
- Default rail exposes only five controls; 0% items use active-effort glow.

Required repair: one local five-domain radar/legend payload totaling exactly 100; per-suggestion source/freshness/confidence; labelled search with clear/count/results/null; canonical `PaywallLock`; operable module routes; complete data controls; truthful partial/null/offline/error states.

Sol radar disposition: implement a screen-local, code-native five-domain ConstellationRadar using one dataset; do not add or modify a shared kit primitive.

Recommended captures: `18-default`, `18-radar-partial`, `18-radar-null`, `18-search-results`, `18-search-empty`, `18-error`, `18-offline`, `18-paywall-locks`, `18-data-controls`.

## S21 findings

- Static frame; account/preference/locale rows are actionless.
- Notifications, background sync, Face ID, switches, hardware disposition, and persistence/status are absent.
- Privacy area uses inert provenance words for actions; configured values lack provenance/null/error states.
- Shared `SafetyCard` and legal footer are now honest and operable.
- Two H1s remain.

Required repair: one H1; native Notifications/Background sync/Face ID switches; deterministic unsupported-hardware fixture; local saving/error-revert/offline/success truth; real routes/sheets; full eight contextual controls; preserve explicit “does not place calls or send texts” safety language.

Recommended captures: `21-default`, `21-saving`, `21-error`, `21-success`, `21-partial-null`, `21-offline`, `21-hardware-unsupported`, `21-password-modal`, `21-data-controls`.

## Shared-boundary decisions

- Builders must not touch shared chrome, buttons, rail defaults, persona, or progress primitives.
- Pass local exact control arrays and implement contextual sheets locally.
- Use canonical `PaywallLock` unchanged.
- Wrap shared visual progress bars in local accessible semantics when needed.
- Current persona level 12 wins over a level-14 spec exemplar.

Worker output is evidence only; Sol independently reconciles it into the frozen matrix.
