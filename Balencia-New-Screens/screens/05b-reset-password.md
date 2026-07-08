# 05b-reset-password - hi-fi glass spec

### 1. Header
- **ID:** 05b
- **Name:** Reset password
- **Route(s) covered:** `/auth/reset-password`, `/reset-password`
- **Tab:** None; password-reset deep link.
- **Source:** `work/briefs/05b.md`, Balencia canon, component catalog.
- **Batch:** 3

### 2. Purpose
Handles the deep-linked password reset token, validates it, lets the member create a new password, and returns them to Sign in [04]. It treats the token as sensitive system data and never renders it.

### 3. Entry & exit
- **Entry:** password reset email deep link with a token parameter.
- **Primary exit:** successful reset routes to Sign in [04] with a confirmation note.
- **Recovery exit:** expired, used, or invalid token routes to Forgot password [05] through "request new link."
- **Manual exit:** "back to sign in" returns to [04] without using the token.
- **Failure exit:** API and network errors keep the form and allow retry.

### 4. Layout anatomy
**Regions, top to bottom:**
1. Status bar and centered Balencia mark.
2. Token-validation status message.
3. Password form: new password, confirm password, reveal toggles.
4. Requirement checklist.
5. Match status.
6. Primary CTA and secondary recovery link.
7. Terminal success/expired state replaces the form.

**ASCII wireframe (390x844):**
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
| [ reset password                  ]  |
| back to sign in                      |
|                                      |
| expired: request new link            |
+--------------------------------------+
```

### 5. Components
- **GlassPillInput** - password and confirm variants.
- **BtnPrimary** - reset password / request new link / back to sign in.
- **BtnGhost** - secondary back to sign in.
- **ProgressBar** - requirement completion, optional in high density.
- **ChipProvenance** - "typed live" for strength rules, "server token" for validation status.
- **ErrorState, SkeletonState, HonestNullState, OfflineBanner** - state components.
- **NEW: PasswordRequirementList** - five deterministic rule rows with icon, label, and met/unmet state.

### 6. Visual treatment
- **Atmosphere:** warm dark base `#0A0A0F`, orange radial glow, grain.
- **Glass:** inputs and secondary controls use `.glass-pill`; no nav or cards beyond terminal icon states.
- **Semantic glows:** `--glow-you #FF5E00` on active password progress; `--glow-done #34A853` on success; no `--glow-cia` because CIA is not involved.
- **Type:** heading uses Tiempos italic on *password*; all numerals in cooldowns use tabular-nums.
- **Validation:** unmet rules use neutral paper opacity and icons; no off-canon red.

### 7. Content & copy
- **Loading:** "Checking your reset link."
- **Heading:** "Set a new *password*"
- **Instruction:** "Choose something strong and unique."
- **Fields:** "new password", "confirm password"
- **Requirements:** "8+ characters", "uppercase letter", "lowercase letter", "number", "special character"
- **Match:** "passwords match"
- **Mismatch:** "passwords don't match"
- **CTA:** "reset password"
- **Success:** "Password reset. You can now sign in."
- **Expired:** "This reset link expired or was already used."
- **Recovery CTA:** "request new link"
- **Network error:** "Couldn't reset your password. Check your connection and try again."
- **Offline:** "offline - connect to reset your password"

### 8. Data & honesty states
- **Reset token:** real = server validation success with `ChipProvenance` "server token"; low-confidence = validation pending, no form enabled; honest-null = missing token, terminal recovery state. Token value never renders.
- **Password strength:** real = deterministic local rules with "typed live"; low-confidence is not applicable; honest-null = empty password with no strength score.
- **Password match:** real = exact equality; low-confidence is not applicable; honest-null = confirm field empty.
- **Rate limit:** real = server retry-after countdown; low-confidence = no retry-after value, generic paused copy; honest-null = no rate limit.

### 9. All states
- **Default:** valid token, empty fields, CTA disabled until all rules and match pass.
- **Skeleton:** validation status holds the layout while token check resolves; no fake token state.
- **Empty:** missing token or empty fields show HonestNullState copy and recovery link.
- **Error:** invalid token, expired token, network failure, mismatch, weak password, and rate limit are separate states.
- **Success:** terminal success icon with `--glow-done` and "back to sign in."
- **Disabled:** CTA and inputs dim during token validation, submit, or rate-limit cooldown.
- **Offline:** fields stay editable but submit is disabled with OfflineBanner.

### 10. Motion & interaction
- **Typing:** requirement rows crossfade between unmet and met in 160ms.
- **Reveal:** eye toggle swaps masked/unmasked text with no layout shift.
- **Submit:** CTA locks width, spinner replaces label, success terminal crossfades in.
- **Expired:** warning state fades in without bounce to avoid alarm.
- **Reduced-motion:** checklist, crossfades, and success glow become instant state changes.

### 11. Motivation-tier adaptation
- **Low:** requirement list collapses to one strength line until field focus.
- **Medium:** default five-row checklist.
- **High:** adds ProgressBar and provenance chip for typed-live strength logic.

### 12. Accessibility
- **Contrast:** paper text on warm dark and glass surfaces clears AA+.
- **Targets:** inputs, eye toggles, CTAs, and links meet 44px minimum.
- **Screen readers:** each requirement announces met/unmet; token status is a polite live region.
- **Security:** token is never read aloud, copied, or displayed.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** not applicable; password reset is an isolated pre-auth security flow.
2. **Honest:** token, strength, match, cooldown, offline, and missing-token states are explicit.
3. **Premium:** quiet recovery surface with no dashboard or fake metrics.
4. **Security:** token hidden, rate limits honored, expired/used links route to recovery.
5. **Semantic glow:** effort and completion only.
6. **States:** default, skeleton, empty, error, success, disabled, offline, rate-limited, expired covered.
7. **A11y:** requirement status, targets, contrast, and reduced-motion included.
8. **Voice:** sentence case, direct, no exclamation marks.
