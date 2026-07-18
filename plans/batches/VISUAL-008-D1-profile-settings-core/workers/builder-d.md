# VISUAL-008 D1 — Terra builder packet D (S25/S50)

- Packet status: `completed — implementation evidence returned; Sol acceptance pending`
- Packet ID: `D1-BUILD-D`
- Parent batch: `VISUAL-008-D1-profile-settings-core`
- Worker profile/harness: native Codex Terra builder
- Routing/model/effort: `gpt56-tiered` / `gpt-5.6-terra` role intent (`W-MODEL`) / high
- Source hierarchy/tie-breaker: parent batch and frozen matrix
- Evidence destination: `evidence/builder-d.md` (Sol persists native-thread report)
- Stop condition: shared edit, source conflict, scope crossing, or two equivalent failures

Read `workers/builder-common.md`, `BATCH.md`, `VERIFICATION-MATRIX.md`, `evidence/recon-c.md`, current specs 25/50, `_IMAGE-SLOTS.md`, and only imports needed by the assigned files.

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S25HelpCenter.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S50ProfileEdit.tsx`

## S25 exact outcome

- Exact help/search/panel/handoff/ticket roots and one H1.
- Controlled labelled `input[type=search]`, conditional >=44px Clear, grouped results, atomic polite count, honest null/error/offline; Clear restores six categories and focus.
- FAQ/article rows have real local article outcomes and neutral affordances.
- Ask CIA opens query-only consent before handoff; equal exits, focus trap/restoration, exact disclosure and eight contextual controls; no mission/tracking history is implied.
- Default exact `No ticket yet` and `No current SLA`; Contact sheet preserves typed issue and explicitly says no network request/ticket was created.
- Terms/Privacy remain real same-origin footer actions.

## S50 exact outcome

- Exact profile/form/consent/panel roots; hide global tab bar and render a local visually matched Back button capable of dirty interception.
- Controlled labelled First/Last native text, Phone `type=tel`, About `textarea[maxlength=160]` with described counter; all >=16px.
- Clean Save disabled because unchanged; valid dirty edit enables Save regardless of optional completeness; invalid dirty state exposes text error/ARIA.
- Default 6/8=75%; partial 2/8; accessible progress semantics and `You logged` provenance.
- Avatar first opens equal-exit photo consent. Accept leads only to an honest picker-preview state; never create/click a file input or invoke media. Revoke/delete remain reachable.
- Dirty Back opens equal-exit `alertdialog`; Keep editing restores focus/value, Discard alone navigates to S17. Offline preserves edits with correct Save reason.
- Local demographic/copy/delete/info outcomes; no clipboard or destructive capability claim.
- `HIFI-50-01` remains honest-null; do not generate or add a raster.

## Verify

Run `npx eslint src/components/hifi/screens/profile/S25HelpCenter.tsx src/components/hifi/screens/profile/S50ProfileEdit.tsx`. Do not run or restart a server. Return evidence only after the command passes or report the exact blocker.
