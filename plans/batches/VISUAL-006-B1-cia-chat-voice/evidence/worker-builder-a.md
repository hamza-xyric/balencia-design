# VISUAL-006 B1 — Builder A evidence

- Worker role: bounded native Codex Builder A subagent operating under Sol. The packet requested a Terra-class implementation role; the worker runtime did not expose a separate model slug, so no unverified model provenance is claimed.
- This note is implementation evidence for Sol and does not claim acceptance, readiness, or batch closure.
- Packet: `plans/batches/VISUAL-006-B1-cia-chat-voice/workers/builder-a.md`.
- Sources used: `BATCH.md`, `VERIFICATION-MATRIX.md`, the active 09/10/51/74 hi-fi screen specs, compact canon/component catalog, root and prototype `AGENTS.md`, accepted shared CIA-kit APIs, and local Next.js 16 client/navigation documentation.
- Skills used: `frontend-design`, `senior-frontend`, and `playwright`, with the Forgeflow pre-development workflow used to preserve the bounded packet and verification contract.

## Exact diff scope

- `balencia-screens/src/components/hifi/screens/cia/S09CiaChat.tsx`
- `balencia-screens/src/components/hifi/screens/cia/S10CiaVoiceInChat.tsx`
- `balencia-screens/src/components/hifi/screens/cia/S51VoiceCallHistory.tsx`
- `balencia-screens/src/components/hifi/screens/cia/S74ConversationsHub.tsx`
- This evidence file.

Builder A did not edit shared kit/CSS, accepted S11, Builder B screens, assets, packages/lockfiles, scripts/verifiers, batch authority, ledgers, handoff, `yhealth-app`, provider/backend/network code, or persisted global state.

## Implemented product work

### S09 CIA chat

- Added deterministic `default|skeleton|empty|error|success|disabled|offline|thinking` fixtures on `data-chat-state`.
- Rebuilt the conversation around accepted shared `ChatBubble` metadata and the extended shared `VoiceComposer`; every message exposes identity, speaker, delivery state, source, audience, visible time, and valid `dateTime`.
- Added native search, voice-options, attachment, privacy, retry/delete, suggestions, and typed-send interactions with 44px controls and a 16px composer field.
- Suggestion and typed sends produce one atomic thinking status followed by a complete locally sourced CIA reply. Empty send is disabled; failed drafts are preserved; offline drafts remain local and never auto-queue.
- Search and voice/options sheets trap focus, close on Escape, restore their trigger, and make the background inert while open.

### S10 CIA voice in chat

- Added all 13 locked voice fixtures on `data-voice-state` plus `data-consent-state=required|granted|denied`.
- Made consent explicit and first: default capture is off, `Allow voice preview` grants the local fixture, and equal `Not now` produces the denied/disabled state.
- Added a native pressed mic toggle, state-labelled static waveform/transcript, cancel/send/discard, retry, copy-preview, settings-preview, and crisis-guidance actions.
- Kept every capability statement honest: no microphone, speech-to-text, audio, clipboard, settings, safety-contact, recording, upload, or network/provider API is invoked. Raw audio is explicitly not stored.
- Added root-level `aria-busy` for the booting fixture and one screen-owned atomic polite live source.

### S51 voice call history

- Added the 12 locked fixtures on `data-voice-history-state`, `data-history-tab=history|action-items`, and `data-history-panel=none|schedule|detail|delete|safety`.
- Implemented native roving History/Action items tabs with ArrowLeft/ArrowRight selection and proper tab/panel relationships.
- Replaced decorative action items with labelled native checkboxes and derived progress.
- Added native schedule, detail, exact-scope delete, data controls, and actionable shared safety flows. Schedule feedback says explicitly that no call was booked; audio playback is unavailable.
- Delete confirmation gives Cancel equal geometry and scope. Dialogs trap focus, close on Escape, and now restore the original trigger through parent-owned focus tracking.

### S74 conversations hub

- Added all 11 locked fixtures on `data-conversations-state` plus stateful `data-conversations-filter=all|cia|people|groups|rooms`.
- Added one controlled, focus-managed search experience; stateful native filters; readable cached/offline/error/success outcomes; native rows, unread truth, manage actions, safety guidance, and compose FAB.
- Wired only internal prototype routes: Aisha to 75, groups/rooms to 76, and voice to accepted S11.
- Compose/manage/search/safety sheets trap focus, close on Escape, restore their triggers, and make background controls inert. Destructive draft deletion has equal Cancel geometry.
- Offline rows are explicitly stale cached data, compose is disabled with a named reason, and no thread/provider/backend action is fabricated.

## Locked state/semantic evidence

- All four stable root contracts match the packet exactly.
- Every one of the 44 canonical query fixtures has exactly one phone-level `h1` and one atomic polite live source.
- Skeleton fixtures and S10 booting expose the required busy state.
- Native text fields compute to at least 16px; tested primary controls compute to at least 44×44px.
- Disabled/offline actions expose non-empty reasons; dialogs make the background inert and retain Escape/focus restoration.
- No new bitmap or generated asset was required. Image generation was not used; this slice is code-native UI and does not approximate the Balencia logo.

## Verification evidence

From `balencia-screens/`:

- Scoped ESLint for S09/S10/S51/S74: pass, zero errors/warnings.
- `npm run typecheck`: pass.
- `npm run verify:copy`: pass (`384 files scanned`).
- `npm run verify:brand`: pass (`384 files scanned`).
- Scoped `git diff --check`, including this evidence note: pass.

Browser verification used the bundled Playwright CLI against a fresh Next dev server at `http://localhost:3005`. Port 3001 had become a cached production server and could not reflect the final working-tree patch, so it was excluded from final source verification.

- Canonical fixture sweep: 44/44 states passed at a 390×844 viewport; root/state attributes, S10 consent truth, S51 tab/panel truth, S74 filter truth, one `h1`, one atomic polite live source, and busy states all matched. Result: `failures=[]`, `pageErrors=[]`, `consoleErrors=[]`.
- Interaction/accessibility smoke at a 1440×1000 host viewport (so the prototype sidebar did not intercept the phone frame) passed after fixture hydration:
  - S09 16px composer, 44px send, disabled empty/offline send, typed thinking→success, complete shared message metadata, search/voice Escape and focus restoration.
  - S10 allow/decline consent truth, pressed mic toggle, send success, settings/retry/copy state-specific actions, and honest safety guidance.
  - S51 roving tabs, native checkbox initial/toggled states, 44px schedule trigger, Escape/focus restoration, and equal 44px delete actions.
  - S74 single accessible modal search, search/compose focus restoration, filter reflection, equal 44px destructive actions, and offline compose reason.
  - Final browser runs reported no application console errors or page errors.

## Handoff

- No known Builder A implementation blocker remains.
- Sol and the independent verifier still own integrated verifier execution, strict screenshot promotion, source-integrity review, any shared/family repair, and final accept/reject.
