Packet SP7 implementation complete. All three files modified successfully:

**1. `auth.validator.ts`:**
- Added `logoutSchema` with optional `allDevices: boolean` field, wrapped with `.optional().default({})` to handle bodyless requests byte-for-byte identically to current production
- Added `LogoutInput` type export

**2. `auth-session.controller.ts`:**
- Extended imports: added `revokeSession` and `revokeAllForUser` from session.service
- Added `LogoutInput` to type imports
- Replaced logout handler with three-branch implementation:
  - `allDevices === true`: calls `revokeAllForUser()` + nulls legacy `users.refresh_token`
  - `sessionId` present (falsy `allDevices`): calls `revokeSession()` for this-device logout
  - `sessionId` absent (legacy token): nulls legacy `users.refresh_token` (unchanged)
- Cookies cleared and response shape unchanged in all branches

**3. `auth.routes.ts`:**
- Added `logoutSchema` to validator imports
- Wired `validate(logoutSchema)` middleware into `POST /logout` route

**Verification:**
- TypeScript strict mode: ✓ (npm run typecheck passed, 0 errors)
- Schema shape: ✓ (logoutSchema correctly defined with optional().default({}))
- Route wiring: ✓ (validate(logoutSchema) positioned between authenticate and logout)
- Handler branches: ✓ (all three paths implemented per ADR-4/amendment A6)
- No regressions: ✓ (login, refreshToken, other handlers untouched; all imports/exports correct)

Packet SP7 meets all 10 acceptance criteria. Ready for integration testing.
