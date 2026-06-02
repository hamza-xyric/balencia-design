# Craft Consistency — locked parameters & section templates

`CRAFT-KIT.md` says *which* pattern; this file says *with which numbers*, and gives the **`## Premium Craft` section template** every screen fills. Conform to this file (a drift from a locked value is an auditor finding). Mirrors `viz-audit/CONSISTENCY.md` for the craft layer.

---

## 1 · Locked depth parameters

| Surface size | Glow token | Radius | Track |
|---|---|---|---|
| Hero ≥96px | `--glow-orange` (32px /.45) | `--radius-xl` 28 / `--radius-2xl` 40 | `--track-inset` |
| 48–96px | `--glow-orange-md` (~20px /.40) | `--radius-xl` 28 | `--track-inset` |
| ~36px | `--glow-orange-sm` (~12px /.35) | `--radius-md` 14 | `--track-inset` |
| inline / <36px | **no glow** | `--radius-sm` 10 | — |

- Card body `ink-brown-800` + 1px `--glass-border` (white/6) + `CK-T01 --edge-highlight` always. Hero cards add `CK-T02 --surface-backplate`.
- Elevation by z-layer: cards `--shadow-1`; FABs/floating `--shadow-2`; modals/overlays `--shadow-3`. One shadow token per element — never stacked.
- Padding: card 24px (`--spacing-6`); hero card 32px (`--spacing-8`); chip/nested 12–16px. Product H-margin 16px; auth H-margin 24px.

## 2 · Locked type pairings (`CK-P3`)

| Step | Size | Weight | `--leading-*` | `--tracking-*` |
|---|---|---|---|---|
| Display XL / L | 40 / 32 | 700 | tight (1.1) | tight (−0.025em) |
| H1 / H2 / H3 | 28 / 20 / 17 | 600–700 | snug (1.25) | normal |
| Body | 16 | 400 | normal (1.4) | normal |
| Caption / small | 13 / 11 | 400–500 | normal (1.4) | normal |
| Eyebrow | 12 | 600 | snug | eyebrow (0.12em), uppercase, white-40 |

Sentence case on all labels. ≤2 brand-orange accent words per screen. Stat figures tabular-nums. Chillax logo-only.

## 3 · Locked motion timings (`CK-P4`)

| Step | Token | Easing |
|---|---|---|
| Stroke draw | `--dur-flow` 1200ms | `--ease-flow` |
| Ring/arc fill, count-up | `--dur-slow` 520ms | `--ease-flow` |
| Card rise / fade-up | `--dur-base` 280ms | `--ease-out-soft` |
| Micro (press, tooltip) | `--dur-fast` 160ms | `--ease-out-soft` |
| Stagger between siblings | 40–80ms | — |

Order: **hero draws → support rises (staggered) → numbers count → SIA settles.** `prefers-reduced-motion` → settled final frame, loops off. Never opacity-fade a stroke (§8). No urgency/looping motion on paywall/conversion.

## 4 · Locked interaction & a11y params (`CK-P8`)

- Focus-visible: `CK-T03 --focus-ring` (2px orange, 2px offset) on every focusable element — uniform app-wide.
- Targets ≥44×44pt; pressed `scale(0.97)` + light haptic; success `--glow-green` flash 600ms; error `--color-error-red` border + `role="alert"`.
- Contrast: text ≥4.5:1 (≥3:1 large) on `ink-900`/`ink-brown-800`; load-bearing graphics ≥3:1 (WCAG 1.4.11). Status = colour **+ glyph + word**, never colour-alone. Each spec **tabulates** its load-bearing pairs (no blanket "meets AA" claim).

## 5 · Locked state-craft matrix (`CK-P7`) — required artifact per screen

Every `## Premium Craft` section carries this table, each cell a *designed* layout + on-voice copy (never "see error pattern"):

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| Cold-start / Day-1 | … | … | … |
| Loading | skeleton preserving layout+depth, morphs to data | … | … |
| Empty / partial | ghosts missing, shows present | … | … |
| Error | what failed + recovery affordance | … | calibrated-red only if operational |
| Offline | cached banner, actions honestly dimmed | … | … |

## 6 · The `## Premium Craft` section template (every screen fills this)

```markdown
## Premium Craft

**Profile:** data | content   ·   **Cluster benchmark:** [app(s)] — *stays Balencia by [one line]*
**Pre-grade:** [letter (score)]   ·   **Post-grade (this section):** [letter (score)]

### Focal hierarchy
[The one focal point (CK-P2) + why; what is visibly secondary; the squint-test read.]

### Surface & depth
[CK-P1 application: which surfaces, glow sizes (locked table §1), backplate, edge-highlight, shadows, radii. Reconcile with Color Map.]

### Typographic rhythm
[CK-P3: which type steps where, leading/tracking, weight contrast, the brand period. Reconcile with Typography.]

### Microcopy (before → after)
[CK-P5: every authored string; non-shaming reframes; SIA voice; the edge strings (empty/loading/error/permission/disabled/success). Reconcile with copy in Components/Empty States.]

### Motion choreography
[CK-P4: the draw-order sequence with locked timings (§3); reduced-motion frame. Reconcile with Motion.]

### State craft
[The §5 matrix, every cell designed.]

### Signature & anti-generic
[The ≥1 ownable Balencia moment (CK-P6 + signature); the generic-tell(s) removed.]

### Accessibility
[Tabulated contrast pairs; focus ring; 44pt targets; colour+glyph+word; reduced-motion. Reconcile with Accessibility.]

Conform to `design-audit/CONSISTENCY.md`.
```

## 7 · Per-cluster emphasis (where the craft weight lands)

| Cluster | Lead with |
|---|---|
| Identity/RPG dashboards (12,16,17,19) | Constellation hero + warm-glow surfaces + non-shaming domain framing |
| Domain dashboards (26–36, 58, 63…) | one focal viz + `VIZ-KIT` consistency + honest empty states |
| Auth/forms (01–05b) | premium inputs + calm error-recovery copy + the splash stroke moment |
| Onboarding/SIA (06–11) | SIA voice authoring + draw-not-fade + purple earned |
| Chat/conversation (74–77, 09) | message-craft + safety microcopy + restraint |
| Settings/billing (21–23) | calm density + honest toggles/trust + tabulated a11y |
| Lists/utilities (25,37,57,61,62,68) | editorial list craft + empty-state warmth + fast-feedback states |
| Social/community (39,40,47,82,83) | private-first warmth + non-toxic comparison + safety flows |
| Celebration/paywall (42,43) | premium-mature reward + non-coercive value + no urgency motion |
| Overlays/media (64–69,80,81) | honest system calm + provider-honest framing |

## 8 · Determinism gate

A `## Premium Craft` section is not `specced` until **every** craft value is concrete and token-backed (a locked number from this file or a `globals.css` / `VK-017` / `CK-T##` token name) — **no "e.g.", no floating literals.** A referenced token absent from `globals.css` is named and logged `CK-T##` / cited `VK-017`.
