# 22-connected-services - A+++ hi-fi mobile spec

## Header
- **Source ID:** 22
- **Source spec:** `Balencia-New-Screens/screens/22-connected-services.md`
- **Evidence:** screens/22-connected-services.md, work/briefs/22.md, work/drafts/22.md, Functional brief (11-card architecture adopted over 12-card stack contradiction).
- **Route(s):** `/auth/whoop/callback`, `/calendar/connected`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: To act as the central, honest control panel for external data pipelines (health, productivity, lifestyle) feeding into Balencia's correlation engine.
- **Premium Visual Director:** make Connected services command surface the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Connected services uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------+ 844
|                Glow                |
|                                   | <- TopBar (Transparent)
|                                     |
| Connected services                  | <- H1 Title
|                                     |
| +---------------------------------+ |
| | o CIA Coach Note                | | <- Dynamic coaching context
| | Connecting services helps...    | |
| +---------------------------------+ |
|                                     |
| WEARABLES & FITNESS                 | <- Overline
| +---------------------------------+ |
| |  WHOOP           [ Connected ] | | <- SolidCard row (Orange glow)
| |  Syncing: sleep, HRV, recovery | |
| |    via WHOOP  2m ago    [Sync] | |
| +---------------------------------+ |
| +---------------------------------+ |
| |  Apple Health  [ Not connected ]| | <- SolidCard row (No glow)
| |  Will sync: steps, workouts    | |
| |                  [   Connect  ] | |
| +---------------------------------+ |
| +---------------------------------+ |
| |  Fitbit       [ Sync pending ] | | <- SolidCard row (Muted glow)
| |  Auto-retrying in background   | |
| +---------------------------------+ |
| ... (4 more wearables) ...          |
|                                     |
| NUTRITION                           |
| ... (3 nutrition cards) ...         |
|                                     |
| PRODUCTIVITY                        |
| ... (1 calendar card) ...           |
|                                     |
| LIFESTYLE                           |
| ... (1 spotify card) ...            |
|                                     |
|         Scroll for more           |
+-------------------------------------+
|          o        o        o      | <- GlassNavBar (Active: Me)
+-------------------------------------+ 0

Route handling: `/auth/whoop/callback`, `/calendar/connected`
```

## Focal Hierarchy
- **Dominant focal moment:** Connected services command surface; it should be visually singular, not one tile among many.
- **Secondary layer:** Atmosphere with CIA only when the source supports a synthesized read.
- **Operational layer:** TopBar, CIA Note Region, Scrollable Content Area:, - SectionHeader.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*services*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **TopBar** (Variant: transparent, scroll-aware to `.glass-pill`)
- **CIAInsightCard** (Variant: inline contextual note, uses `BtnGhost`)
- **SectionHeader** (Variant: Overline only, 24px top rhythm)
- **GlassNavBar** (Standard)
- **Sheet** (Variant: `action`, for OAuth scope preview and Disconnect confirmation)
- **NEW: IntegrationCard**
- *Rationale:* The data-density and specific state combinations (sync status, scope preview, provenance, connect/disconnect actions) for external APIs require a specialized SolidCard wrapper to maintain the honesty invariant without cluttering standard stat cards.

## Data Honesty
- Every metric ships 3 states. No fabricated numbers.
- **Metric 1: Sync Data Types**
- **Real:** "Syncing: sleep, HRV, recovery" (Provenance chip: `via WHOOP`)
- **Low-confidence:** N/A (data scopes are hardcoded by API definition, not estimated).
- **Honest-null:** "Will sync: sleep, HRV, recovery" (Clear distinction that it is *not* syncing yet).
- **Metric 2: Last Sync Time**
- **Real:** "Last sync: 2 minutes ago" (Provenance chip: `via API`)
- **Low-confidence:** "Showing last sync: 2h ago" (Muted text + `offline  cached` label)
- **Honest-null:** "Awaiting first sync" (Muted text, no timestamp fabricated).

## Consent and Safety
- Connected services uses source chips for category, source, scope, freshness, retention, export, revoke, and delete where data appears.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/auth/whoop/callback`, `/calendar/connected`. Do not add alternate vanity routes.

## States
- **Default:** Scrolling list of 11 `IntegrationCard`s, mostly in "Not connected" state for a new user.
- **Skeleton:** Shimmer blocks (`--surface-3` base, 1.2s sweep) replace the card content areas during global pull-to-refresh. Nav and headers remain stable.
- **Empty:** The unconnected state *is* the empty state, designed honestly via copy ("Will sync: [data]") rather than null UI.
- **Error:** Card border flashes `--glow-you` (error orange). Button text crossfades to "Sync failed" for 3 seconds. A `ErrorState` banner appears below the card: "Sync failed. Check your network."
- **Success:** Button morphs to a checkmark (Green `--glow-done`) for 1500ms, then card settles into "Connected" layout.
- **Disabled:** "Notify me when available" buttons render at 40% opacity (for unreleased APIs).

## Motion
- **Physical easing:** Standard 150-250ms for all UI feedback. `cubic-bezier(0.32, 0.72, 0, 1)` for sheet slides.
- **Glow behavior:** Connected cards feature a subtle 4s "breathe" (opacity 40% to 60%) to signify active data flow.
- **State transitions:** Crossfade between unconnected/connected layouts (opacity + 4px upward translate).
- **Haptics:** Light impact on successful OAuth connect; medium impact on sync failure.
- **Reduced motion (`prefers-reduced-motion: reduce`):** Breathing glows halt. Card transitions snap instantly (0ms). Sheet slides become instant opacity shifts.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/auth/whoop/callback`, `/calendar/connected`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **AA+ Contrast:** Paper-100 (#FEFAF3) on `--surface-2` (#211008) ensures strict AA+ text legibility on all sync metrics.; **44px Targets:** All buttons (`Connect`, `Force sync`) and toggle points exceed the 44px touch target minimum. Badge text is visual-only; the state is read by the screen reader.; **Screen-reader labels:** Glyph-only icons in the TopBar announce as "Close" or "Back". Status badges append to the service name for VoiceOver/TalkBack (e.g., "WHOOP, Connected, syncing sleep, HRV, recovery, last synced 2 minutes ago, double tap to manage").
