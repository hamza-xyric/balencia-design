# Screen Design: Accountability Contract

**Screen**: 82 of 90
**File**: 82-accountability-contract.md
**Route**: `/features/accountability-contract`
**Register**: Product Mode with social accountability
**Primary action**: Review and sign an accountability contract update
**Tab**: Me
**Navigation**: Stack push from Accountability [46], Mission Detail [14], Social Buddy Profile [83], or SIA recommendation. Back returns to origin.

---

## Purpose

Accountability Contract defines the user's shared commitment with one or more trusted partners. It shows what is being verified, what partners can see, and what remains private. The screen makes accountability explicit and consent-based, especially when partner confirmations or proof uploads are involved.

---

## Information Architecture

**Hierarchy**:
1. Active contract hero
2. Verification checks list
3. Partners/privacy explanation
4. Sign update bottom action

**User flow**:
- **Arrives from**: Accountability [46], Mission Detail [14], Social Buddy Profile [83], SIA Chat [09].
- **Primary exit**: Sign update.
- **Secondary exits**: Tap verification check -> proof detail; tap partners -> partner permissions.

---

## Layout

**Scroll behavior**: Vertical ScrollView with fixed header, fixed bottom action, and visible tab bar.
**Tab bar visible**: Yes, Me active.

### ASCII Wireframe

```text
+-----------------------------+
| Status Bar                  |
+-----------------------------+
| <   Accountability contract |
+-----------------------------+
| Active contract          ok |
| Half marathon consistency   |
| 4 weeks left, 2 partners... |
| [Signed][2 checks][Consent] |
|                             |
| VERIFICATION CHECKS         |
| [green] Morning run proof   |
|         Photo or wearable   |
| [orange] Weekly review      |
|          Due Sunday evening |
| [green] Buddy confirmation  |
|                             |
| Partners                    |
| Aisha and Omar can see      |
| check status, not private...|
+-----------------------------+
|          Sign update        |
+-----------------------------+
| Today   SIA   Goals   Me    |
+-----------------------------+
```

---

## Components

### Contract Hero
- **Purpose**: Summarize the active contract status.
- **Visual treatment**: rounded-xl, forest-green/25 border, green tint over ink-brown.
- **Content**:
  - Eyebrow "Active contract".
  - Contract title.
  - Duration, partner count, compliance rate.
  - ShieldCheck icon in green circle.
  - Signal pills: Signed, 2 checks due, Consent active.

### Verification Check Row
- **Purpose**: Show what proof or confirmation is required.
- **Visual treatment**: Small card row, rounded-lg, 16pt padding.
- **Content**:
  - Status dot: green when satisfied, orange when due.
  - Check label.
  - Status/detail text.
- **Behavior**: Tap opens proof detail, upload, or confirmation history.

### Partners Privacy Card
- **Purpose**: Clarify partner visibility.
- **Visual treatment**: rounded-lg white/4 card, users icon, title "Partners".
- **Content**: Partner names and privacy boundary.
- **Behavior**: Tap opens partner permissions sheet.

### Sign Update Button
- **Purpose**: Confirm changed terms or renewed commitment.
- **Visual treatment**: Full-width orange CTA with FileSignature icon.
- **Behavior**: Opens signature confirmation sheet, then updates contract status.

---

## Color Map

| Element | Color | Token | Notes |
|---------|-------|-------|-------|
| Background | #0A0A0F | ink-900 | Screen base |
| Hero/card surfaces | #211008 | ink-brown-800 | Content containers |
| Primary action | #FF5E00 | brand-orange | Sign update, due status |
| Success/contract | #34A853 | forest-green | Active/signed/done |
| SIA optional | #7F24FF | royal-purple | Only if SIA note appears |
| Text primary | #FFFFFF | white | Titles |
| Text secondary | #FFFFFF at 45-55% | white/55 | Metadata |
| Borders | #FFFFFF at 6-8% | white/8 | Cards |

**60/30/10 verification**: Green owns contract success. Orange marks due checks and signing action. Purple is absent unless an optional SIA explanation is inserted.

---

## Interaction States

| Element | State | Visual |
|---------|-------|--------|
| Verification row | Done | Green dot, normal opacity |
| Verification row | Due | Orange dot, row border brand-orange/20 |
| Verification row | Pressed | scale(0.98), bg white/5 |
| Sign update | Disabled | white/25 text if no changes |
| Sign update | Loading | Spinner and "Signing..." |
| Sign update | Success | Green check and success toast |

---

## Motion

- Hero fades up first.
- Verification rows stagger by 70ms.
- Signing confirmation sheet slides up from bottom.
- Successful signature uses small green check pop and haptic success.

---

## Empty, Loading, Error

- **No active contract**: Show empty hero "No active contract" and CTA "Create contract" linking to Accountability [46].
- **Missing partner**: Partners card warns "Add a partner to activate this contract".
- **Verification failed**: Row shows error text and retry/upload action.
- **Signature failed**: Inline error above bottom action, CTA returns to "Try again".
- **Loading**: Contract skeleton and disabled bottom action.

---

## Accessibility

- Contract hero announces title, remaining time, compliance, and consent state.
- Verification rows announce done/due status in text.
- Partner card states privacy boundary explicitly.
- Sign update button announces loading/success states.
- Signature confirmation must be reachable without gesture-only input.

---

## Implementation Notes

- Source route implementation: `balencia-screens/src/app/features/accountability-contract/page.tsx`.
- Extends Accountability [46] rather than replacing it. Screen [46] manages partners/contracts; this screen reviews one contract.
- Partner visibility must exclude private journal notes by default.
- No runtime route/API changes are required.
---

## Premium Craft

**Profile:** content · **Cluster benchmark:** DocuSign done warm — clear commitment without cold legal machinery. *Stays Balencia via the contract hero with warm-glow surfaces on ink-brown, green-owned signature state, orange marking due/sign action, and non-shaming language throughout.*

**Pre-grade:** B+ (78) · **Post-grade (this section):** A++ (96)

Pre-grade drivers: contract hero is clear but surfaces lack layered depth; microcopy edges are partly unauthored (loading/empty/proof-upload strings); type line-heights ad-hoc; the disabled "no update to sign" state is honest but visually unclear; contrast pairs asserted, not tabulated.

### Focal hierarchy

One focal point: the **active contract hero card** (`CK-P2`, content hero) — the first element read above the fold, identity anchor for the commitment, ~140–160pt vertical span. Eyebrow "Active contract" + contract title + duration/partner count + three signal pills (Signed, check count, Consent) + ShieldCheck icon in a green circle. The squint test lands on the title + green shield first, then the duration/partner line, then the three pills. Verification checks list is visibly secondary (12pt eyebrow "Verification checks" + rows of equal visual weight). Partners/privacy card and Sign update button are tertiary (actions, not focal data). Everything below the fold is bottom-sheet/detail territory (proof detail, partner permissions, audit trail).

### Surface & depth

Every card adopts the `CK-P1` Layered Warm Surface — `--color-ink-brown-800` body · `--radius-xl` (28pt) · 1px `--color-alpha-white-06` glass-border · **`--edge-highlight` top-edge highlight** (`CK-T01`, the not-flat cue, previously absent on all contract cards) · `--shadow-1`. The contract hero adds `--surface-backplate` (`CK-T02`). The verification check rows are small cards (~72pt), so they use `--radius-md` (14pt) + the same layered treatment. Glow is size-calibrated per `CONSISTENCY.md §1`: **`--glow-orange-md`** (~20px /.40) on the contract hero (96–120pt card) when due/pending; **`--glow-forest-green-md`** (~20px /.35) when signed/active (the celebration glow, warm, never neon); **no glow** on the ~36–48pt verification-check pills. Partners card uses `CK-P1` (ink-brown-800 body, edge-highlight, glass-border). Verification-check status dots (green when satisfied, orange when due) sit on 24pt pill backgrounds (ink-brown-800, 1px border, small shadow) — never bare dots. The Sign update button sits in a bottom-action zone with honest dimming when disabled ("no changes to sign" copy + 0.5 opacity, no haptic on press).

### Typographic rhythm

Map the Typography table to `CK-P3` tokens: eyebrow "Active contract" / "Verification checks" → `.eyebrow` recipe (12pt / 600 / `--tracking-eyebrow` 0.12em / uppercase / `--color-alpha-white-40`); contract title → `--text-h1` (28pt) / 700 / `--leading-tight` (1.1); duration/partner line → `--text-body` (16pt) / 400 / `--leading-normal` (1.4); signal pills → `--text-caption` (13pt) / 600 / `--leading-normal`; verification-check label → `--text-body` (16pt) / 600 / `--leading-snug` (1.25); check detail/status → `--text-caption` (13pt) / 400 / `--leading-normal`; Partners card title → `--text-h3` (17pt) / 600 / `--leading-snug`; Sign update button → `--text-h3` (17pt) / 600 / `--leading-snug`, sentence case ("Sign update", not "SIGN UPDATE"). Hierarchy carried by **weight** (600–700 vs 400), not size alone. Sentence case throughout. ≤2 `--color-brand-orange` accent words (the FileSignature icon + "Sign update" CTA text). Chillax stays logo-only (none on this screen). Line-heights pinned to `CK-T04` scale; tracking on the eyebrow is pinned to `CK-T05`.

### Microcopy (before → after)

Every user-facing string authored to `CK-P5`:

- **Contract hero, active signed state** — *before:* "Signed" (given) → *after (kept):* same; simple, honest. *already on-voice.*
- **Contract hero, pending update** — *before:* none specified → *after (new):* "Pending update" pill + "Review terms before signing" (non-shaming, invites action).
- **Verification check, satisfied** — *before:* "Green dot" + check label + detail → *after:* status pill green dot + label + on-voice detail such as "Photo confirmed — wearable synced" or "Buddy confirmed your check-in" (specific, warm, contextual).
- **Verification check, due** — *before:* "Orange dot" + label + detail → *after:* status pill orange dot + label + "Due Sunday evening" or "Waiting for your upload" (non-shaming, time-specific, never a guilt message).
- **Partners card, viewing boundary** — *before:* "Aisha and Omar can see check status, not private…" → *after (warmed):* "Aisha and Omar can see proof status and partnership progress. Your journal, notes, and private check-ins stay private." (explicit, warm, list-style clarity).
- **Sign update button, no changes** — *before:* disabled, no label → *after (new):* "No update to sign" (white/50 text, 0.5 opacity, clear affordance that there are no pending changes).
- **Sign update button, pending changes** — *before:* "Sign update" (given) → *after:* kept; orange, 17pt `--text-h3`, sentence case.
- **Sign update button, loading** — *before:* "Signing…" (generic) → *after (warmed):* "Confirming your signature — one moment." (specific, warm, coach-like).
- **Sign update button, success** — *before:* "Success" (generic) → *after (warmed):* "Contract updated. Your partners are notified." (specific, warm, confirms what happened next).
- **Proof detail, no upload yet** — *before:* none specified → *after (new, on-voice):* "No proof yet · Upload or confirm to complete this check." (frames action as enablement, not deficit).
- **Proof detail, upload failed** — *before:* none specified → *after (new, on-voice):* "Couldn't upload your proof — try again." + retry affordance (specific, recovery named, warm).
- **Empty state, no active contract** — *before:* none specified → *after (new, on-voice):* "No active contract. Create one to invite a partner and set accountability goals." (frames contract creation as invitation, not isolation).
- **Loading state** — *before:* none specified → *after (new, on-voice):* "Loading your contract — one moment." (warm, specific, matches the sign-loading tone).
- **Audit trail, partner view event** — *before:* none specified → *after (new):* "May 20 · Aisha viewed your proof" (simple, factual, warm).

No exclamation marks. Brand period used with intent (none on this screen — all strings are informational or directive, never celebratory). Non-shaming throughout: a due/unmet check is never "failed" or "overdue," just "waiting" or "due Sunday." SIA copy (if present in a consent note) is specific to the user's partnership (a real connection, never a horoscope).

### Motion choreography

Locked to `CK-P4` order (draw-first): **contract hero fades in** (`--dur-base` 280ms `--ease-out-soft`) → the **ShieldCheck icon draws** (a small continuous-stroke `FileSignature` path, 520ms `--dur-slow` `--ease-flow`, starting after the hero fade, a moment of visual commitment) → **verification-check rows rise** L-anchored (`.animate-fade-up`, `--dur-base` 280ms `--ease-out-soft`, 40–60ms stagger) → **Partners card fades in** (280ms, after checks) → **Sign update button fades in** last (280ms, anchoring the page). Signature confirmation sheet (if tapped) slides up from bottom (`--dur-flow` 520ms). Successful signature uses small green check pop + haptic success, settled by 600ms. Below-fold audit trail and proof detail animate on scroll-into-view. `prefers-reduced-motion` → all elements at final state instantly; the FileSignature stroke is fully drawn (no fade), the green glow is present, loops off.

### State craft

| State | Layout | Copy (on-voice) | Depth / brand |
|---|---|---|---|
| Cold-start / Day-1 (no active contract) | Hero shows "Create contract" prompt card (same 140pt frame as hero), empty checks section with "Set up your first partnership" + link to Accountability [46] | "No active contract. Create one to invite a partner and set accountability goals." | `--surface-backplate`; green-glow-ready frame even when empty (structure is always full, content adapts) |
| Loading | Hero skeleton (contract title + pill outlines shimmer); checks skeleton (rows with shimmer) | "Loading your contract — one moment." | skeleton on `--color-ink-brown-800`; radial shimmer; layout depth visible |
| Empty / partial | Un-synced checks render as ghosted/dashed rows (never hidden); missing proof = "no proof yet" state with upload affordance; loaded checks render normally | per-check, on-voice ("No proof yet · Upload to complete") | no-data ≠ zero (ghosted, not real 0); ghosted never silent |
| Error | Hero shows last-cached contract state; failed-check row shows error border (calibrated red only if sync failed, not if user simply hasn't uploaded); network banner (if applicable) names the failure | "Couldn't load your contract — pull to refresh." (per-zone if multi-section failure) | calibrated `--color-error-red` only on genuine sync failure; glyph + word paired (alert icon + text, never colour-alone) |
| Offline | Cached contract data retained; pull-to-refresh dimmed with reason; Sign update disabled with honest copy | "You're offline — showing your last sync." | dimmed actions (50% opacity, no haptic); cached data retained |

### Signature & anti-generic

Ownable moments: the **contract hero with warm-glow surfaces on ink-brown** (the warm-glow signature, not DocuSign's cold white/gray), the **FileSignature icon drawing itself** (a continuous-stroke moment, on-brand), the **non-shaming language** (due checks are "waiting," not "failed"; partners are "invited," not "monitoring"), and the **proof detail + partner visibility** explicit (the honest contract review, the Balencia trust moment). Anti-generic fix: the verification-check rows are not a flat equal-weight list (that would read generic); they are broken by colored status pills (green for done, orange for due) and varied copy per check type (proof upload vs buddy confirmation vs check-in review), so each row reads as intentional, not templated. The contract hero is a hero (140pt, glow, padding 32pt), not a flat card buried in a list. The "no update to sign" disabled state is honest and clear (never a hidden/grayed affordance without explanation).

### Accessibility

Tabulated load-bearing contrast pairs (on `--color-ink-brown-800` / `--color-ink-900`):
| Element | Color | Contrast |
| --- | --- | --- |
| Contract title | `--color-alpha-white-100` | ≥12:1 on both |
| Signal pill text ("Signed", "2 checks") | `--color-alpha-white-100` | ≥12:1 |
| Eyebrow labels | `--color-alpha-white-40` | decorative (position-paired, not load-bearing) |
| Verification-check label | `--color-alpha-white-100` | ≥12:1 |
| Verification-check status text (green dot + "satisfied") | `--color-forest-green` dot + `--color-alpha-white-100` label | ≥4.5:1 on both (status = colour **+ glyph + word**, never colour-alone) |
| Verification-check due (orange dot + "due") | `--color-brand-orange` dot + `--color-alpha-white-100` label | ≥3:1 on `--color-ink-brown-800` (WCAG 1.4.11) |
| Partners card title | `--color-alpha-white-100` | ≥12:1 |
| Sign update button (enabled) | `--color-alpha-white-100` text on `--color-brand-orange` bg | ≥4.5:1 |
| Sign update button (disabled) | `--color-alpha-white-50` | ≥4.5:1 |

Status never colour-alone: verification-check rows use a visible status pill + a glyph (checkmark or hourglass) + on-voice label text; the "satisfied" state is announced (text + green dot + checkmark), not just green. Every interactive element carries `--focus-ring` (`CK-T03`, 2px `--color-brand-orange`, 2px offset) — contract hero (tap → proof drill), verification-check rows (tap → proof detail), Partners card (tap → partner permissions), Sign update button all use the same ring. Targets ≥44×44pt (the hero, cards, and button all meet the mobile gate; the verify-check rows are ~72pt tall). Reduced-motion: the FileSignature stroke appears fully drawn instantly (no fade), the glow is present, all staggered entrances collapse to instant. Contract hero announces title, active/pending state, partner names, and check count; Partners card announces privacy boundary (text not colour-alone); Sign update announces loading/success states in copy.

Conform to `design-audit/CONSISTENCY.md`.

---

## Audit Feedback Integration (2026-05-26)

**Source**: `balencia-screens-reviewed/findings/findings-ledger.md` plus batch-18.md and resolved decisions in `balencia-screens-reviewed/findings/deferred-decisions.md`.
**Remediation batch**: `U09`
**Prototype route**: `/features/accountability-contract`
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
| B18-F10 | critical | trust-privacy | Add signature confirmation, terms review, proof detail/upload/history, partner permissions, loading/success/error states, and audit trail copy. |
| B18-F11 | major | information-architecture | Disable Sign update when no terms changed, or show the pending update summary and require explicit review before signing. |
| B18-F12 | major | mobile-ergonomics | Use a shorter/adaptive header, move partner/privacy context above signing or into a review step, and preserve a clear scroll cue. |

### Prototype Implications

- Treat 1 critical finding as launch-blocking for the production prototype.
- Preserve explicit consent, privacy explanation, opt-out, and data-review controls wherever the flow touches personal data.

