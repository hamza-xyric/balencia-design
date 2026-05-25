# Balencia Screen Specifications Plan

## Context

Balencia has a finalized Design Direction v2 with ~43 screens across 10 categories. This plan takes each screen from high-level inventory to **content inventory** — what information is shown, what actions are available, and how screens connect. This is the blueprint for creating system design / rough sketches.

**Approach**: Priority order per Section 14 of Design Direction v2.

---

## Screen Count Changes (from Design Direction v2)

| Change | Screen | Reason |
|--------|--------|--------|
| **Add** | Forgot Password | Required for email auth. Every app with password login needs this. |
| **Merge** | Preferences → Settings | Having separate "Settings" and "Preferences" screens is unusual. Most apps combine them. Preferences becomes a section within Settings. |
| **Net** | **~43 screens** | Same count, slightly different composition. |

No other screens need to be added or removed — the existing inventory is solid.

---

## Priority 1: Pre-Auth & Onboarding (7 screens + 1 added)

### Screen 1: Splash Screen
- **Shows**: Balencia logo/wordmark, continuous stroke animation (orange line drawing itself), dark background (`ink-900`)
- **Actions**: None — auto-advances after < 2 seconds
- **Navigates to**: Motion Carousel (first launch) or Home (returning user with saved session)
- **States**: Single state only
- **SIA**: Not present

### Screen 2: Motion Carousel
- **Shows**: 3–5 motion graphic panels (real-time animation, NOT pre-recorded video)
  - Panel 1: "One life, not modules" — animated life domains connecting into a unified system
  - Panel 2: "Meet SIA" — AI coach visualization, warmth and intelligence
  - Panel 3: "Everything connects" — cross-domain correlation preview (spending ↔ stress ↔ sleep)
  - Panel 4: "Your life, gamified" — RPG elements: XP, levels, quests
  - (Optional Panel 5: Premium social proof or Balencia feel)
  - Pagination dots at bottom
  - Skip button (top right)
  - Next / Get Started button (bottom)
- **Actions**: Swipe between panels, tap Next, tap Skip
- **Navigates to**: Welcome / Sign Up
- **States**: Each panel is a state; auto-advances if user doesn't interact
- **SIA**: Not present yet — visual tease only
- **Notes**: Apple-reveal aesthetic. Dark, cinematic. 5–10 seconds total. Must feel premium.

### Screen 3: Welcome / Sign Up
- **Shows**:
  - Balencia logo/wordmark (top)
  - "Create your account" heading
  - Name input field
  - Email input field
  - Password input field (with visibility toggle)
  - "Sign up" primary CTA
  - Divider: "or continue with"
  - Social auth buttons: Google, Apple
  - "Already have an account? Sign in" link
  - "Try without an account" link → Guest Mode
  - Terms of service / privacy policy links (footer)
- **Actions**: Fill fields, tap Sign Up, tap social auth, navigate to Sign In, navigate to Guest Mode
- **Navigates to**: SIA Onboarding Conversation (success), Sign In, Guest Mode Preview
- **States**: Default, field validation errors, loading (during creation), social auth loading, account exists error

### Screen 4: Sign In
- **Shows**:
  - "Welcome back" heading
  - Email input
  - Password input (with visibility toggle)
  - "Sign in" primary CTA
  - "Forgot password?" link
  - Divider: "or continue with"
  - Social auth buttons: Google, Apple
  - "Don't have an account? Sign up" link
- **Actions**: Fill fields, sign in, social auth, forgot password, navigate to sign up
- **Navigates to**: Home (success), Forgot Password, Sign Up
- **States**: Default, validation errors, wrong credentials error, loading

### Screen 4B (NEW): Forgot Password
- **Shows**:
  - Back arrow (top left)
  - "Reset your password" heading
  - Instructional text: "Enter your email and we'll send you a reset link"
  - Email input field
  - "Send reset link" primary CTA
- **Actions**: Enter email, send reset link, go back
- **Navigates to**: Confirmation state (email sent message + "Back to sign in" link)
- **States**: Default, email sent confirmation, email not found error, loading

### Screen 5: Guest Mode Preview
- **Shows**:
  - Minimal onboarding: name input + 1–2 domain interest selections
  - Then: full app loaded with sample/demo data
  - Persistent banner or floating button: "Sign up to save your progress"
  - All screens browsable with pre-populated demo data (demo SIA conversations, demo goals, demo dashboards, demo insights)
- **Actions**: Browse entire app with demo data, sign up anytime
- **Navigates to**: Any app screen (demo data), Sign Up (when ready)
- **States**: Demo-populated versions of every screen
- **Notes**: Implementation effort significant — principle approved, details TBD

### Screen 6: SIA Onboarding Conversation
- **Shows**:
  - **Bottom half**: Chat interface
    - SIA messages (conversational, warm)
    - User text input + send button
    - AI suggestion chips (tappable quick responses)
  - **Top half**: Visual brainstorming area
    - Animated domain bubbles (Fitness, Nutrition, Career, etc.) — tappable
    - As user selects domains, goal examples float in
    - Pre-built goal demonstrations (tappable)
    - Visual area updates dynamically based on conversation
  - Subtle progress indicator (not a hard stepper)
- **Actions**: Type responses, tap suggestion chips, tap domain bubbles, tap goal examples, skip/adjust
- **Flow**:
  1. SIA greets + asks about life areas of interest → domain bubbles animate above
  2. User taps domains / types → SIA acknowledges
  3. SIA asks about primary life goals → visual examples appear for selected domains
  4. User describes goals (text or taps)
  5. SIA asks 2–3 follow-up questions per goal (moderate depth)
  6. Transition to plan summary
- **Navigates to**: Initial Plan Summary
- **States**: Each conversation stage shows different visual content
- **Data collected**: Name (from sign-up), life areas of interest, primary life goals — nothing else
- **NOT collected**: Age/gender, integrations, subscription, religion, obstacles

### Screen 7: Initial Plan Summary
- **Shows**:
  - "Here's your plan." heading
  - SIA's generated plan organized by domain:
    - For each goal:
      - Goal name with domain color tag
      - Decomposed daily/weekly actions (3–5 per goal)
      - Timeline preview (milestones)
      - Cross-domain connections ("This connects to your Fitness goal")
  - Overall starting point: Level 1, 0 XP (RPG framing)
  - "Start your journey" primary CTA (prominent)
  - "Customize" secondary text link
- **Actions**: Accept plan (start), customize/edit individual goals, reorder priorities
- **Navigates to**: Home Screen (day 1 begins)
- **States**: Plan generated (default), editing mode (inline edits)
- **SIA**: This is SIA's "pitch" — should feel exciting and achievable

---

## Priority 2: SIA — AI Coach (3 screens)

### Screen 8: SIA Chat
- **Shows**:
  - **Top bar**: "SIA" title, avatar indicator (small), voice mode toggle icon
  - **Chat area**:
    - SIA messages (left-aligned, subtle purple accent): text + rich inline content
    - User messages (right-aligned, subtle orange accent)
    - **Rich inline cards** (appear within conversation flow):
      - Charts (progress over time, correlations)
      - Goal progress rings
      - Meal plan cards
      - Financial summaries
      - Workout plan previews
      - "Connection Spotted" insight cards
    - Suggestion chips after SIA messages
    - All rich cards are tappable → navigate to relevant feature screens
  - **Bottom input area**:
    - Text input field
    - Mic button (right side): tap = in-chat voice, long-press = full-screen immersive
    - Send button (appears when text is entered)
  - **Proactive messages**: SIA initiates conversations — appears as new messages in the thread
- **Actions**:
  - Type and send messages
  - Tap mic → in-chat voice mode
  - Long-press mic → full-screen immersive voice
  - Tap suggestion chips
  - Tap rich cards → navigate to feature screens
  - Conversational logging: "I did 30 min yoga" → auto-logged to Fitness
  - Scroll chat history
  - Pull to load older messages
- **Navigates to**: Any feature screen via deep-link cards, Full-screen voice mode
- **States**: Empty (first use — SIA initiates with greeting), Active conversation, Loading (SIA thinking animation), Offline (connectivity required message)
- **SIA**: This IS SIA. The core product.

### Screen 9: SIA Voice Mode (In-Chat)
- **Shows**:
  - Same chat view, but keyboard is replaced by:
    - Waveform visualization bar
    - Active listening indicator (pulsing)
    - "Listening..." text label
    - Tap-to-stop button
  - Real-time transcription appears as a draft message bubble
- **Actions**: Speak, tap to stop/send, cancel (swipe down), switch back to keyboard
- **Navigates to**: Returns to text chat mode
- **States**: Listening (waveform active), Processing (transcription finalizing), Error (mic unavailable)

### Screen 10: SIA Voice Mode (Full-Screen Immersive)
- **Shows**:
  - Full-screen dark background with ambient motion
  - 3D animated SIA avatar (center, large):
    - Reactive expressions (happy, thoughtful, encouraging)
    - Speech sync (lip movement)
    - Ambient motion (subtle breathing, idle movement)
  - Waveform visualization (bottom area)
  - Current transcription text (bottom, minimal)
  - Close/minimize button (top corner)
  - Mute button
- **Actions**: Speak freely (conversational), close/minimize → back to chat, mute mic
- **Navigates to**: Back to SIA Chat (with conversation preserved)
- **States**: SIA Listening (avatar attentive, user waveform active), SIA Speaking (avatar animated, lip sync, SIA waveform), Processing (avatar thinking pose), Idle (ambient motion)
- **Notes**: 3D is the target. Polished 2D animated fallback if 3D is technically infeasible in React Native V1.

---

## Priority 3: Home / Today (1 screen)

### Screen 11: Home Screen
- **Shows** (top to bottom, in order):
  1. **Header**: Time-contextual greeting ("Good morning, [Name]"), today's date, RPG level badge (tappable)
  2. **SIA greeting card**: Conversational daily message from SIA
     - Example: "You crushed it yesterday. What's worth your attention today?"
     - Quick-response mood chips (optional tap, not required)
     - Tapping the card → navigates to SIA tab
  3. **Today's actions**: Cross-domain action cards (AI-curated priority order)
     - Each card: action description, domain color tag(s), estimated time, completion checkbox
     - Swipeable: right to complete, left to skip
     - Data density by motivation tier:
       - Low: 1–2 actions only
       - Medium: 4–6 cards
       - High: full list with details
  4. **Active goals progress**: Horizontal scrolling progress rings
     - Each ring: goal name, percentage, domain color, next action preview
     - Tappable → Goal Detail
  5. **Schedule preview**: Next 2–3 upcoming events/tasks
     - Time, event name, domain tag
     - Tappable → Calendar or relevant feature screen
  6. **Proactive insight cards** (appear periodically, not always present):
     - "Connection Spotted" cards from SIA's correlation engine
     - Example: "Your sleep quality drops 30% on days you skip exercise."
     - Tappable → SIA explains the insight
  7. **Activity feed** (bottom): Recent completions, XP earned, streak updates
- **Actions**:
  - Tap SIA greeting → SIA tab
  - Complete/skip action cards (swipe or tap)
  - Tap goal rings → Goal Detail
  - Tap schedule items → Calendar or relevant screen
  - Tap insight cards → SIA conversation
  - Tap RPG badge → RPG Character Screen
  - Pull to refresh
- **Navigates to**: SIA tab, Goal Detail, Calendar, any domain dashboard, RPG Character
- **States**:
  - Day 1 (minimal real data — SIA-guided getting started content, never feels empty)
  - Active user (full data)
  - All done (celebratory empty state — "Nothing left today. Rest or explore?")
  - Low / Medium / High motivation (different data density)

---

## Priority 4: Goals & Life Areas (4 screens)

### Screen 12: Goals List
- **Shows**:
  - "Your missions" heading (RPG quest framing)
  - Filter tabs: All | Active | Completed | by Domain
  - Goal cards (scrollable list):
    1. Progress ring/bar (primary visual, prominent)
    2. Goal name (quest title)
    3. Connected domain color icons (multi-domain tags — the differentiator)
    4. Next action due + time (tappable to complete)
    5. AI coaching note ("Strong momentum this week." / "2 days behind, want to adjust?")
    6. XP earned / streak badge
  - Floating "+" button → Create Goal
  - Life Areas Overview link (small radar chart preview at top or bottom)
- **Actions**:
  - Tap goal card → Goal Detail
  - Tap next action on card → complete/skip inline
  - Tap "+" → Create/Edit Goal
  - Filter/sort goals
  - Tap life areas preview → Life Areas Overview
  - Long-press goal → quick actions menu (pause, archive, edit)
- **Navigates to**: Goal Detail, Create Goal, Life Areas Overview
- **States**: Populated, empty (SIA suggests starter goals), filtered view, search results

### Screen 13: Goal Detail
- **Shows**:
  - **Header**: Goal name with domain color tag(s), quest icon
  - **Progress visualization**: Large progress ring or bar with percentage
  - **Summary view** (default, expandable):
    - "7 actions across 3 life areas" — tap to expand
    - Current streak + XP earned
    - SIA's coaching note for this goal
    - Next action card (prominent, completable)
  - **Full detail view** (tap to expand from summary):
    - All decomposed actions with completion status (checklist)
    - Domain tags on each action
    - Milestones with target dates and completion status
    - SIA's reasoning ("Why this action matters")
    - Cross-domain connections ("This connects to your Finance goal because...")
    - Progress chart over time (line chart, orange solid = past, purple dashed = projected)
    - Related Wiki content (if any)
  - **Edit button** (top right)
  - **"Ask SIA about this goal"** shortcut → SIA with goal context
- **Actions**:
  - Complete individual actions (tap checkbox)
  - Expand/collapse detail sections
  - Edit goal → Create/Edit Goal screen
  - Ask SIA → SIA tab (pre-populated context)
  - View progress history chart
  - Pause / archive goal (menu)
- **Navigates to**: Create/Edit Goal, SIA (contextual), domain dashboards via tags
- **States**: Summary (medium motivation), full detail (high motivation), minimal (low motivation — just next action)

### Screen 14: Create / Edit Goal
- **Shows**:
  - **Input area**: Large natural language text field ("What do you want to achieve?")
    - Placeholder examples: "Save $5,000 by December" / "Run a half marathon" / "Read 20 books this year"
  - **SIA processing** (after user types and submits):
    - Loading animation while SIA structures the goal
    - Result shows:
      - Auto-detected domain assignment (editable chip)
      - Generated action items (editable list, 3–7 items)
      - Suggested tracking signals
      - Milestone suggestions with dates
      - Cross-domain connections preview
  - **Strictness toggle**: "How strict should SIA be about this goal?" (lenient / balanced / strict)
  - **RPG quest preview**: How this will appear as a mission
  - "Create mission" primary CTA
  - Cancel / back
- **Actions**: Type goal, submit to SIA, edit SIA's suggestions, change domain, adjust actions/milestones, set strictness, create/save, cancel
- **Navigates to**: Goals List (after creation), Goal Detail (after edit)
- **States**: Input (empty), SIA processing (loading), Structured result (review/edit), Edit mode (existing goal)

### Screen 15: Life Areas Overview
- **Shows**:
  - **Life wheel / radar chart** (center, large):
    - All active domains plotted on axes
    - Domain colors on each axis
    - Current progress fill per domain
    - Tappable axes → domain dashboard
  - **Domain list** (below chart):
    - Each row: domain color icon, domain name, progress bar, active goal count
    - Tappable → domain dashboard
  - **SIA insight**: Overall life balance note ("Your fitness and nutrition are thriving. Career could use attention.")
  - **Time range selector**: Week | Month | All-time
- **Actions**:
  - Tap domain (chart or list) → domain dashboard
  - Switch time range
  - Tap SIA insight → SIA conversation
- **Navigates to**: Domain dashboards, SIA
- **States**: Populated, early stage (fewer data points, larger areas highlighted as "potential")

---

## Priority 5: Me & Sub-screens (9 screens — was 10, Preferences merged into Settings)

### Screen 16: Me Main
- **Shows**:
  - **Profile section** (top):
    - Avatar/photo (tappable to edit)
    - User name
    - RPG level badge + XP progress bar
    - Member since date
  - **Quick stats row**: Current streak | Goals completed | Total XP
  - **Quick links grid** (2×3 or list):
    - RPG Character
    - Personal Wiki / SIA Memory
    - Connected Services
    - Subscription
    - Notification History
    - Help Center
    - Settings (gear icon, possibly top-right instead)
  - **Explore section** (integrated below quick links):
    - "Suggested for you" — 2–3 AI-recommended module cards (horizontal scroll)
    - Module grid by domain: each card has module name, short description, domain color icon
    - Categories cover all 9 domains + standalone features (Journal, Habits, Calendar, Leaderboard, Community)
- **Actions**: Tap any quick link → sub-screen, tap explore module → domain dashboard/feature, tap avatar → edit profile, tap RPG level → RPG Character
- **Navigates to**: All Me sub-screens, all domain dashboards, feature screens
- **States**: Populated, new user (fewer stats, exploration-forward)

### Screen 17: Explore Section
- **Shows**:
  - "Suggested for you" — AI-recommended modules (2–3 cards, context-aware)
  - Module grid organized by life domain category:
    - Each card: module name, 1-line description, domain color icon, optional badge (new / suggested)
    - Fitness & Workouts, Nutrition & Diet, Finance / Money Map, Career & Work, Relationships, Spirituality, Learning & Growth, Creativity
  - Standalone features section: Journal, Habits, Calendar, Leaderboard, Community
- **Actions**: Tap module card → domain dashboard or feature screen, scroll categories
- **Navigates to**: All domain dashboards, Journal, Habits, Calendar, Leaderboard, Community
- **Notes**: Could function as a scrollable section within Me Main rather than a separate pushed screen. Design should determine which feels better.

### Screen 18: RPG Character Screen
- **Shows**:
  - **Character card** (hero section):
    - User avatar/photo (large)
    - Overall level + title/rank
    - XP bar to next level (with numbers)
  - **Domain skill levels** (grid or list):
    - Each domain: name, level number, XP bar, domain color
    - E.g., "Fitness Lv.12" / "Finance Lv.8" / "Spirituality Lv.3"
  - **Stats summary**:
    - Total XP earned (lifetime)
    - Current active streak
    - Quests completed (total)
    - Quests active (current)
  - **Quest history** (scrollable):
    - Completed goals: name, completion date, XP earned, domain tags
- **Actions**: Scroll stats, tap domain skill → domain dashboard, tap completed quest → archived Goal Detail
- **Navigates to**: Domain dashboards, archived Goal Details

### Screen 19: Personal Wiki / SIA Memory ("Book of Life")
- **Shows**:
  - **Chapter navigation** (tabs or sidebar):
    - About You (personal details SIA knows)
    - Preferences (communication, schedule, diet preferences)
    - Patterns (AI-discovered behavioral patterns)
    - Correlations (cross-domain correlations — the secret sauce, browsable here)
    - Goals History
    - Life Events
  - **Entries** (per chapter):
    - Title, content/description
    - Source indicator (how SIA learned this: "from conversation on May 3" / "detected from data")
    - Date added/updated
    - Confidence level (for correlations)
    - Edit / Delete buttons
    - "This is wrong" prominent button
  - **Search bar** (top)
- **Actions**: Browse by chapter, search, edit entries, delete entries, mark as wrong, tap correlation → SIA explains
- **Navigates to**: SIA (for correlation explanations), entry edit mode
- **States**: Sparse (early — few entries, SIA explains it grows over time), Rich (after weeks of use)

### Screen 20: Settings (now includes Preferences)
- **Shows**:
  - **Account**: Email (display), change password, sign out, delete account
  - **Appearance**: Dark / Light mode toggle
  - **Communication preferences** (merged from Preferences):
    - SIA communication style hints
    - Preferred check-in times (morning/evening)
    - Tone preference (if user wants manual override)
  - **Notifications**: Per-category toggles
    - SIA insights, Reminders, Check-ins, Social
    - Quiet hours (start/end time)
  - **Privacy**: Data visibility preferences
  - **About**: App version, terms of service, privacy policy, licenses
- **Actions**: Toggle settings, change password, sign out, delete account, adjust notification preferences
- **Navigates to**: Change password flow, sign out → Sign In, delete account confirmation

### Screen 22: Connected Services
- **Shows**:
  - Integration cards (vertical list):
    - Each card: service logo, service name, connection status badge (Connected / Not connected), last sync time, data description ("Syncing sleep, HRV, recovery"), Connect / Disconnect button
  - Available integrations:
    - WHOOP (sleep, HRV, recovery)
    - Google Calendar (events, schedule)
    - Spotify (listening data)
    - Apple Health / Google Fit (future)
- **Actions**: Connect (→ OAuth flow), disconnect, force sync, view sync details
- **Navigates to**: External OAuth flows, back to Me
- **States**: No services connected (guidance to connect), services connected (status view)

### Screen 23: Subscription & Billing
- **Shows**:
  - **Current plan** badge/highlight
  - **4-tier comparison** (horizontal scroll or vertical cards):
    - Free ($0): Non-AI features (journaling, finance module, habit tracking, basic dashboard)
    - Plus ($20/mo): Full SIA coaching, all domains, cross-domain insights, RPG gamification
    - Pro ($60/mo): Everything in Plus + advanced analytics, higher AI limits, usage meter
    - Max ($100–200/mo): Unlimited SIA, priority processing, family/team features
  - Feature comparison checklist
  - Current AI usage indicator (for metered tiers)
  - Payment method (card on file)
  - Billing history (expandable)
  - Cancel / downgrade option
- **Actions**: Upgrade, downgrade, update payment, view billing history, cancel, restore purchase
- **Navigates to**: Payment flow (native IAP), billing details

### Screen 24: Notification History
- **Shows**:
  - Scrollable list grouped by date
  - Each notification: category icon, title, preview text, timestamp, read/unread dot
  - Tap → navigates to relevant screen
  - "Mark all as read" action (top right)
- **Actions**: Tap notification → navigate, mark all read, pull to refresh
- **Navigates to**: Relevant screen per notification type (SIA, Goal, Insight, etc.)
- **States**: Empty (no notifications yet), populated
- **Notes**: Minimal feature — not a primary experience

### Screen 25: Help Center
- **Shows**:
  - Search bar (top)
  - "Ask SIA" prominent card — SIA can answer help questions conversationally
  - FAQ categories: Getting Started, SIA & AI Coach, Goals & Tracking, Billing & Subscription, Privacy & Data, Troubleshooting
  - Expandable FAQ items within each category
  - Contact support link (bottom)
- **Actions**: Search FAQs, tap "Ask SIA" → SIA tab (help context), browse/expand FAQs, contact support
- **Navigates to**: SIA (help mode), support email/form

---

## Priority 6: Fitness & Workouts (2 screens)

### Screen 26: Fitness & Workouts Dashboard
- **Shows**:
  - Domain header: "Fitness & workouts" with red domain color accent
  - SIA coaching note ("Your recovery is high today. Good day for intensity.")
  - Today's workout plan (AI-generated):
    - Workout name, type, estimated duration
    - Exercise list preview (3–5 exercises)
    - "Start workout" CTA
  - WHOOP integration data (if connected):
    - Sleep score, HRV, recovery percentage
    - Visual indicators (green/yellow/red)
  - Active fitness goals with progress bars
  - Exercise history: last 7 days (calendar dots or mini chart)
  - Weekly stats: workouts completed, active minutes, estimated calories
  - "Log workout" secondary action
- **Actions**: Start today's workout, view/edit plan, log workout manually, view history, connect WHOOP
- **Navigates to**: Workout Detail / Active Workout, exercise history, WHOOP setup (Connected Services)

### Screen 27: Workout Detail / Active Workout
- **Shows**:
  - **Planning mode** (before starting):
    - Exercise list: name, sets × reps, rest time, notes
    - Estimated total duration
    - "Start workout" CTA
  - **Active mode** (during workout):
    - Current exercise name (large)
    - Set tracker: weight input, reps input, "Complete set" button
    - Rest timer (countdown between sets, auto-starts)
    - Progress: "Set 2 of 4" / "Exercise 3 of 8"
    - Next exercise preview
    - SIA real-time note ("Last set. Push through.")
    - Pause / End workout buttons
  - **Post-workout summary**:
    - Duration, exercises completed, estimated calories
    - XP earned (animated)
    - SIA feedback ("Solid session. That's 3 this week.")
    - "Done" button
- **Actions**: Start, pause, resume, complete set, skip exercise, end workout, log manually, dismiss summary
- **Navigates to**: Back to Fitness dashboard, Celebration overlay (on milestone)

---

## Priority 7: Nutrition & Diet (2 screens)

### Screen 28: Nutrition & Diet Dashboard
- **Shows**:
  - Domain header with lime domain color accent
  - SIA meal coaching note
  - Today's meal plan (AI-suggested):
    - Breakfast / Lunch / Dinner / Snacks — each with name, quick macro badges (cal/protein/carbs/fat)
  - Macro tracking summary:
    - Daily progress bars (calories, protein, carbs, fat) toward targets
    - Percentage of daily goal
  - Water intake tracker (glasses/ml visual)
  - Recent food log (last few entries)
  - "Log food" floating action button
- **Actions**: Follow/view meal plan, log food, track water intake, view macro details, customize plan
- **Navigates to**: Meal Detail / Food Logger

### Screen 29: Meal Detail / Food Logger
- **Shows**:
  - **Meal view** (viewing a planned or logged meal):
    - Meal name, photo (optional)
    - Ingredients list with per-item macros
    - Total nutrition breakdown (cal / protein / carbs / fat)
  - **Food logging mode**:
    - Search for food (database lookup)
    - Barcode scanner button
    - Receipt scanner button
    - Manual entry: food name, portion size, macro values
    - Recent / frequent foods (quick-add)
    - Meal type selector (breakfast/lunch/dinner/snack)
  - Macro breakdown visualization (pie chart or bar)
- **Actions**: Search food, scan barcode, scan receipt, manual entry, add from recent, save/log, cancel
- **Navigates to**: Back to Nutrition dashboard

---

## Priority 8: Finance / Money Map (2 screens)

### Screen 30: Finance / Money Map Dashboard
- **Shows**:
  - Domain header with emerald domain color accent
  - SIA financial coaching note ("Your dining spending is up 20% this week. Connected to your stress levels?")
  - Monthly overview card: income, expenses, savings, net (with delta from last month)
  - Budget categories: horizontal progress bars (spent / allocated per category)
  - Recent transactions list (last 5–10): amount, merchant/description, category icon, date
  - Savings goals with progress bars
  - Spending analytics: mini trend chart (7-day or 30-day)
  - Quick-add: "Add transaction" button, receipt scanner shortcut
- **Actions**: Add transaction, scan receipt, tap budget category → detail, tap transaction → detail, view analytics, set/edit budgets
- **Navigates to**: Transaction / Budget Detail, analytics deep-dive

### Screen 31: Transaction / Budget Detail
- **Shows**:
  - **Transaction view**: Amount (large), date/time, category (with color), merchant name, notes, receipt photo (if scanned), edit/delete options
  - **Budget category view**: Category name + icon, allocated amount, spent amount, remaining, progress bar, transaction list filtered to this category, edit budget button
- **Actions**: Edit transaction, delete, recategorize, edit budget allocation, view related transactions
- **Navigates to**: Back to Finance dashboard

---

## Priority 9: Wellbeing Standalone (2 screens)

### Screen 37: Journal
- **Shows**:
  - SIA reflection prompt of the day (top card): "What made today different from yesterday?"
  - "Write" button → new entry
  - Past entries list: date, preview snippet, mood indicator (if captured), domain tags
  - Entry view: SIA's prompt (if used), user's full text, domain tags, date
  - Writing mode: rich text editor, SIA prompt shown above, domain tag selector
- **Actions**: Write new entry, respond to SIA prompt, view past entries, tag domains, edit/delete entries
- **Navigates to**: Entry editor, past entry view
- **States**: Empty (SIA prompt prominent, encouragement), populated (chronological list)

### Screen 38: Habits
- **Shows**:
  - Daily habits checklist:
    - Each habit: name, checkbox, streak count (flame icon), domain color tag
    - Grouped by time of day (morning / afternoon / evening) or custom groups
  - Completion rate: "5 of 8 today" with progress bar
  - Streak visualization: calendar heatmap or streak counters
  - "Add habit" button
  - View toggle: Today | Week | Month
  - XP earned from habit completions
- **Actions**: Check off habits, add new habit, view streaks, edit/reorder habits, switch view, view analytics
- **Navigates to**: Add/edit habit, habit analytics
- **States**: Empty (SIA suggests starter habits), populated

---

## Priority 10: Spirituality (1 screen)

### Screen 34: Spirituality Dashboard
- **Shows**:
  - Domain header with purple domain color accent
  - SIA spiritual coaching note (adaptive to user's stated beliefs — Muslim, Christian, agnostic, etc.)
  - Prayer/practice tracker:
    - For Muslims: 5 daily prayers with completion checkboxes
    - For others: customizable practice slots
    - Universal: works for any faith
  - Reading progress: current book/text (Quran, Bible, other), progress bar, daily reading goal
  - Fasting tracker (if active): current fast, time remaining, schedule
  - Daily reflection card: SIA-generated prompt for contemplation
  - Meditation/contemplation timer shortcut
  - Streak tracker (prayer/practice consistency)
- **Actions**: Log prayers/practice, update reading progress, toggle fasting, write reflection, start meditation timer, set reminders
- **Navigates to**: Reading tracker detail, reflection entry (Journal-like), SIA
- **Notes**: Content adapts entirely based on user's stated beliefs. SIA gives direction, not religious rulings. Religious text references need qualified authentication.

---

## Priority 11: Schedule & Calendar (1 screen)

### Screen 41: Schedule / Calendar
- **Shows**:
  - Daily planning view (default): time slots with events
  - Google Calendar events (synced, if connected)
  - SIA-scheduled actions placed in suggested time slots
  - Domain color coding on all events/actions
  - View toggle: Day | Week | Month
  - Quick-add event button
  - Unscheduled tasks area (actions not yet placed in time)
- **Actions**: View day/week/month, add event, tap event → detail, drag to reschedule, sync calendar
- **Navigates to**: Event detail, Google Calendar connection (Connected Services), relevant domain screens
- **States**: No calendar connected (guidance), calendar synced (rich view), empty day

---

## Priority 12: Remaining Domain Dashboards (4 screens)

### Screen 32: Career & Work Dashboard
- **Shows**:
  - Domain header with indigo accent
  - SIA career coaching note
  - Active career goals with progress
  - AI-suggested actions: skill-building tasks, networking prompts, professional development items
  - Growth trajectory: skills inventory visualization
  - Upcoming career-related tasks/deadlines
- **Actions**: Complete actions, add career goal, track skill progress, ask SIA for career advice
- **Navigates to**: Goal Detail (career goals), SIA

### Screen 33: Relationships Dashboard
- **Shows**:
  - Domain header with pink accent
  - SIA relationship coaching note
  - Key people list with last interaction date
  - AI reminders ("It's been 2 weeks since you connected with [person]")
  - Quality time log: recent entries (who, activity, duration, reflection)
  - Suggested activities from SIA
  - Important upcoming dates (anniversaries, birthdays)
- **Actions**: Log quality time, write reflection, set reminders, complete suggested activities, add person
- **Navigates to**: Log entry, SIA, Goal Detail (relationship goals)

### Screen 35: Learning & Growth Dashboard
- **Shows**:
  - Domain header with cyan accent
  - SIA learning coaching note
  - Current book/course: title, progress bar, daily goal
  - Reading/study streak
  - Book/course list with completion status
  - AI-suggested learning paths
  - Daily study prompt from SIA
  - Learning log (recent sessions)
- **Actions**: Log reading/study time, add book/course, complete study tasks, view learning path
- **Navigates to**: Book/course detail, SIA

### Screen 36: Creativity Dashboard
- **Shows**:
  - Domain header with amber accent
  - SIA creativity coaching note
  - Active creative projects with milestones and progress
  - Creative practice log (recent sessions: type, duration, notes)
  - Inspiration prompt from SIA
  - Portfolio-style progress timeline (visual progression over time)
  - Creative streak tracker
- **Actions**: Log creative session, add/manage projects, complete milestones, save inspiration, view portfolio
- **Navigates to**: Project detail, SIA

---

## Priority 13: Subscription Flows

Already covered in Screen 23 (Subscription & Billing) and Screen 43 (Paywall overlay).

---

## Priority 14: Social & Community (2 screens)

### Screen 39: Leaderboard
- **Shows**:
  - Framing: "Who is leading in improving their life?" (consistency, discipline, efficiency — NOT domain-specific metrics)
  - User's rank card (highlighted): rank, level, XP, streak
  - Leaderboard list: rank, avatar, name, level, XP, top domain badge
  - Time filter: This Week | This Month | All Time
  - Friends filter (if groups exist)
  - XP system is tied to RPG mechanics
- **Actions**: View rankings, filter by time, filter by friends group, view own position
- **Navigates to**: Limited user profile view
- **States**: Empty (no friends/community yet), populated

### Screen 40: Community / Chat Rooms
- **Shows**:
  - **Room list**: room name, member count, last message preview, unread badge
  - **Room interior** (pushed screen):
    - Group chat messages
    - Shared achievements and milestones
    - Group challenges (if active)
    - Member list
    - Room settings
  - "Create room" button
  - "Discover communities" section (curated/popular rooms)
  - Accountability features: shared goal progress among room members
- **Actions**: Join rooms, send messages, create rooms, view shared progress, leave room
- **Navigates to**: Room interior, member profiles (limited), create room flow
- **Notes**: No follow/friend request system for V1. No Tinder-style matching. Competitions deprioritized.

---

## Overlays / Modals (2 screens)

### Screen 42: Celebration / Achievement Overlay
- **Shows**:
  - **Big milestones** (full-screen overlay):
    - Dark backdrop with confetti/particle animation
    - Achievement icon or badge (large, animated)
    - Achievement name + description
    - XP earned (large number, count-up animation)
    - Level-up animation (if leveling up)
    - SIA congratulatory message
    - "Share" button (optional)
    - Dismiss button or tap anywhere to close
  - **Small wins** (toast/popup):
    - Toast notification at top of screen
    - XP popup animation (+25 XP floating up)
    - Auto-dismisses after 3 seconds
  - **Tier-adapted**: Low motivation = more celebration for smaller wins. High motivation = data summary instead of confetti.
- **Actions**: Dismiss, share, continue
- **States**: Big milestone (full-screen), small win (toast), level-up (special animation)

### Screen 43: Paywall / Upgrade Prompt
- **Shows**:
  - Contextual headline adapting to what the user was trying to do
    - Example: "Unlock SIA's full coaching" / "See the connection between your sleep and spending"
  - Blurred preview of the feature behind paywall (for data features)
  - Tier comparison focused on what they'd unlock
  - Free trial CTA (one-time per feature)
  - Price display
  - "Maybe later" easy-out link
  - **SIA conversational variant** (within chat): SIA mentions premium feature → inline upgrade card appears in conversation
- **Actions**: Upgrade, start free trial, dismiss ("Maybe later"), close
- **Navigates to**: Payment flow (native IAP), back to previous screen

---

## Final Screen Count

| Category | Count | Screens |
|----------|-------|---------|
| Pre-Auth & Onboarding | 8 | Splash, Carousel, Sign Up, Sign In, Forgot Password (new), Guest Mode, SIA Onboarding, Plan Summary |
| SIA | 3 | Chat, In-Chat Voice, Full-Screen Voice |
| Home | 1 | Home Screen |
| Goals | 4 | Goals List, Goal Detail, Create/Edit Goal, Life Areas Overview |
| Me & Sub-screens | 9 | Me Main, Explore, RPG Character, Personal Wiki, Settings (incl. Preferences), Connected Services, Subscription, Notification History, Help Center |
| Domain Dashboards | 11 | Fitness, Workout Detail, Nutrition, Meal/Food Logger, Finance, Transaction/Budget Detail, Career, Relationships, Spirituality, Learning, Creativity |
| Wellbeing Standalone | 2 | Journal, Habits |
| Social | 2 | Leaderboard, Community/Chat Rooms |
| Supporting | 1 | Calendar |
| Overlays/Modals | 2 | Celebration, Paywall |
| **Total** | **43** | |

---

## Next Step

Once this screen specification plan is finalized, the next step is to create system design / rough sketches for each screen using the `frontend-design` skill, following the same priority order.
