# A1-BUILDER-B worker evidence

- Parent batch: `VISUAL-004-A1-auth-entry`
- Packet: `plans/batches/VISUAL-004-A1-auth-entry/workers/builder-b.md`
- Worker/harness: native Codex implementation subagent
- Requested routing: `gpt-5.6-terra`, high effort; exact runtime model is not exposed to this worker
- Result posture: bounded implementation evidence for Sol review, not a readiness decision
- Date: 2026-07-10 PKT

## Sources read

- `balencia-screens/AGENTS.md`
- `runbooks/worker-task-packets.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/A1-auth-entry.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/DECISIONS.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- `Balencia-New-Screens/hifi-screens/03d-complete-profile.md`
- `Balencia-New-Screens/hifi-screens/03e-whatsapp-enrollment.md`
- `Balencia-New-Screens/hifi-screens/04-sign-in.md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`
- `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
- Accepted live sentinel/API references: `S03WelcomeSignUp.tsx`, `kit/buttons.tsx`, `kit/glass-pill-input.tsx`, `kit/chips.tsx`, `kit/chrome.tsx`, `kit/cia.tsx`, `kit/surfaces.tsx`, `kit/system.tsx`, `kit/HifiShell.tsx`, and `kit/index.ts`
- Relevant installed Next 16 docs: client boundaries, forms, and linking/navigation under `node_modules/next/dist/docs/01-app/`
- Workflow skills: Forgeflow worker-task-packet, frontend-design, and Playwright. The lane-named `$balencia-visual-prototype` skill was absent from the session catalog; current canon/spec/live APIs were used as the scoped fallback.

## Files changed

- `balencia-screens/src/components/hifi/screens/auth/S03dCompleteProfile.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S03eWhatsappEnrollment.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S04SignIn.tsx`
- This evidence file

No shared kit, token, registry, route, package, spec, canon, ledger, handoff, backend, Figma, production, or other screen file was edited by this worker.

## Acceptance mapping

### S03d — Complete profile

- Converted the profile surface to a local client form with native editable first/last-name inputs, native date input, and native gender select.
- Kept honest null (`Not selected`) distinct from the explicit `Prefer not to say` gender choice. Readiness is derived only from actual DOB/gender selections and begins at `0 of 2`.
- Kept the OAuth first name editable; its provenance begins `From Google` and changes to `You entered` on edit. Blank optional last name exposes no fabricated provenance; nonblank last name exposes `You entered`.
- Removed the checkbox-shaped fake required-consent signal. The replacement is an informational privacy/control surface that explicitly says this is not a required-consent step.
- Exposed every shared full data-control dimension as an operable link: Category, Source, Scope, Freshness, Confidence, Retention, Export, Revoke, and Delete.
- Put `Save details` and the equally operable `Skip for now` link in the persistent bottom action so both remain visible at the canonical mobile frame. Submit returns local-only status and sends no data.

### S03e — Optional message channel

- Reframed the surface as provider-neutral (`Get CIA in messages`) with generic chat iconography and no provider logo or launch-ready claim.
- Added an explicit native checkbox, unchecked by default, named `Enable the optional message channel`. Country and phone controls stay disabled until opt-in; unchecking clears local phone/code values.
- Added a native country-code select, native 16px tel input, and six native numeric OTP inputs labelled `Verification digit N of 6`, including auto-advance, backspace/arrow navigation, and paste handling.
- Made phases unambiguous as `Phase 1 of 2: phone` and `Phase 2 of 2: code preview`. The build-safe `?phase=verify` fixture selects the second phase after mount.
- `Continue to code preview` performs only a local phase change. Status copy states that no code was sent and no provider is available; `Verify preview` cannot imply success. Resend is disabled with provider-unavailable copy.
- Kept `Skip for now` as a 44px link and exposed Source/Scope/Retention/Export/Revoke/Delete links plus explicit STOP, revoke, and delete guidance before collection.

### S04 — Sign in

- Added native labelled email/password controls with `email` / `current-password` autocomplete, 16px input text, a native operable reveal button, and a native `Remember me` checkbox off by default.
- Added real local navigation/actions for back, forgot password, sign up, guest mode, support disclosure/account recovery, and equal Google/Apple provider buttons. Provider buttons report unavailable capability and send nothing.
- Removed the previous pre-auth biometric/rate-limit mash-up. The screen now explicitly says biometric auth is not simulated in this web preview.
- Made the shared ember CTA full width and width-locked while loading. Default starts blank/disabled; filled is separately valid.
- Added build-safe, single-state query fixtures: `?state=default`, `filled`, `offline`, `wrong-credentials`, `rate-limit`, and `loading`. Offline says sign-in needs a connection and nothing is queued; wrong-credential copy identifies itself as a preview with no real check; rate-limit is isolated with exact fixture provenance; loading says no request is running.
- Used stable per-state input keys so post-mount fixtures correctly remount the shared compatibility input with their fixture values.

## Verification

Required packet gates, final run from `balencia-screens/`:

| Command | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run verify:copy` | PASS — 384 files scanned |
| `npm run verify:brand` | PASS — 384 files scanned |
| scoped `git diff --check` | PASS |

Repair history retained for auditability:

- First typecheck caught a redundant, already-narrowed S04 loading comparison (`TS2367`); removed it within S04, then typecheck passed.
- First copy gate rejected a lowercase email placeholder; changed it to `Email address`, then copy passed.

Read-only Playwright sanity pass against `http://localhost:3001`:

- S03d exposed native First name, Last name, Date of birth, and Gender controls; `Not selected` and `Prefer not to say` were distinct options; Save/Skip and all nine data-control links were present.
- S03e began unchecked with country/phone/CTA disabled; opt-in enabled entry; a valid local number enabled the CTA; CTA moved to six-focusable-input phase 2 with provider-unavailable copy.
- S04 `filled`, `loading`, and `rate-limit` fixtures rendered actual DOM email value `amira@example.com` (not a blank compatibility input); wrong-credential and offline fixtures exposed only their intended messages; CTA loading label rendered as `Signing in`.
- Browser console: 0 errors, 0 warnings during the scoped checks.

Temporary worker screenshots were visually inspected from `/tmp` only and are not durable evidence. Sol should capture canonical 390×844 evidence for:

- S03d default plus one selected DOB/gender state.
- S03e default and `?phase=verify`.
- S04 default, `?state=filled`, `offline`, `wrong-credentials`, `rate-limit`, and `loading`.

## Blockers / follow-up

- No in-scope blocker and no shared-root repair request.
- Final family acceptance, deterministic A1 verifier results, durable screenshots, full `npm run check`, ledger updates, and handoff remain Sol responsibilities.
