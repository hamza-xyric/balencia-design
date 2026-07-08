### 1. Header
- **Screen ID:** 18
- **Name:** explore-section
- **Route(s) covered:** No live route; stack-pushed Explore catalog opened from Me Main [17].
- **Tab:** Me stack
- **Source:** Functional Content Brief: Explore Section
- **Batch:** 9

### 2. Purpose
Explore is Balencia's feature discovery catalog. It answers what else the member can do in the app without forcing them into CIA Chat, while still using CIA-ranked recommendations when enough context exists. The focal idea is not a sales page; it is a browsable map of domains, wellbeing tools, and standalone utilities.

### 3. Entry & exit
- **Entry paths:** Me Main [17] "see all" link from the suggested modules rail.
- **Exit paths:** Back returns to Me Main. Module cards push their destination screens. Search filters remain in-place and do not navigate until a result card is tapped.
- **Locked module path:** locked cards push Paywall/Upgrade [43] with the attempted module as trigger context.

### 4. Layout anatomy
**Regions top-to-bottom:**
1. **TopBar:** back chevron, title "explore."
2. **Search bar:** controlled input for module filtering.
3. **Suggested rail:** "suggested for you" cards, or "Popular with Balencia" fallback.
4. **Active domains hero:** conditional micro ConstellationRadar if at least five active domains exist.
5. **Domain sections:** Fitness, Nutrition, Finance, Career, Relationships, Spirituality, Learning, Creativity, Wellbeing.
6. **More features:** two-column grid for Journal, Habits, Calendar, Notes, Reminders, and other tools.

**ASCII wireframe (390x844):**
```text
┌──────────────────────────────────────┐
│ ‹  explore                           │
│ ┌ search modules...              × ┐ │
│ └──────────────────────────────────┘ │
│ suggested for you                    │
│ ┌────────────┐ ┌────────────┐        │
│ │ Journal    │ │ Sleep      │        │
│ │ start here │ │ suggested  │        │
│ └────────────┘ └────────────┘        │
│ Your active domains                  │
│        small constellation radar      │
│ Fitness and movement                 │
│ ┌────────────┐ ┌────────────┐        │
│ │ Workouts   │ │ Yoga       │        │
│ └────────────┘ └────────────┘        │
│ Wellbeing                            │
│ ┌────────────┐ ┌────────────┐        │
│ │ Journal    │ │ Habits     │        │
│ └────────────┘ └────────────┘        │
│ more features                        │
└──────────────────────────────────────┘
```

### 5. Components
- **TopBar** with 44px back target.
- **SearchInput** with clear button and screen-reader label.
- **ModuleCard** (NEW) for feature/domain entries with route, status badge, and optional lock.
- **ConstellationRadar** mini variant for active-domain recap.
- **ChipDomainTag** for domain labels.
- **PaywallLock** for Plus/Pro modules.
- **CIAInsightCard** style only for recommendation rationale, not for every card.
- **SkeletonState, ErrorState, OfflineBanner, HonestNullState, ChipProvenance** for data states.

### 6. Visual treatment
- **Atmosphere:** warm dark base with subtle grain.
- **Focal hierarchy:** active domains radar is the only above-fold visual hero when available; otherwise the suggested rail leads.
- **Glass tiers:** search and suggested cards use glass; dense domain grids use SolidCard.
- **Semantic glow:** suggested cards use glow-cia only when CIA-ranked; locked cards have no glow; module progress uses glow-you; completion badges use glow-done.

### 7. Content & copy
- **Title:** explore
- **Search placeholder:** search modules...
- **Suggestion eyebrow:** suggested for you
- **Fallback eyebrow:** Popular with Balencia
- **More features:** more features
- **Day 1:** Explore what Balencia can help with.
- **No results:** no modules match this search. Try a different search.
- **Loading:** CIA is reading your domains - one moment.
- **Error:** Couldn't refresh suggestions - pull to retry.
- **Offline:** offline - showing your last cache.
- **Badges:** suggested, new, start here, Plus, Pro.

### 8. Data & honesty states
- **Suggested modules:** real = module array with ChipProvenance "via recent activity"; low-confidence = muted suggestions with "early read · low confidence"; honest-null = static popular cards.
- **Domain stats:** real = 0-99 stat, level, and XP progress; low-confidence = dashed progress while sync is partial; honest-null = plain module card with no stat preview.
- **Active domains radar:** real = at least five synced domains; low-confidence = ghosted vertices for partial domains; honest-null = radar omitted.
- **Subscription lock:** real = entitlement from user plan; low-confidence not applicable; honest-null = no badge for included features.
- **Search results:** real = filtered local catalog; low-confidence = server-backed result row marked "may be outdated"; honest-null = no-results block.

### 9. All states
- **Default:** search, suggestions, active-domain hero when eligible, domain sections, and more features.
- **Skeleton:** search, rail cards, radar axes, and module cards shimmer in final geometry.
- **Empty:** no search results block replaces all sections.
- **Error:** catalog remains navigable; failed suggestions fall back to Popular with Balencia.
- **Success:** pull-to-refresh updates suggestions with a short "Suggestions refreshed" toast.
- **Disabled:** locked modules render at 40% opacity with lock glyph and tier word.
- **Offline:** cached catalog remains; server-backed suggestions and community modules show stale labels.

### 10. Motion & interaction
- Tap module to navigate. Tap search to filter. Clear button resets. Edge swipe pops stack.
- Radar draws when present; domain sections fade in by group; search filtering crossfades cards.
- Locked module tap opens Paywall [43] with trigger context.
- **Reduced-motion path:** no radar draw or stagger; sections render static and search changes instantly.

### 11. Motivation-tier adaptation
- **Low:** show simple starter modules and hide dense domain stats.
- **Medium:** default catalog with suggested rail and status badges.
- **High:** show XP progress, domain stats, and advanced modules higher in the order.

### 12. Accessibility
- Back, search clear, module cards, and lock affordances meet 44px targets.
- Lock state is text plus icon, never color alone.
- Search results announce count changes.
- Radar has text summary and is not the only route to a domain.
- Offline/stale labels are included in row accessibility text.

### 13. Premium checklist
1. Explore is source-specific discovery, not a generic dashboard.
2. No fake live route is claimed.
3. Search, suggestions, radar, domain sections, and locks are preserved.
4. CIA recommendation is optional and provenance-labeled.
5. Locked modules route ethically to Paywall [43].
6. Empty search is constructive.
7. Offline catalog remains usable.
8. Selective glass keeps the grid scannable.
9. Semantic glow maps to CIA, effort, or completion.
10. Default, Skeleton, Empty, Error, Success, Disabled, and Offline states exist.
11. Reduced-motion path exists.
12. 44px target floor is stated.
13. No gamified shame or manipulative scarcity.
14. Cross-links to domain and wellbeing screens are preserved.
