---
type: story
id: S16.6.1
title: Coach Contract-Aware Tools & proposeContract
epic: E16
epic_name: Accountability Contract Hardening, Witness Verification & Analytics Engine
feature: F16.6
feature_name: Coach Contract Awareness
product: yhealth-platform
priority: P0
status: Done
created: 2026-07-08
---

# S16.6.1: Coach Contract-Aware Tools & proposeContract

## User Story

**As a** user talking to SIA day-to-day,
**I want to** SIA to actually know about the commitments I've made — able to see them, draft a contract from our conversation, and reason across chat commitments, pledges, and binding contracts as one connected ladder,
**So that** "SIA holds me accountable" is something it can actually do, not just say.

---

## Story Type

- [x] Feature
- [ ] Enhancement
- [ ] Technical
- [ ] Integration

## Priority

- [x] Must Have (P0)
- [ ] Should Have (P1)

---

## Scope Description

**Remediates:** C-5 (AI coach has zero contract awareness), Arch-2 (three disconnected commitment layers)

**Problem (pre-remediation):** SIA had zero contract-awareness tools across its ~25 tool domains or its live coaching context — the product's core promise ("SIA enforces your commitments") was structurally false. Separately, a commitment-tracking path (`commitment-tracker.service.ts`) was scripted to deliver escalating "tough love" messaging about commitments the coach had no way of verifying were actually broken (see S16.6.2 for the anti-gaslighting fix).

**What shipped:** a unified tool domain, `server/src/services/langgraph-tools/domains/accountability.ts`, registering: `getMyContracts`, `getContractDetails`, `getAccountabilitySummary`, `proposeContract`, `createPledge`, `getMyCommitments`, `resolveCommitment`, and a cancel-commitment tool — the unified toolset across all three previously-disconnected commitment layers (chat commitments, soft pledges, binding contracts), resolving Arch-2.

- `proposeContract` always creates a **draft**, never an active/binding contract — enforcement only starts once the user explicitly signs it in the Contracts tab. A deliberate safety boundary: SIA can suggest stakes but cannot unilaterally impose them.
- Escalation ladder built into tool descriptions:
  - `createPledge`: "A pledge is the soft rung below a binding contract... If they keep breaking pledges in a category, escalate to `proposeContract`."
  - `resolveCommitment`: "Repeated unfulfilled commitments in a category are a strong signal to suggest a binding contract."
- `getMyContracts`, `getContractDetails`, `getAccountabilitySummary` always query live DB state, never a stale cached context snapshot — accurate even mid-conversation.

---

## Acceptance Criteria

```gherkin
Scenario: getMyContracts exposes real current state
  Given a user asks SIA "what contracts am I on?"
  When getMyContracts is called
  Then it returns the user's real, current contract list from the database

Scenario: proposeContract always creates a draft
  Given SIA proposes a contract based on conversation
  When proposeContract executes
  Then the created contract's status is "draft"
  And it never becomes active without the user explicitly signing it

Scenario: Escalation ladder guidance is present in tool descriptions
  Given the createPledge and resolveCommitment tool schemas
  When SIA reasons about repeated broken pledges/commitments
  Then the tool descriptions explicitly guide escalation toward proposeContract for a binding contract

Scenario: Underspecified proposeContract call is rejected gracefully
  Given SIA calls proposeContract with an incomplete condition_details payload
  When the validator runs
  Then the tool returns a structured error
  And SIA asks a clarifying follow-up rather than creating a malformed draft

Scenario: Contract tool calls always reflect live state
  Given a user asks about a contract mid-conversation before context was refreshed
  When getContractDetails is called
  Then it queries live DB state, not a stale cached context snapshot
```

---

## Success Metrics

- Coach tool domains with zero contract awareness: 0 (down from 25 of 25)
- `proposeContract` calls that create anything other than a `draft`: 0

---

## Constraints & Requirements

| Performance | Security | Privacy | Accessibility | Compatibility |
|-------------|----------|---------|---------------|---------------|
| Tool calls fit within a conversational turn's latency budget | `proposeContract` cannot create an active/binding contract under any input | Tools scoped to the authenticated user's own contracts only | N/A (backend/tool layer) | Unified toolset replaces three previously-disconnected commitment layers without breaking existing pledge/commitment endpoints |

---

## Dependencies

- **Prerequisite Stories:** S16.1.1 (contract lifecycle these tools query), S16.2.1/S16.3.1 (evaluator/resolver correctness these tools surface)
- **Related Stories:** S16.6.2 (context injection complements these tools), S16.6.3 (first-slip logic reads the same violation data)
- **External Dependencies:** Epic 11 (SIA Cognitive OS) langgraph tool registry
- **Remediates:** C-5, Arch-2

---

## Edge Cases & Errors

| Scenario | Detection | Recovery Behavior | User Communication |
|----------|-----------|-------------------|-------------------|
| User asks SIA about a contract mid-conversation before context was refreshed | Tool call `getContractDetails` | Always queries live DB state, not a stale cached context snapshot | Accurate, current answer |
| `proposeContract` invoked with an underspecified condition | Validator rejects incomplete `condition_details` | Tool returns a structured error; SIA asks a clarifying follow-up rather than creating a malformed draft | "I need a bit more detail before I can draft that — how should we measure it?" |
| SIA attempts to bypass the draft-only boundary | `proposeContract` schema hard-codes `status: 'draft'` | No code path in the tool can set any other status | N/A — structurally impossible |

---

## Open Questions

None — tool contract and draft-only boundary are fully specified.

---

## Definition of Done

- [x] `getMyContracts`, `getContractDetails`, `getAccountabilitySummary` expose real, current contract state to SIA
- [x] `proposeContract` always creates `status: 'draft'` — never active
- [x] `createPledge` and `resolveCommitment` tool descriptions encode the escalation ladder (commitment → pledge → contract)
- [x] Unified toolset resolves the three previously-disconnected commitment layers (Arch-2)
- [x] Tool schema/contract tests passing
- [x] No dead code, no console logs

---

*Story S16.6.1 | Epic E16 | Product: Balencia Platform*
