# Screen Design: Relationships CRM (People)

**Screen**: 70 of 72
**File**: 70-relationships-crm.md
**Register**: Relationships Mode (relationships-pink #EC4899 domain accent — identification only; primary actions remain Burnt Orange per the domain-color usage rule)
**Primary action**: manage personal relationships and get reach-out reminders
**Tab**: Me (pushed from Explore or from the Relationships Dashboard)
**Navigation**: Stack depth 2-4 from Me tab root (Me Main → Explore → People, or Me Main → Explore → Relationships Dashboard [33] → "manage all people" → People). Entry from Explore [18] "People" grid card, Relationships Dashboard [33] via "manage all people" link on the Key People section, Home Screen [12] via a reach-out reminder card, or SIA deep-link [09] ("want to see who you should reach out to?"). Exit via back button to Explore or Relationships Dashboard.

---

## Purpose

This screen is the full relationship CRM — the `/people` route — where the user manages the complete roster of people in their life: adding contacts, editing cadence expectations, logging interactions, and reviewing history. Where the Relationships Dashboard [33] is a glanceable, SIA-narrated snapshot of the four or five people who matter most this week, this screen is the system of record: every person the user has ever added, searchable and filterable, each with a full interaction history.

The defining design decision on this screen is **honesty about what is and is not AI**. The Reach-Out Priority Banner and the Relationship Health Summary Card are both driven by a deterministic cadence algorithm — `next_due = last_interaction_at + cadence_days`, ranked by `overdue_days` descending — not by SIA. Nothing here is fabricated, inferred, or LLM-generated. The screen deliberately withholds the purple SIA accent that appears throughout the rest of the app, because using it here would imply intelligence this feature doesn't have. The algorithm is shown, not hidden behind an AI voice. Where SIA relationship *coaching* does live (cross-domain narrative insight, activity suggestions), it stays on the Relationships Dashboard [33] — this screen is the plumbing underneath it.

Every contact carries a relationship type (friend, family, colleague, mentor, partner, other), a configurable check-in cadence (in days), and a running interaction log with typed entries (call, text, meetup, email, social, other) and a source badge showing how the entry was created (manual, voice, calendar-auto-logged, WhatsApp). This screen is free-tier — relationship tracking is a core wellbeing feature, not gated.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Reach-Out Priority Banner — ranked list of who to contact today or this week, deterministic
2. Search bar — find a specific person fast
3. Filter Chip Row — filter roster by relationship type
4. Relationship Health Summary Card — deterministic narrative on overall cadence adherence
5. Roster Grid — every contact, two-column card grid
6. Add Person button — persistent creation entry point

**User flow**:
- **Arrives from**: Explore [18] via "People" card (stack push), Relationships Dashboard [33] via "manage all people" link (stack push), Home Screen [12] via reach-out reminder card (stack push), SIA Chat [09] via deep-link (stack push)
- **Primary exit**: Back to Explore [18] or Relationships Dashboard [33] (stack pop)
- **Secondary exits**: Contact Detail Sheet (modal, from any roster card), Add Person Modal (modal, from Add Person button), Relationships Dashboard [33] (via "see weekly view" link on the health summary card), SIA Chat [09] (via "ask SIA" shortcut deep inside Contact Detail, tab switch)

---

## Layout — Main Roster Screen

**Scroll behavior**: ScrollView (roster can exceed 100 contacts over time; grid renders progressively with `content-visibility: auto` per-row for offscreen cards)
**Tab bar visible**: Yes

### ASCII Wireframe — Main Roster Screen

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]         "People"         │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 16pt gap
│  ┌─────────────────────────────┐   │
│  │ ⚠ REACH OUT · cadence-based │   │  ← Reach-Out Priority
│  │   not AI                    │   │     Banner (orange border)
│  │ [av] Ahmed M.   overdue 5d  │   │     ranked rows
│  │      [call][text][log]      │   │     quick actions
│  │ [av] Mom        due today   │   │
│  │      [call][text][log]      │   │
│  │ [av] Lisa R.    due in 2d   │   │
│  │      [call][text][log]      │   │
│  └─────────────────────────────┘   │
│                                     │  ← 20pt gap
│  ┌─────────────────────────────┐   │
│  │ 🔍 search people             │   │  ← Search Bar (44pt)
│  └─────────────────────────────┘   │
│                                     │  ← 12pt gap
│  [all][friend][family][colleague]  │  ← Filter Chip Row
│  [mentor][partner][other]          │     horizontal scroll
│                                     │  ← 20pt gap
│  ┌─────────────────────────────┐   │
│  │ ♡ relationship health        │   │  ← Health Summary Card
│  │  "you're staying close with  │   │     (deterministic,
│  │   most people, but haven't   │   │      no purple dot)
│  │   connected with Ahmed in    │   │
│  │   a while"                   │   │
│  │  86% on-cadence this month   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ROSTER (24)                        │  ← Eyebrow + count
│  ┌───────────┐  ┌───────────┐     │
│  │ [avatar]  │  │ [avatar]  │     │  ← Roster Grid
│  │ Sarah K.  │  │ Ahmed M.  │     │     2-column cards
│  │ [partner] │  │ [friend]  │     │
│  │ ● 2d ago  │  │ ⚠overdue5d│     │
│  ├───────────┤  ├───────────┤     │
│  │ [avatar]  │  │ [avatar]  │     │
│  │ Mom       │  │ Ali R.    │     │
│  │ [family]  │  │ [colleague]│    │
│  │ due today │  │ ● 1d ago  │     │
│  └───────────┘  └───────────┘     │
│  ┌───────────┐  ┌───────────┐     │
│  │   ...     │  │   ...     │     │
│  └───────────┘  └───────────┘     │
│                                     │  ← 24pt gap
│                    ┌───────────────┐│
│                    │ + add person  ││ ← FAB (orange pill)
│                    └───────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Main Roster Screen (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "People" title

2. **Reach-Out Priority Banner** — Variable (~72pt per row, up to 3 rows shown)
   - Purpose: Surface who to contact today/this week, ranked by a deterministic cadence formula
   - Content: Orange warning icon + "cadence-based · not AI" caption + ranked contact rows with quick actions

3. **Search Bar** — 44pt
   - Purpose: Find a specific person by name fast (server-side, debounced)
   - Content: Search icon + text input

4. **Filter Chip Row** — 36pt
   - Purpose: Filter roster by relationship type
   - Content: all / friend / family / colleague / mentor / partner / other

5. **Relationship Health Summary Card** — ~120pt
   - Purpose: Deterministic narrative on overall cadence adherence across the roster
   - Content: Heart/pulse icon (not purple) + narrative text + on-cadence percentage

6. **Roster Grid** — Variable (2-column, ~148pt per card row)
   - Purpose: Every contact, browsable and scannable
   - Content: Contact cards with avatar, name, relationship type badge, cadence status

7. **Add Person Button (FAB)** — 48pt (fixed)
   - Purpose: Add a new person to the roster
   - Content: Plus icon + "add person"

---

## Layout — Contact Detail Sheet

**Scroll behavior**: Bottom sheet, internal ScrollView for notes/interaction history
**Tab bar visible**: No (modal covers tab bar)

### ASCII Wireframe — Contact Detail Sheet

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ─── (drag handle, 36pt wide)      │  ← Sheet handle
│  [close]              [⋯ more]     │  ← Modal header (44pt)
├─────────────────────────────────────┤
│                                     │
│           [ 64pt avatar ]          │  ← Avatar (centered)
│            Ahmed M.                 │  ← Name (20pt)
│            [friend]                 │  ← Type badge (pink)
│                                     │
│  ⚠ overdue 5 days · every 14 days  │  ← Cadence Status Line
│                                     │
│  ┌─────────────────────────────┐   │
│  │  cadence: every [14] days   │   │  ← Cadence Editor
│  │  [ -  14  + ]                │   │     stepper
│  └─────────────────────────────┘   │
│                                     │
│  📍 Karachi · 🕐 PKT (+5h)          │  ← Location/timezone meta
│                                     │  ← 24pt gap
│  ┌─────────────────────────────┐   │
│  │ 💬 ask SIA about Ahmed  →   │   │  ← Ask SIA Shortcut Card
│  └─────────────────────────────┘   │     (orange, non-AI-data)
│                                     │  ← 24pt gap
│  INTERACTION LOG                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ 📞 Called · May 6            │   │  ← Interaction Row
│  │    manual                   │   │     type icon + source
│  ├─────────────────────────────┤   │
│  │ 📅 Coffee (auto) · Apr 28    │   │  ← Calendar auto-log
│  │    calendar-auto-logged      │   │     indicator visible
│  ├─────────────────────────────┤   │
│  │ 💬 WhatsApp chat · Apr 20    │   │
│  │    whatsapp                 │   │
│  └─────────────────────────────┘   │
│  + log interaction                  │  ← Log Interaction btn
│                                     │  ← 24pt gap
│  NOTES                              │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ "Mentioned he's stressed     │   │  ← Notes Timeline
│  │  about the move" — May 6     │   │
│  └─────────────────────────────┘   │
│  + add note                         │
│                                     │  ← 24pt gap
│  archive this person                │  ← Archive link (red)
│                                     │
└─────────────────────────────────────┘
```

### Component Stack — Contact Detail Sheet (top to bottom)

1. **Sheet Header** — 44pt
   - Purpose: Close and overflow actions
   - Content: "close" (left) + "⋯ more" overflow menu (right)

2. **Identity Block** — ~140pt
   - Purpose: Who this contact is, at a glance
   - Content: 64pt avatar, name, relationship type badge

3. **Cadence Status Line** — 24pt
   - Purpose: Current standing against the configured cadence, in plain language
   - Content: Status icon + "overdue Nd" / "due in Nd" / "on track" + cadence interval

4. **Cadence Editor** — 56pt
   - Purpose: Configure how often the user wants to check in with this person
   - Content: Stepper, days between 1 and 365

5. **Location/Timezone Meta** — 20pt (conditional)
   - Purpose: Context for scheduling a reach-out at a reasonable hour
   - Content: Pin icon + location, clock icon + timezone offset

6. **Ask SIA Shortcut Card** — 56pt
   - Purpose: Navigate to SIA for relationship coaching on this specific person
   - Content: Chat bubble icon + "ask SIA about [name]" + chevron

7. **Interaction Log** — Variable
   - Purpose: Full history of logged interactions with this person
   - Content: Type icon + description + date + source badge per row

8. **Log Interaction Button** — 44pt
   - Purpose: Add a new interaction entry
   - Content: Plus icon + "log interaction"

9. **Notes Timeline** — Variable
   - Purpose: Freeform notes about the relationship over time
   - Content: Timestamped note entries

10. **Archive Link** — 44pt
    - Purpose: Remove person from active roster without deleting history
    - Content: "archive this person" in red

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "People" center (17pt Cabinet Grotesk SemiBold, white).
- **Size**: Full-width x 44pt

### Reach-Out Priority Banner
- **Purpose**: Rank the people the user should contact soonest, computed by a real deterministic formula — never AI-generated, never a guess. `next_due = last_interaction_at + cadence_days`; ranking key is `overdue_days` descending, tie-broken by `next_due` ascending.
- **Data source**: API — `GET /api/relationships/reach-out-priority` (server-computed, cursor-limited to top 5)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Orange (#FF5E00) left border accent (3pt) — the same "attention" semantic used for AI Reminder Card on Screen 33, deliberately *not* pink or purple, because this is a system warning, not a domain identity moment or an AI voice.
- **Content**:
  - Warning icon: 20pt, orange, top-left
  - Title: "reach out" — 16pt Cabinet Grotesk SemiBold, white, 8pt right of icon
  - Provenance caption: "cadence-based · not AI" — 11pt Switzer Regular, white at 40%, immediately below title. This caption is load-bearing: it is the screen's explicit disclosure that the ranking is arithmetic, not inference.
  - Ranked rows (up to 3 visible, "see all overdue" link if more): avatar (32pt) + name (15pt Cabinet Grotesk SemiBold, white) + status pill ("overdue 5d" in red, "due today" in orange, "due in 2d" in orange at 70%)
  - Quick actions per row: three compact icon buttons — call (phone icon), text (message icon), log (checkmark icon, opens Log Interaction sheet pre-filled with this person) — 32pt touch targets, 8pt gap, right-aligned
- **Variants**: Standard (1-3 people overdue/due), Empty (hidden entirely if nobody is due within 7 days — see Empty States), Single (1 person, compact)
- **Gestures**: Tap row opens Contact Detail Sheet. Tap "call"/"text" opens native intent. Tap "log" opens Log Interaction Sheet pre-filled.
- **Size**: Full-width minus 32pt x ~72pt per row (variable total height)

### Search Bar
- **Purpose**: Find a specific person by name, server-side and debounced
- **Data source**: API — `GET /api/relationships/people?q={query}` (debounced 300ms client-side, cancellable via AbortController on new keystroke)
- **Visual treatment**: Identical to established Search Bar pattern (Screen 25). Full-width minus 32pt, 44pt tall, ink-brown-800 bg, --r-md (14pt).
- **Content**: Search icon (16pt, white at 40%) + placeholder "search people" (15pt Switzer Regular, white at 40%)
- **Gestures**: Type to filter roster grid in place (results replace grid below), tap "x" to clear
- **Size**: Full-width minus 32pt x 44pt

### Filter Chip Row
- **Purpose**: Filter the roster by relationship type
- **Data source**: View state (local), applied as a query param against the roster endpoint
- **Visual treatment**: Identical to Filter Chip / Filter Tab Row pattern (Screen 13). Horizontal scroll, 16pt leading margin.
- **Content**: "all" / "friend" / "family" / "colleague" / "mentor" / "partner" / "other" chips
- **Variants**: One active at a time, "all" is default
- **Gestures**: Tap chip to filter grid
- **Size**: Full-width x 36pt

### Relationship Health Summary Card
- **Purpose**: A deterministic, plain-language narrative summarizing how well the user is keeping up with their whole roster — explicitly NOT LLM-generated. Computed from three inputs: cadence adherence rate (% of contacts currently on-track), recency (days since last interaction, aggregated), and engagement trend (interaction count this month vs. prior month).
- **Data source**: API — `GET /api/relationships/health-summary` (deterministic scoring service — `relationshipHealthService.computeSummary()`, template-based narrative assembled from the three computed inputs, no LLM call in the request path)
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. **No purple accent, no SIA avatar, no "ask SIA" framing anywhere on this card** — this is the screen's clearest honesty signal. Uses a neutral heart/pulse outline icon (white at 60%) instead of the purple dot used by SIA Coaching Note Cards elsewhere in the app, so the two are never visually confused.
- **Content**:
  - Icon: heart/pulse outline, 16pt, white at 60%, top-left
  - Eyebrow: "relationship health" — 12pt Cabinet Grotesk SemiBold, white at 40%, uppercase, +0.12em tracking, 8pt right of icon
  - Narrative: template-filled sentence, e.g. "you're staying close with most people, but haven't connected with Ahmed in a while" — 15pt Switzer Regular, white at 90%, max 2 lines, 8pt below eyebrow row
  - Stat line: "86% on-cadence this month" — 13pt Cabinet Grotesk Bold (numeric), white at 60%, 8pt below narrative. Number in Cabinet Grotesk Bold per data/numeric typography rule; surrounding words in Switzer Regular.
  - "see weekly view" link (optional, right-aligned): 13pt Switzer Medium, orange, links to Relationships Dashboard [33]
- **Variants**: Positive (adherence ≥ 80%, green stat number), Neutral (60-79%, white stat number), Needs attention (< 60%, orange stat number — still never red; this is a nudge, not a failure state)
- **Honesty rule**: if fewer than 3 contacts exist, or fewer than 2 logged interactions exist in the trailing 30 days, the card shows an honest-null state instead of a fabricated percentage: "not enough history yet to compute your relationship health — log a few interactions and check back."
- **Gestures**: Tap "see weekly view" navigates to Screen 33. Card body is non-interactive (informational only).
- **Size**: Full-width minus 32pt x ~120pt

### Roster Grid / Contact Card
- **Purpose**: Every person in the user's roster, browsable as a scannable grid
- **Data source**: API — `GET /api/relationships/people?type={filter}&cursor={cursor}&limit=20` (keyset pagination, infinite scroll appends pages)
- **Visual treatment**: 2-column grid, 16pt horizontal margins, 12pt gap between columns and rows. Each card: ink-brown-800 glassmorphism, --r-md (14pt) — smaller radius than the --r-xl standard because these are compact grid cells under ~150pt tall, consistent with the Stat Tile radius rule.
- **Content per card** (~148pt tall):
  - Avatar (top, centered): 48pt circle. Photo if available, else initials on pink (#EC4899) at 15% background with pink text — matches the established Person Row fallback treatment.
  - Name (below avatar, centered): 15pt Cabinet Grotesk SemiBold, white, single line, truncated with ellipsis
  - Relationship type badge (below name, centered): pill, 20pt height, --r-pill, pink (#EC4899) at 15% bg, pink text, 11pt Cabinet Grotesk SemiBold — domain-identification color per the domain-tag-chip convention (all relationship types share the same pink badge, differentiated by label text only, not by color, to keep the domain color singular and legible)
  - Cadence status (bottom, centered): colored dot (6pt) + text, 12pt Switzer Regular
    - On track: green (#34A853) dot + "● 2d ago"
    - Due soon (0-2 days until due): orange (#FF5E00) dot + "due today" / "due in 2d"
    - Overdue: red (#F44336) dot + "⚠ overdue 5d", text weight bumps to Switzer Medium for emphasis
  - Calendar-sync indicator (top-right corner, conditional, 8pt from edge): tiny calendar glyph (10pt, cyan at 60%) if the most recent interaction was calendar-auto-logged
- **Variants**: Photo avatar, Initials avatar, On-track (green), Due-soon (orange), Overdue (red), Archived (hidden from default grid, visible only under an "archived" filter chip at 50% opacity)
- **Gestures**: Tap opens Contact Detail Sheet. Long-press opens Quick Actions Menu (log interaction, edit cadence, archive).
- **Size**: (Full-width minus 32pt minus 12pt gap) / 2 x ~148pt per card

### Add Person Button (FAB)
- **Purpose**: Add a new person to the roster
- **Visual treatment**: Extended Pill FAB pattern (established Screen 13/35). Orange (#FF5E00) fill, --shadow-2.
- **Content**: Plus icon (16pt, white) + "add person" (15pt Cabinet Grotesk SemiBold, white), 8pt gap
- **Gestures**: Tap opens Add Person Modal
- **Size**: Auto-width (~150pt) x 48pt

### Cadence Status Line (Contact Detail)
- **Purpose**: State the contact's current cadence standing in plain language at the top of the detail sheet
- **Data source**: Computed client-side from `last_interaction_at` + `cadence_days` returned with the contact record
- **Visual treatment**: Centered row below the identity block. Status icon (16pt) + text (14pt Switzer Medium)
- **Content**: "⚠ overdue 5 days · every 14 days" (red icon+text) / "due today · every 14 days" (orange) / "on track · last contacted 2 days ago · every 14 days" (green)
- **Size**: Full-width x 24pt

### Cadence Editor
- **Purpose**: Configure how many days between check-ins the user wants for this specific person
- **Data source**: API — `PATCH /api/relationships/people/:id` `{ cadence_days }`
- **Visual treatment**: ink-brown-800 card, --r-md, 16pt padding, centered content
- **Content**: "cadence: every [N] days" label (14pt Switzer Regular, white at 70%) + stepper control (− / value / +), value in 16pt Cabinet Grotesk Bold, white. Step size 1, min 1, max 365. Common presets available as tap targets below the stepper: "weekly" (7), "biweekly" (14), "monthly" (30), "quarterly" (90).
- **Gestures**: Tap +/− to adjust by 1, tap a preset chip to jump directly, saves on change (debounced 500ms) via PATCH
- **Size**: Full-width minus 32pt x 56pt

### Location/Timezone Meta
- **Purpose**: Give the user context for when a reach-out would land at a reasonable local hour for the other person
- **Data source**: Contact record fields `location`, `timezone_offset` (both optional, user-entered)
- **Visual treatment**: Single row, centered, 20pt tall
- **Content**: Pin icon (12pt, white at 40%) + location text (13pt Switzer Regular, white at 50%) + separator dot + clock icon (12pt, white at 40%) + timezone label (13pt Switzer Regular, white at 50%), e.g. "📍 Karachi · 🕐 PKT (+5h)"
- **Visibility**: Hidden entirely if neither field is set (no placeholder row)
- **Size**: Full-width x 20pt

### Ask SIA Shortcut Card
- **Purpose**: Navigate to SIA Chat with this specific contact's context pre-loaded, for relationship coaching that goes beyond what the deterministic cadence system can offer
- **Visual treatment**: Reuses the established Ask SIA Shortcut Card pattern (Screen 14/25) exactly — orange chat bubble icon, not purple, because this is a navigation shortcut, not an AI-generated insight rendered in place.
- **Content**: Chat bubble icon (20pt, orange) + "ask SIA about [name]" (15pt Cabinet Grotesk SemiBold, white) + chevron (14pt, white at 40%)
- **Gestures**: Tap switches to SIA Chat [09] with the contact's ID and recent interaction summary pre-loaded as context
- **Size**: Full-width minus 32pt x 56pt

### Interaction Log Entry
- **Purpose**: A single logged interaction with this person — the source of truth behind the cadence math
- **Data source**: API — `GET /api/relationships/people/:id/interactions?cursor={cursor}&limit=20`
- **Visual treatment**: Rows within an ink-brown-800 card, 20pt radius on the outer card, rows separated by 1pt white at 5%.
- **Content per row** (~56pt tall):
  - Type icon (left, 20pt within 32pt circle, pink at 15% bg): 📞 call, 💬 text, ☕ meetup, ✉ email, 📱 social, ⋯ other
  - Description + date (14pt Cabinet Grotesk SemiBold, white): "Called · May 6" — auto-generated from type + date if no custom description given, otherwise shows the user's custom text
  - Source badge (below description, 4pt gap): pill, 20pt height, --r-pill, 11pt Switzer Regular
    - "manual": white at 10% bg, white at 50% text
    - "voice": purple (#7F24FF) at 12% bg, purple text at 70% — the one legitimate purple touch on this screen, because voice-logged entries genuinely did pass through SIA's voice transcription pipeline; this is honest, not decorative
    - "calendar-auto-logged": cyan (#06B6D4) at 12% bg, cyan text, calendar glyph (10pt) prefix — this is the Calendar Auto-Log Indicator
    - "whatsapp": green (#25D366, WhatsApp brand green, approved exception for this single badge context) at 12% bg, matching text
- **Variants**: Manual, Voice, Calendar-auto-logged, WhatsApp — each distinguished only by source badge color/icon, row layout identical
- **Gestures**: Tap opens interaction detail (lightweight bottom sheet), long-press reveals edit/delete
- **Size**: Full-width minus 32pt x 56pt per entry

### Calendar Auto-Log Indicator
- **Purpose**: Make it visually unmistakable when an interaction was auto-detected from a synced calendar event rather than entered by the user — a transparency requirement, since auto-logged data can be wrong (e.g., a cancelled meeting that still shows as "calendar-auto-logged")
- **Data source**: Interaction record field `source = 'calendar_auto'`, `source_event_id` (links back to the originating calendar event for verification)
- **Visual treatment**: Small calendar glyph (10-12pt), cyan (#06B6D4) at 70-100% opacity, always paired with the "calendar-auto-logged" source badge text — never shown as a bare icon without the label, to avoid ambiguity
- **Content**: Appears in two places — (1) inline on the Interaction Log Entry as described above, (2) as a tiny corner badge on Roster Grid cards when the contact's most recent interaction was calendar-sourced
- **Gestures**: Tap the calendar glyph (on the log entry) opens a confirmation sheet: "this was auto-logged from your calendar — was it accurate?" with "confirm" / "this didn't happen" actions, letting the user correct false positives
- **Size**: 10-12pt icon, inline

### Log Interaction Bottom Sheet
- **Purpose**: Record a new interaction with a person, manually
- **Data source**: User input → `POST /api/relationships/people/:id/interactions`
- **Visual treatment**: Bottom sheet, ~55% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "save")
  - Person indicator (if opened from a specific contact): avatar + name, non-editable
  - Person selector (if opened from the Reach-Out banner's "log" quick action without a pre-selected person): horizontal scroll of avatar chips
  - Type selector: 6 pill buttons — "call" / "text" / "meetup" / "email" / "social" / "other"
  - Date picker: defaults to today, tappable to change
  - Description input (optional): Text Input Field (52pt). Placeholder: "what happened? (optional)"
  - "save" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to log (source is automatically set to "manual" for this entry point)
- **Size**: Full-width x ~55% screen height

### Add Person Modal (Bottom Sheet)
- **Purpose**: Add a new person to the roster
- **Data source**: User input → `POST /api/relationships/people`
- **Visual treatment**: Bottom sheet, ~70% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "add")
  - Name input: Text Input Field (52pt). Placeholder: "name"
  - Relationship type selector: 6 pill buttons — "friend" / "family" / "colleague" / "mentor" / "partner" / "other". Default: friend.
  - Cadence-days stepper: same control as Cadence Editor, default 14 days, with weekly/biweekly/monthly/quarterly presets
  - Photo (optional): camera/gallery picker, circular preview
  - Location (optional): Text Input Field (52pt). Placeholder: "location (optional)"
  - Timezone (optional): Dropdown of common timezones, or auto-suggested from location if entered
  - "add" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap add to save
- **Size**: Full-width x ~70% screen height

### Notes Timeline
- **Purpose**: Freeform notes about the relationship, timestamped, distinct from structured interaction logs
- **Data source**: API — `GET /api/relationships/people/:id/notes`
- **Visual treatment**: Rows within an ink-brown-800 card, 20pt radius, rows separated by 1pt white at 5%
- **Content per row**: Note text (14pt Switzer Regular, white at 80%, in quotes) + date (12pt Switzer Regular, white at 40%, e.g. "— May 6")
- **Gestures**: Tap "+ add note" opens a lightweight text input sheet. Long-press a note reveals edit/delete.
- **Size**: Full-width minus 32pt x variable

### Archive Action
- **Purpose**: Remove a person from the active roster without deleting their interaction history — a soft delete, chosen deliberately so relationship health calculations and past logs remain intact for reference
- **Visual treatment**: Centered text link, 14pt Switzer Regular, #F44336, 44pt touch target, at the bottom of the Contact Detail Sheet
- **Content**: "archive this person"
- **Gestures**: Tap triggers a confirmation dialog ("archive Ahmed? you can restore them later from the archived filter.") before executing `PATCH /api/relationships/people/:id { archived: true }`
- **Caution**: Destructive-adjacent action, requires confirmation, never a bare single-tap delete

### Overflow Menu (Contact Detail "⋯ more")
- **Purpose**: Secondary actions that don't warrant a permanent slot in the sheet body
- **Visual treatment**: Reuses the Quick Actions Menu pattern (Screen 13/38) — floating card, ink-brown-800 bg, --r-lg (20pt), backdrop-blur(12px), anchored below the "⋯ more" trigger
- **Content**: "edit details" (name/photo/location/timezone), "export interaction history" (CSV via email), "merge with duplicate contact", "archive this person" (mirrors the bottom link, offered here too since overflow menus are the expected location for destructive actions)
- **Gestures**: Tap trigger opens menu (medium impact), tap outside dismisses, tap a row executes its action
- **Size**: Auto-width (~220pt), 48pt per row

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen header title | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | "People" |
| Section eyebrow | Cabinet Grotesk | 600 (SemiBold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Reach-out banner title | Cabinet Grotesk | 600 (SemiBold) | 16pt | 22pt | White #FFFFFF | "reach out" |
| Provenance caption | Switzer | 400 (Regular) | 11pt | 14pt | White at 40% | "cadence-based · not AI" |
| Contact name (banner/grid) | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | Single line, truncated |
| Contact name (detail sheet) | Cabinet Grotesk | 700 (Bold) | 20pt | 26pt | White #FFFFFF | Identity block hero |
| Cadence status pill | Switzer | 500 (Medium) | 12pt | 16pt | Per-status color | "overdue 5d", "due today" |
| Relationship type badge | Cabinet Grotesk | 600 (SemiBold) | 11pt | 14pt | Pink #EC4899 | Inside pill badge |
| Health summary narrative | Switzer | 400 (Regular) | 15pt | 22pt | White at 90% | Deterministic template text |
| Health summary stat number | Cabinet Grotesk | 700 (Bold) | 13pt | 18pt | Per-adherence color | "86%" — numeric per data rule |
| Health summary stat label | Switzer | 400 (Regular) | 13pt | 18pt | White at 60% | "on-cadence this month" |
| Cadence editor value | Cabinet Grotesk | 700 (Bold) | 16pt | 20pt | White #FFFFFF | Numeric stepper value |
| Cadence editor label | Switzer | 400 (Regular) | 14pt | 20pt | White at 70% | "cadence: every [N] days" |
| Interaction description | Cabinet Grotesk | 600 (SemiBold) | 14pt | 20pt | White #FFFFFF | "Called · May 6" |
| Source badge text | Switzer | 400 (Regular) | 11pt | 14pt | Per-source color | "manual", "voice", etc. |
| Notes text | Switzer | 400 (Regular) | 14pt | 20pt | White at 80% | In quotes |
| Notes date | Switzer | 400 (Regular) | 12pt | 16pt | White at 40% | "— May 6" |
| Location/timezone meta | Switzer | 400 (Regular) | 13pt | 18pt | White at 50% | Pin/clock rows |
| Ask SIA shortcut label | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | White #FFFFFF | "ask SIA about [name]" |
| Add button text | Cabinet Grotesk | 600 (SemiBold) | 15pt | 20pt | Orange #FF5E00 | "add person", "log interaction" |
| CTA link text | Switzer | 500 (Medium) | 13pt | 18pt | Orange #FF5E00 | "see weekly view" |
| Archive link | Switzer | 400 (Regular) | 14pt | 20pt | #F44336 | "archive this person" |
| Modal heading | Cabinet Grotesk | 600 (SemiBold) | 17pt | 22pt | White #FFFFFF | Modal titles |
| Input placeholder | Switzer | 400 (Regular) | 16pt | 22pt | White at 40% | All input fields |
| Search placeholder | Switzer | 400 (Regular) | 15pt | 20pt | White at 40% | "search people" |

---

## Composition & Visual Hierarchy

**Squint test**:
- The Reach-Out Priority Banner's orange border is the single strongest visual anchor at the top — it should read as "here's what needs attention" before anything else registers
- The provenance caption ("cadence-based · not AI") is intentionally quiet (11pt, 40% opacity) — it's a disclosure, not a headline, but it must be legible on a squint-close-look, not buried
- The Relationship Health Summary Card sits deliberately unremarkable next to the banner — no purple glow, no AI iconography — so the eye doesn't mistake it for a coaching moment
- The Roster Grid's pink type badges create a consistent color rhythm across the whole grid, while the cadence status dots (green/orange/red) are the only variable color signal — this is the fastest scan path for "who needs attention" at a glance
- The FAB stays a stable, resting anchor bottom-right — never competing with the banner for primary attention

**Spacing breakdown (8pt grid)**:
- Screen header height: 44pt
- Header to reach-out banner: 16pt (--s-4)
- Banner to search bar: 20pt
- Search bar to filter row: 12pt (--s-3)
- Filter row to health summary: 20pt
- Health summary to roster eyebrow: 24pt (--s-5)
- Eyebrow to grid: 12pt (--s-3)
- Grid row gap: 12pt
- Grid column gap: 12pt
- Card internal padding: 16pt (grid cards), 24pt (banner, health summary — standard card padding)
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Roster grid cards, health summary card
- z-20: Reach-Out Priority Banner (above grid content)
- z-30: Screen header (backdrop-blur on scroll), search bar (sticky if scrolled)
- z-40: FAB, Tab bar
- z-50: Bottom sheets (Contact Detail, Add Person, Log Interaction)
- z-60: Confirmation dialogs (archive, calendar-auto-log correction)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| FAB background | #FF5E00 | orange (primary) | Add person CTA |
| Reach-out banner border | #FF5E00 | orange (primary) | Left accent, 3pt — system warning, not domain identity |
| Warning icon (banner) | #FF5E00 | orange (primary) | Attention signal |
| Overdue cadence status | #F44336 | error | Red dot + text, most urgent |
| Due-soon cadence status | #FF5E00 | orange (primary) | Orange dot + text |
| On-track cadence status | #34A853 | green (secondary) | Green dot + text |
| Health summary — needs attention | #FF5E00 | orange (primary) | Stat number, < 60% adherence |
| Health summary — neutral | #FFFFFF | white | Stat number, 60-79% adherence |
| Health summary — positive | #34A853 | green (secondary) | Stat number, ≥ 80% adherence |
| CTA/action links | #FF5E00 | orange (primary) | "see weekly view", "add person" |
| Ask SIA shortcut icon | #FF5E00 | orange (primary) | Navigation shortcut, not AI content |
| Voice source badge | #7F24FF | purple (SIA) | Sole legitimate purple use — voice entries genuinely passed through SIA transcription |
| Calendar-auto-logged badge | #06B6D4 | learning-cyan | Reused as neutral "system-detected" signal |
| WhatsApp source badge | #25D366 | WhatsApp green (approved exception) | Source identification only |
| Relationship type badge | #EC4899 at 15% bg | relationships-pink | Domain identification — never on actions |
| Avatar fallback background | #EC4899 at 15% | relationships-pink | Domain identification |
| Archive link | #F44336 | error | Destructive action |
| Confirmation dialog border | #F44336 at 30% | error | Archive confirmation |
| Primary text | #FFFFFF | white | Names, titles |
| Secondary text | white at 70% | -- | Narrative, descriptions |
| Tertiary text | white at 50% | -- | Location, meta, source labels |
| Quaternary text | white at 40% | -- | Eyebrows, provenance caption, placeholders |

**60/30/10 verification**: Orange dominates on the FAB, the reach-out banner's warning border/icon, due-soon status, CTA links, and the Ask SIA shortcut's navigation icon — clearly the primary visual driver. Green appears on on-track cadence status and positive health-summary stats — the "things are fine" signal. **Purple (#7F24FF) is deliberately near-absent from this screen** — its only legitimate appearance is the "voice" source badge on an interaction log entry, because that entry genuinely passed through SIA's voice pipeline. Neither the Reach-Out Priority Banner nor the Relationship Health Summary Card carries any purple, SIA avatar, or coaching-voice framing, because both are computed by a deterministic formula, not SIA — withholding the purple accent here is the design's honesty mechanism. Pink (relationships-pink) is confined strictly to domain identification: the relationship type badge and avatar fallback background, never on a CTA, link, or action. Red is confined to overdue status and destructive actions. Ratio holds with orange as the clear visual driver.

---

## Interaction States

### Reach-Out Priority Banner Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row, status pill colored per urgency | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Quick action pressed (call/text/log) | Icon bg lightens, scale(0.95) | light impact |
| Loading | Skeleton shimmer for avatar and status pill | -- |

### Roster Grid Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card, cadence dot per status | -- |
| Pressed | Card bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Long-press | Quick Actions Menu appears (log/edit cadence/archive) | medium impact |
| Loading | Skeleton shimmer for avatar, name, badge, status | -- |
| Archived (filtered view) | 50% opacity, "archived" label overlay | -- |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 10% border, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange bg, white text | medium impact |

### Cadence Editor Stepper
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, white value text | -- |
| Pressed (+/-) | Button bg lightens, value updates | light impact |
| At min (1) | "−" button 40% opacity, disabled | -- |
| At max (365) | "+" button 40% opacity, disabled | -- |
| Saved | Brief green glow (600ms) on the value | success notification |

### Interaction Log Entry
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row, source badge colored per type | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Long-press | Edit/delete actions reveal | medium impact |
| Calendar-auto glyph tapped | Confirmation sheet slides up | light impact |

### Add Person / Log Interaction Buttons
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill/text per variant | -- |
| Pressed | Darker orange (#E55400), scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled (no name entered) | 40% opacity | -- |
| Loading | Spinner replaces text | -- |
| Success | Green glow (600ms) then dismiss | success notification |

### Archive Link
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Red text | -- |
| Pressed | Red at 70%, scale(0.97) | light impact |
| Confirmed | Card fades out of roster grid (280ms) | success notification |

### Search Bar
| State | Visual | Haptic |
|-------|--------|--------|
| Default (empty) | ink-brown-800 bg, placeholder text | -- |
| Focused | 2pt orange border, cursor active | -- |
| Typing | Debounced (300ms) filter fires, in-flight request cancelled on new keystroke | -- |
| Results found | Grid crossfades to filtered set | -- |
| No results | Empty state text renders below search bar | -- |
| Cleared | "x" tap resets grid to full roster | light impact |

### Ask SIA Shortcut Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, orange chat icon | -- |
| Pressed | Bg lightens white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Notes Timeline Entry
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row, quoted text | -- |
| Pressed | Row bg white at 5% | light impact |
| Long-press | Edit/delete actions reveal | medium impact |
| Deleted | Row collapses height, adjacent rows slide up | 280ms |

---

## Gesture Map

| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload reach-out priority, roster, health summary) |
| Tap | Reach-out banner row | Open Contact Detail Sheet |
| Tap | Quick action (call/text/log) | Native intent or Log Interaction Sheet |
| Type | Search bar | Debounced filter (300ms, cancellable) |
| Tap | Filter chip | Filter roster by relationship type |
| Tap | "see weekly view" | Navigate to Relationships Dashboard [33] |
| Tap | Roster grid card | Open Contact Detail Sheet |
| Long-press | Roster grid card | Quick Actions Menu (log/edit cadence/archive) |
| Tap | Add person FAB | Open Add Person Modal |
| Tap | Cadence editor +/- | Adjust cadence days by 1, saves debounced |
| Tap | Cadence preset chip | Jump cadence to preset value |
| Tap | "ask SIA about [name]" | Tab switch to SIA Chat with contact context |
| Tap | "+ log interaction" | Open Log Interaction Bottom Sheet |
| Tap | Calendar-auto glyph | Open confirmation sheet (accurate / didn't happen) |
| Tap | "+ add note" | Open note input sheet |
| Long-press | Interaction row / note | Edit/delete actions |
| Tap | "archive this person" | Confirmation dialog → archive |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Drag down | Any bottom sheet handle | Dismiss |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: reach-out banner (0ms), search+filter (80ms), health summary (160ms), first grid row (240ms) | 280ms each | ease-out-soft |
| Reach-out banner rows | Mount | Staggered fade-in, 60ms per row | 280ms each | ease-out-soft |
| Roster grid cards | Enter viewport | Staggered fade-in, 60ms per row of the grid | 280ms each | ease-out-soft |
| Filter chip | Tap | Active chip crossfade | 160ms | ease-out-soft |
| Grid refilter | Filter/search change | Old cards fade-out (160ms) → new cards fade-in staggered (280ms) | 160-280ms | ease-out-soft |
| Cadence stepper | Tap +/- | Value crossfades to new number, scale(1.1→1) pulse | 160ms | ease-out-soft |
| Cadence saved | Debounce fires | Brief green glow on value | 600ms | ease-flow |
| Health summary stat | Data load | Percentage count-up from 0 to final value | 520ms | ease-flow |
| Contact card | Archive confirmed | Card fades out + grid reflows | 280ms | ease-out-soft |
| Interaction added | Log confirmed | New row slides in from top of log list | 280ms | ease-out-soft |
| Bottom sheets | Open | Sheet slides up from bottom + backdrop fades in | 520ms | ease-flow |
| Bottom sheets | Dismiss | Sheet slides down + backdrop fades out | 280ms | ease-out-soft |
| FAB | Mount | scale(0.8→1) + opacity(0→1), 400ms delay | 280ms | ease-out-soft |
| FAB | Scroll down | Fades out (opacity 0, translateY +20pt) | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push from Explore or Relationships Dashboard
- **Exit**: Stack pop

---

## Empty States

### Day 1 (no contacts at all)
- Reach-Out Priority Banner: Hidden entirely (nothing to rank yet).
- Search bar and filter row: Hidden (nothing to search or filter yet).
- Relationship Health Summary Card: Replaced with an onboarding-style card: "add a few people to start tracking your relationships. Balencia will remind you when it's time to reach out." No fabricated percentage shown.
- Roster grid: Replaced with a centered empty state. Icon: outlined people group (48pt, white at 15%). Title: "no one here yet" — 17pt Cabinet Grotesk SemiBold, white. Body: "add the people who matter — friends, family, mentors — and set how often you'd like to check in." — 14pt Switzer Regular, white at 50%, max 2 lines.
- Add Person FAB: Extra prominent, pulsing orange glow on first visit (same pattern as Screen 40).

### Established user — nobody due for reach-out
- Reach-Out Priority Banner: Hidden entirely if no one is overdue or due within 7 days (not shown empty — this is a genuinely good state, not a gap to fill).
- Relationship Health Summary Card still renders normally with the current adherence stat, since roster data exists.

### Filtered — no matches for relationship type
- Roster grid shows centered text: "no [type] added yet" with a tappable "add person" suggestion pre-filled with that type.

### Search — no results
- Roster grid shows centered text: "no one matches '[query]'" — 15pt Switzer Regular, white at 50%.

### Contact Detail — no interactions logged yet
- Interaction Log section shows: "no interactions logged yet. log your first one below." with the "+ log interaction" button emphasized.

### Contact Detail — no notes yet
- Notes section shows: "no notes yet." with "+ add note" link below.

---

## Motivation Adaptation

- **Low motivation**: Reach-Out Priority Banner collapses to a single most-overdue row instead of up to 3, with softer copy: "whenever you're ready, Ahmed would probably love to hear from you." Relationship Health Summary Card is hidden entirely to reduce pressure. Roster grid shows only the 6 most-recently-interacted-with contacts by default, with a "see everyone" link to expand.
- **Medium motivation**: Standard experience as described. All sections visible with moderate density.
- **High motivation**: Reach-Out Priority Banner expands to show up to 5 ranked people. Relationship Health Summary Card includes an additional trend line: "up from 74% last month." Roster grid gains a secondary sort option ("most overdue first"). Interaction Log on Contact Detail shows a mini frequency sparkline (interactions per month, last 6 months) above the log list.

---

## Cross-References

- **Navigates to**: Contact Detail Sheet (modal, from banner row or grid card), Add Person Modal (modal, from FAB), Log Interaction Bottom Sheet (modal, from banner quick action or Contact Detail), Relationships Dashboard [33] (via "see weekly view" link), SIA Chat [09] (via "ask SIA about [name]" shortcut, tab switch)
- **Navigates from**: Screen [18] — Explore Section (stack push via "People" card), Screen [33] — Relationships Dashboard (stack push via "manage all people" link), Screen [12] — Home Screen (via reach-out reminder card), Screen [09] — SIA Chat (deep-link)
- **Shared components with**: Screen [33] — Relationships Dashboard (Person Row lineage, avatar fallback treatment, pink domain accent, Add Person / Log Quality Time bottom sheet patterns), Screen [46] — Accountability (Master-Consent-Banner-style attention card layout reused for the Reach-Out Priority Banner, Contact Row swipe/quick-action conventions), Screen [14] / [25] — Ask SIA Shortcut Card, Screen [13] / [38] — Filter Chip Row, Search Bar (Screen 25/29/40), Quick Actions Menu (Screen 13/38)
- **Patterns used**: Back Button, 8-State Model, Filter Chip / Filter Tab Row (Screen 13), Search Bar (Screen 25), FAB (Screen 13/35), Modal Presentation (Batch 1), Text Input Field (Batch 1), Brand CTA Button (Batch 1), Section Eyebrow Label (Screen 12), Person Row lineage (Screen 33), Ask SIA Shortcut Card (Screen 14/25), Quick Actions Menu (Screen 13)
- **Patterns established**: Reach-Out Priority Banner (deterministic ranked contact list with provenance caption and inline quick actions), Relationship Health Summary Card (deterministic narrative card explicitly withholding the SIA/purple accent), Roster Grid / Contact Card (2-column grid variant of Person Row with cadence-status dot coding), Cadence Status Line + Cadence Editor (stepper with weekly/biweekly/monthly/quarterly presets), Interaction Log Entry (type icon + source badge: manual/voice/calendar-auto-logged/WhatsApp), Calendar Auto-Log Indicator (transparency glyph with correction affordance), Log Interaction Bottom Sheet, Notes Timeline (distinct from structured interaction log), Archive Action (soft-delete confirmation pattern)
