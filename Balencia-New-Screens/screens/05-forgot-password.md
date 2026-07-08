# 05-forgot-password - hi-fi glass spec

### 1. Header
- **ID:** 05
- **Name:** Forgot password
- **Route(s) covered:** `/auth/forgot-password`
- **Tab:** None; pre-auth utility stack.
- **Source:** `work/briefs/05.md`, Balencia canon, component catalog.
- **Batch:** 2

### 2. Purpose
Lets a returning member request a password reset link without exposing whether an account exists. The screen is intentionally quiet: one email field, one send action, a masked confirmation, resend controls, and a direct path back to sign in.

### 3. Entry & exit
- **Entry:** stack push from Sign in [04] through "forgot password?"
- **Primary exit:** stack pop back to Sign in [04] after confirmation or via the back control.
- **Action exit:** resend uses the same reset-link API and stays on this screen.
- **Failure exit:** input remains visible with retry; no account-enumeration copy is shown.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with back chevron.
2. Centered Balencia mark.
3. Default message block or confirmation message block.
4. Email GlassPillInput in default state.
5. Primary CTA.
6. Confirmation icon, masked email, resend row.
7. Safe area.

**ASCII wireframe (390x844):**
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
|   We sent instructions to j***@x.com |
| [ back to sign in                 ]  |
| didn't receive it? send again (0:47) |
+--------------------------------------+
```

### 5. Components
- **TopBar** - transparent, back chevron with 44px target.
- **GlassPillInput** - email variant.
- **BtnPrimary** - send reset link / back to sign in.
- **BtnGhost** - send again and support link.
- **ChargeMeter** - resend cooldown because the timer drains.
- **ChipProvenance** - "you entered" for masked email and "system cooldown" for timer.
- **OfflineBanner, ErrorState, SkeletonState, HonestNullState** - state components.
- **NEW: MaskedDestinationLine** - confirmation line that renders only a masked address and never the raw email.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F`, mandatory orange radial glow, 3-4 percent grain.
- **Glass:** only input, cooldown pill, and banners use `.glass-pill`; no dashboard cards.
- **Semantic glows:** `--glow-you #FF5E00` on focused input and valid send CTA; `--glow-done #34A853` on confirmation check; no purple because there is no CIA insight.
- **Type:** heading uses Neue Montreal 34 with Tiempos italic on *password*.
- **Security tone:** errors use paper text and border weight, not account-revealing or alarming color.

### 7. Content & copy
- **Heading:** "Reset your *password*"
- **Instruction:** "Enter your email and we'll send reset instructions if it matches."
- **Input:** "email address"
- **CTA:** "send reset link"
- **Confirmation heading:** "Check your email"
- **Confirmation body:** "We sent instructions to j***@email.com."
- **Confirmation CTA:** "back to sign in"
- **Resend context:** "didn't receive it?"
- **Resend action:** "send again"
- **Invalid format:** "Enter a valid email address."
- **Generic send response:** "If that email belongs to an account, instructions are on the way."
- **Rate limit:** "Too many requests. Try again in 0:47."
- **Offline:** "offline - reset links need a connection"

### 8. Data & honesty states
- **Email:** real = user-entered address with `ChipProvenance` "you entered"; low-confidence = invalid format state before submission; honest-null = empty field with no hidden guess.
- **Masked email:** real = generated from submitted input; low-confidence is not applicable; honest-null = generic confirmation if masking fails, never a fabricated address.
- **Resend cooldown:** real = server/local timer with "system cooldown"; low-confidence = missing retry-after, shown as "try again in a few minutes"; honest-null = hidden before any resend attempt.
- **Security:** account existence is never disclosed; identical success framing is used for known and unknown emails.

### 9. All states
- **Default:** empty email, CTA disabled until format is valid.
- **Skeleton:** not needed for first paint; confirmation content can skeleton during resend response if network is slow.
- **Empty:** empty email field, no confirmation, no resend row.
- **Error:** invalid format inline; network failure uses ErrorState and keeps form intact.
- **Success:** confirmation replaces form with masked destination and green check.
- **Disabled:** send/resend controls dim to 40 percent for invalid input or cooldown.
- **Offline:** OfflineBanner appears and submit is disabled with reason.

### 10. Motion & interaction
- **Tap:** focus email, send request, back to sign in, resend.
- **Keyboard:** return submits when valid.
- **Transition:** default form crossfades to confirmation; check scales in 150ms.
- **Cooldown:** ChargeMeter drains once per resend window.
- **Reduced-motion:** crossfade becomes instant swap; check scale and cooldown animation become static text.

### 11. Motivation-tier adaptation
- **Low:** only email field and send action; support link hidden until error.
- **Medium:** default layout with resend context after success.
- **High:** shows cooldown provenance and security note under confirmation.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and glass surfaces clears AA+.
- **Targets:** back, input, CTA, resend, and support links meet 44px.
- **Screen readers:** confirmation announces masked email; cooldown announces start and expiry only.
- **Security:** generic confirmation prevents account enumeration for all users.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** not applicable; pre-auth recovery has no honest cross-pillar data.
2. **Honest:** account existence, destination, cooldown, and offline states are explicit.
3. **Premium:** restrained utility screen, no fake CIA cards, one crisp task.
4. **Security:** token/account enumeration risk addressed in copy.
5. **Semantic glow:** effort and completion only.
6. **States:** default, skeleton, empty, error, success, disabled, offline, and cooldown covered.
7. **A11y:** labels, contrast, targets, and reduced-motion included.
8. **Voice:** sentence case, calm, no exclamation marks.
