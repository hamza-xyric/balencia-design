# 88-vision-suite - hi-fi glass spec

### 1. Header
- **ID:** 88
- **Name:** Vision suite
- **Route(s) covered:** /wellbeing/vision
- **Tab:** Wellbeing
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 17

### 2. Purpose
Vision suite is a wellbeing utility for non-diagnostic eye check-ins: color/acuity-style eye test tasks, eye exercises, screen-strain journaling, and clear medical disclaimer copy. It must never imply a clinical diagnosis; it helps members notice patterns and decide when to seek a clinician.

### 3. Entry & exit
- **Entry paths:** Wellbeing hub, stress/screen-strain recommendation, Today eye-care reminder, and the direct live route /wellbeing/vision.
- **Primary exit:** Back returns to Wellbeing with latest exercise or eye test status preserved.
- **Action exits:** `Start eye exercise` opens timed practice; `Begin eye test` opens non-diagnostic task flow; `Log screen strain` opens a quick sheet; urgent red-flag copy routes to SafetyResourceCard and clinician guidance.
- **Failure exit:** If tests or timers cannot load, last safe guidance remains and retry leads to System states [98] when needed.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, reminder, and disclaimer action.
2. **Hero GlassCard** for today's vision care status and last non-diagnostic eye test.
3. **SegmentedTabs** for Eye test, Exercises, Strain log, and Progress.
4. **Exercise timer card** with instructions, rest interval, and completion.
5. **Progress/TrendChart** for exercise streak, strain notes, and check-in cadence.
6. **Medical disclaimer / SafetyResourceCard** for urgent symptoms and clinician direction.
7. **Consent footer** for screen/health data and delete log controls.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Vision suite            bell info |
+--------------------------------------+
| +----------------------------------+ |
| | Eye care today                  | |
| | Exercise: 2 min remaining       | |
| | Last eye test: non-diagnostic   | |
| | via wellbeing log               | |
| +----------------------------------+ |
| [Eye test] [Exercises] [Strain]      |
|                                      |
| +----------------------------------+ |
| | 20-20-20 reset                  | |
| | Look 20 feet away for 20 sec    | |
| | [Start eye exercise]            | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | TrendChart: strain notes        | |
| | Mon low | Tue medium | Wed low  | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| | Not a diagnosis. Sudden vision  | |
| | changes need a clinician.       | |
| | [Find urgent guidance]          | |
| +----------------------------------+ |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back, title, reminder, and disclaimer info.
- **GlassStatCard** - today's care status and last eye test result.
- **SegmentedTabs** - eye test, exercises, strain log, progress.
- **ProgressRing** - timer progress for eye exercises.
- **TrendChart** - strain and exercise cadence, never medical diagnosis.
- **SafetyResourceCard** - urgent symptoms, clinician guidance, and crisis-adjacent support.
- **ConsentCard** - screen-health log consent, revoke, and delete.
- **ChipProvenance** - wellbeing log, timer, manual note, and confidence labels.
- **BtnPrimary / BtnSecondary** - start exercise, begin eye test, log strain.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F` with subtle radial glow and grain; no clinical white panels.
- **Glass tiering:** hero and disclaimer use glass; exercise cards and charts use SolidCard on `#211008` for legibility.
- **Semantic glows:** exercise action uses `--glow-you #FF5E00`; completed exercise/check-in uses `--glow-done #34A853`; CIA or projection guidance uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal for UI; one hero phrase can be `Care for your *eyes*`, with Tiempos italic emphasis.
- **60/30/10:** orange = practice action, green = completed care, purple = AI/context note. Warning copy uses words and icons, not color alone.

### 7. Content & copy
- **H1:** Care for your *eyes*
- **Hero caption:** Non-diagnostic eye care based on your wellbeing logs.
- **Eye test disclaimer:** This is not a diagnosis. Sudden vision changes, pain, flashes, or loss of vision need clinician guidance.
- **CIA line:** CIA can connect screen strain with sleep, stress, and work blocks when enough data exists.
- **Primary CTAs:** Start eye exercise; Begin eye test; Log screen strain
- **Secondary CTAs:** Review trend; Delete vision logs; Open urgent guidance
- **Empty copy:** No vision logs yet. Start with a short exercise or log how your eyes feel.
- **Error copy:** Vision tools could not load. Your last safe instructions are still shown.

### 8. Data & honesty states
- **Eye test result:** real = completed task plus ChipProvenance; low-confidence = partial test or poor conditions; honest-null = no result and no score invented.
- **Exercise timer:** real = completed duration and timestamp; low-confidence = interrupted timer; honest-null = no exercise started.
- **Screen strain log:** real = manual rating plus source time; low-confidence = vague note; honest-null = no strain entry.
- **Progress trend:** real = TrendChart from logged data; low-confidence = fewer than three entries; honest-null = HonestNullState with start actions.
- **CIA recommendation:** real = at least two signals such as strain plus sleep/stress; low-confidence = one signal; honest-null = no cross-signal claim.

### 9. All states
- **Default:** hero, tabs, selected tool, trend, disclaimer, and consent controls render.
- **Skeleton:** timer, tab, and chart blocks preserve geometry; no fake eye test score appears.
- **Empty:** HonestNullState offers exercise, eye test, or strain log without pressure.
- **Error:** failed tool keeps disclaimer and urgent guidance visible, then offers retry.
- **Success:** completed exercise shows green check, stored provenance, and optional reminder setup.
- **Disabled:** eye test or timer is 40% opacity with reason when motion setting, permissions, connectivity, or safety constraints block use.

### 10. Motion & interaction
- **Load:** hero fades in; selected tab content rises 8px over 180ms.
- **Timer:** ProgressRing sweeps during exercise; reduced-motion shows elapsed time text without animated arc.
- **Tabs:** content crossfades in 160ms and never changes route.
- **Safety:** urgent guidance opens as an action Sheet with clear dismiss and call options.
- **Reduced-motion:** disables timer sweep, chart draw, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** one exercise card, one disclaimer, no trend unless requested.
- **Medium:** default tabs, timer, eye test, strain trend, and CIA evidence chips.
- **High:** adds exact log table, reminder cadence, data export, and cross-signal detail.

### 12. Accessibility
- **Contrast:** text on `#0A0A0F` and `#211008` clears AA+.
- **Targets:** tabs, timer controls, guidance links, and delete controls are at least 44px.
- **Screen readers:** eye test tasks announce instructions, non-diagnostic status, and completion before result.
- **Medical safety:** disclaimer is persistent; urgent symptom guidance is not hidden in overflow.
- **Consent/data:** screen-strain and health logs expose revoke and delete controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** route /wellbeing/vision, eye test, exercise, progress, and medical disclaimer are present.
2. **Honest:** no clinical diagnosis; real, low-confidence, and honest-null states are defined.
3. **Premium:** tool layout is source-specific, not a generic dashboard.
4. **Warm-dark:** glass hero, solid tool cards, radial atmosphere.
5. **Semantic glow:** orange action, green completed care, purple CIA context.
6. **60/30/10:** warning does not rely on color alone.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants defined.
10. **Accessibility:** 44px targets, labels, safety copy, contrast, reduced-motion.
11. **Consent:** health log revoke/delete visible.
12. **Catalog:** canon components used without unflagged one-offs.
13. **CIA voice:** supportive, evidenced, and non-clinical.

