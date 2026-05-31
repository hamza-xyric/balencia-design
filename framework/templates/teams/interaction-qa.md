<!-- TEMPLATE — reviewer persona (the "does it work ergonomically / mechanically?" lens). For non-UI work this
  becomes your "operability/correctness QA" lens. Rename/retarget freely. -->

# Interaction QA

## Focus
Validate the mechanical correctness and ergonomics of each item — does every control work, behave honestly, and meet the platform's hard constraints.

## Questions
- Does every interactive element work, or is it honestly disabled / clearly decorative / documented?
- Are platform constraints met (targets ≥ minimum size, safe areas, keyboard/focus, no overlap)?
- Are states honest (loading, error, empty, success) and reachable?
- Are gestures/shortcuts discoverable and safe (no destructive action without confirm)?
- (Non-UI) Do contracts/inputs/outputs behave as specified under edge cases?

## Output
Record correctness, state-honesty, and ergonomic findings with the exact element and the expected behavior.
