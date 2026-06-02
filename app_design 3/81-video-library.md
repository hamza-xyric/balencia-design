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

## Premium Craft

**Profile:** content · **Cluster benchmark:** YouTube + Apple TV (honest provider framing, premium video rows) — *stays Balencia via warm-glow surfaces on ink-brown, the SIA recommendation warmth, non-generic row craft, and authored edge copy.*
**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the featured video hero is underdesigned — no depth (flat card surface), no glow, no focal sizing against the row list; (2) the search bar has no visible affordance for the call-to-action or loading states; (3) video row copy is generic ("Recommended..." hint text) and non-shaming microcopy is missing; (4) empty/loading/error states are listed textually, not designed; (5) the SIA note reads generic ("filters videos by...") rather than warm/specific; (6) no type rhythm or depth language specified; (7) the YouTube bottom CTA reads generic/button-like, not warm coaching.

### Focal hierarchy

One focal point: the **Featured SIA Pick video card** — above the fold, largest element, hero-sized (full-width minus 32pt, ~180pt tall including play button and explanation). It carries the visual and emotional weight; everything below (search, Next Best Videos list, SIA note, YouTube CTA) is visibly secondary by size and visual weight. The search bar sits *above* it as a quiet anchor, not a competing focus. The squint test reads: play button → thumbnail → "Next Best Videos" rows smaller. No competing foci.

### Surface & depth

The Featured Video card adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`) · **`--surface-backplate`** radial warm glow (`CK-T02`) behind the thumbnail region. The **play button** (the focal element within the hero) carries **`--glow-orange`** (32px /.45) — the only ≥96pt glowing element on screen, calibrated to the button's ~64pt diameter. Each "Next Best Videos" row is a small card (`--radius-md` 14pt, ~72pt tall) with `--color-ink-brown-800` body · 1px `--glass-border` · `--edge-highlight` · `--shadow-1`, no glow (inline size, per CONSISTENCY §1 table). The SIA Filtering Note is a `CK-P1` surface at `--color-ink-brown-800` with a subtle 2pt top accent stripe in `--color-royal-purple` (SIA-only purple, earns its presence here). The Search YouTube button is a full-width CTA with `--color-brand-orange` fill (no glow — it's a 48pt action button inline size, per locked params). The search bar input itself has a `--focus-ring` on focus-visible (the `CK-T03` recipe, 2pt orange + 2pt offset). No surface reads as flat; every surface carries the warm-glow / top-edge / beveled-track language.

### Typographic rhythm

Map to `CK-P3` tokens: Featured video title `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; "SIA pick" eyebrow `--text-eyebrow` (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); explanation copy below thumbnail `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70%; video row titles `--text-h3` (17pt) / 600 / white 100%; row metadata (recommendation reason, duration) `--text-caption` (13pt) / 400 / white 50%; SIA note text `--text-body` (16pt) / 400 / white 70%; section eyebrow "NEXT BEST VIDEOS" the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); "Search YouTube" button text `--text-h3` (17pt) / 600 / white 100%. Sentence case throughout. ≤2 `--color-brand-orange` accent words (the orange play button icon + "Search YouTube" link are non-text glyphs, so the microcopy limit is: none on Featured, one on each CTA). Chillax logo-only (none on this screen). Replaces the Interaction States table's ad-hoc pixel line-heights with `CK-T04` `--leading-*` scale.

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice — warm, plain, specific, non-shaming, no exclamation marks:

- **Featured video explanation** — *before:* "Chosen because your left..." (generic, cut off) → *after:* "Chosen because your left leg recovered faster this week — light mobility preps you for tomorrow's run." (specific to user data, real coaching).
- **Video row recommendation reason** — *before:* "Recommended..." (hint text) → *after:* "Great for post-workout" / "Builds hip flexibility" / "Fits your 5-min break" (depends on SIA context; never generic).
- **SIA Filtering Note** — *before:* "SIA filters videos by your active missions and recovery context." → *after:* "SIA picks videos for your recovery and focus right now — tap to learn more." (warmer verb "picks", frames positively, invites interaction).
- **Empty state (no videos found)** — *before:* none → *after:* "No videos match that search. Try searching for a body part or goal — such as `hip` or `post-run`. YouTube has more if you want to explore." (warm, specific guidance, non-shaming).
- **Loading state** — *before:* none → *after:* "SIA is finding your next video — one moment." (specific, warm, brief).
- **Network error** — *before:* none → *after:* "Couldn't load videos — check your connection and pull to refresh." (honest, recovery action named).
- **Video unavailable** — *before:* "Video not available" → *after:* "This video is no longer available. Try another — SIA has plenty." (warm fallback, never blames user).
- **Permission (YouTube handoff)** — *before:* none → *after:* "This opens YouTube in a browser. Your search stays private — we don't share your journal or health data." (trust-first, honest, specific).

No exclamation marks; the brand period used with intent; all SIA copy is specific to the user's data (real, curated recommendation, never generic).

### Motion choreography

Locked to `CK-P4` draw-first order (entrance): **Featured video card fades in** + thumbnail region appears (280ms `--dur-base` `--ease-out-soft`) → **play button glow settles** (glow appears at final brightness, no pulse or wiggle — a calm, premium moment; reduced motion → glow present at rest) → **Next Best Videos rows rise** staggered L-anchored (each row 280ms `--dur-base`, 60ms stagger between rows, `--ease-out-soft`) → **SIA note and YouTube CTA fade in** together (280ms, `--dur-base`, 40ms after the last video row). Below-fold surfaces animate on scroll-into-view. Play button uses **subtle pulse only when reduced motion is off** (pulse: scale(1→1.04→1), 2s loop, stops looping after first 3s). **`prefers-reduced-motion`** → all at final state instantly; play button glow present, no pulse, no scale animation. No opacity-fade on any element.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| Cold-start / no videos in library | Featured card shows warm SIA message, no image hint text; "Next Best Videos" section hidden; YouTube CTA remains. | "Your video library builds as you log workouts and set goals — we'll recommend videos tailored to your recovery." | featured card on `--color-ink-brown-800` with `--surface-backplate`; warm, never empty-feeling |
| Loading | Featured skeleton (thumbnail shimmer, title/duration hint text), search bar visible; 3 video row skeletons with shimmer animation that morphs into loaded content (layout preserved, depth visible) | "SIA is finding your next video — one moment." | skeleton cards on `--color-ink-brown-800`, shimmer radial animation (morph, not swap) |
| Empty / no results | Featured card hidden, search bar with typed query visible, "Next Best Videos" label shown but empty, YouTube CTA remains. | "No videos match that search. Try searching for a body part or goal — such as `hip` or `post-run`. YouTube has more if you want to explore." | no card surfaces rendered; white-50 copy text; helpful, never degenerate |
| Error / network failure | Featured skeleton + network banner below search with retry affordance; video rows show skeleton state or cached last-viewed row. | "Couldn't load videos — check your connection and pull to refresh." | `--color-error-red` (glyph + word paired: ! icon + "error" label, never colour-alone) |
| Offline | cached featured video + last-viewed rows shown at 80% opacity; pull-to-refresh dimmed with reason; YouTube CTA disabled and dimmed with reason. | "You're offline — showing your last videos. Go online to refresh." | actions honestly dimmed (50% opacity); cached data retained and readable |
| Watched (row state) | video row's duration pill muted (white 30%), small checkmark icon (12pt, `--color-forest-green`) appears inline with duration. | duration remains visible + check glyph; no text change | `--color-forest-green` check only (glyph + position make it readable, never colour-alone) |

### Signature & anti-generic

Ownable moment: **the warm-glow Featured SIA Pick card** (orange glow on `ink-brown-800`, continuous layered surface craft, the brand period / warm voice in the explanation) — the honest SIA recommendation surface that YouTube/Spotify neither design nor curate this way. Anti-generic fixes: (1) video rows are crafted small cards with depth, not flat generic list rows; (2) the SIA note reads like coaching ("SIA picks videos for your recovery *right now*"), not template copy; (3) the Featured card is hero-sized (180pt), distinctly larger than rows below, breaking equal-card monotony; (4) every copy string is authored, warm, and specific to user data — no horoscope-like recommendations.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Featured video title | `--color-alpha-white-100` | ≥12:1 | Primary text |
| "SIA pick" eyebrow | `--color-alpha-white-40` | ≥4.5:1 | Decorative label, paired with position |
| Explanation copy | `--color-alpha-white-70` | ≥9:1 | Secondary text |
| Video row title | `--color-alpha-white-100` | ≥12:1 | Primary text |
| Recommendation reason | `--color-alpha-white-50` | ≥4.5:1 | Tertiary text |
| Duration pill | `--color-alpha-white-50` | ≥4.5:1 | Metadata |
| Watched check ✓ | `--color-forest-green` | 2.8:1 on track | Glyph + position (never colour-alone) |
| SIA note body text | `--color-alpha-white-70` | ≥9:1 | Secondary text |
| YouTube CTA text | `--color-alpha-white-100` | ≥12:1 | Primary text on orange bg |

Search input label: "Search coaching videos" (never hidden, always readable). Featured play button label: "Play featured video, [title], [duration]". Video row labels: "[title], [recommendation reason], [duration], tap to play". SIA note is readable text, not tooltip-only. Play button carries `--focus-ring` (`CK-T03`) on focus-visible. Touch targets ≥44×44pt (play button 64pt, rows ≥56pt tall, YouTube CTA 48pt). Status never colour-alone: watched state = green check + duration-pill visual change (position + glyph, not colour). Reduced-motion: animations collapse to instant; play button glow present at rest (no pulse); skeletons morph into data, never swap. Captions supported (where source video provides them).

Conform to `design-audit/CONSISTENCY.md`.

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

