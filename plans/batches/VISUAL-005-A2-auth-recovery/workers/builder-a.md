# VISUAL-005 — Worker packet A2-A

- Packet status: `issued`
- Parent/ID: `VISUAL-005-A2-auth-recovery` / `A2-BUILDER-A`
- Worker: native Codex implementation subagent; requested Terra-class/high; exact runtime provenance unexposed
- Root: `balencia-screens/`
- Evidence output: `plans/batches/VISUAL-005-A2-auth-recovery/evidence/worker-builder-a.md`
- Verify: scoped lint/typecheck, `verify:copy`, `verify:brand`, scoped `git diff --check`

## Scope

Implement screens `05`, `05b`, `06` only against the A2 audit, current specs, DVF-01/07/09/10/11 and accepted live foundation. Use local visual state only; no API/auth/backend/provider behavior.

Allowed files:

- `balencia-screens/src/components/hifi/screens/auth/S05ForgotPassword.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S05bResetPassword.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S06GuestModePreview.tsx`
- evidence output above

Required proof:

- S05 native email form and stable `[data-recovery-state]`; deterministic query/hash fixtures for default/filled/loading/success/offline/error/cooldown; request vs confirmation never coexist; masked enumeration-safe local/no-send feedback; cooldown expires.
- S05b native password/confirm fields, 44px reveal toggles, deterministic rule/match state and stable `[data-reset-state]`; fixtures for default/filled/loading/missing/invalid/expired/rate-limit/offline/success; token never rendered; real links to sign-in/recovery/privacy.
- S06 native name input, nine native `aria-pressed` area buttons, 1–3 cap with visible/live fourth-selection rejection, honest-null/default and `Demo · illustrative` populated map, persistent full-width Explore and sign-in route; stable `[data-guest-state]` and deterministic evidence fixtures.
- Use official brand assets only, 16px input text, 44px effective targets, visible focus, current burnished-ember actions and reduced motion.

Denied: shared kit/tokens/globals/index/routes, S07/other screens, docs/ledger/handoff/verifiers, packages/assets, `yhealth-app`, backend/API/auth services, Figma/Railway, real email/token/session behavior, generated UI/logo.

Stop and report if shared repair or unlisted file is required. Worker output is evidence until Sol accepts it.

## Orchestrator checklist

- [ ] Ownership disjoint and packet complete.
- [ ] Only allowed files changed; denied surfaces untouched.
- [ ] All three state/security contracts satisfied.
- [ ] Scoped gates recorded in evidence.
- [ ] Sol accepts/repairs/rejects after integrated browser verification.
