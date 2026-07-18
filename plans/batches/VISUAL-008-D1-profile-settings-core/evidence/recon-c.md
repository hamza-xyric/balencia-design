# D1-RECON-C — Luna read-only reconciliation evidence

- Scope: S25, S50 plus minimum route/shared/asset surface
- Method: static code/spec/audit/route reconciliation only; no edits, service mutation, or asset generation
- Runtime model intent: Luna `scope_scout`, medium; exact thread attestation covered by `W-MODEL`

## Shared/route classification

- Canonical components render through `/screens/25` and `/screens/50`; old `/tabs/me/*` implementations are pattern references only and retain stale source/copy.
- Shared Back/nav, legal footer, native `GlassPillInput`, primary CTA contrast/focus/loading, and reduced-motion contracts are repaired; those old audit claims are stale.
- Both D1 modules remain static-only with no state roots, query fixtures, or real outcomes.
- Generic `PrototypeActionSheet` cannot model consent, support, or discard; each screen needs a local purpose-specific overlay using `HifiShell.overlay`.
- **Sol override:** visible coach name remains all-caps `CIA` under DVF-07; all lowercase recommendations in the July 10 audit/scout are void.

## S25 findings

- Search is now a native input through shared repair, but it is uncontrolled and lacks filtering, conditional clear, count/result live regions, empty/error/offline behavior, or search role.
- Ask CIA is actionless; copy overclaims mission/tracking context; only Source/Scope display chips exist; no consent or equal exits.
- FAQ rows and Contact are actionless; category chips misuse semantic tones; default `Status: open` fabricates/ambiguously implies a ticket.
- Two H1s remain; no article/contact/handoff state matrix exists.

Required repair: labelled `input[type=search]`, conditional >=44px Clear, announced results, honest null; route-ready article/category outcomes; query-only CIA handoff consent with equal exits and full controls; honest `No ticket yet`/`No current SLA`; local support sheet with explicit no-network/no-ticket preview result; single H1; neutral navigation affordances.

Recommended captures: `25-default`, `25-search-results`, `25-search-empty`, `25-cia-consent`, `25-contact-no-ticket`, `25-offline`, plus explicit error/success fixtures in the state contract.

## S50 findings

- First/last/phone are now native but uncontrolled; phone remains `type=text`; About remains a non-editable div.
- Save is permanently disabled for optional completeness pressure rather than clean/dirty/valid truth.
- Avatar honest-null button has no first-photo consent, picker sequencing, revoke, or delete path.
- Native Back does not intercept dirty exits; bottom navigation would silently lose edits.
- Completeness is internally coherent but static, unprovenanced, and visually—not semantically—progress.
- Copy/info/demographic/delete actions are no-ops; no form/consent/discard/offline/success/error fixtures exist.

Required repair: controlled labelled native text/tel/textarea with `maxlength=160`; dirty/valid computation; clean reason references unchanged form; valid partial edits save; photo consent precedes any picker state with equal exits; dirty Back opens an alert dialog with equal Keep editing/Discard exits; local accessible progress semantics and `You logged` provenance; offline preserves edits and disables Save for the correct reason.

Sol composition decision: hide the global tab bar on S50 to match the focused edit composition and avoid additional un-intercepted exits; render a local visually matched Back header whose button can open the discard dialog.

Recommended captures: `50-default`, `50-partial`, `50-dirty-valid`, `50-dirty-invalid`, `50-photo-consent`, `50-unsaved-exit`, `50-offline`, `50-success`, `50-enlarged-bottom`.

## Asset disposition recommendation

- No privacy-safe screen-specific raster is present.
- `_IMAGE-SLOTS.md` states generation is non-blocking, and the S50 spec explicitly authorizes an honest-null avatar.
- Sol should record `HIFI-50-01` as an explicit privacy-first honest-null disposition; do not generate a synthetic identity image by default.

## Source reconciliation

- Preserve default `6 of 8`/75% as the populated fixture.
- Model Day-1 `2 of 8` as a separate `partial` fixture; this resolves the spec prose/composition distinction without fabrication.

Worker output is evidence only; Sol independently reconciles it into the frozen matrix.
