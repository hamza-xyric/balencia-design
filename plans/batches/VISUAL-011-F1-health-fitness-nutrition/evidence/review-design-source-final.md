# VISUAL-011 F1 — independent design/source-fidelity review

- Reviewer posture: read-only independent review; no product edits.
- Sources inspected: F1 `BATCH.md`, frozen `VERIFICATION-MATRIX.md`, active specs/canon/catalog, all ten F1 product files, strict defaults, representative interaction/state PNGs, `f1-strict-final.json`, and `f1-acceptance.json`.
- Evidence binding: production build `OhCijFZhblu46W-c-VUF7` on `next start :3002`; acceptance reports `111/111` isolated contexts, `101/101` PNGs, `937` checks, and zero console/page/capability events (`f1-acceptance.json`). Strict reports `10/10`, zero issue screens, and zero warning screens (`f1-strict-final.json`).

## Verdict

**CHANGES REQUIRED — not approved.**

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 1 |
| Medium | 1 |
| Low | 0 |

Approval requires `0 Critical / 0 High / 0 Medium`; this review does not grant acceptance.

## Findings

### High — blocking sheets are visually translucent enough for background content to collide with foreground content

The active/post/detail/create/risk-gate sheets do not establish an opaque, legible foreground plane. Underlying labels and controls remain visible *through the sheet itself*, not merely through the surrounding scrim, and overlap foreground text and controls:

- `acceptance/53-risky-technique-gate.png`: underlying exercise-card titles and descriptions cross the warning paragraph, acknowledgement row, and CTA.
- `acceptance/54-post-disabled.png`: background filter labels and practice rows cross the rating controls, note label, textarea, and disabled Save action.
- `acceptance/55-session-active.png`: the underlying “Morning flow” card text crosses the timer ring and `0:22` readout.
- `acceptance/56-recipe-detail.png`: the underlying restriction/CIA copy crosses the calorie line and three provenance chips, materially reducing detail readability.
- `acceptance/56-create-validation.png`: underlying restriction/CIA content crosses the validation message and media-consent card.

This is systemic across locally composed F1 sheets. S54, S55, and S56 all use a translucent `glass-card` as the sheet surface over a partially transparent scrim (`S54Meditation.tsx:37-38`; `S55YogaSessions.tsx:71`; `S56Recipes.tsx:90,95`). S53 routes its higher-risk gate through the shared E1 modal (`S53BreathingExercises.tsx:11,33`) and exhibits the same rendered collision. Canon reserves `.glass-frost` for immersive overlays and specifies Sheet as `.glass-frost` over a scrim (`COMPACT-CANON.md:23-28`; `COMPONENT-CATALOG.md:25-27`).

This is High because core safety acknowledgement, rating, recipe detail, and create-validation content becomes visually ambiguous/unreadable despite passing DOM assertions. Repair must produce a visually solid/frosted foreground plane with no background glyph/text collision, while preserving the accepted shared boundary (prefer product-local surface overrides unless Sol explicitly serializes a shared change). Re-capture at least the five states above plus 125% proofs.

### Medium — visible meal insight copy collapses the emphasized word and following word

The strict default for screen 29 visibly reads `This loggerentry covers...` with no word boundary (`strict-final/29.png`). Source JSX splits the sentence around an inline emphasis span (`S29MealDetail.tsx:141-144`), but the rendered result lacks reliable spacing. This violates the canon's calm, readable CIA voice and the source-specific copy quality bar (`COMPACT-CANON.md:47-62,94-96`).

Repair the sentence so the rendered accessibility/text output and pixels contain `This logger entry covers 29% ...` with a stable word boundary; re-capture `29-detail`/strict default.

## Accepted aspects

- Default family composition is materially improved and source-specific: fitness intensity reconciles to 78%, workout units are metric, nutrition macro math is explicit, meal calories disclose the 85 kcal gap, progress photos are explicitly demo/not-personal, stress uses a native-looking 1–10 input, breathing shows exactly 5/8, meditation uses observational wording, yoga avoids beginner paywall locks, and Recipes preserves nested Nutrition IA (`strict-final/26.png` through `strict-final/56.png`).
- Privacy-sensitive asset dispositions are visually honest and code-native where frozen; no identifiable person/body/home/provider imagery appears.
- Safety and restriction priority are visible in key states, including the S29 photo-consent gate, S52 local support sheet, S53 technique acknowledgement, S55 tutorial fallback, and S56 allergy-conflict suppression.
- Strict and hardened verifier results are strong structural/runtime evidence, but they do not negate the foreground/background pixel collisions above.

## Re-review gate

Re-review only after:

1. all F1 blocking sheets prevent background text/glyph bleed through the foreground content plane;
2. the S29 `logger entry` word boundary is visibly correct;
3. affected PNGs are regenerated from a fresh production build with acceptance/strict/integrity gates still green.
