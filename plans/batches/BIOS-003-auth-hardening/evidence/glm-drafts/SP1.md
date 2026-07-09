=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/tables/146-user-sessions.sql ===
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/migrations/20260709021904_create_user_sessions.sql ===
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/setup.ts ===
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
  // Per-device refresh-token sessions (BIOS-003 auth hardening: rotation,
  // reuse detection, revocation, session caps). Depends on users; loads
  // before 99-triggers.sql. No updated_at trigger — last_used_at/rotated_at
  // are maintained explicitly by the session-rotation code path.
  '146-user-sessions.sql',
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
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/server/src/database/auto-migrate.ts ===
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
  // Per-device refresh-token sessions (BIOS-003 auth hardening)
  'user_sessions',
];

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
  // Per-device user sessions (BIOS-003 auth hardening): refresh-token rotation,
  // reuse detection, revocation, session caps. CREATE TABLE IF NOT EXISTS,
  // mirrors tables/146-user-sessions.sql. Additive, idempotent, no backfill.
  '20260709021904_create_user_sessions.sql',
];

async function runSupplementaryMigrations(): Promise<void> {
  for (const migrationFile of SUPPLEMENTARY_MIGRATIONS) {
    try {
      await runMigration(migrationFile);
      logger.info('Supplementary migration completed', { migrationFile });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      // Proceed regardless of errors on a single migration file
    }
  }
}
