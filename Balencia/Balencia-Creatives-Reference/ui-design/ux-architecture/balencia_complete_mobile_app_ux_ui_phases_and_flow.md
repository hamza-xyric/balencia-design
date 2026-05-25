# Balencia Mobile App — Complete UX/UI Phases, Flow & Screen Architecture

**Product:** Balencia Mobile App  
**App Type:** Mobile AI wellness coach app  
**Core Experience:** Need-led, SIA-first, adaptive wellness app  
**AI Coach:** SIA  
**Main UX Direction:** Users build their own starting plan, SIA recommends useful features, and the app adapts based on user needs, behavior, reports, and progress.

---

## 1. Product Summary

Balencia is a mobile AI wellness app that adapts around what the user needs help with.

Instead of forcing users into fixed categories like Fitness, Nutrition, or Wellbeing, Balencia asks the user what they want support with. The user can select predefined needs or add custom plans in their own words. SIA AI Coach then interprets those needs and recommends the nearest useful features.

The app should feel calm, premium, personal, supportive, AI-assisted but human, simple on day one, and adaptive over time.

## 2. Core Product Promise

```text
Balencia adapts to you.
Start with what you need now, and let SIA guide you toward better daily balance.
```

## 3. Main UX Strategy

```text
User intent
→ SIA interpretation
→ Suggested feature stack
→ User confirmation
→ Adaptive Home
→ Daily actions
→ Progress insights
→ Feature expansion over time
```

## 4. Key Product Principles

### 4.1 Need-Led Experience

The app should ask users what they need help with in simple human language.

Good examples:

```text
I want to sleep better.
I want to reduce stress.
I want to eat healthier.
I want to feel less tired.
I want to build a routine.
```

Avoid product-first language:

```text
Activate pillar
Choose module
Enable vertical
Select category
```

### 4.2 SIA-First Experience

SIA is not just a chat screen. SIA is the core intelligence layer.

SIA should guide onboarding, understand user plans, recommend starter features, explain why features matter, help users log actions, summarize progress, suggest next steps, recommend new features after days/weeks, and support chat, voice chat, live call, and photo input.

### 4.3 Adaptive Feature System

The app should only show relevant features based on the user’s selected needs and active feature stack.

Example:

```text
If selected:
Sleep better
Reduce stress
Improve energy

Home may show:
Sleep Check-in
Evening Wind-down
Stress Pulse
Morning Energy Review
Energy Trend
SIA sleep/stress insight
```

The app should not show meal macros or workout cards unless the user adds those later.

### 4.4 Gradual Growth

Balencia should grow with the user over time.

New features can be added through manual Add Feature screen, SIA chat recommendation, SIA pop-out suggestion, progress-based insight, weekly recap recommendation, or behavior/report pattern detection.

---

## 5. Brand & UI Direction

### 5.1 Brand Feeling

```text
Calm
Modern
Premium
Clean
Supportive
Human
Intelligent
Soft
Approachable
```

### 5.2 Color System

Use Balencia colors with this ratio:

```text
Orange: 60%
Green: 25–30%
Purple: 10–15%
```

**Orange / Primary**  
Use for primary CTAs, selected states, main action buttons, important progress, and brand highlights.  
Recommended: `#FF5E00`

**Green / Progress & Success**  
Use for success states, healthy progress, readiness, positive confirmation, and completed actions.  
Recommended: `#34A853`

**Purple / SIA & AI**  
Use for SIA avatar, AI suggestions, smart states, voice/live call, custom plan accents, and premium highlights.  
Recommended: `#7F24FF`

**Backgrounds**

```text
Light background: #FAF9F6
Dark background: #0A0A0F
```

### 5.3 Typography

Recommended font:

```text
Sora
```

Mobile type scale:

```text
Screen title: 28–32px
Section title: 18–22px
Card title: 16–18px
Body: 14–16px
Microcopy: 12–13px
CTA: 15–16px semibold
```

### 5.4 Mobile Layout Rules

```text
Frame: iPhone 15 / 16 Pro
Size: 393 × 852 or 390 × 844
Outer margin: 20px
Gutter: 12px
Card radius: 20–28px
Button height: 52–56px
Bottom nav height: 76–88px
Bottom safe area: 24px
```

---

# Phase 1 — UX Foundation + Onboarding Wireframes

## Goal

Complete the entry flow from launch to first personalized setup.

This phase defines how the user enters the app, tells Balencia what they need, and lets SIA create the first starter plan.

## Phase 1 Screens

```text
01 Splash
02 Welcome
03 Sign In / Sign Up
04 Identity
05 Build Your Plan / Need Selection
06 SIA Interprets Plans
07 SIA Suggests Features
08 Starter Stack Confirmation
09 Optional Personalization
10 Permissions
11 First Action
```

## 6.1 Splash Screen

### Purpose

Brand introduction and app loading.

### Layout Sections

```text
Full-screen brand background
Balencia logo / icon
Small loading animation
Optional tagline
```

### Suggested Copy

```text
Balencia adapts to you.
```

### UI Notes

Keep it minimal. Use a warm premium background. Orange can be used as logo glow or loading accent. Avoid too much text.

## 6.2 Welcome Screen

### Purpose

Explain the app promise before onboarding.

### Layout Sections

```text
Top: Balencia logo
Middle: Main headline
Subtext: Short product promise
Visual: SIA / wellness illustration
Bottom: Get Started CTA
Secondary: I already have an account
```

### Suggested Copy

```text
Balencia adapts to what you need most.
SIA helps you build better habits, track progress, and feel more balanced.
```

## 6.3 Sign In / Sign Up Screen

### Purpose

Account access.

### Layout Sections

```text
Top: Logo
Headline: Welcome to Balencia
Social buttons: Continue with Apple, Continue with Google
Email option
Terms/privacy microcopy
Bottom: Switch sign in / create account
```

### UI Notes

Keep this screen simple. Do not add long forms. Make Apple/Google buttons clear. Email can expand inline.

## 6.4 Identity Screen

### Purpose

Personalize the experience.

### Layout Sections

```text
Progress indicator
Question: What should SIA call you?
Name input field
Optional basic details
Continue CTA
Skip option if optional
```

### Suggested Copy

```text
What should SIA call you?
```

---

# 7. Build Your Plan / Need Selection Screen

This is the redesigned version of the Need Selection screen.

## 7.1 Purpose

Let users select predefined needs and add custom plans in their own words.

## 7.2 Screen Question

```text
What do you want Balencia to help you with?
```

## 7.3 Subtitle

```text
Choose from suggestions or add your own plan. SIA will personalize your app around it.
```

## 7.4 Screen Structure

```text
Top Progress Indicator

Headline
Subtext

Custom Plan Input Card

Selected Plans Preview

Predefined Need Cards / Chips

Continue Button
```

## 7.5 Full Mobile Wireframe

```text
------------------------------------------------
Progress dots / Step indicator

What do you want Balencia to help you with?
Choose from suggestions or add your own plan.
SIA will personalize your app around it.

------------------------------------------------
+ Add your own plan

[ Type your plan or need...              ]

Examples:
Sleep earlier • Eat clean • Reduce stress

[ Add Plan ]
------------------------------------------------

Your selected plans
[ Sleep better ✕ ] [ Custom: Sleep earlier ✕ ]

------------------------------------------------
Popular starting points
Tap any that match your current needs.

[ Sleep better ] [ Reduce stress ]
[ Improve energy ] [ Eat healthier ]
[ Move more ] [ Build routine ]
[ Track progress ] [ Improve focus ]
[ Lose weight ] [ Drink more water ]

------------------------------------------------
[ Continue with these plans ]
------------------------------------------------
```

## 7.6 Custom Plan Input Card

### Purpose

Allow the user to write their own goal, need, habit, problem, or plan.

### Card Layout

```text
Large rounded card
Small SIA icon or plus icon
Title: Add your own plan
Input field
Example helper text
Add Plan button
Small SIA helper note
```

### Placeholder

```text
Type your plan or need...
```

### Example Helper Text

```text
I want to sleep earlier
I want to reduce belly fat
I want to feel less tired
I want to eat clean during office days
```

### Button

```text
Add Plan
```

### SIA Helper Note

```text
SIA will understand your plan and suggest the closest helpful features.
```

## 7.7 Custom Plan Behavior

```text
User types custom plan
→ taps Add Plan
→ plan appears in selected plans
→ input clears
```

Example:

```text
Input:
I want to sleep earlier and stop using my phone late at night.

Selected chip:
Custom: Sleep earlier
```

SIA still receives the full text for interpretation.

### Rules

```text
Minimum selected plans: 1
Recommended selected plans: 1–3
Maximum selected plans: 5
```

Custom plans should show a Custom label, be removable, be editable if possible, not duplicate existing selected items, and be interpreted by SIA on the next screen.

## 7.8 Selected Plans Preview

### Purpose

Show what the user has selected before continuing.

### Layout

```text
Section title: Your selected plans
Selected chips/cards
Remove icon on each item
```

### Example

```text
Your selected plans

[ Sleep better ✕ ]
[ Custom: Sleep earlier ✕ ]
[ Improve energy ✕ ]
```

### Empty State

```text
Choose a suggestion or add your own plan to continue.
```

## 7.9 Predefined Cards / Chips

### Section Title

```text
Popular starting points
```

### Section Subtext

```text
Tap any that match your current needs.
```

### Recommended Options

```text
Sleep better
Reduce stress
Improve energy
Eat healthier
Move more
Build routine
Track progress
Improve focus
Lose weight
Drink more water
```

### Optional Options

```text
Feel less tired
Improve mood
Plan my meals
Build strength
Walk more
Wake up earlier
Reduce screen time
Stay consistent
```

### Recommended UI

Use small cards for main options and chips for secondary options.

```text
Main cards:
Sleep better
Reduce stress
Improve energy
Eat healthier

Secondary chips:
Move more
Build routine
Track progress
Improve focus
Lose weight
Drink more water
```

## 7.10 Continue Button

### Disabled State

Button is disabled until the user selects or adds at least one plan.

### Recommended Copy

```text
Continue with these plans
```

### Alternative Copy

```text
Build my starter plan
Let SIA suggest features
Continue to SIA
```

---

# 8. SIA Interpretation, Suggestion & Starter Stack Flow

## 8.1 SIA Interprets Plans Screen

### Purpose

Show that SIA understood the selected/custom plans.

### Layout

```text
Progress indicator
SIA avatar/card
“You selected”
SIA interpretation summary
Continue CTA
```

### Example Copy

```text
I understand your focus:
- Sleep earlier
- Reduce stress
- Improve energy

I’ll build a simple starter setup around these.
```

## 8.2 SIA Suggests Features Screen

### Purpose

SIA recommends the nearest helpful starter features.

### Layout Sections

```text
Top progress indicator
SIA avatar/card
SIA message
Recommended feature cards
Actions: Add all / Choose / Why?
```

### Example SIA Message

```text
Based on your plans, I recommend starting with Sleep Check-in, Evening Wind-down, Stress Pulse, and Morning Energy Review.
```

### Recommended Feature Cards

```text
Sleep Check-in
Evening Wind-down
Stress Pulse
Morning Energy Review
Hydration Tracker
```

Each feature card includes:

```text
Icon
Feature name
Short benefit
Toggle / selected state
```

### Actions

```text
Add all
Choose
Why?
```

## 8.3 Starter Stack Confirmation Screen

### Purpose

Let user confirm which features will appear in the app.

### Layout

```text
Headline: Your starter plan
SIA explanation
Selected feature stack
Small Home preview
CTA: Set up my app
Secondary: Edit choices
```

### Example Copy

```text
Your starter plan is ready.
SIA will add these tools to your Home so you can start with a simple daily routine.
```

## 8.4 Optional Personalization Screen

### Purpose

Ask only what is needed for selected plans.

### Example Based on Sleep

```text
What time do you usually sleep?
What time do you want to sleep?
Do you want bedtime reminders?
```

### Example Based on Nutrition

```text
Do you follow any dietary preference?
How many meals do you usually eat?
Do you want meal reminders?
```

### Rule

Only ask questions that help SIA personalize the starter stack.

## 8.5 Permissions Screen

### Purpose

Ask for permissions only when needed.

### Possible Permissions

```text
Notifications
Health / fitness data
Microphone
Camera
Photo access
```

### Rule

Always explain why before showing the system permission dialog.

Example:

```text
Allow notifications so SIA can remind you about your evening routine.
```

## 8.6 First Action Screen

### Purpose

Help user complete one useful action before entering Home.

### Layout

```text
SIA card
Headline: Let’s complete your first step
One action card based on selected need
CTA
Skip for now
```

### Examples

For sleep:

```text
Set your bedtime reminder
```

For nutrition:

```text
Log your first meal
```

For wellness/stress:

```text
Complete a 15-second stress pulse
```

For movement:

```text
Set your daily movement target
```

---

# Phase 2 — Main App Low-Fidelity UX Screens

## Goal

Design the core app structure after onboarding.

The main app should have a clear bottom navigation and adaptive screens based on selected user needs.

---

## 9. Bottom Navigation

Recommended bottom navigation:

```text
Home | My Plan | SIA | Progress | Profile
```

SIA should be in the center.

### Bottom Nav Layout

```text
Home       My Plan       SIA       Progress       Profile
```

### SIA Center Button

SIA should be visually different:

```text
Raised circular button
Purple gradient
SIA avatar/icon
Soft glow or elevation
```

### Navigation Purpose

| Tab | Purpose |
|---|---|
| Home | Daily adaptive dashboard |
| My Plan | Active routines, goals, and feature stack |
| SIA | AI coach chat, voice chat, live call |
| Progress | Graphs, insights, weekly/monthly reports |
| Profile | Settings, active needs, privacy, integrations |

---

## 10. Home Screen

## Purpose

Home is the daily command center.

It should show:

```text
SIA first
Today Focus
Adaptive graphs
Active features
Quick actions
SIA insight
Add Feature card
Bottom navigation
```

## 10.1 Home Layout Structure

```text
Top greeting area
SIA Coach Card
Today Focus Card
Adaptive Graph Section
Active Feature Cards
Quick Actions
SIA Insight Card
Add Feature Card
Bottom Navigation
```

## 10.2 Top Greeting Area

```text
Good morning, Ahmed
Today, 12 May
Small streak / profile icon
```

## 10.3 SIA Coach Card

This should be the first major card.

### Layout

```text
SIA avatar
Today’s focus
Short SIA message
Quick action chips
```

### Example

```text
Today’s focus: protect your wind-down.
You slept better 3 nights in a row. Want to keep your bedtime routine tonight?
```

### Quick Chips

```text
Start routine
Log sleep
Ask SIA
```

## 10.4 Today Focus Card

### Purpose

Show one clear action.

### Examples

```text
Complete your evening wind-down
Log your lunch
Do a 2-minute breathing break
Reach 6,000 steps
Drink 2 more glasses of water
```

### Layout

```text
Title
Short reason
Progress indicator
CTA button
```

## 10.5 Adaptive Graph Section

Graphs change based on what user selected during onboarding.

### If User Selected Wellness / Sleep / Stress

Show:

```text
Sleep consistency graph
Stress pulse graph
Mood trend
Routine streak
```

Recommended graph cards:

```text
Sleep Score Card
Stress Trend Card
Mood Check-in Card
Evening Routine Streak
```

Example:

```text
Sleep Score
Score: 82
Mini line graph
+42 min average this week
```

```text
Stress Pulse
Level: Calm
Small bar / wave graph
Lower than yesterday
```

```text
Mood Trend
7-day emoji trend
Mood improved after better sleep
```

### If User Selected Nutrition / Food

Show:

```text
Calories progress ring
Macro bars
Hydration tracker
Meal consistency graph
Protein target
```

Recommended graph cards:

```text
Calories Today
Protein Progress
Hydration
Meal Streak
```

Example:

```text
Calories
1,420 / 2,000 kcal
Circular progress ring
```

```text
Macros
Protein, Carbs, Fat bars
```

```text
Hydration
5 / 8 glasses
Water bottle progress
```

```text
Meal Log
Breakfast logged
Lunch pending
```

### If User Selected Energy

Show:

```text
Energy trend line
Morning energy check-in
Afternoon dip pattern
Sleep-energy connection insight
```

Example:

```text
Energy Trend
Today: 7/10
Mini line graph
SIA insight: Your energy improves after earlier sleep.
```

### If User Selected Movement

Show:

```text
Steps progress
Activity minutes
Routine completion
Weekly movement trend
```

Example:

```text
Steps
4,850 / 8,000
Progress bar
```

## 10.6 Graph Design Rules

```text
Use small cards, not large complex dashboards.
Use orange-to-purple gradients for main progress bars.
Use green for positive or ready states.
Use one main graph per card.
Add a SIA insight beside or below important graphs.
Avoid empty “no data” graphs.
Use coach prompts instead of blank states.
```

## 10.7 Active Feature Cards

Examples:

```text
Sleep Check-in
Stress Pulse
Meal Log
Hydration
Morning Energy Review
Evening Routine
Breathing Break
Move More
```

Each card includes:

```text
Icon
Feature title
Status
One CTA
```

Example:

```text
Stress Pulse
Ready for today
Start check-in
```

## 10.8 Add Feature Card

Example:

```text
SIA suggests: Energy Review
Understand what improves your daily energy.
Button: Add Feature
Secondary: Not now
```

---

## 11. My Plan Screen

## Purpose

Home is for daily action. My Plan shows the full active structure.

## 11.1 My Plan Layout

```text
Header: My Plan
SIA summary card
Active needs section
Today’s plan
This week plan
Active features
Add / edit features
```

## 11.2 SIA Plan Summary

Example:

```text
Your current focus is Sleep + Stress + Energy.
This week, we’ll keep your bedtime steady and track afternoon energy.
```

## 11.3 Active Needs

Use chips:

```text
Sleep better
Reduce stress
Improve energy
```

## 11.4 Today’s Plan

Card list:

```text
Morning Energy Review
Hydration Check
Stress Pulse
Evening Wind-down
Sleep Check-in
```

## 11.5 Weekly Plan

Use horizontal day cards:

```text
Mon Tue Wed Thu Fri Sat Sun
```

Each day shows small dots/icons for planned actions.

## 11.6 Active Features

Grid of feature cards:

```text
Sleep Check-in
Wind-down Routine
Stress Pulse
Energy Review
Hydration
```

## 11.7 Add Feature Button

```text
+ Add more support
```

---

## 12. SIA Screen

## Purpose

SIA is the core AI coach screen and should sit in the middle of the bottom navigation.

## 12.1 SIA Layout

```text
Header: SIA Coach
Mode switcher: Chat / Voice / Live
Conversation area
Smart suggestion cards
Input area
Bottom navigation
```

## 12.2 SIA Chat Mode

### Layout

```text
SIA avatar
Conversation bubbles
Quick chips
Text input
Mic button
Camera/photo button
Send button
```

### Quick Chips

```text
Log something
Explain my progress
Suggest next step
Start check-in
```

### Use Cases

```text
Ask questions
Log sleep
Log meal
Log stress
Understand progress
Ask for a plan
Add features
Remove features
```

## 12.3 Voice Chat Mode

### Layout

```text
Large SIA avatar / waveform
Hold to speak or tap to talk
Live transcription
Suggested commands
End button
```

### Example Commands

```text
Log my breakfast
How did I sleep this week?
Start breathing exercise
What should I focus on today?
```

## 12.4 Live Call Mode

### Layout

```text
Full-screen SIA call interface
Animated avatar / waveform
Call timer
Mute
Speaker
End call
Quick note button
```

### Purpose

```text
Real-time AI coaching session
Guided reflection
Wellness support
Nutrition check-in
Progress discussion
Habit planning
```

## 12.5 Photo Input Flow

### Use Cases

```text
Meal photo logging
Progress photo
Context photo
Visual wellness logging
```

### Flow

```text
Tap camera
→ capture photo
→ SIA analyzes
→ user confirms
→ log saved
```

---

## 13. Progress Screen

## Purpose

Progress should be visual but not overwhelming.

## 13.1 Progress Layout

```text
Header: Progress
Weekly recap card
SIA insight summary
Adaptive graph cards
Milestones
Compare previous week
Suggested next improvement
```

## 13.2 Wellness / Sleep User Progress

Show:

```text
Sleep consistency graph
Stress trend
Mood calendar
Routine streak
SIA wellness summary
```

## 13.3 Nutrition User Progress

Show:

```text
Calories trend
Macro consistency
Hydration progress
Meal logging streak
SIA nutrition summary
```

## 13.4 Mixed User Progress

Show:

```text
Sleep + energy relation
Nutrition consistency
Stress and mood trend
Connected SIA insight
```

Example insight:

```text
Your energy was higher on days when sleep was above 7 hours and hydration was complete.
```

---

## 14. Profile Screen

## Purpose

Profile should be clean and functional.

## 14.1 Profile Layout

```text
User profile card
Active needs
Active features
SIA preferences
Notifications
Connected apps
Privacy controls
Account settings
```

## 14.2 Profile Sections

```text
Personal Info
Active Needs
Active Features
SIA Voice & Tone
Memory Controls
Notification Preferences
Health / Device Integrations
Subscription
Logout
```

---

## 15. Add Feature Screen

## Purpose

Let users add more support later without restarting onboarding.

## 15.1 Add Feature Layout

```text
Header: Add Feature
SIA recommendation card
Recommended for you
Feature categories
Feature cards
Add to My App CTA
```

## 15.2 Recommended Feature Cards

```text
Hydration
Meal Log
Morning Energy Review
Breathing Break
Sleep Check-in
Mood Journal
Movement Goal
Focus Session
```

Each card includes:

```text
Icon
Feature name
Why it helps
Add button
```

## 15.3 Manual Add Flow

```text
Open Add Feature
→ Browse recommended features
→ Tap Add to My App
→ Feature appears on Home
```

## 15.4 SIA Add Flow

```text
SIA detects pattern
→ Chat pop-out appears
→ User accepts / dismisses / snoozes
→ App updates without re-onboarding
```

### Example SIA Pop-Out

```text
You’ve reported low energy three afternoons this week.
Want to add a 15-second Morning Energy Review and simple hydration tracker?
```

Actions:

```text
Add Feature
Tell me more
Not now
```

---

## 16. Feature Detail Screens

Every active feature should have its own lightweight detail screen.

Examples:

```text
Sleep Check-in Detail
Stress Pulse Detail
Meal Log Detail
Hydration Detail
Energy Review Detail
Breathing Detail
Movement Detail
```

## 16.1 Feature Detail Layout

```text
Header
Current status card
Main action card
Graph / trend
SIA insight
History
Settings for this feature
```

## 16.2 Example: Sleep Check-in Detail

```text
Sleep Check-in
Last night: 7h 20m
Sleep quality: Good
Mini sleep trend
SIA insight
Button: Log sleep
```

---

## 17. Graph Detail Screen

## Purpose

Let users expand any graph from Home or Progress.

### Layout

```text
Header
Large graph
Time filter: Day / Week / Month
Key metric summary
SIA interpretation
Related actions
History
```

### Example

```text
Sleep Consistency
Average: 7h 12m
Best day: Thursday
SIA insight: Your sleep improved on days you started wind-down before 10:30 PM.
```

---

# Phase 3 — High-Fidelity UI Design

## Goal

Turn approved wireframes into polished Balencia UI using the brand system.

## 18. High-Fidelity Design Rules

### Color Ratio

```text
Orange: 60%
Green: 25–30%
Purple: 10–15%
```

### Use Orange For

```text
Primary CTAs
Selected states
Main progress bars
Important actions
Brand highlights
```

### Use Green For

```text
Success
Improvement
Readiness
Healthy progress
Completed states
```

### Use Purple For

```text
SIA AI
Smart suggestions
Coach cards
Voice/live call
Premium highlights
```

## 19. Card Style

```text
Rounded corners
Soft shadows
Warm off-white surfaces
Subtle borders
Clear spacing
Large tap areas
```

## 20. Graph Style

```text
Small and simple
One graph per card
No cluttered analytics dashboard
Use mini line graphs, rings, bars, and streak dots
Always add a SIA insight with important graphs
```

## 21. Component Library

Create reusable Figma components:

```text
Primary button
Secondary button
Need chip
Feature card
SIA card
Graph card
Progress ring
Mini line graph
Bottom nav
SIA center nav button
Chat bubble
Voice call control
Live call screen controls
Profile setting row
Progress indicator
Custom plan input card
Selected plan chip
Predefined need card
Error message
Empty selected state
```

## 22. Component States

### Buttons

```text
Default
Pressed
Disabled
Loading
```

### Chips / Cards

```text
Default
Selected
Disabled
Pressed
```

### Custom Plan Input

```text
Empty
Typing
Focused
Error
Added success
```

### SIA Chat

```text
Idle
Thinking
Typing
Speaking
Listening
Error
```

### Voice / Live Call

```text
Connecting
Listening
Speaking
Muted
Ended
Failed
```

---

# Phase 4 — Prototype, States & Developer Handoff

## Goal

Make the design usable, testable, and ready for development.

## 23. Clickable Prototype Flow

Prototype this full onboarding flow:

```text
Splash
→ Welcome
→ Sign In
→ Identity
→ Build Your Plan
→ SIA Interprets Plans
→ SIA Suggests Features
→ Starter Stack Confirmation
→ Optional Personalization
→ Permissions
→ First Action
→ Home
```

Prototype bottom navigation:

```text
Home
→ My Plan
→ SIA
→ Progress
→ Profile
```

Prototype key supporting flows:

```text
Home → Add Feature
Home → Graph Detail
Home → Feature Detail
SIA → Voice Chat
SIA → Live Call
SIA → Photo Input
Progress → Graph Detail
Profile → SIA Preferences
Profile → Connected Apps
```

## 24. Empty / Loading / Error States

Design states for:

```text
No graph data yet
No meals logged
No sleep data
SIA loading response
SIA thinking
Voice connecting
Voice failed
Live call connecting
Live call ending
Photo analyzing
Feature added successfully
Feature dismissed
Permission denied
Offline state
```

### Empty Graph Example

```text
No sleep data yet.
Log your first sleep check-in and SIA will show your pattern here.
```

### No Meal Logged Example

```text
No meals logged today.
Snap a photo or tell SIA what you ate.
```

### Offline Example

```text
You’re offline.
You can still view recent progress. New logs will sync when you’re back online.
```

## 25. Developer Handoff Notes

For every screen, include:

```text
Screen purpose
User action
Interaction notes
Empty state
Loading state
Error state
Data needed
Component names
Responsive behavior
Analytics events
```

## 26. Analytics Events

Recommended UX events:

```text
onboarding_started
identity_completed
custom_plan_added
predefined_need_selected
selected_plan_removed
build_plan_completed
cia_interpretation_shown
cia_recommendation_shown
starter_stack_confirmed
first_action_completed
home_opened
graph_card_tapped
add_feature_opened
feature_added
feature_dismissed
cia_chat_opened
cia_voice_started
live_call_started
photo_input_started
progress_opened
profile_opened
```

---

# Recommended Day-by-Day Design Schedule

## Week 1 — Low-Fidelity Wireframes

### Day 1

Design/refine:

```text
Splash
Welcome
Sign In
Identity
```

You already have three of these, so use Day 1 to refine them and add Identity.

### Day 2

Design:

```text
Build Your Plan
SIA Interprets Plans
SIA Suggests Features
Starter Stack Confirmation
```

### Day 3

Design:

```text
Home Default
Home Wellness / Sleep version
Home Nutrition version
Home Mixed Needs version
```

### Day 4

Design:

```text
My Plan
Add Feature
Feature Detail
Graph Detail
```

### Day 5

Design:

```text
SIA Chat
SIA Voice Chat
SIA Live Call
Photo Input Flow
```

### Day 6

Design:

```text
Progress
Profile
Settings
Connected Apps
```

### Day 7

Clean up:

```text
Review full flow
Fix missing states
Connect prototype
Prepare for high-fidelity
```

## Week 2 — High-Fidelity UI

### Day 1

Apply final visual style to:

```text
Splash
Welcome
Sign In
Identity
```

### Day 2

Apply final visual style to:

```text
Build Your Plan
SIA Interprets Plans
SIA Suggests Features
Starter Stack Confirmation
```

### Day 3

Apply final visual style to:

```text
Home screens
Adaptive graph cards
SIA home card
Bottom nav
```

### Day 4

Apply final visual style to:

```text
My Plan
Add Feature
Feature Detail
Graph Detail
```

### Day 5

Apply final visual style to:

```text
SIA Chat
Voice Chat
Live Call
Photo Input
```

### Day 6

Apply final visual style to:

```text
Progress
Profile
Settings
Integrations
```

### Day 7

Final polish:

```text
Prototype
Microinteractions
Spacing cleanup
Component naming
Developer handoff
```

---

# Final Screen List for Balencia Mobile App

## App Entry

```text
01 Splash
02 Welcome
03 Sign In / Sign Up
04 Identity
```

## Onboarding

```text
05 Build Your Plan / Need Selection
06 SIA Interprets Plans
07 SIA Suggests Features
08 Starter Stack Confirmation
09 Optional Personalization
10 Permissions
11 First Action
```

## Main App

```text
12 Home — Default
13 Home — Wellness / Sleep
14 Home — Nutrition
15 Home — Mixed Needs
16 My Plan
17 SIA Chat
18 SIA Voice Chat
19 SIA Live Call
20 SIA Photo Input
21 Progress
22 Profile
```

## Supporting Screens

```text
23 Add Feature
24 Feature Detail
25 Graph Detail
26 Notifications Settings
27 SIA Preferences
28 Active Features Management
29 Connected Apps
30 Privacy / Memory Controls
31 Subscription / Account
```

## States

```text
32 Empty Graph State
33 Loading State
34 Offline State
35 Permission Denied State
36 Feature Added Success
37 Feature Dismissed
38 SIA Thinking State
39 Voice Connecting State
40 Live Call Ending State
41 Photo Analyzing State
```

---

# Final UX Flow

```text
Splash
→ Welcome
→ Sign In / Sign Up
→ Identity
→ Build Your Plan
   - Add custom plan
   - Select predefined needs
   - Review selected plans
→ SIA Interprets Plans
→ SIA Suggests Starter Features
→ Starter Stack Confirmation
→ Optional Personalization
→ Permissions
→ First Action
→ Adaptive Home
→ Daily Loop
→ Progress Review
→ Add / Refine Features
→ Repeat
```

---

# Daily Use Flow

```text
Open App
→ Adaptive Home
→ See SIA recommendation
→ Review Today Focus
→ Check graph / active card
→ Take action
→ SIA confirms progress
→ Home updates
→ User exits or continues with SIA
```

---

# SIA-Led Expansion Flow

```text
Usage reports / patterns
→ SIA detects need
→ SIA shows pop-out suggestion
→ User accepts / dismisses / snoozes
→ Feature added
→ Home updates
→ Progress tracking begins
```

---

# Final Professional Recommendation

Do not start directly with high-fidelity screens for the entire app.

The better process is:

```text
1. Finalize the full app map
2. Create low-fidelity wireframes for all screens
3. Review user flow
4. Create reusable Figma components
5. Apply high-fidelity branding
6. Build clickable prototype
7. Prepare developer handoff
```

For the next design session, focus on these four wireframe screens:

```text
1. Build Your Plan / Need Selection
2. SIA Interprets Plans
3. SIA Suggests Features
4. Starter Stack Confirmation
```

These screens define the adaptive logic of the whole Balencia app.

---

# Final Product Definition

Balencia is a **need-led, SIA-first mobile AI wellness app** where users start with what they need help with, can add their own custom plans, receive intelligent feature suggestions, and use an adaptive Home that changes according to their active needs, behavior, reports, and progress.

The experience should be:

```text
Simple on day one
Flexible after onboarding
Visual on Home
SIA-first in guidance
Clear in daily use
Adaptive as user needs change
Premium in UI
Supportive in tone
```
