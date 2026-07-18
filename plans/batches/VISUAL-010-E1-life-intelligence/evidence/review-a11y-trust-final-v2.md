# E1 final accessibility / trust / safety re-review v2

- Reviewer: fresh independent non-builder (accessibility, trust, and safety lane)
- Build reviewed: `eOyaww4iC6hGbFSOetBIe` from fresh production `next start` on `:3002`
- Scope: prior accessibility review, serialized repair evidence, `E1Modal`, S16/S20/S48/S72/S84/S90/S93/S96, expanded verifier, and final acceptance evidence
- Evidence status: dedicated E1 verifier reports `pass`, `749/749` checks, exact `81` contexts / `73` promoted PNGs, and zero recorded failed checks
- Worker output is evidence only; Sol remains final acceptor.

## Verdict

**REQUEST CHANGES** — `0 Critical / 1 High / 1 Medium`.

The repair materially improves initial focus, Tab/Shift+Tab cycling, Escape dismissal, exact opener restoration for exercised opener paths, local-only crisis outcomes, S93 two-step deletion, and persistent completion status. However, the modal isolation implementation is incomplete for dialogs mounted inside `<main>`, and the S93 confirmation transition drops focus out of the dialog. The candidate therefore remains below the required `0 Critical / 0 High / 0 Medium` threshold.

## Findings

### High — S93 and S96 modal content leaves the underlying main subtree available to assistive technology

`E1Modal.tsx:16-18` only inerts `header`, `main`, and `nav` nodes that do **not** contain the dialog. S93 renders all three dialogs inside its page `<main>` (`S93MoodTrends.tsx:193-210`), and S96 does the same (`S96HealthDataView.tsx:197-208`). The containing main is consequently excluded from `inert`; only the header and nav become inert. The visually obscured page controls and content in that main remain exposed to the accessibility tree while the dialog claims `aria-modal="true"`.

Direct read-only Playwright evidence against the named production build:

- S93 “Mood data controls”: inert elements were exactly `HEADER` and `NAV`; `main.inert === false`.
- S96 query-opened “Balencia readiness formula”: inert elements were exactly `HEADER` and `NAV`; `main.inert === false`.

The verifier does not catch this because `assertModalContract` and `assertOpenModalContract` only require **at least one** inert descendant (`verify-e1-life-intelligence.mjs:189,204`), so inerting the header alone satisfies the gate. This does not establish that the full underlying shell is unavailable.

Required remediation: mount the modal as a sibling of the page regions (for example through the existing HifiShell overlay boundary or a phone-local portal), or inert all non-dialog siblings recursively while preserving the dialog subtree. Strengthen the verifier to prove that every underlying interactive element is within an inert subtree / absent from the accessibility tree for both overlay-mounted and main-mounted dialog families.

### Medium — S93 destructive-confirmation transition loses focus to `<body>`

S93 now has a distinct confirmation step with scope, permanence, backup guidance, Cancel, explicit delete, and a persistent completion status (`S93MoodTrends.tsx:209-211`). Those trust requirements are good. But activating “Delete local mood data” swaps the original control subtree for the confirmation subtree without moving focus to the safe Cancel action. The activated element is removed, and focus falls to `<body>`.

Direct production evidence:

- Initial modal focus: “Close data controls”.
- After activating “Delete local mood data”: `document.activeElement === BODY`, outside the dialog.
- A subsequent Tab happens to reach “Cancel”, but the dialog's keydown containment cannot operate while focus is on body, and the containing main is also not inert.

The verifier checks only that confirmation copy appears and then programmatically clicks “Delete mood data” (`verify-e1-life-intelligence.mjs:247`); it does not assert focus after the destructive state transition.

Required remediation: when `deleteConfirm` becomes true, synchronously or layout-effect focus the safe Cancel action (or remount a separately labelled confirmation dialog with deterministic initial focus). Add an assertion that focus remains within the dialog and lands on Cancel immediately after entering confirmation.

## Low-priority observations

- S20, S93, and S96 still use `role="tab"` without the ARIA tabs roving-`tabIndex` and arrow-key pattern. Native buttons remain operable, so this remains Low for the visual prototype.
- Query-opened fixtures receive deterministic in-dialog initial focus, but the expanded verifier does not close those fixtures with Escape and assert the documented phone-local fallback. Source fallback exists at `E1Modal.tsx:35-37`; a direct assertion would prevent regression.
- S20 search retains a native labelled search input, deterministic `state=search` fixture, and a reachable Clear action. No search accessibility or trust regression was found in this repair.

## Positive evidence

- For modal families exercised through a real opener, the expanded verifier demonstrates initial focus, forward/reverse containment at boundaries, Escape dismissal, and exact opener restoration.
- S93 crisis previews remain entitlement-independent, available in the offline fixture, explicitly local-only, and produce a visible status stating that no external action fired.
- S93 permanent deletion is now two-step, clearly names local scope and lack of backup, offers Cancel before confirmation, and leaves a persistent `role="status"` completion message after deletion.
- S16/S20/S48/S72/S84/S90 opener-driven overlays use the E1 primitive through the HifiShell overlay path; no equivalent main-isolation defect was found in those six screens.
- Health, consent, correlation, and medical-boundary language remains appropriately non-causal, informational, provider-neutral, and explicit about local prototype behavior.
