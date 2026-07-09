# Packet SP8 — socialAuth Apple/Google verification wiring (ADR-5/ADR-6)

## Objective

`POST /api/auth/social` currently trusts client-supplied identity fields for Apple sign-in with **zero cryptographic verification** — this is the critical hole BIOS-003 exists to close. Google sign-in also silently falls back to unverified NextAuth-profile data for mobile clients, which have no NextAuth PKCE flow to justify that trust. This packet rewires `socialAuth` in `auth-registration.controller.ts` to: (1) require and enforce real Apple JWKS verification with **no fallback, ever**, and (2) require real Google idToken verification for mobile clients (`X-Client: mobile`) while preserving the existing web NextAuth-profile fallback unchanged. The Apple/Google verifier functions themselves (`oauth.service.ts`) and the session-issuance tail (`createSession` + `generateTokens`) already landed in prior packets (SP2, SP4, SP5) and are **not** touched here — this packet only rewires the verification branch that feeds them.

## Target files

- **MODIFY**: `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/controllers/auth/auth-registration.controller.ts` — the `socialAuth` handler only (lines 337–543 of the current file; the specific block being replaced is lines 346–378, precisely delimited below). No other export in this file changes.

No other file is a target of this packet. `oauth.service.ts` (SP2) and `auth.middleware.ts` (SP4) already contain everything this packet calls; they are embedded below **for reference only** — do not modify them.

## Embedded current source

### `server/src/controllers/auth/auth-registration.controller.ts` (FULL — 588 lines, current live state, SP5 already landed: note the `crypto.randomUUID()` session-id minting + `createSession(...)` calls already present in both `verifyRegistration` and `socialAuth`)

```typescript
/**
 * @file Auth Registration Controller
 * @description Handles user registration (local and social)
 */

import type { Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { query, transaction } from '../../config/database.config.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { generateTokens, setAuthCookies } from '../../middlewares/auth.middleware.js';
import { emailService, logger } from '../../services/index.js';
import { mailHelper } from '../../helper/mail.js';
import { env } from '../../config/env.config.js';
import type { AuthenticatedRequest } from '../../types/index.js';
import { notificationService } from '../../services/notification.service.js';
import { chatService } from '../../services/chat.service.js';
import { oauthService } from '../../services/oauth.service.js';
import { ensureWallet } from '../../services/credit.service.js';
import { createSession } from '../../services/session.service.js';
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
  getSessionIssuanceMeta,
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

### Reference (NOT a target file — already landed via SP2, do not modify): `server/src/services/oauth.service.ts` exported API

```typescript
// AuthProvider (server/src/models/index.ts) — imported by oauth.service.ts:
export type AuthProvider = 'local' | 'google' | 'apple';

// The shape every verifier returns on success, and the only source of
// verified identity fields:
interface SocialProfileData {
  provider: AuthProvider;
  providerId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  accessToken?: string;
}

class OAuthService {
  /**
   * Verify Google ID token and extract profile. Checks signature/tokeninfo,
   * audience against the accepted Google client id set (web + iOS), and
   * `email_verified`. Returns null on ANY verification failure; never throws.
   */
  public async verifyGoogleToken(idToken: string): Promise<SocialProfileData | null>;

  /**
   * Verify Apple ID token and extract profile. Cryptographically verifies
   * the token against Apple's live JWKS (signature, RS256 only), and checks
   * `iss === https://appleid.apple.com`, `aud` against APPLE_CLIENT_IDS
   * (env, comma-separated; defaults to 'ai.xyric.balencia'), and `exp`.
   * providerId (sub) and email are read ONLY from the verified payload —
   * there is NO client-supplied fallback for either. Returns null on ANY
   * verification failure (bad signature, wrong aud, expired, missing sub,
   * missing email); never throws to the caller.
   */
  public async verifyAppleToken(idToken: string): Promise<SocialProfileData | null>;

  /**
   * Verify social token based on provider — dispatches to
   * verifyGoogleToken/verifyAppleToken. This is the entry point socialAuth
   * already calls for Google; SP8 makes it call the same dispatcher for
   * Apple too (see Contract below).
   */
  public async verifySocialToken(
    provider: 'google' | 'apple',
    idToken: string
  ): Promise<SocialProfileData | null>;
}

export const oauthService: OAuthService; // singleton, already imported in auth-registration.controller.ts
```

### Reference (NOT a target file — already landed, unchanged): `SocialAuthInput` (`server/src/validators/auth.validator.ts`)

```typescript
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
export type SocialAuthInput = z.infer<typeof socialAuthSchema>;
```

This schema is bound to the route via `validate(socialAuthSchema)` (`server/src/routes/auth.routes.ts`) — `email` and `provider` are **guaranteed present** by the time `socialAuth` runs; `idToken`/`providerId`/`name`/`firstName`/`lastName`/`avatar` are all optional and controller-side logic must treat them as such (this is why the existing top-of-function `if (!data.email || !data.provider)` guard is dead-but-harmless code — leave it exactly as-is; it is not part of this packet's change).

### Reference (NOT a target file — already landed, unchanged): `ApiError` factory methods used

```typescript
// server/src/utils/ApiError.ts
static badRequest(message = 'Bad Request', details?: AppErrorDetails[]): ApiError; // 400, code BAD_REQUEST
static unauthorized(message = 'Unauthorized'): ApiError;                          // 401, code UNAUTHORIZED
```

### Reference (NOT a target file — already landed via SP5, unchanged): `X-Client` header read convention

The codebase's established pattern for reading this header (`server/src/controllers/auth/auth.types.ts`, both `getAuthTokenPayload` and `getSessionIssuanceMeta`, already imported and called in this same file) is:

```typescript
const isMobile = req.get('X-Client')?.toLowerCase() === 'mobile';
```

Use this exact idiom (not `req.headers['x-client']`) for the new mobile/web branch in the Contract below — it is case-insensitive on the header value and matches the two other call sites already in this file (`getAuthTokenPayload(req, tokens)` at the end of `socialAuth`, `getSessionIssuanceMeta(req)` right after). `req` is typed `AuthenticatedRequest extends Request` (`server/src/types/index.ts`), so `.get()` is available.

## Contract

Replace **only** the block below (currently lines 346–378 of the embedded source above — everything from `const provider = data.provider;` through the `const avatar = ...` line, inclusive) inside `socialAuth`. Every other line in the file — including the `if (!data.email || !data.provider)` guard immediately above it, and the entire account-lookup/linking/creation/session-issuance/response block immediately below it (current lines 380–543, covering both the existing-user "verify and update provider info" branch and the new-user creation branch) — is **byte-for-byte unchanged**.

**Exact old text to locate and replace** (must match verbatim against the embedded source; if it does not match verbatim, STOP and report the mismatch rather than guessing):

```typescript
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
```

**Exact new text (drop-in replacement, same indentation level, inside the same `asyncHandler` callback):**

```typescript
    const provider = data.provider;
    const isMobileClient = req.get('X-Client')?.toLowerCase() === 'mobile';

    // BIOS-003 SP8 (ADR-5 / ADR-6): verify the social identity token against
    // its real provider before trusting ANY client-supplied identity field.
    let verifiedProfile: Awaited<ReturnType<typeof oauthService.verifySocialToken>> = null;

    if (provider === 'apple') {
      // ADR-5: Apple has NO fallback, ever — client-supplied
      // email/providerId/idToken are NEVER trusted directly. Apple native
      // sign-in has no prior verified-PKCE proof (unlike NextAuth on web
      // for Google), so an absent or unverifiable idToken is a hard 401.
      if (!data.idToken) {
        throw ApiError.unauthorized('Apple identity verification failed');
      }

      verifiedProfile = await oauthService.verifySocialToken(provider, data.idToken);

      if (!verifiedProfile) {
        throw ApiError.unauthorized('Apple identity verification failed');
      }
    } else if (provider === 'google') {
      // Try to verify the id_token with Google directly.
      // If verification fails due to network issues, fall back to the
      // NextAuth-provided profile data (NextAuth already completed the
      // full OAuth PKCE flow and verified the user's identity) — WEB ONLY,
      // see the isMobileClient branch below.
      if (data.idToken) {
        try {
          verifiedProfile = await oauthService.verifySocialToken(provider, data.idToken);
        } catch (verifyError) {
          logger.warn('Google token verification failed, falling back to NextAuth profile', {
            error: verifyError instanceof Error ? verifyError.message : 'Unknown',
          });
        }
      }

      if (isMobileClient) {
        // ADR-6: mobile has no NextAuth PKCE flow to trust — require a
        // real, server-verified Google idToken. No client-field fallback
        // for mobile, ever.
        if (!verifiedProfile) {
          throw ApiError.unauthorized('Google sign-in could not be verified. Please try again.');
        }
      } else if (!verifiedProfile) {
        // Web: keep the existing NextAuth-profile fallback — unchanged
        // requirement (email + providerId) and unchanged message.
        if (!data.email || !data.providerId) {
          throw ApiError.unauthorized('Google sign-in could not be verified. Please try again.');
        }
        logger.info('Using NextAuth-provided profile for Google sign-in (token verification skipped)', {
          email: data.email,
        });
      }
    }

    const email = (verifiedProfile?.email || data.email).toLowerCase();
    const providerId = verifiedProfile?.providerId || data.providerId || data.idToken;
    const firstName = verifiedProfile?.firstName || data.firstName || data.name?.split(' ')[0] || '';
    const lastName = verifiedProfile?.lastName || data.lastName || data.name?.split(' ').slice(1).join(' ') || '';
    const avatar = verifiedProfile?.avatar || data.avatar || null;
```

**Key contract points (verbatim, nothing left to infer):**

1. `provider === 'apple'` → **REQUIRE** `data.idToken` truthy, and **REQUIRE** `oauthService.verifySocialToken(provider, data.idToken)` (which internally routes to `verifyAppleToken`) to resolve to a non-null `SocialProfileData`. Either condition failing → `throw ApiError.unauthorized('Apple identity verification failed')`. There is **no** code path where Apple falls through to `data.email` / `data.providerId` / `data.idToken` as identity source — `email`/`providerId`/`firstName`/`lastName`/`avatar` for Apple are only ever populated from `verifiedProfile` (the `||` chains below still exist syntactically for Google/shared code, but for Apple `verifiedProfile` is always non-null past the guard, so `verifiedProfile?.X` always wins).
2. `provider === 'google' && isMobileClient` (`req.get('X-Client')?.toLowerCase() === 'mobile'`) → **REQUIRE** `verifiedProfile` non-null (i.e. `data.idToken` present **and** `oauthService.verifySocialToken('google', data.idToken)` succeeded). Failing → `throw ApiError.unauthorized('Google sign-in could not be verified. Please try again.')`. No NextAuth-profile fallback for mobile.
3. `provider === 'google' && !isMobileClient` (web, or `X-Client` header absent/anything other than `'mobile'`) → **unchanged current behavior**: try verify if `idToken` present (swallow verify errors, fall back), and only require `data.email && data.providerId` (already guaranteed by schema for `email`) when `verifiedProfile` is still null after that attempt.
4. Verified-profile fields **override** client-supplied ones whenever present — this is already true via the existing `verifiedProfile?.X || data.X` precedence in the untouched tail (`email`, `providerId`, `firstName`, `lastName`, `avatar` computation); do not change that precedence.
5. Account-linking-by-email (the `existingUserResult.rows.length > 0` branch, `UPDATE users SET ... provider_id = COALESCE($3, provider_id) ...`) and the new-user-creation branch are **preserved unchanged** — not part of this packet's diff.
6. No new imports. `oauthService`, `ApiError`, `logger` are already imported at the top of the file; do not import `verifyAppleToken`/`verifyGoogleToken` directly — always go through `oauthService.verifySocialToken(...)`, matching the existing Google call convention.
7. `req.get('X-Client')` — not `req.headers['x-client']` — per the established codebase idiom (see Reference section above); this is a deliberate resolution, not left to worker discretion.

## Acceptance criteria

All mechanically checkable from `/Users/hamza/Desktop/balencia-design/yhealth-app/server`:

1. **Typecheck.** `npx tsc --noEmit` exits 0 with no new errors (baseline today is clean — "TypeScript: No errors found").
2. **Apple, forged/invalid idToken → 401.** `POST /api/auth/social` with `{provider:'apple', email:'x@example.com', idToken:'<token that fails jose.jwtVerify — bad signature, wrong aud, or expired>'}` responds `401` with `error.code === 'UNAUTHORIZED'` and `error.message === 'Apple identity verification failed'`. No row is inserted/updated in `users` (verify: `oauthService.verifySocialToken` is called and its rejection short-circuits before the `query`/`transaction` calls).
3. **Apple, absent idToken → 401.** Same request with `idToken` omitted (even if `providerId`/`name` are supplied) responds `401` with the identical `'Apple identity verification failed'` message — confirms no client-field fallback exists for Apple.
4. **Apple, valid idToken → success, fields from verified payload only.** With a `verifyAppleToken`-mocked/valid token resolving `{provider:'apple', providerId:'apple-sub-123', email:'verified@example.com'}`, the created/updated user's `email` and `provider_id` come from the verified payload, not from any `data.email`/`data.providerId` the client also sent (if they differ, the verified values win).
5. **Google, mobile client, unverified/absent idToken → 401.** `POST /api/auth/social` with header `X-Client: mobile` (any case, e.g. `Mobile`) and `{provider:'google', email:'x@example.com', providerId:'g-1'}` (no `idToken`, or an `idToken` whose verification fails/throws) responds `401` with `error.message === 'Google sign-in could not be verified. Please try again.'`. No NextAuth-profile fallback path is taken (i.e. the `logger.info('Using NextAuth-provided profile...')` line does not execute for this request).
6. **Google, mobile client, verified idToken → success.** Same request with a verifiable `idToken` succeeds (200/201) using the verified profile's `email`/`providerId`/etc.
7. **Google, web client (no `X-Client` header, or `X-Client` present but not `'mobile'`), unverified idToken but `email`+`providerId` present → existing fallback preserved.** Responds success (200/201), using `data.email`/`data.providerId`/`data.name` as before, and the `logger.info('Using NextAuth-provided profile for Google sign-in (token verification skipped)', {...})` call fires — behavior byte-identical to pre-change code for this case.
8. **Google, web client, no idToken and missing `email` or `providerId` → 401** with the same `'Google sign-in could not be verified. Please try again.'` message (unchanged pre-existing behavior; `email` is actually always present per schema, so this fires only when `providerId` is missing too — same as today).
9. **No regression to account linking / session issuance.** The existing-user update query (`UPDATE users SET last_login = ..., auth_provider = COALESCE($2, ...), provider_id = COALESCE($3, ...) ...`), the new-user insert, `ensureAdminRole`, `crypto.randomUUID()` session-id minting, `generateTokens({...,sessionId})`, `createSession({...})`, `setAuthCookies`, and the `nextStep`/`isNewUser`/`needsProfileCompletion` response shape are all textually identical to the embedded source (no edits outside the Contract block).
10. **No new dependency added** — `jose`/`google-auth-library` already ship via `oauth.service.ts` (SP2); this packet adds zero entries to `package.json`.

## Out of scope

- Modifying `oauth.service.ts`, `session.service.ts`, `auth.middleware.ts`, `auth.validator.ts`, or `auth.routes.ts` — all already landed (SP2/SP3/SP4/SP5/SP7) and correct as embedded/referenced above.
- Changing the `SocialAuthResponse`/envelope shape, `nextStep` logic, `isNewUser`/`needsProfileCompletion` computation, or cookie behavior.
- `APPLE_CLIENT_IDS` / `GOOGLE_CLIENT_ID*` env value configuration (OQ-C, ops-owned).
- Server-side integration tests exercising this endpoint against a real JWKS/DB (SP9/SP10 scope, separate packets).
- **Known pre-existing drift, not caused by and not fixed by this packet:** `tests/unit/controllers/auth-cookies.test.ts` currently fails to even load (`SyntaxError: The requested module './auth.types.js' does not provide an export named 'getSessionIssuanceMeta'` — confirmed by running `NODE_OPTIONS=--experimental-vm-modules npx jest tests/unit/controllers/auth-cookies.test.ts` against the current tree) because its `auth.types.js` mock predates SP5 and doesn't export `getSessionIssuanceMeta`, and it never mocks `session.service.js`'s `createSession`. Separately, once that load error is fixed, its `'social auth returns body tokens for mobile clients'` case (line 236, `{provider:'apple', email, providerId}`, no `idToken`) encodes the exact insecure pre-SP8 behavior this packet removes and will need updating to supply a verifiable `idToken` (or assert the new 401). Fixing this test file is **not** a target of SP8 — it is not listed as an SP8 or SP9 target file in the plan — flag it to the orchestrator as follow-up test-maintenance work; do not silently patch it as part of this packet, and do not treat its current failure as something this packet's typecheck/acceptance criteria must paper over (typecheck is independent of Jest and passes clean today).
