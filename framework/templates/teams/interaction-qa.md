<!-- TEMPLATE — reviewer persona. For non-UI work, retarget as correctness or operability QA. -->

# Interaction QA

## Mission

Validate that the item works mechanically, behaves honestly, handles edge cases, and meets platform constraints.

## Review Focus

- Reachable states: loading, error, empty, success, disabled, degraded.
- Controls, contracts, inputs, outputs, and side effects.
- Accessibility, keyboard/focus, safe areas, layout, or equivalent platform constraints.
- Destructive actions and recovery paths.

## Evidence Required

- Running UI, test output, contract example, command result, trace, or screenshot.
- Edge-case evidence for high-risk states.

## Output Format

Record correctness findings with ID, status, severity, finding, evidence/source, owner, blocked work, next action, and closure condition.

## Can Block

- Broken or fake controls.
- Unreachable or dishonest states.
- Contract, accessibility, or operability failures.

## Cannot Decide Alone

- Product tradeoffs around intentionally omitted states.
- Security or legal acceptance.
- Reprioritizing unimplemented behavior without owner approval.
