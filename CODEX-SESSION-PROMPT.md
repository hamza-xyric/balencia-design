# Balencia — High-Fidelity Visual Prototype Session

You are building **visual-only** high-fidelity screen designs for **Balencia**, a premium AI life coaching mobile app with deep RPG gamification. These screens are rendered inside a phone frame for the UI/UX team to review and approve before production development begins.

---

## Scope — What This Is and Is NOT

**This IS:**
- Pixel-perfect visual screen implementations matching the design specs
- Hardcoded mock data that matches the spec wireframes
- A Next.js web app that renders each screen inside an iPhone-style phone frame (375×812px)
- A desktop review experience with sidebar navigation across all 78 screens
- Dark-first, cinematic aesthetic with glassmorphism cards
- RPG gamification components (XP bars, mission type badges, domain skill cards, chain progress bars, Life Power displays) fully rendered with mock data
- CSS animations that convey the premium feel (entry transitions, progress ring animations, stroke draw)

**This is NOT:**
- A functional app. No API calls. No backend. No real data.
- No authentication logic. No state management beyond navigation.
- No business logic. No form validation beyond visual error states.
- No XP calculation logic. No real RPG progression. All XP values, levels, stat scores, and Life Power are hardcoded mock data.
- Not a React Native app. This is a web-based prototype for visual review only.

---

## RPG Terminology

The app uses RPG-inspired language throughout its UI. These are the canonical terms used in all screen specs and this prompt.

| UI Term | What It Means |
|---------|--------------|
| **Mission** | A goal with RPG classification (replaces "goal" in all UI copy) |
| **Mission Board** | Screen 13 — the goals list with RPG framing |
| **Mission Detail** | Screen 14 — single goal deep view |
| **Mission Journal** | Screen 73 — retrospective log of completed/archived missions |
| **Life Mission** | Epic quest, 6-24 months. Gold metallic badge. |
| **Main Mission** | Long-term goal, 4-16 weeks. Silver metallic badge. |
| **Side Mission** | Exploratory, 1-4 weeks. Bronze metallic badge. |
| **Weekly Mission** | Resets each week. Steel metallic badge. |
| **Daily Mission** | Recurring habit. Sage metallic badge. |
| **Group Mission** | Social, variable duration. Copper metallic badge. |
| **Life Power** | Single competitive number representing overall character proficiency |
| **Domain Stat** | Per-domain score 0-99, auto-calculated from activity data |
| **Domain Level** | Per-domain level 1-25, earned via XP accumulation |
| **Squad** | Temporary group of 2-5 people tackling missions together |
| **Community** | Persistent social group (long-term identity) |

**Mission Type Badges** use metallic muted tones (gold, silver, bronze, steel, sage, copper) and appear on every mission card, mission detail hero, and create mission result. They are visually distinct from domain indicator colors (which are saturated).

---

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** for styling with custom design tokens
- **`next/font/google`** for the Sora font family
- **`lucide-react`** for UI icons (clean, geometric style matching Sora)
- **`recharts`** for bar charts, line charts, radar charts
- **`framer-motion`** for animations (stroke draw, staggered entry, celebration particles)

### Project Location

`/Users/hamza/yHealth/balencia-screens/`

### Project Setup (Batch 0 only)

```bash
npx create-next-app@latest balencia-screens --typescript --tailwind --eslint --app --src-dir --no-import-alias
cd balencia-screens
npm install lucide-react recharts framer-motion
```

---

## Repository Structure

```
balencia-screens/
  src/
    app/
      layout.tsx                    # Root: Sora font, dark bg, desktop layout with sidebar
      page.tsx                      # Screen index / navigation hub
      globals.css                   # Design tokens as CSS custom properties, base styles, glassmorphism
      auth/
        splash/page.tsx             # Screen 01
        carousel/page.tsx           # Screen 02
        sign-up/page.tsx            # Screen 03
        otp/page.tsx                # Screen 03b
        consent/page.tsx            # Screen 03c
        complete-profile/page.tsx   # Screen 03d
        whatsapp/page.tsx           # Screen 03e
        sign-in/page.tsx            # Screen 04
        forgot-password/page.tsx    # Screen 05
        reset-password/page.tsx     # Screen 05b
        guest-preview/page.tsx      # Screen 06
        sia-onboarding/page.tsx     # Screen 07
        initial-plan/page.tsx       # Screen 08
      tabs/
        today/
          page.tsx                  # Screen 12 - Home
          schedule/page.tsx         # Screen 41
          daily-checkin/page.tsx    # Screen 45
          water-intake/page.tsx     # Screen 44
        sia/
          page.tsx                  # Screen 09 - SIA Chat
          voice-inline/page.tsx     # Screen 10
          voice-fullscreen/page.tsx # Screen 11
          voice-history/page.tsx    # Screen 51
        goals/
          page.tsx                  # Screen 13 - Mission Board
          detail/page.tsx           # Screen 14 - Mission Detail
          create/page.tsx           # Screen 15 - Create Mission
          streaks/page.tsx          # Screen 59
          journal/page.tsx          # Screen 73 - Mission Journal
        me/
          page.tsx                  # Screen 17 - Me Main
          life-areas/page.tsx       # Screen 16
          explore/page.tsx          # Screen 18
          rpg/page.tsx              # Screen 19
          personal-wiki/page.tsx    # Screen 20
          settings/page.tsx         # Screen 21
          connected-services/page.tsx # Screen 22
          subscription/page.tsx     # Screen 23
          notifications/page.tsx    # Screen 24
          help/page.tsx             # Screen 25
          profile-edit/page.tsx     # Screen 50
          progress-photos/page.tsx  # Screen 49
          achievements/page.tsx     # Screen 71
          knowledge-graph/page.tsx  # Screen 72
      domains/
        fitness/page.tsx            # Screen 26
        workout/page.tsx            # Screen 27
        nutrition/page.tsx          # Screen 28
        meal/page.tsx               # Screen 29
        finance/page.tsx            # Screen 30
        budget/page.tsx             # Screen 31
        career/page.tsx             # Screen 32
        relationships/page.tsx      # Screen 33
        spirituality/page.tsx       # Screen 34
        learning/page.tsx           # Screen 35
        creativity/page.tsx         # Screen 36
        exercise-library/page.tsx   # Screen 70
      features/
        journal/page.tsx            # Screen 37
        habits/page.tsx             # Screen 38
        leaderboard/page.tsx        # Screen 39
        community/page.tsx          # Screen 40
        celebration/page.tsx        # Screen 42
        paywall/page.tsx            # Screen 43
        accountability/page.tsx     # Screen 46
        competitions/page.tsx       # Screen 47
        intelligence/page.tsx       # Screen 48
        stress/page.tsx             # Screen 52
        breathing/page.tsx          # Screen 53
        meditation/page.tsx         # Screen 54
        yoga/page.tsx               # Screen 55
        recipes/page.tsx            # Screen 56
        shopping-list/page.tsx      # Screen 57
        sleep/page.tsx              # Screen 58
        medication/page.tsx         # Screen 60
        reminders/page.tsx          # Screen 61
        quick-notes/page.tsx        # Screen 62
        energy/page.tsx             # Screen 63
        report-block/page.tsx       # Screen 64
        force-update/page.tsx       # Screen 65
        notification-permission/page.tsx # Screen 66
        image-viewer/page.tsx       # Screen 67
        universal-search/page.tsx   # Screen 68
        app-rating/page.tsx         # Screen 69
    components/
      layout/
        PhoneFrame.tsx              # iPhone device mockup wrapper (375×812px)
        ScreenShell.tsx             # Status bar + content area + optional tab bar
        TabBar.tsx                  # Bottom nav: Today, SIA, Goals, Me
        Header.tsx                  # Stack navigation header
        Sidebar.tsx                 # Desktop sidebar with all 78 screens
        ScreenNav.tsx               # Prev/next screen navigation
      design-system/
        BrandWordmark.tsx           # "Balencia." in Monda font
        BrandSymbol.tsx             # Logo SVG mark
        ContinuousStroke.tsx        # SVG stroke line with draw animation
        Button.tsx                  # Primary (orange pill), Completion (green), Skip (dark), Ghost
        Chip.tsx                    # Domain tag, filter, streak, suggestion variants
        Card.tsx                    # Glassmorphism card (ink-brown-800, 28px radius, glass border)
        Input.tsx                   # Text input with label, error, password toggle
        Eyebrow.tsx                 # Uppercase label (12px, 600 weight, tracking)
        LevelBadge.tsx              # Diamond + level number
        DomainTag.tsx               # Colored pill with domain name
        SegmentedControl.tsx        # Tab-style selector
        ToggleSwitch.tsx            # On/off toggle
        SearchBar.tsx               # Dark input with search icon
        FAB.tsx                     # Floating action button
        BottomSheet.tsx             # Modal panel from bottom (static visual)
      screens/
        SIACoachingNote.tsx         # Purple-accented coaching note card
        ActionCard.tsx              # Task card with domain tag, checkbox, time estimate
        MissionCard.tsx             # Goal card with progress ring, type badge, chain, XP
        MissionTypeBadge.tsx        # Metallic mission type pill
        ChainProgressBar.tsx        # Linear chain position indicator
        ProgressRing.tsx            # SVG circle with animated fill
        XPBar.tsx                   # Horizontal progress bar with gradient
        LifePowerDisplay.tsx        # Diamond icon + competitive number
        HealthMetricsStrip.tsx      # Horizontal metric pills (heart, steps, sleep)
        QuickActionsRow.tsx         # Scrollable pill buttons
        StatTile.tsx                # Small card for 3-column grids
        DomainSkillCard.tsx         # Domain color + score + level + mini XP bar
        MessageBubble.tsx           # Chat bubble (user orange, SIA dark)
        SuggestionChip.tsx          # Tappable pill for chat suggestions
        ChatInputBar.tsx            # Chat input with mic/send button
        SettingsRow.tsx             # Label + value/toggle/chevron
        NotificationRow.tsx         # Icon + text + timestamp
        IntegrationCard.tsx         # Service logo + connection status
        TierCard.tsx                # Subscription plan card
        CelebrationOverlay.tsx      # Achievement display with confetti
        ScheduleItem.tsx            # Time + event name row
        SectionHeader.tsx           # Eyebrow label + optional "see all"
        FAQAccordion.tsx            # Expandable FAQ item
      charts/
        RadarChart.tsx              # SVG radar for domain scores
        BarChart.tsx                # Recharts bar chart wrapper
        LineChart.tsx               # Recharts line chart wrapper
        CalendarHeatmap.tsx         # Grid of colored cells
      domain/
        WorkoutCard.tsx             # Exercise list with sets/reps
        MealCard.tsx                # Food + macros + calories
        MacroBar.tsx                # Horizontal progress for macros
        MoodSelector.tsx            # Row of emoji options
        HabitRow.tsx                # Checkbox + name + streak
        WaterIntakeRing.tsx         # Progress ring for hydration
        BreathingVisual.tsx         # Expanding/contracting circle
        RecipeCard.tsx              # Image + title + nutrition
        TransactionRow.tsx          # Icon + description + amount
        LeaderboardRow.tsx          # Rank + avatar + name + score
        JournalEntryCard.tsx        # Text preview + mood + timestamp
    data/
      mock.ts                      # All hardcoded data
      domains.ts                   # Domain color/icon registry
      xp.ts                        # XP reward values
      screens.ts                   # Screen metadata for sidebar navigation
  public/
    logos/                         # Copied from Balencia-Creatives-Reference/logos/
  tailwind.config.ts              # Complete design token config
```

---

## Design Tokens

All tokens are defined in `tailwind.config.ts` and `globals.css`. Reference these via Tailwind classes throughout — never hardcode hex values.

### Colors

```
// Brand (60/30/10)
brand-orange:     #FF5E00     // Primary CTA, active states, progress fills (60%)
forest-green:     #34A853     // Success, completion, positive trends (30%)
royal-purple:     #7F24FF     // SIA/AI indicators only (10%)

// Neutrals
ink-900:          #0A0A0F     // Screen background
ink-brown-800:    #211008     // Card/surface background
white:            #FFFFFF     // Text at 100% / 70% / 50% / 40% opacity
error-red:        #F44336     // Error borders, error text

// Domain colors (tags/indicators only, NEVER for CTAs)
fitness:          #EF4444
sleep:            #818CF8
career:           #6366F1
nutrition:        #84CC16
finance:          #10B981
faith:            #A855F7
productivity:     #F97316
relationships:    #EC4899
wellbeing:        #14B8A6
meditation:       #A78BFA
creativity:       #F59E0B

// Podium (Screen 39 leaderboard only)
gold:             #FFD700
silver:           #C0C0C0
bronze:           #CD7F32

// Mission Type Badge colors (metallic, muted — badge backgrounds only)
mission-gold:     #D4A017     // Life missions
mission-silver:   #A8A9AD     // Main missions
mission-bronze:   #CD7F32     // Side missions
mission-steel:    #5B7FA5     // Weekly missions
mission-sage:     #6B8E6B     // Daily missions
mission-copper:   #B87333     // Group missions

// Title Rarity tiers
rarity-common:    #FFFFFF
rarity-uncommon:  #14B8A6
rarity-rare:      #7F24FF
rarity-epic:      #FF5E00
rarity-legendary: #FFD700

// RPG accents
stalled-amber:    #F59E0B     // Stalled mission nudge border
freeze-blue:      #4FC3F7     // Streak freeze indicator

// Glassmorphism
glass-border:     rgba(255, 255, 255, 0.06)
glass-backdrop:   rgba(10, 10, 15, 0.6)
glow-orange-bg:   rgba(255, 94, 0, 0.15)
```

### Spacing (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| s-1 | 4px | Tight spacing |
| s-2 | 8px | Compact spacing |
| s-3 | 12px | Related elements |
| s-4 | 16px | Standard padding, screen margins (product) |
| s-5 | 20px | Card internal |
| s-6 | 24px | Card padding, screen margins (auth) |
| s-8 | 32px | Major sections, hero padding |
| s-10 | 40px | Large gaps |
| s-12 | 48px | Extra large |
| s-16 | 64px | Bottom padding (clears tab bar) |

### Corner Radius

| Token | Value | Usage |
|-------|-------|-------|
| r-xs | 6px | Checkboxes, tiny indicators |
| r-sm | 10px | Chips, nested cards, domain tags |
| r-md | 14px | Inputs, stat tiles, small cards |
| r-lg | 20px | Buttons, modals top corners |
| r-xl | 28px | **Primary content cards** — default card radius |
| r-2xl | 40px | Large surfaces, hero cards |
| r-pill | 999px | CTA buttons, toggles, badges, filter chips |

### Shadows (warm-tinted, never gray)

```css
--shadow-1: 0 8px 24px rgba(33, 16, 8, 0.18);    /* Default card */
--shadow-2: 0 18px 48px rgba(33, 16, 8, 0.22);   /* FABs, floating */
--shadow-3: 0 32px 80px rgba(33, 16, 8, 0.28);   /* Modals, overlays */
--glow-orange: 0 0 32px rgba(255, 94, 0, 0.45);
--glow-green: 0 0 32px rgba(52, 168, 83, 0.40);
--glow-purple: 0 0 32px rgba(127, 36, 255, 0.40);
```

### Typography

| Level | Weight | Size | Line Height | Tailwind Class |
|-------|--------|------|-------------|----------------|
| Display XL | 700 | 40px | 1.2 | `text-display-xl` |
| Display L | 700 | 32px | 1.25 | `text-display-l` |
| H1 | 700 | 28px | 1.3 | `text-h1` |
| H2 | 600 | 20px | 1.3 | `text-h2` |
| H3 | 600 | 17px | 1.4 | `text-h3` |
| Body | 400 | 16px | 1.5 | `text-body` |
| Caption | 400 | 13px | 1.4 | `text-caption` |
| Eyebrow | 600 | 12px | 1.3 | `text-eyebrow` (uppercase, tracking-wider) |
| Small | 600 | 11px | 1.2 | `text-small` |

### Motion

| Token | Value | Usage |
|-------|-------|-------|
| ease-flow | cubic-bezier(0.65, 0.05, 0.36, 1) | Signature non-linear |
| ease-out-soft | cubic-bezier(0.22, 0.61, 0.36, 1) | UI default |
| ease-in-out | cubic-bezier(0.65, 0, 0.35, 1) | Two-way |
| dur-fast | 160ms | Micro-interactions |
| dur-base | 280ms | Standard transitions |
| dur-slow | 520ms | Deliberate movements |
| dur-flow | 1200ms | Flow animations |

---

## Phone Frame & Review Experience

### PhoneFrame Component

Every screen renders inside a `PhoneFrame` that simulates an iPhone:

- **Dimensions**: 375px wide × 812px tall
- **Visual**: Rounded corners (40px), thin dark border, notch/Dynamic Island at top, home indicator at bottom
- **Content**: Scrolls within the frame via `overflow-y-auto`
- **Desktop**: Centered on page with dark background behind

### Sidebar Navigation

A persistent left sidebar (240px) lists all 78 screens organized by section:
- Auth & Onboarding (01-08)
- Today Tab (12, 41, 44, 45)
- SIA Tab (09-11, 51)
- Goals Tab (13-15, 59, 73)
- Me Tab (16-25, 49-50, 71-72)
- Domain Dashboards (26-36, 70)
- Feature Screens (37-69)

Current screen is highlighted. Each entry links to its route.

### Screen Index Page

The root page (`/`) shows a grid of all 78 screens with:
- Screen number + name + link
- Section grouping
- Status indicator (complete/in-progress/not-started)

---

## Coding Conventions

### Screen Pattern

Every screen page follows this structure:

```tsx
// Screen 12 of 78: Home Screen
// Spec: /Users/hamza/yHealth/app_design 3/12-home-screen.md

import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { ScreenShell } from '@/components/layout/ScreenShell'
import { TabBar } from '@/components/layout/TabBar'
// ... design system imports

export default function HomeScreen() {
  return (
    <PhoneFrame>
      <ScreenShell header={...} tabBar={<TabBar active="today" />}>
        {/* Components matching the spec's Component Stack, top to bottom */}
      </ScreenShell>
    </PhoneFrame>
  )
}
```

### Card Component (Glassmorphism)

```tsx
// Mandatory on every card:
// bg-ink-brown-800 rounded-[28px] border border-white/[0.06] p-6 shadow-1
```

### Mock Data Strategy

- **User name**: "Amira" (the primary design persona)
- **User RPG profile**: Level 14, title "Dedicated explorer" (common rarity), Life Power 487, total XP 8,450, current level XP 2,450 / 5,809
- **SIA messages**: Use the exact copy from the spec's ASCII wireframe
- **Missions** (replaces "Goals"): Use typed missions with RPG metadata:
  - "Run a half marathon" (fitness, main, 68%, XP 340, chain 2/4, pinned)
  - "Save $5,000 by December" (finance, side, 42%, XP 120, pinned)
  - "Meditate daily" (meditation, daily, XP 10/completion)
  - "Read 2 books this month" (learning, weekly, XP 75)
- **Domain stats** (10 domains, stat 0-99, level 1-25):
  - Fitness 72/Lv.12, Sleep 65/Lv.8, Career 31/Lv.5, Nutrition 58/Lv.9, Finance 44/Lv.8
  - Faith 52/Lv.4, Productivity 48/Lv.6, Relationships 55/Lv.7, Wellbeing 61/Lv.11, Meditation 39/Lv.3
- **XP values**: Use exact values from `app_design 3/_xp-reward-table.md`
- **Streak**: 42-day current, 67-day longest, 1.5x multiplier active
- **Numbers**: Realistic — "Level 14", "8,450 XP", "42-day streak", "Life Power 487"

### Typography Rules

- **Sentence case everywhere** — buttons, titles, tabs, labels. Never Title Case.
- **No exclamation marks** in any UI copy.
- **Max 2 accent words** per screen (rendered in orange #FF5E00).
- **Sora is the only font** — no fallbacks except system sans-serif.

### Icon Handling

- **UI icons**: Use `lucide-react` (outlined style, 20-24px)
- **Tab bar icons**: Calendar, MessageCircle, Flag, User (outlined inactive, filled or bold active)
- **Custom placeholders**: SIA avatar = purple circle with "S". User avatar = orange circle with initials.
- **Photo placeholders**: Solid ink-brown-800 rectangle with camera icon overlay
- **Progress rings**: Built with SVG `<circle>` with animated `stroke-dashoffset`

### Navigation Setup

**Tab bar** (in ScreenShell):
- 4 tabs: Today, SIA, Goals, Me
- Height: 56px
- Background: ink-900, no top border
- Active: orange icon + orange label
- Inactive: white at 60% icon + label
- Icons: 24px, labels: 11px Sora

**Stack headers**:
- Background: ink-900
- Back button: white left chevron, 20px, 44×44 touch target
- Title: 17px Sora Semibold, white, center-aligned

**Modals** (visual only):
- Drag handle: 36px wide × 4px pill, white at 20%, centered
- Corner radius: 20px top corners

### Animation Approach

Use `framer-motion` and CSS animations:

**Staggered entry** (product screens):
- Each element: `opacity: 0 → 1` + `translateY: 12px → 0`
- 80ms stagger between elements
- 280ms duration, ease-out-soft

**Progress ring mount**:
- Animate `stroke-dashoffset` from full circumference to target
- Duration: 520ms, ease-flow

**Continuous stroke line**:
- CSS `stroke-dasharray` + `stroke-dashoffset` animation
- Duration: 1200ms, ease-flow

---

## Reading the Design Specs

Each screen has a detailed spec file in `app_design 3/`. Before building a screen, **read its spec file**. Each file contains:

1. **Purpose** — What the screen does and why
2. **Information Architecture** — Content hierarchy and user flow
3. **Layout** — ASCII wireframe with zones and proportions
4. **Component Stack** — Top-to-bottom list of every component with exact specs
5. **Color Map** — Which colors appear where
6. **Interaction States** — Visual states for interactive elements
7. **Motion** — Entry animations, transitions
8. **Empty State** — What to show when there's no data

**Also read**: `app_design 3/_shared-patterns.md` — the master design system reference.

**RPG reference documents**:
- `RPG_SYSTEM_DESIGN.md` — The master RPG system document
- `app_design 3/_tier-matrix.md` — Premium/Free tier matrix
- `app_design 3/_xp-reward-table.md` — Central XP reward table

Match the spec's **Component Stack** section exactly — this is your build checklist.

---

## Anti-Patterns — DO NOT

- **DO NOT** add any API calls, fetch, or backend connectivity
- **DO NOT** add state management libraries (Redux, Zustand, Jotai)
- **DO NOT** add authentication logic or token handling
- **DO NOT** use placeholder images from the internet — use colored rectangles with icon overlays
- **DO NOT** add any third-party UI component libraries (no shadcn, no MUI, no Chakra) — build everything from Tailwind + design tokens
- **DO NOT** skip the glassmorphism border on cards (`border border-white/[0.06]` is mandatory)
- **DO NOT** use Title Case on UI labels — sentence case everywhere
- **DO NOT** use exclamation marks in any UI copy
- **DO NOT** use any font other than Sora
- **DO NOT** use domain colors on buttons or CTAs — domain colors are for tags/indicators only
- **DO NOT** add purple (#7F24FF) to more than 1-2 elements per screen — reserved for SIA/AI
- **DO NOT** hardcode hex values in component styles — always use Tailwind token classes
- **DO NOT** use spacing values outside the defined scale
- **DO NOT** use mission type metallic colors on buttons or CTAs — badge backgrounds only
- **DO NOT** hardcode XP values outside `data/mock.ts` — all XP must come from centralized mock data
- **DO NOT** implement real XP calculation, level progression, or stat computation
- **DO NOT** mix mission type badge colors (metallic) with domain indicator colors (saturated)
- **DO NOT** use pure black (#000000) or pure white (#FFFFFF) for backgrounds — use ink-900 and ink-brown-800
- **DO NOT** use gray/cool shadows — all shadows use warm `rgba(33, 16, 8, ...)` tint
- **DO NOT** skip chain progress bars on mission cards where `chainPosition` data exists

---

## Quality Checklist

Before marking a screen complete, verify:

### Color
- [ ] Background is `#0A0A0F` (ink-900)
- [ ] Cards use `#211008` (ink-brown-800) with `border-white/[0.06]`
- [ ] CTAs are `#FF5E00` (brand-orange)
- [ ] Text uses correct opacity: 100% / 70% / 50% / 40%
- [ ] 60/30/10 ratio: orange on actions, green on success, purple on max 1-2 SIA elements
- [ ] Domain colors on tags/indicators only, never on CTAs

### Typography
- [ ] Sora font renders (Regular, SemiBold, Bold)
- [ ] Type scale matches spec
- [ ] Sentence case everywhere
- [ ] No exclamation marks
- [ ] Max 2 accent-colored words per screen

### Spacing
- [ ] Screen margins: 16px (product) or 24px (auth)
- [ ] Card padding: 24px standard, 32px hero
- [ ] Section gaps: 16px within, 32px between
- [ ] Bottom padding: 64px (clears tab bar + FAB)

### Layout
- [ ] Component order matches spec's Component Stack (top to bottom)
- [ ] Correct tab highlighted in bottom nav
- [ ] Correct header (back button, title, right actions)
- [ ] Tab bar visible on product screens, hidden on auth/onboarding/modals
- [ ] Renders correctly inside PhoneFrame (375×812px)

### Components
- [ ] Cards have 28px corner radius (default), 14px for stat tiles, 10px for chips
- [ ] Buttons: 56px height (auth CTA), 48px (in-card CTA), pill shape
- [ ] Progress rings render as SVG circles with correct sizes (36/48/96px)
- [ ] FAB: 56px circle, orange, positioned 16px above tab bar

### Motion
- [ ] Staggered fade-in entry on product screens
- [ ] Progress rings animate on mount
- [ ] Continuous stroke draws itself (never fades in)

### RPG Elements
- [ ] Mission type badges use metallic colors (gold/silver/bronze/steel/sage/copper), NOT domain colors
- [ ] Mission type badges appear on all mission cards, mission detail hero, create mission result
- [ ] Chain progress bars render on any mission card where `chainPosition` is non-null
- [ ] XP values in mock data match `_xp-reward-table.md`
- [ ] Life Power displays use diamond icon (◆) with orange color
- [ ] Domain skill cards show both stat score (0-99) AND level (Lv.N) with mini XP bar
- [ ] Level badge (◆ Lv.N) appears in Home sticky header and profile sections

### Tier Gating
- [ ] Free-tier locked features show blur overlay with lock icon and "Unlock with Plus/Pro" label
- [ ] SIA coaching notes in Free tier show single-line teaser with inline lock icon
- [ ] Screen-specific tier information matches `_tier-matrix.md`

---

## Batch Assignments

### Batch 0: Foundation (no screens)
**Theme**: Project setup, design system tokens, layout components, navigation

- Create Next.js project with Tailwind CSS
- Configure `tailwind.config.ts` with ALL design tokens (colors, spacing, radii, shadows, typography, motion)
- Set up `globals.css` with CSS custom properties, glassmorphism utilities, base styles
- Build layout components: PhoneFrame, ScreenShell, TabBar, Header, Sidebar, ScreenNav
- Create screen index page (/)
- Set up `data/mock.ts`, `data/domains.ts`, `data/xp.ts`, `data/screens.ts`
- Copy logo assets from `/Users/hamza/yHealth/Balencia/Balencia-Creatives-Reference/logos/` to `public/logos/`

---

### Batch 1: Auth Part 1 (6 screens)
**Theme**: Brand entry + account creation

| Screen | Route | Spec |
|--------|-------|------|
| Splash Screen | `auth/splash` | `01-splash-screen.md` |
| Motion Carousel | `auth/carousel` | `02-motion-carousel.md` |
| Welcome / Sign Up | `auth/sign-up` | `03-welcome-sign-up.md` |
| OTP Verification | `auth/otp` | `03b-otp-verification.md` |
| Consent | `auth/consent` | `03c-consent.md` |
| Complete Profile | `auth/complete-profile` | `03d-complete-profile.md` |

**New components**: BrandSymbol, BrandWordmark, ContinuousStroke, Button, Input, Card, Eyebrow

---

### Batch 2: Auth Part 2 + Onboarding (7 screens)
**Theme**: Completing auth + meeting SIA

| Screen | Route | Spec |
|--------|-------|------|
| WhatsApp Enrollment | `auth/whatsapp` | `03e-whatsapp-enrollment.md` |
| Sign In | `auth/sign-in` | `04-sign-in.md` |
| Forgot Password | `auth/forgot-password` | `05-forgot-password.md` |
| Reset Password | `auth/reset-password` | `05b-reset-password.md` |
| Guest Preview | `auth/guest-preview` | `06-guest-mode-preview.md` |
| SIA Onboarding | `auth/sia-onboarding` | `07-sia-onboarding-conversation.md` |
| Initial Plan Summary | `auth/initial-plan` | `08-initial-plan-summary.md` |

**New components**: MessageBubble, SuggestionChip, ChatInputBar, ToggleSwitch, Chip

---

### Batch 3: Home Screen (1 screen, high complexity)
**Theme**: Daily command center — creates the most reusable components

| Screen | Route | Spec |
|--------|-------|------|
| Home Screen | `tabs/today` | `12-home-screen.md` |

**New components**: SIACoachingNote, ActionCard, MissionCard, MissionTypeBadge, ChainProgressBar, ProgressRing, HealthMetricsStrip, QuickActionsRow, LevelBadge, DomainTag, XPBar, SectionHeader, ScheduleItem

**Use the `/frontend-design` skill for this screen.**

---

### Batch 4: SIA Chat (3 screens)
**Theme**: AI coach conversation

| Screen | Route | Spec |
|--------|-------|------|
| SIA Chat | `tabs/sia` | `09-sia-chat.md` |
| SIA Voice In-Chat | `tabs/sia/voice-inline` | `10-sia-voice-in-chat.md` |
| SIA Voice Full-Screen | `tabs/sia/voice-fullscreen` | `11-sia-voice-full-screen.md` |

**New components**: Rich inline cards (chart, goal progress, meal plan, workout preview, connection spotted)

---

### Batch 5: Goals (3 screens)
**Theme**: Mission management

| Screen | Route | Spec |
|--------|-------|------|
| Mission Board | `tabs/goals` | `13-goals-list.md` |
| Mission Detail | `tabs/goals/detail` | `14-goal-detail.md` |
| Create / Edit Mission | `tabs/goals/create` | `15-create-edit-goal.md` |

**New components**: FAB, SegmentedControl, BottomSheet

---

### Batch 6: Me Tab (5 screens)
**Theme**: Profile, RPG character, life balance

| Screen | Route | Spec |
|--------|-------|------|
| Life Areas Overview | `tabs/me/life-areas` | `16-life-areas-overview.md` |
| Me Main | `tabs/me` | `17-me-main.md` |
| Explore Section | `tabs/me/explore` | `18-explore-section.md` |
| RPG Character | `tabs/me/rpg` | `19-rpg-character-screen.md` |
| Personal Wiki | `tabs/me/personal-wiki` | `20-personal-wiki-sia-memory.md` |

**New components**: RadarChart, StatTile, DomainSkillCard, LifePowerDisplay, SearchBar

**Use the `/frontend-design` skill for RPG Character screen.**

---

### Batch 7: Settings & Account (6 screens)
**Theme**: App configuration, integrations, subscription

| Screen | Route | Spec |
|--------|-------|------|
| Settings | `tabs/me/settings` | `21-settings.md` |
| Connected Services | `tabs/me/connected-services` | `22-connected-services.md` |
| Subscription & Billing | `tabs/me/subscription` | `23-subscription-billing.md` |
| Notification History | `tabs/me/notifications` | `24-notification-history.md` |
| Help Center | `tabs/me/help` | `25-help-center.md` |
| Profile Edit | `tabs/me/profile-edit` | `50-profile-edit.md` |

**New components**: SettingsRow, IntegrationCard, TierCard, NotificationRow, FAQAccordion

---

### Batch 8: Domains Part 1 (4 screens)
**Theme**: Fitness + Nutrition (establishes Domain Dashboard Template)

| Screen | Route | Spec |
|--------|-------|------|
| Fitness Dashboard | `domains/fitness` | `26-fitness-workouts-dashboard.md` |
| Workout Detail | `domains/workout` | `27-workout-detail-active-workout.md` |
| Nutrition Dashboard | `domains/nutrition` | `28-nutrition-diet-dashboard.md` |
| Meal Detail | `domains/meal` | `29-meal-detail-food-logger.md` |

**New components**: WorkoutCard, MealCard, MacroBar, BarChart, LineChart

**Use the `/frontend-design` skill for Fitness Dashboard (canonical template).**

---

### Batch 9: Domains Part 2 (5 screens)
**Theme**: Finance, Career, Relationships, Spirituality

| Screen | Route | Spec |
|--------|-------|------|
| Finance Dashboard | `domains/finance` | `30-finance-money-map-dashboard.md` |
| Budget Detail | `domains/budget` | `31-transaction-budget-detail.md` |
| Career Dashboard | `domains/career` | `32-career-work-dashboard.md` |
| Relationships Dashboard | `domains/relationships` | `33-relationships-dashboard.md` |
| Spirituality Dashboard | `domains/spirituality` | `34-spirituality-dashboard.md` |

Reuses Domain Dashboard Template from Batch 8.

---

### Batch 10: Domains Part 3 + Features (5 screens)
**Theme**: Learning, Creativity + Journal, Habits, Leaderboard

| Screen | Route | Spec |
|--------|-------|------|
| Learning Dashboard | `domains/learning` | `35-learning-growth-dashboard.md` |
| Creativity Dashboard | `domains/creativity` | `36-creativity-dashboard.md` |
| Journal | `features/journal` | `37-journal.md` |
| Habits | `features/habits` | `38-habits.md` |
| Leaderboard | `features/leaderboard` | `39-leaderboard.md` |

**New components**: JournalEntryCard, HabitRow, CalendarHeatmap, LeaderboardRow

---

### Batch 11: Social & Overlays (5 screens)
**Theme**: Community, Calendar, Celebrations, Monetization

| Screen | Route | Spec |
|--------|-------|------|
| Community | `features/community` | `40-community-chat-rooms.md` |
| Schedule / Calendar | `tabs/today/schedule` | `41-schedule-calendar.md` |
| Celebration Overlay | `features/celebration` | `42-celebration-achievement-overlay.md` |
| Paywall | `features/paywall` | `43-paywall-upgrade-prompt.md` |
| Competitions | `features/competitions` | `47-competitions.md` |

**New components**: CelebrationOverlay (confetti), calendar grid views

---

### Batch 12: Wellness Part 1 (5 screens)
**Theme**: Hydration, Check-in, Accountability, Intelligence, Progress

| Screen | Route | Spec |
|--------|-------|------|
| Water Intake | `tabs/today/water-intake` | `44-water-intake.md` |
| Daily Check-in | `tabs/today/daily-checkin` | `45-daily-checkin.md` |
| Accountability | `features/accountability` | `46-accountability.md` |
| Intelligence Dashboard | `features/intelligence` | `48-intelligence-dashboard.md` |
| Progress Photos | `tabs/me/progress-photos` | `49-progress-photos.md` |

**New components**: WaterIntakeRing, MoodSelector

---

### Batch 13: Wellness Part 2 (7 screens)
**Theme**: Voice history, Stress, Breathing, Meditation, Yoga, Recipes, Shopping

| Screen | Route | Spec |
|--------|-------|------|
| Voice Call History | `tabs/sia/voice-history` | `51-voice-call-history.md` |
| Stress Management | `features/stress` | `52-stress-management.md` |
| Breathing Exercises | `features/breathing` | `53-breathing-exercises.md` |
| Meditation | `features/meditation` | `54-meditation-mindfulness.md` |
| Yoga Sessions | `features/yoga` | `55-yoga-sessions.md` |
| Recipes | `features/recipes` | `56-recipes.md` |
| Shopping List | `features/shopping-list` | `57-shopping-list.md` |

**New components**: BreathingVisual, RecipeCard

---

### Batch 14: Remaining Screens (16 screens)
**Theme**: Utility, system, RPG retrospective

| Screen | Route | Spec |
|--------|-------|------|
| Sleep Tracking | `features/sleep` | `58-sleep-tracking.md` |
| Streak Details | `tabs/goals/streaks` | `59-streak-details.md` |
| Medication Tracking | `features/medication` | `60-medication-tracking.md` |
| Reminders & Tasks | `features/reminders` | `61-reminders-tasks.md` |
| Quick Notes | `features/quick-notes` | `62-quick-notes.md` |
| Energy Tracking | `features/energy` | `63-energy-tracking.md` |
| Report / Block | `features/report-block` | `64-report-block.md` |
| Force Update | `features/force-update` | `65-force-update.md` |
| Notification Permission | `features/notification-permission` | `66-notification-permission.md` |
| Image Viewer | `features/image-viewer` | `67-image-viewer.md` |
| Universal Search | `features/universal-search` | `68-universal-search.md` |
| App Rating | `features/app-rating` | `69-app-rating.md` |
| Exercise Library | `domains/exercise-library` | `70-exercise-library.md` |
| Achievement Gallery | `tabs/me/achievements` | `71-achievement-gallery.md` |
| Knowledge Graph | `tabs/me/knowledge-graph` | `72-knowledge-graph.md` |
| Mission Journal | `tabs/goals/journal` | `73-mission-journal.md` |

Heavy component reuse. System screens (65, 66) are simple single-purpose layouts.

---

## Progress Tracker

Update this table after each batch is completed:

| Batch | Theme | Screens | Count | Status | Date |
|-------|-------|---------|-------|--------|------|
| 0 | Foundation | — | 0 | done | 2026-05-23 |
| 1 | Auth Part 1 | 01, 02, 03, 03b, 03c, 03d | 6 | done | 2026-05-23 |
| 2 | Auth Part 2 + Onboarding | 03e, 04, 05, 05b, 06, 07, 08 | 7 | done | 2026-05-23 |
| 3 | Home Screen | 12 | 1 | done | 2026-05-23 |
| 4 | SIA Chat | 09, 10, 11 | 3 | done | 2026-05-23 |
| 5 | Goals | 13, 14, 15 | 3 | done | 2026-05-23 |
| 6 | Me Tab | 16, 17, 18, 19, 20 | 5 | done | 2026-05-23 |
| 7 | Settings & Account | 21, 22, 23, 24, 25, 50 | 6 | done | 2026-05-23 |
| 8 | Domains Part 1 | 26, 27, 28, 29 | 4 | done | 2026-05-23 |
| 9 | Domains Part 2 | 30, 31, 32, 33, 34 | 5 | done | 2026-05-23 |
| 10 | Domains Part 3 + Features | 35, 36, 37, 38, 39 | 5 | done | 2026-05-24 |
| 11 | Social & Overlays | 40, 41, 42, 43, 47 | 5 | done | 2026-05-24 |
| 12 | Wellness Part 1 | 44, 45, 46, 48, 49 | 5 | done | 2026-05-24 |
| 13 | Wellness Part 2 | 51, 52, 53, 54, 55, 56, 57 | 7 | done | 2026-05-24 |
| 14 | Remaining | 58-73 | 16 | done | 2026-05-24 |

**Total screens**: 78 / 78 complete

**Design system components built**: PhoneFrame, ScreenShell, TabBar, Header, Sidebar, ScreenNav, BrandSymbol, BrandWordmark, ContinuousStroke, Button, Card, Input, Eyebrow, ToggleSwitch, Chip, MessageBubble, SuggestionChip, ChatInputBar, LevelBadge, DomainTag, SIACoachingNote, ActionCard, MissionCard, MissionTypeBadge, ChainProgressBar, ProgressRing, XPBar, HealthMetricsStrip, QuickActionsRow, SectionHeader, ScheduleItem, SiaChatTopBar, SiaConversation, RichInlineCard, VoiceWaveform, VoiceInterfacePanel, FAB, SegmentedControl, BottomSheet, RadarChart, StatTile, DomainSkillCard, LifePowerDisplay, SearchBar, ModuleCard, SettingsRow, IntegrationCard, TierCard, NotificationRow, FAQAccordion, DomainDashboardHeader, WorkoutCard, MealCard, MacroBar, BarChart, LineChart, TransactionRow, JournalEntryCard, HabitRow, CalendarHeatmap, LeaderboardRow, CelebrationOverlay, ScheduleCalendarGrid, WaterIntakeRing, MoodSelector, BreathingVisual, RecipeCard

---

## Between-Batch Workflow

After each batch:

1. Review screens in the browser at `http://localhost:3000`
2. Mark the batch as `done` with today's date in the Progress Tracker
3. Update "Design system components built" with new shared components
4. Change the next batch's status to `CURRENT`
5. Run the next session with this same prompt — read the progress tracker to know which batch to build next

**Important**: When starting Batch 1+, read the existing `components/` directory and reuse all existing components. Do not recreate components that were already built.

---

## Batch Execution Instructions

1. Read the Progress Tracker to identify the `CURRENT` batch
2. Read all spec files listed for that batch
3. Read relevant sections of `app_design 3/_shared-patterns.md`
4. Read `app_design 3/_xp-reward-table.md` if any screen shows XP
5. Read `app_design 3/_tier-matrix.md` if any screen has tier gating
6. If Batch 1+, review existing components to reuse
7. Create new design system components listed for this batch
8. Build each screen, matching the spec's Component Stack exactly
9. Verify each screen against the Quality Checklist
10. Output a batch summary: screens completed, new components, any deviations

Start with the `CURRENT` batch now.
