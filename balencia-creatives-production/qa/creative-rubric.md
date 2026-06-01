# Creative QA rubric

Score each asset **1–5** after generation. Use scores to decide iterate vs accept; do not replace written notes.

| Score | Meaning |
| --- | --- |
| 1 | Off-brand or unusable |
| 2 | Major revision required |
| 3 | Acceptable with fixes |
| 4 | Strong, minor polish |
| 5 | Ship-ready for prototype integration |

## Dimensions

### 1. Brand fit

Warm, grounded, coach-in-your-corner. Not clinical, not gym-bro, not wellness-influencer. Colors and tone match [CREATIVE-REFERENCE.md](../../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md). Official Balencia marks must come from source files, not generation.

### 2. Placement fit

One primary visual idea per screen. Asset matches the component region and state described in the brief. Does not compete with primary CTAs.

### 3. Trust and sensitivity

Progress photos, health, spirituality, relationships, and safety flows feel respectful and credible. No sensational or shaming imagery.

### 4. Mobile legibility

Readable at thumbnail size on dark cards (`#211008`). Sufficient contrast. No critical detail lost at ~44px touch targets.

### 5. Package consistency

Matches sibling assets in the same package (same SIA face, same food photo treatment, same badge style).

### 6. Production readiness

Correct crop and resolution, no watermarks or artifacts, no generated text/logos, suitable file format for `outputs/` and eventual `public/` integration.

### 7. Source and licensing

Source is documented in `metadata.json` or the brief. Sensitive people/body/trust surfaces use real/licensed/owned or non-identifiable demo fixtures; generated assets are limited to suitable abstract, food, poster, empty, system, and demo contexts.

### 8. Accessibility and motion fallback

Alt text/placement semantics are defined. Motion assets include a reduced-motion still or a documented fallback before integration.

## Decision thresholds

| Outcome | Typical scores |
| --- | --- |
| **accepted** | All dimensions ≥ 4, no brand-gate failures |
| **iterate** | Any dimension ≤ 3 or one fixable gate fail |
| **deferred** | Blocked on CQ decision or missing reference |
| **rejected** | Brand fit ≤ 2 or multiple gate fails |

Record scores in the active batch file and the brief.
