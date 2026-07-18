# VISUAL-009 D2 — verification matrix (frozen before implementation)

- Frozen: 2026-07-12 by Sol after three Luna read-only reconciliations and native-pixel before inspection.
- Family: 19,42,43,68,71,83,92.
- Strict gate: verify-visual-104.mjs --strict --only 19,42,43,68,71,83,92 --screenshots => exact 7/7, zero issues/warnings.
- Dedicated verifier: balencia-screens/scripts/verify-d2-profile-commercial.mjs.
- Screenshot contract: exactly 73 canonical 390x844 PNGs.
- Context contract: exactly 80 fresh contexts/nonces = 73 PNG cases + seven screenshot-free 125% text-only proofs.
- Evidence: plans/batches/VISUAL-009-D2-profile-commercial/evidence/.

## Stable state contracts

Every query fixture settles into the exact root value after first paint. Skeleton roots alone expose aria-busy=true. Each fixture renders exactly one top-level data-state-surface; no mutually exclusive state module coexists.

| Screen | Root attribute | Exact states |
|---|---|---|
| 19 | data-rpg-state | default, low-confidence, skeleton, empty, error, success, disabled, offline |
| 42 | data-celebration-state | default, skeleton, cia-null, streak, share-error, dismissed, toast |
| 43 | accepted sentinel | no source-authored fixture state; behavior exercised through the accepted default |
| 68 | data-search-state | default, first-use, results, loading, zero-results, error, offline |
| 71 | data-achievement-state | default, skeleton, first-use, filtered-empty, error, offline, success |
| 83 | data-buddy-state | default, skeleton, empty, pending, removed, error, success, consent-missing, offline |
| 92 | data-reputation-state | default, skeleton, empty, offline, sync-error, flagged, success, disabled |

S68 disabled is explicitly N/A: no active source defines a truthful disabled-search condition, so the batch does not fabricate one. S43 remains immutable and is verified as accepted.

## Stable substate attributes

| Screen | Required stable substates |
|---|---|
| 19 | data-rpg-panel=closed/domain/ranked/data-controls; data-domain-count=10; data-life-power=487; data-domain-ranking-count=10 |
| 42 | data-overlay-open=true/false; data-share-state=idle/error/retry; data-celebration-kind=level/streak/toast; data-domain-evidence-count=0/2 |
| 68 | data-selected-category=all/missions/habits/recipes; data-search-panel=closed/result; data-history-state=present/deleted; data-cia-suggestion=visible/dismissed; data-query; data-result-count |
| 71 | data-achievement-filter=all/fitness/nutrition/finance/meditation; data-achievement-panel=closed/badge; data-earned-count; data-total-count; data-completion-percent |
| 83 | data-buddy-panel=closed/visibility/safety/mission/avatar-consent; data-shared-mission-count |
| 92 | data-reputation-panel=closed/metric/premium/safety/tier; data-selected-metric=none/consistency/helpfulness/engagement/accountability; data-score=82/none |

## Exact screenshot manifest

- 19 (11): 19-default.png, 19-low-confidence.png, 19-skeleton.png, 19-empty.png, 19-error.png, 19-success.png, 19-disabled.png, 19-offline.png, 19-domain-sheet-fitness.png, 19-ranked-breakdown.png, 19-data-controls.png.
- 42 (9): 42-default.png, 42-skeleton.png, 42-cia-null.png, 42-streak.png, 42-share-error.png, 42-dismissed.png, 42-toast.png, 42-reduced-motion.png, 42-enlarged-actions.png.
- 43 (5): 43-default.png, 43-price-exits.png, 43-cta-outcome.png, 43-compare-outcome.png, 43-enlarged-exits.png.
- 68 (11): 68-default.png, 68-first-use.png, 68-results-run.png, 68-loading-morning.png, 68-zero-results-yoga.png, 68-error-local.png, 68-offline-local.png, 68-filter-habits.png, 68-cia-dismissed.png, 68-history-deleted.png, 68-result-opened.png.
- 71 (10): 71-default.png, 71-skeleton.png, 71-first-use.png, 71-filtered-empty-meditation.png, 71-error-cached.png, 71-offline-cached.png, 71-success-new-badge.png, 71-filter-fitness.png, 71-earned-detail.png, 71-reduced-motion.png.
- 83 (14): 83-default.png, 83-skeleton.png, 83-empty.png, 83-pending.png, 83-removed.png, 83-error.png, 83-success.png, 83-consent-missing.png, 83-offline.png, 83-visibility-sheet.png, 83-safety-sheet.png, 83-mission-detail.png, 83-avatar-consent.png, 83-message-outcome.png.
- 92 (13): 92-default.png, 92-skeleton.png, 92-empty.png, 92-offline.png, 92-sync-error.png, 92-flagged.png, 92-success.png, 92-disabled.png, 92-metric-consistency.png, 92-premium-lock.png, 92-premium-outcome.png, 92-safety-controls.png, 92-tier-detail.png.

Total: 11 + 9 + 5 + 11 + 10 + 14 + 13 = 73 PNGs. Seven additional isolated 125% text proofs yield exactly 80 contexts.

## Frozen product and data decisions

- Visible coach name is CIA in all caps. The strict field visibleWrongCaseCia is a known misnamed positive-CIA instrumentation field; dedicated checks reject visible SIA, Sia, and Cia.
- Current ten-domain registry order is Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing, Meditation. Live globals supply the matching domain tokens.
- S19 exact payload is 74,42,55,51,48,28,33,30,62,21 in registry order and must compute Life Power 487. The same array drives radar, visible cards, score-ordered alternative, strongest/growth copy, and ranking. Identity is Amira, level 12. The character XP track is explicitly independent of Life Power and carries Balencia RPG provenance.
- S42 exact event is overall level 12→13, +120 XP, 82% to the next level. Its neutral emblem is code-native; Fitness/Finance evidence is shown through domain-tag styling. Streak omits the level progress region, while CIA-null omits both divider and CIA card.
- S43 source stays exact SHA 134d064bfef7d1d9a4b77f6ac4558a8c80beaa14fe42167501396797dd6e39c3.
- S68 query run produces exactly four rows from one model: Missions 1 (Run a 5k, real), Habits 2 (Morning run prep, low-confidence; Post-run stretch, honest-null), Recipes 1 (Post-run bowl, real). Offline/error local fallback contains exactly the three Missions/Habits rows and omits Recipes. Default has recent queries and zero result rows; first-use has suggestions and zero history; loading has four skeleton rows; zero-results has zero rows.
- S71 default is exactly 47/120 = rounded 39%, 12 this month, +3 completion-green, and a populated current streak. Ten-domain coverage totals 47 as 12,7,3,8,5,2,3,2,3,2 in registry order. First-use is exact 0/120, 0%, Your streak starts today, and only to-discover tiles.
- S83 default contains exactly two shared mission rows and derives 2 active from that array. Default never shows the empty prompt. HIFI-83-01 stays AK initials; no media opens before consent. The shared shape exposes only the two consented concepts required by the active S83 spec and no stray Mindfulness node.
- S92 default is score 82/100, Mentor, and 18 points to next tier. Default contains neither offline nor sync-error. Offline alone labels cached freshness and disabled reasons; sync-error alone exposes Retry; Empty omits score/history/CIA; Flagged replaces No active flags with private evidence/policy/appeal.

## Exact contextual data-control set

Where a D2 screen exposes a contextual data-control surface, it provides exactly these eight real local-preview buttons: Category, Source, Scope, Freshness, Retention, Export, Revoke, Delete. Confidence may appear as non-action provenance but is not a ninth control.

## Hard assertions

1. Family-wide: all visible enabled controls produce local state, a same-origin route, or a focus-trapped overlay. No enabled actionless control remains. Targets are at least 44x44, editable text at least 16px, mutable semantic text at least 12px, normal text at least 4.5:1, and UI/focus at least 3:1. Keyboard operation, visible focus, logical headings, reduced motion, actual 125% text enlargement, scroll clearance, modal inertness/trap/Escape/restoration, equal exits, and non-color cues pass.
2. Capability honesty: zero console/page errors and zero forbidden capability events. No external/API mutation, auth, storage, cookies, clipboard, media/file picker, native share, download, WebSocket, call/text, purchase, provider, OS permission, or external navigation occurs. Prototype outcomes state what did not occur.
3. State exclusivity: each exact fixture retains its query/nonce, exposes the matching root, exactly one data-state-surface, valid substates, no contradictory state copy, and pixels distinct from default when required.
4. S19: exact ten-domain order/values/source; computed visible and accessible 487; exact ten visible domain controls plus a score-ordered list; domain and ranked sheets; 44px navigation; exact eight data controls; no 8/9 or nine-domain copy; no hard-coded alternate score; character XP explicitly independent of Life Power.
5. S42: one modal/default, one primary Continue, one secondary Share, labelled scrim dismissal, neutral code-native emblem with text equivalent, 82% announcement, exactly two domain tags, no nested glass inside the overlay, fully visible actions at 390x844 and 125%, focus trap/restore, honest share failure/retry, streak/CIA-null omission rules, and immediate reduced-motion dismissal.
6. S43: exact SHA before/build/verifier/after; exactly one primary action; canonical labelled PaywallLock with inert aria-hidden real layout and computed blur(20px); concrete weekly outlook; semantic four-column comparison with three nonblank rows; no unsupported trial; exact price/provenance/storefront/cancel copy; equal 44px Compare/Maybe later exits; correct close/back; local CTA/compare outcomes; seeded-history dismissal; final shared dependency behavior unchanged.
7. S68: one labelled input[type=search] with real focus; 300ms result state; conditional 44px Clear empties/refocuses; native selected filters with visible non-color marker; every displayed count equals exact rows; first-use/history distinction; one state surface; offline/error rows obey the frozen model; Cancel, CIA dismiss, history delete, result open, and Retry have honest local/same-origin outcomes.
8. S71: collision-free accessible sentence equivalent to 47 out of 120 achievements earned. 39 percent complete.; exact ten-domain coverage; Achievement terminology only; no emoji/literal color; native filter and code-native tile controls; visible non-color selection; default/first-use separation; filtered empty; labelled detail sheet with focus restoration; deterministic success and reduced motion; no PaywallLock.
9. S83: default count equals exactly two native 44px mission rows; Empty has zero rows and one Invite; Pending/Removed keep Message visible but disabled with associated reason; consent-missing hides shared shape/claim and exposes No shared insight yet; initials remain; no paywall; visibility sheet has per-domain controls plus export/revoke/delete history; safety has mute/remove/report/block with destructive confirmation; avatar/media stays consent-first; all local outcomes are explicit.
10. S92: mutually exclusive default/offline/sync-error; native metric buttons open labelled value/source/freshness/confidence explanations; canonical PaywallLock over a real audit-trail layout with local unlock outcome; Empty has no numeric score/populated claims; Flagged has private evidence/policy/appeal; Safety exposes audience, visibility, report, mute, block, own-content delete, export, revoke; disabled appeal explains why; score/tier/progress are textual and non-color-dependent.
11. Evidence: every required changed-state/action screenshot differs from its paired default. All 73 promoted PNGs are exactly 390x844, uniquely named, pass-atomic, and current. 42-enlarged-actions and 43-enlarged-exits visibly prove target clearance at 125%.

## Integrity fingerprints

- Product files: the seven D2 screen files plus profile index. S43 is separately exact-byte locked.
- Shared/API files: package/lock/config, layout/globals, HifiPrototype, HifiShell, ScreenShell/PhoneFrame, shared buttons/chips/chrome/core/data/CIA/glass input/paywall/surfaces/system/signature icons, screen/profile registries, persona/domain/screen data, dynamic route, and verifier self.
- Authority files: D2 audit/specs, RPG authority, compact canon, component catalog, REFERENCE-DIRECTION, DECISIONS, batch/matrix, before-source/capture, asset disposition, reconciliation/builder/reviewer packets, and accepted evidence present at run time.
- Accepted-family sentinels: inherited 39-row manifest plus eight D1 files = exactly 47 unique accepted pilot/A1/A2/B1/C1/D1 source files. S12 remains exact 107b59b58bca73a05045dfd90a68cdf4219176f72aa7e6dcf48b59165f75df67 and S43 exact as above.
- Start/end product/API/authority/accepted digests match within the verifier. Local BUILD_ID must bind every product/API source timestamp to the fresh production build.

## Frozen ownership

| Owner | Files |
|---|---|
| Terra A | S19RpgCharacter.tsx, S42CelebrationOverlay.tsx |
| Terra B | S68UniversalSearch.tsx, S71AchievementGallery.tsx |
| Terra C | S83BuddyProfile.tsx, S92Reputation.tsx |
| Sol only | S43 sentinel custody; shared kit/globals/registries/routes; verifier; batch/evidence/ledger/decision/handoff |

## Freeze checklist

- [x] Current state/query/control/data/shared surfaces inventoried.
- [x] Stale audit claims and source conflicts adjudicated.
- [x] Strict before evidence captured and inspected before product edits.
- [x] Exact 73-PNG/80-context contract recorded.
- [x] 390x844, 125%, interaction, focus, capability, and integrity contracts recorded.
- [x] Combined accepted set validated at 47 unique current files.
- [x] Asset disposition recorded.
- [x] Builder ownership frozen and disjoint.
- [x] Matrix frozen before any D2 product edit.
