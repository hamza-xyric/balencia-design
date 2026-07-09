# Scope Authority: TODAY & MISSIONS Hi-Fi Design Build (BIOS-004)

**Source document:** Hi-fi design authority for today-missions parity verification.  
**Generated:** 2026-07-09  
**Authority:** Balencia-New-Screens/ master ledger, hi-fi specs, canon, component catalog.

---

## 1. Master Ledger Screen Inventory

### TODAY Home Family (Batch 5)

| ID | Output | Status | Grade | Source | Route(s) |
|---|---|---|---|---|---|
| 12 | 12-home-screen | PASS | 14/14 | spec 12-* | `/dashboard`, `/activity-status` |
| 45 | 45-daily-checkin | PASS | 14/14 | spec 45-* | `/wellbeing/emotional-checkin` |
| 41 | 41-schedule-calendar | PASS | 14/14 | spec 41-* | `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]` |
| 61 | 61-reminders-tasks | PASS | 14/14 | spec 61-* | No live route; modal from Home/Schedule/Me/Chat |
| 93 | 93-mood-trends | PASS | 14/14 | NEW /wellbeing/mood | `/wellbeing/mood` |

**Source hierarchy note:** All specs in `Balencia-New-Screens/hifi-screens/` have been repaired and re-validated as of 2026-07-07 per the single-writer remediation protocol (MASTER-LEDGER.md run log).

### MISSIONS Family (Batch 6)

| ID | Output | Status | Grade | Source | Route(s) |
|---|---|---|---|---|---|
| 13 | 13-goals-list | PASS | 14/14 | spec 13-* | `/goals` |
| 14 | 14-goal-detail | PASS | 14/14 | spec 14-* | No live route; modal from 13 or 12 |
| 15 | 15-create-edit-goal | PASS | 14/14 | spec 15-* | No live route; modal from 13 or 14 |
| 73 | 73-mission-journal | PASS | 14/14 | spec 73-* | No live route; modal from 13 or 19 or 17 |
| 42 | 42-celebration-overlay | PASS | 14/14 | spec 42-* | `/subscription/success` (primary); modal from mission/streak/level events |

**RPG terminology:** In Balencia nomenclature, *Goals* are *Missions* (CLAUDE.md section "RPG Terminology"). Screen 13 (goals-list) is the Mission Board. Screens 14–15 are mission-detail and mission-create. Screen 42 (celebration-overlay) is the completion moment. Screen 73 (mission-journal) is the retrospective.

---

## 2. TODAY Home Family: Full Spec Synthesis

### Screen 12: Home Screen

**Spec path:** `Balencia-New-Screens/hifi-screens/12-home-screen.md`

**Composition (per ASCII wireframe):**
```
Header: menu, greeting "Good Morning, Amira", Level 14

Section 1: CIA Coach Card (GlassCard.hero, glow-cia)
- Copy: "What needs your *attention* today?"
- Three mood selector chips: [steady] [low] [wired]

Section 2: Vital Metrics (3×GlassStatCard)
- Heart Rate: 72 bpm (via WHOOP)
- Step Count: 8.2k (you log)
- Sleep: 7.5h (Health)

Section 3: Feature Carousel (ChipDomainTag row)
- Six domain pills: [Nutrition] [Fitness] [Wellbeing] [Finance] [Career] [Learning]
- "View All" link routes to `/life-areas`

Section 4: Today's Actions (MomentumBar + SolidCard list)
- Three action rows with checkboxes and domain tags
- MomentumBar shows cumulative daily progress (orange fill)

Section 5: Pinned Missions (ProgressRing × 2)
- Mission 1: 68% complete
- Mission 2: 42% complete

Persistent: FABQuickLog (global quick-log for water/meal/mood) + GlassNavBar
```

**Key Components:**
- `TopBar`: menu, greeting, level
- `CIAInsightCard`: preamble card with mood selector (NEW: mood-chips as optional coach mood calibration)
- `GlassStatCard` ×3: metrics with `ChipProvenance`
- `GlassCard`: feature carousel container
- `ChipDomainTag` ×6: domain carousel
- `MomentumBar`: daily action fill (cumulative progress framing)
- `ProgressRing` ×2: mission progress indicators (orange until arrival)
- `FABQuickLog`: floating action button (water/meal/mood)
- `GlassNavBar`: bottom nav (Today / CIA / Goals / Me)
- `SafetyResourceCard`: reachable from mood quick-actions
- `SyncStatus`: source freshness indicator

**Data Honesty States:**
- **Life balance (constellation radar hero, optional expansion):** real score + domain count; low-confidence ghosted; honest-null "Building your balance - 3 more days"
- **Vitals:** value + provenance (via WHOOP / via Health / you logged / estimated · low confidence)
- **Schedule:** source chip `via calendar`; offline state "showing last sync 2h ago"
- **CIA claims:** require ≥2 evidence chips; otherwise hidden or single-signal note

**Consent & Safety:**
- All health/mood/calendar chips open Data Controls sheet (source, scope, retention, revoke, delete)
- Mood/check-in exposes SafetyResourceCard and crisis resources
- Header targets: notifications → `/notifications`, search → SearchOverlay [68], View All → `/life-areas`

**States:** Default, Skeleton, Empty (day 1), Error/offline, Success (action completion + green check + optional XPToast), Disabled (dimmed sources)

**Motion:**
- Radar draws (stroke-first), dots stagger, hub counts up
- MetricCard sparklines draw
- MomentumBar fills
- Pull-to-refresh triggers branded refresh state
- Reduced-motion: final constellation + opacity-only feedback

---

### Screen 45: Daily Check-in (Morning / Evening)

**Spec path:** `Balencia-New-Screens/hifi-screens/45-daily-checkin.md`

**Composition (half-height sheet modal):**
```
Header: Cancel, title "evening check-in" (or "morning check-in")

Section 1: CIA Presence & Greeting (CIAPresenceOrb + greeting text)
- Purple breathing orb in atmosphere
- Copy: "Good *evening*. Let's close out your day. Two minutes. How did it go."
- Streak card: "Day 14 checking in"

Section 2: Mood Selection (MoodEmojiPicker NEW, SolidCard)
- 5 emoji cells (horizontal row)
- Selected = orange 1.5px ring + glow-you bleed
- Optional context row: "what's this about?" with ChipDomainTag

Section 3: Energy & Stress Sliders (Slider ×2, SolidCard)
- Energy: low ←→ high (1-10)
- Stress: calm ←→ high (1-10)
- Tabular-nums value bubble on each

Section 4: Reflection / Intention (GlassPillInput multiline)
- Prompt: "how today went"
- Free-form text entry

Section 5: Tomorrow Insight (evening only; CIAInsightCard, glow-cia)
- Copy: "You tend to feel *calmer* on days you train in the morning."
- Evidence: ChipDomainTag pair [Mental/Wellbeing] [Fitness]
- Actions: BtnCoach "See the pattern" + BtnGhost "Not now"

Section 6: Safety (SafetyResourceCard, solid no-glow)
- Crisis resources always reachable
- Copy: "You're not alone. View support."

Footer: BtnPrimary "Save check-in"
```

**Key Components:**
- `Sheet`: half/full-height modal backdrop
- `CIAPresenceOrb`: passive breathing state (4s ease)
- `StreakCard`: "Day 14" + flame glyph (replaces plain chip)
- `SolidCard` ×2: mood card, energy/stress card
- `MoodEmojiPicker`: NEW—5-cell horizontal emoji picker, 44px targets
- `ChipDomainTag`: optional context tag
- `Slider` ×2: energy & stress with labeled ends + 10-step snaps
- `GlassStatCard` (sparkline variant): 7-day mood/energy trend (high density only)
- `GlassPillInput`: multiline reflection text
- `CIAInsightCard`: Tomorrow card (evening only) with cross-pillar evidence
- `IntelligenceTimeline`: compute trace with purple dot pulse
- `ConfidenceMeter`: low-confidence insight indicator
- `SafetyResourceCard`: crisis resources (solid card, no glow, no gamification)

**Data Honesty States:**
- **Mood:** real (selected, glow-you) / low-conf (N/A—direct input) / honest-null (dashed outline, "Select a mood to save")
- **Energy & Stress:** real (slider set 1-10) / low-conf (N/A) / honest-null (ghosted track, "Slide to set")
- **Intention:** real (user text) / low-conf (N/A) / honest-null (empty, optional field)
- **Tomorrow insight:** real (generated, glow-cia) / low-conf (muted with ConfidenceMeter) / honest-null (card omitted, no filler)
- **Trend sparkline:** shows 7 days if available; omitted on day 1

**Consent & Safety:**
- Privacy-first language throughout
- SafetyResourceCard always visible; never buried
- Mood, journal, voice, health context, tone analysis, CIA inference all expose opt-in/opt-out + revoke + export + delete

**States:** Default, Skeleton (shimmer blocks matching real geometry), Empty/cold-start (trend omitted, mood cells 15% larger to invite tap), Loading (Tomorrow insight only—IntelligenceTimeline staged captions), Error (quiet ErrorState, input preserved), Success (BtnPrimary→BtnSuccess 600ms hold, sheet springs down, toast), Disabled (save at 40% until mood selected), Offline ("Save locally" relabel, local persistence framing)

**Motion:**
- Sheet: spring in 520ms (half) / 580ms (full), content cards stagger fade+translateY 200ms each
- MoodEmojiPicker: tap scale .98 + ring draw 150ms + light haptic
- Slider: thumb 1:1 finger tracking, each tick = light haptic
- ChipDomainTag: 150ms fade + scale .98 on toggle
- CIAPresenceOrb: idle breathe 4s ease
- IntelligenceTimeline: captions fade 200ms, hold 600ms, dot pulse 800ms loop
- Save confirmation: label/fill crossfade 200ms, hold 600ms, sheet spring 380ms
- Reduced-motion: sheet 150ms crossfade (no spring/stagger), skip scale/ring, static glow, timeline collapses instant

---

### Screen 41: Schedule / Calendar

**Spec path:** `Balencia-New-Screens/hifi-screens/41-schedule-calendar.md`

**Composition (day/week/month view switcher):**
```
Header: TopBar with title "Schedule", sync chip, plus action (→ Sheet: add event or task)

Section 1: View Control (SegmentedTabs)
- Tabs: [day] [week] [month] (default: day)

Section 2: Date Navigation (CalendarStrip)
- 7-day horizontal scroller
- Today ringed orange
- Completed-action days get green dot

Section 3: Today-at-a-Glance (SolidCard)
- Left: ScheduleDonut (multi-domain conic-gradient arc)
  - Breakdown by domain color (Career, Fitness, Nutrition, etc.)
  - Real: "Career 1h 30m" + "via Google Calendar"
  - Low-conf: faded arcs + "estimated · low confidence"
  - Honest-null: ghosted ring + "nothing scheduled yet"
- Right: ChargeMeter (day fullness / room to breathe)
  - Real: 4h 30m of 16h waking window + "via sleep schedule"
  - Low-conf: N/A (time totals are real or honest-null, never estimate)
  - Honest-null: empty track + "room to breathe today"

Section 4: CIA Suggestion (CIAInsightCard optional, glow-cia dashed purple border)
- Copy: "some open time this afternoon for a short walk"
- Actions: BtnCoach "see it" (scrolls to slot) + BtnGhost "dismiss"

Section 5: Unscheduled Tasks (ListRow interactive list, SolidCard)
- Drag handles (44px targets)
- Reorderable backlog items

Section 6: Timeline Grid (TimelineGrid NEW + EventCard blocks)
- Vertical hour gridlines (9 AM → 3 PM visible range)
- EventCard blocks positioned absolutely in hourly containers
  - Synced events: solid border + ChipProvenance "via Google Calendar"
  - CIA-suggested: dashed purple border
  - Missed: neutral paper-16% dashed border (non-alarming) + "Missed - reschedule"
  - 3px leading accent bar in event's domain color

Persistent: GlassNavBar (omitted in detail)
```

**Key Components:**
- `TopBar`: transparent → glass-pill on scroll
- `SegmentedTabs`: day/week/month switcher
- `CalendarStrip`: 7-day scroller with today ring + completion dots
- `SolidCard`: container for donut + meter
- `ScheduleDonut` (NEW): multi-stop conic-gradient for domain time-split (replaces plain ring)
- `ChargeMeter`: corrected from draft's MomentumBar (day fullness = depletable capacity, not cumulative progress)
- `CIAInsightCard`: purple glass, spark glyph, Tiempos italic, evidence pair, actions
- `ListRow`: unscheduled backlog items with drag handle
- `TimelineGrid` (NEW): hour-gridline layout primitive (not a chart; plain rgba gridlines)
- `EventCard` (NEW): 16px radius (in-between 14-input and 28-card), solid/dashed/neutral borders by provenance
- `ConsentCard`: Google Calendar consent flow (cold-start state)
- `OfflineBanner / SyncStatus`: staleness-labeled sync state
- `ErrorState`: quiet failed-event-load pattern
- `SkeletonState`: shimmer matching real geometry

**Data Honesty States:**
- **Domain split (ScheduleDonut):** real (Career 1h 30m, Fitness 45m, "via Google Calendar") / low-conf (faded, "estimated · low confidence") / honest-null (ghosted, "nothing scheduled yet")
- **Day fullness (ChargeMeter):** real (4h 30m of 16h, "via sleep schedule") / low-conf (N/A—time sum is exact or unknown) / honest-null (empty, "room to breathe today")
- **Sync/connection status:** connected ("synced 2m ago") / stale ("offline - showing last sync 2h ago") / revoked ("calendar not connected")

**Consent & Safety:**
- Visible sync chip opens calendar controls: provider, categories read, scope, last sync, wake-window source, retention, export, revoke, delete
- CIA suggestions name their source (calendar / wake-window / manual / none)
- Wake-window consent missing → day fullness renders honest-null

**States:** Default (day view, current date, solid events, dashed CIA suggestion, current-time card breathing orange), Overpacked (85%+ fullness → "a full one - protect some recovery"), Missed (dashed neutral border, "Missed - reschedule"), Skeleton, Empty/cold-start, Error, Success (scale .98→1.0, glow-done flash 250ms), Disabled (plus and pull-to-refresh disabled with reason in banner)

**Motion:**
- Physical easing: cubic-bezier(0.32, 0.72, 0, 1) for swipes
- Feedback (150-250ms): EventCards scale .98 on press; SegmentedTabs slide 150ms
- Glow behavior: current-time EventCard's glow-you breathes 55%→80% (4s loop); domain/fullness card glow static
- Choreography: TimelineGrid hairlines draw top-to-bottom; ScheduleDonut arcs sweep clockwise (both finish together)
- Haptics: light on segment switch; medium on drag-drop success
- Reduced-motion: swaps bypass instantly; current-event glow locked at 65% opacity (static, not animating)

---

### Screen 61: Reminders & Tasks

**Spec path:** `Balencia-New-Screens/hifi-screens/61-reminders-tasks.md`

**Composition (modal from Home/Schedule/Me/Chat):**
```
Header: TopBar with back & plus targets (44px)

Section 1: Today Completion Band (SolidCard + ProgressBar + KPIRow)
- Copy: "Today    6 of 9 done"
- ProgressBar: 67% filled (orange)
- KPIRow: "done 6" / "open 3" (two KPI units in one card)

Section 2: TODAY Task List (SolidCard rows)
- Rows with large CheckboxControl (44px tap area)
- Format: [ ] 9:30 Take medication [Health]
- Format: [ ] 12:45 Walk after lunch [Fitness]
- Format: [✓] 8:00 Check resting HRV

Section 3: UPCOMING Group (SectionHeader + ListRow)
- "Tomorrow book lab follow-up"

Section 4: ACTIVE REMINDERS Roll-up (ListRow × toggle)
- "medication reminder     on ⊙" (Toggle)
- "wind-down reminder       off ⊙" (Toggle)
- Counter: "3 of 4" on

Section 5: COMPLETED TODAY Collapse (SectionHeader + collapsed)
- Hides completed entries by default

Section 6: CIA Suggestion (CIAInsightCard optional, glow-cia)
- Copy: "A five-minute stretch fits before your appointment."
- Actions: BtnGhost "Add" + BtnGhost "Ask CIA"

Persistent: GlassNavBar, plus-action Sheet for create/edit
```

**Key Components:**
- `TopBar`: back (44px), plus (44px)
- `SolidCard` ×2: completion band, dense task groups
- `ProgressBar`: today's ratio (8px, radius 999, orange fill)
- `KPIRow`: "done" and "open" mini-stats (hairline dividers, per-stat provenance)
- `ListRow`: tasks, upcoming, completed, reminders
- `CheckboxControl` (NEW): large tap-target checkbox (44px), green success check only after completion
- `Toggle`: active reminder on/off switches (44px target)
- `ChipDomainTag`: category labels on tasks
- `ChipProvenance`: sync and CIA evidence
- `CIAInsightCard`: suggestion card (purple glow, evidence row)
- `Sheet`: create/edit task and create/edit reminder forms
- `OfflineBanner`, `ErrorState`, `SkeletonState`, `HonestNullState`

**Data Honesty States:**
- **Today completion ratio:** real (done/total, "via tasks sync") / low-conf (muted, "estimated · low confidence" while reconciling) / honest-null (band hidden until ≥1 task)
- **Done and open counts:** real (exact live, "via tasks sync") / low-conf (muted cached while offline sync pending) / honest-null ("--", "No tasks for today yet")
- **Task rows:** real (title, due time, domain, "you logged") / low-conf ("time may shift" when timezone unresolved) / honest-null (missing due time shown "unscheduled", never invented)
- **Active reminders roll-up:** real ("3 of 4 on" from toggles) / low-conf ("syncing reminder states") / honest-null ("No active reminders yet")
- **Reminder channels:** real (Push/Email/SMS chip only after consent, "you allowed") / low-conf (N/A—binary permission) / honest-null (chip hidden, "choose a delivery channel")
- **CIA suggestion:** real (with "via schedule + goals") / low-conf (dimmed + ConfidenceMeter) / honest-null (card omitted, no filler)

**Consent & Safety:**
- Source chips expose category, scope, freshness, retention, export, revoke, delete

**States:** Default, Skeleton, Empty, Error, Success (checkbox draws, row mutes, bar updates, count increments), Disabled (save at 40% until valid), Offline (cached lists interactive, writes queue, "saving when online" label)

**Motion:**
- Checkbox stroke draws before row slides to Completed
- Completion bar fills (draw-first, 520ms)
- FAB/plus sheet spring in
- CIA suggestion actions press-scale .98 (150-250ms)
- Haptics: light on completion, medium on reorder, success notification on offline sync
- Reduced-motion: all slides/fills/springs snap to final states; status changes still update text + haptics

---

### Screen 93: Mood Trends

**Spec path:** `Balencia-New-Screens/hifi-screens/93-mood-trends.md`

**Composition (longitudinal mood observatory):**
```
Header: TopBar with title "Mood", log & help glyphs

Section 1: Time Range Tabs (SegmentedTabs)
- [7D] [30D] [90D locked] [1Y locked]
- Locked ranges behind PaywallLock (premium)

Section 2: Today's Mood (GlassStatCard, glow-you)
- Display: "TODAY FEELS *STEADY*"
- KPI: "6 / 10"
- Provenance: "via check-in · Jul 7"

Section 3: Crisis Resources (SafetyResourceCard, solid no-glow)
- Copy: "You're not alone. View support."
- Actions: one-tap call/text/view local help

Section 4: Mood Trend Chart (TrendChart in SolidCard)
- Orange solid line: user mood (past)
- Dashed purple line: estimated context (projection/inference)
- Green dots: journal markers or completed check-in days
- Sparse data: dots only, no connecting line until ≥3 points
- Long-press: opens date/value/source/confidence pill (scrub tooltip)
- Gridlines: rgba(255,255,255,.05) (standard TrendChart)

Section 5: CIA Insight (CIAInsightCard optional, glow-cia)
- Copy: "mood has been higher on journal days in this window."
- Evidence: "4 check-ins, 3 entries"
- Actions: BtnCoach "Discuss patterns with CIA"

Section 6: Recent Log (ListRow group)
- "Jul 7 steady" / "Jul 6 low"
- Links to `/wellbeing/emotional-checkin` to re-log

Persistent: FABQuickLog (water/meal/mood), GlassNavBar
```

**Key Components:**
- `TopBar`: title, log glyph, help glyph
- `SegmentedTabs`: 7D / 30D / 90D / 1Y (locked ranges have PaywallLock overlay)
- `GlassStatCard`: today's mood card with Tiempos italic, glow-you, provenance chip
- `SafetyResourceCard`: crisis resources (solid, no glow, no gamification, always reachable)
- `TrendChart`: past orange line + projected dashed purple + green completion markers
- `CIAInsightCard`: mood-pattern insight (glow-cia, evidence row showing check-in/entry counts)
- `ConsentCard`: journal tone analysis, wearable context, CIA inference opt-in
- `SyncStatus`: mood data freshness
- `FABQuickLog`: global log entry (water/meal/mood)

**Data Honesty States:**
- **Today's mood:** real (check-in) / low-conf (journal tone inference) / honest-null (with "Log mood" CTA)
- **Trend:** needs ≥3 check-ins; 1–2 points = dots only, no line; fewer = honest-null
- **Journal overlay:** private entries hide detail but keep date marker
- **CIA pattern insight:** cautious wording for low-conf; no claim for honest-null
- **Correlation factors:** sleep, stress, energy, journal, nutrition appear as labeled overlays with confidence (never moralizing)
- **90D/1Y/advanced correlations:** behind PaywallLock (lock never obscures crisis access)

**Consent & Safety:**
- Mood, journal, voice notes, health context, tone analysis, CIA inference all expose opt-in/opt-out + revoke + export + delete
- SafetyResourceCard always visible before chart
- Log sheet includes skip option and support copy without pressure

**States:** Default, Skeleton (axes render without invented points), Empty (safety remains; honest-null invites mood log), Partial (sparse dots, no line until ≥3 data), Error (cached trend remains; source named), Success (log updates hero, adds green marker), Disabled (journal overlay / wearable context / CIA projection dims when consent revoked)

**Motion:**
- Chart axes draw first, line resolves, markers appear
- Scrub opens date/value/source/confidence pill
- Safety sheet opens instantly (no celebration)
- Reduced-motion: full chart renders instantly

---

## 3. MISSIONS Family: Full Spec Synthesis

### Screen 13: Mission Board (Goals List)

**Spec path:** `Balencia-New-Screens/hifi-screens/13-goals-list.md`

**Composition (mission control center):**
```
Header: TopBar with title "your missions", journal glyph, filter glyph (44px targets)

Section 1: Board Summary Band (3×GlassStatCard hero tiles + MomentumBar)
- Tile 1: ACTIVE count (e.g., 04 missions)
  - Provenance: "2h ago SYNC"
  - Real/low-conf/honest-null states
- Tile 2: DONE count (e.g., 12 missions completed today)
  - Provenance: "4h ago"
  - States: real / low-conf / honest-null
- Tile 3: STREAK (e.g., 07 days)
  - Provenance: "estimated · low confidence" (optional)
  - MomentumBar: [#######] XP progress to next tier

Section 2: Status Tabs + Filter Chips (SegmentedTabs + filter row)
- Tabs: ( active ) ( done ) ( all )
- Filter row: ( all ) ( life ) ( main ) ( side )
- Allows mix-and-match filtering

Section 3: Life Areas Constellation Radar (ConstellationRadar NEW + text label)
- Real-data viz polygon mapping domain stats (Fitness, Finance, etc.)
- Companion text: "LIFE AREAS *Whole*-life map"
- Right column displays the radar as a data viz, left shows text label

Section 4: PINNED Missions (SolidCard list)
- Rows with ProgressRing embedded
- Each mission shows: [#] Title [completion progress ring]
- Example: [#] Morning Sunlight [progress]
- Example: [#] Finalize Q3 Report [progress]

Section 5: Stacked Missions Below (SolidCard continued)
- Additional pinned and active missions

Persistent: FABQuickLog, GlassNavBar (Today / CIA / [Goals +] / Me)
```

**Key Components:**
- `TopBar`: title, journal, filter glyphs (44px)
- `GlassStatCard` ×3: ACTIVE, DONE, STREAK counts (hero metric/ring/sparkline variants)
- `MomentumBar`: daily XP tracking inside summary band
- `SegmentedTabs`: status control (active/done/all)
- `ChipDomainTag`: scope filters and mission tagging
- `GlassCard` (variant interactive): radar container
- `ConstellationRadar` (NEW): real-data viz mapping domainStats polygon (replaces decorative polygon)
- `SolidCard`: mission list rows (data-dense requirement)
- `ProgressRing`: embedded in mission cards (stroke 6-8px, orange→green at 100%)
- `HonestNullState`: missing metric/sparkline data
- `Sheet` (variant action): quick-actions menu and domain filter sheet
- `FABQuickLog`: global logging CTA
- `GlassNavBar`: bottom nav (Today / CIA / Goals + / Me)

**Data Honesty States:**
- **Active Count:** real (04, "via missions sync") / low-conf (04 at 64%, "estimated · low confidence") / honest-null ("--", "Not enough data yet - 3 more days")
- **Done Today:** real (12, "you logged") / low-conf (12 at 64%, "estimated · low confidence") / honest-null ("--", "Not enough data yet - 3 more days")
- **Streak Days:** real (07 days) / low-conf (muted estimate if partial) / honest-null ("Not yet tracked")

**Consent & Safety:**
- Source chips expose category, source, scope, freshness, retention, export, revoke, delete

**States:** Default (full layout), Skeleton (shimmer + ghost radar axes), Empty/day-1 (centered Display copy "No missions yet. Start with what matters most to you - *CIA* can help." + BtnPrimary + 3 ChoiceCardFrost starters), Filtered empty (list collapses, "No missions here yet"), Error (cached preserved, ErrorState banner), Success (green sweep on ProgressRing when inline action checked), Disabled (FAB and filters at 40% when offline/syncing)

**Motion:**
- Board Summary Band fills L→R (250ms)
- Radar draws in (250ms)
- Mission cards cascade downward (80ms stagger)
- Glow behavior: hero tiles breathe (4s pulse) to anchor focal point
- FAB hides on downward scroll, reappears on upward
- Haptics: light on checkbox completion, medium on filter segment change
- Reduced-motion: cascades bypass to final states; glows freeze at static luminosity

---

### Screen 14: Mission Detail

**Spec path:** `Balencia-New-Screens/hifi-screens/14-goal-detail.md`

**Composition (modal from board or home; progressive disclosure):**
```
Header: TopBar with back chevron, title on scroll, pin toggle, edit glyph (44px targets)

Section 1: Hero Ring (ProgressRing, glow-you, 8px stroke, sweeps on mount)
- Center KPI: "72%"
- Track: rgba(255,255,255,.08)
- Optional ConfidenceMeter (purple, low-conf state)

Section 2: Mission Identity (Display 34 hero + ChipDomainTag ×2)
- Display text: "Hyrox Relay Prep"
- Domain tags: [Fitness] [Mental] (tappable → domain dashboards)

Section 3: KPI Row (3 inline mini-stats, SolidCard, glow-you)
- "Actions: 12 (you logged)"
- "Streak: 8 (you logged)"
- "XP: 450 (system)" — provenance chips per stat, hairline dividers

Section 4: CIA Insight (CIAInsightCard, glow-cia)
- Copy: "Three tempo runs this week, each faster than the last. This is what *momentum* looks like."
- Evidence: "via WHOOP pace"
- Actions: BtnGhost "Ask CIA →"

Section 5: Next Action (ActionCheckCard NEW, SolidCard, glow-you)
- Checkbox + title in one tap-target
- Copy: "( ) 20-min easy run - tomorrow"
- Sub-copy: "tap the circle to mark done"

Section 6: Five Expandable Accordion Sections (SectionHeader + ExpandableList NEW)
- [+] ALL ACTIONS - list of sub-tasks
- [+] MILESTONES - major checkpoints
- [+] CIA REASONING - IntelligenceTimeline trace
- [+] CROSS-DOMAIN LINKS - related missions/dashboards
- [+] PROGRESS OVER TIME - TrendChart solid orange + dashed purple

Persistent: GlassNavBar (omitted from spec for clarity)
```

**Key Components:**
- `TopBar`: back (44px), pin, edit; glass-pill after scroll
- `ProgressRing`: hero, stroke 8px, tabular-nums center, track rgba
- `ConfidenceMeter`: low-conf state indicator (purple)
- `ChipDomainTag` ×2: tappable to dashboards
- `KPIRow`: 3 inline mini-stats, hairline dividers, per-stat provenance
- `CIAInsightCard`: spark glyph, Tiempos italic word, evidence, BtnGhost "Ask CIA"
- `ActionCheckCard` (NEW): SolidCard with large tap checkbox + title (replaces separate button)
- `SectionHeader` + `ExpandableList` (NEW): accordion wrapper (SectionHeader trigger + SolidCard pane, spring 200ms)
- `TrendChart`: solid orange user line, dashed purple projection, green milestone dots
- `IntelligenceTimeline`: staged trace in CIA Reasoning section
- `ListRow`: cross-domain links, stalled-mission sheet options
- `Sheet` (variant action): stalled-mission "see options" surface (4 ListRow choices)
- `ChipProvenance`: mission completion % and CIA evidence

**Data Honesty States:**
- **Mission completion %:** real (72%, ChipProvenance conditional by source—"via WHOOP" or "system calculated") / low-conf (72% at 64%, "estimated · low confidence" + ConfidenceMeter purple) / honest-null ("Not enough data yet - 3 more days", ring at 0%)
- **Action count:** real (12, "you logged") / low-conf (N/A—logged count is exact) / honest-null ("No actions logged yet")
- **Streak:** real (8 days) / low-conf (muted if partial) / honest-null ("No streak yet")
- **XP:** real (450) / low-conf (N/A—system calc is exact) / honest-null ("No XP earned yet")

**Consent & Safety:**
- Source chips expose category, source, scope, freshness, retention, export, revoke, delete
- Documented as modal/utility surface; no live route

**States:** Default (hero ring sweeps on mount; all five accordions collapsed), Skeleton (shimmer blocks + TrendChart axis+ghost-line), Empty/cold-start (0% ring ghosted, dashed milestones, KPI zeroed, cold-start CIA copy), Error (ErrorState inline in CIA card, ring retains cached value), Offline (OfflineBanner pinned, Next Action stays interactive), Stalled (7+ days no action: CIA swaps to stalled coaching + Sheet flow), Success/completion (ring sweeps to 100% green, CelebrationOverlay draws, Next Action replaced by chain-extension preview), Loading (checkbox spinner on completion write-in-flight)

**Motion:**
- Hero ring: 0→72% sweep on mount (520ms physical ease-out); on completion, shorter 250ms re-sweep
- Next action completion: old ActionCheckCard fades/slides down, replacement slides up (250ms ease-in-out)
- Accordion: spring 200ms, chevron rotates 180°
- CIA Reasoning expand: IntelligenceTimeline stages at ~180ms intervals, collapses via 250ms crossfade
- Sheet (stalled): spring 250ms
- Chart draw: solid orange L→R, dashed purple after, long-press scrub triggers crosshair
- Glow breathe: shared 4s cycle across all glows (one rhythm, not five uncoordinated pulses)
- Haptics: light on checkbox, medium on milestone unlock, none on accordion expand
- Reduced-motion: charts snap to final state; timeline collapses instant; all springs/slides become fade

---

### Screen 15: Create / Edit Mission

**Spec path:** `Balencia-New-Screens/hifi-screens/15-create-edit-goal.md`

**Composition (full-height modal from board or detail):**
```
Header: grabber pill, close glyph (44px), title "New mission"

Section 1: Natural Language Prompt (GlassPillInput multiline)
- Placeholder: "What do you want to achieve?"
- Example input: "Run a half marathon by October"

Section 2: CIA Planning Option (BtnCoach)
- Copy: "[ Let CIA plan this ]"
- Disabled until text entered

Section 3: Example Quick-Start Chips (ChoiceCardFrost or compact chips)
- "Save $5,000" / "Meditate daily" / "5K" (quick selectable examples)

Section 4: Structured Mission Result State (appears after CIA planning or manual edit)
- Subsection a: Part of Context
  - Copy: "Part of: endurance chain"
  - Summary: "This looks like a main mission"
  
- Subsection b: Mission Type Selection (SegmentedTabs)
  - [daily] [weekly] [side] [main]
  - Plus confidence indicator if suggested by CIA
  
- Subsection c: Domain Tags (ChipDomainTag + row)
  - [Fitness] [Nutrition] [+] (add more)
  
- Subsection d: Actions (ListRow with drag handle)
  - "Run 3x weekly [x] delete"
  - "Strength train 2x [x] delete"
  
- Subsection e: Milestones (ListRow with dates)
  - "1 5K pace check Aug 15"
  
- Subsection f: Tracking Signals (Toggle row)
  - "weekly distance [on] [o]"
  
- Subsection g: Strictness (SegmentedTabs)
  - [lenient] [balanced] [strict]
  
- Subsection h: Mission Preview (hero summary)
  - ProgressRing, ProgressBar
  - Copy: "~420 XP"

Footer: BtnPrimary "Create mission" (enabled only after title + 1 action + 1 domain valid)
```

**Key Components:**
- `Sheet`: full-height modal with grabber + close (44px)
- `GlassPillInput`: multiline natural-language prompt
- `BtnCoach`: "Let CIA plan this" (purple, CIA-initiated)
- `ChoiceCardFrost` or `ChipChoice`: quick-start example chips
- `SegmentedTabs`: mission type, strictness, difficulty
- `ChipDomainTag`: domain selectors
- `ListRow` with drag handle: actions and milestones (reorderable)
- `Toggle`: tracking signals (on/off)
- `CIAInsightCard` (optional): type reasoning and connections
- `ProgressRing`, `ProgressBar`, `KPIRow`: mission preview
- `ChipProvenance`, `ConfidenceMeter`, `HonestNullState`, `SkeletonState`, `ErrorState`
- `BtnPrimary`, `BtnGhost`, `BtnSuccess`

**Data Honesty States:**
- **Natural-language prompt:** real (user text) / low-conf (N/A—direct input) / honest-null (empty, disabled CTA)
- **Mission type:** real (CIA suggestion + "via prompt") / low-conf (muted suggestion + ConfidenceMeter) / honest-null (user selects manually)
- **Domain tags:** real (detected domains, "via prompt") / low-conf (suggested but dimmed until confirmed) / honest-null ("Add a domain to keep this organized")
- **Actions/milestones:** real (generated, user-editable) / low-conf ("CIA draft" badge) / honest-null ("Add at least one action")
- **Estimated XP:** real (rule-based from difficulty/scope) / low-conf ("~420 XP" + "estimated · low confidence" while action count changing) / honest-null ("XP estimate appears after actions")
- **Connections:** real (cited relationship, e.g., Fitness+Nutrition) / low-conf (dimmed, "possible connection") / honest-null (module omitted)

**Consent & Safety:**
- Source chips expose category, source, scope, freshness, retention, export, revoke, delete
- Documented as modal/utility surface; no live route

**States:** Default (input mode, text area, examples visible, disabled coach CTA), Skeleton (edit mode loads with skeleton rows), Empty (no prompt yet; examples visible), Processing (input shrinks, staged CIA captions run, result modules hidden until populated), Error (text preserved, ErrorState "Try again" or manual edit), Success (save CTA→BtnSuccess, sheet dismisses), Disabled (save at 40% until title + action + domain valid), Offline (editing possible, save blocked with copy)

**Motion:**
- Drag down beyond threshold or tap close to dismiss
- Drag handles reorder actions/milestones
- Chips remove on tap
- Toggles slide with haptic feedback
- Input→processing shrink (280ms)
- Result sections stagger-in (type reasoning → preview)
- Mission preview ring draws first, XP counts up second
- Save success: 200ms glow-done swap + success haptic
- Reduced-motion: processing captions still text-update; staggers/draws/count-ups jump to final states

---

### Screen 73: Mission Journal

**Spec path:** `Balencia-New-Screens/hifi-screens/73-mission-journal.md`

**Composition (retrospective timeline modal from board/profile/me):**
```
Header: TopBar with back target

Section 1: Filter Controls (ChipDomainTag + SegmentedTabs)
- Tabs: [All] [By domain] [By type]
- Allows filtering by Life Areas or mission tier

Section 2: All-Time Summary (GlassStatCard)
- "18 completed" + ChipProvenance "via missions"
- "8,420 XP" + ChipProvenance "via rewards ledger"
- "4 pivots" (mission pivots/amendments)

Section 3: Month Groupings (SectionHeader "MAY 2026")
- Repeats for each active month

Section 4: Journey Spine (TimelineSpine NEW + mission nodes)
- Vertical drawn path from past to present
- Nodes for each mission outcome:
  - Completed nodes (green checkmark)
  - Pivoted nodes (orange arrow/curve)
  - Archived nodes (neutral marker)

Section 5: Mission Entry Cards (SolidCard per node)
- Completed mission example:
  ```
  [ ✓ ] Finished emergency fund
        12 weeks  1,200 XP
        Six weeks of discipline. Your fund is real now.
        [Finance]  via rewards ledger
  ```
- Pivoted mission example:
  ```
  [ → ] Pivoted recipe challenge
        partial XP  your archive note
        You explored eight recipes before life shifted focus.
        [Nutrition]  via personal log
  ```
  
- Anatomy: outcome glyph, title, duration/XP, CIA narrative (inline text, not separate card), domain tag, provenance

Section 6: Mission Photos (ImageThumbnailRow NEW, optional)
- Progress photos tied to mission timeframe
- Tap thumbnail → Image Viewer [67] with source + date range

Section 7: Archive Note (user-authored note, or "No note added")
- Honest-null: label instead of invented rationale

Persistent: GlassNavBar (omitted from detail)
```

**Key Components:**
- `TopBar`: back (44px)
- `ChipDomainTag` + `SegmentedTabs`: filters
- `GlassStatCard`: all-time completions/XP/pivots summary
- `SectionHeader`: month grouping
- `TimelineSpine` (NEW): drawn retrospective path layout (not a chart; plain SVG stroke primitive)
- `SolidCard`: completed/pivoted entry cards
- `ProgressBar`: XP and duration normalization
- `CIAInsightCard` pattern (rendered inline as text block): narrative summaries
- `ImageThumbnailRow` (NEW): progress photos tied to mission timeframe
- `ChipProvenance`, `HonestNullState`, `SkeletonState`, `ErrorState`, `OfflineBanner`

**Data Honesty States:**
- **All-time completions:** real (count, "via missions") / low-conf (muted cached while syncing) / honest-null (summary hidden if no entries)
- **XP earned:** real (rewards total) / low-conf ("estimated · low confidence" if rewards sync partial) / honest-null ("--", "No mission rewards yet")
- **Mission duration:** real (start/end dates) / low-conf (approx weeks if date inferred) / honest-null ("dates unavailable")
- **CIA summary:** real (generated from mission data) / low-conf (dimmed, "draft from partial data") / honest-null ("Summary generating..." with non-CIA facts visible)
- **Photos:** real (thumbnails from Progress Photos [49]) / low-conf (N/A—binary attachment) / honest-null (row omitted, no empty media rail)
- **Photo privacy:** real (thumbnail exposes source + date in Image Viewer) / low-conf (N/A) / honest-null (delete/hide removes instantly)
- **Archive note:** real (user-authored) / low-conf (N/A) / honest-null ("No note added")

**Consent & Safety:**
- Privacy-first language throughout
- SafetyResourceCard always reachable from journal/mood/check-in surfaces
- Source chips expose category, scope, freshness, retention, export, revoke, delete

**States:** Default (filters, summary, month sections, spine, mixed completed/pivoted cards), Skeleton (path skeleton draws T→B; cards show text + thumbnail placeholders), Empty (filters/spine hidden; centered empty copy), Filtered empty (active filters visible; "No entries for [filter]"), Error (cached entries remain if available, ErrorState offers Retry), Success (filter apply shows "Journal refreshed" toast, path redraws), Disabled (filter chips at 40% while refresh in-flight, "Syncing your journey..." beside them), Offline (cached entries with OfflineBanner "offline - showing last synced data")

**Motion:**
- Timeline spine stroke-draws T→B
- Mission cards rise-in as path reaches each node
- Filter secondary row slides down
- Selected chips press-scale .98
- Photo thumbnails open Image Viewer with shared-element scale
- Pull-to-refresh redraws only new nodes
- Haptics: light on filter selection, none on scroll
- Reduced-motion: path/cards render instantly, filter row appears without slide, thumbnails open via fade

---

### Screen 42: Celebration Overlay

**Spec path:** `Balencia-New-Screens/hifi-screens/42-celebration-overlay.md`

**Composition (full-screen cinematic moment for level-ups/streaks/milestones):**
```
Scrim: rgba(10,10,15,.6) (tap-dismissible, but BtnPrimary is the labeled exit)

Section 1: Particle Layer (restrained green→orange particle burst)
- Reduced-motion path: particles omitted entirely

Section 2: Hero Card (FrostCard, glow-done green, 40px radius)
- Overline: "overall level up"
- ChipProvenance: "level 8 -> 9" (right-aligned in card header)
  
- Center: Badge Emblem (neutral paper-100 emblem inside ProgressRing frame)
  - For overall Life Power: neutral paper emblem (not one domain's badge)
  - For single-domain trigger: domain-color badge

- Display: "+ 120" (orange, NM Medium tabular-nums)
- Sub-copy: "XP"
- ChipProvenance: "you earned it" (not "via Balencia RPG"—XP is system-computed, not synced)

- ProgressBar: segmented, "82%" to next level (orange fill, paper label)

Section 3: ContinuousStrokeDivider (SVG line motif, NEW)
- Draws once, L→R, ~400ms
- Separates hero from CIA insight

Section 4: CIA Insight Card (CIAInsightCard, glow-cia purple)
- Copy: "level 9. your *consistency* across fitness and finance is coming together. - CIA"
- Evidence: ChipDomainTag pair [fitness] [finance] (cross-pillar rule)
- No separate actions; insight is read-only in this moment

Section 5: Action Row
- BtnPrimary: "continue" (labeled exit path for accessibility)
- BtnSecondary: "share" (optional social sharing)

Persistent: GlassNavBar (omitted; overlay is modal-blocking)
```

**Key Components:**
- `CelebrationOverlay`: root component (catalog 5; orchestrates entrance choreography)
- `ModalOverlay`: centered-card-over-scrim structural pattern
- `FrostCard` (variant summary): hero container, 40px radius
- `ProgressRing`: frames badge glyph; function as ambient progress frame (not numeric readout)
  - Variant: center KPI omitted (badge takes the glyph space)
- `GlassStatCard` (variant metric, **flush sub-mode NEW**): carries +XP honesty states
  - Flush mode: no border/blur/shadow (inherits FrostCard chrome)
  - Catalog usage rule 3: every metric renders through GlassStatCard, no exceptions
- `ProgressBar` (variant segmented): 82%-to-next-level literal readout
- `ContinuousStrokeDivider` (NEW): SVG path-draw sub-component for hero/celebration motif
- `CIAInsightCard`: purple glow, spark glyph, Tiempos italic, cross-pillar evidence pair
- `ChipDomainTag` ×2: Fitness + Finance (domain colors per CANON 4 palette)
- `ChipProvenance`: XP ("you earned it", not "via Balencia RPG") and level transition
- `BtnPrimary` ("continue"): labeled primary exit path (required by catalog)
- `BtnSecondary` ("share"): optional social action
- `Badge` emblem: reuses BadgeTile's domain-color iconography (not a literal BadgeTile instance)
- `XPToast`: compact separate component (already cataloged, not new)

**Data Honesty States:**
- **XP earned:** real (+ 120 XP, tabular-nums, "you earned it") / low-conf (N/A—system calc is exact) / honest-null (XP block omitted entirely if value fails to resolve; layout recenters)
- **Progress to next level:** real (ProgressRing + ProgressBar at 82%, "level 8 -> 9") / low-conf (N/A—level math is exact) / honest-null (ring + bar omitted if pure streak with no level attachment; streak-only celebration shows badge + XP + CIA only)
- **Domain tags on hero overlay:** for overall Life Power, badge stays neutral paper-100 (not one domain's badge); cross-domain evidence lives in CIA card's ChipDomainTag pair. For single-domain trigger (e.g., screen 27 workout, screen 38 habit streak), hero gets one ChipDomainTag in that domain's color; CIA card's evidence drops to single chip or omits if insight not cross-pillar.

**Consent & Safety:**
- Celebration is premium, non-clinical moment; no crisis resources here
- Source chips cite XP source (system-computed, not synced health data)

**States:** Default (full choreographed entrance: particles → badge scale-in → stroke draw → CIA fade-up → actions), Skeleton (FrostCard shimmers, "0 XP" placeholder, "getting your result ready" caption; no CIA card yet), Honest-null/CIA unavailable (DividerstrokeVG omitted, CIAInsightCard hidden; FrostCard margins recenter), Error/share failure (quiet label swap "sharing failed · try again" 2.5s, no error-red color; button chrome untouched), Fast-dismiss (user taps BtnPrimary or scrim before sequence finishes; all animations resolve instantly to final values), Toast variant (slide-in 200ms → auto-dismiss 2.5s → slide-up-out 150ms; non-modal, underlying stays interactive), Disabled (N/A—overlay is either present or dismissed)

**Motion:**
- Entrance: spring physics (stiffness 150, damping 15) for badge scale-in; fades 150-250ms ease-out; stroke draws L→R ~400ms
- Glow behavior: FrostCard glow-done breathes (60%→100% opacity, 3s ease) as primary hero; CIAInsightCard glow-cia stays static/calm (secondary beat; two breathing glows would read busy)
- Haptics: medium-weight impact synced to badge scale-in snap (iOS: UIImpactFeedbackGenerator .medium; Android: platform confirm-tier haptic)
- Reduced-motion: particles removed; badge/XP/progress/stroke render instantly; CIA card immediately visible (no fade-up); glow-breathe becomes static; entrance lockout bypassed (dismissal available immediately)
- Toast motion: slide-down-in 200ms, slide-up-out on dismiss (no particles, no haptic—everyday wins shouldn't compete with milestone haptics)

---

## 4. Canon Governance (COMPACT-CANON.md & COMPONENT-CATALOG.md)

### Color Roles (60/30/10)

- **Burnt Orange `#FF5E00` (60):** primary CTA, user's line on charts, streaks/effort, active nav, hero accents.
- **Forest Green `#34A853` (30):** completion, positive deltas, milestones, recovery, "done."
- **Royal Purple `#7F24FF` (10):** CIA voice, insight chips, projected/AI data, premium.
- **Text:** paper-100 `#FEFAF3` primary; paper-50 `#FDFDFB`; secondary = paper 64%; tertiary 40%.
- **Domain tag colors (tags/icons only, never chrome):** Fitness `#ef4444`, Nutrition `#84cc16`, Mental/Wellbeing `#14b8a6`, Finance `#10b981`, Career `#6366f1`, Relationships `#ec4899`, Spirituality `#8b5cf6`, Learning `#06b6d4`, Creativity `#f59e0b`.

### Mission Tiers & Metal Colors (RPG Terminology)

Per ascii_wireframes `_LEGEND.md`:
- **Life Mission** (gold): high-stakes, life-domain alignment
- **Main Mission** (silver): primary goal per domain
- **Side Mission** (bronze): supporting goal
- **Weekly Mission** (steel): recurrence-based
- **Daily Mission** (sage): atomic task
- **Group Mission** (copper): social/squad-aligned

### Data Honesty Invariant (Non-Negotiable)

Every metric ships 3 states:
1. **Real** — value + provenance chip (`via WHOOP`, `you logged`, `system calculated`, etc.)
2. **Low-confidence** — muted value + `estimated · low confidence` label + optional ConfidenceMeter (purple for AI-derived)
3. **Honest-null** — designed empty state (e.g., `Not enough data yet — 3 more days`), never an invented number

### Semantic Inner Glow (One Per Card, Meaning-Driven)

- `--glow-you: #FF5E00` — you, effort, streak, active metric.
- `--glow-done: #34A853` — done, growth, completion, positive delta.
- `--glow-cia: #7F24FF` — CIA, AI insight, projected, premium.
- Recipe: bottom-anchored radial, `color-mix(in srgb, var(--glow) 55%, transparent)` → transparent 70%, blur 24px, height 62% of card.
- Every spec states each card's glow color **and why**. Never decorative.

### Cross-Cutting Patterns (Bake Into Every Relevant Screen)

- **Crisis/safety layer:** wellbeing/mood/check-in surfaces expose crisis resources (quiet, always reachable, never gamified).
- **Consent & data control:** any screen touching health, photos, voice, or third-party sources shows consent state + revoke/delete entry.
- **Locked-feature gating:** premium modules use PaywallLock (blurred glass preview + orange unlock CTA), never dead-end or hidden.
- **Quick-log FAB:** global entry (water/meal/mood) on Today-tab screens.
- **Provenance chips:** all synced data includes source indicator.
- **A11y floor:** AA+ contrast, 44px min targets, screen-reader labels for glyphs, reduced-motion variants.
- **Motivation-tier density:** every screen defines low/medium/high density variants.

### Motion Primitives

- **Physical easing:** never linear; prefer spring curves (e.g., `cubic-bezier(0.32, 0.72, 0, 1)`)
- **Feedback window:** 150–250ms for interaction feedback (press scale, segment slide, etc.)
- **Glow breathe:** on hero cards, 4s opacity pulse (55%↔100%)
- **Continuous-stroke draw:** hero/celebration only; left-to-right stroke motif
- **Animate transform/opacity only:** no color/blur/shadow animation (perf + clarity)
- **Reduced-motion path required:** all animations skip to final static state; haptics and text updates still occur

---

## 5. Component Catalog Reference (COMPONENT-CATALOG.md)

### Core Surfaces

- **GlassCard:** default container, 28px radius, blur 28px, semantic glow
- **GlassCard.hero:** radius 40, Display type allowed
- **SolidCard:** data-density surface, `--surface-2` bg, no blur
- **FrostCard:** immersive frost, blur 48px, for onboarding/over-glow moments
- **GlassNavBar:** floating bottom pill (4 tabs: Today, CIA, Goals, Me), active = orange filled icon + label

### Data & Honesty

- **GlassStatCard:** workhorse, Overline label, KPI (tabular-nums 28–40), delta, ChipProvenance, semantic glow. Variants: metric / ring / sparkline. States: real / low-conf / honest-null / skeleton.
- **KPIRow:** 2–3 inline mini-stats in one SolidCard, hairline dividers, per-stat provenance.
- **ProgressRing:** stroke 6–8px, orange→green at 100%, center KPI tabular-nums, track rgba. Variants: default / ambient frame (center glyph instead of number).
- **ProgressBar:** 8px, radius 999, orange fill. Variant: segmented for multi-step.
- **TrendChart:** line chart per CANON §7 (solid orange user line, dashed purple projection, green milestone dots), gridlines rgba, axis Caption. No area-fill gradients.
- **MomentumBar:** cumulative progress, warm-glow fill, tabular-nums value.
- **ChargeMeter:** depletable capacity (room left), warm-glow fill, tabular-nums value.
- **HonestNullState:** designed empty (quiet glyph, Body-light line), never fabricated.

### CIA & Insights

- **CIAPresenceOrb:** breathing purple-core orb, idle breathe 4s ease, listening ring pulse, thinking rotation shimmer.
- **CIAInsightCard:** purple-tinted glass, spark glyph, insight copy (one Tiempos-italic emphasis), evidence row (ChipProvenance), actions (BtnCoach + BtnGhost).
- **IntelligenceTimeline:** staged Caption lines (staged reveal ~180ms intervals), purple dot pulse, collapses to summary.

### Gamification & Social

- **CelebrationOverlay:** full-screen moment (continuous-stroke draw, green→orange particle restraint, XP line, single BtnPrimary). Respects reduced-motion.
- **XPToast:** compact top toast (`+40 XP · Fitness`), auto-dismiss 2.5s.
- **StreakCard:** flame glyph, day count (tabular-nums), `glow-you`, recovery state shows green `recovered` chip.
- **BadgeTile:** emblem (domain color), locked = 24% opacity + lock glyph, earned date Caption.

### NEW Components (Promoted This Pass)

- **ConstellationRadar:** real-data viz polygon mapping `domainStats` (replaces decorative polygon)
- **ScheduleDonut:** multi-stop conic-gradient for domain time-split (distinct from single-metric ProgressRing)
- **TimelineGrid:** vertical hour gridlines layout primitive, not a chart
- **EventCard:** compact hour-height block, 16px radius, solid/dashed/neutral borders by provenance, 3px leading domain-color accent
- **MoodEmojiPicker:** 5-cell horizontal single-select, 44×44px targets, selected = orange ring + glow-you
- **ActionCheckCard:** SolidCard integrating checkbox + title, large tap-target, bundled completion mechanism
- **ExpandableList:** accordion wrapper (SectionHeader trigger + SolidCard pane, spring 200ms)
- **ContinuousStrokeDivider:** SVG path-draw for hero/celebration motif
- **TimelineSpine:** drawn retrospective path layout primitive (not a chart; plain stroke)
- **ImageThumbnailRow:** progress photos tied to mission timeframe
- **CheckboxControl:** large tap-target checkbox (44px), green check only after persistent completion

---

## 6. TODAY & MISSIONS Rendered Reference (balencia-screens Component Files)

### TODAY Family Implementation

| Screen | Component File | Path |
|---|---|---|
| 12 | `S12HomeScreen.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 45 | `S45DailyCheckin.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 41 | `S41ScheduleCalendar.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 61 | `S61RemindersTasks.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 93 | `S93MoodTrends.tsx` | `/balencia-screens/src/components/hifi/screens/intelligence/` |

### MISSIONS Family Implementation

| Screen | Component File | Path |
|---|---|---|
| 13 | `S13MissionBoard.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 14 | `S14MissionDetail.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 15 | `S15CreateEditMission.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 73 | `S73MissionJournal.tsx` | `/balencia-screens/src/components/hifi/screens/today/` |
| 42 | `S42CelebrationOverlay.tsx` | `/balencia-screens/src/components/hifi/kit/` (shared overlay) |

### Shared Component Kit Files

| Component Category | File | Path |
|---|---|---|
| Buttons | `buttons.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| Chips | `chips.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| Chrome (nav, topbar) | `chrome.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| CIA (orb, insight, chat) | `cia.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| Data Viz (charts, meters, rings) | `data.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| Surfaces (glass, frost, solid) | `surfaces.tsx` | `/balencia-screens/src/components/hifi/kit/` |
| System (states, modals, sheets) | `system.tsx` | `/balencia-screens/src/components/hifi/kit/` |

---

## 7. Screenshot Reference Authority

**Screenshot directory:** `/Users/hamza/Desktop/balencia-design/Balencia-New-Screens/build-progress/screenshots/`

Per MASTER-LEDGER.md: All 104 screens were repaired and re-validated as of 2026-07-07. Screenshots for TODAY & MISSIONS screens are available in:
- Baseline audit snapshots: `build-progress/audit-2026-07-08/evidence/screenshots/`
- Remediation evidence: `build-progress/remediation-2026-07/R0/screenshots/`

---

## 8. Verification Checklist (BIOS-004 Entry Gate)

Before marking today-missions parity scope complete, verify against this authority:

### TODAY Family Parity

- [ ] S12: Home greeting + CIA coach + 3 metrics + domain carousel + today's actions + pinned missions + FAB + nav
- [ ] S12: Life balance constellation optional expansion via `/life-areas`; honest-null states for all metrics
- [ ] S45: Sheet half/full modal + CIA orb + mood emoji picker + energy/stress sliders + reflection text + tomorrow insight + safety card
- [ ] S45: MoodEmojiPicker = 5-cell horizontal (NEW component); StreakCard = flame + day count (replaces plain chip)
- [ ] S41: Day/week/month tabs + 7-day date strip + ScheduleDonut (real multi-domain arcs) + ChargeMeter (room-to-breathe)
- [ ] S41: CIAInsightCard with dashed purple border + unscheduled task list + TimelineGrid + EventCard blocks (solid/dashed/neutral by provenance)
- [ ] S61: Completion band (progress bar + KPIRow) + TODAY checklist + UPCOMING + ACTIVE REMINDERS + CIA suggestion + safety
- [ ] S61: CheckboxControl = 44px tap target; all data states (real/low-conf/honest-null) present
- [ ] S93: Time range tabs (7D/30D/90D/1Y locked) + today's mood card + crisis resources + trend chart + CIA insight + recent log
- [ ] S93: Chart sparse-data = dots only until ≥3 points; crisis always visible before chart; no diagnostic framing

### MISSIONS Family Parity

- [ ] S13: Board summary band (ACTIVE/DONE/STREAK + MomentumBar) + SegmentedTabs + filter chips + ConstellationRadar (real data viz, not decorative polygon)
- [ ] S13: Pinned missions with embedded ProgressRing; all data states (real/low-conf/honest-null) present
- [ ] S14: Hero ring (72% sweep on mount) + mission identity (Display 34) + 2 domain tags + KPI row (3 mini-stats) + CIA insight + ActionCheckCard (NEW)
- [ ] S14: Five expandable accordions: ALL ACTIONS / MILESTONES / CIA REASONING / CROSS-DOMAIN / PROGRESS OVER TIME
- [ ] S14: ConfidenceMeter purple indicator when low-confidence; honest-null for missing data
- [ ] S15: Natural-language prompt input + BtnCoach "Let CIA plan this" + example chips + structured result state (type/domains/actions/milestones/tracking/strictness/preview)
- [ ] S15: Mission preview shows ProgressRing draw + XP count-up; all data states present (real/low-conf/honest-null)
- [ ] S73: Filter tabs (All/By domain/By type) + all-time summary (completions/XP/pivots) + month-grouped entries + TimelineSpine (drawn path, not chart)
- [ ] S73: Mission cards show outcome (completed/pivoted), duration, XP, narrative, domain tag, provenance; archive notes honest-null ("No note added", never invented)
- [ ] S73: ImageThumbnailRow (optional progress photos); tap expands to Image Viewer [67]
- [ ] S42: Full-screen modal + hero FrostCard + ProgressRing frame + badge + XP stat + ContinuousStrokeDivider + CIA card + BtnPrimary "continue" + BtnSecondary "share"
- [ ] S42: XP provenance = "you earned it" (never "via Balencia RPG"); level transition provenance = "level 8 -> 9"
- [ ] S42: Reduced-motion: particles removed, animations snap to final state, glow static, entrance lockout bypassed

### Canon & Component Consistency

- [ ] All metrics use GlassStatCard with real/low-conf/honest-null states (no exceptions per CANON §7)
- [ ] All glows are semantic and stated: glow-you (orange) / glow-done (green) / glow-cia (purple)
- [ ] All surfaces follow glass-vs-solid rule: hero/nav/overlay = glass; data-dense = solid
- [ ] All 44px targets: buttons, toggles, checkboxes, drag handles, back, glyphs
- [ ] All copy is sentence case, no exclamation marks, Tiempos italic word max 1 per moment
- [ ] All NEW components documented (ConstellationRadar, ScheduleDonut, TimelineGrid, EventCard, MoodEmojiPicker, ActionCheckCard, ExpandableList, ContinuousStrokeDivider, TimelineSpine, ImageThumbnailRow, CheckboxControl)
- [ ] All consent & safety: health/mood/voice/photo surfaces expose revoke/delete; crisis always reachable; no gamification on safety cards
- [ ] Reduced-motion path: all animations skip to final state; text updates and haptics persist

---

**End of authority document.** This scope synthesis is ready for BIOS-004 build commencement.
