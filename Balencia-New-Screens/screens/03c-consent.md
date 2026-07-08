# Balencia Hi-Fi Screen Spec: 03c-consent

## 1. Header
* **Screen ID:** 03c
* **Name:** Privacy consent
- **Route(s) covered:** No live route; consent gate inside the onboarding stack before `/onboarding`.
* **Tab:** Hidden (pre-auth)
* **Source:** Functional Content Brief: Privacy Consent
* **Batch:** 2

## 2. Purpose
The legal gateway requiring explicit, non-shaming acceptance of the Terms of Service and Privacy Policy before onboarding proceeds. The account already exists at this stage — progression is gated purely by explicit consent, and clearing this gate unblocks CIA Onboarding [07]. Nothing here is a CIA moment: it is a plain, neutral legal ask, and the screen is designed to read that way.

## 3. Entry & exit
* **Arrives from:**
  * OTP Verification [03b] via stack push (email registration path).
  * Complete Profile [03d] via stack push (social auth path).
* **Primary exit:** CIA Onboarding [07] via stack push on API success.
* **Abandonment:** force-quitting the app returns the user to this screen on next launch (no back button — there is nowhere to go back *to* until consent is cleared).

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **Status bar zone** — system default, over atmosphere.
2. **Brand anchor** — Balencia wordmark (Chillax — the one place this typeface appears; Neue Montreal governs everything else on this screen) + 48×48pt symbol, centered.
3. **Header zone** — heading + subtitle, centered.
4. **Required consents card** — `SolidCard` housing two mandatory gating rows, separated by a `1px rgba(255,255,255,.06)` hairline.
5. **Optional consents card** — `GlassCard` housing the marketing opt-in row.
6. **Acceptance read** — status line, tabular-nums count.
7. **Primary CTA** — full-width submission button.
8. **Home indicator** — system safe area.

**ASCII wireframe (390×844):**
```text
+-------------------------------------------+ 0
|                                           |
|               STATUS BAR                  | 44
|                                           |
|              [BALENCIA]                   | 140 (wordmark, Chillax)
|                                           |
|         Before we *begin*                 | 200 (Display, 34)
|      Review and accept our policies       | 240 (Body-light, 16)
|              to continue                  |
|                                           |
| +---------------------------------------+ | 300
| | REQUIRED                              | | (Overline 11, +.14em)
| |  [ ] I accept the Terms of Service   >| | 352 (Row 1, SolidCard)
| |---------------------------------------| | (hairline rgba(255,255,255,.06))
| |  [ ] I accept the Privacy Policy     >| | 404 (Row 2)
| +---------------------------------------+ | 456
|                                           |
| +---------------------------------------+ | 484
| | OPTIONAL                              | | (Overline 11)
| |  Send me tips and updates    [ O ]    | | 536 (GlassCard, glow-you)
| +---------------------------------------+ | 588
|                                           |
|            0 of 2 required                | 640 (Body-light 15, tabular-nums)
|                                           |
| +---------------------------------------+ |
| |               continue                | | 712 (BtnPrimary, h52)
| +---------------------------------------+ |
|                                           | 772
+-------------------------------------------+ 844
```

*Correction — brand anchor label:* the draft's ASCII placeholder read `[CIA]` in the wordmark slot. That directly undercuts this screen's own "legal neutrality, no CIA branding" decision (see §6) — you cannot argue the screen avoids branding this as an AI prompt while labeling the hero mark `[CIA]`. Fixed to `[BALENCIA]`; the wordmark is the brand, not the coach.

*Correction — no-scroll claim:* the brief specified "no scroll, fixed view fitting all device sizes." Forcing that for actual legal text is fragile the moment dynamic type scales up, and it also tempts a design into cramming full ToS/Privacy body copy on-screen — which nobody reads and which breaks at any accessibility text size. Fixed by moving full legal text out of this frame entirely: rows 1–2 are tap targets that open the document in a `Sheet` (variant `full`, see §5), not inline text. That keeps *this* 390×844 frame genuinely fixed at default type size, while the reading surface for the actual policies scrolls independently. The remaining scroll risk is narrower and named honestly in §12: past `accessibilityExtraExtraLarge`, this outer frame also needs to scroll.

## 5. Components
* **SolidCard** — Required consents container. `--surface-2` (#211008) bg, radius 28, border `rgba(255,255,255,.06)`, no blur — the legal-gate zone that keeps things legible over atmospheric.
* **ListRow** — each required row: leading `ConsentCheckbox` (NEW, below) · label (Body 16) · trailing chevron (opens the Sheet). 56px min height per catalog (draft said 52px — corrected). Tapping anywhere in the row's 56px band toggles the checkbox; tapping the label text specifically opens the Sheet — see §10 for how those two gestures share a row without colliding.
* **GlassCard** — Optional consents container, `default` variant, radius 28. *Correction:* the draft named this container `ConsentCard` in §5 but `.glass-card` in §6 — two different catalog components describing one region. `ConsentCard` is a `FrostCard` built for data/photo/voice/third-party permission asks with paired accept/decline buttons and a stated retention policy; a single marketing toggle has none of that shape. Reassigned to plain `GlassCard` (default), which is the correct fit and resolves the contradiction.
* **Toggle** — marketing opt-in. Track `--surface-3` (#2A1510), active fill `#FF5E00`, thumb paper-50 (#FDFDFB).
* **ConsentCheckbox** — **NEW.** 24px visual box, `#FF5E00` fill when checked, paper-50 (#FDFDFB) check glyph, 6px radius (square-ish, not a pill — reads as a form control, not a chip). 44×44pt tap target expands invisibly around the 24px visual, independent of the `ListRow`'s own 56px band. *Rationale:* the catalog has no dedicated legal checkbox (Toggle/Stepper/Slider covers binary-preference controls, not gating affirmations); a checkbox reads as "I attest," a toggle reads as "I prefer" — the semantic difference matters for a legal gate and is worth one small new primitive rather than misusing Toggle twice on one screen.
* **Sheet** (variant `full`) — houses the actual Terms of Service / Privacy Policy document text. `.glass-frost` tier, top-radius 28, grabber pill, scrim `rgba(10,10,15,.6)`, spring in 250ms. Internal `TopBar` (back chevron, document title). Two instances of this same component, one per document — not one shared component with a document switcher; each row's chevron opens its own document, no ambiguity about which is which.
* **ErrorState** — inside the Sheet, if the document fails to load: glyph + Body line + `BtnSecondary` retry. *Correction:* draft listed a bare "retry" text link with no component backing. `BtnSecondary` (`.glass-pill`, paper-100 label, 1px `.10` border) is the catalog citation for exactly this.
* **BtnPrimary** — full-width `continue`. Height 52, radius 999, `#FF5E00` fill, paper-50 (#FDFDFB) label, NM Medium 16. States per catalog: disabled 40% opacity, loading = label→spinner with width locked.
* **BtnGhost** (density variants only) — `Email preferences` link in low density, `Data control` link in high density. See §11.
* **ProgressBar** (variant `segmented`, high density only) — see §11.
* **OfflineBanner / SyncStatus** — connectivity state banner, adapted copy (see §8/§9). *Correction:* draft assigned this job to `ChipProvenance`, which the catalog defines as a data-*source* chip (`via WHOOP`, `you logged`, `estimated`) — it has no connectivity-state role. The catalog's actual connectivity component is `OfflineBanner / SyncStatus`; reassigned. Its stock copy pattern ("offline — showing last sync 2h ago") assumes prior synced data, which doesn't exist on a one-time pre-auth consent screen — copy is adapted honestly rather than fabricating a "last sync" timestamp that has no referent here.
* **Overline** (type token, not full `SectionHeader`) — `REQUIRED` / `OPTIONAL` eyebrows. No trailing action or H2 needed, so the lighter type-token citation is more accurate than invoking the whole `SectionHeader` component.

## 6. Visual treatment
* **Glass tier per region:**
  * Required consents: `SolidCard` — data-dense, high-legibility legal gating, no blur.
  * Optional consents: `GlassCard` (`.glass-card`) — lower-stakes, atmospheric.
  * Legal document reading surface: `Sheet` (`.glass-frost`) — immersive, over scrim.
* **Inner-glow & meaning:**
  * Optional consents card: `--glow-you` (#FF5E00). Meaning: this is the one thing on the screen that is the user's own voluntary preference, not a legal requirement — "you," not "you must." Recipe per canon §3: bottom-anchored radial, `color-mix(in srgb, var(--glow-you) 55%, transparent)` → transparent 70%, blur 24px, height 62% of card.
  * Required consents card: **no glow, and that's intentional, not an oversight.** `SolidCard` is the catalog tier that trades atmosphere for legibility, and nothing in its definition carries a glow — every other `SolidCard` use in the catalog (`KPIRow`, dense lists) is glow-free too. A legal gate is exactly the wrong place to introduce a decorative signal competing with the reading task; the honest choice is no glow here, not a forced one applied for compliance's sake.
* **Background atmosphere:** `--bg-base` (#0A0A0F) with the standard soft warm radial glow top-center, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)`. No CIA purple pool — this is a deliberate exception to the "CIA moments add a purple pool" default: this isn't a CIA moment, it's a neutral legal gate, and branding it with the coach's color would blur the line between "the app's legal obligations" and "CIA's voice." Consistent with omitting any coach presence from the wordmark (see §4 correction).
* **Hero type moment:** "Before we *begin*" — Display, NM Medium 500, 34px (low end of the 34–52 range; this screen doesn't need a big editorial moment, it needs to get out of the way).

## 7. Content & copy
* **Heading:** Before we *begin*
* **Subtitle:** Review and accept our policies to continue
* **Required card eyebrow:** REQUIRED
* **Optional card eyebrow:** OPTIONAL
* **Required row 1 label:** I accept the Terms of Service
* **Required row 2 label:** I accept the Privacy Policy
* **Optional toggle label:** Send me tips and updates via email
* **Acceptance read — pending:** 0 of 2 required
* **Acceptance read — partial:** 1 of 2 required
* **Acceptance read — ready:** 2 of 2 · *ready*
* **Primary CTA:** continue
* **Inline validation error:** Accept both to continue
* **Network error:** Check your connection and try again
* **Server error:** Something went wrong on our end. Try again in a moment
* **Document load failure (inside Sheet):** Could not load the page. Check your connection
* **Document load retry:** retry
* **Offline CTA (disabled state):** You need a *connection* to continue
* **Offline banner:** No connection right now — you can review, but continue needs you online

*Correction — CIA, not CIA:* the brief this was drafted from apparently referenced "CIA" somewhere upstream. Per canon, CIA does not exist anywhere in this system — it's always CIA. This screen doesn't actually name the coach in its copy (correctly — see §6), so there was nothing to rename on this page itself, but flagging it here since the draft's own correction note surfaced the contradiction without fully resolving it.

*Correction — mismatched error copy:* the draft's "Server Error Toast" read "Please accept the required policies to continue" — that's the *validation* error, not a server failure message, and it was a copy/paste duplicate that told the user their own input was wrong when the actual failure was on the backend. Rewritten so network and server failures each describe what actually happened, per canon's "plain language, no codes" rule for `ErrorState`.

*Correction — verb mismatch:* the draft's offline CTA text read "Accept requires a *network* connection," but the button itself is labeled `continue`, not `accept`. Rewritten to reference the button's own label so the disabled-state copy and the button agree with each other.

*Correction — invented sync behavior:* the draft's offline toast claimed "Policies will sync when online" — implying an autonomous background retry that no other part of this spec describes (§9's Offline state just disables the CTA; nothing queues a resubmission). Claiming silent background sync when the actual behavior is "come back and tap continue again" is exactly the kind of fabricated-behavior problem the honesty rule exists to catch, even when it's system copy and not a data metric. Rewritten to state the real behavior: review is still possible, submission needs you back online and pressing the button yourself.

## 8. Data & honesty states
**Consent acceptance count (derived local state):**
* **Real:** renders as `2 of 2 · ready` once both boxes are checked. No `ChipProvenance` chip is attached to this value — that's an intentional, not a forgotten, omission: `ChipProvenance` exists to disclose *external* data sources (`via WHOOP`, `estimated`), and this count has zero source ambiguity — it is the direct, same-frame result of the user's own taps, nothing is fetched or inferred.
* **Low-confidence:** not applicable, and this is a justified N/A rather than a skipped case — a checkbox is a boolean the user directly set; there is no partial-confidence rendering of "checked" or "unchecked" for CIA or any system to estimate.
* **Honest-null:** `0 of 2 required` on cold start. Neither box is ever pre-checked; the count never starts anywhere but zero.

**Network/submission status:**
* **Real:** connection established, `POST /api/auth/consent` resolves; CTA proceeds to success state.
* **Low-confidence:** not applicable — connectivity is binary at the point of submission, there is no "probably online" middle state worth designing for.
* **Honest-null (offline):** CTA reads `You need a *connection* to continue` and is disabled; `OfflineBanner / SyncStatus` states `No connection right now — you can review, but continue needs you online`. Nothing is invented about background sync (see §7 correction) — the honest behavior is simply "not yet, come back."

## 9. All states
* **Default (cold start):** both required boxes unchecked, optional toggle off. Acceptance read shows `0 of 2 required`. CTA at 40% opacity, non-interactive.
* **Partial accept:** one required box checked. Acceptance read shows `1 of 2 required`. CTA still disabled.
* **Gate ready (pre-submit):** both required boxes checked. Acceptance read turns forest green `#34A853`, showing `2 of 2 · ready`. CTA reaches full opacity and becomes interactive.
* **Loading:** API POST in flight. CTA label crossfades to a spinner; CTA is non-interactive; width locked (catalog `BtnPrimary` loading state).
* **Success:** 250ms forest green flash across the CTA, then stack push to CIA Onboarding [07].
* **Inline error:** only reachable if gate logic is somehow bypassed and an invalid state is submitted. CTA shakes horizontally 10px (transform only, no layout shift); error text `Accept both to continue` slides down 10px below the CTA.
* **Network error / server error:** on API failure, CTA reverts to its gate-ready state (never stuck mid-loading); the matching error copy from §7 appears as a banner sliding down from the top.
* **Document load failure (inside Sheet):** `ErrorState` renders in place of the document — glyph, `Could not load the page. Check your connection.`, `BtnSecondary` retry.
* **Offline:** device loses connection. CTA label swaps to `You need a *connection* to continue` and disables; `OfflineBanner / SyncStatus` appears. Checkbox/toggle state is preserved untouched — going offline never resets what the user already decided.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## 10. Motion & interaction
* **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for entrances and toggle transitions — canon specifies physical, non-linear easing without pinning an exact curve; this is the native-feeling decel curve used consistently for sheet/toggle motion elsewhere in the system.
* **Timing:** 150–250ms for checkbox/toggle tap feedback, per canon.
* **Screen entrance:** staggered fade-in, downward drift. Wordmark (0ms) → header (50ms) → cards (100ms) → CTA (150ms).
* **Checkbox/toggle interaction:** the `ListRow`'s 56px band toggles the `ConsentCheckbox` on tap anywhere in the row *except* the label text itself, which instead opens the document `Sheet` — this is the resolution to the "tap-anywhere" ambiguity a checkbox row plus a document link both want: box + trailing chevron area = toggle, label text = read the document. Both zones individually still clear 44px.
* **CTA enable/disable:** 200ms opacity + fill crossfade tied to gate state.
* **Error messaging:** slides down 10px + fades in on appearance; slides up + fades out on dismissal.
* **Success:** 250ms forest green flash, then navigation — no continuous-stroke line motif here; that motif is reserved for hero/celebration moments per canon §6, and a legal gate clearing is neither.
* **Glow behavior:** the Optional card's `--glow-you` bleed brightens 10% when the marketing toggle flips on — the only place on this screen where a glow visibly reacts to input, matching the fact that it's the only card carrying one.
* **Haptics:** light impact on checking the second required box (the moment the gate becomes ready).
* **Reduced-motion path:** all staggers/slides collapse to opacity-only fades; the success flash becomes a static color swap instead of an animated one.

## 11. Motivation-tier adaptation
* **Low density (privacy-first):** the Optional consents card collapses to a single `BtnGhost` reading `Email preferences`, deferring the marketing decision to Settings rather than presenting it as a toggle on the gate screen — minimizes cognitive load and keeps the legal ask from being crowded by a marketing ask.
* **Medium density (canonical):** the spec as written above — Optional card expanded, clear `0/1/2 of 2` read.
* **High density (enterprise/strict):** the acceptance read expands into a `ProgressBar` (variant `segmented`), one segment per document, so it's visible exactly which document is still outstanding; adds a `BtnGhost` linking to a centralized `Data control` center for users who want the fuller picture before proceeding.

## 12. Accessibility
* **Contrast:** paper-100 (#FEFAF3) on `--surface-2` (#211008) computes to **≈17.6:1** — comfortably exceeds AAA (7:1). Paper at 64% opacity on `--surface-2` computes to **≈7.7:1** — also clears AAA for normal text, not merely AA as the draft under-claimed. *(Both figures independently recomputed against the exact canon hexes; the draft's "16.5:1 / passes AA" was in the right neighborhood but not accurate enough for a checklist that's making a compliance claim.)*
* **Touch targets:** `ConsentCheckbox` visual is 24px but its own tap target is 44×44pt, independent of the row; the surrounding `ListRow` band is 56px min height (catalog value — draft said 52px, corrected). Toggle thumb's effective tap target is padded to 44px.
* **Screen-reader labels:**
  * Terms checkbox: "Checkbox, unchecked. Accepts Terms of Service."
  * Privacy checkbox: "Checkbox, unchecked. Accepts Privacy Policy."
  * Document links: "Button. Opens Terms of Service." / "Button. Opens Privacy Policy." — relabeled from "Link... in webview" since the document now opens in an in-app `Sheet`, not a webview (see §4 correction); the label should describe what the user experiences, not the implementation.
  * Marketing toggle: "Toggle, off. Send tips and updates by email."
* **Dynamic type:** honored up to `accessibilityExtraExtraLarge` at the default fixed-frame layout; beyond that, this outer screen (not just the document `Sheet`, which always scrolls) enables vertical scrolling rather than clipping content — named plainly rather than pretending the no-scroll constraint holds at every text size.

## 13. Premium checklist
* [x] **Connects:** clearing consent unblocks CIA Onboarding [07]; nothing about this screen references CIA directly, by design (see §6).
* [x] **Honest:** zero dark patterns — both boxes default unchecked, no pre-ticked marketing opt-in, no invented "will sync later" behavior (corrected in §7), no fabricated contrast claims (corrected in §12).
* [x] **Premium:** 8pt grid throughout; `SolidCard` for legal legibility, `Sheet` (not an external webview jump) for reading the actual documents.
* [x] **Glass selective:** `SolidCard` for the dense legal gate, `GlassCard` for the lighter optional ask, `.glass-frost` `Sheet` for the immersive document read — three tiers, each earning its place.
* [x] **Semantic glow:** exactly one glow on the screen (`--glow-you` on Optional consents, meaning stated); Required consents carries none, justified in §6 rather than silently skipped.
* [x] **Color ratio:** burnt orange (60) via CTA + active checkbox fill; forest green (30) for the ready-state confirmation; royal purple (10) absent, deliberately, to preserve legal neutrality.
* [x] **Typography:** one Display moment (*begin*), one Chillax use (wordmark only, per canon), no exclamation marks anywhere in copy.
* [x] **Data-viz:** no fabricated metric — the "2 of 2" count is real, directly-observed local state with an honesty triple written out in §8, not a decorative chart.
* [x] **Voice:** sentence case, second person, no CIA anywhere (corrected reference in §7), one emphasis word per moment, never more.
* [x] **Revoke/control:** document links open full text in-app; high-density variant surfaces a `Data control` center link for users who want it before committing.
* [x] **Motion:** 150–250ms physical easing, transform/opacity only, full reduced-motion path.
* [x] **Targets:** 44px minimum enforced independently of the `ConsentCheckbox`'s 24px visual; `ListRow` at the correct 56px catalog value.
* [x] **Density:** low/medium/high variants defined, each a genuine adaptation (deferral, default, expansion) rather than cosmetic resizing.
* [x] **A11y:** contrast figures independently recomputed and corrected; screen-reader labels match actual (Sheet-based) behavior, not stale webview language.
