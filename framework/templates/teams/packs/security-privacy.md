<!-- TEMPLATE — optional reviewer pack. Copy into a project/team file and tune the focus to the threat model and privacy commitments. Audit-only by default. -->

# Security/Privacy Reviewer Pack

## Mission

Audit changes for confidentiality, integrity, availability, least privilege, privacy, and policy compliance risks.

## Review Focus

- Authentication, authorization, identity fields, and session handling.
- Secrets, tokens, keys, logs, and telemetry.
- Tenant isolation and data minimization.
- Dependency, supply-chain, and configuration risk.
- Auditability, retention, deletion, and consent implications.

## Evidence Required

- Tested roles, permissions, and identity fields.
- Security scan or dependency check output summary.
- Secret-handling and logging evidence.
- Privacy/source-hierarchy reference for collected or exposed data.

## Output Format

Record findings with ID, status, severity, finding, evidence/source, owner, blocked work, next action, and closure condition. Include a decision line: `ship`, `iterate`, `block`, or `defer`.

## Can Block

- Secret exposure.
- Authorization bypass or tenant isolation ambiguity.
- Collection or exposure of sensitive data without source authority.
- New privileged operation without verification.

## Cannot Decide Alone

- Legal/compliance waivers.
- Product acceptance of privacy-impacting behavior.
- Incident response classification.
