# Balencia Glass Canon (glass-dark v1) — compact, citable

The only style source for hi-fi specs. Cite tokens by name. Full rationale: `../Balencia-Glass-Redesign-Plan (1).md` §1.

## 0. Identity

- App: **Balencia** — whole-life AI coach. Coach persona: **CIA** (*Balen + CIA*). **Never "SIA"** — rename on sight.
- Platform: native mobile (iOS + Android), 390×844 reference frame. **Dark only** this pass.
- North star per screen: **connects** (cross-pillar intelligence) · **honest** (real source or honest null) · **premium** (funded product, not template).

## 1. Surfaces — warm dark (never flat black)

```
--bg-base:   #0A0A0F   (ink-900, true base)
--bg-warm:   #0C0603   (warm zones)
--surface-1: #140A05   (low elevation)
--surface-2: #211008   (solid data cards)
--surface-3: #2A1510   (elevated/hover)
```

**Screen atmosphere** (mandatory): soft warm radial glow top-center — `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `--bg-base` — plus 3–4% grain overlay (soft-light). CIA moments add a purple pool.

## 2. Glass tiers (selective — never mix flat and glass in one composition)

- **`.glass-card`** (default): `rgba(255,255,255,.045)` · blur 28px sat 120% · border `1px rgba(255,255,255,.08)` · radius 28 · shadow `0 18px 48px rgba(33,16,8,.45)` + inset top-light `0 1px 0 rgba(255,255,255,.12)`.
- **`.glass-frost`** (immersive, onboarding/over glow): `rgba(255,255,255,.10)` · blur 48px sat 130% · border `.16` · inset top-light `.40`.
- **`.glass-pill`** (inputs, chips, in-card CTAs): `rgba(10,10,15,.55)` · blur 24px · border `.10` · radius 999.
- **Rule:** data-dense regions use solid `--surface-2` cards; glass reserved for hero cards, chips, nav, sheets, overlays.

## 3. Semantic inner-glow (the signature — one glow per card, meaning-driven)

- `--glow-you: #FF5E00` — you · effort · streak · active metric.
- `--glow-done: #34A853` — done · growth · completion · positive delta.
- `--glow-cia: #7F24FF` — CIA · AI insight · projected · premium.
- Recipe: bottom-anchored radial, `color-mix(in srgb, var(--glow) 55%, transparent)` → transparent 70%, blur 24px, height 62% of card.
- Every spec states each card's glow color **and why**. Never decorative.

## 4. Color roles — 60/30/10

- **Burnt Orange `#FF5E00` (60)**: primary CTA, user's line on charts, streaks/effort, active nav, hero accents.
- **Forest Green `#34A853` (30)**: completion, positive deltas, milestones, recovery, "done."
- **Royal Purple `#7F24FF` (10)**: CIA voice, insight chips, projected/AI data, premium.
- Text: paper-100 `#FEFAF3` primary · paper-50 `#FDFDFB` · secondary text = paper at 64% · tertiary 40%.
- **Domain tag colors** (tags/icons only, never chrome): Fitness `#ef4444` · Nutrition `#84cc16` · Mental/Wellbeing `#14b8a6` · Finance `#10b981` · Career `#6366f1` · Relationships `#ec4899` · Spirituality `#8b5cf6` · Learning `#06b6d4` · Creativity `#f59e0b`.
- One hero color per surface.

## 5. Type — Neue Montreal + Tiempos italic accent

| Level | Font/weight | Size | Use |
|---|---|---|---|
| Display | NM Medium 500 | 34–52 | one editorial hero per screen |
| H1 | NM Medium 500 | 30–34 | page titles |
| H2 | NM Medium 500 | 24–28 | sections |
| H3 | NM Medium 500 | 19–22 | card titles |
| Body | NM Regular 400 | 15–16 | UI/body |
| Body-light | NM Light 300 | 15–16 | quiet sub-copy |
| Caption | NM Light/Reg | 12 | meta/timestamps |
| Overline | NM Medium +0.14em caps | 11 | section labels |
| **Emphasis** | **Tiempos Medium _italic_** | matches line | **one spotlight word per moment, max** (e.g. _CIA_, _whole_, _Quick_) |
| Stat/KPI | NM Medium `tabular-nums` | context | all numbers |

Sentence case everywhere. No exclamation marks. Emphasis = serif italic only (never color, never bold). Chillax = logo wordmark only. Web stand-ins: Hanken Grotesk / Newsreader italic.

## 6. Shape · spacing · motion · icons

- Radii: cards 28 (`--r-xl`) · hero 40 (`--r-2xl`) · inputs 14 · pills/chips 999.
- Spacing: 4px base, 8pt component grid, 24/32 section rhythm. Generous space = premium.
- Bottom nav: floating glass pill, 4 tabs (**Today · CIA · Goals · Me**), active = orange filled icon + label.
- Motion: physical easing (never linear) · 150–250ms feedback · glow "breathe" on hero cards · continuous-stroke line motif for hero/celebration only · animate transform/opacity only · `prefers-reduced-motion` path required.
- Icons: rounded 2px outline, filled when active, ≥24px; domain icons in domain colors.

## 7. Data-viz + honesty invariant (non-negotiable)

- Past/user = **solid orange** line · projected/AI = **dashed purple** · milestones = **green dots**. No 3-color gradients, no dark chart gradients.
- Every metric ships 3 states:
  1. **Real** — value + provenance chip (`via WHOOP`, `you logged`).
  2. **Low-confidence** — muted value + `estimated · low confidence` label.
  3. **Honest null** — designed empty state, e.g. `Not enough data yet — 3 more days`. Never invent a number.

## 8. Cross-cutting patterns (bake into every relevant screen)

- **Crisis/safety layer**: wellbeing/mood/check-in surfaces expose crisis resources entry (quiet, always reachable, never gamified).
- **Consent & data control**: any screen touching health data, photos, voice, or third-party sources shows consent state + revoke/delete entry point.
- **Locked-feature gating**: premium-locked modules render as blurred glass preview + single orange unlock CTA (never a dead end). Pattern of screen 43.
- **Quick-log FAB**: global log entry (water/meal/mood) reachable from Today-tab screens.
- **Provenance chips** on all synced data.
- **A11y floor**: AA+ contrast on all text, 44px min targets, screen-reader labels for glyph-only controls, reduced-motion variants.
- **Motivation-tier density**: every screen defines low / medium / high density variants.

## 9. Component catalog

Names + variants in `COMPONENT-CATALOG.md`. Specs reference components by canonical name (e.g. `GlassStatCard`, `CIAInsightCard`, `ChoiceCardFrost`) — never invent one-off components without flagging them NEW in the spec.

## 10. Voice — CIA copy rules

Sentence case, no exclamations, honest, direct, warm; short verbs; second person ("your sleep", never "the user's sleep"). CIA speaks as a coach, not a dashboard: leads with meaning, not the metric. One emphasis word max per moment, set in Tiempos italic.
