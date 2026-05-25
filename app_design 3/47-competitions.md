# Screen Design: Competitions

**Screen**: 47 of 73
**File**: 47-competitions.md
**Register**: Social Mode (brand-orange #FF5E00)
**Primary action**: browse, join, and compete in health challenges
**Tab**: Explore tab or Social section
**Navigation**: Stack depth 2-3 from Explore or Social entry. Entry from Explore [18] grid card, SIA deep-link [09] ("a new competition matches your fitness goals"), Leaderboard [39] competitions teaser, Community [40] room-based challenge link, or push notification. Exit via back button to Explore. Competition Detail is a sub-screen pushed further onto the stack.

---

## Purpose

This screen is the competitive social layer — structured challenges where users compete against each other (or themselves) on health and wellness metrics over a defined time period. It answers "what can I compete in right now, and how am I doing?" Competitions can be AI-generated (personalized to the user's goals and domains) or admin-created (community-wide events). The scoring system uses the existing XP and habit-completion infrastructure, with anti-cheat policies enforced server-side. The philosophy remains "individual first, social as enhancement" — competitions are optional motivational accelerators, never requirements. The design emphasizes discovery (finding the right competition), participation (joining and tracking), and social energy (leaderboards, chat, live updates) while keeping the experience premium and mature. This screen requires Plus — competitions, leaderboards, and competition chat are social features gated behind the Plus tier.

---

## Information Architecture

**Hierarchy — Competition List** (what the user sees, in order of visual priority):
1. Screen header — "Competitions" title with back navigation
2. Hero banner — featured/active competition with countdown, participant count, prize
3. Filter chips — All, Active, Upcoming, Past, My Competitions
4. Invitation badges — pending invitations from friends (conditional)
5. AI-suggested competitions — personalized challenge recommendations
6. Competition cards list — browsable list of all competitions matching the active filter

**Hierarchy — Competition Detail** (pushed sub-screen):
1. Detail header — competition image/icon, name, back navigation
2. Competition info — description, rules, date range, participant count
3. Live leaderboard — top 10 + user's own position
4. Progress tracker — user's daily scores over the competition period
5. Competition chat — group discussion among participants
6. Join/Leave CTA — primary action

**User flow**:
- **Arrives from**: Explore [18] via "Competitions" card (stack push), SIA Chat [09] via deep-link, Leaderboard [39] via competitions teaser, Community [40] via room challenge link, push notification for invitations
- **Primary exit (Competition List)**: Back to Explore [18] (stack pop)
- **Primary exit (Competition Detail)**: Back to Competition List (stack pop)
- **Secondary exits**: User profile (bottom sheet from leaderboard row), SIA Chat [09] via AI suggestion tap (tab switch), Community [40] via chat deep-link

---

## Layout — Competition List View

**Scroll behavior**: FlatList (competition list can grow long, needs virtualized rendering)
**Tab bar visible**: Yes

### ASCII Wireframe — Competition List

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]    "Competitions"         │  <- Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  <- 16pt gap
│  ┌═════════════════════════════┐   │
│  ║  FEATURED                    ║   │  <- Hero Banner Card
│  ║  ┌──────┐                   ║   │     (--r-xl, 28pt)
│  ║  │ icon │  Step Challenge   ║   │     ink-brown-800 +
│  ║  └──────┘  May 25 - Jun 8  ║   │     orange gradient
│  ║                              ║   │     overlay at 8%
│  ║  234 participants            ║   │
│  ║  02d : 14h : 32m remaining  ║   │  <- Countdown timer
│  ║                              ║   │
│  ║  Prize: 500 XP + Gold Badge ║   │
│  ║  ┌──────────────────────┐   ║   │
│  ║  │     join now         │   ║   │  <- In-Card CTA
│  ║  └──────────────────────┘   ║   │
│  └═════════════════════════════┘   │
│                                     │  <- 16pt gap
│  [All][Active][Upcoming][Past][My] →│  <- Filter Chips
│                                     │     (horizontal scroll)
│                                     │  <- 16pt gap
│  ┌─────────────────────────────┐   │
│  │ 🔔 2 competition invitations│   │  <- Invitation Badge
│  │    from Sarah, Ahmed        │   │     (conditional)
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  SUGGESTED FOR YOU                  │  <- Eyebrow
│  ┌──────────┐ ┌──────────┐ ┌──  →│  <- AI Suggestions
│  │ 🎯 7-Day │ │ 🏋 Fit   │ │    │     horizontal scroll
│  │ Mindful  │ │ Feb      │ │    │
│  │ [AI]     │ │ [AI]     │ │    │
│  └──────────┘ └──────────┘ └──  │
│                                     │  <- 24pt gap
│  ALL COMPETITIONS                   │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │ Step Challenge              │   │  <- Competition Card
│  │ [Admin] May 25-Jun 8       │   │
│  │ 234 participants  #12      │   │     your rank (if joined)
│  │              [view details] │   │
│  ├─────────────────────────────┤   │
│  │ Meditation Marathon         │   │
│  │ [AI] Jun 1-Jun 14          │   │  <- Competition Card
│  │ 89 participants             │   │
│  │              [join]         │   │
│  ├─────────────────────────────┤   │
│  │ Nutrition Challenge         │   │
│  │ [Admin] May 10-May 24      │   │  <- Past competition
│  │ 156 participants  #5       │   │
│  │              [view results] │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Competition List (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Competitions" title

2. **Hero Banner Card** — ~200pt
   - Purpose: Spotlight the featured/active competition to drive engagement
   - Content: Competition icon, name, date range, participant count, countdown timer, prize, join CTA

3. **Filter Chip Row** — 36pt + 16pt margins = 68pt
   - Purpose: Filter competitions by status or membership
   - Content: All, Active, Upcoming, Past, My Competitions

4. **Invitation Badge Card** — ~56pt (conditional)
   - Purpose: Surface pending competition invitations from friends
   - Content: Invitation count, inviter names, tap to view

5. **AI Suggestions Section** — ~160pt
   - Purpose: Personalized competition recommendations based on user goals
   - Content: Horizontal scroll of suggestion cards

6. **Competition Cards List** — Remaining height (FlatList)
   - Purpose: Full browsable list of competitions
   - Content: Individual competition cards

---

## Layout — Competition Detail View (Pushed Sub-screen)

**Scroll behavior**: ScrollView (mixed content — info, leaderboard, chart, chat preview)
**Tab bar visible**: Yes

### ASCII Wireframe — Competition Detail

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]  "Step Challenge"  [...] │  <- Detail Header (56pt)
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ┌──────┐                   │   │  <- Competition Info Card
│  │  │ icon │  Step Challenge   │   │
│  │  └──────┘  [Admin]          │   │
│  │                              │   │
│  │  Walk 10,000 steps daily    │   │
│  │  for two weeks. Highest     │   │
│  │  consistency wins.          │   │
│  │                              │   │
│  │  May 25 - Jun 8             │   │
│  │  02d : 14h : 32m remaining  │   │
│  │  234 participants           │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  RULES                              │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  ▸ Complete 10,000 steps    │   │  <- Rules Section
│  │    daily to earn points     │   │     (expandable)
│  │  ▸ Bonus for streaks        │   │
│  │  ▸ Anti-cheat: verified     │   │
│  │    device data only         │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  LEADERBOARD                        │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  #1  [av] Sarah    1,840   │   │  <- Rank Row (gold)
│  │  #2  [av] Ahmed    1,720   │   │  <- Rank Row (silver)
│  │  #3  [av] Lisa     1,650   │   │  <- Rank Row (bronze)
│  │  #4  [av] Omar     1,540   │   │
│  │  #5  [av] Priya    1,490   │   │
│  │  ...                        │   │
│  │  #10 [av] Khalid   1,120   │   │
│  ├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┤   │
│  │  #12 [av] You      980     │   │  <- Your Position
│  │       ↑3 since yesterday   │   │     (orange border)
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  YOUR PROGRESS                      │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  Score: 980 pts             │   │  <- Progress Card
│  │  ┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐   │   │     Daily score bars
│  │  │▓││▓││▓││░││▓││▓││ │   │   │     (mini bar chart)
│  │  │▓││▓││▓││░││▓││▓││ │   │   │
│  │  M  T  W  T  F  S  S      │   │
│  │  Avg: 140 pts/day          │   │
│  └─────────────────────────────┘   │
│                                     │  <- 16pt gap
│  CHAT                               │  <- Eyebrow
│  ┌─────────────────────────────┐   │
│  │  [av] Sarah: Great run      │   │  <- Chat Preview
│  │  today everyone.            │   │     (last 2 messages)
│  │  [av] Ahmed: Almost caught  │   │
│  │  up to you.                 │   │
│  │  ┌──────────────────────┐   │   │
│  │  │   open chat          │   │   │  <- Open Chat CTA
│  │  └──────────────────────┘   │   │
│  └─────────────────────────────┘   │
│                                     │  <- 24pt gap
│  ┌─────────────────────────────┐   │
│  │       leave competition     │   │  <- Leave CTA
│  └─────────────────────────────┘   │     (destructive,
│                                     │      secondary style)
│  64pt bottom padding                │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  <- Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

---

## Components — Competition List View

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Competitions" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Hero Banner Card
- **Purpose**: Spotlight the most relevant active competition to maximize engagement. This is the emotional hook of the screen — the user should immediately see something worth joining.
- **Data source**: API — `GET /api/competitions` with featured flag or highest-participation active competition
- **Visual treatment**: ink-brown-800 glassmorphism card with subtle orange radial gradient overlay at 8% (centered on the icon area). 28pt radius (--r-xl). 20pt padding. 16pt horizontal margins. 1.5pt border, orange (#FF5E00) at 25% opacity.
- **Content layout**:
  - Top-left: "FEATURED" eyebrow label — 10pt Sora Semibold, uppercase, orange (#FF5E00), +0.12em tracking
  - Competition icon area (left): 56pt square container, ink-900 bg, 14pt radius (--r-md). Icon: 28pt, white at 80%. Icon type based on competition category (steps: shoe, meditation: lotus, nutrition: leaf, fitness: dumbbell, general: trophy).
  - Competition name (right of icon, 12pt gap): 18pt Sora Semibold, white, 2 lines max
  - Date range (below name, 4pt gap): 13pt Sora Regular, white at 50%. Format: "May 25 - Jun 8"
  - Participant count (below date, 4pt gap): 13pt Sora Regular, white at 50%. Person icon (12pt, white at 40%) + "234 participants"
  - Countdown timer (below participant count, 12pt gap): Countdown display — "02d : 14h : 32m" in 20pt Sora Bold, white, `tabular-nums`. "remaining" in 13pt Sora Regular, white at 40%, 4pt right of countdown. Timer updates every second.
  - Prize row (below countdown, 8pt gap): Trophy icon (14pt, gold #FFD700) + prize text ("500 XP + Gold Badge") in 13pt Sora Semibold, white at 70%
  - Join CTA (bottom, 16pt gap): Full card content width, 48pt height, orange (#FF5E00) fill, "join now" in 16pt Sora Semibold white, --r-pill. Becomes "view details" (secondary style — transparent, 1pt white at 20% border) if user has already joined.
- **Variants**: Active competition (countdown visible, join CTA), Upcoming competition (countdown shows "starts in 3d : 12h", CTA reads "remind me"), No featured (hidden — next section shifts up)
- **Gestures**: Tap card body navigates to Competition Detail (stack push), tap CTA to join/view
- **Size**: Full-width minus 32pt x ~200pt

### Filter Chip Row
- **Purpose**: Filter competition list by status or user membership
- **Data source**: View state (local), triggers API reload on change
- **Visual treatment**: Identical to Filter Chip / Filter Tab Row pattern from _shared-patterns.md. Horizontal ScrollView.
- **Content**:
  - Chips: "all" / "active" / "upcoming" / "past" / "my competitions"
  - Chip height: 36pt, --r-pill
  - Inactive: ink-brown-800 bg, 1pt white at 10% border, 13pt Sora Semibold white at 60%
  - Active: orange (#FF5E00) bg, white text
  - Gap: 8pt between chips, 16pt leading margin
  - "my competitions" chip: Shows count badge if user has active entries — "(3)" appended in same style
- **Variants**: All (default), Active, Upcoming, Past, My Competitions
- **Gestures**: Tap to switch filter, horizontal scroll
- **Size**: Full-width x 36pt (plus 16pt vertical margins)

### Invitation Badge Card
- **Purpose**: Surface pending competition invitations to drive social engagement
- **Data source**: API — `GET /api/competitions` invitation data or dedicated endpoint for pending invitations
- **Visual treatment**: ink-brown-800 glassmorphism card, 14pt radius (--r-md), 16pt padding, 16pt horizontal margins. Orange left border accent (3pt, #FF5E00 at 60%). Bell icon (16pt, orange) left-aligned.
- **Content**:
  - Icon: Bell with notification dot (16pt, orange)
  - Text: "2 competition invitations" in 15pt Sora Semibold, white. Below: "from Sarah, Ahmed" in 13pt Sora Regular, white at 50%, max 1 line, truncated.
  - Chevron: right-aligned, 14pt, white at 30%
- **Variants**: Single invitation ("Sarah invited you to Step Challenge"), Multiple ("2 competition invitations from Sarah, Ahmed"), None (card hidden)
- **Gestures**: Tap opens Invitation List (bottom sheet)
- **Size**: Full-width minus 32pt x ~56pt

### AI Suggestions Section
- **Purpose**: Personalized competition recommendations generated by SIA based on user's active goals, domains, and engagement patterns
- **Data source**: API — AI-generated competition suggestions (competition_type: 'ai_generated')
- **Visual treatment**: Follows the Suggested For You pattern from Explore [18].
- **Content**:
  - Eyebrow header: "SUGGESTED FOR YOU" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking, 16pt left margin
  - Horizontal ScrollView of suggestion cards (12pt gap, 16pt content insets):
    - Card width: 140pt, height: 110pt
    - Background: ink-brown-800 glassmorphism, 14pt radius (--r-md), 12pt padding
    - Top: Category emoji/icon (20pt) + "AI" badge — 10pt Sora Semibold, purple (#7F24FF) bg at 15%, purple text, --r-pill, 6pt horizontal / 2pt vertical padding. Positioned top-right.
    - Competition name: 14pt Sora Semibold, white, 2 lines max, 8pt below icon
    - Duration hint: "7 days" or "2 weeks" — 12pt Sora Regular, white at 40%, 4pt below name
    - Tap: Opens AI competition preview sheet (description, projected difficulty based on user data, "start challenge" CTA)
- **Variants**: AI-populated (2-5 cards), Hidden (if AI suggestions unavailable or all dismissed)
- **Gestures**: Horizontal scroll, tap card for preview
- **Size**: Full-width x ~160pt (eyebrow 20pt + 16pt gap + 110pt cards + 14pt bottom margin)

### Competition Card
- **Purpose**: Individual competition entry in the main list
- **Data source**: API — `GET /api/competitions` list with pagination
- **Visual treatment**: Rows within a continuous ink-brown-800 glassmorphism card. 14pt radius (--r-md) on outer card. Each row separated by 1pt white at 5%. 16pt horizontal margins on outer card.
- **Content per card** (~88pt tall, 16pt padding):
  - Top row:
    - Competition name: 16pt Sora Semibold, white, single line, truncated
    - Type badge (right-aligned): "AI" or "Admin" — 10pt Sora Semibold, uppercase. AI: purple (#7F24FF) bg at 15%, purple text. Admin: white at 10% bg, white at 60% text. Both --r-pill, 8pt horizontal / 3pt vertical padding.
  - Middle row (4pt below top):
    - Date range: 13pt Sora Regular, white at 50%. Format: "May 25 - Jun 8"
    - Status indicator (8pt right of date): Colored dot (6pt circle). Active: green (#34A853). Upcoming: orange (#FF5E00). Past: white at 30%. Ended: white at 20%.
  - Bottom row (8pt below middle):
    - Left: Person icon (12pt, white at 40%) + participant count ("234 participants") in 13pt Sora Regular, white at 40%
    - Center (conditional): If user joined — "Your rank: #12" in 13pt Sora Semibold, orange (#FF5E00)
    - Right: CTA text link — "join" (orange, 13pt Sora Semibold) for unjoin competitions, "view details" (white at 60%, 13pt Sora Regular) for joined, "view results" (white at 50%, 13pt Sora Regular) for past
- **Variants**:
  - Active + not joined: green status dot, "join" CTA
  - Active + joined: green status dot, rank displayed, "view details" CTA
  - Upcoming: orange status dot, "remind me" CTA
  - Past + participated: gray dot, rank displayed, "view results" CTA
  - Past + not participated: gray dot, "view results" CTA
- **Gestures**: Tap card body navigates to Competition Detail (stack push), tap CTA for quick action
- **Size**: Full-width minus 32pt x ~88pt per card

### Invitation List (Bottom Sheet)
- **Purpose**: View and respond to pending competition invitations
- **Data source**: API — competition_invitations table, status: pending
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Title: "invitations (2)" — 17pt Sora Semibold, white, left-aligned, 16pt padding
  - Invitation rows (80pt each):
    - Left: Inviter avatar (36pt circle)
    - Content: Inviter name (15pt Sora Semibold, white) + competition name (13pt Sora Regular, white at 60%) + date range (12pt Sora Regular, white at 40%)
    - Right: "accept" pill (orange bg, white text, 32pt height, --r-pill, 12pt horizontal padding) + "decline" text (13pt, white at 40%, 8pt right)
  - Divider: 1pt white at 5% between rows
- **Gestures**: Tap accept/decline, drag to dismiss sheet

### AI Competition Preview Sheet (Bottom Sheet)
- **Purpose**: Preview an AI-suggested competition before joining
- **Data source**: API — AI competition detail + user fitness projection
- **Visual treatment**: Bottom sheet, ~55% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Competition emoji/icon (40pt, centered)
  - Competition name: 18pt Sora Semibold, white, centered, 12pt below icon
  - Description: 14pt Sora Regular, white at 60%, centered, max 3 lines, 8pt below name
  - Duration: "7 days" — 14pt Sora Regular, white at 40%, centered
  - Difficulty indicator: 3 dots (8pt each, 6pt gap). Easy: 1 orange, 2 white at 15%. Medium: 2 orange, 1 white at 15%. Hard: 3 orange. Label below: "based on your current activity" in 12pt Sora Regular, white at 30%.
  - Purple dot (6pt, #7F24FF) + SIA note: "this aligns with your fitness goals" — 13pt Sora Regular, white at 70%, 16pt below difficulty
  - "start challenge" button: Full-width orange CTA (Brand CTA Button, 56pt, --r-pill)
  - "maybe later" link: 14pt, white at 50%, center-aligned, 12pt below CTA
- **Gestures**: Tap start to join, maybe later to dismiss, drag to dismiss

---

## Components — Competition Detail View

### Detail Header
- **Purpose**: Competition identification, navigation, overflow menu
- **Data source**: Competition data
- **Visual treatment**: ink-900 background, 56pt, FIXED (sticky on scroll, z-30, backdrop-blur on scroll)
- **Content**:
  - Left: Back chevron (44x44pt touch target)
  - Center: Competition name (16pt Sora Semibold, white, truncated)
  - Right: Overflow menu icon (three dots, 20pt, white at 60%, 44x44pt touch target). Opens action sheet: "share competition", "report issue", "mute notifications"
- **Gestures**: Tap back, tap overflow for action sheet
- **Size**: Full-width x 56pt

### Competition Info Card
- **Purpose**: Full competition details — the user's primary source of "what is this and why should I care?"
- **Data source**: API — `GET /api/competitions/:id`
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Competition icon: 56pt square container, ink-900 bg, 14pt radius, centered icon (28pt, white at 80%)
  - Name: 20pt Sora Semibold, white, left-aligned, 12pt right of icon
  - Type badge: Same spec as Competition Card type badge, below name
  - Description: 15pt Sora Regular, white at 70%, max 4 lines, 12pt below badge. Full text expandable via "read more" link (13pt, orange).
  - Date range: Calendar icon (14pt, white at 40%) + "May 25 - Jun 8" in 14pt Sora Regular, white at 60%. 12pt below description.
  - Countdown timer: Same spec as Hero Banner countdown. 20pt Sora Bold, white, `tabular-nums`. 8pt below date.
  - Participant count: Person icon (14pt, white at 40%) + "234 participants" in 14pt Sora Regular, white at 50%. 8pt below countdown.
- **Size**: Full-width minus 32pt x auto-height (~180pt)

### Rules Section
- **Purpose**: Competition rules and eligibility criteria
- **Data source**: API — competition.rules, competition.eligibility, competition.anti_cheat_policy
- **Visual treatment**: Expandable/Collapsible Section pattern. Default: expanded (first 3 rules visible). Chevron rotates on toggle.
- **Content**:
  - Eyebrow: "RULES" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Rule items: Bulleted list, 14pt Sora Regular, white at 70%. Bullet: orange dot (6pt). 8pt gap between items. 12pt left indent.
  - Anti-cheat note (last item): Shield icon (14pt, white at 40%) + "verified device data only" in 13pt Sora Regular, white at 40%. Italic.
  - Eligibility note (conditional): If competition has eligibility requirements — "Requires: [criteria]" in 13pt Sora Regular, orange at 80%.
- **Gestures**: Tap header to expand/collapse
- **Size**: Auto-height, ~120pt expanded

### Competition Leaderboard
- **Purpose**: Top 10 rankings + user's own position within this competition
- **Data source**: API — `GET /api/competitions/:id/leaderboard` + `GET /api/competitions/:id/my-ranking`
- **Visual treatment**: Follows the Leaderboard Rank Row pattern from Screen [39] with competition-specific adaptations.
- **Content**:
  - Eyebrow + "see all" link: "LEADERBOARD" (11pt Sora Semibold, white at 40%) + "see all" (13pt Sora Regular, orange, right-aligned)
  - Top 3 rows with podium accent colors:
    - #1: Gold (#FFD700) rank number, 17pt Sora Bold
    - #2: Silver (#C0C0C0) rank number
    - #3: Bronze (#CD7F32) rank number
  - Rows 4-10: Standard white rank number
  - Each row (56pt tall): Rank number (28pt wide area, 15pt Sora Bold) + Avatar (32pt circle, 8pt gap) + Name (14pt Sora Semibold, white, truncated) + Score (right-aligned, 14pt Sora Semibold, white, `tabular-nums`)
  - Separator: Dashed 1pt white at 8% line before user's position
  - User's own position row (64pt tall): Same layout as rank rows but with orange left border accent (3pt, #FF5E00). Rank change indicator below name: "up 3 since yesterday" in 12pt Sora Regular, green (#34A853) with up-arrow. "down 2" in orange (#FF5E00) with down-arrow. "same" in white at 40%.
  - Card container: ink-brown-800 glassmorphism, 14pt radius
- **Variants**: User in top 10 (own row highlighted in-place, no separator), User below top 10 (separator + pinned own row below), Not joined (leaderboard shown but no own position — "join to see your rank" text link in orange)
- **Gestures**: Tap "see all" pushes full leaderboard view, tap rank row opens limited user profile (bottom sheet, same as Screen 39 — includes overflow menu with report/block)

### Competitor Report/Block (from leaderboard profile or chat)
- **Purpose**: Allow users to report or block a competitor within the competition context
- **Trigger**: Tap the three-dot overflow menu icon (20pt, white at 60%, top-right, 44x44pt touch target) in the Limited User Profile bottom sheet opened from a competition leaderboard rank row or from the Competition Chat participant list.
- **Overflow menu content**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Right-aligned below the overflow icon.
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336.
- **Behavior**:
  - Tap "Report": Dismisses context menu and profile sheet, navigates to Report/Block flow [64] with competitor pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the profile sheet.
- **Block Confirmation** (inline, replaces bottom half of profile sheet content):
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg.
  - Tap "Block": Calls POST /api/users/:id/block, dismisses sheet. Blocked user is hidden from the competition leaderboard and their messages hidden in Competition Chat. Toast: "user blocked" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard profile sheet content (crossfade, 280ms).
- **Size**: Full-width minus 32pt x auto-height (~440pt for 10 rows + own position)

### Progress Tracker Card
- **Purpose**: Visualize the user's daily competition scores over the competition period
- **Data source**: API — user's daily scores from competition_entries
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Eyebrow: "YOUR PROGRESS" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Total score: "980 pts" in 20pt Sora Bold, white, left-aligned, 12pt below eyebrow
  - Mini bar chart: 7 vertical bars (one per day of the current week), evenly spaced across card width minus padding.
    - Bar width: 20pt, --r-sm (10pt) top corners
    - Bar max height: 64pt
    - Filled: orange (#FF5E00), height proportional to daily score
    - Empty/future: white at 8%
    - Today (if in progress): orange at 50% (partial fill)
    - Day label below: 12pt Sora Regular, white at 40% ("M", "T", "W", etc.)
  - Average: "avg: 140 pts/day" in 13pt Sora Regular, white at 50%, right-aligned below chart
  - For competitions longer than 7 days: horizontal scroll of 7-day chunks, dot pagination at bottom
- **Variants**: Active (bars filling, today highlighted), Completed (all bars filled, total score prominent), Not yet started ("starts in 3 days" centered text)
- **Gestures**: Tap bar to see daily detail tooltip (score + date, 280ms fade-in popup)
- **Size**: Full-width minus 32pt x ~180pt

### Chat Preview Card
- **Purpose**: Show recent competition chat activity and provide entry to the full chat
- **Data source**: API — `GET /api/competition-chat/:competitionId/chat` (last 2 messages)
- **Visual treatment**: ink-brown-800 glassmorphism card, 28pt radius (--r-xl), 24pt padding, 16pt horizontal margins.
- **Content**:
  - Eyebrow: "CHAT" — 12pt Sora Semibold, white at 40%, uppercase, +0.12em tracking
  - Last 2 messages: Simplified chat row — avatar (24pt circle) + sender name (12pt Sora Semibold, white at 50%) + message preview (13pt Sora Regular, white at 60%, 1 line max, truncated). 8pt gap between messages.
  - Unread indicator (conditional): Orange dot (6pt) right of "CHAT" eyebrow + unread count
  - "open chat" button: Full card content width, 40pt height, transparent bg, 1pt white at 15% border, "open chat" in 14pt Sora Semibold, white at 70%, --r-pill. Center-aligned.
- **Variants**: Messages present (show preview + button), No messages yet ("be the first to say something" in 13pt, white at 40%), Not joined ("join to access chat" in 13pt, orange)
- **Gestures**: Tap "open chat" pushes Competition Chat sub-screen (full chat view, identical to Room Interior from Screen 40 with competition branding), tap message preview also opens chat
- **Size**: Full-width minus 32pt x ~140pt

### Join CTA Button
- **Purpose**: Primary action to join the competition
- **Data source**: API — `POST /api/competitions/:id/join`
- **Visual treatment**: Brand CTA Button pattern. Full-width minus 32pt, 56pt height, orange (#FF5E00) fill, "join competition" in 17pt Sora Semibold white, --r-pill. Fixed at bottom of scroll content (not sticky — scrolls with content), 24pt above bottom padding.
- **Variants**:
  - Not joined: "join competition" — orange fill (primary CTA)
  - Already joined: Hidden (replaced by Leave CTA at bottom)
  - Competition full: "competition full" — disabled (40% opacity)
  - Not eligible: "not eligible" — disabled, tooltip explains eligibility requirement
  - Upcoming: "remind me" — secondary style (transparent bg, 1pt orange border, orange text)
- **Gestures**: Tap to join
- **Size**: Full-width minus 32pt x 56pt

### Leave CTA Button
- **Purpose**: Allow user to withdraw from a competition
- **Data source**: API — `POST /api/competitions/:id/leave`
- **Visual treatment**: Secondary destructive style. Full-width minus 32pt, 48pt height, transparent bg, 1pt border white at 15%, "leave competition" in 15pt Sora Regular, white at 50%, --r-pill. Positioned at very bottom of scroll content, 24pt above bottom padding.
- **Variants**: Active competition (visible when joined), Past competition (hidden), Pre-competition (visible, text: "withdraw")
- **Gestures**: Tap opens confirmation sheet ("are you sure? your progress will be lost." + "leave" red CTA + "stay" cancel)
- **Size**: Full-width minus 32pt x 48pt

### Leave Confirmation Sheet (Bottom Sheet)
- **Purpose**: Confirm competition withdrawal to prevent accidental exits
- **Visual treatment**: Bottom sheet, ~30% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Warning icon: 40pt, orange (#FF5E00), centered
  - Title: "leave competition?" in 18pt Sora Semibold, white, centered, 16pt below icon
  - Description: "your progress and ranking will be lost." in 14pt Sora Regular, white at 60%, centered
  - "leave" button: Full-width minus 32pt, 48pt, red (#F44336) fill, white text, --r-pill
  - "stay" link: 14pt, white at 50%, centered, 12pt below button
- **Gestures**: Tap leave to confirm, tap stay or drag to dismiss

---

## Typography Map

| Element | Size | Weight | Color | Notes |
|---------|------|--------|-------|-------|
| Screen title | 17pt | Semibold (600) | white | Nav bar center |
| Hero competition name | 18pt | Semibold (600) | white | Hero banner |
| Detail competition name | 20pt | Semibold (600) | white | Competition info card |
| Countdown timer | 20pt | Bold (700) | white | tabular-nums |
| Competition card name | 16pt | Semibold (600) | white | List card |
| Score display | 20pt | Bold (700) | white | Progress tracker |
| Leaderboard rank # | 15pt | Bold (700) | white / podium | Top 3 use gold/silver/bronze |
| Leaderboard name | 14pt | Semibold (600) | white | Rank rows |
| Leaderboard score | 14pt | Semibold (600) | white | tabular-nums, right-aligned |
| Body / description | 15pt | Regular (400) | white at 70% | Competition descriptions |
| Date range | 13pt | Regular (400) | white at 50% | Metadata |
| Participant count | 13pt | Regular (400) | white at 40% | Metadata |
| Eyebrow labels | 12pt | Semibold (600) | white at 40% | Uppercase, +0.12em tracking |
| Type badge text | 10pt | Semibold (600) | purple / white 60% | AI / Admin badges |
| Filter chip text | 13pt | Semibold (600) | white 60% / white | Inactive / active |
| CTA text | 16-17pt | Semibold (600) | white | Buttons |
| Chat preview text | 13pt | Regular (400) | white at 60% | Message previews |

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base (both views) |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Hero banner border | #FF5E00 at 25% | brand-orange | Featured competition accent |
| Hero banner gradient | #FF5E00 at 8% | brand-orange | Radial glow overlay |
| Filter chip (active) | #FF5E00 | brand-orange | Active filter |
| Join CTA bg | #FF5E00 | brand-orange | Primary action |
| "join" text link | #FF5E00 | brand-orange | Quick join on cards |
| Countdown timer text | #FFFFFF | white | High contrast |
| User rank text | #FF5E00 | brand-orange | "Your rank: #12" |
| User position border | #FF5E00 | brand-orange | 3pt left border accent |
| Invitation card border | #FF5E00 at 60% | brand-orange | 3pt left border |
| Bar chart fill | #FF5E00 | brand-orange | Daily score bars |
| Active status dot | #34A853 | forest-green | Active competition indicator |
| Rank change up | #34A853 | forest-green | Positive movement |
| Rank change down | #FF5E00 | brand-orange | Negative (stays brand, not red) |
| AI badge bg | #7F24FF at 15% | royal-purple | AI-generated indicator |
| AI badge text | #7F24FF | royal-purple | AI type label |
| SIA note dot | #7F24FF | royal-purple | AI suggestion attribution |
| Rank #1 | #FFD700 | gold | Podium accent |
| Rank #2 | #C0C0C0 | silver | Podium accent |
| Rank #3 | #CD7F32 | bronze | Podium accent |
| Prize trophy icon | #FFD700 | gold | Prize indicator |
| Upcoming status dot | #FF5E00 | brand-orange | Upcoming competition |
| Past status dot | white at 30% | — | Ended competition |
| Leave CTA text | white at 50% | — | De-emphasized destructive |
| Leave confirm button | #F44336 | error-red | Destructive confirmation |
| Chat unread dot | #FF5E00 | brand-orange | Notification |
| Primary text | #FFFFFF | white | Names, titles, scores |
| Secondary text | white at 70% | — | Descriptions |
| Tertiary text | white at 50% | — | Dates, metadata |
| Quaternary text | white at 40% | — | Participant counts, eyebrows |

**60/30/10 verification**: Orange dominates through hero banner border and gradient, join CTAs, filter chip active state, user rank display, own position border, bar chart fills, invitation border, countdown emphasis, rank change down indicator, and chat unread dot. Green appears only on active status dots and rank-up indicators. Purple is limited to AI-generated badges and SIA suggestion note — exactly 3 elements. Gold/silver/bronze are the approved podium exception on leaderboard rank numbers only. Domain colors do not appear on this screen (competitions are cross-domain social). Ratio holds.

---

## Interaction States

### Hero Banner Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange border at 25% | -- |
| Pressed | Border brightens to orange at 50%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer for name, countdown, participants | -- |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill, white text | medium impact |

### Competition Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer per card | -- |

### Invitation Badge Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, orange 60% left border | -- |
| Pressed | Border brightens to 80%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### AI Suggestion Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | ink-brown-800, standard layout | -- |
| Pressed | bg lightens, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Join CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, white text | -- |
| Pressed | Darker orange (#E05500), scale(0.97) | light impact |
| Disabled | 40% opacity, no touch | -- |
| Loading | White spinner replaces text | -- |
| Success | Green (#34A853) fill flash (600ms), text: "joined" | success notification |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Leave CTA Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent bg, white at 15% border, white at 50% text | -- |
| Pressed | Border brightens, text brightens to white at 70% | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Leaderboard Rank Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal content | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### "open chat" Button
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Transparent, 1pt white at 15% border | -- |
| Pressed | Border brightens to white at 30%, scale(0.97) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Bar Chart Bar (Progress Tracker)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange fill, proportional height | -- |
| Pressed | Bar brightens, tooltip appears above | light impact |
| Focus-visible | 2pt orange ring around bar | -- |

### Gesture Map — Competition List
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | FlatList | Pull-to-refresh (reload competitions) |
| Horizontal scroll | Filter chips | Browse filters |
| Horizontal scroll | AI suggestions | Browse suggestions |
| Tap | Hero banner body | Navigate to Competition Detail (stack push) |
| Tap | Hero join CTA | Join competition (API call) |
| Tap | Filter chip | Switch filter, reload list |
| Tap | Invitation badge | Open Invitation List sheet |
| Tap | AI suggestion card | Open AI Competition Preview sheet |
| Tap | Competition card body | Navigate to Competition Detail (stack push) |
| Tap | Competition card CTA | Quick join/view/remind (contextual) |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

### Gesture Map — Competition Detail
| Gesture | Target | Action |
|---------|--------|--------|
| Scroll | ScrollView | Scroll through detail content |
| Tap | Rules section header | Expand/collapse rules |
| Tap | "see all" leaderboard link | Push full leaderboard view |
| Tap | Leaderboard rank row | Open limited user profile (bottom sheet) |
| Tap | Progress tracker bar | Show daily detail tooltip |
| Tap | "open chat" button | Push Competition Chat sub-screen |
| Tap | Chat preview message | Push Competition Chat sub-screen |
| Tap | Join CTA | Join competition |
| Tap | Leave CTA | Open leave confirmation sheet |
| Tap | Overflow menu | Open action sheet |
| Tap | Back button | Pop to Competition List |
| Swipe right from edge | Screen | iOS back gesture |
| Pull down | ScrollView | Pull-to-refresh (reload competition data) |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Competition List content | Mount | Staggered fade-in: hero banner (0ms), filter chips (80ms), invitation badge (160ms), AI suggestions (240ms), first 3 competition cards (80ms stagger each starting at 320ms) | 280ms each | ease-out-soft |
| Hero countdown timer | Every second | Digit crossfade (old digit fades out + translateY -8, new digit fades in + translateY 8 to 0) | 160ms | ease-out-soft |
| Filter chip switch | Tap | Active indicator slides horizontally (orange fill transitions to new chip) | 280ms | ease-out-soft |
| Competition list | Filter change | Cards crossfade (old cards opacity 1 to 0 + translateY 0 to -8, new cards opacity 0 to 1 + translateY 8 to 0) | 280ms | ease-out-soft |
| AI suggestion cards | Enter viewport | Staggered slide-in from right, 60ms stagger | 280ms each | ease-out-soft |
| Join success | Join CTA tap | Button bg crossfades orange to green (600ms), text: "join" to "joined", confetti burst from button (8-12 particles, 520ms) | 600ms | ease-flow |
| Invitation badge | New invitation | Scale-in bounce (0 to 1.15 to 1) + orange glow pulse | 280ms | ease-out-soft |
| Competition Detail | Push from list | Standard iOS stack push (slide from right) | 280ms | ease-out-soft |
| Leaderboard rows | Mount | Staggered fade-in, 40ms per row, starting from #1 | 280ms each | ease-out-soft |
| Own position row | Mount | Fade-in + orange left border extends from 0 to full height | 520ms | ease-flow |
| Progress bar chart | Mount | Bars grow from 0 height to final height, staggered 60ms per bar | 280ms each | ease-flow |
| Chat preview | Mount | Fade-in + translateY(8 to 0) | 280ms | ease-out-soft |
| Leave confirmation sheet | Open | Bottom sheet slides up | 520ms | ease-out-soft |
| Tooltip (bar tap) | Bar tap | Fade-in + translateY(4 to 0), positioned above tapped bar | 280ms | ease-out-soft |
| Tooltip dismiss | Tap elsewhere / 3s | Fade-out | 160ms | ease-out-soft |

**Screen transition**:
- **Enter (Competition List)**: Standard stack push from Explore
- **Enter (Competition Detail)**: Stack push from Competition List
- **Exit**: Stack pop

---

## Empty States

### Day 1 — Competition List (new user, no competitions available)
- Hero banner: Hidden (no featured competition to show)
- Filter chips: Still visible but "my competitions" shows "(0)"
- AI suggestions: Extra prominent — takes up more vertical space. Header changes to "challenges for you." SIA generates 3 starter challenges based on onboarding data (e.g., "7-Day Hydration Challenge", "Morning Routine Streak"). These are immediate, self-compete challenges to introduce the mechanic.
- Competition cards: If no admin-created competitions exist yet — centered message: "no competitions yet. check back soon or try a suggested challenge above." Icon: outlined trophy (48pt, white at 15%). Below: "SIA will suggest competitions as the community grows" in 13pt Sora Regular, white at 30%.
- Invitation badge: Hidden

### Day 1 — Competition Detail (just joined, no progress)
- Leaderboard: Shows user at last position with 0 score. "just joined — start earning points." in 13pt, white at 40%, below own position row.
- Progress tracker: All bars at 0 height. Center text: "your scores will appear here as you compete." in 13pt, white at 40%.
- Chat: "be the first to say something." centered text, 15pt Sora Regular, white at 40%.

### Established user — No active competitions
- Hero banner: Shows next upcoming competition if available. Countdown reads "starts in 3d : 12h". CTA: "remind me."
- If no upcoming either: Hero area replaced with a motivational card — "no active competitions right now. check upcoming or try an AI challenge." Orange "browse suggestions" text link.
- Past tab: Shows completed competitions with results for browsing history.

### Established user — Empty filter result
- If a filter returns no results (e.g., "upcoming" with none): Centered text: "no [filter] competitions." in 15pt Sora Regular, white at 40%. Below: "try another filter or browse suggested challenges" in 13pt, white at 30%.

---

## Motivation Adaptation

- **Low motivation**: Competition list de-emphasizes ranking and comparison. Hero banner leads with the fun/social framing ("join 234 others") rather than competitive framing ("climb the leaderboard"). AI suggestions focus on short, achievable challenges (3-day, 7-day) with low commitment. Competition Detail hides leaderboard by default (collapsed, "tap to view rankings"). Progress tracker shows encouraging language: "great start — keep going" even at low scores. Chat is more prominent to lean on social support rather than competition pressure.

- **Medium motivation**: Standard experience as described. All sections visible. Leaderboard is expanded. AI suggests a mix of short and medium challenges. Competition cards show rank when joined. Standard competitive framing.

- **High motivation**: Additional stats appear: "you're in the top 10% of active competitors." Competition cards show more data: daily score trends as inline sparklines. AI suggestions include longer, more demanding challenges (30-day, multi-domain). Leaderboard shows extended stats per row: daily average, streak count. Progress tracker adds a trend line overlay (dotted orange) showing projected final rank. An "invite friends" FAB appears (orange pill, "invite friends", positioned above tab bar) to grow the competitive circle.

---

## Edge Cases

### Competition Ends
When a competition reaches its end date:
- **Countdown timer**: When the timer hits 00d : 00h : 00m, the countdown text crossfades to "ENDED" (15pt Sora Semibold, white at 50%, 280ms ease-out-soft).
- **Hero banner transition**: If the ended competition was featured, the hero banner dims to 70% opacity and the CTA changes from "view details" to "see final results" (secondary style).
- **Competition Detail — Final Results State**:
  - Competition Info Card: Date range text appends "· ended" in white at 40%. Countdown replaced by "competition complete" in 15pt Sora Semibold, white at 60%.
  - Leaderboard: Final rankings shown with "FINAL" badge (12pt Sora Semibold, uppercase, green #34A853, +0.12em tracking) next to the "LEADERBOARD" eyebrow.
  - User's final position: Orange-bordered row shows final rank + "final rank" label replacing the "since yesterday" change indicator.
  - If user placed top 3: A celebration overlay (Screen 42 pattern) appears on first view of the results. Trophy icon + "you placed #[N]!" + XP reward. This is a one-time trigger — subsequent visits show static results.
  - Chat preview: "competition has ended" notice above last messages. Chat remains readable but input is disabled — "this chat is now read-only" placeholder in input bar.
- **Competition List card**: Status dot changes from green to gray. CTA text changes to "view results". Card moves to "past" filter group.

### Tie for First Place
When two or more participants have identical final scores:
- **Leaderboard display**: Tied participants share the same rank number. Both show gold (#FFD700) for 1st, silver for 2nd, etc.
- **Format**: "#1 [tied]" — rank number in podium color + "(tied)" in 12pt Sora Regular, white at 40%, after the name.
- **Tiebreaker note**: Below the tied rows: "tied scores — ranked by earliest achievement" in 12pt Sora Regular, white at 30%, italic. Server-side tiebreaker: user who reached the score first ranks higher for display order, but both show the same rank number.

### Competition Cancelled by Admin
When an admin cancels an active competition:
- **Push notification**: "The competition '[name]' has been cancelled by the organizer."
- **Competition List**: Card shows a red "CANCELLED" badge (12pt Sora Semibold, #F44336, uppercase) replacing the status dot. Card dims to 60% opacity. CTA changes to "details" (white at 40%).
- **Competition Detail**: Info card shows "cancelled by organizer" banner (ink-brown-800, red left border 3pt, 56pt height). Description of cancellation reason if provided. "Your progress has been preserved but no prizes will be awarded." in 14pt Sora Regular, white at 50%.
- **XP impact**: Any XP earned during the competition is retained. No additional prizes awarded.
- **Chat**: "this competition was cancelled" notice. Chat remains read-only.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Competition list load fails | Skeleton shimmer for 3 seconds, then "could not load competitions — tap to retry" centered in list area | Tap retry re-fetches; pull-to-refresh also available |
| Join competition fails | "join now" CTA shows error state (red border flash, 280ms), "could not join — try again" toast (3s) | CTA re-enables; user can retry |
| Leave competition fails | "leave" CTA shows error state, "could not leave — try again" toast | CTA re-enables; user remains in competition |
| Leaderboard data load fails | Leaderboard section shows "could not load leaderboard" + "retry" link in orange | Tap retry re-fetches ranking data |
| Competition chat load fails | Chat preview shows "could not load messages" + "retry" link | Tap retry re-fetches; non-blocking to competition detail |
| Invitation accept/decline fails | Button shows error state, "could not process — try again" toast | Buttons re-enable; invitation preserved |
| AI competition suggestion load fails | AI suggestions section shows "could not load suggestions" placeholder in 15pt Regular, white at 40% | Auto-retries on next pull-to-refresh |
| Network offline | Cached competition data displayed with "offline — showing cached data" banner (48pt). Join/leave CTAs disabled with "available when online" toast on tap. Chat read-only. | Banner includes "tap to retry" on reconnect |
| Competition countdown timer drift | Timer auto-corrects on next API sync; brief crossfade to corrected value | No user action needed; server time is authoritative |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Hero banner card**: VoiceOver reads competition name, countdown, participant count, and prize: "Step Challenge, 2 days 14 hours remaining, 234 participants, prize 500 XP and Gold Badge."
- **Filter chips**: Toggle role with state: "Active filter, selected" / "Upcoming filter, not selected." Single-select behavior communicated.
- **Competition cards**: VoiceOver reads name, type badge, dates, participant count, and rank if joined: "Meditation Marathon, AI competition, June 1 to June 14, 89 participants, not joined."
- **Countdown timer**: VoiceOver reads as static text (does not announce per-second updates): "2 days, 14 hours, 32 minutes remaining." Updated on focus.
- **Leaderboard rows**: VoiceOver reads rank, name, and score: "Rank 1, Sarah, 2450 points."
- **Invitation badges**: Announced as alert: "2 competition invitations from Sarah and Ahmed. Double tap to view."
- **Competition type badges**: "AI" and "Admin" badges read with their labels, not just color.
- **Progress bar chart**: Summary announced: "Your progress over 7 days. Best day: Tuesday, 380 points."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Filter chips have 36pt visible height with 44pt touch targets.
- **Color contrast**: All text meets WCAG AA. Status dots paired with text labels (green = active, orange = upcoming, gray = past).
- **Reduced motion**: Countdown digits appear without crossfade. Mini confetti burst on join replaced with simple green glow. Chart bars appear without staggered draw.

---

## Cross-References

- **Navigates to**: Competition Detail (stack push from competition card), Competition Chat (stack push from detail, uses Room Interior pattern from Screen [40] with competition branding), Full Leaderboard (stack push from "see all", uses Leaderboard pattern from Screen [39]), User Profile Bottom Sheet (from leaderboard row — shows avatar, level, top domains, "message" and "invite" CTAs per _shared-patterns.md, with overflow menu for report/block), Report/Block [64] (via overflow menu "report" in competitor profile sheet, or via participant options → "report"), Invitation List (bottom sheet), AI Competition Preview (bottom sheet), Leave Confirmation (bottom sheet), Native Share Sheet (from overflow menu)
- **Navigates from**: Screen [18] -- Explore Section (stack push), Screen [09] -- SIA Chat (deep-link), Screen [39] -- Leaderboard (competitions teaser, stack push), Screen [40] -- Community (room challenge link, stack push), Push notification
- **Shared components with**: Screen [39] -- Leaderboard (Rank Row, Podium Colors, User Position Row with orange border, Limited User Profile sheet), Screen [40] -- Community (Chat Message Bubble pattern for Competition Chat, Message Input Bar), Screen [38] -- Habits (7-Day Calendar Dot Row concept adapted as bar chart), Screen [18] -- Explore (Suggested For You section pattern, Filter Chip Row), Screen [42] -- Celebration (join success uses mini confetti burst)
- **Patterns used**: Back Button, 8-State Model, Filter Chip / Filter Tab Row (_shared-patterns.md), Section Eyebrow Label, Brand CTA Button, In-Card CTA Button, Modal Presentation (bottom sheets), Expandable/Collapsible Section, Leaderboard Rank Row (Screen 39), Chat Message Bubble (Screen 40), Message Input Bar (Screen 40), Limited User Profile (Screen 39), Skeleton Loading States, Pull-to-Refresh
- **Patterns established**: Hero Banner Card (featured competition with countdown timer, participant count, prize, and inline join CTA), Competition Card (name + type badge + date + status dot + participant count + rank + contextual CTA), Competition Type Badge ("AI" purple / "Admin" neutral pill), Status Indicator Dot (green active, orange upcoming, gray past), Countdown Timer Display (DD:HH:MM with per-second digit crossfade), Progress Bar Chart (vertical daily score bars with proportional height, tooltip on tap), Chat Preview Card (last 2 messages + open chat CTA, within a non-chat screen), Invitation Badge Card (orange-bordered notification with accept/decline actions), AI Competition Preview Sheet (difficulty dots + SIA note + start CTA), Leave Confirmation Sheet (destructive action confirmation with red CTA), Mini Confetti Burst (8-12 particles from button origin on join success)
