# P18 - Reports, Media, Accountability, Social

- Status: `closed`
- Screens: `78`, `80`, `81`, `82`, `83`
- Routes: `/features/reports`, `/features/music`, `/features/videos`, `/features/accountability-contract`, `/features/social-buddy`
- Sources: `../batches/batch-18.md`, `../update-batches/batch-u09.md`
- Build gate: required

## Focus

Verify late-stage utility/social surfaces are honest about integrations, no-export V1, and partner visibility.

## Review Checklist

- Confirm reports stay in-app with screenshot-level sharing only.
- Confirm music/video show demo/provider-ready states without implying live sync.
- Confirm accountability contract and buddy profile expose partner visibility, SIA-read consent, report/block, and shared-data categories.

## Required Close Evidence

- Browser QA for report review, media provider states, contract signing/update, buddy privacy/message/invite/report flows.
- `npm run check` and `npm run build` results.

## Close Summary (Wave 3, 2026-05-27)

R18-F01 through R18-F04 inspected against current source — all addressed in prior implementation passes:

- 78 Reports center (R18-F01): report-preview dismiss is `h-11 w-11` (44x44). V1 stays in-app — bottom actions are `Screenshot` (variant ghost) + `Review data`, with explicit "V1 does not export PDFs or raw data" copy in the share sheet and an included-data review with private notes excluded by default.
- 80 Music coach (R18-F02): a dedicated pre-connect Spotify permission preview sheet now lists scopes (read-only playlist, recent listening, playback handoff), sync window (open + every 6 hours), stored fields (playlist IDs, tempo/mood tags, fit summaries), and explicit controls (disconnect, delete from Data Sources, revoke at Spotify). `Allow Spotify` is the only path that proceeds to OAuth.
- 81 Video library (R18-F03): clear-search button and video-player close are both `h-11 w-11` (44x44). YouTube handoff shows the outgoing query with a "private details stripped by default" notice and a Cancel/Continue confirmation.
- 82 Accountability contract: `Sign update` is disabled until a `Pending update` is toggled on; review sheet shows the term diff and partner-visibility scope; signed sheet writes to the audit-trail copy. Partner card and audit-trail entry are surfaced above the CTA.
- 83 Social buddy profile (R18-F04): `Invite buddy` and `Report` buttons carry `className="min-h-11"` (44px+). Privacy sheet exposes shared-data categories (missions, accountability proof, SIA-read consent).

Verification: `npm run check` and `npm run build` both passed (build emitted 96 static pages with only the non-failing Node `DEP0205` tooling deprecation warning). Headless Playwright capture (`scripts/capture-p16-p18-states.mjs`, evidence at `balencia-screens/output/p16-p18-states/evidence.json`) ran all five P18 routes with **0 page errors and 0 console warnings**. Targeted size evidence: reports preview-close = 44 × 44 (R18-F01); videos clear-search = 44 × 44 and video-player close = 44 × 44 (R18-F03); social-buddy Invite buddy = 149.5 × 44 and Report = 149.5 × 44 (R18-F04). Music coach Spotify pre-connect preview → Allow Spotify → connected status was exercised end-to-end (R18-F02).
