# Batch 18 - Reports, Media, Accountability, Social

- Status: `reviewed`
- Screens: 5
- Reviewed: 2026-05-26
- Prototype URL: `http://localhost:3001`
- Visual evidence: `/private/tmp/balencia-b18/*-phone.png`

| ID | Screen | Route | Spec | Status |
| --- | --- | --- | --- | --- |
| 78 | Reports center | `/features/reports` | `../app_design 3/78-reports-center.md` | `reviewed` |
| 80 | Music coach | `/features/music` | `../app_design 3/80-music-coach.md` | `reviewed` |
| 81 | Video library | `/features/videos` | `../app_design 3/81-video-library.md` | `reviewed` |
| 82 | Accountability contract | `/features/accountability-contract` | `../app_design 3/82-accountability-contract.md` | `reviewed` |
| 83 | Social buddy profile | `/features/social-buddy` | `../app_design 3/83-social-buddy-profile.md` | `reviewed` |

## Batch Focus

Validate reports, media recommendations, contract seriousness, and social profile trust.

## Batch Summary

- Ship-ready: None.
- Must-fix: 78 Reports center, 80 Music coach, 81 Video library, 82 Accountability contract, 83 Social buddy profile.
- Redesign candidates: 78 Reports center should be recast around no data export for V1; 82 Accountability contract needs opted-in partner visibility, proof, SIA-read, and consent-renewal controls before it can be treated as a serious commitment surface.
- Resolved decisions:
  - Preserve no data export for V1; reports stay in-app with screenshot-level sharing only.
  - Use honest demo recommendations for Spotify and YouTube; do not imply live sync until integrations exist.
  - Accountability partners see only opted-in contract terms, proof, and check-in status; SIA reads contract/thread data only with explicit consent.

## Screen Notes

### 78 - Reports center

- Five-second read: A polished SIA report-builder surface with a clear privacy promise, recent report cards, and bottom Share/Export PDF actions.
- Primary action clarity: Share and Export PDF are obvious, but they do not open a share sheet, export state, report builder, or preview; report cards also do not open.
- Emotional tone: Professional and reassuring, though the export promise feels premature without a review/permission model.
- Screenshot: `/private/tmp/balencia-b18/features-reports-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 3 | Structured reports are valuable, but this conflicts with the design-direction note that V1 has no data export. |
| User friction | 1 | Users cannot build, preview, share, export, or resume any report from the live route. |
| Visual appeal | 4 | The hero, status pills, and report rows feel premium and readable. |
| Brand fit | 4 | Purple is correctly limited to SIA/report context, with orange reserved for export action. |
| Mobile ergonomics | 3 | Bottom actions are comfortable; the fixed action area means the full report set and weekly summary need scrolling. |
| Accessibility | 2 | Only Share and Export are semantic controls; report cards, back, and statuses are not operable report controls. |
| Trust/privacy | 2 | "Private by default" is stated, but the user cannot review included data, private-note exclusions, recipients, or export scope. |
| Industry best practice | 1 | Report/export surfaces need preview, selection, share-sheet/export states, success/error handling, and revocation or resend clarity. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | product-sense | Screen 78 promises Share and Export PDF, while `Balencia-Design-Direction.md` says no data export for V1 and screenshots are the maximum. | Product and engineering may build a feature that contradicts the current V1 privacy/proprietary-algorithm stance. | Recast this as an in-app report preview with screenshot-level sharing guidance only; remove PDF/data-export promises for V1. | proposed |
| critical | navigation | Live report found `2` buttons, `0` links, and `0` inputs inside the phone frame. Clicking `Share`, `Export PDF`, `Weekly life report`, `Doctor summary`, and `Mission progress export` left `/features/reports` unchanged with `0` dialogs. | Users cannot perform the screen's V1 jobs: preview a report, build/resume a report, or understand why export is not available. | Wire report-card preview/detail, report creation/resume, in-app review states, screenshot guidance, and disabled/removed export states for V1. | proposed |
| major | trust-privacy | The hero states private notes are excluded, but no review screen, data-category picker, or included-data summary is reachable. | Users have to trust the report without seeing exactly what appears in it. | Add an in-app review step that lists included domains, excluded private notes, and edit/remove controls without promising external export. | proposed |

Decision: Must fix before launch; redesign candidate until the V1 report/export scope is decided.

### 80 - Music coach

- Five-second read: A strong music-coaching screen with a now-playing hero, SIA match signal, recommendations, and Spotify CTA.
- Primary action clarity: Playback and Connect Spotify are visually clear but do not change state, route, or open provider flow; playlist cards are static.
- Emotional tone: Focused and premium, with a useful coaching angle rather than generic media browsing.
- Screenshot: `/private/tmp/balencia-b18/features-music-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Music as activity/recovery context fits Balencia's cross-domain coaching promise. |
| User friction | 1 | Users cannot pause, advance, select a playlist, inspect the SIA match, or connect Spotify. |
| Visual appeal | 4 | The hero, progress treatment, and playlist rows are composed and distinctive. |
| Brand fit | 4 | Indigo owns playback context, purple marks SIA, green marks readiness, and orange stays action-oriented. |
| Mobile ergonomics | 3 | Player and bottom CTA hit areas meet the 44px gate; the lower recommendation content sits close to the fixed CTA. |
| Accessibility | 2 | Playback buttons are labeled, but progress is not semantic and playlist/SIA rationale controls are not focusable. |
| Trust/privacy | 2 | Spotify listening data is sensitive context, but the screen does not show scopes, retention, refresh, or data-source management before connect. |
| Industry best practice | 1 | Media surfaces need player state, selection, provider connection states, unavailable playback fallback, and clear external handoff. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | integration-control | Live report found `3` buttons, `0` links, and `0` inputs. Clicking `Pause`, `Next track`, and `Connect Spotify` left `/features/music` unchanged with `0` dialogs and no text/state changes. | Users cannot control playback or connect the provider the screen depends on. | Implement local player state, next/paused states, Spotify OAuth/loading/success/error, expired-token refresh, and a connected "Manage Spotify" state. | proposed |
| major | information-architecture | Clicking `SIA matched`, `Tempo run focus`, `Deep work pulse`, and `Evening downshift` left the route unchanged; recommendation cards are static `div` content. | Users cannot choose a playlist or understand why SIA recommended it. | Make playlist rows semantic buttons that update the player, and make the SIA match pill open a rationale sheet with activity/recovery sources. | proposed |
| major | trust-privacy | The screen says a playlist is synced from Spotify but provides no scope preview, provider status, disconnect path, or link back to Data Sources. | Users may not understand what listening data Balencia can use or how to revoke it. | Add a provider permission sheet before OAuth and a manage-source route/sheet that explains scopes, sync status, retention, and disconnect behavior. | proposed |

Decision: Must fix before launch.

### 81 - Video library

- Five-second read: A curated coaching-video library with search, a strong SIA pick, next-best rows, and a YouTube expansion CTA.
- Primary action clarity: Search, play, video rows, and Search YouTube are clear but inert in the live route.
- Emotional tone: Useful and calm; the curation feels more Balencia than an endless content feed.
- Screenshot: `/private/tmp/balencia-b18/features-videos-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Curated short videos make sense as SIA support for active missions and recovery needs. |
| User friction | 1 | Search, play, list selection, and external search do not work. |
| Visual appeal | 4 | Featured card, play button, and list hierarchy are polished. |
| Brand fit | 4 | Orange drives play/search actions, purple appears only in SIA filtering, and fitness red stays contextual. |
| Mobile ergonomics | 3 | Primary controls are large; the fixed CTA pushes the third video and SIA note below the first viewport. |
| Accessibility | 1 | The search bar is a `div` with `role="search"` instead of an input, and video rows are not semantic controls. |
| Trust/privacy | 3 | The screen is not collecting data directly, but external YouTube search needs query review so private health context is not leaked. |
| Industry best practice | 1 | Search/video libraries need typed search, playable media, rows as buttons, loading/error states, and captions/player fallback. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | retention | Live report found `2` buttons, `0` inputs, and `1` search role `DIV`. Clicking `Play featured video`, `Search YouTube`, `5-minute hip reset`, `Post-run stretch`, and `Calm focus primer` left `/features/videos` unchanged with `0` dialogs. | Users cannot search, play, open, or expand beyond curated videos. | Build real search/filter state, video player modal/fullscreen, row selection, watched/error states, and YouTube handoff with current query. | proposed |
| major | accessibility | Clicking and typing into `Search coaching videos` left `document.activeElement` as `BODY`; no typed query appeared or filtered content. | Keyboard, screen-reader, and search-intent users cannot use the screen's first control. | Replace the static search surface with a labeled input, clear button, live results/no-results state, and accessible result counts. | proposed |
| major | trust-privacy | The featured rationale references left hip tightness, while the external `Search YouTube` CTA has no query review or privacy warning. | Sensitive health/recovery context could be sent to an external platform without the user understanding what query is used. | Show the outgoing search query, strip private journal/body details by default, and confirm external handoff before opening YouTube. | proposed |

Decision: Must fix before launch; the visual structure is strong, but search/player behavior is core to the screen.

### 82 - Accountability contract

- Five-second read: A serious active-contract screen with status pills, verification checks, and a prominent Sign update CTA.
- Primary action clarity: Sign update is dominant, but it does not open a signature sheet or confirm changed terms; verification and partner rows do not open details.
- Emotional tone: Motivating and mature visually, though static signing weakens the seriousness of the commitment.
- Screenshot: `/private/tmp/balencia-b18/features-accountability-contract-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | Social accountability is in V1 scope and this detail surface has a clear reason to exist. |
| User friction | 1 | Users cannot inspect proof, upload/retry, review partner permissions, or sign an update. |
| Visual appeal | 4 | Green contract hero and due-check rows feel premium and readable. |
| Brand fit | 4 | Green owns active/signed state and orange correctly marks due/signing actions. |
| Mobile ergonomics | 3 | Main CTA is comfortable, but the long header title truncates and the privacy card sits below the first viewport behind the signing action. |
| Accessibility | 2 | Only Sign update is a semantic control; verification rows, partner card, and back affordance are static. |
| Trust/privacy | 2 | Partner visibility is mentioned, but there is no consent review, permission sheet, or proof visibility explanation before signing. |
| Industry best practice | 1 | Contracts need explicit terms, confirmation, proof detail/history, due-state handling, and consent/permission auditability. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | trust-privacy | Live report found `1` button, `0` links, and `0` inputs. Clicking `Sign update`, `Morning run proof`, `Weekly review`, `Buddy confirmation`, and `Partners` left `/features/accountability-contract` unchanged with `0` dialogs. | Users cannot review what they are signing, inspect proof requirements, or verify partner visibility. | Add signature confirmation, terms-diff/review, proof detail/upload/history, partner permissions, loading/success/error states, and audit trail copy. | proposed |
| major | information-architecture | The screen shows `Signed`, `2 checks due`, `Consent active`, and an enabled `Sign update` CTA without explaining what changed or why a signature is needed. | The contract can feel ceremonial rather than legally/behaviorally meaningful. | Disable Sign update when no terms changed, or show the pending update summary and require explicit review before signing. | proposed |
| major | mobile-ergonomics | Screenshot evidence shows the title truncated as `Accountability contr...`, while the Partners/privacy explanation is below the first viewport and the Sign update CTA is already visible. | Users may be asked to sign before seeing the privacy boundary that makes the contract trustworthy. | Use a shorter title or adaptive header, move partner/privacy context above the CTA or add a review step, and preserve a clear scroll cue. | proposed |

Decision: Must fix before launch; redesign candidate until the contract consent/signature model is concrete.

### 83 - Social buddy profile

- Five-second read: A trusted buddy profile with strong identity, shared missions, and bottom Privacy/Message actions.
- Primary action clarity: Message and Privacy are obvious but do not route or open controls; Invite buddy and shared missions are also static.
- Emotional tone: Warm, supportive, and appropriately less public-social than a feed profile.
- Screenshot: `/private/tmp/balencia-b18/features-social-buddy-phone.png`

| Dimension | Score | Notes |
| --- | --- | --- |
| Product sense | 4 | A trusted-person detail screen fits optional social accountability without becoming a public profile. |
| User friction | 1 | Messaging, privacy management, invite, shared mission detail, and profile-photo opening are unavailable. |
| Visual appeal | 4 | The buddy hero and shared mission cards are clean and emotionally appropriate. |
| Brand fit | 4 | Relationships pink, SIA purple, trust green, and orange action hierarchy are used with restraint. |
| Mobile ergonomics | 3 | Bottom actions are large; Invite buddy is 40px tall and network controls are pushed below the first viewport. |
| Accessibility | 2 | Mission cards and avatar are static, progress bars lack semantics, and only three buttons are exposed. |
| Trust/privacy | 2 | Trusted/SIA-assisted states and shared progress appear without accessible permission details or SIA visibility controls. |
| Industry best practice | 2 | Social profiles need message routing, privacy controls, shared-context drill-in, invite/report/block paths, and clear relationship state. |

| Severity | Category | Evidence | User Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- |
| critical | navigation | Live report found `3` buttons, `0` links, and `0` inputs. Clicking `Privacy`, `Message`, `Invite buddy`, `Run a half marathon`, `Read 2 books this month`, and the avatar initials `AK` left `/features/social-buddy` unchanged with `0` dialogs. | Users cannot message the buddy, manage visibility, invite, open shared missions, or view the profile image. | Wire Message to Direct Chat, Privacy to a permissions sheet, Invite buddy to contact/invite flow, shared missions to mission detail, and avatar to image/profile preview. | proposed |
| major | trust-privacy | The profile shows `Trusted` and `SIA-assisted` while shared mission progress is visible, but no privacy matrix, SIA-read scope, or report/block control is reachable. | Users may not understand what this buddy can see or how SIA participates in the relationship. | Add buddy visibility controls, SIA-assist opt-in/explanation, report/block entry, and explicit shared-data categories. | proposed |
| major | accessibility | `Invite buddy` measures 139x40, below the 44px touch target gate; mission cards click with focus remaining on `BODY` and progress bars are visual only. | Touch, keyboard, and screen-reader users cannot reliably operate or understand shared mission progress. | Increase Invite buddy to 44px high, make mission cards semantic links/buttons, and expose progress values with accessible labels. | proposed |

Decision: Must fix before launch.

## Verification

- `VISUAL_AUDIT_BASE_URL=http://localhost:3001 VISUAL_AUDIT_SCREENSHOT_DIR=/private/tmp/balencia-b18 npm run verify:visual -- --screenshots`: passed, `41 routes audited`.
- `npm run verify:routes`: passed, `90 screens, 90 specs`.
- `npm run check`: failed during lint on pre-existing generated file `balencia-screens/dev/types/routes.d.ts` for two `@typescript-eslint/no-empty-object-type` errors.
- Targeted visual/interaction report: `/private/tmp/balencia-b18/report-compact.json`.
