# 82-accountability-contract - hi-fi glass spec

### 1. Header
- **ID:** 82
- **Name:** Accountability contract
- **Route(s) covered:** /contracts
- **Tab:** Goals / Me
- **Source:** app_design 3/82-accountability-contract.md plus ascii_wireframes/82-accountability-contract.md
- **Batch:** 21

### 2. Purpose
Accountability contract defines a shared commitment with partners or witnesses: what is being verified, what proof is visible, what stays private, when an update needs signature, and how the member can pause, resolve, or revoke sharing.

### 3. Entry & exit
- **Entry paths:** /contracts live route, Accountability [46], Mission Detail [14], Social Buddy Profile [83], or CIA recommendation.
- **Primary exit:** Sign update opens signature confirmation, then returns to the contract or mission.
- **Secondary exits:** verification row opens proof detail; partner/witness card opens permissions; pause/resolve opens action sheet; back returns to source.
- **Failure exit:** signature failure preserves contract data and shows Try again plus Review terms.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with back, title, and terms/history overflow.
2. **Contract hero GlassCard** with active contract name, progress, partner/witness count, consent, and signature status.
3. **Verification checks** with proof rows, due/completed state, and watchful wording.
4. **Partners and witnesses privacy card** describing what Aisha/Omar or a witness can see.
5. **Terms review panel** for commitment, cadence, proof requirements, pause/resolve.
6. **Fixed bottom action** for sign update or no update to sign.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  Accountability contract       ... |
+--------------------------------------+
| +----------------------------------+ |
| | Active contract                 | |
| | Half marathon consistency       | |
| | 4 weeks left | 2 partners       | |
| | Signed | 2 checks due | consent | |
| +----------------------------------+ |
| VERIFICATION CHECKS  5 of 6          |
| [=========-----] 83%                 |
| +----------------------------------+ |
| | done  Morning run proof          | |
| | photo confirmed via check-in     | |
| +----------------------------------+ |
| | due   Weekly review              | |
| | due Sunday evening               | |
| +----------------------------------+ |
| +----------------------------------+ |
| | Partners and witnesses           | |
| | Aisha can see proof status.      | |
| | Private journal notes stay off.  | |
| +----------------------------------+ |
| [Sign update]                        |
+--------------------------------------+
```

### 5. Components
- **TopBar** - back, terms/history overflow.
- **GlassCard** - active contract hero.
- **ProgressBar** - checks satisfied and contract progress.
- **SolidCard** - verification rows, terms, partner/witness privacy.
- **ConsentCard** - proof visibility, partner sharing, revoke/delete sharing.
- **ChipProvenance** - proof source, signature timestamp, partner confirmation.
- **Sheet** - sign confirmation, pause, resolve, partner permissions.
- **BtnPrimary / BtnSecondary / BtnGhost** - sign, create, pause, resolve.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** warm dark `#0A0A0F` with radial glow and grain.
- **Glass tiering:** contract hero and signing confirmation use glass; verification and privacy rows use SolidCard on `#211008`.
- **Semantic glows:** pending signature/action uses `--glow-you #FF5E00`; signed/completed checks use `--glow-done #34A853`; CIA-suggested contract note uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal; hero can read `Commitment *held*` with one Tiempos italic word.
- **60/30/10:** orange pending action, green verified/signed, purple only CIA.

### 7. Content & copy
- **H1:** Commitment *held*
- **Hero labels:** Active contract; Half marathon consistency; Signed; 2 checks due; Consent active.
- **Verification rows:** Morning run proof; Weekly review; Buddy confirmation.
- **Privacy copy:** Partners and witnesses can see proof status and partnership progress. Private journal notes stay private.
- **Primary CTAs:** Sign update; Create contract
- **Secondary CTAs:** Pause contract; Resolve contract; Manage witnesses; Review terms
- **Empty copy:** No active contract. Create one to invite a partner or witness and define proof.
- **Error copy:** Signature failed. Your terms were not changed.

### 8. Data & honesty states
- **Contract status:** real = active/pending/paused/resolved plus ChipProvenance; low-confidence = sync stale; honest-null = no active contract.
- **Verification checks:** real = proof count and status; low-confidence = partner/witness confirmation pending; honest-null = no proof required yet.
- **Partner/witness visibility:** real = per-person permissions; low-confidence = permission sync pending; honest-null = no partners or witnesses.
- **Signature state:** real = signed timestamp and signer; low-confidence = signature service queued; honest-null = no update to sign.
- **CIA recommendation:** real = contract tied to mission evidence; low-confidence = single blocker signal; honest-null = no coach plan claim.

### 9. All states
- **Default:** active contract hero, verification checks, partner/witness privacy, terms, and sign action render.
- **Skeleton:** hero, progress, and checks preserve layout with no fake names or percentages.
- **Empty:** HonestNullState offers Create contract and explains privacy before setup.
- **Error:** failed signature or proof sync keeps cached contract and names affected action.
- **Success:** signature/check completion updates in place with `--glow-done` and timestamp provenance.
- **Disabled:** sign action dims to 40% with copy `No update to sign` or specific missing consent/review reason.

### 10. Motion & interaction
- **Load:** contract hero fades first; checks rise in 50ms stagger.
- **Sign:** confirmation Sheet names changed terms, partner visibility, and proof requirements.
- **Rows:** tap opens proof detail; accept/dismiss controls are buttons, not swipe-only.
- **Pause/resolve:** action sheet explains consequence and keeps cancel equal prominence.
- **Reduced-motion:** disables stagger, progress sweep, and glow breathing.

### 11. Motivation-tier adaptation
- **Low:** hero, next due check, partner/witness privacy, sign action.
- **Medium:** default checks, terms, pause/resolve, provenance.
- **High:** full audit trail, proof history, partner permissions matrix, export/delete controls.

### 12. Accessibility
- **Contrast:** text and status labels clear AA+.
- **Targets:** sign, rows, partner card, pause/resolve, and overflow are 44px minimum.
- **Screen readers:** contract hero announces status, remaining time, partners/witnesses, consent, and next due check.
- **Consent/social data:** partner sharing, revoke, delete proof data, and private journal exclusion are explicit.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /contracts, contract, sign/signature, witness/partner, and commitment are present.
2. **Honest:** real, low-confidence, honest-null states cover contract, checks, visibility, signature, CIA.
3. **Premium:** commitment instrument is specific, not generic progress.
4. **Warm-dark:** glass hero and solid verification rows specified.
5. **Semantic glow:** orange pending, green signed, purple CIA.
6. **60/30/10:** status colors are functional and text-paired.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, labels, privacy boundary, reduced-motion.
11. **Consent:** proof sharing, revoke/delete, private data boundaries included.
12. **Catalog:** canon components reused.
13. **CIA voice:** non-shaming and evidence-led.

