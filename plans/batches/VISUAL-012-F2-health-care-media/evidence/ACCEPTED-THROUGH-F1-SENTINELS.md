# Accepted-through-F1 sentinel contract

The immutable accepted set for F2 is the union of:

1. the 61 unique paths in `plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256`; and
2. the 10 unique F1 product paths in `ACCEPTED-F1-ADDITIONS-BEFORE.sha256`.

Total: **71 unique files**. F2 verification must parse, hash, and compare both manifests at start and end; overlap or drift is a hard failure.
