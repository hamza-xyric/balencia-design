# P01 - Auth Entry And Consent

- Status: `implemented`
- Screens: `01`, `02`, `03`, `03b`, `03c`
- Routes: `/auth/splash`, `/auth/carousel`, `/auth/sign-up`, `/auth/otp`, `/auth/consent`
- Sources: `../batches/batch-01.md`, `../update-batches/batch-u01.md`
- Build gate: no

## Focus

Verify first-run trust and conversion. The flow should feel premium, minimal, and safe before the user meets SIA.

## Review Checklist

- Confirm splash brand treatment, carousel progression, sign-up validation, OTP entry, consent defaults, and legal-link behavior.
- Check five-second clarity, primary action state, 44px touch targets, keyboard behavior, reduced friction, and privacy copy.
- Decide whether the deferred minor splash symbol-first reveal still matters after the creative splash work.

## Required Close Evidence

- Route-load/browser QA notes for every screen.
- Findings addressed or deferred, especially B01-F01 if it remains deferred.
- `npm run check` result.

## Closeout - 2026-05-26

### Changed Files

- `balencia-screens/src/app/auth/splash/page.tsx`
- `balencia-screens/src/app/auth/carousel/page.tsx`
- `balencia-screens/src/app/auth/otp/page.tsx`
- `balencia-screens/src/app/auth/consent/page.tsx`
- `balencia-screens/src/app/legal/_components/LegalPolicyPage.tsx`
- `balencia-screens/src/app/legal/terms/page.tsx`
- `balencia-screens/src/app/legal/privacy/page.tsx`

### Findings Addressed

- B01-F01: resolved the splash brand-fidelity follow-up with a symbol-first 72px hero, stroke reveal, glow, and delayed wordmark confirmation.
- B01-F02: verified carousel Next advances panels, dots update, Get started routes to `/auth/sign-up`, and Skip has a 44px-safe target and routes to `/auth/sign-up`.
- B01-F03/B01-F04/B01-F05: verified sign-up remains minimal, validation-gated, uses polished provider marks, and routes valid submission to `/auth/otp`.
- B01-F06: OTP now autofocuses the first digit, supports numeric entry/paste/backspace, disables Verify until complete, and uses a real disabled resend cooldown.
- B01-F07/B01-F08: consent required boxes default unchecked, full non-link rows toggle at 52px height, Continue stays disabled until both are accepted, optional email is off by default with a full-row switch target, and legal links open in-app policy views.

### Findings Deferred

- None for P01.

### Browser QA Evidence

- Browser backend note: Codex in-app browser `iab` was unavailable, so targeted QA used the Playwright CLI fallback against `http://localhost:3005`.
- `/auth/splash`: loaded without console errors; verified premium symbol-first brand treatment and no interactive target requirements. Screenshot artifact: `balencia-screens/output/playwright/p01/splash.png`.
- `/auth/carousel`: loaded without console errors; verified first panel clarity, Next progression through all four panels, final Get started navigation to `/auth/sign-up`, and Skip navigation to `/auth/sign-up`.
- `/auth/sign-up`: loaded without console errors; verified email/password-only account creation, disabled Sign up until valid inputs, password visibility control, Google/Apple labels, and valid submit navigation to `/auth/otp`.
- `/auth/otp`: loaded without console errors; verified first digit autofocus, per-digit entry and focus advance, Verify disabled until four digits, countdown resend disabled state, and Verify navigation to `/auth/consent`.
- `/auth/consent`: loaded without console errors; verified required consents start unchecked, row-level checkbox toggles, legal links open `/legal/terms` and `/legal/privacy`, optional email switch toggles from the row, Continue enables only after both required consents and routes to `/auth/whatsapp`.
- Legal link behavior: `/legal/terms` and `/legal/privacy` return 200 and render in-app policy views with Back controls.

### Verification Results

- `npm run check` from `balencia-screens`: passed.
- Build gate: not run; P01 build gate is `no`.

## Final Audit Follow-up - 2026-05-26

- Final cross-batch audit corrected stale Sign up spec contract language so B01-F04 no longer implies restoring DOB/gender to account creation after resolved decisions Q06/Q08.
- Final implementation polish expanded Sign up inline/legal links to practical 44px touch targets.
- Final browser load evidence: `/auth/splash`, `/auth/carousel`, `/auth/sign-up`, `/auth/otp`, and `/auth/consent` loaded with zero console errors, zero practical sub-44 targets, zero nested controls, and no bottom/home-indicator overlap in `balencia-screens/output/final-audit/route-load-results.json`.
