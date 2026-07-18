# F2 health, care, and media audit

Authority: read-only VISUAL-001 evidence. This report closes no finding, mints
no ID, and does not replace REMEDIATION-LEDGER.md.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍  DESIGN AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Field | Value |
|---|---|
| Input | Canonical F2 health/care/media family |
| Type | React + current 390×844 PNGs + hi-fi specs/canon |
| Framework | Next.js 16 / React 19 / Tailwind CSS 4; local Balencia kit |
| Scope | Exactly 57, 58, 60, 62, 63, 70, 86, 87, 88, 89 |
| Date | 2026-07-10 PKT |
| Confidence | High for code/spec findings; medium for optical-only observations |
| Rubric | Design Auditor lenses 1–12 and 14–19; WCAG AA dev-handoff strictness; lens 13 i18n N/A |

The F2 contact sheet contains 57, 58, 60, 62, 70, 86, 87, 88, and 89.
Screen 63 is absent and was audited from local-baseline/63.png. B57–B89 below
inherit the matching individual baseline, local-baseline.json, current React
module, current spec, and contact-sheet tile where present.

Fresh JSON has no scanner/page/console errors. It does flag S57 non-native
checkbox roles, S60 a 124×16 Cia-help target, visibleWrongCaseCia on every
screen except 70, and interactive counts 57=4, 58=2, 60=2, 62=8, 63=1,
70=13, 86=3, 87=10, 88=6, 89=1. A clean scanner result is not a manual pass.

## Compact scores

These values are **non-authoritative family rubric diagnostics**, not a
Balencia aggregate grade. Historical B+/84 remains historical; R11 alone owns
the next aggregate re-grade.

Overall 32/100; Accessibility 76/100 with WCAG blockers; Ethics 93/100;
Usability 64/100. Overall arithmetic:
100 − (2 × Blocker 12) − (3 × Critical 8) − (5 × Warning 4) = 32.
The deductions are deduplicated by systemic root, not repeated per screen.
Highest-risk lenses are contrast/type, accessibility/forms/navigation, health
safety, states/data truth, and media/privacy; motion and dark-surface depth are
the strongest lenses.

## Finding defaults

Sol/root owns acceptance and ledger mapping. Existing implementation ownership
remains: A24-003 SON-UX + FBL; A24-004/A24-010 SON-I; A24-007 SON-UX;
A24-008 FBL + GLM with SON-I review; A24-016 AST + FBL. RW-R0/RW-VF owners
are confirmed at batch start. Unless stronger below: audit complete,
remediation open, no closure claimed.

## Systemic roots

| Existing authority | Scope | Severity · class | Before evidence | Affected surface | Proposed fix | Acceptance | Owner · status |
|---|---|---|---|---|---|---|---|
| RW-VF-01/02/05; A24-010 overlap | All ten | Blocker · systemic | B57–B89; shared buttons/text tokens | white on brand-orange CTA text; white /30–/45 microcopy; 9–11px semantic labels | Apply one AA-safe semantic text/CTA/type-role matrix | Normal text ≥4.5:1, large/UI ≥3:1; semantic copy ≥12px unless waived; text expansion verified | Sol/root + existing token owner · RW-VF-01/05 open; RW-VF-02 visual direction blocked on Image 2, semantic work open |
| A24-010; S-03/RW-019/RW-025; RW-R0-01/07 | 57,58,60,62,63,70,88,89 | Blocker · systemic controls/safety | B57/B58/B60/B62/B63/B70/B88/B89 | GlassPillInput; role-checkbox spans; dose rows; faux inputs/CTAs; SafetyCard; module/source chips; 28px-high switch | Use native controls/full equivalent semantics; make crisis guidance a real destination | Keyboard/touch/focus/names/states, 44px targets, non-color medication status, crisis entry reachable offline, no affordance-count regression | Sol/root + SON-I/existing safety owner · R2/R3/R4 queued; open |
| RW-VF-08; RW-R0-13 overlap | All ten | Warning systemic; Critical where contradictory | Specs/modules/B57–B89 | default-only frames do not evidence empty/partial/error/offline/reduced-motion matrices | Maintain one product state per frame and add review variants outside the phone | Every applicable default/skeleton/empty/partial/error/offline/disabled/success state dispositioned; cached/stale/queued copy truthful | Sol/root + existing state owner · RW-VF-08 open |
| A24-004/RW-028; RW-R0-17 overlap | 60, 63 | Critical · systemic monetization | B60/B63; COMPONENT-CATALOG PaywallLock rules | inline Lock text/opaque gray lock replaces real preview and unlock path | Adopt canonical PaywallLock over real CIA/ImpactBarRow layouts | Blur-20 real layout, value copy, Unlock CTA, never hidden/dead-ended; entitlement state coherent | Sol/root + SON-I · R5 queued |
| A24-016/RW-033/RW-034 | 70,86,87,88 | Warning · systemic media delivery | B70/B86/B87/B88; _IMAGE-SLOTS.md | HIFI-70/86/87/88-01 remain glyph/text placeholders | Deliver privacy-safe, non-diagnostic assets with provenance manifest | Slot IDs wired; no face/home/logo/readable private text; alt/source/consent states verified | Sol/root + AST/FBL · R9 queued |
| A24-008/RW-007..013 | 57,58,60,62,63,86,87,88,89 | Warning · systemic terminology | local-baseline.json; B57–B89 | visible/aria CIA strings; identifiers exempt | Complete existing Cia convergence | visibleWrongCaseCiaScreens empty and copy gate green at one SHA | Sol/root + FBL/GLM, SON-I review · R1 gated |

## One row per screen

| Screen / route | Severity · class | Existing authority | Before evidence / affected surface | Proposed fix and acceptance | Owner · status |
|---|---|---|---|---|---|
| 57 · no live route; nested shopping module | Blocker · local + inherited | A24-010/RW-019; RW-R0-07; RW-VF-01/08 | B57; S57ShoppingList.tsx:37-150; GlassPillInput, role-checkbox spans, inert row gesture, FloatingQuickLog | Native labeled add input and checkbox/row actions with keyboard undo/edit path. Preserve the honest 2/8=25%, cached-source, estimated-quantity, consent and allergy copy | Sol/root + SON-I · R3 queued |
| 58 · no live route; nested sleep module | Blocker/Warning · shared safety + local viz | RW-R0-01/12/15/18/19; A24-008; RW-VF-08 | B58; R0/reviews/S58.md; SafetyCard, missing ConsistencyCloud, continuous TrendChart, HeatGrid aria, subcard provenance | Reachable crisis action; data-backed seven-night cloud; visually/verbally exposed missing-night gap; chart source/confidence/gap summary and subcard provenance. Acceptable: score 82, source/freshness and hedged HRV advice are coherent | Sol/root + existing safety/viz owner · open |
| 60 · no live route; source-only medication | Blocker/Critical · medical safety/local truth | S-01/S-02/S-03 + RW-025; RW-R0-04/07/12; A24-003/004/008/010 | B60; R0/reviews/S60.md; hero says 3/4=75% while only 2 doses are checked; named Adderall XR plus no-pressure/take-when-ready copy; color-only inert dose rows; ring collision; error-only heatmap; ad-hoc lock | Use neutral demo medication and safety-reviewed adherence copy; one coherent dose truth; native labeled status controls; three-state 4×7 heatmap; repaired ring; canonical PaywallLock; purple only for Cia. Keep doctor-warning and add-medication label | Sol/root + RW-025 owners · R4 queued; R5 Paywall queued |
| 62 · /quick-notes | Blocker/Warning · controls/safety/data scope | RW-R0-01/10/13; A24-008/010; RW-VF-08 | B62; S62QuickNotes.tsx:21-126; faux composer input, inert SafetyCard; Captured this month over 12 This week; Mood pressed while mixed-domain notes remain; Health/Mood color-system collision | Native labeled composer; reachable crisis entry; explicit weekly/monthly KPIs; inclusive All default or actually filter; canonical domain labels/colors; your sleep copy. Acceptable: private-note consent, logged/chat provenance and knee-note non-diagnostic framing | Sol/root + existing owners · open |
| 63 · /wellbeing/energy | Critical/Blocker inherited · local entitlement/controls | A24-004/RW-028; A24-010; RW-R0-13/15; RW-VF-08 | B63; S63EnergyTracking.tsx:4-38; faux feeling field/Log CTA/chips; opaque premium lock while default spec says established premium; unprovenanced Cia correlation | Native log field, slider/chips and submit states; one explicit free/premium entitlement; PaywallLock over real ImpactBarRow preview; evidence/source/freshness on Cia read. Acceptable: 7.5 aligns with 75%; avg 6.2 and five logs do not self-conflict | Sol/root + SON-I · R3/R5 queued |
| 70 · /exercises, /exercises/[id] | Blocker/Warning · search/media | A24-010/016; RW-033; RW-VF-05/08 | B70; S70ExerciseLibrary.tsx:96-167; GlassPillInput; HIFI-70-01 placeholders; card aria omits difficulty/source/media | Native labeled search; wire privacy-safe media; announce all card facts; evidence empty/offline/detail states. Acceptable: 532/local-cache, ordinal difficulty, Unrated and Estimated cue are internally honest; medical disclaimer is explicit | Sol/root + SON-I/AST/FBL · R3/R9 queued |
| 86 · /wellbeing/virtual-tryon | Critical/Warning · consent-state/media | A24-007/016; RW-030/033; RW-R0-13; RW-VF-08; A24-008 | B86; S86VirtualTryon.tsx:23-149; accepted/revocable consent coexists with Needs photo consent; Via upload placeholder and pending render coexist with active scrubber; HIFI-86-01 absent | Derive consent/reason from one state; no scrubber until both images exist; name failed safety step; confirm destructive deletes; wire privacy-safe slot. Acceptable: 30-day retention, no-training statement, revoke/delete and non-identifiable placeholders are strong | Sol/root + SON-UX/AST/FBL · R7/R9 queued |
| 87 · /wellbeing/virtual-tryon/history | Critical/Warning · numeric/media | RW-R0-12/15; A24-016/RW-034; RW-VF-08; A24-008 | B87; S87TryonHistory.tsx:93-209; May 21 says 2 looks but renders 3; generic Try-on history provenance; HIFI-87-01 absent | Count rows from data or split the third date group; replace generic provenance with source/freshness; wire privacy-safe thumbs and state variants. Acceptable: source deleted/generated kept, render confidence, retention, export and delete controls are explicit | Sol/root + existing data/AST/FBL owners · R9 queued |
| 88 · /wellbeing/vision | Blocker inherited/Warning · target/media/state | A24-010/016; RW-034; RW-VF-01/02/08; A24-008 | B88; S88VisionSuite.tsx:28-168; 28px-high consent switch; HIFI-88-01 absent; implementation-note reduced-motion copy shown in default | Expand switch hitbox to 44px; wire non-diagnostic visual; move implementation note to help/docs while retaining actual reduced-motion behavior; evidence disabled/error states. Acceptable: 2:00 session and 15s sub-timer can coexist; non-diagnostic and urgent-clinician guidance are clear/reachable | Sol/root + SON-I/AST/FBL · R3/R9 queued |
| 89 · /wellbeing | Blocker/Critical · safety/truth/privacy/layout | A24-001; RW-R0-01/12/15; A24-007 + RW-R0-03/14; A24-008/010; RW-VF-08 | B89; S89Wellbeing.tsx:4-53; static crisis card/modules/source chips; one breath session helped twice conflicts with two breathing sessions; generic Fresh source; no consent sheet entry; quick-log obscures initial insight actions | Reachable offline crisis routes; native module/source actions; one evidence-backed session count; source/freshness and data-control sheet; reserve bottom-action clearance. Acceptable: safety is above modules, four signals are non-diagnostic, and Help is labeled | Sol/root + existing safety/privacy owner · A24-001 closes only at final SHA; remediation open |

## What is already sound

- Medical boundaries are strongest on 70 and 88: both explicitly avoid diagnosis,
  direct urgent symptoms to a clinician, and do not present rehab/treatment claims.
- Media privacy is intentionally conservative: 86/87 placeholders show no
  identifiable person, and 86 visibly states purpose, retention, no model
  training, revoke, and delete.
- 57, 58, 63, 70, 87, and 88 use honest-null/estimated/source language rather
  than silently promoting uncertain values to facts.
- globals.css has a credible reduced-motion foundation; final verification must
  confirm repaired states remain distinguishable without animation.

## Blockers and close order

The family is not ready for development handoff.

1. Repair shared AA/type tokens and native controls, especially crisis access,
   medication status, note/search/log fields, and source/module actions.
2. Close RW-025: neutral medication fixture/copy, coherent adherence math,
   non-color accessible dose status, real/low/null heatmap, ring geometry.
3. Resolve 62/86/87/89 state and numerical contradictions.
4. Complete PaywallLock on 60/63 without hiding real preview structure.
5. Deliver HIFI-70/86/87/88-01 under the privacy manifest.
6. Evidence the state matrix and reduced motion, complete Cia casing, then
   recapture one SHA and run keyboard, screen-reader, safe-area and text-growth
   verification.

Image 1 and Image 2 remain absent, blocking final RW-VF-02/icon art direction
but not safety, semantics, truth, PaywallLock or state work. R1 is gated; R5,
R7, and R9 are queued. This is a UI-signal audit, not medical or legal advice;
jurisdiction- and clinical-safety requirements need qualified review.

## Provenance limits

Design Auditor Skill v1.2.13 was applied through its embedded rules. Its
referenced references/ bundle is absent, so no missing reference was invented.
No browser, network, Figma, runtime mutation, or non-report edit was performed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Audit run with Design Auditor Skill v1.2.13 · React + PNG + spec evidence · high/medium confidence*
*Re-audit after fixes to track progress.*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
