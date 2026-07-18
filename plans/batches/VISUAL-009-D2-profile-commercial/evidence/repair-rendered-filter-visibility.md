# D2 rendered active-filter visibility repair

- Packet: `repair-rendered-filter-visibility.md`
- Result: completed; Sol production verification pending
- Entry hash: `f4185894a270417f642640ee8fa933319e600814d3a2321a90c5c777cd48dc46` — matched before editing
- Frozen S43 sentinel: `134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3` — matched before editing
- Final S71 hash: `99ab180a2ff28297e95431f9aa68ff13e7fec66465ac6a88005bf95e844cf43f`

## Exact files changed

- `balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx`
- `plans/batches/VISUAL-009-D2-profile-commercial/evidence/repair-rendered-filter-visibility.md`

## Repair rationale

S71 now keeps a ref to the existing horizontal filter scroller and, in a synchronous `useLayoutEffect`, checks the selected chip against a 16px inset viewport boundary. It adjusts `scrollLeft` only when the selected chip is clipped, using a direct non-animated assignment. This makes fixture-selected and interactively selected trailing filters fully visible while preserving native horizontal scrolling, button semantics, focus, reduced-motion behavior, and all existing state contracts.

## Verification

- Inspected `git diff -- balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx` — bounded delta confirmed.
- `git diff --check -- balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx` — PASS; no output.
- `node_modules/.bin/eslint src/components/hifi/screens/profile/S71AchievementGallery.tsx` from `balencia-screens/` — PASS; no output.
- `shasum -a 256 src/components/hifi/screens/profile/S71AchievementGallery.tsx` from `balencia-screens/` — `99ab180a2ff28297e95431f9aa68ff13e7fec66465ac6a88005bf95e844cf43f`.

## Residual risk

No server or browser was run under this packet. Sol must confirm the full `Meditation` chip and selected marker in the fresh canonical `71-filtered-empty-meditation.png` production capture and rebind the verifier to the final S71 hash.
