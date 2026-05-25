# Screen Design: Relationships Dashboard

**Screen**: 33 of 43
**File**: 33-relationships-dashboard.md
**Register**: Product Mode
**Primary action**: log quality time
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Relationships Dashboard). Also reachable via SIA deep-link.

---

## Purpose

The relationships dashboard helps users nurture their personal connections through intentional tracking and AI-powered reminders. Unlike the metric-heavy finance or career dashboards, this screen is people-centric — organized around the humans in the user's life rather than abstract data points. SIA acts as a relationship coach, reminding users when they have been out of touch with someone, suggesting quality time activities, and connecting relationship health to other life domains ("You tend to feel more energized after time with close friends — you haven't seen anyone socially in 10 days").

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with pink accent and relationship level
2. SIA relationship coaching note — cross-domain connection insight
3. AI reminders — proactive nudges about neglected connections
4. Key people — the user's important relationships with last interaction dates
5. Quality time log — recent entries (who, activity, duration)
6. Suggested activities from SIA
7. Important upcoming dates — birthdays, anniversaries

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link in chat (screen 09)
- **Primary exit**: Quality time log entry (modal/sheet for logging), SIA tab (for relationship advice)
- **Secondary exits**: Goal Detail (screen 14, for relationship-tagged goals), person detail (inline expansion)

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2.5 viewport heights)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Relationships      Lv.6  ⚡ │  Domain Header (56pt)
│     pink accent bar             │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (~72pt)
│ │ "You feel more energized    │ │
│ │  after time with friends.   │ │
│ │  You haven't seen anyone    │ │
│ │  socially in 10 days."      │ │
│ └─────────────────────────────┘ │
│                                 │
│  check in                       │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ⚠ It's been 2 weeks since  │ │  Reminder Card (~56pt each)
│ │   you connected with Ahmed  │ │
│ ├─────────────────────────────┤ │
│ │ ⚠ Mom's birthday is in     │ │
│ │   3 days                    │ │
│ └─────────────────────────────┘ │
│                                 │
│  key people                     │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ [👤] Sarah                  │ │  Person Row (~64pt each)
│ │      wife · 2 days ago      │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Ahmed                  │ │
│ │      friend · 14 days ago   │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Mom                    │ │
│ │      family · 5 days ago    │ │
│ ├─────────────────────────────┤ │
│ │ [👤] Ali                    │ │
│ │      colleague · 1 day ago  │ │
│ ├─────────────────────────────┤ │
│ │  + add person               │ │
│ └─────────────────────────────┘ │
│                                 │
│  recent quality time            │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ☕ Coffee with Ahmed        │ │  Log Entry (~56pt each)
│ │   May 6 · 45 min            │ │
│ ├─────────────────────────────┤ │
│ │ 🍽 Dinner with Sarah        │ │
│ │   May 18 · 1.5 hrs          │ │
│ ├─────────────────────────────┤ │
│ │ ··· view all                │ │
│ └─────────────────────────────┘ │
│                                 │
│  sia suggests                   │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 💡 "Call Ahmed this week.   │ │  Suggestion Card (~64pt)
│ │    You always feel better   │ │
│ │    after catching up."      │ │
│ │           [do it] [skip]    │ │
│ └─────────────────────────────┘ │
│                                 │
│  upcoming dates                 │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 🎂 Mom's birthday          │ │  Date Row (~48pt each)
│ │    May 23 · 3 days away     │ │
│ ├─────────────────────────────┤ │
│ │ 💍 Anniversary with Sarah   │ │
│ │    Jun 12 · 23 days away    │ │
│ └─────────────────────────────┘ │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘

    [+ Log time]  ← FAB (56pt, bottom-right, above tab bar)
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Relationships" title (20pt Sora Semibold), level badge ("Lv.6"), XP icon, 2pt pink (#EC4899) accent line at bottom

2. **SIA Coaching Note** — ~72pt
   - Purpose: Cross-domain relationship insight
   - Content: Purple left bar, SIA avatar, coaching message, "ask SIA →" link

3. **AI Reminders Section** — ~112pt (2 reminders)
   - Purpose: Proactive nudges about neglected connections and upcoming dates
   - Content: Warning icon (orange) + reminder text + actionable suggestion

4. **Key People List** — ~320pt (4 people + add button)
   - Purpose: The user's important relationships
   - Content: Avatar, name, relationship label, last interaction date

5. **Quality Time Log** — ~128pt (2 entries + "view all")
   - Purpose: Recent quality time entries
   - Content: Activity icon, description, date, duration

6. **SIA Suggestions** — ~64pt
   - Purpose: AI-generated activity recommendations
   - Content: Suggestion text with "do it" (orange) and "skip" (gray) action buttons

7. **Upcoming Dates** — ~96pt (2 items)
   - Purpose: Important relationship dates (birthdays, anniversaries)
   - Content: Event icon, person/occasion name, date, countdown

8. **FAB (Log Quality Time)** — 56pt
   - Purpose: Quick-add quality time entry
   - Content: "+" icon, orange, positioned bottom-right above tab bar
   - Gestures: Tap opens Quick-Log Quality Time Sheet. Long-press: expands to reveal 2 options — 'log quality time' (opens Quick-Log Quality Time Sheet) and 'ask SIA' (opens SIA Chat with relationships context).
   - **Unified FAB behavior**: All domain dashboard FABs follow the same pattern: short tap opens the primary quick-log sheet, long-press reveals 2 options ("quick log" + "ask SIA"). This consistency across all 9 domains means users learn one interaction model.

---

## Components

### AI Reminder Card
- **Purpose**: Proactive nudge from SIA about relationship maintenance
- **Data source**: SIA AI engine (relationship analysis, last-interaction tracking)
- **Visual treatment**: Inside a card container (ink-brown-800, 20pt border-radius). Left: orange warning icon (20pt) in a 32pt circle with orange at 15% background. Text: reminder message (15pt Sora Regular, white). Each reminder is a row separated by 1pt divider (white at 5%). Right edge: chevron (12pt, white at 30%) indicating tappable.
- **Variants**: Connection reminder ("It's been X days since you connected with [person]"), date reminder ("Mom's birthday is in 3 days"), milestone ("Your 5th anniversary with Sarah is next month")
- **Gestures**: Tap → options bottom sheet (log interaction, set reminder, dismiss). Swipe left → dismiss reminder. Swipe right → mark as done (logged interaction).
- **Size**: Full-width - 32pt × ~56pt per reminder

### Person Row
- **Purpose**: Key relationship at a glance
- **Data source**: Relationships API (people list with last interaction dates)
- **Visual treatment**: Inside a card container. Each row: left — avatar circle (40pt diameter, photo if available, initials on pink at 15% background if no photo). Center — name (16pt Sora Semibold, white), relationship label + last interaction (13pt Sora Regular, white at 50%, e.g., "friend · 14 days ago"). Last interaction changes to orange when > 14 days (warning that connection is fading). Right edge: chevron (12pt, white at 30%). Rows separated by 1pt divider (white at 5%). Bottom: "+ add person" link (15pt Sora Regular, orange).
- **Variants**: Recent (< 7 days — neutral), fading (7-14 days — subtle warning), neglected (> 14 days — orange text for "X days ago"), no photo (initials avatar)
- **Gestures**: Tap → expand inline showing recent interactions with this person, suggested activities, and "log time" shortcut. Long-press → edit person (name, relationship, photo). Tap "add person" → add person bottom sheet.
- **Size**: Full-width - 32pt × ~64pt per row

### Quality Time Log Entry
- **Purpose**: Record of intentional time spent with someone
- **Data source**: Relationships API (quality time log endpoint)
- **Visual treatment**: Inside a card container. Each row: left — activity icon (20pt, within 32pt circle, pink at 15% background). Center — description (16pt Sora Semibold, white, e.g., "Coffee with Ahmed"), date + duration below (13pt Sora Regular, white at 50%). Rows separated by 1pt divider. "View all" link at bottom (15pt Sora Regular, orange).
- **Variants**: Standard (description + date + duration), with reflection (small book icon indicating user wrote a reflection), with mood (emoji indicator)
- **Gestures**: Tap → expand to show full details (activity, who, duration, reflection if any, mood). Long-press → edit entry. Tap "view all" → full log list (likely a new FlatList within this stack).
- **Size**: Full-width - 32pt × ~56pt per entry

### SIA Suggestion Card
- **Purpose**: AI-generated activity recommendation for relationship building
- **Data source**: SIA AI engine (relationship suggestions based on patterns)
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Left: lightbulb icon (20pt, orange). Suggestion text (15pt Sora Regular, white). Below: two buttons side by side — "do it" (compact pill, orange background, white text, 13pt Sora Semibold, ~80pt wide × 36pt) and "skip" (compact pill, transparent, white at 50% text, 13pt Sora Semibold, same size).
- **Variants**: Standard (activity suggestion), contextual ("It's been X days since..." + activity), cross-domain ("Exercising together could help both fitness and this relationship")
- **Gestures**: Tap "do it" → creates action (schedules it or opens log entry pre-filled). Tap "skip" → dims card with "skipped" label, SIA notes preference. Tap suggestion text → navigate to SIA for more context.
- **Size**: Full-width - 32pt × ~64pt

### Upcoming Date Row
- **Purpose**: Important relationship dates with countdown
- **Data source**: Relationships API (important dates), user-entered
- **Visual treatment**: Inside a card container. Each row: left — event icon (20pt: 🎂 for birthday, 💍 for anniversary, 📅 for other). Center — event name (16pt Sora Semibold, white), date + countdown (13pt Sora Regular, white at 50%). Countdown changes to orange when < 7 days, red when < 3 days. Rows separated by 1pt divider.
- **Variants**: Far (>7 days — neutral), approaching (3-7 days — orange countdown), imminent (<3 days — red countdown, bold text), today ("today" in green with celebration icon)
- **Gestures**: Tap → expand with SIA gift/activity suggestion for the occasion. Long-press → edit date.
- **Size**: Full-width - 32pt × ~48pt per row

### Add Person Bottom Sheet
- **Purpose**: Add a new person to the key people list
- **Data source**: User input
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners). Drag handle. Title: "add someone important" (20pt Sora Semibold). Fields: name (text input, standard pattern), relationship label (selector chips: "partner", "family", "friend", "colleague", "other"), photo (optional, camera/gallery picker). Save button: orange pill CTA.
- **Variants**: Single state
- **Gestures**: Fill fields, tap save → adds person to list. Drag down → dismiss.
- **Size**: Full-width × ~320pt

### Add Person — Relationship Label Chips (Specification)

The relationship label selector uses a horizontal row of tappable chips:

- **Layout**: horizontal wrap (not scroll). If all chips fit in one row, single row. If not, wraps to second row.
- **Selection mode**: single-select (one relationship label per person)
- **Chips**: 5 options — "partner", "family", "friend", "colleague", "other"
- **Chip style**: same as Filter Chip pattern (36pt height, --r-pill, ink-brown-800 bg inactive, orange bg active)
- **Default**: no chip selected (user must choose one)
- **"other" behavior**: selecting "other" reveals a text input below (standard pattern, 44pt height, placeholder "e.g. roommate, mentor", max 30 characters)
- **Spacing**: 8pt gap between chips, 16pt horizontal margins
- **Haptic**: light impact on chip select
- **Validation**: at least one label must be selected before "add" CTA becomes active (otherwise CTA at 40% opacity, disabled)

### Quick-Log Quality Time Sheet
- **Purpose**: Minimal structured logging for relationship interactions — captures who, how long, and optionally how it felt. SIA uses this to track relationship health patterns.
- **Data source**: User input + contacts list
- **Visual treatment**: Bottom sheet (modal slide-up, --r-lg top corners, drag handle, ink-brown-800 bg)
- **Fields** (3 fields max):
  1. Person picker: horizontal scroll of existing contacts (Person Row avatars, 40pt circles). "+" button at end to add new person. If no contacts yet, shows text input for name.
  2. Duration: stepper control — minus/plus flanking time (default: 30 min, increments of 15 min). Label: "time together"
  3. Optional note: single-line text input (placeholder: "what did you do?", 52pt height)
- **CTA**: "log quality time" (In-Card CTA Button, 48pt, orange fill, white text)
- **Success state**: Sheet dismisses, Small Win Toast ("Quality time logged · +10 XP"), person's "last connected" timestamp updates
- **Size**: ~300pt sheet height
- **Animation**: Standard modal present/dismiss

### Log Quality Time Bottom Sheet
- **Purpose**: Record time spent with someone
- **Data source**: User input, people list (for person selector)
- **Visual treatment**: Bottom sheet (ink-brown-800, --r-xl top corners). Drag handle. Title: "log quality time" (20pt Sora Semibold). Fields: person selector (horizontal scroll of avatar chips from key people list), activity description (text input), duration (time picker or preset chips: "15 min", "30 min", "1 hr", "2+ hrs"), reflection (optional text area: "how did it feel?"). Save button: orange pill CTA.
- **Variants**: Standard, pre-filled (from tapping a suggestion card or person row shortcut)
- **Gestures**: Select person chip, fill fields, tap save. Drag down → dismiss.
- **Size**: Full-width × ~400pt

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| FAB (log time) | #FF5E00 | Burnt Orange | 60% — primary action |
| "Do it" button | #FF5E00 | Burnt Orange | 60% — action CTA |
| "Add person" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| "View all" link | #FF5E00 | Burnt Orange | 60% — interactive text |
| Fading connection text (>14d) | #FF5E00 | Burnt Orange | 60% — warning/attention |
| Warning icon (reminders) | #FF5E00 | Burnt Orange | 60% — alert indicator |
| Approaching date countdown (<7d) | #FF5E00 | Burnt Orange | 60% — urgency |
| Save button (bottom sheets) | #FF5E00 | Burnt Orange | 60% — primary CTA |
| Completed interaction check | #34A853 | Forest Green | 30% — success/done |
| "Today" date indicator | #34A853 | Forest Green | 30% — positive current |
| XP earned from logging | #34A853 | Forest Green | 30% — reward |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Domain header accent line | #EC4899 | Pink | Domain color — identification |
| Domain level badge XP icon | #EC4899 | Pink | Domain color — identification |
| Avatar background (no photo) | #EC4899 15% | Pink at 15% | Domain color — identification |
| Activity icon backgrounds | #EC4899 15% | Pink at 15% | Domain color — identification |
| Imminent date countdown (<3d) | #f44336 | Red | Urgency/warning |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Names, headings |
| Secondary text | #FFFFFF B3 | White 70% | Descriptions |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, timestamps, labels |

**60/30/10 verification**: Orange on all interactive elements (FAB, buttons, links, urgency warnings). Green on success/completion (logged interaction, today marker, XP). Purple limited to SIA indicator (2 elements). Pink only on domain identification (header accent, avatars, activity icons). Ratio holds.

---

## Interaction States

### Person Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Skeleton shimmer on avatar and text | — |
| Error | N/A | — |
| Success | Brief green glow (600ms) after logging time with this person | success notification |
| Expanded | Row expands downward revealing recent interactions + suggested activities | — |

### AI Reminder Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard row with orange warning icon | — |
| Pressed | Background lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (after dismiss) | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Green glow (600ms) after marking as done | success notification |
| Swiped left (dismiss) | Row slides left, fades out, height collapses | light impact |
| Swiped right (done) | Row turns green briefly, then fades | success notification |

### "Do it" Button (SIA Suggestion)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange pill, white text | — |
| Pressed | Darker orange (#E55500), scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Spinner replaces text | — |
| Error | N/A | — |
| Success | Green glow (600ms), text changes to "done" briefly | success notification |

### "Skip" Button (SIA Suggestion)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent pill, white at 50% text | — |
| Pressed | White at 10% background, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | Card dims to 40% opacity, "skipped" label | — |

### FAB (Log Quality Time)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 56pt orange circle, white "+" icon, --shadow-2 | — |
| Pressed | scale(0.93), darker orange, glow intensifies | medium impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | N/A | — |
| Loading | N/A | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Person row | Expand inline (recent interactions, suggestions) |
| Tap | AI reminder | Options bottom sheet (log, remind, dismiss) |
| Tap | Quality time entry | Expand to full details |
| Tap | "Do it" button | Create action / open log entry |
| Tap | "Skip" button | Dismiss suggestion, SIA notes preference |
| Tap | Upcoming date row | Expand with SIA gift/activity suggestion |
| Tap | "Add person" | Open add person bottom sheet |
| Tap | FAB | Open Quick-Log Quality Time Sheet |
| Long-press | FAB | Expand to reveal 'log quality time' and 'ask SIA' options |
| Tap | SIA coaching note | Navigate to SIA tab |
| Tap | Domain level badge | Push to RPG Character Screen (screen 19) |
| Swipe left | AI reminder | Dismiss reminder |
| Swipe right | AI reminder | Mark as done (logged interaction) |
| Long-press | Person row | Edit person details |
| Long-press | Quality time entry | Edit entry |
| Long-press | Upcoming date row | Edit date |
| Pull-to-refresh | Entire ScrollView | Refresh all relationship data |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Reminder cards | Screen enter | Staggered fade-in, 80ms apart | 280ms each | ease-out-soft |
| Person rows | Scroll into view | Staggered fade-in, 60ms per row | 280ms each | ease-out-soft |
| Person row expand | Tap | Height expands (0→auto) + content fades in | 280ms | ease-out-soft |
| Quality time entries | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |
| SIA suggestion card | Scroll into view | Fade-in + translateY(12pt→0) | 280ms | ease-out-soft |
| Upcoming date rows | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |
| FAB | Screen enter | Scale(0→1) + fade-in, delayed 400ms | 280ms | ease-out-soft |
| Reminder swipe dismiss | Swipe left | translateX(→ off-screen) + opacity(→0) + height collapse | 280ms | ease-out-soft |
| Reminder swipe done | Swipe right | Green flash + translateX(→ off-screen) + height collapse | 280ms | ease-out-soft |
| Bottom sheets | Open | Slide up from bottom + backdrop fade | 520ms | ease-out-soft |
| Bottom sheets | Dismiss | Slide down + backdrop fade-out | 280ms | ease-out-soft |
| "Skip" card dim | Tap skip | Opacity → 40%, slight translateY(4pt) | 280ms | ease-out-soft |
| Pull-to-refresh | Pull release | Branded Balencia symbol appears, rotates. Release haptic: medium impact. | 280ms (entry) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "Relationships shape everything. Let's start by adding the people who matter most to you."
- AI reminders: Section hidden (no people tracked yet).
- Key people: "Add the people who matter" with prominent orange "add person" button. SIA suggestion chips: "partner", "family member", "best friend", "colleague".
- Quality time log: "No quality time logged yet. After you add people, start logging intentional time together."
- SIA suggestions: "Start by telling SIA about your closest relationships. I'll help you nurture them." Single orange "talk to SIA" button.
- Upcoming dates: Section hidden.

### Established user (zero state)
- No pending reminders: Reminders section hidden. SIA note: "You're staying connected. Keep it up."
- No recent quality time: Log section shows "No recent quality time. When did you last spend intentional time with someone?" + orange "log time" shortcut.
- No upcoming dates: Section hidden.

---

## Motivation Adaptation

- **Low motivation**: Only SIA note + top reminder + top 2 people shown. Quality time log, suggestions, and upcoming dates collapsed behind "see more". SIA tone: "Just check in with one person today."
- **Medium motivation**: Default experience. All sections visible with moderate density (4 people, 2 log entries, 1 suggestion, 2 dates).
- **High motivation**: Full people list visible (no cap). Quality time log shows all recent entries with duration analytics ("You spent 4.5 hours with friends this week, up from 2 hours last week"). SIA suggestions include cross-domain connections ("Exercising with Ahmed could boost both fitness and friendship"). Upcoming dates show preparation suggestions.

---

## Cross-References

- **Navigates to**: Screen 14 — Goal Detail (for relationship goals, stack push), Screen 09 — SIA Chat (tap SIA note, tab switch), Screen 19 — RPG Character Screen (tap level badge, stack push), Add Person bottom sheet (modal), Log Quality Time bottom sheet (modal)
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Domain Header, SIA Coaching Note, FAB), Screen 32 — Career Dashboard (Domain Header, SIA Note), Screen 34 — Spirituality Dashboard (Domain Header, SIA Note, streak tracking pattern). All domain dashboards share header and SIA note patterns.
- **Patterns used**: Domain Dashboard Header, SIA Coaching Note Card, FAB with scroll-hide, Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model, Bottom Sheet Modal
- **Patterns established**: Person Row (avatar + name + relationship + last interaction), AI Reminder Card (swipeable, with warning icon and action states), Quality Time Log Entry, SIA Suggestion Card (with "do it"/"skip" inline actions), Upcoming Date Row (with countdown urgency states), Add Person Bottom Sheet, Log Quality Time Bottom Sheet, Quick-Log Quality Time Sheet (minimal structured logging bottom sheet)
