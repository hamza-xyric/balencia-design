# Packet SP4 — `sid` (sessionId) claim threading in `generateTokens`

## Objective

ADR-2 requires `generateTokens` to be able to sign a `sessionId` claim into both the access and refresh JWTs when a caller provides one, while being 100% inert (no claim, no shape change) when a caller does not. This packet threads that capability through `src/middlewares/auth.middleware.ts` and confirms the `IJwtPayload` type in `src/types/index.ts` already carries the field, so downstream session-wiring packets (SP5 login/register/social, SP6 refresh, SP7 logout) have a frozen, verified contract to call `generateTokens({ userId, email, role, sessionId })` against.

**Verified finding — read before editing anything:** live source already satisfies the ADR-2 contract byte-for-byte. `IJwtPayload` (in `src/types/index.ts`) **already declares** `sessionId?: string` (confirmed live at the line shown below — this is not something that needs to be added). `generateTokens`'s parameter type is `Omit<IJwtPayload, 'iat' | 'exp'>`, which therefore **already** structurally permits an optional `sessionId` field, and both `jwt.sign()` calls inside `generateTokens` already sign the **same** `payload` object into both the access token and the refresh token (see embedded source below, lines 303 and 309 sign the identical `payload` variable). Consequently:
- Calling `generateTokens({ userId, email, role, sessionId: '<uuid>' })` **today, with zero code changes**, already signs `sessionId` into both tokens.
- Calling `generateTokens({ userId, email, role })` (no `sessionId` key) **today** already omits the claim entirely — `JSON.stringify`/JWT payload serialization drops keys with value `undefined`, and callers that don't pass the key at all never introduce it.
- All 5 existing call sites in the codebase (listed in §"Current call sites" below) already compile against this type and are functionally unaffected either way.

This is a **documentation-and-verification packet, not a behavior-change packet**. Per BIOS-003 architecture-plan amendment A7 ("re-derive all line references from live source, never trust the plan's line numbers/prose"), this resolves a minor imprecision in architecture-plan.md §7's SP4 one-liner ("IJwtPayload gains sessionId?: string") — that phrasing describes a state that is already true in live source, not a pending change. Plan §2's own verified-ground-truth table already says this correctly ("`IJwtPayload.sessionId?` declared but never populated" — i.e., the field exists, it's just unused by any caller yet). Do not re-declare or duplicate the field. Do not change the `generateTokens` runtime signature or logic.

The one legitimate, additive "modify" left for this packet: add JSDoc to `generateTokens` and to the `sessionId` field on `IJwtPayload` that makes the sid-threading contract explicit and self-documenting for the SP5/SP6/SP7/SP8 authors who will call it next — comments only, zero behavioral diff.

## Target files (exact absolute paths)

- **Modify (JSDoc only, no logic change):** `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/middlewares/auth.middleware.ts`
- **Verify only, no edit required (field already present):** `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/types/index.ts`
- **Do not touch (read-only context, confirms no regression):**
  - `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/utils/user.helpers.ts`
  - `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-session.controller.ts`
  - `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-registration.controller.ts`

## Embedded current source

### FULL file: `src/middlewares/auth.middleware.ts` (322 lines, verified live)

```ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.config.js';
import type { AuthenticatedRequest, IJwtPayload, UserRole } from '../types/index.js';
import { query } from '../config/database.config.js';

const ACCESS_TOKEN_COOKIE_PATH = '/';

/**
 * Extract token from request
 */
function extractToken(req: Request): string | null {
  
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // Check cookies
  const cookieToken = req.cookies?.['access_token'];
  if (cookieToken) {
    return cookieToken;
  }

  // Query parameter token removed for security — tokens in URLs are logged and
  // leaked via Referer headers. WebSocket auth uses socket.io handshake instead.

  return null;
}

/**
 * Verify and decode JWT token
 */
function verifyToken(token: string): IJwtPayload {
  try {
    const decoded = jwt.verify(token, env.jwt.secret, {
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    }) as IJwtPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw ApiError.unauthorized('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw ApiError.unauthorized('Invalid token');
    }
    throw ApiError.unauthorized('Token verification failed');
  }
}

async function loadAuthenticatedUser(decoded: IJwtPayload): Promise<IJwtPayload> {
  const userResult = await query<{
    id: string;
    email: string;
    is_active: boolean;
    role: UserRole | null;
  }>(
    `SELECT u.id, u.email, u.is_active, r.slug as role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1`,
    [decoded.userId]
  );

  if (userResult.rows.length === 0) {
    throw ApiError.unauthorized('User account no longer exists. Please log in again.');
  }

  const user = userResult.rows[0];
  if (!user.is_active) {
    throw ApiError.forbidden(
      'Your account has been blocked. Please contact our help center for assistance.'
    );
  }

  return {
    ...decoded,
    email: user.email,
    role: user.role ?? decoded.role,
  };
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string; expiresIn: number }
): void {
  // Older builds scoped access_token to /api, which prevented Socket.IO
  // handshakes at /socket.io from receiving the HttpOnly cookie.
  res.clearCookie('access_token', { path: env.api.prefix });

  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'strict',
    maxAge: tokens.expiresIn * 1000,
    path: ACCESS_TOKEN_COOKIE_PATH,
  });

  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: `${env.api.prefix}/auth/refresh`,
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie('access_token', { path: ACCESS_TOKEN_COOKIE_PATH });
  res.clearCookie('access_token', { path: env.api.prefix });
  res.clearCookie('refresh_token', { path: `${env.api.prefix}/auth/refresh` });
}

/**
 * Authentication middleware - requires valid JWT
 */
export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (!token) {
      throw ApiError.unauthorized('No authentication token provided');
    }

    const decoded = verifyToken(token);
    (req as AuthenticatedRequest).user = await loadAuthenticatedUser(decoded);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication - attaches user if token present, but doesn't require it
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (token) {
      const decoded = verifyToken(token);
      (req as AuthenticatedRequest).user = await loadAuthenticatedUser(decoded);
    }

    next();
  } catch {
    // Ignore token errors for optional auth
    next();
  }
}

/**
 * Role-based authorization middleware
 * Checks JWT role first, then falls back to database if role doesn't match
 * This handles cases where the JWT has a stale role after role changes
 */
export function authorize(...allowedRoles: UserRole[]) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest).user;

      if (!user) {
        next(ApiError.unauthorized('Authentication required'));
        return;
      }

      // Fast path: Check JWT role first (most common case)
      if (allowedRoles.includes(user.role)) {
        next();
        return;
      }

      // Slow path: JWT role doesn't match - check database for current role
      // This handles stale tokens after role changes
      const roleResult = await query<{ role: string }>(
        `SELECT r.slug as role FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         WHERE u.id = $1`,
        [user.userId]
      );

      if (roleResult.rows.length === 0) {
        next(ApiError.notFound('User not found'));
        return;
      }

      const dbRole = roleResult.rows[0].role as UserRole;

      // Update the user object with the database role for this request
      // (Note: This doesn't update the JWT, but allows the request to proceed)
      if (allowedRoles.includes(dbRole)) {
        // Update the request user object with the correct role
        (req as AuthenticatedRequest).user = {
          ...user,
          role: dbRole,
        };
        next();
        return;
      }

      // User doesn't have the required role in database either
      next(ApiError.forbidden(
        `Access denied. Required roles: ${allowedRoles.join(', ')}. ` +
        `Your current role is "${dbRole}". Please refresh your token or log out and log back in.`
      ));
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Check if user owns the resource or is admin
 */
export function authorizeOwnerOrAdmin(
  getResourceOwnerId: (req: Request) => string | Promise<string>
) {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest).user;

      if (!user) {
        throw ApiError.unauthorized('Authentication required');
      }

      // Admins have full access
      if (user.role === 'admin') {
        next();
        return;
      }

      const ownerId = await getResourceOwnerId(req);

      if (user.userId !== ownerId) {
        throw ApiError.forbidden('You do not have permission to access this resource');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Refresh token middleware
 */
export function verifyRefreshToken(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const refreshToken = req.body.refreshToken || req.cookies?.['refresh_token'];

    if (!refreshToken) {
      throw ApiError.unauthorized('No refresh token provided');
    }

    const decoded = jwt.verify(refreshToken, env.jwt.refreshSecret, {
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    }) as IJwtPayload;

    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(ApiError.unauthorized('Refresh token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(ApiError.unauthorized('Invalid refresh token'));
    } else {
      next(error);
    }
  }
}

/**
 * Generate JWT tokens
 */
export function generateTokens(payload: Omit<IJwtPayload, 'iat' | 'exp'>): {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} {
  const accessToken = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as string,
    issuer: env.jwt.issuer,
    audience: env.jwt.audience,
  } as jwt.SignOptions);

  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn as string,
    issuer: env.jwt.issuer,
    audience: env.jwt.audience,
  } as jwt.SignOptions);

  // Calculate expiry in seconds
  const decoded = jwt.decode(accessToken) as IJwtPayload;
  const expiresIn = decoded.exp ? decoded.exp - Math.floor(Date.now() / 1000) : 900;

  return { accessToken, refreshToken, expiresIn };
}

export default authenticate;
```

**Line anchors for the edit (re-verify against your own read before editing — do not assume these hold if the file has drifted since this packet was composed):**
- `generateTokens` function: lines 298–320 (JSDoc comment `/** Generate JWT tokens */` at 295–297).
- `IJwtPayload` import: line 6.
- `jwt.sign(payload, env.jwt.secret, ...)` (access token): line 303.
- `jwt.sign(payload, env.jwt.refreshSecret, ...)` (refresh token): line 309.

### `IJwtPayload` region — `src/types/index.ts` (lines 1–46 of 220; rest of file elided as irrelevant to this packet — it defines unrelated API/DB response types)

```ts
import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { RequestTrace } from '../middlewares/performance-tracing.middleware.js';

// Environment types
export type NodeEnv = 'development' | 'production' | 'test' | 'staging';

// User related types
export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  avatar?: string;
  phone?: string;
  lastLogin?: Date;
  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'user' | 'admin' | 'moderator' | 'doctor' | 'patient';

// JWT Payload
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId?: string;
}

// Extended Request with user
export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
  sessionId?: string;
  requestId?: string;
  trace?: RequestTrace;
}

// Controller handler type
export type AsyncHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;
```

**Confirmed: `sessionId?: string` is already present on `IJwtPayload` at line 37.** `AuthenticatedRequest.sessionId?: string` (line 43) is also already present and is separate/unrelated pre-existing plumbing (not populated by this packet; it is not the same thing as `IJwtPayload.sessionId` — do not conflate the two, and do not touch `AuthenticatedRequest.sessionId`, it is out of scope here).

### Current call sites (read-only context — proves "no behavior change"; do NOT modify these files in this packet)

All five existing call sites pass only `{ userId, email, role }` and must keep compiling and behaving identically after this packet:

```ts
// src/utils/user.helpers.ts:247
const tokens = generateTokens({
  userId: user.id,
  email: user.email,
  role: user.role,
});

// src/controllers/auth/auth-session.controller.ts:74  (login)
const tokens = generateTokens({
  userId: user.id,
  email: user.email,
  role: user.role,
});

// src/controllers/auth/auth-session.controller.ts:155  (refresh)
const tokens = generateTokens({
  userId: user.id,
  email: user.email,
  role: user.role,
});

// src/controllers/auth/auth-registration.controller.ts:211  (verify-registration)
const tokens = generateTokens({
  userId: user.id,
  email: user.email,
  role: user.role,
});

// src/controllers/auth/auth-registration.controller.ts:476  (socialAuth)
const tokens = generateTokens({
  userId: user.id,
  email: user.email,
  role: user.role,
});
```

Wiring these call sites to actually pass `sessionId` is explicitly **out of scope** for SP4 — that is SP5 (login/register/social), SP6 (refresh), SP7 (logout) work, gated on this packet landing first.

## Contract (verbatim — this is what SP5/SP6/SP7/SP8 will code against)

```ts
// src/types/index.ts — UNCHANGED, already true today:
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId?: string;
}

// src/middlewares/auth.middleware.ts — UNCHANGED signature, already true today:
export function generateTokens(payload: Omit<IJwtPayload, 'iat' | 'exp'>): {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

Behavioral contract (already satisfied by the code exactly as embedded above — this packet's job is to document + prove it, not to implement it):

1. `generateTokens({ userId, email, role, sessionId: '<uuid>' })` → both the returned `accessToken` and `refreshToken`, when JWT-decoded, contain a `sessionId` claim equal to `'<uuid>'`. Claim key is exactly `sessionId` (not `sid` — `sid` is the plan's shorthand name for the concept; the actual JWT claim key and TS field name are both `sessionId`).
2. `generateTokens({ userId, email, role })` (no `sessionId` key present at all) → neither decoded token contains a `sessionId` claim (key absent, not `null`/`""`).
3. `expiresIn` in the return value is computed exactly as today: `decoded.exp - Math.floor(Date.now() / 1000)` off the **access** token's decoded `exp`, falling back to `900` if `exp` is absent. This math is untouched by sessionId presence/absence.
4. All existing claims (`userId`, `email`, `role`) and JWT options (`issuer: env.jwt.issuer`, `audience: env.jwt.audience`, `expiresIn: env.jwt.expiresIn` / `env.jwt.refreshExpiresIn`) are unchanged.
5. Both tokens are signed from the **same** `payload` object reference — do not split them onto two independently-constructed payload objects; that would risk claim drift between access and refresh tokens.

Required edit — **JSDoc only, zero logic/signature change**:

```ts
/**
 * Generate JWT tokens (access + refresh).
 *
 * ADR-2 (BIOS-003): pass `sessionId` inside `payload` to thread the
 * per-device session id ("sid") into BOTH the access and refresh JWTs as a
 * `sessionId` claim. The refresh token's `sessionId` drives the
 * `user_sessions` lookup on `/auth/refresh` and `/auth/logout` (see
 * session.service.ts). The access token's `sessionId` is informational only
 * — `authenticate()` stays stateless and does not look it up.
 *
 * Omitting `sessionId` (or passing `undefined`) signs a token with no
 * `sessionId` claim at all, byte-identical to pre-BIOS-003 behavior —
 * required for legacy/no-session callers and for the dual-read `/refresh`
 * path (ADR-3) to distinguish "new model" tokens from "legacy" ones.
 */
export function generateTokens(payload: Omit<IJwtPayload, 'iat' | 'exp'>): {
```

Place this JSDoc immediately above `export function generateTokens(...)`, replacing the existing one-line `/** Generate JWT tokens */` comment at (currently) lines 295–297. No other line in the function body changes.

Optionally (still comment-only, apply if it does not conflict with the above insertion), add a one-line inline comment directly above each `jwt.sign(payload, ...)` call noting it carries `sessionId` when present:
```ts
  // Signs whatever is in `payload`, including `sessionId` when present (ADR-2).
  const accessToken = jwt.sign(payload, env.jwt.secret, {
```
```ts
  // Same payload object as accessToken — sessionId (if any) is identical in both.
  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, {
```

Do **not** add a JSDoc/comment change to `src/types/index.ts` — the field is already self-explanatory (`sessionId?: string`) and that file is not a target of this packet; leave it untouched.

## Acceptance criteria (mechanically checkable)

1. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && npm run typecheck` exits 0 (runs `tsc --noEmit`).
2. `git diff -- src/middlewares/auth.middleware.ts` shows **only** comment/JSDoc lines added or changed — no change to any executable line (no change to the `payload` parameter type, no change to either `jwt.sign(...)` call's arguments, no change to the `expiresIn` calculation, no change to the function's return statement).
3. `git diff -- src/types/index.ts` is **empty** (no changes to this file).
4. All 5 call sites listed above (`user.helpers.ts:247`, `auth-session.controller.ts:74`, `auth-session.controller.ts:155`, `auth-registration.controller.ts:211`, `auth-registration.controller.ts:476`) are untouched and still compile — verified transitively by (1).
5. Recommended (not a hard gate — formal automated coverage of this behavior lands in SP9's unit tests per architecture-plan.md §8): run a local one-off sanity check proving the two branches, e.g. via `tsx` scratch script or `node -e`:
   ```ts
   import { generateTokens } from './src/middlewares/auth.middleware.js';
   import jwt from 'jsonwebtoken';

   const withSid = generateTokens({ userId: 'u1', email: 'a@b.com', role: 'user', sessionId: 'test-uuid-123' });
   const noSid   = generateTokens({ userId: 'u1', email: 'a@b.com', role: 'user' });

   console.log('withSid access has sessionId:', (jwt.decode(withSid.accessToken) as any).sessionId === 'test-uuid-123');
   console.log('withSid refresh has sessionId:', (jwt.decode(withSid.refreshToken) as any).sessionId === 'test-uuid-123');
   console.log('noSid access has NO sessionId key:', !('sessionId' in (jwt.decode(noSid.accessToken) as object)));
   console.log('noSid refresh has NO sessionId key:', !('sessionId' in (jwt.decode(noSid.refreshToken) as object)));
   ```
   All four log lines must print `true`. Paste the output as evidence in the batch record; do not commit the scratch script.

## Out of scope

- Any change to `src/types/index.ts` (the field already exists; touching this file is a scope violation for this packet).
- Wiring `sessionId` into any caller (`user.helpers.ts`, `auth-session.controller.ts` login/refresh, `auth-registration.controller.ts` verify-registration/socialAuth) — that is SP5 (login/register/social issuance) and SP6 (`/refresh` dual-read) and SP7 (`/logout`).
- Creating `user_sessions` rows, `session.service.ts`, or any DB access — that is SP1 (DDL) and SP3 (session service).
- Formal Jest unit tests asserting sid-present/sid-absent token shape — that is SP9 per architecture-plan.md §7/§8 (this packet's §"Acceptance criteria" item 5 is a manual sanity check only, not a substitute for SP9's automated coverage).
- `verifyRefreshToken`/`authenticate` behavior changes (stays stateless per ADR-2 — access token `sessionId` is informational only, never looked up per-request). No changes to either function in this packet.
- Apple/Google verification (SP2/SP8), logout validator (SP7/A6), DDL/migration registration (SP1/A1/A2), atomic rotation (SP3/A5) — all separate packets.
