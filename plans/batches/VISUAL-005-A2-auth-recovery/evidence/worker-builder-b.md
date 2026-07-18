# VISUAL-005 A2 Builder B evidence

- Worker task: `/root/a1_visual_source_review`, reassigned as A2 Builder B
- Requested routing: Terra-class/high implementation worker
- Exact runtime model and effort: not exposed by the agent surface
- Status: implementation evidence complete; output remains evidence until Sol/root verifies and accepts it
- Scope: screens 08, 65 and 66 only

## Sources read

- Root `AGENTS.md` and `balencia-screens/AGENTS.md`
- `plans/batches/VISUAL-005-A2-auth-recovery/BATCH.md`
- `plans/batches/VISUAL-005-A2-auth-recovery/workers/builder-b.md`
- Full A2 audit: `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/A2-auth-recovery-onboarding.md`
- Current hi-fi specs: `08-initial-plan-summary.md`, `65-force-update.md`, `66-notification-permission.md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`
- `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
- Current DVF decisions through DVF-11 and `VISUAL-001/REFERENCE-DIRECTION.md`
- Read-only live APIs in the hi-fi kit, shell and accepted A1 fixture patterns
- `frontend-design` skill guidance; it reinforced the warm-dark hierarchy, native controls and restrained screen-local composition

## Files changed

- `balencia-screens/src/components/hifi/screens/auth/S08InitialPlanSummary.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S65ForceUpdate.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S66NotificationPermission.tsx`
- This evidence file

No shared kit, token, global CSS, route/index, S07, package, asset, verifier, ledger/handoff, backend, OS/store/provider service, generated UI/logo or `yhealth-app` file was changed. Image generation was not used because all three current specs declare no image slot and the packet forbids generated UI/logo assets.

## Acceptance mapping

### S08 initial plan summary

- Stable root: `[data-plan-state]`.
- Fixtures: `/screens/08?state=default|minimal|editing|error|offline|success`.
- One `PLAN_PAYLOAD` owns the day-one label, Life Power display/provenance, three-area readiness, exact current milestone index, visible Week/date pair, mission and all accessible summaries.
- Radar uses exactly the ten DVF-06 domains in canon order: Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing and Meditation. Seven unassessed axes remain ghosted/null rather than zero; the root exposes `data-domain-count="10"`.
- Day one resolves to milestone index 0. Visible copy retains `Week 1 · July 10` plus `Current`; the programmatic sentence is `Plan timeline. Day one. Milestone 1 of 5, Week 1, July 10, current.`.
- Native back, Customize, edit, text-input, save, cancel, retry and Enter Today controls are locally operable with 44px+ targets and accepted focus treatment.
- Customize/edit transitions to `editing`; save/cancel returns to `default`. Enter Today transitions to `success` with explicit no-backend feedback. Offline Enter remains `offline` and reports a local queue. Error retry restores `default`.

### S65 force update

- Stable root: `[data-update-state]`.
- Fixtures: `/screens/65?state=default|loading|error|offline|empty|returned`.
- Uses the official immutable `Frame 2147239943.svg` wordmark and official `Logo Mark.svg` only.
- Release notes are labeled `Exact · release-note fixture`; version metadata is labeled `Exact · bundled build fixture`.
- One full-width burnished-ember native action renders as `Update now`, width-locked loading `Checking store availability`, or retryable `Try again`.
- Empty collapses release notes; loading uses matching local skeleton geometry; offline remains retryable; returned explicitly says the prototype cannot confirm an installed update.
- Every attempt is local: it moves to loading, then error, and explicitly reports that the web prototype cannot open an app store, launched no external app and verified no update. There is no success fixture or fake store hand-off.

### S66 notification permission

- Stable root: `[data-notification-state]`.
- Fixtures: `/screens/66?state=default|loading|authorized-preview|denied|error|offline|re-entry`.
- Default uses a native full-width `Enable notifications`; `Not now` is a native full-width, equal-reach 44px+ action and remains available during loading and exceptional states.
- Benefits are neutral: optional CIA coaching, chosen reminders, and Squad/Community updates only from groups explicitly opted into. Copy explicitly says optional, changeable later and revocable in system settings.
- The bell composition is decorative and excluded with `aria-hidden="true"`; benefit glyphs are 24px and text-labelled.
- Status labels identify every value as a local fixture not read from the OS. Default/error Enable or retry moves to loading and then `authorized-preview`, whose visible/live copy says no OS prompt was shown and permission was not granted.
- Denied and re-entry are outcome previews only. Settings/manage actions report unavailable local feedback and never open or change OS settings. Offline accurately distinguishes the local device permission from later network token sync.

## Scoped verification

All commands ran from `balencia-screens/` unless noted.

| Command | Result |
|---|---|
| `npx eslint src/components/hifi/screens/auth/S08InitialPlanSummary.tsx src/components/hifi/screens/auth/S65ForceUpdate.tsx src/components/hifi/screens/auth/S66NotificationPermission.tsx` | pass, no output |
| `npm run typecheck` | pass |
| `npm run verify:copy` | pass, 384 files scanned |
| `npm run verify:brand` | pass, 384 files scanned |
| `curl` smoke for `/screens/08?state=default`, `/screens/65?state=default`, `/screens/66?state=default` on the existing port-3001 server | 200 / 200 / 200 |
| Scoped `git diff --check` over the three tracked owned modules | pass, no output |
| Trailing-whitespace scan of this new untracked evidence file | pass, no output |

## Evidence still owned by Sol/root

- Integrated strict seven-route capture and dedicated A2 state verifier
- Default and fixture PNGs, keyboard/focus checks and reduced-motion captures
- Independent code, design/source and accessibility/trust review
- Full `npm run check`, build, root validator, root/submodule diff isolation and final accept/reject decision
- Device screen-reader/enlarged-text evidence and exact runtime/model provenance remain the batch-level evidence limitations already recorded by the orchestrator

## Blockers and disposition

- No shared repair was required.
- No implementation blocker remains in this worker scope.
- This is not an acceptance decision. Sol/root must verify integrated behavior and screenshots before accepting A2.
