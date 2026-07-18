# G1 post-repair accessibility + financial/privacy trust review v3

Reviewer role: independent Terra, read-only. Reviewed the prior H1 across the active S31 spec, frozen matrix, live S31 UI, verifier, `g1-acceptance-final-v5.json`, `g1-strict-final-v4.json`, promoted screenshots, and surrounding G1 accessibility/privacy gates. No product file was edited.

## Decision

**REJECT — prior H1 is only partially closed.**

Severity count: **C0 / H1 / M1 / L0**.

The text chain now correctly states `480 / 620 = 77.42% → 77%`, and the fresh production evidence is otherwise green (123/123 contexts, 114/114 PNGs, 1,490 checks, strict 9/9, zero console/page/capability/external-request events). However, S31's visual meters still encode 78%, and the ring renders its full accessibility sentence as overlapping visible microcopy.

## Findings

### H1 — S31 number says 77%, but both visual meters still encode 78%

- Closed portions: the active S31 spec shows `77%`; `FROZEN-MATRIX.md` says mathematically correct nearest-integer `77%` from `77.42%`; the primary ring text is `77%`; and the verifier now asserts `$480`, `$620`, and `77%`.
- Unclosed product state: `S31BudgetDetail.tsx` still passes `percent={78}` to `ProgressRing` and `value={78}` to `ProgressBar` alongside the corrected `value="77%"` text.
- Result: the orange ring arc and horizontal bar visually communicate 78% while visible/accessibility copy communicates 77%. This is an internally contradictory financial visualization, and it leaves the original erroneous percentage active in two product values.
- Evidence gap: `verify-g1-domains.mjs` checks the text only; v5 therefore passes without detecting the incorrect meter props/geometry.
- Required repair: change both visual-meter values to the adjudicated rounded value (`77`) or support the exact ratio (`480 / 620 × 100`) consistently if the components accept decimals. Add a verifier assertion that catches meter-value drift, rebuild on production `:3002`, and regenerate acceptance/strict/review evidence.

### M1 — S31 ring visibly prints the full accessibility description inside a 104px circle

- In the promoted `31-budget-default.png`, the ring centre shows `77%` plus the entire sentence beginning `$480 spent of $620 allocated…`; it wraps into many tiny overlapping lines across the ring and surrounding content.
- Cause: shared `ProgressRing` uses `label` both for the image's accessible name and as a visible `text-[10px]` caption. S31 supplies a long sentence intended as an accessible description.
- Impact: the primary budget visualization is visually illegible at normal size and will be worse under enlarged text. Passing horizontal-overflow and 125% font-ratio checks does not establish readable internal layout; the verifier does not check text collision/clipping inside the ring.
- Required repair: use a short visible label (for example `of $620`) and preserve the full accessible description separately via an API that distinguishes visible caption from `aria-label`, or omit the ring caption and rely on the adjacent `$480 / $620` text while retaining a concise accurate accessible name. Add a visual/text-layout assertion or focused manual proof at 100% and 125%.

## Gates rechecked without additional findings

- All 123 contexts retain exact state markers, 390×844 frames, <=1px horizontal overflow, named controls, no nested interactivity, and the verifier's 44px target gate. Strict v4 reports C0/H0/M0/L0-equivalent scanner output: zero issues and warnings across 9/9 screens.
- Nine computed-font-size 125% proofs pass with empty storage/cookies. This is actual in-browser font enlargement, not screenshot scaling.
- Seeded dialogs receive focus and trap forward/reverse Tab. Shared `E1Modal` implements Escape, inert background, cleanup, and opener/fallback focus restoration.
- S30 finance arithmetic remains coherent; pending/offline deletion restrictions and named posted-item confirmation remain intact. No external finance/provider/payment/file/device/storage capability is invoked.
- Full data-control states remain present; S34 location/prayer provenance is capability-honest; S37 voice remains explicit preview-only consent with local/private framing; S38 retains association-not-causation language and registered Wellbeing identity. Safety/help remains outside gamification.

## Approval condition

Approval requires consistent 77% meter geometry/props, a readable ring presentation at 100% and 125%, verifier coverage for the repaired meter contract, and fresh production evidence. Current verdict remains **C0/H1/M1/L0 — rejected**.
