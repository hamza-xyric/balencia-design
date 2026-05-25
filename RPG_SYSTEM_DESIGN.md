# yHealth RPG System Design

> *"The character you are building is yourself."*

## Overview

This document defines the RPG system for yHealth (Balencia) -- a deep, World of Warcraft-inspired gamification layer where the user IS the character and real life IS the game. There is no fantasy world, no fictional avatar. Your stats reflect your actual life, your quests are your real goals, and your story is an AI-authored memoir of your journey.

The system is inspired by WoW's depth -- character progression, talent trees, quest chains, reputation systems, guilds, raids, achievements -- but grounded entirely in real self-improvement. The narrative isn't fiction. It's you.

### Design Philosophy

1. **You are the character.** Stats are auto-calculated from real activity data. No manual allocation. If you didn't do it, your character doesn't have it.
2. **The radar chart is a mirror, not a scoreboard.** The primary motivator is the shape of who you're becoming, not a number to chase.
3. **Quests are goals. Goals are quests.** The quest system layers narrative structure onto real life goals, not a parallel game.
4. **Your story is real.** AI writes your personal memoir from actual timestamps, metrics, and events. Not fiction. A biography being written in real-time.
5. **Social systems create belonging, not anxiety.** Parties and guilds are about accountability through connection. Competition is opt-in; cooperation is the default.
6. **Avoid the overjustification trap.** External rewards (XP, titles) support intrinsic motivation, never replace it. No daily XP targets. No "earn 100 XP today" prompts.

### Psychological Framework

The system is built on Self-Determination Theory's three innate needs:
- **Autonomy**: Users choose which domains to engage with, set domain weights, pick their displayed title, and are never forced into areas they don't care about.
- **Competence**: Logarithmic XP curves ensure early wins. Sub-stats provide granular feedback. Milestone tiers give clear language for where you stand.
- **Relatedness**: Parties create small-group accountability. Guilds provide community identity. Mutual streaks between friends deepen real relationships.

---

## Part 1: Character Sheet & Stats

### 1.1 The Life Domain Stats

The character is defined by **10 life domain stats**, each scored **0-99**. The scale mirrors FIFA player ratings: two digits, cognitively parseable at a glance, and there's always room to grow because the ceiling recedes as you level up. We deliberately avoid 0-100 because "100" implies perfection and completion -- there's no such thing in self-improvement.

| Domain | Description | What It Measures |
|--------|-------------|-----------------|
| **Fitness** | Exercise, movement, physical training | Workout consistency, volume, progressive overload, recovery |
| **Sleep** | Rest quality and consistency | Hours, efficiency, bedtime regularity, HRV during sleep |
| **Career** | Professional development and execution | Action completion, planning, networking, skill building |
| **Nutrition** | Eating habits and hydration | Calorie adherence, macro balance, hydration, meal consistency |
| **Finance** | Money management and discipline | Budget adherence, savings rate, debt reduction, awareness |
| **Faith** | Spiritual practice and reflection | Practice regularity, study progress, reflection depth, community |
| **Productivity** | Task and time management | Task completion, habit adherence, schedule discipline, focus quality |
| **Relationships** | Human connection and social investment | Outreach frequency, quality time, breadth of connections, reciprocity |
| **Wellbeing** | Mental and emotional health | Emotional awareness, stress management, journaling, self-care actions |
| **Meditation** | Mindfulness and contemplative practice | Session consistency, duration, technique variety, depth |

**Extensibility**: The system is designed for unlimited domain expansion. The 10 domains are the starting set. Future domains (Learning, Creativity, Hobbies, Parenting, etc.) can be added without structural changes. Domains are stored in a registry, not hardcoded.

### 1.2 How Stats Are Calculated

Every domain stat is computed from three weighted components:

```
domain_stat = (consistency * 0.40) + (depth * 0.35) + (trend * 0.25)
```

**Consistency (40% weight)** -- How regularly the user engages with this domain. Measured as active days in the last 28 days relative to the user's expected cadence. A user who works out 5/7 days per week for 4 weeks (20/28 days) has high fitness consistency. A user who meditates 3/7 days consistently (12/28) has proportionally high meditation consistency relative to their configured cadence.

**Depth (35% weight)** -- Quality and intensity of engagement. This is where sub-stats live. For Fitness, depth includes duration, volume, progressive overload, and completion rate. For Nutrition, it's calorie adherence, macro balance, and meal completeness. Each domain has domain-specific depth calculation.

**Trend (25% weight)** -- Direction of change. Compares the last 14 days to the prior 14 days. A positive trend lifts the stat; a declining trend drags it down. This ensures the stat is a living number that reflects current trajectory, not just historical accumulation.

**Critical design decision: Stats are entirely auto-calculated from activity data.** There is no manual stat point allocation. In a self-improvement app, the whole point is that your actions define your character. If you could manually inflate your Fitness to 90 without working out, the system would be dishonest.

The one exception: **domain weight preferences**. Users can adjust how much each domain contributes to their *overall* score (not the individual stat). A user who explicitly doesn't prioritize Finance can set its weight to 0, removing it from the overall calculation. This respects autonomy without enabling gaming.

### 1.3 Sub-Stats (The Depth Behind Each Number)

When you tap into a domain on the character sheet, sub-stats reveal what specifically makes up your score. Sub-stats are not shown as numbers on the main view -- they appear as qualitative breakdowns.

**Fitness sub-stats:**
- *Strength* -- Volume and progressive overload in resistance training
- *Endurance* -- Cardio duration and intensity metrics
- *Flexibility* -- Yoga and stretching session frequency
- *Recovery* -- Rest day respect, HRV response patterns
- *Consistency* -- Workout regularity over time

**Sleep sub-stats:**
- *Duration* -- Average hours per night
- *Quality* -- Sleep efficiency, HRV during sleep
- *Regularity* -- Bedtime consistency across the week

**Career sub-stats:**
- *Execution* -- Action completion rate on career goals
- *Planning* -- Goal creation, decomposition, and strategic thinking
- *Networking* -- Professional social actions logged
- *Skill Building* -- Learning-tagged activities completed

**Nutrition sub-stats:**
- *Calorie Discipline* -- Adherence to daily calorie target
- *Macro Balance* -- Protein/carb/fat ratio accuracy
- *Hydration* -- Water goal achievement rate
- *Meal Consistency* -- Regular logging and eating patterns

**Finance sub-stats:**
- *Budget Discipline* -- Spending vs. planned budget
- *Savings Rate* -- Percentage of income saved
- *Debt Reduction* -- Progress on debt paydown (if applicable)
- *Financial Awareness* -- Frequency of financial check-ins and reviews

**Faith sub-stats:**
- *Practice Regularity* -- Daily practice completion rate
- *Study Progress* -- Reading/learning session completion
- *Reflection Depth* -- Journal entries tagged to faith
- *Community* -- Social spiritual activities logged

**Productivity sub-stats:**
- *Task Completion* -- Daily task done rate
- *Habit Adherence* -- Habit check-off rate
- *Schedule Adherence* -- Planned vs. actual time blocks
- *Focus Quality* -- Deep work session completion

**Relationships sub-stats:**
- *Outreach* -- Frequency of initiating contact
- *Quality Time* -- Time spent with people (logged)
- *Breadth* -- Number of distinct relationships maintained
- *Reciprocity* -- Balance of giving and receiving attention

**Wellbeing sub-stats:**
- *Emotional Awareness* -- Check-in frequency and specificity
- *Stress Management* -- Stress log + coping action frequency
- *Journaling Depth* -- Entry length, frequency, and insight quality
- *Self-Care Actions* -- Breathing exercises, mindfulness moments

**Meditation sub-stats:**
- *Session Consistency* -- Regularity of practice
- *Session Duration* -- Average session length
- *Technique Range* -- Variety of meditation types practiced
- *Depth* -- Rated difficulty level and self-reported focus quality

### 1.4 Overall Character Level

The overall character level aggregates all domain stats into a single number that represents the user's holistic life proficiency.

```
overall_power = weighted_average(all active domain stats) + balance_bonus

where:
  balance_bonus = (min_active_stat / max_active_stat) * 10
  level = floor(overall_power / 4) + 1
```

This yields levels 1-25 as the normal range.

The **balance bonus** is the key design insight: it rewards well-rounded development. A user with all stats at 50 gets a higher bonus than a user with one stat at 90 and the rest at 10. The system says: *"Specialization is valuable, but balance is power."*

**Active domains** = domains with > 0 activity in the last 90 days. If a user only engages with 5 of 10 domains, the overall score is calculated from those 5. Inactive domains show as "Lv. 0" on the character sheet -- visible but not punishing.

### 1.5 The Radar Chart

The radar chart is the centerpiece of the character sheet. It's a 10-sided polygon on a radial grid that shows all 10 domain stats simultaneously. At a glance, the user sees the *shape* of who they are.

**Visual design:**
- 280pt canvas, 5 concentric rings at stat values 20, 40, 60, 80, and 99
- Each of the 10 axes represents a domain, labeled with abbreviation (FIT, SLP, CAR, etc.)
- The user's stats form a filled polygon; the shape itself tells the story
- A circle = balanced. A spiky star = specialist. Neither is wrong, but balance is rewarded.

**Temporal views:**
- **Current** (default): Stats as of today
- **Weekly comparison**: Current polygon (solid) overlaid with last week's (dashed ghost). Growth areas glow; decline areas tint red.
- **Monthly comparison**: Same overlay treatment, broader delta
- **Historical playback**: A slider scrubs through weekly snapshots. This is "the time-lapse of your life" -- watch the polygon grow, shift, and evolve over months.

**Character Power (CP):**
A single competitive number displayed below the chart:
```
CP = sum(all active domain stats) * balance_multiplier

balance_multiplier = 1.0 + (0.15 * (1 - coefficient_of_variation(active_stats)))
```
Perfectly balanced stats get up to a 15% bonus. This makes a balanced Level 15 user score higher than an unbalanced specialist at the same average.

**Growth animation:** When a stat increases from new activity, the vertex dot pulses and the polygon edge glows in the domain color. The user sees their shape shift in real-time.

---

## Part 2: Leveling & XP

### 2.1 Per-Domain XP Curve

Each domain has its own XP pool that maps to a domain level (1-25). The curve is logarithmic -- designed to front-load early wins and create natural plateaus at higher levels.

```
xp_required(level) = 100 * level^1.5

Level 1:   0 XP
Level 2:   100 XP        (first few days)
Level 3:   283 XP        (first week)
Level 5:   800 XP        (weeks 1-2)
Level 10:  3,162 XP      (months 1-2)
Level 15:  5,809 XP      (months 2-4)
Level 20:  8,944 XP      (months 4-8)
Level 25:  12,500 XP     (6+ months sustained)
```

**Why this curve:**
- Early levels come fast. A new user hits Level 3-4 in the first week. Immediate competence feedback.
- Mid-game (levels 10-15) takes weeks of consistent engagement, matching the real habit formation window (research shows 21-66 days).
- Late-game (levels 20-25) takes months, reflecting genuine expertise and sustained commitment.
- True exponential curves (2^n) would make high levels feel punishing and unreachable. This curve is "gently steep" -- always attainable but always requiring effort.

### 2.2 XP Sources

| Domain | XP-Earning Actions | Base XP |
|--------|-------------------|---------|
| Fitness | Workout completed, yoga session | 75, 45 |
| Sleep | Sleep logged (7+ hours), consistent bedtime | 25, 15 |
| Career | Career action completed (networking/planning/skill) | 10-20 |
| Nutrition | Meal logged, water goal achieved | 25, 25 |
| Finance | Financial check-in, budget reviewed, savings deposited | 5, 15, 25 |
| Faith | Daily practice completed, reading session | 10, 15 |
| Productivity | Habit checked, routine completed, schedule followed | 10, 25, 15 |
| Relationships | Interaction logged, quality time logged | 15, 25 |
| Wellbeing | Mood check-in, journal entry, breathing session | 10, 25, 25 |
| Meditation | Meditation session completed, breathing exercise | 50, 25 |

### 2.3 Dual Level System

Both exist simultaneously:

1. **Overall Character Level** (the big number): Derived from the aggregate power score. This is what shows on the profile, in leaderboards, and as the primary identity.

2. **Per-Domain Levels** (the grid): Each domain has its own level 1-25, displayed in the domain skill grid on the character sheet. These are the "build" of your character -- two Level 15 overall users might have wildly different domain distributions.

There is no double-dipping: a single action (e.g., logging a workout) awards domain XP to Fitness, recalculates the Fitness stat, and that propagates to the overall score.

### 2.4 Level-Up Events

**Domain level-up** (e.g., Fitness Level 7 -> 8):
- Small celebration toast notification
- +25 XP bonus
- AI coach mentions it in next coaching message
- Domain stat recalculates with slight boost

**Overall level-up** (e.g., Overall Level 12 -> 13):
- Full-screen celebration overlay with confetti
- New rank title unlocked (if crossing a tier boundary)
- AI congratulatory message personalized with recent activity data
- Real-time event broadcast for social feed

### 2.5 Level Tier Unlocks

| Level | Rank Title | What Unlocks |
|-------|-----------|-------------|
| 1-3 | Beginner | Basic character sheet, domain tracking |
| 4-7 | Apprentice | Custom domain weights, streak freeze economy |
| 8-12 | Dedicated Explorer | Full radar chart history, monthly comparisons |
| 13-18 | Rising Champion | Title customization, leaderboard "Around Me" view |
| 19-25 | Life Architect | Prestige eligibility, mentor badge, advanced analytics |
| 26+ | Grand Master | Prestige levels, custom titles, legacy achievements |

### 2.6 Prestige System

When a user hits Level 25 in a domain, they can **prestige** that domain:
- Domain level resets to 1 (but the stat value never resets -- the stat is activity-based, not level-based)
- Awards a permanent **prestige star** next to the domain name
- Unlocks a prestige-exclusive title for that domain
- Multiplies future XP earned in that domain by **1.1x per prestige level** (compounding)
- Records in permanent history

A user can prestige the same domain multiple times. Each star is a badge of sustained commitment. A domain with 3 prestige stars has been maxed and reset 3 times -- that's years of dedicated practice.

### 2.7 Recovery Multiplier (Rested XP)

Rest should feel strategic, not like failure.

- When a user takes a deliberate rest day (marked as rest in activity status or via streak freeze), the **next active day earns a 1.3x XP multiplier** on all actions.
- This stacks with the streak multiplier but **caps at 2.0x total**.
- Reframes rest as: "I'm banking energy for a bigger tomorrow."

**Diminishing returns on overtraining:** If a user logs activities across 7+ domains in a single day, XP for the 8th+ domain actions is reduced to 50%. This discourages manic completionism and encourages sustainable pacing.

---

## Part 3: Titles & Ranks

### 3.1 Title System

A title is a text label displayed beneath the user's name on their character sheet, profile, and leaderboard entries. Titles serve as identity signals -- they tell others (and yourself) what kind of person you are building.

Users have **one active/displayed title** at a time but collect all earned titles in an inventory. They can switch their displayed title freely.

### 3.2 Title Sources

| Source | Description | Example |
|--------|-------------|---------|
| Rank titles | Automatic, based on overall level tier | "Dedicated Explorer" at Level 8 |
| Domain titles | Earned at domain level milestones | "Iron Body" at Fitness Level 15 |
| Achievement titles | Earned from specific achievements | "Trailblazer" for first Epic Quest completion |
| Streak titles | Earned from streak milestones | "Centurion" for 100-day streak |
| Rare titles | Dropped from variable reward system (1% rate) | "Eternal Flame" |
| Prestige titles | Earned through domain prestige | "Transcendent [Domain]" |
| Cross-domain titles | Earned from multi-domain milestones | "Renaissance Person" |

### 3.3 Title Rarity Tiers

| Tier | Visual Treatment | Acquisition |
|------|-----------------|------------|
| **Common** | White text, no decoration | Automatic from rank levels |
| **Uncommon** | Cyan/teal text | Earned from domain milestones |
| **Rare** | Purple text, subtle glow | Hard achievements or combinations |
| **Epic** | Orange/gold text, glow | Prestige or cross-domain feats |
| **Legendary** | Animated gradient (gold-to-orange), particle effect | 1% drops or extreme milestones |

### 3.4 Domain Titles

Each domain awards titles at levels 5, 10, 15, 20, and 25:

| Domain | Lv.5 | Lv.10 | Lv.15 | Lv.20 | Lv.25 |
|--------|-------|-------|-------|-------|-------|
| Fitness | Active Mover | Gym Regular | Iron Body | Peak Athlete | Physical Elite |
| Sleep | Early Riser | Sound Sleeper | Sleep Optimized | Dream Architect | Circadian Master |
| Career | Go-Getter | Career Builder | Strategic Mind | Industry Player | Career Architect |
| Nutrition | Mindful Eater | Nutrition Aware | Diet Craftsman | Macro Master | Nutrition Savant |
| Finance | Budget Starter | Money Conscious | Wealth Builder | Financial Strategist | Money Master |
| Faith | Seeking Soul | Devoted Practitioner | Faithful Heart | Spiritual Guide | Inner Light |
| Productivity | Task Starter | Routine Builder | Efficiency Engine | Time Architect | Productivity Savant |
| Relationships | Reaching Out | Connected | Deep Bonds | Circle Keeper | Relationship Architect |
| Wellbeing | Self-Aware | Emotionally Tuned | Resilient Mind | Inner Fortress | Wellbeing Sage |
| Meditation | Calm Seeker | Still Mind | Mindful Presence | Deep Stillness | Meditation Master |

### 3.5 Cross-Domain Titles

Earned by achieving specific combinations, rewarding balanced life development:

| Title | Rarity | Requirement |
|-------|--------|-------------|
| "Balanced Beginner" | Uncommon | 5+ domains at Level 3+ |
| "Renaissance Person" | Rare | 7+ domains at Level 5+ |
| "Life in Balance" | Rare | All 10 domains at Level 5+ |
| "Polymath" | Epic | 5+ domains at Level 10+ |
| "Life Architect" | Epic | All 10 domains at Level 10+ |
| "Complete Being" | Legendary | All 10 domains at Level 15+ |
| "Grand Master" | Legendary | Overall Level 25+ with 3+ prestige stars |

---

## Part 4: Quest System

### 4.1 Foundational Principle: Quests ARE Goals

The quest system does not create a parallel entity. It layers a quest taxonomy, chain system, and difficulty scaling *on top of* existing goals. Every feature that currently reads goals automatically benefits from quest metadata. A quest is just a goal with RPG context.

### 4.2 Quest Types

**Epic Quests** -- Life-Changing Transformation
- Duration: 6-24 months
- Examples: "Lose 50lbs", "Launch a business", "Run an ultramarathon", "Pay off all debt"
- Composed of multiple Main Quests chained together
- Epic Quests are never AI-generated without user initiation -- they require a deliberate declaration
- XP: +1,000-5,000 on completion
- Completing an Epic Quest triggers a full chapter in the user's story and grants a permanent title

**Main Quests** -- Long-Term Goals
- Duration: 4-16 weeks
- Examples: "Run a half marathon", "Save $5,000 by December", "Read 20 books"
- Decomposed by the AI coach into actionable steps with milestones
- XP: +150-500

**Side Quests** -- Exploratory, Breadth-Building Goals
- Duration: 1-4 weeks
- Examples: "Try a new cuisine", "Read one book on meditation", "Write 3 journal entries about career"
- Suggested by AI when it detects domain imbalance on the radar chart
- XP: +50-150
- Completing a Side Quest in a new domain can unlock a Main Quest suggestion in that domain

**Weekly Quests** -- Bigger Commitments, Reset Each Week
- Duration: 7 days, generated fresh each week by AI
- Examples: "Complete 3 strength sessions", "Meal prep Sunday", "Meditate 5 of 7 days"
- A set of 2-5 conditions that must be met within the week
- XP: +75-200

**Daily Quests** -- Recurring Habits
- Duration: 1 day, resets daily
- Examples: "10min morning yoga", "Log meals", "Drink 8 glasses of water"
- These are existing habits with quest framing. AI occasionally references daily quest completion in story chapters.
- XP: +10 per completion, streak multiplier applies

**Group Quests** -- Social Activities
- Duration: Variable
- Examples: "Eat a healthy dinner with friends", "Play a sport together this weekend", "Complete a 30-day challenge with your partner"
- All participants must confirm completion
- XP: +100-300, plus a **+25% social multiplier** for all participants

### 4.3 Quest Chains

Quest chains create narrative progression. Completing one quest unlocks the next, forming a journey.

**Sequential Chain:**
Run 5K consistently -> Run a 10K race -> Train for a half marathon -> Run a half marathon

**Branching Chain:**
After "Save $2,000 emergency fund", choose one:
- Invest for retirement
- Pay off credit card debt
- Start a side business fund

**Cross-Domain Chain:**
Improve sleep quality to 7+ hours (Sleep) -> Morning workout routine (Fitness, unlocked because better sleep enables early rising) -> Meal prep Sundays (Nutrition, unlocked because consistent energy from sleep + exercise makes weekly planning feasible)

The AI generates chain suggestions when a user creates a Main Quest. It appears as a "What comes next" section on the quest detail screen. Users can accept, modify, or dismiss.

### 4.4 Quest Difficulty Scaling

Quest difficulty adapts to the user's overall level AND their domain-specific level. A user at overall Level 14 but with Fitness at Lv.12 and Finance at Lv.3 will receive advanced fitness quests but beginner finance quests.

| Tier | Level Range | Quest Character |
|------|------------|----------------|
| Tier 1 | 1-3 (Beginner) | Micro-actions, 2-minute-rule habits, low commitment |
| Tier 2 | 4-7 (Apprentice) | Standard commitments, 4-5 actions per quest |
| Tier 3 | 8-12 (Explorer) | Cross-domain quests, scheduling, broader commitments |
| Tier 4 | 13-18 (Champion) | Complex chains, Epic Quest eligibility, group quests suggested |
| Tier 5 | 19-25 (Architect) | Full autonomy, custom chains, AI as strategic advisor |
| Tier 6 | 26+ (Grand Master) | Mentor mode, create template quests for community |

### 4.5 Quest Rewards

| Reward Type | Description |
|-------------|------------|
| **XP** | Domain-specific XP based on quest type (see XP ranges above) |
| **Titles** | Permanent text labels for milestone quests and epic completions |
| **Story Progression** | The most meaningful reward -- completing quests triggers narrative chapters |
| **Chain Unlocks** | Completing a quest unlocks the next in its chain |
| **Social Multiplier** | +25% for group quests completed with others |

### 4.6 Handling Failure and Setbacks

This is a critical design decision. Setbacks are part of the story, not aberrations.

**Missed Daily Quests:** Streak freezes cover planned rest. Unexcused misses break the streak but AI frames it as "a rest day, not a failure." The story engine writes these as "quiet days."

**Stalled Main Quests:** If no progress for 7+ days, the AI coach sends a proactive coaching message: "Your marathon training has been quiet this week. Want to adjust the plan, take a strategic rest, or set it aside?" Options: adjust timeline, reduce scope, pause, archive.

**Abandoned Quests:** Can be paused (preserves state) or archived (partial XP awarded proportional to progress). Never deleted. The story engine writes them as "paths explored and set aside" -- honest, not shameful.

**Failed Epic Quests:** AI suggests restructuring: breaking into smaller pieces, extending the timeline, or pivoting the approach. The story frames this as "the ordeal" phase.

### 4.7 AI-Generated Personalized Quests

AI generates quests from three data sources:

1. **User goals and onboarding data**: Initial life area selections and coaching preferences seed the first Main Quests.
2. **Behavioral pattern analysis**: AI detects patterns like "user exercises consistently but never logs meals" and suggests a Side Quest in Nutrition.
3. **Cross-domain correlations**: "Your sleep improves 30% on workout days. Let's build a quest around that connection."

### 4.8 Quest Board

The Quest Board replaces the flat goal list with a layered, RPG-aware view:

- **Active Quests Overview**: Current quest load at a glance
- **Category filters**: Epic, Main, Side, Weekly, Daily, Group
- **Pinned quests** (up to 3): Appear at the top of the board AND on the home screen
- **Quest chains**: Visual chain progression showing what's been completed and what unlocks next
- **Suggested quests**: AI-generated suggestions the user hasn't accepted yet
- **Quest timer**: Weekly quests show countdown; Main quests show milestone proximity

### 4.9 Quest Journal

The reflective counterpart to the Quest Board:
- Completed quest entries with date, XP earned, duration, and AI-authored 2-3 sentence summary
- Story chapter links (tap a completed quest to see which chapters reference it)
- Archived quest entries with contextual notes about why they were set aside
- Photo memories inline from progress photos taken during the quest period

---

## Part 5: AI Story Engine

### 5.1 Core Concept

The Story Engine is yHealth's most distinctive feature. It transforms the user's health data, quest completions, emotional check-ins, conversations with the AI coach, and life events into a continuous, evolving narrative.

This is NOT a fantasy novel. The user is themselves. The setting is their actual life. The language is grounded, warm, occasionally poetic, and always honest. The story reads like the kind of personal essay you'd find in a quality magazine -- observant, specific, and respectful of the reader's intelligence.

The more information the user provides, the richer the story becomes. Every data point is potential narrative material. And reviewing your story -- reading the arc of where you've been and where you're going -- becomes one of the most powerful motivational features in the app.

### 5.2 Chapter Triggers

Chapters are **event-based, not time-based**. A new chapter is triggered by:

| Trigger | Example |
|---------|---------|
| Quest completion (Main or Epic) | Finishing "Run a Half Marathon" generates a chapter covering the full journey |
| Major milestone | 90-day streak, new rank tier, domain mastery achievement |
| Significant life event | Job change, relationship milestone, health event (logged via AI chat or journal) |
| Setback followed by recovery | Breaking a 43-day streak and then rebuilding to 7 days |
| Cross-domain breakthrough | AI detects that sleep improvements caused fitness gains |
| 30-day fallback | If no trigger fires for 30 days, a "quiet chapter" reflects on steady maintenance |

### 5.3 The Hero's Journey

Each chapter is tagged with a Hero's Journey phase. Real life is cyclical with multiple simultaneous arcs across domains, but the framework gives the AI a narrative lens for framing events.

**Phase 1: The Ordinary World** -- *"Before"*
- Triggered by: Onboarding data, initial assessment
- Content: What was life like before they committed? What patterns were they stuck in?
- Tone: Observational, not judgmental.
- *"Mornings started with the alarm going off three times. Coffee before water. Lunch was whatever was close."*

**Phase 2: The Call to Adventure** -- *"The Decision"*
- Triggered by: First goal creation, onboarding completion
- Content: Why did they start? What was the catalyst?
- Tone: Honest about the mix of hope and uncertainty.
- *"There wasn't a single dramatic moment. More a quiet accumulation of not-quite-right."*

**Phase 3: Crossing the Threshold** -- *"First Steps"*
- Triggered by: First week of consistent activity, first streak milestone
- Content: Early wins, awkwardness of new routines, first evidence that change is possible.
- Tone: Warm, specific. References real data.
- *"Day four was the first time the morning run happened without negotiating with the alarm."*

**Phase 4: Trials and Allies** -- *"Building the System"*
- Triggered by: Multi-week engagement, accountability partner activation, cross-domain activity
- Content: How habits interlock, what AI noticed about patterns, who showed up.
- Tone: Detailed, coaching-oriented observation.
- *"The connection between Tuesday meal prep and Thursday energy levels became undeniable by week six."*

**Phase 5: The Ordeal** -- *"The Hard Part"*
- Triggered by: Streak breaks, quest stalls, plateaus, low mood check-ins
- Content: This is where the story earns its authenticity. AI does not skip setbacks.
- Tone: Honest and compassionate. Never blaming.
- *"The streak broke on day 43. Not because of laziness -- because of a Tuesday that demanded everything and left nothing."*

**Phase 6: The Reward** -- *"The Payoff"*
- Triggered by: Quest completion, personal records, significant metric improvements
- Content: The achievement, contextualized by what it took to get there.
- Tone: Celebratory but grounded.
- *"132 days between 'run a 5K' and crossing a half marathon finish line. 47 training sessions. 3 pairs of shoes."*

**Phase 7: The Return** -- *"Giving Back"*
- Triggered by: Mentoring others, community leadership, creating template quests
- Content: How mastery creates capacity to help others.
- Tone: Reflective, forward-looking.
- *"Somewhere between level 18 and level 22, the questions changed. Not 'can I do this?' but 'who else needs this?'"*

### 5.4 Chapter Anatomy

Each chapter includes:
- **Title**: Evocative, never generic (*"The Morning After the Decision"*, not *"Week 3 Summary"*)
- **Subtitle**: What the chapter is about (*"How three weeks of 6am alarms became the anchor"*)
- **Body**: 300-800 words of narrative prose
- **Data citations**: Specific metrics, timestamps, and events woven into the prose. Tappable in the UI to see source data.
- **Mood arc**: Emotional trajectory across the chapter period (visualized as a subtle gradient)
- **Hero's Journey phase tag**: Small, understated badge

### 5.5 Narrative Tone Guidelines

The AI writes as a personal biographer. The brand voice is: grounded, warm, coaching-like, quietly confident.

**Rules for the AI narrator:**
- Write like a quality memoir essayist. Observe, contextualize, celebrate.
- Use real data: timestamps, metrics, streak counts, domain scores. Specificity is what makes it feel personal.
- Do not fictionalize or embellish. If the user ran 5K, do not say they conquered a mountain.
- Do not moralize. Do not say "you should have" or "this proves that."
- Handle setbacks with the same weight and respect as victories.
- The tone adapts to the user's coaching preference (supportive, data-driven, push-hard, mixed).

### 5.6 Handling Setbacks in Narrative

**Never write**: "You failed." "You should have." "This was a setback." "You didn't stick with it."

**Instead write**: "The routine shifted." "Other priorities surfaced." "The body asked for rest." "A different chapter began."

Setbacks are part of the Hero's Journey. The "Ordeal" phase is not a bug -- it's the most important part of the story. The comeback chapter that follows is what makes the narrative compelling.

### 5.7 Retroactive Enrichment

When new data arrives (e.g., connecting a wearable months after joining), the AI can offer to revise past chapters with newly available context. The system asks: "I found new data that could make Chapter 3 richer. Want me to revise it?" The user can preview the diff and accept or decline. Always opt-in.

### 5.8 Story Review Experience

The story is read from a dedicated "Your Story" screen:
- **Book-like presentation**: Full-width prose, generous margins, comfortable reading typography
- **Chapter navigation**: Horizontal swipe or vertical scroll through the full story
- **Tappable data callouts**: Metrics referenced in prose are tappable. Tapping "47 training sessions" shows the actual workout log for that period.
- **Mood arc visualization**: Subtle gradient at the top of each chapter showing emotional trajectory
- **Timeline spine**: Left margin shows a thin vertical timeline with month markers and domain-colored dots

### 5.9 Story Sharing

Individual chapters can be shared:
- **Share to social**: Renders as a styled card image with branding, chapter title, one pull-quote. No personal metrics by default.
- **Share with accountability partner**: Full chapter visible within the app.
- **Privacy controls**: Preview shows exactly what will be shared. User can opt specific data points back in.

---

## Part 6: Reputation System

### 6.1 Concept

Reputation is a per-domain measure of **sustained, consistent engagement** over time. Unlike XP (cumulative, never decreases), Reputation reflects current mastery and active practice. It answers: *"How seriously does this person engage with their fitness / nutrition / career right now?"*

### 6.2 Reputation Tiers

| Tier | Title | RP Required | Visual |
|------|-------|-------------|--------|
| 0 | Unranked | 0 | Gray dot, dimmed |
| 1 | Beginner | 100 | White dot |
| 2 | Apprentice | 350 | Green dot |
| 3 | Journeyman | 750 | Blue dot |
| 4 | Expert | 1,500 | Purple dot |
| 5 | Master | 3,000 | Orange dot with glow |
| 6 | Grandmaster | 6,000 | Gold dot with animated shimmer |

### 6.3 Earning Reputation Points (RP)

| Activity | RP Earned | Daily Cap |
|----------|----------|-----------|
| Complete any domain-specific activity | +5 RP | +25 RP per domain per day |
| Complete a domain-specific quest | +30 RP | No cap |
| 7-day streak within domain | +20 RP bonus | Weekly |
| Complete a domain-specific achievement | +15 RP | Per event |
| Contribute domain knowledge to guild | +10 RP | +20 RP per day |

The **daily cap prevents burst-grinding**. A user cannot gain more than 25 RP per domain per day from regular activities. Reputation reflects weeks and months of consistent effort, not a single 12-hour marathon.

### 6.4 Reputation Decay

Reputation decays if a domain is neglected:

| Inactivity Period | Daily RP Decay | Rationale |
|-------------------|---------------|-----------|
| 0-3 days | 0 | Grace period -- life happens |
| 4-7 days | -3 RP/day | Gentle nudge |
| 8-14 days | -5 RP/day | Noticeable decline |
| 15-30 days | -8 RP/day | Significant regression |
| 30+ days | -12 RP/day (capped at tier floor) | Cannot decay below current tier minimum |

**Tier floor protection**: Reputation can decay within a tier but **cannot cause a tier demotion in a single day**. Demotion happens only if RP stays below the tier threshold for 7 consecutive days. A single bad week shouldn't erase months of work.

### 6.5 Reputation Unlocks

| Tier | What Opens Up |
|------|--------------|
| Beginner (1) | Domain visible on profile, basic domain achievements available |
| Apprentice (2) | Deeper AI coaching in this domain |
| Journeyman (3) | Can create guild quests in this domain, domain badge on profile |
| Expert (4) | "Expert" tag visible to party/guild members, can create competitions in this domain |
| Master (5) | +10% XP bonus in this domain, can mentor other users, Master badge |
| Grandmaster (6) | +15% XP bonus, domain Hall of Fame, can create guild raids, Grandmaster badge |

### 6.6 Cross-Domain Reputation Synergies

When related domains are both at Apprentice (tier 2) or higher, passive XP bonuses activate:

| Domain Pair | Synergy Bonus | Why |
|------------|---------------|-----|
| Fitness + Nutrition | +5% XP in both | Exercise and diet reinforce each other |
| Sleep + Wellbeing | +5% XP in both | Good sleep improves mental health |
| Productivity + Career | +5% XP in both | Getting things done accelerates career |
| Meditation + Faith | +5% XP in both | Contemplative practices overlap |
| Relationships + Wellbeing | +5% XP in both | Social connection improves mental health |
| Finance + Productivity | +5% XP in both | Financial discipline requires productivity habits |

Maximum total cross-domain bonus: **+15% XP**. Prevents stacking from becoming overpowered.

---

## Part 7: Social RPG Systems

### 7.1 Parties -- Temporary Quest Squads

A party is a **temporary, goal-oriented group of 2-5 people** tackling specific quests together. If a Guild is "the gym itself," a Party is "the friends you texted to go to the gym Saturday morning."

Built on WoW's core social insight: **the fear of letting down your party is more motivating than personal reward.**

**Formation:**
- Create a party from the social tab, Party Finder, or from a Group Quest
- Name it, optionally pick an emoji icon, bind it to a quest
- Invite members via direct invite, share link, or Party Finder suggestions
- Party activates when at least 2 members accept
- Maximum 3 active parties per user

**Scoring modes:**
- **Collective**: Every member must complete the quest for the party to succeed (strongest accountability)
- **Cumulative**: Combined efforts count toward a shared target (e.g., "Walk 100km total as a party")
- **Any-complete**: At least N of M members must complete

**Party buffs (passive bonuses for active party membership):**

| Buff | Effect | Condition |
|------|--------|-----------|
| Party Momentum | +10% XP on all actions | Party is active with a bound quest |
| Synergy Bonus | +15% XP when 2+ members do same action type on same day | Automatic detection |
| Streak Shield | One free missed day per week without breaking streak | Party active for 7+ days |
| Party Completion Bonus | +25% XP on quest completion | Full party collectively completes bound quest |

**Party Chat:** Auto-created when party forms. Includes standard messaging, quest progress cards (injected when members log activity), nudge button, and a party status widget showing quest name, progress bar, and member activity indicators.

**Party Finder:** Matches users by:
- Goal alignment (35%)
- Schedule compatibility (25%) -- morning person matches morning person
- Activity level parity (20%) -- prevents mismatched commitment levels
- Location proximity (10%) -- timezone matching
- Streak compatibility (10%)

### 7.2 Guilds -- Persistent Communities

A guild is a **persistent community** that outlives any individual quest. Users belong to a guild for months or years. Guilds evolve from existing community rooms by adding progression, reputation, and shared identity.

**Guild creation:** Any Plus-tier user can create a guild with a name, description, icon, primary domain focus, visibility (public/private), and capacity (scales with guild level).

**The guild itself levels up** from cumulative member activity:

| Activity | Guild XP Earned |
|----------|----------------|
| Member daily activity | +2 Guild XP per member (max 10/member/day) |
| Member completes a quest | +20 Guild XP |
| Guild quest milestone | +50 Guild XP |
| Guild raid completed | +200 Guild XP |
| New member joins | +10 Guild XP (one-time) |
| Member streak milestone (7/14/30/60/90 days) | +25/50/100/200/500 Guild XP |

**Guild Level Progression:**

| Level | Guild XP | Capacity | Perks |
|-------|----------|----------|-------|
| 1 | 0 | 10 | Basic guild chat, 1 active quest |
| 3 | 1,500 | 25 | 2 quests, announcement channel |
| 5 | 5,000 | 35 | Guild leaderboard, **raid quests unlock** |
| 7 | 12,000 | 50 | 3 quests, guild emblem on member profiles |
| 10 | 30,000 | 75 | Exclusive guild badge, 5 quests |
| 15 | 75,000 | 100 | Guild Hall (custom profile section), +5% XP buff |
| 20 | 150,000 | 150 | Legendary status, gold emblem |

**Guild Raids** (require guild level 5+): Multi-stage, time-limited challenges requiring coordinated effort.

Example -- *"The 30-Day Transformation":*
- Stage 1 (Days 1-7): "Foundation" -- 80% of members log activity 5/7 days
- Stage 2 (Days 8-14): "Momentum" -- Guild cumulative 500 workouts
- Stage 3 (Days 15-21): "Challenge" -- 60% of members hit a new personal streak record
- Stage 4 (Days 22-30): "Summit" -- Guild maintains 90% daily activity rate for 9 consecutive days

Each stage unlocks the next. Partial completion still grants proportional rewards.

**Guild Roles:** Leader (1), Officers (up to 5, scaling 1 per 20 members), Members (unlimited to capacity).

**Guild Ranking:** Global leaderboard ranked by composite score that heavily weights Active Member Ratio (members active in past 7 days / total members). A 20-person guild where everyone is active beats a 100-person guild with 80 ghosts.

### 7.3 Parties vs. Guilds

| Dimension | Party | Guild |
|-----------|-------|-------|
| Size | 2-5 | 10-150 |
| Lifespan | Temporary (days/weeks) | Persistent (months/years) |
| Purpose | Execute specific quests together | Long-term community and identity |
| Progression | None (party itself doesn't level) | Guild levels up over time |
| Formation | Quick, lightweight | Intentional, investment |
| Social vibe | "Gym buddies this Saturday" | "My fitness community" |

### 7.4 Accountability Extensions

**Quest Witness**: Assign an accountability partner to a quest. The witness receives start/progress/completion notifications and can "vouch" for real-world activities that can't be auto-tracked (e.g., "Cook a healthy meal with friends").

**Mutual Streaks**: When two accountability partners both complete domain activity on the same day, their mutual streak increments. Milestone rewards at 7/14/30/60/90 days grant both partners bonus XP.

**Nudge System**: 3 pre-written templates (gentle reminder, encouragement, challenge). Max 2 nudges per partner per day, 4-hour cooldown. AI-powered auto-nudge option available.

**Privacy Controls**: Per-domain visibility (Full / Activity Only / Streak Only / Achievements Only / None). Users control exactly what their accountability partners can see.

---

## Part 8: Achievement System

### 8.1 Achievement Tiers (5-tier rarity)

| Tier | Color | XP Range | Unlock Rate |
|------|-------|----------|------------|
| Common | White | 50-100 XP | ~60% of users |
| Uncommon | Green | 100-250 XP | ~35% of users |
| Rare | Blue | 250-500 XP | ~15% of users |
| Epic | Purple | 500-1,500 XP | ~5% of users |
| Legendary | Orange with glow | 1,500-5,000 XP | ~1% of users |

### 8.2 Achievement Categories

Each of the 10 life domains gets its own achievement track, plus cross-cutting categories:

- **Per-domain** (Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing, Meditation) -- milestones specific to each life area
- **Cross-Domain** -- achievements spanning multiple domains ("Renaissance": Level 5 in 5+ domains)
- **Social** -- party, guild, and accountability achievements ("Team Player": complete 10 party quests)
- **Seasonal** -- time-limited, event-based achievements (become Feats of Strength after season ends)

### 8.3 Meta-Achievements

Complete a set of related achievements to unlock a parent meta-achievement with a larger reward:

| Meta-Achievement | Requirements | Rarity | XP |
|-----------------|-------------|--------|-----|
| "Pillar Master" | All Common achievements in Fitness + Nutrition + Wellbeing | Epic | 1,000 |
| "Domain Explorer" | 1+ achievement in 7 different domains | Rare | 500 |
| "Streak Sovereign" | Week Warrior + Two Week Titan + Month Master | Epic | 750 |
| "Life Architect" | Level 10 in 5+ domains simultaneously | Legendary | 3,000 |
| "Social Butterfly" | 5 party quests + 3 guild raids + 30-day mutual streak | Legendary | 2,500 |

### 8.4 Feats of Strength

Time-limited, prestigious accomplishments with gold shimmer treatment. Once the window closes, they can never be earned again.

- "Founding Member" -- Joined during launch month
- "Summer 2026 Champion" -- Won the seasonal competition
- "Ramadan Discipline" -- Maintained streak throughout Ramadan 2026
- "New Year Resolute" -- Created and completed a goal within January
- "Guild Pioneer" -- Created one of the first 100 guilds

### 8.5 Hidden Achievements

Title and description obscured until unlocked. Show as "???" with a cryptic one-line hint.

- **"Night Owl"** (hint: "The moon sees all.") -- Complete a workout between 11 PM and 5 AM
- **"The Comeback"** (hint: "Falling is not failure. Staying down is.") -- Resume after a 14+ day break, maintain a 7-day streak
- **"Anniversary"** (hint: "Time flies when you're growing.") -- Still active on the 1-year anniversary of account creation

### 8.6 Achievement Points (AP)

A currency separate from XP, earned exclusively from achievements. AP unlocks cosmetic rewards:

| AP Source | Points |
|-----------|--------|
| Common achievement | 5 AP |
| Uncommon achievement | 10 AP |
| Rare achievement | 25 AP |
| Epic achievement | 50 AP |
| Legendary achievement | 100 AP |
| Meta-achievement | 75 AP |
| Feat of Strength | 150 AP |

**AP Unlocks:**
- 50 AP: Custom profile border color
- 150 AP: Achievement showcase on profile (display 3 pinned achievements)
- 300 AP: Animated profile avatar border
- 500 AP: Custom title selection
- 1,000 AP: "Champion" profile flair visible to guild/party members

### 8.7 Achievement Showcase

The character sheet includes a pinned achievement section:
- 3 user-selected achievements displayed as large badge cards with rarity glow
- Total achievement count and AP count
- Rarity breakdown bar (visual proportions of Common through Legendary)
- Visible to other users on the profile

---

## Part 9: Milestone Tier System

Each domain has a 7-tier progression ladder calibrated to evidence-based health behavior change research:

| Tier | Name | Stat Range | Approx Timeline | Real-World Meaning |
|------|------|-----------|-----------------|-------------------|
| 1 | Newcomer | 0-14 | 0-7 days | Just started. Exploring. |
| 2 | Developing | 15-29 | 1-3 weeks | Building initial habits. |
| 3 | Established | 30-49 | 1-2 months | **Habit formation inflection point** (21-66 day research window). |
| 4 | Proficient | 50-64 | 2-4 months | Others would notice the change. Biological adaptations measurable. |
| 5 | Advanced | 65-79 | 4-8 months | **Identity-level change**: "I am fit" vs "I'm trying to be fit." |
| 6 | Expert | 80-89 | 8-14 months | Maintenance phase. Top 10% of users. Risk of relapse decreases significantly. |
| 7 | Mastery | 90-99 | 14+ months | Sustained excellence. The stat speaks for itself. |

**What unlocks at each tier:**

| Tier | Domain Unlock | System Unlock |
|------|--------------|--------------|
| Newcomer (1) | Domain appears on character sheet | Domain tracking active |
| Developing (2) | Sub-stats visible | First domain title available |
| Established (3) | Domain insights from AI coach | Cross-domain correlations mentioning this domain |
| Proficient (4) | Domain in leaderboard breakdown | Can mentor others in this domain (future) |
| Advanced (5) | Full domain history and trends | "Power user" classification |
| Expert (6) | Prestige mode available | AI references this as a strength in coaching |
| Mastery (7) | Permanent mastery badge (survives prestige) | Community showcase (opt-in) |

---

## Part 10: Leaderboard & Competition Evolution

### 10.1 Level-Based Brackets

| Bracket | Level Range | Description |
|---------|-------------|-------------|
| Bronze | 1-7 | New users finding their rhythm |
| Silver | 8-15 | Established with consistent habits |
| Gold | 16-25 | Advanced, strong multi-domain engagement |
| Diamond | 26+ | Grandmaster-level users |

Users compete within their bracket only. Bracket promotion happens at the start of the next week (not mid-competition). Extended leaderboard rows show reputation tier icons, guild emblem, active buffs, and title.

### 10.2 Seasonal Competitions

12-week quarterly seasons with:
- A seasonal theme (e.g., "Season of Strength" = fitness-focused, "Season of Balance" = cross-domain)
- Separate seasonal XP track that resets each season
- Season pass milestones (earned, not purchased):
  - 500 Seasonal XP: Season badge
  - 1,500: Season-exclusive title
  - 3,000: Season-exclusive achievement
  - 5,000: Season champion border (animated)
  - 10,000: Legendary achievement + permanent "Season X Champion" title
- Season-exclusive achievements become Feats of Strength after the season ends

### 10.3 Balancing Competition with Cooperation

Key design decisions to prevent toxicity:

1. **Party buffs reward cooperation more than solo competition.** Cooperating users earn more XP at the same activity level.
2. **Guilds compete on quality, not quantity.** Active Member Ratio means a 20-person active guild beats a 100-person ghost guild.
3. **Accountability defaults to encouragement, not shame.** AI intervenes before partners are notified.
4. **Bracket matching prevents discouragement.** A new user never sees a Level 30 user on their leaderboard.
5. **Seasonal resets level the playing field.** Even long-time users start at 0 each quarter.
6. **Reputation daily caps reward consistency over intensity.** 30 minutes every day outranks a 10-hour marathon once a month.

---

## Part 11: Subscription Tier Gating

| Feature | Free | Plus | Pro |
|---------|------|------|-----|
| Character sheet & radar chart | Yes | Yes | Yes |
| Domain tracking (all 10) | Yes | Yes | Yes |
| Daily/Weekly quest tracking | Yes | Yes | Yes |
| Main Quest creation | Up to 3 | Unlimited | Unlimited |
| Side Quest AI suggestions | - | Yes | Yes |
| Epic Quests | - | Yes | Yes |
| Group Quests / Parties | - | Yes | Yes |
| Quest Chain AI suggestions | - | - | Yes |
| Story Chapters (last 3) | Yes | All chapters | All chapters |
| Story Retroactive Enrichment | - | - | Yes |
| Story Sharing | - | Yes | Yes |
| Custom Titles | - | - | Yes |
| Guilds (join) | Yes | Yes | Yes |
| Guilds (create) | - | Yes | Yes |
| Guild Raids | - | Yes | Yes |
| Reputation system | Yes | Yes | Yes |
| Seasonal competitions | Yes | Yes | Yes |
| Radar chart historical playback | - | - | Yes |

---

## Part 12: Anti-Gaming & Psychological Safety

### Preventing Exploitation

- **Stats are auto-calculated from genuine activity data**, not self-reported numbers
- **AI scoring has anti-cheat flags** (anomaly detection, low-confidence scoring, review triggers)
- **Diminishing returns**: 50% XP after the 7th domain action in a single day
- **Streak freezes capped** at 3, preventing indefinite streak inflation
- **Prestige resets domain level**, preventing permanent stat inflation
- **Reputation daily caps** prevent burst-grinding (25 RP max per domain per day)
- **Trend score component** means a user who stops engaging sees their stat decline, even if historical consistency was high

### Preventing Overjustification

- **No daily XP quota or target shown.** The system never displays "earn 100 XP today" as a goal. XP is a byproduct of doing meaningful things, never the objective.
- **Celebration is contextual, not generic.** AI references specific data ("Your sleep consistency is up 12% since March") rather than generic praise ("Great job!").
- **Title rarity over quantity.** Fewer, more meaningful titles that reflect real achievement.
- **The radar chart is the primary motivator.** A visual picture of who you are becoming is more powerful than any point total.
- **Setbacks are narrated, not punished.** The story engine writes failures as part of the journey, not as scoring penalties.

---

## Appendix A: XP Multiplier Stack

When multiple bonuses apply, they stack in this order:

```
final_xp = base_xp
  * cross_domain_synergy_bonus (max 1.15)
  * party_buff (1.10 if in active party)
  * recovery_multiplier (1.30 if post-rest day)
  * streak_multiplier (1.0 at <7 days, 1.5 at 7-29 days, 2.0 at 30+ days)

total cap: 2.0x
```

If total exceeds 2.0x, cap at 2.0x to prevent runaway inflation.

## Appendix B: WoW System Mapping Summary

| WoW System | yHealth Equivalent |
|-----------|-------------------|
| Character Level | Overall Character Level (1-25) |
| Talent Trees / Specializations | 10 Life Domain Stats with sub-stats |
| XP & Leveling | Per-domain logarithmic XP curves |
| Quests (Main/Side/Daily/Weekly) | Quest taxonomy on real-life goals |
| Quest Chains | Sequential/branching/cross-domain goal progressions |
| Reputation Factions | Per-domain reputation tiers (Beginner to Grandmaster) |
| Guilds | Persistent leveling communities |
| Parties / Dungeons | Temporary quest squads for group goals |
| Raids | Multi-stage guild challenges |
| Achievements | Domain-mapped achievements with meta-achievements |
| Feats of Strength | Time-limited prestigious accomplishments |
| Gear/Item Level | Character Power (CP) score |
| Rested XP | Recovery Multiplier (1.3x after rest days) |
| Prestige / Season Resets | Domain prestige system |
| Arena Brackets | Level-based competition brackets |
| Seasons / Patches | Quarterly seasonal competitions |
| Character Sheet / Armory | Radar chart + character sheet |
| Titles | Rarity-tiered title system |

## Appendix C: Research References

- **Habit Formation**: Lally et al. (2010) -- habits solidify in 21-66 day window. Tier 3 (Established) is calibrated to this.
- **Identity-Level Change**: Behavior change becomes identity at 4-8 months. Tier 5 (Advanced) reflects this.
- **Self-Determination Theory**: Ryan & Deci -- autonomy, competence, relatedness as core psychological needs.
- **Overjustification Effect**: External rewards can replace intrinsic motivation. Countered by contextual celebration and stat-based (not reward-based) progression.
- **Octalysis Framework (Yu-kai Chou)**: WoW engages all 8 core drives (Epic Meaning, Achievement, Creativity, Ownership, Social Influence, Scarcity, Unpredictability, Loss Avoidance). Our system maps each.
- **Gamification Effectiveness**: 59% of studies report positive effects on health behavior; strongest evidence in physical activity (small-to-medium effect sizes). Social components increase exercise adherence by 27% (JMIR 2022).
- **Prochaska's Transtheoretical Model**: Tier 6 (Expert) corresponds to the maintenance phase where relapse risk decreases significantly.
