# Screen Design: SIA Chat

**Screen**: 09 of 73
**File**: 09-sia-chat.md
**Register**: Product Mode
**Primary action**: Converse with SIA (type or tap to send messages)
**Tab**: SIA (tab 2 of 4)
**Navigation**: Tab root screen (no back button). Stack depth 0 within SIA tab. Rich inline cards deep-link to feature screens via stack push. Mic button toggles to in-chat voice mode [10]. Long-press mic transitions to full-screen voice mode [11] (Batch 3).

---

## Purpose

SIA Chat is the core product of Balencia — the unified AI coach conversation. Every other screen in the app exists to support or extend what happens here. The chat handles text conversations, rich inline content (charts, progress rings, meal plans, financial summaries), suggestion chips, proactive messages, and navigational deep-links to feature screens. SIA is proactive: it initiates conversations, surfaces cross-domain connections, and delivers insights without being asked. The chat must feel like iMessage quality with embedded app intelligence. This is where users spend most of their time and where the "it gets me" moments happen.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Latest SIA message — the active conversation, most recent at bottom
2. Rich inline cards — charts, progress, summaries embedded in the conversation flow
3. Suggestion chips — quick-response options after SIA's latest message
4. Chat input bar + mic button — the "what to do" area
5. Top bar — "SIA" title, minimal chrome, voice mode indicator
6. Older messages — scrollable history above

**User flow**:
- **Arrives from**: Bottom tab bar (tapping SIA tab), or SIA greeting card on Home Screen [12] (Batch 3), or any "Ask SIA" shortcut throughout the app
- **Primary exit**: Feature screens via rich inline card taps (stack push within SIA tab)
- **Secondary exits**: Other tabs via bottom tab bar, Full-screen voice mode [11] via long-press mic
- **Mode switch**: In-chat voice mode [10] via mic tap (no navigation — UI state change)

---

## Layout

**Scroll behavior**: FlatList (inverted — newest messages at bottom, auto-scrolls to latest). Pull-down loads older messages (pull-to-load, not pull-to-refresh).
**Tab bar visible**: Yes (SIA tab active, orange filled icon)

### ASCII Wireframe

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  SIA                 🔍 🎙  │  ← top bar: title left, search + voice icons right
├─────────────────────────────┤
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ Good morning │      │  ← SIA message bubble
│  └─┘ │ [Name]. You  │      │
│      │ crushed it   │      │
│      │ yesterday.   │      │
│      └─────────────┘      │
│                             │
│      ┌─────────────────┐   │
│      │ ┌─────────────┐ │   │  ← rich inline card
│      │ │ 📊 Sleep vs  │ │   │     (chart card)
│      │ │ Exercise     │ │   │
│      │ │ [mini chart] │ │   │
│      │ │ ↗ "view more"│ │   │
│      │ └─────────────┘ │   │
│      └─────────────────┘   │
│                             │
│       ┌──────────────┐     │
│       │ Yeah I felt  │     │  ← user message bubble
│       │ great.       │     │
│       └──────────────┘     │
│                             │
│  ┌─┐ ┌─────────────┐      │
│  │S│ │ Your sleep   │      │  ← SIA response with
│  └─┘ │ has improved │      │     inline insight
│      │ 15% since... │      │
│      └─────────────┘      │
│                             │
│  ┌──────┐ ┌──────┐ ┌────┐ │  ← suggestion chips
│  │tell  │ │show  │ │log │ │
│  │me    │ │my    │ │a   │ │
│  │more  │ │goals │ │meal│ │
│  └──────┘ └──────┘ └────┘ │
│                             │
├─────────────────────────────┤
│ ┌──────────────────┐ ┌──┐ │
│ │ message SIA       │ │🎤│ │  ← input bar + mic button
│ └──────────────────┘ └──┘ │
├─────────────────────────────┤
│  Today    SIA   Goals   Me  │  ← bottom tab bar (56pt)
├─────────────────────────────┤
│    Home Indicator (34pt)    │
└─────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Status Bar Zone** — 44pt
   - Content: Light-content, transparent

2. **Top Bar** — 48pt
   - Purpose: Screen identity + voice mode access
   - Content: "SIA" title (left), voice mode icon (right)

3. **Chat Message Area** — flexible (fills remaining space between top bar and input bar)
   - Purpose: The conversation — messages, cards, chips
   - Content: FlatList of message items (SIA bubbles, user bubbles, rich cards, suggestion chips, timestamps, day separators)

4. **Chat Input Bar** — 52pt
   - Purpose: Text entry + voice access
   - Content: Text input field + mic button (replaces send when empty) / send button (replaces mic when text entered)

5. **Bottom Tab Bar** — 56pt
   - Purpose: App navigation
   - Content: Today | **SIA** (active) | Goals | Me

6. **Home Indicator Zone** — 34pt

---

## Components

### Top Bar
- **Purpose**: Minimal chrome — identify the screen and provide voice mode access
- **Data source**: Static
- **Visual treatment**: Full-width, 48pt height. Background: ink-900 (#0A0A0F) with subtle bottom border (1pt, white at 5%). Left: "SIA" in 17pt Sora Semibold, white, 16pt from left edge. Right: search icon (magnifying glass, 20pt, white at 50%, 44x44pt touch target) + voice mode icon (waveform/mic hybrid icon, 22pt, white at 50%, 44x44pt touch target), 16pt from right edge, 8pt gap between icons. On scroll, the top bar gains a backdrop-blur effect (ink-900 at 80%, blur 20px).
- **Variants**: Default (transparent), Scrolled (backdrop-blur)
- **Gestures**: Tap voice icon → transition to full-screen voice mode [11]
- **Size**: Full-width x 48pt

### SIA Message Bubble (Extended)
- **Purpose**: Display SIA's messages — extends the pattern from Screen [07]
- **Data source**: AI-generated responses, proactive messages
- **Visual treatment**: Same as Screen [07] pattern — left-aligned, ink-brown-800 bg, white 8% border, 16/16/16/4pt radius, SIA avatar to the left. Additional capability: can contain inline domain tag chips within the text. SIA avatar only shows on the first bubble in a consecutive group.
- **Variants**:
  - **Text only**: Standard message
  - **Text with domain tags**: Domain chips inline with text (e.g., "your [fitness] and [nutrition] goals are connected")
  - **Connection Spotted**: Special variant with a header — "connection spotted" eyebrow (12pt, orange, uppercase) above the message text, indicating a cross-domain insight
  - **Proactive message**: Same visual, but appears without user prompt. Subtle entry animation (slide up) distinguishes from responses.
- **Gestures**: Long-press → copy text
- **Size**: Max-width 80% of chat area, height auto

### User Message Bubble
- **Purpose**: Display user's sent messages
- **Data source**: User input
- **Visual treatment**: Same as Screen [07] pattern — right-aligned, orange 15% bg, 16/16/4/16pt radius.
- **Variants**: Text only
- **Gestures**: Long-press → copy text
- **Size**: Max-width 80% of chat area, height auto

### Rich Inline Card
- **Purpose**: Embed interactive app content within the conversation flow — the feature that makes SIA Chat more than a chatbot
- **Data source**: Various (API data for charts, goal progress, meal plans, etc.)
- **Visual treatment**: Full-width of SIA message alignment area (left-aligned after avatar space, extends to right margin). Background: ink-brown-800 (#211008), --r-xl (28pt) corners, 1pt white 8% border. Padding: 16pt. Content varies by card type. Bottom-right: "view [feature]" link (12pt Sora Semibold, orange) for navigational cards.
- **Card types**:
  - **Chart Card**: Mini line chart (120pt tall, orange solid line for past data, purple dashed for projected). Title above chart (14pt Sora Semibold, white). Caption below (12pt Sora Regular, white at 50%).
  - **Goal Progress Card**: Progress ring (48pt, domain color) + goal name (15pt Sora Semibold, white) + "40% complete" (13pt Sora Regular, white at 50%) + next action (13pt Sora Regular, white at 70%).
  - **Meal Plan Card**: Meal name header (14pt Sora Semibold, white) + macro badges (small pills: calories, protein, carbs, fat in 11pt).
  - **Financial Summary Card**: Heading "this month" (14pt Sora Semibold, white) + income/expenses/net in a simple 3-row layout.
  - **Workout Preview Card**: Workout name + exercise count + duration estimate + "start workout" orange pill button (32pt height).
  - **Connection Spotted Card**: "connection spotted" orange eyebrow + insight text + mini chart showing the correlation + "tell me more" link.
- **Variants**: Each card type is a variant. All share the same outer shell.
- **Gestures**: Tap card → navigate to relevant feature screen (stack push). Tap "view [feature]" → same. Tap inline CTA (e.g., "start workout") → navigate directly.
- **Size**: (screen width - 48pt avatar area - 16pt right margin) x auto (120-200pt depending on type)

### Suggestion Chip Row (Extended)
- **Purpose**: Quick-response options — extends the pattern from Screen [07]
- **Data source**: AI-generated based on conversation context
- **Visual treatment**: Same as Screen [07] pattern — horizontal scroll, pill chips, orange borders and text. Positioned 8pt below the last SIA message (or rich card). Chips adapt to the conversation context.
- **Variants by context**:
  - **Conversational**: "tell me more", "what about my sleep?", "show my goals"
  - **Action-oriented**: "log a meal", "start workout", "add a goal"
  - **Navigational**: "show my finances", "open nutrition", "view schedule"
  - **Free text**: "something else" (always last chip, white 30% border)
- **Gestures**: Tap to send as user message
- **Size**: Horizontal scroll x 36pt height

### Chat Input Bar (with Mic)
- **Purpose**: Text entry and voice access — the primary interaction point
- **Data source**: User input
- **Visual treatment**: Full-width - 32pt margins (16pt each side). Total height: 52pt. Input field: ink-brown-800 bg, 1pt white 10% border, --r-pill corners. Placeholder: "message SIA" (14pt Sora Regular, white at 30%). Text: 15pt Sora Regular, white. Padding: 16pt left, 88pt right (room for two buttons).
  - **When empty**: Mic button visible (36pt circle, ink-brown-800 bg, 1pt white 10% border, white mic icon 18pt). Send button hidden.
  - **When text entered**: Send button appears (36pt circle, orange bg, white arrow-up 16pt). Mic button slides left slightly to make room, or crossfades to send button position.
  - **Button positions**: Right-aligned inside the input field, 4pt from right edge. If both visible during crossfade, mic is left, send is right.
- **Variants**: Empty (mic only), Has text (send + mic, or send replaces mic), Disabled during SIA response
- **Gestures**:
  - Tap input field → focus + keyboard
  - Tap mic (quick) → in-chat voice mode [10] (UI state change, no navigation)
  - Long-press mic (500ms+) → full-screen voice mode [11] (Batch 3, stack push to modal)
  - Tap send → submit message
- **Size**: (screen width - 32pt) x 52pt

### SIA Thinking Indicator
- **Purpose**: Show that SIA is processing a response
- **Data source**: Loading state
- **Visual treatment**: Appears as a SIA message bubble with three animated dots inside. Dots: 6pt circles, white at 40%. Animation: sequential pulse (opacity 40%→100%→40%), staggered 200ms between dots. SIA avatar shows "thinking" variant (subtle pulse on the avatar itself).
- **Variants**: Standard thinking (3 dots), Extended thinking (3 dots + "SIA is thinking deeper..." text after 5 seconds)
- **Gestures**: None
- **Size**: ~60pt wide x 36pt tall (bubble)

### Day Separator
- **Purpose**: Visually separate messages by date in the conversation history
- **Data source**: Message timestamps
- **Visual treatment**: "today", "yesterday", or "May 18" — 12pt Sora Regular, white at 30%, center-aligned. Horizontal lines (1pt, white at 5%) extending from text edges to margins. 24pt vertical padding above and below.
- **Variants**: "today", "yesterday", specific date
- **Gestures**: None
- **Size**: Full-width x 48pt (including padding)

### Pull-to-Load Indicator
- **Purpose**: Load older messages when user scrolls to the top
- **Data source**: Pagination (older message history)
- **Visual treatment**: Small spinner (20pt, white at 30%) centered above the oldest visible message. Appears when user pulls down past the first message. Text below spinner: "loading earlier messages" (12pt, white at 20%).
- **Variants**: Pulling (spinner appears), Loading (spinner animating), Complete (spinner disappears, new messages inserted)
- **Gestures**: Pull down past first message
- **Size**: Full-width x 40pt

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Top bar title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "SIA" |
| SIA message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | From Screen [07] pattern |
| User message text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | From Screen [07] pattern |
| Suggestion chip | Sora | 600 (Semibold) | 14pt | 18pt | #FF5E00 | From Screen [07] pattern |
| Input placeholder | Sora | 400 (Regular) | 14pt | 18pt | White at 30% | "message SIA" |
| Input text | Sora | 400 (Regular) | 15pt | 22pt | White #FFFFFF | User typing |
| Rich card title | Sora | 600 (Semibold) | 14pt | 18pt | White #FFFFFF | Card header |
| Rich card body | Sora | 400 (Regular) | 13pt | 18pt | White at 80% | Card content |
| Rich card caption | Sora | 400 (Regular) | 12pt | 16pt | White at 50% | Chart caption |
| Rich card link | Sora | 600 (Semibold) | 12pt | 16pt | #FF5E00 | "view [feature]" |
| "connection spotted" | Sora | 600 (Semibold) | 12pt | 16pt | #FF5E00 | Eyebrow, uppercase |
| Day separator | Sora | 400 (Regular) | 12pt | 16pt | White at 30% | "today", dates |
| Domain tag (inline) | Sora | 600 (Semibold) | 11pt | 14pt | [domain color] | Within SIA text |

---

## Composition & Visual Hierarchy

**Squint test**:
- SIA messages (left, darker) and user messages (right, warm tint) form a clear conversational rhythm
- Rich inline cards break the bubble pattern — larger, more structured, visually distinct as "content blocks"
- Suggestion chips draw attention with orange borders, positioned right where the eye lands after reading SIA's message
- The input bar + mic is the clear "what to do" at the bottom
- Top bar is minimal — "SIA" and one icon, doesn't compete with content

**Spacing breakdown (8pt grid)**:
- Top bar height: 48pt
- Top bar to first message: 12pt (--s-3)
- Between same-sender consecutive messages: 4pt (--s-1)
- Between different-sender messages: 16pt (--s-4)
- SIA message to suggestion chips: 8pt (--s-2)
- Suggestion chips to next message: 16pt (--s-4)
- SIA message to rich inline card: 8pt (--s-2)
- Rich inline card to next element: 16pt (--s-4)
- Day separator padding: 24pt above + 24pt below (--s-5)
- Last message to input bar: 8pt (--s-2)
- Input bar: 52pt
- Input bar to tab bar: 0pt (adjacent)
- Tab bar: 56pt

**Z-layers**:
- z-0: ink-900 background
- z-10: Message bubbles, rich inline cards
- z-20: Suggestion chips
- z-30: Top bar (backdrop-blur on scroll), Chat input bar (fixed at bottom)
- z-40: Tab bar
- z-50: Keyboard overlay
- z-60: Long-press copy menu

---

## Visualization

> Source: no companion file (inline-viz screen); Audited in `viz-audit/` — Batch (Insights/Correlation E · inline-micro variant), findings `S09-V01..S09-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. Benchmark = **Reflectly / Stoic editorial restraint + Welltory correlation surfacing**, rendered **the Balencia way** (micro Living Line + warm glow), never an in-bubble dashboard. **Current grade C (68) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified micro-depth + curved-path Living Line + the connection-card direction/strength a11y fix, owned by the later viz-build program.)*

**Register reconciliation (load-bearing).** The chat *chrome* is **Product Mode → orange-dominant** (suggestion chips, "view [feature]" links, send button, active tab, the Chart Card title/axis ink all stay orange). The **inline visualizations inside SIA bubbles are SIA-authored**, so the *inline-viz layer specifically* runs the **sanctioned AI register**: per `_shared-patterns.md` (`royal-purple #7F24FF` = "SIA/AI indicators only — avatar accent, coaching note borders, **projected data**"), the **dashed-purple projection** on the Chart Card and the **purple strength encoding on the Connection-Spotted card** are correct and on-brand here — *not* a 60/30/10 violation. This is a contained exception scoped to charts SIA itself computes; it does **not** repaint the chat or recolour user-effort data ink (actual/past series stay orange). The "connection spotted" eyebrow stays orange (it is product chrome / a navigational label), while the correlation *data ink* it introduces is purple (SIA-computed) — cite `_shared-patterns.md` line 49.

**EDITORIAL RESTRAINT is the governing law on this screen.** SIA Chat is iMessage-quality conversation first; charts are *guests* inside message bubbles. Locked constraints: **one viz per message bubble, maximum**; every viz is **micro-scale and legible at 390px inside a ≤ (screen − 64pt) card**; **no hero gauge, no KPI strip, no full dashboard** ever appears in the chat flow (depth lives on the destination feature screen the card deep-links to). The job here is not to maximise charts — it is to make the *few* SIA chooses to embed read as crafted, honest, accessible Balencia micro-instruments and then get out of the way. Mints **no** new primitive; it composes the inline micro-forms of `Sparkline` (`VK-001`/`VK-016`), `TrendChart` (`VK-006`/`VK-016`), `GaugeRing` (`VK-002`), `Donut` (`VK-007`) and the `CorrelationMatrix` strength-row encoding (`VK-009`).

### Visualized-vs-text map

| Datum (rich-card type) | Today (prototype) | Specced visual | Primitive |
|---|---|---|---|
| Chart Card — past trend + SIA projection (e.g. "sleep vs exercise") | hardcoded **segmented** `<polyline>` (orange solid + purple dashed + 2 green dots), 3 flat grid lines, `aria-hidden` | **micro `TrendChart`** — one continuous **curved** Living Line (orange actual) → **dashed-purple SIA projection** tail, green milestone dots, ≤25% area fade, drawn | `TrendChart` (`VK-006` / `VK-016`) |
| Goal Progress Card — mission % complete (e.g. 40%) | 48px ring stroked in the **domain colour** (data-ink defect), flat 2-tone, `aria-hidden`, no count-up | **inline `GaugeRing` (48px)** — arc-gradient **orange** fill (domain colour = identity ring/tag only), `--glow-orange-md`, inset track, center %, count-up | `GaugeRing` (`VK-002`) |
| Connection-Spotted Card — cross-domain correlation strength + direction | single bare **purple bar @72%**, no value/word/sign shown, colour-alone direction | **CorrelationMatrix-lite strength row** — purple strength bar **+ visible value + `+`/`−` glyph + word** (reinforcing/competing), per-pair rows | `CorrelationMatrix` strength-row encoding (`VK-009`) |
| Conversational-log confirmation — a logged value over recent days (opt., high-motivation) | not shown | **inline `Sparkline`** (7-pt micro Living Line, no axes/glow) beside the "✓ logged to [domain]" badge | `Sparkline` (`VK-001`) |
| Meal-Plan Card part-of-whole — macro split (cal share) | 4 flat macro pills only | **micro `Donut` (24px, no hub/glow)** beside the pills showing the protein/carb/fat *share* — only when the split is the point | `Donut` (`VK-007`) |
| Financial-summary rows (income / expenses / net) | 3 text rows | — (deliberately textual — 3 one-off scalars; the trend lives on Finance [30], reached via "view finances") | — |
| Workout-preview (name / exercises / duration) · meal name · message text · domain tags · timestamps · day separators | text + chips | — (deliberately textual — names, dates, identity labels carry no useful visual form; over-charting them is penalised) | — |

**Editorial hierarchy (calm, not maximal):** the *conversation* is the screen's focus; within any single bubble the embedded viz is the local focal point but is **micro** and **singular** (one per bubble). Across a scroll, charts are sparse punctuation — most SIA turns are pure text. Five possible inline forms, **never more than one per message**, most messages none — the opposite of a wall of charts.

### 1 · Chart Card — micro `TrendChart` (Living Line) — `S09-V01` → `TrendChart` (`VK-006` / `VK-016`)

Replace the hardcoded `<polyline>` in the Chart Card with a true **micro Living Line**: one **continuous, curved (monotone/Catmull-Rom), round-capped, round-joined** stroke that **draws itself** L→R, running orange `#FF5E00` (effort/past) → green `#34A853` (arrival) via `--grad-progress` **(mint)**, **green `#34A853` milestone dots (r=3px)** on the line, a `--grad-orange` **(mint)** area fade ≤25% top, and a **dashed-purple `#7F24FF` SIA-projection tail** (dash 4·2, §11 — the brand-sanctioned forecast colour, SIA-authored, *correct here*) continuing the same path. Card height stays ~112–120pt; `--stroke-base`→`--stroke-thin` scaled for the micro surface; **no glow** at this inline scale (a 32px glow would swamp a 120pt card — depth comes from the curve + area fade, not a halo).
- **Honesty fix (current defect):** the prototype's segmented polyline + flat decorative grid is replaced by a curved data path; **no-data ≠ zero** — an un-synced segment renders **ghosted/dashed**, distinct from a real low value; the projection is **hidden** until SIA has enough data (never a fabricated forecast). Title (orange-on-white chrome) + caption stay text.
- **Micro-interaction:** tap the card → deep-link (stack push) to the relevant feature screen (e.g. Intelligence [48] / the domain) where the full-size chart + scrub live — the chat keeps the micro view honest and light.
- **Motion:** draws itself `stroke-draw` `--dur-flow` 1200ms `--ease-flow`, staggered 120ms after the bubble text appears (per the screen's existing card-appear choreography); projection draws **after** the actual line; **never opacity-fades** (§8). `prefers-reduced-motion` → completed curved stroke at rest + green end/milestone dots + static dashed-purple tail.
- **A11y fix (current defect):** the chart is **no longer `aria-hidden`** — it carries an `aria-label` conveying the same value ("Sleep-vs-exercise trend, rising over 6 weeks, SIA projects continued improvement"); the rich card's existing `role="button"` label is extended, not replaced.
- **Data:** SIA-supplied series (actual points + `projection`); prototype mock today, real `chartCard.series` in build.

### 2 · Goal-Progress Card — inline `GaugeRing` (48px) — `S09-V02` → `GaugeRing` (`VK-002`)

Upgrade the 48px mission ring to a proper inline **`GaugeRing`**: **arc-following `--grad-orange` (mint) orange fill** (conic-mask — *not* a flat SVG `linearGradient`; ⚠️ angular-gradient trap), `--color-alpha-white-10` track over a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled recess, `--glow-orange-md` (~20px, **mint** — never the 32px hero glow on a 48px ring), 4px stroke, center % (`text-h2`-scaled), count-up 0→% `--dur-slow` 520ms `--ease-flow`; green `#34A853` fill at 100%/complete.
- **Brand fix (current defect — critical-adjacent):** the prototype strokes the ring in `domainToneClasses[domain].text` — **domain-colour-as-data-ink** on a bounded score. Corrected: the **progress arc is orange** (data ink, 60/30/10); the **domain colour stays identity-only** — on the surrounding domain tag chip and an optional thin domain accent ring behind the gauge, never on the progress fill. (The screen's Color Map row "Progress ring fill: [domain color]" must be revised to "orange fill; domain colour = identity ring/tag only.")
- **Micro-interaction:** tap the card → Goal Detail [14] (stack push).
- **States:** 0% → a **ghosted empty arc** (faint full track), not a degenerate collapsed disc; loading → skeleton arc with radial shimmer that **morphs** into the drawn fill; error → ghosted arc + the card's existing "retry" affordance.
- **A11y fix:** ring carries `aria-label` "[mission name], [N] percent complete"; **not** `aria-hidden`; the percent number beside the ring is the always-visible text equivalent (never colour/arc-alone).
- **Data:** `mission.progress` / `mission.name` / `mission.nextAction` (`mock.ts`).

### 3 · Connection-Spotted Card — correlation strength row — `S09-V03` → `CorrelationMatrix` strength-row encoding (`VK-009`)

This is the screen's signature insight surface. Replace the single bare 72%-width purple bar with the **`CorrelationMatrix` Tier-2 ranked-row encoding** (the legible, mobile-first half of `VK-009`), at **inline micro-scale** (no N×N grid in a bubble — the grid lives on Intelligence [48] / Reports, reached via "tell me more"). Each surfaced correlation renders as a **plain-language row**: description + a **strength bar** (`--color-royal-purple` fill over `--color-alpha-white-08` on `--track-inset`, width ∝ |strength|) + the **visible strength value** (e.g. "72%") + a **leading `+`/`−` glyph and direction word** ("reinforcing" / "competing"). One to three rows max; the orange "connection spotted" eyebrow stays as product chrome.
- **Purple is sanctioned here (register):** the correlation is SIA-computed, so reinforcing ink = `--color-royal-purple` per `_shared-patterns.md` (the AI-register strength colour) — this is the Intelligence-[48] purple register applied in-bubble, **not** the orange Product-Mode `CorrelationMatrix` used on Reports [78]. Competing/inverse direction uses a **desaturated cool tint** (sleep-blue family, low chroma), never purple-as-decoration. Domain tag chips on the row use `--color-domain-*` for **identity only**.
- **A11y fix (current defect — colour-alone violation):** the prototype conveys strength by **bar width alone** and direction by **colour alone**, with no value/word/sign and no `aria-label`. Corrected: **triple-encoded direction** — (1) a visible **`+`/`−` glyph**, (2) the **direction word**, (3) the directional tint — any one alone is grayscale/colour-blind safe; the **strength value is always shown numerically** beside the bar; the row carries an `aria-label` "[Domain A] and [Domain B]: +72%, reinforcing, strong" and is the ≥44×44pt tap target deep-linking to "tell me more".
- **Honesty:** strength bars share one 0–100% scale (no per-row re-normalisation); a near-zero correlation reads as a muted short bar, an un-computed pair is **omitted** (never a phantom full bar).
- **Motion:** strength bar rises 0→target `--dur-slow` 520ms `--ease-flow` after the bubble lands; tap → tooltip/deep-link `--dur-fast` 160ms. Reduced-motion → bar at final width, static.
- **Data:** SIA correlation output (`connectionCard.pairs[]` in build; mock today).

### 4 · Conversational-log micro-`Sparkline` (optional, high-motivation) — `S09-V04` → `Sparkline` (`VK-001`)

On a conversational-log confirmation ("✓ logged to [domain]"), **high-motivation tier only**, a tiny **`Sparkline`** (a 7-point micro Living Line, `--stroke-thin` 2px orange, curved, 48×16, **no axes / no grid / no glow**, green `#34A853` end dot when the latest log is a new high) may sit beside the green logged-badge to show the recent trajectory of *that* metric. Low/medium motivation → omitted (restraint; a gentler confirmation per the Motivation Adaptation block). It never appears on the same bubble as another viz (one-per-bubble rule).
- **Motion:** draws on appear `--dur-slow` 520ms `--ease-flow`; reduced-motion → completed stroke + end dot.
- **A11y:** `aria-label` "recent [metric] trend, latest is a new high"; the logged value text is the always-present equivalent.
- **Data:** the logged domain's trailing 7 points (`mock.ts`).

### 5 · Meal-Plan micro-`Donut` (part-of-whole, optional) — `S09-V05` → `Donut` (`VK-007`)

When a Meal-Plan Card's *point* is the **macro split** (not just absolute grams), a **24px micro `Donut`** (`VK-007` micro variant — **no hub, no glow** at this scale) may sit beside the macro pills, slices = protein / carb / fat by **calorie share**: **largest slice = `--color-brand-orange`**, remainder = warm neutral tints (`--color-alpha-white-40/-20`), 2px gap, rounded caps, slices summing to a **true logged-calorie whole** (never padded). If the card is just confirming a logged meal (no comparison intent), the donut is **omitted** — the four pills are the honest, restrained form. Never rainbow (one-hue-per-macro = a 60/30/10 violation + competitor clone); never purple (not SIA-originated).
- **A11y:** `aria-label` "Protein 30%, carbs 45%, fat 25% of 520 calories"; the macro pills are the visible in-situ legend (never colour-alone); load-bearing slice boundaries ≥ 3:1.
- **Motion:** arcs sweep clockwise from 12 o'clock, largest→smallest, `stroke-draw` `--dur-flow`; reduced-motion → full arcs at rest.
- **Data:** `meal.protein/carbs/fat/calories` (`mock.ts`).

### Motion choreography (entrance — bubble-first, then its one guest viz)

Per `CONSISTENCY.md` and the screen's existing Motion table: the **message bubble appears first** (fade + translateY, 280ms `--ease-out-soft`) → **then** its single embedded viz animates **120ms later** (the existing card-appear stagger): a Chart-Card **Living Line draws itself** L→R (1200ms `stroke-draw`, projection drawing last) · a Goal-Card `GaugeRing` fills 0→% (520ms `--ease-flow`) + center count-up · a Connection-Card strength bar rises 0→target (520ms) · a `Sparkline` draws (520ms) · a `Donut` sweeps largest→smallest. **One line motif per bubble** (§8); inline charts only animate when the bubble enters view (the inverted FlatList means below-viewport bubbles animate on scroll-into-view). Proactive SIA messages keep their existing slide-up-bounce (520ms `--ease-flow`); the embedded viz draws after the bounce settles. `prefers-reduced-motion` → every inline chart at final state instantly (curved stroke + end/milestone dots, filled arc, final bar width, full donut), and per the screen's a11y block the proactive bounce / chip fly / auto-scroll are already skipped.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — the proactive greeting card may embed at most one micro viz; if SIA lacks data, the card stays **text + chips** (no degenerate empty ring/flat-line ever renders in a bubble); **loading** — each card uses the screen's existing skeleton-shimmer shell, but the shimmer **morphs into drawn data** (arc/line/bar visible mid-draw, never a blank disc) and the Living Line / gauge arrive drawn, not swapped; **partial** — an un-synced trend segment is **ghosted/dashed** (≠ a real low value), a 0% gauge is a **ghosted arc** (≠ collapsed disc), an un-computed correlation pair is **omitted**; **error** — the card's existing "couldn't load this content" + orange "retry" applies per-card (the chart-specific failure is honest about *which* card failed, the conversation around it stays intact); **offline** — the existing "SIA needs a connection" banner; cards already rendered keep their final drawn state.
- **60/30/10 + register:** chat **chrome is orange-dominant** (chips, links, send, tab, eyebrow, Chart-Card title, gauge **progress fill**); **green** = arrival/milestone only (milestone dots, gauge at 100%, "✓ logged" badge, sparkline new-high end dot); **purple is the sanctioned SIA register on SIA-authored inline charts only** — the **dashed-purple projection** (§11) and the **Connection-Card correlation strength ink** (`_shared-patterns.md` line 49) — it never repaints chrome or user-effort data ink. **Domain colours = identity only** (tag chips, an optional domain ring behind the gauge, correlation-row domain icons) — **never the gauge progress fill** (the current domain-stroke ring is the one live brand defect this section corrects). Glow uses the size-stepped scale — **none** on any inline viz (micro scale; warm depth = curve + area-fade + inset track, not a halo).
- **Non-shaming (ethical gate):** a correlation is framed as a coaching connection ("X follows Y"), **never** a verdict; a low mission % reads as "room to move," never failure; the SIA projection is an *invitation*, never a loss-aversion countdown; conversational-log confirmations celebrate the log, and the optional sparkline frames momentum, never a broken streak.
- **Accessibility:** **every inline chart carries a text/`aria-label` equivalent** conveying the same value (fixing the current `aria-hidden` MiniLineChart + MiniProgressRing); **never colour-alone** — gauge band/status via visible %+glyph, correlation direction via visible `+/−` glyph + word (fixing the current colour-only purple bar), milestone dots paired with their value in the label; label/value contrast ≥ **4.5:1** on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the Living-Line stroke, gauge arc + filled/unfilled boundary, milestone/end dots, strength-bar fill, and donut slice boundaries all meet ≥ **3:1** vs the `ink-brown-800` card (the Chart Card's white/10 grid lines are decorative and should be dropped, not relied on); interactive card / correlation-row targets ≥ **44×44pt** (per finding B04-F07); `prefers-reduced-motion` renders all at final state with the Living-Line static form preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Granola / Arc + Bevel (AI presence; AI-Mode purple sanctioned) — *stays Balencia via warm-glow chat surfaces on ink-brown, draw-not-fade micro-visualizations, and the continuous-orange message rhythm, never a flat message list or cold chat UI.*

**Pre-grade:** A− (87) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): The chat's IA and motion are strong, and the inline visualizations are well-scoped; the gaps are (1) chat bubbles and cards are flat ink-brown-800 surfaces without the top-edge highlight and layered depth throughout the screen; (2) the five inline-viz types (`TrendChart`, `GaugeRing`, `CorrelationMatrix`, `Sparkline`, `Donut`) carry no explicit entrance choreography or reduced-motion frames in the Components section; (3) edge microcopy for loading/empty/error states is partly unauthored; (4) the Type table mixes ad-hoc sizes with the locked scale; (5) a contradiction exists between the Visualization section's purple "SIA register" (`_shared-patterns.md` line 49) rule and the Color Map's incomplete token references; (6) contrast pairs are asserted, not tabulated.

### Focal hierarchy

One focal point: the **latest SIA message or rich inline card** — whichever the user just read, sized and colored to be the visual anchor above the fold. When the chat opens (Day 1), the **proactive greeting card** is the focal element (24pt padding, warm-glow backplate, 2-line SIA message). On an established chat, focus lands on the most recent message in the visible area. The input bar anchors the bottom (always present, unambiguous "what to do"). Suggestion chips below the focal message are visibly secondary (36pt height, orange border, no glow). Day separators and older messages fade in importance as the eye trails down. The screen's rhythm is conversational, not card-grid — no focal competitor emerges. Squint test: you see a message bubble (left, warm-tinted), user response (right, orange tint), and the clear input affordance at the bottom.

### Surface & depth

Every chat surface adopts the **`CK-P1` Layered Warm Surface** — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`CK-T01` `--edge-highlight` top-edge highlight** (the not-flat cue, previously absent on all chat cards) · `--shadow-1`. This applies to: SIA message bubbles, user message bubbles, rich inline cards (chart cards, goal-progress cards, connection-spotted cards, meal-plan cards, financial-summary cards, workout-preview cards), and the chat input bar body. The top bar (when scrolled) gains a `backdrop-blur(16px)` overlay (ink-900 at 80%) — a depth cue that lifts the bar as content scrolls beneath it.

**Glow is calibrated by element size per `CONSISTENCY.md §1`:** no glow on any inline-viz (inline scale <36px); the rich inline cards themselves (48–96pt range) carry no glow either (cards are supported by their layered surface + edge-highlight, not a halo). User message bubbles are right-aligned, `--color-brand-orange` at 15% background, no glow. SIA message bubbles carry no glow in Product Mode (glow is SIA-only in SIA-authored viz inside bubbles, not on the chat chrome). The one exception: if a "connection spotted" eyebrow appears inline, it stays orange (product chrome label), and the correlation **strength bars inside that card** use the **sanctioned purple register** per `_shared-patterns.md` line 49 (SIA-authored data ink, not chrome).

Tracks recess over `--track-inset` (`rgba(0,0,0,0.28)`) on all inline gauge rings and progress bars. The input field uses `--color-ink-brown-800` body with a 1pt `--color-alpha-white-10` border (no glow). The SIA Thinking Indicator bubble preserves the same bubble depth as a text message. The Day Separator is flat text (no card, no background).

### Typographic rhythm

Re-map the Typography table to `CK-P3` locked tokens: SIA message text, user message text `--text-body` (16px, raised from the current 15px) · `--leading-normal` (1.4) · 400 weight. Top bar "SIA" title `--text-h3` (17pt) · `--leading-snug` (1.25) · 600 weight. Suggestion chips `--text-caption` (13pt) · `--leading-normal` · 600 weight. Rich card title `--text-h3` (17pt) / body `--text-body` (16px) · `--leading-normal`. Day separator `--text-small` (11pt) · `--leading-normal` · `--color-alpha-white-30`. "Connection spotted" eyebrow `.eyebrow` recipe (`--text-eyebrow` 12pt / 600 weight / `--tracking-eyebrow` +0.12em / uppercase / `--color-brand-orange`). Input hint text `--text-body` (16px) · `--leading-normal` · `--color-alpha-white-30`. Stat figures in inline-viz (ring percentages, sparkline counts) use tabular-nums. No exclamation marks anywhere. The brand period used with intent on the "SIA" title wordmark once per screen, not scattered.

### Microcopy (before → after)

Every string authored to `CK-P5` voice (warm, plain, coaching, non-shaming):

- **SIA greeting (Day 1, cold-start)** — *before:* "Hi [Name]" → *after:* "Good morning, [Name]. What's on your mind today." (warm, curious, opens the conversation)
- **Suggestion chip fallback** — *before:* "something else" → *after:* "ask something else" (clear, action-oriented)
- **Input hint text** — *before (current):* "message SIA" (already on-voice, kept as-is)
- **Chart loading** — *before:* "Loading..." → *after:* "SIA is reading your week — one moment." (calm, specific, warm)
- **Rich card error state** — *before (unspecified):* "Couldn't load" → *after:* "Couldn't load this insight. Pull to refresh." (honest, recovery affordance)
- **Empty/Day-1 activity feed** — *before (implied blank):* → *after:* "No insights yet. SIA will surface connections as your data arrives." (anticipatory, not empty-sad)
- **Conversational logging confirmation** — *before:* "logged" → *after:* "✓ logged to [domain]" (warm, confirming, domain-tagged)
- **Connection-spotted eyebrow** — *before:* "CONNECTION SPOTTED" → *after:* "Connection spotted" (sentence case, orange, not all-caps)
- **Chat search hint** — *before (from Components):* "search conversations..." → *after:* "Find a message" (concise, warm)
- **"View [feature]" CTA on rich cards** — *before (unspecified):* → *after:* "view this" or "tell me more" (warm, actionable, orange)
- **Proactive message framing (non-shaming)** — if SIA surfaces a low metric or a skip ("You haven't exercised in 3 days"), the message frames it as a constructive observation ("Exercise paused — let's ease back in"), never a verdict.
- **Permission rationale** — "We'll record only what you say. You control the transcript." (why we ask · what you gain)

No filler; no "Success!"; no generic SIA horoscopes; SIA strings stay specific to the user's own data and recent activity.

### Motion choreography

Locked to `CK-P4` order (hero draws first, then support rises, then numbers count):

1. **Message bubble entrance** (`--dur-base` 280ms `--ease-out-soft`): SIA or user bubble fades in + translateY(12→0) simultaneously.
2. **Rich inline card entrance** (staggered 120ms after the bubble text lands, `--dur-base` 280ms `--ease-out-soft`): card fades in + translateY(12→0).
3. **Inline-viz draw choreography** (inside the card, `--dur-slow` 520ms `--ease-flow`):
   - **`TrendChart` (Living Line)**: polygon draws itself (curved, orange solid → green milestone dots arrive as the line progresses) → dashed-purple projection tail draws last. No opacity-fade; the curved stroke is the draw (§8).
   - **`GaugeRing` (48px)**: arc fills 0→current% over the track background, gradient flowing via `--grad-orange`, center count-up number animates 0→% simultaneously. `--glow-orange-md` (~20px) reaches full opacity with the arc fill.
   - **`CorrelationMatrix` strength row**: strength bar rises 0→target width, direction word and glyph appear when the bar settles, value number fades in alongside.
   - **`Sparkline` (if present)**: 7-pt curve draws L→R, green end dot appears at the final point.
   - **`Donut` (24px, if present)**: slices sweep clockwise largest→smallest, rounded caps close.
4. **Suggestion chips** (below the card, 80ms stagger, `--dur-base` 280ms): each chip fades in + slides left-to-right (translateX −12→0).
5. **Input bar** (already on-screen, no entrance animation on mount; crossfades on send/mic button swap — 160ms `--dur-fast`).

**Proactive message entry** (SIA-initiated greeting on open): bubble slides up from bottom with a 40ms bounce settle (the brand's "energize without urgency" motif), then the viz inside draws.

**Reduced-motion:** `prefers-reduced-motion` → all messages appear instantly at final state; Living Lines rendered fully drawn + green end dots present; gauge rings at final fill + number at final value; strength bars at final width; sparklines completed; donuts fully swept; chips visible in place (no slide), no proactive bounce, no suggestion-chip fly. Loops off (the SIA Thinking Indicator's pulsing dots become static).

**Below-fold visuals** (scroll into view): inline-viz animate on scroll-into-view, same draw choreography (one per bubble, never simultaneous). Day separators fade in on scroll.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1** | proactive greeting card (no rich viz on Day 1), 1-2 suggestion chips, no message history visible above | "Good morning, [Name]. What's on your mind today." + mood chips (optional); no filler in SIA voice | greeting card uses `CK-T02` `--surface-backplate`; never a blank screen or skeleton |
| **Loading (SIA response)** | SIA Thinking Indicator (bubble with 3 pulsing dots) appears below user message; dots animate 40%→100% opacity, staggered 200ms | "SIA is thinking..." (if >2 seconds); "SIA is thinking deeper..." (if >5 seconds) | dots are `--color-alpha-white-40`, sequential pulse, loop on `prefers-reduced-motion` off |
| **Empty / partial** | if a rich-card data fetch fails partway, the card shows "Couldn't load this insight. Pull to refresh." + the non-failed portion (such as the message text) remains visible; no degenerate empty chart/ring renders in the bubble | per-card error message, warm + recovery affordance | no-data ≠ zero (a trend with un-synced segment renders ghosted/dashed, not a flat line) |
| **Error (message send fails)** | user bubble shows a red (`--color-error-red`) left border (2pt), error icon (⚠, 12pt) left of text, "not sent" label (11pt, `--color-alpha-white-50`) below the bubble; bubble remains in chat | "Not sent — try again"; if network down, "You're offline. Will retry when you're back." | calibrated-red only for genuine operational failure; glyph + word paired (never colour-alone) |
| **Offline** | banner below top bar (36pt, `--color-ink-brown-800`, centered): "SIA needs a connection to chat." (14pt, `--color-alpha-white-50`); input field disabled (0.5 opacity + "offline" reason hint); existing chat history cached and visible | "You're offline. Messages sent when you're back." | actions honestly dimmed; no urgency tone |

### Signature & anti-generic

**Ownable moment:** The **continuous-orange message rhythm** — the alternation of left-aligned (SIA, warm `--color-ink-brown-800`) and right-aligned (user, warm orange tint) bubbles creates a natural conversational cadence. This rhythm, paired with the **draw-not-fade inline-visualizations inside SIA bubbles** (Living Lines curve, gauges fill, strength bars rise), is unmistakably Balencia — not a generic chat UI or a flat messenger clone. The **warm-glow-on-ink surfaces** (the `CK-T01` + `--shadow-1` recipe on every card) and the **purple earned in SIA-authored data ink only** (not chrome) reinforce that this is a coached conversation, not a transaction. Anti-generic fixes: (1) suggestion chips are genuine suggested responses (not a generic "options" row), contextually adapted to the conversation and the user's motivation tier; (2) the inline-viz are purposeful and sparse (one per message maximum, most messages text-only), never a "max out the dashboard" approach; (3) the scroll behavior (inverted FlatList, newest at bottom, pull-down loads older) mirrors iMessage, establishing familiarity while the inline chart depth signals premium intelligence; (4) the SIA avatar only re-appears on the first bubble in a consecutive group, reducing visual clutter and keeping focus on the message.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
- SIA message `--color-alpha-white-100` (≥12:1 on `--color-ink-brown-800`, ≥17:1 on `--color-ink-900`)
- User message `--color-alpha-white-100` (≥3:1 on `--color-brand-orange` 15% bg + white text)
- "Connection spotted" eyebrow `--color-brand-orange` (≥3:1 on `--color-ink-brown-800`, WCAG 1.4.11)
- Correlation strength value `--color-brand-orange` on `--color-royal-purple` bar (≥3:1 fill vs track, load-bearing)
- Suggestion chip `--color-brand-orange` text + border (≥3:1 on `--color-ink-brown-800`, load-bearing)
- Top bar "SIA" title `--color-alpha-white-100` (≥12:1)
- Day separator `--color-alpha-white-30` (≥4.5:1, decorative label paired with position — not load-bearing)

**Status never colour-alone:** Direction on correlation rows = visible `+`/`−` glyph + direction word ("reinforcing" / "competing") + colour tint (never colour encoding alone). Strength value always shown numerically. Gauge ring % always shown as text + visible number, not arc-alone.

**Interactive elements:**
- All tappable cards, chips, mic button, send button ≥44×44pt (the spec defines 44pt touch targets for search icon + voice icon in the top bar; the rich card and mic button carry the same standard).
- Mic button: 36pt circle, lives inside the 52pt input bar with a 44pt hit box (4pt inset ring offset).
- Send button: 36pt circle, same layout.
- Rich card: full-width card ≥44pt tall.
- Suggestion chip: 36pt height ≥44pt wide per chip.
- Focus-visible standardized to `CK-T03` `--focus-ring` (2pt `--color-brand-orange`, 2pt offset) across every interactive element (voice icon, search icon, mic button, send button, cards, chips, links).

**Inline-viz a11y:**
- Every `TrendChart` carries `aria-label` describing the trend and projection direction: "Sleep-versus-exercise trend, rising over 6 weeks. SIA projects continued improvement."
- Every `GaugeRing` carries `aria-label` and the % text is always visible (never arc-alone): "[mission name], 68% complete."
- `CorrelationMatrix` strength rows carry `aria-label`: "[domain A] and [domain B], 72% reinforcing correlation, strong."
- `Sparkline` carries `aria-label`: "Recent [metric] trend, latest is a new high."
- `Donut` carries `aria-label` with macro shares: "Protein 30%, carbs 45%, fat 25% of 520 calories."

**Reduced-motion** (`prefers-reduced-motion`): Living Lines render fully drawn (curved stroke, no opacity-fade), end/milestone dots present; gauge rings at final fill, number at final value; strength bars at final width; sparklines completed with end dot; donuts fully swept; proactive message at final position (no bounce), suggestion chips instant (no slide), SIA Thinking dots static (no pulse), loops off.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | Full-bleed dark |
| Top bar bg | #0A0A0F (80% + blur) | ink-900 at 80% | On scroll |
| Top bar border | rgba(255,255,255,0.05) | white at 5% | Bottom edge |
| Top bar title | #FFFFFF | white | "SIA" |
| Voice icon | rgba(255,255,255,0.5) | white at 50% | De-emphasized |
| SIA bubble bg | #211008 | ink-brown-800 | From [07] |
| SIA bubble border | rgba(255,255,255,0.08) | white at 8% | From [07] |
| SIA avatar bg | #FF5E00 | brand-orange | SIA identity |
| SIA avatar glow | rgba(127,36,255,0.2) | brand-purple at 20% | AI indicator |
| User bubble bg | rgba(255,94,0,0.15) | brand-orange at 15% | From [07] |
| Rich card bg | #211008 | ink-brown-800 | Surface |
| Rich card border | rgba(255,255,255,0.08) | white at 8% | Subtle |
| Chart line (past) | #FF5E00 | brand-orange | User data |
| Chart line (projected) | #7F24FF (dashed) | brand-purple | AI projection |
| Chart milestone dots | #34A853 | brand-green | Milestones |
| Goal-progress GaugeRing fill | #FF5E00 | brand-orange | Progress arc = orange data ink (60/30/10); domain colour = identity only (tag chip / optional thin accent ring behind the gauge), never the progress fill — see Visualization S09-V02 |
| "connection spotted" | #FF5E00 | brand-orange | Eyebrow |
| "view [feature]" link | #FF5E00 | brand-orange | Navigation |
| Suggestion chip border | rgba(255,94,0,0.3) | brand-orange at 30% | From [07] |
| Suggestion chip text | #FF5E00 | brand-orange | From [07] |
| Input bar bg | #211008 | ink-brown-800 | Surface |
| Input bar border | rgba(255,255,255,0.1) | white at 10% | Subtle |
| Mic button bg | #211008 | ink-brown-800 | De-emphasized when empty |
| Mic button icon | rgba(255,255,255,0.6) | white at 60% | Clear but secondary |
| Send button bg | #FF5E00 | brand-orange | Active when text present |
| Send button icon | #FFFFFF | white | Arrow-up |
| Day separator text | rgba(255,255,255,0.3) | white at 30% | Ambient |
| Day separator line | rgba(255,255,255,0.05) | white at 5% | Barely visible |
| Thinking dots | rgba(255,255,255,0.4) | white at 40% | Pulsing |
| Tab bar active | #FF5E00 | brand-orange | SIA tab |
| Tab bar inactive | rgba(255,255,255,0.6) | white at 60% | Other tabs |

**60/30/10 verification**: Orange dominates data ink — send button, suggestion chips, "connection spotted" eyebrow, "view" links, Chart-Card title, Chart-Card actual (past) Living Line, the Goal-Progress GaugeRing **progress fill**, SIA avatar, active tab indicator. Green = arrival/milestone only — chart milestone dots, gauge at 100%/complete, "✓ logged" badge, sparkline new-high end dot. Purple is the sanctioned SIA register on SIA-authored inline charts only — the dashed-purple projection tail (§11) and the Connection-Card correlation strength ink (cite `_shared-patterns.md` line 49) — and never repaints chrome or user-effort data ink. Domain colours = **identity only** (inline tags, an optional thin accent ring behind the gauge, correlation-row domain icons) — **never** the gauge progress fill. Ratio holds across a typical conversation view.

---

## Interaction States

### Rich Inline Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white 8% border, card content | — |
| Pressed | Entire card: scale(0.98), border brightens to white 15%, subtle shadow appears | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer (gradient sweep left→right across card surface, 1200ms loop) | — |
| Error | "couldn't load this content" text, white at 40%, retry link in orange | Error notification |

### Mic Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (text empty) | ink-brown-800 bg, white 10% border, white mic icon at 60% | — |
| Pressed (quick tap) | Scale(0.9), bg fills orange at 20% | Light impact |
| Long-press (500ms+) | Button grows to 44pt, orange glow radiates outward, haptic ramp. Releases into full-screen voice mode [11]. | Heavy impact (ramp) |
| Active (in-chat voice mode) | Orange bg, white mic icon, pulsing glow — this state is on Screen [10] | — |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (visible) | Orange circle, white arrow-up | — |
| Pressed | Scale(0.9), darker orange | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Voice Icon (Top Bar)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Waveform icon, white at 50% | — |
| Pressed | Scale(0.9), white at 80% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### SIA Message Bubble
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard bubble | — |
| Long-pressed | Bubble bg lightens, copy menu appears above (z-60) | Medium impact |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | SIA tab (tab bar) | Navigate to this screen |
| Tap | Suggestion chip | Send as user message |
| Tap | Input field | Focus + raise keyboard |
| Tap | Send button | Submit message |
| Tap (quick) | Mic button | Switch to in-chat voice mode [10] |
| Long-press (500ms+) | Mic button | Transition to full-screen voice mode [11] |
| Tap | Rich inline card | Navigate to relevant feature screen (stack push) |
| Tap | "view [feature]" link | Navigate to feature screen |
| Tap | Voice icon (top bar) | Transition to full-screen voice mode [11] |
| Long-press | Any message bubble | Copy text menu |
| Pull down | Past first message | Load older message history |
| Scroll | Chat area | Scroll through messages |
| Tap | Outside input (keyboard up) | Dismiss keyboard |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| SIA message appear | New message | Bubble fades in from bottom (translateY 8→0, opacity 0→1) | 280ms (--dur-base) | ease-out-soft |
| User message send | Send tap | Text slides up from input into user bubble position, input clears | 280ms (--dur-base) | ease-out-soft |
| Rich card appear | After SIA message | Card fades in (opacity 0→1, translateY 12→0), staggered 120ms after the text message | 280ms (--dur-base) | ease-out-soft |
| Suggestion chips appear | After SIA message/card | Chips fade in staggered (80ms apart), slide in from left (translateX -12→0) | 280ms each (--dur-base) | ease-out-soft |
| Chip selection | Tap | Chip fills orange, scales down, content flies up to user message area | 280ms (--dur-base) | ease-out-soft |
| SIA thinking dots | Waiting | Three dots sequential pulse (opacity 30%→100%), staggered 200ms, loops | Continuous | ease-in-out |
| Send/mic crossfade | Text entered/cleared | Current button scales to 0, new button scales from 0. 160ms crossfade. | 160ms (--dur-fast) | ease-out-soft |
| Rich card skeleton | Loading | Gradient shimmer sweeps left→right across card | 1200ms loop | linear |
| Top bar blur | Scroll past 12pt | backdrop-blur fades in, bottom border opacity 0→5% | 160ms (--dur-fast) | ease-out-soft |
| Proactive message | SIA initiates | Bubble slides up from bottom with a slight bounce, attention-grabbing | 520ms (--dur-slow) | ease-flow |
| Auto-scroll | New message arrives | Chat area smooth-scrolls to bottom | 280ms (--dur-base) | ease-out-soft |
| Pull-to-load spinner | Pull down | Spinner fades in, rotates while loading | Continuous while loading | linear (rotation) |

**Screen transition**:
- **Enter (tab switch)**: Crossfade, 280ms (--dur-base)
- **Enter (from other screen)**: Stack pop (slide from left)
- **Exit to feature screen**: Stack push (slide from right), 280ms
- **Exit to full-screen voice**: Modal present (slide up from bottom), 520ms

---

## Empty States

### Day 1 (first use)
SIA initiates the conversation — the chat is never empty. On first visit after onboarding, SIA sends a proactive greeting:

1. "Welcome home, [Name]. Your plan is live."
2. "Here's what I'd focus on today."
3. [Rich inline card: Today's top 2-3 actions with domain tags]
4. [Suggestion chips: "sounds good", "show my goals", "let's adjust"]

The screen immediately feels alive and purposeful. No "start a conversation" empty placeholder.

### Returning user (no new messages)
The chat shows the most recent conversation. No empty state — the history is always present. If the user hasn't chatted in a while, SIA sends a proactive "welcome back" message when they open the tab:
- "Hey [Name]. It's been a few days. Want to catch up?"
- [Suggestion chips: "what did I miss?", "let's get back on track", "just browsing"]

### Offline
A banner appears below the top bar: "SIA needs a connection to chat." (14pt Sora Regular, white at 50%). Banner: full-width, 36pt, ink-brown-800 bg, centered text. Input bar disabled.

---

## Motivation Adaptation

- **Low motivation**: SIA sends shorter, gentler messages. Fewer suggestion chips (2-3 instead of 4-5). Rich cards show simple summaries, not detailed data. Tone: "One small thing today?" rather than a full action list.
- **Medium motivation**: Default experience. 3-5 suggestion chips. Mix of text and rich cards. Balanced coaching tone.
- **High motivation**: SIA includes more data in messages (percentages, trends). Rich cards are more detailed (charts with longer time ranges, more actions listed). Suggestion chips include data-oriented options ("show my stats", "compare this week"). Tone: direct and data-forward.

---

## Conversational Logging

Users can log activities conversationally without navigating to domain dashboards:
- "I did 30 min yoga" → SIA confirms logging to Fitness, shows brief XP earned toast
- "I spent $45 on lunch" → SIA logs to Finance, asks if it should be budgeted
- "I prayed 5 times today" → SIA logs to Spirituality, acknowledges the streak

SIA's confirmation appears as a standard SIA message with an inline "logged" badge (12pt, green, --r-sm corners, "✓ logged to [domain]" with domain color text).

---

## Chat Search Overlay

### Search Trigger
- **Icon**: Search icon (magnifying glass, 20pt, white at 50%) added to the top bar, positioned left of the voice mode icon, 44x44pt touch target.
- **Top bar updated**: "SIA" (left) + search icon + voice icon (right)

### Search Overlay State
- **Trigger**: Tap search icon in top bar
- **Presentation**: Search bar slides down from top bar, replacing the "SIA" title area. Chat content remains visible but dimmed (40% overlay).
- **Search bar**: Full-width minus 32pt (16pt margins), 44pt tall, ink-brown-800 bg, --r-md (14pt) radius, 1pt white at 10% border (2pt orange when focused). Left: search icon (16pt, white at 40%). Right: "cancel" text button (15pt Sora Regular, orange, 44pt touch target). Placeholder: "search conversations..." (15pt Sora Regular, white at 40%).
- **Auto-focus**: Keyboard raises immediately on overlay open.

### Search Results
- **Layout**: Results replace the dimmed chat area. FlatList of matching messages.
- **Result row**: 72pt height. Content: message preview text (15pt Sora Regular, white, keyword highlighted in orange bold), sender label ("SIA" or "you" in 12pt Semibold, white at 40%), date (12pt Regular, white at 40%, right-aligned). Divider: 1pt white at 5%.
- **Tap result**: Dismisses search overlay, scrolls chat to the matched message, briefly highlights the message bubble (orange at 8% bg flash, 600ms fade-out).
- **No results**: Centered text: "no messages found" (15pt Sora Regular, white at 40%).
- **Date grouping**: Results grouped by date with sticky Date Group Headers (same as notification history pattern from Screen 24).

### Dismiss
- Tap "cancel" text button → search overlay slides up, chat returns to normal
- Swipe down on search bar → same dismiss behavior
- Keyboard dismiss does NOT close the overlay (user may want to browse results)

### Motion
| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Search bar | Open | Slide down from top bar + fade in | 280ms | ease-out-soft |
| Search bar | Close | Slide up + fade out | 280ms | ease-out-soft |
| Chat dimming | Open/close | Opacity 100% to 40% / reverse | 280ms | ease-out-soft |
| Message highlight | Tap result | Orange 8% bg flash, then fade out | 600ms | ease-out-soft |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| SIA response generation fails | Thinking indicator stops after 10 seconds; SIA bubble: "Something went wrong. Let me try again." with "retry" suggestion chip | Tap "retry" chip re-sends the last user message |
| Message send fails | User bubble shows error indicator (red exclamation circle, 16pt, left of bubble for user messages) + "not sent" label (11pt, #f44336); bubble remains in chat | Tap failed bubble shows "retry / delete" action menu |
| Rich inline card data fails to load | Card shows skeleton shimmer briefly, then "couldn't load this content" (15pt Regular, white at 40%, centered) + "retry" link in orange | Tap "retry" re-fetches card data |
| Network offline | Banner below top bar: "SIA needs a connection to chat." (14pt Sora Regular, white at 50%, full-width, 36pt, ink-brown-800 bg, centered); input bar disabled; existing chat history visible | Banner auto-dismisses when connection restores; input re-enables |
| Pull-to-load older messages fails | Pull-to-load spinner stops; brief inline text: "Could not load messages" (12pt, white at 30%, centered); spinner disappears | User pulls down again to retry |
| Conversational logging fails | SIA message: "I couldn't log that. Want to try again?" with "retry" and "skip" suggestion chips; no XP toast appears | Tap "retry" re-attempts the log; "skip" continues conversation |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- Screen reader announces "SIA chat" on tab focus as the screen identity
- Focus order: Top bar (SIA title, search icon, voice icon) -> Chat messages (oldest to newest in reading order) -> Suggestion chips (left to right) -> Chat input field -> Mic/Send button -> Tab bar
- SIA messages: accessible role "text"; prefixed with "SIA:" for screen reader context
- User messages: accessible role "text"; prefixed with "You:" for screen reader context
- Rich inline cards: accessible role "button"; label describes content type and key data (e.g., "Sleep versus exercise chart. Double tap to view details.")
- Suggestion chips: accessible role "button"; hint "Double tap to send as your message"
- Mic button: accessible label "Voice input. Tap for in-chat voice. Long press for full-screen voice."
- Send button: accessible label "Send message"; only focusable when visible
- Day separators: accessible role "heading" at level 3; announced as date text
- "connection spotted" eyebrow on SIA messages: included in the message accessible label
- Search overlay: focus traps within overlay when open; "cancel" returns focus to top bar
- Reduced motion: skip proactive message bounce, chip fly animation, and auto-scroll; show elements in place immediately

---

## Cross-References

- **Navigates to**: Screen [10] — SIA Voice In-Chat via UI state change (mic tap), Screen [11] — SIA Voice Full-Screen (Batch 3) via modal present (mic long-press or voice icon tap), Screen [26-36] — Domain Dashboards via rich card taps (Batch 6-8), Screen [12] — Home Screen via Today tab, Screen [13] — Goals List via Goals tab, Screen [14] — Goal Detail via goal progress card tap
- **Navigates from**: Bottom tab bar (SIA tab), Screen [12] — Home Screen (SIA greeting card tap), any "Ask SIA" shortcut throughout the app
- **Shared components with**: Screen [07] — SIA Onboarding (SIA Message Bubble, User Message Bubble, Suggestion Chip Row, Chat Input Bar, SIA Avatar Small), Screen [10] — SIA Voice In-Chat (shares the chat view, only input area changes), Screen [12] — Home Screen (Batch 3, SIA Greeting Card adapted from SIA message pattern), Screen [24] — Notification History (Date Group Header for search results)
- **Patterns used**: SIA Message Bubble, User Message Bubble, Suggestion Chip Row, Chat Input Bar, SIA Avatar (Small), Domain Tag Chip, Bottom Tab Bar — all from Screen [07] and shared patterns
- **Patterns established**: **Rich Inline Card** — ink-brown-800 bg, --r-xl corners, white 8% border, embeds charts/progress/summaries within conversation flow, tappable for navigation. **Chat Input Bar with Mic** — extends Chat Input Bar with mic button (tap → voice mode, long-press → immersive voice), mic/send crossfade on text entry. **SIA Thinking Indicator** — 3 pulsing dots in a SIA bubble, sequential animation. **Day Separator** — centered date text with horizontal rules. **Proactive Message Entry** — SIA-initiated messages slide up with bounce, distinct from response messages. **Connection Spotted Variant** — SIA bubble with orange eyebrow header, indicates cross-domain insight. **Conversational Logging Confirmation** — green "logged" badge inline with SIA's confirmation. **Chat Search Overlay** — search bar slides down from top bar, results show matching messages grouped by date with keyword highlighting. Tap result scrolls to and highlights the message in the chat. Reusable for any chat-based search.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-04.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U02`
**Prototype route**: `/tabs/sia`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q10 guest preview may remain a clearly labeled preview/demo entry form.
- Q11 SIA onboarding only needs enough interactivity to reach Initial plan.
- Q12 voice-inline can remain a QA route but production should treat it as SIA chat state.
- Q13 voice privacy requires permission, consent, transcript control, deletion, and raw-audio handling states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B04-F05 | critical | retention | Implement text input, send/streaming states, suggestion-chip messages, inline voice, and full-screen voice entry. |
| B04-F06 | major | navigation | Deep-link rich cards and CTAs to the appropriate domain, mission, meal, workout, or detail screens. |
| B04-F07 | major | mobile-ergonomics | Add 44px hit areas around chat icons, chips, and inline CTAs. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

