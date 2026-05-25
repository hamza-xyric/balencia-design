# YouTube Video UI/UX Evidence

**Reviewed:** 2026-05-20 18:20 PKT  
**Scope:** Public YouTube metadata and automatic captions for Bevel and Habitica UI/UX research.  
**Storage rule:** No full videos, frames, or cleaned transcript files are stored in this repo. Temporary captions were reviewed from `/private/tmp/yhealth-youtube-evidence/`.

## Method

- Used `yt-dlp --skip-download` to collect public metadata.
- Used `yt-dlp --skip-download --write-auto-subs` to review automatic captions in `/private/tmp`.
- Kept observations as paraphrased UI/UX notes with timestamps.
- Included extra candidate videos only where they added visible or discussed app UI patterns beyond the five selected sources.
- Treated auto-captions as directional evidence, not canonical product copy.

## Video Source Table

| Product | Video | Channel | Published | Duration | Reliability | Status | URL |
|---|---|---:|---:|---:|---|---|---|
| Bevel | Introducing Bevel 3.0 | Bevel | 2026-04-27 | 7:14 | Official product demo | Included | https://www.youtube.com/watch?v=LBgTTTMgWwA |
| Bevel | Why I'm Not Paying $129 for Bevel 3.0 (And You Probably Shouldn't Either) | Mekawi | 2026-05-03 | 10:07 | Third-party critique | Included for pricing/value perception | https://www.youtube.com/watch?v=hYJxwxMwPng |
| Bevel | Meet the New Bevel Intelligence | Bevel | 2026-04-27 | 6:51 | Official product demo | Included | https://www.youtube.com/watch?v=fV28YVFTQTc |
| Bevel | Bevel: The ONLY app you need | Bevel | 2026-02-05 | 0:16 | Short product promo | Reviewed but low-signal | https://www.youtube.com/watch?v=3u0_VbuwQdY |
| Habitica | How to Master Productivity and Crush Your Tasks with Habitica | OMG It's Derek | 2024-08-20 | 9:55 | Third-party tutorial/review | Included | https://www.youtube.com/watch?v=A5fHK6ndXQU |
| Bevel | Biological Age is finally here! | Bevel | 2026-04-27 | 6:36 | Official product demo | Included as extra candidate | https://www.youtube.com/watch?v=QVEhng6A8ts |
| Bevel | Bevel 3.0 transforme votre Apple Watch en coach IA | LoKan Sardari | 2026-04-28 | 20:34 | Third-party review | Reviewed metadata only; captions blocked by YouTube rate limit | https://www.youtube.com/watch?v=BgkyeDwhyx8 |
| Bevel | Bevel 3.0 jetzt auf Whoop Niveau? Mein Fazit! | HealthTechFries | 2026-05-10 | 27:31 | Third-party review | Reviewed metadata only; captions blocked by YouTube rate limit | https://www.youtube.com/watch?v=J7HEiFEF2bs |
| Habitica | Habitica vs Lifeup: Which App Is Better for Productivity? | DIY GUIDES | 2025-12-11 | 3:47 | Third-party comparison | Included as extra candidate | https://www.youtube.com/watch?v=tFFTa76ZikE |
| Habitica | Five Great Apps to Gamify Your Life | Lifehacker | 2022-10-29 | 2:11 | Third-party roundup | Supplemental, low-detail | https://www.youtube.com/watch?v=WRONq7Le23w |
| Habitica | Habitica: The App That Makes Your Life a Game! Full Review | UK Best Reviewer | 2023-06-01 | 2:08 | Third-party review | Supplemental | https://www.youtube.com/watch?v=0WLIE6GnPXs |

## Bevel Observations

### Bevel 3.0 Positioning and Coach Model

Source: `LBgTTTMgWwA`, official product demo.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:02:04 | AI/coach interaction | The launch narrative reframes health data from more activity tracking into a coach that understands body, goals, and limits. | Borrow: SIA should explain the user's current state before prescribing action. |
| 00:02:17 | AI/coach interaction | Bevel Intelligence is described as rebuilt as an always-available coach. | Borrow: make SIA feel persistent and available, not like a one-off report generator. |
| 00:02:37 | Memory/files | Files give Bevel Intelligence long-term context that can be referenced later. | Borrow: Balencia's Personal Wiki/SIA Memory should be explicit and inspectable. |
| 00:02:52 | Insight quality | The demo emphasizes surfacing a pattern the user would not have noticed alone. | Borrow: prioritize surprising but useful cross-domain synthesis over generic tips. |
| 00:03:27 | Adaptive coaching | If the user's body is not ready for a workout, the coach adjusts the plan. | Adapt carefully: health readiness should modulate recommendations without making the UI feel restrictive. |
| 00:03:59 | Health records | Bloodwork and biometrics are combined with research and daily data for a fuller explanation. | Adapt carefully: medical-like data requires trust, provenance, and user control. |
| 00:04:23 | Data visualization | Bevel positions the intelligence layer as ongoing data analysis rather than static chart viewing. | Borrow: SIA should interpret dashboards continuously, not wait for manual drilling. |
| 00:04:30 | Logging | Food logs become part of the coaching context. | Borrow: logs should feed future coaching, not disappear into a history list. |

### Bevel Intelligence Interface

Source: `fV28YVFTQTc`, official product demo.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:00:13 | AI/coach interaction | The product promises proactive check-ins, memory control, custom charts, analysis, and food logging. | Borrow: SIA should combine proactive prompts, memory controls, and structured outputs. |
| 00:00:29 | Dashboard entry | Bevel Intelligence is reachable from the home dashboard through suggested actions and typed input. | Borrow: put SIA entry points directly on Today/dashboard, not only in a separate chat tab. |
| 00:00:43 | Action shortcuts | Suggested actions cover logging food, building workouts, and deeper analysis. | Borrow: use high-intent chips that start real workflows, not generic prompts. |
| 00:00:52 | Navigation | A swipe-left area exposes chat history, health records, files, and settings. | Adapt: SIA needs a lightweight side/navigation model for history, memory, and controls. |
| 00:01:01 | Memory transparency | Files show what the AI knows and persist across conversations. | Borrow: make memory visible as an object the user can inspect. |
| 00:01:19 | User control | Files include generated artifacts such as custom charts and can be created, edited, or deleted. | Borrow: all AI-generated plans, charts, and memories need edit/delete affordances. |

### Biological Age and Long-Term Health Context

Source: `QVEhng6A8ts`, official product demo.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:00:11 | Data foundation | Biological Age and Health Records are presented as foundations for the intelligence engine. | Adapt carefully: Balencia should show why sensitive data improves coaching before asking for it. |
| 00:00:22 | Data visualization | Biological Age turns physiology into a longer-term roadmap rather than a one-day score. | Borrow: show multi-month trajectory for domains where daily scores are too noisy. |
| 00:00:42 | Trend interpretation | The refreshed biology experience is framed around seeing what is happening inside the body over time. | Borrow: long-term views should explain change, not just plot it. |

### Pricing and Value Perception

Source: `hYJxwxMwPng`, third-party critique.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:00:00 | Paywall/value | The review starts from the question of whether the paid tier justifies the price. | Avoid: do not ask for a premium commitment before the user has felt differentiated value. |
| 00:00:34 | Paywall/value | The critique says Bevel had been valuable as a free app, then introduced a higher paid tier around 3.0. | Avoid: preserve trust when changing monetization or feature access. |
| 00:00:50 | Paywall/value | The reviewer separates the useful free experience from the more specific paid use case. | Adapt: Balencia's free tier should stay coherent while paid SIA depth is clearly additive. |
| 00:01:55 | Paywall/value | New features are acknowledged as good, but the price/value equation dominates perception. | Borrow the feature clarity; avoid making price the user's first mental model. |

### Reviewed But Low-Signal

- `3u0_VbuwQdY` is a short official promo. It reinforces broad positioning, but does not add enough UI/UX detail beyond the official site, App Store-style evidence, and longer Bevel videos.
- `BgkyeDwhyx8` and `J7HEiFEF2bs` were reviewed at metadata level, but auto-caption download was blocked by a YouTube rate-limit response. They are not used as evidence in the notes.

## Habitica Observations

### Tutorial Review and Core Task Loop

Source: `A5fHK6ndXQU`, third-party tutorial/review.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:00:18 | Gamification | Habitica is introduced as adding game elements to productivity and to-do lists. | Borrow the loop, not the skin: make effort visible and rewarding. |
| 00:01:03 | Onboarding/comparison | The reviewer contrasts Habitica with a simpler to-do app that was easy to get into. | Avoid: do not let the gamification layer raise first-run comprehension cost. |
| 00:01:49 | Rewards/quests | Pets, gear, quests, and teammates are described as long-term motivational systems. | Borrow: progression can include cosmetic, social, and journey-based rewards. |
| 00:02:07 | Task completion | Completing to-dos and habits earns experience and gold. | Borrow: make every meaningful action produce immediate progress feedback. |
| 00:02:13 | Progression | Experience supports leveling, class choice, and character skills. | Adapt carefully: mature users may prefer skill/domain progression over fantasy classes. |
| 00:02:36 | Rewards | Custom real-world rewards can be bought with earned gold. | Borrow: user-defined rewards can connect gamification to real motivation. |
| 00:03:00 | Information architecture | Habitica is organized into habits, dailies, and to-dos. | Borrow: split actions by recurrence and behavior type, but explain it clearly. |
| 00:03:50 | Task setup | Difficulty levels influence reward tuning. | Borrow: task effort should affect XP/reward value, but avoid making setup feel like bookkeeping. |
| 00:04:18 | Negative loops | Negative habits can reduce health or experience. | Avoid: punitive mechanics should be opt-in, not a default Balencia loop. |
| 00:04:33 | Task organization | The reviewer notes limited to-do categorization compared with a dedicated task app. | Avoid: Balencia needs domain/project structure if it absorbs life-planning tasks. |
| 00:05:26 | Social/accountability | Party quests with friends are a deeper system, but not fully explored in the video. | Adapt: make shared goals supportive and visible without overloading the first-run flow. |
| 00:06:20 | Motivation cost | The reviewer reports spending time on leveling, shop browsing, customization, and reward setup. | Avoid: rewards should not become a distraction from the user's actual life action. |
| 00:08:51 | Outcome critique | The reviewer recommends Habitica for people who like games, but does not see it as a guaranteed productivity boost. | Adapt carefully: gamification is a motivation layer, not the product's core promise. |

### Habitica Compared With LifeUp

Source: `tFFTa76ZikE`, third-party comparison.

| Timestamp | UX surface | Observation | Balencia lesson |
|---|---|---|---|
| 00:00:06 | Visual system | Habitica is framed as a retro RPG with pixel art and fantasy framing. | Avoid copying the skin; borrow only the motivational mechanics. |
| 00:00:18 | Navigation/IA | Tasks are sorted into habits, dailies, and to-dos. | Borrow: clear task taxonomy helps users decide where an action belongs. |
| 00:00:46 | Social/accountability | Parties and boss battles create pressure because missed dailies affect the group. | Adapt carefully: group consequence is powerful but can become stressful. |
| 00:01:32 | Progression | Tasks can be linked to skills and level up specific abilities. | Borrow: map Balencia actions to real-life skills or domains. |
| 00:01:40 | Rewards | The app supports a personal virtual shop with user-defined rewards and prices. | Borrow: let users define rewards that matter to them. |
| 00:02:22 | Motivation model | Daily tasks are presented as quests, with the user as the protagonist. | Adapt: Balencia can make life actions narrative without using fantasy language everywhere. |
| 00:02:51 | Social/accountability | Users can form parties and take on boss monsters together. | Borrow the shared mission structure; avoid punitive defaults. |
| 00:03:12 | Competitive context | Cleaner alternatives can use XP/leveling without retro art or preset quests. | Borrow: Balencia can use mature gamification while keeping a premium UI. |

### Supplemental Habitica Evidence

| Source | Timestamp | Observation | Use in analysis |
|---|---|---|---|
| `WRONq7Le23w` | 00:00:15 | Habitica is described as turning a to-do list into a quest, with XP and gold for completed work. | Corroborates task-as-quest and immediate reward framing. |
| `WRONq7Le23w` | 00:01:34 | Progress visualization and quests are presented as motivation aids. | Supports Balencia progression/quest framing. |
| `0WLIE6GnPXs` | 00:00:35 | Users create tasks/habits and assign difficulty or point values. | Supports task setup/reward tuning notes. |
| `0WLIE6GnPXs` | 00:01:19 | Avatar, class, and gear customization are part of the appeal. | Supports collection/cosmetic motivation notes. |

## Cross-Product UI/UX Lessons For Balencia

### Borrow

- Bevel Intelligence's dashboard entry points, suggested actions, and typed chat as a model for SIA inside Today.
- Bevel's visible AI memory/files model for Balencia's Personal Wiki and SIA Memory.
- Bevel's use of health records and long-term metrics to convert raw data into coachable context.
- Habitica's task loop: action, immediate reward, visible progress, longer-term unlock.
- Habitica's user-defined rewards and shared quests, adapted into mature social/accountability flows.

### Avoid

- A premium paywall that becomes the main story before users have experienced SIA's differentiated value.
- Punitive group mechanics as the default motivational engine.
- RPG UI density or fantasy terminology that makes Balencia feel less premium or less adult.
- Gamification setup that becomes a parallel productivity task.

### Adapt Carefully

- Health records and biological-age-like summaries need trust framing, provenance, and easy opt-out.
- SIA memory should be powerful but inspectable, editable, and deleteable.
- Social accountability should create support and momentum, not shame.
- Balencia can use quests and skills, but they should map to real domains and goals rather than fantasy classes by default.
