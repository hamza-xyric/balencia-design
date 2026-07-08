# 49-progress-photos

## 1. Header
- **Screen ID:** 49
- **Name:** Progress photos
- **Route(s) covered:** No live route; progress photos are a private module inside Progress measurements, Fitness, and Today surfaces.
- **Tab:** Today / Fitness
- **Source:** Balencia Glass Redesign Plan plus progress photo draft
- **Batch:** 11

## 2. Purpose
Progress photos give the user a private, consent-led view of physical change over time. The spec connects encrypted photos, body metrics, measurements, and CIA context without turning the body into a scoreboard. It should answer "what changed, what can I trust, and what do I control?" with clear source labels and reversible privacy choices.

## 3. Entry & exit
- **Entry paths:** Fitness dashboard progress link, Progress measurements photo module, Today action card, CIA chat artifact, Explore grid card.
- **Primary exit:** Back returns to the owning stack; bottom nav remains Today or Me depending on entry origin.
- **Action exits:** Tap photo opens Image Viewer [67]; tap compare opens a private comparison sheet; tap CIA insight opens CIA Chat [09]; tap sync or privacy text opens Connected Services [22] or consent controls; tap set body goal opens Create/Edit Goal [15].
- **Failure exit:** If encrypted media cannot be decrypted, keep the timeline shell visible, show the exact failed item, and offer retry or remove local copy without guessing the image state.

## 4. Layout anatomy
Top-to-bottom regions:
1. **TopBar:** Back chevron, title "Progress photos", level badge, privacy overflow.
2. **Consent banner:** GlassCard shown until photo analysis and private storage scopes are explicitly accepted.
3. **CIA coaching note:** Purple glass note only after at least two trusted signals exist.
4. **Weight trend:** SolidCard with Living Line, target marker, range tabs, and provenance chips.
5. **Current stats row:** Weight, BMI, and body-fat estimate in compact SolidCards.
6. **Measurements:** SolidCard ListRows for waist, chest, hips, arms, and thighs.
7. **Photo timeline:** Vertical encrypted timeline with thumbnails, analysis state, and compare affordance.
8. **Privacy notice and controls:** Storage, export, delete, hide, and analysis opt-out actions.
9. **Global nav and logging FAB:** Floating glass nav plus quick log action sheet.

**ASCII Wireframe (390x844):**
```text
+---------------------------------------------+
| <- Progress photos                  [Lv.12] |
|                                             |
| +-----------------------------------------+ |
| | photos stay private      manage privacy | |
| | encrypted storage and AI analysis are   | |
| | separate choices                         | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | CIA                                     | |
| | Weight changed alongside better *sleep*.| |
| | [sleep] [training] [you logged]         | |
| +-----------------------------------------+ |
|                                             |
| WEIGHT TREND              [1M][3M][6M][1Y] |
| +-----------------------------------------+ |
| | 72.0 kg      target 70 kg               | |
| | orange history line, dashed projection  | |
| | via wearable + you logged               | |
| +-----------------------------------------+ |
|                                             |
| +------------+ +---------+ +-------------+ |
| | weight     | | BMI     | | body fat    | |
| | 72.0 kg    | | 22.1    | | est. 18%    | |
| +------------+ +---------+ +-------------+ |
|                                             |
| MEASUREMENTS                        see all |
| +-----------------------------------------+ |
| | waist 82.0 cm        you logged         | |
| | arms 35.5 cm         you logged         | |
| +-----------------------------------------+ |
|                                             |
| PROGRESS PHOTOS                     compare |
| +-----------------------------------------+ |
| | o Oct 12  encrypted  analysis ready     | |
| | | Sep 15  encrypted  low confidence     | |
| | o Aug 18  hidden by user                | |
| +-----------------------------------------+ |
|                                             |
| +-----------------------------------------+ |
| | export photos   delete set   analysis off|
| +-----------------------------------------+ |
|                    (+)   Today CIA Goals Me |
+---------------------------------------------+
```

## 5. Components
- **TopBar:** Transparent over atmosphere; privacy overflow exposes export, hide, delete, and analysis choices.
- **ConsentCard:** GlassCard explaining encrypted storage, separate AI analysis opt-in, and revocation.
- **CIAInsightCard:** Purple glass note with evidence chips; hidden until the evidence threshold is met.
- **TrendChart:** SolidCard Living Line for weight and optional dashed projection.
- **SegmentedTabs:** Time-range selector.
- **KPIRow:** Weight, BMI, and body-fat estimate with provenance.
- **ListRow:** Measurements with values, deltas, last-updated text, and source chips.
- **NEW: PhotoTimelineTrack:** SolidCard vertical track linking encrypted photo checkpoints. Rationale: a chronological private-media journey needs a dedicated track with thumbnail, consent, and analysis states.
- **Sheet:** Compare sheet, log progress sheet, photo consent sheet, and delete confirmation sheet.
- **FABQuickLog:** Opens actions for log weight, take photo, and add measurements.
- **PaywallLock:** Applies only to opted-in AI analysis features, never to deletion or export.

## 6. Visual treatment
- **Atmosphere:** Warm dark base `#0A0A0F` with top-center orange radial glow and 3% grain.
- **Selective glass:** Consent, CIA note, nav, and action sheets use glass; charts, metrics, measurements, and photo timeline use SolidCard for legibility and privacy calm.
- **Semantic glow:** CIA note uses `--glow-cia` for synthesized insight; the weight card and FAB use `--glow-you` for user-owned body data; successful save uses `--glow-done`.
- **Private media treatment:** Thumbnails are small, face-cropped or blurred by default, with a clear reveal affordance. Hidden photos render as labeled placeholders, not broken images.
- **Hero type moment:** The CIA note gives the single italic emphasis to *sleep* when evidence links body changes to rest.
- **Color discipline:** Orange for user data and actions, green for completed saves, purple only for CIA analysis or projections. No red body feedback and no shame styling.

## 7. Content & copy
- **H1:** Progress photos
- **Consent:** "Encrypted storage and AI analysis are separate choices."
- **CIA coaching:** "Weight changed alongside better *sleep* this month."
- **Trend labels:** "Weight trend", "target 70 kg", "set a weight goal", "log a few more to see your trend"
- **Photo labels:** "Progress photos", "compare", "encrypted", "analysis ready", "low confidence", "hidden by user"
- **Privacy:** "Photos are encrypted. Only you can reveal, export, or delete them."
- **Photo actions:** "Take photo", "front view", "side view", "back view", "hide from timeline", "delete photo set", "export photos"
- **Empty:** "Take your first progress photo when you are ready."
- **Error:** "Couldn't decrypt this photo. Retry or remove the local copy."
- **Success:** "Photo saved and encrypted.", "Measurement saved.", "Analysis turned off."

## 8. Data & honesty states
- **Weight:** Real shows `72.0 kg` plus ChipProvenance `via wearable` or `you logged`; low-confidence shows the value muted with `estimated - low confidence`; honest-null shows "log your first weigh-in" without a fake line.
- **BMI:** Real shows `22.1` plus `calculated`; low-confidence is not used because it is either computable or missing; honest-null shows "add height".
- **Body-fat estimate:** Real shows estimate plus `via photo AI`; low-confidence shows muted estimate and sample warning; honest-null shows "Take at least two consented photos for analysis."
- **Measurements:** Real values use `you logged`; low-confidence is not used for direct manual entries; honest-null keeps rows collapsed until a measurement exists.
- **Photo analysis:** Real appears only after explicit opt-in and successful processing; low-confidence labels small or inconsistent photo sets; honest-null hides analysis claims and leaves encrypted thumbnails available.
- **Privacy controls:** Export, hide, delete, revoke analysis, and delete all photo data are always available to the account owner, including free-tier users.

## 9. All states
- **Default:** Consent accepted, trend populated, timeline shows encrypted photo checkpoints, compare enabled when at least two visible photos exist.
- **Skeleton:** Geometry-matched shimmer for chart, metrics, and timeline; no placeholder bodies or fake thumbnails.
- **Empty:** Consent card, first-photo prompt, ghost trend axis, and no CIA note until evidence exists.
- **Error:** Failed media, failed trend, and failed upload degrade per card while cached safe content remains visible.
- **Success:** Save actions flash green and update the exact row or photo checkpoint.
- **Disabled:** Compare disabled until two visible photos exist; AI analysis disabled when consent is off, offline, or entitlement does not allow it.
- **Privacy-revoked:** Existing AI labels are removed from the timeline immediately; encrypted original photos remain until the user deletes or exports them.

## 10. Motion & interaction
- **Chart scrubbing:** Long-press opens a crosshair tooltip with date, value, and source.
- **Comparison slider:** Drag handle reveals before/after images in the private sheet; handle has haptic ticks at 25%, 50%, and 75%.
- **Timeline draw:** Vertical PhotoTimelineTrack draws top-to-bottom over 600ms; reduced-motion renders instantly.
- **Consent controls:** Revoking analysis opens a confirmation sheet with plain-language effects before applying.
- **FAB behavior:** FAB hides on scroll-down and returns on scroll-up; reduced-motion keeps it fixed.
- **Deletion safety:** Delete photo set requires a confirmation sheet that names the number of photos and analysis records affected.

## 11. Motivation-tier adaptation
- **Low density:** Hides body-fat estimate and advanced measurements; shows only consent, latest checkpoint, and one gentle next action.
- **Medium density:** Default layout with trend, metrics, measurements, and timeline.
- **High density:** Adds phase labels, all-time min/max, optional lean-mass estimate, and deeper CIA evidence chips after opt-in.

## 12. Accessibility
- **Contrast:** Paper text on warm dark and SolidCard surfaces meets AA+; thumbnails never carry information without labels.
- **Targets:** Back, overflow, FAB, compare, reveal, export, delete, and timeline rows all maintain 44px hit areas.
- **Screen readers:** Photo rows announce date, visibility, encryption state, and analysis confidence before any body estimate.
- **Sensitive media:** Reveal actions require an intentional tap and announce that private media is about to be shown.
- **Reduced motion:** Chart drawing, timeline drawing, slider haptic sequence, and glow breathing respect OS settings.

## 13. Premium checklist
1. **Connects:** CIA links body change to sleep, training, and logged measurements only when evidence exists.
2. **Honest:** Every metric has provenance, low-confidence treatment, or an honest-null path.
3. **Premium:** Private media, warm glass, solid data surfaces, and calm privacy controls feel designed rather than clinical.
4. **Consent:** Storage, analysis, export, hide, delete, and revoke controls are explicit.
5. **No shame:** Body changes are neutral; red and alarm language are absent.
6. **Selective glass:** Dense data stays on SolidCard; guidance and consent use glass.
7. **Semantic glow:** Orange, green, and purple are meaning-bound and never decorative.
8. **One hero type moment:** The evidence word in the CIA note carries the Tiempos italic emphasis.
9. **All states:** Default, skeleton, empty, error, success, disabled, and revoked states are covered.
10. **Privacy gates:** AI analysis is opt-in and removable; deletion/export remain ungated.
11. **Source fidelity:** Weight trend, stats, measurements, photo timeline, and quick-log sheet are preserved from source.
12. **Accessibility:** Labels, targets, contrast, reveal intent, and reduced motion are specified.
13. **Motion:** Draw-first chart and timeline behavior are defined without fake values.
14. **Route truth:** This is documented as a module, not a live route.
