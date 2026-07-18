# Accepted-through-F2 sentinel contract

- Inherited accepted set: the exact 71-file `integrity.start.accepted.files` array in `plans/batches/VISUAL-012-F2-health-care-media/evidence/f2-acceptance-final-v2.json`.
- F2 additions: the ten hashes in `ACCEPTED-F2-ADDITIONS-BEFORE.sha256`.
- Frozen G1 guard: 81 unique immutable product files. None of the nine G1 target files is included.
- Verification: G1's dedicated verifier must load both sources, reject duplicate paths, require exactly 81 files, and compare SHA-256 fingerprints at run start and end. Sol also runs `shasum -a 256 -c` for the ten additions and validates the inherited JSON fingerprints before acceptance.
