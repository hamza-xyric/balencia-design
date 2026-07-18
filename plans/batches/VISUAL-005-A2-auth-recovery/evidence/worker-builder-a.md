# VISUAL-005 A2 — Builder A implementation evidence

- Packet: `A2-BUILDER-A`
- Worker role: bounded implementation worker; requested Terra-class/high, exact runtime provenance unexposed
- Result: implementation and worker-scoped verification complete
- Acceptance: not claimed; Sol/root and independent reviewers remain the acceptors
- Scope discipline: only screens `05`, `05b`, `06` and this evidence file were edited

## Source and constraints applied

Read and applied the A2 batch/worker packet, full A2 audit, current specs `05`, `05b`, `06`, current compact canon/catalog, DVF decisions/reference direction, and nearest `balencia-screens/AGENTS.md` guidance. DVF-01 warm-dark, DVF-07 all-caps `CIA`, DVF-09 accepted actions, official-logo-only, and visual-prototype security boundaries are preserved.

No shared kit, token, global, route, package, asset, verifier, S07, production app, backend, provider, or real authentication surface was changed. Generated imagery was not used; these screens require native UI state and the official Balencia logo rather than a new asset.

## Implemented files

- `balencia-screens/src/components/hifi/screens/auth/S05ForgotPassword.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S05bResetPassword.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S06GuestModePreview.tsx`

## S05 — recovery request

- Added native `type="email"`, `inputMode="email"`, `autoComplete="email"`, required metadata, persistent visible label, and 16px kit input text.
- Added stable root `[data-recovery-state]` and query/hash fixtures for `default`, `filled`, `loading`, `success`, `offline`, `error`, and `cooldown`.
- Request and confirmation are mutually exclusive branches; successful submission transitions `loading → success` and removes the request form.
- Confirmation renders only a masked destination such as `a***@example.com` with enumeration-safe “If that email matches an account” language.
- Every result explicitly states that no account lookup or email was sent.
- `cooldown` starts at two seconds for deterministic expiry proof, decrements visually, then transitions to `success`. The polite live region changes only at cooldown start and expiry; the per-second counter is not live.
- `Send again` starts a local 59-second visual cooldown. `Back to sign in` is a real `/screens/04` link.

Fixture examples:

- `/screens/05?state=filled`
- `/screens/05#offline`
- `/screens/05?state=cooldown`

## S05b — reset password

- Added stable root `[data-reset-state]` and query/hash fixtures for `default`, `filled`, `loading`, `missing`, `invalid`, `expired`, `rate-limit`, `offline`, and `success`.
- Added two native password inputs with `autoComplete="new-password"`, required/min-length metadata, visible labels, and 16px kit input text.
- Added independent native 44px reveal buttons with accessible Show/Hide names, `aria-pressed`, and `aria-controls`; toggling retains the local value.
- Five deterministic local rules and exact password equality drive visible `Met`/`Needed`, match status, rule count, and CTA enablement without color-only meaning.
- Default is honest-empty and disabled; filled is valid; loading locks fields and action; rate-limit locks fields/action without inventing retry-after; offline leaves fields editable while submit stays disabled.
- Missing, invalid, and expired states are terminal visual states with real recovery and sign-in links. Success removes the password fields and provides a real sign-in link.
- Real links are present for sign-in (`/screens/04`), recovery (`/screens/05`), and privacy (`/legal/privacy`).
- No reset-link secret is present in source or rendered output. Status copy explicitly labels server/link conditions as visual fixtures, and no password or network request is sent.

Fixture examples:

- `/screens/05b?state=filled`
- `/screens/05b#expired`
- `/screens/05b?state=rate-limit`

## S06 — guest preview

- Added stable root `[data-guest-state]` and query/hash fixtures for `default`, `name-only`, `populated`, `cap-error`, `loading`, `error`, and `success`.
- Added a native named input with `autoComplete="given-name"`, persistent visible label, required metadata, and 16px kit input text.
- Replaced all nine inert selectors with native 58px buttons carrying exact accessible domain names and `aria-pressed` state.
- Selection enforces 1–3 areas. Attempting a fourth preserves the existing three and shows the live, visible message above the grid: “Pick up to 3 areas. Your three selections are unchanged.”
- Default is an honest null: only a quiet center point and “Nothing to map yet”; no polygon, nodes, score, or measured claim.
- Populated state derives its small illustrative mesh only from selected areas and persistently labels it `Demo · illustrative`.
- The full-width shared `Explore as guest` action and real `Sign in instead` route remain in the shell’s persistent bottom action. Local submit transitions `loading → success` and explicitly states that no guest account or session was created.
- The map is labeled as an illustrative `CIA` constellation, never `SIA`, Life Power, or measured data.

Fixture examples:

- `/screens/06?state=default`
- `/screens/06#populated`
- `/screens/06?state=cap-error`

## Worker-scoped gates

All required worker gates passed after the final edits:

```text
npm run lint -- src/components/hifi/screens/auth/S05ForgotPassword.tsx src/components/hifi/screens/auth/S05bResetPassword.tsx src/components/hifi/screens/auth/S06GuestModePreview.tsx
PASS

npm run typecheck
PASS

npm run verify:copy
PASS — 384 files scanned

npm run verify:brand
PASS — 384 files scanned

git diff --check -- <three owned screen files>
PASS
```

Static guard scan found no `SIA`, `Life Power`, network/storage call, session creation, or rendered reset-link secret in the three files.

## Browser interaction proof

Real-browser QA ran against local port `3001` and the fixed 390×844 phone frame:

- S05 `filled`: native email exposed as `Email address`; `Send reset link` transitioned to confirmation; the input disappeared; destination exposed only as `a***@example.com`.
- S05 cooldown fixture: deterministic local state loaded and expired to success without console errors.
- S05b `filled`: both password fields and both reveal buttons were exposed by accessible name; Show changed to pressed `Hide new password` without losing the local value; `Reset password` transitioned to a terminal success with no fields.
- S05b hash fixture `#expired`: exposed `Request a new link`, `Back to sign in`, and `Privacy` as real links; no password inputs were present.
- S06 default: native name field, nine named native area buttons, disabled `Explore as guest`, and persistent sign-in route were exposed.
- S06 interaction: after entering `Amira`, Fitness, Nutrition, and Mental wellbeing became pressed; attempting Finance left those same three pressed, left Finance unpressed, kept `3 / 3`, and exposed the exact live cap message.
- S06 cap-error visual review confirmed the compact map, `Demo · illustrative`, cap message, first selector row, persistent Explore action, and sign-in route remain discoverable together.
- Final browser console: `0` errors and `0` warnings.

The full integrated `npm run check`, build, seven-route strict capture, isolated A2 verifier, and acceptance decision are intentionally left to Sol/root per the batch contract.
