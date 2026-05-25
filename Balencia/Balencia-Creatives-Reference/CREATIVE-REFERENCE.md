# Balencia Creative Reference

Quick-lookup directory for all brand assets, design tokens, and creative guidelines.
All files are consolidated in this folder. Source of truth: `brand/Design System (Balencia).pdf` and `brand/brand_line_system (1).pdf`.

---

## Logos & Marks

The logo mark is a stylized bowl/figure shape representing the human state before coaching begins. The wordmark always ends with the **brand period**.

### Files

| Variant | Format | Path |
|---------|--------|------|
| Logo mark (vector) | SVG | `logos/Logo Mark.svg` |
| Logo frame | SVG | `logos/Frame 2147239943.svg` |
| Logo mark | PNG | `logos/logo mark png.png` |
| Full logo — white | PNG | `logos/Balencia white PNG.png` |
| Full logo — black | PNG | `logos/Balencia black png.png` |
| Full logo — white | JPG | `logos/Balencia white.jpg` |
| Full logo — black | JPG | `logos/Balencia black.jpg` |
| Background+Border | JPG | `logos/Background+Border.jpg` |
| Background+Border 1-6 | JPG | `logos/Background+Border-1.jpg` through `Background+Border-6.jpg` |

### Usage rules

- On dark backgrounds: white wordmark + orange mark (primary usage)
- On light/paper backgrounds: dark ink wordmark + orange mark
- The brand period is **always** present — it is not punctuation, it is identity
- Mark can stand alone at small sizes; wordmark never appears without the mark

---

## Color Palette

### The 60 / 30 / 10 ratio

| Role | Name | Hex | Weight | Usage |
|------|------|-----|--------|-------|
| Primary | Burnt Orange | `#FF5E00` | 60% | Action, CTA, energy, buttons, user's line on charts, primary highlights |
| Secondary | Forest Green | `#34A853` | 30% | Growth, success, completion, rewards, milestones, positive deltas |
| Accent | Royal Purple | `#7F24FF` | 10% | Coach voice (SIA), AI insights, premium moments — sparingly, it's the voice not the wallpaper |

**Key rule:** One hero color per surface. Never all three at full saturation in one composition — only the journey gradient lets them meet.

### Neutrals — warm-cool ink

| Hex | Role |
|-----|------|
| `#0A0A0F` | Deepest ink |
| `#0C0603` | Near-black warm |
| `#140A05` | Dark warm brown |
| `#211008` | Ink brown 800 — primary card background |
| `#0A0A0A` | Neutral dark |
| `#171717` | Ink 700 — skip buttons, input fields |
| `#FDFDFB` | Paper 50 — near-white |
| `#FEFAF3` | Paper 100 — warm cream |
| `#FDFBF0` | Paper warm |
| `#F9F5E6` | Paper tinted |
| `#F2ECD8` | Paper deep — muted text |

**Never use pure black (`#000`) or pure white (`#fff`).**

### Journey gradients

| Token | Name | Usage |
|-------|------|-------|
| `--grad-progress` | Progress | Teal-to-warm-yellow, general progress visuals |
| `--grad-growth` | Growth | Warm yellow-to-orange, growth moments |
| `--grad-status` | 0% to 100% | Green-to-warm scale for completion |
| `--grad-hero-glow` | Hero glow | Radial orange glow, hero sections |

---

## Typography

### Fonts

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display, body, accent | **Sora** | 400, 600, 700, 900 | Single geometric sans for all UI text |
| Logo wordmark only | **Monda** | — | Reserved exclusively for the wordmark. Never enters UI text. |

### Type scale

| Level | Weight | Size / Line | Letter spacing | Usage |
|-------|--------|-------------|----------------|-------|
| Display XL | 900 | 96 / 92 | -0.025em | Hero / billboard |
| Display L | 700 | 64 / 60 | -0.02em | Section title |
| H1 | 700 | 48 / 52 | -0.015em | Page heading |
| H2 | 700 | 36 / 39 | default | Section heading |
| H3 | 600 | 28 / 34 | default | Card title |
| Lead | 400 | 20 / 29 | default | Intro paragraph |
| Body | 400 | 16 / 25 | default | Default paragraph |
| Eyebrow | 600 | 12 | +0.12em | Section label, uppercase |

### Typography rules

- **Sentence case everywhere** — buttons, titles, navigation. Never Title Case. The wordmark is the one exception (it's drawn, not typed).
- **No exclamation marks** — energy comes from rhythm and the brand period, not punctuation. The dot is sacred.
- **Hierarchy by size and weight, never color** — only the script accent or the trailing dot gets a brand color.
- **One emotional word per page** — max two, set in italic for script-accent breath.

---

## Brand Line System

Six expressive lines with consistent stroke behavior. Source: `brand/brand_line_system (1).pdf`

### The 6 lines

| # | Line | Description | Meaning | Best use |
|---|------|-------------|---------|----------|
| 1 | **Straight Growth Line** | Minimal curve, smooth forward motion | Clear direction, confidence, stable progress, simplicity | Website dividers, headers, business cards, premium minimal layouts |
| 2 | **Loop Line** | Soft circular loop before continuing | Learning process, reflection, strategy refinement, iteration | Social posts, case studies, user journey visuals, motion graphics |
| 3 | **Large Expansion Curve** | Starts controlled, expands dramatically | Scaling, acceleration, business growth, momentum | Hero sections, billboard graphics, pitch deck covers, brand posters |
| 4 | **Wave Line** | Smooth wave motion | Adaptability, balance, human behavior, natural progress | Wellness/productivity brand side, background systems, UI decoration |
| 5 | **Crossing / Intersecting Line** | Where the line crosses itself | Complex decisions simplified, multiple paths, AI processing, connected systems | Diagrams, data visuals, AI-related communication |
| 6 | **Tight-to-Open Flow** | Starts compressed, opens wide | Confusion to clarity, unlocking potential, transformation, guided journey | Brand campaigns, onboarding visuals, storytelling animations |

### Consistency rules (all 6 lines)

- Same stroke behavior
- Same round caps
- Same thin-to-thick transition
- Similar curve tension
- Same visual rhythm

---

## Continuous Stroke Lines (UI)

The signature visual element used across the product UI.

### Stroke widths

| Width | Token | Name |
|-------|-------|------|
| 2px | thin | Subtle, decorative |
| 4px | base | Standard |
| 8px | bold | Emphasis |
| 12px | poster | Hero / billboard |

### Color meanings

| Color | Meaning |
|-------|---------|
| Orange | The user's voice |
| Green | Progress, arrival |
| Purple | The coach, AI |
| Gradient | Graphs and stats |

### Stroke rules

- Round caps, round joins — always
- One continuous stroke — never broken
- Draws itself in motion — never fades in
- Never centered symmetrically
- Never used as input borders
- Never wrapped around the logo
- One line motif per surface, max

---

## Spacing, Radii, Shadows, Motion

### Spacing — 8pt base grid

| Token | Value |
|-------|-------|
| `--s-1` | 4px |
| `--s-2` | 8px |
| `--s-3` | 12px |
| `--s-4` | 16px |
| `--s-5` | 24px |
| `--s-6` | 32px |
| `--s-7` | 48px |
| `--s-8` | 64px |
| `--s-9` | 96px |
| `--s-10` | 128px |

### Radii — generous, capsule-friendly

| Token | Value |
|-------|-------|
| `--r-xs` | 6px |
| `--r-sm` | 10px |
| `--r-md` | 14px |
| `--r-lg` | 20px |
| `--r-xl` | 28px |
| `--r-2xl` | 40px |
| `--r-pill` | 999px (pill) |

### Shadows — soft, warm-tinted

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-1` | `0 8px 24px rgba(33, 16, 8, 0.18)` | Lifted card |
| `--shadow-2` | `0 18px 48px rgba(33, 16, 8, 0.22)` | Bottom sheet |
| `--shadow-3` | `0 32px 80px rgba(33, 16, 8, 0.28)` | Modal / hero surface |
| `--glow-orange` | `0 0 32px rgba(255, 94, 0, 0.45)` | Action glow |
| `--glow-green` | `0 0 32px rgba(52, 168, 83, 0.40)` | Arrival glow |
| `--glow-purple` | `0 0 32px rgba(127, 36, 255, 0.35)` | SIA / coach glow |

**Flat by default.** Shadows only appear on state change (hover, press, lift).

### Motion — never linear

| Token | Easing | Usage |
|-------|--------|-------|
| `--ease-flow` | `cubic-bezier(0.65, 0.05, 0.36, 1)` | Signature non-linear journey |
| `--ease-out-soft` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | UI default |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Two-way transitions |

| Token | Duration | Usage |
|-------|----------|-------|
| `--dur-fast` | 160ms | Micro-interactions |
| `--dur-base` | 280ms | Standard transitions |
| `--dur-slow` | 520ms | Deliberate movements |
| `--dur-flow` | 1.2s | Flow / journey animations |

---

## Components

### Buttons

| Type | Background | Shape | Notes |
|------|-----------|-------|-------|
| Primary | Burnt Orange `#FF5E00` | Pill (999px radius) | Glow-orange on hover, 54px min height |
| Completion / Done | Forest Green `#34A853` | Pill | Glow-green on hover |
| Skip | Dark `#171717` | Pill | Hover → `#211008` |
| Cancel | Outline / neutral | Pill | Subtle, secondary action |

### Chips

| Type | Background | Usage |
|------|-----------|-------|
| Streak | Orange `#FF5E00` | "12-day streak" |
| Goal met | Green `#34A853` | "Goal met" |
| Coach insight | Purple `#7F24FF` | "Coach insight" |

### Cards

- Background: `#211008` (warm brown)
- Radius: `--r-xl` (28px)
- Flat at rest, lifts with `--shadow-1` on hover
- Never nested — no cards inside cards

### Coach input

- Background: `#171717`
- Radius: `--r-md` (14px)
- Purple "SIA" eyebrow label
- Focus outline: 2px orange

---

## Photography

- Natural light photography of real people — **no AI-generated stock**
- Slight grain, warm color grading
- Hands, faces in profile, masked into the shape system
- **Skin tone / background pairing:**
  - Light skin tone on **green** backgrounds
  - Dark skin tone on **orange** backgrounds
  - Light skin tone on **purple** backgrounds

---

## Data Visualization

- **Past data:** solid orange line
- **Projected data:** dashed purple line
- **Milestones:** green dots
- Progress sliders use journey gradient fills
- Two different color codes allowed per module for clarity (e.g., two blues for water/wellbeing)
- **No three-color gradients**
- **Avoid dark color gradients** — use the specified brand examples
- **No unrelated color codes**

---

## Brand Voice & Personality

### Identity

- **Tagline:** "A coach. In your corner."
- **Positioning:** Between calm clarity and forward motion
- **Audience:** Adults 25-45 navigating change — career pivots, new parenthood, burnout recovery, identity shifts. Allergic to wellness influencer aesthetics.

### Personality

- **Grounded** — feet on the floor
- **Curious** — questions before answers
- **Warm** — the coach in your corner
- **Playful** — light, never childish
- **Quietly confident** — calm authority

### Voice

- Conversational sentences, active voice
- Second person — "you" not "users"
- The coach speaks **with**, never **at**
- We say: *"What's worth your attention today?"*
- We don't say: ~~"Crush your goals today!"~~

---

## Folder Structure

All paths below are relative to this `Balencia-Creatives-Reference/` folder.

### `brand/` — Authoritative PDFs, brand identity, voice

| Document | Path |
|----------|------|
| Design System (full PDF) | `brand/Design System (Balencia).pdf` |
| Brand Line System (PDF) | `brand/brand_line_system (1).pdf` |
| Figma Links | `brand/Balencia Figma Links.xlsx` |
| Brand Identity | `brand/Brand-Identity.md` |
| Voice & Tone | `brand/Voice-Tone.md` |
| Branding Summary | `brand/branding-balencia.md` |

### `logos/` — All logo variants

14 files: SVG vectors, PNG transparents, JPG variants, background+border treatments. See the Logos & Marks table above.

### `design-system/` — Tokens, components, visual rules

| Document | Path |
|----------|------|
| Design System Overview | `design-system/Design-System-Overview.md` |
| Design Tokens (JSON) | `design-system/design.json` |
| Color System | `design-system/Color-System.md` |
| Typography System | `design-system/Typography-System.md` |
| Spacing & Layout | `design-system/Spacing-Layout.md` |
| Component Library | `design-system/Component-Library.md` |
| Motion System | `design-system/Motion-System.md` |
| Data Visualization | `design-system/Data-Visualization.md` |
| Accessibility | `design-system/Accessibility.md` |

### `ui-design/` — Page designs and UX architecture

| Document | Path |
|----------|------|
| Home Page Design | `ui-design/Home-Page-Design.md` |
| Pillar Detail Design | `ui-design/Pillar-Detail-Design.md` |
| Conversation UI Design | `ui-design/Conversation-UI-Design.md` |
| Complete Mobile UX/UI Flow | `ui-design/ux-architecture/balencia_complete_mobile_app_ux_ui_phases_and_flow.md` |
| UX Flow | `ui-design/ux-architecture/UX flow.md` |
| Mobile UX Architecture v2 | `ui-design/ux-architecture/balencia_mobile_ux_architecture_v2.md` |

### `prototypes/` — Interactive HTML mockups

| File | Path |
|------|------|
| Mobile app mockup | `prototypes/balencia-mobile-app.html` |
| Interactive version | `prototypes/balencia-mobile-app-interactive.html` |
| Branded landing page | `prototypes/balencia-branded-landing.html` |

### `design-reference/` — Design principles and craft guides

36 reference docs covering: brand strategy, typography, color theory, spatial design, motion design, interaction design, accessibility hardening, UX writing, critique frameworks, and more. Key files:

| Topic | File |
|-------|------|
| Brand strategy | `design-reference/brand.md` |
| Typography | `design-reference/typeset.md`, `design-reference/typography.md` |
| Color & contrast | `design-reference/colorize.md`, `design-reference/color-and-contrast.md` |
| Spatial design | `design-reference/spatial-design.md`, `design-reference/layout.md` |
| Motion & animation | `design-reference/motion-design.md`, `design-reference/animate.md` |
| UX writing | `design-reference/ux-writing.md` |
| Accessibility | `design-reference/harden.md` |
| Design audit & critique | `design-reference/audit.md`, `design-reference/critique.md` |
| Product design | `design-reference/product.md` |
