# D2 profile and commercial audit

Authority: read-only VISUAL-001 evidence. This report closes no finding, mints
no ID, and does not replace REMEDIATION-LEDGER.md.

## Scope and evidence

- Canonical scope: 19, 42, 43, 68, 71, 83, 92.
- Contact sheet: VISUAL-001/audit-sheets/D2-profile-commercial-social.png.
  It contains 42, 43, 68, 69, 71, 83, 92; noncanonical tile 69 was ignored.
  Screen 19 was reviewed from local-baseline/19.png.
- B19/B42/B43/B68/B71/B83/B92 below each inherit the matching individual PNG,
  local-baseline.json, current React module, and current hifi-screens spec.
- Routes: 19 /life-world; 42 /subscription/success; 43 /subscription,
  /upgrade, /locked/[pageKey]; 68 global SearchOverlay (no live route);
  71 /achievements; 83 /profile/[id]; 92 /reputation.
- Fresh baseline JSON has zero scanner issues/warnings/errors, but
  visibleWrongCaseCia=true on all seven. Interactive counts are 19=0, 42=2,
  43=2, 68=13, 71=0, 83=3, 92=1. R0/affordance-inventory.md already records
  the scanner blind spot for actionable div/span surfaces.
- Design Auditor lenses 1–12 and 14–19 were applied at WCAG AA development
  handoff strictness. Lens 13 i18n is not applicable in this slice.

## Finding defaults

Sol/root owns acceptance and ledger mapping. Implementation remains with each
existing authority owner: A24-004/A24-010/A24-017 SON-I; A24-008 FBL + GLM
with SON-I review; RW-R0/RW-VF ownership is confirmed at batch start. Unless a
stronger status is shown, every item is audit-complete, remediation-open, and
claims no closure.

## Findings crosswalk

| Existing authority | Route/screen | Severity · class | Before evidence | Affected surface | Proposed fix | Acceptance | Owner · status |
|---|---|---|---|---|---|---|---|
| RW-VF-01/02; A24-010 overlap | All seven | Blocker · systemic | B19–B92; shared buttons/tokens | brand-orange CTA text; white /30–/45 microcopy; BtnPrimary | Apply one AA-safe semantic text/CTA matrix | Normal text ≥4.5:1, large text ≥3:1 on shipped composites; documented exceptions only | Sol/root + existing token owner · RW-VF-01 open; RW-VF-02 visual direction blocked on Image 2, semantic work open |
| A24-010; S-03/RW-002/RW-037; RW-R0-07; RW-VF-08 overlap | 19, 68, 71, 83, 92 | Blocker · systemic component root | B19/B68/B71/B83/B92 | 19 radar/cards/View all; GlassPillInput; 71 chips/tiles; MissionRow; 92 metric rows | Use native inputs/buttons/links or full equivalent semantics | Keyboard/touch, focus, names/states, 44px targets, specified detail sheets, no affordance-count regression | Sol/root + existing semantics owner · open |
| RW-R0-12/13 + RW-VF-08 | 68, 71, 83, 92 | Critical · systemic state/data root | B68/B71/B83/B92 | 68 says 1 mission but renders 3 and 1 habit but renders 2; 83 says 2 active but renders 3; default/empty/loading/error/offline states coexist | Drive counts/rows from one model; render one product state at a time | Counts equal rows; default, skeleton, empty, error and offline are mutually exclusive, separately testable frames | Sol/root + existing data/state owner · RW-VF-08 open |
| RW-R0-08/18; RW-R0-11 detail | 42 /subscription/success | Critical · local | B42; S42CelebrationOverlay.tsx:76-160; spec:73-86 | fixed overlay clips Share; numeral 13 replaces badge emblem; nested glass; generic provenance chips | Add safe overflow/action clearance; restore emblem; use FrostCard/flush stat and domain tags | Both actions fully visible at 390×844 plus text expansion; emblem announced; no nested glass; domain evidence explicit | Sol/root + existing layout/component owner · open |
| A24-004/RW-027/RW-029 + RW-R0-17 | 43 subscription routes; 92 /reputation | Critical · systemic monetization/trust root | B43/B92; COMPONENT-CATALOG.md:112,138 | 43 fake preview, dropped Free values, identical Plus/Pro checks, non-spec CTA, dimmer exit, Lock-as-Close; 92 opaque dead-end premium row | Build canonical PaywallLock over the real attempted layout; truthful entitlements; eligibility-aware CTA; equal exit; correct icon | Blur-20 real preview, lock/value/CTA, no hidden/dead-end feature; all plan cells truthful; trial only when eligible; equal-reach exits | Sol/root + SON-I · R5 queued, open |
| RW-R0-04 | 71 /achievements | Critical · local | B71; S71AchievementGallery.tsx:21-27 | 39% plus Complete collide in 48px ProgressRing | Use supported ring label anatomy or reflow/enlarge | 47/120, 39%, visible label and accessible sentence agree without collision at text expansion | Sol/root + existing ProgressRing owner · open |
| RW-R0-19/18; A24-010 overlap | 19 /life-world | Warning · local fidelity symptom | B19; kit/data.tsx:21-42; spec:61-73,106 | hard-coded generic MiniRadar/487, two axis labels, no ordered list alternative, static domain cards | Bind ConstellationRadar/Life Power to persona stats; expose all axes/list; make cards tappable | One data source for visible/announced 487; every domain available nonvisually; 44px cards | Sol/root + existing visualization owner · open |
| RW-R0-16/10 + A24-017; RW-VF-04 overlap | 71 /achievements | Warning · local RPG/token/icon root | B71; S71AchievementGallery.tsx:38-133 | achievements called missions; empty streak mixed with populated data; Sleep taxonomy drift; +3 orange; rgb(255,122,0); emoji/non-BadgeTile trophies | Restore achievement, BadgeTile, CoverageStrip and domain-tag contracts; semantic success/token colors; separate first-use streak | Achievement terms/taxonomy unambiguous; no literal color; accessible earned/to-discover states | Sol/root + existing copy/color owners · A24-017 open; RW-VF-04 art direction blocked on Images 1 and 2 |
| A24-008/RW-007..013 | All seven | Warning · systemic terminology | local-baseline.json; B19–B92 | visible/aria CIA strings; identifiers exempt | Complete existing visible-copy convergence | visibleWrongCaseCiaScreens empty and copy gate green at one SHA | Sol/root + FBL/GLM, SON-I review · open; R1 gated |

## Per-screen disposition

| Screen | Disposition | Acceptable as-is / required change |
|---|---|---|
| 19 | FIX REQUIRED · Blocker inherited | 2,450/5,809 agrees with 42%, and current Life Power 487 matches persona data. Repair semantic controls and ConstellationRadar fidelity/list alternative. |
| 42 | FIX REQUIRED · Critical | Level 12→13, +120 XP and 82% are coherent. Fix clipped Share, badge emblem, glass tier and evidence tags. |
| 43 | FIX REQUIRED · Critical | $20/mo, app-store provenance, cancel/manage copy and a visible exit are good. Replace the gate/matrix/CTA/exit/icon contract. |
| 68 | FIX REQUIRED · Blocker/Critical | Real/estimated/no-data examples, history delete, retry, offline explanation and ConsentRail are good. Make search a real input and render one count-consistent state. |
| 71 | FIX REQUIRED · Blocker/Critical | 47/120 rounds to 39%; 12 this month and +3 do not conflict. Repair ring, controls, state mix, RPG language/taxonomy and tokens. Earnable badges correctly use BadgeTile rather than PaywallLock. |
| 83 | FIX REQUIRED · Blocker/Critical | AK initials satisfy HIFI-83-01. The photo diary is consent-locked, not monetized, and correctly states why; privacy/export/revoke/delete/report/block paths are named. Repair row semantics, 2-vs-3 count and populated/empty state mix. |
| 92 | FIX REQUIRED · Critical | 82/100 and 18 points to next tier are coherent; confidence and safety controls are explicit. Replace the premium row with PaywallLock, make metrics open explanations, and separate default/offline/sync-error states. |

## Cross-family acceptance

- PaywallLock applies to 43 and 92. It does not apply to 71 earnable
  achievement progress or 83 mutual-media-consent gating.
- HIFI-83-01 is the only declared D2 image slot; the current initials fallback
  is correct until photo consent. Screen 42's badge emblem is a component
  requirement, not a new external media slot.
- globals.css contains a credible reduced-motion base; repaired states must
  remain distinguishable with motion off.
- Fix order: shared AA/semantics → state/count truth → 42/71 geometry →
  RW-027/RW-029 PaywallLock → 19 radar + 71 RPG fidelity → Cia convergence →
  one-SHA strict, keyboard, screen-reader, text-expansion and reduced-motion
  verification.

The family is not ready for development handoff. Image 1 and Image 2 remain
absent, so final RW-VF-02/RW-VF-04 art direction is blocked; semantic,
contrast, state, PaywallLock, clipping and numerical-truth work is not blocked.
R1 remains gated and R5 remains queued in the existing ledger.

## Provenance limits

- Design Auditor Skill v1.2.13 was used through its embedded rules. Its
  referenced references/ bundle is absent; no missing reference was invented.
- No browser, network, Figma, or runtime mutation was performed. Hover/focus,
  live assistive-tech behavior and exact glass composites remain acceptance
  tests.
- No code, spec, canon, ledger, status file, or noncanonical screen was edited.
