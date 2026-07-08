# 80 Music coach - A+++ hi-fi mobile spec

## Header
- **Source ID:** 80
- **Source spec:** `Balencia-New-Screens/screens/80-music-coach.md`
- **Evidence:** `app_design 3/80-music-coach.md`, `ascii_wireframes/80-music-coach.md`
- **Route:** `/soundscape`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** live app names this area Pulse; source route maps to `/soundscape`.
- **Premium Visual Director:** keep it minimal; the player hero is the focus, not a health dashboard.
- **Interaction and State Designer:** player states, provider connection, demo mode, cached/offline, and OAuth return need authored UI.
- **Trust and Safety Reviewer:** Spotify or music-provider data needs scope, retention, disconnect, delete cache, and no social sharing by default.
- **GLM directions considered:** cinematic media player, coaching playlist list, provider setup flow. **Chosen:** provider-honest player hero.

## Final Composition

```text
+--------------------------------------+
| <        Music coach                 |
|                                      |
| +----------------------------------+ |
| | NOW PLAYING                      | |
| | [art]  Tempo run focus           | |
| |        CIA matched to your       | |
| |        planned *pace* window     | |
| |                                  | |
| | waveform [#############------]62 | |
| | 1:58                       3:12  | |
| |        pause        next         | |
| +----------------------------------+ |
| [CIA matched] [Workout ready]       |
| [via Spotify] [cached 2m ago]       |
| Uses: workout on · mood off         |
| CIA: 154-158 BPM fits today's run.  |
|                                      |
| RECOMMENDED PLAYLISTS               |
| Tempo run focus       156 BPM       |
| Deep work pulse       low lyric     |
| Evening downshift     breath-led    |
|                                      |
| [headphones] Connect Spotify        |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** Player Hero Card with playlist art and continuous waveform scrubber.
- **Secondary:** context chips and CIA rationale line.
- **Tertiary:** playlist rows.
- **Persistent:** Connect/Manage/Refresh provider CTA.

## Visual System
- Player hero is the only glowing surface; orange `--glow-you` for active listening.
- CIA matched chip uses purple; connected/success state uses green.
- Playlist rows are solid semantic buttons, no glow.
- Neue Montreal; Tiempos italic word: "*pace*".

## Components
- `TopBar`, `GlassCard.hero`, `MomentumBar`, `BtnSecondary`, `ChipProvenance`, `ChipDomainTag`, `CIAInsightCard`, `ConsentCard`, `Sheet`, `OfflineBanner`, `SyncStatus`.
- `NEW: WaveformMomentumBar` - same continuous progress primitive with subtle waveform texture.

## Data Honesty
- Playback: provider track or demo-labeled track; cached progress is labeled.
- Recommendations: Spotify/library/activity match; low-confidence starter rows label "estimated · low confidence."
- BPM claim: hidden unless playlist tempo and activity pace source exist.
- Provider state: connected, expired, cached, demo, no connection.

## Consent and Safety
- OAuth sheet names scopes, sync frequency, retention, revoke, disconnect, export, and delete provider cache.
- Recommendation settings expose per-signal toggles for mood, recovery, workout, listening history, and calendar context.
- Copy states: "Listening history is not shared with Spotify beyond what the provider requires to play and manage your library."
- Listening history is not shared to social surfaces unless the user explicitly attaches it.
- Provider chips open Manage devices/Data Sources.

## States
- **Default:** player, chips, rationale, playlist rows, CTA.
- **Cold-start:** "CIA demo" eyebrow, 0 percent scrubber, no implied live Spotify sync.
- **Skeleton:** player art, title, scrubber, chips, rows.
- **Empty connected:** "CIA is still learning your taste" plus starter rows.
- **Error:** last cached player remains, CTA changes to Refresh or Try again.
- **Offline:** cached playlists shown; provider actions dim with reason.
- **Disabled:** playback, provider refresh, recommendation toggles, export, disconnect, and social attach controls dim to 40% with reason copy when the provider token is expired, offline, consent-revoked, or parental/workplace restrictions block playback.

## Implementation Readiness
- **Real data:** track, provider, playback progress, playlist BPM, and match reason render only from the connected provider, local library, or explicitly labeled demo mode; chips show freshness and cache age.
- **Low-confidence:** recommendation rows label `estimated - low confidence` when CIA has activity context but no confirmed listening-history match; BPM-fit copy is hidden until both tempo and activity pace exist.
- **Honest-null:** no provider, no library, no playable track, no workout context, or no consent shows a designed setup/empty state such as `Connect a music provider` or `Not enough listening data yet`; no fabricated playlist art or BPM.
- **44px and screen readers:** back, play/pause, next, scrubber, provider CTA, recommendation rows, and context toggles maintain 44px targets; screen-reader labels include track title, provider, playback state, progress time, cache age, and whether the recommendation used mood, recovery, workout, or calendar signals.
- **Controls and consent:** OAuth/data sheet exposes export listening data, revoke signal categories, disconnect provider, delete provider cache, delete CIA music history, and disable social sharing. Photo/voice are not collected here; any future voice command or social music proof requires an explicit consent state before attach/share.

## Motion
- Player card fades in; scrubber draws to current position.
- Playlist tap crossfades art/title/provenance.
- OAuth return shows green success toast.
- Reduced motion disables scrubber draw and row stagger.

## Image Slots
- `HIFI-80-01` abstract playlist art tile.

## Implementation Notes
- Route stays `/soundscape`.
- UI may use "Pulse" as product label only if confirmed by product copy; route header remains `/soundscape`.
