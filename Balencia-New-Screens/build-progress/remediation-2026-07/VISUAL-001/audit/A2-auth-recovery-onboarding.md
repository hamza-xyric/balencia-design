# A2 auth recovery, onboarding, and system-permission audit

Authority note: this is read-only VISUAL-001 evidence. It does not replace
`REMEDIATION-LEDGER.md`, close an existing finding, or create a new durable
finding ID. Every disposition below maps back to existing A24, RW, S-03, or
RW-R0 authority.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍  DESIGN AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| Field | Value |
|---|---|
| Input | A2 auth recovery/onboarding/system permission family |
| Type | React code + current 390×844 local PNG baselines + hi-fi specs |
| Framework | Next.js 16 / React 19 / Tailwind CSS 4 |
| Confidence | 🟢 High for code/spec findings; 🟡 Medium for optical-only observations |
| Scope | Exactly `05, 05b, 06, 07, 08, 65, 66` |
| Date | 2026-07-10 PKT |
| Design system | Balencia local hi-fi kit; no third-party component system detected |
| Token coverage | Not mechanically scored in this bounded pass; qualitative token use is strong |

## Scope and evidence

- Current visual evidence:
  `VISUAL-001/audit-sheets/A2-auth-recovery-onboarding.png` and the seven
  matching PNGs under `VISUAL-001/baselines/local-baseline/`.
- Current structural evidence:
  `VISUAL-001/baselines/local-baseline.json`. All seven routes have zero
  scanner issues, zero scanner warnings, zero page/console errors, and a
  390×844 phone frame.
- Current implementation evidence: the seven modules under
  `balencia-screens/src/components/hifi/screens/auth/`, plus
  `kit/buttons.tsx`, `kit/cia.tsx`, `kit/chrome.tsx`, `HifiShell.tsx`,
  `ScreenShell.tsx`, and `globals.css`.
- Intended-state evidence: the seven current files under
  `Balencia-New-Screens/hifi-screens/`, `COMPACT-CANON.md`, and
  `COMPONENT-CATALOG.md`.
- Existing authority evidence: A24 report/plan, RW-001..038, R0
  `affordance-inventory.md`, and RW-R0-01..19.
- Audit method: all applicable embedded Design Auditor lenses, WCAG AA at
  development-handoff strictness, ethical-design review, and Nielsen
  H1/H2/H3/H6/H7/H10. Category 13 i18n is not applicable because no
  multilingual/RTL target is present in this slice.

The fresh strict scan is necessary but not sufficient. Its instrumentation
counts visible native/role-bearing controls as `05=4`, `05b=2`, `06=1`,
`07=5`, `08=3`, `65=1`, `66=0`; the visibly actionable controls exceed those
counts on 05b, 06, 07, and 66. R0 already records this exact scanner blind
spot for bare `div`/`span` affordances in `R0/affordance-inventory.md:3-12`.

**Post-audit authority resolution:** DVF-01 in `../DECISIONS.md` confirms the
warm-dark visual foundation. References below to 05/05b/66 light-default
conflict now mean **open spec reconciliation under A24-009/RW-008**, not an
unresolved visual-mode choice.

### Finding-record defaults and authority crosswalk

The table below is the structured finding record for this wave. It supplies
the required route/screen, before-evidence path, severity, systemic/local
classification, affected implementation surface, proposed fix, acceptance,
owner, and status. Later narrative sections inherit these fields and add
screen-specific detail.

- Common before evidence:
  `VISUAL-001/audit-sheets/A2-auth-recovery-onboarding.png`, plus
  `VISUAL-001/baselines/local-baseline/<screen>.png` and
  `VISUAL-001/baselines/local-baseline.json`.
- Common audit owner: **Sol/root** owns acceptance and mapping into the sole
  status ledger. Implementation ownership remains with the owner of the
  existing A24/RW/RW-R0 item and must be confirmed at batch start; this audit
  does not silently reassign it.
- Common status: **audit complete; remediation open; no closure claimed**.
  Where an RW-VF item has a stronger blocked/gated status, that status is
  printed explicitly below.
- Severity note: WCAG failures are reported as Design Auditor `🚫 Blocker`
  because they cite a success criterion. This does not renumber or mutate the
  existing authority's recorded High/Medium severity.

| Existing authority | Route/screen | Audit severity | Class | Before evidence | Affected file/token/component | Proposed fix | Acceptance criterion | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| RW-VF-01 + RW-VF-02; overlaps A24-010 | 05, 05b, 06, 08, 65, 66 CTA; supporting text also 07 | 🚫 Blocker | Systemic | Common sheet + all seven PNGs; contrast math in this report | `--color-brand-orange`, paper/white opacity ladder, `BtnPrimary`, caption/tertiary roles | Compute and apply an AA-safe semantic text/CTA matrix; retain approved brand roles | Normal text ≥4.5:1, large text ≥3:1; documented disabled/decorative exceptions; automated and manual family verification | Sol/root acceptance; existing CTA/token remediation owner | RW-VF-01 filed-open; RW-VF-02 visual direction blocked on Image 2, semantic/contrast work open |
| S-03, RW-002/RW-037, RW-R0-07; overlaps A24-010 | 05, 05b, 06 | 🚫 Blocker | Systemic component root | `local-baseline/{05,05b,06}.png`; source locators below | `kit/buttons.tsx` `GlassPillInput` | Replace presentation-only field with native, labeled input contract without changing geometry | Keyboard input/focus/submit, persistent label, value/error/disabled exposure, accessible name, and 52px sentinel parity all verified | Sol/root acceptance; existing semantics owner | Open under existing affordance authority |
| RW-R0-02/03/07 + S-03, RW-002/RW-037; overlaps A24-010 | 05b, 06, 07, 66 | 🚫 Blocker | Systemic with screen-local consumers | `local-baseline/{05b,06,07,66}.png`; interactive counts `2,1,5,0` | `kit/cia.tsx` Composer/VoiceComposer and raw span/div actions in four screens | Convert each visible action to native button/link; add names and state semantics | 44px targets, keyboard activation, logical order, names, `aria-pressed` where applicable, and no visible-affordance-count regression | Sol/root acceptance; existing semantics/consent owners | Open under existing affordance authority |
| RW-R0-13 + RW-VF-08 | 05 `/auth/forgot-password` | 🔴 Critical | Local symptom + systemic state-coverage root | `local-baseline/05.png`; `S05ForgotPassword.tsx:47-92` | Request form and success/cooldown composition | Separate default/valid and success into mutually exclusive product states | Success replaces form; one state-appropriate primary action; masked destination and cooldown announced; separate review variants live outside phone | Sol/root acceptance; existing state-remediation owner | RW-VF-08 filed-open |
| RW-VF-03 + RW-VF-08; overlaps RW-R0-02/03/13/18 | 07 `/onboarding` | 🔴 Critical plus inherited 🚫 semantics | Systemic orb root + local consent/default-state symptom | `local-baseline/07.png`; `S07CiaOnboarding.tsx:10-65`; `kit/cia.tsx:38-65` | `CIAPresenceOrb`, `VoiceComposer`, mic-consent/default state | Default idle; consent/disclosure before listening; state-bearing orb anatomy and static reduced-motion cues | Idle/listening/thinking are visually and programmatically distinct; listening only follows explicit mic action; stop/cancel and retention/delete paths verified | Sol/root acceptance; existing orb/consent owners | RW-VF-03 blocked on Image 1 for final visual direction; semantic/state planning open; RW-VF-08 filed-open |
| RW-R0-12 + RW-VF-08 | 08 `/onboarding` | 🔴 Critical | Local data/state contradiction | `local-baseline/08.png`; `S08InitialPlanSummary.tsx:94-130` | `MilestoneTimeline` `current` value, visible labels, aria summary | Derive milestone index from the same plan state as day-one copy and retain the date label | Visual marker, date label, “current” status, and accessible sentence state one coherent position | Sol/root acceptance; existing data-honesty owner | Open; RW-VF-08 filed-open |
| A24-009/RW-008 + DVF-01 | 05, 05b, 66 | 🟡 Warning | Systemic spec drift | `local-baseline/{05,05b,66}.png`; named spec lines below | Decided warm-dark HifiShell versus stale light-default spec language | Reconcile the specs to DVF-01 without forking a light visual mode | Specs and sentinels agree on warm-dark; state/content requirements remain intact | Sol/root | Visual decision resolved; R1 spec reconciliation open |
| A24-010 + RW-R0-08 + RW-VF-05 | 06, 07 (08 observed but no hard clip) | 🟡 Warning | Cross-screen first-viewport hierarchy/density | Common sheet; `local-baseline/{06,07,08}.png` | 06 radar/grid/CTA; 07 safety exits/composer; microtype roles | Rebalance hero height/action persistence and safety clearance; normalize readable type roles | CTA/safety exits are discoverable at 390×844, no reserved-zone collision, text expansion and safe-area variants pass | Sol/root acceptance; existing layout/type owners | RW-VF-05 filed-open; layout authority open |
| A24-008/RW-007..013 | 07, 08, 65, 66 | 🟡 Warning | Systemic terminology | Fresh JSON `visibleWrongCaseCia: true`; four PNGs | Visible and aria `CIA` strings; identifiers exempt | Complete existing visible-copy convergence only | `visibleWrongCaseCiaScreens: []` and copy gate green at one SHA | Sol/root + existing R1 owner | Open; R1 remains gated in remediation ledger |
| RW-VF-04; overlaps A24-009/canon and A24-010 semantics | 06, 07, 66 | 🟡 Warning | Systemic icon vocabulary/scale | `local-baseline/{06,07,66}.png`; icon locators below | 12–15px Lucide domain/benefit glyphs; no signature registry | Classify utility versus signature icons; normalize meaningful glyph scale or document optical exception | Approved registry/rules; meaningful icons meet size/label contract; official logo untouched; 44px targets preserved | Sol/root acceptance; existing icon-system owner | RW-VF-04 blocked on Image 1 and Image 2 for final visual direction |
| RW-VF-07; overlaps RW-R0-03/16 and A24-009 | 66 onboarding permission overlay | 🟡 Ethics-only (Questionable) | Local permission-copy symptom + capability/trust intake | `local-baseline/66.png`; `S66NotificationPermission.tsx:14-24`; spec `:103-107` | Permission benefits, optional/revoke language, Squad/Community scoping | Replace loss-avoidance copy; state optional/change-later behavior and opt-in social scope | Neutral benefits, no streak-loss pressure, native equal-reach decline, OS/re-entry state and revoke path are explicit | Sol/root acceptance; existing trust/consent owner | RW-VF-07 filed-open |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊  SCORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

These are **non-authoritative family rubric diagnostics**, not a Balencia
aggregate grade and not a competing remediation score. Historical B+/84
remains historical; only R11 may issue the next aggregate grade.

```text
Overall       [█████░░░░░░░░░░░░░░░]   24/100
Accessibility [████████████░░░░░░░░]   60/100  ⚠️ Legal compliance failures
Ethics        [███████████████████░]   93/100
Usability     [██████████████░░░░░░]   72/100
              ↳ H4 → Cat 5 · H5 → Cat 7 · H8 → Cat 4 · H9 → Cat 11/12
```

Overall score: `100 − (3 × 🚫 12) − (3 × 🔴 8) − (4 × 🟡 4) = 24/100`.
Repeated screen symptoms are deduplicated into shared roots for scoring.

Accessibility score: `100 − (3 × 🚫 12) − (1 × 🟡 4) = 60/100`.

Ethics score: `100 − (1 × 🟡 7) = 93/100`. The notification-primer copy is
questionable rather than proven deceptive; this deduction is not duplicated
in the standard overall formula.

Usability score: `100 − (3 × 🔴 8) − (1 × 🟡 4) = 72/100`.

The score is dragged down by three deduplicated legal accessibility roots
across core controls, not by counting the same root once per screen.

### Score by category

| Category | Score | Bar | Principal evidence |
|---|---:|---|---|
| 1 · Typography | 6/10 | ██████░░░░ | Dense 9–13px supporting copy |
| 2 · Color & contrast | 2/10 | ██░░░░░░░░ | CTA and muted-text AA failures |
| 3 · Spacing & layout | 6/10 | ██████░░░░ | 06/07 first-viewport density |
| 4 · Visual hierarchy | 5/10 | █████░░░░░ | 05 state competition; 06 CTA discovery |
| 5 · Consistency | 5/10 | █████░░░░░ | surface-spec, naming, and orb-state drift |
| 6 · Accessibility | 2/10 | ██░░░░░░░░ | decorative DOM used as controls |
| 7 · Forms & inputs | 2/10 | ██░░░░░░░░ | `GlassPillInput` is a `div` |
| 8 · Motion | 8/10 | ████████░░ | global reduced-motion path is present |
| 9 · Dark mode | 6/10 | ██████░░░░ | polished; three stale light-default specs still need DVF-01 reconciliation |
| 10 · Responsive/adaptive | 7/10 | ███████░░░ | stable 390×844 shell; long first views |
| 11 · States | 5/10 | █████░░░░░ | 05, 07, and 08 state contradictions |
| 12 · Content/microcopy | 6/10 | ██████░░░░ | Cia casing and permission-copy drift |
| 14 · Elevation/shadows | 8/10 | ████████░░ | restrained semantic glows and glass tiers |
| 15 · Iconography | 6/10 | ██████░░░░ | coherent Lucide family, undersized glyphs |
| 16 · Navigation | 7/10 | ███████░░░ | accessible local back buttons; inert utility exits |
| 17 · Tokens/variables | 8/10 | ████████░░ | strong token use; contrast ladder needs repair |
| 18 · Ethical design | 9/10 | █████████░ | optional exits exist; 66 copy needs correction |
| 19 · Nielsen heuristics | 7/10 | ███████░░░ | H1/H3/H6 gaps; strong recovery language |

(Interactive radar/widgets are unavailable in this static evidence artifact;
the category table is the prescribed fallback.)

## What is working well

- Account recovery is enumeration-safe. Screen 05 masks the destination and
  uses the neutral conditional message required by its spec.
- Data honesty is unusually strong: 06 permanently labels its populated map
  `Demo · illustrative`; 08 distinguishes real, estimated, and unassessed
  axes; 65 names both release-note and device-config provenance.
- Orange/green/purple meaning is mostly disciplined. Purple in this slice is
  attached to Cia presence or projection, not generic error/safety chrome.
- Motion has a real reduced-motion foundation. `globals.css:800-842` disables
  `quiet-pulse`, radar/area entrances, skeletons, voice-status pulses, and
  related loops while preserving settled end states.

## Systemic roots and scored issues

### 🚫 Blockers — cannot hand off as WCAG AA

> **The text-color system fails WCAG AA in primary and supporting roles.**
>
> `BtnPrimary` renders 16px semibold white on `#FF5E00`
> (`kit/buttons.tsx:15-25`). Measured contrast is 3.06:1 for white and 3.01:1
> for paper-50, below 4.5:1 for normal text. It affects visible primary
> actions on 05, 05b, 06, 08, 65, and 66. Small supporting copy also uses
> `text-white/30`, `/35`, `/40`, and `/45`; composited over `#0A0A0F`, those
> measure 2.62:1, 3.15:1, 3.77:1, and 4.49:1. Representative locations are
> 05:50/58, 05b:61/123/136, 06:150, 07:54 and future step labels in
> `kit/chrome.tsx:18-24`, 08:95/126, and 65:24.
>
> Acceptance: validate the shared text/CTA tokens at their actual size and
> weight; every normal-text pair must reach 4.5:1. Prefer an approved dark ink
> label on orange (ink-900 on orange measures 6.45:1) or another token-level
> solution. Do not waive AA as a brand exception. Supporting copy must use an
> AA-passing token rather than opacity below the verified floor.
>
> Legal basis: WCAG 2.1 SC 1.4.3.
>
> Existing authority: RW-VF-01 owns measured contrast-token remediation;
> RW-VF-02 owns the shared CTA contract; A24-010 and RW-002/RW-037 retain
> their original interaction-verification scope; `COMPACT-CANON.md:87`; the
> inherited debt is already stated explicitly in `06-guest-mode-preview.md:128`.

> **Input-looking surfaces are not inputs and have no persistent label.**
>
> `GlassPillInput` is a styled `div` with text spans
> (`kit/buttons.tsx:61-93`). It is the core email/password/name field on 05,
> 05b, and 06, so it cannot receive focus, accept keyboard input, expose an
> input name/value, or preserve a label when populated.
>
> Acceptance: provide a native `input` contract with an associated visible
> `label` (or an equivalent programmatic label), value/placeholder separation,
> focus-visible treatment, autocomplete/input-type metadata, described errors,
> disabled state, and keyboard submission where specified. The 52px visual
> geometry may remain unchanged.
>
> Legal basis: WCAG 2.1 SC 1.3.1, 2.1.1, and 4.1.2.
>
> Existing authority: S-03; RW-002/RW-037; RW-R0-07 root class. R0 already
> treats the same `GlassPillInput` pattern as High in its affordance evidence.

> **Visually actionable spans/divs are keyboard- and assistive-tech inert.**
>
> The root appears in 05b (Show/Hide, Privacy, Request a new one), 06 (nine
> domain selectors), 07 (VoiceComposer attach/mic/send plus Privacy controls
> and Crisis support), and 66 (both permission actions). The most direct proof
> is screen 66: two visible choices but `interactiveCount: 0`; its actions are
> raw `div`s at `S66NotificationPermission.tsx:29-30`.
>
> Acceptance: use native `button`/`a` elements, 44px minimum targets,
> accessible names, `aria-pressed` for multi-select chips, state exposure,
> logical focus order, and keyboard activation. Crisis/privacy exits must be
> reachable controls, not decorative assurances. The visible affordance count
> must never fall during repair.
>
> Legal basis: WCAG 2.1 SC 2.1.1 and 4.1.2.
>
> Existing authority: A24-010; S-03; RW-002/RW-037; RW-R0-02 for the shared
> composer, RW-R0-03 for consent affordances, and RW-R0-07 for screen-level
> zero-role controls.

### 🔴 Critical issues — must fix before development handoff

> **05 renders mutually exclusive recovery states at once.**
>
> The enabled request form (`S05ForgotPassword.tsx:47-53`) and the complete
> success/cooldown card (`:55-92`) occupy one phone state. The implementation
> comment calls success a preview, but the current spec requires empty/default
> to contain no confirmation and success to replace the form
> (`05-forgot-password.md:83-89`). This breaks H1 visibility of system status,
> creates two competing next actions, and causes avoidable vertical density.
>
> Acceptance: render one state per phone frame. Default/valid shows the form;
> success replaces it with masked destination, one state-appropriate primary
> action, resend cooldown, and an announced status. A review-only comparison
> may place separate variants outside the phone, never stacked in the product
> frame.
>
> Existing authority: RW-R0-13 incoherent-state root class; RW-VF-08
> cross-family state coverage; A24-010 density; current screen spec.

> **07 claims a default listening state without consent or a listening visual.**
>
> The screen passes `state="listening"` at
> `S07CiaOnboarding.tsx:30`, while its spec says the default canvas is idle
> (`07-cia-onboarding-conversation.md:89-96`) and requires explicit mic
> permission plus transcript-retention/delete disclosure before recording
> (`:78-86`). The shared orb only changes its aria-label; all three states draw
> the same circles and generic 8s pulse (`kit/cia.tsx:38-45`), despite the
> catalog requiring listening ring pulse and thinking shimmer
> (`COMPONENT-CATALOG.md:76`). This is both H1 state ambiguity and a privacy
> trust failure.
>
> Acceptance: default to `idle`; enter `listening` only after an explicit mic
> action and consent/disclosure; expose stop/cancel and recording state. Make
> idle/listening/thinking visually distinct, with a listening ring and thinking
> shimmer. Under reduced motion, retain a static non-motion distinction rather
> than collapsing every state to the same orb.
>
> Existing authority: RW-VF-03 orb state system; RW-VF-08 state coverage;
> RW-R0-13 state root; RW-R0-18 component-completeness root; RW-R0-03 consent
> root; RW-R0-02 composer root; A24-009 source fidelity.

> **08 contradicts its day-one state with “milestone 2 of 5, current.”**
>
> The hero says `Day one` (`S08InitialPlanSummary.tsx:94-96`), but
> `MilestoneTimeline` hard-codes `current = 1` and announces milestone 2 of 5
> (`:104-130`). The second point replaces its Week 4 label with `You are here`,
> so visual and screen-reader users receive incompatible progression facts.
>
> Acceptance: derive the current index from the same plan state as the day-one
> copy; day one begins at the first milestone unless evidence says otherwise.
> Keep the milestone label and add “current” rather than replacing the date.
> The visual marker, visible text, and accessible sentence must agree.
>
> Existing authority: RW-R0-12 self-contradictory-number/data-honesty root;
> RW-VF-08 state coverage; canon §7; current screen spec.

### 🟡 Warnings — should fix

> **Three screens retain stale surface-mode spec language.**
>
> 05, 05b, and 66 render the global warm-dark shell, while their current specs
> explicitly define a warm-light default and reserve dark glass for optional
> theme/overlay contexts (`05:49-60`, `05b:49-60`, `66:61-75`). Existing
> DVF-01 has now resolved the authority in favor of canon/glass-dark, so this
> is documentation drift, not permission for an ad hoc restyle.
>
> Acceptance: revise the specs through A24-009/RW-008 to match DVF-01 while
> preserving their valid state/content requirements. Code and specs must agree
> on warm-dark; the visual-mode choice is not reopened.

> **First-viewport density weakens action and safety discovery.**
>
> The contact sheet shows 06 spending the initial frame on heading, field, and
> a large radar; much of the 3×3 selector and `Explore` are below the fold.
> On 07, Privacy controls/Crisis support sit at the bottom edge beside a fixed
> composer. Screen 08 is long but uses the shell's reserved bottom action more
> successfully. Fresh strict evidence finds no hard frame escape, so this is a
> hierarchy/discovery warning rather than a clipping claim.
>
> Acceptance: keep 06's primary action persistently discoverable or compress
> the non-metric hero while preserving all nine choices; provide a clear scroll
> cue if content remains long. On 07, safety exits must be fully visible with
> clearance above the composer and remain reachable after dynamic text growth.
> Verify 390×844 plus text expansion and safe-area variants.
>
> Existing authority: A24-010 text-density; RW-R0-08 layout root; RW-VF-05
> type-role normalization; current VISUAL-001 manual lens.

> **Visible coach naming still uses all-caps `CIA`.**
>
> Fresh instrumentation flags 07, 08, 65, and 66. This is the exact open
> A24-008 decision: visible/aria copy must be `Cia`; code identifiers may stay
> uppercase.
>
> Acceptance: complete RW-007..013, then require
> `visibleWrongCaseCiaScreens: []` and a green copy gate at the same SHA.

> **Small glyphs miss the current 24px icon floor.**
>
> Representative values are 14px domain glyphs on 06
> (`S06GuestModePreview.tsx:154-207`), 12px hero-domain glyphs on 07
> (`S07CiaOnboarding.tsx:14-28`), and 15px benefit glyphs on 66
> (`S66NotificationPermission.tsx:21-24`). The 66 spec calls for 24px benefit
> icons, and canon states icons are at least 24px. Screen 65's 20px update
> badge is not included because its spec explicitly documents it as a
> non-interactive optical exception.
>
> Acceptance: bring meaningful glyphs to the documented size or record a
> named optical exception; preserve 44px targets and pair domain color with
> text/icon shape.
>
> Existing authority: RW-VF-04 icon vocabulary/registry; A24-009/canon
> authority; `COMPACT-CANON.md:64-70`.

### Ethical-design finding — separate Ethics score

> **🟡 Questionable, high confidence: 66 uses loss-avoidance and unscoped social copy.**
>
> `Streak protection · Avoid missing a day by accident` and `Partner updates ·
> Know when partners check in` (`S66NotificationPermission.tsx:14-24`) are
> stronger and broader than the approved optional primer. The spec explicitly
> bans pressure/streak-loss framing, limits social notifications to opted-in
> Squads/Communities, and requires revocability (`66-notification-permission.md:103-107`).
> `Not now` exists, so coercion is not proven; the wording still creates a
> preventable fear/loss cue.
>
> Acceptance: use neutral benefits such as `Helpful reminders · Choose which
> nudges you want` and `Squad updates · Only for groups you opt into`; state
> that notifications are optional and changeable later in Settings. Keep
> `Not now` as an equally reachable native 44px control.
>
> Existing authority: RW-VF-07 capability/trust intake; RW-R0-03 consent root,
> RW-R0-16 copy-quality root, A24-009 intended-state authority, and canon §8.

This is a UI-signal audit, not legal advice. Verify jurisdiction- and
industry-specific permission/consent requirements with counsel.

## Per-screen dispositions

### 05 — FIX REQUIRED · highest severity 🚫 Blocker

- Evidence: nonsemantic `GlassPillInput`; enabled form and full success state
  coexist; several sub-AA captions; the named light-default spec is stale
  against DVF-01. The baseline also shows the success card extending
  the first-view density.
- Strength: masked destination, account-enumeration-safe copy, real cooldown,
  and provenance are all present.
- Existing authority: RW-VF-01/02/08, A24-010,
  S-03/RW-002/RW-037, RW-R0-13, A24-009.
- Acceptance: native labeled email input; token-level AA; mutually exclusive
  form/success frames; success replaces the form and owns its primary action;
  spec reconciled to the decided warm-dark mode.

### 05b — FIX REQUIRED · highest severity 🚫 Blocker

- Evidence: both password fields are `div`s; Show/Hide are inert spans at
  `S05bResetPassword.tsx:80-108`; `Request a new one` and `Privacy` are also
  span affordances (`:54-63`, `:136-140`); muted copy fails AA; the stale
  light-default spec is not yet reconciled to DVF-01.
- Strength: deterministic requirements, match state, typed-live provenance,
  one-use security copy, and the 52px primary CTA are clear.
- Existing authority: RW-VF-01/02, A24-010,
  S-03/RW-002/RW-037, RW-R0-07, A24-009.
- Acceptance: native labeled password inputs; native 44px reveal toggles with
  `aria-pressed`/state text; real privacy/recovery links; screen-reader
  met/unmet announcements; AA tokens; spec aligned to DVF-01.

### 06 — FIX REQUIRED · highest severity 🚫 Blocker

- Evidence: the name field is a `div`; all nine multi-select chips are spans
  (`S06GuestModePreview.tsx:142-210`); fresh instrumentation sees only one
  interactive element; the initial 390×844 view puts much of selection and the
  CTA below the fold; CTA text fails AA.
- Strength: the chart is explicitly non-metric, carries an accessible summary,
  and never omits `Demo · illustrative` once populated.
- Existing authority: RW-VF-01/02/05, A24-010,
  S-03/RW-002/RW-037, RW-R0-07, RW-R0-08.
- Acceptance: native labeled name input; nine native 44px multi-select buttons
  with `aria-pressed`, 1–3 cap and cap-error state; persistent/discoverable
  Explore action; no hard clipping at text expansion; AA CTA.

### 07 — FIX REQUIRED · highest severity 🚫 Blocker / 🔴 Critical state

- Evidence: default module passes `listening`; orb visuals ignore the state;
  mic consent/retention/delete disclosure is absent; VoiceComposer and the two
  safety exits are inert spans; bottom-edge density weakens safety discovery;
  visible/aria copy still says `CIA`.
- Strength: the transcript avoids pretending Cia knows the member, provides
  `Skip health data`, exposes domain choices, and includes visible privacy and
  crisis concepts.
- Existing authority: RW-VF-01/03/05/08, RW-R0-02, RW-R0-03, RW-R0-13,
  RW-R0-18, A24-008, A24-010.
- Acceptance: idle by default; explicit consent before listening; distinct
  listening/thinking/idle visuals and static reduced-motion equivalents;
  native composer and safety controls; Cia casing; AA copy; full composer
  clearance.

### 08 — FIX REQUIRED · highest severity 🔴 Critical

- Evidence: day-one hero conflicts with hard-coded milestone 2-of-5 current;
  the current label replaces Week 4; multiple 9–12px `/30`–`/45` captions fail
  AA; visible copy still says `CIA`. The fixed bottom action itself has proper
  reserved shell space; long content is scrollable rather than a confirmed
  hard clip.
- Strength: real/estimated/unassessed data is distinguished, provenance is
  extensive, projection uses the correct dashed purple convention, and CTA
  hierarchy is clear.
- Existing authority: RW-VF-01/02/08, RW-R0-12, A24-008, A24-010.
- Acceptance: a single data-driven day-one/current milestone truth; visible and
  accessible labels agree; AA captions/CTA; Cia casing; verify bottom-action
  clearance at final text sizes.

### 65 — CONDITIONAL PASS · no screen-local Critical

- Evidence: one real `BtnPrimary`, no back/dead-end affordance, complete
  release/version provenance, clean 390×844 composition, and a reduced-motion
  fallback. It inherits the CTA contrast blocker, uses a `/45` version caption,
  and contains visible `CIA` in release copy.
- Ethics/Nielsen disposition: a forced gate is proportionate here because the
  screen states the security reason, required version, release source, retry
  behavior, and no false countdown. H2/H3 are satisfied.
- Existing authority: RW-VF-01/02, A24-008/A24-010; RW-007..013. No new
  screen-local authority is needed.
- Acceptance: shared AA token fix; `Cia` release copy; final check that error,
  offline, retry, and reduced-motion states preserve the same clear escape from
  dead-end failure.

### 66 — FIX REQUIRED · highest severity 🚫 Blocker

- Evidence: two visible actions but `interactiveCount: 0`; both are raw divs;
  CTA contrast fails; copy uses streak-loss and generic partner framing; no
  explicit optional/revocable note; its light-default preference spec is stale
  against DVF-01; visible copy still says `CIA`.
- Strength: a decline path is visible, the benefit list is concise, and the
  OS permission is not falsely presented as connectivity-dependent.
- Existing authority: RW-VF-01/02/04/07, RW-R0-03, RW-R0-07, RW-R0-16,
  A24-008, A24-009, A24-010.
- Acceptance: real full-width `BtnPrimary` and 44px `BtnGhost`; neutral scoped
  benefits; explicit optional/change-later copy; honest OS status/re-entry
  variants; spec aligned to DVF-01; AA label; Cia casing; decorative
  illustration excluded from the accessibility tree.

## Cross-frame inconsistencies

| Property | 05 / 05b / 66 | 06 / 07 / 08 / 65 |
|---|---|---|
| Intended default surface | Stale specs say warm-light (66 dark only for overlay); DVF-01 supersedes this treatment | Warm-dark canon-aligned |
| Implemented surface | Warm-dark | Warm-dark |
| Control semantics | Core inputs/actions partly decorative | Mixed; 65 is strongest, 07 composer is weakest |
| Primary action discovery | 05/05b clear; 66 visually clear but inert | 06 below first fold; 08/65 persistent |
| Cia casing | 66 wrong; 05/05b n/a | 07/08/65 wrong; 06 n/a |
| State truth | 05 conflates states | 07 listening contradiction; 08 milestone contradiction; 65 coherent |

## Release blockers and acceptance order

The family is **not ready for development handoff**. Existing historical
“complete” status remains untouched; this is a VISUAL-001 audit disposition.

1. Repair the shared AA text/CTA tokens and verify actual composites.
2. Replace `GlassPillInput`, `VoiceComposer`, and screen-local raw action
   surfaces with native semantic controls without visual regression.
3. Separate 05 states, correct 07 idle/listening consent and orb variants, and
   make 08 milestone truth coherent.
4. Reconcile the 05/05b/66 specs to DVF-01 warm-dark authority before their
   implementation slice; do not reopen the visual-mode decision.
5. Complete A24-008/RW-007..013 visible `Cia` convergence.
6. Correct 66 permission framing, then recheck 06/07 first-viewport density and
   06/07/66 icon sizing.
7. Re-run the strict harness at one SHA, then manually verify keyboard/focus,
   screen-reader names/states, 390×844 safe areas, text expansion, and reduced
   motion. A green strict scan alone cannot close S-03/RW-037.

## Issue priority matrix

Start with highest impact at the lowest practical effort.

| Root | Impact (1–10) | Effort (1–10) | Existing authority |
|---|---:|---:|---|
| CTA/supporting-text AA tokens | 10 | 4 | RW-VF-01/02; A24-010 overlap |
| Native action semantics | 10 | 6 | S-03, RW-002/037, RW-R0-02/03/07 |
| 08 milestone truth | 9 | 2 | RW-R0-12 |
| 05 state separation | 9 | 3 | RW-R0-13 |
| 07 consent + orb state contract | 10 | 5 | RW-VF-03/08; RW-R0-03/13/18 overlap |
| Cia casing | 5 | 2 | A24-008, RW-007..013 |
| Warm-dark spec reconciliation | 7 | 2 documentation | A24-009, RW-008, DVF-01 |
| First-viewport density | 7 | 5 | RW-VF-05; A24-010, RW-R0-08 overlap |
| Icon floor | 4 | 3 | RW-VF-04; A24-009/canon overlap |

## Rubric and provenance limits

- Design Auditor Skill v1.2.13 was used through its embedded rules. Its
  referenced `references/` bundle is absent from this installed skill, as
  already recorded in `VISUAL-001/FIRST-REPORT.md:69`; no missing reference
  was invented.
- No browser interaction, network call, Figma call, or runtime state mutation
  was performed in this audit wave. Hover/focus appearance and live
  screen-reader behavior are acceptance tests, not claimed observations.
- Contrast numbers are deterministic sRGB calculations against declared
  tokens. Frosted/glass composites still require final runtime sampling after
  fixes; the cited base-token failures are already sufficient to block AA.
- Current local PNGs are structural/manual evidence. The VISUAL-001 baseline
  caveat about browser/font/animation determinism still applies to exact pixel
  comparison.
- Image 1 and Image 2 remain absent. Therefore this report does not choose or
  implement the future orb/CTA/icon art direction; it audits only current
  state behavior, semantics, and canon/spec compliance.
- Requested worker role was Luna/medium, but the collaboration runtime does
  not expose actual model/effort provenance. No stronger provenance claim is
  made.
- No code, spec, canon, ledger, or status file was edited by this wave.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Audit run with Design Auditor Skill v1.2.13 · React + PNG + spec evidence · high/medium mixed confidence*
*Re-audit after fixes to track progress.*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### What next?

Recommended: Sol should keep these dispositions mapped into the existing
remediation authority, reconcile the stale surface specs to DVF-01, and begin
the separate implementation checkpoint only after the missing art-direction
references are supplied and accepted.
