# 81-video-library - hi-fi glass spec

### 1. Header
- **ID:** 81
- **Name:** Video library
- **Route(s) covered:** No live route; content surface launched from Explore, Help, domain dashboards, CIA chat, and Webinar recordings [94].
- **Tab:** Me / Learn
- **Source:** app_design 3/81-video-library.md plus ascii_wireframes/81-video-library.md
- **Batch:** 21

### 2. Purpose
Video library curates coaching videos and webinar recordings around active missions, recovery, and focus needs. It is a utility/content surface: search, categories, featured CIA pick, next-best videos, watch progress, save/bookmark, and an honest YouTube handoff.

### 3. Entry & exit
- **Entry paths:** Explore, domain dashboards, Help Center [25], CIA chat, Webinar recording link [94], or recommendation card.
- **Primary exit:** play featured video or selected recording in modal player.
- **Secondary exits:** search YouTube with privacy confirmation, save/bookmark, back to origin, or open webinar detail.
- **Failure exit:** unavailable video returns to list; network failure keeps cached videos and search YouTube disabled with reason.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back and Video library title.
2. **SearchOverlay / search field** for coaching videos, categories, body region, and goal context.
3. **Featured video GlassCard** with thumbnail, play button, duration, CIA pick, and specific reason.
4. **Category filter row** for mobility, focus, recovery, nutrition, webinars, saved.
5. **Next-best video rows** with thumbnail, title, reason, duration, watch progress, save/bookmark.
6. **CIA filtering note** explaining recommendation logic.
7. **Search YouTube CTA** with privacy confirmation.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Video library                     |
+--------------------------------------+
| [ Search coaching videos          ]  |
| [Mobility] [Focus] [Webinars] [Saved]|
| +----------------------------------+ |
| | CIA PICK                         | |
| |          play                    | |
| | Post-run mobility          8 min | |
| | Chosen for tomorrow's run.       | |
| | [Play] [Save]                    | |
| +----------------------------------+ |
| NEXT BEST VIDEOS                     |
| +----------------------------------+ |
| | video  5-minute hip reset  5:20 | |
| | resume 43%        [bookmark]     | |
| +----------------------------------+ |
| | recording Stress reset webinar   | |
| | watch progress 12% [Save]        | |
| +----------------------------------+ |
| CIA picks by mission and recovery.   |
| [Search YouTube]                     |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back and title.
- **SearchOverlay** - focused video search and clear action.
- **GlassCard** - featured CIA pick video card.
- **SegmentedTabs** - category/filter row.
- **VideoLibrary** - video grid/detail pattern for recordings and progress.
- **ProgressBar** - watch progress/resume indicator.
- **ChipDomainTag** - domain/category tags without recoloring chrome.
- **ChipProvenance** - recommendation source, recording source, watch progress confidence.
- **CIAInsightCard** - recommendation logic note.
- **BtnPrimary / BtnSecondary / BtnGhost** - play, save/bookmark, search YouTube.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` base with warm radial glow and grain.
- **Glass tiering:** featured video and CIA note use glass; video rows use SolidCard on `#211008`.
- **Semantic glows:** play/save action uses `--glow-you #FF5E00`; watched/completed recording uses `--glow-done #34A853`; CIA pick/note uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; featured title can read `Post-run *mobility*` with Tiempos italic word.
- **60/30/10:** orange for play/search actions, green for completed watched state, purple for CIA recommendation.

### 7. Content & copy
- **H1:** Video library
- **Search placeholder:** Search coaching videos
- **Featured:** Post-run *mobility*; Chosen because tomorrow's run needs light preparation.
- **Categories:** Mobility; Focus; Recovery; Nutrition; Webinars; Saved.
- **Rows:** 5-minute hip reset; Stress reset webinar recording; Calm focus primer.
- **CIA line:** CIA picks videos by your active missions and recovery context.
- **Primary CTAs:** Play featured video; Search YouTube
- **Secondary CTAs:** Save video; Resume video; Bookmark recording
- **Empty copy:** No videos match that search. Try a body part, goal, or webinar topic.
- **Error copy:** Couldn't load videos. Cached saved items remain available.

### 8. Data & honesty states
- **Recommendation reason:** real = mission/recovery evidence plus provenance; low-confidence = topic-only match; honest-null = curated default without personal claim.
- **Watch progress:** real = percent and timestamp; low-confidence = cross-device sync pending; honest-null = unwatched.
- **Saved/bookmarked state:** real = saved or unsaved with timestamp; low-confidence = offline queue; honest-null = no account state.
- **Recording availability:** real = recording published; low-confidence = processing; honest-null = no recording yet.
- **YouTube handoff:** real = external search query; low-confidence = browser unavailable; honest-null = disabled offline.

### 9. All states
- **Default:** search, filters, featured CIA pick, next-best rows, watch progress, save/bookmark, YouTube CTA.
- **Skeleton:** featured card and rows shimmer with exact media sizes.
- **Empty:** HonestNullState for cold library or no query results; Search YouTube remains when online.
- **Error:** cached videos remain, failed rows name unavailable source, and retry/search options are clear.
- **Success:** play starts, saved/bookmark state updates with `--glow-done`, watch progress persists.
- **Disabled:** play/save/search dims to 40% with reason when offline, unavailable, unsigned, or third-party handoff blocked.

### 10. Motion & interaction
- **Load:** search first, featured card second, rows stagger 60ms.
- **Play:** player opens modal/fullscreen; watch progress updates only from real playback.
- **Save/bookmark:** icon changes plus text confirmation; no color-only state.
- **YouTube:** privacy confirmation appears before external browser handoff.
- **Reduced-motion:** disables row stagger, play pulse, and progress animation.

### 11. Motivation-tier adaptation
- **Low:** search, one featured video, one resume row, no advanced filters.
- **Medium:** default filters, featured, next-best, watch progress, save/bookmark.
- **High:** exact recommendation evidence, watch history, transcript/captions, recording source detail.

### 12. Accessibility
- **Contrast:** text, chips, and controls clear AA+ on dark/solid surfaces.
- **Targets:** search, filters, play, save/bookmark, rows, and YouTube CTA are 44px minimum.
- **Screen readers:** video rows announce title, category, reason, duration, recording status, and watch progress.
- **Consent/data:** YouTube handoff warns that private journal/health data is not shared; save/watch history can be deleted from account controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** video library, webinar recording, category/filter, watch progress/resume, save/bookmark are present.
2. **Honest:** real, low-confidence, honest-null states cover recommendation, progress, saved, recording, handoff.
3. **Premium:** content utility is specific and media-aware.
4. **Warm-dark:** glass featured card and solid rows specified.
5. **Semantic glow:** orange play/save, green watched, purple CIA.
6. **60/30/10:** domain colors remain tags.
7. **Type:** Neue Montreal plus one Tiempos italic video title.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, captions, contrast, reduced-motion.
11. **Consent:** third-party handoff and watch-history deletion are explicit.
12. **Catalog:** canon media components reused.
13. **CIA voice:** specific, warm, non-generic.

