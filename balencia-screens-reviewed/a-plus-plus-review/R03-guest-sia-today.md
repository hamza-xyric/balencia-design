# R03 - Guest, SIA Onboarding, Today Entry

- Status: `reviewed`
- Reviewed: 2026-05-27
- Prototype URL: `http://localhost:3000`
- Screens: `06`, `07`, `08`, `12`, `41`
- Routes: `/auth/guest-preview`, `/auth/sia-onboarding`, `/auth/initial-plan`, `/tabs/today`, `/tabs/today/schedule`
- Sources: `../batches/batch-03.md`, `../update-batches/batch-u02.md`, `../screen-iteration-batches/P03-guest-sia-today.md`
- Evidence directory: `../../balencia-screens/output/a-plus-plus-review/R03/`
- Interaction evidence: `../../balencia-screens/output/a-plus-plus-review/R03/r03-interaction-evidence.json`
- Build gate: required, passed
- Finding IDs: `R03-F01` through `R03-F04`

## Focus

Validate the handoff from preview into SIA, plan confidence, Today usefulness, and schedule clarity. A++ requires visible user value, action clarity, SIA restraint, and no ordinary or generic first-day experience.

## Batch Summary

| Grade | Count | Screens |
| --- | ---: | --- |
| A++ | 2 | 06 Guest preview, 08 Initial plan |
| A+ | 0 | - |
| A | 3 | 07 SIA onboarding, 12 Home screen, 41 Schedule / calendar |
| Below A | 0 | - |

- A++ screens: 06 and 08.
- Capped below A++: 07 for first-SIA visual/composer overlap, 12 for inert secondary Today CTAs, and 41 for incomplete calendar event/date behavior.
- New findings: `R03-F01` through `R03-F04`.
- Deferred decisions: none. The blockers are implementation/handoff clarity issues, not unresolved product policy.

## Verification

| Date | Command | Result | Notes |
| --- | --- | --- | --- |
| 2026-05-27 | `node scripts/capture-r03-states.mjs` from `balencia-screens-reviewed` | passed | Captured 24 interaction states under `../../balencia-screens/output/a-plus-plus-review/R03/`. In-app browser was unavailable, so local Playwright fallback was used against `http://localhost:3000`. |
| 2026-05-27 | `npm run check` from `balencia-screens` | passed | lint, typecheck, route, asset, copy, and brand verification passed; `verify:routes passed (90 screens, 90 specs)`. |
| 2026-05-27 | `npm run build` from `balencia-screens` | passed | Production build compiled successfully and generated 96 static pages. Build emitted a Node `DEP0205` deprecation warning from Next/Turbopack, not a failing app check. |

## Screen Notes

### 06 - Guest preview

- Status: reviewed
- Route: `/auth/guest-preview`
- Evidence: `../../balencia-screens/output/a-plus-plus-review/R03/06-auth-guest-preview-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R03/06-r03-guest-max-selection.png`, `../../balencia-screens/output/a-plus-plus-review/R03/06-r03-guest-dialog.png`, `../../balencia-screens/output/a-plus-plus-review/R03/06-r03-guest-continue-today.png`
- Five-second read: A polished low-pressure preview entry asks for a name and 1-3 life areas before showing demo Today.
- Screen purpose and journey fit: Strong. It answers the pre-signup "can I look around first?" concern without over-collecting data.
- Primary action clarity: Clear. `Explore preview` is honestly disabled until name plus one selected domain exists, then opens a clearly labeled preview dialog.
- Emotional tone: Warm, premium, and low-commitment; the dialog is honest about demo data.

| Visible control | Purpose | State / behavior |
| --- | --- | --- |
| Back button | Return to sign up | Works; routes to `/auth/sign-up`. |
| Name input | Personalize the demo | Editable, 52px target, required before CTA enables. |
| 9 life-area chips | Choose 1-3 demo interests | Toggle buttons, 44px targets, selected count/status updates, max-selection validation shown. |
| Explore preview | Open preview continuation | Disabled until valid; opens `Preview demo` dialog when valid. |
| Sign in | Returning-user escape hatch | Link to `/auth/sign-in`, 44px target. |
| Preview dialog close | Dismiss preview dialog | Works. |
| Continue to demo Today | Continue into demo Today | Routes to `/tabs/today`. |
| Sign up to save | Create account from preview | Link to `/auth/sign-up`. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The resolved placeholder/demo decision is honored without pretending real user data exists. |
| User friction | 5 | Name plus domain selection is quick, max-three guidance is explicit, and the CTA state is honest. |
| Visual appeal | 5 | Auth composition, spacing, logo anchoring, and modal treatment are Figma-ready. |
| Brand fit | 5 | Dark-first, warm, orange-led, and clear Balencia preview tone. |
| Mobile ergonomics | 5 | All visible controls meet 44px target expectations in fresh evidence. |
| Accessibility | 5 | Inputs/chips/buttons are labeled, disabled state is honest, and status text reports selection/max state. |
| Trust/privacy | 5 | Copy says demo data and does not imply guest data is saved. |
| Industry best practice | 5 | Try-before-signup path has validation, a continuation, and account conversion actions. |

- Grade: A++
- Grade cap: none

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| - | - | - | No major findings. | - | - | - | - |

Decision: A++

### 07 - SIA onboarding

- Status: reviewed
- Route: `/auth/sia-onboarding`
- Evidence: `../../balencia-screens/output/a-plus-plus-review/R03/07-auth-sia-onboarding-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R03/07-r03-sia-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R03/07-r03-sia-follow-up.png`, `../../balencia-screens/output/a-plus-plus-review/R03/07-r03-sia-to-plan.png`
- Five-second read: SIA introduces itself with a visual domain board, chat bubbles, suggestion chips, and a real composer.
- Screen purpose and journey fit: Correct moment and now functional enough to reach the plan.
- Primary action clarity: Partly clear. Suggestion chips and composer work, but the initial suggestions are partially covered by the fixed composer.
- Emotional tone: Warm and coach-like, though the first visual moment feels cramped rather than cinematic.

| Visible control | Purpose | State / behavior |
| --- | --- | --- |
| Suggestion chips | Send quick onboarding answers | Work; first suggestion sends a user message and SIA follow-up. Initial route evidence flags chips overlapping the composer. |
| Text input | Freeform SIA response | Works; accepts text. |
| Send message | Submit typed response | Disabled when empty; enabled with text; routes to Initial plan after the second answer. |
| Visual domain bubbles/cards | Show selected life areas and example goals | Decorative/static in this prototype; visual hierarchy is cramped. |
| Progress dots | Show onboarding progress | Static/progress feedback; not a control. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | First SIA contact belongs here and reaches the plan. |
| User friction | 4 | Users can proceed, but the partially hidden chips make the easiest path less obvious. |
| Visual appeal | 3 | Goal cards collide with the lower domain labels and the composer overlaps quick-reply chips. |
| Brand fit | 4 | Copy is calm and connected-life oriented, but the "wow" panel is not yet premium. |
| Mobile ergonomics | 3 | Primary quick replies are compromised by bottom composer overlap on initial evidence. |
| Accessibility | 4 | Composer and send are labeled; the hidden/clipped chip state can still impair discoverability. |
| Trust/privacy | 5 | No sensitive claims or permissions are overreached. |
| Industry best practice | 4 | Functional guided chat exists, but first-use AI onboarding should not hide primary response controls. |

- Grade: A
- Grade cap: `R03-F01` major finding prevents A+ and A++.

| Finding | Screen / route | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R03-F01 | 07 SIA onboarding / `/auth/sia-onboarding` | major | mobile-ergonomics | `07-auth-sia-onboarding-evidence.json` reports `Run a half marathon`, `Save $5,000`, and `Sleep better` overlapping `screen-composer`; `07-r03-sia-initial.png` shows the quick-reply row partially covered and the visual goal cards colliding with domain labels. | The easiest onboarding path is visually obscured at the critical first-SIA moment, and the visual board feels cramped instead of premium. | Rebalance the top visual panel and chat area: reduce/scroll the visual cards, reserve clear space above the composer for chips, or make the chip row sticky above the composer with no overlap. | proposed | Prevents A+ and A++ |

Decision: needs polish

### 08 - Initial plan

- Status: reviewed
- Route: `/auth/initial-plan`
- Evidence: `../../balencia-screens/output/a-plus-plus-review/R03/08-auth-initial-plan-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R03/08-r03-plan-initial.png`, `../../balencia-screens/output/a-plus-plus-review/R03/08-r03-plan-customize.png`, `../../balencia-screens/output/a-plus-plus-review/R03/08-r03-plan-edit-saved.png`, `../../balencia-screens/output/a-plus-plus-review/R03/08-r03-plan-start-today.png`
- Five-second read: SIA reveals a starter life plan with level-one RPG framing and three coherent missions.
- Screen purpose and journey fit: Strong. It closes onboarding by turning SIA input into an actionable plan.
- Primary action clarity: Clear after scanning/scrolling; `Start your journey` works and routes to Today.
- Emotional tone: Encouraging, credible, and appropriately celebratory without being noisy.

| Visible control | Purpose | State / behavior |
| --- | --- | --- |
| Edit mission buttons | Adjust individual mission title | Work; opens edit dialog, saves changed title. |
| Start your journey | Accept plan and enter app | Works; routes to `/tabs/today`; loading text appears. |
| Customize / Hide customization | Show plan customization panel | Works; panel explains consistency with fitness, finance, wellbeing. |
| Remove mission rows in customization panel | Drop a plan item before starting | Work as visible state controls in prototype. |
| Edit dialog close | Dismiss edit dialog | Works. |
| Mission title input | Edit mission text | Works. |
| Save change | Commit edited mission title | Works. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The plan reveal matches the SIA conversation and makes the next step meaningful. |
| User friction | 5 | Accept, customize, and edit paths are reachable and behave visibly. |
| Visual appeal | 5 | The card stack, domain colors, RPG bar, and modal are composed and ready for Figma translation. |
| Brand fit | 5 | Orange, domain tags, SIA, and RPG language are balanced. |
| Mobile ergonomics | 5 | Touch targets and scroll behavior are adequate in evidence. |
| Accessibility | 5 | Edit controls, modal, input, and primary CTA are labeled and usable. |
| Trust/privacy | 5 | Plan consistency copy ties the plan to onboarding inputs. |
| Industry best practice | 5 | Plan acceptance and customization states are documented by working prototype evidence. |

- Grade: A++
- Grade cap: none

| Finding | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| - | - | - | No major findings. | - | - | - | - |

Decision: A++

### 12 - Home screen

- Status: reviewed
- Route: `/tabs/today`
- Evidence: `../../balencia-screens/output/a-plus-plus-review/R03/12-tabs-today-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R03/12-r03-today-mood.png`, `../../balencia-screens/output/a-plus-plus-review/R03/12-r03-today-action-expanded.png`, `../../balencia-screens/output/a-plus-plus-review/R03/12-r03-today-action-complete.png`, `../../balencia-screens/output/a-plus-plus-review/R03/12-r03-today-mission-noop.png`, `../../balencia-screens/output/a-plus-plus-review/R03/12-r03-today-activity-view-all-noop.png`
- Five-second read: A strong Today command center with SIA tone, mood capture, metrics, quick actions, daily actions, pinned missions, schedule, insight, and activity.
- Screen purpose and journey fit: Very strong. It answers "what matters today?" and brings the product into daily use.
- Primary action clarity: Primary daily-action behavior works; secondary mission/activity CTAs are not fully wired.
- Emotional tone: Premium, useful, and motivating.

| Visible control | Purpose | State / behavior |
| --- | --- | --- |
| Mood chips | Capture current mood | Work; selected chip and toast appear. |
| Health metric pills | Open relevant detail | Work for tested Sleep route; note the target route belongs to R15. |
| Quick actions | Deep-link to common tools | Tested `Breathe`; routes to `/features/breathing`. |
| Today action body | Expand why-this-matters detail | Works. |
| Completion buttons | Complete/reopen action | Works; toast appears and action state changes. |
| View all missions | Open mission board | Link to `/tabs/goals`. |
| Pinned mission cards | Expected to open mission detail | Do not route or change state despite `tap to view details` accessibility label. |
| Schedule rows | Open schedule | Work; tested route to `/tabs/today/schedule`. |
| SIA insight card | Open SIA conversation | Routes to `/tabs/sia` by implementation. |
| Recent activity `View all` | Expected to open activity history | Button has no route or state change. |
| Bottom tabs | Navigate authenticated sections | Present and standard. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 5 | The screen is the right daily hub and the core habit loop works. |
| User friction | 4 | Primary actions are smooth, but mission/activity follow-through stalls. |
| Visual appeal | 5 | Composition is dense but polished and premium. |
| Brand fit | 5 | SIA, orange action hierarchy, domain tags, and RPG cues are balanced. |
| Mobile ergonomics | 5 | Fresh metrics show no small targets or nested controls. |
| Accessibility | 3 | Pinned mission cards announce tap behavior that is not actually available. |
| Trust/privacy | 4 | SIA insight and metrics feel useful; inert secondary CTAs reduce confidence. |
| Industry best practice | 4 | Daily hubs need every visible mission/activity affordance to complete the navigation loop. |

- Grade: A
- Grade cap: `R03-F02` major finding prevents A+ and A++.

| Finding | Screen / route | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R03-F02 | 12 Home screen / `/tabs/today` | major | navigation | `12-r03-today-mission-noop.png` shows tapping the pinned mission card leaves `/tabs/today` unchanged; `MissionCard` exposes `aria-label="...tap to view details"` without click behavior. `12-r03-today-activity-view-all-noop.png` shows `View all` remains on `/tabs/today` with no visible state change. | Users trying to inspect a pinned mission or activity history hit dead controls, and assistive-tech users are explicitly promised unavailable behavior. | Wire pinned mission cards to mission detail and either route `View all` to a real activity history, disable/remove it, or document a Figma-only destination before handoff. | proposed | Prevents A+ and A++ |

Decision: needs polish

### 41 - Schedule / calendar

- Status: reviewed
- Route: `/tabs/today/schedule`
- Evidence: `../../balencia-screens/output/a-plus-plus-review/R03/41-tabs-today-schedule-phone.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-week.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-month.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-next-month.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-task-placed.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-event-created.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-event-noop.png`, `../../balencia-screens/output/a-plus-plus-review/R03/41-r03-schedule-sync-route.png`
- Five-second read: Day calendar with segmented views, date navigation, unscheduled tasks, event timeline, sync, and add affordances.
- Screen purpose and journey fit: Strong conceptually, but calendar details are not yet trustworthy enough for A++.
- Primary action clarity: Viewing and adding/scheduling are understandable; event inspection and date-specific content remain incomplete.
- Emotional tone: Calm, utilitarian, and product-mode appropriate.

| Visible control | Purpose | State / behavior |
| --- | --- | --- |
| Back | Return to previous route | Present; standard header behavior. |
| Sync cloud | Open connected services | Works; routes to `/tabs/me/connected-services`. |
| Header add | Open add event modal | Works. |
| Day / Week / Month tabs | Switch calendar view | Work and update visible layout. |
| Previous / Next date | Move selected day/week/month | Work at label level; event data does not change meaningfully by selected date. |
| Unscheduled task rows | Place loose tasks | Work; tested `Read 20 min` placement with toast and new timeline event. |
| Add modal title field | Name a manual event | Works. |
| Add modal cancel | Dismiss modal | Works. |
| Add modal create | Create event | Disabled when empty; works after title entry. |
| Day timeline event cards | Expected to open event/domain detail | Static articles; tapping `Morning run` has no route or state change. |
| Floating add | Open add event modal | Works. |
| Bottom tabs | Navigate authenticated sections | Present and standard. |

| Dimension | Score | Notes |
| --- | ---: | --- |
| Product sense | 4 | Calendar value is clear, but non-date-specific event data weakens planning trust. |
| User friction | 4 | Add/task/view switching work; event inspection does not. |
| Visual appeal | 4 | Strong schedule composition, though event/FAB density still needs final polish. |
| Brand fit | 5 | Uses orange for active controls and domain colors for identification only. |
| Mobile ergonomics | 4 | Targets are adequate, but event-card affordance is incomplete. |
| Accessibility | 5 | Date/add/sync labels are disambiguated and touch targets meet the gate. |
| Trust/privacy | 3 | Date navigation reuses the same event set, which can make calendar data feel fake. |
| Industry best practice | 3 | Calendar event cards and selected-date content need to behave like a real planning surface. |

- Grade: A
- Grade cap: `R03-F03` and `R03-F04` major findings prevent A+ and A++.

| Finding | Screen / route | Severity | Category | Evidence | User impact | Recommendation | Status | Grade cap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R03-F03 | 41 Schedule / calendar / `/tabs/today/schedule` | major | navigation | `41-r03-schedule-event-noop.png` shows tapping the `Morning run` event leaves `/tabs/today/schedule` unchanged. Day-view events are rendered as static articles while the spec expects tap to event detail or relevant domain. | Users cannot inspect, edit, accept, dismiss, or understand a scheduled item from the day grid. | Make event cards honest controls with detail/quick-action behavior, or restyle static demo event cards so they do not imply interaction. | proposed | Prevents A+ and A++ |
| R03-F04 | 41 Schedule / calendar / `/tabs/today/schedule` | major | trust-privacy | `41-r03-schedule-next-month.png` advances to `June 2026` while still showing the same five-event demo day; `41-r03-schedule-task-placed.png` then shows `Sat, Jun 20, 2026` with the original fixed events. | Date navigation appears to work but does not represent date-specific calendar data, which undermines trust in planning and sync behavior. | Tie displayed events to the selected date/month, show an honest empty/demo state for dates without data, or document the prototype as a static demo calendar state. | proposed | Prevents A+ and A++ |

Decision: needs polish
