# Screen Design: Career & Work Dashboard

**Screen**: 32 of 43
**File**: 32-career-work-dashboard.md
**Register**: Product Mode
**Primary action**: complete career action
**Tab**: Me (accessed via Explore or SIA deep-link)
**Navigation**: Stack depth 2–3 from Me tab root (Me → Explore → Career Dashboard). Also reachable via SIA deep-link.

---

## Purpose

The career dashboard is where users track professional growth — active career goals, AI-suggested skill-building actions, networking prompts, and upcoming work deadlines. SIA acts as a career coach, connecting professional development to other life domains ("Your productivity peaks after morning workouts — schedule deep work for 10am"). Unlike the finance dashboard (data-dense, Mint-like), this screen is action-oriented: the primary interaction is reviewing and completing AI-suggested career actions.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Domain header with indigo accent and career level
2. SIA career coaching note — cross-domain professional insight
3. Active career goals with progress rings
4. AI-suggested actions — skill-building tasks, networking prompts, professional development items
5. Growth trajectory — skills inventory visualization
6. Upcoming career deadlines/tasks

**User flow**:
- **Arrives from**: Explore section (screen 18) via stack push, or SIA deep-link in chat (screen 09)
- **Primary exit**: Goal Detail (screen 14) for career-specific goals, via stack push
- **Secondary exits**: SIA tab (tap SIA note or "ask SIA for career advice"), Create/Edit Goal (screen 15, via "add career goal")

---

## Layout

**Scroll behavior**: ScrollView (content spans ~2 viewport heights)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────┐
│  Status Bar (44pt)              │
├─────────────────────────────────┤
│  ← Career & work     Lv.5  ⚡  │  Domain Header (56pt)
│     indigo accent bar           │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟣 SIA                     │ │  SIA Coaching Note (~72pt)
│ │ "Your productivity peaks    │ │
│ │  after morning workouts.    │ │
│ │  Schedule deep work for     │ │
│ │  10am?"                     │ │
│ └─────────────────────────────┘ │
│                                 │
│  active goals                   │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ◎ Get promoted to senior    │ │  Goal Card (~72pt each)
│ │   3 of 8 actions done  38% │ │
│ │   Next: update portfolio    │ │
│ ├─────────────────────────────┤ │
│ │ ◎ Learn Python basics       │ │
│ │   12 of 20 actions    60%  │ │
│ │   Next: complete chapter 5  │ │
│ └─────────────────────────────┘ │
│                                 │
│  suggested actions              │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ ☐ Reach out to mentor       │ │  Action Card (~56pt each)
│ │   networking · +15 XP       │ │
│ ├─────────────────────────────┤ │
│ │ ☐ Review quarterly goals    │ │
│ │   planning · +20 XP         │ │
│ ├─────────────────────────────┤ │
│ │ ☐ Read 1 chapter of "Deep  │ │
│ │   Work" · skill · +10 XP   │ │
│ └─────────────────────────────┘ │
│                                 │
│  growth trajectory              │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │  Skills snapshot             │ │  Skills Card (~140pt)
│ │  ┌────┐ ┌────┐ ┌────┐      │ │
│ │  │Lead│ │Tech│ │Comm│      │ │  Skill pills
│ │  │ 7  │ │ 5  │ │ 8  │      │ │
│ │  └────┘ └────┘ └────┘      │ │
│ │  "Communication is your     │ │
│ │   strongest area."          │ │
│ └─────────────────────────────┘ │
│                                 │
│  upcoming                       │  Eyebrow (16pt)
│ ┌─────────────────────────────┐ │
│ │ 📅 Performance review       │ │  Deadline Row (~48pt each)
│ │    Jun 15 · 26 days away    │ │
│ ├─────────────────────────────┤ │
│ │ 📅 Project deadline         │ │
│ │    May 28 · 8 days away     │ │
│ └─────────────────────────────┘ │
│                                 │
│         (64pt bottom padding)   │
├─────────────────────────────────┤
│  Today | SIA | Goals | Me      │  Tab Bar
└─────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Domain Header** — 56pt
   - Purpose: Domain identification with RPG level
   - Content: Back chevron, "Career & work" title (20pt Sora Semibold), level badge ("Lv.5"), XP icon, 2pt indigo (#6366F1) accent line at bottom

2. **SIA Coaching Note** — ~72pt
   - Purpose: Cross-domain career insight
   - Content: Purple left bar (3pt), SIA avatar indicator (16pt), coaching message, "ask SIA →" link

3. **Active Career Goals** — ~144pt (2 goals shown)
   - Purpose: Current career objectives with progress
   - Content: Goal cards with progress ring, completion count, next action preview

4. **AI-Suggested Actions** — ~168pt (3 actions shown)
   - Purpose: Actionable career tasks from SIA
   - Content: Checkbox + action description + category tag + XP reward

5. **Growth Trajectory / Skills Card** — ~140pt
   - Purpose: Skills inventory visualization
   - Content: Skill level pills, SIA assessment summary

6. **Upcoming Deadlines** — ~96pt (2 items shown)
   - Purpose: Time-sensitive career events
   - Content: Calendar icon, event name, date, days-away countdown

---

## Components

### Career Goal Card
- **Purpose**: Shows a career goal with progress and next action
- **Data source**: Goals API (filtered by career domain)
- **Visual treatment**: Inside a card container (ink-brown-800, 20pt border-radius). Left: compact progress ring (32pt diameter, orange fill against white at 10% track, percentage in center in 11pt Sora Bold). Right: goal name (16pt Sora Semibold, white), completion count + percentage (13pt Sora Regular, white at 50%), next action (15pt Sora Regular, orange — tappable). Indigo domain tag chip (tiny, top-right corner if needed for multi-domain goals). Cards separated by 1pt divider (white at 5%).
- **Variants**: Active (standard), near-complete (>80% — green progress ring), stalled (no actions completed in 7+ days — SIA flag: "Need help with this?"), completed (green checkmark, full ring)
- **Gestures**: Tap card → push to Goal Detail (screen 14). Tap next action text → push to specific action within Goal Detail.
- **Size**: Full-width - 32pt × ~72pt per goal

### AI Action Card
- **Purpose**: Suggested career action from SIA, completable inline
- **Data source**: SIA AI engine (career action suggestions)
- **Visual treatment**: Inside a card container. Each row: left — checkbox (24pt, circular, 2pt stroke white at 30% default). Center — action description (15pt Sora Regular, white). Below description: action type tag (11pt Sora Semibold, uppercase, white at 40%) + XP reward (13pt Sora Semibold, orange, "+15 XP"). Rows separated by 1pt divider (white at 5%).
- **Variants**: Uncompleted (standard), completed (checkbox filled orange with white check, text strikethrough at 50% opacity, XP earned animation), skipped (dimmed, "skipped" label), AI-generated note visible ("SIA suggested this because...")
- **Gestures**: Tap checkbox → mark complete (XP earned animation). Tap action text → expand for details or SIA explanation. Swipe left → skip action. Long-press → options (reschedule, modify, ask SIA why).
- **Size**: Full-width - 32pt × ~56pt per action

### Skills Snapshot Card
- **Purpose**: Visual representation of career skill levels
- **Data source**: User profile (skills inventory), SIA AI (skill assessment)
- **Visual treatment**: Card container (ink-brown-800, 20pt border-radius, 16pt padding). Row of skill pills: each pill is a rounded rectangle (--r-lg, 20pt) with skill name (13pt Sora Semibold, white) and level number below (20pt Sora Bold, white). Background of each pill: indigo (#6366F1) at 15% opacity. Skill levels are numbers (1-10 scale). Below pills: SIA assessment line (15pt Sora Regular, white at 70% — e.g., "Communication is your strongest area."). Max 4-5 skills visible, horizontal scroll for more.
- **Variants**: Populated (skills assessed), new user (no skills assessed — SIA prompt: "Tell me about your professional skills and I'll track your growth"), single skill (early stage)
- **Gestures**: Tap skill pill → expand to show level history and SIA recommendations for improvement. Horizontal scroll for additional skills.
- **Size**: Full-width - 32pt × ~140pt

### Deadline Row
- **Purpose**: Time-sensitive career events and deadlines
- **Data source**: Goals API (deadlines), Calendar sync (if connected), user-entered
- **Visual treatment**: Inside a card container. Each row: calendar icon (20pt, indigo tint), event name (16pt Sora Semibold, white), date + days-away countdown (13pt Sora Regular, white at 50%). Countdown changes to orange when < 7 days, red when < 3 days. Rows separated by 1pt divider (white at 5%).
- **Variants**: Far (>7 days — neutral countdown), approaching (3-7 days — orange countdown), urgent (< 3 days — red countdown, bold text), past (strikethrough, 50% opacity)
- **Gestures**: Tap row → push to Goal Detail (screen 14) for the associated goal, or expand inline with more detail. Long-press → edit/reschedule.
- **Size**: Full-width - 32pt × ~48pt per row

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Next action text (goal cards) | #FF5E00 | Burnt Orange | 60% — tappable action |
| Progress ring fill | #FF5E00 | Burnt Orange | 60% — progress indicator |
| XP reward text | #FF5E00 | Burnt Orange | 60% — reward indicator |
| Completed checkbox fill | #FF5E00 | Burnt Orange | 60% — active/completed state |
| Approaching deadline text (<7d) | #FF5E00 | Burnt Orange | 60% — urgency |
| Near-complete goal ring | #34A853 | Forest Green | 30% — nearing success |
| Completed goal checkmark | #34A853 | Forest Green | 30% — success |
| XP earned animation | #34A853 | Forest Green | 30% — reward confirmation |
| SIA note left bar | #7F24FF | Royal Purple | 10% — SIA indicator |
| SIA avatar indicator | #7F24FF | Royal Purple | 10% — SIA identity |
| Domain header accent line | #6366F1 | Indigo | Domain color — identification |
| Domain level badge XP icon | #6366F1 | Indigo | Domain color — identification |
| Skill pill backgrounds | #6366F1 15% | Indigo at 15% | Domain color — identification |
| Calendar icon tint | #6366F1 | Indigo | Domain color — identification |
| Urgent deadline text (<3d) | #f44336 | Red | Warning/urgency |
| Background | #0A0A0F | ink-900 | Neutral base |
| Card surfaces | #211008 | ink-brown-800 | Neutral elevated |
| Primary text | #FFFFFF | White 100% | Headings, names |
| Secondary text | #FFFFFF B3 | White 70% | Descriptions, values |
| Tertiary text | #FFFFFF 80 | White 50% | Meta, captions, timestamps |

**60/30/10 verification**: Orange on interactive actions (next action links, checkboxes, XP text, approaching deadlines, progress rings). Green on success states (completed goals, earned XP). Purple limited to SIA note elements (2). Indigo only on domain identification (header, skill pills, calendar icons). Ratio holds.

---

## Interaction States

### Career Goal Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard card with progress ring | — |
| Pressed | scale(0.98), background lightens to white at 5% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Skeleton shimmer on ring and text | — |
| Error | N/A | — |
| Success | Green glow (600ms) when goal completed | success notification |

### AI Action Checkbox
| State | Visual | Haptic |
|-------|--------|--------|
| Default | 24pt circle, 2pt stroke white at 30% | — |
| Pressed | Circle fills partially (scale pulse) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Spinner in checkbox area (during server sync) | — |
| Error | Red ring flash (sync failed, retry) | error notification |
| Success | Fill animation (white → orange), white checkmark appears, XP floats up (+15 XP), text strikethrough | success notification |

### Skill Pill
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Indigo 15% background, white text | — |
| Pressed | scale(0.97), background opacity increases to 25% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity | — |
| Loading | Shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Deadline Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard appearance | — |
| Pressed | Background lightens to white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | — |
| Disabled | 0.5 opacity (past deadline) | — |
| Loading | Skeleton shimmer | — |
| Error | N/A | — |
| Success | N/A | — |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Tap | Career goal card | Push to Goal Detail (screen 14) |
| Tap | Next action text | Push to Goal Detail (action focused) |
| Tap | Action checkbox | Toggle completion, earn XP |
| Tap | Action text | Expand for details / SIA explanation |
| Tap | Skill pill | Expand skill detail |
| Tap | Deadline row | Push to Goal Detail or expand inline |
| Tap | SIA coaching note | Navigate to SIA tab |
| Tap | Domain level badge | Push to RPG Character Screen (screen 19) |
| Swipe left | Action card | Skip action |
| Long-press | Action card | Options (reschedule, modify, ask SIA why) |
| Long-press | Deadline row | Edit/reschedule |
| Pull-to-refresh | Entire ScrollView | Refresh all career data |
| Swipe right from edge | Screen | iOS back gesture |
| Horizontal scroll | Skills row | View additional skills |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Domain header | Screen enter | Fade-in + translateY(8pt→0) | 280ms | ease-out-soft |
| SIA coaching note | Screen enter | Fade-in + translateY(12pt→0), stagger 80ms | 280ms | ease-out-soft |
| Goal cards | Screen enter | Staggered fade-in, 80ms apart | 280ms each | ease-out-soft |
| Progress rings | After goal card enters | Ring fill animates from 0 to actual % | 520ms | ease-flow |
| Action cards | Scroll into view | Staggered fade-in, 60ms per card | 280ms each | ease-out-soft |
| Checkbox completion | Tap | Fill animation (circle collapses inward to filled) | 280ms | ease-out-soft |
| XP float | After checkbox complete | "+15 XP" floats upward 24pt + fades out | 520ms | ease-flow |
| Action strikethrough | After checkbox complete | Opacity 100% → 50%, strikethrough line draws | 280ms | ease-out-soft |
| Skills card | Scroll into view | Fade-in, pills stagger 60ms each | 280ms | ease-out-soft |
| Deadline rows | Scroll into view | Staggered fade-in | 280ms each | ease-out-soft |
| Pull-to-refresh | Pull release | Branded Balencia symbol appears, rotates. Release haptic: medium impact. | 280ms (entry) | ease-out-soft |

**Screen transition**:
- **Enter**: Stack push — slide in from right (280ms, ease-out-soft)
- **Exit**: Stack pop — slide out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- SIA coaching note: "Let's map out your career path. What are you working toward professionally?"
- Active goals: "No career goals yet." Orange "add a career goal" button. SIA suggestion chips: "get promoted", "learn a new skill", "switch careers", "improve work-life balance".
- Suggested actions: SIA generates 2-3 starter actions based on onboarding data (e.g., "Write down your top 3 professional strengths").
- Skills snapshot: "Tell SIA about your skills to start tracking your growth." Single orange "get started" button that navigates to SIA with career context.
- Upcoming deadlines: Section hidden (no data to show).

### Established user (zero state)
- All actions completed: "All caught up. SIA will suggest new actions tomorrow." Green checkmark illustration. SIA note: "Great momentum this week."
- No upcoming deadlines: Section hidden.

---

## Motivation Adaptation

- **Low motivation**: Only SIA note + top 1 goal + top 2 actions shown. Skills and deadlines sections hidden. SIA tone: "Here's one thing you could do for your career today."
- **Medium motivation**: Default experience. 2 goals, 3 actions, skills visible, 2 deadlines.
- **High motivation**: All goals shown (no "view all" cap). All actions shown with additional detail (SIA reasoning visible inline). Skills card shows historical trend (level 3 → 7 over 6 months). Deadlines section expanded with preparation suggestions from SIA.

---

## Cross-References

- **Navigates to**: Screen 14 — Goal Detail (tap career goal, stack push), Screen 15 — Create/Edit Goal (tap "add career goal", modal), Screen 09 — SIA Chat (tap SIA note, tab switch), Screen 19 — RPG Character Screen (tap level badge, stack push)
- **Navigates from**: Screen 18 — Explore Section (stack push), Screen 09 — SIA Chat (deep-link, stack push)
- **Shared components with**: Screen 30 — Finance Dashboard (Domain Header, SIA Coaching Note patterns), Screen 33 — Relationships Dashboard (Domain Header, SIA Note, action-oriented layout), Screen 34 — Spirituality Dashboard (Domain Header, SIA Note). All domain dashboards share these patterns.
- **Patterns used**: Domain Dashboard Header, SIA Coaching Note Card, Bottom Tab Bar, Stack Navigation, Back Button, 8-State Interaction Model
- **Patterns established**: Career Goal Card (with progress ring and next action), AI Action Card (checkbox + description + XP), Skills Snapshot Card (skill level pills), Deadline Row (countdown timer with urgency states), XP Float Animation (earned XP rising and fading)
