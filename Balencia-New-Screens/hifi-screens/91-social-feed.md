# 91 Social feed - A+++ hi-fi mobile spec

## Header
- **Source ID:** 91
- **Source spec:** `Balencia-New-Screens/screens/91-social-feed.md`
- **Evidence:** `Archive/2026-07-06/features.md`, `Archive/2026-07-06/routes.csv`, `work/briefs/91.md`
- **Route:** `/feed`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** keep composer, filters, FeedPostCard stack, profile/group exits, and report/moderation.
- **Premium Visual Director:** make the first proof update the focal moment; the screen should feel like supportive proof, not an endless social feed.
- **Interaction and State Designer:** comment sheet, privacy selector, kudos toggle, cached/offline action queues are required.
- **Trust and Safety Reviewer:** every post needs report, mute, block, delete-if-own, privacy, and health/media consent.
- **GLM directions considered:** proof-first feed, pod-filter social hub, moderated community stream. **Chosen:** proof-first feed with moderation always close.

## Final Composition

```text
+--------------------------------------+
| Feed                       post filt |
| [All] [My pods] [Circles] [Partners] |
|                                      |
| +----------------------------------+ |
| | Share one *proof* update         | |
| | Visible to buddies               | |
| | [Discussion] [Question] [Win]    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: Aisha's run post matches   | |
| | your half-marathon mission.      | |
| | [Encourage] [Privacy settings]   | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Aisha Khan       12m      more   | |
| | Finished tempo run with Amira.   | |
| | [5.2 mi via wearable]            | |
| | [route proof image placeholder]  | |
| | Kudos 24  Comment 6  Views 83    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Malik R.        1h       more    | |
| | Budget streak reached 14 days.   | |
| | [goal update · you can inspect]  | |
| +----------------------------------+ |
|                            (+)       |
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

## Focal Hierarchy
- **Dominant focal moment:** privacy-aware composer plus first community proof post. The user sees audience and post type before the feed scroll begins.
- **CIA layer:** one supportive cross-link, never engagement pressure.
- **Feed stack:** `FeedPostCard` solid cards for readability.
- **Moderation layer:** "more" on every card opens report/mute/block/delete controls.

## Visual System
- Composer uses glass with orange `--glow-you` because posting is member action.
- Feed cards use `SolidCard` on `#211008`; long text stays legible.
- Successful kudos/comment uses green `--glow-done`.
- CIA suggestion uses purple `--glow-cia`.
- Neue Montreal; Tiempos italic word: "*proof*".

## Components
- `TopBar`, `SegmentedTabs`, `FeedPostCard`, `ChipProvenance`, `ChipDomainTag`, `CIAInsightCard`, `Sheet`, `AvatarStack`, `EmptyState`, `OfflineBanner`, `SkeletonState`.
- `NEW: ProofComposer` - compact privacy-first composer with proof type and audience before media attach.

## Data Honesty
- Posts: real author, timestamp, edited state, and provenance.
- Proof cards: `via wearable`, `goal update`, `you logged`, or `self-reported`.
- Low-confidence proof: muted `estimated - low confidence` label when source sync is stale, self-reported, or awaiting confirmation; it cannot drive CIA certainty copy or leaderboards.
- Honest-null proof: missing media/source renders `Proof removed`, `Source unavailable`, or `Not enough data yet` with the proof module hidden or replaced by `HonestNullState`, never a placeholder metric.
- Counts: server-confirmed count or "queued offline" optimistic state; no fake count.
- Moderation: queued report, reviewed, removed, or hidden labels.
- Post types: Discussion, Question, Tip, Success story, Challenge, Announcement; rich proof templates may be premium-gated.

## Consent and Safety
- Create flow requires a pre-post proof preview showing exact fields, source, audience, remove-proof action, edit visibility, and delete post before media or health proof is attached.
- Health proof, photos, voice/video, and CIA suggested posts include consent state, export proof data, revoke source access, remove proof, delete media/post, and report.
- More sheet includes Save, Copy link, Report, Mute, Block, Hide similar posts, Delete if own post, and completion states for each action.
- Harm language in posts exposes crisis resources quietly in the report sheet.

## States
- **Default:** filters, composer, CIA suggestion, two or more FeedPostCards.
- **Skeleton:** composer and posts shimmer in final card geometry.
- **Empty:** "No posts yet. Follow a pod or share a private proof update."
- **Error/offline:** cached feed remains; actions queue with clear status.
- **Success:** kudos toggles orange then settles; posted comment confirms green.
- **Disabled:** posting/commenting dims when moderation, privacy, connectivity, or entitlement blocks it.

## Implementation Readiness
- **Real data:** feed rows render only from server posts, local queued actions, or explicitly labeled cached feed state with author, audience, timestamp, edited/deleted/moderation status, and proof source.
- **44px and screen readers:** filter chips, composer type pills, privacy selector, post overflow, kudos, comment, share, report, mute, block, delete, media thumbnail, and FAB maintain 44px targets; screen-reader labels announce audience, proof source, consent state, queued/offline state, and moderation status.
- **Controls and consent:** post overflow and composer review expose export post/proof data, revoke attached health/photo/voice/social source, remove proof, delete media, delete own post, report, mute, block, hide similar posts, and edit audience. Health, photo, voice, and social proof each shows consent state before publication.

## Motion
- Post cards fade by index; kudos has a restrained pulse unless reduced motion is active.
- Comment opens a bottom sheet; report opens an action sheet with no playful animation.
- Pull-to-refresh respects cached feed and source freshness chips.
- FAB opens quick capture for discussion, question, tip, success story, challenge, or announcement.

## Image Slots
- `HIFI-91-01` proof media thumbnail for first post.

## Implementation Notes
- Route stays `/feed`.
- Author taps route to `/profile/[id]`; group chips route to `/groups` or `/community/[slug]`.
