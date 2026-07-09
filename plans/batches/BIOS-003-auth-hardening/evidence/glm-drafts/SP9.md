=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/unit/services/session.service.test.ts ===
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/tests/unit/services/oauth.service.apple.test.ts ===
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
=== END FILE ===
