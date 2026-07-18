# 94-webinars - A+++ hi-fi mobile spec

## Header
- **Source ID:** 94
- **Source spec:** `Balencia-New-Screens/screens/94-webinars.md`
- **Evidence:** screens/94-webinars.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/webinars`, `/webinars/[slug]`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Webinars covers the public list and detail/registration flow: upcoming sessions, speaker/host information, registration, calendar handoff, recordings, and watch progress.
- **Premium Visual Director:** make Webinars hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Webinars treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <  Webinars                  search  |
+--------------------------------------+
| +----------------------------------+ |
| | Live reset for sleep            | |
| | Thu 7:00 PM | speaker: Dr. Rana | |
| | host: Balencia wellbeing        | |
| | seats: open | via /webinars     | |
| | [Register] [Add to calendar]    | |
| +----------------------------------+ |
| [Upcoming] [Registered] [Recordings] |
|                                      |
| +----------------------------------+ |
| | Stress reset workshop           | |
| | speaker Maya | 42 min recording | |
| | watch progress 38% [Watch]      | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: this session supports your | |
| | active sleep and stress plan.   | |
| +----------------------------------+ |
| Speaker bio | privacy | support      |
+--------------------------------------+

Route handling: `/webinars`, `/webinars/[slug]`
```

## Focal Hierarchy
- **Dominant focal moment:** Webinars hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with title/search on list and back/share on detail. with CIA only when the source supports a synthesized read.
- **Operational layer:** Filter row for upcoming, registered, recordings, and topics., Webinar list/detail stack with session cards or detail agenda., H1 list, Detail hero.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*webinars*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - search/list title, detail back, share, and calendar actions.
- **GlassCard** - featured session or detail hero.
- **SegmentedTabs** - upcoming, registered, recordings, topics.
- **SolidCard** - webinar row, agenda block, speaker bio, and recording row.
- **VideoLibrary** - recording preview and watch progress handoff.
- **ProgressBar** - recording watch progress.
- **ChipProvenance** - route, registration source, recording status, and seat freshness.
- **CIAInsightCard** - personalized learning context for signed-in members.
- **BtnPrimary / BtnSecondary / BtnGhost** - register, calendar, watch, share.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

## Data Honesty
- **Session schedule:** real = date/time/time zone plus provenance; low-confidence = imported event pending confirmation; honest-null = date not announced.
- **Registration state:** real = registered/waitlisted/not registered; low-confidence = payment/session service pending; honest-null = signed-out user has no registration record.
- **Seats left:** real = fresh count and timestamp; low-confidence = count older than one hour; honest-null = no seat count displayed.
- **Recording progress:** real = watch progress plus recording source; low-confidence = cross-device sync pending; honest-null = no recording published.
- **CIA recommendation:** real = signed-in member with relevant plan/goal; low-confidence = topic-only match; honest-null = generic public page with no claim.

## Consent and Safety
- Webinars treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/webinars`, `/webinars/[slug]`. Do not add alternate vanity routes.

## States
- **Default:** list/detail hero, filters, sessions, speaker, registration, and recording states render.
- **Skeleton:** session cards show date/title/speaker geometry without fake seat counts.
- **Empty:** HonestNullState varies by tab: no upcoming, no registrations, or no recordings.
- **Error:** failed registration or recording keeps session visible and names the failed action.
- **Success:** registration updates to confirmed, `--glow-done` flashes, and calendar/recording next step appears.
- **Disabled:** register/watch/calendar are 40% opacity with reason when signed-out, sold out, not published, permission-blocked, or offline.

## Motion
- **Load:** featured hero fades, session rows rise in 50ms stagger.
- **Register:** button opens Sheet; success morphs button to confirmed state in 220ms.
- **Recording:** progress resumes in VideoLibrary; row progress bar fills only to real percentage.
- **Share:** uses public URL, never private plan or health data.
- **Reduced-motion:** disables row cascade and progress animation; state labels change instantly.

## Image Slots
- `HIFI-94-01` - media hero or list thumbnail; screen-specific; premium warm-dark product placeholder. Prompt: Webinars video/speaker thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/webinars`, `/webinars/[slug]`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text on dark/glass surfaces clears AA+.; **Targets:** register, calendar, share, filters, recording rows, and speaker links are 44px minimum.; **Screen readers:** session cards announce title, speaker, date, registration state, and recording availability.
