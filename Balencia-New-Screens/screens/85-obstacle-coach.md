# 85-obstacle-coach - hi-fi glass spec

### 1. Header
- **ID:** 85
- **Name:** Obstacle coach
- **Route(s) covered:** /obstacles/[id]
- **Tab:** Goals
- **Source:** app_design 3/85-obstacle-coach.md plus ascii_wireframes/85-obstacle-coach.md
- **Batch:** 21

### 2. Purpose
Obstacle coach helps a member diagnose why a mission is slipping, identify root cause patterns, and start a non-shaming coach plan. It reframes failure as context: timing, stress, travel, nutrition, budget, or calendar friction can be adjusted.

### 3. Entry & exit
- **Entry paths:** /obstacles/[id], Mission Board [13], Mission Detail [14], Streak Details [59], CIA chat, or Daily Check-in [45].
- **Primary exit:** Start reconnection builds a coach plan, then returns to Mission Detail [14].
- **Secondary exits:** blocker row opens detail/edit plan; timing card opens Schedule [41]; safety card opens wellbeing support; back returns to source.
- **Failure exit:** plan generation failure keeps diagnosis and blocker evidence visible with Try again and Review blockers.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, and plan history overflow.
2. **Obstacle diagnosis hero** naming the mission, root cause summary, blocker count, and readiness.
3. **Detected blockers list** with evidence, root cause, and one next step per blocker.
4. **CIA next-best timing card** with follow-through evidence and schedule handoff.
5. **SafetyResourceCard** when mood/stress/journal signals indicate crisis or harm.
6. **Fixed bottom action** to start reconnection, review, or retry.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Obstacle coach                 ...|
+--------------------------------------+
| +----------------------------------+ |
| | Obstacle diagnosis              | |
| | CIA found the root cause behind | |
| | missed workouts: late meetings. | |
| | 3 blockers | coach plan ready   | |
| +----------------------------------+ |
| DETECTED BLOCKERS                    |
| +----------------------------------+ |
| | time  Late meetings moved runs  | |
| | evidence: 3 missed after 7 PM   | |
| | next step: try Tuesday 6 AM     | |
| +----------------------------------+ |
| +----------------------------------+ |
| | food  Protein target dipped     | |
| | next step: prepped lunch        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA next best timing            | |
| | Monday 8:10 AM has best odds    | |
| +----------------------------------+ |
| [Start reconnection]                 |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back, title, and plan history.
- **GlassCard** - obstacle diagnosis hero.
- **CIAInsightCard** - root cause explanation and next-best timing.
- **ChoiceCardFrost** - blocker choice/accept/dismiss states.
- **SolidCard** - blocker evidence rows.
- **ProgressBar** - reconnection plan progress after acceptance.
- **SafetyResourceCard** - crisis or harm support when wellbeing signals require it.
- **ChipProvenance** - missed check-ins, calendar conflicts, nutrition logs, schedule confidence.
- **Sheet** - blocker detail, edit plan, schedule picker, safety support.
- **BtnPrimary / BtnSecondary / BtnGhost** - start reconnection, review blockers, dismiss.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F`, top radial glow, 3-4% grain.
- **Glass tiering:** diagnosis hero and CIA timing use glass; blocker evidence uses SolidCard on `#211008`.
- **Semantic glows:** diagnosis/action uses `--glow-you #FF5E00`; accepted next step or plan success uses `--glow-done #34A853`; root cause/timing intelligence uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; hero can read `Find the *pattern*` with Tiempos italic emphasis.
- **60/30/10:** orange = reconnection action, green = accepted/progress, purple = CIA diagnosis.

### 7. Content & copy
- **H1:** Find the *pattern*
- **Hero title:** CIA found the root cause behind missed missions.
- **Hero body:** Reconnection starts with understanding what shifted.
- **Blockers:** Late meetings moved runs; Protein target dipped; Budget review slipped.
- **Next step copy:** Try Tuesday 6 AM; Prep lunch before travel; Move review to Sunday 9 AM.
- **CIA line:** Monday at 8:10 AM has the strongest follow-through for this mission.
- **Primary CTA:** Start reconnection
- **Secondary CTAs:** Review blockers; Edit plan; Open schedule
- **Empty copy:** No recurring blockers found yet. Keep logging and CIA will look for patterns.
- **Error copy:** Couldn't build the coach plan just now. Review blockers or try again.

### 8. Data & honesty states
- **Root cause:** real = repeated pattern with evidence provenance; low-confidence = one or two weak signals; honest-null = no root cause named.
- **Blocker evidence:** real = missed action count, calendar, nutrition, or budget record; low-confidence = stale or partial source; honest-null = no evidence row.
- **Next step:** real = specific action tied to evidence; low-confidence = suggestion marked tentative; honest-null = ask user to choose manually.
- **Timing recommendation:** real = schedule follow-through history; low-confidence = fewer than three comparable actions; honest-null = no timing claim.
- **Coach plan:** real = generated plan with accepted steps; low-confidence = pending user review; honest-null = no plan created.

### 9. All states
- **Default:** diagnosis hero, blockers, CIA timing, provenance, and start action render.
- **Skeleton:** hero and blocker rows preserve geometry; no fake root cause appears.
- **Empty:** HonestNullState says no recurring blockers found and offers review mission rhythm.
- **Error:** diagnosis remains; failed coach plan changes CTA to Try again and keeps review path.
- **Success:** accepted blocker or plan step shows `--glow-done`, updates plan progress, and routes when complete.
- **Disabled:** start/review/schedule dims to 40% with reason when insufficient data, consent missing, offline, or safety escalation blocks plan generation.

### 10. Motion & interaction
- **Load:** hero fades first, blocker rows stagger 70ms, timing card follows.
- **Blockers:** accept/dismiss are explicit buttons; dismissed row slides with undo toast.
- **Plan:** start opens step editor before confirmation; success routes after check animation.
- **Safety:** if crisis language or harm signal appears, SafetyResourceCard opens before coach plan.
- **Reduced-motion:** disables row stagger, progress sweep, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** one root cause, one next step, one start action.
- **Medium:** default three blockers, timing card, edit/review.
- **High:** show evidence log, confidence scoring, alternate timings, and plan audit.

### 12. Accessibility
- **Contrast:** text and chips clear AA+ on dark and solid surfaces.
- **Targets:** blocker rows, accept/dismiss, schedule, start, and safety links are 44px minimum.
- **Screen readers:** hero announces diagnosis status, root cause confidence, blocker count, and next step.
- **Safety:** wellbeing/stress/journal crisis signals expose SafetyResourceCard before action.
- **Consent/data:** calendar, nutrition, and journal sources name provenance and allow revoke/delete via settings handoff.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /obstacles/[id], obstacle, coach plan, root cause, and next step are present.
2. **Honest:** real, low-confidence, honest-null states cover root cause, evidence, next step, timing, plan.
3. **Premium:** diagnosis surface is non-generic and non-shaming.
4. **Warm-dark:** glass diagnosis and solid blockers specified.
5. **Semantic glow:** orange action, green accepted, purple CIA diagnosis.
6. **60/30/10:** colors are functional and text-paired.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, safety resource, contrast, reduced-motion.
11. **Consent:** source provenance and revoke/delete handoff included.
12. **Catalog:** canon components reused.
13. **CIA voice:** practical, warm, and never shaming.

