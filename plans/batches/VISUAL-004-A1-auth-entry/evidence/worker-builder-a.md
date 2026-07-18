# VISUAL-004 — Builder A evidence

- Packet: `A1-BUILDER-A`
- Agent: native Codex collaboration agent `/root/a1_builder_a`
- Requested worker profile: `gpt-5.6-terra`, high effort
- Exact runtime model/effort provenance: not exposed by the collaboration surface
- Date: 2026-07-10 PKT
- Outcome: implementation complete; packet gates pass; output remains evidence until Sol verifies and accepts it

## Scope and source intake

Read before implementation:

- `plans/batches/VISUAL-004-A1-auth-entry/{BATCH.md,workers/builder-a.md}`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/audit/A1-auth-entry.md`
- `Balencia-New-Screens/build-progress/remediation-2026-07/VISUAL-001/{DECISIONS,REFERENCE-DIRECTION}.md`
- `Balencia-New-Screens/hifi-screens/{01-splash-screen,02-motion-carousel,03b-otp-verification,03c-consent}.md`
- `Balencia-New-Screens/canon/{COMPACT-CANON,COMPONENT-CATALOG}.md`
- root and `balencia-screens/AGENTS.md`
- accepted live sentinel `S03WelcomeSignUp.tsx`
- read-only shared foundation: `buttons.tsx`, `HifiShell.tsx`, `chrome.tsx`, `back-control.tsx`, `surfaces.tsx`, `cia-orb.tsx`, `signature-icons.tsx`, `data.tsx`, `ScreenShell.tsx`, `PhoneFrame.tsx`, and relevant `globals.css` contracts
- relevant installed Next.js 16 docs for Server/Client Components, linking/navigation, and forms
- `frontend-design`, `framer-motion`, and `playwright` skill instructions

Applied tie-breaker: DVF-01 warm-dark and DVF-07 all-caps `CIA` supersede the stale warm-light/Figma-exception and `Cia` language in older auth specs. No source conflict remained after applying that hierarchy.

## Files changed

- `balencia-screens/src/components/hifi/screens/auth/S01Splash.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S02MotionCarousel.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S03bOtpVerification.tsx`
- `balencia-screens/src/components/hifi/screens/auth/S03cConsent.tsx`
- `plans/batches/VISUAL-004-A1-auth-entry/evidence/worker-builder-a.md`

No shared kit, token, registry, route, spec, ledger, handoff, package, asset, `yhealth-app`, Figma, backend, provider, or production-data file was edited.

## Acceptance mapping

### S01 — brand entry

- Uses the official wide `/logos/Frame 2147239943.svg` lockup at a legible mobile scale; it is decorative and unmodified.
- Exposes exactly one concise `role="status"` announcement: `Balencia. Loading.`
- Decorative line/point/lockup reveal uses existing transform/opacity/stroke utilities; the existing reduced-motion contract settles those utilities into their final still.
- No interactive control, generated logo, raster UI, or duplicate accessible brand announcement was added.

### S02 — motion carousel

- Implements four real local panels with distinct connected-life, CIA, example-correlation, and sample-Mission compositions.
- `Next` advances 1→4, becomes `Get started`, and both final/Skip actions route to the existing local sign-up sentinel.
- Exposes visible and live `Slide X of 4` text, a native-button ARIA tablist, selected state, 44px targets, and ArrowLeft/ArrowRight/Home/End keyboard navigation.
- Uses one full-width locked-foundation CTA. Example insight and sample XP are explicitly labelled; no personal-data or implementation-facing carousel claim remains.
- Motion uses Framer Motion transform/opacity only and `useReducedMotion`; shared line/orb motion also resolves through the locked reduced-motion CSS.

### S03b — OTP security gate

- Replaces presentation cells with four native controlled inputs (`inputMode="numeric"`, `maxLength=1`, first `autocomplete="one-time-code"`) at 56×64px and 24px input text.
- First digit receives focus; typing advances; ArrowLeft/Right navigate; Backspace clears/steps back; a pasted four-digit code fills the cluster.
- Keeps the destination masked and account-neutral. Resend is a real disabled button while the honest ChargeMeter/local-clock cooldown is active.
- Full-width Verify is disabled until four digits, width-locked while loading, and ends in explicit local-prototype/no-send feedback.
- Deterministic hash evidence states: `#partial`, `#loading`, `#invalid`, `#expired`, `#rate-limited`, `#resend-success`, `#offline`, and `#success`; root state is exposed as `[data-otp-state]`.
- Invalid/expired states use text plus a solid border, not animated success-like glow; rate-limit, offline, resend, and success copy do not enumerate accounts or imply a real backend result.

### S03c — legal consent gate

- Replaces ARIA-styled div/span controls with two native required checkboxes and one native checkbox with `role="switch"`; all begin false.
- Associated labels/rows provide 44px+ hit areas and the existing authored focus ring. Optional marketing uses a neutral card and remains less visually salient than the required legal gate.
- Terms and Privacy are separate real links to `/legal/terms` and `/legal/privacy`; activating a document link is separate from changing consent.
- Count derives from local checkbox state (`0 of 2 required` → `2 of 2 ready`); the full-width Continue action remains disabled until both required consents are explicit.
- Submission is local-only, width-locked while loading, and ends in explicit `No data was sent` feedback.
- Deterministic hash evidence states: `#partial`, `#ready`, `#loading`, `#success`, and `#offline`; state is exposed on `form[data-consent-state]` and the screen root.

## Verification

| Command/check | Result |
|---|---|
| `npm run typecheck` | PASS. An earlier run briefly stopped on in-flight Builder-B-owned `S04SignIn.tsx:61` TS2367; no unowned fix was made, and the integrated rerun passed. |
| `npm run verify:copy` | PASS — 384 files scanned. |
| `npm run verify:brand` | PASS — 384 files scanned. |
| `npx eslint <four owned screens>` | PASS — no warning/error output. |
| `git diff --check -- <four owned screens>` | PASS — no whitespace errors. |
| Live Playwright pass at `http://localhost:3001` | PASS for S01 default; S02 Next and End-key navigation through final Get started; S03b initial focus/typing advance and invalid fixture; S03c 0→1→2 gate, loading, and local success. Current session console: 0 errors, 0 warnings. |

## Root-owned evidence still needed

- Run the batch interaction verifier against every Builder-A hash fixture with reduced motion and capture only the 390×844 phone frame.
- Capture S01 reduced final still; S02 panels 1–4; S03b default plus eight fixture states; S03c default/partial/ready/loading/offline/success.
- Confirm computed CTA normal/hover/pressed contrast, focus appearance, full-width geometry, target sizes, no initial clipping, and reduced-motion computed styles in the integrated harness.
- Re-run full `npm run check`, build, strict eight-screen capture, root validator, and independent design/accessibility/trust review before Sol acceptance.

## Blockers and residuals

- No Builder-A blocker remains.
- Browser/device AT, enlarged-text, broad Axe, immutable exact runtime provenance, full build, and family acceptance remain root/R11 gates; this worker does not claim them.
- Tool-generated `.playwright-cli/` snapshots were used only for transient local inspection and are not part of this packet evidence or requested commit scope.
