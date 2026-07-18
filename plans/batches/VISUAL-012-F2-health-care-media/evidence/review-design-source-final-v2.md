# F2 final-v2 design/source review

**Reviewer:** independent Terra design/source pass
**Mode:** full dev-handoff audit at 390×844 with WCAG AA floor
**Scope:** screens 57, 58, 60, 62, 63, 70, 86, 87, 88, 89; active screen specs; compact canon and component catalog; frozen matrix; asset disposition; ten product files; final-v2 acceptance PNG/JSON and strict JSON/PNGs
**Evidence baseline:** production build `7nh9Nk_hp6hS-s36ayB3Y`; hardened acceptance `123/123` contexts, `113/113` PNGs, `1341` checks, zero console/page/capability events; strict scan `10/10` screens with zero issues or warnings.

## Verdict

**Approve. C0 / H0 / M0 / L0.**

The F2 family now meets its frozen design/source contract. It preserves a coherent premium warm-dark hierarchy at 390×844, uses restrained semantic orange/green/purple roles, keeps CIA claims evidence-bound, makes safety and privacy controls legible, and presents code-native media without identity or diagnostic risk. The regenerated evidence also demonstrates meaningful state differentiation rather than relying on off-screen DOM assertions.

## Prior-finding closure

### Closed H1 — Screen 58 manual-only provenance and score

- `S58SleepTracking.tsx` now branches `manual-only` explicitly.
- `acceptance-final-v2/58-manual-only.png` shows `Manual duration only`, `No wearable evidence`, honest-null score `---`, and `No provider-backed sleep score` instead of WHOOP/high-confidence evidence or `82`.
- The CIA copy states that more nights or provider evidence are required before identifying a pattern. This satisfies the spec's manual-only and evidence-gated CIA rules.

### Closed H2 — Screen 88 distinct tool surfaces

- Eye test, Exercises, and Strain are now real tabs with distinct named tabpanels and separate local utilities.
- The Eye test panel provides a non-diagnostic task with no stored acuity/color score; Exercises provides the 20-20-20 timer surface; Strain provides a manual low-confidence strain-note surface.
- `88-eye-test-null.png`, `88-default.png`, and `88-strain-low-confidence.png` visibly prove three different compositions while keeping urgent guidance reachable.

### Closed H3 — Frozen-state visual distinctness and screen 86 success capture

- All `113` promoted final-v2 PNGs have unique SHA-256 hashes; there are no byte-identical captures across semantically different fixtures.
- State screenshots now scroll or focus to representative changed regions where needed, so below-fold mutations are visible evidence rather than marker-only assertions.
- `86-success.png` is a representative comparison view with both panes, scrubber, four-step progress, CIA evidence, and local actions visible; the prior large empty-black dead zone is gone.

### Closed M1 — Screen 70 detail-sheet separation

- The detail overlay now uses a stronger `bg-black/80` scrim and an opaque `bg-ink-900` sheet with border and elevation.
- `70-detail.png` and `70-error-detail.png` keep the underlying grid subordinate; background titles and metadata no longer compete with sheet copy.
- The result matches the catalog's focus-managed sheet intent while preserving readable equipment/source metadata and the primary action.

### Closed M2 — HIFI-70-01 disposition marker

- Source emits the exact frozen marker `HIFI-70-01-code-native-instructional`.
- The treatment remains abstract instructional geometry with no person, logo, diagnosis, or form-certification claim, matching `ASSET-DISPOSITION.md` exactly.

## Source fidelity and design quality

- **57 Shopping list:** the operational add/list/progress hierarchy is clear and dense without feeling templated; completion uses green, action uses orange, and provenance/data controls remain available.
- **58 Sleep tracking:** wearable-backed, low-confidence, missing-night, manual-only, and support states preserve the spec's health-data honesty. CIA remains purple and evidence-cited rather than becoming screen chrome.
- **60 Medication tracking:** the fictional four-event schedule reconciles to `75%`; prescribed-label and clinician boundaries are prominent; medical data is not gamified or presented as treatment advice.
- **62 Quick notes:** capture, filters, locally derived activity, user/CIA note distinction, and privacy controls retain an editorial hierarchy with credible mobile density.
- **63 Energy tracking:** logged energy remains member-orange; observational correlation copy names source/sample/freshness/confidence and states `not causation`.
- **70 Exercise library:** search/filter taxonomy, dense code-native tiles, source freshness, and isolated detail sheet form a credible library command surface at 390×844.
- **86–87 Try-on:** consent precedes generated evidence; no scrubber appears before two valid panes; history counts and row truth reconcile; all media remains code-native with no identifiable person.
- **88 Vision suite:** all modules are explicitly non-diagnostic, urgent guidance is continuously reachable, and the three utilities are visually and semantically distinct.
- **89 Wellbeing:** the System Field is the focal instrument, crisis resources remain second and visible above modules, and CIA cites the canonical two-session fixture without diagnostic inference.

## 390×844, 125%, brand, and evidence assessment

- Strict final-v2 screenshots show stable phone-frame composition with no horizontal overflow, clipped focal controls, or conflicting overlays.
- The actual 125% proofs are included in the `123` isolated contexts and pass the same native-control, marker, overflow, CIA-case, runtime, and capability assertions.
- Typography uses the restrained serif-italic spotlight convention; warm solid surfaces carry dense data while glass is reserved for heroes, CIA, nav, and overlays.
- CIA is consistently all-caps, no visible `SIA` remains, and purple is limited to coach/AI meaning.
- Asset dispositions are exact for HIFI-70/86/87/88, with no unapproved raster or logo approximation.
- Product, verifier/API, and accepted-through-F1 integrity digests are unchanged from acceptance start to end, so the promoted evidence is traceable to the reviewed build.

## Acceptance recommendation

Approve F2 final-v2 for Sol acceptance and batch closeout. No changes requested and no waiver is required. This review changed only this review artifact.
