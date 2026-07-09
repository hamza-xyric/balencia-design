=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/session.service.ts ===
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
 * match what we tried to CAS from) from not_found (row missing, already revoked, or expired).
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
=== END FILE ===
