# Screen Design: Double-Tap Reflection

**Screen**: 71 of 72
**File**: 71-reflection.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6 domain accent — identification only; primary actions remain Burnt Orange per the domain-color usage rule)
**Primary action**: capture a quick reflection in 1-2 taps
**Tab**: Triggered contextually from Journal [37], Dashboard [12] quick-actions, or post-coaching-session prompts in SIA Chat [09] — not a standalone tab destination
**Navigation**: Not a stack-pushed screen. It is a **capture mechanic** — a double-tap gesture plus a lightweight bottom sheet — layered onto existing screens. Entry from a double-tap on a Journal Entry Row [37], a double-tap on a Dashboard [12] card, a double-tap on a coaching message bubble in SIA Chat [09], or a tap on the floating "double-tap to reflect" affordance. Exit via save (dismisses sheet, reflection appears inline in its origin context) or drag-down cancel.

---

## Purpose

Reflection is Balencia's answer to a real gap between two existing patterns: the Journal [37] (a considered, multi-field, rich-text writing session) and the Daily Check-in [45] (a structured, scheduled ritual). Neither fits the moment when a user has a flash of insight mid-scroll — reading yesterday's journal entry, glancing at a dashboard stat, or finishing a coaching exchange with SIA — and wants to capture it *right now*, in under 15 seconds, without opening a full editor.

Double-Tap Reflection is that fast path. A double-tap on almost any content surface (a journal entry, a dashboard card, a chat message) opens a minimal Quick Capture Sheet: one prompt, a mood-tag row, an optional voice-to-text button, and save. No title, no domain tagging step, no rich text formatting — those are Journal's job. Reflection's only job is speed. The saved reflection then renders inline, in its origin context, as a small, visually distinct card — never mistaken for a full journal entry, never demanding the same reading commitment.

This is deliberately a **pattern**, not a page. It has no dedicated screen number in the tab bar and no back button of its own; it is a modal capture flow plus an inline detail treatment, reusable everywhere in the app where a flash of reflection might occur. Reflections write to a `reflection_details` record linked to a parent `journal_entries` row (per the existing Journal data model), so they remain queryable and appear in the Journal timeline without requiring the user to have opened Journal at all.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority, across the three states this pattern covers):
1. **Trigger state** — the floating affordance or the double-tap gesture itself, discoverable but unobtrusive
2. **Quick Capture Sheet** — the single prompt, mood row, voice option, save button
3. **Reflection Detail View (inline)** — the saved reflection shown in its origin context with distinct visual treatment
4. **Reflection Arc/Pattern View** — a secondary, opt-in trend view surfacing recurring themes over time (kept deliberately minor; the core flow is speed, not analytics)

**User flow**:
- **Arrives from**: Double-tap on a Journal Entry Row [37] (opens sheet, pre-linked to that entry as context), double-tap on a Dashboard [12] card (opens sheet, pre-linked to that card's domain/metric as context), double-tap on a SIA Chat [09] coaching message bubble (opens sheet, pre-linked to that message as context), tap on the floating "double-tap to reflect" hint chip (opens sheet with no pre-linked context, defaults to a standalone reflection)
- **Primary exit**: Save (sheet dismisses, reflection card renders inline at the point of origin with a brief entrance animation)
- **Secondary exits**: Drag-down / "cancel" (dismisses without saving, no confirmation needed since capture is intentionally low-commitment — nothing is lost that took more than a few seconds to enter), "open full journal entry instead" link (escalates to the full Journal Writing Mode [37] if the user decides they want to write more, carrying over what was typed)

---

## Layout — Trigger + Quick Capture Sheet

**Scroll behavior**: N/A (sheet is fixed-height, non-scrolling except the mood-tag row which scrolls horizontally if it overflows)
**Tab bar visible**: No (sheet is a modal overlay on top of the host screen, whose own tab bar visibility is unaffected underneath)

### ASCII Wireframe — Trigger (on a Journal Entry Row, host screen dimmed example)

```
┌─────────────────────────────────────┐
│  (host screen: Journal [37])        │
│  ┌─────────────────────────────┐   │
│  │  May 20, 2026     😌        │   │  ← Journal Entry Row
│  │  "Had a breakthrough with   │   │     (double-tap target)
│  │   the project today..."     │   │
│  │  [creativity] [career]      │   │
│  │         ⤷ ⤷ (double-tap)   │   │  ← tap-tap gesture
│  └─────────────────────────────┘   │
│                                     │
│           ┌─────────────────┐     │  ← Floating "double-tap
│           │ ✎✎ double-tap   │     │     to reflect" hint
│           │    to reflect   │     │     (dismissible, first-run
│           └─────────────────┘     │      only, teal glow)
│                                     │
└─────────────────────────────────────┘


=== QUICK CAPTURE SHEET (opens on double-tap) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ─── (drag handle, 32pt wide)      │  ← Sheet handle
│  [cancel]           reflection     │  ← Modal header (44pt)
│                            [save]  │
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ↳ on "Had a breakthrough..."       │  ← Origin context chip
│                                     │     (teal, dismissible)
│  what's on your mind right now?     │  ← Single prompt (18pt)
│                                     │  ← 12pt gap
│  ┌─────────────────────────────┐   │
│  │                             │   │  ← Fast-entry text area
│  │  User types here...        │   │     (single field, auto-
│  │                             │   │      grows, no formatting)
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  😊  😌  😐  😔  😤   🎙️          │  ← Mood Tag Row + Voice
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │          save               │   │  ← Save CTA (teal pill)
│  └─────────────────────────────┘   │
│                                     │  ← 12pt gap
│  open full journal entry instead →  │  ← Escalation link
│                                     │  ← 16pt gap
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │  ← Keyboard area
│  │        Keyboard             │   │     (system)
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Component Stack — Trigger + Quick Capture Sheet (top to bottom)

1. **Double-Tap Gesture Target** — inherited from host surface (Journal Entry Row, Dashboard Card, Chat Message Bubble)
   - Purpose: The primary, near-invisible entry point — speed means not adding visible chrome to every surface
   - Content: No persistent visual change to the host element; a brief teal ripple confirms the gesture registered

2. **Floating "Double-Tap to Reflect" Hint Chip** — ~40pt (first-run discovery only)
   - Purpose: Teach the gesture exists, then get out of the way
   - Content: Pencil-pencil icon + "double-tap to reflect" text, teal glow

3. **Sheet Handle + Header** — 44pt
   - Purpose: Dismiss/save controls
   - Content: "cancel" (left), "reflection" title (center), "save" (right, disabled until text entered)

4. **Origin Context Chip** — 24pt (conditional)
   - Purpose: Show what triggered this reflection, so the user (and later, the saved record) knows what it's anchored to
   - Content: Small arrow icon + truncated quote/reference to the origin content, teal text, dismissible "x" to detach

5. **Single Prompt** — ~28pt
   - Purpose: The one question — intentionally generic and low-commitment, not SIA-generated per-context (that would slow the perceived speed and imply more machinery than exists)
   - Content: "what's on your mind right now?" (default) or a context-aware variant (see Components)

6. **Fast-Entry Text Area** — ~80pt (grows to 140pt max)
   - Purpose: The capture surface itself — no rich text, no formatting toolbar, nothing that could slow entry
   - Content: Plain text input, auto-focused on sheet open

7. **Mood Tag Row + Voice Button** — 40pt
   - Purpose: Optional one-tap emotional context, optional voice-to-text shortcut
   - Content: 5 mood emojis + microphone icon

8. **Save CTA** — 48pt
   - Purpose: Commit the reflection
   - Content: "save" pill button, disabled until text or voice content exists

9. **Escalation Link** — 20pt
   - Purpose: Let the user "graduate" to a full Journal entry if 15 seconds isn't enough
   - Content: "open full journal entry instead →" text link

---

## Layout — Reflection Detail View (inline, in origin context)

**Scroll behavior**: Inherits from host context (Journal timeline ScrollView, Dashboard ScrollView, or Chat message list)
**Tab bar visible**: Inherits from host context

### ASCII Wireframe — Reflection Card Inline in Journal Timeline

```
┌─────────────────────────────────────┐
│  JOURNAL TIMELINE                   │
│  ┌─────────────────────────────┐   │
│  │  May 20, 2026     😌        │   │  ← Full Journal Entry Row
│  │  "Had a breakthrough with   │   │     (standard, larger card)
│  │   the project today..."     │   │
│  │  [creativity] [career]      │   │
│  └─────────────────────────────┘   │
│  ┃┌───────────────────────────┐   │  ← Reflection Card
│  ┃│ ✎ reflection · 2:14 PM    │   │     (teal left accent bar,
│  ┃│ "actually I think I'm     │   │      smaller, no domain
│  ┃│  more nervous than excited│   │      tags, distinct from
│  ┃│  about the launch" 😐     │   │      full journal entries)
│  ┃└───────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │  ← Next Journal Entry Row
│  │  May 19, 2026     😐        │   │
│  │  "Tough conversation..."    │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘


=== REFLECTION ARC / PATTERN VIEW (secondary, opt-in) ===

┌─────────────────────────────────────┐
│  ← [back]      "your patterns"     │  ← Optional entry point:
├─────────────────────────────────────┤     Journal [37] overflow
│                                     │     menu → "view reflection
│  RECURRING THEMES (last 30 days)    │     patterns" — secondary,
│  ┌─────────────────────────────┐   │     never a primary nav item
│  │ nervous/anxious      ●●●●○  │   │  ← Theme frequency bars
│  │ grateful              ●●●○○  │   │     (teal fill, quiet)
│  │ tired                 ●●○○○  │   │
│  └─────────────────────────────┘   │
│                                     │
│  RECENT REFLECTIONS                 │
│  ┌─────────────────────────────┐   │
│  │ ✎ May 20 · "actually I..."  │   │  ← Compact list, chrono
│  │ ✎ May 18 · "small win..."   │   │
│  │ ✎ May 15 · "need rest"      │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Component Stack — Reflection Detail View (top to bottom, within host context)

1. **Reflection Card (Inline)** — ~64-88pt
   - Purpose: Show a saved reflection at its point of origin, visually subordinate to full journal entries or dashboard cards
   - Content: Teal left accent bar, pencil icon + "reflection" label + timestamp, reflection text, optional mood emoji

2. **Reflection Arc / Pattern View** — Variable (secondary screen, reached via overflow, not a tab)
   - Purpose: Lightweight trend view of recurring themes across reflections over time — explicitly secondary to the capture flow
   - Content: Theme frequency bars, chronological compact list of recent reflections

---

## Components

### Double-Tap Gesture Target
- **Purpose**: The core interaction — a double-tap on a Journal Entry Row, a Dashboard card, or a SIA Chat message bubble opens the Quick Capture Sheet with that element pre-linked as origin context
- **Data source**: N/A — gesture recognizer layered on existing host components, no new data fetch
- **Visual treatment**: No persistent chrome added to host elements (adding a visible affordance to every card would violate the "don't overload one screen" principle). On successful double-tap registration: a brief teal (#14B8A6) ripple emanates from the tap point, 240ms, fading to 0 opacity, confirming the gesture before the sheet slides up.
- **Content**: N/A (gesture-only, no persistent UI)
- **Variants**: Journal Entry Row target (Screen 37), Dashboard Card target (Screen 12 and domain dashboards 26-36), Chat Message Bubble target (Screen 09) — each passes a different `origin_type` and `origin_id` into the sheet
- **Gestures**: Double-tap (two taps within 300ms, same location within 24pt radius) opens Quick Capture Sheet. A single tap on the same elements retains its existing behavior (open full entry, navigate to dashboard, etc.) — the double-tap does not intercept or delay the single-tap action; it is evaluated independently.
- **Size**: Inherits host element bounds

### Floating "Double-Tap to Reflect" Hint Chip
- **Purpose**: Teach first-time users that the gesture exists, without requiring a persistent icon on every card
- **Data source**: Client-side flag, `reflection_hint_dismissed` (local storage / user preference), shown once per host-screen-type until dismissed or used successfully 3 times
- **Visual treatment**: Floating pill, ink-brown-800 glassmorphism, --r-pill, 12pt padding, positioned near the top of the first reflectable element on screen. Teal (#14B8A6) glow (--glow equivalent at teal), subtle pulse.
- **Content**: Double-pencil icon (14pt, teal) + "double-tap to reflect" (13pt Switzer Medium, white at 80%)
- **Variants**: Journal variant, Dashboard variant, Chat variant — copy stays identical, position adapts to host layout
- **Gestures**: Tap chip directly also opens the Quick Capture Sheet (accessibility fallback for users who don't discover or can't perform the double-tap gesture — e.g. assistive touch users). Auto-dismisses after first successful use.
- **Size**: Auto-width (~160pt) x 40pt

### Sheet Handle + Header
- **Purpose**: Dismiss/save controls, consistent with all bottom sheet modals app-wide
- **Visual treatment**: Bottom sheet, ~45% screen height (notably shorter than Journal's Writing Mode at ~90% — this is the visual proof of "lighter weight"), ink-900 bg, --r-lg (20pt) top corners, drag handle 32pt wide x 4pt tall, white at 20%, centered, 8pt from top.
- **Content**: "cancel" (left, 15pt Switzer Regular, white at 60%) + "reflection" (center, 15pt Cabinet Grotesk SemiBold, white at 70% — intentionally smaller/quieter than Journal's 17pt SemiBold modal heading, reinforcing this is the lightweight sibling) + "save" (right, 15pt Cabinet Grotesk SemiBold, teal #14B8A6, disabled until content exists)
- **Gestures**: Drag down to dismiss (no unsaved-changes confirmation — capture is low-stakes by design), tap "cancel" to dismiss, tap "save" to save and dismiss
- **Size**: Full-width x 44pt

### Origin Context Chip
- **Purpose**: Anchor the reflection to whatever triggered it, both for the user's clarity in the moment and for the saved record's provenance
- **Data source**: Passed in from the triggering gesture — `origin_type` (journal_entry / dashboard_card / chat_message) + `origin_id` + a short display snippet
- **Visual treatment**: Compact pill, teal (#14B8A6) at 12% bg, teal text, --r-sm (10pt), 8pt horizontal padding, 24pt height
- **Content**: Small arrow-return icon (10pt) + truncated origin reference, e.g. "↳ on \"Had a breakthrough...\"" (12pt Switzer Regular, teal), "x" to detach (12pt, teal at 60%) — detaching converts the reflection to standalone, still savable
- **Variants**: Journal origin, Dashboard origin (shows metric/domain name instead of a quote), Chat origin (shows a snippet of SIA's message), No origin (chip hidden entirely — triggered via the floating hint chip with nothing pre-linked)
- **Gestures**: Tap "x" detaches origin (chip disappears, prompt reverts to the standalone default). Chip itself is not tappable (informational only within the sheet).
- **Size**: Auto-width (~220pt max, truncates) x 24pt

### Single Prompt
- **Purpose**: One low-commitment question that gets the user writing immediately — deliberately not an SIA-generated, context-specific question, because generating one would add latency and imply this fast path runs through the AI pipeline, undermining the "under 15 seconds" promise
- **Data source**: Static string, selected from a small deterministic rotation based on `origin_type` — not an LLM call
- **Visual treatment**: 18pt Switzer Regular, white at 90%, left-aligned, no icon (unlike Journal's SIA Reflection Prompt Card, this carries no purple dot — same honesty principle as Screen 70's health summary: this prompt is a static string, not an AI voice)
- **Content**: Default: "what's on your mind right now?" — Journal-origin variant: "anything more to add?" — Dashboard-origin variant: "what does this number mean to you?" — Chat-origin variant: "want to sit with that a bit more?"
- **Variants**: 4 static variants keyed by origin type, described above
- **Size**: Full-width minus 32pt x ~28pt

### Fast-Entry Text Area
- **Purpose**: The capture surface — intentionally minimal, no formatting, no rich text, to keep entry under 15 seconds
- **Data source**: New reflection (blank) — reflections are always new; there is no "edit mode" entry point for this sheet (editing happens from the Reflection Card's own long-press, opening a simpler inline editor, not this sheet)
- **Visual treatment**: 16pt padding horizontal, 16pt Switzer Regular, white, left-aligned. Placeholder: "type or tap the mic..." in white at 30%. Auto-grows from 80pt to a 140pt max, then scrolls internally. No bold/italic support (unlike Journal's Writing Mode, which permits minimal rich text) — reflection is plain text only, by design.
- **Gestures**: Auto-focused on sheet open (keyboard raises immediately, zero extra taps to start typing)
- **Size**: Full-width minus 32pt x 80-140pt

### Mood Tag Row + Voice Button
- **Purpose**: Optional one-tap emotional context plus a voice-to-text shortcut, both designed to shave time off manual typing
- **Data source**: Mood selection is local state until save; voice routes through the same AssemblyAI transcription pipeline used by Journal's Voice Recording Mode
- **Visual treatment**: Single row, 16pt padding horizontal, 8pt below text area. 5 mood emojis (28pt each, 12pt gap — slightly smaller than Journal's 32pt selector, consistent with this sheet's more compact scale) + a vertical divider (1pt, white at 10%) + microphone icon (24pt, teal, 32pt circle touch target)
- **Content**: 😊 😌 😐 😔 😤 (identical five-state set as Journal/Daily Check-in, for cross-screen consistency) + 🎙️ voice icon
- **Variants**: No mood selected (default), Mood selected (scale(1.15) + teal-tinted background circle behind selected emoji), Voice active (mic icon pulses, waveform mini-visualization appears inline in the text area's placeholder position, transcribed text streams in as it resolves)
- **Gestures**: Tap emoji selects mood (single-select, tap again to deselect). Tap-hold mic (or single tap, since this is a quick path — tap starts recording, tap again stops, unlike Journal's long-press-only pattern) records and transcribes; text appears directly in the Fast-Entry Text Area, editable after transcription completes.
- **Size**: Full-width minus 32pt x 40pt

### Save CTA
- **Purpose**: Commit the reflection and dismiss the sheet
- **Visual treatment**: Full-width minus 32pt, 48pt tall (compact relative to the app's standard 56pt Brand CTA Button, reinforcing the "quick" register), teal (#14B8A6) fill, --r-pill, white text, 16pt Cabinet Grotesk SemiBold
- **Content**: "save"
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Disabled (no content) | 40% opacity, teal fill | -- |
  | Default | Full teal fill, white text | -- |
  | Pressed | Darker teal (#0F9484), scale(0.97) | light impact |
  | Loading | Spinner replaces text (only visible if voice transcription is still resolving) | -- |
  | Success | Green glow flash (600ms) then sheet dismisses | success notification |
- **Gestures**: Tap saves the reflection via `POST /api/journal/reflections` and dismisses the sheet
- **Size**: Full-width minus 32pt x 48pt

### Escalation Link
- **Purpose**: Let the user seamlessly move to the full Journal Writing Mode if the reflection grows beyond a quick thought — the sheet doesn't fight the user for staying compact
- **Visual treatment**: Centered text, 13pt Switzer Regular, white at 50%, with the trailing arrow in teal
- **Content**: "open full journal entry instead →"
- **Gestures**: Tap dismisses the Quick Capture Sheet and opens Journal's Writing Mode [37] bottom sheet, carrying over any text already typed and the selected mood, with the origin context preserved as a linked reference
- **Size**: Full-width x 20pt, 44pt touch target

### Reflection Card (Inline)
- **Purpose**: Render a saved reflection at its point of origin, visually smaller and quieter than a full Journal Entry Row, so the two are never confused
- **Data source**: API — reflections are fetched alongside their host context: `GET /api/journal/entries` includes linked `reflection_details` rows; Dashboard and Chat contexts fetch reflections scoped to their own `origin_id`
- **Visual treatment**: ink-brown-800 card, but noticeably more compact than a standard journal/dashboard card — --r-md (14pt) rather than --r-xl (28pt), 16pt padding rather than 24pt. Teal (#14B8A6) left accent bar, 3pt wide, full card height — the single consistent visual marker across every context this card appears in (Journal timeline, Dashboard, Chat), so a reflection is recognizable at a glance regardless of where it surfaces.
- **Content**:
  - Header row: pencil icon (12pt, teal) + "reflection" label (11pt Cabinet Grotesk SemiBold, teal, uppercase, +0.08em tracking) + timestamp (11pt Switzer Regular, white at 40%, e.g. "2:14 PM"), right-aligned
  - Reflection text: 14pt Switzer Regular, white at 85%, max 3 lines, truncated with ellipsis if longer (tap to expand)
  - Mood emoji (if selected): 16pt, bottom-right corner of the card
  - No domain tags, no title, no "edit" chrome visible by default — matches the minimal-footprint intent
- **Variants**: Journal-nested (indented slightly under its parent Journal Entry Row, connected by a thin vertical rule), Dashboard-nested (appears as a small card below the relevant metric/section), Chat-nested (appears as a small card attached below the SIA message bubble it reflects on), Standalone (no origin, appears in the Journal timeline at its own timestamp position like a lightweight entry)
- **Gestures**: Tap expands full text if truncated (inline, no navigation). Long-press reveals edit/delete (opens a minimal single-field editor, reusing the Fast-Entry Text Area component, not the full Quick Capture Sheet).
- **Size**: Full-width minus 48pt (indented under parent) or minus 32pt (standalone) x 64-88pt

### Reflection Arc / Pattern View
- **Purpose**: A lightweight, secondary trend view showing recurring themes across a user's reflections over time — explicitly kept minor in this design; it exists to reward users who reflect often, not to become a new analytics destination competing with the speed-first core flow
- **Data source**: API — `GET /api/journal/reflections/patterns?window=30d`, server computes theme frequency via existing mood-tag aggregation plus lightweight keyword clustering on reflection text (not a new heavy analytics pipeline — reuses the mood distribution logic already powering Journal and Daily Check-in trend surfaces)
- **Visual treatment**: Stack-push screen (not a tab, not a modal), ink-900 background, reached only via an overflow menu entry ("view reflection patterns") on the Journal [37] screen — never surfaced as a primary navigation target, to keep the core flow's "speed, not analytics" framing intact
- **Content**:
  - Header: back chevron + "your patterns" title
  - "RECURRING THEMES (last 30 days)" eyebrow + horizontal frequency bars per theme (teal fill, quiet — no glow, no celebration treatment; this is informational, not a milestone)
  - "RECENT REFLECTIONS" eyebrow + compact chronological list (pencil icon + date + truncated text, tap to jump to that reflection's origin context)
- **Variants**: Populated (≥ 5 reflections in the window), Sparse (< 5 reflections — shows the list without the theme bars, since frequency clustering needs a minimum sample to be meaningful, honoring the same honest-null principle used elsewhere rather than fabricating a pattern from too little data)
- **Gestures**: Tap a theme bar filters the recent list to reflections tagged with that theme. Tap a list item navigates to the reflection's origin context (Journal timeline position, Dashboard section, or Chat thread).
- **Size**: Full-screen, ScrollView

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Sheet header title | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White at 70% | "reflection" — quieter than standard modal heading |
| "cancel" | Switzer | 400 (Regular) | 15pt | 20pt | White at 60% | Sheet header left |
| "save" | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | Teal #14B8A6 | Sheet header right |
| Origin context chip | Switzer | 400 (Regular) | 12pt | 16pt | Teal #14B8A6 | Truncated reference |
| Single prompt | Switzer | 400 (Regular) | 18pt | 24pt | White at 90% | No icon, no purple dot |
| Text area content | Switzer | 400 (Regular) | 16pt | 22pt | White #FFFFFF | Plain text only |
| Text area placeholder | Switzer | 400 (Regular) | 16pt | 22pt | White at 30% | "type or tap the mic..." |
| Save CTA | Cabinet Grotesk | 600 (SemiBold) | 16pt | 20pt | White #FFFFFF | On teal fill |
| Escalation link | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% (arrow in teal) | "open full journal entry instead" |
| Reflection card label | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Teal #14B8A6 | "REFLECTION", uppercase, +0.08em |
| Reflection card timestamp | Switzer | 400 (Regular) | 11pt | 14pt | White at 40% | "2:14 PM" |
| Reflection card text | Switzer | 400 (Regular) | 14pt | 20pt | White at 85% | Max 3 lines |
| Hint chip text | Switzer | 500 (Medium) | 13pt | 18pt | White at 80% | "double-tap to reflect" |
| Pattern view title | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | "your patterns" |
| Pattern view eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Theme label | Switzer | 400 (Regular) | 14pt | 20pt | White at 80% | "nervous/anxious" |
| Recent reflection list item | Switzer | 400 (Regular) | 14pt | 20pt | White at 70% | Date + truncated text |

---

## Composition & Visual Hierarchy

**Squint test**:
- The Quick Capture Sheet should read as visibly smaller and lighter than the Journal Writing Mode sheet at a glance — its ~45% screen height versus Journal's ~90% is the primary structural signal that this is the fast path, not the deep one
- Inside the sheet, the single prompt line is the largest text element (18pt) precisely because it's the only thing demanding attention — no competing icons, no domain chips, no rich-text toolbar
- In its origin context, the Reflection Card must never out-weigh its parent element — the 3pt teal accent bar and --r-md radius (versus the parent's --r-xl) keep it visually subordinate at every zoom level
- The Reflection Arc/Pattern View is intentionally the quietest screen in this spec — teal frequency bars with no glow, no gradient, no celebration motion — because rewarding reflection with too much visual spectacle would pull attention away from the habit of quick, honest capture and toward performing for the analytics view

**Spacing breakdown (8pt grid)**:
- Sheet handle + header: 44pt
- Header to origin chip: 16pt (--s-4)
- Origin chip to prompt: 12pt (--s-3)
- Prompt to text area: 12pt (--s-3)
- Text area to mood row: 16pt (--s-4)
- Mood row to save CTA: 24pt (--s-5)
- Save CTA to escalation link: 12pt (--s-3)
- Reflection Card internal padding: 16pt (vs. standard 24pt — compact by design)
- Reflection Card indent under parent (Journal-nested variant): 16pt left offset + connecting rule
- Pattern View section gap: 24pt (--s-5)

**Z-layers**:
- z-0: Host screen content (Journal, Dashboard, or Chat — dimmed to 60% opacity behind the sheet backdrop)
- z-10: Reflection Cards within their host contexts (same layer as their parent content)
- z-20: Floating hint chip
- z-50: Quick Capture Sheet (modal)
- z-60: Voice recording waveform overlay (within the sheet)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background (sheet) | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Save CTA fill | #14B8A6 | wellbeing-teal (domain) | **Approved exception**: this screen's own primary action legitimately uses the domain color rather than orange, because Reflection is scoped entirely to the Wellbeing domain register and never competes with a differently-domained action on the same surface — see note below |
| "save" text (header) | #14B8A6 | wellbeing-teal | Consistent with CTA |
| Origin context chip | #14B8A6 at 12% bg | wellbeing-teal | Provenance indicator |
| Reflection card accent bar | #14B8A6 | wellbeing-teal | 3pt, consistent marker across all contexts |
| Reflection card label | #14B8A6 | wellbeing-teal | "REFLECTION" eyebrow |
| Hint chip glow | #14B8A6 at 40% | wellbeing-teal | Discovery affordance |
| Voice mic icon | #14B8A6 | wellbeing-teal | Recording trigger |
| Pattern view theme bars | #14B8A6 | wellbeing-teal | Quiet fill, no glow |
| Escalation link arrow | #14B8A6 | wellbeing-teal | Directional accent only |
| Primary text | #FFFFFF | white | Reflection content |
| Secondary text | white at 70-85% | -- | Reflection card text, escalation context |
| Tertiary text | white at 50-60% | -- | Cancel, escalation copy |
| Quaternary text | white at 30-40% | -- | Placeholders, timestamps |
| Success glow | #34A853 | green (secondary) | Save confirmation only |

**60/30/10 verification and domain-color exception**: This screen is the one deliberate, documented exception to "domain colors are tags/indicators only, never for actions" (Screen [46]/[70] rule). The exception holds because Reflection is not a multi-domain surface — it never appears alongside Fitness-red or Career-indigo content needing its own action color, and its host contexts (Journal, Dashboard, Chat) already reserve orange for *their own* primary actions (Journal's "write" FAB, Dashboard's domain CTAs, Chat's send button). Introducing a second orange CTA floating inside those same screens would create exactly the "orange competing with orange" ambiguity the design system exists to prevent. Teal instead gives Reflection a self-contained, recognizable identity — the same teal accent bar on a Reflection Card in Journal, on Dashboard, or in Chat is what lets a user recognize "that's a reflection" regardless of where they encounter it, which is more valuable here than uniform CTA color. Orange is not eliminated from the pattern: it remains implicitly present as the color of the *host screen's own* actions surrounding the sheet. Green is reserved solely for the save-success flash. No purple appears anywhere in this pattern — reinforcing, as with Screen 70, that the capture flow and its static prompts are not SIA-generated.

---

## Interaction States

### Double-Tap Gesture Target
| State | Visual | Haptic |
|-------|--------|--------|
| Default | No persistent change to host element | -- |
| Tap 1 registered | No visible change (waiting for tap 2 within 300ms) | -- |
| Tap 2 registered (double-tap confirmed) | Teal ripple from tap point, 240ms fade | light impact |
| Timeout (no tap 2 within 300ms) | Falls through to host element's normal single-tap behavior | -- |

### Hint Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal glow pulse, glassmorphism pill | -- |
| Pressed | Bg lightens, scale(0.96) | light impact |
| Dismissed (used 3x or manually) | Fades out permanently for that host-screen-type | -- |

### Save CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Disabled | 40% opacity | -- |
| Default | Full teal fill | -- |
| Pressed | Darker teal, scale(0.97) | light impact |
| Loading (voice still transcribing) | Spinner replaces text | -- |
| Success | Green glow flash (600ms), sheet dismisses | success notification |

### Mood Emoji
| State | Visual | Haptic |
|-------|--------|--------|
| Unselected | 60% opacity | -- |
| Pressed | 100% opacity, scale(1.1) | light impact |
| Selected | scale(1.15), teal-tinted circle behind | medium impact |

### Voice Button
| State | Visual | Haptic |
|-------|--------|--------|
| Idle | Teal mic icon, static | -- |
| Recording | Mic pulses, waveform mini-visualization in text area | medium impact (on start) |
| Transcribing | Spinner replaces waveform briefly | -- |
| Transcribed | Text populates Fast-Entry Text Area, editable | light impact |
| Error | "couldn't transcribe, type instead" inline hint | error notification |

### Reflection Card (Inline)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Compact card, teal accent bar | -- |
| Pressed (truncated text) | Expands inline to full text, height animates | light impact |
| Long-press | Edit/delete actions reveal | medium impact |
| New (just saved) | Slides in with brief teal glow pulse (600ms), then settles to default | success notification |

### Escalation Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 50% text, teal arrow | -- |
| Pressed | White at 30%, scale(0.98) | light impact |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Double-tap | Journal Entry Row / Dashboard Card / Chat Message Bubble | Open Quick Capture Sheet, origin pre-linked |
| Tap | Floating hint chip | Open Quick Capture Sheet, no origin pre-linked (or contextual if hint is anchored to an element) |
| Tap | "x" on origin chip | Detach origin, revert to standalone prompt |
| Tap | Mood emoji | Select/deselect mood (single-select) |
| Tap | Mic icon | Start recording; tap again to stop and transcribe |
| Tap | Save | Commit reflection, dismiss sheet |
| Tap | "cancel" | Dismiss sheet without saving |
| Drag down | Sheet handle | Dismiss without saving (no confirmation) |
| Tap | Escalation link | Open full Journal Writing Mode, carrying over typed content |
| Tap | Reflection Card (truncated) | Expand inline to full text |
| Long-press | Reflection Card | Edit/delete actions |
| Tap | Theme bar (Pattern View) | Filter recent reflections list by theme |
| Tap | Recent reflection list item (Pattern View) | Navigate to that reflection's origin context |
| Swipe right from edge | Pattern View (stack screen) | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Double-tap ripple | Gesture confirmed | Teal ripple expands from tap point, fades | 240ms | ease-out-soft |
| Quick Capture Sheet | Double-tap / hint tap | Slides up from bottom, notably faster reveal than Journal's Writing Mode given its shorter height | 400ms | ease-out-soft |
| Quick Capture Sheet | Dismiss | Slides down | 240ms | ease-out-soft |
| Origin chip detach | Tap "x" | Chip scales out (1→0) + fades | 160ms | ease-out-soft |
| Mood selection | Tap emoji | Selected: scale(1→1.15), teal circle fades in. Previous: reverses | 160ms | ease-out-soft |
| Voice waveform | Recording active | Continuous amplitude-driven bar animation | Real-time | -- |
| Save confirmed | Tap save | Sheet slides down (240ms) + Reflection Card fades/slides into origin context (opacity 0→1, translateY -8→0) | 280ms card | ease-out-soft |
| Reflection Card new | Just saved | Brief teal glow pulse (opacity 20%→50%→20%) | 600ms | ease-flow |
| Reflection Card expand | Tap truncated text | Height animates to full content | 200ms | ease-out-soft |
| Hint chip | First appearance | Fade-in + gentle scale(0.9→1) | 280ms | ease-out-soft |
| Hint chip | Dismiss/used | Fade-out | 160ms | ease-out-soft |
| Pattern view content | Screen mount | Staggered fade-in: theme bars (0ms), recent list (160ms) | 280ms each | ease-out-soft |
| Theme bar fill | Data load | Bar width animates 0 to current value | 520ms | ease-flow |

**Screen transition** (Pattern View only — the capture sheet is a modal, not a stack push):
- **Enter**: Stack push from Journal overflow menu
- **Exit**: Stack pop

---

## Empty States

### Quick Capture Sheet — first-time use
- Prompt shows the default variant with slightly warmer framing on first use only: "no rules here — just what's on your mind." Reverts to the standard prompt set after the first successful save.

### Reflection Card — none yet in a given context
- No empty state rendered inline (a context with zero reflections simply shows no Reflection Cards — nothing to fill, consistent with the pattern's "invisible until used" design).

### Reflection Arc / Pattern View — Day 1 / sparse data
- Fewer than 5 reflections logged in the 30-day window: theme frequency bars section is replaced with honest-null text: "not enough reflections yet to show patterns — a few more and they'll appear here." Recent Reflections list still renders with whatever exists (even a single entry), since a plain chronological list needs no minimum sample to be honest.
- Zero reflections ever: full-screen centered state. Icon: outlined pencil (48pt, white at 15%). Title: "no reflections yet" — 17pt Cabinet Grotesk SemiBold, white. Body: "double-tap any journal entry, dashboard card, or SIA message to capture a quick thought." — 14pt Switzer Regular, white at 50%, max 2 lines.

---

## Motivation Adaptation

- **Low motivation**: The floating hint chip appears more readily (lower threshold to show) and uses softer copy: "just a word or two, if you want." The mood row is emphasized as the fastest possible entry — a single emoji tap with zero typing is treated as a fully valid, completable reflection (save button enables on mood-only selection, not just text).
- **Medium motivation**: Standard experience as described. Save requires either text, voice-transcribed text, or a mood selection — any one is sufficient.
- **High motivation**: The escalation link to full Journal Writing Mode is offered more proactively — after a reflection exceeding roughly 40 words, an inline suggestion appears: "this sounds like it deserves the full journal — want to continue there?" The Reflection Arc/Pattern View becomes reachable via a small, low-key "N reflections this month" stat line appended to the Journal [37] screen header area (still never promoted to a tab or primary nav item), rewarding frequent reflectors with visibility into their own patterns without turning the core flow into an analytics product.

---

## Cross-References

- **Navigates to**: Journal [37] Writing Mode (via escalation link, carrying over content), Reflection Arc/Pattern View (via Journal overflow menu "view reflection patterns"), origin context navigation (tapping a Pattern View list item jumps to that reflection's origin in Journal/Dashboard/Chat)
- **Navigates from**: Journal Entry Row [37] (double-tap), Dashboard [12] and domain dashboard cards [26-36] (double-tap), SIA Chat [09] message bubbles (double-tap), floating hint chip (tap, any host context)
- **Shared components with**: Screen [37] — Journal (Mood Selector five-emoji set, Voice Recording Mode / AssemblyAI transcription pipeline, Writing Mode escalation target, `reflection_details` linked to `journal_entries`), Screen [45] — Daily Check-in (Mood Emoji Selector visual pattern), Screen [70] — Relationships CRM (shared honesty principle of withholding purple/SIA framing from deterministic or static-prompt surfaces), Screen [13]/[38] — Quick Actions Menu pattern reused for Reflection Card long-press edit/delete
- **Patterns used**: Modal Presentation (Batch 1, compact-height variant), 8-State Model, Mood Selector (Screen 37), Voice Recording Mode / transcription pipeline (Screen 37), Text Input Field conventions (Batch 1, minimal variant), Section Eyebrow Label (Screen 12), Skeleton Loading States
- **Patterns established**: Double-Tap Gesture Target (dual-purpose gesture layered on existing tap targets without intercepting single-tap behavior), Quick Capture Sheet (compact ~45%-height bottom sheet, single prompt + fast-entry text + mood row + voice, sub-15-second capture target), Origin Context Chip (provenance linking + detach), Reflection Card — Inline (compact, teal-accented, cross-context card distinct from full Journal Entry Row, --r-md instead of --r-xl), Reflection Arc/Pattern View (secondary, deliberately quiet trend surface reached only via overflow, never primary nav), the documented domain-color CTA exception (teal Save CTA, justified by this pattern's single-domain, cross-screen-portable nature)
