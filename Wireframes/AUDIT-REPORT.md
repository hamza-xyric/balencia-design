# Balencia Wireframe Audit Report

**Date:** 2026-05-22
**Scope:** 78 screens across 17 batches (23,205 lines of HTML)
**Methodology:** Automated grep scans + manual deep-read of every batch file against the design system, brand guidelines, and shared patterns spec.

---

## Executive Summary

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 2 | Broken brand rules that misrepresent the product |
| High | 9 | Wrong content, duplicate screens, wrong component specs |
| Medium | 28 | Design system violations visible to reviewers |
| Low | 50+ | Sentence case violations on secondary text, minor inconsistencies |
| Info | 8 | Observations and improvement suggestions |

**The single most pervasive issue is sentence case violations.** Nearly every batch has lowercase text on CTAs, nav titles, labels, chips, and links where the brand requires sentence case (first letter capitalized). This affects 100+ individual text elements across 14 of 17 batches. Batches 07 and 14 are the cleanest.

---

## Foundation CSS Issues (affect ALL batches)

These issues live in `balencia-foundation.css` and propagate to every screen.

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| F-01 | Medium | Shadows | Device frame `box-shadow` uses cool `rgba(0,0,0,.6)` instead of warm `rgba(33,16,8,.6)` | 184 | Change to `rgba(33,16,8,.6)` |
| F-02 | Low | Shadows | `.backdrop` uses cool `rgba(0,0,0,.6)` | 490 | Change to `rgba(33,16,8,.6)` |
| F-03 | Low | Typography | `.section-eyebrow` font-size is 11px with letter-spacing .1em; spec says 12px / .12em | 454-456 | Update to `font-size: 12px; letter-spacing: .12em` |
| F-04 | Low | Typography | `.eyebrow` utility class font-size is 11px; spec says 12px | 519-521 | Update to `font-size: 12px` |
| F-05 | Info | Components | Input field bg uses `var(--ink-brown)` (#211008) instead of spec-stated #171717 (ink-700). The warm brown is arguably more on-brand. | 256 | Align spec or CSS -- warm brown is fine |

---

## Batch-by-Batch Findings

### Batch 01: Pre-Auth (5 screens: Splash, Motion Carousel, Welcome/Sign Up, Sign In, Forgot Password)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 01-01 | Medium | Sentence Case | CTA "next" is lowercase | 260 | Change to "Next" |
| 01-02 | Medium | Sentence Case | CTA "sign up" is lowercase | 322 | Change to "Sign up" |
| 01-03 | Medium | Sentence Case | CTA "sign in" is lowercase | 398 | Change to "Sign in" |
| 01-04 | Medium | Sentence Case | CTA "send reset link" is lowercase | 460 | Change to "Send reset link" |
| 01-05 | Low | Sentence Case | Skip button "skip" is lowercase | 212 | Change to "Skip" |

---

### Batch 02: Auth Extended (5 screens: OTP, Privacy Consent, Complete Profile, WhatsApp Enrollment, Guest Mode)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 02-01 | High | Sentence Case | Heading "take a look around" is all lowercase | 485 | Change to "Take a look around" |
| 02-02 | High | Sentence Case | Sub-text "tell us your name..." starts lowercase | 487 | Capitalize first letter |
| 02-03 | Medium | Sentence Case | CTA "verify" is lowercase | 270 | Change to "Verify" |
| 02-04 | Medium | Sentence Case | CTA "continue" is lowercase (2 instances) | 329, 392 | Change to "Continue" |
| 02-05 | Medium | Sentence Case | CTA "send code" is lowercase | 436 | Change to "Send code" |
| 02-06 | Medium | Sentence Case | CTA "explore" is lowercase | 505 | Change to "Explore" |
| 02-07 | Medium | Sentence Case | Skip link "skip" is lowercase | 413 | Change to "Skip" |
| 02-08 | Low | Sentence Case | Value list items "daily reminders", "check-in prompts" are lowercase | 441, 445 | Capitalize first letter |
| 02-09 | Low | Sentence Case | Domain chip labels ("fitness", "nutrition", etc.) are lowercase with no CSS text-transform | 494-502 | Capitalize each label |

---

### Batch 03: Onboarding (2 screens: SIA Onboarding Conversation, Initial Plan Summary)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 03-01 | Critical | Color Misuse | SIA chat avatar `.chat-sia-avatar` uses `var(--brand-orange)` background. SIA is an AI element and MUST use purple (#7F24FF) | CSS ~159 | Change to `var(--royal-purple)` |
| 03-02 | High | Sentence Case | SIA heading "here's your plan." starts lowercase | 519 | Change to "Here's your plan." |
| 03-03 | High | Sentence Case | "let's go." after period is lowercase | 521 | Change to "Let's go." |
| 03-04 | Medium | Sentence Case | SIA bubble "what areas of your life matter most..." starts lowercase | 457 | Capitalize first letter |
| 03-05 | Medium | Sentence Case | SIA bubble "great choices. let's start..." has lowercase after period | 472 | Capitalize "Great" and "Let's" |
| 03-06 | Medium | Sentence Case | Chat chips ("run a half marathon", etc.) are lowercase | 477-480 | Capitalize first letter of each |
| 03-07 | Low | Sentence Case | Chat input placeholder "type a message" is lowercase | 487 | Change to "Type a message" |
| 03-08 | Low | Sentence Case | Domain bubble labels are lowercase | 375-424 | Capitalize each |
| 03-09 | Low | Sentence Case | Goal card "customize" link is lowercase | 633 | Change to "Customize" |

---

### Batch 04: Core Shell (2 screens: Home Screen, SIA Chat)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 04-01 | Medium | Sentence Case | Day separator "today" is lowercase (no CSS text-transform) | 592 | Change to "Today" |
| 04-02 | Medium | Sentence Case | Suggestion chips "tell me more", "show my goals", "log a meal" are lowercase | 645-647 | Capitalize first letter of each |
| 04-03 | Medium | Sentence Case | Chat input "message SIA" is lowercase | 654 | Change to "Message SIA" |
| 04-04 | Low | Sentence Case | "view more" link is lowercase | 621 | Change to "View more" |
| 04-05 | Low | Sentence Case | "view all" link is lowercase | 515 | Change to "View all" |
| 04-06 | Low | Sentence Case | Mood chips "great", "okay", "low", "energised" are lowercase | 377-380 | Capitalize first letter of each |

Note: Tab labels in batch 04 are correctly capitalized (Today, SIA, Goals, Me). The earlier preliminary scan was incorrect.

---

### Batch 05: SIA Voice + Goals (5 screens: Voice In-Chat, Voice Full-Screen, Goals List, Goal Detail, Create/Edit Goal)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 05-01 | Medium | Sentence Case | Goals list title "your missions" is lowercase | 853 | Change to "Your missions" |
| 05-02 | Medium | Sentence Case | Filter chips "all", "active", "completed", "by domain" are lowercase | 857-860 | Capitalize first letter of each |
| 05-03 | Medium | Sentence Case | Radar preview label "life areas overview" is lowercase | 870 | Change to "Life areas overview" |
| 05-04 | Medium | Sentence Case | Goal detail nav title "run a half marathon" is lowercase | 990 | Change to "Run a half marathon" |
| 05-05 | Medium | Sentence Case | Modal title "new mission" is lowercase | 1215 | Change to "New mission" |
| 05-06 | Medium | Sentence Case | CTA button "create mission" is lowercase | 1346 | Change to "Create mission" |
| 05-07 | Low | Sentence Case | Expandable section titles are lowercase ("all actions", "milestones", etc.) | 1045-1122 | Capitalize first letter of each |
| 05-08 | Low | Sentence Case | "ask SIA about this goal" is lowercase | 1165 | Change to "Ask SIA about this goal" |
| 05-09 | Low | Sentence Case | "add action" is lowercase | 1260 | Change to "Add action" |
| 05-10 | Low | Sentence Case | Segmented control options "lenient", "balanced", "strict" are lowercase | 1316-1318 | Capitalize first letter |
| 05-11 | Low | Sentence Case | Voice panel "cancel" button is lowercase | 743 | Change to "Cancel" |
| 05-12 | Low | Sentence Case | Voice panel "listening..." is lowercase | 740 | Change to "Listening..." |

---

### Batch 06: Me Tab (4 screens: Me Main, Explore, RPG Character, Book of Life)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 06-01 | Critical | Tab Labels | Tab bar labels are lowercase on ALL 4 screens: "today", "goals", "me" (SIA is correct). This is the only batch with this issue. | 569-581, 783-795, 1002-1014, 1147-1159 | Change to "Today", "Goals", "Me" across all 4 screens (12 label fixes) |
| 06-02 | High | Shadows | Cool shadow `rgba(0,0,0,.3)` on `.character-card` | CSS line 211 | Change to `rgba(33,16,8,.3)` |
| 06-03 | High | Tab Icons | Tab bar SVG icons differ from other batches (house/star/target/person vs standard house/chat-bubble/target/person) | 567-582 | Standardize to match batches 07-10 icon set |
| 06-04 | Medium | Sentence Case | Profile quick link labels are lowercase ("RPG character", "book of life", "connected apps", etc.) | 474-524 | Capitalize first letter of each |
| 06-05 | Medium | Sentence Case | Nav titles are lowercase: "explore", "your character", "book of life" | 609, 824, 1043 | Capitalize first letter of each |
| 06-06 | Medium | Sentence Case | Book of Life entry titles are lowercase | 1072-1128 | Capitalize first letter of each |
| 06-07 | Low | Sentence Case | RPG labels "level 14", "dedicated explorer" are lowercase | 836, 838 | Capitalize first letter |
| 06-08 | Low | Sentence Case | Module card names lowercase: "strength basics", "speed reading", etc. | 540-555 | Capitalize first letter of each |
| 06-09 | Low | Sentence Case | Domain section names lowercase in Explore | 655-750 | Capitalize first letter of each |
| 06-10 | Low | Sentence Case | "show earlier quests", "view all" are lowercase | 933, 992 | Capitalize first letter |
| 06-11 | Low | Components | RPG domain label "relations" is truncated, should be "Relationships" | 870 | Change to full name |

---

### Batch 07: Settings (5 screens: Settings, Connected Services, Subscription & Billing, Notification History, Help Center)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 07-01 | Medium | Components | Help search bar height is 48px instead of standard 52px | CSS line 309 | Change to 52px |

**Batch 07 is the cleanest batch.** All nav titles, CTA labels, and interactive text use correct sentence case. Tab bars correctly show "Me" as active. No shadow, color, or structural issues found.

---

### Batch 08: Fitness + Nutrition (5 screens: Fitness Dashboard, Workout Detail, Nutrition Dashboard, Meal Detail, Food Logger)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 08-01 | High | Screen Numbering | Duplicate Screen 29: Slide 4 is "Meal detail" and Slide 5 is "Food logger" — both labeled Screen 29 | 1068, 1210 | Assign distinct numbers (e.g., Screen 29 and Screen 29b) |
| 08-02 | High | Components | CTA "Start workout" has inline `height:48px` overriding the 56px standard | 564 | Remove `height:48px` from inline style |
| 08-03 | Medium | Metadata | Batch label says "4 screens" but carousel has 5 slides | 496 | Update to "5 screens" |

Domain colors, SIA coaching notes, and accent lines are all correct. Typography is generally in proper sentence case.

---

### Batch 09: Finance + Career + Relationships (4 screens: Finance/Money Map, Transaction Detail, Career & Work, Relationships)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 09-01 | Low | Sentence Case | "ask SIA" links are lowercase | 569, 828, 910, 1111 | Change to "Ask SIA" |
| 09-02 | Low | Sentence Case | "recategorize" button is lowercase | 835 | Change to "Recategorize" |
| 09-03 | Low | Sentence Case | "do it" and "skip" button labels are lowercase | 1222, 1223 | Change to "Do it" and "Skip" |
| 09-04 | Low | Sentence Case | "+ add person" is lowercase | 1179 | Change to "+ Add person" |
| 09-05 | Low | Sentence Case | "view all" links are lowercase | 602, 634, 1187 | Change to "View all" |

Domain colors, accent lines, and SIA coaching notes are all correct.

---

### Batch 10: Spirituality + Learning + Creativity (3 screens)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 10-01 | Low | Components | Learning and Creativity accent lines have `height: 3px` vs Spirituality's 2px | CSS lines 45-46 | Standardize to 2px |
| 10-02 | Low | Sentence Case | "ask SIA" links are lowercase | 520, 713, 963 | Change to "Ask SIA" |
| 10-03 | Low | Sentence Case | "log reading", "write reflection" links are lowercase | 587, 619 | Capitalize first letter |
| 10-04 | Low | Sentence Case | Timer labels "meditate", "dhikr" are lowercase | 630, 635 | Capitalize first letter |
| 10-05 | Low | Sentence Case | "log session" FAB text is lowercase | 891, 1157 | Change to "Log session" |
| 10-06 | Low | Sentence Case | "start creating", "reflect on this" buttons are lowercase | 1001, 1002 | Capitalize first letter |
| 10-07 | Low | Sentence Case | "see all" links are lowercase | 850, 989 | Change to "See all" |

Domain colors and accent lines are correct.

---

### Batch 11: Cross-Domain (5 screens: Journal, Habits, Leaderboard, Community Rooms, Room Chat)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 11-01 | High | CSS Quality | `!important` used on `.seg.active-orange` for background and color | 42 | Remove `!important`; use higher specificity selector |
| 11-02 | Medium | Metadata | Batch label says "4 screens" but carousel has 5 slides (40a + 40b) | 428 | Update to "5 screens" |
| 11-03 | Medium | Sentence Case | Nav titles are lowercase: "journal", "habits", "leaderboard", "community" | 468, 612, 879, 1081 | Capitalize first letter of each |
| 11-04 | Low | Sentence Case | Segmented tabs "this week", "this month", "all time" are lowercase | 888-890 | Capitalize first letter |
| 11-05 | Low | Sentence Case | Filter tabs "global", "friends" are lowercase | 919-920 | Capitalize first letter |
| 11-06 | Low | Color Semantics | Green (#34A853) used for gamification elements (XP earned, rank-up, achievements) — green is spec'd as "success/completion only" | 169, 184, 393, 400 | Verify intent; consider orange for gamification |

---

### Batch 12: Supporting + Overlays (4 screens: Schedule/Calendar, Celebration Overlay, Paywall, Life Areas Overview)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 12-01 | High | CSS Quality | `!important` used on `.seg.active-orange` for background and color | 33 | Remove `!important`; use higher specificity selector |
| 12-02 | Medium | Structure | Screen 16 (Life areas overview) appears out of sequence in batch 12 | 882-887 | Document the rationale or move to correct batch |
| 12-03 | Medium | Sentence Case | Nav titles are lowercase: "schedule", "life areas" | 467, 907 | Capitalize first letter |
| 12-04 | Low | Sentence Case | Segmented tabs "day", "week", "month" are lowercase | 476-478 | Capitalize first letter |
| 12-05 | Low | Sentence Case | Segmented tabs "week", "month", "all-time" are lowercase (Screen 16) | 972-974 | Capitalize first letter |

---

### Batch 13: Wellbeing Core (5 screens: Water Intake, Daily Check-in, Accountability, Competitions, Intelligence Dashboard)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 13-01 | High | Shadows | Cool shadow `rgba(0,0,0,.3)` on `.slider-thumb` | 173 | Change to `rgba(33,16,8,.3)` |

Purple is correctly used only for SIA/Intelligence features. Tab bar and domain colors are correct.

---

### Batch 14: Wellbeing Mind-Body (5 screens: Progress Photos, Profile Edit, Voice Call History, Stress Management, Breathing Exercises)

**PASS — no issues found.** All typography uses correct sentence case. Domain colors are correct. Tab bars and active states are appropriate.

---

### Batch 15: Wellness Tools (7 slides / 4 unique screens: Meditation, Yoga x3 states, Recipes x2 states, Shopping List)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 15-01 | High | Screen Numbering | Screen 55 used THREE times (Yoga browse, active session, post-session) | 1039, 1189, 1267 | Re-label as Screen 55a, 55b, 55c |
| 15-02 | High | Screen Numbering | Screen 56 used TWICE (Recipes browse, Recipe detail) | 1377, 1607 | Re-label as Screen 56a, 56b |
| 15-03 | Medium | Brand Voice | Exclamation mark in "new personal best!" — design system forbids exclamation marks | 1336 | Remove exclamation mark |
| 15-04 | Medium | Metadata | Batch label says "4 screens" but carousel has 7 slides | 858 | Update to "4 screens (7 slides)" |

---

### Batch 16: Health Tracking (6 screens: Sleep, Streaks, Medication, Reminders, Quick Notes, Energy)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 16-01 | High | Shadows | Cool shadow `rgba(0,0,0,.3)` + white bg `#fff` on `.slider-thumb` | 675 | Change shadow to `rgba(33,16,8,.3)` |
| 16-02 | Medium | Color Naming | CSS class `.cal-legend-dot.grey` uses "grey" spelling | 286, 1074 | Rename to `.missed` or `.inactive` |
| 16-03 | Low | Sentence Case | CTA "use freeze" is lowercase | 1108 | Change to "Use freeze" |
| 16-04 | Low | Sentence Case | CTA "log energy" is lowercase | 1677 | Change to "Log energy" |
| 16-05 | Low | Color Semantics | Green used for streak calendar cells and milestones — same concern as batch 11 | 270, 284, 325, 336 | Verify intent |

---

### Batch 17: System (6 screens: Report/Block, Force Update, Notification Permission, Image Viewer, Universal Search, App Rating)

| ID | Severity | Category | Finding | Line(s) | Fix |
|----|----------|----------|---------|---------|-----|
| 17-01 | Medium | Sentence Case | Report sheet title "report" is lowercase | 535 | Change to "Report" |
| 17-02 | Medium | Sentence Case | CTA "submit report" is lowercase | 589 | Change to "Submit report" |
| 17-03 | Medium | Sentence Case | Report radio labels all lowercase ("spam", "harassment", etc.) | 555-575 | Capitalize first letter of each |
| 17-04 | Medium | Sentence Case | "also block this user" and "you won't see their messages" are lowercase | 582, 583 | Capitalize first letter |
| 17-05 | Medium | Sentence Case | "cancel" is lowercase (inconsistent — line 862 correctly says "Cancel") | 534 | Change to "Cancel" |
| 17-06 | Medium | Sentence Case | "not now" is lowercase (inconsistent — line 754 correctly says "Not now") | 1060 | Change to "Not now" |
| 17-07 | Low | Sentence Case | "don't ask again" is lowercase | 1061 | Change to "Don't ask again" |
| 17-08 | Low | Components | Rating sheet background uses `var(--ink-900)` instead of `var(--ink-brown)` for sheet surface | CSS ~431 | Change to `var(--ink-brown)` |
| 17-09 | Low | Shadows | Canvas thumbnail renderer uses cool `rgba(0,0,0,.5)` | 1119, 1219 | Change to `rgba(33,16,8,.5)` |

---

## Cross-Batch Consistency Findings

| ID | Severity | Category | Finding | Batches Affected | Fix |
|----|----------|----------|---------|------------------|-----|
| X-01 | Critical | Sentence Case | Pervasive lowercase text across CTAs, nav titles, labels, chips, links. 100+ individual violations. | 01-06, 09-12, 16-17 | Systematic find-and-fix pass on all text content |
| X-02 | High | Tab Icons | Tab bar SVG icons differ between batches. Batch 05 uses sun/chat/clock/person. Batch 06 uses house/star/target/person. Batches 07+ use house/chat-bubble/target/person. | 05, 06 vs 07+ | Standardize all batches to a single icon set |
| X-03 | Medium | Token Usage | Foundation card classes (`.card`, `.card-sm`, `.card-hero`) and shadow tokens (`--shadow-1/2/3`, `--glow-*`) are rarely used. Most batches inline equivalent styles. | All | Not a functional issue, but increases maintenance burden |
| X-04 | Medium | Metadata | Batch slide count mismatch in labels: batches 08, 11, 15 state fewer screens than actual slides | 08, 11, 15 | Update batch labels to match actual slide count |
| X-05 | Low | Foundation | Eyebrow classes use 11px/0.1em instead of spec 12px/0.12em | All | Fix in `balencia-foundation.css` |

---

## Prioritized Fix List

### Priority 1: Critical (fix immediately)
1. **SIA avatar color** (batch-03): Change from orange to purple — misrepresents the AI coach's identity
2. **Tab bar labels** (batch-06): Fix lowercase "today", "goals", "me" across all 4 screens
3. **Sentence case pass**: Fix all CTA buttons, headings, and nav titles across batches 01-06, 09-12, 16-17

### Priority 2: High (fix before Figma handoff)
4. **Duplicate screen numbers**: Re-label Screen 29a/29b (batch-08), Screen 55a/55b/55c and 56a/56b (batch-15)
5. **CTA button height**: Remove inline `height:48px` override (batch-08, line 564)
6. **Cool shadows**: Replace all `rgba(0,0,0,...)` with `rgba(33,16,8,...)` in batches 06, 13, 16, 17, and foundation CSS
7. **!important overrides**: Remove from batches 11, 12; use higher specificity selectors
8. **Tab bar icon inconsistency**: Standardize SVG icons across batches 05, 06 to match 07+ pattern

### Priority 3: Medium (recommended)
9. **Exclamation mark**: Remove from "new personal best!" (batch-15)
10. **Batch metadata labels**: Fix screen counts in batches 08, 11, 15
11. **Search bar height**: Fix 48px to 52px in batch-07
12. **Screen 16 placement**: Document why Life Areas Overview is in batch-12
13. **Foundation eyebrow spec**: Update to 12px/0.12em
14. **"grey" class name**: Rename in batch-16

### Priority 4: Low (nice to have)
15. **Secondary text sentence case**: Fix remaining lowercase on chips, links, labels, domain names across all batches
16. **Green color semantics**: Review whether gamification XP/streaks should use orange instead of green
17. **Accent line thickness**: Standardize 2px vs 3px in batch-10
18. **Rating sheet background**: Change from ink-900 to ink-brown in batch-17
19. **Foundation token adoption**: Consider migrating inline card/shadow styles to use foundation classes

---

## Screens Passing Clean

- **Batch 07** (Settings, Connected Services, Subscription, Notification History, Help Center) — 1 minor issue only
- **Batch 14** (Progress Photos, Profile Edit, Voice Call History, Stress Management, Breathing) — no issues found

---

## Summary by Category

| Category | Count | Severity Range |
|----------|-------|----------------|
| Sentence case violations | ~100+ | Medium-Low |
| Shadow color (cool vs warm) | 6 | High-Low |
| Screen numbering duplicates | 3 | High |
| Component spec violations | 3 | High-Medium |
| CSS quality (!important) | 2 | High |
| Tab bar inconsistency | 2 | Critical-High |
| Color misuse (SIA avatar) | 1 | Critical |
| Brand voice (exclamation mark) | 1 | Medium |
| Metadata accuracy | 3 | Medium |
| Token/naming conventions | 4 | Low |
