# 47-competitions - hi-fi glass spec

### 1. Header
- **ID:** 47
- **Name:** Competitions
- **Route(s) covered:** /competitions
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Social / Explore.
- **Source:** app_design 3/47-competitions.md and ascii_wireframes/47-competitions.md.
- **Batch:** 19

### 2. Purpose
Competitions lets users browse, join, and track health challenges. It frames challenges as optional shared climbs, not pressure: rules, anti-cheat, participant count, rank, and time remaining are honest and visible before joining.

### 3. Entry & exit
- **Entry:** Explore, Leaderboard, Community room challenge, CIA suggestion, or notification.
- **Primary exit:** join challenge, view details, or view results.
- **Secondary exits:** competition detail, leaderboard, chat, limited profile.
- **Premium exit:** PaywallLock for Plus-only competitions.
- **Failure exit:** cached competitions remain with retry.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Competitions."
2. Featured challenge hero with countdown, participants, prize, and join now.
3. Filter chips: All, Active, Upcoming, Past, My.
4. Invitation badge.
5. CIA suggested challenge cards.
6. Competition card list with status, challenge, participants, rank, and join/view action.
7. GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <        Competitions                |
| FEATURED: Step Challenge active      |
| May 25-Jun 8, 234 participants       |
| time elapsed [############------]68% |
| prize 500 XP + Gold Badge            |
| [join now]                           |
| [All][Active][Upcoming][Past][My]    |
| 2 invitations from Sarah, Ahmed      |
| SUGGESTED: 7-Day Mindful, Fit Feb    |
| Step Challenge #12 [view details]    |
| Meditation Marathon [join]           |
| Nutrition Challenge #5 [view results]|
| Today | CIA | Goals | Me             |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title and back.
- **GlassCard** - featured competition hero.
- **ProgressBar / MomentumBar** - time window elapsed.
- **KPIRow** - participants, prize, your rank.
- **LeaderboardRow** - detail standings preview.
- **ChipDomainTag / ChipProvenance** - admin, CIA, active, upcoming, ended.
- **PaywallLock** - locked social challenge.
- **Sheet** - invite list, rules, join confirmation, report.
- **SkeletonState / ErrorState / HonestNullState / OfflineBanner** - states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` warm dark with orange hero accents.
- **Semantic glows:** join/active challenge uses `--glow-you #FF5E00`; completion/result uses `--glow-done #34A853`; CIA suggestion uses `--glow-cia #7F24FF`.
- **Status:** dots always pair with labels: active, upcoming, ended.
- **Rows:** SolidCard on `#211008` for card list.
- **Type:** Neue Montreal plus one Tiempos italic word, e.g. "shared *climb*."

### 7. Content & copy
- **Hero:** "Step Challenge." "02d 14h 32m remaining." "234 participants."
- **Challenge rows:** "Meditation Marathon", "Nutrition Challenge", "Spring Sprint."
- **Invitation:** "2 competition invitations from Sarah, Ahmed."
- **Actions:** "Join now", "View details", "View results."
- **Rules copy:** "Verified device data only."
- **Empty copy:** "No challenges match this filter. Try Active or Suggested."

### 8. Data & honesty states
- **Competition:** real = date range, participants, rules, status; low-confidence = cached list; honest-null = empty filter.
- **Countdown:** real = server time window; low-confidence = offline cached remaining; honest-null = hide countdown.
- **Rank:** real = joined score and rank; low-confidence = pending sync; honest-null = no rank until joined.
- **CIA suggestion:** real = evidence-backed challenge match; low-confidence = starter suggestion; honest-null = hide suggestions.
- **Controls:** social sharing, leaderboard visibility, health proof, CIA suggestions, third-party data, and report/block expose consent/revoke/delete.

### 9. All states
- **Default:** hero, filters, invitations, suggestions, list, and nav render.
- **Skeleton:** hero, filter chips, invite card, suggestions, and rows shimmer.
- **Empty:** filter empty state suggests another filter without shame.
- **Error:** cached competitions remain with source-specific retry.
- **Success:** join adds challenge to My and changes CTA to View details with green confirmation.
- **Disabled:** join/view dims when premium, rules, consent, or connectivity blocks it.

### 10. Motion & interaction
- **Load:** hero appears first, time bar draws, rows fade.
- **Filter:** chip selection updates list with crossfade.
- **Join:** opens confirmation Sheet with rules and data used.
- **Detail:** card opens competition detail with leaderboard and progress.
- **Invite:** badge opens invitation Sheet.
- **Reduced-motion:** no bar fill or row stagger; content appears final.

### 11. Motivation-tier adaptation
- **Low:** My competitions and one suggested challenge; rank pressure minimized.
- **Medium:** default list.
- **High:** global list, rankings, projections, chat, and rule details expanded.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** filters, hero CTA, rows, invitation badge, and join buttons are 44px minimum.
- **Screen readers:** cards announce challenge name, status, dates, participants, rank, source, and action.
- **Safety:** report/block and anti-cheat/rules are reachable from detail.
- **Data controls:** health proof, social, leaderboard, CIA, and third-party data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** competitions tie health proof, leaderboard, community, and CIA suggestions.
2. **Honest:** status, time, participants, and rank are sourced.
3. **Premium:** shared challenge, not pressure feed.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** active, completion, and CIA meanings stated.
6. **60/30/10:** orange action, green completion, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** labels, 44px targets, rules, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** LeaderboardRow, PaywallLock, and canon components used.
13. **CIA voice:** suggestions are opt-in and evidence-backed.
