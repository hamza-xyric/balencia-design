# 41-schedule-calendar - A+++ hi-fi mobile spec

## Header
- **Source ID:** 41
- **Source spec:** `Balencia-New-Screens/screens/41-schedule-calendar.md`
- **Evidence:** screens/41-schedule-calendar.md, work/briefs/41.md, work/drafts/41.md, Functional Content Brief: Schedule / Calendar
- **Route(s):** `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Answer "what does my day look like, and what should I do when" by fusing synced external calendar events with CIA's contextual suggestions in one timeline.
- **Premium Visual Director:** make schedule-calendar timeline the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** schedule-calendar uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+
        |   Schedule          synced 2m ago      + |
        +-------------------------------------------+
        |  [ day ] [ week ] [ month ]                |
        |                                            |
        |     M  T  W  T  F  S  S                  |
        |      o  o (o) o  o  o  o                   |
        +-------------------------------------------+
        |  +- domain split ---- day fullness ---+    |
        |  |  (donut)         ##########         |    |
        |  |  Career 1h30m    room to breathe    |    |
        |  +----------------------------------+      |
        +-------------------------------------------+
        |  +- CIA suggested ------------------+      |
        |  |  some open time this afternoon  |      |
        |  |  for a short walk - see below     |      |
        |  |           [dismiss]  [see it]      |      |
        |  +----------------------------------+      |
        +-------------------------------------------+
        |  unscheduled (2)                          |
        |  o Deep work block                        |
        |  o Read 10 pages                          |
        +-------------------------------------------+
        |  9 AM -------------------------            |
        |       +-----------------------+            |
        | 10 AM | [G] Team Sync        |            |
        |       +-----------------------+            |
        | 11 AM -------------------------            |
        |                                             |
        | 12 PM -------------------------            |
        |       + - - - - - - - - - - - +            |
        |  1 PM |  Lunch walk         |            |
        |       + - - - - - - - - - - - +            |
        |  2 PM -------------------------            |
        |  3 PM -------------------------            |
        +-------------------------------------------+

Route handling: `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]`
```

## Focal Hierarchy
- **Dominant focal moment:** schedule-calendar timeline; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** View switcher & date nav, Today-at-a-glance card, CIA suggested action card, Unscheduled list.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*calendar*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Schedule/Calendar frame was visible in the supplied Figma screenshots and Figma MCP returned an access error in this pass. Use the warm-light dashboard/calendar language from Home and Workouts Calendar only as derived visual direction.
- **Shell/anatomy:** warm-light calendar mode uses a top-level `/schedule` header with title `Schedule`, visible `synced 2m ago` source chip, plus action, segmented day/week/month tabs, orange current-day selection, event cards, and CIA suggestion cards with dashed purple borders.
- **Route split:** `/schedule` and `/wellbeing/schedule` use the top-level schedule header; `/wellbeing/schedule/[date]` is a stack/detail state with back chevron, selected date title, and no implication that every nested date owns the same top-level header.

## Components
- **TopBar** (transparent -> gains `.glass-pill` backdrop on scroll): back chevron (44px), H1 "Schedule," sync glyph, single `+` action opening a `Sheet` (`half`) with two `ListRow` entries - "Add event" (time-anchored) and "Add unscheduled task" (backlog). This replaces the removed `FABQuickLog` as the screen's only add-entry point.
- **SegmentedTabs** (default): day / week / month, `--surface-3` active fill.
- **CalendarStrip** (default): horizontal 7-day scroller, today ringed orange, days with completed actions carry a green dot.
- **SolidCard** (default, one instance): shared container for `ScheduleDonut` + `ChargeMeter` - see 6 for why one card holds two widgets under one glow.
- **NEW: ScheduleDonut** - multi-stop conic-gradient donut for domain time-split. *Rationale:* `ProgressRing` only supports a single-color goal fill; a schedule's composition is inherently multi-domain (Career, Fitness, ), which needs each domain's own tag color as a discrete flat arc - see 6 for why this doesn't collide with the single-metric line-chart rule in CANON 7.
- **ChargeMeter** (default) - *corrected from the draft's `MomentumBar`.* Day fullness tracks a depleting resource (waking-window capacity being spent as events accumulate), and its positive framing is "room left," not "amount filled" - that is exactly `ChargeMeter`'s job per catalog ("depletable capacity"), not `MomentumBar`'s ("cumulative progress," which frames more-fill as achievement - wrong valence here, since an overfull day is the failure state, per the "protect some recovery" copy in 7).
- **CIAInsightCard** (default): purple-tinted glass, spark glyph, one Tiempos-italic emphasis word, actions `BtnCoach` ("see it," scrolls to the dashed slot) + `BtnGhost` ("dismiss").
- **ListRow** (interactive): unscheduled backlog items, drag handle (``, 44px target).
- **NEW: TimelineGrid** - vertical hour gridlines (`rgba(255,255,255,.05)`, matching the `TrendChart` gridline token) with absolute-positioning containers for event blocks. *Rationale:* the catalog has no time-axis layout primitive; this is the minimal one needed and is a plain layer over the atmosphere, not a card (no fill, no border, no glow).
- **NEW: EventCard** - compact `--surface-2` block, radius **16** (an intentional in-between of the input radius 14 and card radius 28, sized for the compact hour-height block; flagged here rather than silently invented as a new token). States: **solid border** = synced/real (`ChipProvenance` "via Google Calendar"); **dashed purple border** = CIA-suggested/projected; **neutral paper-16% dashed border, no color** = missed. A 3px leading accent bar in the event's `ChipDomainTag` color identifies its life area at a glance - this reuses the domain palette as a tag/icon accent, not as chrome, consistent with CANON 4.
- **ConsentCard** (Cold-Start state): states what calendar data is read, why, retention; `BtnPrimary` "Connect Google Calendar" + `BtnGhost` decline, equal prominence. The visible `synced 2m ago` / source chip opens `Manage calendar connection` with export, revoke, and delete; long-press is optional redundancy, not the primary path.
- **OfflineBanner / SyncStatus** (glass-pill): staleness-labeled sync state, see 8.
- **ErrorState**: quiet failed-event-load pattern, see 9.
- **SkeletonState**: shimmer geometry matching the real layout.

## Data Honesty
- Every metric ships its 3 states (real / low-confidence / honest-null). Never a fabricated number.
- **Domain split (`ScheduleDonut`):**
- 1. *Real:* Career 1h 30m, Fitness 45m - `ChipProvenance` "via Google Calendar."
- 2. *Low-confidence:* faded arcs, Caption "estimated  low confidence" (e.g. an all-day event with no clear domain tag, apportioned by CIA's best guess).
- 3. *Honest-null:* ghosted ring, copy "nothing scheduled yet - tap + or accept a CIA suggestion."
- **Day fullness (`ChargeMeter`):**
- 1. *Real:* 4h 30m of 16h waking window - `ChipProvenance` names the wake-window source, e.g. `via sleep schedule`, `via Health sleep`, or `you set`, with freshness and consent dependency.
- 2. *Low-confidence:* genuinely not applicable, and stated honestly rather than forced - day fullness is a sum of confirmed scheduled time against a known wake-window; there is no fuzzy midpoint between "known" and "unknown" for a time total, so it is either real or honest-null, never an estimate.
- 3. *Honest-null:* empty track, copy "room to breathe today" (no wake-window data yet, or nothing scheduled).
- **Sync / connection status** *(clarified: this is the `OfflineBanner`/`SyncStatus` component's own state machine, not the metric real/low-confidence/honest-null pattern - a connection status isn't a data value, so it doesn't force-fit that triad):*
- 1. *Connected:* `synced 2m ago` chip opens manage connection.
- 2. *Stale/offline:* `offline - showing last sync 2h ago`; event list remains cached and source-dependent actions are disabled with reason.
- 3. *Revoked/not connected:* `calendar not connected`; timeline keeps manual tasks and CIA suggestions honest-null.

## Consent and Safety
- The visible sync/source chip opens calendar controls: provider, categories read, event scope, last sync, wake-window source, retention, export calendar-derived plan data, revoke provider access, and delete cached calendar data.
- CIA suggestions name whether they came from calendar, wake-window, manual tasks, or no source; if wake-window consent is missing, day fullness renders honest-null instead of derived.
- Keep navigation targets aligned to `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]`. Do not add alternate vanity routes.

## States
- **Default:** day view, current date selected, solid synced events, one dashed CIA suggestion, current-time card breathing orange.
- **Overpacked:** triggered when scheduled time passes ~85% of the waking window; `ChargeMeter` fill reads near-full, copy switches to "a full one - protect some recovery," and the CIA suggested card (if any) prioritizes a recovery nudge over a task nudge.
- **Missed:** the event's block renders with a neutral paper-16% dashed border (no color, no shame) and swaps its trailing chevron for "Missed - reschedule"; tapping opens the reschedule sheet directly.
- **Skeleton:** shimmer blocks over the timeline, ghost ring for the donut, faded `--surface-3` placeholder cards, matching real geometry per `SkeletonState`.
- **Empty (Cold-Start):** `ConsentCard` for Google Calendar is the prominent single action; CIA starter tasks seed the unscheduled list; donut in honest-null.
- **Error:** *Correction - the draft used a red left border on a failed event card, calling it "neutral, non-gamified," which contradicts itself; red reads as an alarm, not neutral.* Replaced with the catalog's actual `ErrorState` pattern: a quiet glyph on the affected block, plain-language Body ("Couldn't load this event"), `BtnSecondary` "Try again" - no color-coded blame, consistent with CANON's "never a red-vs-green moralizing" spirit extended here from deltas to failures.
- **Success (event created / dragged):** card scales 1.0 -> 0.98 -> 1.0, brief `--glow-done` `#34A853` flash, 250ms.
- **Disabled:** the TopBar `+` add-action and pull-to-refresh disable during offline mode, with the reason stated in the `OfflineBanner` itself (no silent disabling).

## Motion
- **Physical easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for horizontal swipes (date nav, swipe-to-dismiss) - a spring-like curve in service of CANON's "physical, never linear" rule; CANON doesn't fix an exact curve, so this is an implementation choice within that constraint, not a canon citation.
- **Feedback (150-250ms):** `EventCard`s scale to `.98` on press; `SegmentedTabs` active indicator slides in 150ms.
- **Glow behavior:** only the current-time `EventCard`'s `--glow-you` breathes (55%->80%->55%, 4s loop) - see 6 for why the domain/fullness card's glow was corrected to static.
- **Choreography ("draw-first," hero/celebration-class motif per CANON 6):** entering day view, `TimelineGrid`'s hairlines draw top-to-bottom while `ScheduleDonut`'s arcs sweep clockwise, both finishing together.
- **Haptics:** light impact on segment switch; medium impact on successful drag-and-drop of an unscheduled task into the grid.
- **Reduced-motion path:** draw-first sweeps replaced with a standard opacity fade; the current-event breathing glow locks to a static 65% opacity (midpoint of its animated range, not the resting 55%, so the "live" card still reads as distinct without motion).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/schedule`, `/wellbeing/schedule`, `/wellbeing/schedule/[date]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ contrast:** primary text `#FEFAF3` on `#0A0A0F` (18:1). `ChipDomainTag` text renders in the solid domain color over a 16% domain-tint background fill, verified against CANON 4's palette (e.g. Career `#6366f1`, Fitness `#ef4444`).; **44px targets:** TopBar glyphs, `CalendarStrip` date pills, drag handles, and the collapse chevron all meet 44x44px minimum.; **Screen-reader labels:**
