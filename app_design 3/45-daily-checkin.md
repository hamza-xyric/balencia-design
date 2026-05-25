# Screen Design: Daily Check-in (Morning / Evening)

**Screen**: 45 of 73
**File**: 45-daily-checkin.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: submit daily check-in
**Tab**: Today (modal overlay or stack push from Home [12])
**Navigation**: Modal overlay (bottom sheet, 95% height) from Home Screen [12] via time-aware prompt card, or stack push from Habits [38] evening section. Morning variant triggers automatically on first app open before 12:00 PM (dismissable). Evening variant triggers after 6:00 PM if morning check-in exists. Exit via submit (saves + dismisses), cancel/drag-down (dismisses with unsaved confirmation if content exists), or back button (stack push variant).

---

## Purpose

The Daily Check-in is Balencia's emotional pulse — a gentle, reflective ritual that bookends the user's day. Morning and evening variants capture mood, energy, stress, and intention in a format that feels like a quiet conversation, not a clinical survey. The data feeds SIA's understanding of emotional patterns over time, enabling cross-domain insights ("your stress spikes on days you skip exercise"). Morning sets intention; evening reflects on fulfillment. Both variants prioritize warmth and brevity — the check-in should take under 60 seconds. This screen writes to `daily_checkins`, `mood_logs`, and `daily_intentions` tables, forming the foundation of Balencia's wellbeing analytics layer. Free tier includes mood, energy, and stress logging with basic completion tracking; SIA coaching notes, emotion analysis, and tomorrow preview require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Time-aware greeting — emotional anchor, sets the reflective tone
2. Mood Emoji Selector — the fastest, most visceral input (one tap)
3. Energy Slider — physical state awareness
4. Stress Slider — mental state awareness
5. Daily Intention (morning) / Intention Reflection (evening) — the purposeful core
6. Emotion Tags — nuanced emotional granularity (optional depth)
7. Context Note — freeform expansion (optional, expandable)
8. Gratitude Prompt (evening only) — positive reflection close
9. Tomorrow Preview (evening only) — forward-looking closure
10. Submit CTA — completion

**User flow**:
- **Arrives from**: Home Screen [12] via time-aware check-in prompt card (modal presentation), SIA Chat [09] via deep-link ("how are you feeling?", modal presentation), Habits [38] via evening habit row (stack push), Notification tap (morning/evening reminder, modal presentation)
- **Primary exit**: Submit check-in (saves data, dismisses modal/pops stack, returns to previous screen with success toast)
- **Secondary exits**: Cancel/drag-down (dismisses without saving, unsaved confirmation if content exists), back button (stack variant only)

---

## Layout

**Scroll behavior**: ScrollView (content varies by variant, ~700-900pt morning, ~900-1100pt evening, always scrollable)
**Tab bar visible**: No (modal variant covers tab bar), Yes (stack push variant)

### ASCII Wireframe — Morning Variant

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├───────────┬─────────────────────────┤
│ --- (drag handle, 36pt wide)        │  <- Sheet handle
│ [cancel]              [save]        │  <- Modal header (44pt)
├───────────┴─────────────────────────┤
│                                     │  <- 24pt gap
│  Good morning, Amira.               │  <- Greeting (20pt Bold)
│  How are you starting today?        │  <- Subtext (15pt Regular)
│                                     │  <- 24pt gap
│  HOW ARE YOU FEELING?               │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │  (face) (face) (face) (face)  │  │  <- Mood Emoji Selector
│  │  (face) (face)                │  │     6 emojis in 2 rows of 3
│  │  happy  meh   sad   angry     │  │     or 1 row of 6
│  │  anxious tired                │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ENERGY                             │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ low  1 ----*---------- 10 high│  │  <- Energy Slider
│  │           [7]                 │  │     teal fill, value badge
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  STRESS                             │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ calm 1 ------*-------- 10 high│  │  <- Stress Slider
│  │           [5]                 │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ┌───────────────────────────────┐  │
│  │ What's your focus today?      │  │  <- Daily Intention Input
│  │ (text input, single line)     │  │     52pt, teal focus border
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  HOW WOULD YOU DESCRIBE IT?         │  <- Eyebrow
│  [grateful] [excited] [anxious]     │  <- Emotion Tag Chips
│  [calm] [hopeful] [restless]        │     multi-select, teal
│  [focused] [overwhelmed] [content]  │     accent on selected
│                                     │  <- 16pt gap
│  + add a note                       │  <- Expandable Context Note
│  ┌───────────────────────────────┐  │     (collapsed by default)
│  │ (optional text area, 3 lines) │  │
│  └───────────────────────────────┘  │
│                                     │  <- 32pt gap
│  ┌───────────────────────────────┐  │
│  │        check in               │  │  <- Submit CTA
│  └───────────────────────────────┘  │     56pt, orange pill
│                                     │  <- 24pt gap
└─────────────────────────────────────┘
```

### ASCII Wireframe — Evening Variant

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├───────────┬─────────────────────────┤
│ --- (drag handle, 36pt wide)        │  <- Sheet handle
│ [cancel]              [save]        │  <- Modal header (44pt)
├───────────┴─────────────────────────┤
│                                     │  <- 24pt gap
│  Good evening, Amira.               │  <- Greeting (20pt Bold)
│  Let's close out your day.          │  <- Subtext (15pt Regular)
│                                     │  <- 24pt gap
│  HOW ARE YOU FEELING?               │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  (face) (face) (face) (face)  │  │  <- Mood Emoji Selector
│  │  (face) (face)                │  │     (same as morning)
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ENERGY                             │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ low  1 ----*---------- 10 high│  │  <- Energy Slider
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  STRESS                             │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ calm 1 ------*-------- 10 high│  │  <- Stress Slider
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  YOUR MORNING INTENTION             │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ "Focus on deep work before    │  │  <- Intention Reflection Card
│  │  meetings."                   │  │     shows morning text
│  │                               │  │
│  │ Did you fulfill this?         │  │
│  │  [ OFF *===* ON ]             │  │  <- Fulfillment Toggle
│  │                               │  │
│  │ How did it go?                │  │  <- Reflection Input
│  │ (text input, 2 lines)        │  │     52pt, teal focus border
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  HOW WOULD YOU DESCRIBE IT?         │  <- Eyebrow
│  [grateful] [relieved] [drained]    │  <- Emotion Tag Chips
│  [calm] [proud] [restless]          │
│  [peaceful] [overwhelmed]           │
│                                     │  <- 24pt gap
│  GRATITUDE                          │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ What are you grateful for     │  │  <- Gratitude Input
│  │ today?                        │  │     text area, 3 lines
│  │ (freeform text area)          │  │     teal focus border
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  TOMORROW                           │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ 9:00 AM  Team standup         │  │  <- Tomorrow Preview Card
│  │ 2:00 PM  Dentist appointment  │  │     2-3 schedule items
│  │ "A lighter day ahead."        │  │     + SIA note
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  + add a note                       │  <- Expandable Context Note
│                                     │  <- 32pt gap
│  ┌───────────────────────────────┐  │
│  │        check in               │  │  <- Submit CTA
│  └───────────────────────────────┘  │     56pt, orange pill
│                                     │  <- 24pt gap
└─────────────────────────────────────┘
```

### Component Stack — Morning Variant (top to bottom)

1. **Modal Header** — 44pt
   - Purpose: Navigation and save action
   - Content: Drag handle + cancel (left) + save (right)

2. **Time-Aware Greeting** — ~64pt
   - Purpose: Emotional anchor, reflective tone-setter
   - Content: Greeting line + subtext

3. **Mood Emoji Selector** — ~80pt
   - Purpose: Fastest emotional input (one tap)
   - Content: 6 mood emoji options with labels

4. **Energy Slider** — ~72pt
   - Purpose: Physical state capture
   - Content: Eyebrow + 1-10 slider with teal fill

5. **Stress Slider** — ~72pt
   - Purpose: Mental state capture
   - Content: Eyebrow + 1-10 slider

6. **Daily Intention Input** — ~76pt
   - Purpose: Set the day's focus
   - Content: Eyebrow + text input field

7. **Emotion Tags** — ~80pt
   - Purpose: Nuanced emotional granularity
   - Content: Eyebrow + multi-select chip grid

8. **Context Note** — ~32pt collapsed, ~120pt expanded
   - Purpose: Optional freeform expansion
   - Content: Expandable text area

9. **Submit CTA** — 56pt
   - Purpose: Complete check-in
   - Content: Full-width orange pill button

### Component Stack — Evening Variant (top to bottom)

1. **Modal Header** — 44pt
2. **Time-Aware Greeting** — ~64pt
3. **Mood Emoji Selector** — ~80pt
4. **Energy Slider** — ~72pt
5. **Stress Slider** — ~72pt
6. **Intention Reflection Card** — ~160pt
   - Purpose: Reflect on morning intention
   - Content: Morning intention text + fulfillment toggle + reflection input
7. **Emotion Tags** — ~80pt
8. **Gratitude Input** — ~100pt
   - Purpose: Positive reflection closure
   - Content: Eyebrow + freeform text area
9. **Tomorrow Preview Card** — ~96pt
   - Purpose: Forward-looking closure
   - Content: 2-3 schedule rows + SIA note
10. **Context Note** — ~32pt collapsed, ~120pt expanded
11. **Submit CTA** — 56pt

---

## Components

### Modal Header
- **Purpose**: Navigation and save action for the check-in sheet
- **Data source**: Static (modal controls)
- **Visual treatment**: ink-900 background, 44pt height. Drag handle indicator: 36pt wide, 4pt tall, white at 20%, centered, 8pt from top. "cancel" (left, 15pt Sora Regular, white at 60%) + "save" (right, 15pt Sora Semibold, #FF5E00). Save disabled until at least mood is selected.
- **Variants**: Modal (with drag handle), Stack push (standard back chevron + "Daily Check-in" title center)
- **Gestures**: Tap cancel to dismiss, tap save to submit, drag handle down to dismiss
- **Size**: Full-width x 44pt

### Time-Aware Greeting
- **Purpose**: Emotional anchor that sets the reflective, gentle tone of the check-in
- **Data source**: User profile (first name), device clock (morning/evening determination), API (streak data for returning users)
- **Visual treatment**: No card enclosure — sits directly on ink-900 background. 16pt horizontal margins. 24pt top padding below modal header.
- **Content**:
  - Greeting line: "Good morning, [Name]." or "Good evening, [Name]." — 20pt Sora Bold, white. The period is deliberate — calm, declarative.
  - Subtext: Time-variant message — 15pt Sora Regular, white at 60%, 4pt below greeting.
    - Morning options: "How are you starting today?" / "Take a breath. How are you?" / "What's on your mind this morning?"
    - Evening options: "Let's close out your day." / "How did today feel?" / "Time to reflect."
  - Streak note (optional, returning users only): "Day 14 of checking in" — 13pt Sora Regular, wellbeing-teal (#14B8A6), 8pt below subtext. Appears when streak >= 3 days.
- **Variants**: Morning greeting, Evening greeting, With streak, Without streak
- **Gestures**: None (non-interactive)
- **Size**: Full-width minus 32pt x ~64pt

### Mood Emoji Selector
- **Purpose**: The fastest, most visceral emotional input — one tap to capture mood state
- **Data source**: Writes to `mood_logs.mood_emoji` and `mood_logs.mood_rating`
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt) radius, 24pt padding. 16pt horizontal margins. Eyebrow above card: "HOW ARE YOU FEELING?" in 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 12pt below.
- **Content**:
  - 6 emoji options arranged in a single horizontal row (evenly spaced, center-aligned):
    - Happy: large emoji rendering, "happy" label below
    - Meh: large emoji rendering, "meh" label below
    - Sad: large emoji rendering, "sad" label below
    - Angry: large emoji rendering, "angry" label below
    - Anxious: large emoji rendering, "anxious" label below
    - Tired: large emoji rendering, "tired" label below
  - Each emoji: 40pt rendering size, centered in a 56pt touch target
  - Label: 11pt Sora Regular, white at 40%, centered below emoji, 4pt gap
  - Unselected state: 50% opacity
  - Selected state: 100% opacity, scale(1.15), wellbeing-teal (#14B8A6) circle background (48pt, 15% opacity behind emoji), label brightens to white at 70%
  - Only one emoji selectable at a time
- **Emoji-to-data mapping**:
  - Happy -> mood_rating: 5, descriptor: "happy"
  - Meh -> mood_rating: 3, descriptor: "neutral"
  - Sad -> mood_rating: 2, descriptor: "sad"
  - Angry -> mood_rating: 1, descriptor: "angry"
  - Anxious -> mood_rating: 2, descriptor: "anxious"
  - Tired -> mood_rating: 2, descriptor: "tired"
- **Variants**: None selected (default), One selected, Animated selection transition
- **Gestures**: Tap emoji to select (deselects previous)
- **Size**: Full-width minus 32pt x ~80pt (card height)

### Energy Slider
- **Purpose**: Capture physical energy level on a 1-10 scale
- **Data source**: Writes to `daily_checkins.energy` and `mood_logs.energy_rating`
- **Visual treatment**: No card enclosure — inline section on ink-900. 16pt horizontal margins. Eyebrow above: "ENERGY" in 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking.
- **Content**:
  - Range labels: "low" (left, 13pt Sora Regular, white at 30%) and "high" (right, same style)
  - Track: Full-width minus 32pt, 6pt tall, --r-pill corners. Unfilled track: white at 8%. Filled track: wellbeing-teal (#14B8A6), from left to thumb position.
  - Thumb: 24pt circle, white fill, --shadow-1. Center: current value in 11pt Sora Bold, ink-900.
  - Value badge: Floating above thumb, wellbeing-teal (#14B8A6) bg, --r-sm, 28pt tall, 32pt wide. Value in 14pt Sora Bold, white. Appears on touch, hides 600ms after release.
  - Default position: center (5)
- **Variants**: Untouched (thumb at 5, muted), Active (teal fill, value visible), Low (1-3, fill short), Medium (4-7), High (8-10, full fill)
- **Gestures**: Drag thumb to adjust, tap anywhere on track to jump
- **Size**: Full-width minus 32pt x ~72pt (eyebrow + slider + labels)

### Stress Slider
- **Purpose**: Capture mental stress level on a 1-10 scale
- **Data source**: Writes to `daily_checkins.stress` and `mood_logs.stress_rating`
- **Visual treatment**: Identical to Energy Slider with one difference — range labels read "calm" (left) and "high" (right). Fill color remains wellbeing-teal (#14B8A6) for consistency within the check-in.
- **Content**: Same structure as Energy Slider. Default position: center (5).
- **Variants**: Same as Energy Slider
- **Gestures**: Same as Energy Slider
- **Size**: Full-width minus 32pt x ~72pt

### Daily Intention Input (Morning only)
- **Purpose**: Set the user's focus for the day — the intentional anchor of the morning check-in
- **Data source**: Writes to `daily_intentions.intention_text`
- **Visual treatment**: Standard Text Input Field (52pt, established Batch 1 pattern). ink-brown-800 bg, --r-md (14pt) radius. Focused border: 2pt wellbeing-teal (#14B8A6) instead of standard orange — domain-appropriate exception. 16pt horizontal margins.
- **Content**:
  - Placeholder: "What's your focus today?" — 16pt Sora Regular, white at 40%
  - Input text: 16pt Sora Regular, white
  - Single line, max 120 characters, no line breaks
- **Variants**: Empty (placeholder visible), Filled (user text), Focused (teal border glow)
- **Gestures**: Tap to focus, keyboard appears, return key submits (moves focus to next field)
- **Size**: Full-width minus 32pt x 52pt

### Intention Reflection Card (Evening only)
- **Purpose**: Reflect on the morning intention — did the user fulfill it, and what did they learn?
- **Data source**: Reads `daily_intentions.intention_text` (morning value), writes to `daily_intentions.fulfilled` and `daily_intentions.reflection`
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt) radius, 24pt padding. 16pt horizontal margins. Subtle wellbeing-teal (#14B8A6) left border accent (3pt, 40% opacity) to visually connect to the morning intention.
- **Content (top to bottom)**:
  - Eyebrow above card: "YOUR MORNING INTENTION" in 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking
  - Morning intention text: 16pt Sora Regular, white at 80%, in quotes. This is the user's own words from the morning, displayed as a reference.
  - Fulfillment question: "Did you fulfill this?" — 14pt Sora Semibold, white at 60%, 16pt below intention text
  - Fulfillment toggle: Custom toggle switch, 52pt wide x 28pt tall, --r-pill corners. Off state: white at 10% bg, thumb white at 40%. On state: wellbeing-teal (#14B8A6) bg, white thumb. Smooth slide transition (160ms). 8pt right of question text.
  - Reflection input: "How did it go?" placeholder. Text Input Field, 52pt, ink-brown-800 bg (slightly lighter variant for nesting — white at 3% overlay), --r-md. Focused border: 2pt wellbeing-teal. 12pt below toggle row.
- **Variants**: With morning intention (default), No morning intention (card hidden — user did not do morning check-in, replaced with a note: "no morning intention set. start tomorrow morning?" in 14pt Sora Regular, white at 40%, center-aligned)
- **Gestures**: Tap toggle to switch fulfillment state, tap reflection input to type
- **Size**: Full-width minus 32pt x ~160pt

### Emotion Tags
- **Purpose**: Add nuanced emotional granularity beyond the single mood emoji — optional depth for users who want to express more
- **Data source**: Writes to `mood_logs.emotion_tags` (JSON array)
- **Visual treatment**: Flowing grid of chips, 16pt horizontal margins. Eyebrow above: "HOW WOULD YOU DESCRIBE IT?" in 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 12pt below.
- **Content**:
  - Morning tags: grateful, excited, anxious, calm, hopeful, restless, focused, overwhelmed, content
  - Evening tags: grateful, relieved, drained, calm, proud, restless, peaceful, overwhelmed, content
  - Each chip: --r-pill corners, 32pt height, 12pt horizontal padding
    - Unselected: ink-brown-800 bg, 1pt white at 8% border, 13pt Sora Regular, white at 50%
    - Selected: wellbeing-teal (#14B8A6) at 15% bg, 1pt wellbeing-teal at 30% border, 13pt Sora Semibold, wellbeing-teal text
  - Chips wrap to multiple rows, 8pt horizontal gap, 8pt vertical gap
  - Multi-select — any combination of chips can be active
- **Variants**: None selected (default), Multiple selected, Morning set, Evening set
- **Gestures**: Tap chip to toggle selection
- **Size**: Full-width minus 32pt x ~80pt (varies with row count)

### Context Note (Expandable)
- **Purpose**: Optional freeform text expansion for users who want to capture more detail
- **Data source**: Writes to `daily_checkins.notes` and `mood_logs.context_note`
- **Visual treatment**: Collapsed by default as a single tappable row. 16pt horizontal margins.
- **Content**:
  - Collapsed state: "+ add a note" — 14pt Sora Semibold, white at 50%. Plus icon (14pt, white at 40%) inline left. Row height: 32pt. No card enclosure.
  - Expanded state: Text area input, ink-brown-800 bg, --r-md (14pt) radius, 16pt padding. 3 lines visible (grows to 5 max). 16pt Sora Regular, white. Placeholder: "anything else on your mind..." in white at 30%. Focused border: 2pt wellbeing-teal (#14B8A6). Collapse affordance: small "x" icon (16pt, white at 30%) top-right of text area.
- **Variants**: Collapsed (default), Expanded (empty), Expanded (with content)
- **Gestures**: Tap "+ add a note" to expand, tap "x" to collapse (clears content with confirmation if text exists)
- **Size**: Full-width minus 32pt x 32pt collapsed / ~120pt expanded

### Gratitude Input (Evening only)
- **Purpose**: End the day on a positive reflective note — captures what the user is grateful for
- **Data source**: Writes to a new field in `daily_checkins.notes` (gratitude section) or a dedicated gratitude log if implemented
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt) radius, 24pt padding. 16pt horizontal margins. Eyebrow above: "GRATITUDE" in 12pt Sora Semibold, uppercase, wellbeing-teal (#14B8A6), +0.12em tracking — teal eyebrow to distinguish this as a special reflective prompt.
- **Content**:
  - Prompt: "What are you grateful for today?" — 15pt Sora Regular, white at 60%, inside card, above text area
  - Text area: 3 visible lines, grows to 5 max. 16pt Sora Regular, white. Placeholder: "something small or something big..." in white at 30%. Focused border: 2pt wellbeing-teal. ink-brown-800 bg (white at 3% overlay for nesting).
- **Variants**: Empty (placeholder), Filled (user text), Focused (teal border)
- **Gestures**: Tap to focus, type freely
- **Size**: Full-width minus 32pt x ~100pt

### Tomorrow Preview Card (Evening only)
- **Purpose**: Provide forward-looking closure — a brief glance at tomorrow so the user can mentally prepare
- **Data source**: API — calendar/schedule for tomorrow (next day's events), SIA note (AI-generated one-line preview)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt) radius, 24pt padding. 16pt horizontal margins. Eyebrow above: "TOMORROW" in 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking.
- **Content**:
  - Schedule rows: 2-3 items max (truncated from full schedule). Each row: time (13pt Sora Semibold, white at 50%, 56pt fixed width) + event name (14pt Sora Regular, white). 36pt per row, 1pt white at 5% divider between rows.
  - SIA note: Below schedule rows, 12pt gap. Italicized single line — "A lighter day ahead." or "Big presentation tomorrow — rest well." — 13pt Sora Regular, white at 40%. Preceded by small wellbeing-teal dot (6pt circle).
- **Variants**: With schedule items (default), No schedule ("nothing on the calendar tomorrow." + SIA note), Loading (skeleton shimmer for schedule rows)
- **Gestures**: Tap card to navigate to Schedule/Calendar [41] (stack push)
- **Size**: Full-width minus 32pt x ~96pt

### Submit CTA
- **Purpose**: Complete and save the daily check-in
- **Visual treatment**: Brand CTA Button (Full-Width) pattern — 56pt, --r-pill, #FF5E00 bg, white text. Full-width minus 32pt (16pt margins). Label: "check in" — 17pt Sora Semibold, sentence case.
- **Variants**: Default (orange), Disabled (40% opacity — until at least mood is selected), Loading (white spinner replaces text), Success (green glow 600ms, then dismiss)
- **Gestures**: Tap to submit
- **Size**: Full-width minus 32pt x 56pt

---

## Typography

| Element | Font | Size | Weight | Color | Notes |
|---------|------|------|--------|-------|-------|
| Greeting line | Sora | 20pt | Bold 700 | white | "Good morning, Amira." |
| Greeting subtext | Sora | 15pt | Regular 400 | white at 60% | "How are you starting today?" |
| Streak note | Sora | 13pt | Regular 400 | #14B8A6 (wellbeing-teal) | "Day 14 of checking in" |
| Section eyebrows | Sora | 12pt | Semibold 600 | white at 40% | "HOW ARE YOU FEELING?" uppercase, +0.12em tracking |
| Gratitude eyebrow | Sora | 12pt | Semibold 600 | #14B8A6 (wellbeing-teal) | "GRATITUDE" — teal exception for reflective prompt |
| Emoji labels | Sora | 11pt | Regular 400 | white at 40% (unselected), white at 70% (selected) | "happy", "meh", etc. |
| Slider range labels | Sora | 13pt | Regular 400 | white at 30% | "low", "high", "calm" |
| Slider value badge | Sora | 14pt | Bold 700 | white | Value inside teal badge |
| Intention input text | Sora | 16pt | Regular 400 | white | User input |
| Intention placeholder | Sora | 16pt | Regular 400 | white at 40% | "What's your focus today?" |
| Morning intention (evening) | Sora | 16pt | Regular 400 | white at 80% | Quoted morning text |
| Fulfillment question | Sora | 14pt | Semibold 600 | white at 60% | "Did you fulfill this?" |
| Reflection input text | Sora | 16pt | Regular 400 | white | User input |
| Emotion tag (unselected) | Sora | 13pt | Regular 400 | white at 50% | Chip text |
| Emotion tag (selected) | Sora | 13pt | Semibold 600 | #14B8A6 (wellbeing-teal) | Chip text |
| Context note expand | Sora | 14pt | Semibold 600 | white at 50% | "+ add a note" |
| Context note text | Sora | 16pt | Regular 400 | white | User input |
| Gratitude prompt | Sora | 15pt | Regular 400 | white at 60% | "What are you grateful for today?" |
| Schedule time | Sora | 13pt | Semibold 600 | white at 50% | "9:00 AM" |
| Schedule event | Sora | 14pt | Regular 400 | white | Event name |
| SIA tomorrow note | Sora | 13pt | Regular 400 | white at 40% | Italicized AI note |
| Cancel button | Sora | 15pt | Regular 400 | white at 60% | Modal header |
| Save button | Sora | 15pt | Semibold 600 | #FF5E00 (brand-orange) | Modal header |
| Submit CTA | Sora | 17pt | Semibold 600 | white | "check in" |

---

## Composition & Visual Hierarchy

The Daily Check-in uses a deliberate top-to-bottom emotional arc:

**Morning**: Greeting (warmth) -> Mood (fast visceral capture) -> Energy/Stress (body scan) -> Intention (purposeful direction) -> Tags (optional depth) -> Submit (closure). The arc moves from feeling to thinking to doing.

**Evening**: Greeting (settling) -> Mood (current state) -> Energy/Stress (end-of-day body scan) -> Reflection (looking back at intention) -> Tags (naming the day's emotions) -> Gratitude (positive close) -> Tomorrow (gentle forward look) -> Submit (day complete). The arc moves from present to past to future.

**Visual hierarchy cues**:
- The Mood Emoji Selector is the most visually prominent element (largest touch targets, card enclosure, emoji scale) — it should be the first thing the user interacts with.
- Sliders use wellbeing-teal fill to create a cohesive domain identity without competing with the orange CTA.
- The Submit CTA is the only orange element in the scrollable content area — it anchors the bottom and draws the eye as the completion target.
- Evening variant's Intention Reflection Card uses the teal left border accent to visually connect it to the morning, creating a narrative thread across the day.
- The Gratitude section uses a teal eyebrow (exception to white-at-40% standard) to signal it as a special reflective moment, distinct from the clinical sliders above.

**Depth layers**:
1. ink-900 base background
2. ink-brown-800 card surfaces (Mood Emoji Selector, Intention Reflection, Gratitude, Tomorrow Preview)
3. Nested inputs within cards (slightly lighter bg — white at 3% overlay)
4. Wellbeing-teal accents (slider fills, focused borders, selected tags, teal dots)
5. Orange CTA (highest visual weight, bottom-anchored)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Modal header bg | #0A0A0F | ink-900 | Solid (not transparent — modal needs clear separation) |
| Card surfaces | #211008 | ink-brown-800 | Mood card, Intention Reflection, Gratitude, Tomorrow Preview |
| Nested inputs | #211008 + white 3% | ink-brown-800 | Slightly lighter for visual nesting hierarchy |
| Glassmorphism border | white at 8% | — | 1pt on all cards |
| Drag handle | white at 20% | — | 36x4pt pill |
| Save button text | #FF5E00 | brand-orange | Modal save action |
| Submit CTA background | #FF5E00 | brand-orange | Primary CTA — sole orange element in content |
| Submit CTA text | #FFFFFF | white | Button label |
| Slider fill (energy) | #14B8A6 | wellbeing-teal | Domain accent |
| Slider fill (stress) | #14B8A6 | wellbeing-teal | Domain accent |
| Slider thumb | #FFFFFF | white | With --shadow-1 |
| Slider value badge bg | #14B8A6 | wellbeing-teal | Floating value indicator |
| Intention input focus border | #14B8A6 | wellbeing-teal | Domain-appropriate focused state |
| Reflection input focus border | #14B8A6 | wellbeing-teal | Domain-appropriate focused state |
| Gratitude input focus border | #14B8A6 | wellbeing-teal | Domain-appropriate focused state |
| Fulfillment toggle (on) | #14B8A6 | wellbeing-teal | Toggle active state |
| Fulfillment toggle (off) | white at 10% | — | Toggle inactive state |
| Emotion tag (selected) bg | #14B8A6 at 15% | wellbeing-teal | Tag chip selected |
| Emotion tag (selected) border | #14B8A6 at 30% | wellbeing-teal | Tag chip selected border |
| Emotion tag (selected) text | #14B8A6 | wellbeing-teal | Tag chip selected text |
| Emotion tag (unselected) bg | #211008 | ink-brown-800 | Tag chip default |
| Emotion tag (unselected) border | white at 8% | — | Tag chip default border |
| Emoji selected bg circle | #14B8A6 at 15% | wellbeing-teal | Behind selected emoji |
| Intention Reflection left border | #14B8A6 at 40% | wellbeing-teal | 3pt accent border |
| Streak note text | #14B8A6 | wellbeing-teal | Check-in streak indicator |
| Gratitude eyebrow text | #14B8A6 | wellbeing-teal | Special reflective prompt accent |
| Tomorrow SIA dot | #14B8A6 | wellbeing-teal | 6pt circle, AI note indicator |
| Greeting text | #FFFFFF | white | Primary text |
| Greeting subtext | white at 60% | — | Secondary text |
| Section eyebrows | white at 40% | — | Tertiary text |
| Cancel button text | white at 60% | — | Secondary action |
| Context note label | white at 50% | — | Collapsed expand trigger |
| Slider range labels | white at 30% | — | Quaternary text |

**60/30/10 verification**: Orange appears only on the Submit CTA and modal save text — minimal, intentional, as the sole high-contrast action. Wellbeing-teal (#14B8A6) serves as the domain accent across sliders, input focus states, selected tags, toggle, and decorative elements — this is the domain color role, not competing with the 60/30/10 brand palette. Green absent from this screen (no completion states within the check-in itself — the success state occurs on dismiss via toast on the Home Screen). Purple absent (SIA is not the voice here — this is the user's own reflection). Ratio holds.

---

## Interaction States

### Mood Emoji
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | 50% opacity, normal scale | -- |
| Pressed | 80% opacity, scale(1.05) | light impact |
| Selected | 100% opacity, scale(1.15), teal circle bg at 15%, label brightens | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Energy / Stress Slider
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Thumb at center (5), muted fill | -- |
| Dragging | Thumb scales to 28pt, value badge appears above, teal fill follows | light impact on value changes |
| Released | Thumb returns to 24pt, value badge fades after 600ms | -- |
| Focus-visible | 2pt orange ring around thumb, offset 2pt | -- |

### Daily Intention Input
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt white 10% border, placeholder visible | -- |
| Focused | 2pt wellbeing-teal border, cursor visible, placeholder fades | light impact |
| Filled | User text visible, 1pt white 10% border restored | -- |
| Error | 2pt #F44336 border, error text below (if validation needed) | error notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Emotion Tag Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unselected) | ink-brown-800 bg, white 8% border, white 50% text | -- |
| Pressed | bg lightens (white 3% overlay), scale(0.95) | light impact |
| Selected | teal 15% bg, teal 30% border, teal text, Semibold weight | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Fulfillment Toggle (Evening)
| State | Visual | Haptic |
|-------|--------|--------|
| Off | white 10% bg, white 40% thumb (left) | -- |
| Pressed | Slight brightness increase | light impact |
| On | teal bg, white thumb (right) | medium impact |
| Transitioning | Thumb slides left/right, bg crossfades | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Context Note Expand
| State | Visual | Haptic |
|-------|--------|--------|
| Collapsed | "+ add a note" text, plus icon | -- |
| Pressed | Text brightens to white 70%, scale(0.98) | light impact |
| Expanded | Text area fades in below, "+ add a note" hidden | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Submit CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 bg, white text | -- |
| Pressed | Darker orange (#E55400), scale(0.97) | light impact |
| Disabled | 40% opacity (no mood selected) | -- |
| Loading | White spinner replaces text | -- |
| Success | Green glow (600ms), then modal dismisses | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Cancel Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 60% text | -- |
| Pressed | white at 40%, scale(0.97) | light impact |

### Save Button (Modal Header)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | #FF5E00 text | -- |
| Pressed | Orange at 70%, scale(0.97) | light impact |
| Disabled | white at 30% (no mood selected) | -- |

### Tomorrow Preview Card (Evening)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white 8% border | -- |
| Pressed | scale(0.99), bg lightens (white 3% overlay) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Drag down | Modal handle / above content | Dismiss sheet (with unsaved confirmation if content exists) |
| Tap | Cancel button | Dismiss (with unsaved confirmation) |
| Tap | Save / Submit CTA | Save check-in, dismiss with success |
| Tap | Mood emoji | Select mood (deselects previous) |
| Drag | Slider thumb | Adjust energy/stress value |
| Tap | Slider track | Jump thumb to tap position |
| Tap | Emotion tag chip | Toggle selection |
| Tap | "+ add a note" | Expand context note area |
| Tap | Fulfillment toggle | Toggle on/off |
| Tap | Tomorrow Preview card | Navigate to Schedule/Calendar [41] |
| Swipe right from edge | Screen (stack variant) | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Modal sheet | Open | Slides up from y=screenHeight to 95% height | 520ms | ease-flow |
| Modal dismiss | Save/cancel/drag | Sheet slides down to y=screenHeight | 280ms | ease-out-soft |
| Greeting | Mount | Fade-in + translateY(8->0) | 280ms | ease-out-soft |
| Mood emoji row | Mount | Staggered fade-in, 40ms stagger per emoji (left to right) | 160ms each | ease-out-soft |
| Mood selection | Tap emoji | Selected: scale(1.0->1.15), bg circle fades in. Previous: scale(1.15->1.0), bg fades out | 160ms | ease-out-soft |
| Slider fill | Drag thumb | Fill width tracks thumb position in real-time | real-time | -- |
| Slider value badge | Touch start | Fade-in + translateY(4->0) above thumb | 160ms | ease-out-soft |
| Slider value badge | Touch end | Fade-out after 600ms delay | 280ms | ease-out-soft |
| Emotion tag select | Tap | Selected: bg crossfade + text color change. Scale pulse (1.0->1.05->1.0) | 160ms | ease-out-soft |
| Context note expand | Tap "+ add a note" | Text area height animates from 0 to ~120pt, opacity 0->1 | 280ms | ease-out-soft |
| Context note collapse | Tap "x" | Height animates to 0, opacity 1->0, "+ add a note" fades back | 280ms | ease-out-soft |
| Fulfillment toggle | Tap | Thumb slides to opposite side, bg crossfades | 160ms | ease-out-soft |
| Tomorrow Preview | Mount (evening) | Fade-in + translateY(12->0), 200ms delay after gratitude section | 280ms | ease-out-soft |
| Submit success | Save tap | Button bg crossfades orange->green (600ms), then modal slides down | 600ms + 280ms | ease-out-soft |
| Content stagger | Mount | Greeting (0ms), mood (80ms), energy (160ms), stress (240ms), intention (320ms), tags (400ms), CTA (480ms) | 280ms each | ease-out-soft |

**Screen transition**:
- **Enter (modal)**: Bottom sheet slides up from off-screen, 520ms ease-flow. Content stagger begins after sheet reaches position.
- **Enter (stack push)**: Standard stack push — slides in from right, 280ms ease-out-soft.
- **Exit (save)**: Success glow on CTA, then modal slides down (or stack pop). Home Screen receives success toast.
- **Exit (cancel)**: Modal slides down immediately (280ms). No toast.

---

## Empty States

### Day 1 (new user, first check-in ever)
- Greeting is extra warm and invitational: "Good morning, [Name]. This is your first check-in. It takes less than a minute."
- Subtext: "No right answers — just how you're feeling."
- Mood emoji selector is slightly larger (emoji at 48pt instead of 40pt) to invite interaction.
- Emotion tags section has a subtle hint: "pick any that resonate" in 12pt Sora Regular, white at 30%, below the eyebrow.
- Context note section is collapsed (not shown prominently — reduce friction for first-timers).
- Intention input placeholder is more specific: "One thing you'd like to focus on today"
- No streak note (streak = 0).

### Evening variant — no morning check-in
- Intention Reflection Card is replaced with a gentle note: "You didn't check in this morning. No worries — let's capture how today went." in 14pt Sora Regular, white at 40%, inside a card with teal left border.
- Below the note: "Set a morning intention?" text link in 14pt Sora Semibold, wellbeing-teal. Tapping opens a single-line input inline (transforms the note into an intention input).
- Gratitude and Tomorrow Preview sections render normally.

### Established user — already checked in for this time slot
- If user opens morning check-in after already submitting one, the form pre-populates with existing data. Header save button reads "update" instead of "save". Greeting adapts: "Updating your morning check-in." No subtext.
- Evening variant same pattern: pre-populated, "update" label.

---

## Motivation Adaptation

- **Low motivation**: Check-in is radically simplified. Only three elements shown: Mood Emoji Selector + one slider (energy only, stress hidden) + Submit CTA. No intention input, no emotion tags, no context note. Greeting: "One tap. How are you?" Subtext hidden. The entire check-in fits in one viewport — zero scrolling required. Evening variant adds only the fulfillment toggle (no reflection text input, no gratitude, no tomorrow preview). The goal: under 10 seconds.

- **Medium motivation**: Default experience as described in the full layout above. All components visible. Morning has intention input, emotion tags, expandable context note. Evening has full intention reflection, gratitude, tomorrow preview. Target: 30-60 seconds.

- **High motivation**: Enhanced with additional depth options. Energy slider shows a mini sparkline of the past 7 days below the track (wellbeing-teal, 24pt tall, 160pt wide). Stress slider same treatment. Below emotion tags, an additional row appears: "Compare to yesterday: [happy -> meh]" showing mood trend. Context note is expanded by default (not collapsed). Evening variant adds a "Patterns SIA noticed" micro-insight below the gratitude section — e.g., "You tend to feel calmer on days you exercise in the morning." in 13pt Sora Regular, white at 40%, preceded by teal dot. Target: 2-3 minutes of intentional reflection.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Check-in submission fails | Submit CTA shows error state (red border flash, 280ms), "could not save check-in — try again" toast (top, 3s auto-dismiss) | CTA returns to default state, all user input preserved in form |
| Mood emoji selection fails to register | Emoji briefly flashes red outline (160ms) then returns to unselected state | User can re-tap; local state retried before API call |
| Slider value not saved | Slider resets to previous value with gentle snap animation, error toast | User re-adjusts slider; form remains open |
| Intention text save fails | Text input border flashes red (280ms), "could not save — try again" toast | Text preserved in field, CTA re-enables |
| Tomorrow preview load fails | Preview card shows "could not load schedule" in 15pt Regular, white at 40% | "retry" link in orange; non-blocking — check-in can still submit without preview |
| SIA insight load fails (high motivation) | Insight area shows "could not load SIA insight" placeholder text | Auto-retries on next check-in open; non-blocking |
| Network offline | All fields remain functional — check-in data cached locally. "offline — will sync when connected" banner (48pt, ink-brown-800, white at 50% text) at top of sheet. On reconnect, queued check-ins sync automatically. | Banner updates to "syncing..." then disappears on success |
| Duplicate check-in (already submitted this period) | Submit CTA disabled, label changes to "already checked in". Existing check-in data displayed in read-only mode with "edit" link. | Tap "edit" to modify existing check-in entry |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Mood emoji selector**: Each emoji has a descriptive label: "Happy mood", "Meh mood", "Sad mood", "Angry mood", "Anxious mood", "Tired mood". Selected state announced: "Happy mood, selected."
- **Energy and stress sliders**: Accessible slider role with min=1, max=10, step=1. VoiceOver announces current value on change: "Energy level: 7 out of 10." End labels ("low"/"high", "calm"/"high") included in accessible description.
- **Emotion tag chips**: Toggle button role. VoiceOver announces "Grateful, selected" or "Grateful, not selected". Multi-select behavior communicated via accessibility hint.
- **Intention text input**: Standard text field with accessible label "What's your focus today?" and character count feedback.
- **Context note** (expandable): Accessible as a disclosure button: "Add a note, collapsed. Double tap to expand."
- **Tomorrow preview card**: VoiceOver reads schedule items sequentially with times and descriptions.
- **Time-aware greeting**: Announced as heading level 1 for screen reader navigation structure.
- **Touch targets**: All interactive elements meet 44x44pt minimum. Emoji cells have 48pt touch targets. Slider thumb has 44pt expanded touch area.
- **Color contrast**: All text meets WCAG AA on ink-900 background. Wellbeing-teal on ink-900 achieves 5.9:1 ratio.
- **Reduced motion**: Slider value badge appears without float animation. Emoji selection state changes without scale bounce. Submit success checkmark appears without draw animation.

---

## Cross-References

- **Navigates to**: Schedule/Calendar [41] via Tomorrow Preview card tap (stack push), SIA Chat [09] via SIA insight tap in high-motivation variant (tab switch)
- **Navigates from**: Screen [12] — Home Screen (modal presentation via time-aware check-in prompt card), Screen [09] — SIA Chat (modal presentation via "how are you feeling?" deep-link), Screen [38] — Habits (stack push via evening habit row), System notification (morning/evening reminder, modal presentation)
- **Shared components with**: Screen [12] — Home Screen (Mood Chip row shares emoji selection pattern), Screen [37] — Journal (writing mode bottom sheet modal pattern, domain tag chip style adapted as emotion tags), Screen [38] — Habits (time-of-day awareness, streak tracking pattern), Screen [35/36] — Dashboards (SIA Coaching Note Card style adapted for Tomorrow Preview SIA note)
- **Patterns used**: Brand CTA Button (Submit CTA), Text Input Field (Batch 1 — intention, reflection, gratitude inputs), Modal Presentation (Batch 1 — bottom sheet with drag handle), 8-State Interaction Model, Section Eyebrow Label (Screen 12), Back Button (stack push variant only)
- **Patterns established**: Mood Emoji Selector (6-emoji row with labels and domain-colored selection state — distinct from Journal's 5-emoji selector by adding "anxious" and "tired"), Wellbeing Slider (horizontal 1-10 with domain-color fill and floating value badge), Fulfillment Toggle (custom switch for yes/no reflection), Intention Reflection Card (displays morning data for evening reflection), Expandable Context Note (collapsed-by-default text area), Emotion Tag Chips (multi-select flowing grid with domain-color selection), Tomorrow Preview Card (schedule preview with SIA note), Time-Aware Greeting (morning/evening variant greeting with streak), Motivation-Reduced Check-in (radically simplified low-motivation variant fitting one viewport)
