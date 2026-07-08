# 46-accountability - hi-fi glass spec

### 1. Header
- **ID:** 46
- **Name:** Accountability
- **Route(s) covered:** no live route; legacy accountability management surface.
- **Frame:** Native mobile, 390x844 reference.
- **Tab:** Me / Social.
- **Source:** app_design 3/46-accountability.md and ascii_wireframes/46-accountability.md.
- **Batch:** 19

### 2. Purpose
Accountability manages opt-in partners, contracts, triggers, commitment rules, nudges, and audit trails. It turns social support into consent-based structure: partners only see what the user allows, and CIA intervenes gently before escalation.

### 3. Entry & exit
- **Entry:** Settings, Community, Home contract alert, CIA deep-link, or social shortcut.
- **Primary exit:** add partner, create contract, or create trigger.
- **Secondary exits:** contract detail, trigger detail, consent settings, community room.
- **Safety exit:** emergency contact rules expose clear consent and revoke paths.
- **Failure exit:** cached partners/contracts/triggers remain with SyncStatus.

### 4. Layout anatomy
**Regions, top to bottom:**
1. TopBar with "Accountability."
2. Master consent banner when permissions are incomplete.
3. SegmentedTabs: Partners, Contracts, Triggers.
4. Partners tab: partner rows, groups, emergency contacts, add partner.
5. Contracts tab: active contract cards with MomentumBar and CIA suggestion.
6. Triggers tab: rule rows, CIA intervene toggles, audit log.
7. FAB and GlassNavBar.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <        Accountability              |
| Consent: configure what partners see |
| [Partners] [Contracts] [Triggers]    |
| PARTNERS                             |
| Sarah K coach: motivation, failure   |
| Ahmed M buddy: motivation, failure   |
| Lisa mentor: emergency contact       |
| + add partner                        |
| CONTRACTS                            |
| Run 3x/week [############----] 80%   |
| 8 kept, 2 open, CIA nudge ready      |
| TRIGGERS: missed check-in -> nudge   |
| Today | CIA | Goals | Me             |
+--------------------------------------+
```

### 5. Components
- **TopBar** - title and back.
- **ConsentCard** - master privacy gateway.
- **SegmentedTabs** - Partners, Contracts, Triggers.
- **ListRow** - partners, groups, emergency contacts, trigger audit.
- **ProgressBar / MomentumBar** - contract fulfillment.
- **Toggle** - CIA intervene per trigger.
- **ChipProvenance** - partner permission, trigger source, audit event.
- **CIAInsightCard** - suggested contracts and nudge review.
- **SafetyResourceCard** - emergency contact and crisis rules.
- **PaywallLock** - Plus social feature gate where needed.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` warm dark; privacy content is calm, not alarming.
- **Semantic glows:** your commitment uses `--glow-you #FF5E00`; fulfilled checks use `--glow-done #34A853`; CIA intervention uses `--glow-cia #7F24FF`.
- **Contracts:** progress encodes fulfillment only, never shame or penalty.
- **Emergency:** safety rows use text and icon, not decorative red.
- **Type:** Neue Montreal plus one Tiempos italic word, e.g. "who keeps you *honest*?"

### 7. Content & copy
- **Consent:** "Your partners see only what you allow."
- **Partner rows:** "Sarah K. coach", "Ahmed M. buddy", "Lisa R. emergency contact."
- **Contracts:** "Run 3x/week", "No sugar weekdays."
- **Trigger:** "If inactive for 5 days, ask CIA before notifying Lisa."
- **Nudge copy:** "Room to recommit."
- **CTA labels:** "Add partner", "New contract", "Create trigger."
- **Empty copy:** "Set up one partner when support would help."

### 8. Data & honesty states
- **Partners:** real = accepted partner and permissions; low-confidence = invite pending; honest-null = no partners.
- **Contracts:** real = signed terms and progress; low-confidence = sync delayed; honest-null = no contract card.
- **Triggers:** real = active rule and audit trail; low-confidence = queued event; honest-null = no rules.
- **CIA nudges:** real = consented intervention; low-confidence = draft nudge; honest-null = no CIA intervention.
- **Controls:** social partners, contracts, emergency contacts, health evidence, CIA intervention, and third-party data expose consent/revoke/delete.

### 9. All states
- **Default:** consent, tabs, partner rows, contracts, triggers, and nav render.
- **Skeleton:** consent banner, tabs, rows, and contract bars shimmer.
- **Empty:** consent remains; no partners/contracts/triggers show starter actions.
- **Error:** cached rows remain and failed source is named.
- **Success:** added partner, signed contract, or trigger creation flashes green.
- **Disabled:** social features dim behind PaywallLock, missing consent, or offline state.

### 10. Motion & interaction
- **Load:** consent banner appears first, tabs then rows.
- **Tabs:** SegmentedTabs slide without layout jump.
- **Contract:** bar fills to fulfillment and opens detail on tap.
- **Trigger:** toggle asks for consent before enabling partner notification.
- **Nudge:** CIA nudge preview opens before escalation.
- **Reduced-motion:** disables bar fill, tab slide, and row stagger.

### 11. Motivation-tier adaptation
- **Low:** consent, one partner, active contract summary, no audit detail.
- **Medium:** default tabs.
- **High:** trigger logs, permission chips, audit trail, and contract history expanded.

### 12. Accessibility
- **Contrast:** paper text on `#0A0A0F` and `#211008` meets AA+.
- **Targets:** tabs, rows, toggles, CTAs, consent, and emergency controls are 44px minimum.
- **Screen readers:** partner rows announce role, permissions, emergency status, and revoke path.
- **Safety:** emergency contacts and crisis resources are clear and never hidden behind gamification.
- **Data controls:** partner, social, health, CIA, emergency, and third-party data can be revoked/deleted.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Connects:** accountability ties partners, contracts, triggers, CIA, and safety.
2. **Honest:** permissions and audit trails are explicit.
3. **Premium:** privacy-first commitment engine.
4. **Warm-dark:** canon surfaces applied.
5. **Semantic glow:** commitment, fulfillment, and CIA meanings stated.
6. **60/30/10:** orange commitment, green fulfillment, purple CIA.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **States:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high specified.
10. **Accessibility:** consent, 44px targets, safety, reduced-motion covered.
11. **Honesty triple:** real, low-confidence, honest-null defined.
12. **Catalog:** canon components used.
13. **CIA voice:** nudges are gentle and consented.
