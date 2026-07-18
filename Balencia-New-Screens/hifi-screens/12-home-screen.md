# 12 Home screen - A+++ hi-fi mobile spec

## Header
- **Source ID:** 12
- **Source spec:** `Balencia-New-Screens/screens/12-home-screen.md`
- **Evidence:** `app_design 3/12-home-screen.md`, `app_design 3/12-home-screen-visualization-recommendations.md`, `ascii_wireframes/12-home-screen.md`, `work/briefs/12.md`
- **Route(s):** `/dashboard`, `/activity-status`
- **Frame:** 390x844 native mobile
- **Priority:** convert-now

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the demoted CIA preamble, Constellation Radar hero, MetricCard row, continuous Today's Actions MomentumBar, pinned mission GaugeRings, quick-log FAB, and `/activity-status` merge.
- **Premium Visual Director:** make Life Power the only dominant focal moment; the screen should open like an instrument, not a list.
- **Interaction and State Designer:** all action completion gestures need tap alternatives, queued/offline states, skeletons that preserve radar geometry, and reduced-motion still frames.
- **Trust and Safety Reviewer:** Today exposes health, mood, calendar, CIA inference, and quick-log data, so consent/revoke/delete links must be reachable from source chips and safety must be reachable from mood/check-in paths.
- **GLM directions considered:** canon-faithful dashboard, cinematic constellation hero, dense operational Today queue. **Chosen:** cinematic constellation hero plus operational action rail.

## Current authority reconciliation — 2026-07-10

- DVF-01 makes the warm-dark 390×844 shell the default. The warm-light/Figma-parity passages below are retained only as historical input and do not authorize a light default in the current prototype.
- DVF-06 fixes the starting registry at exactly ten active domains: Fitness, Sleep, Career, Nutrition, Finance, Faith, Productivity, Relationships, Wellbeing and Meditation.
- The default Today hero includes the ten-axis Life Power instrument. One payload drives all axis values, the polygon, visible Life Power, active-domain count, provenance and accessible summary.
- User-facing **Life Power** is computed as `sum(active domain stats) × (1 + 0.15 × (1 − coefficient_of_variation(active stats)))`. The shared visualization must not hardcode `487`.
- Bottom navigation uses **Missions**, not the retired Goals label. Visible coach naming remains all-caps **CIA**.

## Final Composition

```text
--------------------------------------+
| menu        Good Morning, Amira   o |
|             Level 14                 |
|                                      |
| +----------------------------------+ |
| | CIA coach card                   | |
| | What needs your *attention*      | |
| | today?                           | |
| | [steady] [low] [wired]           | |
| +----------------------------------+ |
|                                      |
| +----------+ +----------+ +--------+ |
| | Heart    | | Step     | | Sleep  | |
| | 72 bpm   | | 8.2k     | | 7.5h   | |
| | via WHOOP| | you log  | | Health | |
| +----------+ +----------+ +--------+ |
|                                      |
| Our Feature                 View All |
| [Nutrition] [Fitness] [Wellbeing]    |
| [Finance]   [Career]  [Sleep]        |
|                                      |
| Today's Actions                      |
| [ ] Meditate 10 min      wellbeing   |
| [ ] Morning run          fitness     |
| [ ] Review budget        finance     |
|                                      |
| Pinned Missions                      |
| (68%) Run a half marathon            |
| (42%) Save $5,000 by December        |
|                                      |
|                            (+)       |
| Today        CIA    Missions    Me   |
+--------------------------------------+
```

The default dark Life Power instrument shows exactly ten domains, never nine or twelve. `/life-areas` remains the expanded analytical route.

## Focal Hierarchy
- **Dominant focal moment:** warm-dark greeting, CIA coach prompt and the ten-axis Life Power instrument.
- **Secondary:** provenance metrics, quick actions, Today's Actions and pinned missions.
- **Operational layer:** MetricCards, feature cards, Today's Actions, pinned missions, schedule preview.
- **Quick action row:** Breathe, Water, Journal, Check-in restored from the legacy Home source.
- **Persistent action:** `FABQuickLog` with water, meal, mood.

## Visual System
- Warm dark base `#0A0A0F`, top radial orange atmosphere, and 3-4 percent grain are the current default.
- Warm-light paper shell, blush-peach atmosphere and white-card passages are historical Figma evidence only under DVF-01.
- Hero `GlassCard.hero`, radius 40, semantic `--glow-you` because it reflects the member's current effort.
- CIA preamble and insight use `--glow-cia` only when expanded into evidence.
- Completed action rows use `--glow-done`; pinned mission progress remains orange until arrival.
- Neue Montreal throughout. Tiempos italic word: "*worth*".

## Figma Reference Alignment
- **Direct Figma alias:** `Home`.
- **Evidence tier / current disposition:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session. The warm-light Figma-derived shell is historical comparison evidence and no longer a current implementation-parity exception under DVF-01.
- **Shell/anatomy:** the Figma home frame is a warm-light native dashboard: top row with hamburger, search, notification; greeting `Good Morning, Amira`; small orange `Level 14`; CIA coach card with mood chips; three compact metric cards with sparklines (`Heart Rate`, `Step`, `Sleep`); feature carousel; Today's Actions rows; and Pinned Missions below.
- **Feature grid link:** `Our Feature` cards should reuse the Figma compact icon-card style: pastel icon square, label, horizontal carousel, active page indicator, and `View All` orange link. This links to the fuller `Features`/Life Areas grid rather than acting as marketing.
- **Visual mode note:** keep the current warm-dark constellation system as the default; do not revive the Figma-backed light shell in this pass.

## Components
- `TopBar`, `CIAInsightCard`, `GlassCard.hero`, `GlassStatCard`, `MomentumBar`, `ChargeMeter`, `ProgressRing`, `ChipDomainTag`, `ChipProvenance`, `FABQuickLog`, `GlassNavBar`, `SafetyResourceCard`, `SyncStatus`, `SkeletonState`, `HonestNullState`.
- `NEW: ConstellationRadarHero` - formalizes the source-specific ten-domain Life Power instrument from the legacy visualization recommendations.

## Data Honesty
- Life Power: exactly ten active-domain stats plus domain source count; low-confidence ghosted spokes; honest-null copy "Building your balance — 3 more days." The same payload computes the aggregate and accessible summary.
- Vitals: value plus `via WHOOP`, `via Health`, `you logged`, or `estimated · low confidence`.
- Schedule: source chip `via calendar`; stale state says "offline - showing last sync 2h ago."
- CIA claims require at least two evidence chips; otherwise the insight is hidden or written as a single-signal note.

## Consent and Safety
- Health, calendar, mood, quick-log, and CIA recommendation chips open a concrete Data Controls sheet with category, source, scope, last sync, retention, export, revoke, and delete.
- Mood/check-in quick actions expose SafetyResourceCard and crisis resources.
- Calendar and CIA inference chips include "manage source" and "delete recommendation history."
- Header targets: notification opens `/notifications`; search opens `SearchOverlay` [68]; `View All` routes to `/life-areas`; feature cards deep-link to the matching domain surface without inventing `/features`.

## States
- **Default:** all regions shown with real or honest-null values.
- **Skeleton:** radar rings/spokes remain visible; MetricCards keep final geometry; no fake values.
- **Empty/day one:** CIA welcome, faint full radar, one starter action, "Create your first mission."
- **Error/offline:** cached Today remains; failed source named inline.
- **Success:** completing an action gives green check, MomentumBar advances, optional XPToast.
- **Disabled:** source-dependent cards dim to 40 percent with reason copy and no hidden actions.

## Motion
- Radar draws stroke-first, dots stagger, hub counts up, MetricCard sparklines draw, MomentumBar fills.
- Action completion supports swipe right and checkbox tap.
- Pull-to-refresh triggers a branded refresh state, then per-source freshness chips update or remain stale with a named failure.
- Reduced motion renders the final constellation and uses opacity-only feedback.

## Image Slots
- Optional `HIFI-12-01` atmospheric texture behind the constellation hero.

## Implementation Notes
- Keep route header exactly `/dashboard`, `/activity-status`.
- Do not add a fake `/life-balance` route; tapping the constellation variant routes to `/life-areas`.
- Preserve bottom nav labels: Today, CIA, Missions, Me.
