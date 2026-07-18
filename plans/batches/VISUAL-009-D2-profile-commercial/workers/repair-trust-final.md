# VISUAL-009 D2 — Terra repair packet: consent, safety, and confidence

- Packet status: completed; Sol verification pending.
- Packet ID: D2-REPAIR-TRUST-FINAL.
- Role intent: Terra implementation, high effort; output remains evidence until Sol verifies it.
- Stop condition: source drift from the hashes below, shared-kit/S43 edit, scope crossing, or two equivalent failures.

## Exact candidate

```text
a5a88d3d2376849acc77f1688c6b6f1689bd95697b4b08963dfa2f98b15f256c  S83BuddyProfile.tsx
1c24e7019b7aaf8e9cc376fe4843d4ceb838c5712d158feb3e2caa2c2fa389cf  S92Reputation.tsx
```

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S83BuddyProfile.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S92Reputation.tsx`

## Required outcomes

- S83 `consent-missing` visibility sheet truthfully shows Fitness and Learning unchecked/not shared. Distinguish effective mutual consent from any local preference without inventing persistence.
- S83 and S92 destructive confirmation buttons name the exact pending action; retain explicit local-only/no-mutation copy.
- Remove S83's unproven green online-presence dot.
- Remove duplicate screen-reader headings; use the visible `SectionTitle` heading as the sole `aria-labelledby` target.
- S92 premium outcome moves focus from the unmounted Continue control to stable `Close preview` inside the still-open dialog.
- S92 low-confidence Engagement metric uses a screen-local muted/dashed, non-color-only confidence treatment rather than the shared orange bar; do not edit shared kit.
- Preserve frozen roots, consent boundaries, due process, focus restoration, local-only truth, and 12px floor.

## Required sources

- `Balencia-New-Screens/hifi-screens/{83-social-buddy-profile,92-reputation}.md`
- `Balencia-New-Screens/canon/{COMPACT-CANON,COMPONENT-CATALOG}.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- D2 `BATCH.md` and `VERIFICATION-MATRIX.md`

## Verification and response

- Run targeted ESLint on only the two allowed files. Do not run/restart a server.
- Return exact changed-file hashes, verification result, and concise implementation evidence. Do not edit ledgers/evidence/verifier.

Worker result is recorded in `evidence/repair-trust-final.md`.
