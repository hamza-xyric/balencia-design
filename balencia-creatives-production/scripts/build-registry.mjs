#!/usr/bin/env node
/**
 * Regenerates registry/opportunities.json from screens.ts + creative-opportunities matrix.
 * Preserves production tracking fields (`status`, `brief_path`, `notes`) from the existing registry.
 * Run: node scripts/build-registry.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const screensPath = join(root, '../balencia-screens/src/data/screens.ts')
const registryPath = join(root, 'registry/opportunities.json')

const priorityById = {
  '01': 'P0', '02': 'P0', '03': 'P3', '03b': 'P3', '03c': 'P3', '03d': 'P3', '03e': 'P2',
  '04': 'P3', '05': 'P2', '05b': 'P3', '06': 'P1', '07': 'P0', '08': 'P1', '09': 'P1',
  '10': 'P1', '11': 'P0', '12': 'P2', '13': 'P2', '14': 'P2', '15': 'P1', '16': 'P1',
  '17': 'P1', '18': 'P1', '19': 'P1', '20': 'P1', '21': 'P3', '22': 'P2', '23': 'P1',
  '24': 'P2', '25': 'P2', '26': 'P1', '27': 'P1', '28': 'P1', '29': 'P1', '30': 'P1',
  '31': 'P1', '32': 'P2', '33': 'P1', '34': 'P1', '35': 'P1', '36': 'P1', '37': 'P2',
  '38': 'P2', '39': 'P1', '40': 'P1', '41': 'P2', '42': 'P0', '43': 'P1', '44': 'P2',
  '45': 'P2', '46': 'P1', '47': 'P1', '48': 'P1', '49': 'P0', '50': 'P3', '51': 'P2',
  '52': 'P2', '53': 'P1', '54': 'P1', '55': 'P0', '56': 'P0', '57': 'P2', '58': 'P2',
  '59': 'P1', '60': 'P2', '61': 'P2', '62': 'P2', '63': 'P2', '64': 'P3', '65': 'P2',
  '66': 'P2', '67': 'P0', '68': 'P2', '69': 'P3', '70': 'P0', '71': 'P1', '72': 'P0',
  '73': 'P1', '74': 'P1', '75': 'P1', '76': 'P1', '77': 'P1', '78': 'P1', '79': 'P1',
  '80': 'P0', '81': 'P0', '82': 'P1', '83': 'P1', '84': 'P1', '85': 'P2',
}

const placementById = {
  '01': 'Symbol reveal, continuous stroke, brand glow.',
  '02': 'Motion-graphic panels, not a pre-recorded video.',
  '03': 'Official OAuth marks only.',
  '03b': 'None beyond input/state polish.',
  '03c': 'Legal/status icons only.',
  '03d': 'Tiny SIA/trust marker only if needed.',
  '03e': 'WhatsApp mark, channel-benefit mini illustration.',
  '04': 'Official OAuth marks only.',
  '05': 'Optional small email/security illustration.',
  '05b': 'Minimal security iconography.',
  '06': 'Lightweight preview/demo visual and sample app data.',
  '07': 'Animated domain brainstorming canvas.',
  '08': 'Plan reveal motion and mission card polish.',
  '09': 'SIA avatar, rich card charts/media thumbnails.',
  '10': 'Reactive waveform and mic-state visuals.',
  '11': '3D or premium 2D SIA avatar.',
  '12': 'Subtle insight/data visual, no big hero image.',
  '13': 'Mission badges and status visuals.',
  '14': 'Mission identity/progress hero.',
  '15': 'SIA planning/generation state visuals.',
  '16': 'Life-area wheel/radar or domain constellation.',
  '17': 'Avatar/character glimpse and profile visual.',
  '18': 'Module thumbnails/icons per domain.',
  '19': 'Character/avatar art and reward visuals.',
  '20': 'Memory map, node visuals, source cards.',
  '21': 'Icons only.',
  '22': 'Provider logos and status visuals.',
  '23': 'Premium feature preview, plan comparison visuals, restore/trial/error states.',
  '24': 'Category icons and empty state.',
  '25': 'SIA support illustration/topic icons.',
  '26': 'Workout thumbnail, recovery visual, exercise cue.',
  '27': 'Exercise form visual/video poster and active-state visuals.',
  '28': 'Meal thumbnails, macro visuals, water states.',
  '29': 'Meal photo, barcode/photo scan states.',
  '30': 'Money-map visualization and category visuals.',
  '31': 'Receipt photo and category visuals.',
  '32': 'Career-path visual and project icons.',
  '33': 'Real/profile avatars, relationship state visuals.',
  '34': 'Respectful belief-adaptive motifs, configured/unconfigured states, source/status visuals.',
  '35': 'Book/course cover art and study progress visuals.',
  '36': 'Portfolio/project thumbnails and prompt artwork.',
  '37': 'Empty writing illustration and attachment thumbnails.',
  '38': 'Habit icons, streak visuals, empty state.',
  '39': 'Friends/private-first avatars, podium/badge visuals, no global-rank emphasis.',
  '40': 'Friends/private-first room avatars and community cover chips.',
  '41': 'Empty-day illustration and sync/provider marks.',
  '42': 'Badge artwork, XP burst, share-card visual.',
  '43': 'Blurred premium preview from real product surfaces.',
  '44': 'Water fill/ring animation and goal celebration.',
  '45': 'Mood visual system and check-in states.',
  '46': 'Partner avatars, proof thumbnails, commitment visuals.',
  '47': 'Challenge badges/covers, locked previews, self-only/private challenge visuals.',
  '48': 'Correlation/forecast visual system.',
  '49': 'Actual photo thumbnails, compare, privacy states.',
  '50': 'Avatar/photo picker only.',
  '51': 'Waveform thumbnails and call status visuals.',
  '52': 'Stress/recovery visualizer.',
  '53': 'Animated breathing visual.',
  '54': 'Session artwork, ambient active state.',
  '55': 'Pose illustrations or video thumbnails.',
  '56': 'Recipe photos and fallback food illustrations.',
  '57': 'Ingredient/source thumbnails, sparingly.',
  '58': 'Sleep-stage chart and calm ambient motif.',
  '59': 'Flame/trophy/reward visuals.',
  '60': 'Medication icon set and safety states.',
  '61': 'Source icons and empty state.',
  '62': 'Empty-note illustration and attachment icons.',
  '63': 'Energy scale and trend visual.',
  '64': 'Neutral safety icon only.',
  '65': 'App icon/update illustration.',
  '66': 'Bell/benefit illustration and prompt states.',
  '67': 'Actual media viewer with zoom/pan/gallery.',
  '68': 'Category icons and no-results state.',
  '69': 'Star micro-interactions and non-coercive prompt-state variants only.',
  '70': 'Exercise thumbnails/form illustrations/video posters.',
  '71': 'Earned, near-next, progress, and motivation-adaptive hidden/locked badge variants.',
  '72': 'Guided interactive insight-map with explainable relationship visuals.',
  '73': 'Mission photo memories and journal thumbnails.',
  '74': 'Contact avatars and thread media previews.',
  '75': 'Contact avatar and shared-media thumbnails.',
  '76': 'Group avatars and mission/media cards.',
  '77': 'Protected media preview and reaction visuals.',
  '78': 'Report preview thumbnails and data-review visuals.',
  '79': 'Waveform, transcript highlight, action conversion visuals.',
  '80': 'Album/playlist artwork and player visual states.',
  '81': 'Video thumbnails/posters and player states.',
  '82': 'Signature/proof/partner permission visuals.',
  '83': 'Profile avatar, shared mission visuals, privacy-state artwork.',
  '84': 'Provider logos, source-health, demo/no-live-sync, and connection-placeholder visuals.',
  '85': 'Coaching/obstacle illustration and recovery-state visuals.',
}

const productionBatchById = {
  '01': 'CP-01', '02': 'CP-01', '07': 'CP-01',
  '09': 'CP-02', '10': 'CP-02', '11': 'CP-02',
  '49': 'CP-03', '67': 'CP-03', '80': 'CP-03', '81': 'CP-03',
  '55': 'CP-04', '56': 'CP-04', '70': 'CP-04',
  '42': 'CP-05', '59': 'CP-05', '71': 'CP-05',
  '72': 'CP-06',
  '03': 'CP-09', '04': 'CP-09', '03e': 'CP-09', '22': 'CP-09', '84': 'CP-09',
  '03b': 'CP-10', '03c': 'CP-10', '03d': 'CP-10', '05b': 'CP-10', '21': 'CP-10',
  '50': 'CP-10', '64': 'CP-10', '69': 'CP-10',
}

function packageFor(id, priority) {
  if (['03', '04', '03e', '22', '84'].includes(id)) return 'provider-logo'
  if (['01', '02', '07', '08'].includes(id)) return 'onboarding-motion'
  if (['09', '10', '11', '25', '79', '51'].includes(id)) return 'sia-identity'
  if (['49', '67', '80', '81', '29'].includes(id)) return 'media-content'
  if (['42', '59', '71', '39', '13', '14', '38'].includes(id)) return 'gamification'
  if (['55', '56', '70', '72', '26', '27', '28', '30', '31', '32', '33', '34', '35', '36'].includes(id)) return 'domain-content'
  if (priority === 'P2' || priority === 'P3') return 'empty-system'
  if (['06', '16', '17', '18', '19', '20', '23', '43', '48', '74', '75', '76', '77', '78', '82', '83', '73', '15', '46', '47', '40', '53', '54'].includes(id)) {
    if (['06', '08', '16', '17', '18', '19', '20', '23', '43'].includes(id)) return 'onboarding-motion'
    if (['74', '75', '76', '77', '79'].includes(id)) return 'sia-identity'
    return 'domain-content'
  }
  return 'empty-system'
}

function assetTypesFor(id, pkg) {
  const map = {
    'onboarding-motion': ['motion-still', 'motion-loop'],
    'sia-identity': ['avatar', 'illustration'],
    'domain-content': ['thumbnail', 'photo', 'illustration'],
    'media-content': ['thumbnail', 'video-poster', 'photo'],
    'gamification': ['badge', 'illustration'],
    'empty-system': ['illustration', 'icon-set'],
    'provider-logo': ['official-mark'],
  }
  if (id === '11') return ['avatar', 'motion-still']
  if (id === '02') return ['motion-loop', 'motion-still']
  if (id === '72') return ['illustration', 'motion-still', 'insight-map']
  return map[pkg] ?? ['illustration']
}

function productionBatch(id, priority) {
  if (productionBatchById[id]) return productionBatchById[id]
  if (priority === 'P3') return 'CP-10'
  if (priority === 'P2') return 'CP-08'
  if (priority === 'P1') return 'CP-07'
  return 'CP-08'
}

function higgsfieldAllowed(pkg, priority) {
  if (pkg === 'provider-logo') return false
  if (priority === 'P3') return false
  return true
}

/** Resolved product rules affecting briefs (see registry/product-decisions.json). */
function constraintsFor(id) {
  const c = []
  if (id === '06') c.push('guest_preview_lightweight', 'no_full_demo_shell_montage')
  if (id === '49' || id === '67') {
    c.push('progress_photos_private', 'no_progress_photo_share_v1', 'secure_thumbnails', 'analysis_provenance_states')
  }
  if (id === '72') c.push('guided_insight_map', 'no_raw_force_graph_hero')
  if (id === '39' || id === '40') c.push('friends_private_first', 'no_global_ranking_visuals')
  if (id === '47') c.push('friends_private_first', 'self_only_private_challenge_modes', 'locked_preview_states')
  if (id === '46' || id === '82') c.push('friends_private_first', 'opt_in_proof_only')
  if (id === '71') c.push('motivation_adaptive_badges', 'hide_most_locked_badges')
  if (id === '78') c.push('in_app_reports_only', 'no_pdf_export_visuals')
  if (id === '80' || id === '81') c.push('demo_recommendations_ok', 'no_implied_live_sync')
  if (id === '84') c.push('demo_no_live_sync_placeholder')
  if (id === '34') c.push('belief_adaptive', 'configured_and_unconfigured_states')
  if (id === '11') c.push('sia_avatar_3d_first', '2d_fallback_states')
  return c
}

const src = readFileSync(screensPath, 'utf8')
let previousByScreenId = new Map()
try {
  const previous = JSON.parse(readFileSync(registryPath, 'utf8'))
  previousByScreenId = new Map((previous.opportunities ?? []).map((o) => [o.screen_id, o]))
} catch {
  previousByScreenId = new Map()
}

const screenRe = /\{\s*id:\s*'([^']+)',\s*number:\s*'[^']+',\s*name:\s*'([^']+)',\s*route:\s*'([^']+)'/g
const screens = []
let m
while ((m = screenRe.exec(src)) !== null) {
  screens.push({ id: m[1], name: m[2], route: m[3] })
}

const opportunities = screens.map((s) => {
  const priority = priorityById[s.id] ?? 'P2'
  const pkg = packageFor(s.id, priority)
  const batch = productionBatch(s.id, priority)
  const previous = previousByScreenId.get(s.id) ?? {}
  return {
    id: `CRE-${s.id.replace(/[^a-zA-Z0-9]/g, '')}`,
    screen_id: s.id,
    screen_name: s.name,
    route: s.route,
    priority,
    package: pkg,
    asset_types: assetTypesFor(s.id, pkg),
    placement: placementById[s.id] ?? '',
    production_batch: batch,
    higgsfield_allowed: higgsfieldAllowed(pkg, priority),
    constraints: constraintsFor(s.id),
    status: previous.status ?? 'not_started',
    brief_path: previous.brief_path ?? null,
    notes: previous.notes ?? 'From creative-opportunities.md screen matrix',
  }
})

const out = {
  version: 2,
  generated_at: new Date().toISOString().slice(0, 10),
  source: '../balencia-screens-reviewed/findings/creative-opportunities.md',
  product_decisions: '../registry/product-decisions.json',
  count: opportunities.length,
  opportunities,
}

writeFileSync(registryPath, JSON.stringify(out, null, 2) + '\n')
console.log(`Wrote ${opportunities.length} opportunities to registry/opportunities.json`)
