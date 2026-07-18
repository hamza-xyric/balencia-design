# H1 reconciliation B — competitions, report/block, reports, contracts

Worker role: Luna read-only evidence inventory. This is not implementation or acceptance. Reviewed the H1 batch/verification contract, active specs and live code for 47/64/78/82, compact canon/catalog, RPG social terminology, image-slot ledger, historical audit, current product/stories for competition integrity, moderation/reporting, contract lifecycle and witness verification, shared consumers, and accepted G1 evidence/sentinels.

## Sol escalations — freeze required before implementation

### 1. S47 date/countdown payload is internally impossible

- Live hero combines `May 25 – Jun 8`, `68% time elapsed`, and `9 of 14 days remaining`. May 25 through Jun 8 is 15 calendar dates inclusive (14 elapsed-day intervals). If 9 days remain, elapsed time is about 36% on an inclusive-day basis, not 68%; if 68% elapsed, roughly 5 days remain. The live copy cannot be repaired by relabeling alone.
- Active spec repeats 68% but does not freeze a reference `now`, inclusive/exclusive convention, or remaining-days value. Sol must freeze one deterministic demo clock and derive date range, elapsed percent, and days remaining from one payload.
- RPG authority calls these seasonal competitions/challenges; project UI terminology reserves Missions for goals. Live `Mission 1 of 3`, `weekend warrior mission`, `7-Day Mindful Mission`, and `Browse Missions` blur competition and Mission Board semantics. Sol should freeze whether an individual competition contains mission stages or all visible nouns become `competition` / `challenge`; Luna cannot redefine the product taxonomy.

### 2. S64 live default reverses the resolved neutral safety default

- The active spec explicitly resolves default to: no report reason selected, block toggle OFF, submit disabled. Live code hard-codes Spam selected (`aria-checked=true`), renders an orange `ToggleRight` as visually ON, and leaves Submit report enabled.
- The fixed background uses a hostile message from `Deleted user`. A report context is necessary, but defaulting the reason to Spam when the visible example reads as harassment biases categorization. Context should remain neutral/truncated and the reporter must choose.
- Live screen is entirely static: Cancel, reasons, text, block, and Submit have no outcomes; character count is permanently `0/500`. This cannot meet the report pipeline or deterministic state proof.

### 3. S82 signer/witness truth conflicts with shipped rollout authority

- Live code claims `2 Partners`, `Signed by Amira · Lv 12`, `Signed by Aisha Khan`, and `Confirmed by Aisha Khan`. The unsupported `Lv 12` conflicts with the current RPG value rule. Only Aisha is rendered, so `2 Partners` is not auditable unless it means owner + one partner, which is misleading.
- Current witness authority says peer verification is built but `ENABLE_WITNESS_VERIFICATION` defaults OFF, rollout is undefined, client UI is not finalized, and a witness sees only the completion question—not full contract detail. A live-looking witness confirmation must not imply the flag is enabled.
- A witness/partner accepting participation is not automatically a signer of the owner’s contract. Sol must freeze roles and facts separately: owner signer, accountability partner/enforcer acceptance, optional witness invitation/acceptance, and proof confirmer. Do not infer one from another.
- Contract lifecycle authority blocks hard delete for `active`, `at_risk`, `paused`, and `violated`; only draft/cancelled/completed may be deleted. The generic ConsentRail/Delete pattern must not suggest an active contract can be erased. Revoke proof sharing, cancel/close contract, and delete eligible historical/draft record are distinct consequences.

### 4. S78 export/share readiness and report privacy need a local-only freeze

- Active spec describes native share after privacy acknowledgement, while the H1 prototype forbids real capability. Sol should freeze Share/Export/Screenshot guide as local previews with a visible review step; no native share, screenshot, filesystem, clipboard, email, or provider call.
- Live header says `2 drafts`, but the cards are one Ready and one Draft. `Weekly Life Report 6 of 7 = 86%` and `Doctor Summary 3 of 7 = 43%` are mathematically coherent, but `Sleep 82% via wearable`, Work 64%, and the CIA conclusion have no frozen source payload. These need bundled-demo/user-entered/cached provenance or honest-null, not implied connected data.
- A doctor summary and raw report preview can contain sensitive health/journal/photo data. The active spec says private notes, raw journal entries, and hidden photos are excluded by default. The local privacy review must name included/excluded categories, audience, scope, freshness, confidence, retention, export destination boundary, revoke/delete semantics, and report lifecycle.

## Cross-screen authority and verifier contract

- Prototype-only: deterministic local React state and same-origin routes. No API, share sheet, screenshot, download, file, clipboard, storage, health provider, notification, haptic, camera, photo, email, or external navigation capability.
- Every fixture should expose exactly one marker, e.g. `data-h1-state="47-default-real"`. Query fallback must be deterministic and read once per mount.
- Required per context: 390×844 phone, <=1px horizontal overflow, no hidden bottom action, named native controls >=44px, 16px form fields, no nested interactions, visible focus, reduced-motion settled output, isolated storage/cookies, zero console/page/capability/external-request events, and one real 125% proof per screen.
- Default/error/offline values must identify `bundled demo`, `user entered`, `calculated locally`, or cached freshness. No provider connection or production readiness may be inferred.
- Sensitive and social controls need full category/source/scope/freshness/confidence/retention/export/revoke/delete treatment, but their consequences must be domain-correct: a submitted moderation report is not equivalent to deletable personal draft data; an active contract is not deletable; blocking is distinct from reporting.
- Destructive/relationship-affecting actions name the subject and consequence, require confirmation where appropriate, offer Cancel equal prominence, and never shame or coerce.
- Dialogs/sheets need focus entry, containment, Escape close, and restore. Tabs/filters need selected semantics and named panels/results.
- Each screenshot state must be materially distinct and deterministic; default and lower-view proofs should be captured without mutating product state. At 125%, long labels and consequence copy may wrap but never clip.

## Screen 47 — Competitions

### Live strengths

- Strong warm-dark hero, clear challenge list, ranking/progress hierarchy, anti-cheat/fair-play cue, CIA suggestion distinction, visibility/proof/report controls, and correct `/competitions` source route.
- RPG/product authority supports competition-level anti-cheat (`max_daily_cap`, `min_confidence`, `require_verification`) and excludes anomaly-flagged/blocked users from rankings. These should appear as trust/rules detail without claiming live enforcement in the visual prototype.

### Live gaps and truth risks

- No fixture/state system; all actions and filter chips are inert. Filters are 36px high, below the 44px floor.
- Hero says Active and View Details while composition says Join now; browse rows mix joined/upcoming/completed/locked without deterministic filter behavior.
- `Synced via Health`, 234 participants, rank #42, trend values, 500 XP, and CIA matching are presented as real without frozen source/freshness/confidence. The spec’s asset slot is optional backlog, not permission to fabricate social proof.
- `My Missions` is visually selected orange while `All` also looks selected; filters need exclusive state. Premium lock should use the shared PaywallLock treatment or a local equivalent only if shared edits are forbidden.
- Required audience/mute/block/own-content-delete controls are incomplete; live has visibility, health proof, report/block only.

### Freeze candidates and deterministic fixtures

Recommended minimum: `default-joined`, `default-unjoined`, `low-confidence-cached`, `honest-null`, `skeleton`, `error-cached`, `offline`, `filter-upcoming`, `invitation-sheet`, `rules-detail`, `join-confirm`, `join-success`, `join-disabled-consent`, `premium-preview`, `visibility-controls`, `report-handoff`.

- Default payload derives all date/countdown values from frozen demo clock and labels source/window/freshness/confidence.
- Join confirmation names competition, rules, scoring source, proof used, leaderboard audience, health-proof default, anti-cheat summary, exit consequence, and local-preview boundary. Consent starts OFF where health proof or public visibility is optional.
- Rank is hidden until joined; low confidence says pending/cached and suppresses exact rank/trend if not supportable; empty filter offers another filter without shame.
- Invitation sheet names inviter(s), audience, data visible on accept, Accept/Decline, and report/block. Existing relationship is unaffected by declining.
- Filters use tablist/toolbar semantics with one selected value and visibly different result sets. Every row/detail/result/locked control has a local outcome or disabled reason.
- Asset disposition for `HIFI-47-01` is Sol-owned: either initials/code-native proof (privacy safest) or a privacy-safe generated placeholder. No avatar/photo is required for semantic completion; if used, no real person, logo, readable UI, or performance proof.

## Screen 64 — Report & block

### Live strengths

- Appropriate focused sheet with no bottom nav/FAB, strong scrim, clear entity/source/scope, calm non-shaming explanation, full reason list, 44px radio rows, and no required image.

### Live gaps and moderation/privacy truth

- Default is non-neutral as escalated. Buttons are not grouped by `radiogroup`; block is an icon rather than an operable switch with checked state and consequence.
- Missing context does not fail honestly. The reportable authority supports `message | community_post | community_reply | feed | user | group`; fixture must name content type/id locally without exposing unnecessary authored content.
- Duplicate report authority says the second insert no-ops with `You've already reported this.` The spec’s `Update report` contradicts that shipped lifecycle unless prototype explicitly labels it a draft-only preview. Sol should prefer current report-pipeline authority.
- Report lifecycle is `pending | reviewed | actioned | dismissed`, visible only to reporter (own reports) and admins. `Retention: 30 days`, Export, Revoke, Delete are not supported as submitted-report rights by the cited authority. Before submit, local draft may be clearable; after submit, user can view status but should not be promised revoke/delete/export unless another current authority supports it.
- Offline queueing conflicts with isolated-storage/no-network prototype unless visibly described as session-only local preview that disappears on reload; do not imply durable send-later.

### Freeze candidates and deterministic fixtures

Recommended minimum: `default-neutral`, `reason-selected`, `other-description`, `block-on`, `missing-context`, `skeleton-context`, `offline-preview`, `duplicate-report`, `submission-error`, `submit-confirm`, `success-pending`, `cancel-confirm`, `report-status`.

- `default-neutral`: no reason, block OFF, Submit disabled, exact `0/500` counter. Radio group and switch announce state.
- `other-description`: textarea is 16px, enforces 500 characters, counter derives from input, and empty/over-limit validation is visible.
- Submit confirmation names content subject/type, selected reason, optional block choice, what block changes, who can see report, and local-only boundary. Reporting does not automatically block; blocking does not submit a report.
- Missing context returns to the source with `Couldn’t load report. Try again.` and never guesses a user/entity.
- Success says report is `Pending review`; duplicate says `You’ve already reported this.`; no promise of outcome or automatic punishment. Block success names the user and supports a separate unblock path.
- Safety states remain reachable and non-coercive under 125%; Cancel is always available.

## Screen 78 — Reports Center

### Live strengths

- Clear editorial builder proposition, coherent 6/7 and 3/7 completion math, restrained report-card hierarchy, explicit private-by-default intent, and no image requirement.

### Live gaps and privacy/lifecycle risks

- No fixture/state or interactions. Report cards are non-interactive GlassCards; Share, Screenshot Guide, and Retry are inert. Full data controls are absent.
- `2 drafts` contradicts Ready + Draft. Sleep/Work metrics and wearable provenance are unsupported; the CIA insight is low confidence but still asserts a directional result.
- No preview/review step shows included/excluded data, intended audience, or export boundary. The doctor-oriented label must not imply medical validation or a real doctor recipient.
- Offline/export-disabled/success states are absent; current page permanently shows a sync error alongside Ready status without explaining source scope.

### Freeze candidates and deterministic fixtures

Recommended minimum: `default-demo`, `low-confidence`, `honest-null`, `skeleton`, `error-source-cached`, `offline`, `report-preview`, `privacy-review`, `share-disabled-review`, `share-success-local`, `new-report-builder`, `report-delete-confirm`, `data-controls`, `matrix-detail`.

- Default uses one coherent report lifecycle: e.g. `1 ready · 1 draft`, bundled-demo values, refreshed date, confidence, and no real wearable connection.
- Honest null hides weekly KPIs/CIA comparison and offers Create first report. Low confidence mutes/suppresses exact claims and names missing days/source.
- Report preview distinguishes generated summary from raw sources. Privacy review defaults private notes/raw journal/hidden photos OFF and requires explicit inclusion/audience acknowledgement before local export preview.
- Share/Export opens only a local outcome; Screenshot guide is instructional text, not capture. Offline disables export with reason while cached preview stays readable.
- Delete confirmation names the report/draft and states whether only generated report preview or underlying source data is affected. Revoke audience access and delete generated report are distinct.
- Correlation/matrix detail, if retained, labels strength/direction/sample/window/freshness/confidence and association-not-causation; otherwise omit rather than invent.

## Screen 82 — Accountability contract

### Live strengths

- Strong active-contract hierarchy, coherent 5/6 = 83%, explicit mission binding, visible proof scope/private journal exclusion, lifecycle actions, and correct `/contracts` route. No raster is required; proof can remain metadata-only.

### Live gaps and coercion/truth risks

- No state fixtures or interactions. Overflow, checks, partner card, terms, pause/revoke/exit, ConsentRail, and Sign update are inert.
- Sign update is always enabled despite the spec requiring `No update to sign` or a named missing-consent/review reason. There is no changed-terms summary or confirmation.
- Current `Signed` status lacks timestamp/freshness. `4 weeks left` lacks start/end dates. Proof status does not say whether image content is visible to Aisha or only status; authority requires per-domain visibility and witness sees only the completion question.
- Pause/Exit/Revoke consequences are not separated. Live contract cannot be deleted. Cancel/close must preserve violation history and explain stakes without pressure or shame.
- Partner/witness/owner roles and witness flag conflict are escalated above. Financial or social stakes must remain optional and cannot be introduced by default.

### Freeze candidates and deterministic fixtures

Recommended minimum: `default-active`, `low-confidence-stale`, `honest-null`, `skeleton`, `error-proof-cached`, `offline`, `check-detail`, `terms-history`, `sign-disabled-no-change`, `sign-review`, `sign-success`, `pause-confirm`, `paused`, `resume-confirm`, `cancel-confirm`, `sharing-controls`, `witness-disabled`, `eligible-delete-confirm`.

- Default demo names owner signature timestamp, contract start/end dates, active state, exact proof count, local/demo source, and one clearly defined partner. Remove unsupported level.
- Owner, partner/enforcer, and witness are separate labels. If witness flag is OFF, show `Witness verification unavailable in this preview` and no witness verdict/confirmation claim.
- Sign review names every changed term, proof requirement, partner visibility, stake/consequence, owner signature, other-party acceptance state, and effective date. No changes means native disabled button plus visible reason.
- Pause/cancel/resume follow lifecycle authority. Active contract delete is absent/disabled with `Cancel it first`; only draft/cancelled/completed record can offer named delete confirmation.
- Proof detail states exactly what partner sees: status only vs image/file. Private journal remains excluded. Revoking proof sharing may pause/block verification but does not silently cancel or erase the contract.
- Recovery copy for at-risk/violated states is supportive; no shame, public exposure, surprise notification, or automatic witness involvement.

## Shared consumers and regression boundaries

- Registry/data entries are shared/API surfaces and Sol-owned. Preserve IDs/routes `/screens/47`, `/screens/64`, `/screens/78`, `/screens/82`; source routes remain `/competitions`, source-only report sheet, source-only reports module, and `/contracts`.
- Accepted S89 currently links a `Habits` module to `/screens/64`, which is Report & block, not Habits. This is an accepted-through-G1 consumer defect and cannot be repaired inside H1 without explicit Sol serialization and sentinel adjudication. It should be recorded as a blocker/waiver or separately corrected with fresh accepted evidence; H1 must not silently repurpose S64 to satisfy the bad link.
- S64 is specified as the global report sheet for Community Chat, Competitions, and Recipes; H1 social screens should hand off with explicit local context query parameters. Accepted Recipes and other consumers must remain byte-stable unless Sol reopens them.
- S78 is source-only and described as opened from Me, Intelligence, Help, and CIA contexts, but no current live same-origin consumer was found. Do not invent production routes; `/screens/78` is the review target.
- S82 has only registry/review consumers in the prototype. Preserve `/contracts` as source metadata without inventing backend behavior.
- Accepted-through-G1 evidence reports build `wFfEvX-H_FYiSIyxbwKIT` and accepted digest `7e6d40c05b11565478dbac2b78b12d355c8e1c1dce58a56a5eafcd1c44f4e1a5`; H1’s committed 90-file sentinel union is the immutable guard, not a git-clean assumption.

## Suggested verifier matrix summary

| Screen | Suggested PNG fixtures | 125% proof | Required interaction assertions |
|---|---:|---|---|
| 47 | 16 | `default-joined` | exclusive filters; invite accept/decline; rules; join consent/success; visibility/proof; report handoff |
| 64 | 13 | `default-neutral` | neutral radio; counter; block switch; submit confirmation; duplicate/error/success; missing context/cancel |
| 78 | 14 | `default-demo` | preview; privacy inclusion/audience review; disabled/export-local success; create/delete; controls/matrix |
| 82 | 18 | `default-active` | check/terms; sign disabled/review/success; pause/resume/cancel; sharing; witness-off; eligible delete |

This packet suggests 61 isolated PNG states plus four screenshot-free actual 125% proofs. Sol may consolidate only when every safety/privacy/source disposition remains independently visible and all screenshot hashes remain meaningfully unique.
