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

