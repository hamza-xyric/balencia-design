---
name: asc-testflight-verification
description: How to verify Balencia TestFlight/submission state — eas-cli has no submissions-list; use ASC API with local JWT
metadata:
  type: reference
  status: active
  risk_level: high
  critical_invariant: false
  last_verified: 2026-07-08
---

`eas-cli` (checked v20.4/20.5) has **no** `submit:list`/`submission:list` command. To verify
TestFlight/submission state for Balencia (ASC app `6776583651`) without the browser:

- Sign an ES256 JWT locally from `yhealth-app/mobile/.local-secrets/AuthKey_7N3LKBDJZU.p8`
  (key ID `7N3LKBDJZU`, issuer `6eb56887-af26-4f25-aa3a-01c78fae30ae`, aud `appstoreconnect-v1`)
  — never print key or token.
- GET `/v1/builds?filter[app]=6776583651&sort=-uploadedDate` for processed builds;
  `/v1/betaGroups?filter[app]=...` for tester groups;
  `/v1/apps/.../betaAppLocalizations` for TestFlight privacy-URL/feedback-email metadata.

Related gotchas (from yhealth-app-main history, re-confirmed 2026-07-08): submit credentials must be
in eas.json `submit.production.ios` (env `EXPO_ASC_*` is build-side only); production profile needs
`autoIncrement: true`; push capability needs `fix-profile.sh` Apple-ID-auth repair when it lands.
Canonical checklist: `yhealth-app/mobile/docs/READINESS.md`. [[verify-commands]]

**Verify before relying:** re-check eas-cli command surface after upgrades; key IDs against
`yhealth-app/mobile/eas.json`.
