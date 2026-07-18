# VISUAL-008 D1 — Terra builder packet B (S21/S22)

- Packet status: `issued`
- Packet ID: `D1-BUILD-B`
- Parent batch: `VISUAL-008-D1-profile-settings-core`
- Worker profile/harness: native Codex Terra builder
- Routing/model/effort: `gpt56-tiered` / `gpt-5.6-terra` role intent (`W-MODEL`) / high
- Source hierarchy/tie-breaker: parent batch and frozen matrix
- Evidence destination: `evidence/builder-b.md` (Sol persists native-thread report)
- Stop condition: shared edit, source conflict, scope crossing, or two equivalent failures

Read `workers/builder-common.md`, `BATCH.md`, `VERIFICATION-MATRIX.md`, `evidence/recon-a.md`, `evidence/recon-b.md`, current specs 21/22, and only imports needed by the assigned files.

## Allowed edits

- `balencia-screens/src/components/hifi/screens/profile/S21Settings.tsx`
- `balencia-screens/src/components/hifi/screens/profile/S22ConnectedServices.tsx`

## S21 exact outcome

- Exact state/hardware/panel roots and one H1.
- Native labelled Notifications, Background sync, and Face ID switches with 44px rows. Supported default is explicit; `?hardware=unsupported` omits Face ID and states the deterministic prototype disposition.
- Section-local saving/error-revert/offline/success truth; preference provenance/null states.
- Real routes for profile/password/billing/services/language/units/sign-out or honest local sheets/status.
- Exact eight reversible local data controls.
- Preserve the operable safety route and exact no-calls/no-texts capability language.

## S22 exact outcome

- Exact 11-provider frozen roster and group totals 6+3+1+1; use a typed data array and `data-integration-provider`.
- Atomic provider status: WHOOP fresh-connected; Fitbit pending with retry truth; Garmin disabled with true reason; other defaults unconnected. State fixtures alter this deterministically.
- Exact eight per-provider controls; connect scope preview and disconnect confirmation with equal exits; local-only outcomes.
- Every action >=44px; native disabled semantics and reason; no internal route/path copy.
- Static reduced-motion progress; no indefinite spinner. Remove inert global Save and use immediate local-preview status.
- No paywall on free connection management.

## Verify

Run `npx eslint src/components/hifi/screens/profile/S21Settings.tsx src/components/hifi/screens/profile/S22ConnectedServices.tsx`. Do not run or restart a server. Return evidence only after the command passes or report the exact blocker.
