# Screen Design: Medication Tracking

**Screen**: 60 of 73
**File**: 60-medication-tracking.md
**Register**: Wellbeing Mode (wellbeing-teal #14B8A6)
**Primary action**: mark medication as taken
**Tab**: Wellbeing domain or Settings > Health section
**Navigation**: Stack depth 2-3 from Me tab root (Me Main > Explore > Wellbeing Dashboard > Medication Tracking). Entry from Wellbeing Dashboard via "medications" card, SIA deep-link [09] ("time for your medication"), Home Screen [12] via medication reminder action card, Settings [21] > Health section. Exit via back button to previous screen, or forward to Add Medication (modal), Medication History (stack push).

---

## Purpose

This screen is the user's daily medication management hub — a time-organized checklist of medications due today paired with a comprehensive medication list, adherence history, and per-medication reminders. It answers "what do I need to take today and have I been consistent?" Medication adherence feeds into the Wellbeing domain: consistent tracking earns XP and contributes to the user's wellbeing score on the Life Areas radar. SIA can reference medication patterns in coaching conversations but never provides medical advice. A persistent safety notice and privacy assurance reinforce trust — this is sensitive health data and the app treats it accordingly. Free tier includes medication list and daily checklist; SIA coaching notes, interaction warnings, and reminder scheduling require Plus.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header — "Medication tracking" with wellbeing-teal accent line and RPG badge
2. Today's medications — time-grouped checklist of medications due now, with tap-to-mark-taken
3. Adherence summary bar — visual progress showing today's medication completion rate
4. Interactions warning — persistent safety banner about consulting a doctor
5. Medication list — all active medications as scrollable cards (name, dosage, frequency, dates)
6. Medication history — calendar heatmap showing adherence over the past 4 weeks
7. Privacy notice — encryption and data privacy assurance
8. Add medication FAB — always visible

**User flow**:
- **Arrives from**: Wellbeing Dashboard via "Medications" card (stack push), Explore [18] via health utility card (stack push), SIA Chat [09] via deep-link ("your medication reminder"), Home Screen [12] via medication action card (stack push), Settings [21] > Health section (stack push)
- **Primary exit**: Back to previous screen (stack pop)
- **Secondary exits**: SIA Chat [09] via SIA coaching note tap (tab switch), Add Medication modal (modal present), Medication History detail (stack push), Medication Reminders settings (stack push), RPG Character [19] via RPG badge tap (stack push)

---

## Layout

**Scroll behavior**: ScrollView (mixed content sections, not a homogeneous list)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ←  ┃ Medication tracking    Lv.7  │  56pt — Domain Dashboard Header
│      ┃ (teal accent line)           │  FIXED, sticky on scroll
├─────────────────────────────────────┤
│                                     │  SCROLLABLE from here
│  ┌─────────────────────────────┐   │
│  │ ● SIA says:                 │   │  72pt — SIA Coaching Note
│  │ "3 medications on schedule  │   │
│  │  today. you're consistent." │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  3 of 4 today                      │  ← Adherence Summary Bar
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░  75%       │     (teal progress bar)
│          16pt gap                   │
│  ┌─────────────────────────────┐   │
│  │ ⚠ Medication interactions   │   │  ← Interactions Warning
│  │ Always consult your doctor  │   │     Banner (~56pt)
│  │ before changing medications │   │
│  └─────────────────────────────┘   │
│          24pt gap                   │
│  TODAY'S MEDICATIONS                │  ← Section Eyebrow
│  ┌─────────────────────────────┐   │
│  │  MORNING                    │   │  ← Time Group Header
│  │ [✓] Metformin 500mg         │   │  ← Medication Row (taken)
│  │     daily · 8:00 AM         │   │     dosage + schedule
│  ├─────────────────────────────┤   │
│  │ [✓] Vitamin D 1000 IU       │   │  ← Medication Row (taken)
│  │     daily · 8:00 AM         │   │
│  ├─────────────────────────────┤   │
│  │  EVENING                    │   │  ← Time Group Header
│  │ [ ] Lisinopril 10mg         │   │  ← Medication Row (pending)
│  │     daily · 8:00 PM         │   │
│  ├─────────────────────────────┤   │
│  │ [✓] Magnesium 400mg         │   │  ← Medication Row (taken)
│  │     daily · 9:00 PM         │   │
│  └─────────────────────────────┘   │
│          24pt gap                   │
│  ALL MEDICATIONS         see all   │  ← Section Heading Row
│  ┌─────────────────────────────┐   │
│  │  Metformin                  │   │  ← Medication Card
│  │  500mg · daily              │   │
│  │  since Jan 15, 2026         │   │
│  │  🔔 8:00 AM                 │   │
│  ├─────────────────────────────┤   │
│  │  Lisinopril                 │   │
│  │  10mg · daily               │   │
│  │  since Mar 3, 2026          │   │
│  │  🔔 8:00 PM                 │   │
│  ├─────────────────────────────┤   │
│  │  ...more medications...     │   │
│  └─────────────────────────────┘   │
│          24pt gap                   │
│  ADHERENCE HISTORY                  │  ← Section Eyebrow
│  ┌─────────────────────────────┐   │
│  │  M  T  W  T  F  S  S       │   │  ← Calendar Heatmap
│  │ [▓][▓][▓][░][▓][▓][ ]      │   │     (4-week view)
│  │ [▓][░][▓][▓][▓][░][▓]      │   │     graduated teal
│  │ [▓][▓][▓][▓][░][▓][▓]      │   │
│  │ [▓][▓][░][▓][▓][ ][ ]      │   │
│  │  May 2026                   │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  ┌─────────────────────────────┐   │
│  │  🔒 Your medication data    │   │  ← Privacy Notice Card
│  │  is encrypted and private.  │   │     (~64pt)
│  │  Only you can see it.       │   │
│  └─────────────────────────────┘   │
│                                     │
│          64pt bottom padding        │
│                                     │
│                  ┌─────────────────┐│
│                  │ + add medication ││ ← FAB (orange pill)
│                  └─────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘


=== ADD MEDICATION (Modal Bottom Sheet) ===

┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ─── (drag handle, 36pt wide)      │  ← Sheet handle
│  [cancel]              [save]      │  ← Modal header (44pt)
├─────────────────────────────────────┤
│                                     │
│  Medication name                    │  ← Text Input (52pt)
│  ┌─────────────────────────────┐   │
│  │  e.g. Metformin             │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  Dosage                             │  ← Text Input (52pt)
│  ┌─────────────────────────────┐   │
│  │  e.g. 500mg                 │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  Frequency                          │  ← Segmented Control
│  [daily][twice daily][weekly][PRN]  │     (4-segment)
│          16pt gap                   │
│  Time of day                        │  ← Time Picker Row
│  ┌───────────┐  ┌──────────────┐   │
│  │  8:00 AM  │  │ + add time   │   │
│  └───────────┘  └──────────────┘   │
│          16pt gap                   │
│  Start date                         │  ← Date Picker (52pt)
│  ┌─────────────────────────────┐   │
│  │  May 21, 2026               │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  End date (optional)                │  ← Date Picker (52pt)
│  ┌─────────────────────────────┐   │
│  │  none                       │   │
│  └─────────────────────────────┘   │
│          16pt gap                   │
│  Notes                              │  ← Text Area (80pt)
│  ┌─────────────────────────────┐   │
│  │  e.g. take with food        │   │
│  └─────────────────────────────┘   │
│          24pt gap                   │
│  Reminder                           │  ← Toggle + Time
│  ┌───────────────────────┐         │
│  │  remind me    [ON/OFF]│         │
│  │  15 min before dose   │         │
│  └───────────────────────┘         │
│          24pt gap                   │
│  ┌─────────────────────────────┐   │
│  │        save medication       │   │  ← Brand CTA Button (56pt)
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │  ← Keyboard area
│  │        Keyboard              │   │     (system)
│  │                              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Dashboard Header** — 56pt, FIXED
   - Purpose: Screen identification with wellbeing domain branding and RPG level
   - Content: Back chevron + "Medication tracking" title with teal accent line + "Lv.7" RPG badge

2. **SIA Coaching Note Card** — 72pt (variable)
   - Purpose: AI coaching voice with medication adherence context
   - Content: Purple dot + contextual SIA message about adherence

3. **Adherence Summary Bar** — ~56pt
   - Purpose: Today's medication completion at a glance
   - Content: "3 of 4 today" text + full-width teal progress bar + percentage

4. **Interactions Warning Banner** — ~56pt
   - Purpose: Persistent safety notice about consulting healthcare providers
   - Content: Warning icon + safety message

5. **Today's Medications Section** — Variable (SectionList-style within ScrollView)
   - Purpose: Time-grouped checklist of medications due today
   - Content: Morning / Afternoon / Evening / As Needed section headers + medication rows

6. **All Medications Section** — Variable
   - Purpose: Full list of active medications
   - Content: Section heading row + medication cards

7. **Adherence History Card** — ~160pt
   - Purpose: 4-week calendar heatmap showing adherence consistency
   - Content: 7x4 cell grid with graduated teal fills + month label

8. **Privacy Notice Card** — ~64pt
   - Purpose: Reassure user that medication data is encrypted and private
   - Content: Lock icon + privacy message

9. **Bottom Padding** — 64pt
   - Purpose: Clears FAB and tab bar from content

10. **Floating Action Button** — 48pt (fixed position)
    - Purpose: Add new medication
    - Content: Plus icon + "add medication"

11. **Tab Bar** — 56pt + 34pt safe area
    - Purpose: Primary app navigation
    - Content: Today | SIA | Goals | Me

---

## Components

### Domain Dashboard Header
- **Purpose**: Screen identification with wellbeing domain branding and RPG integration
- **Data source**: User's wellbeing skill level from RPG system
- **Visual treatment**: Fixed bar, ink-900 background, no card styling. Sticky on scroll with backdrop-blur (z-30).
- **Size**: Full-width x 56pt
- **Sub-elements**:
  - Back button: left chevron, white, 2pt stroke, 20pt icon, 44x44pt touch target, 16pt from left edge
  - Title: "Medication tracking", 20pt Sora Semibold, white, left-aligned 56pt from left
  - Domain accent line: 2pt height, #14B8A6 (wellbeing-teal), extends from title left edge to ~60% of available width, 4pt below title text baseline
  - RPG skill badge: "Lv.7", 13pt Sora Semibold, #14B8A6 text, background #14B8A6 at 15% opacity, --r-pill shape, 8pt horizontal / 4pt vertical padding, right-aligned 16pt from right edge
- **Gestures**: Back button taps pop stack; RPG badge taps push to RPG Character [19]

### SIA Coaching Note Card
- **Purpose**: Contextual AI coaching message about medication adherence
- **Data source**: AI-generated based on adherence history, current schedule, streak data
- **Visual treatment**: ink-brown-800 card with glassmorphism (1pt border, white at 6% opacity), --r-xl (28pt), 24pt padding. 16pt horizontal margins.
- **Size**: Full-width minus 32pt x 72pt (variable: min 56pt, max 96pt)
- **Sub-elements**:
  - Purple dot: 6pt circle, #7F24FF, 16pt from left edge of card, vertically centered with first text line
  - Message text: 15pt Sora Regular, white, left-aligned 32pt from card left edge, 16pt right padding, max 3 lines
- **Variants**:
  - Good adherence: "3 medications on schedule today. you're consistent." (warm, affirming)
  - Missed doses: "looks like yesterday had a gap. today's a fresh start." (gentle, non-judgmental)
  - Day 1: "tracking medications helps SIA understand your wellbeing better."
  - All taken: "all medications taken today. well done."
- **Gestures**: Tap entire card navigates to SIA Chat [09] with wellbeing/medication context pre-loaded

### Adherence Summary Bar
- **Purpose**: Shows daily medication completion at a glance — the screen's emotional anchor
- **Data source**: Calculated from today's medication completion count
- **Visual treatment**: 16pt horizontal margins. No card enclosure — sits directly on ink-900.
- **Content**:
  - Label: "3 of 4 today" — 16pt Sora Semibold, white. Left-aligned.
  - Progress bar: Full-width minus 32pt, 8pt tall, --r-pill corners. Track: white at 8%. Fill: wellbeing-teal (#14B8A6). Animated on data change.
  - Percentage: Right-aligned inline with label, 16pt Sora Semibold, white at 70%.
- **Variants**:
  - Partial: teal fill showing current progress
  - Complete (all taken): green (#34A853) fill, "all taken" label with green checkmark
  - Empty: no fill, "0 of 4 — tap a checkbox to start"
- **Size**: Full-width minus 32pt x ~56pt (label + bar + padding)

### Interactions Warning Banner
- **Purpose**: Persistent safety notice — medication tracking is informational, not medical advice
- **Data source**: Static content
- **Visual treatment**: ink-brown-800 card with glassmorphism, --r-md (14pt), 16pt padding. Subtle amber (#F59E0B) left border, 3pt wide, 40% opacity. 16pt horizontal margins.
- **Content**:
  - Warning icon: 16pt, #F59E0B, left-aligned
  - Title: "medication interactions" — 14pt Sora Semibold, white
  - Body: "always consult your doctor before changing medications or dosages." — 13pt Sora Regular, white at 60%
- **Variants**: Standard (always visible, cannot be dismissed)
- **Gestures**: Non-interactive (informational only)
- **Size**: Full-width minus 32pt x ~56pt

### Time Group Header (Morning / Afternoon / Evening / As Needed)
- **Purpose**: Groups today's medications by time of day
- **Data source**: Medication's scheduled time property
- **Visual treatment**: No card — plain text on ink-900 background
- **Content**: "MORNING" / "AFTERNOON" / "EVENING" / "AS NEEDED" — 12pt Sora Semibold, uppercase, white at 40%, +0.12em tracking, 16pt left margin. Standard eyebrow treatment.
- **Size**: Full-width x 24pt (text + 8pt padding below)

### Medication Check Row
- **Purpose**: Individual medication item in today's checklist with checkbox, name, dosage, and scheduled time
- **Data source**: API — user_medications table filtered to today's schedule
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card per time-of-day group (one card per group). 20pt radius on the group card. Each row has 16pt horizontal padding.
- **Content per row** (64pt tall):
  - Checkbox (left, 24pt):
    - Unchecked: 24pt square, --r-xs corners, 1.5pt border white at 20%, transparent fill
    - Checked: wellbeing-teal (#14B8A6) fill, white checkmark (14pt, 2pt stroke). Check animation: checkmark draws in (stroke-dashoffset), fill fades in, 160ms ease-out-soft.
  - Medication name (center, 12pt left of checkbox): 16pt Sora Semibold, white. Checked: white at 50%.
  - Dosage inline: 16pt Sora Regular, white at 60%, same line after name, separated by a space.
  - Second line (below name, left-aligned with name):
    - Frequency: 13pt Sora Regular, white at 40% ("daily")
    - Scheduled time: 13pt Sora Semibold, white at 50% ("8:00 AM"), separated by " . " from frequency
  - Separator: 1pt white at 5% between rows, inset 56pt from left (clears checkbox area). No separator on last row.
- **Variants**: Taken (teal fill, muted name), Pending (empty checkbox), Overdue (orange text on time, subtle orange glow on checkbox border), Skipped (gray strikethrough)
- **Gestures**: Tap checkbox to toggle taken/not taken, swipe left to reveal skip/edit actions, long-press for context menu (edit medication, view history, skip dose)
- **Size**: Full-width minus 32pt x 64pt per row

### Medication Card
- **Purpose**: Summary card for each active medication in the full medication list
- **Data source**: API — user_medications table, all active records
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-md (14pt), 16pt padding. Within a single card container for the list, rows separated by 1pt white at 5% dividers.
- **Content per card** (80pt tall):
  - Medication name: 16pt Sora Semibold, white
  - Dosage + frequency: 14pt Sora Regular, white at 60% ("500mg . daily"), 4pt below name
  - Start date: 13pt Sora Regular, white at 40% ("since Jan 15, 2026"), 4pt below dosage
  - Reminder indicator (right-aligned): Bell icon (14pt), wellbeing-teal if active, white at 20% if off. Time text: 12pt Sora Regular, white at 40% ("8:00 AM").
  - End date (if set): 12pt Sora Regular, white at 30% ("until Jun 30, 2026"), below start date
  - Notes preview (if any): 12pt Sora Regular, white at 30%, italic, 1 line max, truncated ("take with food")
  - Right chevron: 12pt, white at 20%, right-aligned, vertically centered
- **Variants**: Active (default), Ending soon (end date <7 days: amber text on date), Expired (0.5 opacity, "ended" label), With notes (extra line shown)
- **Gestures**: Tap opens medication detail/edit (modal), swipe left reveals edit/delete actions
- **Size**: Full-width minus 32pt x 80pt per row

### Adherence History Card (Calendar Heatmap)
- **Purpose**: Visualize medication adherence consistency over the past 4 weeks
- **Data source**: API — daily adherence rate aggregated over 28 days from user_medications logs
- **Visual treatment**: ink-brown-800 glassmorphism card, 20pt radius, 24pt padding. 16pt horizontal margins.
- **Content**:
  - Day-of-week labels (top row): M, T, W, T, F, S, S — 11pt Sora Regular, white at 30%, centered above each column
  - 4 rows x 7 columns grid:
    - Cell size: 28pt square, --r-xs corners
    - No medications taken: white at 5% fill
    - 1-33% taken: wellbeing-teal (#14B8A6) at 20% opacity
    - 34-66% taken: wellbeing-teal at 50% opacity
    - 67-99% taken: wellbeing-teal at 75% opacity
    - 100% taken: wellbeing-teal at 100% opacity
    - Future days: white at 3% fill (barely visible)
    - Today: 1.5pt teal border (dashed if incomplete, solid if complete)
    - Gap between cells: 4pt
  - Month label: "May 2026" — 13pt Sora Regular, white at 40%, left-aligned below grid, 8pt below last row
  - Adherence streak: "14-day streak" — 13pt Sora Semibold, white at 60%, right-aligned below grid, with flame icon (14pt, orange #FF5E00)
- **Variants**: Active (graduated fills), Empty month (all white 5%, "start tracking to build your history"), Perfect month (all cells 100%, subtle teal glow)
- **Gestures**: Tap cell for that day's adherence detail (lightweight tooltip showing "3 of 4 taken")
- **Size**: Full-width minus 32pt x ~160pt

### Privacy Notice Card
- **Purpose**: Reassure the user that their medication data is encrypted, private, and under their control
- **Data source**: Static content
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-md (14pt), 16pt padding. 16pt horizontal margins. Subtle wellbeing-teal left border, 2pt wide, 30% opacity.
- **Content**:
  - Lock icon: 16pt, wellbeing-teal (#14B8A6), left-aligned
  - Text: "your medication data is encrypted and private. only you can see it." — 14pt Sora Regular, white at 50%, 8pt right of icon, max 2 lines
- **Variants**: Standard (always shown at bottom of scrollable content)
- **Gestures**: Non-interactive (informational only)
- **Size**: Full-width minus 32pt x ~64pt

### Floating Action Button
- **Purpose**: Add a new medication
- **Visual treatment**: Orange (#FF5E00) fill, --r-pill, --shadow-2. Positioned centered, 16pt above tab bar, z-40.
- **Content**: Plus icon (16pt, white) + 8pt gap + "add medication" (15pt Sora Semibold, white)
- **Gestures**: Tap opens Add Medication modal (bottom sheet)
- **Scroll behavior**: Fades out on scroll down (opacity 0 + translateY +20pt, 160ms). Fades back in on scroll up or scroll stop.
- **Size**: Auto-width (~170pt) x 48pt

### Add Medication Modal (Bottom Sheet)
- **Purpose**: Create or edit a medication entry
- **Data source**: New entry (blank) or existing medication (pre-populated for editing)
- **Visual treatment**: Bottom sheet modal, slides up from bottom. Covers ~85% of screen height. Background: ink-900 (solid). Corner radius: 20pt (top-left, top-right). Handle indicator: 36pt wide, 4pt tall, white at 20%, centered, 8pt from top.
- **Content (top to bottom)**:
  - Handle indicator + modal header (44pt): "cancel" (left, 15pt Sora Regular, white at 60%) + "save" (right, 15pt Sora Semibold, orange #FF5E00). Disabled save until name and dosage exist.
  - Medication name input: Text Input Field (52pt, established pattern). Placeholder: "e.g. Metformin". Label above: "medication name" in 13pt Sora Semibold, white at 40%.
  - Dosage input: Text Input Field (52pt). Placeholder: "e.g. 500mg". Label: "dosage".
  - Frequency selector: 4-segment Segmented Control (40pt). Segments: "daily" / "twice daily" / "weekly" / "as needed" (13pt Sora Semibold). Active segment: orange (#FF5E00) fill, white text. Default: "daily".
  - Time of day: Horizontal row of time chips. Each chip shows a time (e.g., "8:00 AM") in ink-brown-800 bg, --r-pill, 32pt height, 13pt Sora Regular, white. "+ add time" chip: white at 20% bg, white at 50% text, --r-pill. Tapping opens system time picker.
  - Start date picker: Text Input Field appearance (52pt), tappable to open system date picker. Default: today's date. Label: "start date".
  - End date picker: Same as start date. Placeholder: "none". Label: "end date (optional)".
  - Notes input: Text area, 80pt height (grows to 120pt max), ink-brown-800 bg, --r-md, 16pt padding. Placeholder: "e.g. take with food". Label: "notes".
  - Reminder toggle row: ink-brown-800 card, --r-md, 48pt height, 16pt padding. "remind me" label (15pt Sora Regular, white) + Toggle Switch (right-aligned). When on: secondary row appears showing "15 min before dose" as a selectable chip row (5 min / 15 min / 30 min / 1 hour).
  - "save medication" button: Full-width orange CTA (Brand CTA Button pattern, 56pt, --r-pill, 16pt horizontal margins). 24pt above bottom safe area.
- **Gestures**: Drag to dismiss (with unsaved changes confirmation if content exists), tap save to create/update, tap cancel to dismiss
- **Keyboard interaction**: Sheet adjusts height to accommodate keyboard. Inputs scroll within available space.

### Medication Reminder Settings (Inline)
- **Purpose**: Per-medication reminder configuration
- **Data source**: Local notification settings per medication
- **Visual treatment**: Rendered inline within the Add Medication modal as a toggle + time offset row
- **Content**:
  - Toggle switch: 32pt wide x 20pt tall (standard Toggle Switch pattern)
  - When enabled: chip row of offset options ("5 min" / "15 min" / "30 min" / "1 hour"), same Filter Chip pattern, 32pt height, --r-pill
  - Active chip: orange fill, white text. Inactive: ink-brown-800 bg, white at 60% text.
- **Gestures**: Tap toggle to enable/disable, tap chip to select offset
- **Size**: Full-width minus 32pt x 48pt collapsed, ~88pt expanded

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Domain accent line | #14B8A6 | wellbeing-teal | Domain color, header only |
| Domain eyebrow text | #14B8A6 | wellbeing-teal | "TODAY'S MEDICATIONS" label |
| RPG badge text + bg | #14B8A6 at 100% / 15% | wellbeing-teal | Domain color on badge |
| Adherence bar fill | #14B8A6 | wellbeing-teal | Domain-colored progress (identification) |
| Adherence bar (all taken) | #34A853 | forest-green | Full completion celebration |
| Checkbox checked fill | #14B8A6 | wellbeing-teal | Domain identification on medication check |
| Checkbox checkmark | #FFFFFF | white | On teal fill |
| Heatmap fills | #14B8A6 at 20-100% | wellbeing-teal | Graduated adherence |
| Heatmap today border | #14B8A6 | wellbeing-teal | Today indicator |
| FAB background | #FF5E00 | brand-orange | Primary CTA |
| "save" button | #FF5E00 | brand-orange | Modal primary action |
| "save" text (modal header) | #FF5E00 | brand-orange | Modal save link |
| Frequency segmented active | #FF5E00 | brand-orange | Active segment fill |
| "see all" links | #FF5E00 | brand-orange | Interactive text |
| Streak flame icon | #FF5E00 | brand-orange | Streak emphasis |
| Warning left border | #F59E0B at 40% | amber | Safety banner indicator |
| Warning icon | #F59E0B | amber | Safety banner icon |
| Privacy left border | #14B8A6 at 30% | wellbeing-teal | Privacy card accent |
| Privacy lock icon | #14B8A6 | wellbeing-teal | Privacy indicator |
| SIA purple dot | #7F24FF | royal-purple | AI indicator |
| Overdue time text | #FF5E00 | brand-orange | Urgency on overdue medications |
| Reminder bell (active) | #14B8A6 | wellbeing-teal | Reminder enabled |
| Reminder bell (off) | white at 20% | -- | Reminder disabled |
| Primary text | #FFFFFF | white | Medication names, counts |
| Secondary text | white at 60% | -- | Dosage, frequency |
| Tertiary text | white at 50% | -- | Times, scheduled info |
| Quaternary text | white at 40% | -- | Section headers, day labels, dates |
| Disabled text | white at 30% | -- | Notes preview, metadata |

**60/30/10 verification**: Orange dominates interactive elements — FAB, save button, segmented control active state, "see all" links, overdue indicators, streak flame. Green appears only on the "all taken" completion state of the adherence bar. Purple limited to single SIA coaching note dot. Wellbeing-teal (#14B8A6) is used as a domain identification color on the adherence bar, checkboxes, heatmap cells, accent line, RPG badge, privacy and reminder icons — never on CTAs or primary interactive elements. This follows the domain color rule: identification only, never for actions. Ratio holds with orange as the clear interactive driver and teal as the domain identifier.

---

## Interaction States

### Medication Check Row Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt square, white 20% border, transparent fill | -- |
| Pressed | Border brightens to white 40%, scale(0.90) | light impact |
| Checked (taken) | Teal fill fades in, white checkmark draws in, adherence bar updates | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (e.g., future time slot) | -- |

### Medication Card Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content within card | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer | -- |

### SIA Coaching Note Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple dot, white text | -- |
| Pressed | scale(0.97), background darkens to #1a0c06 | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer on text area | -- |

### Adherence Summary Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default (partial) | Teal fill at current percentage | -- |
| All taken | Fill crossfades teal to green, "all taken" label fades in | success notification |
| Empty | No fill, muted text | -- |

### Frequency Segmented Control (Modal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 50% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "save medication" CTA Button (Modal)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange (#FF5E00) fill, white text, --r-pill | -- |
| Pressed | Darker orange (#E05400) + scale(0.97) | light impact |
| Disabled | 0.4 opacity (no name or dosage entered) | -- |
| Loading | White spinner replaces text | -- |
| Success | Green glow (600ms), modal dismisses | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Floating Action Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, white icon+text, --shadow-2 | -- |
| Pressed | Darker orange (#E55400), scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |

### Calendar Heatmap Cell
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Graduated teal fill | -- |
| Pressed | Scale(1.15), tooltip appears above showing "3 of 4 taken" | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Reminder Toggle Switch (Modal)
| State | Visual | Haptic |
|-------|--------|--------|
| Off | White at 15% bg, white circle left | -- |
| On | Orange (#FF5E00) bg, white circle right | medium impact |
| Transition | Circle slides + bg color transitions, 160ms | -- |

### RPG Skill Badge
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Teal text, 15% opacity teal pill bg | -- |
| Pressed | scale(0.95), bg opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload medications, recalculate adherence) |
| Tap | Checkbox | Toggle medication taken/not taken, update adherence bar |
| Tap | Medication card row | Open medication detail/edit modal |
| Tap | Heatmap cell | Show day detail tooltip |
| Tap | FAB | Open Add Medication modal |
| Tap | SIA coaching note card | Tab switch to SIA Chat [09] with medication context |
| Tap | RPG badge | Stack push to RPG Character [19] |
| Tap | "see all" (medications) | Expand to show all medications (if truncated) |
| Tap | Back button | Pop stack |
| Long-press | Medication check row | Context menu: edit, skip dose, view history |
| Swipe left | Medication check row | Reveal skip/edit actions |
| Swipe left | Medication card row | Reveal edit/delete actions |
| Swipe right from edge | Screen | iOS back gesture |
| Drag down | Add Medication modal handle | Dismiss (with unsaved changes confirmation) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: SIA note (0ms), adherence bar (80ms), warning banner (160ms), today's meds section (240ms), medication list (320ms), heatmap (400ms), privacy notice (480ms) | 280ms each | ease-out-soft |
| Checkbox check | Tap | Checkmark stroke draws in (stroke-dashoffset), fill color fades in, row text mutes to 50% | 160ms | ease-out-soft |
| Adherence bar fill | Medication checked/unchecked | Bar width animates to new percentage | 280ms | ease-out-soft |
| Adherence bar green | Last medication checked | Fill crossfades teal to green, "all taken" label fades in | 280ms | ease-out-soft |
| Heatmap cells | Enter viewport | Staggered opacity fade-in, 20ms stagger per cell, top-left to bottom-right | 160ms each | ease-out-soft |
| Add Medication modal | FAB tap | Bottom sheet slides up from y=screenHeight to final position | 520ms | ease-flow |
| Modal dismiss | Drag or cancel | Sheet slides down to y=screenHeight | 280ms | ease-out-soft |
| Medication save | "save" tap | Sheet slides down, new entry fades into medication list (opacity 0 to 1 + translateY -12 to 0) | 520ms sheet, 280ms entry | ease-out-soft |
| Frequency segment | Tap segment | Active indicator slides horizontally to new segment | 280ms | ease-out-soft |
| Reminder toggle | Tap | Circle slides, bg color transitions, chip row expands below | 160ms toggle, 280ms expand | ease-out-soft |
| FAB | Mount | scale(0.8 to 1) + opacity(0 to 1), 400ms delay | 280ms | ease-out-soft |
| FAB | Scroll down | fade out + translateY(+20pt) | 160ms | ease-out-soft |
| FAB | Scroll up/stop | fade in + translateY(0) | 160ms | ease-out-soft |
| Swipe actions | Swipe left | Edit/delete/skip buttons slide in from right | 280ms | ease-out-soft |
| Tooltip | Heatmap cell tap | Tooltip fades in above cell, scale(0.9 to 1) | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push — slides in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slides out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "tracking medications helps SIA understand your wellbeing routine. add your first one below."
- Adherence summary bar: Hidden (no medications to track yet).
- Warning banner: Still visible (safety-first, even with no medications).
- Today's medications section: Replaced by centered empty state. Icon: outlined pill icon (48pt, white at 15%). Text: "no medications tracked yet" in 15pt Sora Regular, white at 40%, center-aligned. Below: "add medication" text link in orange (#FF5E00), 15pt Sora Semibold, taps to open Add Medication modal.
- All medications section: Hidden.
- Heatmap: Hidden (no data to show).
- Privacy notice: Still visible (establishes trust before any data entry).
- FAB: Prominent and visible — the primary path to getting started.

### Established user (all taken today)
- Adherence bar: Green (#34A853) fill, "all taken" with green checkmark.
- All checkboxes filled with teal checks.
- SIA note: "all medications taken today. consistency builds health."
- No extra messaging needed — the green completion state speaks for itself.

### Established user (no medications due today)
- Today's medications section shows: "no medications scheduled for today" in 15pt Sora Regular, white at 50%, within a standard ink-brown-800 card.
- Adherence bar: Hidden or shows a dash.
- All medications section and heatmap remain visible.

---

## Motivation Adaptation

- **Low motivation**: SIA note is shorter and gentler: "just one medication at a time." Today's medications shows only the next upcoming dose instead of the full day's list. Heatmap hidden entirely. Medication list shows only active medications with no history pressure. Privacy notice remains visible.
- **Medium motivation**: Full experience as described. All sections visible. Standard SIA coaching tone.
- **High motivation**: Additional analytics appear below heatmap: adherence percentage trend (sparkline, 30-day), longest streak stat, medication-by-medication adherence breakdown (small bar per medication). SIA note is more data-driven: "92% adherence this month, up from 87% last month." Medication cards show additional detail like "taken 28 of 30 days" inline.

---

## Accessibility

- **Screen reader**: All medication names, dosages, and statuses announced on focus. Checkbox state communicated ("taken" / "not taken"). Heatmap cells announce day and adherence count on focus.
- **Dynamic type**: All text scales with system font size settings. Minimum touch targets maintained at 44x44pt even at largest type sizes.
- **Color contrast**: All text meets WCAG 2.1 AA contrast requirements against ink-900 and ink-brown-800 backgrounds. Teal (#14B8A6) on ink-brown-800 meets 4.5:1 minimum. White text on all dark surfaces exceeds requirements.
- **Reduce motion**: When system "reduce motion" is enabled, all animations replaced with simple opacity crossfades (280ms). No staggered entrance, no scale animations, no slide transitions.
- **VoiceOver order**: Header > SIA note > adherence bar > warning banner > today's medications (grouped) > medication list > heatmap > privacy notice > FAB.

---

## Backend Integration

### Database Table: `user_medications`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users table |
| medication_name | VARCHAR(255) | Required |
| dosage | VARCHAR(100) | Required (e.g., "500mg", "1000 IU") |
| frequency | ENUM | "daily", "twice_daily", "weekly", "as_needed" |
| scheduled_times | JSONB | Array of time strings (e.g., ["08:00", "20:00"]) |
| start_date | DATE | Required |
| end_date | DATE | Nullable (ongoing if null) |
| notes | TEXT | Nullable |
| reminder_enabled | BOOLEAN | Default true |
| reminder_offset_minutes | INTEGER | Default 15 |
| is_active | BOOLEAN | Default true (soft delete) |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### Related Table: `medication_doses`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_medication_id | UUID | Foreign key to user_medications |
| scheduled_date | DATE | The date this dose was scheduled |
| scheduled_time | TIME | The time this dose was scheduled |
| taken_at | TIMESTAMP | Nullable (null = not taken, set = taken) |
| skipped | BOOLEAN | Default false |
| created_at | TIMESTAMP | Auto-generated |

### API Endpoints

- `GET /api/medications` — List all active medications for user
- `GET /api/medications/today` — Today's scheduled doses with taken/pending status
- `POST /api/medications` — Create new medication
- `PUT /api/medications/:id` — Update medication details
- `DELETE /api/medications/:id` — Soft delete medication (set is_active = false)
- `POST /api/medications/:id/doses/:doseId/take` — Mark dose as taken (sets taken_at)
- `POST /api/medications/:id/doses/:doseId/skip` — Mark dose as skipped
- `GET /api/medications/adherence?days=28` — Adherence data for heatmap (daily completion rates)
- `GET /api/medications/adherence/streak` — Current adherence streak count

### Data Privacy

- All medication data encrypted at rest (AES-256)
- Medication names and dosages stored as encrypted fields
- No medication data shared with third parties
- No medication data used for advertising or analytics beyond personal tracking
- Data deletion available via Settings > Privacy > Delete Health Data

---

## Edge Cases

### Specific Drug Interaction Detected
When the user adds a medication that has a known interaction with an existing medication (server-side check via `POST /api/medications` response):
- **Inline warning on save**: The Add Medication modal does NOT prevent saving. Instead, after the save completes, a dedicated Interaction Alert card appears at the top of the screen (below the SIA coaching note, above the adherence bar):
  - **Visual**: ink-brown-800 card, --r-md, 16pt padding. Red (#F44336) left border 3pt. 16pt horizontal margins.
  - **Icon**: Shield with exclamation (20pt, #F44336), left-aligned
  - **Title**: "potential interaction detected" — 15pt Sora Semibold, white
  - **Body**: "[Medication A] and [Medication B] may interact. consult your doctor before taking them together." — 14pt Sora Regular, white at 60%
  - **Source note**: "source: drug interaction database" — 12pt Sora Regular, white at 30%, italic
  - **Actions**: Two buttons in a row:
    - "I've consulted my doctor" — 13pt Sora Semibold, white at 60%, ink-brown-800 bg, --r-pill, 36pt height. Tapping dismisses the alert and logs the acknowledgment.
    - "learn more" — 13pt Sora Semibold, orange, text link. Opens an external resource URL (system browser).
  - **Persistence**: The alert reappears each time the screen loads until acknowledged. After acknowledgment, it is replaced by a subtle indicator on the Interactions Warning Banner: "1 acknowledged interaction" in 12pt Sora Regular, white at 40%, appended to the existing banner text.
  - **Entry animation**: Card slides down from top (translateY -16 to 0, opacity 0 to 1, 520ms ease-flow) + red border pulses once (opacity 40% to 80% to 40%).

### Dismiss / Acknowledge Interaction Warning
- **"I've consulted my doctor" flow**: Tap → confirmation toast: "noted — this won't show again for [Medication A] + [Medication B]" (standard toast, 4s auto-dismiss). Logged via `POST /api/medications/interactions/:id/acknowledge`.
- **Re-surface**: If the user changes the dosage of either medication, the interaction alert resurfaces with updated context.
- **Multiple interactions**: If 2+ interactions exist, they stack vertically (12pt gap between cards). Max 3 visible — "view all interactions" orange link below if more.

### Midnight Rollover (Medication Schedule)
When midnight passes while the user is on this screen:
- **Today's Medications section**: Medications for the new day fade in (staggered, 280ms each). Previous day's unchecked medications are moved to a "yesterday — missed" collapsed section at the bottom of today's list (expandable, white at 30% text, strikethrough on names).
- **Adherence bar**: Resets to "0 of [N] today" with a fresh progress bar. Yesterday's completion rate is committed to the heatmap.
- **Heatmap**: The "today" border shifts to the next cell. Yesterday's cell fills to its final adherence opacity.

---

## Self-QA Checklist

- [x] All colors from brand palette (no strays, no hardcoded values outside the system)
- [x] 60/30/10 ratio holds: orange on all CTAs and interactive elements, green on completion only, purple on single SIA dot
- [x] Domain color (wellbeing-teal) confined to identification: accent line, eyebrow, RPG badge, checkboxes, heatmap, adherence bar — never on actions
- [x] Sora only, correct mobile scale (no web-sized type)
- [x] All spacing values on 8pt grid (4, 8, 12, 16, 24, 32, 48, 64pt)
- [x] Every interactive element has all states defined (8-state model)
- [x] Touch targets minimum 44x44pt on all interactive elements
- [x] Dark mode is the primary design (ink-900 background)
- [x] Mobile-native patterns used (no sidebar, no hover-dependent interactions, no CSS grid)
- [x] Cross-references to related screens are present and accurate
- [x] Navigation pattern specified (stack push from wellbeing/explore, modal for add medication)
- [x] Empty states described (Day 1, all taken, no medications today)
- [x] Motivation-tier adaptation noted (low/medium/high)
- [x] ASCII wireframe included showing major layout zones (main screen + add modal)
- [x] No web-isms: no "sidebar", no "footer", no "responsive breakpoints"
- [x] Interactions warning banner is persistent and non-dismissible (safety-first)
- [x] Privacy notice present (sensitive health data)
- [x] Backend schema matches screen requirements

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title | Sora | Semibold 600 | 20pt | 28pt | #FFFFFF |
| RPG skill badge | Sora | Semibold 600 | 13pt | 18pt | #14B8A6 |
| Section eyebrow | Sora | Semibold 600 | 12pt | 16pt | #14B8A6 or #FFFFFF at 40% |
| SIA coaching message | Sora | Regular 400 | 15pt | 22pt | #FFFFFF |
| Adherence count label | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Adherence percentage | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF at 70% |
| Warning title | Sora | Semibold 600 | 14pt | 20pt | #FFFFFF |
| Warning body | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 60% |
| Time group header | Sora | Semibold 600 | 12pt | 16pt | #FFFFFF at 40% |
| Medication check name | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Medication check dosage | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 60% |
| Frequency text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Scheduled time | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 50% |
| Medication card name | Sora | Semibold 600 | 16pt | 22pt | #FFFFFF |
| Medication card dosage + freq | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 60% |
| Medication card start date | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Reminder time text | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 40% |
| Card end date | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% |
| Card notes preview | Sora | Regular 400 | 12pt | 16pt | #FFFFFF at 30% (italic) |
| Heatmap day labels | Sora | Regular 400 | 11pt | 16pt | #FFFFFF at 30% |
| Heatmap month label | Sora | Regular 400 | 13pt | 18pt | #FFFFFF at 40% |
| Heatmap streak text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 60% |
| Privacy notice text | Sora | Regular 400 | 14pt | 20pt | #FFFFFF at 50% |
| FAB label | Sora | Semibold 600 | 15pt | 20pt | #FFFFFF |
| Modal cancel | Sora | Regular 400 | 15pt | 20pt | #FFFFFF at 60% |
| Modal save | Sora | Semibold 600 | 15pt | 20pt | #FF5E00 |
| Modal input label | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF at 40% |
| Modal input placeholder | Sora | Regular 400 | 16pt | 22pt | #FFFFFF at 40% |
| Frequency segment text | Sora | Semibold 600 | 13pt | 18pt | #FFFFFF |
| Time chip text | Sora | Regular 400 | 13pt | 18pt | #FFFFFF |
| Reminder toggle label | Sora | Regular 400 | 15pt | 20pt | #FFFFFF |
| Save medication CTA | Sora | Semibold 600 | 17pt | 24pt | #FFFFFF |

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Medication list load fails | Skeleton shimmer for 3s, then "could not load medications — tap to retry" centered | Tap retry re-fetches; pull-to-refresh also available |
| Dose check-off (mark taken) fails | Checkbox reverts to unchecked state with gentle snap, "could not log dose — try again" toast (3s) | User can re-tap checkbox |
| Add medication save fails | Modal save CTA shows error state (red border flash), "could not save — try again" toast | CTA re-enables, all form data preserved |
| Adherence history load fails | Heatmap area shows "could not load history" + "retry" link in orange | Tap retry re-fetches adherence data |
| SIA coaching note load fails | Card shows "could not load SIA note" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Medication edit save fails | Modal save CTA shows error state, "could not save changes" toast | CTA re-enables, edit data preserved |
| Medication delete fails | "Delete" action cancelled, "could not delete — try again" toast | Row remains visible, user can retry |
| Reminder scheduling fails | Reminder toggle reverts to previous state, "could not set reminder" toast | User can re-toggle; previous state preserved |
| Drug interaction check fails | Save proceeds without interaction check. No interaction alert shown. Banner note: "interaction check unavailable." | System retries check in background; shows alert if found later |
| Network offline | Cached medication data shown with "offline" banner. Check-off operations queue locally and sync on reconnect. Add/edit disabled with "available when online" toast. | Banner includes "tap to retry" on reconnect |

---

## Cross-References

- **Navigates to**: SIA Chat [09] (via SIA coaching note tap, tab switch), Add Medication modal (via FAB, modal present), RPG Character [19] (via RPG badge, stack push), Medication detail/edit (via medication card tap, modal present)
- **Navigates from**: Wellbeing Dashboard (via "Medications" card, stack push), Explore [18] (via health utility card, stack push), SIA Chat [09] (via deep-link, stack push), Home Screen [12] (via medication action card, stack push), Settings [21] > Health section (stack push)
- **Shared components with**: Screen [38] — Habits (Checkbox Row pattern, Calendar Heatmap, FAB pattern, Time-of-Day Section Headers), Screen [37] — Journal (Domain Tag Chip, FAB pattern), Screen [26] — Fitness Dashboard (Domain Dashboard Header, SIA Coaching Note Card, Section Heading Row), Screen [34] — Spirituality Dashboard (Practice Tracker checklist pattern)
- **Patterns used**: Domain Dashboard Header (Screen 26), SIA Coaching Note Card — Compact Variant (Screen 26), Brand CTA Button (Batch 1), Text Input Field (Batch 1), Segmented Control (Screen 15), Toggle Switch (Screen 15), Filter Chip (Screen 13), Calendar Heatmap (Screen 38), Section Eyebrow Label (Screen 12), Section Heading Row (Screen 26), FAB — Extended Pill variant (Screen 35), Back Button (Batch 1), Modal Presentation (Batch 1), 8-State Interaction Model, Staggered Content Entry Animation
- **Patterns established**: Medication Check Row (checkbox + name + dosage + frequency + time, within time-of-day groups), Medication Card (name + dosage + frequency + start date + reminder indicator + notes preview), Adherence Summary Bar (count + domain-colored progress bar — variant of Completion Rate Bar with domain color), Interactions Warning Banner (amber-bordered persistent safety notice), Privacy Notice Card (lock icon + privacy assurance text with domain accent), Add Medication Modal (multi-field form with frequency segmented control, time chips, reminder toggle, and date pickers), Reminder Offset Selector (toggle + chip row for notification timing)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-16.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U08`
**Prototype route**: `/features/medication`
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
| B16-F01 | critical | retention | Render dose rows as semantic controls with persisted taken state and wire Add medication to the medication form. |
| B16-F02 | major | trust-privacy | Add medication detail/history/reminder routes or sheets, and link safety/privacy copy to explanatory detail. |
| B16-F03 | minor | mobile-ergonomics | Expand compact hit areas to at least 44px while preserving visual size. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

