# Accepted-through-G1 sentinel contract

- Inherited accepted set: the exact 81-file accepted union loaded and verified by `plans/batches/VISUAL-013-G1-domains-finance-growth/evidence/g1-acceptance-final-v7.json`.
- G1 additions: the nine hashes in `ACCEPTED-G1-ADDITIONS-BEFORE.sha256`.
- Frozen H1 guard: 90 unique immutable product files. None of the ten H1 targets is included.
- Verification: H1's dedicated verifier must reject duplicates or any union count other than 90 and compare every fingerprint at run start and end. Sol also validates inherited fingerprints and runs `shasum -a 256 -c` for the nine additions.
