# VISUAL-003 worker evidence — auth and voice

- Packet: `PILOT-AUTH-VOICE`
- Worker run: `/root/pilot_auth_voice`
- Runtime: native Codex collaboration worker; requested `gpt-5.6-terra` / high, actual model and effort not exposed
- Topology: one bounded depth-1 worker under Sol/root; no subagents spawned
- Status: implementation complete; evidence remains subject to Sol/root review

## Sources read

- `plans/batches/VISUAL-003-seven-screen-pilot/workers/auth-voice.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/REFERENCE-DIRECTION.md`
- `Balencia-New-Screens/hifi-screens/{03-welcome-sign-up,07-cia-onboarding-conversation,11-cia-voice-full-screen}.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/{A1-auth-entry,A2-auth-recovery-onboarding,B1-cia-chat-voice}.md`
- The three current screen modules listed below
- Current shared-kit APIs used by those screens: `buttons.tsx`, `cia.tsx`, `chrome.tsx`, `HifiShell.tsx`, `surfaces.tsx`, `chips.tsx`, `data.tsx` (`MomentumBar`), and `index.ts`

## Files changed

- `balencia-screens/src/components/hifi/screens/auth/S03WelcomeSignUp.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S07CiaOnboarding.tsx`
- `balencia-screens/src/components/hifi/screens/cia/S11CiaVoiceFullScreen.tsx`
- `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-auth-voice.md`

No shared kit, token, data, registry, spec, asset, ledger, handoff, backend, or `yhealth-app` file was edited.

## Requirements addressed

- **S03:** `TopBar` now renders a non-heading brand title so the page has one `h1`; email/password are native named inputs with type/autocomplete metadata; reveal is a 44px stateful native button; the shared AA ember primary is full width; legal items remain visible native links; no legal-consent checkbox was invented.
- **S07:** the hero orb defaults to `idle` and changes to the shared structural `listening` geometry only after the stateful mic action; retention and deletion are disclosed before capture; composer input/attach/mic/send and privacy/crisis exits are native 44px controls; both exits expose real expandable outcomes. Shared orb geometry preserves a non-motion distinction under reduced motion.
- **S11:** the hero uses the accepted shared orb contract and defaults to `idle`; the 64px mic is a native toggle with `aria-pressed` and changes the orb to `listening`; support, close, keyboard, and CIA mute controls are labelled and update local UI state; the idle waveform is visually quiet; transcript retention/deletion copy remains visible before capture.
- All visible coach naming stays all-caps `CIA`; the existing warm-dark 390×844 composition and safety exits are preserved.

## Verification

- Command: `npm run typecheck` in `balencia-screens/`
- First sandboxed attempt reached TypeScript but could not write `tsconfig.tsbuildinfo` (`EPERM`); the identical command was rerun with the required workspace permission.
- Final result: **PASS**, exit `0` (`tsc --noEmit`).
- Scoped source review: **PASS**; only the three authorized screen files and this evidence file were intentionally changed.

## Remaining review

- No browser, visual-regression, keyboard, screen-reader, or reduced-motion capture was run in this worker packet; Sol/root will perform browser acceptance at 390×844.
- Controls use bounded prototype-local state only. No route, persistence, audio engine, emergency-service integration, or backend behavior was invented.
- Stop conditions: none triggered; no shared API conflict, source conflict, or need for an unlisted implementation file.
