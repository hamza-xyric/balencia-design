# VISUAL-008 D1 — Terra builder common contract

- Parent batch: `VISUAL-008-D1-profile-settings-core`
- Frozen authority: `BATCH.md` + `VERIFICATION-MATRIX.md` + the assigned current specs + D1 audit reconciliation evidence
- Runtime: native Codex Terra implementation role, high effort; exact thread attestation remains `W-MODEL`
- Visual direction: Quiet orbit / burnished ember, warm dark, selective glass, solid dense surfaces, one primary action, purple CIA-only, green success/healthy only
- Product boundary: visual-only local prototype; no API/auth/OAuth/OS/media/clipboard/storage/provider/global-state capability

## Required implementation pattern

1. Add `'use client'` only to the assigned screen files.
2. Use typed local state and a mount effect reading `window.location.search`; expose the exact frozen root/substate attributes. Query fixtures must settle deterministically without network/storage.
3. Keep every visible enabled affordance honest: use a same-origin anchor, local state change, or purpose-specific overlay. Remove/recast actionless controls.
4. Local overlays use `HifiShell.overlay`, `role="dialog"`/`alertdialog`, labelled title, background inertness, initial focus, Tab trap, Escape policy, focus restoration, and equal exits where consent/destruction is involved.
5. Editable controls are labelled native inputs/textarea at >=16px. All effective targets are >=44x44. Apply `focus-ring` to raw controls. Meaningful mutable text is >=12px and AA; wrap nav microcopy locally if necessary.
6. State, error, offline, and success copy is explicit local-preview truth. Never imply that a request, connection, ticket, picker, biometric, notification, purchase, cancellation, export, deletion, or sync actually occurred.
7. Visible coach name is exactly `CIA` in all caps (DVF-07). Use Mission/Target, never visible Goal. Placeholders start uppercase. Official logo is untouched.
8. Use existing shared primitives unchanged. No shared-kit/globals/registry/route/package/lock edit.
9. Preserve the premium composition and natural scroll; dense tables/lists use solid surfaces. Reduced-motion stops all loops/spinners.
10. No file outside the packet's two product files may change.

## Denied actions

- No `yhealth-app`, Figma, Railway, backend/API, external network, provider, OS capability, generated asset, git stage/commit/reset/stash/clean, package install, server lifecycle, or shared-file edit.
- No readiness/acceptance decision and no ledger/batch/handoff mutation.
- Stop and report if a required result needs a shared edit or source conflict.

## Builder evidence returned in final message

- Files changed and SHA/diff summary
- State/query/root mapping
- Interaction/outcome mapping
- Accessibility/trust decisions
- Commands and raw result summaries
- Any deviation/blocker

Root independently diff-inspects and verifies all work; worker output is evidence only.
