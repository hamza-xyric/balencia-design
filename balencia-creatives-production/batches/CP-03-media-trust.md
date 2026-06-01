# CP-03 — Media and trust surfaces

- Status: `not started`
- Package: `media-content`
- Session cap: 6 asset briefs
- Prototype URL: `http://localhost:3000`
- Registry filter: `production_batch = CP-03`

## Screens in scope

| ID | Screen | Route | Priority |
| --- | --- | --- | --- |
| 49 | Progress photos | `/tabs/me/progress-photos` | P0 |
| 67 | Image viewer | `/features/image-viewer` | P0 |
| 80 | Music coach | `/features/music` | P0 |
| 81 | Video library | `/features/videos` | P0 |

## Decision gates

- [x] **CQ02** resolved: private by default, encrypted, no V1 share, premium opt-in analysis, provenance/delete states
- [x] **CQ05** resolved: Music/Video use honest **demo** artwork (no implied live Spotify/YouTube sync)
- [x] **CQ03** resolved: best asset wins by surface; progress photo/viewer trust assets use real/licensed/owned or non-identifiable demo fixtures

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-49-thumbnails | 49 | `/tabs/me/progress-photos` | photo | not_started |
| CRE-49-privacy-states | 49 | `/tabs/me/progress-photos` | illustration | not_started |
| CRE-67-viewer-media | 67 | `/features/image-viewer` | photo | not_started |
| CRE-67-no-share | 67 | `/features/image-viewer` | illustration | not_started |
| CRE-80-album-art-demo | 80 | `/features/music` | thumbnail | not_started |
| CRE-81-video-posters-demo | 81 | `/features/videos` | video-poster | not_started |

## Session summary

- Accepted:
- Iterate:
- Deferred:
- Credit preflight (session total):

## Brief notes

_Add per-brief sections when the session starts._

## Completion gate

- [x] Privacy gates documented (CQ02): no share affordance for progress photos in V1
- [x] Source policy documented (CQ03): no generated body/progress-photo identity assets for trust surfaces
- [ ] Demo states labeled for music/video (CQ05)
- [ ] All worked briefs have QA and decisions
- [ ] Status → `session-closed`
