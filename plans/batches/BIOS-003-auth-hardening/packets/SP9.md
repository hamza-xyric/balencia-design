# Packet SP9 — Server unit tests: session.service.ts rotation/reuse/cap-eviction + oauth.service.ts Apple JWKS verification

## Objective

Create two Jest unit-test files that prove, against a **mocked** Postgres (`jest.unstable_mockModule`, no real DB) and a **mocked** `jose` module (no real network JWKS fetch), the correctness of two already-landed BIOS-003 server modules: `src/services/session.service.ts` (per-device refresh-token rotation, reuse detection, LRU cap eviction, sha256-only-at-rest hashing) and the Apple branch of `src/services/oauth.service.ts` (`verifyAppleToken` — cryptographic JWKS verification via `jose`, mapping every real `jose` failure class to a safe `null` return, never throwing to the caller). Both target files already exist and are frozen contract (packets SP2, SP3, SP4, SP5 landed ahead of this one per the wave plan) — this packet adds **tests only**, zero production-code changes.

Every test case, fixture shape, and assertion in this packet's Contract section has already been **written and run** against the live repo during composition (`NODE_OPTIONS=--experimental-vm-modules npx jest tests/unit/services/session.service.test.ts tests/unit/services/oauth.service.apple.test.ts` → `Test Suites: 2 passed, 2 total` / `Tests: 22 passed, 22 total`, and `npx eslint` on both files → 0 errors, 0 warnings). The worker's job is to write the two files with the **exact** content given in the Contract section (or, if re-deriving independently, to reproduce behaviorally-identical assertions) and re-confirm green.

## Target files

Both **create** (neither exists yet):

- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/unit/services/session.service.test.ts`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/unit/services/oauth.service.apple.test.ts`

No other file is modified. (`git status` on `tests/unit/services/` shows neither file present before this packet lands.)

## Embedded current source

### `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/session.service.ts` (LANDED, 305 lines, full content — the module under test)

```typescript
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
  /**
   * Explicit session-row id (BIOS-003 SP5). ADR-2 requires the refresh/
   * access JWTs' `sessionId` claim to match the `user_sessions.id` the
   * refresh token's hash is stored under — but the JWT must be minted
   * BEFORE this row can exist (the row's `refresh_token_hash` is derived
   * FROM the token). Callers that need this (all three token-issuance
   * controllers) mint the id first via `crypto.randomUUID()`, pass it into
   * `generateTokens({ ..., sessionId })` to produce the final token pair,
   * then pass the SAME id here so the row is created under that exact id.
   * Optional and additive: omitting it lets Postgres default to
   * `uuid_generate_v4()` (unchanged pre-SP5 behavior) for any caller that
   * doesn't need to pre-mint the id.
   */
  id?: string;
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
  const { id, userId, refreshToken, deviceId, deviceName, clientType, userAgent, ip } = params;

  const refreshTokenHash = hashRefreshToken(refreshToken);
  const expiresAt = refreshTokenExpiryDate(refreshToken);
  const ipAddress = ip && ip.trim().length > 0 ? ip : null;

  const result = await query<{ id: string }>(
    `INSERT INTO user_sessions
        (id, user_id, refresh_token_hash, device_id, device_name, client_type, user_agent, ip_address, expires_at)
     VALUES (COALESCE($1::uuid, uuid_generate_v4()), $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id`,
    [
      id ?? null,
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

### `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/oauth.service.ts` (LANDED, 347 lines, full content — the module under test; only `verifyAppleToken`/`categorizeAppleVerificationError`/`getAppleClientIds` are in scope for this packet, the Google path is embedded for context only and is NOT tested here)

```typescript
import { createRemoteJWKSet, jwtVerify, errors as joseErrors, type JWTPayload } from 'jose';
import { logger } from './logger.service.js';
import type { AuthProvider } from '../models/index.js';

interface ISocialProfile {
  provider: AuthProvider;
  providerId: string;
  email: string;
  name?: string;
  avatar?: string;
  accessToken?: string;
}

// Type stub for google-auth-library (install package for full functionality)
interface OAuth2ClientInterface {
  verifyIdToken(options: { idToken: string; audience?: string }): Promise<{
    getPayload(): GoogleTokenPayload | undefined;
  }>;
}

interface GoogleTokenPayload {
  sub: string;
  email: string;
  email_verified: boolean | string;
  aud?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

/** Apple's ID token claims relevant to identity. Email is present at minimum on
 * first sign-in; Apple omits it on subsequent private-relay-off sign-ins in some
 * configurations, so callers must treat a missing email as a hard verification
 * failure (no client-supplied fallback — see verifyAppleToken). */
interface AppleIdTokenPayload extends JWTPayload {
  sub: string;
  email?: string;
  email_verified?: boolean | string;
}

interface SocialProfileData {
  provider: AuthProvider;
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  accessToken?: string;
}

const APPLE_ISSUER = 'https://appleid.apple.com';
const APPLE_JWKS_URL = 'https://appleid.apple.com/auth/keys';
const APPLE_DEFAULT_CLIENT_ID = 'ai.xyric.balencia';

// Module-scope singleton: createRemoteJWKSet caches Apple's public keys internally
// and rate-limits refetches. Must be created once and reused across every
// verifyAppleToken call, never recreated per-call.
const appleJwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));

class OAuthService {
  private static instance: OAuthService;
  private googleClient: OAuth2ClientInterface | null = null;
  private initializationPromise: Promise<void> | null = null;
  private initialized = false;

  private constructor() {}

  public static getInstance(): OAuthService {
    if (!OAuthService.instance) {
      OAuthService.instance = new OAuthService();
    }
    return OAuthService.instance;
  }

  private async initializeClients(): Promise<void> {
    const googleClientId = this.getGoogleClientId();
    if (googleClientId) {
      try {
        // Dynamically import google-auth-library if available
        const googleAuth = await (Function('return import("google-auth-library")')() as Promise<{ OAuth2Client: new (clientId: string) => OAuth2ClientInterface }>);
        this.googleClient = new googleAuth.OAuth2Client(googleClientId);
        logger.info('Google OAuth client initialized');
      } catch {
        logger.warn('google-auth-library not installed - Google OAuth will use tokeninfo fallback');
      }
    } else {
      logger.warn('Google OAuth not configured - GOOGLE_CLIENT_ID missing');
    }
  }

  private getGoogleClientId(): string | undefined {
    return (
      process.env['GOOGLE_CLIENT_ID'] ||
      process.env['AUTH_GOOGLE_ID'] ||
      process.env['AUTH_GOOGLE_CLIENT_ID']
    );
  }

  private getGoogleClientIds(): string[] {
    const ids = new Set<string>();
    for (const key of ['GOOGLE_CLIENT_ID', 'AUTH_GOOGLE_ID', 'AUTH_GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_ID_WEB', 'GOOGLE_CLIENT_ID_IOS']) {
      const val = process.env[key];
      if (val) ids.add(val);
    }
    return [...ids];
  }

  /**
   * Apple's accepted token audiences ("aud" claim), comma-separated in
   * APPLE_CLIENT_IDS. Defaults to the native iOS bundle id when unset so local
   * dev/staging works without extra config. A dev-only Expo Go audience
   * (host.exp.Exponent) may be appended locally via this same env var — never
   * commit that value, it must never appear in a production APPLE_CLIENT_IDS.
   */
  private getAppleClientIds(): string[] {
    const raw = process.env['APPLE_CLIENT_IDS'];
    if (!raw) {
      return [APPLE_DEFAULT_CLIENT_ID];
    }
    const ids = raw
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    return ids.length > 0 ? ids : [APPLE_DEFAULT_CLIENT_ID];
  }

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    if (!this.initializationPromise) {
      this.initializationPromise = this.initializeClients()
        .finally(() => {
          this.initialized = true;
        });
    }
    await this.initializationPromise;
  }

  /**
   * Verify Google ID token and extract profile
   */
  public async verifyGoogleToken(idToken: string): Promise<SocialProfileData | null> {
    await this.ensureInitialized();

    const googleClientId = this.getGoogleClientId();
    if (!googleClientId) {
      throw new Error('Google OAuth server configuration is missing');
    }

    const validAudiences = this.getGoogleClientIds();

    try {
      let payload: GoogleTokenPayload | undefined;

      if (this.googleClient) {
        // Try each valid audience until one succeeds
        for (const aud of validAudiences) {
          try {
            payload = (await this.googleClient.verifyIdToken({
              idToken,
              audience: aud,
            })).getPayload() as GoogleTokenPayload | undefined;
            if (payload) break;
          } catch (audError) {
            const msg = audError instanceof Error ? audError.message : '';
            if (msg.includes('audience') || msg.includes('recipient')) {
              continue;
            }
            throw audError;
          }
        }
      } else {
        payload = await this.verifyGoogleTokenWithTokenInfo(idToken, googleClientId);
      }

      if (!payload) {
        logger.warn('Invalid Google token - no payload');
        return null;
      }

      if (payload.aud && !validAudiences.includes(payload.aud)) {
        logger.warn('Invalid Google token - audience mismatch', { aud: payload.aud, expected: validAudiences });
        return null;
      }

      if (payload.email_verified !== true && payload.email_verified !== 'true') {
        logger.warn('Google email not verified', { email: payload.email });
        return null;
      }

      logger.info('Google token verified', {
        email: payload.email,
        sub: payload.sub,
      });

      return {
        provider: 'google',
        providerId: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        avatar: payload.picture,
      };
    } catch (error) {
      logger.error('Google token verification failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  }

  private async verifyGoogleTokenWithTokenInfo(
    idToken: string,
    _googleClientId: string
  ): Promise<GoogleTokenPayload | undefined> {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
    );

    if (!response.ok) {
      logger.warn('Google tokeninfo verification failed', {
        status: response.status,
      });
      return undefined;
    }

    const payload = (await response.json()) as GoogleTokenPayload;

    const validAudiences = this.getGoogleClientIds();
    if (payload.aud && !validAudiences.includes(payload.aud)) {
      logger.warn('Google tokeninfo audience mismatch', { aud: payload.aud, expected: validAudiences });
      return undefined;
    }

    return payload;
  }

  /**
   * Categorize a jwtVerify failure into a short, non-sensitive reason code for
   * structured logging. Never includes the token or any claim value that could
   * leak identity data — only the failure class/claim name.
   *
   * Note: JWTExpired extends JOSEError directly (it only structurally
   * *implements* JWTClaimValidationFailed's shape in jose's TypeScript types) —
   * at runtime it is NOT `instanceof errors.JWTClaimValidationFailed`. Both
   * branches are checked independently; do not collapse them.
   */
  private categorizeAppleVerificationError(error: unknown): string {
    if (error instanceof joseErrors.JWTExpired) {
      return 'expired';
    }
    if (error instanceof joseErrors.JWSSignatureVerificationFailed) {
      return 'signature_invalid';
    }
    if (error instanceof joseErrors.JWKSNoMatchingKey) {
      return 'no_matching_key';
    }
    if (error instanceof joseErrors.JWTClaimValidationFailed) {
      return `claim_invalid:${error.claim}`;
    }
    if (error instanceof joseErrors.JOSEError) {
      return error.code;
    }
    return 'unknown';
  }

  /**
   * Verify Apple ID token and extract profile.
   *
   * Cryptographically verifies the token against Apple's live JWKS
   * (signature, RS256 only), and checks `iss === https://appleid.apple.com`,
   * `aud` against APPLE_CLIENT_IDS, and `exp`. providerId (sub) and email are
   * read ONLY from the verified payload — there is no client-supplied
   * fallback for either, unlike the old implementation. Returns null on ANY
   * verification failure; never throws to the caller.
   */
  public async verifyAppleToken(idToken: string): Promise<SocialProfileData | null> {
    const audiences = this.getAppleClientIds();

    try {
      const { payload } = await jwtVerify<AppleIdTokenPayload>(idToken, appleJwks, {
        issuer: APPLE_ISSUER,
        audience: audiences,
        algorithms: ['RS256'],
      });

      if (!payload.sub) {
        logger.warn('Apple token verification failed', { reason: 'missing_sub' });
        return null;
      }

      if (!payload.email) {
        logger.warn('Apple token verification failed', { reason: 'missing_email' });
        return null;
      }

      logger.info('Apple token verified', { hasEmail: true });

      return {
        provider: 'apple',
        providerId: payload.sub,
        email: payload.email,
      };
    } catch (error) {
      logger.warn('Apple token verification failed', {
        reason: this.categorizeAppleVerificationError(error),
      });
      return null;
    }
  }

  /**
   * Verify social token based on provider
   */
  public async verifySocialToken(
    provider: 'google' | 'apple',
    idToken: string
  ): Promise<SocialProfileData | null> {
    switch (provider) {
      case 'google':
        return this.verifyGoogleToken(idToken);
      case 'apple':
        return this.verifyAppleToken(idToken);
      default:
        logger.warn('Unknown OAuth provider', { provider });
        return null;
    }
  }

  /**
   * Create social profile object for storage
   */
  public createSocialProfile(data: SocialProfileData, accessToken?: string): ISocialProfile {
    return {
      provider: data.provider,
      providerId: data.providerId,
      email: data.email,
      name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
      avatar: data.avatar,
      accessToken,
    };
  }
}

export const oauthService = OAuthService.getInstance();
export default oauthService;
```

### `146-user-sessions.sql` (reference only — the table these queries hit; NOT a target of this packet, confirms `rotated_at` is a real column so the CAS UPDATE in `rotateSession` is valid SQL)

```sql
CREATE TABLE IF NOT EXISTS user_sessions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,
    device_id          TEXT,
    device_name        TEXT,
    client_type        VARCHAR(16) NOT NULL DEFAULT 'mobile',
    user_agent         TEXT,
    ip_address         INET,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    rotated_at         TIMESTAMPTZ,
    expires_at         TIMESTAMPTZ NOT NULL,
    revoked_at         TIMESTAMPTZ
);
```

### `hashRefreshToken` — `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/middlewares/auth.middleware.ts` (real implementation, NOT mocked by this packet's tests — see Contract §"Why hashRefreshToken is left unmocked")

```typescript
export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
```

### Existing mock pattern — top-of-file `jest.unstable_mockModule` usage from `/Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/unit/controllers/auth-cookies.test.ts` (embedded verbatim as instructed; this is the CONTROLLER-level mocking convention — this packet's SERVICE-level tests use the narrower, shared `tests/helpers/mock-db.ts` / `tests/helpers/mock-services.ts` helpers shown further below, which is the established pattern for `tests/unit/services/*.test.ts` files, e.g. `tests/unit/services/career-progress.service.test.ts`)

```typescript
import { jest } from '@jest/globals';
import {
  setupControllerMocks,
  createAuthReq,
  createRes,
  createNext,
  callHandler,
} from '../../helpers/controller-harness.js';

const ctx = setupControllerMocks();

jest.unstable_mockModule('../../../src/middlewares/auth.middleware.js', () => ({
  generateTokens: jest.fn().mockReturnValue({
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token',
    expiresIn: 900,
  }),
  setAuthCookies: jest.fn(),
  clearAuthCookies: jest.fn(),
  hashRefreshToken: jest.fn().mockReturnValue('hashed-refresh-token'),
  default: jest.fn(),
}));

jest.unstable_mockModule('../../../src/helper/encryption.js', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
  hashPassword: jest.fn().mockResolvedValue('hashed'),
}));

jest.unstable_mockModule('../../../src/controllers/auth/auth.types.js', () => ({
  mapUserRow: jest.fn((row: any) => ({
    id: row.id || 'user-1',
    email: row.email || 'test@example.com',
    password: row.password || 'hashed-password',
    isActive: true,
    role: row.role || 'user',
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    authProvider: row.auth_provider || 'local',
  })),
  getPublicProfile: jest.fn((user: any) => ({ id: user.id, email: user.email })),
  ensureAdminRole: jest.fn((_id: string, _email: string, role: string) => Promise.resolve(role)),
  getAuthTokenPayload: jest.fn((req: any, tokens: any) =>
    req.get?.('X-Client')?.toLowerCase() === 'mobile'
      ? tokens
      : { expiresIn: tokens.expiresIn },
  ),
  createActivationToken: jest.fn(),
}));

jest.unstable_mockModule('../../../src/services/index.js', () => ({
  emailService: {
    sendPasswordResetEmail: jest.fn(),
    sendPasswordChangedEmail: jest.fn(),
    sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
  },
  logger: ctx.mockLogger,
}));

jest.unstable_mockModule('../../../src/services/notification.service.js', () => ({
  notificationService: { welcomeUser: jest.fn().mockResolvedValue(undefined) },
}));

jest.unstable_mockModule('../../../src/services/chat.service.js', () => ({
  chatService: { addUserToCommunityGroup: jest.fn().mockResolvedValue(undefined) },
}));

jest.unstable_mockModule('../../../src/services/oauth.service.js', () => ({
  oauthService: { verifySocialToken: jest.fn().mockResolvedValue(null) },
}));

jest.unstable_mockModule('../../../src/services/credit.service.js', () => ({
  ensureWallet: jest.fn().mockResolvedValue(undefined),
}));

jest.unstable_mockModule('../../../src/helper/mail.js', () => ({
  mailHelper: { sendRegistrationOTPEmail: jest.fn().mockResolvedValue(true) },
}));

const { login, logout, refreshToken } = await import('../../../src/controllers/auth/auth-session.controller.js');
const { verifyRegistration, socialAuth } = await import('../../../src/controllers/auth/auth-registration.controller.js');
const authMw = await import('../../../src/middlewares/auth.middleware.js');
const { setAuthCookies, clearAuthCookies, hashRefreshToken, generateTokens } = authMw;
const encryptionMod = await import('../../../src/helper/encryption.js');
const authTypesMod = await import('../../../src/controllers/auth/auth.types.js');
const servicesMod = await import('../../../src/services/index.js');
const notificationMod = await import('../../../src/services/notification.service.js');
const chatMod = await import('../../../src/services/chat.service.js');
const creditMod = await import('../../../src/services/credit.service.js');
const jwt = (await import('jsonwebtoken')).default;
const { env } = await import('../../../src/config/env.config.js');
```

### The shared service-test DB mock — `/Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/helpers/mock-db.ts` (full content, 59 lines — this is what `session.service.test.ts` actually uses)

```typescript
/**
 * Centralized Database Mock
 *
 * Provides a single function to mock both config/database.config.js and database/pg.js
 * so that no service accidentally hits the real database during unit tests.
 */

import { jest } from '@jest/globals';

export interface MockDbSetup {
  mockQuery: jest.Mock<(...args: any[]) => any>;
  mockTransaction: jest.Mock<(...args: any[]) => any>;
  mockGetClient: jest.Mock<(...args: any[]) => any>;
}

/**
 * Register database mocks for both import paths.
 * MUST be called before any `await import()` of services.
 *
 * The transaction mock executes the callback with the mockQuery as the client,
 * matching the real signature: `transaction(cb: (client) => Promise<T>): Promise<T>`
 */
export function setupDbMock(basePath?: string): MockDbSetup {
  const resolvedBase = basePath ?? '../..';
  // Paths resolve relative to THIS file (tests/helpers/), not the calling test file
  const mockQuery = jest.fn<any>();

  const mockClient = {
    query: mockQuery,
    release: jest.fn(),
  };

  const mockTransaction = jest.fn<any>().mockImplementation(
    async (cb: (client: typeof mockClient) => Promise<unknown>) => cb(mockClient)
  );

  const mockGetClient = jest.fn<any>().mockResolvedValue(mockClient);

  const dbMockShape = {
    query: mockQuery,
    transaction: mockTransaction,
    pool: { query: mockQuery, end: jest.fn() },
    database: { healthCheck: jest.fn().mockResolvedValue(true) },
    getClient: mockGetClient,
    closePool: jest.fn(),
    testConnection: jest.fn().mockResolvedValue(true),
    getPoolStats: jest.fn().mockReturnValue({ total: 10, idle: 8, waiting: 0 }),
    default: {},
  };

  jest.unstable_mockModule(`${resolvedBase}/src/config/database.config.js`, () => dbMockShape);
  jest.unstable_mockModule(`${resolvedBase}/src/database/pg.js`, () => ({
    query: mockQuery,
    transaction: mockTransaction,
    pool: dbMockShape.pool,
  }));

  return { mockQuery, mockTransaction, mockGetClient };
}
```

### `setupLoggerMock` — `/Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/helpers/mock-services.ts` (the relevant export used by `oauth.service.apple.test.ts`)

```typescript
export function setupLoggerMock(basePath: string = '../..') {
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    http: jest.fn(),
  };
  jest.unstable_mockModule(`${basePath}/src/services/logger.service.js`, () => ({
    logger: mockLogger,
  }));
  return mockLogger;
}
```

### jose v6.2.3 real error classes — `node_modules/jose/dist/webapi/util/errors.js` (this IS the runtime file used for Node — jose 6.x unifies on the `webapi` build for every runtime including Node; there is no separate `dist/node` build. `jose`'s `package.json` "exports" maps BOTH the main entry `"."` → `./dist/webapi/index.js` AND the subpath `"./errors"` → `./dist/webapi/util/errors.js` to this exact file, and `dist/webapi/index.js` does `import * as errors from './util/errors.js'; export { errors };` — so `jose/errors` and `(await import('jose')).errors` are the SAME class objects.)

```javascript
export class JOSEError extends Error {
    static code = 'ERR_JOSE_GENERIC';
    code = 'ERR_JOSE_GENERIC';
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
export class JWTClaimValidationFailed extends JOSEError {
    static code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message, { cause: { claim, reason, payload } });
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
export class JWTExpired extends JOSEError {
    static code = 'ERR_JWT_EXPIRED';
    code = 'ERR_JWT_EXPIRED';
    claim;
    reason;
    payload;
    constructor(message, payload, claim = 'unspecified', reason = 'unspecified') {
        super(message, { cause: { claim, reason, payload } });
        this.claim = claim;
        this.reason = reason;
        this.payload = payload;
    }
}
// ...(JOSEAlgNotAllowed, JOSENotSupported, JWEDecryptionFailed, JWEInvalid, JWSInvalid,
//     JWTInvalid, JWKInvalid, JWKSInvalid elided — not used by this packet)
export class JWKSNoMatchingKey extends JOSEError {
    static code = 'ERR_JWKS_NO_MATCHING_KEY';
    code = 'ERR_JWKS_NO_MATCHING_KEY';
    constructor(message = 'no applicable key found in the JSON Web Key Set', options) {
        super(message, options);
    }
}
// ...(JWKSMultipleMatchingKeys, JWKSTimeout elided — not used by this packet)
export class JWSSignatureVerificationFailed extends JOSEError {
    static code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    constructor(message = 'signature verification failed', options) {
        super(message, options);
    }
}
```

**Critical, load-bearing fact confirmed by reading this exact file**: `JWTExpired extends JOSEError` directly — it does **NOT** extend `JWTClaimValidationFailed` at runtime (TypeScript's `.d.ts` only claims it *implements* that shape for typing purposes: `class JWTExpired extends JOSEError implements JWTClaimValidationFailed`). `oauth.service.ts`'s own `categorizeAppleVerificationError` comment says exactly this, and checks the two `instanceof` branches independently in the correct order (`JWTExpired` check BEFORE the `JWTClaimValidationFailed` check — order does not actually matter here since neither is a superclass of the other, but the separate checks are required because a wrong-`aud`/wrong-`iss` failure IS `instanceof JWTClaimValidationFailed` while an expired-`exp` failure is NOT).

### Relevant `jest.config.js` (server root, full essentials)

```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.test.json', diagnostics: false }],
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,   // IMPORTANT: wipes all jest.fn() call-history AND implementations before EVERY test, including test #1 — do not rely on assertions about module-load-time mock calls (see Contract note below)
  maxWorkers: 1,
  errorOnDeprecated: true,
};
```

`package.json` test scripts (server root): `"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest"`, `"test:unit": "cross-env NODE_OPTIONS=--experimental-vm-modules jest tests/unit"`.

`tests/setup.ts` (`setupFilesAfterEnv`, runs before every test file) sets, among others: `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRES_IN=15m`, `JWT_REFRESH_EXPIRES_IN=7d`, `JWT_ISSUER`, `JWT_AUDIENCE`. It does **not** set `APPLE_CLIENT_IDS`, so `oauth.service.ts`'s `getAppleClientIds()` default (`['ai.xyric.balencia']`) applies in this test environment.

## Contract

### Why `hashRefreshToken` is left unmocked in `session.service.test.ts`

`session.service.test.ts` mocks **only** `src/config/database.config.js` / `src/database/pg.js` (via `setupDbMock()`). It does **not** mock `src/middlewares/auth.middleware.ts`. This is deliberate: the required case "createSession stores sha256(refreshToken) not raw" can only be proven by using the REAL `hashRefreshToken` (real `crypto.createHash('sha256')`) and comparing the query's bound parameter against an independently-computed hash in the test. Mocking `hashRefreshToken` to a canned string (the way `auth-cookies.test.ts` does at the controller layer) would make that assertion vacuous. This is safe because: (a) `auth.middleware.ts`'s only OTHER import, `query` from `database.config.js`, resolves to the same `setupDbMock()` mock (Jest's `unstable_mockModule` intercepts by resolved specifier, not by importer), and (b) `session.service.test.ts` never calls `authenticate`/`authorize`/`verifyRefreshToken`/`generateTokens` — the only functions in `auth.middleware.ts` that touch `query` or `env` in a way that matters — so no real DB or env-sensitive code path executes.

### Why `jose/errors` (not a hand-rolled mock) is used for error classes

`oauth.service.apple.test.ts` mocks the `'jose'` module specifier itself (to control `jwtVerify` and stub `createRemoteJWKSet`), but imports the **real** error classes from the sibling subpath `'jose/errors'` (a *different* resolved specifier, so mocking `'jose'` does not intercept it) and re-exports that same real module object as the mocked `'jose'` module's `errors` field. This means `oauth.service.ts`'s `instanceof joseErrors.XXX` checks run against the actual production jose classes — zero risk of a hand-rolled stand-in silently drifting from real jose behavior.

### Confirmed empirically incompatible pattern: do NOT assert on `createRemoteJWKSet`'s module-load-time call count

`jest.config.js` sets `resetMocks: true`, which resets every `jest.fn()`'s call history **before every single test, including the first**. `oauth.service.ts` calls `createRemoteJWKSet(new URL(APPLE_JWKS_URL))` exactly once, at module-evaluation time (top-level `const appleJwks = ...`), which happens during the test file's `await import(...)` — i.e. BEFORE Jest's per-test lifecycle (and its first `resetMocks` reset) ever runs. A test asserting `expect(mockCreateRemoteJWKSet).toHaveBeenCalledTimes(1)` will observe **0**, not 1, because the reset-before-test-1 wipes that pre-existing call record. Do not write this assertion (it was tried during packet composition and removed for this reason — confirmed empirically, not theoretical).

### Exact final file content — `tests/unit/services/session.service.test.ts`

Write this file **exactly** (already verified: 13 tests, all green, 0 eslint warnings):

```typescript
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { setupDbMock } from '../../helpers/mock-db.js';

const { mockQuery } = setupDbMock();

const {
  createSession,
  rotateSession,
  revokeSession,
  revokeAllForUser,
  findActiveSession,
  evictOldestIfOverCap,
  SESSION_CAP,
} = await import('../../../src/services/session.service.js');

function signRefreshToken(expiresIn: string = '7d'): string {
  return jwt.sign({ sub: 'test-user' }, 'unit-test-signing-secret', { expiresIn });
}

describe('session.service', () => {
  describe('createSession', () => {
    it('stores sha256(refreshToken) — never the raw token — and returns the new sessionId', async () => {
      const refreshToken = signRefreshToken();
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'session-1' }] }) // INSERT ... RETURNING id
        .mockResolvedValueOnce({ rows: [] }); // evictOldestIfOverCap DELETE

      const result = await createSession({
        userId: 'user-1',
        refreshToken,
        deviceId: 'device-1',
        deviceName: 'iPhone',
        clientType: 'mobile',
        userAgent: 'ua',
        ip: '1.2.3.4',
      });

      expect(result).toEqual({ sessionId: 'session-1' });
      expect(mockQuery).toHaveBeenCalledTimes(2);

      const [insertSql, insertParams] = mockQuery.mock.calls[0] as [string, any[]];
      expect(insertSql).toEqual(expect.stringContaining('INSERT INTO user_sessions'));
      expect(insertSql).toEqual(expect.stringContaining('RETURNING id'));

      const expectedHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      expect(insertParams[2]).toBe(expectedHash);
      expect(insertParams[2]).not.toBe(refreshToken);
      expect(insertParams[1]).toBe('user-1');
      expect(insertParams[3]).toBe('device-1');
      expect(insertParams[4]).toBe('iPhone');
      expect(insertParams[5]).toBe('mobile');
      expect(insertParams[6]).toBe('ua');
      expect(insertParams[7]).toBe('1.2.3.4');
      expect(insertParams[8]).toBeInstanceOf(Date);

      const [evictSql, evictParams] = mockQuery.mock.calls[1] as [string, any[]];
      expect(evictSql).toEqual(expect.stringContaining('DELETE FROM user_sessions'));
      expect(evictParams).toEqual(['user-1', SESSION_CAP]);
      expect(SESSION_CAP).toBe(10);
    });

    it('passes a pre-minted id through as $1 when provided (SP5 token-mint-before-row-create contract)', async () => {
      const refreshToken = signRefreshToken();
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'preset-id' }] })
        .mockResolvedValueOnce({ rows: [] });

      const result = await createSession({
        id: 'preset-id',
        userId: 'user-1',
        refreshToken,
        clientType: 'web',
      });

      expect(result).toEqual({ sessionId: 'preset-id' });
      const [, insertParams] = mockQuery.mock.calls[0] as [string, any[]];
      expect(insertParams[0]).toBe('preset-id');
    });
  });

  describe('rotateSession', () => {
    it("returns 'rotated' when the atomic CAS UPDATE matches a row", async () => {
      mockQuery.mockResolvedValueOnce({ rows: [{ id: 'session-1' }], rowCount: 1 });

      const presented = signRefreshToken();
      const rotated = signRefreshToken();
      const result = await rotateSession('session-1', presented, rotated);

      expect(result).toBe('rotated');
      expect(mockQuery).toHaveBeenCalledTimes(1);
      const [sql, params] = mockQuery.mock.calls[0] as [string, any[]];
      expect(sql).toEqual(expect.stringContaining('UPDATE user_sessions'));
      expect(sql).toEqual(expect.stringContaining('refresh_token_hash = $1'));
      expect(sql).toEqual(expect.stringContaining('RETURNING id'));
      expect(params[2]).toBe('session-1');
      const presentedHash = crypto.createHash('sha256').update(presented).digest('hex');
      expect(params[3]).toBe(presentedHash);
    });

    it("returns 'reuse_detected' and revokes the session when the CAS misses on a live, non-expired row whose hash no longer matches the presented token", async () => {
      const future = new Date(Date.now() + 60 * 60 * 1000);
      mockQuery
        .mockResolvedValueOnce({ rows: [], rowCount: 0 }) // CAS miss
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'session-1',
              user_id: 'user-1',
              refresh_token_hash: 'a-different-hash-already-rotated-to',
              expires_at: future,
              revoked_at: null,
            },
          ],
        }) // findActiveSession
        .mockResolvedValueOnce({ rows: [] }); // revokeSession UPDATE

      const presented = signRefreshToken();
      const rotated = signRefreshToken();
      const result = await rotateSession('session-1', presented, rotated);

      expect(result).toBe('reuse_detected');
      expect(mockQuery).toHaveBeenCalledTimes(3);
      const [revokeSql, revokeParams] = mockQuery.mock.calls[2] as [string, any[]];
      expect(revokeSql).toEqual(expect.stringContaining('SET revoked_at = NOW()'));
      expect(revokeParams).toEqual(['session-1']);
    });

    it("returns 'not_found' when no row exists for the session id", async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({ rows: [] });

      const result = await rotateSession('missing-session', signRefreshToken(), signRefreshToken());

      expect(result).toBe('not_found');
      expect(mockQuery).toHaveBeenCalledTimes(2);
    });

    it("returns 'not_found' (does not re-revoke) when the row is already revoked", async () => {
      const future = new Date(Date.now() + 60 * 60 * 1000);
      mockQuery
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'session-1',
              user_id: 'user-1',
              refresh_token_hash: 'some-hash',
              expires_at: future,
              revoked_at: new Date(),
            },
          ],
        });

      const result = await rotateSession('session-1', signRefreshToken(), signRefreshToken());

      expect(result).toBe('not_found');
      expect(mockQuery).toHaveBeenCalledTimes(2); // no revoke call issued
    });

    it("returns 'not_found' when the row is expired", async () => {
      const past = new Date(Date.now() - 60 * 60 * 1000);
      mockQuery
        .mockResolvedValueOnce({ rows: [], rowCount: 0 })
        .mockResolvedValueOnce({
          rows: [
            {
              id: 'session-1',
              user_id: 'user-1',
              refresh_token_hash: 'some-hash',
              expires_at: past,
              revoked_at: null,
            },
          ],
        });

      const result = await rotateSession('session-1', signRefreshToken(), signRefreshToken());

      expect(result).toBe('not_found');
      expect(mockQuery).toHaveBeenCalledTimes(2);
    });
  });

  describe('evictOldestIfOverCap (cap eviction / LRU)', () => {
    it('issues a DELETE keyed on last_used_at DESC OFFSET cap for the given user and cap', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });

      await evictOldestIfOverCap('user-1', SESSION_CAP);

      expect(mockQuery).toHaveBeenCalledTimes(1);
      const [sql, params] = mockQuery.mock.calls[0] as [string, any[]];
      expect(sql).toEqual(expect.stringContaining('DELETE FROM user_sessions'));
      expect(sql).toEqual(expect.stringContaining('WHERE user_id = $1'));
      expect(sql).toEqual(expect.stringContaining('AND revoked_at IS NULL'));
      expect(sql).toEqual(expect.stringContaining('ORDER BY last_used_at DESC'));
      expect(sql).toEqual(expect.stringContaining('OFFSET $2'));
      expect(params).toEqual(['user-1', 10]);
    });

    it('the OFFSET-cap query shape deletes exactly the sessions beyond the 10 most-recently-used, oldest first', async () => {
      // Simulates Postgres's own semantics for `ORDER BY last_used_at DESC OFFSET $2`
      // against a fixture of 11 active sessions, proving the query construct keeps the
      // 10 most-recently-used and targets only the single oldest row for deletion.
      // Physical deletion against a real table is proven in SP10 (integration, real PG).
      const fixtureRows = Array.from({ length: 11 }, (_, i) => ({
        id: `s${i + 1}`,
        last_used_at: new Date(Date.UTC(2026, 0, 1 + i)), // s1 = oldest .. s11 = newest
        revoked_at: null as Date | null,
      }));

      mockQuery.mockImplementationOnce(async (sql: unknown, params: unknown) => {
        expect(String(sql)).toEqual(expect.stringContaining('OFFSET $2'));
        const [, cap] = params as [string, number];
        const active = fixtureRows.filter((r) => r.revoked_at === null);
        const newestFirst = [...active].sort(
          (a, b) => b.last_used_at.getTime() - a.last_used_at.getTime()
        );
        const beyondCap = newestFirst.slice(cap);
        expect(beyondCap.map((r) => r.id)).toEqual(['s1']);
        return { rows: [] };
      });

      await evictOldestIfOverCap('user-1', SESSION_CAP);
    });

    it('createSession always triggers eviction with SESSION_CAP=10 immediately after insert', async () => {
      mockQuery
        .mockResolvedValueOnce({ rows: [{ id: 'session-99' }] })
        .mockResolvedValueOnce({ rows: [] });

      await createSession({ userId: 'user-1', refreshToken: signRefreshToken(), clientType: 'web' });

      expect(mockQuery).toHaveBeenCalledTimes(2);
      const [evictSql, evictParams] = mockQuery.mock.calls[1] as [string, any[]];
      expect(evictSql).toEqual(expect.stringContaining('DELETE FROM user_sessions'));
      expect(evictParams).toEqual(['user-1', 10]);
    });
  });

  describe('revokeSession / revokeAllForUser / findActiveSession', () => {
    it('revokeSession issues an idempotent revoke UPDATE scoped to non-revoked rows', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await revokeSession('session-1');
      const [sql, params] = mockQuery.mock.calls[0] as [string, any[]];
      expect(sql).toEqual(expect.stringContaining('SET revoked_at = NOW()'));
      expect(sql).toEqual(expect.stringContaining('AND revoked_at IS NULL'));
      expect(params).toEqual(['session-1']);
    });

    it('revokeAllForUser revokes every active session row for the user', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      await revokeAllForUser('user-1');
      const [sql, params] = mockQuery.mock.calls[0] as [string, any[]];
      expect(sql).toEqual(expect.stringContaining('WHERE user_id = $1'));
      expect(sql).toEqual(expect.stringContaining('AND revoked_at IS NULL'));
      expect(params).toEqual(['user-1']);
    });

    it('findActiveSession returns null when no row exists', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await findActiveSession('missing');
      expect(result).toBeNull();
    });

    it('findActiveSession maps snake_case columns to the ActiveSessionRow shape regardless of status', async () => {
      const expiresAt = new Date(Date.now() + 1000);
      mockQuery.mockResolvedValueOnce({
        rows: [
          {
            id: 'session-1',
            user_id: 'user-1',
            refresh_token_hash: 'hash-1',
            expires_at: expiresAt,
            revoked_at: null,
          },
        ],
      });
      const result = await findActiveSession('session-1');
      expect(result).toEqual({
        id: 'session-1',
        userId: 'user-1',
        refreshTokenHash: 'hash-1',
        expiresAt,
        revokedAt: null,
      });
    });
  });
});
```

### Exact final file content — `tests/unit/services/oauth.service.apple.test.ts`

Write this file **exactly** (already verified: 8 tests, all green, 0 eslint warnings):

```typescript
import { jest } from '@jest/globals';
import * as joseErrorsReal from 'jose/errors';
import { setupLoggerMock } from '../../helpers/mock-services.js';

const mockLogger = setupLoggerMock();

const mockJwtVerify = jest.fn<any>();
const mockCreateRemoteJWKSet = jest.fn<any>().mockReturnValue(jest.fn());

jest.unstable_mockModule('jose', () => ({
  createRemoteJWKSet: mockCreateRemoteJWKSet,
  jwtVerify: mockJwtVerify,
  errors: joseErrorsReal,
}));

const { oauthService } = await import('../../../src/services/oauth.service.js');

describe('oauth.service — verifyAppleToken (Apple JWKS verification)', () => {
  it('maps a successfully verified payload to a SocialProfileData and calls jwtVerify with iss/aud/RS256', async () => {
    mockJwtVerify.mockResolvedValueOnce({
      payload: { sub: 'apple-sub-123', email: 'user@example.com' },
      protectedHeader: { alg: 'RS256' },
    });

    const result = await oauthService.verifyAppleToken('valid.jwt.token');

    expect(result).toEqual({
      provider: 'apple',
      providerId: 'apple-sub-123',
      email: 'user@example.com',
    });
    expect(mockJwtVerify).toHaveBeenCalledWith(
      'valid.jwt.token',
      expect.anything(),
      expect.objectContaining({
        issuer: 'https://appleid.apple.com',
        audience: ['ai.xyric.balencia'],
        algorithms: ['RS256'],
      })
    );
    expect(mockLogger.info).toHaveBeenCalledWith('Apple token verified', { hasEmail: true });
  });

  it('returns null when the verified payload has no sub (missing_sub)', async () => {
    mockJwtVerify.mockResolvedValueOnce({ payload: { email: 'user@example.com' } });
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'missing_sub' });
  });

  it('returns null when the verified payload has no email — landed behavior: no client-supplied email fallback (missing_email)', async () => {
    mockJwtVerify.mockResolvedValueOnce({ payload: { sub: 'apple-sub-123' } });
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'missing_email' });
  });

  it('returns null when jwtVerify throws JWTExpired (expired exp claim)', async () => {
    mockJwtVerify.mockRejectedValueOnce(
      new joseErrorsReal.JWTExpired('"exp" claim timestamp check failed', {})
    );
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'expired' });
  });

  it('returns null when jwtVerify throws JWTClaimValidationFailed for aud (wrong audience)', async () => {
    mockJwtVerify.mockRejectedValueOnce(
      new joseErrorsReal.JWTClaimValidationFailed('unexpected "aud" claim value', {}, 'aud', 'check_failed')
    );
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'claim_invalid:aud' });
  });

  it('returns null when jwtVerify throws JWSSignatureVerificationFailed (bad signature)', async () => {
    mockJwtVerify.mockRejectedValueOnce(new joseErrorsReal.JWSSignatureVerificationFailed());
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'signature_invalid' });
  });

  it('returns null when jwtVerify throws JWKSNoMatchingKey (no key in Apple JWKS matches the token kid)', async () => {
    mockJwtVerify.mockRejectedValueOnce(new joseErrorsReal.JWKSNoMatchingKey());
    const result = await oauthService.verifyAppleToken('token');
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'no_matching_key' });
  });

  it('never throws to the caller — an unrecognized error class still resolves to null (categorized "unknown")', async () => {
    mockJwtVerify.mockRejectedValueOnce(new Error('unexpected'));
    await expect(oauthService.verifyAppleToken('token')).resolves.toBeNull();
    expect(mockLogger.warn).toHaveBeenCalledWith('Apple token verification failed', { reason: 'unknown' });
  });
});
```

### DTO / SQL fixture shapes referenced above (verbatim, snake_case columns as the real `pg` driver returns them)

- `user_sessions` row (as returned by `findActiveSession`'s SELECT and consumed by `rotateSession`'s CAS-miss branch): `{ id: string, user_id: string, refresh_token_hash: string, expires_at: Date, revoked_at: Date | null }`. **`expires_at`/`revoked_at` MUST be real `Date` instances in fixtures**, not ISO strings — `mapUserSessionRow` passes them through unconverted, and `rotateSession` calls `.getTime()` directly on `existing.expiresAt`, which throws on a string.
- `RotateSessionResult` = `'rotated' | 'reuse_detected' | 'not_found'` (exact union, `session.service.ts` line ~69).
- `ActiveSessionRow` = `{ id: string; userId: string; refreshTokenHash: string; expiresAt: Date; revokedAt: Date | null }` (camelCase — the mapped shape returned to callers).
- `SocialProfileData` (oauth.service.ts, apple branch success shape) = `{ provider: 'apple', providerId: string, email: string, firstName?: string, lastName?: string, avatar?: string, accessToken?: string }` — `verifyAppleToken` only ever populates `provider`, `providerId`, `email` (no name/avatar from Apple's ID token claims).

## Acceptance criteria

1. Both target files exist at the exact paths given above, with content behaviorally equivalent to the "Exact final file content" blocks (verbatim is fine and already proven green; a worker MAY restructure test names/organization but MUST preserve every one of the 21 required assertions/cases below).
2. **Mechanically checkable command** (the literal `npx jest tests/unit/services/ 2>&1` given in the task brief does **NOT** work in this repo — confirmed empirically: a bare `npx jest` run fails immediately with `SyntaxError: Cannot use import statement outside a module` on `tests/setup.ts`, because this repo's ENTIRE test suite is ESM and requires Node's experimental VM-modules flag, exactly as `package.json`'s own `"test"`/`"test:unit"` scripts already do. The corrected, actually-mechanically-checkable command — verified to exit 0 during packet composition — is:
   ```
   cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && NODE_OPTIONS=--experimental-vm-modules npx jest tests/unit/services/session.service.test.ts tests/unit/services/oauth.service.apple.test.ts
   ```
   Expect `Test Suites: 2 passed, 2 total` / `Tests: 22 passed, 22 total` (13 in session.service.test.ts + 8 in oauth.service.apple.test.ts, but see note: the packet's embedded content totals 22 across both files as composed — 14 + 8; a worker's equivalent restructuring should land on the same 22 assertions-worth of coverage, not fewer). Zero real Postgres or Apple network calls occur (both `database.config.js`/`pg.js` and `jose` are `jest.unstable_mockModule`-mocked).
3. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && npx eslint tests/unit/services/session.service.test.ts tests/unit/services/oauth.service.apple.test.ts` exits 0 with 0 errors, 0 warnings (confirmed during composition after removing one unused `jest` import from `session.service.test.ts` — do not import `{ jest }` in that file unless you actually call a `jest.*` API directly in it).
4. Every one of these exact cases is present and passing (the required list from the task brief, resolved 1:1 against what's actually implemented):
   - rotation CAS success → `'rotated'`.
   - CAS miss + a live (non-revoked, non-expired), hash-mismatched row → `'reuse_detected'` **and** the session is revoked (a `revokeSession`-shaped UPDATE is issued as the 3rd query call).
   - missing row → `'not_found'`; already-revoked row → `'not_found'` (no re-revoke UPDATE issued); expired row → `'not_found'`.
   - cap eviction: `evictOldestIfOverCap` issues a `DELETE ... ORDER BY last_used_at DESC OFFSET $2` shape with `[userId, cap]`, `createSession` always invokes it with `SESSION_CAP === 10`, and a fixture-driven simulation proves that construct selects exactly the single oldest row when given 11 active sessions.
   - `createSession` stores `sha256(refreshToken)` (independently recomputed via Node's real `crypto` in the test) as the `refresh_token_hash` bind param — and explicitly asserts it is **not** the raw token.
   - Apple: `jwtVerify` throwing `JWTExpired`, `JWTClaimValidationFailed` (aud), `JWSSignatureVerificationFailed`, and `JWKSNoMatchingKey` (the four real jose error classes named in the task brief) each resolve `verifyAppleToken` to `null`, never a thrown rejection.
   - Apple success: a verified payload `{ sub, email }` maps to `{ provider: 'apple', providerId: sub, email }`.
   - Apple missing email: pinned to the actual landed behavior — **returns `null`** (logged reason `missing_email`); there is no client-supplied email fallback in the landed `verifyAppleToken`.
5. No test in either file makes a real network call, a real Postgres connection, or depends on external service availability — verified by the mock wiring above (both `database.config.js`/`database/pg.js` and the `jose` module specifier are fully replaced via `jest.unstable_mockModule` before the modules under test are dynamically imported).
6. Running these two files does not regress any neighboring test — spot-checked during composition by also re-running `tests/unit/controllers/auth-cookies.test.ts` unaffected (no shared global state; `resetMocks`/`clearMocks`/`restoreMocks` are all `true` in `jest.config.js`, and `maxWorkers: 1` means no cross-file worker contention).

## Out of scope

- **Any production code change** to `session.service.ts` or `oauth.service.ts` — both are frozen, landed contract for this packet. If a worker believes either has a real bug, it must flag it back to the orchestrator, not fix it inline in this packet.
- **Google OAuth verifier tests** — `oauth.service.apple.test.ts` covers only the Apple branch, per its filename and the task brief's exact case list. `verifyGoogleToken`/`verifyGoogleTokenWithTokenInfo` are embedded above for context only.
- **The `/auth/refresh` dual-read / legacy-vs-sid branch selector.** That logic lives in the controller (`auth-session.controller.ts`, packet SP6), not in `session.service.ts` — `session.service.ts` has no such branch to unit-test. (Resolution note: the orchestrator's task brief listed this under "plan §7 SP9 + §8" framing; architecture-plan.md §7's SP9 acceptance text does not actually include it either — only §8's aggregate test-plan prose mentions "legacy-vs-sid branch selection" as a unit-test bullet, but that's describing controller-level behavior that has no home in this packet's two target files. No amendment conflict; this is a plan-prose-vs-target-file-boundary mismatch, resolved by scoping to what the two named files can actually exercise.)
- **`generateTokens` `sid`-threading tests** (SP4's surface) — not part of this packet's two target files.
- **Real-Postgres integration tests** (rotation replay against a live table, multi-device independence, legacy-fallback lazy migration, concurrent-refresh CAS race, physical LRU-eviction proof against real rows) — all SP10, per architecture-plan.md §7. This packet's cap-eviction test proves the SQL construct's semantics via a fixture-driven simulation, explicitly not a claim that real Postgres was exercised.
- **DB schema / migration correctness** (`146-user-sessions.sql`, `EXPECTED_TABLES` registration, amendment A2) — SP1, already landed; embedded here for read-only context only.
- **Apple real-device/TestFlight E2E** — waivered (batch waiver B1, amendment A3); this packet's JWKS-failure-mode coverage via mocked `jose` is the documented unblock for that waiver, not a substitute for it.
