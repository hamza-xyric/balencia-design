# Builder C evidence — S85 / S98

- Worker provenance: `/root/i1_recon_c` (Terra-class bounded writer; exact spawned worker provenance retained in the task mailbox).
- Files changed:
  - `balencia-screens/src/components/hifi/screens/system/S85ObstacleCoach.tsx`
  - `balencia-screens/src/components/hifi/screens/system/S98SystemStates.tsx`
- Scope respected: no other product files were edited by this worker.

## Implemented contract

- S85 implements all 18 frozen fixtures, exactly three default blockers, accept/dismiss/undo, evidence/data/dependency/plan/safety dialogs, qualified non-diagnostic copy, honest null/error/offline/disabled states, and shell-owned `bottomAction`.
- S98 implements all 14 frozen fixtures, preserves the action/orb/icon catalog, renders exactly one route card outside catalog, restricts shimmer to an unresolved cache panel, provides local retry transitions and complete local data controls, and states capability boundaries explicitly.
- Both screens expose one query-derived `data-i1-state` and mount `I1TextScaleScope` exactly once.
- All actions remain local previews; no network, provider, account, storage, external navigation, or safety-contact capability was added.

## Frozen states implemented

- S85 (18): `default`, `blocker-time-accepted`, `blocker-food-dismissed`, `blocker-recovery-dismissed`, `undo-restored`, `detail-time`, `detail-food`, `detail-recovery`, `data-controls`, `dependencies`, `plan-review`, `plan-success`, `plan-error`, `skeleton`, `empty`, `offline`, `disabled-consent`, `safety-support`.
- S98 (14): `catalog`, `offline`, `maintenance`, `forbidden`, `unauthorized`, `coming-soon`, `cache-skeleton`, `cache-empty`, `retrying`, `retry-success`, `disabled`, `support`, `data-controls`, `capability-matrix`.

## Worker verification

```text
./node_modules/.bin/eslint \
  src/components/hifi/screens/system/S85ObstacleCoach.tsx \
  src/components/hifi/screens/system/S98SystemStates.tsx
exit 0; stdout/stderr empty

git diff --check -- \
  balencia-screens/src/components/hifi/screens/system/S85ObstacleCoach.tsx \
  balencia-screens/src/components/hifi/screens/system/S98SystemStates.tsx
exit 0; clean
```

## Remaining Sol-owned verification

- Full static gate and fresh production build.
- Hardened I1 verifier, deterministic PNG proof, exact 125% text proof, focus restoration, and modal geometry.
- Query-opened dialogs resolve after the mount effect; runtime verification must wait for both the exact state marker and dialog.
- Click-initiated S98 retry advances after 700ms, while `?state=retrying` deliberately remains stable for capture.

The worker made no acceptance or readiness determination.
