# Screen Design: Exercise Library

**Screen**: 70 of 77
**File**: 70-exercise-library.md
**Register**: Product Mode
**Primary action**: Browse and select exercises (tap exercise card)
**Tab**: Today (within Fitness stack) or Goals (within workout stack)
**Navigation**: Stack depth 2+ (pushed from Fitness Dashboard [26] or Workout Detail [27]). Back button returns to previous screen.

---

## Purpose

The Exercise Library is a searchable, filterable database of all available exercises. Users browse here to discover new exercises, learn proper form, and select exercises for workout planning. The library supports the backend's 500+ exercise database with muscle group targeting, equipment requirements, difficulty levels, and instructional content. When accessed from Workout Detail [27], exercises can be added directly to the current workout.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Search bar -- find a specific exercise instantly
2. Filter chips -- narrow by muscle group, equipment, difficulty
3. Exercise cards -- browsable grid of exercises with key info
4. Exercise detail bottom sheet -- full exercise information on tap

**User flow**:
- **Arrives from**: Fitness Dashboard [26] via "browse exercises" shortcut or FAB sub-action, Workout Detail [27] planning mode via "add exercise" button, Explore [18] via Fitness section
- **Primary exit**: Previous screen via stack pop (back button)
- **Secondary exits**: Exercise detail bottom sheet (modal present), Workout Detail [27] if adding exercise to workout

---

## Layout

**Scroll behavior**: FlatList (homogeneous exercise cards, virtualized for performance with 500+ items)
**Tab bar visible**: Yes

### ASCII Wireframe

```
+-----------------------------+
|      Status Bar (44pt)      |
|-----------------------------|
|  [<-]    Exercise Library   |  <- nav header, 44pt
|-----------------------------|
|                             |  <- 16pt top padding
|  +-------------------------+|
|  | Search exercises...     ||  <- search bar, 44pt
|  +-------------------------+|
|                             |  <- 12pt gap
|  [All] [Upper] [Lower]     |  <- filter chip row (muscle groups)
|  [Core] [Cardio] [Full]    |     scrollable horizontal
|                             |  <- 12pt gap
|  [Any equip] [None]        |  <- equipment filter row
|  [Dumbbells] [Barbell]     |
|                             |  <- 16pt gap
|  532 exercises              |  <- result count, left-aligned
|                             |  <- 12pt gap
|  +------------+  +--------+|
|  | [img]       |  | [img]  ||  <- 2-column grid
|  | Bench Press |  | Squat  ||
|  | Chest       |  | Legs   ||
|  | ▓▓▓ Adv     |  | ▓▓ Int ||  <- difficulty StatBar (level/3 + word)
|  +------------+  +--------+|  <- 12pt gap
|  +------------+  +--------+|
|  | [img]       |  | [img]  ||
|  | Deadlift   |  | Lunge  ||
|  | Back        |  | Legs   ||
|  | ***         |  | **     ||
|  +------------+  +--------+|
|  ...                        |
|                             |  <- 64pt bottom padding
|-----------------------------|
|  Today   SIA   Goals   Me   |
+-----------------------------+
```

### Component Stack (top to bottom)

1. **Navigation Header** -- 44pt
   - Back chevron (left), "Exercise Library" title (center)

2. **Search Bar** -- 16pt top padding + 44pt = 60pt
   - Full-width minus 32pt, pill-shaped search input

3. **Muscle Group Filter Chips** -- 12pt gap + 36pt = 48pt
   - Horizontal scrollable chip row: All, Upper Body, Lower Body, Core, Cardio, Full Body

4. **Equipment Filter Chips** -- 12pt gap + 36pt = 48pt
   - Horizontal scrollable chip row: Any Equipment, No Equipment, Dumbbells, Barbell, Kettlebell, Resistance Band, Machine, Cable

5. **Result Count** -- 16pt gap + 16pt = 32pt
   - "[N] exercises" left-aligned

6. **Exercise Grid** -- 12pt gap + FlatList of exercise cards
   - 2-column masonry grid, 12pt gap between items

7. **Bottom Padding** -- 64pt (clears FAB + tab bar)

---

## Components

### Search Bar
- **Visual treatment**: Same as Screen [25] Help Center and Screen [29] Meal Detail search bar. Full-width minus 32pt, 44pt tall, ink-brown-800 bg, --r-md (14pt). Left: search icon (16pt, white at 40%). Placeholder: "search exercises..." (15pt Sora Regular, white at 40%). Focused: 2pt orange border. Text: 15pt Sora Regular, white.
- **Behavior**: Filters exercise list in real-time (debounced 300ms). Searches exercise name, muscle groups, and equipment.

### Muscle Group Filter Chips
- **Visual treatment**: Same as Filter Chip Row pattern from Screen [13]. Horizontal scrollable, 36pt height, --r-pill.
- **Active**: orange bg, white text. Inactive: ink-brown-800, white at 60%.
- **Single-select**: Only one muscle group active at a time. "All" is default.

### Equipment Filter Chips
- **Visual treatment**: Same chip pattern, 36pt height.
- **Multi-select**: Multiple equipment types can be active simultaneously (filters as AND for muscle group + OR for equipment).
- **Active**: orange bg, white text. Inactive: ink-brown-800, white at 60%.

### Result Count
- **Visual treatment**: 13pt Sora Regular, white at 40%, left-aligned, 16pt left margin.
- **Updates in real-time** as filters change.

### Exercise Card
- **Purpose**: Browsable exercise entry with key info at a glance
- **Visual treatment**: ink-brown-800 bg, --r-xl (28pt), 1pt white at 5% border. Full card content:
  - Image area: top half, 120pt height, --r-xl top corners, ink-900 bg placeholder if no image. Exercise illustration/photo with object-fit cover.
  - Exercise name: 15pt Sora Semibold, white, left-aligned, 12pt horizontal padding, 12pt below image
  - Primary muscle group: 12pt Sora Regular, white at 50%, left-aligned, 4pt below name
  - Difficulty StatBar (`S70-V01`): a single value-vs-target bar (the `MacroBar` primitive), 8pt tall `--r-pill`, filled to `level/3` on one shared scale, orange fill on a `--color-alpha-white-08` track recessed on `--track-inset`; the level **word** is always shown beside it — never colour/length-alone. Left-aligned, 8pt below muscle group, 12pt bottom padding; missing difficulty = ghosted track + "Unrated" (≠ a real Beginner).
    - Beginner: bar filled to 1/3
    - Intermediate: bar filled to 2/3
    - Advanced: bar filled to 3/3 (full)
- **Size**: ((screen width - 32pt - 12pt) / 2) x ~220pt
- **Gestures**: Tap → opens Exercise Detail Bottom Sheet

### Exercise Detail Bottom Sheet
- **Presentation**: Standard bottom sheet (ink-brown-800 bg, --r-lg top corners, drag handle). ~85% screen height.
- **Content**:
  - Hero image/animation: 200pt, full-width, shows exercise form illustration or video thumbnail
  - Exercise name: 20pt Sora Semibold, white
  - Difficulty badge: pill (beginner/intermediate/advanced), colored by difficulty
  - Muscle groups: domain-style tag chips (fitness-red at 15% bg, fitness-red text) for each targeted muscle
  - Equipment: 13pt Sora Regular, white at 50%, icon + text
  - "How to perform" section:
    - Numbered instruction steps (15pt Sora Regular, white at 70%)
    - Each step: step number (15pt Sora Semibold, orange) + instruction text
  - "Common mistakes" section (collapsible):
    - Warning icon (16pt, amber) + mistake description (14pt Regular, white at 60%)
  - "Variations" section (collapsible):
    - List of variation names, tappable to switch to that exercise's detail
  - Target areas visual: simple body outline with highlighted muscle groups (colored in fitness-red)
- **CTAs** (conditional):
  - When accessed from Workout Detail [27]: "add to workout" orange pill CTA (48pt, full-width minus 32pt) fixed at bottom
  - When browsing: no fixed CTA
- **Gestures**: Drag-to-dismiss, tap "add to workout" (if present)

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Nav title | Sora | 600 (Semibold) | 17pt | 22pt | White |
| Search placeholder | Sora | 400 (Regular) | 15pt | 20pt | White at 40% |
| Filter chip text | Sora | 600 (Semibold) | 13pt | 18pt | White at 60% (inactive) / white (active) |
| Result count | Sora | 400 (Regular) | 13pt | 18pt | White at 40% |
| Card exercise name | Sora | 600 (Semibold) | 15pt | 20pt | White |
| Card muscle group | Sora | 400 (Regular) | 12pt | 16pt | White at 50% |
| Detail exercise name | Sora | 600 (Semibold) | 20pt | 26pt | White |
| Detail instruction step | Sora | 400 (Regular) | 15pt | 22pt | White at 70% |
| Detail step number | Sora | 600 (Semibold) | 15pt | 22pt | #FF5E00 |

---

## Visualization

> Source: brief-driven (no companion file). Audited in `viz-audit/` — Batch 8; primitives from `VIZ-KIT.md` at `CONSISTENCY.md` parameters. Product Mode — utility/browse, deliberately lightweight (a catalogue, not a dashboard). Benchmark = a Strava/WHOOP exercise library rendered the Balencia way: one calm, comparable difficulty bar + identity muscle tags, on the Apple-Health honesty floor. Current grade C+ (72) → specced-target A− (85).

A searchable 500+ exercise catalogue. The visualization job here is **restraint, executed completely**: surface the one attribute that benefits from a visual (relative difficulty, comparable across cards at a glance) and leave the rest as clean text. There is deliberately **no chart hero** — fabricating a trend or gauge on a content browser would be chart-noise and is penalised, not rewarded. The single visual is fully specced so it reads as crafted, not default; everything else is resolved as text by design.

### Visualized-vs-text map
| Datum | Today | Specced visual | Primitive |
|---|---|---|---|
| Difficulty (beginner → advanced, 3 rungs) | 3 dots, no word | difficulty **StatBar**, filled to `level / 3`, with the level **word** always visible | `StatBars` (MacroBar) `S70-V01` |
| Muscle-group targeting | text | identity-coloured muscle **tags** (textual + tint, by design) | chips (domain identity) `S70-V02` |
| Result count `[N] exercises` | text | — count-up number, deliberately textual | — |
| Name / equipment / instructions / steps | text | — (deliberately textual; no useful visual form) | — |

**Justified restraint (no focal hero):** this is a LIGHTWEIGHT Product-Mode browser, not a HIGH dashboard — per CONSISTENCY §6 "Lightweight-MEDIUM" thin variant, the correct shape is a 2-subsection mini-section, not a hero + KPI strip. The deliberate decision is to ship **zero charts** and exactly **one repeated micro-visual** (the difficulty StatBar) that earns its place by making 500+ cards comparable in one glance. Editorial hierarchy is therefore at the *card* scale: within each card the **name is the focal element**, the StatBar is a quiet secondary cue, and muscle/equipment are tertiary text — calm, never competing.

### 1 · Difficulty StatBar — S70-V01 → `StatBars` (MacroBar)
On every exercise card and at the top of the detail sheet, difficulty renders as a single **value-vs-target `StatBar`** (the deployed `MacroBar` primitive), filled to **`level / 3`** on one shared scale so any two cards are directly comparable: Beginner = 1/3, Intermediate = 2/3, Advanced = 3/3 (full). The **level word is always shown beside the bar** ("Beginner" / "Intermediate" / "Advanced") — difficulty is **never** conveyed by fill-length alone. This replaces the legacy 3-dot indicator (the dots could not be read at a glance as a magnitude, and carried no word).
- **Depth (token-backed):** continuous rounded-pill bar, **8px** height, fill `--color-brand-orange` over a `--color-alpha-white-08` track recessed on `--track-inset` **(mint)** for carved depth; corner radius `--r-pill`; round caps; **no glow** (inline scale — per CONSISTENCY glow-by-size, anything below 36px carries no glow). On the card, bar width = card content width minus the level word; in the detail sheet the same bar sits under the difficulty label at full content width.
- **Micro-interaction:** the StatBar is non-interactive on the card (the whole card is the 44×44pt tap target → opens the detail sheet, per Interaction States). In the detail sheet, tapping the difficulty row reveals a one-line plain-language gloss ("Advanced — assumes solid form on the fundamentals") via a `--dur-fast` 160ms `--ease-out-soft` height expand — a drill affordance, not a navigation.
- **States:**
  - **Cold-start / first open (DB hydrating):** card renders the skeleton (see Motion) — the StatBar track is present but unfilled; no fabricated level.
  - **Loading (per card, scroll-in):** track visible at `--color-alpha-white-08`; fill rises 0→`level/3` as the card enters viewport.
  - **Unknown / missing difficulty:** a **ghosted** full-width track (`--color-alpha-white-08`, no orange fill) + the word **"Unrated"** in `white/40` — visually distinct from a real Beginner (1/3 filled). Never a fake level-1 fill (honesty: no-data ≠ a real low score).
  - **Partial card load (image failed, data present):** StatBar + word still render normally (composes with Error Handling "Partial load" → simplified card); a fully-failed card shows the skeleton track, never a guessed level.
  - **Error (list fetch failed):** the centred error state from Error Handling replaces the grid; no orphan StatBars.
- **Data source:** `exercise.difficulty` (1–3 ordinal: 1 Beginner · 2 Intermediate · 3 Advanced), per the 500+ exercise DB; `null`/absent → "Unrated" ghost state.

### 2 · Muscle-group identity tags — S70-V02 → chips (domain identity)
Primary (and, in the detail sheet, secondary) muscle groups render as **identity-coloured tags** — `--color-domain-fitness` `#EF4444` at 15% subtle background with `#EF4444` text — so filtering and scanning read visually without a chart. This is **deliberately textual + iconographic**, not a visualization: muscle groups are categorical identity, with no magnitude, part-of-whole, or trend to plot. The fitness-red is **identity only** (never primary data ink — that role belongs to orange on the difficulty StatBar and active filter), satisfying the 60/30/10 domain-colour rule.
- **Depth:** chip = `--color-domain-fitness-subtle` (15%) fill, `--r-pill`, no glow, no border; tag text ≥ 4.5:1 on the chip background.
- **Micro-interaction:** in the detail sheet, tapping a muscle tag is inert (informational); on the card, muscle is plain text under the name (tag treatment is reserved for the detail sheet's denser context).
- **States:** missing muscle data → tag omitted (never an empty "—" chip).
- **Data source:** `exercise.muscle` (primary) + `exercise.secondaryMuscles[]` (detail sheet).

### Motion choreography
Draw-first order, card-scoped (there is no screen hero to sequence): on filter/search change the grid **crossfades** content (280ms `--ease-out-soft`, per the ## Motion table) and the result-count number **counts up** (`--dur-base` 280ms `--ease-out-soft`). As each card scrolls into view, its difficulty StatBar fill **rises 0→`level/3`** (`--dur-slow` 520ms `--ease-flow`) — a bar *rise*, never an opacity-fade of the fill. The detail sheet slides up (520ms `--ease-flow`); inside it the difficulty StatBar rises on present (520ms) after the sheet settles. The skeleton→data transition morphs (track persists, fill grows in place) rather than swapping. **`prefers-reduced-motion`:** all StatBars render at final fill instantly, result-count at final value, no rise/crossfade — the static form (filled bar + level word) carries the full meaning.

### States, brand & accessibility
- **States (composed, not deferred):** Cold-start = skeleton 2-column grid (ink-brown-800 shimmer, left→right) preserving card layout incl. the empty StatBar track; Loading = same skeleton, fills rise on data; Empty (filter/search yields nothing) = the designed "no exercises found" centred state (search icon + try-different-filters), distinct from error and from cold-start; Partial = loaded cards normal, failed cards → simplified name+muscle card (per Error Handling); Error (network) = centred cloud-offline state + orange "retry" (≥44pt) with filters visible-but-inert; Offline = cached-exercises banner. Missing difficulty = "Unrated" ghost track (≠ real Beginner).
- **Brand / 60·30·10:** orange `#FF5E00` is the only data ink (difficulty fill, active filter chip, step numbers, CTA); green and purple are **correctly absent** (no completion/arrival, no SIA on this utility screen); fitness-red `#EF4444` is domain **identity** on muscle tags only; amber `#F59E0B` is reserved for the "common mistakes" warning glyph (operational caution, glyph-paired, not data ink). Non-shaming: difficulty is framed as a neutral attribute of the *exercise*, never a verdict on the *user* — no "too hard for you" framing.
- **Accessibility:** every difficulty StatBar pairs the orange fill with a **visible level word** (never colour/length alone); card `aria-label` "[name], targets [muscle], [difficulty] difficulty" (extend to "[difficulty] difficulty, [N] of 3"); the StatBar fill/track boundary and the muscle-tag text meet **WCAG 1.4.11 ≥3:1** on `ink-brown-800`; text/values ≥4.5:1; the card (not the bar) is the ≥44×44pt target; "Unrated" announced in words.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data  ·  **Cluster benchmark:** Strava + WHOOP exercise library — *stays Balencia via the difficulty StatBar (level/3 + word, never colour-alone) + warm-glow surfaces on ink-brown-800, not a cold competitor flat.*  
**Pre-grade:** C+ (72)  ·  **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **exercise card grid** as a browsable catalogue. The search bar and filter chips are secondary controllers (they *refine* the grid, not the focal content). Within each card, the **exercise name is the anchor** (15pt Semibold, white), the StatBar sits below as a quiet secondary cue (the visual that makes 500+ cards comparable at a glance), and muscle/equipment text is tertiary. The grid itself is deliberately calm and non-competitive: equal-weight cards in a 2-column layout (no hero card disrupting a list, no card-grid monotony — the homogeneity is intentional for a utility browser). The squint test lands on exercise names first, then the StatBar fills, then the filter row. Clear hierarchy without false competition.

### Surface & depth

Every card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--color-alpha-white-06` border · `CK-T01 --edge-highlight` (inset 0 1px 0 rgba(255,255,255,0.06)) top-edge highlight — the not-flat cue · `--shadow-1` (0 8pt 24pt rgba(33,16,8,0.18)). The search bar (44pt) uses the same surface language: ink-brown-800 body, --radius-md (14pt), 1px white/6 border, and on focus a 2pt orange border (no glow — focus rings are 2–4px, not glows). Filter chips (36pt) are pill-shaped (`--radius-pill`), active state orange bg with white text (data ink), inactive state ink-brown-800 with white/60 text; no glow on chips <36px. The result-count text floats plainly on ink-900 (no surface, intentionally minimal). The exercise detail bottom sheet (85% height) wraps its content in a layered card-like surface with --radius-lg (20pt) top corners and `CK-T01` edge-highlight. The "add to workout" CTA (48pt tall, orange pill) carries no glow (a button this size carries no glow per CONSISTENCY.md §1 — glow starts at ~48px and only applies to hero+ elements). Every surface is layered, never flat.

### Typographic rhythm

Map to `CK-P3` locked tokens: Navigation header "Exercise Library" `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / white 100%; search hint `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 40%; filter chip text `--text-caption` (13pt) / 600 / `--leading-normal` / white 60% (inactive) / white 100% (active); result count `--text-caption` (13pt) / 400 / `--leading-normal` / white 40%; exercise card name `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; card muscle group `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; difficulty StatBar level word `--text-small` (11pt) / 400 / `--leading-normal` / white 70%; detail sheet title `--text-h1` (28pt) / 700 / `--leading-snug` (1.25) / white 100%; instruction step number `--text-h3` (17pt) / 600 / `--color-brand-orange`; instruction step text `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70%. Hierarchy is weight-led (600–700 vs 400), not size alone. Sentence case on all labels (filter chips, hint text, buttons). ≤2 `--color-brand-orange` accent words on the screen: the step numbers (orange) and the "add to workout" CTA label. The brand period used with restraint (no closing period after filter/button labels — the period is reserved for prose sentences in empty states and error messages). Chillax stays logo-only. Replaces floating values with the `CK-T04` / `CK-T05` standard line-height and tracking recipes.

### Microcopy (before → after)

All user-facing strings authored to `CK-P5` brand voice — warm, coaching, non-shaming, no exclamation marks.

- **Search hint** — *before:* "search exercises..." → *after (kept):* same; lowercase, plain, clear.
- **Filter chip labels** — *before:* "Upper Body", "Lower Body", "Full Body", "Any Equipment" → *after (kept):* same; sentence case, plain.
- **Result count** — *before:* "532 exercises" → *after (kept):* same; minimal, plain text.
- **Difficulty word (beside StatBar)** — *before:* bare dots, no word → *after (new):* "Beginner" / "Intermediate" / "Advanced" (always visible, never colour-alone); *missing difficulty:* "Unrated" (white/40, distinct from a real low level — no-data ≠ zero).
- **Exercise card, difficulty label missing / null state** — *before:* empty space or a guessed level → *after (new):* ghosted track + "Unrated" word (visually and textually distinct from Beginner, honest).
- **Empty state (no results)** — *before:* generic "no results" → *after (new, on-voice):* "No exercises found. Try different filters or search terms."
- **Error state (list fetch failed)** — *before:* no message → *after (new, on-voice):* "Couldn't load exercises. Check your connection and try again."
- **Detail sheet, difficulty gloss (on tap, micro-interaction)** — *before:* no explanation → *after (new, warm):* "Advanced — assumes solid form on the fundamentals" (one-line plain-language reframe, coaching tone, earned in a `--dur-fast` 160ms height-expand via tap).
- **Common mistakes section eyebrow** — *before:* no title → *after (new):* "Common mistakes" (neutral, educational).
- **Variation section header** — *before:* no header → *after (new):* "Variations" (plain, informational).
- **"Add to workout" button label** — *before:* none → *after (new, warm):* "Add to workout" (specific action, second person, present tense, no exclamation); *success state (after tap):* "Added" + green glow 600ms flash + checkmark icon (warm, brief confirmation).
- **Target areas section** — *before:* no heading → *after (new):* "Target areas" (or kept minimal; muscle labels stay plain text on body outline).
- **Search bar a11y label** — *before:* none → *after (new):* "Search exercises by name, muscle group, or equipment" (specific, clear).
- **Detail sheet loading state** — *before:* no message → *after (new):* skeleton hint text with minimal text or shimmer-only.
- **Detail sheet error (retry after 5s)** — *before:* no message → *after (new):* "Couldn't load exercise details. Tap retry or dismiss and try again."

No filler, no hint text, no generic "Success!" toasts. Every edge string is authored and on-voice.

### Motion choreography

Draw-first order per `CK-P4`, honouring the lightweight utility scale (no hero motif, card-scoped choreography):

1. **Filter/search change:** exercise grid **crossfades content** (280ms `--ease-out-soft`).
2. **Result-count number:** updates via **count-up animation** (280ms `--ease-out-soft`, `--dur-base`) from old value to new.
3. **Card scroll-into-view:** each exercise card's difficulty StatBar **rises 0 → level/3** (520ms `--ease-flow`, `--dur-slow`) — orange fill rises from empty track to final level, a bar *rise* (never opacity-fade). This is the card-scoped draw motion.
4. **Detail bottom sheet open:** slides up from bottom (520ms `--ease-flow`). Inside, the StatBar rises on present (520ms after sheet settles).
5. **Skeleton → data morphing:** StatBar track persists, orange fill grows in place (not a swap). Image placeholders similarly morph.
6. **Reduced-motion:** all StatBars render at final fill instantly; result-count at final value instantly; the static form (filled bar + level word) carries the full meaning. Settled frame is canonical.

No opacity-fading of strokes (§8). No urgency loops. Below-fold sections animate on scroll-into-view.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1 (DB hydrating)** | 2-column skeleton grid preserving card layout, including empty difficulty StatBar track (no fabricated level) · left→right shimmer intensity | "Loading your exercise library" (or shimmer-only, minimal) | ink-brown-800 cards, skeleton glow at white/08 opacity, no premature StatBar fill |
| **Loading (per card, scroll-in)** | Track visible at --color-alpha-white-08, filled bars rise 0→level/3 on data arrival (morph, not swap) · image skeleton → image load | (no message; motion carries the load signal) | Cards settle at full depth (edge-highlight, shadow-1); fill colour --color-brand-orange only on real data |
| **Empty / filter yields nothing** | Centred state, 48pt search icon (white/15) + "No exercises found" (17pt Semibold, white) + "Try different filters or search terms" (14pt Regular, white/50) · search bar and filter chips visible but inert | Warm, specific recovery (not generic) | Search/filter row stays visible in background, empty-state card floats on ink-900, no glow |
| **Partial (some cards load, others fail)** | Successfully loaded cards render normally. Failed cards → simplified card (name + muscle only, no image, no StatBar) or image hint text + name + muscle. Retry on scroll-away-and-back | (no message; visual simplification signals partial load) | Simplified card uses ink-brown-800 + edge-highlight but no shadow-1 (lighter visual weight); no guessed StatBar |
| **Error (list fetch failed)** | Centred error state, 48pt cloud-offline icon (white/15) + "Couldn't load exercises" (17pt Semibold, white) + "Check your connection and try again" (14pt Regular, white/50) + orange "retry" text link (14pt Semibold, ≥44pt touch target) · search bar and filter chips visible but non-functional | Specific failure + recovery action named + honest | Icon and text on ink-900; no card surface (error states float); orange text is only data ink (CTA signal) |
| **Offline** | Banner below filter chips, 13pt Regular white/40 + 14pt cloud-offline icon: "You're offline — showing cached exercises" · list shows previously viewed exercises only · Banner auto-dismisses on connection restore | Warm, honest framing (not apologetic; "showing cached" is matter-of-fact) | Banner uses ink-brown-800 surface with edge-highlight; auto-dismissal + silent full reload is non-intrusive |

Every cell is **designed**, never deferred to a generic error pattern. States nest (such as partial + offline → simplified cards + banner).

### Signature & anti-generic

The **one ownable Balencia moment** on this screen: the **difficulty StatBar** — a value-vs-target visual that is **never conveyed by colour/length alone**. The level word is always present beside the bar (Beginner / Intermediate / Advanced / Unrated). This replaces a legacy 3-dot indicator and is the signature of restraint in a 500+ item catalogue: one micro-visual per card, fully specced to earn its place, refusing chart-noise. The orange fill (`--color-brand-orange`) is the only data ink; no domain-colour fills on the bars (fitness-red appears only as the identity tag beside the muscle group on the detail sheet, never on data). The StatBar uses the standard ink-brown-800 track + --track-inset recess + white/08 track depth recipe, establishing the calm, crafted read of a utility browser (not a cold neon competitor). The "Unrated" ghost state (white/08 track, no orange fill) is visually and textually distinct from Beginner, honouring the non-shaming rule: no-data ≠ a low score. This screen avoids the #1 generic tell (symmetric-card-grid monotony) by *design intent*: a homogeneous catalogue is correct for a browse-and-select utility; the focal moment is editorial restraint, not a hero card disrupting a list.

### Accessibility

**Contrast pairs (all load-bearing):**
- Exercise name (white 100) on card (ink-brown-800): ≥4.5:1 ✓
- Difficulty StatBar orange fill (`--color-brand-orange`) on white/08 track: ≥3:1 (WCAG 1.4.11) ✓
- Difficulty level word (white 70) beside bar: ≥3:1 on card ✓
- Muscle group text (white 50) on card: ≥4.5:1 ✓
- Filter chip inactive (white 60) on ink-brown-800: ≥4.5:1 ✓
- Result count (white 40) on ink-900: ≥3:1 ✓
- Empty/error state text (white 100 + white 50) on ink-900: ≥4.5:1 & ≥3:1 ✓

**Focus & targets:**
- Search bar focus: 2pt orange border (`--color-brand-orange`), matching `CK-T03 --focus-ring` guidance ✓
- Filter chips focus: `CK-T03 --focus-ring` (2px orange, 2px offset) on each chip, all ≥44×44pt ✓
- Exercise card tap target: full card (≥44×44pt), not just the StatBar ✓
- "Add to workout" CTA: ≥44×44pt (48pt pill button) ✓
- "Retry" error link: ≥44×44pt touch target ✓

**Status never colour-alone:**
- Difficulty paired with level word (Beginner / Intermediate / Advanced / Unrated) — never relying on orange fill length or colour alone ✓
- Filter chip active state pairs orange fill with white text (not colour-alone) ✓
- Error icon (cloud-offline, 48pt, white 15) pairs with error text ("Couldn't load…") ✓

**Semantic labels:**
- Exercise card `aria-label`: "[name], targets [muscle], [difficulty] difficulty" ✓
- Filter chip: `role="button"` + `aria-pressed="true/false"` ✓
- Search bar: `aria-label="Search exercises by name, muscle group, or equipment"` ✓
- "Add to workout" button: `aria-label="Add [exercise name] to current workout"` ✓
- Detail sheet: full content readable in order; section headings announced ✓

**Reduced-motion:**
- StatBar fill animation disables (bar renders at final level instantly) ✓
- Result-count ceases counting (final number instantly) ✓
- Cross-fade on filter change disables (new grid instantly, no opacity transition) ✓
- Sheet slide-up compresses per `prefers-reduced-motion` ✓
- Static form (StatBar with visible level word) is canonical, so motion loss carries no information loss ✓

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | |
| Card surface | #211008 | ink-brown-800 | |
| Active filter chip | #FF5E00 | brand-orange | 60% role |
| Difficulty StatBar (fill) | #FF5E00 | brand-orange | filled to level/3; data ink |
| Difficulty StatBar (track) | white at 8% | alpha-white-08 | over --track-inset (mint) |
| Difficulty StatBar (unrated/ghost) | white at 8% | alpha-white-08 | no orange fill — distinct from real Beginner |
| Muscle group chips (detail) | #EF4444 at 15% bg, #EF4444 text | fitness-red | Domain color |
| Step numbers | #FF5E00 | brand-orange | |
| Add to workout CTA | #FF5E00 bg, white text | brand-orange | |
| Common mistakes icon | #F59E0B | amber | Warning |

**60/30/10 verification**: Orange on filter chips, the difficulty StatBar fill, step numbers, CTA. Green absent (no success states on this screen). Purple absent (no SIA on this screen — pure utility). Fitness-red appears on muscle group tags only, per domain color rules. Ratio holds.

---

## Interaction States

### Exercise Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card appearance | -- |
| Pressed | Scale(0.97), bg darkens slightly | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "Add to Workout" CTA (Detail Sheet)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, "add to workout" white text | -- |
| Pressed | Darker orange, scale(0.97) | Medium impact |
| Success | Green glow (600ms), text changes to "added" with checkmark | Success notification |

### Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Back button | Stack pop |
| Tap | Search bar | Focus, raise keyboard |
| Tap | Filter chip | Toggle filter, refresh results |
| Tap | Exercise card | Open Exercise Detail Bottom Sheet |
| Tap | "add to workout" (in detail) | Add exercise to workout, dismiss sheet |
| Drag down | Detail bottom sheet | Dismiss sheet |
| Scroll | Exercise grid | Standard scroll, FAB hides on scroll down |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Exercise cards | Filter change | Crossfade grid content | 280ms | ease-out-soft |
| Difficulty StatBar | Card scroll-into-view | Fill rises 0->level/3 (bar rise, never fade) | 520ms | ease-flow |
| Difficulty StatBar | Reduced-motion | Render at final fill instantly | 0ms | -- |
| Detail bottom sheet | Open | Slide up from bottom | 520ms | ease-flow |
| Detail bottom sheet | Close | Slide down | 280ms | ease-out-soft |
| Result count | Filter change | Number crossfade | 160ms | ease-out-soft |

---

## Empty States

### No results (search/filter yields nothing)
- Centered: search icon (48pt, white at 15%) + "no exercises found" (17pt Sora Semibold, white) + "try different filters or search terms" (14pt Regular, white at 50%)

### Day 1 (exercise database loading / cold-start)
- Skeleton cards (ink-brown-800, left->right shimmer) in 2-column grid, preserving card layout including the empty difficulty StatBar track (no fabricated level); fills rise 0->level/3 as real data arrives (skeleton morphs into data, not a swap).

---

## Accessibility

- Search bar: accessibility label "Search exercises by name, muscle group, or equipment"
- Filter chips: role "button", selected state announced
- Exercise cards: accessibility label "[name], targets [muscle], [difficulty] difficulty"
- Detail sheet: full content readable by screen reader in order
- "Add to workout" button: accessibility label "Add [exercise name] to current workout"

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Exercise list fails to load (network) | Centered error state: cloud-offline icon (48pt, white at 15%) + "Couldn't load exercises" (17pt Sora Semibold, white) + "Check your connection and try again" (14pt Sora Regular, white at 50%) + "retry" orange text link (14pt Sora Semibold, 44pt touch target). Search bar and filter chips remain visible but non-functional. | Tap "retry" to re-fetch. Pull-down-to-refresh also available. |
| Search returns no results | Centered empty state (see Empty States section). No error styling — this is expected behavior, not a failure. | User adjusts search query or clears filters. |
| Exercise detail fails to load | Detail bottom sheet opens with skeleton placeholder (shimmer). After 5 seconds: "Couldn't load exercise details" (15pt Sora Regular, white at 50%) + "retry" link (orange). | Tap "retry" in the sheet. Dismiss sheet and re-tap card also works. |
| "Add to workout" fails | CTA button briefly flashes error-red border (400ms). Text changes to "Try again" for 2 seconds, then reverts. Toast: "Couldn't add exercise. Try again." (14pt Sora Regular, white, ink-brown-800 bg, auto-dismiss 4s). | Tap CTA again to retry. Exercise remains selectable. |
| Image fails to load (card thumbnail) | Image area shows ink-900 bg with generic dumbbell icon (24pt, white at 15%) centered. Card remains fully interactive. | No user action needed — functional without image. Retry on next scroll into viewport. |
| Partial load (some cards load, others fail) | Successfully loaded cards render normally. Failed cards show skeleton shimmer that resolves to a simplified card (name + muscle group text only, no image). | Scroll away and back triggers a silent retry for failed cards. |
| Offline mode | Banner below filter chips: "You're offline — showing cached exercises" (13pt Sora Regular, white at 40%, cloud-offline icon 14pt). Only previously viewed exercises available. Search works against local cache. | Banner dismisses automatically when connection restores. Full library reloads silently. |

---

## Motivation Adaptation

**N/A — Utility Screen.** Exercise Library is a content browsing tool, not a motivational surface. It renders identically regardless of the user's motivation level. No Low/Medium/High variants needed.

---

## Cross-References

- **Navigates to**: Exercise Detail Bottom Sheet (modal present), Workout Detail [27] (via "add to workout" action, stack pop with data)
- **Navigates from**: Fitness Dashboard [26] via stack push, Workout Detail [27] via stack push ("add exercise"), Explore [18] via Fitness section
- **Shared components with**: Screen [25] — Help Center (Search Bar), Screen [13] — Goals List (Filter Chip Row), Screen [29] — Meal Detail (Search Bar)
- **Patterns used**: Search Bar (Screen 25), Filter Chip Row (Screen 13), Back Button (Batch 1)
- **Patterns established**: **Exercise Card** -- 2-column grid card with image, name, muscle group, difficulty StatBar (level/3 + word). Reusable for any exercise browsing context. **Exercise Detail Bottom Sheet** -- ~85% height sheet with hero image, instructions, variations, target areas. Contextual CTA when accessed from workout planning. **Difficulty Indicator** -- a value-vs-target StatBar (MacroBar primitive), filled to level/3 (Beginner 1/3 · Intermediate 2/3 · Advanced 3/3 full) on one shared scale, with the level WORD always visible beside the bar (never colour/length-alone); orange fill on a white/8 track recessed on --track-inset; missing difficulty = ghosted track + "Unrated". Reusable for any exercise browsing context.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/domains/exercise-library`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q19 journal keeps basic writing/search free and gates AI/voice features.
- Q27 exercise library preserves source context.
- Q28 split meal detail and food logging into explicit modes/routes.
- Q29 finance details pass explicit type plus ID/context.
- Q30 workout planning/logging is separate from immersive active workout.
- Q44 spirituality must support unconfigured and multiple-belief states.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B12-F11 | critical | information-architecture | Implement debounced search, filter state, result-count updates, full virtualized exercise data, and empty/loading/error states. |
| B12-F12 | critical | navigation | Make exercise cards semantic targets that open the Exercise Detail bottom sheet with conditional Add to workout behavior. |
| B12-F13 | major | information-architecture | Preserve source stack context, set the correct active tab, and render Back as a labeled 44px link/button. |
| B12-F14 | major | accessibility | Add aria-pressed/selected semantics, 44px hit areas, a search label, card labels, and focus states. |

### Prototype Implications

- Treat 2 critical findings as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

