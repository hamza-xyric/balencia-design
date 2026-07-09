# BIOS-004 first EAS/TestFlight build — record (2026-07-09)

## Outcome
- **Build 13** (v1.0.0, production profile, autoIncrement) — **FINISHED**, auto-submitted
  to TestFlight internal group ("Internal Balencia Testing").
- Build id `96932d00-fb79-452f-ad3a-bcab8c6330c3`; submission id `3a6fc75f-7832-411f-bf0c-6950960db6f4`.
- Content SHA: submodule @4eff877a (Move E screens + Move F fixes). The two Move G polish
  commits (458f0b9a: domain humanize, pinned-missions rule) landed AFTER the build was
  uploaded — cosmetic only; next milestone build picks them up.

## The build-11/12 failure and the repair (all non-interactive, no Apple ID login)
1. **Build 11 ERRORED** (`XCODE_BUILD_ERROR`): provisioning profile `27NWJ67CFF`
   (created 2026-06-04) lacked the **Sign In with Apple** capability/entitlement that
   BIOS-003's `expo-apple-authentication` now requires.
2. **Build 12**: attempted `yes | eas build` under PTY — pipe forced non-interactive mode,
   credential validation skipped, same stale profile → **canceled** before Xcode.
3. Discovery: eas-cli **cannot sync capability identifiers with ASC API-key auth at all**
   ("Skipping capability identifier syncing because the current Apple authentication
   session is not using Cookies") — generalizes the BIOS-era push-key lesson.
4. **Repair path that worked (repeatable, scripted):**
   a. ASC API (local ES256 JWT, same key as verify-asc-state.sh):
      `POST /v1/bundleIdCapabilities` on bundle `ai.xyric.balencia` (internal id `Y4CGK2H927`)
      with `capabilityType: APPLE_ID_AUTH`, settings `APPLE_ID_AUTH_APP_CONSENT: PRIMARY_APP_CONSENT`
      (the bare capability POST 409s — the consent setting is required).
   b. ASC API: `DELETE /v1/profiles/27NWJ67CFF` (profile was already INVALID portal-side).
   c. `eas credentials -p ios` driven by expect (`$CLAUDE_JOB_DIR/tmp/eas-cred-fix2.exp` pattern:
      profile=production → team type Individual → team id 9X562Q83JN → Build Credentials →
      "All: Set up") with `EXPO_ASC_*` env: EAS regenerated the profile (**8ZPXL9APXG**), which
      inherits the newly enabled capability. Profile creation works fine with API-key auth —
      only capability *sync* is cookie-gated.
   d. Rebuild → build 13 green.
5. **Side effect to disclose:** during the first repair pass eas-cli reported the existing
   distribution certificate "no longer valid" (API-key visibility quirk) and the auto-confirm
   created a **new Apple Distribution cert** (serial `44FBDA8E…`, expires 2027-07-09); EAS + the
   new profile now use it. Old cert (serial `32A29646…`) still exists portal-side. Individual
   accounts have limited dist-cert slots — if a slot is needed later, the old cert is the one
   to revoke (Hamza's call; not done autonomously).

## Verification
- `eas build:view`: FINISHED, appBuildVersion 13, artifact present.
- ASC processing tracked via `scripts/verify-asc-state.sh builds` (local-JWT, A3 amendment);
  target state: build 13 `processingState=VALID` in the internal group. (W3 stands: internal
  group needs no beta-review metadata.)

## Team-type note (W2)
The eas credentials flow required a team-type answer; selected **Individual**, mirroring the
recorded team `9X562Q83JN (Hamza Muqeem (Individual))` on the existing cert — reading existing
state, not deciding store strategy. W2 (Apple team type decision for store metadata) remains open.

## ASC confirmation (post-close addendum)
2026-07-09: `verify-asc-state.sh builds` → `build 13  processingState=VALID  expired=False` — TestFlight internal group delivery confirmed. Milestone build gate fully green.
