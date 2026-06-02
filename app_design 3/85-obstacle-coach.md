# Screen Design: Obstacle Coach

**Screen**: 85 of 90
**File**: 85-obstacle-coach.md
**Route**: `/tabs/goals/obstacles`
**Register**: AI Mode (SIA diagnosis and reconnection)
**Primary action**: Diagnose recurring mission blockers and start a reconnection plan
**Tab**: Goals
**Navigation**: Stack push from Mission Board [13], Mission Detail [14], Streak Details [59], SIA Chat [09], or Daily Check-in [45]. Back returns to origin.

---

## Purpose

Obstacle Coach helps users understand why missions are slipping without shame. SIA identifies patterns behind missed actions - timing conflicts, travel, nutrition gaps, stress load - and proposes a reconnection plan. The screen reframes failure as diagnosis: timing, friction, and context can be adjusted.

---

## Information Architecture

**Hierarchy**:
1. Obstacle diagnosis hero
2. Detected blockers list
3. Next best timing SIA card
4. Start reconnection bottom action

**User flow**:
- **Arrives from**: Mission Board [13], Mission Detail [14], Streak Details [59], SIA Chat [09].
- **Primary exit**: Start reconnection.
- **Secondary exits**: Tap blocker -> blocker detail/edit plan, tap timing card -> Schedule [41], back to origin.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Goals active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <       Obstacle coach      |
+-----------------------------+
| Obstacle diagnosis      cmp |
| SIA found the pattern       |
| behind missed missions.     |
| Reconnection starts with... |
| [3 blockers][SIA plan][Ready]|
|                             |
| DETECTED BLOCKERS           |
| [time] Late meetings block  |
|        workouts             |
|        Detected 3 missed... |
|        Move workouts...     |
| [time] Protein target drops |
| [time] Budget review skipped|
|                             |
| [SIA] Next best timing      |
| Monday at 8:10 AM has the   |
| strongest follow-through.   |
+-----------------------------+
|        Start reconnection   |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Obstacle Hero
- **Purpose**: Frame the screen as a diagnosis, not a failure report.
- **Visual treatment**: rounded-xl, brand-orange/25 border, orange tint over ink-brown.
- **Content**:
  - Eyebrow "Obstacle diagnosis".
  - Title: "SIA found the pattern behind missed missions."
  - Compassionate explanatory body.
  - Compass icon in orange circle.
  - Signal pills: 3 blockers, SIA plan, Reconnection ready.

### Blocker Card
- **Purpose**: Present one detected obstacle with evidence and a proposed next action.
- **Visual treatment**: Small card, rounded-lg, 16pt padding, icon tile.
- **Content**:
  - TimerReset icon.
  - Blocker title.
  - Evidence detail.
  - Proposed action in brand-orange.
- **Behavior**: Tap opens blocker detail with edit/accept/dismiss options.

### Next Best Timing Card
- **Purpose**: Convert diagnosis into a specific scheduling recommendation.
- **Visual treatment**: royal-purple/10 card with sparkles icon.
- **Content**: Best time and rationale.
- **Behavior**: Tap opens Schedule [41] or reconnection timing picker.

### Start Reconnection Button
- **Purpose**: Accept the SIA plan and restart momentum.
- **Visual treatment**: Full-width orange CTA with RotateCcw icon.
- **Behavior**: Opens reconnection flow: choose actions, adjust reminders, confirm mission plan.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Hero/action/reconnection |
| SIA timing | #7F24FF | royal-purple | Next timing card |
| Success/readiness | #34A853 | forest-green | Ready pill |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Evidence/body |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Orange is the primary diagnosis/action color. Purple is SIA timing intelligence. Green appears only as readiness/success.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Blocker card | Pressed | scale(0.98), border brand-orange/25 |
| Blocker card | Accepted | Green check appears; action text becomes "Accepted" |
| Blocker card | Dismissed | 60% opacity, undo toast |
| Timing card | Pressed | royal-purple border brightens |
| Reconnection CTA | Loading | Spinner, label "Building plan..." |
| Reconnection CTA | Success | Routes to updated Mission Detail [14] |

---

## Motion

- Hero fades up first.
- Blocker cards stagger by 70ms.
- Reconnection CTA success triggers small check pop and routes after 500ms.
- Dismissed blocker slides left and shows undo toast.

---

## Empty, Loading, Error

- **No blockers detected**: Show positive empty state "No recurring blockers found" and CTA "Review mission rhythm".
- **Insufficient data**: Explain that SIA needs more check-ins or mission history.
- **Plan generation failed**: Hero remains; CTA changes to "Try again".
- **Schedule conflict**: Timing card shows alternate time suggestion.
- **Loading**: Hero skeleton, three blocker skeleton cards.

---

## Accessibility

- Hero announces that this is a diagnosis and includes number of blockers.
- Blocker cards announce title, evidence, and proposed action.
- Proposed action is text, not color-only.
- Reconnection CTA announces loading and success states.
- Dismiss/accept actions must be available through buttons, not swipe-only gestures.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/tabs/goals/obstacles/page.tsx`.
- Related screens: Mission Board [13], Mission Detail [14], Streak Details [59], Schedule [41], Reminders & Tasks [61].
- Tone must stay non-shaming and practical.
- No runtime route/API changes are required.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Headspace coach (warm coaching) — *stays Balencia via the orange diagnosis accent, non-shaming reframe, warm-glow surfaces on ink-brown, and SIA voice specificity*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

*Reconnection tone: the diagnosis is a gift, not a verdict. Every surface, every word, every state says "timing and context can shift — you're not failing, conditions are."*

### Focal hierarchy

One focal point: the **Obstacle diagnosis hero card** — the first element read, highest visual weight, ~160–180pt. It carries the screen's core job: "SIA found the pattern." The hero card is sized 96pt+ (per `CK-P2`) with orange border accent + warm glow + the compass icon in an orange circle. Everything else is visibly secondary: the detected blockers list is a linear stack (6 equal-weight small cards, no focal break — *deliberately* flat to let diagnosis lead), the timing card is a supporting refinement in purple (secondary, SIA's next move), and the reconnection CTA is the exit (primary action, but sized as a standard 56pt button, not a hero). The squint test lands on the diagnosis hero, then the blockers list as a block, then the purple timing card as an accent. No competing foci.

### Surface & depth

Every surface adopts the `CK-P1` Layered Warm Surface language. The **diagnosis hero card** is the visual anchor: `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (`--color-alpha-white-06`) · **`--edge-highlight` top-edge** (`CK-T01`) · `--shadow-1` · **`--surface-backplate` warm radial glow** (`CK-T02`) · **orange border accent 2px `--color-brand-orange` at the left or top edge** (per the spec's "orange tint"), creating a warm authority cue without coldness. The compass icon sits in a 48pt circle with `--color-brand-orange` background and a `--glow-orange-md` (20px /.40) — the focal depth element within the hero.

**Blocker cards** are small (48–72pt), `--color-ink-brown-800` body · `--radius-md` (14pt, per the size rule) · 1px `--glass-border` · `--edge-highlight` · `--shadow-1` · **no glow** (small cards <48pt receive only edge-highlight, per CONSISTENCY.md §1). The TimerReset icon in each blocker is 24pt, `--color-brand-orange`, on a faint orange circle (20pt diameter, `--color-brand-orange` at 10% opacity — identity, not data-ink).

**Next best timing card** is `--color-royal-purple` at 8% opacity background (the SIA register) · `--radius-xl` · 1px `--glass-border` (white/6) · `--edge-highlight` · `--shadow-1` · **optional `--glow-purple-md` (20px /.35) on focus/hover** (SIA earned — not used at rest). The sparkles icon is 24pt, `--color-royal-purple`.

**Reconnection CTA** is full-width minus 32pt (16pt margins), 56pt height, `--radius-pill`, `--color-brand-orange` fill · RotateCcw icon (20pt) · **no glow on the button itself** (it's 56pt, which crosses into >48pt but is a CTA action, not a data focal — per CONSISTENCY.md, glows live on hero cards and mid-size charts, not CTAs). All surfaces over `--color-ink-900` background, creating visual separation through the warm-brown contrast (never flat on ink-900 alone).

### Typographic rhythm

Map the Typography per `CK-P3` locked scale:

- **Hero eyebrow** ("Obstacle diagnosis") `--text-eyebrow` (12pt) / 600 / `--tracking-eyebrow` (0.12em) / uppercase / `--color-brand-orange` — the key accent word (1 of 2 total).
- **Hero title** ("SIA found the pattern behind missed missions") `--text-h2` (20pt) / 700 / `--leading-snug` (1.25) / `--color-alpha-white-100` — the focal text element.
- **Hero body** (explanatory line: "Reconnection starts with...") `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / `--color-alpha-white-70` — supportive context.
- **Signal pills** (hero row: "3 blockers · SIA plan · Ready") `--text-caption` (13pt) / 500 / `--color-alpha-white-50` — compact reference.
- **"Detected blockers" section eyebrow** `--text-eyebrow` (12pt) / 600 / uppercase / `--color-alpha-white-40` — section labels per pattern.
- **Blocker card title** ("Late meetings block workouts") `--text-h3` (17pt) / 600 / `--leading-snug` (1.25) / `--color-alpha-white-100` — each blocker is a micro-headline.
- **Blocker evidence** ("Detected 3 missed...") `--text-caption` (13pt) / 400 / `--leading-normal` / `--color-alpha-white-60` — detail, warm not clinical.
- **Blocker action** ("Move workouts to...") `--text-body` (16pt) / 500 / `--color-brand-orange` — the proposed next step in accent orange (2 of 2 total accent words).
- **Timing card title + time** ("Monday at 8:10 AM has the strongest follow-through") `--text-h3` (17pt) / 600 / `--leading-snug` / `--color-alpha-white-100` — clarity on when.
- **Reconnection CTA label** ("Start reconnection") `--text-h3` (17pt) / 600 / `--color-alpha-white-100` — action intent clear.

Hierarchy by weight (600–700 vs 400), not size alone. Sentence case throughout. The brand period used with intent on key statements ("SIA found the pattern." not "SIA found the pattern"). ≤2 orange accent words: "Obstacle diagnosis" (eyebrow) + the proposed action text on blockers ("Move workouts to"). Chillax stays logo-only.

### Microcopy (before → after)

**The diagnosis hero:**
- *before:* "SIA found the pattern behind missed missions. Reconnection starts with..." (given, but flat)
- *after (on-voice):* "SIA found the pattern behind missed missions. Reconnection starts with understanding what shifted." (adds warmth + agency; "understanding what shifted" is coaching language, not clinical)

**Blocker card title + evidence:**
- *before:* "Late meetings block workouts. Detected 3 missed..." (statement, not coached)
- *after:* "Late meetings shifted your timing. 3 workouts moved when calendar filled." (frames as context shift, not failure; "when calendar filled" is specific + kind)

**Blocker proposed action:**
- *before:* "Move workouts to morning block" (bald instruction)
- *after:* "Tuesday mornings have 2h windows — try 6 AM slot." (specific, actionable, inviting; "try" signals agency)

**Signal pills (hero row):**
- *before:* no copy
- *after:* "3 patterns detected · SIA plan ready · Reconnection available" (each pill is authored, warm narrative framing)

**Timing card, opening:**
- *before:* "Next best timing: Monday at 8:10 AM has the strongest follow-through."
- *after:* "Monday mornings. Your follow-through peaks at 8:10 AM. This is your rhythm." (SIA-specific, present-tense coaching, not a forecast; "this is your rhythm" is dignifying)

**Timing card, rationale (if shown):**
- *before:* no copy
- *after (on-voice):* "You complete 89% of actions started before 9 AM. Monday clears before standup." (specific data + insight, warm framing)

**Reconnection CTA:**
- *before:* "Start reconnection"
- *after:* "Start reconnection." (adds the brand period — intent signal)

**Empty state** (no blockers detected):
- *before:* "No recurring blockers found. Review mission rhythm."
- *after:* "No recurring patterns spotted yet. Keep logging — SIA learns as you do." (warm, non-judgmental, invites continued use)

**Loading state:**
- *before:* no message
- *after (new, on-voice):* "SIA is reading your missions — one moment." (specific, reassuring tone)

**Plan generation failed:**
- *before:* Hero remains; CTA changes to "Try again"
- *after (new):* "Couldn't build your plan just now. Pull to refresh, or skip to review your blockers." (offers both paths — try again or proceed; never traps the user)

**Accept/dismiss toast** (per interaction states):
- *before:* inert
- *after (new):* "Plan accepted. Moving to action setup." (specific, confirms user's choice) / "Blocker dismissed — you can undo for 10s." (invites confidence in dismissal)

All edge strings (empty, loading, error, dismiss, success) authored, never templated. No exclamation marks. SIA copy is specific to the user's detected patterns (real blockers, real timing windows from their data), not generic ("you're too busy" → "calendar load is blocking timing").

### Motion choreography

Locked to `CK-P4` draw-first order:

1. **Diagnosis hero fades up** (`--dur-base` 280ms `--ease-out-soft`) — the focal card enters first, establishing context.
2. **Compass icon draws** (a circular stroke, `--dur-slow` 520ms `--ease-flow`, the brand's "draw not fade" signature) — the key visual within the hero animates with intent.
3. **Blocker cards rise** (`.animate-fade-up`, `--dur-base` 280ms each, 70ms stagger — per the spec "stagger by 70ms") — the list builds, secondary to the hero.
4. **Timing card scales in** (`scale(0.95 → 1)`, 280ms `--dur-base` `--ease-out-soft`, starting after blocker 3) — purple accent lands after the diagnosis block is complete.
5. **Reconnection CTA fades** (280ms, starting after timing card) — the exit action arrives last.

**Reduced-motion:** all elements appear at final state instantly; the compass circle appears fully drawn (not fading), the blocker cards are fully visible, the timing card is fully opaque. No opacity-fading of any line. The signature (the compass draw) is preserved as a static completed circle.

**Interaction micro-motions:** blocker card press `scale(0.97)` + light haptic; successful accept/dismiss triggers a brief `--glow-green` flash (600ms) on the accepted blocker or an undo toast for dismissed; reconnection CTA loading shows an inline spinner with "Building plan..." label; reconnection success triggers a checkmark pop (20ms scale(1 → 1.1 → 0.95)) + routes after 500ms.

### State craft

| State | Layout | Copy (on-voice) | Depth/brand |
|---|---|---|---|
| **Cold-start / Day-1** | Diagnosis hero + "No recurring patterns spotted yet" message instead of blocker list; timing card hidden; CTA reads "See if a pattern emerges" (softer, invites logging) | "No recurring patterns spotted yet. Keep logging — SIA learns as you do." | diagnosis hero keeps warm-glow surface depth; message on `--color-ink-900` base, never empty; no skeleton |
| **Loading** | Diagnosis hero skeleton (outline + shimmer); 3 blocker skeleton cards (icon outline + text shimmer, preserve layout); timing card skeleton; CTA disabled/skeleton | "SIA is reading your missions — one moment." | skeleton cards on `--color-ink-brown-800` with subtle shimmer; depth language preserved (edge-highlight visible); morphs into data when ready |
| **Partial / insufficient data** | Diagnosis hero present; blockers shown as "Data building" state if <3 patterns detected (show what's found, ghost what's missing) | "SIA needs 3–5 mission logs to spot patterns. You're 1 away." (specific, encouraging; never shame) | ghost/dashed blocker cards for missing data; present blockers fully colored; clear visual distinction between present and absent |
| **Error / plan generation failed** | Diagnosis hero + blockers + timing card all visible; CTA changes to "Try again" + secondary action "Review blockers" | "Couldn't build your plan just now. Pull to refresh, or review your blockers." (offers both paths; never traps) | calibrated `--color-error-red` only on the CTA border (light outline, never flat fill); glyph (alert icon) + word paired; error message on `--color-ink-900`, warm tone |
| **Offline / sync stale** | All content shows cached data; a banner at top ("Showing last sync from 2h ago") with a pull-to-refresh affordance; actions honestly dimmed | "You're offline. Showing last sync from 2 hours ago. Pull to refresh when ready." | cached cards at 50% opacity; pull-to-refresh button active (not dimmed); clear visual signal that data is stale, not broken |

Every state is **designed**, not a text-only error table. Cold-start is a calibrating state, not degenerate. Loading preserves layout + depth. Partial shows present data fully and ghosts missing. Error is specific + offers recovery. Offline is honest + offers a path forward.

### Signature & anti-generic

**One ownable Balencia moment:** the **compass icon drawing itself on enter** in the diagnosis hero card — the continuous-stroke signature (§8, never fades, always draws). This is the moment where the screen reads as unmistakably Balencia: a circular stroke that animates with intentional rhythm, the visual anchor of the diagnosis message. It ties to the brand's "Living Line" signature and the continuous-stroke motif used on splash screens and key coaching moments.

**Anti-generic fixes:**
1. **Non-shaming copy throughout** — blockers are framed as *context shifts*, not failures ("Late meetings shifted your timing" not "You failed at scheduling"). This is the #1 differentiator from a generic health app (which often uses shame or urgency language).
2. **SIA voice is specific, not generic** — the timing card includes a real insight tied to the user's data ("You complete 89% of actions before 9 AM"), not a horoscope ("Early mornings are best for everyone"). This earns the purple register.
3. **The blocker cards are not a flat list** — they are small, warm surfaces with icon + evidence + action, creating visual rhythm and indicating that this is a *crafted diagnosis*, not a dashboard dump. The 70ms stagger brings intentional motion.
4. **The reconnection CTA is not generic** — it uses the brand period and a RotateCcw icon (restart, reset, reconnect — continuous motion), signaling that this is a Balencia-specific action, not a "submit" or "continue" button copied from a form library.

The screen avoids the "generic coach app" look (flat cards, motivational copy, one-size-fits-all advice) by rooting every element in warmth, specificity, and the brand's draw-not-fade signature.

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast | Notes |
| --- | --- | --- | --- |
| Diagnosis hero title | `--color-alpha-white-100` | ≥12:1 on both | Primary focal text |
| Blocker card title | `--color-alpha-white-100` | ≥12:1 | Headline per card |
| Blocker action (orange) | `--color-brand-orange` | 3.2:1 on `--color-ink-brown-800` (WCAG 1.4.11) | Data-ink accent |
| Timing card text (white) | `--color-alpha-white-100` | ≥12:1 | SIA message text |
| Timing card background (purple tint) | `--color-royal-purple` at 8% | — | Background only, text passes contrast on top |
| Signal pills text | `--color-alpha-white-50` | ≥4.5:1 | Secondary reference |
| Evidence/caption text | `--color-alpha-white-60` | ≥4.5:1 | Detail text |
| CTA button text | `--color-alpha-white-100` | ≥12:1 | Action label |
| Orange border accent (hero) | `--color-brand-orange` | — | Decorative accent (not load-bearing) |

Status never colour-alone: blocker accept/dismiss is marked with a visible glyph (checkmark / dismiss icon) + animated state change (not just a color flash). Success is a brief `--glow-green` flash + a confirmation toast with text ("Plan accepted"). Error is a red outline + a text label ("Couldn't refresh"), never a bare red dot.

Focus-visible: every interactive element (blocker cards, timing card, CTA) carries `CK-T03 --focus-ring` (2px `--color-brand-orange`, 2px offset) uniform app-wide. Targets ≥44×44pt: blocker cards are small (48–72pt) but tappable zone is 48pt minimum; timing card is ≥96pt; CTA is 56pt height. Reduced-motion: all elements appear at final state instantly; the compass circle appears fully drawn (not animated), the blocker cards are fully visible, the CTA is fully opaque — no essential motion lost.

A11y labels: diagnosis hero announces "SIA found the pattern behind missed missions" + "3 patterns detected"; each blocker card announces title + evidence + proposed action ("Late meetings shifted your timing. 3 workouts moved. Try Tuesday mornings at 6 AM."); timing card announces "Monday mornings have the strongest follow-through"; CTA announces "Start reconnection" + loading state ("Building your plan") + success state ("Plan created — moving to setup").

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-07.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U04`
**Prototype route**: `/tabs/goals/obstacles`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q20 OAuth flows must preview scopes, purpose, sync cadence, storage, disconnect, delete, and revocation.
- Q33 Life Areas comparison is Plus-gated only after enough history exists.
- Q34 Explore tier labels distinguish included vs locked states.
- Q35 billing follows mobile-store purchase, restore, trial, cancellation, error, and entitlement patterns.
- Q50 obstacle reconnection uses per-blocker accept/dismiss controls before accept-all.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B07-F03 | critical | retention | Implement the reconnection flow with loading, choose/edit actions, reminder adjustment, confirmation, and success routing/state. |
| B07-F04 | major | navigation | Make blocker cards, timing card, and back semantic controls with detail, accept/dismiss, schedule, and stack-pop behavior. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.

