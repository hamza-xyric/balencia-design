# Database Schema Auth Inventory — yhealth-app/server

## 1. Users Table Definition

**File:** `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/tables/02-users.sql` (lines 6–80)

Auth-relevant columns:

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key, auto-generated |
| `email` | VARCHAR(255) UNIQUE NOT NULL | User email, unique constraint |
| `password` | VARCHAR(255) | Hashed password (nullable for social auth) |
| `is_email_verified` | BOOLEAN DEFAULT false | Email verification status |
| `auth_provider` | auth_provider enum | 'local', 'google', 'apple', or 'system' (02-users.sql:22, 01-enums.sql:54) |
| `provider_id` | TEXT | Social auth provider ID (e.g., Google `sub`, Apple ID) |
| `refresh_token` | TEXT | Refresh token for token rotation |
| `password_reset_token` | VARCHAR(255) | Time-limited password reset token |
| `password_reset_expires` | TIMESTAMP | Password reset token expiration |
| `password_reset_attempts` | INTEGER DEFAULT 0 | Failed password reset attempt counter |
| `email_verification_token` | VARCHAR(255) | Email verification token |
| `email_verification_expires` | TIMESTAMP | Email verification token expiration |
| `phone_verification_code` | VARCHAR(10) | SMS OTP for phone verification |
| `phone_verification_expires` | TIMESTAMP | Phone verification code expiration |
| `last_login` | TIMESTAMP | Most recent login timestamp |
| `role_id` | UUID REFERENCES roles(id) | RBAC role foreign key (02-users.sql:15) |
| `is_active` | BOOLEAN DEFAULT true | Account active status |

Auth-related indexes (02-users.sql:73–80):
- `idx_users_email` — email lookups
- `idx_users_provider` — `(auth_provider, provider_id)` for social auth lookups

---

## 2. Sessions / Devices / Refresh Tokens Tables

**Status:** ABSENT

No dedicated `user_sessions`, `user_devices`, or `auth_refresh_tokens` tables exist in the schema. Refresh token strategy:
- Stored as a single column (`refresh_token TEXT`) in the `users` table (02-users.sql:39)
- Hashed via `hashRefreshToken(token: string)` before storage ([auth.middleware.ts:87](auth.middleware.ts))
- No device-per-token tracking or per-device session management

**Push token table** (for notification, not auth session management):
- File: `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/migrations/20260512002000_push_tokens_user_communication_preferences.sql` (lines 4–17)
- Table: `push_tokens (id UUID, user_id UUID, token TEXT, platform VARCHAR, active BOOLEAN, last_seen_at, created_at)`
- Purpose: Device push notification registration, not authentication

---

## 3. OTP / Verification Code Tables

**Status:** ABSENT

No dedicated table. OTP and verification codes are stored inline within the `users` table:
- `phone_verification_code VARCHAR(10)` (02-users.sql:45)
- `phone_verification_expires TIMESTAMP` (02-users.sql:46)
- `email_verification_token VARCHAR(255)` (02-users.sql:43)
- `email_verification_expires TIMESTAMP` (02-users.sql:44)

No `otp_codes`, `verification_codes`, or `email_verification_tokens` tables found.

---

## 4. Migration System

### Table Discovery & Discovery Order
**File:** `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/setup.ts` (lines 11–215)

**Table files directory:** `src/database/tables/` — SQL files prefixed with 2-digit numbers (00–147) for dependency order.

**Setup process:**
1. `npm run db:setup` → `tsx src/database/setup.ts`
2. Loads all `*.sql` files from `src/database/tables/` in numeric order
3. First loads extensions (00), enums (01), RBAC (73–75), then user tables (02+)
4. Each file is executed in a single transaction per file
5. Any unlisted table files (new modules) are auto-included before triggers (99-triggers.sql) (setup.ts:224–235)

**Migration files directory:** `src/database/migrations/` — SQL + TypeScript migration scripts

**Two migration runners:**

| Runner | File | Invoked By | Purpose |
|--------|------|-----------|---------|
| **`run-migrations.ts`** | `src/database/run-migrations.ts` (lines 15–104) | `npm run db:migrate` | Runs hardcoded migrations in `migrationFiles` array (add-plan-policy-to-user-plans.sql, add-whoop-credentials.sql, add-document-intelligence-tables.sql, etc.). Runs each in a transaction; skips if "already exists" error. |
| **`scripts/migrate.ts`** | `src/scripts/migrate.ts` | `npm run db:migrate:auto` / `npm run db:migrate:verify` | Discovers and runs timestamped migration files (format: `YYYYMMDDHHMMSS_description.sql` or `.ts`). Auto-detects and orders migrations. |

**Placement for new auth migrations:**
- **Table definition:** `src/database/tables/NN-description.sql` (use next available number, add to `setup.ts` TABLE_FILES array and to `99-triggers.sql` if `updated_at` trigger needed)
- **Migration (column adds/alters):** `src/database/migrations/YYYYMMDDHHMMSS_description.sql` and register in `run-migrations.ts` `migrationFiles` array

**Known gap (BIOS-002 evidence):** `139-life-area-checkins.sql` required manual `psql` execution during production; auto-migration did not apply it. [Documented in memory/MEMORY.md](memory/MEMORY.md)

---

## 5. PostgreSQL Connection & Query Patterns

### Pool Configuration
**File:** `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/config/database.config.ts`

**Pool initialization (lines 72–90):**
- Source: `DATABASE_URL` environment variable (preferred) or discrete `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Pool size: `DB_POOL_MAX` (default 30 connections)
- Idle timeout: `DB_IDLE_TIMEOUT_MS` (default 30000 ms)
- Connection timeout: `DB_CONNECTION_TIMEOUT_MS` (default 5000 ms)
- Statement timeout: `DB_STATEMENT_TIMEOUT_MS` (default 15000 ms)

**Connection setup (lines 152–178):**
- Each connection: `SET timezone = 'UTC'`, `SET statement_timeout`, `SET ivfflat.probes = IVFFLAT_PROBES`

### Query Helpers
**Module:** `src/config/database.config.ts` (exports via `src/database/pg.ts` line 1)

| Function | Signature | Notes |
|----------|-----------|-------|
| `query<T>()` | `(text: string, params?: unknown[], retries?: number, options?: {bestEffort?: boolean}) => Promise<QueryResult<T>>` | Parameterized queries; retry logic for connection timeouts (2 retries by default); schema mutation guard in production |
| `transaction<T>()` | `(callback: (client: PoolClient) => Promise<T>) => Promise<T>` | Auto BEGIN/COMMIT on success, ROLLBACK on error; client released finally |
| `pool` | `pg.Pool` | Raw pool instance for advanced use |
| `getClient()` | `() => Promise<PoolClient>` | Get a dedicated connection (caller must release) |

### Query Conventions

**Parameterized execution (never string-concatenated):**
```typescript
await query('SELECT * FROM users WHERE email = $1 AND is_active = $2', 
           [email, true])
```

**Transaction example (auth.middleware.ts pattern):**
```typescript
await transaction(async (client) => {
  await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, userId])
  await client.query('INSERT INTO audit_logs ...')
})
```

**Schema mutation guard (database.config.ts:47–56):**
- CREATE/ALTER/DROP/TRUNCATE blocked at runtime in production unless:
  - Running a migration process (grep for `migrate` in `process.argv`)
  - OR `ALLOW_RUNTIME_DDL=true`

### Auth Table Queries (Examples from Codebase)

**User fetch with role (auth.middleware.ts:56–67):**
```sql
SELECT u.id, u.email, u.is_active, r.slug as role
  FROM users u
  LEFT JOIN roles r ON u.role_id = r.id
 WHERE u.id = $1
```

**Refresh token hash (auth.middleware.ts:87):**
```typescript
hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}
// Token stored: UPDATE users SET refresh_token = sha256(token)
```

---

## Summary

| Aspect | Status | Evidence |
|--------|--------|----------|
| Users table auth columns | ✓ Present | 02-users.sql:9–46 |
| Dedicated session table | ✗ Absent | No `sessions`, `user_sessions`, or `auth_sessions` table |
| Dedicated device table | ✗ Absent | No `devices` or `user_devices` table |
| Dedicated refresh_token table | ✗ Absent | Single column in users; hash-only strategy |
| Dedicated OTP table | ✗ Absent | Inline in users table |
| Table discovery mechanism | ✓ Auto-include | setup.ts:224–235 guards against drift |
| Migration runner for new tables | ✓ Dual system | `setup.ts` (table files) + `run-migrations.ts` (migration files) |
| Query parameterization | ✓ Enforced | database.config.ts:108–112 guard; `$1, $2, ...` syntax required |
| Transaction support | ✓ Yes | `transaction<T>()` wrapper with implicit BEGIN/COMMIT/ROLLBACK |
