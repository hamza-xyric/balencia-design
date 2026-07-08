### 1. Header
- **Screen ID:** 03-welcome-sign-up
- **Name:** Create account
- **Route(s) covered:** `/auth/signup`
- **Tab:** none (pre-auth flow)
- **Source:** functional brief `03-welcome-sign-up`
- **Batch:** 1

### 2. Purpose
Converts carousel intent into a registered account with the smallest possible form — email and password only — while the screen itself does the work of introducing *CIA* as a presence, not a product feature. Every other data point (DOB, gender, life domains) is deferred to onboarding. The screen's only job: get two fields right, and feel like the first minute of a relationship, not a gate.

Against the three north-star pillars (canon §0): *honest* and *premium* are carried in full here, and *connects* is honored too — through a deliberately different register than a personalized `CIAInsightCard` would use. Pre-auth means there is zero user data yet — no domain, no history, no synced source — so any claim of an actual cross-pillar finding here would be invented, not earned. Instead, the screen states CIA's connecting capability as a promise rather than a result: a quiet row of domain chips beneath the hero line names the pillars CIA will learn to read together, in future tense, carrying no synced value and no `ChipProvenance` — attaching one would fabricate a source CIA doesn't have yet. That distinction (a *personalized insight*, which genuinely cannot exist pre-auth, versus a *capability preview*, which can exist honestly) is what lets this screen satisfy *connects* without breaking *honest*. Full reasoning and the honesty treatment live in §8.

### 3. Entry & exit
- **Entry paths:**
  - Motion Carousel `02` (stack push)
  - Sign In `04` (stack push, via "create one" escape hatch)
- **Exit paths:**
  - OTP Verification `03b` (stack push, after email/password submit)
  - Consent `03c` (stack push, after social auth success)
  - Complete Profile `03d` (stack push, after social auth returns without DOB/gender)
  - Sign In `04` (stack push, via "sign in" escape hatch)
  - Guest Mode Preview `06` (stack push, via "try without an account")

### 4. Layout anatomy
Top-to-bottom regions:
1. **Atmosphere base** — `--bg-base` (`#0A0A0F`), orange radial glow top-center, centered purple pool marking CIA's first appearance, 3–4% grain (soft-light).
2. **Brand anchor** — Balencia wordmark, small, top-center, quiet (not a hero moment — the heading is).
3. **Hero line** — the one Display moment on the screen, introducing *CIA* by name.
4. **Connects preview** — a quiet, card-free row of four `ChipDomainTag` pills naming the pillars CIA will learn to read together, with one Caption line beneath in CIA voice. This is the screen's honest expression of *connects*: a capability statement, not a personalized insight.
5. **Form group** — email input, password input, live strength meter directly beneath.
6. **Primary action** — full-width sign-up CTA.
7. **Divider** — hairline + "or continue with," not a visual event.
8. **Social auth row** — Google / Apple, equal weight, side by side.
9. **Escape hatches** — sign-in link, guest-mode link, stacked center.
10. **Compliance footer** — terms + privacy, smallest type on screen, last thing the eye reaches.

**ASCII wireframe (390×844):**
```text
┌──────────────────────────────────────┐
│ 9:41                              ⚡ │  status bar
│                                        │
│              balencia                 │  brand anchor (quiet)
│                                        │
│                                        │
│         Create your account           │  Display 34
│              with *CIA*.               │  emphasis: CIA (Tiempos italic)
│                                        │
│   nutrition · wellbeing · finance ·   │  ConnectsPreviewRow (NEW):
│           relationships               │  4× ChipDomainTag, card-free
│  CIA connects them once there's       │  Caption, CIA voice, no
│      enough of you to compare         │  provenance chip (future tense)
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ ✉  email address                 │  │  GlassPillInput · email
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ 🔒  password              ⟢ show │  │  GlassPillInput · password
│  └──────────────────────────────────┘  │
│  ▓▓▓▓▓▓▓▓░░░░░░░░  typed live         │  MomentumBar + ChipProvenance
│                                        │
│  ┌──────────────────────────────────┐  │
│  │            sign up               │  │  BtnPrimary
│  └──────────────────────────────────┘  │
│                                        │
│  ─────────  or continue with  ────────│  hairline divider
│  ┌────────────────┐ ┌────────────────┐│
│  │     Google      │ │     Apple      ││  BtnSecondary ×2
│  └────────────────┘ └────────────────┘│
│                                        │
│      already have an account?         │
│               sign in                 │  BtnGhost
│         try without an account        │  BtnGhost
│                                        │
│      terms of service · privacy       │  ComplianceFooter (NEW)
│                                        │
│              ▬▬▬▬▬                    │  home indicator
└──────────────────────────────────────┘
```

### 5. Components
- **NEW: ConnectsPreviewRow** — four `ChipDomainTag` pills (Nutrition `#84cc16` · Mental/Wellbeing `#14b8a6` · Finance `#10b981` · Relationships `#ec4899`, each domain color at 16% bg per canon §4) in a single horizontal row, joined by quiet connecting dots (paper-100 at 24%, structural not textual — quieter than the 40% tertiary-text floor), with one Caption line beneath in CIA voice. No card wrapper — sits bare on atmosphere so it never competes with the hero line (§6, §13.3). No `ChipProvenance`: this is a capability statement in future tense, not a synced or computed value, so attaching a provenance chip would fabricate a source CIA doesn't have yet. Rationale for NEW: catalog's `ChipDomainTag` is reused as-is, but the assembled pattern — a card-free, non-personalized, future-tense cross-pillar promise for zero-data screens — isn't cataloged; distinct from `CIAInsightCard` (requires real evidence + provenance) and `KPIRow` (requires actual metrics). Flagged for catalog promotion; likely to recur on other pre-auth/onboarding screens.
- **GlassPillInput** — `email` variant (leading mail glyph) for the email field; `password` variant (eye toggle) for the password field. Both render the full `.glass-pill` token set (canon §2): background `rgba(10,10,15,.55)` · blur 24px · 1px border `rgba(255,255,255,.10)` · radius 999 · height 52. No inset top-light on either — canon reserves the top-light highlight for `.glass-card`/`.glass-frost` only, so both fields stay flat-topped, reading as recessed wells rather than raised cards. Deliberate absence, not an omission.
- **MomentumBar** — password strength, cumulative as rules are met (not a depletable ChargeMeter — strength only builds here, it doesn't drain). States present on this screen: honest-null (empty field) → real (typed, live) — see §8, §9. Skeleton is explicitly N/A: the meter is a deterministic client-side computation with zero network latency to mask, so it never shimmers to fake a wait it isn't taking (reasoning detailed in §9).
- **ChipProvenance** — sits beside the MomentumBar; carries the honesty label for the strength read (see §8).
- **HonestNullState** — governs the meter's empty-field state (quiet glyph, no bar, no invented number).
- **BtnPrimary** — orange fill, "sign up," one per screen.
- **BtnSecondary** — `.glass-pill` (same full token set as above: `rgba(10,10,15,.55)` background, blur 24px, border `rgba(255,255,255,.10)`, radius 999, no top-light), Google / Apple, equal visual weight (no social login is ranked above another).
- **BtnGhost** — "sign in" and "try without an account."
- **OfflineBanner** — top-deploying, honest staleness copy, per catalog.
- **NEW: ComplianceFooter** — centered Caption-level legal-link row (terms · privacy). Rationale: neither `ListRow` nor `BtnGhost` reads correctly at this weight; this needs its own minimal treatment so it stays the quietest element on screen without inventing button chrome for it.
- **NEW: ToastBanner** — top-deploying glass-pill system toast for non-field errors (e.g., account-exists). Rationale: distinct from `XPToast` (gamification-only) and `OfflineBanner` (connectivity-only); this is the general system-message slot every auth/error screen will need. Flag for catalog promotion.

### 6. Visual treatment
- **Atmosphere:** `--bg-base` canvas. Orange radial glow top-center, `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)`. A quiet purple pool, `rgba(127,36,255,.08)`, centered behind the hero line — this is CIA's entrance, so the atmosphere carries the introduction, not a badge or icon. 3–4% grain overlay, soft-light, per canon (mandatory, not optional).
- **Glass tiers:** `.glass-pill` only — both inputs and both button rows, and every instance renders the full canon §2 token set explicitly: background `rgba(10,10,15,.55)` · blur 24px · 1px border `rgba(255,255,255,.10)` · radius 999. No inset top-light on any pill on this screen — canon reserves the top-light highlight for `.glass-card`/`.glass-frost` only, and adding one to a pill would round it toward "card"; withheld by rule, not by oversight. No `.glass-card` or `.glass-frost` on this screen at all: a hero card here would compete with the atmosphere for the one Display moment, so the composition stays deliberately card-free.
- **Connects preview:** `ConnectsPreviewRow` (NEW, §5) sits directly beneath the hero line, bare on atmosphere — no card, no glass tier, so it never competes with the Display moment. Chip backgrounds at domain-color 16% per canon §4 exactly (Nutrition `#84cc16` · Mental/Wellbeing `#14b8a6` · Finance `#10b981` · Relationships `#ec4899`); connecting dots at paper-100 24%, a structural glyph sitting quieter than the Caption's own 40% tertiary-text floor. No glow of any kind — a resting glow would claim this as a live metric, and it isn't one (§8). Domain tag colors are the one canon-named exception to "one hero color per surface" (canon §4: "tags/icons only, never chrome"), so this doesn't compete with orange as the screen's hero color.
- **The one semantic glow:** MomentumBar fill = `--glow-you` (`#FF5E00`). Meaning: *this is your effort, in real time, building something that protects your account.* It is the only persistent glow on screen — everything else (focus rings, success flash) is a transient state change, not a resting glow, so the 60/30/10 balance stays legible at a glance.
- **State-only glow:** on submit success, BtnPrimary carries a 600ms `--glow-done` (`#34A853`) flash before the stack push — a momentary state signal, not a card glow, and it never coexists on screen with the orange MomentumBar glow (the meter has already faded by then).
- **The one exception hex:** the single failing-field border uses `#ef4444` — the same value as the Fitness domain tag, but deliberately not one of the four domains rendered in `ConnectsPreviewRow` (Nutrition, Mental/Wellbeing, Finance, Relationships), so the reuse never appears beside actual domain content on screen; used here only as a system validation-error border, never as a tag, icon, or label color. No new hex is introduced.
- **Hero type moment:** "Create your account with *CIA*." — Display 34, NM Medium 500. *CIA* set in Tiempos Medium italic — the only emphasis word on the screen.
- **Numerals render tabular-nums:** the digits in "meets 4 of 4 rules" (§7) and, in the high-density variant, "min 8 chars · 1 symbol · 1 number" (§11) both set in NM Medium `tabular-nums` per canon §5's Stat/KPI row — that rule covers "all numbers," not just KPI cards, so these small counts hold their width and don't jitter as the meter updates live.
- **Divider:** hairline `rgba(255,255,255,.08)` either side of "or continue with" in Caption, paper-64% — a seam, not a decoration.

### 7. Content & copy
- **Heading:** Create your account with *CIA*.
- **Connects preview labels:** Nutrition · Mental/Wellbeing · Finance · Relationships
- **Connects preview caption:** CIA connects them once there's enough of you to compare.
- **Email field:** email address
- **Password field:** password
- **Strength provenance (real):** typed live
- **Strength read (real):** meets 4 of 4 rules (digits set NM Medium `tabular-nums`, canon §5, §6)
- **Strength empty copy:** not enough data yet — start typing to build strength
- **Primary CTA:** sign up
- **Divider:** or continue with
- **Social buttons:** Google / Apple
- **Escape hatches:** already have an account? sign in / try without an account
- **Compliance footer:** terms of service · privacy policy
- **Password toggle (a11y label):** show password / hide password
- **Field error:** that email looks invalid
- **System toast (account exists):** we found an existing account for that email — sign in instead?
- **Loading label:** creating your account…
- **Offline banner:** offline — showing last sync 2h ago

### 8. Data & honesty states
- **Cross-pillar intelligence (connects):** satisfied via `ConnectsPreviewRow` (§5), not via a personalized `CIAInsightCard`. Pre-auth collects only email + password (§2) — no domain, no history, no synced source exists yet for *CIA* to intelligence across — so a real cross-pillar finding cannot honestly exist on this screen. What *can* honestly exist is a capability preview: four `ChipDomainTag` pills (Nutrition, Mental/Wellbeing, Finance, Relationships) naming the pillars CIA will learn to read together, captioned in explicit future tense — "CIA connects them once there's enough of you to compare" — so the promise never poses as a finding. This is why the row carries no `ChipProvenance` and no synced value: attaching a source or a number to a not-yet-real correlation would be the fabrication canon §7 forbids, just applied to a promise instead of a metric. The distinction that resolves the north-star tension: a *personalized insight* genuinely cannot exist pre-auth (that exception is real and stays true), but *connects as a stated capability* can, and canon's gate requires the latter on every screen regardless of data availability. Because `ConnectsPreviewRow` makes no claim about this specific user, it is exempt from the honesty triple (real / low-confidence / honest-null) that governs actual metrics below — there is no value here to be real, low-confidence, or null about, only a promise about what CIA will do once there is.
- **Metric:** password strength (client-computed as you type — not a synced or third-party value, so its provenance chip says so plainly rather than borrowing a source it doesn't have).
- **Real:** MomentumBar filled orange (`--glow-you`), `ChipProvenance` reads `typed live`, strength caption `meets 4 of 4 rules`.
- **Low-confidence:** not applicable, by design. Password strength is a deterministic local check (length, case, number, symbol) — never a prediction or a modeled estimate — so the meter never borrows canon's `estimated · low confidence` phrasing, which exists for genuinely uncertain data (an imprecise wearable read, a projected trend). Labeling a fact-checkable rule as "estimated" would be the dishonest move here, not the honest one; the meter's only in-between reading is real, live, partial progress (see Real, above).
- **Honest-null:** field is empty. Bar collapses via `HonestNullState`: no glyph noise, Body-light line — `not enough data yet — start typing to build strength`. No bar rendered at 0% (a bar at zero still implies a measurement; this doesn't).

### 9. All states
- **Connects preview:** static across every state below. `ConnectsPreviewRow` renders once, with the hero line, from bundled copy — it carries no synced value to go stale and no field to validate, so it doesn't dim on focus, redden on error, or fade during loading; it belongs to the hero introduction, not the form's validation loop.
- **Skeleton:** N/A, justified. Every element on screen — atmosphere, wordmark, hero line, both `GlassPillInput` fields, `BtnPrimary`, the social row — renders synchronously from bundled assets; nothing is fetched over the network before the screen is interactive, so there is no loading gap for a skeleton to mask. `MomentumBar` carries no skeleton either: it's a deterministic client-side computation with zero latency (§5), and it starts at honest-null the instant the field is empty rather than shimmering while it "computes" a value that has no delay. Designing a skeleton here would fabricate a wait that doesn't exist — the same honesty logic canon applies to low-confidence and honest-null (§7) applies to skeleton: don't dress a state up as busy when nothing is actually pending.
- **Default:** both fields empty. `BtnPrimary` at 40% opacity, disabled. Meter absent (honest-null).
- **Focused:** focused `GlassPillInput` gains 1px orange border + subtle orange glow. Keyboard raises natively; CTA stays pinned above it.
- **Field error:** failing field's border turns `#ef4444` (system-error exception, see §6); Caption below reads `that email looks invalid`.
- **System error:** `ToastBanner` deploys from the top, glass-pill, reads `we found an existing account for that email — sign in instead?`, auto-persists until dismissed or field is edited.
- **Loading:** both fields drop to 50% opacity, read-only; `BtnPrimary` label swaps to a spinner + `creating your account…`, width locked so nothing reflows.
- **Success:** fields fade to 0%; `BtnPrimary` carries the 600ms `--glow-done` flash (see §6), then the stack pushes to `03b`.
- **Offline:** `OfflineBanner` deploys top, reads `offline — showing last sync 2h ago`; `BtnPrimary` dims to signal the submit will queue, not fail silently.

### 10. Motion & interaction
- **Feedback:** all tappable elements scale to `.98` on press, 150ms, `cubic-bezier(0.4, 0, 0.2, 1)` — never linear.
- **Glow behavior:** the MomentumBar's glow bleed widens in step with rules satisfied, so the glow itself narrates progress rather than just the fill width.
- **Haptics:** light impact the moment all 4 password rules are met; medium impact on auth success; no haptic on a disabled `BtnPrimary` tap (a disabled control should feel inert, not broken).
- **Entry:** logo, heading, connects preview, form, CTA, social row stagger in with a 12pt rise + fade, 200ms apart — the eye is led down the form in the order it's meant to be filled.
- **Connects preview motion:** none, persistently. No breathe, no pulse, no shimmer — canon reserves glow-breathe for hero cards (§6), and this isn't one; giving a static promise a "live" animation would visually claim it's a running computation, which contradicts the honesty reasoning in §8.
- **Deliberately absent:** the continuous-stroke line motif is reserved for hero/celebration moments (canon §6); account creation is a quiet threshold, not a milestone, so success here is a single glow flash — no confetti, no stroke draw. Celebration is earned later.
- **Reduced-motion path:** entry renders as instant opacity (no rise); `ToastBanner`/field-error transitions cut the slide and appear directly; success glow becomes a flat color swap, no sweep.

### 11. Motivation-tier adaptation
- **Low density:** 32px gaps between form elements (canon's upper spacing bound). Social auth collapses behind a single `BtnSecondary` — "more ways to sign up" — so a hesitant visitor faces one decision at a time, not five. `ConnectsPreviewRow` collapses to Caption-only — no chips, just "CIA connects your life, once there's enough of it to compare" — so *connects* still speaks, but as one quiet line instead of four, matching the reduced-decision spirit of this density.
- **Medium density (baseline):** 24px gaps, everything in §4 visible as drawn, no collapsing. `ConnectsPreviewRow` shows all four chips + caption, as designed in §4/§5.
- **High density:** 16px gaps (still on the 8pt grid). A tertiary Caption line appears under the password field — `min 8 chars · 1 symbol · 1 number` — so a returning or power user can satisfy the meter without waiting for the bar to teach them. `ConnectsPreviewRow` keeps all four chips but tightens its own margin to the hero line, since a power user scans past it faster than a first-time visitor.

### 12. Accessibility
- **AA+ contrast:** paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` (body/heading text); paper-64% on glass-pill for secondary labels, verified against the `.glass-pill` composite (`rgba(10,10,15,.55)` over the atmosphere), not against the raw base.
- **44px+ targets:** both inputs and `BtnPrimary` implement at 52px height; `BtnSecondary`/`BtnGhost` at 44px minimum.
- **Screen-reader labels:** password eye toggle exposes `show password` / `hide password`; Google/Apple buttons carry `aria-label="continue with Google"` / `"continue with Apple"`; `MomentumBar` exposes its current strength caption as a live region so the honesty state is announced, not just shown.
- **Error announcement:** field error and `ToastBanner` both use `role="alert"` so screen-reader users get the same honesty signal sighted users get from the red border/toast.
- **Connects preview grouping:** the four `ChipDomainTag` pills and their caption expose as one grouped element with a single `aria-label` ("CIA connects nutrition, wellbeing, finance, and relationships, once there's enough of you to compare") rather than five separate reads, so screen-reader users get the same one-breath promise sighted users get; domain-color label text against each chip's 16%-tint background is verified at AA+, consistent with `ChipDomainTag` usage elsewhere in the app.

### 13. Premium checklist
1. Connects: **yes** — a quiet `ConnectsPreviewRow` beneath the hero line names the domains CIA will learn to read together (Nutrition, Mental/Wellbeing, Finance, Relationships), captioned in explicit future tense ("once there's enough of you to compare") so the promise never poses as a finding. No `ChipProvenance`, no `CIAInsightCard`, no synced value — attaching a source or a number here would fabricate one CIA doesn't have yet, precisely the failure mode this design avoids. Correction: an earlier draft marked this exception N/A on the reasoning that zero user data pre-auth means zero honest connects content; a gate audit correctly rejected that framing — absence, however well-justified, does not satisfy *connects*. The fix distinguishes a *personalized insight* (which genuinely cannot exist pre-auth) from a *capability preview* (which can exist honestly, in future tense, without borrowing data or provenance that isn't real). Reasoned in full in §2 and §8, not left for this checklist alone to carry.
2. Honest: yes — password strength maps real and honest-null correctly, marks low-confidence an explicit not-applicable rather than forcing "estimated" language onto a deterministic check, and its provenance chip ("typed live") doesn't borrow a source it doesn't have; the connects preview's future-tense promise carries no provenance chip and no synced value either, so it never poses as a finding it hasn't earned (§8).
3. Premium: yes — atmosphere + grain + selective `.glass-pill` carry the whole screen; zero cards compete with the hero line, including the card-free `ConnectsPreviewRow`.
4. Font obedience: Display 34 / NM Medium 500 for the hero; Caption/Body elsewhere — no size drift; every numeral on screen (the "4 of 4" strength count, the high-density "8 · 1 · 1" hint) renders NM Medium `tabular-nums` per canon §5's Stat/KPI row, stated explicitly in §6/§7 rather than left implicit.
5. Tiempos italic rule: exactly one emphasis word (*CIA*) on the entire screen.
6. Copy voice: sentence case throughout, zero exclamation marks, CIA named correctly everywhere (no CIA occurrences).
7. Semantic glow: one resting glow (`--glow-you` on MomentumBar), one state-only glow (`--glow-done` on success) — both stated with meaning, never decorative.
8. Selective glass: `.glass-pill` only, used exactly where canon reserves it (inputs, buttons) — full token set stated explicitly per instance (§5, §6): background `rgba(10,10,15,.55)`, blur 24px, border `rgba(255,255,255,.10)`, radius 999, plus an explicit "no top-light" note (canon reserves that highlight for card/frost tiers only) — no glass-card misuse.
9. Radii obedience: 999 (pills), 14 would apply to inputs if this used a boxed field — this screen's inputs are pills by design, consistent with catalog.
10. Honesty state mapping: real / honest-null fully designed for the one metric on screen; low-confidence explicitly marked not-applicable with reasoning (a deterministic local check is never "estimated"), rather than forcing template-shaped copy onto data that carries no real uncertainty — plus an explicit note on why provenance reads "typed live" instead of a borrowed source phrase.
11. Component catalog obedience: three `NEW:` components (`ConnectsPreviewRow`, `ComplianceFooter`, `ToastBanner`), each with a rationale distinguishing it from an existing catalog entry.
12. Motion physical easing: 150–250ms throughout, `cubic-bezier(0.4, 0, 0.2, 1)`, no linear easing; celebration motif deliberately withheld with stated reason.
13. Reduced-motion path: explicit overrides for entry, error, and success.
14. A11y floor: AA+ contrast verified against actual composite backgrounds, 44px+ targets throughout, live-region strength announcements, `role="alert"` on both error surfaces.
15. State completeness: default / focused / field-error / system-error / loading / success / offline all designed in §9; skeleton explicitly addressed and marked N/A with reasoning (no server-fetched content on this screen, and the one dynamic element — `MomentumBar` — is a zero-latency local computation, §5/§9) rather than left unaddressed.
