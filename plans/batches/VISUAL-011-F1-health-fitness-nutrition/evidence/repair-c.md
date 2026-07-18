# VISUAL-011 F1 — repair C evidence

- Scope: only `S55YogaSessions.tsx` and `S56Recipes.tsx` plus this evidence file.
- No shared kit, other product file, router, registry, package, browser/server, external service, `yhealth-app`, or git mutation.

## Repairs

### Blocking overlay readability and keyboard lifecycle

- S55 active/paused/pose/summary/success sheets now use an opaque `ink-brown-800` foreground plane over a 95% ink scrim; timer/media interiors are opaque. Background labels can no longer show through foreground content.
- S56 recipe-detail and create/validation sheets use the same opaque foreground/scrim treatment.
- Both local dialog systems capture the previously focused trigger, move initial focus into the dialog, close on Escape, contain forward/reverse Tab at the first/last enabled control, and return focus on unmount.
- Existing query-addressable frozen states and `aria-modal`/label contracts are preserved.

### Enabled-control outcomes and restriction truth

- S55 premium preview action is honestly disabled and labelled `Premium preview unavailable`; all other enabled local controls already change filter/session/pose/rating state or navigate to qualified controls.
- S56 filter icon and More/Hide filters control now toggle a visible advanced-filter status panel.
- Default S56 now renders a non-interactive `No confirmed allergies` status while keeping Vegan as a separately operable preference. Only the frozen allergy-conflict state renders non-interactive `Tree-nut allergy confirmed` and suppresses conflicting recipes before ranking.
- S56 search, category, Vegan preference, clear/retry, favorites, recipe detail, create, navigation, and consent controls retain observable local outcomes.

## Targeted verification

- `npx prettier --write <two owned files>`: PASS.
- `npm run typecheck`: PASS.
- `npx eslint <two owned files>`: PASS, zero warnings/errors.
- `git diff --check -- <two owned files>`: PASS.

Fresh production screenshots, hardened interaction/focus assertions, strict capture, and independent re-review remain Sol/verifier responsibilities.
