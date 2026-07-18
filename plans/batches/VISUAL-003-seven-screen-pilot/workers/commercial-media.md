# VISUAL-003 worker packet — commercial and media

- Packet status: `completed; Sol accepted after integrated verification`
- Parent batch: `VISUAL-003-seven-screen-pilot`
- Packet ID: `PILOT-COMMERCIAL-MEDIA`
- Issued by: Codex root / Sol
- Worker profile: native Codex collaboration worker
- Worker harness: Codex agent thread
- Model-routing policy: `gpt56-tiered`
- Worker agent type: implementation worker
- Worker model / effort: requested `gpt-5.6-terra` / high; actual model is not selectable or exposed
- Runtime intake source: `../BATCH.md`
- Source hierarchy: root/lane guidance plus `VISUAL-001/REFERENCE-DIRECTION.md`, DVF-02 and DVF-09
- Tie-breaker: latest decisions/reference contract → live screen code → current hifi spec/canon
- Active root: `balencia-screens/`
- Verify command: `npm run typecheck` after the shared foundation is present
- Evidence path: `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-commercial-media.md`
- Timeout / stop condition: one bounded turn; stop on shared API conflict, billing/provider truth conflict, or need for an unlisted file

## Exact scope

Implement only pilot screens 43 and 80 against the Sol-owned shared foundation and root-owned HIFI-80-01 asset.

## Required sources

- `VISUAL-001/REFERENCE-DIRECTION.md`, DVF-02/DVF-09
- `hifi-screens/{43-paywall-upgrade,80-music-coach}.md`
- audits `D2-profile-commercial.md`, `I1-system-media.md`
- current two screen files and current shared kit APIs

## Allowed files

| Path | Operation |
|---|---|
| `balencia-screens/src/components/hifi/screens/profile/S43Paywall.tsx` | edit |
| `balencia-screens/src/components/hifi/screens/system/S80MusicCoach.tsx` | edit |
| `plans/batches/VISUAL-003-seven-screen-pilot/evidence/worker-commercial-media.md` | write evidence |

Stage only these files under `/Users/hamza/Marketing Portal/.codex-staging/balencia-design/`, edit via `apply_patch`, and copy back with approved `rsync -aR`. Do not touch another staging file.

## Required outcomes

- S43: use Sol's canonical PaywallLock over a real attempted-feature layout; truthful Free/Plus/Pro values; do not promise a trial unless eligibility is explicit; visible price provenance and cancellation; correct close icon; `Maybe later` is an equal 44px exit; CTA uses accepted foundation.
- S80: connected state ends in `Manage Spotify`; Connect is not shown; waveform is a semantic seek control or has an equivalent operable alternative; provider source/freshness and export/revoke/disconnect/delete remain reachable; preserve W-TRUNC-80 text; use root-owned `HIFI-80-01` abstract art without generating or altering a logo.
- Preserve warm-dark 390×844 authority, all-caps `CIA`, and provider/billing honesty.

## Denied actions

- No shared kit, token, PaywallLock implementation, asset generation/edit, spec, ledger, handoff, Figma, Railway, API/backend, billing integration, or `yhealth-app` edit.
- No final monetization/privacy/readiness decision.
- Do not commit, stage, reset, stash, clean, format unrelated files, or spawn another worker.

## Output

Write a concise evidence file naming files read/changed, requirements addressed, verify result, remaining issues, and stop conditions. Worker output is evidence until Sol reviews it.
