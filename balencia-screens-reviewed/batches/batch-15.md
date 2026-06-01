# Batch 15 - Mindfulness, Food, Shopping, Sleep

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b15/*-phone.png`
- Interaction evidence: `/private/tmp/balencia-b15/report.json`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 54 | Meditation | `/features/meditation` | `../app_design 3/54-meditation-mindfulness.md` | `reviewed` |
| 55 | Yoga sessions | `/features/yoga` | `../app_design 3/55-yoga-sessions.md` | `reviewed` |
| 56 | Recipes | `/features/recipes` | `../app_design 3/56-recipes.md` | `reviewed` |
| 57 | Shopping list | `/features/shopping-list` | `../app_design 3/57-shopping-list.md` | `reviewed` |
| 58 | Sleep tracking | `/features/sleep` | `../app_design 3/58-sleep-tracking.md` | `reviewed` |

## Batch Focus

Validate calming experiences, practical nutrition support, shopping utility, and sleep insight clarity.

## Batch Summary

- Ship-ready: None.
- Must-fix: 54 Meditation, 55 Yoga sessions, 56 Recipes, 57 Shopping list, 58 Sleep tracking.
- Redesign candidates: 54 Meditation and 55 Yoga sessions need true browse/active/post-session mode architecture; 56 Recipes and 57 Shopping list need lightweight real mutations before they can validate food support.
- Resolved decisions:
  - Meditation/yoga should demonstrate real library-to-active-to-complete modes; no inline preview-only acceptance.
  - Recipes and Shopping List V1 should support lightweight real mutations; sharing only after review and without private AI/health context.
  - Sleep accent should be canonical `sleep-indigo`; wellbeing teal stays for broader wellbeing/stress surfaces.

## Screen Notes

### 54 - Meditation

- Five-second read: A calm mindfulness library with category chips, a SIA body-scan recommendation, practice cards, streak stats, and a session preview lower in the scroll.
- Primary action clarity: Begin session is visually clear but not a semantic or operable control; filters and session controls do not change state.
- Emotional tone: Warm, quiet, and appropriately calming, but the static session states make the practice experience feel staged.
- Screenshot: `/private/tmp/balencia-b15/features-meditation-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A mindfulness hub belongs in this batch and the content hierarchy matches the spec's intent. |
| User friction | 1 | The user cannot start, filter, complete, rate, or dismiss a meditation session. |
| Visual appeal | 4 | First viewport is composed and calm; cards feel premium without being busy. |
| Brand fit | 4 | Wellbeing teal, orange action text, and purple SIA marker are restrained and on-brand. |
| Mobile ergonomics | 3 | Layout scans well, but filters are 36px tall and the active session is buried below the library. |
| Accessibility | 2 | The primary Begin session text is a div, filter buttons lack selected state, and rating circles are spans. |
| Trust/privacy | 4 | SIA explains the stress context without asking for sensitive new data. |
| Industry best practice | 1 | Mindfulness apps need a real session mode, timer state, completion feedback, and accessible controls. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Interaction report shows `0` inputs; `Begin session` is not interactive. Clicking `All`, `Meditation`, `Quick reset`, `Pause`, `Skip`, `End`, and `Done` left `/features/meditation` text and URL unchanged. | Users cannot begin a practice, filter the library, control the timer, complete the session, or submit feedback. | Implement the library -> active session -> post-session state machine with semantic Begin controls, working filters, timer controls, rating/note feedback, XP/streak updates, and exit handling. | proposed |
| major | information-architecture | The live route shows `7:23`, timer controls, `Session complete`, `+50 XP`, rating circles, and `Done` inline below the library while the tab bar remains visible. | The focused practice and post-session feedback read as demo content rather than the user's current mode. | Move active and post-session content into a full-screen overlay or dedicated mode that hides the tab bar and appears only after a practice starts. | proposed |
| major | accessibility | Category filters measure 36px high, selected state is only visual, and the post-session rating values are noninteractive spans. | Touch, keyboard, and screen-reader users cannot reliably identify selected filters or rate the session. | Add 44px hit areas, `aria-pressed` or tab semantics for filters, labeled timer controls, live timer announcements, and real rating buttons/inputs. | proposed |

Decision: Must fix before launch; redesign candidate for proper session-mode architecture.

### 55 - Yoga sessions

- Five-second read: A polished yoga hub with streak, SIA stretch guidance, difficulty filters, guided sessions, pose library, stats, and an active-session preview.
- Primary action clarity: Start session is dominant, but it is static; filters, pose discovery, and session controls do not progress the flow.
- Emotional tone: Supportive and motivating, with a strong wellbeing feel.
- Screenshot: `/private/tmp/balencia-b15/features-yoga-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Yoga belongs here and the streak/session/library structure is sensible. |
| User friction | 1 | The primary guided-session lifecycle cannot be entered or completed. |
| Visual appeal | 4 | Strong first viewport and clear CTA styling. |
| Brand fit | 4 | Teal and orange are used appropriately; SIA stays secondary. |
| Mobile ergonomics | 3 | Main CTA is comfortable, but chips and secondary links fall below the touch target gate. |
| Accessibility | 2 | Pose cards are static, filters lack selected state, and active-session timing has no operable state. |
| Trust/privacy | 4 | No risky data request; SIA recommendation is plausible and calm. |
| Industry best practice | 1 | Guided movement screens need start, pose progression, pause/skip, instructions, and post-session capture. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `All`, `Beginner`, `Intermediate`, `Advanced`, `Start session`, `Skip pose`, and `Pause` left `/features/yoga` text and URL unchanged. | Users cannot filter sessions, start a guided flow, advance through poses, pause, or finish the session. | Implement filter state and the browse -> active session -> post-session summary flow with pose progression, countdown, pause/skip, completion, and persistence. | proposed |
| major | information-architecture | `Yoga session`, `Pose 4 of 12`, `03:42`, and active controls are rendered inline after stats rather than replacing the browsing surface. | The route mixes library browsing and active practice, weakening focus and making the session preview look decorative. | Make active yoga a true mode with tab bar hidden, an explicit close/pause path, next-pose preview, and post-session summary. | proposed |
| major | accessibility | Difficulty chips are 36px tall, `See all` is 43x18, pose cards are not buttons, and the SIA coaching note is not actionable. | Secondary discovery and coaching paths are hard to operate and unavailable to assistive tech. | Expand hit areas, add selected filter semantics, make pose cards open pose details, and route the SIA note to contextual SIA chat. | proposed |

Decision: Must fix before launch; redesign candidate for guided-session state architecture.

### 56 - Recipes

- Five-second read: A dense recipe discovery surface with search styling, filter chips, SIA suggestions, favorites, diet-plan rows, all recipes, and a floating Create recipe CTA.
- Primary action clarity: Search and Create recipe are obvious, but search is not an input and create/detail/save actions are not wired.
- Emotional tone: Practical and appetizing enough for a nutrition utility, though image placeholders make the food content feel less real.
- Screenshot: `/private/tmp/balencia-b15/features-recipes-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Recipes are a useful bridge between meal planning, logging, and shopping. |
| User friction | 1 | The user cannot search, filter, save, open, create, log, or add recipes to shopping. |
| Visual appeal | 3 | Layout is readable, but placeholder food imagery weakens desire and trust. |
| Brand fit | 4 | Nutrition lime and orange action treatment are consistent. |
| Mobile ergonomics | 3 | Main bottom CTA is reachable, but small secondary text buttons and static chips limit mobile utility. |
| Accessibility | 1 | Search is a div, filters are spans, cards are not links/buttons, and heart icons are not operable controls. |
| Trust/privacy | 3 | Macro claims are useful, but source/detail/provenance are inaccessible. |
| Industry best practice | 1 | Recipe apps require searchable lists, detail pages, favorites, recipe creation, shopping-list adds, and meal logging. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live route reports `0` inputs. `Search recipes...` is static text, category/diet chips are spans, and clicking `Create recipe` leaves `/features/recipes` unchanged with no sheet or form. | Users cannot perform the screen's primary jobs: find recipes, refine results, save favorites, or create a recipe. | Replace search with a real input, make filters stateful controls, wire recipe save/open behavior, and launch a Create recipe sheet with macro entry/AI analysis states. | proposed |
| major | navigation | Recipe cards, SIA suggestions, favorites, and diet-plan rows render as static cards/rows; only small `See all` and `Create recipe` buttons are exposed. | Users cannot inspect ingredients/macros, add ingredients to the shopping list, log a recipe as a meal, or ask SIA why a recipe was recommended. | Make cards and rows semantic links/buttons to recipe detail, and include Add to shopping list, Log as meal, favorite, and contextual SIA actions. | proposed |
| major | accessibility | `See all` buttons measure 43x18, filter chips are noninteractive spans, and favorite hearts are icon spans inside static cards. | Touch targets and screen-reader affordances do not match the visible controls. | Use 44px semantic controls for filters, section actions, favorites, recipe cards, and floating creation entry. | proposed |

Decision: Must fix before launch; redesign candidate until discovery, detail, and creation are real.

### 57 - Shopping list

- Five-second read: A clear grocery list grouped by aisle, with add entry, item counts, purchased visibility, check-off rows, utility actions, and a floating add button.
- Primary action clarity: Add item and check-off are visually obvious, but neither is represented by a real input or control.
- Emotional tone: Useful and store-ready visually; static behavior breaks the utility promise.
- Screenshot: `/private/tmp/balencia-b15/features-shopping-list-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | A categorized shopping list is exactly the right companion to meal planning. |
| User friction | 1 | Users cannot add, check off, collapse, hide, clear, share, edit, or delete list items. |
| Visual appeal | 4 | The list is scannable, compact, and premium. |
| Brand fit | 4 | Nutrition lime is used for grouping/source metadata while orange marks utility action. |
| Mobile ergonomics | 2 | Visual density is good, but many apparent controls are small or noninteractive. |
| Accessibility | 1 | Checkboxes and category headers are nonsemantic, and the floating add button exposes a generic label. |
| Trust/privacy | 4 | Generated-source badges are clear at a glance. |
| Industry best practice | 1 | Shopping lists need fast input, one-handed check-off, undo, hide purchased, sharing, edit, and delete behavior. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Interaction report shows `0` inputs. `Add an item...`, item check circles, and category headers are not controls; clicking `Hide purchased`, `Clear purchased`, and `Share` leaves text and URL unchanged. | The screen cannot be used in a store because users cannot add groceries, check items off, collapse sections, hide purchased items, clear completed items, or share the list. | Implement inline item entry, checkbox state with undo, section collapse, purchased visibility, clear/share flows, and optimistic persistence. | proposed |
| major | accessibility | Check circles are 24px spans, category headers are divs, the overflow icon is wrapped in a div instead of a button, and the add FAB is reported as generic `BUTTON`. | Assistive tech users cannot identify or operate the core list controls; motor users get small or missing targets. | Use labeled 44px buttons/checkboxes for row check-off, headers, overflow, FAB, clear, share, and recipe/source links. | proposed |
| major | mobile-ergonomics | `Hide purchased` measures 106x18, while checkbox visuals are only 24x24 and source recipe text is not a tappable row/detail target. | Frequent one-handed grocery interactions are less forgiving than a store-use screen requires. | Expand hit areas without increasing visual clutter, make full rows tappable for check-off/detail, and add swipe/edit/delete affordances. | proposed |

Decision: Must fix before launch; visually close, but the utility model must become real.

### 58 - Sleep tracking

- Five-second read: A premium sleep command center with SIA insight, last-night summary, sync badge, trend sections, personalized tips, and a Log sleep CTA.
- Primary action clarity: Log sleep is clear and reachable, but it does not open manual logging; trend controls are static.
- Emotional tone: Calm and credible, with strong hero metrics.
- Screenshot: `/private/tmp/balencia-b15/features-sleep-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 5 | Last-night summary plus trends is the right structure for sleep insight. |
| User friction | 2 | Reading is easy, but logging and trend exploration are blocked. |
| Visual appeal | 4 | Strong hierarchy and attractive summary card; first viewport feels premium. |
| Brand fit | 3 | The live screen uses sleep indigo while the screen spec calls for wellbeing-teal. |
| Mobile ergonomics | 3 | The bottom Log sleep CTA is reachable, but segmented controls are small. |
| Accessibility | 2 | Period tabs are 35x26, charts have limited semantic alternatives, and tips are not a disclosure control. |
| Trust/privacy | 3 | WHOOP sync is visible, but source/detail and manual logging consent/control are not available. |
| Industry best practice | 2 | Sleep trackers need period switching, tap-for-detail charts, manual log entry, source detail, and coaching follow-up. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Clicking `7`, `14`, `30`, and `Log sleep` left `/features/sleep` text and URL unchanged; the live report found `0` inputs. | Users cannot manually log sleep, change trend range, inspect period data, or create the data needed for SIA coaching. | Wire the Log sleep bottom sheet, period segmented state, chart detail tooltips, validation, saved states, and empty/offline fallbacks. | proposed |
| major | accessibility | Segmented tabs measure 35x26, `Sleep hygiene tips` is visually a disclosure but not an interactive control, and charts are SVG/visual bars without an accessible data table. | Screen-reader and motor users cannot explore the sleep analysis or expand/collapse tips reliably. | Use 44px tab hit areas, a semantic disclosure for tips, accessible chart summaries/data tables, and focusable day detail controls. | proposed |
| minor | design-system-consistency | The Screen 58 spec names Wellbeing Mode with wellbeing-teal, while the live header, badge, bars, and sync badge use the `sleep` indigo tone. | The screen still looks polished, but domain-color semantics are inconsistent across spec and implementation. | Use `sleep-indigo` as the canonical sleep accent and align the spec, registry, and implementation; wellbeing teal remains for broader wellbeing/stress surfaces. | proposed |

Decision: Must fix before launch; the visual foundation is strong, but logging and analysis controls need to work.

## Verification

- `VISUAL_AUDIT_BASE_URL=http://localhost:3001 VISUAL_AUDIT_SCREENSHOT_DIR=/private/tmp/balencia-b15 npm run verify:visual -- --screenshots`: passed, `41 routes audited`.
- Custom Playwright capture added `/features/meditation` and `/features/yoga` screenshots to `/private/tmp/balencia-b15`.
- Targeted interaction report saved to `/private/tmp/balencia-b15/report.json`.
