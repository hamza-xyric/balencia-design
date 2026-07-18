# F2 final design/source review

**Reviewer:** independent Terra design/source pass
**Mode:** read-only, full dev-handoff audit at 390×844 with WCAG AA floor
**Scope:** screens 57, 58, 60, 62, 63, 70, 86, 87, 88, 89; active specs; compact canon/catalog; frozen matrix; final acceptance/strict evidence; product source
**Evidence baseline:** production build `Z78CcQxvU_kL3Zg3OuGIr`; hardened acceptance reports `123/123` contexts, `113/113` PNGs, `1305/1305` checks, zero console/page/capability events; strict scan reports `10/10` screens with zero issues/warnings.

## Verdict

**Not ready for final acceptance. C0 / H3 / M2 / L0.**

The family has a coherent premium warm-dark visual language, correct all-caps CIA presentation, disciplined purple use, credible code-native privacy-safe media, and generally strong 390×844 hierarchy. The automated evidence is deterministic and clean, but it does not catch two source/interaction contradictions or establish visual distinctness for a material set of frozen states.

## High findings

### H1 — Screen 58 manual-only state retains wearable-derived CIA evidence and score

- **Evidence:** `acceptance-final/58-manual-only.png` visibly shows the same CIA claim and chips as the provider-backed default: `WHOOP · 2h ago`, `Health · high confidence`, and sleep score `82`. Only the small hero chip changes to `Manual log`.
- **Source:** `58-sleep-tracking.md` Data Honesty requires provider-backed sleep stages, manual-only hiding stages/recovery, and CIA tips only when evidence exists. The frozen matrix also fixes manual-only as a separate truth state.
- **Implementation:** `S58SleepTracking.tsx:25` chooses WHOOP/high-confidence CIA provenance for every non-low/non-empty state, including `manual-only`; `S58SleepTracking.tsx:29` also retains the same score/duration/reserve fixture while changing only the source chip.
- **Why high:** this is a health-data provenance contradiction in the member-visible focal region, not cosmetic polish. A manual-only fixture must not present provider-backed evidence or an unchanged wearable-derived score as high-confidence fact.
- **Required correction:** give manual-only its own CIA copy/provenance and manual-derived values, or use honest-null for unsupported score/reserve. Keep stages and recovery hidden as already implemented.

### H2 — Screen 88 tool tabs change selection but never change the tool surface

- **Evidence:** the active spec defines eye-test tasks, eye exercises, and screen-strain journaling as distinct utilities. The frozen interaction proof requires `tabs/timer/consent/urgent guidance`.
- **Implementation:** `S88VisionSuite.tsx:10` stores `tab`; `S88VisionSuite.tsx:16` updates only that value/selected styling; `S88VisionSuite.tsx:18` always renders the same 20-20-20 exercise regardless of the selected tab. There is no Eye test or Strain content branch.
- **Why high:** two of three primary modules are visually and functionally absent behind controls that appear operational. This fails source fidelity, system-status feedback, and deterministic local-outcome expectations.
- **Required correction:** render a distinct non-diagnostic eye-test task, exercise timer, and strain-log surface per selected tab, including the frozen honest-null/low-confidence states; verify tab clicks change both selection and content.

### H3 — Final PNG evidence does not visually distinguish many frozen states

- **Evidence:** byte-identical promoted PNGs occur across materially different named states:
  - 57: `default`, `sync-disabled`, `edit-item`, `data-controls`
  - 58: `default-real`, `range-14d`
  - 60: `default-real`, `roster-low-confidence`, `heatmap-error-cached`; and `dose-success`, `all-doses-complete`
  - 62: `default-real`, `disabled`, `data-controls`
  - 63: `premium-real`, `error`, `data-controls`
  - 70: `default`, `data-controls`
  - 86: `default-consented`, `offline-disabled`; and `empty-unconsented`, `consent-revoked`
  - 87: `default`, `reuse-success`, `delete-pending`
  - 88: `default`, `consent-off`
  - 89: `default-real`, `low-motivation`, `module-disabled`
- **Additional visual defect:** `acceptance-final/86-success.png` captures roughly the upper half of the phone as empty black space, so it is not credible premium 390×844 evidence for the success comparison state.
- **Why high:** the packet explicitly asks for state distinctness, and the matrix freezes 113 PNG fixtures as acceptance evidence. Exact markers and off-screen DOM assertions prove routing/semantics, but identical above-fold captures cannot prove the named visual states or their hierarchy.
- **Required correction:** make each materially different state visibly distinct in the capture viewport, or have the verifier scroll/focus to the changed region before capture. Reject promoted state PNGs whose hash equals a semantically different fixture unless the matrix explicitly records an intentional visual-equivalence waiver. Recapture screen 86 success at a representative scroll position without the large dead zone.

## Medium findings

### M1 — Screen 70 detail sheet lacks sufficient modal separation

- **Evidence:** `acceptance-final/70-detail.png` shows exercise-grid titles and difficulty labels strongly bleeding through the detail body; background and foreground text visually collide around the guidance and metadata area.
- **Canon/source:** `COMPACT-CANON.md:28` reserves glass for sheets/overlays but requires data legibility; `COMPONENT-CATALOG.md:25` specifies a frosted sheet plus dark scrim. The spec calls for a focus-managed detail sheet.
- **Implementation:** `S70ExerciseLibrary.tsx:27` uses a `bg-black/60` scrim, but the sheet combines `glass-card` with `bg-ink-brown-800`; the rendered result remains too transparent/noisy.
- **Required correction:** strengthen the scrim and/or use an opaque/frosted sheet surface so underlying card copy cannot compete with detail content. Recheck body-copy contrast in the rendered pixel, not tokens alone.

### M2 — HIFI-70-01 disposition marker drifts from the frozen asset contract

- **Evidence:** `ASSET-DISPOSITION.md` freezes marker `HIFI-70-01-code-native-instructional`; `S70ExerciseLibrary.tsx:20` emits `HIFI-70-01-code-native-no-raster`.
- **Why medium:** the visual treatment itself is appropriate and privacy-safe, but the exact evidence contract is not traceable from source to accepted disposition.
- **Required correction:** align the source marker to the frozen disposition (or update the frozen contract through Sol if the new marker is intentionally preferred), then assert the exact marker in the dedicated verifier.

## Low findings

None.

## Confirmed strengths

- Screens 57, 60, 62, 63, 70, 86, 87, 88, and 89 use the correct Balencia warm-dark hierarchy with orange member/action emphasis and restrained purple CIA usage.
- Medication tracking uses neutral fictional names and non-clinical dose labels, exposes the prescribed-label/clinician boundary prominently, and reconciles `3 of 4` with `75%`.
- Virtual try-on/history media is code-native and contains no identifiable person; screen 86 correctly withholds the comparison scrubber until success.
- Vision safety language remains explicitly non-diagnostic and urgent guidance is present.
- Wellbeing keeps crisis resources second and visibly available in the offline proof.
- Strict evidence confirms 390×844 framing, named visible controls, 44px target compliance, all-caps CIA, no wrong-case SIA, no horizontal overflow, and no runtime/capability events for the default routes.

## Acceptance recommendation

Repair H1–H3 and M1–M2, regenerate production-only final evidence, then rerun this design/source review. No product files were changed by this review.
