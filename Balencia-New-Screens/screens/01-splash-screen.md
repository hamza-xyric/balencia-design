### 1. Header
- **ID:** 01-splash-screen
- **Name:** Splash screen
- **Route(s) covered:** No live route; system launch surface before the app router mounts.
- **Tab:** None (pre-nav — no chrome exists yet)
- **Source:** `app_design 3/01-splash-screen.md` · Balencia Glass Canon (`COMPACT-CANON.md`) · Component Catalog
- **Batch:** 1 (pilot)

### 2. Purpose
Covers cold-start work (session check, asset preload) behind one deliberate gesture instead of hiding it behind a spinner: the Balencia mark draws itself into being, the wordmark settles under it, and the app is ready. It is the only screen in the build with zero data, zero navigation, and zero input — its entire job is to make a sub-2-second wait feel considered rather than concealed, and to plant CIA's presence atmospherically before she's ever spoken.

### 3. Entry & exit
- **Entry path:** system app launch — cold-start or warm-start. Nothing precedes it.
- **Primary exit:** crossfade to Motion carousel (Screen 02) — first-time user, or no valid saved session.
- **Secondary exit:** crossfade to Home (Screen 12) — returning user, valid session resolved.
- **Trouble exit:** offline or auth-fail branches resolve inside one shared 4s ceiling, then fall back to the safest known state — never a longer hold. Full logic in Section 8.

### 4. Layout anatomy
Structurally minimalist by design: one focal cluster over the mandatory atmosphere, nothing competing with it.

**Regions, top to bottom:**
1. **Status bar zone** — transparent, blends into `--bg-base`.
2. **Upper spacer** — flexible, pushes the brand cluster to optical center (~40% from top, per the brief's IA).
3. **Brand cluster** — the only content on the screen: warm glow, subordinate CIA pool, Balencia mark, continuous-stroke reveal, Chillax wordmark.
4. **Lower spacer** — flexible, marginally larger than the upper spacer so the cluster reads as optically centered rather than geometrically centered.
5. **System safe area** — home indicator zone.

**ASCII wireframe (390×844):**
```text
┌───────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                          ⌒                         │
│                       ⌒     ⌒                      │
│                     ⌒    ◐    ⌒                    │
│                       ⌒     ⌒                      │
│                          ⌒                         │
│                                                     │
│                                                     │
│                      Balencia.                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                          ───                       │
└───────────────────────────────────────────────────┘
```
*(`◐` = Balencia mark, sitting in a warm orange glow with a small, fainter purple pool directly beneath it. `⌒` = the continuous stroke line drawing itself around the mark — never an opacity fade. `Balencia.` = the wordmark, set in Chillax, settling in below once the stroke completes. `───` = home indicator safe area. The error/offline branch adds one low glass-pill banner just above the safe area — omitted here since it belongs to a non-default state; see Section 9.)*

### 5. Components
Deliberately components-light — this screen earns its premium feel by using almost none.
- **NEW: BrandClusterReveal** — bespoke, splash-only composite: Balencia mark + continuous-stroke line reveal + Chillax wordmark lockup, choreographed per Section 10. *Rationale:* the catalog is scoped to reusable UI, not logo-reveal moments; nothing else in the 104-screen scope re-triggers a full mark reveal, so this stays a one-off rather than a promoted catalog entry.
- **OfflineBanner / SyncStatus** (catalog, §6 System & compliance) — reused as-is, not reinvented. Appears only in the offline/error branch (Section 9), using the unmodified `.glass-pill` recipe; copy swapped for the two pre-auth strings in Section 7, since the catalog's default "last sync 2h ago" phrasing assumes an authenticated session this screen doesn't have yet.
- Everything else the catalog offers — GlassNavBar, TopBar, FABQuickLog, any card — is absent by design: there is no nav, no header, no data, and this screen predates all of it.

### 6. Visual treatment
- **Glass tiers:** none in the default path — no `.glass-card`, `.glass-frost`, or `.glass-pill` on the happy-path screen. The one exception is OfflineBanner/SyncStatus's `.glass-pill`, confined entirely to the error branch. Default state stays atmosphere-only: the logical extreme of the catalog's "no card when there's no data to hold" principle.
- **Atmosphere (CANON §1, mandatory):** `--bg-base` `#0A0A0F` as true base, with the required top-center warm glow — `radial-gradient(90% 60% at 50% -10%, rgba(255,94,0,.18), transparent 60%)` — plus a 4% soft-light grain (the top of canon's 3–4% range: this is the first frame the product ever shows a user, and it earns the richer texture).
- **Semantic glow — one stated meaning each, layered behind the brand cluster rather than spread across the frame:**
  - **Primary — `--glow-you` `#FF5E00`**, the mandatory atmosphere glow itself, 18% opacity. *Meaning:* Balencia's identity before it's anything else — orange stands as the unambiguous hero of this surface, per CANON §4's one-hero-per-surface rule.
  - **Secondary, subordinate — `--glow-cia` `#7F24FF`**, a small pool directly beneath the mark only: `radial-gradient(60% 40% at 50% 58%, rgba(127,36,255,.12), transparent 70%)`. *Meaning:* CIA is already present, quietly, before the user has met her — the one connective thread this pre-auth screen can honestly carry. Held to 12% opacity and confined behind the mark (never a separate zone) so it reads as undertone, resolving the tension between canon's mandatory "CIA moments add a purple pool" and its "one hero per surface" rule by making purple structurally subordinate: smaller, dimmer, literally underneath.
- **Hero type moment:** the mark-and-wordmark lockup — but it is not a Display-type moment. Per canon §5, Chillax is reserved exclusively for the logo wordmark and never enters UI text; "Balencia." is set in Chillax, paper-100 `#FEFAF3`, 34px, with the brand period intact (per brand guidance, the dot is identity, not punctuation — it is never dropped or separated from the mark). No Neue Montreal appears anywhere on this screen, because there is no UI text to carry it.

### 7. Content & copy
- **Wordmark:** `Balencia.`
- **Screen-reader on mount:** `Balencia. Loading.`
- **Auth retry (voice-over only, silent on screen):** `Checking your session… will retry`
- **Offline toast, returning user:** `No connection — continuing with saved data`
- **Offline toast, new user:** `No connection — starting fresh`

*(CIA's voice rules govern in-app coaching copy; this screen is pre-CIA system messaging, so it stays plain, sentence case, no exclamation marks — CIA is felt here via the purple pool, not yet heard. Never "CIA," anywhere.)*

### 8. Data & honesty states
Zero metrics, zero charts, zero user-data fields — a pure pre-auth handshake. The honesty triple (real / low-confidence / honest-null) doesn't apply because no number is ever shown, so none can be fabricated. The first metric a user sees arrives downstream — either honesty-labeled demo data in Guest mode (Screen 06) or a real, provenance-chipped stat on Home (Screen 12).

- **Timers (system-internal, never rendered):** happy-path animation contract 1.8s total · offline-detection ceiling 4s · auth-retry cadence — see correction below.
- **Auth state token:** source = local device cache, reconciled against the auth server. Used invisibly to choose the exit path; never rendered as a number or progress value.
- **Correction applied to the source draft's timing:** the draft specified a 4s network-timeout ceiling *alongside* "5 retries at a 3s interval" — up to 15s of possible retrying inside a stated 4s ceiling, which both contradicts itself and breaks the screen's own sub-2-second promise. Fixed model: **one shared 4s ceiling governs every non-happy path.** Inside it, up to 2 silent retries at 1.2s apart (~2.4s) are attempted. If auth still hasn't resolved by 4s, the screen falls back to the last known-good local state — a valid cached session proceeds optimistically to Home and reconciles auth in the background (silently signing out only if the server later rejects it); no cached session routes to Motion carousel. Nothing is ever held past 4s, and nothing is ever faked to make the wait look shorter than it is.

### 9. All states
- **Default:** warm dark atmosphere, brand cluster reveal choreographed per Section 10. This *is* the loading state — there is no separate spinner or progress indicator layered on top of it.
- **Skeleton:** not applicable — there is no data-shaped UI to scaffold; the brand mark is the only visual content, and it is never a placeholder for something else.
- **Empty:** not applicable — no list or data surface exists to be empty.
- **Error:** two branches, same base treatment — the mark holds, executing a subtle opacity pulse (80%→100%, 4s ease-in-out loop), no red, no error iconography, no alarm tone:
  - **Offline** (no network at all): OfflineBanner/SyncStatus surfaces low, just above the safe area, once the 4s ceiling is reached; copy depends on returning vs. new user (Section 7). The app proceeds on cached or fresh state per Section 8.
  - **Auth fail** (network present, token/server rejects): same pulse, silent retries per the corrected timing in Section 8, then falls back per that same model.
- **Success:** no distinct visual state — the crossfade to Screen 02 or Screen 12 begins the instant auth resolves, silently and without a transitional flourish of its own.
- **Disabled:** not applicable — nothing on this screen is ever interactive, so nothing can be disabled.

### 10. Motion & interaction
- **Interaction:** none. Fully passive; zero input is accepted or expected.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` throughout — physical ease-out, never linear (CANON §6).
- **Timeline (happy path, 1.8s total):**
  - **0.0s** — mark fades in; warm glow and the subordinate purple pool fade in alongside it (atmosphere never lags content).
  - **0.15s–1.05s** — the stroke line draws itself around the mark via `stroke-dashoffset` — never an opacity fade; the line has to earn its shape.
  - **1.05s–1.5s** — wordmark fades in and translates +8px → 0, the Chillax lockup settling in under the completed mark.
  - **1.5s–1.8s** — full hold, fully settled.
  - **1.8s** — if auth has resolved, the exit crossfade begins immediately; if not, the screen continues holding (pulse begins) up to the 4s ceiling from Section 8.
- **Glow behavior:** the atmosphere breathes on a 4s ease-in-out loop (CANON §6's "glow breathes on hero cards," extended here to the hero atmosphere itself, since this screen has no cards to hold it).
- **Haptics:** none — a passive screen earns no haptic feedback.
- **Reduced-motion path:** skips the stroke-draw entirely. Mark, purple pool, and wordmark appear in their final settled positions on a single 300ms fade, then hold to preserve the 1.8s contract before the same exit logic evaluates.

### 11. Motivation-tier adaptation
Not applicable, and structurally can't be otherwise: motivation tier is assigned during CIA onboarding (Screen 07), which hasn't happened yet at first launch — and a returning user hasn't been authenticated yet either, so their stored tier can't be read this early. Every user, regardless of eventual tier, sees the identical handshake. Density variants begin at Screen 02.

### 12. Accessibility
- **Contrast pairs:** wordmark paper-100 `#FEFAF3` on `--bg-base` `#0A0A0F` — effectively maximal contrast, far past AA+. The warm glow and purple pool sit behind the brand cluster, never behind readable text, so they never introduce a contrast risk.
- **Targets:** not applicable — no interactive elements exist to fail the 44px minimum.
- **Screen-reader labels:** on mount, announces `Balencia. Loading.` once, then stays silent — the stroke-draw and wordmark-rise are decorative motion beats, not information, so they are not re-announced. If auth retries, VoiceOver/TalkBack additionally speaks `Checking your session… will retry` once per retry attempt (not per animation frame). Reduced-motion users receive identical announcements; only the visual draw is skipped, per Section 10.

### 13. Premium checklist
Self-assessed against the 14-point stage-D gate (pass ≥ 12, all 3 north stars satisfied).

1. **Connects** (cross-pillar intelligence present): not applicable by design — pre-auth, no domain content exists yet to connect. The one honest connective thread available here is atmospheric: the subordinate purple pool announces CIA's presence before she's ever spoken, foreshadowing the cross-pillar relationship every later screen builds on.
2. **Honest** (no fabricated numbers; provenance): pass. Zero numbers shown anywhere; auth/network trouble resolves transparently (Section 8) or fails safe into a known-good state — never a progress bar measuring something it isn't.
3. **Premium** (funded-product hierarchy, generous space): pass. One mark, one wordmark, nothing else competing for attention — the emptiest screen in the build reads as the most confident.
4. **Warm-dark atmosphere, glass reads as glass:** pass. Atmosphere matches CANON §1 exactly; the only glass on the screen (OfflineBanner/SyncStatus) is confined to the error branch, using the unmodified `.glass-pill` recipe.
5. **Semantic glow, one-per-card, meaning stated:** pass, adapted — there are no cards, so the rule is applied to the atmosphere itself: orange = identity/hero (stated, Section 6), purple = CIA's quiet presence (stated, Section 6), one explicit meaning each.
6. **60/30/10 + one hero color per surface:** pass. Orange is the unambiguous hero (mandatory atmosphere glow, 18%); purple is deliberately subordinate — smaller radius, half the opacity, positioned behind rather than beside.
7. **Type rules:** pass, with the canon-sanctioned exception made explicit — the sole visible text is the wordmark, correctly set in Chillax (never NM), because it is a logotype, not UI copy. No body text and no data exist here for tabular-nums or Tiempos-italic to apply to.
8. **All six states designed:** pass. Default / skeleton / empty / error / success / disabled all addressed in Section 9, including two honestly-justified not-applicables.
9. **Motivation-tier variants:** not applicable by design, justified in Section 11 — tier doesn't exist yet at this point in the funnel.
10. **AA+ contrast + 44px + reduced-motion:** pass. Contrast trivially exceeds AA+; no targets exist to fail the 44px rule; reduced-motion path fully specified.
11. **Honesty triple per metric:** not applicable — zero metrics render on this screen (Section 8).
12. **Catalog component names, no unflagged one-offs:** pass. One legitimate `NEW:` (BrandClusterReveal, rationale given); the offline banner reuses OfflineBanner/SyncStatus from the catalog rather than duplicating it under a new name.
13. **CIA voice copy:** pass. Sentence case, no exclamation marks, always CIA anywhere in this spec — and CIA is deliberately never voiced directly on this screen (Section 7), only felt.
14. **Anatomy + 390×844 ASCII wireframe present:** pass. Section 4.

**Net:** 3 items are honest not-applicables (1, 9, 11), all justified by this screen's pre-auth position rather than by missing craft; every gradeable item passes.
