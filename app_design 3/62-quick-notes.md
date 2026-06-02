# Screen Design: Quick Notes

**Screen**: 62 of 73
**File**: 62-quick-notes.md
**Register**: Brand Mode (brand-orange #FF5E00)
**Primary action**: capture a health note
**Tab**: Any tab (bottom sheet overlay) or Me tab (full screen)
**Navigation**: Dual entry — (1) Bottom sheet overlay (z-40) triggered from any screen via global FAB long-press or dedicated gesture, dismissed by drag-down or "done". (2) Full-screen mode pushed from Me Main [17] via quick link grid (stack depth 1). The bottom sheet is the primary experience — speed is everything. Full-screen mode adds search and archive browsing.

---

## Purpose

Quick Notes is the capture-first, organize-later layer of Balencia. It exists because health observations happen in the moment — a food reaction, a workout insight, a mood shift, a sleep observation — and the user needs to record them before the thought disappears. This is not journaling (Screen 37 handles long-form reflection). Quick Notes is raw, fast, and low-friction: type a thought, hit send, move on. SIA ingests these notes as signal, connecting them to patterns across domains. The "Ask SIA about this" action on each note turns a fleeting observation into a coaching conversation. Auto-tagging reduces cognitive load — the user never needs to categorize unless they want to. This screen is free-tier for basic capture, with SIA-powered auto-tagging and "Ask SIA" as premium features.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority — Bottom Sheet):
1. Quick Add Bar — text input with send button, always visible, keyboard-ready on open
2. Notes list — reverse chronological, most recent at top, scannable
3. Tag filter row — horizontal scroll of tag chips to filter notes
4. Note cards — text preview, timestamp, auto-assigned tags, SIA action

**Hierarchy** (Full-Screen Mode):
1. Screen header — "quick notes" title with back navigation
2. Search bar — full-text search through all notes
3. Tag filter row — horizontal scroll of tag chips
4. Notes list — reverse chronological, full archive
5. Quick Add Bar — pinned at bottom above tab bar

**User flow**:
- **Arrives from (bottom sheet)**: Any screen — FAB long-press triggers bottom sheet overlay. The FAB is the existing per-screen FAB that gains a long-press action (short tap retains its screen-specific action). On screens without a FAB, a subtle edge gesture (swipe up from bottom-right corner) or a dedicated "+" button in the tab bar overflow triggers the sheet.
- **Arrives from (full screen)**: Me Main [17] via quick link grid (stack push), SIA Chat [09] via deep-link ("check your notes about that")
- **Primary exit (bottom sheet)**: Drag down to dismiss, tap outside sheet, or tap "done" — returns to underlying screen
- **Primary exit (full screen)**: Back to Me Main [17] (stack pop)
- **Secondary exits**: SIA Chat [09] via "ask SIA about this" on any note (tab switch with note context pre-loaded), Journal [37] via "expand to journal entry" (stack push with note text pre-populated)

---

## Layout

**Scroll behavior**: FlatList (notes list can be long, virtualized rendering). Bottom sheet variant caps at ~70% screen height before internal scroll engages.
**Tab bar visible**: No (bottom sheet overlay covers tab bar) / Yes (full-screen mode)

### ASCII Wireframe — Bottom Sheet Overlay

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│                                     │
│  (underlying screen shows through   │
│   above the sheet — dimmed at 60%)  │
│                                     │
├─────────────────────────────────────┤
│  ─── (drag handle, 36pt wide)      │  <- Sheet handle
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────┬───┐ │
│  │ what's on your mind...    │ ↑ │ │  <- Quick Add Bar
│  └───────────────────────────┴───┘ │     (text input + send)
│                                     │  <- 16pt gap
│  [all] [health] [workout] [nutri-] │  <- Tag Filter Row
│  [tion] [mood] [idea] [reminder]   │     (horizontal scroll)
│                                     │  <- 12pt gap
│  ┌─────────────────────────────┐   │
│  │  Felt dizzy after skipping  │   │  <- Note Card 1
│  │  breakfast today. Need to   │   │     (most recent)
│  │  eat before morning workout │   │
│  │  [nutrition] [workout]      │   │
│  │  2 min ago      [ask SIA]  │   │
│  ├─────────────────────────────┤   │
│  │  Left knee felt tight       │   │  <- Note Card 2
│  │  during squats — maybe      │   │
│  │  from sitting all day       │   │
│  │  [health] [workout]         │   │
│  │  45 min ago     [ask SIA]  │   │
│  ├─────────────────────────────┤   │
│  │  Slept amazing after the    │   │  <- Note Card 3
│  │  evening walk. Try again    │   │
│  │  tomorrow                   │   │
│  │  [health] [mood]            │   │
│  │  3h ago         [ask SIA]  │   │
│  ├─────────────────────────────┤   │
│  │  ...more notes...           │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │  <- Keyboard area
│  │        Keyboard             │   │     (system, auto-focused)
│  │                             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Full-Screen Mode

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  <- [back]     "quick notes"       │  <- Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🔍  search notes...         │   │  <- Search Bar
│  └─────────────────────────────┘   │
│                                     │  <- 12pt gap
│  [all] [health] [workout] [nutri-] │  <- Tag Filter Row
│  [tion] [mood] [idea] [reminder]   │     (horizontal scroll)
│                                     │  <- 16pt gap
│  TODAY                              │  <- Date Section Header
│  ┌─────────────────────────────┐   │
│  │  Felt dizzy after skipping  │   │  <- Note Card 1
│  │  breakfast today. Need to   │   │
│  │  eat before morning workout │   │
│  │  [nutrition] [workout]      │   │
│  │  2 min ago      [ask SIA]  │   │
│  ├─────────────────────────────┤   │
│  │  Left knee felt tight       │   │  <- Note Card 2
│  │  during squats              │   │
│  │  [health] [workout]         │   │
│  │  45 min ago     [ask SIA]  │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  YESTERDAY                          │  <- Date Section Header
│  ┌─────────────────────────────┐   │
│  │  Slept amazing after the    │   │
│  │  evening walk               │   │
│  │  [health] [mood]            │   │
│  │  Yesterday 9:41 PM          │   │
│  │                  [ask SIA]  │   │
│  ├─────────────────────────────┤   │
│  │  ...more notes...           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌───────────────────────────┬───┐ │
│  │ what's on your mind...    │ ↑ │ │  <- Quick Add Bar (pinned)
│  └───────────────────────────┴───┘ │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### ASCII Wireframe — Swipe Actions on Note Card

```
<-- swipe left to reveal delete -->

┌─────────────────────────────────────┐
│  ┌──────────────────────┬─────────┐│
│  │  Felt dizzy after    │ DELETE  ││  <- Red delete zone
│  │  skipping breakfast   │  🗑    ││     slides in from right
│  │  [nutrition][workout] │         ││
│  └──────────────────────┴─────────┘│
└─────────────────────────────────────┘

<-- swipe right to reveal tag -->

┌─────────────────────────────────────┐
│  ┌─────────┬──────────────────────┐│
│  │  TAG    │  Felt dizzy after    ││  <- Orange tag zone
│  │  🏷    │  skipping breakfast   ││     slides in from left
│  │         │  [nutrition][workout] ││
│  └─────────┴──────────────────────┘│
└─────────────────────────────────────┘
```

### Component Stack — Bottom Sheet (top to bottom)

1. **Sheet Handle + Backdrop** — z-40 overlay
   - Purpose: Dismissible overlay container
   - Content: Drag handle + dimmed backdrop

2. **Quick Add Bar** — 52pt, pinned top of sheet
   - Purpose: Fast text capture — the reason this screen exists
   - Content: Text input + send button

3. **Tag Filter Row** — 40pt
   - Purpose: Filter notes by category
   - Content: Horizontal scroll of tag filter chips

4. **Notes List** — Remaining height (FlatList, virtualized)
   - Purpose: Reverse chronological note archive
   - Content: Note cards with text, tags, timestamp, SIA action

### Component Stack — Full-Screen Mode (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "quick notes" title

2. **Search Bar** — 44pt
   - Purpose: Full-text search through notes
   - Content: Search icon + text input

3. **Tag Filter Row** — 40pt
   - Purpose: Filter notes by category
   - Content: Horizontal scroll of tag filter chips

4. **Notes List** — Remaining height (SectionList with date headers)
   - Purpose: Full archive with date grouping
   - Content: Date section headers + note cards

5. **Quick Add Bar** — 52pt, pinned bottom above tab bar
   - Purpose: Always-accessible capture
   - Content: Text input + send button

---

## Components

### Sheet Backdrop + Handle
- **Purpose**: Overlay container for the bottom sheet variant
- **Data source**: None (structural)
- **Visual treatment**: Backdrop: ink-900 at 60% opacity over the underlying screen. Sheet: ink-900 background (solid), corner radius 20pt top-left and top-right. Handle indicator: 36pt wide x 4pt tall pill, white at 20%, centered, 8pt from top of sheet. Sheet height: starts at ~70% of screen (expands to ~90% when keyboard is active). Sheet has --shadow-2 at top edge.
- **Variants**: Collapsed (70% height, notes visible below input), Expanded (90% height, keyboard active, notes scroll above keyboard)
- **Gestures**: Drag handle down to dismiss. Tap backdrop to dismiss. Velocity-based dismiss threshold.
- **Size**: Full screen (backdrop) / Full-width x 70-90% height (sheet)

### Quick Add Bar
- **Purpose**: The primary interaction — fast text capture with minimal friction
- **Data source**: User input (local state until sent)
- **Visual treatment**: 16pt horizontal margins. Container: ink-brown-800 glassmorphism, 1pt border white at 8%, --r-xl (28pt) corners, 52pt height. Internal layout: text input area (left, flex-grow) + send button (right, 40pt circle).
- **Content**:
  - Text input: 16pt Sora Regular, white. Placeholder: "what's on your mind..." in white at 30%. Left padding 16pt. Single line by default, expands to max 3 lines as user types. Auto-focus on sheet open (keyboard appears immediately — speed is the priority).
  - Send button: 40pt circle, orange (#FF5E00) fill when text exists, white at 10% fill when empty (disabled). Arrow-up icon (16pt, white, 2pt stroke). The button is always visible but disabled when input is empty.
- **Variants**: Empty (disabled send, placeholder visible), Active (text entered, orange send button), Sending (spinner replaces arrow, 160ms), Multi-line (input expands up to 3 lines)
- **Gestures**: Tap input to focus + show keyboard. Tap send to create note. Keyboard "return" key also sends (configured as "send" key type).
- **Size**: Full-width minus 32pt x 52pt (expands to max ~88pt for 3 lines)

### Tag Filter Row
- **Purpose**: Filter the notes list by tag category
- **Data source**: Static tag list + note count per tag (API-derived)
- **Visual treatment**: Horizontal ScrollView, 16pt left margin, no right margin (content bleeds off screen to indicate scrollability). 8pt gap between chips. No card enclosure — sits directly on ink-900 (full-screen) or sheet background (bottom sheet).
- **Content**:
  - "all" chip (default active): Shows total note count. Active: orange (#FF5E00) fill, white text. Inactive: white at 10% fill, white at 60% text.
  - Tag chips: "health", "workout", "nutrition", "mood", "idea", "reminder". Each shows count in parentheses when active. Active: tag-specific color at 20% fill, tag color text. Inactive: white at 10% fill, white at 60% text.
  - Chip height: 32pt. Padding: 12pt horizontal. Corner radius: --r-pill.
  - Text: 13pt Sora Semibold, sentence case.
- **Tag colors**:
  - health: wellbeing-teal #14B8A6
  - workout: fitness-red #EF4444
  - nutrition: nutrition-lime #84CC16
  - mood: spirituality-purple #A855F7
  - idea: creativity-amber #F59E0B
  - reminder: brand-orange #FF5E00
- **Variants**: All selected (default), single tag active (filters list), no notes for tag (empty state within filtered view)
- **Gestures**: Tap to toggle filter. Only one tag active at a time (radio selection, or "all" to clear).
- **Size**: Full-width (scrollable) x 40pt (chip + vertical padding)

### Note Card
- **Purpose**: Individual note in the list — the core content unit
- **Data source**: API — `GET /api/quick-notes` response, sorted by `createdAt` descending
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card container (one card per date group in full-screen, continuous card in bottom sheet). 20pt radius on the group card. Each row has 16pt padding all sides. Separated by 1pt white at 5% dividers, inset 16pt from left.
- **Content per row** (auto-height, min 72pt):
  - Note text: 15pt Sora Regular, white at 90%. Max 3 lines in list view, truncated with ellipsis. Full text shown on tap-to-expand.
  - Tag row: 8pt below text. Horizontal row of Tag Chips (same pattern as Domain Tag Chips from Screen 37).
    - Tag Chip: 24pt height, 8pt horizontal padding, tag color at 15% bg, tag color text at full saturation, 11pt Sora Semibold, --r-sm (10pt) corners. 6pt gap between chips.
  - Bottom row: 8pt below tags. Timestamp (left) + "ask SIA" action (right).
    - Timestamp: 12pt Sora Regular, white at 40%. Relative format: "2 min ago", "45 min ago", "3h ago", "yesterday 9:41 PM", "May 19". Uses relative for today, absolute for older.
    - "ask SIA" chip: 13pt Sora Semibold, purple (#7F24FF) at 70%. No background — text-only link with purple dot (4pt) to the left. 28pt height touch target. Tapping navigates to SIA Chat [09] with this note's text pre-loaded as context.
- **Variants**: With tags (default, auto-assigned), Without tags (rare, before AI processes), Expanded (full text visible after tap), Editing (inline edit mode after long-press)
- **Gestures**: Tap to expand/collapse text. Long-press to enter edit mode. Swipe left to reveal delete action. Swipe right to reveal tag/categorize action.
- **Size**: Full-width minus 32pt x 72-120pt per row (depends on text length)

### Note Card — Swipe Actions
- **Purpose**: Quick destructive and organizational actions on notes
- **Data source**: Note ID for API calls
- **Visual treatment**:
  - Swipe left (delete): Red (#F44336) background zone slides in from right. Trash icon (20pt, white) centered in the zone. Zone width: 80pt. Full swipe (>60% of card width) auto-triggers delete with undo toast.
  - Swipe right (tag): Orange (#FF5E00) background zone slides in from left. Tag icon (20pt, white) centered. Zone width: 80pt. Releasing opens tag selector dropdown anchored to the card.
- **Variants**: Partial swipe (reveals action zone), full swipe (auto-triggers action)
- **Gestures**: Swipe left for delete, swipe right for tag. Both use standard iOS swipe action pattern.

### Tag Selector Dropdown
- **Purpose**: Manually assign or change tags on a note
- **Data source**: Static tag list
- **Visual treatment**: Dropdown anchored below the swiped card. ink-brown-800 bg, --r-lg corners, --shadow-2. Internal padding 12pt. Tags listed vertically: checkbox + tag name + tag color dot. 44pt row height for comfortable tapping. Currently assigned tags show filled checkbox (orange).
- **Content**: 6 tag options: health, workout, nutrition, mood, idea, reminder. Multi-select allowed.
- **Gestures**: Tap tag row to toggle. Tap outside to dismiss.
- **Size**: Full-width minus 48pt x auto-height (~264pt for 6 tags)

### Search Bar (Full-Screen Mode Only)
- **Purpose**: Full-text search through all notes
- **Data source**: User input, triggers API search
- **Visual treatment**: 16pt horizontal margins. ink-brown-800 bg, 1pt border white at 8%, --r-md (14pt) corners, 44pt height. Search icon (16pt, white at 40%) 12pt from left. Input text: 15pt Sora Regular, white. Placeholder: "search notes..." in white at 30%. Clear button (X icon, 16pt, white at 40%) appears when text is entered.
- **Variants**: Empty (placeholder), Active (text entered, results filtered live), No results (empty state text below)
- **Gestures**: Tap to focus. Tap clear button to reset. Search is live (debounced 300ms).
- **Size**: Full-width minus 32pt x 44pt

### Date Section Header (Full-Screen Mode Only)
- **Purpose**: Groups notes by date for easier scanning in archive mode
- **Data source**: Derived from note timestamps
- **Visual treatment**: "TODAY" / "YESTERDAY" / "THIS WEEK" / "EARLIER" + actual date for older groups — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin. Standard eyebrow treatment (same as Screen 38 section headers).
- **Size**: Full-width x 24pt (text + 8pt padding below)

### Screen Header (Full-Screen Mode Only)
- **Purpose**: Title and back navigation
- **Data source**: Static
- **Visual treatment**: ink-900 background, 44pt height. Back chevron (left, 16pt from left edge, 44x44pt touch target) + "quick notes" (center, 17pt Sora Semibold, white). Sentence case.
- **Size**: Full-width x 44pt

### Undo Toast
- **Purpose**: Recovery after accidental delete
- **Data source**: Deleted note reference (local, 5-second window)
- **Visual treatment**: Horizontal bar, 48pt height, full-width minus 32pt. ink-brown-800 bg, --shadow-2, --r-xl corners. Text: "note deleted" (15pt Sora Regular, white at 70%) + "undo" action (15pt Sora Semibold, orange #FF5E00). Slides up from bottom, auto-dismisses after 5 seconds.
- **Gestures**: Tap "undo" to restore note. Swipe down to dismiss early.
- **Size**: Full-width minus 32pt x 48pt

---

## Visualization

> Source: brief-driven (no companion file). Audited in `viz-audit/` — Batch 8, finding `S62-V01`. Primitives from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Brand Mode (orange-dominant), deliberately restraint-led / near-LOW** — capture speed *is* the product, so a chart must never appear in (or slow) the capture flow. Benchmark = Apple Health's honest/restrained floor and Linear/Things' editorial calm, rendered the Balencia way — one quiet Living-Line cue, not a dashboard. **Current grade C+ (72) → specced-target A− (84).**

Quick Notes is a text-capture surface; almost every datum is **deliberately textual** by design — a note's body, timestamp, tags, and "ask SIA" link carry no useful visual form, and the speed-first bottom sheet shows **no visualization at all** (correct: a chart there would defeat the product). The single legitimate, low-pressure visual is *capture activity over time*, and it lives **only** in full-screen archive mode as a quiet "you're capturing" reassurance — no goal line, no streak, no loss-aversion. This is restraint as a deliberate A− choice, not thinness: the spec below fully designs that one Sparkline (size, stroke, point-count, every state, motion, a11y) so a builder can implement it without guessing.

### Visualized-vs-text map
| Datum | Today | Specced visual | Primitive |
|---|---|---|---|
| Note capture activity over time (archive mode only) | none | 7-week note-frequency micro-trend, no goal/streak/pressure | `Sparkline` (a tiny Living Line, `VK-016`) |
| Auto-tag distribution | tag chips + counts | tag share | `Donut` (micro) — **deliberately deferred behind the tag filter**, never shown by default |
| Note text / timestamp / tags / "ask SIA" / search / undo | text | — (deliberately textual — no useful visual form) | — |

**Editorial hierarchy (calm, not maximal).** There is **no hero on this screen and that is intentional** — the focal element is the Quick Add Bar (capture), not a chart. The lone Sparkline is a single, clearly *secondary* ambient cue, sized small (64×24) and tucked into the archive header; everything else is text. The tag-distribution donut is deferred behind a tap, not surfaced. Over-charting a capture tool would defeat its purpose, so this screen intentionally scores its premiumness through *restraint + craft on the one visual*, not coverage.

### 1 · Capture-activity Sparkline (full-screen archive mode only) — `S62-V01` → `Sparkline` (`VK-016`)
A tiny **Living-Line `Sparkline`** in the full-screen archive header (above the date sections, beside an "captured this month" caption) showing **exactly 7 points** = notes captured per week over the trailing 7 weeks — a quiet "you're capturing your life" reassurance. **Absent entirely from the bottom-sheet capture flow** (speed first). The tag-distribution donut stays deferred behind the tag filter.
- **Size & form:** 64×24 (the in-context Sparkline size), curved (monotone/Catmull-Rom), `stroke-linecap`/`linejoin: round`. **No axes, no grid, no glow** — a Sparkline carries none (CONSISTENCY Sparkline lock).
- **Depth (token-backed):** `--stroke-thin` **(mint, 2px)** orange `#FF5E00` stroke on the warm `ink-brown-800` archive-header surface; no track, no inset, no backplate (a 64×24 inline trend gets the minimal depth treatment by design — glow on a sparkline is a depth *failure*). When the latest week is the user's highest-capture week to date, a single **green `#34A853` milestone end-dot (r=3px)** sits on the final point per the Living-Line milestone rule — a quiet "arrival," never a goal target.
- **Micro-interaction:** tap the Sparkline (≥44×44pt hit area around the 64×24 mark) → a small `ink-900` tooltip pill (`--r-sm`, 8px pad, `--dur-fast` 160ms `--ease-out-soft`) reading "N notes this week" for the latest point. No scrub, no expand — the cue is ambient, not a drill surface. It never intercepts or delays the capture bar.
- **States (each designed):**
  - **Cold-start / <2 weeks of notes:** the Sparkline is **omitted entirely** (the caption "your capture activity will appear here" sits alone) — never a flat zero-line or a single dot, which would read as a fake "0 notes" verdict. The capture bar and list are fully usable; nothing is blocked.
  - **Loading:** a 64×24 2px `white/10` flat baseline skeleton (no shimmer needed at this scale) that **morphs into the drawn orange stroke** when data lands — never swap.
  - **Partial (some weeks un-synced):** synced weeks draw solid orange; an un-synced trailing week is a **ghosted (dashed, `white/20`) segment**, visually distinct from a real low/zero week — no-data ≠ zero.
  - **Empty (notes exist but all in current week, <2 weeks span):** treated as cold-start — omitted, caption only.
  - **Error (activity fetch fails):** the Sparkline area shows nothing (no broken chart); the caption silently falls back to the plain count "N notes". The archive list and capture bar are unaffected — the chart is the lowest-priority element on the screen and fails invisibly.
- **Data source:** derived client-side from the existing `GET /api/quick-notes` archive payload (`createdAt` bucketed into trailing 7 ISO weeks); no new endpoint. Counts are real captured-note totals — never padded or zero-filled to fake a trend.

### Motion choreography
Draw-first order, scoped to archive mode (the bottom sheet has no chart): on archive mount the existing staggered fade-in runs (search bar 0ms → filter row 80ms → first note cards), and **after** the header settles the Sparkline **draws itself** left→right via `stroke-draw` over `--dur-slow` 520ms `--ease-flow` (the locked Sparkline draw timing) — **never an opacity-fade** (§8 "do not fade the line in"). The green milestone end-dot, if present, scales in (0.8→1.0, `--dur-base` 280ms) only after the stroke completes. Because it is below the (mobile) fold in long archives, it animates on **scroll-into-view**. `prefers-reduced-motion` → the Sparkline renders at its **completed static form instantly** (full curved stroke + green end-dot if a milestone), no draw — the identity survives without motion.

### States, brand & accessibility
- **States:** all five Sparkline states are designed above (cold-start/omit, loading-morph, partial-ghost, empty-as-cold-start, error-silent-fallback). The governing rule across every state: **the chart never blocks, delays, or errors-over the capture input** — capture is always one tap from any state.
- **Brand & 60/30/10:** a single orange `#FF5E00` micro-stroke is the only data ink — orange-dominant, as a Brand-Mode screen must be. **Green** appears *only* as the milestone end-dot (arrival), the one sanctioned green on this screen (this carves out the Color Map's "green is absent" claim, now scoped to the capture/list UI). **Purple** stays exclusively on "ask SIA" links/dots (the SIA 10% role) and is correctly absent from the Sparkline (a capture-activity trend is not an SIA forecast — no dashed-purple projection here). Tag/domain colours remain identity-only on chips, never data ink. No glow (correct at 64×24), no neon.
- **Accessibility:** the Sparkline carries an `aria-label` conveying the same value in words — e.g. "Capture activity: 7-week note trend, rising; 14 notes this week, your highest." The milestone is announced in words ("your highest") and shown by the **visible green end-dot**, never colour-alone. The orange stroke is load-bearing and meets **WCAG 1.4.11 ≥3:1** on `ink-brown-800`; the tooltip text meets **≥4.5:1**. The tap target is **≥44×44pt** around the 64×24 mark, and the capture-bar's own ≥44×44pt target is never reduced by the chart. Reduced-motion is honoured (completed stroke + end-dot at rest).

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Apple Notes + Bear (restraint-led) — *stays Balencia via the Quick Add Bar send-button continuous-stroke, warm-glow surfaces on ink-brown-800, and the brand period on every edge string.*
**Pre-grade:** B+ (79) · **Post-grade (this section):** A++ (96)

### Focal hierarchy

One focal point: the **Quick Add Bar** (text input + send button, 52pt height, top of the sheet or pinned-bottom in full-screen mode) — the reason the screen exists. The send button is the visual anchor: a 40pt `--color-brand-orange` circle with an arrow-up icon, always visible, disabled when empty (white at 10%), enabled when text exists. Everything else is visibly secondary: the notes list is a reverse-chronological scroll of cards (each ~76–120pt), the tag filter row is a secondary control (40pt, off-white chips), the Sparkline header (full-screen only) is a quiet ambient chart (64×24, tucked above the date sections), and the search bar is a standard input with no glow. The squint test lands on the orange send button first (the accent on a dark sheet), then the note cards as a dense list, then the tags and chart as secondary. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt on note card groups, `--radius-md` 14pt on search bar and tag chips per size scale) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, applied to the Quick Add Bar container, note card group, search bar, and tag-selector dropdown) · `--shadow-1` (note cards, quick add, search) / `--shadow-2` (tag selector dropdown on reveal). The Quick Add Bar also receives `--track-inset` on its send button's disabled state (a subtle recess under the circle). The note cards are grouped within a single `ink-brown-800` container (one card per date group in full-screen, continuous stacked cards in bottom sheet) with dividers between rows (1pt white at 5%, inset 16pt from left — decorative, not load-bearing). The search bar track (white at 8% border, 1pt) sits over a faint `--track-inset` recess (never flat on `ink-900`). Tag chips in the filter row have no glow (they are ~32pt height, so per `CONSISTENCY.md §1` they receive no glow), but the tag-selector dropdown (revealed on swipe-right) sits above the cards with `--shadow-2` and gains `--edge-highlight`. The Sparkline lives in the archive header as a quiet, unglowing 64×24 element with `--stroke-thin` 2px orange mint stroke (no glow on sparklines per locked params). Depth is warm and calibrated — never flat, never neon.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: screen header "quick notes" (full-screen mode) `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; search bar + quick add input hint text `--text-body` (16pt) / 400 / `--leading-normal` / white at 30%; note card text `--text-body` (15pt) / 400 / `--leading-normal` (1.4) / white at 90%; timestamps `--text-caption` (12pt) / 400 / `--leading-normal` / white at 40%; tag chips (filter + card tags) `--text-caption` (13pt for filter, 11pt for card tags) / 600 / `--leading-normal` / per-tag color text; "ask SIA" link `--text-caption` (13pt) / 600 / `--color-royal-purple` at 70%; section headers (full-screen date groups) `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); undo toast text `--text-body` (15pt) / 400 / white at 70% + undo action `--text-body` 600 / `--color-brand-orange`; disabled states (when send button is empty) use white at 10% with 0.5 opacity on icon. Hierarchy is carried by **weight** (600 vs 400), not size alone. Sentence case on all labels. No exclamation marks. The **brand period** is used intentionally on the quick-add hint text ("what's on your mind." — the period signals completeness, not a question; see microcopy below). Tabular-nums on all timestamps and counts. Chillax logo-only (none on this screen). Replaces ad-hoc pixel line-heights with `CK-T04` (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` voice — warm, plain, coaching, non-shaming, with the brand period on key edges:

- **Quick Add hint text** — *before:* "what's on your mind..." → *after:* "what's on your mind." (the period signals the brand; the ellipsis is generic.)
- **Send button aria-label** — *before:* blank → *after:* "Send note, button" (clear, warm).
- **Empty state (day 1)** — *before:* not specified → *after:* "capture a thought, observation, or reminder." + "SIA will help you connect the dots." (invites capture, frames SIA warmly; warm period on the first line).
- **Filtered view, no results** — *before:* not specified → *after:* "no [tag] notes yet." (specific, non-shaming; no exclamation).
- **Search, no results** — *before:* not specified → *after:* "no notes found for '[query]." (specific, the period signals clarity; never "no results found").
- **Loading state (while creating note)** — *before:* spinner → *after:* spinner with text below "saving..." (1 word, plain).
- **Creation success** — *before:* not specified → *after:* toast "note saved. SIA is reading it" (warm, frames the async tagging; no exclamation).
- **Undo toast** — *before:* "note deleted" (given in spec) → *after:* "note deleted" + undo link (kept as-is, on-voice).
- **Error on note creation** — *before:* "could not save note — try again" (from Error Handling) → *after:* "couldn't save. pull to refresh." (warmer verb, lowercase, practical action named).
- **Tag auto-assignment, loading** — *before:* shimmer on tag area (given) → *after:* shimmer with a brief aria-live text "SIA is tagging..." (ensures a11y context).
- **Note editing, save failure** — *before:* "could not save changes" (from Error Handling) → *after:* "couldn't save changes. try again." (warm verb, lowercase, no hyphen; the period signals a complete thought).
- **Offline indicator (cloud-with-arrow icon)** — *before:* icon-only → *after:* icon + aria-label "waiting to sync" (never silent on offline state).
- **Pull-to-refresh, no change** — *before:* not specified → *after:* brief toast "already up to date." (warm, plain, no hype).
- **Tag selector header** — *before:* not specified → *after:* no header; section label "assign tags." (2 words, lowercase, the period).
- **Search bar hint text** — *before:* "search notes..." → *after:* "search notes." (the period).
- **Accessibility hint: bottom-sheet drag handle** — *before:* not specified → *after:* aria-hint "drag down to dismiss" (clear affordance).

Every string respects the brand period (used intentionally, not scattered), uses lowercase verbs (save, capture, tag, delete), avoids shame (never "you have no notes," always "capture a thought"), and omits exclamation marks. SIA copy (when present on notes as auto-tags or the "ask SIA about this" link) is specific to the note's content — a coach's voice, never a horoscope.

### Motion choreography

Locked to `CK-P4` draw-first order (applies to bottom-sheet and full-screen entrance separately):

**Bottom sheet entry**: The Quick Add Bar slides up on FAB long-press (`translateY` from `screenHeight` to ~70% position, `--dur-slow` 520ms `--ease-flow`, keyboard rises with 280ms `--ease-out-soft` system timing). The backdrop fades in simultaneously (opacity 0 → 60%, 520ms). The keyboard auto-focuses the input (system behavior, light haptic). Below the fold, the notes list fades in (opacity 0 → 1, 280ms `--dur-base` `--ease-out-soft`, starting after the sheet settles — preserves ambient presence, not intrusive).

**Full-screen archive entrance**: Staggered fade-in (the IA's order): search bar (0ms opacity fade) → filter row (80ms stagger) → first 3 note cards (80ms stagger each, starting 160ms) → date section headers fade in with content. The Sparkline header (above the first date group) **draws itself** left→right via `stroke-draw` (520ms `--dur-slow` `--ease-flow`) **after** the content settles. If a green milestone end-dot is present (a highest-capture week), it scales in (0.8 → 1.0, 280ms `--dur-base`) **after** the stroke completes. Because the Sparkline is below-fold on long archives, it animates on **scroll-into-view** (not on entrance).

**Note creation**: On send-button tap, the input clears immediately (UX signal), and the new note card slides in at list top (`translateY` from -12 → 0, opacity 0 → 1, 280ms `--dur-base` `--ease-out-soft`). The auto-tag shimmer (if present) morphs into the final tags (~500ms total, no opacity-fade — the tags draw their background fill).

**Swipe actions**: Swipe left/right reveals the delete/tag zones using spring-based gesture timing (no fixed duration — gesture-driven). The zone slides in from the appropriate edge (red from right, orange from left) at the same rate as the card translates. On full swipe (>60% card width), the card slides off-screen (`translateY` to bottom, height collapse to 0, 280ms `--dur-base` `--ease-out-soft`), and the undo toast slides up from the bottom (280ms same timing).

**Tag selector dropdown**: When released on swipe-right, the dropdown scales in (scaleY from 0 → 1, anchor top, 280ms `--dur-base` `--ease-out-soft`) with the card held mid-swipe.

**Undo toast**: Slides up from the bottom (translateY 60 → 0, opacity 0 → 1, 280ms `--dur-base` `--ease-out-soft`). Auto-dismisses after 5s (slides down, same timing).

**Reduced-motion**: Bottom sheet appears at final position instantly (no slide, no backdrop fade — appears at full 60% opacity). Notes list at final state instantly. Sparkline renders at completed static form (full orange stroke, green end-dot if a milestone present) instantly with no draw animation. Swipe-action zones appear instantly. No animation is blocked — only draw/slide/scale motions compress to instant.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| Cold-start / Day 1 | Notes list replaced by centered empty state. Illustration: outlined notepad icon (48pt, white at 15%). Quick Add Bar prominent, auto-focused, keyboard visible. Tag filter row hidden (no notes to filter). | "capture a thought, observation, or reminder." (no shame, warm invite). "SIA will help you connect the dots." (frames SIA warmly, lowercase). | Surfaces remain layered + edge-highlight; no degenerate flat zone; the Quick Add Bar's orange send is the only glow cue |
| Loading (while creating note) | Input clears, spinner animates in place of the text (brief), new card begins slide-up into list. Tag shimmer animates on card (morphs into final tags). | "saving..." (1 word, plain, lowercase). Brief aria-live: "note created, SIA is reading it" (context for a11y). | Spinner is white at 60%, no glow; note card morphs in (not a swap); shimmer on `--color-ink-brown-800` (depth-preserving, not a flat skeleton) |
| Empty / partial (filtered view) | Notes list shows only matching tag's notes. If a tag is active but no matches: notes list replaced with centered "no [tag] notes yet" text. "all" filter chip remains visible to reset. | "no [tag] notes yet." (specific, lowercase, non-shaming; the period). | surfaces unchanged; tag chips remain layered + edge-highlight |
| Error (note creation fails) | Input text preserved, send button shows brief red flash (120ms), then reverts to orange. Error toast appears below input or as a network banner. | "couldn't save. pull to refresh." (warm verb, specific action named, lowercase, period). | calibrated `--color-error-red` on button (not neon) only for 120ms flash, never persistent; surfaces unchanged |
| Offline | Notes created offline store locally with cloud-with-arrow icon (12pt, white at 30%) beside timestamp. Existing notes shown from cache. Sync occurs on reconnect. Icon disappears when synced. | Icon aria-label: "waiting to sync" (never silent). Optional: small network banner "you're offline — cached notes shown" (calm, informative). | offline-created notes show the icon as a subtle visual cue; no red/error framing (offline is a state, not a failure) |
| Note expanded | Card height animates to fit full text. Adjacent cards shift down. Collapse is the same animation in reverse. | (same text, no change — the card's body text is unchanged) | card depth + edge-highlight remains; the expanded space reads as intentional, not a flare-out |
| Search active | Search bar gains focus, cursor visible, hint text fades. Clear button (X icon) appears when text is entered. Notes list crossfades to search results. | "search notes." (hint text, period). "no notes found for '[query]." (if results empty). | search bar depth (track inset, edge-highlight) + card surfaces unchanged; crossfade is smooth, no jank |

### Signature & anti-generic

Ownable moment: the **Quick Add Bar send button** — a 40pt `--color-brand-orange` circle with a round-capped arrow-up icon (2pt stroke, white) at the top of the sheet. When text exists, the button enables (orange fill, white icon); when empty, it disables (white at 10% fill, white icon at 30%). On press, it briefly scales (scale 0.92, 160ms micro-interaction). This is the continuous-stroke moment on a capture surface — a simple, warm, ownably Balencia detail. The icon is a living arrow (not a generic send icon), and the circular form (not a pill or rectangle) reads as intentional and premium.

Anti-generic fixes: (1) the note cards are never a flat symmetric list — they are grouped within a single layered card container with subtle dividers (never a repeating-card list), so the eye reads them as a unified archive, not a generic content feed; (2) the Quick Add Bar is not a default iOS input — it's a glassmorphic container with a glow-free orange button at the end (orange dominates, but restraint is maintained); (3) the empty state is not a generic "no results" — it is a warm, illustrated notepad icon with on-voice copy that frames capturing as an invite, not a blank zone; (4) the Sparkline in the archive header is a restrained, drawn Living Line (not a bar chart, not a dashboard) — a signature Balencia chart that earns its place by being *absent* from the fast-capture bottom sheet (restraint as premium, not thinness).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` / `--color-ink-brown-800`):
| Element | Color | Contrast |
| --- | --- | --- |
| Quick Add input text | `--color-alpha-white-100` | ≥12:1 on `--color-ink-brown-800` |
| Quick Add hint text | `--color-alpha-white-30` | ≥4.5:1 on `--color-ink-brown-800` |
| Send button (enabled) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Send button (disabled) | `--color-alpha-white-10` | 2.1:1 on `--color-ink-brown-800` (borderline — acceptable for disabled state) |
| Note card text | `--color-alpha-white-90` | ≥12:1 on `--color-ink-brown-800` |
| Timestamp | `--color-alpha-white-40` | ≥4.5:1 on `--color-ink-brown-800` |
| Tag chip text (on colored bg) | per-tag `--color-*` at 15% | ≥3:1 (the tag color at full saturation on a 15% bg meets the WCAG 1.4.11 threshold) |
| "ask SIA" link | `--color-royal-purple` at 70% | 3.8:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Section header (date) | `--color-alpha-white-40` | ≥4.5:1 |
| Delete zone (swipe) | `--color-error-red` (`--color-error-red`) | 2.5:1 on `--color-ink-brown-800` (error reds are exempt from 3:1 when used for genuine operational failure; a delete action is operational) |
| Tag zone (swipe) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) |

Status never colour-alone: swipe-action zones show an icon + background (trash for delete, tag-icon for categorize, never colour-only). Tag chips show a colored background + a label (never just a dot). All interactive elements carry `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset) uniform app-wide — the send button, note cards, "ask SIA" links, search bar, tag filter chips, and tag-selector dropdown rows all use the same ring. Touch targets ≥44×44pt: send button is 40pt visible with 44pt touch target; tag chips are 32pt height with 44pt vertical touch targets; note cards are full-width (always ≥44pt tall per minimum 72pt spec); "ask SIA" links have a 28pt explicit touch target + a hit-area expand. Reduced-motion: no slide animations (sheet appears instant, notes appear instant, swipe-zones appear instant, undo toast appears instant); the Sparkline renders at completed static form (full orange stroke + green end-dot if a milestone) instantly. All text labels, counts, and aria-labels are available to screen readers; the cloud-with-arrow offline icon has an aria-label ("waiting to sync").

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background (sheet) | #0A0A0F | ink-900 | Solid sheet background |
| Backdrop overlay | #0A0A0F at 60% | ink-900 | Dimmed underlying screen |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism note containers |
| Quick Add Bar border | white at 8% | — | Glassmorphism border |
| Send button (active) | #FF5E00 | brand-orange | Primary action — the capture moment |
| Send button (disabled) | white at 10% | — | No content yet |
| Send button icon | #FFFFFF | white | Arrow on orange |
| "all" filter active | #FF5E00 fill, white text | brand-orange | Active filter state |
| Tag: health | #14B8A6 at 15% bg, #14B8A6 text | wellbeing-teal | Auto-tag chip |
| Tag: workout | #EF4444 at 15% bg, #EF4444 text | fitness-red | Auto-tag chip |
| Tag: nutrition | #84CC16 at 15% bg, #84CC16 text | nutrition-lime | Auto-tag chip |
| Tag: mood | #A855F7 at 15% bg, #A855F7 text | spirituality-purple | Auto-tag chip |
| Tag: idea | #F59E0B at 15% bg, #F59E0B text | creativity-amber | Auto-tag chip |
| Tag: reminder | #FF5E00 at 15% bg, #FF5E00 text | brand-orange | Auto-tag chip |
| "ask SIA" text | #7F24FF at 70% | royal-purple | AI action indicator — 10% rule |
| "ask SIA" dot | #7F24FF | royal-purple | AI presence dot |
| Swipe delete zone | #F44336 | error-red | Destructive action |
| Swipe tag zone | #FF5E00 | brand-orange | Organizational action |
| Note text | white at 90% | — | Primary content |
| Timestamp | white at 40% | — | Temporal metadata |
| Placeholder text | white at 30% | — | Input hints |
| Search icon | white at 40% | — | Search affordance |
| Section headers | white at 40% | — | Date group labels |
| Undo toast text | white at 70% | — | Recovery message |
| Undo action | #FF5E00 | brand-orange | Recovery CTA |
| Filter chip inactive bg | white at 10% | — | Unselected filter |
| Filter chip inactive text | white at 60% | — | Unselected label |

**60/30/10 verification**: Orange dominates through the send button (primary CTA), active "all" filter chip, reminder tag, swipe-right tag zone, undo action, and the archive-mode capture-activity Sparkline's single orange micro-stroke (its only data ink). Green is absent from the capture/list UI (no success/completion states — notes are captured, not completed); the one sanctioned green is the Sparkline's milestone end-dot in full-screen archive mode, marking a highest-capture week (arrival), per `viz-audit/CONSISTENCY.md`. Purple is limited to "ask SIA" text links and dots on each note card — exactly the AI-indicator role; the Sparkline carries no purple (capture activity is not an SIA forecast, so no dashed-purple projection). Tag colors appear exclusively on tag chips and filter chips. Ratio holds with orange as the visual driver of action.

---

## Interaction States

### Quick Add Bar — Send Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default (disabled) | white at 10% circle, white at 30% arrow icon | — |
| Enabled | Orange fill, white arrow icon | — |
| Pressed | Darker orange (#E55400), scale(0.92) | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Sending | White spinner replaces arrow (160ms) | — |
| Success | Green flash (#34A853, 300ms), resets to disabled | success notification |

### Quick Add Bar — Text Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Placeholder visible, cursor not active | — |
| Focused | Placeholder fades, cursor blinks, keyboard rises | light impact |
| Typing | Text renders, send button enables when non-empty | — |
| Multi-line | Input expands to 2-3 lines, send button stays vertically centered | — |

### Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content, transparent within card | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Expanded | Full text visible, card height animates to accommodate | — |
| Editing | Text becomes editable, border becomes orange at 30%, save/cancel appear | — |

### Tag Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | white at 10% bg, white at 60% text | — |
| Pressed | bg brightens (white at 15%), scale(0.95) | light impact |
| Active | Tag color at 20% bg (or orange for "all"), tag color text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "ask SIA" Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple at 70% text + purple dot | — |
| Pressed | Purple at 50% text, scale(0.97) | light impact |
| Focus-visible | 2pt purple ring, offset 2pt | — |

### Tag Chip (on Note Card)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Tag color at 15% bg, tag color text | — |
| Pressed | Tag color at 25% bg, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Swipe Actions
| State | Visual | Haptic |
|-------|--------|--------|
| Idle | Note card at rest | — |
| Swipe left (partial) | Red zone slides in from right, trash icon visible | — |
| Swipe left (full) | Card slides off-screen, auto-triggers delete | heavy impact |
| Swipe right (partial) | Orange zone slides in from left, tag icon visible | — |
| Swipe right (release) | Tag selector dropdown appears | medium impact |

### Search Bar (Full-Screen)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Placeholder, search icon | — |
| Focused | Border brightens to white at 15%, cursor active | light impact |
| Active (with text) | Clear button appears, live filtering | — |
| No results | "no notes found" below bar in white at 40% | — |

### Capture-activity Sparkline (Full-Screen Archive only)
| State | Visual | Haptic |
|-------|--------|--------|
| Cold-start (<2 weeks of notes) | Sparkline omitted entirely; caption "your capture activity will appear here" only — never a flat zero-line | — |
| Loading | 64×24 2pt white-at-10% baseline skeleton that morphs into the drawn orange stroke | — |
| Drawn (default) | 2pt orange #FF5E00 curved stroke, 7 points, no axes/grid/glow; green r=3px end-dot only on a highest-capture week | — |
| Partial (un-synced week) | Synced weeks solid orange; trailing un-synced week ghosted dashed white-at-20% (no-data ≠ zero) | — |
| Pressed (tooltip) | "N notes this week" tooltip pill, ink-900, --r-sm, 160ms fade; ≥44×44pt hit area; never delays capture | light impact |
| Error (activity fetch fails) | Sparkline area renders nothing; caption falls back to plain "N notes" count; list + capture bar unaffected | — |
| Reduced motion | Completed static stroke + end-dot at rest, no draw | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| FAB long-press | Any screen's FAB | Open Quick Notes bottom sheet |
| Drag down | Sheet handle / above input | Dismiss bottom sheet |
| Tap | Backdrop | Dismiss bottom sheet |
| Tap | Send button | Create note (POST /api/quick-notes) |
| Tap | Note card | Expand/collapse note text |
| Long-press | Note card | Enter inline edit mode |
| Swipe left | Note card | Reveal delete action |
| Swipe right | Note card | Reveal tag action |
| Tap | "ask SIA" link | Navigate to SIA Chat with note context |
| Tap | Tag filter chip | Filter notes by tag |
| Tap | Search bar | Focus search input |
| Pull down | Notes list (full-screen) | Pull-to-refresh |
| Swipe right from edge | Full-screen mode | iOS back gesture |
| Tap | Back button | Pop stack (full-screen mode) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Bottom sheet | FAB long-press | Slides up from y=screenHeight to 70% position. Backdrop fades in 0->60% simultaneously. | 520ms | ease-flow |
| Bottom sheet dismiss | Drag or tap backdrop | Sheet slides down, backdrop fades out | 280ms | ease-out-soft |
| Keyboard rise | Sheet opens | Keyboard animates up, sheet expands from 70% to 90%. Input is auto-focused. | 280ms | ease-out-soft (system keyboard timing) |
| Send button enable | Text entered | Orange fill fades in (opacity 0->1) | 160ms | ease-out-soft |
| Note creation | Send tapped | Input clears, new note card slides in at list top (translateY(-12->0) + opacity 0->1) | 280ms | ease-out-soft |
| Note expand | Card tapped | Card height animates to fit full text, adjacent cards shift down | 280ms | ease-out-soft |
| Note collapse | Card tapped again | Card height animates back to truncated size | 280ms | ease-out-soft |
| Swipe left reveal | Swipe gesture | Delete zone slides in from right, card slides left | gesture-driven | spring |
| Swipe right reveal | Swipe gesture | Tag zone slides in from left, card slides right | gesture-driven | spring |
| Delete (full swipe) | Swipe past threshold | Card slides off-screen, row height collapses to 0, adjacent cards shift up | 280ms | ease-out-soft |
| Undo toast | After delete | Slides up from bottom (translateY(60->0) + opacity 0->1) | 280ms | ease-out-soft |
| Undo toast dismiss | After 5s or swipe | Slides down (translateY(0->60) + opacity 1->0) | 280ms | ease-out-soft |
| Tag filter switch | Filter chip tapped | Notes list crossfades to filtered set | 280ms | ease-out-soft |
| Tag selector open | Swipe right release | Dropdown scales in from note card (scaleY 0->1, anchor top) | 280ms | ease-out-soft |
| Search results | Text input (debounced) | Notes list crossfades to search results | 280ms | ease-out-soft |
| Screen content (full-screen) | Mount | Staggered fade-in: search bar (0ms), filter row (80ms), first 3 note cards (80ms stagger each) | 280ms each | ease-out-soft |
| Capture-activity Sparkline (archive header) | Header settled / scroll-into-view | Living Line **draws itself** left→right via stroke-draw (never opacity-fade, §8); green milestone end-dot scales in (0.8→1.0) only after the stroke completes | draw 520ms; dot 280ms | ease-flow (draw); ease-out-soft (dot) |
| Capture-activity Sparkline (reduced-motion) | prefers-reduced-motion | Renders at completed static form instantly — full curved stroke + green end-dot if a milestone, no draw | instant | — |

**Screen transition**:
- **Enter (bottom sheet)**: Not a navigation — overlay slides up over current screen
- **Exit (bottom sheet)**: Overlay slides down, revealing underlying screen unchanged
- **Enter (full-screen)**: Standard stack push — slides in from right
- **Exit (full-screen)**: Stack pop — slides out to right

---

## Empty States

### Day 1 (new user)
- Quick Add Bar is prominent and auto-focused — keyboard appears immediately.
- Notes list area: Replaced by centered empty state. Illustration: outlined notepad icon (48pt, white at 15%). Text: "capture a thought, observation, or reminder" in 15pt Sora Regular, white at 40%, center-aligned. Below: "SIA will help you connect the dots." in 13pt Sora Regular, white at 30%.
- Tag filter row: Hidden (no notes to filter).
- The immediate keyboard focus + empty state text together create an obvious "type here" path.

### Established user (zero state — filtered view empty)
- When a tag filter is active but no notes match: "no [tag] notes yet" in 15pt Sora Regular, white at 40%, centered in the list area. "all" filter chip remains visible to reset.

### Established user (search with no results)
- "no notes found for '[query]'" in 15pt Sora Regular, white at 40%, centered. Search bar stays active for query refinement.

---

## Motivation Adaptation

- **Low motivation**: Quick Add Bar placeholder changes to a lower-commitment prompt: "even one word counts." The "ask SIA" links are less prominent (white at 30% instead of purple). Auto-tagging is more aggressive to reduce any organizational friction. SIA may proactively add a note on the user's behalf after a coaching conversation: "SIA noted: you mentioned feeling stressed about work" — visible in the notes list with a SIA attribution badge.
- **Medium motivation**: Default experience as described. Standard placeholder, visible "ask SIA" links, auto-tagging with manual override available.
- **High motivation**: Additional metadata appears per note: word count, linked domain insights ("this note was referenced in 2 SIA conversations"). Export button appears in full-screen header for CSV/text export. Tag filter shows note counts per tag. SIA proactively surfaces note patterns: "you've mentioned knee pain 4 times this month — want to discuss?"

---

## API Integration

### Endpoints — `/api/quick-notes` (protected, requires JWT)

| Method | Path | Purpose | Request | Response |
|--------|------|---------|---------|----------|
| GET | `/api/quick-notes` | List notes | Query: `?tag=health&search=knee&limit=20&offset=0` | `{ notes: [...], total: number, hasMore: boolean }` |
| POST | `/api/quick-notes` | Create note | Body: `{ text: string, tags?: string[] }` | `{ note: { id, text, tags, createdAt, updatedAt } }` |
| PATCH | `/api/quick-notes/:id` | Update note | Body: `{ text?: string, tags?: string[] }` | `{ note: { id, text, tags, createdAt, updatedAt } }` |
| DELETE | `/api/quick-notes/:id` | Delete note | — | `{ success: true }` |

### Auto-Tagging Behavior
- On `POST`, if no tags are provided, the server runs a lightweight AI classification to auto-assign 1-2 tags from the set: `health`, `workout`, `nutrition`, `mood`, `idea`, `reminder`.
- Auto-tags are returned in the response and displayed immediately. User can override via swipe-right tag action.
- Tag assignment is non-blocking — the note appears instantly with a shimmer on the tag area while classification runs (typically <500ms).

### Offline Behavior
- Notes created offline are stored locally and synced on reconnection.
- Offline-created notes show a small cloud-with-arrow icon (12pt, white at 30%) next to the timestamp until synced.
- Deletion of offline-only notes is immediate (no API call needed).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title (full-screen) | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |
| Quick add input text | Sora | Regular 400 | 16pt | 22pt | #FFFFFF |
| Quick add placeholder | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 30% |
| Tag filter chip text | Sora | Semibold 600 | 13pt | 18pt | per state color |
| Note text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 90% |
| Note tag chip | Sora | Semibold 600 | 11pt | 16pt | per tag color |
| Note timestamp | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| "ask SIA" link | Sora | Semibold 600 | 13pt | 18pt | #7F24FF at 70% |
| Date section header | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Search bar placeholder | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 30% |
| Search bar input text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Undo toast text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 70% |
| Undo action text | Sora | Semibold 600 | 15pt | 20pt | #FF5E00 |
| Tag selector row text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Empty state text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 40% |
| "no notes found" text | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 40% |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Note creation fails | Send button shows error state (brief red flash), "could not save note — try again" toast (3s). Input text preserved. | Send button re-enables, user can retry |
| Notes list load fails | List area shows "could not load notes — tap to retry" centered in 15pt Regular, white at 40% | Tap retry re-fetches; pull-to-refresh in full-screen mode |
| Note deletion fails | Deleted note reappears with slide-in animation, "could not delete — try again" toast | User can retry swipe-to-delete |
| Note edit save fails | Edit border flashes red (280ms), "could not save changes" toast | Edit mode stays active, text preserved |
| Auto-tagging fails | Note appears without tags. Tag area shows brief shimmer then empty state. Tags can be manually assigned via swipe-right. | AI retry in background; manual override available |
| Search fails | "search failed — try again" text below search bar in 13pt Regular, white at 40% | User can re-submit search query |
| "ask SIA" navigation fails | "could not open SIA — try again" toast | User can retry tap |
| Network offline | Notes created offline stored locally with cloud-with-arrow icon. Existing notes shown from cache. Sync occurs on reconnect. | Cloud icon disappears when synced |
| Tag filter returns no results | "no notes with this tag" in 15pt Regular, white at 40%, centered below tag row | User can select different tag or "all" |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Quick add bar**: Text input has accessible label "Capture a quick note." Send button: "Send note, button. Disabled." / "Send note, button."
- **Bottom sheet**: Announced as modal overlay. Drag handle has accessible hint: "Drag down to dismiss."
- **Note cards**: VoiceOver reads note text, tags, and timestamp: "Felt dizzy after skipping breakfast today. Tags: nutrition, workout. 2 minutes ago. Actions available." Long-press action announced via accessibility hint.
- **Tag filter chips**: Toggle role with state: "Health filter, selected" / "Nutrition filter, not selected." Active chip announces count.
- **"ask SIA" link**: Accessible label "Ask SIA about this note, link."
- **Swipe actions**: Delete accessible via long-press context menu fallback. Tag action accessible via context menu "Categorize" option.
- **Search bar** (full-screen): Accessible label "Search notes." Results update live with accessibility announcement "N results found."
- **Date section headers**: Announced as heading level 2 for navigation structure.
- **Undo toast**: Announced as alert role: "Note deleted. Undo available for 5 seconds."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Send button is 40pt visible with 44pt touch target. Tag chips have 32pt height with 44pt touch targets.
- **Color contrast**: Note text at 90% white on ink-900 exceeds 16:1 ratio. Tag chip text on 15% bg meets AA.
- **Reduced motion**: Bottom sheet appears without slide-up animation (instant opacity). Note creation appears without slide-in. Undo toast appears without slide-up.

---

## Cross-References

- **Navigates to**: SIA Chat [09] via "ask SIA about this" link (tab switch with note context pre-loaded), Journal [37] via "expand to journal entry" action (stack push with note text pre-populated in writing mode), Tag Selector Dropdown (inline, no navigation)
- **Navigates from**: Any screen (bottom sheet via FAB long-press), Me Main [17] via quick link grid (stack push to full-screen mode), SIA Chat [09] via deep-link ("check your notes")
- **Shared components with**: Screen [37] — Journal (Tag Chip pattern, note text styling, bottom sheet presentation), Screen [38] — Habits (Section Headers in full-screen date groups), Screen [24] — Notification History (reverse chronological list with date grouping), Screen [42] — Celebration (Undo Toast shares Small Win Toast pattern)
- **Patterns used**: Modal Presentation / Bottom Sheet (Batch 1), Tag Chip (Screen 37), Section Headers/Eyebrow (Screen 38), Swipe Actions (Screen 38), Search Bar (established Screen 18 Explore), 8-State Model, Text Input Field (Batch 1)
- **Patterns established**: Quick Add Bar (inline text input with circular send button — reusable for any fast-capture surface), Global Bottom Sheet Trigger (FAB long-press to invoke cross-screen overlay — could extend to other quick actions), Undo Toast (slide-up recovery toast with timed auto-dismiss), Auto-Tag Shimmer (tag area shimmer while AI classification runs), Offline Sync Indicator (cloud-with-arrow icon for pending sync)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-16.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/quick-notes`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q04 health logging needs visible in-session state, not persistence.
- Q41 recipes and shopping list support lightweight real mutations; sharing is review-first.
- Q45 meditation/yoga need library-to-active-to-complete modes.
- Q46 quick notes prioritize global bottom-sheet capture.
- Q47 report/block keeps also-block default off.
- Q49 sleep accent is canonical sleep-indigo.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B16-F07 | critical | retention | Build a real quick-add input with send/save/keyboard states and a real search input in archive mode. |
| B16-F08 | major | navigation | Make filters stateful with selected semantics and route Ask SIA to SIA chat with note context. |
| B16-F09 | minor | design-system-consistency | Normalize tag keys before lookup or store canonical tag ids plus display labels. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

