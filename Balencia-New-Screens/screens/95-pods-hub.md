# 95-pods-hub - hi-fi glass spec

### 1. Header
- **ID:** 95
- **Name:** Pods hub
- **Route(s) covered:** /groups
- **Tab:** Social / Me
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 19

### 2. Purpose
Pods hub lets members browse, join, and manage Pods, Circles, Communities, and Partners from the live /groups route. The screen emphasizes consent-based buddy discovery, clear join/manage actions, moderation, and honest social metrics instead of pressure or public comparison.

### 3. Entry & exit
- **Entry paths:** /groups live route, Social feed, buddy profile, accountability invite, Today social recommendation, and onboarding social preference.
- **Primary exit:** Back returns to source; selected tab and search filter persist.
- **Action exits:** `Join pod` opens join sheet; `Create circle` opens setup; `Manage partners` opens permissions; `Report pod` opens Report/Block [64]; member taps route to /profile/[id].
- **Failure exit:** group fetch or join failure keeps cached pods visible with retry and System states [98] fallback.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with title, search, and create action.
2. **Hero GlassCard** summarizing your pod count, pending invites, and consent state.
3. **SegmentedTabs** for Pods, Circles, Communities, Partners.
4. **PodCard grid/list** with purpose, members, shared goal, privacy, join/manage action.
5. **CIAInsightCard** for suggested pods when goals and social consent permit.
6. **Consent and moderation zone** for buddy discovery, partner visibility, report, block, and leave.
7. **Footer** with low-pressure empty state and privacy reminder.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Pods                       search |
+--------------------------------------+
| +----------------------------------+ |
| | Your groups                     | |
| | 2 pods | 1 invite | consent on  | |
| | via /groups membership          | |
| | [Manage discovery]              | |
| +----------------------------------+ |
| [Pods] [Circles] [Communities]      |
|                                      |
| +----------------------------------+ |
| | PodCard: morning runners        | |
| | 8 members | shared half plan    | |
| | Aisha, Omar +5                 | |
| | [Join pod] [Preview privacy]    | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Circle: focus builders          | |
| | private | partner invite only   | |
| | [Manage] [Report]               | |
| +----------------------------------+ |
| CIA: this pod matches your run plan |
| Buddy discovery: revoke anytime      |
+--------------------------------------+
```

### 5. Components
- **TopBar** - search, create, and back.
- **GlassStatCard** - member's pod count, pending invites, discovery consent.
- **SegmentedTabs** - Pods, Circles, Communities, Partners.
- **PodCard** - group browse/manage row with purpose, members, shared goal, privacy.
- **AvatarStack** - member previews with counts and alt labels.
- **ConsentCard** - buddy discovery, partner visibility, revoke, and delete controls.
- **CIAInsightCard** - suggested pod with evidence and no shame.
- **Sheet** - join preview, create circle, permissions, report/leave.
- **ChipProvenance** - membership source, invite timestamp, shared-goal confidence.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** dark base `#0A0A0F`, warm radial glow, light grain; social content stays calm rather than noisy.
- **Glass tiering:** hero and CIA card use GlassCard; PodCards and moderation rows use SolidCard on `#211008`.
- **Semantic glows:** join/manage action uses `--glow-you #FF5E00`; joined/shared success uses `--glow-done #34A853`; CIA suggestion uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal throughout; hero can read `Find your *circle*`, with Tiempos italic word.
- **60/30/10:** orange = action, green = joined/healthy group, purple = AI match. Member avatars do not recolor surfaces.

### 7. Content & copy
- **H1:** Find your *circle*
- **Hero labels:** Your groups; pending invites; buddy discovery.
- **Pod card copy:** Morning runners; 8 members; shared half plan; private circle; partner invite only.
- **CIA line:** CIA suggests this pod because your half-marathon plan overlaps with three members.
- **Primary CTAs:** Join pod; Create circle
- **Secondary CTAs:** Manage partners; Preview privacy; Leave pod; Report pod
- **Empty copy:** No pods match your filters. You can create a private circle or turn off discovery.
- **Error copy:** Groups could not refresh. Showing last synced memberships.
- **Privacy copy:** Buddy discovery is optional and can be revoked or deleted.

### 8. Data & honesty states
- **Membership count:** real = server membership plus ChipProvenance; low-confidence = cached membership; honest-null = no groups joined.
- **Invite state:** real = pending/accepted/expired timestamp; low-confidence = invite service delayed; honest-null = no invites.
- **Shared goal match:** real = consented goal overlap; low-confidence = topic-only estimate; honest-null = hidden until consent.
- **Partner visibility:** real = per-domain toggles; low-confidence = sync pending; honest-null = discovery off.
- **CIA suggestion:** real = goal and consent evidence; low-confidence = one signal; honest-null = no suggestion.

### 9. All states
- **Default:** hero, tabs, PodCards, CIA suggestion, consent/moderation controls.
- **Skeleton:** pod cards render avatar/title/action geometry with no fake member counts.
- **Empty:** HonestNullState offers create circle, broaden filters, and discovery controls.
- **Error:** cached groups stay visible with stale provenance and retry.
- **Success:** join/create/leave updates row in place with `--glow-done` and a clear undo where safe.
- **Disabled:** join, invite, message, and discovery controls dim to 40% with reason when consent, age gate, moderation, connectivity, or entitlement blocks action.

### 10. Motion & interaction
- **Load:** hero first, tabs second, PodCards in 40ms stagger.
- **Join:** opens preview Sheet; success collapses to joined state and updates AvatarStack.
- **Search/filter:** results crossfade; empty state does not move footer controls.
- **Moderation:** report/block uses action Sheet with no swipe-only destructive path.
- **Reduced-motion:** disables stagger, avatar transitions, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** show only current pods, pending invites, and discovery toggle.
- **Medium:** default browse/manage, suggestions, moderation, partner controls.
- **High:** add detailed member overlap, shared-goal matrix, invitation audit, and advanced filters.

### 12. Accessibility
- **Contrast:** all text/chips clear AA+ on warm-dark surfaces.
- **Targets:** tabs, PodCards, join/manage/report, avatars, and toggles are 44px minimum.
- **Screen readers:** PodCards announce name, privacy, member count, shared goal, and join state.
- **Consent/social safety:** buddy discovery consent, revoke/delete, leave, report, block, and partner visibility are primary controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /groups, pods, circles, partners, join/manage, and buddy discovery are present.
2. **Honest:** real, low-confidence, honest-null states cover membership, invite, shared goal, visibility, and CIA.
3. **Premium:** social management is specific and calm.
4. **Warm-dark:** glass hero and solid social rows specified.
5. **Semantic glow:** orange join/manage, green joined, purple CIA.
6. **60/30/10:** avatars and group topics do not dominate.
7. **Type:** Neue Montreal plus Tiempos italic emphasis.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, contrast, reduced-motion.
11. **Consent:** buddy discovery revoke/delete and moderation are explicit.
12. **Catalog:** canon components reused.
13. **CIA voice:** supportive, evidence-led, non-pressuring.

