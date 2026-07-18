# VISUAL-006 B1 verification matrix

| Change type | Deterministic gate | Manual lens | Stop condition |
|---|---|---|---|
| Code/shared compatibility | `npm run check` | no A1/A2/pilot/shared regression | any error |
| Production build | `npm run build` | all `200` static pages/prerender integrity | compile/type/prerender failure |
| B1 composition | strict `--only 09,10,11,51,74,75,76,77,79,99` | 390×844 hierarchy, warm-dark, composer/sheet clipping | issue/warning/console error |
| Native controls | B1 interaction verifier | keyboard order, labels, 44px targets, 16px fields, focus, width lock | fake/dead action or missing state |
| Message/voice truth | verifier + source review | sender/time/delivery/source, consent, transcript/live status, no false capture/provider | fabricated delivery/recording/sync |
| Privacy/safety | verifier + trust review | audience, private drafts, report/mute/block/export/revoke/delete/leave/cancel | inaccessible or coercive action |
| Sheets and long content | B1 verifier + current PNGs | S77/S99 at 390×844 and text expansion | unreachable media/Done/cancel or hard clip |
| Motion | reduced-motion browser context | state remains distinct without loops | leaked loop or lost meaning |
| Independent acceptance | separate read-only reviewers | source, accessibility, ethics, hierarchy, evidence integrity | unwaived Critical/High/Medium |

Final result: `PASS`. Full check/build pass; strict B1 defaults pass `10/10` with zero issues/warnings/missing frames/console-error screens; the dedicated suite passes `111/111` isolated contexts/nonces and atomically promotes the exact `109`-PNG set. Product fingerprint `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b` and verifier/API fingerprint `18cfc1b1a455ce2b5dcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e` are stable start/end. Independent design/source and accessibility/trust reviews accept with no unresolved Critical/High/Medium.

## Dedicated verifier contract

`verify-b1-cia.mjs` runs Chromium at a 1440×1000 host viewport, DPR 1, with the phone fixed at 390×844. The primary context uses reduced motion; S11 alone gets a second no-preference context for accepted animation visibility pause/resume. Every case gets an isolated context, unique `__b1audit` nonce, cleared origin state and two animation frames after the exact stable root is reached. Top captures reset the PhoneFrame and every descendant scroller.

The run is pass-atomic: screenshots are written to a temporary directory and promoted only if all assertions pass. The verifier deletes prior canonical PNGs and rejects missing or unexpected names, wrong 390×844 dimensions, console/page errors, external requests, forbidden capability events, storage/cookie changes or source-fingerprint drift. It records per-PNG SHA-256 plus start/end fingerprints for the ten product modules, accepted shared APIs, the verifier itself, exact HIFI-75 bytes and active source authority.

Before application JavaScript runs, guards stub/count mic, MediaRecorder, speech recognition, WebRTC, media playback, share, beacon, popup/external/tel/sms/WhatsApp navigation, object URL/download, WebSocket/EventSource and app API/non-GET traffic. Expected capability count is zero, except one intercepted local clipboard call during S77 Copy. Same-origin document/static assets are allowed. No unmasked provider number, raw audio, real provider handoff, live call, emergency-contact claim or persisted/exported/revoked/sent external state may appear.

Global checks include one h1; no horizontal overflow; composer/action/nav clear of the home indicator; native keyboard-reachable controls with unique names, 44px targets and authored focus; 16px native fields; honest native disabled reasons; semantic copy at 11px+ except two-letter initials; loading `aria-busy` and width lock; ≥4.5 contrast for required text/actions; one atomic polite live source; and reduced-motion loops settled without erasing state meaning. S10 proves recovery options auto-reveal above the fixed voice surface. S75/S76 prove equal sensitive-choice variants and in-product sent/queued/failed auto-reveal. S76 additionally proves a phone-bound, inert-background, focus-trapped group-action modal with exact trigger semantics/restoration and local-only result. S77 proves sole internal body scroll, all controls reachable at max scroll and 125% text, sticky Done, equal Cancel and surviving error/deleted outcomes. S99 proves the full title and balanced one-line CTAs at default and 125% text.

## Exact current screenshot set — 109

- S09 (11): `09-default`, `09-skeleton`, `09-empty`, `09-error`, `09-success`, `09-disabled`, `09-offline`, `09-thinking`, `09-search-open`, `09-suggestion-sent`, `09-composer-sent`.
- S10 (16): `10-consent-required`, `10-ready`, `10-booting`, `10-listening`, `10-low-confidence`, `10-silence`, `10-permission-denied`, `10-transcription-error`, `10-network-error`, `10-max-duration`, `10-success`, `10-disabled`, `10-offline`, `10-consent-declined`, `10-transcript-sent`, `10-crisis-support`.
- S11 (7): `11-default-reduced`, `11-listening`, `11-keyboard-focus`, `11-keyboard-sent`, `11-muted`, `11-support`, `11-closed`.
- S51 (13): `51-default`, `51-action-items`, `51-skeleton`, `51-empty`, `51-error`, `51-success`, `51-disabled`, `51-offline`, `51-schedule`, `51-detail`, `51-delete-confirmation`, `51-safety`, `51-action-checked`.
- S74 (12): `74-default`, `74-skeleton`, `74-empty`, `74-error`, `74-success`, `74-disabled`, `74-offline`, `74-search`, `74-compose`, `74-manage`, `74-safety`, `74-filter-people`.
- S75 (10): `75-default`, `75-skeleton`, `75-empty`, `75-error`, `75-offline`, `75-blocked`, `75-assist-revoked`, `75-health-share-confirm`, `75-online-sent`, `75-offline-queued`.
- S76 (11): `76-default`, `76-skeleton`, `76-empty`, `76-error`, `76-offline`, `76-disabled`, `76-success`, `76-members-sheet`, `76-recap-consent`, `76-group-action-confirm`, `76-online-sent`.
- S77 (10): `77-default`, `77-skeleton`, `77-empty`, `77-error`, `77-offline`, `77-disabled`, `77-success`, `77-default-bottom`, `77-delete-confirm`, `77-enlarged-bottom`.
- S79 (8): `79-default`, `79-skeleton`, `79-partial`, `79-error`, `79-offline`, `79-success`, `79-privacy-panel`, `79-action-checked`.
- S99 (11): `99-default`, `99-skeleton`, `99-empty`, `99-error`, `99-offline`, `99-paused`, `99-revoked`, `99-outside-window`, `99-success`, `99-delete-confirm`, `99-enlarged-default`.

Expected screenshot count is exactly `109`. The 111 contexts are the 109 capture contexts plus the accepted S11 no-preference motion lifecycle and shared Composer no-handler sentinel.

Commands from `balencia-screens/`:

```bash
npm run check
npm run build
node scripts/verify-visual-104.mjs --strict --screenshots --only 09,10,11,51,74,75,76,77,79,99 --base http://localhost:3001 --out ../plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/b1-after.json --shots-dir ../plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/after
node scripts/verify-b1-cia.mjs http://localhost:3001 ../plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/b1-interactions.json ../plans/batches/VISUAL-006-B1-cia-chat-voice/evidence/states
```

From root:

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
git diff --check
git -C yhealth-app diff --check
```
