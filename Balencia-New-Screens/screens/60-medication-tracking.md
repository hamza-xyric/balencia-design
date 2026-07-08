# 60-medication-tracking

## 1. Header
- **Screen ID:** 60
- **Name:** Medication tracking
- **Route(s) covered:** No live app route; source-only medication surface.
- **Tab:** Today (Wellbeing domain context)
- **Source:** Functional Content Brief (Medications v1)
- **Batch:** 16

## 2. Purpose
Acts as the user's daily medication management hub. Answers "what do I need to take today and have I been consistent?" Tracks adherence, manages schedules, and integrates safely with the broader health and coaching ecosystems without sounding alarms or shame.

## 3. Entry & exit
- **Entry:** Wellbeing dashboard, Home screen action card, Settings > Health, CIA Chat deep-link.
- **Exit:** Stack pop (back), Stack push (Add Medication modal), Modal push (History detail), Tab switch (CIA Chat).

*Correction note:* The brief proposed navigating to an "RPG Character screen" via a header badge. On a 390px mobile screen, routing away from a critical daily health tracker to a gamification profile creates friction. The RPG badge is retained for visual progression, but it is now display-only, removing the exit path to keep the user focused on their health.

## 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** Standard transparent header with back chevron, title, and locked "Plus" interaction icon. Gains `.glass-pill` on scroll.
2. **Hero Card:** A wide GlassCard holding a circular 96px ProgressRing and today's adherence text.
3. **CIA Insight Card:** Contextual coaching based on today's status. Tap routes to CIA Chat.
4. **Safety ListRow:** Medical disclaimer; calm, persistent, non-dismissible.
5. **Timeline Agenda:** The day's temporal path. Morning, Afternoon, Evening. Doses are checkable nodes along the drawn line.
6. **All Medications (SolidCard):** Roster of active meds with historical adherence sparklines.
7. **Heatmap (SolidCard):** 4-week calendar grid showing daily consistency.
8. **Privacy Notice:** Quiet footer text regarding encryption.
9. **Bottom Nav:** GlassNavBar + FABQuickLog (Pencil glyph for Add Med).

**ASCII Wireframe (390x844):**
```text
      [ ▾ ]  Medication tracking  [ ✚ ]
      ----------------------------------
      .  (Warm orange atmosphere)   .  .
      .                             .  .
      +-----------------------------+   .
      |                             .   .
      |        (96px Ring)          .   .
      |           75%               .   .
      |    3 of 4 doses today       .   .
      |                             .   .
      +-----------------------------+   .
      .                             .   .
      +-----------------------------+   .
      |  ◍ CIA Coach                .   .
      |  today's a *fresh* start.   .   .
      |  [Learn how CIA helps]  >   .   .
      +-----------------------------+   .
      .                             .   .
      [ ⚠  consult your doctor before changing dosages ]
      .                             .   .
      MORNING                       .   .
      | ● [✓] Vitamin D      500mg  .   .
      | |       taken at 08:12 AM   .   .
      | ● [✓] Magnesium      250mg  .   .
      | |       taken at 08:12 AM   .   .
      AFTERNOON                     .   .
      | ○ [ ] Adderall XR    10mg   .   .
      | |       overdue · take when .   .
      EVENING                       .   .
      | ○ [ ] Melatonin      3mg    .   .
      .                             .   .
      +-----------------------------+   .
      | All medications             .   .
      | ◊ Vitamin D    [▁▂▆▃] 92%   .   .
      | ◊ Magnesium    [▁▄▆▄] 88%   .   .
      | ◊ Adderall XR  [▆▄▆▄] 95%   .   .
      +-----------------------------+   .
      .                             .   .
      +-----------------------------+   .
      | Adherence history           .   .
      | ▢▢▢▣▢▢▣                     .   .
      | ▣▣▢▣▣▢▣                     .   .
      | ▣▣▣▣▣▢▣                     .   .
      | ▣▣▢▢▣▢▣                     .   .
      | start tracking to build...  .   .
      +-----------------------------+   .
      .                             .   .
      . your medication data is en. .
      .                             .   .
      +-----------------------------+   .
      |  Today   CIA   Goals   Me   |   |
      +-----------------------------+   |
                              ( + ) ⊙--+
```

## 5. Components
- **TopBar** (Catalog): Back chevron, title, 1 trailing glyph.
- **GlassStatCard** (Catalog): Hero variant for daily completion metric.
- **CIAInsightCard** (Catalog): Rendered behind PaywallLock for free tier.
- **ListRow** (Catalog): Used for safety banner.
- **NEW: TimelineAgenda** (Replaces flat checklist per brief correction): Renders temporal medications as a continuous vertical stroke. Drawing the line top-to-bottom fulfills the "draw, don't fade" motion intent.
- **SolidCard** (Catalog): Holds medication roster and heatmap for data-density.
- **ProgressRing** (Catalog): 96px ring inside the hero card.
- **TrendChart** (Catalog): Sparkline variant used inline in medication list.
- **NEW: AdherenceHeatmap** (Calendar variant): 4x7 grid of rounded squares mapping daily completion. Needs a custom implementation to meet the 4-week historical view.
- **PaywallLock** (Catalog): Used on the CIA card for free users.
- **GlassNavBar** (Catalog): Global navigation.
- **FABQuickLog** (Catalog): Glyph updated to `+` for Add Medication.

## 6. Visual treatment
- **Glass tiers:**
  - TopBar, Hero card, CIA Card, FAB, Nav: `.glass-card` / `.glass-pill`.
  - Timeline list, All Meds roster, Heatmap: `SolidCard` (`--surface-2`). Data-dense regions must use solid surfaces for legibility.
- **Semantic inner-glow (one per card):**
  - **Hero Card:** `--glow-you` (#FF5E00) initially. Shifts to `--glow-done` (#34A853) when 100% complete. Reflects the user's active effort and completion.
  - **CIA Card:** `--glow-cia` (#7F24FF). Reflects AI-derived coaching context.
  - **Medication List:** None. Honors the one-glow-per-card rule and keeps the focus on the data.
- **Background atmosphere:** Soft warm radial glow top-center (`rgba(255,94,0,.18)`) over `--bg-base` (#0A0A0F) with a 4% grain overlay. 
- **The one hero type moment:** The 96px progress percentage inside the ring uses Display (NM Medium 500, 52px) with tabular-nums.

## 7. Content & copy
CIA voice: sentence case, no exclamation marks. Exactly one emphasis word per moment wrapped in asterisks (rendered in Tiempos italic).

- **CIA Note (0%):** "today's a *fresh* start."
- **CIA Note (100%):** "all medications taken today. that consistency *matters*."
- **CIA Note (Lapse):** "looks like yesterday had a gap. today's a *fresh* start."
- **CIA Note (Day 1):** "tracking medications helps CIA understand your wellbeing *better*."
- **Overdue Node Tooltip:** "take when you *can* — your day's still open"
- **Timeline Node (Taken):** "taken at 08:12 am"
- **Safety Body:** "always consult your doctor before changing *medications* or dosages."
- **Heatmap Empty:** "start tracking to build your history. first week takes shape *fast*."
- **Privacy Footer:** "your medication data is encrypted and *private*. only you can see it."

*Correction note:* The brief copy for Domain Integration ("consistent tracking earns XP and strengthens your wellbeing score.") violates CIA voice (too generic/marketing). Removed in favor of the purely functional privacy notice.

## 8. Data & honesty states
*Every metric ships 3 states.*

**Metric 1: Daily Adherence Rate (Hero Ring)**
- **Real:** `75%` + `3 of 4 doses today` (ChipProvenance: `you logged`).
- **Low-confidence:** N/A (Local dose toggles are explicit logs).
- **Honest-null:** `0%` (Ring displays ghosted track). Copy: "no medications tracked yet. add your first one below."

**Metric 2: Medication Roster Adherence (Sparklines)**
- **Real:** `[▁▂▆▃] 92%` (ChipProvenance: `you logged`).
- **Low-confidence:** `[▁▂▆▃] estimated · low confidence` (Data synced from secondary pharmacy API with delay).
- **Honest-null:** Empty sparkline track. Copy: "not enough data yet — 3 more days".

**Metric 3: 4-Week History (Heatmap)**
- **Real:** `4 weeks mapped`. Green dots for 100% days, Orange dots for partial days.
- **Low-confidence:** N/A.
- **Honest-null:** Unfilled grid outlines. Copy: "start tracking to build your history. first week takes shape fast."

## 9. All states
- **Default:** 75% complete, afternoon dose pending. 
- **Skeleton:** Depth-preserving layout (rings, cells, outlines). Charts load as axes + ghost lines that draw into place. Never blank discs.
- **Empty (Cold-start):** FAB-led. Hero ring 0%. CIA note: "tracking medications helps CIA understand your wellbeing better." Schedule, roster, and heatmap hidden. Privacy notice remains.
- **Error (Partial failure):** Cached data shown. If heatmap fails: explicit "couldn't load - tap to retry" copy inside the SolidCard without breaking the rest of the screen.
- **Success (100%):** Hero ring fills with `--glow-done`. Continuous-stroke line motif completes. CIA shifts to success copy.
- **Disabled:** BtnPrimary "Save" inside Add Med modal remains disabled until required fields are met.

## 10. Motion & interaction
- **Easing & Feedback:** Physical easing (spring/cubic-bezier). Feedback animations map to 150-250ms range. 
- **Glow behavior:** Hero card glows softly. When 100% is reached, glow color crossfades to green over 400ms.
- **Drawing the timeline:** As the day progresses or doses are taken, the vertical path "draws" downward using a sweep animation. 
- **Haptics:** Light haptic on dose toggle.
- **Reduced-motion path:** Glows breathe statically. Timeline draws instantly. Continuous strokes fade in without path-drawing. 

## 11. Motivation-tier adaptation
- **Low density:** Minimal text. Hero ring simplified to "Next: Magnesium, 8:00 AM". Timeline hidden. Heatmap hidden. Focuses on one dose at a time to avoid overwhelm.
- **Medium density (Spec default):** Shows hero card, CIA note, today's timeline, and 4-week heatmap.
- **High density:** Adds 90-day trendline analytics. Expands medication roster to show full 30-day sparklines and granular time-of-day adherence consistency graphs.

## 12. Accessibility
- **Contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) and `--bg-base` (#0A0A0F) exceeds AA+ (16:1). 
- **Targets:** All timeline checkboxes and medication list rows meet 44px min target height.
- **Screen-reader labels:** Timeline dots have aria-labels ("Take Magnesium, 250mg, due 8:00 PM. Overdue."). Plus glyph in header is labeled "Add medication".

## 13. Premium checklist
1. **Connects:** Yes. Links to Wellbeing Life Area, CIA Coach (premium), and RPG progression.
2. **Honest:** Yes. Honest-null sparklines for new meds. Explicit local-logging provenance.
3. **Premium:** Yes. Glass selective layering, rich solid data cards, semantic inner-glow.
4. **Hero moment:** 96px tabular-nums Display ring.
5. **One Tiempos italic:** Yes, strictly limited to CIA insights and key copy.
6. **CIA Voice:** Yes. Short, non-shaming, lowercase sentence structure.
7. **Glass tiers:** Strict adherence. SolidCard for dense lists/heatmaps, Glass for hero/nav.
8. **Semantic glow:** Hero (`--glow-you`/`--glow-done`), CIA (`--glow-cia`). Lists have none.
9. **60/30/10 color:** Burnt orange user lines/dots, Forest green for completion, Purple reserved strictly for CIA.
10. **Motion:** Timeline draws rather than fades. 250ms ease.
11. **Honest data states:** 3 states applied to all metrics. No fabricated numbers.
12. **Gating:** CIA Coach and drug interaction alerts gracefully use PaywallLock. Core health tracking remains free.
13. **A11y:** 44px targets, high-contrast paper text, VoiceOver labels on nodes.
14. **No exclamation marks / sentence case:** Enforced across all strings.
