# VISUAL-008 D1 verification log

- Acceptance date: `2026-07-12 PKT`
- Scope: `17,18,21,22,23,24,25,50`
- Result: `PASS — Sol accepted with evidence-only waivers under DVF-15`
- Product/readiness limit: visual-prototype family acceptance only; not production or final one-SHA 104-screen certification.

## Deterministic gates

| Gate | Result | Durable evidence / note |
|---|---|---|
| Targeted ESLint + verifier syntax | PASS | Final S18/S24/S50/verifier repair sites clean; `node --check` clean. |
| `npm run check` | PASS | Zero errors; routes `104/104`, 14 assets, copy, brand, and TypeScript pass. Warnings are limited to 19 unused declarations in the still-open/incomplete D2 verifier plus one pre-existing unrelated unused import in `DomainDashboardHeader.figma.tsx`; none is a D1 product or gate failure. |
| `npm run build` | PASS | Next.js compiled and generated `200/200` pages. Only the existing `module.register()` deprecation warning remains. |
| Fresh production binding | PASS | `next start -p 3002`, build `emqSufq32x9DrJG2I1yIF` (mtime `2026-07-11T21:56:22.035Z`); served HTML SHA-256 `cc97a09915cfba743585ab3c3b46268726a4e845e1f236f3f5dfb0abdf45120e`; newest bound source predates the build. Dev `:3001` was never used. |
| Strict D1 visual audit | PASS | `d1-final-strict.json`: `8/8`, zero issues, warnings, missing phone frames, visible SIA screens, or console-error screens. |
| Hardened D1 state/interaction audit | PASS | `d1-verifier.json`: `99/99` fresh contexts/nonces, `123` checks, exactly `91/91` named 390x844 PNGs, pass-atomic promotion after two consecutive byte-identical bundled-Chromium captures per PNG. |
| Product/API/authority integrity | PASS | Product `06004e81af243fd7c2aad37f5ce5e0c3f19dfa76c094efb66000666d5b3ae328`; verifier file SHA `394d898c2514f4d5417c8bb4e5bb4bb7ea490d29c26c9dbd9f31b7c184e115ed`; final API/authority/accepted digests are recorded below. |
| Accepted-family sentinels | PASS | Independent manifest verification `39/39`; S12 remains `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67`. |
| Capability/network/storage isolation | PASS | Zero console/page errors and zero forbidden capability events. Cookies, local/session storage, IndexedDB and CacheStorage remain empty in every case. |
| Root redesign validator | PASS | `104` ledger rows and `104` screen files; no missing files, low scores, defects, false passes, or uncovered routes. |
| Root + submodule `git diff --check` | PASS | No whitespace errors; pre-existing `yhealth-app` state preserved and untouched. |
| Independent CLEAR review | ACCEPT | Final `0 Critical / 0 High / 0 Medium`; S18 honest-null `0/100` finding repaired to `0/0`. |
| Independent design/source review | ACCEPT | Final `0/0/0`; current S18/S24/S50 renders and identity-only capture guard accepted. |
| Independent accessibility/trust review | ACCEPT | Final `0/0/0`; S24 non-color selected marker finding repaired and visibly confirmed. |
| Sol rendered inspection | ACCEPT | Sol inspected every one of the 91 final PNGs at full resolution; profile, radar/null/paywall, settings, provider, billing, notification, help, form, modal, loading, error, offline, success, disabled, and enlarged-text states are clean. |

## Runtime repair loop

| Evidence failure | Classification | Accepted repair |
|---|---|---|
| S24 Social/Mission/Career tag contrast below AA | Product | Added border and `text-paper-100` while retaining domain-token fills and visible labels. |
| Slash-containing Tailwind selectors invalid in CSS locator | Verifier false positive | Replaced raw class selectors with exact `[class~="..."]` selectors; token assertions remain exact. |
| Skeleton Mark-all-read lacked a resolved disabled reason | Product | Added an `sr-only` reason referenced by `aria-describedby`; every other disabled branch retains its own visible reason. |
| Filter status exposed lowercase `cia` | Product | Visible status now uses all-caps `CIA` and title-cased category names. |
| S50 `Verified` rendered at 11px | Product | Raised the visible label to the 12px semantic floor. |
| S18 PaywallLock actions clipped at actual 125% text | Product | Added screen-local `min-height: 240px` to the two canonical locks; no shared kit changed. |
| S18 honest-null exposed zero domains with total 100 | Product | Null metadata is exact `0/0`; real/partial remain exact `5/100`. |
| GPU/compositor capture dropped layers when the verifier mutated root styles or injected a global freeze sheet | Verifier defect | Leave product styles untouched; require neutral computed transform/filter, use bundled Playwright Chromium, and promote only after two consecutive byte-identical captures within five attempts. Any visual transform or unstable PNG fails closed. |
| S24 active filter had no non-color visual cue | Product | Add one visible check marker to the pressed filter and assert exactly one across default/CIA/surviving-All states. |

## Packet enforcement

The first accessibility delta reviewer crossed its explicit no-build/no-browser/no-verifier boundary while the product hash was changing. Sol rejected the output, interrupted the worker, killed the orphan listener, rebuilt from current source, and assigned a fresh read-only replacement. The replacement output is the accepted evidence. No worker source edit, final-readiness decision, or forbidden-lane mutation was accepted.

## Final post-persistence bind

- Status: `PASS — 2026-07-12 03:02 PKT; all start/end fingerprints identical`
- Production build: `emqSufq32x9DrJG2I1yIF`
- Product digest: `06004e81af243fd7c2aad37f5ce5e0c3f19dfa76c094efb66000666d5b3ae328`
- API digest: `8ae765735b6061987b65cd388f3e82ceba127d1ca8507b6ed8e8c73710c11714`
- Authority digest: `3f1d3c737c1df0aa553a025b697a456febe3b035fe8a2db8d109234eb2bba525`
- Accepted-sentinel digest: `937f3622bfef444b374b4bd388ab24c0b8df7948de820158a1f625263a665e20`
- Final result: `99/99` contexts/nonces, `91/91` stability-gated promoted PNGs, `123` checks, zero console/page/capability events, source integrity unchanged; strict `8/8` is independently green.

## Accepted residual waivers

| Waiver | Scope | Closure owner/trigger |
|---|---|---|
| Physical-device VoiceOver/TalkBack and system Dynamic Type unavailable | Final certificate only; browser AX, keyboard, focus, actual 125%, targets, and reduced-motion evidence pass | R11 / external device evidence or explicit release waiver |
| Broad Axe unavailable | Final certificate only | R11 |
| Dirty-worktree evidence has no immutable family SHA | Final one-SHA 104-screen claim only | R11 after explicit user authorization |
| Exact spawned runtime model/effort is unexposed | Provenance only; role, packets, agent IDs, and Sol verification are recorded | Runtime support or persistent `W-MODEL` |

No known D1 Critical, High, or Medium product/evidence defect is waived. No commit, staging, Figma, Railway, backend, or `yhealth-app` mutation occurred.
