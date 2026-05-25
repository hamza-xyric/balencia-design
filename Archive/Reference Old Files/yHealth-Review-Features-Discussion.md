---
type: meeting-discussion
title: yHealth Feature Review — Hamza & Salman
status: Draft
owner: hamza
last_updated: 2026-04-07
kb_summary: Comprehensive yHealth feature review covering AI coaching, accountability, streaks, and universal life coaching scope
---

# yHealth Feature Review — Hamza & Salman

**Date**: 2026-04-07
**Participants**: Hamza (Founder), Salman (Developer)
**Duration**: ~30 minutes
**Context**: Review of yHealth features against founder's vision, covering current state, gaps, and new feature ideas

---

## Executive Summary

This review session walked through yHealth's core identity and feature set against the founder's North Star principles. The key takeaway: **yHealth is a life coach, not a health app**. Fitness, nutrition, and well-being are data sensors for the AI — not the product itself. The discussion covered streaks, AI coach intelligence, accountability mechanisms, data correlation across life domains, and ensuring the product can help with *anything* involving self-improvement.

---

## Founder's North Star Principles

### Principle 1: It's a Life Coach
- yHealth is NOT a fitness app, NOT a nutrition app, NOT a health app — it's a **life coach**
- Target user: **anyone who wants to improve themselves, period**
- The three pillars (fitness, nutrition, well-being) exist because **AI needs quantifiable data** to understand users
- They are **sensors, not features** — the **engine, not the car**
- Documentation needs updating to fully reflect this — the vision doc says "broader life aspirations" but treats it as secondary to health

### Principle 2: Motivation, Accountability & Human Needs
- The core problem yHealth solves is **sustaining motivation and providing accountability** for any goal
- The friend's pain point is losing steam — the AI coach prevents that
- Currently implemented: AI sends messages, creates follow-up when goals aren't met, can express frustration
- Needs enhancement: multiple channels (calls, push notifications, email), friction reduction, pattern-based adjustments

---

## Feature Areas Discussed

### 1. Streaks & Gamification

**Status**: Partially implemented (basic gamification exists)

**What's needed**:
- **Snapchat-style visual streaks** — log in every day, update nutrition, maintain your streak
  - Show streak count prominently (like Snapchat's 226-day, 328-day streaks)
  - Warning when streak is about to break: "Your streak will end if you don't log in tomorrow"
- **Streak detection** — AI notices when user has missed 2-3 days and reaches out with a **calibrated nudge** (not guilt, not cheerfulness — matched to personality)
- **Friction reduction** — "You haven't logged in 3 days. Want to do a 2-minute check-in instead of the full routine?" Lowers the bar when motivation dips
- **Competition with self** — track your own progress over time, not just against others
- **Health score** — total health score visible to user

**Decision**: Add streak option to the app. Salman confirmed this will be added.

---

### 2. AI Coach Status Awareness

**Status**: Basic status exists (working, sick, dreaming, traveling) but not fully intelligent

**What's needed**:
- **Status-based plan adjustment**:
  - If **sick**: skip workout, adjust nutrition (e.g., suggest khichdi/comfort food), skip non-essential goals but keep prayers
  - If **traveling**: ask how long the travel is, adjust plans for travel duration
  - If **vacation**: ask duration, understand the plan, adjust expectations
  - If **injured**: ask about the injury, revise plan for upcoming weeks/months based on injury type
- **Auto-updating status** from conversations: if user says "I'm stressed" or "I'm sick today," the status should update automatically without requiring manual toggle
- **Follow-up on status**: if sick, ask the next day "Are you still sick?" — don't leave someone stuck in sick status forever
- **Day-by-day reset**: status resets daily unless user indicates otherwise or AI asks and learns duration
- **Pattern recognition**: "You tend to drop on Mondays and after travel. Want me to adjust expectations for those days?"
  - Example: Hamza can never wake up early on Mondays because of weekend sleep schedule disruption
  - AI should learn these patterns from history and proactively adjust

---

### 3. Achievements System

**Status**: Basic achievements exist (Perfect Day, Connected Fitness, Starter, Goal Setter)

**What's needed**:
- **AI-generated personalized achievements** based on individual goals and progress:
  - "You used to pray 0 times — now you're praying 5 times a day" (tracked over weeks)
  - "You lifted 50kg bench press" (relative to user's body type and strength)
  - Achievement cards created by AI, not just generic templates
- **Based on goals**: for every goal the user creates, AI should generate corresponding achievements
- **Notifications for achievements**: push notification when achievements are unlocked — this is motivating
- **Micro-wins resurfacing**: "You've worked out 3 days in a row — that's the first time in 6 weeks!" Celebrate things users wouldn't notice themselves

---

### 4. Google Calendar Integration

**Status**: Planned / partially discussed

**What's needed**:
- AI reads calendar events to understand user's day
- **Stress detection from meetings**: if user has 6-8 meetings in a day, AI knows it's a stressful day
- **Contextual awareness**: "You seem to have had a long day. How do you feel? Do you want a shorter conversation?"
- **Smart scheduling**: don't bug user before a big meeting, suggest activities on free days
- **Ramadan/holiday awareness**: "Ramadan starts next week, want to adjust your fitness targets and set nutrition goals?"
- **Special days**: whatever is planned should be kept for holidays, special occasions

---

### 5. Social Accountability (Consent-Based)

**Status**: Not implemented

**What's needed**:
- **Ask for consent** if friends/family/group can be messaged when user is losing motivation
- **Extra accountability through real people** — user can specify exactly who gets notified:
  - "Just tell these friends"
  - "Just tell my wife"
  - Groups that are created show in settings
- **Trigger conditions** (user-defined):
  - "If I don't go to the gym for 3 days, tell my friends"
  - "If I don't log in for 3 days, tell my friends"
  - "If I eat more than 3000 calories, tell my friends"
- **Consent is critical** — this lives in settings, user explicitly selects who and when
- **SOS Feature**: for people living alone — if they don't use the app for several days, alert saved relatives/emergency contacts via WhatsApp or other messaging

---

### 6. Accountability Contracts

**Status**: Not implemented

**What's needed**:
- **Optional contracts** between user and AI coach with real stakes:
  - "If I don't go to the gym tomorrow, I'll donate 500 rupees"
  - "If I eat more than 3000 calories, I'll donate 1000 rupees"
- **User-driven or AI-suggested**: user can propose stakes, or AI coach can suggest contract terms
- **Contract signing**: user formally agrees to the contract
- **Follow-up**: AI tracks whether contract conditions were met and enforces the consequence
- **Integration with social accountability**: "Do you want to involve your friends as enforcers?"

---

### 7. Accountability Buddy Matching

**Status**: Not implemented (competitions exist but are random)

**What's needed**:
- **Connect users with similar goals** for mutual accountability
- **AI-driven matching**: based on goal similarity, not just random
  - Example: three users — one wants to lose weight, one wants to gain weight, one wants better sleep. AI finds commonality (e.g., sleep improvement helps all three) and creates a shared challenge
- **Shared challenges**: "No sugar for a month" — AI creates challenges that benefit multiple users
- **Goal-based competitions** instead of purely random ones
- **Current state**: competitions exist but are auto-generated randomly. AI should use goal data to create smarter, more relevant challenges

---

### 8. Universal Data Source Correlation

**Status**: Concept discussed, Google Calendar integration confirmed as doable

**What's needed**:
- **Any data source** can feed AI's understanding:
  - **Spotify** listening patterns (mood detection)
  - **Calendar events** (stress/workload detection)
  - **Prayer times** (religious observance tracking)
  - **Spending habits** (financial stress indicators)
- **Cross-domain correlation engine**: works across ALL life domains, not just health metrics
- **Example workflow**:
  1. User has 6 meetings on Google Calendar
  2. AI knows it's a stressful day
  3. AI knows user might not have time to talk
  4. When AI calls at night, it says: "You seem to have had a long day. Do you want a shorter conversation? Do you want to discuss your day?"
- **The correlation engine should inform coaching**, not just track metrics

---

### 9. Universal Self-Improvement Scope

**Status**: Partially covered — prayer and finance work, career and relationships need attention

**"Can yHealth help me with X?" — the answer should ALWAYS be yes** if X involves self-improvement:
- Prayer (implemented)
- Finance (implemented)
- Career (needs work — see example below)
- Relationships (needs work)
- Fitness (implemented)
- Anxiety (implemented with caveats)
- Creativity (needs coverage)

**Career example discussed in detail**:
1. User: "I want a better job but I've been lazy about applying"
2. AI: "Let's create a schedule to help you apply for new jobs"
3. AI creates daily 30-minute slot for job applications
4. AI follows up: "Did you apply today? Did you review your resume? Did you reach out to connections?"
5. User says: "I don't like applying at night, I want to do it in the morning"
6. AI adjusts: "OK, I'll ask you in the morning. Have a good night's sleep."

**The coach's job**: listen, schedule, follow up, motivate. It doesn't need domain expertise in careers — it just needs to be a good accountability partner for whatever the user wants to do.

**Relationship example**: "I don't spend enough time with my mother" → AI schedules 30 minutes daily for sitting with mother, follows up.

---

### 10. Communication Channels

**Status**: Messaging exists, push notifications exist

**What's needed**:
- **Calling feature** — AI can call users for check-ins (identified as "the main feature" / best way)
  - Learn when user doesn't pick up (work hours) and adjust
  - If user didn't pick up, ask later: "Hey, you didn't pick up when I called. Was it okay?"
  - Learn preferences: some users hate calls during work, others are fine
- **Push notifications** — for achievements, streak warnings, nudges
- **Email** — lower-priority channel but available
- **WhatsApp integration** — for social accountability messaging to friends/family

---

### 11. AI Coach Personalities

**Status**: Implemented — personality selection exists in settings

**Confirmed**:
- Drill sergeant personality
- Gentle friend personality
- Data-driven neutral personality
- User selects preference in settings

---

### 12. Obstacle Diagnosis

**Status**: Not explicitly implemented

**What's needed**:
- If user keeps setting a goal (e.g., gym) and keeps missing it
- AI asks: "Is it the time? The location? Your energy level? Let's figure out the real blocker"
- Proactive problem-solving, not just reminders

---

### 13. Goal Reconnection (DKA Prevention)

**Status**: Discussed

**What's needed**:
- Proactively revisit goals that haven't been mentioned in a while
- "You set a goal to read more books 3 weeks ago. How's that going?"
- Prevent goals from silently dying

---

### 14. Contextual Timing

**Status**: Basic scheduling exists

**What's needed**:
- **Learn when user is most receptive**: morning person vs. post-lunch person
- **Adjust check-in timing** based on learned patterns
- AI detects from conversation patterns when user is most talkative/engaged

---

### 15. Mental Health Guardrails

**Status**: Discussed — anxiety feature exists but needs careful handling

**Concerns raised**:
- Genuine depression vs. normal sadness/stress — AI needs to differentiate
- Depression is a clinical condition (brain rewiring, structural changes) — not just "feeling sad"
- AI should NOT give advice that could make genuine mental health conditions worse
- Need safeguards: if AI detects signs of genuine clinical depression, it should recommend professional help, not try to coach through it
- Anxiety feature currently gathers information about why user is anxious — this is appropriate for normal anxiety but potentially harmful for anxiety disorders

---

## Health Pillars as Infrastructure (Key Reframe)

This was identified as **the most important conceptual reframe** for the product:

> **Health pillars are infrastructure, not product.**

| Concept | What it means |
|---------|---------------|
| Fitness, Nutrition, Well-being | **Sensors** that feed data to AI — not the product's features |
| The AI Coach | **The actual product** — everything else serves it |
| Why pillars exist | AI needs quantifiable data to understand users |
| Analogy | Pillars are the **engine**, the coach is the **car** |

**Documentation action needed**: Update vision document and PRD to make this distinction crystal clear. Currently, the vision doc treats "broader life aspirations" as secondary to health — they should all be equal.

---

## Action Items

| # | Action | Owner | Priority |
|---|--------|-------|----------|
| 1 | Add Snapchat-style streak feature | Salman | High |
| 2 | Implement friction reduction (2-min check-in after 3 days absence) | Salman | High |
| 3 | Make status auto-update from AI coach conversations | Salman | Medium |
| 4 | Add status follow-up logic (ask next day if still sick, etc.) | Salman | Medium |
| 5 | Implement AI-generated personalized achievements | Salman | Medium |
| 6 | Social accountability — consent-based friend/family messaging | Salman | Medium |
| 7 | Accountability contracts with financial stakes | Salman | Low |
| 8 | Accountability buddy matching (goal-based, not random) | Salman | Low |
| 9 | Google Calendar integration for stress/context detection | Salman | Medium |
| 10 | Universal self-improvement: ensure career & relationships work as goals | Salman | High |
| 11 | Update vision document to reflect "pillars as infrastructure" reframe | Hamza | High |
| 12 | Calling feature for AI coach | Salman | Medium |
| 13 | Obstacle diagnosis when user keeps missing same goal | Salman | Low |
| 14 | Goal reconnection — revisit forgotten goals | Salman | Low |
| 15 | Mental health guardrails for clinical depression/anxiety | Salman | High |
| 16 | SOS feature for people living alone | Salman | Low |
| 17 | Smart competitions based on goal similarity instead of random | Salman | Low |

---

## Raw Notes (Provided by Hamza)

### Streaks for Self-Motivation
- Streak detection — notices when you've missed 2-3 days and reaches out with a calibrated nudge (not guilt, not cheerfulness — matched to your personality)
- Friction reduction — "You haven't logged in 3 days. Want to do a 2-minute check-in instead of the full routine?" Lowers the bar when motivation dips

### Status-Based Plan Updates
- Based on statuses, plans can be updated and changed
- AI coach should be asking about specific status:
  - If sick, ask the next day if still sick
  - If vacation, ask how long the vacation is for in messaging to understand the plan
  - If traveling, ask how long the travel is for
- Status should also automatically get updated based on conversations between AI coach and user

### Achievements
- Based on your goals, AI creates achievements

### Google Calendar
- Integration for context-aware coaching

### Social Accountability
- Ask for consent if your friends/family/group can be messaged in case you are losing motivation
- Extra accountability, motivation through real people

### Accountability Contracts
- Create contracts between users and the AI coach (optional)
- "If I don't go to the gym tomorrow, I'll donate 500 rupees"
- "If I eat more than 3000 calories, I'll donate 1000 rupees"

### Accountability Buddy Matching
- Connect users with similar goals

### Universal Data Source Correlation
- Any data source — Spotify listening patterns, calendar events, prayer times, spending habits — can feed the AI's understanding of the user
- The correlation engine should work across ALL life domains, not just health metrics
- Example: If I have 6 meetings on my Google Calendar, it should know that it's a stressful day. It should know that I might not have time to talk. When it does call, it should have an idea that I might be tired, it should ask and learn about the user. It should ask if the user wants to have a shorter conversation.

### Universal Scope
- Careers, Relationships
- If someone asks "Can yHealth help me with X?" the answer should always be **yes** — if X involves self-improvement
- Prayer, finances, career, relationships, fitness, anxiety, creativity — all valid
- If user wants to apply for jobs, AI coach should help create a schedule and then follow up to ensure accountability
