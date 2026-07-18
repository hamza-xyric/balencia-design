# VISUAL-011 F1 — final accessibility, trust, and health-safety review

Reviewer role: independent accessibility/trust/health-safety review. Product files were not edited.

## Verdict

**NOT APPROVED**

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 2 |
| Medium | 2 |
| Low | 0 |

Approval requires `0 Critical / 0 High / 0 Medium`; the current implementation does not meet that bar.

## Findings

### High

1. **S29 praises a logged meal that visibly conflicts with the member's dairy allergy.** The meal header labels `Dairy allergy` (`balencia-screens/src/components/hifi/screens/health/S29MealDetail.tsx:98-102`), the ingredient dataset includes `Greek yogurt dressing` (`S29MealDetail.tsx:37-38`), and the ingredient warning confirms the meal contains dairy (`S29MealDetail.tsx:147-152`). Despite that, CIA calls the meal “Good balance” (`S29MealDetail.tsx:141-145`). This is a direct health-trust contradiction: the warning is present, but the coaching voice positively reinforces an allergen-containing meal. The active spec requires allergy/restriction chips before suggested foods and says recipe suggestions must respect them (`Balencia-New-Screens/hifi-screens/29-meal-detail-food-logger.md:77,117`). **Required:** suppress positive CIA nutrition praise when a confirmed allergy conflicts; replace it with an explicit “not suitable for your confirmed dairy allergy / review or substitute before logging” boundary, or make the displayed restriction clearly a non-allergy preference if that is the actual data contract.

2. **S56's default state simultaneously says a tree-nut allergy is confirmed and that no confirmed allergy exists.** The chip text is always `Tree-nut allergy confirmed`; only its pressed state changes (`balencia-screens/src/components/hifi/screens/health/S56Recipes.tsx:64-65`). In the default accepted image this label is visibly present while the adjacent card says “No confirmed allergies are stored” (`S56Recipes.tsx:67`; `evidence/strict-final/56.png`). Allergy state is safety-critical and must not depend on interpreting an unpressed chip's color. The active spec requires an honest-null `No restrictions added` state and restriction matching before CIA personalization (`Balencia-New-Screens/hifi-screens/56-recipes.md`, Data Honesty and Consent/Safety sections). **Required:** render `Tree-nut allergy confirmed` only in the confirmed fixture; default must say `No confirmed allergies` or expose an operable “Add allergy” control. CIA provenance must reflect the same single state.

### Medium

3. **S29's ARIA tab widget strands non-selected tabs for keyboard users.** Each meal-type tab uses roving `tabIndex`—only the selected tab has `0`, all others have `-1`—but selection is implemented only with `onClick`; there is no ArrowLeft/ArrowRight/Home/End keyboard handler (`balencia-screens/src/components/hifi/screens/health/S29MealDetail.tsx:206-221`). A keyboard user can focus Lunch but cannot reach Breakfast, Dinner, or Snack. **Required:** implement the standard ARIA Tabs arrow-key contract with focus movement, or remove the roving-tab pattern and expose each option as a normal tabbable native control.

4. **S54/S55/S56 custom dialogs do not manage focus, Escape, trapping, or focus restoration.** Their overlays add `role="dialog"`/`aria-modal`, but contain no focus ref/effect/keydown lifecycle (`balencia-screens/src/components/hifi/screens/health/S54Meditation.tsx:36-51`; `S55YogaSessions.tsx:70-71`; `S56Recipes.tsx:89-95`). `HifiShell` makes the background inert when an overlay exists (`balencia-screens/src/components/hifi/kit/HifiShell.tsx:30-45`; `components/layout/ScreenShell.tsx:25-30`), so focus can remain on a trigger that has just become inert. The existing `E1Modal` demonstrates the required behavior—initial focus, Escape, Tab containment, uninerting, and restoration (`balencia-screens/src/components/hifi/screens/intelligence/E1Modal.tsx:14-45`). **Required:** use that accessible modal contract or implement equivalent behavior locally for all three surfaces.

## Evidence assessment

- Hardened acceptance is internally clean: `f1-acceptance.json` records **111 contexts, 101 PNGs, 937 checks, 0 failures**, isolated storage/cookies, deterministic consecutive captures, 390×844 frames, no horizontal overflow, named controls, ≥44px visible targets, and actual 125% font proofs.
- Strict scanner is also clean: `f1-strict-final.json` records **10 screens, 0 issue screens, 0 warning screens, 0 issues, 0 warnings**, with no console/page errors.
- Those tools do not include keyboard/focus interaction checks: the acceptance JSON contains no checks labelled focus, keyboard, ARIA tab behavior, modal focus, or dialog Escape/trapping. Therefore their zero-issue results do not close findings 3–4.
- Native-pixel inspection of all ten strict-final images confirmed stable dark-canon composition and no visible clipping at the reference frame. It also directly confirms the contradictory S56 default allergy label (`evidence/strict-final/56.png`).
- The accepted state images do demonstrate several strong safety repairs: S26/27 stop guidance, S28 allergy-precedence copy, S29 explicit calorie gap/media consent, S49 demo-versus-personal consent and destructive confirmation, S52 native range/crisis/privacy states, S53 reduced-motion-readable pacer and higher-risk acknowledgement, S54 qualified non-diagnostic inference, S55 non-paywalled beginner safety, and S56 restriction-first filtering. These strengths do not offset the four blocking findings.

## Re-review gate

Re-review after the four findings are repaired, with:

1. regenerated affected acceptance images for S29 and S56;
2. deterministic keyboard evidence for the S29 meal tabs;
3. deterministic initial-focus, Tab-wrap, Escape-close, and focus-return evidence for S54/S55/S56 overlays;
4. fresh hardened/strict reports remaining at zero failures/issues/warnings.
