# 52-stress-management — Design Specification

## 1. Header
- **Screen ID:** 52
- **Name:** Stress management
- **Route(s) covered:** `/wellbeing/stress`
- **Tab:** Wellbeing (Today / Explore entry points)
- **Source:** Functional Content Brief (Batch 15)
- **Batch:** 15

## 2. Purpose
Provide a centralized, honest command center for stress. It answers three immediate questions for the user: "How stressed am I?", "What is causing it?", and "What can I do about it right now?" The screen connects cross-domain signals (mental, physical, behavioral) without gamifying or shaming the user.

## 3. Entry & exit
- **Entry paths:**
  - Wellbeing Domain Card (Stack push)
  - Today screen Wellbeing Quick-Action (Stack push)
  - CIA Chat Deep-Link (Stack push via conversational triggers)
- **Exit paths:**
  - Stack pop to Wellbeing / Explore
  - Breathing / Meditation / Yoga screens (Stack push)
  - CIA Chat (Tab switch with stress context pre-loaded)
  - Connected Services / WHOOP setup (Stack push via Biometric card)

## 4. Layout anatomy
**Regions (top-to-bottom):**
1. **TopBar:** Sticky glass header with domain context.
2. **Stress Hero (GlassCard):** Composite score, sub-scores, mental capacity meter.
3. **Quick Log (SolidCard):** Subjective slider, trigger chips, notes, CTA.
4. **CIA Note (CIAInsightCard):** AI-generated pattern recognition and coaching.
5. **Stress Trend (SolidCard):** Historical line chart, CIA projection, trend metrics.
6. **Mental Recovery (SolidCard):** Resilience ring and component breakdown.
7. **Relief Tools (Horizontal Scroll):** Contextual deep-links to interventions.
8. **Global Nav:** Bottom tab bar.

**ASCII Wireframe (390x844):**
```text
┌──────────────────────────────────────┐ 844px
│  ⌫  Stress management         Lv.5 ⚙ │ TopBar
├──────────────────────────────────────┤
│╔════════════════════════════════════╗│
│║  CURRENT STRESS LEVEL             ║│ Hero Card
│║       ╭────────╮                  ║│ (GlassCard)
│║      │   3.2   │ Mod               ║│
│║       ╰────────╯                  ║│
│║  B: 2.1  S: 4.5  Beh: 3.0          ║│
│║  Mental capacity left today        ║│
│║  ████████████░░░░░░░  60%          ║│
│╚════════════════════════════════════╝│
│                                      │
│┌────────────────────────────────────┐│
││ QUICK LOG                          ││ Quick Log
││ How are you feeling right now?     ││ (SolidCard)
││ ●●●●●○○○○○  (Slider)               ││
││ [Work] [Time] [Fin] [Other...]     ││
││ ┌────────────────────────────────┐ ││
││ │ add a note                     │ ││
││ └──────────────────────────────  │ ││
││           [ Log stress ]          ││
│└────────────────────────────────────┘│
│                                      │
│╔════════════════════════════════════╗│
│║✨ Work stress has been your top    ║│ CIA Note
│║trigger this week. A 5-min breathing║│ (GlassCard)
│║exercise after lunch could help.    ║│
│║      [ ask CIA ]   [ ignore ]      ║│
│╚════════════════════════════════════╝│
│                                      │
│┌────────────────────────────────────┐│
││ STRESS TREND            [7d][14d]  ││ Trend Card
││ avg: 4.8        ↓12% vs last wk    ││ (SolidCard)
││   ╱╲    ╱╲                         ││
││  ╱  ╲  ╱  ╲ - - -                  ││
││ ╱    ╲╱    ╲                       ││
│└────────────────────────────────────┘│
│                                      │
│┌────────────────────────────────────┐│
││ MENTAL RECOVERY      of 100        ││ Recovery
│║     ╭─────╮                        ║│ (SolidCard)
│║    │  72  │ improving              ║│
│║     ╰─────╯                        ║│
│║ Sleep: 78 ███████░                  ║│
│║ Emot:  68 ██████░                   ║│
│└────────────────────────────────────┘│
│                                      │
│  RELIEF TOOLS                        │
│ ┌──────┐ ┌──────┐ ┌──────┐           │
│ │Breathe│ │Med   │ │ Yoga │ >        │
│ └──────┘ └──────┘ └──────┘           │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │  Today   CIA   Goals   Me        │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘ 0px
```

*Correction note:* The brief mentioned time-of-day scatter plots and trigger correlation matrix. These have been omitted from the default mobile layout and reserved strictly for the "High Motivation Variant" to respect mobile information density limits and cognitive load.

## 5. Components
- **TopBar** (Catalog) - Transparent transitioning to `.glass-pill` on scroll.
- **GlassCard** (Catalog) - `hero` variant for Stress Level.
- **SolidCard** (Catalog) - Used for Quick Log, Trend, and Recovery (data density).
- **CIAInsightCard** (Catalog) - For the AI coaching note.
- **ProgressRing** (Catalog) - For the composite stress dial and recovery ring.
- **ChargeMeter** (Catalog) - NEW alias mapping for Mental Capacity (Depletable capacity).
- **GlassPillInput** (Catalog) - For the notes field.
- **Slider** (Catalog) - For the 1-10 stress check-in.
- **ChipDomainTag** (Catalog) - For standard trigger selection.
- **ChipProvenance** (Catalog) - For "via WHOOP" and sync labels.
- **TrendChart** (Catalog) - `7d/14d/30d` variants.
- **CalendarStrip** (Catalog) - Used in High Motivation variant.
- **BtnPrimary / BtnSecondary / BtnGhost** (Catalog) - Standard interactions.
- **SafetyResourceCard** (Catalog) - Pinned in the overflow menu of the TopBar per Canon §8 (crisis/safety layer on wellbeing screens).
- **PaywallLock** (Catalog) - Wraps CIA Note and Trend Projections for Free Tier.
- **FABQuickLog** (Catalog) - Persistent global log shortcut.
- **GlassNavBar** (Catalog) - Bottom navigation.

## 6. Visual treatment
- **Glass tiers:** 
  - `.glass-card` (Hero Stress Level, CIA Insight)
  - `.glass-pill` (TopBar on scroll, FAB)
  - Solid `--surface-2` (Quick Log, Trend, Recovery, Relief Tool tiles)
- **Semantic inner-glows (one per card, meaning-driven):**
  - **Hero Card:** `--glow-you` (Burnt Orange). *Meaning:* Active user effort/metric.
  - **Quick Log:** None (Solid surface).
  - **CIA Note:** `--glow-cia` (Royal Purple). *Meaning:* AI-generated insight.
  - **Trend Card:** None (Solid surface). User line is orange, projection is dashed purple.
  - **Recovery Card:** `--glow-done` (Forest Green). *Meaning:* Growth and resilience.
- **Background atmosphere:** True base `--bg-base` with warm radial glow top-center (`rgba(255,94,0,.18)`). 3-4% soft-light grain overlay. A subtle purple pool (`rgba(127,36,255,.10)`) radiates behind the CIA Note card to anchor the AI presence.
- **Hero type moment:** The composite score integer in the hero card uses Neue Medium 52px with *tabular-nums*.

## 7. Content & copy
- **TopBar:** "Stress management", "Lv.5"
- **Hero Card:** 
  - "CURRENT STRESS LEVEL" (Overline)
  - "3.2" (Display)
  - "moderate" (H3)
  - "Mental capacity left today" 
- **Quick Log:** 
  - "QUICK LOG"
  - "How are you feeling *right* now?" *(Tiempos italic on 'right')*
  - "your stress data stays private" (Caption)
  - "Log stress" (BtnPrimary)
  - "You've already logged recently. Next check-in available in 45m." (Disabled state)
- **CIA Note:** 
  - "Work stress has been your top trigger this week. A 5-min breathing exercise after lunch could help break the pattern."
  - Emphasis: "Work stress has been your *top* trigger this week..." *(Tiempos italic on 'top')*
  - "ask CIA" (BtnCoach)
- **Trend Card:** 
  - "STRESS TREND", "avg: 4.8", "↓12% vs last wk"
- **Recovery Card:** 
  - "MENTAL RECOVERY", "of 100", "improving"
- **Relief Tools:** 
  - "RELIEF TOOLS", "Breathing", "Meditation", "Yoga", "CIA pick"
- **Biometric Card:** 
  - "BIOMETRIC STRESS", "HRV: 68ms", "Low physiological stress"
- **System:** 
  - "CIA is reading your week — one moment."
  - "Couldn't load your stress trend — pull to refresh."

*Correction note:* The brief's UI copy contained a legacy "CIA" reference in the system string. This has been universally corrected to "CIA" to align with the Balencia persona mandate.

## 8. Data & honesty states
*Every metric ships 3 states. No fabricated numbers.*

- **Metric 1: Composite Stress Score (1-10)**
  - **Real:** "3.2" + ChipProvenance "via WHOOP".
  - **Low-confidence:** "3.2" (64% opacity text) + "estimated · low confidence".
  - **Honest-null:** Center dial reads "—" with sub-copy "log your first check-in below".
- **Metric 2: Mental Capacity (%)**
  - **Real:** "60%" + ChipProvenance "derived today".
  - **Low-confidence:** "60%" (64% opacity text) + "estimated · low confidence".
  - **Honest-null:** Bar track is empty. Sub-copy: "restores after sleep".
- **Metric 3: WHOOP HRV (ms)**
  - **Real:** "HRV: 68ms" + "↑ from 55ms" + ChipProvenance "via WHOOP".
  - **Low-confidence:** "Could not load WHOOP data" + BtnSecondary "retry".
  - **Honest-null:** "Connect WHOOP for biometric stress insights" + BtnSecondary "Connect".
- **Metric 4: Stress Trend (7d avg)**
  - **Real:** "avg: 4.8" + "↓12% vs last wk".
  - **Low-confidence:** Dashed line only. Label "estimated · low confidence".
  - **Honest-null:** Flat gridlines. Sub-copy: "your trend will appear after a few check-ins".

## 9. All states
- **Default:** Fully populated with real data and provenance chips.
- **Skeleton:** Shimmer blocks (`--surface-3` base) matching layout. Hero arc gauge sweeps a ghost line that morphs into the orange fill. Trend chart axis draws flat, then resolves into the curve.
- **Empty (Cold Start):** Hero gauge is ghosted. Quick Log card promoted. Trigger Analysis entirely omitted. Recovery ring ghosted. No fabricated zeros.
- **Error:** Localized per card. E.g., Biometric card shows "Could not load WHOOP data + retry". Failed log submission triggers a subtle red border flash on the CTA + ErrorState toast.
- **Success:** CTA flashes green glow (600ms). Card content crossfades, inputs clear, and the Hero gauge re-sweeps to the new score.
- **Disabled:** Quick Log CTA is disabled (40% opacity) immediately after logging, displaying the countdown timer.

## 10. Motion & interaction
- **Draw-first choreography:** On load, the Hero `ProgressRing` sweeps from 0 to score (520ms). Quick Log and CIA note rise sequentially (staggered fade 150ms delay).
- **Charting:** Trend line draws itself left-to-right (1200ms). The dashed CIA projection draws *after* the actual line completes.
- **Easing:** Physical easing only (no linear). 
- **Feedback:** 150-250ms scale/spring. Slider snapping fires light haptics. Trigger chip selection fires medium haptic.
- **Glow behavior:** Hero `glow-you` breathes subtly (4s ease). CIA note glows steady.
- **FAB Behavior:** Fades out and translates down (+20pt) when scrolling down; fades back in on scroll up.
- **Reduced-motion path:** All sweeping charts and glowing pulses revert to instant opacity fades. FAB movement is disabled (remains fixed).

## 11. Motivation-tier adaptation
- **Low density:** Viewport is aggressively minimized. Shows only the Hero Stress Gauge, Quick Log (no trigger chips, just slider), a 1-line CIA Note, and a single, large CIA-recommended Relief Tool CTA. Analytics hidden.
- **Medium density (Default):** The spec as detailed above.
- **High density:** Unlocks secondary analytics below the Recovery Card. Adds a weekly stress calendar heatmap, temporal scatter plot (time-of-day mapping), and expanded component factor breakdowns. Requires Premium tier.

## 12. Accessibility
- **AA+ contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) and `--bg-base` (#0A0A0F) exceeds WCAG AA. 
- **Color-blind safe:** Trend direction relies on line style (solid vs dashed) and shape (▼), not just color.
- **Targets:** All chips, sliders, and tabs respect 44px minimum touch targets.
- **Screen-reader labels:** Glyph-only controls in the TopBar (Settings, Back) have descriptive `aria-labels`. The slider is announced as "Stress level, 1 to 10". 
- **Crisis a11y:** The overflow menu SafetyResourceCard is flagged as a heading for easy voice-over discovery.

## 13. Premium checklist
1. **Connects (cross-pillar):** Yes. Aggregates Fitness (HRV), Mental (Sentiment), and Habits (Behavioral).
2. **Honest (real source/null):** Yes. Adheres to the 3-state data rule. Missing data is designed elegantly, never faked.
3. **Premium (funded):** Yes. Uses high-end choreography, selective glass, and physical motion. No template gray-boxes.
4. **Glass/Solid usage:** Correct. Glass for hero/AI atmosphere; solid for dense data tables/charts.
5. **One hero type moment:** Composite score uses 52px NM Medium tabular-nums.
6. **Tiempos italic accents:** Used exactly once per moment (*right*, *top*).
7. **Semantic glows:** One per glass card, strictly tied to meaning.
8. **Voice (CIA):** No exclamation marks. Warm, second-person coach voice. "CIA" explicitly purged.
9. **60/30/10 color rule:** Orange dominates user actions/data. Green for recovery. Purple strictly for AI.
10. **Motion easing:** Physical easing mandated.
11. **Haptics:** Targeted for slider and chips.
12. **A11y targets:** 44pt minimums enforced.
13. **Gating:** Premium features trapped behind `PaywallLock`, no dead ends.
14. **Safety layer:** Crisis resources reachable in one tap via the overflow menu.
