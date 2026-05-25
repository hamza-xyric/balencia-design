# Screen Design: Voice Call History & Scheduling

**Screen**: 51 of 73
**File**: 51-voice-call-history.md
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: View past voice calls with AI coach, schedule future calls
**Tab**: SIA tab or Me tab > SIA section
**Navigation**: Stack depth 1 from SIA tab root or Me Main [17]. Pushed from SIA Chat [09] via call history link, or from Me Main quick link grid. Back button returns to originating screen.

---

## Purpose

The Voice Call History & Scheduling screen is the user's personal record of every voice coaching session with SIA, plus a scheduling interface for future calls. It bridges the ephemeral nature of voice conversations with persistent, reviewable insights by surfacing AI-generated summaries, emotional trends, and actionable follow-ups from each call. The scheduling section encourages regular voice check-ins by making it easy to book recurring sessions. This screen transforms voice coaching from a one-off interaction into a visible, trackable coaching relationship. Seeing a history of calls with summaries and action items reinforces SIA's value and justifies the premium subscription. Free tier provides read-only access to past call summaries; scheduling calls and action item management require Plus, and extended analytics require Pro.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Schedule Call CTA — prominent, brand-orange pill at top, drives booking behavior
2. Upcoming calls section — next scheduled call with date/time, session type, edit/cancel options
3. Call history list — reverse chronological cards, each showing date, duration, session type, emotion trend, summary snippet
4. SIA avatar indicators — small purple markers on each card reinforcing AI presence
5. Tab switcher (History / Action Items) — toggle between call log and aggregated action items view

**User flow**:
- **Arrives from**: SIA Chat [09] via call history link or voice mode CTA (stack push), Me Main [17] via quick link grid (stack push), SIA Voice Full-Screen [11] via "view history" post-call CTA (stack push)
- **Primary exit**: Call Detail (stack push) — tap any call card to view full summary, insights, action items, and emotional trend
- **Secondary exits**: SIA Chat [09] via tab switch, Schedule Call modal (modal present), originating screen via back button (stack pop)

---

## Layout

**Scroll behavior**: SectionList with sticky section headers (Upcoming Calls section at top, then Call History grouped by date). Action Items tab uses a FlatList with filter chips.
**Tab bar visible**: Yes

### ASCII Wireframe — History Tab (Default)

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [<]  Voice Sessions   [+]  │  <- nav header, 48pt
├─────────────────────────────┤
│  [ history ][ action items ] │  <- tab switcher, 40pt
├─────────────────────────────┤
│                              │
│  UPCOMING                    │  <- section eyebrow
│                              │
│  ┌─────────────────────────┐ │
│  │ [S] Thu, May 22 - 3pm   │ │  <- upcoming call card
│  │     Weekly check-in      │ │     session type
│  │     [edit]  [cancel]     │ │     action links
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ schedule a call         │ │  <- brand-orange pill CTA
│  └─────────────────────────┘ │
│                              │
│  TODAY                       │  <- sticky date header
│                              │
│  ┌─────────────────────────┐ │
│  │ [S] 10:32 AM  -  18min  │ │  <- call card
│  │     Morning check-in     │ │     session type
│  │     :) "Feeling energized │ │     emotion + snippet
│  │     after yesterday's..." │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [S] 8:15 AM  -  7min    │ │
│  │     Quick question        │ │
│  │     :| "Asked about meal  │ │
│  │     timing for..."        │ │
│  └─────────────────────────┘ │
│                              │
│  YESTERDAY                   │  <- sticky date header
│                              │
│  ┌─────────────────────────┐ │
│  │ [S] 6:45 PM  -  24min   │ │
│  │     Evening reflection    │ │
│  │     :) "Great progress on │ │
│  │     fitness goals..."     │ │
│  └─────────────────────────┘ │
│                              │
│  THIS WEEK                   │
│  ┌─────────────────────────┐ │
│  │ [S] Mon  -  12min        │ │
│  │     Goal review           │ │
│  │     :| "Reviewed career   │ │
│  │     milestones and..."    │ │
│  └─────────────────────────┘ │
│                              │
│         (end of list)        │
│                              │  <- 64pt bottom padding
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### ASCII Wireframe — Action Items Tab

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [<]  Voice Sessions   [+]  │  <- nav header, 48pt
├─────────────────────────────┤
│  [ history ][ action items ] │  <- tab switcher, 40pt
├─────────────────────────────┤
│  [all] [pending] [completed] │  <- filter chips, 40pt
├─────────────────────────────┤
│                              │
│  ┌─────────────────────────┐ │
│  │ [ ] Meditate for 10min   │ │  <- pending action item
│  │     from: Morning check-in│ │     source call reference
│  │     due: May 23  |  high │ │     due date + priority
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [ ] Review weekly budget  │ │
│  │     from: Evening reflect.│ │
│  │     due: May 24  |  med  │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [x] 30-min morning walk   │ │  <- completed action item
│  │     from: Goal review     │ │
│  │     completed May 20      │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [x] Log meals for 3 days  │ │
│  │     from: Quick question  │ │
│  │     completed May 19      │ │
│  └─────────────────────────┘ │
│                              │
│         (end of list)        │
│                              │
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### ASCII Wireframe — Call Detail (Stack Push)

```
┌─────────────────────────────┐
│      Status Bar (44pt)      │
├─────────────────────────────┤
│  [<]  Call Detail    [...]   │  <- nav header + overflow
├─────────────────────────────┤
│                              │
│  Morning check-in            │  <- session type, 20pt
│  Today, 10:32 AM  -  18min  │  <- date + duration
│                              │
│  ┌─────────────────────────┐ │
│  │    EMOTIONAL TREND       │ │  <- emotion visualization
│  │                           │ │
│  │  :)  :|  :)  :)  :D      │ │     emoji sequence across
│  │  |---+---+---+---+---|   │ │     call timeline
│  │  0m  4m  8m  12m 16m 18m │ │
│  └─────────────────────────┘ │
│                              │
│  SUMMARY                     │  <- section eyebrow
│  ┌─────────────────────────┐ │
│  │ [S] "You started the     │ │  <- SIA-generated summary
│  │  session discussing your  │ │     with purple dot
│  │  sleep patterns. Your     │ │
│  │  consistency has improved  │ │
│  │  15% this week. We also   │ │
│  │  covered your fitness     │ │
│  │  goals and adjusted your  │ │
│  │  workout schedule..."     │ │
│  └─────────────────────────┘ │
│                              │
│  KEY INSIGHTS                │  <- section eyebrow
│  ┌─────────────────────────┐ │
│  │ * Sleep quality correlates │ │
│  │   with morning exercise   │ │
│  │ * Nutrition timing affects │ │
│  │   afternoon energy        │ │
│  │ * Career stress reduced    │ │
│  │   by 20% this week        │ │
│  └─────────────────────────┘ │
│                              │
│  ACTION ITEMS                │  <- section eyebrow
│  ┌─────────────────────────┐ │
│  │ [ ] Meditate for 10min    │ │  <- checkbox row
│  │     high  |  due May 23   │ │
│  │ [ ] Review weekly budget   │ │
│  │     med   |  due May 24   │ │
│  │ [x] 30-min morning walk   │ │
│  │     completed May 20      │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [>] listen again          │ │  <- listen again card
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ [S] ask SIA about this >  │ │  <- SIA shortcut
│  └─────────────────────────┘ │
│                              │
├─────────────────────────────┤
│  Today   SIA   Goals   Me   │
└─────────────────────────────┘
```

### Component Stack — History Tab (top to bottom)

1. **Navigation Header** — 48pt
   - Purpose: Screen identification, back navigation, schedule shortcut
   - Content: Back chevron (left), "Voice Sessions" title (center, 17pt Sora Semibold), "+" add button (right, 44x44pt — opens schedule modal)

2. **Tab Switcher** — 40pt
   - Purpose: Toggle between History and Action Items views
   - Content: 2-segment control ("history" / "action items"), pill shape

3. **Upcoming Calls Section** — variable (hidden if no upcoming calls)
   - Purpose: Show next scheduled voice call with management options
   - Content: Section eyebrow "UPCOMING", call card(s) with date/time/type/actions, schedule CTA

4. **Schedule Call CTA** — 56pt
   - Purpose: Book a new voice coaching session
   - Content: Brand CTA Button — "schedule a call"

5. **Call History List** — fills remaining space (scrollable)
   - Purpose: Reverse chronological log of past voice calls
   - Content: Date group headers (sticky), call history cards

6. **Bottom Padding** — 64pt (clears tab bar)

---

## Components

### Navigation Header
- **Purpose**: Screen identification and quick-schedule action
- **Data source**: Static
- **Visual treatment**: Transparent background, blends with ink-900. Back chevron white, title center-aligned ("Voice Sessions", 17pt Sora Semibold), "+" button right-aligned (24pt icon, white, 44x44pt touch target)
- **Variants**: With back button (pushed from another screen), without back button (if ever made tab root)
- **Gestures**: Back chevron tap (stack pop), "+" tap (modal: schedule call)
- **Size**: Full-width x 48pt

### Tab Switcher (2-Segment)
- **Purpose**: Toggle between call history view and action items aggregate view
- **Data source**: Local state
- **Visual treatment**: ink-brown-800 background, --r-pill corners. Active segment: royal-purple (#7F24FF) fill, white text, 15pt Sora Semibold. Inactive segment: transparent, white at 60%, 15pt Sora Regular. 16pt horizontal margins. The purple fill (instead of standard orange) signals AI Mode register.
- **Variants**: None
- **Gestures**: Tap to switch segment
- **Size**: Full-width minus 32pt (16pt margins) x 36pt

### Upcoming Call Card
- **Purpose**: Display next scheduled voice session with management options
- **Data source**: API — GET /api/voice-schedule
- **Visual treatment**: ink-brown-800 background, --r-md (14pt), 1pt border white at 8%, 16pt padding. Left edge: 3pt royal-purple (#7F24FF) accent bar (full height). Content: SIA avatar indicator (16pt circle, 2pt purple ring) top-left. Date/time (15pt Sora Semibold, white) — "Thu, May 22 - 3:00 PM". Session type (13pt Sora Regular, white at 70%) — "Weekly check-in". Bottom row: "edit" text link (13pt Sora Semibold, royal-purple at 60%) + "cancel" text link (13pt Sora Semibold, white at 40%), 24pt gap between links.
- **Variants**: Single upcoming call, multiple upcoming calls (stacked), imminent call (within 1 hour — orange countdown text "in 45min", pulsing dot)
- **Gestures**: Tap card body to view/edit schedule details, tap "edit" to open reschedule modal, tap "cancel" to show cancellation confirmation
- **Size**: Full-width minus 32pt x ~96pt

### Schedule Call CTA
- **Purpose**: Book a new voice coaching session with SIA
- **Data source**: None
- **Visual treatment**: Brand CTA Button pattern. Full-width minus 32pt. 56pt height. Burnt Orange (#FF5E00) fill, white text ("schedule a call"), --r-pill. 17pt Sora Semibold, sentence case, center-aligned. Phone icon (16pt, white) left of text, 8pt gap.
- **Variants**: Default (orange), premium-gated (if free tier — shows lock icon, triggers paywall on tap)
- **Gestures**: Tap to open Schedule Call modal
- **Size**: Full-width minus 32pt x 56pt

### Date Group Header (Sticky)
- **Purpose**: Groups call history cards by time period
- **Data source**: Computed from call timestamps
- **Visual treatment**: Eyebrow text pattern (12pt Sora Semibold, uppercase, white at 50%, +0.12em tracking). Background: ink-900 (becomes opaque when sticky to occlude content scrolling beneath). 16pt horizontal padding, 12pt vertical padding.
- **Variants**: Today, Yesterday, This week, Earlier, or specific date (e.g., "MAY 12")
- **Gestures**: None
- **Size**: Full-width x 32pt (sticky on scroll, z-30 with backdrop-blur when stuck)

### Call History Card
- **Purpose**: Single past voice call entry with summary preview and emotion indicator
- **Data source**: API — GET /api/voice-calls, GET /api/call-summaries/:callId
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt), 1pt border white at 5%, 24pt padding. Full-width minus 32pt (16pt margins).
- **Variants**: Standard (with summary), brief call (under 2 minutes — no summary, shows "brief call" label), channel indicator (mobile_app / whatsapp / widget — small icon badge)
- **Gestures**: Tap to stack push to Call Detail view
- **Size**: Full-width minus 32pt x ~104pt

#### Call History Card — Internal Layout
- **SIA Avatar Indicator**: 16pt circle, ink-brown-800 bg with 2pt royal-purple (#7F24FF) ring. Top-left corner of card, 16pt from edges. This is the AI presence marker.
- **Time & Duration**: Right of avatar, 8pt gap. Time (15pt Sora Semibold, white) — "10:32 AM". Duration pill (13pt Sora Regular, white at 50%, ink-900 bg at 40%, --r-pill, 8pt horizontal / 4pt vertical padding) — "18min". 8pt gap between time and duration pill.
- **Session Type**: Below time row, 4pt gap. 13pt Sora Semibold, royal-purple (#7F24FF) at 60%. Text: "Morning check-in", "Evening reflection", "Quick question", "Goal review", "Weekly check-in".
- **Emotion Trend & Summary Row**: Below session type, 8pt gap. Emotion emoji (16pt, left-aligned) followed by summary snippet (13pt Sora Regular, white at 50%, max 2 lines, truncated with ellipsis). 8pt gap between emoji and text.
- **Channel Badge** (optional): Bottom-right, 12pt icon (phone for mobile_app, WhatsApp icon for whatsapp, widget icon for widget), white at 30%.
- **Padding**: 16pt all sides.

### Emotion Trend Emoji
- **Purpose**: Quick visual indicator of the emotional tone of the call
- **Data source**: API — emotion_summary field from voice_calls table
- **Visual treatment**: Single emoji representing the dominant emotion of the call. Size: 16pt in card context, 24pt in detail context.
- **Emoji mapping**:
  - Positive/energized: :D (grinning)
  - Calm/content: :) (smile)
  - Neutral/reflective: :| (neutral)
  - Low/tired: :( (slight frown)
  - Stressed/anxious: >:( (worried)
- **Variants**: None (single emoji per call)
- **Gestures**: None (display only)
- **Size**: 16pt (card), 24pt (detail)

### Action Item Row
- **Purpose**: Single actionable task generated from a voice call
- **Data source**: API — GET /api/call-summaries/:callId/action-items
- **Visual treatment**: Full-width row within a Section Group Container. Checkbox (left) + content (center) + metadata (right). 1pt bottom divider (white at 5%) between rows.
- **Sub-elements**:
  - Checkbox: 24pt circle. Unchecked: 2pt white at 20% border, empty. Checked: Burnt Orange (#FF5E00) fill, white checkmark (14pt). Tap to toggle.
  - Content: Action text (15pt Sora Semibold, white). Source reference (13pt Sora Regular, white at 40%) — "from: Morning check-in".
  - Priority chip: --r-pill, 8pt horizontal / 4pt vertical padding. High: orange (#FF5E00) at 15% bg, orange text. Medium: white at 10% bg, white at 50% text. Low: white at 5% bg, white at 30% text. 11pt Sora Semibold.
  - Due date: 12pt Sora Regular, white at 40%. Overdue: #F44336 text.
- **Variants**: Pending (default), completed (strikethrough text, 50% opacity, checked), overdue (red due date text)
- **Gestures**: Tap checkbox to complete, tap row body to navigate to source call detail
- **Size**: Full-width x ~72pt

### Filter Chip Row (Action Items Tab)
- **Purpose**: Filter action items by status
- **Data source**: Local state
- **Visual treatment**: Standard Filter Chip pattern. Horizontal row, 8pt gap between chips. "all" (default active), "pending", "completed". Active chip: royal-purple (#7F24FF) bg, white text (AI Mode accent). Inactive: ink-brown-800 bg, 1pt white at 10% border, white at 60% text. 13pt Sora Semibold. 16pt leading margin.
- **Variants**: None
- **Gestures**: Tap to filter
- **Size**: Auto-width per chip x 36pt, row height 40pt (with 2pt vertical padding)

### Section Group Container
- **Purpose**: Groups call cards and action item rows within date sections
- **Data source**: N/A (structural)
- **Visual treatment**: ink-brown-800 background, --r-xl (28pt) radius, 1pt border white at 5%. Cards/rows stack inside with dividers.
- **Variants**: N/A
- **Gestures**: N/A
- **Size**: Full-width minus 32pt (16pt margins) x auto

### Call Detail — Emotional Trend Visualization
- **Purpose**: Show the emotional arc across the duration of the call
- **Data source**: API — emotional_trend array from call_summaries table
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Height: ~120pt. Horizontal timeline with emoji markers at key emotional shift points. Connecting line: 2pt, royal-purple (#7F24FF) at 40%, curved path between points. Time axis: 12pt Sora Regular, white at 30%, evenly spaced below. Emoji markers: 24pt, positioned at their corresponding time offset. Active/hover: tooltip with brief context ("discussed career stress").
- **Variants**: Short call (3 or fewer data points — simplified), long call (many data points — scrollable horizontally)
- **Gestures**: Tap emoji marker for context tooltip
- **Size**: Full-width minus 32pt x ~120pt

### Call Detail — Summary Card
- **Purpose**: Display the AI-generated summary of the voice call
- **Data source**: API — GET /api/call-summaries/:callId
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Purple dot (6pt, #7F24FF) top-left (SIA indicator). Summary text: 15pt Sora Regular, white at 80%, starting 32pt from card left (past the dot). Multi-paragraph with 12pt paragraph spacing.
- **Variants**: None
- **Gestures**: None (display only)
- **Size**: Full-width minus 32pt x auto

### Call Detail — Key Insights List
- **Purpose**: Bulleted list of key takeaways from the call
- **Data source**: API — key_insights array from call_summaries
- **Visual treatment**: Eyebrow label "KEY INSIGHTS" (12pt Sora Semibold, royal-purple at 60%, uppercase, +0.12em tracking). Each insight: bullet marker (6pt circle, royal-purple at 40%) + text (15pt Sora Regular, white at 80%). 12pt gap between items. 16pt left padding for bullets.
- **Variants**: None
- **Gestures**: None
- **Size**: Full-width minus 32pt x auto

### Call Detail — Listen Again Card
- **Purpose**: Replay the voice call recording
- **Data source**: API — audio URL from voice_calls record
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Single row: play icon (20pt, Burnt Orange) + "listen again" text (15pt Sora Semibold, white) + duration (13pt Sora Regular, white at 40%, right-aligned) + chevron (14pt, white at 20%, right). Height: 56pt.
- **Variants**: Default (play icon), playing (pause icon, orange waveform mini-visualization replaces text temporarily), unavailable (greyed out, "recording not available")
- **Gestures**: Tap to play/pause recording
- **Size**: Full-width minus 32pt x 56pt

### Schedule Call Modal
- **Purpose**: Create or edit a scheduled voice call
- **Data source**: API — POST /api/voice-schedule (create), PUT /api/voice-schedule/:id (edit)
- **Visual treatment**: Modal presentation (slides up from bottom). ink-brown-800 bg, --r-lg (20pt) top corners. Drag handle: 36pt wide x 4pt, white at 20%, centered, 8pt below top. Content: date picker (native iOS wheel or custom), time picker, session type selector (segmented control — "check-in" / "goal review" / "reflection" / "open"), recurrence toggle ("repeat weekly" with Toggle Switch). CTA: "schedule" Brand CTA Button at bottom.
- **Variants**: New schedule (empty form), edit (pre-filled), reschedule (pre-filled with "reschedule" CTA text)
- **Gestures**: Drag down to dismiss, tap "schedule" to confirm
- **Size**: Full-width, ~65% screen height

### Cancel Confirmation Sheet
- **Purpose**: Confirm cancellation of a scheduled call
- **Data source**: API — DELETE /api/voice-schedule/:id
- **Visual treatment**: Bottom sheet, ink-brown-800 bg, --r-lg top corners. Drag handle at top. Heading: "cancel this session?" (18pt Sora Semibold, white). Body: session details (date, time, type) in 15pt Sora Regular, white at 70%. Two buttons: "cancel session" (full-width, #F44336 bg, white text, --r-pill, 48pt) and "keep it" (full-width, transparent bg, 1pt white at 20% border, white text, --r-pill, 48pt). 12pt gap between buttons.
- **Gestures**: Drag down to dismiss, tap "cancel session" to confirm deletion
- **Size**: Full-width, ~280pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Screen background | #0A0A0F | ink-900 | z-0 base |
| Card surface | #211008 | ink-brown-800 | z-10, standard card |
| Card border | white at 5% | -- | Glassmorphism subtle border |
| Upcoming card left bar | #7F24FF | royal-purple | AI Mode accent |
| Tab switcher active | #7F24FF | royal-purple | AI Mode register |
| Filter chip active | #7F24FF | royal-purple | AI Mode register |
| Session type text | #7F24FF at 60% | royal-purple | AI category label |
| SIA avatar ring | #7F24FF | royal-purple | 10% role -- AI presence |
| Purple dot (summary) | #7F24FF | royal-purple | 10% role -- SIA indicator |
| Key insights eyebrow | #7F24FF at 60% | royal-purple | AI-derived content |
| Emotion trend line | #7F24FF at 40% | royal-purple | AI analysis visualization |
| Schedule CTA | #FF5E00 | brand-orange | 60% role -- primary CTA |
| "+" add button | white | -- | Action trigger |
| Action item checkbox (done) | #FF5E00 | brand-orange | 60% role -- completion |
| Listen again play icon | #FF5E00 | brand-orange | 60% role -- media action |
| Priority chip (high) | #FF5E00 at 15% bg | brand-orange | Urgency indicator |
| Completed action checkmark | #34A853 | brand-green | 30% role -- completion |
| Overdue date text | #F44336 | error-red | Warning state |
| Cancel button bg | #F44336 | error-red | Destructive action |
| Call time text | white | -- | Primary text |
| Duration pill | white at 50% | -- | Secondary metadata |
| Summary text | white at 80% | -- | Body content |
| Summary snippet | white at 50% | -- | Preview text |
| Timestamp / meta | white at 40% | -- | Tertiary text |
| Date group header | white at 50% | -- | Eyebrow label |
| Sticky header bg | #0A0A0F at 95% | ink-900 | Backdrop-blur when sticky |
| Edit link | #7F24FF at 60% | royal-purple | Management action |
| Cancel link | white at 40% | -- | Destructive secondary |
| Channel badge icon | white at 30% | -- | Subtle metadata |

**60/30/10 verification**: This screen operates in AI Mode, so royal-purple takes a larger role than the standard 10% -- appearing on the tab switcher, filter chips, session type labels, SIA avatar rings, upcoming card accent bars, insights eyebrow, emotion trend line, and edit links. This is intentional: the screen is entirely about AI coaching history, making purple the defining register color. Orange remains the CTA/action color (schedule button, checkboxes, play icon, priority chips). Green appears only on completion states (checked action items). The ratio shifts to approximately orange 40% / purple 30% / green 10% with purple elevated to reflect AI Mode register -- consistent with how Screen 11 (SIA Voice Full-Screen) elevates purple in pure SIA experiences.

---

## Interaction States

### Call History Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt border white 5% | -- |
| Pressed | Scale(0.98), border brightens to white 15% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | N/A (cards are always tappable) | -- |
| Loading | Skeleton shimmer (full card) | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Upcoming Call Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, purple left bar | -- |
| Pressed | Scale(0.98), bg darkens slightly | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Imminent (< 1hr) | Orange countdown text pulsing, dot indicator | -- |
| Loading | Skeleton shimmer | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Schedule Call CTA
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Burnt Orange fill, white text | -- |
| Pressed | Darker orange (#E05500) + scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity (e.g., max scheduled calls reached) | -- |
| Loading | White spinner replaces text | -- |
| Error | N/A | -- |
| Success | Green glow (600ms) | Success notification |

### Action Item Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default (unchecked) | 24pt circle, 2pt white at 20% border, empty | -- |
| Pressed | Scale(0.95), fill with orange at 20% | Light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |
| Loading | Spinner replaces checkbox (syncing) | -- |
| Error | Red outline (#F44336), reverts to unchecked | Error notification |
| Success (checked) | Orange fill, white checkmark (14pt), text strikethrough | Success notification |

### Tab Switcher Segments
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white at 60% text | -- |
| Pressed | Scale(0.97), bg darkens | Light impact |
| Active (selected) | Royal-purple (#7F24FF) fill, white text | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity | -- |
| Loading | -- | -- |
| Error | -- | -- |
| Success | -- | -- |

### Listen Again Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Play icon (orange), "listen again" text | -- |
| Pressed | Scale(0.98), bg darkens | Light impact |
| Playing | Pause icon replaces play, mini waveform appears | Medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Disabled | 0.4 opacity, "recording not available" | -- |
| Loading | Spinner replaces play icon (buffering) | -- |
| Error | Red icon, "playback error" text | Error notification |
| Success | -- | -- |

### Edit / Cancel Text Links (Upcoming Card)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (edit) | Royal-purple at 60% text | -- |
| Default (cancel) | White at 40% text | -- |
| Pressed | Text at 30% opacity, scale(0.97) | Light impact |
| Focus-visible | 2pt orange ring around text bounds | -- |
| Disabled | White at 20% | -- |
| Loading | Tiny spinner (12pt) replaces text | -- |
| Error | N/A | -- |
| Success | N/A | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Call history card | Stack push to Call Detail |
| Tap | Upcoming call card body | View/edit schedule details |
| Tap | "edit" link | Open reschedule modal |
| Tap | "cancel" link | Open cancel confirmation sheet |
| Tap | Schedule CTA | Open Schedule Call modal |
| Tap | "+" nav button | Open Schedule Call modal |
| Tap | Action item checkbox | Toggle completion status |
| Tap | Action item row body | Navigate to source call detail |
| Tap | Filter chip | Filter action items by status |
| Tap | Listen again card | Play/pause call recording |
| Tap | Emotion trend emoji (detail) | Show context tooltip |
| Tap | Ask SIA shortcut | Tab switch to SIA Chat with call context |
| Swipe right from edge | Screen | Stack pop to previous screen |
| Pull-to-refresh | SectionList/FlatList | Refresh call data from API |
| Scroll | Content area | Vertical scroll through list |

### Haptic Feedback Points
- Tab segment switch: medium impact
- Filter chip tap: light impact
- Call card tap: light impact
- Action item completion (checkbox): success notification
- Schedule CTA tap: light impact
- Schedule confirmed: success notification
- Cancel session confirmed: medium impact
- Pull-to-refresh release: medium impact
- Listen again play: medium impact
- Upcoming call imminent alert: light impact

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Call history cards | Screen enter | Staggered fade-in + translateY(12pt to 0) | 280ms per card, 80ms stagger | ease-out-soft |
| Upcoming call card | Screen enter | Fade-in + translateY(8pt to 0), before history cards | 280ms (--dur-base) | ease-out-soft |
| Tab switch content | Tap segment | Crossfade between History and Action Items views | 280ms (--dur-base) | ease-out-soft |
| Tab switcher pill | Tap segment | Active pill slides to new position | 280ms (--dur-base) | ease-out-soft |
| Filter chip activation | Tap chip | Active chip bg fill + content crossfade below | 280ms (--dur-base) | ease-out-soft |
| Action item check | Tap checkbox | Orange fill animates from center + checkmark draws + text strikethrough fade | 280ms (--dur-base) | ease-flow |
| Action item complete | After check | Row fades to 50% opacity | 280ms (--dur-base) | ease-out-soft |
| Sticky header | Scroll threshold | Fade-in backdrop-blur when stuck | 160ms (--dur-fast) | ease-out-soft |
| Schedule modal | CTA tap | Slide up from bottom + backdrop fade in | 520ms (--dur-slow) | ease-flow |
| Schedule modal dismiss | Drag down / confirm | Slide down + backdrop fade out | 280ms (--dur-base) | ease-out-soft |
| Cancel sheet | Cancel link tap | Slide up from bottom | 520ms (--dur-slow) | ease-flow |
| Emotion trend (detail) | Detail screen enter | Line draws left to right, emojis fade in at their positions sequentially | 520ms (--dur-slow) | ease-flow |
| Summary text (detail) | Detail screen enter | Fade-in + translateY(8pt to 0), after emotion trend | 280ms (--dur-base) | ease-out-soft |
| Listen again waveform | Playback active | Mini bars animate with audio levels | Continuous (60fps) | linear |
| Pull-to-refresh | Pull gesture | Standard branded spinner | Variable | iOS default |
| Imminent call pulse | Upcoming call < 1hr | Orange dot opacity 60% to 100%, looping | 1200ms per cycle | ease-in-out |

**Screen transition**:
- **Enter**: Stack push from right, 280ms, ease-out-soft
- **Exit (back)**: Stack pop to right, 280ms, ease-out-soft
- **Exit (to detail)**: Stack push from right, 280ms, ease-out-soft

---

## Empty States

### Day 1 (new user -- no voice calls yet)
Centered vertically in content area (below tab switcher):
- Phone-voice icon: 48pt, royal-purple (#7F24FF) at 20%, center-aligned
- Heading: "no voice sessions yet" -- 18pt Sora Semibold, white at 60%, center-aligned
- SIA message: "schedule your first call and we'll talk through your goals together." -- 15pt Sora Regular, white at 40%, center-aligned, max 260pt width
- Purple dot (6pt, #7F24FF) left of SIA message as SIA indicator
- Schedule CTA: "schedule your first call" -- Brand CTA Button, full-width minus 64pt, centered, 24pt below message
- The empty state feels inviting, not broken. SIA's voice fills the void with a warm invitation.

### Day 1 (Action Items tab -- no action items yet)
Centered vertically:
- Checklist icon: 48pt, royal-purple at 20%, center-aligned
- Heading: "no action items yet" -- 18pt Sora Semibold, white at 60%, center-aligned
- Body: "action items from your voice sessions will appear here." -- 15pt Sora Regular, white at 40%, center-aligned, max 260pt width

### Established user (history exists, no upcoming calls)
The Upcoming Calls section is hidden entirely. The Schedule Call CTA remains visible at the top of the history list, between the tab switcher and the first date group header.

### Established user (all action items completed)
Action Items tab shows all items in "completed" state with strikethrough and 50% opacity. A small celebratory note appears at bottom of list:
- Purple dot (6pt) + "all caught up. nice work." -- 13pt Sora Regular, white at 50%

---

## Motivation Adaptation

- **Low motivation**: Upcoming section shows only the next scheduled call (no list of future calls). Call history cards show only the most recent 5 calls with a "see more" link. Action items show max 3 pending items. SIA empty state message is gentler: "no pressure. I'm here when you want to talk." Schedule CTA text softens to "let's chat sometime".
- **Medium motivation**: Default experience. Full history visible. All action items shown. Standard empty state. SIA suggestions for scheduling frequency: "a weekly check-in helps most people."
- **High motivation**: Extended metadata on call cards — shows domain tags discussed, XP earned per call. Action items show priority sorting with due dates prominent. Additional analytics summary at top: "12 calls this month, 8 action items completed." More frequent scheduling prompts. Detail view shows comparative insight: "this session covered 3 more topics than your average."

---

## Technical Notes

- **API endpoints**: All endpoints are protected (JWT required, `req.user.userId`).
  - `GET /api/voice-calls` — paginated list (cursor-based for infinite scroll), includes `channel`, `status`, `session_type`, `call_duration`, `call_summary` snippet, `emotion_summary`
  - `POST /api/voice-calls` — initiate new voice call (returns call ID and session token)
  - `GET /api/voice-calls/:id` — full call details including audio URL
  - `GET /api/voice-schedule` — list scheduled calls (future only, sorted ascending)
  - `POST /api/voice-schedule` — create scheduled call (date, time, session_type, recurrence)
  - `PUT /api/voice-schedule/:id` — reschedule (update date/time)
  - `DELETE /api/voice-schedule/:id` — cancel scheduled call
  - `GET /api/call-summaries/:callId` — AI-generated summary with key_insights array, emotional_trend array, duration
  - `GET /api/call-summaries/:callId/action-items` — action items with content, category, priority, due_date, status, completed_at
- **Database tables**:
  - `voice_calls` — channel (mobile_app/whatsapp/widget), status, session_type, call_duration, call_summary, emotion_summary
  - `call_summaries` — summary, key_insights (JSONB), emotional_trend (JSONB), duration
  - `action_items` — content, category, priority (high/medium/low), due_date, status (pending/completed), completed_at
- **Pagination**: Call history uses cursor-based pagination. Initial load: 20 calls. Scroll-to-bottom triggers next page load with skeleton shimmer for incoming cards.
- **Real-time**: Upcoming call cards should update countdown timers in real-time (1-minute intervals when > 1hr, 1-second intervals when < 1hr).
- **Offline**: Call history cards and action items should be cached locally. Scheduling requires network. Completing action items queues optimistically and syncs on reconnection.
- **Call summaries**: Generated asynchronously after call completion. Cards may initially show "generating summary..." state with a subtle loading animation before the summary populates.

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Screen title ("Voice Sessions") | Sora | Semibold (600) | 17pt | 22pt | white |
| Tab switcher labels | Sora | Semibold (600) | 15pt | 20pt | white (active) / white at 60% (inactive) |
| Date group header | Sora | Semibold (600) | 12pt | 16pt | white at 50% |
| Call time | Sora | Semibold (600) | 15pt | 20pt | white |
| Call duration pill | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Session type label | Sora | Semibold (600) | 13pt | 18pt | purple #7F24FF at 60% |
| Summary snippet | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Upcoming card date/time | Sora | Semibold (600) | 15pt | 20pt | white |
| Upcoming card session type | Sora | Regular (400) | 13pt | 18pt | white at 70% |
| "edit" link | Sora | Semibold (600) | 13pt | 18pt | purple #7F24FF at 60% |
| "cancel" link | Sora | Semibold (600) | 13pt | 18pt | white at 40% |
| Imminent countdown text | Sora | Semibold (600) | 13pt | 18pt | orange #FF5E00 |
| Schedule CTA text | Sora | Semibold (600) | 17pt | 22pt | white |
| Filter chip labels | Sora | Semibold (600) | 13pt | 18pt | white at 60% (inactive) / white (active) |
| Action item text | Sora | Semibold (600) | 15pt | 20pt | white |
| Action item source reference | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| Action item due date | Sora | Regular (400) | 12pt | 16pt | white at 40% (normal) / #F44336 (overdue) |
| Priority chip text | Sora | Semibold (600) | 11pt | 16pt | orange #FF5E00 (high) / white at 50% (medium) / white at 30% (low) |
| Call detail session type | Sora | Semibold (600) | 20pt | 28pt | white |
| Call detail date + duration | Sora | Regular (400) | 15pt | 20pt | white at 60% |
| Call detail summary text | Sora | Regular (400) | 15pt | 22pt | white at 80% |
| Key insights eyebrow | Sora | Semibold (600) | 12pt | 16pt | purple #7F24FF at 60% |
| Key insight text | Sora | Regular (400) | 15pt | 22pt | white at 80% |
| Emotion trend time labels | Sora | Regular (400) | 12pt | 16pt | white at 30% |
| Listen again text | Sora | Semibold (600) | 15pt | 20pt | white |
| Listen again duration | Sora | Regular (400) | 13pt | 18pt | white at 40% |
| "ask SIA about this" text | Sora | Semibold (600) | 15pt | 20pt | white |
| Cancel confirmation heading | Sora | Semibold (600) | 18pt | 24pt | white |
| Cancel confirmation body | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| Cancel confirmation CTA | Sora | Semibold (600) | 15pt | 20pt | white |
| "keep it" button text | Sora | Semibold (600) | 15pt | 20pt | white |
| Empty state heading | Sora | Semibold (600) | 18pt | 24pt | white at 60% |
| Empty state body | Sora | Regular (400) | 15pt | 22pt | white at 40% |
| "all caught up" note | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Schedule modal session type labels | Sora | Semibold (600) | 13pt | 18pt | white |
| Schedule modal CTA | Sora | Semibold (600) | 17pt | 22pt | white |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Call history fails to load | Skeleton shimmer on card placeholders for 5s, then inline error: "couldn't load voice sessions" with retry button | Tap retry; pull-to-refresh also retries |
| Call detail/summary fails to load | Detail view shows: "couldn't load call details" centered in content area with retry button | Tap retry to re-fetch; back button still functional |
| Summary still generating | Call card shows "generating summary..." with subtle loading animation (shimmer on snippet area) | Auto-updates when summary is ready; pull-to-refresh forces check |
| Schedule call fails | Schedule modal shows inline error below form: "couldn't schedule call. try again." in 13pt Sora Regular, #F44336 | Tap "schedule" again; form data preserved |
| Cancel scheduled call fails | Cancel confirmation sheet dismisses; toast: "couldn't cancel session. try again." | Re-open cancel sheet from upcoming card |
| Reschedule fails | Reschedule modal shows inline error: "couldn't reschedule. try again." | Tap "reschedule" again; original schedule preserved |
| Action item completion fails | Checkbox reverts to unchecked; toast: "couldn't update. try again." | Tap checkbox again to retry |
| Audio playback fails | Listen again card shows error state: red icon, "playback error" text | Tap card again to retry; check network |
| Audio recording unavailable | Listen again card greyed out (0.4 opacity): "recording not available" replaces "listen again" text | No recovery; recording was not stored |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull-to-refresh again or wait for connectivity |
| Emotional trend data missing | Emotion trend section hidden in call detail; summary and insights still display | No user action needed; trend data is supplementary |
| Offline state | Banner at top: "you're offline -- showing cached sessions" (ink-brown-800 bg, white at 60% text); schedule CTA disabled | Cached history viewable; scheduling requires connectivity |

---

## Accessibility

- All call cards are accessible as single tap targets with descriptive labels: "Voice call, Morning check-in, 18 minutes, Today at 10:32 AM, feeling energized"
- Emotion trend emojis have text alternatives: `:)` announced as "positive mood", `:|` as "neutral mood", etc.
- Tab switcher segments announced as "History tab, selected" / "Action items tab"
- Action item checkboxes announced as "Complete action: Meditate for 10 minutes, pending, high priority, due May 23"
- Date group headers announced as section markers for VoiceOver navigation
- Listen again card announced as "Play recording, Morning check-in, 18 minutes"
- Emotional trend visualization in detail view has a text summary alternative: "Emotional trend: started neutral, became positive midway, ended very positive"
- All interactive elements meet 44pt minimum touch target
- Color contrast: white text on ink-brown-800 exceeds WCAG AA (4.5:1 minimum). Purple text at 60% opacity on ink-brown-800 meets AA for large text.

---

## Cross-References

- **Navigates to**: Call Detail (stack push, same screen scroll-to or dedicated detail view), SIA Chat [09] via Ask SIA shortcut (tab switch with call context), SIA Voice Full-Screen [11] via "listen again" or initiating new call, Schedule Call Modal (modal present), Cancel Confirmation Sheet (modal present), Paywall [43] if free-tier user taps premium-gated scheduling
- **Navigates from**: SIA Chat [09] via call history link (stack push), Me Main [17] via quick link grid (stack push), SIA Voice Full-Screen [11] via post-call "view history" CTA (stack push), Notification History [24] via call reminder notification (stack push)
- **Shared components with**: Notification History [24] (Date Group Header sticky, Section Group Container), SIA Chat [09] (SIA avatar indicator, purple dot pattern), SIA Voice Full-Screen [11] (waveform visualization concept reused in listen-again mini player), Schedule/Calendar [41] (date picker patterns, time slot selection), Habits [38] (checkbox + strikethrough completion pattern for action items), Goal Detail [14] (Ask SIA Shortcut Card)
- **Patterns used**: Back Button (_shared-patterns.md), Brand CTA Button (_shared-patterns.md), Date Group Header Sticky (_shared-patterns.md), Section Group Container (_shared-patterns.md), Filter Chip Row (_shared-patterns.md), Segmented Control (_shared-patterns.md), 8-State Interaction Model (_shared-patterns.md), SIA Coaching Note Card Compact (_shared-patterns.md), Ask SIA Shortcut Card (_shared-patterns.md), Modal Presentation (_shared-patterns.md), Toggle Switch (_shared-patterns.md), Expandable Section (_shared-patterns.md)
- **Patterns established**: **Voice Call History Card** (ink-brown-800 card with SIA avatar indicator, time/duration/session-type/emotion-emoji/summary-snippet layout, channel badge), **Upcoming Call Card** (purple left accent bar, date/time/type with edit/cancel action links, imminent countdown variant), **Emotion Trend Emoji** (single emoji emotional summary indicator with 5-state mapping), **Emotion Trend Visualization** (horizontal timeline with emoji markers and purple connecting line for call detail), **Listen Again Card** (play/pause with mini waveform for call replay), **AI Mode Tab Switcher** (purple active segment instead of orange, signaling AI register), **AI Mode Filter Chips** (purple active state instead of orange), **Action Item Row with Source** (checkbox + text + priority chip + due date + source call reference), **Schedule Call Modal** (date/time/type/recurrence form for booking voice sessions), **Cancel Confirmation Sheet** (destructive action confirmation with red CTA + safe alternative)

---

## Design Rationale

**Why a dedicated history screen?** Voice calls are ephemeral — once they end, the value dissipates unless captured. This screen transforms coaching conversations into a persistent, reviewable asset. Users can revisit insights, track emotional patterns over time, and follow through on action items. This turns voice coaching from a "nice feature" into a trackable coaching relationship with measurable outcomes.

**Why AI Mode register (purple)?** This screen is entirely about AI-generated content — summaries, insights, emotional analysis, and action items. Every piece of data on this screen was created by SIA, not the user. The purple register communicates "you are in SIA's analytical domain" and distinguishes this from standard product screens where user-generated content dominates.

**Why tabs instead of a single list?** Action items are the most actionable content from voice sessions, but they'd get buried in a chronological call list. Separating them into their own tab makes follow-through frictionless — users can quickly check what SIA recommended without scrolling through call cards. The filter chips (all/pending/completed) add a lightweight task-management feel without overcomplicating the screen.

**Why the emotion trend visualization?** Emotional tracking is a core differentiator of SIA's coaching. Showing users their emotional arc across a call validates SIA's attentiveness and helps users recognize their own patterns. The emoji-based approach keeps it approachable — no clinical scales or numbers, just recognizable emotional states.

**Why schedule calls instead of just "call anytime"?** Scheduled calls create commitment and routine. Users who schedule regular check-ins are more likely to build a consistent coaching habit. The scheduling mechanism also enables SIA to prepare contextually relevant conversation starters based on the user's recent data, making each call more valuable than a spontaneous one.
