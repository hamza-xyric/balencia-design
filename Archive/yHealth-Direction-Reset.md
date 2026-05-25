---
type: strategy-document
title: yHealth Direction Reset — Team Feedback Synthesis
status: Complete
owner: Hamza
last_updated: 2026-03-12
kb_summary: Direction reset from team feedback — Life Coach positioning, Life Goals layer, AI-first UX, motivation tiers
---

# yHealth Direction Reset — Team Feedback Synthesis

**Date**: 2026-03-12
**Participants**: Hamza, Driexor/Munther, Haris, Salman
**Skills Used**: EXPERT-10 (Product Manager)
**Source**: Team review session feedback + [yHealth Audit Report](./yHealth-App-Audit-Report.md)

---

## 1. Team Feedback Themes

Six core themes emerged from the team review session. These represent a fundamental shift in how we think about yHealth — from a structured health tracking app to a proactive AI life coach.

### Theme 1: AI-First Proactive Coaching

**Core Insight**: Don't wait for user input. AI suggests plans, diets, activities, routines. User edits/overrides.

> "Users don't know what to do, they want coaching."

The current UX pattern is "log first, get insights later." The team wants the inverse: AI presents a plan, user confirms or adjusts. This applies to every feature — workouts, meals, journal prompts, habits, routines, schedules.

**Key Points**:
- AI generates the first version of everything (workout plan, meal plan, daily schedule)
- User's primary action is reviewing and accepting/editing, not creating from scratch
- AI learns from accept/edit/skip patterns to improve future suggestions
- Proactive notifications with actual suggestions, not just reminders to log

### Theme 2: Life Coach, Not Health Coach

**Core Insight**: yHealth is for anyone wanting to improve themselves — not just fitness/nutrition/wellbeing.

> "If you are striving to improve yourself then yHealth is for you."

The scope extends far beyond the current 3-pillar health model. Relationships, religion, family, mental health, screen time, career, personal growth, education — all are valid life domains that yHealth should coach on.

**Key Points**:
- "Life Coach" is the primary identity, "Health Coach" is a subset
- The 3 pillars (Fitness, Nutrition, Wellbeing) remain as the data foundation
- A new "Life Goals" layer sits on top, accepting any user-defined goal
- AI decomposes life goals into actionable steps that map to existing pillar features
- No predefined goal categories — free-form input, AI structures it

### Theme 3: Motivation-Based Personalization

**Core Insight**: Users have different motivation levels. Low/medium/high tiers fundamentally change what AI suggests and how.

**Key Points**:
- Low motivation: "Walk 10 minutes" not "1hr gym." Micro-actions, heavy gamification, behavioral tricks
- Medium motivation: Structured plans, reminders, moderate challenge level
- High motivation: Detailed macros, progressive overload, deep journaling, accountability
- User declares tier during onboarding, AI adjusts based on actual behavior
- Per-goal motivation is possible (high for fitness, low for meditation)
- Low-motivation users need behavioral tricks (app time limits, replacement activities, 2-minute rule)

### Theme 4: Automate Data Entry

**Core Insight**: Don't make users manually log things that can be automated.

**Key Points**:
- Screen time tracking pulled automatically (iOS Screen Time API or manual fallback)
- Behavioral patterns detected from usage data
- Meal confirmation ("Did you have the suggested lunch?") instead of manual calorie logging
- WHOOP/wearable data already automated — extend this principle everywhere
- One-tap confirmations replace multi-field forms wherever possible

### Theme 5: UI/UX Concerns

**Core Insight**: Current visual design needs attention — colors look AI-generated, pillar distinction unclear, data scattered.

**Key Points**:
- Colors flagged by Haris as looking AI-generated — Haris is working on redesign
- 3-pillar distinction isn't visually clear in the UI
- Sections need better grouping/merging — related features are scattered
- Data presentation is fragmented across too many separate views
- Need more cohesive information architecture

### Theme 6: All-in-One Vision

**Core Insight**: Not a fitness app, not a prayer app — it's ALL of them. Life is made up of all these things.

**Key Points**:
- Spotify integration (P32) is an example of this broader thinking
- Yoga & Meditation (P32) already expanded beyond strict health
- The app should feel like "one place for everything about improving your life"
- Integration across life domains is the value proposition, not depth in any single one
- Replaces 5-10 separate apps (fitness tracker, meal planner, meditation app, habit tracker, prayer app, journal, screen time tracker)

---

## 2. What Already Aligns

Mapping team feedback against existing documentation and implementation reveals significant alignment — the foundation is stronger than it appears.

### Documentation Alignment

| Theme | Existing Documentation | Reference |
|-------|----------------------|-----------|
| Life Coach identity | Product Vision v4.0 says "AI Life Coach" — not just health coach | `Product-Vision.md:1` — "yHealth is your AI Life Coach" |
| Broader aspirations | Vision explicitly mentions "broader life aspirations" and "life goals" | `Product-Vision.md:7` — "broader life aspirations" |
| Second Mind | Product Identity calls it "Second Mind" and "companion" | `product-identity.md:9` — "Second Mind" |
| Goal-oriented | Identity lists "Goal-Oriented Support beyond health metrics" | `product-identity.md:43` — benefit #5 |
| Predictive/proactive | Identity lists "Predictive Intelligence — proactive coaching based on patterns" | `product-identity.md:44` — benefit #7 |
| User-adaptive | Vision describes Light/Deep modes for engagement flexibility | `Product-Vision.md:39-40` — Light/Deep modes |

**Verdict**: The **vision documents already say the right things**. The gap is between vision language and implementation reality — the code and UX don't yet reflect the documented vision.

### Implementation Alignment (P26-P32 Features)

| Theme | Already Built | Phase |
|-------|--------------|-------|
| **AI-First Coaching** | Proactive messaging system exists (18 message types, scored candidates) | P26 |
| **AI-First Coaching** | Delta-aware conversations detect user state changes | P27 |
| **AI-First Coaching** | Coaching profiles with adherence scores, risk flags, predictions | P26 |
| **AI-First Coaching** | Emotional intelligence engine (16 emotion types, relationship depth) | P29 |
| **Proactive Insights** | Best Day Formula — already tracks what makes a "good day" | P31 |
| **Proactive Insights** | Contradiction detection — 22 rules catching conflicting behaviors | P31 |
| **Proactive Insights** | Health correlations — 6 SQL detectors finding patterns | P31 |
| **Proactive Insights** | Prediction accuracy tracking — self-improving AI system | P31 |
| **Proactive Insights** | Weekly reports with LLM narrative — AI-generated summaries | P31 |
| **Broader Scope** | Spotify integration — music as life data signal, not just health | P32 |
| **Broader Scope** | Yoga & Meditation — expanded wellbeing beyond mood/journal | P32 |
| **Behavioral Patterns** | 4 pattern detection algorithms (negativity bias, triggers, cycles, escalation) | P30 |
| **Passive Data** | Voice journaling — lower friction than typing | P31 |
| **Passive Data** | Theme detection — 15 tags from journal content, understands life context | P31 |
| **AI Infrastructure** | LLM model factory — 4-provider cascade (Gemini → Anthropic → DeepSeek → OpenAI) | P31 |
| **AI Infrastructure** | LangGraph agent system with tool-calling for proactive suggestions | Existing |
| **AI Infrastructure** | RAG knowledge base with vector embeddings | Existing |

**Verdict**: The **AI infrastructure is robust**. The gap is in the UX layer — these capabilities exist but aren't surfaced through suggestion-first interfaces.

---

## 3. What Conflicts / Needs to Change

### Architecture Conflicts

| Area | Current State | Problem | Solution |
|------|--------------|---------|----------|
| **3-Pillar Model** | Hardcoded in DB enums, UI colors, component structure | Everything organized by pillar — no concept of cross-cutting "life goals" | Keep pillars as data foundation, add a "Life Goals" layer on top |
| **Feature Organization** | Fitness tab, Nutrition tab, Wellbeing tab | User goals don't map 1:1 to pillars (e.g., "Be a better Muslim" touches all 3) | Goal-centric navigation alongside pillar views |
| **AI Services** | 4 core functions stubbed (NS-006) | Can't do AI-first without AI actually working | Must replace stubs — non-negotiable for direction reset |
| **Motivation Tiers** | No concept exists in DB or onboarding | Can't personalize by motivation without the system | New DB table, onboarding question, engagement scoring |
| **Onboarding Flow** | Registration → manual goal setting → user builds plan | Contradicts AI-first principle — user shouldn't build from scratch | AI assessment → suggested goals → AI-generated plan → user customizes |

### UX Conflicts

| Area | Current State | Problem | Solution |
|------|--------------|---------|----------|
| **Interaction Pattern** | "Log first, get insights later" | Opposite of AI-first — requires user initiative for everything | Flip to "AI suggests, user confirms/edits/skips" |
| **Colors** | Haris flagged as AI-generated looking | Visual design doesn't feel crafted/intentional | Haris redesigning — track as UI work |
| **Pillar Clarity** | 3-pillar distinction unclear visually | Users don't understand the structure | Better section grouping, possible merging of related views |
| **Data Entry** | Manual logging across most features | High friction, especially for low-motivation users | Automation layer + confirmation-based logging |
| **Information Architecture** | Data scattered across many separate views | User has to navigate to many places to see their picture | Unified goal-centric views that pull from all pillars |

### Documentation Conflicts

| Area | Current State | Problem | Solution |
|------|--------------|---------|----------|
| **Vision → Implementation** | Vision says "Life Coach" but Epics are health-only | Epic structure (E01-E10) doesn't include life domains | Add E11 Life Goals epic or restructure |
| **Epic Scope** | E01-E10 organized by health pillars and channels | No epic for motivation system, life goals, screen time | New work items or epic for direction reset features |
| **Audit Status** | Audit report recommendations are health-pillar-focused | Recommendations don't account for life coach pivot | Reprioritize (Section 9 below) |

---

## 4. The "Life Goals" Architecture

### 4.1 Conceptual Model

```
┌─────────────────────────────────────────────────┐
│               LIFE GOALS LAYER                   │
│  "Be a better Muslim"  "Improve marriage"        │
│  "Reduce screen time"  "Read 20 books/year"      │
│  "Get fit"  "Eat healthier"  "Sleep better"      │
├─────────────────────────────────────────────────┤
│            AI GOAL DECOMPOSITION                 │
│  Breaks any goal → actionable steps              │
│  Maps steps → relevant pillar data               │
│  Calibrates by motivation tier                   │
├──────────┬──────────────┬───────────────────────┤
│ FITNESS  │  NUTRITION   │  WELLBEING            │
│ (data)   │  (data)      │  (data)               │
│ workouts │  meals       │  mood, journal, habits │
│ WHOOP    │  macros      │  stress, sleep, energy │
│ activity │  hydration   │  breathing, mindfulness│
└──────────┴──────────────┴───────────────────────┘
```

**Three-layer relationship**:

- **3 Pillars = Data Foundation**: Fitness, Nutrition, Wellbeing continue collecting health data, tracking metrics, providing insights. These don't change. They remain the structured data layer.
- **Life Goals = User-Facing Layer**: Any goal the user sets. No restrictions, no predefined categories. The AI decomposes goals into trackable actions. This is what the user sees and interacts with daily.
- **AI Decomposition Service**: When a user sets a goal, AI breaks it into:
  - **Daily actions** (habits to form, tasks to do)
  - **Tracking signals** (which pillar data to monitor)
  - **Milestones** (progress markers toward the goal)
  - **Coaching prompts** (what to ask/suggest related to this goal)

### 4.2 Goal Examples with AI Decomposition

**Goal: "Be a better Muslim"**
```
AI decomposes into:
├── Habit: Prayer 5x daily (Wellbeing → habit tracker)
├── Habit: Morning Quran reading 15 min (Wellbeing → routine)
├── Schedule: Prayer time alerts (Wellbeing → reminders)
├── Journal prompt: "How did today align with your values?" (Wellbeing → journal)
├── Sleep: Wake before Fajr (Fitness → sleep schedule)
├── Nutrition: Suggest intermittent fasting on Mon/Thu (Nutrition → meal plan)
└── Milestone: 7-day streak → 30-day streak → 90-day consistency
```

**Goal: "Improve relationship with my wife"**
```
AI decomposes into:
├── Habit: Quality time 30min/day — no phones (Wellbeing → habit tracker)
├── Journal prompt: "What did you appreciate about your partner today?" (Wellbeing → journal)
├── Schedule: Weekly date night block (Wellbeing → routine)
├── Mood correlation: Track mood on days with/without quality time (Wellbeing → mood)
├── Screen time: Reduce evening phone usage (automated tracking)
├── Stress: Monitor stress patterns affecting relationship (Wellbeing → stress)
└── Milestone: 1 week consistent → mood improvement detected → AI celebrates
```

**Goal: "Reduce screen time to 3 hours/day"**
```
AI decomposes into:
├── Track: Screen time data (automated or manual input)
├── Alternatives: AI suggests activities during usual scroll hours (Fitness/Wellbeing)
├── Pattern: "You scroll most 9-11pm. Try: 20min walk, then bedtime routine"
├── Habit: Phone-free first hour after waking (Wellbeing → habit)
├── Correlation: Sleep quality vs screen time before bed (cross-pillar)
├── Behavioral trick: "Set 30-min app timer on Instagram" (low motivation)
└── Milestone: Under 4hrs → Under 3hrs → 3 consecutive weeks
```

**Goal: "Get fit" (traditional health goal)**
```
AI decomposes into:
├── Workout plan: AI-generated based on fitness level + motivation tier
├── Activity tracking: Steps, workouts, WHOOP strain (Fitness)
├── Nutrition: Calorie/macro targets for fitness goal (Nutrition)
├── Recovery: Sleep + WHOOP recovery monitoring (Fitness)
├── Mood: Track energy/motivation on workout vs rest days (Wellbeing)
├── Habit: Gym 3x/week or daily walks (Wellbeing → habit)
└── Milestone: First workout → 1 week consistent → body comp changes
```

### 4.3 Database Design

```sql
-- Life Goals table (flexible, not enum-restricted)
CREATE TABLE life_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,           -- "Be a better Muslim"
  description TEXT,                       -- User's own words about why
  tags TEXT[],                            -- ['religion', 'spirituality', 'habits']
  motivation_level VARCHAR(10),           -- 'low' | 'medium' | 'high' (per-goal)
  status VARCHAR(20) DEFAULT 'active',    -- 'active' | 'paused' | 'completed' | 'archived'
  target_date DATE,                       -- Optional deadline
  ai_decomposition JSONB,                -- AI-generated breakdown (actions, tracking, milestones)
  pillar_mappings JSONB,                  -- Which pillars this goal touches and how
  progress_score DECIMAL(5,2) DEFAULT 0,  -- 0-100 AI-calculated progress
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goal Actions (AI-decomposed steps)
CREATE TABLE goal_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES life_goals(id) ON DELETE CASCADE,
  action_type VARCHAR(30),    -- 'habit' | 'schedule' | 'journal_prompt' | 'tracking' | 'milestone'
  title VARCHAR(255),         -- "Prayer 5x daily"
  description TEXT,
  pillar VARCHAR(20),         -- 'fitness' | 'nutrition' | 'wellbeing' | NULL (cross-pillar)
  linked_entity_type VARCHAR(30), -- 'habit' | 'routine' | 'meal_plan' | 'workout' | NULL
  linked_entity_id UUID,     -- FK to the actual habit/routine/plan if auto-created
  frequency VARCHAR(20),     -- 'daily' | 'weekly' | 'monthly' | 'once'
  is_ai_generated BOOLEAN DEFAULT true,
  is_completed BOOLEAN DEFAULT false,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goal Milestones
CREATE TABLE goal_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES life_goals(id) ON DELETE CASCADE,
  title VARCHAR(255),         -- "7-day prayer streak"
  description TEXT,
  target_value DECIMAL,
  current_value DECIMAL DEFAULT 0,
  is_reached BOOLEAN DEFAULT false,
  reached_at TIMESTAMP,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_life_goals_user ON life_goals(user_id, status);
CREATE INDEX idx_life_goals_tags ON life_goals USING GIN(tags);
CREATE INDEX idx_goal_actions_goal ON goal_actions(goal_id, is_completed);
```

### 4.4 API Endpoints

```
POST   /api/goals                    -- Create goal (AI decomposes automatically)
GET    /api/goals                    -- List user's goals with progress
GET    /api/goals/:id                -- Goal detail with actions + milestones
PUT    /api/goals/:id                -- Update goal (title, motivation, etc.)
DELETE /api/goals/:id                -- Archive goal
POST   /api/goals/:id/decompose      -- Re-run AI decomposition (if user changed goal)
GET    /api/goals/:id/progress        -- AI-calculated progress with insights
POST   /api/goals/:id/actions/:actionId/complete  -- Mark action done
GET    /api/goals/suggestions         -- AI suggests goals based on user profile/assessment
POST   /api/goals/from-assessment     -- Create goals from onboarding assessment answers
```

### 4.5 AI Goal Decomposition Service

New service: `goal-decomposition.service.ts`

**Inputs**:
- Goal title + description
- User profile (age, gender, existing data, preferences)
- Motivation tier (overall + per-goal)
- Existing goals (to avoid duplication/conflicts)

**Process**:
1. Uses LLM (via model-factory) to break goal into actions, tracking signals, milestones
2. Maps actions to existing pillar features (habits, routines, meal plans, workouts)
3. Calibrates complexity based on motivation tier
4. Auto-creates linked entities (e.g., creates a habit entry when goal action is "habit" type)
5. Returns structured JSONB stored in `ai_decomposition` column

**Re-run triggers**:
- User edits goal title or description
- Motivation tier changes (declared or computed)
- User completes all current milestones (generate next set)

### 4.6 UI Placement

- **New "My Goals" page**: Primary navigation item. Shows all active goals with progress rings.
- **Dashboard integration**: Goals widget on overview tab showing top 3 goals + progress.
- **Onboarding**: After assessment, AI presents 3-5 suggested goals. User picks/customizes.
- **Goal detail page**: Shows actions (checklist), milestones (progress bar), AI insights, pillar connections.
- **Cross-linking**: Each pillar tab shows which goals it contributes to ("This workout supports your 'Get Fit' goal").

---

## 5. AI-First Feature Redesign

### 5.1 The AI-First UX Pattern

Every feature follows this universal pattern:

```
┌─────────────────────────────────────┐
│  1. AI SUGGESTS (proactive)         │
│  "Based on your goals and data,     │
│   here's what I recommend today"    │
├─────────────────────────────────────┤
│  2. USER REVIEWS                    │
│  See suggestion with rationale      │
│  "Why this?" expandable explanation │
├─────────────────────────────────────┤
│  3. USER ACTS                       │
│  ✅ Accept  ✏️ Edit  ❌ Skip        │
│  Swipe cards, tap to accept         │
├─────────────────────────────────────┤
│  4. AI LEARNS                       │
│  Tracks accept/edit/skip ratio      │
│  Adjusts future suggestions         │
└─────────────────────────────────────┘
```

**Key UI Component**: `<AISuggestionCard>` — reusable component across all features
- Shows suggestion with pillar color accent
- "Why this?" collapsible with AI reasoning
- Accept/Edit/Skip actions
- Links to relevant goal ("Supports your 'Get Fit' goal")
- Adapts tone/complexity by motivation tier

### 5.2 Feature-by-Feature Redesign

#### WORKOUT PLANS

| Aspect | Current | AI-First Target |
|--------|---------|-----------------|
| Plan creation | User browses exercise library, manually picks exercises | AI generates full workout plan on signup based on goals + fitness level + motivation |
| Daily workout | User opens workout page, sees their plan | Morning notification: "Today's workout: 30-min HIIT (adjusted for your 85% WHOOP recovery)" |
| Adaptation | Static plan until user changes it | AI adjusts weekly: "You crushed leg day, adding 5kg next week. Upper body was tough — keeping same weight." |
| Motivation-aware | Same plan for everyone | Low: "10-min walk today" / High: "45-min strength + 20-min cardio" |
| Goal-linked | Generic fitness tracking | "This workout supports your 'Lose 10kg' goal. You're 40% there." |

**Concrete UX flow**:
1. User opens app → sees today's AI-suggested workout card on dashboard
2. Card shows: exercise list, estimated time, difficulty, WHOOP recovery context
3. User taps "Start" (accept), "Modify" (edit exercises), or swipes away (skip)
4. If skipped, AI asks: "Too hard? Too long? Not in the mood?" → adjusts future suggestions
5. After workout, AI provides feedback: "Great session! Your strain was optimal for recovery."

#### MEAL PLANNING

| Aspect | Current | AI-First Target |
|--------|---------|-----------------|
| Meal logging | User manually logs each meal | AI suggests 3 meals + snacks for the day. User confirms what they ate or swaps. |
| Meal ideas | User browses recipes | "For lunch, I suggest grilled chicken salad (supports your protein goal). Swap?" with 2 alternatives |
| Tracking | User enters calories/macros | AI auto-estimates from confirmed meals. User adjusts only if needed. |
| Shopping | User creates list manually | Weekly auto-generated shopping list based on upcoming meal plan |
| Motivation-aware | Same complexity for everyone | Low: "Just track water and one meal" / High: "Full macro tracking with meal prep plan" |

**Concrete UX flow**:
1. Morning notification: "Here's your meal plan for today" (3 meals + snacks)
2. Each meal is a swipeable card with photo, macros, prep time
3. User taps ✅ to confirm, 🔄 to swap (AI offers 2 alternatives), ✏️ to customize
4. At meal time: "Lunch time! Having the grilled chicken salad?" — one-tap confirm
5. End of day: "You hit 80% of your protein target. Tomorrow I'll add a protein shake to breakfast."

#### JOURNAL & WELLBEING

| Aspect | Current | AI-First Target |
|--------|---------|-----------------|
| Journal entry | User opens journal, blank page | AI sends contextual prompt: "You had a tough workout + low mood yesterday. What's on your mind?" |
| Mood check-in | User initiates check-in | AI detects patterns and prompts: "You usually feel low around 3pm on weekdays. Quick check-in?" |
| Habits | User creates habits to track | AI suggests habits linked to goals: "To support your 'Better Sleep' goal, try: no phone 1hr before bed" |
| Breathing/Mindfulness | User browses exercises | AI suggests based on context: "Your stress has been high this week. Try this 5-min breathing exercise." |
| Routines | User builds routine manually | AI generates morning/evening routine based on goals, then user customizes |

**Concrete UX flow**:
1. Morning: AI sends personalized prompt based on yesterday's data + current goals
2. "Good morning! Yesterday you hit 3/5 goals. Your sleep was 7.2hrs (good). One thing to focus on today?"
3. If user engages: guided conversation. If not: no pressure, try again tomorrow.
4. Evening: "Quick reflection: How was today?" (emoji scale, expandable to full journal)
5. AI extracts themes, updates behavioral patterns, adjusts tomorrow's suggestions

#### DAILY SCHEDULE & ACTIVITY SUGGESTIONS

| Aspect | Current | AI-First Target |
|--------|---------|-----------------|
| Schedule | User views their calendar passively | AI proactively fills free time blocks with suggestions |
| Activity alternatives | None | "You usually scroll Instagram 9-10pm. Instead, try: 15-min walk, 10-min reading, or guided meditation" |
| Screen time | Not tracked | Automated tracking (when available) or self-report. AI correlates with mood/sleep. |
| Behavioral nudges | None | AI detects unhealthy patterns and suggests alternatives at the right time |

**Concrete UX flow**:
1. AI identifies free time blocks from user's behavioral patterns
2. Pushes suggestion at the right moment: "You have 30 free minutes now. Based on your goals: 15-min yoga (supports 'flexibility' goal) or journal session (supports 'self-reflection' goal)?"
3. Low motivation: simpler suggestions ("Stand up and stretch for 2 minutes")
4. High motivation: ambitious suggestions ("HIIT session + meal prep for tomorrow")

#### ONBOARDING (REDESIGNED)

**Current**: Registration → manual goal setting → user builds plan from scratch
**New**: Registration → AI assessment conversation → AI suggests goals → AI generates full plan → user customizes

```
Step 1: Welcome + account creation

Step 2: AI conversation (3-5 questions)
  - "What's the #1 thing you want to improve in your life?"
  - "How motivated are you right now?" (low/medium/high)
  - "What have you tried before?"
  - "What's your biggest obstacle?"
  - "Any specific life goals?" (free text)

Step 3: AI presents suggested goals (3-5)
  - Each goal with decomposed actions preview
  - User picks which goals to activate, edits, or adds custom

Step 4: AI generates personalized plan
  - Daily schedule with suggested activities
  - Meal plan (if nutrition goal selected)
  - Workout plan (if fitness goal selected)
  - Habit suggestions (for all goals)

Step 5: "Your plan is ready. Let's start Day 1."
  - User sees their personalized dashboard
  - Everything pre-populated by AI
  - User can edit anything, but doesn't have to create from scratch
```

#### GOALS PAGE (NEW)

| Aspect | Description |
|--------|-------------|
| Goal cards | Each goal shows: title, progress ring, motivation tier badge, connected pillar colors |
| Goal detail | Checklist of AI-decomposed actions, milestone progress bars, AI insights ("This week: 60% actions completed") |
| Add goal | Free text input → AI decomposes in real-time → user reviews → activates |
| Goal coaching | AI periodically comments on goal progress: "You've been consistent with prayer for 2 weeks! Keep it up." |
| Goal adjustment | If motivation drops, AI suggests: "Simplify this goal? I can reduce daily prayer tracking from 5x to 3x to start." |

---

## 6. Motivation Tier System

### 6.1 The Three Tiers

| Aspect | Low Motivation | Medium Motivation | High Motivation |
|--------|---------------|-------------------|-----------------|
| **Profile** | Wants to change but struggles to start. Easily overwhelmed. Often ignores notifications. | Ready to work but needs structure and reminders. Engages 3-4x/week. | Self-driven, wants optimization. Daily engagement. |
| **AI Tone** | Gentle, encouraging, zero pressure. "Hey, even 5 minutes counts." | Structured, supportive. "Here's your plan for today. You've got this." | Direct, challenging. "Yesterday was 80%. Let's hit 100% today." |
| **Suggestion Complexity** | 1-2 micro-actions per day | 3-5 actions per day | 5-10 actions per day |
| **Workout** | "10-min walk" or "5 bodyweight exercises" | "30-min structured workout" | "45-min strength + 20-min cardio + mobility" |
| **Meal plan** | "Just track water intake today" | "3 meals suggested with macros" | "Full meal prep plan with shopping list" |
| **Journal** | "One word: how do you feel?" (emoji tap) | "Quick reflection: what went well today?" | "Deep journal: analyze your week's patterns" |
| **Habits** | 1 micro-habit | 3-4 habits with daily tracking | 5+ habits with streak challenges |
| **Notifications** | Max 1/day, gentle. Can go silent for days. | 2-3/day, structured reminders | 5+/day, accountability nudges |
| **Gamification** | Heavy. Every tiny win celebrated. XP for logging in. | Moderate. Streaks, achievements. | Light. Focus on metrics and progress. |

### 6.2 Behavioral Tricks (Low Motivation Specific)

Driexor's insight: low-motivation users need behavioral tricks, not just softer suggestions.

| Trick | How It Works | Example |
|-------|-------------|---------|
| **App Time Limits** | AI suggests setting screen time limits on specific apps | "You spent 3hrs on Instagram yesterday. Try setting a 1hr daily limit?" |
| **Replacement Activities** | When detecting scroll patterns, suggest alternatives | "It's 9pm, your usual scroll time. 10-min guided meditation instead?" |
| **2-Minute Rule** | Every suggestion starts with a 2-minute version | "Don't want to journal? Just write one sentence about today." |
| **Temptation Bundling** | Pair desired activity with healthy one | "Listen to your Spotify playlist (Discover Weekly) while walking" |
| **Commitment Devices** | AI asks for micro-commitments | "Can you commit to just 1 glass of water before lunch?" |
| **Social Accountability** | Share streaks with accountability partner | Future feature: invite a friend to co-track a goal |
| **Environment Design** | Suggest physical changes | "Put your running shoes by the bed tonight so they're ready for morning" |
| **Default Options** | Make healthy choice the default | Meal plan pre-confirmed — user only acts if they want to change it |

### 6.3 AI Detection & Adjustment

**Engagement Score Calculation**:
```
engagement_score = weighted average of:
  - login_frequency (daily=100, 3x/week=60, weekly=30, <weekly=10)   weight: 25%
  - suggestion_accept_rate (accepted / total suggestions shown)       weight: 30%
  - task_completion_rate (completed actions / assigned actions)        weight: 25%
  - session_depth (time spent in app per session)                     weight: 10%
  - streak_consistency (longest active streak / days since signup)    weight: 10%
```

**Tier Thresholds**:
- **High**: engagement_score > 70
- **Medium**: engagement_score 35-70
- **Low**: engagement_score < 35

**Adjustment Rules**:
- Score calculated weekly (rolling 14-day window)
- Tier only drops after 2 consecutive weeks below threshold (avoid punishing bad weeks)
- Tier can rise after 1 week above threshold (reward improvement quickly)
- AI never tells user their tier — it just adjusts behavior silently
- If user declared "high" but scores "low", AI gradually softens suggestions over 2 weeks
- If user declared "low" but scores "high", AI gradually increases challenge

**Per-Goal Motivation**:
- Each life goal can have its own motivation level
- User might be "high" for fitness but "low" for meditation
- AI respects per-goal tiers: tough workout suggestions + gentle meditation prompts in same day

### 6.4 Database Design

```sql
-- Motivation profile (one per user)
CREATE TABLE user_motivation_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  declared_tier VARCHAR(10) NOT NULL DEFAULT 'medium',  -- user's self-assessment
  computed_tier VARCHAR(10) NOT NULL DEFAULT 'medium',   -- AI-calculated
  active_tier VARCHAR(10) NOT NULL DEFAULT 'medium',     -- what's actually used (blended)
  engagement_score DECIMAL(5,2) DEFAULT 50.0,
  login_frequency_score DECIMAL(5,2) DEFAULT 50.0,
  suggestion_accept_rate DECIMAL(5,2) DEFAULT 50.0,
  task_completion_rate DECIMAL(5,2) DEFAULT 50.0,
  session_depth_score DECIMAL(5,2) DEFAULT 50.0,
  streak_consistency_score DECIMAL(5,2) DEFAULT 50.0,
  last_computed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tier_history JSONB DEFAULT '[]',  -- [{tier, date, reason}]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Per-goal motivation: uses life_goals.motivation_level column (Section 4 schema)
```

### 6.5 Onboarding Integration

Added to Step 2 of the redesigned onboarding (Section 5):

```
AI: "One more thing — how motivated are you to make changes right now?
     Be honest, there's no wrong answer."

     🔥 High — "I'm ready to go all in"
     ⚡ Medium — "I want to improve but need guidance"
     🌱 Low — "I want to change but struggle to start"

AI (if Low): "That's completely okay. We'll start with tiny steps
              that build momentum. No pressure, ever."
AI (if Medium): "Perfect. I'll give you structure and reminders
                 to keep you on track."
AI (if High): "Let's go! I'll push you with challenging goals
               and detailed plans."
```

---

## 7. What's Already Built That Supports This

Mapping recent implementation (P26-P32) + existing capabilities against the new direction. These features already support the direction reset — they need UX wrapping, not rebuilding.

### Proactive Intelligence Foundation

| Feature | Phase | How It Supports Direction Reset |
|---------|-------|-------------------------------|
| Best Day Formula | P31 | Knows what makes a "good day" → proactive daily suggestions toward repeating best days |
| Contradiction Detection | P31 | 22 rules catching conflicting behaviors → proactive nudges ("You're staying up late but want better sleep") |
| Health Correlations | P31 | 6 SQL detectors → AI can explain "why" behind suggestions ("Exercise on Tuesdays improves your Wednesday mood") |
| Prediction Accuracy | P31 | Self-improving predictions → builds user trust in AI suggestions over time |
| Weekly Reports with LLM | P31 | AI-generated narrative → extend to daily proactive summaries |
| Voice Journaling | P31 | Lower friction than typing → supports passive data collection for low-motivation users |
| Theme Detection | P31 | 15 tags from journal content → understands user's full life context, not just health |

### AI Infrastructure

| Feature | Phase | How It Supports Direction Reset |
|---------|-------|-------------------------------|
| Model Factory | P31 | 4-provider LLM cascade → robust AI infrastructure for goal decomposition |
| LangGraph Agent System | Existing | Tool-calling framework → extend for goal management tools |
| RAG Knowledge Base | Existing | Semantic search → relevant coaching content retrieval |
| Delta-Aware Conversations | P27 | AI detects changes in user state → contextual proactive messages |
| Coaching Profiles | P26 | Adherence scores, risk flags → feeds engagement scoring for motivation tiers |
| Emotional Intelligence | P29 | 16 emotion types, relationship depth → motivation-tier-aware emotional responses |

### Behavioral Intelligence

| Feature | Phase | How It Supports Direction Reset |
|---------|-------|-------------------------------|
| Proactive Messaging | P26 | Framework for AI-initiated messages → wrap in suggestion-first UX |
| Smart Message Routing | P27 | Score-and-rank top suggestions → shows 2-3 best suggestions, not all 18 |
| Behavioral Pattern Detection | P30 | 4 algorithms → detect motivation changes, trigger tier adjustment |
| Morning/Evening Check-in | P30 | Predicted-vs-actual loop → AI learns from accuracy over time |
| Longitudinal Accountability | P27 | 7d vs 30d adherence tracking → feeds computed motivation tier |
| Tough Love Escalation | P27 | Auto-escalation after 14+ low days → already implements tier behavior |

### Broader Scope Features

| Feature | Phase | How It Supports Direction Reset |
|---------|-------|-------------------------------|
| Spotify Integration | P32 | Music as life data signal — already beyond health pillars |
| Yoga & Meditation | P32 | 100+ poses, 6 meditation modes — expanded wellbeing |
| Gamification | Existing | XP, achievements, badges → motivation-tier-aware (heavy for low, light for high) |
| Habit Tracking | Existing | Full habit system → goal actions auto-create linked habits |
| Routine Management | Existing | Morning/evening routines → AI-generated routines from goals |

---

## 8. Gap Analysis — What's Missing for the New Direction

| Gap | Priority | Effort | Notes |
|-----|----------|--------|-------|
| **Life Goals system** (DB + API + UI) | P0 | 1-2 weeks | 3 new tables, goal decomposition AI service, goals page, dashboard widget, cross-linking |
| **AI-first suggestion engine** | P0 | 1-2 weeks | Wrap existing proactive messaging into suggestion-first UX with `<AISuggestionCard>` component |
| **AI stub replacement (NS-006)** | P0 | 2-3 days | Already queued — must be done for AI-first approach. Gate task for everything else. |
| **Motivation tier system** | P0 | 3-5 days | Onboarding question + DB table + engagement scoring job + suggestion calibration |
| **Suggestion-first onboarding** | P1 | 1 week | AI assessment → suggested goals → AI plan → user customizes |
| **Screen time integration** | P1 | 1 week | iOS Screen Time API or manual input + AI pattern detection |
| **UI reorganization** | P1 | 1-2 weeks | Merge scattered sections, improve pillar clarity, fix colors (Haris) |
| **Goal-pillar AI mapping service** | P1 | 1 week | Service that maps any life goal to relevant pillar features and actions |
| **`<AISuggestionCard>` component** | P1 | 2-3 days | Reusable card: suggestion + "Why this?" + Accept/Edit/Skip + goal link |
| **Suggestion tracking** | P1 | 2-3 days | Track accept/edit/skip per suggestion for AI learning |
| **Code cleanup (NS-010)** | P1 | 4-8 hrs | Debug code, unused deps — still important for code quality |
| **Automated data collection** | P2 | Varies | Calendar integration, location patterns, extended screen time |
| **Service refactoring (NS-012)** | P2 | 3-5 days | 11K-line monolith split — still needed but lower priority than new features |

### What's NOT Missing (Already Built)

These are NOT gaps — they already exist and just need UX wrapping:
- Proactive messaging framework (P26)
- Delta-aware conversation context (P27)
- Behavioral pattern detection (P30)
- Cross-domain intelligence (P31)
- LLM model factory (P31)
- Coaching profiles with adherence scoring (P26)
- Emotional intelligence engine (P29)
- Habit/routine/workout/meal systems (existing)

---

## 9. Updated Priority Queue

Reprioritized based on the direction reset. Items marked with ⚡ are new (not in current NEXT-STEPS.md).

### Tier 0: Non-Negotiable Foundation

| # | Item | Type | Effort | Notes |
|---|------|------|--------|-------|
| 1 | **AI stub replacement (NS-006)** | Dev | 2-3 days | Gate task. Nothing AI-first works without real AI. Already queued. |
| 2 | ⚡ **Life Goals system** | Dev | 1-2 weeks | New architectural layer. DB + API + goal decomposition service + UI. |
| 3 | ⚡ **Motivation tier system** | Dev | 3-5 days | Onboarding question + engagement scoring + suggestion calibration. |
| 4 | ⚡ **AI-first suggestion UX** | Dev | 1-2 weeks | `<AISuggestionCard>` + convert features to suggestion-first (workouts, meals, habits, journal). |

### Tier 1: Experience Polish

| # | Item | Type | Effort | Notes |
|---|------|------|--------|-------|
| 5 | ⚡ **Redesigned onboarding** | Dev | 1 week | AI assessment → goals → AI plan → user customizes. |
| 6 | **UI reorganization** | Design/Dev | 1-2 weeks | Fix colors (Haris), merge sections, improve goal-centric navigation. |
| 7 | ⚡ **Screen time integration** | Dev | 1 week | Manual or automated tracking + AI pattern detection. |
| 8 | ⚡ **Goal-pillar mapping service** | Dev | 1 week | AI service that decomposes any life goal into pillar actions. |
| 9 | **Code cleanup (NS-010)** | Dev | 4-8 hrs | Remove debug code, rotate keys, clean unused deps. |

### Tier 2: Foundation Maintenance

| # | Item | Type | Effort | Notes |
|---|------|------|--------|-------|
| 10 | **AI feature audit (NS-011)** | Research | 4-6 hrs | Classify every AI service as functional/partial/stub. |
| 11 | **Service refactoring (NS-012)** | Dev | 3-5 days | Split 11K-line langgraph-tools monolith. |
| 12 | **Wearable integrations (NS-007/009)** | Dev | 1-2 weeks | Fitbit, Apple Health, Google Fit via OAuthServiceFactory. |
| 13 | **Server Components (NS-013)** | Dev | 1 week | Performance improvement — lower priority than features. |
| 14 | **Test coverage (NS-014)** | Dev | 1-2 weeks | Quality gates — important but not blocking direction reset. |

### Deprioritized / Deferred

| Item | Reason |
|------|--------|
| E03 WhatsApp (NS-008) | Already deferred. Web-first confirmed by team. |
| E08-E10 story breakdowns (NS-002/003/004) | Implementation is ahead of docs. Do after direction reset stabilizes. |
| Stripe payments | Monetization comes after product-market fit with new direction. |
| WebRTC full implementation | Voice coaching works via Twilio. WebRTC is optimization, not core. |

---

## 10. Strategic Decisions Captured

Decisions made during team discussions, documented for traceability.

| Decision | Details | Owner |
|----------|---------|-------|
| **Platform** | Web-first confirmed. No mobile native app for now. | Team |
| **WhatsApp** | Deferred — already documented, reconfirmed by team. | Team |
| **Identity** | "Life Coach" — not "Health Coach" or "Fitness App". For anyone improving themselves. | Team |
| **3 Pillars** | Keep as data foundation. Do NOT remove or rename. Add Life Goals layer on top. | Team |
| **AI Approach** | AI-first everywhere. AI suggests, user overrides. Not the other way around. | Team |
| **Motivation** | User declares during onboarding + AI adjusts based on actual behavior. Per-goal overrides. | Team |
| **Scope Expansion** | Religion, relationships, career, screen time, personal growth — all valid life domains. | Team |
| **Data Entry** | Automate everything possible. Confirmation-based logging over manual entry. | Team |
| **UI Colors** | Haris is redesigning. Current colors flagged as AI-generated looking. | Haris |
| **Pillar Organization** | Sections need merging/regrouping. Data is too scattered. Goal-centric navigation preferred. | Team |

### Decisions NOT Made (Need Follow-Up)

| Question | Context | When to Decide |
|----------|---------|----------------|
| Font choice (Geist vs Lato) | Design system says Lato, code uses Geist. Both valid. | When Haris presents new color system |
| State management standardization | Redux Toolkit + React Query in code, Zustand in docs | During NS-010 code cleanup |
| Animated creatures (Ember/Sprout/Nimbus) | Extensively spec'd, implementation unknown | After UI reorganization |
| Payment implementation timing | Stripe env config exists, zero code | After direction reset stabilizes |

---

## Appendix: Audit Report Cross-Reference

### Audit Recommendations vs Direction Reset Impact

| Audit Recommendation | Priority in Audit | Priority After Reset | Change? |
|---------------------|-------------------|---------------------|---------|
| NS-010 Code Cleanup | P0 (immediate) | P1 (Tier 1) | ⬇️ Slightly deprioritized — still important but AI-first features come first |
| NS-011 AI Feature Audit | P0 (immediate) | P2 (Tier 2) | ⬇️ Less critical as standalone — merged into NS-006 work |
| WhatsApp scope decision | P0 (immediate) | Deferred | ✅ Decided: deferred |
| Security fixes | P0 (immediate) | P1 | ⬇️ Important but not direction-defining |
| NS-006 OpenAI Integration | P1 (short-term) | P0 (Tier 0) | ⬆️ Promoted — gate task for AI-first direction |
| Doc contradictions fix | P1 (short-term) | P2 | ⬇️ Docs will change again with direction reset |
| E08 story breakdown | P1 (short-term) | P2 (deferred) | ⬇️ Implementation ahead of docs — do later |
| Story status updates | P1 (short-term) | P2 (deferred) | ⬇️ Not urgent for direction reset |
| Stripe payments | P1 (medium-term) | Deferred | ⬇️ Monetization after product-market fit |

**Key Insight**: The audit was scoped to the health-app paradigm. The direction reset shifts priorities toward AI-first features and the Life Goals layer, which weren't in the audit's scope.

---

*yHealth Direction Reset — Team Feedback Synthesis*
*Generated: 2026-03-12 | Skills: EXPERT-10 (Product Manager)*
*Inputs: Team review session (Hamza, Driexor/Munther, Haris, Salman) + Audit Report + PROGRESS-DEV.md (P26-P32)*
