# B1 dedicated verifier worker evidence

## Status

Implementation complete for the bounded verifier slice. This worker did **not** run the B1 browser suite, product checks, production build, strict visual capture, or acceptance gates while the screen builders were active. Runtime verification and any product repair remain with Sol.

## Exact diff scope

- Added `balencia-screens/scripts/verify-b1-cia.mjs`.
- Added this evidence note.
- No screen, shared kit, CSS, asset, route, package/lock, batch/source/ledger/handoff, `yhealth-app`, provider, backend, network, or persisted-state file was edited by this worker.

## Implemented coverage

- Exact positional command: `node scripts/verify-b1-cia.mjs <baseURL> <out-json> <shots-dir>` plus read-only `--help`/`-h` output.
- Locked root/state enums for S09, S10, S51, S74, S75, S76, S77, S79 and S99; accepted S11 uses only its existing CIA orb attributes.
- Exactly 108 unique canonical PNG names, one screenshot case per isolated reduced-motion browser context, plus one separate no-preference S11 visibility case (109 contexts/nonces total).
- 1440×1000 host viewport, DPR 1, exact 390×844 phone/PNG geometry, unique `__b1audit` nonce, fresh cookie/origin storage, exact query retention, two RAFs after the stable root and recursive top-scroll reset.
- Pre-app guards and Node request/navigation guards for mic/getUserMedia, MediaRecorder, speech recognition, WebRTC, media playback, share, beacon, popup, external/tel/sms/provider navigation, object URLs/downloads, WebSocket/EventSource, API/non-GET traffic, storage, cookies, IndexedDB and Cache Storage.
- Sol’s final clipboard ruling: exactly one stubbed `navigator.clipboard.writeText` call in `77-success`, exact payload `Perfect. I added the hill loop near the reservoir.`, no call to the host clipboard implementation; every other guarded capability must remain zero.
- Per-case console/page error rejection, storage/cookie emptiness and network/capability accounting.
- Start/end SHA-256 fingerprints for all ten B1 modules plus the CIA index, accepted shared APIs and active B1 source authority.
- Pass-atomic screenshot staging in a sibling temporary directory. Canonical names are removed up front; staged files are promoted only after every assertion passes. Missing/unexpected files, duplicate names, invalid PNGs, wrong dimensions or changed per-PNG hashes fail the run.
- Global semantic/visual gates: one h1, phone and descendant overflow checks, home-indicator clearance, native control semantics, keyboard reachability/roving tabs, unique names, effective 44px targets, authored focus, 16px fields, explicit disabled reasons, loading `aria-busy`, normal/hover/pressed action contrast, message-time contrast, one atomic polite live source on the nine B1 builds, stale `Cia` rejection and reduced-motion loop settlement before animation freezing.
- Shared message metadata validation for S09/S75/S76 and the S79 transcript highlight, including allowed statuses, identity/speaker/source/audience, visible valid `<time datetime>`, attachment source and retention, and private-to-you draft/recap boundaries.
- Interaction coverage for S09 search/voice focus containment and both send paths; S10 consent/decline, local voice toggle, recovery/copy/transcript/safety; accepted S11 mic/keyboard/send/mute/support/close plus visibility pause/resume; S51 tabs/panels/native action item; S74 search/compose/routes/filter; S75 assist/health consent/online/offline delivery; S76 members/recap/post/send; S77 reactions/copy/delete/top/max-scroll/125% text; S79 tone/evidence/privacy/reversible action item; and S99 provider warnings/revoke/delete/default/125% CTA geometry.
- S77 additionally proves the dedicated scroller is the sole sheet-body scroller, iterates every operable control into view, compares persistent Done top/max-scroll geometry, and checks equal Cancel/destructive geometry and surviving deleted/error outcomes.
- S99 additionally checks the complete `WhatsApp inbox` title, one-line balanced primary CTAs, masked provider identity, direction/time/delivery row names and distinct local-only provider/revoke/delete outcomes.

## Static commands run

From `balencia-screens/`:

```bash
node --check scripts/verify-b1-cia.mjs
node scripts/verify-b1-cia.mjs --help
npx eslint scripts/verify-b1-cia.mjs
rg -o "'[0-9]{2}-[^']+\\.png'" scripts/verify-b1-cia.mjs | sort -u | wc -l
rg -n "assert\\(EXPECTED_SCREENSHOTS.length === 108|caseEvidence.length === 109|clipboard\\[0\\]\\.detail ===|hostClipboardTouched: false|textScale: 1\\.25|reducedMotion: 'no-preference'|fingerprintAll\\(\\)|tempShotsDir" scripts/verify-b1-cia.mjs
```

Results: syntax pass; help signature exact; scoped ESLint zero errors/warnings; canonical unique-name count `108`; static sentinel assertions present.

## Residual blind spots before Sol execution

- No live route was opened and no screenshot was produced by this worker, per the packet’s builder-in-flight restriction. Runtime selector timing, focus restoration, app geometry and browser capability accounting remain unproven until Sol runs the integrated command.
- The 125% evidence is deterministic root-font enlargement in Chromium, not physical-device Dynamic Type testing.
- Computed contrast checks composite CSS colors through ancestor backgrounds; they do not pixel-sample gradients, images or subpixel antialiasing.
- Host clipboard safety is guaranteed structurally by replacing `navigator.clipboard` before app JavaScript; the verifier intentionally does not read or mutate the operating-system clipboard to compare its contents.
- S11 is accepted/read-only. It receives the accepted enabled-control, input-shell, focus, contrast, overflow, motion and interaction checks. Its pre-existing 40px keyboard input is accepted only inside its verified 44px shell, and its closed-state disabled header buttons are not forced to add new B1-only `aria-describedby` wiring.
- Same-origin Next document/static traffic and `/_next/` development WebSocket infrastructure are allowed; application WebSocket/EventSource, API, mutation and external traffic remain forbidden.

## Handoff

Sol should run the full recorded gate only after both builders finish, then treat any failure as product-or-verifier evidence requiring source-backed repair. This worker makes no acceptance or readiness claim.

## Sol integration addendum

The worker's static handoff above is preserved as historical evidence. Sol subsequently reviewed and hardened the verifier during integration:

- Added the verifier script itself, the shared Composer S40 sentinel, and the exact HIFI-75 asset bytes to the integrity fingerprint/expectation.
- Added semantic-copy minimum-size enforcement, S10 consent-denial and recovery auto-reveal proof, S11 no-microphone capability honesty, S51 recording-specific deletion, S74 disabled/offline state restoration and fixture-qualified signal truth, S75/S76 in-product send auto-reveal and equal sensitive choices, S76 group-action modal focus/parity/outcome proof, S77 empty/local-removal truth, S79 partial-data suppression, and S99 phone-bound modal/revoked-state proof.
- Added one canonical `76-group-action-confirm.png`, bringing the exact promoted set to `109` PNGs while retaining 111 isolated contexts: 109 capture contexts, one S11 no-preference motion context, and one shared Composer sentinel.
- Final pre-close product fingerprint: `ba5b4ea6fdd9d13fd7c02f081ccfb4e04aa39b9fdd049912dd21848b9e68796b`.
- Final pre-close verifier/API fingerprint: `18cfc1b1a455ce2b5dcd937d98a739d1c96805b7c6565ae0067e695d195e3c2e`.
- Pre-close authority fingerprint: `70420f1708d27bb26cc8cf68fa6344af93f1d2dddada651ed11c85aa242ff795`.
- Integrated browser result: `PASS`, `111/111` isolated contexts/nonces, `109/109` exact 390×844 PNGs, stable start/end fingerprints, zero console/page errors, zero forbidden capability events, and the one expected intercepted S77 clipboard payload with no host clipboard mutation.

This addendum records Sol's integration evidence; it does not retroactively turn the worker into the final acceptor.

## Final authority hash (post-close reconciliation, 2026-07-11)

Recorded final B1 authority fingerprint at family acceptance (DVF-13):
`ca2caf01242bf3b76ce0b9180a6f61676f0fa7ef343910d9dc4cc66abe18a326`.
This supersedes the pre-close authority fingerprint above for citation purposes; the pre-close value remains historical evidence. No product, verifier, batch, matrix or worker-packet file was modified by this append.
