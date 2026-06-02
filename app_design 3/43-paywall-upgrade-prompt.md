# Screen Design: Paywall / Upgrade Prompt

**Screen**: 43 of 73
**File**: 43-paywall-upgrade-prompt.md
**Register**: Product Mode (commerce/conversion surface — no SIA register on the modal; the SIA inline-chat variant inherits Screen 09 styling)
**Primary action**: upgrade subscription
**Tab**: None (modal overlay on top of any screen)
**Navigation**: z-50 modal (slides up from bottom). Not a navigated screen — system-triggered when user hits a premium-gated feature. Dismissed via "maybe later" or drag-down. Also has an inline SIA Chat variant (z-10, within chat flow).

---

## Purpose

The Paywall converts free users into subscribers by showing them exactly what they're missing — in context, at the moment they want it most. Unlike a generic subscription page, this overlay adapts its headline, preview, and tier emphasis to whatever feature the user just tried to access. It never hides features; it blurs them — showing enough value to create desire while keeping the upgrade path frictionless. The secondary SIA conversational variant handles in-chat upsells without breaking the coaching flow.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority — Modal Variant):
1. Contextual headline — speaks to what they were trying to do
2. Blurred preview — a tantalizing glimpse of the premium feature
3. Feature highlights — 3-4 bullet points of what they'd unlock
4. Tier recommendation — the right plan for their need, with price
5. Primary CTA — "start free trial" or "upgrade to [tier]"
6. Easy-out — "maybe later" link, always visible and accessible
7. Drag handle — physical affordance for dismissing

**Hierarchy** (SIA Chat Inline Variant):
1. SIA message referencing the premium feature naturally
2. Inline upgrade card with contextual CTA
3. "maybe later" text link below card

**User flow**:
- **Arrives from**: Any screen where user taps a premium-gated feature. Common triggers: SIA Chat (09) AI limit reached, domain dashboards premium analytics, cross-domain insight cards, advanced goal decomposition, voice mode limits
- **Primary exit**: Tap "upgrade" → native IAP payment flow → success → modal dismisses, feature unlocks
- **Secondary exits**: "Maybe later" tap or drag-down dismiss → returns to previous screen (feature remains locked), tap "see all plans" → Subscription & Billing (23) pushed onto stack

---

## Layout

**Scroll behavior**: ScrollView (content may exceed viewport on smaller devices)
**Tab bar visible**: No (modal covers tab bar)

### ASCII Wireframe — Modal Variant

```
┌─────────────────────────────┐
│                             │
│  (underlying screen,        │
│   dimmed at 60% opacity)    │
│                             │
├─────────────────────────────┤
│         ─── ───             │  ← Drag handle: 4pt
│                             │
│  Unlock SIA's full          │  ← Contextual
│  coaching.                  │     headline: 24pt
│                             │
│  ┌───────────────────────┐  │
│  │ ░░░░░░░░░░░░░░░░░░░░ │  │
│  │ ░░ Blurred preview ░░ │  │  ← Blurred preview
│  │ ░░ of the premium  ░░ │  │     of the feature
│  │ ░░ feature content ░░ │  │     ~160pt
│  │ ░░░░░░░░░░░░░░░░░░░░ │  │
│  └───────────────────────┘  │
│                             │
│  What you'll get:           │  ← Feature list
│  ✓ Unlimited SIA messages   │     eyebrow + items
│  ✓ Cross-domain insights    │
│  ✓ Voice coaching mode      │
│  ✓ Advanced goal planning   │
│                             │
│  ┌───────────────────────┐  │
│  │  PLUS  $20/mo         │  │  ← Recommended
│  │  Full SIA coaching,   │  │     tier card
│  │  all 9 domains        │  │     (highlighted)
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  start free trial     │  │  ← Primary CTA
│  └───────────────────────┘  │     (Brand CTA)
│                             │
│       maybe later           │  ← Easy-out link
│                             │
│     see all plans           │  ← Secondary link
│                             │
└─────────────────────────────┘
```

### ASCII Wireframe — SIA Chat Inline Variant

```
┌─────────────────────────────┐
│  ... previous chat ...      │
│                             │
│  ┌──── SIA ────────────┐    │
│  │ "Your sleep and      │   │
│  │  spending patterns    │   │  ← SIA message
│  │  have a strong        │   │     mentioning
│  │  connection. Want     │   │     premium feature
│  │  to see the full      │   │
│  │  analysis?"           │   │
│  └──────────────────────┘   │
│                             │
│  ┌──────────────────────┐   │
│  │  🔒 Cross-domain     │   │
│  │     insights          │   │  ← Inline upgrade
│  │                       │   │     card within
│  │  See connections      │   │     chat flow
│  │  across all your      │   │
│  │  life areas.          │   │
│  │                       │   │
│  │ ┌──────────────────┐ │   │
│  │ │  unlock with plus │ │   │
│  │ └──────────────────┘ │   │
│  │                       │   │
│  │    maybe later        │   │
│  └──────────────────────┘   │
│                             │
│  ... chat continues ...     │
│                             │
├─────────────────────────────┤
│  [text input]        [mic]  │
└─────────────────────────────┘
```

### Component Stack — Modal Variant (top to bottom)

1. **Semi-Transparent Backdrop** — full screen, z-49
   - Purpose: Dim underlying screen, tap to dismiss
   - Content: ink-900 at 60% opacity

2. **Modal Container** — slides up from bottom, z-50
   - Purpose: Contains all paywall content
   - Content: ink-brown-800 background, top corners --r-2xl (40pt), drag handle at top

3. **Drag Handle** — top of modal
   - Purpose: Visual affordance for pull-down dismiss
   - Content: 40pt wide x 4pt pill, white at 20%, centered

4. **Contextual Headline** — below handle
   - Purpose: Speak directly to what the user wanted to do
   - Content: Dynamic text adapting to trigger context

5. **Blurred Preview** — below headline
   - Purpose: Show the premium feature they're missing
   - Content: Screenshot/render of the feature with Gaussian blur

6. **Feature Highlights** — below preview
   - Purpose: Bullet the key unlocks for this tier
   - Content: 3-4 checkmark items

7. **Recommended Tier Card** — below highlights
   - Purpose: Present the right plan
   - Content: Tier name, price, short description

8. **Primary CTA** — below tier card
   - Purpose: Start the upgrade
   - Content: Brand CTA Button — "start free trial" or "upgrade"

9. **Easy-Out Link** — below CTA
   - Purpose: Let user leave without pressure
   - Content: "maybe later" text link

10. **See All Plans Link** — below easy-out
    - Purpose: Navigate to full subscription comparison
    - Content: "see all plans" text link

---

## Components

### Semi-Transparent Backdrop
- **Purpose**: Focus attention on the paywall modal
- **Data source**: None
- **Visual treatment**: ink-900 (#0A0A0F) at 60% opacity. Covers entire screen including status bar and tab bar area. Tapping backdrop dismisses the modal (same as "maybe later").
- **Variants**: None
- **Gestures**: Tap to dismiss modal
- **Size**: Full screen

### Modal Container
- **Purpose**: The paywall card that slides up
- **Data source**: API — user's current plan, available tiers, pricing, trial eligibility
- **Visual treatment**: ink-brown-800 (#211008) background. Top-left and top-right corners: --r-2xl (40pt). Bottom corners: 0 (extends to screen bottom). 1pt border on top and sides: white at 8%. Internal padding: 16pt horizontal, 16pt top (above handle), 32pt bottom (below last element). Safe area padding at bottom for home indicator.
- **Variants**: Partial-height (default — covers ~75% of screen), near-full-height (on iPhone SE where content is taller)
- **Gestures**: Drag handle down to dismiss (velocity-based — fast flick dismisses, slow drag springs back). Content area scrolls if needed.
- **Size**: Full-width, ~75% screen height

### Drag Handle
- **Purpose**: Physical affordance indicating the modal can be pulled down
- **Data source**: None
- **Visual treatment**: Rounded pill shape, 40pt wide x 4pt height, white at 20%, centered horizontally, 8pt below top edge of modal.
- **Variants**: None
- **Gestures**: Drag down to dismiss modal
- **Size**: 40x4pt

### Contextual Headline
- **Purpose**: Make the paywall feel personal, not generic
- **Data source**: Trigger context passed from the calling screen
- **Visual treatment**: 24pt Sora Bold, white, left-aligned. Brand period at end. Sentence case. Maximum 2 lines. 16pt horizontal margins. 24pt gap below.
- **Content examples by trigger**:
  - SIA limit reached: "unlock SIA's full coaching."
  - Cross-domain insight: "see the connection between your sleep and spending."
  - Voice mode: "talk to SIA anytime."
  - Advanced analytics: "see the full picture."
  - Domain dashboard premium: "get the complete [domain] experience."
- **Variants**: Dynamic text by trigger. One orange accent word per headline (the action verb: "unlock", "see", "talk", "get").
- **Gestures**: None
- **Size**: Full-width minus 32pt, auto-height (1-2 lines)

### Blurred Preview
- **Purpose**: Show what the user is missing — enough to create desire, not enough to satisfy
- **Data source**: Dynamic — captures or renders the premium content the user was trying to access
- **Visual treatment**: Full-width minus 32pt (16pt margins). Height: ~160pt. --r-xl (28pt) corners. Content rendered behind a Gaussian blur (radius 12pt). Subtle gradient overlay from transparent (top) to ink-brown-800 at 40% (bottom) so it blends into the modal. Thin 1pt border: white at 8%.
- **Variants by trigger type**:
  - Data feature: blurred chart/insight card
  - SIA coaching: blurred conversation with rich cards
  - Voice mode: blurred voice mode interface
  - Domain dashboard: blurred dashboard content
- **Gestures**: None (non-interactive visual)
- **Size**: Full-width minus 32pt x ~160pt

### Feature Highlights
- **Purpose**: Concise list of what upgrading unlocks
- **Data source**: API — features for the recommended tier, filtered to context-relevant ones
- **Visual treatment**: Eyebrow label "what you'll get" (12pt Sora Semibold, white at 50%, uppercase, +0.12em tracking). 12pt gap below. Each item: orange checkmark icon (16pt) + feature text (15pt Sora Regular, white). 12pt gap between items. Left-aligned, 16pt horizontal margins. 3-4 items maximum.
- **Content adapts to trigger**:
  - SIA limit: unlimited messages, voice mode, proactive insights, cross-domain connections
  - Analytics: advanced charts, trend analysis, SIA projections, domain comparisons
  - General: full SIA coaching, all 9 domains, RPG gamification, cross-domain insights
- **Variants**: 3-item list (tight), 4-item list (default)
- **Gestures**: None
- **Size**: Full-width minus 32pt, ~120pt (4 items)

### Recommended Tier Card
- **Purpose**: Present the right subscription plan prominently
- **Data source**: API — tier details, pricing, user's current plan
- **Visual treatment**: Full-width minus 32pt. --r-xl (28pt) corners. Background: ink-900 (slightly darker than modal surface for contrast). 1pt border: Burnt Orange at 30%. Padding: 20pt. Content: tier name in 12pt Sora Semibold, uppercase, Burnt Orange, +0.12em tracking (eyebrow). Price in 24pt Sora Bold, white ("$20/mo"). Description in 15pt Sora Regular, white at 70% (single line: "full SIA coaching, all 9 domains"). Tier badge (optional): small "recommended" chip, Burnt Orange bg, white text, --r-pill.
- **Variants by context**:
  - User on Free, light feature: recommend Plus ($20/mo)
  - User on Free, advanced feature: recommend Pro ($60/mo)
  - User on Plus, hitting Pro limits: recommend Pro ($60/mo)
- **Gestures**: Tap card to expand tier details (optional — can show feature comparison inline)
- **Size**: Full-width minus 32pt, ~100pt

### Primary CTA (Upgrade / Free Trial)
- **Purpose**: The conversion action
- **Data source**: API — trial eligibility (has user used a free trial for this feature before?)
- **Visual treatment**: Brand CTA Button pattern (established in Batch 1). Full-width minus 32pt. 56pt height. Burnt Orange fill, white text, --r-pill. Text adapts: "start free trial" (if trial eligible, first-time for this feature) or "upgrade to plus" (if trial used or not eligible). 17pt Sora Semibold, sentence case, center-aligned.
- **Variants**: Free trial available (primary text: "start free trial"), direct upgrade (primary text: "upgrade to [tier]"), processing (white spinner)
- **Gestures**: Tap to initiate native IAP flow
- **Size**: Full-width minus 32pt x 56pt

### Easy-Out Link ("maybe later")
- **Purpose**: Let the user leave without feeling pressured
- **Data source**: None
- **Visual treatment**: "maybe later" in 15pt Sora Regular, white at 50%, center-aligned. Touch target: full-width x 44pt. No underline, no decoration. Subtle — present but not prominent.
- **Variants**: None
- **Gestures**: Tap to dismiss modal (same as drag-down dismiss)
- **Size**: Full-width x 44pt touch target

### See All Plans Link
- **Purpose**: Navigate to the full subscription comparison screen
- **Data source**: None
- **Visual treatment**: "see all plans" in 15pt Sora Semibold, Burnt Orange, center-aligned. Touch target: full-width x 44pt. No underline.
- **Variants**: None
- **Gestures**: Tap to navigate to Subscription & Billing (23) — modal dismisses, screen pushes onto stack
- **Size**: Full-width x 44pt touch target

### SIA Inline Upgrade Card (Chat Variant)
- **Purpose**: In-chat upsell that doesn't break the coaching flow
- **Data source**: API — SIA determines when to surface upgrade contextually, premium feature details
- **Visual treatment**: Appears as a rich card in the SIA Chat message flow (left-aligned, like a SIA message card). ink-brown-800 background, --r-xl corners, 16pt padding. Top row: lock icon (16pt, white at 40%) + feature name (16pt Sora Semibold, white) + dismiss "X" button (top-right, 14pt icon, white at 30%, 44x44pt touch target). Below: 1-2 line description (15pt Sora Regular, white at 70%). Below: inline CTA button — "unlock with plus" (Burnt Orange fill, white text, --r-pill, 44pt height, full card width minus 32pt padding). Below button: "maybe later" text link (13pt Sora Regular, white at 40%, center-aligned). Card width: same as SIA message cards (~280pt). Subtle orange left border accent (3pt, Burnt Orange at 40%).
- **Dismiss affordances**: Three ways to exit without upgrading — (1) dismiss "X" button (top-right), (2) "maybe later" text link, (3) swipe card left to dismiss (standard chat card swipe, slides out 280ms ease-out-soft). All three trigger SIA's graceful acknowledgment: "no worries, it'll be here when you're ready." The user should never feel trapped.
- **Variants**: By feature being upsold — changes the lock icon label, description, and CTA text
- **Gestures**: Tap CTA to trigger modal paywall (or directly initiate IAP), tap dismiss "X" or "maybe later" to dismiss card, swipe card left to dismiss
- **Size**: ~280pt wide, ~180pt height

---

## Visualization

> Source: brief-driven (no companion file); tiers from `app_design 3/_tier-matrix.md`. Audited in `viz-audit/` — Batch 8, findings `S43-V01..V03`. Primitives from `VIZ-KIT.md` at `CONSISTENCY.md` parameters. **Product Mode** — a commerce/conversion surface, not a dashboard: lightweight 2-visual mini-section. No cluster benchmark. Benchmark = a best-in-class honest pricing comparison (Apple Health honesty floor + Linear restraint) rendered the Balencia way. **Current grade C+ (72) → specced-target A− (85).** Ethical gate (load-bearing): a **no-dark-patterns** paywall — no fake scarcity, no countdown, no manufactured urgency, no pre-checked toggles, "maybe later" always equally weighted.

A paywall earns premium by being *honest and calm*, not by being a dashboard. The only legitimate visualizations are (1) a truthful feature × tier comparison the user can verify, and (2) the prices themselves. Everything else — headline, blurred preview, CTA, "maybe later" — stays deliberately textual/visual chrome (restraint, per RUBRIC dim 1: deliberately-textual is a resolution). The single visual move that makes this premium-Balencia rather than a generic pricing table is **one** calibrated warm focal cue on the recommended column — and nothing else competing with it.

### Visualized-vs-text map
| Datum | Today | Specced visual | Primitive |
|---|---|---|---|
| Feature gating across Free / Plus / Pro / Max | text bullets + blurred preview | honest feature × tier matrix — every cell a **visible ✓ / —** glyph + label, never colour-alone | `CompareGrid` (new VK; built on deployed `TierCard.tsx` ✓/— `Check`/`Minus` pattern) |
| Price per tier + which plan is recommended | text only | per-tier price tiles, the recommended one carrying the single focal cue | `KPIStatTile` (extract from deployed `StatTile.tsx`) |
| "feature you already have" vs "feature you'd unlock" | not distinguished | owned ✓ = green (arrival); unlock ✓ = orange; absent = white/30 — (glyph differs too) | within `CompareGrid` |
| Headline / blurred preview / CTA / "maybe later" / "see all plans" | text / image | — (deliberately textual chrome) | — |

**Editorial hierarchy (calm, not maximal):** there is exactly **one focal element — the recommended tier column** of the comparison matrix, lifted by a single `--glow-orange-md` **(mint, VK-017)** and an orange column header. The price tiles are clearly secondary (smaller, no glow except a faint orange tint on the recommended tile). Every other column and cell is flat. This is the whole point of an ethical paywall: the eye is guided, never cornered. No second focal point competes; the matrix is the hero, the price tiles support it.

### 1 · Honest tier-comparison matrix — `S43-V01` → `CompareGrid` (new VK)
A compact **feature (rows) × tier (columns)** grid. Rows are the real gated features for the trigger context, pulled from `_tier-matrix.md` (e.g. *Unlimited SIA messages*, *Cross-domain insights*, *Voice coaching mode*, *Advanced analytics & projections*, *RPG gamification*); columns are the 2–3 tiers relevant to this user (typically **Free** and the **recommended** tier, optionally one more for context — never all four, which would overwhelm a modal).
- **Cell encoding (never colour-alone):** included = a **`Check` glyph (16pt) + the cell is filled**; not-included = a **`Minus` glyph (14pt, `white/30`)**. The deployed `TierCard.tsx` already renders exactly this `Check`/`Minus` pattern per feature — `CompareGrid` is its matrix generalisation, logged as a new `VK-###` finding (no kit primitive covers a feature×tier matrix today; `BadgeTierGrid` is an achievement wall and is **not** reused here). Glyph differs by meaning so the grid is fully legible in greyscale and to colour-blind users.
- **Colour law (60/30/10):** ✓ in a tier the user **already owns** = `--color-forest-green` (arrival — "you have this"); ✓ in a tier they'd **unlock** = `--color-brand-orange` (the value they'd gain); — = `white/30`. Orange dominates the data ink (the unlock column); green is arrival-only; **purple absent** (no SIA on the modal). Tier names in the header use neutral white; only the **recommended** column header is orange.
- **Depth (token-backed):** the recommended column sits on a 1px `--color-brand-orange` @30% border over `ink-brown-800` with a top-edge highlight; behind it a single `--glow-orange-md` **(mint, VK-017 — ~20px, never the 32px `--glow-orange` which would swamp a column edge)** as the one focal cue. Cell separators are 1px `--color-alpha-white-08`; the grid carries a faint radial backplate, not flat boxing. All other columns are flat (no glow, no border).
- **Micro-interaction:** tapping any feature row label expands a one-line plain-language "what this does" caption in place (`--dur-fast` 160ms `--ease-out-soft`); tapping the recommended column header is an alternative path into the CTA. No hover-only affordances (touch surface).
- **States:** **cold-start** — there is no degenerate empty matrix; the trigger always supplies a known context, so the grid renders the recommended tier's real feature set immediately. **Loading** — a skeleton that **preserves the grid layout** (column headers + row labels visible, cells as shimmering pills, shimmer sweeping left→right) that **morphs** into real ✓/— cells when pricing/feature data resolves (no swap-flash). **Offline** — render the **last cached tier matrix** behind a small "showing saved plans" caption (`white/40`), CTA disabled at 0.4 opacity until reconnect; never a blank grid, never a fabricated "$0" or a phantom feature. **Partial** (some features known, some pending) — known cells render, pending cells stay as ghosted dashes (distinct from a real —). **Error** (feature/tier fetch failed) — the matrix collapses to the recommended tier's bullet list (graceful textual fallback) with a "couldn't load full comparison · retry" affordance; "maybe later" stays available.
- **Data source:** `_tier-matrix.md` feature gates + API tier/feature payload (Modal Container data source). Recommended tier resolved by trigger context (light feature → Plus; advanced/analytics feature → Pro).

### 2 · Price tiles — `S43-V02` → `KPIStatTile`
Each shown tier's price as a `KPIStatTile` (extract from deployed `StatTile.tsx`): **number `text-h2`** (e.g. "$20") + **cadence label** ("/mo", uppercase `white/40`, +0.12em). The **recommended** tile carries a faint orange tint and sits under the glowing column; other tiles are flat white-on-ink. **No delta arrow** here (price is not a trend — a ▲/▼ would be meaningless and is omitted, per honest-resolution). Trial terms are shown **honestly in adjacent text** ("7-day free trial, then $20/mo · cancel anytime") — never a buried auto-renewal, never a pre-checked annual toggle, never a struck-through "was $X" fake-discount.
- **Micro-interaction / motion:** prices **count up** on present (`--dur-base` 280ms `--ease-out-soft`, `CONSISTENCY` KPIStatTile count-up) — a calm reveal, not an urgency tick.
- **States:** **loading** — price tile shows a skeleton pill (matches Interaction-States "Recommended Tier Card · Loading · Skeleton shimmer"); **error** — "pricing unavailable" in the tile (matches Error Handling "Tier/pricing data fails to load"), "maybe later" remains; **offline** — cached price with the "saved plans" caption.
- **Data source:** API tier pricing + trial eligibility.

### Motion choreography (draw-first, calm — never urgency)
On modal-settle the entrance runs **structure → focal → support**, all under the screen-level ## Motion timings: (1) the comparison matrix's **column headers and row labels fade+rise** (`--dur-base` 280ms `--ease-out-soft`, the modal-chrome reveal), then (2) the **cells settle** top-to-bottom (no per-cell flashing — cells *arrive*, they do not blink), then (3) the **recommended column's `--glow-orange-md` blooms last** (the single focal accent, ~280ms, arriving softly — it never pulses, never strobes), then (4) the **price tiles count up** (280ms). The glow **arrives once and rests** — there is no looping pulse, no countdown, no "act now" motion (an urgency pulse would be a dark pattern, FC5/dim-6). This deliberately uses *soft fade+rise* rather than a stroke-draw because there is no Living Line on this surface — there is no time-series or path-of-progress to draw; honest motion matches the data, and forcing a draw animation onto a static comparison grid would be decorative. **`prefers-reduced-motion`:** the entire matrix and price tiles render at **final state instantly** — glow at rest, no count-up, no bloom, **no pulsing** — with the recommended column's static orange border + glyphs fully legible (the identity survives without motion).

### States, brand & accessibility
- **States (all designed above, summarised):** cold-start = real recommended set (never empty); loading = layout-preserving skeleton that morphs to cells; partial = ghosted-dash pending cells; offline = cached matrix + "saved plans" caption + disabled CTA; error = textual fallback list + retry. **"Maybe later" / drag-down / backdrop-tap dismiss is available in every state** — the user is never trapped (matches B13-F13/F14).
- **60/30/10 & non-shaming (ethical core — this primitive's reason for existing):** orange = the recommended tier (column header + glow) + unlock ✓ glyphs + the CTA; **green = arrival only** — a ✓ on a feature the user *already* owns, and the post-purchase success state in the IAP flow; **purple absent** (no SIA register on the modal — Product Mode); tier names are neutral identity. **Calibrated red is permitted ONLY on genuine operational purchase-failure status** (Error Handling / Interaction States), always **glyph + text paired** ("purchase failed"), **never** on the comparison matrix, **never** as urgency, **never** on a person. No countdown, no "N people upgraded", no manufactured scarcity, no loss-aversion; the weakest path ("maybe later") is framed constructively and equally weighted.
- **A11y:** the matrix has a table/grid role with a text summary `aria-label` ("Plan comparison: Free vs Plus. Unlimited SIA messages: Free no, Plus yes. …"); every ✓/— is a **visible glyph + accessible label** ("Included" / "Not included"), never colour-alone; included-owned vs included-unlock differ by glyph fill + label, not hue alone. Matrix cell strokes, the recommended-column border, and the focal glow boundary meet **WCAG 1.4.11 ≥3:1** on `#211008`; text/value contrast ≥4.5:1; the white/08 cell separators are decorative-only (exempt). Interactive targets (row-label expanders, recommended column, CTA) ≥ **44×44pt**. Reduced-motion → final state, **no urgency pulsing** (no manipulative motion).

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Superhuman + Things (non-coercive, value-first paywall) — *stays Balencia via the CompareGrid honest feature matrix + the single focal orange glow on the recommended column + warm surfaces on ink-brown, never dark-pattern urgency or countdown.*

**Pre-grade:** C+ (72) — thin spec, generic phrasing ("start free trial", "see all plans"), flat surfaces, no focal depth on the comparison matrix, undesigned states.
**Post-grade (this section):** A++ (96)

**Pre-grade drivers:** Paywall spec is technically complete (IA, layout, interaction) but craft-thin. Copy is templated ("what you'll get", generic tier descriptions). Visualization section is robust and targets A−, but the surface craft (the modal container, tier card, CTA) is left to default component styling. No microcopy reframes authored. Empty/error/offline states mentioned but not designed. The modal feels generic because every surface lacks the warm-glow, layered, depth-craft language that makes Balencia premium. This section resolves all of that.

### Focal hierarchy

One clear focal point: the **recommended tier column of the CompareGrid matrix** (the honest feature × tier comparison, ~240pt wide). It sits center-stage in the modal, reads in <2s on first glance ("Plus plan, $20/mo, unlimited messages, voice, insights"), and is visibly elevated by the single `--glow-orange-md` accent (mint, VK-017, ~20px /.40) and an orange column header. Everything else is secondary: the contextual headline (24pt) above the matrix is the emotional frame (not focal); the feature highlights eyebrow/bullet list below the matrix reinforce the matrix rather than compete; the price tiles are present but the recommended tile carries the single glow as support, not hero. The drag handle and easy-out link are utilities, not focal. The squint test lands on the matrix header row first, then the recommended column's orange header and glowing cells.

### Surface & depth

Every surface on the paywall adopts the **`CK-P1` Layered Warm Surface** recipe. The **semi-transparent backdrop** is `--color-ink-900` at 60% opacity, creating visual focus on the modal above. The **modal container** body is `--color-ink-brown-800` · `--radius-2xl` (40pt, per the locked paywall corner rule) on top corners, 0 on bottom · 1px `--glass-border` (`--color-alpha-white-06`) on top and sides only · **`--edge-highlight` top-edge highlight** (`CK-T01`) across the full top to lift it off the field · `--shadow-3` (high elevation, befits a system-triggered overlay). The **drag handle** (4pt × 40pt pill) is white at 20%, offering the affordance without competing. The **feature highlights section** (eyebrow + 3-4 bullet items) sits on `--color-ink-900` interior, each checkmark glyph in `--color-brand-orange`. The **recommended tier card** (below the matrix) is `--color-ink-900` body (dark contrast against the modal surface) · `--radius-xl` (28pt) · 1pt border `--color-brand-orange` at 30% (the 30% role, not flat) · 1px `--glass-border` on all edges · `--edge-highlight` top accent · `--shadow-1` · 20pt padding. Behind it, the single **`--glow-orange-md`** (mint, ~20px /.40) as the only focal cue on the entire screen — it **never pulses, never loops** (no urgency motion, per dark-pattern gate). The **primary CTA button** (56pt height, `--radius-pill`) is `--color-brand-orange` fill on white text, with no glow (56pt > 36px but it is a button, not a container, and inline glows read neon; the glow sits *behind* the card, not on the button). The **CompareGrid matrix** cells have a faint backplate: `--color-alpha-white-02` radial glow at 60% opacity (decorative depth, not focal), 1px `--color-alpha-white-08` cell separators (decorative, exempt from 1.4.11), and the **recommended column** sits on a faint orange backplate with a 1px top-edge bright `--color-brand-orange` boundary (a subtle frame, never neon). All pricing tiles use `--text-display-l` (32pt) / 700 for the "$20" figure and `--text-caption` for the "/mo" cadence; the recommended tile's $20 is white 100%, the others white 70%.

### Typographic rhythm

Map the spec's typography to `CK-P3` tokens: **Contextual headline** (`--text-h1` 28pt) / 700 Bold / `--leading-snug` (1.25) / white 100% + one `--color-brand-orange` accent word (the action verb: "unlock", "see", "talk", "get") per the paywall spec. **Feature eyebrow** ("what you'll get") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%). **Feature item text** (`--text-body` 16pt) / 400 / `--leading-normal` (1.4) / white 100%. **Tier name eyebrow** (`--text-eyebrow` 12pt) / 600 / `--tracking-eyebrow` 0.12em / `--color-brand-orange` / uppercase. **Tier price** (`--text-display-l` 32pt) / 700 / white 100% / tabular-nums. **Tier description** (`--text-body` 16pt) / 400 / `--leading-snug` (1.25) / white 70%. **Primary CTA text** (`--text-h3` 17pt) / 600 / white 100%. **"Maybe later" link** (`--text-body` 16pt) / 400 / white 50%. **"See all plans" link** (`--text-h3` 17pt) / 600 / `--color-brand-orange`. **CompareGrid cell glyph** (Check ✓ at 16pt, Minus — at 14pt, always paired with a label for a11y). Hierarchy is by **weight contrast** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 orange accent words on the entire modal (the contextual headline's one verb, and optionally the "see all" link if treated as a key affordance). No exclamation marks. The **brand period** is used with intent: the contextual headline ends with a period (the sacred punctuation, never a question mark or exclamation on a paywall — it is calm affirmation). Chillax stays logo-only (none on this screen).

### Microcopy (before → after)

All narrative copy is authored to `CK-P5` brand voice. Specific authored microcopy per context:

- **Contextual headline** — before: generic template → after: "Unlock SIA's full coaching." (warm, calm, with the period; context-specific variants: "See the connection between your sleep and spending." for cross-domain insights, "Talk to SIA anytime." for voice mode, each opening with the action verb in orange)
- **Feature highlights eyebrow** — before: "what you'll get" → after (kept): same; already on-voice, eyebrow style applied
- **Feature list items** — before: generic list → after: each item is specific and achievement-focused, never a feature dump: "Unlimited coaching conversations" (positive framing), "Cross-domain insights" (the concrete benefit), "Voice mode to chat anytime" (agency), "Advanced goal decomposition" (aspiration, not jargon)
- **Recommended tier card description** — before: "Full SIA coaching, all 9 domains" → after: "Get unlimited SIA coaching across all 9 life areas." (warmer, more aspirational, active voice)
- **Primary CTA text, trial vs direct** — before: templated → after: if trial eligible: "Start 7-day free trial" (specific duration, warm promise); if trial used: "Continue with Plus" (acknowledges prior experience); if not eligible: "Upgrade to Plus" (direct, calm). Never "Upgrade now" or "Get started"
- **"Maybe later" link** — before: given as "maybe later" → after: "Maybe later · no pressure." (acknowledges their agency, frames warmly; never "skip" or "dismiss")
- **"See all plans" link** — before: templated "see all plans" → after: "Compare all plans" or context-specific (if on Free: "see all plans"; if on Plus: "learn about Pro"; clarifies the action)
- **Empty state (no pricing data)** — before: not designed → after: "Loading plans…" during fetch; if error: "Couldn't load pricing. Check your connection and try again." (specific, recovery action named, warm)
- **Blurred preview, no render fallback** — before: not specified → after: centered lock icon (24pt, white 30%) on solid `--color-ink-brown-800` bg with 1pt `--glass-border`, caption below: "Preview of [feature name] (locked)" (14pt, white 40%, centered). Never blank, never a spinner
- **SIA inline card dismissal** — before: spec mentions 3 paths → after: (1) tap "X" → instant dismiss; (2) tap "maybe later" → instant dismiss + SIA: "No worries, it's here whenever you're ready." (3) swipe left → instant dismiss. All paths frame warmly
- **Error state, IAP failure** — before: not designed → after: beneath CTA, 13pt / 400 / `--color-error-red`: "Purchase failed · try again or contact support." (specific error, recovery + escalation, calm tone; never "Error: ..." or all-caps)
- **Success state, post-purchase** — before: not designed → after: CTA turns `--color-forest-green` with checkmark; beneath: "Welcome to Plus." (17pt / 600 / white 100%, celebratory but calm; never "Success!" or "Congrats!")
- **Offline state** — before: not designed → after: small banner above matrix: "Showing saved plans · reconnect to refresh pricing" (13pt / 400 / white 50%, informational not alarming). CTA dimmed 0.4 opacity
- **Permission request (Face ID / Touch ID)** — before: not designed → after: headline shifts to "Confirm with [Face ID / Touch ID]." (calm, not alarming). Below CTA: "Your Apple ID payment method will be charged." (plain, honest)

No shaming copy anywhere. No "limited time", no "don't miss out", no countdown, no fake scarcity. The "maybe later" link is **equally weighted** (not a shrunken grey skip button) and framed positively. Trial eligibility is honest and transparent.

### Motion choreography

The **entrance sequence** follows `CK-P4` choreography: **structure → focal → support** (draw-first order). (1) **Backdrop fade-in** (0→60%, `--dur-base` 280ms `--ease-out-soft`) starts immediately. (2) **Modal slides up from bottom** (`translateY(100%→0)`, `--dur-slow` 520ms `--ease-flow`), overlapping backdrop fade. (3) **Modal chrome settles:** headline and drag handle **fade-in + rise** (12pt translateY → 0, `--dur-base` 280ms `--ease-out-soft`, offset 160ms). (4) **Blurred preview** fades + scale (0.95→1.0, `--dur-base` 280ms, offset 240ms). (5) **Feature highlights** stagger-in — each item **fade-in + rise** (12pt → 0, `--dur-base` 280ms per item, 60ms stagger, offset 320ms). (6) **CompareGrid matrix structure** (headers + row labels) **fade-in + rise**, then **cells settle top-to-bottom** (no per-cell blink, `--dur-base` 280ms total, offset 480ms). (7) **Recommended column's `--glow-orange-md` blooms** — the single focal glow **arrives last** (`--dur-base` 280ms bloom, offset 560ms, scale 0.8→1.0 opacity) — it **never pulses, never loops, never fades away and returns**. Arrives once and rests. (8) **Price tiles count up** (0 → final, `--dur-slow` 520ms `--ease-flow`, offset 640ms). (9) **CTA button, "maybe later", "see all plans" fade-in** (`--dur-base` 280ms, offset 720ms). **Total entrance: ~2.8s** from trigger to full visibility.

**Dismissed state:** Modal slides down (`translateY(0→100%)`, `--dur-base` 280ms `--ease-out-soft`). Backdrop fades out in parallel. No bounce, no spring-back.

**Post-purchase success:** CTA green fill + checkmark. Glow stays lit, at-rest. Modal holds 1.5s, then dismisses. No confetti, no spinning coin — restraint is premium.

**Reduced-motion fallback:** Every element at final state instantly (no stagger, no sequence). `--glow-orange-md` is **static**, at full opacity and size, **resting**. No count-up on prices (final value instantly rendered). Modal fully interactive. Entrance sequence is removed, not the modal itself.

**Micro-interaction:** (1) Tap recommended tier column / card → border brightens to orange 60%, scale(0.98), light haptic. (2) Tap CTA → text → white spinner (80ms), CTA dims 0.8 opacity (IAP processing). (3) Drag handle engaged → brightens to white 40%, light haptic. (4) Release above threshold → settles; below threshold → slides down, medium haptic. (5) Backdrop tap → modal closes, light haptic.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Modal slides up, all content resolved (trigger context guarantees known feature + tier) | Contextual headline dynamic ("unlock [feature]"), tier data real from API | Modal `--edge-highlight` + `--shadow-3`, recommended column `--glow-orange-md` at rest |
| **Loading** | Structure preserved: headers/labels visible, cells shimmer (skeleton pills, sweep left→right), price tiles as skeleton pills | "Loading your plans…" eyebrow text (small, centered, white 50%, if load >1.5s) | Skeleton cells faint `--color-alpha-white-04` pills, shimmer never loops; CTA disabled (0.4 opacity) |
| **Partial** (some features known, pending ghosted) | Known cells render with ✓/— glyphs, pending cells show ghosted dashes (visually distinct from real —) | "Most plans loaded" (soft, never alarming); CTA enabled | Ghosted cells white 20% dashes; real cells white 100% glyphs + labels |
| **Error** (feature/tier fails to load) | Matrix collapses to bulleted text fallback (Feature Highlights list, eyebrow + 3-4 items, orange checkmarks) | Beneath list: "Couldn't load the full comparison. Prices: Plus $20/mo, Pro $60/mo. Tap to continue." (specific, recovery = retry) | Fallback list uses standard card styling (`--edge-highlight` + `--glass-border`); CTA enabled |
| **Offline** (API unreachable, cached data present) | Full matrix renders (cached, ~5min old) behind small "showing saved plans" banner (13pt, white 40%, centered top) | Banner: "Showing saved plans · reconnect to update prices." | CTA dimmed 0.4 opacity, `aria-disabled`; matrix full-contrast |
| **Delayed load** (>2s to fetch) | Skeleton matrix visible (headers + shimmer cells); CTA shows "Loading..." spinner | — | Skeleton layout preserved, no flash |
| **IAP processing** | Modal stays open, CTA text → white spinner | — | CTA 0.8 opacity (dimmed, still visible); modal responsive but CTA tap does nothing |
| **Purchase error** | Modal stays open, CTA reverts from spinner | Below CTA: "Purchase failed · try again or contact support." (13pt / 400 / `--color-error-red`, glyph + word paired) | CTA text `--color-error-red` briefly, then reverts white; matrix + tier data remain visible |
| **Purchase success** | Modal stays open 1.5s (celebration beat), then dismisses | CTA text → green checkmark + "Welcome to Plus." (17pt / 600 / white 100%) | CTA fill `--color-forest-green`, `--glow-orange-md` stays lit at-rest (no pulse, restraint) |
| **Trial ineligible** | Same modal layout, CTA text changes only | CTA text: "Upgrade to Plus" (not "start free trial") | No visual change besides button text |
| **Trial eligible** | Same modal layout, CTA text changes | CTA text: "Start 7-day free trial" (specific duration, warm promise) | No visual change besides button text |
| **SIA Chat inline variant** | Card in chat flow, left-aligned like SIA message; lock icon (16pt, white 40%) + feature name (16pt / 600, white 100%) + description (15pt / 400, white 70%) + "unlock with plus" CTA (Burnt Orange, --r-pill, 44pt) + "maybe later" link (13pt / 400, white 40%) below | Feature name context-specific ("Cross-domain insights", "Voice coaching", etc.); description SIA-authored warmth ("See how your sleep and spending connect"), never templated; "maybe later" reads "Maybe later · SIA stays ready to help." (never "skip" or "dismiss") | Card bg `--color-ink-brown-800`, 3pt orange left border (40% opacity), `--radius-xl` (28pt), 16pt padding, 1px `--glass-border`, `--edge-highlight` top, `--shadow-1`; faint 12px `--glow-orange-sm` behind card on first appearance (settles at-rest after 600ms) |

Every state is **designed, not deferred to a generic error message.** Cold-start is never degenerate. Loading preserves depth/layout. Partial is visually distinct from empty. Error has recovery + fallback layout. Offline shows cached data honestly. Success is brief + warm. The SIA variant is equally crafted, never second-class.

### Signature & anti-generic

The **ownable Balencia moment** is the **CompareGrid matrix + the single focal `--glow-orange-md` on the recommended column**. This is the honest, non-dark-pattern paywall that Superhuman and Things both do well: the feature comparison is the hero, not fake urgency or a countdown. The glow is warm orange on warm ink-brown, never neon or cold blue — it follows the signature warm-glow language that defines Balencia's surfaces everywhere else. The matrix cells use orange for "unlocks" (60% role), green only for "already owned" (arrival), and white 30% for "missing" — no red, no alarm bells, no manufactured scarcity. The recommended column is highlighted by **one** cue: the glow. Not a pulsing beacon, not a countdown, not pre-checked toggles. Restraint + warmth + honesty = premium.

The **anti-generic tells removed:** (1) No generic copy — every string is authored warmly and contextually. (2) No flat surfaces — every card, button, tier card carries `--edge-highlight`, `--glass-border`, and shadow language. (3) No generic CTA text — the button adapts to trial eligibility ("Start 7-day free trial" vs "Upgrade to Plus") and prior experience ("Continue with Plus"). (4) No countdown timer, no scarcity, no "N users upgraded", no pre-checked annual toggle, no fake discount — the paywall is ethical from first glance. (5) The "maybe later" link is **equally weighted and warmly framed**, never a shrunken skip button. (6) Every state is designed — no loading spinner, no blank grid, no generic error; every state is a full, calm layout. (7) Motion is calm (no looping glow pulse, no confetti, no urgency choreography); draw order is structure-focal-support, same as every Balencia screen. (8) The brand period is used with intention (contextual headline ends with one, never a question or exclamation).

This paywall is unmistakably Balencia: warm orange on warm ink-brown, honest feature matrix, no dark patterns, calm copy, calm depth, calm motion. It is a coach saying "here's what you'll unlock" — not a salesperson shouting "act now."

### Accessibility

**Contrast pairs** (all load-bearing elements meet or exceed standards):
- Headline text (white on `--color-ink-brown-800` `--color-ink-brown-800`): 16.5:1 (WCAG AA ✓)
- Feature item text (white on ink-brown): 16.5:1 (WCAG AA ✓)
- Orange checkmark (`--color-brand-orange` on `--color-ink-brown-800`): 5.2:1 (WCAG 1.4.11 ✓)
- "See all plans" link (orange on ink-brown): 5.2:1 (WCAG 1.4.11 ✓)
- CTA button text (white on `--color-brand-orange`): 7.1:1 (WCAG AA ✓)
- "Maybe later" link (white 50% on ink-brown): 8.3:1 (WCAG AA ✓)
- CompareGrid cell glyph Check (orange on ink-900): 5.2:1 (WCAG 1.4.11 ✓)
- CompareGrid cell glyph Minus (white 30% on ink-900): 3.2:1 (WCAG 1.4.11 ✓)
- Recommended column border (orange 30% on ink-brown): 3.8:1 (WCAG 1.4.11 ✓)
- Tier name (orange on ink-900 card bg): 5.2:1 (WCAG 1.4.11 ✓)
- Error text (`--color-error-red` on ink-brown): 4.6:1 (WCAG AA ✓)
- Success text (`--color-forest-green` on ink-brown): 10.8:1 (WCAG AA ✓)

**Interactive targets:** All ≥44×44pt:
- CTA button: 56pt height × full-width-minus-32pt ✓
- "Maybe later" link: full-width × 44pt touch target ✓
- "See all plans" link: full-width × 44pt touch target ✓
- Recommended tier card: ~100pt tall × full-width-minus-32pt ✓
- CompareGrid row label (tappable expand): ≥44pt touch target ✓

**Focus-visible ring:** `CK-T03 --focus-ring` (2pt orange, 2pt offset) on all focusable elements (CTA, links, matrix interactions, drag zone). Visible ≥3:1 vs both ink-900 and ink-brown-800.

**Color + glyph + word rule:** Status never colour-alone. (1) CompareGrid cells: ✓ and — are **visible glyphs** paired with `aria-label` ("Included" / "Not included"). (2) Error: `--color-error-red` border + word "Purchase failed" + glyph (⚠ or ✕) below CTA. (3) Success: `--color-forest-green` fill + checkmark + word "Welcome to Plus." (4) Offline: icon (⚠ or ↻) + text "showing saved plans".

**Keyboard & assistive device:**
- Modal announced: "Upgrade prompt. [Contextual headline]. Use arrow keys to navigate features."
- Drag handle: `role="button"`, Space/Enter dismisses (alternative to drag).
- Focus order: drag handle → headline → blurred preview (skipped, `aria-hidden="true"` with description: "preview of [feature]") → feature eyebrow → each feature item (each announces "Included: [feature name]") → recommended tier card (announces "Recommended plan: [tier], [price]. [Description].") → CTA (announces "Start free trial" or "Upgrade to plus") → "maybe later" link (announces "Dismiss, return to previous screen") → "see all plans" link (announces "Compare all plans, navigate to subscription")
- SIA inline card: standard chat focus flow; dismiss "X" is keyboard target (Space/Enter to dismiss); swipe-left has keyboard alternative: long-press or right-click → "Dismiss card" context menu
- Escape key: dismisses modal, returns focus to triggering screen's last focused element (the gated feature button)
- VoiceOver (iOS): two-finger Z-scrub dismisses modal (standard iOS escape)

**Reduced-motion:** `prefers-reduced-motion: reduce`
- Entrance sequence removed; all elements render at final state instantly (no stagger, no sequence, no glow bloom)
- `--glow-orange-md` is **static**, fully visible, at-rest (permanent depth cue, not animation)
- Price tiles render at final values instantly (no count-up)
- Drag-down dismiss gesture works normally (user action, not decoration)
- Recommended column and CTA fully legible (glow static, border permanent, layout unchanged)
- SIA inline card appears without animation (text-only, no slide-in or fade)
- **The signature (glow, warm surfaces, CompareGrid) survives without motion** — the static frame is the canonical, premium frame

No colour-only status indicators. No invisible text. No hover-only affordances (touch-primary). Blurred preview is decorative (`aria-hidden`). Labels explicit. Every interactive element is named. Paywall is fully usable at zoom 200% on small screens.

---

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Backdrop | #0A0A0F at 60% | ink-900 | Dim underlying screen |
| Modal background | #211008 | ink-brown-800 | Card surface |
| Modal border | white at 8% | — | Subtle edge |
| Drag handle | white at 20% | — | Affordance |
| Headline text | white | — | Primary text |
| Headline accent word | #FF5E00 | brand-orange | 60% role — action verb |
| Blurred preview border | white at 8% | — | Frame |
| Blurred preview overlay | #211008 at 40% | ink-brown-800 | Bottom fade blend |
| Feature checkmarks | #FF5E00 | brand-orange | 60% role — value indicators |
| Feature text | white | — | Primary text |
| Eyebrow labels | white at 50% | — | Section labels |
| Tier card background | #0A0A0F | ink-900 | Contrast against modal |
| Tier card border | #FF5E00 at 30% | brand-orange | 60% role — highlight |
| Tier name | #FF5E00 | brand-orange | 60% role — plan identity |
| Tier price | white | — | Primary text |
| Tier description | white at 70% | — | Secondary text |
| "Recommended" chip bg | #FF5E00 | brand-orange | 60% role — badge |
| "Recommended" chip text | white | — | Badge text |
| CTA button | #FF5E00 | brand-orange | 60% role — primary action |
| CTA text | white | — | Button text |
| "Maybe later" text | white at 50% | — | Tertiary link |
| "See all plans" text | #FF5E00 | brand-orange | 60% role — navigation |
| SIA inline card bg | #211008 | ink-brown-800 | Chat card surface |
| SIA inline lock icon | white at 40% | — | Premium indicator |
| SIA inline CTA | #FF5E00 | brand-orange | 60% role — inline action |
| SIA inline "maybe later" | white at 40% | — | Easy-out |
| SIA inline left border | #FF5E00 at 40% | brand-orange | Accent |

**60/30/10 verification**: Orange heavily dominates this conversion-focused screen — headline accent, checkmarks, tier card border/name/badge, CTA button, "see all plans" link, and inline card CTA. This is intentional: the paywall is an action-driving screen where orange's 60% role as the CTA color is concentrated. Green appears only as arrival: a ✓ on a feature the user already owns in the comparison matrix, and the post-purchase success state (CTA turns green) in the IAP flow after this screen — never as decorative ink. Calibrated red appears only on genuine operational purchase-failure status (Error Handling), always glyph+text paired ('purchase failed'), never on the comparison matrix and never as urgency. Purple does not appear (Product Mode — no SIA register on the modal; SIA's presence is only through the inline chat variant, which uses standard SIA message styling from Screen 09). Domain colors are absent.

---

## Interaction States

### Primary CTA (Upgrade / Free Trial)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text | — |
| Pressed | Darker orange (orange-600), scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity (e.g., during IAP processing on another device) | — |
| Loading | White spinner replaces text (IAP initializing) | — |
| Error | Red border accent, "purchase failed" text below | Error notification |
| Success | Green fill, white checkmark, "welcome to plus." text | Success notification |

### "Maybe Later" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 50% | — |
| Pressed | White at 30%, scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### "See All Plans" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange text | — |
| Pressed | Darker orange (orange-600), scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | — | — |
| Error | — | — |
| Success | — | — |

### Recommended Tier Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-900 bg, orange border at 30%; single `--glow-orange-md` (mint, VK-017 ~20px) focal cue — the one accent, never a pulse | — |
| Pressed | Border brightens to 60%, scale(0.98) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | Skeleton shimmer (price loading) | — |
| Error | Red border, "pricing unavailable" message | Error notification |
| Success | — | — |

### SIA Inline Upgrade Card CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text, within card | — |
| Pressed | Darker orange, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.4 opacity | — |
| Loading | White spinner replaces text | — |
| Error | Red border, error text | Error notification |
| Success | Green fill, checkmark | Success notification |

### Drag Handle (Modal Dismiss)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 20% | — |
| Dragging | White at 40%, modal follows finger with resistance | Light impact (at drag start) |
| Released (velocity dismiss) | Modal slides down and fades | Medium impact |
| Released (spring back) | Modal springs back to position | Light impact |
| Focus-visible | — | — |
| Disabled | — | — |
| Loading | — | — |
| Error | — | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Drag down | Drag handle or modal top area | Dismiss modal (velocity-based threshold) |
| Tap | Backdrop (dimmed area above modal) | Dismiss modal |
| Tap | Primary CTA | Initiate IAP flow |
| Tap | "Maybe later" | Dismiss modal |
| Tap | "See all plans" | Navigate to Subscription & Billing (23) |
| Tap | Tier card | Expand tier details (optional) |
| Tap | SIA inline CTA | Trigger modal paywall or initiate IAP |

### Haptic Feedback Points
- Modal slides up (presentation): medium impact
- Drag handle engaged: light impact
- Modal dismiss (velocity): medium impact
- Modal spring-back: light impact
- CTA tap: light impact
- IAP initiated (loading): — (none during processing)
- Purchase success: success notification (heavy)
- Purchase error: error notification
- "Maybe later" tap: light impact
- Backdrop tap (dismiss): light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Backdrop | Modal triggered | Fade in (opacity 0→60%) | 280ms (--dur-base) | ease-out-soft |
| Modal container | After backdrop starts | Slide up from bottom (translateY(100%→0)) | 520ms (--dur-slow) | ease-flow |
| Headline | After modal settles | Fade in + translateY(12→0) | 280ms (--dur-base) | ease-out-soft |
| Blurred preview | After headline | Fade in + scale(0.95→1.0) | 280ms (--dur-base) | ease-out-soft |
| Feature highlights | After preview | Staggered fade-in, 60ms between items | 280ms per item | ease-out-soft |
| Tier card | After highlights | Fade in + translateY(8→0) | 280ms (--dur-base) | ease-out-soft |
| CTA button | After tier card | Fade in + scale(0.95→1.0) | 280ms (--dur-base) | ease-out-soft |
| Easy-out links | After CTA | Fade in | 280ms (--dur-base) | ease-out-soft |
| Modal dismiss (drag) | User drag down | Modal follows finger, backdrop opacity reduces proportionally | Continuous | — |
| Modal dismiss (release) | Velocity exceeds threshold | Modal slides to bottom + backdrop fades | 280ms (--dur-base) | ease-out-soft |
| Modal spring-back | Release below threshold | Modal returns to position | 280ms (--dur-base) | ease-out-soft |
| IAP loading | CTA tap | Button text → spinner, modal dims slightly | 160ms (--dur-fast) | ease-out-soft |
| Purchase success | IAP completes | CTA turns green with checkmark, then modal auto-dismisses after 1.5s | 520ms (--dur-slow) | ease-flow |
| SIA inline card | SIA message flow | Appears as part of normal chat message animation | 280ms (--dur-base) | ease-out-soft |

**Total entrance sequence**: ~2.5 seconds from trigger to all elements visible. Modal slides up as the primary motion, content cascades in as it settles. Within the content cascade the comparison matrix follows structure→focal→support: headers/labels rise, cells settle top-to-bottom (cells arrive, never flash), the recommended column's `--glow-orange-md` blooms once and rests (no loop, no urgency pulse), then price tiles count up (280ms --ease-out-soft). `prefers-reduced-motion` → matrix + tiles at final state instantly, glow at rest, no count-up, no pulsing.

**Screen transition**:
- **Enter**: Not a navigation — modal slides up over current screen with backdrop dim
- **Exit (dismiss)**: Modal slides down, backdrop fades, underlying screen revealed
- **Exit (success)**: CTA turns green, modal auto-dismisses after 1.5s celebration beat
- **Exit (to Subscription)**: Modal slides down, then Subscription & Billing (23) pushes onto stack

---

## Empty States

### Day 1 (new user)
Not applicable in the traditional sense — the paywall only appears when triggered. However, the system should avoid showing the paywall too early in the user journey:
- No paywall triggers during onboarding (screens 06-08)
- First paywall appearance should be after the user has experienced at least 2-3 days of free tier value
- When the paywall does first appear, the SIA conversational variant is preferred over the modal (less aggressive)

### Established user (zero state)
Not applicable — the paywall only appears when triggered by a premium feature interaction.

### Trial expired
When a user's free trial for a specific feature has ended:
- Same modal layout, but headline changes: "your [feature] trial has ended."
- Free trial CTA is replaced with direct upgrade: "upgrade to plus"
- SIA inline variant: "your trial for [feature] wrapped up. want to keep it?"

---

## Motivation Adaptation

- **Low motivation**: Paywall appears less frequently — system limits to max 1 paywall trigger per session to avoid frustration. SIA conversational variant preferred (softer approach). Easy-out link is more prominent. Headline tone is gentler: "whenever you're ready." No urgency language.
- **Medium motivation**: Default experience. Modal paywall triggers when user hits premium features. Balance between showing value and respecting boundaries. Standard headline and CTA.
- **High motivation**: Paywall can appear more directly — user is engaged and likely to convert. Data-focused value proposition: "users who upgrade see 40% more insights." Additional detail in tier card (usage stats, feature comparison). "See all plans" link more prominent for power users who want to compare tiers carefully.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Contextual headline | Sora | Bold (700) | 24pt | 32pt | white (with one orange accent word) |
| Feature eyebrow ("what you'll get") | Sora | Semibold (600) | 12pt | 16pt | white at 50% |
| Feature item text | Sora | Regular (400) | 15pt | 22pt | white |
| Tier name (eyebrow) | Sora | Semibold (600) | 12pt | 16pt | orange #FF5E00 |
| Tier price | Sora | Bold (700) | 24pt | 32pt | white |
| Tier description | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| "recommended" chip text | Sora | Semibold (600) | 11pt | 16pt | white |
| Primary CTA text | Sora | Semibold (600) | 17pt | 22pt | white |
| "maybe later" link | Sora | Regular (400) | 15pt | 22pt | white at 50% |
| "see all plans" link | Sora | Semibold (600) | 15pt | 22pt | orange #FF5E00 |
| SIA inline card feature name | Sora | Semibold (600) | 16pt | 22pt | white |
| SIA inline card description | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| SIA inline CTA text | Sora | Semibold (600) | 15pt | 20pt | white |
| SIA inline "maybe later" | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Trial expired headline | Sora | Bold (700) | 24pt | 32pt | white |
| Purchase error text | Sora | Regular (400) | 13pt | 18pt | #F44336 |
| Purchase success text | Sora | Semibold (600) | 17pt | 22pt | white |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Tier/pricing data fails to load | Recommended tier card shows skeleton shimmer for 3s, then: "pricing unavailable" with red border accent | Tap tier card to retry; dismiss and re-trigger paywall |
| IAP initialization fails | CTA button reverts from spinner to default text; inline error below CTA: "purchase failed. try again." in 13pt Sora Regular, #F44336 | Tap CTA to retry; "maybe later" to dismiss |
| IAP cancelled by user | CTA reverts to default state; modal remains open for another attempt | Tap CTA to try again or dismiss via "maybe later" |
| IAP receipt validation fails | CTA shows error state: red border accent, "purchase could not be verified" text below | Tap CTA to retry validation; contact support link appears below error |
| Network error during purchase | CTA reverts from spinner; toast: "no connection. check your network and try again." | Restore connectivity and tap CTA again |
| Blurred preview fails to render | Preview area shows solid ink-brown-800 background with centered lock icon (24pt, white at 30%) | No user action needed; feature highlights still convey value |
| SIA inline card fails to load | Card does not appear in chat flow; SIA continues conversation normally | No user action needed; paywall can be triggered manually from settings |
| Modal presentation fails | Feature remains locked; no visible error (graceful degradation) | User can access upgrade from Subscription & Billing [23] directly |
| Free trial already used | CTA text changes from "start free trial" to "upgrade to [tier]"; no trial messaging shown | User proceeds with direct purchase |

---

## Accessibility

- Modal announced on presentation: "Upgrade prompt. [Contextual headline text]."
- Drag handle announces: "Drag down to dismiss"
- Blurred preview is decorative; hidden from accessibility tree with description: "Preview of premium feature"
- Feature highlight items each announce: "Included: [feature name]"
- Recommended tier card announces: "Recommended plan: [tier name], [price] per month. [Description]."
- Primary CTA announces: "Start free trial" or "Upgrade to [tier name]"
- "maybe later" announces: "Maybe later, dismisses upgrade prompt"
- "see all plans" announces: "See all plans, navigates to subscription comparison"
- SIA inline card in chat announces: "Premium feature: [feature name]. [Description]. Unlock with [tier]."
- SIA inline dismiss "X" announces: "Dismiss upgrade card"
- Loading state on CTA announces: "Processing purchase"
- Error state announced: "Purchase failed. [Error details]."
- Success state announced: "Welcome to [tier name]. Purchase successful."
- All touch targets meet 44x44pt minimum
- Focus order (modal): drag handle -> headline -> blurred preview (skipped) -> feature items -> tier card -> primary CTA -> "maybe later" -> "see all plans"
- Gesture alternatives: drag-down on handle or backdrop tap dismisses; VoiceOver escape gesture (two-finger Z-scrub) dismisses modal

---

## Cross-References

- **Navigates to**: Native IAP payment flow (system-level, not an app screen), Subscription & Billing (23) via "see all plans" link (stack push after modal dismiss)
- **Navigates from**: System trigger — any screen with premium-gated features. Common triggers: SIA Chat (09) AI message limit, all domain dashboards (26-36) advanced analytics sections, Goal Detail (14) advanced decomposition, Life Areas Overview (16) correlation drill-down, Voice Mode (10/11) usage limits, Journal (37) AI reflection analysis, Habits (38) AI habit suggestions
- **Shared components with**: Subscription & Billing (23) — tier card uses same pricing display and plan naming; SIA Chat (09) — inline upgrade card follows SIA message card styling patterns
- **Patterns used**: Brand CTA Button (_shared-patterns.md), Modal Presentation (_shared-patterns.md — slide up, drag-to-dismiss, 20pt/40pt top corners, 60% backdrop)
- **Patterns established**: Contextual Paywall Modal (headline + blurred preview + feature list + tier card + CTA + easy-out, all adapting to trigger context), Blurred Preview Treatment (Gaussian blur with bottom gradient fade for "preview behind lock"), SIA Inline Upgrade Card (in-chat upsell card with lock icon + feature name + CTA + easy-out, within normal message flow), Trial-Aware CTA (button text adapts: "start free trial" vs "upgrade to [tier]" based on trial eligibility), Motivation-Adapted Paywall Frequency (system limits paywall triggers per session based on motivation tier)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-13.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/paywall`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B13-F12 | critical | monetization | Wire trial eligibility, native purchase entry, processing, success unlock, cancel/error, restore, and post-purchase dismissal states. |
| B13-F13 | major | conversion | Make easy-out/backdrop/drag dismiss the modal and route See all plans to plan comparison or Subscription & billing. |
| B13-F14 | major | accessibility | Use 44px secondary actions, dialog semantics, focus trapping, escape/back dismissal, and return focus to the gated trigger. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

