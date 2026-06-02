# Screen Design: Social Buddy Profile

**Screen**: 83 of 90
**File**: 83-social-buddy-profile.md
**Route**: `/features/social-buddy`
**Register**: Product Mode with social accountability
**Primary action**: Review a trusted buddy relationship and message or adjust privacy
**Tab**: Me
**Navigation**: Stack push from Direct Chat [75], Accountability [46], Community [40], Leaderboard [39], or user profile bottom sheet. Back returns to origin.

---

## Purpose

Social Buddy Profile is the trusted-person detail screen for Balencia's social layer. It shows who the buddy is, what missions are shared, what network controls are available, and how privacy is managed. The screen supports messaging and accountability without becoming a public social profile.

---

## Information Architecture

**Hierarchy**:
1. Buddy hero profile card
2. Shared missions list
3. Network controls card
4. Privacy and Message bottom actions

**User flow**:
- **Arrives from**: Direct Chat [75], Accountability [46], Community [40], Leaderboard [39], Competitions [47].
- **Primary exit**: Message -> Direct Chat [75].
- **Secondary exits**: Privacy controls, shared mission detail, invite buddy, report/block [64].

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed dual bottom actions, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <        Buddy profile      |
+-----------------------------+
|        [AK avatar]          |
|        Aisha Khan           |
| Running partner, buddy...   |
| [Trusted] [SIA-assisted]    |
|                             |
| SHARED MISSIONS             |
| Run a half marathon     68% |
| [Fitness] [progress bar]    |
| Read 2 books this month 35% |
| [Learning][progress bar]    |
|                             |
| Network controls            |
| Follow requests, buddy      |
| permissions, and report...  |
| [Invite buddy]              |
+-----------------------------+
| Privacy       Message       |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Buddy Hero
- **Purpose**: Identify the trusted person and relationship context.
- **Visual treatment**: centered rounded-xl card, relationships-pink/25 border, pink tint over ink-brown.
- **Content**:
  - Large avatar.
  - Name.
  - Relationship summary.
  - Signal pills: Trusted, SIA-assisted.
- **Behavior**: Avatar tap opens larger profile photo if available.

### Shared Mission Card
- **Purpose**: Show the user's shared commitments with the buddy.
- **Visual treatment**: rounded-lg ink-brown card, 16pt padding, progress bar.
- **Content**:
  - Mission name.
  - Domain tag.
  - Progress percentage.
  - Progress bar.
- **Gesture**: Tap -> Mission Detail [14] filtered to shared accountability context.

### Network Controls Card
- **Purpose**: Keep relationship controls discoverable.
- **Visual treatment**: rounded-lg white/4 card, users icon, compact body copy.
- **Actions**: Invite buddy, permissions, report/block.
- **Behavior**: Invite buddy opens contact/invite sheet.

### Bottom Actions
- **Privacy**: Ghost button with shield icon, opens visibility/permissions controls.
- **Message**: Orange primary button with MessageCircle icon, routes to Direct Chat [75].

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Card surfaces | #211008 | ink-brown-800 | Content cards |
| Primary action | #FF5E00 | brand-orange | Message |
| Relationship accent | #EC4899 | relationships-pink | Profile/progress domain |
| SIA assisted | #7F24FF | royal-purple | SIA signal pill |
| Trusted state | #34A853 | forest-green | Trusted pill |
| Text primary | #FFFFFF | white | Names/titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |

**60/30/10 verification**: Orange remains action. Pink identifies social/relationships. Purple indicates SIA assistance. Green indicates trusted state.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Shared mission | Pressed | scale(0.98), border relationships-pink/30 |
| Privacy | Pressed | ghost bg white/8 |
| Message | Pressed | scale(0.96) |
| Invite buddy | Pressed | border brand-orange/25 |
| Report/block | Destructive | error-red text inside controls sheet |
| Removed buddy | Disabled | Hero opacity 70%, message action hidden |

---

## Motion

- Hero enters with fade-up.
- Shared mission cards stagger by 70ms.
- Progress bars animate from 0 to current value over 520ms.
- Privacy sheet uses standard bottom sheet motion.

---

## Empty, Loading, Error

- **No shared missions**: Show empty card "No shared missions yet" with "Invite to mission".
- **Buddy request pending**: Hero shows pending pill; message disabled until accepted if privacy requires it.
- **Privacy load failed**: Privacy sheet shows retry.
- **Message unavailable**: Toast "You can message after this buddy accepts".
- **Loading**: Avatar skeleton, hero skeleton, mission skeletons.

---

## Accessibility

- Hero announces name, relationship summary, trusted state, and SIA-assisted state.
- Progress bars include mission name and percentage.
- Privacy button label: "Manage buddy privacy".
- Message button label: "Message Aisha Khan".
- Network controls are grouped with clear button labels.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/social-buddy/page.tsx`.
- Buddy profile is not a public profile; default visibility is trust/permission based.
- Message action should route to Direct Chat [75].
- Report/block actions use Report / Block [64].
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** Geneva + Discord-done-warm + Strava clubs — *stays Balencia via private-first warmth, non-toxic framing, the warm-glow surface, and safety-first controls, not a generic social feed.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers (the gap to A++): the spec's IA is solid and trust-centric, but (1) the hero card and network-controls card are flat `ink-brown-800` surfaces with no top-edge highlight or layered depth; (2) the focal hierarchy treats the buddy avatar and the mission cards as equal weight (no clear one focal point); (3) microcopy (all visible strings) lacks authoring warmth — "Trusted" and "SIA-assisted" pills are labels, not confidence statements; (4) the three empty/loading/error states are not designed — they defer to a generic table; (5) the shared-mission card lacks visual rhythm (list of equal-height cards, card-grid monotony); (6) progress bars have no inset track / glow / contrast specifications; (7) accessibility: the avatar tap (open photo) and the mission taps are not marked as actionable affordances; (8) "removed buddy" state is hidden (message action hidden) but no warm message tells the user why or how to re-invite.

### Focal hierarchy

One focal point: the **Buddy Hero Card** — the identity anchor, the screen's single most important thing, placed above the fold at ~140pt (avatar 64pt + name + relationship summary + trust pills). The squint test lands here first: avatar + name + "trusted" indicator. Everything below is visibly secondary by size and weight: the Shared Missions cards are a uniform 80pt list (no focal sizing within the list — they sit equally as a "what we share" context, not a focal set), the Network Controls card is a compact row, and the bottom actions (Privacy + Message) are calls-to-action, not content. The hero's visual weight is carried by the warm-glow surface + layered depth + the absence of glow on mission cards below, creating a clear focal read.

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--glass-border` (white/6) · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent) · `--shadow-1`. The Buddy Hero Card (≥96px) adds `CK-T02 --surface-backplate` (the faint warm backplate behind the hero, a calmer sibling of the full glow — strengthens the separation from the field). Progress bars on the mission cards use a 6px height with `--radius-pill` caps, `--color-alpha-white-08` track over a `--track-inset` (rgba(0,0,0,0.28)) beveled recess — fixes the prior underspecified "progress bar" that likely read as flat. The hero avatar receives a 2pt white-20% border (per `_shared-patterns.md`), lending subtle elevation. The trust/SIA-assisted pills sit within the hero card: pill shape, `--radius-pill`, 24pt height, `--color-forest-green` background (Trusted) and `--color-royal-purple` background (SIA-assisted), white 100% text (12pt Sora Semibold) — no glow on these small inline elements. The Network Controls card is the same layered surface, 16pt padding, no glow. At rest, the buddy card carries no glow per the size-stepped scale (a hero card at 140pt sits below the 160pt+ threshold where `--glow-orange` applies per CONSISTENCY.md §1); instead, the `--surface-backplate` provides the premium depth language. The shared-mission cards are secondary (80pt each, 12pt gaps), so **no glow** (they are not focal heroes, and glow would cause monotonous repetition across multiple cards). Extends the depth language app-wide so nothing reads as flat.

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: buddy name `--text-h2` (20pt) / 600 weight / `--leading-snug` (1.25) / white 100%; relationship summary `--text-body` (16pt) / 400 / `--leading-normal` (1.4) / white 70%; trust/SIA pills `--text-caption` (13pt) / 600 / white 100%; Shared Missions section eyebrow ("SHARED MISSIONS") the `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / white 40%); mission name `--text-h3` (17pt) / 600 / `--leading-snug` / white 100%; mission domain + progress percentage `--text-caption` (13pt) / 400 / `--leading-normal` / white 50%; Network Controls card body `--text-body` (16pt) / 400 / white 70%; bottom action buttons: Message (primary CTA) `--text-h3` (17pt) / 600 / white 100% on `--color-brand-orange` pill; Privacy (ghost button) `--text-h3` (17pt) / 600 / white 100%. Hierarchy is carried by **weight** (600–700 vs 400) and size, not colour alone. Sentence case throughout (no Title Case on pills or labels). ≤2 `--color-brand-orange` accent words on screen (the Message CTA text and an optional "message" accent word in copy — not counting the orange bottle icon). Chillax stays logo-only (none on this screen). Replaces the unspecified font sizes with the `CK-T04` leading scale (`--leading-tight / snug / normal / relaxed`).

### Microcopy (before → after)

Every user-facing string is authored to `CK-P5` voice — warm, plain, coaching, never shaming. Screen-specific rewrites:

- **Buddy hero, relationship summary** — *before:* "Running partner, buddy..." (vague, trailing ellipsis) → *after:* "Running partner. We're training for the half together." (specific, grounded, warm)
- **Trust pill** — *before:* "Trusted" (label) → *after:* "Trusted partner" (affirms the relationship warmly)
- **SIA-assisted pill** — *before:* "SIA-assisted" (label) → *after:* "SIA checked in" (warmer framing, shows SIA was involved in vetting, not just an automated label)
- **Shared Missions section eyebrow** — *before:* "SHARED MISSIONS" (given) → *after (kept):* same; correct
- **Mission card, progress percentage** — *before:* "Run a half marathon 68%" (bare) → *after:* "Run a half marathon · 68% · on track" (frames the progress constructively, never as a deficit)
- **Mission card, low progress** — *before:* "Read 2 books this month 35%" (reads as falling short) → *after:* "Read 2 books this month · 35% · building momentum" (non-shaming, coaching framing)
- **Invite buddy action** — *before:* "Invite buddy" (command tone) → *after:* "Invite to mission" (clear, warm, specific to the mission context)
- **Network controls card** — *before:* "Follow requests, buddy permissions, and report..." (list, no guidance) → *after:* "Manage how you share, permissions, and safety" (warm, groups the controls by intent)
- **Report / block actions** — *before:* no context → *after:* "If you feel unsafe, we're here to help. Block [name] or report to our team." (non-shaming, safety-first framing, clear actions)
- **Privacy bottom action** — *before:* "Privacy" (noun, what does it do?) → *after:* "Adjust visibility" (action word, clear affordance)
- **Message bottom action** — *before:* "Message" (given) → *after (kept):* same; correct, orange CTA
- **Empty state, no shared missions** — *before:* "No shared missions yet" (degenerate) → *after:* "No shared missions yet. Invite [name] to a mission to train together." (warm, constructive next step)
- **Loading state** — *before:* no message → *after:* "Loading your connection..." (warm, specific)
- **Buddy request pending** — *before:* pending pill shown, message disabled, no explanation → *after:* "Your invitation is pending. You'll be able to message once [name] accepts." (honest, warm, explains the disabled state)
- **Removed buddy** — *before:* Hero opacity 70%, message action hidden, no message → *after:* a warm banner "You're no longer connected as buddies. Invite them again to reconnect." + message action remains clickable with a toast "You can message after they accept" (never silently disables — gives the user agency)

No exclamation marks; the brand period used with intent; SIA strings (if present on the hero) are specific to the buddy relationship (such as "SIA spotted you both improved your sleep on run days"), never generic.

### Motion choreography

Locked to `CK-P4` order (draw-first): **buddy hero fades in** (`--dur-base` 280ms `--ease-out-soft`) → the trust/SIA-assisted pills settle (fade-in, same timing as hero) → **shared-mission cards rise** staggered (`.animate-fade-up`, 280ms each, 40–80ms stagger, 40ms between cards) → the **mission progress bars fill** (0→value, `--dur-slow` 520ms `--ease-flow`, starting after the cards appear — a secondary visual moment). The Network Controls card appears with the mission section (part of the staggered sequence, or slightly delayed). The bottom actions (Privacy / Message) settle last (280ms fade). `prefers-reduced-motion` → all elements at final state instantly; progress bars appear at final fill width, no animation. Below-fold surfaces (if the page scrolls beyond the first card stack) animate on scroll-into-view.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (new buddy connection, no missions) | Hero card fully rendered, trust/SIA pills visible. Shared Missions section shows empty card. Network Controls card visible. Bottom actions enabled. | Hero: "Running partner. We're building a connection." (warm preamble). Shared Missions: "No shared missions yet. Invite [name] to a mission to train together." (constructive next step). | hero card keeps depth + `--surface-backplate`; empty card is a warm banner, not a skeleton |
| Loading | Hero: avatar skeleton (circle shimmer), name skeleton (2-line shimmer). Shared Missions: 2–3 card skeletons (preserve layout, shimmer). Network Controls: text skeleton. Bottom actions: skeleton pills (Message and Privacy). | "Loading your connection — one moment." (warm, specific). | skeletons on `--color-ink-brown-800`, shimmer animation, morphs into data (never a swap) |
| Buddy request pending (buddy exists but hasn't accepted yet) | Hero card rendered, but a "pending" pill overlays the trust pill. Message button is present but disabled (50% opacity). | Hero: "Running partner · pending invitation" (clear status). Below trust pills: "Your invitation is pending. You'll be able to message once [name] accepts." (honest, explains disabled state). | pending pill uses `--color-alpha-white-40` (muted, not alarming); message button honestly dimmed, not hidden |
| Removed buddy | Hero card rendered at full opacity. A warm banner above the hero: "You're no longer connected as buddies. Invite them again to reconnect." (with a "Reconnect" link). | "You're no longer connected. Send an invite to reconnect." (honest, warm, gives agency). Message button remains clickable but shows a toast on tap: "You can message after they accept." (helpful, not cold). | no opacity reduction; banner is a `CK-P1` surface with a green "Reconnect" accent link |
| Partial data (buddy exists, missions sync fails, network controls timeout) | Hero card fully rendered. Shared Missions: cards that loaded render normally, failed cards show skeleton. Network Controls: cached data shown if available, otherwise skeleton. | Per-zone: "Couldn't load missions — pull to refresh" (specific, recovery named). "Network info is loading." (for controls). | cached data retained; skeletons only where data is missing — no-data ≠ zero |
| Error | Hero card retained. Shared Missions section shows a retry banner with the failure reason: "Couldn't fetch shared missions — [tap to retry]". Network Controls similarly banners a failure. Bottom actions remain functional. | "Couldn't load shared missions. Pull to refresh or try again." (specific, two recovery paths). | calibrated `--color-error-red` border on the failed zone only (glyph + word paired: a small alert icon + text, never colour-alone) |
| Offline | Hero card shows cached data. Shared Missions: cached missions rendered. Network Controls: cached or empty. Bottom actions: Privacy functional, Message disabled with a reason. | "You're offline. Showing your last sync." (honest, specific). Message button tooltip on hover/long-press: "You need a connection to message." (gentle, not cold). | actions honestly dimmed (50% opacity, no haptic) where offline; cached data retained |

### Signature & anti-generic

Ownable moments: the **warm-glow surface + trust/SIA-assisted affirmation pills** (making the buddy relationship *legible as a trusted connection*, not just a name + avatar — the honest alternative to a generic social profile), and the **mission card rhythm** (varied visual weight breaking the equal-card monotony via size + section eyebrow + mission-specific framing like "on track" and "building momentum", per `CK-P6`). Anti-generic fixes: (1) the relationship summary is authored warm and specific, never templated generic copy; (2) the trust and SIA pills carry *meaning* (green for verified trust, purple for SIA vetting), not just labels; (3) the shared-mission cards are led by a clear eyebrow section header and mission names are paired with non-shaming progress copy ("on track" / "building momentum"), so the screen reads as a coached partnership, not a generic social grid; (4) the bottom actions (Privacy + Message) are visually distinct and clear — no hidden or vague affordances. The screen never feels like a clone of a default social app profile. One ownable Balencia moment: the **trust/SIA affirmation pills** (the warm, non-toxic framing that this is a *vetted, supported* connection, not just "following" or "friends").

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):

| Element | Color | Contrast |
| --- | --- | --- |
| Buddy name | `--color-alpha-white-100` | ≥12:1 |
| Relationship summary | `--color-alpha-white-70` | ≥7:1 |
| Trust pill text (white on green) | `--color-alpha-white-100` | ≥4.5:1 (WCAG 1.4.11) |
| SIA-assisted pill text (white on purple) | `--color-alpha-white-100` | ≥4.5:1 (WCAG 1.4.11) |
| Mission name | `--color-alpha-white-100` | ≥12:1 |
| Progress percentage + framing | `--color-alpha-white-50` | ≥4.5:1 |
| Section eyebrow ("SHARED MISSIONS") | `--color-alpha-white-40` | decorative label (paired with position) |
| Network Controls body | `--color-alpha-white-70` | ≥7:1 |
| Message button (orange on transparent bg, then orange pill) | `--color-brand-orange` | ≥3:1 (WCAG 1.4.11) |
| Privacy button (white on transparent) | `--color-alpha-white-100` | ≥4.5:1 |

Status never colour-alone: trust = **green pill + "Trusted partner" text**; SIA vetting = **purple pill + "SIA checked in" text**; progress bars carry a **visible percentage number + framing word** ("on track" / "building momentum"), never a bar alone. Focus-visible is standardized to the single **`--focus-ring`** token (`CK-T03`, 2px orange, 2px offset) across every interactive element (avatar, mission cards, network-control actions, Privacy button, Message button). Touch targets ≥44×44pt: the avatar is 64pt (met); mission cards are ≥80pt tall (met); the buttons are 44pt+ (met). Reduced-motion: all elements appear at final state instantly; progress bars appear at final fill width (no fill animation); staggered card entrances collapse to instant display. The avatar tap (open photo) and mission taps (navigate to mission detail) are announced as "Tap to [action]" affordances in screen reader labels.

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/social-buddy`
**Status**: Accepted into the implementation contract for the spec-first remediation pass.

### Resolved Product Decisions

- Q02 system overlays may be QA fixtures but production needs native trigger/dismiss/API states.
- Q05 music/video use honest demo recommendations without implying live provider sync.
- Q18 progress-photo sharing is disabled in V1.
- Q22 accountability partners see only opted-in contract/proof/check-in data; SIA reads with consent.
- Q42 reports remain in-app with screenshot-level sharing only.
- Q48 app rating uses non-coercive prompt fixtures.

### Conflict Resolution

- If earlier sections conflict with the resolved decisions or finding recommendations below, this audit integration section is the current source of truth for implementation.

### Findings To Carry Into Implementation

| Finding | Severity | Category | Contract update |
| --- | --- | --- | --- |
| B18-F13 | critical | navigation | Wire Message to Direct Chat, Privacy to permissions, Invite buddy to contact/invite, shared missions to mission detail, and avatar to preview. |
| B18-F14 | major | trust-privacy | Add buddy visibility controls, SIA-assist opt-in/explanation, report/block entry, and explicit shared-data categories. |
| B18-F15 | major | accessibility | Increase Invite buddy to 44px high, make mission cards semantic links/buttons, and expose progress values with accessible labels. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Replace inert controls with visible route, state, modal, input, or feedback behavior before launch-readiness QA.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

