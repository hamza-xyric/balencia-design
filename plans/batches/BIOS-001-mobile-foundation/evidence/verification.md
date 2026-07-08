# BIOS-001 Verification Evidence

Date: 2026-07-08

## Green

```bash
npm --prefix yhealth-app/mobile run lint
```

Result: passed.

```bash
npm --prefix yhealth-app/mobile run typecheck
```

Result: passed.

```bash
npm --prefix yhealth-app/mobile run test
```

Result:

```text
mobile-source-ok routes=11 files=37
```

```bash
node Balencia-New-Screens/work/validate-redesign.mjs --json
```

Result:

```json
{
  "ledgerRows": 104,
  "ledgerPass": 104,
  "ledgerTodo": 0,
  "screenFiles": 104,
  "liveRoutes": 130,
  "missingFiles": [],
  "lowScores": [],
  "defectScreens": [],
  "falsePassRows": [],
  "routeSweep1": { "checked": 83, "uncovered": [] },
  "routeSweep2": { "checked": 83, "uncovered": [] }
}
```

```bash
npm exec -- expo config --type public
```

Run from: `yhealth-app/mobile`

Result: passed. Public config resolved `name: Balencia`, `slug: balencia-ios`, `sdkVersion: 57.0.0`, icon/splash/favicon `./assets/images/balencia-icon.png`, and SecureStore plugin config.

```bash
npm exec -- expo export --platform web --output-dir dist-smoke
```

Run from: `yhealth-app/mobile`

Result: passed. Expo Router used `src/app` as root and statically exported 21 web routes. Temporary `dist-smoke` was removed after verification.

## Dependency Notes

`npm --prefix yhealth-app/mobile install` passed after network approval and installed:

- `@tanstack/react-query`
- `expo-secure-store`
- `expo-updates`
- Expo ESLint dev dependencies

NPM audit reports 11 moderate findings. No `npm audit fix --force` was run.

## Not Run

iOS Simulator/Expo Go smoke was not run in this batch. Next slice should run `npm --prefix yhealth-app/mobile run ios` or an XcodeBuildMCP simulator flow after the user confirms the preferred simulator/device.

## Re-Verification (READINESS-001-ios-predev, 2026-07-08 evening)

All BIOS-001 gates re-run and still green:

- `npm run lint` → `ESLint: No issues found`
- `npm run typecheck` → passed
- `npm run test` → `mobile-source-ok routes=11 files=38` (was 37 at BIOS-001 close)
- `npm exec -- expo config --type public` → resolved; SDK 57.0.0

Drift corrections vs. the original record above:

- Current `app.json` slug is `balencia` (matches EAS project @xyric-it/balencia). The original
  note recording `slug: balencia-ios` no longer matches live config — live config wins.
- `mobile/.env.example` did not exist at re-verification time despite the config-import record;
  created during READINESS-001 with EXPO_PUBLIC_* keys only.

EAS/TestFlight state at re-verification: build 63265de5 (v1.0.0 build 10) finished on EAS;
ASC still shows build 5 as latest — submission aa6ed762 pending confirmation. See
`yhealth-app/mobile/docs/READINESS.md`.
