# Packet SP7 — Logout this-device / all-devices

## Objective

`POST /auth/logout` currently only performs the pre-BIOS-003 global logout (`UPDATE users SET refresh_token = NULL`) and has **no request validator** on its route. This packet gives it the ADR-4 / amendment-A6 behavior: an **optional** JSON body `{ allDevices?: boolean }` that defaults to `false`, wired through a brand-new `logoutSchema` Zod validator so a bodyless request (what the web client sends today) keeps validating and behaving byte-for-byte identically to current production. `sessionId` present + `allDevices` falsy revokes only that device's `user_sessions` row (mobile's "sign out this device"); `allDevices: true` revokes every session row for the user **and** nulls the legacy `users.refresh_token` column; a legacy access token with no `sessionId` claim keeps nulling the legacy column exactly as today. Cookies are cleared and the response shape is unchanged in every branch.

This packet depends on SP3 (session.service.ts — already landed, `revokeSession`/`revokeAllForUser` exist) and SP4 (`sessionId`/`sid` threading into `generateTokens` and `IJwtPayload` — already landed). It does **not** touch `/login`, `/refresh`, `/social`, the DB schema, or any mobile code.

## Target files (exact absolute paths)

All three files already exist and are **MODIFY** targets (no new files):

1. `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/validators/auth.validator.ts` — add `logoutSchema` + `LogoutInput` type.
2. `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-session.controller.ts` — rewrite the `logout` handler; extend two import statements.
3. `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/routes/auth.routes.ts` — import `logoutSchema`; wire `validate(logoutSchema)` into the `POST /logout` route.

Read-only context only (do **not** modify, embedded below so you don't need to re-derive their behavior): `src/middlewares/validate.middleware.ts`, `src/services/session.service.ts`, `src/types/index.ts`, `src/middlewares/auth.middleware.ts`.

---

## Embedded current source

### 1. `src/validators/auth.validator.ts` (MODIFY — full current file, 179 lines)

```ts
import { z } from 'zod';
import { commonSchemas } from '../middlewares/validate.middleware.js';

// Disposable email domains blocklist (partial list)
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
  'mailinator.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
];

// Custom email validation that blocks disposable emails
const safeEmail = z.string()
  .email('Invalid email format')
  .toLowerCase()
  .trim()
  .refine(email => {
    const domain = email.split('@')[1];
    return !DISPOSABLE_EMAIL_DOMAINS.includes(domain ?? '');
  }, 'Please use a permanent email address (no temporary emails)');

// Gender enum
const genderEnum = z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say']);

// Date of birth validation (must be 18+)
const dateOfBirth = z.string()
  .or(z.date())
  .transform(val => new Date(val))
  .refine(date => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, 'Balencia is for users 18+. Contact support@balencia.com for assistance.');

// S01.1.1: Core Account Registration
export const registerSchema = z.object({
  email: safeEmail,
  password: commonSchemas.password,
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters').max(50),
  dateOfBirth: dateOfBirth,
  gender: genderEnum,
});

// S01.1.2: Social Sign-In (via NextAuth)
// Frontend sends user data from NextAuth session
export const socialAuthSchema = z.object({
  provider: z.enum(['google', 'apple']),
  email: z.string().email('Invalid email format'),
  providerId: z.string().optional(), // Provider user ID (e.g., Google sub)
  idToken: z.string().optional(), // Legacy support
  name: z.string().optional(), // Full name from provider
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().url().optional().nullable(),
  accessToken: z.string().optional(),
});

// Social auth completion (for missing fields)
export const completeSocialProfileSchema = z.object({
  dateOfBirth: dateOfBirth,
  gender: genderEnum,
  firstName: z.string().trim().min(2).max(50).optional(),
  lastName: z.string().trim().min(2).max(50).optional(),
});

// S01.1.3: Privacy Consent
export const consentSchema = z.object({
  termsOfService: z.boolean().refine(val => val === true, 'You must accept the Terms of Service'),
  privacyPolicy: z.boolean().refine(val => val === true, 'You must accept the Privacy Policy'),
  emailMarketing: z.boolean().optional().default(false),
  whatsAppCoaching: z.boolean().optional().default(false),
});

// WhatsApp enrollment
export const whatsAppEnrollmentSchema = z.object({
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  countryCode: z.string().min(1, 'Country code is required').max(5),
});

// WhatsApp verification
export const whatsAppVerificationSchema = z.object({
  code: z.string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Verification code must contain only numbers'),
});

// Login schema
export const loginSchema = z.object({
  email: commonSchemas.email,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: commonSchemas.email,
});

// Reset password schema (OTP-based)
export const resetPasswordSchema = z.object({
  email: commonSchemas.email,
  otp: z.string()
    .length(4, 'Reset code must be 4 digits')
    .regex(/^\d{4}$/, 'Reset code must contain only numbers'),
  password: commonSchemas.password,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: commonSchemas.password,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine(data => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['newPassword'],
});

// Verify email schema
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

// Verify registration OTP schema
export const verifyRegistrationSchema = z.object({
  activationToken: z.string().min(1, 'Activation token is required'),
  activationCode: z.string()
    .length(4, 'Verification code must be 4 digits')
    .regex(/^\d{4}$/, 'Verification code must contain only numbers'),
});

// Resend registration OTP schema
export const resendRegistrationOTPSchema = z.object({
  activationToken: z.string().min(1, 'Activation token is required'),
});

// Refresh token schema
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Update profile schema
export const updateProfileSchema = z.object({
  firstName: z.string().trim().min(2).max(50).optional(),
  lastName: z.string().trim().min(2).max(50).optional(),
  phone: commonSchemas.phone,
  avatar: z.string().url().optional().nullable(),
  dateOfBirth: z.string().or(z.date()).transform(val => new Date(val)).optional(),
  gender: z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say']).optional(),
});

// Types inferred from schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type SocialAuthInput = z.infer<typeof socialAuthSchema>;
export type CompleteSocialProfileInput = z.infer<typeof completeSocialProfileSchema>;
export type ConsentInput = z.infer<typeof consentSchema>;
export type WhatsAppEnrollmentInput = z.infer<typeof whatsAppEnrollmentSchema>;
export type WhatsAppVerificationInput = z.infer<typeof whatsAppVerificationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type VerifyRegistrationInput = z.infer<typeof verifyRegistrationSchema>;
export type ResendRegistrationOTPInput = z.infer<typeof resendRegistrationOTPSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
```

### 2. `src/controllers/auth/auth-session.controller.ts` (MODIFY — full current file, 517 lines)

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
```

### 3. `src/routes/auth.routes.ts` (MODIFY — full current file, 211 lines)

```ts
import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate, verifyRefreshToken } from '../middlewares/auth.middleware.js';
import { authLimiter, strictLimiter, createRateLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  registerSchema,
  verifyRegistrationSchema,
  resendRegistrationOTPSchema,
  socialAuthSchema,
  completeSocialProfileSchema,
  consentSchema,
  whatsAppEnrollmentSchema,
  whatsAppVerificationSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/auth.validator.js';
import {
  // Registration
  register,
  verifyRegistration,
  resendRegistrationOTP,
  socialAuth,
  completeSocialProfile,
  // Session
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  // Onboarding
  submitConsent,
  enrollWhatsApp,
  verifyWhatsApp,
  skipWhatsApp,
  getCurrentUser,
  getOnboardingStatus,
  updateProfile,
} from '../controllers/auth/index.js';

const router = Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// S01.1.1: Core Account Registration - Step 1: Send OTP
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  register
);

// S01.1.1: Core Account Registration - Step 2: Verify OTP and Create Account
router.post(
  '/verify-registration',
  authLimiter,
  validate(verifyRegistrationSchema),
  verifyRegistration
);

// Resend Registration OTP
router.post(
  '/resend-registration-otp',
  strictLimiter,
  validate(resendRegistrationOTPSchema),
  resendRegistrationOTP
);

// S01.1.2: Social Sign-In (Google/Apple)
router.post(
  '/social',
  authLimiter,
  validate(socialAuthSchema),
  socialAuth
);

// Login
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  login
);

// Refresh Token
router.post(
  '/refresh',
  authLimiter,
  verifyRefreshToken,
  refreshToken
);

// Forgot Password
router.post(
  '/forgot-password',
  strictLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);

// Reset Password
router.post(
  '/reset-password',
  strictLimiter,
  validate(resetPasswordSchema),
  resetPassword
);

// Verify Email
router.post(
  '/verify-email',
  validate(verifyEmailSchema),
  verifyEmail
);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Complete Social Profile (DOB, Gender)
router.post(
  '/complete-profile',
  authenticate,
  validate(completeSocialProfileSchema),
  completeSocialProfile
);

// S01.1.3: Privacy Consent
router.post(
  '/consent',
  authenticate,
  validate(consentSchema),
  submitConsent
);

// WhatsApp Enrollment
router.post(
  '/whatsapp/enroll',
  authenticate,
  strictLimiter,
  validate(whatsAppEnrollmentSchema),
  enrollWhatsApp
);

// WhatsApp Verification
router.post(
  '/whatsapp/verify',
  authenticate,
  validate(whatsAppVerificationSchema),
  verifyWhatsApp
);

// Skip WhatsApp Enrollment
router.post(
  '/whatsapp/skip',
  authenticate,
  skipWhatsApp
);

// Change Password (authenticated user)
router.post(
  '/change-password',
  authenticate,
  strictLimiter,
  validate(changePasswordSchema),
  changePassword
);

// Logout
router.post(
  '/logout',
  authenticate,
  logout
);

// Get Current User (frequently polled - add lenient rate limiter and caching)
router.get(
  '/me',
  authenticate,
  createRateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 requests per minute per user
    keyGenerator: 'user',
  }),
  getCurrentUser
);

// Get Onboarding Status
router.get(
  '/onboarding-status',
  authenticate,
  getOnboardingStatus
);

// Update Profile
router.patch(
  '/profile',
  authenticate,
  validate(updateProfileSchema),
  updateProfile
);

export default router;
```

---

### Read-only context (do NOT modify these files — embedded so you don't have to guess their behavior)

**`src/middlewares/validate.middleware.ts` — the `validate()` middleware (proves how a bodyless request is handled):**

```ts
type ValidationTarget = 'body' | 'query' | 'params';

interface ValidationOptions {
  stripUnknown?: boolean;
  abortEarly?: boolean;
}

export function validate(
  schema: ZodSchema,
  target: ValidationTarget = 'body',
  options: ValidationOptions = {}
): (req: Request, res: Response, next: NextFunction) => void {
  const { stripUnknown = true } = options;

  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = req[target];

      const parseMethod = stripUnknown ? schema.safeParse : schema.safeParse;
      const result = parseMethod.call(schema, dataToValidate);

      if (!result.success) {
        const errors = formatZodErrors(result.error);
        throw ApiError.validation(errors);
      }

      // Replace request data with parsed/transformed data
      // req.query is a getter in newer Express versions, so use defineProperty
      if (target === 'query') {
        Object.defineProperty(req, 'query', { value: result.data, writable: true, configurable: true });
      } else {
        req[target] = result.data;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
```

`validate(schema)` defaults `target` to `'body'`. It calls `schema.safeParse(req.body)` and, on success, **overwrites** `req.body` with the parsed/transformed `result.data`. `src/app.ts` (lines 144-153, unmodified) mounts `express.json({ limit: '10mb', strict: true, ... })` globally before the router. body-parser's `json()` middleware always initializes `req.body = req.body || {}` before it looks at Content-Type/Content-Length, and short-circuits with `req.body = {}` when there is no body — so by the time `validate()` runs, `req.body` for a bodyless `POST /logout` is **always the plain object `{}`**, never `undefined`. `logoutSchema` (below) is written to accept both `{}` and (defensively) a literal `undefined` input the same way, per amendment A6.

**`src/services/session.service.ts` — already-landed revoke APIs this packet calls (full current signatures, file unchanged by this packet):**

```ts
export type RotateSessionResult = 'rotated' | 'reuse_detected' | 'not_found';

export interface ActiveSessionRow {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
}

/** Idempotent: revoking an already-revoked or missing session is a no-op. */
export async function revokeSession(sessionId: string): Promise<void> { /* ... */ }

/** Revokes every active session for a user (ADR-4 `allDevices: true`). */
export async function revokeAllForUser(userId: string): Promise<void> { /* ... */ }

export async function createSession(params: CreateSessionParams): Promise<{ sessionId: string }> { /* ... */ }
export async function rotateSession(sessionId: string, presentedToken: string, newRefreshToken: string): Promise<RotateSessionResult> { /* ... */ }
export async function findActiveSession(sessionId: string): Promise<ActiveSessionRow | null> { /* ... */ }
export async function evictOldestIfOverCap(userId: string, cap: number): Promise<void> { /* ... */ }
```

`revokeSession` and `revokeAllForUser` are exactly the two functions this packet's `logout` handler needs; both already exist, exported, at `../../services/session.service.js` relative to the controller.

**`src/types/index.ts` — `IJwtPayload` / `AuthenticatedRequest` (unchanged, confirms where `sessionId` lives):**

```ts
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

**`src/middlewares/auth.middleware.ts` — `authenticate()` / `clearAuthCookies()` (unchanged; proves `req.user.sessionId` on `/logout` comes from the ACCESS token, since the route uses `authenticate`, not `verifyRefreshToken`):**

```ts
function verifyToken(token: string): IJwtPayload {
  try {
    const decoded = jwt.verify(token, env.jwt.secret, {
      issuer: env.jwt.issuer,
      audience: env.jwt.audience,
    }) as IJwtPayload;
    return decoded;
  } catch (error) { /* ... */ }
}

async function loadAuthenticatedUser(decoded: IJwtPayload): Promise<IJwtPayload> {
  const userResult = await query<{ id: string; email: string; is_active: boolean; role: UserRole | null; }>(
    `SELECT u.id, u.email, u.is_active, r.slug as role
       FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = $1`,
    [decoded.userId]
  );
  if (userResult.rows.length === 0) { throw ApiError.unauthorized('User account no longer exists. Please log in again.'); }
  const user = userResult.rows[0];
  if (!user.is_active) { throw ApiError.forbidden('Your account has been blocked. Please contact our help center for assistance.'); }
  return { ...decoded, email: user.email, role: user.role ?? decoded.role };
}

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) { throw ApiError.unauthorized('No authentication token provided'); }
    const decoded = verifyToken(token);
    (req as AuthenticatedRequest).user = await loadAuthenticatedUser(decoded);
    next();
  } catch (error) { next(error); }
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie('access_token', { path: ACCESS_TOKEN_COOKIE_PATH });
  res.clearCookie('access_token', { path: env.api.prefix });
  res.clearCookie('refresh_token', { path: `${env.api.prefix}/auth/refresh` });
}
```

`loadAuthenticatedUser` spreads `...decoded` (the verified access-token JWT payload) into the returned user object, so `sessionId` — when the access token was signed by `generateTokens({..., sessionId})` (SP4/SP5, already landed) — survives onto `req.user.sessionId` for every `authenticate`-guarded route, including `/logout`. A pre-BIOS-003 access token has no `sessionId` claim at all, so `req.user.sessionId` is `undefined` for it — that is the "legacy access token" case this packet's `else` branch handles.

---

## Contract (verbatim)

### A. `src/validators/auth.validator.ts` — new schema + type

Insert immediately after the existing `loginSchema` block (i.e. between `loginSchema` and `forgotPasswordSchema`):

```ts
// Logout schema (BIOS-003 ADR-4 / amendment A6)
// Body is OPTIONAL — the web client sends no body today and MUST keep
// validating byte-for-byte. `{}` (bodyless request, see validate.middleware.ts
// context above) parses to `{ allDevices: undefined }` i.e. falsy -> this-device
// logout, the same default framing as before this packet. `.default({})`
// additionally covers a literal `undefined` input defensively.
export const logoutSchema = z.object({
  allDevices: z.boolean().optional(),
}).optional().default({});
```

Add to the "Types inferred from schemas" block (anywhere among the existing `export type ... = z.infer<...>` lines — place it next to `LoginInput` for grouping):

```ts
export type LogoutInput = z.infer<typeof logoutSchema>;
```

`LogoutInput` resolves to `{ allDevices?: boolean }`.

### B. `src/controllers/auth/auth-session.controller.ts` — import + handler changes

Import changes (two statements, both near the top of the file):

```ts
// before:
import { createSession, findActiveSession, rotateSession } from '../../services/session.service.js';
// after:
import { createSession, findActiveSession, rotateSession, revokeSession, revokeAllForUser } from '../../services/session.service.js';
```

```ts
// before:
import type {
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
  ChangePasswordInput,
} from '../../validators/auth.validator.js';
// after:
import type {
  LoginInput,
  LogoutInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
  ChangePasswordInput,
} from '../../validators/auth.validator.js';
```

Replace the entire `logout` handler with:

```ts
/**
 * Logout
 * POST /api/auth/logout
 *
 * BIOS-003 SP7 (ADR-4, amendment A6): optional body `{ allDevices?: boolean }`.
 *   - `allDevices === true`      -> revoke every session row for this user
 *     (`revokeAllForUser`) AND null the legacy `users.refresh_token` column
 *     (kills any still-migrating legacy token too).
 *   - `sessionId` present, `allDevices` not `true` -> revoke only that one
 *     session row (`revokeSession`) — this-device sign-out (mobile default).
 *   - `sessionId` absent (legacy pre-BIOS-003 access token, no `sid` claim)
 *     -> null `users.refresh_token` (current, unchanged behavior).
 * Cookies are cleared and the response shape is unchanged in every branch.
 * The web client sends no body today: `allDevices` is `undefined` (falsy) ->
 * this-device branch -> for web's single legacy/new session this remains
 * behaviorally equivalent to the old unconditional global logout.
 */
export const logout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const sessionId = req.user?.sessionId;
    const { allDevices } = req.body as LogoutInput;

    if (userId) {
      if (allDevices === true) {
        await revokeAllForUser(userId);
        await query('UPDATE users SET refresh_token = NULL WHERE id = $1', [userId]);
        logger.info('User logged out (all devices)', { userId });
      } else if (sessionId) {
        await revokeSession(sessionId);
        logger.info('User logged out (this device)', { userId, sessionId });
      } else {
        await query('UPDATE users SET refresh_token = NULL WHERE id = $1', [
          userId,
        ]);
        logger.info('User logged out (legacy token)', { userId });
      }
    }

    clearAuthCookies(res);

    ApiResponse.success(res, null, 'Logged out successfully');
  }
);
```

Every other export in this file (`login`, `refreshToken`, `forgotPassword`, `resetPassword`, `verifyEmail`, `changePassword`) is unchanged — reproduce them verbatim as embedded above.

### C. `src/routes/auth.routes.ts` — import + route wiring

```ts
// before:
import {
  registerSchema,
  verifyRegistrationSchema,
  resendRegistrationOTPSchema,
  socialAuthSchema,
  completeSocialProfileSchema,
  consentSchema,
  whatsAppEnrollmentSchema,
  whatsAppVerificationSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/auth.validator.js';
// after:
import {
  registerSchema,
  verifyRegistrationSchema,
  resendRegistrationOTPSchema,
  socialAuthSchema,
  completeSocialProfileSchema,
  consentSchema,
  whatsAppEnrollmentSchema,
  whatsAppVerificationSchema,
  loginSchema,
  logoutSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/auth.validator.js';
```

```ts
// before:
// Logout
router.post(
  '/logout',
  authenticate,
  logout
);
// after:
// Logout
router.post(
  '/logout',
  authenticate,
  validate(logoutSchema),
  logout
);
```

No other lines in `auth.routes.ts` change. `validate` is already imported at the top of this file (`import { validate } from '../middlewares/validate.middleware.js';`) — do not add a second import.

---

## Acceptance criteria (mechanically checkable)

1. **Typecheck:** `cd /Users/hamza/Desktop/balencia-design/yhealth-app/server && npm run typecheck` exits 0.
2. **Schema exists and is shaped correctly (grep-checkable):** `src/validators/auth.validator.ts` contains `export const logoutSchema = z.object({` followed by an `allDevices: z.boolean().optional(),` field, and the chain ends `.optional().default({})`; also contains `export type LogoutInput = z.infer<typeof logoutSchema>;`.
3. **Route wiring (grep-checkable):** `src/routes/auth.routes.ts` imports `logoutSchema` from `../validators/auth.validator.js`, and the `/logout` route registration is `router.post('/logout', authenticate, validate(logoutSchema), logout);` (i.e. `validate(logoutSchema)` sits between `authenticate` and `logout`).
4. **Handler branches present (grep-checkable) in `auth-session.controller.ts`:** the `logout` export calls `revokeAllForUser(` guarded by `allDevices === true`, calls `revokeSession(` guarded by an `else if (sessionId)`, and falls through to `UPDATE users SET refresh_token = NULL WHERE id = $1` in the final `else`; `clearAuthCookies(res)` and `ApiResponse.success(res, null, 'Logged out successfully')` are called unconditionally (outside the `if (userId)` block), unchanged from before this packet.
5. **Imports present (grep-checkable):** `auth-session.controller.ts` imports `revokeSession` and `revokeAllForUser` from `../../services/session.service.js`, and `LogoutInput` (type-only) from `../../validators/auth.validator.js`.
6. **Bodyless-request parity (behavioral, integration-testable):** `POST /api/auth/logout` with **no body** and a **legacy** access token (no `sessionId` claim, i.e. signed before SP4/SP5 or with `generateTokens` called without `sessionId`) returns the identical response shape as pre-SP7 (`{success:true, data:null, message:'Logged out successfully', timestamp, requestId}`), sets cookies cleared, and results in `users.refresh_token IS NULL` for that user — same DB effect as before this packet.
7. **This-device (behavioral):** `POST /api/auth/logout` with no body and an access token carrying a `sessionId` (new-model session) results in that one `user_sessions` row having `revoked_at IS NOT NULL`, while any other active session row for the same user is untouched, and `users.refresh_token` is not modified by this call.
8. **All-devices (behavioral):** `POST /api/auth/logout` with `{"allDevices": true}` and an access token carrying a `sessionId` results in every `user_sessions` row for that `user_id` having `revoked_at IS NOT NULL`, and `users.refresh_token IS NULL`.
9. **No regression to unrelated exports:** `login`, `refreshToken`, `forgotPassword`, `resetPassword`, `verifyEmail`, `changePassword` in `auth-session.controller.ts` are byte-identical to the embedded current source above.
10. **No other route file changes:** every other route registration in `auth.routes.ts` (register, verify-registration, resend-registration-otp, social, login, refresh, forgot-password, reset-password, verify-email, complete-profile, consent, whatsapp/enroll, whatsapp/verify, whatsapp/skip, change-password, me, onboarding-status, profile) is byte-identical to the embedded current source above.

## Out of scope

- SP1–SP4 (DB table/migration, `oauth.service.ts` Apple/Google hardening, `session.service.ts`, `sessionId` threading into `generateTokens`) — already landed in the working tree; this packet only *consumes* `revokeSession`/`revokeAllForUser`/`IJwtPayload.sessionId`, it does not touch those files.
- SP5 (login/register/social session wiring) and SP6 (`/refresh` dual-read + lazy migration) — already landed in `auth-session.controller.ts`; this packet does not modify `login` or `refreshToken`.
- SP8 (Apple/Google verification wiring in `socialAuth`) — separate packet, `auth-registration.controller.ts` is untouched here.
- SP9/SP10 (unit/integration tests) — separate packets; this packet's acceptance criteria are typecheck + the mechanically-checkable/behavioral items above, not a test suite.
- A new `/auth/logout-all` route — explicitly rejected in ADR-4; this stays a single `/logout` route with a body flag.
- Any mobile change (`session.ts`, `session-provider.tsx`, `session-machine.ts`, or sending `X-Device-Id`) — that is packet MP1, a later wave.
- A `GET /auth/sessions` list / device-management endpoint — deferred (OQ-B), not part of this packet.
- Changes to `validate.middleware.ts`, `session.service.ts`, `types/index.ts`, or `auth.middleware.ts` — embedded above as read-only context only; do not edit them.
- Changes to `device_id`/`device_name`/`user_agent`/`ip_address` capture (already implemented via `getSessionIssuanceMeta` in SP5) — untouched.
- Rate limiting on `/logout` — the route currently has no rate limiter and this packet does not add one (not in ADR-4 or amendment A6).
