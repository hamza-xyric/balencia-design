# 80-music-coach - hi-fi glass spec

### 1. Header
- **ID:** 80
- **Name:** Music coach
- **Route(s) covered:** /soundscape
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Wellbeing / Me-adjacent utility.
- **Source:** app_design 3/80-music-coach.md plus ascii_wireframes/80-music-coach.md; live app names this area Pulse.
- **Batch:** 17

### 2. Purpose
Music coach recommends soundscapes and Spotify playlists that support current activity, recovery, focus, and mood. It treats music as a coaching signal without pretending to own the provider: recommendations are source-labeled, demo states are clearly marked, and CIA explains why a track matches the user's moment.

### 3. Entry & exit
- **Entry:** Pulse nav item, CIA recommendation, Fitness [26], Stress Management [52], Explore [18], or Me Main [17].
- **Primary exit:** play, pause, skip, or select a playlist row.
- **Connection exit:** Connect Spotify starts OAuth and can return through Data Sources [84].
- **Management exit:** connected state relabels CTA to "Manage Spotify" and opens connected-service controls.
- **Failure exit:** cached playlists stay visible with SyncStatus when provider calls fail.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with back and "Music coach."
2. Player Hero Card with art tile, "Now playing", Tempo run focus, scrubber, and controls.
3. Context pills: CIA matched, Workout ready, provider/source.
4. CIA rationale row with BPM and activity evidence.
5. Recommended playlists stack.
6. Sticky Connect Spotify / Manage Spotify CTA above GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <        Music coach                 |
+--------------------------------------+
| +----------------------------------+ |
| | NOW PLAYING                      | |
| | [art] Tempo run focus            | |
| |       CIA matched to pace window | |
| | playback [############------]62% | |
| | 1:58 ---------------------- 3:12 | |
| |          pause        next       | |
| +----------------------------------+ |
| [CIA matched] [Workout ready] [via Spotify] |
| CIA: 154-158 BPM fits your tempo run. |
| RECOMMENDED PLAYLISTS               |
| +----------------------------------+ |
| | Tempo run focus        156 BPM > | |
| | Spotify · fitness/career         | |
| | Deep work pulse       low lyric >| |
| | Evening downshift  breath-led  > | |
| +----------------------------------+ |
|                                      |
+--------------------------------------+
| [headphones] Connect Spotify         |
+--------------------------------------+
| Today | CIA | Goals | Me             |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back to origin and title.
- **GlassCard** - Player Hero Card; the only glowing surface.
- **MomentumBar** - continuous playback scrubber with waveform texture.
- **BtnSecondary** - pause and next controls, 44px minimum.
- **ChipProvenance** - `via Spotify`, `demo`, `cached`, or `you selected`.
- **ChipDomainTag** - fitness, career, wellbeing identity marks on rows.
- **CIAInsightCard** - rationale sheet explaining the match.
- **ConsentCard** - Spotify OAuth scope, retention, revoke, and disconnect.
- **OfflineBanner / SyncStatus / SkeletonState / ErrorState / HonestNullState** - provider states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with warm radial glow and soft grain.
- **Hero:** player uses GlassCard with `#211008` depth, art tile tint, and one orange playback glow.
- **Semantic glows:** playback scrubber uses `--glow-you #FF5E00` because it reflects active listening; completed connection toast uses `--glow-done #34A853`; rationale uses `--glow-cia #7F24FF`.
- **Color discipline:** orange for playback and CTA, green for ready/connected, purple for CIA match, domain colors only inside chips.
- **Type:** Neue Montreal; one Tiempos italic word in the rationale, such as "your *pace* window."

### 7. Content & copy
- **Hero eyebrow:** "Now playing."
- **Hero title:** "Tempo run focus."
- **Hero note:** "CIA matched to your planned pace window."
- **Rationale:** "154-158 BPM fits your 156 BPM tempo run."
- **Playlist rows:** "Tempo run focus", "Deep work pulse", "Evening downshift."
- **CTA:** "Connect Spotify"; connected state "Manage Spotify"; expired state "Refresh Spotify."
- **Demo label:** "CIA demo - connect Spotify for your library."
- **Success toast:** "Spotify connected. Ready to coach your music."

### 8. Data & honesty states
- **Playback:** real = current provider track plus ChipProvenance; low-confidence = cached or delayed progress; honest-null = demo player at 0 percent with no fake listening progress.
- **Recommendations:** real = Spotify/library/activity match; low-confidence = starter playlist labeled "estimated · low confidence"; honest-null = "CIA is still learning your taste."
- **BPM match:** real = playlist tempo plus activity pace evidence; low-confidence = range only; honest-null = hide BPM claim.
- **Provider state:** real = connected and fresh; low-confidence = token near expiry or cached; honest-null = no Spotify connection with ConsentCard CTA.
- **Data controls:** OAuth sheet names scope, retention, revoke, disconnect, and delete provider cache.

### 9. All states
- **Default:** player, context chips, rationale, playlists, and CTA render with real or demo-labeled data.
- **Skeleton:** hero art, title, scrubber, controls, chips, and three playlist rows shimmer in final geometry.
- **Empty:** connected but no activity shows "CIA is still learning your taste" and starter Focus, Workout, Wind-down rows.
- **Error:** provider failure keeps last cached now-playing and shows retry or Refresh Spotify.
- **Success:** OAuth return shows green toast and CTA becomes Manage Spotify.
- **Disabled:** playback buttons dim when provider playback is unavailable; CTA dims offline with reason text.

### 10. Motion & interaction
- **Load:** player card fades in, scrubber draws to position, rows fade up in a short stagger.
- **Playback:** pause/play toggles icon and label; next crossfades the title, art, and scrubber.
- **Playlist tap:** row becomes selected, player content changes in 220ms, and provenance updates.
- **Rationale:** tapping CIA matched opens a half Sheet with signal sources and consent note.
- **OAuth:** ConsentCard opens before provider redirect; return triggers Success toast.
- **Reduced-motion:** scrubber and rows appear at final state; no shimmer movement or crossfade.

### 11. Motivation-tier adaptation
- **Low:** player, one rationale sentence, and Connect Spotify; playlist list collapses to three plain rows.
- **Medium:** default player, chips, rationale, and playlist stack.
- **High:** show BPM range, provider freshness, activity signal chips, and cached/offline details.

### 12. Accessibility
- **Contrast:** text on `#0A0A0F` and `#211008` meets AA+; colored chips include labels.
- **Targets:** back, play, pause, next, playlist rows, chips, and CTA are at least 44px.
- **Screen readers:** scrubber announces playlist title, percent, elapsed, duration, provider, and confidence.
- **Data control:** Spotify consent, revoke, disconnect, and delete cache are reachable from CTA and Data Sources [84].
- **Privacy:** music signals never appear in social screens unless explicitly shared.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** music links activity, mood, recovery, focus, and CIA rationale.
2. **Honest:** provider, demo, cached, and low-confidence states are labeled.
3. **Premium:** single player hero, quiet playlist rows, sticky CTA.
4. **Warm-dark:** canon glass and background used.
5. **Semantic glow:** playback, connection success, and CIA match glow meanings stated.
6. **60/30/10:** orange playback/action, green ready/success, purple CIA only.
7. **Type:** Neue Montreal plus one Tiempos italic rationale word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high density specified.
10. **Accessibility:** 44px targets, labels, contrast, and reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined for provider data.
12. **Catalog:** canon component names used.
13. **CIA voice:** recommendations are specific, sourced, and never horoscope-like.
