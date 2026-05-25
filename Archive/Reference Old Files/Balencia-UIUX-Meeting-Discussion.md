# Balencia UI/UX Discussion — Hamza & Salman

## Meeting Overview

| Field | Details |
|-------|---------|
| **Date** | 2026-04-23 |
| **Attendees** | Hamza (Product/Tech Lead), Salman (UX/Design) |
| **Duration** | ~45-60 minutes (estimated from 80MB recording) |
| **Purpose** | Rethink Balencia (formerly yHealth) UI/UX — simplify onboarding, restructure navigation, define AI coach interaction model |
| **Recording** | `PLAYGROUND/Balencia UI:UX.m4a` |
| **Language** | Urdu/English mix (~60% Urdu, 40% English) |

---

## Executive Summary

Hamza and Salman had a deep UI/UX discussion about the Balencia app (rebranded from yHealth). The core tension was between feature richness and user simplicity. Salman pushed strongly for a simpler, conversation-first approach centered on the AI coach ("SIA/CIA"), arguing that most users are non-technical and get overwhelmed by dashboards and feature-heavy interfaces. Hamza was initially inclined to show more features upfront but came around to the idea of progressive disclosure. Key outcomes: simplify onboarding to ~3 screens, make the AI coach the primary interaction surface, move detailed modules to an "Explore" page, and use a pin-based system for users to customize their sidebar.

---

## Discussion Threads

### Thread 1: Feature Visibility & Plan-Based Access

**Context**: How to handle showing/hiding features based on subscription plans.

**Key Points**:
- Features should be shown/hidden based on the user's subscription plan
- Admin panel will control feature visibility — admins can hide or show features
- If there's a pain issue or during development, features can be toggled from admin
- Discussion about whether all pages (Fitness, Nutrition, Meditation, Finance, etc.) should be visible to all users or filtered by plan

**Where This Landed**:
Features show based on plan. Admin panel controls visibility. Unsubscribed features can still be discoverable but gated.

---

### Thread 2: Onboarding Simplification

**Context**: Current onboarding has ~5-6 screens including image upload, plan selection, etc. Salman argued this is too much.

**Key Points**:
- Salman strongly advocated for minimal onboarding: "the easier we keep onboarding for first-time users, the better"
- Remove image upload step from onboarding — move it to later
- Reduce to ~3 core screens: welcome, goal selection, get started
- Goal selection should be simple — user picks 2-3 max initial goals
- Two options discussed for onboarding:
  1. **Chatbot-driven**: SIA asks conversational questions ("What goals are you aiming for?") with clickable options below
  2. **Traditional screens**: Simple selection pages with pre-built goal categories
- Hamza suggested a 30-second intro video from SIA showing what the app can do: "to amaze the shit out of the users"
- Must constantly reassure users that selections can be changed later — reduces commitment anxiety

> Key insight from Salman: "Whatever seems easy to us isn't that easy for users. Whatever seems hard to us is easy for them. 90% of the population doesn't know these things."

**Where This Landed**:
Onboarding should be ~3 screens max. Consider chatbot-driven onboarding where SIA guides the process conversationally. Include a short intro video. Always communicate that choices can be changed later.

---

### Thread 3: Goal Selection Design

**Context**: How users select their primary goals during and after onboarding.

**Key Points**:
- Current design had too many goal options visible at once
- Discussed MCQ-style goal selection with clickable chips
- **Custom goals**: Should be available but NOT prioritized — put pre-built goals first, custom option last
- Reasoning: "When any app gives you a custom option, most users never use it. They click pre-built options first."
- If user selects Fitness, SIA should follow up: "Nice, you're looking into fitness. What's your fitness level? What's your motivation? What's been stopping you? How long have you been thinking about fitness?"
- First-time users should pick a main life goal, then sub-goals follow from that
- Keep it conversational, not form-like — "if we make it like an application form with multiple tabs asking data, users will leave"

**Where This Landed**:
Pre-built goals first, custom last. Limit initial selection to 2-3 goals. Follow up with conversational depth per selected goal via SIA.

---

### Thread 4: Navigation & Sidebar Restructuring

**Context**: Current sidebar has many tabs (Fitness, Nutrition, Wellbeing, Finance, Meditation, etc.) which is overwhelming.

**Key Points**:
- Salman: "If we show all modules in the sidebar, it won't look right — there are 8-9 modules"
- Proposal: Main sidebar shows only core items; detailed modules go into dropdown/submenu
- Dropdown should be collapsed by default — user clicks to expand
- Wellbeing contains many sub-modules (mood tracking, sleep, yoga, meditation, etc.) — these should nest inside Wellbeing, not be top-level
- Discussed Notion-like sidebar where pinned items appear at top
- **Pin system**: Users can pin their favorite modules to the sidebar from the Explore page
- After onboarding, sidebar shows: AI Coach (SIA), pinned modules based on goals, and a collapsed menu for everything else

**Where This Landed**:
Minimal sidebar with AI coach prominent. Pin system for user customization. Detailed modules in collapsible sections or accessible via Explore page.

---

### Thread 5: The Explore Page Concept

**Context**: Where do all the modules/features live if not in the sidebar?

**Key Points**:
- Inspired by the GPT Store in ChatGPT — a browsable library of modules
- Explore page shows all available modules: Fitness, Nutrition, Meditation, Sleep, etc.
- Modules related to user's goals appear first; unrelated ones show under "See others unrelated to your goals"
- Community-created content could appear here too (future feature)
- Users can browse, discover, and pin modules they want
- Pinning a module from Explore adds it to their sidebar
- This approach: "Modules that are hidden but discoverable" — progressive disclosure

> Salman's analogy: "Like Facebook — page creation, most users don't use it. Not because they can't, but because they don't care to. They just scroll and watch videos."

**Where This Landed**:
Build an Explore page (GPT Store-like) as the module discovery surface. Goal-relevant modules featured first. Pin-to-sidebar for personalization.

---

### Thread 6: AI Coach as Primary Interface

**Context**: The most significant UX philosophy discussion — making SIA the center of the experience.

**Key Points**:
- Salman's core argument: The app should work like a therapist session
- Therapists "don't show you metrics or dashboards — they sit, talk, ask about you, guide you, motivate you"
- SIA should be the primary interaction: conversation-first, dashboards second
- Dashboards, metrics, analytics are "side things for enthusiasts, for people who want to go into the detail"
- Non-technical users would be overwhelmed by numbers and charts — "so many numbers scare people away"
- When user opens app, they should land on SIA chat — not a dashboard
- SIA can link to modules: if AI coach recommends a fitness plan, it creates a node/link that appears both in the conversation and in the module sidebar
- The AI should be able to open specific pages or create tasks for the user
- Voice input should be supported — Salman currently uses Gemini voice and finds it effective

> Salman: "Our main purpose is conversation. The dashboards and metrics are side things for enthusiasts."

**Where This Landed**:
AI coach (SIA) is the primary landing experience. Conversation-first approach. Metrics/dashboards are accessible but secondary. SIA can deep-link into modules.

---

### Thread 7: Subscription & Pricing Model

**Context**: How to structure subscription plans with modular pricing.

**Key Points**:
- Discussed custom subscription plans where users can pick specific modules
- "Click on custom subscribe plan, tick what you want, and the price increases accordingly"
- Each module (Workout, Sleep, Nutrition, etc.) has its own price
- When added, it reflects in the subscription total
- Base plan includes AI coach; modules are add-ons
- Alternative: tiered plans (Basic, Pro, Premium) with predefined module bundles

**Where This Landed**:
Custom modular pricing as an option alongside pre-built plans. Each module priced individually. AI coach is the base offering.

---

### Thread 8: API Costs & Technical Considerations

**Context**: Practical discussion about running AI features at scale.

**Key Points**:
- Discussed using open-source models to reduce costs — Hamza uses local models for transcription
- API cost comparison: Google Gemini ~$4 per million characters, OpenAI higher
- Gemini is cheapest option for voice/conversation
- 1 million characters ~ 200,000 words ~ roughly 18-20 hours of conversation
- At $15/plan, estimated ~30 hours of AI conversation per user per month
- Discussed credit-based system (like Gemini Lab giving ~1000 credits)
- 10-minute conversation sessions as a default cap
- For voice features: can use speech-to-text locally on device, then send text to API — cheaper than streaming audio

**Where This Landed**:
Use cheapest viable models (Gemini for conversation). Credit/time-based AI usage. Local speech-to-text to reduce API costs. ~$5 estimated AI cost per user per month.

---

### Thread 9: User Personas & Design Philosophy

**Context**: Underlying philosophy about who the users are and how to design for them.

**Key Points**:
- Different users come for very different reasons:
  - One person comes just for meditation/prayer tracking
  - One person comes for fitness only
  - One person comes because they want to build a business
  - One person comes for sleep improvement
- "We've been thinking from our perspective. Things that seem easy to us aren't easy for users"
- Need to think from the perspective of someone who's "not technical" — the 90% of users
- Design for the user who has "no idea what features exist in an app when they first open it"
- App's purpose: "Make complex life simple" — not add more complexity

> Salman: "We've been overthinking this. We put in everything we thought was good. I was even thinking 'let me add more.' And you said no."

**Where This Landed**:
Design for non-technical users first. Progressive complexity. The app should feel like a helpful companion, not a feature-packed dashboard.

---

## Key Decisions

| # | Decision | Rationale | Owner |
|---|----------|-----------|-------|
| D1 | Simplify onboarding to ~3 screens | Users abandon long onboarding flows | Salman (Design) |
| D2 | AI Coach (SIA) as primary landing page | Conversation-first is more accessible than dashboards | Hamza + Salman |
| D3 | Build an Explore page for module discovery | Keeps main interface clean while making features discoverable | Hamza |
| D4 | Pin-based sidebar customization | Users personalize their own navigation from Explore | Salman |
| D5 | Custom goal at bottom, pre-built goals first | Users rarely use custom; pre-built reduces friction | Salman |
| D6 | Move detailed metrics/dashboards to secondary views | Non-technical users get overwhelmed by numbers | Salman |
| D7 | Add short intro video from SIA in onboarding | Gives users quick understanding of app capabilities | Hamza |
| D8 | Use Gemini/open-source models for cost efficiency | ~$5/user/month AI cost target | Hamza |

---

## Action Items

| # | Action | Owner | Priority | Notes |
|---|--------|-------|----------|-------|
| A1 | Redesign onboarding flow — 3 screens max | Salman | High | Remove image upload, simplify goal selection |
| A2 | Design the Explore page (GPT Store-like layout) | Salman | High | Show goal-relevant modules first |
| A3 | Design pin-to-sidebar interaction | Salman | Medium | From Explore page to sidebar |
| A4 | Prototype chatbot-driven onboarding option | Hamza | Medium | SIA asks goals conversationally |
| A5 | Design SIA as landing page experience | Salman | High | Conversation-first, with intro video |
| A6 | Research modular subscription pricing UX | Hamza | Medium | Custom plan builder UI |
| A7 | Cost analysis: Gemini vs alternatives for AI chat | Hamza | Medium | Target ~$5/user/month |
| A8 | Design dropdown/collapsible sidebar navigation | Salman | Medium | Default collapsed, main items visible |

---

## Open Questions / Parking Lot

| # | Question | Context | Revisit When |
|---|----------|---------|--------------|
| Q1 | Chatbot-driven vs traditional onboarding? | Both discussed, no final pick | During prototype testing |
| Q2 | How does SIA deep-link into modules? | Mentioned AI creating "nodes" that link to modules | During technical architecture |
| Q3 | Credit system vs unlimited AI chat per plan? | Cost implications unclear at scale | After cost modeling |
| Q4 | What goes on the home/dashboard page? | If SIA is primary, what is the "dashboard"? | During wireframing |
| Q5 | Community-created modules — scope for v1? | Mentioned for Explore page but may be future | After MVP scope review |
| Q6 | Voice-first interaction — how prominent? | Salman uses voice daily; most users may not | User research needed |

---

## Alignment with yHealth/Balencia Product

This discussion directly impacts several existing product documents:

- **Product Vision** (`Product-Vision.md`): Reinforces AI-first, conversation-driven health companion
- **Personas** (`context/personas.md`): Validates need for non-technical user persona as primary
- **Pillars** (`context/pillars.md`): Wellbeing pillar confirmed as containing multiple sub-modules (mood, sleep, yoga, meditation, prayer)
- **Design Decisions** (`context/design-decisions.md`): Several new decisions (D1-D8) should be added
- **Epic PRDs**: Onboarding epic, AI Coach epic, and Navigation epic all need updates based on this discussion

---

## Raw Transcript Reference

**Full Transcript**: `PLAYGROUND/recordings-processor/transcripts/Balencia UI:UX.txt`
**Timestamped JSON**: `PLAYGROUND/recordings-processor/transcripts/Balencia UI:UX.json`
**Language**: Urdu (primary) with English technical terms (~60/40 split)
**Quality Notes**: Some Whisper hallucination artifacts in longer Urdu segments (repetitive text blocks). Core discussion points are clear despite artifacts.

---

*Document generated from meeting recording on 2026-04-23*
*Template: meeting-discussion.md | Skills: OPS-08 (Recordings Processor)*
