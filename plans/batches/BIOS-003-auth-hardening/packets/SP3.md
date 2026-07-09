# Packet SP3 — Session Service (`src/services/session.service.ts`)

## Objective

Create the pure, DB-backed session service that owns all `user_sessions` reads/writes for BIOS-003's per-device refresh-token model: creating a session on login/register/social, atomically rotating it on `/auth/refresh` with reuse detection (amendment A5's binding CAS algorithm), revoking one or all of a user's sessions on logout, and evicting over-cap sessions by LRU. This is a leaf module — no controller/route wiring, no HTTP concerns, no tests. Everything it does is parameterized SQL against the already-live `user_sessions` table; it never stores or logs a raw token, only its sha256 hash.

## Dependency status (verified live, 2026-07-09 — do not re-derive from plan prose)

Both of this packet's plan-declared dependencies are **already landed** in the live repo:

- **SP1** (`user_sessions` DDL + migration wiring) is done: `src/database/tables/146-user-sessions.sql` exists (table number resolved to `146`, per amendment A1 — not `03` as the un-amended plan body said), `EXPECTED_TABLES` in `src/database/auto-migrate.ts` includes `'user_sessions'` (line 370), and the timestamped migration `src/database/migrations/20260709021904_create_user_sessions.sql` is registered (line 1296 area). SP3 does not need to touch any of this.
- **SP4** (`sid` threading in `generateTokens`) is also done: `src/middlewares/auth.middleware.ts`'s `generateTokens()` already signs an optional `sessionId` into both tokens, and `IJwtPayload` already declares `sessionId?: string`. SP3 does **not** call `generateTokens` at all (that's SP5/SP6/SP7's job) — it only imports `hashRefreshToken` from that same file. Mentioned here only so you don't waste time re-verifying it.

No other packet's code exists yet. `src/services/session.service.ts` does not exist — this is a pure file creation.

## Target files

- **CREATE**: `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/session.service.ts`

No other file is modified by this packet.

## Embedded current source

Nothing is being modified, so there is no "before" diff base. Below is the **full relevant content of every live file this new module depends on** — import paths, exact signatures, and the exact schema it writes to. Do not invent any name, path, or column not shown here.

### `src/database/tables/146-user-sessions.sql` (full file, already applied — table exists in dev DB)

```sql
-- ============================================
-- USER SESSIONS TABLE  (per-device refresh tokens)
-- ============================================
-- One row per active device session. Stores the sha256 hash of the current
-- refresh token (never the raw token). Rotation-on-use updates the hash in
-- place (no history table); reuse of a superseded token revokes the whole
-- session. BIOS-003 auth hardening (architecture-plan.md ADR-1/ADR-2/ADR-3,
-- amendment A5). No updated_at trigger — do NOT register this table in
-- 99-triggers.sql; last_used_at/rotated_at are maintained explicitly by the
-- session-rotation code path (session.service.ts, a later BIOS-003 packet).

CREATE TABLE IF NOT EXISTS user_sessions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,               -- sha256(refresh JWT)
    device_id          TEXT,                          -- client-generated stable per-install id
    device_name        TEXT,                          -- best-effort label (e.g. "iOS 18 · balencia")
    client_type        VARCHAR(16) NOT NULL DEFAULT 'mobile', -- 'mobile' | 'web'
    user_agent         TEXT,
    ip_address         INET,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    rotated_at         TIMESTAMPTZ,                     -- set on each successful rotation (amendment A5 atomic CAS); NULL until first rotation
    expires_at         TIMESTAMPTZ NOT NULL,          -- = created/rotated + JWT_REFRESH_EXPIRES_IN
    revoked_at         TIMESTAMPTZ                     -- non-null = revoked (logout or reuse-detected)
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id     ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active      ON user_sessions(user_id, revoked_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at  ON user_sessions(expires_at);
```

Columns you will read/write: `id, user_id, refresh_token_hash, device_id, device_name, client_type, user_agent, ip_address, last_used_at, rotated_at, expires_at, revoked_at`. Note the `rotated_at` column — it exists specifically for amendment A5's CAS and its own comment says the rotation code path must set it. `created_at`/`last_used_at` default to `NOW()` at insert time; you do not set `created_at` explicitly.

### `src/middlewares/auth.middleware.ts` — imports + `hashRefreshToken` + `generateTokens` (exact, current)

Lines 1–8 (imports):

```ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.config.js';
import type { AuthenticatedRequest, IJwtPayload, UserRole } from '../types/index.js';
import { query } from '../config/database.config.js';
```

Lines 87–89 (`hashRefreshToken` — this is the only thing SP3 imports from this file):

```ts
export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
```

Import it as: `import { hashRefreshToken } from '../middlewares/auth.middleware.js';` (relative path from `src/services/session.service.ts`).

Lines 296–334 (`generateTokens` — embedded for context only, SP3 does not call it, but its `exp`-decoding pattern is what `session.service.ts` must mirror for computing `expires_at`, per this packet's ms-parsing resolution below):

```ts
/**
 * Generate JWT tokens (access + refresh).
 *
 * ADR-2 (BIOS-003): pass `sessionId` inside `payload` to thread the
 * per-device session id ("sid") into BOTH the access and refresh JWTs as a
 * `sessionId` claim. The refresh token's `sessionId` drives the
 * `user_sessions` lookup on `/auth/refresh` and `/auth/logout` (see
 * session.service.ts). The access token's `sessionId` is informational only
 * — `authenticate` stays stateless and does not look it up.
 *
 * Omitting `sessionId` (or passing `undefined`) signs a token with no
 * `sessionId` claim at all, byte-identical to pre-BIOS-003 behavior —
 * required for legacy/no-session callers and for the dual-read `/refresh`
 * path (ADR-3) to distinguish "new model" tokens from "legacy" ones.
 */
export function generateTokens(payload: Omit<IJwtPayload, 'iat' | 'exp'>): {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} {
  // Signs whatever is in `payload`, including `sessionId` when present (ADR-2).
  const accessToken = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as string,
    issuer: env.jwt.issuer,
    audience: env.jwt.audience,
  } as jwt.SignOptions);

  // Same payload object as accessToken — sessionId (if any) is identical in both.
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
```

The load-bearing fact: `generateTokens` never hand-parses the `env.jwt.refreshExpiresIn` duration string (e.g. `'7d'`) itself — it hands the raw string straight to `jwt.sign({ expiresIn: ... })` (which internally uses the `ms` package bundled inside `jsonwebtoken`, not a project dependency) and then, to learn the *actual* numeric expiry, decodes the token it just signed and reads `.exp`. **There is no standalone ms-conversion helper anywhere in this codebase** (verified: no `ms` package in `package.json` dependencies, no `parseDuration`/`durationToMs` helper in `src/`). SP3 resolution: `session.service.ts` computes `expires_at` the same way — by `jwt.decode()`-ing the actual refresh JWT it was handed (which was produced by `generateTokens`) and reading its own `.exp` claim, converted to a `Date`. This is strictly more correct than re-parsing `env.jwt.refreshExpiresIn` independently (it can never drift from what the token itself actually says) and requires no new dependency.

### `src/config/database.config.ts` — exported query/transaction API (exact signatures; internals elided, not needed)

```ts
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: (string | number | boolean | null | Date | object)[],
  retries: number = 2,
  options?: { bestEffort?: boolean }
): Promise<QueryResult<T>>
```
*(elided: internal retry/backoff loop, connection-error classification, logging — irrelevant to session.service.ts; just await it and read `.rows` / `.rowCount`.)*

```ts
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T>
```
*(available but NOT used by this packet — see Contract section on why rotateSession is two sequential `query()` calls, not a wrapped transaction.)*

```ts
export { pool };
```

`src/database/pg.ts` (the file named in your task) is a one-line re-export barrel:

```ts
export { query, transaction, pool } from '../config/database.config.js';
```

**Import directly from `'../config/database.config.js'`, not from `pg.ts`** — every existing controller/service in this codebase does it that way (e.g. `auth-session.controller.ts`, `auth-registration.controller.ts`, `workout-alarm.service.ts` all do `import { query } from '../config/database.config.js'` / `'../../config/database.config.js'`); `pg.ts` has zero consumers today. Match house convention.

### `src/config/env.config.ts` — `jwt` block (lines 82–89, exact)

```ts
jwt: {
  secret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-in-production',
  refreshSecret: process.env['JWT_REFRESH_SECRET'] || 'your-refresh-secret-key-change-in-production',
  expiresIn: process.env['JWT_EXPIRES_IN'] || '15m',
  refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
  issuer: process.env['JWT_ISSUER'] || 'balencia-api',
  audience: process.env['JWT_AUDIENCE'] || 'balencia-client',
},
```

`refreshExpiresIn` is a duration string (default `'7d'`), never a number. As established above, SP3 does not read `env.jwt.refreshExpiresIn` directly at all — it derives the real expiry from the signed token's `.exp` claim instead. `session.service.ts` does not need to import `env`.

### `src/types/index.ts` — `IJwtPayload` (lines 33–38, exact, for context only — not imported by this packet)

```ts
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId?: string;
}
```

`JwtPayload` (from the `jsonwebtoken` package) already declares `exp?: number`. `session.service.ts` does not need to import `IJwtPayload` — it only needs `jwt.decode()`'s built-in return type (`JwtPayload | string | null`) to read `.exp`.

## Contract

Exact target file: `src/services/session.service.ts`. Full reference implementation below — this is the canonical, compile-clean, house-style-matching implementation. Transcribe it (you may adjust comments/formatting, but not the SQL text, the function signatures, the export names, or the branching logic):

```ts
/**
 * @file Session Service
 * Per-device refresh-token session model (BIOS-003 auth hardening).
 *
 * Backs `user_sessions` (src/database/tables/146-user-sessions.sql, already
 * live). One row per active device session. Stores only the sha256 hash of
 * the CURRENT refresh token — the raw token is never persisted or logged.
 *
 * ADR-1 (architecture-plan.md): rotation-on-use updates the hash in place
 * (no history table); a presented token whose hash no longer matches the
 * row's current hash is a reuse of an already-rotated token — the whole
 * session is revoked. Per-user cap of SESSION_CAP (10) active sessions;
 * creating an (cap+1)th session evicts the least-recently-used active
 * session(s) by `last_used_at`.
 *
 * ADR-3: this service is dual-read-agnostic — it only knows the new
 * per-device session model. The `/auth/refresh` legacy branch (comparing
 * against `users.refresh_token`) lives in the controller (SP6), not here.
 *
 * Amendment A5 (BINDING): rotateSession is a single atomic compare-and-swap:
 *   UPDATE user_sessions
 *      SET refresh_token_hash = $new, last_used_at = NOW(), rotated_at = NOW(), expires_at = $newExpiry
 *    WHERE id = $sid AND refresh_token_hash = $old AND revoked_at IS NULL
 *   RETURNING id
 * Zero rows updated -> a follow-up SELECT on the same row disambiguates
 * reuse_detected (row exists, not revoked, not expired, hash simply doesn't
 * match what we tried to CAS from -> the presented token was already
 * rotated away) from not_found (row missing, already revoked, or expired).
 */

import jwt from 'jsonwebtoken';
import { query } from '../config/database.config.js';
import { hashRefreshToken } from '../middlewares/auth.middleware.js';

// ============================================
// CONSTANTS
// ============================================

/** Per-user cap on active (non-revoked) sessions (ADR-1). */
export const SESSION_CAP = 10;

// ============================================
// TYPES
// ============================================

export interface CreateSessionParams {
  userId: string;
  refreshToken: string;
  deviceId?: string;
  deviceName?: string;
  clientType: 'mobile' | 'web';
  userAgent?: string;
  ip?: string;
}

export type RotateSessionResult = 'rotated' | 'reuse_detected' | 'not_found';

export interface ActiveSessionRow {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

interface UserSessionRow {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
}

// ============================================
// INTERNAL HELPERS
// ============================================

/**
 * Reads the `exp` claim off an already-signed refresh JWT (produced by
 * `generateTokens()` in auth.middleware.ts) and returns it as a Date. This
 * mirrors the exact pattern `generateTokens()` itself uses to compute
 * `expiresIn` (jwt.decode(token).exp) — no `ms`-style duration-string
 * parser exists anywhere in this codebase, and none is added here.
 * `jwt.decode` does not verify the signature; that is fine, this only ever
 * runs on a token this same server just signed. Never logs or persists the
 * token itself, only its `exp` claim.
 */
function refreshTokenExpiryDate(refreshToken: string): Date {
  const decoded = jwt.decode(refreshToken);
  if (!decoded || typeof decoded === 'string' || typeof decoded.exp !== 'number') {
    throw new Error(
      'session.service: refresh token has no exp claim — expected a JWT signed by generateTokens()'
    );
  }
  return new Date(decoded.exp * 1000);
}

function mapUserSessionRow(row: UserSessionRow): ActiveSessionRow {
  return {
    id: row.id,
    userId: row.user_id,
    refreshTokenHash: row.refresh_token_hash,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
  };
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Creates a new per-device session row for a freshly-issued refresh token,
 * then evicts over-cap sessions for that user (oldest `last_used_at` first).
 * Insert-then-evict order matters: the just-created row is always the
 * newest by `last_used_at` and is therefore never the one evicted.
 */
export async function createSession(params: CreateSessionParams): Promise<{ sessionId: string }> {
  const { userId, refreshToken, deviceId, deviceName, clientType, userAgent, ip } = params;

  const refreshTokenHash = hashRefreshToken(refreshToken);
  const expiresAt = refreshTokenExpiryDate(refreshToken);
  const ipAddress = ip && ip.trim().length > 0 ? ip : null;

  const result = await query<{ id: string }>(
    `INSERT INTO user_sessions
        (user_id, refresh_token_hash, device_id, device_name, client_type, user_agent, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      userId,
      refreshTokenHash,
      deviceId ?? null,
      deviceName ?? null,
      clientType,
      userAgent ?? null,
      ipAddress,
      expiresAt,
    ]
  );

  const sessionId = result.rows[0].id;

  await evictOldestIfOverCap(userId, SESSION_CAP);

  return { sessionId };
}

/**
 * Atomic rotate-on-use with reuse detection (ADR-1/ADR-3, amendment A5).
 *
 * 1. Blind CAS: swap the hash from `presentedToken`'s hash to
 *    `newRefreshToken`'s hash, only if the row is currently un-revoked and
 *    its hash still equals the presented token's hash. Also bumps
 *    `expires_at` to the new refresh token's own `exp` (contract: "on
 *    'rotated' also update expires_at to now + refresh TTL").
 * 2. CAS hit (1 row) -> 'rotated'.
 * 3. CAS miss (0 rows) -> follow-up SELECT by id (any status):
 *    - no row -> 'not_found'
 *    - row revoked, or row expired -> 'not_found'
 *    - row active + not expired + hash != presented hash -> this is a
 *      replay of an already-superseded token -> revoke the whole session,
 *      return 'reuse_detected'
 *    - anything else (e.g. a concurrent winner rotated to the exact same
 *      new hash we were racing toward) -> 'not_found', never invented as
 *      'rotated' after the fact.
 *
 * Per amendment A5, the CAS predicate deliberately does NOT check
 * `expires_at` — only `id`, `refresh_token_hash`, and `revoked_at IS NULL`.
 * This is safe because `verifyRefreshToken` (auth.middleware.ts) already
 * JWT-verifies the presented refresh token and throws on `TokenExpiredError`
 * before a controller ever calls `rotateSession`; a JWT-expired token never
 * reaches this function. Do not add an expires_at clause to the CAS
 * WHERE — that would deviate from the amendment's literal, binding text.
 *
 * Known, accepted race (R5 / amendment A5 concurrent test): if two callers
 * present the SAME (not-yet-rotated) token concurrently, the first CAS wins
 * ('rotated'); the second CAS then misses because the hash has already
 * moved, its follow-up SELECT sees a non-revoked, non-expired row whose
 * hash no longer matches what it presented, and it correctly reports
 * 'reuse_detected' and revokes the session. This is the textbook OAuth
 * refresh-rotation-reuse-detection race, not a bug — the mitigation is
 * client-side single-flight refresh (mobile packet MP1), not a server
 * relaxation here.
 */
export async function rotateSession(
  sessionId: string,
  presentedToken: string,
  newRefreshToken: string
): Promise<RotateSessionResult> {
  const presentedHash = hashRefreshToken(presentedToken);
  const newHash = hashRefreshToken(newRefreshToken);
  const newExpiresAt = refreshTokenExpiryDate(newRefreshToken);

  const casResult = await query<{ id: string }>(
    `UPDATE user_sessions
        SET refresh_token_hash = $1,
            last_used_at = NOW(),
            rotated_at = NOW(),
            expires_at = $2
      WHERE id = $3
        AND refresh_token_hash = $4
        AND revoked_at IS NULL
      RETURNING id`,
    [newHash, newExpiresAt, sessionId, presentedHash]
  );

  if ((casResult.rowCount ?? 0) > 0) {
    return 'rotated';
  }

  const existing = await findActiveSession(sessionId);
  if (!existing) {
    return 'not_found';
  }

  const isRevoked = existing.revokedAt !== null;
  const isExpired = existing.expiresAt.getTime() <= Date.now();

  if (!isRevoked && !isExpired && existing.refreshTokenHash !== presentedHash) {
    await revokeSession(sessionId);
    return 'reuse_detected';
  }

  return 'not_found';
}

/** Idempotent: revoking an already-revoked or missing session is a no-op. */
export async function revokeSession(sessionId: string): Promise<void> {
  await query(
    `UPDATE user_sessions SET revoked_at = NOW() WHERE id = $1 AND revoked_at IS NULL`,
    [sessionId]
  );
}

/** Revokes every active session for a user (ADR-4 `allDevices: true`). */
export async function revokeAllForUser(userId: string): Promise<void> {
  await query(
    `UPDATE user_sessions SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );
}

/**
 * Fetches a `user_sessions` row by id, in ANY status (active, revoked, or
 * expired) — despite the name (carried over from architecture-plan.md §7),
 * this is a plain "find by id" row mapper, not a status filter. Callers
 * decide what "active" means from the returned `revokedAt`/`expiresAt`
 * fields:
 *   - this module's own `rotateSession` CAS-miss branch uses it to
 *     disambiguate reuse_detected vs not_found (needs the row regardless of
 *     status to do that);
 *   - the `/auth/refresh` dual-read controller (a later packet) uses it the
 *     same way ("Not found / revoked / expired -> 401").
 * Returns `null` only when no row with that id exists at all.
 */
export async function findActiveSession(sessionId: string): Promise<ActiveSessionRow | null> {
  const result = await query<UserSessionRow>(
    `SELECT id, user_id, refresh_token_hash, expires_at, revoked_at
       FROM user_sessions
      WHERE id = $1`,
    [sessionId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUserSessionRow(result.rows[0]);
}

/**
 * Deletes active sessions beyond the `cap` most-recently-used (by
 * `last_used_at`) for a user. Revoked sessions are left untouched (they
 * don't count toward the cap and are not this function's concern).
 */
export async function evictOldestIfOverCap(userId: string, cap: number): Promise<void> {
  await query(
    `DELETE FROM user_sessions
      WHERE id IN (
        SELECT id
          FROM user_sessions
         WHERE user_id = $1
           AND revoked_at IS NULL
         ORDER BY last_used_at DESC
         OFFSET $2
      )`,
    [userId, cap]
  );
}
```

### Contract notes / resolved ambiguities (read before transcribing)

1. **`rotated_at` in the CAS UPDATE.** The task brief you were given abbreviates amendment A5's SQL without `rotated_at`; the full, binding amendment A5 text in `architecture-plan.md` §11 (and the already-live `146-user-sessions.sql` column comment) both specify `rotated_at = now()` as part of the same atomic UPDATE. Live source wins per amendment A7 — the reference implementation above sets `rotated_at = NOW()` in the CAS. Do not drop it.
2. **`findActiveSession` fetches by id regardless of status**, not filtered to only-active rows — see the doc-comment on the function above for the full reasoning. This is required so both `rotateSession`'s own CAS-miss branch and the future `/refresh` controller can distinguish "not found" from "revoked" from "expired" from "hash mismatch while still active" using one row-fetch. Do not add a `WHERE revoked_at IS NULL AND expires_at > NOW()` filter to its query — that would make reuse-vs-not_found disambiguation impossible.
3. **No `ms`/duration-parsing dependency added.** `expires_at` is always derived by `jwt.decode()`-ing the actual refresh JWT the caller handed in (`refreshToken` in `createSession`, `newRefreshToken` in `rotateSession`) and reading its `exp` claim — exactly mirroring `generateTokens`'s own `jwt.decode(accessToken).exp` pattern. `env.jwt.refreshExpiresIn` is never read by this file.
4. **CAS predicate has no `expires_at` check**, matching amendment A5's literal SQL. Rationale documented in the `rotateSession` doc-comment above — do not add one.
5. **Eviction direction**: `evictOldestIfOverCap` orders `ORDER BY last_used_at DESC` and deletes everything past `OFFSET cap` — i.e. it keeps the `cap` most-recently-used active sessions and deletes the rest. (Ordering `ASC` + `OFFSET cap` would be wrong — it would delete the newest sessions instead.)
6. **`evictOldestIfOverCap` is an exported named function**, not inlined into `createSession`. Your task brief's contract list omits it (folds it into "createSession ... then evicts"), but `architecture-plan.md` §7's full SP3 contract explicitly names `evictOldestIfOverCap(userId, cap)` as a separate export, and a named export is more directly testable by SP9/SP10 than an anonymous block. Both sources agree on behavior; this packet exports it per the fuller plan text.
7. **Two sequential `query()` calls in `rotateSession`, no `transaction()` wrapper.** Amendment A5 describes the algorithm as "CAS, then [on miss] a follow-up SELECT" — two statements, not one wrapped transaction. Match that; do not introduce a `BEGIN`/`COMMIT` around it.
8. **`clientType` is typed as the literal union `'mobile' | 'web'`**, matching the DDL's inline comment (`-- 'mobile' | 'web'`) on `client_type VARCHAR(16) NOT NULL DEFAULT 'mobile'`. It is a required (non-optional) parameter in `CreateSessionParams` — the DB column default exists only as a safety net for direct SQL, not for this service's callers.
9. **Never log or store a raw token.** No `logger`/`console` calls exist in the reference implementation. If you add any, they may reference `sessionId` / `userId` / a literal event name only — never a variable holding `presentedToken`, `newRefreshToken`, `refreshToken`, or even `refreshTokenHash`/`newHash`/`presentedHash` (keep the grep gate trivially clean: nothing matching `/token|hash/i` should ever be an argument to a log call).

## Acceptance criteria

1. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && npm run typecheck` passes with zero errors, and touches/requires no edits to any file other than the new `src/services/session.service.ts`.
2. `npm run lint` (from `yhealth-app/server/`) passes with zero errors/warnings on `src/services/session.service.ts`.
3. The file's exported surface is exactly: `SESSION_CAP` (const `10`), `CreateSessionParams` (interface), `RotateSessionResult` (type), `ActiveSessionRow` (interface), `createSession`, `rotateSession`, `revokeSession`, `revokeAllForUser`, `findActiveSession`, `evictOldestIfOverCap` — checkable via `grep -n "^export" src/services/session.service.ts` (10 lines).
4. Every SQL statement passed to `query(...)` uses only `$1, $2, ...` placeholders for all caller-supplied values; zero template-literal interpolation (`${`) or string concatenation building SQL text. Checkable via `grep -n '\${' src/services/session.service.ts` returning no matches.
5. `grep -in "console\." src/services/session.service.ts` returns no matches.
6. `grep -inE "logger\.[a-z]+\([^)]*(refreshToken|presentedToken|newRefreshToken|refreshTokenHash|newHash|presentedHash)" src/services/session.service.ts` returns no matches (no raw token or hash ever passed to a logger call — the reference implementation has no logger calls at all, which trivially satisfies this).
7. `rotateSession`'s UPDATE statement sets exactly `refresh_token_hash`, `last_used_at`, `rotated_at`, `expires_at` and its WHERE clause is exactly `id = ... AND refresh_token_hash = ... AND revoked_at IS NULL` (amendment A5, binding) — no `expires_at` condition in the WHERE clause.
8. `createSession` and `rotateSession` both compute the row's `expires_at` via `jwt.decode(...).exp`, not via any hand-parsed duration string or new dependency (`grep -n "'ms'" package.json` / `grep -n "from 'ms'" src/services/session.service.ts` — both empty; no new `dependencies` entries added to `package.json` by this packet).
9. `evictOldestIfOverCap`'s DELETE subquery filters `user_id = $1 AND revoked_at IS NULL`, orders `last_used_at DESC`, and uses `OFFSET $2` with no `LIMIT` — i.e. keeps the `cap` most-recently-used active rows per user and deletes the rest.
10. No changes to any other file in the repo (confirm via `git status --porcelain yhealth-app/server` showing only the one new file under `src/services/`).

## Out of scope

- Wiring `createSession`/`rotateSession`/`revokeSession`/`revokeAllForUser` into any controller or route (`auth-session.controller.ts`, `auth-registration.controller.ts`) — that is SP5 (login/register/social), SP6 (`/refresh` dual-read), SP7 (logout).
- Any change to `src/middlewares/auth.middleware.ts`, `src/types/index.ts`, `src/config/env.config.ts`, or `src/config/database.config.ts` — all already correct/landed for this packet's needs.
- Any change to `src/database/tables/146-user-sessions.sql`, `src/database/auto-migrate.ts`, or the migrations directory — SP1, already landed.
- Apple/Google verification (`oauth.service.ts`) — SP2/SP8.
- Any unit or integration test file (`tests/unit/services/session.service.test.ts`, `tests/integration/...`) — SP9/SP10 write those against this packet's exports.
- Adding a `GET /auth/sessions` list endpoint or any session-management UI — explicitly deferred (OQ-B, future batch).
- Adding the `ms` npm package or any other new dependency.
- Any mobile (`yhealth-app/mobile`) change.
