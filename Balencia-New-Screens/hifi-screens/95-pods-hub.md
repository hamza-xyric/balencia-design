# 95 Groups hub — A+++ hi-fi mobile spec

## Header

- **Source ID:** 95
- **Route:** `/groups`
- **Frame:** 390x844 native mobile
- **Taxonomy:** Squads, Communities, Missions, CIA
- **Priority:** converted with one privacy-safe member-preview asset slot

## Product intent

Groups hub lets members review temporary **Squads** and persistent **Communities**, respond to invitations, join or leave local membership previews, and inspect optional discovery consent. Membership counts and labels must update from the same state model; an invitation is never shown as an active membership.

## Final composition

```text
+--------------------------------------+
| <  Groups               search  add |
| +----------------------------------+ |
| | Membership overview             | |
| | 1 Community · 0 Squads          | |
| | No pending invites              | |
| | [Manage optional discovery]     | |
| +----------------------------------+ |
| [Squads] [Communities]              |
|                                      |
| +----------------------------------+ |
| | Morning runners Community       | |
| | persistent · 8 members · Member | |
| | Community Mission · 68%         | |
| | [Leave preview] [Safety]        | |
| +----------------------------------+ |
| +----------------------------------+ |
| | CIA Community suggestion        | |
| | topic-only or separately        | |
| | consented route evidence        | |
| | [Preview privacy] [Review join] | |
| +----------------------------------+ |
+--------------------------------------+
```

## Focal hierarchy

- **Primary:** membership overview with exact Community, Squad, and invitation counts.
- **Secondary:** the selected membership or invitation card with a single unambiguous lifecycle label.
- **CIA layer:** optional Community matching from topic-only evidence or separately consented approximate route identifiers.
- **Safety layer:** leave, report, mute, block-host, own-content delete preview, and group data controls remain close to membership content.

## Components and visual system

- `TopBar`, two-tab selector, `GlassCard` overview, solid membership cards, `CIAInsightCard`, `Chip`, `Provenance`, `ConsentRail`, `E1Modal`, skeleton, offline, and honest-null states.
- Warm dark base `#0A0A0F`; solid list surfaces `#211008`.
- Orange marks member actions, green marks active membership, and purple is reserved for CIA.
- Modal sheets are opaque `ink-900` surfaces with a visible border and shadow; background content never bleeds through.
- Tabs, invitation actions, membership actions, moderation rows, and settings controls maintain 44px minimum targets.

## Membership and invitation lifecycle

- `pending` — Evening stretch Squad shows **Pending invite**, `membership not active`, and Accept/Decline actions. It contributes one pending invitation and zero active Squads.
- `accepted` — Accept removes the invitation, adds one temporary Squad, updates the participant count, and shows **Member**.
- `declined` — Decline removes both the invitation and any membership representation. The Squad panel renders an honest-null result.
- Pending and Member labels are mutually exclusive for the same Squad.
- `join-success` adds an exact second persistent membership card: **Weekend walkers Community · 18 members · joined locally**. The overview becomes exactly **2 Communities**.
- Leaving either Community removes that exact card and immediately decrements the Community count. The confirmation names the selected Community.

## Discovery consent and CIA honesty

- Community matching has a dedicated `discoveryEnabled` state, separate from optional route-history consent.
- `discovery-disabled` means matching is off: CIA shows no suggestion and uses no topic, route, location, or health field.
- The top discovery control remains enabled so consent choices are reviewable. There is no alternate join/privacy control that bypasses the disabled state.
- Consent review offers three explicit outcomes: matching off, topic-only matching, or a separately consented 30-day approximate-route preview visible only to the member.
- Topic-only suggestions state that no route or location history was used.
- Low-confidence/cached evidence is labeled and never presented as a fresh match.
- Joining is a local preview and shares no route or health history.

## Data honesty and safety

- Membership totals are derived from the visible active cards, not static copy.
- Invitation totals are derived from invitation state, not membership state.
- Honest-null membership shows no inferred member, invitation, or overlap count.
- Offline membership stays visibly cached and join is disabled with a reason.
- Leaving suppresses locally shared membership fields immediately; no remote membership change is claimed.
- Reporting promises only a local review queue. Mute, block-host, and own-content deletion remain labeled previews.
- Member media uses code-native initials or an explicit honest-null state; it never fabricates a photo.

## Required states

- `communities-default`, `squads`, `suggested-consent-off`, `suggested-consented`, `low-confidence-cached`
- `honest-null`, `skeleton`, `empty`, `error-cached`, `offline`
- `join-preview`, `join-success`, `invite-pending`, `invite-accepted`, `leave-confirm`
- `report-sheet`, `moderation-success`, `discovery-disabled`, `data-controls`, `asset-honest-null`

Each state must be deterministic from `/screens/95?state=<fixture>` and preserve focus containment, Escape close, focus restoration, reduced-motion behavior, and explicit disabled reasons.

## Acceptance criteria

1. Only **Squads**, **Communities**, **Missions**, and **CIA** appear in current product language.
2. A pending Squad invitation is not labeled Member; Accept and Decline update card, count, and invitation state together.
3. Join success renders both Morning runners and Weekend walkers, with an exact `2 Communities` overview.
4. Leave confirmation is selection-aware and removes the selected Community plus its count.
5. Discovery-disabled hides matching output while leaving one coherent, reviewable consent path.
6. Modal surfaces are opaque and all state changes are visible in the underlying screen immediately after close.
7. No API, external membership, route upload, or remote moderation outcome is implied.

## Image slot

- `HIFI-95-01` — privacy-safe member preview. Use code-native initials or honest-null copy; no external portrait or brand logo is required.
