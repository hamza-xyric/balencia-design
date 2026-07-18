# VISUAL-005 A2 verification log

- Acceptance date: `2026-07-10 PKT`
- Scope: `05,05b,06,07,08,65,66`
- Result: `PASS — Sol accepted with evidence-only waivers`
- Product/readiness limit: visual-prototype family acceptance only; not production or final 104-screen certification.

## Deterministic gates

| Gate | Result | Durable evidence / note |
|---|---|---|
| `npm run check` | PASS | Zero errors. One pre-existing unrelated unused-import warning in `DomainDashboardHeader.figma.tsx`; routes `104/104`, assets, copy and brand pass. |
| `npm run build` | PASS | Next.js compiled and statically generated `200/200` pages. Only the existing `module.register()` deprecation warning remains. |
| Strict A2 visual audit | PASS | `a2-after.json`: `7/7`, zero issues, zero warnings, zero missing phone frames and zero console-error screens. Defaults are in `after/`. |
| Hardened A2 interaction/state audit | PASS | `a2-interactions.json`: seven screen groups plus integrity gate, `61/61` canonical PNGs, `62` storage-cleared query/hash nonces, reduced motion, zero console/page/capability events. |
| Product/API integrity | PASS | Product source hash `de4472c90a67adf5950989092593a3992c4f920542f80db9af5ed06519295bee`; accepted API hash `71247fc68608c967efa5ea2acf6c0bfa413094c47eb0c620241440e15a631c1b`; start/end hashes match. |
| Root redesign validator | PASS | `104` ledger rows and `104` screen files; no missing files, low scores, defects, false passes or uncovered routes. |
| Root + submodule `git diff --check` | PASS | No whitespace errors; the forbidden dirty `yhealth-app` state was preserved. |
| Independent code/verifier review | ACCEPT | Product blockers and verifier false-pass risks were repaired and rechecked. |
| Independent design/source review | ACCEPT | Cache-busted originals and pixel inspection confirm complete paint, hierarchy, official assets and truthful state framing. |
| Independent accessibility/trust review | ACCEPT | Honest minimal payload, live announcements, one-h1 fixtures, equal notification decline and distinct store/permission loading accepted. |

## Evidence hardening before acceptance

- Each fixture clears cookies and Chromium origin storage, opens through `about:blank`, and receives a unique same-origin query/hash nonce.
- S05/S05b/S06 prove both query and hash fixture transports; S05b seeds a secret sentinel while the saved report redacts it.
- Secret guards cover phone DOM, all form-control values, pseudo-content, resource URLs, local/session storage, cookies, console output and non-document requests. IndexedDB and Cache Storage opens are forbidden capability events.
- Capture cleans the PNG directory and enforces the exact `61`-file name set. Fixture opens reset scroll; interaction captures preserve intentional scroll so visible feedback is actually evidenced.
- Eight interaction/base screenshot pairs must differ byte-for-byte, preventing replayed or reset-to-default privacy, crisis, queue, decline, manage and settings evidence.
- Recovery live regions explicitly include the masked destination; reset-rule and terminal-token changes are live; the guest fourth-choice rejection is a visible atomic status.
- The accepted S07 sentinel is re-opened between privacy, crisis, send and skip-health interaction captures so state evidence is isolated rather than cumulative.

## Accepted residual waivers

| Waiver | Scope | Closure owner/trigger |
|---|---|---|
| Device VoiceOver/TalkBack and enlarged-text testing unavailable | Final certificate only; browser semantics, keyboard, focus, target and reduced-motion evidence pass | R11 / external device evidence or explicit release waiver |
| Broad Axe unavailable | Final certificate only | R11 |
| Dirty-worktree evidence has no immutable family SHA | Final one-SHA 104-screen claim only | R11 after user-authorized commit state |
| Exact spawned runtime model/effort is unexposed | Provenance only; packets, agent IDs, ownership and Sol verification are recorded | Runtime support or persistent waiver |
