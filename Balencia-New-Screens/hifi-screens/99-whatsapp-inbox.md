# 99-whatsapp-inbox - A+++ hi-fi mobile spec

## Header
- **Source ID:** 99
- **Source spec:** `Balencia-New-Screens/screens/99-whatsapp-inbox.md`
- **Evidence:** screens/99-whatsapp-inbox.md, Archive/2026-07-06/features.md, Archive/2026-07-06/routes.csv, canon/COMPACT-CANON.md, canon/COMPONENT-CATALOG.md
- **Route(s):** `/whatsapp`
- **Frame:** 390x844 native mobile
- **Priority:** converted with asset slots

## Reviewer Synthesis
- **Source Fidelity Reviewer:** preserve the repaired source intent: WhatsApp inbox is the integration hub for enrollment status, linked number, recent message history, notification templates, channel settings, and revoke/delete controls.
- **Premium Visual Director:** make WhatsApp inbox hero the above-fold focal moment, then keep supporting modules quiet, legible, and source-specific.
- **Interaction and State Designer:** carry forward the source's default, skeleton, empty, error, success, disabled, offline, and reduced-motion treatments without fabricated values.
- **Trust and Safety Reviewer:** WhatsApp inbox exposes audience, visibility, report, mute, block, and own-content delete controls before sharing or social comparison.
- **GLM directions considered:** conservative canon-faithful, premium cinematic, and dense operational. **Chosen:** cinematic focal instrument with operational evidence below.

## Final Composition

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

Route handling: `/whatsapp`
```

## Focal Hierarchy
- **Dominant focal moment:** WhatsApp inbox hero; it should be visually singular, not one tile among many.
- **Secondary layer:** TopBar with title, sync status, and privacy/settings overflow. with CIA only when the source supports a synthesized read.
- **Operational layer:** CIAInsightCard explaining channel continuity only with consent., Footer with support and third-party disclosure., H1, Hero labels.
- **Persistent action:** a single source-appropriate CTA or FAB; secondary actions stay as ghost pills or row actions.

## Visual System
- Warm dark base `#0A0A0F`, top-center amber radial glow, and 3-4 percent grain.
- Glass is selective: focal surfaces, CIA synthesis, sheets, nav, and floating controls. Dense lists, histories, tables, and charts use solid surfaces.
- Semantic glow only: orange for member effort, green for completion or healthy arrival, purple for CIA synthesis/projection.
- Neue Montreal for UI; one Tiempos italic emphasis moment: `*inbox*`.
- Avoid decorative gradients, fake streak spectacle, and any visual claim not backed by source data.

## Figma Reference Alignment
- **Language-derived evidence:** no direct WhatsApp Inbox frame was visible in the supplied screenshots and Figma MCP returned an access error in this pass.
- **Integration-hub anatomy:** provider-neutral shell, masked linked number hero, sync/receipt chips, 24-hour reply-window state, template rows, `ConsentCard`, external handoff warning, and no WhatsApp logos/brand art beyond text labels required by the feature.

## Components
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

## Data Honesty
- **Enrollment state:** real = linked/paused/revoked plus ChipProvenance; low-confidence = sync delayed; honest-null = not enrolled.
- **Linked number:** real = masked phone number; low-confidence = verification pending; honest-null = no number shown.
- **Message history:** real = last messages with direction, template, timestamp; low-confidence = delivery receipt missing; honest-null = no messages imported.
- **Consent/retention:** real = active consent and deletion window; low-confidence = revoke pending; honest-null = no third-party data stored.
- **CIA continuity:** real = message context consented; low-confidence = partial message window; honest-null = no cross-channel claim.

## Consent and Safety
- WhatsApp controls include export imported history, revoke access, delete imported messages/media/templates, pause/resume CIA continuity, disconnect linked number, retention/deletion window, and 24-hour reply-window state.
- Inbound crisis language triggers private crisis-resource handling inside Balencia without sending any support content back to WhatsApp unless the user chooses to write it.
- Keep navigation targets aligned to `/whatsapp`. Do not add alternate vanity routes.

## States
- **Default:** active enrollment hero, inbox preview, channel actions, ConsentCard, and CIA explanation.
- **Skeleton:** masked number, sync, and message rows shimmer without fake content.
- **Empty:** HonestNullState offers enrollment handoff and in-app chat alternative.
- **Error:** sync failure keeps linked status and revoke/delete controls; retry is clearly labeled.
- **Success:** manage/revoke/delete updates hero and ConsentCard with `--glow-done`.
- **Disabled:** open thread, composer, template, or CIA resume dim to 40% with reason when revoked, outside message window, offline, or unverified.

## Motion
- **Load:** hero reads first, inbox rows follow in 40ms stagger.
- **Sync:** small sync status updates textually; no endless spinner.
- **Revoke/delete:** confirmation Sheet names exactly what data is affected and keeps cancel equal prominence.
- **External open:** handoff warning appears before leaving app.
- **Reduced-motion:** disables row cascade and glow breathing; status changes are instant.

## Image Slots
- `HIFI-99-01` - content proof or instructional media slot; screen-specific; premium warm-dark product placeholder. Prompt: WhatsApp inbox provider-neutral WhatsApp status art, Balencia warm-dark glass UI asset, privacy-safe, no brand logos, no readable UI text.

## Implementation Notes
- Route header must stay aligned with the repaired source: `/whatsapp`.
- Use source component names before inventing new controls.
- Preserve all source honesty states, provenance chips, and consent exits in implementation.
- Accessibility source reminders: **Contrast:** all text/chips clear AA+ on warm-dark surfaces.; **Targets:** sync, settings, open thread, manage, revoke, delete, and message rows are 44px minimum.; **Screen readers:** linked number is masked and announced as masked; message rows announce direction, timestamp, delivery, and template.
