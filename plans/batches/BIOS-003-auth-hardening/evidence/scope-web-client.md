# Web Client AUTH Implementation Audit

## 1. Sign-In Page & Component

**Location:** `/Users/hamza/Desktop/balencia-design/yhealth-app/client/app/auth/signin/SignInPageContent.tsx`

**API Call Flow:**
- Uses `useAuth()` hook's `login()` function (from `/lib/use-auth.ts:147-190`)
- Calls `signIn("credentials", {...})` from NextAuth
- Credentials flow calls `/api/auth/login` backend endpoint via `lib/auth.ts:53-66`

**Request Payload:** JSON with `{ email, password }`

**Error Handling:**
- Validates email format and password presence with Zod schemas (`SignInPageContent.tsx:24-27`)
- Display errors from URL params via `getFriendlyAuthError()` (`auth-errors.ts:33-40`)
- Shows toast notifications for auth failures (`SignInPageContent.tsx:46`)
- Handles network errors with user-friendly messages

**Token Storage Strategy:**
- **Primary:** HttpOnly, secure, `sameSite: lax` cookies managed by NextAuth (`lib/auth.ts:276-289`)
- Cookie name: `__Secure-authjs.session-token` (production), `authjs.session-token` (dev)
- **Backend tokens separately:** HttpOnly cookies `access_token`, `refresh_token` set via `/api/auth/backend-session` endpoint (`backend-session/route.ts:57-72`)
- Maximum session age: 3 days (matches `JWT_EXPIRES_IN`)
- Access token path: `/` (line 63)
- Refresh token path: `/api/auth/refresh` (line 71)
- No browser-readable tokens; legacy `balencia_access_token` cookie is deleted on init (`api-client.ts:339-343`)

**Refresh Handling:**
- Automatic: On 401 error, client attempts to reinstall backend session from NextAuth JWT (`api-client.ts:191-203`)
- Re-installation via POST to `/api/auth/backend-session` which reads encrypted JWT and writes HttpOnly cookies
- If re-install fails or JWT expired, user redirected to `/auth/signin?expired=true` with optional callback URL
- Concurrent 401s deduplicated to single re-install attempt via `reauthInFlight` flag (`api-client.ts:500-529`)

**Post-Login Flow:**
- After `signIn()` succeeds, calls `installBackendSessionCookies()` (`use-auth.ts:46-62`)
- This POSTs to `/api/auth/backend-session` to write backend tokens
- On success, navigates to `/dashboard`

---

## 2. Google Sign-In

**Library:** NextAuth.js with custom Google provider configuration

**Location:** `/lib/auth.ts:108-131` (provider config), `app/auth/_components/AuthGoogleButton.tsx` (UI trigger)

**Flow:**
1. Client calls `loginWithGoogle()` hook (`use-auth.ts:192-234`)
2. Checks provider availability via `/api/auth/provider-status` GET endpoint (`app/api/auth/provider-status/route.ts`)
3. Calls NextAuth's `signIn("google", { redirect: false })`
4. If `result.url` exists, redirects browser to OAuth consent URL
5. Google OAuth callback handled by NextAuth's built-in handler at `/api/auth/[...nextauth]`

**Payload to Backend:**
After OAuth, client sends to `/api/auth/social` POST with:
```typescript
{
  provider: "google",
  providerId: googleProfile.sub,
  idToken: account.id_token,
  accessToken: account.access_token,
  email: profile.email,
  name: googleProfile.name,
  firstName: googleProfile.given_name,
  lastName: googleProfile.family_name,
  avatar: googleProfile.picture
}
```
(Source: `lib/auth.ts:146-159`)

**OAuth Configuration:**
- Uses NextAuth's Google provider with explicit endpoints (bypasses OpenID discovery for network resilience)
- Endpoints: 
  - Authorization: `https://accounts.google.com/o/oauth2/v2/auth` (with `access_type: offline`)
  - Token: `https://oauth2.googleapis.com/token`
  - UserInfo: `https://openidconnect.googleapis.com/v1/userinfo`
- Custom fetch handler (`lib/google-oauth-fetch.ts`) with fallback hostname rewriting for network isolation
- Timeout: 30 seconds (configurable via `GOOGLE_OAUTH_FETCH_TIMEOUT_MS`)
- Falls back to `oauth2.googleapis.com` → `www.googleapis.com` if primary URL unreachable (`google-oauth-fetch.ts:8-9`)

**Providers enabled** when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set (`lib/auth.ts:20`)

**Post-Login:**
Same as credentials: `/api/auth/backend-session` POSTs backend tokens, then navigates to dashboard

---

## 3. Apple Sign-In

**Status:** ABSENT — not implemented

No Apple provider configured in NextAuth config, no Apple sign-in button in auth components, no Apple OAuth endpoints defined.

---

## 4. Registration Flow

**Location:** `/app/auth/signup/SignupPageContent.tsx`

**Flow (2-step):**

**Step 1: Registration Form**
- Fields: firstName, lastName, email, dateOfBirth (min 16 years old), gender, password (8+ chars, uppercase, lowercase, digit, special), confirmPassword
- Validation: Zod schemas (`SignupPageContent.tsx:25-66`)
- Password strength indicator with real-time feedback (`SignupPageContent.tsx:81-94`)
- Google sign-in option available (same as sign-in page)

**After Form Submit:**
- Client calls `useAuth().register()` with form data
- Backend endpoint: POST `/api/auth/register` via `api.post()` (`use-auth.ts:77-80`)
- Server responds with `{ activationToken, message }`
- On success, transitions to OTP verification step

**Step 2: OTP Verification**
- Shows "Verify Your Email" screen with 4-digit input boxes (`SignupPageContent.tsx:569-711`)
- Auto-focus on digit entry, paste support
- Calls `verifyRegistration()` on complete OTP entry
- Backend endpoint: POST `/api/auth/verify-registration` with `{ activationToken, activationCode, email, password }` (`use-auth.ts:107-111`)

**After OTP Verification:**
- Backend responds with verified user
- Client auto-signs in via `signIn("credentials", { email, password, redirect: false })` (`use-auth.ts:115-119`)
- Installs backend session cookies via `/api/auth/backend-session` (`use-auth.ts:127`)
- Navigates to `/dashboard`
- Toast: "Account created successfully! Welcome to Balencia!"

**Resend OTP:**
- Cooldown: 60 seconds between resends (`SignupPageContent.tsx:139, 231`)
- Endpoint: POST `/api/auth/resend-registration-otp` with `{ activationToken }` (`use-auth.ts:353-356`)

---

## 5. Email Verification / OTP UI Flow

**Location:** `/app/auth/verify/VerifyPageContent.tsx`

**Flow:**
- Triggered by email link: `/auth/verify?email=...&token=...`
- On mount, automatically calls `verifyEmail({ token })` if token present (`VerifyPageContent.tsx:21-26`)
- Backend endpoint: POST `/api/auth/verify-email` with `{ token }` (`use-auth.ts:303`)
- No OTP input UI for this flow (token-based, not OTP-based)

**States:**
1. **Pending:** Shows message "We've sent a verification link to [email]" with instructions
2. **Verified:** Shows checkmark, "Email Verified!" message
3. **Resend:** 60-second cooldown before allowing resend (`VerifyPageContent.tsx:39`)
   - Endpoint: POST `/api/auth/resend-verification` with `{ email }` (`use-auth.ts:328`)

**Post-Verification Navigation:**
- Redirects to `/auth/signin` to sign in

---

## 6. Forgot-Password & Reset-Password

**Forgot-Password Page:** `/app/auth/forgot-password/ForgotPasswordPageContent.tsx`

**Flow:**
- Email input with validation
- Calls `forgotPassword({ email })` 
- Backend endpoint: POST `/api/auth/forgot-password` (`use-auth.ts:254`)
- Toast: "We've sent a 4-digit reset code to your email."
- Redirects to `/auth/reset-password?email=<encoded-email>`

**Reset-Password Page:** `/app/auth/reset-password/ResetPasswordPageContent.tsx`

**Flow:**
- Requires email query param (redirects to forgot-password if missing)
- Fields: 4-digit reset code (OTP), new password (8+ chars, uppercase, lowercase, digit, special), confirm password
- Password strength indicator (`ResetPasswordPageContent.tsx:42-77`)
- Calls `resetPassword({ email, otp, password, confirmPassword })`
- Backend endpoint: POST `/api/auth/reset-password` (`use-auth.ts:277`)
- On success: Shows "Password Reset!" confirmation screen
- Redirects to `/auth/signin`

**Resend Code:**
- Link: "Didn't get a code? Request a new one" back to `/auth/forgot-password`

---

## 7. Session Management & Refresh Strategy

**Cadence:**
- NextAuth session checked on every app mount via `useSession()` hook (automatic, built-in)
- Manual refresh available via `AuthContext.refreshUser()` → GET `/api/auth/me` (`AuthContext.tsx:417`)
- Backend session cookies auto-refreshed on demand when accessing protected routes

**Interceptor Strategy (Axios):**
- **Request interceptor:** Adds `Content-Type: application/json`, cache-control for integrations (`api-client.ts:84-113`)
- **Response interceptor:** Handles 401 Unauthorized with automatic retry (`api-client.ts:117-335`)

**401 Handling (Backward-Compat Contract):**
1. On 401 response, check if error indicates token expiration (`api-client.ts:157-204`)
2. If NOT yet retried (`_retriedAfterReauth` flag), attempt to reinstall backend session:
   - POST to `/api/auth/backend-session` (reads JWT from NextAuth session cookie, writes backend tokens)
   - If reinstall succeeds, retry original request once
   - If reinstall fails or request already retried, proceed to logout
3. Trigger logout callback: `api.setOnTokenExpired()` → sets `isLoggingOut` flag, then calls `signOut({ callbackUrl: "/auth/signin?expired=true" })` (`AuthContext.tsx:115-149`)
4. Clear legacy token cookie (`api-client.ts:211`)
5. Optional: Call backend `POST /api/auth/logout` (best-effort, errors ignored) (`AuthContext.tsx:396`)

**Session Re-Installation (Self-Healing Race Condition):**
- **Problem:** After login, NextAuth session flips to "authenticated" and navigates to protected routes before `/api/auth/backend-session` writes cookies. First request 401s, user bounced to signin.
- **Solution:** On first 401, try reinstalling backend session from JWT before logging out. This allows a single auto-retry without user intervention.
- **Implementation:** `api.reinstallBackendSession()` → POST `/api/auth/backend-session`, returns `true` if `installed: true` in response (`api-client.ts:500-529`)

**Cookies & Expiration:**
- **NextAuth session cookie:** 3 days, HttpOnly, secure, sameSite: lax (`lib/auth.ts:268-289`)
- **Backend access_token:** 3 days, path `/`, HttpOnly, sameSite: strict (`backend-session/route.ts:58-64`)
- **Backend refresh_token:** 7 days, path `/api/auth/refresh`, HttpOnly, sameSite: strict (`backend-session/route.ts:66-72`)

**Network Error Handling:**
- Network errors (server unreachable) don't trigger logout; error thrown with descriptive message (`api-client.ts:288-327`)
- Development mode shows "Start backend with: cd server && bun run dev"
- Rate-limited logging to avoid spam (once per 5 seconds per URL)

**AuthContext Token Expiration Handler:**
- Set on mount: `api.setOnTokenExpired(callback)` (`AuthContext.tsx:115`)
- Callback checks if on public/auth route (no redirect), otherwise `signOut({ callbackUrl: "/auth/signin?expired=true" })`
- Cleanup on unmount: `api.setOnTokenExpired(null)`

---

## 8. API Token Management & Environment Variables

**Env Vars Used:**
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default `http://localhost:5000/api`)
- `GOOGLE_CLIENT_ID`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`, `AUTH_GOOGLE_SECRET`, `AUTH_GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `AUTH_SECRET` / `NEXTAUTH_SECRET` - NextAuth encryption key
- `GOOGLE_OAUTH_FETCH_TIMEOUT_MS` - Google OAuth fetch timeout (default 30000ms)
- `NODE_ENV` - Controls secure cookie flag and logging verbosity

**Lookup Priority:**
- Google ID: `GOOGLE_CLIENT_ID` → `AUTH_GOOGLE_ID` → `AUTH_GOOGLE_CLIENT_ID`
- Google Secret: `GOOGLE_CLIENT_SECRET` → `AUTH_GOOGLE_SECRET` → `AUTH_GOOGLE_CLIENT_SECRET`

---

## 9. Protected Route Navigation & Route Guards

**Public Routes (no auth required):**
`/`, `/about`, `/blogs`, `/careers`, `/contact`, `/cookies`, `/faq`, `/help`, `/hipaa`, `/press`, `/preview`, `/privacy`, `/security`, `/terms`, `/webinars`, `/reset-password`

**Auth Routes (redirect to dashboard if authenticated):**
`/auth/signin`, `/auth/signup`

**Admin Routes (require admin role):**
`/admin/*`

**Implementation:** `AuthContext.tsx` enforces via `useEffect` route protection (`AuthContext.tsx:335-390`):
- Unauthenticated access to protected routes → redirect to `/auth/signin?callbackUrl=<pathname>`
- Authenticated access to auth routes → redirect to `/dashboard`
- Admin routes checked via separate `useAdminAccess` hook (not in AuthContext)
- Loading state waits before redirecting

---

## 10. Error Mapping & User Messaging

**Error Code → Message Mapping:** `/lib/auth-errors.ts`

**NextAuth Errors:**
- `Configuration` - OAuth provider unreachable
- `AccessDenied` - User cancelled OAuth
- `OAuthAccountNotLinked` - Email already registered with different provider
- `CallbackRouteError` - Server error during callback
- `CredentialsSignin` - Invalid email/password
- `ConnectTimeout` - Provider unreachable (connection timeout)
- `Verification` - Invalid/expired verification token

**API Error Codes:**
- `NETWORK_ERROR` - Backend server unreachable
- `VALIDATION_ERROR` - Invalid input
- `CONFLICT` - Email already exists
- `UNAUTHORIZED` - Bad credentials
- `FORBIDDEN` - Account action denied
- `TOO_MANY_REQUESTS` - Rate limited
- `INTERNAL_SERVER_ERROR` - Server error
- `SERVICE_UNAVAILABLE` - Service down

**Suggested Actions per Flow:**
- `login` + "social account" error → suggest Google sign-in
- `register`/`verifyRegistration` + `CONFLICT` → suggest Sign In or Forgot Password
- `resetPassword` + "expired" → suggest new reset link
- `verifyRegistration` + "expired" → suggest new OTP

---

## 11. Session Data Shape (NextAuth JWT)

**Token Fields (stored in encrypted JWT):**
- `id` - User ID
- `email` - User email
- `name` - User full name
- `image` - Avatar URL
- `onboardingStatus` - Registration status
- `role` - User role ("user" or "admin")
- `backendAccessToken` - Backend access token (HttpOnly, not exposed to client)
- `backendRefreshToken` - Backend refresh token (HttpOnly, not exposed to client)
- `backendExpiresIn` - Token expiration in seconds

**Session Object (client-accessible):**
```typescript
{
  user: {
    id: string
    email: string
    name: string
    image: string | null
    role?: string
  },
  onboardingStatus: string,
  expires: string // ISO timestamp
}
```

---

## 12. Key Security & Architecture Notes

1. **HttpOnly Token Storage:** Backend tokens stored in HttpOnly cookies, never accessible to JavaScript, preventing XSS leakage
2. **JWT Strategy:** NextAuth uses JWT instead of database sessions, reducing database load
3. **Self-Healing Race Condition:** Automatic retry on 401 during post-login prevents forced re-login on page refresh
4. **Token Rotation:** Refresh token path-scoped to `/api/auth/refresh` to limit exposure
5. **Deduplication:** Concurrent identical GET requests deduplicated to single fetch
6. **Network Resilience:** Google OAuth custom fetch with hostname fallback for restrictive networks
7. **Request Cancellation Support:** Axios abort signals respected, canceled requests removed from dedup map

---

## 13. Testing & Integration Points

**Test coverage exists for:**
- API client 401 retry logic (`__tests__/lib/api-client-401-retry.test.ts`)
- API client base functionality (`__tests__/lib/api-client.test.ts`)
- Auth hook mutations (`__tests__/hooks/use-api-mutation.test.ts`)

**Backward-Compat Contract Summary:**
- 3-day session age must match backend
- 401 status code triggers logout flow
- Backend tokens in HttpOnly cookies, not JSON response
- `/api/auth/backend-session` endpoint required for post-login setup
- `/api/auth/me` endpoint returns `{ user: {...} }` structure
