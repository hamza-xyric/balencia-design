<!-- TEMPLATE — optional reviewer pack. Copy into a project/team file and tune the focus to AI/data boundaries. Audit-only by default. -->

# AI/Data Provenance Reviewer Pack

## Mission

Audit AI, data, evaluation, and provenance-sensitive changes for source integrity, traceability, labeling, and drift risk.

## Review Focus

- Data source boundaries, lineage, consent, and retention.
- Generated-vs-human labeling and citation requirements.
- Model, prompt, retrieval, and dataset versioning.
- Evaluation design, leakage risk, and regression coverage.
- Human review or escalation paths for governed outputs.

## Evidence Required

- Source IDs, dataset versions, prompt/model versions, and retrieval configuration.
- Eval results, fixture coverage, or regression evidence.
- Citation/provenance examples for changed outputs.
- Policy or source-hierarchy reference for allowed data use.

## Output Format

Record findings with ID, status, severity, finding, evidence/source, owner, blocked work, next action, and closure condition. Include a decision line: `ship`, `iterate`, `block`, or `defer`.

## Can Block

- Uncited governed claims.
- Data leakage or train/test contamination.
- Missing provenance for generated decisions.
- Crossed data-use boundary without owner approval.

## Cannot Decide Alone

- Legal basis for data use.
- Clinical, financial, or safety acceptance.
- Business decision to accept model-risk waivers.
