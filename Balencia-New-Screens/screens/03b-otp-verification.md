# Balencia Screen Spec: 03b-otp-verification

## 1. Header
*   **Screen ID:** 03b-otp-verification
*   **Name:** OTP Verification
- **Route(s) covered:** `/auth/verify`
*   **Tab:** Hidden (pre-auth flow)
*   **Source:** Functional Content Brief (OTP Verification)
*   **Batch:** 2

## 2. Purpose
Confirms the code the user just received and turns that into a created account. One task only: get four digits in, verify them, hand off to consent [03c]. No coaching, no chrome, no cross-pillar hooks — this is a security gate, and the fastest, calmest version of a security gate is the premium one.

## 3. Entry & exit
*   **Entry path:** Welcome / sign up [03] via stack push, triggered after the sign-up form is submitted.
*   **Primary exit path:** Consent [03c] via stack push, triggered on successful verification.
*   **Secondary exit path:** Welcome / sign up [03] via stack pop, triggered by the back chevron or edge-swipe.

## 4. Layout anatomy
Fixed, non-scrolling canvas (844pt tall, safe-area respected). Nothing here scrolls — the whole point of this screen is that it holds still while the user does one small thing. Four zones:

1.  **Navigation zone (top):** transparent floating back chevron.
2.  **Brand & context zone:** centered wordmark, hero heading, masked-email subtitle.
3.  **Verification zone:** the 4-digit input cluster, status text, resend/cooldown module.
4.  **Action zone (bottom):** primary CTA pinned above the home indicator, riding up with the system keyboard.

```text
390x844 Reference Frame (Safe Area Insets Applied)
┌─────────────────────────────────────────────────┐
│ [Status Bar: Time / Battery]                     │
│                                                 │
│ ‹                                               │
│                                                 │
│                                                 │
│                    Balencia                     │
│                                                 │
│             Verify your *email*                 │
│      We sent a 4-digit code to j***@...         │
│                                                 │
│                                                 │
│       ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│       │  •  │ │  •  │ │  •  │ │  •  │           │
│       └─────┘ └─────┘ └─────┘ └─────┘           │
│                                                 │
│               Error / Status Text               │
│                                                 │
│         Resend code (0:59)  [██████████░░]      │
│                                                 │
│                                                 │
│                                                 │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │                   verify.                   │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [Home Indicator]                                │
└─────────────────────────────────────────────────┘
```
Each `•` is an empty-slot placeholder glyph only — once a digit lands, the cell shows the actual numeral (NM Medium, tabular-nums), never a masked bullet. OTP codes are momentary and low shoulder-surf-risk compared with passwords, so there's no reason to hide them from the person typing them.

## 5. Components
*   **TopBar** — transparent variant, single leading chevron (44px target), no title, no trailing actions. The scroll-to-`.glass-pill`-backdrop behavior in the catalog spec doesn't apply here: this canvas never scrolls, so the TopBar stays transparent for the screen's whole life.
*   **NEW: OTPCluster / OTPDigitCell** — *rationale:* the catalog has no OTP-specific input; the closest primitive is `GlassPillInput`, but that component is defined at `.glass-pill`'s signature radius 999, which would turn a 56×64 digit cell into a stadium/oval rather than a tactile square. **Fix:** OTPDigitCell borrows `.glass-pill`'s *material* (`rgba(10,10,15,.55)`, blur 24px, border `1px rgba(255,255,255,.10)`) but sets radius to **14** — the canon input radius (CANON §6) — since these are inputs, not pills. Four cells, 56×64px each, 12px gaps.
    *   *Focus:* 1.5px burnt-orange border (`--glow-you`) + soft bottom-anchored glow bleed — effort, in progress.
    *   *Error:* solid 2px burnt-orange border, **no glow** (glow is reserved for active/positive states per CANON §3 — a breathing glow on a wrong code would read as "good, keep going," which is dishonest). See Visual treatment for the correction this replaces.
*   **ChargeMeter** — resend cooldown, corrected from the draft's "MomentumBar" (see Visual treatment). Depleting 60s fill in `--glow-you`; on successful resend it snaps to full and flashes `--glow-done` once, then resumes depleting in orange. Tabular-nums countdown alongside the fill.
*   **BtnGhost** — the resend control itself (orange label, 44px target); disabled/muted while the ChargeMeter is still draining.
*   **BtnPrimary** — orange fill, label `verify.`. Disabled (40% opacity) until 4 digits are present. Loading state is **spinner-only** per catalog (`label → spinner, width locked`) — the draft's "Verifying…" text label is removed; the catalog gives every button the same loading contract and this screen doesn't need an exception.
*   **OfflineBanner** — glass-pill honest-status banner for the offline case. Variant **rate-limited** reuses the same banner family (not a new component) with swapped copy and a live countdown, since the catalog only defines one honest-status-banner pattern (`OfflineBanner / SyncStatus`) and a second bespoke "toast" component would just fragment that language for no gain.

## 6. Visual treatment
*   **Background atmosphere:** soft warm radial glow top-center, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `--bg-base` (#0A0A0F), plus 3–4% soft-light grain overlay — exact canon values, no auth-screen exception.
*   **Glass tiers:** selective and minimal. OTPDigitCells carry `.glass-pill` material at input radius (see Components). No SolidCard, no FrostCard — a security gate doesn't need a data-dense surface or an immersive frost moment, just clean atmosphere and four honest inputs.
*   **Semantic inner-glow — one glow, one meaning, per CANON §3:**
    *   **Active OTPDigitCell:** `--glow-you` bleed from the cell's base — *you're doing this right now* (effort).
    *   **BtnPrimary on success:** a 600ms outward `--glow-done` pulse — *done* (completion, account created). This is a one-shot motion burst on a control, distinct from the persistent ambient card-glow system in CANON §3 (there are no cards on this screen to carry that system).
*   **CORRECTION — error color:** the draft applied the *Fitness* domain tag red (`#ef4444`) as the OTP error border. Two problems: (1) CANON §4 reserves domain tag colors for tags/icons only, never chrome — a border is chrome; (2) Fitness has zero semantic relationship to an auth flow, so borrowing it was arbitrary, not intentional. **Fixed:** error state uses a solid 2px burnt-orange border (no glow, see Components) — orange already carries an "this needs your effort/another attempt" meaning in this system, so reusing it for "try again" is coherent rather than inventing a color outside canon. The shake gesture and plain-language copy carry the rest of the error signal.
*   **Hero type moment:** "Verify your *email*" in NM Medium 500 at 34px; *email* set in Tiempos Medium italic — the one emphasis word for this screen's one moment.

## 7. Content & copy
CIA voice: sentence case, no exclamation marks, one Tiempos-italic emphasis word per moment, warm and direct, never blames the user.

*   **Brand wordmark:** `Balencia`
*   **Heading:** `Verify your *email*`
*   **Subtitle:** `We sent a 4-digit code to j***@email.com`
*   **Primary CTA (default):** `verify.`
*   **Primary CTA (loading):** *(spinner replaces label — no text, per catalog loading contract; width stays locked)*
*   **Resend (countdown active):** `Resend code (0:59)`
*   **Resend (available):** `Resend code`
*   **Resend (success):** `Code sent`
*   **Error (invalid code, 1st/2nd attempt):** `That code didn't work. Check the email and try again.`
*   **Error (invalid code, 3rd attempt):** `That code didn't work. Check the email and try again.` *(pairs with the one-time shake — see Motion)*
*   **Error (expired code):** `That code expired. We've enabled resend below.`
*   **Error (rate limited):** `Too many attempts. Your code will be ready again in 4:32.`
*   **Error (network):** `Something went wrong. Please try again.`
*   **Error (resend failed):** `Could not resend code. Try again.`
*   **Offline banner:** `You're offline — we'll try to verify when you're back online.`

## 8. Data & honesty states
This screen carries no lifestyle/health metric, so no GlassStatCard/KPIRow appears here — that's the honest scope of the honesty invariant for a pre-auth security gate, not a bypass of it. The same real / low-confidence / honest-null discipline is applied to the system state that *does* exist:

*   **Masked email address:**
    *   *Real:* `j***@email.com` — provenance: passed forward from sign up [03].
    *   *Honest-null (missing email payload):* falls back to `We sent a 4-digit code to your email.` — never fabricates a fake address string.
    *   *(No ChipProvenance chip here — this is routing context, not a synced metric; the chip is reserved for real data pulled from a source per CANON §7.)*
*   **Resend cooldown (60s), via ChargeMeter:**
    *   *Real:* `Resend code (0:59)` with depleting orange fill — provenance: local system clock.
    *   *Low-confidence:* not applicable — a device clock is deterministic, there's no confidence band to express.
    *   *Honest-null:* the ChargeMeter stays hidden until the server confirms the code actually dispatched — no countdown is ever shown for a code that may not exist yet.
*   **Rate-limit cooldown (5m):**
    *   *Real:* `Too many attempts. Your code will be ready again in 4:32.` — provenance: server response.
    *   *Honest-null (server didn't return a lockout timestamp):* generic `Too many attempts. Please wait before trying again.` — no invented countdown when the server hasn't given one.

## 9. All states
*   **Default (cold-start):** first cell auto-focused, numeric keyboard raised, cells empty, ChargeMeter draining, CTA disabled.
*   **Partial entry:** entered digit scales 0.5 → 1.0 as it lands. CTA stays disabled until all 4 cells are filled.
*   **Loading (verify pending):** BtnPrimary label swaps to spinner, width locked. Cells stay visible but non-editable; keyboard dismisses.
*   **Error (invalid code):** cells take the solid 2px burnt-orange border (see Visual treatment correction). Shake — 3 oscillations — *only* on the 3rd consecutive miss. Cells clear, focus returns to cell 1, status text appears below in paper-100 (not a "danger" color; the copy itself carries the warmth).
*   **Error (expired code):** same solid-orange border treatment, no shake. Cells clear. ChargeMeter completes instantly (jumps to empty). Resend BtnGhost becomes active/orange immediately.
*   **Error (rate limited):** OfflineBanner (rate-limited variant) takes the top of the screen. CTA, cells, and resend drop to 40% opacity and stop responding to touch — the same disabled-opacity value the catalog uses everywhere else, not a bespoke number. Countdown lives inside the banner as a live region (see Accessibility).
*   **Error (network/offline):** OfflineBanner (offline variant) appears at the top. CTA reverts to default enabled state; entered digits are preserved, nothing is lost to a dropped connection.
*   **Resend success:** resend copy becomes `Code sent`; ChargeMeter fills to full with a momentary `--glow-done` flash, then resumes its 60s orange drain.
*   **Success (verified):** BtnPrimary fires its 600ms green pulse; immediate stack push to [03c].
*   **Skeleton:** not applicable — this screen has no server-fetched layout to mask; it's local input plus an immediate handshake, and a skeleton state here would be theater, not honesty.

## 10. Motion & interaction
*   **Easing:** physical, `cubic-bezier(0.22, 1, 0.36, 1)`; focus and digit-scale transitions run 150–200ms.
*   **Glow behavior:** OTPDigitCell focus-glow breathes on a 4s ease loop (matching CANON §6's hero-glow breathe cadence); the CTA success pulse is a single 600ms outward radiation, not a loop.
*   **Haptics:** light selection tick on auto-advance · warning haptic on invalid/expired code · success haptic on verification.
*   **Interactions:** auto-advance on entry; backspace clears current cell, then steps back; clipboard-paste of a 4-digit code fills all cells at once; tapping outside dismisses the keyboard.
*   **Reduced motion (`prefers-reduced-motion: reduce`):** all transitions become instant cuts. The shake is skipped entirely (its meaning is already carried by the status copy and the border). Breathing/pulsing glows are replaced by their static equivalents — a fixed 1.5px orange border for focus, a fixed 2px orange border for error — so no information is lost, only the animation.

## 11. Motivation-tier adaptation
*   **Low density (stressed/rushed):** already the screen's natural state — four cells, one line of status text, nothing else competing for attention. Keyboard opens immediately.
*   **Medium density (default):** as specified above; the ChargeMeter's gentle drain paces the wait without demanding attention.
*   **High density (curious/anchored):** not applicable, and honestly so — a pre-auth security gate is not the place for cross-pillar hooks, CIA insight cards, or richer metric density. Adding them here would dilute focus at exactly the moment the product needs the user to do one small, fast thing. The premium move is restraint, not more surface area.

## 12. Accessibility
*   **Contrast:** paper-100 (#FEFAF3) on `--bg-base` (#0A0A0F) clears WCAG AAA. The corrected 2px orange error border sits well above AA against both the atmosphere gradient and the cell's dark glass fill.
*   **Targets:** back chevron 44×44px · BtnPrimary 52pt tall, full width · each OTPDigitCell 56×64px, comfortably tactile.
*   **Screen-reader labels:**
    *   Back chevron: `aria-label="Return to sign up"`.
    *   OTP cells: `aria-label="Digit 1 of 4 verification code"` (and so on per cell).
    *   Resend BtnGhost carries `aria-disabled` during the cooldown; rather than going silent, a polite live region announces cooldown start and cooldown end only (not a per-second tick, which would be noise) so VoiceOver users know exactly when resend becomes available.
    *   Rate-limit banner's countdown is likewise a polite live region, announced at start and at expiry.

## 13. Premium checklist
1.  **Connects (cross-pillar):** not applicable, gracefully — this is a pre-auth security gate, not a life-domain surface.
2.  **Honest (no fake numbers):** masked email falls back to generic copy on missing payload; both timers are bound to real clocks (device/server) and hide themselves rather than guess when data isn't there yet.
3.  **Premium (funded product):** warm atmosphere over true black, restrained glass, signature period on `verify.`, no borrowed system chrome.
4.  **Canon hex/blur/radius:** OTPDigitCell radius corrected to 14 (input radius) rather than the draft's contradictory "glass-pill, radius 14"; CTA radius 999; glow blur 24px; atmosphere gradient matches CANON §1 exactly, character for character.
5.  **60/30/10:** orange carries the primary action and the cooldown fill (60), green marks the one completion moment (30), purple is intentionally absent — CIA/AI has no role pre-auth, and forcing a purple accent in here would be decorative, not meaningful.
6.  **Selective glass:** OTPDigitCells are the only glass surface in the composition; no SolidCard or FrostCard competes with them.
7.  **Inner-glow meaning:** `--glow-you` on the active cell (effort, in progress) · `--glow-done` as a one-shot CTA pulse (completion). No color is used decoratively.
8.  **CIA voice:** sentence case throughout, no exclamation marks, warm and plain-language error copy, never blames the user for a wrong code.
9.  **Tiempos italic:** exactly one emphasis word (*email*) across the screen's one moment.
10. **3 data states:** applied to the two things this screen actually has data about — the masked email and the two timers — rather than forced onto a metric that doesn't exist here.
11. **Motion/easing:** physical easing throughout; shake reserved strictly for the 3rd consecutive miss; full reduced-motion path with no information loss.
12. **A11y floor:** 44px+ targets, full VoiceOver labeling, live-region cooldown announcements, strict contrast.
13. **Corrections made in this pass:** (a) removed the Fitness domain-red (`#ef4444`) error border — domain colors are tags/icons only, never chrome (CANON §4) — replaced with a solid orange border reusing an existing, relevant meaning; (b) renamed the resend timer from "MomentumBar" to **ChargeMeter** — a 60s countdown is a depleting capacity, not cumulative progress, per the catalog's MomentumBar-vs-ChargeMeter rule; (c) removed the "Verifying…" text loading state on BtnPrimary — the catalog defines loading as label→spinner for every button, with no auth-screen exception; (d) fixed OTPDigitCell's internal contradiction (a "glass-pill" cannot carry radius 14 — glass-pill is fixed at radius 999) by naming it a new component that borrows glass-pill's material at the canon input radius instead.
14. **Judgement:** the screen earns its premium feel by *removing* chrome — no nav bar, no card, no dashboard language — and spending all of its restraint budget on four honest, tactile inputs and one clear path forward.
