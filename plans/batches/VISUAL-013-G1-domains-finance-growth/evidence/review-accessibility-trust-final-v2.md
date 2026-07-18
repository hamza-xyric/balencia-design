# G1 final accessibility + financial/privacy trust review v2

Reviewer role: independent Terra, read-only. Reviewed `g1-acceptance-final-v4.json`, `g1-strict-final-v3.json`, the frozen/verification matrices, the dedicated verifier, the 114 promoted acceptance screenshots, and live S30–S38 product/shared-modal code. No product file was edited.

## Decision

**REJECT — not ready for DVF-20 acceptance.**

Severity count: **C0 / H1 / M0 / L0**.

The production evidence itself is internally clean (123/123 isolated contexts, 114/114 PNGs, 1,490 passing checks, strict 9/9, and zero console/page/capability/external-request events), but it certifies a mathematically false budget percentage. A financial-trust review cannot approve that claim merely because the frozen matrix and verifier repeat it.

## Findings

### H1 — S31 calls 77.42% “nearest-integer 78%”

- Evidence: `S31BudgetDetail.tsx` displays `$480 / $620`, renders `78%`, and explicitly says `rounded from 77.42%` / `nearest-integer rounding`.
- Arithmetic: `480 ÷ 620 × 100 = 77.419354…%`, whose nearest integer is **77%**, not 78%.
- Source of propagation: `FROZEN-MATRIX.md` freezes the same incorrect result, and `verify-g1-domains.mjs` asserts `78%`. Thus the green acceptance result proves conformance to an erroneous contract, not financial correctness.
- Trust impact: this is a member-facing budget calculation. An incorrect percentage paired with an explicit rounding explanation undermines confidence in the rest of the finance surface and violates the review's finance-arithmetic requirement.
- Required repair: adjudicate the frozen source, change the visible/accessibility value to `77%` while retaining `77.42%` as the disclosed unrounded value, update the verifier assertion/matrix, rebuild on production `:3002`, and regenerate acceptance, strict, and independent final-review evidence. If product intentionally requires 78%, the underlying numerator or denominator must change to a value that actually rounds to 78; do not label ceiling/custom rounding as nearest-integer rounding.

## Accessibility and privacy/trust checks that passed

- Every promoted context reports a 390×844 phone frame, <=1px horizontal overflow, named controls, no nested interactivity, and visible controls meeting the verifier's 44px target rule. Strict final evidence reports zero issue or warning screens.
- Nine actual computed-font-size 125% contexts pass with no horizontal overflow or target regression. These are browser font-size changes, not image scaling.
- Seeded dialogs receive focus and trap forward/reverse Tab in acceptance evidence. The shared `E1Modal` code handles Escape, background inerting, cleanup, and opener/fallback focus restoration. Dialogs are labelled and modal.
- Pending/offline finance items cannot delete; posted deletion previews name `Trader Joe's · $42.10`; the prototype records no provider, payment, file, camera, location, storage, cookie, or external-request capability events.
- S30 arithmetic is coherent: categories total `$2,150`; `$5,000 - $2,150 = +$2,850`; `$1,000` savings is disclosed as an allocation subset; emergency fund `$6,000 / $10,000 = 60%` remains incomplete.
- Data-control states expose category, source, scope, freshness, confidence, retention, export, revoke, and delete. Personal/provider-derived claims are framed as bundled local demos, user-entered/local previews, or unavailable-provider states. S34 keeps safety/help separate from reward treatment; S37 retains local/private and explicit voice-preview consent boundaries; S38 labels association rather than causation.
- Representative screenshot review found no obscured bottom action, modal bleed, destructive ambiguity, or obvious enlarged-text clipping. Asset disposition remains code-native.

## Approval condition

Approval requires H1 closure plus fresh evidence whose verifier independently computes or correctly asserts `480 / 620 = 77.42% → 77%`. Current verdict remains **C0/H1/M0/L0 — rejected**.
