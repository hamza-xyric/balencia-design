# H1 recon A — leaderboard, communities, accountability

Read-only Luna reconciliation for screens `39`, `40`, and `46`. Sources inspected: H1 batch/verification contract, baseline strict evidence, active hi-fi specs, current product components, R0 independent triage, canon/catalog, RPG social/privacy authority, shared input/composer/consent/safety consumers, image ledger, G1 acceptance v7, and the accepted-through-G1 sentinel contract. No product, browser, server, git, Figma, or external state was mutated.

## Cross-screen authority reconciliation

- Current project terminology supersedes legacy RPG nouns in member-facing copy: a temporary goal-oriented group is a **Squad** of `2–5`; a persistent social group is a **Community**. Legacy `Party`, `Guild`, `Pod`, and `Circle` remain source context, not approved new UI taxonomy. `Accountability partner` remains a valid person relationship.
- RPG authority makes social comparison optional and cooperation primary. Ranking/public proof must be opt-in, reversible, bracket/window scoped, and hidden in honest-null/private states. A default populated leaderboard cannot silently imply the member consented to public exposure.
- Current shared `GlassPillInput` is a labelled native input at 16px; current shared `Composer` is a native message field with local deterministic send support. Older findings that these shared controls are non-native are stale, but each screen must still bind local state, audience, delivery, and disabled reasons.
- Current shared `ConsentRail` can expose all nine fields through `FULL_DATA_CONTROLS`; the older claim that the kit only supports five controls is stale. All three current screens still invoke the five-field default, so their screen-level completeness finding remains live.
- Current shared `SafetyCard` is an operable same-origin Help Center link and explicitly says the prototype does not place calls or texts. The old audit's claim that safety help must invoke one-tap calling conflicts with the active visual-only/no-capability rule. S46 still has a live defect because it does not use the operable shared safety card at all.
- Shared chrome has advanced since R0: global back/nav semantic findings belong to accepted shared code and are not H1-local repair authority. Do not change shared chrome from an H1 writer packet.
- G1 acceptance v7 is pass on build `wFfEvX-H_FYiSIyxbwKIT`; H1's guard is the exact 81 inherited accepted files plus nine G1 additions = **90 unique immutable files**, with no H1 target in the guard. The dedicated H1 verifier must reject overlap/count drift and fingerprint the product/API/verifier and 90-file union at start/end.
- Baseline strict is 390×844 and free of issues on all three screens. It reports six small-target warnings on S39 and only the active, intentionally ellipsized W-TRUNC-40 warning on S40; S46 is warning-free under that general scanner. These results do not cover source, privacy, interaction, or state completeness.

## Screen 39 — Leaderboard

### Live findings

- **Consent before exposure:** default immediately displays Amira's rank, XP, level target, streak, movement, podium, and friends. `Opt out` appears only near the bottom, after exposure, and is inert. The spec requires audience/visibility controls before social comparison; RPG authority says competition is opt-in. A consent gate or explicitly consented fixture must precede populated ranking.
- **Ranking scope:** the UI says `Global`, but RPG authority requires level-based bracket matching so a new member never competes with Level 30 members. The populated fixture should name the bracket (the displayed levels 10–18 straddle Silver/Gold in current RPG ranges, so this payload cannot be treated as a single bracket without adjudication), ranking basis, time window, freshness, and verification state.
- **Filter semantics and interaction:** Global/Competitions/Country and week/month/all-time buttons are inert, have no selected semantics, and measure 36px/28px high. They need native >=44px tab/radio semantics, exclusive selection, named content outcome, and source/window refresh without losing scroll.
- **Own-rank truth:** the avatar badge implies current level 12 and text says `XP to Lv 13`, but the current-level value is not announced as a labelled field. `#12` own rank from the spec is also absent from the own card even though the copy says rank rose by +3. Rank, character level, XP total, XP-to-next, streak, and movement need distinct labels and one ranking-window provenance payload.
- **Rank math/accessibility:** podium and list rows are static containers. Rows do not announce rank, movement, XP, domain, window, or privacy; own card and podium do not open their specified profile/fairness outcomes. The three friend totals and podium values need verified/cached/null modes rather than appearing unqualified.
- **Domain semantics:** Wellbeing uses orange `tone="you"`; Creativity uses CIA purple. Both violate domain-tag semantics (and Creativity is a non-scored future extension under the accepted G1 decision, so it should not appear as an RPG leaderboard domain breakdown unless Sol explicitly defines a non-scored category leaderboard).
- **Safety/moderation:** fairness, limited profile, report, mute, block, export, and opt-out controls are inert. `Block user` is not bound to a named selected person. Profile actions must operate on a named row; opt-out should preview exactly what becomes hidden and remain reversible.
- **Privacy fields:** current `ConsentRail` uses only Source/Retention/Export/Revoke/Delete. Category, scope, freshness, confidence, ranking audience/visibility, and delete-own-ranking-data semantics are absent.
- **Visual semantics:** podium and own-rank cards both use orange `tone="you"`, including an orange highlight on Sarah. Medal colors use raw Tailwind literals. This dilutes the current-member meaning and is still a live audit finding.
- **Asset:** active spec/ledger names `HIFI-39-01`; current UI uses initials and code-native podium. A privacy-safe initials fallback is complete enough for local verification. If Sol keeps an asset requirement, it must be an optional non-identifying avatar/proof placeholder with no faces/logos and a deterministic initials fallback; no image is necessary to fix functionality.

### Counts and deterministic fixtures

Suggested exact fixtures: `default-consented, consent-required, low-confidence-cached, honest-null-private, skeleton, error-cached, offline, filter-competition, filter-country, period-month, period-all-time, own-profile, limited-profile, fairness-open, opt-out-confirm, opt-out-success, report-person, mute-person, block-confirm, data-controls` (20 PNG states) plus actual 125% proof on `default-consented`.

Suggested assertions:

- Default has exactly three podium members and three list rows; own rank explicitly reads `#12`, character level `12`, `4,210 XP`, `+3 this week`, and `680 / 1,000 = 68%`, all tied to one consented ranking-window fixture.
- Consent-required/private/null contains no other-member identities, own rank, XP, streak, or delta until opt-in; decline remains private and reversible.
- Low-confidence/cached labels last sync and suppresses fresh/live language; error retains only explicitly cached rows; offline disables profile/moderation mutations with reasons.
- Each filter and period is an exclusive >=44px semantic selection with a visibly distinct result/status. Bracket, audience, period, freshness, confidence, and calculation basis remain visible.
- Every row exposes one accessible announcement containing rank, movement, XP, domain/category, window, and visibility. Creativity is not presented as a scored RPG domain.
- Profile/fairness/data/moderation overlays are opaque, labelled, focus-entered/trapped/Escape-close/focus-restored. Report/mute/block name the selected member. Opt-out confirmation states exactly what hides and success removes ranking exposure locally.
- Full category/source/scope/freshness/confidence/retention/export/revoke/delete controls plus audience/visibility are visible and operable. Zero network, storage, cookies, external navigation, provider, notification, share, or clipboard calls.

## Screen 40 — Community rooms

### Live findings

- **Taxonomy:** `Community` is the correct persistent hub. `Accountability pod` and generic `room/circle/pod` framing need reconciliation: a temporary 2–5 goal group should be labelled **Squad**; persistent rooms belong to a **Community**. Current `Morning crew` has five members and could be a Squad only if temporary and mission-bound; current source calls it a public room, so it presently reads as a Community room. Sol must freeze each row's type rather than infer from member count alone.
- **Audience before send/join:** room interior says `Public room · Open membership`, but the composer does not display an audience selector or pre-send visibility state. Preview/join/create buttons are inert and do not show rules, membership visibility, proof-sharing consent, moderation, or leave/delete terms before entry.
- **Search/composer:** shared components are now native (old non-native finding stale), but search is uncontrolled/inert and has no result count/empty state. Composer requires a deterministic local send, queued/error/offline states, exact `Public · Morning crew` audience announcement, and proof/media consent before sharing health or achievement data.
- **Room/member counts:** Discover shows 42/8 and 28/3; Your rooms meta says 3 and renders exactly three; Morning crew says 5 in both row and interior. Counts are internally coherent, but they are unqualified live/server claims in a visual-only prototype. They need bundled local/cached provenance and mutually exclusive real/low-confidence/null variants.
- **Achievement proof:** Sarah's `+150 XP` card says `Source verified` without proof source, consent, audience, freshness, confidence, remove/delete path, or local-demo qualification. It must never claim server/verified proof unless the fixture visibly defines the bundled source and consented public audience.
- **Moderation:** Report/Mute/Block and room menu are inert; actions do not name a message/member/room, provide confirmation, or expose quiet crisis help for harmful content. Own-message delete, room leave, proof removal, and own-room delete are absent.
- **Presence:** the spec names AvatarStack/member presence; current screen only renders counts/text. This is still live, though code-native initials/status dots are sufficient and no raster is required.
- **Privacy controls:** static Visibility/Audience/Export/Revoke/Delete chips are non-interactive; the five-field default rail omits category/scope/freshness/confidence. Provenance claims `Server thread`, `Live`, and host moderation, which is not capability-honest for this local prototype.
- **W-TRUNC-40:** Morning crew and Study group preview lines intentionally ellipsize and remain covered by the active waiver. The exact strings must not be shortened merely to satisfy scanning. At 125%, preserve one-line chat-list ellipsis and make full room/member/unread/activity context available in the row's accessible name.
- **Visual/copy:** missing Tiempos `rooms` emphasis and AvatarStack findings remain live but are below privacy/interaction concerns. Purple discover cards and Moderated chip are not CIA-derived and should not use CIA purple.
- **Asset:** `HIFI-40-01` is listed, but code-native initials/AvatarStack are the privacy-safer deterministic choice. Treat raster as optional backlog unless Sol explicitly freezes a generated placeholder; never use identifiable people. Current functionality does not depend on an image.

### Counts and deterministic fixtures

Suggested exact fixtures: `default-community, low-confidence-cached, honest-null-no-rooms, skeleton, error-cached, offline, search-results, search-empty, room-preview, join-consent, join-success, create-room, room-interior, audience-private, send-success, send-queued, send-failure, proof-pending, proof-consent, moderation-message, block-member-confirm, leave-room-confirm, data-controls` (23 PNG states) plus actual 125% proof on `default-community`.

Suggested assertions:

- Default renders two Discover cards, exactly three joined-room rows, Morning crew `5 members` and `3 unread/new`, and a five-member room interior, all labelled bundled demo/cached rather than server-live.
- Search derives displayed count from result collection; null/empty does not fabricate rooms. Join success increments Your rooms count and renders the new row exactly once.
- Room preview identifies type (Community room or Squad), persistence/mission binding, audience, visibility, member count, rules, moderation, proof fields, retention, leave/delete terms, and join consent before mutation.
- Composer input is 16px, named, and announces exact audience. Send success appends one local message; queued/error states are distinct; offline disables send unless an explicitly in-memory queue is frozen and labelled session-only.
- Achievement proof names source, scope, freshness, confidence, audience, and member consent. Pending/low-confidence proof cannot display `verified` or award/ranking certainty.
- Report/mute/block/delete/leave actions name the exact message/member/room, require confirmation where destructive, and never mutate external data. Safety help opens local Help Center guidance without call/text capability.
- Full nine-field controls plus audience/visibility/proof consent are operable. Preserve W-TRUNC-40 exact preview strings while exposing full row context to assistive technology.

## Screen 46 — Accountability

### Live findings

- **Consent granularity:** banner says `Consent active` and `Aisha Khan sees active missions and progress`, while source is generically `Health`, scope is merely `Limited`, and no per-domain/per-event permissions are shown. RPG authority requires per-domain Full/Activity Only/Streak Only/Achievements Only/None. Mission visibility, health proof, failure/missed-check-in notices, CIA intervention, emergency data, and contact permissions must be independently consented and revocable.
- **Partner truth/count:** Section meta says `2 connected` and renders exactly Aisha and Marcus plus Add partner; count is coherent. Copy `Buddy · Lv 12 cohort` introduces unsupported cohort/level context and should be removed or explicitly sourced. Partner roles/permissions need accepted/pending/revoked/null states.
- **Tabs:** Partners/Contracts/Triggers are inert buttons with no semantic tab state or panels. All three content families are simultaneously rendered. They require >=44px exclusive tabs with named panels and stable state.
- **Contracts vs missions:** visible tab is Contracts, but content says `Shared missions` with 68%/42% and no signed terms, cadence, kept/open count, timestamps, witness, proof rules, audit trail, pause/revoke/resolve path, or contract honesty states. Screen 82 owns contract detail, but S46 still needs a summary that is honestly a contract or a clearly separate shared-Mission module.
- **Progress:** each mission repeats identical ring and bar values. The values are not mathematically contradicted, but provenance/calculation/period and real/low-confidence/null variants are missing.
- **Trigger consent:** `Missed check-in → notify Aisha after 2 days` is shown active by a non-semantic full-size `BtnSuccess`. It has no consent-before-enable flow, no `role=switch`/`aria-checked`, no notification audience/payload preview, cooldown, CIA-first intervention, audit trail, revoke path, or disabled reason.
- **CIA nudge:** insight names Aisha's activity and encourages outreach but has no evidence window/confidence, no partner permission, no preview of the exact message/audience, and no send/decline outcome. RPG authority says encouragement over shame and CIA intervenes before partner notification.
- **Safety:** Emergency contact is a static glass row. The current shared `SafetyCard` offers the correct prototype-safe local Help Center path. Emergency-contact and crisis-rule settings should be operable, calm, separated from XP, and explicit that the prototype cannot call/text. Do not implement real call/text despite stale catalog wording.
- **Actions:** partner rows, Add partner, Review shared data, Revoke partner access, and emergency card are inert. Revoke does not name the partner or data scopes and has no confirmation/result. Partner addition needs invite-pending/accepted/declined and exact visibility preview.
- **Privacy fields:** default rail omits category/scope/freshness/confidence in its operable set, despite static chips showing some fields. Retention/export/revoke/delete need named subjects; partner access removal must not imply deleting the other person's content.
- **Visual semantics:** consent administration uses CIA purple even though it is not AI; Marcus avatar uses purple for a person; green `On` CTA overstates success. These remain live audit findings.
- **Asset:** active spec says none required. Use code-native initials only; no raster generation or avatar asset is justified.

### Counts and deterministic fixtures

Suggested exact fixtures: `partners-default, partner-low-confidence, partner-invite-pending, partner-honest-null, skeleton, error-cached, offline, contracts-default, contracts-low-confidence, contracts-null, triggers-default, trigger-consent, trigger-enabled, trigger-disabled, nudge-preview, nudge-declined, add-partner, partner-detail, revoke-confirm, revoke-success, audit-trail, emergency-support, data-controls` (23 PNG states) plus actual 125% proof on `partners-default`.

Suggested assertions:

- Default renders exactly two accepted partners and one Add partner action; each partner announces role, invitation status, per-domain visibility, allowed event types, notification permission, freshness, and revoke path.
- Tabs are exclusive semantic tabs with named panels. Partner data is not duplicated into Contract/Trigger panels unless intentionally summarized with provenance.
- Contracts summary names signed parties, terms/cadence, period, `kept/open` counts, progress calculation, proof rule, timestamps, and Screen 82 same-origin detail path; low-confidence/null suppress unsupported percentages.
- Trigger is a native switch. Enabling first opens consent preview naming Aisha, exact missed-check-in condition, shared fields, delivery audience, CIA-first behavior, cooldown, retention, and revoke. Offline/missing-consent cannot enable.
- Nudge preview contains exact draft/audience and explicit send/decline; no shame copy or automatic external notification occurs. Audit trail records only local deterministic fixture events.
- Revoke confirmation names Aisha and enumerates scopes removed; success visibly updates partner/trigger state and does not delete Aisha's data. Emergency support routes locally and states no call/text capability.
- Full nine-field data controls are operable for partners, contracts, triggers, health proof, emergency contacts, and CIA inference. No network, contacts, notifications, health provider, storage, cookies, calls, or texts.

## 390×844 and actual 125% risk inventory

- **S39:** two filter rows, podium, own card, list, fairness, and full controls create a very long surface. At 125%, `Competitions`, period labels, XP-to-next copy, row domain tags, and rank announcements can wrap. Use min-width zero and vertical reflow; do not shrink filters below 44px. Capture top plus representative lower controls/profile overlay.
- **S40:** horizontal Discover cards and intentional room-preview ellipsis are the main width risks. Keep W-TRUNC-40; never turn the whole phone into horizontal overflow. Room audience/proof chips and composer controls need wrapping/stacking at 125%. Capture top/list plus room/composer/moderation lower view.
- **S46:** partner rows currently pack avatar, two lines, chip, and chevron; granular permissions will not fit inline at 125%. Move scope chips below names. Contract and trigger rows should stack status/actions. Full consent controls and SafetyCard make the screen long; capture each tab and representative overlays separately.
- For each target require actual browser 125% font-size proof, reduced-motion settlement, <=1px horizontal overflow, no hidden bottom action, all named controls >=44px, inputs >=16px, no nested interactives, and unique deterministic full top/lower phone PNG per fixture.

## Escalations to Sol

1. Freeze social taxonomy per entity: **Squad = temporary mission-bound 2–5**, **Community = persistent**. Decide whether Morning crew, Study group, and the current Accountability pod are Community rooms or Squads; do not infer from names/count alone.
2. Freeze S39 ranking basis and consent: bracket/window/source payload, own-rank/level/XP numbers, whether non-scored Creativity may appear in any leaderboard category, and private-by-default behavior.
3. Freeze social fixture provenance. Current `Server thread`, `Live`, `Source verified`, public ranking, and contact/health claims are incompatible with a local visual-only prototype unless explicitly relabelled bundled/cached/user-entered.
4. Resolve safety authority conflict in favor of current prototype truth: operable same-origin Help Center guidance, **no real call/text**. Do not follow stale catalog language literally.
5. Freeze granular accountability scopes and trigger behavior: per-domain visibility, exact partner-notification payload, CIA-first encouragement, cooldown, audit trail, revoke semantics, and emergency-contact limits.
6. Asset disposition recommendation from evidence: S39/S40 use deterministic code-native initials/AvatarStack with optional backlog slots; S46 none. No raster is required for acceptance, and privacy risk rises with invented people imagery.
7. Preserve accepted shared/API bytes unless Sol demonstrates an unavoidable shared-contract gap. Current native input/composer, full ConsentRail, SafetyCard, tabs/panels patterns, overlays, and local status primitives are sufficient for screen-local implementation.
