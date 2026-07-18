# G1 builder B — S32/S33/S34 implementation evidence

- Worker role: Terra bounded writer
- Owned product files: `S32CareerDashboard.tsx`, `S33RelationshipsDashboard.tsx`, `S34SpiritualityDashboard.tsx`
- Shared/product registry/API files changed: none
- Asset disposition: code-native; no raster, generated, provider, or personal imagery added
- Skill note: the lane-mandated `balencia-visual-prototype` skill was not present in the available skill catalog or local `.agents/skills`; implementation followed the lane `AGENTS.md`, frozen packet, active specs, canon/catalog, RPG authority, and recon directly.

## S32 Career

- Removed unsupported repeated level labels and retained explicit Career identity without inventing a domain or character level.
- Corrected the action count to derive from the single open action (`1 remaining`, then `0 remaining` after local completion).
- Added deterministic frozen fixtures, distinct null/low-confidence/error/offline/success/disabled/data-control/premium/log outcomes, and visible `data-state` markers.
- Preserved exact skill values `8 / 10` and `6 / 10`; each now names target `10`, draws its marker at the endpoint, and exposes exclusive provenance.
- Kept six historical plus two projected trajectory values and milestones in an accessible chart label; low-confidence suppresses projected CIA values.
- Replaced the bespoke dead-end lock with shared `PaywallLock` and a local-only premium preview outcome.
- Added full nine-field data controls and local bundled/session-only provenance; no API, storage, cookie, payment, or device capability was added.

## S33 Relationships

- Replaced all `domain-people` usage with `domain-relationships`.
- Corrected hero semantics to `84 out of 99`; ring geometry normalizes `84/99` while visible and accessible copy retains the 0–99 contract.
- Made real, low-confidence, and null states exclusive; null removes KPI and hero values, and no fixture simultaneously claims sync plus estimate.
- Corrected reminder count to the one rendered reminder.
- Removed ghost rendering from populated person rings and added accessible `x out of 99` labels.
- Made person rows operable: selection retargets the hero and reveals a labelled 12-week cadence summary/heatmap.
- Added local outcomes for Check in, View all, recent entry, Skip, and Do it; offline prevents mutations and explains why.
- Reframed the cross-domain suggestion as a bounded association and removed purple/CIA treatment from the rules-based Sarah status.
- Added full nine-field controls and explicit bundled people/calendar provenance with no implied contacts/calendar access.

## S34 Spirituality / Faith

- Kept member-facing `Spirituality` while exposing the RPG mapping `Faith` and using `domain-faith`; no registry or Life Power calculation changed.
- Removed unsupported level and competing Today mission copy.
- Completion now derives from checked practice rows and each row is an `aria-pressed` 52px control; offline/disabled fixtures prevent mutation.
- Prayer time is explicitly a bundled demo with no location. Null/error offers a same-origin location-consent preview and never invokes geolocation or a Prayer API.
- Populated consistency history now has a truthful seven-day local-log caption; empty state uses a blank grid and honest-null copy.
- Added visible Data Sources control, 44px Read more, reflection, two timer, and log-practice routes with distinct local outcomes.
- Added full nine-field controls and explicit local/session-only provenance; retained reachable `SafetyCard` outside gamification and bounded the calm claim as association/non-medical.

## Verification

Commands run from `balencia-screens/`:

```text
npx prettier --write <three owned files>                         PASS
npm run typecheck                                                PASS
npx eslint <three owned files>                                  PASS (0 errors, 0 warnings)
git diff --check -- <three owned files>                          PASS
```

Owned diff summary: 3 files changed, 1015 insertions, 448 deletions. Production build/browser acceptance remains Sol-owned under the batch contract.
