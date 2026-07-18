# VISUAL-007 C1 verification log

- Acceptance date: `2026-07-11 PKT`
- Scope: `12,13,14,15,41,44,45,59,61,73,97`
- Result: `PASS — Sol accepted with evidence-only waivers under DVF-14`
- Product/readiness limit: visual-prototype family acceptance only; not production or final one-SHA 104-screen certification.

## Deterministic gates

| Gate | Result | Durable evidence / note |
|---|---|---|
| Targeted ESLint + TypeScript | PASS | C1 product/verifier files clean; `tsc --noEmit` clean. |
| `npm run check` | PASS | Zero errors. One pre-existing unrelated unused-import warning in `DomainDashboardHeader.figma.tsx`; routes `104/104`, assets, copy and brand pass. |
| `npm run build` | PASS | Next.js compiled and statically generated `200/200` pages. Only the existing `module.register()` deprecation warning remains. |
| Fresh production binding | PASS | `next start -p 3002`, build `EeCHMg26d0yGZbyL-aWUG`; served HTML SHA-256 `3b7a719bc4b828f25c15dd37aa7d739db772d3ad65113eb15a9c604a6a82f3c9`; newest bound source predates the build. Dev `:3001` was never used. |
| Strict C1 visual audit | PASS | `c1-strict.json`: `11/11`, zero issues, warnings, missing phone frames, visible wrong-name screens, or console-error screens; final defaults in `after/`. |
| Hardened C1 interaction/state audit | PASS | `c1-interactions.json`: `100/100` fresh contexts/nonces; `147/147` checks; exactly `89/89` unique canonical 390×844 PNGs plus eleven screenshot-free 125% text contexts; pass-atomic promotion. |
| Product/API/authority integrity | PASS | Product `013bea5d034ab47df29de461b1791d037f988e0bb98aefbfcf6a2d4b26fb397e`; verifier/API `a4bcdfb702538c4bf8a29ced58aff82b2c890378608953a2dcc41fa6a9f1418c`; final authority `17b1256d3816e3326bd7672b4c0d1aebdc0443ee738dee02f93ff4a8b23912db`; all start/end digests match. |
| S12 byte lock | PASS | Expected and actual SHA-256 `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67`. |
| Capability/network/storage isolation | PASS | Zero console/page errors and zero forbidden capability events. Cookies, local/session storage, IndexedDB and CacheStorage remain empty in every case. No API/external/provider/file/media/share/purchase/navigation mutation. |
| Root redesign validator | PASS | `104` ledger rows and `104` screen files; no missing files, low scores, defects, false passes or uncovered routes. |
| Root + submodule `git diff --check` | PASS | No whitespace errors; forbidden `yhealth-app` state preserved and untouched. |
| Independent code/correctness review | ACCEPT | Fresh non-builder Terra review: `0 Critical / 0 High / 0 Medium`; mission routing/identity, state transitions, focus fallbacks, undo and final S13/S15 semantics accepted. |
| Independent design/source review | ACCEPT | Fresh non-builder Terra review: `0/0/0`; all 89 renders inspected; S73 truth and corrected S15 enlarged-bottom proof accepted. |
| Independent accessibility/trust review | ACCEPT | Fresh non-builder Terra review: `0/0/0`; targets, type floor, contrast, keyboard/AX, focus, 125%, motion, consent, privacy and capabilities accepted. |
| Sol rendered inspection | ACCEPT | Full-resolution inspection covered mission create/filter, schedule honest-null, hydration/freeze/destructive sheets, check-in empty, task success, journal media privacy, plan actions/paywall and enlarged-text states. |

## Evidence integrity and coverage

- Every browser case starts through `about:blank` in a fresh Chromium context, clears origin data/cookies, receives a unique `__c1audit` nonce, waits for exact root/state and two animation frames, and records no cross-case persistence.
- Product, accepted shared API/verifier and active source-authority bytes are fingerprinted before and after the run. PNGs stage outside the canonical directory and promote only after every assertion and exact-name/count check passes.
- The canonical set is exactly 89 named state/action PNGs. Eleven additional assertion-only contexts apply actual text-only `1.25x` scaling to every C1 screen without inflating the screenshot manifest.
- Global gates cover 390×844 geometry, one h1, unique native/labelled controls, 44px targets, 16px fields, authored focus, AA static/control contrast, mutable 12px semantic floor, S12-only exact-SHA 11px adjudication, safe area/overflow, state exclusivity, reduced motion, honest disabled reasons and glyph-ink collision/clipping checks.
- C1-specific gates cover ten-domain Life Power, mission taxonomy/identity/create routing, schedule date/view populations, hydration deletion/undo, native check-in sliders/nulls/retry/exit, RPG multiplier/recovery truth, task/reminder counts, journal provenance/privacy/storage disclaimer, complete plan actions/undo/canonical PaywallLock, modal traps/fallback focus and meaningful named-state screenshots.
- Glyph collision hardening measures painted font ink, including CSS `text-transform`; synthetic controls prove authored line-box overlap passes while real and uppercase collisions fail.
- `15-enlarged-bottom.png` SHA-256 `19bd53e4da7267eca1dc1561ea6447fb384265050b87d4f24dd6764e6b316f25`; the verifier pins outer shell scroll and requires Unit, Strictness, XP, all data controls, status and CTA visible.

## Accepted residual waivers

| Waiver | Scope | Closure owner/trigger |
|---|---|---|
| Physical-device VoiceOver/TalkBack and system Dynamic Type unavailable | Final certificate only; browser AX, keyboard, focus, actual 125%, target and reduced-motion evidence pass | R11 / external device evidence or explicit release waiver |
| Broad Axe unavailable | Final certificate only | R11 |
| Dirty-worktree evidence has no immutable family SHA | Final one-SHA 104-screen claim only | R11 after user-authorized commit state |
| Exact spawned runtime model/effort is unexposed | Provenance only; role, packets, agent IDs and Sol verification are recorded | Runtime support or persistent `W-MODEL` |

No known C1 Critical, High or Medium product/evidence defect is waived. No commit, staging, Figma, Railway, backend or `yhealth-app` mutation occurred.
