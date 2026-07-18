# 01-splash-screen - A+++ hi-fi mobile spec

## Header
- **Source ID:** 01
- **Source spec:** `Balencia-New-Screens/screens/01-splash-screen.md`
- **Evidence:** screens/01-splash-screen.md, work/briefs/01.md, work/drafts/01.md, app_design 3/01-splash-screen.md  Balencia Glass Canon (COMPACT-CANON.md)  Component Catalog
- **Route(s):** No live route; system launch surface before the app router mounts.
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: Covers cold-start work (session check, asset preload) behind one deliberate gesture instead of hiding it behind a spinner: the Balencia mark draws itself into being, the wordmark settles under it, and the app is ready.
- **Premium Visual Director:** make BrandClusterReveal the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Splash screen keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; system launch surface before the app router mounts..
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+---------------------------------------------------+
|                                                     |
|                                                     |
|                                                     |
|                                                     |
|                                                   |
|                                                  |
|                                                 |
|                                                  |
|                                                   |
|                                                     |
|                                                     |
|                      Balencia.                     |
|                                                     |
|                                                     |
|                                                     |
|                                                     |
|                                                     |
|                                                     |
|                          ---                       |
+---------------------------------------------------+

Route handling: No live route; system launch surface before the app router mounts.
```

## Focal Hierarchy
- **Dominant focal moment:** BrandClusterReveal; it should be visually singular, not one tile among many.
- **Secondary layer:** Regions, top to bottom: with CIA only when the source supports a synthesized read.
- **Operational layer:** Status bar zone - transparent, blends into --bg-base., Brand cluster - the only content on the screen, System safe area - home indicator zone., ASCII wireframe :.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*screen*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **NEW: BrandClusterReveal** - bespoke, splash-only composite: Balencia mark + continuous-stroke line reveal + Chillax wordmark lockup, choreographed per Section 10. *Rationale:* the catalog is scoped to reusable UI, not logo-reveal moments; nothing else in the 104-screen scope re-triggers a full mark reveal, so this stays a one-off rather than a promoted catalog entry.
- **OfflineBanner / SyncStatus** (catalog, 6 System & compliance) - reused as-is, not reinvented. Appears only in the offline/error branch (Section 9), using the unmodified `.glass-pill` recipe; copy swapped for the two pre-auth strings in Section 7, since the catalog's default "last sync 2h ago" phrasing assumes an authenticated session this screen doesn't have yet.
- Everything else the catalog offers - GlassNavBar, TopBar, FABQuickLog, any card - is absent by design: there is no nav, no header, no data, and this screen predates all of it.

## Data Honesty
- Zero metrics, zero charts, zero user-data fields - a pure pre-auth handshake. The honesty triple (real / low-confidence / honest-null) doesn't apply because no number is ever shown, so none can be fabricated. The first metric a user sees arrives downstream - either honesty-labeled demo data in Guest mode (Screen 06) or a real, provenance-chipped stat on Home (Screen 12).
- **Timers (system-internal, never rendered):** happy-path animation contract 1.8s total  offline-detection ceiling 4s  auth-retry cadence - see correction below.
- **Auth state token:** source = local device cache, reconciled against the auth server. Used invisibly to choose the exit path; never rendered as a number or progress value.
- **Correction applied to the source draft's timing:** the draft specified a 4s network-timeout ceiling *alongside* "5 retries at a 3s interval" - up to 15s of possible retrying inside a stated 4s ceiling, which both contradicts itself and breaks the screen's own sub-2-second promise. Fixed model: **one shared 4s ceiling governs every non-happy path.** Inside it, up to 2 silent retries at 1.2s apart (~2.4s) are attempted. If auth still hasn't resolved by 4s, the screen falls back to the last known-good local state - a valid cached session proceeds optimistically to Home and reconciles auth in the background (silently signing out only if the server later rejects it); no cached session routes to Motion carousel. Nothing is ever held past 4s, and nothing is ever faked to make the wait look shorter than it is.

## Consent and Safety
- Splash screen keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to No live route; system launch surface before the app router mounts..
- Splash screen treats media as consent-gated: no identifiable face, body, home, document, provider logo, or private text appears without explicit permission.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- This is documented as a modal, overlay, utility, or source-only surface; do not invent a live route.

## States
- **Default:** warm dark atmosphere, brand cluster reveal choreographed per Section 10. This *is* the loading state - there is no separate spinner or progress indicator layered on top of it.
- **Skeleton:** not applicable - there is no data-shaped UI to scaffold; the brand mark is the only visual content, and it is never a placeholder for something else.
- **Empty:** not applicable - no list or data surface exists to be empty.
- **Error:** two branches, same base treatment - the mark holds, executing a subtle opacity pulse (80%->100%, 4s ease-in-out loop), no red, no error iconography, no alarm tone:
- - **Offline** (no network at all): OfflineBanner/SyncStatus surfaces low, just above the safe area, once the 4s ceiling is reached; copy depends on returning vs. new user (Section 7). The app proceeds on cached or fresh state per Section 8.
- - **Auth fail** (network present, token/server rejects): same pulse, silent retries per the corrected timing in Section 8, then falls back per that same model.
- **Success:** no distinct visual state - the crossfade to Screen 02 or Screen 12 begins the instant auth resolves, silently and without a transitional flourish of its own.
- **Disabled:** not applicable - nothing on this screen is ever interactive, so nothing can be disabled.

## Motion
- **Interaction:** none. Fully passive; zero input is accepted or expected.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` throughout - physical ease-out, never linear (CANON 6).
- **Timeline (happy path, 1.8s total):**
- - **0.0s** - mark fades in; warm glow and the subordinate purple pool fade in alongside it (atmosphere never lags content).
- - **0.15s-1.05s** - the stroke line draws itself around the mark via `stroke-dashoffset` - never an opacity fade; the line has to earn its shape.
- - **1.05s-1.5s** - wordmark fades in and translates +8px -> 0, the Chillax lockup settling in under the completed mark.
- - **1.5s-1.8s** - full hold, fully settled.
- - **1.8s** - if auth has resolved, the exit crossfade begins immediately; if not, the screen continues holding (pulse begins) up to the 4s ceiling from Section 8.

## Image Slots
- `HIFI-01-01` - above-fold brand motion area; screen-specific; premium warm-dark product placeholder. Prompt: Splash screen brand-motion frames, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: No live route; system launch surface before the app router mounts..
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast pairs:** wordmark paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` - effectively maximal contrast, far past AA+. The warm glow and purple pool sit behind the brand cluster, never behind readable text, so they never introduce a contrast risk.; **Targets:** not applicable - no interactive elements exist to fail the 44px minimum.; **Screen-reader labels:** on mount, announces `Balencia. Loading.` once, then stays silent - the stroke-draw and wordmark-rise are decorative motion beats, not information, so they are not re-announced. If auth retries, VoiceOver/TalkBack additionally speaks `Checking your session will retry` once per retry attempt (not per animation frame). Reduced-motion users receive identical announcements; only the visual draw is skipped, per Section 10.
