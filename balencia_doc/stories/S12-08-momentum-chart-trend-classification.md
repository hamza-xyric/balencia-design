---
type: story
id: S12.5.2
title: Momentum Chart & Trend Classification
epic: E12
epic_name: Career Pillar & Execution OS
feature: F12.5
feature_name: Career Analytics (Consistency Heatmap + Momentum Chart)
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S12.5.2: Momentum Chart & Trend Classification

## User Story

**As a** Busy Professional (P2),
**I want to** see whether my career execution is accelerating, flat, or decaying over recent weeks,
**So that** I get an early, honest signal instead of only realizing I've stalled after weeks have already passed.

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
- Light mode: single momentum arrow (↑ building / → steady / ↓ slipping) on the Analytics tab
- Deep mode: momentum chart with selectable time ranges (4/12/26 weeks); per-focus-area momentum breakdown is **not** included in this story's Must-Have scope (see Open Questions)

**Technical Foundation:**
- Computed as a rolling week-over-week completion-ratio series (`tasks_completed / tasks_total` per ISO week)
- Trend classification uses a linear regression slope over the trailing N weeks, not point-to-point comparison, to avoid noisy flip-flopping on a single outlier week:
  - slope > +0.05 → "building"
  - -0.05 ≤ slope ≤ +0.05 → "steady"
  - slope < -0.05 → "slipping"
- Feeds two downstream consumers: SIA context for Obstacle Plan triggers (F12.6) and E08 Cross-Domain Intelligence's weekly completion series

**Computation Pipeline (High-Level):**
```
1. GROUP progress_events by ISO week
2. completion_ratio[week] = tasks_completed[week] / tasks_total[week]
3. trend = linear_regression_slope(completion_ratio, trailing_N_weeks)
4. classify: slope > +0.05 → "building"
             -0.05 <= slope <= +0.05 → "steady"
             slope < -0.05 → "slipping"
5. Feed downstream:
   - Momentum state → SIA context for Obstacle Plan triggers (F12.6)
   - Weekly completion series → E08 correlation engine
```

---

## Acceptance Criteria

```gherkin
Scenario: Momentum computed as rolling week-over-week trend
  Given a goal has 6 weeks of completion-ratio history
  When the momentum chart is requested
  Then the completion_ratio is computed per ISO week and a trend slope is derived over the trailing weeks

Scenario: Building state classification
  Given the trailing-week completion-ratio slope is +0.08
  When trend classification runs
  Then the momentum state is "building"

Scenario: Slipping state classification
  Given the trailing-week completion-ratio slope is -0.09
  When trend classification runs
  Then the momentum state is "slipping"

Scenario: Single outlier week does not flip momentum
  Given a user has several stale weeks followed by one heavy catch-up week
  When momentum is recomputed
  Then the smoothed trailing slope (not point-to-point) prevents the state from flipping on that single data point

Scenario: Deep mode selectable time ranges
  Given a user is in Deep mode on the Analytics tab
  When they select a 12-week range instead of the default
  Then the momentum chart recomputes and renders for that range

Scenario: Sustained slipping state triggers Obstacle Plan surfacing
  Given momentum state is "slipping" for 2+ consecutive weeks
  When the weekly scan evaluates Obstacle Plan triggers
  Then an Obstacle Plan prompt is surfaced to the user (see S12.6.1)

Scenario: Not enough data yet
  Given a goal has fewer than the minimum weeks of history needed for a trend
  When the momentum chart is requested
  Then it renders "not enough data yet" instead of a misleading classification
```

---

## Success Metrics

- Analytics tab weekly view rate: 40%+ of active career users
- Users who take a corrective action within 48h of seeing a "slipping" momentum state: 35%+
- Momentum chart computation performance: <300ms (server-side rolling-window calculation on existing indexed event data)
- Consistency-to-goal-completion correlation: positive, r > 0.3

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Momentum chart computation <300ms server-side | Computation scoped to authenticated `user_id` + goal ownership | Weekly completion series shared downstream (E08) only in aggregate/correlation form, not raw task content | Momentum arrow/state conveyed with text label, not arrow-icon-only | Reuses the pure-SVG clay-chart rendering pattern established on the Reputation page rebuild |

---

## Dependencies

- **Prerequisite Stories:** S12.2.1/S12.2.2 (Weekly Execution Engine is the sole data source), S12.5.1 (shares the event-reading pipeline)
- **Related Stories:** S12.6.1 (a sustained "slipping" state is the primary automated Obstacle Plan trigger)
- **External Dependencies:** E08 Cross-Domain Intelligence (downstream consumer of the weekly completion series)

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|---------------------|
| No activity yet (new goal) | Zero `progress_events` rows for the goal | Momentum renders "not enough data yet" | "Your consistency map starts filling in once you complete your first task." |
| Momentum trend flips on a single outlier week | e.g., one heavy catch-up week after several stale weeks | Use smoothed trailing slope, not point-to-point | Silent — momentum state changes only on a sustained trend |
| Timezone missing/null on user record | `user_preferences.timezone` unset | Fall back to UTC with a visible disclaimer | "Set your timezone in settings for a more accurate activity map." |

---

## Open Questions

- Per-focus-area momentum breakdown in Deep mode is **not verified built** — goal-wide momentum is live and confirmed; focus-area-scoped momentum sub-charts are part of the Advanced Analytics Should-Have item, out of this story's scope. Not treated as a defect against this story's Definition of Done.
- Application funnel / interview conversion charts are **not built** — depends on the Application Tracker (S12.9.1, Should-Have), also out of scope here.

---

## Definition of Done

- [x] Acceptance criteria met
- [x] Momentum chart computes week-over-week completion-ratio trend with a 3-state classification (building/steady/slipping)
- [x] Momentum chart is pure-SVG, matching the platform's clay-styled chart approach
- [x] Momentum state feeds SIA context for Obstacle Plan triggers
- [x] Weekly completion series available to E08 correlation engine
- [ ] Per-focus-area momentum breakdown (Deep mode) — deferred, tracked in Should-Have tier
- [x] Unit tests cover momentum trend classification including outlier-week smoothing

---

*Story S12.5.2 | Epic E12 | Product: Balencia Platform*
