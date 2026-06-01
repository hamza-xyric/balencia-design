# CP-09 — Provider and legal marks

- Status: `not started`
- Package: `provider-logo`
- Session cap: sourcing only — **no Higgsfield generation**
- Registry filter: `production_batch = CP-09`

## Screens in scope

| ID | Screen | Route | Placement |
| --- | --- | --- | --- |
| 03 | Sign up | `/auth/sign-up` | Official OAuth marks only |
| 03e | WhatsApp enrollment | `/auth/whatsapp` | WhatsApp mark + optional mini illustration |
| 04 | Sign in | `/auth/sign-in` | Official OAuth marks only |
| 22 | Connected services | `/tabs/me/connected-services` | Provider logos and status |
| 84 | Data sources | `/tabs/me/data-sources` | Provider logos, source-health |

## Decision gates

- [x] **CQ05** resolved: official marks only; Data Sources (84) may use clearly marked **demo / no live sync** placeholders alongside real provider logos

## Asset sourcing checklist

| Provider | Asset | Source | License note | Status |
| --- | --- | --- | --- | --- |
| Google | Sign-in button mark | Official brand resources |  | not_started |
| Apple | Sign in with Apple | Official HIG assets |  | not_started |
| WhatsApp | Channel mark | Meta brand guidelines |  | not_started |
| Spotify | Logo (if shown) | Spotify brand guidelines |  | not_started |
| YouTube | Logo (if shown) | Google brand |  | not_started |
| WHOOP / Health | Logo (if shown) | Partner guidelines |  | not_started |

## Brief checklist

| Brief ID | Screen | Route | Asset type | Status |
| --- | --- | --- | --- | --- |
| CRE-03-oauth | 03, 04 | `/auth/sign-up`, `/auth/sign-in` | official-mark | not_started |
| CRE-03e-whatsapp | 03e | `/auth/whatsapp` | official-mark | not_started |
| CRE-22-connected | 22 | `/tabs/me/connected-services` | official-mark | not_started |
| CRE-84-sources | 84 | `/tabs/me/data-sources` | official-mark | not_started |
| CRE-84-demo-placeholder | 84 | `/tabs/me/data-sources` | illustration | not_started |

## Session summary

- Accepted paths (store under `outputs/provider-logo/`):
- Deferred:

## Completion gate

- [ ] No AI-generated logos used
- [ ] License notes recorded in accepted-assets ledger
- [ ] Status → `session-closed`
