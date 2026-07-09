=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-session.controller.ts ===
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
import { createSession, findActiveSession, rotateSession } from '../../services/session.service.js';
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
=== END FILE ===
