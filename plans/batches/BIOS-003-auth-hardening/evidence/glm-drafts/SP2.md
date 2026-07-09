=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/oauth.service.ts ===
import { OAuth2Client } from 'google-auth-library';
import {
  createRemoteJWKSet,
  jwtVerify,
  errors as joseErrors,
} from 'jose';
import { logger } from '../utils/logger.js';
import { ApiError } from '../utils/ApiError.js';

export interface SocialUserData {
  provider: string;
  providerId: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AppleJwtPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  email?: string;
  email_verified?: string | boolean;
  is_private_email?: string | boolean;
  auth_time: number;
  nonce_supported: boolean;
}

// Read raw via process.env (matches existing GOOGLE_CLIENT_ID pattern; do NOT touch env.config.ts)
const APPLE_CLIENT_IDS = process.env.APPLE_CLIENT_IDS;
const GOOGLE_CLIENT_ID_IOS = process.env.GOOGLE_CLIENT_ID_IOS;
const APPLE_JWKS_URL = 'https://appleid.apple.com/auth/keys';
const APPLE_ISSUER = 'https://appleid.apple.com';

const appleJwks = createRemoteJWKSet(new URL(APPLE_JWKS_URL));
const googleClient = new OAuth2Client();

function getAppleExpectedAudiences(): string[] {
  if (!APPLE_CLIENT_IDS) {
    throw new Error('APPLE_CLIENT_IDS environment variable is not configured');
  }
  return APPLE_CLIENT_IDS.split(',').map(id => id.trim()).filter(Boolean);
}

interface AppleVerificationFailure {
  type: 'expired' | 'signature' | 'claim' | 'network' | 'jwks' | 'malformed' | 'unknown';
  message: string;
}

function categorizeAppleVerificationError(error: unknown): AppleVerificationFailure {
  if (error instanceof joseErrors.JWTExpired) {
    return { type: 'expired', message: 'Apple Sign In token has expired' };
  }
  if (error instanceof joseErrors.JWKSNoMatchingKey) {
    return { type: 'jwks', message: 'Apple token signing key not found in JWKS' };
  }
  if (error instanceof joseErrors.JWSSignatureVerificationFailed) {
    return { type: 'signature', message: 'Apple token signature verification failed' };
  }
  if (error instanceof joseErrors.JWTClaimValidationFailed) {
    return { type: 'claim', message: `Apple token claim validation failed: ${error.claim}` };
  }
  if (error instanceof Error && error.message.includes('malformed')) {
    return { type: 'malformed', message: 'Apple token is malformed' };
  }
  return { type: 'unknown', message: 'Apple token verification failed' };
}

export class OAuthService {
  private static instance: OAuthService;

  private constructor() {}

  public static getInstance(): OAuthService {
    if (!OAuthService.instance) {
      OAuthService.instance = new OAuthService();
    }
    return OAuthService.instance;
  }

  public async verifyAppleToken(idToken: string): Promise<SocialUserData | null> {
    try {
      const { payload } = await jwtVerify(idToken, appleJwks, {
        issuer: APPLE_ISSUER,
        audience: getAppleExpectedAudiences(),
        algorithms: ['RS256'],
      });

      const applePayload = payload as AppleJwtPayload;

      if (!applePayload.sub) {
        throw new ApiError(401, 'Apple token missing subject identifier', false);
      }

      // Contract C3: missing email -> return null, never throw
      if (!applePayload.email) {
        logger.warn('Apple token missing email claim; returning null per contract');
        return null;
      }

      const emailVerified =
        applePayload.email_verified === 'true' ||
        applePayload.email_verified === true;

      const email = emailVerified ? applePayload.email : '';

      return {
        provider: 'apple',
        providerId: applePayload.sub,
        email,
      };
    } catch (error) {
      const failure = categorizeAppleVerificationError(error);

      if (
        failure.type === 'expired' ||
        failure.type === 'signature' ||
        failure.type === 'claim' ||
        failure.type === 'jwks' ||
        failure.type === 'malformed'
      ) {
        throw new ApiError(401, failure.message, false);
      }

      if (failure.type === 'network') {
        throw new ApiError(503, failure.message, false);
      }

      logger.error('Unexpected Apple token verification error', {
        error: error instanceof Error ? error.message : 'Unknown',
      });
      throw new ApiError(500, 'Apple token verification failed', false);
    }
  }

  public async verifyGoogleToken(idToken: string): Promise<SocialUserData> {
    if (!GOOGLE_CLIENT_ID_IOS) {
      throw new ApiError(500, 'Google client ID not configured', false);
    }
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID_IOS,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new ApiError(401, 'Google token missing payload', false);
      }
      return {
        provider: 'google',
        providerId: payload.sub,
        email: payload.email ?? '',
      };
    } catch (error) {
      logger.error('Google token verification error', {
        error: error instanceof Error ? error.message : 'Unknown',
      });
      throw new ApiError(401, 'Google token verification failed', false);
    }
  }

  public async verifySocialToken(
    provider: string,
    token: string
  ): Promise<SocialUserData | null> {
    if (provider === 'apple') {
      return this.verifyAppleToken(token);
    }
    if (provider === 'google') {
      return this.verifyGoogleToken(token);
    }
    throw new ApiError(400, `Unsupported OAuth provider: ${provider}`, false);
  }

  public createSocialProfile(data: SocialUserData): unknown {
    // Basic structural mapping for upstream auth.service.ts
    return {
      provider: data.provider,
      providerId: data.providerId,
      email: data.email,
    };
  }
}

export const oauthService = OAuthService.getInstance();
=== END FILE ===
=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/package.json ===
{
  "name": "yhealth-server",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint . --ext .ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "google-auth-library": "^9.14.1",
    "ioredis": "^5.4.1",
    "jose": "^6.2.3",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.13.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cookie-parser": "^1.4.7",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^20.16.5",
    "@types/pg": "^8.11.10",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.6.2"
  }
}
=== END FILE ===
