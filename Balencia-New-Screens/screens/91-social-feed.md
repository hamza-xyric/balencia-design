# 91-social-feed - hi-fi glass spec

### 1. Header
- **ID:** 91
- **Name:** Social feed
- **Route(s) covered:** /feed
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Social primary nav.
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, and Balencia-New-Screens/canon.
- **Batch:** 9

### 2. Purpose
Feed is the social proof stream for progress posts, accountability updates, group highlights, and community wins. It must feel supportive and moderated, not performative: proof is sourced, reactions are warm, and every social surface has report, mute, consent, and privacy controls.

### 3. Entry & exit
- **Entry:** primary nav Feed, notifications, group/pod updates, profile activity, or CIA suggestion.
- **Primary exit:** open a FeedPostCard, leave kudos, comment, or create a post.
- **Social exit:** author row opens peer profile; group chip opens groups; challenge chip opens competitions.
- **Safety exit:** report, mute, block, and moderation Sheet are available from every post.
- **Failure exit:** cached feed renders with OfflineBanner and per-post retry when actions fail.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Feed", create post, and filters.
2. Composer prompt with privacy selector.
3. CIAInsightCard about a supportive interaction or posting suggestion.
4. FeedPostCard stack with author, proof, text, media, kudos, comment, and report.
5. Empty or moderation notice if feed is unavailable.
6. GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| Feed                       post filt |
+--------------------------------------+
| +----------------------------------+ |
| | Share a proof update             | |
| | visible to: buddies              | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: Aisha's run post matches    | |
| | your half-marathon mission.      | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Aisha Khan       12m      report | |
| | Finished tempo run with Amira.   | |
| | [proof: 5.2 mi via wearable]     | |
| | kudos 24     comment 6          | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Malik R.        1h       report  | |
| | Budget streak reached 14 days.   | |
| | [proof: goal update]             | |
| | kudos 12     comment 2          | |
| +----------------------------------+ |
| Today | CIA | Goals | Me            |
+--------------------------------------+
```

### 5. Components
- **TopBar** - feed title, create, filter.
- **FeedPostCard** - author row, body, proof card, action row, report menu.
- **ChipProvenance** - `via wearable`, `goal update`, `user post`, `moderated`.
- **ChipDomainTag** - fitness, finance, wellbeing, group, competition.
- **CIAInsightCard** - supportive connection suggestion.
- **Sheet** - privacy selector, comments, report/mute/block, delete post.
- **AvatarStack** - mutual buddies or group context.
- **EmptyState / ErrorState / SkeletonState / OfflineBanner** - feed states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with warm radial glow and restrained grain.
- **Cards:** FeedPostCard uses SolidCard on `#211008` for readable long content.
- **Semantic glows:** your own proof card uses `--glow-you #FF5E00`; successful kudos/comment uses `--glow-done #34A853`; CIA suggestion uses `--glow-cia #7F24FF`.
- **60/30/10:** orange for create and your actions, green for successful interaction, purple only for CIA.
- **Type:** Neue Montreal with one Tiempos italic word in the composer prompt, e.g. "share one *proof*."

### 7. Content & copy
- **H1:** "Feed."
- **Composer:** "Share one *proof* update." Privacy label: "Visible to buddies."
- **CIA line:** "Aisha's run post matches your half-marathon mission."
- **Post example 1:** "Finished tempo run with Amira." Proof: "5.2 mi via wearable."
- **Post example 2:** "Budget streak reached 14 days." Proof: "Goal update."
- **Actions:** "Kudos", "Comment", "Report", "Mute", "Block."
- **Empty copy:** "No posts yet. Follow a pod or share a private proof update."

### 8. Data & honesty states
- **Posts:** real = authored post plus timestamp and provenance; low-confidence = pending moderation or upload; honest-null = empty feed prompt.
- **Proof:** real = source-backed artifact; low-confidence = self-reported proof label; honest-null = no proof card.
- **Counts:** real = server kudos/comment count; low-confidence = optimistic local count; honest-null = hide number and show action label.
- **Moderation:** real = report status and policy reason; low-confidence = queued report offline; honest-null = no moderation banner.
- **Consent:** social sharing, photos, voice, health proof, CIA suggested post, and third-party data all expose revoke/delete controls.

### 9. All states
- **Default:** composer, CIA suggestion, FeedPostCard list, action rows, and nav render.
- **Skeleton:** composer, two post cards, proof blocks, and action rows shimmer.
- **Empty:** show privacy-aware EmptyState with pod suggestion and create post action.
- **Error:** cached feed remains; failed actions show inline retry.
- **Success:** kudos fills orange then settles; comment post shows green confirmation.
- **Disabled:** create/comment actions dim when privacy, moderation, connectivity, or entitlement blocks them.

### 10. Motion & interaction
- **Load:** post cards fade up by index; proof card appears with the parent card.
- **Kudos:** tap toggles orange active state and count update; reduced-motion skips pulse.
- **Comment:** opens bottom Sheet with thread and composer.
- **Report:** opens action Sheet with report, mute, block, and delete if own post.
- **Create:** opens composer Sheet with privacy selector before media attach.
- **Reduced-motion:** disables card stagger and kudos pulse; all states use opacity-only.

### 11. Motivation-tier adaptation
- **Low:** hide public metrics, show close-buddy posts first, and collapse comments.
- **Medium:** default feed density.
- **High:** show filters, group chips, proof details, and moderation status chips.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** post actions, report menu, privacy selector, author rows, and chips are 44px minimum.
- **Screen readers:** each FeedPostCard announces author, time, text, proof source, kudos/comment counts, and moderation options.
- **Safety:** report, mute, block, and crisis resources are available where social content signals harm.
- **Data controls:** consent/revoke/delete controls cover social data, media, health proof, voice, CIA suggestions, and third-party sources.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** feed ties proof, buddies, groups, goals, and CIA context.
2. **Honest:** proof, counts, and moderation states carry provenance.
3. **Premium:** supportive social stack, not infinite noise.
4. **Warm-dark:** canon dark glass and solid cards used.
5. **Semantic glow:** own effort, successful action, and CIA suggestion meanings are stated.
6. **60/30/10:** orange action, green success, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high social density defined.
10. **Accessibility:** labels, 44px targets, contrast, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined for social data.
12. **Catalog:** FeedPostCard and catalog components used.
13. **CIA voice:** suggestions are supportive, never performative.
