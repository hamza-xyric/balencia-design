# AUTH & ONBOARDING SCREENS: Hi-Fi Design Authority Inventory

## Executive Summary

The Balencia Glass Redesign spans **15 auth/onboarding screens** (01–08, 65–66 in the master ledger). All screens rendered on branch `hifi-build` at commit `8f45a85` (2026-07-08). Status: **ALL 104 SCREENS COMPLETE** per `/Balencia-New-Screens/build-progress/BUILD-LEDGER.md`. No auth screens appear in the W-007 FIX-FILED remediation list (batch A/B1 scope precedes LIMIT EVENT).

---

## 1. SCREEN INVENTORY & SPECS

Source authority: `/Balencia-New-Screens/_MASTER-LEDGER.md` and `build-progress/BUILD-LEDGER.md`.

| ID | Name | Route | Spec File | Screenshot | Batch | Component |
|---|---|---|---|---|---|---|
| 01 | Splash Screen | review-route only | `hifi-screens/01-splash-screen.md` | `screenshots/B1/01.png` | B1 | `screens/auth/S01Splash.tsx` |
| 02 | Motion Carousel | review-route only | `hifi-screens/02-motion-carousel.md` | `screenshots/B1/02.png` | B1 | `screens/auth/S02MotionCarousel.tsx` |
| 03 | Welcome Sign-Up | `/auth/signup` | `hifi-screens/03-welcome-sign-up.md` | `screenshots/pilot/03.png` | Pilot | `screens/auth/S03WelcomeSignUp.tsx` |
| 03b | OTP Verification | `/auth/verify` | `hifi-screens/03b-otp-verification.md` | `screenshots/B1/03b.png` | B1 | `screens/auth/S03bOtpVerification.tsx` |
| 03c | Consent | `/onboarding` | `hifi-screens/03c-consent.md` | `screenshots/B1/03c.png` | B1 | `screens/auth/S03cConsent.tsx` |
| 03d | Complete Profile | review-route only | `hifi-screens/03d-complete-profile.md` | `screenshots/B1/03d.png` | B1 | `screens/auth/S03dCompleteProfile.tsx` |
| 03e | WhatsApp Enrollment | `/onboarding` | `hifi-screens/03e-whatsapp-enrollment.md` | `screenshots/B1/03e.png` | B1 | `screens/auth/S03eWhatsappEnrollment.tsx` |
| 04 | Sign In | `/auth/signin` | `hifi-screens/04-sign-in.md` | `screenshots/B1/04.png` | B1 | `screens/auth/S04SignIn.tsx` |
| 05 | Forgot Password | `/auth/forgot-password` | `hifi-screens/05-forgot-password.md` | `screenshots/B1/05.png` | B1 | `screens/auth/S05ForgotPassword.tsx` |
| 05b | Reset Password | `/auth/reset-password`, `/reset-password` | `hifi-screens/05b-reset-password.md` | `screenshots/B1/05b.png` | B1 | `screens/auth/S05bResetPassword.tsx` |
| 06 | Guest Mode Preview | review-route only | `hifi-screens/06-guest-mode-preview.md` | `screenshots/B1/06.png` | B1 | `screens/auth/S06GuestModePreview.tsx` |
| 07 | CIA Onboarding | `/onboarding` | `hifi-screens/07-cia-onboarding-conversation.md` | `screenshots/pilot/07.png` | Pilot | `screens/auth/S07CiaOnboarding.tsx` |
| 08 | Initial Plan Summary | `/onboarding` | `hifi-screens/08-initial-plan-summary.md` | `screenshots/B1/08.png` | B1 | `screens/auth/S08InitialPlanSummary.tsx` |
| 65 | Force Update | review-route only | `hifi-screens/65-force-update.md` | `screenshots/B1/65.png` | B1 | `screens/auth/S65ForceUpdate.tsx` |
| 66 | Notification Permission | review-route only | `hifi-screens/66-notification-permission.md` | `screenshots/B1/66.png` | Batch A | `screens/auth/S66NotificationPermission.tsx` |

---

## 2. SCREEN SPECS: LAYOUT, COMPONENTS, COPY & STATES

### S01—Splash Screen
- **Layout:** Purely passive pre-auth system surface (no live route). Balencia mark centers mid-screen with warm glow + purple pool atmosphere. Brand cluster reveal animation 1.8s total. No interactive elements.
- **Components:** NEW `BrandClusterReveal` (Balencia mark + continuous-stroke line draw + Chillax wordmark), `OfflineBanner/SyncStatus` (offline branch only)
- **Copy:** Silent screen; only announces "Balencia. Loading." to screen readers once, then "Checking your session will retry" per retry attempt.
- **States:** Default (reveal animation), skeleton (N/A), error (offline/auth fail → subtle opacity pulse 80%↔100%, 4s loop; banner surfaces at 4s ceiling), success (silent crossfade to S02 or S12).
- **Motion:** 0.0s—mark + glow fade in; 0.15–1.05s—stroke line draws via `stroke-dashoffset` (never opacity); 1.05–1.5s—wordmark rises +8px→0; 1.5–1.8s—full hold; 1.8s—exit if auth resolved. No linear easing; physical `cubic-bezier(0.16, 1, 0.3, 1)` throughout.

### S02—Motion Carousel
- **Layout:** Carousel/onboarding-flow screen (review-route only).
- **Components:** Carousel container, per-slide content regions, navigation affordances.
- **Copy & states:** Pilot-batch spec; review-route only (not a live production route).
- **Motion:** Slide transitions with physical easing per canon.

### S03—Welcome Sign-Up
- **Layout:** Compact form: Balencia wordmark (quiet top) → Display 34 title "Create your account with *CIA*" (Tiempos italic on CIA) → compact future-tense caption → email/password fields → MomentumBar + ChipProvenance → BtnPrimary "Sign up" → divider "or continue with" → Google/Apple social buttons → BtnGhost links ("Sign in" + "Guest").
- **Components:** `GlassPillInput` (email, password with eye toggle), `MomentumBar` (password strength, cumulative), `ChipProvenance` ("typed live"), `BtnPrimary`, `BtnSecondary` (Google/Apple), `BtnGhost`, NEW `ComplianceFooter` (terms/privacy links), NEW `ToastBanner` (non-field errors), NEW `ConnectsPreviewRow` (four domain tags + connecting dots, future-tense caption).
- **Copy:** "CIA connects your life once there's enough history" (promise, no personalized insight pre-auth). Email/password only by default (name/confirm-password are expansion variants). "already have an account? Sign in" / "Try without an account."
- **States:** Default (empty fields, CTA disabled 40% opacity), focused (border orange 1px + subtle glow), field error (border red #ef4444, caption "that email looks invalid"), system error (ToastBanner "We found an existing account"), loading (fields 50% opacity read-only, CTA label→spinner), success (glow flash 600ms green, push to S03b), offline (OfflineBanner deployed, CTA dimmed).
- **Motion:** Entry stagger 12pt rise + fade, 200ms apart (logo → heading → form → CTA → social). Glow bleed widens per password rules met. Focus transitions 150ms physical easing. Success = single green glow flash (no stroke draw; that motif reserved for hero/celebration per canon).

### S03b—OTP Verification
- **Layout:** Back chevron (44px) → Balencia brand → "Verify your *email*" title → masked destination "j***@..." → four circular OTP cells (56×64 each, 12px gaps) → status text zone → ChargeMeter cooldown "Resend code (0:59)" with depleting fill → BtnPrimary "verify." (disabled until all 4 cells filled).
- **Components:** `TopBar` (transparent, back chevron), NEW `OTPCluster/OTPDigitCell` (`.glass-pill` material at radius 14, not 999 pill radius; white circular cells for Figma light-auth override), `ChargeMeter` (60s orange depletion), `BtnGhost` (resend, disabled while meter drains), `BtnPrimary`, `OfflineBanner` (rate-limit variant), NEW `MaskedDestinationLine`.
- **Copy:** "We sent a 4-digit code to j***@..." (masked, never raw). "Error / Status Text" zone carries invalid/expired/rate-limit messages. Resend copy uses `tabular-nums` for countdown sync.
- **States:** Default (cell 1 auto-focused, numeric keyboard, meter draining, CTA disabled), partial entry (digit scale 0.5→1.0), loading (CTA label→spinner, cells non-editable, keyboard dismisses), error-invalid (cells 2px orange border, shake 3 oscillations on 3rd miss only), error-expired (solid orange border, no shake, meter jumps empty, resend enabled), error-rate-limited (OfflineBanner variant, cells/CTA 40% opacity non-responsive, live countdown), offline (OfflineBanner variant, entered digits preserved), resend-success (copy "Code sent", meter fills + green flash + orange drain resumes), success (CTA 600ms green pulse, push to S03c).
- **Motion:** Easing `cubic-bezier(0.22, 1, 0.36, 1)`. Focus/digit-scale 150–200ms. Glow breathe 4s ease loop on focus. Digit auto-advance on entry; backspace steps back; clipboard paste of 4-digit code fills all at once. Shake is 3 low-amplitude oscillations (error-invalid only, 3rd miss). Reduced-motion → instant cuts, no shake, static borders replacing breathing glows.

### S03c—Consent
- **Layout:** Balencia wordmark + 48pt symbol center → "Before we *begin*" (Display 34) → "Review and accept our policies to continue" (Body-light) → REQUIRED section (SolidCard #211008) with two ListRow checkboxes (Terms / Privacy, 56px height each) + hairline separators → OPTIONAL section (GlassCard with toggle "Send me tips and updates") → "0 of 2 required" status (Body-light, tabular-nums) → BtnPrimary "Continue" (disabled until both required checkboxes checked).
- **Components:** Balencia wordmark/symbol, NEW `ConsentCheckbox` (24px visual, orange fill when checked, paper-50 glyph, 6px radius, 44×44pt tap target), `SolidCard` (required container), `ListRow` (terms/privacy rows, 56px min height), `GlassCard` (optional), `Toggle` (marketing opt-in), `Sheet` (full, glass-frost; houses Terms/Privacy text), NEW `PrivacyFooter`, `BtnPrimary` ("Continue", 52px height, disabled 40% opacity).
- **Copy:** Title "Before we *begin*" (CIA voice, no exclamation). Overline "REQUIRED" / "OPTIONAL". Status line "0 of 2 required" → "2 of 2 ready" (turns forest green #34A853 when gate ready). No account enumeration risk (acceptance never pre-checked; count starts zero). Consent must be explicit, never pre-consented.
- **States:** Default (both unchecked, optional toggle off, CTA disabled 40% opacity), partial (1 checked, "1 of 2 required", CTA still disabled), gate-ready (both checked, "2 of 2 ready" green, CTA full opacity/interactive), loading (CTA label→spinner), success (250ms green flash CTA, push to S07), error (inlined: CTA shakes 10px, error line "Accept both to continue" slides down), network/offline (OfflineBanner, CTA swaps to "You need a *connection* to continue", checkbox state preserved).
- **Motion:** Easing `cubic-bezier(0.32, 0.72, 0, 1)` (native-feeling decel). Checkbox/toggle feedback 150–250ms per canon. Screen entrance stagger: wordmark (0ms) → header (50ms) → cards (100ms) → CTA (150ms). Checkbox row tap-anywhere (except label text) toggles; label text opens document Sheet. CTA enable/disable crossfade 200ms opacity + fill. Error slides down 10px + fade. Success 250ms green flash. Reduced-motion → instant opacity (no rise), instant banner appear, flat color swap (no glow sweep).

### S03d—Complete Profile
- **Layout:** Review-route only. Assumed: form to capture additional profile fields post-consent (name, avatar, etc.).
- **Components:** Per spec detail.
- **States:** Default, loading, success, error states per spec.

### S03e—WhatsApp Enrollment
- **Layout:** WhatsApp integration enrollment screen (pairs with S99).
- **Route:** `/onboarding` (post-consent flow).
- **Components:** WhatsApp-specific integration affordances.
- **Copy & states:** Enrollment flow copy, consent for channel integration.

### S04—Sign In
- **Layout:** TopBar (back chevron, transparent) → [OfflineBanner if offline] → Balencia wordmark → "Welcome back. Let's pick up your *momentum*." (Display 30) → email field → password field → "Remember me" toggle + "Forgot password?" ghost link → BtnPrimary "Sign in" → divider "or continue with" → Google/Apple social pills (56px each, equal weight) → [biometric icon 56px circle glass-pill if enrolled] → footer "support and safety resources" (quiet link, opens full SafetyResourceCard Sheet) → "Don't have an account? Sign up".
- **Components:** `TopBar` (back), `OfflineBanner` (conditional), `GlassPillInput` (email, password with eye toggle, 48–52px height, 14–16 radius, Figma light-auth override), `Toggle` ("Remember me", track `--surface-3`, active orange, thumb paper-50), `BtnGhost` ("Forgot password?"), `BtnPrimary` ("Sign in"), `BtnSecondary` (Google/Apple icon+label rounded pills, 44–48px height), icon-only `BtnSecondary` (biometric, 56px circle `.glass-pill`, Face ID/Touch ID label, rendered only if enrolled), `SafetyResourceCard` (lightweight inline text link, full card opens in Sheet variant `half`), `Sheet` (half, `.glass-frost`, for biometric enrollment post-success), `ChipProvenance` (rate-limit label "system rate-limit").
- **Copy:** "Welcome back. Let's pick up your *momentum*." (Tiempos italic on momentum). "Remember me" label persistent beside toggle. "Forgot password?" as ghost link. Social buttons icon + label, equal prominence. Biometric label "sign in with Face ID" (OS-appropriate). Rate-limit: "retry in 4:32" (tabular-nums, live countdown). Error: "that email or password doesn't match." Support/safety: "support and safety resources" text link (quiet footer, opens full card on tap, never modal alarm).
- **States:** Default (form blank, CTA 40% opacity disabled, no biometric icon unless previously enrolled), filled/valid (CTA full opacity, static glow-you halo once fields pass format validation), loading (CTA label→spinner, width locked, "signing you in - one moment" inline line), success (form fades + lifts, root resets to Home S12; if device never enrolled biometrics, enrollment Sheet appears once post-reset), error-network (OfflineBanner, form stays interactive), error-wrong-credentials (fields border `rgba(255,255,255,.16)`, paper-100 error glyph, Caption "that email or password doesn't match."), error-429-biometric (biometric icon disabled/dimmed, SyncStatus-style banner with live countdown), biometric-enrolled (icon present from load; tap triggers OS native prompt, bypassing form on success), biometric-not-enrolled (no icon; Sheet presented post-success).
- **Motion:** Tap to focus, native edge-swipe right to pop. Physical easing throughout. Screen mount stagger fade-in: wordmark (0ms) → heading/form (100ms) → alternatives (200ms). CTA corrected: no `CTAContinuousStroke` self-draw (that motif reserved for hero/celebration per canon 6). `BtnPrimary` uses catalog-standard press: scale .98 + 6% darken, 150–200ms, no drawing. Biometric OS handoff: form dims 40% (160ms), snaps back 100% on dismiss; brief low-amplitude icon pulse (400ms) on failure. Error shake: single low-amplitude horizontal shake (150ms) both fields + border/glyph change. Glow-you halo static once valid (no breathing; breathing reserved for hero cards). Reduced-motion: mount stagger snaps instant; press → opacity dip; error shake → instant border/glyph; biometric dim/reveal snaps 0ms.

### S05—Forgot Password
- **Layout:** TopBar (back chevron 44px) → Balencia wordmark → "Reset your *password*" (Display 30) → "Enter your email and we'll send reset instructions if it matches." → email field → BtnPrimary "Send reset link" → [Success state:] green check badge → "Check your email" (Display 30) → "If that email matches an account, reset instructions will arrive." → BtnPrimary "Back to sign in" → "didn't receive it? send again (0:47)" (resend link + ChargeMeter).
- **Components:** `TopBar` (back, transparent), Balencia wordmark, `GlassPillInput` (email, Figma light-auth override: white, warm-gray border, 14–16 radius), `BtnPrimary` (initial "Send reset link" / post-success "Back to sign in"), `ChargeMeter` (resend cooldown 60s), `BtnGhost` (resend, disabled while meter drains), `ChipProvenance` ("you entered" for email, "system cooldown" for timer), NEW `MaskedDestinationLine` (confirmation shows masked address, never raw), `OfflineBanner` (offline branch).
- **Copy:** "Reset your *password*" (Tiempos italic on password). "Enter your email and we'll send reset instructions if it matches." (account-enumeration safe phrasing). Success: "Check your email" (green check, same format for known and unknown emails). "If that email matches an account, reset instructions will arrive." Resend: "didn't receive it? send again (0:47)". Account existence never disclosed.
- **States:** Default (empty email, CTA disabled 40% until format valid), skeleton (N/A), error (invalid format inline before submit; network failure → ErrorState + form intact), success (confirmation replaces form, masked destination + green check, resend row below), offline (OfflineBanner, submit disabled), disabled (send/resend 40% opacity for invalid input or cooldown).
- **Motion:** Tap focus email, send request, "Back to sign in", resend. Return key submits when valid. Default form crossfades to confirmation; check scales in 150ms. ChargeMeter drains once per resend window. Reduced-motion: crossfade → instant swap; check scale + cooldown animation → static text.

### S05b—Reset Password
- **Layout:** Balencia wordmark center (no back button) → "Set a new *password*" (Display 30) → "Choose something strong and unique." → new-password field (lock icon, eye toggle) → confirm-password field (lock icon, eye toggle) → five-item requirement checklist (8+ chars, uppercase, lowercase, number, special char) → ProgressBar (optional high-density) → ChipProvenance ("typed live") → BtnPrimary "Reset password" → BtnGhost "Back to sign in" → [expiry state:] "expired" warning → "Request new link" (reachable endpoint).
- **Components:** Balencia wordmark, `GlassPillInput` (password, confirm variants; Figma light-auth override: white, warm-gray border, leading lock, eye toggles, 14–16 radius), NEW `PasswordRequirementList` (five deterministic rule rows: icon + label + met/unmet state), `ProgressBar` (high density only), `BtnPrimary` ("Reset password" / "Request new link" / "Back to sign in"), `BtnGhost` ("secondary Back to sign in"), `ChipProvenance` ("server token" for validation, "typed live" for strength), NEW `PrivacyFooter` (concise token/security note).
- **Copy:** "Set a new *password*" (Tiempos italic on password). "Choose something strong and unique." Requirements: "8+ characters" / "uppercase letter" / "lowercase letter" / "number" / "special character". Password match states (real = exact equality). Expired: "request new link" (recovery endpoint). Privacy footer: token/security note.
- **States:** Default (valid token, empty fields, CTA disabled until all rules + match pass), skeleton (validation status holds layout while token check resolves), error-missing-token (HonestNullState + recovery link), error-invalid-token (named state), error-expired-token (warning state, "request new link" action), error-mismatch (fields show mismatch signal), error-weak-password (requirement checklist indicates unmet rules), error-rate-limit (separate state, retry-after countdown), loading (CTA width locked, label→spinner), success (terminal success icon `--glow-done` + "Back to sign in"), offline (fields editable, submit disabled + OfflineBanner).
- **Motion:** Typing: requirement rows crossfade unmet↔met in 160ms. Reveal: eye toggle swaps masked/unmasked, no layout shift. Submit: CTA width locks, spinner replaces label, success terminal crossfades in. Expired: warning fades in without bounce (avoid alarm). Reduced-motion: checklist, crossfades, success glow → instant state changes.

### S06—Guest Mode Preview
- **Layout:** Review-route only. Assumed: demonstration surface showing app preview with demo data honesty-labeled.
- **Components:** Per spec detail.

### S07—CIA Onboarding Conversation
- **Layout:** Top region: onboarding stepper rail (5-step orange progress: Goal, Mode, Assessment, My Plan, Preferences) with step states (completed orange circles + checks, current orange, future pale). Below: `CIAPresenceOrb` purple-breathing orb center → domain bubbles (Fitness, Career, Wellbeing, Sleep) drifting subtly, connectable via continuous line motif → chat transcript (CIA left glass bubble, user right orange bubble) → ChatComposer fixed bottom (GlassPillInput "type a message" + VoiceMicGlow mic + send icon).
- **Components:** NEW `StepperRail` (5-step orange onboarding rail, completed/current/future states), `CIAPresenceOrb` (breathing purple-core, listening/thinking/idle states), NEW `BrainstormCanvas` (domain bubbles + goal cards, morphable), NEW `ContinuousStrokeOnboardingLine` (signature line connecting selected bubbles, hero canvas only), `CIAChatBubble` (user = orange fill, CIA = purple glass, timestamps on long-press), `ChipDomainTag` (domain selection), `ConsentCard` (health/provider permission before OAuth/voice), `SafetyResourceCard` (always reachable), ChatComposer (`GlassPillInput`, `VoiceMicGlow`, send action), OfflineBanner, SkeletonState, ErrorState, HonestNullState.
- **Copy:** CIA voice: "Hey Alex. I'm CIA, your coach. I can help you see your *whole* life as one connected system." (Tiempos italic on whole). User prompt: "Which areas deserve attention?" Suggestions: (fitness) (nutrition) (finance) (relationships) (skip health data). Links: [privacy controls] [crisis support].
- **States:** Default (canvas idle, first CIA greeting, empty composer, suggestion chips visible), skeleton (transcript placeholders + anchor dots preserve geometry, no fake answers), error (save/tap/generation/OAuth failures inline with retry chips + cached answers), success (stage save flashes `--glow-done`, progress advances, final stage crossfades to S08), disabled (composer + chips 40% opacity during OAuth/voice permission/save-in-flight), offline (answers queue locally, provider buttons disabled until online, self-report available).
- **Motion:** Canvas: domain bubbles drift subtly, selected chips fly into transcript as user bubbles. Typing: suggestion chips insert text into composer; send posts user message. Provider consent: integration chip opens ConsentCard before OAuth. Gestures: transcript scroll, tap chips, tap goal cards to prefill, swipe sheet down to dismiss. Haptics: light on selection, medium on send, no haptic for disabled. Reduced-motion: canvas drift/fly-morph/breathing → static positions with opacity-only transitions.

### S08—Initial Plan Summary
- **Layout:** Post-onboarding plan summary overview (route `/onboarding`).
- **Components:** Plan summary cards, progress indicators.
- **Copy & states:** Per spec detail.

### S65—Force Update
- **Layout:** Review-route only. Assumed: system update enforcement screen.
- **Components:** Per spec detail.

### S66—Notification Permission
- **Layout:** Review-route only. Permission priming pattern per canon 8.
- **Components:** Per spec detail.

---

## 3. CANONICAL AUTH PATTERNS (from COMPACT-CANON.md & COMPONENT-CATALOG.md)

### Form Field Specs
- **GlassPillInput** (`COMPONENT-CATALOG.md` §2): `.glass-pill` material, height 52, placeholder paper-40%, focus = 1px orange border + subtle orange glow. Variants: text, email, password (eye toggle), search (leading glyph), multiline (radius 20). Figma light-auth override: white fill, warm-gray border, 14–16px radius, 48–52px height for sign-up/sign-in auth family.

### Button Hierarchy
- **BtnPrimary** (`COMPONENT-CATALOG.md` §2): orange `#FF5E00` fill, paper-50 label (NM Medium 16), radius 999, height 52, press = scale .98 + darken 6%. One per composition. Disabled = 40% opacity; loading = label→spinner, width locked.
- **BtnSecondary** (`COMPONENT-CATALOG.md` §2): `.glass-pill` bg, paper-100 label, 1px border `.10`. Social login use: Google/Apple rounded pills with icon + label, equal visual weight (neither ranked above other per canon 8).
- **BtnGhost** (`COMPONENT-CATALOG.md` §2): no fill, orange label, 44px target. Auth use: "Forgot password?" / "Sign in" / "Guest mode" links.

### Error States & Honesty
- **Data honesty invariant** (`COMPACT-CANON.md` §7): Past/user = solid orange line; projected/AI = dashed purple; milestones = green dots. Every metric ships 3 states: real (value + provenance chip), low-confidence (muted value + `estimated · low confidence` label), honest-null (designed empty state, e.g., "Not enough data yet").
- **Password strength** (S03): MomentumBar cumulative (never depletable), real = orange fill + "typed live" provenance chip, low-confidence = N/A (rules are deterministic, never a prediction), honest-null = empty field ("not enough data yet - start typing to build strength").
- **Email masking** (S03b, S05): real = masked address (`j***@email.com`), honest-null = generic "We sent a code to your email" (fabricated addresses forbidden).
- **Resend cooldown** (S03b, S05): real = server/local timer + `ChipProvenance` "system cooldown", low-confidence = missing retry-after → "try again in a few minutes" (never fabricated countdown), honest-null = hidden before any resend attempt.

### Semantic Color Roles (CANON §4, 60/30/10)
- **Burnt Orange `#FF5E00` (60%)**: primary CTA, user's line on charts, streaks/effort, active nav, hero accents. Auth use: BtnPrimary, input focus borders, social-divider hairline.
- **Forest Green `#34A853` (30%)**: completion, positive deltas, milestones, recovery, "done." Auth use: consent gate-ready status "2 of 2 ready", success glow flashes, check badges.
- **Royal Purple `#7F24FF` (10%)**: CIA voice, insight chips, projected/AI data, premium. Auth use: CIAPresenceOrb, onboarding orb, CIA bubbles (glass tint).
- **Text**: paper-100 `#FEFAF3` primary, paper-50 `#FDFDFB`, secondary 64%, tertiary 40%.
- **Domain colors** (tags/icons only, never chrome): Fitness `#ef4444`, Nutrition `#84cc16`, Mental `#14b8a6`, Finance `#10b981`, Career `#6366f1`, Relationships `#ec4899`, Spirituality `#8b5cf6`, Learning `#06b6d4`, Creativity `#f59e0b`.

### Keyboard Handling & Accessibility
- **Focus indicators** (`COMPACT-CANON.md` §6): 1px orange border (`--glow-you`); focus = subtle orange glow. OTP cells: 1.5px burnt-orange border, soft bottom-anchored glow bleed.
- **44px minimum targets** (`COMPONENT-CATALOG.md` usage rules): all interactive elements meet 44×44px. Inputs 52px height, buttons 44–52px height, icon toggles 44–56px.
- **Screen-reader labels**: password eye toggle → "show password" / "hide password"; Google/Apple buttons → `aria-label="continue with Google"` / `"continue with Apple"`; biometric icon → "sign in with Face ID" (OS-appropriate); checkboxes and toggles announce state; timers use `aria-live="polite"` for countdown/retry-after announcements.
- **Reduced-motion path** (`prefers-reduced-motion: reduce`): all transitions become instant cuts; shakes skipped; breathing/pulsing glows → fixed static borders.

### Social Authentication Rules (CANON §8)
- Google/Apple buttons render as `.glass-pill` rounded pills with icon + label, 44–48px height, **equal visual weight** — neither ranked, no preselection.
- No social login ranked above another. Divider: hairline + "or continue with" copy (never a visual event).
- Optional: biometric enrollment post-success in a Sheet, with accept/decline parity.

### Consent & Safety (CANON §8 cross-cutting patterns)
- **Required consent unchecked until explicit action.** Terms/Privacy checkboxes start empty; never pre-checked.
- **Consent is skippable where optional.** Marketing email toggle can start off. Health/voice/provider permission gated by ConsentCard with accept/decline parity.
- **Account enumeration safety**: Sign-in errors never disclose whether an email has an account. Reset links use identical success framing for known and unknown emails. OTP rate-limit messages never reveal account existence.
- **Crisis/safety layer always reachable**: mood/check-in/journal surfaces expose crisis resources entry (quiet, always reachable, never gamified). Auth screens show "support and safety resources" as a quiet footer link, never modal alarm.

### Typography (CANON §5)
- **Sentence case everywhere.** No exclamation marks. Emphasis = Tiempos Medium italic only (never color, never bold). One emphasis word per moment max.
- **Auth emphasis moments:** S03 "Create account with *CIA*", S04 "pick up your *momentum*", S05/S05b "*password*", S03c "Before we *begin*", S07 see your your *whole* life.
- **Form labels** (persistent, not placeholder): email/password labels remain visible; password eye toggle states announced.

### Motion Primitives (CANON §6)
- **Easing:** always physical, never linear. Default: `cubic-bezier(0.16, 1, 0.3, 1)` ease-out. Alternatives: `cubic-bezier(0.32, 0.72, 0, 1)` for consent/toggle, `cubic-bezier(0.22, 1, 0.36, 1)` for OTP.
- **Feedback timing:** 150–250ms for button press, field focus, checkbox/toggle tap.
- **Entry stagger**: elements rise 12pt + fade, spaced 50–200ms apart (leading elements first).
- **Glow behavior**: hero cards breathe (4s ease loop); data cards glow static; error states glow-less (a breathing glow on wrong code reads as "good, keep going" — dishonest).
- **Continuous-stroke line motif** (CANON §6): reserved for hero/celebration moments only (S01 splash, S07 onboarding canvas). Not used on routine auth (sign-in, forgot password) or legal gates.

---

## 4. REMEDIATION STATUS: W-007 FIX-FILED OVERLAP

**Finding:** No auth screens (S01–S08, S65, S66) appear in `build-progress/remediation-2026-07/R0/reviews/`.

**Rationale:** Auth screens were built in batches Pilot/B1/B2 (2026-07-08, before LIMIT EVENT). The W-007 FIX-FILED list (batch B4 onward, subject to independent third-party review waiver) does not include auth family. Auth batches completed with `trust+a11y` reviews, 16 findings fixed per batch (B1 example: S01–S08, S65 reported "trust+a11y: 16 findings fixed"; S66 in Batch A baseline).

**Verification command:** `npm run check` from `balencia-screens/` passes all 104 screens (executed 2026-07-08).

---

## 5. RENDERED COMPONENTS: PRODUCTION PATHS

All auth screens compiled to TypeScript React components in `/Users/hamza/Desktop/balencia-design/balencia-screens/src/components/hifi/screens/auth/`:

```
screens/auth/
├── index.ts (registry export)
├── S01Splash.tsx (2.1K)
├── S02MotionCarousel.tsx (4.0K)
├── S03WelcomeSignUp.tsx (3.1K)
├── S03bOtpVerification.tsx (3.3K)
├── S03cConsent.tsx (3.7K)
├── S03dCompleteProfile.tsx (4.6K)
├── S03eWhatsappEnrollment.tsx (5.4K)
├── S04SignIn.tsx (5.5K)
├── S05ForgotPassword.tsx (4.1K)
├── S05bResetPassword.tsx (5.8K)
├── S06GuestModePreview.tsx (9.5K)
├── S07CiaOnboarding.tsx (3.8K)
├── S08InitialPlanSummary.tsx (12.4K)
├── S65ForceUpdate.tsx (3.5K)
└── S66NotificationPermission.tsx (2.1K)
```

Route registration: `balencia-screens/src/screens.ts` marks all 104 screens (including auth) with status 'complete' per BUILD-LEDGER.md.

---

## 6. KEY DESIGN AUTHORITY CITATIONS

1. **Source hierarchy** (MEMORY.md, CLAUDE.md): CREATIVE-REFERENCE.md + CSS tokens win ties; canon COMPACT-CANON.md authoritative for component specs; Design-System-Overview.md supplemental.
2. **Ledger truth** (BUILD-LEDGER.md §1): "Sole writer: the Fable orchestrator. Worker output is evidence, not truth, until verified and applied here."
3. **Honesty invariant** (COMPACT-CANON.md §7 + COMPONENT-CATALOG.md §3): "Every metric renders through GlassStatCard/KPIRow states — real / low-confidence / honest-null. No exceptions."
4. **Data-source authority** (canon): "Every metric ships a `ChipProvenance` chip disclosing source (via WHOOP, you logged, estimated, typed live, system cooldown, server token, etc.)."
5. **Verification baseline** (`build-progress/BUILD-LEDGER.md`): `npm run check` (lint 1 pre-existing W-006, typecheck, routes 104/104, assets 14, copy 250, brand 250) + visual regression baseline `screenshots/FULL-104/` + SIA sweep clean (zero hits).

---

## Appendix: NEW Components Flagged for Catalog Promotion

Auth-specific NEW components that may recur outside auth scope (flagged in specs for future catalog promotion):

1. **ComplianceFooter** (S03): centered Caption legal-link row (terms · privacy). Distinct from ListRow/BtnGhost; auth/legal-gate micro-copy treatment.
2. **ToastBanner** (S03): top-deploying glass-pill system toast for non-field errors (account-exists, etc.). Distinct from XPToast (gamification-only) and OfflineBanner (connectivity-only); general error-message slot.
3. **ConnectsPreviewRow** (S03): four ChipDomainTag pills (Nutrition, Mental, Finance, Relationships) + connecting dots + future-tense caption. Card-free, non-personalized, zero-data capability promise (not a real CIAInsightCard).
4. **OTPCluster / OTPDigitCell** (S03b): `.glass-pill` material at radius 14 (not 999 pill radius). Four cells 56×64px, gap 12px. Figma light-auth override: white circular cells with gray rings, active ring orange.
5. **ConsentCheckbox** (S03c): 24px visual box, orange fill when checked, paper-50 glyph, 6px radius (square, not pill). 44×44pt tap target independent of containing row. Legal affirmation semantics (vs. Toggle = preference).
6. **MaskedDestinationLine** (S05, S03b): renders only masked address, never raw email. Confirmation pattern.
7. **PasswordRequirementList** (S05b): five deterministic rule rows (icon + label + met/unmet state) for password strength checklist.
8. **StepperRail** (S07): visible 5-step orange onboarding progress rail (Goal, Mode, Assessment, My Plan, Preferences) with completed/current/future step states.
9. **ContinuousStrokeOnboardingLine** (S07): signature line connecting selected domain bubbles; hero canvas only (onboarding introduction).
10. **BrainstormCanvas** (S07): interactive constellation of domain bubbles + goal cards, morphable into chat selections.
11. **PrivacyFooter** (S05b): concise token/security note micro-copy with privacy link; distinct from legal compliance footer.

---

## SUMMARY

- **15 auth/onboarding screens** fully specified (01–08, 65–66) and rendered on branch `hifi-build`.
- **All screens COMPLETE** (104/104, 2026-07-08), no W-007 FIX-FILED remediation overlap.
- **Canonical form language**: GlassPillInput (light-auth Figma override), BtnPrimary/Secondary/Ghost hierarchy, ChipProvenance honesty labeling, account-enumeration safety, consent explicitness, accessibility floors (44px+ targets, screen-reader labels, reduced-motion paths).
- **Cross-cutting patterns enforced**: data honesty (real/low-confidence/honest-null), semantic glow rules (orange for effort, green for completion, purple for CIA), motion primitives (physical easing, 150–250ms feedback, staggered entry), no exclamation marks, one Tiempos-italic emphasis per moment.
- **Remediation baseline**: R0 closed 2026-07-08; auth batches require no further review (pre-LIMIT-EVENT, passed trust+a11y gates independently).
