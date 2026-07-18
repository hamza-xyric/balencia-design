# Accepted-through-H1 sentinel guard

- Inherited source: `plans/batches/VISUAL-014-H1-social-community/evidence/h1-acceptance-final-v4.json` → `integrity.start.accepted.files` (`90` files).
- H1 additions: `ACCEPTED-H1-ADDITIONS-BEFORE.sha256` (`10` files), frozen from the exact accepted H1 product hashes in the same report.
- Canonical union: `100` unique repo-relative files in inherited-90 order followed by the ten H1 additions. Accepted pilot screen S80 is intentionally included and therefore verify-only; the other five I1 product targets are excluded.
- Canonical verifier fingerprint SHA-256 (rows joined with `\n`, no trailing newline): `8616b67d6b2977d8c141838f41e4cb9bd7ee680faf346ec6c9bac84e5415ab05`.
- Required gate: all 100 files must exist and match at verifier start and end; the ten H1 additions also pass standalone `shasum -a 256 -c` from the repo root.
