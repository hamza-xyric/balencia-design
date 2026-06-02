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
  - Adherence read — `GaugeRing` (S60-V01): orange arc-following `--grad-orange` (conic-mask) over a `--track-inset` recess, hub count ("3 of 4"); shifts to forest-green (#34A853) only at 100% / all-taken, never recoloured red below (supersedes the prior flat teal progress bar). Animated (ring-animate) on data change.
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
    - Checked (taken): forest-green (#34A853) node fill + white checkmark (14pt, 2pt stroke) — the taken/reached state per S60-V02 (arrival, never teal data-ink). Check animation: checkmark draws in (stroke-dashoffset), fill fades in, 160ms ease-out-soft; the adherence GaugeRing re-sweeps.
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
    - 1-33% taken: brand-orange (#FF5E00) at 20% opacity
    - 34-66% taken: brand-orange at 50% opacity
    - 67-99% taken: brand-orange at 75% opacity
    - 100% taken: brand-orange at 100% opacity (5-step orange ramp per S60-V03, deployed CalendarHeatmap tone='brand')
    - Future days: white at 3% fill (ghosted — distinct from a real no-dose day; no-data ≠ zero)
    - Today: 1.5pt brand-orange (#FF5E00) border (dashed if incomplete, solid if complete)
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

## Visualization

> Source: no companion file (none authored for this screen). Audited in `viz-audit/` — Batch (Tracker B), findings `S60-V01..S60-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **Reuses `VK-014 TimelineAgenda`** (minted on Streak Details [59]; this is the "adherence track" consumer named in its kit entry), **`GaugeRing` (VK-002)**, and the deployed **`CalendarHeatmap`** — mints **no** new primitive. Premium-depth, on-brand (60/30/10), **Wellbeing Mode → wellbeing-teal `#14B8A6` is *identity* only** (header line, eyebrows, RPG badge, privacy/reminder icons) — orange dominates data ink. **Heavy non-shaming is this screen's reason for the upgrade:** a missed dose is **never red-shamed** — it stays a calm "take when you can," the path never breaks or turns red, and taken doses are permanent. No new data — every visual derives from data the screen already shows. Benchmark = **Fantastical + Things** (agenda density, adherence calendars) rendered **the Balencia way** (drawn progress path + warm glow), not a clinical pill-checklist clone. **Current grade C (66) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; the residual gap to A+++ is build-verified depth + a working dose-tap re-sweep + tooltip drill, owned by the later viz-build program.)*

Template = **Tracker B** (single-metric hero → today's bars/track → consistency grid). Today the prototype renders as a competent text tracker: a **flat teal `bg-domain-wellbeing` progress bar** for adherence (teal carrying *data ink* — a 60/30/10 + identity-misuse defect, `S60-V05`), a flat 2-tone checklist with no sense of *sequence through the day*, and a 4-week heatmap whose cells are all **`bg-domain-wellbeing` teal at graduated opacity** (teal-as-data-ink again, `S60-V05`). There is **no hero viz** and **no view of the day as a temporal track**. This section upgrades *how the adherence data reads* — one focal adherence **`GaugeRing`**, the day's doses as a drawn **`TimelineAgenda`** progress path (reached → current → upcoming), and a re-tinted honest **`CalendarHeatmap`** — without displacing the safety/privacy content, which stays the trust backbone.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Today's adherence (3 of 4 = 75%) | flat **teal** `bg-domain-wellbeing` progress bar + "%" | **hero adherence `GaugeRing`** (96px, arc-gradient orange, glow, inset, "3 of 4" hub + "today" label; **green at 100% — the only colour shift**, never red below) | **`GaugeRing` (VK-002)** |
| Today's doses by time-of-day (Morning/Evening rows, taken / pending) | flat checklist rows in a card (no temporal gestalt) | **`TimelineAgenda` day-track** — drawn progress path; **taken = green node + ✓**, **next-due = orange ring + pulse**, **upcoming = white/10 dot**; path runs orange→green across the day, **never red, never broken** | **`TimelineAgenda` (VK-014, reuse 59)** |
| 4-week adherence history | 4×7 grid, all cells **teal** at graduated opacity | **`CalendarHeatmap`** re-tinted to the **5-step orange ramp** (`--color-alpha-white-05` → orange) so *consistency reads as the brand's effort colour*, today = dashed border, tap = `scale-110` | `CalendarHeatmap` (deployed) |
| Adherence streak ("14-day streak", flame) | text + orange flame icon | kept as a **caption beside the heatmap** (orange flame = the one orange identity anchor) — **non-shaming: no countdown, no loss-aversion** | — (deliberately textual/iconographic) |
| Per-medication adherence (high-motivation: "28 of 30 days") | text / mini-bar (high-mtv) | optional **`Sparkline`** (7-pt Living Line) per medication in the detail sheet — high-motivation only | `Sparkline` (VK-001) |
| Med names · dosage · frequency · schedule times · since-dates · reminder times · safety/privacy copy | text | — (deliberately textual — one-off identifiers/scalars + safety prose, no useful visual form) | — |

**Editorial hierarchy (calm, not maximal):** the **adherence `GaugeRing` is the one viz hero**; the `TimelineAgenda` day-track is the primary *interactive* surface (it replaces the checklist); the heatmap is ambient consistency. The safety banner + privacy card stay plain prose — **deliberately un-charted** (a warning is not a datum to visualize). Three charts, one focal — not a wall of equal charts.

### 1 · Adherence hero — `S60-V01` → `GaugeRing` (96px)

Promote today's adherence (**3 of 4 = 75%**) from a flat teal bar to the screen's **one viz hero**: a 96px `GaugeRing` with an **arc-following gradient stroke** (`--grad-orange` **(mint)** via conic-mask — *not* a flat SVG `linearGradient`; the angular-gradient trap), the full `--glow-orange` (32px, hero-only), a `--track-inset` `rgba(0,0,0,0.28)` **(mint)** beveled track under the `--color-alpha-white-10` track, a center **hub** value ("3 of 4", `text-h2`, count-up 520ms `--ease-flow`) + a "today" sub-label, and **`ticks`** (12 radial ticks, hero score gauge).
- **Non-shaming colour law (the heart of this screen):** the fill is **always orange** (brand data ink) and shifts to **green `#34A853` only at 100% / all-taken** (arrival) — it is **never** recoloured amber/red below target. A 75% reading is *progress*, not a deficit; a 0% reading shows a **ghosted arc** + a calm "take when you can — your day's still open," never an alarm ring. This corrects the spec's amber/red-warning instinct elsewhere on the screen.
- **Why a gauge, the Balencia way:** the same bounded *score* device used for recovery/sleep/domain scores across the app, so adherence reads as one warm-glow instrument family — not a clinical donut.
- **Micro-interaction:** marking a dose taken **re-sweeps** the arc + count-ups the hub; tap the gauge → scroll to the day-track.
- **States:** all-taken → green arc + "all taken" hub + ✓ glyph; **no doses scheduled today** → ghosted full-track + "nothing due today" (no-data ≠ a real 0%); **no medications yet (Day-1)** → gauge hidden, FAB-led empty state (per spec).
- **Data:** `medicationTracking.summary` (`taken` / `total` / `percent`).

### 2 · Today's doses as a drawn day-track — `S60-V02` → `TimelineAgenda` (VK-014)

Replace the flat time-grouped checklist with the **`TimelineAgenda` day-track** (`VK-014`, the kit's named **Medication-adherence consumer**): each scheduled dose is a **node on a single drawn progress path** running top→bottom through the day (Morning → Evening), so the user sees *where they are in the day's sequence* — the gestalt the current checklist can't give.
- **Node encoding (locked, token-backed):** **taken/reached = filled `--color-forest-green` + white ✓**; **next-due/current = `--color-brand-orange` 2px ring (no fill) + `--glow-orange-sm` (~12px **mint**) pulse** — the single focal accent; **upcoming = `--color-alpha-white-10` fill + a dot glyph** at `--color-alpha-white-30`. Diameter 20–24pt with a **min-44pt hit box** (carries finding `B16-F03`). Status is **always glyph + colour**, never colour-alone (the checkbox `aria-pressed` becomes a real ✓/ring/dot).
- **Path encoding (Living-Line family):** a drawn `--stroke-base` 4px round-capped line; the **reached segment** runs `--grad-progress` **(mint)** orange→green; the **unreached segment** is `--color-alpha-white-08`; the boundary sits at the next-due node — the eye traces a literal path through the day. Reuses the Living Line gradient so the track reads as one family with `TrendChart`/`Sparkline`.
- **Row anatomy:** med name + dosage (primary) · "daily · 8:00 AM" temporal caption (`white/40`) · time-of-day group labels (Morning/Evening) ride as section captions along the path.
- **Heavy non-shaming (ethical core, `S60-V04`):** the **path never turns red and never visibly breaks**; an **overdue/missed** dose is the **upcoming treatment + a muted clock glyph** (not an alarm-red node) under calm "take when you can" copy — never "you missed this." On midnight rollover, **taken nodes stay reached** (past adherence is permanent); only the new day's unreached segment re-marks its current node. **No loss-aversion countdown.** This is the literal viz expression of the SIA "missed doses → fresh start" coaching variant the spec already writes.
- **Micro-interaction:** tap a node = mark taken (node fills green + ✓ draws in, path advances, hero gauge re-sweeps); long-press = skip/edit/history (carries existing gestures); the "as needed / PRN" doses sit as an un-pathed cluster below the dated track (they have no scheduled time).
- **States:** **cold-start / none-taken** → first node pulses "next," rest upcoming, path fully `white/08` (aspirational, never empty/red); **all reached** → full orange→green path + calm completion cap; **loading** → node skeletons + path draws in; **error** → "couldn't load today's doses" + retry, taken nodes from cache.
- **Data:** `medicationTracking.groups` (time-of-day → items → `taken`).

### 3 · Adherence history — honest orange consistency grid — `S60-V03` → `CalendarHeatmap`

The 4-week `CalendarHeatmap` (deployed component — reuse as-is) keeps its 4×7 form but adopts the kit's **5 intensity steps re-tinted to the brand effort colour**: `--color-alpha-white-05` (no doses) → **orange `#FF5E00`** at full (100% adherence), with `today` = dashed border and tap = `scale-110` → tooltip ("3 of 4 taken"). This moves consistency-as-data-ink **off teal and onto orange** (`S60-V05`) — teal returns to *identity* only.
- **Honesty:** a true **no-dose day** (`--color-alpha-white-05`) is visually distinct from a **future/un-due day** (ghosted `white/03`) — they must not collapse into one; no-data ≠ a real zero-adherence day.
- **Non-shaming:** empty cells read as **"open days," never a guilt grid**; the 14-day-streak caption (orange flame) sits beside the grid with **no countdown / no loss-aversion** language (Gentler-Streak thesis baked into the benchmark). A lapse re-bases the streak quietly — past filled cells **stay filled**.
- **Data:** `medicationTracking.adherenceRows` (daily adherence intensity 0–4).

### 4 · Per-medication micro-trend (high-motivation) — `S60-V04` → `Sparkline`

**High-motivation tier only:** in the medication detail sheet, a 7-point `Sparkline` (tiny Living Line, 2px orange, curved, 64×24, green end dot on a perfect-week milestone, **no glow**) under each medication showing its recent adherence trajectory (e.g. "28 of 30 days"). Honest, non-shaming — a dip reads as "room to move," never a failure. Hidden at default/low motivation (per the spec's motivation adaptation). Data: per-medication dose history (detail-sheet "6/7 · 25/28" already present).

### Motion choreography (entrance — draw-first order)

Per `CONSISTENCY.md`: **hero draws first** — the 96px adherence `GaugeRing` fills (`ring-animate`, 520ms `--ease-flow`) + ticks + hub count-up — **then** the `TimelineAgenda` **path draws itself** top→bottom (`stroke-draw`, `--dur-flow` 1200ms `--ease-flow`), the reached orange→green segment drawing before the unreached `white/08`, with nodes settling (0.8→1, 280ms) as the path reaches each and the current node's `--glow-orange-sm` pulse looping 2s → **then** the heatmap cells stagger in (20ms/cell, top-left→bottom-right). One line motif per surface (the day-track is the only drawn path; gauge/heatmap are rings/cells). Below-fold visuals (heatmap) animate on **scroll-into-view**. On a dose-tap, only the touched node + path-advance + hero re-sweep animate (not a full re-draw). `prefers-reduced-motion` → every chart at final state instantly; the day-track's static form (completed path + settled nodes, pulse off), the gauge's filled arc, and the heatmap at rest preserved — no info lost.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start / Day-1** — no medications → gauge + day-track + heatmap hidden behind the FAB-led empty state (spec); **established / no doses due today** — gauge ghosted "nothing due today," day-track shows a calm rest cap, heatmap populated from history; **none-taken-yet today** — gauge ghosted-0 (not a filled 0), first node pulses "next," path fully `white/08`; **loading** — depth-preserving skeletons that *morph* into drawn data (gauge arc + ticks, path draws in, heatmap cells shimmer) — never blank discs; **partial / midnight rollover** — yesterday committed to the heatmap, taken nodes stay reached, today re-bases (per the spec's rollover rules); **error** — chart-specific honesty per the Error Handling table (gauge "could not load adherence," heatmap "could not load history — retry," day-track independent) + a visible retry.
- **60/30/10 (corrected — `S60-V05`):** **orange dominates data ink** — adherence `GaugeRing` arc, the `TimelineAgenda` reached-path effort segment + current-node ring, the heatmap intensity ramp, the streak flame, FAB / save / "see all" / active segments. **Green** = arrival/completion only (100% gauge, taken nodes + arrival path segment, all-taken state). **Purple** stays SIA-only — the coaching-note dot (no chart-purple on this screen; there is no projection). **Wellbeing-teal `#14B8A6` is now identity only** (header accent line, eyebrows, RPG badge, privacy/reminder bell icons) — it **no longer carries adherence-bar or heatmap data ink** (the two teal-as-data-ink misuses are retired here). **Amber stays confined to the non-dismissible safety banner** (a genuine medical-safety signal, not a data series) and **never** tints a chart node/cell. Glow uses the size-stepped scale (96px = 32px hero glow, current node = `--glow-orange-sm` ~12px, heatmap/sparkline = none) — warm depth, not neon.
- **Non-shaming (the screen's thesis):** a missed/overdue dose is **state + an open door** ("take when you can"), never a verdict — the gauge never turns red, the day-track path never breaks or reddens, taken nodes and filled heatmap cells are **permanent**, and the streak carries **no loss-aversion countdown**. This is the viz expression of the spec's gentle SIA copy ("looks like yesterday had a gap. today's a fresh start.").
- **Accessibility:** every gauge/track/heatmap carries a text/`aria-label` equivalent conveying the same value ("Adherence 3 of 4 today, 75 percent"; day-track "Morning Metformin, taken; Evening Lisinopril, due 8 PM"; heatmap cell "May 12, 3 of 4 taken"); dose status uses a **visible glyph** (✓ taken / orange ring next-due / dot upcoming) **plus** colour — never colour alone (fixes the current colour-only checkbox + teal cells); label/value contrast ≥ 4.5:1 on `#0A0A0F`/`#211008`; **WCAG 1.4.11** — gauge arc, the day-track path stroke + node fills + reached/unreached boundary, and load-bearing heatmap cells all meet ≥3:1 vs background (the `white/08` unreached track + `white/03` future cells are decorative-only); interactive chart targets ≥ 44×44pt (the node min-44 hit box carries `B16-F03`); linear AT reading order; `prefers-reduced-motion` renders all at final state with signature static forms preserved.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Fantastical + Things (agenda density, adherence calendars) — *stays Balencia via the warm-glow adherence hero GaugeRing + the drawn TimelineAgenda day-track + orange data-ink, not a clinical pill-checklist clone.*
**Pre-grade:** B+ (79) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the Visualization section (`GaugeRing`, `TimelineAgenda`, `CalendarHeatmap` with `--grad-orange` ramp) is specced to A− and carries the hero depth; the non-chart surfaces (SIA coaching note, warning banner, medication cards, privacy card) are flat `--color-ink-brown-800` boxes with no `--edge-highlight` or layered depth; (2) the SIA note and warning banner compete for the focal role above the fold (two visual anchors, unclear hierarchy); (3) edge microcopy (loading, empty Day-1, missing adherence rationales) is partly unauthored; (4) the medication-adherence timeline reads as a flat checklist with no temporal gestalt; (5) type pairings use ad-hoc pixel sizes instead of the locked `CK-P3` scale; (6) contrast pairs asserted, not tabulated.

### Focal hierarchy

One clear focal point: the **adherence `GaugeRing` hero (96px, `--glow-orange` 32px)** — the only ≥96px glowing element above the fold, answering "how am I doing today?" in <2 seconds. The **SIA Coaching Note sits above it as a warm emotional preamble, not a competing hero**: no glow, body type, two-line cap; it reads as the voice *introducing* the gauge, not the visual focal point. The **TimelineAgenda day-track is the primary *interactive* surface** (tap to mark taken), secondary by visual hierarchy to the gauge. Everything below (medication list cards, heatmap, privacy notice) is visibly secondary by size and depth. The squint test lands on the gauge's hub Life Power number first, then the SIA word, then the day-track nodes, then the ambient heatmap. No competing foci.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` 28pt · 1px `--glass-border` white at 6% · **`CK-T01 --edge-highlight` top-edge inner highlight** (`inset 0 1px 0 rgba(255,255,255,0.06)`, the not-flat cue, previously absent on all medication cards) · `--shadow-1`. The two hero surfaces (SIA Coaching Note Card, Adherence GaugeRing hero wrapper) add **`CK-T02 --surface-backplate`** (`radial-gradient(120% 90% at 50% 0%, rgba(255,94,0,0.05) 0%, transparent 60%)`, faint warm backplate). Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange` (32px /.45)** on the ≥96px adherence gauge hero only; **`--glow-orange-sm` (~12px /.35)** on the ~20–24pt day-track current-node ring (the next-due pulse accent); **no glow** on the 36pt SIA dot (identity, not focal), the 28pt medication heatmap cells, or inline row elements. The adherence gauge track sits inset (`--track-inset` `rgba(0,0,0,0.28)`) under the `--color-alpha-white-10` recess. The day-track path caps are round (per §8 "draw, never fade"). Medication check-row surfaces receive the same `CK-P1` layering — the per-time-group card (Morning/Evening) carries `--edge-highlight` + `--shadow-1`, so the checklist reads as a *composed* surface family, not flat rows. Extends the same depth language to the warning banner (amber-accented card, not a flat strip), the medication list cards, and the privacy notice card — so no surface reads as a flat box.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: domain header title "Medication tracking" `--text-h2` (20pt Sora) / 600 weight / `--leading-snug` (1.25) / white; SIA coaching message `--text-body` (16pt) / 400 / `--leading-normal` (1.4); medication names in checklist rows `--text-body` (16pt) / 600; dosage + schedule captions `--text-caption` (13pt) / 400 / `--leading-normal`; section eyebrows ("TODAY'S MEDICATIONS", "ALL MEDICATIONS", "ADHERENCE HISTORY") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` +0.12em / uppercase / white at 40%); time-group headers ("MORNING", "EVENING") same eyebrow treatment; medication card labels `--text-body` (16pt) / 600; adherence summary label ("3 of 4 today") `--text-h3` (17pt) / 600; GaugeRing hub count ("3 of 4") `--text-h2` (20pt) / 600 / tabular-nums; heatmap cell labels and stat text `--text-caption` (13pt) / 400; streak flame caption `--text-caption` (13pt) / 600; add medication button ("add medication") `--text-h3` (17pt) / 600. Hierarchy is carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words on the screen (the adherence gauge arc fill and the "take when you can" strength word in SIA copy). Chillax stays logo-only (none on this screen). Replaces the ad-hoc pixel line-heights with the `CK-T04` scale (`--leading-tight` 1.1 / `--leading-snug` 1.25 / `--leading-normal` 1.4 / `--leading-relaxed` 1.6).

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice — warm, plain, coaching tone; never shaming; no exclamation marks; the brand period with intent.

**SIA Coaching variants (all warm, non-shaming, framed as state + affirmation):**
- Good adherence: *before:* "3 medications on schedule today. you're consistent." → *after:* "3 medications on schedule today. you're building consistency." (affirmation grounded in action)
- Missed doses: *before:* "looks like yesterday had a gap. today's a fresh start." → *after (kept):* same; already on-voice, frames lapse as reset, never "you failed."
- Day 1: *before:* "tracking medications helps SIA understand your wellbeing better." → *after (kept):* same; establishes trust on entry.
- All taken: *before:* "all medications taken today. well done." → *after:* "all medications taken today. that consistency matters." (specific, earned)

**Edge strings (authored, never generic):**
- **Adherence summary, no medications due today** — *before:* no message → *after (new):* "no medications scheduled for today. rest days matter."
- **Day-track, loading** — *before:* generic spinner → *after (new):* skeleton nodes + path visible, morphs into drawn state + loading text "SIA is loading your schedule — one moment."
- **Empty state / Day-1 (no medications)** — *before:* bare "no medications tracked yet" → *after (new, warm):* "no medications tracked yet. add your first one below — SIA will help you stay on track." (invitation, no shame)
- **Overdue/missed dose node label** — *before:* "overdue" (alarm framing) → *after (new):* "take when you can — your day's still open" (open door, never alarm-red)
- **Heatmap, all cells empty / new user** — *before:* blank grid → *after (new):* grid visible with ghosted cells + "start tracking to build your history. first week takes shape fast." (aspirational, not empty-feeling)
- **Heatmap, streak broken** — *before:* no message → *after (new):* "14-day streak paused — pick it back up today. every dose counts." (non-loss-aversion, re-base framing)
- **Privacy notice** — *before:* "Your medication data is encrypted and private. Only you can see it." → *after:* "Your medication data is encrypted and private. only you can see it." (sentence case, consistency)
- **Add medication modal, save button disabled** — *before:* no reason → *after (new):* "add a name and dosage to save" (specific, constructive)
- **Permission rationale (system notification permission, if requested)** — "We'll remind you when it's time. You control how often." (why + what you gain)
- **Wellness-domain context (integration with XP/wellbeing score)** — "consistent tracking earns XP and strengthens your wellbeing score." (specific, motivating, non-shaming)

All copy avoids shame framing (no "failure," "missed," "guilt," "weak"), no exclamation marks, and uses the brand period with intent (such as "your day's still open." carries the period as a statement of possibility, not closure).

### Motion choreography

Locked to `CK-P4` order (draw-first, focal-to-support):

1. **SIA Coaching Note Card fades in** (opacity 0→1, `--dur-base` 280ms `--ease-out-soft`)
2. **Adherence GaugeRing hero draws** (the arc fills and hub counts up, `--dur-slow` 520ms `--ease-flow`, the focal motion that commands attention)
3. **TimelineAgenda day-track path draws** top→bottom (the reached orange→green segment draws first, the unreached `white/08` segment follows, nodes settle as the path reaches each, `--dur-flow` 1200ms `--ease-flow`, the secondary interactive surface)
4. **Medication checklist cards rise** (fadeUp + translateY, `--dur-base` 280ms `--ease-out-soft`, 40–80ms stagger within each time-group)
5. **Medication list cards and heatmap cells stagger in** (below-fold, animate on scroll-into-view, 20ms per cell, top-left to bottom-right)
6. **Privacy notice fades in** (trailing, `--dur-base` 280ms)

One line motif per surface: the gauge arc is the only filled stroke (no segmented/faded progress bar); the day-track path is the only drawn continuous line; heatmap cells are discrete no-line elements. Below-fold surfaces animate on scroll-into-view to preserve focal attention on the hero. On a dose-tap (checkbox click), **only the touched node + its path-advance + the hero gauge re-sweep animate** (not a full re-draw). `prefers-reduced-motion` → every chart at final state instantly; the gauge's filled arc + hub number, the day-track's completed orange→green path + settled nodes + current pulse off, and the heatmap at rest preserved — **no essential info lost, signature static forms preserved.**

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| **Cold-start / Day-1 (no medications)** | Adherence gauge hidden. FAB-led empty state: outlined pill icon (48pt, white at 15%) + "no medications tracked yet" text + "add your first one below" link (orange). Time-grouped checklist hidden. Heatmap hidden. SIA note, warning banner, privacy card still visible. | "no medications tracked yet. add your first one below — SIA will help you stay on track." Privacy assurance stays prominent to build trust on entry. | All surfaces on `--color-ink-brown-800` with `--edge-highlight`, no chart surfaces (gauge/track/heatmap hidden cleanly, not rendered as empty/zero states). Privacy notice on `--surface-backplate` (trust is the focal message at Day-1). |
| **Established user, none taken yet today** | Adherence gauge visible, ghosted 0% arc + "0 of 4" hub + "take when you can" label. Day-track: first node pulses orange `--glow-orange-sm`, rest upcoming white dots, path fully `white/08` (aspirational, never red or broken). Checklist rows have unchecked boxes. Heatmap shows past adherence + today as dashed border (incomplete). | "0 medications taken yet — tap a checkbox to start. your day's still open." | Gauge ghosted-arc visually distinct from a completed 100% (never a filled 0); nodes all visible (no collapse); path fully drawn (no break), pulse on current node. |
| **Loading / no doses loaded** | Adherence gauge: skeleton ring + ticks + hub number skeleton. Day-track: node skeletons (circles visible) + path skeleton (line visible, does not animate yet). Checklist: row skeletons in each time-group card. Heatmap: cell skeletons (grid visible). | "SIA is loading your schedule — one moment." | Skeletons preserve layout + depth (rings/spokes/rows/cells all visible as outlines, shimmer animates, morphs to data — never blank discs). |
| **Partial / midnight rollover / un-synced domain** | Adherence gauge shows today's updated %. Day-track: yesterday's completed path stays (reached nodes frozen green + checkmarks), today's path re-bases at midnight (nodes reset to pending, path re-marks current node). Heatmap: yesterday's adherence commits to the grid, today renders as dashed border. | "Your schedule for today · yesterday's adherence is saved" (if needed to clarify rollover). Taken nodes stay reached; past adherence is permanent. | No-data / un-synced displayed as ghosted/dashed (distinct from zero); taken nodes stay green (permanent honor of past adherence). Gauge anchors to current day only. |
| **Error (adherence data failed to load, medications list unavailable)** | Adherence gauge: chart-specific "Could not load today's adherence — pull to refresh" (orange banner, ≥3:1 contrast, glyph + word, never colour-alone). Day-track: "Couldn't load today's doses — pull to refresh" (same treatment). Heatmap: "Couldn't load history — pull to refresh." Medication list: "Couldn't load medications — pull to refresh." Cached data shown if available (last successful sync noted). | "Couldn't load today's adherence. pull to refresh." (specific to zone, constructive recovery). | Calibrated `--color-error-red` on genuine sync failure (red border + icon on the affected zone only, not the whole screen); glyph + word + recovery action (pull-to-refresh affordance clearly visible). |
| **Offline / cached mode** | All surfaces show last-synced data. Pull-to-refresh affordance is dimmed with a reason. | "You're offline. showing your last sync from [time]." (honest, explains lag). | Surfaces retain depth (all cards on `--edge-highlight`, no collapse). Actions honestly dimmed (50% opacity, no haptic feedback offered). Cached data retained, sync deferred. |

### Signature & anti-generic

Ownable Balencia moments:

1. **The drawn TimelineAgenda day-track** — a **single orange→green continuous path** (the drawn-not-faded Living Line signature from `§8`) running top→bottom through the day's doses, with nodes encoding status as **glyph + colour** (✓ taken / ring current / dot upcoming) — **never colour-alone**. The reached segment flows `--grad-progress` orange→green; unreached is calm `white/08`. This gestalt — the *path through the day* — is uniquely Balencia: a calendar app shows cells, a medication app shows a checklist, Balencia shows a **temporal journey the eye can trace**. The path **never turns red and never breaks**, even on overdue/missed doses (see non-shaming below). This is the visual expression of the "take when you can" coaching voice.

2. **The warm-glow adherence `GaugeRing` hero** — the same instrument used for recovery/sleep/domain scores app-wide, so medication adherence reads as **one warm-glow instrument family**, not a clinical chart. The gauge is **always orange** (brand data ink) and shifts to green **only at 100% / all-taken** (arrival, the only colour shift). This is the anti-generic alternative to a teal progress bar or an alarm-red warning ring.

3. **Honest, non-shaming empty states and error recovery** — the day-track path never visibly breaks; a missed dose is "take when you can," never "you failed"; the heatmap carries no loss-aversion countdown; streaks base quietly on new days without punishing lapses. This is the literal design expression of the "Gentler Streak" benchmark thesis.

Anti-generic fixes: the medication checklist is **not** a flat symmetric list (CK-P6). It is **time-grouped** (Morning / Evening) with **each group as a layered card** carrying `--edge-highlight` + `--shadow-1`, so the rows read as a *composed* temporal structure, not a wall of equal items. The adherence summary is not a flat two-tone bar; it is a **`GaugeRing` hero with glow**, breaking the generic adherence-app mold. The heatmap is **re-tinted orange** (the effort colour, brand data-ink) instead of the teal-as-data-ink misuse in the prior spec, so consistency reads as the brand's work, not a domain-colour copy.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-900` / `--color-ink-brown-800`):

| Element | Color | Contrast | Note |
| --- | --- | --- | --- |
| Medication name (checklist) | `--color-alpha-white-100` | ≥12:1 | Primary label |
| Adherence summary label ("3 of 4 today") | `--color-alpha-white-100` | ≥12:1 | Primary data |
| GaugeRing arc (orange, at 75%) | `--color-brand-orange` | 3.2:1 on `--track-inset` recess | WCAG 1.4.11 (load-bearing data visualization) |
| GaugeRing arc (green, at 100%) | `--color-forest-green` | 2.8:1 on track | WCAG 1.4.11 (green arrival, carried by build program) |
| TimelineAgenda reached path (orange→green) | `--color-brand-orange` / `--color-forest-green` | ≥3:1 on `--color-ink-900` | WCAG 1.4.11 (load-bearing path) |
| TimelineAgenda unreached segment (`white/08`) | `--color-alpha-white-08` | decorative only | Ghosts missing, never carries status alone |
| TimelineAgenda node fill (taken green + ✓) | `--color-forest-green` + white ✓ glyph | ≥3:1 | Glyph + colour (never colour-alone) |
| TimelineAgenda current node (orange ring) | `--color-brand-orange` | ≥3:1 on `--color-ink-900` | Glyph + colour (ring + pulse) |
| Heatmap cell (orange ramp, 100% adherence) | `--color-brand-orange` | ≥3:1 on `--color-ink-900` | Load-bearing fill on 5-step ramp |
| Heatmap cell (white/05, no doses) | `--color-alpha-white-05` | decorative only | Never a data signal; no-data ≠ zero |
| Medication dosage + frequency (secondary) | `--color-alpha-white-60` | ≥4.5:1 | Secondary caption |
| Warning banner text | `--color-alpha-white-60` | ≥4.5:1 on `--color-ink-brown-800` | Important safety notice |
| Privacy notice text | `--color-alpha-white-50` | ≥4.5:1 | Trust-building message |
| Checkpoint checkbox (unchecked) | white at 20% border | 2.1:1 (decorative border, interactive by role `aria-pressed`) | Role carries status, not colour alone |
| Checkbox (checked) | `--color-forest-green` + white ✓ | ≥3:1 | Glyph + colour (✓ visible + green fill) |
| Frequency segment (active) | `--color-brand-orange` | ≥3:1 | Active state (orange CTA standard) |
| FAB / "add medication" button | `--color-brand-orange` | ≥3:1 on `--color-ink-900` | Primary CTA |
| "see all" medication link | `--color-brand-orange` | ≥3:1 | Interactive text |
| Streak flame icon + caption | `--color-brand-orange` + white text | ≥3:1 | Non-loss-aversion accent |

**Status never colour-alone:** every dose status uses a **visible glyph** (✓ taken / ring next-due / dot upcoming) *plus* colour; every interactive element carries `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset on dark field) uniform app-wide — the medication checkbox, time-group header, card taps, FAB, heatmap cells, modal inputs all use the same ring. **Targets ≥44×44pt:** checkbox 24×24pt sits within a 44×44pt hit box (spec padding absorbs the target); time-of-day buttons, heatmap cells (28pt), FAB (48pt), medication card taps all meet or exceed 44pt. **Reduced-motion:** `prefers-reduced-motion` renders: adherence gauge at final fill width instantly (no arc-draw animation), hub number at final value instantly (no count-up), day-track path at final length instantly (no path-draw, but the static form — completed orange→green segment + settled nodes with current pulse off — is preserved), heatmap cells at final opacity instantly. All staggered entrances collapse to instant. The **signature static forms** (the drawn adherence gauge, the completed day-track path, the heatmap grid at rest) are preserved — **no essential info lost.**

**Keyboard & AT:** day-track nodes are keyboard-focusable (arrow keys to navigate, Space/Enter to mark taken); medication rows in the checklist are keyboard-navigable (Tab order preserved, Space to toggle checkbox); modal inputs are keyboard-accessible with standard tab order and escape-to-dismiss. All nodes/rows carry `aria-label` equivalents ("Metformin 500mg, taken at 8:00 AM, morning dose" / "Lisinopril 10mg, due 8:00 PM, evening dose, not yet taken"). Heatmap cells carry `aria-label` ("May 12, 3 of 4 doses taken, 75 percent adherence"). The day-track path is announced as a timeline ("Your medication schedule for today: Morning Metformin taken, Vitamin D taken, Evening Lisinopril due 8:00 PM…"). Screen reader users hear the temporal structure (nodes, path segments, status) without losing the visual gestalt the sighted user perceives.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Domain accent line | #14B8A6 | wellbeing-teal | Domain color, header only |
| Domain eyebrow text | #14B8A6 | wellbeing-teal | "TODAY'S MEDICATIONS" label |
| RPG badge text + bg | #14B8A6 at 100% / 15% | wellbeing-teal | Domain color on badge |
| Adherence GaugeRing arc | #FF5E00 → #34A853 | brand-orange / forest-green | Hero adherence gauge (S60-V01): orange arc-gradient data ink; shifts to green ONLY at 100% / all-taken — never red below |
| Adherence bar (all taken) | #34A853 | forest-green | Full completion celebration |
| Taken dose node (check) fill | #34A853 | forest-green | Reached/taken node + white ✓ (S60-V02 TimelineAgenda) — arrival/completion, never colour-alone |
| Checkbox checkmark | #FFFFFF | white | On teal fill |
| Heatmap fills | --color-alpha-white-05 → #FF5E00 | brand-orange 5-step ramp | Graduated adherence consistency (S60-V03); deployed CalendarHeatmap tone='brand' — future days ghosted white/03, distinct from a real no-dose day |
| Heatmap today border | #FF5E00 dashed | brand-orange | Today indicator (matches the orange consistency ramp, S60-V03) |
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

**60/30/10 verification**: Orange dominates data ink AND interactive elements — adherence GaugeRing arc, TimelineAgenda reached-path effort segment + current-node ring, the heatmap intensity ramp, the streak flame, FAB, save button, segmented control active state, "see all" links. Green (#34A853) appears only at arrival/completion — 100% gauge, taken dose nodes + arrival path segment, all-taken state. Purple limited to the single SIA coaching note dot (no chart-purple; there is no projection on this screen). Wellbeing-teal (#14B8A6) is confined to domain IDENTITY only — header accent line, section eyebrows, RPG badge, privacy and reminder bell icons; it NO LONGER carries adherence-bar, checkbox, or heatmap data ink (those teal-as-data-ink uses are retired in the Visualization S60-V05). Amber stays confined to the non-dismissible safety banner (a medical-safety signal, not a data series) and never tints a chart node/cell. This follows the domain color rule: identification only, never as primary data ink or actions.

---

## Interaction States

### Medication Check Row Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt square, white 20% border, transparent fill | -- |
| Pressed | Border brightens to white 40%, scale(0.90) | light impact |
| Checked (taken) | Forest-green node fill, white checkmark draws in (stroke-dashoffset), adherence GaugeRing re-sweeps + hub count-up | success notification |
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
| Default (partial) | GaugeRing orange arc filled to current % + hub count ("3 of 4") | -- |
| All taken | Arc shifts to forest-green + "all taken" hub + ✓ glyph | success notification |
| Empty / none due today | Ghosted full track + "nothing due today" hub (no-data ≠ a filled 0) | -- |

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
| Default | Graduated orange fill (5-step ramp; future days ghosted white/03) | -- |
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
| Adherence GaugeRing | Medication checked/unchecked | Arc re-sweeps to new % (ring-animate) + hub count-up | 520ms ring / 280ms count | ease-flow / ease-out-soft |
| Adherence GaugeRing arrival | Last medication checked | Arc shifts orange→green + "all taken" hub + ✓ | 520ms | ease-flow |
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

