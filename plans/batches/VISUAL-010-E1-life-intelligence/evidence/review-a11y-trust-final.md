# E1 final accessibility / trust / safety review

- Reviewer: fresh independent non-builder (accessibility, trust, and safety lane)
- Build reviewed: `NZU66Z6x8BUWSEXI1uOF2`
- Scope: S16, S20, S48, S72, S84, S90, S93, S96 product sources; frozen verification matrix; 73 acceptance captures; strict 8-screen evidence; dedicated verifier result
- Evidence status: dedicated E1 verifier `pass`, exact 81 isolated contexts / 73 promoted PNGs, zero console/page/capability events; strict scanner 8/8 with zero issues and zero warnings; 125% proofs report no horizontal overflow or target regressions
- Worker output is evidence only; Sol remains final acceptor.

## Verdict

**REQUEST CHANGES** — `0 Critical / 1 High / 1 Medium`. The visual, data-honesty, medical-boundary, crisis-local-only, and provider-demo constraints are otherwise well represented, but the modal keyboard contract and one permanent-delete flow are not yet safe enough to accept.

## Findings

### High — modal dialogs do not isolate keyboard focus

The E1 screens render custom `role="dialog" aria-modal="true"` overlays but do not trap `Tab`/`Shift+Tab`, make the underlying application inert, or handle `Escape`. Several also omit deterministic initial focus. Consequently a keyboard or switch user can tab behind a visually modal sheet and operate obscured controls, while the `aria-modal` accessibility-tree promise says that content is unavailable. This is a WCAG 2.4.3 focus-order / 2.1.1 keyboard failure and is especially consequential in consent, revoke, delete, health, and crisis flows.

Exact evidence:

- `S16LifeAreas.tsx:112` supplies `autoFocus` and close restoration, but no focus containment, inert background, or Escape handling.
- `S20CiaMemory.tsx:74-81` renders the wiki modal without containment/inert/Escape.
- `S48Intelligence.tsx` custom overlay dialog has the same modal contract (dialog block in its detail overlay).
- `S72KnowledgeGraph.tsx:33-43` focuses the close button, but does not contain focus or support Escape.
- `S84DataSources.tsx:13-17` focuses the close button, but does not contain focus or support Escape.
- `S90ProgressMeasurements.tsx` custom panel/dialog block has the same modal contract.
- `S93MoodTrends.tsx:192-213` has three dialogs with no focus trap/inert/Escape; none assigns initial focus. Consent close also does not restore focus, and the header crisis opener at `:84` is not the `crisisTrigger` restored at `:69`, so closing can move focus to a different control.
- `S96HealthDataView.tsx:195-206` has no initial-focus target, containment/inert background, or Escape behavior for formula, metric, consent, bridge, primary, revoke, and delete dialogs.

Required remediation: use one product-lane modal primitive or equivalent local implementation that (1) focuses a meaningful element on open, (2) cycles focus within the dialog, (3) makes the underlying shell inert/unavailable, (4) closes on Escape where safe, and (5) restores focus to the exact invoking element. Re-run keyboard assertions for every dialog family, including query-opened fixtures where no real opener exists.

### Medium — S93 permanently deletes mood data without confirmation or visible completion

`S93MoodTrends.tsx:212` labels the operation “Delete local mood data” and the preceding copy calls it permanent, but a single activation immediately changes the fixture to empty and dismisses the dialog. There is no confirmation step, no explicit consequence/backup statement at the point of confirmation, and no completion status announcement. This is inconsistent with E1’s careful destructive-flow treatment in S20, S84, and S96 and makes an irreversible health-adjacent action too easy to trigger accidentally.

Required remediation: open a distinct confirmation state naming the scope and permanence, provide Cancel as the safe/default action, require an explicit “Delete …” confirmation, restore focus, and announce the completed local-only result through a persistent `role="status"`/live region.

## Low-priority observations

- The tablists in S20 (`S20CiaMemory.tsx:43-44`), S93 (`S93MoodTrends.tsx:99-104`), and S96 (`S96HealthDataView.tsx:166`) expose tab roles but do not implement roving `tabIndex` and arrow-key navigation. Native buttons remain operable, so this is not promoted above Low for this prototype, but the widgets should follow the ARIA tabs keyboard pattern before production handoff.
- Query-opened modal fixtures cannot restore to a real opener by definition. A deterministic fallback (screen heading or first logical screen control) should be documented and asserted.

## Positive evidence

- All audited interactive targets passed the strict scanner at the frozen 44px-oriented threshold, including S72’s graph nodes/linear equivalents and S93’s timeframe/crisis controls.
- Dedicated 125% text-scale contexts passed without horizontal overflow; strict 390×844 captures report no overflow warnings.
- Accessible names and native controls are used consistently for icon buttons, graph nodes, charts, gauges, progress bars, and source controls. S72 provides a linear native-control equivalent to the spatial graph.
- S20/S48/S72/S84 correlation language is explicitly non-causal and supplies source/sample/window/freshness/confidence context; honest-null states suppress claims.
- S93 crisis resources remain outside entitlement and offline, state clearly that actions are local previews, and the capability guard recorded no call/text/navigation/external event.
- S90 keeps body imagery consent-gated and code-native; privacy copy explicitly excludes bitmap/file/face/cloud/training/review behavior.
- S96 keeps Balencia readiness `84` arithmetically traceable, separates WHOOP-native `78`, labels all provider data illustrative/demo/dependency-only, sends nothing on decline, and generated zero guarded capability events.
