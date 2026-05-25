# Balencia HTML Wireframe — Batch {{BATCH_NUMBER}}: {{BATCH_TITLE}}

You are building high-fidelity HTML wireframes for Balencia, a premium AI life coaching mobile app. Each wireframe shows a screen inside an iPhone 15 Pro device frame, navigable via a carousel. This is WIREFRAME work — the HTML files will be viewed in a browser and later used as references for Figma design.

---

## Your screens this batch

{{SCREEN_TABLE}}

---

## Files to read BEFORE you start

Read these files in order. Do not skip any.

### 1. Shared CSS foundation (REQUIRED — link it, do NOT duplicate)
`/Users/hamza/yHealth/Wireframes/balencia-foundation.css`

Your HTML must link to it via:
```html
<link rel="stylesheet" href="../balencia-foundation.css">
```
Do NOT duplicate or override foundation tokens/components. Only add batch-specific styles in a `<style>` block.

### 2. Screen specifications (read ALL screens in this batch)
{{SPEC_FILES}}

Each file contains: Purpose, Information Architecture, Layout (with ASCII wireframe), Components, Color Map, Interaction States, Motion, Empty States, and Cross-References.

### 3. Shared patterns library
`/Users/hamza/yHealth/app_design 3/_shared-patterns.md`

Single source of truth for all reusable component specs. If a component appears in your screens, check this file for its canonical spec.

### 4. Design system reference (for token verification)
`/Users/hamza/yHealth/Balencia/Design-System-Overview.md`

Read sections 5 (Color), 6 (Typography), 9 (Spacing/Radius/Shadows/Motion), 10 (Component Primitives) if you need to verify any token values.

### 5. Previous batch wireframes (for visual consistency)
{{PREVIOUS_BATCHES}}

Review the structure, device frame, and carousel pattern to maintain consistency.

---

## Design system quick reference

| Token | Value | Use |
|-------|-------|-----|
| --orange | #FF5E00 | Primary CTA, action, 60% role |
| --green | #34A853 | Success, completion, 30% role |
| --purple | #7F24FF | SIA/AI only, 10% role |
| --ink-900 | #0A0A0F | Screen background |
| --ink-brown-800 | #211008 | Card/surface background |
| --white | #FFFFFF | Text at 100%, 70%, 50%, 40% opacity |
| Font | Sora (Google Fonts) | All UI text |
| Card radius | 28px | Default card (--r-xl) |
| Button radius | 999px | All CTAs (--r-pill) |
| Screen width | 393px | iPhone 15 Pro viewport |
| Tab bar | 56px height | 4 tabs: Today, SIA, Goals, Me |
| Touch targets | 44x44px min | All interactive elements |
| Spacing grid | 8pt base | 4, 8, 12, 16, 24, 32, 48, 64px |

**Domain colors** (tags/indicators only, never CTAs):
Fitness #EF4444 | Nutrition #84CC16 | Finance #10B981 | Career #6366F1 | Relationships #EC4899 | Spirituality #A855F7 | Learning #06B6D4 | Creativity #F59E0B | Wellbeing #14B8A6

---

## Output requirements

### File to create
`/Users/hamza/yHealth/Wireframes/batch-{{BATCH_SLUG}}/index.html`

### HTML structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Balencia — Batch {{BATCH_NUMBER}}: {{BATCH_TITLE}}</title>
  <link rel="stylesheet" href="../balencia-foundation.css">
  <style>
    /* Batch-specific styles only */
  </style>
</head>
<body>
  <!-- Page header with batch number and title -->
  <!-- Carousel with prev/next arrows -->
  <!-- One slide per screen: label + iPhone device frame + screen content -->
  <!-- Thumbnail strip for quick nav -->
  <!-- Carousel JS -->
</body>
</html>
```

### Per-screen rules
Each screen inside the device frame must have:
1. **Status bar** (44px, time + signal/wifi/battery icons)
2. **Dynamic island** (centered pill)
3. **Screen content** — faithfully translate the ASCII wireframe from the spec
4. **Bottom tab bar** (if spec says visible) — 4 tabs, correct active state highlighted
5. **Home indicator** (bottom pill)

### Visual fidelity
- Use REAL placeholder content from the spec files (not Lorem ipsum)
- Sora font at correct sizes and weights
- Correct colors from the token system
- Cards with proper radius, padding, glassmorphism border (1px white at 5-8% opacity)
- Charts as simplified CSS (bars, rings via conic-gradient, etc.)
- Icons as simple SVG inline or emoji — no icon library imports
- Images as colored placeholder rectangles
- Scrollable areas must actually scroll within the device frame

### Quality checklist
- [ ] Links `balencia-foundation.css` via relative path
- [ ] All {{SCREEN_COUNT}} screens present as carousel slides
- [ ] Each screen matches its spec's ASCII wireframe layout
- [ ] Dark mode: ink-900 bg, ink-brown-800 card surfaces
- [ ] Sora font renders (no system font fallback visible)
- [ ] 60/30/10 color ratio respected
- [ ] Sentence case on all UI text (no Title Case, no exclamation marks)
- [ ] Tab bar shows on product screens with correct active tab
- [ ] Carousel navigation works (arrows + thumbnails)
- [ ] Content scrolls if it exceeds device viewport

---

## Batch-specific context

{{BATCH_CONTEXT}}

---
---

# BATCH CONTEXT BLOCKS

Copy the relevant batch context block below into `{{BATCH_CONTEXT}}` above, then delete this reference section.

---

## Batch 0: Foundation

**Session goal**: Create `balencia-foundation.css` and `index.html` (navigator page).

Read the archived wireframe at `/Users/hamza/yHealth/Archive/Wireframes/batch-1-onboarding-auth.html` to extract the device frame, carousel, and component CSS patterns. Read `/Users/hamza/yHealth/Balencia/Design-System-Overview.md` for all design tokens. Read `/Users/hamza/yHealth/app_design 3/_shared-patterns.md` for component specs. Consolidate into a comprehensive shared CSS file at `/Users/hamza/yHealth/Wireframes/balencia-foundation.css`.

Then create `/Users/hamza/yHealth/Wireframes/index.html` as a navigator page showing all 17 batches as cards with batch number, title, screen count, screen names, and links to each batch's `index.html`. Use the foundation CSS for styling.

**The foundation CSS must contain:**
- CSS custom properties (all design tokens: colors, spacing, radius, shadows, motion, strokes)
- Google Fonts import (Sora + Chillax)
- Reset + base styles (box-sizing, body bg/font/color, scrollbar hiding)
- iPhone 15 Pro device frame (.device, .device-inner, .dynamic-island, .status-bar, .home-indicator)
- Carousel infrastructure (.carousel-wrap, .carousel-viewport, .carousel-track, .carousel-slide, .nav-arrow, .thumb-strip, .thumb)
- Page header (.page-header, .batch-label)
- Screen label (.screen-label .num, .screen-label .name)
- Screen layout (.screen, .screen-scroll, .auth-pad, .product-pad)
- Typography utilities (display sizes, body, caption, eyebrow, text-white/70/50/40, text-orange/green/purple)
- Component primitives: buttons (cta-btn, cta-btn.secondary, cta-btn.green, in-card-cta), cards (card, card-hero, card-sm), chips (domain-tag, filter-chip, tag-fitness through tag-wellbeing), form elements (input-field, search-bar, toggle-switch, segmented-control), navigation (bottom-tab-bar, tab-item, nav-bar, back-btn), progress (progress-ring, progress-bar), lists (section-eyebrow, section-heading-row, list-row), SIA (sia-coaching-note, sia-avatar, suggestion-chip), overlays (modal-sheet, backdrop), social (social-btn, divider-row)
- Spacing utilities (gap-8 through gap-32, mt/mb/px/py helpers)
- Placeholder patterns (placeholder-image, placeholder-chart, placeholder-avatar)
- Carousel JavaScript (arrow navigation, thumbnail click, keyboard arrows)

---

## Batch 1: Pre-Auth Foundation (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 01 | Splash screen | `/Users/hamza/yHealth/app_design 3/01-splash-screen.md` |
| 02 | Motion carousel | `/Users/hamza/yHealth/app_design 3/02-motion-carousel.md` |
| 03 | Welcome / sign up | `/Users/hamza/yHealth/app_design 3/03-welcome-sign-up.md` |
| 04 | Sign in | `/Users/hamza/yHealth/app_design 3/04-sign-in.md` |
| 05 | Forgot password | `/Users/hamza/yHealth/app_design 3/05-forgot-password.md` |

**Nav flow**: Splash -> Carousel -> Welcome (or Sign In). Welcome <-> Sign In. Sign In -> Forgot Password.

**Key components**: Brand logo (Chillax wordmark), carousel pagination dots, auth form layout, CTA button (orange pill), social auth buttons (Google/Apple), text input fields, "or" divider, link text.

**Mode**: Brand Mode (marketing aesthetic, more spacious than product screens).

**Previous batches to review**: None (first batch).

---

## Batch 2: Auth Extended (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 03b | OTP verification | `/Users/hamza/yHealth/app_design 3/03b-otp-verification.md` |
| 03c | Privacy consent | `/Users/hamza/yHealth/app_design 3/03c-consent.md` |
| 03d | Complete profile | `/Users/hamza/yHealth/app_design 3/03d-complete-profile.md` |
| 03e | WhatsApp enrollment | `/Users/hamza/yHealth/app_design 3/03e-whatsapp-enrollment.md` |
| 06 | Guest mode preview | `/Users/hamza/yHealth/app_design 3/06-guest-mode-preview.md` |

**Nav flow**: Sign Up (03) -> OTP (03b) -> Consent (03c) -> Complete Profile (03d, social auth only) -> WhatsApp (03e). Guest Mode (06) branches from Splash.

**Key components**: OTP 4-digit input boxes, consent toggles, profile photo upload circle, DOB picker, gender selector, WhatsApp opt-in card, blurred preview overlay for Guest Mode.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-01-pre-auth/index.html`

---

## Batch 3: Onboarding (2 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 07 | SIA onboarding conversation | `/Users/hamza/yHealth/app_design 3/07-sia-onboarding-conversation.md` |
| 08 | Initial plan summary | `/Users/hamza/yHealth/app_design 3/08-initial-plan-summary.md` |

**Nav flow**: Auth complete -> SIA Onboarding -> Plan Summary -> Home Screen.

**Key components**: Chat bubbles (SIA left, user right), MCQ response chips, stage progress indicator (7 stages), plan summary cards, domain selection, SIA avatar expressions. Screen 07 is the most complex single screen — a 7-stage conversational flow. Show the mid-conversation state (stage 3-4) as the default view.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-02-auth-extended/index.html`

---

## Batch 4: Core Shell (2 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 12 | Home screen | `/Users/hamza/yHealth/app_design 3/12-home-screen.md` |
| 09 | SIA chat | `/Users/hamza/yHealth/app_design 3/09-sia-chat.md` |

**Nav flow**: Home is Today tab root. SIA Chat is SIA tab root. Home links to SIA via greeting card. SIA links back to Home via inline cards.

**Key components**: Bottom tab bar (4 tabs: Today/SIA/Goals/Me — CRITICAL, used by all subsequent batches), SIA greeting card (purple left border), action cards (swipeable, domain tag, checkbox), progress rings, suggestion chips (horizontal scroll), chat messages (SIA gray bg, user orange-tinted), rich inline cards in chat, message input bar with mic icon. These 2 screens establish the product mode template.

**Mode**: Product Mode (compact, dense info, dark).

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-03-onboarding/index.html`

---

## Batch 5: SIA Voice + Goals (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 10 | SIA voice mode (in-chat) | `/Users/hamza/yHealth/app_design 3/10-sia-voice-in-chat.md` |
| 11 | SIA voice mode (full-screen) | `/Users/hamza/yHealth/app_design 3/11-sia-voice-full-screen.md` |
| 13 | Goals list | `/Users/hamza/yHealth/app_design 3/13-goals-list.md` |
| 14 | Goal detail | `/Users/hamza/yHealth/app_design 3/14-goal-detail.md` |
| 15 | Create / edit goal | `/Users/hamza/yHealth/app_design 3/15-create-edit-goal.md` |

**Nav flow**: SIA Chat (09) -> Voice In-Chat (10) or Voice Full-Screen (11). Goals List (13, tab root) -> Goal Detail (14) -> Create/Edit (15, modal). Goals List has FAB for Create Goal.

**Key components**: Voice waveform, recording indicator, breathing pulse animation, goal cards (48pt progress ring + title), filter chip row, FAB button, progress ring (large), expandable sections, natural language goal input, domain tag selector, strictness level selector.

**Active tab**: Voice screens = SIA tab. Goals screens = Goals tab.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html`

---

## Batch 6: Me Tab (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 17 | Me main | `/Users/hamza/yHealth/app_design 3/17-me-main.md` |
| 18 | Explore section | `/Users/hamza/yHealth/app_design 3/18-explore-section.md` |
| 19 | RPG character screen | `/Users/hamza/yHealth/app_design 3/19-rpg-character-screen.md` |
| 20 | Personal wiki / SIA memory | `/Users/hamza/yHealth/app_design 3/20-personal-wiki-sia-memory.md` |

**Nav flow**: Me Main (17, tab root) -> RPG (19) via level badge, -> Wiki (20), -> Explore (18) via card. Me Main has a 6-8 card quick-link grid.

**Key components**: Profile header (avatar, name, level badge), quick-link grid (icon + label cards), XP progress bar, achievement badges, streak display, module discovery cards, character avatar, wiki search bar, SIA memory entries (auto-populated facts with edit/delete).

**Active tab**: Me tab.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html`

---

## Batch 7: Settings (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 21 | Settings | `/Users/hamza/yHealth/app_design 3/21-settings.md` |
| 22 | Connected services | `/Users/hamza/yHealth/app_design 3/22-connected-services.md` |
| 23 | Subscription & billing | `/Users/hamza/yHealth/app_design 3/23-subscription-billing.md` |
| 24 | Notification history | `/Users/hamza/yHealth/app_design 3/24-notification-history.md` |
| 25 | Help center | `/Users/hamza/yHealth/app_design 3/25-help-center.md` |

**Nav flow**: Me Main (17) -> Settings (21) -> Connected Services (22). Me Main also links to Subscription (23), Notifications (24), Help (25).

**Key components**: Settings list rows (icon + label + toggle/chevron), integration cards (provider logo, status badge, connect/disconnect), tier cards (Free/Plus/Premium), notification rows (read/unread, date groups), FAQ accordion, search bar in Help.

**Active tab**: Me tab (stack from Me Main).

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-06-me-tab/index.html`

---

## Batch 8: Fitness + Nutrition (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 26 | Fitness & workouts dashboard | `/Users/hamza/yHealth/app_design 3/26-fitness-workouts-dashboard.md` |
| 27 | Workout detail / active workout | `/Users/hamza/yHealth/app_design 3/27-workout-detail-active-workout.md` |
| 28 | Nutrition & diet dashboard | `/Users/hamza/yHealth/app_design 3/28-nutrition-diet-dashboard.md` |
| 29 | Meal detail / food logger | `/Users/hamza/yHealth/app_design 3/29-meal-detail-food-logger.md` |

**Nav flow**: Home -> Fitness (26) -> Workout (27). Home -> Nutrition (28) -> Meal (29).

**Key components**: Domain dashboard template (SIA greeting, hero card, stat tiles 3-col, integration status, 7-day dots, goals, quick actions), workout modes (planning/active/summary), rep counter, macro ring display (conic-gradient), barcode scanner icon, meal quick-add. These establish the CANONICAL domain dashboard template.

**Active tab**: Today tab (stack push).

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html`

---

## Batch 9: Finance + Career + Relationships (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 30 | Finance / money map dashboard | `/Users/hamza/yHealth/app_design 3/30-finance-money-map-dashboard.md` |
| 31 | Transaction / budget detail | `/Users/hamza/yHealth/app_design 3/31-transaction-budget-detail.md` |
| 32 | Career & work dashboard | `/Users/hamza/yHealth/app_design 3/32-career-work-dashboard.md` |
| 33 | Relationships dashboard | `/Users/hamza/yHealth/app_design 3/33-relationships-dashboard.md` |

**Nav flow**: Home -> Finance (30) -> Transaction (31). Home -> Career (32). Home -> Relationships (33).

**Key components**: Follows domain dashboard template from Batch 8. Domain-specific: monthly KPI strip, budget category rows, transaction list, AI action cards, skills tags, deadline countdown, person rows.

**Domain colors**: Finance #10B981, Career #6366F1, Relationships #EC4899.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-08-fitness-nutrition/index.html`

---

## Batch 10: Spirituality + Learning + Creativity (3 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 34 | Spirituality dashboard | `/Users/hamza/yHealth/app_design 3/34-spirituality-dashboard.md` |
| 35 | Learning & growth dashboard | `/Users/hamza/yHealth/app_design 3/35-learning-growth-dashboard.md` |
| 36 | Creativity dashboard | `/Users/hamza/yHealth/app_design 3/36-creativity-dashboard.md` |

**Nav flow**: Home -> each dashboard. Standalone screens.

**Key components**: Follows domain dashboard template. Domain-specific: prayer/practice tracker, fasting countdown, reading progress, AI learning path, streak 7-day dots, practice heatmap, portfolio timeline, active projects.

**Domain colors**: Spirituality #A855F7, Learning #06B6D4, Creativity #F59E0B.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-08-fitness-nutrition/index.html`, `/Users/hamza/yHealth/Wireframes/batch-09-finance-career-rel/index.html`

---

## Batch 11: Cross-Domain (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 37 | Journal | `/Users/hamza/yHealth/app_design 3/37-journal.md` |
| 38 | Habits | `/Users/hamza/yHealth/app_design 3/38-habits.md` |
| 39 | Leaderboard | `/Users/hamza/yHealth/app_design 3/39-leaderboard.md` |
| 40 | Community chat rooms | `/Users/hamza/yHealth/app_design 3/40-community-chat-rooms.md` |

**Nav flow**: Home -> Journal (37), Habits (38). Me -> Leaderboard (39). Community (40) from multiple places.

**Key components**: Journal entry list (date headers, mood emoji, domain tags), writing mode bottom sheet, mood selector, habit rows (checkbox + streak + rate bar), rank card, rank rows (top 3 gold/silver/bronze), filter tabs (underline), room list, discover carousel, chat bubbles (community variant), shared achievement cards.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html` (chat patterns)

---

## Batch 12: Supporting + Overlays (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 41 | Schedule / calendar | `/Users/hamza/yHealth/app_design 3/41-schedule-calendar.md` |
| 42 | Celebration / achievement overlay | `/Users/hamza/yHealth/app_design 3/42-celebration-achievement-overlay.md` |
| 43 | Paywall / upgrade prompt | `/Users/hamza/yHealth/app_design 3/43-paywall-upgrade-prompt.md` |
| 16 | Life areas overview | `/Users/hamza/yHealth/app_design 3/16-life-areas-overview.md` |

**Nav flow**: Home -> Calendar (41). Celebration (42) = modal on goal completion. Paywall (43) = modal on premium access. Life Areas (16) from Home or Me.

**Key components**: Calendar views (day/week/month segmented control), time-slot grid, event cards, celebration modal (confetti, XP burst), blurred app preview behind Paywall, tier comparison, "maybe later" link, life area grid (9 domains with score rings).

**Note**: Screens 42 and 43 are overlay/modal screens — show with semi-transparent backdrop.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-07-settings/index.html` (tier cards)

---

## Batch 13: Wellbeing Core (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 44 | Water intake tracker | `/Users/hamza/yHealth/app_design 3/44-water-intake.md` |
| 45 | Daily check-in | `/Users/hamza/yHealth/app_design 3/45-daily-checkin.md` |
| 46 | Accountability partners | `/Users/hamza/yHealth/app_design 3/46-accountability.md` |
| 47 | Competitions | `/Users/hamza/yHealth/app_design 3/47-competitions.md` |
| 48 | Intelligence dashboard | `/Users/hamza/yHealth/app_design 3/48-intelligence-dashboard.md` |

**Nav flow**: Home -> Water (44), Check-in (45). Me -> Accountability (46), Competitions (47). Home/Me -> Intelligence (48).

**Key components**: Water progress ring (200pt), quick-add buttons, weekly bar chart, mood emoji selector (6 options), energy/stress sliders, intention text, gratitude prompt, partner rows, role badges, consent toggles, contract cards, competition cards, countdown timer, intelligence score ring (160pt), contradiction alerts, correlation rows, "best day" formula, prediction cards.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html`

---

## Batch 14: Wellbeing Mind-Body (5 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 49 | Progress photos | `/Users/hamza/yHealth/app_design 3/49-progress-photos.md` |
| 50 | Profile edit | `/Users/hamza/yHealth/app_design 3/50-profile-edit.md` |
| 51 | Voice call history | `/Users/hamza/yHealth/app_design 3/51-voice-call-history.md` |
| 52 | Stress management | `/Users/hamza/yHealth/app_design 3/52-stress-management.md` |
| 53 | Breathing exercises | `/Users/hamza/yHealth/app_design 3/53-breathing-exercises.md` |

**Nav flow**: Me -> Progress Photos (49), Profile Edit (50). SIA -> Voice History (51). Home -> Stress (52) -> Breathing (53).

**Key components**: Photo grid timeline, side-by-side comparison, weight trend chart, body measurement grid, profile form fields, delete account, call history cards, AI summaries, emotion trend, stress gauge, trigger donut chart, mental recovery score, relief tool cards, breathing technique cards (5 types), animated breathing circle, session timer, post-session rating.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-13-wellbeing-core/index.html`

---

## Batch 15: Wellness + Nutrition Tools (4 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 54 | Meditation / mindfulness | `/Users/hamza/yHealth/app_design 3/54-meditation-mindfulness.md` |
| 55 | Yoga sessions | `/Users/hamza/yHealth/app_design 3/55-yoga-sessions.md` |
| 56 | Recipes browser | `/Users/hamza/yHealth/app_design 3/56-recipes.md` |
| 57 | Shopping list | `/Users/hamza/yHealth/app_design 3/57-shopping-list.md` |

**Nav flow**: Stress (52) -> Meditation (54), Yoga (55). Nutrition (28) -> Recipes (56) -> Shopping List (57).

**Key components**: Practice library grid, session player/timer, guided session controls, pose library, difficulty chips, recipe cards (image + macros), nutrition breakdown, ingredient list, shopping list with category groups, auto-generated indicator, recipe cross-links.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-14-wellbeing-mind-body/index.html` (session timer pattern)

---

## Batch 16: Health Tracking (6 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 58 | Sleep tracking | `/Users/hamza/yHealth/app_design 3/58-sleep-tracking.md` |
| 59 | Streak details | `/Users/hamza/yHealth/app_design 3/59-streak-details.md` |
| 60 | Medication tracking | `/Users/hamza/yHealth/app_design 3/60-medication-tracking.md` |
| 61 | Reminders & tasks | `/Users/hamza/yHealth/app_design 3/61-reminders-tasks.md` |
| 62 | Quick notes | `/Users/hamza/yHealth/app_design 3/62-quick-notes.md` |
| 63 | Energy tracking | `/Users/hamza/yHealth/app_design 3/63-energy-tracking.md` |

**Nav flow**: Home -> each screen. RPG (19) -> Streaks (59). Independent tracking features.

**Key components**: All follow a similar template: hero metric + trend chart + SIA coaching note + log/history. Sleep timeline, bedtime consistency. Streak calendar heatmap, XP multiplier, freeze. Medication checklist, adherence heatmap, interaction warnings. Task list with toggles, smart suggestions. Note capture with auto-tagging. Energy slider (1-10), context tags, peak hours, chronotype badge.

**Tip**: Build Sleep (58) thoroughly first, then template the rest with the same structure.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-13-wellbeing-core/index.html`

---

## Batch 17: System Screens (6 screens)

| # | Screen | Spec file |
|---|--------|-----------|
| 64 | Report / block | `/Users/hamza/yHealth/app_design 3/64-report-block.md` |
| 65 | Force update | `/Users/hamza/yHealth/app_design 3/65-force-update.md` |
| 66 | Notification permission | `/Users/hamza/yHealth/app_design 3/66-notification-permission.md` |
| 67 | Image viewer | `/Users/hamza/yHealth/app_design 3/67-image-viewer.md` |
| 68 | Universal search | `/Users/hamza/yHealth/app_design 3/68-universal-search.md` |
| 69 | App rating | `/Users/hamza/yHealth/app_design 3/69-app-rating.md` |

**Nav flow**: Contextual utility screens. Report (64) from community/profiles. Force Update (65) on app launch. Notification Permission (66) on first launch. Image Viewer (67) from any image. Search (68) from Home header. Rating (69) after milestones.

**Key components**: Report reason radio list, block toggle, confirmation, force update icon + CTA, notification rationale card, full-screen image (pinch-zoom placeholder), search bar with recent searches, federated results by domain, 5-star rating, optional review text.

**Note**: Most are lightweight modals/overlays. Universal Search (68) is the most complex.

**Previous batches to review**: `/Users/hamza/yHealth/Wireframes/batch-04-core-shell/index.html`
