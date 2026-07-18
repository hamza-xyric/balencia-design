# VISUAL-001 A1 — Auth / Entry Audit

**Scope:** Screens `01`, `02`, `03`, `03b`, `03c`, `03d`, `03e`, and `04`
**Audit posture:** Read-only visual/code/spec audit at dev-handoff and WCAG 2.2 AA
**Evidence:** `A1-auth-entry.png`, the eight local-baseline PNGs and baseline JSON, current screen/shared-kit TSX, screen specs, `COMPACT-CANON.md`, `COMPONENT-CATALOG.md`, and existing A24/RW/RW-R0 evidence
**Date:** 2026-07-10

**Finding-field inheritance:** Each numbered section is route `/screens/<id>` and uses `../baselines/local-baseline/<id>.png` as before evidence; the family sheet is `../audit-sheets/A1-auth-entry.png`. Shared token/kit/control/state roots are **systemic**; a screen-specific composition, copy, conflict, or asset observation is **local** unless its bullet says otherwise. Proposed fixes are the imperative form of each acceptance statement. Owner is **Sol integrator** for shared files/authority and a future **Terra family builder** for disjoint screen files; all findings are **open / not implemented**. These inherited fields apply to every bullet below.

## Verdict

The family is visually coherent and structurally stable at 390×844, but it is not release-ready. Shared CTA contrast, presentation-only form primitives, incomplete interaction states, and consent/honesty defects produce cross-screen blockers. No existing waiver covers these findings.

**Post-audit authority resolution:** DVF-01 in `../DECISIONS.md` confirms warm-dark glass as the current visual foundation. Any warm-light language below is now **spec-reconciliation drift under A24-009/RW-008**, not an open choice to fork the art direction.

## Family strengths

- All eight baselines render at the canonical 390×844 frame with no reported core layout/runtime issue.
- The family has a coherent warm-dark atmosphere, restrained orange emphasis, clear hierarchy, consistent Lucide icon geometry, and official brand assets.
- Positive ethical defaults include marketing off, remember-me off, masked identity, guest/skip paths, and STOP/revoke/delete language.
- Native controls generally meet 44/52px geometry, and auth-specific custom motion has a reduced-motion fallback.
- Copy is usually concise and the screens avoid excessive elevation, decoration, and competing primary actions.

## Systemic roots

| Severity | Root and evidence | Existing authority | Acceptance |
|---|---|---|---|
| Blocker | Active `BtnPrimary` uses 16px white text on `#FF5E00`, approximately **3.06:1**, affecting 02, 03, 03e, and 04. | RW-VF-01; A24-010/RW-019 retain their original target/role scope. | Active CTA text reaches ≥4.5:1; disabled appearance is tested separately. |
| Blocker | `GlassPillInput`, several toggles, OTP cells, picker rows, inline links, and skip paths are styled `div`/`span` elements without complete input/button semantics. | A24-010/RW-019; S-03/RW-002/RW-037, with auth observations extending that existing root. | Native controls or equivalent keyboard semantics, persistent labels, accessible names/states, visible authored focus, and error/loading/disabled states. |
| Blocker | Consent and honesty are inconsistent on 03d/03e: enabled progression beside apparently unchecked consent, and visually pre-granted WhatsApp consent. | RW-R0-03, A24-005/RW-031, RW-038. | Required consent must require explicit opt-in; notices must not masquerade as checkboxes; decline/skip must be equally operable. |
| Critical | Primary CTA geometry is shrink-to-content and left-aligned although the auth specs call for full-width actions; shared hover/pressed/focus/loading states are absent. | RW-VF-02; A24-010 retains original interaction warnings. | Full-width CTA where specified plus complete interaction-state matrix. |
| Critical | Stale warm-light auth specs conflict with the DVF-01-decided warm-dark canon/code. | A24-009/RW-008 and A24-015/RW-035. | Reconcile the specs to DVF-01 before asserting final fidelity; do not reopen the visual-mode decision. |
| Major | Meaningful 11–13px text frequently uses white/35–45; white/45 on ink is about 4.49:1, while white/35 and /40 are substantially lower. Small purple Cia text is also below 4.5:1. | RW-VF-01 and RW-VF-05. | Replace opacity styling for semantic text with tested text tokens meeting AA. |
| Major | Current code often renders one representative state rather than the state matrix named by the specs. | RW-VF-08; named missing components remain RW-R0-18. | Verify required default/error/loading/offline/cooldown/success states individually. |
| Major | First-impression and auth illustration work remains incomplete. | A24-016/RW-034. | Use approved official assets and complete listed HIFI asset evidence. |
| Major | CIA/Cia convergence remains visible across 03, 03d, and 03e. | A24-008/RW-009. | Complete the approved naming convergence. |

## Per-screen findings

### 01 — Conditional pass / rework

- **Major — visual hierarchy/asset:** The 2420×2420 square lockup is scaled into a small 56px image, making the actual wordmark tiny inside a large empty field. The official 200×50 lockup is better suited to the specified singular brand reveal. Maps to A24-016/RW-034.
- **Minor — accessibility:** The screen exposes both an image alt and an sr-only “Balencia” heading, risking duplicate announcement, while the specified “Balencia. Loading.” status is not represented as status/live content. A24-010 with state evidence under RW-VF-08.
- **Acceptable as-is:** Calm composition, no CTA clutter, canonical dark background, and reduced-motion coverage.

**Acceptance:** The approved lockup is legible at mobile scale; one concise loading announcement is exposed; animation and static reduced-motion capture both pass.

### 02 — Rework

- **Blocker — contrast:** Active Next CTA is approximately 3.06:1. RW-VF-01.
- **Critical — completeness/states:** Only panel one is implemented although the spec defines four carousel panels and their transitions. RW-VF-08; named missing components remain RW-R0-18.
- **Major — geometry:** Next is narrow and left-aligned rather than the specified full-width action. RW-VF-02.
- **Major — copy:** “Everything connects in this carousel” is implementation-facing rather than premium user copy; analogous to RW-R0-16, but no exact auth row exists.
- **Acceptable as-is:** Strong headline hierarchy, native Skip/Next controls, clear progress, correct icon family, and reduced-motion handling.

**Acceptance:** All four panels and their navigation/state behavior are evidenced; CTA contrast/width pass; final user-facing headline matches approved copy; HIFI-02-01 is closed under A24-016/RW-034.

### 03 — Block / rework

- **Blocker — form accessibility:** Email and password fields are presentation-only `div`s, without native value, label, focus, validation, autofill, or error semantics; Show is a non-operable `span`. A24-010/RW-019 and S-03/RW-037 scope extension.
- **Blocker — contrast:** Active Create account CTA is approximately 3.06:1. RW-VF-01.
- **Critical — legal/navigation:** Terms and Privacy in `ComplianceFooter` are spans rather than links and are below the initial viewport at the point credentials are requested. S-03/RW-037 scope extension.
- **Major — heading structure:** `TopBar` and the page both emit `h1`, causing the outline to identify “Balencia” instead of the page purpose. A24-010.
- **Major — CTA consistency:** Primary action is shrink-to-content, not full-width. RW-VF-02.
- **Source conflict:** The spec asks for a default legal checkbox, while 03c separately owns legal consent. This needs explicit authority resolution under A24-009/RW-008, not duplicate consent.
- **Acceptable as-is:** Concise form, honest password-strength message, equal social actions, and a clear guest route.

**Acceptance:** Native labelled fields and operable reveal/legal controls are present; one page `h1`; CTA passes AA and width/state requirements; consent ownership between 03 and 03c is documented; naming follows RW-009.

### 03b — Rework

- **Blocker — OTP accessibility:** Digit cells are `div`s inside a single `role="img"`; users cannot focus, edit, or understand each digit/value as specified. A24-010/RW-019 scope extension.
- **Critical — state honesty:** Resend is active while the visible 0:59 cooldown says it should be unavailable. RW-VF-08 and the existing RW-R0-13 honesty root.
- **Major — status semantics:** Countdown has no live/status treatment; the white/45 timer token is marginally below AA on ink. A24-010, RW-VF-01 and RW-VF-08.
- **Major — CTA consistency:** Verify is not full-width, although disabled-control contrast is WCAG-exempt. RW-VF-02.
- **Major — asset:** The brand lockup repeats the tiny square-asset scaling issue from 01. A24-016/RW-034.
- **Acceptable as-is:** Masked email, clear current focus, generous digit geometry, and no account-enumeration copy.

**Acceptance:** OTP uses an accessible input model with digit/value/focus/error semantics; resend remains disabled until expiry; countdown changes are announced appropriately; CTA width/states and brand lockup pass.

### 03c — Block

- **Blocker — exact baseline warning:** Two `div role="checkbox"` controls and one `span role="switch"` lack complete native/keyboard behavior and checked-state semantics. Direct A24-010/RW-019 evidence.
- **Critical — interaction ambiguity:** Underlined Terms/Privacy labels plus chevrons imply document links, but the whole row behaves as a checkbox and no sheet/link trigger is available. S-03/RW-037 scope extension.
- **Major — ethics/hierarchy:** Optional marketing receives the more luminous orange glass treatment while required legal consent is visually flatter, creating undue salience for the optional choice. Closest A24-009; no exact row.
- **Major — source consistency:** Mixed flat/glass surfaces conflict with canon because the screen spec retains stale treatment language; reconcile it to DVF-01 under A24-009/RW-008.
- **Acceptable as-is:** Both required consents begin unchecked, marketing is off, progress is 0/2, CTA is disabled, and there is no confirmshaming.

**Acceptance:** Native checkboxes/switch work with keyboard, screen reader, focus, and explicit state; legal documents have distinct operable links/sheets; optional marketing is not more visually coercive than required consent; token contrast passes.

### 03d — Block

- **Blocker — consent honesty:** “I consent…” appears unchecked while Save details remains enabled. If required, progression must be gated; if informational, it must not look like an unchecked checkbox. RW-R0-03/A24-010.
- **Blocker — operability:** Name fields, DOB/gender picker rows, and consent indication are presentation elements rather than accessible controls. S-03/RW-037 scope extension.
- **Critical — clipping/density:** At 390×844 the consent rail is cut and Save details/Skip are below the initial viewport, leaving the screen without a visible completion action. RW-R0-08.
- **Critical — state contradiction:** “Prefer not to say” is displayed while code describes an honest null/no-selection state, yet readiness reports 1/2. Explicit selection and null must be distinguishable. RW-R0-13 and RW-VF-08.
- **Major — provenance:** The Cia card says “Profile data / You entered” although first name is labelled “From Google.” S-08/RW-026.
- **Major — rail completeness:** Shared `ConsentRail` exposes five controls, not the eight source/control dimensions required by the consent spec. RW-R0-03.
- **Major — contrast:** Multiple white/35–45 labels and small purple Cia text fail or narrowly miss AA. RW-VF-01/RW-VF-05.
- **Acceptable as-is:** Source chips attempt provenance disclosure, optionality is visible, and the layout uses familiar picker patterns.

**Acceptance:** Accessible editable fields/pickers exist; consent and readiness logic are internally consistent; a primary completion action is visible without clipping; provenance matches the actual source; all eight consent dimensions and AA text tokens are evidenced; A24-016/RW-034 and RW-009 close.

### 03e — Block

- **Blocker — consent/ethics:** A green “Message consent” check visually pre-grants consent without an explicit opt-in. This contradicts the spec’s unchecked-until-action requirement. RW-R0-03 and A24-005/RW-031.
- **Blocker — equal choice:** Skip is a bare span, so the visible decline path is not keyboard-operable. S-03/RW-037.
- **Blocker — form accessibility:** Country code, phone field, and OTP preview are presentational spans/divs rather than usable controls. A24-010/RW-019 scope extension.
- **Blocker — contrast:** Active Send code CTA is approximately 3.06:1. RW-VF-01.
- **Critical — product honesty:** A24-005/RW-031 still classifies WhatsApp as visually launch-ready but operationally blocked; the UI must not imply completed availability.
- **Major — state/progress:** The same long screen previews later phases below the fold while the goal-gradient text says “phase 2 of 6,” creating ambiguity about the current phase. RW-R0-13/RW-VF-08.
- **Major — consent rail:** Five generic controls do not satisfy the eight-part consent model and lack contextual help. RW-R0-03.
- **Major — CTA/tokens:** CTA is narrow; Skip/brand/phone metadata and later-phase labels use failing opacity tokens. RW-VF-01/RW-VF-02/RW-VF-05.
- **Acceptable as-is:** Provider-neutral iconography, “You entered” provenance, useful STOP/revoke/delete copy, and a single visually dominant action.

**Acceptance:** Consent is explicitly and accessibly opted into; decline remains equally operable; phone/OTP use native labelled controls; readiness is represented honestly per A24-005/RW-031; phase state is unambiguous; CTA and text contrast pass; RW-038, RW-009, and A24-016/RW-034 evidence is complete.

### 04 — Block / rework

- **Blocker — form accessibility:** Email/password are presentation-only; password reveal, Face ID, safety entry, and inline Sign up are spans. The Remember me span-switch is the exact A24-010/RW-019 warning; other affordances map to S-03/RW-037.
- **Blocker — contrast:** Active Sign in CTA is approximately 3.06:1. RW-VF-01.
- **Critical — state honesty:** The default baseline simultaneously shows offline and biometric-rate-limit conditions with a filled valid form. Specs define these as separate exceptional states. RW-R0-13/RW-VF-08.
- **Critical — misleading offline copy:** “We’ll sync when back” implies offline authentication/sync capability that is not established for sign-in. RW-VF-07; A24-012 remains limited to screen 98.
- **Major — CTA consistency:** Sign in is narrow instead of full-width. RW-VF-02.
- **Major — viewport hierarchy:** Rate-limit detail, safety route, and account creation sit below the initial viewport, although primary sign-in/social actions remain visible. RW-R0-08.
- **Acceptable as-is:** Remember me defaults off, the 30-day/revoke explanation is transparent, password is masked, Forgot password is native, and social actions have equal weight.

**Acceptance:** Native labelled/autofill-capable fields and fully operable secondary actions exist; remember state is keyboard/screen-reader accessible; default, offline, and 429 captures are separated; offline copy reflects real capability; CTA contrast/width/state behavior passes; S-03/RW-037 exact S04 affordances are closed.

## Release blockers

1. Active orange primary-button text contrast on 02, 03, 03e, and 04.
2. Presentation-only input/OTP/toggle/link controls across 03–04.
3. Required-consent and product-readiness honesty on 03d/03e.
4. Exact non-native checkbox/switch warnings on 03c/04.
5. Missing representative states and state separation, especially 02 and 04.

## Rubric and provenance limits

- All 19 embedded Design Auditor lenses were applied: accessibility, focus, contrast, tokens, responsive behavior, motion, forms, navigation, spacing/density, states, microcopy, elevation/glass, iconography, ethics/dark patterns, Nielsen heuristics, privacy/data honesty, hierarchy, clipping, and implementation readiness.
- Findings are based on static local baselines and code/spec inspection, not live keyboard, screen-reader, gesture, or animation execution. Runtime behavior must be verified after remediation.
- WCAG contrast values are token-level calculations against declared base surfaces; composited imagery/gradients require pixel-level confirmation in final captures.
- Legal/privacy observations assess interface clarity and consent signals, not legal compliance.
- Where no exact A24/RW/RW-R0 row exists, the nearest existing authority is named explicitly; this audit creates no new durable finding ID and does not silently expand existing scope.
- The Design Auditor skill's separate `references/` files were absent; the embedded 19-lens rubric and project canon were used.
