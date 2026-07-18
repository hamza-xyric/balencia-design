# VISUAL-007 C1 repair A — Mission Board → Mission Detail intent

## Scope and behavior changed

- Repaired `C1-CC-01` only within the packet-owned S13/S14 product files.
- Routed the enabled S13 `New mission` action directly to `/screens/15`; the empty-board creation actions already use S15 and the existing skeleton/offline disabled reasons remain intact.
- Added the stable query identity `mission=<id>` to every rendered S13 mission-row detail link (`sunlight`, `q3-report`, `run-5k`, `hydrate`).
- Added a typed, bundled/local S14 fixture map for those four identities plus the canonical `half-marathon` default. Missing or invalid identity retains `Run a half marathon`.
- Parameterized S14 title, completion, domains/destinations, KPIs, streak-derived XP copy, provenance, coaching, next action, chain continuation, actions, milestones, reasoning, trend data, and consent copy. Career and Wellbeing fixtures therefore do not render running or Strava-specific claims.
- Raised locally rendered kit labels/chips/navigation copy to the frozen 12px floor and lifted meaning-bearing 45%-white copy to AA-safe paper opacity. Decorative icon opacity was not changed.

## Exact files changed

- `balencia-screens/src/components/hifi/screens/today/S13MissionBoard.tsx`
- `balencia-screens/src/components/hifi/screens/today/S14MissionDetail.tsx`
- `plans/batches/VISUAL-007-C1-today-missions/evidence/repair-a-mission-flow.md`

No shared kit, CSS, registry/data, verifier, S12, other screen, `yhealth-app`, Figma, Railway, or git index/history file was edited.

## Targeted verification

- `npx eslint src/components/hifi/screens/today/S13MissionBoard.tsx src/components/hifi/screens/today/S14MissionDetail.tsx` — **PASS** (exit 0, no output).
- `npx tsc --noEmit` — **PASS** (exit 0, no output).
- `git diff --check -- balencia-screens/src/components/hifi/screens/today/S13MissionBoard.tsx balencia-screens/src/components/hifi/screens/today/S14MissionDetail.tsx` — **PASS** (exit 0, no output).
- Static flow assertions found the S15 creation route, stable S13→S14 query route, canonical default, dynamic title, `data-mission-id`, dynamic provenance, and dynamic consent copy.
- Negative static scan found no `action=new-mission`, identity-less `href="/screens/14"`, explicit semantic `text-[0px]` through `text-[11px]`, or meaning-bearing `text-white/45` in the two owned files (expected `rg` exit 1: no matches).

## Assumptions

- `mission` is the local prototype query key; the four S13 IDs are the stable bundled identities.
- Missing or unrecognized identity intentionally resolves to `half-marathon`, preserving the canonical direct-navigation fixture.
- Current registry routes remain authoritative for domain destinations: Fitness `/screens/26`, Wellbeing `/screens/16`, Career `/screens/32`, Nutrition `/screens/28`.
- All content remains deterministic and local; no API, backend, auth, persistence, or state library was introduced.

## Residual risks / handoff

- Per packet, no server, browser suite, screenshots, full build, or hardened verifier was run. Sol should verify row-to-detail identity for all four rows, direct no-query fallback, S15 editor identification, 390×844 layout, 12px computed styles, and computed contrast in the integrated render.
- Query identity initializes client-side using the existing fixture-effect pattern; ESLint and TypeScript pass, but rendered hydration behavior remains for Sol’s browser verification.
- Verifier hardening requested by the independent review is outside this worker’s ownership and was not edited.

Worker output remains evidence until Sol verifies and accepts it.
