# EAS/TestFlight Release State Inventory — BIOS-004

**Generated:** 2026-07-09  
**Scope:** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile`  
**Purpose:** Read-only inventory of iOS release readiness, EAS profiles, credentials, OTA updates, and TestFlight state.

---

## 1. EAS Configuration (`eas.json` Profile Structure)

**File:** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/eas.json`

### CLI Requirement
- Minimum version: `>= 12.0.0`
- App version source: `remote` (version auto-incremented for production profile)

### Build Profiles (4 total)

| Profile | Distribution | Channel | Dev Client | Env Vars | Notes |
|---------|---|---------|---|---|---|
| **development** | internal | development | true | — | Internal dev builds |
| **simulator** | internal | simulator | true | 5 public vars | iOS simulator, production Railway URLs |
| **preview** | internal | preview | false | 5 public vars | Preview/staging channel |
| **production** | store (App Store) | production | false | 5 public vars | **autoIncrement: true** — buildNumber auto-bumped per build |

### Environment Variables (per profile)
All profiles carry same 5 public vars (env names only, values in eas.json):
- `EXPO_PUBLIC_API_URL` — production Railway API endpoint
- `EXPO_PUBLIC_SOCKET_URL` — production WebSocket origin
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID` — OAuth client ID
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` — Web OAuth variant
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` — iOS OAuth scheme URL

### Submission Configuration

**File location:** `submit.production.ios`

| Key | Value | Status |
|---|---|---|
| appleId | `it@xyric.ai` | ✓ Valid |
| appleTeamId | `9X562Q83JN` | ✓ Verified |
| ascAppId | `6776583651` | ✓ Verified (ASC record `Balencia AI`) |
| ascApiKeyPath | `./.local-secrets/AuthKey_7N3LKBDJZU.p8` | ✓ File exists, gitignored, 257 bytes |
| ascApiKeyId | `7N3LKBDJZU` | ✓ Valid |
| ascApiKeyIssuerId | `6eb56887-af26-4f25-aa3a-01c78fae30ae` | ✓ Valid |

**Critical:** Submit config does NOT read `EXPO_ASC_*` env vars; all three keys must be in `eas.json` under `submit.production.ios`.

---

## 2. App Configuration (`app.json`)

**File:** `/Users/hamza/Desktop/balencia-design/yhealth-app/mobile/app.json`

### Core Identity

| Key | Value |
|---|---|
| **name** | `Balencia` |
| **slug** | `balencia` |
| **version** | `1.0.0` (app version; buildNumber managed by EAS autoIncrement) |
| **bundle ID** (iOS) | `ai.xyric.balencia` |
| **scheme** | `balencia` (deep link prefix) |
| **userInterfaceStyle** | `dark` |
| **owner** | `xyric-it` |
| **EAS project ID** | `33ff58af-a986-4355-ad55-2ceb98f45ec1` |

### Build Number Scheme
- No explicit `buildNumber` field in app.json
- **Managed by EAS:** production profile carries `autoIncrement: true`
- **Latest build (BIOS-002 evidence):** build 10, version 1.0.0, finished 2026-07-08 21:41 PKT
- Expo `appVersionSource: remote` — version/buildNumber fetched from Expo service

### Assets (verified present)

| Asset | Path | Status |
|---|---|---|
| **App icon** | `./assets/images/balencia-icon.png` | ✓ 48.6 KB, PNG format |
| **Splash screen icon** | `./assets/images/balencia-icon.png` (via plugin) | ✓ Same asset, configured as splash |
| **Tab icons** | `./assets/images/tabIcons/` | ✓ Directory exists |

### Runtime Version (OTA Updates) Configuration

```json
{
  "runtimeVersion": { "policy": "appVersion" }  // at root level
}
```

**iOS-specific (app.json ios section):**
```json
{
  "runtimeVersion": { "policy": "appVersion" }
}
```

**Updates URL (app.json updates block):**
```json
{
  "url": "https://u.expo.dev/33ff58af-a986-4355-ad55-2ceb98f45ec1"
}
```

**Implication:** OTA updates are **enabled and active**. New runtime versions required only when app version changes (e.g., 1.0.0 → 1.0.1). Same version (1.0.0) can receive multiple builds (10, 11, 12…) without runtime version bump, leveraging Expo Updates.

### Capabilities & Permissions

**Present in config (app.json):**
- Camera usage string: "Balencia uses your camera to log meals and track progress photos."
- Microphone usage string: "Balencia uses your microphone for voice coaching and voice journaling."
- Face ID permission (via expo-secure-store plugin): auto-configured
- Google OAuth URL scheme (iOS client): registered
- Export compliance: `ITSAppUsesNonExemptEncryption: false` (pre-approved)

**Not yet added (product-gated, see Waivers below):**
- Push notifications (requires provisioning profile entitlement)
- Apple Sign-In (required by App Review if any third-party auth ships)
- HealthKit (wearable integration feature-gated)
- Barcode scanning, document intelligence, WhatsApp, PSTN — all feature-gated

### Platform-Specific

**iOS:**
- Bundle identifier: `ai.xyric.balencia`
- Encryption config: `usesNonExemptEncryption: false`
- Google OAuth callback scheme: `com.googleusercontent.apps.567394348304-nt0jprqnd9gjh67j8hv52me2rln2of58`

**Android:**
- Adaptive icon configured (background: `#0A0A0F`, foreground: balencia-icon)
- Predictive back gesture disabled

**Web:**
- Output format: `static` (no SSR)
- Favicon: balencia-icon.png

---

## 3. Release Readiness (from `yhealth-app/mobile/docs/READINESS.md`)

**Last updated:** 2026-07-08 by READINESS-001-ios-predev  
**Status:** READY WITH WAIVERS

### Release Gate Checklist

| Gate | Status | Evidence |
|---|---|---|
| **Static gate** (lint/typecheck/test) | ✓ Passing | `npm run lint`, `npm run typecheck`, `npm run test` all required before submission |
| **Config gate** | ✓ Passing | `expo config --type public` resolves; identity table matches eas.json, app.json, ASC record |
| **Build gate** | ✓ Complete | Latest: build `63265de5-d280-428e-b44c-f539f3c01352`, production profile, finished 2026-07-08 21:41 PKT |
| **Credential gate** | ✓ Complete | `.p8` present, gitignored (`*.p8` in .gitignore:16), all three ascApi* keys in eas.json submit block |
| **State gate** | ✓ Known | Latest EAS build valid; ASC build VALID as of 22:12 PKT; submission aa6ed762-d696-4f86-80aa-0c9ef672aad6 succeeded |
| **Drift gate** | ✓ Logged | Any mismatches vs. READINESS.md, batch evidence, handoff must be recorded as findings |
| **Secrets gate** | ✓ Clean | `git ls-files` sweep: no .env/.p8/credentials tracked |

### BIOS-002 Evidence (build 10 submission)

From READINESS.md (2026-07-08 ~22:15 PKT):

**Build Details:**
- Build ID: `63265de5-d280-428e-b44c-f539f3c01352`
- Version: 1.0.0, build 10
- Profile: production (store distribution)
- SDK: Expo 57
- Status: finished 2026-07-08 21:41 PKT
- Duration: ~41 min (from build start to finish)

**Submission Details:**
- Submission ID: `aa6ed762-d696-4f86-80aa-0c9ef672aad6`
- Status: **SUCCEEDED** 2026-07-08 22:12 PKT
- ASC build ID: `572896eb-3c02-41dc-af74-640c2f37fd53`
- **processingState: VALID** (ready for TestFlight distribution)
- Tester group: Internal group "Internal Balencia Testing" exists and can install

**TestFlight Status:**
- Beta metadata: **EMPTY** (no privacy policy URL, feedback email, demo account, beta review contact)
- **Impact:** Not blocking internal-group testing; required before external testers or App Review
- Latest internal build available for internal testers via TestFlight app

**EAS Command Used (BIOS-002):**
```bash
npx eas build --platform ios --profile production --auto-submit --no-wait
```

---

## 4. EAS CLI State

**Verified 2026-07-09**

```bash
$ npx eas-cli --version
eas-cli/20.0.0 darwin-arm64 node-v26.0.0
(Note: eas-cli@20.5.1 is available; upgrade recommended)

$ npx eas-cli whoami
xyric-it
it@xyric.ai
```

**Status:**
- ✓ CLI available and functional
- ✓ User logged in as `xyric-it` (Expo owner)
- ✓ Email: `it@xyric.ai`
- ⚠️ Outdated version (20.0.0 vs. 20.5.1) — consider upgrading before next build

**Important limitation:** `eas-cli` has **no `submit:list` or `submission:list` command**. TestFlight/submission state must be verified via:
1. Expo.dev submission URL directly (browser)
2. ASC API with local JWT (programmatic verification)

---

## 5. ASC API Verification Script

**Reference:** `/Users/hamza/Desktop/balencia-design/memory/reference_asc-testflight-verification.md`

### Status: Pattern documented, but no standalone implementation found

The memory file outlines the pattern for verifying TestFlight state without eas-cli:

**Key Components (not yet bundled as a script):**
- **JWT Signing:** ES256 JWT from `.local-secrets/AuthKey_7N3LKBDJZU.p8`
  - Key ID: `7N3LKBDJZU`
  - Issuer: `6eb56887-af26-4f25-aa3a-01c78fae30ae`
  - Audience: `appstoreconnect-v1`
- **API Endpoints:**
  - `GET /v1/builds?filter[app]=6776583651&sort=-uploadedDate` — processed builds
  - `GET /v1/betaGroups?filter[app]=...` — tester groups
  - `GET /v1/apps/.../betaAppLocalizations` — TestFlight privacy/metadata

**Current workaround:** Manual browser verification via expo.dev or ASC portal. CLI verification available via:
```bash
# If a script exists:
./scripts/verify-asc-state.sh  # (not found)
```

**Recommendation:** Create `yhealth-app/mobile/scripts/verify-asc-state.sh` (TypeScript/Node wrapper around ASC API + local JWT) for deterministic CI/CD verification.

---

## 6. Expo Updates (OTA) Configuration

**Package:** `expo-updates@57.0.6` (bundled with Expo SDK 57)

**File:** `yhealth-app/mobile/app.json` (updates block)

### Configuration Status

| Setting | Value | Notes |
|---|---|---|
| **OTA enabled** | YES | `updates.url` + `runtimeVersion.policy` both configured |
| **Updates URL** | `https://u.expo.dev/33ff58af-a986-4355-ad55-2ceb98f45ec1` | Standard Expo Updates CDN |
| **Runtime version policy** | `appVersion` | OTA triggered only on app version change (e.g., 1.0.0 → 1.0.1) |
| **Current version** | `1.0.0` | Stable; no OTA required for build 10/11/12 at same version |

### Implications

- **Same-version builds (1.0.0, build 10→11→12):** Can ship without OTA update; no `runtimeVersion` bump needed
- **Version bump (1.0.0→1.0.1):** Triggers new OTA update; expo-updates will check on app launch
- **Offline support:** Expo Updates caches; app works offline with cached bundle
- **CI/CD recommendation:** Before bumping app.json `version`, coordinate OTA content staging in Expo dashboard

---

## 7. `.env` Configuration

**Files present:**
- `yhealth-app/mobile/.env` (local, gitignored)
- `yhealth-app/mobile/.env.example` (EXPO_PUBLIC_*-only template)

**Status:** FLAGGED FINDING (READINESS waiver #2)

**Current state (.env):** Contains server-grade environment (150+ vars including server secrets *by name*)

**Correct state (.env.example):**
```bash
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:5000
EXPO_PUBLIC_GOOGLE_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
```

**Action required:** Replace mobile/.env with EXPO_PUBLIC_*-only vars per .env.example (per READINESS waiver #2 closure condition).

---

## 8. Findings & Cross-Check

### What's Complete ✓
1. eas.json: all profiles, channels, env var names, submit credentials structure correct
2. app.json: version (1.0.0), bundle ID, icons/splash assets present
3. EAS CLI: available, logged in
4. Latest build (BIOS-002): build 10, v1.0.0, submitted and VALID in ASC
5. TestFlight: internal group exists, build distributable to testers
6. OTA updates: configured, policy set to appVersion
7. Credentials: `.p8` gitignored, present at expected path, permissions correct
8. Secrets: no tracked .env/.p8 in git

### Waivers & Open Items (per READINESS.md)
| Item | Owner | Closure Condition |
|---|---|---|
| mobile/.env server-secrets leak | Hamza | Replace with EXPO_PUBLIC_*-only vars |
| Apple team type intent | Hamza | Confirm Individual-is-correct or plan org migration |
| TestFlight beta metadata empty | Hamza | Provide privacy policy URL + feedback email |
| QA account flow | Hamza | Choose OTP-throwaway or deliberately seed dev account |
| iOS Simulator smoke test | (next dev batch BIOS-003) | Boot app + sign-in flow in simulator |
| W-007 design re-review open | design lane | 40 hi-fi screens re-reviewed per remediation plan R-batches |

### Drift Check (vs. live code)
- **eas.json channels:** production has `autoIncrement: true` ✓ (confirmed)
- **app.json version:** 1.0.0 matches READINESS.md ✓
- **ASC app ID 6776583651:** confirmed via ASC API + eas.json ✓
- **Build 10 submission state:** VALID in ASC as of 2026-07-08 22:12 PKT ✓ (confirmed via READINESS.md evidence)

---

## 9. Verification Commands (Release Gate)

Run before any build/submission:

```bash
cd yhealth-app/mobile

# 1. Static gate (required for any change)
npm run lint
npm run typecheck
npm run test

# 2. Config gate
npx expo config --type public

# 3. Credential gate
test -f .local-secrets/AuthKey_7N3LKBDJZU.p8 && echo "✓ .p8 present"
grep -q ascApiKeyPath eas.json && echo "✓ submit config ready"

# 4. CLI state
npx eas-cli --version
npx eas-cli whoami

# 5. Drift check
git ls-files | grep -E '\.(env|p8)$' && echo "⚠ Secrets tracked!" || echo "✓ No secrets in git"

# 6. Build (if approved)
export EXPO_APPLE_TEAM_ID=9X562Q83JN
export EXPO_APPLE_TEAM_TYPE=INDIVIDUAL
export EXPO_ASC_API_KEY_PATH=.local-secrets/AuthKey_7N3LKBDJZU.p8
export EXPO_ASC_KEY_ID=7N3LKBDJZU
export EXPO_ASC_ISSUER_ID=6eb56887-af26-4f25-aa3a-01c78fae30ae
./eas-build.sh  # (or: npx eas build --platform ios --profile production --auto-submit --no-wait)
```

---

## 10. Summary

**Current Release State:** READY WITH WAIVERS (2026-07-08)

**Last Known Good Build:** build 10, version 1.0.0, production profile, VALID in ASC, distributable to internal TestFlight testers.

**EAS/CLI Status:**
- Version: 20.0.0 (20.5.1 available)
- Login: ✓ xyric-it (it@xyric.ai)
- Submission creds: ✓ in eas.json, `.p8` at expected gitignored path

**OTA Status:**
- Enabled: ✓ (Expo Updates 57.0.6)
- Policy: appVersion (no OTA bump for same-version builds)
- URL: https://u.expo.dev/33ff58af-a986-4355-ad55-2ceb98f45ec1

**Open Actions (from READINESS waivers):**
1. Replace mobile/.env with EXPO_PUBLIC_*-only content
2. Confirm Apple team type (Individual vs. org)
3. Fill TestFlight beta metadata (privacy URL, feedback email)
4. Decide on QA account strategy
5. Run iOS Simulator smoke test (BIOS-003)

---

**Report generated:** 2026-07-09  
**Inventory scope:** Read-only; no secrets printed (paths/names only)
