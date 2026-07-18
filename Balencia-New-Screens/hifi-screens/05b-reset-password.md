# 05b-reset-password - A+++ hi-fi mobile spec

## Header
- **Source ID:** 05b
- **Source spec:** `Balencia-New-Screens/screens/05b-reset-password.md`
- **Evidence:** screens/05b-reset-password.md, work/briefs/05b.md, work/drafts/05b.md, work/briefs/05b.md, Balencia canon, component catalog.
- **Route(s):** `/auth/reset-password`, `/reset-password`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Handles the deep-linked password reset token, validates it, lets the member create a new password, and returns them to Sign in [04].
- **Premium Visual Director:** make Reset password command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Reset password keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/auth/reset-password`, `/reset-password`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|                 Balencia             |
|                                      |
|        Set a new *password*          |
|  Choose something strong and unique. |
|                                      |
| [ new password                 eye ] |
| [ confirm password             eye ] |
|  - 8+ characters                    |
|  - uppercase letter                  |
|  - lowercase letter                  |
|  - number                            |
|  - special character                 |
| [ Reset password                  ]  |
| Back to sign in                      |
|                                      |
| expired: request new link            |
+--------------------------------------+

Route handling: `/auth/reset-password`, `/reset-password`
```

## Focal Hierarchy
- **Dominant focal moment:** Reset password command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Status bar and centered Balencia mark. with CIA only when the source supports a synthesized read.
- **Operational layer:** Token-validation status message., Password form, Requirement checklist., Match status..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: warm-light reset form with white/paper base, blush corner atmosphere, rounded password fields, orange strength line, privacy/security footer, and orange CTA.
- Dark glass remains an optional premium theme variant only; the Figma-aligned default should match the auth/reset family.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*password*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma aliases:** `Reset Password` and reset success `Congratulations`.
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for this auth-family pass.
- **Surface mode:** warm-light auth shell, rounded back control, left-aligned title, token validation status, then password and confirm-password fields with leading lock icons and password-eye toggles. OTP reset is a separate variant handled by [03b], not the default token-based reset route.
- **Strength language:** include the Figma orange strength rule line (`Password strength: Strong`) and a privacy/security footer, not a checked consent row. On success, transition to the orange scalloped check badge and `Back to log in` CTA.

## Components
- **GlassPillInput** - password and confirm variants with Figma light-auth override: white fill, warm-gray border, leading lock glyph, trailing eye toggle, 14-16px radius.
- **NEW: PrivacyFooter - rationale:** concise token/security note with privacy link; no existing catalog footer matches this legal/auth micro-copy treatment.
- **BtnPrimary** - Reset password / Request new link / Back to sign in.
- **BtnGhost** - secondary Back to sign in.
- **ProgressBar** - requirement completion, optional in high density.
- **ChipProvenance** - "typed live" for strength rules, "server token" for validation status.
- **ErrorState, SkeletonState, HonestNullState, OfflineBanner** - state components.
- **NEW: PasswordRequirementList** - five deterministic rule rows with icon, label, and met/unmet state.

## Data Honesty
- **Reset token:** real = server validation success with `ChipProvenance` "server token"; low-confidence = validation pending, no form enabled; honest-null = missing token, terminal recovery state. Token value never renders.
- **Password strength:** real = deterministic local rules with "typed live"; low-confidence is not applicable; honest-null = empty password with no strength score.
- **Password match:** real = exact equality; low-confidence is not applicable; honest-null = confirm field empty.
- **Rate limit:** real = server retry-after countdown; low-confidence = no retry-after value, generic paused copy; honest-null = no rate limit.

## Consent and Safety
- Token validation status names only `valid`, `expired`, `invalid`, or `missing`; token value never renders or appears in analytics.
- Password strength provenance is local `typed live`; token validation is server-side. No broad source chips, export, revoke, or delete claims belong on this reset route.
- Keep navigation targets aligned to `/auth/reset-password`, `/reset-password`. Do not add alternate vanity routes.

## States
- **Default:** valid token, empty fields, CTA disabled until all rules and match pass.
- **Skeleton:** validation status holds the layout while token check resolves; no fake token state.
- **Empty:** missing token or empty fields show HonestNullState copy and recovery link.
- **Error:** invalid token, expired token, network failure, mismatch, weak password, and rate limit are separate states.
- **Success:** terminal success icon with `--glow-done` and "Back to sign in."
- **Disabled:** CTA and inputs dim during token validation, submit, or rate-limit cooldown.
- **Offline:** fields stay editable but submit is disabled with OfflineBanner.

## Motion
- **Typing:** requirement rows crossfade between unmet and met in 160ms.
- **Reveal:** eye toggle swaps masked/unmasked text with no layout shift.
- **Submit:** CTA locks width, spinner replaces label, success terminal crossfades in.
- **Expired:** warning state fades in without bounce to avoid alarm.
- **Reduced-motion:** checklist, crossfades, and success glow become instant state changes.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/reset-password`, `/reset-password`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text and muted helper copy must pass against the warm-light shell; orange strength and CTA states need non-color labels.; **Targets:** inputs, eye toggles, CTAs, checkbox, and links meet 44px minimum.; **Screen readers:** each requirement announces met/unmet; token status is a polite live region.
