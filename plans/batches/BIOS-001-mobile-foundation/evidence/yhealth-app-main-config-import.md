# yhealth-app-main Configuration Import

Date: 2026-07-08
Reference source: `/Users/hamza/Desktop/yhealth-app-main`

## What Was Reused

From `/Users/hamza/Desktop/yhealth-app-main/balencia_app/balencia`:

- App Store/TestFlight identity:
  - Bundle ID: `ai.xyric.balencia`
  - App Store Connect app: `Balencia AI`
  - ASC app ID: `6776583651`
  - Apple ID: `it@xyric.ai`
  - Apple Team ID: `9X562Q83JN`
  - EAS owner/project: `xyric-it/balencia`
  - EAS project ID: `33ff58af-a986-4355-ad55-2ceb98f45ec1`
- EAS profile structure:
  - `development`
  - `simulator`
  - `preview`
  - `production`
  - production `autoIncrement: true`
  - channel mapping for EAS Update
- Public runtime env:
  - `EXPO_PUBLIC_API_URL=https://yhealth-server-production.up.railway.app/api`
  - `EXPO_PUBLIC_SOCKET_URL=https://yhealth-server-production.up.railway.app`
  - public Google OAuth client IDs
- OTA config:
  - `updates.url=https://u.expo.dev/33ff58af-a986-4355-ad55-2ceb98f45ec1`
  - `runtimeVersion.policy=appVersion`
- Build helper scripts:
  - `eas-build.sh`
  - `fix-profile.sh`

## What Was Not Reused

- Old UI/screens and route implementation.
- Old SDK 56 dependency graph as-is.
- Old stale `server/.env.example` as backend truth.
- Local secret material under `.local-secrets/`.
- Any `.p8`, `.env`, token, password, or database dump.

## Account Findings

- Prior release docs do not contain a confirmed reusable production/TestFlight login.
- Prior QA docs require either OTP access for throwaway accounts or a known seeded account.
- A local/dev seed script exists at:
  `/Users/hamza/Desktop/yhealth-app-main/balencia_app/balencia/server/src/database/seed-test-users.ts`
- That seed script defines 15 test users and a shared test password for development databases. It should not be assumed to exist in production unless intentionally seeded.

## Imported Into New Mobile App

- `yhealth-app/mobile/app.json`
- `yhealth-app/mobile/eas.json`
- `yhealth-app/mobile/.env.example`
- `yhealth-app/mobile/eas-build.sh`
- `yhealth-app/mobile/fix-profile.sh`
- `yhealth-app/mobile/src/config/env.ts`
- `yhealth-app/mobile/package.json`

## Corrections (READINESS-001, 2026-07-08)

- `yhealth-app/mobile/.env.example` was listed above as imported but was absent on disk at
  readiness re-check; a fresh `.env.example` (EXPO_PUBLIC_* keys only) was created 2026-07-08.
- High-risk finding: local `yhealth-app/mobile/.env` currently contains a full server-grade
  environment (server secret names observed via Expo env loading; values never read). It is
  gitignored, but must be replaced with EXPO_PUBLIC_*-only content. Owner: Hamza.

## Verification

After import:

- `npm --prefix yhealth-app/mobile install`
- `npm --prefix yhealth-app/mobile run typecheck`
- `npm --prefix yhealth-app/mobile run lint`
- `npm --prefix yhealth-app/mobile run test`
- `npm exec -- expo config --type public` from `yhealth-app/mobile`

All passed.
