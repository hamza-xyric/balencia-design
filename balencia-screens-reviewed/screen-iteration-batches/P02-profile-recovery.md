# P02 - Profile And Recovery

- Status: `implemented`
- Screens: `03d`, `03e`, `04`, `05`, `05b`
- Routes: `/auth/complete-profile`, `/auth/whatsapp`, `/auth/sign-in`, `/auth/forgot-password`, `/auth/reset-password`
- Sources: `../batches/batch-02.md`, `../update-batches/batch-u01.md`
- Build gate: no

## Focus

Verify optional profile collection, WhatsApp trust copy, sign-in persistence, and account recovery states after the P00 build fix.

## Review Checklist

- Confirm DOB/gender do not block first SIA value.
- Confirm WhatsApp is clearly optional, explains frequency/STOP/settings, and supports skip.
- Confirm sign-in, forgot password, reset password, expired link, and success states are reachable and respectful.

## Required Close Evidence

- Browser QA notes for the normal and expired reset-password paths.
- Any recovery-flow friction findings.
- `npm run check` result.

## Changed Files

- `balencia-screens/src/app/auth/complete-profile/page.tsx`
- `balencia-screens/src/app/auth/whatsapp/page.tsx`
- `balencia-screens/src/app/auth/sign-in/page.tsx`
- `balencia-screens/src/app/auth/forgot-password/page.tsx`
- `balencia-screens/src/app/auth/reset-password/page.tsx`
- `balencia-screens/src/components/design-system/Input.tsx`
- `balencia-screens/src/components/design-system/ToggleSwitch.tsx`
- `balencia-screens/src/app/legal/terms/page.tsx` - verification-gate copy fix from `goals` to `missions`.

## Findings Addressed

- B02-F01/B02-F02: Complete Profile no longer makes DOB/gender block the path to Consent; empty Continue and Skip both proceed, while optional filled details remain editable and validated.
- B02-F03/B02-F04: WhatsApp keeps explicit optionality/frequency/STOP/settings copy, supports Skip, phone entry, verification, a phase-back control, resend feedback, and 46x48 code targets.
- B02-F05/B02-F06/B02-F07: Sign In keeps Remember me off by default, row toggling now visibly updates the switch, valid credentials route to Today, and recovery/social paths remain reachable.
- B02-F08/B02-F09: Forgot Password shows masked-email confirmation, resend/sent/cooldown feedback, Back to sign in, and an accessible Back button.
- B02-F10: Reset Password validates requirements live, enables valid matching passwords, shows success, and supports expired-link recovery.
- Shared P02 form controls: password visibility now toggles the controlled field value without duplicate hidden inputs; controlled switches now reflect parent state.

## Findings Deferred

- None for P02. No recovery-flow friction remained after route QA.

## Browser QA Evidence

- Local URL: `http://localhost:3005` (existing dev server for `balencia-screens`; port `3006` was not used after Next reported an active `3005` server).
- Screenshots saved under `balencia-screens/output/playwright/`:
  - `p02-complete-profile-post.png`
  - `p02-whatsapp-phone-post.png`
  - `p02-whatsapp-verify-post.png`
  - `p02-sign-in-post.png`
  - `p02-forgot-password-post.png`
  - `p02-forgot-password-confirmed-post.png`
  - `p02-reset-password-post.png`
  - `p02-reset-password-success-post.png`
  - `p02-reset-password-expired-post.png`
- Route QA passed with no console errors:
  - `/auth/complete-profile`: empty Continue navigates to Consent; valid DOB/gender submit also navigates to Consent.
  - `/auth/whatsapp`: Skip navigates to SIA onboarding; Send code opens verification; phase back returns to phone entry; six-digit Verify navigates to SIA onboarding.
  - `/auth/sign-in`: Remember me defaults off and toggles on; valid sign-in navigates to Today; Forgot password navigates to recovery.
  - `/auth/forgot-password`: valid email shows Check your email with masked address; resend shows Sent feedback; Back to sign in navigates.
  - `/auth/reset-password`: valid matching password enables Reset password; success state appears; Back to sign in navigates.
  - `/auth/reset-password?state=expired`: Request new link navigates to Forgot Password; Back to sign in navigates.

## Verification Results

- `npm run check` in `balencia-screens`: passed on 2026-05-26.
  - Lint passed.
  - Typecheck passed.
  - `verify:routes` passed: 90 screens, 90 specs.
  - `verify:assets` passed: 14 logo assets.
  - `verify:copy` passed: 170 files scanned.
  - `verify:brand` passed: 170 files scanned.
- Build gate: not required for P02; `npm run build` not run.

## Final Audit Follow-up - 2026-05-26

- Final cross-batch audit clarified the Complete Profile spec contract so DOB/gender remain optional before first SIA value; empty Continue and Skip must not block social-auth users.
- Final implementation polish replaced the Sign In Remember me nested switch/input pattern with a single 44px row-level `role="switch"` control, expanded Sign In/Guest Preview inline auth links, and enlarged Profile Edit field targets.
- Final browser load evidence: `/auth/complete-profile`, `/auth/whatsapp`, `/auth/sign-in`, `/auth/forgot-password`, and `/auth/reset-password` loaded with zero console errors, zero practical sub-44 targets, zero nested controls, and no bottom/home-indicator overlap in `balencia-screens/output/final-audit/route-load-results.json`.
