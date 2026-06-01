# CP-10 — P3 restraint pass

- Status: `not started`
- Package: `empty-system` (minimal)
- Session cap: documentation — typically no generation
- Registry filter: `production_batch = CP-10`

Confirm each screen stays visually quiet per creative-opportunities P3 guidance.

## Screens in scope

| ID | Screen | Route | Placement |
| --- | --- | --- | --- |
| 03b | OTP verification | `/auth/otp` | None beyond input/state polish |
| 03c | Consent | `/auth/consent` | Legal/status icons only |
| 03d | Complete profile | `/auth/complete-profile` | Tiny SIA/trust marker only if needed |
| 05b | Reset password | `/auth/reset-password` | Minimal security iconography |
| 21 | Settings | `/tabs/me/settings` | Icons only |
| 50 | Profile edit | `/tabs/me/profile-edit` | Avatar/photo picker only |
| 64 | Report / block | `/features/report-block` | Neutral safety icon only |
| 69 | App rating | `/features/app-rating` | Star micro-interactions only |

## Brief checklist

| Brief ID | Screen | Route | Decision | Status |
| --- | --- | --- | --- | --- |
| CRE-03b | 03b | `/auth/otp` | no_asset | not_started |
| CRE-03c | 03c | `/auth/consent` | icons_only | not_started |
| CRE-03d | 03d | `/auth/complete-profile` | minimal | not_started |
| CRE-05b | 05b | `/auth/reset-password` | minimal | not_started |
| CRE-21 | 21 | `/tabs/me/settings` | icons_only | not_started |
| CRE-50 | 50 | `/tabs/me/profile-edit` | picker_only | not_started |
| CRE-64 | 64 | `/features/report-block` | neutral_icon | not_started |
| CRE-69 | 69 | `/features/app-rating` | micro_only | not_started |

## Session summary

- Documented no-asset confirmations:
- Exceptions approved by user:

## Completion gate

- [ ] Every P3 screen has explicit `no_asset`, `icons_only`, or `minimal` decision in this file
- [ ] No Higgsfield jobs required unless user approves an exception
- [ ] Status → `session-closed`
