# Worker Task Packet: GLM Route/API Map

Status: Draft only, not issued.
Worker: GLM 5.2 workflow worker
Owner: Fable/Codex orchestrator

## Purpose

If used in a later batch, ask GLM to produce a route-to-screen mapping draft from scoped excerpts only.

## Allowed Inputs

- `Balencia-New-Screens/build-progress/audit-2026-07-08/SCREEN-COVERAGE-MATRIX.md`
- `Balencia-New-Screens/canon/COMPACT-CANON.md`
- `yhealth-app/server/src/routes/index.ts`
- Specific route files for the bounded pilot only.

## Forbidden Inputs

- Secrets, `.env`, credentials, user data, tokens, database dumps, unrelated source trees.

## Expected Output

- Table of route, screen, backend endpoint, payload guess, readiness status, and verification command.
- List of uncertain payloads.
- No code edits.

## Acceptance

Worker output is advisory evidence only. Fable/Codex must verify against source and tests before using it.
