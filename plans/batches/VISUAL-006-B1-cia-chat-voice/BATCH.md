# VISUAL-006 — B1 CIA / chat / voice

- Status: `closed with evidence-only waivers 2026-07-10 — Sol accepted under DVF-13; C1 is the only next wave`
- Theme: apply the accepted Quiet orbit / burnished ember foundation and A1/A2 native-state contracts to B1 screens `09,10,51,74,75,76,77,79,99`; retain accepted pilot screen `11` except for a reviewer-proven capability-honesty repair.
- Session cap: 9 bounded implementation items plus serialized integration
- Build gate: yes
- Active lane/root: `Balencia visual prototype finalization` / `balencia-screens/`
- Source links: `VISUAL-001/audit/B1-cia-chat-voice.md`; DVF decisions/reference direction; current specs `09,10,11,51,74,75,76,77,79,99`; canon/catalog; live accepted foundation.
- Tie-breaker: latest user direction → DVF decisions/reference direction → live code for operational truth → current spec content/state → canon/catalog.
- Conflict lock: DVF-01 warm-dark overrides stale warm-light language; DVF-07 all-caps `CIA` overrides stale `Cia`; DVF-08/09/10 resolve the audit's obsolete missing-reference/S11 blocker. S11 remained a visual sentinel, but Sol repaired its false microphone-capture wording after independent trust review proved the regression.
- Handoff target: `READY WITH WAIVERS` for C1 only
- Pre-development gate: `READY WITH WAIVERS`
- Evidence path: `plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/`
- Goal lifecycle: active durable `/goal` for all 104 screens
- Execution mode: `multi-agent`
- Wait policy: `monitor` only for local port-3001 readiness, 5-second cadence, 2-minute maximum
- Runtime profile: `codex-native`
- Model routing: `gpt56-tiered`; Sol/root integrates shared APIs/assets/verifier/docs and accepts, Terra-class workers implement disjoint screen files, independent reviewers remain read-only
- Exact runtime model/effort: unexposed; requested roles, agent IDs, packets, outputs and Sol verification are recorded
- Worker packets: `workers/builder-a.md`, `workers/builder-b.md`, `workers/verifier.md`
- Verify commands: full check/build; strict ten-route capture; dedicated isolated B1 state verifier; root validator; root/submodule diff checks
- Locked state evidence: 109 current 390×844 PNGs across exact query fixtures and ordinary interactions; every capture is isolated and capability-guarded

## Pre-development gate

- [x] Root/lane guidance, A2 closeout/handoff, DVF decisions/reference direction, full B1 audit, ten current specs and canon/catalog read by Sol.
- [x] Stale `Cia`, light-shell and Image-1-blocked directions are resolved by DVF-01/07/08/09/10.
- [x] B1 is not Blueprint-backed; no `BUILD_READY` or Blueprint matrix is required.
- [x] All target modules/routes exist; accepted S11 is read-only unless Sol proves a shared regression.
- [x] Current native composer/input/action/orb APIs are the operational baseline; only Sol may extend shared APIs.
- [x] Code/build/strict/state/validator/diff gates are recorded before implementation.
- [x] Worker ownership is disjoint; shared files/docs/verifier/assets/ledger/handoff remain serialized through Sol.
- [x] Existing dirty worktree and forbidden `yhealth-app` submodule are preserved.
- [x] Gate result: `READY WITH WAIVERS`.

Waivers are evidence-only: exact runtime provenance; device AT/enlarged-text; broad Axe; root founding brief/`_progress.md`; final immutable one-SHA 104-screen capture.

## Scope

| Item | Files/routes | Owner | Required proof | Status |
|---|---|---|---|---|
| B1-01 CIA chat | `S09CiaChat.tsx` | Builder A | native suggestions/search/voice/composer; message metadata; live thinking/reply; honest default/loading/empty/error/offline/success | complete |
| B1-02 in-chat voice | `S10CiaVoiceInChat.tsx` | Builder A | explicit consent state, native recording/cancel/send, live transcript, separate denied/error/offline/max-duration states | complete |
| B1-03 voice history | `S51VoiceCallHistory.tsx` | Builder A | native related tabs/rows/delete/schedule, reachable local safety, history/action/empty/error/offline states | complete |
| B1-04 conversations hub | `S74ConversationsHub.tsx` | Builder A | native search/filter/rows/FAB, honest unread/sync, management/safety and list states | complete |
| B1-05 direct chat | `S75DirectChat.tsx` | Builder B | human-first native composer/assist controls, private-draft consent, sender/time/delivery/source metadata, queued/retry states | complete |
| B1-06 group chat | `S76GroupChat.tsx` | Builder B | native members/mention/attach/send, audience/consent/revoke/delete/report, source and message states | complete |
| B1-07 message actions | `S77MessageActions.tsx` | Builder B | safe scroll at 390×844, selected message/reactions/actions/media/Done reachable, equal Cancel on destructive flows | complete |
| B1-08 call summary | `S79CallSummary.tsx` | Builder B | native action-item toggles/undo, privacy/follow-up actions, real/partial/error/offline/success states and source truth | complete |
| B1-09 provider inbox | `S99WhatsappInbox.tsx` | Builder B | unwrapped title/actions, native privacy controls, provider-unavailable/no-backend truth, linked/null/error/offline/revoked states | complete |
| B1-10 integration/acceptance | all ten routes including S11 | Sol + independent reviewers | check/build, strict 10/10, isolated state suite/PNGs, no unwaived Critical/High/Medium | complete |

## Locked state and metadata contract

| Screen | Stable root | Exact `?state=` fixtures | Stable substates |
|---|---|---|---|
| 09 | `data-chat-state` | `default`, `skeleton`, `empty`, `error`, `success`, `disabled`, `offline`, `thinking` | — |
| 10 | `data-voice-state` | `consent-required`, `ready`, `booting`, `listening`, `low-confidence`, `silence`, `permission-denied`, `transcription-error`, `network-error`, `max-duration`, `success`, `disabled`, `offline` | `data-consent-state="required|granted|denied"` |
| 11 | accepted pilot attributes only | no new fixture contract | existing `data-cia-state`, `data-cia-size`, `data-cia-paused` |
| 51 | `data-voice-history-state` | `default`, `action-items`, `skeleton`, `empty`, `error`, `success`, `disabled`, `offline`, `schedule`, `detail`, `delete-confirmation`, `safety` | `data-history-tab="history|action-items"`; `data-history-panel="none|schedule|detail|delete|safety"` |
| 74 | `data-conversations-state` | `default`, `skeleton`, `empty`, `error`, `success`, `disabled`, `offline`, `search`, `compose`, `manage`, `safety` | `data-conversations-filter="all|cia|people|groups|rooms"` |
| 75 | `data-direct-chat-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `blocked`, `assist-revoked` | `data-delivery-state="idle|sending|queued|sent|read|failed"` |
| 76 | `data-group-chat-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `disabled`, `success` | `data-send-state="idle|sending|queued|sent|failed"` |
| 77 | `data-message-actions-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `disabled`, `success` | `data-reaction="none|useful|support|done|insight"`; one `data-message-actions-scroll` body |
| 79 | `data-call-summary-state` | `default`, `skeleton`, `partial`, `error`, `offline`, `success` | native action-item checked state |
| 99 | `data-whatsapp-state` | `default`, `skeleton`, `empty`, `error`, `offline`, `paused`, `revoked`, `outside-window`, `success` | distinct revoke/delete confirmations |

Messages on 09/75/76 and the transcript highlight on 79 use the shared optional metadata API and render `article[data-message-id][data-message-speaker][data-message-status][data-message-source][data-message-audience]` with a descendant `<time datetime>`. Allowed delivery truth is `read|delivered|sent|queued|failed|draft|thinking`. Attachments expose source and retention. Private CIA drafts/recaps remain `private-to-you` until explicit sharing changes the audience.

## Acceptance contract

- Every visible affordance is native/keyboard operable with an effective 44px target, authored focus and truthful local feedback.
- Search/composer fields use native 16px+ inputs with labels; attachment, mention, mic and provider actions never claim unavailable capability.
- Chat messages expose speaker, timestamp, delivery/queued/error status and source/visibility where relevant without turning the thread into a metadata table.
- Voice capture begins only from an explicit action with microphone/transcript/retention disclosure; raw audio is not claimed stored; reduced motion preserves non-motion state distinctions.
- CIA suggestions/recaps/drafts are visibly private/draft until the member explicitly sends or shares them.
- Group-derived claims expose audience/source/consent; export, revoke, delete, report, mute/block/leave and private safety routes remain reachable where specified.
- S77 selected content, all actions/media and Done remain reachable at 390×844; destructive confirmation keeps Cancel equal.
- S99 remains provider-neutral and visual-only: no real WhatsApp launch, inbox sync, contact access or message delivery is implied.
- S11 retains the accepted pilot visual/state/control/reduced-motion contract while its copy truthfully says no microphone is connected or opened.
- The dedicated verifier writes exactly 109 current phone PNGs, rejects stale or unexpected files, fingerprints product/API/authority sources before and after, and records zero console/page/forbidden-capability/storage events. One explicit S77 Copy call is intercepted with an exact payload; the host clipboard is untouched.
- Burnished-ember action contrast, all-caps `CIA`, official-logo immutability and code/SVG-native UI rules hold.

## Stop conditions

- Builder touches an unlisted/shared file, S11, docs, verifier, ledger/handoff, package/lock, `yhealth-app`, Figma, Railway, backend/API/auth/global state, provider/OS service or production data.
- A stale light-shell, `Cia` or missing-reference direction is revived.
- A screen claims real recording, transcript persistence, provider sync/message delivery, group audience consent or safety contact capability without explicit prototype/unavailable truth.
- Private CIA draft/health context auto-enters a peer/group-visible thread.
- Destructive/report/block/delete/leave action lacks a clearly reachable cancel or exact-scope confirmation.
- Check/build/strict/state gates fail and cannot be repaired within the bounded batch.
- C1 starts before B1 independent acceptance.

## Completion gate

- [x] Worker outputs reviewed against packets; edits remain disjoint/in scope.
- [x] Every B1 audit row and image slot is closed, dispositioned or explicitly waived with owner/trigger.
- [x] `npm run check` and `npm run build` pass.
- [x] Strict B1 capture is 10/10 with zero issues/warnings/missing frames/console errors.
- [x] Dedicated isolated B1 verifier passes native controls, message/voice truth, privacy/safety, state isolation, clipping, focus, targets, contrast and reduced motion.
- [x] The state directory contains exactly the locked 109 screenshots at 390×844 with recorded SHA-256 hashes and no mixed-run residue.
- [x] Current default/state PNGs pass independent code, design/source and accessibility/trust review.
- [x] S11 remains conformant after the bounded capability-honesty copy repair.
- [x] Root validator and both diff checks pass; forbidden submodule state is preserved.
- [x] Sol accepts B1 under DVF-13 and opens only C1.

## Acceptance result

Sol accepts B1 at the visual-prototype family bar. Full check/build pass; strict defaults are 10/10 with zero issues/warnings; the dedicated suite passes 111/111 isolated contexts/nonces and atomically promotes 109/109 exact phone PNGs with stable product/API/authority start/end fingerprints, zero console/page errors and zero forbidden capability events. Product fingerprint is `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b`; verifier/API fingerprint is `18cfc1b1a455ce2b5dcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e`. Independent design/source and accessibility/trust reviewers accept after every challenged Critical/High/Medium defect was repaired and re-evidenced.

The authoritative VISUAL-001 local baseline subset is preserved under `evidence/before/`; current defaults are intentionally pixel-stable because the family repairs are predominantly native semantics, state truth, focus, scrolling and modal behavior. The baseline's S51 34px-tab warning closes in the current strict report, while 109 state/interaction frames show the changed outcomes. HIFI-75-01 is an accepted privacy-safe ChatGPT ImageGen attachment fixture, reused byte-identically by S75/S77 with a code-native fallback and exact provenance.

Residual waivers are evidence-only: physical-device VoiceOver/TalkBack and system Dynamic Type, broad Axe, exact runtime/model provenance, dirty-worktree immutable SHA and final serialized one-SHA 104-screen certification. No known B1 Critical, High or Medium product/evidence defect is waived.
