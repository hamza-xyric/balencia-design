# VISUAL-009 D2 — Terra builder packet B (S68/S71)

- Packet status: issued.
- Packet ID: D2-BUILD-B.
- Routing/model/effort: gpt56-tiered / gpt-5.6-terra role intent (W-MODEL) / high.
- Evidence destination: evidence/builder-b.md.
- Stop condition: shared/S43 edit, source conflict, scope crossing, or two equivalent failures.

Read builder-common.md, BATCH.md, VERIFICATION-MATRIX.md, evidence/recon-b.md, and current specs 68/71.

## Allowed edits

- balencia-screens/src/components/hifi/screens/profile/S68UniversalSearch.tsx
- balencia-screens/src/components/hifi/screens/profile/S71AchievementGallery.tsx

## Exact outcomes

- S68: exact exclusive states/substates; screen-local labelled controlled input[type=search], autofocus, 300ms deterministic result state, conditional Clear/refocus; frozen one-array result/count model; local/offline visibility; native non-color filters; honest Cancel/CIA/history/result/Retry outcomes.
- S71: exact states/substates; collision-free 47/120/39 hero; ten-domain coverage from live tokens; Achievement terminology; code-native non-emoji tiles; native non-color filters/details/focus restoration; populated versus first-use truth; cached error/offline; deterministic success/reduced motion; no PaywallLock.

## Verify

Run npx eslint on only the two assigned files. Do not run/restart a server.
