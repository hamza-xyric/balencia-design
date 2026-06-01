# CP-01 — Onboarding signature

- Status: `in_progress`
- Package: `onboarding-motion`
- Session cap: 6 asset briefs (expanded by user on 2026-05-26 for onboarding-first icon kit)
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-01`

## Screens in scope

| ID | Screen | Route | Priority |
| --- | --- | --- | --- |
| 01 | Splash screen | `/auth/splash` | P0 |
| 02 | Motion carousel | `/auth/carousel` | P0 |
| 07 | SIA onboarding | `/auth/sia-onboarding` | P0 |

## Decision gates

- [ ] None blocking

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-01-splash-reveal | 01 | `/auth/splash` | official-mark + motion-still support | iterate |
| CRE-02-domain-visual-kit | 02/07 | `/auth/carousel`, `/auth/sia-onboarding` | icon-set + visual language | accepted |
| CRE-02-carousel-life-domains | 02 | `/auth/carousel` | reduced-motion still | accepted |
| CRE-02-carousel-sia-presence | 02 | `/auth/carousel` | motion-loop + reduced-motion still | draft |
| CRE-02-carousel-correlation | 02 | `/auth/carousel` | motion-loop + reduced-motion still | draft |
| CRE-02-carousel-rpg-progress | 02 | `/auth/carousel` | reduced-motion still | accepted |
| CRE-07-onboarding-canvas | 07 | `/auth/sia-onboarding` | illustration + motion-still | accepted |

## Session summary

- **Started:** 2026-05-26
- **CQ03:** resolved after follow-up: best asset wins by surface; CP-01 uses abstract motion/custom illustration and official Balencia logo assets only
- **Credits at start:** 719 (plus)
- **Reprioritized:** onboarding-first production; SIA avatar, progress photos, and Knowledge Graph are intentionally behind CP-01 until the first-user confidence assets are stronger
- User-approved on 2026-05-26: `CRE-02-domain-visual-kit/variant-02.png`, `CRE-02-carousel-life-domains/reduced-motion-still-01.png`, `CRE-02-carousel-rpg-progress/reduced-motion-still-01.png`, and `CRE-07-onboarding-canvas/variant-02.png`
- Accepted: CRE-02-domain-visual-kit — user-approved variant 02
- Iterate: CRE-01-splash-reveal — generated variants invented non-Balencia marks; next pass uses official logo file + coded/Rive/Lottie/CSS reveal
- Draft/reference: SIA presence, correlation, non-approved generated variants, domain SVG draft, and controlled SVG start-frame drafts created during continuation
- Deferred:
- Credit preflight (session total): ~116 spent (719 → 603); images 4 cr, videos 108 cr (4×27)
- Generation: all 6 briefs submitted 2026-05-26; exports under `outputs/onboarding-motion/`
- Repriority generation: 8 additional images submitted 2026-05-26; 32 credits spent (587 → 555)
- QA: accepted assets now reflect user approval; non-approved assets remain draft/reference.

## Brief notes

### CRE-01-splash-reveal

Brief: [../briefs/CRE-01-splash-reveal.md](../briefs/CRE-01-splash-reveal.md)

- Decision: `iterate`
- Reason: variants `f4227c5d-9b49-499e-8424-e453099f42b8` and `9665df1f-1386-492d-9e9d-ffc0489a0f29` generated invented marks instead of the official Balencia logo, and used a stroke wrapping/orbiting treatment that conflicts with `CREATIVE-REFERENCE.md`.
- Next pass: compose `Logo Mark.svg` / `logo mark png.png` directly, animate the official mark with coded/Rive/Lottie/CSS, and generate only optional non-logo background atmosphere if needed.

| Dimension | Score | Notes |
| --- | --- | --- |
| Brand fit | 1 | Invented logo marks. |
| Placement fit | 2 | Splash mood close, but mark/stroke behavior wrong. |
| Trust and sensitivity | 4 | No sensitive content risk. |
| Mobile legibility | 3 | Marks are visible but incorrect. |
| Package consistency | 1 | Breaks official logo system. |
| Production readiness | 1 | Not integrable. |
| Source and licensing | 1 | Logo not sourced from official files. |
| Accessibility and motion fallback | 3 | Needs official static fallback. |

| Gate | Pass |
| --- | --- |
| Brand hard-fails ([../qa/brand-gates.md](../qa/brand-gates.md)) | fail |

### CRE-02-carousel-life-domains

Brief: [../briefs/CRE-02-carousel-life-domains.md](../briefs/CRE-02-carousel-life-domains.md)

- Decision: `accepted`
- Assets: `variant-01.mp4`, `reduced-motion-still-01.png`
- Accepted: `reduced-motion-still-01.png`
- Draft/reference: `variant-01.mp4`, `controlled-start-frame.svg`
- Reason: user approved the reduced-motion still on 2026-05-26.

### CRE-02-domain-visual-kit

Brief: [../briefs/CRE-02-domain-visual-kit.md](../briefs/CRE-02-domain-visual-kit.md)

- Decision: `accepted`
- Accepted file: `outputs/onboarding-motion/CRE-02-domain-visual-kit/variant-02.png`
- Metadata: `outputs/onboarding-motion/CRE-02-domain-visual-kit/metadata.json`
- Draft/reference: `outputs/onboarding-motion/CRE-02-domain-visual-kit/domain-visual-kit.svg`
- Reason: user approved generated variant 02 because the icons are more defined; keep the project-authored SVG as draft/reference.

### CRE-02-carousel-sia-presence

Brief: [../briefs/CRE-02-carousel-sia-presence.md](../briefs/CRE-02-carousel-sia-presence.md)

- Decision: `draft/reference`
- Assets: `variant-01.mp4`, `reduced-motion-still-01.png`
- Reason: not in the user-approved set; keep as draft/reference.

### CRE-02-carousel-correlation

Brief: [../briefs/CRE-02-carousel-correlation.md](../briefs/CRE-02-carousel-correlation.md)

- Decision: `draft/reference`
- Assets: `variant-01.mp4`, `reduced-motion-still-01.png`
- Reason: not in the user-approved set; keep as draft/reference.

### CRE-02-carousel-rpg-progress

Brief: [../briefs/CRE-02-carousel-rpg-progress.md](../briefs/CRE-02-carousel-rpg-progress.md)

- Decision: `accepted`
- Assets: `variant-01.mp4`, `reduced-motion-still-01.png`
- Accepted: `reduced-motion-still-01.png`
- Draft/reference: `variant-01.mp4`, `controlled-start-frame.svg`
- Reason: user approved the reduced-motion still on 2026-05-26.

### CRE-07-onboarding-canvas

Brief: [../briefs/CRE-07-onboarding-canvas.md](../briefs/CRE-07-onboarding-canvas.md)

- Decision: `accepted`
- Assets: `variant-01.png`, `variant-02.png`, `variant-03.png`, `variant-04.png`
- Accepted: `variant-02.png`
- Draft/reference: `variant-01.png`, `variant-03.png`, `variant-04.png`, `controlled-top-band.svg`
- Reason: user approved variant 02 on 2026-05-26.

## Completion gate

- [x] All worked briefs above have QA and decisions
- [x] User-approved assets moved to accepted-assets ledger
- [x] Ledger and accepted-assets updated
- [ ] Carousel motion loops accepted after future motion generation pass
- [ ] SIA presence/correlation assets approved or replaced
- [ ] Status → `session-closed`
