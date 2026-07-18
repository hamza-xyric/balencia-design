# D1 Terra builder D evidence — S25/S50

- Packet: `D1-BUILD-D`
- Worker provenance: native Codex Terra role intent, `gpt56-tiered`, high effort (`W-MODEL`); reused bounded native worker thread because GLM was quota-blocked until 2026-07-13 19:05:16.
- Decision authority: none; this is implementation evidence pending Sol verification.
- Scope: only `S25HelpCenter.tsx` and `S50ProfileEdit.tsx`; no shared, service, asset, Figma, Railway, or `yhealth-app` changes.

## Returned source fingerprints

- `S25HelpCenter.tsx`: `25822c97baa79b9ea89406ffb8fec91c29d7b717062c1ee5f4e280d2cde14e54` (`+346/-82`)
- `S50ProfileEdit.tsx`: `cd73740a274fca2ba7f99ffef2e727754919e32061fc87fa213b40a7cdc959ca` (`+485/-126`)

## Implemented contract

- S25: exact state/search/panel/handoff/ticket roots; labelled controlled search; grouped six-category results; conditional Clear with focus restoration; article overlays; explicit query-only CIA consent; eight contextual controls; honest `No ticket yet` / `No current SLA`; no-request/no-ticket contact outcome.
- S50: exact profile/form/consent/panel roots; no global tab bar; controlled labelled native form; default 6/8=75% and partial 2/8; clean/dirty/invalid/offline Save discipline; consent-first honest-null avatar and picker preview without file/media capability; dirty-back discard alert; local delete/demographic/copy outcomes.
- Asset disposition remained `HIFI-50-01` honest-null. No raster or synthetic identity was added.

## Worker verification

- Targeted ESLint for both files: exit 0, zero output, including the grouped-result refinement rerun.
- Scoped `git diff --check`: exit 0, zero output.
- Worker did not build, start a server, run a browser, or claim acceptance.
