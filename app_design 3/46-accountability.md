# Screen Design: Accountability Partners & Contracts

**Screen**: 46 of 73
**File**: 46-accountability.md
**Register**: Social Mode (brand-orange #FF5E00)
**Primary action**: manage accountability partners and commitment contracts
**Tab**: Me (pushed from Settings or Social section)
**Navigation**: Stack depth 2-3 from Me tab root (Me Main → Settings/Social → Accountability). Entry from Settings [21] "accountability" row, Community [40] "accountability" link, SIA deep-link [09] ("your accountability partner was notified"), or Home Screen [12] contract violation alert card. Exit via back button to Settings or Social section.

---

## Purpose

This screen is the commitment engine — it turns social connections into structured accountability through partners, contracts, and automated triggers. It answers "who is keeping me honest, and what have I committed to?" The philosophy extends "individual first, social as enhancement": accountability is opt-in, consent-controlled, and privacy-first. Partners only see what the user explicitly allows. Contracts formalize commitments with measurable conditions and optional penalties. Triggers automate notifications based on behavioral rules. AI (SIA) can intervene before notifying partners, offering a gentler first line of accountability. Every feature is gated behind a master consent system with full audit trails.

This screen has three tab views: **Partners**, **Contracts**, and **Triggers**, accessed via a segmented tab at the top. A master consent banner appears above the tabs if consent has not yet been configured. This screen requires Plus — accountability partners, contracts, and AI interventions are social features gated behind the Plus tier.

---

## Information Architecture

**Hierarchy — Partners Tab** (what the user sees, in order of visual priority):
1. Master consent banner (conditional) — configure before any accountability features work
2. Segmented tab — Partners | Contracts | Triggers
3. Contact list — partners with avatar, nickname, role, permissions
4. Groups section — expandable group cards with member lists
5. Emergency contacts — highlighted at bottom
6. Add Partner button — persistent CTA

**Hierarchy — Contracts Tab**:
1. Active contracts — cards with title, condition, penalty, progress
2. AI-suggested contracts section — SIA-generated recommendations
3. Contract states — draft, active, paused, cancelled filters
4. Create Contract FAB — always visible

**Hierarchy — Triggers Tab**:
1. Rule list — behavioral triggers with condition, action, target
2. AI intervene toggle per trigger
3. Trigger log / audit trail — recent executions
4. Create Trigger CTA

**User flow**:
- **Arrives from**: Settings [21] via "accountability" row (stack push), Community [40] via accountability link, SIA Chat [09] via deep-link, Home Screen [12] via contract violation alert
- **Primary exit**: Back to Settings [21] or Social section (stack pop)
- **Secondary exits**: SIA Chat [09] via trigger/contract detail (tab switch), Community [40] via partner profile link, Contract Detail (stack push), Trigger Detail (stack push), Consent Settings (modal)

---

## Layout — Partners Tab

**Scroll behavior**: ScrollView (partner lists are typically short, <30 items)
**Tab bar visible**: Yes

### ASCII Wireframe — Partners Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Accountability"       │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 12pt gap
│  ┌─────────────────────────────┐   │
│  │ ⚠ Set up your consent       │   │  ← Master Consent Banner
│  │   preferences to enable     │   │     (conditional, orange
│  │   accountability features   │   │      left border)
│  │             [configure →]   │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  [Partners][Contracts][Triggers]   │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  PARTNERS                           │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ [av] Sarah K.      coach   │   │  ← Contact Row 1
│  │  motivation · failure · SOS │   │     role badge + perms
│  ├─────────────────────────────┤   │
│  │ [av] Ahmed M.      buddy   │   │  ← Contact Row 2
│  │  motivation · failure       │   │
│  ├─────────────────────────────┤   │
│  │ [av] Lisa R.       mentor  │   │  ← Contact Row 3
│  │  motivation                 │   │
│  │  🚨 emergency contact       │   │     emergency badge
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  + add partner                     │  ← Add Partner Button
│                                     │  ← 24pt gap
│  GROUPS                             │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ ▼ Morning crew (3)          │   │  ← Expandable Group
│  │   [av] Sarah · [av] Ahmed  │   │     Card (expanded)
│  │   · [av] You               │   │
│  ├─────────────────────────────┤   │
│  │ ▶ Fitness pod (4)           │   │  ← Group Card
│  └─────────────────────────────┘   │     (collapsed)
│                                     │  ← 16pt gap
│  EMERGENCY CONTACTS                 │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ 🚨 Lisa R.     SOS after   │   │  ← Emergency Row
│  │    5 days inactive          │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Partners Tab (top to bottom)

1. **Screen Header** — 44pt
   - Purpose: Title and back navigation
   - Content: Back chevron + "Accountability" title

2. **Master Consent Banner** — ~80pt (conditional)
   - Purpose: Prompt user to configure consent before any features activate
   - Content: Warning icon + explanation text + "configure" CTA

3. **Segmented Tab** — 40pt
   - Purpose: Switch between Partners / Contracts / Triggers views
   - Content: Three segments with active state

4. **Contact List** — Variable
   - Purpose: Accountability partners with role badges and permission indicators
   - Content: Contact rows with avatar, nickname, role, permission chips

5. **Add Partner Button** — 48pt
   - Purpose: Add new accountability contact
   - Content: Plus icon + "add partner" text

6. **Groups Section** — Variable
   - Purpose: Grouped accountability pods
   - Content: Expandable group cards with member avatars

7. **Emergency Contacts Section** — Variable
   - Purpose: Highlight contacts designated for SOS alerts
   - Content: Emergency contact rows with SOS configuration

---

## Layout — Contracts Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — Contracts Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Accountability"       │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 12pt gap
│  [Partners][Contracts][Triggers]   │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  [all][active][paused][draft]      │  ← Filter Chip Row
│                                     │  ← 16pt gap
│  ACTIVE CONTRACTS                   │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ "Run 3x/week"              │   │  ← Contract Card 1
│  │  If <3 runs in 7 days       │   │     (active)
│  │  Penalty: $10 → charity     │   │
│  │  ▓▓▓▓▓▓▓▓▓░░  8/2 (S/V)  │   │     success/violation
│  │  Signed · ends Jun 15       │   │     progress bar
│  ├─────────────────────────────┤   │
│  │ "No sugar weekdays"        │   │  ← Contract Card 2
│  │  If sugar logged M-F        │   │     (active)
│  │  Penalty: 50 push-ups       │   │
│  │  ▓▓▓▓▓▓░░░░░  5/4 (S/V)  │   │
│  │  Signed · ends Jul 1        │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  SIA SUGGESTIONS                    │  ← Eyebrow (purple dot)
│  ┌─────────────────────────────┐   │
│  │ 💡 Based on your fitness    │   │  ← AI Suggestion Card
│  │  goals, SIA suggests:      │   │
│  │  "Complete 4 workouts/week" │   │
│  │  [review →]                 │   │
│  └─────────────────────────────┘   │
│                                     │  ← 24pt gap
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐    │
│  │ ⚠ VIOLATION                │    │  ← Violation Alert Card
│  │ "Run 3x/week" missed       │    │     (orange border)
│  │ May 19 · [dispute]         │    │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘    │
│                                     │
│                    ┌───────────────┐│
│                    │ + new contract││ ← FAB (orange pill)
│                    └───────────────┘│
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Contracts Tab (top to bottom)

1. **Screen Header** — 44pt
2. **Segmented Tab** — 40pt
3. **Filter Chip Row** — 36pt
   - Purpose: Filter contracts by status
   - Content: all / active / paused / draft / cancelled
4. **Active Contracts List** — Variable
   - Purpose: Cards showing commitment details and progress
   - Content: Contract cards with condition, penalty, progress bar
5. **AI Suggestion Section** — ~100pt
   - Purpose: SIA-recommended contracts based on goals and behavior
   - Content: Suggestion cards with "review" CTA
6. **Violation Alerts** — Variable (conditional)
   - Purpose: Surface recent violations needing attention
   - Content: Violation cards with dispute option
7. **Floating Action Button** — 48pt (fixed)
   - Purpose: Create a new contract
   - Content: Plus icon + "new contract"

---

## Layout — Triggers Tab

**Scroll behavior**: ScrollView
**Tab bar visible**: Yes

### ASCII Wireframe — Triggers Tab

```
┌─────────────────────────────────────┐
│         Status Bar (44pt)           │
├─────────────────────────────────────┤
│  ← [back]   "Accountability"       │  ← Screen Header (44pt)
├─────────────────────────────────────┤
│                                     │  ← 12pt gap
│  [Partners][Contracts][Triggers]   │  ← Segmented Tab (40pt)
│                                     │  ← 16pt gap
│  ACTIVE TRIGGERS                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ "Missed workouts"           │   │  ← Trigger Row 1
│  │  If <3 workouts in 7 days   │   │     condition line
│  │  → notify Sarah (coach)     │   │     action line
│  │  AI first: ON  ⏸ 24h cool  │   │     AI intervene toggle
│  ├─────────────────────────────┤   │
│  │ "Sleep streak broken"       │   │  ← Trigger Row 2
│  │  If sleep <6h for 3 days    │   │
│  │  → notify Morning crew      │   │     (group target)
│  │  AI first: OFF  ⏸ 12h cool │   │
│  ├─────────────────────────────┤   │
│  │ "Budget overspend"          │   │  ← Trigger Row 3
│  │  If spending >budget 2x     │   │
│  │  → notify Ahmed (buddy)     │   │
│  │  AI first: ON  ⏸ 48h cool  │   │
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  + create trigger                  │  ← Create Trigger Button
│                                     │  ← 24pt gap
│  RECENT ACTIVITY                    │  ← Eyebrow
│  ┌─────────────────────────────┐   │
│  │ May 20 · "Missed workouts"  │   │  ← Log Entry 1
│  │  SIA intervened first ✓     │   │     (AI caught it)
│  ├─────────────────────────────┤   │
│  │ May 18 · "Sleep streak"     │   │  ← Log Entry 2
│  │  Morning crew notified      │   │     (partner notified)
│  ├─────────────────────────────┤   │
│  │ May 15 · "Budget overspend" │   │  ← Log Entry 3
│  │  Suppressed (cooldown)      │   │     (cooldown active)
│  └─────────────────────────────┘   │
│                                     │  ← 16pt gap
│  view full audit log →             │  ← Link to full audit
│                                     │
├─────────────────────────────────────┤
│  Today  |  SIA  |  Goals  |  Me   │  ← Tab Bar
├─────────────────────────────────────┤
│         Home Indicator (34pt)       │
└─────────────────────────────────────┘
```

### Component Stack — Triggers Tab (top to bottom)

1. **Screen Header** — 44pt
2. **Segmented Tab** — 40pt
3. **Active Triggers List** — Variable
   - Purpose: Behavioral rules that automate accountability notifications
   - Content: Trigger rows with condition, action, target, AI toggle, cooldown
4. **Create Trigger Button** — 48pt
   - Purpose: Add a new trigger rule
   - Content: Plus icon + "create trigger" text
5. **Recent Activity Section** — Variable
   - Purpose: Audit log of recent trigger executions
   - Content: Log entries with date, trigger name, outcome
6. **Full Audit Link** — 44pt
   - Purpose: Navigate to complete audit trail
   - Content: "view full audit log" orange text link

---

## Components

### Screen Header
- **Purpose**: Title and navigation
- **Visual treatment**: ink-900 background, 44pt. Back chevron left + "Accountability" center (17pt Sora Semibold, white).
- **Size**: Full-width x 44pt

### Master Consent Banner
- **Purpose**: Prompt consent configuration before any accountability features activate. This is the privacy gateway — nothing works until the user explicitly opts in.
- **Data source**: API — GET /api/accountability/consent
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Orange (#FF5E00) left border accent (3pt). 16pt horizontal margins.
- **Content**:
  - Warning icon: 20pt, orange (#FF5E00), left-aligned
  - Title: "set up consent" — 16pt Sora Semibold, white, 8pt right of icon
  - Body: "configure what your partners can see before accountability features activate" — 14pt Sora Regular, white at 60%, 4pt below title
  - CTA: "configure" — 14pt Sora Semibold, orange, right-aligned with right chevron (12pt). 44x44pt touch target.
- **Visibility**: Shown only when consent is not yet configured (enabled = false). Dismissed permanently once consent is set.
- **Gestures**: Tap opens Consent Configuration modal
- **Size**: Full-width minus 32pt x ~80pt

### Segmented Tab
- **Purpose**: Switch between Partners / Contracts / Triggers views
- **Data source**: View state (local)
- **Visual treatment**: Identical to established Segmented Control pattern (Screen 38). 16pt horizontal margins.
- **Content**:
  - Container: Full-width minus 32pt, 40pt tall, ink-brown-800 bg, --r-pill
  - Three segments: "partners" / "contracts" / "triggers" (13pt Sora Semibold, sentence case)
  - Active: Burnt orange (#FF5E00) fill, white text, --r-pill
  - Inactive: Transparent, white at 60%
- **Variants**: Partners (default), Contracts, Triggers
- **Gestures**: Tap to switch tab, content crossfades below
- **Size**: Full-width minus 32pt x 40pt

### Contact Row
- **Purpose**: Individual accountability partner with role and permission summary
- **Data source**: API — GET /api/accountability/contacts
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (76pt tall):
  - Avatar (left): 40pt circle, --r-pill. Photo if available, else first initial on orange (#FF5E00) circle with white text.
  - Name (12pt right of avatar): 16pt Sora Semibold, white. Single line. Uses nickname if set, else display name.
  - Role badge (right of name, 8pt gap): Pill shape, 22pt height, --r-pill, 8pt horizontal padding. Role text in 11pt Sora Semibold. Colors per role:
    - "coach": orange (#FF5E00) at 15% bg, orange text
    - "buddy": white at 10% bg, white at 60% text
    - "mentor": #06B6D4 (learning-cyan) at 15% bg, cyan text
    - "family": #EC4899 (relationships-pink) at 15% bg, pink text
  - Permission chips (below name, left-aligned with name, 4pt below):
    - Horizontal row of mini permission indicators
    - "motivation" — 11pt Sora Regular, white at 40%. Green dot (6pt, #34A853) prefix if enabled.
    - "failure" — same treatment. Orange dot (6pt, #FF5E00) prefix if enabled.
    - "SOS" — same treatment. Red dot (6pt, #F44336) prefix if enabled.
    - 8pt gap between each indicator
  - Emergency badge (conditional, below permissions): "emergency contact" — 11pt Sora Semibold, #F44336, with red alert icon (12pt) prefix. Only shown if contact is designated as emergency.
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Active (standard), Inactive (40% opacity, "inactive" label), Emergency (red badge visible)
- **Gestures**: Tap opens Contact Detail sheet (permissions editor), swipe left reveals "remove" action (red)
- **Size**: Full-width minus 32pt x 76pt per row (88pt if emergency badge shown)

### Add Partner Button
- **Purpose**: Add a new accountability contact
- **Visual treatment**: Full-width minus 32pt, 48pt tall, ink-brown-800 bg, --r-md (14pt), 1pt white at 10% border (dashed).
- **Content**: Plus icon (16pt, orange) + "add partner" (15pt Sora Semibold, orange), center-aligned, 8pt gap between icon and text.
- **Gestures**: Tap opens Add Partner modal
- **States**:
  | State | Visual | Haptic |
  |-------|--------|--------|
  | Default | Dashed border, orange text | -- |
  | Pressed | bg white at 5%, scale(0.98) | light impact |
  | Focus-visible | 2pt orange ring, offset 2pt | -- |
- **Size**: Full-width minus 32pt x 48pt

### Group Card (Expandable)
- **Purpose**: Accountability group with member list
- **Data source**: API — GET /api/accountability/groups
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. Uses Expandable/Collapsible Section pattern (Screen 14).
- **Content**:
  - Header row (48pt):
    - Chevron: 14pt, white at 40%, rotates 0 to 90 degrees on expand
    - Group name: 15pt Sora Semibold, white, 8pt right of chevron
    - Member count: "(3)" — 13pt Sora Regular, white at 40%, 4pt right of name
  - Expanded content (below header):
    - Member avatar row: Overlapping 32pt circles with 8pt overlap. Max 5 visible, "+N" indicator for overflow.
    - Member names below avatars: 12pt Sora Regular, white at 50%
    - "manage" link: 13pt Sora Semibold, orange, right-aligned
  - Separator: 1pt white at 5% between group cards
- **Variants**: Expanded (member list visible), Collapsed (header only)
- **Gestures**: Tap header to expand/collapse (280ms ease-out-soft), tap "manage" to open Group Detail modal
- **Size**: Full-width minus 32pt x 48pt (collapsed) or ~120pt (expanded)

### Emergency Contact Row
- **Purpose**: Highlight contacts designated for SOS alerts with inactivity configuration
- **Data source**: API — GET /api/accountability/emergency-contacts
- **Visual treatment**: ink-brown-800 card, --r-md, 16pt padding. Red (#F44336) left border accent (3pt).
- **Content**:
  - Alert icon: 20pt, #F44336, left-aligned
  - Contact name: 15pt Sora Semibold, white, 8pt right of icon
  - SOS config: "SOS after 5 days inactive" — 13pt Sora Regular, white at 50%, below name
  - SOS message preview: 12pt Sora Regular, white at 40%, italic, truncated to 1 line
- **Gestures**: Tap opens emergency contact configuration sheet
- **Size**: Full-width minus 32pt x ~72pt

### Contract Card
- **Purpose**: Display an accountability contract with condition, penalty, and success/violation ratio
- **Data source**: API — GET /api/contracts
- **Visual treatment**: ink-brown-800 glassmorphism card, --r-xl (28pt), 24pt padding. 16pt horizontal margins.
- **Content**:
  - Title: Contract title in quotes — 16pt Sora Semibold, white. Single line.
  - Condition line: "If [condition description]" — 14pt Sora Regular, white at 60%, 4pt below title. E.g., "if <3 runs in 7 days"
  - Penalty line: "Penalty: [description]" — 13pt Sora Regular, white at 50%, 4pt below condition. E.g., "penalty: $10 to charity"
  - Progress bar (8pt below penalty):
    - Full-width (card content width), 8pt tall, --r-pill
    - Track: white at 8%
    - Fill: Green (#34A853) for success ratio, orange (#FF5E00) for violations from right
    - Dual-fill visual: green from left (successes), gap, orange from right (violations)
  - Stats line (4pt below bar): "8/2 (S/V)" — 12pt Sora Semibold, white at 50%. "S" count in green, "V" count in orange.
  - Status + date line (4pt below stats):
    - Status badge: pill shape, 20pt height, --r-pill
      - "signed": green (#34A853) at 15% bg, green text
      - "draft": white at 10% bg, white at 40% text
      - "paused": orange (#FF5E00) at 15% bg, orange text
      - "cancelled": #F44336 at 15% bg, red text
    - End date: "ends Jun 15" — 12pt Sora Regular, white at 40%, 8pt right of badge
  - Auto-renew indicator (conditional): circular arrow icon (12pt, white at 30%) right-aligned if auto_renew is true
- **Variants**: Active (standard), Paused (muted, 70% opacity, orange badge), Draft (dashed 1pt white at 10% border), Cancelled (60% opacity, red badge)
- **Gestures**: Tap opens Contract Detail (stack push)
- **Size**: Full-width minus 32pt x ~152pt

### Contract Filter Chip Row
- **Purpose**: Filter contracts by status
- **Data source**: View state (local)
- **Visual treatment**: Identical to Filter Chip / Filter Tab Row pattern (Screen 13). Horizontal scroll, 16pt leading margin.
- **Content**: "all" / "active" / "paused" / "draft" / "cancelled" chips
- **Variants**: One active at a time, "all" is default
- **Gestures**: Tap chip to filter
- **Size**: Full-width x 36pt

### AI Suggestion Card
- **Purpose**: SIA-recommended contracts based on user goals and behavioral patterns
- **Data source**: API — GET /api/contracts/suggestions
- **Visual treatment**: ink-brown-800 card, --r-xl (28pt), 24pt padding. Purple (#7F24FF) dot (6pt) left-aligned with first text line, indicating AI origin. Same layout as SIA Coaching Note Card — Compact Variant (Screen 26).
- **Content**:
  - Lightbulb icon: 16pt, orange, top-left (replacing purple dot for suggestion context)
  - Context line: "based on your fitness goals, SIA suggests:" — 14pt Sora Regular, white at 60%
  - Suggestion title: Contract suggestion in quotes — 15pt Sora Semibold, white, 4pt below context
  - "review" link: 13pt Sora Semibold, orange, right-aligned with right chevron. 44x44pt touch target.
- **Variants**: Single suggestion (compact), Multiple suggestions (stacked, 8pt gap)
- **Gestures**: Tap "review" opens pre-filled Create Contract modal
- **Size**: Full-width minus 32pt x ~96pt

### Violation Alert Card
- **Purpose**: Surface recent contract violations that need attention or dispute
- **Data source**: API — GET /api/contracts/:id/violations
- **Visual treatment**: ink-brown-800 card, --r-md, 16pt padding. Orange (#FF5E00) left border accent (3pt). 1pt orange at 20% border on all sides.
- **Content**:
  - Warning badge: "VIOLATION" — 12pt Sora Semibold, uppercase, orange, +0.12em tracking
  - Contract title: in quotes — 14pt Sora Semibold, white, 4pt below badge
  - Details: "missed condition — [date]" — 13pt Sora Regular, white at 50%
  - "dispute" link: 13pt Sora Semibold, orange, right-aligned. 44x44pt touch target.
- **Variants**: Pending (standard), Disputed (badge changes to "DISPUTED", white at 40%), Resolved (green badge "RESOLVED", card at 60% opacity)
- **Gestures**: Tap "dispute" opens Dispute modal, tap card body opens Contract Detail
- **Size**: Full-width minus 32pt x ~88pt

### Trigger Row
- **Purpose**: Individual accountability trigger rule with condition, action, and configuration
- **Data source**: API — GET /api/accountability/triggers
- **Visual treatment**: Rows within an ink-brown-800 glassmorphism card. 20pt radius on outer card. Each row separated by 1pt white at 5%.
- **Content per row** (~96pt tall):
  - Trigger name: 15pt Sora Semibold, white. Single line.
  - Condition line (4pt below name): "if [metric] [operator] [value] in [window]" — 13pt Sora Regular, white at 60%. E.g., "if <3 workouts in 7 days"
  - Action line (4pt below condition): Arrow icon (12pt, white at 40%) + "notify [target name] ([role])" — 13pt Sora Regular, white at 50%. If group target: group icon instead of arrow.
  - Bottom row (8pt below action):
    - AI toggle: "AI first:" label (11pt Sora Regular, white at 40%) + ON/OFF pill. ON: green (#34A853) at 15% bg, green text. OFF: white at 10% bg, white at 40% text.
    - Cooldown: pause icon (12pt, white at 30%) + "[N]h cool" — 11pt Sora Regular, white at 40%, 12pt right of toggle.
  - Padding: 12pt vertical, 16pt horizontal
- **Variants**: Active (standard), Disabled (40% opacity, "disabled" badge)
- **Gestures**: Tap opens Trigger Detail (stack push or modal), swipe left reveals "edit" / "delete" actions
- **Size**: Full-width minus 32pt x ~96pt per row

### Create Trigger Button
- **Purpose**: Add a new trigger rule
- **Visual treatment**: Same style as Add Partner Button — full-width minus 32pt, 48pt, dashed border, orange plus icon + "create trigger" text.
- **Gestures**: Tap opens Create Trigger modal
- **Size**: Full-width minus 32pt x 48pt

### Trigger Log Entry
- **Purpose**: Audit trail entry showing when a trigger fired and what happened
- **Data source**: API — GET /api/accountability/logs
- **Visual treatment**: Rows within an ink-brown-800 card. 20pt radius. Each row separated by 1pt white at 5%.
- **Content per row** (56pt tall):
  - Date: "May 20" — 13pt Sora Semibold, white at 40%, left-aligned, 40pt wide area
  - Trigger name: in quotes — 14pt Sora Regular, white, right of date area, 8pt gap
  - Outcome line (below trigger name):
    - "SIA intervened first" + green checkmark: AI handled it
    - "[Partner/group] notified": partner was alerted
    - "suppressed (cooldown)": cooldown period prevented notification
    - Text: 12pt Sora Regular, white at 50%
  - Outcome icon (right-aligned): Green checkmark (SIA intervened), orange bell (notified), gray pause (suppressed)
  - Padding: 8pt vertical, 16pt horizontal
- **Variants**: SIA intervened (green accent), Partner notified (orange accent), Suppressed (gray accent)
- **Gestures**: Tap opens log detail (lightweight bottom sheet with full details)
- **Size**: Full-width minus 32pt x 56pt per entry

### Floating Action Button (Contracts Tab)
- **Purpose**: Create a new contract
- **Visual treatment**: Identical FAB pattern from Screen 35. Label: "new contract".
- **Gestures**: Tap opens Create Contract modal
- **Size**: Auto-width (~155pt) x 48pt

### Consent Configuration Modal (Bottom Sheet)
- **Purpose**: Configure master consent preferences for accountability features
- **Visual treatment**: Bottom sheet, ~75% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "save")
  - Section: "master switch"
    - Toggle: "enable accountability" — Toggle Switch (Screen 15 pattern). When off, all accountability features are dormant.
  - Section: "notification permissions"
    - Toggle: "motivation reminders" — partners can send encouragement
    - Toggle: "failure alerts" — partners are notified when triggers fire
    - Toggle: "SOS alerts" — emergency contacts get inactivity alerts
  - Section: "SOS configuration"
    - "inactivity threshold" stepper: 3/5/7/14 days selector (pill buttons)
    - "SOS message" text area: 3-line input, placeholder "message sent to emergency contacts"
  - Section: "AI safety net"
    - Toggle: "AI intervene first" — SIA attempts motivational outreach before notifying partners
    - "global cooldown" stepper: 6/12/24/48h selector (pill buttons)
  - "revoke all consent" link: 14pt Sora Regular, #F44336, center-aligned, 44pt touch target. Below all sections.
  - "save" button: Full-width orange CTA (Brand CTA Button, 56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap save to update
- **Caution**: "revoke all consent" triggers confirmation dialog before executing POST /api/accountability/consent/revoke-all

### Add Partner Modal (Bottom Sheet)
- **Purpose**: Add a new accountability contact
- **Visual treatment**: Bottom sheet, ~55% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "add")
  - Search input: Text Input Field (52pt). Placeholder: "search by name or email"
  - Results list: Matching users from the platform (Person Row pattern, Screen 33)
  - Role selector: Four pill buttons — "coach" / "buddy" / "mentor" / "family". Default: buddy.
  - Nickname input (optional): Text Input Field (52pt). Placeholder: "nickname (optional)"
  - "add" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap add to save

### Create Contract Modal (Bottom Sheet)
- **Purpose**: Create a new accountability contract
- **Visual treatment**: Bottom sheet, ~85% screen height (near full-screen), ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "create")
  - Title input: Text Input Field (52pt). Placeholder: "contract title"
  - Description input: Multi-line text area (80pt). Placeholder: "what are you committing to?"
  - Condition section:
    - Metric selector: Dropdown — workouts, sleep, spending, meals, habits, custom
    - Operator: < / > / = pills
    - Value: Number stepper
    - Window: "in [N] days" stepper
  - Penalty section:
    - Type selector: "monetary" / "physical" / "social" / "none" pills
    - Amount/description input: contextual (dollar input for monetary, text for physical/social)
  - Duration section:
    - Start date picker, End date picker
    - Auto-renew toggle
    - Grace period: "24h" / "48h" / "72h" / "none" pills
  - Verification: "self-report" / "automatic" / "partner-verified" pills
  - "create" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap create to save (creates as draft)

### Create Trigger Modal (Bottom Sheet)
- **Purpose**: Create a new behavioral trigger rule
- **Visual treatment**: Bottom sheet, ~70% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - Handle + header ("cancel" / "create")
  - Trigger name input: Text Input Field (52pt). Placeholder: "trigger name"
  - Condition section (same as contract condition):
    - Metric selector, operator, value, window
  - Target section:
    - "notify" selector: Contact picker or Group picker (horizontal scroll of avatar chips, tap to select)
  - Message section:
    - Message type: "default" / "custom" pills
    - Custom message input (conditional): Multi-line text area (80pt). Placeholder: "message sent when trigger fires"
  - AI intervene toggle: Toggle Switch + label "let SIA try first"
  - Cooldown: "6h" / "12h" / "24h" / "48h" pills
  - "create" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap create to save

### Contact Detail Sheet (Bottom Sheet)
- **Purpose**: View and edit per-contact permissions and details
- **Visual treatment**: Bottom sheet, ~50% screen height, ink-900 bg, 20pt top corners, drag handle
- **Content**:
  - **Overflow menu** (top-right of sheet): Three-dot icon (20pt, white at 60%), 44x44pt touch target. Positioned 16pt from top edge, 16pt from right edge.
  - Avatar: 64pt, centered
  - Name: 20pt Sora Semibold, white, centered
  - Role badge: Below name, centered
  - Nickname editor: 14pt Sora Regular, white at 50%, tappable to edit inline
  - Permission toggles:
    - "motivation reminders" — Toggle Switch
    - "failure alerts" — Toggle Switch
    - "SOS alerts" — Toggle Switch
  - "remove partner" link: 14pt Sora Regular, #F44336, center-aligned
- **Gestures**: Drag to dismiss, toggles save immediately via PUT /api/accountability/contacts/:contactId, tap overflow menu for report/block context menu

### Partner Report/Block Context Menu (from Contact Detail overflow)
- **Purpose**: Allow users to report or block an accountability partner
- **Trigger**: Tap the three-dot overflow menu icon in the top-right of the Contact Detail Sheet
- **Visual treatment**: Context menu card, ink-900 bg, 14pt radius (--r-md), --shadow-3 elevation. Right-aligned below the overflow icon. 8pt vertical padding.
- **Content**:
  - "Report" row (48pt tall, 16pt horizontal padding): Flag icon (16pt, white at 60%) + "report" in 15pt Sora Regular, white at 80%. Full-width tap target.
  - Separator: 1pt white at 5%
  - "Block" row (48pt tall, 16pt horizontal padding): Block icon (16pt, #F44336) + "block" in 15pt Sora Regular, #F44336. Full-width tap target.
- **Behavior**:
  - Tap "Report": Dismisses context menu and Contact Detail sheet, navigates to Report/Block flow [64] with partner pre-filled as the subject.
  - Tap "Block": Dismisses context menu, shows inline Block Confirmation within the Contact Detail sheet (replaces sheet content below avatar/name).
- **Block Confirmation** (inline, replaces bottom half of Contact Detail sheet):
  - Warning text: "block [name]?" in 17pt Sora Semibold, white, centered
  - Explanation: "they won't be able to see you on leaderboards. the accountability partnership will be removed." in 14pt Sora Regular, white at 50%, centered, 8pt below warning
  - Button row (16pt below explanation, centered, 16pt gap):
    - "Block" button: 15pt Sora Semibold, #F44336 (error-red) text, 44pt height, 80pt min-width, transparent bg.
    - "Cancel" button: 15pt Sora Semibold, white at 50% text, 44pt height, 80pt min-width, transparent bg.
  - Tap "Block": Calls POST /api/users/:id/block, removes the accountability partnership (partner removed from contacts, active contracts referencing this partner are paused, triggers targeting this partner are disabled). Dismisses sheet. Toast: "user blocked — partnership removed" (top, 3s auto-dismiss).
  - Tap "Cancel": Returns to standard Contact Detail content (crossfade, 280ms).

### Dispute Modal (Bottom Sheet)
- **Purpose**: Dispute a contract violation
- **Visual treatment**: Bottom sheet, ~45% screen height, ink-900 bg, 20pt top corners
- **Content**:
  - Title: "dispute violation" — 17pt Sora Semibold, white
  - Violation summary: Contract name + date + condition
  - Reason input: Multi-line text area (120pt). Placeholder: "explain why this was not a violation"
  - "submit dispute" button: Full-width orange CTA (56pt, --r-pill)
- **Gestures**: Drag to dismiss, tap submit to post dispute via POST /api/contracts/violations/:vid/dispute

---

## Typography

| Element | Font | Weight | Size | Line Height | Color | Notes |
|---------|------|--------|------|-------------|-------|-------|
| Screen header title | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | "Accountability" |
| Section eyebrow | Sora | 600 (Semibold) | 12pt | 16pt | White at 40% | Uppercase, +0.12em tracking |
| Contact name | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF | Nickname or display name |
| Role badge text | Sora | 600 (Semibold) | 11pt | 14pt | Per-role color | Inside pill badge |
| Permission indicator | Sora | 400 (Regular) | 11pt | 14pt | White at 40% | "motivation", "failure", "SOS" |
| Contract title | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF | In quotes |
| Contract condition | Sora | 400 (Regular) | 14pt | 20pt | White at 60% | "If [condition]" |
| Contract penalty | Sora | 400 (Regular) | 13pt | 18pt | White at 50% | "Penalty: [desc]" |
| Contract stats | Sora | 600 (Semibold) | 12pt | 16pt | White at 50% | "8/2 (S/V)" |
| Status badge text | Sora | 600 (Semibold) | 11pt | 14pt | Per-status color | Inside pill badge |
| Trigger name | Sora | 600 (Semibold) | 15pt | 20pt | White #FFFFFF | Rule name |
| Trigger condition | Sora | 400 (Regular) | 13pt | 18pt | White at 60% | "if [condition]" |
| Trigger action | Sora | 400 (Regular) | 13pt | 18pt | White at 50% | "notify [target]" |
| AI toggle label | Sora | 400 (Regular) | 11pt | 14pt | White at 40% | "AI first: ON/OFF" |
| Log entry date | Sora | 600 (Semibold) | 13pt | 18pt | White at 40% | "May 20" |
| Log entry text | Sora | 400 (Regular) | 14pt | 20pt | White #FFFFFF | Trigger name |
| Log outcome | Sora | 400 (Regular) | 12pt | 16pt | White at 50% | "SIA intervened first" |
| Consent banner title | Sora | 600 (Semibold) | 16pt | 22pt | White #FFFFFF | "set up consent" |
| Consent banner body | Sora | 400 (Regular) | 14pt | 20pt | White at 60% | Explanation text |
| Violation badge | Sora | 600 (Semibold) | 11pt | 14pt | #FF5E00 | Uppercase, +0.12em tracking |
| Add button text | Sora | 600 (Semibold) | 15pt | 20pt | #FF5E00 | "add partner", "create trigger" |
| CTA link text | Sora | 600 (Semibold) | 13pt | 18pt | #FF5E00 | "review", "configure", "dispute" |
| Modal heading | Sora | 600 (Semibold) | 17pt | 22pt | White #FFFFFF | Modal titles |
| Input placeholder | Sora | 400 (Regular) | 16pt | 22pt | White at 40% | All input fields |
| Emergency badge | Sora | 600 (Semibold) | 11pt | 14pt | #F44336 | "emergency contact" |

---

## Composition & Visual Hierarchy

**Squint test**:
- The segmented tab at the top immediately orients the user to Partners / Contracts / Triggers
- On Partners tab: contact rows form a clear list pattern; role badges add color variety; the emergency section at the bottom stands out with its red accent
- On Contracts tab: contract cards are the dominant visual weight, each with a progress bar that draws the eye; the AI suggestion card with its purple dot / lightbulb signals SIA origin; violation alerts with orange border demand attention
- On Triggers tab: trigger rows form a structured rule list; the "AI first: ON" green pill breaks the monotone; the log section below provides a clear temporal narrative
- The master consent banner (when visible) is the highest-priority element with its warning icon and orange border — it must be addressed before anything else works

**Spacing breakdown (8pt grid)**:
- Screen header height: 44pt
- Header to consent banner: 12pt (--s-3)
- Consent banner to segmented tab: 16pt (--s-4)
- Segmented tab to content: 16pt (--s-4)
- Section eyebrow to card below: 12pt (--s-3)
- Between cards within section: 16pt (--s-4)
- Between sections: 24pt (--s-5)
- Card internal padding: 16pt
- Last content to tab bar: 24pt (--s-5)
- Tab bar: 56pt + 34pt safe area

**Z-layers**:
- z-0: ink-900 background
- z-10: Content cards (contact rows, contract cards, trigger rows, log entries)
- z-20: Consent banner (when visible, above content)
- z-30: Screen header (backdrop-blur on scroll), segmented tab (sticky if needed)
- z-40: FAB (Contracts tab), Tab bar
- z-50: Bottom sheets (consent modal, add partner, create contract, create trigger, contact detail, dispute)
- z-60: Confirmation dialogs (revoke consent, remove partner)

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Base (all three tabs) |
| Card surfaces | #211008 | ink-brown-800 | Glassmorphism |
| Segmented active | #FF5E00 | orange (primary) | Active tab fill |
| Consent banner border | #FF5E00 | orange (primary) | Left accent, 3pt |
| Add/create button text | #FF5E00 | orange (primary) | CTA text + icon |
| CTA links | #FF5E00 | orange (primary) | "review", "configure", "dispute" |
| FAB background | #FF5E00 | orange (primary) | Contracts tab CTA |
| Filter chip active | #FF5E00 | orange (primary) | Active contract filter |
| Violation badge | #FF5E00 | orange (primary) | "VIOLATION" text |
| Violation card border | #FF5E00 at 20% | orange (primary) | Alert border |
| Contract violation bar fill | #FF5E00 | orange (primary) | Violations from right |
| Paused status badge | #FF5E00 at 15% bg | orange (primary) | Paused contract |
| Role: coach | #FF5E00 at 15% bg | orange (primary) | Coach role badge |
| Contract success bar fill | #34A853 | green (secondary) | Successes from left |
| Signed status badge | #34A853 at 15% bg | green (secondary) | Active contract |
| AI first: ON pill | #34A853 at 15% bg | green (secondary) | AI intervene enabled |
| Permission enabled dot | #34A853 | green (secondary) | Green dot prefix |
| SIA intervened icon | #34A853 | green (secondary) | Checkmark in log |
| AI suggestion indicator | #7F24FF | purple (SIA) | Purple dot, 6pt |
| Emergency badge | #F44336 | error | Red alert text + icon |
| Emergency card border | #F44336 | error | Left accent, 3pt |
| Cancelled status badge | #F44336 at 15% bg | error | Cancelled contract |
| "remove" / "revoke" | #F44336 | error | Destructive actions |
| SOS permission dot | #F44336 | error | Red dot prefix |
| Failure permission dot | #FF5E00 | orange (primary) | Orange dot prefix |
| Role: buddy | white at 10% bg | -- | Neutral role badge |
| Role: mentor | #06B6D4 at 15% bg | learning-cyan | Mentor role badge |
| Role: family | #EC4899 at 15% bg | relationships-pink | Family role badge |
| Primary text | #FFFFFF | white | Names, titles |
| Secondary text | white at 60% | -- | Conditions, descriptions |
| Tertiary text | white at 50% | -- | Penalties, actions, outcomes |
| Quaternary text | white at 40% | -- | Eyebrows, dates, labels |

**60/30/10 verification**: Orange dominates on segmented control, filter chips, FAB, CTA links, consent banner, violation alerts, coach role, failure dots, add/create buttons. Green on contract success bars, signed status, AI intervene indicators, permission dots, SIA intervened log entries. Purple appears only on AI suggestion indicator (SIA origin) — max 1 element per tab. Red on emergency contacts, cancelled contracts, destructive actions only. Role colors (cyan, pink) are identification-only, never on actions. Ratio holds with orange as clear visual driver.

---

## Interaction States

### Contact Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal layout | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Swipe-left reveal | "remove" button slides in from right (red bg, white text) | light impact |

### Contract Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Standard layout | -- |
| Pressed | Card bg lightens, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Loading | Skeleton shimmer for title, condition, progress bar | -- |

### Trigger Row
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Normal layout | -- |
| Pressed | Row bg white at 5%, scale(0.99) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |
| Swipe-left reveal | "edit" (orange bg) + "delete" (red bg) buttons slide in | light impact |

### Segmented Tab
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | Transparent bg, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange fill slides in, white text | medium impact |

### Filter Chip
| State | Visual | Haptic |
|-------|--------|--------|
| Default (inactive) | ink-brown-800 bg, white 10% border, white 60% text | -- |
| Pressed | White 5% bg flash | light impact |
| Active | Orange bg, white text | medium impact |

### FAB (Contracts Tab)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange bg, --shadow-2 | -- |
| Pressed | Darker orange, scale(0.95), --shadow-1 | medium impact |
| Focus-visible | 2pt orange ring, offset 4pt | -- |

### Add/Create Button (Dashed Border)
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Dashed border, orange icon + text | -- |
| Pressed | bg white at 5%, scale(0.98) | light impact |
| Focus-visible | 2pt orange ring, offset 2pt | -- |

### Toggle Switch (Consent / AI Intervene)
| State | Visual | Haptic |
|-------|--------|--------|
| Off | white at 15% bg, white circle left | -- |
| On | orange bg, white circle right | light impact |
| Transition | Circle slides + bg crossfades | 160ms |

### Violation Alert Card
| State | Visual | Haptic |
|-------|--------|--------|
| Default | Orange border accent, standard layout | -- |
| Pressed | Border brightens to orange at 40%, scale(0.98) | light impact |
| Disputed | Badge changes to "DISPUTED", border fades to white at 10% | -- |

### Gesture Map — Partners Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload contacts, groups) |
| Tap | Contact row | Open Contact Detail sheet (includes "message" action — see User Profile Bottom Sheet in _shared-patterns.md) |
| Swipe left | Contact row | Reveal "remove" action |
| Tap | Add Partner button | Open Add Partner modal |
| Tap | Group card header | Expand/collapse group |
| Tap | "manage" link | Open Group Detail modal |
| Tap | Emergency contact row | Open emergency config sheet |
| Tap | Consent banner | Open Consent Configuration modal |
| Tap | Segmented tab | Switch to Contracts or Triggers |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

### Gesture Map — Contracts Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload contracts) |
| Tap | Filter chip | Filter contracts by status |
| Tap | Contract card | Open Contract Detail (stack push) |
| Tap | AI suggestion "review" | Open pre-filled Create Contract modal |
| Tap | Violation "dispute" | Open Dispute modal |
| Tap | FAB | Open Create Contract modal |
| Tap | Segmented tab | Switch tabs |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

### Gesture Map — Triggers Tab
| Gesture | Target | Action |
|---------|--------|--------|
| Pull down | ScrollView | Pull-to-refresh (reload triggers, logs) |
| Tap | Trigger row | Open Trigger Detail (stack push or modal) |
| Swipe left | Trigger row | Reveal "edit" / "delete" actions |
| Tap | Create Trigger button | Open Create Trigger modal |
| Tap | Log entry | Open log detail sheet |
| Tap | "view full audit log" | Open full audit trail (stack push) |
| Tap | Segmented tab | Switch tabs |
| Tap | Back button | Pop stack |
| Swipe right from edge | Screen | iOS back gesture |

---

## Motion

| Element | Trigger | Animation | Duration | Easing |
|---------|---------|-----------|----------|--------|
| Screen content | Mount | Staggered fade-in: consent banner (0ms), segmented tab (80ms), first section eyebrow (160ms), first 3 content rows (80ms stagger each starting at 240ms) | 280ms each | ease-out-soft |
| Segmented tab | Tap | Active indicator slides horizontally to new segment | 280ms | ease-out-soft |
| Tab content | Tab change | Content crossfade below segmented tab (old content opacity 1 to 0 + translateY 0 to -8, new content opacity 0 to 1 + translateY 8 to 0) | 280ms | ease-out-soft |
| Group card expand | Tap header | Content height 0 to auto + fade-in, chevron rotates 0 to 90 degrees | 280ms | ease-out-soft |
| Group card collapse | Tap header | Content height auto to 0 + fade-out, chevron rotates 90 to 0 degrees | 280ms | ease-out-soft |
| Contact added | Add confirmed | New row slides in from top (translateY -20 to 0, opacity 0 to 1) | 280ms | ease-out-soft |
| Contact removed | Swipe confirm | Row slides out to left + collapses height | 280ms | ease-out-soft |
| Contract card | Enter viewport | Staggered fade-in, 80ms stagger | 280ms each | ease-out-soft |
| Progress bar fill | Data load | Bar width animates from 0 to current ratio | 520ms | ease-flow |
| Violation alert | New violation | Card slides down from top of section (translateY -16 to 0, opacity 0 to 1) + orange border pulses once (opacity 20% to 50% to 20%) | 520ms | ease-flow |
| AI suggestion | Mount | Fade-in + lightbulb icon pulse (scale 1 to 1.2 to 1) | 520ms | ease-flow |
| Trigger toggle | AI first tap | Green pill fades in/out + toggle slides | 160ms | ease-out-soft |
| Log entry | New execution | Entry fades in at top of log list | 280ms | ease-out-soft |
| Consent banner | Dismissed | Collapses height (auto to 0) + fade-out | 280ms | ease-out-soft |
| Filter chip | Tap | Active chip crossfade (old fades out, new fades in with orange fill) | 160ms | ease-out-soft |
| FAB | Mount | scale(0.8 to 1) + opacity(0 to 1), 400ms delay | 280ms | ease-out-soft |
| Bottom sheets | Open | Sheet slides up from bottom + backdrop fades in | 520ms | ease-flow |
| Bottom sheets | Dismiss | Sheet slides down + backdrop fades out | 280ms | ease-out-soft |

**Screen transition**:
- **Enter**: Standard stack push from Settings or Social section
- **Exit**: Stack pop

---

## Empty States

### Day 1 — Partners Tab (no contacts)
- Consent banner: Prominent at top (if not configured).
- Contact list: Replaced with centered message. Icon: outlined people group (48pt, white at 15%), centered. Title: "no partners yet" — 17pt Sora Semibold, white. Body: "accountability is stronger with others. add a partner to get started." — 14pt Sora Regular, white at 50%, center-aligned, max 2 lines.
- Add Partner button: Extra visible below empty state message.
- Groups section: Hidden entirely until at least one contact exists.
- Emergency section: Hidden entirely.

### Day 1 — Contracts Tab (no contracts)
- Contract list: Centered empty state. Icon: outlined handshake (48pt, white at 15%). Title: "no contracts yet" — 17pt Sora Semibold, white. Body: "create a commitment to hold yourself accountable." — 14pt Sora Regular, white at 50%.
- AI suggestion section: Extra prominent — SIA generates starter suggestions based on active goals. "SIA has some ideas based on your goals" banner with orange accent.
- FAB: Extra visible. Pulsing orange glow on first visit (same pattern as Screen 40).

### Day 1 — Triggers Tab (no triggers)
- Trigger list: Centered empty state. Icon: outlined bell with lightning (48pt, white at 15%). Title: "no triggers yet" — 17pt Sora Semibold, white. Body: "set up rules to automatically notify your partners when you need accountability." — 14pt Sora Regular, white at 50%.
- Create Trigger button: Below empty state message.
- Log section: Hidden until at least one trigger exists.

### Established user — Contracts Tab (all completed or cancelled)
- Filtered view shows matching empty state: "no [status] contracts. create a new one or check another filter." with tappable filter chip suggestions.

### Consent not configured
- All three tabs show content in a dimmed state (30% opacity), non-interactive. The consent banner is the only interactive element. Body text below dimmed content: "configure consent to enable accountability features."

---

## Motivation Adaptation

- **Low motivation**: Partners tab emphasizes the "motivation reminders" permission — encouraging gentle support rather than failure alerts. Contract cards hide penalty details (show only title and progress). Trigger rules de-emphasize failure language. SIA suggestion cards use gentler framing: "a small commitment could help" instead of formal contract language. Fewer suggestions shown (max 1).
- **Medium motivation**: Standard experience as described. All features visible. SIA suggestions are present but not aggressive.
- **High motivation**: Additional analytics appear: contract success rate over time (sparkline on each card), trigger effectiveness stats ("SIA intervened 3x this month, partner notified 1x"), partner engagement scores (how often partners interact). More AI contract suggestions (up to 3). Historical audit log is expanded by default with filtering options. Comparative stats: "your accountability adherence is up 15% this month."

---

## Edge Cases

### Partner Declines Invitation
When an accountability partner declines an invitation sent by the user:
- **Notification**: Push notification: "[Partner name] declined your accountability invitation."
- **In-app**: If the user is on the Partners tab, the pending invitation row (if shown) transitions to a declined state: avatar dims to 50% opacity, "declined" badge (red at 15% bg, red text, --r-pill) replaces the role badge, row auto-collapses after 3 seconds.
- **SIA note**: SIA may surface a coaching note: "Sarah couldn't join right now. that's okay — accountability works when both sides are ready."
- **Recovery**: The row shows a "resend" orange text link (13pt Sora Semibold) for 24 hours, then the row is removed from the list entirely. The user can always re-invite via Add Partner.

### Partner Removes Themselves
When an existing accountability partner opts out:
- **Notification**: Push notification: "[Partner name] is no longer your accountability partner."
- **In-app update**: The contact row animates out (slide left + collapse height, 280ms ease-out-soft). If the partner was assigned to active contracts or triggers, those items show a warning badge: "partner removed — update needed" in amber (#F59E0B) at 80%.
- **Contract impact**: Contracts referencing the removed partner show "partner left" status note. Contracts remain active but verification mode switches to "self-report" automatically.
- **Trigger impact**: Triggers targeting the removed partner are paused automatically. A toast appears: "trigger '[name]' paused — partner no longer available."

### AI Intervention Before Partner Notification
When a trigger fires and "AI first" is enabled:
- **Step 1 — SIA intervenes**: SIA sends a proactive message to the user via SIA Chat [09]: "I noticed [trigger condition]. let's talk about it before I notify [partner name]." The message appears as a standard SIA proactive message (per Interrupt & Notification Layering rules).
- **Step 2 — User response window**: SIA waits 2 hours for user response. During this window, the trigger log shows: "SIA is reaching out first..." with a purple spinner (16pt, #7F24FF at 50%).
- **Step 3a — User responds**: If the user engages with SIA and resolves the concern, the trigger is marked "SIA intervened — resolved" in the log (green checkmark). Partner is not notified.
- **Step 3b — No response**: If 2 hours pass without user engagement, SIA proceeds with partner notification. Log entry: "SIA reached out, no response — [partner] notified." Orange bell icon in log.
- **Audit trail**: All AI intervention attempts are logged with timestamps, SIA's message content, and outcome. Visible in the full audit log.

---

## Error Handling

Error handling follows Network Error Banner, Timeout States, and Partial Failure Recovery patterns from `_shared-patterns.md`. Screen-specific scenarios:

| Scenario | Visual State | Recovery Action |
|----------|-------------|-----------------|
| Partner search fails | Search field shows "could not search — check your connection" below input, red border flash (280ms) | User can retry search; field preserves query text |
| Contract creation fails | Modal CTA shows error state, "could not create contract — try again" toast (3s) | CTA re-enables, all form data preserved in modal |
| Trigger creation fails | Modal CTA shows error state, "could not save trigger — try again" toast | CTA re-enables, form data preserved |
| Consent update fails | Toggle reverts to previous state with gentle snap animation, "could not update consent — try again" toast | User can re-toggle; previous state restored |
| Partner invitation fails | "invite" CTA shows error state (red border flash), "could not send invitation" toast | CTA re-enables, partner selection preserved |
| AI intervention request fails | Trigger log shows "SIA could not intervene" with orange warning icon | Fallback to direct partner notification per trigger rules |
| Contract violation dispute fails | Modal CTA shows error state, "could not submit dispute — try again" toast | CTA re-enables, reason text preserved |
| Network offline | All read sections show last cached data with "offline — showing cached data" banner (48pt). Create/edit actions disabled with "available when online" toast on tap. | Banner includes "tap to retry" on reconnect |
| Audit trail load fails | Audit section shows "could not load audit log" + "retry" link in orange | Tap retry re-fetches audit data |

---

## Accessibility

Accessibility follows global standards from `_shared-patterns.md`. Screen-specific notes:

- **Segmented control** (partners/contracts/triggers): Accessible as tab role with selected state: "Partners tab, selected, 1 of 3."
- **Contact rows**: VoiceOver announces partner name, role, and permission summary: "Sarah, accountability partner, can view habits and goals."
- **Toggle switches** (consent, AI intervene): Accessible switch role with state: "AI intervene first, on" / "AI intervene first, off." Accessibility hint explains function.
- **Contract cards**: VoiceOver reads contract title, condition summary, status, and penalty: "Gym 3x per week contract, signed, penalty: 50 XP."
- **Trigger rows**: VoiceOver reads trigger name, condition, action, and AI toggle state: "Missed workout trigger, notify partner, AI first enabled."
- **Emergency contact badge**: VoiceOver announces "Emergency contact" with SOS designation clearly stated.
- **Permission chips**: Each chip read with its state: "View habits, granted" / "View goals, not granted."
- **Master consent banner**: Announced as alert role with configure action: "Accountability requires your consent. Double tap to configure."
- **Touch targets**: All interactive elements meet 44x44pt minimum. Toggle switches have 44x44pt touch targets.
- **Color contrast**: All text meets WCAG AA. Role badge colors are paired with text labels (never color-only).
- **Reduced motion**: Card expansions appear without height animation. Trigger log entries appear without staggered entry. Toggle transitions are instant.

---

## Cross-References

- **Navigates to**: Contract Detail (stack push from contract card), Trigger Detail (stack push or modal from trigger row), SIA Chat [09] (tab switch from trigger/contract context), Community [40] (via partner profile link and via "message" action on partner row — creates/opens private room), Consent Configuration (modal from banner), Add Partner (modal from button), Create Contract (modal from FAB), Create Trigger (modal from button), Contact Detail (sheet from contact row — includes "message" button per User Profile Bottom Sheet pattern, and overflow menu with report/block), Dispute (modal from violation), Audit Trail (stack push from "view full audit log"), Screen [64] — Report/Block (via overflow menu "report" in Contact Detail sheet)
- **Navigates from**: Screen [21] — Settings (stack push via "accountability" row), Screen [40] — Community (via accountability link), Screen [09] — SIA Chat (deep-link), Screen [12] — Home Screen (via contract violation alert card)
- **Shared components with**: Screen [38] — Habits (Segmented Control, Toggle Switch), Screen [39] — Leaderboard (Filter Toggle pattern), Screen [33] — Relationships (Person Row pattern in partner search), Screen [40] — Community (avatar patterns, group member display), Screen [13] — Goals List (Filter Chip Row)
- **Patterns used**: Back Button, 8-State Model, Segmented Control (Screen 38), Filter Chip / Filter Tab Row (Screen 13), Toggle Switch (Screen 15), Expandable/Collapsible Section (Screen 14), FAB (Screen 35), Modal Presentation (Batch 1), Text Input Field (Batch 1), Brand CTA Button (Batch 1), Section Eyebrow Label (Screen 12), Person Row (Screen 33)
- **Patterns established**: Master Consent Banner (warning icon + orange border + configure CTA, privacy gateway), Contact Row (avatar + nickname + role badge + permission chips + emergency badge), Role Badge (pill with role-specific color), Permission Indicator (colored dot + label), Group Card (expandable with overlapping member avatars), Emergency Contact Row (red accent + SOS configuration), Contract Card (title + condition + penalty + dual-fill progress bar + status badge), Contract Status Badge (signed/draft/paused/cancelled pill), Violation Alert Card (orange border + dispute CTA), AI Suggestion Card (lightbulb + SIA-generated contract), Trigger Row (name + condition + action + AI toggle + cooldown), AI Intervene Toggle (green ON/OFF pill), Trigger Log Entry (date + name + outcome icon), Create Trigger Modal (condition builder + target picker + cooldown selector), Create Contract Modal (condition builder + penalty builder + duration + verification), Consent Configuration Modal (master switch + permission toggles + SOS config + cooldown), Dispute Modal (violation summary + reason input), Dashed Border Add Button (dashed outline + orange text CTA)
---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-14.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U07`
**Prototype route**: `/features/accountability`
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
| B14-F01 | critical | retention | Add real tab state plus consent, add-partner, group-management, contract, and trigger flows with loading/success/error states. |
| B14-F02 | major | trust-privacy | Gate partner actions and sensitive permission details behind consent setup with disabled/explanatory states until configured. |
| B14-F03 | major | accessibility | Render Back as a labeled 44x44 link/button and expand compact action hit areas. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

