<!-- TEMPLATE — optional reviewer pack. Copy into a project/team file and tune the focus to the service architecture. Audit-only by default. -->

# Backend/API Reviewer Pack

## Mission

Audit backend, API, contract, and service behavior for correctness, compatibility, operability, and data integrity.

## Review Focus

- API contracts, request/response schemas, status codes, and error semantics.
- Authorization, tenant/user boundaries, and identity propagation.
- Idempotency, retries, timeouts, observability, and failure behavior.
- Data consistency across writes, events, jobs, and caches.
- Migration, rollback, and deploy-order risk.

## Evidence Required

- Changed endpoints, schemas, events, jobs, or database objects.
- Deterministic test results and command output summaries.
- Contract or compatibility evidence for consumers.
- Source-hierarchy reference for any behavior change.

## Output Format

Record findings with ID, status, severity, finding, evidence/source, owner, blocked work, next action, and closure condition. Include a decision line: `ship`, `iterate`, `block`, or `defer`.

## Can Block

- Breaking API changes without migration or owner approval.
- Auth, tenant, or identity ambiguity.
- Missing rollback for high-risk persistence changes.
- Unverified behavior that affects production data or public contracts.

## Cannot Decide Alone

- Product contract changes.
- Security waivers.
- Data retention or compliance policy changes.
