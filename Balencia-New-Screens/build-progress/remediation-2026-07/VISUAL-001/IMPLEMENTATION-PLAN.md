# VISUAL-001 evidence-backed implementation plan

Date: 2026-07-10 PKT
Status: plan active; `REFERENCE-DIRECTION.md` accepted under DVF-08/09; shared foundation and seven-screen pilot accepted under DVF-10; bounded family rollout ready.
Authority: this plan is an execution overlay for the existing R1–R11 remediation sequence. `REMEDIATION-LEDGER.md` remains the sole batch/status authority; this file does not close findings.

## Priorities and stop gates

1. **P0 — release/accessibility blockers:** operability, contrast, clipped actions, consent/capability honesty, contradictory default states, and reproducible evidence.
2. **P1 — shared visual foundation:** tokens, type, focus, CTA hierarchy, glass/depth and motion contracts.
3. **P1 — identity systems:** CIA orb, Balencia signature icons and official asset use.
4. **P2 — representative pilot:** seven screens, independent review, explicit Sol acceptance.
5. **P2 — bounded family rollout:** shared contract locked, 3–12 disjoint screens per builder batch.
6. **P3 — media/art completion and isolated fidelity repairs.**
7. **P0 final gate:** deterministic 104-screen evidence, independent review and durable closeout.

Hard gates:

- Reference gate **satisfied 2026-07-10**: the two inspected original replacement boards and `REFERENCE-DIRECTION.md` now govern visual-palette/art-direction choices in steps 1–4. Generated pixels remain non-production evidence.
- The stale local visual-prototype skill cannot overrule 390×844/current route/current canon truth.
- Shared files are serialized through Sol; no parallel writer touches `globals.css`, the hifi kit, shared icons, route metadata, ledger or handoff.
- A builder never reviews its own work.
- No code change may reduce the visible affordance count, remove product ambition to hide a dependency, or touch `yhealth-app`/Figma/Railway.

## 1. Shared token and atmosphere foundation

**Authority:** A24-003/009/010/017; RW-R0-09/10/11; RW-VF-01/05/06.
**Owner:** Sol integrator.
**Targets:** `src/app/globals.css`, verification scripts, canon/docs only where the existing R1/R4 plan permits.

Work:

- Compute and encode an AA semantic text/surface matrix; remove opacity-based semantic copy below the verified floor.
- Implement the DVF-09 burnished-ember action palette and state values from `REFERENCE-DIRECTION.md`; keep bright `#FF5E00` out of paper-labelled primary controls and do not reuse the brightening `--grad-orange`.
- Normalize the role-based type scale, minimum semantic copy size, line height, weight, wrapping and text-zoom behavior.
- Define foundation/raised/modal glass and dense-data rules; preserve warm-brown glass while removing unintentional depth competition.
- Extend global focus and reduced-motion utilities; cover custom spin/pulse and all new state transitions.
- Harden the final screenshot harness per RW-VF-06 before accepting pixel-diff evidence.

Exit:

- Computed token matrix passes WCAG AA; raw/undefined colors fail brand verification; 8–10px semantic copy is removed or named-waived; focus/reduced-motion utilities are exercised; two serialized captures reproduce.

## 2. CIA orb system

**Authority:** RW-VF-03; naming remains A24-008/RW-009; purple semantics remain A24-003.
**Owner:** Sol shared-system writer; independent Terra reviewer.
**Targets:** `kit/cia.tsx`, motion/token support, six consumer modules only after the shared contract locks.

Work under the accepted Image-1 contract:

- Record approved anatomy, edge precision, scale behavior, glow budget and texture—not a generic neon sphere.
- Support idle/listening/thinking where applicable; screen 11 additionally requires speaking/success. Keep muted in the mic-control contract unless the approved reference direction explicitly extends the orb.
- Give each state non-color and accessible cues; provide static/crossfade reduced-motion equivalents.
- Verify compact status sizes and the large voice hero before migrating 07,11,19,45,69,85.

Exit:

- All states are optically distinct at small and hero sizes, state labels are correct, reduced-motion remains legible, purple stays CIA-exclusive, and no raster UI asset is introduced.

## 3. Button and CTA system

**Authority:** RW-VF-01/02; A24-002/010; RW-R0-17 for monetization ethics.
**Owner:** Sol shared-system writer; independent Terra reviewer.
**Targets:** `kit/buttons.tsx`, `components/design-system/Button.tsx` where truly shared, focus/motion tokens, then classified consumers.

Work under the accepted Image-2 contract:

- Define hierarchy, size, width and icon alignment plus default/hover/pressed/focus/loading/disabled/success/destructive states.
- Use a restrained deep tonal action treatment with controlled inner highlight/border/glow; no purple in non-CIA actions.
- Repair AA text contrast and authored focus before visual flourish.
- Classify 50 primary, 34 secondary, 51 ghost, 4 coach, 2 success, 73 icon-button and raw one-off action consumers; migrate only semantic equivalents.

Exit:

- Tokenized state matrix passes contrast, keyboard, touch, reduced-motion and sentinel screenshots; auth width rules and paywall/decline parity pass; no scattered action colors remain.

## 4. Balencia icon vocabulary

**Authority:** RW-VF-04; action semantics stay A24-002/A24-010/RW-R0-07; raster slots stay A24-016.
**Owner:** Sol registry/integration; Terra can implement disjoint code-native glyph groups after approval.

Work under the accepted two-board contract:

- Classify 558 screen-module Lucide bindings plus 12 kit bindings (570 total, 154 distinct glyphs) by commodity versus brand-owned meaning.
- Retain familiar back/close/search/delete/overflow controls in one standard family.
- Create only the small approved signature set for missions, life domains, Life Power, CIA intelligence, correlations, progression and RPG states.
- Use one viewBox, approximately 2px rounded outline language, optical corrections at 16/20/24px and an intentional active/filled state.

Exit:

- Registry, labels/decorative hiding and size/stroke/fill rules pass; concepts are recognizable without color; official logo is untouched; no second generic library is created.

## 5. Shared surfaces, typography and spacing

**Authority:** A24-002/004/010; RW-R0-01/02/03/04/05/06/07/11/18/19; RW-VF-05/08.
**Owner:** Sol for kit, Terra for disjoint consumers.

Work:

- Repair existing ProgressRing, SectionTitle, ChargeMeter, SafetyCard, Composer, ChatBubble, ConsentRail and navigation contracts.
- Decide and implement/spec-disposition missing named patterns such as GlassStatCard, PaywallLock and required visualization components.
- Create the screen/component state matrix: default, focus, pressed, disabled, loading, empty, error, success, offline and privacy states where applicable.
- Normalize safe-area reservations, scroll regions, dense-card spacing, headings and live/status semantics.

Exit:

- Named components preserve their information contract; shared consumers pass no-pixel or intentionally accepted diffs; PaywallLock never hides value or dead-ends; safety/privacy entries are reachable.

## 6. Representative seven-screen pilot

Pilot set, chosen from audit coverage:

| Screen | Why it is in the pilot | Required proof |
|---|---|---|
| 03 | CTA-heavy auth and form semantics | AA CTA, full-width hierarchy, native fields/legal actions, one `h1`, default/error/loading states |
| 07 | Compact CIA orb, voice consent and composer | idle-by-default, compact orb states, mic consent, operable composer/safety exits |
| 11 | Hero CIA orb | large-scale state precision, mic toggle, reduced-motion/static cues |
| 12 | Main Today dashboard | shared chrome/nav, DVF-06 ten-domain/Life Power contract, quick log and card rhythm |
| 26 | Dense health composition | type/contrast, data provenance, card/elevation density, touch targets |
| 43 | Monetization/strong CTA | canonical PaywallLock, visible value, equal exit, truthful tier/trial copy |
| 80 | Media plus connected/cold/error system states | coherent Manage-vs-Connect provider state, media art slot, playback controls, privacy actions |

Pilot sequence:

1. Snapshot exact before evidence and record current SHA/config.
2. Read installed Next.js 16 docs before framework-sensitive edits and load the Framer Motion skill before motion edits.
3. Confirm DVF-06 has been reconciled into the screen-12 spec/canon contract, then serialize shared foundation through Sol.
4. Delegate only disjoint pilot screen files.
5. Run targeted checks, `npm run check`, strict `--only` screenshots, real rendered inspection, contrast/focus/touch/text-zoom/reduced-motion review.
6. Have an independent Terra reviewer compare before/after and challenge generic-neon, noisy-glass, state and ethics regressions.
7. Sol records accept/reject. A failed direction is repaired here; it is never propagated.

Pilot exit:

- Seven accepted before/after pairs; shared contracts locked; no unwaived High/Critical pilot finding; no route/copy/asset/brand regression.

**Outcome 2026-07-10:** PASS. Sol accepted all seven after `npm run check`, a 7/7 zero-warning strict capture, the durable 7/7 interaction suite, 17 pilot exercised-state PNGs and separate independent design plus accessibility/trust re-audits. Review-found focus, HIFI-26 and direct state-evidence gaps were repaired before acceptance. Post-acceptance concurrent S03/S07 state enhancements were reconciled and both ACCEPT recommendations remained unchanged. Low rollout-polish notes remain for S12 short axis labels, S03 pending-field treatment and S07 selected-chip styling. See DVF-10 and `plans/batches/VISUAL-003-seven-screen-pilot/evidence/PILOT-COVERAGE.md`.

## 7. Screen-family improvements

After pilot acceptance, use the exact audit slices as implementation waves: A1 (8), A2 (7), B1 (10), C1 (11), D1 (8), D2 (7), E1 (8), F1 (10), F2 (10), G1 (9), H1 (10), I1 (6). Pilot screens are verified in their family but not reimplemented.

**A1 outcome 2026-07-10:** PASS under DVF-11. Sol accepted routes `01,02,03,03b,03c,03d,03e,04` after full check/build, an 8/8 zero-warning strict capture, an isolated eight-group interaction suite with nine OTP fixtures and 42 state/focus PNGs, root 104/104 validation and three independent ACCEPT reviews. Review-found screenshot isolation, source copy/swipe, picker/provenance, provider visibility, retry-after honesty/expiry, stale consent-success and countdown-announcement defects were repaired before acceptance. The three A1 image slots have explicit code-native dispositions. The exact next wave is A2; pilot screen `07` is verification-only.

**A2 outcome 2026-07-10:** PASS under DVF-12. Sol accepted routes `05,05b,06,07,08,65,66` after full check/build, a 7/7 zero-warning strict capture, and a hardened seven-group interaction suite with exactly 61 state PNGs across 62 storage-cleared query/hash nonces. Current product/API hashes remained unchanged during the run; root validation stayed 104/104; three independent reviews accepted after recovery live/action, reset token/rule announcement, minimal-plan truth/edit continuity, force-update loading, permission live-region and verifier false-pass defects were repaired. All seven specs declare no image slot.

**B1 outcome 2026-07-10:** PASS under DVF-13. Sol accepted routes `09,10,51,74,75,76,77,79,99` after full check/build, a 10/10 zero-warning strict capture including pilot sentinel `11`, and a hardened interaction suite with exactly 109 current 390×844 state PNGs across 111 isolated contexts/nonces and 118 recorded checks, zero console/page errors and zero forbidden capability events. Product hash `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b`, verifier/API hash `18cfc1b1a455ce2bdcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e` and final B1 authority hash `ca2caf01242bf3b76ce0b9180a6f61676f0fa7ef343910d9dc4cc66abe18a326` are recorded; root validation stayed 104/104 with root and submodule `git diff --check` clean. Independent design/source and accessibility/trust reviews accepted. Privacy-safe ImageGen asset `HIFI-75-01` (`2e3f7674fe6100ec75ee77a02e9beff87c55870af8c6e44462625311f7590b39`) is reused byte-identically by S75/S77. The exact next wave is **C1 Today/missions** on `13,14,15,41,44,45,59,61,73,97`; pilot screen `12` is verification-only. C1 is the only next family; no other family may open concurrently.

**C1 outcome 2026-07-11:** PASS under DVF-14. Sol accepted routes `13,14,15,41,44,45,59,61,73,97` with byte-locked pilot sentinel `12` after full check/build, strict `11/11` zero-issue/zero-warning capture, and a hardened suite with exactly 89 current 390×844 state/action PNGs plus eleven screenshot-free 125% proofs across `100/100` isolated contexts/nonces and `147/147` checks. Product hash `013bea5d034ab47df29de461b1791d037f988e0bb98aefbfcf6a2d4b26fb397e`, verifier/API hash `a4bcdfb702538c4bf8a29ced58aff82b2c890378608953a2dcc41fa6a9f1418c`, final C1 authority hash `17b1256d3816e3326bd7672b4c0d1aebdc0443ee738dee02f93ff4a8b23912db`, zero runtime/capability events and root 104/104 validation are recorded. Three fresh independent code, design/source and accessibility/trust reviews accept at `0 Critical / 0 High / 0 Medium` after storage-truth, AX-grouping, glyph-collision and enlarged-bottom evidence defects were repaired. No raster was added; S73 uses privacy-safe honest-null media. The exact next wave is **D1 Profile/settings core** on `17,18,21,22,23,24,25,50`; no other family may open concurrently.

**D1 outcome 2026-07-12:** PASS under DVF-15. Sol accepted routes `17,18,21,22,23,24,25,50` after full check/build, strict `8/8` zero-issue/zero-warning capture, and a hardened suite with exactly 91 current 390×844 state/action PNGs across `99/99` isolated contexts/nonces and `123` checks. Each PNG is stability-gated by two consecutive byte-identical bundled-Chromium captures without product-style mutation. Product hash before authority persistence is `06004e81af243fd7c2aad37f5ce5e0c3f19dfa76c094efb66000666d5b3ae328`; verifier SHA is `394d898c2514f4d5417c8bb4e5bb4bb7ea490d29c26c9dbd9f31b7c184e115ed`; the exact final production/authority binding is recorded in the D1 verification log. Accepted sentinels remain `39/39`, root validation remains 104/104, and console/page/capability events remain zero. Final CLEAR, design/source, and accessibility/trust reviews close at `0 Critical / 0 High / 0 Medium` after S18 honest-null `0/0`, Paywall text reflow, S24 contrast/disabled/casing/non-color selection, S50 text floor, and identity-only capture evidence were repaired. Sol inspected all 91 final PNGs at full resolution. No raster was added; `HIFI-50-01` uses a privacy-safe honest-null avatar. The exact next wave is **D2 Profile/commercial** on `19,42,43,68,71,83,92`; pilot screen `43` is verification-only and byte-locked.

**D2 outcome 2026-07-16:** PASS under DVF-16. Sol accepted routes `19,42,43,68,71,83,92` after full check/build, strict `7/7` zero-issue/zero-warning capture, and a hardened suite with exactly 73 current 390×844 state/action PNGs plus seven 125% proofs across `80/80` isolated contexts/nonces and `106` checks. Product/API/authority/accepted integrity remained stable; accepted sentinels passed `47/47`; root validation stayed 104/104; console/page/capability events remained zero. Three final-v2 independent reviews accept at `0 Critical / 0 High / 0 Medium`, and Sol inspected all changed-screen default PNGs at native pixels. S43 remains byte-locked. No raster was added; S42 is code-native and S83 keeps the consent-safe initials fallback. The exact next wave is **E1 Life intelligence** on `16,20,48,72,84,90,93,96`; no later family may open concurrently.

**E1 outcome 2026-07-16:** PASS under DVF-17. Sol accepted routes `16,20,48,72,84,90,93,96` after full check/build, strict `8/8` zero-issue/zero-warning capture, and a hardened suite with exactly 73 current 390×844 state/action PNGs plus eight 125% proofs across `81/81` isolated contexts/nonces and `752` checks. Product/API/accepted integrity remained stable; accepted sentinels passed `53/53`; root validation stayed 104/104; console/page/capability events remained zero. Three final-v3 independent reviews accept at `0 Critical / 0 High / 0 Medium` after state-exclusivity, metric-evidence, interaction, modal-isolation, focus, destructive-flow, retry, and source-label defects were repaired. Sol inspected all eight final default PNGs at native pixels. No raster was added; HIFI-90-01 and HIFI-96-01 are code-native. The exact next wave is **F1 Health / fitness / nutrition** on `26,27,28,29,49,52,53,54,55,56`; no later family may open concurrently.

**F1 outcome 2026-07-16:** PASS under DVF-18. Sol accepted routes `26,27,28,29,49,52,53,54,55,56` after full check/build, strict `10/10` zero-issue/zero-warning capture, and a hardened suite with exactly 101 current 390×844 state/action PNGs plus ten 125% proofs across `111/111` isolated contexts/nonces and `949` checks. Product/API/accepted integrity remained stable; accepted sentinels passed `61/61`; root validation stayed 104/104; console/page/capability events remained zero. Three final-v2 independent reviews accept at `0 Critical / 0 High / 0 Medium / 0 Low` after allergy truth, keyboard tabs, inert-control, family-wide interaction, modal focus/scrim, and copy-boundary findings were repaired. Sol inspected all defaults and high-risk modal states at native pixels. HIFI-26-01 retains the existing privacy-safe raster; six slots are code-native. The exact next wave is **F2 Health care / media** on `57,58,60,62,63,70,86,87,88,89`; no later family may open concurrently.

**F2 outcome 2026-07-16:** PASS under DVF-19. Sol accepted routes `57,58,60,62,63,70,86,87,88,89` after full check/build, strict `10/10` zero-issue/zero-warning capture, and a hardened suite with exactly 113 distinct deterministic state/action PNG proofs plus ten 125% proofs across `123/123` isolated contexts/nonces and `1341` checks. Product/API/accepted integrity remained stable; accepted sentinels passed `71/71`; root validation stayed 104/104; console/page/capability events remained zero. Three final-v2 independent reviews accept at `0 Critical / 0 High / 0 Medium / 0 Low` after consent, disabled-action, tab/panel, destructive-row, manual-provenance, state-distinctness, overlay, and asset-marker findings were repaired. Sol inspected the high-risk exercise-detail overlay proof at native pixels. Four slots are code-native/no-identifiable-person; no raster was added. The exact next wave is **G1 Domains / finance / growth** on `30,31,32,33,34,35,36,37,38`; no later family may open concurrently.

**G1 outcome 2026-07-16:** PASS under DVF-20. Sol accepted routes `30,31,32,33,34,35,36,37,38` after full check/build, strict `9/9` zero-issue/zero-warning capture, and a hardened suite with exactly 114 distinct deterministic state/action PNG proofs plus nine 125% proofs across `123/123` isolated contexts/nonces and `1494` checks. Product/API/accepted integrity remained stable; accepted sentinels passed `81/81`; root validation stayed 104/104; console/page/capability/external-request events remained zero. Three final-v4 independent reviews accept at `0 Critical / 0 High / 0 Medium / 0 Low` after finance arithmetic, meter geometry, concise ring labeling, consent, modal, state-distinctness, and bottom-action findings were repaired. Sol inspected finance/privacy/habit proofs at native pixels. All nine screens are code-native; no raster was added. The exact next wave is **H1 Social / community** on `39,40,46,47,64,78,82,91,94,95`; no later family may open concurrently.

**H1 outcome 2026-07-16:** PASS under DVF-21. Sol accepted routes `39,40,46,47,64,78,82,91,94,95` after full check/build, strict `10/10` zero-issue/zero-warning capture, and a hardened suite with exactly 182 distinct deterministic state/action PNG proofs plus ten actual 125% proofs across `192/192` isolated contexts/nonces and `5240` checks. Product/API/415-production-input/90-accepted-sentinel integrity remained stable; 62 transitions, ten modal-scale proofs, 11 focus restorations across all ten screens, empty isolated storage/cookies, and zero console/page/capability/external-request events are recorded. Three exact-v4 independent reviews accept at `0 Critical / 0 High / 0 Medium / 0 Low` after pending-proof, consent, report-focus/missing-context, audience-radio, saved-proof, and media-suppression defects were repaired. Sol inspected the high-risk proof, consent, focus, and media-off pixels. No raster was added. The exact next wave is **I1 System / media** on `67,69,80,81,85,98`; no later family may open concurrently.

**I1 outcome 2026-07-17:** PASS under DVF-22. Sol accepted routes `67,69,80,81,85,98` after a fresh build, strict `6/6` zero-issue/zero-warning capture, and a hardened suite with exactly 80 distinct deterministic state/action PNG proofs plus five actual 125% root-text proofs and the accepted S80 CSS-zoom waiver across `86/86` isolated contexts and `2300/2300` checks. Every primary and replay uses a separate fresh browser; 51 transitions, nine exact focus restorations, all 3,160 perceptual pairs above the 64-pixel/0.05 floor, empty storage/cookies, zero console/page/capability/external-request events, and stable product/API/production-input/100-accepted-sentinel integrity are recorded. Three exact-final independent reviews accept at `0 Critical / 0 High / 0 Medium / 0 Low` after media geometry, state restoration, plan truth, focus, deterministic-capture, and verifier false-pass defects were repaired. S67/S81 are code-native; S80/HIFI-80-01 remain immutable; no new raster was added. All family waves are accepted at `104/104`; **R11 final certification** is the only next batch.

Per wave:

- One Terra builder receives disjoint screen files and exact finding rows.
- A different Terra reviewer checks rendered before/after, states, 390×844 plus text expansion, interaction semantics, privacy/data honesty and RPG consistency.
- Sol runs/accepts deterministic gates and updates the existing remediation ledger only after evidence passes.
- If a symptom belongs to a shared root, pause the family and repair the shared contract through Sol; do not add a screen-local override.

## 8. Isolated screen repairs

Priority local repairs already proven include:

- Screen 77 sheet scrolling/clipped shared media and Done.
- Screen 99 title/CTA wrapping and inert compliance actions.
- Auth consent/state contradictions on 03b/03d/03e/04/05.
- Screen 08 milestone truth; screen 80 provider-state truth.
- R0 numeric/provenance/copy/layout items under RW-R0-04..19.

Each repair stays mapped to its existing or RW-VF authority, has a before PNG, exact component/file, acceptance criterion, owner/status and reviewer evidence.

## 9. Optional bitmap/media asset work

**Authority:** A24-016/RW-034 and `_IMAGE-SLOTS.md`.
**Owner:** approved asset worker; Sol acceptance.

- Work in the existing P0 privacy → P1 privacy/no-face → first-impression → remainder order.
- Prefer approved official/stock/provided assets; use ImageGen only for genuinely appropriate bitmap atmosphere/media/texture, never the logo or UI icons.
- Record prompt, model/tool provenance, privacy review, crop/focal behavior and the exact slot ID for every accepted generated asset.
- Every one of 35 slots ships or receives a founder waiver by ID; no silent deletion.

## 10. Verification and final consistency

For every accepted batch:

- Targeted lint/type verification.
- `npm run check`.
- Hardened strict visual harness with `--only` for the changed set and matching before/after screenshots.
- Real rendered inspection: console/page errors, safe area, clipping, action states, icon alignment, contrast, text zoom, reduced motion, all-caps `CIA` naming and brand-token compliance.
- Unchanged sentinel routes to detect shared regressions.

Final gate:

1. `npm run check`.
2. `VISUAL_AUDIT_BASE_URL=http://localhost:3002 npm run verify:visual` against a fresh production build; never use dev `:3001` for acceptance.
3. Hardened final local strict 104 screenshots at one recorded SHA/config.
4. `node Balencia-New-Screens/work/validate-redesign.mjs --json`.
5. `npm run figma:check` only if mapped component contracts changed; never publish.
6. `npm run build` when font/network access permits, with an exact external-failure waiver only when proven.
7. Independent Terra cross-screen design review and separate accessibility/state review.
8. Sol final art-direction/consistency acceptance, remediation-ledger update, coverage matrix, certificate, progress and standalone handoff.

The goal remains open until all reconciled 104 routes have accepted dispositions, all unwaived High/Critical findings close, the orb/CTA/icon systems close, final deterministic gates pass, and no unauthorized lane changed.
