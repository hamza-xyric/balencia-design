---
type: story
id: S12.5.1
title: Career Consistency Heatmap
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.5
feature_name: Career Analytics (Consistency Heatmap + Momentum Chart)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.5.1: Career Consistency Heatmap

## User Story

**As a** Busy Professional (P2),
**I want to** see a day-by-day activity density map of my career execution,
**So that** I can catch a slump early and course-correct before I've lost weeks of momentum, rather than only noticing today's task count.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**User Experience:**
- Light mode: compact heatmap strip (last 8 weeks) on the Analytics tab
- Deep mode: full-year heatmap with drill-down into any cell to see that day's completed tasks
- Built as a pure-SVG clay-styled grid (matching the visualization approach established on the Reputation page rebuild) — not a heavyweight charting library

**Technical Foundation:**
- Built from `progress_events` grouped by day, bucketed into intensity tiers (none / light / moderate / heavy) based on completed-task count and logged focus minutes for that day
- Day-bucketing uses `user_preferences.timezone` (the authoritative, current timezone), **not** `users.timezone` (which can be stale) — avoiding the day-boundary drift bug class already fixed elsewhere in the platform (see the global timezone-split fix: `users.timezone` vs `user_preferences.timezone`)
- Reads exclusively from existing event tables (`progress_events`, `career_tasks`) — no separate analytics-specific write path, avoiding a second source of truth for the same activity
- History beyond 12 months collapses to weekly summary cells rather than rendering every raw day cell

**Rendering Pipeline (High-Level):**
```
1. Fetch progress_events for goal_id, bucketed by user-local day
2. FOR each day in range:
     intensity = classify(completed_tasks_count, focus_minutes)
     # none | light | moderate | heavy
3. Render as SVG grid (7 rows x N week-columns), clay color scale
4. On cell click (Deep mode): fetch that day's completed career_tasks list
```

---

## Acceptance Criteria

```gherkin
Scenario: Heatmap renders last 8 weeks in Light mode
  Given a user has 8+ weeks of career activity
  When they open the Analytics tab in Light mode
  Then a compact heatmap strip renders showing daily intensity for the last 8 weeks

Scenario: Heatmap renders full year in Deep mode with drill-down
  Given a user has a year of career activity and switches to Deep mode
  When they click a specific day cell
  Then that day's completed career_tasks list is shown

Scenario: Timezone-correct day bucketing
  Given a user's user_preferences.timezone is set to a non-UTC zone
  When a task is completed at 11:45pm local time (which would be the next UTC day)
  Then the heatmap attributes the activity to the correct local day, not the UTC day

Scenario: Stale users.timezone does not corrupt bucketing
  Given users.timezone is stale/incorrect but user_preferences.timezone is current
  When the heatmap buckets activity by day
  Then user_preferences.timezone is used, not users.timezone

Scenario: Empty state for a new goal
  Given a goal has zero progress_events
  When the heatmap renders
  Then all cells render as "none" intensity with a message: "Your consistency map starts filling in once you complete your first task."

Scenario: History beyond 12 months collapses to weekly cells
  Given a goal has 400+ days of history
  When the full-year heatmap is requested
  Then days older than 12 months are aggregated into weekly summary cells rather than one cell per day
```

---

## Success Metrics

- Analytics tab weekly view rate: 40%+ of active career users
- Users who take a corrective action within 48h of seeing a "slipping" state: 35%+ (shared metric with momentum chart, S12.5.2)
- Heatmap render performance (full year): <500ms
- Consistency-to-goal-completion correlation: positive, r > 0.3 (backend analysis feeding E08 Cross-Domain Intelligence)

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Heatmap render (full year) <500ms, client-side pure-SVG, no server round-trip after initial fetch | Data scoped to authenticated `user_id` + goal ownership | No cross-user data exposure; day-level activity is personal career data | Cell intensity conveyed via both color and `aria-label` text (not color-only) | Pure-SVG clay-chart approach — no heavyweight charting library added to the bundle |

---

## Dependencies

- **Prerequisite Stories:** S12.2.1/S12.2.2 (Weekly Execution Engine is the sole data source)
- **Related Stories:** S12.5.2 (momentum chart shares the same event-reading pipeline), S12.6.1 (a sustained low-activity pattern is an Obstacle Plan trigger)
- **External Dependencies:** `user_preferences.timezone` (authoritative timezone field, platform-wide fix already applied)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| No activity yet (new goal) | Zero `progress_events` rows for the goal | Render empty-state heatmap (all cells "none") | "Your consistency map starts filling in once you complete your first task." |
| Timezone missing/null on user record | `user_preferences.timezone` unset | Fall back to UTC with a visible disclaimer, avoid silent misattribution | "Set your timezone in settings for a more accurate activity map." |
| Heatmap requested for a goal with 365+ days of history | Large date range query | Paginate/aggregate at week granularity beyond 1 year rather than rendering every raw day cell | Silent — older history collapses to weekly summary cells |

---

## Open Questions

- None outstanding for the Must-Have build.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Consistency heatmap renders daily activity density for last 8 weeks (Light) and full year (Deep)
- [x] Heatmap day-bucketing uses `user_preferences.timezone`, not stale `users.timezone`
- [x] Heatmap is pure-SVG, matching the platform's clay-styled chart approach
- [x] Drill-down on a heatmap cell (Deep mode) shows that day's completed tasks
- [x] Analytics reads exclusively from existing event tables — no duplicate write path
- [x] Manual QA performed across DST-adjacent timezones for bucketing correctness

---

*Story S12.5.1 | Epic E12 | Product: Balencia Platform*
