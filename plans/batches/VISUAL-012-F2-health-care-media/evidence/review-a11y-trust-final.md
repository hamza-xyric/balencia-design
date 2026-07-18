# F2 final accessibility and trust review

Reviewer: independent Terra adversarial pass
Scope: screens 57, 58, 60, 62, 63, 70, 86, 87, 88, and 89; active hi-fi specs; final production acceptance/strict evidence; representative final PNGs.
Method: read-only source/evidence inspection. No product, verifier, browser, server, or git mutation.

## Verdict

**Not ready for final acceptance: C0 / H1 / M4 / L0.**

The final production evidence is strong but does not cover the behavioral defects below. `f2-acceptance-final.json` reports `status: pass`, build `Z78CcQxvU_kL3Zg3OuGIr`, 123 expected contexts, 113 expected screenshots, and no console/page/capability events. `f2-strict-final.json` reports 10/10 screens with zero issues and zero warnings; its scanner found no sub-44px targets. The shared `E1Modal` also implements an actual modal contract: `role="dialog"`, `aria-modal`, initial focus, focus trapping, Escape dismissal, background inerting, and focus restoration (`E1Modal.tsx:6-45`). Those facts do not resolve the consent, destructive-action, tab, and disabled-link semantics below.

## Findings

### H1 — Vision logging remains writable after consent is revoked

- **Evidence:** `balencia-screens/src/components/hifi/screens/health/S88VisionSuite.tsx:10-12` seeds `consent` to false for `consent-off`, but consent is never consulted by the exercise controls. At `:18`, Start/Pause and Complete remain enabled; Complete unconditionally sets the timer to done and announces `Exercise completed. Non-diagnostic completion saved locally.` At `:20`, the switch only flips presentation/state text.
- **Visual proof:** `evidence/acceptance-final/88-consent-off.png` visibly shows enabled **Start exercise** and **Complete** actions while the fixture is the consent-off state.
- **Source conflict:** `Balencia-New-Screens/hifi-screens/88-vision-suite.md:56,73,86-88` makes the screen-health log consent/revoke/delete boundary part of the operational and trust layer. A revoked log cannot truthfully claim a new completion was saved.
- **Impact:** a keyboard, switch, or pointer user can revoke sensitive wellbeing-log consent and then create a new stored-log claim anyway. This is a privacy/trust boundary failure, not merely missing polish.
- **Required repair:** gate every operation that stores a wellbeing-log result on consent, or let the timer run without persistence and explicitly say the completion was not saved. Add a verifier case that toggles consent off, exercises both Start and Complete, and proves no saved-success state or persistence claim occurs.

### M1 — Virtual try-on's unconsented state has no consent-acceptance path and exposes a contradictory revoke action

- **Evidence:** `balencia-screens/src/components/hifi/screens/health/S86VirtualTryon.tsx:15,23-30` derives `unconsented`, disables Generate, and suppresses CIA evidence, but the consent card always renders **Revoke access** and **Delete**. No action can accept consent or move the UI from unconsented to consented. Camera and photo controls remain visually present but Generate stays blocked by `unconsented`.
- **Visual proof:** `evidence/acceptance-final/86-empty-unconsented.png` says **No photo access** and **Choose consent before adding a photo**, yet the only consent action is **Revoke access**.
- **Source conflict:** `Balencia-New-Screens/hifi-screens/86-virtual-tryon.md:70-77,95-100` requires a `ConsentCard` with accept/revoke/delete entry points and an honest empty state with upload choices and retention copy.
- **Impact:** the consent state is internally contradictory and keyboard/pointer users cannot recover from the honest-null or revoked path without changing the fixture URL.
- **Required repair:** render an explicit 44px **Accept preview-only access** action when unconsented/revoked; render **Revoke** only when accepted; keep capture/generation disabled until acceptance; verify the complete accept → capture-ready → revoke path.

### M2 — Disabled Wellbeing modules remain keyboard-activatable links

- **Evidence:** `balencia-screens/src/components/hifi/screens/health/S89Wellbeing.tsx:22` always renders each module as `<a href=...>`. In the disabled fixture, Stress, Energy, and Insights only receive `aria-disabled`, `pointer-events-none`, and opacity. `aria-disabled` does not suppress native anchor activation, and `pointer-events-none` does not remove the link from keyboard focus or stop Enter navigation.
- **Source conflict:** `Balencia-New-Screens/hifi-screens/89-wellbeing-hub.md:87-89` requires source-dependent modules to be disabled with a reason while safety remains available.
- **Impact:** pointer and keyboard behavior diverge; a keyboard user can activate a control the UI announces as unavailable.
- **Required repair:** omit `href`/render a disabled non-link for unavailable modules, or prevent activation and remove them from the tab order while retaining the textual reason. Verify Tab and Enter behavior in `module-disabled`.

### M3 — Vision tabs report selection changes without changing their tab panel

- **Evidence:** `balencia-screens/src/components/hifi/screens/health/S88VisionSuite.tsx:10,16-20` updates `tab` and `aria-selected`, but all three tabs continue to show the same 20-20-20 exercise content. There are no `role="tabpanel"`, `aria-controls`, or tab-specific Eye test/Strain surfaces.
- **Source conflict:** `Balencia-New-Screens/hifi-screens/88-vision-suite.md:12,71-82,92` defines distinct eye-test tasks, exercises, and strain journaling with different honest-null/low-confidence semantics.
- **Impact:** assistive technology is told a new tab is selected while the controlled content does not change, and users can mistake exercise content for an eye-test or strain result surface.
- **Required repair:** provide distinct tab panels with `aria-controls`/`aria-labelledby`, or replace the tabs with non-interactive labels until the panels exist. Add keyboard and selected-panel assertions for all three tabs.

### M4 — Try-on row deletion confirms the wrong object for two of three rows

- **Evidence:** `balencia-screens/src/components/hifi/screens/health/S87TryonHistory.tsx:19,24` hard-codes the dialog title to **Delete Linen evening look?**. Every row's Delete button only calls `setPanel('delete')`; no selected row is stored. Deleting **Workday clean fit** or **Studio neutral test** therefore opens a confirmation naming a different object and the status is likewise hard-coded.
- **Source conflict:** `Balencia-New-Screens/hifi-screens/87-tryon-history.md:68-76,95-104` requires row actions and destructive confirmation tied to each look/source state.
- **Impact:** the destructive confirmation does not establish the scope of the requested deletion, defeating the safety purpose of confirmation and creating an especially risky mismatch for photo-adjacent data.
- **Required repair:** store the selected row ID, derive dialog name/source-retention detail from that row, and update only that row. Verify deletion confirmation separately for every rendered row.

## Clean areas explicitly checked

- Medication copy uses neutral fictional schedule items, preserves the 3-of-4/75% arithmetic, labels the demo-only boundary, and does not recommend changing/skipping a dose (`S60MedicationTracking.tsx:8-14,29-35`).
- Sleep stages/recovery are suppressed for manual-only, null, and low-confidence states; trends describe and render missing nights as gaps rather than zero (`S58SleepTracking.tsx:25,28-33`).
- Exercise media and try-on imagery are code-native, privacy-safe, and non-diagnostic; the source includes useful accessible names (`S70ExerciseLibrary.tsx:19-27,47`; `S86VirtualTryon.tsx:25`; `S87TryonHistory.tsx:24`).
- Crisis support is second in the Wellbeing hierarchy and the whole `SafetyCard` is a 56px focusable link to stored Help Center guidance, including offline copy (`S89Wellbeing.tsx:18-20`; `kit/system.tsx:4-28`).
- Vision urgent guidance remains reachable in error/disabled/offline states and names sudden changes, flashes, floaters, pain, clinician care, and the non-diagnostic boundary (`S88VisionSuite.tsx:13,17-20`).
- Reduced-motion-aware skeletons use `motion-reduce:animate-none` on the bespoke F2 screens that animate; the vision implementation uses `transition-none` for its switch. The acceptance run and strict scan both used reduced-motion configuration without console/page failures.

## Acceptance condition

Repair H1 and M1-M4, then rerun the dedicated F2 verifier from a fresh production build and add interaction assertions for revoked-consent persistence, try-on consent recovery, keyboard activation of disabled modules, tab/panel correspondence, and row-specific destructive confirmation. Re-run strict 10/10 and this trust review against the promoted final evidence.
