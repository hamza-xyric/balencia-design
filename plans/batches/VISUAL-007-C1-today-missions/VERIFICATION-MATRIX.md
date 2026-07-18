# VISUAL-007-C1 — verification matrix (frozen before implementation)

- Frozen: 2026-07-11, after 4-worker reconciliation (evidence/worker-recon-{a,b,c,d}.md)
- Verifier: `balencia-screens/scripts/verify-c1-today.mjs` (hardened B1 pattern)
- Strict: `node scripts/verify-visual-104.mjs --strict --only 12,13,14,15,41,44,45,59,61,73,97 --screenshots` → 11/11 zero issues/warnings

## State contracts (query fixture `?state=` → `data-*-state` on `<main>`, aria-busy on skeleton)

| Screen | Root attribute | Exact states |
|---|---|---|
| 12 (sentinel) | existing `data-domain-count` on radar (NO new attrs; screen unchanged) | default only |
| 13 | `data-mission-board-state` | default, skeleton, empty, filtered-empty, error, offline, success |
| 14 | `data-mission-detail-state` | default, empty, low-confidence, offline, stalled, success |
| 15 | `data-mission-editor-state` | default, empty, processing, error, offline, success, invalid |
| 41 | `data-schedule-state` | default, overpacked, cold-start, stale-offline, revoked, skeleton |
| 44 | `data-water-state` | default, skeleton, empty, error, offline, success |
| 45 | `data-checkin-state` | default, skeleton, empty, error, offline, success, invalid |
| 59 | `data-streak-state` | default, skeleton, empty, error, offline, success |
| 61 | `data-reminders-state` | default, skeleton, empty, error, offline, success |
| 73 | `data-journal-state` | default, skeleton, empty, filtered-empty, error, offline |
| 97 | `data-plans-state` | default, skeleton, empty, error, offline, success |

## Exact screenshot manifest (89 PNGs, evidence/states/)

- 12: `12-default.png`, `12-action-toggled.png` (2)
- 13: `13-default.png`, `13-skeleton.png`, `13-empty.png`, `13-filtered-empty.png`, `13-error.png`, `13-offline.png`, `13-success.png`, `13-filter-weekly.png`, `13-new-mission.png` (9)
- 14: `14-default.png`, `14-empty.png`, `14-low-confidence.png`, `14-offline.png`, `14-stalled.png`, `14-success.png`, `14-accordion-open.png` (7)
- 15: `15-default.png`, `15-empty.png`, `15-processing.png`, `15-error.png`, `15-offline.png`, `15-success.png`, `15-invalid.png`, `15-domain-removed.png`, `15-reorder-moved.png` (9)
- 41: `41-default.png`, `41-overpacked.png`, `41-cold-start.png`, `41-stale-offline.png`, `41-revoked.png`, `41-skeleton.png`, `41-day-selected.png`, `41-enlarged-default.png` (8)
- 44: `44-default.png`, `44-skeleton.png`, `44-empty.png`, `44-error.png`, `44-offline.png`, `44-success.png`, `44-delete-confirm.png`, `44-delete-undone.png`, `44-quick-add.png` (9)
- 45: `45-default.png`, `45-skeleton.png`, `45-empty.png`, `45-error.png`, `45-offline.png`, `45-success.png`, `45-invalid.png`, `45-context-added.png`, `45-dismissed.png` (9)
- 59: `59-default.png`, `59-skeleton.png`, `59-empty.png`, `59-error.png`, `59-offline.png`, `59-freeze-confirm.png`, `59-freeze-used.png`, `59-freeze-undone.png`, `59-success.png` (9)
- 61: `61-default.png`, `61-skeleton.png`, `61-empty.png`, `61-error.png`, `61-offline.png`, `61-success.png`, `61-task-toggled.png`, `61-task-undone.png`, `61-reminder-toggled.png` (9)
- 73: `73-default.png`, `73-skeleton.png`, `73-empty.png`, `73-filtered-empty.png`, `73-error.png`, `73-offline.png`, `73-media-hidden.png`, `73-photo-delete-confirm.png` (8)
- 97: `97-default.png`, `97-skeleton.png`, `97-empty.png`, `97-error.png`, `97-offline.png`, `97-success.png`, `97-plan-actions.png`, `97-archive-confirm.png`, `97-enlarged-default.png` (9)

Total: 2+9+7+9+8+9+9+9+9+8+9 = **88** canonical PNGs + `15-enlarged-bottom.png` 125% sentinel = **89**.

## Hard assertions (verifier-enforced)

1. **S59 RPG truth:** default state renders `2.0x` current multiplier at 42-day streak; copy contains recovery `1.3×` tied to deliberate rest; NO "unlocks at 50 days"; cap language consistent with 2.0× total.
2. **Ten-domain truth:** S12 + S13 radar `data-domain-count="10"`; no non-registry domain label (`Health`, `Fit`, `Learning`, `Daily`-as-domain) on 13/14/41/61.
3. **S41 populations:** the two time figures are either reconciled or each labelled with its population; timeline/current event present in first 844px.
4. **S44 delete:** visible ≥44px delete affordance without hover; delete → exact-target confirmation → undo restores row.
5. **S45:** exactly one CIA orb; ConsentRail present; Save disabled in `invalid` state with visible reason.
6. **S61:** completed task text ≥4.5:1 (no stacked opacity); native checkbox/switch semantics; roll-up count equals rendered list disclosure.
7. **S73:** no aria-label claiming a photo where none renders; duration copy self-consistent.
8. **S97:** canonical PaywallLock; all 8 controls reachable; plan rows operable.
9. **Family-wide:** ≥44×44 interactive targets; ≥16px editable fields; no semantic text <12px on mutable C1 screens; one primary action per screen; states mutually exclusive; zero console/page errors; zero forbidden capability events (no network mutations, clipboard, media, external nav beyond same-origin routes); reduced-motion default; focus trap + restoration on modal surfaces; equal geometry on destructive/cancel pairs.
10. **Sentinels:** S12 file byte-unchanged vs pre-batch record (unless a shared regression repair is separately adjudicated); accepted A1/A2/B1 files untouched.

### Adjudicated S12 type-floor exception

S12 is the accepted pilot sentinel and is byte-locked at SHA-256 `107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67`. Its accepted source contains one 11px radar micro-label. The hardened verifier therefore applies an explicit 11px semantic floor to S12 only and the frozen 12px floor to every mutable C1 screen (`13,14,15,41,44,45,59,61,73,97`). This is a source-preservation adjudication, not a silent family-wide weakening: S12 must also pass the 125% text-only enlargement proof and exact byte check, and no mutable screen inherits the exception.

## Fingerprints (recorded at verifier run)

- PRODUCT_FILES: 11 C1 screen files + `today/index.ts`
- API_FILES: globals.css, kit files, registry, screens.ts, verifier self
- AUTHORITY_FILES: C1 audit, DECISIONS, REFERENCE-DIRECTION, canon, 11 specs, BATCH, this matrix, 4 builder packets

## Reviews required before close

1. code/correctness (non-builder) · 2. design/source (non-builder) · 3. accessibility/trust (non-builder) · 4. Fable rendered inspection
