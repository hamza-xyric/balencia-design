# H1 verifier-author evidence

Date: 2026-07-16
Scope: verifier authoring only; no product, browser, server, git, or external mutation

## Delivered artifact

- `balencia-screens/scripts/verify-h1-social.mjs`

The verifier freezes the H1 matrix at exactly 182 screenshot states plus ten screenshot-free 125% text-scale contexts, for 192 total contexts. Per-screen state counts are asserted as `20, 23, 23, 16, 13, 14, 18, 17, 18, 20` for screens `39, 40, 46, 47, 64, 78, 82, 91, 94, 95`.

## Acceptance hardening

- Requires a current production build served from exactly `localhost:3002`, verifies the served `BUILD_ID`, and rejects stale build output.
- Enforces the exact 90-file accepted fingerprint union: the 81-entry G1 v7 acceptance manifest plus nine H1 pre-accepted additions. Duplicate paths, invalid hashes, count drift, and live-byte drift fail acceptance.
- Captures product, API, verifier, and accepted-file fingerprints before execution and rechecks them before promotion.
- Creates all contexts at `390x844`, clears cookies and storage, installs state markers, applies reduced motion, blocks network/device/storage/share capabilities, and records console/page/external-navigation/capability violations.
- Audits overflow, hidden actions, 44px controls, 16px form fields, accessible names, all-caps CIA terminology, nested interactive controls, required semantics, and retired social terminology.
- Exercises state-specific semantic and interaction assertions, including dialogs, disabled controls, neutral report defaults, and Squad lifecycle behavior.
- Generates deterministic top-and-bottom composite proofs, requires consecutive pixel stability and unique per-screen hashes, and promotes screenshots atomically only after every gate passes.
- Writes a structured final JSON result on both acceptance and failure paths.

## Static verification

All packet-authorized checks passed after formatting:

```text
node --check scripts/verify-h1-social.mjs                 PASS
npx prettier --write scripts/verify-h1-social.mjs         PASS
npx eslint scripts/verify-h1-social.mjs                   PASS
git diff --check -- scripts/verify-h1-social.mjs          PASS
```

Browser execution is intentionally not included; it remains Sol-owned per the worker packet.
