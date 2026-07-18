# B1 Builder B packet — direct/group chat / actions / summary / provider inbox

- Role: bounded Terra-class implementation worker; output remains evidence until Sol accepts.
- Allowed product files only:
  - `balencia-screens/src/components/hifi/screens/cia/S75DirectChat.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S76GroupChat.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S77MessageActions.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S79CallSummary.tsx`
  - `balencia-screens/src/components/hifi/screens/cia/S99WhatsappInbox.tsx`
- Allowed evidence file: `plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/worker-builder-b.md`.
- Denied: shared kit/CSS, S11, Builder A screens, assets, scripts/verifiers, docs/ledger/handoff, packages/lock, `yhealth-app`, network/provider/backend/global state.

Implement B1-05..09 from `BATCH.md`, the full B1 audit and current specs. Use accepted shared native composer/action APIs; keep CIA assists private until explicit share/send. S77 must have a safe internal scroll region and persistent reachable Done; destructive actions use exact-scope local confirmation with equal Cancel. S99 remains provider-neutral/unavailable. Add deterministic query `?state=` fixtures and stable `data-*` roots agreed in the final source map.

## Locked implementation contract

- S75: root `data-direct-chat-state`; fixtures `default|skeleton|empty|error|offline|blocked|assist-revoked`; `data-delivery-state=idle|sending|queued|sent|read|failed`. Native `Call`, `Info`, `Pace`, `Shared`, `Private`, `Insert draft`, `Share health source`, `Message Aisha`, `Attach context`, `Send message`, `Retry sending`. Call is local-unavailable feedback. Private CIA drafts stay `private-to-you`; health sharing requires explicit scope/source/freshness/audience confirmation with equal Cancel. Offline queues only after explicit Send.
- S76: root `data-group-chat-state`; fixtures `default|skeleton|empty|error|offline|disabled|success`; `data-send-state=idle|sending|queued|sent|failed`. Native `Add member`, `Group info`, `5 members, 4 online`, attachment/composer/mention/send, private CIA recap, group-tempo mission and retry. Recap defaults to private preview; only explicit `Post recap` changes audience. Disabled/moderated and revoke behavior state exact reasons.
- S77: root `data-message-actions-state`; fixtures `default|skeleton|empty|error|offline|disabled|success`; `data-reaction=none|useful|support|done|insight`. `data-message-actions-scroll` is the sole sheet-body scroller; header and ≥52px footer Done stay outside it and fully visible at top/max scroll and 125% text. All reactions, media and privacy/report/export/revoke/delete actions are native/reachable. Copy is local feedback only. Delete has equal Cancel, focus containment/Escape/restore and a surviving deleted outcome.
- S79: root `data-call-summary-state`; fixtures `default|skeleton|partial|error|offline|success`. Action items are native checkboxes with derived counts and reversible Fitness-only XP. Tone, topic segments, CIA evidence, privacy and local schedule actions are native. Partial/error/offline do not fabricate transcript/insight/provider results.
- S99: root `data-whatsapp-state`; fixtures `default|skeleton|empty|error|offline|paused|revoked|outside-window|success`. Full `WhatsApp inbox` title and balanced CTAs fit at 390px and 125% text. Provider UI is neutral and explicitly a visual fixture with a masked number; Manage/Open show warning then local-unavailable feedback with zero external launch. Revoke/delete are distinct equal-Cancel confirmations with exact affected-data truth.
- Use the shared `ChatBubble` metadata props for every message/transcript highlight: identity, speaker, allowed status, source, audience, visible time and valid `dateTime`. Attachments expose `data-attachment-source` and `data-attachment-retention`. Use `/hifi-assets/HIFI-75-01-hill-segment.png` as the same selected hill attachment in S75 and S77; crop with `object-cover`, use alt `Dusk trail rising along a quiet ridge`, provide a code-native `Media preview unavailable` fallback, and never expose it in empty/deleted states.
- Every fixture has exactly one phone-level h1 and one atomic polite live status source. Fields are native 16px+, visible affordances have authored focus and 44px targets, and loading geometry is stable with `aria-busy`.
- Do not edit accepted S11 or any shared file. S77 Copy is the sole capability exception: it may call `navigator.clipboard.writeText` only from the explicit Copy press, with graceful unavailable feedback; the verifier intercepts it and requires exactly one selected-message payload without changing the host clipboard. Do not add any other call, provider, clipboard, upload, mic/STT/audio, external-navigation, backend or storage capability.

Worker gates: scoped ESLint, `npm run typecheck`, copy/brand checks, scoped `git diff --check`, browser smoke of every fixture. Do not claim acceptance.
