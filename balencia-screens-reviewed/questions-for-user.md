# Questions For User

Source: `batches/batch-01.md` through `batches/batch-18.md`, cross-checked with `findings/deferred-decisions.md`.

Status: answered on 2026-05-26 and propagated into `findings/deferred-decisions.md` plus the batch summaries. Creative production gates: [../balencia-creatives-production/decisions/creative-decisions.md](../balencia-creatives-production/decisions/creative-decisions.md).

## Prototype Acceptance Scope

Q01. For this audit, should static/no-op controls be scored as launch-blocking, or should visual fidelity and interaction readiness be tracked separately? Sources: B01, B02, B03, B04, B05, B08, B09, B17.
Q01: Track visual/UX acceptance separately from implementation; no-op controls are not design-audit blockers but remain production findings.

Q02. Should direct overlay routes demonstrate full trigger, dismiss, and native-API state machines, or are static visual states acceptable for this prototype phase? Source: B17.
Q02: Static overlay visuals are acceptable for prototype acceptance; full native trigger, dismiss, and API state machines are implementation backlog.

Q03. Should stack-header back chevrons that are visual-only be treated as a global implementation defect, or as a known prototype limitation already covered by Q01? Source: B08.
Q03: Treat visual-only back chevrons as the Q01 prototype limitation, while keeping production navigation and accessibility findings.

Q04. Do medication and energy logs need local prototype persistence for audit acceptance, or is stateful front-end behavior enough for this pass? Source: B16.
Q04: In-session front-end state is enough; no local persistence is required for this audit pass.

Q05. Should Spotify and YouTube flows be functional in the prototype, or should media screens clearly present demo recommendations until provider integration work lands? Source: B18.
Q05: Use honest demo recommendations for Spotify and YouTube; do not imply live sync until integrations exist.

## Auth, Onboarding, And Entry

Q06. Is date of birth a legal age-gate requirement at account creation, or can it be deferred until a clear personalization or health context? Source: B01.
Q06: DOB is not an account-creation legal gate; defer it until a clear health or personalization need.

Q07. Should date of birth and gender block social-auth users before they experience SIA, or can either be deferred until a health or personalization moment? Source: B02.
Q07: DOB and gender should not block social-auth users before SIA; collect them later with context.

Q08. Should first name stay in account creation, or move into SIA onboarding where the value is immediate? Source: B01.
Q08: Move first name into SIA onboarding; keep account creation minimal.

Q09. What exactly is the WhatsApp coaching promise: message frequency, opt-out language, country support, and where users can disable it later? Source: B02.
Q09: WhatsApp is optional coaching and reminder delivery: explicit opt-in, message types, approximate frequency, STOP opt-out, country code support, and a Settings disable path.

Q10. Should the guest preview include the full phase-2 demo shell now, or should it be treated as an entry-form placeholder until later? Source: B03.
Q10: Guest preview can remain an entry-form placeholder for this prototype, labeled as preview/demo.

Q11. How much of SIA onboarding should be interactive in the prototype: enough to reach Initial plan, or a full conversational simulation? Source: B03.
Q11: Make SIA onboarding interactive enough to reach Initial plan; no full conversation simulation is required.

## SIA, Privacy, And Sensitive Data

Q12. Should Screen 10 remain a directly routable prototype screen, or should it only exist as a state inside `/tabs/sia` as the spec describes? Source: B04.
Q12: Screen 10 may remain directly routable for QA, but production should treat it as `/tabs/sia` state.

Q13. What is Balencia's voice privacy model: microphone permission timing, auto-send behavior, transcript retention, and transcript deletion? Source: B04.
Q13: Request mic permission only on voice entry; retain transcripts/SIA memory only with clear consent, discard raw audio by default, allow delete/edit, and exclude from model training or human review.

Q14. What is the intended SIA privacy boundary in direct and group chats: always-on assistant, explicit invocation only, or per-thread opt-in? Source: B05.
Q14: SIA in chats should require explicit invocation, not always-on analysis.

Q15. Can group chats expose health or recovery signals about individual members, or should SIA only share consented aggregate guidance? Source: B05.
Q15: Group health and recovery signals require explicit per-user permission; default to aggregate or non-sensitive guidance.

Q16. What privacy and consent granularity should relationship nudges expose before SIA uses social contact patterns as coaching evidence? Source: B11.
Q16: Relationship nudges need per-person/data-category consent, snooze/dismiss, intensity controls, and no contact-pattern inference without opt-in.

Q17. What exact privacy promise can Balencia make for progress photos and AI body composition analysis: device-side encryption, no human review, model-training exclusion, deletion timing, and tier gating? Source: B09.
Q17: Progress photos are encrypted in transit and at rest, private by default, never used for human review or model training, user-deletable with a backup-deletion target, and AI body analysis is premium opt-in.

Q18. Should Image Viewer allow progress-photo sharing in V1, and if yes, what exact encrypted-photo warning or confirmation is required? Source: B17.
Q18: Do not allow progress-photo sharing in V1; later sharing needs a decrypted-copy warning and explicit confirmation.

Q19. For journaling, which parts are free in V1 and which SIA prompt, analysis, memory, or voice-entry surfaces should be premium-gated? Source: B12.
Q19: Free journaling includes write/read/edit/delete/basic search; premium gates SIA prompts, analysis, memory ingestion, and voice transcription.

Q20. What exact data scopes, deletion behavior, and revocation messaging should each external integration expose before OAuth? Source: B08.
Q20: Every OAuth flow must preview scopes, purpose, sync frequency, storage, disconnect, delete-synced-data, and revocation behavior before connect.

Q21. Are data-source connect, refresh, permissions, and disconnect flows required for prototype acceptance, or can this screen remain a visual trust placeholder until integration work? Source: B10.
Q21: Data Sources may remain a visual trust placeholder for prototype acceptance, clearly marked demo/no live sync.

Q22. What is the exact privacy boundary for SIA-assisted buddies and accountability contracts: what can partners see, what can SIA read, and what requires explicit opt-in? Source: B18.
Q22: Accountability partners see only opted-in contract terms, proof, and check-in status; SIA reads contract/thread data only with explicit consent.

## Navigation And Route Architecture

Q23. Should Call summary use the same follow-up scheduling sheet as Voice call history, or a smaller post-call-only scheduler? Source: B06.
Q23: Reuse the same follow-up scheduling sheet as Voice call history, prefilled from Call summary.

Q24. Is Create mission allowed to open in a prefilled structured demo state, or must the first state always be the blank natural-language input from the spec? Source: B06.
Q24: Create mission should start with blank natural-language intent input; demo examples can be chips or fixtures.

Q25. Should Streak details live under Me/RPG with Me active, under Goals/Missions, or preserve the source tab context from wherever the user enters? Sources: B06, B07.
Q25: Streak details should preserve source tab context, with Me/RPG as the canonical deep-link owner.

Q26. Should Mission Journal preserve Me-stack context when launched from Me, or intentionally switch the user into the Goals tab? Source: B07.
Q26: Mission Journal should preserve the source stack, not force-switch to Goals.

Q27. Should Exercise Library belong under the Fitness/Today stack, Goals workout planning, or preserve the source tab from wherever the user enters? Source: B12.
Q27: Exercise Library should preserve source context; canonical owner is Fitness/Today, with Goals workout-planning entry supported.

Q28. Should Screen 29 stay as one route with entry-mode state for meal view vs food logging, or should meal detail and food logging split into separate routes? Source: B11.
Q28: Split meal detail and food logging into separate explicit routes or route modes backed by one shared component.

Q29. Should Screen 31 remain the shared transaction/budget destination, and if so, how should the finance dashboard pass the selected transaction or budget context? Source: B11.
Q29: Keep a shared finance detail component, but pass explicit `type` plus ID/context from the dashboard.

Q30. Should `/domains/workout` contain planning, active, paused, and summary modes, or should manual logging and active tracking split into separate routes? Source: B10.
Q30: Split workout planning/manual logging from immersive active workout, pause, and summary modes.

Q31. Should breathing active sessions live as inline state on `/features/breathing`, or as a dedicated immersive sub-route with no tab bar? Source: B14.
Q31: Breathing active sessions should use a dedicated immersive sub-route/mode with no tab bar.

Q32. Should Celebration overlay be accepted as a directly routable QA screen, or should prototype acceptance require it to trigger from habit, mission, workout, and level-up events? Source: B13.
Q32: Direct Celebration route is fine as a QA fixture; production acceptance requires event-triggered overlays.

## Monetization, Access, And Social Exposure

Q33. Should Life Areas comparison modes be a Plus upsell, always available after enough history, or disabled until subscription state is known? Source: B07.
Q33: Life Areas comparison is Plus-gated after enough history; show preview/upsell only when data exists.

Q34. Should Explore tier badges mean locked, included in this tier, or requires this tier, especially when the user is already shown as Plus? Source: B07.
Q34: Tier badges mean minimum required tier; for current-tier features show "Included," not locked.

Q35. Which billing platform rules should drive upgrade, downgrade, annual pricing, restore purchases, and cancellation states? Source: B08.
Q35: Mobile billing should follow Apple IAP/StoreKit and Google Play Billing: localized pricing, restore, trial eligibility, cancellation, downgrade/upgrade, errors, and entitlement sync.

Q36. Should social V1 support global/country rankings and public rooms, or stay friends/private-first until report, block, and moderation flows are wired? Source: B13.
Q36: Social V1 stays friends/private-first until report, block, moderation, and visibility controls are wired.

Q37. Should accountability and competitions be visible-but-locked for non-Plus users, or hidden until the user has Plus/social consent configured? Source: B14.
Q37: Show accountability and competitions as visible locked previews for non-Plus; activation requires Plus and social consent.

Q38. Should competitions include a self-only or private challenge mode for users who want motivation without public comparison? Source: B14.
Q38: Yes, include self-only/private challenge modes.

Q39. Should low-motivation users see locked achievements at launch, or should the motivation-adaptive version hide most locked badges as the spec suggests? Source: B09.
Q39: Low-motivation users should see only earned/near-next achievements; hide most locked badges.

Q40. Should the paywall prototype model IAP-adjacent states now, including trial eligibility, processing, success, cancellation, restore, and errors, or remain a visual placeholder until billing work starts? Source: B13.
Q40: Paywall prototype should model IAP-adjacent visual states now, without live billing.

Q41. Should Recipes and Shopping list V1 support real create, save, log, add, check-off, share, and clear mutations, or only a read-only curated preview? Source: B15.
Q41: Recipes and Shopping List V1 should support lightweight real mutations; sharing only after review and without private AI/health context.

Q42. Should V1 allow reviewed report sharing/export, or does the "no data export for V1" design-direction decision still hold? Source: B18.
Q42: Preserve no data export for V1; reports stay in-app with screenshot-level sharing only.

## Feature-Specific Product Decisions

Q43. Should Knowledge Graph ship as a true interactive force graph, or should V1 use a more guided insight-map pattern? Source: B10.
Q43: Ship V1 Knowledge Graph as a guided interactive insight-map, not a raw force graph.

Q44. Should the spirituality prototype demonstrate one configured Muslim user, or must it show the belief-selection/adaptive fallback model before acceptance? Source: B12.
Q44: Spirituality must be belief-adaptive; include a Muslim configured demo state, but also unconfigured and other-belief states.

Q45. Should meditation and yoga active-session states be fully operable in the prototype, or are inline previews acceptable until implementation work begins? Source: B15.
Q45: Meditation/yoga should demonstrate real library-to-active-to-complete modes; no inline preview-only acceptance.

Q46. Should Quick Notes V1 prioritize the global bottom-sheet capture experience from the spec, or is the full-screen archive route acceptable as the first prototype target? Source: B16.
Q46: Quick Notes V1 should prioritize global bottom-sheet capture; full archive is secondary.

Q47. Should Report / Block ever default `also block this user` to on, or should the spec's default-off safety posture remain strict? Source: B16.
Q47: Report/Block must keep "also block this user" default off.

Q48. Should App Rating have separate prototype fixtures for unselected, positive, negative, submitted, and cooldown/suppressed states? Source: B17.
Q48: Yes, create rating fixtures for initial, positive/native prompt, negative feedback, submitted, cooldown, and suppressed states; avoid manipulative pre-gating.

Q49. Which sleep accent is canonical for Screen 58: the spec's wellbeing-teal register or the live domain-sleep indigo treatment? Source: B15.
Q49: Sleep accent should be canonical `sleep-indigo`; wellbeing teal stays for broader wellbeing/stress surfaces.

Q50. Should Start reconnection accept the whole SIA plan in one tap, or require per-blocker accept/dismiss decisions first? Source: B07.
Q50: Start reconnection should show per-blocker accept/dismiss controls, with optional "accept all" only after review.
