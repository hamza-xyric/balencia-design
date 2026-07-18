# 17-me-main - A+++ hi-fi mobile spec

## Header
- **Source ID:** 17
- **Source spec:** `Balencia-New-Screens/screens/17-me-main.md`
- **Evidence:** screens/17-me-main.md, work/briefs/17.md, work/drafts/17.md, Functional Content Brief: Me Main
- **Route(s):** `/profile`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Me Main is the member's identity hub: profile anchor, progression snapshot, life-power composition, and navigation gateway into personal sub-screens.
- **Premium Visual Director:** make me-main capture frame the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** me-main uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|                                    |
|          o avatar + camera           |
|          Hamza                        |
|        level 14  dedicated explorer |
|        ######### 2,450 / 5,809 XP    |
|        member since May 2026         |
+--------------------------------------+
| 42 day streak | 12 completed         |
| 487 Life Power| 8,450 total XP        |
+--------------------------------------+
| Composed of                    see all 10 |
| Fitness      ######### 74            |
| Wellbeing    ######### 62            |
| Career       ######### 55            |
+--------------------------------------+
| Mission journal   18 entries         |
| Book of life      what CIA knows     |
| Connected apps    3 connected        |
| Progress photos   24 photos          |
| Achievements      31 earned          |
+--------------------------------------+
| suggested for you                    |
|  grow your meditation ->             |
+--------------------------------------+

Route handling: `/profile`
```

## Focal Hierarchy
- **Dominant focal moment:** me-main capture frame; it should be visually singular, not one tile among many.
- **Secondary layer:** Floating header with CIA only when the source supports a synthesized read.
- **Operational layer:** Profile anchor, Progression snapshot, Life Power composition, Quick links grid.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*main*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar glyph controls** for settings and search, each 44px.
- **NEW: AvatarUploader - rationale:** profile-photo action wrapping image permission, current/avatar fallback, and upload state; no catalog component owns photo capture/upload.
- **ProgressBar** for XP-to-next-level.
- **KPIRow** for four profile stats.
- **ProgressBar** for Life Power composition rows.
- **NEW: QuickLinkCard - rationale:** navigation card with destination icon, dynamic subtitle/count, and privacy-aware staleness label.
- **CIAInsightCard** for the discovery recommendation.
- **ChipProvenance** for stat sources and sync timestamps.
- **SkeletonState, ErrorState, OfflineBanner, HonestNullState, BtnGhost, GlassNavBar** for states and navigation.

## Data Honesty
- **Profile identity:** real = name and avatar from profile API with ChipProvenance "via profile"; low-confidence not applicable; honest-null = initials avatar and "Add your name."
- **Level and XP:** real = RPG stats; low-confidence = cached values muted with "estimated  low confidence" during sync; honest-null = level 1 with "building your momentum."
- **Life Power:** real = calculated from active domain stats; low-confidence = muted if any domain is syncing; honest-null = "building your balance" and ghosted bars.
- **Quick-link subtitles:** real = counts from their destination systems; low-confidence = stale count label; honest-null = warm starter copy such as "no entries yet."
- **CIA suggestion:** real = recommendation with provenance "via recent activity"; low-confidence = ConfidenceMeter; honest-null = fallback popular modules.

## Consent and Safety
- me-main uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/profile`. Do not add alternate vanity routes.

## States
- **Default:** profile anchor, stats, composition, quick links, and discovery carousel render.
- **Skeleton:** avatar, XP bar, stats, ProgressBars, and cards shimmer in final geometry.
- **Empty:** level 1, no XP, ghosted domain bars, starter quick-link subtitles.
- **Error:** cached data remains; failed modules show scoped ErrorState.
- **Success:** pull-to-refresh updates stats and shows "Stats refreshed."
- **Disabled:** pull-to-refresh and photo upload controls dim at 40% while offline or permission-blocked.
- **Offline:** cached data renders with staleness label; discovery falls back to popular modules.

## Motion
- Pull-to-refresh reloads profile, stats, and suggestions. Tap avatar opens Profile Edit. Tap stat row opens Life World. Quick-link cards scale to .98 and push their destination.
- XP and ProgressBars draw left-to-right; stats count up; quick links stagger after profile anchor.
- Avatar upload success uses a subtle glow-done ring; failure keeps the old avatar.
- **Reduced-motion path:** count-ups and draws snap to final values, quick links do not stagger, avatar ring does not pulse.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/profile`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: Settings, search, avatar, stat cells, quick links, and nav tabs meet 44px minimum targets.; Avatar action announces current photo state and edit path.; Stat bars include numeric values and source labels for screen readers.
