# D2 Worker Packet — Rendered active-filter visibility repair

Status: assigned

## Role and objective

Act as a bounded Terra implementation worker. Repair the one root-rendered Medium finding in Screen 71: the selected `Meditation` filter is clipped beyond the right viewport edge in the canonical `filtered-empty` fixture, so the active state cannot be read.

## Bound candidate

- Allowed product file: `balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx`
- Entry SHA-256: `f4185894a270417f642640ee8fa933319e600814d3a2321a90c5c777cd48dc46`
- Screen/state: `/screens/71?state=filtered-empty` / `71-filtered-empty-meditation.png`
- Frozen Screen 43 sentinel must remain byte-identical: `134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3`

## Required outcome

- When a non-leading filter is selected by a fixture or by user interaction, the complete selected chip is visible in the horizontal filter scroller.
- The canonical filtered-empty screenshot must show the full `Meditation` label and selected marker within the phone viewport.
- Preserve horizontal scrolling, all filter semantics, focus behavior, reduced-motion behavior, and every existing D2 state contract.
- Prefer deterministic, non-animated positioning suitable for screenshot capture. Avoid timing-sensitive behavior.

## Prohibited work

- Do not edit any other product file, verifier, evidence, batch ledger, review packet, or accepted family.
- Do not edit Screen 43.
- Do not run a dev server or use port 3001.
- Do not use git mutation commands, install dependencies, or touch `yhealth-app/`.

## Verification and report

- Run the narrowest static check that does not create unrelated writes (at minimum inspect the diff and run `git diff --check` for the allowed file).
- Recompute and report the final SHA-256 of the allowed product file.
- Report exact files changed, rationale, commands/results, and any residual risk in `plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-rendered-filter-visibility.md`.
- Do not modify this packet after reporting; Sol will bind status and rerun production verification.
