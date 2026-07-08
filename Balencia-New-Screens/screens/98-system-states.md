# 98-system-states - hi-fi glass spec

### 1. Header
- **ID:** 98
- **Name:** System states
- **Route(s) covered:** /offline, /maintenance, /forbidden, /unauthorized, /coming-soon
- **Tab:** None
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 20

### 2. Purpose
System states define the reusable full-page utility treatment for offline, maintenance, forbidden, unauthorized, and coming-soon routes. These screens must be calm, route-specific, and honest about what happened, what data is stale, and what the user can do next.

### 3. Entry & exit
- **Entry paths:** router fallback, permission gate, auth failure, deploy maintenance, network loss, feature flag, and direct utility routes listed in the header.
- **Primary exit:** return to last safe screen when available, or route to sign in, home, support, or retry based on state.
- **Action exits:** `Retry connection`, `Go to sign in`, `Return home`, `Check status`, `Contact support`, and `View cached data` where applicable.
- **Failure exit:** if even fallback assets fail, render text-only shell with route name and support contact.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **Minimal TopBar** with brand, route-aware title, and support/status action where available.
2. **State hero GlassCard** with icon, headline, short explanation, and last-safe provenance.
3. **Action row** with one primary recovery action and one secondary action.
4. **Cached data panel** for offline and forbidden-safe contexts.
5. **Status detail list** for maintenance window, permission reason, or coming-soon availability.
6. **Footer** with support, privacy, and no fabricated service claims.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Balencia                     support |
+--------------------------------------+
| +----------------------------------+ |
| | Offline                         | |
| | You're offline. Showing last    | |
| | sync from 2 hours ago.          | |
| | provenance: cached dashboard    | |
| | [Retry connection] [View cache] | |
| +----------------------------------+ |
|                                      |
| Last safe snapshot                   |
| +----------------------------------+ |
| | Today actions cached at 8:42 AM | |
| | Health data may be stale        | |
| +----------------------------------+ |
|                                      |
| Route variants                       |
| /maintenance: status window          |
| /forbidden: permission needed        |
| /unauthorized: sign in required      |
| /coming-soon: feature not released   |
|                                      |
| Contact support | privacy            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - minimal brand/title and support/status action.
- **GlassCard** - state hero with route-specific icon and message.
- **OfflineBanner / SyncStatus** - stale-data label for offline and cached states.
- **ErrorState** - quiet failure treatment with recovery actions.
- **SolidCard** - cached data, status detail, support information.
- **BtnPrimary / BtnSecondary / BtnGhost** - retry, sign in, home, status, support.
- **ChipProvenance** - route, cache age, status source, and confidence labels.
- **SafetyResourceCard** - only when a blocked wellbeing flow needs crisis or urgent support link.
- **SkeletonState / HonestNullState** - only for cached panels that still load.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F` with restrained radial glow; utility screens stay premium but quiet.
- **Glass tiering:** state hero uses GlassCard; cached/status details use SolidCard on `#211008`.
- **Semantic glows:** retry/recovery uses `--glow-you #FF5E00`; restored/cached-success state uses `--glow-done #34A853`; AI-related unavailable state can use `--glow-cia #7F24FF` only when the blocked feature is CIA-owned.
- **Type:** Neue Montreal for all UI; route headline can use one Tiempos italic word, e.g. `You're *offline*`.
- **60/30/10:** orange for recovery, green for restored data, purple only for AI service context.

### 7. Content & copy
- **Offline:** You're offline. Showing last sync from 2 hours ago.
- **Maintenance:** Balencia is under maintenance. We will reconnect you when service returns.
- **Forbidden:** This area needs permission you do not currently have.
- **Unauthorized:** Sign in to view this page.
- **Coming soon:** This feature is not released yet.
- **Primary CTAs:** Retry connection; Go to sign in; Return home; Check status
- **Secondary CTAs:** View cached data; Contact support
- **Error copy:** We could not load the recovery action. The route name and support link are still available.
- **Cache copy:** Cached values are stale and marked with provenance chips.

### 8. Data & honesty states
- **Route state:** real = exact route and reason; low-confidence = unknown router error with fallback copy; honest-null = no reason, show plain safe message.
- **Cache age:** real = timestamp plus ChipProvenance; low-confidence = local clock uncertain; honest-null = no cache shown.
- **Maintenance window:** real = published window/source; low-confidence = status endpoint delayed; honest-null = no ETA promised.
- **Permission reason:** real = role, plan, or auth state; low-confidence = policy service stale; honest-null = do not guess.
- **CIA status:** real = service status if relevant; low-confidence = service check delayed; honest-null = no AI claim on non-AI route.

### 9. All states
- **Default:** route-specific hero, explanation, recovery action, support/footer, and any safe cached panel.
- **Skeleton:** only cached/status panels shimmer; hero copy is immediate and readable.
- **Empty:** HonestNullState for no cache or no ETA with clear next action.
- **Error:** fallback keeps route title, support, and home/sign-in action visible.
- **Success:** retry reconnects and returns to last safe route with `--glow-done` confirmation.
- **Disabled:** actions dim to 40% with reason when offline, forbidden, maintenance-locked, or auth-locked.

### 10. Motion & interaction
- **Load:** hero appears immediately; cached panels fade in after state probe.
- **Retry:** button shows spinner then success/error text; no infinite loading.
- **Return:** last safe route transition is a normal stack replace, not a modal surprise.
- **Status:** external status/support links open only after user action.
- **Reduced-motion:** disables fade and spinner flourish; text state changes remain.

### 11. Motivation-tier adaptation
- **Low:** one sentence, one recovery action, support link.
- **Medium:** default hero, cache/status panel, secondary action.
- **High:** add route diagnostics, status source, cache list, and permission details.

### 12. Accessibility
- **Contrast:** utility hero and details clear AA+ on dark surfaces.
- **Targets:** retry, sign-in, home, support, and status actions are 44px minimum.
- **Screen readers:** page announces state, route, reason, stale-data age, and primary recovery action.
- **Safety:** wellbeing-blocked flows keep crisis or urgent support resource visible when appropriate.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /offline, /maintenance, /forbidden, /unauthorized, /coming-soon are individually covered.
2. **Honest:** real, low-confidence, and honest-null states cover reason, cache, ETA, permission, and CIA status.
3. **Premium:** route-specific utility design replaces generic error boxes.
4. **Warm-dark:** glass hero and solid details specified.
5. **Semantic glow:** orange recovery, green restored, purple AI-only.
6. **60/30/10:** utility colors remain functional.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, route announcements, contrast, reduced-motion.
11. **Data honesty:** stale/cached values are labeled.
12. **Catalog:** canon system components reused.
13. **CIA voice:** present only when the affected service is AI-related.

