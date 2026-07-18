# VISUAL-009 D2 — Terra builder packet C (S83/S92)

- Packet status: issued.
- Packet ID: D2-BUILD-C.
- Routing/model/effort: gpt56-tiered / gpt-5.6-terra role intent (W-MODEL) / high.
- Evidence destination: evidence/builder-c.md.
- Stop condition: shared/S43 edit, source conflict, scope crossing, or two equivalent failures.

Read builder-common.md, BATCH.md, VERIFICATION-MATRIX.md, evidence/recon-c.md, ASSET-DISPOSITION.md, and current specs 83/92.

## Allowed edits

- balencia-screens/src/components/hifi/screens/profile/S83BuddyProfile.tsx
- balencia-screens/src/components/hifi/screens/profile/S92Reputation.tsx

## Exact outcomes

- S83: exact exclusive states/substates; exactly two default mission controls/count; empty separation; pending/removed/consent/offline reasons; AK initials and consent-first media; visibility/safety/mission/avatar overlays; destructive confirmations; honest local message; no PaywallLock.
- S92: exact exclusive states/substates; default/offline/sync-error separation; native metric/tier/safety controls and explanations; canonical unchanged PaywallLock with real preview/local outcome; honest empty/flagged/success/disabled states; due-process/privacy controls and non-color truth.

## Verify

Run npx eslint on only the two assigned files. Do not run/restart a server.
