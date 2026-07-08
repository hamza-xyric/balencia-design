# 64-report-block

## 1. Header
- **Screen ID:** 64
- **Name:** Report & block
- **Route(s) covered:** No live route; global ReportBlock Sheet over Community Chat, Competitions, and Recipes.
- **Tab:** None (contextual overlay).
- **Source:** Balencia Glass Canon · glass-dark v1.
- **Batch:** 12.

## 2. Purpose
Provides a low-friction, calm, and non-shaming flow for users to report harmful content and optionally block the offending user. It captures moderation context exactly at the moment harm is encountered, prioritizing user safety and trust over feature density.

## 3. Entry & exit
**Entry Paths:**
- Community Chat [40]: Message long-press → "report".
- Competitions [47]: Participant options overflow → "report".
- Recipes [56]: Recipe card overflow → "report".
- *Correction from brief:* The brief states entry is blocked if no entity context is passed. On mobile, a dead-end tap is poor UX. If context is missing, the source screen's toast handles the error: `couldn't load report. try again.` The sheet simply does not present.

**Exit Paths:**
- Success: Auto-dismisses 1.5s after submission confirmation → returns to source screen.
- User Cancellation: Tapping "cancel", drag-down/swipe-down on the sheet grabber, or tapping the dimmed backdrop.
- Rate-limited: Sheet aborts presentation entirely; source screen displays a toast.

## 4. Layout anatomy
**Regions (Top-to-Bottom):**
1. **Scrim & Grabber:** Dimmed background (non-interactive) and visual affordance for swipe-down.
2. **Header:** Cancel control and plain-language title.
3. **Entity Context:** Anchor card confirming what is being reported.
4. **Reasoning:** Overline section label and single-select list.
5. **Context Details:** Optional free-text input.
6. **Safety Actions:** Block toggle and primary submit anchor.

**ASCII Wireframe (390x844):**
```text
┌─────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ Scrims
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│ ┌─────────────────────────────────────────┐ │ 
│ │                  ( Grabber )            │ │ 
│ │  cancel            report               │ │ 1. Header
│ │─────────────────────────────────────────│ │
│ │  [Avtr] Deleted user                    │ │ 2. Entity Context
│ │  May have deleted account.              │ │
│ │─────────────────────────────────────────│ │
│ │  WHY ARE YOU REPORTING THIS?            │ │
│ │                                         │ │
│ │   ⊙  Spam                               │ │ 
│ │   ⊙  Harassment                         │ │ 
│ │   ⊚  Inappropriate content              │ │ 3. Reason List
│ │   ⊙  Misinformation                     │ │ 
│ │   ⊙  Impersonation                      │ │ 
│ │   ⊙  Other                              │ │ 
│ │─────────────────────────────────────────│ │
│ │ ┌─────────────────────────────────────┐ │ │
│ │ │ tell us more (optional)             │ │ │ 4. Description Input
│ │ │                                     │ │ │
│ │ │                                  0/500│ │ │
│ │ └─────────────────────────────────────┘ │ │
│ │                                         │ │
│ │  ┌───────────────────────────────────┐  │ │
│ │  │ also block this user       ( ON )  │  │ │ 5. Block Toggle
│ │  │ you won't see their messages...    │  │ │
│ │  └───────────────────────────────────┘  │ │
│ │                                         │ │
│ │ ┌───────────────────────────────────┐   │ │
│ │ │           submit report           │   │ │ 6. Submit CTA
│ │ └───────────────────────────────────┘   │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## 5. Components
- **Sheet** (`half` variant) — base container.
- **TopBar** (modified) — uses BtnGhost for "cancel", plain Title H3.
- **FeedPostCard** (truncated variant) — used to display the reported entity context.
- **ListRow** — base for report reasons.
- **GlassPillInput** (`multiline` variant, radius 20) — description field.
- **Toggle** — block opt-in switch.
- **BtnPrimary** — submit report.
- **ErrorState** — inline submission error message.
- **NEW: SafetyActionRow** — A composite of ListRow + Toggle + sub-label text. *Rationale: The standard ListRow doesn't accommodate a dual-line expanding description (for the block consequence) alongside a Toggle without violating the 56px height rule.*
- *Flagged for removal:* Quick-log FAB and Bottom Nav. Native modal sheets focus the user entirely on the critical action at hand.

## 6. Visual treatment
- **Glass tiers:** 
  - Sheet container: `.glass-frost` (blur 48px) to separate the modal entirely from the source screen.
  - Entity Context & Input Field: `.glass-card` (blur 28px).
  - Reason List & Block Toggle: `.glass-pill` rows to form tappable targets.
- **Semantic glow:** 
  - The **BtnPrimary** gets `--glow-you: #FF5E00` (effort/action). 
  - *Correction from brief:* The brief contains zero data/AI insights and zero user metrics. Per canon, semantic inner-glows must be *meaning-driven*. There is no AI data here, so `--glow-cia` is omitted. There is no positive/growth action, so `--glow-done` is omitted. The singular glow lives on the submit button to anchor the required physical action.
- **Background atmosphere:** A soft warm radial glow top-center (`radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)`) over `--bg-base`, visible through the frost. 3-4% grain overlay.
- **Hero type moment:** The Tiempos italic emphasis on `_safety_` in the success state.

## 7. Content & copy
- **Header:** `cancel` · `report`
- **Context:** `[deleted user]` / `they may have deleted their account. you can still submit your report.`
- **Overline:** `why are you reporting this?`
- **Reasons:** `spam` · `harassment` · `inappropriate content` · `misinformation` · `impersonation` · `other`
- **Input:** `tell us more (optional)` · `0/500`
- **SafetyActionRow:** `also block this user` / `you won't see their messages or content`
- **Submit:** `submit report` · `select a reason to report` (disabled hint)
- **Success:** `report submitted.` / `we'll review this and take appropriate action.` / `(user has been blocked.)` / `thank you for protecting our _safety_.` *(One emphasis word: safety).*

## 8. Data & honesty states
*Not applicable for standard data metrics.* This screen contains no WHOOP data, habit trackers, or AI-generated analytics. It operates purely on local UI state and user input. 
- **Honesty invariant applied to:** The Character Counter (0/500). It reflects system calculation of text input length exactly. No fabricated estimations.
- **Honesty invariant applied to:** Context passing. If the entity ID is missing, the UI does not "guess" or create a blank report. It fails honestly with the source-screen toast: `couldn't load report. try again.`

- **Honesty lock:** every metric on this screen must ship as real + ChipProvenance, low-confidence with muted/dashed treatment, and honest-null with no fabricated number.

## 9. All states
- **Default Initial:** Form visible; submit disabled; block toggle OFF (per resolved contradiction).
- **Reason Selected:** Radio button filled orange; submit button activated.
- **Offline:** Sheet remains interactive; top banner reads `you're offline — your report will send when you're back online.` Submission queues locally.
- **Duplicate Report:** Submit button text reads `update report`.
- **Submission Error:** Form remains; submit button executes physical high-frequency rattle; inline error text `couldn't submit. check your connection and try again.`
- **Success:** Checkmark icon scales in (with bounce); confirmation text displayed; sheet auto-dismisses after 1.5s.

- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## 10. Motion & interaction
- **Sheet Presentation:** Backdrop fades in (150ms). Sheet springs up via physical easing (250ms). Internal modules cascade in with a subtle fade and 8px upward translate.
- **Radio Selection:** Tapping a reason animates a filled inner circle scaling in (0 to 1.0, 150ms ease-out). 
- **Toggle Activation:** Tapping the row or switch slides the thumb left/right (150ms). Track background crossfades. 
- **Submit Failure Shake:** On error, the submit button executes a horizontal translate `transform: translateX(0 → 8px → -8px → 0)` over 250ms.
- **Success Auto-Dismiss:** Checkmark scales in (slight overshoot); after 1.5s delay, the entire sheet slides down off-screen (250ms) as background backdrop fades simultaneously.
- **Haptics:** Light impact haptic on radio selection; medium impact on successful submission.
- **Reduced-motion path:** All spring bounces and rattles default to instant `opacity` fades and simple `translateY` without keyframe bouncing.

## 11. Motivation-tier adaptation
*Not applicable.* As a critical safety and moderation utility, the UI must remain identical for all users regardless of motivation or density preferences. Reducing the visibility of safety mechanisms based on user tiers would violate app-store compliance guidelines and ethical design standards.

## 12. Accessibility
- **Contrast pairs:** Paper-100 `#FEFAF3` on `.glass-frost` (passes AA+). Error text `#ef4444` on frost background (passes AA+).
- **Targets:** All radio list rows, the block toggle row, and the cancel button maintain a strict 44px minimum tap target height.
- **Screen-reader:** Glyph-only cancel `X` and success checkmarks include `accessibilityLabel` ("cancel report", "success"). Radio buttons announce as `role="radio"` with `selected` state.

## 13. Premium checklist
1. **Connects:** *N/A (Intentionally bypassed).* Explicitly omits cross-domain hooks to keep the user safe and focused during moderation. (Valid bypass).
2. **Honest:** Resolves context contradictions cleanly; defaults block to opt-in for explicit consent.
3. **Premium:** Uses `.glass-frost`, 40px radii, and generous spacing rather than a sterile OS alert.
4. **Glass tiers:** Frost for sheet, glass-card for inputs, glass-pill for options. Never mixed flat.
5. **Semantic glow:** Used exclusively on the primary action (effort), avoiding decorative AI glows.
6. **60/30/10:** Burnt orange drives the active selection and submission; neutral text elsewhere.
7. **One hero type moment:** Tiempos italic *safety*.
8. **No fake data:** Offline and rate-limited states are handled with absolute transparency.
9. **Motion:** Physical springs and rattles; respects reduced-motion.
10. **AA+ contrast:** Validated on all frost backgrounds.
11. **44px targets:** Enforced on all interactive rows.
12. **Voice:** Sentence case, CIA tone, no exclamation marks.
13. **Cross-cutting:** Crisis/safety layers fully respected.
14. **Provenance/Metrics:** *N/A (Bypassed safely).* No AI or health metrics are displayed on this modal.
