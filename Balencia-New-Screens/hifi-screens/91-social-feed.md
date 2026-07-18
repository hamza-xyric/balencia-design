# 91 Social feed — A+++ hi-fi mobile spec

## Header

- **Source ID:** 91
- **Source spec:** `Balencia-New-Screens/screens/91-social-feed.md`
- **Route:** `/feed`
- **Frame:** 390x844 native mobile
- **Taxonomy:** Squads, Communities, Missions, CIA

## Product intent

Feed is a calm, proof-aware social stream for Mission updates, accountability activity, Squad progress, and Community wins. It must feel supportive and moderated rather than performative. Every proof field identifies its source and audience before a local post preview is saved.

## Final composition

```text
+--------------------------------------+
| Feed                       post more |
| [All] [My Squads] [Communities]       |
| [Partners]                            |
| +----------------------------------+ |
| | Share one proof update           | |
| | Audience: Only me                | |
| | [Discussion] [Question] [Win]    | |
| | [Review proof update]            | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA local suggestion            | |
| | Mission relation, no audience   | |
| | or publication inference        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Aisha Khan        12m      more | |
| | Finished tempo run with Amira.  | |
| | [proof source / honest status]  | |
| | Kudos · Comment · Safety        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Malik R.           1h      more | |
| | Budget routine reached 14 days. | |
| | [Mission update · user entered] | |
| +----------------------------------+ |
+--------------------------------------+
```

## Focal hierarchy

- **Primary:** privacy-first composer with an explicit audience and proof review.
- **Secondary:** the first sourced proof post on a solid reading surface.
- **CIA layer:** one bounded topic or Mission relation; CIA never infers audience, publication, causality, or certainty.
- **Moderation layer:** every post exposes Save, public-link preview, Report, Mute, Block, and Hide similar posts. Own content separately exposes Delete.

## Components and visual system

- `TopBar`, filter tabs, `GlassCard` composer, `FeedPostCard`/`SolidCard`, `CIAInsightCard`, `Chip`, `ConsentRail`, `E1Modal`, skeleton, offline, and honest-null states.
- Warm dark base `#0A0A0F`; solid post surfaces `#211008`.
- Orange marks member actions, green marks completed local outcomes, and purple is reserved for CIA.
- Modal sheets are opaque `ink-900` surfaces with a visible border and shadow; background content never bleeds through.
- All 12px provenance, time, count, and privacy captions use at least `text-white/55`.

## Proof, audience, and data honesty

- Audience starts at **Only me** unless the explicit `audience-unselected` fixture is active. Saving is disabled until an audience is selected.
- Proof review shows the exact distance field, bundled source, selected audience, freshness, confidence, and session retention.
- **Remove proof** immediately changes the composer and feed row to text-only, suppressing distance and media fields.
- **Revoke source** records a separate revoked state, removes the attachment, and suppresses source-backed fields immediately.
- Export is unavailable when no proof attachment remains.
- Low-confidence proof is labeled estimated and cannot increase CIA certainty.
- Honest-null proof renders `Source unavailable` or `Proof removed`; it never preserves a placeholder metric or media block.
- Offline actions are explicitly queued locally. Cached content never claims a live refresh.

## Moderation and lifecycle

- Opening a post menu stores the selected post identity, author, and body. The sheet title, Mute/Block labels, report status, and confirmation copy must match that selected post.
- Report state is tracked per post. A report confirmation promises only a local review queue, never an enforcement outcome.
- The own-post delete confirmation names the selected own post. Confirming deletion removes that post card and its proof preview immediately.
- Media consent off hides the proof image while preserving only the audience-authorized text update.
- No control implies clipboard, native sharing, server publication, or external deletion in this prototype.

## Required states

- `default-consented`, `audience-unselected`, `proof-preview`, `proof-low-confidence`, `proof-honest-null`
- `skeleton`, `empty`, `cached-error`, `offline-queued`
- `kudos-success`, `comment-sheet`, `composer-disabled`
- `moderation-sheet`, `report-success`, `own-delete-confirm`, `data-controls`, `media-consent-off`

Each state must be deterministic from `/screens/91?state=<fixture>` and must preserve 44px targets, keyboard focus containment, Escape close, and focus restoration.

## Acceptance criteria

1. Filters use **My Squads**, **Communities**, and **Partners**; Mission and CIA terminology is consistent.
2. Proof removal and source revocation produce visibly different, persistent local states.
3. Aisha and Malik open author-correct moderation sheets and outcomes.
4. Own-post deletion removes the card rather than showing status copy only.
5. Proof media, source, and audience remain inspectable before saving.
6. Opaque modal surfaces and `text-white/55` minimum captions meet the trust/readability contract.
7. No API, clipboard, native share, or remote mutation is implied.

## Image slot

- `HIFI-91-01` — privacy-safe abstract proof media for the first post; no person, route, logo, or readable embedded text.
