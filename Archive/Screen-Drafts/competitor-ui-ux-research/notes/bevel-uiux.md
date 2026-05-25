# Bevel UI/UX Notes

## Evidence Reviewed

- Official health metric screens: strain, sleep, recovery.
- ScreensDesign captures: onboarding, Apple Health permission, paywall, food logging, mood logging.
- 60fps.design thumbnails: loading and microinteraction evidence.
- Official Bevel site copy and App Store metadata for feature context.
- YouTube evidence: Bevel 3.0 launch, Bevel Intelligence demo, Biological Age demo, and third-party Bevel 3.0 pricing critique.

## Visual System

- Bevel is mostly light-mode, low-friction, and Apple-native in tone. It uses white and soft gray surfaces, black text, pill controls, and selective status color.
- 
- Color is semantic rather than branded everywhere: green for recovery/normal/good states, orange/red/yellow for strain intensity, blue/purple for sleep stages and some mood states.
- UI chrome is intentionally quiet. The strongest visual elements are health rings, charts, segmented controls, large CTAs, and illustrated onboarding panels.
- Rounded cards, oversized pills, and floating controls create a soft consumer-health feel. The system feels approachable, not clinical.
- Typography appears close to native iOS scale: large centered onboarding headlines, 16-20pt card labels, heavy numeric score treatment.

## Layout Patterns

- Metric detail screens lead with a large title, a single dominant score/chart, then supporting interpretation below.
- Recovery uses an emotionally reassuring hero ring and a short insight card before the timeline. The screen teaches the user what the number means.
- Strain uses a scrollable chart with range overlays, segmented period controls, and a breakdown legend.
- Sleep stages use a dark detail mode, compact stat cards, and a stage chart that reads quickly even with dense data.
- Food logging is highly task oriented: photo slot, detected item cards, serving controls, edit/remove actions, date row, then one sticky primary CTA.
- Onboarding screens are sparse, centered, and step-based, with progress bars and one primary action per screen.
- Video evidence for Bevel Intelligence adds a second primary layout pattern: dashboard-level AI entry through suggested actions and typed input, then deeper chat/history/memory controls one layer away.
- Biological Age and Health Records evidence extends the metric model from daily scores into long-term trend interpretation and medical-context storage.

## Navigation

- Evidence suggests iOS-native stack navigation, modal sheets, and single-task flows.
- Onboarding is linear and gated, with one clear CTA per step.
- Metric cards appear to deep-link into detail pages. Detail pages use a top-left close/back control and contextual right-side controls.
- Paywall uses a full-screen modal with plan cards and a large CTA, leaning on trust signals before price commitment.
- Bevel Intelligence appears reachable from the home dashboard, with suggested action chips for food logging, workout generation, and data analysis.
- Video evidence references a swipe-left area for chat history, health records, files, and settings, suggesting an AI workspace around memory and controls rather than a single isolated chat screen.

## Interaction Design

- Bevel relies on smooth chart transitions, draggable/scrollable controls, tabbed metric selectors, and native permission flows.
- 60fps evidence emphasizes polished loading, morphing, and transition states rather than decorative animation.
- Empty/loading states are explicit and calming. The Energy Bank loading state gives a time expectation and asks the user not to close the app.
- Mood logging uses a tactile slider plus an expressive central visual, making a subjective input feel concrete.
- Food logging exposes editability after AI/photo detection, which reduces trust risk.
- Bevel Intelligence Files are presented as a visible memory layer: the user can inspect what BI knows, and generated artifacts such as charts can be edited or deleted.
- Proactive check-ins and suggested actions make the AI feel embedded in the user's day instead of waiting behind a blank composer.

## Motivation Model

- Bevel motivates through interpretation: "what does this score mean for today?"
- It avoids punishment. Status language frames data as range, readiness, or guidance.
- Onboarding and paywall both emphasize capability and confidence rather than pressure.
- Health Access is positioned as required infrastructure, using the native Apple permission model instead of custom complexity.
- Bevel 3.0's strongest motivational shift is from "look at your data" to "a coach understands your body and adapts the plan."
- Third-party pricing critique shows a value-perception risk: once the experience is framed around a high paid tier, users judge even strong AI features through the question of whether the upgrade is worth it.

## Balencia Takeaways

### Borrow

- Put one dominant interpretation object at the top of each metric/detail screen.
- Use SIA cards to translate raw numbers into next action before showing dense history.
- Keep logging flows editable after AI detection.
- Treat loading and data sync as designed states, not spinners.
- Use native permission screens and prepare users before asking.
- Make SIA memory visible, editable, and deleteable through a Files/Personal Wiki-like surface.
- Put SIA suggestions directly on Today/dashboard, with chips that launch real workflows.
- Let health records and logs strengthen future coaching, not only populate static history.

### Avoid

- Do not copy Bevel's health-only information architecture. Balencia needs cross-domain context, not isolated health modules.
- Do not overuse soft pastel illustration if Balencia stays premium dark-first.
- Do not let a paywall become the most polished screen in the experience.
- Do not introduce a premium tier in a way that makes price/value skepticism dominate the first impression of SIA.

### Adapt Carefully

- Bevel's simplicity works because the domain is constrained. Balencia should apply the same visual clarity inside each domain, but keep SIA as the unifying layer.
- Bevel's light UI is accessible and calm. Balencia can keep dark default, but should validate light mode for broader usability.
- Bevel's onboarding is polished but step-heavy. Balencia's SIA onboarding should keep the same clarity and progress visibility while feeling conversational.
- Bevel's Files and Health Records pattern is powerful but sensitive. Balencia should provide provenance, user control, and clear explanations before relying on private records for coaching.
