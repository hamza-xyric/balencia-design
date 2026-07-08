# 04 — Sign in

### 1. Header
* **ID:** 04
* **Name:** sign-in
- **Route(s) covered:** `/auth/signin`
* **Tab:** N/A (pre-authentication stack — no `GlassNavBar` present; that component is exclusively the authenticated 4-tab bar)
* **Source:** Balencia native mobile app brief
* **Batch:** 2

### 2. Purpose
Get a returning user back into their session in under two taps, with no friction beyond what security requires. The screen carries one job: verify identity, then get out of the way. Copy leads with recognition ("welcome back"), not process — the form itself does the convincing.

### 3. Entry & exit
* **Entry paths:**
  * Stack push from Welcome / Sign Up [03] (tap "already have an account? sign in").
* **Exit paths:**
  * **Primary:** Home [12] via root reset (successful authentication).
  * **Secondary:** Forgot Password [05] via stack push (tap "forgot password?").
  * **Tertiary:** Welcome / Sign Up [03] via stack pop (tap "sign up" or back chevron / edge-swipe).

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **Top bar** — back chevron (44px target, returns to [03]). `OfflineBanner` slots in beneath it only when offline; it does not reserve permanent space.
2. **Brand anchor** — Balencia mark, 48pt, centered, on bare atmosphere (no glass, no card — the logo reads directly on the warm gradient per identity system).
3. **Heading** — CIA-voice recognition line, H1 scale — **Neue Montreal Medium 500, 30–34, per Canon §5** (the draft named only "H1 scale" without confirming the typeface; made explicit here) — one Tiempos-italic emphasis word (Tiempos Medium _italic_, Canon §5's emphasis row — never color, never bold).
4. **Auth form** — email `GlassPillInput`, password `GlassPillInput` with eye toggle, utility row (`Toggle` + "remember me" label, `BtnGhost` "forgot password?").
5. **Primary action** — `BtnPrimary`, full width, "sign in."
6. **Alternative paths** — divider, `BtnSecondary` × 2 (Google, Apple), and — *only for accounts that already enrolled biometrics on a prior sign-in* — a compact icon affordance for Face ID / Touch ID.
7. **Safety link** — quiet inline crisis-resources affordance, always rendered, auth-state independent.
8. **Footer** — "don't have an account? sign up," back to [03].

**Correction (region 8 naming):** the draft labeled this region "Bottom Navigation." That name collides with the catalog's `GlassNavBar` — a specific, authenticated-only component (Today · CIA · Goals · Me) that never appears pre-auth. Relabeled "Footer" so no reader mistakes this for a tab bar.

**Correction (biometric placement):** the draft's wireframe showed a bare `🌐` glyph with no defined behavior, and separately described a "Biometric Opt-In Sheet" as if it were reachable from this same screen pre-auth. Mobile reality: a device can't be prompted to *enroll* biometrics for an account it hasn't authenticated into yet. The two are different moments — resolved below:
- **Biometrics not yet enrolled for this account:** no biometric affordance renders on this screen. After the *next* successful email/password sign-in, the app shows the enrollment `Sheet` once (see §7, §9).
- **Biometrics already enrolled:** a small Face ID / Touch ID icon button renders in region 6, letting a returning user skip the form entirely.

**ASCII Wireframe (390×844):**
```text
┌─────────────────────────────────────────────┐
│ [←]                                           │
│ ┌───────────────────────────────────────────┐│
│ │ ⚠  you're offline — we'll sync when back  ││  ← conditional, offline only
│ └───────────────────────────────────────────┘│
│                                               │
│                  ⌬ Balencia                   │
│                                               │
│         Welcome back. Let's pick up           │
│                your *momentum*.               │
│                                               │
│ ┌───────────────────────────────────────────┐│
│ │ ✉   email address                         ││
│ └───────────────────────────────────────────┘│
│ ┌───────────────────────────────────────────┐│
│ │ 🔒  password                         👁    ││
│ └───────────────────────────────────────────┘│
│                                               │
│  ◯ remember me                forgot password?│
│                                               │
│ ┌───────────────────────────────────────────┐│
│ │                  sign in                   ││
│ └───────────────────────────────────────────┘│
│                                               │
│               or continue with                │
│                                               │
│ [   G    sign in with Google         ]       │
│ [   🍎   sign in with Apple          ]       │
│                                               │
│                  (  👤  )                     │  ← only if biometrics enrolled
│                                               │
│      feeling overwhelmed? crisis resources     │
│               are one tap away.                │
│                                               │
│        don't have an account? sign up          │
└─────────────────────────────────────────────┘
```

### 5. Components
* **TopBar** — back chevron only, no title, transparent over atmosphere. Content here never scrolls under it on standard viewports, so the `.glass-pill` scroll-backdrop state is dormant on this screen (kept only as the fallback for very short devices where the safety link pushes past the fold).
* **OfflineBanner** — `.glass-pill`, `rgba(10,10,15,.55)`, conditional, non-blocking.
* **GlassPillInput** × 2 — email (variant `email`, leading ✉ glyph), password (variant `password`, eye toggle). Height 52, radius 999, placeholder paper-40%, focus = 1px orange border + `glow-you` bleed.
* **Toggle** — track `--surface-3`, active fill `#FF5E00`, thumb paper-50, per catalog verbatim. Paired with a Body, paper-100 "remember me" label (a persistent functional label, not a placeholder — full-contrast text, unlike the input placeholders).
* **BtnGhost** — "forgot password?" only. **Correction:** the draft also assigned `BtnGhost` to the "remember me" label; that label isn't a button, it's static text beside a `Toggle`. Reassigned.
* **BtnPrimary** — "sign in," orange fill, one per composition.
* **BtnSecondary** × 2 — Google, Apple OAuth.
* **BtnSecondary, icon-only application** — Face ID / Touch ID affordance, 56px circular `.glass-pill` (matches `FABQuickLog`'s icon scale for cross-system sizing consistency), rendered only when biometrics are already enrolled. Not a new component — an icon-only application of the existing button.
* **SafetyResourceCard, lightweight presentation** — rendered here as a quiet inline text link rather than the catalog default `--surface-2` card. **Rationale (flagged deviation, not a contradiction):** the default card would visually compete with the single primary CTA on a routine, low-stakes utility screen and misrepresents urgency for what is, for most users, an ordinary sign-in moment. The link stays "always reachable" per Canon §8; tapping it opens the full `SafetyResourceCard` treatment inside a `Sheet` (variant `half`) with its real call/text actions intact.
* **Sheet** (variant `half`, `.glass-frost`) — post-success biometric enrollment prompt. Appears once, after a successful password sign-in, never pre-auth.
* **ChipProvenance** — reused for the 429 rate-limit honesty label (`system rate-limit`), an intentional extension of its "data-source" role to a system-timer value; still a provenance claim about where a number came from, so no new component is warranted.

### 6. Visual treatment
* **Glass tiers:** `.glass-pill` for inputs and both auth buttons; flat `--bg-base` + atmosphere for the screen field, keeping text legible and the composition premium rather than densely glassy (Canon §2 rule: data-light, hero-light screens stay mostly flat).
* **Semantic inner-glow — corrected:**
  * **Inputs, focus state:** `--glow-you` (`#FF5E00`). Meaning: *your* effort, active engagement.
  * **BtnPrimary "sign in":** a restrained, static `glow-you` halo beneath the fill when the form is valid. This is a deliberate, subtle extension of the glow language to the screen's one consequential action (orange = your forward motion) — **not** a "breathing" animation. Canon §6 reserves glow-breathe for hero cards; a routine CTA doesn't qualify, so the halo holds steady rather than pulsing.
  * **Biometric icon button:** **no color glow.** **Correction:** the draft assigned `glow-cia` (purple) here with the rationale "secure, system-level intelligence." Device biometrics are a local OS security feature, not a CIA/AI insight — purple is reserved system-wide for genuine CIA/AI moments (Canon §3, and this brief's explicit rule that purple = CIA/AI only). Misusing it here would dilute the one signal purple is supposed to carry everywhere else. The icon instead renders as a plain, neutral `.glass-pill` circle with a 1px `rgba(255,255,255,.10)` border; on press it brightens to `.16` like any other secondary control. **Net effect: this screen carries zero purple.** That's correct, not a gap — sign-in has no CIA/AI content to signal.
* **Wrong-credentials error state — corrected (no invented hex):** the draft specified "2pt red borders." Canon defines no error-red token, and the brief permits only canon hexes plus the domain-tag palette (which is explicitly "never chrome"). Inventing a red would break both rules. Fix: the input border lifts from its default `rgba(255,255,255,.08)` to `rgba(255,255,255,.16)` (an existing token step, not a new color), paired with a paper-100 `✗` glyph and a paper-100 Caption error line below the field. Error is signaled by glyph + copy + border weight together, never by color alone — which is also the more accessible pattern (WCAG 1.4.1, don't rely on color to convey state).
* **Background atmosphere:** the mandatory warm radial glow, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `#0A0A0F`, plus 3–4% grain (soft-light). No purple pool — reserved for CIA moments, absent here (see above).
* **Type — corrected (explicit typeface + tabular-nums, previously underspecified):** the draft named only "H1 scale" in §4 without confirming a typeface, and never addressed `tabular-nums` for this screen's one live numeral. Fixed, stated in full: every text element on this screen runs **Neue Montreal** (Canon §5) — H1 heading in NM Medium 500 (30–34), the "remember me" label and error Caption in NM Regular/Light per their rows, legal micro-copy in NM Light 12. The lone exception is the **429 rate-limit countdown** ("retry in 4:32," §7–§9) — because it re-renders every second, it falls under Canon §5's `Stat/KPI` row (`NM Medium, tabular-nums — all numbers`): it renders in **NM Medium with `font-variant-numeric: tabular-nums`**, so the digit glyphs hold fixed width and the surrounding banner copy doesn't jitter as seconds tick down. Tiempos italic stays reserved for the single emphasis word (*momentum*) — it never touches a numeral or a functional label.
* **One hero type moment:** the H1 — "welcome back. let's pick up your *momentum*." — *momentum* set in Tiempos Medium italic, sentence case throughout, no exclamation mark.
* **60/30/10 — corrected accounting:** the draft's checklist claimed "purple 30%, green 10%," inverting Canon §4's actual system ratio (orange 60 / green 30 / purple 10) and further misapplying it as if every screen must hit those numbers individually. Corrected reading: this specific screen is honestly *not* 60/30/10 — it runs almost entirely on orange (CTA, focus glow, active toggle) with green and purple both essentially absent, because sign-in has no completion moment (nothing "done" yet) and no CIA insight to show. That's the correct, honest outcome for this screen type, not a violation of the system ratio, which is a whole-app guideline, not a per-screen quota.

### 7. Content & copy
* **Heading:** Welcome back. Let's pick up your *momentum*.
* **Email placeholder:** email address
* **Password placeholder:** password
* **Forgot password link:** forgot password?
* **Persistence label:** remember me
* **Primary CTA:** sign in
* **Divider:** or continue with
* **Social auth:** sign in with Google / sign in with Apple
* **Legal micro-copy** (Caption, paper-40%, beneath the social row): By continuing, you agree to Balencia's terms and privacy policy. **Addition, with rationale:** Canon §8 requires a consent signal on any screen touching a third-party source, and Google/Apple sign-in qualifies. A full `ConsentCard` is the wrong weight here — that pattern is reserved for health data, photos, and voice, and the OAuth providers already surface their own consent screens at the OS level. A single legal link is the honest, correctly-scaled response; upgrading it to a blocking `ConsentCard` would be forced compliance theater, not real protection.
* **Footer:** don't have an account? sign up
* **Biometric enrollment prompt** *(Sheet, shown once, post-success only — never pre-auth)*:
  * Heading: sign in *faster*?
  * Body: use Face ID to sign in instantly next time. *(OS-detected copy swaps "Face ID" for "Touch ID" or "biometrics" as needed.)*
  * Primary CTA: enable Face ID
  * Secondary CTA: not now
* **Biometric failure fallback:** biometric failed. use password to sign in.
* **Offline banner:** you're offline — we'll sync when you're back online.
* **Safety link:** feeling overwhelmed? crisis resources are one tap away.
* **429 honesty copy:** face id unavailable — retry in 4:32 (live countdown, NM Medium `tabular-nums` per §6, `ChipProvenance`: `system rate-limit`). If the timer value itself fails to load: too many attempts. try again later. — never a guessed number.

### 8. Data & honesty states
This is a utility screen with no user metrics, so the invariant applies to the one number it does surface: the **biometric cooldown timer** after repeated failed attempts (HTTP 429).
* **Real:** biometric icon disables; a `SyncStatus`-style inline glass-pill banner renders beneath it with a live depleting countdown ("retry in 4:32," NM Medium `tabular-nums` per §6) and `ChipProvenance: system rate-limit`. Updates every second from the server-supplied retry-after value — `tabular-nums` keeps the digit width fixed so the once-per-second update never reflows the banner.
* **Low-confidence:** *not applicable, by design.* Rate-limit windows are exact, server-issued values — there is no "estimated" version of a cooldown, and inventing a fuzzy one would be dishonest in the other direction (implying uncertainty about a fact the server knows precisely).
* **Honest null:** if the retry-after value fails to arrive, the UI shows plain copy — "too many attempts. try again later." — with the icon disabled and no countdown. Never fabricates a number to fill the gap.

### 9. All states
* **Default (cold-start):** form blank, both fields unfocused, `BtnPrimary` at 40% opacity (disabled, no glow). No biometric affordance (unless previously enrolled on this device).
* **Filled / valid:** `BtnPrimary` reaches full opacity and gains its static `glow-you` halo once both fields pass format validation.
* **Disabled:** `BtnPrimary` at 40% opacity, no haptic — active whenever a field is empty, email format is invalid, or the account is in 429 cooldown.
* **Loading:** CTA label crossfades to a spinner, width locked. Toast-free — a small inline line beneath the form reads "signing you in — one moment."
* **Success:** form fades and lifts slightly, root resets to Home [12]. If this device has never enrolled biometrics, the enrollment `Sheet` (variant `half`) presents once, immediately after the reset animation settles.
* **Error — network:** `OfflineBanner` slots in under the top bar; form stays fully visible and interactive (local validation still works offline; submission simply queues/fails gracefully).
* **Error — wrong credentials:** border lifts to `rgba(255,255,255,.16)` on both fields, paper-100 `✗` glyph appears, Caption line below the form reads "that email or password doesn't match." (see §6 for the no-invented-hex correction).
* **Error — 429 biometric:** biometric icon disabled and dimmed; `SyncStatus`-style banner with live countdown per §8.
* **Biometric — enrolled path:** icon button present from load; tap triggers the native OS prompt directly, bypassing the form on success.
* **Biometric — not enrolled path:** no icon on this screen; see the post-success `Sheet` in §9 "Success."
* **Skeleton:** *not applicable.* Every element on this screen is local UI state (no remote data to hydrate before paint), so there is nothing to skeleton — an honest "not applicable" rather than a loader with nothing to loop over.

### 10. Motion & interaction
* **Gestures:** tap to focus fields; native edge-swipe right to pop the stack.
* **Easing & timing:** physical easing throughout (`ease-flow`); feedback strictly 150–250ms.
* **Screen mount:** staggered fade-in — brand mark (0ms) → heading/form (100ms) → alternative paths (200ms).
* **Correction — signature CTA animation removed:** the draft introduced `NEW: CTAContinuousStroke`, a self-drawing 520ms outline on the "sign in" button, justifying it as "the signature continuous-stroke animation." Canon §6 is explicit that the continuous-stroke line motif is reserved for hero/celebration moments — a routine sign-in tap is neither. Applying it here would cheapen the one moment (celebration, hero cards) it's meant to make feel special. Removed. `BtnPrimary` instead uses its catalog-standard press behavior: scale to .98 with a 6% darken, 150–200ms, no drawing animation.
* **Biometric OS handoff:** form dims to 40% opacity (160ms) when the native prompt activates, snaps back to 100% on dismiss; a brief low-amplitude icon pulse (400ms) signals failure — paired with the fallback copy in §7, never color-only.
* **Error shake:** on wrong-credentials, both fields get a single low-amplitude horizontal shake (150ms) alongside the border/glyph change — motion reinforces the error without relying on the missing red hex.
* **Glow behavior:** the CTA's `glow-you` halo is static once valid (see §6 correction) — it does not breathe. Nothing on this screen breathes; breathing is reserved for hero cards, and this screen deliberately has none.
* **Reduced-motion path:** mount stagger snaps to final state instantly; press feedback becomes a simple opacity dip; error shake is replaced by an instant border/glyph change with no translation; biometric dim/reveal snaps (0ms).

### 11. Motivation-tier adaptation
* **Low density:** only the email/password fields and `BtnPrimary` render by default. Social auth, the legal line, and the biometric icon collapse behind a `BtnGhost` "more options."
* **Medium density (default spec):** full vertical rhythm as specified above — form, CTA, divider, social, biometric (if enrolled), safety link, footer.
* **High density:** `GlassPillInput` height reduces to 44px (the accessibility floor, not below it), tightening rhythm so the "remember me" row, CTA, and both social buttons fit inside the native viewport without scrolling on compact devices.

### 12. Accessibility
* **Contrast:** paper-100 (`#FEFAF3`) on `#0A0A0F` clears AA+ (>7:1) for all functional labels — heading, button labels, the "remember me" text, and error copy. Input **placeholders** intentionally sit at paper-40% (a supplementary hint, not the field's only label) — every field also carries a persistent `aria-label` ("email address," "password") so screen-reader users never depend on placeholder contrast for meaning, and typed text itself renders at full paper-100.
* **Targets:** all interactive elements — both inputs, the eye toggle, `Toggle`, `BtnGhost`, `BtnPrimary`, both `BtnSecondary` buttons, and the biometric icon — meet the 44×44px minimum, including in the high-density tier.
* **Screen-reader labels:** back chevron → "return to welcome screen"; eye toggle → "show password" / "hide password" (state-dependent); biometric icon → "sign in with Face ID" (or the OS-appropriate label); error state is announced via `aria-live="polite"` on the Caption error line, not conveyed by border color alone (ties to the §6 correction).
* **Reduced motion:** full path specified in §10; nothing on this screen depends on motion to convey state.

### 13. Premium checklist
1. **Connects — corrected to not applicable, with rationale (previously a forced "yes"):** the draft claimed "yes" on the strength of the word "momentum" in the heading, but that's copy tone, not cross-pillar intelligence — Canon's north star for "connects" means a CIA insight, a domain-tag pairing, or a life correlation across pillars (Canon §0), none of which this screen can honestly produce. Sign-in is **pre-authentication**: there is no session, no domain data, and no user history yet for CIA to read, so there is nothing to correlate and no honest `CIAInsightCard` or `ChipDomainTag` pair to show. Forcing one on here to manufacture a "yes" would be decoration without meaning — the same failure mode this spec already rejects when it strips purple from the biometric icon (§6) and drops the fake continuous-stroke CTA animation (§10). **Correctly scored: not applicable, by design** — cross-pillar intelligence has no honest expression before authentication exists. The heading's *momentum* stays as recognition-tone copy (Canon §10 voice), not a substitute for a connects claim; the first honest "connects" moment for this user is CIA's post-onboarding insight, not sign-in.
2. **Honest:** yes — the one number on this screen (the 429 cooldown) follows the real/low-confidence/honest-null invariant exactly, with an explicit, reasoned "not applicable" for the low-confidence tier (§8).
3. **Premium:** yes — generous whitespace, glass reserved for inputs and buttons only, no invented CTA gimmick (the continuous-stroke misuse was caught and removed, §10).
4. **Color 60/30/10:** corrected — this screen honestly runs almost entirely on orange, with purple and green both absent by design (§6). The system ratio is a whole-app guideline, not a per-screen quota, and forcing purple or green in here would have been decoration without meaning.
5. **Glass tiers:** yes — `.glass-pill` for inputs/buttons, flat `--bg-base` + atmosphere for the field.
6. **One hero type moment:** yes — *momentum*, Tiempos italic. **Type rules — corrected (previously underspecified):** the draft's §4 named only "H1 scale" with no typeface confirmed and never addressed `tabular-nums`; both are now explicit — Neue Montreal Medium 500 for the H1 (§4, §6) and NM Medium `tabular-nums` for the 429 countdown, the screen's one live per-second stat (§6, §7, §8).
7. **One emphasis word per moment:** yes — *momentum* on the main screen, *faster* on the (separate) enrollment sheet.
8. **Voice:** yes — sentence case, no exclamations, second person, CIA never CIA (checked: term doesn't appear).
9. **Honesty states:** yes, and correctly scoped to the one metric that actually exists here.
10. **AA+ contrast:** yes, with an explicit, justified exception for supplementary placeholder text (§12).
11. **44px targets:** yes, including in the high-density tier.
12. **Reduced-motion path:** yes — covers mount, press, error, and biometric handoff.
13. **Safety layer:** yes — crisis resources reachable pre-auth, presented at a weight appropriate to a routine utility screen (§5 rationale).
14. **Consent & third-party data:** yes — a scaled-correctly legal link for OAuth, not an over-built `ConsentCard` (§7).
15. **Persona/semantic-glow discipline:** yes — purple's biometric misuse was caught and removed; this screen intentionally carries zero CIA/purple presence (§6).
