# 83-social-buddy-profile - hi-fi glass spec

### 1. Header
- **ID:** 83
- **Name:** Social buddy profile
- **Route(s) covered:** /profile/[id]
- **Tab:** Me / Social overlay
- **Source:** app_design 3/83-social-buddy-profile.md plus ascii_wireframes/83-social-buddy-profile.md
- **Batch:** 8

### 2. Purpose
Social buddy profile is a trusted-person detail screen, not a public social page. It identifies the buddy, shows shared missions, explains what the relationship can see, and keeps message, visibility, invite, report, and block controls close to the surface.

### 3. Entry & exit
- **Entry paths:** Direct Chat [75], Accountability [46], Community [40], Leaderboard [39], Competitions [47], Feed [91], or member link to /profile/[id].
- **Primary exit:** Message opens Direct Chat [75]; back returns to origin.
- **Secondary exits:** Adjust visibility opens permissions sheet; shared mission opens Mission Detail [14]; invite opens mission picker; avatar opens Image Viewer [67]; report/block opens Report/Block [64].
- **Failure exit:** if mission or privacy data fails, keep identity visible and show retry on the affected section only.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, and overflow wired to report/block.
2. **Buddy hero GlassCard** with avatar, name, relationship summary, trusted/CIA pills, and shared-domain shape.
3. **Shared missions** with progress, domain tags, framing copy, and provenance chips.
4. **CIAInsightCard** with one evidenced cross-domain observation when consent exists.
5. **Network controls** for permissions, invite to mission, safety/reporting, and privacy copy.
6. **Sticky bottom actions** with Adjust visibility and Message above global nav.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Buddy profile                 ... |
+--------------------------------------+
| +----------------------------------+ |
| |          [AK avatar]             | |
| |          Aisha Khan              | |
| | Running partner. We're training  | |
| | for the half together.           | |
| | [Trusted partner] [CIA checked]  | |
| | Shared domains: Fitness Learning | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA: you both sleep better on    | |
| | run days. via WHOOP + check-ins  | |
| +----------------------------------+ |
| SHARED MISSIONS                      |
| +----------------------------------+ |
| | Run a half marathon          68% | |
| | fitness | via mission check-ins | |
| | [============------] on track    | |
| +----------------------------------+ |
| | Read 2 books this month      35% | |
| | learning | building momentum     | |
| +----------------------------------+ |
| NETWORK                              |
| Permissions | Invite | Safety        |
| [Adjust visibility] [Message]        |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back and report/block overflow.
- **GlassCard** - buddy hero.
- **AvatarStack** - trusted member context and shared participants where needed.
- **ChipDomainTag** - Fitness, Learning, and relationship domain tags.
- **CIAInsightCard** - evidenced shared-pattern note.
- **ProgressBar** - mission progress with text framing.
- **SolidCard** - shared missions and network controls.
- **ChipProvenance** - mission check-ins, WHOOP, shared data, privacy status.
- **Sheet** - visibility, invite to mission, report/block, avatar preview handoff.
- **BtnPrimary / BtnSecondary / BtnGhost** - Message, Adjust visibility, Invite, Report/block.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.
- **NEW: SharedDomainShape** - compact relationship overlap visual. Rationale: catalog chips do not show overlap between two members' domains.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F`, subtle grain, and a faint purple pool only behind the CIA card.
- **Glass tiering:** hero and CIA card use glass; missions and network controls use SolidCard on `#211008`.
- **Semantic glows:** message/invite actions use `--glow-you #FF5E00`; trusted/accepted connection uses `--glow-done #34A853`; shared-pattern insight uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; relationship summary can read `training for the *half* together` with Tiempos italic emphasis.
- **60/30/10:** orange for action, green for trust/completion, purple for CIA. Relationship accents stay as tags, not full chrome.

### 7. Content & copy
- **Name:** Aisha Khan
- **Summary:** Running partner. We're training for the *half* together.
- **Pills:** Trusted partner; CIA checked in.
- **CIA line:** You both sleep better on run days, based on WHOOP and mission check-ins.
- **Shared missions:** Run a half marathon; Read 2 books this month.
- **Network copy:** Manage how you share, permissions, and safety.
- **Primary CTA:** Message
- **Secondary CTAs:** Adjust visibility; Invite to mission; Permissions; Safety and reporting
- **Empty copy:** No shared missions yet. Invite Aisha to a mission to train together.
- **Error copy:** Shared mission data could not load. Your buddy controls still work.

### 8. Data & honesty states
- **Buddy identity:** real = profile record and avatar provenance; low-confidence = avatar pending; honest-null = initials avatar with no fabricated photo.
- **Trusted state:** real = accepted buddy link; low-confidence = pending invite; honest-null = no relationship controls beyond public-safe actions.
- **Shared missions:** real = mission progress plus ChipProvenance; low-confidence = stale check-ins; honest-null = no shared missions.
- **Shared-domain shape:** real = consented overlapping domains; low-confidence = one member stale; honest-null = hidden with invite prompt.
- **CIA insight:** real = at least two consented signals; low-confidence = one shared signal; honest-null = no shared-data claim.

### 9. All states
- **Default:** hero, CIA insight, shared missions, network controls, and sticky actions render.
- **Skeleton:** avatar, name, pills, mission cards, and controls keep geometry; no fake buddy photo or progress.
- **Empty:** no shared missions card offers Invite to mission while hero and privacy controls remain.
- **Error:** identity remains; failed section shows retry and provenance warning.
- **Success:** message handoff, visibility update, invite, or report/block shows confirmation with `--glow-done`.
- **Disabled:** Message dims to 40% with reason when invite pending, removed, blocked, or privacy setting disallows chat.

### 10. Motion & interaction
- **Load:** hero appears first, missions stagger 50ms, bottom actions settle last.
- **Mission progress:** bars fill to real value only; reduced-motion renders filled instantly.
- **Visibility:** sheet opens as half-height with per-domain toggles and revoke/delete shared data.
- **Safety:** report/block is reachable from overflow and network controls; destructive actions require confirmation.
- **Reduced-motion:** disables stagger, bar fill, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** hero, one mission summary, visibility, Message, Safety.
- **Medium:** default shared missions, CIA insight, network controls.
- **High:** detailed domain overlap, exact progress provenance, partner permissions matrix, and shared-data audit.

### 12. Accessibility
- **Contrast:** all text and chips clear AA+.
- **Targets:** back, overflow, avatar, mission cards, visibility, Message, Invite, and Report/block are 44px minimum.
- **Screen readers:** hero announces name, trust state, relationship summary, shared missions, and privacy state.
- **Consent/social safety:** visibility, revoke shared data, invite, report, and block are first-class controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /profile/[id], buddy identity, shared missions, privacy, Message, invite, report/block are present.
2. **Honest:** real, low-confidence, honest-null states cover identity, trust, missions, domain shape, CIA.
3. **Premium:** trusted-person detail is private-first, not public-social generic.
4. **Warm-dark:** glass hero and solid mission/network cards specified.
5. **Semantic glow:** orange action, green trust, purple CIA.
6. **60/30/10:** relationship color stays in tags.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, privacy, contrast, reduced-motion.
11. **Consent:** shared data visibility, revoke/delete, report/block included.
12. **Catalog:** canon components reused; SharedDomainShape is NEW with rationale.
13. **CIA voice:** evidence-led, friendly, and safety-aware.

