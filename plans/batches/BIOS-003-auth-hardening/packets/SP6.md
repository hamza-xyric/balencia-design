# Packet SP6 — `/refresh` dual-read + lazy migration

## Objective

Rewrite the `refreshToken` controller (`POST /api/auth/refresh`) to branch on whether the verified refresh JWT carries a `sessionId` claim. When present, look up the per-device `user_sessions` row (SP3's `session.service.ts`, already landed) and rotate it atomically, detecting reuse of an already-superseded token. When absent (a legacy pre-BIOS-003 token), run the **current** `users.refresh_token` single-slot compare byte-for-byte, then lazily migrate the caller onto a new session row and clear the legacy column. This is ADR-3 + amendment A4 from `architecture-plan.md`: the dual-read gate that keeps any in-flight pre-upgrade token working while every new refresh is served by the session model. The `/refresh` response shape, cookie behavior, and `getAuthTokenPayload` `X-Client` split are **unchanged** in both branches — this is a backward-compat gate, not a contract change.

## Target files

- **MODIFY** (only): `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-session.controller.ts`
  - Only the `refreshToken` exported handler and its `session.service.js` import line change. `login`, `logout`, `forgotPassword`, `resetPassword`, `verifyEmail`, `changePassword` must remain byte-identical to the embedded source below.
- **NO OTHER FILE IS MODIFIED BY THIS PACKET.** `session.service.ts`, `auth.middleware.ts`, `auth.types.ts`, `auth.routes.ts`, `auth.validator.ts` are read-only reference for this packet (SP3/SP4/SP5 landed them already; SP7/logout hardening is a separate packet).

## Embedded current source

### File to MODIFY — `src/controllers/auth/auth-session.controller.ts` (full current content, 447 lines, POST-SP5 landed state, read live 2026-07-09)

```typescript
/**
 * @file Auth Session Controller
 * @description Handles login, logout, and password operations
 */

import type { Response } from 'express';
import crypto from 'crypto';
import { query } from '../../config/database.config.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { generateTokens, setAuthCookies, clearAuthCookies, hashRefreshToken } from '../../middlewares/auth.middleware.js';
import { emailService, logger } from '../../services/index.js';
import { createSession } from '../../services/session.service.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import type {
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
  ChangePasswordInput,
} from '../../validators/auth.validator.js';
import { comparePassword, hashPassword } from '../../helper/encryption.js';
import {
  type UserRow,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
  getSessionIssuanceMeta,
} from './auth.types.js';

/**
 * Login
 * POST /api/auth/login
 */
export const login = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as LoginInput;

    // Find user with password and role
    const userResult = await query<UserRow>(
      `SELECT u.*, r.slug as role FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.email = $1`,
      [data.email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const user = mapUserRow(userResult.rows[0]);

    if (!user.password) {
      throw ApiError.unauthorized('Please sign in with your social account');
    }

    // Check password
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Check if account is active (blocked)
    if (!user.isActive) {
      throw ApiError.forbidden(
        'Your account has been blocked. Please contact our help center for assistance.'
      );
    }

    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // BIOS-003 SP5: mint the session id up front — it must be embedded in
    // BOTH JWTs (ADR-2) AND used as the explicit row id createSession()
    // inserts under, so the stored refresh_token_hash matches the exact
    // token returned to the client (see session.service.ts CreateSessionParams.id doc).
    const sessionId = crypto.randomUUID();

    // Generate tokens (sessionId embedded in both access + refresh JWTs)
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
      sessionId,
    });

    const sessionMeta = getSessionIssuanceMeta(req);

    // Create the per-device session row. BIOS-003 stops writing
    // users.refresh_token on this path (last_login is still tracked below).
    await createSession({
      id: sessionId,
      userId: user.id,
      refreshToken: tokens.refreshToken,
      deviceId: sessionMeta.deviceId,
      deviceName: sessionMeta.deviceName,
      clientType: sessionMeta.clientType,
      userAgent: sessionMeta.userAgent,
      ip: sessionMeta.ip,
    });

    await query('UPDATE users SET last_login = $1 WHERE id = $2', [new Date(), user.id]);

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.success(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
      },
      'Logged in successfully'
    );
  }
);

/**
 * Refresh Token
 * POST /api/auth/refresh
 * Generates new access and refresh tokens with current user role from database
 * The verifyRefreshToken middleware validates the refresh token before this handler runs
 */
export const refreshToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw ApiError.unauthorized('User ID not found in token');
    }

    // Get refresh token from request (already verified by middleware)
    const refreshTokenFromRequest = req.body.refreshToken || req.cookies?.['refresh_token'];

    // Fetch current user data with role from database
    const userResult = await query<UserRow>(
      `SELECT u.*, r.slug as role FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.notFound('User not found');
    }

    const user = mapUserRow(userResult.rows[0]);

    // Check if account is active
    if (!user.isActive) {
      throw ApiError.forbidden(
        'Your account has been blocked. Please contact our help center for assistance.'
      );
    }

    // Verify refresh token matches stored token (security check)
    const storedTokenResult = await query<{ refresh_token: string | null }>(
      'SELECT refresh_token FROM users WHERE id = $1',
      [userId]
    );

    if (storedTokenResult.rows.length === 0 || !storedTokenResult.rows[0].refresh_token) {
      throw ApiError.unauthorized('Refresh token not found in database');
    }

    // Optional: Verify the token matches (for additional security)
    // This prevents using old refresh tokens after logout
    if (refreshTokenFromRequest && storedTokenResult.rows[0].refresh_token !== hashRefreshToken(refreshTokenFromRequest)) {
      throw ApiError.unauthorized('Refresh token mismatch');
    }

    // Generate new tokens with current role from database
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update hashed refresh token in database
    await query(
      'UPDATE users SET refresh_token = $1 WHERE id = $2',
      [hashRefreshToken(tokens.refreshToken), user.id]
    );

    logger.info('Tokens refreshed', { userId: user.id, role: user.role });

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.success(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
      },
      'Tokens refreshed successfully'
    );
  }
);

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (userId) {
      await query('UPDATE users SET refresh_token = NULL WHERE id = $1', [
        userId,
      ]);
      logger.info('User logged out', { userId });
    }

    clearAuthCookies(res);

    ApiResponse.success(res, null, 'Logged out successfully');
  }
);

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 */
export const forgotPassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as ForgotPasswordInput;

    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE email = $1',
      [data.email.toLowerCase()]
    );

    // Per product requirement, give explicit feedback when the email is not
    // registered. NOTE: this intentionally trades email-enumeration protection
    // for clearer UX (an attacker can learn which emails have accounts).
    if (userResult.rows.length === 0) {
      throw ApiError.notFound('No account found with this email address.');
    }

    const user = mapUserRow(userResult.rows[0]);

    // Generate a cryptographically-secure 4-digit OTP and store only its hash.
    // Reset the attempt counter so the freshly-issued code starts clean.
    const resetCode = crypto.randomInt(1000, 10000).toString();
    const hashedCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    await query(
      'UPDATE users SET password_reset_token = $1, password_reset_expires = $2, password_reset_attempts = 0 WHERE id = $3',
      [hashedCode, new Date(Date.now() + 10 * 60 * 1000), user.id] // 10 minutes
    );

    // Email the OTP code (rendered via passwordResetOTP.ejs)
    await emailService.sendPasswordResetOTPEmail(
      user.email,
      user.firstName,
      resetCode,
      '10 minutes'
    );

    logger.info('Password reset code requested', { userId: user.id });

    ApiResponse.success(
      res,
      null,
      'A reset code has been sent to your email.'
    );
  }
);

/**
 * Reset Password
 * POST /api/auth/reset-password
 */
export const resetPassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as ResetPasswordInput;
    const MAX_RESET_ATTEMPTS = 5;

    // Fetch the user by email that currently has an active (unexpired) reset code.
    // We compare the code in application code so we can count wrong guesses and
    // lock the code after too many attempts (brute-force protection for a short OTP).
    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE email = $1 AND password_reset_token IS NOT NULL AND password_reset_expires > $2',
      [data.email.toLowerCase(), new Date()]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.badRequest('Invalid or expired reset code');
    }

    const row = userResult.rows[0];
    const user = mapUserRow(row);

    // Already over the limit (e.g. a concurrent burst) — invalidate and stop.
    if (row.password_reset_attempts >= MAX_RESET_ATTEMPTS) {
      await query(
        'UPDATE users SET password_reset_token = NULL, password_reset_expires = NULL, password_reset_attempts = 0 WHERE id = $1',
        [user.id]
      );
      throw ApiError.badRequest('Too many incorrect attempts. Please request a new reset code.');
    }

    // Constant-time comparison of the submitted OTP hash against the stored hash.
    const hashedCode = crypto.createHash('sha256').update(data.otp).digest('hex');
    const storedHash = row.password_reset_token ?? '';
    const codeMatches =
      storedHash.length === hashedCode.length &&
      crypto.timingSafeEqual(Buffer.from(storedHash), Buffer.from(hashedCode));

    if (!codeMatches) {
      const attempts = row.password_reset_attempts + 1;
      if (attempts >= MAX_RESET_ATTEMPTS) {
        // Final wrong guess — burn the code so it can't be brute-forced further.
        await query(
          'UPDATE users SET password_reset_token = NULL, password_reset_expires = NULL, password_reset_attempts = 0 WHERE id = $1',
          [user.id]
        );
        throw ApiError.badRequest('Too many incorrect attempts. Please request a new reset code.');
      }
      await query(
        'UPDATE users SET password_reset_attempts = $1 WHERE id = $2',
        [attempts, user.id]
      );
      throw ApiError.badRequest('Invalid or expired reset code');
    }

    // Hash new password
    const hashedPassword = await hashPassword(data.password);

    // Update password and clear all reset state atomically
    await query(
      `UPDATE users SET
      password = $1,
      password_reset_token = NULL,
      password_reset_expires = NULL,
      password_reset_attempts = 0,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2`,
      [hashedPassword, user.id]
    );

    logger.info('Password reset', { userId: user.id });

    ApiResponse.success(res, null, 'Password reset successfully');
  }
);

/**
 * Verify Email
 * POST /api/auth/verify-email
 */
export const verifyEmail = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as VerifyEmailInput;

    // Hash token
    const hashedToken = crypto
      .createHash('sha256')
      .update(data.token)
      .digest('hex');

    // Find user with valid token
    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE email_verification_token = $1 AND email_verification_expires > $2',
      [hashedToken, new Date()]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.badRequest('Invalid or expired verification token');
    }

    const user = mapUserRow(userResult.rows[0]);

    // Verify email
    await query(
      `UPDATE users SET
      is_email_verified = true,
      email_verification_token = NULL,
      email_verification_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1`,
      [user.id]
    );

    logger.info('Email verified', { userId: user.id });

    ApiResponse.success(res, null, 'Email verified successfully');
  }
);

/**
 * Change Password (authenticated)
 * POST /api/auth/change-password
 */
export const changePassword = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as ChangePasswordInput;
    const userId = req.user!.userId;

    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.notFound('User not found');
    }

    const user = mapUserRow(userResult.rows[0]);

    if (!user.password) {
      throw ApiError.badRequest(
        'Your account uses social sign-in and does not have a password. Use the forgot password flow to set one.'
      );
    }

    const isMatch = await comparePassword(data.currentPassword, user.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Current password is incorrect');
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await query(
      `UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      [hashedPassword, userId]
    );

    logger.info('Password changed', { userId });

    try {
      await emailService.sendPasswordChangedEmail(user.email, user.firstName || 'there');
    } catch (emailErr) {
      logger.warn('Failed to send password-changed notification email', { userId, error: emailErr });
    }

    ApiResponse.success(res, null, 'Password changed successfully');
  }
);
```

### Reference (read-only, DO NOT MODIFY) — `src/middlewares/auth.middleware.ts` (full current content, 337 lines, landed)

```typescript
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

export default authenticate;
```

### Reference (read-only, DO NOT MODIFY) — `src/services/session.service.ts` (full current content, 305 lines, landed by SP3)

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

### Reference (read-only) — `src/controllers/auth/auth.types.ts`, the parts SP6 calls (excerpt, landed by SP5)

```typescript
export type AuthTokenPayload =
  | GeneratedAuthTokens
  | Pick<GeneratedAuthTokens, 'expiresIn'>;

export function getAuthTokenPayload(req: Request, tokens: GeneratedAuthTokens): AuthTokenPayload {
  const client = req.get('X-Client')?.toLowerCase();
  if (client === 'mobile') {
    return tokens;
  }

  return { expiresIn: tokens.expiresIn };
}

/**
 * Per-device metadata captured at token-issuance time (BIOS-003 SP5),
 * threaded into `createSession(...)` (session.service.ts). All fields
 * except `clientType` are best-effort/optional — a missing header never
 * blocks login/register/social sign-in, it just leaves that column NULL.
 */
export interface SessionIssuanceMeta {
  deviceId?: string;
  deviceName?: string;
  clientType: 'mobile' | 'web';
  userAgent?: string;
  ip?: string;
}

export function getSessionIssuanceMeta(req: Request): SessionIssuanceMeta {
  const deviceId = req.get('X-Device-Id');
  const deviceName = req.get('X-Device-Name');
  const userAgent = req.get('User-Agent');
  const clientType: 'mobile' | 'web' =
    req.get('X-Client')?.toLowerCase() === 'mobile' ? 'mobile' : 'web';

  return {
    deviceId: deviceId && deviceId.trim().length > 0 ? deviceId : undefined,
    deviceName: deviceName && deviceName.trim().length > 0 ? deviceName : undefined,
    clientType,
    userAgent: userAgent && userAgent.trim().length > 0 ? userAgent : undefined,
    ip: req.ip || undefined,
  };
}

/** Map database row to camelCase user object */
export function mapUserRow(row: UserRow): MappedUser { /* unchanged, not touched by SP6 */ }

/** Get public profile (safe to send to client) */
export function getPublicProfile(user: MappedUser) {
  return getPublicProfileHelper(user);
}
```

`UserRow` (imported by the controller) and `GeneratedAuthTokens` (`{ accessToken: string; refreshToken: string; expiresIn: number }`) are unchanged; do not redeclare them — they are already imported/typed in the controller file as shown in the embedded source above.

### Reference (read-only) — `src/types/index.ts`, `IJwtPayload` (verbatim, landed by SP4)

```typescript
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
  sessionId?: string;
  requestId?: string;
  trace?: RequestTrace;
}
```

### Reference (read-only) — `src/utils/ApiError.ts`, static factories used (verbatim)

```typescript
static badRequest(message = 'Bad Request', details?: AppErrorDetails[]): ApiError { /* ... */ }
static unauthorized(message = 'Unauthorized'): ApiError { /* ... */ }
static forbidden(message = 'Forbidden'): ApiError { /* ... */ }
static notFound(message = 'Resource not found'): ApiError { /* ... */ }
```

### Reference (read-only) — `src/utils/ApiResponse.ts`, `success` signature (verbatim)

```typescript
static success<T>(
  res: Response,
  data?: T,
  optionsOrMessage: SuccessOptions | string = {},
  statusCode?: number,
  req?: Request | AuthenticatedRequest
): Response
```

`ApiResponse.success(res, data, 'message string')` is the legacy-string call form already used throughout the controller (see embedded source) — SP6 keeps using this exact call form, unchanged.

### Reference (read-only) — `src/routes/auth.routes.ts`, `/refresh` wiring (verbatim, unchanged by this packet)

```typescript
// Refresh Token
router.post(
  '/refresh',
  authLimiter,
  verifyRefreshToken,
  refreshToken
);
```

No validator on this route (confirmed live) — SP6 does not add one. `verifyRefreshToken` (embedded above) already JWT-verifies the presented refresh token and throws `unauthorized('Refresh token has expired' | 'Invalid refresh token' | ...)` before `refreshToken` ever runs — a JWT-expired or malformed refresh token never reaches the controller body.

## Contract

### 1. Import line change (the only import edit)

Replace:
```typescript
import { createSession } from '../../services/session.service.js';
```
with:
```typescript
import { createSession, findActiveSession, rotateSession } from '../../services/session.service.js';
```

### 2. Full replacement for the `refreshToken` export

Replace the entire current `refreshToken` export (embedded above, from `export const refreshToken = asyncHandler(` through its closing `);`) with exactly this:

```typescript
/**
 * Refresh Token
 * POST /api/auth/refresh
 * Generates new access and refresh tokens with current user role from database
 * The verifyRefreshToken middleware validates the refresh token before this handler runs
 *
 * BIOS-003 SP6 (ADR-3, amendment A4): dual-read + lazy migration.
 *   - `req.user.sessionId` present  -> new per-device session model
 *     (`user_sessions`, session.service.ts): look up the session, rotate
 *     the stored hash atomically, detect reuse of an already-rotated token.
 *   - `req.user.sessionId` absent   -> legacy pre-BIOS-003 token (any
 *     refresh JWT signed before this deploy — e.g. one issued to mobile
 *     before the SP5 rollout, or a stray direct API caller; per amendment
 *     A4 the web client does not call this route today, so it never
 *     depends on this branch, but the branch stays correct for any
 *     pre-upgrade token in flight). Runs the CURRENT single-slot
 *     `users.refresh_token` compare byte-for-byte, then lazily migrates
 *     the caller onto a new session row and clears the legacy column so
 *     this user takes the `sessionId` branch on every subsequent refresh.
 *
 * `/refresh` response shape, cookie behavior, and `getAuthTokenPayload`
 * X-Client split are UNCHANGED in both branches.
 */
export const refreshToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw ApiError.unauthorized('User ID not found in token');
    }

    const sessionId = req.user?.sessionId;

    // Get refresh token from request (already verified by middleware)
    const refreshTokenFromRequest = req.body.refreshToken || req.cookies?.['refresh_token'];

    // Fetch current user data with role from database
    const userResult = await query<UserRow>(
      `SELECT u.*, r.slug as role FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw ApiError.notFound('User not found');
    }

    const user = mapUserRow(userResult.rows[0]);

    // Check if account is active
    if (!user.isActive) {
      throw ApiError.forbidden(
        'Your account has been blocked. Please contact our help center for assistance.'
      );
    }

    let tokens: ReturnType<typeof generateTokens>;

    if (sessionId) {
      // ---- New per-device session model (ADR-1/ADR-2/ADR-3) ----
      const existing = await findActiveSession(sessionId);
      const isMissing = !existing;
      const isRevoked = !!existing && existing.revokedAt !== null;
      const isExpired = !!existing && existing.expiresAt.getTime() <= Date.now();

      if (isMissing || isRevoked || isExpired) {
        throw ApiError.unauthorized('Session expired');
      }

      // Mint the new pair BEFORE rotating — rotateSession's atomic CAS
      // needs the new refresh token's hash to swap in. Same sessionId
      // (ADR-2: sid stays stable across rotation, only the hash changes).
      tokens = generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId,
      });

      const rotateResult = await rotateSession(sessionId, refreshTokenFromRequest, tokens.refreshToken);

      if (rotateResult === 'reuse_detected') {
        throw ApiError.unauthorized('Refresh token mismatch');
      }

      if (rotateResult === 'not_found') {
        throw ApiError.unauthorized('Session expired');
      }

      // rotateResult === 'rotated' -> fall through to the shared response below.
    } else {
      // ---- Legacy pre-BIOS-003 path: CURRENT single-slot compare, byte-for-byte ----
      const storedTokenResult = await query<{ refresh_token: string | null }>(
        'SELECT refresh_token FROM users WHERE id = $1',
        [userId]
      );

      if (storedTokenResult.rows.length === 0 || !storedTokenResult.rows[0].refresh_token) {
        throw ApiError.unauthorized('Refresh token not found in database');
      }

      // Optional: Verify the token matches (for additional security)
      // This prevents using old refresh tokens after logout
      if (refreshTokenFromRequest && storedTokenResult.rows[0].refresh_token !== hashRefreshToken(refreshTokenFromRequest)) {
        throw ApiError.unauthorized('Refresh token mismatch');
      }

      // Lazy migration (ADR-3, amendment A4): mint a session id up front —
      // same convention as `login` (SP5) — so the new tokens' `sessionId`
      // claim matches the `user_sessions` row id.
      const newSessionId = crypto.randomUUID();

      tokens = generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: newSessionId,
      });

      const sessionMeta = getSessionIssuanceMeta(req);

      await createSession({
        id: newSessionId,
        userId: user.id,
        refreshToken: tokens.refreshToken,
        deviceId: sessionMeta.deviceId,
        deviceName: sessionMeta.deviceName,
        clientType: sessionMeta.clientType,
        userAgent: sessionMeta.userAgent,
        ip: sessionMeta.ip,
      });

      // One-time clear: this user is now on the session model.
      await query('UPDATE users SET refresh_token = NULL WHERE id = $1', [user.id]);
    }

    logger.info('Tokens refreshed', { userId: user.id, role: user.role });

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.success(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
      },
      'Tokens refreshed successfully'
    );
  }
);
```

### Resolved plan/live-source deltas (per amendment A7 — re-derived from live source, not plan prose)

- The task brief lists the legacy-migrate steps in the order "createSession, then generateTokens, then clear column." That prose order is not executable — `createSession` needs the actual signed `refreshToken` string (from `generateTokens`) to hash and store, and `CreateSessionParams.id` (session.service.ts docblock) documents the required order as: mint `sessionId` via `crypto.randomUUID()` → `generateTokens({..., sessionId})` → `createSession({id: sessionId, refreshToken: tokens.refreshToken, ...})`. This is exactly the order the already-landed `login` handler uses (embedded above). **Resolution: the Contract code above uses the `login`-handler order** (mint id → generate → createSession → clear column), not the brief's literal prose order.
- `findActiveSession` is misleadingly named (its own docstring says so) — it is a plain "find row by id in any status," not an "active-only" filter. The Contract code performs the missing/revoked/expired disambiguation itself in the controller (`isMissing`/`isRevoked`/`isExpired`), matching the exact logic `rotateSession`'s internal CAS-miss branch already uses, for consistency.
- The reuse-detected message is confirmed **verbatim from live source** as `'Refresh token mismatch'` (current `refreshToken`, line 171 of the pre-SP6 file, and also used in the legacy branch's own mismatch check) — this exact string is reused for the sid-path `reuse_detected` case per the task's mobile-compat requirement.
- `'Session expired'` is a **new** message string (not present anywhere in `auth-session.controller.ts` today) introduced by this packet for the two sid-path 401s (missing/revoked/expired session, and `rotateSession`'s `not_found` outcome) per the task's explicit instruction; it does not alter any existing message.

## Acceptance criteria

1. `cd yhealth-app/server && npm run typecheck` (`tsc --noEmit`) exits 0.
2. `cd yhealth-app/server && npm run lint` (`eslint src tests`) exits 0 for the touched file.
3. `git diff -- src/controllers/auth/auth-session.controller.ts` shows changes **only** inside the `refreshToken` export and the single `session.service.js` import line; `login`, `logout`, `forgotPassword`, `resetPassword`, `verifyEmail`, `changePassword` are byte-identical to the embedded source above (diff shows zero lines changed in those functions).
4. The import line reads exactly `import { createSession, findActiveSession, rotateSession } from '../../services/session.service.js';`.
5. sid path: `findActiveSession(sessionId)` is called and its result checked (missing/revoked/expired) **before** any call to `generateTokens` in that branch; on missing/revoked/expired, `ApiError.unauthorized('Session expired')` is thrown before any token is minted or DB row written.
6. sid path: `generateTokens({ userId: user.id, email: user.email, role: user.role, sessionId })` is called with the **same** `sessionId` read from `req.user.sessionId` (no new uuid minted on this path) before `rotateSession(sessionId, refreshTokenFromRequest, tokens.refreshToken)` is called.
7. sid path: `rotateResult === 'reuse_detected'` throws `ApiError.unauthorized('Refresh token mismatch')`; `rotateResult === 'not_found'` throws `ApiError.unauthorized('Session expired')`; `rotateResult === 'rotated'` falls through to the shared response block (no duplicate response code inside the branch).
8. legacy path (`req.user.sessionId` is `undefined`): the `SELECT refresh_token FROM users WHERE id = $1` query, the not-found check (`ApiError.unauthorized('Refresh token not found in database')`), and the mismatch check (`ApiError.unauthorized('Refresh token mismatch')` guarded by `refreshTokenFromRequest && ... !== hashRefreshToken(...)`) are present with identical SQL text and identical message strings to the pre-SP6 source.
9. legacy path on success: exactly one `crypto.randomUUID()` call mints `newSessionId`; `generateTokens` is called with `sessionId: newSessionId`; `createSession` is called with `id: newSessionId`, `refreshToken: tokens.refreshToken`, and `deviceId/deviceName/clientType/userAgent/ip` sourced from `getSessionIssuanceMeta(req)`; followed by exactly one `UPDATE users SET refresh_token = NULL WHERE id = $1` (parameterized on `user.id`).
10. Exactly one call site for `setAuthCookies(res, tokens)` and exactly one call site for `ApiResponse.success(res, { user: getPublicProfile(user), tokens: getAuthTokenPayload(req, tokens) }, 'Tokens refreshed successfully')` exist in the function, reached from both branches (not duplicated per-branch).
11. `grep -c "refresh_token = NULL" src/controllers/auth/auth-session.controller.ts` returns `2` (the pre-existing one in `logout`, untouched, plus the one new occurrence in the legacy-migrate branch of `refreshToken`).
12. No other file in the repository is modified by this packet (`git status` / `git diff --stat` shows only `auth-session.controller.ts`).
13. No new npm dependency is added (`package.json`/`package-lock.json` untouched).

## Out of scope

- `login`, `register`/`verify-registration`, `social` token issuance (SP5 — already landed, embedded above for reference only, not touched).
- `logout` this-device/all-devices (SP7 — separate packet; the current global-nulling `logout` body stays exactly as embedded).
- Apple/Google verification wiring (SP2/SP8 — separate packets).
- Any change to `session.service.ts`, `auth.middleware.ts`, `auth.types.ts`, `auth.routes.ts`, `auth.validator.ts`, or the `user_sessions` table/migration (SP1/SP3/SP4 already landed; do not re-touch).
- Unit tests (`tests/unit/services/session.service.test.ts`) and integration tests (`tests/integration/auth*.test.ts`) — SP9/SP10, separate packets. This packet's acceptance is typecheck/lint + the mechanical diff checks above only; it does not add or run tests itself.
- Mobile-side changes (MP1–MP10) — separate wave, gated on the full server contract (SP1–SP10) being frozen.
- Any change to `/login`, `/register`, `/social`, `/logout` response shapes, cookie names/paths/options, or the `X-Client` split — all unchanged by this packet.
