# 74-conversations-hub - A+++ hi-fi mobile spec

## Header
- **Source ID:** 74
- **Source spec:** `Balencia-New-Screens/screens/74-conversations-hub.md`
- **Evidence:** screens/74-conversations-hub.md, work/briefs/74.md, work/drafts/74.md, Functional Content Brief: Conversations Hub
- **Route(s):** `/chat-history`, `/chat`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: A single, honest home for every voice in the user's life - CIA, people, and rooms - organized so the coaching relationship stays the anchor, not one thread among many.
- **Premium Visual Director:** make Conversations hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Conversations uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+----------------------------------------------+
|     Conversations                     [mic]  |
+----------------------------------------------+
|                                                |
|  +----------------------------------------+   |
|  | PINNED COACH                            |   |
|  |                                          |   |
|  | CIA coach                               |   |
|  | Recovery, budget, and *breakfast*       |   |
|  | timing today.                           |   |
|  |                                          |   |
|  | 3 live signals  1 draft plan           |   |
|  | ready to talk                           |   |
|  +----------------------------------------+   |
|                                                |
|  +----------------------------------------+   |
|  |   Search people, rooms, CIA memory     |   |
|  +----------------------------------------+   |
|  ( All )( CIA )( People )( Groups )( Rooms )  |
|                                                |
|  PINNED ------------------------------------  |
|                                                |
|  +----------------------------------------+   |
|  | o  Partner name                   18m   |   |
|  |    Last message preview text      o    |   |
|  +----------------------------------------+   |
|  +----------------------------------------+   |
|  | oo Iron Clinic (4)                 7m   |   |
|  |    Next workout is at            o 3   |   |
|  +----------------------------------------+   |
|                                                |
|  RECENT ------------------------------------  |
|                                                |
|  +----------------------------------------+   |
|  |   Run Club          [Finance]     1h   |   |
|  |    Who's in this week?                  |   |
|  +----------------------------------------+   |
|                                                |
|                                                |
|                             +--------+        |
|                             |       |        |
|                             +--------+        |
|  +----------------------------------------+   |
|  |  o Today    CIA   o Goals   o Me       |   |
|  +----------------------------------------+   |
+----------------------------------------------+

Route handling: `/chat-history`, `/chat`
```

## Focal Hierarchy
- **Dominant focal moment:** Conversations hero; it should be visually singular, not one tile among many.
- **Secondary layer:** CIA Hero Space with CIA only when the source supports a synthesized read.
- **Operational layer:** Search Rail, Filter Rail, List Area, Bottom Floating System.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*conversations*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct Conversations Hub frame was visible in the supplied screenshots and Figma MCP returned an access error in this pass.
- **Shell/anatomy:** use compact native chat-hub language: top bar, search pill, filter rail, pinned CIA coach row, People/Groups/Rooms rows, unread orange dots, and bottom CIA-tab nav. Warm-light variants may use the Figma paper shell; dark chat variant stays available for high-contrast message surfaces.
- **Route truth:** `/chat-history` is the hub/history route; `/chat` is the group/community chat route also used by Screen 76. Treat this file's `/chat` reference as a legacy alias/entry point, not a separate route owner.

## Components
- **TopBar:** Transparent over atmosphere -> `.glass-pill` backdrop on scroll. One glyph action: Voice. *Correction:* the voice glyph is a static navigation icon (24px, rounded 2px outline per CANON 6), not a `VoiceMicGlow` instance - `VoiceMicGlow` implies live amplitude/recording state, which doesn't apply to a route trigger.
- **GlassCard (`hero`):** CIA pinned anchor. Radius 40 (hero variant), Display type permitted but deliberately unused here - see 6.
- **GlassPillInput (`search`):** Sole search entry; focus transitions to `SearchOverlay` rather than filtering in place. *Correction:* draft also had a TopBar search glyph - redundant second entry point, removed (see 1).
- **SegmentedTabs:** All  CIA  People  Groups  Rooms, single-select.
- **SectionHeader:** "Pinned" / "Recent" (Overline, trailing action none).
- **`NEW: ConversationRow`** - composed from `SolidCard` + `ListRow` conventions, purpose-built for this hub. Anatomy: leading visual (`o` single avatar for Direct / `AvatarStack` for Group / `NEW: RoomGlyphTile` for Room)  title (H3)  preview text (Body-light, paper-64%, 1 line truncate)  trailing cluster (Caption timestamp  unread indicator  optional `ChipDomainTag`). *Rationale:* neither catalog component fits - `ListRow` has no room for avatar + preview + multi-element trailing cluster, and `NotificationCard` is notification-first, not thread-first. Built from existing primitives, not styled from scratch. Flag for catalog promotion.
- **`NEW: RoomGlyphTile`** - 28px rounded tile, leading visual for Room rows. Tinted at 16% of the room's linked domain color (reuses `ChipDomainTag`'s color logic, CANON 4) when a domain link is confidently established; neutral paper-16% wash when it isn't (ties to the domain-correlation honest-null state, 8). *Rationale:* rooms are entities, not people - they need a visual language distinct from `AvatarStack` without inventing a new color system.
- **AvatarStack:** Group row leading visual, "+N" pill per catalog.
- **ChipDomainTag:** Domain correlation tag on Room rows only, shown when CIA has a real, provenanced cross-domain link (8) - never decorative.
- **Sheet (`action`):** Row long-press menu; also the `FabCompose` destination (contact picker / group creation / Community).
- **`NEW: FabCompose`** - variant of `FABQuickLog`'s 56px orange-circle mechanic, different glyph (compose/pencil) and different destination (`Sheet`, not a 3-item glass-pill tray). *Rationale:* CANON 8 scopes `FABQuickLog` explicitly to Today-tab quick-logging (water/meal/mood); this is a CIA-tab screen with a structurally different action (start a conversation, not log a metric). Reusing the button mechanic keeps the floating-action language consistent across tabs without misusing a component tied to a different tab's semantics.
- **GlassNavBar:** Today  CIA (active)  Goals  Me.

## Data Honesty
- **CIA live signal count:**
- - *Real:* "3 live signals"  `ChipProvenance`: `via CIA  synced just now`.
- - *Low-confidence:* "~2 live signals" (muted 64%)  `estimated  low confidence`.
- - *Honest-null:* "Catching up on your day" (replaces draft's ellipsis-heavy "Catching up..." with a `HonestNullState`-style designed line)  sub-label `CIA is still syncing background data`.
- **Unread message count:**
- - *Real:* solid orange dot, count shown when >1  `ChipProvenance`: `updated live`.
- - *Low-confidence:* **not applicable.** *Correction:* the draft invented a "low-confidence" tier (outlined dot, "estimated  low confidence") for unread counts. Unread state is a deterministic read/unread ledger synced from the message service - it is never AI-estimated, so forcing a confidence tier onto it is fake compliance with the honesty-triple rule, not honesty. Only real vs. honest-null apply.
- - *Honest-null:* no dot, nothing rendered - absence of a badge is itself the honest signal (no unread), never a fabricated placeholder.
- **CIA-assist sparkle (cross-domain hook):**
- - *Real:* spark glyph visible  `ChipProvenance`: `via CIA memory`.

## Consent and Safety
- Hub management sheet includes export conversation history, revoke CIA memory/thread source access, delete summaries/media, report/mute/block people or groups, leave group/room, and delete local drafts.
- Crisis support is privately reachable from the hub info/safety sheet and from flagged thread previews; it is not only report-flow dependent.
- Keep navigation targets aligned to `/chat-history`, `/chat`. Do not add alternate vanity routes.

## States
- **Default:** CIA Hero active and breathing, lists populated, search idle.
- **Skeleton:** `ConversationRow` renders as `SkeletonState` shimmer blocks (`--surface-3` base, 1.2s sweep) matching row geometry. *Correction:* draft gave the CIA Hero skeleton a "left-border accent" - canon's glow recipe is a bottom-anchored radial, not an edge border (CANON 3); fixed to: the hero skeleton keeps its bottom-anchored `glow-cia` radial at reduced opacity, still breathing, signaling "CIA is still here, just loading" rather than going fully blank.
- **Empty:** Cold-start still renders the full CIA Hero (it's a relationship, not a list item - it doesn't get to look empty). Centered, non-shaming copy sits under the "Pinned" `SectionHeader`. A section with zero rows hides entirely rather than showing an empty shell.
- **Error:** Cached messages stay visible. A `.glass-pill` banner sits under the TopBar with a plain-language warning and a retry affordance.
- **Offline:** Cached rows visible at 50% opacity. `FabCompose` dims and disables - new conversations require a connection; the offline banner states the exact stale duration (7).
- **Success:** Reading a thread clears its unread state instantly with a 120ms scale-down (0.98) tap-feedback; sending inside a thread is out of scope for this hub (handled in [75]/[76]).
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Easing:** physical ease-out throughout (never linear, CANON 6) - e.g. `cubic-bezier(0.2, 0.8, 0.2, 1)` or the platform's native spring; canon doesn't pin one literal curve, so this is a suggested default, not an overclaimed token.
- **Feedback:** row tap = 120-150ms scale to 0.98; `glow-you` rows brighten momentarily on press, matching `GlassCard`'s interactive press pattern extended to interactive `SolidCard` rows (no documented catalog default exists for `SolidCard` press state, so this reuses the one canon does define rather than inventing a new curve).
- **Glow breathe:** CIA Hero's `glow-cia` breathes on a 4s ease-in-out loop (CANON 6, hero cards only). Sparkle glyphs on assisted rows pulse gently, same cadence family, lower amplitude.
- **Haptics:** light impact on long-press (opens management `Sheet`); medium impact on a new message arriving while the hub is in view.
- **Reduced motion:** staggered entrances snap to final state; glow breathing stops and resolves to a static glow at its mid-breath intensity (never fully off - the meaning still needs to read).

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/chat-history`, `/chat`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper-100 `#FEFAF3` (not paper-50, `#FDFDFB` - draft mislabeled this; paper-100 is the primary text hex per CANON 4) on `--bg-base`/`--surface-2` clears WCAG AAA (7:1) by a wide margin - a near-white on near-black pairing. Paper-64% secondary text still clears AA (4.5:1) for Body-sized preview text; the 40% tertiary tier is reserved for Caption-scale meta (timestamps) and kept off any text a user must read to understand row content.; **Targets:** every interactive element - filter tabs, rows, TopBar glyph, `FabCompose`, domain tag - holds a 44x44px minimum target regardless of visual size.; **Screen reader / kind labeling:** since the visible design intentionally drops a Direct/Group/Room chip (1 correction #7), the kind is spoken explicitly in each row's accessible label instead - e.g. *"Partner name, direct message, 18 minutes ago, 1 unread"* / *"Iron Clinic, group chat, 4 members, 7 minutes ago, 3 unread"* / *"Run Club, room, linked to Finance, 1 hour ago."* This keeps the sighted UI uncluttered while non-visual users get equal or better information.
