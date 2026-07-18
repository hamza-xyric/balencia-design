# VISUAL-001 B1 — Cia, chat and voice audit

Date: 2026-07-10 PKT
Scope: exactly `09,10,11,51,74,75,76,77,79,99` at `/screens/<id>`; screen 78 is not part of this family.
Evidence: `../audit-sheets/B1-cia-chat-voice.png`, individual PNGs under `../baselines/local-baseline/`, current modules/specs/kit/canon, strict JSON, existing remediation evidence and the embedded 19-lens Design Auditor rubric.
Owner/status convention: Sol/root owns acceptance and shared files; future disjoint screen changes belong to a Terra builder and independent Terra reviewer. Every finding below is **open / not implemented** unless its status cell names a stronger blocker.

## Verdict

None of the ten screens is acceptable as-is. Screen 77 is a release blocker because required shared-media content and the completion control are clipped and unreachable. The other nine require bounded fixes under existing or newly filed systemic authority. Current strict evidence reports no issue on the family and only the known 34px tabs on screen 51, demonstrating that the scanner does not detect inert controls, privacy gaps, state ambiguity, message metadata or content clipping reliably.

## What is working

- Human/Cia visual roles are clear, warm-dark glass hierarchy is consistent, and orange action versus purple intelligence semantics are generally disciplined.
- Several screens expose useful source, retention, masked-identity and provenance language.
- ConsentRail uses real buttons where it appears; no obvious confirmshaming or coercive monetization appears in this family.
- Global reduced-motion CSS covers shared orb/voice/entrance/chart classes, providing a base to extend.

## Systemic roots

1. Shared Composer/VoiceComposer and GlassPillInput render controls as spans/divs: A24-002/A24-010, RW-R0-02/07.
2. Privacy/consent actions can look actionable while remaining inert: RW-R0-03/14, A24-007.
3. The Cia orb is not visually state-bearing: RW-VF-03; naming remains A24-008/RW-009.
4. ChatBubble lacks time, delivery/read, source and live-update metadata: RW-R0-07/15, RW-VF-08, A24-010.
5. SafetyCard promises call/text/local support without an actionable entry: RW-R0-01.
6. CTA state/contrast and small-text tokens inherit RW-VF-01/02/05.
7. Signature icon direction inherits RW-VF-04; utility Lucide actions may remain.

## Finding ledger and per-screen disposition

| ID(s) | Screen / route | Severity | Class | Before evidence | Affected component/file | Proposed fix | Acceptance criterion | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| RW-R0-02/07/15; A24-002/008/010; RW-VF-08 | 09 `/screens/09` | High | Systemic kit + local consumer | `../baselines/local-baseline/09.png`; B1 sheet | `S09CiaChat.tsx`, `kit/cia.tsx` Composer/ChatBubble/thinking state | Make suggestions and composer native/operable; expose live thinking/reply and message metadata | Suggestions are named 44px controls; real input and attach/mic/send buttons; live updates and time/status/source are available without visual clutter | Sol shared; Terra screen | Open |
| A24-002/010/014; RW-R0-07/14; RW-VF-08 | 10 `/screens/10` | High | Local + systemic controls/state | `../baselines/local-baseline/10.png` | `S10CiaVoiceInChat.tsx`, voice controls/transcript | Use a named recording toggle, announce transcript updates and separate granted-versus-unresolved consent states | Recording/mute exposes state; transcript is live; first capture is consent-gated or visibly already granted; Cancel/Send have focus/disabled/loading states | Sol shared; Terra screen | Open |
| RW-VF-03/08; A24-002/008/010; RW-R0-02/07 | 11 `/screens/11` | High | Systemic orb/control + local state | `../baselines/local-baseline/11.png` | `S11CiaVoiceFullScreen.tsx`, `kit/cia.tsx` orb and mic | Implement all required orb states and make central mic a native toggle | Idle/listening/thinking/speaking/success/muted are visually and semantically distinct without relying on color/motion; reduced-motion static variants pass; mic is ≥44px and exposes pressed/muted | Sol shared; Terra screen | **Blocked on Image 1 for final art direction** |
| RW-R0-01/07; A24-010/014; RW-VF-05 | 51 `/screens/51` | High | Systemic safety + local tabs/rows | `../baselines/local-baseline/51.png` | `S51VoiceCallHistory.tsx`, SafetyCard, tabs/session rows | Repair tabs, row semantics and safety entry | Tabs are ≥44px with tab relationships; rows are operable or lose interaction cues; crisis/local support is reachable | Sol shared; Terra screen | Open |
| RW-R0-07; A24-008/010; RW-VF-01/05 | 74 `/screens/74` | High | Systemic input + local naming | `../baselines/local-baseline/74.png` | `S74ConversationsHub.tsx`, GlassPillInput | Replace decorative search with a labeled field and preserve hierarchy/FAB | Search focus/value/clear states work; compose FAB remains ≥44px; readable rows and `Cia` naming pass | Sol shared; Terra screen | Open |
| RW-R0-02/07/15; A24-002/007/010; RW-VF-08 | 75 `/screens/75` | High | Systemic composer/metadata + local consent | `../baselines/local-baseline/75.png` | `S75DirectChat.tsx`, Composer, ChatBubble, assist chips | Convert assist chips/composer, expose consent consequence and message metadata | Assist actions are explicit native buttons; composer is operable; delivery/time/source metadata is available; private draft remains unambiguous | Sol shared; Terra screen | Open |
| RW-R0-02/03/07/14/15; A24-002/007/010; RW-VF-08 | 76 `/screens/76` | High privacy | Systemic controls/trust + local group claim | `../baselines/local-baseline/76.png` | `S76GroupChat.tsx`, AvatarStack/composer/Cia recap | Make members/composer actions operable and expose group-derived source/audience consent | Members sheet trigger, real mention/send controls, source/audience consent, and revoke/delete/report are directly reachable | Sol shared; Terra screen | Open |
| RW-R0-08; A24-010; RW-037 | 77 `/screens/77` | **Blocker** | Local layout | `../baselines/local-baseline/77.png` visibly omits shared media/Done | `S77MessageActions.tsx` sheet `overflow-hidden` and non-scroll content | Give sheet content a safe scroll region and preserve action hierarchy | Selected message, reactions, every action, shared media and Done remain reachable at 390×844 and enlarged text; destructive flows include equal-weight Cancel | Terra screen; Sol accept | **Release blocked** |
| RW-R0-07; A24-008/010; RW-VF-08 | 79 `/screens/79` | High | Local interaction + systemic state | `../baselines/local-baseline/79.png` | `S79CallSummary.tsx` action-item rows | Convert decorative circles/rows to named checkboxes or buttons with feedback | ≥44px controls expose checked state and undo; text labels preserve chart meaning; `Cia` naming passes | Terra screen; Sol accept | Open |
| A24-005/007/010; RW-R0-03/08/14; RW-VF-02/07/08 | 99 `/screens/99` | High privacy/layout | Local layout + systemic capability/control | `../baselines/local-baseline/99.png` shows wrapped CTA and truncated title | `S99WhatsappInbox.tsx`, compliance/footer actions, CTA grid | Reflow CTA/title and make manage/revoke/delete/export/retention actions real with dependency truth | CTA is balanced at 390px; full title is readable; privacy actions have confirmation/outcome states; readiness dependency remains explicit outside the frame | Terra screen; Sol accept | Open; operational dependency remains A24-005/RW-031 |

## Family exit criteria

- Every visual affordance is native or has correct role, name, keyboard behavior, state, focus-visible treatment and ≥44px target.
- Visible coach copy is `Cia`; orb state is distinct, accessible and reduced-motion safe.
- Composer/search use real inputs; chat/voice changes and delivery/source metadata are available.
- Data-derived group/intelligence claims state source, audience and consent; revoke/export/delete/report remain reachable.
- Screen 77 and screen 99 pass 390×844 plus enlarged-text inspection without clipping or destructive-choice imbalance.
- Shared CTA/text fixes meet RW-VF-01/02/05.

No code was changed. Worker evidence requested the Terra design-reviewer profile, but actual model/effort provenance is not exposed by the collaboration runtime. Image 1 and Image 2 remain unavailable, so no orb/CTA/icon art direction was chosen.
