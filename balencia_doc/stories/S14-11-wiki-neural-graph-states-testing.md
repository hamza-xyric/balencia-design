---
type: story
id: S14.5.2
title: Wiki Neural Graph Empty/Error States & Test Coverage
epic: E14
epic_name: Relationships CRM, Life Correlation Matrix & Knowledge Systems
feature: F14.5
feature_name: Wiki Neural Graph
product: yhealth-platform
priority: P1
status: Done
created: 2026-07-08
---

# S14.5.2: Wiki Neural Graph Empty/Error States & Test Coverage

## User Story

**As an** Optimization Enthusiast with a new or sparsely-populated wiki,
**I want** the Neural Graph to honestly tell me when there's nothing to show yet, or when it fails to load, rather than rendering something misleading,
**So that** I trust the graph completely once it does show content, and I know the surface is reliable across future wiki changes.

---

## Story Type

- [ ] Feature
- [x] Enhancement
- [ ] Technical
- [x] Integration

## Priority

- [ ] Must Have (P0)
- [x] Should Have (P1)

---

## Scope Description

**Honest Empty State:**
- Zero wiki pages -> render an honest empty state distinct from the loading state, consistent with F14.1/F14.3's empty-state discipline: "Your wiki is empty. Create your first page to see it here."

**Error State:**
- `GET /api/v1/wiki/graph` fetch failure -> show an error state with retry; the pipeline never silently renders stale/empty data as if it were a valid current graph

**Test Coverage (Shipped):**
- 37 unit-level tests covering the graph engine logic (node/edge computation) independent of any DOM/canvas context - engine logic is pure and testable in isolation
- 31 component-level tests covering the canvas renderer, exercised via component tests since canvas rendering itself requires a DOM context
- All 68 tests green at ship time; CI gate requires they remain green across subsequent wiki changes (test stability is itself a tracked success metric)

**Flexibility Modes (as they relate to state handling):**
- **Light mode:** Neural Graph is a glanceable overview - most-connected pages visually prominent; empty/error states still apply, just without deep pan/zoom exploration
- **Deep mode:** full canvas exploration; empty/error states gate entry into that exploration flow

---

## Acceptance Criteria

```gherkin
Scenario: Zero wiki pages renders honest empty state
  Given a user with zero wiki pages
  When they open the Wiki Neural Graph tab
  Then an empty state renders, distinct from the loading skeleton
  And the user sees "Your wiki is empty. Create your first page to see it here."

Scenario: Graph fetch failure shows retry, never a silent stale render
  Given GET /api/v1/wiki/graph fails
  When the Neural Graph tab attempts to load
  Then an error state renders with a retry action
  And no stale or empty graph is rendered as if it were valid current data
  And the user sees "Couldn't load your Neural Graph. Try again?"

Scenario: Unit test suite green
  Given the wiki neural graph engine logic
  When the unit test suite runs
  Then all 37 unit tests pass, covering node/edge computation independent of canvas rendering

Scenario: Component test suite green
  Given the wiki neural graph canvas renderer
  When the component test suite runs
  Then all 31 component tests pass, covering renderer behavior via DOM-based component tests

Scenario: Test stability across subsequent changes
  Given a subsequent, unrelated wiki change is made
  When CI runs
  Then all 68 Neural Graph tests (37 unit + 31 component) remain green
```

---

## Success Metrics

- Test stability: 37 unit + 31 component tests remain green across subsequent wiki changes (CI suite)
- Empty-state honesty: 100% of zero-page users see the genuine empty state, never a fabricated/sample graph

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|----------------|
| Error/empty state renders immediately on known-zero/known-failure, no unnecessary loading delay | N/A (state-handling only) | N/A | Empty/error state text is screen-reader announced, not conveyed by graphic alone | CI test suite runs in the platform's standard Jest/component-test pipeline |

---

## Dependencies

- **Prerequisite Stories:** S14.5.1 (canvas rendering surface this story adds states and tests to)
- **Related Stories:** S14.6.1, S14.6.2 (a reliable synthesizer is what makes these tests meaningful rather than testing against flaky data)
- **External Dependencies:** CI test pipeline, `EmptyGraph`-equivalent shared empty-state component pattern

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|--------------------|----------------------|
| Zero wiki pages | Page count = 0 for user | Render honest empty state distinct from the loading state | "Your wiki is empty. Create your first page to see it here." |
| Wiki graph fetch failure | `GET /api/v1/wiki/graph` errors | Show error state with retry, do not silently render stale/empty graph as if valid | "Couldn't load your Neural Graph. Try again?" |
| Test flakiness introduced by a future wiki change | CI run shows intermittent failure | Change blocked from merge until suite is green again (no skipped/red tests shipped) | N/A (CI gate, not user-facing) |

---

## Open Questions

- None outstanding for this story.

---

## Definition of Done

- [x] Honest empty state renders for zero-page users, distinct from loading state
- [x] Error state with retry renders on graph fetch failure, never a silent stale render
- [x] 37 unit tests green (graph engine logic, independent of canvas/DOM)
- [x] 31 component tests green (canvas renderer)
- [x] CI gate enforces all 68 tests remain green on subsequent wiki changes
- [x] No skipped or red tests shipped

---

*Story S14.5.2 | Epic E14 | Product: Balencia Platform*
