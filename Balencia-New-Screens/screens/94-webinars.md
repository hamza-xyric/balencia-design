# 94-webinars - hi-fi glass spec

### 1. Header
- **ID:** 94
- **Name:** Webinars
- **Route(s) covered:** /webinars, /webinars/[slug]
- **Tab:** Public / Learn
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 20

### 2. Purpose
Webinars covers the public list and detail/registration flow: upcoming sessions, speaker/host information, registration, calendar handoff, recordings, and watch progress. It must support both logged-out browsing and signed-in personalization without hiding provenance or seat/recording states.

### 3. Entry & exit
- **Entry paths:** public route /webinars, detail route /webinars/[slug], Today learning recommendation, Plans/Video Library recording link, and email deep link.
- **Primary exit:** Back returns to public list or source surface; registered users can return to their plan or calendar.
- **Action exits:** `Register` opens account-aware registration; `Add to calendar` opens calendar permission; `Watch recording` opens Video Library [81] or embedded player; `Share webinar` opens native share with public URL only.
- **Failure exit:** registration, recording, or calendar failures keep list/detail content visible and offer retry or System states [98].

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with title/search on list and back/share on detail.
2. **Hero GlassCard** for featured upcoming webinar with date, speaker, host, and registration state.
3. **Filter row** for upcoming, registered, recordings, and topics.
4. **Webinar list/detail stack** with session cards or detail agenda.
5. **CIAInsightCard** for signed-in members connecting session to active goals.
6. **Registration panel** with seat status, reminder, calendar, and recording progress.
7. **Public trust footer** with speaker bio, privacy, and support links.

**ASCII wireframe (390x844):**
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
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** warm dark base `#0A0A0F`, radial glow, 3-4% grain; public pages retain the same premium depth.
- **Glass tiering:** featured/detail hero and CIA card use GlassCard; list rows and speaker bios use SolidCard on `#211008`.
- **Semantic glows:** registration/action uses `--glow-you #FF5E00`; confirmed registration or completed recording uses `--glow-done #34A853`; CIA personalization uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal for UI; detail hero can read `Live *reset* for sleep` with one Tiempos italic word.
- **60/30/10:** orange actions, green confirmed/completed, purple AI context. Topic colors stay as ChipDomainTag only.

### 7. Content & copy
- **H1 list:** Webinars
- **Detail hero:** Live *reset* for sleep
- **Speaker line:** Speaker: Dr. Rana Malik; host: Balencia wellbeing.
- **Registration copy:** Register to save your seat and receive the recording link.
- **CIA line:** CIA connects this webinar to your active sleep and stress plan.
- **Primary CTAs:** Register; Watch recording
- **Secondary CTAs:** Add to calendar; Share webinar; View speaker bio
- **Empty copy:** No upcoming webinars match this filter. Recordings remain available when published.
- **Error copy:** Registration did not complete. Your seat was not changed.
- **Public privacy copy:** We share only the registration details required to deliver the session.

### 8. Data & honesty states
- **Session schedule:** real = date/time/time zone plus provenance; low-confidence = imported event pending confirmation; honest-null = date not announced.
- **Registration state:** real = registered/waitlisted/not registered; low-confidence = payment/session service pending; honest-null = signed-out user has no registration record.
- **Seats left:** real = fresh count and timestamp; low-confidence = count older than one hour; honest-null = no seat count displayed.
- **Recording progress:** real = watch progress plus recording source; low-confidence = cross-device sync pending; honest-null = no recording published.
- **CIA recommendation:** real = signed-in member with relevant plan/goal; low-confidence = topic-only match; honest-null = generic public page with no claim.

### 9. All states
- **Default:** list/detail hero, filters, sessions, speaker, registration, and recording states render.
- **Skeleton:** session cards show date/title/speaker geometry without fake seat counts.
- **Empty:** HonestNullState varies by tab: no upcoming, no registrations, or no recordings.
- **Error:** failed registration or recording keeps session visible and names the failed action.
- **Success:** registration updates to confirmed, `--glow-done` flashes, and calendar/recording next step appears.
- **Disabled:** register/watch/calendar are 40% opacity with reason when signed-out, sold out, not published, permission-blocked, or offline.

### 10. Motion & interaction
- **Load:** featured hero fades, session rows rise in 50ms stagger.
- **Register:** button opens Sheet; success morphs button to confirmed state in 220ms.
- **Recording:** progress resumes in VideoLibrary; row progress bar fills only to real percentage.
- **Share:** uses public URL, never private plan or health data.
- **Reduced-motion:** disables row cascade and progress animation; state labels change instantly.

### 11. Motivation-tier adaptation
- **Low:** one featured session, one recommended recording, minimal filters.
- **Medium:** default filters, detail agenda, speaker, registration, recording progress, and CIA context.
- **High:** show full topic filters, transcript link, watch history, calendar reminder controls, and registration audit.

### 12. Accessibility
- **Contrast:** text on dark/glass surfaces clears AA+.
- **Targets:** register, calendar, share, filters, recording rows, and speaker links are 44px minimum.
- **Screen readers:** session cards announce title, speaker, date, registration state, and recording availability.
- **Consent/data:** calendar permission, registration data use, unsubscribe/revoke reminder, and delete registration record are available.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /webinars and /webinars/[slug], registration, speaker, recording, and calendar are present.
2. **Honest:** real, low-confidence, and honest-null states cover schedule, registration, seats, recordings, and CIA.
3. **Premium:** public list/detail flow is specific and usable.
4. **Warm-dark:** glass hero and solid rows are specified.
5. **Semantic glow:** orange register, green confirmed/completed, purple CIA.
6. **60/30/10:** topic colors stay secondary.
7. **Type:** Neue Montreal plus one Tiempos italic moment.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled included.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion.
11. **Consent:** registration/calendar data controls visible.
12. **Catalog:** canon components reused.
13. **CIA voice:** helpful, evidenced, and account-aware.

