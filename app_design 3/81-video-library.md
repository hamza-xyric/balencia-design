# Screen Design: Video Library

**Screen**: 81 of 90
**File**: 81-video-library.md
**Route**: `/features/videos`
**Register**: Product Mode with SIA recommendations
**Primary action**: Search and play coaching videos recommended by SIA
**Tab**: Me
**Navigation**: Stack push from Explore [18], domain dashboards, SIA Chat [09], or Help Center [25]. Back returns to origin.

---

## Purpose

Video Library gathers short coaching videos relevant to the user's active missions, recovery state, and focus needs. SIA curates the next best video rather than presenting an endless generic feed. The screen supports quick utility: search, play the featured recommendation, or open the next best videos.

---

## Information Architecture

**Hierarchy**:
1. Search bar
2. Featured SIA pick video
3. Next best videos list
4. SIA filtering note
5. Search YouTube bottom action

**User flow**:
- **Arrives from**: Explore [18], Fitness Dashboard [26], Yoga Sessions [55], SIA Chat [09], Help Center [25].
- **Primary exit**: Play featured video or Search YouTube.
- **Secondary exits**: Tap list video, back to origin, tap SIA note for explanation.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Video library       |
+-----------------------------+
| [ Search coaching videos ]  |
|                             |
| +-------------------------+ |
| |                         | |
| |          Play           | |
| | SIA pick                | |
| | Post-run mobility  [8m] | |
| +-------------------------+ |
| Chosen because your left... |
|                             |
| NEXT BEST VIDEOS            |
| [video] 5-minute hip reset  |
|         Recommended... 5:20 |
| [video] Post-run stretch... |
| [video] Calm focus primer...|
|                             |
| [SIA] SIA filters videos... |
+-----------------------------+
|        Search YouTube       |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Search Bar
- **Purpose**: Search coaching videos across title, domain, body region, and goal context.
- **Behavior**: Debounced query, filters in-app results first. Empty restores recommendation order.

### Featured Video
- **Purpose**: Present the single highest-confidence recommendation.
- **Visual treatment**: rounded-xl card, image/video placeholder area, orange play button, SIA pick label.
- **Content**:
  - Thumbnail region with warm fitness gradient.
  - Play button centered.
  - Eyebrow "SIA pick".
  - Title and duration pill.
  - Explanation below thumbnail.
- **Gesture**: Tap play -> video player modal/fullscreen.

### Video Row
- **Purpose**: Display next best recommendations.
- **Visual treatment**: Small card with video icon tile, title, metadata, duration.
- **Examples**: 5-minute hip reset, Post-run stretch, Calm focus primer.
- **Gesture**: Tap -> video detail/player.

### SIA Filtering Note
- **Purpose**: Explain recommendation logic.
- **Visual treatment**: rounded-lg royal-purple/10 note with sparkles icon.
- **Text**: "SIA filters videos by your active missions and recovery context."

### Search YouTube Button
- **Purpose**: Expand beyond curated in-app videos.
- **Visual treatment**: Full-width orange CTA with search icon.
- **Behavior**: Opens external YouTube search or in-app web view with current query.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Cards | #211008 | ink-brown-800 | Featured/list surfaces |
| Primary action | #FF5E00 | brand-orange | Play button, Search YouTube |
| SIA note | #7F24FF | royal-purple | Filtering explanation |
| Fitness accent | #EF4444 | fitness-red | Featured thumbnail context |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Orange is action/play. Purple is SIA explanation. Fitness red appears only in video context imagery/accent.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Search | Focused | Orange focus ring, keyboard opens |
| Featured play | Pressed | scale(0.94), glow-orange intensifies |
| Video row | Pressed | border brand-orange/25 |
| Video row | Watched | Duration muted, check icon appears |
| YouTube CTA | Loading | Spinner replaces search icon |
| Thumbnail | Loading | Shimmer block |

---

## Motion

- Featured video fades up after search bar.
- Video rows stagger by 70ms.
- Play button uses subtle pulse only when reduced motion is off.
- Video modal uses standard modal presentation.

---

## Empty, Loading, Error

- **No videos found**: Show "No matching videos" and keep Search YouTube CTA.
- **Video unavailable**: Player shows "Video not available" and returns to list.
- **Thumbnail failed**: Use icon tile fallback.
- **Network error**: Inline banner under search with retry.
- **Loading**: Search visible, featured skeleton, three video row skeletons.

---

## Accessibility

- Search input label: "Search coaching videos".
- Featured play button label: "Play featured video, Post-run mobility, 8 minutes".
- Video rows announce title, recommendation reason, and duration.
- SIA filtering note is readable text, not tooltip-only.
- Video player supports captions where source provides them.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/videos/page.tsx`.
- Related video surfaces appear in Workout Detail [27], Yoga Sessions [55], and Exercise Library [70].
- YouTube search should preserve privacy by using query terms, not raw private journal text.
- No runtime route/API changes are required.
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/videos`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B18-F07 | critical | retention | Build search/filter state, video player modal/fullscreen, row selection, watched/error states, and YouTube handoff with current query. |
| B18-F08 | major | accessibility | Replace the static search surface with a labeled input, clear button, live results/no-results state, and accessible result counts. |
| B18-F09 | major | trust-privacy | Show the outgoing query, strip private health/journal details by default, and confirm external handoff before opening YouTube. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

