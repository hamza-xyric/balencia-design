# Balencia Screen Spec: 66-notification-permission

### 1. Header
* **ID:** 66
* **Name:** notification-permission
- **Route(s) covered:** No live route; onboarding stack step and system-permission modal overlay.
* **Tab:** N/A — this is an onboarding step / system-permission overlay, not a tab-bar destination.
* **Source:** Functional Content Brief: Notification Permission. Rewritten against `COMPACT-CANON.md` + `COMPONENT-CATALOG.md`; corrections noted inline where the draft conflicted with canon or mobile reality.
* **Batch:** 3

### 2. Purpose
To lift iOS/Android push opt-in rates with a pre-permission interstitial, before the one-shot OS system prompt is ever shown. It frames the ask in CIA's voice around concrete, cross-pillar payoffs — coaching nudges, streak protection, partner updates — and always offers a soft exit, so a "not now" never burns the OS prompt and never reads as a dead end.

### 3. Entry & exit
* **Entry paths:**
  * **First launch (stack push):** CIA Onboarding [07] / Initial Plan Summary [08] → Notification Permission [66]. Full-screen, no scrim, part of the onboarding stack.
  * **Re-entry (modal):** Triggered from Settings [21], Accountability Partners [46], or Reminders [61] when a feature needs notifications and OS status is undetermined or denied.
* **Exit paths:**
  * **Allow:** Tap CTA → OS dialog → allow → transient success confirmation (see §9) → auto-navigate to Home [12] or the requesting screen.
  * **Deny (system):** Tap CTA → OS dialog → deny → brief acknowledgment → navigate to Home [12] or the requesting screen.
  * **Skip:** Tap "Not now" → dismiss immediately, no OS dialog triggered → navigate to Home [12] or the requesting screen.
* **Correction 1 — "already granted" is not an entry state.** The brief specs a "Success (Already Granted)" state reachable as an entry path. If `UNUserNotificationCenter.authorizationStatus` (or Android's `POST_NOTIFICATIONS` check) already reports granted, this screen must never render — showing it would block the user behind a request they've already satisfied. Recast strictly as a **transient exit confirmation**: user taps "Enable notifications," approves in the OS dialog, returns to the app, sees the success state in §9 for ~1.5s, then auto-navigates. It is never an entry point.
* **Correction 2 — first-launch and re-entry are not the same composition.** The draft rendered both contexts as one identical full-bleed layout. Per CANON §2 ("glass reserved for hero cards, chips, nav, sheets, **overlays**"), re-entry is genuinely an overlay and should use **ModalOverlay** (CANON catalog: "centered FrostCard over scrim; reserved for blocking moments"): a single centered **FrostCard** — illustration, title, subtitle, benefits, and both actions all inside one card — over scrim `rgba(10,10,15,.6)`, with swipe-down-to-dismiss enabled (mirrors "not now"). First-launch keeps the full-screen atmosphere treatment described in §4/§6, no scrim, swipe-dismiss disabled — this also resolves the ambiguity in the original §10 gesture note, which specified the swipe behavior without ever defining two distinct layouts for it to apply to.

### 4. Layout anatomy
Fixed single viewport, 390×844, no scroll. First-launch composition below; re-entry composition follows as a variant.

**Regions (first-launch, full-screen):**
1. Status bar zone.
2. Top spacer — 40px.
3. **FrostCard** (hero variant, radius 40 per CANON §6 hero-radius rule, 24px inner padding per CANON §6 "generous space = premium"), containing:
   a. NotificationIllustration — 96px bell disc + 2 floating micro-chips, ~150px band.
   b. Title block — Display, one Tiempos-italic emphasis word.
   c. Subtitle block — Body-light.
   d. Three **ListRow** (variant: `benefit`) rows, no dividers between them.
4. Flexible spacer — absorbs remaining height.
5. Primary action zone — BtnPrimary, full width minus 24px side margins.
6. Secondary action zone — BtnGhost "Not now," 16px below primary.
7. Bottom safe area — 34px (home indicator).

**ASCII wireframe — first-launch (390×844):**
```text
┌─────────────────────────────────────────────┐ (0,0)
│              9:41            [Status Bar]   │
│                                               │
│               (40px top spacer)              │
│  ╭───────────────────────────────────────╮   │ ← FrostCard, r40
│  │            ·  ╭╌╮  ·                  │   │   glow-cia bleed
│  │          (chip)⬡(chip)                │   │   (bottom-anchored,
│  │             bell disc, 96px            │   │    62% card height)
│  │                                        │   │
│  │           Stay on *track*.             │   │  Display, 1 emphasis
│  │      CIA uses notifications to help    │   │  Body-light
│  │           you build habits.            │   │
│  │                                        │   │
│  │   ⟐  CIA coaching nudges               │   │  ListRow·benefit ×3
│  │      Stay focused with advice          │   │  (paper-100 icons,
│  │                                        │   │   no domain tint)
│  │   ⟐  Streak protection                 │   │
│  │      Never miss a day accidentally     │   │
│  │                                        │   │
│  │   ⟐  Partner updates                   │   │
│  │      Know when partners check in       │   │
│  ╰───────────────────────────────────────╯   │
│                    ⋮  (flexible spacer)       │
│                    ⋮                          │
│   ┌───────────────────────────────────────┐  │
│   │          Enable notifications          │  │ BtnPrimary, glow-you
│   └───────────────────────────────────────┘  │ (bleed = button height)
│                    Not now                    │ BtnGhost
│                    [ ━ ]                      │ Home indicator
└─────────────────────────────────────────────┘ (390,844)
```

**Re-entry variant (ModalOverlay):** scrim `rgba(10,10,15,.6)` fills the frame; the same FrostCard (illustration → benefits → BtnPrimary → BtnGhost, all stacked inside) is centered with 20px side margins and floats mid-screen rather than anchoring top-third; card footer holds both actions instead of the screen's action zone. Swipe-down on the card dismisses (equivalent to "not now").

### 5. Components
* **FrostCard** (variant: `hero`, radius 40, 24px padding) — houses illustration, title, subtitle, benefit rows. Glow: `--glow-cia` (`#7F24FF`), bottom-anchored radial per CANON §3 recipe, height 62% of card. *Why:* this card carries CIA's explanation of *why* notifications matter — purple marks CIA/AI voice per CANON §3/§4, distinct from the user-action glow below it.
* **NEW: NotificationIllustration** — *Rationale:* the catalog has no hero-illustration primitive, and the draft's "3D/papercraft-style" description invents a production technique outside the glass system. Corrected spec, built entirely from existing canon primitives: a bell silhouette rendered as a `.glass-frost` disc (blur 48px, sat 130%, border `rgba(255,255,255,.16)`), 96px diameter, sitting on the FrostCard's `--glow-cia` pool; a single 8px orange (`--glow-you`) dot on the bell's rim stands in for an unread badge — a real outcome cue, not decoration. Two 32px `.glass-pill` micro-chips (flame glyph, two-avatar glyph) float at fixed offsets, echoing "streak" and "partner" themes. All illustration elements are `aria-hidden` (see §12).
* **NEW: ListRow (variant: `benefit`)** — *Rationale:* catalog `ListRow` is a single-line label + trailing chevron/toggle, built for settings; this screen needs stacked two-line educational rows with no trailing control. Proposed as a `ListRow` variant, not a standalone component, to keep the catalog lean: leading icon 24px, paper-100 outline, rounded 2px stroke, **no domain tint** (correction: these are feature categories, not `ChipDomainTag` domains — forcing Fitness/Nutrition-style domain colors onto them would be a category error); title (Body 16, paper-100) stacked above description (Body-light 14, paper-64%); row height ~64–72px (vs. ListRow's 56px, to fit the second line); no hairline separators between rows — they read as one grouped list, dividers stay reserved for ListRow's settings context.
* **BtnPrimary** — "Enable notifications," full width minus 24px margins, height 52. Glow: `--glow-you` (`#FF5E00`), same recipe as CANON §3, scaled to button geometry (bleed = full 52px height, since a button has no "62% of card" to reference). *Why:* separate glow from the card above it — this is the user's action moment (tap → OS dialog), effort/action per CANON §4, not CIA's explanatory voice.
* **BtnGhost** — "Not now."
* **BtnSuccess** — transient green swap for the post-grant confirmation (§9).
* **ModalOverlay** — re-entry presentation only; centered FrostCard over `rgba(10,10,15,.6)` scrim.
* **ChipProvenance** — high-density streak-count chip only (§11); "you logged."
* **OfflineBanner** — corrected offline treatment (§9); replaces the draft's CTA-dimming approach.
* **SkeletonState** — loading treatment (§9), `--surface-3` base, 1.2s shimmer sweep, matching real layout geometry.
* **ErrorState pattern** — quiet failure, BtnSecondary retry (§9); replaces the draft's "CTA reverts to default" approach, which had no retry affordance.

### 6. Visual treatment
* **Atmosphere:** `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` over `--bg-base` (`#0A0A0F`), plus 3–4% grain overlay (soft-light) per CANON §1.
* **CIA-moment purple pool:** because the hero FrostCard carries `--glow-cia`, this screen qualifies as a CIA moment per CANON §1 ("CIA moments add a purple pool"). A secondary, subtler pool sits beneath the primary orange atmosphere — `radial-gradient(70% 50% at 50% 35%, rgba(127,36,255,.10), transparent 65%)` (rgba conversion of `#7F24FF`). This value isn't a canon literal (canon states the rule qualitatively, not a pixel recipe); it's chosen so orange still reads as the dominant top-level atmosphere color and purple recedes as an undertone. This resolves "one hero color per surface" at the atmosphere layer while still honoring the CIA-moment rule at the card layer — the FrostCard (purple) and the CTA (orange) are two distinct surfaces within one screen, not one surface carrying two hero colors.
* **Glass tier:** `.glass-frost` on the FrostCard only (immersive, onboarding-context per catalog). No `.glass-card`/`SolidCard` on this screen — there is no dense data to protect legibility for, so full frost is correct per the CANON §2 selective rule, not a shortcut.
* **Radius:** FrostCard 40 (hero, CANON §6); BtnPrimary/BtnGhost pill 999; micro-chips 999.
* **Hero type moment:** *track* — one word of the Display title, set in Tiempos Medium _italic_, anchoring the single editorial moment on this screen (catalog usage rule #4: one Display moment per screen).
* **Contrast check:** `#FEFAF3` on `#0A0A0F` ≈ 19:1 (AAA). `#FF5E00` on `#0A0A0F` ≈ 5.2:1 — passes AA for both normal text (4.5:1) and large text/icons (3:1); corrected from the draft's narrower "large text/icons only" framing, which understated it.

### 7. Content & copy
*Sentence case, no exclamations, one emphasis word per moment, CIA voice throughout.*

* **Title:** Stay on *track*.
* **Subtitle (default):** CIA uses notifications to help you build lasting habits.
* **Subtitle (accountability re-entry):** Your accountability partner is *waiting*. Turn on notifications to stay connected.
* **Benefit 1 — title:** CIA coaching nudges · **desc:** Stay focused with personalized advice.
* **Benefit 2 — title:** Streak protection · **desc:** Never miss a day accidentally.
* **Benefit 3 — title:** Partner updates · **desc:** Know when accountability partners check in.
* **CTA:** Enable notifications.
* **CTA (re-entry, already-denied):** Open settings.
* **Skip:** Not now.
* **Loading copy:** CIA is preparing your settings — one moment.
* **Success copy:** All *set*. You're connected.
* **System-denied copy:** You can enable notifications anytime in settings.
* **Error copy (corrected):** Something went wrong. You can enable notifications from settings anytime. — *(the draft duplicated "try again" as both inline copy and CTA label; the retry affordance now lives only on the BtnSecondary label, see §9.)*
* **Offline copy (corrected):** removed from a blocking position — see §9 honesty fix. If shown at all, it appears only after a successful OS grant whose server-side push-token sync is still pending: `offline — your choice is saved, we'll sync when you're back online`.

### 8. Data & honesty states
This screen carries one true numeric metric (the high-density streak-count chip); everything else is boolean OS/app state, which the honesty triple doesn't literally apply to but which still gets an honest, provenance-labeled treatment.

* **Notification permission status** (`.notDetermined` / `.denied` / `.authorized`) — boolean OS state, not a measured metric.
  * **Real:** status read directly from the OS API, labeled `app status: unrequested` (or `denied` / `granted`) beside the screen, not fabricated client-side.
  * **Low-confidence:** *not applicable* — OS permission APIs return a definitive enum; there is no partial-confidence read.
  * **Honest-null:** *not applicable* — the state is always known once the API resolves; there's nothing to render "not enough data" for.
* **Pre-permission skip** (`notification_prepermission_skipped_at`) — locally logged timestamp.
  * **Real:** timestamp logged on tap.
  * **Low-confidence:** *not applicable.*
  * **Honest-null:** `No skip recorded yet — OS prompt still preserved.`
* **System denied** (`notification_system_denied_at`) — locally logged timestamp.
  * **Real:** timestamp logged on OS-level deny.
  * **Low-confidence:** *not applicable.*
  * **Honest-null:** `Not hard-denied yet — soft-block state remains active.`
* **High-density streak-count chip** (`protects: N-day streak`, §11) — this is the one place a real number appears, so it gets the full CANON §7 triple:
  * **Real:** integer from the user's own local completion log, shown with `ChipProvenance` reading `you logged`, tabular-nums.
  * **Low-confidence:** if multi-device sync is pending, show the last-known count muted with `syncing · estimated` label rather than blocking the chip.
  * **Honest-null:** if the current streak is 0 (no active streak to protect), the chip is **suppressed entirely** — never rendered as "protects: 0-day streak," which would be a discouraging, meaningless number. This is the correct honest-null behavior: omission, not a fabricated zero.

### 9. All states
* **Standard (default):** full content, CTA reads "Enable notifications."
* **Loading (corrected, ~150–300ms, usually invisible):** shown only while the OS permission-status read resolves on cold launch or immediately after tap, before the system dialog appears. `SkeletonState` geometry (illustration + benefit rows ghost to shimmer at `--surface-3`, 1.2s sweep) prevents layout jump if the read is slower than expected; CTA shows spinner, label hidden, width locked (per catalog BtnPrimary loading rule). This is not a generic "please wait" — it exists specifically to cover OS API latency, and resolves before the user perceives it in the common case.
* **Success (transient, ~1.5s):** CTA crossfades to `BtnSuccess` (forest green fill) with a checkmark; success copy visible; auto-navigates after. Green here obeys the 60/30/10 rule — used only for this one completion confirmation, nowhere else on the screen.
* **System denied — first ask:** CTA text briefly reads "Got it," dims to 40% opacity, then the screen transitions out; system-denied copy visible.
* **System denied — already denied (re-entry only):** CTA permanently reads "Open settings" and deep-links to the OS settings app for this app's notification toggle — the OS will not re-show its own dialog a second time, so this is the only honest exit.
* **Error (corrected):** the OS permission-request call itself fails unexpectedly (rare). CTA becomes `BtnSecondary` reading "Try again" (per catalog `ErrorState`: quiet failure, plain-language body copy, no red borders/glyphs, never blames the user); error copy shown above it. "Not now" remains available. This replaces the draft's "CTA reverts to Default state" — a bare state revert with no retry affordance offered no visible path forward.
* **Offline (corrected — mobile-reality fix):** requesting OS notification permission is a **local, on-device call** — `UNUserNotificationCenter.requestAuthorization` (iOS) and the Android `POST_NOTIFICATIONS` prompt both work with zero connectivity. The draft dimmed the CTA to 50% and disabled it while offline, which blocks a fully-functional action for no real reason and is factually wrong about how the OS API works. Corrected: the CTA stays fully active and fully glowing offline. The only thing that can actually be network-dependent is registering the resulting device push token with Balencia's backend; if that sync fails, it's surfaced only *after* a successful OS grant, as a non-blocking `OfflineBanner` (glass-pill, honest staleness label): `offline — your choice is saved, we'll sync when you're back online`. Never a pre-emptive block on the ask itself.
* **Disabled:** *not applicable* — the screen always resolves to either a successful tap or the "Not now" ghost exit; there's no state where both are inert.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

### 10. Motion & interaction
* **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` (physical decelerate, never linear) for all slides, per CANON §6.
* **Entrance (~1.1s, staggered):** bell disc springs in first, floating micro-chips stagger in after, then title/subtitle/benefit rows slide up from a slight offset in sequence.
* **Idle:**
  * Bell disc: gentle continuous sway, 3s loop.
  * Micro-chips: continuous ease-in-out float.
  * **FrostCard glow (`--glow-cia`):** breathes, per CANON §6 "glow breathe on hero cards" — the draft only applied breathe to the CTA; corrected to apply to both semantic-glow surfaces, since both are hero elements on this screen.
  * **CTA glow (`--glow-you`):** breathes, opacity 0.8 → 1.0.
* **Haptics:** CTA tap = medium impact; "Not now" tap = light impact.
* **Gestures:** swipe-down dismisses (equivalent to "Not now") on the **re-entry ModalOverlay only**; disabled on the first-launch stack push (no scrim to swipe against, and it's a required onboarding step, not a dismissible sheet).
* **Reduced motion:** entrance stagger, bell sway, chip float, and both glow-breathe animations are disabled; elements appear instantly in final position; static (non-animated) inner-glow remains visible on both the FrostCard and CTA to preserve the premium read without motion.

### 11. Motivation-tier adaptation
* **Low density:** benefit rows hidden entirely. Illustration + title + subtitle only — fastest path through onboarding for users who want to move on.
* **Medium density (default):** all three `ListRow (benefit)` rows shown, as specified in §4.
* **High density:** title size steps down slightly to make room; benefit rows gain predictive detail — specifically, "Streak protection" gets a trailing `ChipProvenance`-style chip reading `protects: N-day streak`, governed by the full honesty triple in §8 (real via local log / low-confidence while syncing / suppressed entirely at a 0-day streak, never a fabricated "0-day" chip).

### 12. Accessibility
* **Contrast:** `#FEFAF3` on `#0A0A0F` ≈ 19:1 (AAA); `#FF5E00` on `#0A0A0F` ≈ 5.2:1 (AA, both normal and large text — see §6 correction).
* **Targets:** BtnPrimary (52px height) and BtnGhost both exceed the 44px floor.
* **Screen reader:** `NotificationIllustration` (bell disc + both micro-chips) is fully decorative and `aria-hidden` / excluded from VoiceOver/TalkBack — it conveys nothing that title/subtitle don't already state in words. Title, subtitle, and benefit rows read in visual order. The high-density streak chip (§11), when present, is read as part of its row's label (e.g., "Streak protection, protects 14-day streak"), not as a separate unlabeled element.
* **Modal semantics (re-entry):** `ModalOverlay` is announced as a dialog on entry (VoiceOver/TalkBack focus moves to the card, background is marked inert), and focus returns to the triggering control on dismiss.
* **State announcements:** Success, system-denied, and error copy changes are announced via a live region so the outcome of tapping the OS dialog is conveyed to screen-reader users even though the OS dialog itself isn't part of this app's accessibility tree.
* **Dynamic Type:** the flexible spacer compresses first as text scales toward AX5; if benefit-row descriptions would still truncate at the largest sizes, the low-density behavior (hide benefit rows) is used as the overflow fallback rather than truncating text.

### 13. Premium checklist
1. **Connects:** yes — frames the ask through CIA coaching, streak continuity, and partner social proof, not a bare system permission.
2. **Honest:** yes, and strengthened — offline no longer fakes a connectivity requirement that doesn't exist (§9 correction); the streak-count chip carries a real honesty triple instead of being asserted as a bare number (§8, §11); "already granted" can no longer render as a false entry state (§3).
3. **Premium:** yes — warm atmosphere + CIA purple undertone, FrostCard hero, Tiempos-italic moment, generous spacing.
4. **60/30/10:** orange drives the CTA and hero accents; green appears only in the one transient success confirmation; purple is scoped to the FrostCard's CIA voice and the atmosphere undertone.
5. **Glass tiers:** selective and correct — full frost on the one hero card, plain atmosphere behind it, no dense data present to force a SolidCard.
6. **Semantic inner-glow:** two, both stated with meaning — `glow-cia` on the FrostCard (CIA's explanation), `glow-you` on the CTA (the user's action); never decorative, never mixed on one surface.
7. **One hero type moment:** *track*, Tiempos italic.
8. **Voice:** sentence case, no exclamations, one emphasis word per moment, second person, throughout — coach referred to as **CIA** everywhere (no "CIA" instances found in the source draft).
9. **Target sizes:** all interactive elements exceed the 44px floor.
10. **No fabricated numbers:** the one real number on-screen (streak count) is provenance-chipped and honesty-gated; every other state is boolean OS/app truth, not a guessed metric.
11. **Motion:** physical easing, staggered entrance, glow-breathe on both hero surfaces, full reduced-motion path.
12. **Components by catalog name:** FrostCard, BtnPrimary, BtnGhost, BtnSuccess, ModalOverlay, ChipProvenance, OfflineBanner, SkeletonState, ErrorState pattern; two additions flagged `NEW:` with rationale (NotificationIllustration, ListRow variant `benefit`) rather than invented silently.
13. **Dead ends resolved:** first-ask denial exits gracefully; already-denied re-entry deep-links via "Open settings"; offline no longer blocks a fully-offline-capable action.
14. **Locked-feature gating:** not applicable — notifications are a system permission, not a premium-tier module; no `PaywallLock` pattern applies here.
