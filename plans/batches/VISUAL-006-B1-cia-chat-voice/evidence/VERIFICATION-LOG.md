# VISUAL-006 B1 verification log

- Acceptance date: `2026-07-10 PKT`
- Scope: `09,10,11,51,74,75,76,77,79,99`
- Result: `PASS — Sol accepted with evidence-only waivers under DVF-13`
- Product/readiness limit: visual-prototype family acceptance only; not production or final one-SHA 104-screen certification.

## Deterministic gates

| Gate | Result | Durable evidence / note |
|---|---|---|
| `npm run check` | PASS | Zero errors. One pre-existing unrelated unused-import warning in `DomainDashboardHeader.figma.tsx`; routes `104/104`, assets, copy and brand pass. |
| `npm run build` | PASS | Next.js compiled and statically generated `200/200` pages. Only the existing `module.register()` deprecation warning remains. |
| Strict B1 visual audit | PASS | `b1-after.json`: `10/10`, zero issues, zero warnings, zero missing phone frames and zero console-error screens. Current defaults are in `after/`. |
| Hardened B1 interaction/state audit | PASS | `b1-interactions.json`: `111/111` isolated contexts/nonces, `109/109` exact canonical PNGs, 118 recorded checks, reduced motion plus the accepted S11 no-preference lifecycle, pass-atomic promotion. |
| Product/API/authority integrity | PASS | Product `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b`; verifier/API `18cfc1b1a455ce2b5dcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e`; final authority `ca2caf01242bf3b76ce0b9180a6f61676f0fa7ef343910d9dc4cc66abe18a326`; all start/end digests match. |
| Asset integrity | PASS | HIFI-75/S75/S77 exact file SHA-256 `2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39`; generated provenance and privacy review recorded. |
| Capability/network/storage isolation | PASS | Zero console/page errors and zero forbidden capabilities. One exact S77 clipboard write is intercepted in-browser; host clipboard untouched. No external/provider/API mutation, cookies, local/session/IndexedDB/Cache state. |
| Root redesign validator | PASS | `104` ledger rows and `104` screen files; no missing files, low scores, defects, false passes or uncovered routes. |
| Root + submodule `git diff --check` | PASS | No whitespace errors; forbidden `yhealth-app` state preserved and untouched. |
| Independent code/reliability review | ACCEPT | Initial rejection findings were repaired; the reviewer-turned-S51/S74 writer did not accept its own output. Sol plus non-writer reviewers verified the final integration. |
| Independent design/source review | ACCEPT | Focused final re-audit `100/100`; recovery visibility and signal provenance findings closed; no unresolved Critical/High/Medium. |
| Independent accessibility/trust review | ACCEPT | Phone-bound group/action modals, equal sensitive choices, microphone/provider/audience honesty and partial/revoked truth accepted; no unresolved Critical/High/Medium. |

## Evidence integrity and coverage

- Every browser case opens in a fresh context through `about:blank`, clears cookies and origin storage, receives a unique `__b1audit` nonce, waits for the exact root/state and two animation frames, and records no cross-case persistence.
- Product, accepted shared API, verifier, asset and active source-authority bytes are fingerprinted before and after the run. The report is written only after all assertions; state PNGs stage in a sibling temp directory and promote only on success.
- Canonical output is exactly 109 named 390×844 PNGs: 108 original query/interaction frames plus `76-group-action-confirm.png`. No stale temp directory or mixed-run residue remains.
- The 111 contexts are the 109 capture contexts, accepted S11 no-preference motion/visibility lifecycle, and shared Composer no-handler sentinel.
- Global gates cover one h1, native/labelled/unique controls, keyboard/focus, 44px target geometry, 16px fields, authored focus, AA contrast, 11px semantic copy floor, safe-area/overflow, busy/live semantics, reduced motion and honest disabled reasons.
- B1-specific gates cover voice consent/capability truth, message metadata/audience/delivery, product-level recovery/send auto-reveal, equal sensitive choices, focus-trapped phone-bound modals, S51 record-specific deletion, S74 cached/base-state restoration, S77 sole internal scroller/sticky Done/125% text/local removal, S79 partial suppression and S99 provider/revoked/enlarged states.

## Before/after evidence

- `before/` is a byte-identical ten-screen subset of the authoritative pre-goal VISUAL-001 local baseline; `b1-before.json` records the source manifest and selected IDs.
- `after/` is the final strict production-server default capture. Default pixels are intentionally stable because B1's required fixes are primarily semantics, state truth, native interaction, focus, scrolling and modal behavior; the baseline S51 34px-tab warning closes in the current zero-warning strict report.
- `b1-before-contact-sheet.png`, `b1-after-contact-sheet.png` and `b1-states-contact-sheet.png` provide compact visual review; the 109 state/interaction frames show every repaired outcome, including recovery, queue, retry, deletion, recap, local removal, partial data, revoked provider state and group-action confirmation.

## Accepted residual waivers

| Waiver | Scope | Closure owner/trigger |
|---|---|---|
| Physical-device VoiceOver/TalkBack and system Dynamic Type unavailable | Final certificate only; browser semantics, keyboard, focus, 125% text, target and reduced-motion evidence pass | R11 / external device evidence or explicit release waiver |
| Broad Axe unavailable | Final certificate only | R11 |
| Dirty-worktree evidence has no immutable family SHA | Final one-SHA 104-screen claim only | R11 after user-authorized commit state |
| Exact spawned runtime model/effort is unexposed | Provenance only; packets, agent IDs, ownership and Sol verification are recorded | Runtime support or persistent waiver |

No known B1 Critical, High or Medium product/evidence defect is waived.
