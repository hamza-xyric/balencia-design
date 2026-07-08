### 1. Header
- **Screen ID:** 65
- **Name:** 65-force-update
- **Route(s) covered:** No live route; system-level full-screen gate above every authorized and unauthorized route, including the tab shell.
- **Tab:** None (system block — renders above `GlassNavBar`, not inside it).
- **Source:** Functional content brief (Force Update).
- **Batch:** 3

### 2. Purpose
Enforces a minimum app-version floor so the client never talks to a backend it can no longer speak to safely — API compatibility, critical security patches, App Store/Play Store compliance. It is the one screen in the system explicitly built to say "no" to the user, so it has to say it the way the rest of the product speaks: calm, warm, and honest about why, never a hostile OS-style error dialog.

### 3. Entry & exit
- **Entry (system-triggered only, never user-navigated):**
  - *Cold start:* local version check against the remote config endpoint returns `force_update: true` before the tab shell mounts.
  - *Mid-session:* any authenticated API response carries a `version_deprecated` flag; the client mounts this screen as a full-screen overlay above whatever navigation, sheet, or modal was on screen, including in-flight `CIAChatBubble` conversations.
- **Exit:**
  - *Success:* "Update now" opens the native App Store / Play Store listing. The user updates and relaunches; this screen is never seen again because the version check now passes. There is no in-app "continue" — the only way out is a new build.
  - *No secondary exit:* not dismissable, not swipeable, not back-button-able. This is load-bearing, not an oversight — see §10 gesture intercepts.

### 4. Layout anatomy
Single fixed, non-scrolling viewport under the reference frame. Top to bottom:
1. **Status bar zone** — native OS chrome, not a component.
2. **Top spacer** — 48px.
3. **Wordmark** — `Balencia.` static brand mark.
4. **App icon cluster** — app icon + update badge, composite (`LockShieldCluster`, NEW).
5. **Update message block** — title (the screen's one Display moment) + subtitle.
6. **What's new card** — optional, server-driven, collapses to 0pt if empty.
7. **Flexible spacer** — absorbs remaining height, compresses first under pressure.
8. **CTA + version block** — `BtnPrimary` + tabular-nums version caption.
9. **Home indicator zone** — system safe area.

**Fix — small-viewport / long-locale overflow:** the brief treats 390×844 as if it's the only device. It isn't. On SE-class heights (<700pt) or in locales where the subtitle runs long (German, Finnish), the flexible spacer (step 7) compresses to its 16px floor first; if the What's new card still doesn't fit, it truncates to 2 bullet rows before anything scrolls; only if both of those are exhausted does the screen become vertically scrollable, and even then the CTA stays pinned to the safe-area bottom via a sticky footer rather than being pushed below the fold. The one thing that must never happen on a mandatory gate: the only exit action becomes unreachable.

**Fix — server-driven "What's new" list has no upper bound.** The brief renders it as a static 3-line list with no ceiling. Cap the rendered list at 3 items client-side regardless of payload size (server may send more for the store listing / release notes elsewhere); this is a fixed-height, non-scrolling card, so an unbounded list is a layout bug waiting for the day marketing ships a 7-bullet changelog.

**ASCII wireframe (390×844):**
```text
┌─────────────────────────────────────────────┐ (0,0)
│              [ System status bar ]           │
│                                               │
│                  Balencia.                    │  ← Chillax, static brand mark
│                                               │
│                                               │
│                 ⬡ App icon                    │
│                   ◜●◝ badge                   │  ← LockShieldCluster (NEW)
│                                               │
│         An important security update          │
│               is available                    │  ← Display 34, one hero moment
│                                               │
│      This update includes important           │
│    security improvements to keep your          │
│                data *safe*.                    │  ← Body-light, 1 emphasis word
│                                               │
│ ┌─────────────────────────────────────────┐   │
│ │ WHAT'S NEW                              │   │  ← Overline (source: sentence case)
│ │                                          │   │
│ │ ○ Faster CIA coaching responses         │   │  ← plain outline dot, not a spark
│ │ ○ New workout plans and exercises        │   │
│ │ ○ Bug fixes and performance improvements │   │
│ │ via server release notes                 │   │  ← ChipProvenance, Caption
│ └─────────────────────────────────────────┘   │
│                                               │
│            (flexible spacer)                  │
│                                               │
│ ┌─────────────────────────────────────────┐   │
│ │              Update now                  │   │  ← BtnPrimary, solid fill + halo
│ └─────────────────────────────────────────┘   │
│          v2.1.0 → v3.0.0 required             │  ← tabular-nums, via device config
├─────────────────────────────────────────────┤ (390,844)
```
Conditional overlays not drawn above: `OfflineBanner` inserts directly under the status bar; the error toast inserts just above the CTA. Neither is part of the base layout — both are transient, see §9.

### 5. Components
- **Wordmark** — static brand asset, **Chillax** typeface (CANON §5 footnote: "Chillax = logo wordmark only"). Not a catalog component; not subject to Neue Montreal sizing. 20px, +0.02em tracking, paper-100 at 82%, centered. Deliberately small — Display type is reserved for the update title (catalog usage rule: one Display moment per screen), and the wordmark must not compete with it for "hero" status.
- **NEW: `LockShieldCluster`** — composite of the native app icon (96×96, OS squircle mask, product asset — not styled as glass) with a 32px `.glass-pill` badge overlapping its bottom-right corner (−6/−6 offset), containing a 20px rounded-2px-outline update-arrow glyph in orange (`#FF5E00`, tint only, no glow/blur). *Rationale:* the catalog has no composite trust/gate glyph; a bare app icon can't communicate "action required" and a full `PaywallLock` treatment (blurred-preview + unlock CTA) is the wrong metaphor — nothing here is locked behind payment, the *app itself* is temporarily gated. Icon sized at 20px rather than the general ≥24px glyph-target floor because this badge is decorative/informational, not a tappable control — no tap target requirement applies.
- **Display** (CANON §5, 34pt, NM Medium) — the update title. The screen's one hero type moment.
- **Body-light** (CANON §5) — subtitle, paper-64%, max width 327px, centered, 2-line typical.
- **GlassCard**, `variant: default`, non-interactive (no press state — it's a read-only preview, not `interactive`) — container for "What's new." `.glass-card` per CANON §2: radius 28, 24px padding.
- **Overline** (CANON §5) — "What's new" eyebrow; the *stored copy string* is sentence case per voice rules, the *rendered* style applies the Overline role's uppercase + tracking transform. These are not in conflict — one is content, the other is a type treatment.
- **ChipProvenance** — micro caption tag under the What's new list ("via server release notes") and beside the version string ("via device build config"). Required per CANON §7 — even non-health data gets an honest source label, not just WHOOP-style metrics.
- **BtnPrimary** — "Update now." **Fix:** the draft styled this as `.glass-pill` with an orange glow core. That's wrong on two counts: (1) catalog `BtnPrimary` is a **solid `#FF5E00` fill**, not a translucent glass-pill — glass-pill is `BtnSecondary`'s territory; (2) the ambient bloom described belongs *outside* the button, not inside it. Corrected: solid orange fill per catalog spec, radius 999, height 52, with an external `--glow-you` halo (CANON §3 recipe, radial blur 32px behind the pill) breathing behind it — the screen's one focal lantern, borrowed from the hero-card glow-breathe motif even though a button isn't technically a card, because it's the only interactive element on an otherwise static screen.
- **Caption**, tabular-nums — version string "v2.1.0 → v3.0.0 required."
- **OfflineBanner** — conditional, mid-session only. **Fix:** the draft folded offline messaging into a `TopBar` "variant: transparent." Removed — `TopBar`'s catalog anatomy always includes a back chevron, which this screen must never expose (see §3, no secondary exit). `OfflineBanner` is the correct catalog component: a glass-pill strip under the status bar, no navigation affordance.
- **SkeletonState** (partial) — What's new card during fetch: shimmer blocks over the real card geometry, not a spinner.
- **NEW: `SystemGateOverlay`** — the structural wrapper presenting this whole screen: full-bleed, opaque, no scrim, mounts above the tab shell and consumes edge-swipe-back and Android hardware-back at the OS level. *Rationale:* the catalog's `ModalOverlay` is "centered FrostCard over scrim, reserved for blocking moments" — a floating card with a dimmed backdrop showing through. This screen is not that: there's no backdrop to dim because there's nothing behind it worth showing, and it must hard-block system-level back gestures in a way a content-level modal never needs to. Different structural problem, different component.
- *Correction:* the underlying draft referenced an external "8-state interaction model" and a "Premium Craft section" outside the three source files this rewrite was scoped to. Removed — all button/screen states now live in one place, §9 "All states," so there's a single source of truth inside this document rather than a dangling cross-reference to something unverifiable here.

### 6. Visual treatment
- **Screen atmosphere:** CANON §1 mandatory warm radial glow, top-center, over `--bg-base` `#0A0A0F`, plus 3–4% grain. No purple CIA pool — there is no CIA presence on this screen, and a purple wash here would falsely suggest AI involvement in a hard system gate.
- **Glass tiers:** `.glass-card` on the What's new card only; `.glass-pill` on the `LockShieldCluster` badge and the conditional `OfflineBanner`/error toast. The CTA is deliberately **not** glass (see §5 fix) — it's the one solid-fill anchor in an otherwise translucent composition, which is itself a legibility and hierarchy decision: the single thing you must be able to find in under a second reads as the most "solid" object on screen.
- **Semantic glow:** `--glow-you` (#FF5E00) on the CTA only. Meaning: *you* must act to restore access — this is the effort/action color, not a completion or CIA color, and it's correct here because the ask is squarely on the user. Nothing else on screen carries a glow. That's a deliberate choice, not an omission: per CANON §3 a glow must be meaning-driven, and neither the icon cluster nor the What's new card represents effort, completion, or AI insight — forcing a second glow onto either would dilute the one that matters.
- **Bullet glyph fix:** the draft used a "✦" spark glyph for the What's new bullets. Replaced with a plain rounded-outline dot. The spark motif is reserved for `CIAInsightCard`'s AI-insight signifier (catalog §4) — reusing it on a static release-notes list would visually claim these bullets came from CIA, which they didn't.
- **Hero type moment:** the update title, NM Medium 34 (Display range). One per screen, as required.
- **Hero color:** orange, singular, used on the CTA fill + halo and the badge glyph tint only — CANON §4's "one hero color per surface" rule, satisfied.

### 7. Content & copy
CIA voice: sentence case, no exclamations, one Tiempos-italic emphasis word per moment, max. No occurrences of "CIA" were found in the draft to correct, but the coach identity rule still governs any future addition to this screen.

**Two case fixes** (the draft's button labels quietly broke sentence case — a real slip on a screen whose entire premise is calm, honest, non-alarming, non-shouty UI):
- ~~Update Now~~ → **Update now**
- ~~Try Again~~ → **Try again**

Copy inventory:
- **Wordmark:** Balencia. *(static brand mark — exempt from sentence-case voice rules, which govern coaching/system prose, not the logo itself.)*
- **Default title:** A new version is available
- **Default subtitle:** We've made Balencia even better. Update to continue your journey.
- **Security title variant:** An important security update is available
- **Security subtitle variant:** This update includes important security improvements to keep your data *safe*.
- **API-breaking subtitle variant:** This update is required to keep your coaching experience running *smoothly*.
- **What's new eyebrow (stored string, rendered via Overline uppercase transform):** What's new
- **What's new example items:** Faster CIA coaching responses · New workout plans and exercises · Bug fixes and performance improvements *(fixed "AI coaching" → "CIA coaching" — the app has exactly one coach persona and it's never generic "AI")*
- **CTA label:** Update now
- **Version info, real:** v2.1.0 → v3.0.0 required
- **Version info, honest-null fallback:** Update required
- **Loading toast:** Opening the store.
- **Error toast:** Couldn't open the store — check your connection.
- **CTA label, error state:** Try again
- **Offline banner:** You're offline — update when you reconnect.
- **Android back-press toast:** Updating keeps your coaching journey running *smoothly*.

### 8. Data & honesty states
This screen carries no life-domain metrics — no steps, sleep, or Life Power — but its two pieces of dynamic data still owe the user an honest source, so the three-state model applies in spirit even where "low-confidence" is a legitimate not-applicable.

**1. What's new items (server-driven array)**
- **Real:** up to 3 bullets (see §4 fix on capping), `ChipProvenance: "via server release notes."`
- **Low-confidence:** not applicable — these are static marketing strings, not a measured quantity that can be "estimated." Forcing a confidence label onto copy text would be fake precision, not honesty.
- **Honest-null:** card collapses to 0pt height when the server returns no items. No placeholder text, no "check back later" filler — it simply isn't there.

**2. Version metadata (local build vs. required minimum)**
- **Real:** "v2.1.0 → v3.0.0 required," `ChipProvenance: "via device build config."`
- **Low-confidence:** not applicable — build numbers are exact integers from a manifest, not inferred.
- **Honest-null:** if the remote config fails to parse a minimum-version number before timeout, fall back to the unversioned string "Update required" rather than rendering a broken or half-populated comparison.

### 9. All states
- **Cold start / Day 1:** renders immediately and fully populated — icon, badge, title, and version caption are local/bundled and must never show a skeleton.
- **Empty / partial:** What's new card collapses entirely when the server has no items (see §8); everything else renders as normal.
- **Loading — fetch:** What's new card shows `SkeletonState` shimmer (surface-3 base, 1.2s sweep) matching its real geometry while the release-notes payload loads.
- **Loading — deep link:** tapping the CTA locks its width and swaps the label for a spinner; a toast reads "Opening the store."
- **Error:** CTA label changes to "Try again"; a quiet glass-pill toast (same family as `OfflineBanner`, not red, not an alarm icon) reads "Couldn't open the store — check your connection," sitting just above the CTA. This borrows `ErrorState`'s tone — plain language, no error codes, no blaming the user — without swapping the whole screen for the `ErrorState` component, because the update messaging above must stay visible; replacing it with a generic error illustration would bury the one thing the user actually needs to do.
- **Offline:** screen renders normally; `OfflineBanner` appears under the status bar reading "You're offline — update when you reconnect." CTA stays tappable and falls into the Error state if the store genuinely can't be reached.
- **Success:** app backgrounds when the store opens. If the user returns without updating, the CTA silently resets to its default label — no lecture, no re-triggered animation.
- **Disabled:** not applicable, and this is a deliberate design position, not a gap — a permanently disabled CTA on a mandatory gate would be an actual dead end, which CANON §8's locked-feature rule explicitly forbids even for premium gates, let alone a system one. The CTA always accepts a retry.

### 10. Motion & interaction
- **Easing:** physical, never linear; 150–250ms for state transitions (spinner-in, toast-in/out).
- **Entrance:** staggered, ~1.0s total — screen fade, then wordmark, then icon scale-in, then badge spring-in, then title/subtitle cascade. Nothing animates before the screen is legible; this is a gate, not a flourish.
- **Glow behavior:** the CTA's external `--glow-you` halo breathes on an infinite sinusoidal loop — the screen's sole focal lantern, per the §5/§6 fix (glow lives outside the solid button, not inside a glass one).
- **Haptics:** medium impact on CTA tap; a triple-pulse error haptic on failed store hand-off.
- **Gesture intercepts:** edge swipe-back (iOS) and hardware back (Android) are both consumed, not merely ignored — repeated Android back-presses surface the supportive toast in §7 rather than silently doing nothing, which would read as a bug.
- **Reduced motion:** entrance choreography and the CTA glow-breathe both collapse to their end state instantly; the screen renders fully visible and static, leaning on contrast and copy rather than motion to carry the message. Required per CANON §6.

### 11. Motivation-tier adaptation
Not applicable, and honestly so: this is a mandatory utility gate, not a coaching surface, and CANON §8's motivation-tier-density requirement exists for screens where pacing and information density should flex with a user's engagement level. There is no "low-motivation" version of *you must update the app* — every user, regardless of tier, needs the same unambiguous, fully legible, single-CTA screen. Density-tiering this would only introduce inconsistency into the one screen where consistency matters most.

### 12. Accessibility
- **Contrast:** `paper-100` `#FEFAF3` / `paper-50` `#FDFDFB` text pairs against `--bg-base` `#0A0A0F` and the `--glass-card` surface both clear AA+; the What's new card's `paper` body copy is checked against its actual composited background (surface + blur + tint), not the flat token, since glass surfaces lighten effective luminance.
- **Targets:** `BtnPrimary` at 52px height clears the 44px floor with margin. The `LockShieldCluster` badge is non-interactive and carries no tap target — nothing else on screen is tappable, so there's no risk of an accidental adjacent hit.
- **Screen-reader labels:** the badge glyph gets an explicit VoiceOver/TalkBack label ("Update required") since it's otherwise a glyph-only element; the app icon itself is marked decorative (already conveyed by the wordmark). Toasts (`Error`, `Loading`, `Offline`, `Android back-press`) are announced via an `aria-live="polite"` region so screen-reader users hear state changes without needing to re-focus.
- **Read order:** wordmark → title → subtitle → What's new items (if present) → CTA → version caption. The gate's reason is understood before the single available action is reached.

### 13. Premium checklist
1. **Connects:** N/A — a hard system gate is definitionally unconnected to cross-pillar intelligence; forcing a fake connection here would be worse than admitting it doesn't apply.
2. **Honest:** Pass — What's new collapses rather than faking content; version metadata falls back to an unversioned string rather than a guessed number; both dynamic fields carry a `ChipProvenance` label (§8 fix from the original draft's inconsistent chip usage).
3. **Premium:** Pass — warm, brand-forward atmosphere and CIA-voice copy stand in for what most apps render as a bare OS alert.
4. **Surfaces:** Pass — `--bg-base` + mandatory warm radial atmosphere, no purple CIA pool (correctly excluded, see §6).
5. **Glass tiers:** Pass, after fix — `.glass-card` on What's new, `.glass-pill` on badge/banners, and a **corrected solid-fill** `BtnPrimary` (the draft mistakenly glassed the one element that should read as most solid).
6. **Semantic inner-glow:** Pass — exactly one glow (`--glow-you`), stated meaning, external to the (corrected) solid CTA.
7. **Color roles (60/30/10):** Pass — orange strictly scoped to CTA fill/halo and badge glyph tint; no green, no purple.
8. **Type:** Pass, after fix — sentence case corrected on two CTA labels ("Update now," "Try again"); wordmark correctly moved to Chillax instead of being folded into a generic "TextBlock"; exactly one Display moment.
9. **Shape & spacing:** Pass — 8pt grid, `BtnPrimary` at catalog height 52, card radius 28, 24px section margins.
10. **Motion:** Pass — physical easing, 150–250ms feedback, full reduced-motion path.
11. **Data-viz + honesty invariant:** Pass — no fabricated feature counts or version numbers; low-confidence states are justified N/A rather than force-fit.
12. **Cross-cutting patterns:** N/A for consent/crisis/FAB (out of scope for a system gate above the tab shell); correctly suppresses `GlassNavBar` and `FABQuickLog` while presented.
13. **Voice:** Pass, after fix — "AI coaching" corrected to "CIA coaching" (the app has one named coach, never generic "AI"); emphasis words verified at exactly one per moment throughout.
14. **Catalog compliance:** Pass — `TopBar` removed as a genuine misuse (its anatomy implies a back chevron this screen must never have); `LockShieldCluster` and `SystemGateOverlay` remain flagged `NEW:` with rationale distinguishing the latter from the existing `ModalOverlay` (full-bleed hard block vs. centered card-over-scrim).
