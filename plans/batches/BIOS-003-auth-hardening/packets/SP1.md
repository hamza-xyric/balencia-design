# Packet SP1 — `user_sessions` DDL + migration registration (DB only)

## Objective

Create the `user_sessions` table (per-device refresh-token sessions — rotation, reuse detection, revocation, session caps) as (a) a canonical table file for fresh database bootstrap and (b) an idempotent timestamped migration for existing databases, and **register both** so they are actually applied rather than silently skipped (the historical `139-life-area-checkins.sql` gap class this batch must not repeat). This packet is **DB-only**: no TypeScript service/controller/route code, no `package.json` changes. All session-service logic (rotation, reuse detection, `sid` threading, controller wiring) lands in later packets (SP3–SP8) that depend on this one.

This packet also resolves one internal plan inconsistency (see Contract §"Resolution note" below): plan §4's DDL and amendment A5's atomic rotation SQL disagree on one column, and A5 wins per the task's override rule.

## Target files (exact absolute paths)

**Create:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/tables/146-user-sessions.sql`
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/migrations/20260709021904_create_user_sessions.sql`

**Modify:**
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/setup.ts` (append to the `TABLE_FILES` array)
- `/Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/auto-migrate.ts` (append to the `EXPECTED_TABLES` array **and** the `SUPPLEMENTARY_MIGRATIONS` array)

**Do NOT touch:** `src/database/tables/99-triggers.sql` (this table has no `updated_at` trigger — see DDL note), `src/database/auto-migrate.ts`'s `migrationTableMap` dict (~line 1394) or `tableToFileMap` dict (~line 1453) — not needed, see Contract §"Why no map edit" below. No `package.json` change (that's SP2, adding `jose`).

---

## Embedded current source

All line numbers below were read live from source on 2026-07-09 at composition time (never trust the architecture plan's own line numbers — re-derive, per amendment A7). File sizes at read time: `setup.ts` = 372 lines (embedded in full below); `auto-migrate.ts` = 1756 lines (over the 600-line threshold — only the regions this packet touches or needs for context are embedded verbatim below, with explicit elision markers for everything else).

### `src/database/setup.ts` (FULL FILE — 372 lines)

```typescript
import 'dotenv/config';
import { Pool } from 'pg';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Table files in order (for foreign key dependencies)
const TABLE_FILES = [
  '00-extensions.sql',
  '01-enums.sql',
  // RBAC tables must come before users (users.role_id references roles)
  '73-roles.sql',
  '74-permissions.sql',
  '75-role-permissions.sql',
  '02-users.sql',
  '03-consent-records.sql',
  '04-whatsapp-enrollments.sql',
  '05-user-preferences.sql',
  '06-user-goals.sql',
  '07-assessment-questions.sql',
  '08-assessment-responses.sql',
  '09-user-integrations.sql',
  '10-sync-logs.sql',
  '11-health-data-records.sql',
  '12-user-plans.sql',
  '13-activity-logs.sql',
  '14-notifications.sql',
  '15-ai-coach-sessions.sql',
  '16-diet-plans.sql',
  '17-meal-logs.sql',
  // Health tracking & gamification tables
  '18-body-images.sql',
  '19-exercises.sql',
  '20-workout-plans.sql',
  '21-workout-logs.sql',
  '22-progress-records.sql',
  '23-water-intake.sql',
  '24-xp-transactions.sql',
  '25-shopping-list.sql',
  '26-workout-alarms.sql',
  '27-recipes.sql',
  '27-user-videos.sql',
  '28-scheduled-reminders.sql',
  '29-user-tasks.sql',
  '30-vector-extension.sql',
  '31-voice-calls.sql',
  '32-voice-call-events.sql',
  '33-activity-status-history.sql',
  '34-emotion-logs.sql',
  '35-mental-recovery-scores.sql',
  '36-call-summaries.sql',
  '37-action-items.sql',
  // Chat and messaging tables
  '38-chats.sql',
  '39-messages.sql',
  '40-chat-participants.sql',
  '41-message-reactions.sql',
  '42-message-reads.sql',
  '43-starred-messages.sql',
  '44-daily-health-metrics.sql',
  // Wellbeing Pillar tables (Epic 07)
  '45-stress-logs.sql',
  '46-mood-logs.sql',
  '47-journal-entries.sql',
  '48-habits.sql',
  '49-habit-logs.sql',
  '50-energy-logs.sql',
  '51-wellbeing-routines.sql',
  '52-routine-completions.sql',
  '53-mindfulness-practices.sql',
  '54-daily-schedules.sql',
  // Workout reschedule system tables
  '55-workout-schedule-tasks.sql',
  '56-user-workout-constraints.sql',
  '57-plan-reschedule-history.sql',
  // Wellbeing breathing tests table
  '59-breathing-tests.sql',
  // Emotional check-in sessions table
  '60-emotional-checkin-sessions.sql',
  // Nutrition analysis tables (order matters: 61 before 62 due to foreign key)
  '61-nutrition-daily-analysis.sql',
  '62-nutrition-calorie-adjustments.sql',
  '63-nutrition-adherence-patterns.sql',
  '64-nutrition-user-preferences.sql',
  '65-schedule-automation-logs.sql',
  '66-activity-automation-logs.sql',
  // Activity events table (for daily scoring)
  '67-activity-events.sql',
  // Blogs & blog reactions
  '55-blogs.sql',
  '68-blog-reactions.sql',
  // Contact form submissions
  '69-contact-submissions.sql',
  // Leaderboard & Competitions tables
  '68-daily-user-scores.sql',
  '69-leaderboard-snapshots.sql',
  '70-competitions.sql',
  '71-competition-entries.sql',
  // Help center, community, webinars
  '70-help-articles.sql',
  '71-community-posts.sql',
  '72-webinars.sql',
  // Note: 73-roles, 74-permissions, 75-role-permissions moved before 02-users
  // Exercise lookup tables (muscle groups, equipment, etc.)
  '80-exercise-lookup-tables.sql',
  // Testimonials
  '82-testimonials.sql',
  // AI Coach coaching profiles
  '83-user-coaching-profiles.sql',
  // Newsletter subscriptions
  '76-newsletter-subscriptions.sql',
  // User roles (many-to-many join table)
  '77-user-roles.sql',
  // Journaling & wellbeing system tables
  '84-daily-checkins.sql',
  '85-life-goals.sql',
  '86-journal-insights.sql',
  '87-lessons-learned.sql',
  '88-insight-feedback.sql',
  '88-voice-journal-sessions.sql',
  // Intelligence & analytics tables
  '89-weekly-analysis-reports.sql',
  '90-prediction-accuracy.sql',
  // Spotify integration
  '91-spotify-cached-playlists.sql',
  // Yoga system tables
  '92-yoga-poses.sql',
  '93-yoga-sessions.sql',
  '94-yoga-session-logs.sql',
  '95-meditation-timers.sql',
  '96-yoga-streaks.sql',
  // Life history
  '97-user-life-history.sql',
  // Life goal milestones, motivation & goal actions
  '98-life-goal-milestones-checkins.sql',
  '99-user-motivation-profiles.sql',
  '100-goal-actions.sql',
  // Proactive messaging log
  '101-proactive-messages.sql',
  // Email engine tables
  '102-email-logs.sql',
  '103-email-preferences.sql',
  // Vision testing tables
  '104-vision-test-sessions.sql',
  '105-vision-test-responses.sql',
  '106-vision-streaks.sql',
  // Finance
  '107-finance.sql',
  // Streak system
  '108-user-streaks.sql',
  '109-streak-activity-log.sql',
  '110-streak-freeze-log.sql',
  '111-streak-rewards.sql',
  // Accountability system
  '112-accountability-system.sql',
  // Accountability contracts
  '113-accountability-contracts.sql',
  // Follow / Buddy system
  '115-user-follows.sql',
  // Calendar integration
  '113-calendar-connections.sql',
  '114-calendar-events.sql',
  // Obstacle diagnosis
  '116-goal-obstacles.sql',
  // Goal reconnection (DKA prevention)
  '117-goal-reconnections.sql',
  // Contextual Timing — learned peak engagement hours
  '118-user-timing-profiles.sql',
  // Holiday / cultural calendar for AI coaching
  '119-holiday-calendar.sql',
  // Universal Data Source Correlation
  '120-data-source-connections.sql',
  '121-data-source-signals.sql',
  '122-user-daily-correlations.sql',
  '123-spotify-listening-history.sql',
  '124-prayer-schedules.sql',
  '125-finance-tracking.sql',
  // Competition invitations (shared challenges)
  '126-competition-invitations.sql',
  // Mental health screening audit (no raw message body)
  '127-mental-health-screening-events.sql',
  // Intelligence files system (AI memory & knowledge layer)
  '130-intelligence.sql',
  // Quick notes
  '130-quick-notes.sql',
  // Wiki system (LLM knowledge layer)
  '131-wiki.sql',
  // Career module (goals/levels/tasks, profiles/applications/evidence/skills,
  // execution commitments, weeks). Must load before 99-triggers.sql, which
  // creates updated_at triggers on these tables.
  '133-career.sql',
  '134-career-extended.sql',
  '135-career-execution.sql',
  '136-career-weeks.sql',
  // Document Intelligence (uploaded documents, chunks, analytics). Must load
  // before 99-triggers.sql, which creates the documents updated_at trigger.
  '137-documents.sql',
  // Journal page-mentions (derived cache of @page mentions in content_json).
  // Depends on journal_entries (47), so loads after it and before 99-triggers.
  '138-journal-entry-mentions.sql',
  // Monthly analysis reports (deterministic rollup of weekly_analysis_reports).
  // Depends on users; loads before 99-triggers.
  '139-monthly-analysis-reports.sql',
  // Contract witnesses (peer verification of completion). Depends on
  // accountability_contracts (113); loads before 99-triggers.
  '140-contract-witnesses.sql',
  // Resource Recommendation Engine (SIA resource concierge). Depends on users;
  // loads before 99-triggers. Flag-gated by ENABLE_RESOURCE_RECOMMENDATIONS.
  '145-resource-recommendations.sql',
  // Triggers (must be last)
  '99-triggers.sql',
];

function loadSchemaFiles(skipVector: boolean = false): string {
  const tablesDir = join(__dirname, 'tables');
  const schemas: string[] = [];

  // Completeness guard: auto-include any canonical table file not registered in
  // TABLE_FILES (new modules routinely forget), inserted before the trigger file
  // so their lower-numbered dependencies load first. Prevents local/CI schema
  // drift where a table exists in code but never gets created.
  const listedSet = new Set(TABLE_FILES);
  const prefixNum = (f: string): number => {
    const m = f.match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : 9999;
  };
  const unlisted = readdirSync(tablesDir)
    .filter((f) => f.endsWith('.sql') && !f.includes('no-pgvector') && !listedSet.has(f))
    .sort((a, b) => prefixNum(a) - prefixNum(b) || a.localeCompare(b));
  const filesToLoad = [...TABLE_FILES];
  const trigIdx = filesToLoad.findIndex((f) => f.includes('99-triggers'));
  filesToLoad.splice(trigIdx >= 0 ? trigIdx : filesToLoad.length, 0, ...unlisted);

  for (const file of filesToLoad) {
    // When pgvector is not available, swap vector-extension for the no-pgvector fallback
    if (skipVector && file === '30-vector-extension.sql') {
      const fallbackFile = '30-vector-extension-no-pgvector.sql';
      const fallbackPath = join(tablesDir, fallbackFile);
      try {
        const content = readFileSync(fallbackPath, 'utf-8');
        schemas.push(`-- ========== ${fallbackFile} ==========\n${content}`);
        console.log(`  ⚠ Using fallback ${fallbackFile} (pgvector not available)`);
      } catch {
        console.log(`  ⚠ Skipped ${file} (pgvector not available, no fallback found)`);
      }
      continue;
    }

    const filePath = join(tablesDir, file);
    try {
      const content = readFileSync(filePath, 'utf-8');
      schemas.push(`-- ========== ${file} ==========\n${content}`);
      console.log(`  ✓ Loaded ${file}`);
    } catch (err) {
      // Skip vector extension file if it doesn't exist (optional)
      if (file.includes('vector-extension') && (err as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log(`  ⚠ Skipped ${file} (not found, using fallback)`);
        continue;
      }
      console.error(`  ✗ Failed to load ${file}:`, err);
      throw err;
    }
  }

  return schemas.join('\n\n');
}

// Parse DATABASE_URL into individual connection params
function parseConnectionString(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || '5432', 10),
    database: parsed.pathname.slice(1),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
  };
}

async function setupDatabase() {
  const poolConfig = process.env['DATABASE_URL']
    ? parseConnectionString(process.env['DATABASE_URL'])
    : {
        host: process.env['DB_HOST'] || 'localhost',
        port: parseInt(process.env['DB_PORT'] || '5432', 10),
        database: process.env['DB_NAME'] || 'balencia',
        user: process.env['DB_USER'] || 'postgres',
        password: process.env['DB_PASSWORD'] || '',
      };
  const pool = new Pool(poolConfig);

  try {
    console.log('🔌 Connecting to database...');
    console.log('\n📂 Loading schema files from /tables:');

    // First, try to check if pgvector extension is available or can be created
    let skipVector = false;
    try {
      // Try to create the extension (will succeed if available, fail if not)
      await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
      // Check if it actually exists now
      const extCheck = await pool.query('SELECT 1 FROM pg_extension WHERE extname = \'vector\'');
      if (extCheck.rows.length > 0) {
        console.log('  ✓ pgvector extension is available');
      } else {
        throw new Error('Extension creation succeeded but extension not found');
      }
    } catch (_extErr: any) {
      // Extension not available or insufficient privileges
      console.log('  ⚠ pgvector extension not available, skipping vector tables');
      skipVector = true;
    }

    // Create the updated_at trigger function early (needed by several table files)
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
    console.log('  ✓ Created update_updated_at_column() trigger function');

    // Load all schema files from /tables folder
    const schema = loadSchemaFiles(skipVector);

    console.log('\n⚡ Applying database schema...');
    
    try {
      await pool.query(schema);
      console.log('\n✅ Database schema applied successfully!');
    } catch (err: any) {
      // If error is about vector type and we didn't skip it, retry without vector
      if (!skipVector && (err?.message?.includes('type "vector" does not exist') || err?.code === '42704')) {
        console.log('\n⚠ Retrying without vector tables...');
        const schemaWithoutVector = loadSchemaFiles(true);
        await pool.query(schemaWithoutVector);
        console.log('\n✅ Database schema applied successfully (without pgvector)!');
      } else {
        throw err;
      }
    }

    // Verify tables were created
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log(`\n📊 Created ${result.rows.length} tables:`);
    result.rows.forEach(row => {
      console.log(`  • ${row.table_name}`);
    });

    console.log('\n🎉 Database setup complete!');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
```

**Note on `loadSchemaFiles`'s "completeness guard"** (lines 217–236 above): any `.sql` file in `tables/` not listed in `TABLE_FILES` gets auto-appended before `99-triggers.sql` anyway, sorted by numeric prefix. This means even an *unregistered* `146-user-sessions.sql` would eventually get picked up by `db:setup` — but per amendment A2 and the explicit instruction, register it explicitly in `TABLE_FILES` anyway for determinism and to match the `140-contract-witnesses.sql` / `145-resource-recommendations.sql` precedent (both are explicitly listed despite the guard existing).

---

### `src/database/auto-migrate.ts` (1756 lines total — relevant regions only)

**Region A — file header + start of `EXPECTED_TABLES` (lines 1–16, context only, not modified):**

```typescript
import { pool } from '../config/database.config.js';
import { logger } from '../services/logger.service.js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of expected tables in the database
const EXPECTED_TABLES = [
  'users',
  'user_preferences',
  'consent_records',
  'whatsapp_enrollments',
  'user_goals',
  ... (326 more table name string literals, unchanged — ELIDED, do not touch) ...
```

**[ELIDED: lines 17–339 — the full middle body of `EXPECTED_TABLES`, ~320 unrelated table-name string literals grouped by feature area with inline comments. Not touched by this packet.]**

**Region B — `EXPECTED_TABLES` tail through closing bracket (lines 340–369, EDIT TARGET — append here):**

```typescript
  'whatsapp_event_outbox',
  'whatsapp_message_audit',
  'whatsapp_coach_conversations',
  'whatsapp_pending_actions',
  'whatsapp_commitments',
  // Churn / Trust ML
  'churn_training_samples',
  'churn_model_weights',
  'trust_training_samples',
  'trust_model_weights',
  // Personal relationships (contacts + reach-out reminders)
  'personal_contacts',
  'contact_notes',
  'contact_interactions',
  // Content moderation (abuse reports + admin queue)
  'content_reports',
  // Bot/sybil trust scoring
  'user_trust_signals',
  // Matching weight-tuning loop (data-driven buddy-matcher weights)
  'matching_weights',
  'matching_weight_history',
  // Lightweight A/B experiment framework
  'experiments',
  'experiment_assignments',
  'experiment_events',
  // Predictive churn / at-risk scoring
  'user_churn_risk',
  // WhatsApp in-app inbox mirror durability
  'whatsapp_mirror_messages',
  // Unified notification outbox (Phase 0)
  'notification_outbox',
  'notification_deliveries',
  // Onboarding telemetry — analytics events (Part 6) + progressive profile (Part 3)
  'onboarding_analytics_events',
  'onboarding_profiles',
  // Resource Recommendation Engine (SIA resource concierge)
  'resource_recommendation_bundles',
  'resource_interactions',
  'resource_preferences',
];
```

**[ELIDED: lines 370–1021 — `EXPECTED_TYPES` array (enum type names), `getExistingTables()`/`getExistingTypes()` queries, `fixUsersTableColumns()`, `stripLeadingComments()`, `splitSqlStatements()` SQL-statement-splitter helper. Not touched.]**

**Region C — `runMigration()` function (lines 1022–1105, CONTEXT ONLY — explains the execution semantics your two new files must be compatible with; do not modify):**

```typescript
async function runMigration(migrationFile: string): Promise<void> {
  const migrationPath = join(__dirname, 'migrations', migrationFile);

  if (!existsSync(migrationPath)) {
    logger.warn('Migration file not found', { path: migrationPath });
    return;
  }

  const migration = readFileSync(migrationPath, 'utf-8');

  // Check if migration contains DO blocks (PostgreSQL anonymous code blocks)
  // Execute each DO block independently so one failure doesn't abort the rest
  if (migration.includes('DO $$')) {
    logger.info(`Running migration: ${migrationFile} (DO blocks detected, executing independently)`);

    // Split into individual DO blocks and regular SQL statements
    const blocks: string[] = [];
    const doBlockRegex = /DO\s*\$\$[\s\S]*?END\s*\$\$\s*;/g;
    let lastIndex = 0;
    let match;

    while ((match = doBlockRegex.exec(migration)) !== null) {
      const between = migration.substring(lastIndex, match.index).trim();
      if (between) {
        blocks.push(...splitSqlStatements(between));
      }
      blocks.push(match[0]);
      lastIndex = match.index + match[0].length;
    }

    const afterLastBlock = migration.substring(lastIndex).trim();
    if (afterLastBlock) {
      blocks.push(...splitSqlStatements(afterLastBlock));
    }

    let successCount = 0;
    let skipCount = 0;
    for (const block of blocks) {
      try {
        await pool.query(block);
        successCount++;
      } catch (error: any) {
        if (error?.code === '42P07' || error?.code === '42710' || error?.code === '42701' ||
            error?.message?.includes('already exists') || error?.message?.includes('duplicate')) {
          skipCount++;
          continue;
        }
        // Log but continue with remaining blocks
        logger.warn(`Migration block had issues in ${migrationFile}`, {
          error: error?.message,
          block: block.substring(0, 80) + '...',
        });
      }
    }

    logger.info(`Migration completed: ${migrationFile} (${successCount} applied, ${skipCount} skipped)`);
    return;
  }

  // Split by semicolons and execute each statement separately to avoid syntax errors
  // Strip leading comment lines from each chunk before filtering — a chunk like
  // "-- comment\nCREATE TABLE ..." should NOT be discarded.
  const statements = splitSqlStatements(migration);

  logger.info(`Running migration: ${migrationFile} (${statements.length} statements)`);

  for (const statement of statements) {
    if (statement.trim().length > 0) {
      try {
        await pool.query(statement);
      } catch (error: any) {
        // Ignore "already exists" errors for IF NOT EXISTS statements
        if (error?.code === '42701' || error?.code === '42P07' || error?.code === '42710' ||
            error?.message?.includes('already exists') || error?.message?.includes('duplicate')) {
          logger.debug(`Statement already applied: ${statement.substring(0, 50)}...`);
          continue;
        }
        throw error;
      }
    }
  }
  
  logger.info(`Migration completed: ${migrationFile}`);
}
```

Key takeaway: `runMigration` splits your migration file on semicolons (with a DO-block-aware path, unused here since your DDL has no `DO $$` block) and executes each statement, swallowing "already exists"/"duplicate" errors (Postgres codes `42701`, `42P07`, `42710`). Your DDL must therefore be plain `CREATE TABLE IF NOT EXISTS` / `CREATE INDEX IF NOT EXISTS` statements — no `DROP TABLE`, no unconditional `CREATE TABLE` — exactly like the DDL below.

**Region D — `SUPPLEMENTARY_MIGRATIONS` array, FULL (lines 1107–1296, EDIT TARGET — append at the end, before the closing bracket):**

```typescript
/**
 * Dated / additive migrations and index packs not fully covered by table-first DDL.
 * All are written to be idempotent (IF NOT EXISTS, DO $$ duplicate guards, etc.).
 * Runs after sync-missing-columns so columns like ai_coach_persona exist first.
 */
const SUPPLEMENTARY_MIGRATIONS: readonly string[] = [
  '20260416000000_goal_obstacles.sql',
  '20260417000000_goal_reconnections.sql',
  '20260417120000_user-commitments-life-area.sql',
  '20260417140000_ai_coach_persona.sql',
  '20260418000000_user_timing_profiles.sql',
  '20260421000000_add_mood_rating_to_mood_logs.sql',
  '20260422000000_schedule_items_source.sql',
  '20260423100000_create_entitlement_catalogs.sql',
  '20260423100100_extend_subscription_plans.sql',
  '20260423100200_create_plan_scoped_tables.sql',
  '20260423100300_create_credit_tables.sql',
  '20260423100400_create_entitlement_cache.sql',
  '20260423100500_seed_starter_pro_premium_plans.sql',
  '20260423100600_backfill_wallets_and_trial_credits.sql',
  '20260423100700_stripe_hardening.sql',
  '20260423100800_extend_user_subscriptions.sql',
  '20260423100900_admin_overrides_and_enterprise.sql',
  '20260423101000_promo_audit_abuse.sql',
  '20260427000000_add_chat_performance_indexes.sql',
  '20260427000001_entitlement_shadow_log.sql',
  '20260427100000_tool_audit_log.sql',
  '20260427100001_sleep_logs.sql',
  '20260427100002_user_medications.sql',
  '20260428000000_reasoning_graph.sql',
  '20260428100000_tool_operations.sql',
  '20260428200000_expand_coach_personas.sql',
  '20260428300000_user_files.sql',
  '20260428400000_proactive_check_ins.sql',
  '20260430000000_intelligence-files.sql',
  '20260504000000_add_weekly_targets_to_milestones.sql',
  '20260504000001_add_checkout_session_id.sql',
  '20260505000000_ai_coach_no_pgvector_fallbacks.sql',
  '20260506000000_enable_free_onboarding_goal_generation.sql',
  '20260506001000_harden_workout_alarm_user_integrity.sql',
  '20260506002000_create_quick_notes.sql',
  '20260507000000_add_journal_rich_content.sql',
  '20260506030000_wiki.sql',
  '20260508000000_wiki_reconcile.sql',
  '20260508000000_add_plan_source_to_schedule_items.sql',
  '20260508100000_add_push_subscriptions.sql',
  '20260512000000_chat_calls.sql',
  '20260512001000_add_buddy_suggested_challenge.sql',
  '20260512002000_push_tokens_user_communication_preferences.sql',
  'add-accountability-indexes.sql',
  'add-achievement-constraints.sql',
  'add-buddy-challenge-and-competition-invitations.sql',
  'add-health-profile-visibility.sql',
  'add-goal-actions-user-goal-support.sql',
  // Activity-status awareness: adds user_plans.status_overrides,
  // user_coaching_profiles.status_patterns, and lifecycle fields/indexes on
  // activity_status_history. Idempotent (ADD COLUMN IF NOT EXISTS / DO guards).
  // Listed here because all expected tables exist on most envs, so the
  // missing-tables branch that auto-runs `add-*` files never fires.
  'add-status-awareness-fields.sql',
  '20260513_ai_coach_call_log.sql',
  'add-voice-schedule-prefs.sql',
  '20260513_intelligence_pending_signals.sql',
  '20260402120000_add-health-data-dedup-constraint.sql',
  '20260402130000_add-finance-module.sql',
  '20260507001000_bootstrap_required_data.sql',
  '20260518000000_conversation_claims.sql',
  '20260519000000_vector_embeddings_dedup_constraint.sql',
  '20260519100000_vector_embeddings_content_hash.sql',
  '20260519200000_voice_quality_metrics_and_transcripts.sql',
  '20260522000002_scoring_version_metadata.sql',
  'add-intelligence-session-updated-at.sql',
  // Response Optimization Layer (enums + message library + usage + candidates)
  '20260601000000_response_optimization.sql',
  // Structured health-safety facts backing the safety gate (F2)
  '20260604000002_user_health_safety.sql',
  // Observability: persist the LLM tool-call id on tool_audit_log for turn correlation
  '20260604000003_tool_audit_tool_call_id.sql',
  // Observability: per-LLM-call token/cost metrics table
  '20260604000004_ai_provider_metrics.sql',
  // Trigram extension for memory near-duplicate dedup (pg_trgm similarity)
  '20260604000005_pg_trgm_extension.sql',
  // Life Correlation Matrix (LCM): tables then base-correlation seed (order matters)
  '20260605000000_life_correlation_matrix.sql',
  '20260605000100_seed_lcm_base_v1.sql',
  // Social Growth OS — growth groups, reward economy, social loops, community health
  '20260605120000_social_growth_os.sql',
  '20260608000000_life_class_system.sql',
  '20260608130000_life_class_gameplay_v2.sql',
  '20260608120000_seed_premium_testimonials.sql',
  '20260608140000_subscription_plans_unique_name.sql',
  // Newsletter subscriber lifecycle: status, unsubscribe token, confirmed_at, ip, updated_at
  '20260610000000_newsletter_enhancements.sql',
  // WhatsApp Behavioral Intelligence Layer — Phase 0 (sessions, consent, chat
  // registry, automation rules, behavior baselines, event outbox, message audit)
  '20260612120000_whatsapp_intelligence_layer.sql',
  // WhatsApp coach-conversation continuity (user ↔ rag conversation for WA coach DM)
  '20260612130000_whatsapp_coach_conversations.sql',
  // WhatsApp automation approval queue (approval-first pending actions)
  '20260613000000_whatsapp_pending_actions.sql',
  // WhatsApp-detected commitments (advisory, from the deterministic intent detector)
  '20260613100000_whatsapp_commitments.sql',
  // Churn ML: training samples + trained logistic-regression weights
  '20260613000000_churn_training_samples.sql',
  '20260613001000_churn_model_weights.sql',
  // Trust ML: admin-blocked-labeled training samples + trained weights
  '20260613002000_trust_ml.sql',
  // Personal relationships: contacts + notes + interactions (reach-out reminders)
  '20260614000000_personal_relationships.sql',
  // ── Audit remediation (2026-06): previously-unwired SCHEMA migrations ──
  // Each was on disk but registered nowhere, so it never reached an up-to-date
  // production DB (the missing-tables branch is skipped there — only sync-missing-
  // columns + this list run). All are pure schema (CREATE TABLE/INDEX IF NOT EXISTS,
  // ADD COLUMN IF NOT EXISTS, DO-guarded) with NO data backfill, so they are safe to
  // re-execute on every deploy. The two DATA backfills from this window
  // (20260611000000_backfill_buddy_discovery_consent, and the grandfather UPDATE
  // inside 20260613000000_accountability_contact_acceptance) are intentionally
  // EXCLUDED — replaying them would change behaviour (auto-opt-in / auto-accept).
  '20260605000200_widen_user_goals_title.sql',
  '20260611001000_buddy_suggestion_instrumentation.sql',
  '20260611002000_content_reports.sql',
  '20260612000000_growth_group_parent_link.sql',
  '20260612001000_user_trust_signals.sql',
  '20260612002000_matching_weight_tuning.sql',
  '20260612003000_experiments.sql',
  '20260612004000_user_churn_risk.sql',
  '20260612005000_user_match_embeddings.sql',
  '20260616120000_intelligence_memories_embedding_index.sql',
  '20260618120000_whatsapp_mirror_messages.sql',
  '20260619000000_confidence_contact_interactions_index.sql',
  // Universal Double-Tap Reflection System (enum MUST precede the table that promotes into it)
  '20260621090000_add-reflection-memory-enum.sql',
  '20260621091000_create-reflection-details.sql',
  // Unified notification outbox (Phase 0) — additive, flag-gated
  '20260621100000_notification_outbox.sql',
  // AI Virtual Try-On (MVP) — additive, flag-gated
  '20260621120000_virtual_try_on_mvp.sql',
  // AI Virtual Try-On Wave 2 — favorites column + saved-looks index (additive, idempotent)
  '20260622120000_virtual_try_on_favorites.sql',
  // Career module (Slices 0+1) — goals, levels, tasks, progress events (additive, idempotent)
  '20260623000000_create_career_module.sql',
  // Career module extended (Slices 2-6) — profiles, applications, evidence, skills, interview, focus, prefs, badges
  '20260623010000_career_module_extended.sql',
  // Career AI feature catalog + plan gating (premium AI coaching features)
  '20260623020000_career_feature_seeds.sql',
  // Multi-domain "Life OS" onboarding: new goal_category values, user_goals
  // life_domain + nullable pillar, assessment_responses.goal_categories (additive)
  '20260625000000_multi_domain_goals.sql',
  // Onboarding telemetry: append-only analytics events (Part 6) + progressive
  // 20-dimension user profile (Part 3). Pure schema, idempotent, additive.
  '20260625100000_onboarding_analytics_events.sql',
  '20260625100100_onboarding_profiles.sql',
  // Two new "Life OS" domains: spirituality + creativity (goal_category enum values)
  '20260625120000_add_spirituality_creativity_domains.sql',
  // Align notification writers with notifications.metadata and allow the introspection achievement tree
  '20260630154500_fix_notifications_and_achievement_tree_contracts.sql',
  // Move schedule-related proactive reminders from the old 5-minute default to 10 minutes once.
  '20260630162000_schedule_reminder_10_minute_default.sql',
  // Repair reflection_details FK: tables created before cascade was added lack ON DELETE CASCADE
  '20260701000000_repair-reflection-details-cascade.sql',
  // Restore intelligence_memories -> users ON DELETE CASCADE FK (live drift orphaned
  // rows on user delete) + purge orphans + NOTICE-only drift check for sweep tables
  '20260702000000_restore_intelligence_memories_users_fk.sql',
  // Mental recovery: persist per-component provenance (component_has_data + component_source)
  // so direct table-readers surface honest source attribution instead of a bare baseline.
  '20260703000000_mental_recovery_component_provenance.sql',
  // Document Intelligence: documents.report_date (trends time axis) + xlsx/pptx/audio/video
  // source-kind enum values. Additive, idempotent, no backfill.
  '20260706000000_document_formats_and_report_date.sql',
  // Document Intelligence: 'markdown' source-kind value (.md / text-markdown uploads).
  // Additive, idempotent, no backfill.
  '20260707000000_add_markdown_source_kind.sql',
  // user_recipes: R2/signed URLs exceed VARCHAR(500)
  '20260707140000_user_recipes_url_text.sql',
  // Contract witnesses — peer verification of contract completion. CREATE TABLE
  // IF NOT EXISTS, mirrors tables/140-contract-witnesses.sql + ensureWitnessTables().
  '20260707120000_contract_witnesses.sql',
  // Root fix for the "reminder fires 5h late" tz drift: backfill users.timezone from
  // user_preferences.timezone + a trigger that keeps them joined. Makes ~15 services
  // that read users.timezone correct at the data layer. Idempotent.
  '20260707160000_sync_users_timezone_from_prefs.sql',
  // Resource Recommendation Engine — SIA resource concierge. CREATE TABLE IF NOT
  // EXISTS, mirrors tables/145-resource-recommendations.sql. Additive, idempotent.
  '20260708120000_resource_recommendations.sql',
];

async function runSupplementaryMigrations(): Promise<void> {
  for (const migrationFile of SUPPLEMENTARY_MIGRATIONS) {
    try {
      await runMigration(migrationFile);
      logger.info('Supplementary migration completed', { migrationFile });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
```

**Region E — `migrationTableMap` + partial-missing-table fallback matcher (lines ~1394–1436, CONTEXT ONLY, proves no map edit is needed — do not modify):**

```typescript
      const migrationTableMap: Record<string, string> = {
        'user_feature_state': '20260428000000_reasoning_graph.sql',
        'reasoning_edges': '20260428000000_reasoning_graph.sql',
        'lcm_base_correlations': '20260605000000_life_correlation_matrix.sql',
        'life_correlation_edges': '20260605000000_life_correlation_matrix.sql',
        'lcm_temporal_modifiers': '20260605000000_life_correlation_matrix.sql',
        'growth_groups': '20260605120000_social_growth_os.sql',
        'growth_group_members': '20260605120000_social_growth_os.sql',
        'group_formation_runs': '20260605120000_social_growth_os.sql',
        'user_reputation': '20260605120000_social_growth_os.sql',
        'reputation_score_history': '20260707000000_reputation_score_history.sql',
        'activity_feed': '20260605120000_social_growth_os.sql',
        'activity_feed_reactions': '20260605120000_social_growth_os.sql',
        'referrals': '20260605120000_social_growth_os.sql',
        'group_health_snapshots': '20260605120000_social_growth_os.sql',
        'life_class_definitions': '20260608000000_life_class_system.sql',
        'user_life_class_profiles': '20260608000000_life_class_system.sql',
        'user_life_class_snapshots': '20260608000000_life_class_system.sql',
        'life_class_timeline_events': '20260608000000_life_class_system.sql',
        'life_class_talents': '20260608130000_life_class_gameplay_v2.sql',
        'user_life_class_talent_activations': '20260608130000_life_class_gameplay_v2.sql',
        'life_class_quest_templates': '20260608130000_life_class_gameplay_v2.sql',
        'user_life_class_quests': '20260608130000_life_class_gameplay_v2.sql',
        'life_class_guilds': '20260608130000_life_class_gameplay_v2.sql',
        'life_class_guild_memberships': '20260608130000_life_class_gameplay_v2.sql',
        'intelligence_pending_signals': '20260513_intelligence_pending_signals.sql',
        'conversation_claims': '20260518000000_conversation_claims.sql',
        'message_templates': '20260601000000_response_optimization.sql',
        'message_template_usage': '20260601000000_response_optimization.sql',
        'response_template_candidates': '20260601000000_response_optimization.sql',
        'medical_disclaimers': '20260604000000_medical_disclaimers.sql',
        'crisis_followups': '20260604000001_crisis_followups.sql',
        'user_health_safety': '20260604000002_user_health_safety.sql',
        'ai_provider_metrics': '20260604000004_ai_provider_metrics.sql',
      };

      for (const table of missingTables) {
        // Look for a migration file that creates this table
        const migrationFile = migrationTableMap[table] || migrationFiles.find(f =>
          f.toLowerCase().includes(table.replace(/_/g, '-')) ||
          f.toLowerCase().includes(table)
        );

        if (migrationFile) {
          try {
            await runMigration(migrationFile);
            tablesCreated.push(table);
          } catch (error) {
            logger.error(`Failed to run migration for ${table}`, {
              error: (error as Error).message
            });
          }
        } else if (existsSync(tablesDir)) {
```

**[ELIDED: lines 1437–1756 — `tableToFileMap` dict (maps table names to legacy numbered `tables/*.sql` files), the table-file fallback creation branch, the `add-*` migration runner loop, `stillMissingTables` full-schema fallback, `verifySchema()`, `STARTUP_TABLE_MIGRATIONS`, `runColumnSync()`, and the `export default { autoMigrate, verifySchema, runColumnSync, EXPECTED_TABLES, EXPECTED_TYPES }` at the very end. Not touched by this packet.]**

---

### `src/database/tables/140-contract-witnesses.sql` (FULL — precedent/convention reference only, NOT modified, embedded so the registration pattern is unambiguous)

```sql
-- ============================================================================
-- Contract Witnesses — peer verification of contract completion
-- ============================================================================
-- A witness is a trusted accountability contact or mutual buddy who:
--   1. ACCEPTS the witness role (invitation handshake), and
--   2. At the contract's end_date, IF the contract did not end cleanly
--      (violation_count > 0), CONFIRMS or REJECTS that the owner completed it.
-- A single 'rejected' verdict forces the contract's configured penalty; ALL
-- accepted witnesses must confirm for a verified completion.
-- Flag-gated by ENABLE_WITNESS_VERIFICATION (default OFF). When OFF these
-- tables are unused and contracts behave exactly as before.

CREATE TABLE IF NOT EXISTS contract_witnesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES accountability_contracts(id) ON DELETE CASCADE,
  witness_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'invited',   -- invited, accepted, declined
  source VARCHAR(20) NOT NULL DEFAULT 'contact',   -- contact, buddy
  invited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  reminded_at TIMESTAMPTZ,
  UNIQUE(contract_id, witness_user_id),
  CHECK (status IN ('invited', 'accepted', 'declined')),
  CHECK (source IN ('contact', 'buddy'))
);

CREATE INDEX IF NOT EXISTS idx_contract_witnesses_contract
  ON contract_witnesses (contract_id);
-- The witness's own queue ("contracts awaiting my verdict") filters on this.
CREATE INDEX IF NOT EXISTS idx_contract_witnesses_witness
  ON contract_witnesses (witness_user_id, status);

CREATE TABLE IF NOT EXISTS contract_witness_verdicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES accountability_contracts(id) ON DELETE CASCADE,
  witness_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  verdict VARCHAR(20) NOT NULL,                    -- confirmed, rejected
  note TEXT,
  evidence JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(contract_id, witness_user_id),
  CHECK (verdict IN ('confirmed', 'rejected'))
);

CREATE INDEX IF NOT EXISTS idx_contract_witness_verdicts_contract
  ON contract_witness_verdicts (contract_id);

COMMENT ON TABLE contract_witnesses IS 'Peer witnesses invited to verify a contracts completion (ENABLE_WITNESS_VERIFICATION)';
COMMENT ON TABLE contract_witness_verdicts IS 'Per-witness confirm/reject verdict on whether the owner completed a contract';
```

`contract_witnesses` is the cleanest precedent for "register a brand-new table with no legacy baggage": it was (1) added as a numbered file in `tables/` and listed explicitly in `setup.ts` `TABLE_FILES`, (2) added to `EXPECTED_TABLES` in `auto-migrate.ts`, and (3) given a same-DDL timestamped migration listed in `SUPPLEMENTARY_MIGRATIONS` — **and nothing was added to `migrationTableMap` or `tableToFileMap`.** That's because `SUPPLEMENTARY_MIGRATIONS` runs unconditionally on every `db:migrate:auto` invocation (via `runColumnSyncAndSupplementary()`, called on all three code paths: up-to-date, full-schema, and partial-missing-tables), so the table gets created regardless of what the missing-table branch's lookup maps do. This packet follows the identical pattern for `user_sessions`.

---

## Contract (exact file contents + exact edits — nothing left to infer)

### Resolution note (plan §4 vs. amendment A5 — read this before writing the DDL)

Plan §4's DDL (reproduced in the batch's architecture-plan.md) does **not** include a `rotated_at` column. But amendment **A5** (accepted, binding, overrides §4 per the task instructions) specifies `rotateSession`'s atomic compare-and-swap as:

```sql
UPDATE user_sessions
SET refresh_token_hash = $new, last_used_at = now(), rotated_at = now()
WHERE id = $sid AND refresh_token_hash = $old AND revoked_at IS NULL
RETURNING id
```

That statement references `rotated_at`, a column plan §4's DDL never defines. If SP1 ships the DDL exactly as written in §4, the SP3 session-service packet's rotation UPDATE (built later, against this table) will fail at runtime with `column "rotated_at" does not exist`. Per the task's explicit override rule ("AMENDMENTS OVERRIDE §4/§7 WHERE THEY CONFLICT") and the instruction to resolve plan/amendment mismatches, **this packet adds `rotated_at TIMESTAMPTZ` (nullable — NULL until the first rotation) to the DDL**, positioned after `last_used_at`. This does not add a 4th index (the task's binding instruction is explicit — "three indexes" — and no query pattern in the plan needs `rotated_at` indexed); it is a plain nullable timestamp column that A5's rotation packet (SP3) will write to. Everything else in the DDL is verbatim plan §4 (TIMESTAMPTZ throughout, three indexes, no `updated_at` trigger).

### File 1 (CREATE): `src/database/tables/146-user-sessions.sql`

```sql
-- ============================================
-- USER SESSIONS TABLE  (per-device refresh tokens)
-- ============================================
-- One row per active device session. Stores the sha256 hash of the current
-- refresh token (never the raw token). Rotation-on-use updates the hash in
-- place (no history table); reuse of a superseded token revokes the whole
-- session. BIOS-003 auth hardening (architecture-plan.md ADR-1/ADR-2/ADR-3,
-- amendment A5). No updated_at trigger — do NOT register this table in
-- 99-triggers.sql; last_used_at/rotated_at are maintained explicitly by the
-- session-rotation code path (session.service.ts, a later BIOS-003 packet).

CREATE TABLE IF NOT EXISTS user_sessions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,               -- sha256(refresh JWT)
    device_id          TEXT,                          -- client-generated stable per-install id
    device_name        TEXT,                          -- best-effort label (e.g. "iOS 18 · balencia")
    client_type        VARCHAR(16) NOT NULL DEFAULT 'mobile', -- 'mobile' | 'web'
    user_agent         TEXT,
    ip_address         INET,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    rotated_at         TIMESTAMPTZ,                     -- set on each successful rotation (amendment A5 atomic CAS); NULL until first rotation
    expires_at         TIMESTAMPTZ NOT NULL,          -- = created/rotated + JWT_REFRESH_EXPIRES_IN
    revoked_at         TIMESTAMPTZ                     -- non-null = revoked (logout or reuse-detected)
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id     ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active      ON user_sessions(user_id, revoked_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at  ON user_sessions(expires_at);
```

`uuid_generate_v4()` matches the existing convention (`users.id` in `02-users.sql` uses the same function, backed by the `uuid-ossp` extension created in `00-extensions.sql`, which loads first in `TABLE_FILES`) — do not switch to `gen_random_uuid()` even though `140-contract-witnesses.sql` uses it; match `users.id`'s own convention since this table FKs directly to `users`.

### File 2 (CREATE): `src/database/migrations/20260709021904_create_user_sessions.sql`

Byte-for-byte identical DDL to File 1 (the migration must be independently idempotent — `runMigration()` reads it standalone, it does not include File 1):

```sql
-- ============================================
-- USER SESSIONS TABLE  (per-device refresh tokens)
-- ============================================
-- One row per active device session. Stores the sha256 hash of the current
-- refresh token (never the raw token). Rotation-on-use updates the hash in
-- place (no history table); reuse of a superseded token revokes the whole
-- session. BIOS-003 auth hardening (architecture-plan.md ADR-1/ADR-2/ADR-3,
-- amendment A5). No updated_at trigger — do NOT register this table in
-- 99-triggers.sql; last_used_at/rotated_at are maintained explicitly by the
-- session-rotation code path (session.service.ts, a later BIOS-003 packet).
--
-- Existing-DB migration counterpart of tables/146-user-sessions.sql (same DDL,
-- discovered/run by `npm run db:migrate:auto` via SUPPLEMENTARY_MIGRATIONS).

CREATE TABLE IF NOT EXISTS user_sessions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,               -- sha256(refresh JWT)
    device_id          TEXT,                          -- client-generated stable per-install id
    device_name        TEXT,                          -- best-effort label (e.g. "iOS 18 · balencia")
    client_type        VARCHAR(16) NOT NULL DEFAULT 'mobile', -- 'mobile' | 'web'
    user_agent         TEXT,
    ip_address         INET,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    rotated_at         TIMESTAMPTZ,                     -- set on each successful rotation (amendment A5 atomic CAS); NULL until first rotation
    expires_at         TIMESTAMPTZ NOT NULL,          -- = created/rotated + JWT_REFRESH_EXPIRES_IN
    revoked_at         TIMESTAMPTZ                     -- non-null = revoked (logout or reuse-detected)
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id     ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active      ON user_sessions(user_id, revoked_at) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at  ON user_sessions(expires_at);
```

The timestamp prefix `20260709021904` was generated live via `date +%Y%m%d%H%M%S` at packet composition time (2026-07-09) — do not regenerate or alter it; use this exact filename so it matches the `SUPPLEMENTARY_MIGRATIONS` entry in File 4 below verbatim.

### File 3 (MODIFY): `src/database/setup.ts` — exact edit

Find this exact block (the tail of `TABLE_FILES`, immediately before its closing `];`):

```typescript
  // Resource Recommendation Engine (SIA resource concierge). Depends on users;
  // loads before 99-triggers. Flag-gated by ENABLE_RESOURCE_RECOMMENDATIONS.
  '145-resource-recommendations.sql',
  // Triggers (must be last)
  '99-triggers.sql',
];
```

Replace it with:

```typescript
  // Resource Recommendation Engine (SIA resource concierge). Depends on users;
  // loads before 99-triggers. Flag-gated by ENABLE_RESOURCE_RECOMMENDATIONS.
  '145-resource-recommendations.sql',
  // Per-device refresh-token sessions (BIOS-003 auth hardening: rotation,
  // reuse detection, revocation, session caps). Depends on users; loads
  // before 99-triggers.sql. No updated_at trigger — last_used_at/rotated_at
  // are maintained explicitly by the session-rotation code path.
  '146-user-sessions.sql',
  // Triggers (must be last)
  '99-triggers.sql',
];
```

(One line added — `'146-user-sessions.sql',` plus its 3-line comment — immediately after the `145-resource-recommendations.sql` entry and before the `99-triggers.sql` trigger-file entry. Nothing else in `TABLE_FILES` changes.)

### File 4 (MODIFY): `src/database/auto-migrate.ts` — exact edits (two separate insertions in the same file)

**Edit 4a — `EXPECTED_TABLES` tail.** Find this exact block (immediately before `EXPECTED_TABLES`'s closing `];`):

```typescript
  // Resource Recommendation Engine (SIA resource concierge)
  'resource_recommendation_bundles',
  'resource_interactions',
  'resource_preferences',
];
```

Replace it with:

```typescript
  // Resource Recommendation Engine (SIA resource concierge)
  'resource_recommendation_bundles',
  'resource_interactions',
  'resource_preferences',
  // Per-device refresh-token sessions (BIOS-003 auth hardening)
  'user_sessions',
];
```

**Edit 4b — `SUPPLEMENTARY_MIGRATIONS` tail.** Find this exact block (immediately before `SUPPLEMENTARY_MIGRATIONS`'s closing `];`):

```typescript
  // Resource Recommendation Engine — SIA resource concierge. CREATE TABLE IF NOT
  // EXISTS, mirrors tables/145-resource-recommendations.sql. Additive, idempotent.
  '20260708120000_resource_recommendations.sql',
];
```

Replace it with:

```typescript
  // Resource Recommendation Engine — SIA resource concierge. CREATE TABLE IF NOT
  // EXISTS, mirrors tables/145-resource-recommendations.sql. Additive, idempotent.
  '20260708120000_resource_recommendations.sql',
  // Per-device user sessions (BIOS-003 auth hardening): refresh-token rotation,
  // reuse detection, revocation, session caps. CREATE TABLE IF NOT EXISTS,
  // mirrors tables/146-user-sessions.sql. Additive, idempotent, no backfill.
  '20260709021904_create_user_sessions.sql',
];
```

**Do NOT edit `migrationTableMap` (~line 1394) or `tableToFileMap` (~line 1453).** Reasoning (see Region E above and the `contract_witnesses` precedent): `SUPPLEMENTARY_MIGRATIONS` runs unconditionally on every `autoMigrate()` call via `runColumnSyncAndSupplementary()`, regardless of which of the three top-level branches (up-to-date / full-schema / partial-missing) executes — so the table is created either way. Additionally, even in the partial-missing-tables branch's per-table lookup, the generic fallback `migrationFiles.find(f => f.toLowerCase().includes(table.replace(/_/g,'-')) || f.toLowerCase().includes(table))` already matches: for `table = 'user_sessions'`, the migration filename `20260709021904_create_user_sessions.sql` contains the literal substring `user_sessions`, so it resolves without a map entry — exactly like `contract_witnesses` and `resource_recommendation_bundles` needed no map entry.

---

## Acceptance criteria (mechanically checkable)

1. **Files exist:**
   - `test -f src/database/tables/146-user-sessions.sql`
   - `test -f src/database/migrations/20260709021904_create_user_sessions.sql`
   - Both files contain byte-identical DDL (the `CREATE TABLE`/`CREATE INDEX` block above), differing only in header comments.

2. **Registration greps (run from `yhealth-app/server/`):**
   - `grep -c "146-user-sessions.sql" src/database/setup.ts` → `1`
   - `grep -c "'user_sessions'" src/database/auto-migrate.ts` → `1` (only the `EXPECTED_TABLES` entry; the table name also appears inside the new migration's *filename*, not as a quoted table-name literal, so this count stays 1)
   - `grep -c "20260709021904_create_user_sessions.sql" src/database/auto-migrate.ts` → `1`
   - `grep -c "rotated_at" src/database/tables/146-user-sessions.sql` → `1`
   - No changes to `src/database/tables/99-triggers.sql` (`git diff --stat src/database/tables/99-triggers.sql` → empty)
   - No changes to `package.json` (`git diff --stat package.json` → empty)

3. **Fresh DB — `npm run db:setup`:** Against a clean/empty Postgres database, the script completes with exit code 0 and its own summary log lists `user_sessions` among the created tables. Confirm structure: `psql "$DATABASE_URL" -c "\d user_sessions"` shows all 12 columns (`id, user_id, refresh_token_hash, device_id, device_name, client_type, user_agent, ip_address, created_at, last_used_at, rotated_at, expires_at, revoked_at` — 13 columns) and 3 indexes (`idx_user_sessions_user_id`, `idx_user_sessions_active`, `idx_user_sessions_expires_at`) plus the primary key index.

4. **Existing DB — `npm run db:migrate:auto`:** Against a database that already has every other table from `EXPECTED_TABLES` but not yet `user_sessions` (simulating this packet landing on a previously-deployed environment), the script completes with exit code 0. Since only one table is newly missing (`missingTables.length` ≪ `EXPECTED_TABLES.length / 2`), it takes the partial-missing-tables branch, and/or picks it up unconditionally via `runSupplementaryMigrations()`. Either path is acceptable — both must in fact create the table (test by running against a DB that has *only* the supplementary-migrations path available, i.e. mock/skip the partial-missing branch, to prove the unconditional path alone is sufficient — this is the "belt and suspenders" the plan requires).

5. **`\dt` verification (hard gate per plan §4 / R2 — the `139-life-area-checkins.sql` gap class):** After both 3 and 4, `psql "$DATABASE_URL" -c "\dt user_sessions"` must list the table. If it does not appear after `db:migrate:auto`, this is a repeat of the known auto-migration gap — do not close the packet; apply the SQL directly via `psql -f src/database/migrations/20260709021904_create_user_sessions.sql` and record the discrepancy in the packet's evidence output (per the R2 mitigation and the `139-*` precedent).

6. **Idempotent re-run:** Running `npm run db:migrate:auto` a second time (table now exists) exits 0 with no errors surfaced (all statements are `IF NOT EXISTS`; any `already exists` condition is swallowed by `runMigration()`'s error-code handling, verified in Region C above).

7. **`npm run db:migrate:verify`:** After step 3 or 4, this command exits 0 and reports no missing tables (its `verifySchema()` reads `EXPECTED_TABLES`, which now includes `user_sessions`).

8. **No unrelated diff:** `git diff --stat` for this packet touches exactly 2 modified files (`setup.ts`, `auto-migrate.ts`) and creates exactly 2 new files (the table file and the migration file). No other file in the repo changes.

---

## Out of scope

- Any TypeScript logic: `session.service.ts` (`createSession`, `rotateSession`, `revokeSession`, `revokeAllForUser`, `findActiveSession`, `evictOldestIfOverCap`) is **SP3**, not this packet.
- `sid`/`sessionId` threading into `generateTokens` / `IJwtPayload` (**SP4**).
- Any controller wiring — login/register/social/refresh/logout (**SP5–SP8**).
- `jose` dependency, Apple/Google verification (**SP2**).
- Unit/integration tests for the session table's runtime behavior (**SP9/SP10** — this packet has no runtime behavior to test beyond DDL application, covered by the acceptance criteria above).
- Editing `migrationTableMap` or `tableToFileMap` in `auto-migrate.ts` — explicitly not needed (see Contract §Edit 4b reasoning) and must not be touched.
- Editing `src/database/tables/99-triggers.sql` — this table intentionally has no `updated_at` trigger.
- Any production deploy or execution against a real/shared database — per the batch's standing scope, this is tested + committed locally only, no prod deploy this batch.
- Column-drop of `users.refresh_token` — explicitly deferred to a future batch per ADR-3/amendment A4; this packet does not touch the `users` table at all.
