# F2 final-v2 accessibility and trust review

Reviewer: independent Terra adversarial pass
Scope: screens 57, 58, 60, 62, 63, 70, 86, 87, 88, and 89; frozen matrix; active hi-fi specs and fixed safety decisions; ten product files; dedicated verifier; final-v2 production acceptance and strict evidence.
Method: read-only source/evidence inspection. No product, verifier, browser, server, or git mutation.

## Verdict

**Approve: C0 / H0 / M0 / L0.**

All five findings from `review-a11y-trust-final.md` are closed. The promoted final-v2 run is tied to production build `7nh9Nk_hp6hS-s36ayB3Y` served by `next start` on port 3002. It passes the frozen 123-context / 113-PNG matrix, reports no failed assertions, no console or page errors, no capability events, and no storage/cookie residue. The independent strict run passes 10/10 screens with zero issues and zero warnings.

## Prior-finding closure

### H1 — Closed: revoked vision-log consent cannot create completion

- `S88VisionSuite.tsx:28,38,204-212,229-237,277-301` derives every eye-task, strain-log, Start, and Complete action from the same `consent` state. Both exercise mutation controls are native-disabled when consent is off; Complete cannot enter the saved-success path.
- The final-v2 verifier explicitly covers both `88-disabled` and `88-consent-off`, asserting **Start exercise** and **Complete** are disabled. The acceptance report records both assertions as passing.
- Consent can still be restored with the named switch, while urgent guidance and data controls remain available. No network, account, or persistence capability is introduced.

### M1 — Closed: try-on has a coherent accept → usable → revoke path

- `S86VirtualTryon.tsx:40-45,126-170,248-281` now renders **Accept preview-only access** only for unconsented/revoked states and **Revoke access** only for accepted states. Camera, photo choice, and render controls are disabled at the relevant unconsented, offline, or safety-unclear boundaries.
- The dedicated verifier keyboard-activates acceptance, proves the accepted state and enabled capture, then keyboard-activates revoke and proves the revoked state. Camera/photo actions also have honest local-preview outcomes and do not invoke device capabilities.
- The history action is a real named local route, deletion remains independently available, and CIA evidence is suppressed while unconsented.

### M2 — Closed: disabled Wellbeing modules are not keyboard routes

- `S89Wellbeing.tsx:202-232` renders unavailable Stress, Energy, and Insights entries as non-link elements with `aria-disabled="true"` and a visible source-permission reason. They have no `href`, native link activation, or hidden pointer/keyboard divergence.
- Final-v2 explicitly asserts that `/screens/52`, `/screens/63`, and `/screens/71` anchors are absent in `module-disabled`, while at least three disabled reasons remain exposed. Both checks pass.

### M3 — Closed: Vision tabs control distinct named panels

- `S88VisionSuite.tsx:143-168,192-305` connects each tab to a unique `role="tabpanel"` using matching `id`, `aria-controls`, and `aria-labelledby`. Eye test, Exercises, and Strain now expose materially different, non-diagnostic tasks and honest-null/low-confidence copy.
- The verifier keyboard-activates all three tabs, checks selection, and requires exactly one correspondingly named panel after each activation. All tab/panel assertions pass.

### M4 — Closed: destructive confirmation is bound to the selected try-on row

- `S87TryonHistory.tsx:9-20,25` stores `selectedId`, derives `selectedLook`, and uses that row's name and source in the modal label, heading, retention explanation, and completion status. The destructive confirmation no longer names a fixed Linen item.
- Final-v2 exercises the second row and proves the dialog names **Workday clean fit**; the frozen `delete-confirm` fixture covers the first-row confirmation. All rows use the same ID-derived handler and modal path, including the third row.

## Accessibility, safety, and trust obligations checked

- **Modal and keyboard contract:** the shared `E1Modal` provides `role="dialog"`, `aria-modal`, initial focus, forward/reverse focus trapping, Escape dismissal, background inerting, and trigger-focus restoration. Final-v2 interaction evidence records these behaviors passing on representative F2 dialogs, including Vision and Wellbeing sensitive-log/data-control flows.
- **Targets and names:** every frozen fixture passes the dedicated visible-control >=44px check, accessible-name check, nested-interactive check, and 390x844 overflow check. Strict final-v2 independently reports no small-target issues or warnings.
- **125% text:** each of the ten screens has a true screenshot-free 125% computed-font proof with no horizontal overflow, unnamed controls, or target regression.
- **Crisis and urgent access:** Screen 89 keeps Crisis resources second in the hierarchy and present in every state, including skeleton, offline, source-error, and module-disabled. Screen 88 keeps non-diagnostic urgent vision guidance reachable in error, disabled, offline, and consent-off states and names sudden changes, flashes, floaters, pain, clinician care, and the no-diagnosis boundary.
- **Health claims and provenance:** Screen 60 uses only the fixed fictional Daily support / Dose A-B-C fixture, preserves the derived 3-of-4 / 75% arithmetic, and tells users to follow the prescribed label and clinician guidance without recommending dose changes. Screen 58 hides provider-only score, reserve, stages, and recovery in manual-only state and renders missing nights as gaps. Screen 63 labels correlation as observational and not causation. Screen 70 remains instructional and not medical advice.
- **Privacy and consent:** photo-adjacent screens use code-native, non-identifiable imagery; data-control surfaces name category, source, scope, freshness/confidence, retention, export, revoke, and delete. Screen 89 presents **What this logs** before a sensitive mood save. Screen 86 exposes scoped deletion choices and no camera/file/network capability. Acceptance reports zero capability events and isolated storage/cookies for all contexts.
- **Reduced motion and honest state:** the acceptance and strict runs use reduced motion. Skeletons preserve geometry without fabricated values, honest-null/low-confidence states are explicitly labeled, and materially distinct screenshots have unique hashes per screen.

## Final decision

**Approved for F2 acceptance from an accessibility, health-safety, privacy, provenance, consent, crisis-support, keyboard, and modal-trust perspective. No changes requested.**
