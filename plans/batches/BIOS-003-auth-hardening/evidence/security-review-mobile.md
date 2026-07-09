# BIOS-003-auth-hardening · Packet MP10 — Mobile token security review (ADR-11) · 2026-07-09

**Provenance note:** GLM's two MP10 draft attempts were rejected (fabricated citations against
non-existent files — see `evidence/glm-drafts/MP10.md` and the batch packet-lessons log). This
report was produced by the orchestrator (Fable) from the MP10 packet composer's evidence
(verified grep output + embedded live source, `packets/MP10.md`) and independently re-verified
this session (grep re-run + direct reads of `session.ts`, `registration-flow.tsx`, `device.ts`,
`forgot-normalize.ts`, `client.ts`, both reset screens).

## Method

Review scope: `yhealth-app/mobile/src`, excluding `*.test.ts`. Verification greps (re-run
2026-07-09 by the orchestrator, both returned zero matches outside tests):

```
rg -n "console\.|logger\." yhealth-app/mobile/src --glob '!*.test.ts'
rg -n "activationToken|refreshToken|accessToken|idToken|otp|password" yhealth-app/mobile/src/app yhealth-app/mobile/src/features --glob '!*.test.ts'
rg -rn "AsyncStorage" yhealth-app/mobile/src
```

Plus direct reads of every file cited below.

## Verdict table

| # | Item | Status | Evidence (file:line) | Notes |
|---|------|--------|----------------------|-------|
| 1 | SecureStore-only for tokens; `activationToken`/OTP/reset-code never persisted | pass | `src/services/auth/session.ts:52` (only `SecureStore.setItemAsync(SESSION_KEY, …)` writes tokens); `src/features/auth/registration-flow.tsx:14-31` (`activationToken` lives only in `useReducer` state, no storage import); `verify-screen.tsx` / `reset-password-screen.tsx` hold `otp` in plain `useState`; zero `AsyncStorage` references in `src/` | Unit-proven: `registration-flow.test.ts` (RESET drops token), `device.test.ts` (only the non-secret device id is persisted, key `balencia.device.id`) |
| 2 | No token/OTP/password values in logs; `Authorization` never logged | pass | Grep: zero `console.*`/`logger.*` calls anywhere in `src/` outside tests (re-verified this session); `src/services/api/client.ts` never passes headers to any logging facility (none exists) | The one dev-time log surface is Expo CLI's own env-name echo from `mobile/.env` (names only, never values) — waiver W1, owner Hamza |
| 3 | Transport: `Env.apiUrl` the only base; http for local dev only | pass | `src/services/api/client.ts:13` (`API_BASE_URL = Env.apiUrl`, no other base); `src/config/env.ts` validates the URL at boot; `eas.json` simulator/preview/production profiles pin `EXPO_PUBLIC_API_URL` to `https://…railway.app/api` | http is used only via local-dev override `EXPO_PUBLIC_API_URL=http://127.0.0.1:9090/api` (documented, standing decision 4) |
| 4 | PII: email masked in UI; no raw email beyond prefill param; deep links never carry tokens | pass | `maskEmail`/`MaskedDestinationLine` (`src/components/balencia/auth-inputs.tsx:463-497`); forgot/reset/verify screens render the address only through `MaskedDestinationLine`; `reset-password` route param schema is `{ email?: string }` only — no token/otp/code field exists, so a deep link structurally cannot carry one; `src/services/auth/device.ts:20-26` (`getDeviceName()` uses hardware `modelName`, never the user-assigned `Device.deviceName` nickname) | Unit-proven: `mask-email.test.ts` (incl. no-@ guard never echoes raw value), `device.test.ts` (PII-avoidance assertion) |
| 5 | Rate-limit honesty: real server retry-after or vague copy, never a fabricated countdown | pass | `src/features/auth/forgot-normalize.ts` (`extractRetryAfterSeconds` returns `null` when the server reported nothing); `forgot-password-screen.tsx` + `reset-password-screen.tsx` render "Try again in a few minutes." for the `null` case and a live `ChargeMeter` only when a real deadline exists | Unit-proven: `forgot-normalize.test.ts` (429 with/without details; never fabricates) |

## Closing verdict

**5/5 pass, 0 fixed, 0 fail.**
