<!-- TEMPLATE - Saved Claude workflow or bounded Ultracode template. Fill a copy in a target project. Do not make /effort ultracode default. -->

# <WORKFLOW_NAME> - Saved Workflow Template

- Status: `draft` | `pilot` | `approved` | `retired`
- Owning Forgeflow runbook: `<runbooks/<workflow>.md>`
- Capability owner: `<person or role>`
- Intended use: `<bounded use case>`
- Do not use for: `<open-ended or high-risk cases>`
- Runtime primitive: `normal prompt` | `/goal` | `/loop` | `ultracode:`
- Runtime profile: `claude-native` | `<explicit worker profile>`
- Verify command: `<deterministic command>`
- Evidence path: `<repo-relative path>`
- Usage guard: `<token, usage, model, time, or cost guard>`
- Stop condition: `<observable stop condition>`

## Small First Run

- Scope:
- Files/items:
- Max agents/passes:
- Max time or turns:
- Expected output:
- Verify command:

## Source Review Checklist

- [ ] Source hierarchy reviewed.
- [ ] Tie-breaker source named.
- [ ] Active root confirmed.
- [ ] Archived or superseded sources excluded.
- [ ] Required references loaded.

## Scope Cap

Allowed:

- `<file, folder, item list, or pattern>`

Denied:

- Secrets, auth, billing, production, deployment, destructive migration, or private data changes.
- Final architecture, security, privacy, safety, production, or readiness decisions.
- Edits outside the allowed scope.
- Updating ledgers, progress, or handoff as final truth before orchestrator review.

## Workflow Prompt

```text
Use this workflow only for the bounded scope above.

Review the named sources first. Stay inside the scope cap, usage guard, and stop
condition. Write raw evidence to the evidence path. Treat findings and edits as
evidence until orchestrator verification.
```

## Output Format

```md
# Workflow Output - <WORKFLOW_NAME>

- Runtime primitive:
- Runtime profile:
- Sources reviewed:
- Scope:
- Usage guard:
- Stop condition:
- Verify command:
- Verify result:

## Findings

## Proposed Changes

## Evidence

## Follow-Up
```

## Closeout Writes

- [ ] Batch artifact updated.
- [ ] `findings-ledger.md` updated for accepted findings.
- [ ] `deferred-decisions.md` updated for unresolved decisions.
- [ ] `accepted-improvements.md` updated for accepted improvements.
- [ ] `_progress.md` updated.
- [ ] `plans/next-session-handoff.md` updated.

## Reviewer Checklist

- [ ] Small first run completed before approval.
- [ ] Output was more useful than a normal bounded prompt.
- [ ] Verify command ran or blocker/waiver is recorded.
- [ ] No hidden scope expansion occurred.
- [ ] Evidence is enough for a fresh session to audit.
- [ ] The workflow remains tied to its owning runbook.

## Retire If

- The workflow frequently expands scope.
- The usage guard is hard to enforce.
- Output cannot be verified deterministically.
- A normal Forgeflow prompt or worker packet is simpler.
