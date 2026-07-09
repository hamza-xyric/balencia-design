# Packet SP2 — Apple JWKS verifier + Google audience hardening (oauth.service.ts, pure)

## Objective

`oauth.service.ts` currently trusts Apple Sign-In identity with **zero cryptographic verification** — `verifyAppleToken` calls `jwt.decode()` (no signature/issuer/audience/expiry check) and, worse, falls back to client-supplied `userData.email` if the token payload has none. This packet replaces it with real JWKS signature verification via `jose`: fetch Apple's public keys from `https://appleid.apple.com/auth/keys`, verify signature (RS256) + `iss` + `aud` + `exp`, and derive `providerId`/`email` **only** from the verified token payload — never from client input. It also hardens the Google path by adding a mobile iOS OAuth client id to the accepted-audience set. This is a pure service-layer change: no controller wiring (that is a separate packet, SP8) and no `.env` file changes (only new env var *names* the service reads, following the codebase's existing raw-`process.env` pattern).

## Target files

| Path | Action |
|---|---|
| `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/services/oauth.service.ts` | **Modify** (full-file replace — see Contract §C for the exact target content) |
| `/Users/hamza/Desktop/balencia-design/yhealth-app/server/package.json` | **Modify** (add one dependency line) |

Do **not** touch any other file. In particular, do **not** modify `src/config/env.config.ts`, `src/controllers/auth/auth-registration.controller.ts`, or any `.env*` file — see "Out of scope."

---

## Embedded current source

### `src/services/oauth.service.ts` (current, BEFORE — 297 lines, verified live 2026-07-09)

```typescript
import jwt from 'jsonwebtoken';
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

interface AppleTokenPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
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
    for (const key of ['GOOGLE_CLIENT_ID', 'AUTH_GOOGLE_ID', 'AUTH_GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_ID_WEB']) {
      const val = process.env[key];
      if (val) ids.add(val);
    }
    return [...ids];
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
   * Verify Apple ID token and extract profile
   * Apple Sign-In uses JWT tokens that can be verified with Apple's public keys
   */
  public async verifyAppleToken(
    idToken: string,
    userData?: { email?: string; name?: { firstName?: string; lastName?: string } }
  ): Promise<SocialProfileData | null> {
    try {
      // Decode the JWT without verification first to get the header
      const decoded = jwt.decode(idToken, { complete: true });

      if (!decoded) {
        logger.warn('Invalid Apple token - could not decode');
        return null;
      }

      // In production, fetch Apple's public keys and verify the signature
      // For now, we'll decode and trust the token (should be verified properly in production)
      const payload = decoded.payload as AppleTokenPayload;

      if (!payload.sub) {
        logger.warn('Invalid Apple token - no subject');
        return null;
      }

      // Apple only provides email on first sign-in
      // The userData parameter contains the initial user info
      const email = payload.email || userData?.email;

      if (!email) {
        logger.warn('Apple sign-in - no email provided');
        return null;
      }

      logger.info('Apple token processed', {
        sub: payload.sub,
        hasEmail: !!email,
      });

      return {
        provider: 'apple',
        providerId: payload.sub,
        email,
        firstName: userData?.name?.firstName,
        lastName: userData?.name?.lastName,
      };
    } catch (error) {
      logger.error('Apple token verification failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  }

  /**
   * Verify social token based on provider
   */
  public async verifySocialToken(
    provider: 'google' | 'apple',
    idToken: string,
    userData?: { email?: string; name?: { firstName?: string; lastName?: string } }
  ): Promise<SocialProfileData | null> {
    switch (provider) {
      case 'google':
        return this.verifyGoogleToken(idToken);
      case 'apple':
        return this.verifyAppleToken(idToken, userData);
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

**Live-source facts that resolve plan ↔ source mismatches (verified this session, supersede any line numbers in `architecture-plan.md`):**

- `AuthProvider` (imported from `../models/index.js`) is `export type AuthProvider = 'local' | 'google' | 'apple';` — `'apple'` and `'google'` are valid literal assignments to `SocialProfileData.provider`.
- The controller (`auth-registration.controller.ts`) currently calls `oauthService.verifySocialToken(provider, data.idToken)` with **exactly two arguments** — it never passes a third `userData` argument today, and it only calls `verifySocialToken` inside an `if (provider === 'google' && data.idToken)` branch. **Apple never reaches `oauth.service.ts` at all today** — the controller builds the Apple profile directly from unverified `data.email` / `data.providerId` / `data.firstName` / `data.lastName`. That controller-side wiring is out of scope for this packet (SP8); this packet only has to keep `oauth.service.ts` itself self-consistent and typecheck-clean.
- `tsconfig.json` has `"noUnusedParameters": true` and `"noUnusedLocals": true`. This is load-bearing for the Contract below: any parameter/import that becomes unused after this rewrite **must** be removed, not left dangling.
- `jose` is **not yet a direct dependency** (`package.json` has no `jose` entry). It is present only as a *transitive* dependency at `4.15.9` (pulled in by another package) — irrelevant once `jose` is added directly; `npm install` will resolve/hoist the direct version.
- **Correction to the architecture plan's dependency version**: ADR-5 in `architecture-plan.md` says "add `jose` … caret latest v5." As of this session, npm's actual latest published `jose` is **`6.2.3`**, not a v5.x release. v6's only relevant breaking changes vs v5 (per the package's own CHANGELOG) are: `createRemoteJWKSet` dropped the Node-specific `agent` option (not used here), key-generation functions return `CryptoKey` instead of `KeyObject` (not used here), and the minimum Node version is 20+ (this server's `package.json` already declares `"engines": { "node": ">=20.0.0" }`). `jwtVerify`, `createRemoteJWKSet`, `JWTVerifyOptions` (`issuer`/`audience`/`algorithms`), and every error class name in scope are unchanged. **Resolution: add `"jose": "^6.2.3"`**, not `^5.x`. This packet's contract below was written and verified against the actual installed `jose@6.2.3` package (`.d.ts` + compiled JS, inspected directly on disk), not against docs prose alone.
- **Correction to how jose's error classes are imported** (this is the one place a naive read of jose's docs prose gets it wrong): `JWTExpired`, `JWTClaimValidationFailed`, `JWSSignatureVerificationFailed`, and `JWKSNoMatchingKey` are **not** flat named exports of the `'jose'` package. Grepping the installed package's own `dist/types/index.d.ts` shows only `export { errors };` — a single namespace export — with **no** individual `export { JWTExpired }`-style lines anywhere in the main index. The classes are declared in `dist/types/util/errors.d.ts` and only reachable as `errors.JWTExpired`, `errors.JWTClaimValidationFailed`, `errors.JWSSignatureVerificationFailed`, `errors.JWKSNoMatchingKey`, etc. (This is also reachable via the `'jose/errors'` subpath export, but this packet uses the namespace-import form for a single clean `import` line.) **The Contract's import line and error-categorization code below reflect this verified reality — follow it exactly, do not import the classes as flat named exports, that will fail to compile (`TS2305: Module '"jose"' has no exported member 'JWTExpired'`).**
- `JWTExpired extends JOSEError implements JWTClaimValidationFailed` (per the installed `.d.ts`) — `implements` here is a TypeScript **structural interface implementation only**; at runtime `JWTExpired`'s prototype chain does **not** go through `JWTClaimValidationFailed`. An `instanceof errors.JWTClaimValidationFailed` check on a thrown `JWTExpired` instance is `false`. The Contract's `categorizeAppleVerificationError` helper below checks `JWTExpired` as an independent, sibling case for this reason — do not "simplify" it by dropping the `JWTExpired` branch on the assumption `JWTClaimValidationFailed` would also catch it.
- `JWTVerifyOptions.audience` is typed `string | string[]` — an array is supported and matches "any-of" semantics (accepts if the token's `aud` claim matches any entry), which is exactly what `APPLE_CLIENT_IDS` (comma-separated, multi-value) needs.
- `JWTVerifyOptions.algorithms` is typed `string[]`.
- `createRemoteJWKSet` takes a `URL` instance, not a bare string (`createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'))`), and internally caches/rate-limits refetches — call it **once** at module scope and reuse the returned function; do not call it inside `verifyAppleToken` (that would defeat the cache and hit Apple's JWKS endpoint on every login).

---

## Contract

### C1 — `package.json` (exact edit)

In the `"dependencies"` block, insert one new line, alphabetically between `"ioredis"` and `"jsonwebtoken"` (current file has them adjacent — `"ioredis": "^5.8.2",` immediately followed by `"jsonwebtoken": "^9.0.3",`):

```json
    "ioredis": "^5.8.2",
    "jose": "^6.2.3",
    "jsonwebtoken": "^9.0.3",
```

Nothing else in `package.json` changes. `jsonwebtoken` stays (still used elsewhere in the codebase for the app's own access/refresh tokens — this packet only removes `oauth.service.ts`'s own `import jwt from 'jsonwebtoken'`, which was solely for the now-deleted unverified Apple decode).

### C2 — `src/services/oauth.service.ts` (exact target file content — full replace)

Replace the entire file with the following. Every line below is exact; do not paraphrase, reorder members, or "improve" anything not called out here.

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

### C3 — API surface summary (verbatim names, for downstream packets SP8/SP9)

- `oauthService.verifyAppleToken(idToken: string): Promise<SocialProfileData | null>` — **signature narrowed** from the old two-arg form (dropped the unused-after-rewrite `userData` second parameter — see rationale below).
- `oauthService.verifySocialToken(provider: 'google' | 'apple', idToken: string): Promise<SocialProfileData | null>` — **signature narrowed** to two args for the same reason. The live call site (`auth-registration.controller.ts`) already only ever passes two arguments, so this is not a breaking change to any current caller.
- `oauthService.verifyGoogleToken(idToken: string): Promise<SocialProfileData | null>` — unchanged signature; `getGoogleClientIds()` now also includes `GOOGLE_CLIENT_ID_IOS`.
- `SocialProfileData` shape is **unchanged** (still `{ provider, providerId, email, firstName?, lastName?, avatar?, accessToken? }`) — Apple's verified return just leaves `firstName`/`lastName`/`avatar`/`accessToken` `undefined`, since Apple's ID token carries no name claim (Apple only ever sends the user's name once, out-of-band, in the native client's one-time consent payload — not inside the JWT). **Deliberate scope boundary**: enriching the profile with that client-supplied name is controller-level display metadata, not identity verification, and is left to SP8 (`socialAuth` in `auth-registration.controller.ts`) to merge from `data.firstName`/`data.lastName` post-verification. Do not re-add a `userData` parameter to `verifyAppleToken` to "restore" this — the removal of the client-email fallback (the actual security hole) is what this packet exists to fix, and re-threading arbitrary client data back into the verifier would blur that boundary.

### C4 — New environment variables (names only; no `.env` file edited by this packet)

| Var | Read by | Format | Default when unset |
|---|---|---|---|
| `APPLE_CLIENT_IDS` | `oauthService.getAppleClientIds()` (new private method) | comma-separated string, values trimmed | `['ai.xyric.balencia']` |
| `GOOGLE_CLIENT_ID_IOS` | `oauthService.getGoogleClientIds()` (existing private method, extended) | single client id string | omitted from the set if unset (existing pattern — `Set` only adds present values) |

Both follow the **existing raw-`process.env` pattern already used for `GOOGLE_CLIENT_ID` / `AUTH_GOOGLE_ID` / etc. inside `oauth.service.ts` itself** — they are read directly via `process.env[...]` in this file, exactly like every other OAuth client-id env var here. **Resolution of an ambiguity in the parent task**: these names are *not* routed through `src/config/env.config.ts`'s typed `env` object — verified live, `env.config.ts` does not define `GOOGLE_CLIENT_ID` (or any Google/Apple OAuth client-id var) at all; those names have only ever been read raw inside `oauth.service.ts`. Following "the same way" means following *that* pattern, not adding entries to `env.config.ts`. See "Out of scope."

---

## Acceptance criteria

1. `npm run typecheck` passes with zero errors (this is the primary machine gate; `noUnusedLocals`/`noUnusedParameters` are strict, so a leftover unused `jwt` import or `userData` parameter fails this).
2. `oauth.service.ts` contains no import from `'jsonwebtoken'` and no call to `jwt.decode`.
3. `oauth.service.ts` imports `createRemoteJWKSet`, `jwtVerify`, and `errors as joseErrors` from `'jose'` (namespace-import form for the error classes — not flat named imports of `JWTExpired` etc., which do not exist on the package's top-level export surface).
4. `createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'))` is called exactly once, at module scope (not inside `verifyAppleToken` or any per-call path).
5. `verifyAppleToken(idToken)`:
   - On a token with a valid RS256 signature verifiable against Apple's live JWKS, matching `iss: 'https://appleid.apple.com'`, `aud` in `APPLE_CLIENT_IDS` (or the default `ai.xyric.balencia` if unset), not expired, and containing both `sub` and `email` → resolves to `{ provider: 'apple', providerId: <sub>, email: <email> }`.
   - On a bad signature, wrong `aud`, wrong `iss`, expired `exp`, missing `sub`, or missing `email` → resolves to `null`. **Never** throws out of the function, and **never** falls back to any client-supplied value for `providerId` or `email`.
   - The `null`-path `logger.warn` call never includes the raw `idToken` string or any decoded claim value beyond the short reason code / claim name.
6. `getAppleClientIds()` (or equivalent) reads `APPLE_CLIENT_IDS` from `process.env`, comma-splits, trims each entry, filters empties, and defaults to `['ai.xyric.balencia']` when unset or empty.
7. `getGoogleClientIds()` includes `GOOGLE_CLIENT_ID_IOS` in its checked env-var key list alongside the four existing keys; `verifyGoogleToken` accepts a token whose `aud` matches a value only present via `GOOGLE_CLIENT_ID_IOS`.
8. `package.json` has a `"jose": "^6.2.3"` line under `"dependencies"`; no other `package.json` field changes.
9. No file outside the two Target files is modified.
10. `npm install` (run by the lander, not this packet) succeeds and resolves `jose` without peer-dependency conflicts (v6 requires Node ≥20; this server's `engines.node` is already `>=20.0.0`).

## Out of scope

- Wiring `verifyAppleToken`/`verifySocialToken` into `auth-registration.controller.ts`'s `socialAuth` handler, the 401-on-Apple-failure behavior, and the "no NextAuth fallback for mobile Google" rule — all of that is **SP8**.
- Session/`sid` issuance on successful social auth — **SP5**.
- Adding `APPLE_CLIENT_IDS` / `GOOGLE_CLIENT_ID_IOS` to `src/config/env.config.ts`'s typed `env` object, its `requiredEnvVars` list, or its "Optional environment variables" doc comment — intentionally not this packet's job; these two vars are read raw inside `oauth.service.ts`, matching the existing Google client-id pattern already in this exact file.
- Adding `APPLE_CLIENT_IDS` / `GOOGLE_CLIENT_ID_IOS` to any `.env` / `.env.example` file — config values are Hamza/ops-owned (plan §10 OQ-C), not code.
- Unit tests for `verifyAppleToken`/the categorization helper (mocked JWKS, injected error classes) — that is **SP9**.
- Removing or restoring `AppleTokenPayload` under its old name, or any other cosmetic renaming beyond what's specified in Contract C2.
- Any change to `verifyGoogleTokenWithTokenInfo`, the Google `google-auth-library` dynamic-import path, or `createSocialProfile` — unchanged, included in C2 only because it's a full-file replace.
