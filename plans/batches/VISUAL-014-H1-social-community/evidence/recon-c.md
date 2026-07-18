# H1 reconciliation C — feed, webinars, groups (screens 91, 94, 95)

Worker role: Luna read-only evidence inventory. This is not implementation or acceptance. I reconciled the H1 batch/verification contract, active H1 audit and R0 evidence, current hi-fi/source specs, live S91/S94/S95 product modules, canon/catalog, project RPG/social terminology, privacy/moderation/media requirements, shared control consumers, image-slot ledger, routes/registry consumers, and accepted-through-G1 sentinel records. Terminology, privacy/moderation, route-history, and asset dispositions remain Sol-owned decisions.

## Authority and conflicts requiring Sol freeze

1. **Approved terminology overrides the three stale specs/live modules.** Root `AGENTS.md` is explicit: a **Squad** is temporary, goal-oriented, and 2–5 people; a **Community** is persistent. `RPG_SYSTEM_DESIGN.md` §§7.1–7.2 supports the same lifecycle/size distinction under older Party/Guild source vocabulary. S91 still says `My pods` / `Circles`; S95 is titled `Pods`, uses Pods/Circles tabs/cards, and its active spec preserves Pods/Circles/Partners. The active H1 audit correctly treats this as unresolved authority drift. Do not implement the stale taxonomy without Sol adjudication.
2. **Audience vocabulary is also unresolved.** S91 says `Visible to buddies`, while its filters use Pods/Circles/Partners. `buddies` is not an approved audience class. Sol should freeze explicit, understandable scopes such as `Only me`, a specifically named Squad, a specifically named Community, and individually named Partners where product authority permits them. The composer must never infer an audience from a filter.
3. **Route-history matching is sensitive and not currently consented.** S95 claims `3 overlapping routes with your history` under generic `Consent on`. This is location/route-history processing and requires exact fields, purpose, audience, freshness, retention, export, revoke, and delete before any match or membership action. Until explicitly consented, the suggestion must be topic-only or honest-null and must not expose route overlap.
4. **Image slots remain unresolved, not delivered.** `_IMAGE-SLOTS.md` requires `HIFI-91-01`, `HIFI-94-01`, and `HIFI-95-01`; live code uses an orange Activity placeholder, a generic gradient/video block, and gradient avatar circles. These do not satisfy the audit. Sol must freeze one disposition per ID: approved privacy-safe local asset with alt/consent/remove/delete treatment, or an explicit honest-null/hidden-media state. No external/generated/provider/personal media should be implied by a placeholder.
5. **Prototype route discipline:** S91/S94/S95 are registered review screens. Active specs preserve product routes `/feed`, `/webinars`, `/webinars/[slug]`, and `/groups`, but no current accepted consumer implements those vanity routes in this visual-only prototype. Do not invent product routes or backend semantics; same-origin review links may use `/screens/<id>?state=...` as evidence infrastructure while copy continues to name the source route honestly.

## Screen 91 — Social feed

### Live-versus-audit reconciliation

The H1 release-block findings remain live:

- Composer text tells the member to choose an audience but exposes no selector, named audience, exact proof fields, source/scope/freshness, pre-publication preview, remove-proof control, or reversible export/revoke/delete path.
- Filters and post types are display `Chip` spans, not controls. Feed overflow is a bare `MoreHorizontal` SVG, counts are inert spans, and no report/mute/block/hide/delete-if-own sheet is reachable. The now-shared `FloatingQuickLog` is a real link, but S91 does not read its `action=post` query and therefore produces no visible composer outcome.
- Both posts reuse hard-coded `Kudos 24 · Comment 6 · Views 83`, so counts are neither post-specific nor server/cached/queued-labelled. Offline, queued, moderated, removed, failed, empty, success, low-confidence, and honest-null states are absent.
- `Visible to buddies`, `My pods`, and `Circles` are stale/undefined terminology. Visible `CIA` copy remains casing drift.
- The first proof has `5.2 mi via wearable` and a generic orange media placeholder. It has no health-proof consent state, proof freshness/confidence, audience, remove/delete, or asset ID/disposition. The second budget post also lacks inspectable source/audience/moderation details.
- There is no own-authored post in the live fixture, so own-delete cannot be proven without a deterministic own-post state.

Useful foundations remain: proof-first hierarchy, solid feed cards, explicit wearable label, two distinct authors/timestamps, one bounded coaching cross-link, and no infinite-scroll pressure.

### Proposed deterministic behavior and assertions

- Composer opens from header/FAB with native focus-managed sheet. Default audience is **unselected or Only me**, never public/group-derived. Publication stays disabled until audience and proof consent are reviewed.
- Proof review names exact included fields (for example distance only), source, audience, freshness, confidence, retention, and remove/export/revoke/delete controls. Decline/remove is equally reachable. Attaching health/photo/voice/video does not invoke device/file/media capability in the prototype.
- Filters and post types are native tabs/buttons with named panels/pressed state; keyboard activation updates visible results. Kudos/comment have local queued/success/undo or disabled reasons. View count is status text, not an apparent button.
- Overflow sheet exposes Save, copy-public-link preview, Report, Mute, Block, Hide similar, and Delete only for an own-post fixture. Report/mute/block/delete are separate confirmed outcomes; no destructive action occurs before confirmation; Escape and focus restoration pass.
- Count truth: each post has distinct server-confirmed or cached/queued counts. Offline actions label `queued locally`; error preserves the post and retry. Removed proof/post states suppress the metric/media and CIA certainty.

### Suggested exact S91 fixture set

`default-consented`, `audience-unselected`, `proof-preview`, `proof-low-confidence`, `proof-honest-null`, `skeleton`, `empty`, `cached-error`, `offline-queued`, `kudos-success`, `comment-sheet`, `composer-disabled`, `moderation-sheet`, `report-success`, `own-delete-confirm`, `data-controls`, `media-consent-off` — **17 PNG states + one actual 125% proof**.

Key assertions: exact marker/fallback; audience unselected or Only me; no post before consent; own-delete absent on other authors; exact moderation actions; distinct/qualified counts; source and audience announced; nine-field data controls; media alt/null/remove/delete; no device/network/storage/share/clipboard capability; 390×844/no overflow/44px/focus trap/Escape/restore/reduced motion/unique hashes.

## Screen 94 — Webinars

### Live-versus-audit reconciliation

- Hero `Add to calendar` remains a fixed `h-11` button in a constrained justify-between row without no-wrap/shrink protection; the audit's two-line wrap risk at 390×844 and enlarged text remains live.
- `Live tomorrow` is hard-coded relative copy with no date-of-evidence freshness. The row simultaneously names `Thu 7:00 PM EST`; acceptance should freeze an absolute bundled-demo schedule/time zone and freshness, or an honest-null date—not a perpetually relative claim.
- `Continue watching · 2 recordings` still renders one recording and no See all route/control. The 38% textual progress and bar agree, but source/cross-device freshness states are missing.
- Register, calendar, tabs, Share, Watch, search, upcoming row, and footer buttons are inert. Tabs have roles but no tab panels or switching. Share does not prove it exposes only a public webinar URL. Register/calendar/watch failure, success, disabled, signed-out, sold-out, unpublished, and offline states are absent.
- `animate-pulse` has no `motion-safe:`/reduced-motion suppression. Rose live status and purple hero misuse semantic color. The featured session is a real webinar action, not a Cia surface.
- Personalized provenance (`active mission`, named Buddy, `Lv 12 member`) conflicts with `Topic match · low confidence`; unsupported level copy should not be revived. The specific personal match must be suppressed in low-confidence/public/honest-null states.
- Default `ConsentRail compact` exposes only Source/Retention/Export/Revoke/Delete. The spec requires category/source/scope/freshness/confidence/retention/export/revoke/delete, and Share/media/calendar need explicit public/private boundaries.
- `HIFI-94-01` remains a generic gradient/video placeholder. The duplicate custom `Privacy` footer control and small plain footer buttons remain unnecessary/inert beside `ComplianceFooter`.

Useful foundations remain: speaker, host, absolute time zone, registration and calendar as separate apparent actions, 38% watch progress, and no fabricated face/provider logo.

### Proposed deterministic behavior and assertions

- Freeze an absolute fixture schedule such as `Thu Nov 14 · 7:00 PM EST · bundled demo · refreshed <fixed time>`; make date pending/honest-null states suppress urgency and calendar action.
- Reflow hero controls vertically or with no-wrap responsive layout at 100%/125%. Register opens a review sheet; calendar previews a local `.ics`-style summary without file/device/calendar invocation; success updates explicit status. Sold-out/signed-out/offline/date-null actions are natively disabled with reasons.
- Tabs activate distinct named panels: Upcoming, Registered, Recordings. Count must be `1 recording shown` or a second reachable recording must exist. Watch resumes only in a local preview; progress stays sourced and suppresses on null/unpublished state.
- Share opens a labelled preview containing only the public webinar URL/title; it must exclude missions, health, buddy, registration, and watch-progress data and must not call native share/clipboard/external navigation.
- Low-confidence recommendation becomes generic topic-only copy. Specific mission evidence appears only in a separately consented, confirmed state.

### Suggested exact S94 fixture set

`upcoming-default`, `registered`, `recordings`, `schedule-low-confidence`, `schedule-honest-null`, `skeleton`, `empty-upcoming`, `registration-error`, `offline-cached`, `register-review`, `register-success`, `sold-out-disabled`, `calendar-preview`, `recording-unpublished`, `watch-progress`, `public-share-preview`, `data-controls`, `media-honest-null` — **18 PNG states + one actual 125% proof**.

Key assertions: absolute schedule/time zone/freshness; recording count/card equality; 38% text/bar geometry; public-only share payload; no private plan/health/registration data; no media/calendar/file/share/network capability; no animation under reduced motion; responsive unwrapped CTAs; named tab panels; disabled reasons; full nine-field controls; asset disposition/alt; focus and deterministic unique captures.

## Screen 95 — Groups hub

### Live-versus-audit reconciliation

All release-block findings remain live:

- Title/tabs/entities use Pods/Circles contrary to approved Squad/Community taxonomy. `Morning runners` has 8 members and a temporary shared Mission: it exceeds Squad size and is not clearly a persistent Community.
- Hero claims `2 active pods`, but one active card is rendered and there is no See all. The two visible avatars plus `+6` correctly total 8, and `1 pending invite` matches one invite.
- `Focus builders` is both an unjoined suggested Pod (`Join pod`) and an already managed private Circle (`Manage circle`), a direct membership contradiction.
- Suggestion exposes three overlapping routes under generic consent. Exact route/location fields, derivation window, audience, retention, and revocation are absent. Membership must not be inferred from matching.
- All tabs/search/create/manage-discovery/privacy/open/join/manage/report/invite actions are inert; no tab panels or state changes exist. Report is present only for one circle; mute, block, leave, own-content delete, and confirmed join/decline/leave outcomes are missing.
- The 68% `ProgressRing` incorrectly uses `ghost` with real data and duplicates the adjacent filled bar. Remove it or render one coherent meter from one source.
- Avatar `aria-label`s are placed on generic divs without `role="img"`; gradient avatars do not resolve `HIFI-95-01`. Open/Accept use ad hoc CTA styling.
- Default `ConsentRail compact` is only the five-field privacy rail, not the required full nine-field social/location controls. Visible `CIA match` remains casing drift.

Useful foundations remain: invite count arithmetic, discovery-revoke copy, privacy preview, report entry, non-shaming suggestion tone, and membership provenance/freshness chips.

### Proposed taxonomy/data freeze for Sol

- Replace Pods/Circles tabs with `Squads` and `Communities`; treat individually named Partners as people/permission relationships, not a third group type. Whether Partners remain a filter is a Sol product choice.
- Example defensible mapping: `Morning runners` becomes a persistent Community if it keeps 8 members, or becomes a temporary 2–5-person Squad if its member count is reduced and its Group Mission/lifecycle is named. `Evening stretch` can be a Squad only if 2–5 and temporary. Rename the unjoined suggestion so it cannot collide with a joined/managed entity.
- Hero count and rendered cards must match (`1 shown of 2` with a real See all outcome, or render two). Join state is one of suggested/invited/member/left/blocked and never simultaneously member plus joinable.
- Route-history match is off by default. Consent review names route identifiers/approximate location fields, purpose, audience, freshness, window/sample, retention, export, revoke, delete, and correction. Revocation immediately suppresses overlaps and suggestion certainty.

### Suggested exact S95 fixture set

`communities-default`, `squads`, `suggested-consent-off`, `suggested-consented`, `low-confidence-cached`, `honest-null`, `skeleton`, `empty`, `error-cached`, `offline`, `join-preview`, `join-success`, `invite-pending`, `invite-accepted`, `leave-confirm`, `report-sheet`, `moderation-success`, `discovery-disabled`, `data-controls`, `asset-honest-null` — **20 PNG states + one actual 125% proof**.

Key assertions: only approved labels; every Squad 2–5 and temporary; Community persistent; exact membership/card/count reconciliation; no route overlap without consent; tabs own named panels; join/decline/leave/report/mute/block/delete behavior; single coherent progress meter; avatar role/alt or honest-null asset; nine-field controls; 44px/focus/overflow/125%/reduced motion/capability isolation/unique hashes.

## Shared 390×844, 125%, state, and verification risks

- All three screens are long, dense scroll surfaces. Default-only screenshots hide lower privacy/moderation controls. Each PNG should combine deterministic top and representative lower/modal views, and per-screen hashes must be unique.
- S91's horizontal filters, S94's hero calendar row, and S95's four legacy tabs are the highest 125% overflow/wrap risks. Assert <=1px horizontal overflow, no clipped/overlapped text, no hidden bottom action, and every visible native control >=44px at normal and actual computed-font-size 125%.
- Use one fresh production build on localhost `:3002`, reduced-motion contexts, empty storage/cookies, and blocked fetch/XHR/WebSocket/EventSource/beacon/geolocation/media/file/share/clipboard/notification/payment/external-navigation capabilities. All contexts require zero console/page/capability/external-request events.
- Every modal/sheet must receive focus, trap forward/reverse Tab, close with Escape, and restore the real trigger. Destructive, publication, join, location, and public-share actions cannot mutate before review/confirmation.
- Query allowlists must fail safely to the screen's default fixture and expose exact state markers. Null/low-confidence/error/offline fixtures suppress unsupported counts, media, CIA certainty, location overlap, registration availability, and derived claims.

## Asset disposition inventory

| Screen | Slot | Current live treatment | Evidence disposition for Sol |
|---|---|---|---|
| 91 | `HIFI-91-01` | Orange Activity-icon rectangle | Unresolved. Deliver privacy-safe running-proof local asset with consent/alt/remove/delete, or freeze explicit media-honest-null/removed state; placeholder is not acceptance-ready. |
| 94 | `HIFI-94-01` | Generic warm-dark gradient/video icon | Unresolved. Deliver approved webinar artwork without face/logo/readable private text, or freeze recording-media unavailable/honest-null; generic gradient is not slot completion. |
| 95 | `HIFI-95-01` | Gradient avatar circles without reliable semantic role | Unresolved. Deliver privacy-safe abstract/local avatar assets with role/alt/consent/delete, or freeze initials/honest-null as a deliberate code-native disposition; current generic gradients do not close the slot. |

## Shared consumers and accepted-integrity boundary

- Live consumers found: registry/index registration and the `/screens/91` quick-log self-link. No accepted screen currently links to `/feed`, `/webinars`, or `/groups`; do not create vanity routes in H1 without Sol authority.
- Freeze the exact accepted-through-G1 guard as **90 unique immutable files**: the exact 81 accepted rows from `g1-acceptance-final-v7.json` plus the nine hashes in `ACCEPTED-G1-ADDITIONS-BEFORE.sha256`. All ten H1 targets are excluded. The verifier must reject malformed/duplicate rows, wrong union count, missing paths, pre-run drift, or start/end drift.
- Shared kit/registry/router/package/verifier surfaces require separate start/end fingerprints; they are not permission for a bounded worker to edit shared accepted code.

## Reconciliation outcome

Recon is complete, but implementation decisions remain blocked on Sol's taxonomy/audience freeze, route-history consent contract, asset dispositions, and exact family-wide state allocation. The live defects are not stale: S91 still lacks publication/moderation consent paths, S94 still has count/schedule/share/motion/layout gaps, and S95 still conflicts with approved taxonomy and membership/privacy truth. This report supplies evidence and deterministic proposals only; it makes no acceptance or product decision.
