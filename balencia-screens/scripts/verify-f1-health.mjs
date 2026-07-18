import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const repo = path.resolve(root, '..')
const [baseURL, outArg, shotsArg] = process.argv.slice(2)
if (!baseURL || !outArg || !shotsArg) {
  console.error('Usage: node scripts/verify-f1-health.mjs <baseURL> <out-json> <shots-dir>')
  process.exit(2)
}
if (new URL(baseURL).port !== '3002') throw new Error('F1 acceptance requires fresh production port 3002')
const outPath = path.resolve(root, outArg)
const shotsDir = path.resolve(root, shotsArg)
const candidateDir = `${shotsDir}.candidate`

const states = {
  26: ['default','low-confidence','empty','error','offline','data-controls','success','disabled','asset'],
  27: ['active','input-edit','paused','stopped','summary','sensor-null','offline','data-controls','safety'],
  28: ['default','data-controls','water-success','water-disabled','empty','offline','error','tab-empty','allergy'],
  29: ['detail','logger','scanner-unavailable','tab-change','success','offline','empty','media-consent','error'],
  49: ['default-demo','personal-consented','empty-unconsented','low-confidence','privacy-revoked','delete-confirm','error-upload','offline','privacy-controls'],
  52: ['default','empty','low-confidence','error-whoop','offline','log-success','log-disabled','safety-open','privacy-controls'],
  53: ['default','empty','library-error','active-inhale','active-hold-paused','session-success','rating-error','duration-locked','risky-technique-gate','offline'],
  54: ['default-real','low-confidence','honest-null','filter-quick','active-session','paused','post-disabled','post-success','error-retry','offline','data-controls','premium-preview'],
  55: ['default-real','low-confidence','honest-null','filter-advanced','session-active','session-paused','pose-fallback','summary-disabled','summary-success','section-error','data-controls','premium-preview'],
  56: ['default-parent','search-results','no-match','allergy-conflict','recipe-detail','favorite-toggle','create-empty','create-validation','create-success','offline-disabled','error-retry','data-controls','premium-disposition'],
}
const cases = Object.entries(states).flatMap(([id, values]) => values.map(state => ({ id, state, name: `${id}-${state}` })))
const textCases = Object.keys(states).map(id => ({ id, state: states[id][0], name: `${id}-text-scale-proof`, textScale: 1.25 }))
if (cases.length !== 101 || textCases.length !== 10) throw new Error('Frozen F1 case count drift')

const productFiles = ['S26FitnessDashboard.tsx','S27WorkoutDetail.tsx','S28NutritionDashboard.tsx','S29MealDetail.tsx','S49ProgressPhotos.tsx','S52StressManagement.tsx','S53BreathingExercises.tsx','S54Meditation.tsx','S55YogaSessions.tsx','S56Recipes.tsx']
  .map(file => `src/components/hifi/screens/health/${file}`)
const apiFiles = ['package.json','package-lock.json','next.config.ts','src/app/screens/[id]/page.tsx','src/components/hifi/HifiPrototype.tsx','src/components/hifi/screens/registry.ts','scripts/verify-f1-health.mjs']
const sentinelPath = path.join(repo, 'plans/batches/VISUAL-011-F1-health-fitness-nutrition/evidence/ACCEPTED-E1-SENTINELS-BEFORE.sha256')

function sha(value) { return crypto.createHash('sha256').update(value).digest('hex') }
function fingerprint(files, base = root) {
  const rows = files.map(file => ({ path: file, sha256: sha(fs.readFileSync(path.resolve(base, file))) }))
  return { digest: sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n'))), files: rows }
}
function parseSentinels() {
  const rows = fs.readFileSync(sentinelPath, 'utf8').trim().split('\n').map(line => {
    const match = line.match(/^([a-f0-9]{64})  (.+)$/)
    if (!match) throw new Error(`Malformed sentinel row: ${line}`)
    return { sha256: match[1], path: match[2] }
  })
  if (rows.length !== 61 || new Set(rows.map(row => row.path)).size !== 61) throw new Error('Accepted sentinel set must contain 61 unique files')
  for (const row of rows) if (sha(fs.readFileSync(path.resolve(repo, row.path))) !== row.sha256) throw new Error(`Accepted sentinel drift: ${row.path}`)
  return { digest: sha(Buffer.from(rows.map(row => `${row.sha256}  ${row.path}`).join('\n'))), files: rows }
}

const result = { auditedAt: new Date().toISOString(), baseURL, phoneFrame: { width: 390, height: 844 }, expectedContexts: 111, expectedScreenshots: 101, checks: [], cases: [], screenshots: [], consoleErrors: [], pageErrors: [], capabilityEvents: [], status: 'fail' }
function check(ok, label, evidence = null) { result.checks.push({ label, ok, evidence }); if (!ok) throw new Error(label) }

async function addGuards(context) {
  await context.addInitScript(({ origin }) => {
    const events = []
    Object.defineProperty(window, '__f1CapabilityEvents', { value: events })
    const record = (type, detail = '') => events.push({ type, detail: String(detail) })
    const blocked = type => (...args) => { record(type, args[0]); return Promise.reject(new Error(`${type} blocked by F1 verifier`)) }
    const nativeFetch = window.fetch.bind(window)
    window.fetch = (...args) => { const target = new URL(args[0] instanceof Request ? args[0].url : String(args[0]), location.href); return target.origin === origin ? nativeFetch(...args) : blocked('fetch')(...args) }
    const nativeOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function(method, url, ...rest) { const target = new URL(String(url), location.href); if (target.origin === origin) return nativeOpen.call(this, method, url, ...rest); record('xhr', `${method} ${url}`); throw new Error('xhr blocked') }
    window.WebSocket = class { constructor(url) { record('websocket', url); throw new Error('websocket blocked') } }
    window.EventSource = class { constructor(url) { record('eventsource', url); throw new Error('eventsource blocked') } }
    if (navigator.sendBeacon) navigator.sendBeacon = (...args) => { record('beacon', args[0]); return false }
    if (navigator.geolocation) { navigator.geolocation.getCurrentPosition = () => record('geolocation'); navigator.geolocation.watchPosition = () => { record('geolocation-watch'); return 0 } }
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = blocked('media')
    if (navigator.share) navigator.share = blocked('share')
    if (navigator.clipboard) navigator.clipboard.writeText = blocked('clipboard')
    if (navigator.credentials) navigator.credentials.get = blocked('credentials')
    if (navigator.vibrate) navigator.vibrate = (...args) => { record('vibration', args.join(',')); return false }
    if ('PaymentRequest' in window) window.PaymentRequest = class { constructor() { record('payment'); throw new Error('payment blocked') } }
    if ('Notification' in window) window.Notification = class { constructor() { record('notification'); throw new Error('notification blocked') } static requestPermission() { record('notification-permission'); return Promise.resolve('denied') } }
    const nativeClick = HTMLInputElement.prototype.click
    HTMLInputElement.prototype.click = function(...args) { if (this.type === 'file') { record('file-picker'); return } return nativeClick.apply(this, args) }
    document.addEventListener('click', event => { const anchor = event.target instanceof Element ? event.target.closest('a') : null; if (!anchor) return; const target = new URL(anchor.href, location.href); if (target.origin !== origin || !['http:','https:'].includes(target.protocol) || anchor.hasAttribute('download')) { record('external-navigation', target.href); event.preventDefault(); event.stopImmediatePropagation() } }, true)
  }, { origin: new URL(baseURL).origin })
}

async function applyTextScale(page, scale) {
  return page.locator('[data-testid="phone-frame"]').evaluate((phone, requestedScale) => {
    let count = 0
    for (const element of [phone, ...phone.querySelectorAll('*')]) {
      if (element.closest('[aria-hidden="true"],.sr-only')) continue
      const text = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      const editable = ['INPUT','SELECT','TEXTAREA'].includes(element.tagName)
      if (!text && !editable) continue
      const size = Number.parseFloat(getComputedStyle(element).fontSize)
      if (!Number.isFinite(size) || size <= 0) continue
      element.style.setProperty('font-size', `${size * requestedScale}px`, 'important'); count += 1
    }
    return count
  }, scale)
}

async function auditLayout(page, name) {
  const evidence = await page.locator('[data-testid="phone-frame"]').evaluate(phone => {
    const frame = phone.getBoundingClientRect()
    const visible = element => { const r = element.getBoundingClientRect(); const s = getComputedStyle(element); return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && r.bottom > frame.top && r.top < frame.bottom - 24 }
    const controls = [...phone.querySelectorAll('button,a,input,select,textarea')].filter(visible)
    return {
      frame: { width: Math.round(frame.width), height: Math.round(frame.height) }, overflow: phone.scrollWidth - phone.clientWidth,
      small: controls.map(element => { const r = element.getBoundingClientRect(); return { label: element.getAttribute('aria-label') || element.textContent?.trim().slice(0,50), width: r.width, height: r.height } }).filter(item => item.width < 43.5 || item.height < 43.5),
      unnamed: controls.filter(element => !(element.getAttribute('aria-label') || element.textContent?.trim() || element.getAttribute('title') || ('labels' in element && [...element.labels].some(label => label.textContent?.trim())))).length,
      wrongCoach: /\bSIA\b|\bSia\b|\bCia\b/.test(phone.innerText),
    }
  })
  check(evidence.frame.width === 390 && evidence.frame.height === 844, `${name}: phone frame 390x844`, evidence.frame)
  check(evidence.overflow <= 1, `${name}: no horizontal overflow`, evidence.overflow)
  check(evidence.small.length === 0, `${name}: visible controls meet 44px`, evidence.small)
  check(evidence.unnamed === 0, `${name}: visible controls are named`, evidence.unnamed)
  check(!evidence.wrongCoach, `${name}: visible coach name is CIA`)
}

function markerFor(id, state) {
  if (['54','55','56'].includes(id)) return `[data-f1-state="${id}-${state}"]`
  const names = { '49': 'data-progress-photo-state', '52': 'data-stress-state', '53': 'data-breathing-state' }
  return `[${names[id] ?? 'data-state'}="${state}"]`
}

async function semanticChecks(page, id, state, name) {
  check(await page.locator(markerFor(id, state)).count() === 1, `${name}: exact query state marker`)
  const body = await page.locator('[data-testid="phone-frame"]').innerText()
  const required = {
    '26-low-confidence': /estimated|low confidence|~78/i, '26-data-controls': /9 controls|retention/i, '26-asset': /Preparation preview/i,
    '27-input-edit': /83\.9|Weight \(kg\)/i, '27-sensor-null': /Sensor not available/i, '27-offline': /local save preview/i, '27-safety': /sharp pain|chest pain/i,
    '28-default': /1,220 kcal|39%.*30%.*31%/s, '28-water-success': /8 of 8/i, '28-water-disabled': /8 of 8/i, '28-allergy': /Confirmed allergy.*override/s,
    '29-detail': /520 total.*435 from macros.*85 kcal unattributed/s, '29-scanner-unavailable': /Scanner unavailable/i, '29-media-consent': /Meal photo consent/i, '29-offline': /manual entry.*camera/s,
    '49-default-demo': /demo/i, '49-personal-consented': /consent/i, '49-delete-confirm': /3 photos|2 analysis/i,
    '52-default': /4\.8|3\.2/i, '52-safety-open': /help|support|crisis/i, '52-log-disabled': /Available in 00:30/i,
    '53-default': /5 of 8/i, '53-duration-locked': /10 min/i, '53-risky-technique-gate': /acknowledge|breath-hold|hyperventilation/i,
    '54-default-real': /145 min|Body scan/i, '54-honest-null': /Not enough data|No personal pattern/i, '54-premium-preview': /premium preview/i,
    '55-default-real': /110 min|Lv 12/i, '55-pose-fallback': /Tutorial unavailable|written instructions/i, '55-premium-preview': /Beginner.*included|beginner access/i,
    '56-default-parent': /Nutrition.*Recipes.*nested module/s, '56-allergy-conflict': /Tree-nut allergy.*suppressed/s, '56-premium-disposition': /No bundled beginner recipe is premium-locked/i,
  }[`${id}-${state}`]
  if (required) check(required.test(body), `${name}: state-specific semantic proof`, body.slice(0,900))
}

async function interactionChecks(page, id, name) {
  if (id === '26') { await page.getByRole('button', { name: 'Start workout' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('started locally'), `${name}: start outcome visible`) }
  if (id === '27') { await page.getByRole('button', { name: 'Pause workout' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('paused'), `${name}: pause outcome visible`) }
  if (id === '28') { await page.getByRole('button', { name: 'Add water glass' }).click(); check((await page.locator('[data-state]').innerText()).includes('6 of 8'), `${name}: water increment visible`) }
  if (id === '29') { await page.getByRole('button', { name: 'Edit meal' }).click(); check(await page.getByRole('textbox', { name: 'Search foods or enter manually' }).count() === 1, `${name}: logger opens locally`) }
  if (id === '49') { await page.getByRole('button', { name: 'Manage privacy' }).click(); check(await page.getByRole('dialog', { name: 'Photo privacy controls' }).count() === 1, `${name}: privacy dialog opens`) }
  if (id === '52') { await page.getByRole('button', { name: 'Open crisis resources' }).click(); check(await page.getByRole('dialog').count() === 1, `${name}: crisis resources open locally`) }
  if (id === '53') { await page.getByRole('button', { name: 'Technique safety' }).click(); check(await page.getByRole('dialog', { name: 'Review before higher-risk breathing' }).count() === 1, `${name}: technique gate opens`) }
  if (id === '54') { const trigger = page.getByRole('button', { name: 'Start 5-min body scan' }); await trigger.focus(); await trigger.click(); check(await page.getByRole('dialog', { name: 'Meditation session' }).count() === 1, `${name}: session dialog opens`); check(await page.getByRole('dialog').evaluate(dialog => dialog.contains(document.activeElement)), `${name}: dialog receives focus`); await page.keyboard.press('Escape'); check(await page.getByRole('dialog').count() === 0 && await trigger.evaluate(node => node === document.activeElement), `${name}: Escape closes and restores focus`) }
  if (id === '55') { const trigger = page.getByRole('button', { name: 'Start beginner session' }); await trigger.focus(); await trigger.click(); check(await page.getByRole('dialog').count() === 1, `${name}: yoga dialog opens`); check(await page.getByRole('dialog').evaluate(dialog => dialog.contains(document.activeElement)), `${name}: yoga dialog receives focus`); await page.keyboard.press('Escape'); check(await page.getByRole('dialog').count() === 0 && await trigger.evaluate(node => node === document.activeElement), `${name}: yoga Escape restores focus`) }
  if (id === '56') { await page.getByRole('button', { name: 'Open recipe filters' }).click(); check((await page.getByRole('status').allInnerTexts()).join(' ').includes('filters'), `${name}: recipe filter outcome visible`); const trigger = page.getByRole('button', { name: /Open .* recipe detail/ }).first(); await trigger.focus(); await trigger.click(); check(await page.getByRole('dialog').count() === 1, `${name}: recipe detail opens`); await page.keyboard.press('Escape'); check(await page.getByRole('dialog').count() === 0 && await trigger.evaluate(node => node === document.activeElement), `${name}: recipe Escape restores focus`) }
}

async function run() {
  fs.rmSync(candidateDir, { recursive: true, force: true }); fs.mkdirSync(candidateDir, { recursive: true })
  const buildId = fs.readFileSync(path.join(root, '.next/BUILD_ID'), 'utf8').trim()
  const served = await (await fetch(new URL('/screens/26', baseURL))).text()
  check(served.includes(buildId), 'served production HTML binds current BUILD_ID', buildId)
  result.productionBuild = { buildId, mode: 'next start production', port: '3002' }
  result.integrity = { start: { product: fingerprint(productFiles), api: fingerprint(apiFiles), accepted: parseSentinels() } }
  const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const browser = await chromium.launch(fs.existsSync(executablePath) ? { executablePath } : {})
  let nonce = 0
  try {
    for (const test of [...cases, ...textCases]) {
      nonce += 1
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
      await addGuards(context)
      const page = await context.newPage()
      page.on('console', message => { if (message.type() === 'error') result.consoleErrors.push({ case: test.name, text: message.text() }) })
      page.on('pageerror', error => result.pageErrors.push({ case: test.name, text: String(error) }))
      const url = new URL(`/screens/${test.id}`, baseURL); url.searchParams.set('state', test.state); url.searchParams.set('__f1audit', String(nonce))
      await page.goto(url.toString(), { waitUntil: 'networkidle' })
      await page.locator('[data-testid="phone-frame"]').waitFor()
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scrollbar-color:transparent transparent!important}::-webkit-scrollbar{display:none!important}' })
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      if (test.textScale) { const scaled = await applyTextScale(page, test.textScale); check(scaled >= 10, `${test.name}: actual 125% font-size proof`, scaled) }
      await auditLayout(page, test.name)
      await semanticChecks(page, test.id, test.state, test.name)
      if (!test.textScale && test.state === states[test.id][0]) {
        await interactionChecks(page, test.id, test.name)
        await page.goto(url.toString(), { waitUntil: 'networkidle' }); await page.locator('[data-testid="phone-frame"]').waitFor(); await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scrollbar-color:transparent transparent!important}::-webkit-scrollbar{display:none!important}' }); await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
      }
      const capability = await page.evaluate(() => window.__f1CapabilityEvents ?? [])
      result.capabilityEvents.push(...capability.map(event => ({ case: test.name, ...event })))
      const storage = await page.evaluate(async () => ({ local: Object.keys(localStorage), session: Object.keys(sessionStorage), databases: indexedDB.databases ? (await indexedDB.databases()).map(db => db.name) : [], caches: 'caches' in window ? await caches.keys() : [] }))
      const cookies = await context.cookies()
      check(storage.local.length + storage.session.length + storage.databases.length + storage.caches.length === 0 && cookies.length === 0, `${test.name}: isolated storage and cookies`, { storage, cookies: cookies.length })
      if (!test.textScale) {
        const phone = page.locator('[data-testid="phone-frame"]'); const first = await phone.screenshot(); await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); const second = await phone.screenshot()
        let stable = sha(first) === sha(second) ? second : null
        if (!stable) { await page.waitForTimeout(100); const third = await phone.screenshot(); if (sha(second) === sha(third)) stable = third }
        check(Boolean(stable), `${test.name}: deterministic consecutive captures`, { first: sha(first), second: sha(second) })
        fs.writeFileSync(path.join(candidateDir, `${test.name}.png`), stable); result.screenshots.push({ name: `${test.name}.png`, sha256: sha(stable) })
      }
      result.cases.push({ ...test, nonce: String(nonce), storage, cookies: cookies.length })
      await context.close(); process.stdout.write(`[${nonce}/111] ${test.name} ok\n`)
    }
  } finally { await browser.close() }
  result.integrity.end = { product: fingerprint(productFiles), api: fingerprint(apiFiles), accepted: parseSentinels() }
  check(JSON.stringify(result.integrity.start) === JSON.stringify(result.integrity.end), 'product/API/sentinel start-end fingerprints stable')
  check(result.cases.length === 111 && result.screenshots.length === 101, 'exact 111 contexts and 101 PNGs', { contexts: result.cases.length, screenshots: result.screenshots.length })
  check(result.consoleErrors.length === 0 && result.pageErrors.length === 0 && result.capabilityEvents.length === 0, 'zero console/page/capability events', { console: result.consoleErrors, page: result.pageErrors, capability: result.capabilityEvents })
  fs.rmSync(shotsDir, { recursive: true, force: true }); fs.renameSync(candidateDir, shotsDir)
  result.screenshotPromotion = 'promoted-pass-atomically-after-all-assertions'; result.status = 'pass'
}

try { await run() } catch (error) { result.error = String(error); fs.rmSync(candidateDir, { recursive: true, force: true }); process.exitCode = 1 }
fs.mkdirSync(path.dirname(outPath), { recursive: true }); fs.writeFileSync(outPath, JSON.stringify(result, null, 2))
console.log(JSON.stringify({ status: result.status, build: result.productionBuild?.buildId, contexts: result.cases.length, screenshots: result.screenshots.length, checks: result.checks.length, console: result.consoleErrors.length, page: result.pageErrors.length, capability: result.capabilityEvents.length, error: result.error }, null, 2))
