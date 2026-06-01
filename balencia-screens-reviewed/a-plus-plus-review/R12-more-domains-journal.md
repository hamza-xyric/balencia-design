# R12 - More Domains And Journal

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `34`, `35`, `36`, `70`, `37`
- Routes: `/domains/spirituality`, `/domains/learning`, `/domains/creativity`, `/domains/exercise-library`, `/features/journal`
- Sources: `../batches/batch-12.md`, `../update-batches/batch-u06.md`, `../screen-iteration-batches/P12-more-domains-journal.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R12/`
- State evidence: `../../balencia-screens/output/a-plus-plus-review/R12/states/r12-state-capture.json`
- Build gate: required
- Finding IDs: `R12-F01` through `R12-F10`

## Focus

Validate adaptive spirituality, learning, creativity, exercise discovery, and journaling. A++ requires inclusive belief handling, creative credibility, useful content structure, and journal privacy clarity.

## Batch Summary

- A++: none.
- A+: none.
- A: 34 Spirituality dashboard, 35 Learning dashboard, 36 Creativity dashboard, 70 Exercise library, 37 Journal.
- Needs polish: all five screens have strong direction and working state evidence, but unresolved major/minor blockers prevent A++.
- Redesign candidates: none; the U06 remediation moved the batch from static/decorative toward functional prototype patterns.
- User decisions: none newly deferred.
- Verification: `npm run check` passed on 2026-05-27. `npm run build` first hit Next's "another build process is already running" guard, then passed on retry after stale capture/browser cleanup.
- Evidence: 35 R12 interaction screenshots captured under `../../balencia-screens/output/a-plus-plus-review/R12/states/`.

## Screen Notes

### 34 - Spirituality dashboard

- Five-second read: A warm faith/practice dashboard with SIA coaching, belief mode chips, daily practices, reading, fasting, reflection, prayer schedule, and contemplation shortcuts.
- Screen purpose and journey fit: The route now clearly supports the spirituality domain from Me/Explore or SIA, and it exposes the key practice/reflection loops that were missing in the first audit.
- Primary action clarity: Practice toggles now update the counter and show XP feedback; reading, reflection, and timer controls open usable states. The streak row still looks tappable without a resulting view.
- Emotional tone: Calm and reverent for a Muslim demo state, but the General mode is not inclusive enough because faith-specific rows and copy remain.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R12/34-domains-spirituality-phone.png`; states `states/34-practice-toggled.png`, `states/34-general-belief.png`, `states/34-unconfigured-belief.png`, `states/34-reading-sheet.png`, `states/34-reflection-sheet.png`, `states/34-timer-modal.png`.
- Grade: A.
- Grade cap: Major release/accessibility, trust-adaptation, and control-purpose findings R12-F01, R12-F03, and R12-F04 prevent A+ or A++.
- Control inventory: Back links to Explore; `Lv.4` links to RPG; SIA card routes to SIA but contains nested links; belief chips switch Muslim/General/Set up states; practice rows toggle completion and toast XP; streak row is a no-op button; Log reading opens a sheet and save toast; Write reflection opens a sheet; prayer schedule is informational; Meditate/Dhikr launch timer modal; tab bar routes global sections.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | The domain purpose is clear, but General mode still renders Muslim-specific practices and Quran content. |
| User friction | 4 | The primary loops now work, except streak history and fully adaptive setup. |
| Visual appeal | 4 | Premium and calm, with strong purple/orange hierarchy; first viewport feels polished. |
| Brand fit | 4 | Balencia/SIA treatment is close, but fixed faith copy weakens inclusive brand trust. |
| Mobile ergonomics | 4 | Most targets are 44px or larger; the streak row is 36px and behaves like a dead control. |
| Accessibility | 3 | Nested anchor hydration output remains a release blocker. |
| Trust/privacy | 3 | Set up state has privacy framing, but General mode still shows Islamic schedule and Quran progress. |
| Industry best practice | 4 | Practice, logging, and timer states exist, but adaptive religious handling needs closure. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R12-F01 | major | accessibility | Baseline and fresh state capture show nested `<a>` console/hydration errors from the SIA coaching note on `/domains/spirituality`; `states/r12-state-capture.json` records 3 console errors for all spirituality states. | Invalid nested links can break hydration, focus order, and screen-reader navigation. | Make the outer SIA card or inner Ask SIA action the single semantic link/button, not both. | proposed | Prevents A+ and A++ |
| R12-F03 | major | trust-privacy | `states/34-general-belief.png` shows General mode still rendering Fajr/Dhuhr/Asr/Maghrib/Isha, Quran reading, Dhikr, and faith-specific reflection copy. | Non-Muslim or unconfigured users may feel the app is imposing a faith model rather than adapting respectfully. | Replace General with neutral contemplation/gratitude practices, non-religious reading labels, and universal prompt copy; keep Muslim content only in Muslim mode. | proposed | Prevents A+ and A++ |
| R12-F04 | major | control-purpose | `states/34-streak-control.png` was captured after clicking `12 day streak`; state remains the same except the prior practice toast, and the button has no route/dialog behavior. | A visible button promises streak history or details but does nothing, creating trust debt. | Wire the streak row to streak detail/history, or render it as static text if no V1 action exists. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 35 - Learning dashboard

- Five-second read: A clear learning command center with SIA pace insight, active book, suggested actions, missions, consistency, library, activity, prompt, and Log session CTA.
- Screen purpose and journey fit: The dashboard now supports logging and action completion, but book/library navigation still exits to Journal instead of learning detail/library states.
- Primary action clarity: Log session is clear and validated; suggestions and refresh now provide feedback.
- Emotional tone: Productive, calm, and on-brand for a study coach.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R12/35-domains-learning-phone.png`; states `states/35-log-sheet-empty.png`, `states/35-log-sheet-filled.png`, `states/35-log-saved.png`, `states/35-suggestion-completed.png`, `states/35-current-book-destination.png`.
- Grade: A.
- Grade cap: Major navigation finding R12-F05 and minor mobile target finding R12-F06 prevent A+ or A++.
- Control inventory: Back links to Explore; overflow icon is visual/static; SIA note routes to SIA with learning context; active book card routes to Journal instead of a learning item detail; suggestion check buttons toggle completion and XP; Refresh suggestions shows feedback; mission cards link to Goal Detail; library rows and See all route to Journal placeholders; Reflect links to Journal; Log session opens a validated bottom sheet with activity, duration, notes, save/cancel.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | Strong dashboard structure, but learning item/library controls are pointed at the wrong destination. |
| User friction | 4 | Logging and suggestions work; browsing study content still has a detour. |
| Visual appeal | 4 | Premium and readable, though the first viewport clips the suggestions behind the bottom action. |
| Brand fit | 5 | Cyan domain identity, orange CTA, and restrained SIA treatment are aligned. |
| Mobile ergonomics | 4 | Core controls are large; Reflect remains a 32px chip. |
| Accessibility | 4 | Semantic controls are much better, with one small-target issue. |
| Trust/privacy | 5 | Low sensitive-data risk and SIA pace claim is visibly grounded in reading data. |
| Industry best practice | 4 | Logging and completion loops work, but item detail/library browsing is not industry-complete. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R12-F05 | major | navigation | `states/35-current-book-destination.png` shows tapping the active book lands on `/features/journal?source=learning-book`; source code shows library rows and See all also route to Journal placeholders. | Users trying to inspect the book/course or library lose context and arrive in the wrong product area. | Route the active item to a learning item detail/expanded state, route library rows to item detail, and route See all to a learning library state. | proposed | Prevents A+ and A++ |
| R12-F06 | minor | mobile-ergonomics | Baseline evidence records `Reflect` at 82x32, and `35-domains-learning-phone.png` shows the compact chip. | The reflection handoff is useful but undersized for reliable touch use. | Raise Reflect to a 44px minimum target while preserving low visual weight. | proposed | Prevents A++ |

Decision: needs polish.

### 36 - Creativity dashboard

- Five-second read: A polished creativity practice hub with SIA insight, active projects, inspiration prompt, practice stats, missions, streak, timeline, activity, and Log session CTA.
- Screen purpose and journey fit: The screen now supports project expansion, session logging, prompt-start context, and mission navigation, which fits the creative practice journey.
- Primary action clarity: Log session and Start creating both open a relevant sheet, but the Reflect on this handoff does not preload the creative prompt in Journal.
- Emotional tone: Encouraging, warm, and distinct from Learning.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R12/36-domains-creativity-phone.png`; states `states/36-project-expanded.png`, `states/36-see-all-expanded.png`, `states/36-start-creating-sheet.png`, `states/36-session-saved.png`, `states/36-reflect-destination.png`.
- Grade: A.
- Grade cap: Major release-readiness finding R12-F02 and major cross-screen prompt finding R12-F07 prevent A+ or A++.
- Control inventory: Back links to Explore; overflow icon is visual/static; SIA note routes to contextual SIA; project rows expand inline; See all reveals an additional project; Start creating opens a prefilled creative session sheet; Reflect on this routes to Journal but prompt is not consumed; mission cards route to Goal Detail; Log session opens a validated sheet; activity/timeline/heatmap are static summaries.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The creative practice model is coherent and differentiated. |
| User friction | 4 | Main session flow works, but reflection handoff loses context. |
| Visual appeal | 4 | Strong amber identity, but the fixed CTA leaves the inspiration prompt clipped in the first viewport. |
| Brand fit | 5 | Orange action, amber domain identity, and small purple SIA cues are well balanced. |
| Mobile ergonomics | 4 | Primary targets are comfortable; first-viewport clipping needs handoff attention. |
| Accessibility | 4 | Controls are mostly semantic, but duplicate-key output is a release risk. |
| Trust/privacy | 5 | No risky personal-data or AI authority issue in the visible state. |
| Industry best practice | 4 | Good project/session loop, but prompt continuity is expected in creative journaling flows. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R12-F02 | major | release-readiness | Baseline and fresh state capture record duplicate-key console output: `Encountered two children with the same key, Tcomplete`. | Unsupported key identity can duplicate/omit rendered children and undermines handoff confidence. | Fix the repeated key source in the creativity day/state list and confirm the console is clean. | proposed | Prevents A+ and A++ |
| R12-F07 | major | navigation | `states/36-reflect-destination.png` lands on `/features/journal?prompt=...`, but the Journal screen still shows the default prompt; capture records `expectedPromptPresent: false`. | Users who choose a creative prompt for reflection lose the prompt at the exact handoff moment. | Have Journal read the prompt query/source context and preload the editor/prompt card, or remove the query contract from the link. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 70 - Exercise library

- Five-second read: A practical exercise browser with search, filter chips, result count, two-column cards, detail sheet, and Add to workout action.
- Screen purpose and journey fit: Search, filter, detail, and add feedback now work. The remaining issue is source context: the route always sits in Me and always offers Add to workout even when no workout-planning entry context is visible.
- Primary action clarity: Browse/select is obvious, and tapping a card opens useful details.
- Emotional tone: Efficient and utilitarian; less premium than the domain dashboards because all cards still use generic placeholders.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R12/70-domains-exercise-library-phone.png`; states `states/70-search-row.png`, `states/70-search-row-dumbbells-filter.png`, `states/70-detail-sheet.png`, `states/70-added-toast.png`.
- Grade: A.
- Grade cap: Major information-architecture/context finding R12-F08 prevents A+ or A++.
- Control inventory: Back is a 44px button; search filters by query; muscle chips single-select; equipment chips single-select in prototype; result count updates against mock subset; exercise cards open details; detail close dismisses; Add to workout shows success toast; tab bar routes global sections, with Me selected.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | Core browsing utility works, but source stack and Add-to-workout context are unresolved. |
| User friction | 5 | Search, filters, card detail, close, and success feedback are straightforward. |
| Visual appeal | 4 | Clean and scannable; generic thumbnail placeholders keep it below premium A++ polish. |
| Brand fit | 4 | Orange chip/action system is correct; Me tab context conflicts with Fitness/Goals ownership. |
| Mobile ergonomics | 4 | Targets are mostly 44px; horizontal filter rows are usable but dense. |
| Accessibility | 4 | Search label, pressed chips, card labels, and dialog label exist; selected filter semantics could be richer. |
| Trust/privacy | 4 | Low privacy risk; 6-of-532 mock-data framing needs clearer handoff. |
| Industry best practice | 4 | Works as a prototype browser, but context-aware Add to workout and full data states are expected. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R12-F08 | major | information-architecture | `70-domains-exercise-library-phone.png` shows Me selected; source uses `activeTab="me"`. `states/70-detail-sheet.png` shows `Add to workout` from the standalone route with no visible workout context. | Users may not know which workout will receive the exercise, and the route does not preserve the Fitness/Today or Goals planning stack promised by the spec. | Preserve source context via route state/query, set the active tab to Today or Goals accordingly, and show Add to workout only when an active workout-planning context exists. | proposed | Prevents A+ and A++ |

Decision: needs polish.

### 37 - Journal

- Five-second read: A private journal surface with SIA prompt, privacy/free-vs-Plus explanation, SIA-memory opt-in, search, entries/check-ins toggle, entry list, and Write CTA.
- Screen purpose and journey fit: The route now supports writing, prompted drafts, validation, entry detail, check-ins, and privacy explanation. Search/edit/delete and prompt handoff still need closure.
- Primary action clarity: Write is clear; blank Save is disabled until content, and prompted Save is enabled.
- Emotional tone: Warm, private, and reflective.
- Screenshot/evidence paths: `../../balencia-screens/output/a-plus-plus-review/R12/37-features-journal-phone.png`; states `states/37-prompted-writer.png`, `states/37-blank-writer.png`, `states/37-entry-saved.png`, `states/37-check-ins.png`, `states/37-check-in-detail.png`, `states/37-search-project.png`.
- Grade: A.
- Grade cap: Major free-basic/search/edit/delete finding R12-F09 and minor prompt-chip target finding R12-F10 prevent A+ or A++.
- Control inventory: Back button returns via history/fallback; Write about this opens a prompted writer; SIA memory checkbox toggles opt-in; search accepts text but does not filter; Entries/Check-ins tabs switch lists; entry rows open read-only detail; check-in rows open read-only detail; Write opens blank editor; mood buttons select; domain select changes tag; voice preview toggles; Save is disabled until draft content exists; detail close buttons dismiss overlays.

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | Strong journal concept and privacy positioning, but free basics are not fully delivered. |
| User friction | 4 | Writing/check-ins/details work; search and edit/delete are missing. |
| Visual appeal | 4 | Calm and polished; the entry list starts low in the first viewport because privacy and search now take space. |
| Brand fit | 5 | Purple SIA, orange creation, and warm dark privacy copy fit Balencia. |
| Mobile ergonomics | 4 | Main controls are comfortable; Write about this remains 32px high. |
| Accessibility | 4 | Dialog labels and row labels exist; compact prompt target still needs expansion. |
| Trust/privacy | 4 | Privacy and SIA-memory opt-in are good, but delete/edit controls are promised and absent. |
| Industry best practice | 4 | Writer and archive basics exist, but journal search/edit/delete are baseline expectations. |

| Finding | Severity | Category | Evidence | User Impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R12-F09 | major | retention | `states/37-search-project.png` records `searchStillShowsNonMatches: true`; the screen copy promises basic writing, editing, deletion, and search are free, but entry detail only exposes read-only text and close. | Users cannot reliably find, edit, or delete sensitive journal entries despite the privacy promise naming those basics. | Implement filtering/search results and expose edit/delete/confirmation controls in entry detail before Figma handoff. | proposed | Prevents A+ and A++ |
| R12-F10 | minor | mobile-ergonomics | Baseline evidence records `Write about this` at 141x32, and state screenshots show the prompt chip below the SIA card. | The primary prompt handoff is a useful action but remains below the 44px touch target bar. | Increase the prompt chip to a 44px minimum target or make the entire prompt card a clearly labeled 44px action. | proposed | Prevents A++ |

Decision: needs polish.

## Verification

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-05-27 | `node scripts/capture-r12-states.mjs` | passed | Captured 35 R12 state screenshots and `r12-state-capture.json` under `../../balencia-screens/output/a-plus-plus-review/R12/states/`. Required escalation because headless Chrome launch is sandbox-restricted. |
| 2026-05-27 | `npm run check` | passed | Lint, typecheck, route verification, asset verification, copy verification, and brand verification passed. |
| 2026-05-27 | `npm run build` | passed on retry | First attempt returned "Another next build process is already running"; after stale capture/browser cleanup, production build completed successfully for 96 static pages. |
