# I1 builder A — S67/S69

- Batch/gate: `VISUAL-015-I1-system-media`, READY WITH WAIVERS for bounded implementation.
- Worker: native Codex, Terra-style builder, intended high effort; exact spawned model provenance may remain W-MODEL.
- Allowed files only: `balencia-screens/src/components/hifi/screens/system/S67ImageViewer.tsx`, `balencia-screens/src/components/hifi/screens/system/S69AppRating.tsx`.
- Sources: batch/FROZEN/VERIFICATION matrices, `evidence/recon-a.md`, active S67/S69 specs, I1 audit, canon/catalog, existing kit APIs including `E1Modal` (read-only).
- Implement all 15 S67 and 13 S69 frozen states with a single query-derived `data-i1-state` marker per screen and local reversible transitions. Use `HifiShell.bottomAction` or equivalent shell-safe flow for S67 pagination/actions; native 44px ComparisonSlider plus labeled alternatives; source/position/privacy announcement; separate load/decrypt/offline/null states; explicit code-native HIFI-67 disposition. S69 starts neutral, uses semantic pressed star choices, never sentiment-gates, gives public/private choices and both dismissals equal reach, and keeps every outcome local/blocked/honest.
- Modal dialogs must enter/trap/Escape/restore focus through existing accepted primitives; controls >=44px, text fields >=16px, focus uses brand tokens, reduced motion is explicit.
- Denied: every other file, shared kit/globals/registry/routes/assets, S80, accepted sentinels, real capabilities/external navigation, backend/API/auth, Figma/Railway, git mutation, `yhealth-app`.
- Verification: run local ESLint on the two files; return files changed, raw result, state list, unresolved risks, and any stop-condition escalation. Full build/check/verifier remain Sol-owned.
- Evidence output: return report for `evidence/builder-a.md`; output is evidence until Sol review.
- Stop: source/trust conflict beyond the recorded S69 resolution, need for a shared edit, or two equivalent failures.
