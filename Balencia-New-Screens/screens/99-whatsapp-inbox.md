# 99-whatsapp-inbox - hi-fi glass spec

### 1. Header
- **ID:** 99
- **Name:** WhatsApp inbox
- **Route(s) covered:** /whatsapp
- **Tab:** CIA
- **Source:** Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Batch:** 20

### 2. Purpose
WhatsApp inbox is the integration hub for enrollment status, linked number, recent message history, notification templates, channel settings, and revoke/delete controls. It pairs with 03e enrollment and must make third-party data use and opt-out paths impossible to miss.

### 3. Entry & exit
- **Entry paths:** /whatsapp live route, enrollment completion [03e], CIA channel switcher, settings integration row, notification deep link, and Today communication prompt.
- **Primary exit:** Back returns to source; channel state stays synchronized.
- **Action exits:** `Open WhatsApp thread` opens external WhatsApp; `Manage WhatsApp` opens settings sheet; `Revoke WhatsApp access` opens destructive confirmation; `Delete message history` opens privacy sheet; `Resume in CIA chat` routes to coach context.
- **Failure exit:** sync or third-party API failure keeps linked-number status and revoke controls visible with System states [98] fallback.

### 4. Layout anatomy
**Regions, top to bottom:**
1. **TopBar** with title, sync status, and privacy/settings overflow.
2. **Hero GlassCard** for enrollment, linked number, last sync, and consent state.
3. **Inbox preview** with recent inbound/outbound items, template labels, and delivery/read status.
4. **Quick actions** for open thread, manage templates, quiet hours, and resume in CIA.
5. **ConsentCard** for WhatsApp data use, revoke, delete, and 24-hour message window.
6. **CIAInsightCard** explaining channel continuity only with consent.
7. **Footer** with support and third-party disclosure.

**ASCII wireframe (390x844):**
```text
+--------------------------------------+
| <  WhatsApp inbox           sync ... |
+--------------------------------------+
| +----------------------------------+ |
| | Linked number: +92 *** 4821     | |
| | Enrollment: active via 03e      | |
| | Last sync: 12 min ago           | |
| | [Manage WhatsApp]               | |
| +----------------------------------+ |
|                                      |
| Inbox preview                        |
| +----------------------------------+ |
| | inbound: meal photo received    | |
| | outbound: plan nudge delivered  | |
| | template: evening check-in      | |
| +----------------------------------+ |
| [Open WhatsApp thread] [Resume CIA] |
|                                      |
| +----------------------------------+ |
| | ConsentCard: WhatsApp data use  | |
| | Revoke access | Delete history  | |
| +----------------------------------+ |
| CIA keeps context only while linked  |
+--------------------------------------+
```

### 5. Components
- **TopBar** - sync status, settings, and back.
- **GlassStatCard** - linked number, enrollment, last sync, consent.
- **NotificationCard** - template and delivery history summary.
- **ChatComposer** - optional app-side reply entry when allowed by channel policy.
- **ConsentCard** - third-party data use, revoke, delete, retention, and 24-hour window.
- **CIAInsightCard** - channel continuity explanation with evidence.
- **ChipProvenance** - WhatsApp, enrollment [03e], last sync, template source, confidence.
- **Sheet** - settings, quiet hours, revoke, delete, template detail.
- **BtnPrimary / BtnSecondary / BtnGhost** - open thread, manage, resume, revoke/delete.
- **ErrorState / SkeletonState / HonestNullState** - catalog states.

### 6. Visual treatment
- **Atmosphere:** `#0A0A0F` with warm radial glow and grain; no WhatsApp-green takeover.
- **Glass tiering:** hero, ConsentCard, and CIA card use glass/frost; inbox rows use SolidCard on `#211008`.
- **Semantic glows:** open/manage action uses `--glow-you #FF5E00`; active link/sync success uses `--glow-done #34A853`; CIA continuity uses `--glow-cia #7F24FF`.
- **Type:** Neue Montreal throughout; hero can read `Linked *clearly*`, with Tiempos italic emphasis.
- **60/30/10:** orange for Balencia action, green only for active linked state, purple only for CIA context.

### 7. Content & copy
- **H1:** Linked *clearly*
- **Hero labels:** Linked number; enrollment; last sync; consent.
- **Inbox rows:** Meal photo received; plan nudge delivered; evening check-in template.
- **CIA line:** CIA keeps context across app and WhatsApp only while this link stays active.
- **Primary CTA:** Open WhatsApp thread
- **Secondary CTAs:** Manage WhatsApp; Resume in CIA; Revoke WhatsApp access; Delete message history
- **Empty copy:** WhatsApp is not linked yet. Start from enrollment [03e] or keep using in-app chat.
- **Error copy:** WhatsApp sync failed. Your revoke and delete controls are still available.
- **Privacy copy:** WhatsApp is a third-party channel. Delete or revoke access whenever you want.

### 8. Data & honesty states
- **Enrollment state:** real = linked/paused/revoked plus ChipProvenance; low-confidence = sync delayed; honest-null = not enrolled.
- **Linked number:** real = masked phone number; low-confidence = verification pending; honest-null = no number shown.
- **Message history:** real = last messages with direction, template, timestamp; low-confidence = delivery receipt missing; honest-null = no messages imported.
- **Consent/retention:** real = active consent and deletion window; low-confidence = revoke pending; honest-null = no third-party data stored.
- **CIA continuity:** real = message context consented; low-confidence = partial message window; honest-null = no cross-channel claim.

### 9. All states
- **Default:** active enrollment hero, inbox preview, channel actions, ConsentCard, and CIA explanation.
- **Skeleton:** masked number, sync, and message rows shimmer without fake content.
- **Empty:** HonestNullState offers enrollment handoff and in-app chat alternative.
- **Error:** sync failure keeps linked status and revoke/delete controls; retry is clearly labeled.
- **Success:** manage/revoke/delete updates hero and ConsentCard with `--glow-done`.
- **Disabled:** open thread, composer, template, or CIA resume dim to 40% with reason when revoked, outside message window, offline, or unverified.

### 10. Motion & interaction
- **Load:** hero reads first, inbox rows follow in 40ms stagger.
- **Sync:** small sync status updates textually; no endless spinner.
- **Revoke/delete:** confirmation Sheet names exactly what data is affected and keeps cancel equal prominence.
- **External open:** handoff warning appears before leaving app.
- **Reduced-motion:** disables row cascade and glow breathing; status changes are instant.

### 11. Motivation-tier adaptation
- **Low:** enrollment state, one open/manage action, revoke/delete visible.
- **Medium:** default inbox preview, quiet hours, templates, CIA continuity.
- **High:** delivery audit, template library, 24-hour window detail, export/delete logs.

### 12. Accessibility
- **Contrast:** all text/chips clear AA+ on warm-dark surfaces.
- **Targets:** sync, settings, open thread, manage, revoke, delete, and message rows are 44px minimum.
- **Screen readers:** linked number is masked and announced as masked; message rows announce direction, timestamp, delivery, and template.
- **Consent/third-party:** revoke, delete, retention, and third-party disclosure are first-screen controls.
- **Reduced-motion:** mirrors Section 10.

### 13. Premium checklist
1. **Source-specific:** /whatsapp, enrollment, inbox, settings, third-party consent, revoke/delete are present.
2. **Honest:** real, low-confidence, honest-null states cover enrollment, number, messages, consent, and CIA.
3. **Premium:** channel hub is specific, not a generic chat page.
4. **Warm-dark:** glass hero, solid inbox rows, radial atmosphere.
5. **Semantic glow:** orange action, green active link, purple CIA continuity.
6. **60/30/10:** WhatsApp brand color does not dominate.
7. **Type:** Neue Montreal plus one Tiempos italic word.
8. **All states:** Default, Skeleton, Empty, Error, Success, Disabled covered.
9. **Motivation tiers:** low, medium, high variants.
10. **Accessibility:** 44px targets, masked-number narration, contrast, reduced-motion.
11. **Consent:** revoke/delete/retention and third-party disclosure are explicit.
12. **Catalog:** canon components reused.
13. **CIA voice:** calm, consent-aware, and channel-specific.

