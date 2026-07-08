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
- **Premium Visual Director:** make Life Balance the only dominant focal moment; the screen should open like an instrument, not a list.
- **Interaction and State Designer:** all action completion gestures need tap alternatives, queued/offline states, skeletons that preserve radar geometry, and reduced-motion still frames.
- **Trust and Safety Reviewer:** Today exposes health, mood, calendar, CIA inference, and quick-log data, so consent/revoke/delete links must be reachable from source chips and safety must be reachable from mood/check-in paths.
- **GLM directions considered:** canon-faithful dashboard, cinematic constellation hero, dense operational Today queue. **Chosen:** cinematic constellation hero plus operational action rail.

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
| [Finance]   [Career]  [Learning]     |
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
| Today        CIA       Goals    Me   |
+--------------------------------------+
```

Dark cinematic variant: the legacy `LifeBalanceCard` constellation remains a premium analytical expansion reachable from the feature carousel or `/life-areas`; it shows 9 domains, not 12 areas.

## Focal Hierarchy
- **Dominant focal moment:** Figma-backed warm-light dashboard shell: greeting, CIA coach card, three metric cards, feature carousel, Today's Actions, and pinned missions.
- **Secondary:** optional `LifeBalanceCard` constellation as a dark cinematic variant, not the default first viewport for this revision pass.
- **Operational layer:** MetricCards, feature cards, Today's Actions, pinned missions, schedule preview.
- **Quick action row:** Breathe, Water, Journal, Check-in restored from the legacy Home source.
- **Persistent action:** `FABQuickLog` with water, meal, mood.

## Visual System
- Figma parity mode is the default for this pass: warm-light paper shell, blush peach corner atmosphere, white cards with subtle 1px borders, gentle iOS shadows, and orange action states.
- Warm dark base `#0A0A0F`, top radial orange atmosphere, and 3-4 percent grain remain the premium cinematic variant for the constellation expansion.
- Hero `GlassCard.hero`, radius 40, semantic `--glow-you` because it reflects the member's current effort.
- CIA preamble and insight use `--glow-cia` only when expanded into evidence.
- Completed action rows use `--glow-done`; pinned mission progress remains orange until arrival.
- Neue Montreal throughout. Tiempos italic word: "*worth*".

## Figma Reference Alignment
- **Direct Figma alias:** `Home`.
- **Evidence tier / canon exception:** Tier B/C only. No live Figma MCP metadata or live MCP screenshot was available for this review/fix session; alignment comes from supplied mock/reference screens plus local prompt/ledger evidence. The warm-light Figma-derived shell is a scoped implementation-parity exception, not a replacement for glass-dark v1 canon. CIA naming, data honesty, and glass-redesign rules remain binding.
- **Shell/anatomy:** the Figma home frame is a warm-light native dashboard: top row with hamburger, search, notification; greeting `Good Morning, Amira`; small orange `Level 14`; CIA coach card with mood chips; three compact metric cards with sparklines (`Heart Rate`, `Step`, `Sleep`); feature carousel; Today's Actions rows; and Pinned Missions below.
- **Feature grid link:** `Our Feature` cards should reuse the Figma compact icon-card style: pastel icon square, label, horizontal carousel, active page indicator, and `View All` orange link. This links to the fuller `Features`/Life Areas grid rather than acting as marketing.
- **Visual mode note:** keep the current dark constellation version as premium/cinematic variant, but mark the Figma-backed default as the warm-light dashboard shell for implementation parity.

## Components
- `TopBar`, `CIAInsightCard`, `GlassCard.hero`, `GlassStatCard`, `MomentumBar`, `ChargeMeter`, `ProgressRing`, `ChipDomainTag`, `ChipProvenance`, `FABQuickLog`, `GlassNavBar`, `SafetyResourceCard`, `SyncStatus`, `SkeletonState`, `HonestNullState`.
- `NEW: ConstellationRadarHero` - formalizes the source-specific Life Balance instrument from the legacy visualization recommendations.

## Data Honesty
- Life balance: real score plus domain source count; low confidence ghosted spokes; honest-null copy "Building your balance - 3 more days."
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
- Preserve bottom nav labels: Today, CIA, Goals, Me.
