# Resolved Deferred Decisions

Status: resolved from `../questions-for-user.md` on 2026-05-26.

This file keeps the historical `deferred-decisions.md` path for the audit workflow, but the previously deferred product, privacy, monetization, and prototype-scope decisions are now answered. Future audit questions should only be added here when they are genuinely unresolved.

## Decision Principles

- Prototype acceptance is design/UX focused: static or no-op controls can pass the design audit, but remain production implementation findings.
- Sensitive data collection follows progressive disclosure: ask only when there is clear value, consent, and a visible control path.
- AI-related capability is the paid differentiator; non-AI utility can be available in free or prototype contexts.
- Social is friends/private-first until safety, visibility, report, block, and moderation controls are wired.
- V1 preserves the no-data-export stance from the design direction; reports remain in-app with screenshot-level sharing only.

## Resolved Decision Matrix

| Q | Source | Area | Resolution | Implementation consequence |
| --- | --- | --- | --- | --- |
| Q01 | B01-D03, B16-D03 | Prototype acceptance | Track visual/UX acceptance separately from implementation; no-op controls are not design-audit blockers but remain production findings. | Audit grades should separate design readiness from functional launch readiness. |
| Q02 | B17-D01 | System overlays | Static overlay visuals are acceptable for prototype acceptance; full native trigger, dismiss, and API state machines are implementation backlog. | Overlay routes can be QA fixtures now, but production must wire native state paths. |
| Q03 | B08 scope question | Stack navigation | Treat visual-only back chevrons as the Q01 prototype limitation, while keeping production navigation/accessibility findings. | Do not globally fail static prototype screens for back chevrons, but keep launch findings. |
| Q04 | B16-D03 | Health logging | In-session front-end state is enough; no local persistence is required for this audit pass. | Medication and energy logging prototypes need visible state changes, not storage. |
| Q05 | B18-D02 | Media integrations | Use honest demo recommendations for Spotify and YouTube; do not imply live sync until integrations exist. | Music/video screens should show demo/provider-ready states without false live claims. |
| Q06 | B01-D01 | Auth | DOB is not an account-creation legal gate; defer it until a clear health or personalization need. | Remove DOB from first account creation unless legal scope changes. |
| Q07 | B02-D01 | Social auth | DOB and gender should not block social-auth users before SIA; collect them later with context. | Post-OAuth profile completion should not block first SIA value. |
| Q08 | B01-D02 | Auth/onboarding | Move first name into SIA onboarding; keep account creation minimal. | Name collection belongs where SIA uses it immediately. |
| Q09 | B02-D02 | WhatsApp enrollment | WhatsApp is optional coaching and reminder delivery with explicit opt-in, message types, approximate frequency, STOP opt-out, country code support, and a Settings disable path. | Phone collection needs trust copy and a clear disable/recovery path. |
| Q10 | B03-D01 | Guest preview | Guest preview can remain an entry-form placeholder for this prototype, labeled as preview/demo. | Full browsable demo shell is not required for this audit pass. |
| Q11 | Batch 03 | SIA onboarding | Make SIA onboarding interactive enough to reach Initial plan; no full conversation simulation is required. | Prototype must demonstrate the path to plan generation, not full AI chat depth. |
| Q12 | B04-D01 | SIA voice route | Screen 10 may remain directly routable for QA, but production should treat it as `/tabs/sia` state. | Keep QA route fixture, but build production as chat state. |
| Q13 | B04-D02 | Voice privacy | Request mic permission only on voice entry; retain transcripts/SIA memory only with clear consent, discard raw audio by default, allow delete/edit, and exclude from model training or human review. | Voice UI needs permission, consent, transcript control, deletion, and raw-audio handling states. |
| Q14 | B05-D01 | SIA in chats | SIA in chats should require explicit invocation, not always-on analysis. | Direct/group chats need user-invoked summarize/suggest/save actions. |
| Q15 | B05-D01 | Group health privacy | Group health and recovery signals require explicit per-user permission; default to aggregate or non-sensitive guidance. | Group insights must avoid identifying member health data without consent. |
| Q16 | B11-D03 | Relationship nudges | Relationship nudges need per-person/data-category consent, snooze/dismiss, intensity controls, and no contact-pattern inference without opt-in. | Relationship coaching requires visibility controls before SIA uses social patterns. |
| Q17 | B09-D01 | Progress photos | Progress photos are encrypted in transit and at rest, private by default, never used for human review or model training, user-deletable with a backup-deletion target, and AI body analysis is premium opt-in. | Photo capture, analysis, and retention UI needs explicit privacy and tier states. |
| Q18 | B17-D02 | Image viewer sharing | Do not allow progress-photo sharing in V1; later sharing needs a decrypted-copy warning and explicit confirmation. | Remove/disable progress-photo share in V1 image viewer states. |
| Q19 | B12-D03 | Journal monetization | Free journaling includes write/read/edit/delete/basic search; premium gates SIA prompts, analysis, memory ingestion, and voice transcription. | Journal must separate basic writing from AI and voice features. |
| Q20 | B08-D01 | OAuth/integrations | Every OAuth flow must preview scopes, purpose, sync frequency, storage, disconnect, delete-synced-data, and revocation behavior before connect. | Connected Services needs provider-specific consent and revoke/delete copy. |
| Q21 | B10-D03 | Data Sources prototype | Data Sources may remain a visual trust placeholder for prototype acceptance, clearly marked demo/no live sync. | No full connect/refresh/disconnect state machine is required for design acceptance. |
| Q22 | B18-D03 | Accountability privacy | Accountability partners see only opted-in contract terms, proof, and check-in status; SIA reads contract/thread data only with explicit consent. | Contracts and buddy profiles need partner visibility and SIA-read consent controls. |
| Q23 | Batch 06 | Call follow-up | Reuse the same follow-up scheduling sheet as Voice call history, prefilled from Call summary. | Build one scheduling component with context-specific defaults. |
| Q24 | B06-D01 | Create mission | Create mission should start with blank natural-language intent input; demo examples can be chips or fixtures. | Restore the input-first SIA planning flow. |
| Q25 | B06-D02 | Streak details | Streak details should preserve source tab context, with Me/RPG as the canonical deep-link owner. | Avoid forced tab switching; deep links can resolve under Me/RPG. |
| Q26 | B07-D04 | Mission Journal | Mission Journal should preserve the source stack, not force-switch to Goals. | Back behavior should return users to the entry context. |
| Q27 | B12-D02 | Exercise Library | Exercise Library should preserve source context; canonical owner is Fitness/Today, with Goals workout-planning entry supported. | Library entry points need source-aware tab/stack state. |
| Q28 | B11-D01 | Meal routes | Split meal detail and food logging into separate explicit routes or route modes backed by one shared component. | Support clear entry modes for inspecting meals vs logging food. |
| Q29 | B11-D02 | Finance routes | Keep a shared finance detail component, but pass explicit `type` plus ID/context from the dashboard. | Dashboard rows must pass transaction/budget context into the detail shell. |
| Q30 | B10-D02 | Workout routes | Split workout planning/manual logging from immersive active workout, pause, and summary modes. | Active tracking should be a focused mode; planning/logging should stay separate. |
| Q31 | Batch 14 | Breathing sessions | Breathing active sessions should use a dedicated immersive sub-route/mode with no tab bar. | Library browsing and active breathing should not appear together inline. |
| Q32 | B13-D03 | Celebration overlay | Direct Celebration route is fine as a QA fixture; production acceptance requires event-triggered overlays. | Keep route fixture, but require queued triggers from habits, missions, workouts, and level-ups. |
| Q33 | B07-D01 | Life Areas monetization | Life Areas comparison is Plus-gated after enough history; show preview/upsell only when data exists. | Avoid locked comparison UI before the user has enough history to understand value. |
| Q34 | B07-D02 | Explore badges | Tier badges mean minimum required tier; for current-tier features show "Included," not locked. | Explore cards need entitlement-aware label states. |
| Q35 | B08-D02 | Billing | Mobile billing should follow Apple IAP/StoreKit and Google Play Billing: localized pricing, restore, trial eligibility, cancellation, downgrade/upgrade, errors, and entitlement sync. | Subscription screens need platform-compliant purchase and entitlement states. |
| Q36 | B13-D01 | Social V1 | Social V1 stays friends/private-first until report, block, moderation, and visibility controls are wired. | Global/country/public-room exposure should wait behind safety tooling. |
| Q37 | Batch 14 | Social monetization | Show accountability and competitions as visible locked previews for non-Plus; activation requires Plus and social consent. | Discovery can show value, but activation must enforce entitlement and consent. |
| Q38 | Batch 14 | Competitions | Include self-only/private challenge modes for users who want motivation without public comparison. | Competition design must support private motivation paths. |
| Q39 | B09-D02 | Achievements | Low-motivation users should see only earned/near-next achievements; hide most locked badges. | Achievement gallery must adapt density by motivation tier. |
| Q40 | B13-D02 | Paywall prototype | Paywall prototype should model IAP-adjacent visual states now, without live billing. | Add trial, processing, success, cancellation, restore, and error fixtures. |
| Q41 | B15-D02 | Recipes/shopping | Recipes and Shopping List V1 should support lightweight real mutations; sharing only after review and without private AI/health context. | Food utilities need usable local create/save/log/check-off flows. |
| Q42 | B18-D01 | Reports/export | Preserve no data export for V1; reports stay in-app with screenshot-level sharing only. | Remove or recast Share/Export PDF promises for V1. |
| Q43 | B10-D01 | Knowledge Graph | Ship V1 Knowledge Graph as a guided interactive insight-map, not a raw force graph. | Prioritize guided explainability over complex graph manipulation. |
| Q44 | B12-D01 | Spirituality | Spirituality must be belief-adaptive; include a Muslim configured demo state, but also unconfigured and other-belief states. | The dashboard cannot be accepted as only a hard-coded Islamic configuration. |
| Q45 | B15-D01 | Meditation/yoga | Meditation/yoga should demonstrate real library-to-active-to-complete modes; no inline preview-only acceptance. | Mindfulness/yoga prototypes need operable focused session modes. |
| Q46 | B16-D01 | Quick Notes | Quick Notes V1 should prioritize global bottom-sheet capture; full archive is secondary. | Build capture-first UX before archive polish. |
| Q47 | B16-D02 | Report/block | Report/Block must keep "also block this user" default off. | Blocking requires explicit opt-in and conditional confirmation. |
| Q48 | B17-D03 | App Rating | Create rating fixtures for initial, positive/native prompt, negative feedback, submitted, cooldown, and suppressed states; avoid manipulative pre-gating. | Growth QA needs separate prompt fixtures and non-coercive flow states. |
| Q49 | B15-D03 | Sleep color | Sleep accent should be canonical `sleep-indigo`; wellbeing teal stays for broader wellbeing/stress surfaces. | Align Screen 58 spec, registry, and implementation to sleep indigo. |
| Q50 | B07-D03 | Obstacle coach | Start reconnection should show per-blocker accept/dismiss controls, with optional "accept all" only after review. | Reconnection flow should optimize for user control before one-tap acceptance. |
