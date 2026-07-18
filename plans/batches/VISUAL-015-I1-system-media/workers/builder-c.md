# I1 builder C — S85/S98

- Batch/gate: `VISUAL-015-I1-system-media`, READY WITH WAIVERS for bounded implementation.
- Worker: native Codex, Terra-style builder, intended high effort; exact spawned model provenance may remain W-MODEL.
- Allowed files only: `balencia-screens/src/components/hifi/screens/system/S85ObstacleCoach.tsx`, `balencia-screens/src/components/hifi/screens/system/S98SystemStates.tsx`.
- Sources: batch/FROZEN/VERIFICATION matrices, `evidence/recon-c.md`, active S85/S98 specs, I1 audit, canon/catalog, existing kit APIs including `E1Modal` (read-only).
- S85: implement all 18 states, exactly three blockers, evidence-qualified non-diagnostic copy, local accept/dismiss/undo, details/data/dependencies/safety/plan-review dialogs, honest error/offline/null/disabled states, and shell-owned `bottomAction`. No real calendar/provider/plan/safety contact action.
- S98: implement all 14 states; catalog examples may coexist only in `catalog`, while every route fixture renders exactly one `data-route-card`; immediate route copy never skeletonizes; only cache/status probes shimmer; success/disabled/retrying states are distinct; cached data has complete controls; maintenance/access/coming-soon copy is plain and factual; capability matrix disclaims product-wide support.
- Every editable screen exposes exactly one query-derived `data-i1-state`; controls >=44px, fields >=16px, brand focus, modal entry/trap/Escape/restore, and reduced motion.
- Denied: every other file, shared kit/globals/registry/routes/assets, S80, accepted sentinels, real capabilities/external navigation, backend/API/auth, Figma/Railway, git mutation, `yhealth-app`.
- Verification: run local ESLint on the two files; return files changed, raw result, state list, unresolved risks, and any stop-condition escalation. Full build/check/verifier remain Sol-owned.
- Evidence output: return report for `evidence/builder-c.md`; output is evidence until Sol review.
- Stop: diagnostic/safety/source conflict, need for a shared edit, or two equivalent failures.
