# VISUAL-009 D2 — Terra repair packet: progression design

- Packet status: completed; Sol verification pending.
- Packet ID: D2-REPAIR-DESIGN-FINAL.
- Role intent: Terra implementation, high effort; output remains evidence until Sol verifies it.
- Stop condition: source drift from the hashes below, shared-kit/S43 edit, scope crossing, or two equivalent failures.

## Exact candidate

```text
85b83bfe0fd19bb245f3b088a26ded757004768df4586cfb9ec4a3d44950387f  S19RpgCharacter.tsx
1ee0988c238758c5215a5006d4079f1b1fdda4ff7126438b2b8380dacfc3a135  S71AchievementGallery.tsx
```

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S19RpgCharacter.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx`

## Required outcomes

- S19 success state renders a restrained, screen-local green arrival/celebration treatment, with a static reduced-motion path and no real reward/haptic/external mutation.
- S19 radar uses a screen-local visual SVG-label floor of at least 12px, with enough room to avoid collisions; do not edit shared kit.
- S71 models deterministic rarity from the five-tier RPG authority and renders a code-native non-color-only rarity label/treatment in tiles, accessible names/details, and the success-new-badge treatment.
- Preserve all frozen state roots, data math, routes, local-only truth, and 12px floor.

## Required sources

- `Balencia-New-Screens/hifi-screens/19-rpg-character.md`
- `Balencia-New-Screens/hifi-screens/71-achievement-gallery.md`
- `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
- `RPG_SYSTEM_DESIGN.md`
- D2 `BATCH.md` and `VERIFICATION-MATRIX.md`

## Verification and response

- Run targeted ESLint on only the two allowed files. Do not run/restart a server.
- Return exact changed-file hashes, verification result, and concise implementation evidence. Do not edit ledgers/evidence/verifier.

Worker result is recorded in `evidence/repair-design-final.md`.
