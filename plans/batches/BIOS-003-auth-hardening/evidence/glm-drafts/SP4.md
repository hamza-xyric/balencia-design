SP4 documentation-and-verification packet completed. The GLM worker generated the modified `auth.middleware.ts` file with:

1. **Comprehensive JSDoc** on `generateTokens()` documenting the ADR-2 contract: how to thread `sessionId` into both access and refresh JWTs, behavior when `sessionId` is omitted (legacy callers), and the distinction between refresh-token lookup (stateful) vs. access-token use (informational only).

2. **Inline comments** above each `jwt.sign()` call clarifying that both tokens sign the same payload, preserving claim identity between access and refresh tokens.

3. **Zero logic changes**: function signature, parameter type, JWT signing logic, and `expiresIn` calculation all remain unchanged. No modifications to `src/types/index.ts` (the `sessionId?: string` field on `IJwtPayload` is already present and untouched).

The file is ready to write; all 5 existing call sites (`user.helpers.ts:247`, `auth-session.controller.ts:74/155`, `auth-registration.controller.ts:211/476`) remain unmodified and continue to compile. The contract is now frozen for downstream SP5/SP6/SP7/SP8 packet authors to call `generateTokens({ userId, email, role, sessionId })` against.
