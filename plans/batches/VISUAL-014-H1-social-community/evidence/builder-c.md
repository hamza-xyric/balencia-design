# H1 builder C implementation evidence — S91/S94/S95

Worker role: Terra bounded writer. This is implementation evidence only; Sol owns the dedicated verifier, production browser acceptance, shared/API/registry surfaces, ledgers, and final decision.

## Owned writes

- `balencia-screens/src/components/hifi/screens/social/S91SocialFeed.tsx`
- `balencia-screens/src/components/hifi/screens/social/S94Webinars.tsx`
- `balencia-screens/src/components/hifi/screens/social/S95PodsHub.tsx`
- this evidence file

No shared kit, API, package, registry, route, spec, ledger, accepted-family, git, browser/server, Figma, external service, production app, or asset file was changed.

## Implemented frozen contract

### S91 social feed — 17 exact states

- Added the exact allowlist/fallback and `data-h1-state="91-<state>"` for `default-consented`, `audience-unselected`, `proof-preview`, `proof-low-confidence`, `proof-honest-null`, `skeleton`, `empty`, `cached-error`, `offline-queued`, `kudos-success`, `comment-sheet`, `composer-disabled`, `moderation-sheet`, `report-success`, `own-delete-confirm`, `data-controls`, and `media-consent-off`.
- Replaced Pods/Circles/buddies with approved Squads, Communities, and named Partners; audience begins Only me or unselected and is never inferred from a filter.
- Added native filter/post-type controls, explicit audience radio group, proof field/source/scope/freshness/confidence/retention review, remove/export/revoke, and publication-disabled reason.
- Added deterministic local Kudos/comment/queued outcomes, distinct post counts/provenance, moderation sheet with report/mute/block/hide/public-link preview, and own-delete only for the own-post fixture.
- `HIFI-91-01` is a deliberate privacy-safe code-native abstract with alt text; consent-off/null states hide media. No wearable, media, share, clipboard, storage, or publication capability is invoked.
- Added full nine-field data controls plus correction and session-only/local-only copy.

### S94 webinars — 18 exact states

- Added the exact allowlist/fallback and `data-h1-state="94-<state>"` for all frozen upcoming/registered/recording/schedule/loading/error/offline/review/success/disabled/calendar/watch/share/data/media states.
- Replaced relative `Live tomorrow` with an absolute bundled fixture (`Thu Nov 14 · 7:00 PM EST`, refreshed Apr 12), with low-confidence and honest-null schedule suppression.
- Reconciled the count to `one recording shown`; retained coherent 38% text/bar progress and explicit unpublished/media-null states.
- Added real named tab panels, registration review/success/error, calendar summary preview, watch preview, public-URL-only share preview, sold-out/date-null/offline disabled reasons, and local search/status outcomes.
- Share excludes Missions, health, registration, and watch progress and invokes no native share/clipboard/external navigation. Calendar invokes no file/calendar capability.
- Hero uses member-action orange and `motion-safe:animate-pulse`; skeleton motion is disabled under reduced motion. CTA layout is stacked/no-wrap at narrow width.
- `HIFI-94-01` is a deliberate code-native abstract or explicit honest-null treatment with accessible description. Full data controls and correction are present.

### S95 groups hub — 20 exact states

- Added the exact allowlist/fallback and `data-h1-state="95-<state>"` for all frozen Community/Squad, consent, loading/null/error/offline, membership/invite/moderation/discovery/data/asset states.
- Removed every visible Pod/Circle/Party/Guild noun. Tabs are Squads and Communities with named panels. Partners remain people/permission relationships, not a group type.
- `Morning runners Community` is persistent with exactly 8 members; `Evening stretch Squad` is temporary, Mission-bound, and exactly 4 people. Hero counts reconcile to one Community, one Squad, and one pending invite. Suggested `Weekend walkers Community` is a distinct unjoined entity.
- Route history is off by default. Granular consent names approximate route identifiers, purpose, Only me audience, 30-day window, freshness, retention, export/revoke/delete/correction; three overlaps appear only after consent and disappear when revoked.
- Added local join/cancel/success, invite decline/accept, leave/cancel/undo, report/mute/block/own-delete, discovery-disabled, cached/offline, and full data-control outcomes.
- Removed the incorrect duplicate ghost ring; one 68% progress bar is sourced and labelled. `HIFI-95-01` uses role-labelled code-native initials or explicit honest-null member previews.

## Capability and asset disposition

All three screens are deterministic local React/query previews. No raster/generated/provider/personal asset was added, and no fetch/XHR/WebSocket/geolocation/media/file/share/clipboard/calendar/notification/payment/storage/external-navigation call was introduced.

## Scoped verification

Run from `balencia-screens/`:

```text
npx prettier --write <three owned product files>          PASS
npm run typecheck                                         PASS
npx eslint <three owned product files>                   PASS (0 errors, 0 warnings)
git diff --check -- <three owned product files>          PASS
```

The implementation exposes 55 exact PNG fixtures (17 + 18 + 20) plus one default state per screen for Sol's actual 125% proofs. Production build, browser focus/overflow/unique-hash checks, capability guards, and accepted-through-G1 sentinels remain downstream Sol gates.
