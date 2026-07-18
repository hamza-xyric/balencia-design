# 03c-consent - A+++ hi-fi mobile spec

## Header
- **Source ID:** 03c
- **Source spec:** `Balencia-New-Screens/screens/03c-consent.md`
- **Evidence:** screens/03c-consent.md, work/briefs/03c.md, work/drafts/03c.md
- **Route(s):** `/onboarding`
- **Frame:** 390x844 native mobile
- **Priority:** converted

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: The legal gateway requiring explicit, non-shaming acceptance of the Terms of Service and Privacy Policy before onboarding proceeds.
- **Premium Visual Director:** make consent choice stack the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** Consent keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

```text
+-------------------------------------------+ 0
|                                           |
|               STATUS BAR                  | 44
|                                           |
|              [BALENCIA]                   | 140 (wordmark, Chillax)
|                                           |
|         Before we *begin*                 | 200 (Display, 34)
|      Review and accept our policies       | 240 (Body-light, 16)
|              to continue                  |
|                                           |
| +---------------------------------------+ | 300
| | REQUIRED                              | | (Overline 11, +.14em)
| |  [ ] I accept the Terms of Service   >| | 352 (Row 1, SolidCard)
| |---------------------------------------| | (hairline rgba(255,255,255,.06))
| |  [ ] I accept the Privacy Policy     >| | 404 (Row 2)
| +---------------------------------------+ | 456
|                                           |
| +---------------------------------------+ | 484
| | OPTIONAL                              | | (Overline 11)
| |  Send me tips and updates    [ O ]    | | 536 (GlassCard, glow-you)
| +---------------------------------------+ | 588
|                                           |
|            0 of 2 required                | 640 (Body-light 15, tabular-nums)
|                                           |
| +---------------------------------------+ |
| |               Continue                | | 712 (BtnPrimary, h52)
| +---------------------------------------+ |
|                                           | 772
+-------------------------------------------+ 844

Route handling: `/onboarding`
```

## Focal Hierarchy
- **Dominant focal moment:** consent choice stack; it should be visually singular, not one tile among many.
- **Secondary layer:** Status bar zone - system default, over atmosphere. with CIA only when the source supports a synthesized read.
- **Operational layer:** Brand anchor - Balencia wordmark  + 48x48pt symbol, centered., Header zone - heading + subtitle, centered., Acceptance read - status line, tabular-nums count., Primary CTA - full-width submission button..
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*consent*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Components
- **SolidCard** - Required consents container. `--surface-2` (#211008) bg, radius 28, border `rgba(255,255,255,.06)`, no blur - the legal-gate zone that keeps things legible over atmospheric.
- **ListRow** - each required row: leading `ConsentCheckbox` (NEW, below)  label (Body 16)  trailing chevron (opens the Sheet). 56px min height per catalog (draft said 52px - corrected). Tapping anywhere in the row's 56px band toggles the checkbox; tapping the label text specifically opens the Sheet - see 10 for how those two gestures share a row without colliding.
- **GlassCard** - Optional consents container, `default` variant, radius 28. *Correction:* the draft named this container `ConsentCard` in 5 but `.glass-card` in 6 - two different catalog components describing one region. `ConsentCard` is a `FrostCard` built for data/photo/voice/third-party permission asks with paired accept/decline buttons and a stated retention policy; a single marketing toggle has none of that shape. Reassigned to plain `GlassCard` (default), which is the correct fit and resolves the contradiction.
- **Toggle** - marketing opt-in. Track `--surface-3` (#2A1510), active fill `#FF5E00`, thumb paper-50 (#FDFDFB).
- **ConsentCheckbox** - **NEW.** 24px visual box, `#FF5E00` fill when checked, paper-50 (#FDFDFB) check glyph, 6px radius (square-ish, not a pill - reads as a form control, not a chip). 44x44pt tap target expands invisibly around the 24px visual, independent of the `ListRow`'s own 56px band. *Rationale:* the catalog has no dedicated legal checkbox (Toggle/Stepper/Slider covers binary-preference controls, not gating affirmations); a checkbox reads as "I attest," a toggle reads as "I prefer" - the semantic difference matters for a legal gate and is worth one small new primitive rather than misusing Toggle twice on one screen.
- **Sheet** (variant `full`) - houses the actual Terms of Service / Privacy Policy document text. `.glass-frost` tier, top-radius 28, grabber pill, scrim `rgba(10,10,15,.6)`, spring in 250ms. Internal `TopBar` (back chevron, document title). Two instances of this same component, one per document - not one shared component with a document switcher; each row's chevron opens its own document, no ambiguity about which is which.
- **ErrorState** - inside the Sheet, if the document fails to load: glyph + Body line + `BtnSecondary` retry. *Correction:* draft listed a bare "retry" text link with no component backing. `BtnSecondary` (`.glass-pill`, paper-100 label, 1px `.10` border) is the catalog citation for exactly this.
- **BtnPrimary** - full-width `Continue`. Height 52, radius 999, `#FF5E00` fill, paper-50 (#FDFDFB) label, NM Medium 16. States per catalog: disabled 40% opacity, loading = label->spinner with width locked.
- **BtnGhost** (density variants only) - `Email preferences` link in low density, `Data control` link in high density. See 11.
- **ProgressBar** (variant `segmented`, high density only) - see 11.
- **OfflineBanner / SyncStatus** - connectivity state banner, adapted copy (see 8/9). *Correction:* draft assigned this job to `ChipProvenance`, which the catalog defines as a data-*source* chip (`via WHOOP`, `you logged`, `estimated`) - it has no connectivity-state role. The catalog's actual connectivity component is `OfflineBanner / SyncStatus`; reassigned. Its stock copy pattern ("offline - showing last sync 2h ago") assumes prior synced data, which doesn't exist on a one-time pre-auth consent screen - copy is adapted honestly rather than fabricating a "last sync" timestamp that has no referent here.
- **Overline** (type token, not full `SectionHeader`) - `REQUIRED` / `OPTIONAL` eyebrows. No trailing action or H2 needed, so the lighter type-token citation is more accurate than invoking the whole `SectionHeader` component.

## Data Honesty
- **Consent acceptance count (derived local state):**
- **Real:** renders as `2 of 2  ready` once both boxes are checked. No `ChipProvenance` chip is attached to this value - that's an intentional, not a forgotten, omission: `ChipProvenance` exists to disclose *external* data sources (`via WHOOP`, `estimated`), and this count has zero source ambiguity - it is the direct, same-frame result of the user's own taps, nothing is fetched or inferred.
- **Low-confidence:** not applicable, and this is a justified N/A rather than a skipped case - a checkbox is a boolean the user directly set; there is no partial-confidence rendering of "checked" or "unchecked" for CIA or any system to estimate.
- **Honest-null:** `0 of 2 required` on cold start. Neither box is ever pre-checked; the count never starts anywhere but zero.
- **Network/submission status:**
- **Real:** connection established, `POST /api/auth/consent` resolves; CTA proceeds to success state.
- **Low-confidence:** not applicable - connectivity is binary at the point of submission, there is no "probably online" middle state worth designing for.
- **Honest-null (offline):** CTA reads `You need a *connection* to continue` and is disabled; `OfflineBanner / SyncStatus` states `No connection right now - you can review, but continue needs you online`. Nothing is invented about background sync (see 7 correction) - the honest behavior is simply "not yet, come back."

## Consent and Safety
- Consent keeps required consent unchecked until explicit action, optional consent skippable, and route handoff limited to `/onboarding`.
- Source chips include category, source, scope, freshness, retention, export, revoke, and delete.
- Keep navigation targets aligned to `/onboarding`. Do not add alternate vanity routes.

## States
- **Default (cold start):** both required boxes unchecked, optional toggle off. Acceptance read shows `0 of 2 required`. CTA at 40% opacity, non-interactive.
- **Partial accept:** one required box checked. Acceptance read shows `1 of 2 required`. CTA still disabled.
- **Gate ready (pre-submit):** both required boxes checked. Acceptance read turns forest green `#34A853`, showing `2 of 2  ready`. CTA reaches full opacity and becomes interactive.
- **Loading:** API POST in flight. CTA label crossfades to a spinner; CTA is non-interactive; width locked (catalog `BtnPrimary` loading state).
- **Success:** 250ms forest green flash across the CTA, then stack push to CIA Onboarding [07].
- **Inline error:** only reachable if gate logic is somehow bypassed and an invalid state is submitted. CTA shakes horizontally 10px (transform only, no layout shift); error text `Accept both to continue` slides down 10px below the CTA.
- **Network error / server error:** on API failure, CTA reverts to its gate-ready state (never stuck mid-loading); the matching error copy from 7 appears as a banner sliding down from the top.
- **Document load failure (inside Sheet):** `ErrorState` renders in place of the document - glyph, `Could not load the page. Check your connection.`, `BtnSecondary` retry.
- **Offline:** device loses connection. CTA label swaps to `You need a *connection* to continue` and disables; `OfflineBanner / SyncStatus` appears. Checkbox/toggle state is preserved untouched - going offline never resets what the user already decided.
- **Gate coverage lock:** Default, Skeleton, Empty, Error, Success, and Disabled states are explicitly covered for implementation; any state with no visible UI is marked not applicable with rationale rather than omitted.

## Motion
- **Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` for entrances and toggle transitions - canon specifies physical, non-linear easing without pinning an exact curve; this is the native-feeling decel curve used consistently for sheet/toggle motion elsewhere in the system.
- **Timing:** 150-250ms for checkbox/toggle tap feedback, per canon.
- **Screen entrance:** staggered fade-in, downward drift. Wordmark (0ms) -> header (50ms) -> cards (100ms) -> CTA (150ms).
- **Checkbox/toggle interaction:** the `ListRow`'s 56px band toggles the `ConsentCheckbox` on tap anywhere in the row *except* the label text itself, which instead opens the document `Sheet` - this is the resolution to the "tap-anywhere" ambiguity a checkbox row plus a document link both want: box + trailing chevron area = toggle, label text = read the document. Both zones individually still clear 44px.
- **CTA enable/disable:** 200ms opacity + fill crossfade tied to gate state.
- **Error messaging:** slides down 10px + fades in on appearance; slides up + fades out on dismissal.
- **Success:** 250ms forest green flash, then navigation - no continuous-stroke line motif here; that motif is reserved for hero/celebration moments per canon 6, and a legal gate clearing is neither.
- **Glow behavior:** the Optional card's `--glow-you` bleed brightens 10% when the marketing toggle flips on - the only place on this screen where a glow visibly reacts to input, matching the fact that it's the only card carrying one.

## Image Slots
- None required.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/onboarding`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** paper-100 (#FEFAF3) on `--surface-2` (#211008) computes to **17.6:1** - comfortably exceeds AAA (7:1). Paper at 64% opacity on `--surface-2` computes to **7.7:1** - also clears AAA for normal text, not merely AA as the draft under-claimed. *(Both figures independently recomputed against the exact canon hexes; the draft's "16.5:1 / passes AA" was in the right neighborhood but not accurate enough for a checklist that's making a compliance claim.)*; **Touch targets:** `ConsentCheckbox` visual is 24px but its own tap target is 44x44pt, independent of the row; the surrounding `ListRow` band is 56px min height (catalog value - draft said 52px, corrected). Toggle thumb's effective tap target is padded to 44px.; **Screen-reader labels:**
