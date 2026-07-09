# Packet SP5 — Wire login/register/social token issuance to per-device sessions

## Objective

ADR-1/ADR-2/ADR-3 (`architecture-plan.md`) replace the single-slot `users.refresh_token` write with a per-device `user_sessions` row on every token-issuing path. This packet wires the **three token-issuance call sites** — `login()` and `refreshToken()`'s sibling `verifyRegistration()` (in `auth-registration.controller.ts`) and `socialAuth()`'s issuance tail — to call the already-landed `session.service.ts` (SP3) instead of writing `users.refresh_token`. It also threads a per-device `sessionId` into `generateTokens()` (SP4, already landed and accepts this today with zero changes) so the issued JWTs carry the `sid` claim ADR-2 requires.

This packet does **not** touch `/auth/refresh` (SP6, dual-read + lazy migration) or `/auth/logout` (SP7), and does **not** touch Apple/Google verification logic inside `socialAuth()` (SP8) — only the token-issuance tail of each of the three handlers changes.

## Target files (exact absolute paths)

All four are **modify** (no new files):

- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-session.controller.ts` — `login()` handler only.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-registration.controller.ts` — `verifyRegistration()` and `socialAuth()` token-issuance tails only.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth.types.ts` — **additive** helper (see "Resolved mismatch #2" below): a shared `getSessionIssuanceMeta(req)` used by all three call sites above, avoiding triplicated header-parsing logic. This file already houses shared auth-controller helpers (`getAuthTokenPayload`, `mapUserRow`, `ensureAdminRole`) that both controller files import from — this is the same pattern, not a new module.
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/session.service.ts` — **additive** change to `CreateSessionParams`/`createSession` (see "Resolved mismatch #1" below): an optional explicit `id` field.

**Do not touch (read-only context, embedded below for reference only):**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/middlewares/auth.middleware.ts` (SP4, already landed — `generateTokens` already accepts `sessionId`)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/types/index.ts` (`IJwtPayload` already declares `sessionId?: string`)

**Resolved mismatch #1 (plan §7 vs. what the ordering actually requires — BINDING resolution, apply as written):**
Plan §7's one-line SP5 summary just says "call `createSession` then `generateTokens({...,sessionId})`". That literal order is impossible: `session.service.ts`'s landed `createSession({..., refreshToken})` **hashes and stores the refresh token you hand it** — so the refresh token must already exist (and already carry the final `sid` claim) *before* `createSession` runs, otherwise the stored `refresh_token_hash` would belong to a token that was thrown away and never returned to the client. And the token can't carry the right `sid` claim before the session row exists — unless the id is minted before the row exists. Resolution: **mint the session id client-side-of-the-DB with `crypto.randomUUID()` first**, pass it into `generateTokens({..., sessionId})` to produce the final token pair, **then** call `createSession({ id: sessionId, ..., refreshToken: tokens.refreshToken })` so the row is created under that exact id and its stored hash matches the exact token returned to the client. This requires `session.service.ts`'s `CreateSessionParams` to accept an optional `id` — it does not today (confirmed live, embedded below) — so this packet adds it, additively: `id?: string`, defaulting to `uuid_generate_v4()` in SQL when omitted (backward compatible with any future caller that doesn't pre-mint an id). Exact diff is in the Contract section.

**Resolved mismatch #2 (packet-composer discretion, additive-only):** the same 5-line header-parsing block (`X-Device-Id` / `X-Device-Name` / `X-Client` / `User-Agent` / `req.ip`) is needed identically at all three call sites. Rather than tripling it, this packet adds one small exported helper, `getSessionIssuanceMeta(req)`, to `auth.types.ts` — the file both controllers already import shared helpers from. This is additive only; no existing export in that file changes.

## Embedded current source

### FULL file (verified live, 427 lines): `src/controllers/auth/auth-session.controller.ts`

```ts
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

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store hashed refresh token
    await query(
      'UPDATE users SET last_login = $1, refresh_token = $2 WHERE id = $3',
      [new Date(), hashRefreshToken(tokens.refreshToken), user.id]
    );

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

**Only `login()` (lines 35-98 above) changes in this file.** `refreshToken()`, `logout()`, `forgotPassword()`, `resetPassword()`, `verifyEmail()`, `changePassword()` are all out of scope (SP6/SP7/untouched) — do not edit them, and do not remove the `hashRefreshToken` import (still used by `refreshToken()`).

### FULL file (verified live, 557 lines): `src/controllers/auth/auth-registration.controller.ts`

```ts
/**
 * @file Auth Registration Controller
 * @description Handles user registration (local and social)
 */

import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { query, transaction } from '../../config/database.config.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { generateTokens, setAuthCookies, hashRefreshToken } from '../../middlewares/auth.middleware.js';
import { emailService, logger } from '../../services/index.js';
import { mailHelper } from '../../helper/mail.js';
import { env } from '../../config/env.config.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import { notificationService } from '../../services/notification.service.js';
import { chatService } from '../../services/chat.service.js';
import { oauthService } from '../../services/oauth.service.js';
import { ensureWallet } from '../../services/credit.service.js';
import type {
  RegisterInput,
  SocialAuthInput,
  CompleteSocialProfileInput,
  VerifyRegistrationInput,
  ResendRegistrationOTPInput,
} from '../../validators/auth.validator.js';
import { hashPassword } from '../../helper/encryption.js';
import {
  type ActivationTokenPayload,
  type UserRow,
  createActivationToken,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
} from './auth.types.js';

/**
 * S01.1.1: Core Account Registration - Step 1: Send OTP
 * POST /api/auth/register
 */
export const register = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as RegisterInput;

    // Check if email exists
    const existingResult = await query<UserRow>(
      'SELECT id FROM users WHERE email = $1',
      [data.email.toLowerCase()]
    );

    if (existingResult.rows.length > 0) {
      throw ApiError.conflict(
        'This email is already registered. Sign in or reset password?'
      );
    }

    // Hash password before storing in token
    const hashedPassword = await hashPassword(data.password);

    // Create registration data with hashed password
    const registrationData: RegisterInput = {
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    };

    // Generate activation token with 4-digit OTP
    const { token: activationToken, activationCode } =
      createActivationToken(registrationData);

    // Send OTP email
    const emailSent = await mailHelper.sendRegistrationOTPEmail(
      data.email,
      data.firstName,
      activationCode,
      '10 minutes'
    );

    if (!emailSent && !env.isTest) {
      logger.error('Registration OTP email failed', { email: data.email });
      throw ApiError.serviceUnavailable(
        'Unable to send verification email right now. Please try again shortly.'
      );
    }

    logger.info('Registration OTP sent', { email: data.email });

    ApiResponse.success(
      res,
      {
        activationToken,
        message: 'Verification code sent to your email',
      },
      'Please check your email for the verification code'
    );
  }
);

/**
 * S01.1.1: Core Account Registration - Step 2: Verify OTP and Create Account
 * POST /api/auth/verify-registration
 */
export const verifyRegistration = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { activationToken, activationCode } =
      req.body as VerifyRegistrationInput;

    // Verify and decode the activation token
    let decoded: ActivationTokenPayload;
    try {
      decoded = jwt.verify(
        activationToken,
        env.jwt.secret
      ) as ActivationTokenPayload;
    } catch {
      throw ApiError.badRequest(
        'Invalid or expired verification code. Please register again.'
      );
    }

    // Verify the activation code matches
    if (decoded.activationCode !== activationCode) {
      throw ApiError.badRequest('Invalid verification code');
    }

    const userData = decoded.user;

    // Create user with preferences in a transaction
    // Let the database unique constraint handle race conditions
    let user;
    try {
      const DEFAULT_USER_ROLE_ID = '11111111-1111-1111-1111-111111111101';
      user = await transaction(async (client) => {
        const userResult = await client.query<UserRow>(
          `INSERT INTO users (
          email, password, first_name, last_name, date_of_birth, gender,
          auth_provider, onboarding_status, is_email_verified, role_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
          [
            userData.email,
            userData.password, // Already hashed
            userData.firstName,
            userData.lastName,
            new Date(userData.dateOfBirth),
            userData.gender,
            'local',
            'consent_pending',
            true, // Email is verified since they confirmed OTP
            DEFAULT_USER_ROLE_ID,
          ]
        );

        const newUser = userResult.rows[0];

        // Create default preferences
        await client.query('INSERT INTO user_preferences (user_id) VALUES ($1)', [
          newUser.id,
        ]);

        return mapUserRow(newUser);
      });
    } catch (err) {
      // Handle unique constraint violation (code 23505) - email already exists
      if ((err as { code?: string }).code === '23505') {
        throw ApiError.conflict(
          'This email is already registered. Sign in or reset password?'
        );
      }
      throw err;
    }

    // Grant initial credits
    const signupCredits = env.entitlement.defaultSignupCredits;
    if (signupCredits > 0) {
      ensureWallet(user.id, { initialPlanCredits: signupCredits }).catch((error) => {
        logger.warn('Failed to create wallet with signup credits (non-blocking)', {
          error: error instanceof Error ? error.message : 'Unknown error',
          userId: user.id,
          credits: signupCredits,
        });
      });
    }

    // Send welcome email (non-blocking - don't fail registration if email fails)
    emailService.sendWelcomeEmail(user.email, user.firstName).catch((error) => {
      logger.warn('Failed to send welcome email (non-blocking)', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: user.id,
        email: user.email,
      });
    });

    // Send welcome notification
    await notificationService.welcomeUser(user.id, user.firstName);

    // Add user to Balencia Community group (non-blocking)
    chatService.addUserToCommunityGroup(user.id).catch((error) => {
      logger.warn('Failed to add user to community group (non-blocking)', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: user.id,
      });
    });

    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store hashed refresh token
    await query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      hashRefreshToken(tokens.refreshToken),
      user.id,
    ]);

    logger.info('User registered after OTP verification', {
      userId: user.id,
      email: user.email,
      signupCredits,
    });

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.created(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
        nextStep: 'consent',
      },
      'Account created successfully'
    );
  }
);

/**
 * Resend Registration OTP
 * POST /api/auth/resend-registration-otp
 */
export const resendRegistrationOTP = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { activationToken } = req.body as ResendRegistrationOTPInput;

    // Verify and decode the activation token
    let decoded: ActivationTokenPayload;
    try {
      decoded = jwt.verify(
        activationToken,
        env.jwt.secret
      ) as ActivationTokenPayload;
    } catch {
      throw ApiError.badRequest('Session expired. Please register again.');
    }

    const userData = decoded.user;

    // Check if email was already registered
    const existingResult = await query<UserRow>(
      'SELECT id FROM users WHERE email = $1',
      [userData.email]
    );

    if (existingResult.rows.length > 0) {
      throw ApiError.conflict(
        'This email is already registered. Sign in or reset password?'
      );
    }

    // Generate new activation token with new 4-digit OTP
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newToken = jwt.sign(
      {
        user: userData,
        activationCode,
      } as ActivationTokenPayload,
      env.jwt.secret,
      { expiresIn: '10m' }
    );

    // Send new OTP email
    const emailSent = await mailHelper.sendRegistrationOTPEmail(
      userData.email,
      userData.firstName,
      activationCode,
      '10 minutes'
    );

    if (!emailSent && !env.isTest) {
      logger.error('Registration OTP resend email failed', { email: userData.email });
      throw ApiError.serviceUnavailable(
        'Unable to send verification email right now. Please try again shortly.'
      );
    }

    logger.info('Registration OTP resent', { email: userData.email });

    ApiResponse.success(
      res,
      {
        activationToken: newToken,
        message: 'New verification code sent to your email',
      },
      'Please check your email for the new verification code'
    );
  }
);

/**
 * S01.1.2: Social Sign-In (Google/Apple) via NextAuth
 * POST /api/auth/social
 */
export const socialAuth = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const data = req.body as SocialAuthInput;

    // Validate required fields from NextAuth
    if (!data.email || !data.provider) {
      throw ApiError.badRequest('Email and provider are required');
    }

    const provider = data.provider;

    // Try to verify the id_token with Google directly.
    // If verification fails due to network issues, fall back to the
    // NextAuth-provided profile data (NextAuth already completed the
    // full OAuth PKCE flow and verified the user's identity).
    let verifiedProfile: Awaited<ReturnType<typeof oauthService.verifySocialToken>> = null;

    if (provider === 'google' && data.idToken) {
      try {
        verifiedProfile = await oauthService.verifySocialToken(provider, data.idToken);
      } catch (verifyError) {
        logger.warn('Google token verification failed, falling back to NextAuth profile', {
          error: verifyError instanceof Error ? verifyError.message : 'Unknown',
        });
      }
    }

    // Require at minimum an email and providerId from NextAuth
    if (provider === 'google' && !verifiedProfile) {
      if (!data.email || !data.providerId) {
        throw ApiError.unauthorized('Google sign-in could not be verified. Please try again.');
      }
      logger.info('Using NextAuth-provided profile for Google sign-in (token verification skipped)', {
        email: data.email,
      });
    }

    const email = (verifiedProfile?.email || data.email).toLowerCase();
    const providerId = verifiedProfile?.providerId || data.providerId || data.idToken;
    const firstName = verifiedProfile?.firstName || data.firstName || data.name?.split(' ')[0] || '';
    const lastName = verifiedProfile?.lastName || data.lastName || data.name?.split(' ').slice(1).join(' ') || '';
    const avatar = verifiedProfile?.avatar || data.avatar || null;

    // Check if user exists by email
    const existingUserResult = await query<UserRow>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    let user: ReturnType<typeof mapUserRow>;
    let isNewUser = false;

    if (existingUserResult.rows.length > 0) {
      // User exists - verify and update provider info if needed
      user = mapUserRow(existingUserResult.rows[0]);

      // Update provider info and last login
      await query(
        `UPDATE users SET
        last_login = $1,
        auth_provider = COALESCE($2, auth_provider),
        provider_id = COALESCE($3, provider_id),
        avatar = COALESCE($4, avatar),
        is_email_verified = true
      WHERE id = $5`,
        [new Date(), provider, providerId || null, avatar, user.id]
      );

      // Refresh user data
      const updatedResult = await query<UserRow>(
        'SELECT * FROM users WHERE id = $1',
        [user.id]
      );
      user = mapUserRow(updatedResult.rows[0]);

      logger.info('Social sign-in', { userId: user.id, provider });
    } else {
      // New user - create account
      // Default role ID for regular users
      const DEFAULT_USER_ROLE_ID = '11111111-1111-1111-1111-111111111101';
      
      const newUserResult = await transaction(async (client) => {
        const userResult = await client.query<UserRow>(
          `INSERT INTO users (
          email, first_name, last_name, avatar, auth_provider, provider_id,
          is_email_verified, onboarding_status, role_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
          [
            email,
            firstName,
            lastName,
            avatar,
            provider,
            providerId,
            true,
            'consent_pending',
            DEFAULT_USER_ROLE_ID,
          ]
        );

        const newUser = userResult.rows[0];

        // Create default preferences
        await client.query(
          'INSERT INTO user_preferences (user_id) VALUES ($1)',
          [newUser.id]
        );

        return mapUserRow(newUser);
      });

      user = newUserResult;
      isNewUser = true;

      // Grant initial credits
      const signupCredits = env.entitlement.defaultSignupCredits;
      if (signupCredits > 0) {
        ensureWallet(user.id, { initialPlanCredits: signupCredits }).catch((error) => {
          logger.warn('Failed to create wallet with signup credits (non-blocking)', {
            error: error instanceof Error ? error.message : 'Unknown error',
            userId: user.id,
            credits: signupCredits,
          });
        });
      }

      // Send welcome email
      if (user.firstName) {
        emailService.sendWelcomeEmail(user.email, user.firstName).catch((error) => {
          logger.warn('Failed to send welcome email (non-blocking)', {
            error: error instanceof Error ? error.message : 'Unknown error',
            userId: user.id,
            email: user.email,
          });
        });
      }

      // Send welcome notification
      await notificationService.welcomeUser(user.id, user.firstName);

      // Add user to Balencia Community group (non-blocking)
      chatService.addUserToCommunityGroup(user.id).catch((error) => {
        logger.warn('Failed to add user to community group (non-blocking)', {
          error: error instanceof Error ? error.message : 'Unknown error',
          userId: user.id,
        });
      });

      logger.info('Social registration', { userId: user.id, provider });
    }

    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store hashed refresh token
    await query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      hashRefreshToken(tokens.refreshToken),
      user.id,
    ]);

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    const responseData = {
      user: getPublicProfile(user),
      tokens: getAuthTokenPayload(req, tokens),
      isNewUser,
      needsProfileCompletion: !user.dateOfBirth || !user.gender,
    };

    if (isNewUser) {
      ApiResponse.created(
        res,
        {
          ...responseData,
          nextStep:
            user.dateOfBirth && user.gender ? 'consent' : 'complete_profile',
        },
        'Account created successfully'
      );
    } else {
      ApiResponse.success(res, responseData, 'Signed in successfully');
    }
  }
);

/**
 * Complete social profile (DOB, Gender for social sign-up)
 * POST /api/auth/complete-profile
 */
export const completeSocialProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw ApiError.unauthorized();

    const data = req.body as CompleteSocialProfileInput;

    const result = await query<UserRow>(
      `UPDATE users SET
        date_of_birth = $1,
        gender = $2,
        first_name = COALESCE($3, first_name),
        last_name = COALESCE($4, last_name),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *`,
      [
        new Date(data.dateOfBirth),
        data.gender,
        data.firstName || null,
        data.lastName || null,
        userId,
      ]
    );

    const user = mapUserRow(result.rows[0]);

    logger.info('Profile completed', { userId });

    ApiResponse.success(
      res,
      {
        user: getPublicProfile(user),
        nextStep: 'consent',
      },
      'Profile updated successfully'
    );
  }
);
```

**Only `verifyRegistration()`'s token-issuance tail and `socialAuth()`'s token-issuance tail change in this file.** `register()`, `resendRegistrationOTP()`, `completeSocialProfile()`, and all of `socialAuth()`'s verification/account-lookup/account-creation logic **above** its token-issuance tail are out of scope — do not edit them. Remove the `hashRefreshToken` import from the top-level import list (see Contract §4) — after this packet's edits it has no remaining use in this file.

### FULL file (verified live, 186 lines): `src/controllers/auth/auth.types.ts`

```ts
/**
 * @file Auth controller shared types
 * @description Type definitions and helpers shared across auth controller modules
 */

import jwt from 'jsonwebtoken';
import type { Request } from 'express';
import type { RegisterInput } from '../../validators/auth.validator.js';
import { env } from '../../config/env.config.js';
import { query } from '../../config/database.config.js';
import { getPublicProfile as getPublicProfileHelper } from '../../utils/user.helpers.js';
import type { MappedUser } from '../../database/schemas/index.js';

// Activation token payload type
export interface ActivationTokenPayload {
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
  };
  activationCode: string;
}

// Type definitions for raw PostgreSQL results
export interface UserRow {
  id: string;
  email: string;
  password: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: Date | null;
  gender: string | null;
  role_id: string;
  role?: string; // slug from roles join
  is_active: boolean;
  is_email_verified: boolean;
  avatar: string | null;
  phone: string | null;
  auth_provider: string;
  provider_id: string | null;
  onboarding_status: string;
  onboarding_completed_at: Date | null;
  last_login: Date | null;
  refresh_token: string | null;
  password_reset_token: string | null;
  password_reset_expires: Date | null;
  password_reset_attempts: number;
  email_verification_token: string | null;
  email_verification_expires: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ConsentRow {
  id: string;
  user_id: string;
  type: string;
  version: string;
  consented_at: Date;
  ip: string | null;
}

export interface WhatsAppRow {
  id: string;
  user_id: string;
  phone_number: string;
  country_code: string;
  is_verified: boolean;
  verified_at: Date | null;
  consented_at: Date | null;
}

export const CONSENT_VERSION = '1.0.0';

export interface GeneratedAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

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
 * Generate activation token with 4-digit OTP code
 */
export function createActivationToken(user: RegisterInput): {
  token: string;
  activationCode: string;
} {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user: {
        email: user.email,
        password: user.password, // Already hashed
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth.toISOString(),
        gender: user.gender,
      },
      activationCode,
    } as ActivationTokenPayload,
    env.jwt.secret,
    { expiresIn: '10m' }
  );
  return { token, activationCode };
}

/**
 * Map database row to camelCase user object
 */
export function mapUserRow(row: UserRow): MappedUser {
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    firstName: row.first_name,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    role: row.role ?? 'user',
    isActive: row.is_active,
    isEmailVerified: row.is_email_verified,
    avatar: row.avatar,
    phone: row.phone,
    authProvider: row.auth_provider,
    providerId: row.provider_id,
    onboardingStatus: row.onboarding_status,
    onboardingCompletedAt: row.onboarding_completed_at,
    lastLogin: row.last_login,
    refreshToken: row.refresh_token,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Get public profile (safe to send to client)
 * Uses helper from user.helpers.ts to ensure avatar URLs don't expire
 */
export function getPublicProfile(user: MappedUser) {
  return getPublicProfileHelper(user);
}

/**
 * Check if user has a specific consent
 */
export function hasConsent(consents: ConsentRow[], type: string): boolean {
  return consents.some((c) => c.type === type);
}

const ADMIN_ROLE_ID = '11111111-1111-1111-1111-111111111102';

/**
 * Auto-promote user to admin if their email is in ADMIN_EMAILS env var.
 * Updates both users.role_id and user_roles join table.
 * Returns the updated role slug ('admin') or the original role if no promotion.
 */
export async function ensureAdminRole(userId: string, email: string, currentRole: string): Promise<string> {
  if (env.adminEmails.length === 0) return currentRole;
  if (!env.adminEmails.includes(email.toLowerCase())) return currentRole;
  if (currentRole === 'admin') return currentRole;

  await query('UPDATE users SET role_id = $1 WHERE id = $2', [ADMIN_ROLE_ID, userId]);
  await query(
    'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [userId, ADMIN_ROLE_ID],
  );

  return 'admin';
}
```

**All existing exports of this file are unchanged.** This packet only **adds** a new interface + function (Contract §2) — insert it, do not reorder or edit anything above it.

### FULL file (verified live, 290 lines, landed by SP3): `src/services/session.service.ts`

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
```

The block above is the **complete, verbatim, unedited** `session.service.ts` as landed by SP3 — nothing in it is elided or paraphrased. Per Contract §1, this packet changes exactly two things in this file: the `CreateSessionParams` interface (adds one optional `id` field) and the `createSession` function body (destructures `id` and passes it through `COALESCE($1::uuid, uuid_generate_v4())`). `rotateSession`, `revokeSession`, `revokeAllForUser`, `findActiveSession`, `evictOldestIfOverCap`, `SESSION_CAP`, `RotateSessionResult`, `ActiveSessionRow`, and both internal helpers are **byte-unchanged** — copy them through exactly as shown above, do not "improve" or reformat them.

### Reference only — DO NOT MODIFY: `src/middlewares/auth.middleware.ts` (relevant excerpts, landed by SP4)

```ts
export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
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
```

### Reference only — DO NOT MODIFY: `src/types/index.ts` (relevant excerpt)

```ts
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId?: string;
}
```

`generateTokens({ userId, email, role, sessionId })` already type-checks today — `sessionId` is a valid optional key of `Omit<IJwtPayload, 'iat'|'exp'>`. Confirmed live; no change needed to either of these two files.

## Contract

### §1 — `session.service.ts`: additive `id` support (exact replacement)

Replace the `CreateSessionParams` interface (in the "TYPES" section) with:

```ts
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
```

Replace the `createSession` function body with:

```ts
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
```

Notes:
- `$1::uuid` is an explicit cast so Postgres never has to guess the parameter's type when it flows into `COALESCE(..., uuid_generate_v4())` (avoids any driver-level type-inference ambiguity between an untyped bind parameter and a `uuid`-returning function). `uuid_generate_v4()` is already in use as the column's own `DEFAULT` in `146-user-sessions.sql` — the extension providing it is already enabled.
- Everything else in the file (`rotateSession`, `revokeSession`, `revokeAllForUser`, `findActiveSession`, `evictOldestIfOverCap`, `SESSION_CAP`, `RotateSessionResult`, `ActiveSessionRow`, the two internal helpers) is **byte-unchanged**.

### §2 — `auth.types.ts`: additive `SessionIssuanceMeta` + `getSessionIssuanceMeta` (exact insertion)

Insert this block immediately **after** the existing `getAuthTokenPayload` function (i.e. directly after its closing `}` and before the `/** Generate activation token with 4-digit OTP code */` comment):

```ts
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

/**
 * Reads the per-device session-labeling headers off a request. Uses
 * `req.get(...)`, which is case-insensitive on the header NAME by
 * construction (Express lowercases both the lookup key and the incoming
 * header names) — matching the same pattern `getAuthTokenPayload` above
 * already uses for `X-Client`. `clientType` mirrors `getAuthTokenPayload`'s
 * `X-Client` check exactly: mobile only when the header value
 * case-insensitively equals `'mobile'`, web otherwise (including when the
 * header is absent — the current web NextAuth flow sends no `X-Client`
 * header at all).
 */
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
```

No existing export in this file changes.

### §3 — `auth-session.controller.ts`: `login()` replacement (exact)

Replace the import block (the two import statements below, currently at the top of the file):

```ts
import { generateTokens, setAuthCookies, clearAuthCookies, hashRefreshToken } from '../../middlewares/auth.middleware.js';
```
stays **exactly as-is** (do not remove `hashRefreshToken` here — `refreshToken()` in this same file still uses it).

```ts
import {
  type UserRow,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
} from './auth.types.js';
```
becomes:
```ts
import {
  type UserRow,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
  getSessionIssuanceMeta,
} from './auth.types.js';
```

Add one new import line (session service):
```ts
import { createSession } from '../../services/session.service.js';
```

Replace the entire `login` handler with:

```ts
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
```

`crypto` is already imported at the top of this file (`import crypto from 'crypto';`, used today by `forgotPassword`/`resetPassword`/`verifyEmail`) — no new `crypto` import needed here. `refreshToken()`, `logout()`, `forgotPassword()`, `resetPassword()`, `verifyEmail()`, `changePassword()` are unchanged — do not touch them.

### §4 — `auth-registration.controller.ts`: import edits + two tail replacements (exact)

Replace the auth.middleware import:
```ts
import { generateTokens, setAuthCookies, hashRefreshToken } from '../../middlewares/auth.middleware.js';
```
with (drop `hashRefreshToken` — after this packet's edits nothing in this file calls it):
```ts
import { generateTokens, setAuthCookies } from '../../middlewares/auth.middleware.js';
```

Add one new import line (session service):
```ts
import { createSession } from '../../services/session.service.js';
```

Add a `crypto` import (this file does not currently import Node's `crypto` module):
```ts
import crypto from 'crypto';
```

Replace the auth.types import block:
```ts
import {
  type ActivationTokenPayload,
  type UserRow,
  createActivationToken,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
} from './auth.types.js';
```
with:
```ts
import {
  type ActivationTokenPayload,
  type UserRow,
  createActivationToken,
  mapUserRow,
  getPublicProfile,
  ensureAdminRole,
  getAuthTokenPayload,
  getSessionIssuanceMeta,
} from './auth.types.js';
```

**`verifyRegistration()` tail replacement.** The region starting at the `// Auto-promote to admin if email is in ADMIN_EMAILS` comment (immediately after `await notificationService.welcomeUser(...)` / `chatService.addUserToCommunityGroup(...)`, i.e. right before the handler's closing `ApiResponse.created(...)` call) — i.e. this exact block:

```ts
    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store hashed refresh token
    await query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      hashRefreshToken(tokens.refreshToken),
      user.id,
    ]);

    logger.info('User registered after OTP verification', {
      userId: user.id,
      email: user.email,
      signupCredits,
    });

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.created(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
        nextStep: 'consent',
      },
      'Account created successfully'
    );
```

becomes:

```ts
    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // BIOS-003 SP5: mint the session id up front (see login() in
    // auth-session.controller.ts for the ordering rationale).
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
    // users.refresh_token on this path.
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

    logger.info('User registered after OTP verification', {
      userId: user.id,
      email: user.email,
      signupCredits,
    });

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    ApiResponse.created(
      res,
      {
        user: getPublicProfile(user),
        tokens: getAuthTokenPayload(req, tokens),
        nextStep: 'consent',
      },
      'Account created successfully'
    );
```

**`socialAuth()` tail replacement.** The region starting at the `// Auto-promote to admin if email is in ADMIN_EMAILS` comment immediately following the `if (existingUserResult.rows.length > 0) { ... } else { ... }` account-lookup/creation block (unchanged, out of scope) through the end of the `if (isNewUser) { ... } else { ... }` response block — i.e. this exact block:

```ts
    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store hashed refresh token
    await query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
      hashRefreshToken(tokens.refreshToken),
      user.id,
    ]);

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    const responseData = {
      user: getPublicProfile(user),
      tokens: getAuthTokenPayload(req, tokens),
      isNewUser,
      needsProfileCompletion: !user.dateOfBirth || !user.gender,
    };

    if (isNewUser) {
      ApiResponse.created(
        res,
        {
          ...responseData,
          nextStep:
            user.dateOfBirth && user.gender ? 'consent' : 'complete_profile',
        },
        'Account created successfully'
      );
    } else {
      ApiResponse.success(res, responseData, 'Signed in successfully');
    }
```

becomes:

```ts
    // Auto-promote to admin if email is in ADMIN_EMAILS
    user.role = await ensureAdminRole(user.id, user.email, user.role);

    // BIOS-003 SP5: mint the session id up front (see login() in
    // auth-session.controller.ts for the ordering rationale).
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
    // users.refresh_token on this path.
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

    // Set HttpOnly cookies
    setAuthCookies(res, tokens);

    const responseData = {
      user: getPublicProfile(user),
      tokens: getAuthTokenPayload(req, tokens),
      isNewUser,
      needsProfileCompletion: !user.dateOfBirth || !user.gender,
    };

    if (isNewUser) {
      ApiResponse.created(
        res,
        {
          ...responseData,
          nextStep:
            user.dateOfBirth && user.gender ? 'consent' : 'complete_profile',
        },
        'Account created successfully'
      );
    } else {
      ApiResponse.success(res, responseData, 'Signed in successfully');
    }
```

Note: `socialAuth()`'s verification logic (`verifiedProfile`, the `provider === 'google'` branches, `oauthService.verifySocialToken`) and its account-lookup/account-creation `if/else` block are **entirely unchanged** — this packet only replaces the token-issuance tail shown above. Do not touch anything above it (that is SP8's scope).

`register()`, `resendRegistrationOTP()`, `completeSocialProfile()` are unchanged — do not touch them.

## Acceptance criteria

1. `cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && npm run typecheck` passes with zero errors.
2. `npm run lint` (from `yhealth-app/server/`) passes with zero errors/warnings on all four touched files.
3. `grep -n "createSession(" src/controllers/auth/auth-session.controller.ts` returns exactly 1 match (inside `login`); `grep -n "createSession(" src/controllers/auth/auth-registration.controller.ts` returns exactly 2 matches (inside `verifyRegistration` and `socialAuth`).
4. `grep -n "crypto.randomUUID()" src/controllers/auth/auth-session.controller.ts` returns exactly 1 match; the same grep on `auth-registration.controller.ts` returns exactly 2 matches.
5. `grep -n "sessionId,$" src/controllers/auth/auth-session.controller.ts src/controllers/auth/auth-registration.controller.ts` shows a `sessionId,` line immediately inside each of the 3 `generateTokens({...})` call sites (i.e. every `generateTokens` call in these two files now passes `sessionId`).
6. `grep -n "UPDATE users SET.*refresh_token" src/controllers/auth/auth-registration.controller.ts` returns **zero** matches (both writes removed).
7. In `auth-session.controller.ts`, `login`'s body contains no `refresh_token` write — `sed -n '/export const login/,/^);/p' src/controllers/auth/auth-session.controller.ts | grep -n "refresh_token"` returns zero matches. `refreshToken`'s body (the `/auth/refresh` handler, unrelated to this packet) is **byte-identical** to the embedded source above — diff `sed -n '/export const refreshToken/,/^);/p' src/controllers/auth/auth-session.controller.ts` against the `refreshToken` block in the "Embedded current source" section and confirm zero differences (that handler still reads/writes `users.refresh_token` exactly as today; SP6 changes it, not this packet).
8. `grep -n "hashRefreshToken" src/controllers/auth/auth-registration.controller.ts` returns **zero** matches (import removed, no remaining call).
9. `grep -n "hashRefreshToken" src/controllers/auth/auth-session.controller.ts` still returns matches inside the (untouched) `refreshToken` handler — the import is NOT removed from this file.
10. `grep -n "^export" src/services/session.service.ts` shows the same 10 export lines as before this packet, in the same order (`SESSION_CAP`, `CreateSessionParams`, `RotateSessionResult`, `ActiveSessionRow`, `createSession`, `rotateSession`, `revokeSession`, `revokeAllForUser`, `findActiveSession`, `evictOldestIfOverCap` — 10 total, unchanged surface, only the `createSession` implementation body and the `CreateSessionParams` interface's field list differ).
11. `grep -n "id?: string" src/services/session.service.ts` returns exactly 1 match, inside `CreateSessionParams`.
12. `grep -n "^export function getSessionIssuanceMeta\|^export interface SessionIssuanceMeta" src/controllers/auth/auth.types.ts` returns exactly 2 matches; all pre-existing exports of that file (`ActivationTokenPayload`, `UserRow`, `ConsentRow`, `WhatsAppRow`, `CONSENT_VERSION`, `GeneratedAuthTokens`, `AuthTokenPayload`, `getAuthTokenPayload`, `createActivationToken`, `mapUserRow`, `getPublicProfile`, `hasConsent`, `ensureAdminRole`) are still present and unchanged — `grep -c "^export" src/controllers/auth/auth.types.ts` returns 15 (13 pre-existing + 2 new).
13. Response-shape diff check: comparing the `ApiResponse.success(...)`/`ApiResponse.created(...)` call **arguments** (keys, key order, and message strings) in `login`, `verifyRegistration`, and `socialAuth` before vs. after this packet shows **zero differences** — only the code above each response call changes.
14. `git status --porcelain yhealth-app/server` shows modifications in exactly these 4 files and no others: `src/controllers/auth/auth-session.controller.ts`, `src/controllers/auth/auth-registration.controller.ts`, `src/controllers/auth/auth.types.ts`, `src/services/session.service.ts`.
15. (Full behavioral proof — not this packet's job, flagged so it isn't silently assumed complete): that each of the 3 flows actually produces a `user_sessions` row whose `refresh_token_hash` equals `sha256(<the refreshToken returned in the response>)` is proven by SP9 (unit, mocked DB) and SP10 (integration, real PG) once those packets land — SP5's acceptance is limited to the static/grep/typecheck checks above plus a manual sanity check if a local Postgres is available: `POST /api/auth/login` with a valid user, then `SELECT id, refresh_token_hash FROM user_sessions WHERE user_id = '<id>' ORDER BY created_at DESC LIMIT 1;` and confirm `sha256(<returned refreshToken>)` (hex) matches `refresh_token_hash`.

## Out of scope

- `/auth/refresh` dual-read + lazy migration (`refreshToken()` in `auth-session.controller.ts`) — SP6. Not touched by this packet.
- `/auth/logout` this-device/all-devices (`logout()` in `auth-session.controller.ts`, `src/validators/auth.validator.ts` logout schema) — SP7. Not touched.
- Apple JWKS verification / Google mobile-audience hardening inside `socialAuth()` (the `verifiedProfile`/`oauthService.verifySocialToken` logic and everything above the token-issuance tail) — SP8. Not touched; this packet only rewires what happens *after* the user row is resolved.
- `src/services/oauth.service.ts`, `package.json` `jose` dependency — SP2, already landed, not touched.
- `src/database/tables/146-user-sessions.sql`, `src/database/auto-migrate.ts`, `src/database/setup.ts`, migrations — SP1, already landed, not touched.
- `src/middlewares/auth.middleware.ts`, `src/types/index.ts` — SP4, already landed; embedded above for reference only, zero edits.
- Any unit/integration test file (`tests/unit/services/session.service.test.ts`, `tests/integration/...`) — SP9/SP10.
- A `GET /auth/sessions` list endpoint or session-management UI — explicitly deferred (OQ-B).
- Any mobile (`yhealth-app/mobile`) change — MP1–MP10 already/separately in flight; this is a server-only packet.
- Rate limiting, CAPTCHA, or any other auth hardening not named in ADR-1/ADR-2/ADR-3.
- Changing `last_login` semantics in `login()` beyond continuing to set it (this packet only removes `refresh_token` from that same UPDATE statement, splitting it into its own `UPDATE users SET last_login = $1 WHERE id = $2`).
