# VISUAL-008 D1 — Terra builder packet A (S17/S18)

- Packet status: `issued`
- Packet ID: `D1-BUILD-A`
- Parent batch: `VISUAL-008-D1-profile-settings-core`
- Worker profile/harness: native Codex Terra builder
- Routing/model/effort: `gpt56-tiered` / `gpt-5.6-terra` role intent (`W-MODEL`) / high
- Source hierarchy/tie-breaker: parent batch and frozen matrix
- Evidence destination: `evidence/builder-a.md` (Sol persists native-thread report)
- Stop condition: shared edit, source conflict, scope crossing, or two equivalent failures

Read `workers/builder-common.md`, `BATCH.md`, `VERIFICATION-MATRIX.md`, `evidence/recon-a.md`, current specs 17/18, and only the imports needed by the assigned files.

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S17MeMain.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S18Explore.tsx`

## S17 exact outcome

- Exact `data-me-state` fixtures and `data-me-panel` values from the matrix.
- Explicit `3 connected providers` versus `84 imported records`; exact eight local contextual data controls.
- Honest initials avatar; first action opens consent preview, never a picker/capability.
- Real routes: Search→68, Settings→21, avatar→50, Life Power→16, journal→73, Book of Life→20, services→22, photos→49, achievements→71.
- Deterministic skeleton/empty/error/offline/success/disabled surfaces; scoped cached/error truth; visible local status.

## S18 exact outcome

- Exact state/substate roots.
- One screen-local code-native five-domain radar and matching legend using the frozen 30/25/20/15/10 payload; accessible 100% summary, partial/ghost and honest-null states.
- Native labelled search, conditional 44px Clear, result-count live region, results/no-results/error/offline truth.
- Every suggestion has its own source/freshness/confidence provenance and real local/same-origin outcome.
- Exactly two unchanged canonical `PaywallLock` uses with inert real previews and S43 actions carrying distinct trigger context.
- Exact eight local contextual data controls; no active-effort glow on 0/null items.

## Verify

Run `npx eslint src/components/hifi/screens/profile/S17MeMain.tsx src/components/hifi/screens/profile/S18Explore.tsx`. Do not run or restart a server. Return evidence only after the command passes or report the exact blocker.
