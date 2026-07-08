### 1. Header
- **Screen ID:** 41
- **Name:** schedule-calendar
- **Route(s) covered:** `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]`
- **Tab:** Hidden tab — pushed over the originating tab's stack (Today, Explore, or a Domain Dashboard); `GlassNavBar` is not shown while this screen is on top, matching how every non-tab-root push behaves.
- **Source:** Functional Content Brief: Schedule / Calendar
- **Batch:** 5

### 2. Purpose
Answer "what does my day look like, and what should I do when" by fusing synced external calendar events with CIA's contextual suggestions in one timeline. The screen is the connective tissue between time management and the rest of the app: it maps how the waking day divides across life domains, and lets CIA propose where recovery or a missed intention could still fit — never a bare event list, always a read on the *day as a whole*.

### 3. Entry & exit
- **Entry paths:** Home (12), Explore (18), CIA Chat (09) deep-link, Domain Dashboards.
- **Exit paths:** Tap event → Event Detail / Domain Dashboard. Swipe back → stack pop. Tap "Connect Google Calendar" → Connected Services (22). Tap CIA suggestion → inline accept/dismiss (stays on screen) or CIA Chat (09) for "why."
- *Correction:* the brief describes this screen landing on the "Me tab" from Explore and the "Today tab" from other entries, but Schedule carries no bottom nav of its own in its native layout — it is always a stack push over whichever tab launched it. Corrected to a single presentation model: standard push, back chevron returns to the origin tab, no tab-switch side effects.

### 4. Layout anatomy
Top-to-bottom:
1. **Atmosphere & TopBar:** base background, back chevron, screen title, sync status glyph, single add-event action.
2. **View switcher & date nav:** segmented control for day/week/month, horizontal swipeable date strip.
3. **Today-at-a-glance card:** one `SolidCard` housing domain time-split (donut) and day-fullness capacity — one shared meaning, one shared glow.
4. **CIA suggested action card:** contextual nudge naming an open slot, without pre-empting the exact time shown below in the grid.
5. **Unscheduled list:** collapsible backlog of undated tasks with drag handles.
6. **Time-slot grid:** vertical hour timeline, absolute-positioned event blocks (synced solid, CIA-suggested dashed, missed neutral).

*Correction:* the draft placed a second floating "+" `FABQuickLog` at the bottom-right of the grid, duplicating the TopBar's add action. `FABQuickLog` is scoped by CANON §8 to Today-tab screens for the water/meal/mood quick-log — it does not belong on a pushed, non-tab screen, and it was not even performing the log-a-vital job it exists for; it was standing in for generic "add event." Removed. The TopBar `+` is the single, sufficient add-event entry point (see Components §5).

**ASCII Wireframe (390×844):**
```text
        ┌───────────────────────────────────────────┐
        │ ◂  Schedule          synced 2m ago      + │
        ├───────────────────────────────────────────┤
        │  [ day ] [ week ] [ month ]                │
        │                                            │
        │   ‹  M  T  W  T  F  S  S  ›                │
        │      •  • (○) •  •  •  •                   │
        ├───────────────────────────────────────────┤
        │  ╭─ domain split ──── day fullness ───╮    │
        │  │  (donut)         ▓▓▓▓▓░░░░░         │    │
        │  │  Career 1h30m    room to breathe    │    │
        │  ╰──────────────────────────────────╯      │
        ├───────────────────────────────────────────┤
        │  ╭─ CIA suggested ──────────────────╮      │
        │  │ ✨ some open time this afternoon  │      │
        │  │  for a short walk — see below     │      │
        │  │           [dismiss]  [see it]      │      │
        │  ╰──────────────────────────────────╯      │
        ├───────────────────────────────────────────┤
        │  unscheduled (2)                  ⌄        │
        │  ○ Deep work block                  ≡      │
        │  ○ Read 10 pages                    ≡      │
        ├───────────────────────────────────────────┤
        │  9 AM ─────────────────────────            │
        │       ┌───────────────────────┐            │
        │ 10 AM │ [G] Team Sync        ▸│            │
        │       └───────────────────────┘            │
        │ 11 AM ─────────────────────────            │
        │                                             │
        │ 12 PM ─────────────────────────            │
        │       ┌ - - - - - - - - - - - ┐            │
        │  1 PM │ ✨ Lunch walk         ▸│            │
        │       └ - - - - - - - - - - - ┘            │
        │  2 PM ─────────────────────────            │
        │  3 PM ─────────────────────────            │
        └───────────────────────────────────────────┘
```
*Correction:* the CIA Suggested card's copy previously named "a 10-minute walk around 2pm" while the in-grid dashed block below it showed "Lunch walk" at 1 PM — two different times for what read as the same suggestion. Unified: the card now nudges generically ("some open time this afternoon"), and the concrete time and label live only once, on the dashed block itself. One fact, one place.

### 5. Components
- **TopBar** (transparent → gains `.glass-pill` backdrop on scroll): back chevron (44px), H1 "Schedule," sync glyph, single `+` action opening a `Sheet` (`half`) with two `ListRow` entries — "Add event" (time-anchored) and "Add unscheduled task" (backlog). This replaces the removed `FABQuickLog` as the screen's only add-entry point.
- **SegmentedTabs** (default): day / week / month, `--surface-3` active fill.
- **CalendarStrip** (default): horizontal 7-day scroller, today ringed orange, days with completed actions carry a green dot.
- **SolidCard** (default, one instance): shared container for `ScheduleDonut` + `ChargeMeter` — see §6 for why one card holds two widgets under one glow.
- **NEW: ScheduleDonut** — multi-stop conic-gradient donut for domain time-split. *Rationale:* `ProgressRing` only supports a single-color goal fill; a schedule's composition is inherently multi-domain (Career, Fitness, …), which needs each domain's own tag color as a discrete flat arc — see §6 for why this doesn't collide with the single-metric line-chart rule in CANON §7.
- **ChargeMeter** (default) — *corrected from the draft's `MomentumBar`.* Day fullness tracks a depleting resource (waking-window capacity being spent as events accumulate), and its positive framing is "room left," not "amount filled" — that is exactly `ChargeMeter`'s job per catalog ("depletable capacity"), not `MomentumBar`'s ("cumulative progress," which frames more-fill as achievement — wrong valence here, since an overfull day is the failure state, per the "protect some recovery" copy in §7).
- **CIAInsightCard** (default): purple-tinted glass, spark glyph, one Tiempos-italic emphasis word, actions `BtnCoach` ("see it," scrolls to the dashed slot) + `BtnGhost` ("dismiss").
- **ListRow** (interactive): unscheduled backlog items, drag handle (`≡`, 44px target).
- **NEW: TimelineGrid** — vertical hour gridlines (`rgba(255,255,255,.05)`, matching the `TrendChart` gridline token) with absolute-positioning containers for event blocks. *Rationale:* the catalog has no time-axis layout primitive; this is the minimal one needed and is a plain layer over the atmosphere, not a card (no fill, no border, no glow).
- **NEW: EventCard** — compact `--surface-2` block, radius **16** (an intentional in-between of the input radius 14 and card radius 28, sized for the compact hour-height block; flagged here rather than silently invented as a new token). States: **solid border** = synced/real (`ChipProvenance` "via Google Calendar"); **dashed purple border** = CIA-suggested/projected; **neutral paper-16% dashed border, no color** = missed. A 3px leading accent bar in the event's `ChipDomainTag` color identifies its life area at a glance — this reuses the domain palette as a tag/icon accent, not as chrome, consistent with CANON §4.
- **ConsentCard** (Cold-Start state): states what calendar data is read, why, retention; `BtnPrimary` "Connect Google Calendar" + `BtnGhost` decline, equal prominence; revoke path also reachable at any time afterward via a long-press on the TopBar sync glyph (opens a `Sheet` with "Manage calendar connection" → revoke), not only at first consent.
- **OfflineBanner / SyncStatus** (glass-pill): staleness-labeled sync state, see §8.
- **ErrorState**: quiet failed-event-load pattern, see §9.
- **SkeletonState**: shimmer geometry matching the real layout.

### 6. Visual treatment
- **Background atmosphere:** `--bg-base` `#0A0A0F` with the mandatory top-center warm radial glow `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` and 4% grain overlay (soft-light).
- **Glass tiers:**
  - `TopBar` and `SegmentedTabs`: `.glass-pill` — `rgba(10,10,15,.55)`, blur 24px, border `rgba(255,255,255,.10)`, radius 999.
  - `CIAInsightCard`: `.glass-card` — `rgba(255,255,255,.045)`, blur 28px sat 120%, border `rgba(255,255,255,.08)`, radius 28, shadow `0 18px 48px rgba(33,16,8,.45)` + inset top-light `0 1px 0 rgba(255,255,255,.12)`.
  - Domain/fullness card, `EventCard`, `ListRow` backlog, `TimelineGrid`: `SolidCard` family — `--surface-2` `#211008`, radius 28 (domain/fullness card) or 16 (`EventCard`, reasoned above), border `rgba(255,255,255,.06)`, no blur. Data density here beats atmosphere, per CANON §2's rule.
- **Semantic inner-glow — one per card, meaning stated:**
  - **Domain-split + day-fullness card:** `--glow-you` `#FF5E00` — this is a live read of *your* day's effort distribution and remaining capacity right now, not a completion or an AI projection, so it earns the "you/effort/active metric" glow rather than green or purple.
  - **Current-time `EventCard`:** `--glow-you` `#FF5E00` — the single event intersecting "now," the day's live focal point.
  - *Correction:* the draft had both of these breathing simultaneously (opacity 55%→80%→55% over 4s). Two independent breathing glows compete for attention on one screen, which reads as noise, not premium restraint. Breathing is now reserved for the current-time `EventCard` only — it is the one truly *live* thing on the screen. The domain/fullness card's glow is present but static (no breathe), since it summarizes the day rather than tracking something happening this second.
  - No other card on this screen carries a glow — synced (non-current) `EventCard`s and the CIA-suggested dashed block stay unglowed to keep the "now" moment singular; the dashed purple border on the CIA block already carries the projected/AI meaning per CANON §7 without needing a second purple glow layer.
- **ScheduleDonut vs. CANON §7:** the §7 invariant (solid orange = actual, dashed purple = projected, green dots = milestones) governs single-metric *trend* lines over time. `ScheduleDonut` is categorical composition data (which domain owns which minutes today), not a past/projected duality — its flat, discrete domain-color arcs (no gradients between stops) are the correct read of CANON §4's domain-tag palette applied to a chart, and don't violate the "no 3-color gradients" rule, which targets gradient blending within one metric's fill, not adjacent flat arcs across distinct categories.
- **No Display-type hero on this screen** — Schedule is a dense utility surface, not an editorial moment; forcing a 34–52px Display headline here would fight the timeline for space. H1 "Schedule" carries the top of the type hierarchy instead; the two Tiempos-italic emphasis words below (§7) carry the screen's warmth without an oversized headline.
- **Hero type moments (two, each its own "moment," each capped at one word):** *whole* in the domain-split body copy; *room* in the CIA-suggested card copy.

### 7. Content & copy
- **Screen title:** Schedule
- **View switcher:** day / week / month
- **Domain split overline:** domain split
- **Domain split body:** which life areas fill your *whole* day
- **Day fullness label:** day fullness
- **Day fullness value (default):** room to breathe today
- **CIA suggested eyebrow:** CIA suggested
- **CIA suggestion prompt:** some open time this afternoon for a short walk — a little *room* to reset before it fills
- **In-grid CIA block label:** Lunch walk · 1 PM
- **Unscheduled header:** unscheduled (2)
- **Empty unscheduled state:** No unscheduled actions yet. Tap + to create one.
- **Empty day (aspirational):** Clear day ahead. Want me to suggest some actions?
- **Overpacked day:** a full one — protect some recovery
- **Missed event state:** Missed — reschedule
- **Connect calendar CTA:** Connect Google Calendar
- **Connect calendar sub-copy:** sync your Google Calendar to see all your events alongside CIA's suggestions.
- **Loading:** CIA is reading your week — one moment.
- *Corrections:* (1) all "CIA" references converted to "CIA" — none remained in the source draft, verified clean on this pass too. (2) No exclamation marks anywhere. (3) "connect Google Calendar" → "**Connect** Google Calendar" — capitalized to match the catalog's own button-label convention (e.g. PaywallLock's "Unlock with premium"). (4) The CIA suggestion's time mismatch (2pm vs. 1pm) resolved per §4/§6 — the card is now generic, the grid block carries the one concrete time.

### 8. Data & honesty states
Every metric ships its 3 states (real / low-confidence / honest-null). Never a fabricated number.
- **Domain split (`ScheduleDonut`):**
  1. *Real:* Career 1h 30m, Fitness 45m — `ChipProvenance` "via Google Calendar."
  2. *Low-confidence:* faded arcs, Caption "estimated · low confidence" (e.g. an all-day event with no clear domain tag, apportioned by CIA's best guess).
  3. *Honest-null:* ghosted ring, copy "nothing scheduled yet — tap + or accept a CIA suggestion."
- **Day fullness (`ChargeMeter`):**
  1. *Real:* 4h 30m of 16h waking window — `ChipProvenance` "derived from wake window."
  2. *Low-confidence:* genuinely not applicable, and stated honestly rather than forced — day fullness is a sum of confirmed scheduled time against a known wake-window; there is no fuzzy midpoint between "known" and "unknown" for a time total, so it is either real or honest-null, never an estimate.
  3. *Honest-null:* empty track, copy "room to breathe today" (no wake-window data yet, or nothing scheduled).
- **Sync / connection status** *(clarified: this is the `OfflineBanner`/`SyncStatus` component's own state machine, not the metric real/low-confidence/honest-null pattern — a connection status isn't a data value, so it doesn't force-fit that triad):*
  1. **Synced:** "synced 2m ago."
  2. **Offline:** "offline — showing last synced 2h ago" *(corrected from the draft's vaguer "showing cached schedule" — an exact elapsed time is the honest-staleness pattern CANON §8 asks for, matching the catalog's own `OfflineBanner` example almost verbatim)*.
  3. **Failed:** "sync failed — tap to retry."
- **Unscheduled backlog items** carry no `ChipProvenance` — they're user-authored by definition, so there's no source ambiguity to disclose. Chips are reserved for cross-referenced/synced data, per CANON §8.

### 9. All states
- **Default:** day view, current date selected, solid synced events, one dashed CIA suggestion, current-time card breathing orange.
- **Overpacked:** triggered when scheduled time passes ~85% of the waking window; `ChargeMeter` fill reads near-full, copy switches to "a full one — protect some recovery," and the CIA suggested card (if any) prioritizes a recovery nudge over a task nudge.
- **Missed:** the event's block renders with a neutral paper-16% dashed border (no color, no shame) and swaps its trailing chevron for "Missed — reschedule"; tapping opens the reschedule sheet directly.
- **Skeleton:** shimmer blocks over the timeline, ghost ring for the donut, faded `--surface-3` placeholder cards, matching real geometry per `SkeletonState`.
- **Empty (Cold-Start):** `ConsentCard` for Google Calendar is the prominent single action; CIA starter tasks seed the unscheduled list; donut in honest-null.
- **Error:** *Correction — the draft used a red left border on a failed event card, calling it "neutral, non-gamified," which contradicts itself; red reads as an alarm, not neutral.* Replaced with the catalog's actual `ErrorState` pattern: a quiet glyph on the affected block, plain-language Body ("Couldn't load this event"), `BtnSecondary` "Try again" — no color-coded blame, consistent with CANON's "never a red-vs-green moralizing" spirit extended here from deltas to failures.
- **Success (event created / dragged):** card scales 1.0 → 0.98 → 1.0, brief `--glow-done` `#34A853` flash, 250ms.
- **Disabled:** the TopBar `+` add-action and pull-to-refresh disable during offline mode, with the reason stated in the `OfflineBanner` itself (no silent disabling).

### 10. Motion & interaction
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for horizontal swipes (date nav, swipe-to-dismiss) — a spring-like curve in service of CANON's "physical, never linear" rule; CANON doesn't fix an exact curve, so this is an implementation choice within that constraint, not a canon citation.
- **Feedback (150–250ms):** `EventCard`s scale to `.98` on press; `SegmentedTabs` active indicator slides in 150ms.
- **Glow behavior:** only the current-time `EventCard`'s `--glow-you` breathes (55%→80%→55%, 4s loop) — see §6 for why the domain/fullness card's glow was corrected to static.
- **Choreography ("draw-first," hero/celebration-class motif per CANON §6):** entering day view, `TimelineGrid`'s hairlines draw top-to-bottom while `ScheduleDonut`'s arcs sweep clockwise, both finishing together.
- **Haptics:** light impact on segment switch; medium impact on successful drag-and-drop of an unscheduled task into the grid.
- **Reduced-motion path:** draw-first sweeps replaced with a standard opacity fade; the current-event breathing glow locks to a static 65% opacity (midpoint of its animated range, not the resting 55%, so the "live" card still reads as distinct without motion).

### 11. Motivation-tier adaptation
- **Low density:** `SegmentedTabs` show day only (week/month hidden). Unscheduled list capped at 1–2 items. CIA suggestion copy softens from a specific nudge to an open question — e.g. "want to add anything to today?" instead of naming a time and activity.
- **Medium density (default):** all three views available. 3–4 unscheduled items. `EventCard`s show time + title + domain accent only.
- **High density:** week/month views add a per-day heatmap — a single-hue orange opacity scale (16%–70% fill, never a rainbow/multi-hue scale) reading time-allocation density per day, staying inside CANON §7's single-color-fade spirit even though it's a density map rather than a line chart. `EventCard`s expand to show XP and effort-score metadata. A "detailed analytics" `ListRow` appears under the domain-split card, opening an expanded weekly time-allocation view for users who want it.

### 12. Accessibility
- **AA+ contrast:** primary text `#FEFAF3` on `#0A0A0F` (18:1). `ChipDomainTag` text renders in the solid domain color over a 16% domain-tint background fill, verified against CANON §4's palette (e.g. Career `#6366f1`, Fitness `#ef4444`).
- **44px targets:** TopBar glyphs, `CalendarStrip` date pills, drag handles, and the collapse chevron all meet 44×44px minimum.
- **Screen-reader labels:**
  - `+` (TopBar): "Add new event or task"
  - Sync glyph: "Calendar sync status: synced 2 minutes ago"
  - Drag handle (`≡`): "Drag to reschedule: [task name]"
  - Collapse chevron (`⌄`): "Collapse unscheduled list" / "Expand unscheduled list" (state-dependent)
  - `ScheduleDonut`: "Domain split for today: Career, 1 hour 30 minutes; Fitness, 45 minutes" (or "Domain split not available yet" in honest-null)
  - `ChargeMeter`: "Day fullness: 4 hours 30 minutes scheduled of a 16 hour waking window" (or "Day fullness not available yet" in honest-null)
  - Missed event block: "Missed event: [event name]. Double-tap to reschedule."
- **Reduced motion:** honors CANON §6 system-wide — see §10 for the exact fallback on this screen's draw-first and breathing motifs.

### 13. Premium checklist
1. **Connects:** yes — domain-split arcs deep-link to their Domain Dashboards; the day-fullness capacity read and CIA's recovery nudges tie time management directly to load/recovery.
2. **Honest:** yes — full 3-state system on every metric that is a metric (domain split, day fullness), with an explicitly justified N/A where a fuzzy mid-state genuinely doesn't exist (day fullness's low-confidence tier); sync status handled through its own honest-staleness pattern; missed events never shamed.
3. **Premium:** yes — draw-first choreography, selective glass (nav/CIA moments) against solid data density (timeline/metrics), one restrained breathing glow rather than two competing ones, a deliberately absent Display hero on a utility screen.
4. **Dark only:** exclusively `--bg-base` `#0A0A0F` plus warm radial atmosphere.
5. **Glass tiers obeyed:** `.glass-pill` for nav-adjacent chrome (TopBar, SegmentedTabs), `.glass-card` for the one CIA moment, `SolidCard` for everything data-dense — no mixing within one composition.
6. **One hero color:** burnt orange `#FF5E00` anchors the day's live effort and its one "happening now" moment.
7. **One hero type moment... corrected to two, each independently capped:** *whole* (domain-split) and *room* (CIA suggestion) — each its own moment, each one word, per CANON's per-moment (not per-screen) cap; no Display-level headline forced onto this utility screen.
8. **No CIA:** verified clean — zero occurrences in this spec.
9. **One BtnPrimary per composition:** "Connect Google Calendar" is the sole `BtnPrimary` in the Cold-Start state; the default state carries no competing primary button.
10. **Crisis/Safety:** honestly not applicable — CANON §8 scopes the crisis-resource layer to wellbeing/mood/check-in surfaces, and Schedule is a time-management utility, not one of those; nothing here is gamified or mood-adjacent enough to need it.
11. **Consent/Revoke:** `ConsentCard` on first Google Calendar connect, plus a standing revoke path via long-press on the sync glyph at any time afterward — not a one-time-only disclosure.
12. **Locked-feature gating:** not applicable — Schedule is core utility across both tiers; the low/medium/high variants in §11 change density and depth, not access, so nothing here renders as a `PaywallLock` preview.
13. **Single add-entry, not a duplicated FAB:** *corrected* — the draft's floating `FABQuickLog` duplicated the TopBar `+` and misapplied a component scoped to Today-tab water/meal/mood logging; removed in favor of the one TopBar action opening an add-event sheet.
14. **Provenance chips:** mandatory "via Google Calendar" on every synced event and on the domain-split real state; correctly withheld on user-authored unscheduled items, which carry no source ambiguity.
