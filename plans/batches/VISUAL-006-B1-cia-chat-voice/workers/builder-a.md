# B1 Builder A packet — CIA chat / inline voice / history / hub

- Role: bounded Terra-class implementation worker; output remains evidence until Sol accepts.
- Allowed product files only:
  - `balencia-screens/src/components/hifi/screens/cia/S09CiaChat.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S10CiaVoiceInChat.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S51VoiceCallHistory.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S74ConversationsHub.tsx`
- Allowed evidence file: `plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/worker-builder-a.md`.
- Denied: shared kit/CSS, S11, Builder B screens, assets, scripts/verifiers, docs/ledger/handoff, packages/lock, `yhealth-app`, network/provider/backend/global state.

Implement B1-01..04 from `BATCH.md`, the full B1 audit and current specs. Use accepted shared native inputs/composers/actions; if a shared API is insufficient, stop and report the exact root to Sol rather than patching it. Add deterministic query `?state=` fixtures and stable `data-*` roots agreed in the final source map. Every action must produce honest local feedback; no recording, call, schedule, sync or safety-contact capability may be fabricated.

## Locked implementation contract

- S09: root `data-chat-state`; fixtures `default|skeleton|empty|error|success|disabled|offline|thinking`. Native 44px `Search conversations`, `Open voice options`, suggestions `Tell me more|Show missions|Log meal`, `Message CIA`, `Attach context`, `Start voice input`, `Send message`. Search and voice-option dialogs must have focus containment/Escape/restore. Suggestion and typed send both create a complete metadata bubble, one atomic thinking announcement and a sourced reply. Empty send is disabled; offline never auto-queues; failed draft is preserved with retry/delete.
- S10: root `data-voice-state`; fixtures `consent-required|ready|booting|listening|low-confidence|silence|permission-denied|transcription-error|network-error|max-duration|success|disabled|offline`; `data-consent-state=required|granted|denied`. Default never claims active capture. Consent disclosure precedes mic preview and has equal `Not now`. Recording is a native pressed toggle with honest preview/no-OS copy, state-labelled waveform/transcript, raw-audio-not-stored truth, cancel/send/copy/retry/settings-preview/crisis actions, and no mic/STT/audio capability calls.
- S51: root `data-voice-history-state`; fixtures `default|action-items|skeleton|empty|error|success|disabled|offline|schedule|detail|delete-confirmation|safety`; stable tab/panel attributes from BATCH. Implement proper 44px History/Action items tabs with keyboard relationships, native row/detail/delete/schedule/safety actions, exact-scope equal-Cancel delete, and local-only schedule feedback. Use the shared actionable `SafetyCard`; do not claim a call was booked or audio was played.
- S74: root `data-conversations-state`; fixtures `default|skeleton|empty|error|success|disabled|offline|search|compose|manage|safety`; `data-conversations-filter=all|cia|people|groups|rooms`. Search/filter/unread/rows/voice/FAB/manage/safety are native and stateful. Local routes are Aisha→75, group/room→76, voice→11. Compose is a focus-managed local choice sheet. Offline keeps explicitly stale cached rows and disables compose with a reason.
- Use the shared `ChatBubble` metadata props rather than screen-local duplicate markup. All B1 message articles need identity, speaker, status, source, audience, visible time and a valid `dateTime`.
- Every fixture has exactly one phone-level h1 and one atomic polite live status source. Native fields are at least 16px. Visible affordances have authored focus and an effective 44px target. Loading geometry is stable and uses `aria-busy`.
- Do not edit accepted S11 or any shared file. Do not add real media, provider, clipboard, calendar, call, recording or external-navigation behavior.

Worker gates: scoped ESLint, `npm run typecheck`, copy/brand checks, scoped `git diff --check`, browser smoke of every fixture. Do not claim acceptance.
