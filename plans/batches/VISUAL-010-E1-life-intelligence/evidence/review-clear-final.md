# E1 final CLEAR review

- Reviewer role: fresh independent Terra-style non-builder review; worker output is evidence, not acceptance
- Build ID: `NZU66Z6x8BUWSEXI1uOF2`
- Scope: the eight E1 product files (`S16`, `S20`, `S48`, `S72`, `S84`, `S90`, `S93`, `S96`) and `scripts/verify-e1-life-intelligence.mjs`
- Evidence inspected: `BATCH.md`, frozen `VERIFICATION-MATRIX.md`, `evidence/e1-acceptance.json`, and `evidence/e1-strict-final.json`
- Runtime evidence observed: dedicated verifier `pass`, 81/81 contexts, 73/73 promoted screenshots, zero failed checks, zero console/page/capability events; strict 8/8 reports zero issues and zero warnings

## Severity counts

| Critical | High | Medium | Low |
|---:|---:|---:|---:|
| 0 | 5 | 3 | 2 |

## Critical findings

None.

## High findings

1. **S16 low-confidence score contradicts its disclosed formula** — `balencia-screens/src/components/hifi/screens/intelligence/S16LifeAreas.tsx:52`, `:83`
   - The low-confidence fixture hard-codes visible Life Power to `46`, while the same accessible description states weighted average `43.3` plus balance bonus `5.5`, which rounds to `49` under the frozen formula.
   - Impact: score and provenance disagree in a core RPG metric, violating “Life Power formula/display agree.”
   - Fix: derive every displayed fixture score from an explicit fixture payload and the same formula, or disclose a different low-confidence payload whose arithmetic resolves to 46.

2. **S16 error state still exposes the complete real domain payload** — `balencia-screens/src/components/hifi/screens/intelligence/S16LifeAreas.tsx:77`, `:83`, `:91`, `:103`
   - The visible score becomes an em dash, but the radar accessible name still enumerates all ten real values/sources, Reporting remains `10/10`, and every domain row retains its value/progress and opens a real detail sheet.
   - Impact: the error fixture is not exclusive and presents contradictory “couldn’t load” plus authoritative data, violating the frozen real/error exclusivity contract.
   - Fix: define whether error is cached or unavailable. If unavailable, suppress values, source descriptions, reporting, and detail actions; if cached, label all retained evidence as cached with freshness.

3. **S48 error state continues to present an authoritative score and contradiction** — `balencia-screens/src/components/hifi/screens/intelligence/S48Intelligence.tsx:44`, `:48`, `:54`
   - `error` renders the load failure while the meter remains 87 with full formula/provenance and the WHOOP/log contradiction remains actionable.
   - Impact: mutually exclusive error/real states collapse into one misleading surface, directly conflicting with the matrix’s real/low/null/error/offline exclusivity requirement.
   - Fix: suppress current intelligence values and data-dependent actions in the unavailable error fixture, or explicitly convert it into a cached-error state with consistent cached labels and freshness.

4. **Every S96 vital card opens HRV evidence, regardless of the selected metric** — `balencia-screens/src/components/hifi/screens/intelligence/S96HealthDataView.tsx:143-151`, `:198`, `:201`
   - Sleep, Strain, and RHR all call `openDialog('metric')`; the dialog title and content are permanently hard-coded to “HRV evidence / HRV 42 ms.”
   - Impact: a health-data inspection action returns the wrong metric, source, unit, timestamp, and formula input. This is a correctness and trust failure in health context.
   - Fix: store the selected vital (or its key) and render the corresponding evidence payload; assert each card-to-detail mapping.

5. **The dedicated verifier can pass without exercising most required action outcomes** — `balencia-screens/scripts/verify-e1-life-intelligence.mjs:159-183`, `:196-230`
   - The loop loads query-addressed fixtures, audits layout, and performs a small set of mostly default-state text checks. It does not click and verify S20 edit/delete/upload outcomes, S48 Manage/Resolve/Dismiss, S72 zoom/reset, S84 reconnect/revoke/delete outcomes, S90 consent/privacy actions, S93 consent/crisis choices, or S96 per-metric/source-control confirmations.
   - Impact: the acceptance JSON reports a full pass despite the concrete S96 card/detail mismatch and nonfunctional S72 zoom noted below. The verifier does not substantiate several frozen hard assertions.
   - Fix: add deterministic interaction assertions for every required native action and verify the resulting visible/semantic state plus focus restoration; include per-vital detail mapping and error/null exclusivity checks.

## Medium findings

1. **S72 zoom controls update bookkeeping but do not transform the graph** — `balencia-screens/src/components/hifi/screens/intelligence/S72KnowledgeGraph.tsx:50`, `:85`, `:93`
   - Zoom changes only React state and the `data-zoom` attribute; no graph element consumes `zoom` for scale/viewBox/layout.
   - Impact: “Zoom in/out” controls announce an action with no visible graph outcome, so the native zoom contract is not implemented.
   - Fix: apply bounded scale/viewBox behavior to the graph viewport and expose the resulting percentage via status/ARIA; test zoom-in, zoom-out, and reset.

2. **S93’s 30D tab is inert and the selected styling is hard-coded to 7D** — `balencia-screens/src/components/hifi/screens/intelligence/S93MoodTrends.tsx:99-103`
   - The 30D button has no handler; 7D always retains its active visual class even when the 90D fixture is selected.
   - Impact: the tablist’s interactive contract and visual/semantic selection model diverge.
   - Fix: model timeframe as a single selected value, give every enabled tab a deterministic outcome, and derive both `aria-selected` and styling from it.

3. **Dialog focus restoration is not tied to the actual opener in S16/S20/S48** — `S16LifeAreas.tsx:47`, `:64-71`, `:103`; `S20CiaMemory.tsx:17`, `:32-37`, `:52`, `:69`; `S48Intelligence.tsx:21`, `:38-40`, `:54-58`
   - Each screen reuses one ref across multiple possible triggers, so React’s last mounted assignment wins; closing a dialog can focus a different control than the one that opened it. Query-opened dialogs also have no meaningful opener.
   - Impact: keyboard focus continuity is unreliable across required dialog/sheet states.
   - Fix: capture `event.currentTarget` when opening, as S72/S84/S90/S96 already do, and restore only when that element remains connected.

## Low findings

1. `S16LifeAreas.tsx:86` recomputes and splits each radar point twice per axis during every render. Precompute the outer points once for clearer rendering code.
2. Several files compress substantial JSX and state transitions into single lines (notably `S48Intelligence.tsx:54-58`, `S84DataSources.tsx:39-55`, and `S96HealthDataView.tsx:180-206`), making fixture logic and review diffs harder to audit. Extract state panels/rows into named components or structured render helpers.

## Positive observations

- The implementation consistently uses CIA terminology, non-causal language, explicit source/freshness/confidence labels, and visual-only dependency honesty.
- S84’s rendered count derivation is centralized and reconciles its row states; S90’s neutral code-native silhouette avoids raster/body-image fabrication; S96 keeps WHOOP recovery 78 separate from the Balencia readiness formula.
- The verifier’s fresh-build binding, sentinel fingerprints, pass-atomic screenshot promotion, storage isolation, capability guards, and byte-identical capture check are strong foundations.

## Verdict

**REQUEST CHANGES — not ready for Sol acceptance.** Runtime/render gates are green, but the five High and three Medium findings leave correctness, state exclusivity, health-evidence mapping, action behavior, and verifier coverage below the required `0 Critical / 0 High / 0 Medium` acceptance threshold.
