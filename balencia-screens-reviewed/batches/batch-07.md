# Batch 07 - Mission Support And Me Entry

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001` (existing dev server)
- Visual evidence: `/private/tmp/balencia-b07/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 73 | Mission journal | `/tabs/goals/journal` | `../app_design 3/73-mission-journal.md` | `reviewed` |
| 85 | Obstacle coach | `/tabs/goals/obstacles` | `../app_design 3/85-obstacle-coach.md` | `reviewed` |
| 16 | Life areas overview | `/tabs/me/life-areas` | `../app_design 3/16-life-areas-overview.md` | `reviewed` |
| 17 | Me main | `/tabs/me` | `../app_design 3/17-me-main.md` | `reviewed` |
| 18 | Explore section | `/tabs/me/explore` | `../app_design 3/18-explore-section.md` | `reviewed` |

## Batch Focus

Validate mission reflection, obstacle coaching, personal overview, and discovery paths from Me.

## Batch Summary

- Ship-ready: 17 Me main, with minor hit-area polish.
- Must-fix: 73 Mission journal, 85 Obstacle coach, 16 Life areas overview, 18 Explore section.
- Redesign candidates: 85 Obstacle coach needs a per-blocker reconnection state model; 16 Life areas needs Plus-gated comparison once enough history exists; 18 Explore needs search and clear tier-gating behavior.
- Resolved decisions:
  - Mission Journal should preserve the source stack, not force-switch to Goals; Streak details should also preserve source tab context with Me/RPG as canonical owner.
  - Life Areas comparison is Plus-gated after enough history; show preview/upsell only when data exists.
  - Explore tier badges mean minimum required tier; for current-tier features show "Included," not locked.
  - Start reconnection should show per-blocker accept/dismiss controls, with optional "accept all" only after review.

## Screen Notes

### 73 - Mission journal

- Five-second read: A reflective mission archive with completed and archived mission cards grouped by month.
- Primary action clarity: Browsing is clear, but filters, mission entries, photos, and back navigation are not functionally wired.
- Emotional tone: Warm, compassionate, and appropriately retrospective; archived missions feel non-shaming.
- Screenshot: `/private/tmp/balencia-b07/tabs-goals-journal-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A retrospective mission log strongly supports progress memory and RPG continuity. |
| User friction | 2 | Users can read visible cards, but cannot filter, drill into details, open photos, or use the in-app back control. |
| Visual appeal | 4 | Strong card rhythm, good status hierarchy, and premium dark composition. |
| Brand fit | 4 | Orange marks XP and active filters, green marks completion, and domain colors stay identifying. |
| Mobile ergonomics | 3 | Cards are readable and spacious, but filter chips are only 36px tall and the back control is visual only. |
| Accessibility | 2 | Cards/photos are not semantic links or buttons, filters lack expanded/pressed state, and back is not interactive. |
| Trust/privacy | 4 | The narrative summaries feel personal without exposing new sensitive data. |
| Industry best practice | 2 | Archive views need working filters, detail drill-in, media viewing, sticky grouping, and stack exit. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Scoped live check found `0` links and `3` buttons. Clicking `By domain`, `By type`, and `Run a half marathon` left `/tabs/goals/journal` unchanged with no text/state change. | Users cannot filter the journal, open completed or archived mission detail, or view attached memories. | Wire filter state, domain/type sub-filter rows, mission detail links, and photo thumbnails to Image Viewer. | proposed |
| major | navigation | Header inspection found no `a`, `button`, or `role="button"` target for the visible back chevron. | Users arriving from Goals, Me, or RPG cannot return through the visible mobile stack control. | Render the back affordance as a labeled 44x44 button/link with stack-pop behavior and focus state. | proposed |

Decision: Must fix before launch; the reflective design is strong, but the journal needs real filter, drill-in, media, and back behavior.

### 85 - Obstacle coach

- Five-second read: A compassionate SIA diagnosis screen that explains missed missions and offers a reconnection plan.
- Primary action clarity: Start reconnection is visually dominant, but it does not start a flow or change state.
- Emotional tone: Practical and low-shame; "instead of guilt" lands well for a recovery moment.
- Screenshot: `/private/tmp/balencia-b07/tabs-goals-obstacles-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Diagnosing blockers is a high-value mission support concept and fits SIA well. |
| User friction | 1 | The primary reconnection CTA and supporting blocker/timing cards are inert. |
| Visual appeal | 4 | The orange diagnosis hero and blocker cards feel premium and focused. |
| Brand fit | 4 | Orange owns action/diagnosis, purple stays on SIA plan, and green only signals readiness. |
| Mobile ergonomics | 3 | The CTA is reachable and 48px tall, but blocker cards are not real touch targets. |
| Accessibility | 2 | Only the CTA is semantic; cards, timing recommendation, and back control are not operable. |
| Trust/privacy | 4 | The diagnosis cites behavioral patterns without a harsh or invasive tone. |
| Industry best practice | 2 | Coaching recovery screens need accept/edit/dismiss states, schedule handoff, and plan success/failure feedback. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `Start reconnection` left `/tabs/goals/obstacles` unchanged with no loading, sheet, toast, success state, or route change. | The screen cannot complete its core job of helping a slipping user restart momentum. | Implement the reconnection flow with loading, choose/edit actions, reminder adjustment, confirmation, and route or state success. | proposed |
| major | navigation | Scoped live check found `0` links. Clicking `Late meetings block workouts` and `Next best timing` left the route and text unchanged; the header back control is also visual-only. | Users cannot inspect blockers, accept/edit/dismiss proposed fixes, open Schedule, or return to the origin screen. | Make blocker cards and timing card semantic buttons/links with detail, accept, dismiss, schedule, and back behavior. | proposed |

Decision: Must fix before launch; the concept and tone are excellent, but it needs a real recovery workflow.

### 16 - Life areas overview

- Five-second read: A life-balance radar, Life Power score, SIA insight, comparison selector, and detailed domain rows.
- Primary action clarity: Domain rows are clear and navigable, but the radar, comparison selector, and SIA card do not perform their promised jobs.
- Emotional tone: Ambitious and self-reflective; it feels like a premium identity/progress view.
- Screenshot: `/private/tmp/balencia-b07/tabs-me-life-areas-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The "shape of your life" overview is a strong Balencia differentiator. |
| User friction | 2 | Domain list links work, but the primary visual chart and comparison controls are not useful yet. |
| Visual appeal | 4 | The radar and SIA card are polished, though the first viewport is dense. |
| Brand fit | 4 | Orange, purple, and domain colors are used in the right conceptual roles. |
| Mobile ergonomics | 2 | Comparison buttons measure only 26px tall, below the 44px touch gate. |
| Accessibility | 2 | The chart is a static SVG image, comparison buttons lack selected/locked semantics, and back is not operable. |
| Trust/privacy | 3 | Personal scoring and SIA insight are plausible, but the data model behind comparisons is not exposed. |
| Industry best practice | 2 | Dashboard charts need accessible drill-down targets, comparison state, and clear locked/upsell behavior. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Live metrics found `svgLinks: 0`; clicking the SIA insight card left `/tabs/me/life-areas` unchanged. Only the domain list rows are links. | The main radar visualization is not the drill-down surface described by the spec, and the SIA insight cannot hand off to chat. | Add 44x44 accessible tap zones for radar labels/vertices, expose chart values to assistive tech, and make the SIA card link to contextual SIA chat. | proposed |
| major | mobile-ergonomics | `Current`, `Vs week`, and `Vs month` buttons measured 90x26. Clicking `Vs week` or `Vs month` left the route/text unchanged with no comparison overlay or paywall explanation. | Users cannot compare progress over time, and the locked controls feel decorative rather than informative. | Implement segmented state with `aria-pressed`, comparison overlays/deltas, and a clear Plus explanation or upsell for locked modes. | proposed |
| major | navigation | Header inspection found no interactive element for the visible back chevron. | Users cannot leave this stack screen through the visible mobile back control. | Render a labeled 44x44 back button/link with stack-pop behavior. | proposed |

Decision: Must fix before launch; the visualization is differentiated, but the chart, comparison, SIA handoff, and back interactions must work.

### 17 - Me main

- Five-second read: A polished identity hub with profile, RPG level, stats, quick links, and suggested modules.
- Primary action clarity: Navigation is clear; settings, avatar, stats, quick links, See all, and module cards all have real link targets.
- Emotional tone: Personal, rewarding, and calm without overusing SIA or gamification.
- Screenshot: `/private/tmp/balencia-b07/tabs-me-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | The screen answers "who am I in Balencia?" and routes cleanly into personal features. |
| User friction | 4 | Most navigation is direct and predictable; only small text targets need polish. |
| Visual appeal | 4 | Profile, stats, and grid hierarchy are clear and premium. |
| Brand fit | 4 | Orange is reserved for progression/action accents, and the screen avoids unnecessary purple. |
| Mobile ergonomics | 3 | Core cards are large, but the level badge and See all text links are below target size. |
| Accessibility | 3 | Main links have labels, but badge/link hit areas and badge-only status dots need stronger accessible meaning. |
| Trust/privacy | 4 | "Book of life" and connected apps are discoverable without adding surprise data asks on this screen. |
| Industry best practice | 4 | This is a strong profile/settings hub pattern with useful shortcuts. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| minor | mobile-ergonomics | Live target measurements: `Lv 14` link is 67x25 and `See all` is 47x18. Explicit href checks confirmed settings, avatar, See all, and Mission journal links navigate. | Small but important navigation targets may be harder to tap, especially for users with motor or vision limitations. | Keep the visual text size but wrap these links in invisible 44x44 hit areas and add focus-visible styling. | proposed |

Decision: Ship-ready with minor touch-target polish; the Me hub is the strongest screen in this batch.

### 18 - Explore section

- Five-second read: A browsable catalog with search, AI-suggested modules, domain sections, and feature cards.
- Primary action clarity: Module cards are easy to understand and navigate, but the search surface is not a real input.
- Emotional tone: Useful and discovery-oriented, with restrained badges and domain grouping.
- Screenshot: `/private/tmp/balencia-b07/tabs-me-explore-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A complete feature catalog from Me is the right answer to "what else can I do?" |
| User friction | 2 | Browsing works through module links, but search and back navigation are inert. |
| Visual appeal | 4 | The suggested rail and domain grid are composed and easy to scan. |
| Brand fit | 4 | Orange and green badges are restrained, with domain dots used only for identification. |
| Mobile ergonomics | 4 | Search and module cards meet target size, and the grid feels thumb-friendly. |
| Accessibility | 2 | Search is a static `role="search"` div with no input, and back is not operable. |
| Trust/privacy | 2 | Plus lock badges appear while the Me hub identifies the user as on a Plus plan. |
| Industry best practice | 2 | Catalog screens need real search/filter, no-results state, clear tier gating, and reliable stack exit. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| major | information-architecture | Live check found `0` inputs and `1` `role="search"` div. Clicking search did not change text, and typing left `document.activeElement` as `BODY`. | Users cannot search modules, hide suggestions during search, clear a query, or reach no-results feedback. | Replace the static search bar with a real controlled input, live filtering, clear button, hidden suggested section during search, and no-results state. | proposed |
| major | monetization | Explore shows `Plus` lock badges on cards such as `Sleep reset`, while Me Main shows the user is on a `Plus plan`; the suggested card still links directly to `/features/sleep`. | Tier messaging is inconsistent and can make paid access feel unreliable or decorative. | Drive lock badges from the current subscription state, hide Plus locks for Plus users, and route truly locked modules to preview/paywall behavior. | proposed |
| major | navigation | Header inspection found no interactive element for the visible back chevron. | Users cannot return to Me Main through the visible stack control. | Render a labeled 44x44 back button/link with stack-pop behavior. | proposed |

Decision: Must fix before launch; the catalog layout works, but search, tier semantics, and stack exit need implementation.
