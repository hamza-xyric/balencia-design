# Screen Design: Intelligence / Insights Dashboard

**Screen**: 48 of 73
**File**: 48-intelligence-dashboard.md
**Register**: AI Mode (royal-purple #7F24FF)
**Primary action**: view AI-generated health insights, correlations, and predictions
**Tab**: Me (pushed from Explore or dedicated Insights section)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main -> Explore -> Intelligence Dashboard). Also reachable via SIA Chat [09] deep-link, Home Screen [12] proactive insight card, or Life Areas Overview [16] "see insights" link. Exit via back button to Explore, or forward to SIA Chat [09], Goal Detail [14], Knowledge Graph (sub-screen).

---

## Purpose

The Intelligence Dashboard is SIA's analytical command center -- the screen where the AI's understanding of the user becomes visible and interactive. It synthesizes data from every domain (fitness, nutrition, finance, relationships, etc.) into a unified health intelligence score, surfaces contradictions between what the user reports and what the data shows, reveals cross-domain correlations, and predicts future outcomes. This is the most data-rich screen in the app, yet it must feel like a premium "health intelligence briefing" rather than a spreadsheet. Royal-purple (#7F24FF) is the dominant accent here because this is SIA's domain -- the AI's own space to show its work. This screen does NOT follow the standard Domain Dashboard Template (established Screen 26) because it is not a single-domain dashboard; it is a cross-domain intelligence layer with its own layout pattern. This screen requires Pro — composite intelligence scores, contradictions, correlations, and predictions are advanced AI analytics gated behind the Pro tier.

---

## Information Architecture

**Hierarchy** (what the user sees, in order of visual priority):
1. Daily Score Hero Card -- large score (0-100) with circular progress ring, pillar sparklines, trend arrow. The single most prominent element, royal-purple accent glow.
2. Active Contradictions Banner -- alert-style cards requiring user attention (resolve or dismiss). Visually urgent.
3. Score Trend Chart -- 7/14/30 day line chart with interactive time range selector
4. Correlations Section -- discovered cross-domain relationships with visual strength indicators
5. Best Day Formula Card -- personalized optimal day blueprint with today's progress
6. Weekly Report Summary -- collapsible card with latest weekly insights
7. Predictions Card -- tomorrow's predicted score with accuracy badge
8. Insight Feedback History -- recent insights with thumbs up/down state
9. Knowledge Graph Link -- navigation to the visual health knowledge graph

**User flow**:
- **Arrives from**: Explore Section [18] via "Intelligence" module card (stack push), SIA Chat [09] via deep-link when SIA references an insight, Home Screen [12] via proactive insight card (stack push), Life Areas Overview [16] via "see insights" link (stack push)
- **Primary exit**: Back to Explore [18] (stack pop)
- **Secondary exits**: SIA Chat [09] via tap on any SIA-generated insight (tab switch with context), Goal Detail [14] via tap on pillar sparkline or correlation that references a goal (stack push), Knowledge Graph sub-screen via "explore graph" link (stack push), Weekly Report Detail via "see full report" link (stack push)

---

## Layout

**Scroll behavior**: ScrollView (content ~1400-1800pt, always scrollable, mixed heterogeneous content)
**Tab bar visible**: Yes

### ASCII Wireframe

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤ <- STICKY
│  <- [back]   "Intelligence"   [...] │  <- Intelligence Header
│  ================================   │  <- 3pt purple accent line
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌───────────────────────────────┐  │
│  │          DAILY SCORE           │  │  <- Hero Card (r-xl)
│  │                                │  │
│  │        ┌──────────┐            │  │
│  │        │          │            │  │
│  │        │    82    │            │  │
│  │        │          │            │  │
│  │        └──────────┘            │  │     Circular ring
│  │         ^ +3 from yesterday    │  │     with score center
│  │                                │  │
│  │  [fitness] [nutrition] [well.] │  │  <- Pillar sparklines
│  │    78 ^      85 -      80 v   │  │
│  │                                │  │
│  │  updated 2 hours ago           │  │
│  └───────────────────────────────┘  │
│                                     │  <- 16pt gap
│  CONTRADICTIONS (2)                 │  <- Eyebrow + count badge
│  ┌───────────────────────────────┐  │
│  │ ! "You report sleeping 8hrs   │  │  <- Contradiction Card 1
│  │    but WHOOP shows 5.5hrs"    │  │     orange-red alert icon
│  │        [resolve]  [dismiss]   │  │     action chips
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ ! "Stress rating: low, but    │  │  <- Contradiction Card 2
│  │    HRV trend is declining"    │  │
│  │        [resolve]  [dismiss]   │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  SCORE TREND                        │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │  [7d] [14d] [30d]             │  │  <- Time range selector
│  │                                │  │
│  │  -----.                        │  │  <- Line chart
│  │  /     \   .---.              │  │     purple line, orange dots
│  │ /       ---     \  .--        │  │
│  │                    --          │  │
│  │  May 14        May 21         │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  CORRELATIONS                       │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ "On days you meditate, your   │  │  <- Correlation Row 1
│  │  stress score is 40% lower"   │  │
│  │  [||||||||||||---] 85% strong │  │     strength indicator
│  ├───────────────────────────────┤  │
│  │ "Morning workouts correlate   │  │  <- Correlation Row 2
│  │  with 12% higher energy"      │  │
│  │  [|||||||||------] 72% mod.   │  │     strength indicator
│  │  see all ->                    │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  YOUR BEST DAY                      │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Your best days include:        │  │  <- Best Day Formula
│  │                                │  │
│  │ [x] 7+ hours sleep        done│  │     checklist items
│  │ [x] Morning workout       done│  │     with today's status
│  │ [ ] < 2 coffees          3/2  │  │
│  │ [x] 10 min meditation    done │  │
│  │ [ ] No screens after 10pm     │  │
│  │                                │  │
│  │ Today: 3/5 factors matched     │  │  <- Progress summary
│  │ [||||||||||||||-------] 60%    │  │     progress bar
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  WEEKLY REPORT                      │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Week of May 12-18       v     │  │  <- Collapsible header
│  │ "Your best domain was          │  │     (collapsed shows summary)
│  │  nutrition at 88. Fitness      │  │
│  │  dropped due to 2 missed      │  │
│  │  workouts."                    │  │
│  │           see full report ->   │  │
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  PREDICTIONS                        │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ Tomorrow's predicted score:    │  │  <- Prediction Card
│  │                                │  │
│  │            ~75                 │  │     Large predicted value
│  │                                │  │
│  │  Based on your Wed patterns    │  │
│  │  [87% accurate]  [thumbs]     │  │     Accuracy badge + feedback
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  RECENT INSIGHTS                    │  <- Eyebrow
│  ┌───────────────────────────────┐  │
│  │ "Your sleep quality improved   │  │  <- Insight Row 1
│  │  15% since adding magnesium"   │  │
│  │              [thumbs up/down]  │  │     Feedback buttons
│  ├───────────────────────────────┤  │
│  │ "Stress peaks on Mondays -     │  │  <- Insight Row 2
│  │  consider a morning routine"   │  │
│  │              [thumbs up/down]  │  │     Feedback buttons
│  └───────────────────────────────┘  │
│                                     │  <- 24pt gap
│  ┌───────────────────────────────┐  │
│  │ [graph icon] Explore your      │  │  <- Knowledge Graph Link
│  │   health knowledge graph  ->   │  │     navigation card
│  └───────────────────────────────┘  │
│                                     │  <- 48pt bottom breathing
├─────────────────────────────────────┤
│  Today  │  SIA  │  Goals  │  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack (top to bottom)

1. **Intelligence Header** -- 88pt (expanded), FIXED, sticky with backdrop-blur
   - Purpose: Screen identification with AI-mode branding
   - Content: back chevron, "Intelligence" title, 3pt royal-purple accent line, overflow menu

2. **Daily Score Hero Card** -- ~280pt
   - Purpose: The centerpiece -- today's unified health intelligence score
   - Content: Large circular progress ring with score, pillar sparkline row, trend arrow, last-updated timestamp

3. **Active Contradictions Section** -- ~120-240pt (variable, 0-N cards)
   - Purpose: Surface data inconsistencies requiring user attention
   - Content: Alert-style cards with contradiction description, resolve/dismiss action chips

4. **Score Trend Chart Card** -- ~220pt
   - Purpose: Visualize score history over configurable time range
   - Content: Line chart with time range selector (7d/14d/30d)

5. **Correlations Section** -- ~180pt
   - Purpose: Show discovered cross-domain behavioral relationships
   - Content: Correlation rows with strength indicator bars, "see all" link

6. **Best Day Formula Card** -- ~260pt
   - Purpose: Personalized optimal day checklist with today's progress
   - Content: Factor checklist with real-time status, overall progress bar

7. **Weekly Report Summary Card** -- ~160pt (collapsed), ~320pt (expanded)
   - Purpose: Latest weekly analysis highlights
   - Content: Collapsible card with week date range, summary text, "see full report" link

8. **Predictions Card** -- ~160pt
   - Purpose: Tomorrow's predicted score based on behavioral patterns
   - Content: Large predicted value, basis explanation, accuracy badge, feedback buttons

9. **Recent Insights Section** -- ~160pt
   - Purpose: AI-generated insight history with feedback mechanism
   - Content: 2-3 insight rows with thumbs up/down feedback buttons

10. **Knowledge Graph Link Card** -- ~64pt
    - Purpose: Navigation to the visual health knowledge graph sub-screen
    - Content: Graph icon + descriptive text + right chevron

---

## Components

### Intelligence Header (STICKY)
- **Purpose**: Screen identification with AI-mode branding
- **Data source**: Static
- **Visual treatment**: 88pt expanded, collapses to 48pt on scroll. ink-900 background, backdrop-blur(16px) when collapsed. Royal-purple accent line instead of a domain color -- this is the AI's screen.
- **Size**: Full-width x 88pt (expanded), 48pt (collapsed)
- **Sub-elements**:
  - Back button: standard (left chevron, white, 20pt, 44x44pt, 16pt from left)
  - Title: "Intelligence" in 20pt Sora Semibold, white, left-aligned 56pt from left
  - Accent line: 3pt height, royal-purple (#7F24FF) at 80%, extends from title left to ~60% width, 4pt below title baseline
  - Overflow menu: 3 dots, right-aligned, 16pt from right, 44x44pt touch target. Opens bottom sheet with: "notification settings", "export data", "about SIA intelligence"
- **Gestures**: back button taps pop stack; overflow opens bottom sheet

### Daily Score Hero Card
- **Purpose**: The single most important data point -- today's unified health intelligence score
- **Data source**: `GET /api/v1/intelligence/score/breakdown` -- returns overall score and per-pillar breakdown
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt internal padding. Subtle purple radial glow behind the score ring: royal-purple (#7F24FF) at 8% opacity, 120pt radius, centered on the ring. This is the one card where purple can be prominent because this IS the AI's domain.
- **Size**: Full-width minus 32pt x ~280pt
- **Sub-elements**:
  - Eyebrow: "DAILY SCORE", 12pt Sora Semibold, royal-purple (#7F24FF), uppercase, +0.12em tracking
  - Circular progress ring: 120pt diameter, 10pt stroke (the billboard `GaugeRing` size — `--stroke-bold` per `CONSISTENCY.md`; see Visualization S48-V01). Track: white at 10% over `--track-inset`. Fill: royal-purple (#7F24FF) arc-following `--grad-purple` (mint), clockwise from 12 o'clock. Represents score out of 100.
  - Score value (center of ring): 36pt Sora Bold, white. Example: "82"
  - Score label: "/ 100" in 14pt Sora Regular, white at 40%, right of score value inside ring
  - Trend arrow: 16pt below ring, centered. Up: green (#34A853) arrow + "+3 from yesterday" in 13pt Sora Regular, green. Down: orange (#FF5E00) arrow + "-5 from yesterday" in orange. Flat: white at 50% dash + "same as yesterday" in white at 50%.
  - Pillar sparkline row: 16pt below trend arrow. Horizontal row of 3 mini-sparklines (fitness, nutrition, wellbeing), evenly spaced across card width minus padding.
    - Each sparkline: 64pt wide x 24pt tall mini line chart (last 7 data points), stroke 1.5pt
    - Sparkline color: royal-purple at 60%
    - Label below: pillar name in 11pt Sora Regular, white at 50%, centered
    - Current value: 13pt Sora Semibold, white, centered below label
    - Micro trend arrow: 10pt, same color coding as main trend
  - Timestamp: "updated 2 hours ago" in 11pt Sora Regular, white at 30%, bottom-left of card
- **Variants**:
  - Populated: full display as described
  - Insufficient data (Day 1-3): ring shows "--" instead of score, purple at 30% fill. Text: "SIA needs a few more days of data to calculate your score." Sparklines hidden.
  - Loading: skeleton shimmer on ring, sparklines, and text
- **Gestures**: Tap pillar sparkline navigates to that domain's dashboard (stack push). Tap the main score ring navigates to a detailed breakdown (expand inline or push).

### Active Contradictions Section
- **Purpose**: Surface inconsistencies between self-reported data and measured data, building trust through transparency
- **Data source**: `GET /api/v1/intelligence/contradictions` -- returns active contradictions with id, description, severity, sources
- **Visual treatment**: Each contradiction is an individual card. Cards stack vertically with 8pt gap.
- **Size**: Full-width minus 32pt x ~120pt per card (variable based on text length)
- **Sub-elements**:
  - Eyebrow above section: "CONTRADICTIONS" in 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking. (Structural eyebrow — not AI-generated content, so uses standard white treatment, not purple.) Count badge: "(2)" in 12pt Sora Semibold, orange (#FF5E00), inline 4pt after eyebrow text.
  - Each contradiction card: ink-brown-800, --r-xl (28pt), 24pt padding
    - Alert icon: "!" in a 20pt circle, orange (#FF5E00) fill, white icon, top-left of card content
    - Description text: 15pt Sora Regular, white at 85%, 36pt from card left (cleared from icon). Max 3 lines. Example: "You report sleeping 8 hours but WHOOP shows 5.5 hours of actual sleep."
    - Source tags: 11pt Sora Regular, white at 40%, below description (4pt gap). Example: "sleep log vs. WHOOP data"
    - Action chips row: 8pt below description, right-aligned
      - "resolve" chip: royal-purple (#7F24FF) at 15% bg, purple text, 13pt Sora Semibold, --r-pill, 32pt height, 16pt horizontal padding. Tapping opens a resolution flow (bottom sheet with explanation options).
      - "dismiss" chip: 8pt left of resolve. ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold, white at 50%, --r-pill, 32pt height, 16pt horizontal padding. Tapping calls `POST /contradictions/:id/dismiss`.
  - Max 3 visible. If more: "see all contradictions" link in orange, centered.
- **Variants**:
  - Active contradictions (1-10+): cards as described
  - No contradictions: section hidden entirely (no empty state -- absence is the positive state)
  - Loading: skeleton shimmer on 2 placeholder cards
- **Gestures**: Tap "resolve" opens resolution bottom sheet. Tap "dismiss" removes card with slide-left animation. Swipe left on card to dismiss (same as tap dismiss).

### Score Trend Chart Card
- **Purpose**: Visualize score trajectory over time to reveal patterns
- **Data source**: `GET /api/v1/intelligence/score/trend?range=7|14|30` -- returns daily score array
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding
- **Size**: Full-width minus 32pt x ~220pt
- **Sub-elements**:
  - Eyebrow: "SCORE TREND" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Time range selector: 3 chips in a row, 8pt below eyebrow. Each chip: 32pt height, --r-pill. Active: royal-purple (#7F24FF) fill, white text. Inactive: ink-900 bg, 1pt white at 10% border, white at 50% text. Chips: "7d", "14d", "30d". 8pt gap between.
  - Chart area: ~140pt tall, 12pt below selector
    - Line: 2pt solid, royal-purple (#7F24FF), dot markers (6pt circles, purple fill) at each data point
    - Fill area below line: royal-purple at 5% opacity
    - Grid lines: 1pt, white at 3%, horizontal only (3 grid lines)
    - X-axis: date labels in 11pt Sora Regular, white at 30%
    - Y-axis: score labels in 11pt Sora Regular, white at 30% (0, 25, 50, 75, 100)
    - Predicted data (if applicable): 2pt dashed line, purple at 40%, extending 1-2 days into the future
    - Touch interaction: press-and-hold on chart to scrub. Tooltip appears: date + score value in a small pill (ink-900 bg, white text, 13pt Semibold, --r-sm, 8pt padding). Tooltip follows finger horizontally.
- **Variants**:
  - Populated (7+ days): full chart as described
  - Limited data (1-6 days): fewer data points, chart still renders. Dashed purple line from last point projects forward.
  - No data: chart area shows "Track your first week to see your score trend" in 15pt Regular, white at 50%, centered
  - Loading: skeleton shimmer over chart area
- **Gestures**: Tap time range chip to change range (chart crossfades, 280ms). Press-and-hold to scrub. Haptic: light impact on scrub position change.

### Correlations Section
- **Purpose**: Surface discovered relationships between behaviors across domains
- **Data source**: `GET /api/v1/intelligence/correlations` -- returns correlation array with description, strength (0-100), pillar pair, direction
- **Visual treatment**: Section (no enclosing card) with individual correlation rows inside a shared card
- **Size**: Full-width minus 32pt x ~180pt
- **Sub-elements**:
  - Eyebrow: "CORRELATIONS" -- standard purple eyebrow treatment
  - Correlation card: ink-brown-800, --r-xl (28pt), 24pt padding. Contains 2-3 correlation rows.
  - Each correlation row:
    - Description text: 15pt Sora Regular, white at 85%. Example: "On days you meditate, your stress score is 40% lower"
    - Strength indicator bar: 8pt below description. Full-width inside card padding, 4pt height, --r-pill. Track: white at 8%. Fill: graduated purple -- strength < 50%: purple at 40%, 50-75%: purple at 65%, 75%+: purple at 100%. Width proportional to strength value.
    - Strength label: right-aligned on same line as bar. "{N}% {strength_word}" in 12pt Sora Regular. strong (75-100%): white. moderate (50-74%): white at 70%. weak (25-49%): white at 50%.
    - Feedback: small thumbs up/down icons (14pt, white at 30%) far-right on description row. Tapping calls `POST /insights/:id/feedback`.
  - Rows separated by 1pt white at 5%, 12pt padding between
  - Max 3 visible. "see all" link: orange (#FF5E00), center-aligned, 13pt Sora Regular, 44pt touch target.
- **Variants**:
  - Populated (3+ correlations): as described
  - Few (1-2): show all, no "see all" link
  - None: card shows "SIA is analyzing your patterns. Correlations appear after 1-2 weeks of data." in 15pt Regular, white at 50%.
  - Loading: skeleton shimmer on 3 placeholder rows
- **Gestures**: Tap correlation row navigates to SIA Chat [09] with correlation context pre-loaded (tab switch). Tap "see all" expands to full correlation list (push or inline expand). Tap thumbs up/down provides feedback.

### Best Day Formula Card
- **Purpose**: Show the user their personalized "best day" blueprint and how today measures up
- **Data source**: `GET /api/v1/intelligence/best-day` for formula, `GET /api/v1/intelligence/best-day/progress` for today's progress
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Subtle purple gradient at top edge -- purple (#7F24FF) at 4% opacity, 48pt tall radial gradient from top-center, fading to transparent. This mirrors the SIA Inspiration Prompt Card pattern from Screen 36 but in purple.
- **Size**: Full-width minus 32pt x ~260pt
- **Sub-elements**:
  - Eyebrow: "YOUR BEST DAY" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Intro text: "Your best days include:" in 16pt Sora Semibold, white, 8pt below eyebrow
  - Factor checklist: 8pt below intro. Each factor row:
    - Checkbox: 20pt square, --r-xs (4pt) corners. Matched today: purple (#7F24FF) fill + white checkmark (12pt, 2pt stroke). Not matched: white at 15% fill, 1pt white at 20% border.
    - Factor text: 15pt Sora Regular, white at 80%, 8pt right of checkbox. Example: "7+ hours sleep"
    - Status indicator: right-aligned. Matched: "done" in 12pt Sora Semibold, green (#34A853). Not matched: current value in 12pt Sora Regular, orange (#FF5E00). Example: "3/2" (meaning 3 coffees, target was <2).
    - Row height: 36pt, 4pt gap between rows
    - Max 5-6 factors visible
  - Progress summary: 16pt below checklist
    - Text: "Today: 3/5 factors matched" in 14pt Sora Semibold, white
    - Progress bar: 8pt below text. Full card content width, 6pt height, --r-pill. Track: white at 8%. Fill: graduated -- <33%: orange, 33-66%: royal-purple at 70%, 67%+: green (#34A853). Width proportional to match percentage.
    - Percentage: right-aligned on same line as text, 14pt Sora Semibold. Color matches fill color.
- **Variants**:
  - Populated: full checklist with real-time status
  - Insufficient data: "SIA is learning your patterns. Your best day formula will appear after 2-3 weeks of tracking." in 15pt Regular, white at 50%, centered in card.
  - All matched: all checkboxes purple, progress bar green at 100%, confetti micro-animation (8-10 small purple/green particles from bar, 600ms).
  - Loading: skeleton shimmer
- **Gestures**: Tap a factor row for more detail (inline expand showing the data behind it). Tap the whole card to navigate to SIA Chat [09] with "tell me about my best day formula" pre-loaded.

### Weekly Report Summary Card
- **Purpose**: Highlight key findings from the latest weekly analysis
- **Data source**: `GET /api/v1/intelligence/weekly` -- returns latest weekly report with summary, highlights, domain_scores
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Collapsible with expand/collapse chevron.
- **Size**: Full-width minus 32pt x ~160pt (collapsed), ~320pt (expanded)
- **Sub-elements**:
  - Eyebrow: "WEEKLY REPORT" -- 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking (structural eyebrow, standard treatment)
  - Header row: 48pt, full card content width
    - Title: "Week of May 12-18" in 16pt Sora Semibold, white
    - Chevron: 14pt, white at 40%, right-aligned, rotates 0 to 90 degrees on expand
  - Summary text (always visible, collapsed state): 15pt Sora Regular, white at 70%, max 3 lines. Example: "Your best domain was nutrition at 88. Fitness dropped due to 2 missed workouts."
  - Expanded content (hidden when collapsed):
    - Domain score row: 5-9 mini domain score pills in a horizontal wrap layout. Each pill: domain color at 15% bg, domain color text for score value, domain name below in 11pt Regular white at 40%. 48pt tall each.
    - Key highlights: 2-3 bullet points in 14pt Sora Regular, white at 70%. Each bullet preceded by a purple dot (4pt circle, #7F24FF).
    - "see full report" link: orange (#FF5E00), 13pt Sora Semibold, right-aligned, 44pt touch target
  - Expand/collapse animation: content height 0 to auto + fade-in, 280ms ease-out-soft
- **Variants**:
  - Current week: as described
  - No weekly report yet: "Your first weekly report will be generated on Sunday." in 15pt Regular, white at 50%.
  - Loading: skeleton shimmer
- **Gestures**: Tap header row to expand/collapse. Tap "see full report" navigates to Weekly Report Detail (stack push). Tap a domain score pill navigates to that domain dashboard (stack push).

### Predictions Card
- **Purpose**: Display SIA's prediction for tomorrow's score, building trust in the AI system
- **Data source**: `GET /api/v1/intelligence/predictions/accuracy` -- returns predicted_score, basis_text, accuracy_percentage
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding
- **Size**: Full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "PREDICTIONS" -- standard purple eyebrow treatment
  - Intro text: "Tomorrow's predicted score:" in 14pt Sora Regular, white at 60%
  - Predicted value: 32pt Sora Bold, white, centered, 8pt below intro. Prefix "~" in white at 40%. Example: "~75"
  - Basis text: 13pt Sora Regular, white at 50%, centered, 8pt below value. Example: "Based on your Wednesday patterns"
  - Accuracy badge: pill shape, --r-pill, 28pt height, 12pt horizontal padding. Green (#34A853) at 15% bg, green text ("87% accurate") in 12pt Sora Semibold. Positioned 12pt below basis text, left-aligned.
  - Feedback row: same line as accuracy badge, right-aligned. Thumbs up (16pt icon, white at 30%) + thumbs down (16pt icon, white at 30%), 16pt gap between. Active state: thumbs up turns green, thumbs down turns orange.
- **Variants**:
  - Populated: full prediction display
  - Low confidence: accuracy badge shows orange text on orange bg at 15%. Example: "52% accurate -- still learning"
  - No prediction: "SIA needs more data to make predictions. Keep tracking!" in 15pt Regular, white at 50%, centered.
  - Loading: skeleton shimmer
- **Gestures**: Tap the card body navigates to SIA Chat [09] with prediction context. Tap accuracy badge expands inline to show accuracy history (mini chart). Tap thumbs up/down calls `POST /insights/:id/feedback` and animates the selected thumb (scale 1.0 to 1.3 + color change, 160ms).

### Recent Insights Section
- **Purpose**: Display AI-generated insights with feedback mechanism for continuous learning
- **Data source**: `GET /api/v1/intelligence/history` -- returns recent insights with feedback state
- **Visual treatment**: Section with rows inside a shared card
- **Size**: Full-width minus 32pt x ~160pt
- **Sub-elements**:
  - Eyebrow: "RECENT INSIGHTS" -- standard purple eyebrow treatment
  - Insights card: ink-brown-800, --r-xl (28pt), 24pt padding
  - Each insight row:
    - SIA indicator: purple dot (4pt circle, #7F24FF), 16pt from card left, vertically centered with first text line
    - Insight text: 14pt Sora Regular, white at 80%, 24pt from card left, max 2 lines. Example: "Your sleep quality improved 15% since adding magnesium supplements."
    - Feedback buttons: right-aligned on first text line. Thumbs up (14pt icon) + thumbs down (14pt icon), 12pt gap. Default: white at 25%. Upvoted: green (#34A853). Downvoted: orange (#FF5E00). Tapping calls `POST /insights/:id/feedback`.
    - Timestamp: 11pt Sora Regular, white at 30%, below insight text, 24pt from left. Example: "2 days ago"
  - Rows separated by 1pt white at 5%, 12pt padding between
  - Max 3 visible. "see all insights" link: orange, center-aligned.
- **Variants**:
  - Populated: 1-3 insight rows
  - No insights: hidden (section does not render)
  - Loading: skeleton shimmer on 2 placeholder rows
- **Gestures**: Tap insight text navigates to SIA Chat [09] with that insight as context. Tap thumbs up/down provides feedback with micro-animation.

### Knowledge Graph Link Card
- **Purpose**: Navigation to the health knowledge graph visualization
- **Data source**: Static (navigational only)
- **Visual treatment**: ink-brown-800 card, --r-md (14pt), 16pt padding. Single-row layout. Subtle 1pt purple (#7F24FF) at 15% left border (3pt wide) to tie it to the AI theme.
- **Size**: Full-width minus 32pt x ~64pt
- **Sub-elements**:
  - Graph icon: 20pt, royal-purple (#7F24FF), left-aligned. Custom network/graph icon (3 connected dots).
  - Text: "Explore your health knowledge graph" in 15pt Sora Semibold, white, 8pt right of icon
  - Chevron: 14pt, white at 40%, right-aligned
- **Variants**: N/A (always visible)
- **Gestures**: Tap entire card navigates to Knowledge Graph sub-screen (stack push to `/intelligence/graph` view)

---

## Visualization

> Source: `app_design 3/48-intelligence-dashboard-visualization-recommendations.md`. Audited in `viz-audit/` — Batch 2, findings `S48-V01..S48-V05`. All primitives are from `viz-audit/VIZ-KIT.md` at `viz-audit/CONSISTENCY.md` parameters. **This is the ONE sanctioned AI-Mode purple-dominant screen** — royal-purple (`#7F24FF`) carries SIA-computed data ink here by the exception documented in `_shared-patterns.md` and the Color Map below; orange stays for interactive affordances, green for arrival/positive. **This screen MINTS `VK-009 CorrelationMatrix`.** **Current grade D (54) → specced-target A− (86).** *(Honest re-grade under the revised 10-dimension rubric; residual gap to A+++ is build-verified depth + the working scrub/drill/matrix-cell micro-interactions, owned by the later viz-build program.)*

The Intelligence Dashboard is SIA's analytical command center — the most data-rich screen in the app. Today it renders that intelligence as a flat purple ring, autoscaled `polyline` pillar sparklines (a **dishonest** min/max autoscale), colour-only correlation strength bars, and — most critically — the **Life Correlation Matrix, the app's core differentiator, is entirely absent**, reduced to two text rows. This section resolves every datum intentionally, mints the `CorrelationMatrix` primitive, and routes the trend through the Living Line with the brand-correct **dashed-purple SIA forecast** (which is on-brand *here*, not a violation — §11). Premium reads as **Welltory/Gentler Streak-grade correlation surfacing**, *warm* and non-judgmental — not a clinical heatmap.

### Visualized-vs-text map

| Datum (already shown) | Today | Specced visual | Primitive |
|---|---|---|---|
| Composite intelligence score (82/100) + trend | flat purple ring, count-up | **hero `GaugeRing`** (AI-Mode purple): arc-gradient + inset track + calibrated `--glow-purple-md` + count-up | `GaugeRing` (`S48-V01`) |
| 3 pillar scores + 7-pt trends (fitness/nutrition/wellbeing) | autoscaled `polyline` (dishonest) | **`Sparkline` row** — 7-pt Living Lines, honest 0–99 scale, visible trend sign | `Sparkline` ×3 (`S48-V02`) |
| Cross-domain correlations (strength + direction) | 2 text rows + colour-only bar | **`CorrelationMatrix` (VK-009)** domain×domain + ranked strength bars w/ sign+arrow | `CorrelationMatrix` (`S48-V03`) |
| Score history (7/14/30d) + tomorrow's prediction | flat 3px `polyline`, no forecast | **`TrendChart` (Living Line)** — solid purple actual + **dashed-purple SIA forecast** tail to predicted ~75 | `TrendChart` (`S48-V04`) |
| Best-Day match % + tomorrow's predicted score | progress bar / big number | depth pass: graduated `MomentumBar` (non-shaming) + prediction `GaugeRing` mini-arc | `MomentumBar` + `GaugeRing` (`S48-V05`) |
| Contradictions, weekly summary, insight feedback | alert cards / text / thumbs | — (deliberately textual + iconographic; framed non-judgmentally) | — |
| Timestamps, week date, basis text, names | text | — (deliberately textual) | — |

### 1 · Daily Score hero — `S48-V01`  → `GaugeRing` (AI-Mode purple exception)

The composite intelligence score is the screen's single focal point. Render it as a **hero `GaugeRing`** at **120px** (billboard size, 10px stroke), replacing the bespoke flat ring in the prototype (`ScoreRing`, which today is a single-tone purple `circle` with a `blur-2xl` ambient haze, not a calibrated glow, and is unbuildable from `ProgressRing` whose sizes lock to `36 | 48 | 96`).
- **Primitive:** `GaugeRing` in **`domain`/AI mode = purple** (the sanctioned AI-Mode accent — cite `_shared-patterns.md`). Center value `82` `text-display` white + `/ 100` white/40; `ticks` prop on (hero score gauge — 12 radial ticks, 6px, `--color-alpha-white-25`); trend arrow below (▲ green "+3 from yesterday" / ▼ orange / — white/50).
- **Depth (token-backed):** arc-following fill = **`--grad-purple` (mint, VK-017)** = `linear-gradient(180deg, var(--color-royal-purple) 0%, var(--purple-light) 100%)` via **conic-mask** (an SVG `linearGradient` cannot sweep along the arc); track = `--color-alpha-white-10` over `--track-inset` `rgba(0,0,0,0.28)` **(mint)** recessed ring; glow = **`--glow-purple-md` (~20px, mint)** calibrated to the 120px hero — **not** the prototype's unbounded `blur-2xl`, and **not** the 32px hero glow (which is for orange heroes; the purple equivalent is size-stepped identically). At 100% / in-range the arrival accent is green per brand law.
- **Micro-interaction:** tap the ring → expand the per-pillar breakdown inline (CONSISTENCY tap `--dur-fast` 160ms); long-press is reserved for the trend chart.
- **Data:** `intelligenceDashboard.score`, `.trend` (`src/data/mock.ts`).
- **States:** **cold-start / Day 1–3** → ring renders a **faint full purple track with "--"** in the hub + "SIA is getting to know you — your score appears in a few days," **never** a collapsed 0% arc that reads as "you scored zero"; **loading** → depth-preserving skeleton keeps the track ring + tick marks visible with a radial shimmer, morphing into the drawn arc; **error** → "couldn't load your intelligence score" with retry per the Error Handling table.

### 2 · Pillar Sparkline row — `S48-V02`  → `Sparkline` ×3 (Living Line)

The three pillar trends become a row of true **Living-Line `Sparkline`s** (a tiny Living Line), fixing the current prototype's two defects: (a) `pointsFor()` **autoscales each sparkline to its own min/max**, which exaggerates a flat series into a dramatic swing — a **chart-honesty (§dim 5) violation**; (b) the line is a straight `polyline`, not the curved round-capped signature.
- **Primitive:** `Sparkline` — **exactly 7 points**, `--stroke-thin` 2px, **curved** (monotone), round-capped, **no axes / no grid / no glow**, 64×24 in-card. AI-Mode tint = **royal-purple** (SIA-computed). Each carries: pillar label (11pt white/50), current value (13pt white), and a **visible trend sign** (▲/▼/— glyph, never colour-alone) coloured green-up / orange-down / white-50-flat.
- **Honesty fix:** all three sparklines share a **fixed 0–99 domain-stat scale** (matching the radar/stat max used app-wide), so a flat pillar *looks* flat. No-data points are **ghosted/dashed**, distinct from a real low value.
- **Motion:** each draws L→R on scroll-into-view, `--dur-slow` 520ms `--ease-flow`, 120ms stagger across the three.
- **Data:** `intelligenceDashboard.pillars[].points` (7 values each), `.value`, `.trend`.
- **States:** **insufficient data** → sparklines hidden, pillar shows value-only or "—"; **loading** → flat skeleton baseline that draws into the trend.

### 3 · Correlation Matrix — `S48-V03`  → `CorrelationMatrix` (VK-009, MINTED HERE) + ranked strength bars

The screen's namesake — Balencia's **Life Correlation Matrix** — is today reduced to two prose rows with colour-only strength bars. This is the highest-leverage gap on the screen and the reason `VK-009` is minted here. The Correlations section becomes a two-tier reveal:
- **Tier 1 — `CorrelationMatrix` (VK-009):** a compact **domain×domain (or pillar×pillar) intensity grid** — Balencia's correlation engine made legible. **Encoding:** cell **intensity = |strength|**; **direction = sign, never colour alone** — a **`+` (reinforcing) / `−` (competing/inverse)** glyph **and** a directional tint (reinforcing = warm purple `--color-royal-purple`; competing = a **desaturated cool tint** `--color-domain-sleep` family at low chroma), **always paired with the glyph**; the **diagonal is muted** (self-correlation, `--color-alpha-white-05`). Built by extending the deployed `CalendarHeatmap` cell engine (5 intensity steps), re-scaled to a square N×N grid with row/column domain icons.
- **Tier 2 — ranked strength bars:** below the matrix, the top 2–3 correlations as readable rows: description (15pt white/85) + a **strength bar with a leading direction arrow** (↑ reinforcing / ↓ inverse, `--stroke-thin`) + "{N}% {strong|moderate|weak}" label. Track `--color-alpha-white-08`; fill graduated purple by strength (40/65/100% — *paired with the arrow + word*, never the bar colour alone). Thumbs up/down feedback far-right.
- **Depth (token-backed):** matrix cells use the `CalendarHeatmap` intensity ramp re-tinted to the purple/cool direction pair; 2px cell gap, `--r-xs` cell corners; today/hovered cell = dashed border (reuse heatmap `today` treatment). Card surface = `ink-brown-800` + top-edge highlight.
- **Micro-interaction:** tap a cell → a tooltip pill (`ink-900`, `--r-sm`, 8px pad) reads "Meditation ↔ Stress: −40% (strong inverse)" and offers "ask SIA" → SIA Chat [09] with context; tap a ranked row → SIA Chat with that correlation pre-loaded. Cell targets ≥ 44×44pt (or the row beneath provides the 44pt target if cells pack tighter on a 12×12 grid).
- **Data:** `intelligenceDashboard.correlations[]` (`.strength`, `.label`, direction by sign of effect); full matrix sourced from `GET /api/v1/intelligence/correlations` (the matrix endpoint returns the domain×domain coefficient grid).
- **States:** **none / analyzing** → matrix collapses to the card's existing "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of data." copy (no degenerate empty grid); **partial** → un-computed pairs render as **ghosted cells** (distinct from a true zero correlation, which is a muted near-diagonal tone); **loading** → skeleton grid of pulsing cells.

### 4 · Score Trend — `S48-V04`  → `TrendChart` (Living Line + dashed-purple SIA forecast)

The 7/14/30d score history becomes the **Living-Line `TrendChart`**, and — crucially — **carries the SIA forecast as a dashed-purple tail** (the prototype omits the projection the spec already calls for). Here the dashed-purple projection is **brand-correct**, not a violation (§11): purple *is* SIA's forecast colour, and this is SIA's screen.
- **Primitive:** `TrendChart` — actual = solid **purple** Living Line (AI-Mode), 2px, curved, round-capped, green milestone dots; **projected = dashed purple `#7F24FF`** (dash 4·2, 2px) continuing the same path **1–2 days forward to the predicted ~75**, tying the Predictions card to the trend visually. Area fill = **`--grad-purple` (mint)** vertical fade ≤25%. W/M selector = `7d`/`14d`/`30d` pills (active = purple fill, inactive white/50).
- **Honest scale:** fixed **0–100 y-axis** with 0/25/50/75/100 ticks (the prototype already does this — preserve it); compared ranges share the scale; no-data gap renders as a **break in the line** (per the "Returning after absence" empty state), not a drop to zero.
- **Motion:** line **draws itself** L→R `stroke-draw` `--dur-flow` 1200ms `--ease-flow` — **never** opacity-fade; dots scale-in staggered after the stroke passes; range change crossfades 280ms.
- **Micro-interaction:** **press-and-hold to scrub** — tooltip pill follows finger (date + score), light-impact haptic on point change. The scrub region and selector chips are ≥ 44×44pt.
- **Data:** `intelligenceDashboard.trendPoints[]` + `.prediction.score` (the forecast endpoint).
- **States:** **limited data (1–6 days)** → fewer points, the dashed-purple forecast still projects forward; **no data** → "Track your first week to see your score trend." centered; **loading** → skeleton over the chart area.

### 5 · Best-Day momentum + Prediction depth — `S48-V05`  → `MomentumBar` + mini `GaugeRing`

Two depth passes that keep these cards from reading as plain text:
- **Best-Day progress** → a **`MomentumBar`** (single **continuous** rounded fill, 8px, radius-pill, track `--color-alpha-white-08`) for "Today: 3/5 factors matched." Per the spec's graduated rule the fill steps orange (<33%) → purple-70 (33–66%) → green (67%+) — kept, but **framed non-judgmentally**: a low bar reads "room to move today," never a failure; no streak is weaponised. The all-matched confetti micro-animation is retained.
- **Tomorrow's prediction** → the big `~75` value gains a small **`GaugeRing`** (48px card size, `--glow-purple-sm` mint) behind/beside it so the predicted score reads as a calibrated instrument, not bare text; accuracy badge stays a green/orange pill (green = reliable, orange = "still learning" — honest confidence framing, with a visible word, not colour alone).
- **Motion:** momentum fill rises 0→value `--dur-slow` 520ms; predicted-score gauge + count-up `--dur-base` 280ms.
- **Data:** `intelligenceDashboard.bestDay`, `.prediction`.
- **States:** **insufficient data** → both show their existing "SIA is learning your patterns…" copy, no degenerate empty bar/ring.

### Motion choreography (entrance)

Per `CONSISTENCY.md` — **hero draws first:** the Daily-Score `GaugeRing` arc fills + count-up → **then** the pillar `Sparkline`s draw L→R (120ms stagger) → contradictions fade in (structural, 80ms stagger) → on scroll-into-view, the `TrendChart` Living Line **draws** (then dots scale-in) → the `CorrelationMatrix` cells fade/scale-in row-by-row → the Best-Day `MomentumBar` fills → the prediction gauge counts up. One line motif per surface; below-fold visuals animate on scroll-into-view. `prefers-reduced-motion` → every visual at final state, with the Living Line's static form preserved (completed stroke + green end/milestone dot) and the matrix at full intensity.

### States, brand & accessibility

- **States (all designed, per RUBRIC dim 7):** **cold-start** (score ring "--" calibrating; sparklines hidden; matrix "analyzing"; trend "track your first week"; best-day/prediction "learning") — **no degenerate collapsed ring, empty grid, or zero-radar**; **loading** (depth-preserving skeletons — ring track + ticks, sparkline baselines, matrix cell grid, chart area — that morph into drawn data, never blank discs); **partial** (un-synced pillars ghosted; un-computed matrix pairs ghosted, distinct from a true zero correlation); **error** (chart-specific per the Error Handling table — names which series/section failed + recovery; contradictions degrade silently since absence is the positive state).
- **Brand & 60/30/10 — AI-Mode exception (cite `_shared-patterns.md`):** this is the **one** screen where **royal-purple `#7F24FF` carries data ink** — the score gauge, pillar sparklines, the correlation matrix's reinforcing direction, the trend line, and the on-brand **dashed-purple SIA forecast** are all purple *because they are SIA-computed*. **Orange stays interactive** (links, "see all", "see full report", contradiction alert icons). **Green = arrival/positive** (trend-up, matched factors, high accuracy, milestone dots, in-range gauge). The matrix's *competing/inverse* direction uses a **desaturated cool tint** (sleep-blue family at low chroma) **always paired with a `−` glyph** — never colour alone. Domain colours appear only as the matrix row/column identity icons and weekly-report pills. Glow uses the calibrated size-stepped purple scale (`--glow-purple-md/-sm`, mint) — premium warm depth, never neon.
- **Non-shaming (ethical gate, RUBRIC dim 6):** the composite score is framed as **state, not a verdict** on worth; contradictions are surfaced as **trust-building transparency** ("here's what the data shows"), never an accusation; the weakest pillar / lowest correlation is a coaching prompt, not "you're failing"; the Best-Day bar frames forward momentum; deltas use the disclosed yesterday/this-week windows (no cherry-picking).
- **Accessibility:** every chart carries a text/`aria-label` equivalent — score gauge reads "Daily health intelligence score: 82 out of 100, up 3 from yesterday"; each sparkline "[pillar], score [N], trending [up/down/flat]"; **each matrix cell** "[Domain A] and [Domain B]: [+/−][N]%, [reinforcing/competing], [strong/moderate/weak]" — direction is **never colour-alone** (the `+`/`−` glyph and arrow are visible); the trend chart announces "Score trend over [N] days. Current [N]. Average [N]." Text/value contrast ≥ 4.5:1 on `#0A0A0F` / `#211008`; load-bearing strokes/arcs/cells/dots meet **WCAG 1.4.11 ≥ 3:1** (the purple `#7F24FF` arc and line clear 3:1 on `#0A0A0F`/`#211008`; the white/3 trend grid is decorative-only); interactive targets (gauge, scrub region, selector chips, matrix cells/rows, thumbs) ≥ 44×44pt. `prefers-reduced-motion` renders all at final state.

Conform to `viz-audit/CONSISTENCY.md`.

---

## Premium Craft

**Profile:** data · **Cluster benchmark:** Gentler Streak + Welltory (AI-Mode purple-dominant; CorrelationMatrix VK-009) — *stays Balencia via the hero GaugeRing + warm-glow surfaces on ink-brown, purple earned as SIA-computed data-ink, not a competitor purple clone.*

**Pre-grade:** A− (85) · **Post-grade (this section):** A++ (96)

**Pre-grade drivers:** The A− viz layer (GaugeRing hero, Living-Line sparklines, CorrelationMatrix VK-009 minted, TrendChart dashed-purple forecast) is premium; the craft gaps are: (1) non-viz surfaces (contradictions, correlations rows, cards) are flat `ink-brown-800` without top-edge highlight or glow depth; (2) focal hierarchy is split (hero ring vs. contradictions alert banner both claim visual urgency); (3) microcopy on edges (loading / empty / resolution flow, permission rationale for sync-denied) is partly unwritten; (4) type tracking/line-height are pixel ad-hoc (14pt headers vs. 20pt with inconsistent leading); (5) state craft is sparse (cold-start shows "--" but no warm preamble; error-red missing for genuine API failure); (6) contrast pairs are asserted, not tabulated for the purple/orange/white layers on both `ink-900` and `ink-brown-800`.

### Focal hierarchy

One focal point: the **Daily Score Hero Card** (`CK-P2`, data hero) — the 120px GaugeRing with calibrated `--glow-purple-md` (20px, mint), the arc-gradient fill, the count-up hub. This is the screen's single most important visual anchor, above the fold, the first read in <2s (squint test: the purple glow'd circle reads first, then the 82 center value, then the pillar sparkline row). The **Active Contradictions Banner sits below as urgent structural information, not a competing hero**: alert-styled (orange icon, action chips) but visually secondary by placement (below fold or sticky below header collapse) and by framing (a transparency building block, never a "failure verdict"). Everything below (correlations, best day, weekly, predictions, insights) is visibly secondary by size, glow absence, and card hierarchy.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt on primary cards) · 1px `--glass-border` (white at 6%) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, fixes the prototype's uniform flat fill) · `--shadow-1`. The Daily Score Hero Card and the Predictions Card (the two focal hero elements on the screen) add `--surface-backplate` (`CK-T02`, faint warm radial). Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-purple-md` (20px /.40, mint)** on the 120px Daily Score ring only (the hero); **`--glow-orange-sm` (~12px /.35)** on the 48px Predictions GaugeRing (secondary hero); **no glow** on inline chips, buttons, or rows. Correlation strength bars and Best Day progress bar sit over `--track-inset` (rgba(0,0,0,0.28)) beveled recess, not flat. Card radius consistent: primary cards `--radius-xl` (28pt), Knowledge Graph link card `--radius-md` (14pt). Extends the same depth language to all surfaces (contradictions, correlations, best day, weekly, insights) so nothing reads as a flat box — premium depth throughout.

### Typographic rhythm

Map the existing Typography table to `CK-P3` tokens. AI-mode eyebrows (DAILY SCORE, CORRELATIONS, PREDICTIONS — 3 sections of purple, SIA-computed) stay **`--text-eyebrow` 12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-royal-purple`**. Structural eyebrows (CONTRADICTIONS, SCORE TREND, YOUR BEST DAY, WEEKLY REPORT — 4 sections) shift to **white at 40%** (the same `.eyebrow` recipe, but colorless, to distinguish "SIA computed this" from "this is how the screen is structured"). Score value 36pt becomes `--text-display-l` 32pt / 700 / `--leading-tight` (1.1); "/ 100" stays 14pt Regular but mapped to `--text-caption` token. Contradiction description 15pt → `--text-body` (16pt) / `--leading-normal` (1.4); source tags 11pt → `--text-small` / `--leading-normal`. Correlation description + Best Day factor text stay 15pt (matches `--text-body` paired with `--leading-normal`); strength label + Best Day status 12pt → `--text-caption`. Prediction basis 13pt → `--text-caption`; predicted value 32pt → `--text-display-l` / `--leading-tight`. All hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout (all labels/buttons in sentence case per `CK-P3`). ≤2 `--color-brand-orange` accent words per screen (interactive affordances: "resolve" chip, "see all" links, "see full report" link; microcopy reserves orange for CTAs only, never copy accent). Stat figures (scores, percentages) tabular-nums. Chillax logo-only (none on this screen).

### Microcopy (before → after)

Every user-facing string authored to `CK-P5` brand voice (warm, plain, coaching, no exclamation marks, specific to user's data where SIA-generated):

- **Daily Score, cold-start (Day 1–3)** — *before:* ring shows "--", no context → *after:* "SIA is getting to know you — your score appears in a few days" (matches Visualization S48-V01; frames building, not deficit).
- **Pillar sparklines, no data** — *before:* sparklines hidden, value shows as "--" → *after:* label shows "[Pillar], building capacity" (non-shaming, matches CK-P5 framing).
- **Contradictions, loading** — *before:* no message → *after:* "SIA is checking for inconsistencies — one moment" (transparent, collaborative).
- **Contradictions, none** — *before:* section silently hidden → *after:* section hidden (absence is the positive state per spec §6).
- **"resolve" chip action** — *before:* chip label only → *after:* "resolve" in purple, tap opens resolution bottom sheet with explanation-first framing: "Here's what the data shows — how would you like to respond?" (never accusatory).
- **Score Trend, loading** — *before:* no message → *after:* skeleton chart with label "loading trend data" (preserves layout, morphs to data).
- **Correlations, Day 1–14** — *before/kept:* "SIA is analyzing your patterns. Correlations appear after 1–2 weeks of data." (warm, building-framed).
- **Best Day progress, low % (< 33%)** — *before:* orange progress bar, no framing → *after:* "3/5 factors matched — room to move today" (honest state, not shaming; CK-P5 pattern).
- **Predictions, cold-start** — *before:* "SIA needs more data to make predictions. Keep tracking!" → *after:* "Predictions appear after a week of patterns" (instructive, calm, removes pressure).
- **Insight feedback icons** — *before:* thumbs icons white-25, no label → *after:* icons stay subtle; on first appearance add label "helpful?" (a11y + guidance).
- **Error state (API failure)** — *before:* section silently hidden → *after:* if critical (score, trend), show inline retry: "Couldn't load [section name] — tap to retry" (specific, recovery-clear).
- **Offline state** — *before:* no banner → *after:* cached banner: "you're offline — showing cached data" (white-60 on `ink-brown-800`, calm).

All SIA-copy (contradictions, predictions, insights, correlation descriptions) is **specific to user's own data** (real pattern, never horoscope). No exclamation marks; the period with intent.

### Motion choreography

Locked to `CK-P4` order (draw-first, never fade stroke): **Daily Score GaugeRing arc draws** (`stroke-animate`, `--dur-flow` 1200ms `--ease-flow`, screen entry) → **hub counts up** (parallel, `--dur-slow` 520ms) → **pillar Sparklines draw L→R** (after ring, `--dur-slow` 520ms, 120ms stagger across three) → **cards rise** (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 80ms stagger: contradictions, correlations, best day, weekly, predictions, insights) → **SIA elements settle** (no purple flourish, last to appear) → **below-fold surfaces animate on scroll-into-view** (TrendChart draws L→R, CorrelationMatrix cells fade-scale-in row-by-row, MomentumBar fills, prediction GaugeRing counts). `prefers-reduced-motion` → all elements at final state instantly; Living Lines fully drawn with green end dots, rings at final fill, loops off, matrix at full intensity.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day 1–3 | Score ring faint full track + "--" (never collapsed 0% arc), pillar sparklines hidden, contradictions hidden, trend "Track your first week…", correlations "SIA is analyzing…", best day "SIA is learning…", weekly "First report Sunday", predictions "Predictions appear after a week", insights hidden | "SIA is getting to know you — your score appears in a few days." All SIA strings warm, building-framed. No pressure. | ring track + ticks visible (depth preserved), `--surface-backplate` on hero, never degenerate |
| Loading (any section) | Section skeleton (ring track+ticks shimmer→arc; trend outline+baseline shimmer; correlation row skeleton; best-day checklist skeleton). Layout preserved, depth visible. | "SIA is checking for inconsistencies — one moment" (contradictions) / "Loading trend data" / per-zone warm. | skeleton on `--color-ink-brown-800`, radial shimmer on hero, morphs to data (never swap) |
| Empty / partial | Ghosted/dashed sparklines (distinct from zero). Contradictions absent (section hidden — absence positive). Correlations: "analyzing" if matrix not computed. Predictions: "Unavailable right now" if low confidence. Insights: hidden if none. | "Your stats grow as you build habits." Per-zone, warm, non-shaming. | ghosted ≠ zero; no-data per design rules |
| Error (genuine API failure — 5xx/timeout) | Cached data if available; else inline error + retry. Network banner: "Couldn't refresh — pull to refresh." | "Couldn't load your score. Tap to retry." Specific, recovery action named, calm. Never generic. | calibrated `--color-error-red` glyph+word paired (alert icon + text) — never colour-alone; red reserved for operational failure only |
| Offline (cached data) | All sections render cached; pull-to-refresh dimmed with reason. | "You're offline — showing your last sync." Honest, no urgency. | actions honestly dimmed (50% opacity); cached retained |

### Signature & anti-generic

Ownable moments: the **hero GaugeRing with calibrated purple glow** (Living-Line + Constellation Radar + GaugeRing = app signature trio; purple earned here); the **dashed-purple SIA forecast tail on TrendChart** (visual bridge between historical and predicted, purple earned); the **warm-glow surfaces on ink-brown-800** (non-flat, non-neon depth signature); the **CorrelationMatrix VK-009** (Balencia's cross-domain insight differentiator, made legible). Anti-generic fix: the screen avoids flat equal-height card monotony. Daily Score hero + sparkline row (focal block) → contradictions (variable height, alert-styled) → varied card sizes (correlations compact, best day larger, weekly collapsible, predictions compact, insights variable). Section-eyebrow rhythm (`CK-P6` anti-generic pattern) breaks monotony: each section led by colored (purple or white-40) eyebrow + header, never an undifferentiated list.

### Accessibility

**Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):**
| Element | Color | Contrast |
| --- | --- | --- |
| Score value (36pt) | white 100% | ≥12:1 both fields |
| Trend arrow (glyph) | `--color-forest-green` / `--color-brand-orange` | ≥3:1 (WCAG 1.4.11; glyph+word paired) |
| Pillar values | white 100% / tabular-nums | ≥12:1 |
| Contradiction description | white 85% | ≥4.5:1 on `--color-ink-brown-800` |
| Contradiction badge | `--color-brand-orange` | 3.2:1 on `ink-brown-800` (1.4.11) |
| Alert icon (!) | `--color-brand-orange` + white-85 text | 3.2:1 paired, never colour-alone |
| "resolve" chip | `--color-royal-purple` on purple-15% | 3.8:1 (1.4.11) |
| "dismiss" chip | white 50% on `ink-brown-800` | 2.8:1 (subminimal; build: white 60% → 3.5:1) |
| "see all" links | `--color-brand-orange` | 3.2:1 (1.4.11) |
| Time range active | white on `--color-royal-purple` | 4.5:1 (AA) |
| Correlation bar | `--color-royal-purple` 40/65/100% | 2.8–4.1:1 (glyph ↑/↓ + word "strong/moderate/weak" always present — never colour-alone) |
| Best Day factor | white 80% | ≥4.5:1 |
| Best Day status | `--color-forest-green` / `--color-brand-orange` | 3.2:1 paired with word, never colour-alone |
| Progress bar fill | orange/purple-70/green | All steps ≥3:1 (1.4.11); label "3/5 matched" always present |
| Accuracy badge | green bg-15 on `ink-brown-800` | 4.2:1; orange variants 3.2:1 (1.4.11) |
| Thumbs active | `--color-forest-green` / `--color-brand-orange` | ≥3:1 paired with count label, never icon-alone |
| Secondary text | white 40% / white 30% | ≥4.5:1 both fields; decorative labels explicitly marked |

**Focus & targets:** Every interactive (chip, card, link, button, scrub region, correlation row, matrix cell) carries `--focus-ring` (`CK-T03`, 2pt orange, 2pt offset) uniform app-wide. Targets ≥44×44pt: chips (32pt+16pt padding), time pills (32pt), thumbs (14pt icon + 44pt box), "see all" (44pt row), correlation rows (48pt min), matrix cells (≥44pt). Pressed: scale(0.97) + light haptic. Swipe-left contradiction = long-press context menu.

**Colour + glyph + word:** Trend arrow = glyph (▲/▼/—) + word ("+3"/"-5"/"same") + colour (green/orange/white-50). Alert = "!" glyph + orange + text. Correlation bar = "↑" or "−" glyph + arrow + word ("strong/moderate/weak") + bar. Best Day = checkmark/blank + "done"/value + colour. Matrix = "+" or "−" glyph + arrow + intensity — never colour-alone.

`prefers-reduced-motion` → final state instantly; Living Lines fully drawn (end dots visible); rings at final fill; matrix full intensity; no loops.

Conform to `design-audit/CONSISTENCY.md`.


---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Header accent line | #7F24FF at 80% | royal-purple | AI-mode identification |
| Score ring fill | #7F24FF | royal-purple | Primary AI accent |
| Score ring glow | #7F24FF at 8% | royal-purple | Subtle radial glow behind ring |
| Eyebrow text | #7F24FF | royal-purple | Section labels on this screen |
| Trend chart line | #7F24FF | royal-purple | Score history line |
| Trend chart fill | #7F24FF at 5% | royal-purple | Under-line area fill |
| Correlation strength bar | #7F24FF at 40-100% | royal-purple | Graduated by strength |
| Best Day factor checkboxes | #7F24FF | royal-purple | Matched factors |
| Best Day card gradient | #7F24FF at 4% | royal-purple | Extremely subtle top bleed |
| Time range chip (active) | #7F24FF | royal-purple | Selected range indicator |
| Knowledge graph link border | #7F24FF at 15% | royal-purple | Left accent |
| SIA dots (insights) | #7F24FF | royal-purple | 4pt indicators |
| Contradiction alert icon | #FF5E00 | brand-orange | Attention-drawing |
| "resolve" chip bg | #7F24FF at 15% | royal-purple | Action chip |
| "resolve" chip text | #7F24FF | royal-purple | Action chip label |
| "see all" links | #FF5E00 | brand-orange | Interactive links |
| "see full report" link | #FF5E00 | brand-orange | Interactive link |
| Trend arrow (up) | #34A853 | forest-green | Positive change |
| Trend arrow (down) | #FF5E00 | brand-orange | Negative change |
| Factor matched status | #34A853 | forest-green | "done" text |
| Factor unmatched status | #FF5E00 | brand-orange | Current value |
| Accuracy badge (high) | #34A853 at 15% bg, #34A853 text | forest-green | Reliable prediction |
| Accuracy badge (low) | #FF5E00 at 15% bg, #FF5E00 text | brand-orange | Learning prediction |
| Thumbs up (active) | #34A853 | forest-green | Positive feedback |
| Thumbs down (active) | #FF5E00 | brand-orange | Negative feedback |
| Best Day progress (low) | #FF5E00 | brand-orange | <33% matched |
| Best Day progress (mid) | #7F24FF at 70% | royal-purple | 33-66% matched |
| Best Day progress (high) | #34A853 | forest-green | 67%+ matched |
| Primary text | #FFFFFF | white | Titles, values, body |
| Secondary text | white at 70% | -- | Descriptions, expanded content |
| Tertiary text | white at 50% | -- | Captions, basis text |
| Quaternary text | white at 40% | -- | Timestamps, axis labels |
| Quinary text | white at 30% | -- | Updated timestamps, source tags |

**AI Mode Exception — documented in `_shared-patterns.md`**: This screen operates in "AI Mode" where royal-purple replaces orange as the dominant visual accent. This is the ONLY screen with this exception — justified because the Intelligence Dashboard is SIA's analytical command center, the AI's own space to show its work.

**Purple eyebrow rule on this screen**: Only AI-generated content sections use purple eyebrows (DAILY SCORE, CORRELATIONS, PREDICTIONS — 3 sections). Structural/navigational sections use standard white at 40% eyebrows (CONTRADICTIONS, SCORE TREND, YOUR BEST DAY, WEEKLY REPORT — 4 sections). This distinguishes "SIA computed this" from "this is how the screen is organized."

**60/30/10 within AI Mode**: Interactive actions (links, "see all", "see full report", contradiction alerts) remain orange. Green appears on positive states (trend up, matched factors, high accuracy). Purple identifies AI-generated content (score ring, chart lines, correlation strength bars, best-day checkboxes, prediction values). Domain colors appear only on weekly report domain score pills.

---

## Interaction States

### Daily Score Ring
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple ring fill, white score text | -- |
| Pressed | scale(0.97), glow intensifies to 12% | light impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |
| Loading | skeleton shimmer on ring and text | -- |

### Contradiction Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, alert icon, action chips | -- |
| Pressed | scale(0.98), background darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Dismissing | card slides left + opacity to 0, height collapses | light impact |

### "resolve" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Purple 15% bg, purple text | -- |
| Pressed | Purple 25% bg, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | inline spinner replaces text | -- |
| Success | brief green glow (600ms) | success notification |

### "dismiss" Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 bg, 1pt border, white at 50% text | -- |
| Pressed | bg darkens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Time Range Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (active) | Purple fill, white text | -- |
| Default (inactive) | ink-900 bg, white at 50% text | -- |
| Pressed | scale(0.95), bg brightens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Correlation Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal text, strength bar | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Best Day Factor Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Checkbox + text + status | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Thumbs Up/Down Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | white at 25% icon | -- |
| Pressed | scale(1.2), icon brightens to white 60% | light impact |
| Active (up) | green (#34A853), scale settled at 1.0 | -- |
| Active (down) | orange (#FF5E00), scale settled at 1.0 | -- |

### Weekly Report Header (Collapsible)
| State | Visual | Haptic |
|-------|--------|--------|
| Default (collapsed) | Chevron at 0deg, summary visible | -- |
| Pressed | Row bg white at 5% | light impact |
| Expanded | Chevron at 90deg, full content visible | -- |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Knowledge Graph Link Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800 card, purple left border, icon + text | -- |
| Pressed | scale(0.97), bg darkens | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Gesture Map
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh all intelligence data |
| Tap | Score ring | Expand detailed breakdown (inline) |
| Tap | Pillar sparkline | Navigate to domain dashboard (stack push) |
| Tap | "resolve" chip | Open resolution bottom sheet |
| Tap | "dismiss" chip | Dismiss contradiction (animate out) |
| Swipe left | Contradiction card | Dismiss contradiction |
| Tap | Time range chip | Switch chart range (7d/14d/30d) |
| Press-hold | Score trend chart | Scrub data points with tooltip |
| Tap | Correlation row | Navigate to SIA Chat [09] with context |
| Tap | Best Day factor row | Expand inline detail |
| Tap | Best Day card body | Navigate to SIA Chat [09] |
| Tap | Weekly report header | Expand/collapse section |
| Tap | "see full report" | Navigate to Weekly Report Detail (stack push) |
| Tap | Domain score pill | Navigate to domain dashboard (stack push) |
| Tap | Prediction card body | Navigate to SIA Chat [09] |
| Tap | Accuracy badge | Expand accuracy history inline |
| Tap | Thumbs up/down | Submit feedback + animate |
| Tap | Insight row text | Navigate to SIA Chat [09] with context |
| Tap | Knowledge Graph link | Navigate to Knowledge Graph (stack push) |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |
| Tap | Overflow menu | Open bottom sheet |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in, 80ms stagger per section | 280ms each | ease-out-soft |
| Header collapse | Scroll past 40pt | Large title collapse, center title fade-in | 280ms | ease-out-soft |
| Score ring arc | Enter viewport | Arc draws from 0 to target % | 520ms | ease-flow |
| Score value | Ring complete | Count-up from 0 to score | 520ms | ease-flow |
| Score glow | Ring complete | Purple glow fade-in 0% to 8% | 280ms | ease-out-soft |
| Pillar sparklines | Enter viewport | Lines draw left-to-right (stroke-dashoffset) | 520ms, 120ms stagger | ease-flow |
| Contradiction dismiss | Swipe left / tap dismiss | Card slides left + opacity to 0, height collapses to 0 | 280ms | ease-out-soft |
| Trend chart line | Enter viewport | Line draws left-to-right (stroke-dashoffset) | 520ms | ease-flow |
| Trend chart dots | Line reaches position | Scale-in from 0 to 1, staggered | 160ms each, 60ms stagger | ease-out-soft |
| Time range change | Tap chip | Chart crossfade (old fade out, new fade in) | 280ms | ease-out-soft |
| Correlation bars | Enter viewport | Width 0 to target %, staggered | 280ms each, 80ms stagger | ease-out-soft |
| Best Day checkboxes | Enter viewport | Scale-in from 0.8 to 1, staggered | 160ms each, 40ms stagger | ease-out-soft |
| Best Day progress bar | Enter viewport | Width 0 to percentage | 520ms | ease-flow |
| Best Day all-matched | All factors matched | Micro confetti (8-10 particles) from progress bar | 600ms | ease-flow |
| Weekly report expand | Tap header | Content height 0 to auto + fade-in | 280ms | ease-out-soft |
| Weekly report collapse | Tap header | Content height auto to 0 + fade-out | 280ms | ease-out-soft |
| Predicted score | Enter viewport | Count-up from 0 to value | 280ms | ease-out-soft |
| Thumbs feedback | Tap | Scale 1.0 to 1.3 to 1.0 + color transition | 160ms | ease-out-soft |
| Tooltip (chart scrub) | Press-hold | Fade-in + follows finger | 160ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard iOS stack push -- slides in from right (280ms, ease-out-soft)
- **Exit**: Stack pop -- slides out to right (280ms, ease-out-soft)

---

## Empty States

### Day 1 (new user)
- Intelligence Header: normal display
- Daily Score Hero Card: ring shows "--" with purple at 30% opacity fill. Text: "SIA is getting to know you. Your health intelligence score will appear in a few days." Sparklines hidden.
- Contradictions: hidden (no data)
- Score Trend: chart area shows: "Track your first week to see your score trend." Centered text, 15pt Regular, white at 50%.
- Correlations: card shows: "SIA is analyzing your patterns. Correlations appear after 1-2 weeks of data." 15pt Regular, white at 50%.
- Best Day Formula: card shows: "SIA is learning your patterns. Your best day formula will appear after 2-3 weeks of tracking." 15pt Regular, white at 50%.
- Weekly Report: "Your first weekly report will be generated on Sunday." 15pt Regular, white at 50%.
- Predictions: "SIA needs more data to make predictions. Keep tracking!" 15pt Regular, white at 50%.
- Recent Insights: hidden
- Knowledge Graph Link: visible (graph is always explorable, even if sparse)

### Established user (fully populated)
- All sections visible with real data
- Contradictions appear when detected, hidden when none
- Recent Insights shows 2-3 most recent with feedback state
- Weekly Report defaults to collapsed

### Returning after absence (gap in data)
- Score shows last available with "(last active May 10)" timestamp
- Trend chart shows gap in data line (line breaks, reconnects on return)
- SIA coaching note (if added to this screen): "Welcome back. Let's rebuild your streak."

---

## Motivation Adaptation

- **Low motivation**: Only Daily Score Hero Card (simplified -- ring + score only, no sparklines) and Best Day Formula (showing only top 3 factors instead of 5-6). All other sections hidden. The screen fits in one viewport. SIA's tone is gentle: "Here's what matters most today."
- **Medium motivation**: Default experience as described above. All sections visible. Score Trend defaults to 7d view. Weekly Report collapsed. Correlations show top 2-3.
- **High motivation**: All sections expanded by default. Weekly Report auto-expanded. Correlations show top 5 with detailed strength analysis. Additional "Deep Patterns" section appears between Correlations and Best Day, showing second-order correlations (e.g., "When you meditate AND sleep 7+ hours, your fitness score is 25% higher than meditation alone"). Score Trend defaults to 30d view. Prediction card shows historical accuracy trend (mini sparkline inside accuracy badge area).

---

## Typography

| Element | Font | Weight | Size | Line Height | Color |
|---------|------|--------|------|-------------|-------|
| Header title ("Intelligence") | Sora | Semibold (600) | 20pt | 28pt | white |
| AI eyebrow labels (DAILY SCORE, etc.) | Sora | Semibold (600) | 12pt | 16pt | purple #7F24FF |
| Structural eyebrow labels (CONTRADICTIONS, etc.) | Sora | Semibold (600) | 12pt | 16pt | white at 40% |
| Score value (center of ring) | Sora | Bold (700) | 36pt | 44pt | white |
| Score "/ 100" label | Sora | Regular (400) | 14pt | 20pt | white at 40% |
| Trend arrow text | Sora | Regular (400) | 13pt | 18pt | green #34A853 (up) / orange #FF5E00 (down) / white at 50% (flat) |
| Pillar sparkline label | Sora | Regular (400) | 11pt | 16pt | white at 50% |
| Pillar sparkline value | Sora | Semibold (600) | 13pt | 18pt | white |
| Timestamp ("updated 2 hours ago") | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Contradiction count badge | Sora | Semibold (600) | 12pt | 16pt | orange #FF5E00 |
| Contradiction description | Sora | Regular (400) | 15pt | 22pt | white at 85% |
| Contradiction source tags | Sora | Regular (400) | 11pt | 16pt | white at 40% |
| "resolve" chip text | Sora | Semibold (600) | 13pt | 18pt | purple #7F24FF |
| "dismiss" chip text | Sora | Semibold (600) | 13pt | 18pt | white at 50% |
| Time range chip labels | Sora | Semibold (600) | 13pt | 18pt | white (active) / white at 50% (inactive) |
| Chart axis labels | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Chart tooltip value | Sora | Semibold (600) | 13pt | 18pt | white |
| Correlation description | Sora | Regular (400) | 15pt | 22pt | white at 85% |
| Correlation strength label | Sora | Regular (400) | 12pt | 16pt | white (strong) / white at 70% (moderate) / white at 50% (weak) |
| "see all" links | Sora | Regular (400) | 13pt | 18pt | orange #FF5E00 |
| Best Day intro text | Sora | Semibold (600) | 16pt | 22pt | white |
| Best Day factor text | Sora | Regular (400) | 15pt | 22pt | white at 80% |
| Best Day status ("done" / value) | Sora | Semibold (600) | 12pt | 16pt | green #34A853 (done) / orange #FF5E00 (not done) |
| Best Day progress text | Sora | Semibold (600) | 14pt | 20pt | white |
| Weekly report title | Sora | Semibold (600) | 16pt | 22pt | white |
| Weekly report summary | Sora | Regular (400) | 15pt | 22pt | white at 70% |
| Weekly report domain pill value | Sora | Semibold (600) | 13pt | 18pt | domain color |
| Weekly report domain label | Sora | Regular (400) | 11pt | 16pt | white at 40% |
| "see full report" link | Sora | Semibold (600) | 13pt | 18pt | orange #FF5E00 |
| Predicted score value | Sora | Bold (700) | 32pt | 40pt | white |
| Prediction basis text | Sora | Regular (400) | 13pt | 18pt | white at 50% |
| Accuracy badge text | Sora | Semibold (600) | 12pt | 16pt | green #34A853 (high) / orange #FF5E00 (low) |
| Insight text | Sora | Regular (400) | 14pt | 20pt | white at 80% |
| Insight timestamp | Sora | Regular (400) | 11pt | 16pt | white at 30% |
| Knowledge graph link text | Sora | Semibold (600) | 15pt | 20pt | white |
| Empty/insufficient data messages | Sora | Regular (400) | 15pt | 22pt | white at 50% |

---

## Error Handling

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Score data fails to load | Hero card shows skeleton shimmer for 5s, then: "couldn't load your intelligence score" with retry button | Tap retry; pull-to-refresh also retries all sections |
| Contradictions API fails | Section hidden entirely (graceful degradation -- absence is not alarming) | Pull-to-refresh to reload |
| Score trend chart fails | Chart area shows: "couldn't load trend data" in 15pt Regular, white at 50%, centered | Tap chart area or pull-to-refresh to retry |
| Time range switch fails | Previous range data remains visible; toast: "couldn't update chart. try again." | Tap time range chip again to retry |
| Correlations fail to load | Card shows: "couldn't load correlations" with retry link | Tap retry link or pull-to-refresh |
| Best Day data fails to load | Card shows: "couldn't load your best day formula" in 15pt Regular, white at 50% | Pull-to-refresh to retry |
| Weekly report fails to load | Card shows: "couldn't load weekly report" with retry link | Tap retry or pull-to-refresh |
| Predictions fail to load | Card shows: "prediction unavailable right now" in 15pt Regular, white at 50% | Pull-to-refresh; prediction regenerates server-side |
| Insight feedback fails to submit | Thumb icon reverts to default (white at 25%); toast: "couldn't save feedback. try again." | Tap thumb icon again to retry |
| Contradiction dismiss fails | Card reappears with slide-right animation; toast: "couldn't dismiss. try again." | Swipe left or tap dismiss again |
| Contradiction resolve fails | Resolution bottom sheet shows inline error: "couldn't save. try again." | Tap "resolve" action in bottom sheet again |
| Knowledge graph navigation fails | Toast: "couldn't open knowledge graph. try again." | Tap card again to retry navigation |
| Pull-to-refresh fails | Spinner dismisses; toast: "couldn't refresh. check your connection." | Pull again or wait for connectivity |
| Offline state | Banner at top of scroll content: "you're offline -- showing cached data" (ink-brown-800 bg, white at 60% text) | Data refreshes automatically on reconnection |

---

## Accessibility

- Screen title "Intelligence" announced on focus via VoiceOver
- Daily Score Hero Card announces: "Daily health intelligence score: [N] out of 100. [Trend direction]: [change] from yesterday."
- Score ring is not interactive decoration until tapped; announces: "Score details. Double-tap to expand breakdown."
- Pillar sparklines announce: "[Pillar name], score [N], trending [up/down/flat]"
- Contradictions section announces: "Contradictions, [N] active"
- Each contradiction card announces: "[Description]. Sources: [source tags]. Actions: resolve, dismiss."
- "resolve" and "dismiss" chips are distinct button targets with minimum 44x44pt touch area
- Score trend chart announces summary: "Score trend over [7/14/30] days. Current: [N]. Average: [N]."
- Chart scrub tooltip is announced on press-hold position changes
- Correlation rows announce: "[Description]. Strength: [N]%, [strong/moderate/weak]."
- Thumbs up/down announce: "Rate this insight. Thumbs up / Thumbs down. [Current state if active]."
- Best Day factors announce: "[Factor text], [matched: done / not matched: current value]"
- Best Day progress announces: "Today: [N] of [N] factors matched, [percentage]%"
- Weekly report header announces: "Weekly report, week of [dates], [collapsed/expanded]. Double-tap to toggle."
- Prediction card announces: "Tomorrow's predicted score: approximately [N]. Based on [basis text]. [Accuracy]% accurate."
- Knowledge graph link announces: "Explore your health knowledge graph. Double-tap to open."
- All touch targets meet 44x44pt minimum
- Focus order: back button -> overflow menu -> hero card -> contradictions (if any) -> score trend -> correlations -> best day -> weekly report -> predictions -> insights -> knowledge graph link
- Gesture alternatives: swipe-right-from-edge replaces back button; chart scrub accessible via VoiceOver adjustable trait; swipe-left on contradiction available via VoiceOver custom actions

---

## Cross-References

- **Navigates to**: Screen [09] -- SIA Chat (via insight tap, correlation tap, best day tap, prediction tap; tab switch with context pre-loaded), Screen [14] -- Goal Detail (via sparkline tap if a goal is referenced; stack push), Screen [18] -- Explore Section (via back; stack pop), Domain Dashboards [26-36] (via pillar sparkline tap or weekly report domain pill; stack push), Screen [72] -- Knowledge Graph (via "Explore your health knowledge graph" link card; stack push), Weekly Report Detail (via "see full report"; stack push), Contradiction Resolution Bottom Sheet (via "resolve" chip; modal present)
- **Navigates from**: Screen [18] -- Explore Section (stack push), Screen [09] -- SIA Chat (deep-link when referencing an insight), Screen [12] -- Home Screen (via proactive insight card; stack push), Screen [16] -- Life Areas Overview (via "see insights" link; stack push)
- **Shared components with**: Screen [14] -- Goal Detail (Line Chart pattern for Score Trend, adapted with purple instead of orange), Screen [35] -- Learning Dashboard (Collapsible Section pattern for Weekly Report), Screen [36] -- Creativity Dashboard (SIA Coaching Note Card pattern adapted for insights), Screen [38] -- Habits (Streak/Heatmap data visualization concepts)
- **Patterns used**: Back Button, 8-State Interaction Model, Stack Navigation, Content Entry Animation (staggered fade-in), Collapsing Header Variant (from Screen 35), Expandable/Collapsible Section (from Screen 14), Section Eyebrow Label, Pull-to-Refresh
- **Patterns established**: Intelligence Score Ring (large circular progress with center value, purple fill, radial glow -- unique to intelligence), Contradiction Alert Card (alert icon + description + resolve/dismiss action chips), Correlation Row (description + strength indicator bar + feedback buttons), Best Day Checklist (factor rows with real-time matched/unmatched status + progress bar), Prediction Display (large predicted value + accuracy badge + basis text), Insight Feedback Row (insight text + purple dot + inline thumbs up/down), Knowledge Graph Link Card (purple-accented navigation card to graph sub-screen)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/intelligence`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q31 breathing active sessions use a focused immersive mode without the tab bar.
- Q32 celebration route is a QA fixture; production requires event triggers.
- Q36 social V1 stays friends/private-first.
- Q37 accountability/competitions activation requires Plus and social consent.
- Q38 competitions support private/self-only challenges.
- Q40 paywall models IAP-adjacent states without live billing.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B14-F07 | major | trust-privacy | Add contradiction resolution and dismissal flows with source review, correction options, undo, and persisted state. |
| B14-F08 | major | information-architecture | Wire overflow settings/export/about, time-range state, all-correlations drill-down, and weekly report detail. |
| B14-F09 | major | accessibility | Expand controls to 44px hit areas and make insight feedback buttons operable with pressed/selected semantics. |

### Prototype Implications

- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

