# 81-video-library - A+++ hi-fi mobile spec

## Header
- **Source ID:** 81
- **Source spec:** `Balencia-New-Screens/screens/81-video-library.md`
- **Evidence:** screens/81-video-library.md, app_design 3/81-video-library.md plus ascii_wireframes/81-video-library.md
- **Route(s):** No live route; content surface launched from Explore, Help, domain dashboards, CIA chat, and Webinar recordings [94].
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Video library curates coaching videos and webinar recordings around active missions, recovery, and focus needs.
- **Premium Visual Director:** make Video library command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Video library treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

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

Route handling: No live route; content surface launched from Explore, Help, domain dashboards, CIA chat, and Webinar recordings [94].
```

## Focal Hierarchy
- **Dominant focal moment:** Video library command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back and Video library title. with CIA only when the source supports a synthesized read.
- **Operational layer:** CIA filtering note explaining recommendation logic., Search YouTube CTA with privacy confirmation., H1, Search placeholder.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*library*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
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

## Data Honesty
- **Recommendation reason:** real = mission/recovery evidence plus provenance; low-confidence = topic-only match; honest-null = curated default without personal claim.
- **Watch progress:** real = percent and timestamp; low-confidence = cross-device sync pending; honest-null = unwatched.
- **Saved/bookmarked state:** real = saved or unsaved with timestamp; low-confidence = offline queue; honest-null = no account state.
- **Recording availability:** real = recording published; low-confidence = processing; honest-null = no recording yet.
- **YouTube handoff:** real = external search query; low-confidence = browser unavailable; honest-null = disabled offline.

## Consent and Safety
- Video library treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** search, filters, featured CIA pick, next-best rows, watch progress, save/bookmark, YouTube CTA.
- **Skeleton:** featured card and rows shimmer with exact media sizes.
- **Empty:** HonestNullState for cold library or no query results; Search YouTube remains when online.
- **Error:** cached videos remain, failed rows name unavailable source, and retry/search options are clear.
- **Success:** play starts, saved/bookmark state updates with `--glow-done`, watch progress persists.
- **Disabled:** play/save/search dims to 40% with reason when offline, unavailable, unsigned, or third-party handoff blocked.

## Motion
- **Load:** search first, featured card second, rows stagger 60ms.
- **Play:** player opens modal/fullscreen; watch progress updates only from real playback.
- **Save/bookmark:** icon changes plus text confirmation; no color-only state.
- **YouTube:** privacy confirmation appears before external browser handoff.
- **Reduced-motion:** disables row stagger, play pulse, and progress animation.

## Image Slots
- `HIFI-81-01` - media hero or list thumbnail; screen-specific; premium warm-dark product placeholder. Prompt: Video library video/speaker thumbnails, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; content surface launched from Explore, Help, domain dashboards, CIA chat, and Webinar recordings [94]..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** text, chips, and controls clear AA+ on dark/solid surfaces.; **Targets:** search, filters, play, save/bookmark, rows, and YouTube CTA are 44px minimum.; **Screen readers:** video rows announce title, category, reason, duration, recording status, and watch progress.
