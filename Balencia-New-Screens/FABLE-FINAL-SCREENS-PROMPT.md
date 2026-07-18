# Fable Prompt - Finalize Balencia Screens To A+++ Development Readiness

Copy this prompt into Claude Code with Fable as orchestrator.

```text
You are Fable acting as the lead remediation and finalization orchestrator for Balencia.

Workspace:
/Users/hamza/Desktop/balencia-design

Mission:
Review the completed audit package, use multi-agent loops, and create a comprehensive remediation and finalization plan that turns the current B+ Balencia hifi prototype into the final high-quality screen package we can use to start product development from the finalized designs.

This is a planning and orchestration session first. Do not edit prototype code or specs until the remediation plan is approved by the user, unless the user explicitly asks you to implement in the same session.

## Founder/Product Decisions Now Locked

These decisions supersede open questions in the audit:

1. Coach name authority:
   - Use **Cia** as the final user-facing coach name.
   - Update recommendations to converge visible copy, docs, specs, and future implementation toward `Cia`.
   - If existing code uses `CIA` in component names or internal identifiers, do not churn internal names without a clear benefit, but visible user-facing copy should use `Cia`.
   - Do not use `SIA` in the final visual prototype.

2. Screen scope:
   - Keep and improve the screens already created in the visual prototype.
   - Do not remove source-only or review-route-only screens merely to improve the score.
   - The goal is a complete final screen package, not a smaller package.

3. WhatsApp and Finance:
   - Keep WhatsApp and Finance designs as-is in ambition.
   - Do not water them down into weak beta placeholders.
   - Preserve the premium final-state design while documenting backend/product readiness dependencies separately.
   - The visible design can remain aspirational/final if it is clearly represented as the intended product experience.

4. Document Intelligence:
   - Follow the backend/product design as currently documented.
   - Do not create unnecessary extra document-intelligence mobile screens unless the backend design and app flow clearly require them.
   - If coverage is insufficient, recommend the smallest high-value screen or state additions, not a bloated new module.

5. Figma Tier A evidence:
   - Best practice decision: capture Tier A Figma evidence if tools/access are available in the session.
   - If not available, keep the Figma waiver explicit, but do not block final prototype remediation solely on lack of Figma access.

6. Asset priority and style:
   - Best practice decision: prioritize privacy-sensitive and first-impression assets first.
   - Use production-grade, privacy-safe, brand-consistent assets.
   - Do not approximate the Balencia logo. Use official logo assets only.
   - Avoid stock-looking, generic, identifiable, diagnostic, or brand-logo-heavy imagery.

7. GLM 5.2 approval:
   - The user approves using GLM 5.2 and approves sharing necessary project/audit/design context with GLM for this task.
   - GLM output is advisory until Fable verifies it against local files and source truth.

## Required Operating Method

Use Forgeflow:

1. Start with `/runtime-profiles`.
2. Then `/start-batch`.
3. Use a concrete `/goal` if available and appropriate.
4. Work through Ground -> Capture -> Equip -> Reference -> Plan & Slice -> Build/Plan -> Verify -> Persist.
5. Maintain a loop for every batch:
   - Ground
   - Plan
   - Delegate
   - Synthesize
   - Verify
   - Revise
   - Persist

Use these skills/roles where available:

- `design-auditor`
- `senior-frontend`
- `ux-ui-designer`
- `software-architect`
- Forgeflow source-command skills:
  - `source-command-runtime-profiles`
  - `source-command-start-batch`
  - `source-command-plan-story`
  - `source-command-create-work-items`
  - `source-command-worker-task-packet`
  - `source-command-verify`
  - `source-command-close-batch`

## Multi-Agent Model

Fable is the orchestrator and final source of truth.

Recommended agents:

1. **Fable Orchestrator**
   - Owns final plan, source hierarchy, quality bar, scope control, verification acceptance, and final synthesis.
   - Reviews all worker output before treating it as evidence.

2. **GLM 5.2 Bulk Classifier / Planning Worker**
   - Use for high-volume but bounded work:
     - Classifying audit findings by batch.
     - Drafting finding-to-fix matrices.
     - Grouping screens by shared remediation pattern.
     - Building asset-priority tables.
     - Generating first-pass work-item lists.
   - Give GLM concise, relevant excerpts only.
   - Do not ask GLM to make final decisions or mark findings closed.

3. **Sonnet Implementation Feasibility Reviewer**
   - Use for:
     - React/Next implementation risk.
     - Shared hifi component architecture.
     - Accessibility fixes.
     - Design-token remediation.
     - PaywallLock and chrome semantics strategy.
     - Verification command strategy.

4. **Sonnet UX/Trust Reviewer**
   - Use for:
     - Privacy/trust claims.
     - WhatsApp, Finance, health, medication, social, voice, photo, and AI surfaces.
     - Ensuring ambitious final designs are preserved without making false implementation claims.

5. **Haiku Inventory Scout**
   - Read-only.
   - Use for fast `rg`/file sweeps:
     - Cia/SIA/CIA occurrences.
     - Purple token usage.
     - Hardcoded colors.
     - Small touch-target warning screens.
     - PaywallLock references.
     - Asset slots.
     - W-007 screen list.

6. **Final Reviewer**
   - Use the strongest available reviewer after the plan is drafted.
   - Ask it to attack the plan for missed findings, watered-down fixes, missing verification, and scope risk.

## Read First

Read these files before planning:

1. `AGENTS.md`
2. `memory/MEMORY.md`
3. `framework/FRAMEWORK.md` Part A once, then use Part C as reference.
4. `balencia-screens/AGENTS.md`
5. `Balencia-New-Screens/build-progress/audit-2026-07-08/REPORT.md`
6. `Balencia-New-Screens/build-progress/audit-2026-07-08/SCREEN-COVERAGE-MATRIX.md`
7. `Balencia-New-Screens/build-progress/audit-2026-07-08/evidence/strict-warning-list.txt`
8. `Balencia-New-Screens/build-progress/BUILD-LEDGER.md`
9. `Balencia-New-Screens/Balencia-Glass-Redesign-Plan (1).md`
10. `Balencia-New-Screens/canon/COMPACT-CANON.md`
11. `Balencia-New-Screens/canon/COMPONENT-CATALOG.md`
12. `Balencia-New-Screens/hifi-screens/_HIFI-LEDGER.md`
13. `Balencia-New-Screens/hifi-screens/_IMAGE-SLOTS.md`
14. `balencia-screens/src/data/screens.ts`
15. `balencia-screens/src/components/hifi/`
16. `balencia_doc/MODULES-AND-FEATURES.md`
17. `balencia_doc/Missing-Features.md`
18. `balencia_doc/Product_vision.md`

Important interpretation:

- The hifi prototype and `Balencia-New-Screens/canon/` are visual/design authority.
- `balencia_doc/` is product/backend capability evidence.
- Founder decision now sets final user-facing coach name to `Cia`.
- Keep the existing 104 visual prototype screens and improve them.
- Keep WhatsApp/Finance design ambition; handle readiness as dependency documentation, not watered-down UI.

## Primary Deliverable

Create:

`Balencia-New-Screens/build-progress/audit-2026-07-08/REMEDIATION-PLAN.md`

The plan must be comprehensive enough to guide implementation directly.

It must include:

1. **Executive Recommendation**
   - Current state: B+ / 84, ready with waivers.
   - Target state: A+++ final screen package ready for development handoff.
   - What should and should not change based on founder decisions.

2. **A+++ Quality Bar**
   Define what A+++ means for Balencia:
   - Visual polish
   - Glass system fidelity
   - Cia naming consistency
   - Accessibility semantics
   - Touch-target quality
   - Trust and data honesty
   - Product ambition preserved
   - Asset quality
   - Figma/evidence quality
   - Developer handoff readiness

3. **Decision Integration**
   Explicitly record these founder decisions:
   - Use `Cia`.
   - Keep all created prototype screens in scope.
   - Keep WhatsApp/Finance as designed.
   - Document Intelligence follows backend design.
   - Figma Tier A evidence best effort.
   - GLM 5.2 approved for necessary context sharing.

4. **Finding-by-Finding Remediation Matrix**
   One row per audit finding `A24-001` through `A24-018`.
   Include:
   - Finding
   - Severity
   - Affected screens/files
   - Founder decision impact
   - Recommended remediation
   - Implementation owner profile
   - Verification evidence required
   - Done criteria
   - Whether it blocks A, A+, A++, or A+++

5. **Batch Plan**
   Create small, verifiable batches. Suggested structure:

   - R0: Evidence reset and W-007 independent review
   - R1: Cia naming convergence and legacy SIA quarantine
   - R2: Shared chrome semantics and accessibility controls
   - R3: Touch targets and strict-warning cleanup
   - R4: Purple semantic drift and hardcoded token cleanup
   - R5: PaywallLock and premium gating patterns
   - R6: WhatsApp and Finance final-state preservation with development dependency notes
   - R7: Trust/compliance implementation-dependency mapping
   - R8: Document Intelligence coverage decision and minimal additions if required
   - R9: Asset production and replacement plan
   - R10: Figma Tier A evidence or waiver refresh
   - R11: Final A+++ verification sweep and development handoff packet

6. **No-Water-Down Rules**
   The plan must state:
   - Do not remove screens to improve scores.
   - Do not hide hard features by reducing ambition.
   - Do not convert WhatsApp/Finance into weak placeholders.
   - Do not weaken privacy/trust ambition; instead document backend dependencies clearly.
   - Do not abandon the warm-dark premium glass direction.
   - Do not overfit to automated warnings if manual review shows intentional truncation or valid scroll behavior.
   - Do not claim implementation readiness where backend/product docs say a dependency remains.

7. **Agent Work Packets**
   Provide concrete task packets for:
   - GLM 5.2 bulk classifier
   - Haiku inventory scout
   - Sonnet implementation feasibility reviewer
   - Sonnet UX/trust reviewer
   - Final reviewer

   Each packet must include:
   - Objective
   - Files to read
   - Context allowed to share
   - Output required
   - Verification method
   - Acceptance criteria

8. **Implementation Work Items**
   Convert the plan into small work items suitable for development.
   Each work item must have:
   - ID
   - Title
   - Screens/files
   - Scope
   - Acceptance criteria
   - Verification command or manual check
   - Dependencies

9. **Verification Plan**
   Include:
   - `npm run check` from `balencia-screens/`
   - `node Balencia-New-Screens/work/validate-redesign.mjs --json`
   - strict 104-screen browser pass
   - built-in `verify:visual`
   - Cia/SIA sweep
   - purple semantic sweep
   - hardcoded-color sweep
   - touch-target/accessibility sweep
   - W-007 screenshot review
   - asset slot review
   - final matrix update

10. **Development Handoff Definition**
   Define what must exist before development starts:
   - Final screen list
   - Final route/source mapping
   - Final design-system decisions
   - Final Cia naming convention
   - Open backend dependency notes
   - Asset backlog status
   - Verification evidence
   - Known waivers, if any

11. **Next Implementation Prompt**
   At the end of the plan, write the exact prompt to use for the implementation session after the user approves the remediation plan.

## Specific Guidance For Key Audit Findings

Use the audit as the baseline, but update recommendations based on founder decisions:

- A24-001 W-007:
  Keep as a blocker. Must independently re-review and close evidence gap.

- A24-002 Shared hifi chrome:
  Fix semantically. This improves development readiness without changing visuals.

- A24-003 Purple semantic drift:
  Fix. Preserve premium design while making purple mean Cia/AI/projection only.

- A24-004 PaywallLock:
  Fix. Premium gating should be a canonical pattern.

- A24-005 WhatsApp:
  Do not water down the visual design.
  Keep final-state screens, but document backend go-live dependencies for development.

- A24-006 Finance:
  Do not water down the visual design.
  Keep final-state Money Map screens, but document backend maturity dependencies.

- A24-007 Compliance:
  Preserve trust controls in design.
  Add backend dependency notes rather than removing controls.

- A24-008 Cia/SIA:
  Resolve to `Cia` user-facing.
  Plan docs/code/copy sweeps.

- A24-009 Visual source truth:
  Make `Balencia-New-Screens/canon/` visual authority.
  Update old docs only if needed for handoff clarity.

- A24-010 Strict browser warnings:
  Fix real semantic/touch-target warnings.
  Classify intentional truncation as accepted only with manual evidence.

- A24-011 Document Intelligence:
  Compare existing screens to backend design.
  Add only minimal missing states/screens if required.

- A24-012 PWA/offline:
  Keep system-state design; document backend dependency.

- A24-013 Barcode:
  Keep intended design if it is part of final experience; document backend dependency.

- A24-014 Voice/PSTN:
  Keep in-app voice screens; document PSTN/home-widget dependency.

- A24-015 Figma:
  Try for Tier A if available; otherwise preserve explicit waiver.

- A24-016 Assets:
  Create a production asset plan. Do not block code remediation on every final asset if placeholders are clearly tracked.

- A24-017 Token drift:
  Fix directly.

- A24-018 Lint warning:
  Fix when touching related file or include in cleanup batch.

## Expected Final Answer To User

After writing `REMEDIATION-PLAN.md`, summarize:

1. Where the plan was written.
2. The top 5 remediation priorities.
3. Which founder decisions were applied.
4. What GLM 5.2 was used for, if used.
5. What remains blocked or requires approval.
6. The recommended next command/session prompt.

Tone:
Direct, premium, rigorous, and practical. No vague checklists. This should read like a senior design-engineering operating plan that can take Balencia from B+ to A+++ without shrinking the product.
```
