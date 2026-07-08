# 03e-whatsapp-enrollment - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03e
- **Source spec:** `Balencia-New-Screens/screens/03e-whatsapp-enrollment.md`
- **Evidence:** screens/03e-whatsapp-enrollment.md, work/briefs/03e.md, work/drafts/03e.md, work/briefs/03e.md, Balencia canon, component catalog.
- **Route(s):** `/onboarding`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Offers an optional WhatsApp coaching channel for reminders, check-ins, and CIA tips.
- **Premium Visual Director:** make WhatsApp enrollment command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** WhatsApp enrollment keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+--------------------------------------+
|                              skip    |
|                 Balencia             |
|                                      |
|        Get CIA on *WhatsApp*         |
|  Reminders and check-ins in chat.    |
|                                      |
| +----------------------------------+ |
| | You can turn this off in Settings | |
| | or reply STOP. [data controls]    | |
| +----------------------------------+ |
| [+1 v] [ phone number             ] |
| [ send code                      ]  |
| - daily reminders                  |
| - check-in prompts                 |
| - CIA coaching tips                |
|                                      |
| phase 2: [1][2][3][4][5][6]        |
| resend code (0:47) [######----]     |
+--------------------------------------+

Route handling: `/onboarding`
```

## Focal Hierarchy
- **Dominant focal moment:** WhatsApp enrollment command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Skip link and optional phase-2 back chevron. with CIA only when the source supports a synthesized read.
- **Operational layer:** Brand symbol., Value proposition and privacy reassurance., Consent/control card., Phase 1 phone input.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*enrollment*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** - phase 2 back chevron; phase 1 uses only skip.
- **GlassPillInput** - phone and OTP cell material.
- **Sheet** - country code picker.
- **BtnPrimary** - send code / verify code.
- **BtnGhost** - skip and resend.
- **ChargeMeter** - resend countdown.
- **ConsentCard** - WhatsApp channel data controls before phone entry.
- **ChipProvenance** - phone source "you entered", timer source "system cooldown."
- **OfflineBanner, ErrorState, SkeletonState, HonestNullState** - state components.
- **NEW: OTPCluster6** - six-cell code entry adapted from the OTP pattern for SMS verification.

## Data Honesty
- **Phone number:** real = member input with `ChipProvenance` "you entered"; low-confidence = locally valid but server not yet verified; honest-null = empty phone field.
- **Masked phone:** real = generated from the submitted number; low-confidence = pending SMS delivery; honest-null = generic "your phone" if mask cannot be built.
- **SMS code:** real = six user-entered digits verified by backend; low-confidence is not applicable after server response; honest-null = empty cells.
- **Resend and spam cooldowns:** real = server/local timers; low-confidence = missing retry-after, generic wait copy; honest-null = hidden before first code send.
- **WhatsApp controls:** data category = phone and message channel; source = user-entered phone and WhatsApp delivery events; scope = reminders, check-ins, CIA tips; retention = until revoke or account deletion; export, revoke, delete phone, and STOP instructions are visible before collection.

## Consent and Safety
- WhatsApp enrollment keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- WhatsApp enrollment exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/onboarding`. Do not add alternate vanity routes.

## States
- **Default:** phase 1, empty phone, skip visible, CTA disabled until valid phone.
- **Skeleton:** SMS delivery and verification preserve input geometry with shimmer; no fake code.
- **Empty:** no phone or code entered; ConsentCard still visible.
- **Error:** invalid phone, send fail, invalid code, expired code, network fail, and spam lockout use plain copy.
- **Success:** verify CTA flashes `--glow-done`, then routes to [07].
- **Disabled:** send/verify/resend dim to 40 percent during invalid input, loading, cooldown, or lockout.
- **Offline:** phone/code values persist; network actions disabled; skip remains active.

## Motion
- **Phase transition:** phone entry crossfades to code entry; brand mark stays fixed.
- **OTP:** auto-advance, backspace, paste six digits, and tap-to-focus are supported.
- **Country code:** picker opens as a searchable Sheet.
- **Resend:** ChargeMeter drains; resend flash confirms new code sent.
- **Haptics:** light on digit entry, medium on verified, none on disabled controls.
- **Reduced-motion:** crossfade becomes instant swap; countdown ring becomes text-only.

## Image Slots
- `HIFI-03e-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: WhatsApp enrollment provider-neutral WhatsApp status art, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/onboarding`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper text and orange controls clear AA+ against warm dark surfaces.; **Targets:** skip, back, country picker, phone field, OTP cells, resend, and CTA meet 44px.; **Screen readers:** OTP cells announce "digit N of 6"; ConsentCard summarizes opt-out, revoke, retention, export, and delete controls.
