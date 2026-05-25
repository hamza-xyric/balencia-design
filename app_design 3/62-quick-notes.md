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

**60/30/10 verification**: Orange dominates through the send button (primary CTA), active "all" filter chip, reminder tag, swipe-right tag zone, and undo action. Green is absent from this screen (no success/completion states — notes are captured, not completed). Purple is limited to "ask SIA" text links and dots on each note card — exactly the AI-indicator role. Tag colors appear exclusively on tag chips and filter chips. Ratio holds with orange as the visual driver of action.

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
