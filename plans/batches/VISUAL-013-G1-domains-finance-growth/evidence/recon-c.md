# G1 reconciliation C — learning, creativity, journal, habits

Worker role: Luna read-only evidence inventory. This is not implementation or acceptance. I reconciled the active G1 contract/matrix, current hi-fi specs and product code for screens 35–38, canon/catalog, RPG/privacy authority, the historical G1 audit, shared consumers, and the accepted F2 verification pattern.

## Sol escalation: unresolved source/RPG taxonomy conflict

- The visual canon treats Learning (`#06b6d4`) and Creativity (`#f59e0b`) as current domain tags (`Balencia-New-Screens/canon/COMPACT-CANON.md:44`), while `RPG_SYSTEM_DESIGN.md:33-48` defines ten starting stats and explicitly calls Learning and Creativity future extensions. Current S35/S36 display `Lv 12`, missions, inferred mastery, and domain identity without stating whether these are scored RPG stats, non-scored Explore domains, or aliases. Sol must freeze one explicit display/scoring disposition before implementation; Luna cannot infer it.
- S38 uses `Health`, which exists in neither cited registry, while its sleep-correlation claim crosses Wellbeing/Fitness/Sleep semantics. Replace it with a frozen registered domain/alias or label it as a non-domain category. Do not invent a new RPG stat in G1.
- This is the historical audit's still-live `RW-R0-09/10/12/19` conflict, not a stale visual nit. A local screen repair can remove contradictions, but only Sol can adjudicate the cross-project registry meaning.

## Cross-screen implementation and verification contract

- Use deterministic query fixtures read once on mount and expose exactly one screen marker, e.g. `data-g1-state="35-default-real"`. Product code currently has no state fixture system for 35–38, so every required non-default state remains live work.
- Capability-free prototype only: local React state; no API/provider, storage, microphone/camera/file picker, clipboard/share, notifications, vibration, account, or external-navigation side effect. Voice/import/upload affordances must show a local preview/outcome and capability boundary.
- Each fixture should prove a 390×844 frame, <=1px horizontal overflow, safe bottom-action clearance, no content/control hidden by a FAB, named native controls, >=44px targets, no nested controls, visible focus, no `SIA`/`Sia`/`Cia`, reduced-motion settlement, isolated storage/cookies, zero console/page/capability events, deterministic unique PNG, and one actual 125% text-scale proof per screen.
- At 125%, the principal risks are S35's dense duplicated KPI/mission/chart stack, S36's seven 36px weekday cells and portfolio labels, S37's fixed FAB over entry copy, and S38's habit rows with time/domain metadata. Text may wrap; it must not clip, overlap, or shrink below the canonical readable floor.
- All four specs say `Image Slots: None required`; the G1 audit agrees that no media owner is needed. Freeze `no raster / code-native UI only` for HIFI-35 through HIFI-38. S36 gallery milestones are abstract timeline records, not permission to fabricate thumbnails. S37 voice is text/audio metadata, not an image slot.
- Privacy/data controls must visibly cover category, source, scope, freshness, confidence, retention, export, revoke, and delete where personal/imported/derived data appears. Destructive delete/revoke needs confirmation, a named subject, cancellation, and a local-only completion/undo outcome.

## Screen 35 — Learning & growth

### Live strengths and stale findings

- Still valid: focused current-book hero, real/estimated provenance, native library rows, study chart, clear source-only/legacy Explore route, and no required media.
- Still live from the G1 audit: hero ring `62%` contradicts `9/15` and the 60% bar; pages/minutes are duplicated; `text-brand-cyan` is undefined; `Read a half marathon` is broken copy; active missions are competing GlassCards; the chart legend claims a purple `CIA planned` series that `TrendChart` does not render; a 12-day streak uses green done semantics; imported course exposes no retention/export/revoke/delete route.
- The audit's general “all controls inert” finding remains live here: More options, Log session, both suggested actions, library rows, and imported-course row have no local outcomes. The spec specifically requires suggestion check/undo, chart scrub, a log-session sheet, and Journal [37] reflection handoff.
- Learning RPG/scoring status is unresolved as escalated above. Do not preserve or add a level/stat until Sol freezes whether this is a scored RPG domain.

### Numeric and source truth freeze candidates

- One payload should drive the daily reading mission: `9 / 15 = 60%` exactly. Book completion may independently remain `62%`, but it must be explicitly named `Book completion`, not visually presented as the same goal.
- Keep weekly pages `45` and daily minutes `135` only once each, with `You logged` and freshness. Do not call 45 pages “today” in one module and “this week” in another.
- Skill values `78` and `54` are inferences, not 0–99 RPG Domain Stats. Name the scale (e.g. local skill estimate out of 100), source window/sample, freshness, and `estimated · low confidence`, or use honest-null until sufficient evidence exists.
- If no projection points render, remove the purple plan legend. If a projection is retained, provide separate actual/projected arrays, accessible summary, source, window, confidence, and a visible chart boundary.

### Recommended deterministic fixtures and assertions

Freeze at least: `default-real`, `low-confidence`, `honest-null`, `skeleton`, `error-import`, `offline`, `success-log`, `disabled-import`, `suggestion-done`, `log-sheet`, `course-controls`.

- `default-real`: exact `9 of 15 pages` and `60%` daily; separately named `62% book completion`; no duplicate Pages/Minutes KPI; registered Learning visual token; no unrendered-series legend.
- `low-confidence`: approximate imported session/skill labels, explicit `estimated · low confidence`, no exact unqualified skill claim.
- `honest-null`: no book/course/study numbers; constructive Add book/course and Log session actions; CIA suggestion hidden.
- `error-import`/`offline`: manual logs remain, named provider/import failure or cached freshness, unsafe import mutations disabled.
- Log sheet contains native type/duration/pages fields; empty/invalid Save is disabled; valid Save updates the same payload, produces a polite local status, and invokes no capability.
- Suggested action toggles with native pressed/checkbox semantics and Undo. Journal reflection is a same-origin `/screens/37` link with an explicit local prefill-preview boundary.
- Course controls show source, scope, freshness, confidence, retention, export, revoke, delete. Revoke/delete confirm the named course and remove only local preview data.

## Screen 36 — Creativity

### Live strengths and stale findings

- Still valid: strong CIA/prompt hierarchy, solid dense project card, practice grid, usable project rows, ConsentRail, abstract portfolio sequence, no raster slot.
- Still live: project values (`Film 45%`, `Photo 72%`) and mission values (`55%`, `80%`) are visually indistinguishable; Photo 72% incorrectly uses green done; two primary Log session CTAs compete; two unrelated sections are both `This week`; the required session trend is absent; identity uses raw amber rather than frozen Creativity token; `Estimated` voice-note copy omits low confidence.
- Several action-looking controls remain inert: See morning sessions, project rows, Start creating, Reflect, gallery milestones, recent activity, More options, and the second Log new session CTA. The bottom quick-log href only changes the query while the component ignores it.
- `Amira · Lv 12` is unsupported until Sol resolves Creativity's RPG status. `2 missions` over an Active projects section further conflates project and Mission terminology.

### Numeric/source truth freeze candidates

- Prefer one named pair of populations: `Project completion` may remain Film 45 / Photo 72 while `Mission progress` remains Film 55 / Photo 80 only if each has distinct source, definition, and accessible label. Otherwise unify values and remove redundant section.
- Green is completion/success only; 72% and 80% remain orange/member effort. CIA synthesis stays purple.
- Weekly KPIs (`3 sessions`, `4.5 hours`, `8-day streak`) need a common seven-day window and logged-source provenance. Voice note becomes `estimated · low confidence` or honest-null.

### Recommended deterministic fixtures and assertions

Freeze at least: `default-real`, `low-confidence`, `honest-null`, `skeleton`, `error-upload`, `offline`, `success-log`, `disabled-media`, `prompt-session`, `journal-reflect`, `milestone-detail`, `data-controls`.

- `default-real`: one primary Log session action; unique headings (`Practice days`, `Weekly summary`); Creativity token, no unsupported level; project/mission metrics explicitly differentiated or unified; no green partial progress.
- `low-confidence`: pending upload/import and voice note visibly say `estimated · low confidence`; no exact unqualified gallery/activity claim.
- `honest-null`: prompt labeled starter, empty heatmap, Add project, no fabricated project/gallery/KPI data.
- Log sheet uses a named native session-type group plus duration/project fields; valid submit updates heatmap/KPIs/activity and announces local success without capability use.
- Start creating opens a local timer preview with Start/Pause/Finish outcomes; Reflect is a same-origin `/screens/37` link/pre-fill preview. Gallery milestone opens a focus-managed text/detail dialog or same-origin `/screens/67` only when an actual local asset exists; no fake thumbnail.
- Data controls cover images/project files/journal prompt/CIA inference/imports with confirmation for revoke/delete.

## Screen 37 — Journal

### Live strengths and stale findings

- Still valid: private-default copy, strong reflection prompt, native 44px top controls, transcript provenance, solid chronological density, and reachable rendered SafetyCard.
- Blockers remain: fixed `bottom-24 right-4` FAB can overlap entry text and does not offer text/voice choice; Entries/Check-ins are buttons without tab/tabpanel semantics; Energy/Stress chips have no values/source/null; no ConsentRail covers transcript/check-in/CIA analysis; privacy-system copy is embedded in the May 18 authored entry; SafetyCard behavior must be verified as a real local support link.
- Every visible action is inert: mic, settings, Write about this, tabs, filters, entry cards, and FAB. There is no save-disabled/success flow, deletion confirmation/undo, or export/revoke path.
- Journal content is highly sensitive. A voice control must never imply recording without explicit consent and a local capability boundary. CIA analysis must be opt-in by scope; “private by default” cannot coexist with automatic synthesis wording.

### Recommended deterministic fixtures and assertions

Freeze at least: `default-entries`, `check-ins`, `honest-null`, `voice-null`, `low-confidence`, `skeleton`, `error-cached`, `offline`, `compose-text`, `compose-voice-consent`, `save-success`, `delete-confirm`, `data-controls`, `safety-open`.

- `default-entries`: `role=tablist`, selected Entries tab, named entries tabpanel; 12 entries is `calculated locally`; system privacy copy is outside all dated/authored cards; no FAB overlap at top/bottom scroll positions.
- `check-ins`: selected tab and named panel expose `Energy 4 of 5`, `Stress 2 of 5`, `logged this morning`; honest-null contains no fabricated values.
- Text/voice choice opens from the shell bottom action. Text sheet is a focus-managed dialog; native textbox; empty Save disabled; typed Save adds exactly one entry and announces success. Voice requires an explicit preview-only consent choice; no microphone capability is invoked.
- Entry delete names the selected date/type, requires confirmation, supports Cancel and Undo, and only mutates local fixture state. Export/revoke/delete controls clearly distinguish entry data, transcript, and CIA-analysis scope.
- Error/offline preserve cached/private drafts; no text is lost. Safety support remains a real same-origin/local link in default, empty, error, and offline states.
- At 125%, tab names, entry copy, transcript metadata, privacy text, and dialog buttons wrap without the bottom action or nav obscuring them.

## Screen 38 — Habits

### Live strengths and stale findings

- Still valid: `5 of 8` and rounded 62% arithmetic, clear time grouping, redundant check + strike completion cue, 44px tab shells, consistency grid, restrained solid density, and no media slot.
- Still live: hero mixes `You logged` with `Sync pending`, obscuring whether count/streak are real or approximate; `Health` is unregistered and domain chips are gray; habit rows are buttons without checkbox checked state or streak-impact announcement; Today/Week/Month do not switch content; named `HabitRowCard`/`WeeklyBarChart` are absent; CIA correlation lacks window/sample/freshness/confidence/correction path; no consent/export/revoke/delete controls.
- Bell, Settings, tabs, habit rows, Ask CIA, and quick-log are inert. The quick-log query is ignored. There is no offline queue/reconcile proof, reminder-disabled reason, reorder fallback, or add-habit flow.
- The sleep/stretch statement is correlational. It must say observed association, not causal effect, and let the user correct/dismiss it.

### Numeric/source truth freeze candidates

- `5 / 8 = 62.5%`; freeze display rounding as `63%` or explicitly `62%` floor, but derive numerator/denominator/bar/text from one payload. Current 62 is mathematically plausible only with a declared rounding rule.
- Separate states: real says `5 of 8 · calculated locally`; low confidence says `about 5 of 8 · sync pending`. Do not display exact bright streak and pending provenance together.
- Streak is `21-day streak` only when at least two completed days and a local calculation exist. CIA insight needs source domains, observation window, sample count, freshness, confidence, and `association, not causation`.

### Recommended deterministic fixtures and assertions

Freeze at least: `today-real`, `week`, `month`, `low-confidence`, `honest-null`, `skeleton`, `error-cached`, `offline`, `check-success`, `reminder-disabled`, `add-habit`, `data-controls`, `cia-detail`.

- Native habit checkboxes expose name, due time, registered domain/category, checked state, and consequence (`Completing updates today to 6 of 8`). Space/click mutates once, hero/bar update from the same payload, polite status offers Undo, and green completion flash occurs only at 8/8.
- Tabs implement tablist/tab/tabpanel semantics; Week renders a seven-bar chart with values/source summary; Month renders the four-week heatmap; inactive panels are not focusable.
- `honest-null`: `No habits yet`, no streak/heatmap/CIA claim, and `Pick one. That's enough.` with native Add habit. `offline`: local checks queue visibly; provider/reminder mutations disabled as needed.
- Add habit sheet has native name, recurrence, time, and registered-domain/category controls; invalid Save disabled; valid Save adds one local row. Reminder-disabled exposes a screen-reader reason and cannot invoke notification permission.
- CIA detail is local/focus-managed and contains association window/sample/freshness/confidence, correction/dismiss action, and all data controls for habit/sleep-derived analysis.

## Shared consumers and regression boundaries

- S37 is linked from S12 Home and S18 Explore; S38 is linked from S18 Explore, S68 Universal Search, S71 Achievement Gallery, and accepted D2 CIA routine/movement routes. Preserve `/screens/37` and `/screens/38` same-origin targets and do not change those accepted consumers.
- S35/S36 are registered only in the domain screen registry and have no live product route. Do not invent vanity/product routes during visual finalization.
- S36/S35 both hand off reflection to S37; S36 milestones may hand off to S67. These should be explicit local preview links with deterministic state/prefill selectors, not storage-backed handoffs.
- Shared kit/globals are accepted-sentinel surfaces and out of this Luna packet. Prefer screen-local rows, tabs, sheets, status copy, and payloads unless Sol explicitly serializes a shared change.

## Suggested verifier matrix summary

| Screen | Recommended state PNGs | Actual 125% proof | Required interaction proof |
|---|---:|---|---|
| 35 | 11 | `default-real` | log/save; suggestion+undo; course revoke/delete; Journal link |
| 36 | 12 | `default-real` | log/save; timer; Journal reflect; milestone detail; data controls |
| 37 | 14 | `default-entries` | tabs; text/voice compose; save; delete/cancel/undo; safety/data controls |
| 38 | 13 | `today-real` | checkbox+undo; tabs/panels; add; disabled reminder; CIA/data controls |

This yields 50 isolated state PNGs plus four actual 125% proofs for this packet's four screens. Sol may reduce only when every spec/audit disposition remains independently visible and screenshot hashes remain meaningfully unique.
