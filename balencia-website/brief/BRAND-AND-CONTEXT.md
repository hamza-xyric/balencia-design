# Balencia — Brand & Context (single source of truth for the website)

> **Purpose.** This file consolidates everything scattered across `CLAUDE.md`, `LIFE_CORRELATION_MATRIX.md`, `Balencia/Design-System-Overview.md`, `balencia-screens/src/data/domains.ts`, `balencia-screens/src/app/globals.css`, and `Website-design-references/` into one place the website effort reads first. It answers **"what is true."** For **"what we're building,"** see [`WEBSITE-VISION.md`](./WEBSITE-VISION.md).
>
> **Source hierarchy.** `balencia-screens/src/app/globals.css` remains the canonical source for design tokens; this file is a synchronized snapshot + pointer. `Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` + the official logo files are canonical for the logo. If any older doc says teal-primary / three-pillar palette or "Chillax" wordmark, it is deprecated — see notes inline.

---

## 1. Product positioning

**Balencia** is a premium AI life-coaching app. **SIA** is the AI persona — it speaks in the first person throughout the product. Tagline: **"Find your balance."** Brand line: **"A coach. In your corner."**

The core idea: a person's life is **not** a set of independent modules (fitness here, finance there). It is **one interconnected system** where everything influences everything else — sleep affects workouts, workouts affect mood, mood affects spending, spending affects stress, stress affects sleep. Every other app treats life as silos and makes the user toggle modules on/off. Balencia maps the connections with the **Life Correlation Matrix** and coaches on them.

**The differentiator, stated plainly:**

| Everyone else | Balencia |
|---|---|
| Binary module toggles (on/off) | Continuous correlation gradient (0.0–1.0) |
| User decides what's relevant | The AI knows what's relevant from real correlations |
| Modules exist in isolation | Domains exist in a connected graph |
| Cross-domain insights are accidental | Cross-domain insights are the core architecture |
| First useful insight after weeks | Useful from day one (base correlations) |
| Same questions for everyone | Question priority shaped by the individual's correlation map |

**Audience.** Adults 25–45 navigating change (career pivots, new parenthood, burnout recovery, identity shifts). **Allergic to wellness-influencer hype.** They want grounded, trustworthy guidance — clarity over motivation.

---

## 2. The 10 life domains (canonical)

The product, the RPG stat system, and the Life Correlation Matrix all run on **the same 10 domains**. SIA is the central intelligence/core — not a domain.

| # | Domain | key | Accent hex | token | Cluster | Hub avg* |
|---|--------|-----|-----------|-------|---------|----------|
| 1 | Fitness | `fitness` | `#EF4444` | `--color-domain-fitness` | physical | 0.50 |
| 2 | Sleep | `sleep` | `#818CF8` | `--color-domain-sleep` | physical | 0.56 |
| 3 | Career | `career` | `#6366F1` | `--color-domain-career` | professional | 0.49 |
| 4 | Nutrition | `nutrition` | `#84CC16` | `--color-domain-nutrition` | physical | 0.46 |
| 5 | Finance | `finance` | `#10B981` | `--color-domain-finance` | professional | 0.39 |
| 6 | Faith | `faith` | `#A855F7` | `--color-domain-faith` | inner | 0.38 |
| 7 | Productivity | `productivity` | `#F97316` | `--color-domain-productivity` | professional | 0.54 |
| 8 | Relationships | `relationships` | `#EC4899` | `--color-domain-relationships` | inner↔prof bridge | 0.43 |
| 9 | Wellbeing | `wellbeing` | `#14B8A6` | `--color-domain-wellbeing` | inner (bridges all) | 0.68 |
| 10 | Meditation | `meditation` | `#A78BFA` | `--color-domain-meditation` | inner | 0.51 |

\* Average of a domain's 9 off-diagonal correlations (from §3). **Wellbeing is the hub** (0.68 — the source doc states ~0.71). Sleep (0.56) and Productivity (0.54) are next.

**Accent collision to handle in code:** Finance `#10B981` (emerald) and Wellbeing `#14B8A6` (teal) are visually close, and a few others share hue families. **Disambiguate by label + node size, never by color alone** (also a color-blindness requirement).

**Domain-set reconciliation (important).** Three different domain lists exist in the repo's history:
- **The 10 above** — canonical, used by the live product + the matrix. **Use these.**
- *Balencia City (the 3D project)* used **11 districts + a central SIA Tower**: Fitness, Yoga & Wellbeing, Finance, Knowledgebase, Chat & Communication, Leaderboard & Competition, Relationships, Career, Recovery & Sleep, AI Analytics, Nutrition. Fold these into the 10: Yoga & Wellbeing → Wellbeing/Meditation; Recovery & Sleep → Sleep; Knowledgebase + AI Analytics + Chat → SIA's intelligence (not domains); Leaderboard & Competition → an RPG/social *feature*, not a domain.
- *An older 3D brief* used a 10-module set (Sleep, Fitness, Nutrition, Wellbeing, Career, Productivity, Finance, Relationships, Faith, Meditation) with building archetypes — useful only as render/mood reference.

---

## 3. The Life Correlation Matrix (the USP)

A **weighted graph**: each of the 10 domains is a node; every pair of domains has a correlation weight **0.0–1.0** (co-movement, not causality). 10 domains → **45 unique pairs**. Symmetric (sleep↔fitness 0.85 both ways). The user never sees the matrix directly; they experience a coach that intuitively knows what's relevant. Machine-readable copy: [`lcm-matrix.json`](./lcm-matrix.json).

### The base matrix (population-level, research-backed — verbatim from `LIFE_CORRELATION_MATRIX.md §3`)

|              | FIT | SLP | CAR | NUT | FIN | FAI | PRD | REL | WEL | MED |
|--------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| **Fitness**      | 1.00 | 0.85 | 0.35 | 0.80 | 0.25 | 0.20 | 0.50 | 0.35 | 0.75 | 0.45 |
| **Sleep**        | 0.85 | 1.00 | 0.55 | 0.60 | 0.20 | 0.25 | 0.75 | 0.35 | 0.80 | 0.70 |
| **Career**       | 0.35 | 0.55 | 1.00 | 0.30 | 0.80 | 0.30 | 0.75 | 0.45 | 0.60 | 0.35 |
| **Nutrition**    | 0.80 | 0.60 | 0.30 | 1.00 | 0.45 | 0.25 | 0.50 | 0.25 | 0.65 | 0.35 |
| **Finance**      | 0.25 | 0.20 | 0.80 | 0.45 | 1.00 | 0.25 | 0.50 | 0.35 | 0.55 | 0.20 |
| **Faith**        | 0.20 | 0.25 | 0.30 | 0.25 | 0.25 | 1.00 | 0.30 | 0.50 | 0.65 | 0.75 |
| **Productivity** | 0.50 | 0.75 | 0.75 | 0.50 | 0.50 | 0.30 | 1.00 | 0.40 | 0.60 | 0.55 |
| **Relationships**| 0.35 | 0.35 | 0.45 | 0.25 | 0.35 | 0.50 | 0.40 | 1.00 | 0.75 | 0.45 |
| **Wellbeing**    | 0.75 | 0.80 | 0.60 | 0.65 | 0.55 | 0.65 | 0.60 | 0.75 | 1.00 | 0.80 |
| **Meditation**   | 0.45 | 0.70 | 0.35 | 0.35 | 0.20 | 0.75 | 0.55 | 0.45 | 0.80 | 1.00 |

**Strong pairs (0.70+):** Sleep↔Fitness 0.85 · Fitness↔Nutrition 0.80 · Sleep↔Wellbeing 0.80 · Wellbeing↔Meditation 0.80 · Career↔Finance 0.80 · Sleep↔Productivity 0.75 · Career↔Productivity 0.75 · Fitness↔Wellbeing 0.75 · Relationships↔Wellbeing 0.75 · Faith↔Meditation 0.75 · Sleep↔Meditation 0.70.
**Weak pairs (≤0.25):** Faith↔Fitness 0.20 · Finance↔Meditation 0.20 · Finance↔Sleep 0.20 · Fitness↔Finance 0.25 · Faith↔Sleep 0.25 · …

**Clusters:** Physical (Fitness, Sleep, Nutrition — all 0.60+), Professional (Career, Finance, Productivity — all 0.50+), Inner life (Faith, Meditation, Wellbeing — all 0.65+). **Bridges:** Wellbeing bridges all three; Productivity bridges physical↔professional; Relationships bridges inner↔professional.

### Three layers
- **Base** (population-level, research-backed): the matrix above. Useful from day zero. Same for all users.
- **Personal** (individual-level, Bayesian-learned): starts empty, grows with data; overrides base where the user's life diverges. This is why every user's coach becomes unique.
- **Temporal** (context-level): ephemeral boosts — declining sleep boosts sleep↔everything; Ramadan boosts faith↔nutrition; a job change boosts career↔everything; a deadline boosts the goal domain. Decays as context passes.

Blend: `effective = base·(1−confidence) + personal·confidence + temporal`, clamped [0,1].

### The "unimaginable insight" (the story to tell on the site, framed as one of many)
Base Meditation↔Finance is only **0.20**. Over ~6 weeks SIA observes that on days a user meditates, their next-day spending drops; the **personal** weight climbs **0.20 → 0.55** (confidence crosses ~0.25 at wk2, ~0.50 at wk5). Once confidence > 0.50, SIA surfaces:
> *"I've noticed something interesting. On days you meditate, your spending the next day tends to be lower. It looks like mindfulness might be helping you make more intentional financial decisions. Want to explore this?"*

This is the kind of insight no single-purpose app could ever find. **It must always be framed as one of thousands** (see WEBSITE-VISION).

### Illustrative cross-domain insights (from `Website-design-references/07-connections-and-insights.md`)
Fitness↔Sleep · Nutrition↔Career ("skipped meals on meeting days reduce afternoon focus ~31%") · Relationships↔Wellbeing ("social connection improves recovery ~24%") · Finance↔Career ("spending +40% during high-stress work weeks") · Recovery↔Analytics · Communication↔Relationships ("you haven't spoken to [name] in 14 days").
**Caveat (mandatory):** the percentages are illustrative prototype figures, **not validated product claims**. Ship qualitative phrasing or a `~`-prefixed personal "on your data so far" qualifier, plus a persistent "example figures — not product claims" footnote. No stat ships as fact until validated.

---

## 4. RPG / gamification (showcased mid-page, not the hero)

- **Life Power** — single overall score. **Domain Stats** — 0–99 per domain (consistency 40% / depth 35% / trend 25%), shown on the **10-axis radar** (the "life wheel"; shape = your story).
- **Missions** — Life (epic) / Main / Side / Weekly / Daily / Group quests.
- **Squads** (temporary 2–5 person groups) & **Communities** (persistent guilds). For the hype-averse audience, frame as **companionship/accountability**, not ranked competition.
- **The AI Story Engine** — SIA writes the user's life back to them as a memoir, grounded in real data (Hero's-Journey phases; warm, no shame language).
- **Tiers:** Free $0 / Plus $20 / Pro $60 / Max $100–200.

---

## 5. Brand tokens (canonical snapshot — source: `balencia-screens/src/app/globals.css`)

**60 / 30 / 10 color rule** governs each *surface*: orange 60% / green 30% / purple 10%. One hero color per surface. Domain accents are for identification only (radar vertices, district glows, chips) — **never for CTAs** (CTAs are always orange).

| Token | Hex | Role |
|---|---|---|
| `--color-brand-orange` | `#FF5E00` | primary CTA, energy, connection accents, user's voice |
| `--color-forest-green` | `#34A853` | success, growth, completion, milestones |
| `--color-royal-purple` | `#7F24FF` | SIA / AI / coach cues only (sparingly) |
| `--color-ink-900` | `#0A0A0F` | screen background (never pure black) |
| `--color-ink-brown-800` | `#211008` | card surface (glassmorphism base) |
| `--color-ink-700` | `#171717` | elevated surfaces, inputs |
| `--color-paper-100` | `#FEFAF3` | primary text on dark (never pure white) |
| `--color-paper-50` | `#FDFDFB` | near-white warm |
| gold (connection lines) | `#F59E0B` | cross-domain connection lines (also Finance accent in city) |
| `--color-error-red` | `#F44336` | error |

**Glass card:** `background #211008` · `border 1px rgba(255,255,255,0.06)` (`--glass-border`; strong = `0.10`) · `border-radius 28px` (`--radius-xl`) · `box-shadow 0 8px 24px rgba(33,16,8,0.18)` (`--shadow-1`).
**Radii:** xs 6 / sm 10 / md 14 / lg 20 / xl 28 / 2xl 40 / pill 999.
**Shadows:** `--shadow-1/2/3` (warm-tinted, brown). **Glows:** `--glow-orange 0 0 32px rgba(255,94,0,.45)` · `--glow-green …rgba(52,168,83,.40)` · `--glow-purple …rgba(127,36,255,.40)`.
**Alpha-white tints:** `--color-alpha-white-03 … -100` (text hierarchy: 70% secondary, 50% tertiary, 40% quaternary).
**Spacing (8pt):** 4/8/12/16/20/24/32/40/48/64.
**Type (app sizes — scale UP for web hero):** display-xl 40 / display-l 32 / h1 28 / h2 20 / h3 17 / body 16 / caption 13 / eyebrow 12 / small 11. *Web display will go larger (~64–112px) for hero billboards.*

**Motion:**
| Token | Value | Use |
|---|---|---|
| `--ease-flow` | `cubic-bezier(0.65,0.05,0.36,1)` | narrative line-drawing, transformation (signature) |
| `--ease-out-soft` | `cubic-bezier(0.22,0.61,0.36,1)` | UI default, tap/state |
| `--ease-in-out-brand` | `cubic-bezier(0.65,0,0.35,1)` | two-way (expand/collapse) |
| `--dur-fast` `--dur-base` `--dur-slow` `--dur-flow` | 160 / 280 / 520 / 1200 ms | micro / standard / deliberate / line-draw |

Existing keyframes worth reusing: `stroke-draw` (lines draw themselves via `stroke-dashoffset`), `radar-grow`, `radar-dot-in`, `fade-up`, `sia-thinking`, `ambient-drift`, `breathing-guide`.

**Typography:** **Sora** for all UI (weights 400/600/700; ExtraBold 800 for display). The **wordmark** uses the **official logo asset** (do NOT regenerate) — `Balencia/Balencia-Creatives-Reference/logos/` (`Logo Mark.svg`, `Balencia white PNG.png`, `Balencia black png.png`). If the wordmark is ever live-typeset, the canonical font is **Monda** per `CREATIVE-REFERENCE.md` (older docs say "Chillax" — deprecated). The brand **period** is sacred ("Balencia.", "Find your balance.").

---

## 6. Brand voice

SIA narrates in **first person** ("I read every chapter"); the brand speaks to "**you**." Grounded, warm, curious, quietly confident. The coach in your corner — speaks *with*, never *at*.

**Rules (hard):** sentence case everywhere (only the drawn wordmark is excepted) · **zero exclamation marks** (energy from rhythm, layout, the brand period) · active voice · second person · at most **one** italicized emotional word per section · no hype ("crush", "destroy", "unlock", "10x", "grind" are banned) · no shame.
- ✓ "What's worth your attention today?" / "You're ready for a steady session." / "here is one small change."
- ✗ "Crush your goals!" / "Maximum performance unlocked." / "Destroy your limits."

---

## 7. Data-visualization language

- **Solid orange** = past / user data. **Dashed purple** = AI projection / SIA / personal-layer. **Green dots** = milestones. Curved lines preferred. "Let the line tell the story."
- Cross-domain connection lines = **gold `#F59E0B`** (orange→gold gradient on draw-in).
- Avoid default dashboard blue (exception: water/wellbeing). Charts minimal; lines draw themselves (never opacity-fade).

---

## 8. Asset inventory (what to reuse)

| Asset | Path | Use |
|---|---|---|
| Canonical tokens | `balencia-screens/src/app/globals.css` | copy `@theme` into the website |
| 10-axis radar (SVG) | `balencia-screens/src/components/charts/RadarChart.tsx` | port + scale up for the life-wheel |
| In-app node graph | `balencia-screens/src/app/tabs/me/knowledge-graph/page.tsx` | interaction precedent (selected-edge state, "Connected to" readout, a11y) |
| Domain data | `balencia-screens/src/data/domains.ts` | keys, labels, accents, icons |
| PhoneFrame | `balencia-screens/src/components/layout/PhoneFrame.tsx` | the Today-screen mockup (Beat 8) |
| Reduced-motion correlation still + start frame | `balencia-creatives-production/outputs/onboarding-motion/CRE-02-carousel-correlation/` | reduced-motion poster reference |
| Cinematic concept stills | `Website-design-references/WhatsApp Unknown 2026-05-25 at 8.24.25 PM/` | hero placeholder + render mood target |
| Logo assets | `Balencia/Balencia-Creatives-Reference/logos/` | wordmark / mark (do not regenerate) |
| 3D city sources (Phase 2) | `balencia-city-v3/{modules,assembly,shared}` + `Website-design-references/Balencia-City-Premium-Rebuild-Plan.md` | Blender render pipeline + rig spec |
| Verbatim copy / spine | `Website-design-references/{03-content-copy,04-narrative-journey,06-product-mockup,07-connections-and-insights}.md` | copy deck |

---

## 9. Accessibility baseline

- Target **WCAG 2.1 AA**. Text in paper tones on `ink-900`, verify ≥4.5:1 (scrims behind text-over-imagery).
- **`prefers-reduced-motion`:** the prototype's `globals.css` has **no** reduced-motion block — the website must add one. Reduced motion → static key states, no scrub, no ambient drift; the LCM graph renders its settled static state.
- The LCM graph: nodes are real focusable `<button>`s, keyboard-navigable (Tab/Arrows/Enter/Escape), with a visually-hidden text-equivalent table of all 45 pairs + weights.
- All load-bearing copy is real DOM (never baked into cinematic frames) — for SEO + screen readers.
