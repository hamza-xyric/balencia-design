# VISUAL-003 worker packet — auth and voice

- Packet status: `completed; Sol accepted after integrated verification`
- Parent batch: `VISUAL-003-seven-screen-pilot`
- Packet ID: `PILOT-AUTH-VOICE`
- Issued by: Codex root / Sol
- Worker profile: native Codex collaboration worker
- Worker harness: Codex agent thread
- Model-routing policy: `gpt56-tiered`
- Worker agent type: implementation worker
- Worker model / effort: requested `gpt-5.6-terra` / high; actual model is not selectable or exposed
- Runtime intake source: `../BATCH.md`
- Source hierarchy: root/lane guidance plus `VISUAL-001/REFERENCE-DIRECTION.md`
- Tie-breaker: latest decisions/reference contract → live screen code → current hifi spec/canon
- Active root: `balencia-screens/`
- Verify command: `npm run typecheck` after the shared foundation is present
- Evidence path: `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-auth-voice.md`
- Timeout / stop condition: one bounded turn; stop on shared API conflict, source conflict, or need for an unlisted file

## Exact scope

Implement only pilot screens 03, 07 and 11 against the Sol-owned shared foundation.

## Required sources

- `VISUAL-001/REFERENCE-DIRECTION.md`
- `hifi-screens/{03-welcome-sign-up,07-cia-onboarding-conversation,11-cia-voice-full-screen}.md`
- audits `A1-auth-entry.md`, `A2-auth-recovery-onboarding.md`, `B1-cia-chat-voice.md`
- current three screen files and current shared kit APIs

## Allowed files

| Path | Operation |
|---|---|
| `balencia-screens/src/components/hifi/screens/auth/S03WelcomeSignUp.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/auth/S07CiaOnboarding.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/cia/S11CiaVoiceFullScreen.tsx` | edit |
| `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-auth-voice.md` | write evidence |

Because the active desktop workspace is outside the sandbox write root, stage only these files under `/Users/hamza/Marketing Portal/.codex-staging/balencia-design/` with identical repo-relative paths, edit via `apply_patch`, and copy back with the approved `rsync -aR` path. Do not touch another staging file.

## Required outcomes

- S03: one page `h1`; native labelled email/password fields and reveal control; full-width AA primary; legal links visible/operable; no duplicate legal-consent invention.
- S07: default orb is idle; mic disclosure states retention/delete before capture; composer and privacy/crisis exits are native 44px controls; compact orb remains structurally distinct under reduced motion.
- S11: hero orb uses the accepted contract; central mic is a native stateful toggle with `aria-pressed`; support/close/keyboard/mute remain operable and labelled; default stays idle.
- Preserve all-caps `CIA`, warm-dark 390×844 authority, visible ambition, and safety exits.

## Denied actions

- No shared kit, token, data, registry, spec, ledger, handoff, asset, Figma, Railway, API/backend, or `yhealth-app` edit.
- No final readiness or safety decision.
- Do not commit, stage, reset, stash, clean, format unrelated files, or spawn another worker.

## Output

Write a concise evidence file naming files read/changed, exact requirements addressed, verify result, remaining issues, and stop conditions. Worker output is evidence until Sol reviews it.
