# I1 system and media audit

Authority: read-only VISUAL-001 evidence. This report closes no finding, mints
no ID, and does not replace REMEDIATION-LEDGER.md or DECISIONS.md.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍  DESIGN AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Field | Value |
|---|---|
| Input | Canonical I1 system/media family |
| Type | React + current 390×844 PNGs + specs/canon/decisions |
| Framework | Next.js 16 / React 19 / Tailwind CSS 4; local Balencia kit |
| Scope | Exactly 67, 69, 80, 81, 85, 98 |
| Date | 2026-07-10 PKT |
| Confidence | High for code/spec findings; medium for optical-only observations |
| Rubric | Design Auditor lenses 1–12 and 14–19; WCAG AA dev-handoff strictness; lens 13 i18n N/A |

The I1 contact sheet contains 67, 80, 81, 85, and 98. Screen 69 is absent and
was audited from local-baseline/69.png. B67–B98 below inherit the matching PNG,
local-baseline.json, current module, current spec, R0 review, and contact-sheet
tile where present.

Fresh JSON has no scanner/page/console errors. It flags S80 text truncation
(already waived W-TRUNC-80), S81 small See all/bookmark targets, Cia casing on
67/80/81/85, and interactive counts 67=14, 69=8, 80=6, 81=6, 85=1, 98=3.
A clean scanner result is not a manual pass.

## Compact scores

These values are **non-authoritative family rubric diagnostics**, not a
Balencia aggregate grade. Historical B+/84 remains historical; R11 alone owns
the next aggregate re-grade.

Overall 28/100; Accessibility 76/100 with WCAG blockers; Ethics 85/100;
Usability 60/100. Overall arithmetic:
100 − (2 × Blocker 12) − (4 × Critical 8) − (4 × Warning 4) = 28.
Ethics deducts one high-confidence Deceptive pattern for sentiment-gated public
review routing. Deductions are deduplicated by root, not repeated per screen.

## Finding defaults

Sol/root owns acceptance and ledger mapping. Existing owners remain:
A24-003 SON-UX + FBL; A24-010/A24-017 SON-I; A24-008 FBL + GLM with SON-I
review; A24-012 SON-UX; A24-016 AST + FBL. RW-R0/RW-VF work is assigned at
batch start. Unless stronger below: audit complete, remediation open, no
closure claimed.

## Systemic roots

| Existing authority | Scope | Severity · class | Before evidence | Affected surface | Proposed fix | Acceptance | Owner · status |
|---|---|---|---|---|---|---|---|
| RW-VF-01/02/05; A24-010 overlap | All six | Blocker · systemic | B67–B98; shared CTA/text tokens | white/orange CTA labels; white /30–/45 microcopy; 10–11px semantic text | Apply AA-safe semantic text/CTA/type roles | Normal text ≥4.5:1, large/UI ≥3:1; semantic copy ≥12px unless waived; text expansion verified | Sol/root + token owner · RW-VF-01/05 open; RW-VF-02 visual direction blocked on Image 2, semantic work open |
| A24-002/010; RW-018/RW-037; RW-R0-07 | 67,69,80,81,85 | Blocker · systemic controls | B67/B69/B80/B81/B85 | buried pagination; star selection lacks aria-pressed; waveform div; GlassPillInput/filter spans/video rows; static blocker rows | Restore native controls/full semantics without losing geometry | Keyboard/touch/focus, names/states, 44px targets, gallery/video/seek alternatives, no affordance-count regression | Sol/root + SON-I/existing semantics owner · R2/R3 queued |
| RW-R0-13 + RW-VF-08 | 67,69,80,85,98 | Critical · systemic state truth/coverage | B67/B69/B80/B85/B98 | loaded+offline viewer; preselected rating; connected+Connect; missing obstacle actions; inverted/missing system states | One coherent state model per product frame; separate review variants | Default/skeleton/empty/error/offline/success/disabled dispositions; labels and controls derive from the same state | Sol/root + existing state owner · RW-VF-08 open |
| RW-R0-14; A24-012/RW-030/031 overlap | 69,80,85,98 | Critical · systemic privacy/capability | B69/B80/B85/B98 | missing or duplicated source/retention/export/revoke/delete; status routes risk implying product-wide offline capability | Use one scoped Data/Consent surface; map claims to dependency evidence | Source/scope/freshness/retention/export/revoke/delete reachable; screen98 explicitly says state coverage, not general offline product support | Sol/root + SON-UX/existing privacy owner · R6/R7 queued |
| A24-016/RW-033/RW-034b | 67,80,81 | Warning · systemic media delivery | B67/B80/B81; _IMAGE-SLOTS.md | HIFI-67/80/81-01 remain abstract/glyph placeholders | Deliver or explicitly waive each slot under the asset manifest | Slot IDs dispositioned; privacy/license/provenance/alt states verified | Sol/root + AST/FBL · R9 queued |
| A24-008/RW-007..013 | 67,80,81,85 | Warning · systemic terminology | local-baseline.json; B67/B80/B81/B85 | visible/aria CIA strings; identifiers exempt | Complete existing Cia convergence | visibleWrongCaseCiaScreens empty and copy gate green at one SHA | Sol/root + FBL/GLM, SON-I review · R1 gated |

## One row per screen

| Screen / route | Severity · class | Existing authority | Before evidence / affected surface | Proposed fix and acceptance | Owner · status |
|---|---|---|---|---|---|
| 67 · no live route; image-viewer overlay | Blocker/Critical · local layout/component/media | RW-R0-07/08/18; A24-003/016/017; RW-024/RW-033; RW-VF-08 | B67; S67ImageViewer.tsx:4-152; pagination is behind the variable bottom sheet; ComparisonSlider absent; no mount announcement; loaded canvas and offline retry coexist; HIFI-67-01 placeholder; off-token orange | Put pagination in safe layout flow; build ComparisonSlider; announce source/position/privacy; separate thumbnail/high-res/offline states; wire privacy-safe asset/token colors. Acceptable: close/share/download/delete/report, encryption/share warning, data disclosure and gesture-alternative buttons exist | Sol/root + SON-I/AST/FBL · R4/R9 queued |
| 69 · no live route; triggered rating sheet | Critical + Ethics Deceptive · local | RW-R0-13/14/17; RW-VF-01/08 | B69; S69AppRating.tsx:4-104; 1 star is preselected without aria-pressed; 4–5 public-store versus 1–3 private-feedback routing biases reviews; permanent suppression is visually weaker; consent controls missing | Honest-null stars until user action; announce selection; do not sentiment-gate public review access; give Not now and Do not ask again equal reach; scoped consent/export/delete/revoke; keep trigger metadata debug-only | Sol/root + existing trust/privacy owner · open; safe-area padding itself passes |
| 80 · /soundscape | Blocker/Critical · connected-state truth | DVF-02 + RW-R0-13; RW-R0-07/10/11; A24-008/016; RW-034b; W-TRUNC-80 | B80; DECISIONS.md:15-21; S80MusicCoach.tsx:42-233; playing/Via Spotify/Cached 2m state still ends in Connect Spotify; waveform is inert; ad-hoc glass/status color; duplicated consent; HIFI-80-01 placeholder | Implement binding Manage Spotify connected CTA; reserve Connect for cold start and Refresh/Try again for expired/error; semantic seek control; canonical Cia/SolidCard and scoped consent; asset disposition. Acceptable: Spotify capability is evidenced in production docs, playback/provenance/BPM math are coherent, and W-TRUNC-80 remains intentionally waived | Sol/root + existing owners · DVF-02 decided, implementation open; R4/R9 queued |
| 81 · no live route; video utility | Blocker/Warning · controls/media | A24-003/008/010/016; RW-018; RW-R0-07; RW-034b; RW-VF-08 | B81; S81VideoLibrary.tsx:4-174; fake search, inert filter chips, unplayable next-video rows, orphaned listitem roles, 32×44 bookmarks/36×16 See all, HIFI-81-01 placeholders | Native labeled search/tabs/list; whole-row play/resume; 44px actions; canonical progress/status color; asset and state variants. Acceptable: featured Play is real, 43%/12% progress and unavailable/retry states are honestly distinguished, and external-browser/no-share copy is clear | Sol/root + SON-I/AST/FBL · R3/R9 queued |
| 85 · /obstacles/[id] | Critical/Blocker inherited · layout/truth/privacy/capability | RW-R0-08/09/12/14/18; A24-008; RW-VF-03/04/07/08 | B85; S85ObstacleCoach.tsx:17-142; ad-hoc bottom CTA covers nav; 3 blockers but 2 rows; ChoiceCardFrost accept/dismiss absent; undefined font-headline; data controls absent; diagnosis/root-cause capability lacks dependency disposition | Use HifiShell bottomAction; reconcile count or show +1; build accept/dismiss/undo and states; tokenized H1; one consent/data sheet; map diagnosis/plan claims to implemented dependencies; retain static reduced-motion orb distinction after references | Sol/root + existing owners · semantic/state work open; orb/icon direction blocked on Images 1/2 |
| 98 · /offline, /maintenance, /forbidden, /unauthorized, /coming-soon | Critical · canonical-state reference | A24-012/RW-031; RW-R0-10/13/14; S-04/S-08/RW-026; RW-VF-08 | B98; S98SystemStates.tsx:17-207; resolved cached values use shimmer while Skeleton State is static; success/disabled missing; no cached-health consent controls; error uses effort-orange and maintenance uses Cia-purple; title-case/fabricated buddy copy | Swap correct skeleton treatment; add success/disabled examples; consent controls and A24-012 capability badge; neutral/error elevation; sentence case and plain copy. Multiple named examples may coexist on this review catalog, but each production route must render only its route state. Acceptable: stale age, recovery actions, no-ETA maintenance, support entry and cached-data labeling are explicit | Sol/root + SON-UX/existing owners · R4/R6/R7 queued |

## What is already sound

- Screen 67 exposes unusually clear encryption, external-share, source-setting,
  delete and report context for sensitive media.
- Screen 69 respects the bottom safe area and provides immediate and permanent
  dismissal paths; the trust defects are their weighting/default/routing.
- Screen 80 has strong provider provenance and production capability evidence;
  the defect is the state-specific CTA, not an unsupported Spotify claim.
- Screen 98 uses human recovery copy and factual stale/ETA language; it should
  remain the system-state design reference once its treatments are corrected.

## Blockers and close order

The family is not ready for development handoff.

1. Repair shared AA/type and native-control semantics.
2. Apply DVF-02: connected screen 80 must show Manage Spotify.
3. Remove S69 fabricated selection and sentiment-gated review routing.
4. Fix S67 pagination/safe-area composition and S85 bottomAction/nav overlap.
5. Complete S85 blocker actions/count/dependencies and S98 canonical state set.
6. Complete consent/dependency rows, HIFI-67/80/81 assets and Cia convergence,
   then verify keyboard, assistive tech, safe areas, state transitions and
   reduced motion at one SHA.

Image 1 and Image 2 remain absent, blocking final RW-VF-02/03/04 art direction
but not semantics, truth, privacy, state or layout work. DVF-02 resolves the
screen-80 direction but does not close RW-R0-13 or mutate the ledger.

## Provenance limits

Design Auditor Skill v1.2.13 was applied through its embedded rules. Its
referenced references/ bundle is absent; no missing reference was invented.
No browser, network, Figma, runtime mutation, or non-report edit was performed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Audit run with Design Auditor Skill v1.2.13 · React + PNG + spec evidence · high/medium confidence*
*Re-audit after fixes to track progress.*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
