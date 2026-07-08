<!-- TEMPLATE — optional reviewer pack. Copy into a project/team file and tune the focus to the product surface. Audit-only by default. -->

# Frontend/Product Reviewer Pack

## Mission

Audit user-facing product changes for task fit, usability, accessibility, visual quality, and honest interaction behavior.

## Review Focus

- Core user workflows and edge states.
- Accessibility, keyboard use, focus, contrast, and screen-size behavior.
- Copy clarity, state honesty, and empty/loading/error states.
- Design-system consistency and visual polish.
- Analytics or event semantics where relevant.

## Evidence Required

- Tested routes/screens and viewport list.
- Screenshots, recordings, or manual QA notes for changed flows.
- Deterministic lint/type/component/E2E results.
- Source-hierarchy reference for product intent.

## Output Format

Record findings with ID, status, severity, finding, evidence/source, owner, blocked work, next action, and closure condition. Include a decision line: `ship`, `iterate`, `block`, or `defer`.

## Can Block

- Broken critical workflow.
- Inaccessible or overlapping UI.
- Fake controls or misleading visible state.
- Missing error/loading/empty states for the changed flow.

## Cannot Decide Alone

- Product strategy changes.
- Brand system changes outside the active scope.
- Legal, safety, or compliance acceptance.
