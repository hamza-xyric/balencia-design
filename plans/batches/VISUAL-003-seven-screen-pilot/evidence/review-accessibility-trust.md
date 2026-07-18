# VISUAL-003 independent accessibility and trust review

- Packet: `PILOT-INDEPENDENT-A11Y-TRUST`
- Reviewer posture: fresh, read-only independent reviewer
- Date: 2026-07-10
- Recommendation: **ACCEPT for pilot acceptance** (Sol retains the final readiness decision)
- Severity summary: **0 Critical, 0 High, 0 Medium**

## Closed acceptance finding

### Closed — screens 07 and 11 now provide the authored visible focus treatment

- `S07CiaOnboarding.tsx:19-26` now consumes the shared `VoiceComposer`; `cia-composer.tsx:62-65` applies `focus-within:border-brand-orange` and `focus-within:shadow-[var(--focus-ring)]` to its native `Message CIA` input container.
- `S11CiaVoiceFullScreen.tsx:60-75` applies the same authored focus treatment to the keyboard-mode `Message CIA` form while preserving its native label and autofocus behavior.
- Direct rendered evidence `states/07-input-focus.png` and `states/11-keyboard-focus.png` shows the focus boundary against the final composites. The updated verifier focuses both inputs, asserts each parent computed shadow is not `none`, and passes.
- The prior High is closed. No High or Critical accessibility/trust reason to reject the pilot remains in this review scope.

## Concurrent-state reconciliation

- The later S03 enhancement preserves the accepted form semantics and adds explicit `default` → `loading` → `error` prototype states. Submit exposes `aria-busy`, keeps the CTA width locked, and ends in a visible `role="alert"` stating that the account was not created and the details were not sent. `Try again` plus input editing provide an honest recovery path.
- S07 now consumes the shared `VoiceComposer`: the native 44px/16px composer retains the authored `focus-within` ring, disables unavailable attachment and empty-send actions, announces local status, sends typed text into the visible user bubble, and preserves the mic disclosure through `aria-describedby` before capture.
- S07 focus-area and `Skip health data` controls now update `aria-pressed`, visible status, and each other coherently; choosing skip clears health focus selections while privacy/crisis access remains unchanged.
- Rendered `states/03-loading.png`, `03-error-top.png`, `07-composer-sent.png`, and `07-focus-area-top.png` preserve the full composition and show the corresponding state messages. No new accessibility, consent, privacy, or state-honesty finding was introduced.

## Final stability reconciliation

- The final synchronized S07 source still consumes `VoiceComposer`, keeps the pre-capture disclosure connected through `aria-describedby`, exposes voice and focus selections through `aria-pressed`, and preserves the functional typed-send, focus-area, skip-health, privacy and crisis outcomes described above.
- S07 domain microtext now uses paper text over the domain-tinted surfaces. The refreshed interaction report measures the four composites at `17.99:1`, `18.48:1`, `18.34:1`, and `18.61:1`.
- Refreshed interaction, pilot-strict and foundation-strict artifacts remain clean. No regression or new Critical, High or Medium finding is present; **ACCEPT remains the recommendation**.

## Obligations that pass

- **03:** one page `h1`; native labelled email/password controls; stateful 44px reveal; native legal links; AA burnished-ember CTA; honest busy/no-send error/retry behavior with live status semantics.
- **07/11 voice safety:** idle-first orb and mic-off state; retention/delete disclosure is visible before explicit capture; mic, stop/pause, keyboard, mute, privacy and support controls are native and labelled; both text alternatives have visible authored focus; S07 typed send and focus/skip selections produce coherent local outcomes; crisis/support content is reachable; reduced motion preserves structural idle/listening differences.
- **12 Life Power:** one ordered ten-domain payload drives polygon, visible score, count, strongest/lowest summary, sources and accessible summary. The fixture recomputes to `487`; no visible aggregate is hardcoded in the screen or shared visualization.
- **26 health:** `78%` renders as seven full ticks plus one 80%-filled tick; recovery/sleep/HRV and charts name source/freshness; all nine data controls are links; non-medical stop/seek-help boundary is present; HIFI-26-01 is privacy-safe generic equipment media.
- **43 monetization:** canonical `PaywallLock` wraps a real attempted-feature layout; comparison is a captioned semantic table with the retained Free/Plus/Pro text values; CTA makes no unverified trial claim; storefront provenance, eligibility caveat, cancellation and equal 44px exits are visible.
- **80 provider/media:** connected state says `Manage Spotify` and never `Connect Spotify`; the seek control is a labelled native range and advances by keyboard; W-TRUNC-80 copy is intact; source/freshness plus full data-control links and direct export/revoke/disconnect/delete affordances remain visible; HIFI-80-01 contains no provider or generated Balencia branding.
- Shared action contrast evidence matches live tokens; the recorded normal-text pairs meet at least `4.5:1` and the focus accent is `6.45:1` against ink.

## Verification and evidence inspected

- Current screen modules `03,07,11,12,26,43,80`; their consumed kit/layout modules; `globals.css`; `scripts/verify-pilot-seven.mjs`.
- Current seven hi-fi specs, compact canon/component catalog and relevant A1/A2/B1/C1/F1/D2/I1 audit obligations.
- `pilot-after.json`; all seven initial PNGs; the exercised-state PNGs including `states/03-loading.png`, `03-error-top.png`, `07-input-focus.png`, `07-composer-sent.png`, `07-focus-area-top.png`, and `11-keyboard-focus.png`; `CONTRAST.md`, `LIFE-POWER-ASSERTION.md`, `HIFI-26-01.md`, and `HIFI-80-01.md`.
- Current accepted project evidence records `npm run check` **PASS** (lint, typecheck, routes, assets, copy and brand; zero errors) and final `pilot-interactions.json` **PASS** at `2026-07-10T06:40:10.701Z` for all seven, including the S03/S07 state assertions and measured microtext contrast, with zero console/page errors.
- Independent post-reconciliation run: `node scripts/verify-pilot-seven.mjs http://localhost:3001` — **PASS** at `2026-07-10T06:31:56.597Z` for all seven in reduced-motion context, with no console or page errors.
- Final pilot strict evidence at `2026-07-10T06:40:33.815Z`: **7/7 screens, 0 issue screens, 0 warning screens, 0 total issues, 0 total warnings**, with no missing frame or console-error screen.
- Final foundation strict evidence at `2026-07-10T06:40:52.091Z`: **14/14 screens, 0 issue screens, 0 warning screens, 0 total issues, 0 total warnings**, with no missing frame or console-error screen.
- Scoped `git diff --check` over the reviewed implementation paths — **PASS**.

## Residual limitations

- No VoiceOver/TalkBack/manual screen-reader session or enlarged-text pass was available; semantic source review and Playwright keyboard checks do not replace those final device checks.
- This is a visual-only prototype. Several product actions intentionally have no persistent/backend outcome (for example account/social authentication, workout, playback and provider mutations). S03 explicitly states its no-send boundary, and S07 now provides honest local interaction outcomes. This remains a prototype limitation, not evidence that capture, billing, provider deletion or emergency-service behavior exists. Privacy controls retain concrete `/screens/84` links, and the tested safety/exit/provider/billing state claims are not false.
- The reviewed browser evidence is tied to the current local server; `pilot-after.json` records `gitSha: null`, so it is not a final one-SHA release artifact.

## Scope confirmation

I made **no implementation edits** and did not modify source, shared kit, assets, specs, decisions, ledgers, handoff, Figma, Railway, backend/API/auth, or `yhealth-app`. The only write from this review is this evidence file.
