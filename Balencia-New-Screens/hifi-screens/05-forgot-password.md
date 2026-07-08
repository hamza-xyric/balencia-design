# 05-forgot-password - A+++ hi-fi mobile spec

## Header
- **Source ID:** 05
- **Source spec:** `Balencia-New-Screens/screens/05-forgot-password.md`
- **Evidence:** screens/05-forgot-password.md, work/briefs/05.md, work/drafts/05.md, work/briefs/05.md, Balencia canon, component catalog.
- **Route(s):** `/auth/forgot-password`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Lets a returning member request a password reset link without exposing whether an account exists.
- **Premium Visual Director:** make Forgot password command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Forgot password keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/auth/forgot-password`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
| <                                    |
|                 Balencia             |
|                                      |
|       Reset your *password*          |
|  Enter your email and we'll send     |
|  reset instructions if it matches.   |
|                                      |
| [ email address                   ]  |
| [ send reset link                 ]  |
|                                      |
| success:                             |
|        (check) Check your email       |
| If that email matches an account,    |
| reset instructions will arrive.      |
| [ Back to sign in                 ]  |
| didn't receive it? send again (0:47) |
+--------------------------------------+

Route handling: `/auth/forgot-password`
```

## Focal Hierarchy
- **Dominant focal moment:** Forgot password command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with back chevron. with CIA only when the source supports a synthesized read.
- **Operational layer:** Centered Balencia mark., Default message block or confirmation message block., Email GlassPillInput in default state., Primary CTA..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Figma-backed default: sparse warm-light reset form with white/paper base, peach blush corner atmosphere, rounded email field, and one orange CTA.
- Dark glass remains an optional premium theme variant only; do not add cards, metrics, or CIA modules to the default forgot-password surface.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*password*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Direct Figma alias:** `Forgot password` (canonical copy remains `Forgot password?`).
- **Evidence tier / light-shell exception:** screenshot-derived Figma direction overrides the older compact canon's dark-only note for this auth-family pass.
- **Surface mode:** warm-light auth shell with a rounded back control, top-left title, explanatory body copy, one labeled email field with leading mail icon, and a single full-width orange `Send` CTA.
- **Density correction:** the Figma screen is intentionally sparse. Do not add metrics, illustration cards, or AI/cross-domain claims. Confirmation can reuse the auth congratulations/check badge language only after the request is accepted.

## Components
- **TopBar** - transparent, back chevron with 44px target.
- **GlassPillInput** - email variant with Figma light-auth override: white fill, warm-gray border, 14-16px radius, leading mail glyph, focus border orange.
- **BtnPrimary** - Send reset link / Back to sign in.
- **BtnGhost** - send again and support link.
- **ChargeMeter** - resend cooldown because the timer drains.
- **ChipProvenance** - "you entered" for masked email and "system cooldown" for timer.
- **OfflineBanner, ErrorState, SkeletonState, HonestNullState** - state components.
- **NEW: MaskedDestinationLine** - confirmation line that renders only a masked address and never the raw email.

## Data Honesty
- **Email:** real = user-entered address with `ChipProvenance` "you entered"; low-confidence = invalid format state before submission; honest-null = empty field with no hidden guess.
- **Masked email:** real = generated from submitted input; low-confidence is not applicable; honest-null = generic confirmation if masking fails, never a fabricated address.
- **Resend cooldown:** real = server/local timer with "system cooldown"; low-confidence = missing retry-after, shown as "try again in a few minutes"; honest-null = hidden before any resend attempt.
- **Security:** account existence is never disclosed; identical success framing is used for known and unknown emails.

## Consent and Safety
- Confirmation copy is account-enumeration safe: `If that email matches an account, reset instructions will arrive.`
- Reset email retention, resend cooldown, and rate-limit facts are visible when relevant. No consent checkbox, source chips, revoke, export, or delete claims belong on this unauthenticated reset request.
- Keep navigation targets aligned to `/auth/forgot-password`. Do not add alternate vanity routes.

## States
- **Default:** empty email, CTA disabled until format is valid.
- **Skeleton:** not needed for first paint; confirmation content can skeleton during resend response if network is slow.
- **Empty:** empty email field, no confirmation, no resend row.
- **Error:** invalid format inline; network failure uses ErrorState and keeps form intact.
- **Success:** confirmation replaces form with masked destination and green check.
- **Disabled:** send/resend controls dim to 40 percent for invalid input or cooldown.
- **Offline:** OfflineBanner appears and submit is disabled with reason.

## Motion
- **Tap:** focus email, send request, Back to sign in, resend.
- **Keyboard:** return submits when valid.
- **Transition:** default form crossfades to confirmation; check scales in 150ms.
- **Cooldown:** ChargeMeter drains once per resend window.
- **Reduced-motion:** crossfade becomes instant swap; check scale and cooldown animation become static text.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/forgot-password`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** ink text, muted helper copy, and orange CTA states are checked against the warm-light shell.; **Targets:** back, input, CTA, resend, and support links meet 44px.; **Screen readers:** confirmation announces masked email; cooldown announces start and expiry only.
