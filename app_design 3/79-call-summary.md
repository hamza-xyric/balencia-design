# Screen Design: Call Summary

**Screen**: 79 of 90
**File**: 79-call-summary.md
**Route**: `/tabs/sia/call-summary`
**Register**: AI Mode (post-call SIA review)
**Primary action**: Review a completed voice coaching call and schedule a follow-up
**Tab**: SIA
**Navigation**: Stack push after Voice Mode [11] ends, or from Voice Call History [51]. Back returns to voice history or originating call flow.

---

## Purpose

Call Summary captures the value of a voice session after it ends. It turns a live SIA coaching call into durable action items, transcript highlights, mood/status signals, and a follow-up scheduling path. The screen should feel like a calm debrief, not a dense transcript archive.

---

## Information Architecture

**Hierarchy**:
1. Post-call summary hero
2. Action items card
3. Transcript highlights
4. Schedule follow-up bottom action

**User flow**:
- **Arrives from**: Voice Mode Full-Screen [11] post-call, Voice Call History [51] call detail.
- **Primary exit**: Schedule follow-up.
- **Secondary exits**: Tap action item -> Reminders & Tasks [61] or Mission Detail [14]; tap transcript line -> expanded transcript.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, bottom action, and visible tab bar.
**Tab bar visible**: Yes, SIA active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Call summary        |
+-----------------------------+
| Post-call summary        mic|
| Morning coaching call       |
| 18 minutes, recovery...     |
| [Transcript][Mood][Private] |
|                             |
| ACTION ITEMS                |
| [check] Move long run...    |
| [check] Add protein snack...|
| [check] Ask Aisha...        |
|                             |
| TRANSCRIPT HIGHLIGHTS       |
| [SIA] Your recovery is...   |
| [You] Let us keep it...     |
| [SIA] I will save that...   |
+-----------------------------+
|       Schedule follow-up    |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Summary Hero
- **Purpose**: Summarize the call at a glance.
- **Visual treatment**: rounded-xl, royal-purple/25 border, purple radial accent, ink-brown surface.
- **Content**:
  - Eyebrow "Post-call summary".
  - Title: "Morning coaching call".
  - Metadata: duration, topic, action item count.
  - Mic icon in purple circle.
  - Sentiment `ArcGauge` (S79-V01) as the hero's affective signal — open 240° dial, 0–100, orange data ink, calm glyph + one-word label ("steady"/"warm"/"heavy"), never an alarm colour (replaces the retired colour-only "Mood steady" pill, which was a 1.4.11 + colour-alone defect).
  - Signal pills (text + glyph, never colour-alone): Transcript ready, Private.

### Action Items Card
- **Purpose**: Show concrete follow-through from the call.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding.
- **Rows**: green check icon + 13pt action text.
- **Behavior**: Tap row opens task conversion or linked mission update. Completed state can be toggled in production.

### Transcript Highlights
- **Purpose**: Provide reviewable snippets without overwhelming the user.
- **Visual treatment**: Section header plus small rounded highlight cards.
- **Speaker indicators**:
  - SIA: sparkles icon, royal-purple.
  - You: clock/context icon, white/35.
- **Behavior**: Tap highlight opens expanded transcript with the selected line anchored.

### Schedule Follow-Up
- **Purpose**: Convert call insight into the next coaching session.
- **Visual treatment**: Full-width orange CTA with CalendarPlus icon.
- **Behavior**: Opens scheduling sheet from Voice Call History [51].

---

## Visualization

> Source: no companion file (`79-call-summary-visualization-recommendations.md` absent — this section is authored inline). Audited in `viz-audit/` — Batch (Voice / Call-summary cluster), findings `S79-V01..V07`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters; **mints no new primitive** — it reuses `ArcGauge` (`VK-015`, minted Energy [63]), `Donut/Pie` (`VK-007`, minted Nutrition [28]), `TimelineAgenda` (`VK-014`, minted Streak [59]), and `KPIStatTile` (`VK-008`). Benchmark = **Granola / Otter + Bevel topic splits** (sentiment gauge, topic donut, key-moment timeline) rendered **the Balencia way** (warm glow on ink-brown, the Living-Line family), not an Otter/Granola clone. **Register = AI Mode** (post-call SIA review) — the *surface chrome* (hero card, mic glyph, SIA speaker rows, "ask SIA" affordances) is sanctioned **royal-purple `#7F24FF` SIA identity** per `_shared-patterns.md` (purple = "SIA/AI indicators only"); **but the data-viz ink stays orange-dominant** (60/30/10) because sentiment, topic split, duration and emotion are *measurements of the user's own call*, not SIA forecasts — purple ink is reserved for the genuinely SIA-originated element only. **Current grade D (52) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + working drill/expand micro-interactions, owned by the later viz-build program.)*

Today the screen renders as a **pure text/card debrief with zero data visualization**: the hero is a flat text card (title + one metadata sentence + a mic glyph), "sentiment/mood" is a **single colour-only pill** ("Mood steady" — green-on-green, no value, a 1.4.11 + colour-alone miss for the screen's primary affective signal), topics are buried inside the metadata sentence, key moments are a flat transcript list, and duration is bare text. This section upgrades *how the call reads* — a non-judgmental **sentiment ArcGauge hero**, an honest **topic-split Donut**, a **key-moments TimelineAgenda**, and a **duration/emotion KPI strip** — while keeping the action items and transcript highlights as the screen's *content* (deliberately textual). The debrief stays calm — **one** focal viz, supporting visuals clearly secondary, the rest clean text.

### Visualized-vs-text map

| Datum (shown / implied) | Today | Specced visual | Primitive |
|---|---|---|---|
| Call sentiment / mood (0–100) | one colour-only green pill "Mood steady" (no value) | **hero sentiment `ArcGauge`** (open 240° dial, 0–100, orange data ink, glyph+word label — **never** an alarm) | **`ArcGauge` (VK-015, reuse 63)** |
| Topic split (recovery planning / pacing / nutrition …) | folded into one metadata sentence | **topic-split `Donut`** (slices = minutes-per-topic, hub = total call minutes — an honest whole) | **`Donut/Pie` (VK-007, reuse 28)** |
| Key moments / call arc (decision · rule saved · action) | flat transcript list, no sequence | **horizontal `TimelineAgenda`** (≤6 key-moment nodes along a drawn progress path, time-as-x) | **`TimelineAgenda` (VK-014, reuse 59)** |
| Duration (18 min) · action-item count (3) · emotion arc (start→end) | bare text in the metadata line | **KPI strip** — number + uppercase label + honest disclosed context (no fabricated delta) | `KPIStatTile` ×3 (`VK-008`) |
| Action items (3 rows) | green-check text rows (toggle to "converted") | — kept as the screen's **content** (a 3-item to-do has no useful chart form; the *count* is a KPI tile) | — (deliberately textual) |
| Transcript highlights (SIA / You lines) | speaker-labelled text cards | — (deliberately textual — language, not a metric; the *moments* are the timeline) | — |
| Call title · date/time · privacy state · signal labels | text / pills | — (deliberately textual — one-off identity/status labels with a **visible** word, not colour-alone) | — |

**Editorial hierarchy (calm, not maximal):** the **sentiment `ArcGauge` is the one viz hero** inside the post-call hero card; the topic Donut + KPI strip + key-moments timeline are clearly secondary; action items and transcript stay the screen's *content*. Four visuals, one focal — a calm debrief, not a dense analytics wall (the screen's stated purpose: "feel like a calm debrief, not a dense transcript archive").

### 1 · Sentiment ArcGauge — call-tone hero — `S79-V01`  *(reuse `VK-015`)*

Replace the colour-only "Mood steady" pill with the screen's **one viz hero**: an **`ArcGauge`** (`VK-015`) inside the post-call hero card — an **open arc sweeping 240°** (gap centered at the bottom foot — it must never close into a ring), **0–100 call sentiment**, current value as the dominant center number with a one-word label ("steady" / "warm" / "tense") below. Sentiment is a *level*, not a completion, so an open dial reads honestly where a full ring would falsely imply "100% = done."
- **Geometry:** compact-hero **120px** outer (the hero card is shared with the title/metadata, so the gauge sits as the card's left-anchored focal, not a full-bleed billboard), **6px arc** (compact variant); filled portion = `(sentiment/100)·240°`.
- **Depth (token-backed):** arc fill = arc-following `--grad-orange` **(mint)** via a **`conic-gradient` behind a circular mask** — ⚠️ an SVG `linearGradient` cannot sweep *along* an arc (the angular-gradient trap); the spec says conic. Track = `--color-alpha-white-10` over `--track-inset` **(mint)** inset (carved recess); round caps on both filled and unfilled ends. Glow = `--glow-orange-md` (~20px, **mint** — **not** the full 32px `--glow-orange`, which blooms past a 120px gauge). Center value `text-display` white + faint `--glow-orange-sm` **(mint)**; count-up `--dur-slow` 520ms `--ease-flow`.
- **Non-shaming colour (the ethical core of this screen):** the arc is **always orange** brand data ink — a **low / tense** call is **never** recoloured to an alarm red and **never** framed as a verdict on the user. Status is carried by **number + a visible glyph + a calm word** (e.g. a level/wave glyph + "steady", a warmth glyph + "warm", a low-tone moon glyph + "heavy" with a constructive coaching line — "a harder conversation; SIA noted what helped"). This is the spec's non-judgmental sentiment mandate ("Emotion/sentiment framed non-judgmentally, never an alarm") made literal in the hero.
- **AI-Mode note:** the gauge sits in a purple SIA-identity card (the call is SIA's), but the *arc ink stays orange* — sentiment is a measurement of the user's call, not an SIA forecast, and `ArcGauge` carries no projection (purple never on the arc).
- **Micro-interaction:** tap the gauge → expand a one-line "how SIA read the tone" explainer + an emotion sparkline (V01b, optional); tap-to-drill never re-frames a low value as failure.
- **Data:** `callSummary.sentiment.value` (0–100) + `.label` + `.glyph` (add to `mock.ts`; derive from the existing "recovery planning, mood steady" copy).
- **States:** sentiment not yet computed → arc at rest on a **ghosted** 0-foot (faint full track, **not** a filled 0 reading "your call scored zero"), center "—" + "tone analysis preparing"; loading → track visible, shimmer sweep that **morphs** into the fill (pairs with the spec's "Preparing call summary" hero state).

### 2 · Topic-split Donut — what the call was about — `S79-V02`  *(reuse `VK-007`)*

The topics currently folded into one metadata sentence ("recovery planning, …") become a **`Donut`** (`VK-007`): slices = **minutes spent per topic** (recovery planning / pacing / nutrition …), **hub = total call minutes** ("18 min") — an **honest whole** the user can name (the slices sum to the real call duration, never a padded total). This is the Bevel/Otter topic-split done warm.
- **Encoding / honesty (CONSISTENCY Donut):** **largest / primary topic slice = `--color-brand-orange`**; remaining topics = warm neutral tints (`--color-alpha-white-40`, `--color-alpha-white-20`) — **never rainbow** (one-hue-per-topic is a clone + 60/30/10 violation) and **never purple** (no slice is SIA-originated). 2px gap between slices (reveals the `ink-brown-800` surface for carved separation); consistent inner-radius; a 0-minute topic is **omitted**, never a zero-width wedge.
- **Depth:** card-scale **~96px**; `--glow-orange-sm` **(mint)** on the primary slice only; faint radial backplate behind the ring; `--track-inset` **(mint)** under the ring. **No** 32px hero glow (that swamps a 96px donut).
- **Micro-interaction:** tap a slice → its minutes + a one-line "jump to that part of the transcript" deep-link (ties the donut to the transcript content).
- **Data:** `callSummary.topics[]` (`label` + `minutes`); the sum must equal the call duration shown in the KPI strip (V03) — one source of truth.
- **States:** single-topic call → a full orange ring + hub minutes (honest, not a fake split); topics un-segmented yet → a **ghosted** full-ring outline + hub prompt ("topic breakdown preparing"), **never** a collapsed disc or a misleading 100%-of-one ring; loading → ring skeleton that **draws** into the real arcs.

### 3 · Key-moments TimelineAgenda — the call arc — `S79-V03`  *(reuse `VK-014`)*

The call's pivotal moments (e.g. "recovery cleared for a tempo day" → "keep it flexible" → "pacing rule saved") render as a **horizontal `TimelineAgenda`** (`VK-014`, the ≤6-node short-sequence variant where time-as-x is the gestalt) along a single **drawn progress path** — distinct from the transcript list (which is the verbatim language) by being the *sequence of decisions/checkpoints*.
- **Node encoding (token-backed):** **reached** moments (the call is over, so all key moments are reached) = filled `--color-forest-green` + white check; the **final "rule saved / action captured"** node carries the `--color-brand-orange` ring + `--glow-orange-sm` **(mint)** as the single focal accent (the call's outcome); SIA-originated moments (a SIA insight) may tint their node **purple** (the sanctioned SIA dot — the one place purple is correct on the timeline). Diameter 20–24pt (min-44 hit box). Status always glyph + colour.
- **Path encoding (Living-Line family):** a **drawn** `--stroke-base` 4px round-capped line; the reached path runs `--grad-progress` **(mint)** orange→green (effort → the captured outcome) — reuses the Living-Line gradient so the timeline reads as one family with every trend across the app. **Never an alarm-red node**; the path **never visibly breaks**.
- **Row anatomy:** each node labelled with its moment ("recovery cleared", "pacing rule saved") + a `white/40` timestamp caption ("min 4" / "min 16"); a tap anchors that line in the expanded transcript.
- **Non-shaming:** moments are framed as *what the call produced*, never "you struggled here"; a tense moment is a neutral node + a calm caption, never a red break.
- **Data:** `callSummary.keyMoments[]` (`label` + `atMinute` + `speaker` + `kind`); reuses the transcript's anchor mechanism.
- **States:** call still processing → node skeletons + a path that draws in; ≤2 moments → a short 2-node path (honest, not padded); error → "couldn't load key moments" + retry, reached nodes from cache.

### 4 · KPI strip — duration · action items · emotion arc — `S79-V04`  *(reuse `VK-008`)*

The bare metadata ("18 minutes, … 3 action items captured") becomes a 3-tile **`KPIStatTile`** strip: uppercase label (`white/40`, +0.12em) · number `text-h2` · honest disclosed context. Tiles: **Duration** (18 min) · **Action items** (3, links to the action-items card) · **Emotion arc** (start→end sentiment shift, e.g. "+8" warmer by the end — an honest start-vs-end window, **never** a cherry-picked flattering range, and framed as observation not praise/blame).
- **Depth (token-backed):** tile surface `ink-brown-800` + top-edge highlight; number count-up `--dur-base` 280ms `--ease-out-soft`; **no glow** (KPI tiles are flat-premium; depth lives in the ArcGauge hero).
- **Honesty / non-shaming:** the Emotion-arc delta uses the **fixed disclosed window** "start of call → end of call" (the only honest window for a single call); a downward arc is a **neutral muted** ▼ (`--color-alpha-white-40`), **never** red and **never** "your mood dropped" shaming language.
- **Data:** `callSummary.duration`, `.actionItems.length`, `.sentiment.start/.end` (`mock.ts`).
- **States:** Day-1 / first call → tiles populate from this single call (no prior-call delta is invented — the emotion arc is *within-call* start→end, which is always available); loading → label + skeleton number bar.

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 120px sentiment `ArcGauge` fills (`ring-animate`, 520ms `--ease-flow`) + center counts up — **then** the topic `Donut` **draws itself** (arcs sweep clockwise from 12 o'clock, largest→smallest, `stroke-draw` `--dur-flow` 1200ms, hub counts up 520ms) → **then** the KPI strip counts up (280ms) → **then** the key-moments `TimelineAgenda` path **draws itself** L→R (`stroke-draw` `--dur-flow`, reached orange→green drawing, nodes settle as the path reaches each) → action rows + transcript stagger in last (existing 60/70ms staggers). One line motif per surface (the timeline path is the only full Living Line; the donut draws as its own family member). Below-fold visuals animate on **scroll-into-view**. `prefers-reduced-motion` → every chart at final state instantly; the ArcGauge at rest, the Donut at full arcs with hub at final value, the timeline path fully drawn with settled nodes (pulse off) — signature static forms preserved.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / first-call** — the screen's data is *one completed call*, so the hero/donut/timeline/KPIs populate from that single call (no multi-call history needed); the only true empty is **mid-generation** — ArcGauge ghosted 0-foot ("—" / "tone analysis preparing"), Donut ghosted full-ring ("topic breakdown preparing"), timeline node skeletons, KPI skeleton numbers (pairs with the spec's "Preparing call summary" / "Transcript is still processing" states); **loading** — depth-preserving skeletons that *morph* into drawn data (arc track + shimmer sweep, donut ring that draws into arcs, timeline path that draws in) — never blank discs; **partial** — transcript-still-processing keeps the sentiment/topic/duration visuals (which don't need the transcript) and ghosts only the key-moments timeline + a "moments appear when the transcript finishes" note; **error** — chart-specific honesty per the Empty/Loading/Error table ("SIA could not summarize this call" → a retry card; an individual viz that failed shows its own ghost + retry, the others render independently).
- **60/30/10 (AI-Mode surface, orange data ink):** **orange dominates data ink** — ArcGauge arc, the primary topic Donut slice, the timeline's reached-path effort segment, KPI accents, and the Schedule-follow-up CTA. **Green** = arrival/completion only (reached timeline nodes + arrival path segment, the action-item ✓ checks, a positive emotion-arc ▲ delta). **Purple stays SIA-only** — the post-call hero card's identity (border/radial/mic glyph), the SIA transcript-speaker icon, any SIA-originated key-moment node, "ask SIA" affordances — **the AI-Mode register is sanctioned here** (`_shared-patterns.md` line 49: purple = "SIA/AI indicators only"); but **no chart ink is purple** (sentiment/topic/duration are measurements, not forecasts; `ArcGauge` carries no projection). Glow uses the calibrated size-stepped scale (120px ArcGauge = md ~20px, 96px Donut primary slice = sm ~12px, timeline current node = sm ~12px, KPI tiles = none) — warm depth, not neon.
- **Non-shaming (the screen's explicit mandate):** sentiment/emotion are framed **non-judgmentally, never an alarm** — the ArcGauge never turns red, a low/tense reading shows a calm glyph + word + a constructive coaching line (never "your call went badly"); the emotion-arc delta is a neutral observation with an honest start→end window; key moments are framed as *what the call produced*, never as user failures; no loss-aversion or urgency on the follow-up CTA.
- **Accessibility:** every chart carries a text/`aria-label` equivalent conveying the same value (ArcGauge → "Call sentiment 72 of 100, steady"; Donut → "recovery planning 9 min, pacing 6 min, nutrition 3 min, of 18 minutes total"; TimelineAgenda → "4 key moments: recovery cleared, kept flexible, protein rule, pacing rule saved"; KPI tiles read their number + label + window). Status is carried by a **visible** glyph/word — the sentiment label, the donut legend, the timeline ✓/ring glyphs, the KPI ▲/▼ — **never colour-alone** (this fixes the current colour-only "Mood steady" green pill, which is the live 1.4.11 + colour-alone defect). Label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — the ArcGauge arc + filled/track boundary, the Donut slice boundaries, the timeline path stroke + node fills + reached/unreached boundary all meet ≥3:1 vs background (the `white/08` unreached track + any white/5 structure are decorative-only); interactive chart targets ≥ 44×44pt (donut slice hit-wedges, timeline nodes, gauge tap); `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Granola / Otter + Bevel (voice call summary, topic splits) — *stays Balencia via sentiment ArcGauge hero + warm-glow surfaces on ink-brown + orange data-ink, not a flat transcript UI.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the A− Visualization section elevates the four data charts (ArcGauge / Donut / TimelineAgenda / KPI strip) but the supporting surfaces (hero card, action-items card, transcript section, CTA button) remain flat `--color-ink-brown-800` boxes with no layered depth or top-edge highlight; (2) the focal point is split between the viz hero (sentiment ArcGauge, 120px) and the fixed Schedule-follow-up CTA at screen bottom (competing for visual priority); (3) edge microcopy (loading state, "Transcript unavailable", "No action items", error recovery) is partly unwritten; (4) state-craft is text-only in Empty/Error tables; (5) contrast pairs for the ArcGauge arc and Donut slices vs background are asserted but not tabulated; (6) R06-F01 finding flags the booking success state as invisible — the CTA feedback is not placed where the user just acted.

### Focal hierarchy

One focal point: the **sentiment `ArcGauge` hero inside the post-call summary card** — the opening element below the sticky header, 120px, the only glowing element above the fold, the human emotional anchor of the debrief. The **Schedule-follow-up CTA sits at bottom as a secondary affordance**, not a competing hero. The transcript highlights and key moments are visibly tertiary by size and depth. The squint test lands on the ArcGauge sentiment number + glyph first (the call's emotional tone), then the action-items section (what to do), then the transcript (evidence). The bottom fixed CTA reads as a call-to-action, not a hero.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent) · `--shadow-1`. The post-call summary hero card (which contains the ArcGauge) adds `--surface-backplate` (`CK-T02`) so it reads as the focal backdrop. The action-items card and transcript-highlights section carry the same layered treatment. The Schedule-follow-up CTA at bottom is full-width, `--radius-pill`, orange (`--color-brand-orange`) fill, **no card surface** (it floats above the scroll content, z-40, with `--shadow-2` for elevation). The ArcGauge arc sits within the hero card: fill `--grad-orange` via conic-gradient + `--glow-orange-md` (~20px, **mint** — **not** the 32px `--glow-orange`, which would swamp a 120px element); the center "—" / final value text carries optional `--glow-orange-sm` (~12px). The Donut (96px card variant) sits in its own `CK-P1` surface with a faint `--glow-orange-sm` on the primary slice only. The action-item rows are flat within the card (no sub-surface per row — the card is the container). Transcript rows are flat as well. Extends the same depth language to all surfaces so nothing reads as a generic flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: post-call summary **title** ("Morning coaching call") `--text-h2` (20pt) / 600 / `--leading-snug` (1.25) / white 100%; **eyebrow** ("Post-call summary") `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); **metadata** ("18 minutes, recovery planning, 3 action items") `--text-caption` (13pt) / 400 / `--leading-normal` (1.4) / white 65%; ArcGauge center value `--text-display-l` (32pt) / 700 / tabular-nums / white 100%; ArcGauge label ("steady") `--text-body` (16pt) / 400 / white 65%; section eyebrow ("ACTION ITEMS", "TRANSCRIPT HIGHLIGHTS") `.eyebrow` recipe; action-item text `--text-body` (16pt) / 400 / white 100%; transcript speaker label ("SIA", "You") `--text-caption` (13pt) / 600 / white 50%; transcript line text `--text-body` (16pt) / 400 / white 80%; Schedule-follow-up button text `--text-h3` (17pt) / 600 / white 100%. Hierarchy is carried by **weight** (600–700 vs 400) and **size** (display vs body), not colour alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words (the Schedule-follow-up CTA text is one; if present, an emotion-arc ▼ delta is the second). Chillax stays logo-only (none on this screen). All line-heights and tracking use the `CK-T04 / CK-T05` scale, replacing ad-hoc pixels.

### Microcopy (before → after)

The narrative copy (post-call summary title, action items, transcript lines) is already authored on-voice per the spec's Components section. The gap is the **edge** strings:

- **Sentiment ArcGauge, loading state** — *before:* (no visible message) → *after (new, on-voice):* "Tone analysis preparing" (calm, explains what SIA is doing, never "analyzing your mood" shaming language).
- **Sentiment ArcGauge, low/tense reading** — *before:* (arc turns red as an alarm) → *after:* **arc stays orange, glyph + word label is calm** (such as 💭 "heavy" or 🌙 "low"), paired with a coaching note like "a harder conversation; SIA noted what helped" (non-shaming, reframes low as data, not failure).
- **Topic Donut, ghosted state (single-topic call)** — *before:* (unclear if a 100% ring is honest or fake) → *after (new):* "topic breakdown preparing" as a ghost state label; single-topic calls show a full orange ring + hub honest "1 topic · 18 min" (never hidden or marked as an error).
- **Key-moments TimelineAgenda, no moments yet** — *before:* (blank section) → *after (new):* "Key moments appear when the transcript finishes" (sets expectation, warm, never "loading" timeout language).
- **Action items, none captured** — *before:* silent omission → *after (new, on-voice):* "SIA didn't identify action items from this call — that's okay. You can create one manually in Reminders" (honest, empowering, never shaming).
- **Transcript, unavailable / still processing** — *before:* "Transcript is still processing" → *after (kept, on-voice):* same; warm acknowledgment, never "failed" language.
- **Schedule follow-up, success state** — *before:* CTA returns to transcript view, no visible confirmation → *after (new, resolves R06-F01):* brief inline success message "Follow-up scheduled for Friday, 3pm" appears above the CTA or inline as a chip (2–3s toast or persistent inline confirmation — location per the interaction spec); CTA text updates to "Reschedule" or "Scheduled ✓" to telegraph booked state.
- **Error state, SIA summary generation failed** — *before:* (no message) → *after (new):* "SIA could not summarize this call — try again or review the transcript manually" (specific, honest recovery action named).

No exclamation marks; the brand period used with intent; all SIA strings stay specific to the user's own data (the emotion label, the topic list, the moment list are derived from *this call*, never a generic template).

### Motion choreography

Locked to `CK-P4` order (draw-first, per the Visualization Motion table): **post-call summary hero fades in** (`--dur-base` 280ms `--ease-out-soft`) → **sentiment ArcGauge arc fills** (`ring-animate`, 120px, center counts up 520ms `--dur-slow` `--ease-flow`) → **topic Donut arcs sweep clockwise** (1200ms `--dur-flow`, largest→smallest, hub counts up 520ms) → **KPI strip counts up** (280ms `--dur-base` `--ease-out-soft`, 40ms stagger per tile) → **key-moments TimelineAgenda path draws L→R** (1200ms `--dur-flow`, reached orange→green, nodes settle 520ms) → action-item rows + transcript-highlights cards **stagger in** (`--dur-base` 280ms each, 60–70ms stagger, existing pattern). Below-fold surfaces animate on **scroll-into-view**. `prefers-reduced-motion` → all charts at final state instantly; ArcGauge at rest (arc fully filled, center value shown, no animation loop), Donut at full arcs (hub at final value), KPI tiles at final counts, timeline path fully drawn with settled nodes, loops off — signature static forms preserved.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | ArcGauge ghosted 0-foot ("—" / "tone analysis preparing"), Donut ghosted full-ring ("topic breakdown preparing"), timeline node skeletons, KPI skeleton numbers; action-items + transcript cards visible with hint text rows | "SIA is reading your call — one moment." | depth-preserving skeletons (tracks/spokes/rings visible, not blank discs); faint radial backplate remains visible |
| Loading (mid-generation) | ArcGauge track visible, shimmer sweep that morphs into filled arc; Donut ring skeleton that draws into arcs, hub morphs to count; timeline path skeleton, nodes morph in; KPI labels remain, numbers skeleton-to-value | "SIA is processing your summary." | skeleton on `--color-ink-brown-800`, shimmer + morph (never a swap); radial backplate |
| Partial (transcript still processing) | Sentiment/topic/duration visuals fully rendered (which don't need the transcript); key-moments timeline ghosts with "moments appear when the transcript finishes" note; action items + transcript sections ghost | "Transcript is still processing — summary is complete." | no-data ≠ zero (ghosted timeline, not a real empty); present sections stay colored |
| Error (summary generation failed) | All charts show their ghost state; a retry card replaces the hero: "SIA could not summarize this call — try again or review the transcript manually" + a Retry button | "Couldn't generate summary. Try again or read the transcript." | calibrated `--color-error-red` only on the Retry CTA (red outline, glyph + word paired, never colour-alone); cached partial summary (if available) shown below |
| Offline | Cached summary renders fully (all cards visible); Schedule-follow-up CTA is dimmed with a reason overlay "Schedule when online" | "You're offline — showing your last summary." | actions honestly dimmed (50% opacity, no haptic); Schedule CTA is tappable but shows a toast "connect to internet to schedule" |

### Signature & anti-generic

Ownable moments: the **sentiment `ArcGauge` hero** (the emotional tone of the call rendered as an open arc, 0–100, with a calm glyph + word, orange data ink — no alarm red, brand-correct, non-shaming), the **orange→green `--grad-progress` TimelineAgenda path** (the Living-Line signature showing the call's arc from effort to captured outcome), the **warm-glow surfaces on ink-brown** (layered depth, top-edge highlights, calibrated glow per size — the premium alternative to flat transcript UIs), and the **post-call debrief narrative** (framing the call as data + coaching, not as a judgment). Anti-generic fixes: the fixed Schedule-follow-up CTA is not a generic "floating action button" — it sits at a contextual height (below the fold after the call summary is digested), has an intentional micromoment (the booking confirmation visibility from R06-F01), and carries warm orange (not aggressive red). The transcript section is deliberately textual (language is not a metric; moments are the timeline), never a transcription wall that overwhelms. The screen's single one-liner SIA voice ("Your recovery is..." from the spec) is specific to the user's own call, never a template horoscope.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Standard |
| --- | --- | --- | --- |
| Post-call summary title | `--color-alpha-white-100` | ≥12:1 | WCAG AAA |
| ArcGauge center value | `--color-alpha-white-100` | ≥12:1 | WCAG AAA |
| ArcGauge arc fill | `--color-brand-orange` | 3.2:1 on `--track-inset` recess | WCAG 1.4.11 |
| ArcGauge arc track (unfilled) | `--color-alpha-white-08` | decorative-only (≥3:1 vs `ink-brown-800`) | exempt (background structure) |
| Donut primary slice | `--color-brand-orange` | 3.2:1 vs background | WCAG 1.4.11 |
| Donut slice boundary | orange/warm-neutral | ≥3:1 (gap visible) | WCAG 1.4.11 |
| Timeline reached path (orange segment) | `--color-brand-orange` | 3.2:1 | WCAG 1.4.11 |
| Timeline arrival path (green segment) | `--color-forest-green` | 3.0:1 on track | WCAG 1.4.11 (meets ≥3:1) |
| Timeline ✓ node glyph | white | ≥4.5:1 on node fill | WCAG AA |
| KPI tile numbers | `--color-alpha-white-100` | ≥12:1 | WCAG AAA |
| KPI tile labels | `--color-alpha-white-40` | ≥4.5:1 | WCAG AA |
| Action-item text | `--color-alpha-white-100` | ≥12:1 | WCAG AAA |
| Transcript speaker ("SIA", "You") | `--color-alpha-white-50` | ≥4.5:1 | WCAG AA |
| Transcript line text | `--color-alpha-white-80` | ≥8:1 | WCAG AA |
| Schedule-follow-up button text | `--color-alpha-white-100` | ≥12:1 on `--color-brand-orange` | WCAG AAA |
| Sentiment label ("steady", "heavy") | glyph + word paired, never colour-alone | visible glyph + text | WCAG 1.4.11 |
| Timeline status (reached vs unreached) | glyph (✓ / ◯) + colour | visible glyph, coloured node | WCAG 1.4.11 |

Status is carried by a **visible** glyph, word, or icon — never by colour alone. The ArcGauge arc is always orange (never red for "low mood"), with a calm glyph (🌙 / 💭) and a label word ("heavy", "steady") so the tone is never colour-alone. The Donut slices are bounded by a 2px gap (revealing the `ink-brown-800` carving) so slice separation doesn't rely on colour alone. The timeline path shows reached/unreached as a **visible connected stroke + node glyphs** (✓ for reached, ◯ for unreached), never just a colour change. Every chart carries an `aria-label` equivalent: ArcGauge → "Call sentiment 72 of 100, steady"; Donut → "Recovery planning 9 minutes, pacing 6 minutes, nutrition 3 minutes of 18 minutes total"; TimelineAgenda → "4 key moments: recovery cleared, kept flexible, protein rule, pacing rule saved"; KPI tiles → "Duration 18 minutes, 3 action items, emotion shifted +8 warmer". Interactive chart targets ≥44×44pt (Donut slice hit-wedges, timeline node tap areas). Focus-visible is standardized to `CK-T03 --focus-ring` (2px orange, 2px offset) on every focusable element (sentiment label tap, Donut tap, timeline node tap, action-item tap, Schedule-follow-up button, transcript tap). `prefers-reduced-motion` renders all charts at final state instantly; ArcGauge at final fill (no fill animation, arc drawn fully), Donut at full arcs with hub value, timeline path fully drawn with settled nodes (no draw animation, no pulse), KPI tiles at final counts — signature static forms preserved.

Conform to `design-audit/CONSISTENCY.md`.


## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Schedule follow-up |
| Data-viz ink (primary) | #FF5E00 | brand-orange | Sentiment ArcGauge arc, primary topic-Donut slice, timeline reached-path effort segment, KPI accents — orange dominates data ink (60/30/10) |
| Arrival / in-range | #34A853 | forest-green | Reached timeline nodes + arrival path segment, action-item checks, positive emotion-arc ▲ delta |
| SIA timeline node (sanctioned) | #7F24FF | royal-purple | A genuinely SIA-originated key-moment node only — the one place purple is correct on a chart; no other chart ink is purple |
| SIA indicators | #7F24FF | royal-purple | Hero and SIA lines |
| Completed/action checks | #34A853 | forest-green | Action item icons |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 55-65% | white/65 | Metadata/body |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Orange (60%) dominates **data ink** — the sentiment ArcGauge arc, the primary topic-Donut slice, the timeline's reached-path effort segment, KPI accents, and the Schedule-follow-up CTA. Green (30%) marks arrival/completion only — reached timeline nodes + arrival path segment, action-item checks, a positive emotion-arc delta. Purple (10%) is **SIA identity only** — the post-call hero card chrome (border/radial/mic glyph), the SIA transcript-speaker icon, any SIA-originated key-moment node, and ask-SIA affordances; **no other chart ink is purple** (sentiment/topic/duration are measurements of the user's own call, not SIA forecasts, and ArcGauge carries no projection). Cites `_shared-patterns.md` line 49 (royal-purple = SIA/AI indicators only, 10% role).

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Action item | Pressed | row bg white/4, check icon glow-green |
| Transcript card | Pressed | border royal-purple/25 when SIA, white/12 otherwise |
| Follow-up CTA | Pressed | scale(0.96) |
| Transcript | Loading | Highlight skeletons |
| Private pill | Tapped | Opens privacy explanation tooltip |
| Sentiment ArcGauge (S79-V01) | Tapped | Expands a one-line "how SIA read the tone" explainer (+ optional emotion sparkline); never re-frames a low value as failure |
| Topic Donut slice (S79-V02) | Slice tapped | Shows that topic's minutes + a "jump to that part of the transcript" deep-link; hit-wedge ≥44×44pt |
| Key-moment node (S79-V03) | Node tapped | Anchors that moment's line in the expanded transcript; node hit box ≥44×44pt |

---

## Motion

- Hero **draws first** (never fades — §8): the 120px sentiment `ArcGauge` fills (`ring-animate`, 520ms `--ease-flow`) + center counts up.
- Then the topic `Donut` **draws itself** — arcs sweep clockwise from 12 o'clock, largest→smallest (`stroke-draw` `--dur-flow` 1200ms), hub counts up 520ms.
- Then the KPI strip counts up (`--dur-base` 280ms `--ease-out-soft`).
- Then the key-moments `TimelineAgenda` path **draws itself** L→R (`stroke-draw` `--dur-flow`, reached orange→green drawing, nodes settle as the path reaches each).
- Action rows stagger by 60ms; transcript cards stagger by 70ms last.
- Scheduling sheet slides up using standard modal timing.
- `prefers-reduced-motion`: every chart renders at final state instantly — ArcGauge at rest, Donut at full arcs with hub at final value, timeline path fully drawn with settled nodes (pulse off); signature static forms preserved.

---

## Empty, Loading, Error

- **Summary generating**: Hero shows "Preparing call summary" with pulsing SIA icon.
- **Transcript unavailable**: Show transcript section fallback "Transcript is still processing".
- **No action items**: Replace card rows with "No action items captured from this call".
- **Generation failed**: Show retry card: "SIA could not summarize this call".
- **Offline**: Cached summary remains readable; schedule action is disabled.

---

## Accessibility

- Hero announces call title, duration, summary status, and privacy state.
- Action item rows are buttons with full action text.
- Transcript cards announce speaker and line text.
- Follow-up CTA label: "Schedule follow-up call".
- Mood/privacy signals include text, not color-only status.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/sia/call-summary/page.tsx`.
- Complements Voice Call History [51] by focusing on the post-call debrief state.
- Transcript snippets should be redacted according to the same privacy rules as SIA memory [20].
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-06.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U03`
**Prototype route**: `/tabs/sia/call-summary`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q14 SIA in chats requires explicit invocation.
- Q15 group health/recovery signals require per-user permission.
- Q23 call follow-up scheduling should reuse the voice-history scheduling sheet.
- Q24 create mission starts from blank natural-language intent.
- Q25 streak details preserve source tab context.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B06-F01 | critical | retention | Wire follow-up scheduling, action-item conversion, and transcript expansion from the post-call summary. |
| B06-F02 | major | trust-privacy | Make privacy/status signals accessible and add concise storage, visibility, retention, and redaction guidance. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

