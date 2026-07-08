# 69-app-rating - hi-fi glass spec

### 1. Header
- **ID:** 69
- **Name:** App rating
- **Route(s) covered:** No live route; system-triggered bottom-sheet overlay after positive moments.
- **Tab:** None
- **Source:** app_design 3/69-app-rating.md plus ascii_wireframes/69-app-rating.md
- **Batch:** 20

### 2. Purpose
App rating is a non-blocking bottom sheet that asks for sentiment after a positive pause, routes 4-5 star responses to a store review prompt, routes 1-3 star responses to private feedback, and always offers `not now` plus permanent suppression without dark patterns.

### 3. Entry & exit
- **Entry paths:** streak milestone, level-up, quest completion, habit streak, or other positive event after the user has naturally paused.
- **Primary exit:** 4-5 stars -> Rate on App Store; 1-3 stars -> Submit feedback.
- **Dismissal exits:** `not now`, backdrop tap, drag-down, maybe later, skip, or don't ask again with confirmation.
- **Failure exit:** network failure preserves feedback text and says it will send when online; store prompt failure returns to the sheet with a calm retry/dismiss choice.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **Backdrop** dimming the underlying screen while preserving context.
2. **Bottom sheet** with drag handle, CIA avatar/indicator, headline, subtitle, star input, and dismissal links.
3. **Positive path** with thank-you copy and store review CTA.
4. **Negative path** with feedback field, character count, submit CTA, and skip.
5. **Cooldown and suppression copy** that explains `not now` and don't ask again behavior.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| underlying screen dimmed              |
|                                      |
|                                      |
|                                      |
+======================================+
|          --------                    |
|          CIA avatar                  |
|                                      |
|       Enjoying Balencia?             |
|  We'd love to hear how you feel.     |
|                                      |
|    star  star  star  star  star      |
|      1     2     3     4     5       |
|                                      |
|             not now                  |
|          don't ask again             |
|                                      |
| safe area                            |
+--------------------------------------+
```

### 5. Components
- **ModalOverlay** - dimmed backdrop and bottom sheet.
- **Sheet** - fixed-height rating, positive, and feedback states.
- **ChoiceCardFrost** - adapted for selected star row semantics.
- **BtnPrimary** - Rate on App Store and Submit feedback.
- **BtnGhost** - not now, maybe later, skip, don't ask again.
- **ChipProvenance** - trigger reason, cooldown, and feedback status when shown in debug/support mode.
- **ErrorState / SkeletonState / HonestNullState** - network, store review, and no-trigger fallback states.
- **NEW: StarRatingInput** - five discrete 44px star targets with accessible labels. Rationale: catalog choice cards do not model star sentiment input.

### 6. Visual treatment
- **Atmosphere:** backdrop uses `#0A0A0F` at 60%; sheet sits on `#211008` with top corners and shadow.
- **Glass tiering:** sheet is a raised SolidCard/ModalOverlay, not a full glass page.
- **Semantic glows:** star selection and CTA use `--glow-you #FF5E00`; submitted feedback or completed store handoff uses `--glow-done #34A853`; CIA avatar ring uses `--glow-cia #7F24FF` as identity only.
- **Type:** Neue Montreal for all copy; headline can read `Enjoying *Balencia*?` with one Tiempos italic word.
- **60/30/10:** orange = action/selection, green = completion, purple = CIA identity. No pressure-red for low ratings.

### 7. Content & copy
- **Initial headline:** Enjoying *Balencia*?
- **Subtitle:** We'd love to hear how you feel.
- **Positive headline:** Thank you
- **Positive body:** A quick store review helps others find Balencia too.
- **Negative headline:** We hear you.
- **Negative body:** Tell us what we can improve. Your feedback shapes Balencia.
- **Primary CTAs:** Rate on App Store; Submit feedback
- **Dismissal copy:** not now; maybe later; skip; don't ask again
- **Feedback helper:** Enter at least 10 characters to submit.
- **Error copy:** We couldn't reach the server. Your feedback will send when you are back online.

### 8. Data & honesty states
- **Trigger reason:** real = milestone/level/quest event plus provenance; low-confidence = trigger queued after offline event; honest-null = sheet does not appear.
- **Star rating:** real = selected 1-5 value; low-confidence = gesture preview before release; honest-null = no value selected.
- **Store review handoff:** real = native prompt requested; low-confidence = OS may throttle display; honest-null = no store review claim.
- **Feedback submission:** real = sent or queued timestamp; low-confidence = offline queue pending; honest-null = no feedback entered.
- **Cooldown state:** real = 30-day not now, 60-day completed, or permanent suppression; low-confidence = local clock uncertain; honest-null = no cooldown shown.

### 9. All states
- **Default:** initial question, five stars, not now, don't ask again.
- **Skeleton:** not normally shown; if trigger metadata loads, sheet geometry appears without fake event copy.
- **Empty:** HonestNullState is internal only: no qualifying trigger means no sheet renders.
- **Error:** feedback text persists; store failure offers maybe later and retry without blame.
- **Success:** store handoff or feedback submission turns CTA green with check and dismisses after confirmation.
- **Disabled:** Submit feedback dims to 40% with helper reason until minimum text length or network queue is available.

### 10. Motion & interaction
- **Sheet:** backdrop fades in; sheet slides up with 520ms physical easing.
- **Stars:** selected stars fill center-out, bounce once, and announce selected rating.
- **Path swap:** after star selection, positive or negative content crossfades in 280ms.
- **Dismiss:** drag-down, backdrop tap, and not now share the same cooldown path.
- **Reduced-motion:** disables star bounce and sheet slide; content appears with opacity-only transition.

### 11. Motivation-tier adaptation
- **Low:** shorter copy, star row, not now, no extra explanation.
- **Medium:** default positive/negative paths and cooldown controls.
- **High:** shows why the prompt appeared, cooldown explanation, and privacy note for feedback.

### 12. Accessibility
- **Contrast:** sheet text, stars, and links clear AA+ on `#211008`.
- **Targets:** every star, CTA, dismissal link, and drag area has at least 44px touch size.
- **Screen readers:** stars announce "1 star" through "5 stars"; selected path and cooldown are announced.
- **Consent/data:** feedback is optional; user can skip, not now, or suppress future prompts.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** app rating, stars, feedback, store review, not now, and don't ask again are present.
2. **Honest:** OS store review throttling and feedback queue are disclosed.
3. **Premium:** bottom-sheet overlay is distinct from a page.
4. **Warm-dark:** dimmed backdrop and raised sheet specified.
5. **Semantic glow:** orange sentiment/action, green completion, purple CIA identity.
6. **60/30/10:** no coercive alert color for low scores.
7. **Type:** Neue Montreal plus one Tiempos italic headline.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px stars, labels, contrast, reduced-motion.
11. **Consent:** rating and feedback are optional with clear exits.
12. **Catalog:** catalog components reused; StarRatingInput is NEW with rationale.
13. **CIA voice:** warm, brief, and non-coercive.

