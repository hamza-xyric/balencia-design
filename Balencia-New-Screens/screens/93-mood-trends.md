# 93-mood-trends - hi-fi glass spec

### 1. Header
- **ID:** 93
- **Name:** Mood trends
- **Route(s) covered:** /wellbeing/mood
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Wellbeing.
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, and Balencia-New-Screens/canon.
- **Batch:** 5

### 2. Purpose
Mood trends turns daily check-in and journal signals into an honest, safety-aware longitudinal view. It helps the user notice patterns without diagnosing them, with crisis resources always available and CIA guidance grounded in cited evidence.

### 3. Entry & exit
- **Entry:** Wellbeing nav, mood quick-log, emotional check-in, journal, CIA insight, or notification.
- **Primary exit:** log mood, open a check-in, inspect a TrendChart point, or jump to journal.
- **Safety exit:** SafetyResourceCard opens crisis resources from the top of the screen.
- **Data exit:** mood, journal, voice note, and CIA inference settings expose consent, revoke, export, and delete.
- **Failure exit:** cached mood trend remains visible with SyncStatus and no invented values.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Mood", log button, and safety shortcut.
2. Hero GlassStatCard with today's mood and check-in provenance.
3. SafetyResourceCard below hero, always reachable.
4. TrendChart for mood, stress overlay, and journal markers.
5. CIAInsightCard with evidence chips.
6. Recent check-in ListRows and journal links.
7. FABQuickLog and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Mood                         log help|
+--------------------------------------+
| +----------------------------------+ |
| | TODAY'S MOOD                    | |
| | 6/10 steady                     | |
| | via check-in · Jul 7            | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Crisis resources                | |
| | Call, text, or view local help  | |
| +----------------------------------+ |
| +----------------------------------+ |
| | TrendChart                      | |
| | 8 |        orange mood line     | |
| | 5 | -- purple projected context | |
| | 2 |  green check-in markers     | |
| +----------------------------------+ |
| CIA: mood lifts on journal days.    |
| Evidence: 4 check-ins, 3 entries    |
| RECENT CHECK-INS                    |
| Jul 7 steady  Jul 6 low  Jul 5 calm |
| [ + ] quick log                     |
| Today | CIA | Goals | Me            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - log mood and safety shortcut.
- **GlassStatCard** - today's mood with source and confidence.
- **SafetyResourceCard** - crisis resources entry, never gamified.
- **TrendChart** - mood line, projected/estimated context, milestone markers.
- **CIAInsightCard** - pattern read with evidence.
- **ChipProvenance** - check-in, journal, estimated, wearable, cached.
- **ListRow** - recent check-ins and journal links.
- **FABQuickLog** - mood, note, water, meal.
- **ConsentCard / SyncStatus / HonestNullState / SkeletonState / ErrorState** - data states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with warm glow; wellbeing teal only inside ChipDomainTag or icon.
- **Hero:** mood card uses `--glow-you #FF5E00` for self-report effort.
- **Chart:** TrendChart uses solid orange for real mood, dashed purple for projected/estimated context, green markers for completed check-ins.
- **Safety:** SafetyResourceCard sits on `#211008`, no glow, no XP.
- **CIA:** `--glow-cia #7F24FF` only for synthesis.
- **Type:** Neue Montreal with one Tiempos italic word, such as "today feels *steady*."

### 7. Content & copy
- **H1:** "Mood."
- **Hero:** "Today feels *steady*." "6/10 via check-in."
- **Safety:** "Crisis resources. Call, text, or view local help."
- **Chart labels:** "Mood trend", "Journal days", "Estimated context."
- **CIA line:** "Mood lifts on journal days. Evidence: 4 check-ins, 3 entries."
- **CTA labels:** "Log mood", "Open journal", "View evidence."
- **Empty copy:** "No mood check-ins yet. Start with one honest minute."

### 8. Data & honesty states
- **Mood:** real = check-in value and date; low-confidence = inferred from journal tone with explicit label; honest-null = no score and log-mood CTA.
- **Trend:** real = at least three check-ins; low-confidence = one or two points shown as dots; honest-null = "3 more check-ins to show a trend."
- **Journal overlay:** real = linked entries; low-confidence = private entry hidden; honest-null = no markers.
- **CIA insight:** real = multiple dated signals; low-confidence = cautious phrasing; honest-null = no pattern claim.
- **Safety:** crisis resources always render; locale uncertainty falls back to broad resources rather than an empty card.

### 9. All states
- **Default:** hero, SafetyResourceCard, TrendChart, CIA insight, recent check-ins, FAB, and nav render.
- **Skeleton:** hero, safety card, chart axes, and recent rows shimmer without values.
- **Empty:** safety stays visible; HonestNullState invites first mood check-in.
- **Error:** cached trend remains and failed source is named.
- **Success:** logging mood updates hero and chart marker with green confirmation.
- **Disabled:** journal overlay, wearable context, or CIA projection dims when consent is revoked.

### 10. Motion & interaction
- **Load:** hero fades, chart axes draw, mood line resolves, markers appear.
- **Scrub:** chart point opens a glass pill with date, mood, source, and confidence.
- **Log mood:** opens check-in Sheet with safety copy and skip option.
- **Safety:** opens resources Sheet immediately, no celebratory motion.
- **CIA evidence:** opens Sheet with provenance chips and delete/revoke links.
- **Reduced-motion:** chart appears fully drawn; no line animation or glow breathing.

### 11. Motivation-tier adaptation
- **Low:** show hero, SafetyResourceCard, one insight sentence, and Log mood.
- **Medium:** default chart and recent rows.
- **High:** show overlays for stress, sleep, journal, and source confidence filters.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** log, safety, chart points, list rows, FAB actions, and chips are 44px minimum.
- **Screen readers:** TrendChart summarizes trend window, highest/lowest mood, source count, and confidence before point details.
- **Safety:** crisis resources are top-level and repeated below hero.
- **Data controls:** mood, journal, voice, health, CIA inference, and third-party data include consent, revoke, export, and delete.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** mood ties check-in, journal, stress, sleep, and CIA evidence.
2. **Honest:** trends only appear with enough data and provenance.
3. **Premium:** safety is calm and always reachable.
4. **Warm-dark:** canon glass and chart treatment used.
5. **Semantic glow:** self-report, completion, and CIA projection meanings stated.
6. **60/30/10:** orange real line, green markers, purple projection.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants specified.
10. **Accessibility:** chart labels, safety, 44px targets, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used.
13. **CIA voice:** evidence-based, gentle, non-diagnostic.
