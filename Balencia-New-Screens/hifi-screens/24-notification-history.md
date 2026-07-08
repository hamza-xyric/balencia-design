# 24-notification-history - A+++ hi-fi mobile spec

## Header
- **Source ID:** 24
- **Source spec:** `Balencia-New-Screens/screens/24-notification-history.md`
- **Evidence:** screens/24-notification-history.md, work/briefs/24.md, work/drafts/24.md, Balencia Brief & Glass Canon
- **Route(s):** `/notifications`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A transparent, scrollable ledger of past notifications grouped by date.
- **Premium Visual Director:** make Notification history command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Notification history uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+ |
|         (Warm Orange Atmosphere)          | |
+-------------------------------------------+ |
| < |  Notifications          Mark all read | |- TopBar (44px targets)
+-------------------------------------------+ |
|                                           | |
| [ CIA 3 ]  [ Reminders 2 ]                | |- SummaryStatRow
| [ Check-ins 0 ]  [ Social 1 ]             | |
|                                           | |
|                       (Sparkline)     | |- TrendChart (Sparse)
|         ___  ___                      | |
| last 7 days                               | |
+-------------------------------------------+ |
| =========================================  | |- Scrim Fade
|  TODAY                                    | |- Sticky Date Header
| -----------------------------------------  | |
|  *  [C] Sleep dipped to 6.2h              | |- NotificationCard (Unread)
|  |     Sleep impacts spend.      | 2m ago  | |
|  -----------------------------------------  | |
|  O  [R] Time to log your morning meal     | |- NotificationCard (Read)
|  |     Nutrition reminder.       | 1h ago  | |
|  -----------------------------------------  | |
|  *  [S] Alex finished a 7-day streak      | |
|  |     Community update.         | 6h ago  | |
+-------------------------------------------+ |
|                                           | |
|  YESTERDAY                                | |
|  -----------------------------------------  | |
|  O  [C] Stress levels are trending down   | |
|  |     CIA Insight.              | 1d      | |
+-------------------------------------------+ |
|                                           | |
|     (Floating Glass Nav Bar - Me Active)  | |- GlassNavBar
+-------------------------------------------+ |

Route handling: `/notifications`
```

## Focal Hierarchy
- **Dominant focal moment:** Notification history command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere & TopBar with CIA only when the source supports a synthesized read.
- **Operational layer:** Summary Band, Sticky Group Headers, Grouped Notification List, Global Navigation.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*history*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Notification History frame was visible in the supplied Figma screenshots and Figma MCP returned an access error in this pass. Use the warm-light system-screen language from notification permission and Home only as visual language, not direct frame evidence.
- **Shell/anatomy:** route `/notifications` uses a warm-light utility list: back control, title `Notifications`, `Mark all read`, category chips, grouped list rows, unread orange dots, and quiet delete/archive row actions.
- **Entry truth:** Home notification icon routes here; settings can also link here. Back copy must be route-neutral because the entry point is not guaranteed.

## Components
- **TopBar** (`default`): Transparent over atmosphere.
- **SectionHeader** (`default`): Overline + H2 for date groups.
- **TrendChart** (`sparkline`): 7-point curve for frequency pulse.
- **NotificationCard** (`default`, `interactive`): `ListRow` variant. Unread state features an orange dot + `glow-you`.
- **GlassNavBar** (`default`): Floating bottom pill.
- **SyncStatus** (`offline`): Conditional glass-pill banner.
- **HonestNullState**: Used for sparse data and empty states.
- **NEW: SummaryStatRow**: A horizontal scroll of 4 `ChipProvenance`-style tiles that act as inline counters/filters. *Rationale: The brief asked for category counts; wrapping these in solid cards is too heavy. A glass-pill chip row aligns with the 60/30/10 rule and preserves space.*

## Data Honesty
- Every metric ships 3 states (Real, Low-confidence, Honest-null). No fabricated numbers.
- **Metric 1: Frequency Pulse (7-day sparkline)**
- - **Real:** Solid orange curved line + chip `via Notifications API`.
- - **Low-confidence:** (Brief: < 3 days history) Dashed orange line + caption `estimated  building trail`.
- - **Honest-null:** 7 unconnected grey dots + caption `Not enough data yet - 3 more days`.
- **Metric 2: By-Type Counts (Category chips)**
- - **Real:** Integer count (e.g., `3`) + pill provenance.
- - **Low-confidence:** `--` + `syncing` caption (during fetch).
- - **Honest-null:** `0` + omitted from scroll if zero.
- **Metric 3: Notification Read Status**
- - **Real:** unread orange dot, read state with no dot, archived hidden from default group but available by filter, deleted absent with undo toast for the current session.
- - **Low-confidence:** cached/offline rows show `showing last sync 2h ago`; read state changes queue locally with a sync chip.
- - **Honest-null:** no notifications renders `You're all caught up` and hides category-count chips instead of showing zero-value tiles.
- **Delete/history controls**
- - **Real:** row swipe exposes archive/delete; overflow sheet includes export history and delete notification history.
- - **Low-confidence:** delete pending shows queued state and undo.
- - **Honest-null:** controls disabled with reason when there is no history.

## Consent and Safety
- Category chips and row provenance open a Notification Controls sheet: notification category, trigger source, scope, last delivery/sync, retention, export history, revoke category permission, and delete history.
- `Mark all read` supports undo; delete and archive never remove source data outside this notification ledger unless the confirmation says so.
- Keep navigation targets aligned to `/notifications`. Do not add alternate vanity routes.

## States
- **Default:** Populated list, mix of read/unread, summary band live.
- **Skeleton:** Shimmer blocks (`--surface-3` base, 1.2s sweep) match layout geometry. Sparkline shows a flat baseline that morphs into the drawn line.
- **Empty (Cold-start):** Summary band suppressed. Warm empty state with bell glyph and CIA onboarding promise. "Mark all read" disabled (40% opacity).
- **Sparse:** (< 3 days) Summary band omits 0-count chips. Sparkline shows individual dots without a connecting line. Caption: "Building your activity trail".
- **Error:** Summary band suppressed. Centered `ErrorState` with plain language ("Couldn't load notifications. Pull to refresh.").
- **Success:** Unread dots undergo atomic simultaneous fade-out (280ms) when "Mark all read" is tapped.
- **Disabled:** "Mark all read" ghost button drops to 40% opacity and loses orange label when 0 unread items exist.
- **Offline:** `SyncStatus` glass-pill banner pinned below header. Cached list visible.

## Motion
- **Physical Easing:** Standard `cubic-bezier(0.32, 0.72, 0, 1)` for all UI momentum.
- **Feedback (150-250ms):** Rows scale to `.98` on press. Sticky date headers cross-fade to `.glass-card` with blur on scroll.
- **Sparkline Choreography:** Draws left-to-right via stroke-dashoffset (1200ms) on screen entry.
- **Glow behavior:** Unread `NotificationCard` glows subtly. On press/interaction, glow brightens prior to deep-link routing.
- **Haptics:** Light impact on successful deep-link tap. Medium impact synchronized with the fade-out of "Mark all read".
- **Reduced-motion path:** Stroke-dashoffset disabled (line simply fades in). Row entry stagger disabled (all fade in at once).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/notifications`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) exceeds WCAG AA. Orange unread dots (#FF5E00) feature a sufficient differential brightness from the dark background.; **44px Targets:** All notification rows maintain 56px min-height. TopBar chevron and "Mark all read" text button are wrapped in 44x44px transparent tap boxes. Category chips meet 44px height.; **Screen-reader labels:** Glyph-only sparklines read as: "Notification frequency over the last 7 days". Back chevron reads: "Go back".
