---
name: balencia-visual-prototype
description: Use when building, editing, or QA-ing Balencia mobile app prototype screens in the balencia-screens Next.js 16 workspace. Covers screen implementation, component development, route creation, brand compliance, and batch verification.
---

# Balencia Visual Prototype

Build visual-only high-fidelity screen designs for Balencia inside a phone frame (375x812px) for UI/UX review.

## Scope

**This IS:** Pixel-perfect visual screens with hardcoded mock data, CSS animations, RPG gamification components, dark-first cinematic glassmorphism aesthetic.

**This is NOT:** A functional app. No API calls, no backend, no auth logic, no state management beyond navigation, no real XP/RPG calculation. All data is hardcoded mock data.

## Required Sources

Before implementing any screen, read:

1. **Screen spec**: `../app_design 3/NN-screen-name.md` for the target screen
2. **Shared patterns**: `../app_design 3/_shared-patterns.md` for component specs, tokens, motion, interactions
3. **Design system**: `../Balencia/Design-System-Overview.md` for brand foundation
4. **Creative reference**: `../Balencia/Balencia-Creatives-Reference/CREATIVE-REFERENCE.md` for visual authority
5. **Screen registry**: `src/data/screens.ts` for route metadata and sidebar navigation

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- React 19
- Tailwind CSS 4 with custom design tokens in `src/app/globals.css`
- Framer Motion for animations (stroke draw, staggered entry, celebration particles)
- Recharts for bar/line/radar charts
- Lucide React for icons
- Sora font via `next/font/google`

## Brand Tokens (from globals.css)

- `brand-orange` #FF5E00 — primary CTA, active states, progress fills (60%)
- `forest-green` #34A853 — success, completion, health metrics (30%)
- `royal-purple` #7F24FF — SIA/AI indicators only (10%)
- `ink-900` #0A0A0F — screen background
- `ink-brown-800` #211008 — card surfaces (glassmorphism, 28px radius, glass border)
- `paper-100` #FEFAF3 — text on dark

## Route Structure

```
src/app/
  auth/         # Screens 01-08 (pre-auth, onboarding)
  tabs/         # Screens 09-25 (Today, SIA, Goals, Me)
  domains/      # Screens 26-36 (life domain dashboards)
  features/     # Screens 37-85 (cross-cutting features)
  legal/        # Legal pages
```

Each screen is a `page.tsx` inside its route folder. Route paths are defined in `src/data/screens.ts`.

## Component Hierarchy

- `components/layout/` — PhoneFrame, ScreenShell, TabBar, Header, Sidebar, ScreenNav
- `components/design-system/` — Button, Card, Chip, Input, Eyebrow, LevelBadge, DomainTag, etc.
- `components/screens/` — MissionCard, ProgressRing, XPBar, LifePowerDisplay, MessageBubble, etc.
- `components/charts/` — RadarChart, BarChart, LineChart, CalendarHeatmap
- `components/domain/` — WorkoutCard, MealCard, MacroBar, MoodSelector, etc.
- `data/` — mock.ts, domains.ts, xp.ts, screens.ts

## RPG Terminology (used in all UI copy)

Goals = Missions. Goals list = Mission Board. Types: Life (gold), Main (silver), Side (bronze), Weekly (steel), Daily (sage), Group (copper). Overall score = Life Power. Per-domain = Domain Stats (0-99). Social = Squads (temp) and Communities (persistent).

## Workflow

1. Read the screen spec and shared patterns
2. Check if the route exists in `src/data/screens.ts`; add if missing
3. Implement the screen as a `page.tsx` using existing design-system components
4. Use mock data from `src/data/mock.ts` (add new mock data there, not inline)
5. Apply Framer Motion entry animations per the spec's motion section
6. Wrap content in `ScreenShell` with appropriate header and tab bar config
7. Run `npm run check` before marking the screen complete

## Rules

- Never add API calls, fetch requests, or backend state
- Never add state management libraries (Redux, Zustand, etc.)
- Never hardcode colors — use Tailwind classes mapped to design tokens
- Never use non-Lucide icon libraries
- Never approximate or AI-generate the Balencia logo — use official assets from `public/logos/`
- All screens render inside PhoneFrame (375x812px viewport)
- All text uses Sora font family

## Verification

```bash
npm run check    # lint + typecheck + verify:routes + verify:assets + verify:copy + verify:brand
```

All verification scripts must pass before a batch is marked complete.
