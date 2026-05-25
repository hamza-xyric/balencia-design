# yHealth Meeting Discussion with Salman

## Meeting Overview

| Field | Details |
|-------|---------|
| **Date** | February 2026 (exact date TBC) |
| **Attendees** | Hamza (Product Lead), Salman (Developer) |
| **Duration** | ~35 minutes (Recording 1: ~30 min, Recording 2: ~5 min) |
| **Purpose** | Review current AI Coach implementation, discuss vision for AI insights, define architectural direction for data/analysis layer |
| **Recordings** | `yHealth Meeting Discussion with Salman.m4a`, `yHealth Meeting Discussion with Salman2.m4a` |

---

## Executive Summary

Hamza reviewed the current yHealth AI Coach implementation and found the existing insights too basic — essentially alarms and reminders ("time for breakfast", "prayer time") rather than genuine AI-powered coaching. The discussion focused on elevating the AI to deliver **proactive, cross-domain insights** by combining fitness, nutrition, and wellbeing data. Key architectural decisions include: pre-computing analysis (not on-the-fly), building a persistent **User Profile** (described as "a CLAUDE.md file for yourself"), storing daily analysis reports, and exploring location-based and screen-time tracking for richer insights. Salman confirmed technical feasibility for most discussed features.

---

## Vision Discussion

### Current State: "Insanely Basic"

Hamza's direct assessment of the current implementation:

> *"This is insanely basic. We could have made this 5 years ago. These are all alarms, notifications. How can we add AI into this?"*

The current Coach sends schedule-based messages (breakfast time, prayer reminders, workout reminders) — essentially a notification/alarm system with no intelligence.

### Desired State: True AI Life Coach

The Coach should be a **proactive, cross-domain intelligence** that:

1. **Combines all three pillars** (Fitness, Nutrition, Wellbeing) to generate insights impossible to find in isolation
2. **Knows the user deeply** — personality, habits, goals, patterns, strengths, weaknesses
3. **Proactively pushes insights** — doesn't wait for users to ask
4. **Pre-computes analysis** — should "know beforehand", not say "let me look into it and get back"
5. **Delivers genuinely interesting insights** — *"If it's not cool insights that I can show someone and say 'look what AI told me', then there's no point"*

### Key Example: The Salt Insight

Hamza shared a compelling real-world example:

> A friend was tracking calories and fitness separately. His weight wasn't dropping despite calorie deficit. When he asked ChatGPT why, it connected his food logs with fitness data and identified **excessive salt intake** was causing water retention, blocking fat loss. *"Because it's storing the food, it's storing this. We're storing so many more data points. Combine them."*

This is exactly the type of cross-domain insight yHealth must deliver.

---

## Features & Requirements Discussed

### 1. Pre-Computed Analysis System

**Problem:** Current system analyzes data on-the-fly when user asks a question, leading to slow responses ("let me look into it and get back").

**Requirement:** Analysis should be pre-computed and stored. When a user asks a question, 80% of the answer should already be ready.

| Aspect | Details |
|--------|---------|
| **Trigger** | Daily (e.g., after user sleeps, run overnight analysis) |
| **Storage** | Analysis reports stored in database (table format), per user |
| **Scope** | Sleep trends, nutrition patterns, fitness progress, wellbeing scores |
| **Incremental** | Only new data point (today's sleep) needs to be combined with stored history |
| **Benefit** | Faster responses, cheaper API calls, better user experience |

> *"Habits, trends — they build over time. They don't need to be reanalyzed every single day."*

### 2. User Profile ("CLAUDE.md for Yourself")

**Concept:** A persistent, evolving profile of each user that the AI Coach uses as its starting point — analogous to how Claude Code uses CLAUDE.md.

**What it contains:**
- Personality traits (introverted/extroverted)
- Goals (lose weight, build muscle, improve sleep, etc.)
- Habits and patterns (sleeps 4 hours, eats XYZ, likes certain foods)
- Strengths and weaknesses
- Behavioral trends over time

**How it works:**
- The Coach should be able to describe any user in 3 paragraphs: who they are, what they do well, what they do poorly
- Updates automatically as time progresses and more data comes in
- Used as context for every interaction — *"When a call comes in, it should immediately know: this is Salman, this, this, this"*

> *"It's like your CLAUDE.md file. High-level things are stored there, and it's a starting point for AI to see where to go, what to do."*

### 3. Proactive Notifications & Messaging

**Problem:** Current notifications are just reminders. They should be insight-driven.

**Requirements:**
- Replace generic reminders with **data-driven insights**
- If user hasn't used app for 2-3 days: push a message asking why (proactive engagement)
- Messages sent via in-app chat (not just push notifications)
- Tone can be direct/motivational: *"You piece of shit, do something, move!"* (user-adaptive tone)

**Examples of good proactive messages:**
- Instead of "Time for breakfast" → "Based on your 3-hour sleep last night and packed schedule today, here's what to eat to stay energized"
- Instead of "Workout reminder" → "Your weight loss has stalled this week — yesterday's food had excessive salt. Try reducing sodium today."
- "You've been inactive for 5 days. Are you alive or not?" (personality-appropriate humor)

### 4. Cross-Domain Insights Engine

**Core differentiator.** Every insight should connect multiple pillars:

| Insight Type | Data Combined | Example |
|-------------|--------------|---------|
| Fat loss stall | Nutrition + Fitness | "Despite calorie deficit, your high sodium intake is causing water retention" |
| Energy prediction | Sleep + Nutrition + Schedule | "You slept 3 hours and have a full day — eat high-protein breakfast, skip sugar" |
| Mood-workout correlation | Wellbeing + Fitness | "Your workout performance drops 40% on days you report low mood" |
| Sleep-nutrition link | Sleep + Nutrition | "Eating late (after 9 PM) correlates with 1.5 hours less sleep for you" |
| Prayer-location tracking | Wellbeing + Location | "You've been going to the mosque at Zuhor time consistently — great habit" |

### 5. Location-Based Intelligence

**Discussion:** Can yHealth use location data for passive insight generation?

**Use cases discussed:**
- **Prayer tracking:** AI detects user goes to same location at prayer times → infers mosque visits without asking
- **Diet temptation detection:** User visits Baskin Robbins / FoodPanda while having a weight loss goal → Coach intervenes
- **Activity inference:** Didn't leave house all day → sedentary alert
- **Pattern detection:** AI learns home location, office location, mosque location from behavior

**Technical discussion:**
- Salman confirmed background location tracking is feasible (Google Maps does it)
- Can work even when app is minimized (with proper permissions)
- Location doesn't need to be tracked every second — periodic checks sufficient
- AI can learn locations over time (unmarked places identified by behavior patterns)

**Privacy note:** Acknowledged privacy concerns. User opt-in required.

### 6. Screen Time / App Usage Tracking

**Concept:** Track what apps the user spends time on to generate wellbeing insights.

**Examples discussed:**
- User wants to lose weight but spends hours on FoodPanda looking at chocolates/cakes → Coach: *"You want to lose 10kg but you spent 10 hours looking at chocolates on FoodPanda"*
- TikTok/Instagram usage → *"More than half your TikTok feed is food videos. No wonder weight isn't dropping."*
- Productivity tracking — time spent on Chrome, Slack, etc.

**Inspiration:** Mac productivity app that records all activities (referenced by Hamza).

**Concerns:**
- Privacy implications
- Battery consumption on mobile
- Technical feasibility on phone OS (permissions)

**Status:** Exploratory — needs further investigation on mobile OS limitations.

### 7. Data Architecture

**Discussed architecture layers:**

```
┌─────────────────────────────────────────┐
│           User Interaction Layer         │
│    (Chat / Voice / WhatsApp / Push)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          AI Coach Layer                  │
│   (Question handling, tool calls)        │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐  ┌─────────────────┐
│ User Profile │  │  Pre-Computed    │
│  Database    │  │  Analysis Store  │
│ (who they    │  │  (daily reports, │
│  are)        │  │   trends, scores)│
└─────────────┘  └─────────────────┘
       │                │
       └───────┬────────┘
               ▼
┌──────────────────────────────────────┐
│         Raw Data / Vector DB          │
│  (sleep, nutrition, fitness, mood,    │
│   location, habits, integrations)     │
└──────────────────────────────────────┘
```

**Flow when user asks a question:**
1. AI checks User Profile (who is this person?)
2. AI checks Pre-Computed Analysis (what do we already know?)
3. Only if needed: AI queries raw data via tool calls for fresh analysis
4. Combines all sources to generate response

### 8. Scalability Concern

**Raised by Hamza:** What happens with 1000 users simultaneously using the app, all triggering API calls for real-time analysis?

**Resolution:** Pre-computing analysis mitigates this. Most responses come from stored data, not live API calls. Fresh analysis only needed for specific, new questions.

---

## Key Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | **Pre-compute analysis daily** instead of on-the-fly | Faster responses, lower cost, better UX |
| D2 | **Build persistent User Profile** per user | AI needs context about who it's coaching to be effective |
| D3 | **Notifications must be insight-driven**, not just reminders | Basic reminders don't differentiate from alarm apps |
| D4 | **Explore location-based tracking** for passive insights | Can infer prayer habits, activity levels, diet temptations |
| D5 | **Coach communication via chat messages** (not just push) | Rich, conversational interaction within the app |
| D6 | **80% of analysis should be pre-stored** | Only 20% should require live computation |

---

## Action Items

| # | Action | Owner | Priority | Notes |
|---|--------|-------|----------|-------|
| A1 | Redesign AI insights to be cross-domain (not just reminders) | Salman | High | Core differentiator — current implementation needs significant upgrade |
| A2 | Implement pre-computed analysis pipeline (nightly/daily batch) | Salman | High | Store daily analysis reports per user |
| A3 | Build User Profile system (persistent, evolving) | Salman | High | "CLAUDE.md for each user" concept |
| A4 | Implement proactive messaging (insight-driven notifications) | Salman | High | Replace basic reminders |
| A5 | Research location tracking feasibility on mobile | Salman | Medium | Background location, battery impact, privacy |
| A6 | Research screen time / app usage tracking on mobile | Salman | Low | Exploratory — check OS restrictions |
| A7 | Fix Slack notifications | Salman | Medium | Currently not receiving Slack messages |
| A8 | Complete database migration (pgbackup) | Salman | High | Shared details on Wednesday, needs to be applied |
| A9 | Re-watch Daniel meeting video for app design reference | Both | Medium | Hamza to share the video |
| A10 | Review and update plan based on this discussion | Salman | High | Incorporate new architectural direction |

---

## Open Questions / Parking Lot

| # | Question | Context |
|---|----------|---------|
| Q1 | How to handle screen time tracking on iOS vs Android? | Different OS permissions and restrictions |
| Q2 | What's the battery impact of background location tracking? | Needs testing on real devices |
| Q3 | How to handle unmarked locations (mosques not on Google Maps)? | AI needs to learn locations from behavior patterns |
| Q4 | What should the User Profile schema look like? | Needs detailed design — what fields, how structured |
| Q5 | How frequent should pre-computed analysis run? | Daily? After each data entry? Overnight batch? |
| Q6 | How to balance interconnectivity with cost/speed? | More cross-domain analysis = more expensive & slower (raised in Recording 2) |
| Q7 | Real-time location tracking — every second or periodic? | Server load vs. accuracy trade-off |

---

## Alignment with Existing yHealth Vision

The discussion strongly aligns with the documented Product Vision (v4.0):

| Vision Principle | Meeting Discussion | Alignment |
|-----------------|-------------------|-----------|
| "Invisible Intelligence, Visible Coaching" | Pre-computed analysis, proactive notifications | **Strong** — exactly this paradigm |
| "Three Equal Pillars" | Cross-domain insights combining all pillars | **Strong** — salt/fat-loss example is textbook |
| "Second Mind" | User Profile that knows everything about the user | **Strong** — "CLAUDE.md for yourself" |
| "Proactive Intelligence" | Push insights before user asks | **Strong** — core discussion topic |
| "Integration Superiority" | Location + screen time + health data | **Extends vision** — adds new data sources |

**New ideas not yet in Vision/PRD:**
- Location-based passive tracking for prayer/activity/diet inference
- Screen time / app usage tracking for wellbeing insights
- "CLAUDE.md for yourself" User Profile concept (more specific than current PRD)
- Pre-computed analysis architecture (specific implementation approach)

---

## Raw Transcript Reference

Full transcripts available at:
- `PLAYGROUND/recordings-processor/transcripts/yHealth Meeting Discussion with Salman.txt`
- `PLAYGROUND/recordings-processor/transcripts/yHealth Meeting Discussion with Salman2.txt`

**Note:** Transcripts are bilingual (English/Urdu) with some transcription artifacts from the MLX-Whisper model. The content above represents the interpreted meaning from both recordings.

---

*Document generated from meeting recordings on 2026-02-24*
*Skills: OPS-04 (Audio Transcriber), OPS-01 (Meeting Notes - DOAP), EXPERT-10 (Product Manager)*
