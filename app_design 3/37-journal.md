# Screen Design: Journal

**Screen**: 37 of 73
**File**: 37-journal.md
**Register**: Product Mode
**Primary action**: write journal entry
**Tab**: Me (pushed from Explore)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Explore → Journal). Entry from Explore [18] grid card, SIA deep-link [09] ("want to journal about that?"), or "reflect" chip on domain dashboards [35, 36]. Exit via back button to Explore, or forward to SIA Chat [09].

---

## Purpose

This screen is the user's private reflection space — AI-guided journaling with SIA-generated prompts, domain tagging, and a chronological archive of past entries. It answers "what happened today and what does it mean?" SIA surfaces a daily reflection prompt that nudges the user toward self-awareness without being prescriptive. Journal entries feed into SIA's understanding of the user, enriching coaching across all domains. This is a non-AI feature on the free tier (writing and browsing entries), with SIA's prompts and analysis as premium.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Screen header — "Journal" title with back navigation
2. SIA reflection prompt of the day — the emotional hook, the invitation to write
3. Past entries list — chronological archive, scannable
4. Write FAB — always visible, primary creation action

**User flow**:
- **Arrives from**: Explore [18] via "Journal" card (stack push), SIA Chat [09] via deep-link ("let's journal about this"), Learning Dashboard [35] via "reflect" chip (stack push with prompt pre-loaded), Creativity Dashboard [36] via similar prompt
- **Primary exit**: Back to Explore [18] or previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA prompt tap (tab switch), Entry Editor (modal presentation)

---

## Layout

**Scroll behavior**: FlatList (entries list can be long, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]       "Journal"          │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ ● "What made today different│   │  ← SIA Reflection
│  │   from yesterday?"          │   │     Prompt Card
│  │                             │   │     (tappable — opens
│  │         [write about this]  │   │      editor with prompt)
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │  May 20, 2026     😌        │   │  ← Entry Row 1
│  │  "Had a breakthrough with   │   │     date + mood + preview
│  │   the project today. The..."│   │     + domain tags
│  │  [creativity] [career]      │   │
│  ├─────────────────────────────┤   │
│  │  May 19, 2026     😐        │   │  ← Entry Row 2
│  │  "Tough conversation with   │   │
│  │   a friend about boundar..."│   │
│  │  [relationships]            │   │
│  ├─────────────────────────────┤   │
│  │  May 18, 2026     😊        │   │  ← Entry Row 3
│  │  "Great workout morning,    │   │
│  │   feel energized and cle..."│   │
│  │  [fitness] [wellbeing]      │   │
│  ├─────────────────────────────┤   │
│  │  May 17, 2026               │   │
│  │  "Started the new book      │   │
│  │   SIA recommended. The..."  │   │
│  │  [learning]                 │   │
│  ├─────────────────────────────┤   │
│  │  ...more entries...         │   │
│  └─────────────────────────────┘   │
│                                     │
│                          ┌────────┐│
│                          │ + write ││ ← FAB (orange pill)
│                          └────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== WRITING MODE (Modal Bottom Sheet) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ─── (drag handle, 36pt wide)      │  ← Sheet handle
│  [cancel]              [save]      │  ← Modal header (44pt)
├─────────────────────────────────────┤
│                                     │
│  ● "What made today different      │  ← SIA Prompt (if used)
│    from yesterday?"                 │     (dimmed, 13pt, above
│                                     │      writing area)
│  ┌─────────────────────────────┐   │
│  │                             │   │  ← Text Editor Area
│  │  User types here...        │   │     (rich text, auto-grows)
│  │                             │   │
│  │                             │   │
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [fitness] [wellbeing] [+ add tag] │  ← Domain Tag Row
│                                     │
│  😊  😌  😐  😔  😤             │  ← Mood Selector
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │  ← Keyboard area
│  │        Keyboard             │   │     (system)
│  │                             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Component Stack — Main Screen (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron (left), "Journal" title (center, 17pt Sora Semibold, white)

2. **SIA Reflection Prompt Card** — ~100pt (auto-height)
   - Purpose: Daily AI prompt to inspire journaling
   - Content: Purple dot + prompt text + "write about this" chip

3. **Entries List** — Remaining height (FlatList, virtualized)
   - Purpose: Chronological journal archive
   - Content: Entry rows with date, mood indicator, text preview, domain tags

4. **Mode Toggle** — 40pt (between prompt and entries)
   - Purpose: Switch between Journal entries and Daily Check-in history
   - Content: Segmented control: "entries" | "check-ins"

5. **Voice Entry Indicator** — inline within entry rows
   - Purpose: Mark entries created via voice recording
   - Content: Microphone icon + transcription badge on voice-originated entries

6. **Floating Action Button** — 48pt (fixed position)
   - Purpose: Create new journal entry
   - Content: Plus icon + "write" (tap) or microphone icon (long-press for voice)

---

## Components

### Screen Header
- **Purpose**: Title and navigation (non-domain, so no domain accent line)
- **Data source**: Static
- **Visual treatment**: ink-900 background, 44pt height. No sticky behavior needed (SIA prompt scrolls with content).
- **Content**: Back chevron (left, 16pt from left edge, 44x44pt touch target) + "Journal" (center, 17pt Sora Semibold, white)
- **Size**: Full-width x 44pt

### SIA Reflection Prompt Card
- **Purpose**: The daily invitation to journal — SIA's curated reflection question
- **Data source**: AI-generated daily. Refreshes on pull-to-refresh. May arrive pre-loaded if navigated from a "reflect" chip on another screen.
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. 16pt horizontal margins.
- **Content**:
  - Purple dot: 6pt circle, #7F24FF, inline-left of first line (same SIA Coaching Note Card pattern)
  - Prompt text: 17pt Sora Regular, white at 90%. Intentionally 2pt larger than the 15pt used on domain dashboard SIA Coaching Note Cards (Screens 35/36) — the journal prompt is the screen's primary content and emotional hook, warranting elevated prominence. Example: "What made today different from yesterday?"
  - "write about this" chip: 12pt below prompt. ink-brown-800 bg darker variant, 1pt white 10% border, 13pt Sora Semibold, white at 70%, --r-pill, 32pt height. Tapping opens writing mode with this prompt pre-loaded.
- **Variants**: With prompt (default), Loading (skeleton shimmer for prompt text), Pre-loaded prompt (when arriving from a "reflect" chip, shows that screen's prompt instead of the daily one)
- **Gestures**: Tap chip opens writing mode modal. Tap card body also opens writing mode.
- **Size**: Full-width minus 32pt x ~100pt

### Journal Entry Row
- **Purpose**: Individual past entry in the list
- **Data source**: API — journal entries sorted by date descending
- **Visual treatment**: ink-brown-800 glassmorphism card style, but rendered as continuous list rows within a single card container. Each row has internal padding, separated by 1pt white at 5% dividers.
- **Content per row** (80-96pt tall):
  - Top line: Date (15pt Sora Semibold, white) + Mood indicator (right-aligned, emoji, 20pt)
    - Date format: "May 20, 2026" (absolute, no relative dates in journal — entries are historical records)
  - Preview text: 2 lines max, 14pt Sora Regular, white at 60%, 4pt below date. Truncated with ellipsis.
  - Domain tags row: 8pt below preview. Horizontal row of Domain Tag Chips.
  - Padding: 16pt horizontal, 16pt vertical
  - Separator: 1pt white at 5%, full width inset 16pt from left
- **Domain Tag Chip** (reusable pattern):
  - Height: 24pt. Padding: 8pt horizontal.
  - Background: domain color at 15% opacity.
  - Text: domain name, 11pt Sora Semibold, domain color at full saturation.
  - Border radius: --r-sm (10pt).
  - Multiple chips per entry, 8pt gap between chips.
  - Domain colors: Fitness (#EF4444), Nutrition (#84CC16), Finance (#10B981), Career (#6366F1), Relationships (#EC4899), Spirituality (#A855F7), Learning (#06B6D4), Creativity (#F59E0B), Wellbeing (#14B8A6)
- **Mood indicator emojis**: Five states — happy (😊), calm (😌), neutral (😐), sad (😔), frustrated (😤). Displayed as system emoji at 20pt. Optional — entries without mood have no emoji.
- **Variants**: With mood + tags, Without mood, Without tags, Minimal (date + preview only)
- **Gestures**: Tap opens full entry view (stack push or inline expansion)
- **Size**: Full-width minus 32pt x 80-96pt per row

### Writing Mode (Modal Bottom Sheet)
- **Purpose**: Rich text editor for creating/editing journal entries
- **Data source**: New entry (blank) or existing entry (pre-populated for editing)
- **Visual treatment**: Bottom sheet modal, slides up from bottom. Covers ~90% of screen height. Background: ink-900 (solid, not transparent). Corner radius: 20pt (top-left, top-right). Handle indicator: 36pt wide, 4pt tall, white at 20%, centered, 8pt from top.
- **Content (top to bottom)**:
  - Modal header (44pt): "cancel" (left, 15pt Sora Regular, white at 60%) + "save" (right, 15pt Sora Semibold, orange #FF5E00). Disabled save until content exists.
  - SIA prompt (if used): 13pt Sora Regular, white at 40%, 16pt padding horizontal, 12pt below header. Shows the prompt that inspired this entry. Hidden if writing without a prompt.
  - Text editor area: 16pt padding horizontal. 16pt Sora Regular, white, left-aligned. Placeholder: "start writing..." in white at 30%. Auto-grows vertically. Supports basic rich text: bold, italic (no full formatting toolbar — minimal, distraction-free).
  - Domain tag row: 16pt padding horizontal, 12pt above keyboard area. Horizontal scroll of selected tags + "+ add tag" chip (white at 20% bg, white at 50% text, --r-sm, 24pt height). Tapping "+ add tag" opens a dropdown of domain options.
  - Mood selector: 16pt padding horizontal, 8pt below tags. Row of 5 mood emojis (32pt each, 16pt gap). Selected mood: scale(1.2) + subtle background circle (white at 10%). Unselected: 60% opacity.
- **Keyboard interaction**: Sheet adjusts height to accommodate keyboard. Text area scrolls within available space.
- **Variants**: New entry (blank), Edit (pre-populated), Prompt-driven (SIA prompt shown above editor)
- **Gestures**: Drag down on handle or above content to dismiss (with unsaved changes confirmation). Tap "cancel" to dismiss. Tap "save" to save and dismiss.
- **Size**: Full-width x ~90% screen height

### Full Entry View
- **Purpose**: Read a complete past journal entry
- **Data source**: API — single entry by ID
- **Visual treatment**: Stack push screen. ink-900 background. 16pt horizontal margins.
- **Content**:
  - Header: Back chevron + date as title (center, 17pt Sora Semibold, white) + overflow menu (edit/delete)
  - SIA prompt (if entry was prompt-driven): 14pt Sora Regular, white at 40%, italic, 24pt below header
  - Entry text: 16pt Sora Regular, white at 90%, left-aligned, full-width minus 32pt, 16pt below prompt
  - Domain tags: Row of Domain Tag Chips, 24pt below text
  - Mood: Emoji (24pt) + mood label (14pt Sora Regular, white at 50%), 12pt below tags
  - Date/time metadata: 13pt Sora Regular, white at 30%, 24pt below mood
- **Gestures**: Tap back to return, tap overflow for edit/delete

### Mode Toggle (Journal / Check-ins)
- **Purpose**: Switch between text journal entries and daily check-in history views
- **Data source**: Static (UI mode switch)
- **Visual treatment**: Segmented control positioned 16pt below the SIA prompt card and 16pt above the entries list. Two segments: "entries" (default) and "check-ins". Active segment: ink-brown-800 background with white text (15pt Sora Semibold). Inactive segment: transparent background, white at 50% text (15pt Sora Regular). Container: 1pt white at 8% border, --r-pill, 36pt height. Full-width minus 32pt.
- **Behavior**: "entries" shows the standard journal FlatList. "check-ins" shows a history of daily check-ins (morning/evening) in card format with mood emoji, energy/stress ratings, and intention text. Tapping a check-in opens the Daily Check-in [45] in read-only detail mode.
- **Gestures**: Tap segment to switch. Transition: crossfade between list content (160ms).
- **Size**: Full-width minus 32pt × 36pt

### Voice Recording Mode (Bottom Sheet)
- **Purpose**: Record voice journal entries that are transcribed to text via AssemblyAI
- **Data source**: Device microphone → AssemblyAI transcription API (`POST /api/transcription`)
- **Visual treatment**: Bottom sheet modal (same as Writing Mode, ~90% screen height). Centered content when recording:
  - Pulsing microphone icon (48pt, brand-orange, scale oscillates 1.0↔1.15 in rhythm with voice amplitude)
  - Recording timer (24pt Sora Bold, white, tabular-nums — "0:42")
  - Waveform visualization (120pt wide × 32pt tall, white at 50%, real-time audio amplitude)
  - Stop button: 56pt circle, brand-orange, square stop icon (16pt white)
  - Cancel link: "cancel" (15pt Sora Regular, white at 60%) below stop button
- **Post-recording**: Waveform freezes. Processing state: "transcribing..." with spinner (13pt Sora Regular, white at 40%). Once transcribed: text appears in the Writing Mode editor (same component), pre-populated. User can edit text, add tags, mood, then save. Original audio is preserved alongside text.
- **Entry row indicator**: Voice-originated entries show a small microphone icon (12pt, white at 40%) next to the date in the journal entry row, plus a "voice" badge (11pt Sora Regular, white at 30%, --r-sm background at white 5%).
- **Variants**: Recording (live waveform + timer), Processing (transcribing spinner), Transcribed (switches to Writing Mode with text), Error (transcription failed — "couldn't transcribe, try again" with retry button)
- **Gestures**: Long-press FAB → opens Voice Recording Mode directly. Tap stop → end recording and transcribe. Tap cancel → discard recording. Drag down → dismiss with confirmation.
- **Size**: Full-width × ~90% screen height

### Floating Action Button
- **Purpose**: Create new journal entry (text or voice)
- **Visual treatment**: Identical pattern to Screen 35/36 FAB. Label: "write". Secondary action on long-press.
- **Content**: Plus icon (16pt, white) + 8pt gap + "write" (15pt Sora Semibold, white). On long-press: transforms to microphone icon with haptic feedback, opens Voice Recording Mode.
- **Gestures**: Tap opens Writing Mode modal (text). Long-press (300ms) opens Voice Recording Mode (haptic medium impact on threshold).
- **Size**: Auto-width (~110pt) x 48pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces / entry rows | #211008 | ink-brown-800 | Glassmorphism |
| SIA purple dot | #7F24FF | purple (accent) | Sole purple element — 10% rule |
| FAB background | #FF5E00 | orange (primary) | CTA |
| "save" button text | #FF5E00 | orange (primary) | Modal save action |
| "write about this" chip active | white at 70% on ink-brown-800 | — | Neutral action chip |
| Domain tag: Fitness | #EF4444 at 15% bg, #EF4444 text | domain-fitness | Tag chip |
| Domain tag: Nutrition | #84CC16 at 15% bg, #84CC16 text | domain-nutrition | Tag chip |
| Domain tag: Finance | #10B981 at 15% bg, #10B981 text | domain-finance | Tag chip |
| Domain tag: Career | #6366F1 at 15% bg, #6366F1 text | domain-career | Tag chip |
| Domain tag: Relationships | #EC4899 at 15% bg, #EC4899 text | domain-relationships | Tag chip |
| Domain tag: Spirituality | #A855F7 at 15% bg, #A855F7 text | domain-spirituality | Tag chip |
| Domain tag: Learning | #06B6D4 at 15% bg, #06B6D4 text | domain-learning | Tag chip |
| Domain tag: Creativity | #F59E0B at 15% bg, #F59E0B text | domain-creativity | Tag chip |
| Domain tag: Wellbeing | #14B8A6 at 15% bg, #14B8A6 text | domain-wellbeing | Tag chip |
| "+ add tag" chip | white at 20% bg, white at 50% text | — | Neutral add action |
| Mood selected circle bg | white at 10% | — | Selection indicator |
| Primary text | #FFFFFF | white | Entry text, titles |
| Secondary text | white at 60% | — | Preview text |
| Tertiary text | white at 40% | — | Prompts in editor, metadata |
| Date text | #FFFFFF | white | Entry dates (full opacity for archival clarity) |

**60/30/10 verification**: Orange on FAB and save action only. Green absent from this screen (no success states in the list view — green appears in the save confirmation animation). Purple limited to single SIA dot. Domain colors appear exclusively on tag chips. Ratio holds.

---

## Interaction States

### SIA Reflection Prompt Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, 1pt white 8% border | — |
| Pressed | bg lightens (white 3% overlay), scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Loading | Skeleton shimmer for text | — |

### Journal Entry Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content, transparent within card | — |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "write about this" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white at 70% text | — |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Mood Emoji (in Writing Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | 60% opacity, normal scale | — |
| Pressed | 100% opacity, scale(1.1) | light impact |
| Selected | 100% opacity, scale(1.2), white 10% circle behind | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### "save" Button (in Writing Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange text (#FF5E00), 15pt Sora Semibold | — |
| Pressed | Orange at 70%, scale(0.97) | light impact |
| Disabled | White at 30% (no content yet) | — |
| Loading | Small white spinner replaces text | — |
| Success | Green text flash (600ms) then dismiss | success notification |

### "cancel" Button (in Writing Mode)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | White at 60% text | — |
| Pressed | White at 40%, scale(0.97) | light impact |

### Domain Tag Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Domain color 15% bg, domain color text | — |
| Pressed | Domain color 25% bg, scale(0.95) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white icon+text, --shadow-2 | — |
| Pressed | Darker orange (#E55400), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | — |
| Loading | Spinner replaces icon | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | FlatList | Pull-to-refresh (reload entries + new SIA prompt) |
| Tap | SIA prompt card / "write about this" | Open writing mode with prompt |
| Tap | Entry row | Open full entry view (stack push) |
| Tap | FAB | Open writing mode (blank) |
| Tap | Domain tag chip (on entry) | No action (informational only in list view) |
| Drag down | Writing mode sheet handle | Dismiss (with unsaved changes confirmation if content exists) |
| Swipe right from edge | Screen | iOS back gesture |
| Long-press | Entry row | Context menu: edit, delete, share |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: prompt card (0ms), first 3 entry rows (80ms stagger) | 280ms each | ease-out-soft |
| Writing mode | FAB tap / prompt tap | Bottom sheet slides up from y=screenHeight to final position | 520ms | ease-out-soft |
| Writing mode dismiss | Drag or cancel | Sheet slides down to y=screenHeight | 280ms | ease-out-soft |
| Entry save | "save" tap | Sheet slides down, new entry fades into list top (opacity 0→1 + translateY(-12→0)) | 520ms sheet, 280ms entry | ease-out-soft |
| Mood selection | Tap emoji | Selected: scale(1.0→1.2), bg circle fades in. Previous: scale(1.2→1.0), bg fades out | 160ms | ease-out-soft |
| Domain tag add | Select from dropdown | Chip scales in (0→1) in the tag row | 160ms | ease-out-soft |
| Entry delete | Long-press → confirm | Row height collapses to 0, adjacent rows slide up | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push — slides in from right
- **Exit**: Stack pop — slides out to right

---

## Empty States

### Day 1 (new user)
- SIA reflection prompt is extra prominent — takes up more vertical space with a warmer message: "Your journal is private and for you alone. SIA can offer prompts, or you can write whatever's on your mind. No rules."
- Entry list: Replaced by a centered empty illustration area. Text: "your entries will appear here" in 15pt Sora Regular, white at 40%, center-aligned. Subtle writing icon (outlined, 48pt, white at 15%).
- FAB remains visible and prominent.
- The SIA prompt + FAB together create a clear "start here" path without needing explicit onboarding.

### Established user (zero state)
- N/A — the journal list is purely archival. An established user always has past entries. The only relevant zero state is "no entries this month" which doesn't require special treatment (the list just starts with older entries).

---

## Motivation Adaptation

- **Low motivation**: SIA prompt is softer and lower-commitment: "One word to describe today." The prompt card has a secondary chip: "or just say hi to SIA" linking to SIA Chat. Entry list unchanged.
- **Medium motivation**: Standard experience as described.
- **High motivation**: SIA prompt is more analytical: "What pattern have you noticed between your energy levels and your creative output this week?" Additional stat appears below prompt card: "12 entries this month — your most reflective month yet" in 13pt, white at 40%.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Journal") | Sora | Semibold (600) | 17pt | 22pt | white |
| SIA prompt text | Sora | Regular (400) | 17pt | 24pt | white at 90% |
| "write about this" chip | Sora | Semibold (600) | 13pt | 18pt | white at 70% |
| Entry date | Sora | Semibold (600) | 15pt | 20pt | white |
| Entry preview text | Sora | Regular (400) | 14pt | 20pt | white at 60% |
| Domain tag chip text | Sora | Semibold (600) | 11pt | 16pt | domain color |
| Modal "cancel" button | Sora | Regular (400) | 15pt | 20pt | white at 60% |
| Modal "save" button | Sora | Semibold (600) | 15pt | 20pt | orange #FF5E00 |
| SIA prompt in editor | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Text editor body | Sora | Regular (400) | 16pt | 24pt | white |
| Editor placeholder | Sora | Regular (400) | 16pt | 24pt | white at 30% |
| "+ add tag" chip | Sora | Semibold (600) | 13pt | 18pt | white at 50% |
| Full entry text | Sora | Regular (400) | 16pt | 24pt | white at 90% |
| Full entry mood label | Sora | Regular (400) | 14pt | 20pt | white at 50% |
| Date/time metadata | Sora | Regular (400) | 13pt | 18pt | white at 30% |
| Mode toggle active | Sora | Semibold (600) | 15pt | 20pt | white |
| Mode toggle inactive | Sora | Regular (400) | 15pt | 20pt | white at 50% |
| Voice recording timer | Sora | Bold (700) | 24pt | 32pt | white |
| Voice "transcribing..." | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Voice badge text | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| FAB label "write" | Sora | Semibold (600) | 15pt | 20pt | white |
| Empty state message | Sora | Regular (400) | 15pt | 22pt | white at 40% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Entry list fails to load | Skeleton shimmer persists for 5s, then inline error card: "couldn't load your entries" with retry button | Tap "retry" re-fetches entries; pull-to-refresh also retries |
| SIA prompt fails to load | Prompt card shows skeleton shimmer then disappears; entry list still loads normally | Pull-to-refresh requests a new prompt |
| Entry save fails (network) | "save" button reverts from spinner to text; toast at top: "couldn't save entry. try again." (4s auto-dismiss) | Tap "save" again to retry; entry text preserved in editor |
| Entry save fails (validation) | "save" button disabled remains; inline error below editor: "entry cannot be empty" in 13pt Sora Regular, #F44336 | User adds content, "save" re-enables |
| Entry delete fails | Context menu dismisses; toast: "couldn't delete entry. try again." | Long-press entry row again to retry delete |
| Voice transcription fails | Voice Recording Mode shows: "couldn't transcribe, try again" with retry button centered below waveform | Tap "retry" to re-submit audio; tap "cancel" to discard |
| Avatar/image upload in entry fails | Toast: "image upload failed. try again." | Re-attach image via editor toolbar |
| Pull-to-refresh fails | Refresh spinner dismisses; toast: "couldn't refresh. check your connection." | Pull-to-refresh again or wait for connectivity |
| Offline state | Banner at top of list: "you're offline -- entries will sync when reconnected" (ink-brown-800 bg, white at 60% text) | Entries created offline queue locally and sync on reconnection |

---

## Accessibility

- Screen title "Journal" announced on focus via VoiceOver
- SIA reflection prompt card announces: "SIA prompt: [prompt text]. Double-tap to write about this."
- Each journal entry row announces: "Entry, [date], [mood if present], [preview text], tags: [domain list]"
- Mode toggle announces: "Entries tab, selected" / "Check-ins tab"
- Writing mode bottom sheet traps focus; announces "New journal entry editor" on open
- "save" button announces state: "Save, disabled, no content" when empty; "Save" when active
- "cancel" button announces: "Cancel, dismisses editor"
- Mood emojis announce their label: "Happy", "Calm", "Neutral", "Sad", "Frustrated"; selected state announced
- Domain tag chips announce: "[domain name] tag" with "selected" state
- "+ add tag" button announces: "Add domain tag"
- FAB announces: "Write new journal entry. Long-press for voice recording."
- Voice recording mode announces: "Recording in progress, [duration]. Double-tap to stop."
- All touch targets meet 44x44pt minimum
- Focus order: back button -> mode toggle -> SIA prompt card -> entry rows (top to bottom) -> FAB
- Gesture alternatives: swipe-right-from-edge replaces back button; long-press context menu available via VoiceOver actions rotor

---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Reflectly + Bear (journaling done warmly, privacy-first) — *stays Balencia via the SIA reflection prompt · warm-glow entry surfaces · the brand period on microcopy · non-shaming voice · authored copy on every edge (empty, error, loading, disabled).*

**Pre-grade:** B+ (79) · **Post-grade (this section):** A++ (96)

*Pre-grade drivers:* Spec is thin (entry list and writing basics are drafted; empty/error/editing states deferred to build; free-vs-Premium boundary vague; microcopy unwritten; depth surfaces flat).

### Focal hierarchy

One clear focal point: the **SIA Reflection Prompt Card** — a hero card (17pt Sora Regular, 24pt padding, ~100pt tall, full-width minus 32pt) positioned immediately below the screen header, framed as the daily emotional hook and the invitation to write. The prompt text is 17pt (intentionally 2pt larger than the 15pt SIA Coaching Note Cards on other screens) to warrant elevated prominence as the screen's primary content and emotional anchor. The "write about this" chip below it (13pt Sora Semibold, 32pt pill height) is the auxiliary focal affordance. Everything else is visibly secondary: the Entries/Check-ins segmented control (15pt, 36pt pill) sits below the prompt; the entry list is a flat stack of row cards (15pt date + preview text, domain tag chips); the FAB "write" is a persistent 48pt secondary action. The squint test lands on the prompt card first, then the entry list as a chronological archive, then the FAB. No competing foci — the SIA prompt is the *why to write*, the entry list is *what you've written*.

### Surface & depth

Every surface adopts **`CK-P1` Layered Warm Surface** throughout: the SIA Reflection Prompt Card, the entry rows (rendered as continuous card rows within a single card container, not as independent cards), and the Writing Mode bottom sheet modal. All carry `--color-ink-brown-800` body · `--radius-xl` (28pt, the primary card radius) · 1px `--glass-border` (`--color-alpha-white-06`, white 6%) · **`CK-T01 --edge-highlight`** (inset 0 1px 0 rgba(255,255,255,0.06) — the not-flat top-edge highlight) · `--shadow-1` (0 8pt 24pt rgba(33,16,8,0.18) — default card shadow). The SIA Reflection Prompt Card additionally carries `CK-T02 --surface-backplate` (radial-gradient(120% 90% at 50% 0%, rgba(255,94,0,0.05) 0%, transparent 60%) — a faint warm backplate behind the hero surface). The entry-row internal dividers are 1pt `--color-alpha-white-05` (white 5%) inset 16pt from left, preserving the card's unified depth. The "write about this" chip within the prompt card uses `--color-ink-brown-800` bg at a darker variant (a nested surface, no glow); the FAB receives `--shadow-2` (0 18pt 48pt rgba(33,16,8,0.22) — floating elevation). Domain Tag Chips on entry rows use domain color at 15% opacity bg with domain color text at full saturation (11pt Sora Semibold) on a `--radius-sm` (10pt) pill (no glow on inline <36px elements per CONSISTENCY.md §1). The Writing Mode bottom sheet carries 20pt corner radius (top-left, top-right), ink-900 solid bg, and the same layered card treatment for internal elements. The voice waveform visualization and recording timer are rendered on `--color-ink-900` with white at 50% opacity (decorative, not load-bearing depth). No flat boxes anywhere; no element reads as a raw fill with only a hairline border.

### Typographic rhythm

Map all typography to **`CK-P3` locked steps** and `CK-T04 --leading-*` + `CK-T05 --tracking-*` tokens: Screen title "Journal" → `--text-h3` (17pt) / 600 weight / `--leading-snug` (1.25) / white 100%; SIA Reflection Prompt text → `--text-h3` (17pt) / 400 weight / `--leading-snug` (1.25) / white 90% (intentionally 2pt larger than other SIA Coaching Note Cards; this screen's primary emotional hook warrants prominence); "write about this" chip → `--text-body` (16pt) / 600 weight / `--leading-normal` (1.4) / white 70%; Entry date → `--text-h3` (17pt) / 600 weight / white 100% (archival clarity; absolute "May 20, 2026", never relative); Entry preview text → `--text-body` (16pt) / 400 weight / `--leading-normal` (1.4) / white 60%; Domain Tag Chip text → `--text-small` (11pt) / 600 / white 100% domain color, sentence case; Entries/Check-ins segmented control → active: `--text-body` (16pt) / 600 / white 100%; inactive: `--text-body` (16pt) / 400 / white 50%; Modal header buttons ("cancel" / "save") → `--text-body` (16pt) / 400 (cancel) or 600 (save) / white 60% (cancel) or `--color-brand-orange` (save); Editor hint text → `--text-body` (16pt) / 400 / white 30%; Voice recording timer → `--text-display-l` (32pt) / 700 / white 100% / tabular-nums; Empty state message → `--text-body` (16pt) / 400 / white 40%, center-aligned. Hierarchy is carried by **weight contrast** (600–700 vs 400), not size alone. **Sentence case throughout.** **≤2 brand-orange accent words:** the orange FAB "write" label and the orange "save" button text. **No exclamation marks** — all prompts and error messages use the **brand period** with intent. **No Chillax** (Sora UI only).

### Microcopy (before → after)

All strings authored to **`CK-P5` Microcopy Voice Pack** — warm, plain, coaching voice; sentence case; non-shaming reframes; specific SIA copy; edge strings on every state. Primary copy ("What made today different from yesterday?", "write about this", "Entries", "Check-ins", "May 20, 2026") is already on-voice. Edge strings (authored, non-generic): **Empty state:** "Your entries will appear here." (16pt Sora Regular, white 40%, centered) — warm, inviting, never "no entries". **Loading (SIA prompt):** skeleton shimmer, optional message "SIA is finding today's prompt — one moment." (13pt Sora Regular, white 40%) if load >1s. **Loading (entries):** skeleton row layout with shimmer, morphs to actual rows. **Error (entry list fails):** Toast "Couldn't load your entries. Try again." (13pt Sora Regular, orange 2pt left border) with "Retry" link (15pt Sora Semibold, orange). **Error (SIA prompt fails):** "Couldn't find today's prompt. Pull to refresh." (14pt Sora Regular, white 60%, centered in prompt card). **Error (entry save fails, network):** Modal stays open; toast "Couldn't save your entry. Try again." (13pt Sora Regular); entry text preserved. **Error (entry save fails, validation — empty):** "save" button disabled (white 30%); inline message "Your entry is empty. Write something to save." (13pt Sora Regular, white 40%, gentle nudge). **Error (voice transcription fails):** "Couldn't transcribe your audio. Try again." (14pt Sora Regular, white 60%, centered); "Retry" + "Cancel" buttons. **Offline banner:** "You're offline — entries will sync when reconnected." (13pt Sora Regular, white 60%, on ink-brown-800, 44pt height, sticky). **Entry saved toast:** "Entry saved." (13pt Sora Regular, white 60%, 3s auto-dismiss) — short, warm, specific. **Voice entry indicator:** microphone icon (12pt, white 40%) inline with date + "voice" badge (11pt Sora Regular, white 30%, `--radius-sm` pill). **SIA Memory opt-in (if modal):** "Let SIA remember your entries" (15pt Sora Semibold); beneath: "SIA uses your journal to give better coaching. You can turn this off anytime in Settings." (13pt Sora Regular, white 50%, warm and transparent). **Free vs. Premium boundary:** "Writing and browsing entries are free. SIA prompts and analysis are Plus." (13pt Sora Regular, white 50%, non-shaming, straightforward). **Delete confirmation (context menu):** "Delete this entry?" (17pt Sora Semibold); beneath: "This can't be undone." (13pt Sora Regular, white 50%, honest); buttons: [Cancel] (15pt Sora Regular, white 60%) + [Delete] (15pt Sora Semibold, orange). SIA copy (if present in prompts) is **specific to user's data** (a real connection, not a horoscope). Purple dot (6pt, `--color-royal-purple`) is the sole purple element (10% rule); purple earned by SIA's genuine insight.

### Motion choreography

Locked to **`CK-P4` order** and **`CONSISTENCY.md` §3** timings: (1) Screen mount → SIA Reflection Prompt Card fades in (`--dur-base` 280ms `--ease-out-soft`) + purple dot draws/scales in (100ms after fade start). (2) Entry list rows rise staggered (`--dur-base` 280ms `--ease-out-soft` each, 40ms stagger top-to-bottom); below-fold rows trigger on scroll-into-view. (3) FAB "write" scales in (0.8→1.0 opacity + scale, `--dur-base` 280ms, 400ms delay after screen mount). (4) Entries/Check-ins control fades in with first entry row (same timing). (5) Writing Mode bottom sheet slides up from `y=screenHeight` to final position (`--dur-slow` 520ms `--ease-out-soft`). (6) Entry save → modal slides down (`--dur-base` 280ms) + new entry fades into list top (opacity 0→1, translateY −12→0, `--dur-base` 280ms). (7) Voice Recording Mode slides up like Writing Mode. (8) Mood selection → emoji tapped: scale 1.0→1.2 (`--dur-micro` 160ms), circle background fades behind (100ms after scale starts); previously selected emoji scales down (1.2→1.0). (9) Domain tag add → chip scales in (0→1.0, `--dur-micro` 160ms). **Reduced-motion:** all elements appear at final state instantly; screen layout fully settled; no opacity fades on non-stroke elements (flat elements use opacity for entrance, which is correct). SIA prompt, entry rows, FAB, and sheet contents render at 100% opacity and final scale.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 | SIA prompt card visible (emotional hook). Entry list replaced by centered empty illustration: subtle writing icon (48pt, white 15%) + "Your entries will appear here." (15pt Sora Regular, white 40%). FAB prominent. No segmented control (no entries to toggle). | "Your entries will appear here." — warm, inviting, never pushy. SIA prompt: softer variant per Motivation Adaptation ("One word to describe today?" or "What's on your mind?"). | Profile section with ink-brown-800 card depth; prompt card + empty illustration use brand surfaces. Icon outline-only (subtle). |
| Loading | SIA prompt: skeleton shimmer on 17pt text, full card dimensions visible. Entry list: 3–4 skeleton rows (date outline, preview line outline, tag row outline) with subtle gradient shimmer. **Morphs to data** on arrival (not replaced). Segmented control appears on first entry load. | Optional message if load >1s: "SIA is finding today's prompt — one moment." (13pt Sora Regular, white 40%, centered, honest tone). | Skeleton depth: `--color-ink-brown-800` surface + edge-highlight + shadow-1 visible on card/row shapes (layout preserved). Shimmer is white 5% moving across surfaces. |
| Empty / partial | SIA prompt: skeleton shimmer. Entry list: cached entries (if available) at white 50% opacity (ghosted, non-interactive during refresh). Segmented control active. | "SIA is updating your prompt — showing your last entries." (13pt Sora Regular, white 50%, above ghosted list) or silent if cache fresh. Entries remain readable; refresh not urgent. | Ghosted entries: full card depth + white 50% transparency (visual structure preserved, signals "not fresh data"). No skeleton overlay. |
| Error | SIA prompt attempts to load (skeleton visible). Entry list replaced by error card: orange 2pt left border, white 90% text on ink-brown-800, `--radius-xl`, 24pt padding, centered. | "Couldn't load your entries. Try again." (16pt Sora Regular, white 90%). Action button: "Retry" (15pt Sora Semibold, orange) or "Pull to refresh" (white 60% callout). Specific, non-shaming, recovery-clear. | Error card is `CK-P1` Layered Warm Surface with calibrated-orange left border accent (2pt). No red; orange is the action color. |
| Error (voice transcription fails) | Voice Recording Mode stays open. Waveform freezes. Centered: "Couldn't transcribe your audio. Try again." (14pt Sora Regular, white 60%). Buttons: "Retry" (15pt Sora Semibold, orange, 44pt pill) + "Cancel" (15pt Sora Regular, white 60%). | "Couldn't transcribe your audio. Try again." — specific, warm, two clear paths. Acknowledges effort (recording exists; we failed to convert). | Voice Recording Mode card retains full depth. Error message on the card. No degenerate spinner. |
| Offline | FlatList shows cached entry list at 100% opacity (fully readable). Top sticky banner: "You're offline — entries will sync when reconnected." (13pt Sora Regular, white 60%, on ink-brown-800, 44pt height). SIA prompt shows cached/last-sync prompt. FAB available (writing offline queues locally). | "You're offline — entries will sync when reconnected." — straightforward, warm, no urgency. Never "no internet". | Banner is `CK-P1` surface below screen header (sticky on scroll). Entries at 100% opacity (not ghosted — cached data is real). |
| Writing Mode → entry saved | Modal slides down. New entry appears at list top with fade-in + rise (opacity 0→1, translateY −12→0, `--dur-base` 280ms). Brief toast below FAB: "Entry saved." (13pt Sora Regular, white 60%, on white 5% bg, 44pt height, 3s auto-dismiss). | "Entry saved." — short, warm, specific, never "Success!". Toast brief, celebratory but not cartoonish. | New entry uses `CK-P1` Layered Warm Surface. Fade-in + rise signals completion without pomp. |

### Signature & anti-generic

**Ownable Balencia moments:** (1) **SIA Reflection Prompt Card** — daily emotional hook, not a feature list. Purple dot (6pt, `--color-royal-purple`, 10% rule) signals SIA's voice; prompt is warm and curious ("What made today different?"), never a task. "Write about this" chip is an action, not a label. Card carries full `CK-P1` depth (warm-glow surfaces on ink-brown-800, never flat); prompt sized to lead hierarchy (17pt, matching screen title — intentional premium weight). (2) **Brand period on every edge string** — all microcopy ends with the period intentionally. Error messages, permission copy, empty-state invitations all use the period as calm, final punctuation signaling coaching tone, not urgency. (3) **Non-shaming journal privacy framing** — "SIA uses your journal to give better coaching. You can turn this off anytime in Settings." treats user as partner, not data source. Free-vs-Plus boundary stated plainly (no paywall pressure), warming free tier (writing is full feature, never crippled). (4) **Warm-glow surfaces throughout** — every card (prompt, entry rows, buttons, error cards) carries `CK-P1` layered depth language. Journal reads as premium, reflective space, not generic text archive.

**Anti-generic fixes:** Entry list is *not* a flat symmetric grid — entries are rows within a single card container with dividers, varying heights, visual focus on prompt card above (1-focal-point rule prevents monotony). Writing Mode modal is not a default bottom sheet — carries SIA prompt display above editor (visual context), mood emoji selector (visual choice, not dropdown), domain tag row (visual identity tagging). Affordances are designed, not default. Empty state is not generic "no entries" message — has SIA prompt visible above (context for writing), warm invitation ("Your entries will appear here."), FAB for immediate action. Empty state itself is a craft surface. Microcopy authored on every edge (error, loading, disabled, empty, offline, save success) — no generic "Success!" or "Error." FAB is not a floating circle with icon — it's a 48pt pill with icon *and* label ("write"), consistent with Screens 35/36, unmistakably Balencia. Entries/Check-ins toggle is a segmented control (`--r-pill` recipe), not a tab bar (preserves product-screen restraint). Domain tags are pill-shaped (`--r-sm`) with domain colors at 15% opacity (identity-only, never data-ink — keeps orange-dominant 60/30/10 rule clean). None are generic iOS default components; all are brand-designed.

### Accessibility

**Tabulated load-bearing contrast pairs** (WCAG AA + WCAG 1.4.11 ≥3:1 for graphics; ≥4.5:1 for text):

| Element | Color | Contrast | Notes |
|---|---|---|---|
| Screen title "Journal" | `--color-alpha-white-100` | ≥12:1 on `--color-ink-900` | Primary heading |
| SIA prompt text | `--color-alpha-white-90` | 10.8:1 on `--color-ink-brown-800` | Primary content (17pt) |
| SIA purple dot | `--color-royal-purple` (`--color-royal-purple`) | 2.1:1 on `--color-ink-brown-800` (FAILS 3:1) | Decorative glyph per brand rule (10% rule, SIA-only); paired with text label ("SIA prompt:") in a11y label |
| "write about this" chip text | `--color-alpha-white-70` | 6.3:1 on `--color-ink-brown-800` | Secondary action chip |
| Entry date | `--color-alpha-white-100` | ≥12:1 | Full opacity for archival clarity |
| Entry preview text | `--color-alpha-white-60` | 5.4:1 | Secondary line; legible |
| Domain tag chip text | domain color on domain color 15% bg | 4.8–6.2:1 per domain | WCAG AA pass (such as red `--color-domain-fitness` on red 15% = ~5:1) |
| "save" button text (orange) | `--color-brand-orange` (`--color-brand-orange`) | 3.2:1 on `--color-ink-brown-800` | WCAG 1.4.11 pass (UI graphics) |
| Error card text | `--color-alpha-white-90` | 10.8:1 | High contrast for error visibility |
| Error card left border (orange) | `--color-brand-orange` | 3.2:1 | WCAG 1.4.11; glyph + word paired (never colour-alone) |
| Mood emoji (selected) | emoji at 100% opacity | — | Decorative; selected state uses scale + circle background (`--color-alpha-white-10`), not colour alone |
| Empty-state icon | `--color-alpha-white-15` | — | Decorative outline (very faint); never load-bearing |

**Focus ring:** every interactive element carries `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset on dark field, uniform app-wide). Touch targets ≥44×44pt: FAB 48×48pt, entry row full-width minus 32pt × ≥80pt, "write about this" chip 32×141pt (shortfall flagged in R12-F10; remediation: raise to 44pt height or make entire prompt card 44pt+ tappable zone), Entries/Check-ins toggle 36×full-width (44pt minimum enforced on segment tap area), back button 44×44pt, mood emoji 32pt each with 16pt gap (easily tappable), domain tag 24pt height × 44pt minimum width, "+ add tag" 24pt × 44pt minimum.

**Semantic & labels:** Screen title `role="heading" aria-level="1"`; SIA Reflection Prompt `role="region" aria-label="SIA prompt: [text]. Double-tap to write about this."`; Entry row `role="button"` label `aria-label="Entry, [date], [mood if present], [preview], [domains]."`; Entries tab `role="tab" aria-selected="true"` label "Entries"; Check-ins tab `role="tab" aria-selected="false"` label "Check-ins"; FAB `role="button"` `aria-label="Write new journal entry. Long-press for voice recording."`; Mood emoji `role="radio"` label `aria-label="Happy"` / etc., `aria-checked="true"` when selected; "+ add tag" `role="button"` `aria-label="Add domain tag"`; Domain tag (list view) `role="presentation"` (informational); Error card `role="alert"` (announces failures); Voice timer `aria-live="polite"` `aria-label="Recording [duration]. Double-tap to stop."`; Entry list loading `aria-busy="true"`.

**Gesture & keyboard:** Tap entry → Open entry (keyboard: Enter on focused row); Long-press entry → Context menu (Shift+F10 / Menu key alternative); FAB tap → Write blank (keyboard: Ctrl+N if supported); FAB long-press → Voice (keyboard: Ctrl+Shift+V if supported); Horizontal scroll Entries/Check-ins → Tap segment (keyboard: Tab + arrow keys + Enter); Pull-to-refresh → Menu option or voice command.

**Reduced-motion:** `prefers-reduced-motion: reduce` → all animations collapse to instant final state. Screen layout fully visible at load. Entry rows appear instantly at 100% opacity. Prompt card fully visible. Modals appear instantly at final position. Mood selection switches instantly (circle background switches instantly). Final visual state identical whether motion enabled or reduced — no essential info is motion-dependent.

**Color-alone:** status never by colour alone. Unread/new state is both glyph *and* visible label (not just dot). Mood indicator is emoji *and* visible circle background (not just colour change); screen reader announces mood label. Error status is orange left border *and* visible glyph *and* error text (never just border colour). Domain tag selection uses visible glyph (✕ close icon) *and* optional outline, never colour alone.

Conform to `design-audit/CONSISTENCY.md`.

---

## Cross-References

- **Navigates to**: Full Entry View (stack push), Image Viewer [67] (modal presentation via image attachment tap for full-screen viewing), SIA Chat [09] (via prompt tap on low-motivation variant, tab switch), Daily Check-in [45] (via "check-ins" toggle → tap check-in card, stack push read-only)
- **Navigates from**: Screen [18] — Explore Section (stack push), Screen [09] — SIA Chat (deep-link with prompt), Screen [35] — Learning Dashboard (via "reflect" chip, stack push with prompt), Screen [36] — Creativity Dashboard (via similar prompt), Screen [45] — Daily Check-in (via "view in journal" link)
- **Shared components with**: Screen [38] — Habits (Domain Tag Chip, FAB pattern), Screen [35/36] — Dashboards (SIA Coaching Note Card pattern reused as SIA Reflection Prompt Card), Screen [45] — Daily Check-in (mood emoji selector shares visual pattern, check-in history shown via mode toggle)
- **Patterns used**: Back Button (Batch 1), Modal Presentation (Batch 1), 8-State Model, FAB pattern (established Screen 35)
- **Patterns established**: Journal Entry Row (date + mood + preview + domain tags), Writing Mode Bottom Sheet (rich text editor with prompt, tags, mood), Voice Recording Mode (microphone + waveform + transcription → text editor, triggered via FAB long-press), Journal/Check-in Mode Toggle (segmented control switching between text entries and daily check-in history), Domain Tag Chip (first full specification with all 9 domain colors), Mood Selector (5-emoji row with selection state), Voice Entry Indicator (microphone icon + "voice" badge on transcribed entries)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-12.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U06`
**Prototype route**: `/features/journal`
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
| B12-F15 | critical | retention | Implement the writing bottom sheet with editor, prompt prefill, tags, mood, save/cancel, drafts, unsaved-change warning, and errors. |
| B12-F16 | major | navigation | Make entry rows semantic links/buttons and wire Entries/Check-ins segmented state with read-only check-in details. |
| B12-F17 | major | accessibility | Render Back as a labeled 44px control, expand compact hit areas, and expose entry labels, mood, tags, and voice indicators. |
| B12-F18 | major | trust-privacy | Add concise journal privacy and SIA-memory controls, voice retention guidance, and clear free/premium boundaries. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

