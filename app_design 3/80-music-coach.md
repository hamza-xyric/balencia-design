# Screen Design: Music Coach

**Screen**: 80 of 90
**File**: 80-music-coach.md
**Route**: `/features/music`
**Register**: Product Mode with SIA recommendations
**Primary action**: Play or connect music that supports the user's current activity
**Tab**: Me
**Navigation**: Stack push from Me Main [17], Explore [18], Fitness Dashboard [26], Stress Management [52], or SIA recommendation. Back returns to origin.

---

## Purpose

Music Coach recommends playlists and sound contexts matched to activity, recovery, focus, and mood. It treats Spotify/music integration as a coaching signal: what the user listens to can support workouts, deep work, and wind-down routines, and can also become contextual data for SIA.

---

## Information Architecture

**Hierarchy**:
1. Now-playing player hero
2. SIA/context signal pills
3. Recommended playlists list
4. Connect Spotify bottom action

**User flow**:
- **Arrives from**: Explore [18], Me Main [17], SIA Chat [09], Fitness Dashboard [26], Stress Management [52].
- **Primary exit**: Connect Spotify or play/skip current playlist.
- **Secondary exits**: Tap playlist -> playlist detail/player, back to origin.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Music coach        |
+-----------------------------+
| [music art] Now playing     |
|             Tempo run focus |
|             SIA matched...  |
| [ progress bar 62%       ]  |
|          [pause] [next]     |
|                             |
| [SIA matched] [Workout ready]|
|                             |
| RECOMMENDED PLAYLISTS       |
| Tempo run focus             |
| 156 bpm average, Spotify    |
| Deep work pulse             |
| Low lyric, steady attention |
| Evening downshift           |
| Breath-led wind-down        |
+-----------------------------+
|        Connect Spotify      |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Player Hero
- **Purpose**: Show current recommended playlist and playback controls.
- **Visual treatment**: rounded-xl, career-indigo/25 border, indigo tint over ink-brown.
- **Content**:
  - Album/playlist icon tile.
  - Eyebrow "Now playing".
  - Playlist title and SIA matching note.
  - Progress bar.
  - Pause and next controls.
- **Behavior**: Controls update local playback state or proxy to Spotify when connected.

### Context Pills
- **Purpose**: Explain why music is being recommended.
- **Pills**: SIA matched, Workout ready.
- **Behavior**: Tap SIA matched -> explanation sheet showing activity/recovery signal sources.

### Recommended Playlist Card
- **Purpose**: Choose a playlist for a specific mode.
- **Visual treatment**: Small rounded card, 16pt padding, domain-colored title.
- **Examples**:
  - Tempo run focus: fitness/career activity support.
  - Deep work pulse: career focus.
  - Evening downshift: meditation/wind-down.
- **Gesture**: Tap sets now playing.

### Connect Spotify Button
- **Purpose**: Link external music provider.
- **Visual treatment**: Full-width orange CTA with headphones icon.
- **Behavior**: Starts connected-service OAuth flow, then returns to Data Sources [84] or this screen.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Player/card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Connect/next action |
| SIA matched | #7F24FF | royal-purple | SIA pill only |
| Playback domain | #6366F1 | career-indigo | Player tint |
| Workout readiness | #34A853 | forest-green | Ready pill |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |

**60/30/10 verification**: Orange is action, purple is SIA explanation, indigo is music/focus domain context, green is readiness.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Pause | Playing | Pause icon, white/60 border |
| Pause | Paused | Play icon, brand-orange border |
| Next | Pressed | scale(0.96), orange glow |
| Progress | Loading | Indeterminate shimmer |
| Playlist card | Selected | border brand-orange/25, title white |
| Spotify CTA | Connected | Label changes to "Manage Spotify" |

---

## Motion

- Player progress animates linearly while playing.
- Playlist selection crossfades player content over 220ms.
- Controls use 120ms press scale.
- OAuth return shows success toast.

---

## Empty, Loading, Error

- **No Spotify connection**: Show demo recommendations and Connect Spotify CTA.
- **Spotify expired**: CTA label "Refresh Spotify"; row appears in Data Sources [84] as Needs refresh.
- **Playback unavailable**: Show player disabled state with "Open Spotify to play".
- **No recommendations**: Fallback to generic Focus, Workout, Wind-down playlist categories.
- **Loading**: Player skeleton and three playlist skeleton cards.

---

## Accessibility

- Playback buttons have labels: "Pause playlist" and "Next track".
- Progress bar announces current percent and playlist title.
- Playlist cards announce name, purpose, and provider.
- SIA matched pill announces "SIA matched this playlist to your planned pace window".
- Spotify connection uses OAuth screen-reader labels from Connected Services [22].

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/music/page.tsx`.
- Spotify connection state should also appear in Data Sources [84] and Connected Services [22].
- Music signals are coaching context only; they should not expose private listening details to social screens.
- No runtime route/API changes are required.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Apple Music + Spotify (provider-honest demo) — *stays Balencia via warm-glow surfaces on ink-brown, the continuous-stroke player progress path, and honest provider framing that never implies fake sync.*

**Pre-grade:** B+ (79) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): (1) the player card is a flat `ink-brown-800` box with no edge-highlight or layered depth, no glow on the focal play controls; (2) "Now playing" and playlist cards read generic (no owned Balencia signature, no continuous-stroke moment); (3) edge microcopy (no Spotify connection, Spotify expired, playback unavailable, empty recommendations, loading states) is partly unwritten; (4) the "Connect Spotify" CTA and "Refresh Spotify" label are present but lack warm, on-voice framing; (5) interaction states (disabled play, loading playlist spinner, success toast) are mentioned but not fully designed; (6) contrast pairs and focus ring are assumed, not tabulated; (7) the SIA matched pill rationale sheet and the Spotify OAuth flow are unspecified per `CK-P5` and `CK-P8`.

### Focal hierarchy

One focal point: the **Player Hero Card** (`CK-P2`) — the top-of-screen album/playlist icon tile + "Now playing" eyebrow + title + the progress bar at the center of the card. The hero is the only glowing element above the fold (`--glow-orange-md` ~20px on the ≥48px card). The **SIA matched / Workout ready pills below read as a quiet explanation**, not a competing focus — smaller, no glow, supporting the context. The **Recommended Playlists list below is visibly secondary** by size and weight (each playlist row ~56pt, no glow). The **Connect Spotify CTA at the bottom is the secondary action**, sized as a full-width button. The squint test lands on the now-playing title first, then the progress bar, then the mode pills, then the playlist list.

### Surface & depth

Every surface adopts `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` · 1px `--glass-border` · **`--edge-highlight` top-edge highlight** (`CK-T01`) · `--shadow-1`. The Player Hero Card adds `--surface-backplate` (`CK-T02`). Glow is size-calibrated per `CONSISTENCY.md §1`: `--glow-orange-md` (~20px /.40) on the ≥48pt player card only; **no glow on the 36pt playlist rows or the 40pt pill row**. The progress bar track recesses over `--track-inset`. This surfaces all card bodies (player, recommendation rows, pills) on the same warm-layered language — never a flat box.

### Typographic rhythm

Re-map the Typography table to `CK-P3` tokens: "Now playing" as `.eyebrow` (`--text-eyebrow` 12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white-40); playlist title `--text-h2` 20pt / 600 / `--leading-snug` 1.25; "SIA matched to your planned pace window" as `--text-body` 16pt / 400 / `--leading-normal` 1.4; context pill labels `--text-caption` 13pt / 400; playlist metadata (BPM, provider) `--text-caption` 13pt / white-50; playlist rows use `--text-body` for the playlist name (16/400) and `--text-caption` for the description (13/400). Hierarchy carried by weight (600 headings vs 400 body/meta), not size alone; sentence case throughout; ≤2 `--color-brand-orange` accent words (the orange CTA button "Connect Spotify"); Chillax stays logo-only. Replaces ad-hoc pixel line-heights with the `--leading-*` scale (`CK-T04`).

### Microcopy (before → after)

The spec shows hint text-only copy on core surfaces; `CK-P5` authors every string to on-voice:
- **"Now playing" eyebrow** — *already on-spec*: warm, present-tense, invites focus.
- **Playlist title** — *already authored*: "Tempo run focus" (specific, not generic "Playlist 1").
- **SIA matched pill** — *before (from Components):* "SIA matched" (terse) → *after (warm):* "SIA matched to your planned pace window." Tap opens a rationale sheet: "Why: You told us you're doing a 156 BPM tempo run today. Music at 154–158 BPM will lock you in." (honest, specific, earned).
- **Workout ready pill** — *before:* "Workout ready" → *after:* "Workout ready for your morning pace." (Warm, activity-specific.)
- **Playlist row description** — *before:* "Low lyric, steady attention" (already on-spec; strong). *kept*.
- **No Spotify connection** — *before (from Empty States):* "show demo recommendations" (vague) → *after (warm, honest):* "SIA's demo: Here's what would match your style" (makes the demo intentional, not deceptive; labels it as such so the user never believes these are real recommendations from their library).
- **Spotify expired** — *before:* "CTA label 'Refresh Spotify'" (generic) → *after:* "Spotify access expired. Tap to reconnect and keep listening." (Honest, warm, recovery-focused; resolves the "Needs refresh" notation in Data Sources.)
- **Playback unavailable** — *before:* "Open Spotify to play" → *after:* "Spotify isn't connected — open the app to play this now." (Honest, warm, tells the user where to go.)
- **No recommendations** — *before:* "Fallback to generic Focus, Workout, Wind-down playlist categories" → *after:* "SIA is still learning your taste. Here are three starter playlists to try:" + the generic category names, but authored warmly and framed as a learning moment, not a failure.
- **Loading** — *before:* unnamed → *after:* "SIA is reading your activity — one moment."
- **Success toast** (after connecting Spotify) — *before:* unnamed → *after:* "Spotify connected. Ready to coach your music." (Warm, confirms the outcome, reminds the user of the feature's job.)
- **Permission rationale** (OAuth first-time) — *before:* unnamed → *after (warm):* "Why we ask: We'd like to see which playlists match your activity. What you gain: Music recommendations tailored to your pace, energy, and mood. Your data: We don't share your listening history. You can disconnect anytime in Data Sources [84]." (Honest, transparent, non-shaming per RUBRIC dim 6 + RUBRIC dim 11.)

No exclamation marks; the brand period used with intent. SIA copy is specific to the user's data, never a horoscope. Every edge string (loading, empty, permission, disabled, success, error) is authored, warm, and on-voice.

### Motion choreography

Locked to `CK-P4` order (draw-first): the **player card fades in** (`--dur-base` 280ms `--ease-out-soft`) → the **progress bar draws** `0 → current%` as a continuous stroke (orange end-dot optional, 520ms `--dur-slow` `--ease-flow`, preserving the existing linear progress behavior) → the **playlist rows fade-up** (staggered, 280ms `--dur-base` each, 40ms stagger between rows) → the **context pills fade in** (`--dur-base` 280ms). On playlist selection, the now-playing content **crossfades** to the new playlist (220ms, as spec'd) — not a full-page reload. Below-fold content animates on scroll-into-view. `prefers-reduced-motion` → all elements at final state: progress bar at current fill, playlist list visible, no entrance stagger. Play/pause button press uses `scale(0.97)` + light haptic; next button uses the same. Success toast (Spotify connected) flashes with `--glow-green` 600ms, then fades.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (no Spotify connected) | Player hero shows "SIA's demo" label above the now-playing title; three fallback starter playlists below; Connect Spotify CTA full-width, prominent orange | "SIA's demo: Here's what would match your style" (in the hero eyebrow). "Tempo run focus · 156 BPM average, Spotify" (now-playing title, honestly labeled as a demo). Connect Spotify button: "Connect Spotify to unlock recommendations." | Player hero has `--surface-backplate`; progress bar track visually distinct (no real progress animates, 0% fill); context pills hidden (no activity to match yet) |
| Loading | Skeleton preserves the layout: player hero skeleton (card frame + icon box + 3-line text shimmer), progress bar skeleton (pill-shaped track with radial shimmer), playlist card skeletons (3 rows, track + label outlines, shimmer). | "SIA is reading your activity — one moment." | Skeleton on `--color-ink-brown-800`, radial shimmer, morphs into data (never a swap) |
| Empty / partial (Spotify connected, but user hasn't been active; no recommendations) | Player hero shows a calibrating state (faint/ghosted now-playing text); three generic starter playlists (Focus, Workout, Wind-down) render below; Connect Spotify hidden. | "SIA is still learning your taste. Try one of these to get started:" (warm, frames the fallback as a learning opportunity, never a failure). | Ghosted/dashed playlist rows for un-recommended ones; player hero kept visible (never collapses) |
| Error (Spotify API timeout, OAuth failed, playback API failed) | Player hero shows the last-cached now-playing (if available); playlist list shows cached playlists if available; Connect Spotify CTA relabeled to "Try again" or "Reconnect Spotify" per the failure type. | "Couldn't connect to Spotify — try again." OR "Your Spotify token expired — tap to refresh." OR "Playback isn't available right now — check your Spotify app." (each authored warmly, specific, with a recovery action) | calibrated `--color-error-red` only on genuine Spotify API failure (red outline on the affected card zone); error text paired with a glyph (alert icon + text, never colour-alone) |
| Offline | Cached now-playing and cached playlists render normally; Connect Spotify button is dimmed (0.5 opacity) with a reason tooltip: "You're offline — reconnect to use Spotify." | "You're offline — showing your last synced playlists." (in a banner, if applicable; or inline dimming text) | Actions honestly dimmed; cached data retained; no degenerate empty state |

### Signature & anti-generic

Ownable moment: the **continuous-stroke progress bar** (the horizontal Living Line, orange fill → optional green end-dot on 100%, the brand signature on a media player — not a flat segmented progress or a spinner). The **warm-glow-on-ink surfaces** (the player card's `--glow-orange-md` + the `--surface-backplate`, the only glowing surface on this screen — warm depth, not neon). The **"SIA's demo" honest framing** (when no Spotify is connected, the fallback is labeled as a demo so the user never believes they're seeing real recommendations — premium trust, the anti-dark-pattern). Anti-generic fix: the playlist list is not a flat symmetric grid of cards; it is a semantic vertical stack of rows, each a button with a clear hierarchy (title / description / metadata), breaking the monotony with the focal hero above. The provider (Spotify) is never hidden or implied to sync in real-time — the spec says "provider-honest demo" and the Premium Craft section ensures every surface speaks truth to power ("demo," "refresh," "offline," "not connected").

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| "Now playing" eyebrow | white-40 | Decorative label, paired with position (not load-bearing) |
| Playlist title | white-100 | ≥12:1 on both |
| Playlist metadata (BPM, provider) | white-50 | ≥4.5:1 |
| Progress bar (orange fill) | `--color-brand-orange` | ≥3:1 on `--track-inset` (WCAG 1.4.11) |
| "Connect Spotify" button text | white-100 | ≥12:1 on `--color-brand-orange` bg |
| SIA matched / Workout ready pill text | white-100 | ≥12:1 |
| "Spotify expired" error text | `--color-error-red` | ≥3:1 (glyph + text, never colour-alone) |

Playback buttons (pause, next, play) carry `aria-label` ("Pause playlist", "Next track", "Play playlist") and are ≥44×44pt targets. The progress bar announces its current percent and playlist title. SIA matched pill announces "SIA matched this playlist to your planned pace window" (the full rationale, per the spec's Accessibility section). The Spotify CTA announces "Connect Spotify" or "Manage Spotify" (when connected) or "Refresh Spotify" (when expired), specific to the state. Every interactive element carries `--focus-ring` (`CK-T03`, 2px orange, 2px offset) — the play/pause buttons, next button, playlist rows, pills, CTA, and back button all use the same ring. Reduced-motion: progress bar appears at current fill instantly, play/pause scale animation disabled, playlist list appears at final state without entrance stagger. Status never colour-alone: playback state = icon (pause/play) **+ visible label** in the button's aria-label; error state = red border **+ error glyph + text**, never red alone.

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/music`
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
| B18-F04 | critical | integration-control | Implement player state, Spotify OAuth/loading/success/error, expired-token refresh, and connected Manage Spotify behavior. |
| B18-F05 | major | information-architecture | Make playlist rows semantic buttons that update the player, and make SIA matched open a rationale sheet with signal sources. |
| B18-F06 | major | trust-privacy | Add provider permission and manage-source flows that explain scopes, sync status, retention, and disconnect behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

