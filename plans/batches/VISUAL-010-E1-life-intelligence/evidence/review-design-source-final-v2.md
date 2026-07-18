# E1 final design/source re-review v2

- Reviewer: fresh independent non-builder design/source reviewer; worker output is evidence only
- Build ID reviewed: `eOyaww4iC6hGbFSOetBIe`
- Posture: full dev-handoff design/source audit, WCAG AA
- Scope: repaired E1 screens `16,20,48,72,84,90,93,96`; prior design review and repair evidence; frozen verification matrix; active hi-fi specs/canon; current product/modal/verifier source; 73 promoted acceptance captures; acceptance JSON
- Runtime evidence observed: dedicated verifier `PASS`, 81/81 isolated contexts, 73/73 promoted PNGs, 749 checks, and zero console/page/capability events. Green automation does not override the source/copy mismatches below.

## Severity counts

| Critical | High | Medium | Low |
|---:|---:|---:|---:|
| 0 | 2 | 1 | 2 |

## High findings

1. **S16 error exclusivity is still contradicted by an authoritative calculation badge.** The repair correctly suppresses the score, radar payload, reporting count, trend, and operability in the unavailable error fixture, but `S16LifeAreas.tsx:83` still falls through to `Calculated · 10 domains` whenever the state is neither low nor empty. The promoted `16-error.png` visibly shows that claim above an unavailable Life Power and `Reporting Unavailable`. This means the prior S16 exclusivity High is not fully closed and violates the frozen real/low/null/error/offline exclusivity contract. Render an error-specific `Unavailable`/`Could not calculate` badge (or consistently label a cached calculation, which this state does not otherwise claim), and add an error-state assertion that forbids calculated/source-count claims.

2. **S93 selected-window evidence is malformed in both visible provenance and accessible chart copy.** `S93MoodTrends.tsx:70` derives `windowDays`, but `:158` labels the chart as literal `-day mood trend` and `:171` exposes literal `-day window` in the CIA provenance. The selected tab and top chart meta can say 7 or 30 days while the evidence trail omits the actual window, violating the frozen requirement that health/intelligence claims expose a concrete evidence window. Restore `${windowDays}-day` in both locations and extend the 7D/30D interaction assertion to check the chart accessible name and CIA provenance, not only tab styling and generic body text.

## Medium findings

1. **Visible retry controls remain inert in unavailable error states.** S16 renders `Retry` without an outcome at `S16LifeAreas.tsx:79`, and S48 does the same at `S48Intelligence.tsx:44`. They are native, enabled buttons with strong action styling, so a no-op violates the active error-state requirement for a useful recovery action and the prototype's perceived-control contract. Give each a deterministic local retry outcome/status (no network) and exercise it in the dedicated verifier.

## Low findings

1. S72's default graph remains visually busy because many saturated domain colors compete at once. Labels, native linear controls, and edge semantics prevent a usability failure, but later polish could mute non-selected nodes while preserving domain identity.
2. Several E1 files still compress substantial conditional panels and interaction logic into dense single-line JSX. This did not create a newly observed runtime failure, but named subpanels would make future state/source audits safer.

## Prior-finding closure check

- **Closed:** S16 low-confidence arithmetic now resolves to `49` from the disclosed formula.
- **Not fully closed:** S16 unavailable-error payload is suppressed, but the visible `Calculated · 10 domains` badge preserves a contradictory authoritative claim (High 1 above).
- **Closed:** S48 unavailable error suppresses score, provenance, contradictions, patterns, and dependent actions.
- **Closed:** S96 HRV, Strain, RHR, and Sleep buttons now open their exact value/unit/source/time/confidence/input mappings.
- **Closed:** S72 zoom visibly transforms the graph and reset restores 100%.
- **Closed with regression:** S93 has one selected timeframe and deterministic 30D behavior, but its evidence-window interpolation is missing (High 2 above).
- **Closed:** exact invoking controls are captured; `E1Modal` provides initial focus, Tab/Shift+Tab containment, Escape, inert background, and exact-parent restoration.
- **Closed:** the verifier now exercises the previously omitted native outcomes and modal/focus contracts. Its semantic coverage still misses the two source/copy defects above and the inert retry paths.

## Passing design/source checks

- Visible terminology consistently uses CIA, Missions, Life Power, and Domain Stats; no visible `Cia`, `SIA`, CP substitution, or retired Goals terminology was found.
- Correlation copy remains non-causal and generally exposes source/sample/window/freshness/confidence.
- S93 crisis access remains above the chart, offline-capable, outside the paywall, non-diagnostic, and local-preview only.
- S96 keeps Balencia readiness `84` and WHOOP recovery `78` separate, preserves exact formula disclosure, and uses provider-neutral code-native assets.
- HIFI-90-01 remains consent-gated and code-native; no sensitive bitmap is exposed.
- Reviewed promoted pixels retain coherent warm-dark hierarchy, legible density, consistent semantic color use, and no obvious clipping or horizontal overflow. Modal dimming and focal treatment are clear.

## Verdict

**REQUEST CHANGES — not ready for Sol acceptance.** Most prior design/source findings are demonstrably closed, but the remaining two High and one Medium issues leave error-state truth, evidence-window provenance, and perceived recovery behavior below the required `0 Critical / 0 High / 0 Medium` acceptance gate.
