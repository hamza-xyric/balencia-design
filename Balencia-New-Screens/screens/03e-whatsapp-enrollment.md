# 03e-whatsapp-enrollment - hi-fi glass spec

### 1. Header
- **ID:** 03e
- **Name:** WhatsApp enrollment
- **Route(s) covered:** No live route; optional pre-auth WhatsApp enrollment step before `/onboarding`.
- **Tab:** None; onboarding stack.
- **Source:** `work/briefs/03e.md`, Balencia canon, component catalog.
- **Batch:** 3

### 2. Purpose
Offers an optional WhatsApp coaching channel for reminders, check-ins, and CIA tips. The screen must prove the channel is controllable before asking for a phone number: users can skip, reply STOP later, revoke in Settings, and continue onboarding either way.

### 3. Entry & exit
- **Entry:** stack push from Consent [03c] when WhatsApp coaching is selected or suggested.
- **Primary exit:** verified phone number routes to CIA onboarding [07].
- **Secondary exit:** skip routes to CIA onboarding [07] with WhatsApp disabled.
- **Phase exit:** phase 2 back returns to phone entry without losing the number.
- **Failure exit:** network, invalid code, expired code, and spam lockout stay in flow with retry or skip.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Skip link and optional phase-2 back chevron.
2. Brand symbol.
3. Value proposition and privacy reassurance.
4. Consent/control card.
5. Phase 1 phone input: country code + phone number.
6. Phase 2 code input: six OTP cells and resend ChargeMeter.
7. Primary CTA.
8. Value preview list.

**ASCII wireframe (390x844):**
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
```

### 5. Components
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

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` warm base, mandatory orange radial glow, 3-4 percent grain.
- **Glass:** ConsentCard uses frost because it carries the privacy ask; inputs use `.glass-pill`; value preview uses SolidCard rows.
- **Semantic glows:** `--glow-you #FF5E00` on active phone/code entry and send/verify CTA; `--glow-cia #7F24FF` on the CIA channel explanation; `--glow-done #34A853` only when verification succeeds.
- **Type:** heading uses Tiempos italic on *WhatsApp*.
- **No coercion:** skip has equal reachability even when visually quieter.

### 7. Content & copy
- **Skip:** "skip"
- **Phase 1 heading:** "Get CIA on *WhatsApp*"
- **Subtitle:** "Reminders, check-ins, and coaching tips in your chat."
- **Control copy:** "You can turn this off in Settings, or reply STOP."
- **Phone placeholder:** "phone number"
- **CTA phase 1:** "send code"
- **Phase 2 heading:** "Enter the code"
- **Phase 2 subtitle:** "We sent a 6-digit code to +1 *** *** 4567."
- **CTA phase 2:** "verify code"
- **Resend:** "resend code (0:47)"
- **Success:** "WhatsApp is connected."
- **Invalid phone:** "Enter a valid phone number."
- **Invalid code:** "That code didn't work. Try again."
- **Too many attempts:** "Too many attempts. Try again in 5:00."
- **Offline:** "offline - phone verification needs a connection"

### 8. Data & honesty states
- **Phone number:** real = member input with `ChipProvenance` "you entered"; low-confidence = locally valid but server not yet verified; honest-null = empty phone field.
- **Masked phone:** real = generated from the submitted number; low-confidence = pending SMS delivery; honest-null = generic "your phone" if mask cannot be built.
- **SMS code:** real = six user-entered digits verified by backend; low-confidence is not applicable after server response; honest-null = empty cells.
- **Resend and spam cooldowns:** real = server/local timers; low-confidence = missing retry-after, generic wait copy; honest-null = hidden before first code send.
- **WhatsApp controls:** data category = phone and message channel; source = user-entered phone and WhatsApp delivery events; scope = reminders, check-ins, CIA tips; retention = until revoke or account deletion; export, revoke, delete phone, and STOP instructions are visible before collection.

### 9. All states
- **Default:** phase 1, empty phone, skip visible, CTA disabled until valid phone.
- **Skeleton:** SMS delivery and verification preserve input geometry with shimmer; no fake code.
- **Empty:** no phone or code entered; ConsentCard still visible.
- **Error:** invalid phone, send fail, invalid code, expired code, network fail, and spam lockout use plain copy.
- **Success:** verify CTA flashes `--glow-done`, then routes to [07].
- **Disabled:** send/verify/resend dim to 40 percent during invalid input, loading, cooldown, or lockout.
- **Offline:** phone/code values persist; network actions disabled; skip remains active.

### 10. Motion & interaction
- **Phase transition:** phone entry crossfades to code entry; brand mark stays fixed.
- **OTP:** auto-advance, backspace, paste six digits, and tap-to-focus are supported.
- **Country code:** picker opens as a searchable Sheet.
- **Resend:** ChargeMeter drains; resend flash confirms new code sent.
- **Haptics:** light on digit entry, medium on verified, none on disabled controls.
- **Reduced-motion:** crossfade becomes instant swap; countdown ring becomes text-only.

### 11. Motivation-tier adaptation
- **Low:** value preview collapses to one line; phone entry is the whole focus.
- **Medium:** default value preview plus ConsentCard.
- **High:** shows channel frequency, last STOP instruction, and data-control chips before phone entry.

### 12. Accessibility
- **Contrast:** paper text and orange controls clear AA+ against warm dark surfaces.
- **Targets:** skip, back, country picker, phone field, OTP cells, resend, and CTA meet 44px.
- **Screen readers:** OTP cells announce "digit N of 6"; ConsentCard summarizes opt-out, revoke, retention, export, and delete controls.
- **Consent:** phone collection never starts before the control copy is visible.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** WhatsApp is framed as a controllable CIA coaching channel, not a separate app funnel.
2. **Honest:** phone, code, timers, opt-out, and retention are explicit.
3. **Premium:** one crisp channel proposition, privacy card, and tactile OTP flow.
4. **Consent:** Settings revoke, STOP, export, delete, source, scope, and retention are named before collection.
5. **Semantic glow:** member action, CIA channel, and verification completion are distinct.
6. **States:** default, skeleton, empty, error, success, disabled, offline, cooldown, and lockout covered.
7. **A11y:** 44px targets, OTP labels, consent labels, and reduced motion included.
8. **Voice:** calm, sentence case, no coercion, CIA only.
