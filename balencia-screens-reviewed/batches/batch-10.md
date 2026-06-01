# Batch 10 - Data And First Domain Dashboards

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b10/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 72 | Knowledge graph | `/tabs/me/knowledge-graph` | `../app_design 3/72-knowledge-graph.md` | `reviewed` |
| 84 | Data sources | `/tabs/me/data-sources` | `../app_design 3/84-data-sources.md` | `reviewed` |
| 26 | Fitness dashboard | `/domains/fitness` | `../app_design 3/26-fitness-workouts-dashboard.md` | `reviewed` |
| 27 | Workout detail | `/domains/workout` | `../app_design 3/27-workout-detail-active-workout.md` | `reviewed` |
| 28 | Nutrition dashboard | `/domains/nutrition` | `../app_design 3/28-nutrition-diet-dashboard.md` | `reviewed` |

## Batch Focus

Validate data transparency, fitness and nutrition dashboard density, and active-workout ergonomics.

## Batch Summary

- Ship-ready: None.
- Must-fix: 72 Knowledge graph, 84 Data sources, 26 Fitness dashboard, 27 Workout detail, 28 Nutrition dashboard.
- Redesign candidates: 72 Knowledge graph should become a guided interactive insight-map for V1; 27 Workout detail needs manual planning/logging split from immersive active workout, pause, and summary modes.
- Resolved decisions:
  - Ship V1 Knowledge Graph as a guided interactive insight-map, not a raw force graph.
  - Split workout planning/manual logging from immersive active workout, pause, and summary modes.
  - Data Sources may remain a visual trust placeholder for prototype acceptance, clearly marked demo/no live sync.

## Screen Notes

### 72 - Knowledge graph

- Five-second read: A Sleep quality detail panel dominates the screen; the promised graph is mostly hidden behind it.
- Primary action clarity: Explore, zoom, ask SIA, go to domain, legend, help, and close are visually implied but do not change state or route.
- Emotional tone: Analytical and premium in color, but the static panel makes SIA's "brain" feel like a mock rather than a product differentiator.
- Screenshot: `/private/tmp/balencia-b10/tabs-me-knowledge-graph-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The knowledge graph is a strong commercial differentiator and belongs in the Me intelligence stack. |
| User friction | 1 | The primary exploration job is blocked because nodes, controls, legend, and actions are inert. |
| Visual appeal | 2 | The graph canvas has promise, but the default bottom sheet covers the hero and leaves the first viewport feeling cramped. |
| Brand fit | 3 | Purple correctly marks SIA intelligence, but the hidden graph undercuts the cinematic AI moment. |
| Mobile ergonomics | 2 | Several controls meet 44px, but the close button is 36x36, action buttons are 40px tall, and the panel crowds the tab bar. |
| Accessibility | 1 | Icon buttons are unlabeled, the graph has no semantic alternative, and nodes are not operable controls. |
| Trust/privacy | 3 | Personal correlations are valuable, but the help/source explanation is unreachable. |
| Industry best practice | 1 | Interactive data visualizations need selectable nodes, zoom/pan/reset, legend/help, and a text fallback. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | information-architecture | Live report found `0` inputs, `7` buttons, and only the Back link. `Ask SIA`, `Go to domain`, Help, and Close left `/tabs/me/knowledge-graph` unchanged; `Legend` timed out as a noninteractive text element. | Users cannot explore correlations, navigate from a node, ask SIA, open help, or dismiss the panel. | Implement node tap/select, empty-area deselect, pan/zoom/reset, legend expansion, help sheet, Ask SIA route context, and Go to domain navigation. | proposed |
| major | visual-polish | Screenshot evidence shows the Sleep quality bottom sheet open by default, covering the graph, lower nodes, and much of the legend/control area. | The screen's most important visual asset is not the first-viewport hero, so the differentiator reads as a static detail card. | Start with the graph fully visible, open the detail panel only after node selection, and preserve enough canvas for context when the panel is open. | proposed |
| major | accessibility | The controls report labels five icon buttons as generic `BUTTON`; the close target is 36x36 and the graph nodes are rendered as nonsemantic div/span content. | Screen-reader, keyboard, and motor users cannot understand or operate the graph reliably. | Add accessible names, 44x44 hit areas, keyboard/focus behavior, selected-node state, and a text list of correlations as an alternate representation. | proposed |

Decision: Must fix before launch; redesign candidate because the interaction model and first viewport need to center the graph.

### 84 - Data sources

- Five-second read: A polished trust/control surface with a strong correlation-engine hero, connected sources, health states, and a bottom Connect source CTA.
- Primary action clarity: Connect source is obvious, but it is a no-op; source rows, refresh state, correlations, and back are not actionable.
- Emotional tone: Clear and confidence-building visually, though static controls weaken the trust promise.
- Screenshot: `/private/tmp/balencia-b10/tabs-me-data-sources-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A data-source health surface is exactly the right trust companion for SIA's intelligence layer. |
| User friction | 1 | The user cannot connect, refresh, inspect, or leave via the visible back affordance. |
| Visual appeal | 4 | The cyan hero and source rows are crisp, premium, and scannable. |
| Brand fit | 4 | Cyan, purple, green, and orange each map to source/correlation/SIA/refresh meaning cleanly. |
| Mobile ergonomics | 3 | Rows are large and the CTA is comfortable, but the fixed bottom action compresses correlation visibility. |
| Accessibility | 2 | Only Connect source is exposed as an interactive control; back, rows, and correlations are not semantic. |
| Trust/privacy | 2 | The screen names sources but does not expose permissions, sync history, refresh, disconnect, or coaching-use scope. |
| Industry best practice | 1 | Integration control surfaces need provider detail, OAuth entry, refresh/retry, permission review, and disconnect confirmation. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Live report found only one interactive control: `Connect source` at 341x48. Clicking it left `/tabs/me/data-sources` unchanged with no provider picker, sheet, or loading state. | Users cannot add the data sources this screen exists to manage. | Wire Connect source to a provider picker/OAuth flow with loading, success, cancel, and error states. | proposed |
| major | trust-privacy | Clicking `WHOOP`, `Spotify`, and `Sleep affects tempo pace` left the route unchanged; the visible back chevron is a div, not a link or button. | Users cannot inspect permissions, refresh expired Spotify access, review sync history, open correlations, or leave by the visible back affordance. | Make source rows and correlations semantic links/buttons, add source detail/refresh/disconnect flows, and render the back chevron as a labeled 44px control. | proposed |

Decision: Must fix before launch; the visual structure is strong, but this must become a real trust/control surface.

### 26 - Fitness dashboard

- Five-second read: A strong first domain dashboard with SIA recovery advice, a clear workout card, WHOOP recovery, goals, weekly stats, and a Log workout FAB.
- Primary action clarity: Start workout works and routes to `/domains/workout`; Log workout is clear but routes to the same active workout surface instead of a manual log flow.
- Emotional tone: Motivating, premium, and aligned with the fitness domain.
- Screenshot: `/private/tmp/balencia-b10/domains-fitness-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | The dashboard template works and puts today's workout in the right priority, but manual logging is conflated with active tracking. |
| User friction | 3 | Primary Start workout navigation works; secondary coaching/manual-log paths are static or misrouted. |
| Visual appeal | 4 | Strong hierarchy, good dark surfaces, and a satisfying orange workout CTA. |
| Brand fit | 4 | Fitness red is restrained, orange stays action-oriented, and SIA purple is limited to coaching. |
| Mobile ergonomics | 3 | Primary controls are comfortable; secondary `See all` links and the level badge are below 44px high. |
| Accessibility | 3 | Main links are semantic, but secondary targets are small and the SIA note is not operable despite spec behavior. |
| Trust/privacy | 3 | WHOOP data is clear at a glance, but source/detail and SIA context paths are not available from the dashboard. |
| Industry best practice | 3 | Good dashboard composition, but manual logging and AI coaching need distinct, functional exits. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | product-sense | Live clicks showed `Start workout` and `Log workout` both navigate from `/domains/fitness` to `/domains/workout`. | Users trying to manually record a completed workout are sent into the active workout tracker, which is a different intent. | Route Log workout to a manual workout logging flow or sheet, and reserve `/domains/workout` active mode for starting the planned workout. | proposed |
| major | navigation | Clicking the SIA coaching note left `/domains/fitness` unchanged even though the spec says the whole card should open SIA chat with fitness context. | Users cannot ask why SIA recommended intensity or get coaching context from the dashboard's first insight. | Make the SIA note a semantic link/button to `/tabs/sia` with domain/workout context. | proposed |
| minor | mobile-ergonomics | The `Lv.12` badge measures 55x28 and `See all` links measure 43x32, below the 44px touch target gate. | Secondary navigation is less forgiving on mobile and weaker for assistive tech. | Expand hit areas around the badge and secondary links while preserving the compact visual style. | proposed |

Decision: Must fix before launch; the dashboard direction is good, but manual logging and SIA deep-link behavior need to be real.

### 27 - Workout detail

- Five-second read: An active workout tracker showing exercise progress, weight/reps, complete set, rest timer, SIA note, and next-exercise area.
- Primary action clarity: Complete set is dominant, but it does not progress the workout; pause and skip rest are also no-ops.
- Emotional tone: Focused and high-commitment, but the static active state makes the workout feel staged.
- Screenshot: `/private/tmp/balencia-b10/domains-workout-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Active tracking is important, and hiding the tab bar fits the focus mode. |
| User friction | 1 | The core workout task cannot be completed, edited, paused, skipped, or summarized. |
| Visual appeal | 4 | The active card, green completion CTA, and rest ring are clear and motivating. |
| Brand fit | 3 | The domain/action colors are understandable, though the single static state limits Balencia's coaching depth. |
| Mobile ergonomics | 2 | The main CTA is strong, but Skip rest is 36px tall and the next-exercise preview is partly below the first viewport. |
| Accessibility | 1 | Weight and reps are display divs, not inputs; progress/timer state is not announced or editable. |
| Trust/privacy | 4 | Low privacy risk, but the static timer/progress can undermine confidence in tracking accuracy. |
| Industry best practice | 1 | Active workout apps need editable sets, progression, pause/end confirmation, rest controls, and summary completion. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `0` input/textarea/select controls. Clicking `Complete set`, `Skip rest`, and `Pause workout` left `/domains/workout` unchanged with no text/state changes. | Users cannot complete sets, edit weight/reps, pause safely, skip rest, or finish into a workout summary. | Build the active-workout state machine: editable set inputs, complete-set progression, rest countdown/skip, pause overlay, end confirmation, final summary, and persistence. | proposed |
| major | information-architecture | The route opens directly in active mode; the planning and post-workout summary modes from the spec are not present. Fitness `Start workout` and `Log workout` both land on this same active route. | Users lose the preview/planning step and manual log intent is mixed with active tracking. | Implement planning, active, paused, and summary modes, or split manual logging from active workout tracking into clearer routes. | proposed |
| major | accessibility | Weight and reps appear as 52px visual boxes, not labeled inputs; `Skip rest` measures 67x36, and the next exercise content is cut off at the bottom of the first viewport. | Users cannot adjust set data with keyboard/screen readers, and an important upcoming-step cue is easy to miss. | Use real labeled number inputs/steppers, add live timer/progress announcements, make Skip rest 44px high, and keep the next-exercise preview visible or scroll-intentional. | proposed |

Decision: Must fix before launch; redesign candidate until the workout mode architecture is implemented.

### 28 - Nutrition dashboard

- Five-second read: A dense nutrition dashboard with SIA macro advice, meal plan rows, macro tracking, water, quick actions, goals, recent log, and a Log food FAB.
- Primary action clarity: Log food and meal rows route to `/domains/meal`; the inline Add water button is visible but inert.
- Emotional tone: Supportive and practical, with the nutrition domain feeling calmer than fitness while still Balencia-branded.
- Screenshot: `/private/tmp/balencia-b10/domains-nutrition-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | This is a strong second domain dashboard and validates the template for continuous daily tracking. |
| User friction | 3 | Food logging and utility navigation work, but inline water tracking and SIA context are static. |
| Visual appeal | 4 | Meal rows, macro density, and quick actions are readable without losing premium tone. |
| Brand fit | 4 | Nutrition lime stays in domain role and orange remains reserved for the Log food action. |
| Mobile ergonomics | 3 | Primary meal/log targets are comfortable, but Add water is only 32x32 and some secondary links are 32-40px tall. |
| Accessibility | 3 | Most navigation is semantic; water state and SIA guidance need operable controls and stronger announcements. |
| Trust/privacy | 4 | Nutrition data is personal but the screen is not asking for external permissions; static tracking is the bigger trust risk. |
| Industry best practice | 3 | Good dashboard structure, but trackers need instant update/undo and coaching needs a follow-up path. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | retention | Clicking `Add water` left `/domains/nutrition` unchanged with no text/state update; the target measures 32x32. | Users cannot update a daily tracker from the dashboard and may think the water count is decorative. | Make Add water a 44x44 control with immediate increment, undo, target reached feedback, and failure/offline handling. | proposed |
| major | navigation | Clicking the SIA coaching note left `/domains/nutrition` unchanged even though the spec says it should open SIA chat with nutrition context. | Users cannot ask follow-up questions about protein gaps or meal substitutions from the primary coaching insight. | Make the SIA note a semantic link/button to `/tabs/sia` with nutrition context and suggested follow-up prompt. | proposed |
| minor | design-system-consistency | The live header shows `Lv.9`; the spec for Screen 28 calls for `Lv.8`. | Prototype data can feel inconsistent across RPG/domain surfaces. | Align the fixture/spec level or document why the nutrition level changed. | proposed |

Decision: Must fix before launch; the dashboard is close visually, but water tracking and SIA follow-up need wiring.

## Verification

- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
- Targeted visual/interaction report: `/private/tmp/balencia-b10/report.json`.
